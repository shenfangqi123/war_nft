//5秒でタイムアウト設定
var io = require('socket.io')({'pingInterval': 5000}).listen(4003);
var http = require('http');

/*
//protobuf sample1

var protobuf = require('protobufjs');
var pp = require("./acdata.js").AcWar;

let person = pp.AcwarMessage.create({ name: "Tomm", id: 28, email: "tom@email" });
console.log(person);
let buffer = pp.AcwarMessage.encode(person).finish();
let message = pp.AcwarMessage.decode(buffer);
console.log(buffer);
console.log(message);
*/


/*
//protobuf sample2

var acInfo = require("./acdata1.js")["AcWar"]["Info"];
var acAgent = require("./acdata1.js")["AcWar"]["Agent"];

var agent = acAgent.create({
    agentType: "base",
    mpx: 28,
    mpy: 28,
    life: 2000,
    groupKill: false,
    isHero: true,
    rot: 77,
    attackDura: 10,
    aid: "a001",
    role: "base",
    objectId: 1,
    actType: "move",
    size: 2,
    level: 1
});

var acInfoImp = new acInfo();
acInfoImp.base.push(agent);

console.log(acInfoImp);

var buffer = acInfo.encode(acInfoImp).finish();

console.log("------------");

console.log(buffer);

let message = acInfo.decode(buffer);

console.log("------------");

console.log(message);
*/

/*
userMode.base.push({
    agentType: "base",
    mpx: 28,
    mpy: 28,
    life: 2000,
    groupKill: false,
    isHero: true,
    rot: 77,
    attackDura: 10,
    aid: "a001",
    role: "base",
    objectId: 1,
    actType: "move",
    size: 2,
    level: 1
});
*/

//console.log(acProtobuf.Bases);
//console.log(acProtobuf.Info);

//let buffer = acProtobuf.Info.encode(info).finish();
//console.log(buffer);

/*
base1 = acProtobuf.Bases.create(
    { 
        agentType: "base", 
        mpx: 28, 
        mpy: 28,
        life: 2000,
                    
    }
);
acProtobuf.Bases.push(base1);

base2 = acProtobuf.Bases.create(
    { 
        agentType: "base", 
        mpx: 28, 
        mpy: 28,
        life: 3000,
                    
    }
);

console.log(base2);
*/

var cm = "ssss";

//var Box2D = require('box2dweb');
var Ste = require('./myWorld.js');
var Dict = require('./dictionary.js');
//var redis_client = require('redis').createClient(6379,"118.25.231.17",{});
var redis_client = require('redis').createClient(6379,"localhost",{});
redis_client.auth("jSZfi0psmKHONdWJFvVofTIy3OtIOS", function() {
    console.log("auth verified.");
});
redis_client.on('connect', function() {
    console.log('redis connected');
});

var USERS_PER_ROOM = 2;
var baseSpriteWidth = 30;

var gridWidthPx = 600, gridHeightPx = 960;
var gridPx = 30;

//Grid size in actual units
var gridWidth = gridWidthPx / gridPx;
var gridHeight = gridHeightPx / gridPx;


var sc = sc || {};

