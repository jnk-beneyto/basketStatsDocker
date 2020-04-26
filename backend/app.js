'use strict'

const bodyParser = require('body-parser');
var express = require('express');
var controllers = require('./controllers/resultados');
var app = express();
const cors = require('cors');




//middlewares
app.use(cors());

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({
  urlencoded: false
}));
app.use(bodyParser.json());

//routes
app.get('/getTeams/*', controllers.getTeams);
app.get('/getResults/*', controllers.getResults);


// start app on localhost port 3000
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});