const express = require("express");

const api = express();

api.listen(3000, () => {
    console.log('test');
})

api.get('/', (req, res) => {
    console.log('getTest');
    res.send('Hello World');
})