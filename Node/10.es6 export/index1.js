// 写法一
export var m = 1;

// 写法二
var m1 = 1;
export { m1 };

// 写法三
var n = 1;
export { n as n1 };

// 正确
export function f() {};

// 正确
function f1() {}
export { f1 };

// export default utils = "9"
