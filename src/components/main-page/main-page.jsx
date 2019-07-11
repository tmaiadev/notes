import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListPage from '../list-page/list-page';
import db from '../../libs/firestore';
import './main-page.css';

function MainPage({
  setActivityIndicator,
  user,
}) {
  const [noteId, setNoteId] = useState(null);

  async function newNote() {
    setActivityIndicator(true);

    try {
      const now = new Date();
      const { id } = await db
        .collection('notes')
        .add({
          title: 'New note',
          content: [
            { type: 'paragraph', content: '' },
          ],
          createdAt: now,
          updatedAt: now,
          user: user.uid,
        });

      setNoteId(id);
    } catch (e) {
      console.log(e);
      alert('Something went wrong. Try again later.');
    } finally {
      setActivityIndicator(false);
    }
  }

  return (
    <div className="main-page">
      <div className="main-page__page-container main-page__list">
        <ListPage
          onNewNote={newNote}
          user={user}
          noteId={noteId}
        />
      </div>
      <div
        className={'main-page__page-container main-page__editor '
          + `${noteId ? 'main-page__editor--active' : ''}`}
      >
        {noteId}
      </div>
    </div>
  );
}

MainPage.propTypes = {
  setActivityIndicator: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default MainPage;
