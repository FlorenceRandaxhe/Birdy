import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Nav from '../common/Nav';

const CaptureList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection('captures').where("userUid", "==", uid).get();
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
                    <h2>Toutes mes captures</h2>
                    <div className="list__bird">
                        {leState.map(bird => (
                            <article key={bird.id} className="list__item__bird">
                                <Link to={{pathname: '/captures/' + bird.id}} className="list__item__bird__link"><span className="sro">Voir</span></Link>
                                <h3>{bird.name}</h3>
                            </article>
                        ))}
                        {leState.length === 0 &&
                        <div className="empty">Vous n'avez pas encore capturé d'oiseau&nbsp;!</div>
                        }
                    </div>
                </div>
            </section>
            <Nav/>
        </React.Fragment>
    )
};

export default CaptureList;
