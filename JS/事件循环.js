console.log(1)


setTimeout(function() {
  console.log(3) 
})

var p = new Promise((resolve,reject) => {
  console.log(2);
  new Promise(resolve => {
    console.log(8)
    resolve()
  })
  .then(res => {
    console.log(9)

    new Promise(resolve => {
      console.log(10)
      resolve()
    })
    .then(res => {
      console.log(11)
    })
  })
  for(var i=0; i<1000000000;i++) {

  }
  new Promise(resolve => {
    console.log(6)
    resolve()
  })
  .then(res => {
    console.log(7)
  })
  resolve()
})

p.then(res => {
  console.log(4)
})
console.log(5)