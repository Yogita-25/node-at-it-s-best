//crud operations

const { MongoClient, ObjectId } = require('mongodb');;

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

const id = new ObjectId();  
console.log(id.id.length);              //12
console.log(id.toHexString().length);   //24

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database", error);
    }
    const db = client.db(database);
    // db.collection('users').insertOne(
    //     {
            
    //         name : 'kiran',
    //         age :12
    //     }
    // ,(error,result)=>{
    //     if(error){
    //         return console.log("Not able to insert documents");
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Learning node from beginning',
    //         completed: false
    //     },
    //     {
    //         description: "Complete Git",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Not able to insert documents");
    //     }
    //     console.log(result.ops);
    // })
})
