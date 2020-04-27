const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());     //add this otherwise you would get req.body undefined


app.post('/users',(req,res)=>{
      console.log("---",req.body);
      const user= new User(req.body);
      user.save().then(()=>{
      res.send(user);
    }).catch((e)=>{
      res.status(400).send(e);             //need to add this before sending data
    });
});

app.listen(port ,()=>{
    console.log('Server is up on port ',port);
});


