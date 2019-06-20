import React from 'react';
import { Link } from "react-router-dom";

import '../styles/Header.css';

export default function Header({ connected, newCombat, joinCombat }) {

    const navbarButtons = [
        <div key='new' className="Navbar-button" onClick={newCombat}> New Combat </div>,
        <div key='join' className="Navbar-button" onClick={joinCombat}> Join Combat </div>,
        <Link key='link' className="Navbar-button" to='/combat'> Go To Combat </Link>
    ];

    const navbarReconnecting = <div className="Navbar-reconnecting">Reconnecting...</div>;

    return (
        <header className="Header">
            <Link to='/' className="Header-title">
                Initiate
            </Link>
            <div className="Navbar">
                {connected ? navbarButtons : navbarReconnecting}
            </div>
        </header>
    );
}
