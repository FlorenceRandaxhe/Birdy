import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Nav from '../common/Nav';
import firebase from '../../config/config';

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
            return (<div className="bouncing-loader"><div></div><div></div><div></div></div>);
        }
        let user = firebase.auth().currentUser;
        if (user) {
            return (
                <React.Fragment>
                    <section className="">
                        <div className="modifie__link__container">
                            <Link to={`/edit/${this.state.id}`} className="modifie__link">Modifier</Link>
                        </div>

                        <div className="container__single__bird">
                            <h2>{this.state.capture.name}</h2>

                            <p className="latin__name__bird">{this.state.capture.latin}</p>
                            <p>
                                Date de la capture&nbsp;: {this.state.capture.date}
                            </p>
                            <p>
                                Capture&nbsp;: {this.state.capture.type}
                            </p>
                            <p>
                                Numéro de bague&nbsp;: {this.state.capture.number}
                            </p>
                            <p>
                                Lieu de la capture&nbsp;: {this.state.capture.place}
                            </p>
                            <h3 className="subtitle__bird">Caractéristiques</h3>
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
                    <Nav/>
                </React.Fragment>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default Capture;
