import React, { Component, PropTypes } from 'react';
import HeaderUserMenu from './HeaderUserMenu';

import './Header.scss';

class Header extends Component {

    static propTypes = {
        session: PropTypes.object,
    };

    render() {
        const { session } = this.props;
        return (
            <header className="main-header">
                <h1>PiuPiu<small>.io</small></h1>
                <HeaderUserMenu session={session} />
            </header>
        );
    }
}

export default Header;
