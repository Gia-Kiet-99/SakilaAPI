const WebSocket = require('ws');

const WS_PORT = 45678;


let socketServer;
if (!socketServer) {
  socketServer = new WebSocket.Server({
    port: WS_PORT
  });

  socketServer.on('connection', (client) => {
    console.log("Client connects successfully!");

    client.onmessage = function () {
      
    }
  });

  console.log(`WebSocket server is running at port ${WS_PORT}`);
}