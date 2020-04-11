const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true            //to create index to access data faster
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter valid email");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password can not contain password");
            }
        }
    }
});

const newUser = new User({
    name: '  Yogita',
    email: '   dyogita@gmail.com',
    password: "asPssword",
    age : 22
});

newUser.save().then((result) => {
    console.log("New user==", result);
}).catch((error) => {
    console.log('Error!', error);
});

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const newTask = new Task({
//     description: 'Learning node from Udemy',
//     completed: false
// });

// newTask.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log("Error!", error);
// })