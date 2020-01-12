import React, {useEffect, useRef, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from "../config/config";

const Register = () => {

    const userMail = useRef('');
    const userId = useRef('');
    const userName = useRef('');
    const userPassword = useRef('');
    const [isCreated, setisCreated] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailUse, setEmailUse] = useState(false);
    const [weakPass, setWeakPass] = useState(false);
    const auth = firebase.auth();

    const createUser = (e) => {
        e.preventDefault();
        const name = userName.current.value;
        const id = userId.current.value;
        const mail = userMail.current.value;
        const password = userPassword.current.value;

        if (mail === "" || name === "" || password === "" || id === "") {
            setEmptyField(true)
        }
        else {
            auth.createUserWithEmailAndPassword(mail, password).then(user => {
                const uid = user.user.uid;
                firebase.firestore().collection('users').doc(uid).set({
                    name:name,
                    email:mail,
                    userId:id,
                    userUid:uid});
            }).catch(error => {
                if (error.code === 'auth/invalid-email'){
                    setEmailError(true)
                }
                if (error.code === 'auth/email-already-in-use'){
                    setEmailUse(true)
                }
                if (error.code === 'auth/weak-password'){
                    setWeakPass(true)
                }
            });
        }
    };

    useEffect(() =>
    {
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setisCreated(true);
            } else {
                setisCreated(false);
            }
        })
    }, []);

    if(isCreated === true){
        return <Redirect to='/' />
    }

    return (
        <React.Fragment>
            <section>
                <div className="form__container">
                    <h2 className="title__login">S'inscrire</h2>
                    {emptyField === true &&
                    <p className="errors">Tous les champs doivent être rempli</p>
                    }
                    <form action="#" method="POST" className="form form__login"  onSubmit={createUser}>
                        <div className="form__control">
                            <label className="form__label" htmlFor="name">Nom</label>
                            <input className="form__input" type="text" name="name" id="name" ref={userName}/>
                        </div>

                        <div className="form__control">
                            <label className="form__label" htmlFor="userId">ID fourni par l'institut des Sciences Naturelles</label>
                            <input className="form__input" type="text" name="userId" id="userId" ref={userId}/>
                        </div>

                        <div className="form__control">
                            {emailError === true &&
                            <p className="errors">Veuillez entrer une adresse mail valide</p>
                            }
                            {emailUse === true &&
                            <p className="errors">Il existe déja un compte avec cet email</p>
                            }
                            <label className="form__label" htmlFor="email">E-mail</label>
                            <input className="form__input" type="email" name="email" id="email" ref={userMail}/>
                        </div>

                        <div className="form__control">
                            {weakPass === true &&
                            <p className="errors">Le mot de passe doit avoir 6 caractères minimum</p>
                            }
                            <label className="form__label" htmlFor="password">Mot de passe</label>
                            <input className="form__input" type="password" name="password" id="password" ref={userPassword}/>
                        </div>

                        <div className="form__control">
                            <button type="submit" className="btn">S'inscrire</button>
                        </div>
                    </form>
                    <div className="centered">
                        <Link to='/' className="login__link">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Register;
