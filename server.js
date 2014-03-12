'use strict';

var express = require('express')
	, app = express()
	, port = process.env.PORT || 8000;

// Configuration
app.use('/public', express.static(__dirname + '/public'));
app.use(express.bodyParser());

// Routes
app.get('/', function (req, res) {
	res.sendfile('views/index.html', {'root': './public/'});
});

// Start server
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});