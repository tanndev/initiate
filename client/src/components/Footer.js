import React from 'react';

import '../styles/Footer.css';
import octocat from '../images/octocat.png';

export default function Footer() {
    return (
        <footer>
            <a href="https://github.com/tanndev/initiate" target='_blank' rel='noopener noreferrer'>
                <img src={octocat} alt='Visit our Github repository'/>
            </a>
        </footer>
    );
}
