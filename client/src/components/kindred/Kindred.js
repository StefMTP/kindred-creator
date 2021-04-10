import React, {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import KindredList from './KindredList';

const Kindred = () => {

    const {uid, loggedIn} = useContext(AuthContext);
    
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
                        <KindredList uid={uid}/>
                    </>)
            }
        </>
    );
}

export default Kindred;