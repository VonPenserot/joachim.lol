const express = require('express');
const server = require('http').createServer();

const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});


server.on('request', app);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/**
 * Begin the websocket connection
 */

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ server });

wss.on('connection', function connection (ws) {
    const numClients = wss.clients.size;
    console.log(`${numClients} clients connected`);

    wss.broadcast(`Currently connected clients: ${numClients}`);

    if (ws.readyState === ws.OPEN) {
        ws.send(`Welcome to the server! There are ${numClients} clients connected.`);
    }

    ws.on('close', function close () {
        const numClients = wss.clients.size;
        console.log(`${numClients} clients connected`);

        wss.broadcast(`Currently connected clients: ${numClients}`);
        console.log(`Client disconnected: ${ws.url}`);
    });
});

wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
        client.send(data);
    });
};