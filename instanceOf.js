function instanceOf(left, right){
  let proto = left._proto_;
  let prototype = right.prototype;
  while (true) {
    if(proto === null)
      return false;
    if(proto === prototype) 
      return true;
    proto = proto._proto_;
  }
}