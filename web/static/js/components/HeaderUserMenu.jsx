import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal } from '../actions/modals';
import { signOut } from '../actions/sessions';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import AuthModal from './modals/AuthModal';

import './HeaderUserMenu.scss';

class HeaderUserMenu extends Component {

    static propTypes = {
        session: PropTypes.object,
        // Bound action creators
        openModal: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
    };

    handleRegisterClick = event => {
        this.props.openModal(AuthModal, { form: 'register' });
    };

    handleSignInClick = event => {
        this.props.openModal(AuthModal, { form: 'login' });
    };

    handleSignOutClick = event => {
        this.props.signOut();
    };

    renderLoggedOut() {
        return (
            <div className="header-user-menu">
                <ButtonToolbar>
                    <Button onClick={this.handleRegisterClick} bsSize="small">Register</Button>
                    <Button onClick={this.handleSignInClick} bsStyle="success" bsSize="small">Log In</Button>
                </ButtonToolbar>
            </div>
        );
    }

    renderLoggedIn() {
        const { session } = this.props;
        return (
            <div className="header-user-menu">
                <span className="nick-name">@{session.currentUser.username}</span>
                <Button onClick={this.handleSignOutClick} bsStyle="danger" bsSize="small">Log Out</Button>
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
