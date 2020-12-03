var promise = new Promise((resolve,reject)=> {
  if(success) {
    resolve(value)
  } else {
    reject(error)
  }
})
Promise.then(function(value){
  //success
},function(value){
  //failed
})