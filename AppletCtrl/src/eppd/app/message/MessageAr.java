package eppd.app.message;

import java.util.HashMap;

public class MessageAr 
{
	public static HashMap<String,String> arLangMap = new HashMap<String,String>();
	
	private String MSG[][]  = { 	
			{"1000","복호화에 실패했습니다."},
			{"1001","암호화에 실패했습니다."},
			{"1002","전자서명에 실패했습니다."},
			{"1003","전자서명에 검증에 실패했습니다."},
			{"1004","사용자의 인증서가 없습니다."},
			{"1005","서버인증서가 올바르지 않습니다."},
			{"1006","서버인증서가 없습니다."},
			{"1007","보안모듈 초기화에 실패 하였습니다."},
			{"1008","보안모듈 처리에 실패 하였습니다."},
			{"1009","보안모듈이 정상적으로 동작하지 않았습니다."},
			{"1010","보안모듈을 찾을 수 없습니다."},
			{"1011","보안모듈이 정상적으로 설치되지 않았습니다."},
			{"1012","보안모듈을 설치하신 후 다시 시도해 주십시오."},
			{"1013","전자문서를 생성하는 중입니다."},
			{"1014","Soap문서를 생성하는 중입니다."},
			{"1015","전자문서 보안 처리 중입니다."},
			{"1016","Mime문서를 생성하는 중입니다."},
			{"1017","서버에 연결하는 중입니다."},
			{"1018","서버에 전자문서를  전송 중 입니다."},
			{"1019","전송에 성공하였습니다."},
			{"1020","전송에 실패하였습니다."},
			{"1021","수신자 %s 명 이상 처리가 불가능 합니다.\n확인 후 다시 처리하시기 바랍니다."},
			{"1022","전자문서 수신을 준비중 입니다."},
			{"1023","전자문서 다운로드 중입니다."},
			{"1024","전자문서 Parsing 처리 중입니다."},
			{"1025","전자문서 Parsing 에러가 발생하였습니다."},
			{"1026","수신에 성공하였습니다."},
			{"1027","수신에 실패하였습니다."},
			{"1028","송신할 문서의 크기가 7M를 초과하였습니다."},
			{"1029","0 Size 문서는 첨부하실수 없습니다.\n파일명을 확인하신후 다시 하시기 바랍니다."},
			{"1030","첨부문서 개수가 20개이상 초과하여 문서를 송신할 수 없습니다.\n필요한 문서를 압축으로 묶어 송신하십시요."},
			{"1031","첨부파일을 확인하는 중 에러가 발생했습니다.\n첨부파일이 열려있는 경우에는 관련 프로그램을 종료하신 후 다시 시도하시길 바랍니다."},
			{"1032","첨부문서 파일을 찾을 수 없습니다."},
			{"1033","네트워크 문제로 서버와 통신하는 중 에러가 발생하였습니다.\n잠시 후 다시 시도 하시길 바랍니다."},
			{"1034","서버와의 통신중 장애가 발생 하였습니다."},
			{"1035","서버에서 HTTP 에러를 보내왔습니다."},
			{"1036","Server로 이미 전송하여 멈출 수 없습니다."},
			{"1037","Application이 준비중이라 멈출 수 없습니다."},
			{"1038","처리 중 입니다. 잠시만 기다려 주십시오."},
			{"1039","입찰금액을 입력하지 않았습니다.\n입찰금액을 입력하신 후 다시 시도하시기 바랍니다."},
			{"1040","%s\n\n이 공고건은 공개하지 않습니다."},
			{"1041","공고번호 %s번 차수 %s번 문서가 정상접수되었습니다."},
			{"1042","공고번호 %s번 차수 %s번 입찰분류 %s번의 문서가 정상 접수되었습니다."},
			{"1043","전자문서 처리중 입니다. 잠시만 기다려 주십시오."},
			{"Title","전자조달 시스템"}};

	public MessageAr()
	{
		arLangMap.clear();
		int size = MSG.length;
		for(int i=0;i< size; i++)
		{
		   arLangMap.put(MSG[i][0],MSG[i][1]);
		}
	}
}
