/**
  * @comment_en Loading image
  * @comment_ko Loading image
  *
  * History: 1.0.0(2011.03.10 -( Jeong Jin Kook)) Version initial
  */

//dhtmlmodal.waiting();
function WaitingShow(){         
    document.getElementById('Waiting').style.visibility = ("visible");
}
function WaitingHide(){ 
    document.getElementById('Waiting').style.visibility = ("hidden");
}
function dClose(){
	dhtmlmodal.closeveil();
}
function WaitingClose(){
	WaitingHide();
	dClose();
}
