/**
  * @comment_en Script for supporting patterns and types
  * @comment_ko 각종 패턴, 형식을 지원하는 스크립트
  *
  * History: 1.0.0(05.06.2011-(Lee Song Yi)) Version initial
  */

document.write('<script src="/js/com/checkLang.js"><\/script>');
function $RF(el, radioGroup) {
	if($(el).type == 'radio') {
		var el = $(el).form;
		var radioGroup = $(el).name;
	} else if ($(el).tagName.toLowerCase() != 'form') {
		return false;
	}
	return $F($(el).getInputs('radio', radioGroup).find(
		function(re) {return re.checked;}
	));
} 
 
var Pattern = {
      PARTICULAR : /[$\\@\\\#%\^\&\*\(\)\[\]\+\_\{\}\`\~\=\'\"\|]/ 
    , ENGLISH : /^([a-zA-Z]+)$/ /* /^(\w[^0-9_]+)$/ */
    , NUMBER : /^(\d+)$/ 
    , ENGNUM : /^(\w+)$/ 
    , SPACE : /(^\s*)|(\s*$)/gi 
    , EMAIL : /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/ 
    , PHONE : /^(0(\d{1,2}))-(\d{3,4})-(\d{4})$/ 
    , IDPWD : /^(\w{4,12})$/
    , SSN : /^(\d{13})$/
    , POST : /^((\d{3}))-(\d{3})$/ 
}
 
/**
 * Instantly check value based on the pattern
 * 
 */
String.prototype.isValues = function() {
return this.length > 0 && this != null;
}

/**
 * Regular expression test
 * 
 */
String.prototype.isValidFormat = function(format) {
    return this.search(format) != -1
}

/**
 * Available in English and numbers
 * 
 */
String.prototype.isWord = function() {
    return this.isValidFormat(Pattern.ENGNUM);
}

String.prototype.isNum = function() {
    return this.isValidFormat(Pattern.NUMBER);
}

String.prototype.isEng = function() {
    return this.isValidFormat(Pattern.ENGLISH);
}

/**
 * Whether or not a special character
 * 
 */
String.prototype.isParticular = function() {
    return this.isValidFormat(Pattern.PARTICULAR);
}

String.prototype.isPhone = function() {
    return this.isValidFormat(Pattern.PHONE);
}

String.prototype.isEmail = function() {
    return this.isValidFormat(Pattern.EMAIL);
}

String.prototype.isSpace = function() {
    return this.isValidFormat(Pattern.SPACE);
}

/**
 * Remove spaces
 * 
 */
String.prototype.trim = function() {
    return this.replace(Pattern.SPACE, "");
}

/**
 * Replace all the characters
 * 
 */
String.prototype.replaceAll = function(replace, string) {
    var tmpStr = this.trim();
    if (tmpStr != "" && replace != string) 
        while ( tmpStr.indexOf(replace) > -1 ) { tmpStr = tmpStr.replace(replace, string); }
    return tmpStr;
}

String.prototype.isIDPWD = function() {
     return this.isValidFormat(Pattern.IDPWD);
}

/**
 * Length of the string test (Byte units)
 * 
 */
String.prototype.isLen = function(len) {
    return rtn = (len <= this.Length()) ? true : false ;
}

/**
 * Check the length of the string (Byte units)
 * 
 */
String.prototype.Length = function() {
    var bytLen = 0, strSlice = "";
    for (var i=0; i<this.length; i++) {
        strSlice = this.substring(i, i+1);
        bytLen += Math.sqrt(Math.abs(escape(strSlice).length - 2));
    }
    return bytLen;
}

/**
 * Length of the string as the crop
 * 
 */
String.prototype.Slice = function(len) {
    var bytLen = 0, strSlice = "", strRtn = "";
    for (var i=0; i<this.length; i++) {
        strSlice = this.substring(i, i+1);
        bytLen += Math.sqrt(Math.abs(escape(strSlice).length - 2));
        strRtn += strSlice;
        if (bytLen >= len) { return strRtn; break; }
    }
    return strRtn;
}

/**
 * Find the name of inputForm.elements
 * 
 */
function util_findObject(inputForm, name){
	for(i=0;i<inputForm.elements.length;i++){
		if(name == inputForm.elements[i].name) return inputForm.elements[i];
	}
}

/**
 * Find the ID inputForm.elements
 * 
 */
function util_findObjectID(inputForm, id){ 
	for(i=0;i<inputForm.elements.length;i++){
		if(id == inputForm.elements[i].id) return inputForm.elements[i];
	}
}

/**
 * ID set of display inline
 * 
 */
function util_show(id){
	document.getElementById(id).style.display = "inline";
}

/**
 * ID set of display none
 * 
 */
function util_hide(id){
	document.getElementById(id).style.display = "none";
}

/**
 * Conversion to uppercase
 * 
 */
function util_UpperCode(inputForm) {
	eval( "document." + inputForm).value = eval( "document." + inputForm).value.toUpperCase();
}

/**
 * Conversion to lowercase
 * 
 */
function util_LowerCode(inputForm) {
	eval( "document." + inputForm).value = eval( "document." + inputForm).value.toLowerCase();
}

/**
 * Insert the number of digits
 * 
 */
function util_insertComma(value) {
	if (value == '') return value;

	value = parseFloat(value, 10).toString()
	while (true) {
	
		if (value.indexOf(',') != -1)
			idx = value.search(/[^,\.\-]([0-9]{3})+\,/);
		else
			idx = value.search(/[^,\.\-]([0-9]{3})+$/);
		if (idx == -1) break;
			value = value.substring(0, idx+1) + '.' + value.substring(idx+1, value.length);
	}
	return value;
}

/**
 * Delete the number of digits
 * 
 */
function util_delComma(num) {
	if(num.toString().indexOf('.') != -1){
		var split = num.split('.');
		var newNum="";

		for(var i=0; i<split.length; i++){
			newNum = newNum + split[i];
		}
		return newNum;
	}else{
		return num;
	}
}

/**
 * If the serial number on the left to automatically fill 0
 * 
 */
function util_fillZero(obj, max) {
    var str = "";
    var len = obj.value.length;

    if (len != 0) {
        for( iCnt = 0; iCnt < (max - len); iCnt++) 
            str = str + "0";
        obj.value = str+obj.value;
   }
}

/**
 * Check the radio button to confirm
 * 
 */
function util_radioCheck(objcode){
	 var lang = getLang('MN_LANG'); 
    var isChecked = false; 
    for (var i=0;i<objcode.length;i++) {
	if (objcode[i].checked) {
		isChecked = true; 
		var rtnValue = objcode[i].value; 
    		break; 
    	}
    }
    if (!isChecked) {
   	 if(lang == "ko"){
		 alert("라디오 버튼을 선택해주세요.");
	 }else if(lang == "en"){
		 alert("Please, select a radio button.");
	 }else{
		 alert("Radio товчыг сонгоно уу");
	 }
		return false; 
    }
}


/**
 * String The string is replaced by another string.
 * 
 */
function util_replace(target, replacee, replacer){
	var ret = "";
	retStr = "" + target; 
 
	while (retStr.indexOf(replacee)>-1) { 
		pos= retStr.indexOf(replacee);
		retStr = "" + (retStr.substring(0, pos) + replacer + retStr.substring((pos + replacee.length), retStr.length)); 
	}
	return retStr;
}

/**
 * String The string is replaced by a blank string.
 * 
 */
function util_replace2(target, replacee){
	return util_replace(target, replacee, "");
}

/**
 * String of strings to remove spaces
 * 
 */
function util_trim(objValue) {
	return objValue.toString().replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * String, followed by a fill
 * 
 */
function util_rpad(newValue, len, ch){
	var strlen = util_trim(newValue).length;
	var ret = "";
	var alen = len - strlen;
	var astr = ""; 
 
	for (i=0; i<alen; ++i){
		astr = astr + ch;
	}
	ret = util_trim(newValue) + astr;
	return ret;
}

/**
 * Population before the character string
 * 
 */
function util_lpad(newValue, len, ch){
	var strlen = util_trim(newValue).length;
	var ret = "";
	var alen = len - strlen;
	var astr = ""; 
 
	for (i=0; i<alen; ++i){
		astr = astr + ch;
	}
 
	ret = astr + util_trim(newValue);
	return ret;
}

/**
 * is null, the value of alternative
 * 
 */
function util_nvl(value, replacer){
	if ( value == null){
		return replacer;
	}else{
		return value;
	}
}

/**
 * Strings removed
 * 
 */
function util_delChar(newValue, ch){
	var len = newValue.length;
	var ret = "";
 
	for (i=0; i<len; ++i){
		if (newValue.substring(i,i+1) != ch)
		ret = ret + newValue.substring(i,i+1);
	}
	return ret;
}

/**
 * Strings removed, Whether the input strings
 * 
 */
function util_isCharsOnly(input,chars) {
	for (var inx = 0; inx < input.length; inx++) {
       if (chars.indexOf(input.charAt(inx)) == -1)
           return false;
    }
    return true;
}

/**
 * English, numbers can be input 
 * 
 */
function util_isAlphaNumericOnly(str) {
	var re = /[a-zA-Z0-9-]/; 
	for (var i = 0; i < str.length; i++) {
		if (!re.test(str.charAt(i))) {
			return false;
		}
	}
	return true;
}

/**
 * English lowercase letters, numbers can be input
 * 
 */
function util_isSmallAlphaNumericOnly(str) {
	var re = /[a-z0-9]/; 
	for (var i = 0; i < str.length; i++) {
		if (!re.test(str.charAt(i))) {
			return false;
		}
	}
	return true;
}

/**
 * Returns the string length
 * 
 */
function util_getByteLength(str) {
	var byteLength= 0;
	for(var inx=0; inx < str.length; inx++) {
		var oneChar = escape(str.charAt(inx));
		if( oneChar.length == 1 )
			byteLength ++;
		else if(oneChar.indexOf("%u") != -1)
			byteLength += 2;
		else if(oneChar.indexOf("%") != -1)
			byteLength += oneChar.length/3;
	}
	return byteLength;
}

/**
 * Format validation 
 * 
 */
function util_isValidFormat(str, format) { 
	return (!isEmpty(str) && (str.search(format) != -1) ? true : false);
}
 
/**
 * Means other than checking the value of space
 * 
 */
function isEmpty(input) {
    if (input.value == null || input.value.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}
/**
 * Email Validation
 * 
 */
function util_isValidEmail(str) {
	var filter=/^(\w+(?:\.\w+)*)@((?:\w+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return filter.test(str);
}

function util_checkEmailSel(email) {
	var lang = getLang('MN_LANG');
	if(email.value !="") {
		if(!util_isValidEmail(email.value)){
	    	 if(lang == "ko"){
	    		 alert("유효하지 않은 이메일 주소입니다.");
	    	 }else if(lang == "en"){
	    		 alert("Invalid e-mail address.");
	    	 }else{
	    		 alert("Хүчингүй и-мэйл хаяг байна.");
	    	 }
			email.value="";
			email.focus();
			return false;
		}
		return true;
	}
	return true;
}


/**
 * Phone Number Check
 * 
 */
function util_checkTelephoneNumber(name, telno) {
 var lang = getLang('MN_LANG');
 var temp
 temp = telno.value;
 temp = telno.value.replace(/ /gi,"");
 temp = replace(telno.value,"-","");

 if (temp == "") {
	 if(lang == "ko"){
		 alert("{0}를/을 입력해주십시오.".replace("{0}",name));
	 }else if(lang == "en"){
		alert("Please, input {0}.".replace("{0}",name));
	 }else{
	        alert("{0}-ыг оруулна уу.".replace("{0}",name));	
	 }
  telno.focus();
  return false;
 }
 else if (temp.length < 8 || isNaN(temp)) {
	 if(lang == "ko"){
		 alert("{0}를 확인해주십시오.".replace("{0}",name));
	 }else if(lang == "en"){
		 alert("Please, check {0}.".replace("{0}",name));
	 }else{
		 alert("{0}-ыг шалгана уу.".replace("{0}",name));
	 }
  telno.focus();
  return false;
 }

 return true;
}

var isNN = (navigator.appName.indexOf("Netscape")!=-1);

function util_autoTab(input,len, e) {
	var keyCode = (isNN) ? e.which : e.keyCode; 
	var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
	if(input.value.length >= len && !util_containsElement(filter,keyCode)) {
		input.value = input.value.slice(0, len);
		input.form[(util_getIndex(input)+1) % input.form.length].focus();
	}
}

/**
 * Make sure the element is entered in the array
 * 
 */
function util_containsElement(arr, ele) {
	var found = false, index = 0;
	while(!found && index < arr.length)
	if(arr[index] == ele)
		found = true;
	else
		index++;
	 return found;
}

function util_getIndex(input) {
	var index = -1, i = 0, found = false;
	while (i < input.form.length && index == -1){
		if (input.form[i] == input)index = i;
		else i++;
		return index;
	}
	return true;
}

/**
 * Check textArea Characters
 * 
 */
function util_textCounter(object,counterObject,maxChars){

	var temp = "";
	var charCounter = 0;

	for (var i = 0; i < object.value.length; i++){
		var strChar = object.value.substring(i, i + 1);
		if (strChar == '\n'){
			temp += strChar;
			charCounter = 1;
			charCounter += 1;
		} else {
			temp += strChar;
			charCounter ++;
		}
	}
	var tempChr = eval(maxChars) - temp.length;

	if (eval(tempChr) > 0){  
		counterObject.style.color="black";
		counterObject.value = tempChr+"/"+maxChars;
	}else{
		counterObject.style.color="red";
		counterObject.value = tempChr+"/"+maxChars;
	}
}

/**
 * If you pass the maximum length of characters crop
 * 
 */
function util_updateLength(counter, msgObj, maxlen) {
	var lang = getLang('MN_LANG'); 
	counter.value = msgObj.value.length;
	if (msgObj.value.length > maxlen) {
		 if(lang == "ko"){
			 alert("{0}자리를 초과하였습니다.".replace("{0}",maxlen));
		 }else if(lang == "en"){
			 alert("It has exceeded {0}-digit.".replace("{0}",maxlen));
		 }else{
			 alert("{0} оронгоос хэтэрсэн байна.".replace("{0}",maxlen));
		 }
		var tmpstr = msgObj.value;
		tmpstr = tmpstr.substring(0, maxlen)
		if (tmpstr.substring(maxlen-1, maxlen) == '\r')
			tmpstr = tmpstr.substr(0, maxlen-1); 
		msgObj.value = tmpstr;
		return;
	}
	counter.value = msgObj.value.length;
}

/**
 * ', " change to &apos;, &quot
 * 
 */
function util_replaceText(value){
	var len = value.length;
	var sub = "";

	if(len > 0){
		for(var i=0; i<value.length; i++){
			sub = value.substr(i,1);
			if(sub == "'"){
				value = value.substring(0, i) + "&apos;" + value.substring(i+1);
				i=i+8; 
			}else if(sub == "\""){
				value = value.substring(0, i) + "&quot" + value.substring(i+1);
				i=i+5; 
			}
		}
	}
	return value;
}

/**
 * The elements behind
 * 
 */
function util_divHide(name){ 
	document.getElementById(name).style.display = "none"; 
}

function util_divShow(name){ 
	document.getElementById(name).style.display = "block"; 
}

/**
 * Length limit
 * 
 */
function util_CheckLength(fObj, iMaxSize, iShow){
	var lang = getLang('MN_LANG'); 
	var cTmp;
	var iMax = iMaxSize * 2;
	var iLen = fObj.value.length;

	var sTmp = "" ;
	if (iLen > 0) {
		for(k = 0; k < iLen; k++){
			cTmp = fObj.value.charAt(k);
			if (escape(cTmp).length > 4) iMax -= 2;
			else iMax--; 
			if(iMax < 0) {
				 if(lang == "ko"){
					 alert("영문 {0}자까지 입력할 수 있습니다.".replace("{0}",iShow));
				 }else if(lang == "en"){
					 alert("{0} characters can be entered in English.".replace("{0}",iShow));
				 }else{
					 alert("англи үсэг{0} орон хүртэл оруулах боломжтой.".replace("{0}",iShow));
				 }
				fObj.value = sTmp;
				break;
			} else {
				sTmp += cTmp;
			}
		}
	}
}

function util_numberFormat(obj) {
	 var num = obj.value;
	 re=/[^0-9]/gi;
	 num = num.replace(re,'');
	 var val = num.split (",");
	 var num_str = '';
	 var result = '';

	 if(val[1]) num_str = (val[0]+"").toString();
	 else num_str = num.toString();

	 for(var i=0; i<num_str.length; i++) {
		 var tmp = num_str.length-(i+1);
		 if(i%3==0 && i!=0) result = '.' + result;
		 result = num_str.charAt(tmp) + result;
	 }

	 if( val[1] ) result = result+","+val[1].substr(0,3);
	 obj.value = result;
}  

/**
 * NULL check
 * 
 */
function util_isNull(checkStr){
	if (checkStr != null && checkStr.length != 0) { return false; }
	return true;
}

/**
 * Check for special characters
 * 
 */
function util_isSpecial(checkStr){
	var checkOK = "`~!@#$^*()_\+-=||{}[]:;<>?/\\";
	
	for (i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		for (j = 0;  j < checkOK.length;  j++){
			if (ch == checkOK.charAt(j)) {
				return true;
				break;
			}
		}
	}
	return false;
}

/**
 * Check constant
 * 
 */
function util_isNumeric(checkStr){
	var checkOK = "0123456789";
	for (i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		for (j = 0;  j < checkOK.length;  j++){
			if (ch == checkOK.charAt(j)) { break;	}
		}
		if (j == checkOK.length){
			return false;
			break;
		}
	}
	return true;
}

/**
 * Check-point numbers 
 * 
 */
function util_isFloat(checkStr){
	var checkOK = "0123456789,";
	
	for (i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		for (j = 0;  j < checkOK.length;  j++){
			if (ch == checkOK.charAt(j)) { break; }
		}
		if (j == checkOK.length){
			return false;
			break;
		}
	}
	if (i == 1 && checkStr.charAt(0) == ',') { return false; }
	return true;
}

/**
 * Positive Check 
 * 
 */
function util_isPositive( chekStr ){
	if ( parseFloat(chekStr) > 0 ) { return true; }
	else { return false; }
}

/**
 * Price Check 
 * 
 */
function util_isPrice(checkStr){
	var checkOK = "0123456789,.";
	var len = checkStr.length;
	var strs = checkStr.split(",");
	var n = 0;
	if (len == 1 && (checkStr.charAt(0) == ',' || checkStr.charAt(0) == '.')) {	return false;	}
 	if (checkStr.charAt(0) == ',' || checkStr.charAt(0) == '.' || checkStr.charAt(len - 1) == '.') {
		return false;
	}
	
 	for (i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		for (j = 0;  j < checkOK.length;  j++){
			if (ch == checkOK.charAt(j)) { break;	}
		}
		if (j == checkOK.length){
			return false;
			break;
		}
	}
	
	if (strs.length > 2) { return false; }	
	if (strs.length > 1 && strs[1].length > 2) { return false; }	
	
	for (k = 0; k < strs[0].length; k++){
		if (strs[0].charAt(k) != '.') {	n++; }
	}
	return (n <= 7)? (true) : (false);
}

/**
 * Check quantity 
 * 
 */
function util_isQuantity(checkStr){
	var checkOK = "0123456789.";
	var len = checkStr.length;
	var n = 0;
	
	if (checkStr.charAt(0) == '.' || checkStr.charAt(len - 1) == '.') { return false;	}
	for (i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		if (ch != '.') { n++;	}
		for (j = 0;  j < checkOK.length;  j++){
			if (ch == checkOK.charAt(j)) { break; }
		}
		if (j == checkOK.length){
			return false;
			break;
		}
	}
	return (n <= 9) ? (true) : (false);
}

/*********** Date-related ******************/
function util_isValidYear(value) { 
	return ( (value.length == 4) && (isNumeric(value)) && (eval(value) > 1900) ); 
} 

function util_isValidMonth(value) { 
	return ( (value.length > 0) && (isNumeric(value)) && (0 < eval(value)) && (eval(value) < 13) ); 
}
 
function util_isValidDay(yyyy, mm, value){ 
	var result = false; 
	var monthDD = new month_array(31,28,31,30,31,30,31,31,30,31,30,31); 
	var index = eval(mm) - 1; 
	if (value.length != 2) { return false; }
	if (!isNumeric(value)) { return false; }
	if (((yyyy % 4 == 0) && (yyyy % 100 != 0)) || (yyyy % 400 == 0)) { monthDD[1] = 29; } 
		
	var dd = eval(value); 		
	if ((0 < dd) && (dd <= monthDD[index])) {	result = true; }
		
	return result; 
}

function util_getMonthArray(m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11) {
	this[0] = m0;
	this[1] = m1;
	this[2] = m2;
	this[3] = m3;
	this[4] = m4;
	this[5] = m5;
	this[6] = m6;
	this[7] = m7;
	this[8] = m8;
	this[9] = m9;
	this[10] = m10;
	this[11] = m11;
}

function util_getCurrentTime(){

    var CurrentTime = new Date;
    var Year    = CurrentTime.getYear();
    var Month   = CurrentTime.getMonth();
    var day     = CurrentTime.getDate();
    var Hour    = CurrentTime.getHours();
    var Minutes = CurrentTime.getMinutes();
    var Seconds = CurrentTime.getSeconds();

//    var ctime    = String(day)+ String(Month) + String(Year) + String(Hour)+ String(Minutes) + String(Seconds);
    var ctime    = String(Year) + String(Month) + String(day) + String(Hour)+ String(Minutes) + String(Seconds);
	return ctime;
}

function util_getDate(value){
	var year  = value.substring(4,8); 
	var month = value.substring(2,4); 
	var day   = value.substring(0,2); 
	return ( util_isValidYear(year) && util_isValidMonth(month) && util_isValidDay(year,month,day) ); 
}

function util_getMonthInterval(time1,time2) { 
	var date1 = toTimeObject(time1);
	var date2 = toTimeObject(time2);

	var years = date2.getFullYear() - date1.getFullYear();
	var months = date2.getMonth() - date1.getMonth();
	var days = date2.getDate() - date1.getDate();

	return (years * 12 + months + (days >= 0 ? 0 : -1) );
}

function util_getDayInterval(time1,time2) {
	var date1 = toTimeObject(time1);
	var date2 = toTimeObject(time2);
	var day = 1000 * 3600 * 24;

	return parseInt((date2 - date1) / day, 10);
}

function util_getHourInterval(time1,time2) {
	var date1 = toTimeObject(time1);
	var date2 = toTimeObject(time2);
	var hour = 1000 * 3600;

	return parseInt((date2 - date1) / hour, 10);
}

function util_chkDate(strDate){

    try{
        if(strDate.length != 8){
            strDate = util_delNotNumber(strDate);
            if(strDate.length != 8)
                return false;
        }

        //var date = new Date(parseInt(strDate.substring(4,8)), parseInt(strDate.substring(2,4),10)-1, parseInt(strDate.substring(0,2),10));
        var date = new Date(parseInt(strDate.substring(0,4)), parseInt(strDate.substring(4,6),10)-1, parseInt(strDate.substring(6,8),10));
        
//        if( (parseInt(strDate.substring(4,8),10)==date.getYear()
//                || (date.getYear() < 100 && parseInt(strDate.substring(6,8),10) == date.getYear()) )
//            && (parseInt(strDate.substring(2,4),10)-1)==date.getMonth()
//            && parseInt(strDate.substring(0,2),10)==date.getDate())
          if( (parseInt(strDate.substring(0,4),10)==date.getYear()
               || (date.getYear() < 100 && parseInt(strDate.substring(0,2),10) == date.getYear()) )
               && (parseInt(strDate.substring(4,6),10)-1)==date.getMonth()
               && parseInt(strDate.substring(6,8),10)==date.getDate())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(e)
    {
        return false;
    }
}

/**
 * Numeric characters, except for String and then delete the return
 * 
 */
function util_delNotNumber(strDate){
    var rtnStr = "";
    for(var i=0; i<strDate.length; i++){
        if('0' <= strDate.charAt(i) && strDate.charAt(i) <= '9'){
            rtnStr += strDate.charAt(i);
        }
    }
    return rtnStr;
}

/**
 * If a date wrong by reducing the normal one day for a date Return date
 * 
 */
function util_getTrueDate(strDate){
    if(strDate.length != 8){
        strDate = util_delNotNumber(strDate);
        if(strDate.length != 8)
            return "";
    }
    var i = 0;
    while( !chkDate(strDate) ){
    	if(parseInt(strDate, 10)/30000000>1){
	        strDate = eval(parseInt(strDate, 10) - 1000000) + "";
        }else if(parseInt(strDate, 10)/120000>1){
        	strDate = eval(parseInt(strDate, 10) - 10000) + "";
        }else{
        	strDate = eval(parseInt(strDate, 10) - 1) + "";
        }
        if( ++i > 100)
            break;
    }
    return strDate.substring(0,2) + '/' + strDate.substring(2,4) + '/' + strDate.substring(4,8);

}
/************ Date, End  **************/

//************ Sort **************/
function util_funcSort(startRow) {
    var obj_div   = event.srcElement;
    if( obj_div == null || obj_div.tagName.toUpperCase() != 'SPAN') return;

    var obj_td    = obj_div;
	
    while(obj_td.tagName.toUpperCase() != 'TD' && obj_td.parentNode != null) {
        obj_td = obj_td.parentNode;
    }

    var cellNum   = obj_td.cellIndex;

    var obj_tr    = obj_td;
    while(obj_tr.tagName.toUpperCase() != 'TR' && obj_tr.parentNode != null) {
        obj_tr = obj_tr.parentNode;
    }

    var obj_table = obj_tr;
    while(obj_table.tagName.toUpperCase() != 'TABLE' && obj_table.parentNode != null) {
        obj_table = obj_table.parentNode;
    }

    var obj_trs = obj_table.rows;
    var obj_tds = obj_tr.cells;

    if(startRow == null){
        for(startRow = 0; obj_trs.length; startRow++) {
            if(obj_trs[startRow] == obj_tr) break;
        }
        startRow += 1;
    }

    if( obj_div.order.toUpperCase() == 'ASC' ) {
        for(var i = startRow, max = obj_trs.length; i < max; i++) {
            var tmp_tr0       = obj_trs[i];
            var tmp_tr0_value = util_getSortValue(tmp_tr0.cells[cellNum]);
            for(var j = i ; j < max; j++) {
                var tmp_tr1 = obj_trs[j];
                if(tmp_tr0_value > util_getSortValue(tmp_tr1.cells[cellNum])) {
                    obj_table.moveRow(j, i);
                    tmp_tr0 = tmp_tr1;
                    tmp_tr0_value = util_getSortValue(tmp_tr0.cells[cellNum]);
                }
            }
        }
        obj_div.order = 'DESC';
        obj_div.innerText = '▲';
    }else if( obj_div.order.toUpperCase() == 'DESC' ) {
        for(var i = startRow, max = obj_trs.length; i < max; i++) {
            var tmp_tr0       = obj_trs[i];
            var tmp_tr0_value = util_getSortValue(tmp_tr0.cells[cellNum]);
            for(var j = i ; j < max; j++) {
                var tmp_tr1 = obj_trs[j];
                if(tmp_tr0_value < util_getSortValue(tmp_tr1.cells[cellNum])) {
                    obj_table.moveRow(j, i);
                    tmp_tr0 = tmp_tr1;
                    tmp_tr0_value = util_getSortValue(tmp_tr0.cells[cellNum]);
                }
            }
        }
        obj_div.order = 'ASC';
        obj_div.innerText = '▼';
    }
}

function util_getSortValue(obj)
{    
	var retVal = obj.innerText;	
    var objs   = obj.childNodes;
    for(var i = 0, max = objs.length; i < max; i++) {
        var obj = objs[i];
        if( obj.tagName != null && obj.tagName.toUpperCase() == 'INPUT') {
            if( obj.type.toUpperCase() == 'TEXT' ) {
                retVal += obj.value;
            }
        }
    }
    return retVal;
}

/************ Sort end  **************/



/**
 * Find out the type of Web browser.
 * 
 */
function util_getBrowserName() {
	if (navigator.appName == 'Microsoft Internet Explorer') return 1;
	else if (navigator.appName == 'Netscape') return 2;
	return 0;
}


/**
 * Microsoft's Internet Explorer web browser types must verify.
 * 
 */
function util_isMIE() {
	if (navigator.appName == 'Microsoft Internet Explorer') return true;
	else false;
}

/**
 * Make sure your web browser is Internet Explorer version 7.
 * 
 */
function util_isMIE7() {
	var agent = navigator.userAgent;
	if (navigator.appName == 'Microsoft Internet Explorer' &&
		agent.indexOf("MSIE 7") > -1) return true;
	else false;
}

/**
 *Make sure your web browser is Internet Explorer version 6.
 * 
 */
function util_isMIE6() {
	var agent = navigator.userAgent;
	if (navigator.appName == 'Microsoft Internet Explorer' &&
		agent.indexOf("MSIE 6") > -1) return true;
	else false;
}

/**
 * Make sure the object exists.
 * 
 */
function util_exists(objectName) {
	var obj = eval('document.'+objectName);
	if (obj.value.trim().length > 0)
		return true;
	else
		return false;
}

/**
 * Copy the URL address of posts
 * 
 */
function util_copyUrl(objNm) {
	var lang = getLang('MN_LANG');
	window.clipboardData.setData('Text', objNm);
	if(lang == "ko"){
		alert("게시물 URL 주소가 복사되었습니다.");
	}else if(lang == "en"){
		alert("Post URL address has been copied.");
	}else{
		alert("мэдээ мэдээлэл URL хаяг хувилагдлаа.");
	}
	return;
}

function util_copyText(objNm) {
	var lang = getLang('MN_LANG');
	window.clipboardData.setData('Text', objNm);
	if(lang == "ko"){
		alert("복사되었습니다.");
	}else if(lang == "en"){	
		alert("It has been copied.");
	}else{
		alert("хувилагдлаа.");
	}
	return;
}
