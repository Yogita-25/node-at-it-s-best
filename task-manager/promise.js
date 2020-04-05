const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Things went wrong!");  //failure
      //  resolve([2, 7, 4]);     //success
    }, 2000)
});

doWorkPromise.then((result) => {
    console.log("Success", result);
}).catch((error)=>{
    console.log("Error!",error);
})