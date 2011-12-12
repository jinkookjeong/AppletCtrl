package eppd.app.message;

import java.io.Serializable;

public class ObjectVO implements Serializable {

	private String callKey;
    private String serviceKey;
    private Object objBean;
    private Object[] ArrObjBean;
    
    public Object[] getArrObjBean() {
		return ArrObjBean;
	}
	public void setArrObjBean(Object[] arrObjBean) {
		ArrObjBean = arrObjBean;
	}

	public String getCallKey() {
		return callKey;
	}
	public void setCallKey(String callKey) {
		this.callKey = callKey;
	}
	public String getServiceKey() {
		return serviceKey;
	}
	public void setServiceKey(String serviceKey) {
		this.serviceKey = serviceKey;
	}
	public Object getObjBean() {
		return objBean;
	}
	public void setObjBean(Object objBean) {
		this.objBean = objBean;
	}    
}
