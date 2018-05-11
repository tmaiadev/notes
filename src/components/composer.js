import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollable from './scrollable';
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
            active: false
        }

        this.lastInput = 0;

        this.save = this.save.bind(this);
        this.onTextareaInput = this.onTextareaInput.bind(this);
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onAttachmentClick = this.onAttachmentClick.bind(this);
        this.onAttachmentSelected = this.onAttachmentSelected.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.onSubtitleClick = this.onSubtitleClick.bind(this);
        this.onNormalClick = this.onNormalClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
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

            // Explicitly describe on the DOM that the checkbox
            // is checked. Otherwise the checkbox state is not saved.
            Array.from(this.$textarea.querySelectorAll('input[type=checkbox]'))
            .forEach($checkbox => {
                $checkbox.addEventListener('click', function() {
                    if (this.checked) {
                        this.setAttribute('checked', 'true');
                    } else {
                        this.removeAttribute('checked');
                    }
                })
            });

            this.manageCheckboxes();

            this.setState({
                active: true,
                lastUpdate
            });
        });
    }

    createCheckbox(id) {
        // Create checkbox
        const $checkbox = document.createElement('input');
        $checkbox.type = 'checkbox';
        $checkbox.setAttribute('aria-labelledby', id);
        $checkbox.style.left = 15 + 'px';

        // This listener is needed to explicitly describe
        // on the DOM that the checkbox is checked. Otherwise
        // the checkbox state is not saved.
        $checkbox.addEventListener('click', function() {
            if (this.checked) {
                this.setAttribute('checked', 'true');
            } else {
                this.removeAttribute('checked');
            }
        });

        // Append it on the textarea
        this.$textarea.appendChild($checkbox);
    }

    manageCheckboxes() {
        // Search for all list items
        Array.from(this.$textarea.querySelectorAll('li'))
        .forEach($li => {
            // If the list item does not have an ID
            // it means that it is the first one.
            // We id the list item and create a checkbox for it
            if ( ! $li.id) {
                $li.id = (new Date() - 1).toString(32);
                this.createCheckbox($li.id);
            } else {
                // If the list item has an ID, we check
                // if there are other list items with the same id,
                // for the ID is duplicated when the user
                // hits enter to create a new list item. 
                // Then we create a new ID for the new list item
                // and a corresponding checkbox
                const sameIDElements = this.$textarea.querySelectorAll(`li[id="${$li.id}"]`);
                if (sameIDElements.length >= 2) {
                    const $newLi = sameIDElements[1];
                    $newLi.id = (new Date() - 1).toString(32);
                    this.createCheckbox($newLi.id);
                } else {
                    // Sometimes, if the user undo a deleted list (ctrl + z)
                    // the checkbox is not created. So we check if the li
                    // have a corresponding checkbox. If not, create one.
                    const $checkbox = this.$textarea.querySelector(`input[aria-labelledby="${$li.id}"]`);
                    if ( ! $checkbox) this.createCheckbox($li.id);
                }
            }
        });

        // Get all checkboxes
        Array.from(this.$textarea.querySelectorAll('input[type=checkbox]'))
        .forEach($checkbox => {
            const liId = $checkbox.getAttribute('aria-labelledby');
            const $li = document.getElementById(liId);

            if ($li) {
                // If we have a list item, we position it correctly.
                // We have to do this everytime because the user can
                // create other list items or break a line, which
                // messes up the positioning of the checkboxes
                $checkbox.style.top = $li.offsetTop + 'px';
            } else {
                // If corresponding list item does not exist
                // delete the checkbox
                 this.$textarea.removeChild($checkbox);
            }
        });
    }

    save() {
        const content = this.$textarea.innerHTML;
        const lastUpdate = new Date() - 1;
        this.noteRef.set({ content, lastUpdate });
    }

    onTextareaInput() {
        this.manageCheckboxes();

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

    onAttachmentClick() {
        this.$file.click();
    }

    onAttachmentSelected() {
        if (this.$file.files.length === 0) return;

        const file = this.$file.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // Focus on the composer
            this.$textarea.focus();

            // Create a new range
            const range = document.createRange();

            // Focus on the last child of the composer
            const childNodes = this.$textarea.childNodes;
            const lastNode = childNodes[childNodes.length - 1];
            range.setStart(lastNode, lastNode.childNodes.length);
            range.collapse(true);

            // Selection gets new range
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

            // Add a new line and insert the image
            document.execCommand('insertBrOnReturn', null);
            document.execCommand('insertImage', null, reader.result);
        }
        reader.readAsDataURL(file);
        this.$file.value = "";
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

    onDeleteClick() {
        this.noteRef.remove();
        this.setState({ active: false }, () => {
            setTimeout(() => {
                this.props.history.push('/');
            }, 1000);
        });
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
                <input type="file"
                       accept="image/*"
                       className="composer__file"
                       ref={el => this.$file = el}
                       onChange={this.onAttachmentSelected} />
                <ComposerTopToolbar
                    goToMenu={this.returnToMenu}
                    onCheckboxClick={this.onCheckboxClick}
                    onFontClick={this.onFontClick}
                    onAttachmentClick={this.onAttachmentClick} />
                <div className="composer__last-update">
                    {new Date().toString().split(' GMT')[0]}
                </div>
                <Scrollable className="composer__scrollview">
                    <div className="composer__textarea"
                         contentEditable={this.state.active}
                         ref={el => this.$textarea = el}
                         onKeyDown={this.onTexareaKeyDown}
                         onInput={this.onTextareaInput}>
                    </div>
                </Scrollable>
                <ComposerFontToolbar onTitleClick={this.onTitleClick}
                                         onSubtitleClick={this.onSubtitleClick}
                                         onNormalClick={this.onNormalClick}
                                         onBoldClick={this.onBoldClick}
                                         onItalicClick={this.onItalicClick}
                                         onUnderlineClick={this.onUnderlineClick} />
                <ComposerBottomToolbar onDeleteClick={this.onDeleteClick} />
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