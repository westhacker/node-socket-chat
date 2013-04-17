// slightly modified version of echo-server.js for the web-sockets demo


var sys = require("sys")
  , fs = require("fs")
  , path = require("path")
  , http = require("http")
  , ws = require('./node_modules/ws').Server;


/*-----------------------------------------------
  logging:
-----------------------------------------------*/
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


function timestamp() {
  var d = new Date();
  return [
    d.getDate(),
    months[d.getMonth()],
    [ pad(d.getHours())
    , pad(d.getMinutes())
    , pad(d.getSeconds())
    , (d.getTime() + "").substr( - 4, 4)
    ].join(':')
  ].join(' ');
};


function log(msg) {
  sys.puts(timestamp() + ' - ' + msg.toString());
};


function serveFile(req, res){
  if( req.url.indexOf("favicon") > -1 ){
    log("HTTP: inbound request, served nothing, (favicon)");
    
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end("");
  } else {
    log("HTTP: inbound request, served client.html");
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream( path.normalize(path.join(__dirname, "client.html")), {
      'flags': 'r',
      'encoding': 'binary',
      'mode': 0666,
      'bufferSize': 4 * 1024
    }).addListener("data", function(chunk){
      res.write(chunk, 'binary');
    }).addListener("close",function() {
      res.end();
    });
  }
};


/*-----------------------------------------------
  Spin up our server:
-----------------------------------------------*/
var httpServer = http.createServer(serveFile);



var conns = new Array();
var connected = 0;
var server = new ws({
    port: 8000
}); 


server.on("listening", function(){
  log("Listening for connections on " + process.argv[2]);
});


// Handle WebSocket Requests
server.on("connection", function(conn){
  log("opened connection: "+conn.id);
  conns.push(conn);
  connected++;
  conn.send(conn.id, connected+'');
   for(var i=0; i<conns.length; i++)
		 {  
                 conns[i].send(connected+'');  
         }  
  //conn.send();//
  
  conn.on("message", function(message){
    log("<"+conn.id+"> "+message);
	   for(var i=0; i<conns.length; i++)
		 {  
		 if(conns[i]!=conn)
			{  
                 conns[i].send(message);  
			}
         }  
    //conn.send(message);//
  });
  
  conn.on("close", function(){
  log("closed connection: "+conn.id);
  connected--;
  	   for(var i=0; i<conns.length; i++)
		 {   
                 conns[i].send(connected+'');// 
         } 
  
});

});
/*
server.on("close", function(conn){
  log("closed connection: "+conn.id);
  connected--;
  conn.send(connected+'');//
});
*/


//server.listen(parseInt(process.argv[2]) ||8000);
// Handle HTTP Requests:
//

// This will hijack the http server, if the httpserver doesn't 
// already respond to http.Server#request


// server.addListener("request", serveFile);

