
import React from 'react';
import PropTypes from 'prop-types';

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