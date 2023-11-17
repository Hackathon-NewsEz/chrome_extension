//Content Script 파일로, 페이지의 DOM에 접근 가능 

// 현재 페이지의 URL 확인
const currentURL = window.location.href;
console.log(currentURL);

//서버에 api 요청
Promise.all([
  fetch('http://localhost:4000/key_testing_2')
    .then(response => response.json())
    .then(data => {
      replaceKeySentence(data);
    }),
  fetch('http://localhost:4000/difficulty_testing_2')
    .then(response => response.json())
    .then(data => {
      replaceSentence(data);
    })
])
.then(() => {
  // 두 API 호출이 모두 성공했을 때 메시지 전송
  chrome.runtime.sendMessage({type: 'dataReceived', message: '성공'});
})
.catch(error => console.error(error));


let popupVisible = false; // 팝업이 초기에는 보이지 않도록 설정
let activePopup = null; // 활성 팝업을 추적하기 위한 변수


function replaceSentence(data) {

  var article = document.getElementById('dic_area');
  var originalHTML = article.innerHTML;
  var originalText = article.innerText;

  console.log(originalText);
  console.log(originalHTML);

  for (var i = 0; i < data.length; i++) {
    var index = originalText.indexOf(data[i].difficult);
    console.log(index);
    if (index !== -1) {
      var startHTMLIndex = originalHTML.indexOf(data[i].difficult);
      console.log(startHTMLIndex);
      if (startHTMLIndex !== -1) {
        originalHTML = originalHTML.substring(0, startHTMLIndex) +
          '<span style="background-color:  #FCF779; cursor: pointer;">' +
          originalHTML.substring(startHTMLIndex, startHTMLIndex + data[i].difficult.length) +
          '</span>' +
          originalHTML.substring(startHTMLIndex + data[i].difficult.length);
      }
    }
  }

article.innerHTML = originalHTML;

  var highlightedSpans = article.getElementsByTagName('span'); //aritcle 태그 내의 html에서 span 태그를 모두 가져옴 
  for (var j = 0; j < highlightedSpans.length; j++) {
    console.log(highlightedSpans[j].innerText);
    for (var k = 0; k < data.length; k++) {
      if (highlightedSpans[j].innerText === data[k].difficult) { //span태그의 innerText가 어려운 문장 데이터와 같으면 클릭 이벤트 추가 
        highlightedSpans[j].addEventListener('click', createClickHandler(data[k].easy));
      }
    }
  }
}



function replaceKeySentence(data) {
  console.log("Go");

    var article = document.getElementById('dic_area');
    var originalHTML = article.innerHTML;
    var originalText = article.innerText;

    console.log(originalText);
    console.log(originalHTML);

    for (var i = 0; i < data.length; i++) {
      var index = originalText.indexOf(data[i].key);
      console.log(index);
      if (index !== -1) {
        var startHTMLIndex = originalHTML.indexOf(data[i].key);
        console.log(startHTMLIndex);
        if (startHTMLIndex !== -1) {
          originalHTML = originalHTML.substring(0, startHTMLIndex) +
            '<span style="background-color: #79BBFC;">' +
            originalHTML.substring(startHTMLIndex, startHTMLIndex + data[i].key.length) +
            '</span>' +
            originalHTML.substring(startHTMLIndex + data[i].key.length);
        }
      }
    }

  article.innerHTML = originalHTML;

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