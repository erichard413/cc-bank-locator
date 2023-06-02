import React from 'react';
import header from '../assets/images/header.png';
import '../styles/Header.css';

function Header() {
    return (
        <div className="Header">
            <div className="left">
                <img src={header} alt="header"/>
            </div>
            <div className="right">
                <p>Client Bank Locator</p>
            </div>
            <div className="band-div black"></div>
            <div className="band-div blue"></div>
        </div>
    )
}

export default Header;