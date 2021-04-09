import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const history = useHistory();
    const {loggedIn, getLoggedIn} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [messages, setMessages] = useState({});

    useEffect(() => {
        if(loggedIn) history.push('/');
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const user = {
                username,
                password1,
                password2
            };
            axios.post('http://localhost:5000/auth/register', user).then(res => {
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
                        <h1 className="display-4">Register</h1>
                        <p className="lead">Create a player account for the chronicle.</p>
                    </div>
                    {messages.errors ? messages.errors.map((message, i) => <div key={i}>{message.msg}</div>) : <div></div>}
                    <div className="card-text">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input id="username" type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password1">Password</label>
                                <input id="password1" type="password" className="form-control" onChange={(e) => setPassword1(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm password</label>
                                <input id="password2" type="password" className="form-control" onChange={(e) => setPassword2(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;