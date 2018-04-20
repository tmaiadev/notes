import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollable from './scollable';
import ComposerTopToolbar from './composerTopToolbar';
import ComposerBottomToolbar from './composerBottomToolbar';
import ComposerFontToolbar from './composerFontToolbar';
import { db, auth } from '../firebase';
import './composer.css';

class Composer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            lastUpdate: new Date(),
            showFontToolbar: false,
            active: false
        }

        this.lastInput = 0;

        this.save = this.save.bind(this);
        this.onTextareaBlur = this.onTextareaBlur.bind(this);
        this.onTextareaFocus = this.onTextareaFocus.bind(this);
        this.onTextareaInput = this.onTextareaInput.bind(this);
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
        const uid = auth.currentUser.uid;
        const noteid = this.props.match.params.note_id;

        this.noteRef = db.ref(`${uid}/notes/${noteid}`);
        this.noteRef.once('value', snapshot => {
            const value = snapshot.val();
            if ( ! value || this.state.active) return;
            
            const {
                content,
                lastUpdate
            } = snapshot.val();

            this.$textarea.innerHTML = content;

            this.setState({
                active: true,
                lastUpdate
            })
        });
    }

    save() {
        const content = this.$textarea.innerHTML;
        const lastUpdate = new Date() - 1;
        this.noteRef.set({ content, lastUpdate });
    }

    onTextareaFocus() {

    }

    onTextareaBlur() {
        // this.setState({ editingText: false });
    }

    onTextareaInput() {
        this.lastInput = new Date();
        setTimeout(() => {
            const diff = new Date() - this.lastInput;
            if (diff < 1000) return;
            this.save();
        }, 1000);
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
                         contentEditable={this.state.active}
                         ref={el => this.$textarea = el}
                         onFocus={this.onTextareaFocus}
                         onBlur={this.onTextareaBlur}
                         onKeyDown={this.onTexareaKeyDown}
                         onInput={this.onTextareaInput}>
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
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default Composer;