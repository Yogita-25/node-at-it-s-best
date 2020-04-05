//crud operations

const { MongoClient, ObjectId } = require('mongodb');;

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

const id = new ObjectId();

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database", error);
    }
    const db = client.db(database);

    db.collection('users').updateOne({
        _id: new ObjectId('5e88c1629e765f0248aeaff5')
    }, {
        $inc: {age:1}
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

    db.collection('tasks').updateMany({
        completed : true
    },{
        $set :{
            completed : false
        }
    }).then((result)=>{
        console.log("Result ==>",result.modifiedCount);
    }).catch((error)=>{
        console.log("Error==>",error);
    });
})
