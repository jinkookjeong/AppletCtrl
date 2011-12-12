package eppd.app.util;

import java.io.File;
import java.util.*;

public class DirManager
{
	private static final HashMap systemProperties;
    public static final String workingHome;
    public static final String fileSeparator = System.getProperty("file.separator");
    public static final String pathSeparator = System.getProperty("path.separator");
    public static final String lineSeparator = System.getProperty("line.separator");
    public static final String ioTempDir = System.getProperty("java.io.tmpdir");
    public static final String userName = System.getProperty("user.name");
    public static final String userHome = System.getProperty("user.home");
    public static final String userCountry = System.getProperty("user.country");
    public static final String userLanguage = System.getProperty("user.language");
    public static final String vmVendor = System.getProperty("java.vm.specification.vendor");
    public static final String libraryPath = System.getProperty("java.library.path");
    public static final String classPath = System.getProperty("java.class.path");
    public static final String javaHome = System.getProperty("java.home");
    public static final String javaVersion = System.getProperty("java.version");
    public static final String javaSpecVersion = System.getProperty("java.specification.version");
    public static final String osName = System.getProperty("os.name");
    public static final String osVersion = System.getProperty("os.version");
    public static final String osArch = System.getProperty("os.arch");
    public static final String windowsXp = "Windows XP";
    public static final String windows95 = "Windows 95";
    public static final String windows2000 = "Windows 2000";
    public static final String windows2003 = "Windows 2003";
    public static final String windowsMe = "Windows ME";
    public static final String windowsVista = "Windows vista";
    public static final String windows7 = "Windows 7";
    public static final String windows8 = "Windows 8";
    public static final String windows = "Windows";
    public static final String linux = "Linux";
    public static final String mac = "Mac";
    
    public static final String localLow = (new StringBuilder(String.valueOf(System.getProperty("user.home")))).append(System.getProperty("file.separator")).append("AppData").append(System.getProperty("file.separator")).append("LocalLow").toString();
    public static final String localLowXp = (new StringBuilder(String.valueOf(System.getProperty("user.home")))).append(System.getProperty("file.separator")).append("Application Data").toString();
    
    public static final String homeDir = "PPS";
    public static final String attachDir = "attach";
    public static final String soapDir = "soap";
    public static final String eSoapDir = "esoap";
    public static final String xmlDir = "xml";
    public static final String receiveDir = "receive";
    public static final String saveDir = "send";
    public static final String logDir = "log";
    
    private static final File dirWorking;
    private static final File dirLog;
    private static final File dirXml;
    private static final File dirSend;
    
    private static final File dirAttach;
    private static final File dirSoap;
    private static final File dirEsoap;
    private static final File dirReceive;
    
    private static boolean VISTA = false;
    private static boolean WIN7 = false;
    private static boolean WINDOWS = false;

    static 
    {
        HashMap sysMap = new HashMap();
        Properties sys = System.getProperties();
        String pName = null;
        String pValue = null;
        for(Enumeration e = sys.propertyNames(); e.hasMoreElements(); sysMap.put(pName, pValue))
        {
            pName = (String)e.nextElement();
            pValue = sys.getProperty(pName);
        }

        systemProperties = sysMap;
        String home = (String)systemProperties.get("user.home");
        if(StringUtil.containsIgnoreCase(osName, "Windows"))
        {
         
            if(StringUtil.containsIgnoreCase(osName, "vista") || StringUtil.containsIgnoreCase(osName, "7"))
            {
                if(StringUtil.containsIgnoreCase(osName, "vista"))
                {
                    VISTA = true;
                }else{
                    WIN7 = true;
                }
                workingHome = (new StringBuilder(String.valueOf(localLow))).append(System.getProperty("file.separator")).append("PPS").toString();
                System.out.println((new StringBuilder("workingHome : ")).append(workingHome).toString());
            } else
            {
                workingHome = (new StringBuilder(String.valueOf(localLowXp))).append(System.getProperty("file.separator")).append("PPS").toString();
                System.out.println((new StringBuilder("workingHome : ")).append(workingHome).toString());
            }
        } else
        {
            workingHome = (new StringBuilder(String.valueOf((String)systemProperties.get(userHome)))).append(System.getProperty("file.separator")).append("PPS").toString();
            System.out.println((new StringBuilder("workingHome : ")).append(workingHome).toString());
        }
        
        dirWorking = new File(workingHome);
        dirLog = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("log").toString());
        dirXml = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("xml").toString());
        dirSend = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("send").toString());
        dirReceive = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("receive").toString());
        
        dirAttach = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("attach").toString());
        dirSoap = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("soap").toString());
        dirEsoap = new File((new StringBuilder(String.valueOf(workingHome))).append(System.getProperty("file.separator")).append("esoap").toString());
        
        makeDefaultDir();
    }
    
    public static boolean isVista()
    {
        return VISTA;
    }

    public static boolean isWin7()
    {
        return WIN7;
    }

    public static boolean isWindows()
    {
        return WINDOWS;
    }

    public static File getDirLog()
    {
        return dirLog;
    }

    public static File getDirEsoap()
    {
        return dirEsoap;
    }

    public static File getDirSend()
    {
        return dirSend;
    }

    public static File getDirAttach()
    {
        return dirAttach;
    }

    public static File getDirSoap()
    {
        return dirSoap;
    }

    public static File getDirXml()
    {
        return dirXml;
    }
    
    public static File getReceive()
    {
        return dirReceive;
    }
    
    public static File getDirWorking()
    {
        return dirWorking;
    }

    private DirManager()
    {
    }

    private static boolean makeDefaultDir()
    {
        boolean result = false;
        try
        {
            if(!dirWorking.exists())
                dirWorking.mkdir();
            if(!dirLog.exists())
                dirLog.mkdir();
            if(!dirXml.exists())
                dirXml.mkdir();
            if(!dirSend.exists())
                dirSend.mkdir();
            if(!dirAttach.exists())
                dirAttach.mkdir();
            if(!dirEsoap.exists())
                dirEsoap.mkdir();
            if(!dirSoap.exists())
                dirSoap.mkdir();
            if(!dirReceive.exists())
                dirReceive.mkdir();
            result = true;
            return result;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        return result;
    }
}
