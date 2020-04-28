require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5ea6f57e093a96342432be92',{age :26}).then((user)=>{
    console.log("result==",user);
    return User.countDocuments({age : 26});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})