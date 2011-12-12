<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.util.*" %>
<%@ page import="com.mn.vo.*" %>
<%@ page import="com.mn.util.StringUtil" %>
<%@ page import="com.mn.util.CookieUtil " %>
<%@ page import="com.mn.util.DateUtil " %>
<%@ page import="com.lang.trans.Locale" %>
<%@ page import="com.lang.msg.*" %>
<%@ page import="com.lang.trans.*" %>
<%@ page import="com.mn.constant.UrlConstant" %>
<%@ page errorPage="/error/errorSystemPage.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>업체등록 XML</title>
<link rel="stylesheet" type="text/css" href="/css/mn.css">
<link rel="stylesheet" type="text/css" href="/css/sp.css">
<link rel="stylesheet" type="text/css" href="/css/com/calendar.css">
<link rel="stylesheet" href="/css/com/dhtmlwindow.css" type="text/css">
<link rel="stylesheet" href="/css/com/modal.css" type="text/css">
<script type="text/javascript" language="javascript" src="/js/com/prototype.js"></script>
<script type="text/javascript" language="javascript" src="/js/com/calendar.js"></script>
<script type="text/javascript" language="javascript" src="/js/com/check.js"></script>
<script type="text/javascript" language="javascript" src="/js/com/popup.js"></script>
<script type="text/javascript" language="javascript" src="/js/com/wzTooltip.js"></script>
<script type="text/javascript" language="javascript" src="/js/menu.js"></script>
<script type="text/javascript" language="javascript" src="/js/sp.js"></script>
<script type="text/javascript">
var factoryNo = 0;

function makeXML()
{
	var frm = document.frm_write;	
	var R_B_10_100 ="";
	
	if(frm.biz_cl[0].checked == true)
	{
		R_B_10_100 += "1";
	}
	else
	{
		R_B_10_100 += "0";
	}
	
	if(frm.biz_cl[1].checked == true)
	{
		R_B_10_100 += "1";
	}
	else
	{
		R_B_10_100 += "0";
	}
	
	if(frm.biz_cl[2].checked == true)
	{
		R_B_10_100 += "1";
	}
	else
	{
		R_B_10_100 += "0";
	}
	
	if(frm.biz_cl[3].checked == true)
	{
		R_B_10_100 += "1";
	}
	else
	{
		R_B_10_100 += "0";
	} 
	
	frm.R_B_10_100.value = R_B_10_100;
	frm.R_B_40.value = factoryNo;
}

function addFactory()
{
	var factory_nm = document.frm_write.tmp_factory_nm;
	var factory_tel_no = document.frm_write.tmp_factory_tel_no;
	var factory_fax_no = document.frm_write.tmp_factory_fax_no;
	var factory_post_no = document.frm_write.tmp_factory_post_no;
	var factory_addr = document.frm_write.tmp_factory_addr;
	var factory_area = document.frm_write.tmp_factory_area;
		
	factoryNo += 1;

	var html = '';

	html += '<span>';
	html += '<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">';
	html += '<col width="5%">';
    html += '<col width="20%">';
   	html += '<col width="15%">';
   	html += '<col width="15%">';
    html += '<col width="15%">';
    html += '<col width="20%">';
    html += '<col width="10%">';
    html += '<tr>';
	html += '	<td class="tdc"><span>'+factoryNo+'<\/td>';
	html += '	<td class="tdc"><input type="text" name="R_B_40_20" id="R_B_40_20" size="17"  value="'+factory_nm.value +'" maxlength="200" onblur=" check_checkLenth(this, 200);"><\/td>';
	html += '	<td class="tdc"><input type="text" name="R_B_40_30_20_10" id="R_B_40_30_20_10" size="9" value="'+factory_tel_no.value +'" maxlength="20" onblur="check_checkLenth(this, 20);"><\/td>';
	html += '	<td class="tdc"><input type="text" name="R_B_40_30_30_10" id="R_B_40_30_30_10" size="9" value="'+factory_fax_no.value +'" maxlength="20" onblur="check_checkLenth(this, 20);"><\/td>';
	html += '	<td class="tdc"><input type="text" name="R_B_40_40_10" id="R_B_40_40_10" size="5" value="'+factory_post_no.value +'" style="text-align:center;"><\/td>';
	html += '	<td class="tdc"><input type="text" size="20" name="R_B_40_40_20" id="R_B_40_40_20" value="'+factory_area.value+" "+factory_addr.value+'"><\/td>';
	html += '	<td class="tdce"><span class="btn_pack small"><a href="javascript:removeFactory('+factoryNo+');">삭제<\/a> <\/span><\/td>';
	html += '<input type="hidden" name="R_B_40_10" id="R_B_40_10" value="'+factoryNo+'">';
	html += '<input type="hidden" name="factory_area" value="'+factory_area.value+'">';
	html += '<input type="hidden" name="factory_addr" value="'+factory_addr.value+'">';
	html += '<\/tr>';
	html += '<\/table>';
	html += '<\/span>';

	document.getElementById("writeFactory").innerHTML += html;

	document.frm_write.tmp_factory_nm.value = "";
	document.frm_write.tmp_factory_tel_no.value = "";
	document.frm_write.tmp_factory_fax_no.value = "";
	document.frm_write.tmp_factory_post_no.value = "";
	document.frm_write.tmp_factory_addr.value = "";
	document.frm_write.tmp_factory_area.value = "";
}	

