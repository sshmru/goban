var getGroups = function(arr, len){
  return arr.reduce(function(g, x,i,a){ 
    var eqUp = a[i-len] === x;
    var eqPrev = a[i-1] === x;
    if(eqPrev && (i-1)%len !== len-1)
      if(eqUp){
        var remap = g[i-1]
        g.forEach(function(x, j){
          if(x === remap)
            g[j] = g[i-len];
        })
        g[i] = g[i-len]
      }else{
        g[i] = g[i-1]
      }
    else if(eqUp)
      g[i] = g[i-len]
      else
        g[i] = i
        return g
  }, [])
};

var getLibs = function(arr, groups, len){
  var libs = arr.reduce(function(libs,stone,i,arr){
 	  if(!stone)
 	    return libs;
    var group = groups[i]
    var close = [i-len, i+len, i-1, i+1]
    if(!libs[group])
      libs[group] = [];
    close.forEach(function(crossing){
      if(!arr[crossing] && libs[group].indexOf(crossing) < 0)
        libs[group].push(crossing)
    });
    return libs;
	}, {})
  return groups.map(function(x){
    return libs[x] ? libs[x].length : 0;
  })
}

var a = new Array(19).join(',').split(',')
.map(function(x){
  var b =  new Array(19).join(',').split(',').map(function(x){
    return Math.floor(Math.random()*3)
  });
  return b
})
var print = function(arr){
  arr.forEach(function(x){
    var node = document.createElement('div')
    node.classList.add('asd')
    var color = (x*x*461 - x*x*x  ).toString(16)
    while(color.length < 6) color = 'F' + color
    node.style.background = '#' + color
    node.innerHTML = x;

    document.body.appendChild(node)
  })
  document.body.appendChild(document.createElement('hr'))
}
var arr = Array.prototype.concat.apply([], a)
print(arr)

var groups = getGroups(arr, a.length)
print(groups)

var libs = getLibs(arr, groups, a.length)
print(libs)
