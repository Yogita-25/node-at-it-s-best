const request = require('supertest');
const app = require('../src/app');

test('should signup a new user', async ()=>{
   await request(app).post('/users').send({
       name : 'Yogita Dhanwate',
       email : 'dyogita04@gmail.com',
       password : 'Saiyogi@254'
   }).expect(201)
})