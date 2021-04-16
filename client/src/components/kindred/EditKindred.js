import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EditKindred = (props) => {
    const history = useHistory();
    const {loggedIn} = useContext(AuthContext);

    const [name, setName] = useState('');
    const [concept, setConcept] = useState('');
    const [age, setAge] = useState('');
    const [start, setStart] = useState('Human');
    const [clan, setClan] = useState('Not determined');
    const [ambition, setAmbition] = useState('');
    const [desire, setDesire] = useState('');
    
    const clanOptions = ['Not determined', 'Brujah', 'Gangrel', 'Malkavian', 'Nosferatu', 'Toreador', 'Tremere', 'Ventrue', 'Caitiff', 'Thin-Blooded'];

    useEffect(() => {
        // http://localhost:5000
        axios.get("https://kindred-creator.herokuapp.com/kindred/"+props.match.params.id).then(res => {
            setName(res.data.name);
            setConcept(res.data.concept);
            setStart(res.data.start);
            setAge(res.data.age);
            setClan(res.data.clan);
            setAmbition(res.data.ambition);
            setDesire(res.data.desire);
        });
    }, [props.match.params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const kindred = {
                name,
                concept,
                age,
                clan,
                ambition,
                desire
            };
            // http://localhost:5000/
            axios.post("https://kindred-creator.herokuapp.com/kindred/edit/"+props.match.params.id, kindred).then(res => history.push("/kindred"));
            
        } catch(err) {
            console.log(err);
        }
    }

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
                    <form onSubmit={handleSubmit}>
                        <h2 className="display-4">You are currently editing your Kindred.</h2>
                        <fieldset>
                            <legend>Required fields:</legend>
                            <div className="form-group">
                                <label>Character name</label>
                                <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label>Describe your character's concept with as many words as you like. Remember, you are starting fresh: either a mortal that is about to be embraced, or a fledgling, a freshly made vampire of no more than two months.</label>
                                <textarea className="form-control" value={concept} onChange={(e) => setConcept(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label>Your character will start as a: </label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="start1" value="Human" checked={start === "Human"} onChange={(e) => setStart(e.target.value)}/>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="start2" value="Vampire" checked={start === "Vampire"} onChange={(e) => setStart(e.target.value)}/>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Optional fields:</legend>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Character age</label>
                                    <input className="form-control" type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} min="18"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Kindred Clan</label>
                                    <select className="form-control" id="clan" value={clan} onChange={(e) => setClan(e.target.value)}>
                                        {clanOptions.map((option, i) => <option key={i}>{option}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Ambition (a long-term goal in the world of vampires...)</label>
                                    <input className="form-control" type="text" id="ambition" value={ambition} onChange={(e) => setAmbition(e.target.value)}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Desire (set a desire and see if you can accomplish it before the Embrace...)</label>
                                    <input className="form-control" type="text" id="desire" value={desire} onChange={(e) => setDesire(e.target.value)}/>
                                </div>
                            </div>
                        </fieldset>
                        <button type="submit" className="btn btn-primary">Edit Kindred</button>
                    </form>
                )
            }
        </>
    );
}

export default EditKindred;