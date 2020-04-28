const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0 || b<0){
                return reject('only positive numbers allowed');
            }
           resolve(a+b);
        },2000)
    })
}

const doWork = async ()=>{
  const sum = await add(-1,199);
  console.log(sum);                  ///after 2 seconds
  const sum2 = await add(sum,50);
  console.log(sum2);                 //after 4 seconds
  const sum3 = await add(sum2,-3);
  console.log(sum3);                 //after 6 seconds
  return sum3; 
  }

doWork().then((result)=>{
    console.log("result==",result);
}).catch((e)=>{
    console.log('e==',e);
})