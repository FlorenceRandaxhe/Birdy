import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import firebase from '../../config/config';
import Loader from "../common/Loader";

class BirdDescription extends Component {
    state = {
        bird: {},
        id: '',
        loading: false,
    };
    componentDidMount() {
        const ref = firebase.firestore().collection('encyclopedia').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            this.setState({
                bird: doc.data(),
                id: doc.id,
                loading: true
            });
        });
    }
    render() {
        if (this.state.loading === false) {
            return <Loader/>
        }
        firebase.storage().ref().child('bird.jpg').getDownloadURL().then(url => {
            console.log(url);
            document.getElementById('bird_img').src = url;
        });
        firebase.storage().ref().child('10632.mp3').getDownloadURL().then(url => {
            console.log(url);
            document.getElementById('audio').src = url;
        });
        let user = firebase.auth().currentUser;
        if (user) {
            return (
                <React.Fragment>
                    <section>
                        <img id="bird_img" className="single__bird__img" width="300px" alt={this.state.bird.name}/>
                        <div className="box__container">
                            <h2 className="title__bird title__centered">{this.state.bird.name}</h2>
                            <p className="latin__name__bird">{this.state.bird.latin}</p>
                            <h3 className="section_subtitle">Description</h3>
                            <p>{this.state.bird.description}</p>
                        </div>
                        <div className="box__container">
                            <h3 className="section_subtitle">Caractéristiques</h3>
                            <div className="grid__parent">
                                <div className="grid__child">
                                    <span className="block">Poids</span>
                                    <div className="outline">{this.state.bird.weight} g</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Taille</span>
                                    <div className="outline">{this.state.bird.heigth} cm</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Envergure</span>
                                    <div className="outline">{this.state.bird.size} cm</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Ordre</span>
                                    <div className="outline">{this.state.bird.order}</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Famille</span>
                                    <div className="outline">{this.state.bird.family}</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Espèce</span>
                                    <div className="outline">{this.state.bird.species}</div>
                                </div>
                            </div>
                        </div>
                        <div className="box__container">
                            <h3 className="section_subtitle">Nidification</h3>
                            <p>
                                {this.state.bird.nidification}
                            </p>
                        </div>
                        <div className="box__container">
                            <h3 className="section_subtitle">Alimentation</h3>
                            <p>
                                {this.state.bird.food}
                            </p>
                        </div>
                        <div className="box__container">
                            <h3 className="section_subtitle">Habitat</h3>
                            <p>
                                {this.state.bird.living}
                            </p>
                        </div>
                        <div className="box__container">
                            <audio controls id="audio">
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                        </div>
                    </section>
                </React.Fragment>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default BirdDescription;
