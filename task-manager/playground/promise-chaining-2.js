require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findOneAndRemove({_id:'5ea6f34965895d344813e0c8'}).then((task)=>{
    console.log("Removed ==",task);
    return Task.countDocuments({completed : false})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})