const createError = require('http-errors');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const SocketIo = require('socket.io');

// Initialize the http server, express, and socket.io.
const app = express();
const server = new http.Server(app);
const io = new SocketIo(server, {serveClient: false});

// Serve the client as a static asset.
const reactIndex = path.resolve(__dirname, '../client/build/index.html');
app.use(express.static('client/build', {index: false}));

// Enable logging
app.use(logger('dev'));

// Parse inputs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Enable sessions for express and socket.io.
const sessionMiddleware = require('./middleware/sessions');
app.use(sessionMiddleware);
io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res, next));

// TODO Enable authentication

// Make socket.io available to other express middleware.
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Configure listeners for socket.io namespaces.
io.on('connection', require('./socket.io/default'));
io.of('combat').on('connection', require('./socket.io/combat'));

// Serve the API
app.use('/api/v1', require('./api/v1'));

// For all unhandled requests, serve the React client.
app.use((req, res) => {
    // If the client requests html, send the index. Otherwise, send a 404 - Not Found error.
    if (req.accepts('html')) res.sendFile(reactIndex);
    else next(createError(404))
});

// Listen for http connections.
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;
