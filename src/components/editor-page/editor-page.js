import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Button from '../button/button';
import Icon from '../icon/icon';
import db from '../../libs/firestore';
import './editor-page.css';

function EditorPage({
  noteId,
  onReturn,
}) {
  const [note, setNote] = useState(null);
  const [noteRef, setNoteRef] = useState(null);
  let _lastUpdate = new Date();

  function updateNote(newValues) {
    _lastUpdate = new Date();
    setTimeout(() => {
      const diff = new Date() - _lastUpdate;
      if (diff < 1000) return;
      noteRef
        .set(newValues, { merge: true })
        .catch((e) => {
          console.log(e);
          alert('Note could not be updated. Check your internet conection and try again.');
        });
    }, 1000);
  }

  function onTitleChange(evt) {
    const title = evt.target.value;
    updateNote({
      title,
      updatedAt: new Date(),
    });
  }

  function deleteNote() {
    const msg = 'Are you sure you want to delete this note?';
    if (window.confirm(msg)) {
      noteRef.delete();
      onReturn();
    }
  }

  useEffect(() => {
    db.collection('notes')
      .doc(noteId)
      .get({ source: 'cache' })
      .then((snapshot) => {
        setNoteRef(snapshot.ref);
        setNote({
          id: noteId,
          ...snapshot.data(),
        });
      })
      .catch((e) => {
        console.log(e);
        alert('Could not retrieve note. Check your internet connection and try again later.');
        onReturn();
      });
  }, [noteId, onReturn]);

  if (!note) return null;

  return (
    <div className="editor-page">
      <Header
        title={note.title}
        editableTitle
        onTitleChange={onTitleChange}
        onReturn={onReturn}
      >
        <Button
          aria-label="Bold"
          small
          accentColoredText
          noBorder
          noShadow
        >
          <span className="editor-page__bold">
            B
          </span>
        </Button>
        <Button
          aria-label="Italic"
          small
          accentColoredText
          noBorder
          noShadow
        >
          <span className="editor-page__italic">
            I
          </span>
        </Button>
        <Button
          aria-label="Underline"
          small
          accentColoredText
          noBorder
          noShadow
        >
          <span className="editor-page__underline">
            U
          </span>
        </Button>
        <Button
          aria-label="Checkbox / Text"
          small
          accentColoredText
          noBorder
          noShadow
        >
          <Icon
            type="circleChecked"
            aria-hidden
            fill={'var(--accent-color)'}
          />
        </Button>
        <Button
          aria-label="Delete Note"
          small
          accentColoredText
          noBorder
          noShadow
          onClick={deleteNote}
        >
          <Icon
            type="trash"
            aria-hidden
            fill={'var(--accent-color)'}
          />
        </Button>
      </Header>
      <div className="editor-page__scrollable-area">
        <div className="editor-page__content">
          <div className="editor-page__date">
            {note.updatedAt.toDate().toDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

EditorPage.propTypes = {
  noteId: PropTypes.string.isRequired,
  onReturn: PropTypes.func.isRequired,
};

export default EditorPage;
