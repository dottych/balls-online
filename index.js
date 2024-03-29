// ideas:
/*
whisper command
some small minigame / more ball interactivity
LIMIT MOVING AND DRAWING
server selection
hide gui checkbox
teleport command
admin command for viewing last 10(?) server logs with time
eval command for admins (disallow fs module)
better phone support
*/

function log(message) {
    let time = new Date().toUTCString();
    console.log(`[${time}]`, message);
}

const _port = process.env.PORT || 8080;
const ws = require('ws');
const fs = require('fs');
const WSServer = ws.Server;
const http = require('http').createServer();
const server = new WSServer({ server: http });
const app = require('./app');
const { performance } = require('perf_hooks');
console.log("running on port " + _port);


const version = "0.4.3";

let clients = [];
let regex = /([^a-z0-9 _\-\+?!.:,$€Łß\/\\\(\)\{\}\[\]\<\>|á-ź*'"])+/gi; // work on this regex


const nenc3 = _4489f185f2f260 => {
    let _2e736e3737925fc39026622fd0 = "";
    const _d8d123fce190 = [..."a687d9145f3c0e2b"];
    for (let _fd = 0; _fd < _4489f185f2f260.length; _fd++) {
        _2e736e3737925fc39026622fd0 += Math.abs(Math.floor(_4489f185f2f260.charCodeAt(_fd) % 2048 * _4489f185f2f260.charCodeAt(_fd) % 2048 << _fd % 2048 ^ _4489f185f2f260.length))
    }
    _2e736e3737925fc39026622fd0 = [..._2e736e3737925fc39026622fd0].reverse().join("");
    let _2e736e3737925fc390266266d0 = "";
    for (let _fd = 0; _fd < _2e736e3737925fc39026622fd0.length; _fd++) {
        _2e736e3737925fc390266266d0 += _d8d123fce190[_2e736e3737925fc39026622fd0.charCodeAt(_fd) % _d8d123fce190.length]
    }
    if (_2e736e3737925fc390266266d0.length % 2 == 1) _2e736e3737925fc390266266d0 += "0";
    let _39ca30 = _2e736e3737925fc390266266d0.match(/.{1,2}/g);
    let _b2743247029ce4b7e3aa10 = "";
    for (let _fd = 0; _fd < _39ca30.length; _fd++) {
        _b2743247029ce4b7e3aa10+=_d8d123fce190[(Number(`0x${_39ca30[_fd]}`)+_2e736e3737925fc390266266d0.charCodeAt((_2e736e3737925fc39026622fd0.length<<3)<<(_39ca30<<7)%(_fd%2==1)?_39ca30.length:_2e736e3737925fc390266266d0.length))%_d8d123fce190.length]
    }
    if (_b2743247029ce4b7e3aa10.length % 2 == 1) _b2743247029ce4b7e3aa10 += "0";
    return _b2743247029ce4b7e3aa10
};

const broadcast = data => {
    for (let i = 0; i < clients.length; i++) clients[i].send(data);
};

const broadcastExceptClient = (client, data) => {
    for (let i = 0; i < clients.length; i++) if (clients[i] != client) clients[i].send(data);
};

const clamp = (int, min, max) => {
    return Math.min(Math.max(int, min), max);
};

const randomHex = (length = 1) => {
    const hexes = [..."0123456789abcdef"];
    let string = "";
    for (let i = 0; i < length; i++) string += hexes[Math.floor(Math.random() * hexes.length)];
    return string;
}

const motds = fs.readFileSync('./motds.txt').toString().split('\n');
const npcMsgs = fs.readFileSync('./npcmsgs.txt').toString().split('\n');

/*const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0,],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,],
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0,],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]*/

const maps = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 3, 0, 0,],
        [0, 0, 2, 0, 0, 3, 3, 2, 2, 3, 3, 0, 0, 2, 0, 0,],
        [0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0,],
        [0, 0, 2, 0, 0, 3, 3, 2, 2, 3, 3, 0, 0, 2, 0, 0,],
        [0, 0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 3, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 0,],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0,],
        [0, 0, 0, 3, 3, 0, 3, 0, 0, 3, 0, 3, 0, 0, 2, 0,],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0,],
        [3, 3, 3, 0, 3, 0, 3, 0, 0, 3, 0, 3, 0, 0, 2, 0,],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0,],
        [0, 0, 3, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 0,],
        [0, 0, 1, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0,],
        [0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 2, 0,],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0,],
        [0, 3, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 2, 0,],
        [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 3, 3, 1, 3, 3, 0, 3, 0, 3, 0,],
        [0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 2, 0, 1, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 3, 3, 0, 3, 3, 0, 3, 0, 3, 0,],
        [3, 2, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0,],
        [0, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0,],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 3, 0, 3, 0,],
        [0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0,],
        [0, 3, 0, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0,],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 3, 0, 3, 3, 3, 0, 0, 0, 0, 3, 0, 3, 2, 3, 0,],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0,],
        [0, 3, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 0, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
        [0, 0, 0, 3, 2, 2, 3, 3, 3, 3, 3, 0, 3, 3, 1, 3,],
        [0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 2, 0, 3, 0, 0, 0,],
        [0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 2, 0, 1, 0, 0, 0,],
        [0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 2, 0, 3, 0, 0, 0,],
        [3, 1, 3, 3, 1, 1, 3, 3, 1, 3, 3, 0, 3, 3, 1, 3,],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,],
        [0, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 3, 2, 3, 0, 0,],
        [0, 2, 0, 1, 0, 3, 3, 0, 3, 3, 2, 3, 0, 3, 3, 1,],
        [0, 3, 3, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 3, 1, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 3, 0,],
        [0, 3, 0, 3, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 2, 0,],
        [0, 3, 2, 3, 0, 0, 3, 2, 3, 0, 0, 3, 0, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0,],
        [0, 0, 3, 3, 0, 1, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0,],
        [0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0,],
        [0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0,],
        [2, 3, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 3, 2,],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0,],
        [1, 3, 2, 3, 1, 3, 0, 0, 0, 0, 3, 1, 3, 2, 3, 1,],
        [0, 0, 0, 0, 0, 3, 0, 2, 2, 0, 3, 0, 0, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
        [2, 1, 2, 3, 3, 3, 2, 1, 1, 2, 3, 3, 3, 2, 1, 2,],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,],
        [2, 1, 2, 3, 3, 3, 2, 1, 1, 2, 3, 3, 3, 2, 1, 2,],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
    ],
    [
        [0, 0, 0, 0, 0, 1, 0, 2, 2, 0, 1, 0, 0, 0, 0, 0,],
        [0, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0,],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 3, 3, 0,],
        [0, 3, 3, 0, 2, 0, 0, 3, 3, 0, 0, 2, 0, 0, 0, 0,],
        [0, 3, 0, 0, 2, 0, 3, 0, 0, 3, 0, 2, 0, 0, 3, 0,],
        [0, 0, 0, 0, 3, 0, 1, 0, 0, 3, 0, 3, 0, 3, 3, 0,],
        [0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0,],
        [0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 3, 3, 0,],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,],
    ],
]

