
chrome.runtime.onMessage.addListener((message) => {
    switch (message.type) {
        case "SHOW_POPUP":
            console.log('click sententce');
            // // 팝업을 열기 위한 코드
            // chrome.windows.create({
            //     url: chrome.runtime.getURL("smallpopup.html"),
            //     type: "popup",
            //     width: 400, // 적절한 너비 설정
            //     height: 300, // 적절한 높이 설정
            // });
            break;
        default:
            break;
    }
  });
  
