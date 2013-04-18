// JavaScript Document
var conns = new Array();  
 var ws = require('./node_modules/ws').Server;
 var server = new ws({
    port: 8080
});  
 server.on('connection', function(conn)
 {  
     console.log('connection....');  
     conns.push(conn);  
     conn.addListener('message',function(msg)
	 {  
         console.log(msg);  
         for(var i=0; i<conns.length; i++)
		 {  
                 conns[i].send(msg);  
         }  
     });
	 
	 conn.on("close", function(){
         console.log("closed connection.... ");
     });   
 });
 
 

 //server.listen(8080);  
 console.log('running......'); 
                                 