/*function generate() {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 16; x++) {
            maps[0][y][x] = Math.floor(Math.random() * 4);
        }
    }
    maps[0][4][7] = 0;
    maps[0][4][8] = 0;
}

generate();*/

let map = maps[Math.floor(Math.random() * maps.length)];

function newmap() {
    let oldMap = map;
    let choice = Math.floor(Math.random() * maps.length)
    map = maps[choice];
    while (oldMap == map) map = maps[Math.floor(Math.random() * maps.length)];
    broadcast(JSON.stringify(["message", "Server", `Changing map.`]));
    broadcast(JSON.stringify(["notification", "Changing map."]));
    broadcast(JSON.stringify(["map", map]));
    for (let i = 0; i < Object.keys(players).length; i++) {
        let [randomX,randomY] = [Math.floor(Math.random() * 143)+561, Math.floor(Math.random() * 63)+321];
        Object.keys(players)[i].x = randomX;
        Object.keys(players)[i].y = randomY;
        Object.keys(players)[i].prevX = randomX;
        Object.keys(players)[i].prevY = randomY;
        //console.log(Object.keys(players)[i]);
        broadcast(JSON.stringify(["move", Object.keys(players)[i], randomX, randomY]));
    }
    resetNPC = true;
}

let players = {};
let totalCount = 0;
let respawnEnabled = true;
let adminPassword = "70f3e3f3f7fcc05733e76f70fc7c3755235939606d";
let modPassword = "a0c3b43b4b9239b92c99ae2e4c10";
let maxUsername = 20;
let resetNPC = false;

