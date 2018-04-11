import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar';
import ToolbarButton from './toolbarButton';
import ToolbarSpacer from './toolbarSpacer';

class ComposerFontToolbar extends Component {
    render() {
        return (
            <Toolbar dark>
                <ToolbarButton dark
                               onClick={this.props.onTitleClick}
                               label="Title Style"><b>H1</b></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.props.onSubtitleClick}
                               label="Subtitle Style"><i>H2</i></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.props.onNormalClick}
                               label="Normal Style">Normal</ToolbarButton>
                <ToolbarSpacer />
                <ToolbarButton dark
                               onClick={this.props.onBoldClick}
                               label="Bold"><b>B</b></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.props.onItalicClick}
                               label="Italic"><i>I</i></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.props.onUnderlineClick}
                               labek="Underline"><u>U</u></ToolbarButton>
            </Toolbar>
        )
    }
}

ComposerFontToolbar.propTypes = {
    onTitleClick: PropTypes.func.isRequired,
    onSubtitleClick: PropTypes.func.isRequired,
    onNormalClick: PropTypes.func.isRequired,
    onBoldClick: PropTypes.func.isRequired,
    onItalicClick: PropTypes.func.isRequired,
    onUnderlineClick: PropTypes.func.isRequired
}

export default ComposerFontToolbar;