import React from 'react';
import './toolbar.css';

export default (props) => {
    const classList = ['toolbar'];
    if (props.dark) classList.push('toolbar--dark');

    return (
        <div className={classList.join(' ')}>
            {props.children}
        </div>
    )
}