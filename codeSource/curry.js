function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function(){
    var newArr = args.concat(Array.prototype.slice.call(arguments));
    if(newArr.length < length){
      return curry.call(this, fn, newArr);
    } else {
      return fn.apply(this, newArr);
    }
  }
}

function multiFn(a, b, c) {
  return a*b*c;
}
var multi = curry(multiFn);
multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);