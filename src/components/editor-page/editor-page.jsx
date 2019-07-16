import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Button from '../button/button';
import Icon from '../icon/icon';
import Paragraph from '../paragraph/paragraph';
import db from '../../libs/firestore';
import './editor-page.css';

function EditorPage({
  noteId,
  onReturn,
}) {
  const [note, setNote] = useState(null);
  const [noteRef, setNoteRef] = useState(null);
  let lastUpdate = new Date();
  let currParagraphId = null;

  function updateNote(newValues) {
    lastUpdate = new Date();
    setTimeout(() => {
      const diff = new Date() - lastUpdate;
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

  function focusOnParagraph(id, offset = undefined) {
    document.getElementById(id).focus();
    requestAnimationFrame(() => {
      const selection = window.getSelection();
      const { anchorNode } = selection;

      let position = 0;

      // When offset is undefined, we
      // bring the carrot to the last char
      if (offset === undefined) {
        if (anchorNode.data) {
          position = anchorNode.data.length;
        } else {
          // When data does not exist,
          // it means that the paragraph is new. So set to zero.
          position = 0;
        }
      } else {
        position = offset;
      }

      selection.setPosition(anchorNode, position);
    });
  }

  function addNewParagraph(id, value) {
    const index = note.content.findIndex(p => p.id === id);
    const paragraph = note.content.find(p => p.id === id);
    const newId = Math.random().toString(32).substr(2);
    const content = [
      ...note.content.filter((p, i) => i <= index),
      {
        id: newId,
        type: paragraph.type,
        value,
      },
      ...note.content.filter((p, i) => i > index),
    ];

    setNote({
      ...note,
      content,
    });

    // Focus on the new paragraph
    requestAnimationFrame(() => focusOnParagraph(newId, 0));
  }

  function removeParagraph(id) {
    const index = note.content.findIndex(p => p.id === id);
    if (index === 0) return;

    const previousParagraph = note.content[index - 1];

    setNote({
      ...note,
      content: note.content.filter(p => p.id !== id),
    });

    // focus on the previous paragraph
    requestAnimationFrame(() => focusOnParagraph(previousParagraph.id));
  }

  function appendToPrevParagraph(id) {
    const index = note.content.findIndex(p => p.id === id);
    if (index === 0) return;
    const curr = { ...note.content[index] };
    const prev = { ...note.content[index - 1] };
    setNote({
      ...note,
      content: [
        ...note
          .content
          .map((p) => {
            if (p.id === curr.id) {
              return undefined;
            }

            if (p.id === prev.id) {
              const newParagraph = p;
              newParagraph.value = `${prev.value}${curr.value}`;
              return newParagraph;
            }

            return p;
          })
          .filter(p => p !== undefined),
      ],
    });
    requestAnimationFrame(() => {
      updateNote({
        content: note.content,
        updatedAt: new Date(),
      });
      requestAnimationFrame(() => {
        focusOnParagraph(prev.id, prev.value.length);
      });
    });
  }

  function focusOnPrevParagraph(id) {
    const index = note.content.findIndex(p => p.id === id);
    if (index === 0) return;
    focusOnParagraph(note.content[index - 1].id);
  }

  function focusOnNextParagraph(id) {
    const index = note.content.findIndex(p => p.id === id) + 1;
    const nextParagraph = note.content[index];
    if (!nextParagraph) return;
    focusOnParagraph(nextParagraph.id, 0);
  }

  function onParagraphChange(id, value) {
    updateNote({
      content: [
        ...note
          .content
          .map((p) => {
            const newp = p;
            if (newp.id === id) {
              newp.value = value;
            }
            return newp;
          }),
      ],
      updatedAt: new Date(),
    });
  }

  function onParagraphFocus(id) {
    currParagraphId = id;
  }

  function toggleList() {
    if (!currParagraphId) return;
    const paragraph = note.content.find(p => p.id === currParagraphId);
    const type = paragraph.type === 'list'
      ? 'paragraph'
      : 'list';

    setNote({
      ...note,
      content: [
        ...note
          .content
          .map((p) => {
            if (p.id === currParagraphId) {
              const newp = p;
              newp.type = type;
              return newp;
            }

            return p;
          }),
      ],
    });

    requestAnimationFrame(() => focusOnParagraph(currParagraphId));
    updateNote({
      content: note.content,
      updatedAt: new Date(),
    });
  }

  // Get note from db
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

  // When user touches on the scrollable area, focus on the last Paragraph.
  useEffect(() => {
    if (!note) return undefined;

    function onClick(evt) {
      if (evt.target.classList.contains('editor-page__scrollable-area')) {
        const inputs = Array.from(evt.target.querySelectorAll('.paragraph__input'));
        focusOnParagraph(inputs[inputs.length - 1].id);
      }
    }

    const scrollableArea = document.querySelector('.editor-page__scrollable-area');
    scrollableArea.addEventListener('click', onClick);
    return () => scrollableArea.removeEventListener('click', onClick);
  }, [note]);

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
          aria-label="List"
          title="List"
          small
          accentColoredText
          noBorder
          noShadow
          onClick={toggleList}
        >
          <Icon
            type="list"
            aria-hidden
            fill="var(--accent-color)"
          />
        </Button>
        <Button
          aria-label="Checkbox"
          title="Checkbox"
          small
          accentColoredText
          noBorder
          noShadow
        >
          <Icon
            type="circleChecked"
            aria-hidden
            fill="var(--accent-color)"
          />
        </Button>
        <Button
          aria-label="Delete Note"
          title="Delete Note"
          small
          accentColoredText
          noBorder
          noShadow
          onClick={deleteNote}
        >
          <Icon
            type="trash"
            aria-hidden
            fill="var(--accent-color)"
          />
        </Button>
      </Header>
      <div className="editor-page__scrollable-area">
        <div className="editor-page__content">
          <div className="editor-page__date">
            {note.updatedAt.toDate().toDateString()}
          </div>
          {note
            .content
            .map(({
              id,
              value,
              type,
            }) => (
              <Paragraph
                key={id}
                id={id}
                type={type}
                value={value}
                onNewParagraph={addNewParagraph}
                onRemoveParagraph={removeParagraph}
                onPrevParagraph={focusOnPrevParagraph}
                onNextParagraph={focusOnNextParagraph}
                onAppendToPreviousParagraph={appendToPrevParagraph}
                onChange={onParagraphChange}
                onFocus={onParagraphFocus}
              />
            ))}
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
