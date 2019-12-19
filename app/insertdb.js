const fs = require('fs');
const csv = require('csv-parse');
//const MongoClient = require('mongodb').MongoClient,
//    dburi = process.env.MONGODB_URI;
let restaurantinfo = [];

fs.createReadStream('./app/restaurantopeningtime.csv')
    .pipe(csv())
    .on('data', (row) => {
        restaurantinfo.push(row);
    })
    .on('end', ()=>{
        console.log(restaurantinfo)
    });
