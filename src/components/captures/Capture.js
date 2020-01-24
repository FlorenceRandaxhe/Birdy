import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import firebase from '../../config/config';
import Loader from "../common/Loader";

class Capture extends Component {
    state = {
        capture: {},
        id: '',
        loading: false,
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
            return <Loader/>
        }
        let user = firebase.auth().currentUser;
        if (user) {
            return (
                <React.Fragment>
                    <section>
                        <div className="section__header">
                            <h2>{this.state.capture.name}</h2>
                            {user.uid === this.state.capture.userUid &&
                            <Link to={`/edit/${this.state.id}`} className="btn__small">Modifier</Link>
                            }
                        </div>

                        <div className="bird_info">
                            <div>
                                <span>Nom latin</span> {this.state.capture.latin}
                            </div>
                            <div>
                                <span>Date de la capture</span> {this.state.capture.date}
                            </div>
                            <div>
                                <span>Capture</span> {this.state.capture.type}
                            </div>
                            <div>
                                <span>Numéro de bague</span> {this.state.capture.number}
                            </div>
                            <div>
                                <span>Lieu de la capture</span> {this.state.capture.place}
                            </div>
                        </div>

                        <div className="box__container">
                            <h3>Caractéristiques</h3>
                            <div className="grid__parent">
                                <div className="grid__child">
                                    <span className="block">Poids</span>
                                    <div className="outline">{this.state.capture.weight} g</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Envergure</span>
                                    <div className="outline">{this.state.capture.size} cm</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Sexe</span>
                                    <div className="outline">{this.state.capture.sexe}</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Adiposité</span>
                                    <div className="outline">{this.state.capture.adiposity}</div>
                                </div>
                                <div className="grid__child">
                                    <span className="block">Âge</span>
                                    <div className="outline">{this.state.capture.age}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                </React.Fragment>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default Capture;
