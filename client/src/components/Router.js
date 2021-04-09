import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Register from './auth/Register';
import Login from './auth/Login';
import Kindred from './kindred/Kindred';
import EditKindred from './kindred/EditKindred';

const Router = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <div className="jumbotron">
                            <h1 className="display-4">Home</h1>
                            <p className="lead">This is an app about making a vampire</p>
                        </div>
                    </Route>
                    <Route path="/kindred">
                        <Kindred />
                    </Route>
                    <Route path="/edit/:id" component={EditKindred}>
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default Router;