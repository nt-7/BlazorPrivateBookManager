module.exports = async function (context, req) {

    const { ObjectId } = require('mongodb');
    if(process.env.NODE_ENV === 'development') var env = require('dotenv').config();
    var MongoClient = require('mongodb').MongoClient;
    
    var uri = process.env.COSMOSDB_CONNECTION_STRING;
    var dbName = process.env.COSMOSDB_DB_NAME;
    var colName = process.env.COSMOSDB_COLLECTION_NAME;

    let insertObj;

    if(req.body && req.body.CId && req.body.title && req.body.isbn10){
        insertObj = req.body;
        var now  = new Date();
        insertObj = req.body;
        insertObj["createDate"] = now;
        insertObj["updateDate"] = now;
        context.log("NOW : ", insertObj["createDate"], insertObj["updateDate"], now);
        // context.log("insertObj: ", insertObj)
    } else {
        context.log(req.body);
        context.res = { status: 400 };
        context.done();
    }

    let client;
    try {
        client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const db = client.db(dbName);
        const collection = db.collection(colName);
        const result = await collection.insertOne(insertObj);
        context.res = { status: 200, body: { _id: result.insertedId } };
    } catch (err) {
        context.log(err);
        context.res = { status: 500 };
    } finally {
        if (client) client.close();
        context.done();
    }
}