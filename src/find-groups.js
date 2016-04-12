var getGroups = function(arr){
  var g = [];
  var joins = []
  var all = Array.prototype.concat.apply([], a)
    .forEach(function(x,i,a){ 
      if(a[i-1] === x && (i-1)%arr.length !== arr.length-1)
        if(a[i-arr.length] === x){
        var remap = g[i-1]
          g.map(function(x){
            if(x === remap)
              return g[i-arr.length]
            else
              return x
          })
          g[i] = g[i-arr.length]
        }else{
          g[i] = g[i-1]
        }
      else if(a[i-arr.length] === x)
        g[i] = g[i-arr.length]
      else
        g[i] = i
    })
  return g
};
