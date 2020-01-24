import React, {Component} from 'react';
import firebase from '../../config/config';
import { Redirect} from "react-router-dom";
import Loader from "../common/Loader";

class EditCapture extends Component {

    state = {
        capture: {},
        reprise:'',
        latin:'',
        type: '',
        date: '',
        place: '',
        name: '',
        number: '',
        size: '',
        weight: '',
        adiposity: '',
        sexe: '',
        age: '',
        id: '',
        loading:false,
        empty:false,
        succes:false,
        uid: firebase.auth().currentUser.uid
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('captures').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            this.setState({
                capture: doc.data(),
                id: doc.id,
                loading: true
            });
            const type = this.state.capture.type;
            this.setState({type: type});
            const reprise = this.state.capture.reprise;
            this.setState({reprise: reprise});
            const date = this.state.capture.date;
            this.setState({date: date});
            const lieu = this.state.capture.place;
            this.setState({place: lieu});
            const nom = this.state.capture.name;
            this.setState({name: nom});
            const latin = this.state.capture.latin;
            this.setState({latin: latin});
            const numero = this.state.capture.number;
            this.setState({number: numero});
            const longueur = this.state.capture.size;
            this.setState({size: longueur});
            const poids = this.state.capture.weight;
            this.setState({weight: poids});
            const adiposite = this.state.capture.adiposity;
            this.setState({adiposity: adiposite});
            const sexe = this.state.capture.sexe;
            this.setState({sexe: sexe});
            const age = this.state.capture.age;
            this.setState({age: age});
        });
    };
    handleType = (e) => {
        this.setState({type: e.target.value});
    };

    handleDate = (e) => {
        this.setState({date: e.target.value});
    };

    handlePlace = (e) => {
        this.setState({place: e.target.value});
    };

    handleName = (e) => {
        this.setState({name: e.target.value});
    };

    handleLatin = (e) => {
        this.setState({latin: e.target.value});
    };

    handleNum = (e) => {
        this.setState({number: e.target.value});
    };

    handleReprise = (e) => {
        this.setState({reprise: e.target.value});
    };

    handleSize = (e) => {
        this.setState({size: e.target.value});
    };

    handleWeight = (e) => {
        this.setState({weight: e.target.value});
    };

    handleAdiposity = (e) => {
        this.setState({adiposity: e.target.value});
    };

    handleSexe = (e) => {
        this.setState({sexe: e.target.value});
    };

    handleAge = (e) => {
        this.setState({age: e.target.value});
    };

    saveChange = (e) => {
        e.preventDefault();
        if (this.state.reprise === '' || this.state.type === '' || this.state.date === '' || this.state.place === '' || this.state.name === '' || this.state.latin === '' || this.state.number === '' ||
            this.state.size === '' || this.state.weight === '' || this.state.adiposity === '' || this.state.sexe === '' || this.state.age === '') {
            this.setState({empty: true});
        } else {
            this.setState({empty: false});
            firebase.firestore().collection('captures').doc(this.props.match.params.id).set(
                {
                    reprise: this.state.reprise,
                    type: this.state.type,
                    date: this.state.date,
                    place: this.state.place,
                    name: this.state.name,
                    latin: this.state.latin,
                    number: this.state.number,
                    size: this.state.size,
                    weight: this.state.weight,
                    adiposity: this.state.adiposity,
                    sexe: this.state.sexe,
                    age: this.state.age,
                    userUid: this.state.uid
                }
            );
            this.setState({succes: true});
        }

    };

    render() {

        if(this.state.succes === true){
            return <Redirect to={{pathname: '/captures/' + this.props.match.params.id}}/>
        }
        if (this.state.loading === false) {
            return <Loader/>
        }
        if(this.state.uid === this.state.capture.userUid){
        return (
            <React.Fragment>
                <section>
                    <form action="#" method="POST" onSubmit={this.saveChange}>
                        <div className="form__control">
                            <label className="form__label" htmlFor="name">Nom de l'oiseau</label>
                            <input onChange={this.handleName} className="form__input" type="text" name="name" id="name" defaultValue={this.state.capture.name}/>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="latin">Nom latin de l'oiseau</label>
                            <input onChange={this.handleLatin} className="form__input" type="text" name="latin" id="latin" defaultValue={this.state.capture.latin}/>
                        </div>
                        <div className="form__control">
                            <label className="form__label"  htmlFor="reprise">Reprise</label>
                            <select className="form__input" onChange={this.handleReprise} name="reprise" id="reprise" defaultValue={this.state.capture.reprise}>
                                <option defaultValue="oui">oui</option>
                                <option defaultValue="non">non</option>
                            </select>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="number">Numéro de bague</label>
                            <input onChange={this.handleNum} className="form__input" type="text" id="number" name="number" defaultValue={this.state.capture.number}/>
                        </div>
                        <div className="form__control">
                            <label className="form__label"  htmlFor="type">Comment a-t-il été capturé&nbsp;?</label>
                            <select className="form__input" onChange={this.handleType} name="type" id="type" defaultValue={this.state.capture.type}>
                                <option defaultValue="filet">Au filet</option>
                                <option defaultValue="nid">Au nid</option>
                                <option defaultValue="autre">Autre</option>
                            </select>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="date">Date de la capture</label>
                            <input onChange={this.handleDate} className="form__input" type="date" id="date" name="date" defaultValue={this.state.capture.date}/>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="where">Lieu de la capture</label>
                            <input onChange={this.handlePlace} className="form__input" type="text" id="where" name="where" defaultValue={this.state.capture.place}/>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="size">Longueur alaire</label>
                            <div className="form__control_small">
                                <input onChange={this.handleSize} className="form__input_small" type="number" id="size" name="size" defaultValue={this.state.capture.size}/> <span>cm</span>
                            </div>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="weight">Poids</label>
                            <div className="form__control_small">
                                <input onChange={this.handleWeight} className="form__input_small" type="number" id="weight" name="weight" defaultValue={this.state.capture.weight}/> <span>grammes</span>
                            </div>
                        </div>
                        <div className="form__control">
                            <label className="form__label"  htmlFor="adiposity">Adiposité de l'oiseau</label>
                            <select className="form__input" onChange={this.handleAdiposity} name="adiposity" id="adiposity" defaultValue={this.state.capture.adiposity}>
                                <option defaultValue="1">1</option>
                                <option defaultValue="2">2</option>
                                <option defaultValue="3">3</option>
                                <option defaultValue="4">4</option>
                                <option defaultValue="5">5</option>
                            </select>
                        </div>
                        <div className="form__control">
                            <label className="form__label"  htmlFor="sexe">Femelle</label>
                            <select className="form__input" onChange={this.handleSexe} name="sexe" id="sexe" defaultValue={this.state.capture.sexe}>
                                <option defaultValue="mâle">Male</option>
                                <option defaultValue="femelle">Femelle</option>
                            </select>
                        </div>
                        <div className="form__control">
                            <label className="form__label" htmlFor="age">Âge de l'oiseau</label>
                            <select className="form__input" onChange={this.handleAge} name="age" id="age" defaultValue={this.state.capture.age}>
                                <option defaultValue="jeune">jeune</option>
                                <option defaultValue="adulte">adulte</option>
                            </select>

                        </div>
                        {this.state.empty === true &&
                        <p className="errors">Tous les champs doivent être remplis</p>
                        }
                        <div>
                            <button className="btn">Sauvegarder</button>
                        </div>
                    </form>
                </section>
            </React.Fragment>
        );
        }
    }
}

export default EditCapture;
