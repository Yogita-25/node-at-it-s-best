const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const env = require('dotenv').config();

const userOneId = mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'kiran dhanwate',
    email: 'dyogita04@gmail.com',
    password: 'Saikiran@12',
    tokens: [{
        token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET)
    }]
};

beforeEach(async () => {               //runs before every test in this test suits
    await User.deleteMany();
    await new User(userOne).save();
})

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Yogita Dhanwate',
        email: 'yogita.dhanwate@gmail.com',
        password: 'Saiyogi@254'
    }).expect(201)
})

test('should login existing user', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login nonexistent user', async () => {
    await request(app).post('/user/login').send({
        email: 'EmailDoesNotExist@gmail.com',
        password: 'passs@12'
    }).expect(400);
})

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200);
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(404);
})

test('should delete account for user', async () => {
    await request(app)
        .delete('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200);
})

test('should not delete account for unauthenticated user',async()=>{
    await request(app)
    .delete('/user/me')
    .send()
    .expect(404);
})