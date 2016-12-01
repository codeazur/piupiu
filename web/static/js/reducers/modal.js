import Constants from '../constants';

const initialState = {
    component: null,
    props: {},
    show: false,
};

export default function modalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Constants.MODAL_OPEN:
            return {
                component: action.component,
                props: action.props,
                show: true,
            };
        case Constants.MODAL_CLOSE:
            return {
                ...state,
                show: false,
            };
        case Constants.MODAL_PROPS:
            return {
                ...state,
                props: action.props,
            };
        default:
            return state;
    }
}
