import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../actions/sessions';
import { closeModal } from '../../actions/modals';
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import FormInput from '../common/FormInput';

import './LoginModal.scss';

class LoginModal extends Component {

    static propTypes = {
        show: PropTypes.bool,
        onHide: PropTypes.func.isRequired,
        signIn: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
        session: PropTypes.object,
    };

    static defaultProps = {
        show: true,
    }

    state = {
        email: '',
        password: '',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.session !== this.props.session) {
            if (nextProps.session.currentUser) {
                this.props.closeModal();
            }
        }
    }

    getEmailValidationState() {
        return null;
    }

    getPasswordValidationState() {
        return null;
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        const { email, password } = this.state;
        this.props.signIn(email, password);
        event.preventDefault();
    };

    render() {
        const { show, onHide } = this.props;
        return (
            <Modal aria-labelledby="login-modal-title" dialogClassName="login-modal" show={show} onHide={onHide}>
                <Modal.Header bsClass="modal-header modal-header-small" closeButton>
                    <Modal.Title id="login-modal-title">Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormInput
                            id="email"
                            label="E-mail"
                            placeholder="Enter your e-mail address"
                            validationState={this.getEmailValidationState()}
                            onChange={this.handleEmailChange} />
                        <FormInput
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            validationState={this.getPasswordValidationState()}
                            onChange={this.handlePasswordChange} />
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
};

const mapStateToProps = state => ({ session: state.session });
const mapDispatchToProps = dispatch => bindActionCreators({ signIn, closeModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
