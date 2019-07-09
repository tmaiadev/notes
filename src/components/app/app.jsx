import React, { useState } from 'react';
import LoginPage from '../login-page/login-page';
import ActivityIndicator from '../activity-indicator/activity-indicator';
import './app.css';

function App() {
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {activityIndicator ? <ActivityIndicator /> : null}
      <LoginPage
        user={user}
        setActivityIndicator={setActivityIndicator}
        setUser={setUser}
      />
    </div>
  );
}

export default App;
