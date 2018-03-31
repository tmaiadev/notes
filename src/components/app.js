import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notes from './notes';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Notes className="app__menu" />
            </div>
        )
    }
}

App.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    })
};

export default App;