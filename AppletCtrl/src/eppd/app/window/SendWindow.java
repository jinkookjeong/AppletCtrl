package eppd.app.window;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.IOException;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;

import javax.swing.AbstractAction;
import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JTextArea;
import javax.swing.JWindow;
import javax.swing.KeyStroke;
import javax.swing.UIManager;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;

import netscape.javascript.JSObject;

import org.xml.sax.SAXException;

import oracle.xml.parser.v2.DOMParser;
import oracle.xml.parser.v2.XMLDocument;
import oracle.xml.parser.v2.XMLParseException;

import eppd.app.connection.ObjectConnection;
import eppd.app.log.XLogger;
import eppd.app.message.HttpRequestVO;
import eppd.app.message.MessageBox;
import eppd.app.message.MessageMgr;
import eppd.app.message.XmlConstant;
import eppd.app.util.IOUtil;
import eppd.app.util.StringUtil;
import eppd.app.util.XMLUtil;

public class SendWindow implements MouseListener
{
  private SendThread sendThread = null;
  private Thread m_thread = null;
  
  public XmlConstant cont = null;
  public ObjectConnection Ocon = null;
  public String DocCode = "";
  public String formName = "";
  public JSObject jsWin = null;
  public XLogger logger = null;
  public String lang = "";
  public String encSign = "";
  public MessageMgr langMgr = null; 
  
  public JProgressBar progBar;
  private static Class m_class = null;
  public JTextArea sendMsg = null;
  private String imageName = "tLog.jpg";
  public JLabel percentLabel = null;
  public JWindow win = null;
  public JFrame frame = null;
  int width = 340;
  int height = 210;

  boolean sendStatus = false;
  public int pos = 0; 
  
  Color red = new Color(214, 12, 8);
  Color blue = new Color(41, 121, 181);
  Color dark = new Color(41, 36, 41);
  Color white = new Color(252, 252, 252);
  
  public SendWindow()
  {	
	  doModal();
	  win.setVisible(true);
  }
    
  public SendWindow(String DocCode, String encSign, String formName,
		  JSObject win, ObjectConnection Ocon, XLogger logger, MessageMgr langMgr, String lang)
  {    
		this.DocCode = DocCode;
		this.encSign = encSign;
		this.formName = formName;
		this.jsWin = win;
		this.Ocon = Ocon;
		this.logger = logger;		
		this.lang = lang;		
		this.langMgr = langMgr;
  }
  
  public XmlConstant sendXmlFile() throws IOException, Exception
  {
      doModal();
      
	  sendThread = new SendThread(this);
	  m_thread = new Thread(sendThread);
      m_thread.start();
      while(m_thread.isAlive()) 
      try
      {
    	  m_thread.sleep(1000L);
      }catch(InterruptedException interruptedexception){
         interruptedexception.printStackTrace();
      }
	  
      stop();
      doModalClose();
            
      return cont;
	}

