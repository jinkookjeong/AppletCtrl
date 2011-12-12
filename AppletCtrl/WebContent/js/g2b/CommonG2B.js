/**
 * @fileoverview G2B모듈 접근 클래스
 * G2B 모듈에서 사용하는 메서드들을 쉽게 접근하도록 구현한 클래스</br>
 * 기존 : top.frames[0].document.getElementById("G2B").SaveInfoTxt(str1, str2)</br>
 * 변경 : CommonG2B.SaveInfoTxt(str1, str2)
 * 
 * 2010.05.19 지문인식관련 메서드 추가 CGetSelectMedia, CGetBIOUserIDN, HsmBioGetCSN
 * 2010.05.20 지문인식관련 메서드 추가 CheckAuthax, CheckAuthbio
 * 2010.06.04 메서드 추가 mdbToDerby, printMessage
 */
var CommonObject; // Global 변수

/**
 * Top프레임 G2B 접근 생성자
 * @return G2B
 */
function CommonG2B() {
	
	if(opener!=null) { // pop1이 존재하면
		
		if (opener.closed){
			
		} else {
			if(opener.opener!=null){
		        CommonObject = opener.opener.top.frames[0].document.getElementById("G2B");	      
		    }else{
		        CommonObject = opener.top.frames[0].document.getElementById("G2B");
		    }
		}
	}
	else if(parent.opener!=null) {

		if(parent.opener.opener!=null){
	        CommonObject = parent.opener.opener.top.frames[0].document.getElementById("G2B");
	    }else if(parent.opener!=null){
	        CommonObject = parent.opener.top.frames[0].document.getElementById("G2B");
	    }
	}
	else {
	    CommonObject =  top.frames[0].document.getElementById("G2B");

	}
};

/**
 * Java Javascript String 호환메서드
 * Java String과 Javascript String과의 호환을 위한 함수
 * @param {string} Java String
 * @return {string} Javascript String
 */
function ReplaceStringData(stringData){

    if(stringData != null){
        stringData = stringData+"";
    }

    return stringData;
}

/**
 * XML String to XML DOM 변환메서드
 * URL을 리턴받아서 XML DOM을 생성함
 * @param {string} XML String
 * @return {Object} DOM 객체
 * @see SelimXML.createDOMDocument
 */
function StringToXmlDom(xmldataString){
	/*// 기존소스
	var xmldata = new ActiveXObject("Microsoft.XMLDOM");
    xmldata.async= false;
	if(xmldataString == null || xmldataString == "" ){
	    return xmldata;
	}else{
	    xmldata.loadXML(xmldataString);
	    return xmldata;
	}
	*/
	var xmldata;
	if(window.ActiveXObject) { // IE
		xmldata = new ActiveXObject("Microsoft.XMLDOM");
		if(xmldataString == null || xmldataString == "" ){
		    return xmldata;
		}else{
		    //xmldata.loadXML(xmldataString);
			xmldata.async = false;
			xmldata.load(xmldataString);
		    return xmldata;
		}
	} else { // Firefox, Safari
		xmldata = document.implementation.createDocument("","",null);
		if(xmldataString == null || xmldataString == "" ){
		    return xmldata;
		}else{
			var objDOMParser = new DOMParser();
			xmldata = objDOMParser.parseFromString(xmldataString, "text/xml");
			
	        var xmlHeader = xmldata.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"euc-kr\""); // XML Declaration 추가
	        xmldata.insertBefore(xmlHeader,xmldata.firstChild);
	        
	        while (this.hasChildNodes()) {
	            this.removeChild(this.lastChild);
	        }

	        for (var i = 0; i < xmldata.childNodes.length; i++) {
	            var objImportedNode = document.importNode(xmldata.childNodes[i], true);
	            document.appendChild(objImportedNode);
	        }
		    return xmldata;
		}	
	}
}

/**
 * XML String to XML DOM 변환메서드
 * PC저장문서함에서 XML String으로 넘어오는 것으로 DOM을 생성
 * @param {string} XML String
 * @return {Object} DOM 객체
 * @see SelimXML.createDOMDocument
 */
function StringToXmlDomA(xmldataString){
	/*// 기존소스
	var xmldata = new ActiveXObject("Microsoft.XMLDOM");
    xmldata.async= false;
	if(xmldataString == null || xmldataString == "" ){
	    return xmldata;
	}else{
	    xmldata.loadXML(xmldataString);
	    return xmldata;
	}
	*/
	var xmldata;
	if(window.ActiveXObject) { // IE
		xmldata = new ActiveXObject("Microsoft.XMLDOM");
		if(xmldataString == null || xmldataString == "" ){
		    return xmldata;
		}else{
		    xmldata.loadXML(xmldataString);
		    return xmldata;
		}
	} else { // Firefox, Safari
		xmldata = document.implementation.createDocument("","",null);
		if(xmldataString == null || xmldataString == "" ){
		    return xmldata;
		}else{
			var objDOMParser = new DOMParser();
			xmldata = objDOMParser.parseFromString(xmldataString, "text/xml");
			
	        var xmlHeader = xmldata.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"euc-kr\""); // XML Declaration 추가
	        xmldata.insertBefore(xmlHeader,xmldata.firstChild);
	        
	        while (this.hasChildNodes()) {
	            this.removeChild(this.lastChild);
	        }

	        for (var i = 0; i < xmldata.childNodes.length; i++) {
	            var objImportedNode = document.importNode(xmldata.childNodes[i], true);
	            document.appendChild(objImportedNode);
	        }
	        
		    return xmldata;
		}
		
	}

}
/**
 * CheckSize 함수
 * 
 * string의 length를 가지고 2MB이상인지 판단하기 위한 boolean 함수임
 * 전송하고자 하는 XML문서가 2MB이상 (한글포함시 4MB)인 경우에 따라 구분
 * 처리를 하기 위한 boolean 생성함수 임 
 * @param {string} XML String
 * @return {boolean}
 */
