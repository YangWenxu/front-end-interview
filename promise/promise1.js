function myPromise(constructor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.reason = undefined;
  function resolve(value){
    if(self.status == "pending") {
      self.value = value;
      self.status = "resolved"
    }
  }
  function reject(value){
    if(self.status == "pending") {
      self.reason = value;
      self.status = "rejected"
    }
  }
  try{
    constructor(resolve, reject)
  } catch(e){
    reject(e);
  }
}
myPromise.prototype.then = function(onFullfilled, onRejected){
  let self = this;
  switch(self.status){
    case 'resolved':
      onFullfilled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break;

  }
}
var p = new myPromise((resolve,reject)=> {
  resolve(1);
})
p.then(function(x){
  console.log(x);
})