import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Menu from './menu';
import Composer from './composer';
import About from './about';
import { db } from '../firebase';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            showComposer: true
        }

        this.history = createHistory();
        this.notesRef = null;

        this.goToNewNote = this.goToNewNote.bind(this);
        this.goToAbout = this.goToAbout.bind(this);
    }

    componentDidMount() {
        // Everytime the URL changes
        // we have to rerender the composer
        this.history.listen(() => {
            this.setState({ showComposer: false }, () => {
                this.setState({ showComposer: true })
            })
        })
    }

    goToNewNote() {
        const userID = this.props.user.uid;
        const key = db.ref(`${userID}/notes`).push().key;
        const data = {
            content: '',
            lastUpdate: new Date() - 1
        };

        db.ref(`${userID}/notes/${key}`).set(data);
        this.history.push('/' + key);
    }

    goToAbout() {
        this.history.push('/about');
    }

    render() {
        const composer = props => {
            return <Composer className="app__main"
                             goToMenu={this.goToMenu}
                             history={this.history}
                             {...props} />
        }

        return (
            <Router history={this.history}>
                <div className="app">
                    <Menu className="app__menu"
                          goToNewNote={this.goToNewNote}
                          goToAbout={this.goToAbout}
                          notes={this.state.notes} />
                    {this.state.showComposer ?
                        <Switch>
                            <Route path="/about" render={props => <About history={props.history} />} />
                            <Route path="/:note_id" component={composer} />
                        </Switch> : null}
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