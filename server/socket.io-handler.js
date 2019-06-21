const Actor = require('./classes/Actor');
const Combat = require('./classes/Combat');

/**
 * Stores the active combats, indexed by ID.
 * @type {Map<string, Combat>}
 */
const combats = new Map();

// TODO Remove this.
const demoCombat = new Combat({ id: 'demo' });
Actor.randomActorList().forEach(actor => demoCombat.addActor(actor));
combats.set(demoCombat.id, demoCombat);

module.exports = io => {
    /**
     * A connection handler for socket.io.
     *
     * @param {SocketIO.Socket} socket
     */
    const handler = socket => {
        console.log(`Socket ${socket.id} connected.`);

        socket.on('disconnecting', () => {
            const rooms = Object.keys(socket.rooms);
            rooms.forEach(room => {
                socket.broadcast.to(room).emit('client left', socket.id);
            })
        });


        socket.on('create combat', () => {
            console.log(`Socket ${socket.id} asked for a new combat.`);

            // Create a new combat.
            const combat = new Combat();
            Actor.randomActorList().forEach(actor => combat.addActor(actor));
            combats.set(combat.id, combat);

            // Connect the client to the combat room and send them the combat.
            socket.join(combat.id);
            socket.emit('update combat', combat);
        });

        socket.on('join combat', id => {
            console.log(`Socket ${socket.id} asked to join combat ${id}.`);
            const combat = combats.get(id);
            if (!combat) socket.emit('update combat', { id, error: "No such combat." });
            else {
                socket.join(id);
                socket.broadcast.to(id).emit('client joined', socket.id);
                socket.emit('update combat', combat);

                io.in(id).clients((error, clients) => {
                    if (error) console.error(error);
                    else console.log(`${clients.length} clients now connected.`);
                });
            }
        });

        socket.on('leave combat', id => {
            console.log(`Socket ${socket.id} asked to leave combat ${id}.`);
            socket.leave(id);
            socket.broadcast.to(id).emit('client left', socket.id);

            // TODO Clean up the combat if nobody is in it.
            io.in(id).clients((error, clients) => {
                if (error) console.error(error);
                else console.log(`${clients.length} clients still connected.`);
            });
        });
    };
    return handler;
};
