import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

function Button({
  onClick,
  disabled,
  children,
  fullWidth,
  small,
  accentColoredText,
  noShadow,
  noBorder,
}) {
  return (
    <button
      type="button"
      className={'button '
        + `${fullWidth ? 'button--full-width ' : ''}`
        + `${disabled ? 'button--disabled ' : ''}`
        + `${small ? 'button--small ' : ''}`
        + `${accentColoredText ? 'button--accent-colored-text ' : ''}`
        + `${noShadow ? 'button--no-shadow ' : ''}`
        + `${noBorder ? 'button--no-border ' : ''}`
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
  small: PropTypes.bool,
  accentColoredText: PropTypes.bool,
  noShadow: PropTypes.bool,
  noBorder: PropTypes.bool,
};

Button.defaultProps = {
  fullWidth: false,
  disabled: false,
  small: false,
  accentColoredText: false,
  noShadow: false,
  noBorder: false,
};

export default Button;
