const fs = require('fs');
const csv = require('csv-parse');

let restaurantInfo = [];
const csvRoot = './app/restaurantopeningtime.csv';
const jsonRoot = './app/'
fs.createReadStream(csvRoot)
    .pipe(csv())
    .on('data', (row) => {
        restaurantInfo.push(row);
    })
    .on('end', () => {
        let restaurants = {};
        let keys = restaurantInfo[0];
        if (keys[0] === '') keys.splice(0,1);
        let closed = Object.assign( ...keys.map((k) => ({[k]:[]})))
        for (let col = 1; col < restaurantInfo.length; col++) {
            let Information = restaurantInfo[col];
            let name = Information.splice(0,1);
            restaurants[name] = Object.assign( ...keys.map((k,i) => ({[k]:Information[i]})));
            Information.map((k,i) => {if (k === 'Closed') closed[keys[i]].push(...name)});
        }
        fs.writeFileSync(`${jsonRoot}restaurants.json`, JSON.stringify(restaurants, null, 2))
        fs.writeFileSync(`${jsonRoot}closed.json`, JSON.stringify(closed, null, 2))
        //console.log(closed)
    });
