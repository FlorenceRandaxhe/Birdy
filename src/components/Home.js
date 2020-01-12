import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import Nav from "./common/Nav";
import firebase from '../config/config';

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
        return (<div className="bouncing-loader"><div></div><div></div><div></div></div>);
    }
    firebase.storage().ref().child('profil.jfif').getDownloadURL().then(url => {
        document.getElementById('profil_img').src = url;
    });
    return (

        <React.Fragment>
            <section className="section_margin">
                <div className="btn__container">
                    <div className="home__header">
                        <h2 className="sro">Accueil</h2>
                        <button className='btn__disconnect' onClick={disconnectUser}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="home__img__container">
                        <img src='' id="profil_img" className="home__img" width="100px" alt={user.name}/>
                        <p className="home__username">Bonjour {user.name}&nbsp;!</p>
                    </div>
                    <section className="section_margin">
                        <h3>Vos dernières captures</h3>
                        <div className="list__bird__home">
                            {birds.map(bird => (
                                <div key={bird.id} className="list__item__bird__home">
                                    <Link to={{pathname: '/captures/' + bird.id}}>{bird.name}</Link>
                                </div>
                            ))}
                            {birds.length === 0 &&
                                <div>Vous n'avez pas encore capturé d'oiseau&nbsp;! </div>
                            }
                        </div>
                    </section>
                </div>
                <Nav/>
            </section>
        </React.Fragment>
    )
};

export default Home;
