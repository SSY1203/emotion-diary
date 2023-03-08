const EmotionItem = ({ emotion_id, emotion_img, emotion_descript }) => {
  return (
    <div className="EmotionItem">
      <img src={emotion_img} alt="감정 이미지" />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