function CheckSize(orgTxt) {
	
	var cutSize = 1024 * 1024 * 2; // 2MB 이상 (한글 4MB)
	
	if (orgTxt.length <= cutSize) {
		return true;
    } else {
		return false;
	}
}
/**
 * CutString 함수
 * 
 * 2MB이상(한글포함인 경우 4MB)의 String을 G2B모듈을 통하여 보내는 경우 G2B Applet 모듈의 
 * 메모리 사이즈로 인해 대용량 String 전송시 에러가 발생한다. 이로 인해 G2B Applet의 splitXml을 
 * 호출한다. splitXml을 호출하면 splitXml코드 안에서 입력받은 XML string을 파일로 쓰고
 * 뒤이어 계속 전송받은 XML string을 파일에 덧붙여서 완성된 tempsplitXml파일을 생성하게 된다.
 * 이렇게 생성된 XML파일을 G2B 모듈에서 읽어 처리하게 된다.
 * @param {string} XML String
 * @return {string}
 */
function CutString(orgTxt) {
	//var i = 0;
	var cutSize = 1024 * 1024 * 2; // 2MB 단위로 substring (한글포함인 경우 MAX 4MB)
	var sendStr = ""; 
	
	//alert("while start");
	while (1)
	{
		sendStr = orgTxt.substring(0, cutSize);

		if (sendStr.length == 0) {
			break;
		}

		if (sendStr.length != cutSize) { 
			CommonObject.splitXml(sendStr); // G2B.splitXml 호출
			break;
		} else {
			CommonObject.splitXml(sendStr); // G2B.splitXml 호출	
		}
		//i++;
		orgTxt = orgTxt.substring(cutSize);
	}
	//alert("while end");
}
/**
 * GetHomeDir 메소드
 * @return String
 */
CommonG2B.prototype.GetHomeDir = function() {
	var resValue = CommonObject.GetHomeDir();
	return ReplaceStringData(resValue);
};
/**
 * SetHomeDir 메소드
 * @param {string} lpszNewValue
 * @return N/A
 */
CommonG2B.prototype.SetHomeDir = function( lpszNewValue) {
};
/**
 * DeleteLog 메소드
 * @param {string} pMessageID
 * @return Boolean
 */
CommonG2B.prototype.DeleteLog = function( pMessageID) {
	return CommonObject.DeleteLog( pMessageID);
};
/**
 * SetLogStatus 메소드
 * @param {string} pMessageID
 * @param {string} pStatus
 * @return Boolean
 */
CommonG2B.prototype.SetLogStatus = function( pMessageID,  pStatus) {
	return CommonObject.SetLogStatus( pMessageID,  pStatus);
};
/**
 * ReadInfoTxt 메소드
 * @param {string} pFileName
 * @return String
 */
CommonG2B.prototype.ReadInfoTxt = function( pFileName) {
	var resValue = CommonObject.ReadInfoTxt( pFileName);
	return ReplaceStringData(resValue);
};
/**
 * SaveInfoTxt 메소드
 * @param {string} pFileName
 * @param {string} pString
 * @return Boolean
 */
CommonG2B.prototype.SaveInfoTxt = function( pFileName,  pString) {
	return CommonObject.SaveInfoTxt( pFileName,  pString);
};
/**
 * EncryptString 메소드
 * @param {string} pInputString
 * @return String
 */
CommonG2B.prototype.EncryptString = function( pInputString) {
	var resValue = CommonObject.EncryptString( pInputString);
	return ReplaceStringData(resValue);
};
/**
 * DecryptString 메소드
 * @param {string} pInputString
 * @return String
 */
CommonG2B.prototype.DecryptString = function( pInputString) {
	var resValue = CommonObject.DecryptString( pInputString);
	return ReplaceStringData(resValue);
};
/**
 * QueryLog 메소드
 * @param {string} pSQL
 * @return N/A
 */
CommonG2B.prototype.QueryLog = function( pSQL) {
	return CommonObject.QueryLog( pSQL);
};
/**
 * GetLogInfoByIndex 메소드
 * @param {short} iIndex
 * @return XMLDOM
 */
CommonG2B.prototype.GetLogInfoByIndex = function( iIndex) {
	var xmldataString = CommonObject.GetLogInfoByIndex( iIndex);
	return StringToXmlDomA(xmldataString);
};
/**
 * GetXmlFile 메소드
 * @param {string} pFileName
 * @return XMLDOM
 */
CommonG2B.prototype.GetXmlFile = function( pFileName) {
	var xmldataString = CommonObject.GetXmlFile( pFileName);
	return StringToXmlDomA(xmldataString);
};
/**
 * GetXmlUrl 메소드
 * @param {string} pUrl
 * @return XMLDOM
 */
CommonG2B.prototype.GetXmlUrl = function( pUrl) {
	var xmldataString = CommonObject.GetXmlUrl( pUrl);
	return StringToXmlDom(xmldataString);
};
/**
 * GetXslUrl 메소드
 * @param {string} pUrl
 * @return XMLDOM
 */
