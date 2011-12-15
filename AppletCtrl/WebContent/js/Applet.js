 
  var TZApplet = "";
  var browser = navigator.appName;
  
  if (browser == 'Netscape') {
	   TZApplet = '<embed id="TZAPP"'+
	    ' width="50" height="50"'+
	    ' codebase="http://localhost:8088/AppletCtrl/java/download/"'+
	    ' pluginspage="http://java.sun.com/javase/downloads"'+
	    ' code="eppd.app.PPS"'+
	    ' java_arguments="-Xmx512M"'+
	    ' type="application/x-java-applet;version=1.6"'+ 
		' codebase_lookup="false"'+	
	    ' archive="xmlparserv2.jar,activation.jar,netscape.jar,commons-io-1.4.jar,mail.jar, app.jar"'+
	    ' cache_option="Plugin"'+
	    ' separate_jvm="true"'+
		' MAYSCRIPT="true"'+
		' scriptable="true"'+
		' tabindex="-1"'+
	    ' </embed>';
  }
  else if (browser == 'Microsoft Internet Explorer') 
  {
   TZApplet = '<OBJECT id="TZAPP"'+ 
   			'  classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"' +
		    '  WIDTH = "50" HEIGHT = "50"'+
		    '  codebase="http://localhost:8088/AppletCtrl/java/"'+
		    '  pluginspage="http://java.sun.com/javase/downloads"'+
		    '  tabindex="-1">'+
		    ' <PARAM NAME="CODE" VALUE = "eppd.app.PPS" />'+
		    ' <PARAM NAME="java_arguments" value=" -Xmx512M "/>'+
		    ' <PARAM NAME="type" VALUE="application/x-java-applet;version=1.6" />'+
		  
		    ' <PARAM NAME="codebase_lookup" value="false"/>' +   
		    ' <PARAM NAME="archive" value="java/download/xmlparserv2.jar,java/download/activation.jar,java/download/netscape.jar,java/download/commons-io-1.4.jar,java/mail.jar,java/download/app.jar," />'+
		    ' <PARAM NAME="separate_jvm" value="true" />'+
		    ' <PARAM NAME="cache_option" value="Plugin" />'+
			' <PARAM NAME="MAYSCRIPT" value="true" />' + 			
			' <PARAM NAME="scriptable" value="true" />' +	
		    ' </OBJECT>';
  }
  else {
	  TZApplet = '<h1>so Sorry! unsupported browser.</h1>';
  }
  document.write(TZApplet);
  
  //  ' <PARAM NAME="ProductHome" VALUE="/java/" />'+
  // ' ProductHome=./java/'+