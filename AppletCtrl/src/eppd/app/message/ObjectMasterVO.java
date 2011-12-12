package eppd.app.message;

import java.io.Serializable;

/**
 * @author sotec
 *
 */
public class ObjectMasterVO implements Serializable{
	
	private String DocCode;
	private String Indent;
	private String Iterator;
	private String EoAType;
	private String AttrName;
	private String xPath;
	
	private ObjectItemVO[] item;

	public String getEoAType() {
		return EoAType;
	}

	public void setEoAType(String eoAType) {
		EoAType = eoAType;
	}
	
	public String getDocCode() {
		return DocCode;
	}

	public void setDocCode(String docCode) {
		DocCode = docCode;
	}

	public String getIndent() {
		return Indent;
	}

	public void setIndent(String indent) {
		Indent = indent;
	}

	public String getIterator() {
		return Iterator;
	}

	public void setIterator(String iterator) {
		Iterator = iterator;
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

	public ObjectItemVO[] getItem() {
		return item;
	}

	public void setItem(ObjectItemVO[] item) {
		this.item = item;
	}

}
