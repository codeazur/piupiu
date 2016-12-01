import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../actions/sessions';
import { closeModal } from '../../actions/modals';
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
        // Action creators
        signIn: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
    };

    state = {
        error: null,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.session !== this.props.session) {
            if (nextProps.session.currentUser) {
                this.props.closeModal();
            }
            if (nextProps.session.error) {
                this.setState({
                    error: nextProps.session.error
                })
            }
        }
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
                    validationState={this.state.error ? 'error' : null}
                    onChange={this.handleChange('email')} />
                <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    value={this.props.data.password}
                    placeholder="Enter your password"
                    validationState={this.state.error ? 'error' : null}
                    validationMessage={this.state.error}
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

const mapDispatchToProps = dispatch => bindActionCreators({ closeModal, signIn }, dispatch);

export default connect(null, mapDispatchToProps)(AuthModalLoginForm);
