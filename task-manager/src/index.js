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


const Task = require('./models/task');
const User = require('./models/user');
const main = async () => {
    // const task = await Task.findById('5eaec3dde30d9f530cf1cc54');
    // await task.populate('createdBy').execPopulate();
    //     console.log(task.createdBy);
    const user = await User.findById('5eaeb7b910c4fe27481d89e1');
    await user.populate('tasks').execPopulate();    //tasks is a virtual property
    console.log(user.tasks);
}

main();