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

   db.collection('users').deleteMany({
       age : 22
   }).then((result)=>{
       console.log(result.deletedCount);
   }).catch((error)=>{
       console.log(error);
   })

   db.collection('tasks').deleteOne({
    description :'Blockchain'
   }).then((result)=>{
       console.log(result.deletedCount);
   }).catch((error)=>{
       console.log(error);
   })
})
