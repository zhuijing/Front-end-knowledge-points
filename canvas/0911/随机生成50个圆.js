'use strict';

// ge1doot - 25 Oct 2015
// canvas pointer utility

'use strict';

var canvas = {
	
		elem: document.createElement('canvas'),
	
		_resize: function() {
			
				this.width = this.elem.width = this.elem.offsetWidth;
				this.height = this.elem.height = this.elem.offsetHeight;
				this.resize && this.resize();
			
		},
	
		init: function() {
			
				var ctx = this.elem.getContext('2d');
				document.body.appendChild(this.elem);
				window.addEventListener('resize', this._resize.bind(this), false);
				this._resize();
				return ctx;
			
		},
	
		setCursor: function (type) {

			if (type !== this.cursor) {
					this.cursor = type;
					this.elem.style.cursor = type;
			}

		},
	
		pointer: function() {

				var pointer = {
						x: 0,
						y: 0,
						isDown: false
				};

				pointer.move = function(e) {
					
						var touchMode = e.targetTouches,
								pointer;
						if (touchMode) {
								e.preventDefault();
								pointer = touchMode[0];
						} else pointer = e;
						this.x = pointer.clientX;
						this.y = pointer.clientY;
					
				}

				pointer.bind = function(elem, events, fn) {
					
						for (var i = 0, e = events.split(','); i < e.length; i++) {
								elem.addEventListener(e[i], fn.bind(pointer), false);
						}
					
				}

				pointer.bind(window, 'mousemove,touchmove', function(e) {
					
						this.move(e);
					
				});

				pointer.bind(canvas.elem, 'mousedown,touchstart', function(e) {
					
						this.move(e);
						this.isDown = true;
						this.down && this.down();
					
				});

				pointer.bind(window, 'mouseup,touchend,touchcancel', function(e) {
					
						e.preventDefault();
						this.isDown = false;
						this.up && this.up();
					
				});

				return pointer;

		}
};

function Vector(x, y) {
		this.x = x || 0.0;
		this.y = y || 0.0;
}

Vector.prototype.set = function(x, y) {
		this.x = x;
		this.y = y;
		return this;
}

Vector.prototype.copy = function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
}

Vector.prototype.sub = function(v1, v2) {
		this.x = v1.x - v2.x;
		this.y = v1.y - v2.y;
		return this;
}

Vector.prototype.selfSub = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
}

Vector.prototype.mult = function(v, f) {
		this.x = v.x * f;
		this.y = v.y * f;
		return this;
}

Vector.prototype.selfMult = function(f) {
		this.x *= f;
		this.y *= f;
		return this;
}

Vector.prototype.div = function(v, f) {
		this.x = v.x / f;
		this.y = v.y / f;
		return this;
}

Vector.prototype.selfDiv = function(f) {
		this.x /= f;
		this.y /= f;
		return this;
}

Vector.prototype.add = function(v1, v2) {
		this.x = v1.x + v2.x;
		this.y = v1.y + v2.y;
		return this;
}

Vector.prototype.selfAdd = function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
}

Vector.prototype.limit = function(maxLength) {
		var lengthSquared = this.x * this.x + this.y * this.y;
		if ((lengthSquared > maxLength * maxLength) && (lengthSquared > 0)) {
				var ratio = maxLength / Math.sqrt(lengthSquared);
				this.x *= ratio;
				this.y *= ratio;
		}
		return this;
}

Vector.prototype.dist2 = function(v) {
		return ((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
}

Vector.prototype.mag2 = function() {
		return (this.x * this.x + this.y * this.y);
}
// 随机颜色
function randomColor(){ return '#' + Math.floor( Math.random() * 0xffffff ).toString(16)}
var ctx = canvas.init();
!function(){
  var count = 50,
      circles = [],
      maxRad = Math.round(Math.sqrt(Math.min(canvas.width, canvas.height)) * 5)
        // Circle constructor
		function Circle() {
      this.rad = 10 + Math.random() * maxRad; // 半径
      this.color = randomColor();
      this.pos = new Vector(canvas.width * Math.random(),canvas.height * Math.random());// 圆心
    }

    Circle.prototype.render = function() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.35;
      ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
      ctx.fill()
    }


    function draw() {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      for (var i = 0; i < count; i++) {
          circles[i].render();
      }
    }


    // create circles
		for (var i = 0; i < count; i++) {
        circles[i] = new Circle();
    }

    draw();
}()