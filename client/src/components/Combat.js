import React from 'react';

export default function Combat({ combat }) {

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
