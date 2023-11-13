//Content Script 파일로, 페이지의 DOM에 접근 가능 

// 현재 페이지의 URL 확인
const currentURL = window.location.href;
console.log(currentURL);

fetch('http://localhost:4000/difficulty_testing')
  .then(response => response.json())
  .then(data => {
    console.log(data);
 
    replaceSentence(data);
   
     // 데이터를 성공적으로 변환했다면 background script로 메시지 전송
     chrome.runtime.sendMessage({type: 'dataReceived', message: '성공'});


  })
  .catch(error => console.error(error));



let popupVisible = false; // 팝업이 초기에는 보이지 않도록 설정
let activePopup = null; // 활성 팝업을 추적하기 위한 변수


function replaceSentence(data) {
  for (var j = 0; j < data.length; j++) {
  var paragraphs = document.body.getElementsByTagName('p');

  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs[i];
    var originalHTML = paragraph.innerHTML;

    if (originalHTML.includes(data[j].difficult)) {
      var highlightedHTML = originalHTML.replace(new RegExp(escapeRegExp(data[j].difficult), 'g'), '<span style="background-color: yellow;">$&</span>');
      paragraph.innerHTML = highlightedHTML;

      var highlightedSpans = paragraph.getElementsByTagName('span');
      for (var l = 0; l < highlightedSpans.length; l++) {
        highlightedSpans[l].addEventListener('click', createClickHandler(data[l].easy));
      }
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
    const layout = document.createElement('div');
    layout.style.width = '630px';
    layout.style.borderRadius = '10px';
    layout.style.background = '#F1F3F5';
    layout.style.display = 'flex';
    layout.style.flexDirection = 'column';

    const title = document.createElement('span');
    title.style.color = '#000';
    title.style.fontFamily = 'Noto Sans KR';
    title.style.fontSize = '1.2rem';
    title.style.fontStyle = 'normal';
    title.style.fontWeight = '500';
    title.style.lineHeight = 'normal';
    title.style.margin = '0.3rem';
    title.innerText = 'NewsEz가 쉬운 표현으로 바꿔보았어요!';

    const content = document.createElement('span');
    content.style.color = '#000';
    content.style.fontFamily = 'Noto Sans KR';
    content.style.fontSize = '1rem';
    content.style.fontStyle = 'normal';
    content.style.fontWeight = '400';
    content.style.lineHeight = 'normal';
    content.style.margin = '0.3rem';
    content.innerText = easyData;

    layout.appendChild(title);
    layout.appendChild(content);

    const sentenceElement = event.target;
    sentenceElement.parentNode.insertBefore(layout, sentenceElement.nextSibling);
    popupVisible = true;
    activePopup = layout;
  }
}