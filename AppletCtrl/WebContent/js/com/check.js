/**
* @comment_en Script for checking special characters, English, numbers, null
* @comment_ko 각종 특수문자, 영문, 숫자 ,null 체크 해주는 스크립트
*
* History: 1.0.0(2011.07.14 -(Lee Song Yi)) Version initial
*/
 

document.write('<script src="/js/com/checkLang.js"><\/script>');
String.prototype.getBytes = function() {
    return encodeURIComponent(this).replace(/%../g, 'x').length;
};

/**
 * Only if there is null/space input on the false returns
 */
function check_checkNullSpace(arg_value){

	if(arg_value==null || arg_value=="") return false;
		
	arg_value = arg_value.replace(/^\s+/, "");
	arg_value = arg_value.replace(/\s+$/g, "");
		
	if(arg_value=="") return false;
		
	return true;
} 

/**
* space check : When one normal 1, if the abnormal return 0
*/
function check_checkSpace( str ){
	if(str.search(/\s/) != -1){
		return 1;
	}else {
	 	return 0;
	}
}

/**
* password check
*/
function check_validPWD( str ){
	 var lang = getLang('MN_LANG');
	 
     var cnt=0;
     
     if( str == ""){
    	 if(lang == "ko"){
    		 alert("비밀번호를 입력하세요.");
    	 }else if(lang == "en"){
    		 alert("Enter your password, please.");
    	 }else{
    		 alert("Нууц дугаараа оруулна уу.");
    	 }
     	return 0;
     }     
     var retVal = check_checkSpace( str );
     
     if( retVal != "") {
    	 if(lang == "ko"){
    		 alert("비밀번호는 빈공간 없이 연속된 영문 소문자와 숫자만 사용할 수 있습니다.");
    	 }else if(lang == "en"){ 
    		 alert("Password must consist only of English alphabet small letters, numbers without space.");
    	 }else{ 
    		 alert("Нууц дугаар нь зай авалгүй үргэлжилсэн англи жижиг үсэг болон тоог ашиглах боломжтой.");
    	 }
    	return 0;
     }
     
     for( var i=0; i < str.length; ++i) {
         if( str.charAt(0) == str.substring( i, i+1 ) ) ++cnt;
     }  
     
     if( cnt == str.length ) {
    	 if(lang == "ko"){
    		 alert("보안상의 이유로 한 문자로 연속된 비밀번호는 허용하지 않습니다.");
    	 }else if(lang == "en"){ 
    		 alert("For security reasons, a series of single-character password is not accepted.");
    	 }else{
    		 alert("Аюулгүй байдлыг хамгаалах үүднээс нэг үсгээр үргэлжилсэн нууц дугаарыг зөвшөөрөхгүй");
    	 }
    	 return 0; 
     }

     var isPW = /^[a-z0-9]{6,12}$/;
     
     if( !isPW.test(str) ) {
    	 if(lang == "ko"){
    		 alert("비밀번호는 6~12자의 영문 소문자와 숫자만 사용할 수 있습니다."); 
    	 }else if(lang == "en"){ 
    		 alert("Password must consist only of 6~12 characters of small English letters and numbers."); 
    	 }else{
    		 alert("Нууц дугаар нь 6-12 оронтой англи жижиг үсэг болон тоог ашиглах боломжтой."); 
    	 }
    	return 0; 
     }
     return 1;
}

