// Finally

const finallyPromise = new Promise(function(resolve, reject){
//   resolve(1)
  reject(1)
})


finallyPromise.then((data)=>{
  console.log({data});
}).catch(err=>{
  console.log({err});
}).finally(()=>{
  console.log('Finally block executed ==');
})
