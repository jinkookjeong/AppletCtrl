package eppd.app.util;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.StringTokenizer;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.sun.org.apache.xml.internal.serialize.OutputFormat;
import com.sun.org.apache.xml.internal.serialize.XMLSerializer;

import oracle.xml.parser.v2.NSResolver;
import oracle.xml.parser.v2.XMLDocument;
import oracle.xml.parser.v2.XMLElement;



/**
 * @comment_sp Común utility relacionado a XML
 * @comment_ko XML에 관련한 공통 utility
 * History(Historia): 1.0.0(03.08.2009-(Jin Kuk Jeong)) Version inicial
 */
public class XMLUtil {
	
	/**
	 * @comment_sp Devuelve String depués de agregar xml Header con XML de Template
	 * @comment_ko XML을 Template로 부터 가져와 xml Header를 추가하여 String을 반환한다.
	 * @param xmlPath Xml String 값, Xml en Valor de cadena
	 * @return
	 */
	public String loadXML(String xmlPath) {		
      
		String xmlString = "";
		String toXML	 = "";
		
		try {
			GetXml getXml	= new GetXml();
			xmlString = getXml.getXmlTemplate(xmlPath);
			
			String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" ;
            String PI		 = xmlString.substring(xmlString.indexOf("<?xml-stylesheet")) ;
		    toXML = xmlHeader+"\n"+PI;
		} catch (Exception e) {                        
        }
		return toXML;
	}
	
	/**
	 * @comment_sp Trae nodo valor a XML
	 * @comment_ko XML에 node value를 가져온다.
	 * @param doc
	 * @param node
	 * @return
	 * @throws Exception
	 */
	public static String GetValues(XMLDocument doc,  String node) throws Exception{  
		return GetValues(doc, node, 0) ;  
	}  
	 
	/**
	 * @comment_sp Trae nodo valor a XML
	 * @comment_ko XML에 node value를 가져온다.
	 * @param doc
	 * @param node
	 * @param index
	 * @return
	 * @throws Exception
	 */
	public static String GetValues(XMLDocument doc,  String node, int index) throws Exception{  
		if(node.indexOf("@") == -1){  
			return getNodeValue(doc, node, index) ;  
		}else  {
			return getAttrValue(doc,   
								node.substring(0,node.indexOf("@")),   
								node.substring(node.indexOf("@")+1,node.length()),  
								index) ;
		}
	}  
    /**
	 * @comment_sp Trae valor a XML documento 
	 * @comment_ko XML문서에서 값을 가져옴
     *  Element element = (Element) objNL.item(0);
	 *			NodeList objNLChild = element.getElementsByTagName("USER_INFO");
	 *			NamedNodeMap objNNM = objNLChild.item(0).getAttributes();
     * @param doc
     * @param node
     */
	public static void GetValues(XMLDocument doc, String[] node )
    {
        try
        {
            XMLElement xemt = null;
            xemt = (XMLElement) doc.getDocumentElement();
            NodeList tmpNodeList = doc.selectNodes(node[1], xemt);
            node[0] = tmpNodeList.item(0).getFirstChild().getNodeValue();   
        }
        catch (NullPointerException ne)
        {	
            return;
        }
        catch (Exception e){}
    }

	/**
	 * @comment_sp Trae el valor correspondiente a idx de XML documento 
	 * @comment_ko XML문서에서 idx에 해당하는 값을 가져옴
     *  Element element = (Element) objNL.item(idx);
	 *			NodeList objNLChild = element.getElementsByTagName("USER_INFO");
	 *			NamedNodeMap objNNM = objNLChild.item(0).getAttributes();
	 * @param doc
	 * @param node
	 * @param idx
	 */
	public static void GetValues(XMLDocument doc, String[] node, int idx)
    {
        try
        {
            XMLElement xemt = null;
            xemt = (XMLElement) doc.getDocumentElement();
            NodeList tmpNodeList = doc.selectNodes(node[1].trim(), xemt);
            node[0] = tmpNodeList.item(idx).getFirstChild().getNodeValue();
        }
        catch (NullPointerException ne)
        {
        
            return;
        }
        catch (Exception e){}
    }

