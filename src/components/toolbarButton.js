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
        const icon = this.props.icon ?
            <i className={"toolbar-button__icon " + this.props.icon} aria-hidden></i> : null;

        return (
            <button type="button"
                    className="toolbar-button"
                    onClick={this.onClick}
                    aria-label={this.props.label}>
                {icon}
                {this.props.children}
            </button>
        )
    }
}

ToolbarButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string
}

export default ToolbarButton;