CommonG2B.prototype.GetXslUrl = function( pUrl) {
	var xmldataString = CommonObject.GetXslUrl( pUrl);
	return StringToXmlDom(xmldataString);
};
/**
 * GetLogXmlPath 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogXmlPath = function( pMsgID) {
	var resValue = CommonObject.GetLogXmlPath( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * GetLogSOAPPath 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogSOAPPath = function( pMsgID) {
	var resValue = CommonObject.GetLogSOAPPath( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * GetLogDocNo 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogDocNo = function( pMsgID) {
	var resValue = CommonObject.GetLogDocNo( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * GetLogStatus 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogStatus = function( pMsgID) {
	var resValue = CommonObject.GetLogStatus( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * GetLogAttachFileName 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogAttachFileName = function( pMsgID) {
	var resValue = CommonObject.GetLogAttachFileName( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * GetLogAttachFilePath 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogAttachFilePath = function( pMsgID) {
	var resValue = CommonObject.GetLogAttachFilePath( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * ReceiveXml 메소드
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.ReceiveXml = function( pUrl,  pUserID,  pFileName) {
	return CommonObject.ReceiveXml( pUrl,  pUserID,  pFileName);
};
/**
 * ReceiveXmlFile 메소드
 * @param {string} pUrl
 * @param {string} pUserID
 * @return Boolean
 */
CommonG2B.prototype.ReceiveXmlFile = function( pUrl,  pUserID) {
	return CommonObject.ReceiveXmlFile( pUrl,  pUserID);
};
/**
 * MakeDocManageNo 메소드
 * @param {string} pUserID
 * @param {string} pDocNo
 * @return String
 */
CommonG2B.prototype.MakeDocManageNo = function( pUserID,  pDocNo) {
	var resValue = CommonObject.MakeDocManageNo( pUserID,  pDocNo);
	return ReplaceStringData(resValue);
};
/**
 * DownloadXml 메소드
 * @param {XMLDOM} pDispatch
 * @return Boolean
 */
CommonG2B.prototype.DownloadXml = function( pDispatch) {
	if(CheckSize(pDispatch.xml)) {
		return CommonObject.DownloadXml( pDispatch.xml);
	}else {
		CutString(pDispatch.xml);
		return CommonObject.DownloadXml();
	}
};
/**
 * SaveXmlFile 메소드
 * @param {XMLDOM} pDispatch
 * @return String
 */
CommonG2B.prototype.SaveXmlFile = function( pDispatch) {
	if (CheckSize(pDispatch.xml)) {
		CommonObject.printMessage("CommonG2B - SaveXmlFile param");
		var resValue = CommonObject.SaveXmlFile( pDispatch.xml);
	} else {
		CommonObject.printMessage("CommonG2B - SaveXmlFile no param");
		CutString(pDispatch.xml);
		var resValue = CommonObject.SaveXmlFile();
	}
	return ReplaceStringData(resValue);
};
/**
 * SendXmlFile 메소드
 * @param {string} pMessageID
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pType
 * @return String
 */
CommonG2B.prototype.SendXmlFile = function( pMessageID,  pUrl,  pUserID,  pType) {
	var resValue = CommonObject.SendXmlFile( pMessageID,  pUrl,  pUserID,  pType);
	return ReplaceStringData(resValue);
};
/**
 * Receive 메소드
 * @param {string} pUrl
 * @return Boolean
 */
CommonG2B.prototype.Receive = function( pUrl) {
	return CommonObject.Receive( pUrl);
};
/**
 * SendFile 메소드
 * @param {string} pFileName
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pType
 * @return String
 */
CommonG2B.prototype.SendFile = function( pFileName,  pUrl,  pUserID,  pType) {
	var resValue = CommonObject.SendFile( pFileName,  pUrl,  pUserID,  pType);
	return ReplaceStringData(resValue);
};
/**
 * IsFileExist 메소드
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.IsFileExist = function( pFileName) {
	return CommonObject.IsFileExist( pFileName);
};
/**
 * Send 메소드
 * @param {string} pFileName
 * @param {string} pUrl
 * @return Boolean
 */
CommonG2B.prototype.Send = function( pFileName,  pUrl) {
	return CommonObject.Send( pFileName,  pUrl);
};
/**
 * StrToUnicode 메소드
 * @param {string} pStr
 * @return String
 */
CommonG2B.prototype.StrToUnicode = function( pStr) {
	var resValue = CommonObject.StrToUnicode( pStr);
	return ReplaceStringData(resValue);
};
/**
 * GetLogDocName 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.GetLogDocName = function( pMsgID) {
	var resValue = CommonObject.GetLogDocName( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * GetDataFromUrl 메소드
 * @param {string} pUrl
 * @return String
 */
CommonG2B.prototype.GetDataFromUrl = function( pUrl) {
	var resValue = CommonObject.GetDataFromUrl( pUrl);
	return ReplaceStringData(resValue);
};
/**
 * DeleteXml 메소드
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.DeleteXml = function( pFileName) {
	return CommonObject.DeleteXml( pFileName);
};
/**
 * DecryptXmlFile 메소드
 * @param {string} pSourceFile
 * @param {string} pDestFile
 * @return Boolean
 */
CommonG2B.prototype.DecryptXmlFile = function( pSourceFile,  pDestFile) {
	return CommonObject.DecryptXmlFile( pSourceFile,  pDestFile);
};
/**
 * ReceiveOldXml 메소드
 * @param {string} pUrl
 * @return Boolean
 */
CommonG2B.prototype.ReceiveOldXml = function( pUrl) {
	return CommonObject.ReceiveOldXml( pUrl);
};
/**
 * ModifyXslName 메소드
 * @param {string} pFileName
 * @param {string} pCode
 * @return Boolean
 */
CommonG2B.prototype.ModifyXslName = function( pFileName,  pCode) {
	return CommonObject.ModifyXslName( pFileName,  pCode);
};
/**
 * Initialize 메소드
 * @return Boolean
 */
