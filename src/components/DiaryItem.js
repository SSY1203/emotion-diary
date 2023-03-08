import classNames from 'classnames';

const DiaryItem = ({ id, content, emotion, date }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  return (
    <li className="DiaryItem" key={id}>
      <div className={classNames('emotion_img_wrapper', `emotion_img_wrapper_${emotion}`)}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="감정 이미지" />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div></div>
    </li>
  );
};

export default DiaryItem;
