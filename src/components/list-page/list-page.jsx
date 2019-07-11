import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Button from '../button/button';
import Icon from '../icon/icon';
import Credits from '../credits/credits';
import db from '../../libs/firestore';
import './list-page.css';

function ListPage({
  onNewNote,
  user,
  activeNoteId,
}) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (notes.length > 0) return;
    db.collection('notes')
      .where('user', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        setNotes(
          querySnapshot
            .docs
            .map(doc => ({ id: doc.id, ...doc.data() })),
        );
      })
      .catch((e) => {
        console.log(e);
        alert('Something went wrong. Try again later.');
      })
      .finally(() => {
        
      });
  }, [notes, setNotes, user.uid]);

  return (
    <div className="list-page">
      <Header>
        <Button
          onClick={onNewNote}
          small
          accentColoredText
          noShadow
          noBorder
        >
          New Note
          &nbsp;
          <Icon
            type="addCircle"
            fill="var(--accent-color)"
            aria-hidden
          />
        </Button>
      </Header>
      <div className="list-page__main">
        <div className="list-page__list">
          {notes
            .map(({ id, title, updatedAt }) => {
              const active = id === activeNoteId;
              return (
                <button
                  key={id}
                  className={'list-page__list-item '
                    + `${active ? 'list-page__list-item--active' : ''}`
                  }
                >
                  <div className="list-page__list-item__title">
                    {title}
                  </div>
                  <div className="list-page__list-item__date">
                    {updatedAt.toDate().toDateString()}
                  </div>
                  <div className="list-page__list-item__icon">
                    <Icon
                      type="droprightCircle"
                      fill={'var(--accent-color)'}
                      aria-hidden
                    />
                  </div>
                </button>
              )
            })}
        </div>
        <div className="list-page__credits">
          <Credits />
        </div>
      </div>
    </div>
  );
}

ListPage.propTypes = {
  onNewNote: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  activeNoteId: PropTypes.string,
};

ListPage.defaultProps = {
  activeNoteId: undefined,
};

export default ListPage;
