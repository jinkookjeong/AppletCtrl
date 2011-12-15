package eppd.app;

import java.awt.*;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.applet.*;
import javax.swing.*;
import eppd.app.connection.ObjectConnection;

import eppd.app.message.HttpRequestVO;
import eppd.app.message.MessageMgr;
import eppd.app.message.XmlConstant;
import eppd.app.mxml.MakeMimeFile;
import eppd.app.mxml.MakeSoapFile;
import eppd.app.mxml.MakeXMLFile;
import eppd.app.util.Cookie;
import eppd.app.util.DirManager;
import eppd.app.window.ReceiveWindow;
import eppd.app.window.SendWindow;
import netscape.javascript.JSObject;

public class PPS extends Applet { 
  Font             m_font = new Font( "Arial", 0, 12 );
  String           m_homeUrl;
  AppletContext    m_appletContext;
  String           m_homeID;
  String           m_codeBase;
  MessageMgr       m_msgLang = null;
  ObjectConnection Ocon = null;
   
  eppd.app.log.XLogger logger = null;  
  public static String m_lang = "en";
  
  public void init()
  { 
	super.init(); 
    System.setSecurityManager(null);
    try {
      UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());      
    }
    catch(Exception e) { 
      e.printStackTrace();
    }
    
    m_appletContext    = this.getAppletContext();
    m_homeUrl          = this.getCodeBase().toString();
    m_msgLang = new MessageMgr();
    Ocon = new ObjectConnection();
    logger = new eppd.app.log.XLogger();
    
    try {
    	  m_lang = Cookie.getCookie(new URL("http://www.meps.gov.mn"),"MN_LANG");
		  if(m_lang == null){
			  m_lang = "en";		  
		  }		 
	} catch (MalformedURLException e) {		
	}
  }

  public void destroy()
  { 
	  super.destroy();
      System.gc();
	  System.out.println("### destory ###");
  }
  
  public String GetDataFromUrl(String url)
  {
  	  String resData = "";
  	  try
  	  {
		  HttpRequestVO rhb = new HttpRequestVO();
	      rhb.setUrl(url);		  
		  resData = Ocon.HttpRequestObject(rhb).toString();
	  }catch(Exception ex){
	     resData = "ERROR: "+ex.getMessage();
	  }
	  return resData;
  }
   
   public String sendDocument(String DocCode, String encSign, String formName)
   {   
	   String result = "";
	    try 
	    {
	    	logger.LogSave("sendDocument start");
	    	JSObject win = (JSObject)JSObject.getWindow(this);
	    	
	    	SendWindow sendWin = new SendWindow(DocCode, encSign, formName, win, Ocon, logger, m_msgLang, m_lang);
	    	XmlConstant cont = sendWin.sendXmlFile();
		   	System.out.println("String m unikey => "+cont.getUnikty());
		 	System.out.println("String m result => "+cont.getResult());
		 	System.out.println("String m message => "+cont.getMessage());
	   	    result = cont.getResult()+"^"+cont.getUnikty()+"^"+cont.getMessage();
	   	    logger.LogSave("sendDocument end");
		} catch (Exception e) {
			e.printStackTrace();
			result = "E^ERROR^"+e.getMessage();
		}
	  
	  return result;
  }
   public String ReceiveDocument(String url, String unikey, String to_id)
   {   
	   String result = "";
	    try 
	    {
	    	logger.LogSave("ReceiveDocument start");	    	
	    
	    	ReceiveWindow rcvWin = new ReceiveWindow(url, unikey, to_id, Ocon, logger, m_msgLang, m_lang);
	    	
	    	rcvWin.rcvXmlFile();
		   	
	   	    logger.LogSave("sendDocument end");
		} catch (Exception e) {
			e.printStackTrace();
			result = "E^ERROR^"+e.getMessage();
		}
	  
	  return result;
  }
   
   
  public void start()
  {    
	  String workingHome = DirManager.workingHome;
	  System.out.println("workingHome: "+workingHome);
      super.start();  
  }
  
  public void stop()
  {  
	  super.stop();
  }

  
  public void ymInit() {
    //getContentPane().setLayout(new BorderLayout());
  }
  public static void main(String[] args ) {
    JFrame mframe       = new JFrame();
    PPS mapplet  = new PPS();
    //mapplet.init();
    //mapplet.makeXmlTemplate("RegistrationApplication");
    //mapplet.GetDataFromUrl("a");
//    mapplet.ymInit();
//    mframe.getContentPane().add("Center", mapplet);
//    mframe.setSize( 1020, 800 );
//    mframe.setVisible( true );
    
  }
}
 
