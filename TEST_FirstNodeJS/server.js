/**
 * http://usejsdoc.org/
 * 
 * inspred by:
 * https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
 * https://www.guru99.com/node-js-mongodb.html
 */

/*
var http = require(http");
var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end("Hallo Jan");
	
	console.log("Logging is important"); 
	
}).listen(8888);
*/

//retrieve
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/EmployeeDB';

//connect
MongoClient.connect(url, function(err, db){
	if(!err){ console.log('We are connected'); }
	else{ console.log('Failure'); }
	
	var cursor = db.collection('Employee').find();
	cursor.each(function(err, doc){
		console.log(doc);
	});
	
	
	db.close();
	
	
});