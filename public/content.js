fetch('http://localhost:3000/difficulty_testing')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var sentence = data.difficult;
        var bodyText = document.body.innerHTML;
        var regex = new RegExp(sentence, "g"); // 정규식으로 변경
        var highlighted = '<span style="background-color: yellow;">' + sentence + '</span>';
        bodyText = bodyText.replace(regex, highlighted); // 모든 일치하는 문장을 하이라이트로 변경
        document.body.innerHTML = bodyText;
    })
    .catch(error => console.error(error));
