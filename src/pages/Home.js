import { useState } from 'react';
import Header from './../components/Header';
import Button from './../components/Button';

const Home = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const headText = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()));
  };

  const decreaseMonth = () => {
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate()));
  };

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text="<" onClick={decreaseMonth} />}
        rightChild={<Button text=">" onClick={increaseMonth} />}
      />
    </div>
  );
};

export default Home;
