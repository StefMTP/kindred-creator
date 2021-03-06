import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Kindred from './kindred/Kindred';
import EditKindred from './kindred/EditKindred';
import KindredForm from './kindred/KindredForm';

const Router = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/kindred">
                        <Kindred />
                    </Route>
                    <Route path="/edit/:id" component={EditKindred}>
                    </Route>
                    <Route path="/create" component={KindredForm}></Route>
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