const colors = {
    red: "#FF6969",
    green: "#69AA69",
    blue: "#3369FF",
    cyan: "#69FFFF",
    lime: "#69FF69",
    yellow: "#FFFF69",
    orange: "#FFAA69",
    purple: "#6969FF",
    pink: "#FF69FF",
    white: "#FFFFFF",
    black: "#000000",
    gray: "#AAAAAA",
    brown: "#AA6969",
    maroon: "#AA0000",
    indigo: "#0000AA",
    forest: "#006900",
}

let messages = [];

const uInt16 = (int) => {
    let bytes = [];
    bytes.push(int >> 8);
    bytes.push(int % 256);
    return bytes;
};

const n6 = (int) => {
    let bytes = [];
    bytes.push(int >> 8);
    bytes.push(int % 256);
    return bytes;
};

const bytes = string => {
    let bytes = [];
    for (let i = 0; i < string.length; i++) bytes.push(string.charCodeAt(i));
    return bytes;
}

http.on('request', app);

server.on('connection', c => {
    clients.push(c);
    totalCount++;
    log("IP HASH " + nenc3(c._socket.remoteAddress.substr(2)).slice(0, 6));
    let id = nenc3(totalCount + c._socket.remoteAddress.substr(2) + Math.floor(Math.abs(Date.now() / 47 - performance.now() * 84)) % 42042 + clients.length).slice(0, 6);
    //let _x = Math.floor(Math.random() * 1264);
    //let _y = Math.floor(Math.random() * 704);
    let [_x, _y] = [Math.floor(Math.random() * 143)+561, Math.floor(Math.random() * 63)+321];
    let motd = motds[Math.floor(Math.random() * motds.length)];
    let randomColor = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
    players[id] = {x: _x, y: _y, prevX: _x, prevY: _y, color: randomColor, moved: Math.round(performance.now()), mod: false, admin: false};
    log(`${id} connected`);
    c.send(JSON.stringify(["id", id]));
    c.send(JSON.stringify(["time", Math.floor(performance.now())]));
    c.send(JSON.stringify(["ping"]));
    //c.send(JSON.stringify(["motd", motds[Math.floor(Math.random() * motds.length)]]));
    c.send(JSON.stringify(["map", map]));

    //c.send(JSON.stringify(["message", "Server", `Welcome to Balls Online! Version: ${version}`]));
    //c.send(JSON.stringify(["message", "Server", `There ${(Object.keys(players).length == 1) ? "is" : "are"} ${Object.keys(players).length} ${(Object.keys(players).length == 1) ? "player" : "players"} online.`]));
    c.send(JSON.stringify(["message", "Server", `Welcome to Balls Online! There ${(Object.keys(players).length == 1) ? "is" : "are"} ${Object.keys(players).length} ${(Object.keys(players).length == 1) ? "player" : "players"} online.`]));
    c.send(JSON.stringify(["message", "MOTD", motd]));
    c.send(JSON.stringify(["notification", "Welcome to the server."]));

    // Spawn all players on the server for the client (except client player)
    for (let i = 0; i < Object.keys(players).length; i++) {
        let player = players[Object.keys(players)[i]];
        if (Object.keys(players)[i] != id) {
            c.send(JSON.stringify(["spawn", Object.keys(players)[i], player.x, player.y, colors[player.color]]));
            //c.send(JSON.stringify(["message", "Server", `${id} joined`]));
        }
    }

    broadcastExceptClient(c, JSON.stringify(["message", "Server", `${id} joined`]));

    // Spawn client for everyone
    broadcast(JSON.stringify(["spawn", id, players[id].x, players[id].y, colors[players[id].color]]));

    let snapping = false;

    c.on('message', msg => {
        //log(`${id} - ${msg}`);
        let data;
        try {
            data = JSON.parse(msg);
        } catch (e) {
            log(e);
            data = ["none"];
        }
        switch (data[0]) {
            case "move":
                let player = players[id];

                //if (player.moved + 50 <= Math.round(performance.now())) {
                    /*let [
                        nowX, 
                        nowY
                    ] = [
                        Math.abs(players[id].prevX - data[1]) <= 20 ? clamp(Math.floor(data[1]), 0, 1280 - 16) : players[id].prevX,
                        Math.abs(players[id].prevY - data[2]) <= 20 ? clamp(Math.floor(data[2]), 0, 720 - 16) : players[id].prevY,
                    ]*/
                    
                    try {
                        let [
                            nowX, 
                            nowY
                        ] = [
                            Math.abs(players[id].prevX - data[1]) <= 20 ? clamp(Math.floor(data[1]), 0, 1280 - 16) : clamp(Math.floor(data[1]), 0, 1280 - 16),
                            Math.abs(players[id].prevY - data[2]) <= 20 ? clamp(Math.floor(data[2]), 0, 720 - 16) : clamp(Math.floor(data[2]), 0, 720 - 16),
                        ]
    
                        //console.log(Math.abs(players[id].prevX - data[1]), Math.abs(players[id].prevY - data[2]))
                        if (nowX !== players[id].prevX || nowY !== players[id].prevY) {
                            /*[players[id].prevX, players[id].prevY, /*players[id].moved] = [players[id].x, players[id].prevY, /*Math.round(performance.now())];*/
                            [players[id].prevX, players[id].prevY] = [players[id].x, players[id].y];
                            [players[id].x, players[id].y] = [nowX, nowY];
                            broadcastExceptClient(c, JSON.stringify(["move", id, players[id].x, players[id].y]));
                            // 0, 0 location lock: broadcast(JSON.stringify(["move", id, _x, _y]));
                        } else c.send(JSON.stringify(["move", id, players[id].x, players[id].y]));
                    } catch (e) {
                        log(`${id} is invalid. Is server overloaded?`);
                    }

                    
                    
                //}
                break;

            case "ping":
                c.send(JSON.stringify(["ping"]));
                break;

            case "message":
                log(`${id}: ${data[1]}`);
                if (data[1][0] === "/") {
                    let vars = data[1].slice(1, data[1].length).split(" ");
                    if (vars.length < 1) c.send(JSON.stringify(["message", "/", `Specify a command.`])); else {
                        switch (vars[0].toLowerCase()) {
                            case "cmds":
                            case "help":
                                if (vars[1] !== undefined) {
                                    switch (vars[1]) {
                                        case "cmds":
                                        case "help":
                                            c.send(JSON.stringify(["message", "/", `Lists all commands. Specify a command to get command usage.`]));
                                            break;

                                        case "name":
                                            c.send(JSON.stringify(["message", "/", `Changes player's name to the specified name if available. Max 20 chars.`]));
                                            break;

                                        case "color":
                                            c.send(JSON.stringify(["message", "/", `Colors player. Colors: red, green, blue, cyan, lime, yellow, orange, purple, pink...`]));
                                            c.send(JSON.stringify(["message", "/", `...white, black, gray, brown, maroon, indigo, forest`]));
                                            break;

                                        case "respawn":
                                            c.send(JSON.stringify(["message", "/", `Respawns player.`]));
                                            break;

                                        case "motd":
                                            c.send(JSON.stringify(["message", "/", `Says the MOTD.`]));
                                            break;

                                        case "restart":
                                            c.send(JSON.stringify(["message", "/", `Restarts server. Requires admin.`]));
                                            break;

                                        case "newmap":
                                            c.send(JSON.stringify(["message", "/", `Changes to a random map. Requires moderator.`]));
                                            break;

                                        case "notify":
                                            c.send(JSON.stringify(["message", "/", `Sends a global notification. Requires moderator.`]));
                                            break;

                                        case "admin":
                                            c.send(JSON.stringify(["message", "/", `Player becomes admin if correct password specified.`]));
                                            break;

                                        case "mod":
                                            c.send(JSON.stringify(["message", "/", `Player becomes moderator if correct password specified.`]));
                                            break;

                                        default:
                                            c.send(JSON.stringify(["message", "/", `This command does not exist or no usage is written for it.`]));
                                            break;
                                    }
                                } else c.send(JSON.stringify(["message", "/", `Commands: cmds, name, color, respawn, motd, restart, newmap, notify, admin, mod`]));
                                break;

                            case "name":
                                if (vars.length < 2) c.send(JSON.stringify(["message", "/", `Specify the name.`])); else {
                                    let newName = vars.slice(1).join(" ").slice(0, maxUsername).replace(regex, "").trim().toString();
                                    if (Object.keys(players).indexOf(newName) < 0) {
                                        if (newName.indexOf("Server") === 0 || 
                                            newName.indexOf("MOTD") === 0 ||
                                            newName === "" ||
                                            newName === "__proto__") c.send(JSON.stringify(["message", "/", `Hey, you can't just do that...`])); else {
                                            let tempPlayer = players[id];
                                            //delete players[id];
                                            let oldId = id;
                                            id = newName.toString();
                                            players[id.toString()] = {x: tempPlayer.x, y: tempPlayer.y, prevX: tempPlayer.prevX, prevY: tempPlayer.prevY, color: tempPlayer.color, moved: tempPlayer.moved, mod: tempPlayer.mod, admin: tempPlayer.admin};
                                            broadcast(JSON.stringify(["rename", oldId, id]));
                                            broadcastExceptClient(c, JSON.stringify(["message", "Server", `${oldId} changed their name to ${id}.`]))
                                            c.send(JSON.stringify(["message", "/", `Changed your name to ${id}.`]));
                                            log(`${oldId} to ${id}`);
                                            delete players[oldId];
                                        }
                                    } else c.send(JSON.stringify(["message", "/", `That name is already used.`]));
                                }
                                break;

                            case "color":
                                if (vars.length < 2) c.send(JSON.stringify(["message", "/", `Specify the color.`])); else {
                                    if (players[id].color !== vars[1]) {
                                        if (colors.hasOwnProperty(vars[1])) {
                                            players[id].color = vars[1];
                                            broadcast(JSON.stringify(["color", id, colors[vars[1]]]));

                                            //broadcastExceptClient(c, JSON.stringify(["message", "Server", `${id} changed their color to ${vars[1]}.`]));
                                            c.send(JSON.stringify(["message", "/", `Changed your color to ${vars[1]}.`]));

                                        } else c.send(JSON.stringify(["message", "/", `This color does not exist.`]));
                                    } else c.send(JSON.stringify(["message", "/", `You already have this color.`]));
                                }
                                break;
                            
                            case "respawn":
                                if (respawnEnabled) {
                                    players[id].x = _x;
                                    players[id].y = _y;
                                    players[id].prevX = _x;
                                    players[id].prevY = _y;
                                    broadcast(JSON.stringify(["move", id, players[id].x, players[id].y]));
                                    c.send(JSON.stringify(["message", "/", `Teleported you to spawn.`]));
                                } else c.send(JSON.stringify(["message", "/", `This command is disabled for now.`]));
                                break;

                            case "motd":
                                c.send(JSON.stringify(["message", "/", motd]));
                                break;

                            case "restart":
                                if (players[id].admin) {
                                    broadcast(JSON.stringify(["message", "Server", `Server is now restarting, please refresh.`]));
                                    broadcast(JSON.stringify(["notification", "Server is now restarting, please refresh."]));
                                    broadcast(JSON.stringify(["restart"]));
                                    process.exit(0);
                                } else c.send(JSON.stringify(["message", "/", `You are not an admin.`]));
                                break;

                            case "notify":
                                if (players[id].mod) {
                                    if (vars.length < 2) c.send(JSON.stringify(["message", "/", `Specify the message.`])); else {
                                        let message = vars.slice(1).join(" ");
                                        //c.send(JSON.stringify(["message", "/", `Sending notification.`]));
                                        broadcast(JSON.stringify(["message", "Server", message]));
                                        broadcast(JSON.stringify(["notification", message]));
                                    }
                                } else c.send(JSON.stringify(["message", "/", `You are not a moderator.`]));
                                break;

                            case "newmap":
                                if (players[id].mod) {
                                    newmap();
                                } else c.send(JSON.stringify(["message", "/", `You are not a moderator.`]));
                                break;

                            case "admin":
                                if (players[id].admin) c.send(JSON.stringify(["message", "/", `You are already an admin.`])); else {
                                    if (vars.length < 2) c.send(JSON.stringify(["message", "/", `Specify the password.`])); else {
                                        if (nenc3(vars[1]) == adminPassword) {
                                            players[id].mod = true;
                                            players[id].admin = true;
                                            c.send(JSON.stringify(["message", "/", `You are now an admin.`]))
                                            c.send(JSON.stringify(["notification", `You are now an admin.`]));
                                        }
                                    }
                                }
                                break;

                            case "mod":
                                if (players[id].mod) c.send(JSON.stringify(["message", "/", `You are already a moderator.`])); else {
                                    if (vars.length < 2) c.send(JSON.stringify(["message", "/", `Specify the password.`])); else {
                                        if (nenc3(vars[1]) == modPassword) {
                                            players[id].mod = true;
                                            c.send(JSON.stringify(["message", "/", `You are now a moderator.`]))
                                            c.send(JSON.stringify(["notification", `You are now a moderator.`]));
                                        }
                                    }
                                }
                                break;

                            case "snap":
                                // support drawing
                                if (snapping) c.send(JSON.stringify(["message", "/", `A snap of yours is already in progress.`])); else {
                                    snapping = true;
                                    c.send(JSON.stringify(["message", "/", `Snapping, hold on...`]));

                                    let pSnap = {
                                        player: id,
                                        version: version.replaceAll(".",""),
                                        players: players,
                                        messages: messages,
                                        description: "I don't know."
                                    };

                                    let buffer = [];

                                    buffer.push(...bytes("BM"), ...bytes(pSnap.version), ...bytes(pSnap.player), 0, ...bytes(pSnap.description), 0, ...bytes("PSTA"));

                                    for (let _player in pSnap.players) {
                                        buffer.push(...bytes(_player), 0, ...uInt16(pSnap.players[_player].x), ...uInt16(pSnap.players[_player].y));
                                    }

                                    buffer.push(...bytes("PEND"), ...bytes("MSTA"));
                                    for (let _msg of messages) buffer.push(...bytes(_msg[0]), 0, ...bytes(_msg[1]), 0);
                                    buffer.push(0, ...bytes("MEND"));
                                    for (let i = 0; i < 16; i++) {
                                        for (let j = 0; j < 9; j++) {
                                            buffer.push(map[j][i]);
                                        }
                                    }

                                    //console.log(Buffer.from(buffer));
                                    let mID = randomHex(12);
                                    fs.writeFileSync(`./memories/${mID}.bmr`, Buffer.from(buffer));
                                    console.log("Written as " + mID);
                                    snapping = false;
                                    c.send(JSON.stringify(["message", "/", `Snapped as ${mID}.`]));
                                    c.send(JSON.stringify(["snap", mID]));
                                }
                                break;

                            case "tp":
                                if (players[id].admin) {
                                    
                                } else c.send(JSON.stringify(["message", "/", `You are not an admin.`]));
                                break;

                            case "redirect":
                                if (players[id].admin) {
                                    broadcast(JSON.stringify(["redirect", vars[1]]));
                                } else c.send(JSON.stringify(["message", "/", `You are not an admin.`]));
                                break;

                            case "audio":
                                if (players[id].admin) {
                                    broadcast(JSON.stringify(["audio", vars[1]]));
                                } else c.send(JSON.stringify(["message", "/", `You are not an admin.`]));
                                break;

                            /*case "eval":
                                if (players[i].admin) {
                                    c.send(JSON.stringify(["message", ">", eval(vars.join(" "))]));
                                } else c.send(JSON.stringify(["message", "/", `You are not an admin.`]));
                                break;*/

                            default:
                                c.send(JSON.stringify(["message", "/", `This command does not exist.`]));
                                break;
                        }
                    }
                } else {
                    broadcast(JSON.stringify(["message", id, data[1].slice(0, (players[id].mod || players[id].admin) ? 128 : 64).toString()]));
                    messages.push([id, data[1].slice(0, (players[id].mod || players[id].admin) ? 128 : 64).toString()]);
                    if (messages.length > 8) messages.shift();
                }
                
                break;

            case "draw":
                //console.log(players[id].moved + 50, Math.round(performance.now()), players[id].moved + 50 <= Math.round(performance.now()))
                //if ((players[id].x !== players[id].prevX || players[id].y !== players[id].prevY) && players[id].moved + 50 <= Math.round(performance.now())) broadcast(JSON.stringify(["draw", players[id].x, players[id].y, colors[players[id].color]]));
                if (players[id].x !== players[id].prevX || players[id].y !== players[id].prevY) broadcast(JSON.stringify(["draw", players[id].x, players[id].y, colors[players[id].color]]));
                break;
        }
        //c.send("shut the fung");
    });

    c.on('close', () => {
        broadcast(JSON.stringify(["despawn", id]));
        delete players[id];
        clients.splice(clients.indexOf(c), 1);
        log(`${id} disconnected`);
        broadcast(JSON.stringify(["message", "Server", `${id} left`]));
    });

    c.onerror = () => {
        //clients.splice(clients.indexOf(c), 1);
        log("error");
    };
});

