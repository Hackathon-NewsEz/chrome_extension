fetch('http://localhost:3000/difficulty_testing')
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
            }
        }
    })
    .catch(error => console.error(error));
