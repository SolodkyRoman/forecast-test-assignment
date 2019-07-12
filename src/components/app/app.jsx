import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header';
import Home from '../../pages/home';
import Detailed from '../../pages/detailed';
import './app.css';

const App = () => {
    return (
        <Router>
            <Header />
                <Switch>
                    <Route 
                        exact
                        path='/' 
                        component={Home} />
                        <Route 
                        path='/:city'
                        component={Detailed} />
                </Switch>
        </Router>
    );
}

export default App;
