/*
 * @Descripttion:
 * @version:
 * @Author: yangwenxu
 * @Date: 2020-12-03 08:45:45
 * @LastEditors: yangwenxu
 * @LastEditTime: 2020-12-04 09:28:58
 */
function myPromise(constructor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.reason = undefined;
  function resolve(value) {
    if (self.status == "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }
  function reject(value) {
    if (self.status == "pending") {
      self.reason = value;
      self.status = "rejected";
    }
  }
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
  }
};
Promise.prototype.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    if (promiseList.length === 0) return resolve([]);
    let result = [],
      count = 0;

    promiseList.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value;
          if (++count === promiseList.length) resolve(result);
        },
        (reason) => reject(reason)
      );
    });
  });
};
var p = new myPromise((resolve, reject) => {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});
