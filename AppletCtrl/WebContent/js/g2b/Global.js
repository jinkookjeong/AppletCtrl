/////////////////////////////////////////////////////
//  ?u ? JavaScript 
//
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//	 ? ip URL ? ? .
//	 BaseURL    ?? 
//	URL ?´.
	BaseURL = "http://www.g2b.go.kr:8074/";
	BidURL = "http://www.g2b.go.kr:8080/servlet/BidReceive/ED_BDV_JReceive";
	SendURL = "http://exms.g2b.go.kr:8080/Upload";
	SendBoxURL = "http://www.g2b.go.kr:8075/SndLst.jsp";
	ViewXmlURL = "http://exms.pps.go.kr:8087/";
	XslURL = "http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/";
	TemplateURL = "http://www.g2b.go.kr:8075/XlnWebServlet/exms/xml/";
	XsltURL = BaseURL + "xslt/";
	MrdURL = BaseURL + "mrd/";
	JspURL = BaseURL + "vend/jsp/";
	ActiveXHome = "C:\\G2B\\";
	RptFile = ActiveXHome + "prt\\report.txt";
	Infofile = ActiveXHome + "info\\vend.info";
	userID = "";

try{
	
	if(opener!=null) {
		if(opener.opener!=null){
			hFrame = opener.opener.top.frames[1].hframe;
			ActiveX = CommonG2B;
		}else{
			hFrame = opener.top.frames[1].hframe;
			ActiveX = CommonG2B;
		}
	} else {
		hFrame = top.frames[1].hframe;
		ActiveX =  CommonG2B;

	}
}
catch(eb) {
//alert("Access Denied !!!");

}


function Xml2DB(xid, docName, command, DocMNo, status)
{
	var outString = xid.xml;
	outString = outString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	var urlString = JspURL + docName + "_save.jsp?DocMNo=" + DocMNo + "&status=" + status + "&Command=" + command;
alert(urlString);
	var result = CommonG2B.TransformXml(outString, urlString);
	if(result.match("false")) {
		return false;
	}
	return true;
}

function downAll(docName, tableName)
{
	var Result = false;
	var userid = getUserID();
//alert(JspURL + "getDowndoc.jsp?docName=" + docName.toUpperCase() + "&tableName=" + tableName);
	var doc = CommonG2B.GetDataFromUrl(JspURL + "getDowndoc.jsp?docName=" + docName.toUpperCase() + "&tableName=" + tableName);
	if(!doc.match("error")&&doc.length>0)
	{
		var docList = doc.split("^");
		var str, adoc;
		for(var i=0; i< docList.length;i++)
		{
			//alert(" " + docList.length + "   ??.");
			str = docList[i];
			adoc = str.split("|");
			download(userid, adoc[0], adoc[1]);	
		}
	} else {
		alert("No Data");

	}
}



function download(userid, msgid, unikey , docStat)
{
//alert("userid="+userid+",unikey="+unikey+",msgid="+msgid);
	var fileName = unikey;
	if ( CommonG2B.GetLogXmlPath(msgid) == "" ) {
		var check = CommonG2B.ReceiveXml("http://exms.g2b.go.kr:8080/", userid, fileName);
		if(check == 0) {
			return false;
		}
	}
	var Result = CommonG2B.GetDataFromUrl(JspURL + "Xml_save.jsp?unikey="+unikey+"&docStat="+docStat);
	return true;
}




/////////////////////////////////////////////////////
// msgBox(msgid, comment, kind)
// msgid : 1:  
//         2: ? 
//         3:  
//         4: ? 
//         5:  
// kind : null : ?ο ?
//        ?  : Confirm ? (true, false  )
function msgBox(msgid, comment, kind) {
	return self.showModalDialog(JspURL + "msgBox.jsp?msg="+comment+"&kind="+kind+"&msgID="+msgid, "",
		 "title:no;status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;statusbar:no;scroll:no;dialogWidth:340px;dialogHeight:250px");
}



/**************************************************************************************/
// ÷ C:\G2B\ATTACH  ?.
/**************************************************************************************/
function SaveAttach(hForm, xid, docName){

	var DocManageNo = xid.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text;
	var DocNo = xid.selectSingleNode("/*/Header.Details/cc:Document.Number.Text/Text.Content").text;
	var ManageNo = "";
	var FileName = "";
	var MessageName = "";
	var attachedFileArray;
	if(DocManageNo==""){		//o   DocManagementNo , AttachNode Clone, AttachNode  ?	
		ManageNo = CommonG2B.MakeDocManageNo(getUserID(), DocNo);
		xid.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text = ManageNo;
		MessageName = xid.selectSingleNode("/*/Header.Details/cc:Message.Name/Text.Content").text;
		
		//Attach Node Clone
		CloneNode(hForm.srcDom, docName, "AttachList");
		
		//Attach?  ?? ?.
		attachedFileArray = ManageNo.split(".");	
		FileName = "C:\\G2B\\ATTACH\\"+attachedFileArray[1]+"."+attachedFileArray[2]+".xml";
		
		var length = hForm.srcDom.getElementsByTagName("AttachItem").length;	
		try{
			hForm.srcDom.getElementsByTagName("AttachItem/cc:Line.Number.Value/Numeric.Content").item(length-2).text = length-1;
			hForm.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.Name/Text.Content").item(length-2).text = MessageName;
			hForm.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(length-2).text = FileName;
			hForm.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.DocumentNumber.Text/Text.Content").item(length-2).text = ManageNo;
		}catch(eb){
			hForm.srcDom.getElementsByTagName("AttachItem/cc:Line.Number.Value/Numeric.Content").item(length-1).text = length;
			hForm.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.Name/Text.Content").item(length-1).text = MessageName;
			hForm.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(length-1).text = FileName;
			hForm.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.DocumentNumber.Text/Text.Content").item(length-1).text = ManageNo;
		}

	}
	else{
		attachedFileArray = DocManageNo.split(".");
		FileName = "C:\\G2B\\ATTACH\\"+attachedFileArray[1]+"."+attachedFileArray[2]+".xml";
	}
	
	// ÷ι 
	var attachString = xid.xml;
	attachString = attachString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	CommonG2B.SaveInfoTxt(FileName, attachString);

    //  
	messageID = saveXmlDoc(hForm.srcDom);
	if(messageID != "")
		alert("정상적으로 저장되었습니다.");	// alert(" ??.");
	
	//hForm.srcDom.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text = messageID;		
	
	return false;
}


/**************************************************************************************/
// ÷ C:\G2B\ATTACH  ?.
/**************************************************************************************/
function SaveAttach2(hFrame, xid, docName){
   
	var DocManageNo = xid.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text;
	var DocNo = xid.selectSingleNode("/*/Header.Details/cc:Document.Number.Text/Text.Content").text;
	var ManageNo = "";
	var FileName = "";
	var MessageName = "";
	var attachedFileArray;
	var hForm = hFrame.hform;

	if(DocManageNo==""){		//o   DocManagementNo , AttachNode Clone, AttachNode  ?	
		ManageNo = CommonG2B.MakeDocManageNo(getUserID(), DocNo);
		xid.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text = ManageNo;
		MessageName = xid.selectSingleNode("/*/Header.Details/cc:Message.Name/Text.Content").text;
		
		//Attach Node Clone
		CloneNode(hFrame.srcDom, docName, "AttachList");
		
		//Attach?  ?? ?.
		attachedFileArray = ManageNo.split(".");	
		FileName = "C:\\G2B\\ATTACH\\"+attachedFileArray[1]+"."+attachedFileArray[2]+".xml";
		
		var length = hFrame.srcDom.getElementsByTagName("AttachItem").length;	
		hFrame.srcDom.getElementsByTagName("AttachItem/cc:Line.Number.Value/Numeric.Content").item(length-1).text = length;
		hFrame.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.Name/Text.Content").item(length-1).text = MessageName;
		hFrame.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(length-1).text = FileName;
		hFrame.srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.DocumentNumber.Text/Text.Content").item(length-1).text = ManageNo;

	}
	else{
		attachedFileArray = DocManageNo.split(".");
		FileName = "C:\\G2B\\ATTACH\\"+attachedFileArray[1]+"."+attachedFileArray[2]+".xml";
	}
	
	// ÷ι 
	var attachString = xid.xml;
	attachString = attachString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	CommonG2B.SaveInfoTxt(FileName, attachString);

    //  
	messageID = saveXmlDoc(hFrame.srcDom);
	if(messageID != "")
		alert("정상적으로 저장되었습니다.");	// alert(" ??.");
	
	//hFrame.srcDom.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text = messageID;		
	
	return false;
}


/**************************************************************************************/
// ÷ C:\G2B\ATTACH  ?.
/**************************************************************************************/
function bidSaveAttach(hForm, xid, docName){
   
	var DocManageNo = xid.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text;
	var DocNo = xid.selectSingleNode("/*/Header.Details/cc:Document.Number.Text/Text.Content").text;
	var ManageNo = "";
	var FileName = "";
	var MessageName = "";
	var attachedFileArray;

	if(DocManageNo==""){		//o   DocManagementNo , AttachNode Clone, AttachNode  ?	
		ManageNo = CommonG2B.MakeDocManageNo(getUserID(), DocNo);
		xid.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text = ManageNo;
		MessageName = xid.selectSingleNode("/*/Header.Details/cc:Message.Name/Text.Content").text;

		var srcDom=new ActiveXObject("Microsoft.XMLDOM");
		srcDom.async = false;
		srcDom.loadXML(hForm.eleSrcDom.value);

//		alert(hForm.eleSrcDom.value);
//		alert(srcDom.xml);

		//Attach Node Clone
		CloneNode(srcDom, docName, "AttachList");
		
		//Attach?  ?? ?.
		attachedFileArray = ManageNo.split(".");	
		FileName = "C:\\G2B\\ATTACH\\"+attachedFileArray[1]+"."+attachedFileArray[2]+".xml";
		
		var length = srcDom.getElementsByTagName("AttachItem").length;	
		srcDom.getElementsByTagName("AttachItem/cc:Line.Number.Value/Numeric.Content").item(length-2).text = length;
		srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.Name/Text.Content").item(length-2).text = MessageName;
		srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(length-2).text = FileName;
		srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.DocumentNumber.Text/Text.Content").item(length-2).text = ManageNo;

//		alert(length);

		hForm.eleSrcDom.value = srcDom.xml;	
	}
	else{
		attachedFileArray = DocManageNo.split(".");
		FileName = "C:\\G2B\\ATTACH\\"+attachedFileArray[1]+"."+attachedFileArray[2]+".xml";
	}
	
	// ÷ι 
	var attachString = xid.xml;
	attachString = attachString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	CommonG2B.SaveInfoTxt(FileName, attachString);

    //  
	messageID = saveXmlDoc(srcDom);
	if(messageID != "")
		alert("정상적으로 저장되었습니다.");	// alert(" ??.");
	
	//hForm.srcDom.selectSingleNode("/*/Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text = messageID;		
	
	return false;
}






/**************************************************************************************/
// ?? XSL ?  о? Reqava300c.xsl, Reqava500x.xsl ?.
/**************************************************************************************/
function setXslName(xmldom, docName)
{
	var BusinessCode = xmldom.getElementsByTagName("gb:"+docName+"/cc:Business.Classification.Code/Code.Content").item(0).text;
	var outString = xmldom.xml;
	outString = outString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	outString = outString.replace(docName+"000c.xsl", docName+BusinessCode+"00c.xsl");	

	var xmldata = new ActiveXObject("Microsoft.XMLDOM");
	xmldata.async = false;
	xmldata.loadXML(outString);

	return xmldata;
}

/**************************************************************************************/
// XSLT ? ? o.
// DOM.xml return?.
// PC MSXML? ?.
/**************************************************************************************/
function Xml2Xml(xid, srcDoc, dstDoc)
{
	var xsldata = new ActiveXObject("Microsoft.XMLDOM");
	xsldata.async = false;
//alert(XsltURL + srcDoc + "_" + dstDoc + ".xslt");
	xsldata.load(XsltURL + srcDoc + "_" + dstDoc + ".xslt");


	var outString = xid.transformNode(xsldata);
	outString = outString.replace("<?xml version=\"1.0\" encoding=\"UTF-16\"?>","<?xml version=\"1.0\" encoding=\"EUC-KR\"?>");
	srcNS = "http://www.g2b.go.kr/" + srcDoc.toLowerCase();
	dstNS = "http://www.g2b.go.kr/" + dstDoc.toLowerCase();
	outString = outString.replace(srcNS,dstNS);
	
	var xmldata = new ActiveXObject("Microsoft.XMLDOM");
	xmldata.async = false;
	xmldata.loadXML(outString);

	outString = xmldata.xml;
	outString = outString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"EUC-KR\"?><?xml-stylesheet type=\"text/xsl\" href=\"" + XslURL + dstDoc+"000c.xsl\"?>");

	return outString;
}

