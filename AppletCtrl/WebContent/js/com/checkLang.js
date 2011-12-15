/**
  * @comment_en Script for functions to translate the language of check.js/utils.js
  * @comment_ko check.js/ utils.js의 언어변환을 위한 function script
  *
  * History: 1.0.0(2011.07.14 -(Jeong Jin Kook)) Version initial
  */
	function getLang(name) {	 

	 var arg = name + "=";	 
	 var alen = arg.length;	 
	 var clen = document.cookie.length;	 
	 var i = 0;
	 while (i < clen) {
	     var j = i + alen;
	     if (document.cookie.substring(i, j) == arg){
	       return getLangVal(j);
	     }
	     i = document.cookie.indexOf(" ", i) + 1;
	     if (i == 0){ break;}
	 }
	 return null;
	}

	function getLangVal (offset) {
	  var endstr = document.cookie.indexOf (";", offset);
	  if (endstr == -1){
	    endstr = document.cookie.length;
	  }
	   return getLangDecode(unescape(document.cookie.substring(offset, endstr)));
	}
	
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	function getLangDecode(input) 
	{
	 var output = "";
	 var chr1, chr2, chr3;
	 var enc1, enc2, enc3, enc4;
	 var i = 0;
	 input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	 while (i < input.length) 
	 {
		 enc1 = this.keyStr.indexOf(input.charAt(i++));
		 enc2 = this.keyStr.indexOf(input.charAt(i++));
		 enc3 = this.keyStr.indexOf(input.charAt(i++));
		 enc4 = this.keyStr.indexOf(input.charAt(i++));

		 chr1 = (enc1 << 2) | (enc2 >> 4);
		 chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		 chr3 = ((enc3 & 3) << 6) | enc4;

		 output = output + String.fromCharCode(chr1);

		 if (enc3 != 64) {
			 output = output + String.fromCharCode(chr2);
		 }
		 if (enc4 != 64) {
			 output = output + String.fromCharCode(chr3);
		 }
	 }
	 output = this.getLang_uf8_decode(output);
    
	 return output;
    }
	function getLang_uf8_decode(utftext) 
	{
	   var string = "";
	   var i = 0;
	   var c = c1 = c2 = 0;

	   while ( i < utftext.length ) {

		   c = utftext.charCodeAt(i);

		   if (c < 128) {
			   string += String.fromCharCode(c);
			   i++;
		   }
		   else if((c > 191) && (c < 224)) {
			   c2 = utftext.charCodeAt(i+1);
			   string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			   i += 2;
		   }
		   else {
			   c2 = utftext.charCodeAt(i+1);
			   c3 = utftext.charCodeAt(i+2);
			   string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			   i += 3;
		   }
	   }
	   return string;
	}
