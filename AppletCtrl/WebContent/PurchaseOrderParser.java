import java.io.StringReader;

import oracle.xml.parser.v2.DOMParser;
import oracle.xml.parser.v2.XMLDocument;

import com.mn.xml.GetXml;
import com.mn.xml.XMLUtil;



public class PurchaseOrderParser {
	public static void main(String[] args) throws Exception{
		DOMParser parser = new DOMParser();
	
		String filefullPath = "";
		filefullPath = "C://Documents and Settings/test/OrgTest.xml";
		
		String xmlString = new GetXml().getXmlDocument(filefullPath);
		StringReader sr = new StringReader(xmlString);	
		parser.parse(sr);
		
		XMLDocument doc = parser.getDocument();

		//Sender Info
		 String SenderContact  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:Contact" );
		 String Senderemail  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:EmailAddress" );
		 String SenderFaxNumber  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:FaxNumber" );
		 String SenderTelephoneNumber  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:TelephoneNumber" );
		 String SenderContactTypeIdentifier  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Sender/bdh:ContactInformation/bdh:ContactTypeIdentifier" );
		
		 //Receiver Info
		 String ReceiverContact  = XMLUtil.GetValues(doc, 
		 	     "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:Contact" );
		 String Receiveremail  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:EmailAddress" );
		 String ReceiverFaxNumber  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:FaxNumber" );
		 String ReceiverTelephoneNumber  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:TelephoneNumber" );
		 String ReceiverContactTypeIdentifier  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:Receiver/bdh:ContactInformation/bdh:ContactTypeIdentifier" );
		
		 //DocumentIdentification
		 String Standard  = XMLUtil.GetValues(doc, 
		         "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:Standard" );
		 String TypeVersion  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:TypeVersion" );
		 String InstanceIdentifier  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:InstanceIdentifier" );
		 String Type  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:Type" );
		 String MultipleType  = XMLUtil.GetValues(doc, 
		 		 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:MultipleType" );
		 String CreationDateAndTime  = XMLUtil.GetValues(doc, 
		         "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:DocumentIdentification/bdh:CreationDateAndTime" );
		 
		 //BusinessScope
		 String BusinessInstanceIdentifier  = XMLUtil.GetValues(doc, 
		         "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:BusinessScope/bdh:Scope/bdh:InstanceIdentifier" );
		 String ScopeInformation  = XMLUtil.GetValues(doc, 
				 "/*/StandardBusinessDocumentHeader/bdh:StandardBusinessDocumentHeader/bdh:BusinessScope/bdh:Scope/bdh:ScopeInformation" );
		 
		 //SenderInfo PrintOut
		 System.out.println("*************Sender*****************");
		 System.out.println("SenderContact:" + SenderContact);
		 System.out.println("Senderemail:" + Senderemail);
		 System.out.println("SenderFaxNumber:" + SenderFaxNumber);
		 System.out.println("SenderTelephoneNumber:" + SenderTelephoneNumber);
		 System.out.println("SenderContactTypeIdentifier:" + SenderContactTypeIdentifier);
		
		 //ReceiverInfo PrintOut
		 System.out.println("*************Receiver*****************");
		 System.out.println("ReceiverContact:" + ReceiverContact);
		 System.out.println("Receiveremail:" + Receiveremail);
		 System.out.println("ReceiverFaxNumber:" + ReceiverFaxNumber);
		 System.out.println("ReceiverTelephoneNumber:" + ReceiverTelephoneNumber);
		 System.out.println("ReceiverContactTypeIdentifier:" + ReceiverContactTypeIdentifier);
		
		 //DocumentIdentification PrintOut
		 System.out.println("*************DocumentIdentification*****************");
		 System.out.println("Standard:" + Standard);
		 System.out.println("TypeVersion:" + TypeVersion);
		 System.out.println("InstanceIdentifier:" + InstanceIdentifier);
		 System.out.println("Type:" + Type);
		 System.out.println("MultipleType:" + MultipleType);
		 System.out.println("CreationDateAndTime:" + CreationDateAndTime);
		 
		 //BusinessScope PrintOut
		 System.out.println("*************BusinessScope*****************");
		 System.out.println("BusinessInstanceIdentifier:" + BusinessInstanceIdentifier);
		 System.out.println("ScopeInformation:" + ScopeInformation);
	}
}


