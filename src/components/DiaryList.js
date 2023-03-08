const DiaryList = ({ diaryList }) => {
  return (
    <ul>
      {diaryList.map(item => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
