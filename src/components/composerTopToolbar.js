import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar';
import ToolbarSpacer from './toolbarSpacer';
import ToolbarButton from './toolbarButton';

class ComposerTopToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarButton label="Return"
                               icon="fas fa-chevron-left"
                               mobileOnly
                               onClick={this.props.goToMenu}>
                    Return
                </ToolbarButton>
                <ToolbarSpacer />
                <ToolbarButton label="Attach file"
                               icon="fas fa-paperclip"
                               onClick={this.props.onAttachmentClick} />
                <ToolbarButton label="Checkbox List"
                               icon="fas fa-list-ul"
                               onClick={this.props.onCheckboxClick} />
            </Toolbar>
        )
    }
}

ComposerTopToolbar.propTypes = {
    goToMenu: PropTypes.func.isRequired,
    checklist: PropTypes.bool,
    onCheckboxClick: PropTypes.func.isRequired,
    onAttachmentClick: PropTypes.func.isRequired
}

export default ComposerTopToolbar;