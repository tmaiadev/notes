import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Title from '../title/title';
import Credits from '../credits/credits';
import Button from '../button/button';
import Icon from '../icon/icon';
import firebase from '../../libs/firebase';
import './login-page.css';

function LoginPage({
  setActivityIndicator,
  setUser,
  user,
}) {
  const [disabledLoginButton, setDisabledLoginButton] = useState(false);

  function login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    setDisabledLoginButton(true);
    setActivityIndicator(true);

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const {
          uid,
          displayName,
        } = result.user;

        setUser({ uid, displayName });
        setActivityIndicator(false);
      });
  }

  useEffect(() => {
    if (user) return;
    firebase
      .auth()
      .onAuthStateChanged((userData) => {
        const {
          uid,
          displayName,
        } = userData;

        setUser({ uid, displayName });
      });
  }, [user, setUser, setActivityIndicator]);

  return (
    <div className="login-page">
      <div className="login-page__container">
        <Title />
        <div className="login-page__subtitle">
          An easy way to take notes.
        </div>
        <div className="login-page__credits">
          <Credits />
        </div>
        <div>
          <Button
            onClick={login}
            fullWidth
            disabled={disabledLoginButton}
          >
            <Icon type="google" />
            {' '}
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  setActivityIndicator: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  user: null,
};

export default LoginPage;
