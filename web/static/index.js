import '../../deps/phoenix/priv/static/phoenix'
import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {

    render () {
        return <h1>PiuPiu</h1>;
    }

}

render(
    <App />,
    document.getElementById('app')
);
