package eppd.app.message;

import java.util.ArrayList;

public class XmlConstant 
{

	public static String GET_XML_TEMPLATE_URL = "http://localhost:8088/AppletServer/servlet/AppletGetTemplateServlet?DocCode=";
	public static String GET_XPATH_INFO_URL = "http://localhost:8088/AppletServer/servlet/AppletGetDBXPathServlet?DocCode=";
	public static String SEND_MIME_FILE_URL = "http://localhost:8088/AppletServer/servlet/AppletMimeRcvServlet";

	public static final String ELEMENT = "E";
	public static final String ATTRIBUTE = "A";
	public static final String ONE = "1";
	public static final String LOOP = "N";

	private String encSign;
	
	private String xmlTemplate;
	private String soapTemplate;
	
	private String saveXmlPath;
	private String saveSoapPath;
	private String saveMimePath;
	
	
	private String encXmlPath;
	private String signXmlPath;
	private String encSoapPath;
	private String signSoapPath;
	private String docMsgId;
	private String MsgId;
	
	private String result;
	private String unikty;
	private String message;

	private String saveXmlName;
	private String saveSoapName;
	private String saveMimeName;
	
	private ArrayList attachList;	
	private ArrayList encAttachList;
	private ArrayList signAttachList;
	
	public String getSaveXmlName() {
		return saveXmlName;
	}
	public void setSaveXmlName(String saveXmlName) {
		this.saveXmlName = saveXmlName;
	}
	public String getSaveSoapName() {
		return saveSoapName;
	}
	public void setSaveSoapName(String saveSoapName) {
		this.saveSoapName = saveSoapName;
	}
	public String getSaveMimeName() {
		return saveMimeName;
	}
	public void setSaveMimeName(String saveMimeName) {
		this.saveMimeName = saveMimeName;
	}
	
	public String getDocMsgId() {
		return docMsgId;
	}
	public void setDocMsgId(String docMsgId) {
		this.docMsgId = docMsgId;
	}
	public String getMsgId() {
		return MsgId;
	}
	public void setMsgId(String msgId) {
		MsgId = msgId;
	}

	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getUnikty() {
		return unikty;
	}
	public void setUnikty(String unikty) {
		this.unikty = unikty;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getEncXmlPath() {
		return encXmlPath;
	}
	public void setEncXmlPath(String encXmlPath) {
		this.encXmlPath = encXmlPath;
	}
	public String getSignXmlPath() {
		return signXmlPath;
	}
	public void setSignXmlPath(String signXmlPath) {
		this.signXmlPath = signXmlPath;
	}
	public String getEncSoapPath() {
		return encSoapPath;
	}
	public void setEncSoapPath(String encSoapPath) {
		this.encSoapPath = encSoapPath;
	}
	public String getSignSoapPath() {
		return signSoapPath;
	}
	public void setSignSoapPath(String signSoapPath) {
		this.signSoapPath = signSoapPath;
	}
	public ArrayList getEncAttachList() {
		return encAttachList;
	}
	public void setEncAttachList(ArrayList encAttachList) {
		this.encAttachList = encAttachList;
	}
	public ArrayList getSignAttachList() {
		return signAttachList;
	}
	public void setSignAttachList(ArrayList signAttachList) {
		this.signAttachList = signAttachList;
	}

	public String getSaveMimePath() {
		return saveMimePath;
	}
	public void setSaveMimePath(String saveMimePath) {
		this.saveMimePath = saveMimePath;
	}
	
	public String getEncSign() {
		return encSign;
	}
	public void setEncSign(String encSign) {
		this.encSign = encSign;
	}
	
	public String getSaveSoapPath() {
		return saveSoapPath;
	}
	public void setSaveSoapPath(String saveSoapPath) {
		this.saveSoapPath = saveSoapPath;
	}
	public ArrayList getAttachList() {
		return attachList;
	}
	public void setAttachList(ArrayList attachList) {
		this.attachList = attachList;
	}
	public String getSaveXmlPath() {
		return saveXmlPath;
	}
	public void setSaveXmlPath(String saveXmlPath) {
		this.saveXmlPath = saveXmlPath;
	}
	
	public String getXmlTemplate() {
		return xmlTemplate;
	}
	public void setXmlTemplate(String xmlTemplate) {
		this.xmlTemplate = xmlTemplate;
	}
	public String getSoapTemplate() {
		return soapTemplate;
	}
	public void setSoapTemplate(String soapTemplate) {
		this.soapTemplate = soapTemplate;
	}
	
}
