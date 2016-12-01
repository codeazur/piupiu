import Constants from '../constants';

export function openModal(component, props = {}) {
    return {
        type: Constants.MODAL_OPEN,
        component,
        props,
    };
}

export function closeModal() {
    return {
        type: Constants.MODAL_CLOSE,
    };
}

export function setModalProps(props) {
    return {
        type: Constants.MODAL_PROPS,
        props,
    };
}
