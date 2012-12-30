;(function(global){
  var request
  
  function xhr(a){for(a=3;a--;)try{return new(this.XMLHttpRequest||ActiveXObject)(["Msxml2","Msxml3","Microsoft"][a]+".XMLHTTP")}catch(e){}}
  
  function parse(json){
    return (JSON.parse||(function(json){ 
      return eval('var o='+json), o
    }))(json)
  }
  
  function downtime(url, callback){
    request = xhr()
    request.open('GET', url, true)
    request.onreadystatechange = function(){
      if(request.readyState==4) callback(parse(request.responseText))
    }
    request.send()
  }
  
  global.downtime = downtime
})(this);