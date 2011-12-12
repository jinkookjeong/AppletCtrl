package eppd.app.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import org.apache.commons.io.FileUtils;

public class IOUtil 
{
	
	 
	public String writeStringToFile(File file, String data, String encoding,String targetFile)
	  throws IOException
	 {
		  File file2 = new File(targetFile);
		  
		  OutputStream out = null;
		  out = openOutputStream(file2);
		  write(data, out, encoding); 
		  closeQuietly(out);
		  
		  return targetFile;
	 }
	 
	  private FileOutputStream openOutputStream(File file)
	  throws IOException
	  {
		  if(file.exists())
		  {
		      if(file.isDirectory())
		          throw new IOException("File '" + file + "' exists but is a directory");
		      if(!file.canWrite())
		          throw new IOException("File '" + file + "' cannot be written to");
		  } else
		  {
		      File parent = file.getParentFile();
		      if(parent != null && !parent.exists() && !parent.mkdirs())
		          throw new IOException("File '" + file + "' could not be created");
		  }
		  return new FileOutputStream(file);
	  }
	  
	  public void write(String data, OutputStream output, String encoding)
	  throws IOException
	  {
		  if(data != null)
			  if(encoding == null)
				  write(data, output);
	      else
	          output.write(data.getBytes(encoding)); 
	  }
	  
	  public static void write(String data, OutputStream output)
	  throws IOException
		{
		  if(data != null)
		      output.write(data.getBytes());
		}
	  
	  public static void closeQuietly(OutputStream output)
	  {
	      try
	      {
	          if(output != null)
	              output.close();
	      }
	      catch(IOException ioe) { }
	  }
	  public String ReadInfoXml(String fileName)
	  {   
	        String result = null;
	        File file = null;
	        try
	        {
	            file = new File(fileName);
	            result = FileUtils.readFileToString(file,"UTF-8");
	        } catch(Exception ex){
	        	ex.printStackTrace();
	        }
	        
	        return result != null ? result : "";
	  }
	  
	  public static String urldecode(String s) {
	        ByteArrayOutputStream out = new ByteArrayOutputStream(s.length());

	        for (int i = 0; i < s.length(); i++) {
	            int c = (int) s.charAt(i);
	            if ( c == '+'){
	            	out.write(' ');
	            }else if (c == '%') {
	                int c1 = Character.digit(s.charAt(++i), 16);
	                int c2 = Character.digit(s.charAt(++i), 16);
	                out.write((char) (c1 * 16 + c2));
	            }else{
	            	out.write(c);
	            }
	        }
	        return out.toString();
	   }
	  
	  public static String PS_Decode(String str) {
			
		    StringBuffer sb = new StringBuffer();
	        String returnStr = "";
		    try{
	            if (str.length() < 1) {
				    return returnStr;
		        }
	            byte tmp1,tmp2,tmp3,tmp4;
	            int bytelen = str.length()/4*3;
	            byte arraybyte[] = new byte[bytelen];
	            byte hanchar[] = new byte[2];
	            byte chr;
	            int j=0;

		        for (int i=0; i<str.length();i=i+4) {
			        tmp1 = BchngValue(str.charAt(i));
			        tmp2 = BchngValue(str.charAt(i+1));
			        if(str.charAt(i+2) == '=') {
				        tmp3=(byte)0x00;
	                } else {
				        tmp3 = BchngValue(str.charAt(i+2));
		            }
	    	        if (str.charAt(i+3) == '='){
				        tmp4 = (byte)0x00;
	                } else {
				        tmp4 = BchngValue(str.charAt(i+3));
		            }
	                chr = tmp1;
	                chr=(byte)(tmp1<<2);
	                tmp1=(byte)tmp2;
	                tmp1=(byte)(tmp1 & 0x30);
	                tmp1=(byte)(tmp1>>4);
	                chr=(byte)((byte)chr | (byte)tmp1);
	                arraybyte[j]=(byte)chr;

	                tmp2=(byte)(tmp2<<4);
	                tmp1=tmp3;
	                chr=(byte)((byte)(tmp3 & 0x3c) >> 2);
	                chr=(byte)((byte)tmp2 | (byte)chr);
	                arraybyte[j+1]=(byte)chr;

	                tmp1=(byte)((byte)(tmp1 & 0x03) << 6);
	                chr=(byte)((byte)tmp1 | (byte)tmp4);
	                arraybyte[j+2]=(byte)chr;
	                j=j+3;
		        }

		        for(int k=0;k<bytelen;k++) {

		            if (arraybyte[k] >=0x00 && arraybyte[k] <=0x7f) {
			            sb.append((char)arraybyte[k]);
		            } else if (arraybyte[k] >=(-128) && arraybyte[k] <=(-1)) {
			            hanchar[0] = arraybyte[k];
			            hanchar[1] = arraybyte[k+1];
		                try {
				            sb.append(new String(hanchar,"KSC5601"));
			            } catch (UnsupportedEncodingException e) {}
		                k++;
		            }
		        }

		        returnStr = new String(sb.toString());
		        return returnStr;
	        } catch(Exception e) {			    
			    return str;
	        }
	    }

	/**
	 * @param chr
	 * @return
	 */
	 private static byte BchngValue( char chr) {
	    byte temp;
	    temp=(byte)chr;
	    if (temp >= 'A' && temp <='Z'){
	    	temp=(byte)(temp-0x41);
	    }
	    else if (temp >='a' && temp <= 'z') {
	        temp=(byte)(temp-0x47);
	    } else if (temp >='0' && temp <= '9') {
	        temp= (byte)(temp+0x04);
	    } else if(temp == '+') {
	        temp=(byte)(temp+0x13);
	    } else if(temp == '-') {
	        temp=(byte)(temp+0x12);
	    }
	    return temp;
	}
}
