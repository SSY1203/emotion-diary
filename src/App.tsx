import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

export interface DiaryDataType {
  id: number;
  date: number;
  emotion: number;
  content: string;
}

type ActionType =
  | { type: 'INIT'; data: DiaryDataType[] }
  | { type: 'CREATE'; data: DiaryDataType }
  | { type: 'REMOVE'; targetId: number }
  | { type: 'EDIT'; data: DiaryDataType };

export interface DispatchType {
  onCreate: (date: number, content: string, emotion: number) => void;
  onRemove: (targetId: number) => void;
  onEdit: (targetId: number, date: number, content: string, emotion: number) => void;
}

const reducer = (state: DiaryDataType[], action: ActionType): DiaryDataType[] => {
  let newState: DiaryDataType[] = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter(item => item.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map(item => (item.id === action.data.id ? { ...action.data } : item));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diaryList', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext<DiaryDataType[]>([] as DiaryDataType[]);
DiaryStateContext.displayName = 'DiaryStateContext';

export const DiaryDispatchContext = React.createContext<DispatchType>({} as DispatchType);
DiaryDispatchContext.displayName = 'DiaryDispatchContext';

const initialStateFunc = (): DiaryDataType[] => [];
function App() {
  const [data, dispatch] = useReducer(reducer, [], initialStateFunc);
  const dataId = useRef<number>(0);

  useEffect(() => {
    const localData = localStorage.getItem('diaryList');

    if (localData) {
      const diaryList: DiaryDataType[] = JSON.parse(localData).sort(
        (a: DiaryDataType, b: DiaryDataType) => b.id - a.id,
      );
      if (diaryList.length >= 1) dataId.current = diaryList[0].id + 1;
      dispatch({ type: 'INIT', data: diaryList });
    } else {
    }
  }, []);

  // CREATE
  const onCreate = (date: number, content: string, emotion: number) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  // EDIT
  const onEdit = (targetId: number, date: number, content: string, emotion: number) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
