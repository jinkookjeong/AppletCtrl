package eppd.app.mxml;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.io.FileUtils;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import oracle.xml.parser.v2.DOMParser;
import oracle.xml.parser.v2.XMLDocument;
import oracle.xml.parser.v2.XMLParseException;

import eppd.app.log.XLogger;
import eppd.app.message.HeaderAttachVO;
import eppd.app.message.HeaderRcvVO;
import eppd.app.message.HeaderVO;
import eppd.app.message.MessageBox;
import eppd.app.message.MessageMgr;
import eppd.app.message.XmlConstant;
import eppd.app.util.DirManager;
import eppd.app.util.IOUtil;
import eppd.app.util.StringUtil;
import eppd.app.util.XMLUtil;
import eppd.app.window.SendWindow;

public class MakeSoapFile {
	
	XmlConstant cont = null;
	XLogger logger = null;
	MessageMgr langMgr = null;
	String lang = "";
	
    public MakeSoapFile(){
	}
	
    
    public XmlConstant makeSoapFile(SendWindow winDlg) throws Exception
	{
		try 
		{
			cont = winDlg.cont;
			logger = winDlg.logger;
			langMgr = winDlg.langMgr;
			lang = winDlg.lang;
			
			DOMParser parser = new DOMParser(); 
			
			IOUtil ioUtil = new IOUtil();
			StringReader sr = new StringReader(ioUtil.ReadInfoXml(cont.getSaveXmlPath()));
		    parser.parse(sr);
			
		    XMLDocument doc = parser.getDocument();
		    
		    winDlg.setProgress(winDlg.getProgress()+5);
		    
		    //Header정보 축출 후 Soap Make
	        XMLDocument soapDoc = setSoapEnvelope(getXmlHeader(doc),cont, ioUtil);
	        setXmlInstanceId(doc, cont, ioUtil); 
	        
	        String targetSoapFilePath = (new StringBuilder()).append(DirManager.getDirSoap()).append(DirManager.fileSeparator).append(cont.getMsgId()+".soap").toString().toString();
		       
		    String resSoapString =  XMLUtil.documentToString(soapDoc,"");
	        String soapFilePath = ioUtil.writeStringToFile(null,resSoapString,"UTF-8",targetSoapFilePath); 
	        cont.setSaveSoapPath(soapFilePath);
	        
	        String subMsgId = cont.getMsgId().substring(0,cont.getMsgId().indexOf("."));
	        cont.setSaveSoapName(subMsgId+".soap");
	           
	        winDlg.setProgress(winDlg.getProgress()+5);
	        
	        logger.LogSave("saveSoapFilePath: "+soapFilePath);
	        
		} catch (ParserConfigurationException e) {	
			e.printStackTrace();
		} catch (XMLParseException e) {			
			e.printStackTrace();
		} catch (IOException e) {			
			e.printStackTrace();
		} catch (XPathExpressionException xe){
			xe.printStackTrace();
		}
		return cont;
	}

