var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')({'pingInterval': 5000}).listen(3000);
var http = require('http');
var bodyParser = require('body-parser');
var url = require('url');
var math = require('mathjs');
var cors = require('cors');
var redis = require('redis');
var redis_client = redis.createClient();
var querystring = require('querystring');
var options;

app.use(cors());
app.use(bodyParser());
app.options('*', cors());

function sinageAvailable(signList) {
  var signLen = signList.length;
  var signCnt = 0;
  return new Promise((resolve, reject) => {
    for(var i=0, len=signList.length; i<len; i++) {
      redis_client.get(signList[i], function(err, reply) {
        if(err) {
          console.log("err:" + err);
          reject(false);
        }
        else if(reply) {
          var now = Date.parse(new Date());
          var old = parseInt(reply);
          if(now - old < 90000) {
            signCnt++;
            if(signCnt==signLen) {
              resolve(true);
            }
          } else {
              reject(false);
          }
        }
      });
    }
  });
}

redis_client.on('connect', function() {
  console.log('redis connected');

  server.listen(3200, function(){
    console.log('listening on :3200');
  });

  app.post('/', function (req, res) {
    var params = req.body;

    sinageAvailable(params["user"]).then((result)=> {
      res.json('ok');
    }, (err)=>{
      console.log("time out.");
      res.json('ng');
    });
  });
});


var chat = io.sockets.on('connection', function (socket) {
  socket.emit('connected');
  console.log("server started.")

  socket.on('init', function(req) {
      socket.room = req.room;
      socket.nickname = req.name;

      var uuid = req.name;
      var timestamp = Date.parse(new Date());
      redis_client.set(uuid, timestamp);
      socket.join(req.room);
  });

  socket.on('message', function (data) {
  });

  socket.on('disconnect', function () {
  });

  socket.on('heartbeating', function (data) {
    var uuid = data.uuid;
    var now = Date.parse(new Date());
    redis_client.set(uuid, now);  
  });

  socket.on('noti_start', function (data) {
      var room,data;
      room = socket.room;
      socket.broadcast.to(room).emit("ctrl_start", data);
  });


  socket.on('noti_stop', function (data) {
      var room,data;
      room = socket.room;
      socket.broadcast.to(room).emit("ctrl_stop", data);
  });

  socket.on('noti_lottery_login', function (data) {
      var room;
      room = socket.room;
      socket.broadcast.to(room).emit("lottery_login", data);
  });

  socket.on('noti_lottery_start', function (data) {
      var room;
      room = socket.room;
      data.rand = math.random(10);
      socket.broadcast.to(room).emit("lottery_start", data);
  });

  socket.on('noti_lottery_stop', function (data) {
      var room;
      room = socket.room;
      socket.broadcast.to(room).emit("lottery_stop", data);
  });

  socket.on('noti_jak_start', function (data) {
      var room,data;
      room = socket.room;
      socket.broadcast.to(room).emit("ctrl_jak_start", data);
  });


  socket.on('noti_jak_option', function (data) {
      var room,data;
      room = socket.room;
      socket.broadcast.to(room).emit("ctrl_jak_option", data);
  });

  socket.on('noti_common_play', function (data) {
      var room,data;
      room = socket.room;
      socket.broadcast.to(room).emit("ctrl_common_play", data);
  });  

  socket.on('noti_time_play', function (data) {
      var room,data;
      room = socket.room;
      socket.broadcast.to(room).emit("ctrl_time_play", data);
  });

});
