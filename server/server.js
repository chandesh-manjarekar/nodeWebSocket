const WebSocket = require('ws');

// Create Web socket server on provided port
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 })


/* WebSocket Server Connection */
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  })
  ws.send('Hello! Message From Server!!')
})