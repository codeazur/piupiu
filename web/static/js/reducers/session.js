import Constants from '../constants';

export default function sessionReducer(state = null, action = {}) {
    switch (action.type) {
        case Constants.USER_SIGNED_IN:
            return {
                currentUser: action.currentUser,
                errors: null
            };
        case Constants.USER_SIGNED_OUT:
            return {
                currentUser: null,
                errors: null,
            };
        case Constants.SESSIONS_ERROR:
            return {
                ...state,
                errors: action.errors,
            };
        case Constants.REGISTRATIONS_ERROR:
            return {
                ...state,
                errors: action.errors,
            };
        default:
            return state;
    }
}
