import React, { Fragment } from 'react';

function Credits() {
  return (
    <Fragment>
      Created by
      {' '}
      <a
        href="http://thallesmaia.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Thalles Maia
      </a>
      <br />
      This project is
      {' '}
      <a
        href="http://github.com/tmaiadev/notes/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Source
      </a>
    </Fragment>
  );
}

export default Credits;
