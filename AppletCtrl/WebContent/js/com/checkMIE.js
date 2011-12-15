/**
  * @comment_en IE version check/ if client browser is not Explorer, redirect to error page
  * @comment_ko IE 버젼 체크, Explorer가 아닌 경우 에러페이지 호출
  *
* History: 1.0.0(2011.03.10 -(Jeong Jin Kook)) Version initial
  */

if (navigator.appName != 'Microsoft Internet Explorer'){
	location="/inform/informActiveX.jsp";
}