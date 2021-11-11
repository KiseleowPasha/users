"use strict";
exports.__esModule = true;
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var server = express();
var PORT = 8080;
var DIST_DIR = path.resolve(__dirname, '../dist');
var HTML_FILE = path.resolve(DIST_DIR, 'index.html');
var DB_DIR = path.resolve(__dirname, './db');
var USERS_FILE = path.resolve(DB_DIR, 'users.json');
var urlencodedParser = express.urlencoded({ extended: false });
server.use(express.static(DIST_DIR));
server.use(bodyParser.json());
server.get('/api/users', function (req, res) {
    res.sendFile(USERS_FILE);
});
server.post('/api/users', urlencodedParser, function (req, res) {
    var users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    users.push(req.body);
    fs.writeFile(USERS_FILE, JSON.stringify(users), function (err) {
        if (err)
            throw err;
    });
    res.sendStatus(200);
});
server["delete"]("/api/users", urlencodedParser, function (req, res) {
    var users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    var newUsers = users.filter(function (user) { return user.id !== req.body.id; });
    fs.writeFile(USERS_FILE, JSON.stringify(newUsers), function (err) {
        if (err)
            throw err;
    });
    res.sendStatus(200);
});
server.patch("/api/users", urlencodedParser, function (req, res) {
    var users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    var currentUser = users.find(function (user) { return user.id === req.body.id; });
    if (currentUser) {
        currentUser.name = req.body.name;
        currentUser.role = req.body.role;
    }
    fs.writeFile(USERS_FILE, JSON.stringify(users), function (err) {
        if (err)
            throw err;
    });
    res.sendStatus(200);
});
server.get('*', function (req, res) {
    res.sendFile(HTML_FILE);
});
server.listen(PORT, function () {
    console.log("Server has been started on: " + PORT);
});
