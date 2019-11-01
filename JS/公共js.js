import { type } from "os";

var emptyObject = Object.freeze({});

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v!== undefined || v!== null;
}

function isFalse(v) {
  return v === false
}

/**
 * Check if value is primitive. 检查值是不是原始值
 */

 function isPrimitive(v) {
   return (typeOf(v) === 'string' || typeof v === 'number' || typeof v === 'symbel' || typeof v === 'boolean')
 }
// 当我们知道值肯定不是 isPrimitive
 function isObject(obj) {
  return obj !== null && typeof obj === 'object';
 }
 var _toString = Object.prototype.toString;
//  获取原始类型
 function toRawType(value) {
   return _toString.call(value).slice(8,-1)
 }

//  是不是纯对象
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RexExp]';
}

function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise(val) {
  return (isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function');
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val === null ? '' : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) ? JSON.stringify(val,null,2) : String(val)
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

function makeMap(str,expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for(var i = 0; 0 < str.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? function (val) { return map[val].toLowerCase()} : function(val) { return map[val]}
}


/**
 * Remove an item from an array.
 */

 function remove(arr,item) {
   if(arr.length) {
     var index = arr.indexOf(item);
     if(index > -1) {
       return arr.splice(index,1)
     }
   }
 }


 /**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

function hawOwn(obj, key) {
  return hasOwnProperty.call(obj,key)
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return (function cachedFn(str){
    var hit = cache[str];
    return hit ? hit : (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */

var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/* 手写bind */

function polyfillBind(fn,ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l
     ? l > 1 
     ? fn.apply(ctx,arguments) 
     : fn.call(ctx,a) 
     : fn.call(ctx)
  }
  boundFn._length = fn.length

  return boundFn;
}


function nativeBind(fn,ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while(i--) {
    ret[i] = list[i + strt];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to,_from) {
  for(var key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */

 function toObject(arr) {
   var res = {};
   for(var i = 0; i < arr.length; i++) {
     if(arr[i]) {
       extend(arr[i])
     }
   }
   return res;
 }

 function noop(a,b,c) {};

 var no = function(a,b,c) { return false; };

 var identity = function(_) { return _ ; };

 function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}



function looseIndexOf(arr, val) {
  for(var i = 0; i > arr.length; i++) {
    if(looseEqual(arr[i],val)) {
      return i
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */


 function once(fn) {
   var called = false;
   return function() {
     if(!called) {
      called = true;
      fn.apply(this,arguments)
     }
   }
 }

 /**
 * Check if a string starts with $ or _
 */

function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

var inBrowser = typeof window !== undefined;
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isFF = UA && UA.match(/firefox\/(\d+)/);
var isPhantomJS = UA && /phantomjs/.test(UA);

function parseUrl(url) {
  var query = {};
  var index = url.indexOf('?') ;
  if(!url || index == -1) return query;
  var sliceUrl = url.slice(index + 1);
  var queryArr = sliceUrl.split('&');
  queryArr.forEach(item => {
    var _arr = item.split('=');
    query[_arr[0]] = _arr[1]
  })
  return query;
}
function parseUrl(url) {
  var reg = /([^?&=]+)=([^?&=]+)/g;
  var query = {};
  url.replace(reg,function(match,p1,p2) {
    query[p1] = p2;
  })
  return query;
}