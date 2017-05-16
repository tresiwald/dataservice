/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const https = require('https');
const http = require('http');
const fs = require('fs');

const host = "0.0.0.0";
const port = 8888;
const app = express();

var server = http.createServer(app).listen(port, host, function (error) {
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log("Server listening...");
        console.log("on http://" + host + ":" + port);
    }
});

app.use(express.static(__dirname + '/'));
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});