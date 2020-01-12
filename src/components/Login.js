import React, {useEffect, useRef, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../config/config';

const Login = () => {
    const [isLogged, setisLogged] = useState(false);
    const [error, setError] = useState(false);
    const userMail = useRef('');
    const userPassword = useRef('');
    const auth = firebase.auth();

    const connectUser = (e) => {
        e.preventDefault();
        const mail = userMail.current.value;
        const password = userPassword.current.value;
        firebase.auth().signInWithEmailAndPassword(mail, password).catch(function() {
            setError(true);
        });
    };

    useEffect(() => {
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setisLogged(true);
            } else {
                setisLogged(false);
            }
        })
    }, []);

    if(isLogged === true){
        return <Redirect to='/home' />
    }
    return (
        <React.Fragment>
            <section>
                <div className="form__container">
                    <h2 className="title__login">Se connecter</h2>
                    {error === true &&
                    <p className="errors">Mail ou mot de passe incorrect !</p>
                    }
                    <form action="#" method="POST" className="form form__login" onSubmit={connectUser}>
                        <div className="form__control">
                            <label className="form__label" htmlFor="email">E-mail</label>
                            <input className="form__input"
                                   type="email"
                                   name="email"
                                   id="email"
                                   ref={userMail}
                                   />
                        </div>

                        <div className="form__control">
                            <label className="form__label" htmlFor="password">Mot de passe</label>
                            <input className="form__input"
                                   type="password"
                                   name="password"
                                   id="password"
                                   ref={userPassword}
                                   />
                        </div>

                        <div className="form__control">
                            <button type="submit" className="btn">Se connecter</button>
                        </div>
                    </form>
                    <div className="centered">
                        <Link to='/register' className="login__link">
                            S'inscrire
                        </Link>
                    </div>

                </div>
            </section>

        </React.Fragment>
    )
};

export default Login;
