import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Header from '../components/Header';

const getStringDate = date => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();
  return (
    <div className="New">
      <Header
        headText={'새 일기 쓰기'}
        leftChild={<Button text="< 뒤로가기" onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              type="date"
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
