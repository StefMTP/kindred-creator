import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(undefined);
    const [uid, setUid] = useState(null);
    const [uname, setUname] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getLoggedIn();
    }, []);

    const getLoggedIn = () => {
        // https://kindred-creator.herokuapp.com
        axios.get('http://localhost:5000/auth/loggedIn').then(res => {
            setLoggedIn(res.data.loggedIn);
            setUid(res.data.uid);
            setUname(res.data.uname);
            setIsAdmin(res.data.is_admin);
        });
    }

    return (
        <AuthContext.Provider value={{uid, uname, isAdmin, loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;