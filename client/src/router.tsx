import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Test } from './page/test';
export class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path = "/">
                    <p> 홈입니다. </p>
                </Route>
                <Route path = "/test">
                    <Test/>
                </Route>
            </BrowserRouter>
        );
    }
}