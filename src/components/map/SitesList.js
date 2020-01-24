import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Loader from "../common/Loader";

const SiteList = (props) => {
    const [leState, setleState] = useState(null);
    const [long, setLong] = useState(null);
    const [lat, setLat] = useState(null);
    const [isLogged, setisLogged] = useState([]);

    useEffect(() =>
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('sites').get();

            setleState (data.docs.map (doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setisLogged(true);
        } else {
            setisLogged(false);
        }
    });

    if(isLogged === false){
        return <Redirect to='/'/>
    }
    if (leState === null) {
        return <Loader/>
    }
    return (
        <React.Fragment>
            <section>
                <div>
                    <div className="section__header">
                        <h2>Sites de baguage</h2>
                        <Link className="btn__small" to={'/createSite'}>Nouveau site</Link>
                    </div>
                    <div className="map" style={{ height: '60vh', width: '100%' }}>
                        <Map
                            google={props.google}
                            style={ {borderRadius:'5px'}}
                            zoom={8}
                            initialCenter={{ lat: lat, lng: long}}
                        >
                            {leState.map(map => (
                                <Marker
                                    position={{ lat:map.geopoint.latitude,lng: map.geopoint.longitude}}>
                                </Marker>
                            ))}
                        </Map>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDaH6M1rje-2oIlFkjlJ5QC4pAb79uEb3o'
})(SiteList);
//export default SiteList;
