import api from "api/api"
import cookie from "js-cookie"
import Vue from 'vue'
import wx from 'jweixin-wechat'
import { Toast } from 'vant'
// 长按指令
Vue.directive('longpress', {
	bind: function (el, binding, vNode) {
		if (typeof binding.value !== 'function') {
			// Fetch name of component
			const compName = vNode.context.name
			// pass warning to console
			let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
			if (compName) { warn += `Found in component '${compName}' ` }
		}
		let pressTimer = null
		let start = (e) => {
			if (e.type === 'click' && e.button !== 0) {
				return;
			}
			if (pressTimer === null) {
				pressTimer = setTimeout(() => {
					handler()
				}, 1000)
			}
		}
		// Cancel Timeout
		let cancel = (e) => {
			// Check if timer has a value or not
			if (pressTimer !== null) {
				clearTimeout(pressTimer)
				pressTimer = null
			}
		}
		// Run Function
		const handler = (e) => {
			binding.value(e)
		}
		// Add Event listeners
		el.addEventListener("mousedown", start);
		el.addEventListener("touchstart", start);
		// Cancel timeouts if this events happen
		el.addEventListener("click", cancel);
		el.addEventListener("mouseout", cancel);
		el.addEventListener("touchend", cancel);
		el.addEventListener("touchcancel", cancel);
	}
})
// 获取链接参数
export const GetSearchParam = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return (r[2]); return null;
}
// 随机整数
export const random = (min, max) => {
	return parseInt(Math.random() * (max - min + 1) + min, 10);
}
// 进入后台
export const getHiddenProp = () => {
	const prefixes = ['webkit', 'moz', 'ms', 'o'];
	if ('hidden' in document) return 'hidden';
	for (var i = 0; i < prefixes.length; i++) {
		if ((prefixes[i] + 'Hidden') in document)
			return prefixes[i] + 'Hidden';
	}
	return null;
}
export const getVisibilityState = () => {
	const prefixes = ['webkit', 'moz', 'ms', 'o'];
	if ('visibilityState' in document) return 'visibilityState';
	for (var i = 0; i < prefixes.length; i++) {
		if ((prefixes[i] + 'VisibilityState') in document)
			return prefixes[i] + 'VisibilityState';
	}
	return null;
}
// 判断浏览器
export const getBroswer = () => {
	var u = navigator.userAgent, app = navigator.appVersion;
	return {//移动终端浏览器版本信息
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		mobile: !!u.match(/AppleWebKit.*Mobile.*/)
			|| !!u.match(/AppleWebKit/), //是否为移动终端
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
		google: u.indexOf('Chrome') > -1,
		weChat: (u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1) && u.indexOf('wxwork') === -1
	};
}
export const isMiniapp = () => {
	return navigator.userAgent.toLowerCase().indexOf('miniprogram') > -1;
}
export function isPhone(str) {
	const reg = /^1\d{10}$/
	if (str === '') {
		return false
	} else {
		return reg.test(str.trim())
	}
}

export function fixIosInputBug() {
	document.body.scrollTop = document.body.scrollTop;
}

// 埋点
export function visitRecord(key, param) {
	api.visitRecord({
		key: key,
		params: param,
		activity_no: cookie.get('activity_no')
	}).then(res => {

	})
}
// 图片埋点
export function clickRecord(value, hash) {
	api.clickRecord({ key: value, params: hash, activity_no: cookie.get('activity_no') })
}

export function softHeight(a) {
	let winW = window.innerWidth
	return winW / 750 * a;
}
// 换行
export function replaceReturn(str) {
	var regRN = /(\r\n)|(\n)/g;
	if(typeof(str) != 'string'){
        return str
	}
	str = str.replace(regRN, '<br>');
	return str;
}
// 将<br>换回\n;
export function backReturn(str) {
	var regRN = /<br>/g;
	str = str.replace(regRN, '\n');
	return str;
}

// 节流
export function throttle(method, delay, time) {
	var timeout, startTime = new Date();
	return function () {
		var context = this,
			args = arguments,
			curTime = new Date();
		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= time) {
			method.apply(context, args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(method, delay);
		}
	}
}
// 回到顶部
export function toTop() {
	let timer = null;
	let max = 0;
	cancelAnimationFrame(timer);
	timer = requestAnimationFrame(function fn() {
		let oTop = document.body.scrollTop || document.documentElement.scrollTop;
		max = oTop > max ? oTop : max;
		let step = max / 30;
		if (oTop > 0) {
			document.body.scrollTop = document.documentElement.scrollTop = oTop - step;
			timer = requestAnimationFrame(fn);
		} else {
			cancelAnimationFrame(timer);
		}
	});
}

// 音乐自动播放
export function audioAutoPlay(id) {
	var audio = document.getElementById(id);
	audio.play();
	function audioInBroswer() {
		audio.play();
		document.removeEventListener('touchstart', audioInBroswer);
	}
	document.addEventListener('touchstart', audioInBroswer);
	document.addEventListener('WeixinJSBridgeReady', function () {
		audio.play();
	}, false);
}
// 请在微信客户端打开
export function pleaseOpenWx() {
	const isWx = getBroswer().weChat;
	if (!isWx) {
		Toast(window.i18n.t('common.openinwx'));
		return true
	}
	return false
}

export function toBottom(st) {
	let timer = null;
	let max = 0;
	cancelAnimationFrame(timer);
	timer = requestAnimationFrame(function fn() {
		let oTop = document.body.scrollTop || document.documentElement.scrollTop;
		max = oTop >= max ? oTop : max;
		let step = st / 30;
		if (oTop < st) {
			document.body.scrollTop = document.documentElement.scrollTop = oTop + step;
			timer = requestAnimationFrame(fn);
		} else {
			cancelAnimationFrame(timer);
		}
		let endSt = document.body.scrollTop || document.documentElement.scrollTop;
		if (endSt === oTop) {
			cancelAnimationFrame(timer);
		}
	});
}
