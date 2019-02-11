/**
 * http://usejsdoc.org/
 */
// Setup basic express server
var express = require('express');
var app = express();
//var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3001;

server.listen(port);
console.log('Server listening at port %d', port);

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	console.log('Socket connected...');
	
	//send message
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data});
	});
});