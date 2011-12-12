<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.lang.*"%>
<%@ page import="javax.swing.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.net.*" %>
<%@ page import="java.util.*" %>

<%
String temp = "It's that";
%>
<HTML>
  <HEAD>
    <TITLE>Test</TITLE>
  </HEAD>    
    <script type="text/javascript" language="javascript" src="/AppletCtrl/js/Applet.js"></script>
    <!-- script type="text/javascript" language="javascript" src="/AppletCtrl/js/GetObject.js"></script -->
    <script type="text/javascript" language="javascript">
  	function makeXml(url)
	{	 
  		
		if(TZAPP == null){
			alert("null");
		}
  		//TZAPP.getDataFromUrl("bb");
  		
  		var biz_cl_chk ="";
  		var frm = document.XMLForm;  		
  		if(frm.biz_cl[0].checked == true){
  			biz_cl_chk += "1";
  		}else{
  			biz_cl_chk += "0";
  		}
  		if(frm.biz_cl[1].checked == true){
  			biz_cl_chk += "1";
  		}else{
  			biz_cl_chk += "0";
  		}
  		if(frm.biz_cl[2].checked == true){
  			biz_cl_chk += "1";
  		}else{
  			biz_cl_chk += "0";
  		}
  		if(frm.biz_cl[3].checked == true){
  			biz_cl_chk += "1";
  		}else{
  			biz_cl_chk += "0";
  		} 
  		frm.biz_cl_chk.value = biz_cl_chk;

		alert(TZAPP.sendDocument("RegistrationApplication","SIG", "XMLForm"));
		//TZAPP.a("RegistrationApplication","SIG", "XMLForm");
	}
	
  	function setText(str) {
  	      document.XMLForm.formId1.value=str;
  	}
  	
  	function paramCheck(val){
  		document.getElementById("radioCh").value = val;
  	}	
  	</script>
  <body>
   <form name="XMLForm">   
   		<!-- Text -->
  		<td><input type="text" id="R1_1_1_2_2_1" name="R1_1_1_2_2_1" value="a"/></td><br/>
  		<td><input type="text" id="R1_1_1_2_2_2" name="R1_1_1_2_2_2" /></td><br/>
  		<td><input type="text" id="R1_2_1_4" name="R1_2_1_4" value="ca"/></td><br/>
  		<td><input type="text" id="R1_2_1_5" name="R1_2_1_5" value="da"/></td><br/>
  		
  		
  		<!-- Radio -->
		<td colspan="3">
		  	<input type="radio" id="ra" name="ra" value="1" onclick="paramCheck('1')">a
			<input type="radio" id="ra" name="ra" value="2" onclick="paramCheck('2')">b
			<input type="radio" id="ra" name="ra" value="3" onclick="paramCheck('3')">c
		</td>
		<br/>
  		<!--  CheckBox -->
  		<td colspan="3" class="tdle">
			<input type="checkbox" class="checkbox" id="biz_cl" name="biz_cl">c1
			<input type="checkbox" class="checkbox" id="biz_cl" name="biz_cl">c2
			<input type="checkbox" class="checkbox" id="biz_cl" name="biz_cl">c3
			<input type="checkbox" class="checkbox" id="biz_cl" name="biz_cl">c4
		</td>
		<br/>
  		<!--  select -->
  		<th class="thl">
		  <label>
			<select style="WIDTH: 170px" class="read" name="selectM" id="selectM" title="">
			<option value="" title="">:::: total</option>
			<option value="from_id" title="" >attr_from_id</option>
			<option value="from_nm" title="">attr_from_nm</option>
			<option value="msg_doc_no" title="">attr_msg_doc_no</option>
			</select>  
          </label>     
        </th>
  		<br/>
  		<!--  for loop -->
  		<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
				<col width="5%">
				<col width="20%">
				<col width="15%">
				<col width="15%">
				<col width="15%">
				<col width="20%">
				<col width="10%">
					<tr>
						<th class="thc">No</th>						
						<th class="thc">공장명</th>
	                    <th class="thc">전화번호</th>
	                    <th class="thc">팩스번호</th>
	                    <th class="thc">우편번호</th>
	                    <th class="thc">주소</th>
						<th class="thce">&nbsp;</th>
					</tr> 
		</table>
  		<span> 
			<table width="100%" summary="" cellspacing="0" cellpadding="0" > 
				<col width="5%"> 
				<col width="20%"> 
				<col width="15%"> 
				<col width="15%"> 
				<col width="15%"> 
				<col width="20%"> 
				<col width="10%"> 
				<tr> 
					<td class="tdc">1</td> 
					<td class="tdc"><input type="text" name="R1_2_4_1" id="R1_2_4_1"  size="17"   value="factory_nm1" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_4_3_2_1" id="R1_2_4_3_2_1" size="9"   value="tel_no1" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="factory_fax_no" size="9"   value="fax_no1" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="R1_2_4_4_1" id="R1_2_4_4_1A"  size="5"   value="post_no1"  class="readonly" readonly="readonly" style="text-align:center;"></td> 
					<td class="tdc"><input type="text" name="R1_2_4_4_1" id="R1_2_4_4_1"  size="5"   value="post_no11"  class="readonly" readonly="readonly" style="text-align:center;"></td>
					<td class="tdc"><input type="text" size="20"  value="factory_area1" class="readonly" readonly="readonly"></td> 
					<td class="tdce"><span class="btn_pack small"></span></td> 
					<input type="hidden" name="factoryNo" id="factoryNo" value="1"> 
					<input type="hidden" name="factory_area" value="factory_area1"> 
					<input type="hidden" name="factory_addr" value="factory_addr1"> 
				</tr> 
			</table> 
		</span> 
  		<span> 
			<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;"> 
				<col width="5%"> 
				<col width="20%"> 
				<col width="15%"> 
				<col width="15%"> 
				<col width="15%"> 
				<col width="20%"> 
				<col width="10%"> 
				<tr> 
					<td class="tdc">2</td> 
					<td class="tdc"><input type="text" name="R1_2_4_1" id="R1_2_4_1" size="17"   value="factory_nm2" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_4_3_2_1" id="R1_2_4_3_2_1" size="9"   value="tel_no2" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="factory_fax_no" size="9"   value="fax_no2" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="R1_2_4_4_1" id="R1_2_4_4_1A" size="5"   value="post_no2"  class="readonly" readonly="readonly" style="text-align:center;"></td>
					<td class="tdc"><input type="text" name="R1_2_4_4_1" id="R1_2_4_4_1"  size="5"   value="post_no11"  class="readonly" readonly="readonly" style="text-align:center;"></td> 
					<td class="tdc"><input type="text" size="20"  value="factory_area2" class="readonly" readonly="readonly"></td> 
					<td class="tdce"><span class="btn_pack small"></span></td> 
					<input type="hidden" name="factoryNo" id="factoryNo" value="2"> 
					<input type="hidden" name="factory_area" value="factory_area2"> 
					<input type="hidden" name="factory_addr" value="factory_addr2"> 
				</tr> 
			</table> 
			
			<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;"> 
				<col width="10%"> 
				<col width="20%"> 
				<col width="70%"> 
		
				<tr> 
					<td class="tdc"><input type="text" name="R1_2_8_1" id="R1_2_8_1" size="17"   value="2" maxlength="200" ></td>
					<td class="tdc"><input type="text" name="R1_2_8_2" id="R1_2_8_2" size="17"   value="йөыбёфё제목6" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_8_3" id="R1_2_8_3" size="9"   value="D:S201107251239251019A.zip" maxlength="20" ></td>
				</tr>  
				
				<tr> 
					<td class="tdc"><input type="text" name="R1_2_8_1" id="R1_2_8_1" size="17"   value="2" maxlength="200" ></td>
					<td class="tdc"><input type="text" name="R1_2_8_2" id="R1_2_8_2" size="17"   value="йөыбёфё제목4" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_8_3" id="R1_2_8_3" size="9"   value="D:/sw/ftp/FileZilla_3.2.7.1_win32-setup.exe" maxlength="20" ></td>
				</tr>
				<tr> 
					<td class="tdc"><input type="text" name="R1_2_8_1" id="R1_2_8_1" size="17"   value="1" maxlength="200" ></td>
					<td class="tdc"><input type="text" name="R1_2_8_2" id="R1_2_8_2" size="17"   value="제목1" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_8_3" id="R1_2_8_3" size="9"   value="c:\Bookйёш.xlsx" maxlength="20" ></td>
				</tr>
				<tr> 
					<td class="tdc"><input type="text" name="R1_2_8_1" id="R1_2_8_1" size="17"   value="2" maxlength="200" ></td>
					<td class="tdc"><input type="text" name="R1_2_8_2" id="R1_2_8_2" size="17"   value="제목2" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_8_3" id="R1_2_8_3" size="9"   value="c:/links.txt" maxlength="20" ></td>
				</tr> 
				
				<tr> 
					<td class="tdc"><input type="text" name="R1_2_8_1" id="R1_2_8_1" size="17"   value="2" maxlength="200" ></td>
					<td class="tdc"><input type="text" name="R1_2_8_2" id="R1_2_8_2" size="17"   value="йөыбёфё제목3" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="R1_2_8_3" id="R1_2_8_3" size="9"   value="d:/연계쪽수정필요_54_보증연계오류메세지 변경_다시보내기[1].docx" maxlength="20" ></td>
				</tr>
				
			</table> 
				<tr> 
					<td class="tdc"><input type="hidden" name="R1_2_9_1" id="R1_2_9_1" value="MIIEqTCCA5GgAwIBAgICAcMwDQYJKoZIhvcNAQEFBQAwPDELMAkGA1UEBhMCbW4xDjAMBgNVBAoMBWtzaWduMQwwCgYDVQQLDANwa2kxDzANBgNVBAMMBnJvb3RjYTAeFw0xMTA5MjIwMjU5NDRaFw0xMjA5MTQwMzU1NTlaMEIxCzAJBgNVBAYTAmtyMQ4wDAYDVQQKDAVrc2lnbjEMMAoGA1UECwwDcGtpMRUwEwYDVQQDDAxKYXZhUmVhbENlcnQwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANCqjcxyWuvqagJTg+RbJzCJHenRkTGxViHxs9TnnmuNddSRMr7XGGY5yZJkuXQRulk4Q/yz80a00jmBSEmYD7ACKQFMrdEFvgmsT+Sd+CVoSjpcTtadWJ0UNmQUoY3eC+DPwsG58pqgZ3ZpSWNDIp1BDOJ8zXO68Jx923UW8SLtAgMBAAGjggIxMIICLTBSBggrBgEFBQcBAQRGMEQwQgYIKwYBBQUHMAKGNmxkYXA6Ly8xNzIuMTYuMzAuMTQ1OjM4OS9jbj1yb290Y2Esb3U9cGtpLG89a3NpZ24sYz1tbjBkBgNVHSMEXTBbgBRMeY5ZiGJaWrx1KvrqrLMSeRRjFqFApD4wPDELMAkGA1UEBhMCbW4xDjAMBgNVBAoMBWtzaWduMQwwCgYDVQQLDANwa2kxDzANBgNVBAMMBnJvb3RjYYIBAjAdBgNVHQ4EFgQUcIXep2KFou5u7wHzVQoUoZCKomEwDgYDVR0PAQH/BAQDAgUgMFYGA1UdIAEB/wRMMEowSAYEKgMEBzBAMCkGCCsGAQUFBwIBFh1odHRwOi8vd3d3LmtzaWduLmNvbS9jcHMuaHRtbDATBggrBgEFBQcCAjAHGgVLU2lnbjBbBgNVHREEVDBSoFAGCSqDGoyaRAoBAaBDMEEMDEphdmFSZWFsQ2VydDAxMC8GCiqDGoyaRAoBAQEwITAHBgUrDgMCGqAWBBQmGJ0UwZ5ys/g+MgNjEL0aCyGkczAhBgNVHRIEGjAYoBYGCSqDGoyaRAoBAaAJMAcMBUtTaWduMGoGA1UdHwRjMGEwX6BdoFuGWWxkYXA6Ly8xNzIuMTYuMzAuMTQ1OjM4OS9jbj1jZHAycDIsb3U9Y3JsZHAsb3U9cGtpLG89a3NpZ24sYz1tbj9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0MA0GCSqGSIb3DQEBBQUAA4IBAQA3k66nLO4lGcJHHhB3xUl8/X5RgRic3d+et0TneTM8+mbJi/nF32A5EWrK1D9ZLOBdb9IpDCh9wSg+nT5wCarD9d9aaqsu51wGR9TC/Ao8ZLtKFz5Atfwq2u+RvqzmlDOuIM0lzsMb2+fHqO56vFt59ZiJvTwMTG55piwiCgFwuVcElmb1Se2oj9dVS3zCswZuI6hQ2wBSt2/AJ9vPU+vG5yPZgxNrEMQlhG0Z/LDX83weO6Oz5UIC/gs52zGugmzirT44FV4KMD6Xoh8mfFBGDNzSbPflnhlDHYakB+Sxf9SEVfN88dH0wPF2mxRLFkLJbY8wLtCJmrS3opwBw/Xu" ></td>
					<td class="tdc"><input type="hidden" name="R1_2_9_2" id="R1_2_9_2" value="MIIEqzCCA5OgAwIBAgICCfYwDQYJKoZIhvcNAQEFBQAwPDELMAkGA1UEBhMCa3IxDjAMBgNVBAoMBWtzaWduMQwwCgYDVQQLDANwa2kxDzANBgNVBAMMBnJvb3RjYTAeFw0xMTA4MjIwMjUwMDBaFw0xMjA4MjIwMjQ5NTlaMEYxCzAJBgNVBAYTAmtyMQ4wDAYDVQQKDAVrc2lnbjEMMAoGA1UECwwDcGtpMRkwFwYDVQQDDBAyMDExMDgyMjExNDk1OE1OMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFcZLraensq6fXhOgtIsmYbW3r1Q8slfFsFhmZWldpe8ILqew1jaiR8H3gfmaEXGqRRj9VxEJBGS2k+3XeuJ9YfyO3QoXiSdqcTAbMR/0XSOKr9EEYBpNVuR7lqS0lBb7xsMLpqswOJqe4jY+vuCrz5eXV0DmeNIWIz8UX34p7+wIDAQABo4ICLzCCAiswUQYIKwYBBQUHAQEERTBDMEEGCCsGAQUFBzAChjVsZGFwOi8vMjExLjQ3LjIzOS41OjM4OS9jbj1yb290Y2Esb3U9cGtpLG89a3NpZ24sYz1rcjBkBgNVHSMEXTBbgBSP71SsIL/SXweuqxLeWErOgIOUtaFApD4wPDELMAkGA1UEBhMCa3IxDjAMBgNVBAoMBWtzaWduMQwwCgYDVQQLDANwa2kxDzANBgNVBAMMBnJvb3RjYYIBAjAdBgNVHQ4EFgQUTXmdPV/xtOiStEz1q1L6G4VEJmcwDgYDVR0PAQH/BAQDAgUgMFIGA1UdIAEB/wRIMEYwRAYAMEAwKQYIKwYBBQUHAgEWHWh0dHA6Ly93d3cua3NpZ24uY29tL2Nwcy5odG1sMBMGCCsGAQUFBwICMAcaBUtTaWduMF8GA1UdEQRYMFagVAYJKoMajJpECgEBoEcwRQwQMjAxMTA4MjIxMTQ5NThNTjAxMC8GCiqDGoyaRAoBAQEwITAHBgUrDgMCGqAWBBT3iHks+Ce03Qe8qvC/9ndU+MYIozAhBgNVHRIEGjAYoBYGCSqDGoyaRAoBAaAJMAcMBUtTaWduMGkGA1UdHwRiMGAwXqBcoFqGWGxkYXA6Ly8yMTEuNDcuMjM5LjU6Mzg5L2NuPWNkcDJwNyxvdT1jcmxkcCxvdT1wa2ksbz1rc2lnbixjPWtyP2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3QwDQYJKoZIhvcNAQEFBQADggEBAJavNckAL5vOIDl//pkHjOLldgJahhmNujmZ1jWhlhD1Ld1bElo6e/H2qpCvt11MWG6nKEmE1CneruSvhLvR1YQzTbNWbioQ/Nt5dlLtkbi37m9PiAKsFTu6Xvdt8iyoi7WlOqfynQpRZX6g8ivzMYyQay/od/jDAfj5rW7YwuKC3vnto9hOMbnUuXNP9k1grzL8yd1L5FyMjLrzYRbzxsw+H/JLpGWcYmcD6hBiymdZZtb4vwGEaKD9kZrvmr4/Ms5u8pLMZoMlQehXIOwJwdJY0+aKrn+3FFNUASmtVYtOObUT9L8HLfiEHPrsnD37N9OHwfRnv718tCkA/CSg0S8=" ></td> 
				</tr> 
			
			
			
			
		</span> 
		<input type="hidden" name="R1_2_4" id="R1_2_4" value="2"> 
		<input type="hidden" name="R1_2_8" id="R1_2_8" value="5"> 
		
		<input type="hidden" name="R_H_10_20_10" id="R_H_10_20_10" value="SenderID">
		<input type="hidden" name="R_H_10_30_10" id="R_H_10_30_10" value="ReceiverID">
		<input type="text" name="R_H_10_60_10_40" id="R_H_10_60_10_40" value="문서제목йёфнз">
		
  		<input type="hidden" id="radioCh" name="radioCh" />
  		<input type="hidden" id="biz_cl_chk" name="biz_cl_chk">
  		<br/>
  	<a href="javascript:makeXml()" >makeXml</a><br>
  </form>
  </body>
  </html>


