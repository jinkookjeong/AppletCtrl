package eppd.app.message;

import java.io.Serializable;

public class HeaderRcvVO implements Serializable
{
	private String receiveId;
	private String receiveContract;
	private String receiveEmail;
	private String receiveTel;
	private String receiveFax;
	private String receiveContractType;
	
	public String getReceiveId() {
		return receiveId;
	}
	public void setReceiveId(String receiveId) {
		this.receiveId = receiveId;
	}
	public String getReceiveContract() {
		return receiveContract;
	}
	public void setReceiveContract(String receiveContract) {
		this.receiveContract = receiveContract;
	}
	public String getReceiveEmail() {
		return receiveEmail;
	}
	public void setReceiveEmail(String receiveEmail) {
		this.receiveEmail = receiveEmail;
	}
	public String getReceiveTel() {
		return receiveTel;
	}
	public void setReceiveTel(String receiveTel) {
		this.receiveTel = receiveTel;
	}
	public String getReceiveFax() {
		return receiveFax;
	}
	public void setReceiveFax(String receiveFax) {
		this.receiveFax = receiveFax;
	}
	public String getReceiveContractType() {
		return receiveContractType;
	}
	public void setReceiveContractType(String receiveContractType) {
		this.receiveContractType = receiveContractType;
	}
	
}
