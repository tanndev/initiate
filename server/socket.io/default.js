/**
 * A connection handler for the default namespace of Socket.io.
 *
 * @param socket
 */
module.exports = socket => {
    console.log(`Socket ${socket.id} connected.`);
};
