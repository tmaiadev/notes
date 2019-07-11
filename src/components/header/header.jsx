import React from 'react';
import PropTypes from 'prop-types';
import Title from '../title/title';
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
      <Title
        value={title}
        editable={editableTitle}
        onChange={onTitleChange}
      />
      <nav className="header__nav">
        <div>
          {onReturn
            ? 'RETURN ACTION'
            : null}
        </div>
        <div />
        <div>
          {children}
        </div>
      </nav>
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
