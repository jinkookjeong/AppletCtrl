package eppd.app;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;


//import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import eppd.app.log.XLogger;


public class HttpClientTest {

   
   
//    boolean RequestHttpServer(String s, String s1, String s2, String s3, RefString refstring, RefString refstring1, CSendDlg2 csenddlg2, 
//            boolean flag)
//    {
//        Object obj = null;
//        RequestHttpBean requesthttpbean = new RequestHttpBean();
//        requesthttpbean.setMethod(s);
//        requesthttpbean.setUrl(s1);
//        requesthttpbean.setRequest(s2);
//        requesthttpbean.setcWin(csenddlg2);
//        requesthttpbean.setHeader(s3);
//        requesthttpbean.setView(flag);
//        boolean flag1 = m_dlg.m_pCtrl.RequestHttpServer(requesthttpbean);
//        refstring.setValue(requesthttpbean.getResponse());
//        refstring1.setValue(requesthttpbean.getStatus());
//        return flag1;
//    }
	public static void main(String[] args) throws URISyntaxException, ClientProtocolException, IOException 
	{
		HttpResponse res;	
		HttpClientTest test = new HttpClientTest();
		XLogger logger = new XLogger();
		logger.LogSave("aaйөёфёнйз");
		//HttpClient hClient = UrlConnection.getHttpClient();
		
//		URL objUrl = UrlConnection.getUrl("http://localhost:8088/test/xmlRcv.jsp");
//		  
//        HttpPost method = new HttpPost();
//        method.setURI(objUrl.toURI());
//        StringEntity strEntity = new StringEntity("str", "UTF-8");
//        method.setEntity(strEntity);
//        res = hClient.execute(method);
//        System.out.println("response=> "+res.getStatusLine().getStatusCode());
//        HttpEntity entity = res.getEntity();
//        
//        System.out.println(Integer.valueOf(0x493e0));
//        System.out.println(EntityUtils.toString(entity, "UTF-8"));
//		
//        //UrlConnection.shutdownHttpClient(hClient);
        
//		HttpClient httpClient = new DefaultHttpClient();
//        String url = "http://123.123.123.123:123/imp/device/registerDeviceId.rs";
//        HttpPost post = new HttpPost(url); 
//        
//        List<NameValuePair> queryParams = new ArrayList<NameValuePair>();
//        
//        queryParams.add(new BasicNameValuePair("mobileNo", "01085429230"));
//        queryParams.add(new BasicNameValuePair("mobileDeviceId", "aaaa"));
//        
//        UrlEncodedFormEntity entity = new UrlEncodedFormEntity(queryParams, "UTF-8");
//        post.setEntity( entity);
//        post.setHeader("Accept", "application/json");
//        HttpParams param = httpClient.getParams();
//        
//        HttpResponse response = httpClient.execute(post);
//        
//        HttpEntity resultEntity = response.getEntity();
//                    
//        String result = EntityUtils.toString(resultEntity);
//        System.out.println("result ==>> "+result);


	}

}
