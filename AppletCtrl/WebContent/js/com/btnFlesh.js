/**
* @comment_en Prevent system from repeated requirement of HTTP for IE 6 users (Monitor flicker prevention)
* @comment_ko IE6이하 사용자의 불필요한 HTTP 반복요청을 방지해준다.(화면깜박임방지)
*
* History: 1.0.0(2011.03.10 -( Jeong Jin Kook)) Version initial
*/

try {document.execCommand("BackgroundImageCache",false,true);}catch(e){}