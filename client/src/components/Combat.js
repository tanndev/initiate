import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import socketIOClient from 'socket.io-client';

import '../styles/Combat.css';

const socket = socketIOClient();

export default function Combat({ match }) {
    const [connected, setConnected] = useState(false);
    const [combat, setCombat] = useState(null);

    console.log(`Rendered component:`, match.url);

    // Monitor the socket for combat commands.
    useEffect(() => {
        console.log('Adding listeners.');

        // Set initial socket state.
        setConnected(socket.connected);

        // Handle connections
        socket.on("connect", () => {
            console.log(`Connected to ${socket.id}`);
            setConnected(true);
        });

        // Handle disconnections.
        socket.on("disconnect", () => {
            console.log('Disconnected');
            setConnected(false);
        });

        // Monitor for combat commands.
        socket.on("update combat", combat => {
            console.log('Received new combat:', combat);
            setCombat(combat);
        });

        // Clean up when the component unmounts.
        return () => {
            console.log('Removing listeners.');
            socket.removeAllListeners();
        };
    }, []);

    // When the combat changes, leave the previous combat.
    useEffect(() => {
        if (combat) return () => {
            console.log('Leaving combat', combat);
            socket.emit('leave combat', combat.id);
        };
    }, [combat]);

    const { combatId } = match.params;
    if (combatId === 'new') {
        socket.emit('create combat');
        return (<Redirect to='/combat'/>);
    }
    if (combatId) {
        socket.emit('join combat', combatId);
        return (<Redirect to='/combat'/>);
    }

    const connectionStatus = connected ? <p>Connected!</p> : <p>Reconnecting...</p>;

    if (combat && combat.error) return (
        <div className="Combat">
            {connectionStatus}
            <p>Error for combat {combat.id}:</p>
            <code>{combat.error}</code>

        </div>
    );

    // Gather data for the actors display.
    // TODO Sort this server-side, properly.
    const actors = combat ? combat.actors.sort((a, b) => b.initiative - a.initiative) : [];

    // If there's no current combat, render a simple display.
    if (!combat) return (
        <div className="Combat">
            {connectionStatus}
            <p> You are not in combat. </p>
        </div>
    );

    // Otherwise, render the full combat display.
    else return (
        <div className="Combat">
            {connectionStatus}
            <p>Combat ID: <code>{combat.id}</code>.</p>
            <div className="Combat-actors">
                {actors.map(actor => (
                    <div key={actor.id} className={`Actor ${actor.affiliation}`}>
                        <div className="Actor-name">{actor.name}</div>
                        {/*<div className="Actor-affiliation">{actor.affiliation}</div>*/}
                        <div className="Actor-initiative">{actor.initiative}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
