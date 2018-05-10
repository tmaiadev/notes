import React, { Component } from 'react';
import Toolbar from './toolbar';
import ToolbarButton from './toolbarButton';
import PropTypes from 'prop-types';
import './about.css';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.goToMenu = this.goToMenu.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({ active: true });
        });
    }

    goToMenu() {
        this.setState({ active: false }, () => {
            setTimeout(() => {
                this.props.history.push('/');
            }, 1000);
        });
    }

    render() {
        return (
            <div className={`about ${this.state.active ? 'about--active': ''}`}>
                <Toolbar>
                    <ToolbarButton label="Return"
                                icon="fas fa-chevron-left"
                                mobileOnly
                                onClick={this.goToMenu}>
                        Return
                    </ToolbarButton>
                </Toolbar>
                <main className="about__content">
                    <div className="about__content__wrapper">
                        <p>
                            Notes is a simple and easy way to take notes and make lists.
                            It helps you keep all of your notes organized and secure.
                        </p>
                        <p>
                            This is an open source project. You can get the&nbsp;
                            <a href="https://github.com/thalleshmm/notes"
                            target="_blank"
                            className="link"
                            rel="noopener noreferrer">source code</a> here.
                        </p>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="HKQSQ2JJ9HLRJ" />
                            Note is free and always will be. If you like the app,&nbsp;
                            <button type="submit"
                                    className="link"
                                    aria-label="Click here to donate">click here</button>&nbsp;
                            to donate any amount.
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

About.propTypes = {
    history: PropTypes.object.isRequired
}

export default About;