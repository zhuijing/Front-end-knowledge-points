// 定义Vue构造函数

function Watcher(name,el,vm,exp,attr) {
  this.name = name; //指令名称，例如文本节点，该值设为"text"
  this.el = el;             //指令对应的DOM元素
  this.vm = vm;             //指令所属myVue实例
  this.exp = exp;           //指令对应的值，本例如"number"
  this.attr = attr;         //绑定的属性值，本例为"innerHTML"
  this.update();
 
}
Watcher.prototype.update = function() {
  this.el[this.attr] = this.vm.$data[this.exp]//比如 H3.innerHTML = this.data.number; 当number改变时，会触发这个update函数，保证对应的DOM内容进行了更新
}
function Vue (options) {
  this._init(options);
}
Vue.prototype._init = function(options) {
  this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;
  this._binding = {}
  this._observe(this.$data);
    this._complie(this.$el);
}

Vue.prototype._observe = function(obj) {
  Object.keys(obj).forEach(key => {
    if(obj.hasOwnProperty(key)) {
      this._binding[key] = {
        _directives:[]
      }
        var value = obj[key];
        if (typeof value === 'object') {
          _this._obverse(value);
        }
      var binding = this._binding[key]
      
      Object.defineProperty(obj,key,{
        enumerable: true,
            configurable: true,
            get: function () {
              console.log(`${key}获取${value}`);
              return value;
            },
            set: function (newVal) {
              console.log(`${key}更新${newVal}`);
              if (value !== newVal) {
                value = newVal;
                binding._directives.forEach(function (item) {
                  item.update();
                })
              }
            }
      })
    }
  })
}
Vue.prototype._complie = function(root) {
  var _this = this;
  var nodes = root.children;
  for(var i = 0,lt = nodes.length;i <lt ;i++) {
    var node = nodes[i];
    if (node.children.length) {
      this._complie(node);
    }
    if (node.hasAttribute('v-click')) {
      node.onclick = (function () {
        var attrVal = nodes[i].getAttribute('v-click');
        return _this.$methods[attrVal].bind(_this.$data);
      })();
    }
    if(node.hasAttribute('v-model') && (node.tagName.toUpperCase()=='INPUT')) {
      var attrVal = node.getAttribute('v-model');
        _this._binding[attrVal]._directives.push(new Watcher(
          'input',
          node,
          _this,
          attrVal,
          'value'
        ))
      node.addEventListener('input',(function(key) {
        return function() {
          _this.$data[attrVal] =  nodes[key].value;
        }
      })(i))
    }

    if(node.hasAttribute('v-bind')) {
      var attrVal = node.getAttribute('v-bind');
      _this._binding[attrVal]._directives.push(new Watcher(
        'text',
        node,
        _this,
        attrVal,
        'innerHTML'
      ))
    }
  }
}


// vue  源码 生命周期 ，路由导航 ，store，
// ejs  node
// 爬虫 elctore
// 