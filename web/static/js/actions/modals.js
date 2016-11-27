import Constants from '../constants';

export function openModal(component) {
    return {
        type: Constants.MODAL_OPEN,
        component
    };
}

export function closeModal() {
    return {
        type: Constants.MODAL_CLOSE,
    };
}
