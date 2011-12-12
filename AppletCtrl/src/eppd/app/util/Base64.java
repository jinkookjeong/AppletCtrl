package eppd.app.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.StringTokenizer;
import java.util.zip.GZIPOutputStream;

 /**
  * @comment_sp Util para el proceso de Base64
  * @comment_ko Base64처리를 위한 util  
  * History(Historia): 1.0.0(03.08.2009-(Jin Kuk Jeong)) Version inicial
  */
public class Base64{

	/**
     * @comment_sp Generador para el proceso de Base64
	 * @comment_ko Base64처리를 위한 생성자  
 	 */
    public Base64(){}

    /**
     * @comment_sp Procesa con el valor ingresado
	 * @comment_ko 입력받은 값으로 인코딩 처리를 한다.  
     * @param s
     * @return
     */
    public static String encode(String s){
        return encode(s.getBytes(), true);
    }
    public static void main(String[] args) throws Exception{
    	Base64 enc = new Base64();
    	System.out.println(enc.encode("cjkwith"));
    	byte[] a = enc.decode(enc.encode("tomcat6"));
    	for(int i=0;i<a.length;i++){
    		System.out.print(a[i]);
    	}
    	System.out.println(enc.encode("tom!002"));
    }
    /**
     * @comment_sp Procesa con el valor ingresado
	 * @comment_ko 입력받은 값으로 인코딩 처리를 한다.  
     * @param s
     * @param flag
     * @return
     */
    public static String encode(String s, boolean flag){
        return encode(s.getBytes(), flag);
    }

    /**
     * @comment_sp Procesa con el valor ingresado
	 * @comment_ko 입력받은 값으로 인코딩 처리를 한다.  
     * @param abyte0
     * @return
     */
    public static String encode(byte abyte0[]){
        return encode(abyte0, true);
    }
    
    /**
     * @comment_sp Procesa con el valor ingresado
	 * @comment_ko 입력받은 값으로 인코딩 처리를 한다.  
     * @param abyte0
     * @param flag
     * @return
     */
    public static String encode(byte abyte0[], boolean flag){

        StringBuffer stringbuffer = new StringBuffer();
        if(flag){
            for(int i = 0; i < abyte0.length; i += 3){
                if(i % 48 == 0 && i != 0){
					stringbuffer.append("\n");
                }
				stringbuffer.append(encodedBlock(abyte0, i));
            }

        }else{
            for(int j = 0; j < abyte0.length; j += 3){
         		stringbuffer.append(encodedBlock(abyte0, j));
            }
        }

        return stringbuffer.toString();
    }


    /**
     * @comment_sp Procesa con el valor ingresado
	 * @comment_ko 입력받은 값으로 인코딩 처리를 한다.  
     * @param abyte0
     * @param i
     * @return
     */
    protected static char[] encodedBlock(byte abyte0[], int i){

        int j = 0;
        int k = abyte0.length - i - 1;
        int l = k < 2 ? k : 2;
        for(int i1 = 0; i1 <= l; i1++){

            byte byte0 = abyte0[i + i1];
            int j1 = byte0 >= 0 ? ((int) (byte0)) : byte0 + 256;
            j += j1 << 8 * (2 - i1);
        }

        char ac[] = new char[4];

        for(int k1 = 0; k1 < 4; k1++){
            int l1 = j >>> 6 * (3 - k1) & 0x3f;
            ac[k1] = getChar(l1);
        }

        if(k < 1){
            ac[2] = '=';
        }
        if(k < 2){
            ac[3] = '=';
        }

        return ac;
    }

    /**
     * @comment_sp Procesa con el valor ingresado
	 * @comment_ko 입력받은 값으로 인코딩 처리를 한다.  
     * @param i
     * @return
     */
    protected static char getChar(int i){

        if(i >= 0 && i <= 25){
            return (char)(65 + i);
        }
        if(i >= 26 && i <= 51){
            return (char)(97 + (i - 26));
        }
        if(i >= 52 && i <= 61){
            return (char)(48 + (i - 52));
        }
        if(i == 62){
            return '+';
        }
        return i != 63 ? '?' : '/';
    }

    /**
     * @comment_sp Descifra con el valor ingresado 
	 * @comment_ko 입력받은 값으로 디코딩 처리를 한다.  
     * @param s
     * @return
     * @throws InvalidBase64Exception
     */
    public static byte[] decode(String s) throws Exception{

        int i = 0;
        String s1 = delCRLF(reform(s));

        if(s1.length() % 4 != 0){
            throw new Exception("Data is not Base64 encoding type.(Data length error)");
        }

        if(!isBase64(s1.getBytes())){
            throw new Exception("Data is not Base64 encoding type.(String set error)");
        }

        for(int j = s1.length() - 1; s1.charAt(j) == '='; j--){
            i++;
        }
        int k = (s1.length() * 6) / 8 - i;
        byte abyte0[] = new byte[k];
        int l = 0;

        for(int i1 = 0; i1 < s1.length(); i1 += 4){
            int j1 = (getValue(s1.charAt(i1)) << 18) + (getValue(s1.charAt(i1 + 1)) << 12) + (getValue(s1.charAt(i1 + 2)) << 6) + getValue(s1.charAt(i1 + 3));
            for(int k1 = 0; k1 < 3 && l + k1 < abyte0.length; k1++){
                abyte0[l + k1] = (byte)(j1 >> 8 * (2 - k1) & 0xff);
            }
            l += 3;
        }

        return abyte0;
    }

    /**
     * @comment_sp Descifra con el valor ingresado 
	 * @comment_ko 입력받은 값으로 디코딩 처리를 한다.  
     * @param c
     * @return
     */
    protected static int getValue(char c){
        if(c >= 'A' && c <= 'Z'){
            return c - 65;
        }
        if(c >= 'a' && c <= 'z'){
            return (c - 97) + 26;
        }
        if(c >= '0' && c <= '9'){
            return (c - 48) + 52;
        }
        if(c == '+'){
            return 62;
        }
        if(c == '/'){
            return 63;
        }
        return c != '=' ? -1 : 0;
    }
    
    /**
     * @comment_sp Decide si es Base 64 con el valor ingresado 
	 * @comment_ko 입력받은 값으로 Base64인지 판단한다.  
     * @param abyte0
     * @return
     */
    public static boolean isBase64(byte abyte0[]){
        for(int i = 0; i < abyte0.length; i++){
            char c = (char)abyte0[i];
            if((c < 'A' || c > 'Z') && (c < 'a' || c > 'z') && (c < '0' || c > '9') && c != '+' && c != '/' && c != '='){
                return false;
            }
        }

        return true;
    }

    /**
     * @comment_sp Devuelve tokenizado con el valor ingresado 
	 * @comment_ko 입력받은 값으로 tokenizer하여 반환한다.
     * @param s
     * @return
     */
    protected static String reform(String s){
        StringBuffer stringbuffer = new StringBuffer();
        for(StringTokenizer stringtokenizer = new StringTokenizer(s); stringtokenizer.hasMoreTokens(); stringbuffer.append(stringtokenizer.nextToken())){}
        return stringbuffer.toString();
    }

    /**
     * @comment_sp Elimina CRLF al valor ingresado 
	 * @comment_ko 입력받은 값에 CRLF을 삭제한다.
     * @param s
     * @return
     */
    protected static String delCRLF(String s){

        StringBuffer stringbuffer = new StringBuffer();
        for(StringTokenizer stringtokenizer = new StringTokenizer(s, "\n\r"); stringtokenizer.hasMoreTokens(); stringbuffer.append(stringtokenizer.nextToken())){}
        return stringbuffer.toString();
    }
}
