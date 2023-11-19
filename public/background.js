// 전역 변수로 dataReceivedMessage 선언, 초기값 false 설정
let dataReceivedMessage = false;
let summary = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse)  => {
    switch (request.type) {
        //content script로부터 받은 url 메시지 
        case "url":
            console.log(request.url);
            //api 통신 
            const data = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: request.url})
              }

            fetch('http://localhost:4000/testing1')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // 응답을 content script로 전송
                summary = data.summary;
        
                let {datadiffs, datakeys, databoths} =  selectBoth(data);
                console.log(datadiffs);
                console.log(datakeys);
                console.log(databoths);
                sendResponse({status: 'success', datadiffs: datadiffs, datakeys: datakeys, databoths: databoths}); // 이 부분을 추가합니다.
            })
            .catch(error => {
                console.log(error);
                sendResponse({status: 'error', message: error.toString()}); // 이 부분을 추가합니다.
               
            });
            return true;

        case "dataReceived":
            // dataReceived 타입의 메시지를 받으면 dataReceivedMessage 값을 업데이트
            if(request.message === "성공") {
                dataReceivedMessage = true;
            } else {
                dataReceivedMessage = false;
            }
            //알림창 표시 
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'logo192.png',
                title: 'NewsEz 알림',
                message: '핵심문장을 ‘노란색’, 어려운문장을 ‘보라색’, 핵심문장이면서 어려운문장을 주황색으로 표시 하였어요! 어려운 문장을 클릭하여 쉬운 표현을 확인해보세요!'
              });
            break;

        case "getData":
            // 데이터 요청 메시지를 받으면 dataReceivedMessage 값을 응답으로 보냄
            sendResponse({dataReceivedMessage: dataReceivedMessage, summary: summary});
            return true;  
        default:
            break;
    }
  });
  
  function selectBoth(data){

    let difficults_new = [];
    let dataBoths = [];
    for (let i=0; i<data.difficults.length; i++) {
        let found = false;
        for (let j=0; j<data.keys.length; j++) {
            if (data.difficults[i].difficult === data.keys[j].key) {
                dataBoths.push({
                    "both": data.difficults[i].difficult, 
                    "easy": data.difficults[i].easy
                });
                found = true;
                break;
            }
        }
        if (!found) {
            difficults_new.push(data.difficults[i]);
        }
    }

    data.keys = data.keys.filter(k => !dataBoths.some(b => b.both === k.key));

    return {datadiffs: difficults_new, datakeys: data.keys, databoths: dataBoths};

  }
