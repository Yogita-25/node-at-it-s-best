const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           resolve(a+b);
        },2000)
    })
}

add(4,5).then((sum)=>{
  console.log("Sum==",sum);
  add(sum,2).then((result)=>{
     console.log("2nd ==",result);
  }).catch((e)=>{
     console.log("2===error",e);
  })
}).catch((e)=>{
  console.log("Error==",e);
})