import React from 'react';
import {Link} from 'react-router-dom';

const KindredItem = ({kindred, deleteKindred}) => {

    return (
        <div className="list-group-item">
            <div className="card bg-dark text-light">
                <div className="card-title d-flex justify-content-between m-3">
                    <div className=""> 
                        <h3>{kindred.name}</h3>
                        {kindred.age && <p className="text-muted">{kindred.age} years old</p>}
                        <p className="text-muted font-italic">Will start the game as a {kindred.start}.</p>
                    </div>
                        {kindred.clan !== "Not determined" && <p className="lead">Clan {kindred.clan}</p>}
                </div>
                <div className="card-body">
                    <p>{kindred.concept}</p>
                    {kindred.ambition && (
                        <div className="border border-white rounded m-2">
                            <h5>Your ambition as a member of the undead...</h5>
                            <p className="lead">{kindred.ambition}</p>
                        </div>)}
                        {kindred.desire && (
                        <div className="border border-white rounded m-2">
                            <h5>Your desire as a mortal human...</h5>
                            <p className="lead">{kindred.desire}</p>
                        </div>)}
                </div>
                <div className="row justify-content-around m-4">
                    <button className="btn btn-danger col-5" onClick={() => {deleteKindred(kindred._id)}}>DELETE</button>
                    <Link className="btn btn-warning col-5" to={"/edit/"+kindred._id}>EDIT</Link>
                </div>
                
            </div>
        </div>
    );
} 

export default KindredItem;