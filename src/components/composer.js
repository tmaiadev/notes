import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollable from './scollable';
import './composer.css';

class Composer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const className = "composer " +
            (this.props.className || '');

        return (
            <main className={className}>
                <Scrollable>
                    <h1>Composer</h1>
                </Scrollable>
            </main>
        )
    }
}

Composer.propTypes = {
    className: PropTypes.string
};

export default Composer;