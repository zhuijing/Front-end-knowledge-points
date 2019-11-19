var http = require('http');
var url = require('url')
var querystring = require('querystring');

http.createServer(function (req, res) {
  console.log(req.url,'请求路径')
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain

    res.setHeader("Access-Control-Allow-Origin", "*"); 

    if(req.url.indexOf('/login') > -1){
      // 假装去查数据库 
      var params = url.parse(req.url);
      var query = querystring.parse(params.query);
      var name = query.name;
      var password = query.password;
      if(name == 'czp' && password == '1234') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        // 发送响应数据 "Hello World"
       return res.end('login success');
      } else {
      // 没查到
        res.writeHead(200, {'Content-Type': 'text/plain'});
       return res.end('login erroe');
      }

        }

}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
console.log(process.cwd())

// /login  登录接口

// /getuserInfo  获取用户信息

