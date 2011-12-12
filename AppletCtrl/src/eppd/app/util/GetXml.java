package eppd.app.util;

import java.net.*;
import java.io.*;
import javax.activation.FileDataSource;
import oracle.xml.parser.v2.DOMParser;

import com.mn.util.*;

/**
 * @comment_sp Procesa Passing y Carga de XML información a través de Templet
 * @comment_ko 템플릿을 통하여 XML정보 로딩 및 파싱처리
 * History(Historia): 1.0.0(03.08.2009-(Jin Kuk Jeong)) Version inicial
 */
public class GetXml {

	private String sUrl = "";	
	public StringBuffer err;
	oracle.xml.parser.v2.XMLDocument xmlDocument= null;
	
	/**
	 * @comment_sp Generador
	 * @comment_ko 생성자
	 */
	public GetXml(){
	}
	
	/**
	 * @comment_sp Generador
	 * @comment_ko 생성자
	 * @param url Url셋팅
	 * @throws MalformedURLException
	 */
	public GetXml(String url) throws MalformedURLException {
		this.sUrl = StringUtil.retSpace(url);
		this.err = new StringBuffer(1024);
	}

	
	/**
	 * @comment_sp error return
	 * @comment_ko 에러 반환
	 * @return
	 */
	public String getError(){		
		return err.toString();
	}
	
	public String getXmlDocument(String fileFullPath){
		
		InputStream in              = null;
		FileDataSource fds          = null;
		try{
	 		if(fileFullPath.indexOf("..")> -1 )
	 		{
	 			return "false";
	 		}
		    fds = new FileDataSource(fileFullPath);
		    in= ((InputStream)fds.getInputStream()) ;
		    
		    return this.getResponse(in);
		    
	   }catch(Exception ex){
		   return "false";
	   }finally{
			try{
				try{in.close();}catch(Exception  ex){}     
	        }catch (Exception ex){}
	    }
	}
	
	/**
	 * @comment_sp Método para leer XML documento correspondiente a Path de URL dado
	 * @comment_ko 주어진 URL으로 부터, path에 해당하는 XML 문서를 읽어오는 Method
	 * @param path
	 * @return
	 */
	public String getXmlTemplate(String fileName){
		
		InputStream in              = null;
		FileDataSource fds          = null;
		try{
	 		if(fileName.indexOf("..")> -1 || this.sUrl.equals(""))
	 		{
	 			return "false";
	 		}
		    fds = new FileDataSource(this.sUrl+fileName);
		    in= ((InputStream)fds.getInputStream()) ;
		    
		    return this.getResponse(in);
		    
	   }catch(Exception ex){
		   return "false";
	   }finally{
			try{
				try{in.close();}catch(Exception  ex){}     
	        }catch (Exception ex){}
	    }
	}
	
	/**
	 * @comment_sp Método para leer XML documento correspondiente a Path de URL dado
	 * @comment_ko 주어진 URL으로 부터, path에 해당하는 XML 문서를 읽어오는 Method
	 * @param path
	 * @return
	 */
	public String getUrlXmlTemplate(String path){
		
		URL Url = null ;
		HttpURLConnection u = null ;
		InputStream in = null ;
		try {
			Url = new URL(sUrl+path) ;		
			u = (HttpURLConnection) Url.openConnection();			
			u.setDoInput(true);
			in = u.getInputStream();
			return this.getResponse(in);
		}catch(IOException e){
			e.printStackTrace();
			err.append("IOException is occured! (" + e.getMessage() + ")");
			return "false";
		}finally{
			try{in.close();}catch(Exception  ex){}
			try{u.disconnect();}catch(Exception  ex){}
		}
	}

	/**
	 * @comment_sp Trae xml información de unikey
	 * @comment_ko unikey로 부터 xml정보를 읽어온다.
	 * @param Unikey
	 * @return
	 */
	public String getXmlFrom(String Unikey)
	{
		URL Url = null ;
		HttpURLConnection u = null ;
		InputStream in = null ;
		String path = "/"+Unikey.substring(1,5)+"/"+Unikey.substring(5,7)+"/"+Unikey.substring(7,9)+"/"+Unikey ;
		
		sUrl += path ;

		try {
			Url = new URL(sUrl) ;
			u = (HttpURLConnection) Url.openConnection();
			u.setDoInput(true);

			in = u.getInputStream();
 
			return this.getResponse(in);
		}catch(IOException e)
		{
			e.printStackTrace();
			err.append("IOException is occured! (" + e.getMessage() + ")");
			return "false";
		}finally{
			try{in.close();}catch(Exception  ex){}
			try{u.disconnect();}catch(Exception  ex){}
		}
	}