sc._redisOp = {
    propTimer:null,

    setRoomToRedis: function (roomid) {
        var now = Date.now();
        var _self = this;

        return new Promise((resolve, reject) => {
            redis_client.HMSET(roomid, ["time_login",now,"time_refresh",now],  function(err, res) {
                if(res) {
                    _self.propTimer = setInterval(function() {
                        now = Date.now();
                        _self.setRoomPropToRedis(roomid, "time_refresh", now).then((result)=>{
                            //console.log("update time_refresh "+roomid+"to redis");
                        });
                    }, 1000);

                    resolve(true);
                } else if(err) {
                    console.log("setRoomToRedis ERR:" + err);
                    reject(err);
                }
            });        
        });
    },

    setRoomPropToRedis: function(roomid, prop, value) {
        return new Promise((resolve, reject) => {
            redis_client.HSET(roomid, prop, value,  function(err, res) {
                if(err) {
                    console.log("setRoomStatusToRedis ERR:" + err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });        
        });
    },

    getUsersInRedis: function (roomid) {
        var _list;
        return new Promise((resolve, reject) => {
            redis_client.HGETALL(roomid, function(err, res) {
                if(res) {
                    var keys = Object.keys(res);
                    _list = [];
                    keys.forEach(function formUserData(key) {
                        var _user = null;
                        if(!key.startWith("room_")) {
                            var rowObj = JSON.parse(res[key]);
                            _list.push(rowObj);                            
                        }
                    });
                    resolve(_list);
                } else {
                    console.log("getUsersInRedis ERR:" + err);
                    reject(err);
                }
            });
        });
    },

    setUserToRedis: function (userObj, roomid) {
        return new Promise((resolve, reject) => {
            var userData = userObj.getUserInfo();
            var name = userData.name,
                nick = userData.nick,
                img = userData.img,
                loginOrder = userData.loginOrder,
                locX = userData.locX,
                locY = userData.locY,
                status = userData.status;
                userBase = userData.base;

            var infoStr = '{"img":'+img+',"loginOrder":'+loginOrder+',"name":"'+name+'","nick":"'+nick+'","posX":'+locX*baseSpriteWidth+', "posY":'+locY*baseSpriteWidth+', "locX":'+locX+', "locY":'+locY+', "status":'+status+', "userBase":"'+userBase+'"}';

            redis_client.HSET(roomid, name, infoStr, function(err, res) {
                if(err) {
                    console.log("setUserToRedis ERR:" + err);
                    reject(err);                    
                } else {
                    resolve(res);
                }
            });
        });
    },

    removeUserToRedis: function(userName, roomid) {
        return new Promise((resolve, reject) => {
            redis_client.HDEL(roomid, userName, function (err, res) {
                if(err) {
                    console.log("removeUserToRedis ERR:" + err);
                    reject(err);
                } else {
                    console.log("user "+ userName +" removed from redis room:" + roomid);
                    resolve(true);
                }
            });        
        })
    },

    removeMultiUsersToRedis: function(userArr, roomid) {
        return new Promise((resolve, reject) => {
            redis_client.HDEL(roomid, userArr, function (err, res) {
                if(err) {
                    console.log("removeMultiUsersToRedis ERR:" + err);
                    reject(err);
                } else {
                    console.log("users removed from redis room:" + roomid);
                    resolve(true);
                }
            });        
        })
    },

    removeRoomToRedis: function(roomid) {
        console.log("#################");
        console.log(this.propTimer);

        clearInterval(this.propTimer);
        return new Promise((resolve, reject) => {
            redis_client.DEL(roomid, function (err, res) {
                if(err) {
                    console.log("removeRoomToRedis ERR:" + err);
                    reject(err);
                } else {
                    console.log("room removed from redis:" + roomid);
                    resolve(true);
                }
            });       
        });
    },

    userCntToRedis: function(roomid) {
        return new Promise((resolve, reject) => {
            redis_client.HLEN(roomid, function(err, res) {
                if(err) {
                    console.log("userCntToRedis ERR:" + err);
                    reject(err);
                } else {
                    resolve(res-roomPropNum);
                }   
            })
        });
    },

    getPendingRoomInRedis: function() {
        return new Promise((resolve, reject) => {
            redis_client.KEYS("*", function(err, res) {
                var len = res.length;
                var cnt = 0;
                if(err) {
                    console.log("getPendingRoomInRedis ERR:" + err);
                    reject(err);
                } else {
                    if(len == 0) {
                        resolve("busy");
                    }
                    res.forEach(function (reply, index) {
                        //console.log("reply:" + reply);
                        //var _roomObj = mainSc.getRoomObject(reply);
                        //if(_roomObj.isRoomOpenForLogin()) {
                        //    resolve(reply);
                        //}

                        redis_client.HGET(reply, "room_status", function(err, res) {
                            cnt++;
                            if(res == 0 && !reply.startWith("wx_")) {
                                console.log("ssssssss111:"+reply);
                                resolve(reply);
                            } else if(cnt == len) {
                                resolve("busy");
                            }
                        })
                    });
                    //resolve("busy");
                }   
            })
        });
    },

    getPendingRoomInRedisWx: function(roomId) {
        return new Promise((resolve, reject) => {
            redis_client.KEYS("*", function(err, res) {
                var len = res.length;
                var cnt = 0;
                if(err) {
                    console.log("getPendingRoomInRedis ERR:" + err);
                    reject(err);
                } else {
                    if(len == 0) {
                        resolve("noFound");
                    }
                    res.forEach(function (reply, index) {
                        redis_client.HGET(reply, "room_status", function(err, res) {
                            cnt++;
                            console.log(roomId +"::"+ res +"::"+ reply);
                            if(res == 0 && reply==roomId) {
                                console.log("------------111:"+reply);
                                resolve(reply);
                            } else if(res !=0 && reply==roomId) {
                                console.log("------------222:"+reply);
                                resolve("busy");
                            } else if(cnt == len) {
                                console.log("------------333:"+reply);
                                resolve("noFound");
                            }
                        })
                    });
                }   
            })
        });
    }

}



sc.rand = function () {
    return Math.random() * 0xffffff;
};

sc.guid = {
    getGuid: function () { 
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);  
            return v.toString(16);  
        });
    }
};

