const Header = ({ leftChild, headText, rightChild }) => {
  return (
    <header>
      <div className="head_button_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_button_right">{rightChild}</div>
    </header>
  );
};

export default Header;
