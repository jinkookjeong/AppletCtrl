package eppd.app.window;


import java.awt.*;
import java.awt.event.*;
import java.net.URL;
import java.util.*;
import javax.swing.*;
import javax.swing.border.TitledBorder;
import javax.swing.plaf.ColorUIResource;

import eppd.app.message.MessageBox;

public class FirstScreen implements MouseListener
{
    private int timerClock;
    private int timerLength;
    private JProgressBar progBar;
    private static Class m_class = null;
    private JTextArea area = null;
    JLabel percentLabel = null;
    int width = 340;//530;
    int height = 210;//300;
    Color red = new Color(214, 12, 8);
    Color blue = new Color(41, 121, 181);
    Color dark = new Color(41, 36, 41);
    Color white = new Color(255, 255, 255);
    JWindow win = null;
    //JPanel content = null;
    JFrame frame = null;
    
    private static Class getMyClass()
    {
      try{
          m_class = Class.forName("eppd.app.window.FirstScreen");
          return m_class;
      }catch(Exception e){
          e.printStackTrace();
          return null;
      }        
    }
    
    public static ImageIcon getMapImage( String name ){

        Class class_ = getMyClass();

        URL url_ = class_.getResource("images/"+name);
        System.out.println("url_"+url_);
        ImageIcon icon = new ImageIcon(url_);
        return icon;

     }
    
    public FirstScreen(int numSecs) 
    {
        this.timerLength = numSecs * 1000;
        this.timerClock = 0;
       
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());      
          }
          catch(Exception e) { 
            e.printStackTrace();
          }
          
        Dimension screen = Toolkit.getDefaultToolkit( ).getScreenSize( );
        int x = (screen.width-width)/2;
        int y = (screen.height-height)/2;

        frame = new JFrame();     // remove menu bar and title bar     
    	frame.setUndecorated(true);     
    	frame.setVisible(true);
    	win = new JWindow(frame); // this works     
    	
    	win.setBounds(x,y,width,height);
    	//setBounds(x,y,width,height);
        //UIManager.put("ProgressBar.selectionBackground", new ColorUIResource(Color.BLACK));
        //UIManager.put("ProgressBar.selectionForeground", new ColorUIResource(Color.BLACK));

        this.progBar = new JProgressBar(JProgressBar.CENTER, 0, 100);
        //progBar.setIndeterminate(false);
        progBar.setString("Initializing Property Manager Please Wait...");
        progBar.setStringPainted(true);
        progBar.setForeground(red);       
        progBar.setBackground(Color.LIGHT_GRAY);        
        progBar.setFont(new Font("Arial", Font.BOLD, 12));
        //progBar.setBorder(BorderFactory.createLineBorder(dark, 0));
        progBar.setBorderPainted(true);
        
        //JPanel win = (JPanel)getContentPane();
        win.setLayout(new BorderLayout());        
        win.setBackground(white);
        JPanel winPan = (JPanel)win.getContentPane();
        winPan.setBorder(BorderFactory.createLineBorder(dark, 3));
 
        //content.addKeyListener(this);        
        //content.setFocusable(true);
            
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
        			int retval = MessageBox.AfxComfirmMessage("Are you sure you want to quit?");
        			if(retval == 0)
        			{		
        				win.setVisible(false);
        				win.dispose();
        				frame.dispose();
        				
        				//System.exit(0);
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
    
    public JPanel getTopPanel()
    {
    	Color blue = new Color(41, 121, 181);
    	 
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
    
    public JPanel getStopImagePanel(){

        JPanel imagepanel = new JPanel(new BorderLayout());
        JLabel label = new JLabel(getMapImage("stop.jpg"));
        label.setToolTipText("stop");
        imagepanel.add( label, "Center" );
        imagepanel.setBackground(white);
        
        label.addMouseListener(this);  
        
        return imagepanel;
    }
    
    public JPanel getContentPanel(){
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
        JLabel label = new JLabel(getMapImage("tLog.jpg"));
        imagepanel.add( label, "West" );
        imagepanel.setBackground(white);
        
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
        
        area = new JTextArea(10, 5);
        //JTextArea textArea = new JTextArea(10, 5);
		JScrollPane scrollpane = new JScrollPane(area);
		scrollpane.setAutoscrolls(true);
		scrollpane.setBackground(Color.WHITE);
		
        area.setFont(new Font("Arial,굴림", Font.PLAIN,12));
        area.setBackground(white);
        //area.setAutoscrolls(true);
        
        PercentPanel.setPreferredSize(new Dimension(200,50));
        PercentPanel.setBackground(white);
        PercentPanel.add(percentLabel);
        
        textPanel.add(area,BorderLayout.CENTER);
    	
        panel.add(PercentPanel,BorderLayout.NORTH);
        panel.add(textPanel,BorderLayout.CENTER);
    	
    	return panel;
    }
    
        
    public void showSplash( ) 
    {
    	win.setVisible(true);

        //for(  timerClock = 0; timerClock < timerLength; timerClock += 10 )
        for(int i=0; i<=100; i++)
        {
            progBar.setValue(i);
            	
            progBar.setString("Electronic Document is being Transmitted...");
            percentLabel.setText("Process is ["+i+"%]\n ");
            String msg = "20111202213502.14431.mime";
            String subMsgId = msg.substring(0,msg.indexOf(".")+1);
            area.setText("2002 يتعلق بتنظيم \nالصفقات العمومية\n (التنقيحات اللاحقة أدرجت)");
          
            try
            {
                Thread.sleep(5);
            }
            catch(Exception e){}
        }
        //System.exit(0);
    }

    public void showSplashAndClose( ) 
    {
    	System.out.println("showSplashAndClose");
        showSplash( );
        win.dispose();
    }

    public static void main(String[] args) 
    {
        FirstScreen splash = new FirstScreen(5);
        splash.showSplash();
    }

    public static void main2(String[] args) {     
    	JFrame frame = new JFrame();     // remove menu bar and title bar     
    	frame.setUndecorated(true);     
    	frame.setVisible(true);
    	JWindow window = new JWindow(frame); // this works     
    	window.setBounds(0, 50, 200, 200);     
    	window.setVisible(true);
    }
    
	public void mouseClicked(MouseEvent e) {
		
		
	}

	public void mouseEntered(MouseEvent e) {		
		
	}

	public void mouseExited(MouseEvent e) {	
	}

	public void mousePressed(MouseEvent e) {
		int retval = MessageBox.AfxComfirmMessage("Are you sure you want to quit?");
		if(retval == 0)
		{	
			win.setVisible(false); 
			win.dispose();
			 frame.dispose();
			//System.exit(1);
		}
	}

	public void mouseReleased(MouseEvent e) {		
		
	}

}
