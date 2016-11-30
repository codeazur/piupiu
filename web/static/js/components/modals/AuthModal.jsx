import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Row, Col } from 'react-bootstrap';
import FormInput from '../common/FormInput';
import AuthModalLoginForm from './AuthModalLoginForm';
import AuthModalRegisterForm from './AuthModalRegisterForm';

import './AuthModal.scss';

class AuthModal extends Component {

    static propTypes = {
        show: PropTypes.bool,
        onHide: PropTypes.func.isRequired,
        // from Redux store
        session: PropTypes.object,
    };

    static defaultProps = {
        show: true,
    }

    state = {
        form: 'login',
        data: {
            email: '',
            password: '',
            nick_name: '',
        }
    };

    handleChange = data => {
        this.setState({ data });
    };

    handleFooterItemClick = form => event => {
        this.setState({ form });
    };

    handleExited = () => {
        this.setState({
            form: 'login',
        });
    };

    renderTitle() {
        switch (this.state.form) {
            case 'login': return 'Log In';
            case 'register': return 'Register';
            case 'reset': return 'Reset Password';
            case 'resend': return 'Resend Confirmation Email';
            default: return '';
        }
    }

    renderForm() {
        const commonProps = {
            session: this.props.session,
            data: this.state.data,
            onCancel: this.props.onHide,
            onChange: this.handleChange,
        };
        switch (this.state.form) {
            case 'login': return <AuthModalLoginForm {...commonProps} />;
            case 'register': return <AuthModalRegisterForm {...commonProps} />;
            default: return null; 
        }
    }

    renderFooterItems() {
        const items = [
            { form: 'login', label: 'Log In' },
            { form: 'register', label: 'Register' },
            { form: 'reset', label: 'Forgot your password?' },
            { form: 'resend', label: 'Didn\'t receive confirmation email?' },
        ];
        return items
            .filter(item => item.form !== this.state.form)
            .map((item, i) => (
                <Row className="auth-modal-footer-item" key={item.form}>
                    <Col smOffset={2} sm={10}>
                        <button className="btn-link" onClick={this.handleFooterItemClick(item.form)}>
                            {item.label}
                        </button>
                    </Col>
                </Row>
            ));
    }

    render() {
        const { show, onHide } = this.props;
        return (
            <Modal show={show} onHide={onHide} onExited={this.handleExited} dialogClassName="auth-modal" aria-labelledby="auth-modal-title">
                <Modal.Header bsClass="modal-header modal-header-small" closeButton>
                    <Modal.Title id="auth-modal-title">{this.renderTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderForm()}
                </Modal.Body>
                <Modal.Footer bsClass="modal-footer modal-footer-small">
                    {this.renderFooterItems()}
                </Modal.Footer>
            </Modal>
        );
    }
};

const mapStateToProps = state => ({ session: state.session });

export default connect(mapStateToProps)(AuthModal);
