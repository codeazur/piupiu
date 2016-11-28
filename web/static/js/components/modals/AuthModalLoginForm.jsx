import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../actions/sessions';
import { Button, ButtonToolbar, Form, FormGroup, Col } from 'react-bootstrap';
import FormInput from '../common/FormInput';

class AuthModalLoginForm extends Component {

    static propTypes = {
        data: PropTypes.shape({
            email: PropTypes.string,
            password: PropTypes.string,
        }).isRequired,
        onCancel: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        session: PropTypes.object,
    };

    getEmailValidationState() {
        return null;
    }

    getPasswordValidationState() {
        return null;
    }

    handleChange = key => event => {
        this.props.onChange({
            ...this.props.data,
            [key]: event.target.value
        });
    };

    handleSubmit = event => {
        const { email, password } = this.props.data;
        this.props.signIn(email, password);
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
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <ButtonToolbar>
                            <Button bsSize="small" bsStyle="primary" type="submit">Log In</Button>
                            <Button bsSize="small" onClick={this.props.onCancel}>Cancel</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(null, mapDispatchToProps)(AuthModalLoginForm);
