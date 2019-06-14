// TODO Remove
const Actor = require('./classes/Actor');
const actor = new Actor({name: "Actor McActorSon", affiliation: 'Ally' });

const Combat = require('./classes/Combat');
const combat = new Combat();
combat.addActor(actor);

/**
 * Stores the active combats, indexed by ID.
 * @type {Map<string, Combat>}
 */
const combats = new Map();

/**
 * A connection handler for socket.io.
 *
 * @param {SocketIO.Socket} socket
 */
module.exports = socket => {
    console.log(`Socket ${socket.id} connected.`);

    socket.on('create combat', () => {
        console.log(`Socket ${socket.id} asked for a new combat.`);

        // Create a new combat.
        const combat = new Combat();
        combat.addActor(new Actor({name: "Actor McActorSon", affiliation: 'Ally' })); // TODO Remove this.
        combats.set(combat.id, combat);

        // Connect the client to the combat room and send them the combat.
        socket.join(combat.id);
        socket.emit('update combat', combat);
    });

    socket.on('join combat', id => {
        const combat = combats.get(id);
        if (!combat) socket.emit('update combat', {id, error: "No such combat."});
        else {
            socket.join(id);
            socket.emit('update combat', combat);
        }
    });

    socket.on('leave combat', id => {
        socket.leave(id);
        // TODO Clean up the combat if nobody is in it.
    })
};