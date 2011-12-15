/**
  * @comment_en Script for supporting every pop-up window
  * @comment_ko 각종 팝업창을 지원하는 스크립트
  *
  * History: 1.0.0(03.08.2009-(Jeong Jin Kook)) Version initial
  */

function popup_openWindow(url, options){
    if(options == undefined)
        options = "";

    var regex_name          = new RegExp("\w*name:([_0-9a-zA-Z]*)", "i");
    var regex_width         = new RegExp("\w*width:([0-9a-zA-Z]*)", "i");
    var regex_height        = new RegExp("\w*height:([0-9a-zA-Z]*)", "i");
    var regex_left          = new RegExp("\w*left:([0-9a-zA-Z]*)", "i");
    var regex_top           = new RegExp("\w*top:([0-9a-zA-Z]*)", "i");
    var regex_menubar       = new RegExp("\w*menubar:([0-9a-zA-Z]*)", "i");
    var regex_toolbar       = new RegExp("\w*toolbar:([0-9a-zA-Z]*)", "i");
    var regex_status        = new RegExp("\w*status:([0-9a-zA-Z]*)", "i");
    var regex_resizable     = new RegExp("\w*resizable:([0-9a-zA-Z]*)", "i");
    var regex_location      = new RegExp("\w*location:([0-9a-zA-Z]*)", "i");
    var regex_scrollbars    = new RegExp("\w*scrollbars:([0-9a-zA-Z]*)", "i");

    var name = regex_name.exec(options) != null ? regex_name.exec(options)[1] : "";
    var width = regex_width.exec(options) != null ? regex_width.exec(options)[1] : "800";
    var height = regex_height.exec(options) != null ? regex_height.exec(options)[1] : "600";
    var left = regex_left.exec(options) != null ? regex_left.exec(options)[1] : ((window.screen.availWidth - parseInt(width, 10))/2)||0;
    var top = regex_top.exec(options) != null ? regex_top.exec(options)[1] : ((window.screen.availHeight - parseInt(height, 10))/2)||0;
    var menubar = regex_menubar.exec(options) != null ? regex_menubar.exec(options)[1] : "no";
    var toolbar = regex_toolbar.exec(options) != null ? regex_toolbar.exec(options)[1] : "no";
    var status = regex_status.exec(options) != null ? regex_status.exec(options)[1] : "no";
    var resizable = regex_resizable.exec(options) != null ? regex_resizable.exec(options)[1] : "yes";
    var location = regex_location.exec(options) != null ? regex_location.exec(options)[1] : "no";
    var scrollbars = regex_scrollbars.exec(options) != null ? regex_scrollbars.exec(options)[1] : "no";

    var optionText = "top="+top;
    optionText += ",left="+left;
    optionText += ",width="+width;
    optionText += ",height="+height;
    optionText += ",menubar="+menubar;
    optionText += ",toolbar="+toolbar;
    optionText += ",status="+status;
    optionText += ",resizable="+resizable;
    optionText += ",location="+location;
    optionText += ",scrollbars="+scrollbars;

    var win = window.open(url, name, optionText)
    win.focus();
    return win;
}


var IE = (document.all ? true : false);
var doc = (IE ? document.all : document);

function popup_openWindow(url, width, height)
{
	var urlOpt = "scrollbars=no, resizable=yes, copyhistory=no, width=" + width + ",height=" + height + ", left=50, top=50";
	window.open(url, 'popup', urlOpt);
}

function popup_openWindowFixed(url, width, height)
{
	var urlOpt = "scrollbars=no, resizable=no, copyhistory=no, width=" + width + ",height=" + height + ", left=50, top=50";
	window.open(url, 'popup1', urlOpt);
}

function popup_openWindowScroll(url, width, height)
{
	var urlOpt = "scrollbars=yes, resizable=yes, copyhistory=no, width=" + width + ",height=" + height + ", left=50, top=50";
	window.open(url, 'popup2', urlOpt);
}

function popup_sopenWindow(url, width, height, popupName)
{
	var urlOpt = "scrollbars=no, resizable=yes, copyhistory=no, width=" + width + ",height=" + height + ", left=50, top=50";
	window.open(url, popupName, urlOpt);
}

function popup_openWindowFixed(url, width, height, popupName)
{
	var urlOpt = "scrollbars=no, resizable=no, copyhistory=no, width=" + width + ",height=" + height + ", left=50, top=50";
	window.open(url, popupName, urlOpt);
}

function popup_openWindowScroll(url, width, height, popupName)
{
	var urlOpt = "scrollbars=yes, resizable=yes, copyhistory=no, width=" + width + ",height=" + height + ", left=50, top=50";
	window.open(url, popupName, urlOpt);
}

function popup_openWindowPos(url, width, height, popupName, left, top)
{
	var urlOpt = "scrollbars=no, resizable=yes, copyhistory=no, width=" + width + ",height=" + height + ", left=" + left + ", top=" + top + " ";
	window.open(url, popupName, urlOpt);
}

function popup_openWindowFixedPos(url, width, height, popupName, left, top)
{
	var urlOpt = "scrollbars=no, resizable=no, copyhistory=no, width=" + width + ",height=" + height + ", left=" + left + ", top=" + top;
	window.open(url, popupName, urlOpt);
}

function popup_openWindowScrollPos(url, width, height, popupName, left, top)
{
	var urlOpt = "scrollbars=yes, resizable=yes, copyhistory=no, width=" + width + ",height=" + height + ", left=" + left + ", top=" + top;
	window.open(url, popupName, urlOpt);
}

function popup_openWindowMsg(url, width, height, popupName)
{
	var urlOpt = "status=yes, resizable=yes, scrollbars=no, toolbar=no, width=" + width + ", height=" + height + ", left=" + (screen.width-width)/ 2 + ", top="+(screen.height-height)/2;
	window.open(url, popupName, urlOpt);
}

function popup_openWindowScrollMsg(url, width, height, popupName)
{
	var urlOpt = "status=yes, resizable=yes, scrollbars=yes, toolbar=no, width=" + width + ", height=" + height + ", left=" + (screen.width-width)/ 2 + ", top="+(screen.height-height)/2;
	window.open(url, popupName, urlOpt);
}

function popup_getIEVersion() 
{
	var IEVersion = 0;
//var browserName = navigator.appName;
	var idx = navigator.appVersion.indexOf("MSIE");
	
	if (idx > -1) {	IEVersion = parseFloat(navigator.appVersion.substr(idx + 4)); }

	return IEVersion;
}