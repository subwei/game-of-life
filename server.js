'use strict';

// Setting up Express
var express = require('express')
	, app = express()
	, port = process.env.PORT || 8000;

// 
app.use('/public', express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', function (req, res) {
	res.sendfile('views/index.html', {'root': './public/'});
});


var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});