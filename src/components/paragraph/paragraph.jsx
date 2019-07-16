import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './paragraph.css';

function Paragraph({
  id,
  type,
  value,
  checked,
  onChange,
  onFocus,
  onNewParagraph,
  onRemoveParagraph,
  onPrevParagraph,
  onNextParagraph,
  onAppendToPreviousParagraph,
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
          const { anchorOffset } = window.getSelection();
          const newValue = val.substr(0, anchorOffset);
          const newParagraphValue = val.substr(anchorOffset);
          onChange(id, newValue);
          onNewParagraph(id, newParagraphValue);
        }
        break;
      case 'Backspace':
        {
          if (val.length === 0) {
            onRemoveParagraph(id);
            return;
          }

          const { anchorOffset } = window.getSelection();
          if (anchorOffset !== 0) return;
          onChange(id, val);
          requestAnimationFrame(() => onAppendToPreviousParagraph(id));
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        {
          const { anchorOffset } = window.getSelection();
          if (anchorOffset === 0) {
            onPrevParagraph(id);
          }
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        {
          const { anchorOffset, anchorNode } = window.getSelection();
          const { data } = anchorNode;
          if (data && anchorOffset === data.length) {
            onNextParagraph(id);
          }
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
    <div className={'paragraph '
      + `${type === 'list' ? 'paragraph--list ' : ''}`
      + `${type === 'checkbox' ? 'paragraph--checklist ' : ''}`}
    >
      <div
        ref={inputRef}
        id={id}
        className="paragraph__input"
        contentEditable
        onKeyDown={onKeyDown}
        onInput={onInput}
        onFocus={() => onFocus(id)}
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
  onFocus: PropTypes.func.isRequired,
  onNewParagraph: PropTypes.func.isRequired,
  onRemoveParagraph: PropTypes.func.isRequired,
  onPrevParagraph: PropTypes.func.isRequired,
  onNextParagraph: PropTypes.func.isRequired,
  onAppendToPreviousParagraph: PropTypes.func.isRequired,
};

Paragraph.defaultProps = {
  checked: false,
};

export default Paragraph;
