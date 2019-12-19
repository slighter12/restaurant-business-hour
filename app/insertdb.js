const router = require('express').Router();
const fs = require('fs');
const csv = require('csv-parse');
//const MongoClient = require('mongodb').MongoClient,
//    dburi = process.env.MONGODB_URI;

router.post('/', (req, res) => {
    console.log(req.body);
});
let restaurantinfo = [];

fs.createReadStream('./app/restaurantopeningtime.csv')
    .pipe(csv())
    .on('data', (row) => {
        restaurantinfo.push(row);
    })
    .on('end', ()=>{
        console.log(restaurantinfo)
    });
module.exports = router;