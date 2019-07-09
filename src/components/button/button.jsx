import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

function Button({
  onClick,
  disabled,
  children,
  fullWidth,
}) {
  return (
    <button
      type="button"
      className={'button '
        + `${fullWidth ? 'button--full-width ' : ''}`
        + `${disabled ? 'button--disabled ' : ''}`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  fullWidth: false,
  disabled: false,
};

export default Button;
