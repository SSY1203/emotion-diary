import classNames from 'classnames';
import PropTypes from 'prop-types';

const MyButton = ({ text, type, onClick }) => {
  return (
    <button className={classNames('MyButton', `MyButton_${type}`)} onClick={onClick}>
      {text}
    </button>
  );
};

MyButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

MyButton.defaultProps = {
  type: 'default',
  text: '버튼',
};

export default MyButton;
