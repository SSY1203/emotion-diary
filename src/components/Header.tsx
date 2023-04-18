import React from 'react';

interface HeaderProp {
  leftChild: React.ReactNode;
  headText: string;
  rightChild: React.ReactNode;
}

const Header = ({ leftChild, headText, rightChild }: HeaderProp) => {
  return (
    <header>
      <div className="head_button_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_button_right">{rightChild}</div>
    </header>
  );
};

export default Header;
