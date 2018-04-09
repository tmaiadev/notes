import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuTopToolbar from './menuTopToolbar';
import MenuBottomToolbar from './menuBottomToolbar';
import MenuSearch from './menuSearch';
import Scrollable from './scollable';
import './menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(q) {
        console.log('SEARCH', q);
    }

    render() {
        const className = "menu " +
            (this.props.className || '');

        return (
            <aside className={className}>
                <MenuTopToolbar />
                <Scrollable className="menu__main">
                    <h2>Notes</h2>
                    <MenuSearch onChange={this.onSearchChange} />
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