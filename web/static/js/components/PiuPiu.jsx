import React, { Component } from 'react';

import './PiuPiu.scss';

import piupiu from '../../images/piupiu.png';

export default class PiuPiu extends Component {

    render () {
        return (
        	<div>
        		<div className="piupiu-bg" />
        		<img className="piupiu-img" src={piupiu} />
        	</div>
        );
    }

}
