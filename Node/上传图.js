const path = require('path');
const request = require('request');
const fs = require('fs');
const dirname = process.argv.slice(2)[0];
console.log(__dirname);
console.log(__filename);
console.log(process.argv,'argv')
var name ='cao';
var str = Math.random().toString(16).slice(-5);
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var getname = (function() {
  var num = 0;
  return function (ext){
   num++;
   return  name + str + year + month + day + num + ext;
  }
}())

const readdir = function(dirpath) {

  fs.readdir(dirpath,function(err,files) {

    files.forEach(file => {

      const resolvePath = path.resolve(dirpath,file);

      fs.stat(resolvePath,function(err,stats) {

        if(stats.isDirectory(file)) {

          readdir(path.resolve(dirpath,file))

        } else if(stats.isFile(resolvePath)){

          const fileinfo = path.parse(resolvePath);
          const _ext = fileinfo.ext;
          if((/(png|jpg|jpeg)/g).test(_ext)) {
            
            var formData = {
              luyou:`wolong/alymd/images/${getname(_ext)}`,
              file:fs.createReadStream(resolvePath),
            };
            
            request.post({url:'http://101.201.225.225:5000/uploading_dm/',formData:formData},function(err, httpResponse, body) {
              console.log(body,'body')
            })
          }
        }
      })
    })
  })
}
if(!dirname) {
  throw Error('请输入文件夹路径')
}
readdir(dirname)
