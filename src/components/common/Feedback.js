import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component{
    render() {
        return (
            <div className="feedback">
                <div className="feedback_svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 383 383">
                        <defs><filter x="0" y="0" width="383" height="383" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="5" result="blur"/><feFlood floodColor="#363636" floodOpacity="0.149"/><feComposite operator="in" in2="blur"/><feComposite in="SourceGraphic"/></filter><filter id="Ellipse_22" x="11" y="11" width="362" height="362" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="5" result="blur-2"/><feFlood floodColor="#363636" floodOpacity="0.149"/><feComposite operator="in" in2="blur-2"/><feComposite in="SourceGraphic"/></filter></defs>
                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_23)"><circle cx="176.5" cy="176.5" r="176.5" transform="translate(15 12)" fill="rgba(164,211,203,0.48)" opacity="0.62"/></g><g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_22)"><circle cx="166" cy="166" r="166" transform="translate(26 23)" fill="#188ea0"/></g><path d="M10164.52-2516.806l79.729,85.728,132.837-137.837" transform="translate(-10079.02 2688.415)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"/>
                    </svg>
                </div>
                <div className="feedback_text">
                    <p>L'oiseau a bien été ajouté à votre liste d'oiseaux capturés&nbsp;!</p>
                    <p>Souhaitez-vous encoder un autre oiseau&nbsp;?</p>
                </div>
                <div className="feedback_link">
                    <Link className="btn__outline" to={'/home'}>Retourner à la page d'accueil</Link>
                </div>
            </div>
        );
    }
}

export default Feedback
