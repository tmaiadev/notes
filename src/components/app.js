import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';
import Composer from './composer';
import './app.css';

const WINDOW = {
    MENU: 'MENU',
    MAIN: 'MAIN'
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: WINDOW.MENU
        }

        this.newNote = this.newNote.bind(this);
    }

    newNote() {

    }

    render() {
        return (
            <div className="app">
                <Menu className="app__menu" />
                <Composer className="app__main" />
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