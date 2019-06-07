const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const readline = require('readline');
const shortid = require('shortid');

// Initialize express and socket.io
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Serve the client as a static asset.
const reactIndex = path.resolve(__dirname, '../client/build/index.html');
app.use(express.static('client/build', {index: false}));

// Enable logging
app.use(logger('dev'));

// Parse inputs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// TODO Enable sessions

// TODO Enable authentication

// For all unhandled requests, serve the React client.
app.use((req, res) => {
    // If the client requests html, send the index. Otherwise, send a 404 - Not Found error.
    if (req.accepts('html')) res.sendFile(reactIndex);
    else next(createError(404))
});

// Handle Socket.io connections.
io.on('connection', socket => {
    const clientId = shortid.generate();

    // Give the client their clientId
    socket.emit("ClientId", {clientId});

    // Periodically send them a random number.
    let interval = setInterval(() => {
        const random = shortid.generate();
        socket.emit("Random", {clientId, random});
    }, 4000);

    socket.on("disconnect", () => {
        clearInterval(interval);
    })
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askForMessage (){
    rl.question("Send a message to all clients:", answer => {
        io.emit("Text", answer);
        askForMessage();
    })
}

// Listen
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    askForMessage();
});

module.exports = app;
