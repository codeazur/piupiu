import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions/sessions';
import Header from '../components/Header';

import './Main.scss';

class Main extends Component {

    componentDidMount() {
        const { dispatch, currentUser } = this.props;
        const jwt = localStorage.getItem('jwt');
        if (jwt && !currentUser) {
            dispatch(Actions.currentUser());
        }
    }

    render() {
        const { currentUser, dispatch, children } = this.props;
        return (
            <div className="main-container">
                <Header currentUser={currentUser} dispatch={dispatch} />
                {children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(Main);
