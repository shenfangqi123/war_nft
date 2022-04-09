//5秒でタイムアウト設定
var express = require('express'),
    cluster = require('cluster'),
    net = require('net'),
    sio = require('socket.io'),
    sio_redis = require('socket.io-redis'),
    https = require('https'),
    redis = require('redis');

var redis_client = redis.createClient();

redis_client.on('connect', function() {
  console.log('redis connected');
});


//var redis_client = redis.createClient();

var port = 4001;
    num_processes = require('os').cpus().length;

console.log("cpu nums:" + num_processes);

var USERS_PER_ROOM = 2;
var baseSpriteWidth = 50;
//room properties setting number. all propertise num - this = user number.
var roomPropNum = 2;

var wall2KillLimit = 2;


var sc = sc || {};
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

sc._redisOp = {
    setRoomToRedis: function (roomid) {
        return new Promise((resolve, reject) => {
            redis_client.HMSET(roomid, ["room_status","0","room_type","2"],  function(err, res) {
                if(res) {
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

var extend = function(obj) {
    each(slice.call(arguments,1), function(source) {
        for(var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
};


sc.room = function room() {
    return {
        _userSequences:null,
        _bombSequences:null,
        _bulletSequences:null,
        _instanceId:sc.guid.getGuid(),
        _bombTimer:null,
        _roomid:-1, 
        _mapDataArr: [
           [
                9,3,0,0,1,1,0,1,1,0,0,1,0,0,0,
                3,3,0,0,1,1,1,0,0,0,1,1,0,0,1,
                0,0,0,0,0,0,0,0,0,1,0,0,2,0,1,
                1,0,1,0,1,0,1,1,1,0,2,0,0,0,1,
                1,0,1,0,0,2,2,2,1,0,0,0,1,0,1,
                1,2,1,1,1,0,1,1,1,1,0,1,0,0,1,
                0,0,0,0,1,0,0,1,0,1,0,1,0,0,0,
                0,2,0,1,1,0,1,1,0,1,0,1,0,3,3,
                0,0,1,0,1,0,0,0,0,1,1,1,0,3,9
           ],
           [
                9,3,0,0,1,1,0,1,0,1,1,0,0,0,0,
                3,3,0,0,1,1,0,0,0,0,1,1,0,0,1,
                0,0,0,0,0,0,1,0,1,1,1,1,0,0,1,
                0,1,2,0,2,0,1,1,1,0,2,0,0,0,1,
                1,1,1,0,0,0,0,0,1,0,0,0,1,0,1,
                0,0,1,1,1,0,0,1,1,0,1,1,0,0,1,
                0,2,0,1,1,0,0,0,1,0,1,1,0,0,0,
                1,0,0,1,1,0,1,0,1,1,1,1,0,3,3,
                1,1,0,1,1,0,0,0,1,1,1,1,0,3,9
           ],
           [
                9,3,0,0,1,1,0,1,1,1,1,1,0,0,0,
                3,3,0,0,1,1,0,0,0,0,1,1,0,0,1,
                0,0,0,0,0,0,1,0,0,1,1,1,0,0,1,
                1,1,1,0,2,0,1,1,1,0,2,0,0,0,1,
                1,1,1,0,0,0,0,1,1,0,0,0,1,0,1,
                1,2,1,1,1,0,0,1,1,1,1,1,0,0,1,
                0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,
                1,1,0,1,1,0,1,1,1,1,1,1,0,3,3,
                0,1,0,1,1,0,0,0,1,1,1,1,0,3,9
           ],
           [
                9,3,0,0,1,1,0,1,1,1,1,1,0,0,0,
                3,3,0,0,1,1,0,1,0,0,1,1,0,0,1,
                0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,
                1,0,1,0,2,0,1,0,1,0,2,0,0,0,1,
                1,0,1,0,0,0,0,1,1,0,0,0,1,0,0,
                1,2,1,1,1,1,0,0,0,2,2,1,0,0,1,
                1,1,1,1,1,0,0,1,0,1,1,1,0,0,0,
                1,0,0,0,0,0,1,1,0,0,1,1,0,3,3,
                1,1,1,1,1,0,0,0,1,0,1,0,0,3,9
           ],
        ],
        // should be random 
        _mapInitData: [],

        //base on client xy cordination
        _userInitPos:[
            [2,0],
            [12,8],
            [14,0],
            [0,8],
        ],

        //base on server xy cordination, can be multiple
        _mapBasePos:[
            [0*15,4*15],
            [8*15+14],
            [],
            [],
        ],

        // should be random
        _itemsInMap : [0,0,0,1,1,1,1,2,2,2,3,3,3,4,4,4],
        _itemsInitData: [],
        _roomStatus:-1,   //-1:default, 0:opening for login, 1: in game(not opening)
        _redisOp:null,
        _wallAttaceRec: [],

        init : function() {
            this._mapInitData = this.shuffle(this._mapDataArr, this._mapDataArr.length)[0];
            this._userSequences = Object.create(sc._Dictionary);
            this._bombSequences = Object.create(sc._Dictionary);
            this._bulletSequences = Object.create(sc._Dictionary);
            this._userSequences.init();
            this._bombSequences.init();
            this._bulletSequences.init();
            this._itemsInitData = this.getRoomItems();
            this._redisOp = sc._redisOp;
        },

        resetUserSequences : function(reqData) {
            var _self = this;
            this._userSequences.init();
    
            reqData.forEach(function formUserData(data) {
                var rec = JSON.parse(data);
                var userBase = rec.userBase.split(",");
                var _userObj = sc.user(rec.name, rec.nick, rec.img, rec.status, rec.loginOrder, rec.posX, rec.posY, rec.locX, rec.locY,0, 0, userBase);
                _self._userSequences.setObject(_userObj, rec.name);
            });
        },

        // set all user status to 0(in game status)
        startGame : function() {
            var _allUsers = this.getAllUserObj();
            this.setRoomStart().then((result)=>{
                _allUsers.forEach(function formKilledUser(user) {
                    user.setUserStatusLiving();
                });
            }, (err)=>{
                console.log("startGame ERR:" + err);
            });
        },

        getItemsInitData : function() {
            return this._itemsInitData;
        },

        // waiting for player to login
        setRoomOpen : function() {
            this._roomStatus = 0;
        },

        // game already started
        setRoomStart : function() {
            var _self = this;
            return new Promise((resolve, reject) => {
                _self._redisOp.setRoomPropToRedis(_self._roomid, "room_status", 1).then((result)=>{
                    _self._roomStatus = 1;
                    resolve(true);
                }, (err)=>{
                    console.log("setRoomStart ERR:" + err);
                    reject(err);
                })
            });
        },

        // if last user then close the room 
        setRoomClose : function() {
            //this._userSequences.init();
            this._roomStatus = 0;
            this.unsetBombTimer();
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
                _livingUserObj.setWinBonus();
                this.setRoomClose();
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

        getMap : function() {
            var ret = {};
            ret.mapData = this._mapInitData;
            ret.itemsData = this._itemsInitData;
            return ret;
        },

        /**
         * Shuffle
         * @param {Array} array
         * @param {Number} len
         */
        shuffle:function (array, len) {
            for (var i = len - 1; i >= 0; i--) {
                var j = 0 | (sc.rand() % (i + 1));
                var v = array[i];
                array[i] = array[j];
                array[j] = v;
            }
            return array;
        },

        getRoomItems : function() {
            var items = this._itemsInMap,
                map = this._mapInitData,
                walls = [],
                ret =[];
            
            for(var i=0;i<map.length;i++) {
                if(map[i] == 1) {
                    walls.push(i);
                }
            }
            
            //ret = walls;
            ret = walls;

            return this._mergeItemPos(ret.slice(0,items.length));
        },

        //hide the items in the wall
        _mergeItemPos : function(posArr) {
            var ret =  [];

            for(var i=0;i<this._itemsInMap.length;i++) {
                var tmp = [posArr[i],this._itemsInMap[i]];
                ret.push(tmp);
            }
            return ret;
        },

        setBombTimer : function () {
            var _self = this;
            var cycle_cnt = 0;
            var gameStartTime =  Date.parse(new Date());


            // if 2 users in the same cpu process,  only 1 bomtTimer should startup.
            if(this._bombTimer == null) {

                this._bombTimer = setInterval(function() {
                    // if last user appear, stop the bomb procedure. to provide multi lastuser annouce to the clients.
                    var _allBombkeys,_current;
                    _current = Date.parse(new Date());
                    _allBombkeys = _self._bombSequences.allKeys();
                    _allBulletkeys = _self._bulletSequences.allKeys();

                    var game_cycle_delta = _current - gameStartTime;
                    if(game_cycle_delta > cycle_cnt*1000) {
                        cycle_cnt++;
//console.log("heart beating counter:" + cycle_cnt);
                        io.sockets.in(_self._roomid).emit("heart",{"counter":cycle_cnt});
                    }

                    _self._redisOp.getUsersInRedis(_self._roomid).then((result)=>{
                        var redisUsers = result;

                        _allBombkeys.forEach(function sendExplosion(key) {
                            var _bomb = null, _bombTime;
                            _bomb = _self._bombSequences.objectForKey(key);
                            _bombTime = _bomb.time;
                            if(_current - _bombTime > 5000) {
                                //if room is not available then do nothing,  put it here (instead of above) to avoid multi kill, that would
                                //cause multi respond model window in client.
                                if(!_self.isRoomActived()) 
                                    return;

                                //console.log("btime:" + _bomb.time)
                                _self.bombKill(_bomb);
                                //io.sockets.in(_self._roomid).emit("explore",bombRet);
                                _self.removeBomb(key);
                            }
                        });

                        //sync the user loc from redis to local
                        redisUsers.forEach(function formUser(user) {
                            var userObj = _self.getUser(user.name);
                            if(userObj != null) {
                                userObj.setLoc(user.posX, user.posY, user.locX, user.locY);
                                userObj.setUserStatusVal(user.status);
                            }
                        });

                        _allBulletkeys.forEach(function sendShoot(key) {
                            var _bullet;
                            _bullet = _self._bulletSequences.objectForKey(key);
                            _self.bulletKill(_bullet, redisUsers);
                            //_self.removeBullet(key);
                        });

                    }, (err)=> {
                        console.log("setBombTimer ERR-----:" + _self._roomid);
                        _self.setRoomClose();
                    });

                }, 150);

            }

        },

        laserKill :function(lasername, locX, locY, oPosX, oPosY, dir, owner) {
            var _laserAnchor={},
                _killList=[],
                posX,posY,
                _retKilled={},
                _bulletRange=[],
                _laserDir,
                _retLaserKilled = {"posX":0,"posY":0,"dir":2,"name":"","wall":[], "bomb":[], "player":[], "names":[],"lastPlayer":false};

            _retLaserKilled.name=lasername;
            _retLaserKilled.wall=[];
            _retLaserKilled.bomb=[];
            _retLaserKilled.player=[];
            _retLaserKilled.names=[];
            _retLaserKilled.bases=[];
            _retLaserKilled.posX=oPosX;
            _retLaserKilled.posY=oPosY;
            _retLaserKilled.dir=dir;
            _retLaserKilled.owner=owner;

            _laserDir = dir;
            posX = locX * baseSpriteWidth;
            posY = locY * baseSpriteWidth;

            while(_retLaserKilled.wall.length == 0) {
                if(_laserDir == 1) {
                    posX+=baseSpriteWidth; 
                }
                else if(_laserDir == 2) {
                    posY-=baseSpriteWidth; 
                }            
                else if(_laserDir == 3) {
                    posX-=baseSpriteWidth; 
                }
                else if(_laserDir == 4) {
                    posY+=baseSpriteWidth; 
                }

                if(posX < 0 || posX > 15*baseSpriteWidth || posY <0 || posY > 9*baseSpriteWidth) {
                    posX = posY = -1*baseSpriteWidth;
                    break;
                }

                _laserAnchor.x = posX/baseSpriteWidth;
                _laserAnchor.y = posY/baseSpriteWidth;

                this._setBombKilled(_laserAnchor.x, _laserAnchor.y, _retLaserKilled, owner);  
            }

            //if killed someone
            if(_retLaserKilled.names.length > 0) {
                _self.removeMultiUsers(_retLaserKilled.names).then((result)=>{
                    // set the user to death, but it is still in the room. wating for restart.
                    //user.setUserStatusDead();

                    var survived = [];
                    _self.getAllUserObj().forEach(function formKilledUser(user) {
                        var username = user._name;
                        if(!username.in_array(_retLaserKilled.names)) {
                            survived.push(user);
                        }
                    });

                    //console.log("-----------------------------");
                    //console.log(survived);

                    if(survived.length == 0) {
                        _self.setRoomClose();
                        _retLaserKilled.lastPlayer = "noone";
                    } else if(survived.length == 1) {
                        _self.setRoomClose();
                        _retLaserKilled.lastPlayer = survived[0]._name;
                    }

                    console.log("FUNC bulletKill:" + JSON.stringify(_retLaserKilled));
                    io.sockets.in(_self._roomid).emit("shine",_retLaserKilled);

                }, (err)=>{
                    console.log("laserKill ERR:"+err);
                });
            } 
            else if(_retLaserKilled.wall.length > 0) {
                io.sockets.in(_self._roomid).emit("shine",_retLaserKilled);
            }
            else if(posX == -1*baseSpriteWidth || posY == -1*baseSpriteWidth) {
                io.sockets.in(_self._roomid).emit("shine",_retLaserKilled);
            }

        },

        // almost same to laserKill except to kill length.
        fireKill :function(firename, locX, locY, oPosX, oPosY, dir, len, owner) {
            var _fireAnchor={},
                _killList=[],
                posX,posY,
                _retKilled={},
                _fireDir,
                _retFireKilled = {"posX":0,"posY":0,"dir":2,"name":"","wall":[], "bomb":[], "player":[], "names":[],"lastPlayer":false,"owner":""},
                _fireLength=1,
                _bombObjKey,
                _bombObj,
                _fireCounter=0;

            _retFireKilled.name=firename;
            _retFireKilled.wall=[];
            _retFireKilled.bomb=[];
            _retFireKilled.player=[];
            _retFireKilled.names=[];
            _retFireKilled.bases=[];
            _retFireKilled.posX=oPosX;
            _retFireKilled.posY=oPosY;
            _retFireKilled.dir=dir;
            _retFireKilled.owner=owner;

            _fireDir = dir;
            posX = locX * baseSpriteWidth;
            posY = locY * baseSpriteWidth;

            while(_retFireKilled.wall.length == 0) {
                if(_fireDir == 1) {
                    posX+=baseSpriteWidth; 
                }
                else if(_fireDir == 2) {
                    posY-=baseSpriteWidth; 
                }            
                else if(_fireDir == 3) {
                    posX-=baseSpriteWidth; 
                }
                else if(_fireDir == 4) {
                    posY+=baseSpriteWidth; 
                }

                if(posX < 0 || posX > 15*baseSpriteWidth || posY <0 || posY > 9*baseSpriteWidth) {
                    posX = posY = -1*baseSpriteWidth;
                    break;
                }
                if(_fireCounter > _fireLength) {
                    break;
                }
                _fireCounter++;

                _fireAnchor.x = posX/baseSpriteWidth;
                _fireAnchor.y = posY/baseSpriteWidth;

                this._setBombKilled(_fireAnchor.x, _fireAnchor.y, _retFireKilled, owner);  
            }

            if(_retFireKilled.bomb.length > 0) {
                _bombObjKey = "b_"+_retFireKilled.bomb[0][0]+"_"+_retFireKilled.bomb[0][1];
                this.removeBomb(_bombObjKey);
            }

            //if killed someone
            if(_retFireKilled.names.length > 0) {
                _self.removeMultiUsers(_retFireKilled.names).then((result)=>{
                    // set the user to death, but it is still in the room. wating for restart.
                    //user.setUserStatusDead();

                    var survived = [];
                    _self.getAllUserObj().forEach(function formKilledUser(user) {
                        var username = user._name;
                        if(!username.in_array(_retFireKilled.names)) {
                            survived.push(user);
                        }
                    });

                    console.log("111-----------------------------");
                    console.log(survived);

                    if(survived.length == 0) {
                        _self.setRoomClose();
                        _retFireKilled.lastPlayer = "noone";
                    } else if(survived.length == 1) {
                        _self.setRoomClose();
                        _retFireKilled.lastPlayer = survived[0]._name;
                    }

                    console.log("FUNC fireKill:" + JSON.stringify(_retFireKilled));
                    io.sockets.in(_self._roomid).emit("burn",_retFireKilled);

                }, (err)=>{
                    console.log("fireKill ERR:"+err);
                });
            } 
            else {
                io.sockets.in(_self._roomid).emit("burn",_retFireKilled);
            }
            //else if(posX == -1*baseSpriteWidth || posY == -1*baseSpriteWidth) {
            //    io.sockets.in(_self._roomid).emit("burn",_retFireKilled);
            //}

        },


        bulletKill :function(bulletObj, redisUsers) {
            var _bulletLength,
                _bulletAnchor={},
                _killList=[],
                _retKilled={},
                _bulletRange=[],
                _bulletDir,
                _retBulletKilled = {"posX":0,"posY":0,"name":"","wall":[], "bomb":[], "player":[], "names":[],"lastPlayer":false};

            _retBulletKilled.name=bulletObj.name;
            _retBulletKilled.wall=[];
            _retBulletKilled.bomb=[];
            _retBulletKilled.player=[];
            _retBulletKilled.names=[];
            _retBulletKilled.bases=[];
            
            _bulletDir = bulletObj.dir;
            _bulletLength = bulletObj.bLength;

            if(_bulletDir == 1) {
                bulletObj.posX+=baseSpriteWidth; 
            }
            else if(_bulletDir == 2) {
                bulletObj.posY-=baseSpriteWidth; 
            }            
            else if(_bulletDir == 3) {
                bulletObj.posX-=baseSpriteWidth; 
            }
            else if(_bulletDir == 4) {
                bulletObj.posY+=baseSpriteWidth; 
            }

            if(bulletObj.posX < 0 || bulletObj.posX > 15*baseSpriteWidth || bulletObj.posY <0 || bulletObj.posY > 9*baseSpriteWidth) {
                bulletObj.posX = bulletObj.posY = -1*baseSpriteWidth;
            }

            //_retBulletKilled.posX = bulletObj.posX;
            //_retBulletKilled.posY = bulletObj.posY;

            _bulletAnchor.x = bulletObj.posX/baseSpriteWidth;
            _bulletAnchor.y = bulletObj.posY/baseSpriteWidth;

            if(this._setBombKilled(_bulletAnchor.x, _bulletAnchor.y, _retBulletKilled, bulletObj.owner)) {
                //_bombRange.push(_bombAnchor.x+"_"+_bombAnchor.y);
            }

            //if killed someone
            if(_retBulletKilled.names.length > 0) {
                _self.removeMultiUsers(_retBulletKilled.names).then((result)=>{
                    // set the user to death, but it is still in the room. wating for restart.
                    //user.setUserStatusDead();

                    var survived = [];
                    _self.getAllUserObj().forEach(function formKilledUser(user) {
                        var username = user._name;
                        if(!username.in_array(_retBulletKilled.names)) {
                            survived.push(user);
                        }
                    });

                    console.log("-----------------------------");
                    console.log(survived);
                        
                    if(survived.length == 0) {
                        _self.setRoomClose();
                        _retBulletKilled.lastPlayer = "noone";
                    } else if(survived.length == 1) {
                        _self.setRoomClose();
                        _retBulletKilled.lastPlayer = survived[0]._name;
                    }

                    console.log("FUNC bulletKill:" + JSON.stringify(_retBulletKilled));
                    io.sockets.in(_self._roomid).emit("shoot",_retBulletKilled);

                }, (err)=>{
                    console.log("bulletKill ERR:"+err);
                });
            } 
            else if(_retBulletKilled.wall.length > 0) {
                _self.removeBullet(_retBulletKilled.name);                    
                io.sockets.in(_self._roomid).emit("shoot",_retBulletKilled);
            }
            else if(bulletObj.posX == -1*baseSpriteWidth || bulletObj.posY == -1*baseSpriteWidth) {
                _self.removeBullet(bulletObj.name);
                io.sockets.in(_self._roomid).emit("shoot",_retBulletKilled);
            }

        },

        bombKill : function(bombObj) {
            var _bombLength,
                _bombAnchor={},
                _killList=[],
                _retKilled={},
                _bombRange=[],
                _retBombKilled = {"owner":"", "bomb":"","wall":[], "bomb":[], "player":[], "names":[],"lastPlayer":false};

            _retBombKilled.name=bombObj.name;
            _retBombKilled.wall=[];
            _retBombKilled.bomb=[];
            _retBombKilled.player=[];
            _retBombKilled.names=[];
            _retBombKilled.bases=[];
            //fire lenght of the bomb.
            _bombLength = bombObj.bLength;
            _retBombKilled.owner=bombObj.owner;

            if(bombObj.posX%baseSpriteWidth>0 || bombObj.posY%baseSpriteWidth>0) {
                console.log("ERR(bombKill):invalid bomb position:"+bombObj.posX +"-"+ bombObj.posY);
                return false;
            }
            _bombAnchor.x = bombObj.posX/baseSpriteWidth;
            _bombAnchor.y = bombObj.posY/baseSpriteWidth;

            var exploPt,
                upEnd=downEnd=leftEnd=rightEnd=false;

            _self._redisOp.getUsersInRedis(_self._roomid).then((result)=>{
                var redisUsers = result;

                //sync the user loc from redis to local
                redisUsers.forEach(function formKilledUser(user) {
                    var userObj = _self.getUser(user.name);
                    if(userObj != null) {
                        userObj.setLoc(user.posX, user.posY, user.locX, user.locY);
                    }
                });

                upEnd=downEnd=leftEnd=rightEnd=false;

                if(this._setBombKilled(_bombAnchor.x, _bombAnchor.y, _retBombKilled)) {
                    //_bombRange.push(_bombAnchor.x+"_"+_bombAnchor.y);
                }

                for(var i=1;i<=_bombLength;i++) {
                    if(!rightEnd && this._setBombKilled((_bombAnchor.x+i), _bombAnchor.y, _retBombKilled)) {
                        rightEnd = true;
                    }

                    if(!leftEnd && this._setBombKilled((_bombAnchor.x-i), _bombAnchor.y, _retBombKilled)) {
                        leftEnd = true;
                    }

                    if(!upEnd && this._setBombKilled(_bombAnchor.x, (_bombAnchor.y+i), _retBombKilled)) {
                        upEnd = true;
                    }

                    if(!downEnd && this._setBombKilled(_bombAnchor.x, (_bombAnchor.y-i), _retBombKilled)) {
                        downEnd = true;
                    }
                }

                console.log("kill names array:");
                console.log(_retBombKilled.names);
                console.log(_retBombKilled.bases);

                //if killed someone
                if(_retBombKilled.names.length > 0) {
                    _self.removeMultiUsers(_retBombKilled.names).then((result)=>{
                        // set the user to death, but it is still in the room. wating for restart.
                        //user.setUserStatusDead();

                        var survived = [];
                        redisUsers.forEach(function formKilledUser(user) {
                            var username = user.name;
                            if(!username.in_array(_retBombKilled.names)) {
                                survived.push(user);
                            }
                        });

                        console.log("-----------------------------");
                        console.log(survived);
                        console.log(_self._userSequences);
                        
                        if(survived.length == 0) {
                             _self.setRoomClose();
                            _retBombKilled.lastPlayer = "noone";
                        } else if(survived.length == 1) {
                            _self.setRoomClose();
                            _retBombKilled.lastPlayer = survived[0].name;
                        }

                        console.log("FUNC bombKill:" + JSON.stringify(_retBombKilled));
                        io.sockets.in(_self._roomid).emit("explore",_retBombKilled);

                    }, (err)=>{
                        console.log("_setBombKilled ERR:"+err);
                    });
                } else {
                    io.sockets.in(_self._roomid).emit("explore",_retBombKilled);                
                }

            }, (err)=>{
                console.log("bombKill ERR:" + err);
            });
        },

        _baseKilled : function(baseArr, x, y) {
            var hv = -1;
            var vv = -1;

            for(var i=0;i<baseArr.length;i++) {
                vv = parseInt(baseArr[i]/15);
                hv = baseArr[i]%15;
                console.log(hv +"##############"+ vv);

                if(x == hv && y == vv) {
                    return true;
                }
            }

            return false;
        },

        _setBombKilled : function(x, y, retBombKilled, notKillOwner="") {
            var _allUsers = this.getAllUserObj(),
                _self = this,
                bombObjKey;

            if(_allUsers === undefined) {
                console.log("ERR(_isItemkilled):allUsers shouldn't be undefined");
                return false;
            }

            if(x<0||y<0||x>=15||y>=9) {
                return false;
            }


            bombObjKey = "b_"+x+"_"+y;
            if(_self._bombSequences.objectForKey(bombObjKey) != null) {
                retBombKilled.bomb.push([x,y]);
            };

            //if the fence wall, count the hit number, if over the limit, then destroy.
            if(this._mapInitData[y*15+x] == 3) {
                var spriteName = "s_"+y+"_"+x;
                var cnt = 0;
                if(this._wallAttaceRec.hasOwnProperty(spriteName)) {
                    cnt = this._wallAttaceRec[spriteName];
                    cnt ++;
                    this._wallAttaceRec[spriteName] = cnt;
                } else {
                    this._wallAttaceRec[spriteName] = 0;
                }

                if(cnt >= wall2KillLimit) {
                    this._mapInitData[y*15+x] = 0;
                }

                retBombKilled.wall.push([x,y,3,cnt]);
                return true;
            }

            //if the wall, then clear the wall.
            if(this._mapInitData[y*15+x] == 1) {
                this._mapInitData[y*15+x] = 0;
                retBombKilled.wall.push([x,y,1,0]);
                return true;
            }

            //if the wall, then clear the wall.
            if(this._mapInitData[y*15+x] == 2) {
                retBombKilled.wall.push([x,y,2,0]);
                return true;
            }

            _allUsers.forEach(function formKilledUser(user) {
                // user inside bomb range shall be killed
                var userBase = user._base;
                if(_self._baseKilled(userBase, x, y)) {
                    retBombKilled.bases.push([x,y]);                    
                }

                if(notKillOwner!="") {
                    if(_self._baseKilled(userBase, x, y) || ((user._locX == x && user._locY == y) && !user.isSuperUserStatus() && notKillOwner!=user._name)) {
                        console.log("killed:"+user._locX +"--"+ user._locY);
                        retBombKilled.player.push([x,y]);
                        retBombKilled.names.push(user._name);
                    }
                } else if(_self._baseKilled(userBase, x, y) || ((user._locX == x && user._locY == y) && !user.isSuperUserStatus())) {
                    console.log("killed:"+user._locX +"--"+ user._locY);
                    retBombKilled.player.push([x,y]);
                    retBombKilled.names.push(user._name);
                }
            });

            return false;
        },

        unsetBombTimer : function () {
            if(this._bombTimer != null) {
                console.log('unset bombtimmer : Worker server started on (ID: %d, PID: %d)', cluster.worker.id, cluster.worker.process.pid);
                console.log("bomb timer cleared.---------------------------");
                clearInterval(this._bombTimer);
            }
        },

        getInstanceId : function() {
            return this._instanceId;
        },

        setInstanceId : function(key) {
            this._instanceId = key;
        },        

        setUser : function(userData) {
            var _userObj = null,
                _username = userData.name,
                _usernick = userData.nick,
                _userimg = userData.img,
                //whether user has a base. if has, user dead when base get destroyed.
                _userBase = [],
                _usersNum = this.usersNumInRoom()+1,
                _locX,locY,
                _readyStatus = 1;

            var myobj = this;

            return new Promise((resolve, reject) => {

                myobj._redisOp.userCntToRedis(myobj._roomid).then((result)=>{
                    _usersNum = result+1;
                    console.log("userCnt in Redis:" + _usersNum);

                    if(_usersNum == 1) {
                        _locX = myobj._userInitPos[0][0];
                        _locY = myobj._userInitPos[0][1];
                        _userBase = myobj._mapBasePos[0]
                    }
                    else if(_usersNum == 2) {
                        _locX = myobj._userInitPos[1][0];
                        _locY = myobj._userInitPos[1][1];
                        _userBase = myobj._mapBasePos[1]
                    }
                    else if(_usersNum == 3) {
                        _locX = myobj._userInitPos[2][0];
                        _locY = myobj._userInitPos[2][1];
                        _userBase = myobj._mapBasePos[2]
                    }
                    else if(_usersNum == 4) {
                        _locX = myobj._userInitPos[3][0];
                        _locY = myobj._userInitPos[3][1];
                        _userBase = myobj._mapBasePos[3]
                    }

                    console.log("set User :" + _username +":::"+ _userimg);

                    // let user status to ready when login, it should be diffent in other game. user should be se to ready by theirs own will.
                    // in h5 bombman game,set it to ready defaultly to reduce the login process. 
                    _userObj = sc.user(_username, _usernick, _userimg, _readyStatus, _usersNum, _locX*baseSpriteWidth, _locY*baseSpriteWidth, _locX, _locY, 0, 0, _userBase);

                    console.log("userObj img:"+_userimg+":::"+_userObj._img);

                    myobj._redisOp.setUserToRedis(_userObj, myobj._roomid).then((result)=>{
                        myobj._userSequences.setObject(_userObj, _username);
                        resolve(true);
                    }, (err)=> {
                        console.log("setUser ERR1:"+err);
                        reject(err);
                    }); 

                }, (err)=>{
                    console.log("setUser ERR2:"+err);
                    reject(err);
                });
            });
        },

        getUser : function(userKey) {
            return this._userSequences.objectForKey(userKey);
        },

        setBomb : function(bombData) {
            var _bombObj = null,
                _bombname = bombData.name;
            
            _bombObj = {"owner":bombData.owner, "name":_bombname,"type":0, "time":Date.parse(new Date()),"posX":bombData.posX,"posY":bombData.posY,"bType":bombData.bType,"bLength":bombData.bLength};
            console.log("set Bomb :" + _bombObj.time);
            this._bombSequences.setObject(_bombObj, _bombname);
        },

        setLaser : function(laserData) {
            var _laserObj = null;

            var vx = laserData.posX/baseSpriteWidth;
            var vy = laserData.posY/baseSpriteWidth;
            var dir = laserData.dir;

            var ret = this.getCollideWallPos(vx, vy, dir);

            laserData["toPosX"] = ret[0];
            laserData["toPosY"] = ret[1];

            return laserData;
        },

        setBullet : function(bulletData) {
            var _bulletObj = null,
                _bulletname = bulletData.name;
            
            _bulletObj = {"owner":bulletData.owner, "name":_bulletname,"type":0, "dir":bulletData.dir, "time":Date.parse(new Date()),"posX":bulletData.posX,"posY":bulletData.posY,"bType":bulletData.bType,"bLength":bulletData.bLength};
            console.log("set Bullet :" + _bulletObj.time);
            this._bulletSequences.setObject(_bulletObj, _bulletname);


            var vx = _bulletObj.posX/baseSpriteWidth;
            var vy = _bulletObj.posY/baseSpriteWidth;
            var dir = bulletData.dir;

            var ret = this.getCollideWallPos(vx, vy, dir);

            bulletData["toPosX"] = ret[0];
            bulletData["toPosY"] = ret[1];

            return bulletData;
        },

        getCollideWallPos : function(x, y, dir) {
            while(x >= 0 && y >= 0 && x < 15 && y < 9) {
                if(dir == 1) {
                    x++;
                }
                else if(dir == 2) {
                    y--;
                }                
                else if(dir == 3) {
                    x--;
                }                
                else if(dir == 4) {
                    y++;
                }

                if(this._mapInitData[y*15+x] == 3 || this._mapInitData[y*15+x] == 2 || this._mapInitData[y*15+x] == 1) {
                    return [x*baseSpriteWidth, y*baseSpriteWidth];
                }
            }

            //if out of the border then make it right.
            x<0 && x++;
            x>14 && x--;
            y<0 && y++;
            y>9 && y--;

            return [x*baseSpriteWidth, y*baseSpriteWidth];
        },

        removeUser : function(user) {
            var _self = this;
            return new Promise((resolve, reject) => {
                _self._redisOp.removeUserToRedis(user, _self._roomid).then((result)=>{
                    _self._userSequences.removeObjectForKey(user);
                    resolve(true);
                }, (err)=>{
                    console.log("removeUser ERR:" + err);
                    reject(err);
                });
            });
        },

        removeMultiUsers : function(userArr) {
            var _self = this;
            return new Promise((resolve, reject) => {
                _self._redisOp.removeMultiUsersToRedis(userArr, _self._roomid).then((result)=>{
                    //_self._userSequences.removeObjectForKey(user);
                    userArr.forEach(function removeLocal(user) {
                        _self._userSequences.removeObjectForKey(user);
                        console.log("removed user to redis:" + user);
                        console.log("local user cnt:" + _self.getUserCount());
                    })
                    resolve(true);
                }, (err)=>{
                    console.log("removeUser ERR:" + err);
                    reject(err);
                });
            });
        },

        removeBomb : function(bomb) {
            this._bombSequences.removeObjectForKey(bomb);
        },

        removeBullet : function(bullet) {
            this._bulletSequences.removeObjectForKey(bullet);
        },

        getUserCount : function() {
            return this._userSequences.count();
        },

        getBombCount : function() {
            return this._bombSequences.count();
        },

        getAllUserInfo : function() {
            var _allkeys, _list=[];
            _allkeys = this._userSequences.allKeys();
            _self = this;
            _allkeys.forEach(function formUserData(key) {
                var _user = null;
                _user = _self._userSequences.objectForKey(key);
                _list.push(_user.getUserInfo());
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
            //console.log(usersGoldInfo);
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

            //sc._sendRequest(_requestParams, sb);
        }
    }
}


sc.user = function user(name,nick,img,status,loginOrder,posX,posY,locX,locY,G1,G2,base) {
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
        _base:base||[],
        _superTimer:null,

        setUserStatusVal : function(val) {
            this._status = val;
        },

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

        isSuperUserStatus : function() {
            return this._status == 3;
        },

        cancelUndead : function(roomid) {
            var _self = this;

            if(this._status == 3) 
                this._status = 0;

            sc._redisOp.setUserToRedis(_self, roomid).then((result)=>{
                console.log("cancelUndead OK");
            }, (err)=> {
                console.log("cancelUndead ERR:"+err);
            }); 
        },

        setUndead : function(roomid) {
            var _self = this;

/*
            //only user is living
            if(this.isUserPlaying())
                this._status = 3;
            else 
                return;
*/

            this._status = 3;

            clearTimeout(_self._superTimer);

            var fun = function() {
                _self.cancelUndead(roomid);
                io.sockets.in(roomid).emit("candead",{"name":_self._name});
            }

            sc._redisOp.setUserToRedis(_self, roomid).then((result)=>{
                _self._superTimer = setTimeout(fun, 10000);
            }, (err)=> {
                console.log("setUndead ERR:"+err);
            }); 
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
                "locY":this._locY,
                "base":this._base,
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

            //sc._sendRequest(_requestParams, sb);
        }
    }
};

sc.scene = {
    _roomSequences:null,
    _serverNo:-1,
    _redisOp:null,

    init:function() {
        this._roomSequences = Object.create(sc._Dictionary);
        this._roomSequences.init();
        this._redisOp = sc._redisOp;
        return true;
    },

    _createRoom:function(key, roomNode) {
        var _key,_thisroom;

        _thisroom = sc.room();
        _thisroom.init();
        console.log("create room for local:" + key);
        _thisroom.setRoomId(key);
        _thisroom.setRoomOpen();  // open this room for login.
        this._roomSequences.setObject(_thisroom, key);
    },

    _createRoomRedis:function(roomId) {
        var _key,_thisroom;
        var _self = this;

        return new Promise((resolve, reject) => {
            _thisroom = sc.room();
            _thisroom.init();
            if(!roomId) {
                _key = _thisroom.getInstanceId();
            } else {
                _key = roomId;
                _thisroom.setInstanceId(_key);
            }

            console.log("to create room to redis redis:" + _key);

            _self._redisOp.setRoomToRedis(_key).then((result)=>{
                _thisroom.setRoomId(_key);
                _thisroom.setRoomOpen();  // open this room for login.
                _self._roomSequences.setObject(_thisroom, _key);
                resolve(_key);
            }, (err)=>{
                console.log("_createRoom ERR:" + err);
                reject(err);
            });
        }); 
    },

    getRoomObject:function(key) {
        return this._roomSequences.objectForKey(key);
    },

    removeUserAndRoom:function(roomObj,userKey) {
        var roomid = roomObj.getRoomId();
        var _self = this;

        return new Promise((resolve, reject) => { 
             // if user already killed by bomb, then it is should not be removed again.
            if(roomObj.getUser(userKey) != null) {
                roomObj.removeUser(userKey).then((result)=>{
                    console.log("user cnt:" + roomObj.usersNumInRoom());

                    _self._redisOp.getUsersInRedis(roomid).then((result)=>{
                        if(result.length == 0) {
                            roomObj.setRoomClose();
                            _self.removeRoomToSeqAndRedis(roomid);
                            resolve("noone");
                        } else if(result.length == 1) {
                            roomObj.setRoomClose();
                            resolve(result[0].name);
                        } else {
                            resolve("");
                        }
                    }, (err)=>{
                        console.log("removeUserAndRoom ERR1:" + err);
                        reject(err);
                    })

                }, (err)=>{
                    console.log("removeUserAndRoom ERR2:" + err);
                    reject(err);
                });

            } else {  // if user A got killed by bomb, user B then left, then user A left as null , in this case should remove room too.

                _self._redisOp.getUsersInRedis(roomid).then((result)=>{
                    if(result.length == 0) {
                        roomObj.setRoomClose();
                        _self.removeRoomToSeqAndRedis(roomid);
                        resolve("noone");
                    } else if(result.length == 1) {
                        roomObj.setRoomClose();
                        resolve(result[0].name);
                    } else {
                        resolve("");
                    }
                }, (err)=>{
                    console.log("removeUserAndRoom ERR3:" + err);
                    reject(err);
                })

            }
        });
    },

    removeEmptyRooms : function() {
        var _allkeys = this._roomSequences.allKeys();
        var _self = this;
        _allkeys.forEach(function clearRoom(key) {
            console.log("room key:"+key);

            var _room = null, _roomid;
            _room = _self._roomSequences.objectForKey(key);
            _roomid = _room.getRoomId();
            if(_room.usersNumInRoom() == 0) {
                _room.unsetBombTimer();
                _self.removeRoomToSeqAndRedis(_roomid);
                //_self._roomSequences.removeObjectForKey(_roomid);
            }
        });
    },

    removeRoomToSeqAndRedis : function(roomid) {
        var _self = this;
        this._redisOp.removeRoomToRedis(roomid).then((result)=>{
            _self._roomSequences.removeObjectForKey(roomid);
            console.log("room "+roomid+ " was cleared.");
        }, (err)=>{
            console.log("removeRoomToSeqAndRedis ERR:" + err);
        })
    },


    deployUserToRoom:function(userData, roomId) {
        var _roomkey,_roomObj;
        var _self = this;
        var _roomkey;

        if(roomId) {

            return new Promise((resolve, reject) => {

                _self._redisOp.getPendingRoomInRedisWx(roomId).then((result)=>{
                    _roomkey = result;
                    if(result == "busy") {
                        console.log("wx room is busy.");

                        resolve("wxRoomBusy");
                    } else if(result == "noFound") {
                        console.log("wx room doesnt exist.");

                        _self._createRoomRedis(roomId).then((roomkey)=>{
                            _roomObj = _self.getRoomObject(roomkey);
                            _roomObj.setUser(userData).then((result)=>{
                                resolve(roomkey);
                            }, (err)=>{
                                console.log("deployUserToRoom ERR1:" + err)
                                reject(err);
                            });
                        }, (err)=>{
                            console.log("deployUserToRoom ERR2:" + err)
                            reject(err);
                        });
                    } else {
                        console.log("joined in the room:" + _roomkey);

                        _self._createRoom(_roomkey);
                        _roomObj = _self.getRoomObject(_roomkey);
                        _roomObj.setUser(userData).then((result)=>{
                            resolve(_roomkey);
                        }, (err)=>{
                            console.log("deployUserToRoom ERR3:" + err)
                            reject(err);
                        });
                    }
                }, (err)=>{
                    console.log("deployUserToRoom ERR4:" + err);
                });
            });

        } else {

            return new Promise((resolve, reject) => {
                _self._redisOp.getPendingRoomInRedis().then((result)=>{
                    _roomkey = result;
                    if(result == "busy") {
                        console.log("all rooms are busy");
                        _self._createRoomRedis(roomId=false).then((roomkey)=>{
                            _roomObj = _self.getRoomObject(roomkey);
                            _roomObj.setUser(userData).then((result)=>{
                                resolve(roomkey);
                            }, (err)=>{
                                console.log("deployUserToRoom ERR1:" + err)
                                reject(err);
                            });
                        }, (err)=>{
                            console.log("deployUserToRoom ERR2:" + err)
                            reject(err);
                        });
                    } else {
                        console.log("joined in the room:" + _roomkey);

                        _self._createRoom(_roomkey);
                        _roomObj = _self.getRoomObject(_roomkey);
                        _roomObj.setUser(userData).then((result)=>{
                            resolve(_roomkey);
                        }, (err)=>{
                            console.log("deployUserToRoom ERR3:" + err)
                            reject(err);
                        });
                    }
                }, (err)=>{
                    console.log("deployUserToRoom ERR4:" + err);
                });
            });
        }

    }


};

var mainSc;
mainSc = sc.scene;
mainSc.init();

//タイムアウトを5秒に設定する
//sio.set('heartbeat timeout',5000);
//sio.set('heartbeat interval',5000);

var myobj = this;

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
        //if(ip=='::1') return 0;//for mac os x
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (ip[i] !== '.') {
                s += ip[i];
            }
        }

        var rn = parseInt(num_processes*Math.random());

        //rn = 1;
        return rn;
        //return Number(s) % len;
    };

    var server = net.createServer({ pauseOnConnect: true }, function(connection) {
        myobj.myServerNo = worker_index(connection.remoteAddress, num_processes);

        console.log("server no:" + myobj.myServerNo);

        var worker = workers[myobj.myServerNo];
        worker.send('sticky-session:connection', connection);
    }).listen(port);

} else {

    var app = new express();
    
    var server = app.listen(0, 'localhost');

    var io = sio(server);
    io.adapter(sio_redis({ host: '127.0.0.1', port: 6379 }));
    process.on('message', function(message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }
        server.emit('connection', connection);
        connection.resume();
    });

    var game = io.on('connection', function (socket) {
        socket.emit("connected");

        socket.on('test', function(req) {
            socket.emit("test", req);
        });

        socket.on('init', function(req) {
            var _roomObj = socket.roomObj,
                _nick = req.name;

            //if game restart, remove user and room from redis
            if(_roomObj) {
                var _userObj = _roomObj.getUser(_nick);
                _roomObj.unsetBombTimer();

                console.log(_nick+" disconnected in room "+_roomObj._roomid);
                mainSc.removeUserAndRoom(_roomObj, _nick).then((result)=>{
                    console.log("room " + _roomObj._roomid + " was cleared.");
                }, (err)=>{
                    console.log("socket disconnect ERR:" + err);
                });
            }

            var _roomid, _roomObj, _roomMap, _roomUserData, _isStart, _bombTimer;
            console.log('Worker server started on (ID: %d, PID: %d)', cluster.worker.id, cluster.worker.process.pid);

            //_roomid = req.roomId==''?mainSc.deployUserToRoom(req):req.roomId;

            console.log("req_room:"+req.roomId);
            console.log("req_img:"+req.img);

            //mainSc.removeEmptyRooms();
            //if has a specific roomId means from Wx client
            mainSc.deployUserToRoom(req, req.roomId).then((result)=>{
                if(result == "wxRoomBusy") {
                    console.log("send busy emit msg.......")
                    io.sockets.in(_roomid).emit("wxRoomBusy",{"roomId":_roomid});                    
                } else {
                    _roomid = result;
                    console.log("roomid:" + _roomid);

                    _roomObj = mainSc.getRoomObject(_roomid);

                    socket.room = _roomid;
                    socket.nickname = req.name;
                    socket.roomObj = _roomObj;

                    console.log("info:"+socket.room +":"+ socket.nickname + ":" + _roomid);
                    socket.join(_roomid);

                    redis_client.HGETALL(_roomid, function(err, reply){
                        console.log("room info:"+reply);    

                        var keys = Object.keys(reply);
                        _list = [];
                        keys.forEach(function formUserData(key) {
                            var _user = null;
                            if(!key.startWith("room_")) {
                                _user = reply[key];
                                _list.push(_user);                            
                            }
                        });

                        _roomUserData = _list;

                        _roomMap = _roomObj.getMap();
                        _isStart = (_roomUserData.length==USERS_PER_ROOM)?true:false; 

                        console.log("users in room:" + _isStart);
                        console.log('{"roomId":_roomid, "isStart":'+_isStart+',"userData":'+_roomUserData+',"map":'+JSON.stringify(_roomMap)+'}');

                        io.sockets.in(_roomid).emit("otherlogin",{"roomId":_roomid, "isStart":_isStart,"userData":_roomUserData,"map":_roomMap});
                    });                    
                }
            }, (err)=>{
                console.log("mainSc.deployUserToRoom ERR:"+err);
            });

        });

        socket.on('set nickname', function (name) {
            socket.nickname = name;
        });

        socket.on('syncWalls', function (data) {
            console.log("-------syncWalls--------");
            console.log(data);
            _roomObj = socket.roomObj;
            if(!_roomObj) 
                return;
            
            data.forEach(function setMap(row) {
                if(row[2] == 1) {
                    _roomObj._mapInitData[row[1]*15+row[0]] = 0;
                }    
            })
        });

        socket.on('message', function (data) {
            var room,uname,data;
            console.log("msg:"+data);
            room = socket.room;
            uname = socket.nickname;
            socket.broadcast.to(room).emit("other",data);
        });

        socket.on('trace', function (req) {
            var _roomid;
            //console.log("msg:"+req.name+"-"+req.posX+"-"+req.posY+"-"+req.locX+"-"+req.locY);
            _roomid = socket.room;

            _roomObj = socket.roomObj;
            if(!_roomObj.isRoomActived()) return;

            _userObj = _roomObj.getUser(req.name);

            // if not all players killed
            if(_userObj != null) {
                _userObj.setLoc(req.posX, req.posY, req.locX, req.locY);

                sc._redisOp.setUserToRedis(_userObj, _roomid).then((result)=>{
                    socket.broadcast.to(_roomid).emit("trace",req);
                }, (err)=> {
                    console.log("setUser ERR1:"+err);
                }); 
            } 
        });

        // req format: [ '{"img":1,"loginOrder":1,"name":"yfzsuk","nick":"艾伯特·潼恩","posX":0, "posY":0, "locX":0, "locY":0, "status":1}','{"img":2,"loginOrder":2,"name":"pvebyx","nick":"斯梅德利·埃达","posX":532, "posY":304, "locX":14, "locY":8, "status":1}' ]
        socket.on('syncUser', function (req) {
            _roomObj = socket.roomObj;
            console.log("^^^^^sync user~~~~~~~~");

console.log(req);

            _roomObj.resetUserSequences(req);
            _roomObj.setBombTimer();
            _roomObj.startGame();
        });

        socket.on('bomb', function (req) {
            var _roomid,_nick,_roomObj;
            console.log("setBomb:"+req.name+"-"+req.posX+"-"+req.posY+"-"+req.owner);
            _roomid = socket.room;
            //_roomObj = mainSc.getRoomObject(_roomid);
            _roomObj = socket.roomObj;
            if(!_roomObj.isRoomActived()) return;

            //in some case 2 bomb would be set to 1 loction. It's NG.
            if(_roomObj._bombSequences.objectForKey(req.name) == null) {
                _roomObj.setBomb(req);
                socket.broadcast.to(_roomid).emit("bomb",req);
            }
        });

        socket.on('bullet', function (req) {
            var _roomid,_nick,_roomObj;
            console.log("setBullet:"+req.name+"-"+req.posX+"-"+req.posY+"-"+req.dir+"-"+req.owner);
            _roomid = socket.room;
            //_roomObj = mainSc.getRoomObject(_roomid);
            _roomObj = socket.roomObj;
            if(!_roomObj.isRoomActived()) return;

            //in some case 2 bomb would be set to 1 loction. It's NG.
            if(_roomObj._bulletSequences.objectForKey(req.name) == null) {
                var rReq = _roomObj.setBullet(req);
                io.sockets.in(_roomid).emit("bulletShoot", rReq);
            }
        });

        socket.on('laser', function (req) {
            var _roomid,_nick,_roomObj;
            console.log("setLaser:"+req.name+"-"+req.posX+"-"+req.posY+"-"+req.dir);
            _roomid = socket.room;

            _roomObj = socket.roomObj;
            if(!_roomObj.isRoomActived()) return;

            _roomObj.laserKill(req.name, req.locX, req.locY, req.posX, req.posY, req.dir, req.owner); 
        });

        socket.on('fire', function (req) {
            var _roomid,_nick,_roomObj;
            console.log("setFire:"+req.name+"-"+req.posX+"-"+req.posY+"-"+req.dir);
            _roomid = socket.room;

            _roomObj = socket.roomObj;
            if(!_roomObj.isRoomActived()) return;

            _roomObj.fireKill(req.name, req.locX, req.locY, req.posX, req.posY, req.dir, req.bLength, req.owner); 
        });

        socket.on('getItem', function (req) {
            var _roomid,_nick,_userObj,_itemName,_itemType;
            console.log("getItem:"+req.name+"___"+req.itemName);
            _roomid = socket.room;
            _roomObj = socket.roomObj;
            if(!_roomObj.isRoomActived()) return;

            _userObj = _roomObj.getUser(req.name);

            _itemName = req.itemName;
            _itemType = req.itemType;
            var itemPos = _itemName.indexOf('_')&&_itemName.split("_");

            if(_itemType == "super" && _userObj != null) {
                _userObj.setUndead(_roomid);
                socket.broadcast.to(_roomid).emit("undead",{"name":req.name});
            }
            _nick = socket.nickname;
            console.log("getItemNick:"+_nick);

            socket.broadcast.to(_roomid).emit("getItem",req);
        });

        socket.on('chat', function (data) {
            var room,uname,data;
            console.log("chat:"+data);
            room = socket.room;
            uname = socket.nickname;
            socket.broadcast.to(room).emit("other","SA"+uname+":"+data);
        });

        socket.on('disconnect', function (req) {
            var _roomid,_nick,_roomObj,_userObj,ret={};
            _roomid = socket.room;
            _nick = socket.nickname;
            _roomObj = socket.roomObj;

            if(!_roomObj) 
                return;

            _userObj = _roomObj.getUser(_nick);

            console.log(_nick+" disconnected in room "+_roomid);
            mainSc.removeUserAndRoom(_roomObj, _nick).then((result)=>{
                // if the last user, then no need to broadcast left action.
                if(mainSc.getRoomObject(_roomid) != null && _userObj != null) {
                    ret.uname = _nick;
                    ret.lastPlayer = result;
                    io.sockets.in(_roomid).emit("left",ret);
                }
            }, (err)=>{
                console.log("socket disconnect ERR:" + err);
            });

        });

    });

}
