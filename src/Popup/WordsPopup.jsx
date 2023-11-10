import React,{useState} from 'react'
import * as w from '../Style/WordsPopupStyle'
function WordsPopup() {

  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);


  const handleWords = (e) => {
    if(words.length < 5) {
      setWords([...words, word]);
      setWord(""); // 입력 필드 초기화
    } else {
      alert("단어는 최대 5개까지만 입력할 수 있습니다.");
    }
  }

  const handleSubmit = () =>{
    if(words.length>0){
      console.log(words);
    }
  }


  return (
    <w.RootLayout>
      <span className='header'>어려운 문장을 ‘노란색’, 핵심 문장을 ‘초록색’으로 표시 하였어요! 어려운 문장을 클릭하여 쉬운 표현을 확인해보세요!</span>
      <hr className='line'/>
      <span className='header'>해당 뉴스에서 이해하기 어려운 단어가 있다면 NewsEz에게 알려주세요!</span>
      <span className='graytext'>NewsEz의 서비스 개선에 큰 도움이 됩니다</span>
      <w.InputContainer>
        <w.StyledInput name="word" type='text' value={word} onChange={(e)=>setWord(e.target.value)}/>
        <button className='inputbutton' onClick={handleWords}>입력</button>
      </w.InputContainer>
      <div style={{height: '140px'}}>
      {words.map((word, index)=>{
       return <w.StyledLi key={index}>{word}</w.StyledLi>
      })}
      </div>
      <w.SubmitButton onClick={handleSubmit}>제출하기</w.SubmitButton>
    </w.RootLayout>
  )
}

export default WordsPopup