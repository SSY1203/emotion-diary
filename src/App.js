import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
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
  return newState;
};

export const DiaryStateContext = React.createContext();
DiaryStateContext.displayName = 'DiaryStateContext';

export const DiaryDispatchContext = React.createContext();
DiaryDispatchContext.displayName = 'DiaryDispatchContext';

const dummyDate = [
  {
    id: 1,
    emotion: 3,
    content: '오늘의 일기 1',
    date: 1678242874610,
  },
  {
    id: 2,
    emotion: 5,
    content: '오늘의 일기 2',
    date: 1678242874612,
  },
  {
    id: 3,
    emotion: 1,
    content: '오늘의 일기 3',
    date: 1678242874618,
  },
  {
    id: 4,
    emotion: 2,
    content: '오늘의 일기 4',
    date: 1677500000000,
  },
  {
    id: 5,
    emotion: 4,
    content: '오늘의 일기 5',
    date: 1678242874650,
  },
  {
    id: 6,
    emotion: 3,
    content: '오늘의 일기 6',
    date: 1778242874650,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyDate);
  const dataId = useRef(6);

  // CREATE
  const onCreate = (date, content, emotion) => {
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
  const onRemove = targetId => {
    dispatch({ type: 'REMOVE', targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
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