	/**
	 * @comment_sp Regresa el valor al primer nodo
	 * @comment_ko 첫번째 노드에 값을 리턴한다.
	 * @param doc
	 * @param node
	 * @param ns
	 * @return
	 * @throws Exception
	 */
	public static String GetFirstNodeValue(XMLDocument doc, String node, NSResolver ns ) throws Exception{  
        try{
		    return doc.valueOf(node,ns);
        }catch (NullPointerException ne){
        	
            return "";
        }            		    
	}
	
	/**
	 * @comment_sp Regresa el valor al nodo 
	 * @comment_ko 노드에 값을 리턴한다.
	 * @param doc
	 * @param node
	 * @param index
	 * @return
	 * @throws Exception
	 */
	public static String getNodeValue(XMLDocument doc, String node, int index) throws Exception{  
		try{  
			return doc.selectNodes(node,  
                (XMLElement) doc.getDocumentElement()).item(index).getFirstChild().getNodeValue() ;  
		}  
		catch (NullPointerException ne)  
		{  
			return "" ;  
		}  
	}  
	  
	/**
	 * @comment_sp Regresa el valor al nodo 
	 * @comment_ko 노드에 값을 리턴한다.
	 * @param doc
	 * @param node
	 * @param index
	 * @param ns
	 * @return
	 * @throws Exception
	 */
	public static String getNodeValue(XMLDocument doc,   
        String node, int index, NSResolver ns) throws Exception{  
		try{  
			return doc.selectNodes(node, ns).item(index).getFirstChild().getNodeValue() ;  
		}  
		catch (NullPointerException ne)  
		{  
		        	
			return "" ;  
		}  
	}  

	/**
	 * @comment_sp Regresa el valor de atributo 
	 * @comment_ko 속성 값을 리턴한다.
	 * @param doc
	 * @param node
	 * @param attr
	 * @param index
	 * @return
	 * @throws Exception
	 */
	public static String getAttrValue(XMLDocument doc, String node,   
        String attr, int index) throws Exception{  
		try{  
			return ((Element)doc.selectNodes(node,  
                (XMLElement) doc.getDocumentElement()).item(index)).getAttribute(attr) ;  
		}  
		catch (NullPointerException ne)  
		{  
			
			return "" ;  
		}  
	}  

	/**
	 * @comment_sp Regresa el valor de atributo 
	 * @comment_ko 속성 값을 리턴한다.
	 * @param doc
	 * @param node
	 * @param attr
	 * @param index
	 * @param ns
	 * @return
	 * @throws Exception
	 */
	public static String getAttrValue(XMLDocument doc, String node,   
        String attr, int index, NSResolver ns) throws Exception{  
		try{  
			return ((Element)doc.selectNodes(node,ns).item(index)).getAttribute(attr) ;  
		}  
		catch (NullPointerException ne)  
		{  
			
			return "" ;  
		}  
	}  		

	/**
	 * @comment_sp Agrega el valor de nodo
	 * @comment_ko 노드 값을 추가한다.
	 * @param doc
	 * @param node
	 * @param nodeValue
	 */
    public static void PutValues(oracle.xml.parser.v2.XMLDocument doc, String node , String nodeValue) {
        try
        {
            XMLElement xemt = null;
            xemt = (XMLElement) doc.getDocumentElement();
            NodeList tmpNodeList = doc.selectNodes(node.trim(), xemt);
            tmpNodeList.item(0).appendChild(doc.createTextNode(nodeValue==null?"":nodeValue).cloneNode(true));
        }	
        catch (NullPointerException ne) {
        	return; 
        }
        catch (Exception e)
        {
        }
    }	

    /**
	 * @comment_sp Agrega el valor de nodo
	 * @comment_ko 노드 값을 추가한다.
     * @param doc
     * @param node
     * @param value
     * @param index
     * @throws Exception
     */
	public static void PutValues(XMLDocument doc, String node, String value, int index) throws Exception{  
			if(node.indexOf("/@") == -1)  {
				putNodeValue(doc, node, (value==null?"":value), index) ;  
			} else  {
				putAttrValue(doc,   
							node.substring(0,node.indexOf("/@")),   
							node.substring(node.indexOf("/@")+2,node.length()),  
							(value==null?"":value),  
							index) ;
			}
		} 

