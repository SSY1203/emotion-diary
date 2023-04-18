import classNames from 'classnames';
import React from 'react';
import { EmotionListType } from './../utils/emotion';

interface EmotionItemProp {
  onClick: (emotion: number) => void;
  isSelected: boolean;
}

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}: EmotionListType & EmotionItemProp) => {
  return (
    <div
      className={classNames('EmotionItem', isSelected ? `selected_${emotion_id}` : '')}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt="감정 이미지" />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
