import React, {useState} from 'react';
import firebase from 'firebase';

import Nav from '../common/Nav';
import Feedback from "../common/Feedback";

const NewCapture = () => {
    const [reprise, setReprise] = useState ('');
    const [type, setType] = useState ('');
    const [date, setDate] = useState ('');
    const [place, setPlace] = useState ('');
    const [name, setName] = useState ('');
    const [latin, setLatin] = useState ('');
    const [number, setNumber] = useState ('');
    const [size, setSize] = useState ('');
    const [weight, setWeight] = useState ('');
    const [adiposity, setAdiposity] = useState ('');
    const [sexe, setSexe] = useState ('');
    const [age, setAge] = useState ('');
    const [empty, setEmpty] = useState(false);
    const [succes, setSucces] = useState(false);
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;

    const handleReprise = (e) => {
        setReprise(e.target.value)
    };
    const handleType = (e) => {
        setType(e.target.value)
    };
    const handleAdiposity = (e) => {
        setAdiposity(e.target.value)
    };
    const handleSexe = (e) => {
        setSexe(e.target.value)
    };
    const handleAge = (e) => {
        setAge(e.target.value)
    };
    const handleNumber = (e) => {
        setAge(e.target.value)
    };
    const saveNewBird = (e) => {
        e.preventDefault();
        if (reprise === '' || type === '' || date === '' || place === '' || name === '' || latin === '' || number === '' ||
            size === '' || weight === '' || adiposity === '' || sexe === '' || age === '') {
            setEmpty(true)
        } else {
            firebase.firestore().collection('captures').add({
                reprise:reprise,
                type:type,
                date:date,
                place:place,
                name:name,
                latin:latin,
                number:number,
                size:size,
                weight:weight,
                adiposity:adiposity,
                sexe:sexe,
                age:age,
                userUid:uid
            }).then(function() {
                setSucces(true);
            }).catch(function(error) {
                setSucces(false);
                console.error("Error adding document: ", error);
            });
        }
    };

    if(succes === true){
        return <Feedback/>
    }
    return (
        <React.Fragment>
            <section className="section__bird_list section_margin">
                <h2>Nouvelle capture</h2>
                <form action="#" method="POST" onSubmit={saveNewBird}>
                    <div className="form__control">
                        <fieldset>
                            <legend>Est-ce une reprise&nbsp;?</legend>
                            <div>
                                <input type="radio" id="repriseOui" name="reprise" value="oui" onChange={handleReprise}/>
                                <label htmlFor="repriseOui">Oui</label>
                            </div>
                            <div>
                                <input type="radio" id="repriseNon" name="reprise" value="non" onChange={handleReprise}/>
                                <label htmlFor="repriseNon">Non</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="number">Quel est le numéro de bague&nbsp;?</label>
                        <input onChange={(e) => setNumber(e.target.value)} className="form__input" type="text" id="number" name="number"/>
                    </div>
                    <div className="form__control">
                        <fieldset>
                            <legend>Comment a-t-il été capturé&nbsp;?</legend>
                            <div>
                                <input type="radio" id="filet" name="type" value="filet" onChange={handleType}/>
                                <label htmlFor="filet">Au filet</label>
                            </div>
                            <div>
                                <input type="radio" id="nid" name="type" value="nid" onChange={handleType}/>
                                <label htmlFor="nid">Au nid</label>
                            </div>
                            <div>
                                <input type="radio" id="autre" name="type" value="autre" onChange={handleType}/>
                                <label htmlFor="autre">Autre</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="date">Quand a-t-il été capturé&nbsp;?</label>
                        <input onChange={(e) => setDate(e.target.value)} className="form__input" type="date" id="date" name="date"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="where">Où a-t-il été capturé&nbsp;?</label>
                        <input onChange={(e) => setPlace(e.target.value)} className="form__input" type="text" id="where" name="where"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="birdName">De quel oiseaux s'agit-il&nbsp;?</label>
                        <input onChange={(e) => setName(e.target.value)} onChange={(e) => setName(e.target.value)} className="form__input" type="text" id="birdName" name="birdName"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="latinName">Quel est le nom latin de l'oiseaux&nbsp;?</label>
                        <input onChange={(e) => setLatin(e.target.value)} className="form__input" type="text" id="latinName" name="latinName"/>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="size">Longueur alaire</label>
                        <div className="form__control_small">
                            <input onChange={(e) => setSize(e.target.value)} className="form__input_small" type="number" id="size" name="size"/> <span>cm</span>
                        </div>
                    </div>
                    <div className="form__control">
                        <label className="form__label" htmlFor="weight">Poids</label>
                        <div className="form__control_small">
                            <input onChange={(e) => setWeight(e.target.value)} className="form__input_small" type="number" id="weight" name="weight"/> <span>grammes</span>
                        </div>
                    </div>
                    <div className="form__control">
                        <fieldset>
                            <legend>quel est l'adiposité de l'oiseaux&nbsp;?</legend>
                            <div className="adiposity__container">
                                <div>
                                    <input type="radio" id="one" name="adiposity" value="1" onChange={handleAdiposity}/>
                                    <label htmlFor="one">1</label>
                                </div>
                                <div>
                                    <input type="radio" id="two" name="adiposity" value="2" onChange={handleAdiposity}/>
                                    <label htmlFor="two">2</label>
                                </div>
                                <div>
                                    <input type="radio" id="three" name="adiposity" value="3" onChange={handleAdiposity}/>
                                    <label htmlFor="three">3</label>
                                </div>
                                <div>
                                    <input type="radio" id="four" name="adiposity" value="4" onChange={handleAdiposity}/>
                                    <label htmlFor="four">4</label>
                                </div>
                                <div>
                                    <input type="radio" id="five" name="adiposity" value="5" onChange={handleAdiposity}/>
                                    <label htmlFor="five">5</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="form__control">
                        <fieldset>
                            <legend>Quel est le sexe de l'oiseau&nbsp;?</legend>
                            <div>
                                <input type="radio" id="female" name="sexe" value="femelle" onChange={handleSexe}/>
                                <label htmlFor="female">Femelle</label>
                            </div>
                            <div>
                                <input type="radio" id="male" name="sexe" value="mâle" onChange={handleSexe}/>
                                <label htmlFor="male">Mâle</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="form__control">
                        <fieldset>
                            <legend>Quel est l'âge de l'oiseau&nbsp;?</legend>
                            <div>
                                <input type="radio" id="jeune" name="age" value="jeune" onChange={handleAge}/>
                                <label htmlFor="jeune">Jeune</label>
                            </div>
                            <div>
                                <input type="radio" id="adulte" name="age" value="adulte" onChange={handleAge}/>
                                <label htmlFor="adulte">Adulte</label>
                            </div>
                        </fieldset>
                    </div>
                    {empty === true &&
                    <p className="errors">Tous les champs doivent être remplis</p>
                    }
                    <div className="form__control">
                        <button className="btn">Enregistrer</button>
                    </div>
                </form>
            </section>
            <Nav/>
        </React.Fragment>
    )
};

export default NewCapture;
