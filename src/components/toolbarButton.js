import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './toolbarButton.css';

class ToolbarButton extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    
    onClick(evt) {
        if ( ! this.props.onClick) return;
        this.props.onClick(evt);
    }

    render() {
        const iconClassName = ['toolbar-button__icon'];
        if (this.props.icon) iconClassName.push(this.props.icon);
        if (this.props.smallIcon) iconClassName.push('toolbar-button__icon--small');

        const icon = this.props.icon ?
            <i className={iconClassName.join(' ')} aria-hidden></i> : null;

        let componentClassName = 'toolbar-button';
        if (this.props.mobileOnly) componentClassName += ' toolbar-button--mobile-only';
        if (this.props.disabled) componentClassName += ' toolbar-button--disabled';

        return (
            <button type="button"
                    className={componentClassName}
                    onClick={this.onClick}
                    aria-label={this.props.label}
                    disabled={this.props.disabled}>
                {icon}
                {this.props.children ? <span className="toolbar-button__text">{this.props.children}</span> : null}
            </button>
        )
    }
}

ToolbarButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    smallIcon: PropTypes.bool,
    mobileOnly: PropTypes.bool,
    children: PropTypes.string,
    disabled: PropTypes.bool
}

export default ToolbarButton;