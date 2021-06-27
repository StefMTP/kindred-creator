import React, {useState, useEffect} from 'react';
import axios from 'axios';
import KindredItem from './KindredItem';

const KindredList = ({uid, isAdmin}) => {

    const [kindreds, setKindreds] = useState([]);

    useEffect(() => {
        // https://kindred-creator.herokuapp.com/
        axios.get("https://kindred-creator.herokuapp.comkindred").then(res => setKindreds(res.data));
    }, []);

    const deleteKindred = (id) => {
        // https://kindred-creator.herokuapp.com
        axios.delete(`https://kindred-creator.herokuapp.comkindred/${id}`);
        setKindreds(kindreds.filter(kindred => kindred._id !== id));
    }

    return (
        <div className="jumbotron">
            <h1 className="display-4">Your Kindred</h1>
            <p className="text-muted font-italic">You can only see your own Kindred</p>
            <div className="list-group">
                {isAdmin 
                    ? kindreds.map((kindred, i) => <div key={i}><KindredItem  kindred={kindred} deleteKindred={deleteKindred}/></div>)
                    : kindreds.filter(kindred => kindred.player_id === uid).map((kindred, i) => <div key={i}><KindredItem  kindred={kindred} deleteKindred={deleteKindred}/></div>)
                }
            </div>
        </div>
        
    );
}

export default KindredList;