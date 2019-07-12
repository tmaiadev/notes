import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './title.css';

function Title({
  value,
  editable,
  onChange,
}) {
  const titleRef = useRef();

  useEffect(() => {
    const h1 = titleRef.current;

    if (editable) {
      h1.contentEditable = true;
    }

    h1.innerHTML = value;
  }, [value, titleRef, editable])

  return (
    <h1
      className="title"
      onChange={onChange}
      ref={titleRef}
    >{value}</h1>
  );
}

Title.propTypes = {
  value: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
}

Title.defaultProps = {
  value: 'Notes',
  editable: false,
  onChange: undefined,
}

export default Title;