sc._sendRequest = function(params, sb) {
      var rUrl = 'http://123.206.87.188:7443/index/setGold/?';
      var _keys = Object.keys(params);
      var paramStr ="";
      var options;

      _keys.forEach(function setParamStr(key) {
          paramStr += '&' + key + '=' + params[key];
      });
      paramStr = paramStr.substring(1);

      options = require('url').parse(rUrl+paramStr);

      http.get(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', sb);
      }).on('error', function(e) {
         console.log("ERR(func _sendRequest) Got error: " + e.message);
      });
};

/*
sc._Dictionary = {
    _keyMapTb: null,
    _valueMapTb: null,
    __currId: 0,

    init: function () {
        this._keyMapTb = {};
        this._valueMapTb = {};
        this.__currId = 2 << (0 | (Math.random() * 10));
    },

    __getKey: function () {
        this.__currId++;
        return "key_" + this.__currId;
    },

    setObject: function (value, key) {
        if (key == null)
            return;

        var keyId = this.__getKey();
        this._keyMapTb[keyId] = key;
        this._valueMapTb[keyId] = value;
    },

    objectForKey: function (key) {
        if (key == null)
            return null;

        var locKeyMapTb = this._keyMapTb;
        for (var keyId in locKeyMapTb) {
            if (locKeyMapTb[keyId] === key)
                return this._valueMapTb[keyId];
        }
        return null;
    },

    valueForKey: function (key) {
        return this.objectForKey(key);
    },

    removeObjectForKey: function (key) {
        if (key == null)
            return;

        var locKeyMapTb = this._keyMapTb;
        for (var keyId in locKeyMapTb) {
            if (locKeyMapTb[keyId] === key) {
                delete this._valueMapTb[keyId];
                delete locKeyMapTb[keyId];
                return;
            }
        }
    },

    removeObjectsForKeys: function (keys) {
        if (keys == null)
            return;

        for (var i = 0; i < keys.length; i++)
            this.removeObjectForKey(keys[i]);
    },

    allKeys: function () {
        var keyArr = [], locKeyMapTb = this._keyMapTb;
        for (var key in locKeyMapTb)
            keyArr.push(locKeyMapTb[key]);
        return keyArr;
    },

    removeAllObjects: function () {
        this._keyMapTb = {};
        this._valueMapTb = {};
    },

    count: function () {
        return this.allKeys().length;
    }
};
*/

