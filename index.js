var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

     socket.on('add user',function(msg){
        socket.username = msg;
        console.log("new user: "+msg+"Has Logged.");
        io.emit('add user',{
            username: socket.username
        });
     });
    
     socket.on('chat message', function(msg){
     console.log(socket.username+":"+msg);
        io.emit('chat message', {
            username:socket.username,
            msg:msg
        });
     });

     socket.on('disconnect',function(){
        console.log(socket.username+" Has Left.");
        io.emit('user left',{
            username:socket.username
        });
     });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
