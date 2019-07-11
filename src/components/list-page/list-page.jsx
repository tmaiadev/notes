import React from 'react';
import Header from '../header/header';
import Button from '../button/button';
import Icon from '../icon/icon';
import Credits from '../credits/credits';
import './list-page.css';

function ListPage() {
  return (
    <div className="list-page">
      <Header>
        <Button
          onClick={() => {}}
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
          {null}
        </div>
        <div className="list-page__credits">
          <Credits />
        </div>
      </div>
    </div>
  );
}

export default ListPage;
