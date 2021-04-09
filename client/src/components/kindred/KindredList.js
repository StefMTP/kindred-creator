import React from 'react';
import KindredItem from './KindredItem';

const KindredList = ({kindreds, uid}) => {

    return (
        <div className="jumbotron">
            <h1 className="display-4">Your Kindred</h1>
            <div className="list-group">
                {kindreds.filter(kindred => kindred.player_id === uid).map((kindred, i) => <div key={i}><KindredItem  kindred={kindred}/></div>)}
            </div>
        </div>
        
    );
}

export default KindredList;