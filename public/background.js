// 전역 변수로 dataReceivedMessage 선언, 초기값 false 설정
let dataReceivedMessage = false;


chrome.runtime.onMessage.addListener((request, sender, sendResponse)  => {
    switch (request.type) {
        case "dataReceived":
            // dataReceived 타입의 메시지를 받으면 dataReceivedMessage 값을 업데이트
            if(request.message === "성공") {
                dataReceivedMessage = true;
            } else {
                dataReceivedMessage = false;
            }
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'logo192.png',
                title: 'NewsEz 알림',
                message: '어려운 문장을 ‘노란색’, 핵심 문장을 ‘초록색’으로 표시 하였어요! 어려운 문장을 클릭하여 쉬운 표현을 확인해보세요!'
              });
            break;

        case "getData":
            // 데이터 요청 메시지를 받으면 dataReceivedMessage 값을 응답으로 보냄
            sendResponse({dataReceivedMessage: dataReceivedMessage});
            return true;  
        default:
            break;
    }
  });
  
