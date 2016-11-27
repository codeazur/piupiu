import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import modal from './modal';

export default combineReducers({
    routing: routerReducer,
    session,
    modal,
});
