module.exports = async function (context, req) {

    const { ObjectId } = require('mongodb');
    if(process.env.NODE_ENV === 'development') var env = require('dotenv').config();
    var MongoClient = require('mongodb').MongoClient;
    
    var uri = process.env.COSMOSDB_CONNECTION_STRING;
    var dbName = process.env.COSMOSDB_DB_NAME;
    var colName = process.env.COSMOSDB_COLLECTION_NAME;

    const CId = req.body && req.body.CId;
    console.log("CId", CId);
    if(!CId) context.res = { status: 400 };

    let client;
    try {
        client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const db = client.db(dbName);
        const collection = db.collection(colName);
        const docs = await collection.find({CId:CId}).toArray();
        if (docs.length > 0) {
            context.res = { headers: { 'content-type': 'application/json' }, body: docs };
        } else {
            context.res = { status: 404 };
        }
        context.done();
    } catch (err) {
        context.log(err);
        context.res.status(500).send();
        context.done();
    } finally {
        if (client) client.close();
    }

}