String.prototype.startWith=function(str){
    var reg=new RegExp("^"+str);
    return reg.test(this);
};


// 定义一个判断函数
var in_array = function(arr){  
  // 不是数组则抛出异常
  if(!arr){
       console.log("ERR(in_array):Input is not an array");
  }
  // 遍历是否在数组中
  for(var i=0,k=arr.length;i<k;i++){
    if(this==arr[i]){
      return true;  
    }
  }
  // 如果不在数组中就会返回false
  return false;
}

// 给字符串添加原型
String.prototype.in_array = in_array;

/*
var extend = function(obj) {
    each(slice.call(arguments,1), function(source) {
        for(var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
};
*/

sc.room = function room() {
    return {
        _userSequences:null,
        _instanceId:sc.guid.getGuid(),
        _gameTimer:null,
        _roomid:-1, 

        _roomStatus:-1,   //-1:default, 0:opening for login, 1: in game(not opening)

        //Storage for the current agents and obstacles
        _agents:new Array(),
        _obstacles:new Array(),

        _ste:null,

        init : function() {
            //this._userSequences = Object.create(sc._Dictionary);
            this._userSequences = new Dict();
            this._userSequences.init();
        },

        // set all user status to 0(in game status)
        startGame : function() {
            var _allUsers = this.getAllUserObj();

            this.setRoomStart();
            sc._redisOp.removeRoomToRedis(this._roomid).then((result)=>{
                console.log(this._roomid + "room remove from waitting list");
            });

            _allUsers.forEach(function formKilledUser(user) {
                user.setUserStatusLiving();
            });
            this.ste = new Ste(gridWidth, gridHeight);
            this.ste.startGame(io, this._roomid);
        },

        setChar : function(data) {
            this.ste.cmdProcessor(data);
        },

        // waiting for player to login
        setRoomOpen : function() {
            this._roomStatus = 0;
        },

        // game already started
        setRoomStart : function() {
            this._roomStatus = 1;
        },

        // if last user then close the room 
        setRoomClose : function() {
            this._userSequences.init();
            this._roomStatus = 0;
            this.unsetBombTimer();
            this.ste.unsetSteerTimer();
        },

        isRoomOpenForLogin : function() {
            return this._roomStatus === 0;
        },

        isRoomActived : function() {
            return this._roomStatus === 1;
        },

        getLastUserIfExist : function() {
            var _allUsers = this.getAllUserObj(),
                _cnt=0,
                _livingUserObj;

            _allUsers.forEach(function formKilledUser(user) {
                // user is online
                if(user.isUserPlaying()) {
                    _cnt++;
                    _livingUserObj = user;
                }
            });

            // if only 1 user in the room, then he is the winner
            if(_cnt==1) {
                console.log("last user:"+_livingUserObj._name);
                //_livingUserObj.setWinBonus();
                
                //if only 1 user left, the other user can play.
                //this.setRoomClose();
                return _livingUserObj._name;
            }
            return false;
        },

        setRoomId : function(roomId) {
            this._roomid = roomId;
        },

        getRoomId : function(roomId) {
            return this._roomid;
        },

        /**
         * Shuffle
         * @param {Array} array
         * @param {Number} len
         */
        shuffle : function (array, len) {
            for (var i = len - 1; i >= 0; i--) {
                var j = 0 | (sc.rand() % (i + 1));
                var v = array[i];
                array[i] = array[j];
                array[j] = v;
            }
            return array;
        },

        setGameTimer : function () {
            var _self = this;
            var gameFps = 50;

            this._gameTimer = setInterval(function() {
            }, 1000/gameFps);
        },

        unsetBombTimer : function () {
            //if(this._gameTimer != null) {
            //    clearInterval(this._gameTimer);
            //}
        },

        getInstanceId : function() {
            return this._instanceId;
        },

        setUser : function(userData) {
            var _userObj = null,
                _username = userData.name,
                _usernick = userData.nick,
                _userimg = userData.img,
                _usersNum = this.usersNumInRoom()+1,
                _locX,locY,
                _readyStatus = 1;
            
            if(_usersNum == 1) {
                _locX = 0;
                _locY = 0;
            }
            else if(_usersNum == 2) {
                _locX = 14;
                _locY = 8;
            }
            else if(_usersNum == 3) {
                _locX = 14;
                _locY = 0;
            }
            else if(_usersNum == 4) {
                _locX = 0;
                _locY = 8;
            }

            console.log("set User :" + _username +":::"+ _userimg);
            // let user status to ready when login, it should be diffent in other game. user should be se to ready by theirs own will.
            // in h5 bombman game,set it to ready defaultly to reduce the login process. 
            _userObj = sc.user(_username, _usernick, _userimg, _readyStatus, _usersNum, _locX*gridPx, _locY*gridPx, _locX, _locY);
            
console.log("userObj img:"+_userimg+":::"+_userObj._img);

            this._userSequences.setObject(_userObj, _username);
        },

        getUser : function(userKey) {
            return this._userSequences.objectForKey(userKey);
        },

        removeUser : function(user) {
            this._userSequences.removeObjectForKey(user);
        },

        getUserCount : function() {
            return this._userSequences.count();
        },

        getAllUserInfo : function() {
            var _allkeys, _list=[];
            _allkeys = this._userSequences.allKeys();
            _self = this;
            _allkeys.forEach(function formUserData(key) {
                var _user = null;
                _user = _self._userSequences.objectForKey(key);
                _list.push(_user.getUserInfo());

console.log("list:"+_user.getUserInfo().name+":::"+_user.getUserInfo().img);

            });

            return _list;
        },

        getAllUserObj : function() {
            var _allkeys, _list=[];
            _allkeys = this._userSequences.allKeys();
            _self = this;
            _allkeys.forEach(function formUserData(key) {
                var _user = null;
                _user = _self._userSequences.objectForKey(key);
                _list.push(_user);
            });

            return _list;
        },

        usersNumInRoom : function() {
            return this._userSequences.count();
        },

        setUserGoldData:function(data) {
            var users = this.getAllUserObj();
            var usersGoldInfo = [];

            users.forEach(function setGold(user) {
                for(var j=0;j<data.length;j++) {
                    if(data[j].QID == user._name) {
                        user.setG1(data[j].G1);
                        user.setG2(data[j].G2);
                    }
                }

                usersGoldInfo.push(user.getUserGoldInfo());
            })

            console.log(this._roomid);
            console.log(usersGoldInfo);
            io.sockets.in(this._roomid).emit("gold",usersGoldInfo);

        },

        setGoldToServer : function(roomUserData) {
            var _usersList=[], 
                _requestParams = {};
            roomUserData.forEach(function setUserName(thisObj) {
                _usersList.push(thisObj.name);
            });

            _requestParams.qids = _usersList;
            _requestParams.type = 1;
            _requestParams.act = 0;

            var sb = function setGoldToData(dataStr) {
                var data = JSON.parse(dataStr);
                this.setUserGoldData(data);
            }.bind(this);

            sc._sendRequest(_requestParams, sb);
        }
    }
}

