import React, { Component } from 'react';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class NotesTopToolbar extends Component {
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

export default NotesTopToolbar;