CommonG2B.prototype.Initialize = function() {
	return CommonObject.Initialize();
};
/**
 * EncryptFile 메소드
 * @param {string} pSourceFile
 * @param {string} pDescFile
 * @return Boolean
 */
CommonG2B.prototype.EncryptFile = function( pSourceFile,  pDescFile) {
	return CommonObject.EncryptFile( pSourceFile,  pDescFile);
};
/**
 * DecryptFile 메소드
 * @param {string} pSourceFile
 * @param {string} pDescFile
 * @return Boolean
 */
CommonG2B.prototype.DecryptFile = function( pSourceFile,  pDescFile) {
	return CommonObject.DecryptFile( pSourceFile,  pDescFile);
};
/**
 * GetXslName 메소드
 * @param {string} pXmlData
 * @return String
 */
CommonG2B.prototype.GetXslName = function( pXmlData) {
	var resValue = CommonObject.GetXslName( pXmlData);
	return ReplaceStringData(resValue);
};
/**
 * TransformXml 메소드
 * @param {string} pXmlData
 * @param {string} pUrl
 * @return String
 */
CommonG2B.prototype.TransformXml = function( pXmlData,  pUrl) {
	var resValue = CommonObject.TransformXml( pXmlData,  pUrl);
	return ReplaceStringData(resValue);
};
/**
 * EncSigData 메소드
 * @param {string} pData
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.EncSigData = function( pData,  pFileName) {
	return CommonObject.EncSigData( pData,  pFileName);
};
/**
 * DecSigFile 메소드
 * @param {string} pFileName
 * @return String
 */
CommonG2B.prototype.DecSigFile = function( pFileName) {
	var resValue = CommonObject.DecSigFile( pFileName);
	return ReplaceStringData(resValue);
};
/**
 * SendBidXmlFile 메소드
 * @param {XMLDOM} pDispatch
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {short} pYegaNum
 * @param {string} pYegaFlag
 * @param {string} pTotalYegaUrl
 * @return String
 */
CommonG2B.prototype.SendBidXmlFile = function( pDispatch,  pUrl,  pUserID,  pYegaNum,  pYegaFlag,  pTotalYegaUrl) {
	if(CheckSize(pDispatch.xml)) {
		var resValue = CommonObject.SendBidXmlFile( pDispatch.xml,  pUrl,  pUserID,  pYegaNum,  pYegaFlag,  pTotalYegaUrl);
	} else {
		CutString(pDispatch.xml);
		var resValue = CommonObject.SendBidXmlFile( pUrl,  pUserID,  pYegaNum,  pYegaFlag,  pTotalYegaUrl);
	}
	return ReplaceStringData(resValue);
};
/**
 * GetUserIP 메소드
 * @return String
 */
CommonG2B.prototype.GetUserIP = function() {
	var resValue = CommonObject.GetUserIP();
	return ReplaceStringData(resValue);
};
/**
 * SaveTaxInvoiceXmlFile 메소드
 * @param {XMLDOM} pDispatch
 * @return String
 */
CommonG2B.prototype.SaveTaxInvoiceXmlFile = function( pDispatch) {
	if(CheckSize(pDispatch.xml)) {
		var resValue = CommonObject.SaveTaxInvoiceXmlFile( pDispatch.xml);
	} else {
		CutString(pDispatch.xml);
		var resValue = CommonObject.SaveTaxInvoiceXmlFile();
	}
	return ReplaceStringData(resValue);
};
/**
 * GetMacAddress 메소드
 * @return String
 */
CommonG2B.prototype.GetMacAddress = function() {
	var resValue = CommonObject.GetMacAddress();
	return ReplaceStringData(resValue);
};
/**
 * GSealData 메소드
 * @param {string} SuserId
 * @param {string} Param
 * @return Boolean
 */
CommonG2B.prototype.GSealData = function( SuserId,  Param) {
	return CommonObject.GSealData( SuserId,  Param);
};
/**
 * SetSPKInfor 메소드
 * @param {string} ServerKey
 * @return Boolean
 */
CommonG2B.prototype.SetSPKInfor = function( ServerKey) {
	return CommonObject.SetSPKInfor( ServerKey);
};
/**
 * DecryptXmlFile2 메소드
 * @param {string} pSourceFile
 * @param {string} pDescFile
 * @return XMLDOM
 */
CommonG2B.prototype.DecryptXmlFile2 = function( pSourceFile,  pDescFile) {
	var xmldataString = CommonObject.DecryptXmlFile2( pSourceFile,  pDescFile);
	return StringToXmlDomA(xmldataString);
};
/**
 * GetRegstrUid 메소드
 * @return String
 */
CommonG2B.prototype.GetRegstrUid = function() {
	var resValue = CommonObject.GetRegstrUid();
	return ReplaceStringData(resValue);
};
/**
 * TestEncDec 메소드
 * @return String
 */
CommonG2B.prototype.TestEncDec = function() {
	var resValue = CommonObject.TestEncDec();
	return ReplaceStringData(resValue);
};
/**
 * GetActXVersion 메소드
 * @return String
 */
CommonG2B.prototype.GetActXVersion = function() {
	var resValue = CommonObject.GetActXVersion();
	return ReplaceStringData(resValue);
};
/**
 * Initialization 메소드
 * @return N/A
 */
CommonG2B.prototype.Initialization = function() {
	return CommonObject.Initialization();
};
/**
 * GetOsVersion 메소드
 * @return String
 */
CommonG2B.prototype.GetOsVersion = function() {
	var resValue = CommonObject.GetOsVersion();
	return ReplaceStringData(resValue);
};
/**
 * ReceiveXml2 메소드
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pFileName
 * @param {string} pDocName
 * @return Boolean
 */
