const SocketIo = require('socket.io');

// TODO Remove
const Actor = require('./classes/Actor');
const actor = new Actor({name: "Actor McActorSon", affiliation: 'Ally' });

const Combat = require('./classes/Combat');
const combat = new Combat();
combat.addActor(actor);

// Initialize socket.io and listen on the server.
const server = require('./server');
const io = new SocketIo(server, {serveClient: false});

// Use the same middleware as express for sessions.
io.use((socket, next) => require('./middleware/sessions')(socket.request, socket.request.res, next));

// Listen for new connections.
io.on('connection', socket => {
  socket.request.session.socketId = socket.id;
  socket.request.session.save();
  console.log(`Socket ${socket.id} connected to default namespace.`);
});

io.of('combat').on('connection', socket => {
  socket.request.session.socketId = socket.id;
  socket.request.session.save();
  console.log(`Socket ${socket.id} connected to combat namespace.`);

  console.log('Sending combat:', combat);
  socket.emit("Combat", combat);
});

module.exports = io;
