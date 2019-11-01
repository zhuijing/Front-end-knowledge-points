var module = null;
var num = Math.random();
console.log(num, '====')
if(num > 0.5 ) {
  module = require('path')
} else {
  module = require('fs')
}
console.log(module)