/**************************************************************************************/
// XSLT ? ? o.
// DOM.xml return?.
//  ?? ??.
/**************************************************************************************/
function Xml2Xml2(xid, srcDoc, dstDoc)
{
	var hForm = hFrame.hform;
	if(hForm==null) {
		hFrame.location.href="/hidden.html"
		hForm = hFrame.hform;
	}
	
	hForm.action=JspURL + "viewXml.jsp";
	var outString = xid.xml;
	outString = outString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	var urlString = JspURL + "Xml2Xml.jsp?xsltURL=" + XsltURL + srcDoc + "_" + dstDoc + ".xslt&srcDoc=" + srcDoc + "&dstDoc=" + dstDoc;
//alert(urlString);
	var result = CommonG2B.TransformXml(outString, urlString);
//alert(result);
	if(result.match("false")) {
		return false;
	}
	return result;
}
function Xml2XmlView(xid, srcDoc, dstDoc)
{
	var outString = Xml2Xml(xid, srcDoc, dstDoc);
	if(outString.match("false")) {
		return false;
	}

	if(srcDoc == "Cospro" && dstDoc == "Reqpre"){
		outString = outString.replace("<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre000c.xsl\"?>", "<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre300c.xsl\"?>");
	}else if(srcDoc == "Adcsep" && dstDoc == "Reqpre"){
		outString = outString.replace("<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre000c.xsl\"?>", "<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre300c.xsl\"?>");
	}else if(srcDoc == "Cocpro" && dstDoc == "Reqpre"){
		outString = outString.replace("<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre000c.xsl\"?>", "<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre300c.xsl\"?>");
	}else if(srcDoc == "Adccop" && dstDoc == "Reqpre"){
		outString = outString.replace("<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre000c.xsl\"?>", "<?xml-stylesheet type=\"text/xsl\" href=\"http://www.g2b.go.kr:8075/XlnWebServlet/exms/xsl/Reqpre300c.xsl\"?>");
	}
//alert(outString);
	var hForm = hFrame.hform;
	hForm.action=JspURL + "viewXml.jsp";
	hForm.target = "main";
	hForm.xmlValue.value = outString;
	hForm.submit();
}
/**************************************************************************************/
// XSLT ? ? o.
// DOM return?.
/**************************************************************************************/
function Xml2XmlDom(xid, srcDoc, dstDoc)
{
	var xmldata = new ActiveXObject("Microsoft.XMLDOM");
	xmldata.async = false;
//alert(Xml2Xml(xid, srcDoc, dstDoc));
	xmldata.loadXML(Xml2Xml(xid, srcDoc, dstDoc));
//alert(xmldata.xml);	
	return xmldata;
}

/**************************************************************************************/
//  u ?.
/**************************************************************************************/
function setVendinfo(xmldom)
{
	var Result = false;
	var userInfo = CommonG2B.GetDataFromUrl(JspURL + "getUserinfo.jsp?kind=All");
	if(!userInfo.match("error"))
	{
		var delimeter="|";
		var infoPairs=userInfo.split(delimeter);
		for(var i=0; i< infoPairs.length;i++)
		{
			var delimeter2="=";
			var nameValueStr=infoPairs[i];			
			var nameValue=nameValueStr.split(delimeter2);
			var name=nameValue[0];			
			var value=nameValue[1];
			updateVendinfo(xmldom, name,value);	
		}
		Result = true;
	}
	return Result;	
}

function updateVendinfo(xmldata, name, value)
{
	var xmldom = xmldata.selectSingleNode("//Receiver.Details");
	if(xmldom==null)
		var xmldom = xmldata.selectSingleNode("//Supplier.Organization.Details");
	if(xmldom==null)
		var xmldom = xmldata.selectSingleNode("//Supplier.Details");
	if(xmldom==null)
		var xmldom = xmldata.selectSingleNode("//Supplier");
	if(xmldom==null)
		var xmldom = xmldata.selectSingleNode("//Guarantor.Organization.Details");
	if(xmldom==null)
		return false;

	
	if("Organization.Identifier".match(name))
	{
		var s1="Organization.Details/cc:Organization.Identifier/Identifier.Content";		//G2B?(???)  1
		updateXML2(xmldom, s1 , value, 0);
	}
	else if("Organization.Additional.Identifier".match(name))
	{
		var s2="Organization.Details/cc:Organization.Additional.Identifier/Identifier.Content";//u?  2
		updateXML2(xmldom, s2 , value, 0);
	}
	
	//s3,s4
	//var s3="/Receiver.Details/cc:Organization.Details/cc:Organization.Additional.Identifier2";    //uu?//3  ? ??
	//var s4="/Receiver.Details/cc:Organization.Details//cc:Organization.Additional.Identifier3";    //u?  4
	
	else if("Organization.Name".match(name))
	{
		var s5="Organization.Details/cc:Organization.Name/Text.Content";				//u         5
		updateXML2(xmldom, s5 , value, 0);
	}
	else if("Organization.CEO.Name".match(name))
	{
		var s6="Organization.Details/cc:Organization.CEO.Name/Text.Content";			//??       6
		updateXML2(xmldom, s6 , value, 0);
	}
	//s7,s8,s9
	//var s7="Organization.CEO.Ssn";					//??ι?    7
	//var s8="Telephone.Number.Text";					//??       8
	//var s9="Fax.Number.Text";							//??       9	
	else if("PostCode.Identifier".match(name))
	{
		var s10="Address.Details/cc:PostCode.Identifier/Identifier.Content";	//?      10
		updateXML2(xmldom, s10 , value, 0);
	}
	else if("Address.Line1.Text".match(name))
	{
		var s11="Address.Details/cc:Address.Line1.Text/Text.Content";			//?          11
		updateXML2(xmldom, s11 , value, 0);
	}
	else if("Address.Line2.Text".match(name))
	{
		var s12="Address.Details/cc:Address.Line2.Text/Text.Content";			//?      12	
		updateXML2(xmldom, s12 , value, 0);
	}	
	else if("Department.Name".match(name))
	{
		var s13="Employee.Details/cc:Department.Name/Text.Content";				//μ      13
		updateXML2(xmldom, s13 , value, 0);
	}
	else if("Employee.Name".match(name))
	{
		var s14="Employee.Details/cc:Employee.Name/Text.Content";				//?      14	
		updateXML2(xmldom, s14 , value, 0);
	}
	else if("Employee.Telephone.Number.Text".match(name))
	{
		var s15="Employee.Details/cc:Telephone.Number.Text/Text.Content";		//?		15	
		updateXML2(xmldom, s15 , value, 0);
	}
	else if("Employee.Fax.Number.Text".match(name))
	{
		var s16="Employee.Details/cc:Fax.Number.Text/Text.Content";			//?		16		
		updateXML2(xmldom, s16 , value, 0);
	}
	//else if("Employee.Email.Address".match(name))
	//{
	//	var s17="Employee.Details/cc:Email.Address/Text.Content";				//		17	
	//	updateXML2(xmldom, s17 , value, 0);
	//}	
	
}

/**************************************************************************************/
// ? Tag  ??.
/**************************************************************************************/
function setTagValue(tagName, tagValue, xmlDoc)
{
	var ElemList = xmlDoc.getElementsByTagName(tagName);
	if(ElemList.length == 1)
		ElemList.item(0).text = tagValue;
}


/**************************************************************************************/
// ? ??  α  ID о´.
/**************************************************************************************/
function getUserID()
{
	var UserID = "";

	try{
		UserID = CommonG2B.GetDataFromUrl(JspURL + "getUserinfo.jsp?kind=ID");
		if( UserID == null || UserID == "" || UserID == "null"){
			UserID = CommonG2B.GetDataFromUrl(JspURL+"getUserinfo.jsp?kind=ID");
				if(UserID != null && UserID != "" && UserID != "null"){
					UserID = trim(UserID);
				}
		}	
		else{
			UserID = trim(UserID);
		}
	}catch(e){
		return null;
	}	
	
	return UserID;
}

/**************************************************************************************/
// ? ??  α  ??? о´.
/**************************************************************************************/
function getUserMCode()
{
	var UserID = "";

	try{
		UserID = CommonG2B.GetDataFromUrl(JspURL + "getUserinfo.jsp?kind=MCode");
		if( UserID == null || UserID == "" || UserID == "null"){
			UserID = CommonG2B.GetDataFromUrl(JspURL+"getUserinfo.jsp?kind=MCode");
				if(UserID != null && UserID != "" && UserID != "null"){
					UserID = trim(UserID);
				}
		}	
		else{
			UserID = trim(UserID);
		}
	}catch(e){
		return null;
	}	
	return UserID;
}

/**************************************************************************************/
// ? ??  α   о´.
/**************************************************************************************/
function getUserInfo()
{
	var UserInfo = "";

	try{
		UserInfo = CommonG2B.GetDataFromUrl(JspURL + "getUserinfo.jsp?kind=All");
		
		if( UserInfo == null || UserInfo == "" || UserInfo == "null"){
			UserInfo = CommonG2B.GetDataFromUrl(JspURL+"getUserinfo.jsp?kind=All");
				if(UserInfo != null && UserInfo != "" && UserInfo != "null"){
					UserInfo = trim(UserInfo);
				}
		}	
		else{
			UserInfo = trim(UserInfo);
		}
	}catch(e){
		return null;
	}	
	return UserInfo;
}

/**************************************************************************************/
//  ??  а о´. 
/**************************************************************************************/
function getYegagubun(gonggoNo, gonggoCha)
{
	gubun = CommonG2B.GetDataFromUrl(JspURL + "bid/getYega.jsp?gonggo_num="+gonggoNo+"&gonggo_cha="+gonggoCha);
	return trim(gubun);
}

/**************************************************************************************/
//  ?? ? о´. 
/**************************************************************************************/
function getBidAmount(gonggoNo, gonggoCha,bunlyu,jaeipchal)
{
	var bidAmount = CommonG2B.GetDataFromUrl(JspURL + "bid/getBidAmount.jsp?gonggo_num="+gonggoNo+"&gonggo_cha="+gonggoCha+"&bunlyu="+bunlyu+"&jaeipchal="+jaeipchal);
	return trim(bidAmount);
}
function setBidAmount(newxmldom,oldxmldom)
{
	var gongo = oldxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.NotifyNumber.Text/Text.Content").item(0).text;
	var cha = oldxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.NotifySequenceNumber.Text/Text.Content").item(0).text;
	var bunlyu =  oldxmldom.getElementsByTagName("cc:Bidding.Classification.Value/Numeric.Content").item(0).text;
	var jaeipchal =  oldxmldom.getElementsByTagName("cc:Rebidding.Number.Value/Numeric.Content").item(0).text;
	if (trim(bunlyu)==""){bunlyu="0";}
	if (trim(jaeipchal)==""){jaeipchal="0";}

	newxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.Amount/Amount.Content").item(0).text = getBidAmount(gongo, cha,bunlyu,jaeipchal);
}

/**************************************************************************************/
//  ?? ? о´. 
/**************************************************************************************/
function getBidItem(gonggoNo, gonggoCha, bunlyu)
{
	var itemInfo = CommonG2B.GetDataFromUrl(JspURL + "bid/getBidItem.jsp?gonggo_num="+gonggoNo+"&gonggo_cha="+gonggoCha+"&bunlyu="+bunlyu);
	return trim(itemInfo);
}
function setBidItem(newxmldom,oldxmldom)
{
	var gongo = oldxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.NotifyNumber.Text/Text.Content").item(0).text;
	var cha = oldxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.NotifySequenceNumber.Text/Text.Content").item(0).text;
	var bunlyu =  oldxmldom.getElementsByTagName("cc:Bidding.Classification.Value/Numeric.Content").item(0).text;
	if (trim(bunlyu)==""){bunlyu="0";}
	var itemInfo = getBidItem(gongo, cha, bunlyu);

	var infoPairs = itemInfo.split("|");
	newxmldom.getElementsByTagName("Item.Identifier.Details/cc:Item.Name/Text.Content").item(0).text = infoPairs[0];
	newxmldom.getElementsByTagName("Item.Identifier.Details/Quantity.Quantity/Quantity.Content").item(0).text = infoPairs[1];
}

/**************************************************************************************/
//  ?? ? о´. 
/**************************************************************************************/
function getEstimated(gonggoNo, gonggoCha)
{
	var itemInfo = CommonG2B.GetDataFromUrl(JspURL + "bid/getEstimated.jsp?gonggo_num="+gonggoNo+"&gonggo_cha="+gonggoCha);
	return trim(itemInfo);
}
function setEstimated(newxmldom,oldxmldom)
{
	var gongo = oldxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.NotifyNumber.Text/Text.Content").item(0).text;
	var cha = oldxmldom.getElementsByTagName("Bidding.Details/cc:Bidding.NotifySequenceNumber.Text/Text.Content").item(0).text;
	var itemInfo = getEstimated(gongo, cha);

	newxmldom.getElementsByTagName("Bidding.Details/cc:Estimated.Amount/Amount.Content").item(0).text = itemInfo;
}

