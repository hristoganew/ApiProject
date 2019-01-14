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
    let queryString = 'SELECT * FROM players';
    
    if(req.query.o){
        queryString += ' ORDER BY ' + req.query.o;

        if(req.query.ot){
            queryString += ' ' + req.query.ot;
        }
    }

    getConenction().query(queryString,(err, rows, fields)=>{
        if (err) {
            console.log('Ran into an error' + err);
            res.sendStatus(500);
            return;
        }

        res.json(rows);
    });
});

//fetch player by id
router.get('/players/:id', (req, res) => {
    let id = req.params.id;
    if(id){
        getConenction().query('SELECT * FROM players WHERE id=?', [id] ,(err, rows, fields)=>{
            if (err) {
                console.log('Ran into an error' + err);
                res.sendStatus(500);
                return;
            }
    
            res.json(rows);
        });
    }
    
});

//create player
router.post('/player', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let team = req.body.team;

        let queryString = 'INSERT INTO players(first_name, last_name, team) VALUES (\''+ firstName +'\', \''+ lastName +'\', \''+ team +'\')';
        console.log(queryString);
        getConenction().query(queryString, (err, rows, fields) => {
            if (err) {
                console.log('Ran into an error' + err);
                res.sendStatus(500);
                return;
            }
    
            res.send('Patient Added');
        });
});

//edit player
router.post('/player/:id', (req, res) => {
    
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

//delete player by id
router.delete('/player/:id', (req, res) => {
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
