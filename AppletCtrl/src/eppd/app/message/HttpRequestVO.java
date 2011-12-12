package eppd.app.message;

import java.io.Serializable;
import java.io.StringWriter;

public class HttpRequestVO implements Serializable
{
    private String method;
    private String url;
    private String request;
    private String header;
    private String response;
    private String status;
    //private PostMessage cWin;
	private boolean ObjectType;
    private boolean view;
    private int timeOut;

	public HttpRequestVO()
    {
        method = "GET";
        url = null;
        request = null;
        header = null;
        response = null;
        status = null;
        //cWin = null;
        view = false;
        ObjectType = false;
        timeOut = 300000;
    }

    public String getMethod()
    {
        return method;
    }

    public void setMethod(String method)
    {
        this.method = method;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl(String url)
    {
        this.url = url;
    }

    public String getRequest()
    {
        return request;
    }

    public void setRequest(String request)
    {
        this.request = request;
    }

    public String getHeader()
    {
        return header;
    }

    public void setHeader(String header)
    {
        this.header = header;
    }

    public String getResponse()
    {
        return response;
    }

    public void setResponse(String response)
    {
        this.response = response;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

//    public PostMessage getcWin()
//    {
//        return cWin;
//    }
//
//    public void setcWin(PostMessage cWin)
//    {
//        this.cWin = cWin;
//    }

    public boolean isView()
    {
        return view;
    }

    public void setView(boolean view)
    {
        this.view = view;
    }
    
	public int getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(int timeOut) {
		this.timeOut = timeOut;
	}
	
	public boolean isObjectType() {
		return ObjectType;
	}

	public void setObjectType(boolean objectType) {
		ObjectType = objectType;
	}  
	
	public boolean getObjectType() {
		return ObjectType;
	}  
}
