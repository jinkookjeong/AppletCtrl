package eppd.app.connection;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;

import java.util.Calendar;
import java.util.Locale;

import org.apache.commons.io.FileUtils;
import eppd.app.message.HttpRequestVO;


public class ObjectConnection {
	
	public Object HttpRequestObject(HttpRequestVO rhb) throws Exception, IOException 
	{
	    Object resData = null;
		ObjectOutputStream dos= null;		
		OutputStreamWriter wr = null;
		HttpURLConnection conn = null;		
		try
		{	
			Calendar calendar = Calendar.getInstance();
            SimpleDateFormat simpledateformat = new SimpleDateFormat("EEE, ss:mm:H d MMM yyyy ", Locale.ENGLISH);
            String date = (new StringBuilder()).append(simpledateformat.format(calendar.getTime())).toString();
			URL targetURL = new URL(rhb.getUrl());
			conn = (HttpURLConnection)targetURL.openConnection();  
			conn.setRequestMethod(rhb.getMethod());
			conn.setReadTimeout(rhb.getTimeOut());
			conn.setConnectTimeout(rhb.getTimeOut());
			conn.setRequestProperty("SOAPACTION","\"ebXML\"") ;
			
			String reqXml = "";
			if(rhb.getMethod().equals("POST"))
			{
				reqXml= rhb.getRequest();				
				conn.setRequestProperty("Content-Type", "multipart/related; boundary=\"MIME_BoundarY\"; type=\"text/xml\"; start=\"ebxmlheader@ppd.gov.tn\"");
				conn.setRequestProperty("Content-Length", ""+Integer.toString(reqXml.getBytes().length));
			}
			conn.setRequestProperty("Date",date);			 
			conn.setRequestProperty("user-agent","TAppletCtrl") ;
		    conn.setRequestProperty("Cache-Control","no-cache") ;
		    conn.setRequestProperty("accept","text/xml,Application/Octet-stream,text/plain") ;		    
		    conn.setRequestProperty("Authorization", "Y2prd2l0aA==");		    
		    conn.setUseCaches (false);
			conn.setDoInput(true);
			conn.setDoOutput(true);
			
			if(rhb.getMethod().equals("POST"))
			{	
				wr = new OutputStreamWriter(conn.getOutputStream());  
				wr.write(reqXml);
				wr.flush();				
			}
			
            int resCode = conn.getResponseCode();
			System.out.println("resCode:" + resCode);			
			if(resCode == 200)
			{
			    if(rhb.getObjectType()){ //결과를 Object로 받냐 안받냐?
			    	resData = getObjectResponse(conn.getInputStream());
				}else{
					resData = getResponse(conn.getInputStream());
				}				
			}else{
				throw new Exception("200 Ok Error!");
			}			
		}catch(Exception e){
			 throw e;
		}finally{
            if(dos!= null){dos.close();};
            if(wr!= null) {wr.close();};            
            if(conn !=null){conn.disconnect();};
        }
       
        return resData;
	}
	
	private String getResponse(InputStream in) throws IOException 
	{
		synchronized(java.lang.Object.class)
		{
			StringBuffer buff = new StringBuffer(1024 * 4);
			byte[] buf = new byte[4096] ;
			int ret = 0;
			while((ret = in.read(buf,0,4096)) != -1)
			{
				buff.append(new String(buf, 0, ret));
			}
			if (in != null) in.close();
			return buff.toString();
		}
	}

	private Object getObjectResponse(InputStream in) throws IOException, ClassNotFoundException 
	{
		synchronized(java.lang.Object.class)
		{
			ObjectInputStream ois = new ObjectInputStream(in);
			Object obj = (Object)ois.readObject();

			if (ois != null) ois.close();
			if (in != null) in.close();
		
			return obj;
		}
	}

	public static void main(String[] args){
		HttpRequestVO rhb = new HttpRequestVO();
		ObjectConnection con = new ObjectConnection();
	    try 
	    {	
	    	//String reqXml= con.ReadInfoTxt("");
	    	
	    	//int nSize = reqXml.length();
            //StringWriter sw = new StringWriter(nSize);
            //sw.write(reqXml);
            //sw.flush();            
            //rhb.setRequest(sw);            
            
            //rhb.setUrl("http://localhost:9999/templateApp/servlet/AppletServlet");
            //rhb.setMethod("POST");
            //rhb.setUrl("http://localhost:9999/templateApp/servlet/AppletGetServlet?param1=xxxxx&param2=yyyyyyyyy");
//            rhb.setUrl("http://localhost:9999/templateApp/servlet/AppletGetTemplateServlet?DocCode=RegistrationApplication");
//	    	rhb.setMethod("GET");
	    	
            rhb.setUrl("http://localhost:9999/AppletServerApp/servlet/AppletGetDBXPathServlet?DocCode=RegistrationApplication");
	    	rhb.setMethod("GET");
	    	rhb.setObjectType(true);
	    	con.HttpRequestObject(rhb);
	    	
	    	
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
//	public String ReadInfoTxt(String fileName)
//    {   
//        String result = null;
//        String strFileName = null;
//        File file = null;
//        try
//        {
//            file = new File("D:/PROJECT/09.튀니지/01.MulityBrower/xml/Source/source.mime"); //전자서명
////            file = new File("D:/PROJECT/09.튀니지/01.MulityBrower/bid.mime"); //입찰서
//            result = FileUtils.readFileToString(file);
//        } catch(Exception ex){
//        	ex.printStackTrace();
//        }
//        
//        return result != null ? result : "";
//    }
}
