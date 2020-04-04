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

    db.collection('tasks').findOne({ _id: new ObjectId('5e88c29c90ad2225904e6497') }, (error, task) => {
        if (error) {
            return console.log("Unable to read task");
        }
        console.log(task);
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks)=> {
        console.log("====not completed",tasks);
    })
})