	/**
	 * @comment_sp Agrega el valor de nodo
	 * @comment_ko 노드 값을 추가한다.
	 * @param doc
	 * @param node
	 * @param index
	 */
    public static void PutValues(XMLDocument doc, String[] node, int index )
    {
        try
        {
            XMLElement xemt = null;
            xemt = (XMLElement) doc.getDocumentElement();
            NodeList tmpNodeList = doc.selectNodes(node[1].trim(), xemt);
            tmpNodeList.item(index).appendChild(doc.createTextNode(node[0]).cloneNode(true));
        }
        catch (NullPointerException ne)
        {
            return;
        }
        catch (Exception e)
        {
        }
    }

    /**
	 * @comment_sp Agrega el valor de nodo
	 * @comment_ko 노드 값을 추가한다.
     * @param doc
     * @param node
     */
    public static void PutValues(XMLDocument doc, String[] node)
    {
        try
        {
            XMLElement xemt = null;
            xemt = (XMLElement) doc.getDocumentElement();
            NodeList tmpNodeList = doc.selectNodes(node[1].trim(), xemt);            
            tmpNodeList.item(0).appendChild(doc.createTextNode(node[0]==null?"":node[0]).cloneNode(true));            
        }
        catch (NullPointerException ne)
        {
        	return;
        }
        catch (Exception e)
        {	        	
        }
    }

    /**
	 * @comment_sp Agrega el valor de nodo
	 * @comment_ko 노드 값을 추가한다.
     * @param doc
     * @param node
     * @param value
     * @param index
     * @throws Exception
     */
    public static void putNodeValue(XMLDocument doc, String node, String value, int index ) throws Exception{  
		if(getNodeValue(doc, node, index).equals("") ||  
            getNodeValue(doc, node, index) == null ||   
            getNodeValue(doc, node, index).length()== 0)  
		{  
			XMLElement xemt = null;  
			xemt = (XMLElement) doc.getDocumentElement();  
			NodeList tmpNodeList = doc.selectNodes(node, xemt);  
			tmpNodeList.item(index).appendChild(doc.createTextNode(value).cloneNode(true));  
		}  
		else  
		{  
			UpdateNodeValue(doc, node, value, index) ;  
		}  
    }  

    /**
	 * @comment_sp Cambia el valor de nodo 
	 * @comment_ko 노드 값을 변경한다.
     * @param doc
     * @param node
     */
	public void replacePutValues(oracle.xml.parser.v2.XMLDocument doc, String[] node)
	{
		try{
			XMLElement xemt = null ;
			xemt = (XMLElement)doc.getDocumentElement();
			NodeList eltNodeList = doc.selectNodes(node[1].trim(), xemt);
			NodeList tmpNodeList = eltNodeList.item(0).getChildNodes();
			eltNodeList.item(0).replaceChild(doc.createTextNode(node[0]),tmpNodeList.item(0));

		} catch(Exception ne) {	
						
		}
	}

	/**
	 * @comment_sp Cambia el valor de nodo 
	 * @comment_ko 노드 값을 변경한다.
	 * @param doc
	 * @param node
	 * @param index
	 */
	public void replacePutValues(oracle.xml.parser.v2.XMLDocument doc, String[] node, int index) {
        try {     
        	XMLElement xemt = null ;
            xemt = (XMLElement)doc.getDocumentElement();			
            NodeList eltNodeList = doc.selectNodes(node[1].trim(), xemt);
            NodeList tmpNodeList = eltNodeList.item(index).getChildNodes();
            eltNodeList.item(index).replaceChild(doc.createTextNode(node[0]),tmpNodeList.item(index));
     		
        }
        catch(NullPointerException ne) { 
        	        	
        	return ; 
        }
        catch(Exception e) {
        	        
        } 
    }

	/**
	 * @comment_sp Cambia el valor de nodo 
	 * @comment_ko 노드 값을 변경한다.
	 * @param doc
	 * @param node
	 * @param value
	 * @param index
	 * @throws Exception
	 */
	public static void UpdateNodeValue(XMLDocument doc, String node, String value, int index ) throws Exception{  
		XMLElement xemt = null ;  
		xemt = (XMLElement)doc.getDocumentElement();  
		NodeList eltNodeList = doc.selectNodes(node.trim(), xemt);  
		  
		NodeList tmpNodeList = eltNodeList.item(index).getChildNodes();  
		eltNodeList.item(index).replaceChild(doc.createTextNode(value),tmpNodeList.item(0));  
	}  
	
