import React from 'react';
import './toolbar.css';

export default (props) => {
    const classList = ['toolbar'];
    if (props.dark) classList.push('toolbar--dark');
    if (props.className) classList.push(props.className);

    return (
        <div className={classList.join(' ')}>
            {props.children}
        </div>
    )
}