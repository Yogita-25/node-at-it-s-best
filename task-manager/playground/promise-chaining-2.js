require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findOneAndRemove({_id:'5ea6f34965895d344813e0c8'}).then((task)=>{
//     console.log("Removed ==",task);
//     return Task.countDocuments({completed : false});
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async(id)=>{
   const task = await Task.findOneAndRemove(id);
   console.log("Deleted task==",task);
   const count = await Task.countDocuments({completed : false});
   return count ;
}

deleteTaskAndCount('5ea6f627093a96342432be93').then((count)=>{
   console.log("Count==",count);
}).catch((e)=>{
    console.log("e===",e);
})