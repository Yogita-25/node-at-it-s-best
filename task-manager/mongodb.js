//crud operations

const { MongoClient, ObjectId } = require('mongodb');;

const connectionURL = process.env.MONGODB_URL;
const database = 'task-manager';

require('./config/dev.env')

const id = new ObjectId();

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database", error);
    }
    const db = client.db(database);

})
