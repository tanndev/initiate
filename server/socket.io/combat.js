// TODO Remove
const Actor = require('../classes/Actor');
const actor = new Actor({name: "Actor McActorSon", affiliation: 'Ally' });

const Combat = require('../classes/Combat');
const combat = new Combat();
combat.addActor(actor);

/**
 * A connection handler for the "Combat" namespace of Socket.io.
 *
 * @param socket
 */
module.exports = socket => {
    console.log(`Socket ${socket.id} connected.`);
    console.log('Sending combat:', combat);
    socket.emit("Combat", combat);
};
