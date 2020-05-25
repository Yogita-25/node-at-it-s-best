const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'kiran dhanwate',
    email: 'kirandhanwate12345@gmail.com',
    password: 'Saikiran@12'
};

beforeEach(async () => {               //runs before every test in this test suits
    await User.deleteMany();
    await new User(userOne).save();
})

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Yogita Dhanwate',
        email: 'dyogita04@gmail.com',
        password: 'Saiyogi@254'
    }).expect(201)
})

test('should login existing user', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login nonexistent user',async ()=>{
    await request(app).post('/user/login').send({
        email : 'dyogita0002@gmail.com',
        password : 'passs@12'
    }).expect(200);
})