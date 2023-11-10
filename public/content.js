//Content Script 파일로, 페이지의 DOM에 접근 가능 

// 현재 페이지의 URL 확인
const currentURL = window.location.href;
console.log(currentURL);

fetch('http://localhost:4000/difficulty_testing')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var sentence = data.difficult;
    var paragraphs = document.body.getElementsByTagName('p'); // 문장이 포함되어 있을 것으로 예상되는 태그를 선택

    for (var i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].textContent.includes(sentence)) { // 해당 태그의 텍스트에 문장이 포함되어 있는지 확인
        var originalText = paragraphs[i].textContent;
        var highlightedText = originalText.replace(sentence, `<span style="background-color: yellow;">${sentence}</span>`); // 문장을 하이라이트하는 HTML로 변경
        paragraphs[i].innerHTML = highlightedText; // 해당 태그의 HTML을 변경
        paragraphs[i].addEventListener('click', () => handleSentenceClick(data.easy)); // data.easy 전달
      }
    }

     // 데이터를 성공적으로 변환했다면 background script로 메시지 전송
     chrome.runtime.sendMessage({type: 'dataReceived', message: '성공'});


  })
  .catch(error => console.error(error));

let popupVisible = false; // 팝업이 초기에는 보이지 않도록 설정
let activePopup = null; // 활성 팝업을 추적하기 위한 변수


function handleSentenceClick(easyData) {
  if (popupVisible) {
      // 팝업이 이미 표시 중이라면 팝업을 제거
      if (activePopup) {
        activePopup.parentNode.removeChild(activePopup);
        popupVisible = false;
        activePopup = null;
      }
  } else {

    // 팝업이 표시 중이 아니라면 팝업을 생성하고 표시
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
    title.style.margin = "0.3rem";
    title.innerText = 'NewsEz가 쉬운 표현으로 바꿔보았어요!';
  

    const content = document.createElement('span');
    content.style.color = '#000';
    content.style.fontFamily = 'Noto Sans KR';
    content.style.fontSize = '1rem';
    content.style.fontStyle = 'normal';
    content.style.fontWeight = '400';
    content.style.lineHeight = 'normal';
    content.style.margin = "0.3rem";
    content.innerText = easyData; // data.easy 값을 content에 설정

    layout.appendChild(title);
    layout.appendChild(content);

    const sentenceElement = event.target;
    sentenceElement.parentNode.insertBefore(layout, sentenceElement.nextSibling);
    popupVisible = true;
    activePopup = layout;
  }
}

function notify(){

}




