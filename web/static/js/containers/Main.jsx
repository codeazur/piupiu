import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/sessions';
import Header from '../components/Header';
import ModalManager from '../components/ModalManager';

import './Main.scss';

class Main extends Component {

    static propTypes = {
        session: PropTypes.object,
        getCurrentUser: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { session, getCurrentUser } = this.props;
        if (!session || !session.currentUser) {
            getCurrentUser();
        }
    }

    render() {
        const { session, children } = this.props;
        return (
            <div className="main-container">
                <Header session={session} />
                {children}
                <ModalManager />
            </div>
        );
    }
}

const mapStateToProps = state => ({ session: state.session });
const mapDispatchToProps = dispatch => bindActionCreators({ getCurrentUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
