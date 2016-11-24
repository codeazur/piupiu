import '../../deps/phoenix/priv/static/phoenix';

import React from 'react';
import { render } from 'react-dom';
import App from './js/App';

import './scss/styles.scss';

render(
    <App />,
    document.getElementById('app')
);
