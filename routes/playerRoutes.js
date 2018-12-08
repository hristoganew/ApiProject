const express = require('express');
const parser = require('body-parser')
const mysql = require('mysql');

const router = express.Router();

//Establish DB connection pool
function getConenction(){
    return mysql.createPool({
        host: 'localhost',
        user: 'root',
        database:'api',
        connectionLimit: 10
    });
}

//fetch all players
router.get('/players', (req, res) => {
    
    getConenction().query('SELECT * FROM players',(err, rows, fields)=>{
        if (err) {
            console.log('Ran into an error' + err);
            res.sendStatus(500);
            return;
        }

        res.json(rows);
    });
});

//fetch player by id
router.get('/player/:id?o=:order', (req, res) => {
    let id = req.params.id;
    let order = req.params.order;
    if(id){
        getConenction().query('SELECT * FROM players WHERE id=?', [id] ,(err, rows, fields)=>{
            if (errs) {
                console.log('Ran into an error' + errs);
                res.sendStatus(500);
                return;
            }
    
            res.json(rows);
        });
    }
    
});

//create player
router.post('/player', (req, res) => {
    console.log(req.body);

    // if(id){
    //     let queryString = 'INSERT INTO players() VALUES (value1, value2, value3, ...)';
    //     getConenction().query(queryString, [id] ,(err, rows, fields)=>{
    //         if (errs) {
    //             console.log('Ran into an error' + errs);
    //             res.sendStatus(500);
    //             return;
    //         }
    
    //         res.json(rows);
    //     });
    // }
    
});

//edit player
router.post('/player/:id', (req, res) => {
    console.log(req.body);
    let id = req.params.id;
    // if(id){
    //     let queryString = 'UPDATE players SET ? = ? WHERE id = ?';
    //     getConenction().query(queryString, [id] ,(err, rows, fields)=>{
    //         if (errs) {
    //             console.log('Ran into an error' + errs);
    //             res.sendStatus(500);
    //             return;
    //         }
    
    //         res.json(rows);
    //     });
    // }
    
});

module.exports = router
