import Constants from '../constants';
import { httpGet, httpPost, httpDelete }  from '../utils';

function userSignedIn(dispatch, user) {
    dispatch({
        type: Constants.USER_SIGNED_IN,
        currentUser: user,
    });
};

function userSignedOut(dispatch) {
    dispatch({
        type: Constants.USER_SIGNED_OUT,
    });
};

export function signUp(user) {
    return dispatch => {
        httpPost('/api/v1/registrations', { user })
            .then(data => {
                localStorage.setItem('jwt', data.jwt);
                userSignedIn(dispatch, data.user);
            })
            .catch(error => {
                console.log(error.stack)
                error.response.json()
                    .then(errorJSON => {
                        dispatch({
                            type: Constants.SESSIONS_ERROR,
                            error: errorJSON.error,
                        });
                    });
            });
    };
};

export function signIn(email, password) {
    return dispatch => {
        const data = {
            session: {
                email,
                password,
            },
        };
        httpPost('/api/v1/sessions', data)
            .then(data => {
                localStorage.setItem('jwt', data.jwt);
                userSignedIn(dispatch, data.user);
            })
            .catch(error => {
                error.response.json()
                    .then(errorJSON => {
                        dispatch({
                            type: Constants.SESSIONS_ERROR,
                            error: errorJSON.error,
                        });
                    });
            });
    };
}

export function signOut() {
    return dispatch => {
        httpDelete('/api/v1/sessions')
            .then(data => {
                localStorage.removeItem('jwt');
                dispatch({
                    type: Constants.USER_SIGNED_OUT,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function getCurrentUser() {
    return dispatch => {
        if (!localStorage.getItem('jwt')) {
            userSignedOut(dispatch);
        } else {
            httpGet('/api/v1/current_user')
                .then(data => {
                    userSignedIn(dispatch, data);
                })
                .catch(error => {
                    console.info(error);
                    userSignedOut(dispatch);
                });
        }
    };
}
