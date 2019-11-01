const path = require('path');
const request = require('request');
const fs = require('fs');

console.log(__dirname);
console.log(__filename);

const readdir = function(dirpath) {

  fs.readdir(dirpath,function(err,files) {

    files.forEach(file => {

      const resolvePath = path.resolve(dirpath,file);

      fs.stat(resolvePath,function(err,stats) {

        if(stats.isDirectory(file)) {

          readdir(path.resolve(dirpath,file))

        } else if(stats.isFile(resolvePath)){

          const fileinfo = path.parse(resolvePath);

          if((/(png|jpg|jpeg)/g).test(fileinfo.ext)) {

            var formData = {
              luyou:`wolong/alymd/images/${fileinfo.base}`,
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
readdir('./新切图')
