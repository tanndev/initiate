import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import '../styles/App.css';

import Header from './Header';
import Combat from './Combat';
import Footer from './Footer';

export default function App() {

    const Home = () => (
        <p>
            Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap,
            keep up to date on our progress, or contribute!
        </p>
    );

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="App-content">
                    <Route exact path='/' component={Home}/>
                    <Route path='/combat/:id?' component={Combat}/>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}
