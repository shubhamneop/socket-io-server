const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;
let interval1;

io.on("connection", (socket) => {
    console.log(`New client connected`);
    if(interval) {
        clearInterval(interval);
    }
    if(interval1) {
        clearInterval(interval1);
    }
    interval1 = setInterval(() => testEmit(socket), 1000);
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
        clearInterval(interval1);
    });

    socket.on("Test", (res) => {
        io.emit("Test", res);
    });

    socket.on('join', (room) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
     });

    socket.on('chat', (data) => {
        const { message, room } = data;
        console.log(`msg: ${message}, room: ${room}`);
        io.to(room).emit('chat', message);
     });

    

});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

const testEmit = socket => {
    const data = "Welcome";
    socket.emit("someEvent", data);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

