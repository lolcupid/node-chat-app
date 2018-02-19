const path      = require("path");
const express = require("express");
const app = express();

var {generateMsg, generateLocationMsg} = require('./utils/message');
var publicPath = path.join(__dirname, '../public');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log("New user is connected");

    socket.emit('serverMsg', generateMsg("Admin", "Welcome to our chat room"));

    socket.broadcast.emit('serverMsg', generateMsg("Admin", "New user joined"));

    socket.on('clientMsg', function (newMsg, callback) {
        console.log(newMsg);
        io.emit('serverMsg', generateMsg(newMsg.from, newMsg.text));
        callback();
    });

    socket.on('locationMsg', function (location) {
        io.emit('serverLocationMsg', generateLocationMsg('Admin', location.latitude, location.longitude));
    });

    socket.on('disconnect', function(){
        console.log("Client is disconnected");
    });
});





server.listen(3000, () => {
    console.log("Server is running at 3000");
});