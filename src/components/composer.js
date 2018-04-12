import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollable from './scollable';
import ComposerTopToolbar from './composerTopToolbar';
import ComposerBottomToolbar from './composerBottomToolbar';
import ComposerFontToolbar from './composerFontToolbar';
import './composer.css';

class Composer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            showFontToolbar: false,
            active: false
        }

        this.onTextareaBlur = this.onTextareaBlur.bind(this);
        this.onTextareaFocus = this.onTextareaFocus.bind(this);
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onFontClick = this.onFontClick.bind(this);
        this.onTexareaKeyDown = this.onTexareaKeyDown.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.onSubtitleClick = this.onSubtitleClick.bind(this);
        this.onNormalClick = this.onNormalClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);
        this.returnToMenu = this.returnToMenu.bind(this);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ active: true }), 16)
        
    }

    onTextareaFocus() {

    }

    onTextareaBlur() {
        // this.setState({ editingText: false });
    }

    onCheckboxClick() {
        document.execCommand('insertUnorderedList');
        this.$textarea.focus();
    }

    onFontClick() {
        this.setState({ showFontToolbar: ! this.state.showFontToolbar }, () => this.$textarea.focus());
    }

    onTitleClick() {
        document.execCommand('formatBlock', false, 'h1');
        this.$textarea.focus();
    }

    onSubtitleClick() {
        document.execCommand('formatBlock', false, 'h2');
        this.$textarea.focus();
    }

    onNormalClick() {
        document.execCommand('formatBlock', false, 'p');
        this.$textarea.focus();
    }

    onBoldClick() {
        document.execCommand('bold');
        this.$textarea.focus();
    }

    onItalicClick() {
        document.execCommand('italic');
        this.$textarea.focus();
    }

    onUnderlineClick() {
        document.execCommand('underline');
        this.$textarea.focus();
    }

    onTexareaKeyDown(evt) {
        
    }

    returnToMenu() {
        this.setState({ active: false }, () => {
            // Wait for animation to end before changing url
            setTimeout(() => this.props.history.push('/'), 300);
        });
    }

    render() {
        const className = ['composer'];
        if (this.props.className) className.push(this.props.className);
        if (this.state.active) className.push('composer--active');

        return (
            <main className={className.join(' ')}>
                <ComposerTopToolbar
                    goToMenu={this.returnToMenu}
                    onCheckboxClick={this.onCheckboxClick}
                    onFontClick={this.onFontClick} />
                <div className="composer__last-update">
                    {new Date().toString().split(' GMT')[0]}
                </div>
                <Scrollable>
                    <div className="composer__textarea"
                         contentEditable
                         ref={el => this.$textarea = el}
                         onFocus={this.onTextareaFocus}
                         onBlur={this.onTextareaBlur}
                         onKeyDown={this.onTexareaKeyDown}>
                    </div>
                </Scrollable>
                {this.state.showFontToolbar ?
                    <ComposerFontToolbar onTitleClick={this.onTitleClick}
                                         onSubtitleClick={this.onSubtitleClick}
                                         onNormalClick={this.onNormalClick}
                                         onBoldClick={this.onBoldClick}
                                         onItalicClick={this.onItalicClick}
                                         onUnderlineClick={this.onUnderlineClick} /> : null}
                <ComposerBottomToolbar />
            </main>
        )
    }
}

Composer.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object.isRequired
};

export default Composer;