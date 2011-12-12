package eppd.app.message;

import java.io.Serializable;

public class HeaderVO implements Serializable
{
	private String senderId;
	private String senderContract;
	private String senderEmail;
	private String senderTel;
	private String senderFax;
	private String senderContractType;
	private String docCode;
	private String docTitle;
	private String bzScopeId;
	
	private String bidAmount;
	private String bidNoticeNum;
	private String bidNoticeSeq;
	private String bidNoticeClass;
	private String bidNoticeBizNum;
	private String bidNoticeOrgNum;
	private String bidNoticeNm;
	
	private HeaderRcvVO[] rcvVo;
    private HeaderAttachVO[] attachVo;
    
	public String getBidAmount() {
		return bidAmount;
	}
	public void setBidAmount(String bidAmount) {
		this.bidAmount = bidAmount;
	}
	
    public String getBidNoticeNum() {
		return bidNoticeNum;
	}
	public void setBidNoticeNum(String bidNoticeNum) {
		this.bidNoticeNum = bidNoticeNum;
	}
	public String getBidNoticeSeq() {
		return bidNoticeSeq;
	}
	public void setBidNoticeSeq(String bidNoticeSeq) {
		this.bidNoticeSeq = bidNoticeSeq;
	}
	public String getBidNoticeClass() {
		return bidNoticeClass;
	}
	public void setBidNoticeClass(String bidNoticeClass) {
		this.bidNoticeClass = bidNoticeClass;
	}
	public String getBidNoticeBizNum() {
		return bidNoticeBizNum;
	}
	public void setBidNoticeBizNum(String bidNoticeBizNum) {
		this.bidNoticeBizNum = bidNoticeBizNum;
	}
	public String getBidNoticeOrgNum() {
		return bidNoticeOrgNum;
	}
	public void setBidNoticeOrgNum(String bidNoticeOrgNum) {
		this.bidNoticeOrgNum = bidNoticeOrgNum;
	}
	public String getBidNoticeNm() {
		return bidNoticeNm;
	}
	public void setBidNoticeNm(String bidNoticeNm) {
		this.bidNoticeNm = bidNoticeNm;
	}	
	
    public String getDocTitle() {
		return docTitle;
	}

	public void setDocTitle(String docTitle) {
		this.docTitle = docTitle;
	}
	
	public String getDocCode() {
		return docCode;
	}

	public void setDocCode(String docCode) {
		this.docCode = docCode;
	}
	
	public HeaderRcvVO[] getRcvVo() {
		return rcvVo;
	}

	public void setRcvVo(HeaderRcvVO[] rcvVo) {
		this.rcvVo = rcvVo;
	}

	public HeaderAttachVO[] getAttachVo() {
		return attachVo;
	}

	public void setAttachVo(HeaderAttachVO[] attachVo) {
		this.attachVo = attachVo;
	}
    
	public String getSenderId() {
		return senderId;
	}

	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}
	public String getSenderContract() {
		return senderContract;
	}
	public void setSenderContract(String senderContract) {
		this.senderContract = senderContract;
	}
	public String getSenderEmail() {
		return senderEmail;
	}
	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}
	public String getSenderTel() {
		return senderTel;
	}
	public void setSenderTel(String senderTel) {
		this.senderTel = senderTel;
	}
	public String getSenderFax() {
		return senderFax;
	}
	public void setSenderFax(String senderFax) {
		this.senderFax = senderFax;
	}
	public String getSenderContractType() {
		return senderContractType;
	}
	public void setSenderContractType(String senderContractType) {
		this.senderContractType = senderContractType;
	}


	public String getBzScopeId() {
		return bzScopeId;
	}
	public void setBzScopeId(String bzScopeId) {
		this.bzScopeId = bzScopeId;
	}

	

}
