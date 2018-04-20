import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoteList from './noteList';
import Firebase from '../firebase';
import MenuTopToolbar from './menuTopToolbar';
import MenuBottomToolbar from './menuBottomToolbar';
import MenuSearch from './menuSearch';
import Scrollable from './scollable';
import './menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            notes: []
        }

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onNotesUpdate = this.onNotesUpdate.bind(this);
    }

    componentDidMount() {
        const userID = Firebase.auth().currentUser.uid;
        const db = Firebase.database();

        this.notesRef = db.ref(`${userID}/notes`);
        this.notesRef.on('value', this.onNotesUpdate);
    }

    onNotesUpdate(snapshot) {
        const notes = snapshot.val();
        if ( ! notes) return;

        this.setState({
            notes: Object.keys(notes)
            .map(key => {
                const note = notes[key];

                const rawText = note
                .content
                .replace(/<(\s|\S)*?>/g, ' ')
                .replace(/\n/g, ' ');

                const title = note
                .content
                .replace(/<(\s|\S)*?>/g, '|')
                .split('|')
                .find(s => s.length > 0) || '';

                return {
                    key,
                    title,
                    rawText,
                    ...note
                }
            })
            .sort((a, b) => a.lastUpdate < b.lastUpdate)
        });
    }

    onSearchChange(q) {
        this.setState({ searchQuery: q })
    }

    render() {
        const className = "menu " +
            (this.props.className || '');

        const notes = this.state
        .notes
        .filter(n => ! this.state.searchQuery || n.rawText.toLowerCase().indexOf(n.state.searchQuery.toLowerCase()) !== -1);

        return (
            <aside className={className}>
                <MenuTopToolbar />
                <Scrollable className="menu__main">
                    <h2>Notes</h2>
                    <MenuSearch onChange={this.onSearchChange} />
                    <NoteList notes={notes} />
                </Scrollable>
                <MenuBottomToolbar goToNewNote={this.props.goToNewNote} />
            </aside>
        )
    }
}

Menu.propTypes = {
    className: PropTypes.string,
    goToNewNote: PropTypes.func.isRequired
};

export default Menu;