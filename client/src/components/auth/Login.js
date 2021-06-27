import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();
    const {loggedIn, getLoggedIn} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState({});

    useEffect(() => {
        if(loggedIn) history.push('/');
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const user = {
                username,
                password,
            };
            // https://kindred-creator.herokuapp.com
            axios.post('https://kindred-creator.herokuapp.com/auth/login', user).then(res => {
                setMessages(res.data);
                getLoggedIn();
            }).catch(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card flex-fill">
                <div className="card-body">
                    <div className="card-title">
                        <h1 className="display-4">Log In</h1>
                        <p className="lead">Log into your account to start creating your own kindred.</p>
                    </div>
                    {messages.errors ? messages.errors.map((message, i) => <div key={i}>{message.msg}</div>) : <div></div>}
                    <div className="card-text">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input id="username" type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;