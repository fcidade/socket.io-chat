const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('chat message', msg => {
        console.log('msg', msg)
        io.sockets.emit('chat message', msg);
    });
});


http.listen(3000, () => {
    console.log('listening on port 3000');
});
