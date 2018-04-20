import React from 'react';
import PropTypes from 'prop-types';
import './scrollable.css';

const Scrollable = props => {
    const className = "scrollable " + 
        (props.className || '');
    
    return <div className={className}>
        {props.children}
    </div>
};

Scrollable.propTypes = {
    className: PropTypes.string
}

export default Scrollable;