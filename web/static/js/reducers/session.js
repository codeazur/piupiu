import Constants from '../constants';

export default function sessionReducer(state = null, action = {}) {
    switch (action.type) {
        case Constants.USER_SIGNED_IN:
            return {
                currentUser: action.currentUser,
                error: null
            };
        case Constants.USER_SIGNED_OUT:
            return {
                currentUser: null,
                error: null,
            };
        case Constants.SESSIONS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case Constants.REGISTRATIONS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}