	/**
	 * @comment_sp Copia nodo
	 * @comment_ko 노드를 복사한다.
	 * @param doc
	 * @param NodeName
	 * @throws Exception
	 */
    public static void copySelf(XMLDocument doc, String NodeName) throws Exception  
	{  
		XMLElement xemt = (XMLElement) doc.getDocumentElement(); 
		Node pNode = doc.selectNodes(NodeName, xemt).item(1);  
		xemt.insertBefore(pNode, xemt.getChildNodes().item(1));  
	}
    
    /**
	 * @comment_sp Describe hasta la ruta previa a looping item 
	 * @comment_ko looping item 전 경로까지 기술
     * @param doc
     * @param NodeName
     * @throws Exception
     */
    public static void doCopy(XMLDocument doc, String NodeName) throws Exception
    {
        XMLElement xemt = (XMLElement) doc.getDocumentElement();
        Node pNode = doc.selectNodes(NodeName, xemt).item(0)  ;

        // rooping 템플릿의 마지막 템플릿을 복사하여 밑에붙임
        // copiando la última plantilla en la plantilla rooping conceden en virtud de
        Element newNode = (Element) pNode.getLastChild().cloneNode(true);

        doc.selectSingleNode(NodeName, xemt).appendChild(newNode);
    }

    /**
	 * @comment_sp Copia el nodo correspondiente al nombre 
	 * @comment_ko node명에 해당하는 node를 복사한다.
     * @param doc
     * @param NodeName
     * @throws Exception
     */
    public static void doCopySelf(XMLDocument doc, String NodeName) throws Exception  
	{  
		XMLElement xemt = (XMLElement) doc.getDocumentElement();
		Node pNode = doc.selectNodes(NodeName, xemt).  
        item(doc.selectNodes(NodeName, xemt).getLength()-1);  
		Element newNode = (Element) pNode.cloneNode(true);   
  
        doc.selectSingleNode(NodeName, xemt).getParentNode().appendChild(newNode);  
	}

    /**
	 * @comment_sp Copia nodo
	 * @comment_ko 노드를 복사한다.
     * @param doc
     * @param NodeName
     * @throws Exception
     */
    public static void copyNode(XMLDocument doc, String NodeName)
    	throws Exception
	{
	    XMLElement xemt = (XMLElement)doc.getDocumentElement();
	    Node pNode = doc.selectNodes(NodeName, xemt).item(0);
	    Element newNode = (Element)pNode.cloneNode(true);
	    doc.selectSingleNode(NodeName, xemt).getParentNode().appendChild(newNode);
	}

    /**
	 * @comment_sp Copia nodo
	 * @comment_ko 노드를 복사한다.
     * @param doc
     * @param NodeName
     * @throws Exception
     */
	public static void copyNode2(XMLDocument doc, String NodeName)
	    throws Exception
	{
	    XMLElement xemt = (XMLElement)doc.getDocumentElement();
	    Node pNode = doc.selectNodes(NodeName, xemt).item(0);
	    Element newNode = (Element)pNode.getChildNodes().item(0).cloneNode(true);
	    doc.selectSingleNode(NodeName, xemt).appendChild(newNode);
	}

	/**
	 * @comment_sp Agrega el valor de atributo 
	 * @comment_ko 속성값을 추가한다.
	 * @param doc
	 * @param node
	 * @param attrName
	 * @param attrValue
	 * @param index
	 * @throws Exception
	 */
	public static void putAttrValue(XMLDocument doc, String node, String attrName, String attrValue, int index) throws Exception  
	{  
		XMLElement xemt = null;  
		xemt = (XMLElement) doc.getDocumentElement();  
  
		NodeList tmpNodeList = doc.selectNodes(node, xemt);  
		((Element)tmpNodeList.item(index)).setAttribute(attrName, attrValue);  
	}  

