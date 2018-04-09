import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class MenuBottomToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarSpacer />
                <ToolbarButton label="New Note"
                               icon="far fa-edit"
                               onClick={this.props.goToNewNote} />
            </Toolbar>
        )
    }
}

MenuBottomToolbar.propTypes = {
    goToNewNote: PropTypes.func.isRequired
}

export default MenuBottomToolbar;