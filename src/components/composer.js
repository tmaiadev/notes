import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollable from './scollable';
import './composer.css';

class Composer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const className = ['composer'];
        if (this.props.className) className.push(this.props.className);
        if (this.props.foreground) className.push('composer--foreground');

        return (
            <main className={className.join(' ')}>
                <Scrollable>
                    <h1>Composer</h1>
                </Scrollable>
            </main>
        )
    }
}

Composer.propTypes = {
    className: PropTypes.string,
    foreground: PropTypes.bool
};

export default Composer;