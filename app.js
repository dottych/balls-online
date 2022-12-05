const express = require('express');
const app = express();
const path = require('path');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/help", (req, res) => {
    res.sendFile(__dirname + "/help.html");
});

app.get("/oldest", (req, res) => {
    res.sendFile(__dirname + "/oldest.html");
});

/*app.get("/docs", (req, res) => {
    res.sendFile(__dirname + "/docs.html");
});*/

app.use(express.static(path.join(__dirname, "include")));

module.exports = app;