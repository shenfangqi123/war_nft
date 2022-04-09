var exec = require('child_process').exec;
var redis_client = require('redis').createClient(6379,"118.25.231.17",{});
var _list;

redis_client.auth("jSZfi0psmKHONdWJFvVofTIy3OtIOS", function() {
    console.log("auth verified.");
});
redis_client.on('connect', function() {
    console.log('redis connected');
  
});


function execute(cmd){
    exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.error(error);
        }
        else{
            console.log("success");
        }
    });
}

function getRooms() {
    var _list;
    return new Promise((resolve, reject) => {
		redis_client.KEYS("*", function(err, res) {
		    if(res) {
		        var keys = Object.keys(res);
		        _list = [];
		        keys.forEach(function formUserData(key) {
		            var _user = null;
		            _list.push(res[key]);
		        });
		        resolve(_list);
		    } else {
		        console.log("getUsersInRedis ERR:" + err);
		        reject(err);
		    }
		});  
    });
}

function getRoomDetail(roomid) {
    var _list;
    console.log(roomid);
    return new Promise((resolve, reject) => {
        redis_client.HGETALL(roomid, function(err, res) {
            if(res) {
                //console.log(res);
                resolve(res);
            } else {
                console.log("getUsersInRedis ERR:" + err);
                reject(err);
            }
        });
    });
}

function removeRoom(roomid) {
    return new Promise((resolve, reject) => {
        redis_client.DEL(roomid, function (err, res) {
            if(err) {
                reject(err);
            } else {
                resolve(true);
            }
        });       
    });
}


function startProcess() {
	getRooms().then((result)=>{
	    var now = Date.now();
	    var room_wait_time, room_update_time;
	    var max_time = -1;
	    var choosen_key;

	    result.forEach((key)=>{
	        getRoomDetail(key).then((result)=>{
	    	    console.log("----------------:"+key);
	    	    //remove all timeout room
		        room_wait_time = (result.time_refresh - result.time_login);
		        room_update_time = (now - result.time_refresh);

	        	if(room_update_time > 2000) {
	        		removeRoom(key).then((result)=>{
	                    console.log("room removed:" + key);
	        		},(err)=>{
	        			console.log("remove room error:" + key);
	        		});
	        	} else if(room_update_time < 1000) {
	                var cmd = 'node warClient1.js '+key;
	                console.log(cmd);
	                execute(cmd);
	                //process.exit(0);

		        	//if(room_wait_time > max_time) {
		        	//	max_time = room_wait_time;
		        	//	choosen_key = key;
		        	//}
	            }

	        });
	    }, (err)=>{
	        console.log("ERR2:" + err);
	    })

	}, (err)=>{
	    console.log("ERR1:" + err);
	})
}

var ss = setInterval(startProcess,5000);

