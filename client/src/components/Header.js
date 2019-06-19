import React from 'react';

import '../styles/Header.css';

export default function Header({ connected, newCombat, joinCombat }) {

    const navbarButtons = [
        <div className="Navbar-button" onClick={newCombat}> New Combat </div>,
        <div className="Navbar-button" onClick={joinCombat}> Join Combat </div>
    ];

    const navbarReconnecting = <div className="Navbar-reconnecting">Reconnecting...</div>;

    return (
        <header className="Header">
            <h2 className="Header-title">
                Initiate
            </h2>
            <div className="Navbar">
                {connected ? navbarButtons : navbarReconnecting}
            </div>
        </header>
    );
}
