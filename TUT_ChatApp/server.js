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
var usernames = [];

server.listen(port);
console.log('Server listening at port %d', port);

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	console.log('Socket connected...');

	//new user
	socket.on('new user', function(data, callback){
		if(usernames.indexOf(data) != -1){
			callback(false);
		}else{
			callback(true);
			socket.username = data;
			
			console.log('übergebener Username:'+socket.username);
			
			usernames.push(socket.username);
			updateUsernames();
		}
	});
	
	//update Usernames
	function updateUsernames(){
		io.sockets.emit('usernames', usernames);
	}
	
	//send message
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data});
	});
	
	//Disconnect
	socket.on('disconnect', function(data){
		if(!socket.username){
			return;
		}
		
		usernames.splice(usernames.indexOf(socket.username), 1);
		updateUsernames();
	});
});