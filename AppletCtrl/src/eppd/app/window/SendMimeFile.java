package eppd.app.window;

import java.io.IOException;
import java.io.StringReader;

import oracle.xml.parser.v2.DOMParser;
import oracle.xml.parser.v2.XMLDocument;
import oracle.xml.parser.v2.XMLParseException;

import org.xml.sax.SAXException;

import eppd.app.message.HttpRequestVO;
import eppd.app.message.XmlConstant;
import eppd.app.util.IOUtil;
import eppd.app.util.XMLUtil;

public class SendMimeFile implements Runnable
{

	SendWindow winDlg = null;
	
	public SendMimeFile(SendWindow winDlg)
	{
	  this.winDlg = winDlg;
	}
	
	public void run() 
	{
		 HttpRequestVO rhb = new HttpRequestVO();
	     rhb.setUrl(XmlConstant.SEND_MIME_FILE_URL);
	     rhb.setObjectType(false);
	     rhb.setMethod("POST");
	        
	     String mimeFilePath = (new IOUtil()).ReadInfoXml(winDlg.cont.getSaveMimePath()); //Mime File reading
	     rhb.setRequest(mimeFilePath);
	     
	     String retString;
		try {
			retString = (String)winDlg.Ocon.HttpRequestObject(rhb);
			resultParseXml(winDlg.cont, retString);
		} catch (IOException e) {		
			e.printStackTrace();
		} catch (Exception e) {		
			e.printStackTrace();
		}    
		
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

}
