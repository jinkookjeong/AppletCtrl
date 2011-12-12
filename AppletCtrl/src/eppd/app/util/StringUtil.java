package eppd.app.util;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.Vector;

public class StringUtil {
	
	
	public static String makeDocumentNumber(String senderId, String msgId, String docTitle) throws Exception
    {
        try
        {  
            //SimpleDateFormat simpledateformat = new SimpleDateFormat("yyyyMMddHHmmss");
            //String docMsgId = String.format("%1$s.%2$s.%3$05d.%4$s", new Object[] {
            //    senderId, simpledateformat.format(new Date()), Integer.valueOf(i),docTitle 
            //});
            String docMsgId = String.format("%1$s.%2$s.%3$s", new Object[] {
                    senderId, msgId, docTitle 
                });
            return docMsgId;
        }
        catch(Exception e)
        {
        	throw e;
        }
    }
	
	public static String makeMsgId() throws Exception
    {
        try
        {
            Calendar calendar = Calendar.getInstance();
            Random random = new Random(calendar.getTimeInMillis());
            int i = random.nextInt() % 32767;
            i = Math.abs(i);
            SimpleDateFormat simpledateformat = new SimpleDateFormat("yyyyMMddHHmmss");
            String docMsgId = String.format("%1$s.%2$05d", new Object[] {
                simpledateformat.format(new Date()), Integer.valueOf(i) 
            });
            return docMsgId;
        }
        catch(Exception e)
        {
        	throw e;
        }
    }
	
	public static boolean containsIgnoreCase(String str, String searchStr)
    {
        if(str == null || searchStr == null)
            return false;
        else
            return contains(str.toUpperCase(), searchStr.toUpperCase());
    }
	
    public static boolean isEmpty(String str)
    {
        return str == null || str.length() == 0;
    }

    public static boolean isNotEmpty(String str)
    {
        return !isEmpty(str);
    }

    public static String utf8Toasc(String str) throws UnsupportedEncodingException	{
		if(str==null){ return null;}
		return new String(str.getBytes("UTF-8"),"8859_1");
	}
    
	public static String ascToutf8(String str) throws UnsupportedEncodingException	{
		if(str==null){ return null;}
		return new String(str.getBytes("8859_1"),"UTF-8");
	}

	public static String toUnicode( String source )	 {
		String ret = null;
		if( source == null ){ return null;}
		try {
			ret = new String( source.getBytes(),"8859_1");
		} catch( UnsupportedEncodingException e ) {
			ret = null;
		}
		return ret;
	}
	
    public static boolean isBlank(String str)
    {
        int strLen;
        if(str == null || (strLen = str.length()) == 0)
            return true;
        for(int i = 0; i < strLen; i++)
            if(!Character.isWhitespace(str.charAt(i)))
                return false;

        return true;
    }

    public static boolean isNotBlank(String str)
    {
        return !isBlank(str);
    }
	

	public static String retNull(String s){
		
		try{
			if(s == null || s.equals("")){ return null;}
		}catch(Exception e){
		}
		
		return s.trim();
	}

	public static String[] retNull(String ...s){
		
		if(s == null){ return null;}
		
		try{
			for(int i=0; i < s.length; i++){
				if(s[i] == null || s[i].equals("")){ s[i]=null;}
			}
		}catch(Exception e){
		}
		
		return s;
	}
	
	public static String retSpace(String s){
		
		try{
			if(s == null || s.equals("") || s.equals("null")){ return "";}
		}catch(Exception e){
		}
		
		return s.trim();
	}

	public static Integer retZero(String s) throws Exception{
		
		try{
			if(s == null || s.equals("") || s.equals("null")){ return 0;}
		}catch(Exception e){
		}
		
		return (new Integer(s));
	}
	public static String[] retSpace(String ...s){
		
		if(s == null){ return null;}
		
		try{
			for(int i=0; i < s.length; i++){
				if(s[i] == null || s[i].equals("")){ s[i] = "";}
			}
		}catch(Exception e){
		}
		
		return s;
	}
	public static String replace(String source, String delemeter, String ...s){
		
		if (source == null || source.length()==0 || s == null || delemeter == null || delemeter.length()==0 ){
			return null;
		}
		
		StringBuffer rtnStr = new StringBuffer();
		String preStr = "";
		String nextStr = source;
		int i = 0;
		try{
			while ( source.indexOf(delemeter) >= 0 ) {
				preStr = source.substring(0, source.indexOf(delemeter));
				nextStr = source.substring(source.indexOf(delemeter)+delemeter.length(), source.length());
				source = nextStr;
				rtnStr.append(preStr).append(retSpace(s[i]));
				i++;
			}
		}catch(Exception ex){			
		}
		rtnStr.append(nextStr);
		return rtnStr.toString();
	}
	
