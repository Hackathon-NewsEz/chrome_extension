//Content Script 파일로, 페이지의 DOM에 접근 가능 

// 현재 페이지의 URL 확인
const currentURL = window.location.href;

//background.js에 url 보내기 
if(currentURL){
  chrome.runtime.sendMessage({type: 'url', url: currentURL}, function(response){

    if(response.status == "success"){
      console.log(response.data);
      const data = response.data;
      replaceSentence(data.difficults, "difficult");
      replaceSentence(data.keys, "key");
      replaceSentence(data.boths, "both");
      easyPopup(data.difficults, "difficult");
      easyPopup(data.boths,"both");
      chrome.runtime.sendMessage({type: 'dataReceived', message: '성공'});
    }else{
      console.log(response.message);
    }
  });
}

function replaceSentence(data, type) {
  console.log("Start Highlight");
  switch (type){
    case "difficult":
      var style = "background-color: #D3C1DD; cursor: pointer;";
      break;
    case "key":
      var style = "background-color: #F8E397;";
      break;
    case "both":
      var style = "background-color: #F7BDA6; cursor: pointer;";
      break;
    default: break;

  }

  var article = document.getElementById('dic_area');
  var originalHTML = article.innerHTML;
  var originalText = article.innerText;


  for (var i = 0; i < data.length; i++) {
    var index = originalText.indexOf(data[i][type]);
    console.log(index);
    if (index !== -1) {
      var startHTMLIndex = originalHTML.indexOf(data[i][type]);
      console.log(startHTMLIndex);
      if (startHTMLIndex !== -1) {
        originalHTML = originalHTML.substring(0, startHTMLIndex) +
          `<span style="${style}">` +
          originalHTML.substring(startHTMLIndex, startHTMLIndex + data[i][type].length) +
          '</span>' +
          originalHTML.substring(startHTMLIndex + data[i][type].length);
      }
    }
  }

  article.innerHTML = originalHTML;

}


let popupVisible = false; // 팝업이 초기에는 보이지 않도록 설정
let activePopup = null; // 활성 팝업을 추적하기 위한 변수


function easyPopup(data, type){

  var article = document.getElementById('dic_area');

  var highlightedSpans = article.getElementsByTagName('span'); //aritcle 태그 내의 html에서 span 태그를 모두 가져옴 
  for (var j = 0; j < highlightedSpans.length; j++) {
    console.log(highlightedSpans[j].innerText);
    for (var k = 0; k < data.length; k++) {
      if (highlightedSpans[j].innerText === data[k][type]) { //span태그의 innerText가 어려운 문장 데이터와 같으면 클릭 이벤트 추가 
        highlightedSpans[j].addEventListener('click', createClickHandler(data[k].easy));
      }
    }
  }
}


function createClickHandler(easy) {
  return function(event) {
    event.stopPropagation();
    console.log(easy);
    handleSentenceClick(easy);
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function handleSentenceClick(easyData) {
  console.log(easyData);
  if (popupVisible) {
    if (activePopup) {
      activePopup.parentNode.removeChild(activePopup);
      popupVisible = false;
      activePopup = null;
    }
  } else {

    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&family=Noto+Sans:wght@300;400&display=swap');
                    .customLayout{
                      border-radius: 10px;
                      background: #F1F3F5;
                      display: flex;
                      flex-direction: column;
                    }
                    .customTitle { 
                        font-size: 1.8rem ; 
                        font-family: 'Noto Sans KR', sans-serif ; 
                        font-style: normal;  
                        font-weight: 500 ; 
                        margin: 0.3rem ; 
                        margin-left: 0.5rem;
                    }
                    .customContent{
                      font-size: 1.5rem ; 
                      font-family: 'Noto Sans KR', sans-serif; 
                      font-style: normal ; 
                      font-weight: 400 ; 
                      margin: 0.3rem ; 
                      margin-left: 0.5rem;
                    }`;

    // CSS 클래스 추가
    document.head.appendChild(css);

    const layout = document.createElement('div');
    layout.className = 'customLayout';

    const title = document.createElement('span');
    title.className = 'customTitle';
    title.innerText = 'NewsEz가 쉬운 표현으로 바꿔보았어요!';

    const content = document.createElement('span');
    content.className = 'customContent';
    content.innerText = easyData;

    layout.appendChild(title);
    layout.appendChild(content);

    const sentenceElement = event.target;
    sentenceElement.parentNode.insertBefore(layout, sentenceElement.nextSibling);
    popupVisible = true;
    activePopup = layout;
  }
}