	private XMLDocument setSoapEnvelope(HeaderVO headerVo, XmlConstant cont, IOUtil ioUtil) throws Exception
	{
	    XMLDocument  soapDoc = null;
	  	try 
	  	{
	       String soapTemplate = cont.getSoapTemplate();
	       
	       DOMParser soapParser = new DOMParser(); 
		   StringReader sR = new StringReader(soapTemplate);
		   
		   soapParser.parse(sR);
		
		   soapDoc = soapParser.getDocument(); 
		   String sendPartId = headerVo.getSenderId()+":"+headerVo.getSenderContract()+":"+headerVo.getSenderEmail()+":"+headerVo.getSenderTel()+":"+headerVo.getSenderFax()+":"+headerVo.getSenderContractType();
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:From/eb:PartyId", sendPartId); //sender
		   
		   HeaderRcvVO[] rcvId = headerVo.getRcvVo();
		   int size = rcvId.length;
		   for(int i=0; i< size; i++)
		   {
			   String receiver = (String)rcvId[i].getReceiveId();
			   if(i > 0) { XMLUtil.copyNode(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:To"); }
			   
			   String rcvPartId = (String)rcvId[i].getReceiveContract()+":"+(String)rcvId[i].getReceiveEmail()+":"+(String)rcvId[i].getReceiveTel()+":"+(String)rcvId[i].getReceiveFax()+":"+(String)rcvId[i].getReceiveContractType();
			   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:To/eb:PartyId", rcvPartId, i); //receiveId
		   } 
		   String docMsgId = StringUtil.makeDocumentNumber(headerVo.getSenderId(),cont.getMsgId(),headerVo.getDocTitle());
		   cont.setDocMsgId(docMsgId);
		   
		   String msgId = "";
		   int tempIx = docMsgId.indexOf(".");
		   if(tempIx > -1){
			   msgId = docMsgId.substring(tempIx+1, tempIx+1+20);			  
		   }
		   cont.setMsgId(msgId);

		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:ConversationId", docMsgId); //make messageId
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:Service", StringUtil.getUserIP()); //Ipaddress
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:Action", headerVo.getDocCode()); //문서코드
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:MessageData/eb:MessageId", docMsgId);
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:MessageData/eb:Timestamp", StringUtil.getTimeStamp());
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:Description", headerVo.getDocCode());
		   
		   //Soap Body
		   XMLUtil.putAttrValue(soapDoc, "/SOAP:Envelope/SOAP:Body/eb:Manifest/eb:Reference", "xlink:href", "cid:ebxmlpayload00@pps.go.kr", 0); //Attribute
		   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Body/eb:Manifest/eb:Reference/eb:Description", headerVo.getDocCode());
		   HeaderAttachVO[] attchVo = headerVo.getAttachVo();
		   ArrayList attachList = new ArrayList();
		   if(attchVo != null)
		   {
			   int atSize = attchVo.length;
			   if(atSize > 20){ //20  이상
				   throw new Exception(langMgr.getMessage(lang, "1030")); //첨부문서 개수가 20개이상 초과하여 문서를 송신할 수 없습니다.
			   }
			   for(int i=1; i < atSize+1; i++)
			   {
				   String filePath = attchVo[i-1].getFilePath();
				   String fileName = attchVo[i-1].getFileName();
				   String idx = ""+i;
		    		if(i <= 9 ){
		    			idx = "0"+i;
		    		}	    		
		    	   String exd ="";
		    	   int lastIdx = filePath.lastIndexOf(".");
		    	   int sLangth = filePath.length();
		    	   
		    	   if(lastIdx > -1){
		    		   exd = filePath.substring(lastIdx+1, sLangth);
		    	   }
		    	   
				   XMLUtil.copyNode(soapDoc, "/SOAP:Envelope/SOAP:Body/eb:Manifest/eb:Reference");
				   XMLUtil.putAttrValue(soapDoc, "/SOAP:Envelope/SOAP:Body/eb:Manifest/eb:Reference", "xlink:href", "cid:ebxmlpayload"+idx+"@pps.go.kr", i); //Attribute
				   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Body/eb:Manifest/eb:Reference/eb:Description", filePath+"^"+fileName, i);
				   File orgAttach = new File(filePath);
				   long attachSize = (long)orgAttach.length();
				   System.out.println("attachSize=> "+attachSize);
				   if(attachSize > (7 * 1024 * 1024)){ //7M 이상
					 
					   throw new Exception(langMgr.getMessage(lang, "1028")); //송신할 문서의 크기가 7M를 초과하였습니다.
				   }else if(attachSize <= 0){
					   
					   throw new Exception(langMgr.getMessage(lang, "1029")+ "["+fileName+"]["+filePath+"]");	 //0 Size 문서는 첨부하실수 없습니다.			   				   
				   }
				   
				   String attachFilePath = (new StringBuilder()).append(DirManager.getDirAttach()).append(DirManager.fileSeparator).append(msgId+"."+idx+"."+exd).toString().toString();
				   FileUtils.copyFile(orgAttach, new File(attachFilePath));
				   attachList.add(attachFilePath);
			   }
		   }
		   
		   cont.setAttachList(attachList); //Attach File Add...
		  
		   //입찰서 참조처리
		   if(headerVo.getDocCode().equals("Bid"))
		   {
			   String bidAmount  = headerVo.getBidAmount();
			   String bidNoticeNum  = headerVo.getBidNoticeNum();
			   String bidNoticeSeq  = headerVo.getBidNoticeSeq();
			   String bidNoticeClass  = headerVo.getBidNoticeClass();
			   String bidNoticeBizNum  = headerVo.getBidNoticeBizNum();
			   String bidNoticeOrgNum  = headerVo.getBidNoticeOrgNum();
			   String bidNoticeNm  = headerVo.getBidNoticeNm();
			   String bidDocument = bidNoticeNum+"?"+bidNoticeSeq+"?"+bidNoticeClass+"?"+bidNoticeBizNum+"?"+bidNoticeOrgNum+"?"+bidNoticeNm;
			   XMLUtil.PutValues(soapDoc, "/SOAP:Envelope/SOAP:Header/eb:MessageHeader/eb:MessageData/eb:RefToMessageId", bidDocument);
		   }
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}  
	   return soapDoc;
	}
	
	private HeaderVO getXmlHeader(XMLDocument doc) throws Exception
	{
	     HeaderVO headerVo = new HeaderVO();	

	     String senderId  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:Identifier" );
		 String sendContract  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:Contact" );
		 String senderEmail  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:EmailAddress" );
		 String senderFax  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:FaxNumber" );
		 String senderTel  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:TelephoneNumber" );
		 String senderContractType  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:ContactTypeIdentifier" );
		 headerVo.setSenderId(senderId);
	     headerVo.setSenderContract(sendContract);
	     headerVo.setSenderEmail(senderEmail);
	     headerVo.setSenderFax(senderFax);
	     headerVo.setSenderTel(senderTel);
	     headerVo.setSenderContractType(senderContractType);
	
	     //DocCode
	     String docCode  = XMLUtil.GetValues(doc, 
	     		 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:InstanceIdentifier" );
	     headerVo.setDocCode(docCode);

	     //DocTitle
		 String docTitle = XMLUtil.GetValues(doc, 
         "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:BusinessScope/bdh:Scope/bdh:ScopeInformation" );
		 headerVo.setDocTitle(docTitle);
		 
		 //BusinessScope
		 String bzScopeId = XMLUtil.GetValues(doc, 
		         "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:BusinessScope/bdh:Scope/bdh:InstanceIdentifier" );
		 headerVo.setBzScopeId(bzScopeId);
 
	     NodeList nodeList = doc.getElementsByTagName("Receiver");
	     int size = nodeList.getLength();
	  
	     HeaderRcvVO[] hItem = new HeaderRcvVO[size];
	     for(int i=0; i< nodeList.getLength(); i++)
	     {
		   String receiveId  = XMLUtil.getNodeValue(doc, 
		 	     "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:Identifier", i );
		   String receiveContract  = XMLUtil.getNodeValue(doc, 
		 	     "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:Contact", i );
		   String receiveEmail  = XMLUtil.getNodeValue(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:EmailAddress", i );
		   String receiveFax  = XMLUtil.getNodeValue(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:FaxNumber", i );
		   String receiveTel  = XMLUtil.getNodeValue(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:TelephoneNumber", i );
		   String receiveContractType  = XMLUtil.getNodeValue(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:ContactTypeIdentifier", i );
		   HeaderRcvVO rcvItem = new HeaderRcvVO();
		   rcvItem.setReceiveId(receiveId);
		   rcvItem.setReceiveContract(receiveContract);
		   rcvItem.setReceiveEmail(receiveEmail);
		   rcvItem.setReceiveFax(receiveFax);
		   rcvItem.setReceiveTel(receiveTel);
		   rcvItem.setReceiveContractType(receiveContractType);
		   hItem[i] = rcvItem;
		   headerVo.setRcvVo(hItem);
	     }
	     try
	     {
		     NodeList attachList = doc.getElementsByTagName("AttachmentBinaryFile");
		     int asize = attachList.getLength();
		     HeaderAttachVO[] attachVo = new HeaderAttachVO[asize];
		     
		     for(int i=0; i< asize; i++)
		     {
		    	 String fileLineNo = XMLUtil.getNodeValue(doc, 
						 "/*/*/sbd:AttachmentBinaryFile/ram:LineCountNumeric", i );
		    	 String fileName  = XMLUtil.getNodeValue(doc, 
						 "/*/*/sbd:AttachmentBinaryFile/ram:Title", i );
		    	 String filePath  = XMLUtil.getNodeValue(doc, 
						 "/*/*/sbd:AttachmentBinaryFile/ram:FileName", i );
		    	 
		    	 if(!fileLineNo.equals(""))
		    	 {
			    	 HeaderAttachVO aVo = new HeaderAttachVO();
			    	 aVo.setFileLineNo(fileLineNo);
			    	 aVo.setFileName(fileName);
			    	 aVo.setFilePath(filePath);
			    	 attachVo[i] = aVo;
			    	 headerVo.setAttachVo(attachVo);
		    	 }
		     }
	     }catch(Exception ex){};
		 
	     if(docCode.equals("Bid"))
		 {
		   String bidAmount  = XMLUtil.GetValues(doc, "/*/Bid/sbd:BiddingDocument/ram:IncludedAmount");
		   String bidNoticeNum  = XMLUtil.GetValues(doc, "/*/Bid/sbd:BiddingDocument/ram:ReferenceBiddingNoticeDocument/ram:NumberID");
		   String bidNoticeSeq  = XMLUtil.GetValues(doc, "/*/Bid/sbd:BiddingDocument/ram:ReferenceBiddingNoticeDocument/ram:SequenceLineCountNumeric");
		   String bidNoticeClass  = XMLUtil.GetValues(doc, "/*/Bid/sbd:BiddingDocument/ram:ReferenceBiddingNoticeDocument/ram:GoodsClassificationID");
		   String bidNoticeBizNum  = XMLUtil.GetValues(doc, "/*/Bid/sbd:SupplierOrganization/ram:SubordinateProcuringOrganization/ram:BusinessRegistrationID");
		   String bidNoticeOrgNum  = XMLUtil.GetValues(doc, "/*/Bid/sbd:InstitutionOrganization/ram:SubordinateProcuringOrganization/ram:BusinessRegistrationID");
		   String bidNoticeNm  = XMLUtil.GetValues(doc, "/*/Bid/sbd:BiddingDocument/ram:ReferenceBiddingNoticeDocument/ram:Name");
           
		   headerVo.setBidAmount(bidAmount); //입찰금액
           headerVo.setBidNoticeNum(bidNoticeNum); //입찰번호
           headerVo.setBidNoticeSeq(bidNoticeSeq);//입찰차수
           headerVo.setBidNoticeClass(bidNoticeClass);//입찰분류번호
           headerVo.setBidNoticeBizNum(bidNoticeBizNum);//사업자번호
           headerVo.setBidNoticeOrgNum(bidNoticeOrgNum); //기관번호
           headerVo.setBidNoticeNm(bidNoticeNm); //입찰서명
		 }
	     
        return headerVo;	
	}

	
	private void setXmlInstanceId(XMLDocument doc, XmlConstant cont, IOUtil ioUtil) throws IOException
	{
		 XMLUtil.PutValues(doc, "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:BusinessScope/bdh:Scope/bdh:InstanceIdentifier", 
				 cont.getDocMsgId());
		
		 String xmlString =  XMLUtil.documentToString(doc,"");
	     String soapFilePath = ioUtil.writeStringToFile(null,xmlString,"UTF-8",cont.getSaveXmlPath()); 
	     cont.setSaveSoapPath(soapFilePath);	     
	}
}
