var express = require('express');
var app = express();

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000, function(){
	console.log('Front-end listiening on port', server.address().port);
});