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
      ds = 2,
      maxRad = Math.round(Math.sqrt(Math.min(canvas.width, canvas.height)) * 4),
      grd;
        // Circle constructor
		function Circle() {
      this.rad = 10 + Math.random() * maxRad; // 半径
      this.rad2 = this.rad * this.rad; // 半径的平方
      this.color = randomColor();
      this.pos = new Vector(canvas.width * Math.random(),canvas.height * Math.random());// 圆心
    }

    Circle.prototype.render = function() {
      ctx.beginPath();
      // 判断当前鼠标的位置是否在圆内
      if (this.pos.dist2(pointer) < this.rad2) {
        ctx.fillStyle = '#f20';
        ctx.globalAlpha = 0.35;
        pointer.over = true;
      } else {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.35;
      }
      ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
      ctx.fill()

      ctx.strokeStyle = '#f0f';
      ctx.globalAlpha = 0.35;

				for (var j = 0; j < count; j++) {
						var that = circles[j];
            // 判断两个圆圆心的距离 是否小于当前圆的半径 * 1.44，1.44 这个数控制圆心间距多少需要把圆心链接
            if(this.pos.dist2(that.pos) < this.rad2 * 1.44) {
              ctx.beginPath();
              ctx.moveTo(this.pos.x, this.pos.y);
              ctx.lineTo(that.pos.x, that.pos.y);
              ctx.stroke();
            }
        }

        // 画圆中心点
				ctx.fillStyle = '#fff';
				ctx.fillRect(this.pos.x - ds, this.pos.y - ds, ds * 2, ds * 2); 

    }
    function draw() {
				requestAnimationFrame(draw);

      ctx.clearRect(0,0, canvas.width, canvas.height);
      
      for (var i = 0; i < count; i++) {
          circles[i].render();
      }
    }

    	// create circles

		for (var i = 0; i < count; i++) {
        circles[i] = new Circle();
    }

    // pointer

		var pointer = canvas.pointer();

		// pointer down event

		pointer.down = function() {

				// Look for a circle the mouse is in, then lock that circle to the mouse
				for (var i = 0; i < count; i++) {
						// If the circles are close...
						if (circles[i].pos.dist2(this) < circles[i].rad2) {
								circles[i].locked = true;
								circles[i].offset.sub(this, circles[i].pos);
								dragging = true; // Break out of the loop because we found our circle
								break;
						}
				}

		};

		// pointer up event

		pointer.up = function() {

				// User is no-longer dragging
				for (var i = 0; i < count; i++) {
						circles[i].offset.set(0, 0);
						circles[i].locked = false;
						circles[i].parent = null; // Clear parent
				}
				dragging = false;
    };

    canvas.resize = function() {
      // vignette
      var outerRadius = this.width * 0.7;
      var innerRadius = this.height * 0.3;
      grd = ctx.createRadialGradient(this.width / 2, this.height / 2, innerRadius, this.width / 2, this.height / 2, outerRadius);
				grd.addColorStop(0, 'rgba(0,0,0,0)');
        grd.addColorStop(1, 'rgba(0,0,0,1)');
    }
    draw();
}()