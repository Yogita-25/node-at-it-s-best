const express = require('express');
require('./db/mongoose');            //connect with DB
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();

app.use(express.json());     //add this otherwise you would get req.body undefined

app.use(userRouter);  //to register router with app otherwise you will not get API respose
app.use(taskRouter);

module.exports = app;

