import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Nav from '../common/Nav';

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
    firebase.storage().ref().child('bird.jfif').getDownloadURL().then(url => {
        let img = document.getElementsByClassName('bird-image');
        for (let i = 0; i < img.length; i++) {
            img[i].src = url;
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
                    <h2 >Encyclopédie</h2>
                    <div className="list__bird">
                        {leState.map(bird => (
                            <article key={bird.id} className="list__item__bird encyclopedia__list">
                                <Link to={{pathname: '/encyclopedia/' + bird.id}} className="list__item__bird__link"><span className="sro">Voir</span></Link>
                                <img src='' className="bird-image encyclopedia__img" width="90px" height="90px" alt={bird.name}/>
                                <h3>{bird.name}</h3>
                            </article>
                        ))}
                    </div>
            </section>
            <Nav/>
        </React.Fragment>
    )
};

export default BirdList;
