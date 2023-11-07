import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/difficulty_testing')
      .then(response => response.json())
      .then(data => {
          setSentence(data.difficult);
      })
      .catch(error => console.error(error));
  }, []);

  const highlightedSentence = sentence.replace('공매도 금지 첫날, 주가는 크게 뛰었습니다.', '<span style="background-color: yellow;">공매도 금지 첫날, 주가는 크게 뛰었습니다.</span>');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p dangerouslySetInnerHTML={{ __html: highlightedSentence }}></p>
      </header>
    </div>
  );
}

export default App;
