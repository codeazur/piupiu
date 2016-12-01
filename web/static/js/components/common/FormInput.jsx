import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';

class FormInput extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        validationState: PropTypes.string,
        validationMessage: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        label: '',
        placeholder: '',
        validationState: null,
    };

    render() {
        const { id, type, value, label, placeholder, onChange, validationState, validationMessage } = this.props;
        return (
            <FormGroup controlId={id} bsSize="sm" validationState={validationState}>
                <Col componentClass={ControlLabel} sm={2}>{label}</Col>
                <Col sm={10}>
                    <FormControl
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange} />
                    <HelpBlock bsClass="help-block help-block-small">{validationMessage}</HelpBlock>
                </Col>
            </FormGroup>
        );
    }
};

export default FormInput;