sc.user = function user(name,nick,img,status,loginOrder,posX,posY,locX,locY,G1,G2) {
    return {
        _name:name||null,
        _nick:nick||null,
        _img:img||null,
        _status:status||-1,
        _loginOrder:loginOrder||-1,
        _posX:posX||0,
        _posY:posY||0,
        _locX:locX||0,
        _locY:locY||0,
        _G1:G1||0,
        _G2:G2||0,
        _superTimer:null,

        setUserStatusLiving : function() {
            this._status = 0;
        },

        setUserStatusDead : function() {
            this._status = 2;
        },

        setUserStatusReady : function() {
            this._status = 1;
        },

        isUserLiving : function() {
            if(this._status == 0 || this._status == 1|| this._status == 3) {
                return true;
            }
            return false;
        },

        isUserPlaying : function() {
            if(this._status == 0 || this._status == 3) {
                return true;
            }
            return false;
        },

        setLoc : function(posX, posY, locX, locY) {
            this._posX = posX;
            this._posY = posY;
            this._locX = locX;
            this._locY = locY;
        },

        setG1 : function(val) {
            this._G1 = val;
        },

        setG2 : function(val) {
            this._G2 = val;
        },

        getLoc : function() {
            return {"locX":this._locX,"locY":this._locY};
        },

        getUserInfo:function() {
            return {
                "name":this._name,
                "nick":this._nick,
                "img":this._img,
                "status":this._status,
                "loginOrder":this._loginOrder,
                "posX":this._posX,
                "posY":this._posY,
                "locX":this._locX,
                "locY":this._locY
            };
        },

        getUserGoldInfo:function() {
            return {
                "name":this._name,
                "G1":this._G1,
                "G2":this._G2
            }
        },

        setWinBonus : function() {
            var  _requestParams = {};
            _requestParams.qids = this._name;
            _requestParams.type = 2;
            _requestParams.act = 0;

            var sb = function ret(dataStr) {
            }.bind(this);

            sc._sendRequest(_requestParams, sb);
        }
    }
};

