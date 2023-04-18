import React, { LegacyRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDataType, DiaryDispatchContext, DispatchType } from '../App';

import Button from '../components/Button';
import Header from '../components/Header';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../utils/date';
import { emotionList } from './../utils/emotion';

interface DiaryEditorProp {
  isEdit?: boolean;
  originData?: DiaryDataType;
}

const DiaryEditor = ({ isEdit, originData }: DiaryEditorProp) => {
  const { onCreate, onEdit, onRemove } = useContext<DispatchType>(DiaryDispatchContext);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState<string>('');
  const [emotion, setEmotion] = useState<number>(3);
  const [date, setDate] = useState<number>(getStringDate(new Date()));

  const navigate = useNavigate();

  const handleClickEmote = useCallback((emotion: number) => setEmotion(emotion), []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current?.focus();
      return;
    }

    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?')) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData?.id || 0, date, content, emotion);
      }
    }

    navigate('/', { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData?.id || 0);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(originData?.date || new Date().getTime())));
      setEmotion(originData?.emotion || 3);
      setContent(originData?.content || '');
    }
  }, [isEdit, originData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDate(parseInt(value));
  };

  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
        leftChild={<Button text="< 뒤로가기" onClick={() => navigate(-1)} />}
        rightChild={isEdit && <Button type={'negative'} text={'삭제하기'} onClick={handleRemove} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className="input_date" value={date} type="date" onChange={handleChange} />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map(item => (
              <EmotionItem
                key={item.emotion_id}
                {...item}
                onClick={handleClickEmote}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text="취소하기" onClick={() => navigate(-1)} />
            <Button text="작성완료" type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
