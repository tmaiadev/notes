import React, { Component } from 'react';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class MenuBottomToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarSpacer />
                <ToolbarButton label="New Note"
                    icon="far fa-edit" />
            </Toolbar>
        )
    }
}

export default MenuBottomToolbar;