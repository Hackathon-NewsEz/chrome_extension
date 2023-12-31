/* global chrome */
//크롬 익스텐션 클릭 시 생기는 UI
import React,{useState, useEffect} from 'react'
import * as w from '../Style/WordsPopupStyle'
import ClipLoader from "react-spinners/ClipLoader"; 
function WordsPopup() {

  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);
  const [status, setStatus] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
      // 배경 페이지에 데이터 요청 메시지를 보냄
    chrome.runtime.sendMessage({type: 'getData'}, (response) => {
      if(response.dataReceivedMessage === true){
        setStatus(true);
        setSummary(response.summary);
      }
    });
  }, []);

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

  if(!status){
    return(
    <w.RootLayout>
      <span className='header'>NewsEz 작동중...</span>
      <div style={{margin: '1.5rem'}}>
      <ClipLoader
              color='#f88c6b'
              loading={true} 
              size={50} 
            />
            </div>
    </w.RootLayout>
    )
  }else{

    return (
      <w.RootLayout>
        <span className='header'>NewsEz 뉴스 요약 서비스</span>
        <span className='header' style={{fontSize: '1rem', color: '#495057'}}>{summary}</span>
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

}

export default WordsPopup;