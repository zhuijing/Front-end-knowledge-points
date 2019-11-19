const http = require('http');
const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  };
  return sum;
};
const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    console.info('计算开始',new Date());
    const sum = longComputation();
    console.info('计算结束',new Date());
    return res.end(`Sum is ${sum}`);
  } else {
    res.end('来了老弟')
  }
});

server.listen(3000,()=>{
  process.title='程序员成长指北测试进程';
  console.log('进程id',process.pid)
  console.log(process.env,'process.env.NODE_ENV');
})
//文章地址 https://mp.weixin.qq.com/s/VzXnnfn4gCBMd5wea3LRIg