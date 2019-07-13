import React from 'react';
import PropTypes from 'prop-types';
import './title.css';

function Title({
  value,
  editable,
  onChange,
}) {
  if (editable) {
    return (
      <input
        className="title title--input"
        defaultValue={value}
        onChange={onChange}
      />
    );
  }

  return (
    <h1
      className="title"
      onInput={onChange}
    >
      {value}
    </h1>
  );
}

Title.propTypes = {
  value: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
};

Title.defaultProps = {
  value: 'Notes',
  editable: false,
  onChange: undefined,
};

export default Title;
