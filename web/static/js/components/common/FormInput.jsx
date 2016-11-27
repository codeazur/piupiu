import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

class FormInput extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        validationState: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        label: '',
        placeholder: '',
        validationState: null,
    };

    state = {
        value: '',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.props.onChange && this.props.onChange(event);
    };

    render() {
        const { id, type, label, placeholder, onChange, validationState } = this.props;
        return (
            <FormGroup controlId={id} bsSize="sm" validationState={validationState}>
                <Col componentClass={ControlLabel} sm={2}>{label}</Col>
                <Col sm={10}>
                    <FormControl
                        type={type}
                        value={this.state.value}
                        placeholder={placeholder}
                        onChange={this.handleChange} />
                </Col>
            </FormGroup>
        );
    }
};

export default FormInput;
