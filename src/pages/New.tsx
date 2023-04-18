import React, { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New = () => {
  useEffect(() => {
    const titleElement: HTMLElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
