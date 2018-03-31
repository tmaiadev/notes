import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menuSearch.css';

class MenuSearch extends Component {
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
            <form className="menu-search" onSubmit={this.onSubmit}>
                <input type="text"
                       className="menu-search__input"
                       placeholder="Search"
                       ref={el => this.$el = el} />
            </form>
        )
    }
}

MenuSearch.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default MenuSearch;