import React, {Component} from 'react';
import firebase from '../config/config';

class Profile extends Component {
    state = {
        email:'',
        password:'',
        loading:false,
        emailEmpty:false,
        passEmpty:false,
        succes:false,
        pass:false,
        currentUser: firebase.auth().currentUser
    };

    mail = (e) => {
        this.setState({email: e.target.value});
    };

    password = (e) => {
        this.setState({password: e.target.value});
    };

    updateEmail = (e) => {
        e.preventDefault();
        const email = this.state.email;
        if (email === ''){
            this.setState({emailEmpty:true});
        } else {
            firebase.auth().currentUser.updateEmail(email)
                .then(function() {
                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({email: email,});
                    console.log(firebase.auth().currentUser.email);
                }).catch(function(error) {

                console.log(error)
            });
        }
    };

    updatePassword = (e) => {
        e.preventDefault();
        const newPassword = this.state.password;
        if (newPassword === ''){
            this.setState({passEmpty:true});
        } else {
            firebase.auth().currentUser.updatePassword(newPassword).then(function () {
                console.log('ok');
            }).catch(function (error) {
                console.log(error)
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <section>
                    <h2 className="sro">Mon profil</h2>
                   <h3 className="title__login">Modifier mon adresse email</h3>
                    {this.state.emailEmpty === true &&
                    <p className="errors">Le champs doit être rempli</p>
                    }
                    <form action="" method="get" onSubmit={this.updateEmail}>
                        <input className="form__input__small" type="email" defaultValue={this.state.currentUser.email} onChange={this.mail}/>
                        <button className="btn__mid" type="submit">Changer</button>
                    </form>

                    <h3 className="title__login">Modifier mon mot de passe</h3>
                    <form action="" method="get" onSubmit={this.updatePassword}>
                        {this.state.pass === true &&
                        <p className="errors">Le mot de passe doit avoir 6 caractères minimum</p>
                        }
                        {this.state.passEmpty === true &&
                        <p className="errors">Le champs doit être rempli</p>
                        }
                        <input className="form__input__small" type="password" onChange={this.password}/>
                        <button className="btn__mid" type="submit">Changer</button>
                    </form>
                </section>
            </React.Fragment>
        );
    }
}

export default Profile;