sc.scene = {
    _roomSequences:null,
    _roomObj:null,

    init:function() {
        //this._roomSequences = Object.create(sc._Dictionary);
        this._roomSequences = new Dict();
        this._roomSequences.init();
        return true;
    },

    _getPendingRoom:function() {
        var _allkeys,
            _usernumInRoom;
        _allkeys = this._roomSequences.allKeys();
        
        // no rooms at all, then create room
        if(_allkeys.length == 0) {
            console.log("no keys");
            return false;
        }
        
        // users number less than USERS_PER_ROOM, then join this room
        for(var i=0;i<_allkeys.length;i++) {
            _roomObj = this.getRoomObject(_allkeys[i]);
            _usernumInRoom = _roomObj.getUserCount();
            if(_usernumInRoom<USERS_PER_ROOM && _roomObj.isRoomOpenForLogin()) {
                return _allkeys[i];
            }
        }

        // rooms are all occupied, then create room
        return false;

    },

    _createRoom:function(key, roomNode) {
        var _key,_thisroom;

        _thisroom = sc.room();
        _thisroom.init();
        _key = _thisroom.getInstanceId();
        _thisroom.setRoomId(_key);
        _thisroom.setRoomOpen();  // open this room for login.
        this._roomSequences.setObject(_thisroom, _key);

        sc._redisOp.setRoomToRedis(_key).then((result)=>{
            console.log("set key "+_key+"to redis");
        });

        return _key;
    },

    getRoomObject:function(key) {
        return this._roomSequences.objectForKey(key);
    },

    removeUserAndRoom:function(roomObj,userKey) {
        var roomid = roomObj.getRoomId();

        // if user already killed by bomb, then it is should not be removed again.
        if(roomObj.getUser(userKey) != null) {
            roomObj.removeUser(userKey);
            console.log("remove disconnect user:"+userKey);
        }

        if(roomObj.usersNumInRoom() == 0) {
            //roomObj.unsetBombTimer();
            this._roomSequences.removeObjectForKey(roomid);
            console.log("room "+roomid+ "was cleared.");
        }
 

    },

    removeEmptyRooms : function() {
        var _allkeys = this._roomSequences.allKeys();
        var _self = this;
        _allkeys.forEach(function clearRoom(key) {
            console.log("remove room key:"+key);

            var _room = null, _roomid;
            _room = _self._roomSequences.objectForKey(key);
            _roomid = _room.getRoomId();
            if(_room.usersNumInRoom() == 0) {
                //_room.unsetBombTimer();
                _self._roomSequences.removeObjectForKey(_roomid);
                console.log("room "+_roomid+ "was cleared.");
            }
        });
    },

    deployUserToRoom:function(userData) {
        var _roomkey,_roomObj;

        _roomkey = this._getPendingRoom();
        if(!_roomkey) {
            _roomkey = this._createRoom();
            console.log("create common room key is:" + _roomkey);
        } 

        console.log("now room key:" + _roomkey);

        if(userData.roomId != "") {
            _roomkey = userData.roomId;
            console.log("robot room key is:" + _roomkey);
        }

        _roomObj = this.getRoomObject(_roomkey);
        if(_roomObj == null) {
            console.log("no roomObj found for key:" + _roomkey);
            return false;
        }
        _roomObj.setUser(userData);

        //console.log("set img:"+userData.img);

        return _roomkey;
    }
};

