const http = require('http');
const socketio = require('socket.io');

const server = http.createServer();

const io = socketio(server);

io.on('connection', socket => {
    console.log('New connection');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));