import React, {Component, useState} from 'react';
import Nav from '../common/Nav';
import firebase from '../../config/config';
import {Link} from "react-router-dom";

class EditCapture extends Component {

    state = {
        capture: {},
        id: '',
        loading:false,
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('captures').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            this.setState({
                capture: doc.data(),
                id: doc.id,
                loading: true
            });
        });
    }

    render() {
        if (this.state.loading === false) {
            return (<div className="bouncing-loader"><div></div><div></div><div></div></div>);
        }
        return (
            <React.Fragment>
                <section className="section_margin">
                    <div className="">
                        <form action="#" method="POST">
                            <div className="form__control">
                                <label className="form__label" htmlFor="name">Nom de l'oiseau</label>
                                <input className="form__input" type="text" name="name" id="name" value={this.state.capture.name}/>
                            </div>
                            <div className="form__control">
                                <label className="form__label" htmlFor="latin">Nom latin de l'oiseau</label>
                                <input className="form__input" type="text" name="latin" id="latin" value={this.state.capture.latin}/>
                            </div>
                            <div className="form__control">
                                <fieldset>
                                    <legend>Reprise</legend>
                                    <div>
                                        <input type="radio" id="repriseOui" name="reprise" value="oui" checked={this.state.capture.reprise === 'oui'} />
                                        <label htmlFor="repriseOui">Oui</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="repriseNon" name="reprise" value="non" checked={this.state.capture.reprise === 'non'}/>
                                        <label htmlFor="repriseNon">Non</label>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="form__control">
                                <label className="form__label" htmlFor="number">Numéro de bague</label>
                                <input className="form__input" type="text" id="number" name="number" value={this.state.capture.number}/>
                            </div>
                            <div className="form__control">
                                <fieldset>
                                    <legend>Comment a-t-il été capturé&nbsp;?</legend>
                                    <div>
                                        <input type="radio" id="filet" name="type" value="filet" checked={this.state.capture.type === 'filet'}/>
                                        <label htmlFor="filet">Au filet</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="nid" name="type" value="nid" checked={this.state.capture.type === 'nid'}/>
                                        <label htmlFor="nid">Au nid</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="autre" name="type" value="autre" checked={this.state.capture.type === 'autre'}/>
                                        <label htmlFor="autre">Autre</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="form__control">
                                <label className="form__label" htmlFor="date">Date de la capture</label>
                                <input className="form__input" type="date" id="date" name="date" value={this.state.capture.date}/>
                            </div>
                            <div className="form__control">
                                <label className="form__label" htmlFor="where">Lieu de la capture</label>
                                <input className="form__input" type="text" id="where" name="where" value={this.state.capture.place}/>
                            </div>
                            <div className="form__control">
                                <label className="form__label" htmlFor="size">Longueur alaire</label>
                                <div className="form__control_small">
                                    <input className="form__input_small" type="number" id="size" name="size" value={this.state.capture.size}/> <span>cm</span>
                                </div>
                            </div>

                            <div className="form__control">
                                <label className="form__label" htmlFor="weight">Poids</label>
                                <div className="form__control_small">
                                    <input className="form__input_small" type="number" id="weight" name="weight" value={this.state.capture.weight}/> <span>grammes</span>
                                </div>
                            </div>

                            <div className="form__control">
                                <fieldset>
                                    <legend>Adiposité de l'oiseau</legend>
                                    <div className="adiposity__container">
                                        <div>
                                            <input type="radio" id="one" name="adiposity" value="1" checked={this.state.capture.adiposity === '1'}/>
                                            <label htmlFor="one">1</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="two" name="adiposity" value="2" checked={this.state.capture.adiposity === '2'}/>
                                            <label htmlFor="two">2</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="three" name="adiposity" value="3" checked={this.state.capture.adiposity === '3'}/>
                                            <label htmlFor="three">3</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="four" name="adiposity" value="4" checked={this.state.capture.adiposity === '4'}/>
                                            <label htmlFor="four">4</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="five" name="adiposity" value="5" checked={this.state.capture.adiposity === '5'}/>
                                            <label htmlFor="five">5</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="form__control">
                                <fieldset>
                                    <legend>Sexe de l'oiseau</legend>
                                    <div>
                                        <input type="radio" id="female" name="sexe" value="femelle" checked={this.state.capture.sexe === 'femelle'}/>
                                        <label htmlFor="female">Femelle</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="male" name="sexe" value="mâle" checked={this.state.capture.sexe === 'mâle'}/>
                                        <label htmlFor="male">Mâle</label>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="form__control">
                                <fieldset>
                                    <legend>Âge de l'oiseau</legend>
                                    <div>
                                        <input type="radio" id="jeune" name="age" value="jeune" checked={this.state.capture.age === 'jeune'}/>
                                        <label htmlFor="jeune">Jeune</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="adulte" name="age" value="adulte" checked={this.state.capture.age === 'adulte'}/>
                                        <label htmlFor="adulte">Adulte</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <button className="btn">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </section>
                <Nav/>
            </React.Fragment>
        );
    }
}

export default EditCapture;
