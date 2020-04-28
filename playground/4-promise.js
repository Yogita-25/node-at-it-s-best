const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           resolve(a+b);
        },2000)
    })
}

// add(4,5).then((sum)=>{
//   console.log("Sum==",sum);
//   add(sum,2).then((result)=>{
//      console.log("2nd ==",result);
//   }).catch((e)=>{
//      console.log("2===error",e);
//   })
// }).catch((e)=>{
//   console.log("Error==",e);
// })

add(1,2).then((sum)=>{
   console.log(sum);
   return add(sum,3);             //you can return a promise from then call of promise to nest another then call with it
}).then((sum2)=>{
    console.log(sum2);
}).catch((e)=>{
    console.log(e);
})