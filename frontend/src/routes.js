import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/home';
import Trivia from './pages/trivia';
import Report from './pages/report';

export default function Routes(){
    
    return (
        <BrowserRouter >
            <Switch>
                <Route path={`/`} exact component={Home} />
                <Route path={`/trivia/:categoryId/:category`}  component={Trivia} />
                <Route path={`/report/:categoryId`}  component={Report} />
            </Switch>
        </BrowserRouter>
    )
}