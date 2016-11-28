import Constants from '../constants';
import { httpPost } from '../utils';
import { setCurrentUser } from './sessions';

export function signUp(data) {
    return dispatch => {
        httpPost('/api/v1/registrations', { user: data })
            .then(data => {
                localStorage.setItem('jwt', data.jwt);
                setCurrentUser(dispatch, data.user);
            })
            .catch(error => {
                error.response.json()
                    .then(errorJSON => {
                        dispatch({
                            type: Constants.REGISTRATIONS_ERROR,
                            errors: errorJSON.errors,
                        });
                    });
            });
    };
};
