//Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'comments'
});
connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/getcomments', function(req, res) {
	connection.query('SELECT * from comments', function(err, rows, fields) {
		if (!err) {
			res.send(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});