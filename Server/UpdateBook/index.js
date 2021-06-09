module.exports = async function (context, req) {

    const { ObjectId } = require('mongodb');
    if(process.env.NODE_ENV === 'development') var env = require('dotenv').config();
    var MongoClient = require('mongodb').MongoClient;
    
    var uri = process.env.COSMOSDB_CONNECTION_STRING;
    var dbName = process.env.COSMOSDB_DB_NAME;
    var colName = process.env.COSMOSDB_COLLECTION_NAME;

    let updateObj, docId;
    
    if(req.body && req.body._id){
        docId = req.body._id;
        updateObj = req.body;
        delete updateObj._id;
        var now  = new Date();
        updateObj["updateDate"] = now;
        // context.log("updateObj: ", updateObj)
    } else {
        context.res = { status: 400 };
        context.log(req.body);
        context.done();
    }

    let client;
    try {
        client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const db = client.db(dbName);
        const collection = db.collection(colName);
        await collection.updateOne( { _id: ObjectId(docId) }, { $set: updateObj } );
        context.res = { status: 200 };   
    } catch (err) {
        context.log(err);
        context.res = { status: 500 };
    } finally {
        if (client) client.close();
        context.done();
    }
}