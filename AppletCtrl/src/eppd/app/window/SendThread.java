package eppd.app.window;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;

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
import eppd.app.util.IOUtil;
import eppd.app.util.XMLUtil;

public class SendThread implements Runnable
{
	SendWindow winDlg = null;
	XmlConstant cont = null;
	ObjectConnection Ocon = null;
	String DocCode = "";
	String formName = "";
	String encSign = "";
	String lang = "";
	JSObject jsWin = null;
	XLogger logger = null;
    JProgressBar progressbar = null;
    JTextArea area = null; 
    MessageMgr langMgr = null;
    
	public SendThread(SendWindow winDlg)
	{
	  this.winDlg = winDlg;
	}
	
	public void run()
	{
		cont = winDlg.cont;
		encSign = winDlg.encSign;
		Ocon = winDlg.Ocon;
		DocCode = winDlg.DocCode;
		formName = winDlg.formName;
		jsWin = winDlg.jsWin;
		logger = winDlg.logger;
	    lang = winDlg.lang;
	    langMgr = winDlg.langMgr;
	    
		try 
		{
			winDlg.setSendStatus(true);
			winDlg.setProgress(0);
			winDlg.setStatusMapMessage("1013"); //전자문서를 생성하는 중입니다.
				
			//Make Xml File
			XmlConstant cont = makeXmlDocument(this.winDlg);
			cont.setEncSign(encSign);
			winDlg.cont = cont;
			System.out.println("saveXmlFile===>"+winDlg.cont.getSaveXmlPath());
			//winDlg.setStatusMessage(winDlg.cont.getSaveXmlName());
			winDlg.setStatusMapMessage("1014"); //Soap문서를 생성하는 중입니다.
					
			//Make Soap File
			cont = makeSoapDocument(this.winDlg);
			winDlg.cont = cont;
			System.out.println("saveSoapFile===>"+winDlg.cont.getSaveSoapPath());
			winDlg.setStatusMapMessage("1015"); //전자문서 보안 처리 중입니다.
			
			
			//winDlg.setStatusMessage(winDlg.cont.getSaveSoapName());
			winDlg.setStatusMapMessage("1016"); //Mime문서를 생성하는 중입니다.
			
			winDlg.setProgress(winDlg.getProgress()+10);
			
			//Make Security

			//Make Mime File			
			cont = makeMimeDocument(this.winDlg);
			winDlg.cont = cont;
			System.out.println("saveMimeFile===>"+winDlg.cont.getSaveMimePath());
			winDlg.setStatusMessage(winDlg.cont.getSaveMimeName());
			winDlg.setProgress(winDlg.getProgress()+10);
			
			//Mime File Sending
			winDlg.setStatusMapMessage("1018"); //전자문서를  전송 중 입니다.
			logger.LogSave("sendDocument start");
			cont = sendDocument(cont, logger);
			logger.LogSave("sendDocument Result: "+cont.getUnikty()+":"+cont.getResult()+":"+cont.getMessage());
			winDlg.cont = cont;
			
			winDlg.setStatusMapMessage("1019"); //전송에 성공하였습니다.
			winDlg.setProgress(100);
			
			
		  
		} catch (XMLParseException e) {	
			winDlg.setStatusMapMessage("1020"); //전송에 실패하였습니다.
			MessageBox.AfxMessage("XMLParseException: "+e.getMessage(),langMgr.getMessage(lang, "Title"), JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
		} catch (SAXException e) {
			winDlg.setStatusMapMessage("1020"); //전송에 실패하였습니다.
			MessageBox.AfxMessage("SAXException: "+e.getMessage(),langMgr.getMessage(lang, "Title"),JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
		} catch (IOException e) {
			winDlg.setStatusMapMessage("1020"); //전송에 실패하였습니다.
			MessageBox.AfxMessage("IOException: "+e.getMessage(),langMgr.getMessage(lang, "Title"),JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
		} catch (Exception e) {
			winDlg.setStatusMapMessage("1020"); //전송에 실패하였습니다.
			MessageBox.AfxMessage("Exception: "+e.getMessage(),langMgr.getMessage(lang, "Title"),JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
		}
		
	}

	 //Make XML
	 public XmlConstant makeXmlDocument(SendWindow winDlg) throws IOException, Exception
     {
   	   MakeXMLFile xmlFile = new MakeXMLFile();
   	   XmlConstant xmlConstant = xmlFile.makeXmlFile(winDlg);
   	  
   	  return xmlConstant;   	  
     }
     
     public XmlConstant makeSoapDocument(SendWindow winDlg) throws Exception
     {
     	  MakeSoapFile soap = new MakeSoapFile();
     	  XmlConstant xmlConstant = soap.makeSoapFile(winDlg);
  	 
     	  return xmlConstant;   	  
     }
	 
     public XmlConstant makeMimeDocument(SendWindow winDlg) throws Exception
     {
  	      MakeMimeFile mime = new MakeMimeFile();
  	      System.out.println("makeMime start");
     	  XmlConstant xmlConstant = mime.makeMimeFile(winDlg);
     	  return xmlConstant;   	  
     }
     
     public XmlConstant sendDocument(XmlConstant cont,XLogger logger) throws IOException, Exception
     {
  	  	  HttpRequestVO rhb = new HttpRequestVO();
	      rhb.setUrl(XmlConstant.SEND_MIME_FILE_URL);
	      rhb.setObjectType(false);
	      rhb.setMethod("POST");
	        
	      String mimeFilePath = (new IOUtil()).ReadInfoXml(cont.getSaveMimePath()); //Mime File reading
	      rhb.setRequest(mimeFilePath);
	      
	      winDlg.setSendStatus(false);
		  String retString = (String)Ocon.HttpRequestObject(rhb);
		
		  return resultParseXml(cont,retString);
     }
     
	 public XmlConstant resultParseXml(XmlConstant cont, String xmlStr) throws XMLParseException,SAXException,IOException,Exception
	 {
	      XMLDocument doc = null;
		  DOMParser parser = new DOMParser(); 
		  try {
			  StringReader sr = new StringReader(xmlStr);
			  parser.parse(sr);
			  doc = parser.getDocument(); 
			  
				String unikey = XMLUtil.GetValues(doc,"/response/unikey" );
				String result = XMLUtil.GetValues(doc,"/response/result" );
				String message = XMLUtil.GetValues(doc,"/response/message" );
			    cont.setUnikty(unikey);
			    cont.setResult(result);
			    cont.setMessage(message);
			    
		  } catch (XMLParseException e) {
				throw e;
		  } catch (SAXException e) {
				throw e;
		  } catch (IOException e) {
				throw e;
		  } catch (Exception e) {		
				throw e;
		  }

		  return cont;
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
