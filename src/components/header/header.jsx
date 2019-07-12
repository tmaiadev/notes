import React from 'react';
import PropTypes from 'prop-types';
import Title from '../title/title';
import Button from '../button/button';
import Icon from '../icon/icon';
import './header.css';

function Header({
  title,
  editableTitle,
  onTitleChange,
  onReturn,
  children,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <Title
          value={title}
          editable={editableTitle}
          onChange={onTitleChange}
        />
        <nav className="header__nav">
          <div className="header__nav__return">
            {onReturn
              ? (
                <Button
                  small
                  accentColoredText
                  noShadow
                  noBorder
                  onClick={onReturn}
                >
                  <Icon
                    type="dropleft"
                    fill={'var(--accent-color)'}
                    aria-hidden
                  />
                  &nbsp;
                  Return
                </Button>
              )
              : null}
          </div>
          <div />
          <div className="header__nav__tools">
            {children}
          </div>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  editableTitle: PropTypes.bool,
  onTitleChange: PropTypes.func,
  onReturn: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  title: undefined,
  editableTitle: false,
  onTitleChange: undefined,
  onReturn: undefined,
};

export default Header;