CommonG2B.prototype.ReceiveXml2 = function( pUrl,  pUserID,  pFileName,  pDocName) {
	return CommonObject.ReceiveXml2( pUrl,  pUserID,  pFileName,  pDocName);
};
/**
 * WaitDlgCtr 메소드
 * @param {long} timeGap
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pFileName
 * @param {string} pDocName
 * @return String
 */
CommonG2B.prototype.WaitDlgCtr = function( timeGap,  pUrl,  pUserID,  pFileName,  pDocName) {
	var resValue = CommonObject.WaitDlgCtr( timeGap,  pUrl,  pUserID,  pFileName,  pDocName);
	return ReplaceStringData(resValue);
};
/**
 * GetDocumentUrl 메소드
 * @param {string} pUrl
 * @param {string} saveDir
 * @param {string} pFileName
 * @param {string} pFileCnt
 * @return String
 */
CommonG2B.prototype.GetDocumentUrl = function( pUrl,  saveDir,  pFileName,  pFileCnt) {
	var resValue = CommonObject.GetDocumentUrl( pUrl,  saveDir,  pFileName,  pFileCnt);
	return ReplaceStringData(resValue);
};
/**
 * CheckAuth 메소드
 * @param {string} strKmCert
 * @param {string} gonggoNum
 * @param {string} sOID
 * @param {string} sBIO : 지문인식관련 param 추가 2010.05.19
 * @return Boolean
 */
CommonG2B.prototype.CheckAuth = function( strKmCert,  gonggoNum,  sOID,  sBIO ) {
	return CommonObject.CheckAuth( strKmCert,  gonggoNum,  sOID,  sBIO );
};
/**
 * RegSiteAdd 메소드
 * @return Boolean
 */
CommonG2B.prototype.RegSiteAdd = function() {
	return CommonObject.RegSiteAdd();
};
/**
 * RegChange 메소드
 * @return Boolean
 */
CommonG2B.prototype.RegChange = function() {
	return CommonObject.RegChange();
};
/**
 * CGetSelectMedia 메소드
 * @return String
 */
CommonG2B.prototype.CGetSelectMedia = function() {
	var resValue = CommonObject.CGetSelectMedia();
	return ReplaceStringData(resValue);
};
/**
 * HsmBioGetCSN 메소드
 * @return String
 */
CommonG2B.prototype.HsmBioGetCSN = function() {
	var resValue = CommonObject.HsmBioGetCSN();
	return ReplaceStringData(resValue);
};
/**
 * getHomeDir 메소드
 * @return String
 */
CommonG2B.prototype.getHomeDir = function() {
	var resValue = CommonObject.GetHomeDir();
	return ReplaceStringData(resValue);
};
/**
 * setHomeDir 메소드
 * @param {string} lpszNewValue
 * @return N/A
 */
CommonG2B.prototype.setHomeDir = function( lpszNewValue) {
};
/**
 * deleteLog 메소드
 * @param {string} pMessageID
 * @return Boolean
 */
CommonG2B.prototype.deleteLog = function( pMessageID) {
	return CommonObject.DeleteLog( pMessageID);
};
/**
 * setLogStatus 메소드
 * @param {string} pMessageID
 * @param {string} pStatus
 * @return Boolean
 */
CommonG2B.prototype.setLogStatus = function( pMessageID,  pStatus) {
	return CommonObject.SetLogStatus( pMessageID,  pStatus);
};
/**
 * readInfoTxt 메소드
 * @param {string} pFileName
 * @return String
 */
CommonG2B.prototype.readInfoTxt = function( pFileName) {
	var resValue = CommonObject.ReadInfoTxt( pFileName);
	return ReplaceStringData(resValue);
};
/**
 * saveInfoTxt 메소드
 * @param {string} pFileName
 * @param {string} pString
 * @return Boolean
 */
CommonG2B.prototype.saveInfoTxt = function( pFileName,  pString) {
	return CommonObject.SaveInfoTxt( pFileName,  pString);
};
/**
 * encryptString 메소드
 * @param {string} pInputString
 * @return String
 */
CommonG2B.prototype.encryptString = function( pInputString) {
	var resValue = CommonObject.EncryptString( pInputString);
	return ReplaceStringData(resValue);
};
/**
 * decryptString 메소드
 * @param {string} pInputString
 * @return String
 */
CommonG2B.prototype.decryptString = function( pInputString) {
	var resValue = CommonObject.DecryptString( pInputString);
	return ReplaceStringData(resValue);
};
/**
 * queryLog 메소드
 * @param {string} pSQL
 * @return N/A
 */
CommonG2B.prototype.queryLog = function( pSQL) {
	return CommonObject.QueryLog( pSQL);
};
/**
 * getLogInfoByIndex 메소드
 * @param {short} iIndex
 * @return XMLDOM
 */
CommonG2B.prototype.getLogInfoByIndex = function( iIndex) {
	var xmldataString = CommonObject.GetLogInfoByIndex( iIndex);
	return StringToXmlDomA(xmldataString);
};
/**
 * getXmlFile 메소드
 * @param {string} pFileName
 * @return XMLDOM
 */
CommonG2B.prototype.getXmlFile = function( pFileName) {
	var xmldataString = CommonObject.GetXmlFile( pFileName);
	return StringToXmlDomA(xmldataString);
};
/**
 * getXmlUrl 메소드
 * @param {string} pUrl
 * @return XMLDOM
 */
CommonG2B.prototype.getXmlUrl = function( pUrl) {
	var xmldataString = CommonObject.GetXmlUrl( pUrl);
	return StringToXmlDom(xmldataString);
};
/**
 * getXslUrl 메소드
 * @param {string} pUrl
 * @return XMLDOM
 */
