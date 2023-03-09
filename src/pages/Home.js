import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import Header from './../components/Header';
import Button from './../components/Button';
import DiaryList from './../components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [nowDate, setNowDate] = useState(new Date());
  const headText = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime();
      const lastDay = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      ).getTime();

      setData(diaryList.filter(item => firstDay <= item.date && item.date <= lastDay));
    }
  }, [diaryList, nowDate]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion 일기장`;
  }, []);

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
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
