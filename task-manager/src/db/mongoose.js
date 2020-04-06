const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, useCreateIndex: true            //to create index to access data faster
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

// const newUser = new User({
//     name: 'Manik',
//     age: 'Malhotra'
// });

// newUser.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log('Error!', error);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const newTask = new Task({
    description : 'Learning node from Udemy',
    completed : false
});

newTask.save().then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log("Error!",error);
})