function removeFactory(index)
{
	var writeFactory = document.getElementById("writeFactory");
	var childs = writeFactory.childNodes;

	writeFactory.removeChild(childs[index-1]);
	childs = writeFactory.childNodes;

	for(var i=0; i<childs.length; i++) 
	{
		childs[i].getElementsByTagName("span")[0].innerHTML = (parseInt(i)+1);
		childs[i].getElementsByTagName("a")[0].setAttribute("href", "javascript:removeFactory('"+(parseInt(i)+1)+"');");
	}

	factoryNo -= 1;
}

function initFactory()
{
	document.frm_write.tmp_factory_nm.value = "";
	document.frm_write.tmp_factory_tel_no.value = "";
	document.frm_write.tmp_factory_fax_no.value = "";
	document.frm_write.tmp_factory_post_no.value = "";
	document.frm_write.tmp_factory_addr.value = "";
	document.frm_write.tmp_factory_area.value = "";
}

function branchCheck(val)
{
	if(val == "1")
	{
		document.frm_write.R_B_10_60.value= "1";
		return;
	}
	else if(val == "2")
	{
		document.frm_write.R_B_10_60.value= "2";
		return;
	}
	else
	{
		document.frm_write.R_B_10_60.value= "0";
	}	
}

function prodCheck(val)
{
	if(val == "N")
	{
		document.frm_write.R_B_50_30.value= "N";
		return;
	}
	else if(val == "Y")
	{
		document.frm_write.R_B_50_30.value= "Y";
		return;
	}
	else
	{
		document.frm_write.R_B_50_30.value= "";
	}	
}

