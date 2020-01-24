import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBdYib7l53br7-6JoKl37FHaU96r9lp654",
    authDomain: "birdy-65482.firebaseapp.com",
    databaseURL: "https://birdy-65482.firebaseio.com",
    projectId: "birdy-65482",
    storageBucket: "birdy-65482.appspot.com",
    messagingSenderId: "375497846881",
    appId: "1:375497846881:web:1dc83a30a19f5ab4087a20"
};

firebase.initializeApp(config);

export default firebase;
