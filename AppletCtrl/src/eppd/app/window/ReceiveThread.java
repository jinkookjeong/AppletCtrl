package eppd.app.window;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.util.Enumeration;
import java.util.Properties;
import java.util.Vector;


import javax.activation.FileDataSource;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JOptionPane;
import javax.swing.JProgressBar;
import javax.swing.JTextArea;

import netscape.javascript.JSObject;
import oracle.xml.parser.v2.DOMParser;
import oracle.xml.parser.v2.XMLDocument;
import oracle.xml.parser.v2.XMLParseException;

import org.xml.sax.SAXException;

import eppd.app.connection.ObjectConnection;
import eppd.app.log.XLogger;
import eppd.app.message.HttpRequestVO;
import eppd.app.message.MessageBox;
import eppd.app.message.MessageMgr;
import eppd.app.message.XmlConstant;
import eppd.app.mxml.MakeMimeFile;
import eppd.app.mxml.MakeSoapFile;
import eppd.app.mxml.MakeXMLFile;
import eppd.app.util.DirManager;
import eppd.app.util.IOUtil;
import eppd.app.util.XMLUtil;

public class ReceiveThread implements Runnable
{
	ReceiveWindow winDlg = null;
	XmlConstant cont = null;
	ObjectConnection Ocon = null;
	String url = "";
	String unikey = "";
	String to_id = "";
	String lang = "";
	XLogger logger = null;
    JProgressBar progressbar = null;
    JTextArea area = null; 
    MessageMgr langMgr = null;
    IOUtil ioUtil = null;
    
	public ReceiveThread(ReceiveWindow winDlg)
	{
	  this.winDlg = winDlg;
	}
	
