const router = require('express').Router();
//const MongoClient = require('mongodb').MongoClient,
//    dburi = process.env.MONGODB_URI;

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;