	 /**
	  * @comment_sp Ordena con el nombre de Tag al procesar ID de destinatario
	  * @comment_ko 수신자 아이디 동보처리시 같은 태그이름으로 나란히 정렬  
	  * Peaje-como etiquetas de identificación con el nombre durante el proceso de difusión lado a lado
	  * ex) Header: /gb:Rerave/Header.Details  
	  *     Node: /gb:Rerave/Header.Details/cc:Message.Receiver.Identifier  
	  *     receiverID: C1353701000005  
	  * @param doc
	  * @param Header
	  * @param Node
	  * @param receiverID
	  * @throws Exception
	  */
	public void putReceiverID(oracle.xml.parser.v2.XMLDocument doc,   
        String Header, String Node, String receiverID) throws Exception  
	{  
		XMLElement xemt = (XMLElement) doc.getDocumentElement();  
		Node header     = doc.selectSingleNode(Header, xemt);  
		Node receiver   = doc.selectSingleNode(Node, xemt);  
		Node receiver2  = receiver.cloneNode(true);  
		receiver2.getFirstChild().getFirstChild().setNodeValue(receiverID);  
  
		header.insertBefore(receiver2, receiver.getNextSibling());  
	} 
    /**  
	 * @comment_sp appendXMLnodo: Agrega tag que repite (nodoName Tag)
	 * @comment_ko appendXMLNode: 반복 태그 추가(NodeName Tag)  
     * @param: XMLDocument  
     * @param: beNodeName=> 기준노드  Por nodo
     * @param: addNodeName=> 반복 노드  Repita el nodo
     * @param: loopNum => 반복 수  Repita mié
     */  
    public static void appendXMLNode(XMLDocument XMLDOC, String beNodeName,   
        String addNodeName, int loopNum) throws Exception{  
		synchronized(java.lang.Object.class)
		{
	        oracle.xml.parser.v2.XMLElement xmlemt=   
	            (XMLElement)XMLDOC.getDocumentElement();   
	        Node doclist   = null;  
	        Node ageNode   = null;  
	  
	        doclist = XMLDOC.selectNodes(beNodeName, xmlemt).item(0);  
	        ageNode = XMLDOC.selectNodes(addNodeName,   
	            xmlemt).item(loopNum).cloneNode(true);  
	        doclist.insertBefore(ageNode, doclist.getFirstChild());  
		}
    }  
    
    /**
	 * @comment_sp Cuando agrega tag via appendXMLnodo debe eliminar el último tag repetitivo 
	 * @comment_ko appendXMLNode를 통해 추가를 했을때 마지막 태그는 동일하여 삭제함  
     * @param XMLDOC
     * @param NodeName
     * @throws Exception
     */
    public static void removeLastChild(XMLDocument XMLDOC, String NodeName) throws Exception{
		synchronized(java.lang.Object.class)
		{
	        Node doclist   = null;   
	        oracle.xml.parser.v2.XMLElement xmlemt=   
	            (XMLElement)XMLDOC.getDocumentElement();   
	  
	        doclist = XMLDOC.selectNodes(NodeName, xmlemt).item(0);  
	        doclist.removeChild(doclist.getLastChild());  
		}
    }  
  
    /**
  	 * @comment_sp Configurar el texto en xml nodo
	 * @comment_ko xml node에 텍스트를 셋팅한다.  
	 * @param doc
     * @param node
     * @param name
     * @param value
     */
   public void SetText(XMLDocument doc, Node node, String name, String value ) {  
		Node		sibling	=	null;  
		  
		sibling=(Node)doc.createElement(name);  
		node.appendChild(sibling);  
		sibling.appendChild(doc.createTextNode(value).cloneNode(true));  
	}  

    /**
  	 * @comment_sp Configurar el valor en xml nodo
	 * @comment_ko xml node에 value를 셋팅한다.  
     * @param doc
     * @param node
     * @param childNode
     * @param name
     * @param value
     */
	public void insertValue(XMLDocument doc, Node node, Node childNode,   
        String name, String value ) {  
        Node		sibling	=	null;  
		  
		sibling=(Node)doc.createElement(name);  
		node.insertBefore(sibling, childNode);  
		sibling.appendChild(doc.createTextNode(value).cloneNode(true));  
	}  

	/**
  	 * @comment_sp Realiza búsqueda en xml nodo
	 * @comment_ko xml node를 검색한다.  
	 * @param node
	 * @param name
	 * @return
	 */
	public Node findNode(Node node,String name){  
		if(node.getNodeName().equals(name)){return node; } 
  
		if(node.hasChildNodes()) {  
			NodeList List=node.getChildNodes();  
			int size=List.getLength();  
  
			for(int i=0;i<size;i++)  
			{  
				Node found=findNode(List.item(i),name);  
				if(found!=null){return found; } 
			}  
		}  
		return null;           
	}
	
