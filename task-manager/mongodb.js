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
    db.collection('users').findOne({ _id: new ObjectId('5e88c0dcea8a333cbce3079d') }, (error, user) => {
        if (error) {
           return console.log("Unable to read user");
        }
        console.log(user);
    });

    db.collection('users').find({age : 22}).toArray((error,user)=>{   //find() does not have callback function
        if(error){
            return console.log("Unable to read user");
        }
        console.log(user);
    });

    db.collection('users').find({age : 27}).count((error,count)=>{   //find() does not have callback function
        if(error){
            return console.log("Unable to count users");
        }
        console.log(count);
    });

})
