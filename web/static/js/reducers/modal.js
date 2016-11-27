import Constants from '../constants';

const initialState = {
    component: null,
    show: false,
};

export default function modalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Constants.MODAL_OPEN:
            return {
                component: action.component,
                show: true,
            };
        case Constants.MODAL_CLOSE:
            return {
                ...state,
                show: false,
            };
        default:
            return state;
    }
}
