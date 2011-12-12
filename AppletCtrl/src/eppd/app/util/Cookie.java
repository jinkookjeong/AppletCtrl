package eppd.app.util;

import java.io.IOException;
import java.net.CookieHandler;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;


public class Cookie 
{
	   public static String getCookie(URL url, String which)
	    {   
	        String cookieValue = "en";
	        CookieHandler handler = CookieHandler.getDefault();
	        if(handler != null)
	        {
	            Map headers;
	            try
	            {
	                headers = handler.get(url.toURI(), new HashMap());
	            }
	            catch(IOException e)
	            {
	                e.printStackTrace();
	                return null;
	            }
	            catch(URISyntaxException e)
	            {
	                e.printStackTrace();
	                return null;
	            }
	            java.util.List values = (java.util.List)headers.get("Cookie");
	            if(values == null || values.size() == 0)
	                return null;
	            for(Iterator iter = values.iterator(); iter.hasNext();)
	            {
	                String v = (String)iter.next();
	             
	                //cookieValue = new StringBuilder(100);
	                String cookie[] = StringUtil.split(v, ";");
	                String as[];
	                int j = (as = cookie).length;
	                for(int i = 0; i < j; i++)
	                {
	                    String ck = as[i];
	                    if(StringUtil.contains(ck, "keywords")){
	                        System.out.println("retrieveCookie() - skip");
	                    }else{
	                    	if(ck.indexOf(which) >= 0)
	                    	{	
	                    		String cKey[] = StringUtil.split(ck, "=");
	                    		String key = cKey[0];
	                    		cookieValue = IOUtil.PS_Decode(IOUtil.urldecode(cKey[1]));
	                    	}
	                        //cookieValue.append(ck).append(';').append(" ");
	                    }
	                }
	            }
	        }
	        return cookieValue;
	    }

	    public static void setCookie(URL url, String value)
	    {
	        System.out.println("setCookie() start");
	        CookieHandler handler = CookieHandler.getDefault();
	        if(handler != null)
	        {
	            System.out.println("setCookie() - 1");
	            Map headers = new HashMap();
	            java.util.List values = new Vector();
	            values.add(value);
	            headers.put("Cookie", values);
	            try
	            {
	                System.out.println("setCookie() ing");
	                handler.put(url.toURI(), headers);
	            }
	            catch(IOException e)
	            {
	            	e.printStackTrace();
	            }
	            catch(URISyntaxException e)
	            {
	            	e.printStackTrace();
	            }
	            catch(Exception ex)
	            {
	                ex.printStackTrace();
	            }
	        } else
	        {
	            System.out.println("setCookie() end");
	        }
	    }
}