/**************************************************************************************/
//  ???? ? о´.
/**************************************************************************************/
function setIteminfo(gonggoNo, gonggoCha, bunlyu,xmldom)
{
	var itemInfo = CommonG2B.GetDataFromUrl(JspURL + "getIteminfo.jsp?gonggo_num="+gonggoNo+"&gonggo_cha="+gonggoCha+"&bunlyu="+bunlyu);
	itemInfo=trim(itemInfo);
	//alert("itemInfo:"+itemInfo);

	var Result = false;
	
	if(!"error".match(itemInfo))
	{
		var delimeter="|";
		var infoPairs=itemInfo.split(delimeter);
		var ClassificationCode=trim(infoPairs[0]);
		var ClassificationName=trim(infoPairs[1]);
		var AdditionalCode=trim(infoPairs[2]);									//ι?з? 3

		if (ClassificationCode==null){ClassificationCode="";};
		if (ClassificationName==null){ClassificationName="";};
		if (AdditionalCode==null){AdditionalCode="";};
  


		var s1="//Item.Identifier.Details/cc:Item.Classification.Identifier/Identifier.Content";	// 1 ?з 1			
		var s2="//Item.Identifier.Details/Item.Classification.Name/Text.Content";			// 2 ?з 2			
		var s3="//Item.Identifier.Details/cc:Item.AdditionalClassification.Identifier/Identifier.Content";		// 3 ι?з? 3			

		updateXML2(xmldom, s1 , ClassificationCode, 0);
		updateXML2(xmldom, s2 , ClassificationName, 0);
		updateXML2(xmldom, s3 , AdditionalCode, 0);
		
		Result = true;
	}
	return Result;		
}

/**************************************************************************************/
// XML? XSLT MRD ?? μ?.
/**************************************************************************************/
function printXmlDoc(xmlDom, mrdName)
{
	var xsltName = MrdURL+mrdName.substring(0,6)+".xsl";	
	
	if(mrdName.match("Dpdrer"))
		xsltName = MrdURL+"DpdrerPrintOut.xsl";
	else if(mrdName.match("CotitpP"))
		xsltName = MrdURL+"PPS_CotitpPrintOut.xsl";
	else if(mrdName.match("CotitpMP"))
		xsltName = MrdURL+"PPS_CotitpPrintOut.xsl";
	else if(mrdName.match("CotitpMG"))
		xsltName = MrdURL+"G2B_CotitpPrintOut.xsl";
	else if(mrdName.match("CotitpL"))
		xsltName = MrdURL+"PPS_CotitpPrintOut.xsl";
	else if(mrdName.match("CotitpML"))
		xsltName = MrdURL+"PPS_CotitpPrintOut.xsl";

	//if(mrdName.match("Bidsit")||mrdName.match("Bidsco")||mrdName.match("Bidsse")||mrdName.match("Bidlea"))
	//	xsltName = MrdURL+"G2BPrintOut.xsl";
	//alert(xsltName);
	//var xsltName = MrdURL+"G2BPrintOut.xsl";	
	var xslDom = new ActiveXObject("Microsoft.XMLDOM");
	xslDom.async = false;
	xslDom = CommonG2B.GetXmlUrl(xsltName);

//	if(mrdName == 'Rdecco') {
//
//        alert(xslDom);
//	}

	if(xslDom == null || xslDom.xml == "") {
		alert('XSLT Loading Error.');
		return false;
	}
	
	//added in 2003.02.18 asked by sisl team
	var docType = mrdName.substr(0,6).toUpperCase();
	if( docType =='COCPRO' || docType == 'COSPRO'){
		xmlDom = removeDuplicatedLineItem(xmlDom);
	}


	var printStr = xmlDom.transformNode(xslDom);
	printStr = printStr.replace(/\|\s+\|/g, "||").replace(/\|\s+\|/g, "||");
	CommonG2B.SaveInfoTxt(RptFile, printStr);
	
	//워터마크 적용을 위해 수정함(2005.02.13 hjshin)=================================
	var outString = xmlDom.xml.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	
	// IE8 대비 window.open 옵션추가 (090430 박재우)
	if ( mrdName == "CotitpG"){
			window.open("","_new","left=100,top=0,width=800,height=600, scrollbars=yes,toolbar=no,menubar=no,resizable=yes, status=no");
			top.frames[0].vend.action="http://www.g2b.go.kr:8071/common/print_html.jsp";//구매계약서(일반계약)
			top.frames[0].vend.method ="POST";
			top.frames[0].vend.xmlValue.value = outString;		
			top.frames[0].vend.target="_new";
			top.frames[0].vend.submit();

	}else if ( mrdName == "CotitpG1"){
			window.open("","_new","left=100,top=0,width=800,height=600, scrollbars=yes,toolbar=no,menubar=no,resizable=yes, status=no");
			top.frames[0].vend.action="http://www.g2b.go.kr:8071/common/print_html_1.jsp";//구매계약서(공동계약)
			top.frames[0].vend.method ="POST";
			top.frames[0].vend.xmlValue.value = outString;		
			top.frames[0].vend.target="_new";
			top.frames[0].vend.submit();
	}else if ( mrdName == "CotitpMG"){
			window.open("","_new","left=100,top=0,width=800,height=600, scrollbars=yes,toolbar=no,menubar=no,resizable=yes, status=no");
			top.frames[0].vend.action="http://www.g2b.go.kr:8071/common/print_htmlB.jsp";//변경계약서(일반계약)
			top.frames[0].vend.method ="POST";
			top.frames[0].vend.xmlValue.value = outString;		
			top.frames[0].vend.target="_new";
			top.frames[0].vend.submit();
	}else if ( mrdName == "CotitpMG1"){
			window.open("","_new","left=100,top=0,width=800,height=600, scrollbars=yes,toolbar=no,menubar=no,resizable=yes, status=no");
			top.frames[0].vend.action="http://www.g2b.go.kr:8071/common/print_htmlB_1.jsp";//변경계약서(공동계약)
			top.frames[0].vend.method ="POST";
			top.frames[0].vend.xmlValue.value = outString;		
			top.frames[0].vend.target="_new";
			top.frames[0].vend.submit();
	} else if (mrdName == "cotitp_G_RE" )
    {

		//계약응답서(일반계약)
		var xslName = "http://www.g2b.go.kr:8071/mrd/Cotitp_G_PrintOut.xsl";


		CommonG2B.SaveInfoTxt(RptFile, getTextToPrint(xmlDom, xslName));
		printwin = open("http://www.g2b.go.kr:8071/common/print.jsp?fileName="+mrdName,'Print',"left=100,top=10,width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,resizable=yes");

	} else if (mrdName == "cotitp_G_RE1" )
	{

		//계약응답서(공동계약)
		var xslName = "http://www.g2b.go.kr:8071/mrd/Cotitp_G1_PrintOut.xsl";


		CommonG2B.SaveInfoTxt(RptFile, getTextToPrint(xmlDom, xslName));
		printwin = open("http://www.g2b.go.kr:8071/common/print.jsp?fileName="+mrdName,'Print',"left=100,top=10,width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,resizable=yes");

	} else if (mrdName == "cotitp_M_RE" )
	{
		
		//수정계약응답서(일반계약)
		var xslName = "http://www.g2b.go.kr:8071/mrd/Cotitp_M_PrintOut.xsl"; 


		CommonG2B.SaveInfoTxt(RptFile, getTextToPrint(xmlDom, xslName));
		printwin = open("http://www.g2b.go.kr:8071/common/print.jsp?fileName="+mrdName,'Print',"left=100,top=10,width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,resizable=yes");
	} else if (mrdName == "cotitp_M_RE1" )
	{
		
		//수정계약응답서(공동계약)
		var xslName = "http://www.g2b.go.kr:8071/mrd/Cotitp_M1_PrintOut.xsl"; 


		CommonG2B.SaveInfoTxt(RptFile, getTextToPrint(xmlDom, xslName));
		printwin = open("http://www.g2b.go.kr:8071/common/print.jsp?fileName="+mrdName,'Print',"left=100,top=10,width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,resizable=yes");
		
	}else{
		printwin = window.open(JspURL+"print.jsp?fileName="+mrdName,'Print',"left=100,top=10,width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,resizable=yes");
	}
}

/**************************************************************************************/
// XML? ?? ?.(??)
/**************************************************************************************/
function viewXmlDoc(URL)
{
	var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
	xmlDom.async = false;
	URL = JspURL + URL;
	xmlDom = CommonG2B.GetXmlUrl(URL);
}

/**************************************************************************************/
// ? ??.
/**************************************************************************************/
function sendXmlDoc(xmlDom, messageID, docName, encType)
{	
	messageID = saveXmlDoc(xmlDom);
	if(messageID == "")	return;
	//alert("sendXmlDoc 고유번호생성 : "+messageID);

	var sendMsgID = CommonG2B.SendXmlFile(messageID, SendURL, getUserID(), encType);
	//var sendMsgID = ActiveX.SendXmlFile(messageID, SendURL, getUserID(), "NOT");

	//if(sendMsgID == messageID) {
	//	alert("정상적으로 송신되었습니다.");
	//	return sendMsgID;
	//}
	//else	return sendMsgID;
	if(sendMsgID != null && sendMsgID.length > 29 && sendMsgID == messageID) {
		//alert("정상적으로 송신되었습니다.");
		msgBox("4", "", "");
		return sendMsgID;
	}
	else	return false;
}
/**************************************************************************************/
// ?  ? ?οu?μ ?    setVendinfo()
/**************************************************************************************/
function sendXmlDocP(xmlDom, messageID, docName, encType)
{	
	messageID = saveXmlDocP(xmlDom);
	//alert("sendXmlDocP"+messageID);
	
	/* OLD_SOURCE_START */
	/*
	if(messageID == "")	return;
	*/
	/* OLD_SOURCE_END */
	/* G2B_운영위탁_2010-04-28_박종혁 */
	/* NEW_SOURCE_START */
	if(messageID == "" || messageID =="0" || messageID.length<=29 || messageID==null)	return;
	/* NEW_SOURCE_END */

	var sendMsgID = CommonG2B.SendXmlFile(messageID, SendURL, getUserID(), encType);
	//var sendMsgID = ActiveX.SendXmlFile(messageID, SendURL, getUserID(), "NOT");

	//if(sendMsgID == messageID) {
	//	alert("정상적으로 송신되었습니다.");
	//	return sendMsgID;
	//}
	//else	return sendMsgID;
	if(sendMsgID != null && sendMsgID.length > 29 && sendMsgID == messageID) {
		//alert("정상적으로 송신되었습니다.");
		msgBox("4", "", "");
		return sendMsgID;
	}
	else	return false;
}

/**************************************************************************************/
// ÷ι ? ? ??.
/**************************************************************************************/
function sendXmlAttachDoc(xmlDom, messageID, docName, encType, FileNameArray, Code)
{	
	var flag = true;
	messageID = saveXmlDoc(xmlDom);
	if(messageID == "")	return;
	
	for(var i=0; i<FileNameArray.length; i++){
		if(!CommonG2B.ModifyXslName(FileNameArray[i], Code)){
			flag = false;
			break;
		}
	}

	if(flag == false)	return false;
	var sendMsgID = CommonG2B.SendXmlFile(messageID, SendURL, getUserID(), encType);
	//var sendMsgID = ActiveX.SendXmlFile(messageID, SendURL, getUserID(), "NOT");

	//if(sendMsgID == messageID) {
	//	alert("정상적으로 송신되었습니다.");
	//	return sendMsgID;
	//}
	//else	return sendMsgID;
	if(sendMsgID != null && sendMsgID.length > 29 && sendMsgID == messageID) {
		//alert("정상적으로 송신되었습니다.");
		return sendMsgID;
	}
	else	return false;
}

/**************************************************************************************/
// ÷ι ? ? ??.
/**************************************************************************************/
function sendXmlAttachDocP(xmlDom, messageID, docName, encType, FileNameArray, Code)
{	
	var flag = true;
	messageID = saveXmlDocP(xmlDom);
	if(messageID == "")	return;
	
	for(var i=0; i<FileNameArray.length; i++){
		if(!CommonG2B.ModifyXslName(FileNameArray[i], Code)){
			flag = false;
			break;
		}
	}

	if(flag == false)	return false;
	var sendMsgID = CommonG2B.SendXmlFile(messageID, SendURL, getUserID(), encType);
	//var sendMsgID = ActiveX.SendXmlFile(messageID, SendURL, getUserID(), "NOT");

	//if(sendMsgID == messageID) {
	//	alert("정상적으로 송신되었습니다.");
	//	return sendMsgID;
	//}
	//else	return sendMsgID;
	if(sendMsgID != null && sendMsgID.length > 29 && sendMsgID == messageID) {
		alert("정상적으로 송신되었습니다.");
		return sendMsgID;
	}
	else	return false;
}

/**************************************************************************************/
// ,  ??.
/**************************************************************************************/
function sendBidDoc(xmlDom, messageID, docName, encType)
{
	messageID = saveXmlDoc(xmlDom);
	var sendMsgID = CommonG2B.SendXmlFile(messageID, SendURL, getUserID(), encType);
	if(sendMsgID != null && sendMsgID.length > 29 && sendMsgID == messageID) return true;
	else	return false;
}