CommonG2B.prototype.getXslUrl = function( pUrl) {
	var xmldataString = CommonObject.GetXslUrl( pUrl);
	return StringToXmlDom(xmldataString);
};
/**
 * getLogXmlPath 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogXmlPath = function( pMsgID) {
	var resValue = CommonObject.GetLogXmlPath( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * getLogSOAPPath 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogSOAPPath = function( pMsgID) {
	var resValue = CommonObject.GetLogSOAPPath( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * getLogDocNo 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogDocNo = function( pMsgID) {
	var resValue = CommonObject.GetLogDocNo( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * getLogStatus 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogStatus = function( pMsgID) {
	var resValue = CommonObject.GetLogStatus( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * getLogAttachFileName 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogAttachFileName = function( pMsgID) {
	var resValue = CommonObject.GetLogAttachFileName( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * getLogAttachFilePath 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogAttachFilePath = function( pMsgID) {
	var resValue = CommonObject.GetLogAttachFilePath( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * receiveXml 메소드
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.receiveXml = function( pUrl,  pUserID,  pFileName) {
	return CommonObject.ReceiveXml( pUrl,  pUserID,  pFileName);
};
/**
 * receiveXmlFile 메소드
 * @param {string} pUrl
 * @param {string} pUserID
 * @return Boolean
 */
CommonG2B.prototype.receiveXmlFile = function( pUrl,  pUserID) {
	return CommonObject.ReceiveXmlFile( pUrl,  pUserID);
};
/**
 * makeDocManageNo 메소드
 * @param {string} pUserID
 * @param {string} pDocNo
 * @return String
 */
CommonG2B.prototype.makeDocManageNo = function( pUserID,  pDocNo) {
	var resValue = CommonObject.MakeDocManageNo( pUserID,  pDocNo);
	return ReplaceStringData(resValue);
};
/**
 * downloadXml 메소드
 * @param {XMLDOM} pDispatch
 * @return Boolean
 */
CommonG2B.prototype.downloadXml = function( pDispatch) {
	if(CheckSize(pDispatch.xml)) {
		return CommonObject.DownloadXml( pDispatch.xml);
	}else {
		CutString(pDispatch.xml);
		return CommonObject.DownloadXml();
	}
};
/**
 * saveXmlFile 메소드
 * @param {XMLDOM} pDispatch
 * @return String
 */
CommonG2B.prototype.saveXmlFile = function( pDispatch) {
	if (CheckSize(pDispatch.xml)) {
		CommonObject.printMessage("CommonG2B - saveXmlFile param");
		var resValue = CommonObject.SaveXmlFile( pDispatch.xml);
	} else {
		CommonObject.printMessage("CommonG2B - saveXmlFile no param");
		CutString(pDispatch.xml);
		var resValue = CommonObject.SaveXmlFile();
	}
	return ReplaceStringData(resValue);
};
/**
 * sendXmlFile 메소드
 * @param {string} pMessageID
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pType
 * @return String
 */
CommonG2B.prototype.sendXmlFile = function( pMessageID,  pUrl,  pUserID,  pType) {
	var resValue = CommonObject.SendXmlFile( pMessageID,  pUrl,  pUserID,  pType);
	return ReplaceStringData(resValue);
};
/**
 * receive 메소드
 * @param {string} pUrl
 * @return Boolean
 */
CommonG2B.prototype.receive = function( pUrl) {
	return CommonObject.Receive( pUrl);
};
/**
 * sendFile 메소드
 * @param {string} pFileName
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pType
 * @return String
 */
CommonG2B.prototype.sendFile = function( pFileName,  pUrl,  pUserID,  pType) {
	var resValue = CommonObject.SendFile( pFileName,  pUrl,  pUserID,  pType);
	return ReplaceStringData(resValue);
};
/**
 * isFileExist 메소드
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.isFileExist = function( pFileName) {
	return CommonObject.IsFileExist( pFileName);
};
/**
 * send 메소드
 * @param {string} pFileName
 * @param {string} pUrl
 * @return Boolean
 */
CommonG2B.prototype.send = function( pFileName,  pUrl) {
	return CommonObject.Send( pFileName,  pUrl);
};
/**
 * strToUnicode 메소드
 * @param {string} pStr
 * @return String
 */
CommonG2B.prototype.strToUnicode = function( pStr) {
	var resValue = CommonObject.StrToUnicode( pStr);
	return ReplaceStringData(resValue);
};
/**
 * getLogDocName 메소드
 * @param {string} pMsgID
 * @return String
 */
CommonG2B.prototype.getLogDocName = function( pMsgID) {
	var resValue = CommonObject.GetLogDocName( pMsgID);
	return ReplaceStringData(resValue);
};
/**
 * getDataFromUrl 메소드
 * @param {string} pUrl
 * @return String
 */
CommonG2B.prototype.getDataFromUrl = function( pUrl) {
	var resValue = CommonObject.GetDataFromUrl( pUrl);
	return ReplaceStringData(resValue);
};
/**
 * deleteXml 메소드
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.deleteXml = function( pFileName) {
	return CommonObject.DeleteXml( pFileName);
};
/**
 * decryptXmlFile 메소드
 * @param {string} pSourceFile
 * @param {string} pDestFile
 * @return Boolean
 */
CommonG2B.prototype.decryptXmlFile = function( pSourceFile,  pDestFile) {
	return CommonObject.DecryptXmlFile( pSourceFile,  pDestFile);
};
/**
 * receiveOldXml 메소드
 * @param {string} pUrl
 * @return Boolean
 */