	/**
  	 * @comment_sp Reemplaza xml nodo
	 * @comment_ko xml node를 replace한다.  
	 * @param doc
	 * @param node
	 * @param alone
	 * @param value
	 */
    public void ReplaceValues(XMLDocument doc, String node, String alone, String value ){  
		String[] 	nodepath 	= 	new String[10];  
		String		ename		= 	null;  
		NodeList	nltemp 		=	null;  
		XMLElement 	etemp 		=	null;  
		Node		ntemp		=	null;
		  
		etemp  = (XMLElement)doc.getDocumentElement();   
		int ii = getNodePiece(node, nodepath);  
  
		for(int kk = 1; kk < ii; kk++) {  
			ename 	= nodepath[kk].trim();  
         // Modified to resolve Namespace   
         if(ename.startsWith(":")){  
            int tmp= ename.indexOf(":");  
            ename= ename.substring(tmp+1);  
         }  
         // end 
			nltemp 	= etemp.getElementsByTagName(ename);  
		}  
		ntemp 	= nltemp.item(0);  
		Node parent = ntemp.getParentNode();  
		parent.removeChild(ntemp);  
  
		SetText(doc, parent, alone, value);  
	}  

    /**
 	 * @comment_sp Reemplaza xml nodo
	 * @comment_ko xml node를 replace한다.  
     * @param nodepath
     * @param snodes
     * @return
     */
    public int getNodePiece(String nodepath, String snodes[] ){  
		char fs = '/';  
		char   cnodes[][] = new char[10][100];  
  
		int jj = 0;  
		int kk = 0;  
		for(int ii = 0; ii < nodepath.length();ii++) {  
			if(nodepath.charAt(ii) == fs) {  
				snodes[jj] = new String(cnodes[jj]);  
				jj++; kk=0;  
				if(ii < nodepath.length() - 1  ){ii++;  }
			}  
			cnodes[jj][kk++] = nodepath.charAt(ii);  
		}  
		snodes[jj] = new String(cnodes[jj]);  
		return jj+1;  
	}  
  
    /**
  	 * @comment_sp Busca con XML Parsing,  nodo adjunto 
	 * @comment_ko Soap Parsing 전체 노드를 가지고 와서 찾게 된다.  
     * @param doc
     * @param node
     * @param att
     * @return
     */
	public String getSoapValue(XMLDocument doc, String node, int att){  
		try{  
			XMLElement xemt = null;  
			xemt = (XMLElement) doc.getDocumentElement();  
  
			NodeList tmpNodeList = doc.selectNodes(node, xemt);  
			String value  = tmpNodeList.item(att).getFirstChild().getNodeValue();  
			if (value== null) { 
				return "";  
			}
			return value;  
		}catch(Exception e){  
		
			return "";  
		}  
	}     
 
	/**
  	 * @comment_sp Busca con XML Parsing,  nodo adjunto 
	 * @comment_ko XML Parsing,  첨부 노드를 가지고 와서 찾게 된다.  
	 * @param doc
	 * @param node
	 * @param att
	 * @return
	 */
	public String getAttacheValue(XMLDocument doc, String node, int att){  
		try{  
			NodeList tmpNodeList = doc.getElementsByTagName(node);  
			String value    
                = tmpNodeList.item(att).getFirstChild().getFirstChild().getNodeValue();  
			if (value== null) { 
				return "";  
			}
			return value;  
		}catch(Exception e){
			
			return "";  
		}  
	}     

	/**
  	 * @comment_sp Trae el número de nodo
	 * @comment_ko node 개수를 얻어온다.  
	 * @param doc
	 * @param node
	 * @param ns
	 * @return
	 */
	public int getNodeLength(XMLDocument doc, String node,  NSResolver ns){  
		try{  
            return doc.selectNodes(node,ns).getLength();  
		}catch(Exception e){  
		
			return 0;  
		}  
	}  
	
	  
	/**
  	 * @comment_sp Trae el número de documento adjunto. Usa Element 
	 * @comment_ko 첨부문서의 개수를 얻어온다. Element 를 이용  
	 * @param doc
	 * @param node
	 * @return
	 */
	public int getAttacheNo(XMLDocument doc, String node){  
		try{
  
            NodeList tmpNodeList = doc.getElementsByTagName(node);  
            return tmpNodeList.getLength();  
  
		}catch(Exception e){ 
			
			return 0;  
		}  
	}  
  
