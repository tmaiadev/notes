import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';
import Composer from './composer';
import './app.css';

const WINDOW = {
    MENU: 'MENU',
    COMPOSER: 'COMPOSER'
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeWindow: WINDOW.MENU
        }

        this.newNote = this.newNote.bind(this);
    }

    newNote() {
        this.setState({ activeWindow: WINDOW.COMPOSER });
    }

    render() {
        return (
            <div className="app">
                <Menu className="app__menu"
                      newNote={this.newNote} />
                <Composer className="app__main" foreground={this.state.activeWindow === WINDOW.COMPOSER} />
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