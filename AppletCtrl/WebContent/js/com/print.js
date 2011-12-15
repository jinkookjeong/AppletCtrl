/**
  * @comment_en Script for applying stylesheet of XML
  * @comment_ko 전자문서의 스타일 시트 적용을 위한 스크립트
  *
  * History: 1.0.0(03.08.2009-(Jeong Jin Kook)) Version initial
  */
function js_Print(Header, Xslnm)
{
	var oReport = GetfnParamSet("0");

	oReport.rptname = Header + "/" + Header;

	oReport.con("XML2").type = "memo";
	oReport.con("XML2").datatype = "xml";
	//oReport.con("XML2").xpath = "rsm:ConsetDocument";

	var strXml = tmpid.xml.replace('<?xml version="1.0"?>','');
	oReport.con("XML2").data = strXml.replace('<?xml-stylesheet type="text/xsl" href="http://www.mer-link.co.cr:8080/servlet/exms.edocs.svc.ED_DCV_XSL001?nm=' + Xslnm + '.xsl"?>','');
	oReport.con("XML2").httpparam("datatype").value = "xml";

	oReport.event.init = fnReportEvent;

	oReport.open();
}

function fnReportEvent(oRexCtl, sEvent, oArgs) {
  if (sEvent == "init") {
	oRexCtl.SetCSS("appearance.toolbar.button.open.visible=0");
	oRexCtl.SetCSS("appearance.toolbar.button.export.visible=0");
	oRexCtl.SetCSS("appearance.toolbar.button.refresh.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.movefirst.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.moveprev.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.pagenumber.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.pagecount.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.movenext.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.movelast.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.zoom.visible=1");
	oRexCtl.SetCSS("appearance.toolbar.button.exportxls.visible=0");
	oRexCtl.SetCSS("appearance.toolbar.button.exportpdf.visible=0");
	oRexCtl.SetCSS("appearance.toolbar.button.exporthwp.visible=0");
	oRexCtl.SetCSS("appearance.toolbar.button.about.visible=0");
    oRexCtl.UpdateCSS();
  }
}