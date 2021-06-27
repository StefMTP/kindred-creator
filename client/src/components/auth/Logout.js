import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {

    const history = useHistory();
    const {getLoggedIn} = useContext(AuthContext);

    const handleClick = () => {
        // https://kindred-creator.herokuapp.com/
        axios.get('https://kindred-creator.herokuapp.com/auth/logout').then(res => {
            getLoggedIn();
            history.push('/');
        });
    }

    return (
        <button onClick={handleClick} className="btn btn-danger">Log Out</button>
    );
}

export default Logout;