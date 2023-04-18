import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';

import Header from './../components/Header';
import Button from '../components/Button';

import { getStringDate } from '../utils/date';
import { EmotionListType, emotionList } from './../utils/emotion';
import classNames from 'classnames';
import { DiaryDataType } from './../App';

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const diaryList = useContext<DiaryDataType[]>(DiaryStateContext);
  const [data, setData] = useState<DiaryDataType>();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary: DiaryDataType | undefined = diaryList.find(item => String(item.id) === id);

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  useEffect(() => {
    const titleElement: HTMLElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion 일기장 - ${id}번 일기`;
  }, []);

  if (!data) return <div className="DiaryPage">로딩중입니다...</div>;
  else {
    const currentEmotionData: EmotionListType | undefined = emotionList.find(
      item => item.emotion_id === data.emotion,
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
            <div className={classNames('diary_img_wrapper', `diary_img_wrapper_${data.emotion}`)}>
              <img src={currentEmotionData?.emotion_img} alt="감정 이미지" />
              <div className="emotion_descript">{currentEmotionData?.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