/**
* Receives as a parameter to limit the number of bytes
*/
function check_checkLenth(obj, arg_limtiByte){ 
  
	var lang = getLang('MN_LANG');
	
	var inputDate=obj.value;
	
	var totalLength=check_getLength(inputDate);
	
	if(eval(totalLength) > eval(arg_limtiByte)){
		if(lang == "ko"){
			var msg="입력하신 내용은 {0} Byte를 초과할수 없습니다. 입력: {0} Byte";
		}else if(lang == "en"){ 	
			var msg="The contents you entered can not exceed {0}bytes. Input: {0} Byte";
		}else{
			var msg="Оруулсан утга нь {0} Byte-с хэтрэх боломжгүй.Оруулах : {0} Byte";
		}
		
		msg=msg.replace("{0}",arg_limtiByte);
		msg=msg.replace("{0}",totalLength);
		
		alert(msg);
		obj.focus();
		obj.select();
  	} 
}
function check_checkLenth(obj, arg_limtiByte){ 
	  
	var lang = getLang('MN_LANG');
	
	var inputDate=obj.value;
	
	var totalLength=check_getLength(inputDate);
	
	if(eval(totalLength) > eval(arg_limtiByte)){
		if(lang == "ko"){
			var msg="입력하신 내용은 {0} Byte를 초과할수 없습니다. 입력: {0} Byte";
		}else if(lang == "en"){ 	
			var msg="The contents you entered can not exceed {0}bytes. Input: {0} Byte";
		}else{
			var msg="Оруулсан утга нь {0} Byte-с хэтрэх боломжгүй.Оруулах : {0} Byte";
		}
		
		msg=msg.replace("{0}",arg_limtiByte);
		msg=msg.replace("{0}",totalLength);
		
		alert(msg);
		obj.focus();
		obj.select();
  	} 
}

function check_checkLenth2(obj, arg_limtiByte){ 
	  
	var lang = getLang('MN_LANG');
	
	var inputDate=obj.value;
	
	var totalLength=check_getLength(inputDate);
	
	if(eval(totalLength) > eval(arg_limtiByte)){
		if(lang == "ko"){
			var msg="입력하신 내용은 {0} Byte를 초과할수 없습니다. 입력: {0} Byte";
		}else if(lang == "en"){ 	
			var msg="The contents you entered can not exceed {0}bytes. Input: {0} Byte";
		}else{
			var msg="Оруулсан утга нь {0} Byte-с хэтрэх боломжгүй.Оруулах : {0} Byte";
		}
		
		msg=msg.replace("{0}",arg_limtiByte);
		msg=msg.replace("{0}",totalLength);
		
		alert(msg);
		obj.focus();
		obj.select();
  	} 
}

/**
* Item name input field, limit the number of bytes as a parameter and receives
* <input onblur="check_checkLenth_nm("address",this,50);" maxLength=50 size=20>
*
*/
function check_checkLenth_nm(field_nm, obj, arg_limtiByte){
	var lang = getLang('MN_LANG');
	var inputDate=obj.value;
	var totalLength=check_getLength(inputDate);
	
	if(eval(totalLength) > eval(arg_limtiByte)){
		if(lang == "ko"){
			 var msg="{0}일 경우, {0}자리입니다.";
		}else if(lang == "en"){ 	 
			 var msg="{0} is {0}digits needed.";
		}else{
			 var msg="{0} тохиолдолд {0} оронтой байна.";
		 }
		msg=msg.replace("{0}",field_nm);
		msg=msg.replace("{0}",arg_limtiByte);
		
		alert(msg);
		obj.focus();
		obj.select();
		return true;
	}else{
		return false;
	}
}

/**
* Check the length returned by
*
*/
function check_getLength(arg_str){

	return arg_str.getBytes();

}

