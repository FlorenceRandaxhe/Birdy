import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Nav from '../common/Nav';
import GoogleMap from 'google-map-react';
import Map from './Map'

const SiteList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);

    useEffect(() =>
    {
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
        return (<div className="bouncing-loader"><div></div><div></div><div></div></div>);
    }
    return (
        <React.Fragment>
            <section className="section__bird_list">
                <div>
                    <h2>Sites de baguage</h2>
                    <div>
                        <Link to={'/createSite'}>Ajouter un nouveau site</Link>
                    </div>
                    <div className="map" style={{ height: '70vh', width: '100%' }}>
                        <GoogleMap
                            bootstrapURLKeys={'API key'}
                            defaultCenter={{
                                lat: 50.8432252,
                                lng: 4.4638614
                            }}
                            defaultZoom={10}>
                                {leState.map(map => (
                                    <Map lat={map.location.lat}
                                        lng={map.location.lng}
                                        name={map.name}
                                        superficie={map.superficie}>
                                    </Map>
                                ))}
                        </GoogleMap>
                    </div>
                </div>
            </section>
            <Nav/>
        </React.Fragment>
    )
};

export default SiteList;
