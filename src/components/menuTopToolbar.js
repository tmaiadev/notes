import React, { Component } from 'react';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class MenuTopToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarSpacer />
                <ToolbarButton>
                    Edit
                </ToolbarButton>
            </Toolbar>
        )
    }
}

export default MenuTopToolbar;