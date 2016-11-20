import '../../deps/phoenix/priv/static/phoenix';
import React, { Component } from 'react';
import { render } from 'react-dom';

// Global styles
import './scss/styles.scss';

// Main component
import App from './js/App';

render(
    <App />,
    document.getElementById('app')
);
