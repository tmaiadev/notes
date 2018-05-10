import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class MenuBottomToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarButton label="About"
                               icon="fas fa-info-circle"
                               onClick={this.props.goToAbout} />
                <ToolbarSpacer />
                <ToolbarButton label="New Note"
                               icon="far fa-edit"
                               onClick={this.props.goToNewNote} />
            </Toolbar>
        )
    }
}

MenuBottomToolbar.propTypes = {
    goToNewNote: PropTypes.func.isRequired,
    goToAbout: PropTypes.func.isRequired
}

export default MenuBottomToolbar;