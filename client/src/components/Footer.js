import React, { useEffect, useState } from 'react';
import socket from '../socket.io';

import '../styles/Footer.css';
import octocat from '../assets/octocat.png';

export default function Footer() {
    const [connected, setConnected] = useState(false);

    // Monitor the socket for connections.
    useEffect(() => {
        setConnected(socket.connected);
        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => setConnected(false));
    }, []);

    return (
        <footer>
            <a href="https://github.com/tanndev/initiate" target='_blank' rel='noopener noreferrer'>
                <img src={octocat} alt='Visit our Github repository'/>
            </a>
            {connected
             ? <div>Connected as {socket.id}</div>
             : <div>
                 <i className="material-icons md-24 blink icon">sync_problem</i>
                 <div>Reconnecting...</div>
             </div>}
        </footer>
    );
}
