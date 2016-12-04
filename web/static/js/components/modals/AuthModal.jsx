import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setModalProps } from '../../actions/modals';
import { Modal, Row, Col } from 'react-bootstrap';
import FormInput from '../common/FormInput';
import AuthModalLoginForm from './AuthModalLoginForm';
import AuthModalRegisterForm from './AuthModalRegisterForm';

import './AuthModal.scss';

class AuthModal extends Component {

    static propTypes = {
        show: PropTypes.bool,
        form: PropTypes.string,
        onHide: PropTypes.func.isRequired,
        // from Redux store
        session: PropTypes.object,
        setModalProps: PropTypes.func.isRequired,
    };

    static defaultProps = {
        show: true,
        form: 'login',
    }

    state = {
        data: {
            email: '',
            password: '',
            username: '',
        }
    };

    formItems = [
        { form: 'login', component: AuthModalLoginForm, label: 'Log In', title: 'Log In' },
        { form: 'register', component: AuthModalRegisterForm, label: 'Register', title: 'Register' },
        { form: 'reset', component: null, label: 'Forgot your password?', title: 'Reset Password' },
        { form: 'resend', component: null, label: 'Didn\'t receive confirmation email?', title: 'Resend Confirmation Email' },
    ];

    handleChange = data => {
        this.setState({ data });
    };

    handleFooterItemClick = form => event => {
        this.props.setModalProps({ form });
    };

    renderTitle(formItem) {
        return formItem ? formItem.title : null;
    }

    renderForm(formItem) {
        if (formItem && formItem.component) {
            return React.createElement(formItem.component, {
                session: this.props.session,
                data: this.state.data,
                onCancel: this.props.onHide,
                onChange: this.handleChange,
            });
        }
        return null;
    }

    renderFooterItems() {
        return this.formItems
            .filter(item => item.form !== this.props.form)
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
        const formItem = this.formItems.find(item => item.form === this.props.form);
        return (
            <Modal show={show} onHide={onHide} dialogClassName="auth-modal" aria-labelledby="auth-modal-title">
                <Modal.Header bsClass="modal-header modal-header-small" closeButton>
                    <Modal.Title id="auth-modal-title">
                        {this.renderTitle(formItem)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderForm(formItem)}
                </Modal.Body>
                <Modal.Footer bsClass="modal-footer modal-footer-small">
                    {this.renderFooterItems()}
                </Modal.Footer>
            </Modal>
        );
    }
};

const mapStateToProps = state => ({ session: state.session });
const mapDispatchToProps = dispatch => bindActionCreators({ setModalProps }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
