const express = require("express");
const mysql = require("mysql");

const api = express();
const playerRoutes = require('./routes/playerRoutes');

var bodyParser = require('body-parser')
api.use( bodyParser.json());
api.use(bodyParser.urlencoded({    
  extended: true
})); 

api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

api.use(playerRoutes);

api.listen(3000, () => {
    console.log('Api running...');
})
