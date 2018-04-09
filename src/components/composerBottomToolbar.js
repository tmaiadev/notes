import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class ComposerBottomToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarButton label="Delete"
                               icon="far fa-trash-alt" />
                <ToolbarSpacer />
            </Toolbar>
        )
    }
}

ComposerBottomToolbar.propTypes = {
    enabled: PropTypes.bool
}

export default ComposerBottomToolbar;