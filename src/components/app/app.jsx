import React, { useState, useEffect } from 'react';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import ActivityIndicator from '../activity-indicator/activity-indicator';
import './app.css';

function App() {
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [user, setUser] = useState(null);
  const [tabUse, setTabUse] = useState(false);

  useEffect(() => {
    function isUsingTab(evt) {
      if (evt.key !== 'Tab') return;
      if (tabUse) return;
      setTabUse(true);
    }

    function isNotUsingTab() {
      if (tabUse === false) return;
      setTabUse(false);
    }

    window.addEventListener('keydown', isUsingTab);
    window.addEventListener('touchstart', isNotUsingTab);
    window.addEventListener('mousemove', isNotUsingTab);
    return () => {
      window.removeEventListener('keydown', isUsingTab);
      window.removeEventListener('touchstart', isNotUsingTab);
      window.removeEventListener('mousemove', isNotUsingTab);
    };
  }, [tabUse]);

  return (
    <div className={`app ${tabUse === false ? 'app--no-outline' : ''}`}>
      {activityIndicator ? <ActivityIndicator /> : null}
      {user
        ? (
          <MainPage
            setActivityIndicator={setActivityIndicator}
            user={user}
          />
        )
        : (
          <LoginPage
            setActivityIndicator={setActivityIndicator}
            setUser={setUser}
          />
        )}
    </div>
  );
}

export default App;
