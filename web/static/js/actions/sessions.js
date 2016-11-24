import Constants from '../constants';
import { httpGet, httpPost, httpDelete }  from '../utils';

function setCurrentUser(dispatch, user) {
    dispatch({
        type: Constants.CURRENT_USER,
        currentUser: user,
    });
};

const Actions = {

    signIn: (email, password) => {
        return dispatch => {
            const data = {
                session: {
                    email: email,
                    password: password,
                },
            };
            httpPost('/api/v1/sessions', data)
                .then(data => {
                    localStorage.setItem('jwt', data.jwt);
                    setCurrentUser(dispatch, data.user);
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
    },

    signOut: () => {
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
    },

    currentUser: () => {
        return dispatch => {
            httpGet('/api/v1/current_user')
                .then(data => {
                    setCurrentUser(dispatch, data);
                })
                .catch(error => {
                    console.info(error);
                });
        };
    },

};

export default Actions;