var mainSc = sc.scene;
mainSc.init();

//タイムアウトを5秒に設定する
io.set('heartbeat timeout',5000);
io.set('heartbeat interval',5000);

chat = io.on('connection', function (socket) {
    socket.emit("connected");

    socket.on('test', function(req) {
        socket.emit("test", req);
    });

    socket.on('init', function(req) {
        var _roomid, _roomObj, _roomMap, _roomUserData, _isStart, _gameTimer;

        mainSc.removeEmptyRooms();
        _roomid = mainSc.deployUserToRoom(req);
        if(!_roomid) {
            return;
        }

        //_roomid = req.roomId==''?mainSc.deployUserToRoom(req):req.roomId;

        console.log("req_room:"+req.roomId);
        console.log("req_img:"+req.img);

        _roomObj = mainSc.getRoomObject(_roomid);

        socket.room = _roomid;
        socket.nickname = req.name;
        socket.roomObj = _roomObj;

        console.log("info:"+socket.room +":"+ socket.nickname + ":" + _roomid);
        socket.join(_roomid);

        _roomUserData = _roomObj.getAllUserInfo();

        _isStart = (_roomUserData.length==USERS_PER_ROOM)?true:false; 

        if(_isStart) {
            console.log("isStart1");
            _roomObj.startGame();
            //_roomObj.setGoldToServer(_roomUserData);
        }

        _roomUserData = _roomObj.getAllUserInfo();

        console.log(_roomUserData);
        console.log("users in room:" + _isStart);

        io.sockets.in(_roomid).emit("otherlogin",{"roomId":_roomid, "isStart":_isStart,"userData":_roomUserData});

        if(_isStart) {
            console.log("isStart2");
            _roomObj.setGameTimer();
        }
    });

    socket.on('cmd', function (data) {
        var _roomObj = socket.roomObj;
        _roomObj.setChar(data);
    });

/*
    socket.on('set nickname', function (name) {
        socket.nickname = name;
    });

    socket.on('chat', function (data) {
        var room,uname,data;
        console.log("chat:"+data);
        room = socket.room;
        uname = socket.nickname;
        socket.broadcast.to(room).emit("other","SA"+uname+":"+data);
    });
*/

    socket.on('disconnect', function (req) {
        var _roomid,_nick,_roomObj,_userObj,ret={};
        _roomid = socket.room;
        _nick = socket.nickname;
        _roomObj = socket.roomObj;

        if(!_roomObj) 
            return;

        _userObj = _roomObj.getUser(_nick);

        console.log(_nick+" disconnected in room "+_roomid);
        mainSc.removeUserAndRoom(_roomObj,_nick);
        sc._redisOp.removeRoomToRedis(_roomid);

        // if the last user, then no need to broadcast left action.
        if(mainSc.getRoomObject(_roomid) != null && _userObj != null) {
            ret.uname = _nick;
            ret.lastPlayer = _roomObj.getLastUserIfExist();
            io.sockets.in(_roomid).emit("left", ret);
        }
    });

});
