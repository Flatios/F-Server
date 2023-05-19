const path = require('path');
const fs = require('fs');

const APIs = require('./APIs');


function main (app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.get('/api', (req, res) => {

        var FKEY = process.env.FKEY
        var fkey = req.query.fkey;

        if (fkey === FKEY) {
            var api = req.query.api;
            let local = false


            if (api == 'FAI') {local = true; fs.readFile('Src/JSON/FAI.json', 'utf8', (err, data) => {if (err) {console.error('Error reading JSON file:', err);return res.status(404).send('Error reading JSON file');}const jsonData = JSON.parse(data);res.json(jsonData);});}
            if (api === 'FAPI') {local = true;fs.readFile('Src/JSON/TextAPI.json', 'utf8', (err, data) => {if (err) {console.error('Error reading JSON file:', err);return res.status(404).send('Error reading JSON file');}const jsonData = JSON.parse(data);res.json(jsonData);});}   
    
    
            if (local === false)
             {
                var city = req.query.city; var town = req.query.town;
                APIs(req, res, app, api, city, town, local)
             }
        }






    })}




module.exports = main;