	/**
	 * @comment_sp source : ingresa ""{0} más de {0} dígito, menos de {0} dígito""
	 * delemeter : {0}
	 * s :  ingresa el valor que reemplaza el número de {0}
	 * Método de uso : StringUtil.replace(source,""{0}"",""01"")
	 * Resultado : en el caso de 01 ingrese más de 10 dígitos y menos de 40 dígitos
	 * @comment_ko source : "{0} 은/는 {0} 자리 이상, {0}자리 이하로 입력하여 주십시오.";
	 * delemeter : {0}
	 * s : {0} 개수 만큼 replace하려는 값 입력
	 * 사용방법 : StringUtil.replace(source,"{0}","01")
	 * 결과 : 01 은/는 01 자리 이상, 01자리 이하로 입력하여 주십시오.
	 * @param   String arg
	 * @return  String
	 */
	public static String replace(String source, String subject, String object) {
		if (source == null || source.length()==0 || subject == null || subject.length()==0 || object == null){
			return null;
		}
		StringBuffer rtnStr = new StringBuffer();
		String preStr = "";
		String nextStr = source;
		while ( source.indexOf(subject) >= 0 ) {
			preStr = source.substring(0, source.indexOf(subject));
			nextStr = source.substring(source.indexOf(subject)+subject.length(), source.length());
			source = nextStr;
			rtnStr.append(preStr).append(object);
		}
		rtnStr.append(nextStr);
		return rtnStr.toString();
	}
	
	/**
	 * @comment_sp Cambia el primer sujeto al objeto en la fuente  
	 * @comment_ko source 중 첫번째 subject 를 object로 변환
	 * @param   String arg
	 * @return  String
	 */
	public static String replaceOnce(String source, String subject, String object) {
		StringBuffer rtnStr = new StringBuffer();
		String preStr = "";
		String nextStr = source;
		if ( source.indexOf(subject) >= 0 ) {
			preStr = source.substring(0, source.indexOf(subject));
			nextStr = source.substring(source.indexOf(subject)+subject.length(), source.length());
			rtnStr.append(preStr).append(object).append(nextStr);
			return rtnStr.toString();
		} else {
			return source;
		}
	}
	/**
	 * @comment_sp Operación de sustitución de columna de letras: 
	 * sustituye todas las letras específicas incluidas en forma no sucesiva 
	 * @comment_ko 문자열 치환 함수: 문자속에 비연속적으로 포함된 특정문자를 모두 치환
	 * String source = "ab,12-34!";
	 * String subject = ",-!";
	 * String object = "";
	 * String rst = strUtil.replace(source,subject,object);
	 * @param source		원본 문자열, Cadena de origen
	 * @param subject		바뀔 문자열, Cambio de cadena
	 * @param object		바꿀 문자열, Cadena de reemplazo
	 * @return				바뀐 문자열, Cambio de cadena
	  */
	public static String replaceChar(String source, String subject, String object) 
	{
		StringBuffer rtnStr = new StringBuffer();
		String preStr = "";
		String nextStr = source;
		char   chA;
		
		for(int i=0 ; i<subject.length(); i++)
		{
			chA = subject.charAt(i);
			rtnStr.delete(0,rtnStr.capacity());
			
			if ( source.indexOf(chA) >= 0 ) {
				preStr = source.substring(0, source.indexOf(chA));
				nextStr = source.substring(source.indexOf(chA)+1, source.length());
				source= rtnStr.append(preStr).append(object).append(nextStr).toString();
			}		
		}
		return source;
	}
	
	/**
	 * @comment_sp Reemplaza la columna de letras provisorias por otras 
	 * @comment_ko 문자열에서 임의의 문자열를 다른 문자열로 대치
	 * @param sSrc   String Source.
	 * @param sPattern  대치할 문자열. Cadena de reemplazo
	 * @param sReplace  대치 문자열. Cadena de reemplazo
	 * @return  대치된 문자열. Cadena Daechidoen
	 */
	public static String replaceStr(String sSrc, String sPattern, String sReplace) 
	{
		int iStart  = 0;  
		int iEnd  = 0;  
		
		StringBuffer sb = new StringBuffer();
		
		while ((iEnd = sSrc.indexOf(sPattern, iStart)) >= 0) 
		{ 
			sb.append(sSrc.substring(iStart, iEnd)).append(sReplace); 
			iStart = iEnd + sPattern.length(); 
		} 
		sb.append(sSrc.substring(iStart)); 
		
		return sb.toString(); 
	}
	
	/**
	 * @comment_sp substring(start,end)
	 * @comment_ko substring(start,end)
	 * @param String str, int start, int end
	 * @return String
	 */
	public static String subStr(String str, int start, int end)    
	{
		if(null == str || str.equals("null")){
			str = "";
		}else{
			str = str.substring(start,end);
		}
		return str;
	}
	
	/**
	 * @comment_sp Substring después de sep
	 * @comment_ko sep 이후를 substring
	 * @param String str, String sep
	 * @return String
	 */
	public static String subStrLast(String str, String sep)    
	{
		if(null == str || str.equals("null")||null == sep || sep.equals("null")){
			str = "";
		}else{			
			str = subStr(str, str.lastIndexOf(sep)+1,str.length());
		}
		return str;
	}
	
