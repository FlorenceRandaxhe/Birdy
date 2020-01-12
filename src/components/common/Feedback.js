import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component{
    render() {
        return (
            <div className="success__feedback">
                <div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 383 383">
                            <defs>
                                <filter id="Ellipse_23" x="0" y="0" width="383" height="383" filterUnits="userSpaceOnUse">
                                    <feOffset dy="3" input="SourceAlpha"/>
                                    <feGaussianBlur stdDeviation="5" result="blur"/>
                                    <feFlood flood-color="#363636" flood-opacity="0.149"/>
                                    <feComposite operator="in" in2="blur"/>
                                    <feComposite in="SourceGraphic"/>
                                </filter>
                                <filter id="Ellipse_22" x="11" y="11" width="362" height="362" filterUnits="userSpaceOnUse">
                                    <feOffset dy="3" input="SourceAlpha"/>
                                    <feGaussianBlur stdDeviation="5" result="blur-2"/>
                                    <feFlood flood-color="#363636" flood-opacity="0.149"/>
                                    <feComposite operator="in" in2="blur-2"/>
                                    <feComposite in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_23)">
                                <circle id="Ellipse_23-2" data-name="Ellipse 23" cx="176.5" cy="176.5" r="176.5" transform="translate(15 12)" fill="rgba(164,211,203,0.48)" opacity="0.62"/>
                            </g>
                            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_22)">
                                <circle id="Ellipse_22-2" data-name="Ellipse 22" cx="166" cy="166" r="166" transform="translate(26 23)" fill="#188ea0"/>
                            </g>
                            <path id="Tracé_70" data-name="Tracé 70" d="M10164.52-2516.806l79.729,85.728,132.837-137.837" transform="translate(-10079.02 2688.415)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>
                        </svg>

                    </div>
                    <p>
                        L'oiseau a bien été ajouté à votre liste d'oiseaux capturés&nbsp;!
                    </p>
                    <p>
                        Souhaitez-vous encoder un autre oiseau&nbsp;?
                    </p>

                    <Link className="btn" to={'/new'}>Ajouter une autre capture</Link>

                    <Link className="btn btn__outline" to={'/home'}>Retourner à la page d'accueil</Link>
                </div>
            </div>
        );
    }
}

export default Feedback
