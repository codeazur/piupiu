import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signUp } from '../../actions/sessions';
import { closeModal } from '../../actions/modals';
import { Button, ButtonToolbar, Form, FormGroup, Col } from 'react-bootstrap';
import FormInput from '../common/FormInput';

class AuthModalRegisterForm extends Component {

    static propTypes = {
        data: PropTypes.shape({
            email: PropTypes.string,
            password: PropTypes.string,
            nick_name: PropTypes.string,
        }).isRequired,
        onCancel: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        session: PropTypes.object,
        // Action creators
        signUp: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
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

    getNicknameValidationState() {
        return null;
    }

    handleChange = key => event => {
        this.props.onChange({
            ...this.props.data,
            [key]: event.target.value
        });
    };

    handleSubmit = event => {
        this.props.signUp(this.props.data);
        event.preventDefault();
    };

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormInput
                    id="email"
                    label="Email"
                    value={this.props.data.email}
                    placeholder="Enter your email address"
                    validationState={this.getEmailValidationState()}
                    onChange={this.handleChange('email')} />
                <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    value={this.props.data.password}
                    placeholder="Enter your password"
                    validationState={this.getPasswordValidationState()}
                    onChange={this.handleChange('password')} />
                <FormInput
                    id="nick_name"
                    label="Username"
                    value={this.props.data.nick_name}
                    placeholder="Enter your username"
                    validationState={this.getNicknameValidationState()}
                    onChange={this.handleChange('nick_name')} />
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <ButtonToolbar>
                            <Button bsSize="small" bsStyle="primary" type="submit">Register</Button>
                            <Button bsSize="small" onClick={this.props.onCancel}>Cancel</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ closeModal, signUp }, dispatch);

export default connect(null, mapDispatchToProps)(AuthModalRegisterForm);