/**************************************************************************************/
// ? PC ? ?.
/**************************************************************************************/
function saveXmlDoc(xmlDom)
{
	updateXML2(xmlDom, '//cc:Message.Sender.Identifier/Identifier.Content', getUserID(), 0);		
	setVendinfo(xmlDom);
	var messageID = CommonG2B.SaveXmlFile(xmlDom);
	updateXML2(xmlDom, '//cc:Document.ManagementNumber.Text/Text.Content', messageID, 0);
	return messageID;
}
/**************************************************************************************/
// ? PC ? ?.(? ? u?οu?μ  
/**************************************************************************************/
function saveXmlDocP(xmlDom)
{
	updateXML2(xmlDom, '//cc:Message.Sender.Identifier/Identifier.Content', getUserID(), 0);
//	setVendinfo(xmlDom);
	var messageID = CommonG2B.SaveXmlFile(xmlDom);
	updateXML2(xmlDom, '//cc:Document.ManagementNumber.Text/Text.Content', messageID, 0);
	return messageID;
}
/**************************************************************************************/
// ? PC ? ?.(? ? u?οu?μ  
/**************************************************************************************/
function saveXmlDocP1(xmlDom)
{
	updateXML2(xmlDom, '/TaxInvoice/ApplicationArea/Extension/Header.Details/Message.Sender.Identifier', getUserID(), 0);		
	setVendinfo(xmlDom);
    
	//Management.Identifier- 관리번호 추가(납품요구번호 + 년(05)월일시분초)최대 25자
	
	var now = new Date();
	var year = now.getYear();
	var month = now.getMonth()+1;
	var date = now.getDate();	
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	
	var datetime = year+""+month+""+date+""+hour+""+minute+""+second;	
	var NabNo = xmlDom.selectSingleNode("/TaxInvoice/DataArea/Header/Extension/Original.DocumentManagementNumber.Text").text;

	updateXML2(xmlDom, '/TaxInvoice/DataArea/Header/Management.Identifier', NabNo+""+datetime.substring(2,datetime.length), 0);

	//Creation.DateTime
	var Cdate = xmlDom.selectSingleNode("/TaxInvoice/DataArea/Header/Document.DateTime").text;
	updateXML2(xmlDom, '/TaxInvoice/ApplicationArea/Creation.DateTime', Cdate, 0);
		
	var messageID = CommonG2B.SaveTaxInvoiceXmlFile(xmlDom);
	updateXML2(xmlDom, '/TaxInvoice/ApplicationArea/Extension/Header.Details/Document.ManagementNumber.Text', messageID, 0);
	
	return messageID;
}

/**************************************************************************************/
// ? о´.
/**************************************************************************************/
function GetCookie (name) 
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal (j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}
	return null;
}
function getCookieVal (offset) 
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { 
		endstr = document.cookie.length; 
	}
	return unescape(document.cookie.substring(offset, endstr));
}


/**************************************************************************************/
// ?? ? ?θ ??.(??)
/**************************************************************************************/
/*
var RelateDoc = [ 
	"u:Reqesi", 
	"?:Orders", "?u:Purich", 
	"??u:Itdere", "??u:Itdrch",
	"???:Cotitp",
	"???뺸:Dpdrer",
	"???:Idelre",
	"?u:Dreqso",
	"?u?οu:Coreqc",
	"?:Cocpro", "??:Adccop", 
	"?uu:Rcopcc", "뺸κu:Rslcha",
	"뺸?οu:Rslcon",
	"??μ:Rerave", "??μ:Rrecex",
	"?u:Reqava", "?u?οu:Coreev",
	"?u:Recomv", "?u?οu:Conrcv",
	"뿪?:Cospro", "뿪?:",
	"뿪밡?μ:"
]; 

var OrdersDoc = ["??:Reords"];
var CocproDoc = ["?:Cocpro", ":", "??οu:", "??οu:"];
		 

function isRelatedDoc1(docName) 
{
	var Result = "false";

	for(i=0; i<RelateDoc.length; i++) {
		if(((RelateDoc[i]).toUpperCase().search(docName.toUpperCase())) != -1) {
			Result = true;
			break;
		}
	}
	return Result;
}

//function getRelatedDoc(docName) 
function isRelatedDoc(docName) 
{
	var str = docName + "Doc.toString()";
//alert(eval(str));
	return eval(str);
}
*/

/**************************************************************************************/
// PC ? ? u ? о´.
/**************************************************************************************/
function getVendinfo(textfld, index) 
{
	var infoString = "";

	if(CommonG2B.IsFileExist(Infofile) == true) {
		infoString = CommonG2B.ReadInfoTxt(Infofile);
	}

	if(infoString != "") {
		var arrayInfo = infoString.split("|");
		var arrayField = arrayInfo[index].split("=");
		textfld.value = arrayField[1];
	}

}

function appendNew(rootStr, xmlID, listID, listName) {
var parentNode;
	if (listName != '')
		//var parent = xmlID.selectSingleNode(listName);
		parentNode = xmlID.selectSingleNode(rootStr + "/" + listName);
	else 
		parentNode = xmlID;

//	var parentNode = xmlID.selectSingleNode("gb:Reqpre/AttachList");

	var TemplateNode = new ActiveXObject("Microsoft.XMLDOM");
	TemplateNode.async = false;

	//TemplateNode = ActiveX.GetXmlUrl("http://www.g2b.go.kr:8074/XlnWebServlet/exms/xml/ReqpreA.xml");	
	var rootName = rootStr.split(":");
	var xmlName = TemplateURL + rootName[1] + "000c.xml";	//blueworm
	templateNode = CommonG2B.GetXmlUrl( xmlName );
	if(TemplateNode == null){
		return false;
	}

//	var aNode = TemplateNode.selectSingleNode("gb:Reqpre/AttachList");			
	var aNode = templateNode.selectSingleNode(rootStr + "/" + listName);
	alert("rootStr=" + rootStr + " listName=" + listName);
	//deleteNamespaces(aNode);

	alert("parentNode.childNodes.length=" + parentNode.childNodes.length);
	var cloneNode = aNode.lastChild.cloneNode(true);
	parentNode.appendChild(cloneNode);

	//---------------------------------------------
	var list = listID.selectSingleNode(listName);
	var cloneNode2 = aNode.lastChild.cloneNode(true);
	list.appendChild(cloneNode2);

	alert("parentNode.childNodes.length=" + parentNode.childNodes.length);
	return parentNode;
}

/**************************************************************************************/
// XML ? ? Template о?  ?  XML? ??.
// rootStr : 'gb:Reqpre',  //xmlID   : xid, //listID  : xattachlist, //listName: 'AttachList'
/**************************************************************************************/
/*
function appendNew(rootStr, xmlID, listID, listName)
{
	if (listName != '')
		//var parent = xmlID.selectSingleNode(listName);
		var parent = xmlID.selectSingleNode(rootStr + "/" + listName);
	else 
		var parent = xmlID;

	var list = listID.selectSingleNode(listName);

	var templateDOM = new ActiveXObject("Microsoft.XMLDOM");
	templateDOM.async = false;

	var rootName = rootStr.split(":");
	var xmlName = TemplateURL + rootName[1] + "000c.xml";	//blueworm
//	var xmlName = TemplateURL + rootName[1] + "100c.xml";	//blueworm
//alert(xmlName);
	
	templateDOM = CommonG2B.GetXmlUrl( xmlName );
	if(templateDOM == null) {
		//alert("Template XML    ?.");
		alert("Template XML 파일을 열 수 없습니다.");
		return;
	}
//alert(templateDOM.xml);

	var aNode = templateDOM.selectSingleNode(rootStr + "/" + listName);
	//alert(aNode.xml);


	//var aNode = templateDOM.selectSingleNode("/gb:Cospro/AttachList");
	//var aNode = templateDOM.selectNodes(rootStr + "/" + listName);
	//var aNode = templateDOM.getElementsByTagName("/gb:Cospro/AttachList");
	
	//deleteNamespaces(aNode);

	//var cloneNode = aNode.lastChild.cloneNode(true);
	//var cloneChildNode = aNode.lastChild.cloneNode(true);
	//parent.appendChild(cloneNode);
	//list.appendChild(cloneChildNode);

	var bool = appendTree(aNode.lastChild, parent);
	alert("bool : " + bool.xml);
	var bool2 = appendTree(aNode.lastChild, list);
	alert("bool2 : " + bool2.xml);
}
*/
function deleteNamespaces(node) {	// added by DKLEE
    var attrs = node.Attributes;
	
	try{
		for (var i=attrs.length-1; i>=0; i--) {
			 //alert(attrs.item(i).nodeName);
			 node.removeAttribute(i);
		}
	}catch(eq){}

    var child = node.lastChild;
    while ( child != null ) {
        deleteNamespaces(child);
        child = child.previousSibling;
    }
}

function appendTree(node, dstParent) {	// added by DKLEE
      
	if ( node == null ) return null;
    if ( dstParent == null ) return null; 

    var dstDoc = dstParent.ownerDocument;
    // Copy Node
    var newNode = dstDoc.createNode(node.nodeType, node.nodeName, node.namespaceURI);		//error

	
	try{
		newNode.nodeValue = node.nodeValue;
	}catch(e){}


	// Copy Attribute 
/*
    var attrs = node.Attributes;
	if(attrs != null){
		for (var i=0; i < attrs.length; i++) {
			var newAttr = dstDoc.createAttribute(attrs.item(i).nodeName);
			newAttr.nodeValue = attrs.item(i).nodeValue;
			newNode.setAttributeNode(newAttr);
		}
	}
*/
    dstParent.appendChild(newNode);
	// Copy Child
    var child = node.firstChild;
    while ( child != null ) {
        appendTree(child, newNode);
        child = child.nextSibling;
    }
	return newNode;
}

function copyTreeValue(node, dstNode) {	// added by DKLEE
      
	if ( node == null ) return null;
    if ( dstNode == null ) return null; 

	try{
		dstNode.nodeValue = node.nodeValue;
	}catch(e){}


	// Copy Attribute 
/*
    var attrs = node.Attributes;
	if(attrs != null){
		for (var i=0; i < attrs.length; i++) {
			var newAttr = dstDoc.createAttribute(attrs.item(i).nodeName);
			newAttr.nodeValue = attrs.item(i).nodeValue;
			newNode.setAttributeNode(newAttr);
		}
	}
*/
	// Copy Child
    var child = node.firstChild;
    var dstChild = dstNode.firstChild;
    while (( child != null ) && ( dstChild != null)) {
		if (child.dataType!=NODE_ELEMENT ) {
	        child = child.nextSibling;
			continue;
		}
		if (dstChild.dataType!=NODE_ELEMENT ) {
	        child = dstChild.nextSibling;
			continue;
		}
        copyTreeValue(child, dstChild);
        child = child.nextSibling;
        dstChild = dstChild.nextSibling;
    }
}

/**************************************************************************************/
// XML ? ? Template о?  ?  XML? ??.
// rootStr : 'gb:Reqpre',  //xmlID   : xid, //listID  : xattachlist, //listName: 'AttachList'
/**************************************************************************************/
function CloneNode(xmldom, docName, node)
{
/* Template ?
//alert(xmldom.xml);
//alert("docName:"+docName+", node:"+node);
	var nodeName = "//" + node;
//alert("nodeName:"+nodeName);
	var parentNode = xmldom.selectSingleNode(nodeName);
//alert("parentNode:"+parentNode.xml);
	var TemplateNode = new ActiveXObject("Microsoft.XMLDOM");
	TemplateNode.async = false;
	TemplateNode = CommonG2B.GetXmlUrl(TemplateURL + docName + "000c.xml");	
	if(TemplateNode == null)
		return false;

	var aNode = TemplateNode.selectSingleNode(nodeName);			
	var cloneNode = aNode.lastChild.cloneNode(true);
	parentNode.appendChild(cloneNode);	
//alert("parentNode2:"+parentNode.xml);
//	return xmldom;
*/
	var nodeName = "//" + node;
	var parent = xmldom.selectSingleNode(nodeName);
	var childNode = parent.lastChild.cloneNode(true);
	parent.insertBefore(childNode, parent.lastChild);
//alert(parent.xml);

}
function CloneNode2(xmldoc, docName, node)
{
	var xmldata = new ActiveXObject("Microsoft.XMLDOM");
	xmldata.async = false;
	xmldata.loadXML(xmldoc);
	CloneNode(xmldata, docName, node);
	return xmldata;
}

