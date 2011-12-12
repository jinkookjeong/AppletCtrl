/***************************************************************
 일자		 버전    작성자    변경사항                     
****************************************************************
 2010.04.15   1.0	 전영근    1,0,1,97 (g2b 미사용)
 2010.06.21   1.1	 전영근    1,0,1,6 (g2btax)
                               1,0,2,0 (taxtoolkit)
 2010.10.07   1.2	 전영근    1,0,1,8 (g2btax)
 2010.10.21   1.3	 전영근    1,0,1,9 (g2btax)
 2011.03.18   1.4	 전영근    6,0,24,5 (자바애플릿)
 2011.05.26   1.5	 전영근    1,0,1,11 (g2btax)
 2011.05.30   1.6	 전영근    1,0,1,12 (g2btax)
 2011.06.30   1.7	 전영근    1,0,1,13 (g2btax) 
****************************************************************/

/* 자바애플릿 */
//<![CDATA[
	function showInit() {
		//var msg = document.getElementById("MSG");//top.frames[1].
		//msg.innerHtml = "<center>로딩중입니다.</center>";
	}
	
	function hideInit() {
		//var msg = document.getElementById("MSG");//top.frames[1].
		//msg.style.visibility = 'hidden';
	}
	
//  var divObj = document.createElement('div');
//  divObj.setAttribute("id", "MSG");
//  document.body.appendChild(divObj);
//  document.getElementById("MSG").style.width = "300";
// document.getElementById("MSG").style.height = "50";
//  document.getElementById("MSG").innerHTML = "나라장터 보안모듈 로딩 중입니다.";
 
  //var msg = document.getElementById("MSG");
  //msg.innerHtml = "<center>초기화 중입니다.</center>";
 

	var _app = navigator.appName;
	var G2BHTML = "";
	if (_app == 'Mozilla' || _app == 'Netscape') {
	  G2BHTML = '<embed  name="G2B" id="G2B"' +
				' CODE="kr.go.g2b.edosi.applet.G2B"' +
				' java_codebase="' + codebase + '"' +
				' width="100"' +
				' height="100"' +		
				' type="application/x-java-applet;version=1.6"' +
				//'image="http://www.g2b.go.kr/appletA/loading_bar2.gif"',
				' java_arguments=" -Xmx512M "' +
				' java_version="1.6.0_10+"' +
				' codebase_lookup="false"' +
				' archive="' + printJars() + '"' +
				//'cache_archive="' + printJars() + '"',
				//'cache_version="' + printVers() + '"',
				//'cache_archive_ex="' + preLoad + '"',
				' separate_jvm="true"' +
				' MAYSCRIPT="true"' +
				' scriptable="true">' +			    			
				' </embed>';
	  }
	else if (_app == 'Microsoft Internet Explorer') {
	
	 G2BHTML = '<object name="G2B" id="G2B"' +
				' classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"' +
				' codebase="http://java.sun.com/update/1.6.0/jinstall-6u24-windows-i586.cab#Version=6,0,24,5"' +
				' onError="javascript:jreNotInstalled();"' +
				' width="100"' +
				//' height="100">' +
				' height="100"' +
				//애플릿이 tab 포커스를 받지 않도록 tabindex 파라미터를 추가함.
				' tabindex="-1">' +
				//'<param name="image" value="http://www.g2b.go.kr/appletA/loading_bar2.gif"/>',
				' <param name="code" value="kr.go.g2b.edosi.applet.G2B"/>' +
				' <param name="codebase" value="' + codebase + '"/>' +
				' <param name="java_arguments" value=" -Xmx512M "/>' +
				' <param name="java_version" value="1.6.0_10+"/>' +
				' <param name="codebase_lookup" value="false"/>' +    			   
				' <param name="archive" value="' + printJars() + '"/>' +
				//'<param name="cache_archive" value="' + printJars() + '">',
				//'<param name="cache_version" value="' + printVers() + '">',
				//'<param name="cache_archive_ex" value="' + preLoad + '">', 
				' <param name="separate_jvm" value="true"/>' +
				' <param name="MAYSCRIPT" value="true"/>' +    			
				' <param name="scriptable" value="true"/>' +	
				' </object>';

			}
	else {
	  G2BHTML = '<p>Sorry, unsupported browser.</p>';
	}

	document.getElementById("G2BDiv").innerHTML = G2BHTML;
//]]>


/* g2b 세금계산서용 ActiveX/TAX */
document.write('<object tabindex="-1" classid="clsid:28C3AE8A-FD3A-4891-AD7A-4032FE57E968" id="G2B_TAX" codebase="http://www.g2b.go.kr/cab/G2BTax.cab#version=1,0,1,13" width="0%" height="0%"><param name="DefaultPath" value="C:\G2B"></object>');

/* taxtoolkit 정보인증 세금계산서용 ActiveX/taxtoolkit */
document.write('<object tabindex="-1" classid="clsid:4b2f83a9-ff1d-4540-91e4-0dd7773c1c16" id="signtax" codebase="http://www.g2b.go.kr/cab/SGSecuTaxClient_full.cab#version=1,0,2,0" width="0%" height="0%"></object>');