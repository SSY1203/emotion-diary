import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const DiaryItem = ({ id, content, emotion, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <li className="DiaryItem" key={id}>
      <div
        onClick={goDetail}
        className={classNames('emotion_img_wrapper', `emotion_img_wrapper_${emotion}`)}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="감정 이미지" />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="button_wrapper">
        <Button onClick={goEdit} text={'수정하기'} />
      </div>
    </li>
  );
};

export default React.memo(DiaryItem);
