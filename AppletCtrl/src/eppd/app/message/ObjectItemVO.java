package eppd.app.message;

import java.io.Serializable;

public class ObjectItemVO implements Serializable{
	
	private String Indent;	
	private String EoAType;	
	private String AttrName;
	private String xPath;
	
	public String getEoAType() {
		return EoAType;
	} 
	public void setEoAType(String eoAType) {
		EoAType = eoAType;
	}
	
	public String getIndent() {
		return Indent;
	}
	public void setIndent(String indent) {
		Indent = indent;
	}
	
	public String getAttrName() {
		return AttrName;
	}
	public void setAttrName(String attrName) {
		AttrName = attrName;
	}
	public String getXPath() {
		return xPath;
	}
	public void setXPath(String path) {
		xPath = path;
	}
	
}