/**
* Check whether the number
* <input onblur="check_numberCheck(this);" >
*
*/
function check_numberCheck(obj) {
	var lang = getLang('MN_LANG');
    var src = new String(obj.value);
    var i, len=src.length;
    
    for (i=0; i<len; i++) {
    	
    	if(i==0){
    		if(src.charAt(0)=='-'){
    			continue;	
    		}else{ 
    			if ((src.charAt(0) < '0') || (src.charAt(0) > '9') ){
    				 if(lang == "ko"){
    					 alert("숫자만 입력가능합니다.");
    				 }else if(lang == "en"){ 
    					 alert("Only numbers can be entered.");
    				 }else{	 
    					 alert("Зөвхөн тоо оруулах боломжтой.");
    				 }
    				obj.focus();
					break; 
    			}
    		}
    	}else{
    		if ((src.charAt(i) < '0') || (src.charAt(i) > '9')){
    			if(lang == "ko"){
    				alert("숫자만 입력가능합니다.");
    			}else if(lang == "en"){ 	
    				alert("Only numbers can be entered.");
    			}else{
    				alert("Зөвхөн тоо оруулах боломжтой.");
    			}
    			obj.focus();
				break;
    		}
    	}	
    }
}
/**
* Check whether the number
* <input onblur="check_numberCheck(this);" >
*
*/
function check_naturalNumber(obj) {
	var lang = getLang('MN_LANG');
    var src = new String(obj.value);
    var i, len=src.length;
    
    if( (len == 1) && (src.charAt(0) == '0')) {
    	if(lang == "ko"){
    		alert("숫자만 입력가능합니다.");
    	 }else if(lang == "en"){ 	
    		 alert("Only numbers can be entered.");
    	 }else{
    		 alert("Зөвхөн тоо оруулах боломжтой.");
    		 
    	 }
		obj.focus();
      	return;
    }
    
    for (i=0; i<len; i++) {
    	
    	if(i==0){
			if ((src.charAt(0)=='-') || (src.charAt(0) < '0') || 
			    (src.charAt(0) > '9')  || (src.charAt(0) == '0') )
			{
				 if(lang == "ko"){
					 alert("숫자만 입력가능합니다.");
				 }else if(lang == "en"){ 	 
					 alert("Only numbers can be entered.");
				 }else{	 
					 alert("Зөвхөн тоо оруулах боломжтой.");
				 }
				obj.focus();
				break;
			}
    	}else{
    		if ((src.charAt(i) < '0') || (src.charAt(i) > '9')){
    			 if(lang == "ko"){
    				 alert("숫자만 입력가능합니다.");
    			 }else if(lang == "en"){ 	 
    				 alert("Only numbers can be entered.");
    			 }else{
    				 alert("Зөвхөн тоо оруулах боломжтой.");
    			 }
				obj.focus();
				break;
    		}
    	}	
    } 
}

/**
* Phone number is checked
*
*/
function check_phoneNumCheck(obj,chr) {
	var lang = getLang('MN_LANG');
	var src = check_removeChar(obj, chr);
	var pattern = /^[0-9]+$/;
	
	if(!pattern.test(src)){
		if(lang == "ko"){
			alert("전화번호를 정확히 입력하여 주십시오.");
		 }else if(lang == "en"){ 	
			 alert("Please, enter a valid phone number.");
		 }else{	 
			 alert("Утасныхаа дугаарыг зөв оруулна уу.");
		 }
		return true;
	}else{
		return false;
	}
}

 /**
  * If you enter a numeric value other than false is returned.
  *
  */
function check_numberCheckOnly(arg_src) {
    
    var src = new String(arg_src);
    var i, len=src.length;
    
    for (i=0; i<len; i++) {
    	
    	if(i==0){
    		if(src.charAt(0)=='-'){
    			continue;	
    		}else{
    			if ((src.charAt(0) < '0') || (src.charAt(0) > '9')){
					return false;
    			}
    		}
    	}else{
    		if ((src.charAt(i) < '0') || (src.charAt(i) > '9')){
				return false;
    		}
    	}	
    }
    
    return true;
}

 /**
  * Can not use special characters have been used when initializing the alert to remove the special characters.
  *
  */
function check_Special(obj){
    re = /[\[\]\(\)\-_,.]/;  // except []()-_,.
    var lang = getLang('MN_LANG');
    var data = new String(obj.value);
    var bool = true;
    
    var target = " ";

	for (var i=0; i < data.length; i++) { 
		ch_char = data.charAt(i);

		ch=ch_char.charCodeAt();

		if( ((ch >= 33 && ch <= 47) || (ch >= 58 && ch <= 64) || (ch >= 91 && ch <= 96) || (ch >= 123 && ch <= 126)) &&  !re.test(ch_char)) {
			obj.value=obj.value.replace(ch_char,"");
			target = target.replace(ch_char+" ","");
			target = target + ch_char + " ";
			bool = false;
		}
    }
    if(bool==false){
    	if(lang == "ko"){
    		var msg="다음의 특수문자는 사용할 수 없습니다. ({0})";
    	}else if(lang == "en"){ 
    		var msg="The following special characters cannot be used. ({0})";
    	}else{
    		var msg="Дараах онцгой өгүүлбэр нь ашиглах боломжгүй.({0})";
    	}
    	msg=msg.replace("{0}",target);
	    alert(msg);
	    obj.focus();
    }
    return bool;
}

 /**
  * Remove the character and re-setting the value for the obj.
  *
  */