server.on('error', e => {
    log("An error has occured!");
});

players["NPC"] = {x: Math.floor((1280 - 16) / 2), y: Math.floor((720 - 16) / 2), color: "gray"};
let angle = 0;
let drawer = false;
setInterval(() => {
    let drawRandom = Math.floor(Math.random() * 21);
    if (drawRandom === 20) drawer = !drawer;

    let dir = Math.floor(Math.random() * 2);
    angle += (dir == 0) ? 0.1 : -0.1 % 360;

    let newX = Math.floor(7 * Math.sin(angle));
    let newY = Math.floor(7 * Math.cos(angle));

    if (resetNPC) [players["NPC"].x, players["NPC"].y, resetNPC] = [Math.floor(Math.random() * 143)+561,Math.floor(Math.random() * 63)+321, false];

    let touchedX = false;
    let touchedY = false;

    if (players["NPC"].x !== players["NPC"].prevX) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 16; j++) {
                if (map[i][j] >= 2 && !touchedX) {
                    touchedX =  players["NPC"].x + newX < j * 80 + 80 &&
                                players["NPC"].x + newX + 16 > j * 80 &&
                                players["NPC"].y < i * 80 + 80 &&
                                players["NPC"].y + 16 > i * 80
                    ;
                }
            }
        }
    }
    
    if (players["NPC"].y !== players["NPC"].prevY) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 16; j++) {
                if (map[i][j] >= 2 && !touchedY) {
                    touchedY =  players["NPC"].x < j * 80 + 80 &&
                                players["NPC"].x + 16 > j * 80 &&
                                players["NPC"].y + newY < i * 80 + 80 &&
                                players["NPC"].y + newY + 16 > i * 80
                    ;
                }
            }
        }
    }

    if (players["NPC"].x + newX > 0 && players["NPC"].x + newX < 1280 - 16 && !touchedX) players["NPC"].x += newX; else angle = +(angle - 180);
    if (players["NPC"].y + newY > 0 && players["NPC"].y + newY < 720 - 16 && !touchedY) players["NPC"].y += newY; else angle = +(angle - 180);

    broadcast(JSON.stringify(["move", "NPC", players["NPC"].x, players["NPC"].y]));

    if (drawer) broadcast(JSON.stringify(["draw", players["NPC"].x, players["NPC"].y, colors[players["NPC"].color]]));

    if (Math.floor(Math.random() * 2022) == 42) broadcast(JSON.stringify(["message", "NPC", npcMsgs[Math.floor(Math.random() * npcMsgs.length)]]));
}, 50);

setInterval(() => {
    newmap();
}, 60000 * 5);

http.listen(_port, () => {
    console.log("listening");
});