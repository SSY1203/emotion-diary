import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

interface ButtonProp {
  text: string;
  type: string;
  onClick: () => void;
}

const Button = ({ text, type, onClick }: ButtonProp) => {
  const buttonType: string = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button className={classNames('MyButton', `MyButton_${buttonType}`)} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
  text: '버튼',
};

export default Button;
