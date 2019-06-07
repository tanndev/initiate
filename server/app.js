const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

// Initialize express
const app = express();

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

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

module.exports = app;
