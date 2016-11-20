import '../../deps/phoenix/priv/static/phoenix';
import React, { Component } from 'react';
import { render } from 'react-dom';

import './css/styles.scss';

import App from './js/App';

render(
    <App />,
    document.getElementById('app')
);
