import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../contexts/AuthContext';
import KindredForm from './KindredForm';
import KindredList from './KindredList';

const Kindred = () => {

    const {uid, loggedIn} = useContext(AuthContext);
    
    const [kindreds, setKindreds] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/kindred/").then(res => setKindreds(res.data));
    }, [kindreds]);

    return (
        <>
            {
                loggedIn === false && (
                    <>
                        <h1 className="display-4">Register or log in to create your vampire character.</h1>
                    </>)
            }
            {
                loggedIn === true && (
                    <>
                        <KindredList kindreds={kindreds} uid={uid}/>
                        <KindredForm />
                    </>)
            }
        </>
    );
}

export default Kindred;