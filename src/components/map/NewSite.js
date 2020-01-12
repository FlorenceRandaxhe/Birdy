import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

import Nav from '../common/Nav';

const NewSite = () => {
    const [name, setName] = useState ('');
    const [latitude, setLatitude] = useState ('');
    const [longitude, setLongitude] = useState ('');
    const [superficie, setSuperficie] = useState ('');

    const [empty, setEmpty] = useState(false);
    const [succes, setSucces] = useState(false);

    const saveNewSite = (e) => {
        e.preventDefault();
        if (name === '' || longitude === '' || latitude === '' || superficie === ''){
            setEmpty(true)
        }
        else {
            firebase.firestore().collection('sites').add({
                name:name,
                longitude:longitude,
                latitude:latitude,
                superficie:superficie
            }).then(function() {
                setSucces(true);
            }).catch(function(error) {
                setSucces(false);
                console.error("Error adding document: ", error);
            });
        }
    };
    if(succes === true){
        return <Redirect to='/sites' />
    }
    return (
        <React.Fragment>
            <section className="section__bird_list section_margin">
                <h2>Créer un nouveau site</h2>
                <form action="#" method="POST" onSubmit={saveNewSite}>
                    {empty === true &&
                        <p className="errors">Tous les champs doivent être rempli</p>
                    }
                    <div className="form__control">
                        <label className="form__label" htmlFor="name">Quel est le nom du site&nbsp;?</label>
                        <input onChange={(e) => setName(e.target.value)} className="form__input" type="text" id="name" name="name"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="longitude">Quelle est la longitude&nbsp;?</label>
                        <input onChange={(e) => setLongitude(e.target.value)} className="form__input" type="text" id="longitude" name="longitude"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="latitude">Quelle est la latitude&nbsp;?</label>
                        <input onChange={(e) => setLatitude(e.target.value)} className="form__input" type="text" id="latitude" name="latitude"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="superficie">Quelle est la superficie&nbsp;?</label>
                        <input onChange={(e) => setSuperficie(e.target.value)} className="form__input" type="number" id="superficie" name="superficie"/>
                    </div>
                    <div className="">
                        <button className="btn">Enregistrer</button>
                    </div>
                </form>
            </section>
            <Nav/>
        </React.Fragment>
    )
};

export default NewSite;
