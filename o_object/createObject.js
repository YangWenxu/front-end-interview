function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name);
  }
}
var person = new Person("james");