	public void run()
	{
		cont = winDlg.cont;
		url = winDlg.url;
		Ocon = winDlg.Ocon;
		unikey = winDlg.unikey;
		to_id = winDlg.to_id;
		logger = winDlg.logger;
	    lang = winDlg.lang;
	    langMgr = winDlg.langMgr;
	    
		try 
		{
			
			winDlg.setSendStatus(true);
			winDlg.setProgress(0);
			winDlg.setStatusMapMessage("1023"); //전자문서 다운로드 중입니다.
			
			String getUrl = url+"?file="+unikey+"&id="+to_id;
			String rcvXml = receiveDocument(getUrl, logger);
		
			ioUtil = new IOUtil();
			cont = saveMimeFile(rcvXml, unikey, ioUtil);
			
		    System.out.println("cont==> "+cont.getSaveMimePath());
		
		    winDlg.setStatusMapMessage("1024"); //전자문서 Parsing 처리 중입니다.
	        FileDataSource fds = new FileDataSource(cont.getSaveMimePath());
		    cont = detachMime((InputStream)fds.getInputStream(),unikey, cont);

		    //보안처리

		    //보안검증이 정상적으로 완료된문서라면 
		    //받은문서함에서 클릭이냐 보낸문서함에서 클릭이냐에따라서
		    //받은문서함만처리
		    //개봉 미개봉인지확인하여 미개봉되었으면 개봉요청하며 AckMessage는 처리 하지 않는다.
		    
		    
		    //모두가 완료가 되면 화면에서 서버에 있는 전자문서를 Viewer하여준다.
		    
		    
		    
		    
		    winDlg.setStatusMapMessage("1026"); //수신에 성공하였습니다.
			winDlg.setProgress(100);
		  
		} catch (Exception e) {
			winDlg.setStatusMapMessage("1027"); //수신에 실패하였습니다.
			MessageBox.AfxMessage("Exception: "+e.getMessage(),langMgr.getMessage(lang, "Title"),JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
		}
	}
	
    private XmlConstant saveMimeFile(String rcvXml, String unikey, IOUtil ioUtil) throws IOException
    {
    	XmlConstant cont = new XmlConstant();
      	String mimeFilePath = (new StringBuilder()).append(DirManager.getDirReceive()).append(DirManager.fileSeparator).append(unikey+".mime").toString().toString();
       	
    	String saveMimeFilePath = ioUtil.writeStringToFile(null,rcvXml,"UTF-8", mimeFilePath);
        cont.setSaveMimePath(saveMimeFilePath);
        
        return cont;	
    }
    
    public XmlConstant detachMime(InputStream in, String unikey, XmlConstant cont) throws Exception
    {
		Multipart mp = null;

		try{
		    
			Vector vec = new Vector();
			Properties sysprop = System.getProperties();
			Session session = Session.getDefaultInstance(sysprop,null);
			session.setDebug(true);
			
			MimeMessage msg = new MimeMessage(session, in); 
			if (msg.getContentType().trim().toLowerCase().startsWith("multipart/related")) // multipart receive
			{	
				if (msg.isExpunged()){
					throw new Exception("Mime is not data(Message is Expunged)");
				}
				mp = (Multipart)msg.getContent();				
			
				if (mp == null){
					throw new Exception("Mime is not data(mp is null)");
				}
				if (mp.getCount() < 1){
					throw new Exception("Mime is not body");
				}
				for(int i=0;i < mp.getCount();i++)
				{
					InputStream is = null; 
					int buf_size = 1024*2;
					byte[] buf = new byte[buf_size];
					
					MimeBodyPart body1 = (MimeBodyPart)mp.getBodyPart(i);
	
					int ret = 0;
					String fname = ""; 
				 	String rcvXmlDir = (new StringBuilder()).append(DirManager.getDirReceive()).append(DirManager.fileSeparator).toString().toString();
				    
					fname = rcvXmlDir +File.separator+ this.unikey + "." + (i==0? "s" : Integer.toString(i-1)); //File path and name to save :: 저장될 파일의 경로와 파일명  .s .0 .1 .2 ...n
					
					File aFile = new File(fname) ;
					if (aFile.exists()){
						aFile.delete() ;
					}
	
					FileOutputStream fout = new FileOutputStream(fname);
					BufferedOutputStream bout = new BufferedOutputStream(fout);
	
					long totalbytes = 0;				
					is = body1.getDataHandler().getInputStream();
	
					while((ret = is.read(buf,0,buf_size)) != -1){
						totalbytes = totalbytes + ret;
						bout.write(buf,0,ret);
						bout.flush();
					}
					if(bout !=null){ try{ bout.flush(); bout.close(); }catch(Exception ex){}}
					if(fout != null){ try{fout.close();}catch(Exception ex){}}
					if(is != null) { try{is.close();}catch(Exception ex){}}
					
					if(totalbytes == 0){
						File fd = new File(fname);
						fd.delete();
					} else {					
						String filename = "";
						try {
							filename = new String(body1.getFileName());
							
							//mimeInfo.filename = new String(body1.getFileName().getBytes("8859_1"), "KSC5601");
						} catch(Exception exc) {
							filename = "";
						}
					    vec.add(fname);
				   }
				}
				cont.setRawFileName(vec);
				
			}else if (!msg.getContentType().trim().toLowerCase().startsWith("type=\"text/xml\"")){ // multipart receive
				throw new Exception("document is not wall form");
			} 
			
		} catch(IOException ioe){
			ioe.printStackTrace();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			try{ if(in != null ) {	in.close();	 } } catch (Exception ex){}			
		} 
	   return cont;	
	}


	private void parseDocument(String rcvXml) throws XMLParseException,SAXException,IOException,Exception
	{
		XMLDocument doc = null;
		  DOMParser parser = new DOMParser(); 
		  try {
			  StringReader sr = new StringReader(rcvXml);
			  parser.parse(sr);
			  doc = parser.getDocument(); 
		  } catch (XMLParseException e) {
				throw e;
		  } catch (SAXException e) {
				throw e;
		  } catch (IOException e) {
				throw e;
		  } catch (Exception e) {		
				throw e;
		  }
	}

	public String receiveDocument(String url, XLogger logger) throws Exception
     {
  	     String resData = "";
	  	 try
	  	 {
			HttpRequestVO rhb = new HttpRequestVO();
		    rhb.setUrl(url);	
		    rhb.setMethod("GET");
		    rhb.setObjectType(false);
			resData = (String)Ocon.HttpRequestObject(rhb);
		 }catch(Exception ex){
			throw ex;
		 }
	  	  
	  	return resData;
    }

	private boolean DeleteFile(String s)
	 {
        File file = new File(s);
        if(file.delete())
            return true;
        try
        {
            return false;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return false;
	 }
}
