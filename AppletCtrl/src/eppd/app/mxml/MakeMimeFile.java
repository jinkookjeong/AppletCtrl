package eppd.app.mxml;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.commons.io.FileUtils;

import eppd.app.log.XLogger;
import eppd.app.message.XmlConstant;
import eppd.app.util.Base64;
import eppd.app.util.DirManager;
import eppd.app.util.IOUtil;
import eppd.app.window.SendWindow;

public class MakeMimeFile {

	String BOUNDARY = "--MIME_BoundarY";
    String NEWLINE = "\r\n";
 
    public XmlConstant makeMimeFile(SendWindow winDlg) throws IOException
	{
    	XmlConstant cont = winDlg.cont;
    	XLogger logger = winDlg.logger;
		
    	StringBuffer mBuffer = new StringBuffer(1024 *10);
    	String mimeBoundary1 = getBoundary("SOAP Document","","8bit","text/xml");
    	mBuffer.append(mimeBoundary1);
    	
    	IOUtil ioUtil = new IOUtil();
    	String soapString = ioUtil.ReadInfoXml(cont.getSaveSoapPath()); //서명 or 암호화된 Soap파일 String
    	mBuffer.append(soapString);
        
    	String mimeBoundary2 = getBoundary("XML Document","00","8bit","text/xml");
    	mBuffer.append(NEWLINE);
    	mBuffer.append(mimeBoundary2);
    	String xmlString = ioUtil.ReadInfoXml(cont.getSaveXmlPath()); //Xml or 암호화된 Xml파일 String
    	mBuffer.append(xmlString);
    	
    	winDlg.setProgress(winDlg.getProgress()+5);
    	
    	ArrayList list = cont.getAttachList();
    	System.out.println("AttachList=> "+list.size());
    	for(int i=0; i<list.size(); i++ )
    	{
    		winDlg.setProgress(winDlg.getProgress()+i);
    		
    		String contType = "";
    		String bit ="";
    		if((cont.getEncSign()).equals("SIG")){
    			contType = "Application/Octet-stream";
    			bit = "base64";
    		}else {
    			contType = "text/xml";
    			bit = "8bit";
    		}
    		String idx = i+1+"";
    		if(i <= 9 ){
    			idx = "0"+idx;
    		}	
    		
    		String attachFilePath = (String)list.get(i);
    		String mimeBoundary = getBoundary("attachment; filename=\""+attachFilePath+"\"",idx, bit, contType);
    		mBuffer.append(NEWLINE);
    		mBuffer.append(mimeBoundary);
    		
    		String attachBase64 = Base64.encode(FileUtils.readFileToByteArray(new File(attachFilePath)));
        	mBuffer.append(attachBase64);
        	
    	}
    	mBuffer.append(NEWLINE+NEWLINE);
    	mBuffer.append(BOUNDARY);
    	String mimeFilePath = (new StringBuilder()).append(DirManager.getDirSend()).append(DirManager.fileSeparator).append(cont.getMsgId()+".mime").toString().toString();
       	
    	String saveMimeFilePath = ioUtil.writeStringToFile(null,mBuffer.toString(),"UTF-8", mimeFilePath);
    	cont.setSaveMimePath(saveMimeFilePath);
    	String subMsgId = cont.getMsgId().substring(0,cont.getMsgId().indexOf("."));    	 
    	cont.setSaveMimeName(subMsgId+".mime");
    	logger.LogSave("saveMimeFilePath: "+saveMimeFilePath);
    	return cont;
	}
    
    public String getBoundary(String disposition, String it, String bit, String contentType)
	{
		StringBuffer buffer = new StringBuffer();
		buffer.append(NEWLINE);     
        buffer.append(BOUNDARY).append(NEWLINE);        
		buffer.append("Content-Type: "+contentType).append(NEWLINE);
		buffer.append("Content-Transfer-Encoding: "+bit).append(NEWLINE);
		buffer.append("Content-Disposition: "+disposition).append(NEWLINE);
		buffer.append("Content-Id: ebxmlheader"+it+"@pps.go.kr").append(NEWLINE);
		buffer.append(NEWLINE);
        
       return buffer.toString(); 
	}
}
