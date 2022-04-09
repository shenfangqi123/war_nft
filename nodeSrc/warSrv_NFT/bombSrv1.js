//5秒でタイムアウト設定
var io = require('socket.io')({'pingInterval': 5000}).listen(4001);
var http = require('http');

var USERS_PER_ROOM = 2;
var baseSpriteWidth = 38;

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

console.log(rUrl+paramStr);

      options = require('url').parse(rUrl+paramStr);

      http.get(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', sb);
      }).on('error', function(e) {
         console.log("ERR(func _sendRequest) Got error: " + e.message);
      });
};

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
        _instanceId:sc.guid.getGuid(),
        _bombTimer:null,
        _roomid:-1, 
        _mapInitData: [
            0,0,0,0,1,1,0,1,1,1,1,1,0,0,0,
            0,1,2,0,1,1,0,0,0,0,1,1,0,0,1,
            1,1,1,0,0,0,1,0,0,1,1,1,0,0,1,
            1,1,1,0,2,0,1,1,1,0,2,0,0,0,1,
            1,1,1,0,0,0,0,1,1,0,0,0,1,0,1,
            1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,
            0,1,2,1,1,0,0,1,1,1,1,1,0,0,0,
            0,1,1,1,1,0,1,1,1,1,1,1,0,1,0,
            0,0,0,1,1,0,0,0,1,1,1,1,1,0,0
        ],
        _itemsInitData: [],
        _itemsInMap : [0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4],
        _roomStatus:-1,   //-1:default, 0:opening for login, 1: in game(not opening)

        init : function() {
            this._userSequences = Object.create(sc._Dictionary);
            this._bombSequences = Object.create(sc._Dictionary);
            this._userSequences.init();
            this._bombSequences.init();
            this._itemsInitData = this.getRoomItems();
        },

        // set all user status to 0(in game status)
        startGame : function() {
            var _allUsers = this.getAllUserObj();

            this.setRoomStart();
            _allUsers.forEach(function formKilledUser(user) {
                user.setUserStatusLiving();
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
            this._roomStatus = 1;
        },

        // if last user then close the room 
        setRoomClose : function() {
            this._userSequences.init();
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
            
            ret = this.shuffle(walls,walls.length);

            return this._mergeItemPos(ret.slice(0,items.length));
        },

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
            this._bombTimer = setInterval(function() {
                // if last user appear, stop the bomb procedure. to provide multi lastuser annouce to the clients.
                var _allkeys,_current;
                _current = Date.parse(new Date());
                _allkeys = _self._bombSequences.allKeys();
                _allkeys.forEach(function sendExplosion(key) {
                    var _bomb = null, _bombTime;
                    _bomb = _self._bombSequences.objectForKey(key);
                    _bombTime = _bomb.time;
                    if(_current - _bombTime > 5000) {
                        //if room is not available then do nothing,  put it here (instead of above) to avoid multi kill, that would
                        //cause multi respond model window in client.
                        if(!_self.isRoomActived()) 
                            return;
                        //console.log("btime:" + _bomb.time)
                        var bombRet = _self.bombKill(_bomb);
                        io.sockets.in(_self._roomid).emit("explore",bombRet);
                        _self.removeBomb(key);
                    }
                });
            },600);
        },

        bombKill : function(bombObj) {
            var _bombLength,
                _bombAnchor={},
                _killList=[],
                _retKilled={},
                _bombRange=[],
                _retBombKilled = {"bomb":"","wall":[], "player":[], "names":[],"lastPlayer":false};

            _retBombKilled.bomb=bombObj.name;
            _retBombKilled.wall=[];
            _retBombKilled.player=[];
            _retBombKilled.names=[];
            //fire lenght of the bomb.
            _bombLength = bombObj.bLength;

            if(bombObj.posX%baseSpriteWidth>0 || bombObj.posY%baseSpriteWidth>0) {
                console.log("ERR(bombKill):invalid bomb position:"+bombObj.posX +"-"+ bombObj.posY);
                return false;
            }
            _bombAnchor.x = bombObj.posX/baseSpriteWidth;
            _bombAnchor.y = bombObj.posY/baseSpriteWidth;

            var exploPt,
                upEnd=downEnd=leftEnd=rightEnd=false;

            if(this._setItemKilled(_bombAnchor.x, _bombAnchor.y, _retBombKilled)) {
                 //_bombRange.push(_bombAnchor.x+"_"+_bombAnchor.y);
            }

            for(var i=1;i<=_bombLength;i++) {
                if(!rightEnd && this._setItemKilled((_bombAnchor.x+i), _bombAnchor.y, _retBombKilled)) {
                    rightEnd = true;
                }

                if(!leftEnd && this._setItemKilled((_bombAnchor.x-i), _bombAnchor.y, _retBombKilled)) {
                    leftEnd = true;
                }

                if(!upEnd && this._setItemKilled(_bombAnchor.x, (_bombAnchor.y+i), _retBombKilled)) {
                    upEnd = true;
                }

                if(!downEnd && this._setItemKilled(_bombAnchor.x, (_bombAnchor.y-i), _retBombKilled)) {
                    downEnd = true;
                }
            }


            // if all players left in game  killed at the same time,then no one win.
            if(this.getUserCount() == 0) {
                _retBombKilled.lastPlayer = "noone";
            }

            // get the winner if exist, if so clear the room(in getLastUserIfExist)
            var lastPlayer = this.getLastUserIfExist();
            if(lastPlayer) {
                _retBombKilled.lastPlayer = lastPlayer;
            }

            console.log("FUNC bombKill:" + JSON.stringify(_retBombKilled));

            return _retBombKilled;

        },

        _setItemKilled : function(x, y, retBombKilled) {
            var _allUsers = this.getAllUserObj(),
                _self = this,
                playerRet = false;

            if(_allUsers === undefined) {
                console.log("ERR(_isItemkilled):allUsers shouldn't be undefined");
                return false;
            }

            if(x<0||y<0||x>=15||y>=9) {
                return false;
            }

            //if the iron wall, just send it to client.
            if(this._mapInitData[y*15+x] == 2) {
                retBombKilled.wall.push([x,y,2]);
                return true;
            }

            //if the wall, then clear the wall.
            if(this._mapInitData[y*15+x] == 1) {
                this._mapInitData[y*15+x] = 0;
                retBombKilled.wall.push([x,y,1]);
                return true;
            }

            _allUsers.forEach(function formKilledUser(user) {
                // user inside bomb range shall be killed
                if(user._locX == x && user._locY == y && !user.isSuperUserStatus()) {
                    console.log("killed:"+user._locX +"--"+ user._locY);
                    retBombKilled.player.push([x,y]);
                    retBombKilled.names.push(user._name);
                    _self.removeUser(user._name);
 
                    // set the user to death, but it is still in the room. wating for restart.
                    user.setUserStatusDead();
                    //playerRet = true;
                }

            });

            return playerRet;
        },

        unsetBombTimer : function () {
            if(this._bombTimer != null) {
console.log("cleared.");
                clearInterval(this._bombTimer);
            }
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
            _userObj = sc.user(_username, _usernick, _userimg, _readyStatus, _usersNum, _locX*baseSpriteWidth, _locY*baseSpriteWidth, _locX, _locY);
            
console.log("userObj img:"+_userimg+":::"+_userObj._img);

            this._userSequences.setObject(_userObj, _username);
        },

        getUser : function(userKey) {
            return this._userSequences.objectForKey(userKey);
        },

        setBomb : function(bombData) {
            var _bombObj = null,
                _bombname = bombData.name;
            
            _bombObj = {"name":_bombname,"type":0, "time":Date.parse(new Date()),"posX":bombData.posX,"posY":bombData.posY,"bType":bombData.bType,"bLength":bombData.bLength};
            console.log("set Bomb :" + _bombObj.time);
            this._bombSequences.setObject(_bombObj, _bombname);
        },

        removeUser : function(user) {
            this._userSequences.removeObjectForKey(user);
        },

        removeBomb : function(bomb) {
            this._bombSequences.removeObjectForKey(bomb);
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

        isSuperUserStatus : function() {
            return this._status == 3;
        },

        cancelUndead : function() {
console.log("cancel undead");
            if(this._status == 3) 
                this._status = 0;
        },

        setUndead : function(roomid) {
console.log("set undead");
            var _self = this;
            //only user is living
            if(this.isUserPlaying())
                this._status = 3;
            else 
                return;

            clearTimeout(this._superTimer);

            var fun = function() {
                _self.cancelUndead();
                io.sockets.in(roomid).emit("candead",{"name":_self._name});
            }

            this._superTimer = setTimeout(fun, 10000);
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
        this._roomSequences = Object.create(sc._Dictionary);
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
            roomObj.unsetBombTimer();
            this._roomSequences.removeObjectForKey(roomid);
            console.log("room "+roomid+ "was cleared.");
        }
 

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
        } 

        _roomObj = this.getRoomObject(_roomkey);
        _roomObj.setUser(userData);

console.log("set img:"+userData.img);

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
        var _roomid, _roomObj, _roomMap, _roomUserData, _isStart, _bombTimer;

        mainSc.removeEmptyRooms();
        _roomid = mainSc.deployUserToRoom(req);

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
        _roomMap = _roomObj.getMap();
        _isStart = (_roomUserData.length==USERS_PER_ROOM)?true:false; 

        if(_isStart) {
            _roomObj.startGame();
            _roomObj.setGoldToServer(_roomUserData);
        }

        _roomUserData = _roomObj.getAllUserInfo();
console.log("roomUserData:" + _roomUserData);

        console.log("users in room:" + _isStart);
        io.sockets.in(_roomid).emit("otherlogin",{"roomId":_roomid, "isStart":_isStart,"userData":_roomUserData,"map":_roomMap});

        if(_isStart) {
            _roomObj.setBombTimer();
        }

    });

    socket.on('set nickname', function (name) {
        socket.nickname = name;
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
            socket.broadcast.to(_roomid).emit("trace",req);
        } 
    });

    socket.on('bomb', function (req) {
        var _roomid,_nick,_roomObj;
        console.log("setBomb:"+req.name+"-"+req.posX+"-"+req.posY);
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
        mainSc.removeUserAndRoom(_roomObj,_nick);

        // if the last user, then no need to broadcast left action.
        if(mainSc.getRoomObject(_roomid) != null && _userObj != null) {
            ret.uname = _nick;
            ret.lastPlayer = _roomObj.getLastUserIfExist();
            io.sockets.in(_roomid).emit("left",ret);
        }
    });

});
