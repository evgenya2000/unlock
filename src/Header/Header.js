import React from "react";

import "./header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.getCorrectImage()
        };
    }

    getCorrectImage = () => {
        return window.innerWidth < 501 ? process.env.PUBLIC_URL + '/resources/header-phone.svg' : process.env.PUBLIC_URL + '/resources/header.svg';
    };

    render() {
        return (
            <div className="header">
                <img src={this.state.src} alt="Разговорный английский для всех" style={{width: '100%'}} />
            </div>
        );
    }
}

/* class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: process.env.PUBLIC_URL + '/resources/header.svg'
        };
    }

    /* Adding an event listener when rendering is updated */
    /* componentDidMount() {
        window.addEventListener('resize', this.updateSrc);
    } */

    /* Removing an event listener when a component is removed */
    /* componentWillUnmount() {
        window.removeEventListener('resize', this.updateSrc);
    }

    updateSrc = () => {
        const screenWidth = window.innerWidth;
        const newSrc = screenWidth < 501 ? process.env.PUBLIC_URL + '/resources/header-phone.svg' : process.env.PUBLIC_URL + '/resources/header.svg';
        this.setState({ src: newSrc });
    };

    render() {
        return (
            <div className="header">
                <img src={this.state.src} alt="Разговорный английский для всех" />
            </div>
        );
    } */
/* } */


export default Header;
