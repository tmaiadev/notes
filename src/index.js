import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { GoogleAuthProvider, auth } from './firebase';

function initializeApp(user) {
    ReactDOM.render(<App user={user} />, document.getElementById('root'));
}

function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        auth.signInWithPopup(provider);
    } catch (e) {
        alert('An error occurred while trying to sign in. Try again.');
        window.location.reload();
    }
}

function loadIcons() {
    const src = 'https://use.fontawesome.com/releases/v5.0.9/js/all.js';
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

window.addEventListener('load', () => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
          initializeApp(user);
          loadIcons();
        } else {
            const $cta = document.querySelector('.js-cta');
            $cta.classList.remove('button--disabled');
            $cta.innerHTML = 'Continue';
            $cta.disabled = false;
            $cta.addEventListener('click', signInWithGoogle);
        }
    });
});