import React from 'react';
import '../styles/Header.css';

export default function Header() {

    function newCombat() {
        alert("You asked for a new combat!");
        console.log('User asked for a new combat!');
    }

    function joinCombat() {
        alert("You asked to join combat!");
        console.log('User asked to join combat!');
    }

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
