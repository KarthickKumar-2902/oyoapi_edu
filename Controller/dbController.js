let mongo = require('mongodb');
let {mongoClient}= require('mongodb');
let mongoUrl= "mongodb+srv://karthickoyoProject:eXWfREpVReCZirQV@cluster0.7ptnlgw.mongodb.net/?retryWrites=true&w=majority";
/*let mongoUrl= "mongodb://127.0.0.1:27017";*/

let client = new mongo.MongoClient(mongoUrl);

async function dbConnect(){
    await client.connect()
}


let db = client.db('oyoProject');

async function getData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    } catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output
}

async function postData(colName,data){
    let output;
    try{
        await db.collection(colName).insertOne(data)
        output = {"response":"Booking placed"}
    }
    catch(err)
    {
        output = {"response":"Error in post data "};
    }
    return output
}

async function updateData(colName,condition,data){
    let output;
    try{
        await db.collection(colName).updateOne(condition,data)

    }
    catch(err)
    {
        output = {"response":"Error in update data"};
    }
    return output
}

async function deleteData(colName,condition){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition)
    } catch(err){
        output = {"response":"Error in delete data"}
    }
    return output
}

module.exports = {
    dbConnect,
    db,
    getData,
    postData,
    updateData,
    deleteData   
}