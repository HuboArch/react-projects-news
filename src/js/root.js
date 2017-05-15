import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class Root extends React.Component {
    render() {
        return (
            <div>init</div>
        )
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('example')
)