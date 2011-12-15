document.write('<OBJECT id=\"PortChk\" classid=\"CLSID:A4D82E8C-0BA9-4C9C-A22D-BF4109381A31\" codeBase=\"http://www.meps.gov.mn/cab/MN_PortCheck.cab#Version=1,0,0,1\"');
document.write('width=\"0\"');
document.write('height=\"0\">');
document.write('</OBJECT>');

function IP_check() 
{
	try
	{
		 PortChk.SG_ChkInit(0);
         PortChk.SG_SetIpPort( 'Portal', 'www.meps.gov.mn', '80' );
         PortChk.SG_S
         etIpPort( 'Bid', 'www.meps.gov.mn', '8081' );
         PortChk.SG_SetIpPort( 'Cata', 'www.meps.gov.mn', '8082' );
         PortChk.SG_SetIpPort( 'Shoping', 'www.meps.gov.mn', '8083' );
         PortChk.SG_SetIpPort( 'Edocs', 'www.meps.gov.mn', '8084' );
         PortChk.SG_SetIpPort( 'User', 'www.meps.gov.mn', '8085' );
         PortChk.SG_SetIpPort( 'KMS', 'www.meps.gov.mn', '9000' );
         //PortChk.SG_SetIpPort( 'Eca1', 'www.meps.gov.mn', '4501' );
         PortChk.SG_SetIpPort( 'Eca2', 'www.meps.gov.mn', '4502' );
         //PortChk.SG_SetIpPort( 'Eca3', 'www.meps.gov.mn', '4509' );
        
         PortChk.SG_Chk();
                
	}catch(e){
	    alert('The ActiveX is not installed correctly.\n'
	    +'Please, Install the program manually PortCheck.exe');document.reload();
	}
}
