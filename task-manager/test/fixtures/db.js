const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'kiran dhanwate',
    email: 'kirandhanwate12345@gmail.com',
    password: 'Saikiran@12',
    tokens: [{
        token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET)
    }]
};


const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Salman Khan',
    email: 'sallu27@gmail.com',
    password: 'sallu@27',
    tokens: [{
        token: jwt.sign({ _id: userTwoId.toString() }, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    createdBy: userOne._id
}

const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    createdBy: userOne._id
}

const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    createdBy: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}