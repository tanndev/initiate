import React, { useEffect, useState } from 'react';
import socket from '../socket.io';

import '../styles/Combat.css';

export default function Combat({ history, match }) {
    const [combat, setCombat] = useState(null);

    // Handle inputs from the path.
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

    // On mount/unmount, add/remove listeners to teh socket.
    useEffect(() => {
        // Define the listeners.
        const listeners = {
            // Update the combat object.
            "update combat": (combat => {
                console.log('Received new combat:', combat);
                setCombat(combat);
            }),

            // Handle new clients joining.
            "client joined": (id => {
                console.log('Another client joined:', id);
            }),

            // Handle existing clients leaving.
            "client left": (id => {
                console.log('Another client left:', id);
            })
        };

        // Mount the listeners.
        console.log('Adding listeners...');
        for (const name in listeners) socket.on(name, listeners[name]);

        // Clean up by removing the listeners.
        return () => {
            console.log('Removing listeners...');
            for (const name in listeners)  socket.removeListener(name, listeners[name]);
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
