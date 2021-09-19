const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
var user = require('./routes/users.js');
const port = process.env.PORT || 4200;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/profileCompare'));

app.listen(port, function () {
    console.log("Server running");
});

app.use('/', user); //mongo operations belong here!
app.get('*', function(req,res,next){
    res.send(path.join(__dirname + '/dist/profileCompare/index.html'));
});