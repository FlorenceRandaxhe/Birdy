import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Loader from "../common/Loader";

const BirdList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const recupData = await db.collection('encyclopedia').get();
            setleState (recupData.docs.map (doc => ({...doc.data(), id: doc.id})));
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
    firebase.storage().ref().child('bird.jpg').getDownloadURL().then(url => {
        let img = document.getElementsByClassName('bird-image');
        for (let i = 0; i < img.length; i++) {
            img[i].src = url;
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
                <h2>Encyclopédie</h2>
                <ul className="list">
                    {leState.map(bird => (
                        <li key={bird.id} className="list__item encyclopedia__list">
                            <Link to={{pathname: '/encyclopedia/' + bird.id}} className="link_over"><span className="sro">Voir</span></Link>
                            <img src='' className="bird-image encyclopedia__img" width="90px" height="90px" alt={bird.name}/>
                            <p>{bird.name}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </React.Fragment>
    )
};

export default BirdList;