   public void doModal() 
   {  
	   frame = new JFrame();     // remove menu bar and title bar     
	   frame.setUndecorated(true);    
	   frame.setVisible(true);
	   win = new JWindow(frame); // this works    
	   win.setVisible(true);
	   
       Dimension screen = Toolkit.getDefaultToolkit( ).getScreenSize( );
       int x = (screen.width-width)/2;
       int y = (screen.height-height)/2;
       win.setBounds(x,y,width,height);
       
       this.progBar = new JProgressBar(JProgressBar.CENTER, 0, 100);
       String sendLang = (langMgr.getMessage(lang, "1043"));
	   
       progBar.setString(sendLang);
       progBar.setStringPainted(true);
       progBar.setForeground(red);       
       progBar.setBackground(Color.LIGHT_GRAY);        
       progBar.setFont(new Font("Arial", Font.BOLD, 12));
       progBar.setBorderPainted(true);
       	   
       JPanel winPan = (JPanel)win.getContentPane();
       winPan.setBorder(BorderFactory.createLineBorder(dark, 3));
       win.setLayout(new BorderLayout());        
       win.setBackground(white);
       win.add(getTopPanel(), BorderLayout.NORTH);
       win.add(getContentPanel(), BorderLayout.CENTER);
       win.add(getProgressPanel(), BorderLayout.SOUTH);
       win.setFocusableWindowState(true); 
       win.setFocusable(true);
       
       win.addKeyListener(new KeyListener() {             
       	public void keyPressed(KeyEvent e) {                 
       		int escape = e.getKeyCode();
       		if(escape == 27)
       		{
       			if(m_thread != null){
       				if(isSendStatus()){ //true 막 전송전이라 멈출 수 있다
       					m_thread.suspend();
       					int retval = MessageBox.AfxComfirmMessage("Are you sure you want to quit?");
       					if(retval == 0)
       					{
       						stop();     
       						doModalClose();
       					}
       					else{
       						m_thread.resume();
       					}				
       				}else{ //이미 전송해서 멈출 수 없다.	
       					
       					MessageBox.AfxMessage(langMgr.getMessage(lang, "1036"),langMgr.getMessage(lang, "Title"),JOptionPane.INFORMATION_MESSAGE);
       					return;
       				}
       			}else{
       				MessageBox.AfxMessage(langMgr.getMessage(lang, "1037"),langMgr.getMessage(lang, "Title"),JOptionPane.INFORMATION_MESSAGE);
       				return;
       			}
       		}
       	}              
       	public void keyReleased(KeyEvent e) {
       	}              
       	public void keyTyped(KeyEvent e) {             
       	}          
       	}
       );
       
   }
   
   private void doModalClose()
   {
      win.setVisible(false);
      win.dispose();
      frame.dispose();
      
   }
   
   public JPanel getTopPanel()
   {
   	JPanel panel = new JPanel(new BorderLayout());    	
   	panel.setPreferredSize(new Dimension(200,25));
   	panel.setBackground(white);
   	panel.setForeground(white);
   	
   	TitledBorder title = new TitledBorder( BorderFactory.createLineBorder(Color.GRAY) );
   	panel.setBorder( title );
   	
   	JLabel label = new JLabel();
	label.setFont(new Font("Arial", Font.BOLD, 16));
	label.setText("E-Procurement System");
	label.setPreferredSize(new Dimension(200,15));
	label.setForeground(dark);
   	   	
   	JPanel tPanel = new JPanel(new BorderLayout());
   	tPanel.setPreferredSize(new Dimension(200,0));
   	tPanel.setBackground(blue);
   	
   	JPanel ePanel = new JPanel(new BorderLayout());
   	ePanel.setPreferredSize(new Dimension(130,15));
   	ePanel.setBackground(white);
   	
   	panel.add(tPanel,BorderLayout.NORTH);
   	panel.add(ePanel,BorderLayout.WEST);
   	panel.add(label,BorderLayout.CENTER);
   	panel.add(getStopImagePanel(),BorderLayout.EAST);
	
   	
   	return panel;
   }
   
   public JPanel getContentPanel()
   {
   	 JPanel panel = new JPanel(new BorderLayout());
   	 TitledBorder title = new TitledBorder( BorderFactory.createLineBorder(Color.GRAY) );
   	 panel.setBorder( title );
   	
   	 panel.setBackground(white);
   	
   	 panel.add(getWestImagePanel(), BorderLayout.WEST);
   	 panel.add(getProcesPanel(), BorderLayout.CENTER);
         
   	 return panel;
   }
   
   public JPanel getWestImagePanel(){

       JPanel imagepanel = new JPanel(new BorderLayout());
       JLabel label = new JLabel(getMapImage(imageName));
       imagepanel.add( label, "West" );
       imagepanel.setBackground(white);
       
       return imagepanel;
   }
   
   public JPanel getStopImagePanel(){

       JPanel imagepanel = new JPanel(new BorderLayout());
       JLabel label = new JLabel(getMapImage("stop.jpg"));
       label.setToolTipText("stop");
       imagepanel.add( label, "Center" );
       imagepanel.setBackground(white);
       
       label.addMouseListener(this);  
       
       return imagepanel;
   }
   
