import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './paragraph.css';

function Paragraph({
  id,
  type,
  value,
  checked,
  onChange,
  onNewParagraph,
  onRemoveParagraph,
}) {
  const inputRef = useRef();
  let lastInput = new Date();

  useEffect(() => {
    inputRef.current.innerHTML = value;
  }, [value, inputRef]);

  function onKeyDown(evt) {
    const val = inputRef.current.innerHTML.trim();
    switch (evt.key) {
      case 'Enter':
        evt.preventDefault();
        if (val.length > 0) {
          onNewParagraph(id);
        }
        break;
      case 'Backspace':
        if (val.length === 0) {
          onRemoveParagraph(id);
        }
        break;
      default:
        break;
    }
  }

  function onInput() {
    lastInput = new Date();
    setTimeout(() => {
      const diff = new Date() - lastInput;
      if (diff < 1000) return;
      const input = inputRef.current;

      // Sometimes input no longer exists
      // because the user has deleted it.
      // So we stop here.
      if (!input) return;

      const val = inputRef.current.innerHTML.trim();
      onChange(id, val);
    }, 1000);
  }

  return (
    <div className="paragraph">
      <div
        ref={inputRef}
        id={id}
        className="paragraph__input"
        contentEditable
        onKeyDown={onKeyDown}
        onInput={onInput}
        role="textbox"
        tabIndex="0"
      />
    </div>
  );
}

Paragraph.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onNewParagraph: PropTypes.func.isRequired,
  onRemoveParagraph: PropTypes.func.isRequired,
};

Paragraph.defaultProps = {
  checked: false,
};

export default Paragraph;