CommonG2B.prototype.receiveOldXml = function( pUrl) {
	return CommonObject.ReceiveOldXml( pUrl);
};
/**
 * modifyXslName 메소드
 * @param {string} pFileName
 * @param {string} pCode
 * @return Boolean
 */
CommonG2B.prototype.modifyXslName = function( pFileName,  pCode) {
	return CommonObject.ModifyXslName( pFileName,  pCode);
};
/**
 * initialize 메소드
 * @return Boolean
 */
CommonG2B.prototype.initialize = function() {
	return CommonObject.Initialize();
};
/**
 * encryptFile 메소드
 * @param {string} pSourceFile
 * @param {string} pDescFile
 * @return Boolean
 */
CommonG2B.prototype.encryptFile = function( pSourceFile,  pDescFile) {
	return CommonObject.EncryptFile( pSourceFile,  pDescFile);
};
/**
 * decryptFile 메소드
 * @param {string} pSourceFile
 * @param {string} pDescFile
 * @return Boolean
 */
CommonG2B.prototype.decryptFile = function( pSourceFile,  pDescFile) {
	return CommonObject.DecryptFile( pSourceFile,  pDescFile);
};
/**
 * getXslName 메소드
 * @param {string} pXmlData
 * @return String
 */
CommonG2B.prototype.getXslName = function( pXmlData) {
	var resValue = CommonObject.GetXslName( pXmlData);
	return ReplaceStringData(resValue);
};
/**
 * transformXml 메소드
 * @param {string} pXmlData
 * @param {string} pUrl
 * @return String
 */
CommonG2B.prototype.transformXml = function( pXmlData,  pUrl) {
	var resValue = CommonObject.TransformXml( pXmlData,  pUrl);
	return ReplaceStringData(resValue);
};
/**
 * encSigData 메소드
 * @param {string} pData
 * @param {string} pFileName
 * @return Boolean
 */
CommonG2B.prototype.encSigData = function( pData,  pFileName) {
	return CommonObject.EncSigData( pData,  pFileName);
};
/**
 * decSigFile 메소드
 * @param {string} pFileName
 * @return String
 */
CommonG2B.prototype.decSigFile = function( pFileName) {
	var resValue = CommonObject.DecSigFile( pFileName);
	return ReplaceStringData(resValue);
};
/**
 * sendBidXmlFile 메소드
 * @param {XMLDOM} pDispatch
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {short} pYegaNum
 * @param {string} pYegaFlag
 * @param {string} pTotalYegaUrl
 * @return String
 */
CommonG2B.prototype.sendBidXmlFile = function( pDispatch,  pUrl,  pUserID,  pYegaNum,  pYegaFlag,  pTotalYegaUrl) {
	if(CheckSize(pDispatch.xml)) {
		var resValue = CommonObject.SendBidXmlFile( pDispatch.xml,  pUrl,  pUserID,  pYegaNum,  pYegaFlag,  pTotalYegaUrl);
	} else {
		CutString(pDispatch.xml);
		var resValue = CommonObject.SendBidXmlFile( pUrl,  pUserID,  pYegaNum,  pYegaFlag,  pTotalYegaUrl);
	}
	return ReplaceStringData(resValue);
};
/**
 * getUserIP 메소드
 * @return String
 */
CommonG2B.prototype.getUserIP = function() {
	var resValue = CommonObject.GetUserIP();
	return ReplaceStringData(resValue);
};
/**
 * saveTaxInvoiceXmlFile 메소드
 * @param {XMLDOM} pDispatch
 * @return String
 */
CommonG2B.prototype.saveTaxInvoiceXmlFile = function( pDispatch) {
	if(CheckSize(pDispatch.xml)) {
		var resValue = CommonObject.SaveTaxInvoiceXmlFile( pDispatch.xml);
	} else {
		CutString(pDispatch.xml);
		var resValue = CommonObject.SaveTaxInvoiceXmlFile();
	}
	return ReplaceStringData(resValue);
};
/**
 * getMacAddress 메소드
 * @return String
 */
CommonG2B.prototype.getMacAddress = function() {
	var resValue = CommonObject.GetMacAddress();
	return ReplaceStringData(resValue);
};
/**
 * gSealData 메소드
 * @param {string} SuserId
 * @param {string} Param
 * @return Boolean
 */
CommonG2B.prototype.gSealData = function( SuserId,  Param) {
	return CommonObject.GSealData( SuserId,  Param);
};
/**
 * setSPKInfor 메소드
 * @param {string} ServerKey
 * @return Boolean
 */
CommonG2B.prototype.setSPKInfor = function( ServerKey) {
	return CommonObject.SetSPKInfor( ServerKey);
};
/**
 * decryptXmlFile2 메소드
 * @param {string} pSourceFile
 * @param {string} pDescFile
 * @return XMLDOM
 */
CommonG2B.prototype.decryptXmlFile2 = function( pSourceFile,  pDescFile) {
	var xmldataString = CommonObject.DecryptXmlFile2( pSourceFile,  pDescFile);
	return StringToXmlDomA(xmldataString);
};
/**
 * getRegstrUid 메소드
 * @return String
 */
CommonG2B.prototype.getRegstrUid = function() {
	var resValue = CommonObject.GetRegstrUid();
	return ReplaceStringData(resValue);
};
/**
 * testEncDec 메소드
 * @return String
 */
CommonG2B.prototype.testEncDec = function() {
	var resValue = CommonObject.TestEncDec();
	return ReplaceStringData(resValue);
};
/**
 * getActXVersion 메소드
 * @return String
 */
CommonG2B.prototype.getActXVersion = function() {
	var resValue = CommonObject.GetActXVersion();
	return ReplaceStringData(resValue);
};
/**
 * initialization 메소드
 * @return N/A
 */
