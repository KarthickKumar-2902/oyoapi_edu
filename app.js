let express = require('express');
let app = express();
let Mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect,getData,postData,updateData,deleteData} = require('./Controller/dbController')
let port = process.env.PORT || 2126;

///MIDLE WARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get('/user',async(req,res) => {
    let query = {};
    let collection = "user"
    let output = await getData(collection,query)
    res.send(output);
})

app.get('/',(req,res) => {
    res.send("Hiii from Express in OYO");
})

app.get('/location', async(req,res) => {
    let query = {};
    let collection = "location"
    let output = await getData(collection,query)
    res.send(output)
})

app.get('/rooms', async(req,res) => {
    let query = {}
    if(req.query.stateId && req.query.mealId)
    {
        query = {state_id: Number(req.query.stateId),"mealTypes.mealtype_id": Number(req.query.mealId)}

    }
    else if(req.query.stateId){
        query = {state_id: Number(req.query.stateId)}
    }
    else if(req.query.meaId)
    {
        query = {"mealTypes.meal_id": Number(req.query.mealId)}
    }
    else{
        query = {}
    }
    let collection = "rooms"
    let output = await getData(collection,query)
    res.send(output)
})
app.get('/filter/:mealId', async(req,res) => {
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId)
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    if(cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    } else if(lcost && hcost){
        query = {
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else{
        query = {}
    }
    let collection = "rooms";
    let output = await getData(collection,query);
    res.send(output)
})
// details
app.get('/details/:id', async(req,res) => {
    let id = new Mongo.ObjectId(req.params.id)
    let query = {_id:id}
    let collection = "rooms";
    let output = await getData(collection,query);
    res.send(output)
})
//Bookings
app.get('/bookings', async(req,res) => {
    let query = {};
       if(req.query.email){
           query={email:req.query.email}
       }else{
           query = {}
    }
    let collection = "bookings"
    let output = await getData(collection,query)
    res.send(output)
})

//place Bookings
app.post('/placebooking',async(req,res) => {
    let data = req.body
    let collection = "bookings"
    let response = await postData(collection,data)
    res.send(response)
})

//UPDATE BOOKINGS
app.put('/updateBookings',async(req,res) => {
    let collection = 'bookings';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateData(collection,condition,data)
    res.send(output)
})

//deletebookings
app.delete('/deleteBooking',async(req,res) => {
    let collection = 'bookings';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteData(collection,condition)
    res.send(output)
})
app.listen(port,(err) => {
    dbConnect()
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
