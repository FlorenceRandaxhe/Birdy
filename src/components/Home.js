import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";

import firebase from '../config/config';
import Loader from "./common/Loader"

const Home = () => {
    const [birds, setleBirds] = useState(null);
    const [user, setleUser] = useState([]);
    const [isLogged, setisLogged] = useState([]);
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;

    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const dataBird = await db.collection('captures').where("userUid", "==", uid).limit(3).get();
            setleBirds (dataBird.docs.map (doc => ({...doc.data(), id: doc.id})));
            const dataUser = db.collection('users').doc(uid);
            dataUser.get()
                .then(doc => {
                    setleUser( doc.data());
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        };
        fetchData();
    }, []);

    const disconnectUser = (e) => {
        firebase.auth().signOut();
        setisLogged(false);
    };

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
    if (birds === null) {
        return <Loader/>
    }
    return (

        <React.Fragment>
            <section>
                <div className="home__container">
                    <div className="section__header">
                        <h2 className="sro">Accueil</h2>
                        <p className="">Bonjour {user.name}&nbsp;!</p>

                        <button className="btn_disconnect" onClick={disconnectUser}>
                            <svg className="btn_disconnect_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <section className="list__container">
                        <div className="flex__container">
                            <h3>Dernières captures</h3>
                            <Link className="text--small" to={'/captures'}>Voir tout</Link>
                        </div>
                        <ul className="list">
                            {birds.map(bird => (
                                <li key={bird.id} className="list__item">
                                    <Link to={{pathname: '/captures/' + bird.id}}><span className="sro">Voir</span>
                                        <p>{bird.name}</p>
                                    </Link>
                                    <Link to={{pathname: '/edit/' + bird.id}} className="icon"><span className="sro">Modifier</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="#606a73" strokeWidth="1.5" strokeLinecap="round"
                                             strokeLinejoin="round" className="feather feather-edit-3">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                            {birds.length === 0 &&
                                <li className="empty">Vous n'avez pas encore capturé d'oiseau&nbsp;! </li>
                            }
                        </ul>
                    </section>
                    <Link className="text--small" to={{pathname: '/profil/' + user.userUid}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </Link>
                </div>

            </section>
        </React.Fragment>
    )
};

export default Home;