   public JPanel getProgressPanel(){
   	   JPanel panel = new JPanel(new BorderLayout());
   	   panel.add(progBar, BorderLayout.CENTER);
   	   panel.setPreferredSize(new Dimension(340, 25));
   	   panel.setBackground(white);
        
        return panel;
   }
   
   public JPanel getProcesPanel()
   {
   	   JPanel panel = new JPanel(new BorderLayout());
   	
   	   JPanel PercentPanel = new JPanel(new BorderLayout());
   	   JPanel textPanel = new JPanel(new BorderLayout());
   	   percentLabel = new JLabel();
   	   percentLabel.setFont(new Font("Arial", Font.BOLD, 15));
   	   percentLabel.setBackground(white);
   	   percentLabel.setForeground(blue);
       
	   sendMsg = new JTextArea();
	   sendMsg.setFont(new Font("Arial,굴림", Font.PLAIN,12));
	   sendMsg.setBackground(white);
       
       PercentPanel.setPreferredSize(new Dimension(200,50));
       PercentPanel.setBackground(white);
       PercentPanel.add(percentLabel);
       
       textPanel.add(sendMsg,BorderLayout.CENTER);
   	
       panel.add(PercentPanel,BorderLayout.NORTH);
       panel.add(textPanel,BorderLayout.CENTER);
   	
   	return panel;
   } 
   
   private static Class getMyClass()
   {
     try{
         m_class = Class.forName("eppd.app.window.SendWindow");
         return m_class;
     }catch(Exception e){
         e.printStackTrace();
         return null;
     }        
   }
   
   public static ImageIcon getMapImage( String name )
   {
       Class class_ = getMyClass();

       URL url_ = class_.getResource("images/"+name);
       ImageIcon icon = new ImageIcon(url_);
       return icon;

    }
   
   public void setProgress(int val)
   {   
	   pos = val;
       progBar.setValue(val);
       setPercentLabel(val);
   }
   
   public int getProgress()
   {
       return pos;
   }
   
   public void setProgressRange(int i)
   {
	   progBar.setMinimum(0);
	   progBar.setMaximum(i);
   }
   
   public boolean isSendStatus() {
		return sendStatus;
	}

	public void setSendStatus(boolean sendStatus) {
		this.sendStatus = sendStatus;
	}
	
   public void stop(){
	   m_thread.stop();	 
   }
   
   private void setPercentLabel(int p){
	   percentLabel.setText("Process is ["+p+"%]");	   
   }
   
   public void setStatusMessage(String msg){
	   sendMsg.setText(msg);	   
   }
   
   public void setStatusMapMessage(String key)
   {
       sendMsg.setText(langMgr.getMessage(lang, key));	   
   }
  
	public void mouseClicked(MouseEvent e) {
	}	
	public void mouseEntered(MouseEvent e) {
	}	
	public void mouseExited(MouseEvent e) {
	}	
	public void mousePressed(MouseEvent e) {

		if(m_thread != null){
			if(isSendStatus()){ //true 막 전송전이라 멈출 수 있다
				m_thread.suspend();
				int retval = MessageBox.AfxComfirmMessage("Are you sure you want to quit?");
				if(retval == 0)
				{
					stop();     
					doModalClose();
				}
				else{
					m_thread.resume();
				}				
			}else{ //이미 전송해서 멈출 수 없다.				
				MessageBox.AfxMessage(langMgr.getMessage(lang, "1036"),langMgr.getMessage(lang, "Title"),JOptionPane.INFORMATION_MESSAGE);				
			}
		}else{
			MessageBox.AfxMessage(langMgr.getMessage(lang, "1037"),langMgr.getMessage(lang, "Title"),JOptionPane.INFORMATION_MESSAGE);
		
		}
	}
	public void mouseReleased(MouseEvent e) {
	}
	
	public static void main(String[] args)
    {
	   SendWindow sWin = new SendWindow();	  
    }
}
