import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

/* ---------------------------------Component-------------------------------- */
import MyButton from './components/MyButton';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App</h2>
        {/* process.env.PUBLIC_URL은 public directory에 대한 경로를 바로 쓸 수 있게 해주는 코드 */}
        {/* <img src={process.env.PUBLIC_URL + `assets/emotion1.png`} alt="매우 기쁜 표정" /> */}
        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type="positive" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
