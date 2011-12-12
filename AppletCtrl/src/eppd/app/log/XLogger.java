
package eppd.app.log;

import java.io.*;
import java.util.Calendar;

import eppd.app.util.DirManager;
import eppd.app.util.StringUtil;

public class XLogger
{
	private static String logFileFormat = "PPS_%1$tY%1$tm%1$td.log";
	private static String logMessageFormat = "[%1$tS:%1$tM:%1$tH %1$td-%1$tm-%1$tY] ";
	private static String lineSeparator = System.getProperty("line.separator");
	    
    public XLogger()
    {
    }

    public boolean LogSave(String message)
    {
    	boolean retval;
    	Calendar cal;
        
        FileOutputStream fos = null;
        DataOutputStream dos = null;
          
        File logDir = null;
        File logFile = null;
        String fileName = null;
        String msgFormat = null;
        
        try
        {
        	cal = Calendar.getInstance();
	        logDir = DirManager.getDirLog();
	     
	        fileName = getLogFileName(cal);
	        msgFormat = String.format(logMessageFormat, new Object[] { cal });
	        logFile = new File((new StringBuilder()).append(logDir).append(DirManager.fileSeparator).append(fileName).toString());
	        if(!logFile.exists())
	            logFile.createNewFile();
	        
	        fos = new FileOutputStream(logFile, true);
			dos = new DataOutputStream(fos);
			dos.writeBytes(new String(msgFormat+StringUtil.utf8Toasc(message)+lineSeparator));

			fos.flush();
			retval = true;
	        
		} catch (UnsupportedEncodingException e) {		    
		    retval = false;
		} catch(FileNotFoundException e) {			
			retval = false;
		} catch(IOException e) {			
			retval = false;
		} catch(Exception e) {
			retval = false;
		} finally{
			try{ if(fos != null){ fos.close(); fos=null;}} catch(Exception exf){}
			try{ if(dos != null){ dos.close(); dos=null;}} catch(Exception exf){}
			try{ if(logFile != null){ logFile = null;}} catch(Exception exf){}
		}
		return retval;
    }

    public String getLogFileName()
    {
        Calendar cal = Calendar.getInstance();
        String fileName = null;
        fileName = String.format(logFileFormat, new Object[] {
            cal
        });
        return fileName;
    }

    public String getLogFileName(Calendar cal)
    {
        if(cal == null)
        {
            return null;
        } else
        {
            String fileName = null;
            fileName = String.format(logFileFormat, new Object[] {
                cal
            });
            return fileName;
        }
    }

    public String getLogMessageFormat()
    {
        Calendar cal = Calendar.getInstance();
        String msgFormat = null;
        msgFormat = String.format(logMessageFormat, new Object[] {
            cal
        });
        return msgFormat;
    }

    public String getLogMessageFormat(Calendar cal)
    {
        if(cal == null)
        {
            return null;
        } else
        {
            String msgFormat = null;
            msgFormat = String.format(logMessageFormat, new Object[] {
                cal
            });
            return msgFormat;
        }
    }

   
}
