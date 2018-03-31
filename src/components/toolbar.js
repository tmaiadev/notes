import React from 'react';
import './toolbar.css';

export default (props) => {
    return (
        <div className="toolbar">
            {props.children}
        </div>
    )
}