    /**
  	 * @comment_sp Trae el número de documento adjunto. Usa Full Path 
	 * @comment_ko 첨부문서의 개수를 얻어온다. Full Path 를 이용  
     * @param doc
     * @param node
     * @return
     */ 
	public int getFullAttacheNo(XMLDocument doc, String node){  
		try{  
			XMLElement xemt = null;  
			xemt = (XMLElement) doc.getDocumentElement();  
  
		    NodeList tmpNodeList = doc.selectNodes(node, xemt);  
            return tmpNodeList.getLength();  
  
		}catch(Exception e){  
		
			return 0;  
		}  
	}  
    /**  
  	 * @comment_sp Obtiene el valor de texto nodo 
	 * @comment_ko get the Text Value of Node  
     * @param: The Node of Seekable Text value  
     * return String value  
     */  
    public String getNodeValue(Node textNode) {  
        NodeList tempNL     = null;  
        String textValue    = "";  
        int nodeType        = 0;  
        try{
            while(true){  
                nodeType= textNode.getNodeType();  
                if(nodeType== Node.TEXT_NODE){  
                    textValue= textNode.getNodeValue();  
                    break;  
                }  
                tempNL= textNode.getChildNodes();  
                int tempNLlength= tempNL.getLength();  
  
                if(tempNLlength!= 0) { 
                    textNode= tempNL.item(0);  
                }else  {
                    return "";
                }
            }                
            return textValue;  
        }catch(NullPointerException ne){
        
            return "";
        }           
    }  
  
    /**
  	 * @comment_sp Ingresa valor con el de SOAP nodo
     * doc: xml documento, nodo: xml nodo, valor: xml tag valor,
     * attach: número si existe documento adjunto
	 * @comment_ko SOAP Node값을 가지고서 Value를 넣는다.  
     * doc: xml 문서, node: xml Node, value: xml tag value, attach: 첨부문서 존재시 번호  
     * @param doc
     * @param node
     * @param value
     * @param attach
     * @throws Exception
     */
	public static void PutSoapValue(XMLDocument doc, String node,   
        String value, int attach) throws Exception{  
		XMLElement xemt = null;  
		xemt = (XMLElement) doc.getDocumentElement();  
		NodeList tmpNodeList = doc.selectNodes(node, xemt);  
      tmpNodeList.item(attach).appendChild(doc.createTextNode(value).cloneNode(true));  
	}  
	
	/**
  	 * @comment_sp Recibe nodo estándar y luego elmPath del método de llamada 
     * Devuelve focus sobre el último Element en elmtPath
	 * @comment_ko 기준노드와 그 이후의 elmtPath를 calling 메소드로부터 전달 받는다.
	 *  elmtPath의 마지막 Element에 대한 focus를 리턴한다.
	 * @param initNode
	 * @param elmtPath
	 * @return
	 */	
    public Element getElement(Node initNode, String elmtPath) {  
  
      Element  elmt    = null;  
      String   elmtStr = null;  
      NodeList nl      = null;  
  
      String[] elmtStrArr = getElementPiece(elmtPath);  
      int pathDepth = elmtStrArr.length;  
  
      elmt = (Element)initNode;  
      for (int i = 0; i < pathDepth; i++) {  
         elmtStr = elmtStrArr[i].trim();  
         nl      = elmt.getElementsByTagName(elmtStr);  
         elmt    = (Element)nl.item(0);  
      }  
      return elmt;  
   }  
  
   /**
 	* @comment_sp Separa cada nombre de nodo con el criterio de  "":"" al recibir elmtPath
    * Devuelve después de Guardar en elmtStrArr
	* @comment_ko elmtPath를 인수로 받아서 ":" 문자를 기준으로 각 노드명을 분리하여
	* elmtStrArr 배열에 저장한 후 리턴한다.
    * @param elmtPath
    * @return
    */ 
   public String[] getElementPiece(String elmtPath) {  
  
      StringTokenizer st = new StringTokenizer(elmtPath,":");  
      int pathDepth = st.countTokens();      
  
      String[] elmtStrArr = new String[pathDepth];  
  
      for(int i = 0; i < pathDepth; i++) {  
         elmtStrArr[i] = st.nextToken();  
      }  
        
      return elmtStrArr;  
   }  
   
