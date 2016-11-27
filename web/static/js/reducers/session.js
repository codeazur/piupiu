import Constants from '../constants';

export default function sessionReducer(state = null, action = {}) {
    switch (action.type) {
        case Constants.CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                error: null
            };
        case Constants.SESSIONS_ERROR:
            return {
                ...state,
                error: action.error
            };
        case Constants.USER_SIGNED_OUT:
            return {
                currentUser: null,
                error: null,
            };
        default:
            return state;
    }
}
