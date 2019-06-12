import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export default function Combat() {
    const [combat, setCombat] = useState(null);

    // As an effect, connect to the combat Socket.IO namespace for communication..
    useEffect(() => {
        const socket = socketIOClient('/combat');

        socket.on("connect", () => {
            console.log(`Connected to combat namespace as ${socket.id}.`);
        });

        socket.on("Combat", combat => {
            console.log('Received new combat:', combat);
            setCombat(combat);
        });

        socket.on("disconnect", () => {
            console.log('Disconnected from combat namespace.');
        });
    }, []);

    // Gather data for the actors display.
    const actors = combat ? combat.actors.sort((a, b) => a.initiative - b.initiative) : [];
    const actorCount = actors.length === 1 ? 'is 1 actor' : `are ${actors.length} actors`;

    // If there's no current combat, render a simple display.
    if (!combat) return (
        <div className="Combat">
            <p>You are not in combat.</p>
        </div>
    );

    // Otherwise, render the full combat display.
    else return (
        <div className="Combat">
            <p> You are in combat {combat.id}. </p>
            <p> There {actorCount} in this combat. </p>
            <div className="ActorList">
                {actors.map(actor => (
                    <div key={actor.id} className={`Actor ${actor.affiliation}`}>
                        <div className="Actor-name">{actor.name}</div>
                        <div className="Actor-affiliation">{actor.affiliation}</div>
                        <div className="Actor-initiative">{actor.initiative}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
