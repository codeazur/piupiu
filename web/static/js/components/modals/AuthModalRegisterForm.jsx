import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signUp } from '../../actions/sessions';
import { closeModal } from '../../actions/modals';
import { Button, ButtonToolbar, Form, FormGroup, Col } from 'react-bootstrap';
import FormInput from '../common/FormInput';

const emailRegex = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/i;

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

    state = {
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.session !== this.props.session) {
            if (nextProps.session.currentUser) {
                this.props.closeModal();
            }
            if (nextProps.session.error) {
                this.setState({
                    errors: nextProps.session.error.fields
                })
            }
        }
    }

    getValidationState = key => {
        return this.state.errors[key];
    };

    handleChange = key => event => {
        this.props.onChange({
            ...this.props.data,
            [key]: event.target.value
        });
    };

    handleBlur = key => event => {
    };

    handleSubmit = event => {
        this.props.signUp(this.props.data);
        event.preventDefault();
    };

    render() {
        const { errors } = this.state;
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormInput
                    id="email"
                    label="Email"
                    value={this.props.data.email}
                    placeholder="Enter your email address"
                    validationState={errors.email ? 'error' : null}
                    validationMessage={errors.email}
                    onChange={this.handleChange('email')}
                    onBlur={this.handleBlur('email')} />
                <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    value={this.props.data.password}
                    placeholder="Enter your password"
                    validationState={errors.password ? 'error' : null}
                    validationMessage={errors.password}
                    onChange={this.handleChange('password')}
                    onBlur={this.handleBlur('password')} />
                <FormInput
                    id="nick_name"
                    label="Username"
                    value={this.props.data.nick_name}
                    placeholder="Enter your username"
                    validationState={errors.nick_name ? 'error' : null}
                    validationMessage={errors.nick_name}
                    onChange={this.handleChange('nick_name')}
                    onBlur={this.handleBlur('nick_name')} />
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