   /**
 	* @comment_sp Agrega XMLNamespace
	* @comment_ko addXMLNamespace
    * @param source
    * @param xmlNamespace
    * @return
    */
    public static byte[] addXMLNamespace(byte source[], String xmlNamespace)
	{
	    byte oldContent[] = new byte[source.length];
	    System.arraycopy(source,0,oldContent,0,source.length);
	    String s = new String(oldContent);
	    String inputNamespace = " xmlns=\"" + xmlNamespace + "\"";
		int start = s.indexOf("?>");
		int fromIndex = s.indexOf("<", start);
		int toIndex = s.indexOf(">", fromIndex);
	    StringBuffer sb = new StringBuffer(s);
	    sb.insert(toIndex, inputNamespace);
	    String input = new String(sb);
	    return input.getBytes();
	}

    /**
 	 * @comment_sp Saca XMLNamespace
	 * @comment_ko removeXMLNamespace
     * @param source
     * @return
     */
	public static byte[] removeXMLNamespace(byte source[])
	{
	    byte oldContent[] = new byte[source.length];
	    System.arraycopy(source,0,oldContent,0,source.length);
	    String s = new String(oldContent);
	    int startIndex = s.indexOf("xmlns");
		int endIndex = s.indexOf(">", startIndex);
	    StringBuffer sb = new StringBuffer(s);
	    sb = sb.delete(startIndex - 1, endIndex);
	    String input = new String(sb);
	    return input.getBytes();
	}	
	
//	public static String documentToString(Document doc)
//    throws Exception
//    {
//    if(doc == null)
//    {   
//        return null;
//    } else
//    {
//        StringWriter sw = new StringWriter();
//        XMLSerializer ser = new XMLSerializer();
//        OutputFormat of = new OutputFormat("xml", "UTF-8", false);
//        of.setEncoding("UTF-8");
//        of.setIndenting(true);
//        of.setOmitXMLDeclaration(false);
//        
//        //of.setIndent(4);
//        //of.setPreserveEmptyAttributes(true);
//        //of.setPreserveSpace(true);
//        
//        ser.setOutputCharStream(sw);
//        ser.setOutputFormat(of);
//        ser.serialize(doc);
//        return sw.toString();
//    }
//}
	private static String head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"; 
	
	public static String documentToString(Document doc,String xslName) 
	{
		  StringWriter sw = new StringWriter();
	      try
	      { 
		   TransformerFactory transfactory = TransformerFactory.newInstance();		       
	       Transformer transformer = transfactory.newTransformer();
           transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
           transformer.setOutputProperty(OutputKeys.INDENT, "yes");	           
	       Source source = new DOMSource(doc.getDocumentElement());
	       Result result = new StreamResult(sw);     
           transformer.transform(source, result);
	      }catch(Exception ex){	    	  
	    	  ex.printStackTrace();
	      }
           return head+xslName+sw.toString();
	  }

//	  public static String toString(Document doc)
//	  {
//          DOMSource source = new DOMSource(doc.getDocumentElement());
//		  StringWriter writer = new StringWriter();       
//		  Transformer transformer;
//		  String s = "";
//          try {
//                  transformer = TransformerFactory.newInstance().newTransformer();
//                  transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
//                  transformer.setOutputProperty(OutputKeys.INDENT, "yes");
//                  transformer.transform(source, new StreamResult(writer));
//          } catch (TransformerConfigurationException e) {
//        	  e.printStackTrace();
//          } catch (TransformerFactoryConfigurationError e) {
//              e.printStackTrace();
//          } catch (TransformerException e) {
//              e.printStackTrace();    
//          }
//          String head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"; 
//	  s = head+writer.getBuffer().toString();
//	  return s;
//  }
	  
//      TransformerFactory transfactory = TransformerFactory.newInstance();		       
//      Transformer transformer = transfactory.newTransformer();
//      transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
//      transformer.setOutputProperty(OutputKeys.INDENT, "yes");	           
//      Source source = new DOMSource(doc);
//      StringWriter sw = new StringWriter();
//      Result result = new StreamResult(sw);     
//      transformer.transform(source, result);
}
