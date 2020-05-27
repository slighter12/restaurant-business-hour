//data need to update to MongoDB, todo merge to mongo.js
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
//const MongoClient = require('mongodb').MongoClient,
//    dburi = process.env.MONGODB_URI;
const DIST_DIR = __dirname
let rawdata = fs.readFileSync(path.join(DIST_DIR, 'restaurants.json'));
const restaurantDB = JSON.parse(rawdata);
rawdata = fs.readFileSync(path.join(DIST_DIR, 'closed.json'));
const closetime = JSON.parse(rawdata);

router.post('/', (req, res) => {
    let data = req.body;
    let dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = new Date(data.date);
    let time = data.time;
    let weekday = dayArr[ day.getDay()];
    const openrestaurant = Object.keys(restaurantDB).filter( name => {
        if (!closetime[weekday].includes(name)) {
            let [open, close] = restaurantDB[name][weekday].split('-');
            if (close < open) {
                let [hr, min] = close.split(':');
                close = 24 + parseInt(hr) + ':' + min;
            }
            if (open < time && time < close) {
                return name
            }
        }
    });
    let restaurant = {};
    openrestaurant.forEach( name => restaurant[name]= restaurantDB[name][weekday])
    res.json(restaurant);
});

module.exports = router;
