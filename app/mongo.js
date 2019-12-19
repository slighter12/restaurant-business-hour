const MongoClient = require('mongodb').MongoClient,
    dburi = process.env.MONGODB_URI;

async function upsertDb(key, data, dbName) {
    let client;
    let url = `${dburi}/'${dbName}'`;
    try {
        client = await MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db();
        let mongoOps = [{
            updateOne: {
                filter: key,
                update: data,
                upsert: true
            }
        }];
        db.collection(dbName).bulkWrite(mongoOps, err => { if (err) throw err });
    } catch (err) {
        console.log(err.stack);
    }
    if (client) {
        await client.close();
    }
}

