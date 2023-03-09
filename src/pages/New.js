import { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    console.log(titleElement);
    titleElement.innerHTML = `Emotion 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
