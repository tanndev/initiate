import React from 'react';
import '../styles/Header.css';

export default function Header({ newCombat, joinCombat }) {
    return (
        <header className="Header">
            <h2 className="Header-title">
                Initiate
            </h2>
            <div className="Navbar">
                <div className="Navbar-button" onClick={newCombat}>
                    New Combat
                </div>
                <div className="Navbar-button" onClick={joinCombat}>
                    Join Combat
                </div>
            </div>
        </header>
    );
}
