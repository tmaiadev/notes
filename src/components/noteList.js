import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './noteList.css';


class NoteList extends Component {
    render() {
        return (
            <div className="note-list">
                {this.props.notes.map(n => {
                    return <Link to={n.key} key={n.key} className="note-list__item">
                        <h2 className="note-list__item__title">{n.title || 'Untitled'}</h2>
                        <div className="note-list__item__description">{n.rawText}</div>
                        <div className="note-list__item__date">
                            {(new Date(n.lastUpdate)).toString().split(' GMT')[0]}
                        </div>
                    </Link>
                })}
            </div>
        )
    }
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default NoteList;