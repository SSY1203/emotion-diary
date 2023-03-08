import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ text, type, onClick }) => {
  const buttonType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button className={classNames('MyButton', `MyButton_${buttonType}`)} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'default',
  text: '버튼',
};

export default Button;
