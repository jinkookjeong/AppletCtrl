package eppd.app.message;

import javax.swing.JOptionPane;

public class MessageBox {

	  public static void AfxMessage(String message, String title, int type)
	  {
		  switch(type)
	       {
	        case 0:	
	        	JOptionPane.showMessageDialog(null, message, title, JOptionPane.ERROR_MESSAGE);
	        	break;
	        case 1:
	        	JOptionPane.showMessageDialog(null, message, title, JOptionPane.INFORMATION_MESSAGE);
	        	break;
	        case 2:
			    JOptionPane.showMessageDialog(null, message, title, JOptionPane.WARNING_MESSAGE);
			    break;
	        case 3:	
	        	JOptionPane.showMessageDialog(null, message, title, JOptionPane.QUESTION_MESSAGE);
	        	break;
            default:
            	JOptionPane.showMessageDialog(null, message, title, JOptionPane.INFORMATION_MESSAGE);
        		break;
	       }
	  }
		  
	  public static int AfxComfirmMessage(String message)
	  {   
          return JOptionPane.showConfirmDialog(null, message, "Information", 
			                                   JOptionPane.OK_CANCEL_OPTION,JOptionPane.QUESTION_MESSAGE );
	  }
}
