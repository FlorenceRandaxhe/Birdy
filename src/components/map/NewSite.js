import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

const NewSite = () => {
    const [name, setName] = useState ('');
    const [latitude, setLatitude] = useState (0);
    const [longitude, setLongitude] = useState (0);
    const [superficie, setSuperficie] = useState ('');
    const [empty, setEmpty] = useState(false);
    const [succes, setSucces] = useState(false);
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;

    const handleLong = ({currentTarget: input}) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                input.value = Math.round(position.coords.longitude*100)/100;
                setLongitude(position.coords.longitude)
            });
        } else {
            const long = input.value;
            setLatitude(parseFloat(long))
        }

    };
    const handleLat = ({currentTarget: input}) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                input.value =  Math.round(position.coords.latitude*100)/100;
                setLatitude(position.coords.latitude)
            });
        } else {
            const lat = input.value;
            setLatitude(parseFloat(lat))
        }
    };

    const saveNewSite = (e) => {
        e.preventDefault();
        if (name === '' || longitude === '' || latitude === '' || superficie === ''){
            setEmpty(true)
        }
        else {
            firebase.firestore().collection('sites').add({
                name:name,
                geopoint: new firebase.firestore.GeoPoint(latitude, longitude),
                superficie:superficie,
                userUid:uid
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
            <section>
                <h2>Créer un nouveau site</h2>
                <form action="#" method="POST" onSubmit={saveNewSite}>
                    {empty === true &&
                        <p className="errors">Tous les champs doivent être rempli</p>
                    }
                    <div className="form__control">
                        <label className="form__label" htmlFor="name">Quel est le nom du site&nbsp;?</label>
                        <input onChange={(e) => setName(e.target.value)} className="form__input" type="text" id="name" name="name" placeholder="Liège"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="longitude">Quelle est la longitude&nbsp;?</label>
                        <input onChange={handleLong} className="form__input" type="number" step="0.01" min="-180" max="180" id="longitude" name="longitude" placeholder="55.6"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="latitude">Quelle est la latitude&nbsp;?</label>
                        <input onChange={handleLat} className="form__input" type="number" step="0.01" min="-90" max="90" id="latitude" name="latitude" placeholder="6.56"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="superficie">Quelle est la superficie&nbsp;? (en Km)</label>
                        <input onChange={(e) => setSuperficie(e.target.value)} className="form__input" type="number" id="superficie" name="superficie" placeholder="10"/>
                    </div>
                    <div className="">
                        <button className="btn">Enregistrer</button>
                    </div>
                </form>
            </section>

        </React.Fragment>
    )
};

export default NewSite;
