import React, { Component, PropTypes } from 'react';

import './Header.scss';

class Header extends Component {

    static propTypes = {
        currentUser: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
    };

    render() {
        const { currentUser } = this.props;
        return (
            <header className="main-header">
            </header>
        );
    }
}

export default Header;
