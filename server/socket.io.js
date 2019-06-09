const SocketIo = require('socket.io');

// Initialize socket.io and listen on the server.
const server = require('./server');
const io = new SocketIo(server, {serveClient: false});

// Use the same middleware as express for sessions.
io.use((socket, next) => require('./middleware/sessions')(socket.request, socket.request.res, next));

// Listen for new connections.
io.on('connection', socket => {
  socket.request.session.socketId = socket.id;
  socket.request.session.save();
  const clientId = socket.id;
  console.log(`Socket ${clientId} connected.`);
  console.log('With session:', socket.request.session);

  socket.broadcast.emit('Join', {clientId});

  // Give the client their clientId
  socket.emit("Welcome", {clientId});

  socket.on("Message", message => {
    const {sender, text} = message;
    socket.broadcast.emit("Message", {clientId, sender, text});
    console.log(`${sender}(${clientId}) said: ${text}`)
  });

  socket.on("Name Change", name => {
    io.emit("Name Change", {clientId, name});
    console.log(`${clientId} renamed to ${name}`)
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit('Leave', {clientId});
  })
});

module.exports = io;
