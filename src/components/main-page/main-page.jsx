import React, { useState } from 'react';
import ListPage from '../list-page/list-page';
import './main-page.css';

function MainPage() {
  const [noteId] = useState(null);

  return (
    <div className="main-page">
      <div className="main-page__page-container main-page__list">
        <ListPage />
      </div>
      <div
        className={'main-page__page-container main-page__editor '
          + `${noteId ? 'main-page__editor--active' : ''}`}
      >
        EDITOR
      </div>
    </div>
  );
}

export default MainPage;
