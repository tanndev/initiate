import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import '../styles/App.css';

import Header from './Header';
import Combat from './Combat';

export default function App() {

    const githubLink = (<a href="https://github.com/tanndev/initiate">Github</a>);

    const greeting = () => (
        <p>
            Visit our {githubLink} to see our roadmap, keep up to date on our progress, or contribute!
        </p>
    );

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="App-content">
                    <Route exact path='/' render={greeting}/>
                    <Route path='/combat/:combatId?' component={Combat}/>
                </div>
                <footer>
                    <p>Check us out on {githubLink}.</p>
                </footer>
            </div>
        </Router>
    );
}