function corporationCheck(val)
{
	if(val == "1")
	{
		document.frm_write.R_B_10_50.value= "1";
		return;
	}
	else if(val == "2")
	{
		document.frm_write.R_B_10_50.value= "2";
		return;
	}
	else if(val == "3")
	{
		document.frm_write.R_B_10_50.value= "3";
		return;
	}
	else
	{
		document.frm_write.R_B_10_50.value= "";
	}	
}
</script>
</head>
<body>
<div class="right">
	<div class="location">&nbsp;</div><!-- Supplier Registration Application :: 업체등록신청서	 -->
	<div class="title"><span class="text">업체등록신청서</span></div><!-- Supplier Registration Application :: 업체등록신청서	 -->
	
	<form name="frm_write"  method="post" action="">
	<!--  sender -->
	<input type="text" name="R_H_10_20_10" id="R_H_10_20_10" value=""> <!-- sender_ID -->
	<input type="text" name="R_H_10_20_20_10" id="R_H_10_20_20_10" value=""> <!-- STAFF_NM -->
	<input type="text" name="R_H_10_20_20_20" id="R_H_10_20_20_20" value=""> <!-- EMAIL -->
	<input type="text" name="R_H_10_20_20_30" id="R_H_10_20_20_30" value=""> <!-- FAX -->
	<input type="text" name="R_H_10_20_20_40" id="R_H_10_20_20_40" value=""> <!-- TEL -->
	<input type="text" name="R_H_10_20_20_50" id="R_H_10_20_20_50" value="Seller"> <!-- Seller -->
	
	<!-- receiver -->
	<input type="text" name="R_H_10_30_10" id="R_H_10_30_10" value=""> <!-- receiver_ID -->
	<input type="text" name="R_H_10_30_20_10" id="R_H_10_30_20_10" value=""> <!-- STAFF_NM -->
	<input type="text" name="R_H_10_30_20_20" id="R_H_10_30_20_20" value=""> <!-- EMAIL -->
	<input type="text" name="R_H_10_30_20_30" id="R_H_10_30_20_30" value=""> <!-- FAX -->
	<input type="text" name="R_H_10_30_20_40" id="R_H_10_30_20_40" value=""> <!-- TEL -->
	<input type="text" name="R_H_10_30_20_50" id="R_H_10_30_20_50" value="Center"> <!-- Center -->
	
	<!-- document -->
	<input type="text" name="R_H_10_40_10" id="R_H_10_40_10" value=""> <!-- EXC_STAT -->
	<input type="text" name="R_H_10_40_20" id="R_H_10_40_20" value="1.0"> <!-- 1.0 -->
	<input type="text" name="R_H_10_40_30" id="R_H_10_40_30" value="RegistrationApplication"> <!-- RegistrationApplication -->
	<input type="text" name="R_H_10_40_40" id="R_H_10_40_40" value="U"> <!-- U -->
	<input type="text" name="R_H_10_40_60" id="R_H_10_40_60" value=""> <!-- TIME -->
	
	<!-- loop total value -->
	<input type="text" name="R_B_40" id="R_B_40" value=""> 
	<div class="table_board1">
	<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
	<col width="143">
	<col width="233">
	<col width="143">
	<col width="233">
	<tr>
		<th class="thl">문서번호</th>
		<td class="tdle" colspan="3">
			<input type="text" name="R_H_10_40_50" id="R_H_10_40_50" size="20" maxlength="200" onblur="check_checkLenth(this, 200);">
		</td>		
	</tr>
	</table>
	</div>
	
	<div class="board_title">
		<h4>[ 기본정보 ]</h4><!-- Basic Information :: 기본정보	 -->
	</div>
	<div class="table_board1">
 	<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
 	<col width="143">
	<col width="233">
	<col width="143">
	<col width="233">
	<tr>
		<th class="thl"><span class="reddot">*</span>법인/개인구분</th>
		<td colspan="3" class="tdle">
		  	<input type="radio" class="radio" name="corporation_cl" onclick="corporationCheck('1')" value="1"> 법인
			<input type="radio" class="radio" name="corporation_cl" onclick="corporationCheck('2')" value="2"> 내국인
			<input type="radio" class="radio" name="corporation_cl" onclick="corporationCheck('3')" value="3"> 외국인
			<input type="text" name="R_B_10_50" ID="R_B_10_50">			
		</td>
	</tr>
	<tr>
		<th class="thl"><span class="reddot">*</span>사업자등록번호</th>
		<td class="tdl">
		  	<input type="text" name="R_B_10_10" id="R_B_10_10" size="20"  onblur="replace_text(this);">
		</td>
	    <th class="thl"><span class="reddot">*</span>상호명</th>
	    <td class="tdle">
			<input type="text" name="R_B_10_30" id="R_B_10_30" size="20" maxlength="200">
		</td>
	</tr>
	<tr>
		<th class="thl"><span class="reddot" id="reddotcheck1">*</span>본사/지사구분</th>
		<td colspan="3" class="tdle">
			<input type="radio" class="radio" name="head_branch_cl_yn" onclick="branchCheck('1')" value="1"> 본사
			<input type="radio" class="radio" name="head_branch_cl_yn" onclick="branchCheck('2')" value="2"> 지사
			<input type="text" name="R_B_10_60" ID="R_B_10_60">
		</td>
	</tr>
	<tr>
		<th class="thl">본사사업자등록번호</th>
		<td class="tdl">
			<input type="text" name="R_B_10_70" id="R_B_10_70" size="7">			
		</td>
		<th class="thl">본사상호명</th>
		<td class="tdle">
			<input type="text" name="R_B_10_80" id="R_B_10_80" size="20" maxlength="200">
		</td>
	</tr>
	<tr>
		<th class="thl"><span class="reddot">*</span>국가등록번호</th>
		<td class="tdl">
			<input type="text" name="R_B_10_20" id="R_B_10_20" value="" size="20"  onblur="replace_text(this);">
		</td>
		<th class="thl"><span class="reddot" id="reddotcheck3">*</span>개업일자</th>
		<td class="tdle">
			<input type="text" name=R_B_10_90 id="R_B_10_90" size="10" maxlength="10" class="read" value="" onblur="javascript:check_dateCheck(this,'-');" onFocus="check_removeCharInput(this,'-');" style="WIDTH:80px" >	
            <a href="#" onclick="Calendar_D('R_B_10_90');return false;"><img src="/images/cal.gif" alt="calendar" width="14" height="14" border="0"></a>
		</td> 
	</tr>	
	<tr>
		<th class="thl">국적</th>
		<td class="tdl">
			<input type="text" name="R_B_10_140_10" id="R_B_10_140_10" value="" >			
		</td>
		<th class="thl"><span class="reddot" id="reddotcheck4">*</span>기업구분</th>
		<td class="tdle">
			<select name="R_B_10_110" id="R_B_10_110">
				<option value="">::::선택
				<option value="1">대기업
				<option value="2">중소기업
			</select>
		</td>
	</tr>
	<tr>	
		<th class="thl"><span class="reddot">*</span>업무구분</th>
		<td colspan="3" class="tdle">
			<input type="checkbox" class="checkbox" name="biz_cl"> 물품
			<input type="checkbox" class="checkbox" name="biz_cl"> Works
			<input type="checkbox" class="checkbox" name="biz_cl"> 컨설팅
			<input type="checkbox" class="checkbox" name="biz_cl"> 컨설팅 외
			<input type="text" name="R_B_10_100" id="R_B_10_100">
		</td>
	</tr>
	<tr> 
		<th class="thl"><span class="reddot">*</span>우편번호</th>
		<td colspan="3" class="tdle">
			<input type="text" name="R_B_10_150_10" id="R_B_10_150_10"  size="10">			
		</td>
	</tr> 
	<tr> 
		<th rowspan="2" class="thl"><span class="reddot">*</span>주소</th> 
		<td colspan="3" class="tdle">
			<input type="text" name="R_B_10_150_20" id="R_B_10_150_20" size="70"> 
		</td>
	</tr>         
	<tr>
		<th class="thl"><span class="reddot">*</span>전화번호</th>
		<td class="tdl">
			<input type="text" name="R_B_10_160_20_10" id="R_B_10_160_20_10"  size="20" maxlength="20" onblur="check_checkLenth(this, 20);">
		</td>
		<th class="thl">팩스번호</th>
		<td class="tdle"> 
			<input type="text" name="R_B_10_160_30_10" id="R_B_10_160_30_10" size="20" maxlength="20" onblur="check_checkLenth(this, 20);">
		</td>
	</tr>
	<tr>
		<th class="thl"><span class="reddot" id="reddotcheck5">*</span>자본금</th>
		<td class="tdl">
			<input type="text" name="R_B_10_120" id="R_B_10_120" style="text-align:right;" maxlength="18" onblur="check_NumberFormat(this, 9);check_checkLenth(this, 23);" size="20">
		</td>
		<th class="thl"><span class="reddot" id="reddotcheck6">*</span>종업원수</th>
		<td class="tdle">
			<input type="text" name="R_B_10_130_10" id="R_B_10_130_10"  style="text-align:right;" maxlength="10" onblur="check_NumberFormat(this, 9); check_checkLenth(this, 10);" size="20">
		</td>
	</tr>	
	<tr>
		<th class="thl">홈페이지</th>
		<td class="tdl">
			<input type="text" name="R_B_10_160_40_30" id="R_B_10_160_40_30" size="20" maxlength="50" onblur="check_checkLenth(this, 50);">
		</td>
		<th class="thl">이메일</th>
		<td class="tdle">
			<input type="text" name="R_B_10_160_40_20" id="R_B_10_160_40_20" size="20" onblur="check_checkLenth(this, 50);">
		</td>
	</tr>		
	</table>
	</div>
	
	<div id = "chief_div">
		<div class="board_title2">
			<h4>[ 대표자 정보 ]</h4><!-- Representative Information ::대표자정보	 -->		
		</div>
	
		<div class="table_board1">
		<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
		<col width="143">
		<col width="233">
		<col width="143">
		<col width="233">
		<tr>
			<th class="th1"><span class="reddot" id="reddotcheck7">*</span>대표자명</th>
			<td class="tdl">
				<input type="text" name="R_B_30_20" id="R_B_30_20" size="20" maxlength="200" onblur="check_checkLenth(this, 200);">
			</td>
		    <th class="thl"><span class="reddot" id="reddotcheck8">*</span>주민등록번호</th>
		    <td class="tdle">
				<input type="text" name="R_B_30_30" id="R_B_30_30" size="20" maxlength="13" onblur="check_checkLenth(this, 16);">
			</td>
		</tr>
		<tr>
			<th class="th1"><span class="reddot" id="reddotcheck9">*</span>핸드폰번호</th>
			<td class="tdl">
				<input type="text" name="R_B_30_60_10" id="R_B_30_60_10" size="20" maxlength="20" onblur="check_checkLenth(this, 20);">
			</td>
			<th class="thl"><span class="reddot" id="reddotcheck10">*</span>이메일</th>
			<td class="tdle">
				<input type="text" name="R_B_30_50_20" id="R_B_30_50_20" size="20" maxlength="50" onblur="check_checkLenth(this, 50);">
			</td>
		</tr>	
		</table>
		</div>
	</div>
	
	<div id = "factory_div">	
		<div class="board_title2">
			<h4>[ 공장정보 ]</h4><!-- Factory Information :: 공장정보	 -->
			<em>입력 후 반드시 추가버튼을 클릭해 주세요.</em><!-- Please click the Add button after inputting. :: 입력 후 반드시 추가버튼을 클릭해 주세요.	 -->
			<span class="btn_pack small">
				<a href="javascript:initFactory();">초기화</a><!--Reset :: 초기화	 -->
			</span>
			<span id="factoryAdd" class="btn_pack small">
				<a href="javascript:addFactory();">추가</a><!--add :: 추가 -->
			</span>
		</div>
		
		<div class="table_board1">
		<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
		<col width="143">
		<col width="233">
		<col width="143">
		<col width="233">
		<tr>
			<th class="thl">공장명</th>
			<td class="tdl">
				<input type="text" name="tmp_factory_nm" id="tmp_factory_nm" size="20" maxlength="200" onblur="check_checkLenth(this, 200);">
			</td>
		    <th class="thl">전화번호</th>
		    <td class="tdle">
				<input type="text" name="tmp_factory_tel_no" id="tmp_factory_tel_no" size="20" maxlength="20" onblur="check_checkLenth(this, 20);">
			</td>
		</tr>
		<tr>
			<th class="thl">우편번호</th>
			<td class="tdl">
				<input type="text" name="tmp_factory_post_no" id="tmp_factory_post_no" size="15">				
			</td>
			<th class="thl">팩스번호</th>
			<td class="tdle">
				<input type="text" name="tmp_factory_fax_no" id="tmp_factory_fax_no" size="20" maxlength="20" onblur="check_checkLenth(this, 20);">
			</td>
		</tr>	
		<tr>
			<th rowspan="2" class="thl">주소</th>
			<td colspan="3" class="tdle">
				<input type="text" name="tmp_factory_area" id="tmp_factory_area" size="50">
			</td>
		</tr>
		<tr>
			<td colspan="3" class="tdle">
				<input type="text" name="tmp_factory_addr" id="tmp_factory_addr" size="50" onblur="check_checkLenth(this, 500);">						
			</td>
		</tr>		
		</table>
		</div>
		<div class="table_board2">
		<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
		<col width="5%">
		<col width="20%">
		<col width="15%">
		<col width="15%">
		<col width="15%">
		<col width="20%">
		<col width="10%">
		<tr>
			<th class="thc">NO</th>						
			<th class="thc">공장명</th>
	        <th class="thc">전화번호</th>
	        <th class="thc">팩스번호</th>
	        <th class="thc">우편번호</th>
	        <th class="thc">주소</th>
			<th class="thce">&nbsp;</th>
		</tr> 
		</table>
		<div id="writeFactory">
		</div>
		</div>		
	</div>
	
	<div class="board_title2">
		<h4>[ 물품정보 ]</h4>		
	</div>
    <div class="table_board1">
	<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">       
	<col width="143">
	<col width="233">
	<col width="143">
	<col width="233">
	<tr>
		<th class="thl">UNSPSC Code</th>
		<td class="tdl">
			<input type="text" name="R_B_50_20" id="R_B_50_20" size="15">			
		</td>
		<th class="thl">물품분류명</th>
		<td class="tdle"><input type="text" name="tmp_cate_nm" id="tmp_cate_nm" size="20"></td>
	</tr>
	<tr>
		<th class="thl">제조여부</th>
		<td colspan="3" class="tdle">
			<input type="radio" class="radio" name="tmp_sup_fl" onclick="prodCheck('N')" value="N"> 공급
			<input type="radio" class="radio" name="tmp_sup_fl" onclick="prodCheck('Y')" value="Y"> 제조
			<input type="text" name="R_B_50_30" ID="R_B_50_30">			
	    </td>
	</tr>	
	</table>
	</div>
	
	<div class="board_title2">
		<h4>[ 면허정보 ]</h4>		
	</div>
    <div class="table_board1">
	<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
	<col width="143">
	<col width="233">
	<col width="143">
	<col width="233">
	<tr>
		<th class="thl">면허코드</th>
		<td class="tdl">
			<input type="text" name="R_B_60_20" id="R_B_60_20" size="15">				
		</td>
		<th class="thl">면허명</th>
		<td class="tdle">
			<input type="text" name="tmp_license_nm" id="tmp_license_nm" size="20">
		</td>
	</tr>
	<tr>
		<th class="thl">등록번호</th>
		<td class="tdl">
			<input type="text" name="R_B_60_30" id="R_B_60_30" size="20" maxlength="50" onblur="check_checkLenth(this,50);">
		</td>
	    <th class="thl">취득일자</th>
	    <td class="tdle">
	    	<input type="text" name="R_B_60_60_10" id="R_B_60_60_10" size="10" maxlength="10" class="read" value="" 
			onblur="javascript:check_dateCheck(this,'-');" onFocus="check_removeCharInput(this,'-');" style="WIDTH:80px" >	
                  <a href="#" onclick="Calendar_D('R_B_60_60_10');return false;">
				<img src="/images/cal.gif" alt="calendar"
				width="14" height="14" border="0">
			</a>
		</td>
	</tr>
	<tr>
		<th class="thl">만료일자</th>
		<td class="tdl">
		 	<input type="text" name="R_B_60_60_20" id="R_B_60_60_20" size="10" maxlength="10" class="read" value="" 
			onblur="javascript:check_dateCheck(this,'-');" onFocus="check_removeCharInput(this,'-');" style="WIDTH:80px" >	
                  <a href="#" onclick="Calendar_D('R_B_60_60_20');return false;">
				<img src="/images/cal.gif" alt="calendar"
				width="14" height="14" border="0">
			</a>
		</td>
		<th class="thl">발급기관코드</th>
		<td class="tdl">
			<input type="text" name="R_B_60_40" id="R_B_60_40" size="20" maxlength="7" onblur="check_checkLenth(this,7);">
		</td>
	</tr>
	<tr>
		<th class="thl">발급기관명</th>
		<td class="tdle" colspan="3">
			<input type="text" name="R_B_60_50" id="R_B_60_50" size="20" maxlength="200" onblur="check_checkLenth(this,200);">
		</td>
	</tr>
  	</table>
	</div>
	
	<div class="board_title2">
		<h4>[ 입찰 대리인 정보 ]</h4><!-- Bidding Attorney Information :: 입찰대리인정보	 -->
	</div>
    <div class="table_board1">
	<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
	<col width="143">
	<col width="233">
	<col width="143">
	<col width="233">
	<tr>
		<th class="thl">담당자명</th>
		<td class="tdl">
			<input type="text" name="R_B_70_20" id="R_B_70_20" size="20"  maxlength="200" onblur="check_checkLenth(this,200);">
		</td>
	    <th class="thl">주민등록번호</th>
	    <td class="tdle">
			<input type="text" name="R_B_70_30" id="R_B_70_30" size="20"  maxlength="13"  onblur="check_checkLenth(this,16);">
		</td>
	</tr>
	<tr>
	    <th class="thl">직책</th>
	    <td class="tdl">
			<input type="text" name="R_B_70_40" id="R_B_70_40" size="20"  maxlength="200"  onblur="check_checkLenth(this,200);">
		</td>
		<th class="thl">전화번호</th>
		<td class="tdle">
			<input type="text" name="R_B_70_50_20_10" id="R_B_70_50_20_10" size="20"  maxlength="20" onblur="check_checkLenth(this,20);">
		</td>
	</tr>
	<tr>
	    <th class="thl">팩스번호</th>
		<td class="tdl">
			<input type="text" name="R_B_70_50_30_10" id="R_B_70_50_30_10" size="20"   maxlength="20" onblur="check_checkLenth(this,20);">
		</td>
		<th class="thl">핸드폰번호</th>
		<td class="tdle">
			 <input type="text" name="R_B_70_50_40_10" id="R_B_70_50_40_10" size="20"  maxlength="20" onblur="check_checkLenth(this,20);">
		</td>
	</tr>
	<tr>
	    <th class="thl">이메일</th>
		<td colspan="3" class="tdle">
			<input type="text" name="R_B_70_50_40_20" id="R_B_70_50_40_20" size="20"  maxlength="50" onblur="check_checkLenth(this,50);">
		</td>
	</tr>
	</table>
	</div>
	
	<div class="board_title">
		<h4>[ 접수정보 ]</h4><!-- Receipt Information :: 접수정보	 -->
	</div> 
    <div class="table_board1">
	<table width="100%" summary="" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
	<col width="143">		
	<col width="623">		
	<tr>
		<th class="thl">이메일</th>
		<td class="tdle">
			<input type="text" name="R_B_20_10_20" id="R_B_20_10_20" size="20" maxlength="50" onblur="check_checkLenth(this,50);">
		</td>
	</tr>
	</table>
	</div>
	<div class="btn_div">
		<span class="button small blue" style="float:right; clear:both;">
   			<a href="javascript:makeXML();"><em>XML 작성</em></a><!-- Application Registration  :: 등록신청	 -->
   		</span>
   	</div>   	
	</form>
</div>  
</body>
</html> 


