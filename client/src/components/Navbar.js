import React, {useContext} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Logout from './auth/Logout';

const Navbar = () => {

    const {loggedIn, uname} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Home</Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link className="nav-link" to="/kindred">Kindred</Link></li>
                <>{
                    loggedIn === true && (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/create">Create new Kindred</Link></li>
                            <li className="nav-item"><Logout /></li>
                        </>
                    )
                }</>
            </ul>
            <ul className="navbar-nav">
                {
                    loggedIn === false && (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        </>
                    )
                }
                {
                    loggedIn === true && <li className="nav-item text-light">Welcome, Player {uname}!</li>
                }
            </ul>
        </nav>
    );
}

export default Navbar;