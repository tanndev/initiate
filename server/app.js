const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

// Initialize express and listen on the server.
const server = require('./server');
const app = express();
server.on("request", app);

// Serve the client as a static asset.
const reactIndex = path.resolve(__dirname, '../client/build/index.html');
app.use(express.static('client/build', {index: false}));

// Enable logging
app.use(logger('dev'));

// Parse inputs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Enable sessions
app.use(require('./middleware/sessions'));

// TODO Enable authentication

// Make socket.io available to other middleware.
const io = require('./socket.io');
app.use((req, res, next) => {
    req.io = io;

    const {socketId} = req.session;
    if (socketId) req.clientSocket = io.sockets.connected[socketId];
    next();
});

// Serve the API
app.use('/api/v1', require('./api/v1'));

// TODO Remove
const Actor = require('./classes/Actor');
const actor = new Actor({name: "Actor McActorSon", affiliation: 'Ally' });
console.log(actor);

const Combat = require('./classes/Combat');
const combat = new Combat();
combat.addActor(actor);
console.log(combat);

// For all unhandled requests, serve the React client.
app.use((req, res) => {
    // If the client requests html, send the index. Otherwise, send a 404 - Not Found error.
    if (req.accepts('html')) res.sendFile(reactIndex);
    else next(createError(404))
});

module.exports = app;
