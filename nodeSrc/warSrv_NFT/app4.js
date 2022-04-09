var io = require('socket.io').listen(3000);

String.prototype.startWith=function(str){     
    var reg=new RegExp("^"+str);     
    return reg.test(this);        
}

chat = io.sockets.on('connection', function (socket) {
  socket.emit('connected');

  socket.on('init', function(req) {
      socket.set('room', req.room);
      socket.set('nickname', req.name);

      console.log(req.room +":"+ req.name);

      //socket.broadcast.to(req.room).emit('message', req.name + " is coming.");
      socket.join(req.room);
      socket.to(req.name).emit('other','connected'); 
  });

  socket.on('set nickname', function (name) {
      socket.set('nickname', name);
  });


  socket.on('message', function (data) {
      var room,nick,data;

      //console.log("msg:"+data);

      socket.get('room', function(err, _room) {
         room = _room;
      });
      socket.get('nickname', function(err, _name) {
         nick = _name;
      });

      //console.log("DDD:"+nick +"||"+ room + ":"+data);

      socket.broadcast.to(room).emit("other",data);    
  });

  socket.on('chat', function (data) {
      var room,nick,data;

      console.log("chat:"+data);

      socket.get('room', function(err, _room) {
         room = _room;
      });
      socket.get('nickname', function(err, _name) {
         nick = _name;
      });


      //console.log('Chat message by ', nick);
      socket.broadcast.to(room).emit("other","SA"+nick+":"+data);
  });


  socket.on('act', function (data) {
      var room,nick,data;

      console.log("act:"+data);

      socket.get('room', function(err, _room) {
         room = _room;
      });
      socket.get('nickname', function(err, _name) {
         nick = _name;
      });

      //console.log('ACT message by ', nick);
      socket.broadcast.to(room).emit("other","AC"+nick+":"+data);
  });


  socket.on('cloth', function (data) {
       var room,nick,data;

       console.log("cloth:"+data);

       socket.get('room', function(err, _room) {
          room = _room;
       });
       socket.get('nickname', function(err, _name) {
          nick = _name;
       });

       socket.broadcast.to(room).emit("other","CL"+nick+":"+data);
  });


  socket.on('disconnect', function () {
       var room,nick,name;

       socket.get('room', function(err, _room) {
          room = _room;
       });
       socket.get('nickname', function (err, _name) {
          nick = _name;
       });

       console.log(nick+" disconnected");
       socket.broadcast.to(room).emit("other","LO"+nick);
  });

});
