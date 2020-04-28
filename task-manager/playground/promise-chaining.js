require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5ea6f57e093a96342432be92',{age :26}).then((user)=>{
//     console.log("result==",user);
//     return User.countDocuments({age : 26});
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })

const updateAgeAndCount = async(id,age)=>{
    const user =await User.findByIdAndUpdate(id,{age});
    console.log("updated user==>",user);
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5ea6ec1de6788202f0edf562',22).then((result)=>{
    console.log("result",result);
    }).catch((e)=>{
    console.log("e===",e);
});