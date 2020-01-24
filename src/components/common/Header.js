import React, {Component} from 'react';

class Header extends Component{
    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <svg className="header_logo" xmlns="http://www.w3.org/2000/svg" width="81.204" height="51.425" viewBox="0 0 81.204 51.425"><g><path d="M70.827,9.821,53.648,29.349,31.6.2Z" transform="translate(-17.57 -0.2)" fill="#93d1db"/><path d="M115.86,39l5.326,10.881L114.6,39.573Z" transform="translate(-53.039 -16.781)" fill="#fff"/><path d="M46.3,83.334l4.066-8.7h0l2.52-.229Z" transform="translate(-23.852 -31.908)" fill="#fff"/><path d="M77.109,17l8.3,13.171L92,40.479,46.3,58.8l6.586-8.934L61.361,38.36Z" transform="translate(-23.852 -7.379)" fill="#93d1db"/><path d="M129.6,38.443l1.546-6.643-.744,6.643Z" transform="translate(-59.449 -13.704)" fill="#fff"/><path d="M33.614,74.8l-4.066,8.7L7.1,77.32Z" transform="translate(-7.1 -32.079)" fill="#93d1db"/><path d="M125.676,31.8l-1.546,6.643-2,8.361L116.8,35.923Z" transform="translate(-53.979 -13.704)" fill="#93d1db"/><path d="M131.744,31.8l9.506,6.643H131Z" transform="translate(-60.047 -13.704)" fill="#93d1db"/><path d="M87.28,17,71.532,38.36,70.1,36.528Z" transform="translate(-34.022 -7.379)" fill="#fff"/></g></svg>
                    <h1 className="header_title">Birdy</h1>
                </header>
            </React.Fragment>
        )
    }
}
export default Header;
