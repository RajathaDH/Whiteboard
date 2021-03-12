const http = require('http');
const socketio = require('socket.io');

const server = http.createServer();

const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    const { username, room } = socket.handshake.query;

    socket.join(room);

    socket.on('draw', data => {
        socket.to(room).emit('draw', data); // send to all clients in room except sender
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));