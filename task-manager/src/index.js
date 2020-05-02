const express = require('express');
require('./db/mongoose');            //connect with DB

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());     //add this otherwise you would get req.body undefined

app.use(userRouter);  //to register router with app otherwise you will not get API respose
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ', port);
});


