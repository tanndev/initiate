import React, { useEffect, useState } from 'react';
// import { Redirect } from "react-router-dom";
import socketIOClient from 'socket.io-client';

import '../styles/Combat.css';

const socket = socketIOClient();

export default function Combat({ history, match }) {
    const [combat, setCombat] = useState(null);

    // Fire events on the path.
    useEffect(() => {
        const { id } = match.params;
        if (id === 'new') {
            socket.emit('create combat');
            history.replace(`/combat`);
        }
        else if (id) {
            socket.emit('join combat', id);
            history.replace(`/combat`);
        }
    }, [history, match.params]);

    // Monitor the socket for combat commands.
    useEffect(() => {
        // Monitor for combat commands.
        socket.on("update combat", combat => {
            console.log('Received new combat:', combat);
            setCombat(combat);
        });

        // Monitor for other users joining and leaving.
        socket.on("client joined", id => {
            console.log('Another client joined:', id);
        });
        socket.on("client left", id => {
            console.log('Another client left:', id);
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

    if (combat && combat.error) return (
        <div className="Combat">
            <p>Error for combat {combat.id}:</p>
            <code>{combat.error}</code>

        </div>
    );
    // If there's no current combat, render a simple display.
    if (!combat) return (
        <div className="Combat">
            <p> You are not in combat. </p>
        </div>
    );

    // Otherwise, render the full combat display.
    return (
        <div className="Combat">
            <p>Combat ID: <code>{combat.id}</code>.</p>
            <div className="Combat-actors">
                {combat.actors.map(actor => (
                    <div key={actor.id} className={`Actor ${actor.affiliation}`}>
                        <div className="Actor-name">{actor.name}</div>
                        <div className="Actor-initiative">{actor.initiative}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
