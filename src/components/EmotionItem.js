import classNames from 'classnames';

const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
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

export default EmotionItem;
