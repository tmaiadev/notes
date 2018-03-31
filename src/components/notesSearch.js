import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './notesSearch.css';

class NotesSearch extends Component {
    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.onChange(this.$el.value);
    }

    render() {
        return (
            <form className="notes-search" onSubmit={this.onSubmit}>
                <input type="text"
                       className="notes-search__input"
                       placeholder="Search"
                       ref={el => this.$el = el} />
            </form>
        )
    }
}

NotesSearch.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default NotesSearch;