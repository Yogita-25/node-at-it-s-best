const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { userOneId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            description: 'Complete Jest testing'
        })
        .expect(201)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
})

test('should get all tasks created by user ', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', userOne.tokens[0].token)
        .expect(200)

    expect(response.body.length).toEqual(2)
})

test('should not delete task created by another user', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', userTwo.tokens[0].token)
        .expect(404)

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})