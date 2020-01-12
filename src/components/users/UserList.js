import React, { useState, useEffect } from 'react';
import { Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Nav from '../common/Nav';

const UserList = () => {
    const [leState, setleState] = useState(null);
    const [isLogged, setisLogged] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () => {
            const db = firebase.firestore();
            const recupData = await db.collection('users').get();
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
                    <h2>Tous les utilisateurs</h2>
                    <ul className="list__bird">
                        {leState.map(doc => (
                            <li key={doc.id} className="list__item__bird__home">
                                {doc.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <Nav/>
        </React.Fragment>
    )
};

export default UserList;