	/**
	 * @comment_sp Substring hasta antes de sep
	 * @comment_ko sep 이전까지 substring
	 * @param String str, String sep
	 * @return String
	 */
	public static String subStrPre(String str, String sep)    
	{
		if(null == str || str.equals("null")||null == sep || sep.equals("null")){
			str = "";
		}else{
			str = subStr(str, 0, str.indexOf(sep));
		}
		return str;
	}
	
	/**
	 * @comment_sp Cambia el número al formato de datos deseado 
	 * @comment_ko 숫자를 원하는 데이터 포맷으로 변환한다.
	 * ex) digitToFormat(1234567890,"#,###") -> 1,234,567,890
	 * @param double digit, String format
	 * @return String
	 */
	public static String digitToFormat(double digit, String format) {
		DecimalFormat decFormat = new DecimalFormat(format);
		
		return decFormat.format(digit);	
		
	}
	
	
	public static String[] split(String source,String separator) throws NullPointerException {
		String[] rtnVal = null;
		int cnt = 1;
		
		int index = source.indexOf(separator);
		int index0 = 0;
		while ( index >= 0 ) {
			cnt++;
			index = source.indexOf(separator,index+1);
		}
		rtnVal = new String[cnt];
		cnt = 0;
		index = source.indexOf(separator);
		while ( index >= 0 ) {
			rtnVal[cnt] = source.substring(index0,index);
			index0 = index+1;
			index = source.indexOf(separator,index+1);
			cnt++;
		}
		rtnVal[cnt] = source.substring(index0);
		return rtnVal;
	}
	
    public static boolean contains(String str, String searchStr)
    {
        if(str == null || searchStr == null)
            return false;
        else
            return str.indexOf(searchStr) >= 0;
    }
//    
//    public static String[] split(String str, String separatorChars)
//    {
//        return splitWorker(str, separatorChars, -1, false);
//    }
    
    public static String[] split(String source,String separator, int arraylength) throws NullPointerException {
		String[] rtnVal = new String[arraylength];
		
		int cnt = 0;
		int index0 = 0;
		int index = source.indexOf(separator);
		while ( index >= 0 && cnt < (arraylength-1) ) {
			rtnVal[cnt] = source.substring(index0,index);
			index0 = index+1;
			index = source.indexOf(separator,index+1);
			cnt++;
		}
		rtnVal[cnt] = source.substring(index0);
		if ( cnt < (arraylength-1) ) {
			for ( int i=cnt+1; i<arraylength; i++ ) {
				rtnVal[i] = "";
			}		
		}
		return rtnVal;
	}	
	
	public static String[] splitS(String source,String separator, int idx) throws NullPointerException {
		String[] rtnVal = null;
		int cnt = 1;
		
		int index = source.indexOf(separator);
		int index0 = 0;
		while ( index >= 0 ) {
			cnt++;
			index = source.indexOf(separator,index+1);
		}
		rtnVal = new String[cnt];
		cnt = 0;
		index = source.indexOf(separator);
		while ( index >= 0 ) {
			rtnVal[cnt] = source.substring(index0,index);
			index0 = index+idx;
			index = source.indexOf(separator,index+1);
			cnt++;
		}
		rtnVal[cnt] = source.substring(index0);
		return rtnVal;
	}

	public static String[] splitStringOnToken(String str, String tokens){
		if (str==null){  return new String[0];}
		StringTokenizer     st      = null;
		Vector              vec     = null;
		String[]            strs    = null;

		st  = new StringTokenizer(str,tokens);
		vec = new Vector(5,5);

	     while (st.hasMoreTokens()) {
         	vec.add(st.nextToken());
     	}
 		strs = new String[vec.size()];
 		vec.toArray(strs);
 		vec = null;
 		return strs;
	}
	public static String getUserIP()
    {
        InetAddress inet = null;
        String ip = null;
        try
        {
            inet = InetAddress.getLocalHost();
            ip = inet_ntoa(inet.getAddress());
        }
        catch(UnknownHostException uhex)
        {
            uhex.printStackTrace();
        }
        return ip;
    }
	public static String inet_ntoa(byte addr[])
    {
        return String.format("%d.%d.%d.%d", new Object[] {
            Integer.valueOf(unsignedByteToInt(addr[0])), Integer.valueOf(unsignedByteToInt(addr[1])), Integer.valueOf(unsignedByteToInt(addr[2])), Integer.valueOf(unsignedByteToInt(addr[3]))
        });
    }
	public static int unsignedByteToInt(byte b)
	{
	      return b & 0xff;
	 }
	public static String getTimeStamp()
	{
		Calendar cal = Calendar.getInstance();
		String time = null;
		//time = String.format("%1$tY-%1$tm-%1$tdT%1$tH:%1$tM:%1$tS%1$tZ", 
		time = String.format("%1$td-%1$tm-%1$tYT%1$tH:%1$tM:%1$tS%1$tZ", 
				new Object[] { cal });
		return time;
	}
	public static void main(String[] args){
		
		System.out.println(StringUtil.getTimeStamp());
	}
}
