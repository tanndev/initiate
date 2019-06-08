const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const router = express.Router();

// Provide very general information about the API.
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the TaaS Accounts API!",
        apiVersion: 1,
        apiBaseUrl: req.originalUrl
    });
});

// Configure SwaggerUI
const apiSpecYaml = fs.readFileSync(path.resolve(__dirname, 'spec.yml'), 'utf-8');
const apiSpec = YAML.parse(apiSpecYaml);
const swaggerHTML = swaggerUI.generateHTML(apiSpec);
router.use('/spec', swaggerUI.serve);
router.get('/spec', (req, res, next) => {
    if (req.accepts('html')) res.send(swaggerHTML);
    else if (req.accepts('json')) res.json(apiSpec);
    else if (req.accepts('application/yaml')) res.send(apiSpecYaml);
    else next(createError(501, "API Spec not yet available in the requested format."));
});

// Return a 404 error if no matching API endpoint is found.
router.use((req, res, next) => next(createError(404, `No such API endpoint: ${req.method} ${req.url}`)));

module.exports = router;
