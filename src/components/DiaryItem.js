import classNames from 'classnames';

const DiaryItem = ({ id, content, emotion, date }) => {
  return (
    <li className="DiaryItem" key={id}>
      <div className={classNames('emotion_img_wrapper', `emotion_img_wrapper_${emotion}`)}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="감정 이미지" />
      </div>
      <div></div>
      <div></div>
    </li>
  );
};

export default DiaryItem;
