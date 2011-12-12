package eppd.app.message;

import java.io.Serializable;

public class HeaderAttachVO implements Serializable
{
	private String fileName;
	private String filePath;
	private String fileLineNo;
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getFileLineNo() {
		return fileLineNo;
	}
	public void setFileLineNo(String fileLineNo) {
		this.fileLineNo = fileLineNo;
	}
	
}
