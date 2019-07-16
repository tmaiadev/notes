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
  noRightPadding,
  noLeftPadding,
  title,
  'aria-label': ariaLabel,
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
        + `${noRightPadding ? 'button--no-right-padding ' : ''}`
        + `${noLeftPadding ? 'button--no-left-padding ' : ''}`
      }
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
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
  noRightPadding: PropTypes.bool,
  noLeftPadding: PropTypes.bool,
  title: PropTypes.string,
  'aria-label': PropTypes.string,
};

Button.defaultProps = {
  fullWidth: false,
  disabled: false,
  small: false,
  accentColoredText: false,
  noShadow: false,
  noBorder: false,
  noRightPadding: false,
  noLeftPadding: false,
  title: undefined,
  'aria-label': undefined,
};

export default Button;
