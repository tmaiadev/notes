import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Menu from './menu';
import Composer from './composer';
import db from '../db';
import './app.css';

const WINDOW = {
    MENU: 'MENU',
    COMPOSER: 'COMPOSER'
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }

        this.history = createHistory();
        this.notesRef = null;

        this.goToNewNote = this.goToNewNote.bind(this);
        this.goToMenu = this.goToMenu.bind(this);
    }

    componentDidMount() {
        this.notesRef = db.ref(`user/${this.props.user.uid}/notes`);
    }

    goToNewNote() {
        const key = this.notesRef.push().key;
        const data = {
            content: '',
            lastUpdate: new Date() - 1
        };

        db.ref(`user/${this.props.user.uid}/notes/${key}`).set(data);
        this.history.push(`/${key}`);
    }

    goToMenu() {
        this.setState({ activeWindow: WINDOW.MENU });
    }

    render() {
        const composer = props => {
            return <Composer className="app__main"
                             goToMenu={this.goToMenu}
                             history={this.history} />
        }

        return (
            <Router history={this.history}>
                <div className="app">
                    <Menu className="app__menu"
                          goToNewNote={this.goToNewNote} />
                    <Route path="/:note_id" component={composer} />
                </div>
            </Router>
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