/**************************************************************************************/
// ? ? "," ?.
/**************************************************************************************/
function insertComma(str) {
    var src = new String(str);
    var len;
    var i = 0;
    var pos = 0;
    var split1 = '';     // Sign '-' ? 
    var split2 = '';     // κ 
    var split3 = '';     // ? ? 
    var rtn_value = '';
    if (src.charAt(0) == '-') {
        split1 = '-';
        src = src.substr(1);
    }
    if (src.indexOf('.') >= 0) {
        split2 = src.substring(0,src.indexOf('.'));
        split3 = src.substr(src.indexOf('.'));
    }
    else{
        split2 = src;
        split3 = '';
    }
    len = split2.length;
    //  Comma ',' ? ?
    for(var i = 0; i < len; i++) {
        pos  = len - i;
        rtn_value = rtn_value + split2.charAt(i);
        if(pos != 1 && pos % 3 == 1) {
            rtn_value = rtn_value + ',';
        }
    }
    return split1+rtn_value+split3;
}
/**************************************************************************************/
// ? ? "," . -- blueworm
/**************************************************************************************/
function removeComma(value){
	return value.toString().replace(/[\,]*/g, '');
}

/**************************************************************************************/
//  return current date 
/**************************************************************************************/
function getNowDate(){
	now = new Date();
	var thisYear=now.getFullYear();
	var thisMonth=now.getMonth()+1;
	var thisDate=now.getDate();
	if (thisMonth<10){thisMonth="0"+thisMonth};
	if (thisDate<10){thisDate="0"+thisDate};

	var nowDate = thisYear+""+thisMonth+""+thisDate;
	return nowDate;
}

/**************************************************************************************/
//  return current time
/**************************************************************************************/
function getNowTime(){
	now = new Date();
	var thisHour=now.getHours();
	var thisMinute=now.getMinutes();
	var thisSecond=now.getSeconds();
	if (thisHour<10){thisHour="0"+thisHour};
	if (thisMinute<10){thisMinute="0"+thisMinute};
	if (thisSecond<10){thisSecond="0"+thisSecond};

	var nowTime = thisHour+""+thisMinute+""+thisSecond;
	return nowTime;
}

/**************************************************************************************/
// XML ??  ??.
/**************************************************************************************/
function updateXML2(root, nodeName , newValue, index)
{
	var tmpNodeList = root.selectNodes(nodeName);
	if(tmpNodeList.length < 1) return false;
	var parentNode = tmpNodeList.item(0).parentNode;
	
	for(var i =tmpNodeList.length -1; i < index; i++)
	{
		var beforeNode = tmpNodeList.item(tmpNodeList.length-1).nextSibling;
		var newNode = tmpNodeList.item(tmpNodeList.length-1).cloneNode(true);
		newNode.text = "";
		parentNode.insertBefore(newNode,beforeNode);
		tmpNodeList = root.selectNodes(nodeName);
	};


	tmpNodeList[index].text =  newValue;
}

/**************************************************************************************/
// ? ? ? ? space ?.
/**************************************************************************************/
function trim(value) {
	if(value == null) return "";
	return value.toString().replace(/^\s*/, '').replace(/\s*$/, '');
}



/**************************************************************************************/
//  ? 2002.08.08
// ? ?  ? xslt ? 
/**************************************************************************************/
function SelectList(xid, DocName){
	
	var i;
	var count;
	var tempNode;
	var MCode = getUserMCode();
	count = xid.getElementsByTagName("gb:"+DocName+"/LineList/LineItem").length;
	for(i = 0; i<count; i++){
		if(xid.getElementsByTagName("gb:"+DocName+"/LineList/LineItem/cc:Organization.Identifier/Identifier.Content").item(i).text == MCode){
			tempNode = xid.getElementsByTagName("gb:"+DocName+"/LineList/LineItem").item(i);
		}
	}

	xid.getElementsByTagName("gb:"+DocName+"/LineList/LineItem").removeAll();       
		
	if(tempNode !=null){
		xid.selectSingleNode("gb:"+DocName+"/LineList").appendChild(tempNode);
		return xid;
	}
	
}
/**************************************************************************************/
//  ? 2002.08.08
// ? ?  ? xslt ? 
/**************************************************************************************/
function DeleteRecID(xid, DocName) {
	var tempnode = xid.getElementsByTagName("Header.Details").item(0);
	var msNodeList = tempnode.getElementsByTagName("cc:Message.Receiver.Identifier");
	var count = msNodeList.length;
	var check = true;
	var sendID = xid.getElementsByTagName("gb:"+DocName+"/Header.Details/cc:Message.Sender.Identifier/Identifier.Content").item(0).text;
	var oldNode;

	for (var i = 0; i<count; i++) {
		if (msNodeList.item(i).text == sendID && check==true) {
			oldNode = tempnode.removeChild(tempnode.childNodes.item(i+1));
			check = false;
		}
	}
	return xid;
}
/**************************************************************************************/
//  ? 2002.08.08
// ? u  u? ?
/**************************************************************************************/
function DeleteAno(xid, DocName){
	var i;
	var count;
	var tempNode;
	var tempNodeList = xid.getElementsByTagName("gb:"+DocName+"/LineList").item(0);

	count = xid.getElementsByTagName("gb:"+DocName+"/LineList/LineItem").length;

	var nodeArray = new Array(count);

	for(i = 0; i<count; i++){
		if(tempNodeList.getElementsByTagName("cc:Request.Amount/Amount.Content").item(i).text !=""){
			nodeArray[i] =tempNodeList.childNodes.item(i);
		}
		else{
			nodeArray[i] = null;
		}
	}
	
	xid.getElementsByTagName("gb:"+DocName+"/LineList/LineItem").removeAll(); 

	for(var j = 0; j<count; j++){
		if(nodeArray[j] != null){
			xid.selectSingleNode("gb:"+DocName+"/LineList").appendChild(nodeArray[j]);
		}
	}
	return xid;
}

/**************************************************************************************/
//  ? 2002.08.08
// ÷θ? ? ?
/**************************************************************************************/
function DeleteEmptyAttach(xid, DocName){
	var i;
	var count;
	var tempNodeList = xid.selectSingleNode("gb:"+DocName+"/AttachList");
		
	count = xid.getElementsByTagName("gb:"+DocName+"/AttachList/AttachItem").length;
	
	var nodeArray = new Array(count);

	for(i = 0; i<count; i++){
		if(tempNodeList.getElementsByTagName("cc:Line.Number.Value/Numeric.Content").item(i).text !=""){
			nodeArray[i] =tempNodeList.childNodes.item(i);
		}
		else{
			nodeArray[i] = null;
		}
	}
	
	xid.getElementsByTagName("gb:"+DocName+"/AttachList/AttachItem").removeAll(); 

	for(var j = 0; j<count; j++){
		if(nodeArray[j] != null){
			xid.selectSingleNode("gb:"+DocName+"/AttachList").appendChild(nodeArray[j]);
		}
	}
	return xid;
}


function setDateFormat(strdate){
	if(strdate.length > 9){
		alert("Date format is wrong");
		return false;
	}
	var newstrdate = strdate.substring(0,4)+"/"+strdate.substring(4,6)+"/"+strdate.substring(6,8);
	return newstrdate;

}





function deleteAttach(srcDom,docName){
	var attachLength = srcDom.getElementsByTagName("AttachItem").length;
	for(var i=0; i<attachLength-1; i++){
		if(trim(srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(i).text)=="")return;
		var isXML = trim(srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(i).text).lastIndexOf(".xml");
		if(isXML > 0){
			var dstDocName = srcDom.getElementsByTagName("AttachItem/cc:AttachedFile.Name/Text.Content").item(i).text;
			if(dstDocName.match(trim(docName))){
				var currNodes	= srcDom.selectNodes("/*/AttachList/AttachItem");
				var currNode	= srcDom.selectSingleNode("/*/AttachList");
				var deletedNode = currNode.removeChild(currNode.childNodes.item(i));
			}
		}
	}
}









/****************************************************************************/
/*                                                                          */
/* for bid                                                                  */
/*                                                                          */
/****************************************************************************/
function onMyBlur(obj,num1,num2){
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3

	var str =obj.value;
	
	if(str.indexOf('.') == 0){
		str = "0"+str;
		obj.value = String(str);
	}
/*	if ((trim(str)=="")||(parseFloat(str)==0)){
		obj.value="";
		obj.focus();
		return false;
	}*/
	if(Bid_strFloatCheck(Bid_strDelComma(str,num1,num2),num1,num2) != true){
//		msg("string");
		obj.value="";
		obj.focus();
		return false;
	}else{
		obj.value=Bid_strComma(str,num1,num2);
	}
}


function Bid_strDelComma(str,num1,num2) {
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3

	var num = String(str);
    var buffer="";

    for(var i = 0 ; i < num.length ; i ++ ) {
        if(num.charAt(i) != ",") {
            if(buffer==null) buffer = num.charAt(i);
            else buffer =buffer + num.charAt(i);
		}
    }
//	if(Bid_strFloatCheck(buffer,num1,num2)==true){
		var resultValue = buffer.split('.');
		if((resultValue[0]==null)||(resultValue[0]=="")){
			buffer="0." + resultValue[0];
		}
		if((resultValue[1]==null)||(resultValue[1]=="")){
			buffer=resultValue[0];
//		}
	}
    return buffer;
}

function Bid_strComma(str,num1,num2) {
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3

    var buffer="";
    var str=Bid_strDelComma(str,num1,num2);
    var resultValue = str.split('.');
    var num;

    if(resultValue.length == 2) num = resultValue[0];
    else num = str;

    for(var i = 0 ; i < num.length ; i ++ ) {
        if(num.charAt(i) <= '9' && num.charAt(i) >= '0') {
            buffer =buffer + num.charAt(i);
            if(((num.length-i+1)%3) == 2 && i != num.length-1) buffer =buffer+",";
        } else if(num.charAt(i) != ',') {
             // alert('? ??');
            alert("\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694");
            return;
        }
    }
    if(resultValue.length == 2) str=buffer +'.'+ resultValue[1];
    else str = buffer;
	return str;
}