	/**
	 * @comment_sp Trae xml información de unikey
	 * @comment_ko unikey로 부터 xml정보를 읽어온다.
	 * @param Unikey
	 * @return
	 */
	public String getXml(String Unikey)
	{
		URL Url = null ;
		HttpURLConnection u = null ;
		InputStream in = null ;

		sUrl += "?unikey="+Unikey+"&index=0" ;

		try {
			Url = new URL(sUrl) ;
			u = (HttpURLConnection) Url.openConnection();
			u.setDoInput(true);

			in = u.getInputStream();

			return this.getResponse(in);
		}catch(IOException e)
		{
			e.printStackTrace();
			err.append("IOException is occured! (" + e.getMessage() + ")");
			return "false";
		}finally{
			try{in.close();}catch(Exception  ex){}
			try{u.disconnect();}catch(Exception  ex){}
		}
	}
	
    /**
	 * @comment_sp Convierte XMLDocumento a String
	 * @comment_ko Convert XMLDocument to String
     * @param: XMLDocument
     * @return: String
     */
    public String toString(oracle.xml.parser.v2.XMLDocument XMLDOC) 
        throws IllegalArgumentException, IOException{
		synchronized(java.lang.Object.class)
		{
	        ByteArrayOutputStream baos  = null;
	        PrintWriter pw              = null;
	        try{
	            baos= new ByteArrayOutputStream();
	            pw= new PrintWriter((OutputStream)baos);
	        
	            XMLDOC.print(pw);
	        }catch(IOException ex){
	            ex.printStackTrace();
	            throw new IOException("toString Exception");
	        }finally{
	            try{
	                if(baos!= null){ baos.close();}
	                if(pw!= null){ pw.close();}
	            }catch(IOException ioe){}
	        }
	        return baos.toString();
		}
    }

    /**
	 * @comment_sp Registra xmlpaht en memoria leyendo xml
	 * @comment_ko xmlpaht로 xml을 읽어 메모리에 등록한다.
     * @param xmlPath
     * @throws Exception
     */
    public void setXMLDOMLoading(String xmlPath) throws Exception{
        synchronized(xmlPath){
            DOMParser parser  = null;
            StringReader XSource = null;
            String xmlFPath= xmlPath.trim();

            try{
                parser= new DOMParser();
                String tmpXmlString = FileUtil.readFromFile(xmlFPath);
                XSource= new StringReader(tmpXmlString);        
                parser.parse((Reader)XSource);
                this.xmlDocument = parser.getDocument();

            }catch(Exception ex){
                ex.printStackTrace();
            }finally{
                if(XSource!= null){ XSource.close();}
            }
        }
    }

    /**
	 * @comment_sp Registra xmlpaht en memoria leyendo xml
	 * @comment_ko xmlpaht로 xml을 읽어 메모리에 등록한다.
     * @param xmlString
     * @throws Exception
     */
    public void setStrDOMLoading(String xmlString) throws Exception{
        synchronized(xmlString){
            DOMParser parser  = null;
            StringReader XSource = null;

            try{
                parser= new DOMParser();
                XSource= new StringReader(xmlString);        
                parser.parse((Reader)XSource);
                this.xmlDocument = parser.getDocument();

            }catch(Exception ex){
                ex.printStackTrace();
            }finally{
                if(XSource!= null){ XSource.close();}
            }
        }
    }

    /**
	 * @comment_sp Devuelve información de xml documento
	 * @comment_ko xml document정보를 반환한다.
     * @return
     */
    public oracle.xml.parser.v2.XMLDocument getXMLDocument(){
        synchronized(xmlDocument){
            return this.xmlDocument;
        }
    }
    
    /** 
	 * @comment_sp Guarda XML Dom to File
	 * @comment_ko Save XML Dom to File
     * @param: XML Dom
     * @param: saved file path 
     * @return: true / false
     */
    public boolean saveDOMFile(oracle.xml.parser.v2.XMLDocument XMLDOC, 
        String filepath) throws IllegalArgumentException, IOException{
		synchronized(java.lang.Object.class)
		{
	        FileOutputStream outfile= null;
	        try{
	            outfile = new FileOutputStream(filepath);
	            outfile.write(this.toString(XMLDOC).getBytes());
	        }catch(IOException ioe){
	            ioe.printStackTrace();
	            throw new IOException("saveDOMFile Exception");
	        }finally{
	            try{ if (outfile != null){ outfile.close();} }catch(IOException ioe){}
	        }
	
	        return true;
		}
    }

    /**
	 * @comment_sp Devuelve xml información en inputstream
	 * @comment_ko inputstream에서 xml정보를 반환한다.
     * @param in
     * @return
     * @throws IOException
     */
    private String getResponse(InputStream in) throws IOException
	{
		StringBuffer buff = new StringBuffer(1024 * 4);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in));
		String line = "";

		while((line = reader.readLine()) != null)
		{
			buff.append(line+"\n");
		}

		if (reader != null){ reader.close();}
		err = buff;
		return buff.toString();
	}
}
