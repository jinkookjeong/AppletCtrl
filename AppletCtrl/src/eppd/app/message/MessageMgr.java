package eppd.app.message;

public class MessageMgr {

	MessageKo ko = null;
	MessageEn en = null;
	MessageFr fr = null;
	MessageAr ar = null;
	
    public MessageMgr()
    {
      ko = new MessageKo();
      en = new MessageEn();
      fr = new MessageFr();
      ar = new MessageAr();
    }
    
	public String getMessage(String lang, String key)
	{
	   String langValue ="";
	   if(lang.equals("ko"))
	   {
		  langValue = ko.koLangMap.get(key); 
	   }else if(lang.equals("en")){
		  langValue = en.enLangMap.get(key); 
	   }else if(lang.equals("fr")){
		  langValue = fr.frLangMap.get(key); 
	   }else{
		  langValue = ar.arLangMap.get(key); 
	   }
	   
	   return langValue;
	}
}