function Bid_strFloatCheck(str , num1, num2) {
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3

    if(Bid_strNumberCheck(Bid_strRemoveChar(str,'.')) == true ) {

        var resultValue = str.split('.');

        if(resultValue.length > 2) {
            alert('\uc18c\uc218\uc810 \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
            return false;

        } else if(resultValue[0].length > num1 ) {
            alert('\uc815\uc218\ubd80\ubd84 \uae08\uc561\uc740 '+num1+'\uc790\ub9ac \uc774\ud558\ub85c \uc785\ub825\ud558\uc138\uc694!');
            return false;

        } else if(resultValue.length == 2  && resultValue[1].length > num2 ) {
            alert('\uc18c\uc22b\uc810\uc740 '+num2+'\uc790\ub9ac \uc774\ud558\uac00 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4.');
            return false;
        } else {
	        return true;
        }
    } else {
        return false;
	}
}

function Bid_strNumberCheck(str) {
    var src = new String(str);
    var i, len=src.length;
    for (i=0; i < len; i++) {
        if ((src.charAt(i) < '0') | (src.charAt(i) > '9')) {
            alert("\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694");
            return false;
        }
    }
    return true;
}



function Bidlea_strFloatCheck(str , num1, num2) {
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3

    if(Bidlea_strNumberCheck(Bid_strRemoveChar(str,'.')) == true ) {

        var resultValue = str.split('.');

        if(resultValue.length > 2) {
            alert('\uc18c\uc218\uc810 \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
            return false;

        } else if(resultValue[0].length > num1 ) {
            alert('\uc815\uc218\ubd80\ubd84 \uae08\uc561\uc740 '+num1+'\uc790\ub9ac \uc774\ud558\ub85c \uc785\ub825\ud558\uc138\uc694!');
            return false;

        } else if(resultValue.length == 2  && resultValue[1].length > num2 ) {
            alert('\uc18c\uc22b\uc810\uc740 '+num2+'\uc790\ub9ac \uc774\ud558\uac00 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4.');
            return false;
        } else {
	        return true;
        }
    } else {
        return false;
	}
}

function Bidlea_strNumberCheck(str) {
    var src = new String(str);
    var i, len=src.length;
    for (i=0; i < len; i++) {
		if ((src.charAt(i) < '0') | (src.charAt(i) > '9')) {
            if(src.charAt(0) == '-'){
			
			}else{
				alert("\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694");
				return false;
			}
        }
    }
    return true;
}





function Bid_strRemoveChar(str, chr) {
    var src = new String(str);
    var tar = new String();
    var i, len=src.length;
    for (i=0; i < len; i++) {
        if (src.charAt(i) == chr)
            tar += '';
        else
            tar += src.charAt(i);
    }
    return tar;
}

function Bid_strConvert(str) {
    var result ="";
    var zero = 0;
    var input = str;
    var result = "";

	if(input.indexOf('.') == 0){
		input = "0"+input;
	}

    input=Bid_strDelComma(input);

    var resultValue = input.split('.');
    var jarisu = resultValue[0].length-1;

	for(i=0; i < resultValue[0].length ; i++) {
        if(resultValue[0].charAt(i) == '0') {
            zero++;
            if(jarisu%4 == 0 && zero < 4) result = result + add_dan(String(jarisu));
        } else {
            result = result + out_num(resultValue[0].charAt(i));
            result = result + add_dan(String(jarisu));
            zero = 0;
        }
        jarisu --;
    }

	
	/*  won*/
	if(resultValue[0]=="0")result="";
	else result += "\uc6d0";


    if(resultValue.length == 2) {
        for(var i = 0 ;  i < resultValue[1].length ; i ++ ) {
            if(i == 0 ) 
                if(resultValue[1].charAt(i) != '0') result += out_num(resultValue[1].charAt(i)) + "\uc2ed";     //  10
            if(i == 1)
                if(resultValue[1].charAt(i) != '0') result += out_num(resultValue[1].charAt(i)) + "\uc804";     //  jeon
            if(i == 2)
                if(resultValue[1].charAt(i) != '0')	result += out_num(resultValue[1].charAt(i)) + "\ub9ac";     //  li

        }
        if(resultValue[1].length < 2) result += "\uc804";   //  jeon
    }
    return result;
}













function Bid_comma(obj) {
    var buffer="";
    del_comma(obj);
    var resultValue = obj.value.split('.');
    var num;

    if(resultValue.length == 2)num = resultValue[0];
    else num = obj.value;

	for(var i = 0 ; i < num.length ; i ++ ) {
		if(num.charAt(i) <= '9' && num.charAt(i) >= '0') {
			buffer =buffer + num.charAt(i);
			if(((num.length-i+1)%3) == 2 && i != num.length-1) buffer =buffer+",";
		} else if(num.charAt(i) != ',') {
			 // alert('? ??');
			alert("\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694");
			obj.value="";
			obj.focus();
			return false;
		}
	}

	if(resultValue.length == 2){
		if((resultValue[1]==null)||(resultValue[1]=="")){
			obj.value=buffer;
		}else{
			obj.value=buffer +'.'+ resultValue[1];
		}
	}else{
		obj.value = buffer;
	}
}



function Bid_delComma(obj) {
	var num = String(obj.value);
    var buffer="";
    for(var i = 0 ; i < num.length ; i ++ ) {
        if(num.charAt(i) != ",") {
            if(buffer==null) buffer = num.charAt(i);
            else buffer =buffer + num.charAt(i);
		}
    }
    obj.value=buffer;
    return;
}



function Bid_removeChar(str, chr) {
    var src = new String(str);
    var tar = new String();
    var i, len=src.length;
    for (i=0; i < len; i++) {
        if (src.charAt(i) == chr)
            tar += '';
        else
            tar += src.charAt(i);
    }
    return tar;
}


function Bid_floatCheck(obj , num1, num2) {
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3
        
    if(Bid_numberCheck(Bid_removeChar(obj.value,'.')) == true ) {

        var resultValue = obj.value.split('.');

        if(resultValue.length > 2) {
            obj.focus();
            alert('\uc18c\uc218\uc810 \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
            return false;

        } else if(resultValue[0].length > num1 ) {
            obj.focus();
            alert('\uc815\uc218\ubd80\ubd84 \uae08\uc561\uc740 '+num1+'\uc790\ub9ac \uc774\ud558\ub85c \uc785\ub825\ud558\uc138\uc694!');
            return false;


        } else if(resultValue.length == 2  && resultValue[1].length > num2 ) {
            obj.focus();
            alert('\uc18c\uc22b\uc810\uc740 '+num2+'\uc790\ub9ac \uc774\ud558\uac00 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4.');
            return false;
        } else {


            while(resultValue[0].charAt(0) == '0') {
                resultValue[0] = resultValue[0].substring(1,resultValue[0].length);
            }


            if(resultValue.length == 2) obj.value = resultValue[0] +"." +resultValue[1];


            else obj.value = resultValue[0];
	        return true;
        }
    } else {
        obj.focus();
        return false;
	}
}





// block up A or B drive(movable drive) when user add attatchfile
// added in 2003.02.20
// asked by bid team
function checkFileUpload(myform,txtEle,fileEle){
	var txtFileEle = trim(fileEle.value).substr(0,3);
	if((txtFileEle=="A:\\") || (txtFileEle=="B:\\")){
		alert("A 혹은 B 드라이브(플로피 디스크 드라이브)의 파일은 첨부하실 수 없습니다.\n\r\n\r반드시 하드 드라이브(예 : C 드라이브)에 위치한 파일을 첨부해 주십시오.\n\r\n\r하드 드라이브 외의 이동식 드라이브(CD ROM 포함)에 위치한 파일을 첨부시 오류가 발생할 수 있습니다.");
		myform.reset();
		return;
	}else{
		txtEle.value=fileEle.value;
	}
}



function bid_saveXmlDoc(xmlDom)
{
	var messageID = CommonG2B.SaveXmlFile(xmlDom);
	updateXML2(xmlDom, '//cc:Document.ManagementNumber.Text/Text.Content', messageID, 0);
	return messageID;
}



/****************************************************************************/
/*                                                                          */
/*   ?   	                                            */
/*                                                                          */
/****************************************************************************/





























/***************************************************************************/
/*                                                                          */
/*                                                                          */
/*    description   :      ? javascript function   */
/*                        (XSL include? js file alert?    */
/*                        Unicode ? ? ??      */
/*                         )					    */
/*                                                                          */
/*   1. del_comma           :   Input Box  ?  ? comma(,)  */
/*                                 return(ex:1,234->1234)	    */
/*          del_comma("1")                                                  */
/*          --> 1: Input Box object                                         */
/*   2. js_removeChar       :   ?? ? ?   return   */
/*          js_removeChar("1","2")				 	    */
/*          --> 1: ?(String)					    */
/*              2:  						    */
/*   3. js_numberCheck      :   ? ?  true, ?   */
/*                              false return                                */
/*          js_numberCheck("1")                                             */
/*          --> 1: ?(String)                                           */
/*   4. floatCheck          :   Input Box  ?  ? ?*/
/*                              ?  ? false return,    */
/*                              ? 쿡 true return               */
/*          floatCheck("1")                                                 */
/*          floatCheck("2")                                                 */
/*          floatCheck("3")                                                 */
/*          --> 1: Input Box object                                         */
/*          --> 2: κ ?                                          */
/*          --> 3: ? ?κ ?                                   */
/*   5. convert             :    ? ?? ?? return      */
/*          convert("1","2")                                                */
/*          --> 1: Input Box object                                         */
/*              2: Input Box object                                         */
/*   6. add_dan             :   ?(?)  ?? return     */
/*          add_dan("1")                                                    */
/*          --> 1: ?(String)                                           */
/*   7. out_num             :   ? ?  ?? return            */
/*          out_num("1")                                                    */
/*          --> 1: ?(character)                                        */
/*   8. comma               :   Input Box  ?  ? comma(,)  */
/*                               ? return(ex:1234->1,234)            */
/*          comma("1")                                                      */
/*          --> 1: Input Box object                                         */
/*   9. js_dateCheck        :   InputBox ?μ ￥ ? u??  */
/*                              ?? YYYY/MM/DD · ?? return*/
/*                              ?, ?  ?      */
/*          js_dateCheck("1")                                               */
/*          --> 1: Input Box object                                         */
/*  10. percent_check       :   InputBox ?μ ?? ´ u?    */
/*          percent_check("1")                                              */
/*          --> 1: Input Box object                                         */
/*  11. CheckAttach()       :   ÷ι   ???  ? */
/*                              ? u?? true,false return         */
/*          CheckAttach()                                                   */
/*                                                                          */
/****************************************************************************/
/****************************************************************************/

function del_comma(obj) {
    var num = String(obj.value);
    var buffer="";
    for(var i = 0 ; i < num.length ; i ++ ) {
        if(num.charAt(i) != ",") {
            if(buffer==null) buffer = num.charAt(i);
            else buffer =buffer + num.charAt(i);
		}
    }
    obj.value=buffer;
    return;
}

function js_removeChar(str, chr) {
    var src = new String(str);
    var tar = new String();
    var i, len=src.length;
    for (i=0; i < len; i++) {
        if (src.charAt(i) == chr)
            tar += '';
        else
            tar += src.charAt(i);
    }
    return tar;
}


function js_numberCheck(str) {
    var src = new String(str);
    var tar = true;
    var i, len=src.length;
    for (i=0; i < len; i++) {
        if ((src.charAt(i) < '0') | (src.charAt(i) > '9')) {
            alert('\ubb38\uc790\uac00 \uc785\ub825\ub420\uc218 \uc5c6\uc2b5\ub2c8\ub2e4.');
            return false;
        }
    }
    return true;
}

function floatCheck(obj , num1, num2) {
    if(num1 == null)
        num1 = 15;
    if(num2 == null)
        num2 = 3
        
    if(js_numberCheck(js_removeChar(obj.value,'.')) == true ) {

        //  ? '.'   迭 return
        //  (ex) 123.45.56 -> 123,45,56  array return

        var resultValue = obj.value.split('.');

        if(resultValue.length > 2) {
            obj.focus();
            //  alert('? Ŀ  ??.');
            alert('\uc18c\uc218\uc810 \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
            return false;

        //  κ ?  u?

        } else if(resultValue[0].length > num1 ) {
            obj.focus();
            //  alert('κ ? 15? ? ??!');
            alert('\uc815\uc218\ubd80\ubd84 \uae08\uc561\uc740 '+num1+'\uc790\ub9ac \uc774\ud558\ub85c \uc785\ub825\ud558\uc138\uc694!');
            //  alert('? ? ? ?μ??.');
            //  alert('\ub108\ubb34 \ud070 \uc22b\uc790\uac00 \uc785\ub825\ub418\uc5c8\uc2b5\ub2c8\ub2e4.');
            return false;

        //  ?  ? u?

        } else if(resultValue.length == 2  && resultValue[1].length > num2 ) {
            obj.focus();
            //  alert('? 3? ? ? ??.');
            alert('\uc18c\uc22b\uc810\uc740 '+num2+'\uc790\ub9ac \uc774\ud558\uac00 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4.');
            return false;
        } else {

            //  κ u? '0' 쿡 '0' 
            //  (u? '0' ??  )

            while(resultValue[0].charAt(0) == '0') {
                resultValue[0] = resultValue[0].substring(1,resultValue[0].length);
            }

            //  ? ? ? 

            if(resultValue.length == 2) obj.value = resultValue[0] +"." +resultValue[1];

            //  κи ? 

            else obj.value = resultValue[0];
	        return true;
        }
    } else {
        obj.focus();
        return false;
	}
}

function convert(inobj, outobj) {
    var result ="";
    var i;
    var zero = 0;
    var inputBox = inobj;
    var resultBox = outobj;

    del_comma(inputBox);

    if(floatCheck(inputBox) != true) return ;

    var resultValue = inputBox.value.split('.');
    var jarisu = resultValue[0].length-1;

	for(i=0; i < resultValue[0].length ; i++) {
        if(resultValue[0].charAt(i) == '0') {
            zero++;
            if(jarisu%4 == 0 && zero < 4) result = result + add_dan(String(jarisu));
        } else {
            result = result + out_num(resultValue[0].charAt(i));
            result = result + add_dan(String(jarisu));
            zero = 0;
        }
        jarisu --;
    }

	result += "\uc6d0";     //  won

    if(resultValue.length == 2) {
        for(var i = 0 ;  i < resultValue[1].length ; i ++ ) {
            if(i == 0 ) 
                if(resultValue[1].charAt(i) != '0') result += out_num(resultValue[1].charAt(i)) + "\uc2ed";     //  10
            if(i == 1)
                if(resultValue[1].charAt(i) != '0') result += out_num(resultValue[1].charAt(i)) + "\uc804";     //  jeon
            if(i == 2)
                if(resultValue[1].charAt(i) != '0')	result += out_num(resultValue[1].charAt(i)) + "\ub9ac";     //  li

        }
        if(resultValue[1].length < 2) result += "\uc804";   //  jeon
    }

    comma(inputBox);
    resultBox.value=result;
}

function add_dan(jarisu) {
    switch(jarisu) {
        case "1" :
        case '5' :
        case '9' :
        case '13' : return "\uc2ed";    //  10
                    break;

        case '2' :
        case '6' :
        case '10' :
        case '14' : return "\ubc31";    //  100
                    break;

        case '3' :
        case '7' :
        case '11' :
        case '15' : return "\ucc9c";    //  1,000
                    break;

        case '4' : return "\ub9cc";     //  10,000
                    break;

        case '8' : return "\uc5b5";     //  100,000,000
                    break;

        case '12' : return "\uc870";    //  1,000,000,000,000
                    break;
        default : return "";
    }
}

function out_num(number) {
    switch(number) {

        case "1" : return "\uc77c";
                    break;

        case '2' : return "\uc774";
                    break;

        case '3' : return "\uc0bc";
                    break;

        case '4' : return "\uc0ac";
                    break;

        case '5' : return "\uc624";
                    break;

        case '6' : return "\uc721";
                    break;

        case '7' : return "\uce60";
                    break;

        case '8' : return "\ud314";
                    break;

        case '9' : return "\uad6c";
                    break;

        case '0' : return "\uc601";
                    break;
    }
}

function comma(obj) {
    var buffer="";
    del_comma(obj);
    var resultValue = obj.value.split('.');
    var num;

    if(resultValue.length == 2) num = resultValue[0];
    else num = obj.value;

    for(var i = 0 ; i < num.length ; i ++ ) {
        if(num.charAt(i) <= '9' && num.charAt(i) >= '0') {
            buffer =buffer + num.charAt(i);
            if(((num.length-i+1)%3) == 2 && i != num.length-1) buffer =buffer+",";
        } else if(num.charAt(i) != ',') {
             // alert('? ??');
            alert("\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc138\uc694");
            obj.focus();
            return false;
        }
    }
    if(resultValue.length == 2) obj.value=buffer +'.'+ resultValue[1];
    else obj.value = buffer;
}

function js_dateCheck(obj) {
    var err  = 0;
    var chartest = obj.value;
    ival  = obj.value;
    if (ival == '') return;
    chartest = js_removeChar(chartest,'/');
    if(chartest.length != 8) {
        alert('YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc694.');

        obj.focus();
        return 1;
    }
    cen = chartest.substring(0, 2); // century
    if (cen > 19) {
        yea = chartest.substring(0, 4); // year
    } else {
        yea = chartest.substring(2, 4); // year
    }
    mon = chartest.substring(4, 6); // month
    da  = chartest.substring(6, 8); // day

    //  ? - ..

    if(!js_numberCheck(chartest)) {
        obj.focus();
        return 2;
    }


    //? , ,   ?



    if(mon < 1 || mon > 12) err = 1;

    if(da  < 1 || da  > 31) err = 1;

    if (cen < 20) {
        if(yea < 0 || yea > 99) err = 1;
    }
    if(cen < 19) err = 1;
    if(err == 1) {
        alert('\ub0a0\uc9dc \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
        obj.focus();
        return 3;
    }
    d = new Date(yea, mon - 1, da);
    if(yea != d.getYear() || mon != (d.getMonth() + 1)) {
        alert('\ub0a0\uc9dc \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
        obj.focus();
        return 4;
    }
    else{
         if (cen > 19) {
             obj.value = yea + '/' + mon + '/' + da;
         } else {
             obj.value = cen + yea + '/' + mon + '/' + da;
         }
    }
}

function percent_check(obj) {
    if(js_numberCheck(js_removeChar(obj.value,'.')) == true ) {
        var resultValue = obj.value.split('.');
        if(resultValue.length > 2) {
            obj.focus();
            //  alert('? Ŀ  ??.');
            alert('\uc18c\uc218\uc810 \ud615\uc2dd\uc5d0 \ub9de\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.');
            return false;
        } else if(parseInt(resultValue[0]) > 100 ) {
            obj.focus();
            //  alert('?  ?  ?.');
            alert('\ubc31\uc774\uc0c1\uc758 \uac12\uc740 \ub4e4\uc5b4\uac08 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.');
            return false;
        } else if(resultValue.length == 2  && resultValue[1].length > 2 ) {
            obj.focus();
            //  alert('? 2? ? ? ??.');
            alert('\uc18c\uc22b\uc810\uc740 2\uc790\ub9ac \uc774\ud558\uac00 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4.');
            return false;
        } else {
            return true;
        }
    } else {
        obj.focus();
        return false;
    }
}

function CheckAttach() {
    var CheckFlag = true;
    for(var i=0; i<ft.FileTable.RowCount; i++) {
        if(!(ft.FileTable.Cell(1,i) != "" && ft.FileTable.Cell(2,i) != "")) {
            CheckFlag = false;
        }
    }
    return CheckFlag;
}




/****************************************************************************/
/*                                                                          */
/*                                                                          */
/*    description   :     XSL ? Tag ??? ???  */
/*                        javascript function                     */
/*                        (XSL include? js file alert?    */
/*                        Unicode ? ? ??      */
/*                         )                                        */
/*                                                                          */
/*   1. and                 :   && ? function                        */
/*          and("1","2")                                                    */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*   2. or                  :   || ? function(? XSL ?    */
/*                                   )        */
/*          or("1","2")                                                     */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*   3. not                 :   ! ? function(? XSL ?     */
/*                                   )        */
/*          not("1","2")                                                    */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*   4. lt                  :   < ? function                         */
/*          lt("1","2")                                                     */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*   5. gt                  :   > ? function                         */
/*          gt("1","2")                                                     */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*   6. lteq                :   <= ? function                        */
/*          lteq("1","2")                                                   */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*   7. gteq                :   >= ? function                        */
/*          gteq("1","2")                                                   */
/*          --> 1: argument1                                                */
/*              2: argument2                                                */
/*                                                                          */
/****************************************************************************/
/*                                     */
/****************************************************************************/

function and(expr1, expr2) {
    return expr1 && expr2;
}

function or(expr1, expr2) {
    return expr1 || expr2;
}

function not(expr) {
    return !expr;
}

function lt(expr1, expr2) {
    return expr1 < expr2;
}

function gt(expr1, expr2) {
  return expr1 > expr2;
}

function lteq(expr1, expr2) {
    return expr1 <= expr2;
}

function gteq(expr1, expr2) {
    return expr1 >= expr2;
}

function checkEmpty(str) {
  return str.length > 0;
}

function number(field,name)
{
	Str=""+field.value;
	for(var i=0;lt(i,Str.length);i++)
	{
		var AChar=Str.charAt(i);
		if(lt(AChar,"0") || gt(AChar,"9"))
		{
			alert(name+"\ub294(\uc740) \uc22b\uc790\ub85c \uc785\ub825\ud574 \uc8fc\uc2ed\uc2dc\uc624!");
			//field.focus();
			return false;
			break;
			}
	}
	return true;
}

function isFloat(field,name)
{
	Str=""+field;
	for(var i=0;lt(i,Str.length);i++)
	{
		var AChar=Str.charAt(i);
		if((lt(AChar,"0") || gt(AChar,"9")) && AChar != ".")
		{
			alert(name+"\ub294(\uc740) \uc2e4\uc218\ud615\uc73c\ub85c \uc785\ub825\ud574 \uc8fc\uc2ed\uc2dc\uc624!");
			//field.focus();
			return false;
			break;
			}
	}
	return true;
}

function checkIdNum(field1,field2,form)
{
	var today = new Date();
	var chkYear1 = today.getYear();
	var chkYear2 = 0;
	if (chkYear1 < 2000)
		chkYear1 += 1900;
	var chk = 0;
	var chk2 = 0;
	var chk3 = 0;
	var yy = field1.substring(0,2);
	var mm = field1.substring(2,4);
	var dd = field1.substring(4,6);
    var chkSex = field2.substring(0,1);

	if ((field1.length != 6 ) ||
		(mm < 1 || mm > 12 || dd < 1) )
	{
		alert ("\uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638\ub97c \ubc14\ub85c \uc785\ub825\ud558\uc5ec \uc8fc\uc2ed\uc2dc\uc624.");
		form.focus();
		return false;
	}

	if ((chkSex != 1 && chkSex !=2) || (field2.length != 7 ))
	{
		alert ("\uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638\ub97c \ubc14\ub85c \uc785\ub825\ud558\uc5ec \uc8fc\uc2ed\uc2dc\uc624.");
		form.focus();
		return false;
	}
	// \uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638 validation check

	for (var i = 0; i <=5 ; i++)
	{
		chk = chk + ((i%8+2) * parseInt(field1.substring(i,i+1)))
	}
	for (var i = 6; i <=11 ; i++){
		chk = chk + ((i%8+2) * parseInt(field2.substring(i-6,i-5)))
	}

	chk = 11 - (chk %11)
	chk = chk % 10

	if (chk != field2.substring(6,7))
	{
		alert ("\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638\uc785\ub2c8\ub2e4.");
		form.focus();
		return false;
	}
	return true;
}
function isDate(data,str)
{
	if(data.value.length != 8)
	{
		alert("\ub0a0\uc9dc\uc785\ub825 \ud615\uc2dd\uc774 \ud2c0\ub9bd\ub2c8\ub2e4. yyyymmdd")
		data.focus();
		return false;
	}

	if(number(data,str) == false)
	{
		data.focus();
		return false;
  }
}  



function insertDate()
{
	var curDate = new Date();
	var DocWriteDate =  String(curDate.getYear());
	if((curDate.getMonth()+1) < 10)		
		DocWriteDate = String(DocWriteDate) + String("/0") + String(curDate.getMonth()+1);		
	else DocWriteDate = String(DocWriteDate) + String("/") + String(curDate.getMonth()+1);
	if(curDate.getDate() < 10)
		DocWriteDate = String(DocWriteDate) + String("/0") + String(curDate.getDate());
	else DocWriteDate= String(DocWriteDate)+String("/")  + String(curDate.getDate());
	
	document.form1.ConsortiumAgreement$Body$DocInfo$DocWriteDate.value = DocWriteDate;
}

// by kkb 
// Checking if string(number type) begins with '-' , '.' and contains a character in the middle of the string(number type)!
// Return : boolean
// Usage in xsl-file : onblur="if(checkDigit(this.value , this)) { FieldChecker(this, '15', 'C', 'n'); updateXML(xid,~~~ ; this.value = setNumberFormat(~~~  }"
function checkDigit(str,fld,nodePath)
{	
	if(trim(str)!='')
	{
		var srcStr = new String(str);	
		
		if (srcStr.charAt(0) == '-')
		{
			alert("Included - !");
			fld.focus();
			return false;
		}
		else if (srcStr.charAt(0) == '.')
		{
			alert("Included . !");
			fld.focus();
			return false;
		}
		else 
		{
			for(var i=1 ; i<srcStr.length; i++)
			{
				if (!isNaN(parseInt(srcStr.charAt(i))))
				{
					//alert(srcStr.charAt(i)+"");
				}
				else
				{
					alert("Included Not Number !");
					fld.focus();
					return false;
				}
			}
		}		
	}
	else
	{	
		fld.value='0';
		updateXML(xid, nodePath,'0',0);
		fld.blur();
		return false;
	}
	return true;
}

/*added by ywj 10/29 */
function xml2dbVat(xid, alertType) {
	var AttachDocNum = "";
	var fileName="";
	var attachLength = xid.getElementsByTagName("AttachItem").length;
	var flag = false;
	for(var i=0; i<attachLength; i++){
		AttachDocNum = xid.getElementsByTagName("AttachItem/cc:AttachedFile.DocumentNumber.Text/Text.Content").item(i).text;

		if(AttachDocNum != null && trim(AttachDocNum) != ""){
			var fileName = xid.getElementsByTagName("AttachItem/cc:AttachedFile.OriginalDirectory.Text/Text.Content").item(i).text;
			
			if(fileName != null && trim(fileName) != ""){
				flag = true;
			}
			else{
				flag = false;
			}
			
			break;
		}
		
	}
	
	if(flag == true){
		var fileString = CommonG2B.ReadInfoTxt(fileName);
				
		if(fileString == null || trim(fileString) == ""){
			alert("세금계산서를 찾을 수 없습니다.\r\n첨부목록에 있는 세금계산서를 삭제후 다시 만들어 주시기 바랍니다.");
			return false;
		}
		
		fileString = fileString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
		top.frames[1].hframe.hform.xmlValue.value = fileString;
		top.frames[1].hframe.hform.value.value = alertType;
		top.frames[1].hframe.hform.action="../vend/jsp/item/VatbilProc.jsp";
		top.frames[1].hframe.hform.target="hframe";
		top.frames[1].hframe.hform.submit();
		return ;
	}else{
/*
		var vatfg = confirm("세금계산서를 작성하지 않았습니다. 면세업체가 아닌경우 필히 작성하셔야합니다. \r\n세금계산서를 작성하시겠습니까?");
		if( vatfg ){
			return 0;
		}else{
			return;
		}
*/
		alert("세금계산서를 입력한 후에 전송하시기 바랍니다. \r\n\r\n세금계산서를 작성화면으로 이동합니다.");
		return 0;

		
	}
	return;
}


function xml2dbVat2(xid, alertType) {

	var fileString = xid.xml;	
				
	if(fileString == null || trim(fileString) == ""){
		alert("세금계산서를 찾을 수 없습니다.\r\n첨부목록에 있는 세금계산서를 삭제후 다시 만들어 주시기 바랍니다.");
		return false;
	}


	fileString = fileString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	top.frames[1].hframe.hform.xmlValue.value = fileString;
	top.frames[1].hframe.hform.value.value = alertType;
	top.frames[1].hframe.hform.action="../vend/jsp/item/VatbilProc.jsp";
	top.frames[1].hframe.hform.target="hframe";
	top.frames[1].hframe.hform.submit();

	return;


}
/* Taxinvoice  관련*/
function xml2dbVat21(xid, alertType) {

	var fileString = xid.xml;	
				
	if(fileString == null || trim(fileString) == ""){
		alert("세금계산서를 찾을 수 없습니다.\r\n첨부목록에 있는 세금계산서를 삭제후 다시 만들어 주시기 바랍니다.");
		return false;
	}

	fileString = fileString.replace("<?xml version=\"1.0\"?>","<?xml version=\"1.0\" encoding=\"euc-kr\"?>");
	
	top.frames[1].hframe.hform.xmlValue.value = fileString;
	top.frames[1].hframe.hform.value.value = alertType;
	top.frames[1].hframe.hform.action="../vend/jsp/item/TaxinvoiceProc.jsp";
	top.frames[1].hframe.hform.target="hframe";
	top.frames[1].hframe.hform.submit();

	return;


}


/*?꼭  setting  u DB  added by ywj 2002.10.31*/
function SetVatinfo(vatxid, gNum){
	var supNum = vatxid.selectSingleNode("//Supplier/Organization.Details/cc:Organization.Identifier/Identifier.Content").text;
	var buyNum = vatxid.selectSingleNode("//Buyer/Organization.Details/cc:Organization.Identifier/Identifier.Content").text;
	if(gNum != ""){buyNum = gNum;}

	var vatinfo = CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8074/vend/jsp/returnVatValue.jsp?supNum="+supNum+"&buyNum="+buyNum);

	if(vatinfo == null || vatinfo ==""){
		alert("세금계산서 정보를 조회하지 못했습니다. \r\n다시한번 시도해 주시고 문제가 계속되면 HelpDesk1로 문의바랍니다.");
		return;
	}

	var vatArray = vatinfo.split("|");
	if(vatArray.length <10){
		alert("세금계산서 정보를 조회하지 못했습니다. \r\n다시한번 시도해 주시고 문제가 계속되면 HelpDesk2로 문의바랍니다.");
		return;
	}

	for(var i=0; i<vatArray.length-1; i++){
		if( i != 4 && i != 7 ) {
			if(vatArray[i] == null || vatArray[i] == ""){
				alert("세금계산서 정보를 조회하지 못했습니다. \r\n다시한번 시도해 주시고 문제가 계속되면 HelpDesk3로 문의바랍니다.");
				return;
			}
		}
	}

	vatxid.selectSingleNode("//Supplier/Organization.Details/cc:Organization.Identifier/Identifier.Content").text = vatArray[0];
	vatxid.selectSingleNode("//Supplier/Organization.Details/cc:Organization.Name/Text.Content").text = vatArray[1];
	vatxid.selectSingleNode("//Supplier/Organization.Details/cc:Organization.CEO.Name/Text.Content").text = vatArray[2];
	vatxid.selectSingleNode("//Supplier/Address.Details/cc:Address.Line1.Text/Text.Content").text = vatArray[3];
	vatxid.selectSingleNode("//Supplier/Address.Details/cc:Address.Line2.Text/Text.Content").text = vatArray[4];
	vatxid.selectSingleNode("//Buyer/Organization.Details/cc:Organization.Identifier/Identifier.Content").text = vatArray[5];
	vatxid.selectSingleNode("//Buyer/Organization.Details/cc:Organization.Name/Text.Content").text = vatArray[6];
	vatxid.selectSingleNode("//Buyer/Organization.Details/cc:Organization.CEO.Name/Text.Content").text = vatArray[7];
	vatxid.selectSingleNode("//Buyer/Address.Details/cc:Address.Line1.Text/Text.Content").text = vatArray[8];
	vatxid.selectSingleNode("//Buyer/Address.Details/cc:Address.Line2.Text/Text.Content").text = vatArray[9];

	return vatxid;
}
/*Taxinvoice  관련*/
function SetVatinfo1(vatxid, gNum){

	var supNum = vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/SupplierParty/Party.Identifier").text;
	var buyNum = vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/BuyerParty/Party.Identifier").text;
	
	if(gNum != ""){buyNum = gNum;}

	var vatinfo = CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8074/vend/jsp/returnVatValue.jsp?supNum="+supNum+"&buyNum="+buyNum);

	if(vatinfo == null || vatinfo ==""){
		alert("세금계산서 정보를 조회하지 못했습니다. \r\n다시한번 시도해 주시고 문제가 계속되면 HelpDesk1로 문의바랍니다.");
		return;
	}

	var vatArray = vatinfo.split("|");
	
	if(vatArray.length <10){
		alert("세금계산서 정보를 조회하지 못했습니다. \r\n다시한번 시도해 주시고 문제가 계속되면 HelpDesk2로 문의바랍니다.");
		return;
	}

	for(var i=0; i<vatArray.length-1; i++){
		if( i != 4 && i != 7 ) {
			if(vatArray[i] == null || vatArray[i] == ""){
				alert("세금계산서 정보를 조회하지 못했습니다. \r\n다시한번 시도해 주시고 문제가 계속되면 HelpDesk3로 문의바랍니다.");
				return;
			}
		}
	}

	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/SupplierParty/Party.Identifier").text = vatArray[0];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/SupplierParty/Business/Organization.Name").text = vatArray[1];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/SupplierParty/Party.Name").text = vatArray[2];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/SupplierParty/Address/Address.Line1.Text").text = vatArray[3]+vatArray[4];
	//vatxid.selectSingleNode("//Supplier/Address.Details/cc:Address.Line2.Text/Text.Content").text = vatArray[4];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/BuyerParty/Party.Identifier").text = vatArray[5];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/BuyerParty/Business/Organization.Name").text = vatArray[6];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/BuyerParty/Party.Name").text = vatArray[7];
	vatxid.selectSingleNode("/TaxInvoice/DataArea/Header/Parties/BuyerParty/Address/Address.Line1.Text").text = vatArray[8]+vatArray[9];
	//vatxid.selectSingleNode("//Buyer/Address.Details/cc:Address.Line2.Text/Text.Content").text = vatArray[9];

	return vatxid;
}


/*G4C u? ?ν ? added by ywj 2002.10.31*/
function G4Csend(mID){
	var uID = getUserID();
	CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8078/g4c/ED_GCJ_RegionTax.jsp?msgid="+mID+"&userid="+uID);	
	CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8078/g4c/ED_GCJ_NationTaxComp.jsp?msgid="+mID+"&userid="+uID);
	return;
}

/*?꼭 ?? ? added by ywj 2002.11.16 u*/
function checkVatSave(xid){
	
	var DocNum = xid.selectSingleNode("//Header.Details/cc:Document.ReferenceNumber.Text/Text.Content").text;
	var checkSave = CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8074/vend/jsp/vatCheck.jsp?DocNo="+DocNum);
	var vatArray = checkSave.split("|");
	
	for(var i=0; i<2; i++){
		if(vatArray[i] == null || vatArray[i] ==""){
			vatArray[i] ="";
		}
	}
	
	var code = vatArray[0];
	var docNum = vatArray[1];

	code = trim(code);
	docNum = trim(docNum);

	if(code !="999"){
		if(docNum == DocNum){
			returnValue = true;
		}else{
			returnValue = false;
		}
	}else{
		returnValue = false;
	}
	
	return returnValue;
}

/*?꼭?? u?? ?? u  ?*/
function checkVatSaveOther(xid){
	
	var DocNum = xid.selectSingleNode("//Header.Details/cc:Document.ManagementNumber.Text/Text.Content").text;
	var checkSave = CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8074/vend/jsp/vatCheck.jsp?DocNo="+DocNum);

	var vatArray = checkSave.split("|");
	
	for(var i=0; i<2; i++){
		if(vatArray[i] == null || vatArray[i] ==""){
			vatArray[i] ="";
		}
	}
	
	var code = vatArray[0];
	var docNum = vatArray[1];

	code = trim(code);
	docNum = trim(docNum);

	if(code !="999"){
		/*
		if(docNum == DocNum){
			returnValue = true;
		}else{
			returnValue = false;
		}*/
		returnValue = true;
	}else{
		returnValue = false;
	}
	
	return returnValue;
}


/*?꼭 ? ?  insert ? function*/
/*reqNumber:?u?, jobKind:, docCode:??, conUser:?USER*/
function VatbilLog(reqNumber, jobKind, docCode, conUser) {
	var VatbilLogFlag = CommonG2B.GetDataFromUrl("http://www.g2b.go.kr:8074/vend/jsp/VatbilLog.jsp?reqNumber="+reqNumber+"&jobKind="+jobKind+"&docCode="+docCode+"&conUser="+conUser);

	if (VatbilLogFlag == "FALSE")
		return false;
	else 
		return true;
}



/********************************************************************************************************/
//2003.02.18 ?
//u뿪  ¹  
//EDI ?  u ??? ¹ μ?°  

function removeDuplicatedLineItem(originalXmlDom) {

	// XML DOM Copy
	var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
	xmlDom.async = false;
	xmlDom.loadXML(originalXmlDom.xml);

	// ±? ?.
	deleteLastTagInLoop(xmlDom, "/*/LineList");
	deleteLastTagInLoop(xmlDom, "/*/AttachList");


	var deletingNumberArray = getDeletingItemNumberArray(xmlDom);

	for (var i=0; i<deletingNumberArray.length; i++ ) {
		deleteLineItem(xmlDom, deletingNumberArray[i]);
	}

	renumberingLineItem(xmlDom);

	return xmlDom;

}

// Return list of deleting item line number
function getDeletingItemNumberArray(xmlDom) {

	var deleteNum = new Array();
	var deleteNumIndex = 0;

	var root = xmlDom.documentElement;
	var currNodes = root.selectNodes("/*/LineList/LineItem");
	var nodesCount= currNodes.length;

	for (var count=0; count<nodesCount ; count++) {

		var lineItemNode	= currNodes.item(count);
		var lineNumber		= lineItemNode.childNodes.item(0).text;
		var orgId			= lineItemNode.childNodes.item(6).text;

		var checkNodes = root.selectNodes("/*/LineList/LineItem");

		for (var innerCount=count+1; innerCount<nodesCount; innerCount++ ) {

            var checkNode         = checkNodes.item(innerCount);
            var checkLineNumber   = checkNode.childNodes.item(0).text;
            var checkOrgClassCode = checkNode.childNodes.item(1).childNodes.item(0).text;
            var checkOrgId        = checkNode.childNodes.item(6).text;

            if (orgId == checkOrgId && checkOrgClassCode != "3") {
                deleteNum[deleteNumIndex] = checkLineNumber;
                deleteNumIndex++;
            }
		}
	}

	return deleteNum;
}


// Deleting LineItem that have LineNumber == deletingLineNumber
function deleteLineItem(xmlDom, deletingLineNumber) {

	var root		= xmlDom.documentElement;
	var currNodes	= root.selectNodes("/*/LineList/LineItem");
	var currNode	= root.selectSingleNode("/*/LineList");

	for (var count=0; count<currNodes.length; count++ ) {

		var lineItemNode	= currNodes.item(count);
		var lineNumberNode	= lineItemNode.childNodes.item(0);

		if (lineNumberNode.text == deletingLineNumber) {
			var deletedNode = currNode.removeChild(currNode.childNodes.item(count));
		}
	}
}

// Renumbering LineItem:ChildNode of LineList
function renumberingLineItem(xmlDom) {

	var root = xmlDom.documentElement;
	var currNodes = root.selectNodes("/*/LineList/LineItem");
	var nodesCount = currNodes.length;

	for (var count = 0; count < nodesCount ; count++) {

		var lineItemNode	= currNodes.item(count);
		var lineNumberNode	= lineItemNode.childNodes.item(0).childNodes.item(0);

		lineNumberNode.text = count+1;

	}
}

function fnPrint_ITEM(rexname, param) {
	printwin = open("http://www.g2b.go.kr:8074/vend/jsp/item/RexViewer.jsp?pRptNames=" + rexname + "&pRptParams=" + param,'RexpertPrint',"left=100,top=10,width=830,height=600,scrollbars=no,toolbar=no,menubar=no,resizable=yes");
}

function fnGetXML()
{
	return xid.xml;
}

function fnPrint_BID (rexname, param) {
	printwin = open("http://www.g2b.go.kr:8074/vend/jsp/bid/RexViewer.jsp?pRptNames=" + rexname + "&pRptParams=" + param,'RexpertPrint',"left=100,top=10,width=830,height=600,scrollbars=no,toolbar=no,menubar=no,resizable=yes");
}

//  u? ?, ð ?¶ Disable ?
function getBaseCd()
{
	var gonggoNo = xid.selectSingleNode("/gb:Coqset/Bidding.Details/cc:Bidding.NotifyNumber.Text/Text.Content").text;
	var gonggoCha = xid.selectSingleNode("/gb:Coqset/Bidding.Details/cc:Bidding.NotifySequenceNumber.Text/Text.Content").text;

	var baseCd = CommonG2B.GetDataFromUrl(JspURL + "bid/getBaseCd.jsp?gonggoNo="+gonggoNo+"&gonggoCha="+gonggoCha);

	if (baseCd == 1)
	{
		ipchalInfo.elements[5].readOnly = true;
		ipchalInfo.elements[5].style.backgroundColor = "E6E6E6";

		selfScore.elements[4].readOnly = true;
		selfScore.elements[4].style.backgroundColor = "E6E6E6";
		selfScore.elements[4].value = 0;
	}
}
