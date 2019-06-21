import React from 'react';
import { Link } from "react-router-dom";

import '../styles/Header.css';

export default function Header() {
    return (
        <header className="Header">
            <Link to='/' className="Header-title">Initiate</Link>
            <div className="Navbar">
                <Link className="Navbar-link" to='/combat/new'> New Combat </Link>,
                <Link className="Navbar-link" to='/combat/demo'> Join Demo Combat </Link>
            </div>
        </header>
    );
}
