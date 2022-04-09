var express = require('express'),
    cluster = require('cluster'),
    net = require('net'),
    sio = require('socket.io'),
    sio_redis = require('socket.io-redis');

var port = 3000,
    num_processes = require('os').cpus().length;


if (cluster.isMaster) {
    var workers = [];
    var spawn = function(i) {
        workers[i] = cluster.fork();
        workers[i].on('exit', function(worker, code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });
    };

    for (var i = 0; i < num_processes; i++) {
        spawn(i);
    }

    var worker_index = function(ip, len) {
        if(ip=='::1') return 0;//for mac os x
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (ip[i] !== '.') {
                s += ip[i];
            }
        }


console.log("==========================");
        var rn = parseInt(4*Math.random());
console.log("pid:" + rn);

        return rn;
        //return Number(s) % len;
    };

    var server = net.createServer({ pauseOnConnect: true }, function(connection) {
        var worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send('sticky-session:connection', connection);
    }).listen(port);

} else {

    var app = new express();
    var server = app.listen(0, 'localhost'),
        io = sio(server);
    io.adapter(sio_redis({ host: '127.0.0.1', port: 6379 }));
    process.on('message', function(message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }
        server.emit('connection', connection);
        connection.resume();
    });

    
    //这里写你的业务代码
    io.on('connection', function (socket) {
        socket.emit("connected");

        socket.on('message', function (data) {
        });

        socket.on('init', function(req) {
            socket.room = req.room;
            socket.nickname = req.name;
            _roomid = req.room;

            console.log("info:"+socket.room +":"+ socket.nickname);
            socket.join(_roomid);
            
console.log("rrrr:" + _roomid)

            io.sockets.in(_roomid).emit("other",{"roomId": _roomid});
        });

        socket.on('test', function(req) {
            socket.emit("test", req);
        });
    });
}
