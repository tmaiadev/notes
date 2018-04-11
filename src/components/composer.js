import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollable from './scollable';
import ComposerTopToolbar from './composerTopToolbar';
import ComposerBottomToolbar from './composerBottomToolbar';
import ComposerFontToolbar from './composerFontToolbar';
import './composer.css';

const STYLES = {
    DEFAULT: 'DEFAULT',
    TITLE: 'TITLE',
    SUBTITLE: 'SUBTITLE'
}

class Composer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            showFontToolbar: false
        }

        this.onTextareaBlur = this.onTextareaBlur.bind(this);
        this.onTextareaFocus = this.onTextareaFocus.bind(this);
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onFontClick = this.onFontClick.bind(this);
        this.onTexareaKeyDown = this.onTexareaKeyDown.bind(this);
    }

    onTextareaFocus() {

    }

    onTextareaBlur() {
        // this.setState({ editingText: false });
    }

    onCheckboxClick() {
        document.execCommand('insertUnorderedList');
    }

    onFontClick() {
        this.setState({ showFontToolbar: ! this.state.showFontToolbar });
    }

    onTexareaKeyDown(evt) {
        
    }

    render() {
        const className = ['composer'];
        if (this.props.className) className.push(this.props.className);
        if (this.props.foreground) className.push('composer--foreground');

        return (
            <main className={className.join(' ')}>
                <ComposerTopToolbar
                    goToMenu={this.props.goToMenu}
                    onCheckboxClick={this.onCheckboxClick}
                    onFontClick={this.onFontClick} />
                <Scrollable>
                    <div className="composer__textarea"
                         contentEditable
                         onFocus={this.onTextareaFocus}
                         onBlur={this.onTextareaBlur}
                         onKeyDown={this.onTexareaKeyDown}>
                    </div>
                </Scrollable>
                {this.state.showFontToolbar ? <ComposerFontToolbar /> : null}
                <ComposerBottomToolbar />
            </main>
        )
    }
}

Composer.propTypes = {
    className: PropTypes.string,
    foreground: PropTypes.bool,
    goToMenu: PropTypes.func.isRequired
};

export default Composer;