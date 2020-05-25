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
    email: 'kirandhanwate12345@gmail.com',
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
    const response = await request(app).post('/users').send({
        name: 'Yogita Dhanwate',
        email: 'dyogita04@gmail.com',
        password: 'Saiyogi@254'
    }).expect(201)

    //Assert that the database changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();     //user not null

    //Assertion about the response
    //expect(response.body.user.name).toBe('Yogita Dhanwate');  //to test one property
    expect(response.body).toMatchObject({                       //to test multiple properties
        user: {
            name: 'Yogita Dhanwate'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Saiyogi@254')
})

test('should login existing user', async () => {
    const response = await request(app).post('/user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //validate new token is saved
    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token)
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
    const response = await request(app)
        .delete('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200);


    //validate user is removed
    const user = await User.findById(response.body._id);
    expect(user).toBeNull();
})

test('should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/user/me')
        .send()
        .expect(404);
})

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', userOne.tokens[0].token)
        .attach('avatar', 'test/fixtures/img2.jpg')
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('should update valid user field', async () => {
    await request(app)
        .patch('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            name: 'Raj Sharma'
        })
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Raj Sharma')
})

test('should not update invalid user field', async () => {
    await request(app)
        .patch('/user/me')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            location: 'Pune'
        })
        .expect(400)
})