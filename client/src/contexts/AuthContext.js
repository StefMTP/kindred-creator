import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(undefined);
    const [uid, setUid] = useState(null);
    const [uname, setUname] = useState(null);

    useEffect(() => {
        getLoggedIn();
    }, []);

    const getLoggedIn = () => {
        // http://localhost:5000
        axios.get('https://kindred-creator.herokuapp.com/auth/loggedIn').then(res => {
            setLoggedIn(res.data.loggedIn);
            setUid(res.data.uid);
            setUname(res.data.uname);
        });
    }

    return (
        <AuthContext.Provider value={{uid, uname, loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;