<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.lang.*"%>
<%@ page import="javax.swing.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.net.*" %>
<%@ page import="java.util.*" %>

<HTML>
  <HEAD>
    <TITLE>Test</TITLE>
  </HEAD>
    <script type="text/javascript" language="javascript" src="/AppletCtrl/js/Applet.js"></script>
    <script type="text/javascript" language="javascript" src="/AppletCtrl/js/GetObject.js"></script>
    <script type="text/javascript" language="javascript">
  	function getDataFromUrl(url)
	{	 
		if(TZAPP == null){
			alert("null");
		}
  		TZAPP.getDataFromUrl("bb");
  		<%
  		HashMap hash = new HashMap();
  		hash.put("X","A");
  	
  		%>
  		
  		var frm = document.XMLForm;

  		var biz_cl_chk ="";
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
  		
		TZAPP.makeXml_Template(null);
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
  		<td><input type="text" id="Txt1" name="Txt1" value="a"/></td><br/>
  		<td><input type="text" id="Txt2" name="Txt2" /></td><br/>
  		
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
					<td class="tdc"><input type="text" name="factory_nm" size="17"   value="factory_nm1" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="factory_tel_no" size="9"   value="tel_no1" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="factory_fax_no" size="9"   value="fax_no1" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="factory_post_no" size="5"   value="post_no1"  class="readonly" readonly="readonly" style="text-align:center;"></td> 
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
					<td class="tdc"><input type="text" name="factory_nm" size="17"   value="factory_nm2" maxlength="200" ></td> 
					<td class="tdc"><input type="text" name="factory_tel_no" size="9"   value="tel_no2" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="factory_fax_no" size="9"   value="fax_no2" maxlength="20" ></td> 
					<td class="tdc"><input type="text" name="factory_post_no" size="5"   value="post_no2"  class="readonly" readonly="readonly" style="text-align:center;"></td> 
					<td class="tdc"><input type="text" size="20"  value="factory_area2" class="readonly" readonly="readonly"></td> 
					<td class="tdce"><span class="btn_pack small"></span></td> 
					<input type="hidden" name="factoryNo" id="factoryNo" value="2"> 
					<input type="hidden" name="factory_area" value="factory_area2"> 
					<input type="hidden" name="factory_addr" value="factory_addr2"> 
				</tr> 
			</table> 
		</span> 
		<input type="hidden" name="Array1" value="2"> 
		
  		<input type="hidden" id="radioCh" name="radioCh" />
  		<input type="hidden" id="biz_cl_chk" name="biz_cl_chk">
  		<br/>
  	<a href="javascript:getDataFromUrl()" >getDataFromUrl</a><br>
  </form>
  </body>
  </html>


