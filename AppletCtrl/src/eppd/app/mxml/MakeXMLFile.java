package eppd.app.mxml;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringReader;

import netscape.javascript.JSObject;
import oracle.xml.parser.v2.DOMParser;

import eppd.app.connection.ObjectConnection;

import eppd.app.log.XLogger;
import eppd.app.message.ObjectItemVO;
import eppd.app.message.ObjectMasterVO;
import eppd.app.message.ObjectVO;
import eppd.app.message.XmlConstant;
import eppd.app.util.DirManager;
import eppd.app.util.IOUtil;
import eppd.app.util.StringUtil;
import eppd.app.util.XMLUtil;
import eppd.app.window.SendWindow;

public class MakeXMLFile {

	 public XmlConstant makeXmlFile(SendWindow winDlg) throws IOException, Exception
	 {
		  XmlConstant cont = null;
		  ByteArrayInputStream bais = null;
	  	  oracle.xml.parser.v2.XMLDocument doc = null;
	  	  String DocCode = "";
	  	  ObjectConnection Ocon = null;
	  	  JSObject jsWin = null;
	  	  String formName = "";
	  	  XLogger logger = null;
	      try{
	    	    DocCode = winDlg.DocCode;
	    	    Ocon = winDlg.Ocon;
	    	    jsWin = winDlg.jsWin;
	    	    formName = winDlg.formName;
	    	    logger = winDlg.logger;
	    	    
	    	  	System.out.println("makeXmlTemplate! "+DocCode);
	    	  	logger.LogSave("makeXmlFile DocCode: "+DocCode);	    	  	
		    	String xslName = "";
	    	  
		    	cont = (new GetXMLInfo()).getXmlTemplate(DocCode, Ocon);	
		        String xmlTemplate = cont.getXmlTemplate();	
		        if(xmlTemplate == null){
		        	throw new Exception("xmlMakeFile Error");
		        }
		        
		    	if(xmlTemplate.indexOf("<?xml-stylesheet") != -1 ){
		    		String pi 	= xmlTemplate.substring(xmlTemplate.indexOf("<?xml-stylesheet"));
					xslName		= pi.substring(0, pi.indexOf("?>")+2)+"\n";					
		    	}
		    	
		    	//xmlTemplate loading and parsing
		        DOMParser parser = new DOMParser(); 
			    StringReader sr = new StringReader(xmlTemplate);
		        parser.parse(sr);
		        doc = parser.getDocument();
		        
		        //Html Form Value Get
		        //JSObject win = (JSObject)JSObject.getWindow(this);
		    	//XPATH정보 검색
		    	ObjectVO objVo = (new GetXMLInfo()).getXPATH(DocCode, Ocon);
		        ObjectMasterVO[] mVo = (ObjectMasterVO[]) objVo.getArrObjBean();
		        
		        logger.LogSave("formName: "+formName);
		        int lSize = mVo.length;
		        System.out.println("mVO.length:"+lSize);
		        int pSize = winDlg.getProgress();
		        for(int i=0; i<lSize; i++)
		        {		    
		        	winDlg.setProgress(pSize+i);
		        	
					String indent = (String)mVo[i].getIndent();		    
					String iterator = (String)mVo[i].getIterator();		    
					String EOAType = (String)mVo[i].getEoAType();
					String attName = (String)mVo[i].getAttrName();
					String xPath = (String)mVo[i].getXPath();		    
			        System.out.print(indent+":");
			        System.out.println(iterator+":");
			        System.out.println(EOAType);
			        System.out.println(xPath);
			        
					if(iterator.equals(XmlConstant.ONE)) //1개 일경우
					{
					  try
					  {	
						JSObject Txt = (JSObject) jsWin.eval("document."+formName+"."+indent);
						String value = StringUtil.retSpace((String)Txt.getMember("value"));  // read form value					
					  	if(EOAType.equals(XmlConstant.ELEMENT))
					  	{   
						    XMLUtil.PutValues(doc, xPath, value); //Element				    
					  	}else if(EOAType.equals(XmlConstant.ATTRIBUTE)){
					  		XMLUtil.putAttrValue(doc, xPath, attName, value, 0); //Attribute
					  	}
					  }catch(NullPointerException ex){					  
					  }
					}
					else if(iterator.equals(XmlConstant.LOOP)) //N개 이상일 경우
					{
						ObjectItemVO[] dVo = mVo[i].getItem();										
						JSObject Txt = (JSObject) jsWin.eval("document."+formName+"."+indent);					
						int size = StringUtil.retZero((String)Txt.getMember("value"));  // read form value
						for(int j=0; j<size; j++)
						{	
							if(j > 0) { XMLUtil.copyNode(doc, xPath); }
							for(int x=0;x<dVo.length;x++)
							{     
								String itemIndent = (String)dVo[x].getIndent();	
								String itemEOAType = (String)dVo[x].getEoAType();
								String itemAttName = (String)dVo[x].getAttrName();
								String itemXPath = (String)dVo[x].getXPath();	
								try
								{	
									JSObject sTxt = (JSObject) jsWin.eval("document."+formName+"."+itemIndent+"["+j+"]");
									String sValue = StringUtil.retSpace((String)sTxt.getMember("value"));  // read form value
									if(itemEOAType.equals(XmlConstant.ELEMENT))
								  	{   		
										//System.out.println("sValue ==> "+sValue);
										
								  		XMLUtil.PutValues(doc, itemXPath, sValue, j); //Element	
								  	}else if(itemEOAType.equals(XmlConstant.ATTRIBUTE)){
								  		XMLUtil.putAttrValue(doc, itemXPath, itemAttName, sValue, j); //Attribute					  		
								  	}
							  	 }catch(NullPointerException ex){
								 }
							}					  	
						}
					}
			    }

		       String msgId = StringUtil.makeMsgId();
		       cont.setMsgId(msgId);
		       
		       String targetXmlFilePath = (new StringBuilder()).append(DirManager.getDirXml()).append(DirManager.fileSeparator).append(cont.getMsgId()+".xml").toString().toString();
		        
		       String resXmlString =  XMLUtil.documentToString(doc,xslName);
	           String saveXmlFilePath = (new IOUtil()).writeStringToFile(null,resXmlString,"UTF-8",targetXmlFilePath);
	           cont.setSaveXmlPath(saveXmlFilePath);
	           String subMsgId = cont.getMsgId().substring(0,cont.getMsgId().indexOf("."));
	           cont.setSaveXmlName(subMsgId+".xml");
	           	
	           logger.LogSave("saveXmlFilePath: "+saveXmlFilePath);
		  }catch(IOException iox){
			  throw iox;
		  }catch(Exception ex){
			  throw ex;
		  }finally{
	          if(bais != null){ try {bais.close(); } catch (IOException e) {}}           
	    }     	
		  return cont;
	  }
	 
	 
	 
}