CommonG2B.prototype.initialization = function() {
	return CommonObject.Initialization();
};
/**
 * getOsVersion 메소드
 * @return String
 */
CommonG2B.prototype.getOsVersion = function() {
	var resValue = CommonObject.GetOsVersion();
	return ReplaceStringData(resValue);
};
/**
 * receiveXml2 메소드
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pFileName
 * @param {string} pDocName
 * @return Boolean
 */
CommonG2B.prototype.receiveXml2 = function( pUrl,  pUserID,  pFileName,  pDocName) {
	return CommonObject.ReceiveXml2( pUrl,  pUserID,  pFileName,  pDocName);
};
/**
 * waitDlgCtr 메소드
 * @param {long} timeGap
 * @param {string} pUrl
 * @param {string} pUserID
 * @param {string} pFileName
 * @param {string} pDocName
 * @return String
 */
CommonG2B.prototype.waitDlgCtr = function( timeGap,  pUrl,  pUserID,  pFileName,  pDocName) {
	var resValue = CommonObject.WaitDlgCtr( timeGap,  pUrl,  pUserID,  pFileName,  pDocName);
	return ReplaceStringData(resValue);
};
/**
 * getDocumentUrl 메소드
 * @param {string} pUrl
 * @param {string} saveDir
 * @param {string} pFileName
 * @param {string} pFileCnt
 * @return String
 */
CommonG2B.prototype.getDocumentUrl = function( pUrl,  saveDir,  pFileName,  pFileCnt) {
	var resValue = CommonObject.GetDocumentUrl( pUrl,  saveDir,  pFileName,  pFileCnt);
	return ReplaceStringData(resValue);
};
/**
 * 메소드
 * @param {string} strKmCert
 * @param {string} gonggoNum
 * @param {string} sOID
 * @param {string} sBIO : 지문인식관련 param 추가 2010.05.19
 * @return Boolean
 */
CommonG2B.prototype.checkAuth = function( strKmCert,  gonggoNum,  sOID,  sBIO ) {
	return CommonObject.CheckAuth( strKmCert,  gonggoNum,  sOID, sBIO );
};
/**
 * regSiteAdd 메소드
 * @return Boolean
 */
CommonG2B.prototype.regSiteAdd = function() {
	return CommonObject.RegSiteAdd();
};
/**
 * regChange 메소드
 * @return Boolean
 */
CommonG2B.prototype.regChange = function() {
	return CommonObject.RegChange();
};
/**
 * cGetSelectMedia 메소드
 * @return String
 */
CommonG2B.prototype.cGetSelectMedia = function() {
	var resValue = CommonObject.CGetSelectMedia();
	return ReplaceStringData(resValue);
};
/**
 * hsmBioGetCSN 메소드
 * @return String
 */
CommonG2B.prototype.hsmBioGetCSN = function() {
	var resValue = CommonObject.HsmBioGetCSN();
	return ReplaceStringData(resValue);
};
/**
 * urlEncode 메소드
 * @param {String} pUrl
 * @return String
 */
CommonG2B.prototype.urlEncode = function(pUrl) {

	var resValue = "";

	if (pUrl != null) {
		resValue = CommonObject.urlEncode(pUrl); 
	}
	return resValue;
};
/**
 * CGetBIOUserIDN 메소드
 * @return Boolean
 */
CommonG2B.prototype.CGetBIOUserIDN = function() {
	return CommonObject.CGetBIOUserIDN();
};
/**
 * cGetBIOUserIDN 메소드
 * @return Boolean
 */
CommonG2B.prototype.cGetBIOUserIDN = function() {
	return CommonObject.CGetBIOUserIDN();
};

/**
 * DeleteLog 메소드
 * @param {string} pMessageID
 * @return Boolean
 */
CommonG2B.prototype.DeleteLog = function( pMessageID) {
	return CommonObject.DeleteLog( pMessageID);
};

/**
 * CheckAuthax 메소드
 * @return Boolean
 */
CommonG2B.prototype.CheckAuthax = function(strKmCert, gonggoNum, sOID) {
	return CommonObject.CheckAuthax(strKmCert, gonggoNum, sOID);
};

/**
 * CheckAuthbio 메소드
 * @return Boolean
 * @param {int} mode : 0:기존로그인시 지문인증 1:로그인 30분 경과 후 재인증 param 추가 2010.08.02
 */
CommonG2B.prototype.CheckAuthbio = function(strKmCert, gonggoNum, sOID, mode) {
	return CommonObject.CheckAuthbio(strKmCert, gonggoNum, sOID, mode);
};

/**
 * mdbToDerby 메소드
 * @return Boolean
 */
CommonG2B.prototype.mdbToDerby = function () {
	return CommonObject.mdbToDerby();
};
/**
 * printMessage 메소드
 * 자바스크립트 alert 대신 애플릿로그 찍는 메서드
 * @param {String} 
 * @return String 
 */
CommonG2B.prototype.printMessage = function(msg) {
	return CommonObject.printMessage(msg);
};
/**
 * Class CommonG2B Define
 */
var CommonG2B = new CommonG2B();

/*
 * 참고사항
 * 1. main 페이지는 CommonG2B대신에 기존의 top.tops.document.G2B를 이용함
 * 2. 로그인버튼, 수요기관업무버튼, 조달업체업무버튼 클릭시 
 *    CommonObject는 null을 리턴함
 */

if (CommonObject != null) {
	CommonG2B.HomeDir = CommonG2B.GetHomeDir();
	CommonG2B.homeDir = CommonG2B.getHomeDir();
	//alert ("CommonG2B.HomeDir : " + CommonG2B.HomeDir);
}