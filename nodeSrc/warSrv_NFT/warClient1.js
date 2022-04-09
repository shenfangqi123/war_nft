String.prototype.startWith=function(str){
    var reg=new RegExp("^"+str);
    return reg.test(this);
};

Array.prototype.removeByValue = function(val) {
    for(var i=0;i<this.length;i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

Array.prototype.minus = function (arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1;
    }
    for (var j = 0; j < this.length; j++) {
        if (!obj[this[j]])
        {
            obj[this[j]] = 1;
            result.push(this[j]);
        }
    }
    return result;
};

// 定义一个判断函数
String.prototype.inArray = function(arr){  
    // 不是数组则抛出异常
    if(!arr){
         console.log("ERR(in_array):Input is not an array");
    }
    // 遍历是否在数组中
    for(var i=0,k=arr.length;i<k;i++){
        if(this==arr[i]) {
            return true;  
        }
    }
    // 如果不在数组中就会返回false
    return false;
};


const io = require('socket.io-client');
const Dict = require('./dictionary.js');
const baseSpriteWidth = 30;
const gridWidthPx = 600, gridHeightPx = 960;
const gridPx = 30;

//Grid size in actual units
const gridWidth = gridWidthPx / gridPx;
const gridHeight = gridHeightPx / gridPx;

const pp = require("./acdata1.js").AcWar;

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

sc.robot = {
    eAgents:[],
    eBases:[],
    eForts:[],
    lastSend:0,
    magicJuice:600,
    magicAmount:12,
    nick:"robotPlayer",
    agentSetting:[],
    lastEAgentsArr:[],
    _defaultBases:["base1","base2","base3","base4","base5","base6"],
    maskType:"seleMask3",
    sendStack:[],
    lastNewEnemies:0,

    //last mass attack time recorder, to avoid continues mass attack
    massAttackInterval:6000,
    lastBombTime:0,
    lastLogTime:0,
    

    setSocket: function(socket) {
        this.MY_SOCKET = socket;
    },

    //up data is the same as that in server's gameSetting.js 
    //down data is organized.
    setAgentSettings: function() {
        this.agentSetting["log"] = {
            "killVal":20,
            
            "magic":1,
        };
        this.agentSetting["bomb"] = {
            "exploreRange":3,
            "baseExploreVal":200,
            "agentExploreVal":100,
            
            "magic":4,
        };
        this.agentSetting["ske"] = {
            "maxSpeed":2,
            "attackForceVal":50,
            "killRange":0,
            "lifeVal":100,
            "maxAttackActDura":35,

            "magic":1,
        };
        this.agentSetting["ir"] = {
            "maxSpeed":1,
            "attackForceVal":150,
            "killRange":0,
            "lifeVal":1000,
            "maxAttackActDura":35,

            "magic":1,
        };
        this.agentSetting["hr"] = {
            "maxSpeed":3,
            "attackForceVal":150,
            "killRange":0,
            "lifeVal":1800,
            "maxAttackActDura":35,

            "magic":3,
        };
        this.agentSetting["bee"] = {
            "maxSpeed":4,
            "attackForceVal":50,
            "killRange":1,
            "lifeVal":100,
            "maxAttackActDura":35,

            "magic":0.5,
        };
        this.agentSetting["gi"] = {
            "maxSpeed":1,
            "attackForceVal":150,
            "killRange":0,
            "lifeVal":3000,
            "maxAttackActDura":35,

            "magic":5,
        };
        this.agentSetting["lm"] = {
            "maxSpeed":3,
            "attackForceVal":150,
            "killRange":1.5,
            "lifeVal":800,
            "maxAttackActDura":35,

            "magic":3,
        };
        this.agentSetting["wiz"] = {
            "maxSpeed":2,
            "attackForceVal":50,
            "killRange":3,
            "lifeVal":500,
            "maxAttackActDura":35,

            "magic":3,
        };
    },

    getDistance:function(pt, v) {
        var mt = {};
        mt.x = pt.x;
        mt.y = pt.y

        mt.x -= v.x;
        mt.y -= v.y;
        return Math.sqrt(mt.x * mt.x + mt.y * mt.y);
    },

    getGroupRoles:function() {
        return ["bee", "ske"];
    },

    massAttack:function() {
        var pt1,pt2;
        var sum=0;
        var roles = this.getGroupRoles();
        var seleRole;
        var ret = [];
        var range;
        var magicCost,speed;
        var level = 1;
        var now;
        var bombPt = {};
        var myBasePt = {"x":9.5, "y":3.5};
        var bombBaseDistance;
        var offset;
        var attackAgentsNum;

        //for each tiny role, such as skeleton or bees, to see if they gather together. attack to the gather point 
        for(var i=0;i<roles.length;i++) {
            selectRole = roles[i];

            for (var agent1 of this.eAgents) {
                sum = 0;
                attackAgentsNum = 0;

                if(agent1.role == selectRole) {
                    pt1 = agent1.mypos;
                    for (var agent2 of this.eAgents) {
                        if(agent2.role == selectRole) {
                            pt2 = agent2.mypos;
                            range = this.getDistance(pt1, pt2);

                            //the distance to agent1 within 5 grids
                            if(range<5 && range>0) {
                                //while not move, then considered as attack
                                if(agent2.actType !== "move") {
                                    attackAgentsNum++;
                                }
                                sum++;
                            }
                        }
                    }

                    // if agents number in group is more than 5, then start massive attack
                    if(sum > 5) {
                        magicCost = this.agentSetting[selectRole].magic;
                        speed = this.agentSetting[selectRole].maxSpeed;
                        now = Date.now();
                        if(now-this.lastBombTime>this.massAttackInterval) {
                            bombPt = {"x":pt1.x, "y":30-pt1.y};
                            bombBaseDistance = this.getDistance(bombPt, myBasePt);

                            offset = (bombBaseDistance*speed)/24;

                            //if 2 agents in group is in attacking, then the group is considered as not moving toward.
                            if(attackAgentsNum < 2) {
                                bombPt.y = bombPt.y-offset;
                            } else {
                                bombPt.y = bombPt.y+offset;                                
                            }

                            this.pushSend(magicCost, "bomb", 1, bombPt, level);
                            this.lastBombTime = now;
                        }
                    }
                }
            }
        }
    },

    isGroupRole:function(role) {
        if(
            role=="ske" || 
            role=="bee"
        ) {
            return ture;
        }
        return false;
    },

    setGameStart:function() {
        var _self = this;
        var row;
        this.setAgentSettings();
        this.gameStartTime = Date.now();
        this.sendTimer = setInterval(function() {
            if(_self.sendStack.length>0) {
                row = _self.sendStack.shift();
                _self.sendSodier(row.magicCost, row.tosend, row.enemypos, row.level);
            }
        }, 200);
    },

    setMagicBar: function() {
        if(this.magicJuice<600) {
            this.magicJuice+=10;
        }

//console.log("magic juice:" + this.magicJuice);

        if(this.magicJuice%50 == 0) {
            this.magicAmount = this.magicJuice/50;
        }
    },

    getNewEnemies: function(agents) {
        var newE = [];
        var now = Date.now();
        for (var agent of agents) {
            if(agent.isHero && !this.lastEAgentsArr[agent.aid]) {
                newE[agent.aid] = {
                    "role":agent.role,
                    "life":agent.life,
                    "pos":agent.mypos
                }
            }
        }

        if(data = this.getAntiEnemies(newE)) {
            this.lastNewEnemies = now;
            this.getSodier(data);
        }
    },

    getSodier: function(data) {
        console.log("----------------");
        console.log(data.enemy.pos);
        var tosend = Object.keys(data.tosend)[0];
        var sendnum = data.tosend[tosend];

        var enemypos = data.enemy.pos;
        var enemylife = data.enemy.life;
        var enemyrole = data.enemy.role;

        if(enemypos.y > 16) {
            enemypos.y = 32-enemypos.y;
        }

        var level = 1;
        var magicCost = this.agentSetting[tosend].magic;
        //var mypos = {"x":enemypos.x, "y":960-enemypos.y};

        console.log(tosend +"###"+ sendnum +"###"+ magicCost);
        
        this.pushSend(magicCost, tosend, sendnum, enemypos, level);
    },

    pushSend: function(magicCost, tosend, sendnum, enemypos, level) {
console.log("magicJuice:" + this.magicJuice +"--"+ magicCost);

        if(this.magicJuice<=magicCost*50) {
            console.log("not enough magic juice.");
            return;
        }

        var sendRow = {};
        for(var i=0;i<sendnum;i++) {
            sendRow = {
                "magicCost":magicCost,
                "tosend":tosend,
                "enemypos":enemypos,
                "level":level,
            };
            this.sendStack.push(sendRow);
        }
    },

    baseProcess: function(bases) {
        var remoteBases = [];
        var killBases = [];
        var enemyBases = [];
        var baseName;

        for(var i=0;i<bases.length;i++) {
            baseName = "base"+ bases[i].objectId;
            remoteBases.push(baseName);
            enemyBases.push(baseName);
        }

        // todo list: should manage to remove the base record in npcInfo.
        killBases = this._defaultBases.minus(remoteBases);

        for(baseName of killBases) {
            this.dispLayoutMask(enemyBases, baseName);
            this._defaultBases.removeByValue(baseName);
        }
    },

    dispLayoutMask: function(killEnemyBases, baseName) {
        var _self = this;
        if(baseName == "base1" || baseName == "base2" || baseName == "base3") {
            return;
        }

        if("base4".inArray(killEnemyBases) && "base5".inArray(killEnemyBases)) {
            this.maskType = "seleMask45";
        }
        else if("base4".inArray(killEnemyBases) && "base6".inArray(killEnemyBases)) {
            this.maskType = "seleMask46";
        }
        else if("base4".inArray(killEnemyBases)) {
            this.maskType = "seleMask4";
        }
        console.log("------mask type-------:" + this.maskType);
    },

    isValidPutPoint: function(point) {
        var pt = {};
        pt.x = point.x;
        pt.y = point.y;
        //if(this.mainPlayer == 2) {
        //    pt.y = point.y-40;
        //}

        if(this.maskType == "seleMask4") {
            if(pt.x >= 30 && pt.x <= 570 && pt.y > 310 && pt.y < 960) {
                return true;
            } else {
                return false;
            }
        }
        else if(this.maskType == "seleMask45") {
            if((pt.x >= 30 && pt.x <= 570 && pt.y > 460 && pt.y < 960) || (pt.x >= 285 && pt.x <= 570 && pt.y < 460 && pt.y > 310)) {
                return true;
            } else {
                return false;
            }
        }
        else if(this.maskType == "seleMask46") {
            if((pt.x >= 30 && pt.x <= 570 && pt.y > 460 && pt.y < 960) || (pt.x >= 30 && pt.x <= 285 && pt.y < 460 && pt.y > 310)) {
                return true;
            } else {
                return false;
            }
        }
        else if(this.maskType == "seleMask3") {
            if(pt.x >= 30 && pt.x <= 570 && pt.y > 460 && pt.y < 960) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    },

    getAntiEnemies: function(newE) {
        var anti = [];
        for (var key in newE) {

            if(newE[key].role == "ir") {
                return this.getRandomAnti(
                    [
                        {"ir":1},
                        {"hr":1},
                        {"bee":5},
                        {"ske":4},
                        {"lm":2},
                    ],newE[key]);
            }
            else if(newE[key].role == "hr") {
                return this.getRandomAnti(
                    [  
                        {"ir":2},
                        {"hr":1},
                        {"lm":2},
                    ],newE[key]);
            }
            else if(newE[key].role == "wiz") {
                return this.getRandomAnti(
                    [  
                        {"hr":1},
                    ],newE[key]);
            }
            else if(newE[key].role == "wiz1") {
                return this.getRandomAnti(
                    [  
                        {"ir":1},
                        {"hr":1},
                        {"lm":1},
                    ],newE[key]);
            }
            else if(newE[key].role == "gi") {
                return this.getRandomAnti(
                    [  
                        {"ir":2},
                        {"hr":1},
                        {"bee":8},
                        {"ske":6},
                        {"lm":1},
                    ],newE[key]);
            }
            else if(newE[key].role == "lm") {
                return this.getRandomAnti(
                    [  
                        {"ir":1},
                        {"hr":1},
                        {"bee":5},
                        {"ske":3},
                        {"lm":1},
                        {"gi":1},
                    ],newE[key]);
            }

            return false;
        }
    },

    getInitEnemies: function() {
        return this.getRandomAnti(
            [
                {"ir":1},
                {"hr":1},
                {"bee":5},
                {"ske":4},
                {"lm":1},
            ]);
    },

    getRandomAnti: function(arr, data=null) {
        var s = (Math.floor(Math.random() * arr.length));
        return {"tosend":arr[s], "enemy":data};
    },

    initAttack: function() {
        var now = Date.now();
        var x = (Math.floor(Math.random() * 15)) + 3;
        var y = (Math.floor(Math.random() * 10)) + 3;
        var pt = {"x":x, "y":y};

        var level = 1;
        var send = this.getInitEnemies();
        var sendRole = Object.keys(send.tosend)[0];
        var sendNum = send.tosend[sendRole];
        var magicCost = this.agentSetting[sendRole].magic;

        if(now - this.lastNewEnemies > 20000) {
            this.pushSend(magicCost, sendRole, sendNum, pt, level);
            this.lastNewEnemies = now;
        }
    },

    setEDatas:function(agents, bases, forts) {
        this.getNewEnemies(agents);
        this.baseProcess(bases);
        this.massAttack();
        this.initAttack();

        this.eAgents = [];
        this.eBases = [];
        this.eForts = [];
        this.lastEAgentsArr = [];

        for (var agent of agents) {
            if(agent.isHero) {
                this.eAgents.push(agent);
                this.lastEAgentsArr[agent.aid] = {
                    "role":agent.role,
                    "life":agent.life,
                    "pos":agent.mypos
                }
            }
        }
        for (var agent of bases) {
            if(agent.isHero) {
                this.eBases.push(agent);
            }
        }
        for (var agent of forts) {
            if(agent.isHero) {
                this.eForts.push(agent);
            }
        }

        //console.log(this.lastEAgentsArr);
    },

    ffPlay:function(mySocket) {
        var now = Date.now();
        //if just 2's after game start, don't send soldier.
        if(now - this.gameStartTime < 2000) {
            return;
        }

        // first send soldier
        if(this.lastSend == 0) {
            // send soldier here.
            this.lastSend = now;
            return;
        }

        if(now - this.lastSend > 300) {
            // send soldier here.
            this.lastSend = now;
            return;        
        }
    },

    useMagic: function(amount) {
        var afterUse = this.magicJuice-amount*50;
        if(afterUse>=0) {
            return afterUse;
        }
        return false;
    },

    sendSodier:function(magicCost, role, pt, level) {
        // innerId not used in robot client.
        var innerId = this.nick +"_"+ Number(new Date());
        var cost = this.useMagic(magicCost);
        
        this.magicJuice = cost;

        //if(cost) {
            console.log("------to send------");
            console.log(role);
            console.log(pt);
            pt = {"x": 600-pt.x*30, "y": pt.y*30+30};
            this.MY_SOCKET.json.emit('cmd', {'isHero':false, 'innerId': innerId, 'role': role, 'pt':pt, 'level':level});
        //}
    },

};

sc.game = {
    mainPlayer:-1,
    gameCycleTime:90,
    gameOver:false,
    MY_SOCKET:null,
    timeHandle:null,
    bufferLen:30,
    gameNowTime:0,
    nick:'robotPlayer',
    gameStartTime:0,

    socketHandle:function(roomId) {
        var _parent = this;

        this.gameTraceStack = [];
        //this.MY_SOCKET = io.connect('ws://192.168.1.18:4003');
        this.MY_SOCKET = io.connect('wss://www.asobee.mobi:443');

        this.MY_SOCKET.on('connected', function(data) {
            _parent.MY_SOCKET.heartbeatTimeout = 5000;
            _parent.MY_SOCKET.json.emit('init', {'name': "robotname", 'nick': this.nick, 'img':'', 'roomId': roomId});
        });  

        this.MY_SOCKET.on('disconnect', function(data) {
            console.log("disconnect to server");
            _parent.disconnectServer();
        });

        this.MY_SOCKET.on('otherlogin', function (data) {
            if(_parent.mainPlayer == -1) {
                _parent.mainPlayer = data.userData.length;
            }

console.log("user cnt:" + data.userData.length);

            // 2 players means game start.
            if(data.userData.length == 2) {
                console.log("--------game start--------");
                sc.robot.setGameStart();
            }
        });

        this.MY_SOCKET.on('heart', function (data) {
            var cdVal = parseInt(data.counter);
            _parent.setTimeCounter(cdVal);
        });

        this.MY_SOCKET.on('end', function (data) {
            console.log(data);
            console.log(_parent.mainPlayer);
            _parent.disconnectServer();
        });

        this.MY_SOCKET.on('agent', function (data) {
            var traceData = {};
            var agents = data.agents;
            var bases = data.bases;
            var forts = data.forts;
            var bullets = data.bullets;
            var rollLogs = data.rollLogs;

/*
            if(_parent.mainPlayer == 2) {
                agents = _parent.mirrorAgentsData(agents);
                bullets = _parent.mirrorAgentsData(bullets);
                bases = _parent.mirrorBasesData(bases);
                forts = _parent.mirrorAgentsData(forts);
                rollLogs = _parent.mirrorAgentsData(rollLogs);
            }
*/

            traceData.agents = agents;
            traceData.bullets = bullets;
            traceData.bases = bases;
            traceData.forts = forts;
            traceData.rollLogs = rollLogs;

            _parent.gameTraceStack.push(traceData);
        });

        this.MY_SOCKET.on('proto', function(data) {
            let udata = new Uint8Array(data);
            var message = pp.Info.decode(udata);
            var base = message.base;

            for(var i=0;i<message.base.length;i++) {
                message.base[i].mypos = {};
                message.base[i].enemypos = {};
                message.base[i].targetpos = {};

                message.base[i].mypos.x = message.base[i].mpx;
                message.base[i].mypos.y = message.base[i].mpy;
                message.base[i].enemypos.x = message.base[i].epx;
                message.base[i].enemypos.y = message.base[i].epy;
                message.base[i].targetpos.x = message.base[i].tpx;
                message.base[i].targetpos.y = message.base[i].tpy;
            }

            for(var i=0;i<message.fort.length;i++) {
                message.fort[i].mypos = {};
                message.fort[i].enemypos = {};
                message.fort[i].targetpos = {};

                message.fort[i].mypos.x = message.fort[i].mpx;
                message.fort[i].mypos.y = message.fort[i].mpy;
                message.fort[i].enemypos.x = message.fort[i].epx;
                message.fort[i].enemypos.y = message.fort[i].epy;
                message.fort[i].targetpos.x = message.fort[i].tpx;
                message.fort[i].targetpos.y = message.fort[i].tpy;
            }

            for(var i=0;i<message.agent.length;i++) {
                message.agent[i].mypos = {};
                message.agent[i].enemypos = {};
                message.agent[i].targetpos = {};

                message.agent[i].mypos.x = message.agent[i].mpx;
                message.agent[i].mypos.y = message.agent[i].mpy;
                message.agent[i].enemypos.x = message.agent[i].epx;
                message.agent[i].enemypos.y = message.agent[i].epy;
                message.agent[i].targetpos.x = message.agent[i].tpx;
                message.agent[i].targetpos.y = message.agent[i].tpy;
            }

            for(var i=0;i<message.bullet.length;i++) {
                message.bullet[i].mypos = {};
                message.bullet[i].enemypos = {};
                message.bullet[i].targetpos = {};

                message.bullet[i].mypos.x = message.bullet[i].mpx;
                message.bullet[i].mypos.y = message.bullet[i].mpy;
                message.bullet[i].enemypos.x = message.bullet[i].epx;
                message.bullet[i].enemypos.y = message.bullet[i].epy;
                message.bullet[i].targetpos.x = message.bullet[i].tpx;
                message.bullet[i].targetpos.y = message.bullet[i].tpy;
            }

            for(var i=0;i<message.rollLog.length;i++) {
                message.rollLog[i].mypos = {};
                message.rollLog[i].enemypos = {};
                message.rollLog[i].targetpos = {};

                message.rollLog[i].mypos.x = message.rollLog[i].mpx;
                message.rollLog[i].mypos.y = message.rollLog[i].mpy;
                message.rollLog[i].enemypos.x = message.rollLog[i].epx;
                message.rollLog[i].enemypos.y = message.rollLog[i].epy;
                message.rollLog[i].targetpos.x = message.rollLog[i].tpx;
                message.rollLog[i].targetpos.y = message.rollLog[i].tpy;
            }

            var traceData = {};
            var agents = message.agent;
            var bases = message.base;
            var forts = message.fort;
            var bullets = message.bullet;
            var rollLogs = message.rollLog;

            traceData.agents = agents;
            traceData.bullets = bullets;
            traceData.bases = bases;
            traceData.forts = forts;
            traceData.rollLogs = rollLogs;

            _parent.gameTraceStack.push(traceData);

        });

        this.startTraceTimer();
    },

    disconnectServer:function() {
        this.gameOver = true;
        this.stopTraceTimer();
        this.MY_SOCKET.disconnect();
        process.exit(0);
    },

    setTimeCounter:function(cnt) {
        //use to compare if timeout, only for pk mode.
        this.gameNowTime = cnt;
        sc.robot.setMagicBar();

        //counter1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("num_8.png"));
        //3 second is the ai page loading time.     
        var count_down = this.gameCycleTime-cnt;
        if(count_down<0) {
            //this.ai_lose();
            this.gameOver=true;
            //this.disconnectServer();
            return;
        }

        var tens = parseInt(count_down/10);
        var ones = count_down%10;
    },

    startTraceTimer:function() {
        //refer to server interval setting, must a little shorter than that in server
        this.interval = 30;
        var then = Date.now();
        var _parent = this;

        // 30 mini seconds a game cycle.
        var game_cycle = this.gameCycleTime*1000; 
        var game_cycle_then = Date.now();
        var cycle_cnt = 0;

        if(!this.traceTimer && !this.gameOver) {
            this.traceTimer = function() {
                var now = Date.now();
                var delta = now - then;

/*
                //when net traffic happened, idle for 5's will halt
                //not tested yet.
                var game_cycle_delta = now - _parent.gameStartTime;
                // if within game cycle time
                if(!_parent.gameOver && game_cycle_delta > cycle_cnt*1000) {
                    cycle_cnt++;
                    // if no response for 5s, then timeout
                    if(Math.abs(cycle_cnt-_parent.gameNowTime) > 5) {
                        this.syncTimeout();
                    }
                }
*/

                if(delta>_parent.interval) {
                    then = now - (delta%_parent.interval);
                    _parent.mainGameCycle();
                }
            }.bind(this);
        }

        this.timeHandle = setInterval(this.traceTimer, 0);
    },

    mainGameCycle:function() {
        var _parent = this;
        var data,agents,bullets,bases,forts,rollLogs,agentsFuture,fortsFuture;
        sc.robot.setSocket(this.MY_SOCKET);

        if(this.gameTraceStack.length > this.bufferLen) {
            this.gameTraceStack.shift();
            data = this.gameTraceStack[0];

            agents = data.agents;
            //agentsFuture = this.gameTraceStack[29].agents;
            //fortsFuture = this.gameTraceStack[29].forts;
            bullets = data.bullets;
            bases = data.bases;
            forts = data.forts;
            rollLogs = data.rollLogs;

            sc.robot.setEDatas(agents, bases, forts);
            sc.robot.ffPlay(this.MY_SOCKET);

/*
            _parent.playBullets(bullets);
            _parent.playLogs(rollLogs);

            _parent.playAgents(agents, agentsFuture);
            _parent.playBases(bases);
            _parent.playForts(forts);

            _parent.bulletProcess(bullets);
            _parent.logProcess(rollLogs);
            _parent.agentProcess(agents);
            _parent.fortProcess(forts, fortsFuture);
            _parent.baseProcess(bases);
*/

        }
    },

    syncTimeout:function() {
        this.gameOver=true;
        this.stopTraceTimer();
        this.MY_SOCKET.disconnect();
        cc.log("网络断开");
        //this.goPrevious();                 
    },

    stopTraceTimer:function() {
        if(this.traceTimer) {
            clearInterval(this.timeHandle);
            this.traceTimer = null;
        }
    }
};

const argv = process.argv
if (argv.length <= 2) {
    console.log('请指定待处理的文件地址');
    return;
}
const fileParam = argv[2];
const playgame = (roomId) => {
    console.log("connect to room:" + roomId);
    sc.game.socketHandle(roomId);
}

playgame(fileParam);