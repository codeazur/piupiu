import React, { Component, PropTypes, createElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modals';

class ModalManager extends Component {

    static propTypes = {
        modal: PropTypes.shape({
            component: PropTypes.func,
            show: PropTypes.bool,
        }),
    };

    handleHide = () => {
        this.props.closeModal();
    };

    render() {
        const { component, ...props } = this.props.modal;
        if (!component) {
            return null;
        }
        return createElement(component, {
            ...props,
            onHide: this.handleHide,
        });
    }
}

const mapStateToProps = state => ({ modal: state.modal });
const mapDispatchToProps = dispatch => bindActionCreators({ closeModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
