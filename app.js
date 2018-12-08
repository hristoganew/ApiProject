const express = require("express");
const mysql = require("mysql");

const api = express();
const playerRoutes = require('./routes/playerRoutes')
api.use(playerRoutes);

api.listen(3000, () => {
    console.log('Api running...');
})
