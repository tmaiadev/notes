import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesTopToolbar from './notesTopToolbar';
import NotesBottomToolbar from './notesBottomToolbar';
import NotesSearch from './notesSearch';
import Scrollable from './scollable';
import './notes.css';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(q) {
        console.log('SEARCH', q);
    }

    render() {
        const className = "notes " +
            (this.props.className || '');

        return (
            <div className={className}>
                <NotesTopToolbar />
                <Scrollable className="notes__main">
                    <h2>Notes</h2>
                    <NotesSearch onChange={this.onSearchChange} />
                </Scrollable>
                <NotesBottomToolbar />
            </div>
        )
    }
}

Notes.propTypes = {
    className: PropTypes.string
};

export default Notes;