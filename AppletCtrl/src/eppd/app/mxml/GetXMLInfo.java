package eppd.app.mxml;

import java.io.IOException;
import java.util.HashMap;

import eppd.app.connection.ObjectConnection;
import eppd.app.message.HttpRequestVO;
import eppd.app.message.ObjectVO;
import eppd.app.message.XmlConstant;

public class GetXMLInfo {

	public XmlConstant getXmlTemplate(String DocCode,ObjectConnection Ocon) throws IOException, Exception
	{
	  synchronized(java.lang.Object.class)
	  {
    	XmlConstant cont = new XmlConstant();
    	
        HttpRequestVO rhb = new HttpRequestVO();
        rhb.setUrl(XmlConstant.GET_XML_TEMPLATE_URL+DocCode);
        rhb.setObjectType(true);
    	ObjectVO objVO = (ObjectVO)Ocon.HttpRequestObject(rhb);
    	if(objVO.getObjBean() != null)
    	{
    		HashMap map = (HashMap)objVO.getObjBean();
    		cont.setXmlTemplate((String)map.get("xml"));
    		cont.setSoapTemplate((String)map.get("soap"));
    	}else{
    		throw new Exception("getXmlTemplate Error!");
    	}
    	return cont;
	 }
  }
	public ObjectVO getXPATH(String DocCode,ObjectConnection Ocon) throws IOException, Exception
	{
	  synchronized(java.lang.Object.class)
	  {
	    	HttpRequestVO rhb2 = new HttpRequestVO();
	    	rhb2.setUrl(XmlConstant.GET_XPATH_INFO_URL+DocCode);
	    	rhb2.setObjectType(true);
	    	ObjectVO objVo = (ObjectVO)Ocon.HttpRequestObject(rhb2);
	    	
    	return objVo;
	 }
  }
}
