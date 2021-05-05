const WebSocket = require('ws');

const WS_PORT = 45678;


let socketServer;
if (!socketServer) {
  socketServer = new WebSocket.Server({
    port: WS_PORT
  });

  socketServer.on('connection', (client) => {
    console.log("Client connects successfully!");

    client.onmessage = function (message) {
      console.log(message);
    }
  });

  console.log(`WebSocket server is running at port ${WS_PORT}`);
}

function broadcastAll(message) {
  for (const client of socketServer.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

module.exports = {
  broadcastAll
}