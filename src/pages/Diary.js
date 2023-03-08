import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';

import Header from './../components/Header';
import Button from '../components/Button';

import { getStringDate } from '../utils/date';
import { emotionList } from './../utils/emotion';

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(item => parseInt(item.id) === parseInt(id));

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) return <div className="DiaryPage">로딩중입니다...</div>;
  else {
    const currentEmotionData = emotionList.find(
      item => parseInt(item.emotion_id) === parseInt(data.emotion),
    );
    return (
      <div className="DiaryPage">
        <Header
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<Button onClick={() => navigate(-1)} text="< 뒤로가기" />}
          rightChild={<Button onClick={() => navigate(`/edit/${data.id}`)} text="수정하기" />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className="diary_img_wrapper">
              <img src={currentEmotionData.emotion_img} alt="감정 이미지" />
              <div className="emotion_descript">{currentEmotionData.emotion_descript}</div>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
