//crud operations

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database", error);
    }
    const db = client.db(database);
    db.collection('users').insertMany([
        {
            name : 'kiran',
            age :12
        },
        {
            name : 'manik',
            age : 27
        }
    ],(error,result)=>{
        if(error){
            return console.log("Not able to insert documents");
        }
        console.log(result.ops);
    })
})
