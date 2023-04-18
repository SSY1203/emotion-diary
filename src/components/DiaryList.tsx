import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import DiaryItem from './DiaryItem';
import { DiaryDataType } from './../App';

interface OptionType {
  value: string;
  name: string;
}

const sortOptionList: OptionType[] = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList: OptionType[] = [
  { value: 'all', name: '전부 다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안 좋은 감정만' },
];

interface ControlMenuProp {
  value: string;
  onChange: (value: string) => void;
  optionList: OptionType[];
}

const ControlMenu = React.memo(({ value, onChange, optionList }: ControlMenuProp) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChange(value);
  };
  return (
    <select className="ControlMenu" value={value} onChange={handleChange}>
      {optionList.map((item: OptionType, index: number) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

interface DiaryListProp {
  diaryList: DiaryDataType[];
}

const DiaryList = ({ diaryList }: DiaryListProp) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<string>('lastest');
  const [filter, setFilter] = useState<string>('all');

  const getProcessedDiaryList = () => {
    const filterCallBack = (item: DiaryDataType) =>
      filter === 'good' ? item.emotion <= 3 : item.emotion > 3;

    const compare = (a: DiaryDataType, b: DiaryDataType) => {
      if (sortType === 'lastest') {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList: DiaryDataType[] =
      filter === 'all' ? copyList : copyList.filter((item: DiaryDataType) => filterCallBack(item));
    const sortedList: DiaryDataType[] = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <Button type={'positive'} text={'새 일기쓰기'} onClick={() => navigate('/new')} />
        </div>
      </div>
      <ul>
        {getProcessedDiaryList().map(item => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
