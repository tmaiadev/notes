import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';
import './composerBottomToolbar.css';

class ComposerBottomToolbar extends Component {
    constructor(props) {
        super(props);
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick() {
        if (window.confirm("Are you sure you want to delete this note?")) {
            this.props.onDeleteClick();
        }
    }

    render() {
        return (
            <Toolbar className="composer-bottom-toolbar">
                <ToolbarButton label="Delete"
                               icon="far fa-trash-alt"
                               onClick={this.onDeleteClick} />
                <ToolbarSpacer />
            </Toolbar>
        )
    }
}

ComposerBottomToolbar.propTypes = {
    onDeleteClick: PropTypes.func.isRequired
}

export default ComposerBottomToolbar;