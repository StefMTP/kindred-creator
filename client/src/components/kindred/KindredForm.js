import React, { useState } from 'react';
import axios from 'axios';

const KindredForm = () => {

    const [name, setName] = useState('');
    const [concept, setConcept] = useState('');
    const [age, setAge] = useState('');
    const [clan, setClan] = useState('Not determined');
    const [ambition, setAmbition] = useState('');
    const [desire, setDesire] = useState('');
    const [message, setMessage] = useState(null);

    const clanOptions = ['Not determined', 'Brujah', 'Gangrel', 'Malkavian', 'Nosferatu', 'Toreador', 'Tremere', 'Ventrue', 'Caitiff', 'Thin-Blooded'];

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
            axios.post("http://localhost:5000/kindred/add", kindred).then(res => setMessage(res.data)).catch(res => console.log(res));
            clearInputs();
        } catch(err) {
            console.log(err);
        }
    }

    const clearInputs = () => {
        setName('');
        setConcept('');
        setAge('');
        setClan('Not determined');
        setAmbition('');
        setDesire('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-muted">Feel free to create multiple characters, if you can't limit yourself to one. Contact me to finalize your choice.</h2>
            {message ? (
                    <p className="alert alert-info" role="alert">
                        {message.success}
                    </p>
                ) : <></>}
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
            <button type="submit" className="btn btn-primary">Create Kindred</button>
        </form>
    );
}

export default KindredForm;