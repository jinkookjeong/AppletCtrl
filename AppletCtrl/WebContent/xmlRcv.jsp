<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.lang.*"%>
<%@ page import="javax.swing.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.net.*" %>
<%@ page import="java.util.*" %>

<%
 System.out.println("jsp In");
InputStream inputStream = null;
FileOutputStream fout = null;
try{
	 fout = new FileOutputStream("c:/aaa.txt",true);
	 inputStream = request.getInputStream(); 
	 Enumeration headerEnum = request.getHeaderNames();
	 while(headerEnum.hasMoreElements()){				
		String name = (String)headerEnum.nextElement();				
		System.out.println((name+ ":" + request.getHeader(name)+"\r\n").getBytes());
	}
	fout.write("\r\n".getBytes()); //File End
	fout.flush();
	
	byte[] Buff = new byte[1024 * 8];	//8K
	int result = 0;			
	while((result = inputStream.read(Buff)) != -1) {
		fout.write(Buff,0,result);
	}
	fout.flush();
	
}catch(Exception ex){
	ex.printStackTrace();
}finally {
	try{ if (fout != null){ fout.close(); fout = null;}}catch(Exception j){ }
	try{ if (inputStream != null){ inputStream.close(); inputStream = null;}} catch(Exception j){ }
}

 out.println("<xml><code>aaaaaaaaaaa</code></xml>");
%>

