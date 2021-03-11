const http = require('http');
const socketio = require('socket.io');

const server = http.createServer();

const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    socket.on('draw', data => {
        socket.broadcast.emit('draw', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));