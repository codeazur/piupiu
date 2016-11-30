import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal } from '../actions/modals';
import { signOut } from '../actions/sessions';
import { Button, Glyphicon } from 'react-bootstrap';
import AuthModal from './modals/AuthModal';

import './HeaderUserMenu.scss';

class HeaderUserMenu extends Component {

    static propTypes = {
        session: PropTypes.object,
    };

    handleSignOutClick = event => {
        this.props.signOut();
    };

    handleSignInClick = event => {
        this.props.openModal(AuthModal);
    };

    renderLoggedIn() {
        const { session } = this.props;
        return (
            <div className="header-user-menu">
                @{session.currentUser.nick_name}
                <Button onClick={this.handleSignOutClick} bsStyle="danger" bsSize="small">Log Out</Button>
            </div>
        );
    }

    renderLoggedOut() {
        return (
            <div className="header-user-menu">
                <Button onClick={this.handleSignInClick} bsStyle="success" bsSize="small">Log In</Button>
            </div>
        );
    }

    render() {
        const { session } = this.props;
        if (!session) {
            return null;
        }
        return session.currentUser ?
            this.renderLoggedIn() :
            this.renderLoggedOut();
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ openModal, signOut }, dispatch);

export default connect(null, mapDispatchToProps)(HeaderUserMenu);