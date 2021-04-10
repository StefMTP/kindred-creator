import React, {useState, useEffect} from 'react';
import axios from 'axios';
import KindredItem from './KindredItem';

const KindredList = ({uid}) => {

    const [kindreds, setKindreds] = useState([]);

    useEffect(() => {
        // http://localhost:5000/
        axios.get("https://kindred-creator.herokuapp.com/kindred").then(res => setKindreds(res.data));
    }, []);

    const deleteKindred = (id) => {
        // http://localhost:5000
        axios.delete(`https://kindred-creator.herokuapp.com/kindred/${id}`);
        setKindreds(kindreds.filter(kindred => kindred._id !== id));
    }

    return (
        <div className="jumbotron">
            <h1 className="display-4">Your Kindred</h1>
            <div className="list-group">
                {kindreds.filter(kindred => kindred.player_id === uid).map((kindred, i) => <div key={i}><KindredItem  kindred={kindred} deleteKindred={deleteKindred}/></div>)}
            </div>
        </div>
        
    );
}

export default KindredList;