function check_removeCharInput(obj, chr) {
    
    var src = new String(obj.value);
    var tar = new String();
    var i, len=src.length;
    for (i=0; i < len; i++) {
        if (src.charAt(i) == chr)
            tar += '';
        else
            tar += src.charAt(i);
    }
    
    obj.value = tar;
}

 /**
  * Characters removed, and returns the string
  *
  */
function check_removeChar(arg_src, chr) {
    
    var src = arg_src;
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

 /**
  * Check whether the input date format
  * onBlur="javascript:check_dateCheck(this,'/');"
  *
  */
function check_dateCheck(obj,chr) {
	var lang = getLang('MN_LANG');
    var err  = 0;
    var chartest = obj.value;
    ival  = obj.value;
    if (ival == '') return;
    
    chartest = check_removeChar(chartest,chr);
    if(chartest.length != 8) {
    	 if(lang == "ko"){
    		 alert("입력조건에 해당하지 않습니다.");
    	 }else if(lang == "en"){ 
    		 alert("It does not meet the input requirements.");
    	 }else{	 
    		 alert("Оруулах нөхцөлтэй дүйхгүй байна.");
    	 }
        obj.focus();
        return;
    }
    century = chartest.substring(0, 2); // century
    if (century > 19) {
        year = chartest.substring(0, 4); // year
    } else {
        year = chartest.substring(0, 4); // year
    }
    month = chartest.substring(4, 6); // month
    day  = chartest.substring(6, 8); // day
    
    if(check_numberCheckOnly(chartest)==false) {
    	 if(lang == "ko"){
    		 alert("등록할 수 없는 문자입니다.");
    	 }else if(lang == "en"){ 
    		 alert("This letter is not able to register.");
    	 }else{	 
    		 alert("Бүртгэх боломжгүй өгүүлбэр байна.");
    	 }
        obj.focus();
        return;
    }

    if(month < 1 || month > 12) err = 1;
    if(day  < 1 || day  > 31) err = 1;
    if (century < 19) {
        if(year < 0 || year > 99) err = 1;
    }
    if(century < 18) err = 1;
    
	if((day == '31')&& (month == '02' ||month == '04' ||month == '06' ||month == '09' ||month == '11')){
		err = 1;
	}else if(month == '02' ){
		if( ( (Number(chartest.substring(6, 8)) % 4 == 0) && (Number(chartest.substring(6, 8)) % 100 != 0) ) || (Number(chartest.substring(6, 8)) % 400 == 0) ) {
			if(day == '30'){
				err = 1;
			}
		}else if(day == '29' || day == '30'){
			err = 1;
		}
	}
	
    if(err == 1) {
    	if(lang == "ko"){
    		alert("입력조건에 해당하지 않습니다.");
    	}else if(lang == "en"){ 
    		alert("It does not meet the input requirements.");
    	}else{  
    		alert("Оруулах нөхцөлтэй дүйхгүй байна.");
    	}
        obj.focus();
        return;
    }
   
    else{
         if (century > 18) {
             obj.value = year + chr + month + chr + day;
         } else {
             obj.value = year + century + chr + month + chr + day;
         }
    }
}

  /**
   * Check whether the input time format
   * onBlur="javascript:check_timeCheck(this,':');"
   *
   */
function check_timeCheck(obj,chr) {
	var lang = getLang('MN_LANG');
    var err  = 0;
    var chartest = obj.value;
    ival  = obj.value;
    if (ival == '') return;
    
	var val = chartest.split(chr);
	if(val[2]==null){
		if(val[1]==null){
			val[1]=val[0].substring(2,4);
			val[0]=val[0].substring(0,2);
		}
		if(val[0].length<2){val[0]='0'+val[0];}
		if(val[1].length<2){val[1]='0'+val[1];}
		if(val[1].length<2){val[1]='0'+val[1];}
		if(val[0].length>2 || val[1].length>2 
			|| val[0] < 0 || val[0] > 23 
			|| val[1] < 0 || val[1] > 59){ err = 1;}
	}else{
		err = 1;
	}
    
    chartest = check_removeChar(chartest,chr);
    if(check_numberCheckOnly(chartest)==false) {
    	 if(lang == "ko"){
    		 alert("등록할 수 없는 문자입니다.");
    	 }else if(lang == "en"){ 
    		 alert("This letter is not able to register.");
    	 }else{
    		 alert("Бүртгэх боломжгүй өгүүлбэр байна.");
    	 }
        obj.focus();
        return;
    }
    
    if(err == 1) {
    	 if(lang == "ko"){
    		 alert("입력조건에 해당하지 않습니다.");
    	 }else if(lang == "en"){ 
    		 alert("It does not meet the input requirements.");
    	 }else{
    		 alert("Оруулах нөхцөлтэй дүйхгүй байна.");
    	 }
        obj.focus();
        return;
    }else{
         obj.value = val[0] + chr + val[1];
    }
}

/**
* Start date, end date when the order does not match the output message
*
*/
function check_DateSeq(val1, val2, arg_message,chr) {
 
 	return check_DateSeq_mand(val1, val2, arg_message,chr, true);
  
}

/**
 * Start date, end date when the order does not match the output message
 *
 */
function check_DateSeq_mand(val1, val2, arg_message, chr, arg_mandatory) {
	var lang = getLang('MN_LANG');
    var value1 = check_removeChar(val1,chr);
    var value2 = check_removeChar(val2,chr);
   
   if(arg_mandatory==false){
   	if(check_checkNullSpace(value1)==false || check_checkNullSpace(value2)==false){
		return true;   	
   	}  
   }
   
   if(check_checkNullSpace(value1)==false){
	   if(lang == "ko"){
		   alert("시작일을 입력해 주세요.");
	   }else if(lang == "en"){ 
		   alert("Please, enter a start date.");
	   }else{
		   alert("Эхлэх ажилыг оруулна уу.");
	   }
		return false;
	}	
	if(check_checkNullSpace(value2)==false){
		 if(lang == "ko"){
			 alert("종료일을 입력해 주세요.");
		 }else if(lang == "en"){ 
			 alert("Please, enter an end date.");
		 }else{
			 alert("Дуусгах ажилыг оруулна уу.");
		 }
		return false;
	}
 
	if( value1.substring(0,5) > value2.substring(0,5) ){
		alert(arg_message);
		return false;
	}else if( value1.substring(0,5)== value2.substring(0,5) && value1.substring(4,6) > value2.substring(4,6) ){
		alert(arg_message);
		return false;
	}else if( value1.substring(0,5)== value2.substring(0,5) && value1.substring(4,6)== value2.substring(4,6) && value1.substring(6,8) > value2.substring(6,8) ){
		alert(arg_message);
		return false;
	}
	return true;
}

/**
* Start date, end date when the order does not match the output message
*
*/
function check_DateSeq_obj(startObj, endObj, arg_message,chr, arg_mandatory) {
	if(arg_mandatory==false){
	}else if(!check_dateInputValue(startObj, endObj)){
		return false;
	}
	if(check_DateSeq_mand(startObj.value, endObj.value, arg_message,chr, arg_mandatory)){
		return true;
	}
	startObj.focus();
	return false;
}


/**
* Start time, end time when the order does not match the output message
*
*/
function check_TimeSeq(s_dateObj, s_hourObj, s_minObj, e_dateObj, e_hourObj, e_minObj, arg_message,chr) {
	if( check_DateSeq(s_dateObj.value, e_dateObj.value, arg_message, chr) ){
		if( s_dateObj.value == e_dateObj.value ){
			if( s_hourObj.value > e_hourObj.value ){
				alert(arg_message);
				s_hourObj.focus();
				return false;
			}else if( s_hourObj.value == e_hourObj.value && s_minObj.value > e_minObj.value) {
				alert(arg_message);
				s_minObj.focus();
				return false;
			}
		}
		return true;
	} else {
		s_dateObj.focus();
		return false;
	}
}

/**
* Start date, end date, check whether the input
*
*/
function check_dateInputValue(startObj, endObj){
	var lang = getLang('MN_LANG');
	
	if(check_checkNullSpace(startObj.value)==false){
		 if(lang == "ko"){
			 alert("시작일을 입력해 주세요.");
		 }else if(lang == "en"){ 
			 alert("Please, enter a start date.");
		 }else{
			 alert("Эхлэх ажилыг оруулна уу.");
		 }
		startObj.focus();
		return false;
	}
	
	if(check_checkNullSpace(endObj.value)==false){
		 if(lang == "ko"){
			 alert("종료일을 입력해 주세요.");
		 }else if(lang == "en"){ 
			 alert("Please, enter an end date.");
		 }else{
			 alert("Дуусгах ажилыг оруулна уу.");
		 }
		endObj.focus();
		return false;
	}
	
	return true;
}

/**
* Each three-digit number entered '.' After inserting the return
* 
* 
*
*/
function check_makeComma(str) {
    
    var src = new String(str);
    var len;
    var i = 0;
    var pos = 0;
    var split1 = '';
    var split2 = '';
    var split3 = '';
    var rtn_value = '';
    
    if (src.charAt(0) == '-') {
        split1 = '-';
        src = src.substr(1);
    }
    
    if (src.indexOf('.') >= 0) {
        split2 = src.substring(0,src.indexOf('.'));
        split3 = src.substr(src.indexOf('.'));
        if(split3.length==1){
        	split3 = '';
        }
    }else{
        split2 = src;
        split3 = '';
    }
    
    if(src.length==0 || (split2.length==0 && split3.length==0)){
    	return '';
    }
    
    len = split2.length;
    if(len==0){
    	split2 = '0';
    }
    
    for(var j = 0; j < len-1; j++){
    	if(split2.indexOf('0')==0){
    		split2 = split2.substring(1);
    	}
    }
    len = split2.length;
    
    for(var i = 0; i < len; i++) {
        pos  = len - i;
        rtn_value = rtn_value + split2.charAt(i);
        if(pos != 1 && pos % 3 == 1) {
            rtn_value = rtn_value + ',';
        }
    }
    
    return split1+rtn_value+split3;
}

/**
 * El tipo de índice coincida con el valor los valores introducidos son correctos, compruebe
 * ex) onBlur="javascript:check_NumberFormat(this,"1");"
 *
 */
function check_NumberFormat(obj,index){
	var lang = getLang('MN_LANG');
	var src = new String(check_removeChar(obj.value,","));

	var Ltar = new String();
	var Rtar = new String();
	var dot = new String();
	var i,len=src.length;
	var LFlag = "Y";
	var RFlag = "N";
	var err_status = '';

	var Lcond,Rcond;
	var Message;

	if(index == "1"){
		Lcond = 15;
		Rcond = 3;
		Message ="###,###,###,###,###.###";
	}else if(index == "2"){
		Lcond = 2;
		Rcond = 2;
		Message ="##.##";
	}else if(index == "3"){
		Lcond = 3;
		Rcond = 2;
		Message ="###.##";
	}else if(index == "4"){
		Lcond = 4;
		Rcond = 0;
		Message ="####";
	}else if(index == "5"){
		Lcond = 2;
		Rcond = 3;
		Message ="##.###";
	}else if(index == "6"){
		Lcond = 3;
		Rcond = 3;
		Message ="###.###";
	}else if(index == "7"){
		Lcond = 3;
		Rcond = 7;
		Message ="###.#######";
	}else if(index == "8"){
		Lcond = 12;
		Rcond = 0;
		Message ="###,###,###.###";
	}else if(index == "9"){
		Lcond = 15;
		Rcond = 2;
		Message ="###,###,###,###,###.##";
	}else if(index == "10"){
		Lcond = 15;
		Rcond = 0;
		Message ="###,###,###,###,###";
	}else if(index == "11"){
        Lcond = 12;
        Rcond = 3;
        Message ="###,###,###,###.###";
    }else if(index == "12"){
        Lcond = 6;
        Rcond = 0;
        Message ="###,###";
	}else if(index == "13"){
		Lcond = 15;
		Rcond = 3;
		Message ="###,###,###,###,###.###";
    }else if(index=="14"){
    	Lcond = 1;
		Rcond = 1;	
		Message ="#.#";
   	}else if(index == "15"){
		Lcond = 3;
		Rcond = 4;
		Message ="###.####";
    }else if(index == "16"){
		Lcond = 10;
		Rcond = 3;
		Message ="#,###,###,###.###";
    }else if(index == "17"){
		Lcond = 15;
		Rcond = 6;
		Message ="###,###,###,###,###.######";		
	}else if(index == "18"){
		Lcond = 8;
		Rcond = 2;
		Message ="##,###,###.##";		
	}
    
    if(obj.value==null || obj.value==""){
    	return;
    }

	for(i=0;i<len;i++){
		if(src.charAt(i) != "."){
		    if(LFlag == "Y")
		    	Ltar += src.charAt(i);
		    else if(RFlag =="Y")
		        Rtar += src.charAt(i);
		} else{
			LFlag="N";
			RFlag="Y";
			dot += src.charAt(i);
		}
	}

	if(index != "4" && index != "8" && index != "10" && index != "12") {
		for (var i=0; i<Rtar.length; i++) {
    		var ch = Rtar.charAt(i);
    		if ((ch < '0' || '9' < ch)){
    		    err_status = '1';
    		}
       	}
    }

    for (var i=0; i<Ltar.length; i++) {
    	var ch = Ltar.charAt(i);
    	if ((ch < '0' || '9' < ch)){
    	    err_status = '1';
    	}
    }

	if(err_status == "1"){
		 if(lang == "ko"){
			 alert("숫자만 입력가능합니다.");
		 }else if(lang == "en"){ 
			 alert("Only numbers can be entered.");
		 }else{
			 alert("Зөвхөн тоо оруулах боломжтой.");
		 }
	   	obj.focus();					       	 	
		return false;
	}

	if(Ltar.length > Lcond || Rtar.length > Rcond || dot.length > 1){
		 if(lang == "ko"){
			 alert("입력조건에 해당하지 않습니다.("+Message+")");
		 }else if(lang == "en"){ 
			 alert("It does not meet the input requirements. ("+Message+")");
		 }else{
			 alert("Оруулах нөхцөлтэй дүйхгүй байна. ("+Message+")");
		 }
			obj.focus();				
			return false;
	}
	check_moneyFormat(obj);
	return true;
}

/**
* The money is converted to a format.
*
*/
function check_moneyFormat(obj){
	var lang = getLang('MN_LANG');
	var src = new String(check_removeChar(obj.value,","));
	var val = src.split (".");
	if(val[2]!=null){
		if(lang == "ko"){
			alert("입력조건에 해당하지 않습니다.");
		}else if(lang == "en"){ 
			 alert("It does not meet the input requirements.");
		 }else{
			 alert("Оруулах нөхцөлтэй дүйхгүй байна.");
		 }
		obj.focus();
		return;
	}
	if(check_numberCheckOnly(check_removeChar(src,"."))){
		obj.value = check_makeComma(src);
	}else{
		if(lang == "ko"){
			alert("숫자만 입력가능합니다");
		}else if(lang == "en"){ 
			alert("Only numbers can be entered.");
		}else{
			alert("Зөвхөн тоо оруулах боломжтой.");
		}
        obj.focus();
        return;
	}
}

/**
* Check whether the checkbox is checked
*
*/
function check_isAllChecked(checkboxes) {
    var isChecked = false;
    for ( var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked)
            isChecked = true;
    }
    return isChecked;
} 

/**
 * Check required fields
 *
 */
function check_chkform(form, fieldlist) {
	var lang = getLang('MN_LANG');
	for (i = 0; i < fieldlist.length; i++)
	    if (eval("document."+form+"."+ fieldlist[i][0]).value == "") {
	    	 if(lang == "ko"){
	    		 alert("{0}는/은 필수입력 사항입니다.".replace("{0}",fieldlist[i][1]));
	    	 }else if(lang == "en"){  
	    		 alert("{0} is mandatory.".replace("{0}",fieldlist[i][1]));
	    	 }else{ 
	    		 alert("{0} нь зайлшгүй оруулах зүйл.".replace("{0}",fieldlist[i][1]));
	    	 }
	      eval("document."+form+"."+ fieldlist[i][0]).focus();
	      return false;
	    }
	return true;
}

