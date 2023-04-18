import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDataType, DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const [originData, setOriginData] = useState<DiaryDataType>();
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const diaryList = useContext<DiaryDataType[]>(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary: DiaryDataType | undefined = diaryList.find(item => String(item.id) === id);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  useEffect(() => {
    const titleElement: HTMLElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion 일기장 - ${id}번 일기 수정`;
  }, [id]);

  return (
    <div className="Edit">
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
