import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
});

export default createStore(
    reducers,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);
