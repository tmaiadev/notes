import React, { Component } from 'react';
import Toolbar from './toolbar';
import ToolbarButton from './toolbarButton';
import ToolbarSpacer from './toolbarSpacer';

class ComposerFontToolbar extends Component {
    constructor(props) {
        super(props);

        this.onTitleClick = this.onTitleClick.bind(this);
        this.onSubtitleClick = this.onSubtitleClick.bind(this);
        this.onNormalClick = this.onNormalClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);
    }

    onTitleClick() {
        document.execCommand('formatBlock', false, 'H1');
    }

    onSubtitleClick() {
        document.execCommand('formatBlock', false, 'H2');
    }

    onNormalClick() {
        document.execCommand('formatBlock', false, 'p');
    }

    onBoldClick() {
        document.execCommand('bold');
    }

    onItalicClick() {
        document.execCommand('italic');
    }

    onUnderlineClick() {
        document.execCommand('underline');
    }

    render() {
        return (
            <Toolbar dark>
                <ToolbarButton dark
                               onClick={this.onTitleClick}
                               label="Title Style"><b>H1</b></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.onSubtitleClick.bind(this)}
                               label="Subtitle Style"><i>H2</i></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.onNormalClick.bind(this)}
                               label="Normal Style">Normal</ToolbarButton>
                <ToolbarSpacer />
                <ToolbarButton dark
                               onClick={this.onBoldClick.bind(this)}
                               label="Bold"><b>B</b></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.onItalicClick.bind(this)}
                               label="Italic"><i>I</i></ToolbarButton>
                <ToolbarButton dark
                               onClick={this.onUnderlineClick.bind(this)}
                               labek="Underline"><u>U</u></ToolbarButton>
            </Toolbar>
        )
    }
}

export default ComposerFontToolbar;