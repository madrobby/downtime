;(function(global){
  var request, data, now = new Date
  
  function xhr(a){for(a=3;a--;)try{return new(this.XMLHttpRequest||ActiveXObject)(["Msxml2","Msxml3","Microsoft"][a]+".XMLHTTP")}catch(e){}}
  
  function parseJSON(json){
    return (JSON.parse||(function(json){ 
      return eval('var o='+json), o
    }))(json)
  }
  
  function parseDate(iso8601){
    var k
    return (k=iso8601.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})Z$/)) ? new Date(Date.UTC(k[1],k[2]-1,k[3],k[4],k[5],k[6])) : iso8601
  }
  
  function normalize(){
    events(function(event){
      event.starts_at = parseDate(event.starts_at)
      event.ends_at = 'ends_at' in event ? parseDate(event.ends_at) : undefined
      event.ongoing = event.starts_at < now && (!event.ends_at || (event.ends_at && event.ends_at > now))
      event.past = event.ends_at && event.ends_at < now
      event.future = event.starts_at > now
      if(!('type' in event)) event.type = 'scheduled'
    })
  }
  
  function events(filter){
    var i, returnArray = []
    for(i=0;i<data.downtime.length;i++)
      if(filter(data.downtime[i])) returnArray.push(data.downtime[i])
    return returnArray
  }

  function past(){
    return events(function(event){ return event.past })
  }
  
  function future(){
    return events(function(event){ return event.future })    
  }
  
  function ongoing(){
    return events(function(event){ return event.ongoing })
  }
  
  function downtime(url, callback){
    request = xhr()
    request.open('GET', url, true)
    request.onreadystatechange = function(){
      if(request.readyState==4) {
        data = parseJSON(request.responseText)
        normalize()
        data.past = past()
        data.future = future()
        data.ongoing = ongoing()
        if(callback) callback(data)
      }
    }
    request.send()
  }
  
  global.downtime = downtime
})(this);