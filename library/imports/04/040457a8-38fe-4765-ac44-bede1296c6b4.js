"use strict";
cc._RF.push(module, '04045eoOP5HZaxEvt4Slsa0', 'SocketProvider');
// scripts/SocketProvider.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var pp = require("acdata1").AcWar;

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  // start () {},
  getRandomCharName: function getRandomCharName() {
    var aphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var nick = "";

    for (var i = 0; i < 6; i++) {
      nick += aphabets[Math.floor(Math.random() * aphabets.length)];
    }

    return nick;
  },
  setGameStart: function setGameStart(roomId) {
    //this.gameStartTime = Date.now();
    this.roomId = roomId;
    console.log("my room:" + this.roomId);
    this.node.getChildByName("putWait").active = false;
    this.node.getChildByName("word3").active = true;
  },
  setGameStartTime: function setGameStartTime() {
    this.gameStartTime = Date.now();
  },
  socketHandle: function socketHandle(nick) {
    var _parent = this;

    this.gameTraceStack = []; //MY_SOCKET = window.io.connect('ws://118.25.231.17:4003');
    //MY_SOCKET = window.io.connect('wss://www.asobee.mobi:443');

    MY_SOCKET = window.io.connect('ws://192.168.1.60:4003'); //MY_SOCKET = window.io.connect('ws://13.112.214.196:10088');
    //console.log('check 1', MY_SOCKET.connected);

    MY_SOCKET.on('connect_error', function () {
      console.log('Connection Failed');

      if (!_parent.netErrDisp) {
        _parent.syncTimeout();

        _parent.setConnFailInfo();

        _parent.node.getChildByName("putWait").active = true;
      }
    });
    MY_SOCKET.on('connected', function (data) {
      MY_SOCKET.heartbeatTimeout = 5000;
      MY_SOCKET.json.emit('init', {
        'name': nick,
        'nick': nick,
        'img': '',
        'roomId': ''
      });
    });
    MY_SOCKET.on('disconnect', function (data) {
      console.log("disconnect to server");

      _parent.syncTimeout(); //_parent.resultOp.show();


      _parent.setConnFailInfo();

      _parent.node.getChildByName("putWait").active = true;
    });
    MY_SOCKET.on('otherlogin', function (data) {
      if (_parent.mainPlayer == -1) {
        _parent.mainPlayer = data.userData.length;
      } // 2 players means game start.


      if (data.userData.length == 2) {
        _parent.setGameStart(data.roomId);
      }
    });
    MY_SOCKET.on('heart', function (data) {
      var cdVal = parseInt(data.counter);

      _parent.setTimeCounter(cdVal);
    });
    MY_SOCKET.on('buff', function (data) {
      console.log("----buff data----");
      console.log(data);
      var buff = data;

      if (_parent.mainPlayer == 2) {
        buff = _parent.mirrorBuffData(data);
      }

      _parent.createBuff(buff);
    });
    MY_SOCKET.on('end', function (data) {
      console.log(data);
      console.log(_parent.mainPlayer);

      _parent.gameOverProcessor(_parent.mainPlayer, data);

      _parent.resultOp.setResultValue(_parent.mainPlayer, data);

      _parent.resultOp.show();
    });
    MY_SOCKET.on('proto', function (data) {
      var udata = new Uint8Array(data);
      var message = pp.Info.decode(udata);
      var base = message.base;

      for (var i = 0; i < message.base.length; i++) {
        message.base[i].mypos = {};
        message.base[i].enemypos = {};
        message.base[i].targetpos = {};
        message.base[i].mypos.x = message.base[i].mpy;
        message.base[i].mypos.y = message.base[i].mpx * -1;
        message.base[i].enemypos.x = message.base[i].epy;
        message.base[i].enemypos.y = message.base[i].epx * -1;
        message.base[i].targetpos.x = message.base[i].tpy;
        message.base[i].targetpos.y = message.base[i].tpx * -1;
      }

      for (var i = 0; i < message.fort.length; i++) {
        message.fort[i].mypos = {};
        message.fort[i].enemypos = {};
        message.fort[i].targetpos = {};
        message.fort[i].mypos.x = message.fort[i].mpy;
        message.fort[i].mypos.y = message.fort[i].mpx * -1;
        message.fort[i].enemypos.x = message.fort[i].epy;
        message.fort[i].enemypos.y = message.fort[i].epx * -1;
        message.fort[i].targetpos.x = message.fort[i].tpy;
        message.fort[i].targetpos.y = message.fort[i].tpx * -1;
      }

      for (var i = 0; i < message.agent.length; i++) {
        message.agent[i].mypos = {};
        message.agent[i].enemypos = {};
        message.agent[i].targetpos = {};
        message.agent[i].mypos.x = message.agent[i].mpy;
        message.agent[i].mypos.y = message.agent[i].mpx * -1;
        message.agent[i].enemypos.x = message.agent[i].epy;
        message.agent[i].enemypos.y = message.agent[i].epx * -1;
        message.agent[i].targetpos.x = message.agent[i].tpy;
        message.agent[i].targetpos.y = message.agent[i].tpx * -1;
      }

      for (var i = 0; i < message.bullet.length; i++) {
        message.bullet[i].mypos = {};
        message.bullet[i].enemypos = {};
        message.bullet[i].targetpos = {};
        message.bullet[i].mypos.x = message.bullet[i].mpy;
        message.bullet[i].mypos.y = message.bullet[i].mpx * -1;
        message.bullet[i].enemypos.x = message.bullet[i].epy;
        message.bullet[i].enemypos.y = message.bullet[i].epx * -1;
        message.bullet[i].targetpos.x = message.bullet[i].tpy;
        message.bullet[i].targetpos.y = message.bullet[i].tpx * -1;
      }

      for (var i = 0; i < message.rollLog.length; i++) {
        message.rollLog[i].mypos = {};
        message.rollLog[i].enemypos = {};
        message.rollLog[i].targetpos = {};
        message.rollLog[i].mypos.x = message.rollLog[i].mpy;
        message.rollLog[i].mypos.y = message.rollLog[i].mpx * -1;
        message.rollLog[i].enemypos.x = message.rollLog[i].epy;
        message.rollLog[i].enemypos.y = message.rollLog[i].epx * -1;
        message.rollLog[i].targetpos.x = message.rollLog[i].tpy;
        message.rollLog[i].targetpos.y = message.rollLog[i].tpx * -1;
      }

      var traceData = {};
      var agents = message.agent;
      var bases = message.base;
      var forts = message.fort;
      var bullets = message.bullet;
      var rollLogs = message.rollLog;

      if (_parent.mainPlayer == 2) {
        agents = _parent.mirrorAgentsData(agents);
        bullets = _parent.mirrorAgentsData(bullets);
        bases = _parent.mirrorBasesData(bases);
        forts = _parent.mirrorAgentsData(forts);
        rollLogs = _parent.mirrorAgentsData(rollLogs);
      }

      traceData.agents = agents;
      traceData.bullets = bullets;
      traceData.bases = bases;
      traceData.forts = forts;
      traceData.rollLogs = rollLogs;

      _parent.gameTraceStack.push(traceData);

      if (_parent.gameTraceStack.length > _parent.bufferLen) {
        data = _parent.gameTraceStack[0];

        _parent.createAgents(data.agents);

        _parent.createBullets(data.bullets);

        _parent.createBases(data.bases);

        _parent.createForts(data.forts);

        _parent.createLogs(data.rollLogs); //_parent.setAgentsDir(agents);

      }
    });
    /*
            MY_SOCKET.on('agent', function (data) {
    //            console.log("--------agent---------");
                var traceData = {};
                var agents = data.agents;
                var bases = data.bases;
                var forts = data.forts;
                var bullets = data.bullets;
                var rollLogs = data.rollLogs;
    
                if(_parent.mainPlayer == 2) {
                    agents = _parent.mirrorAgentsData(agents);
                    bullets = _parent.mirrorAgentsData(bullets);
                    bases = _parent.mirrorBasesData(bases);
                    forts = _parent.mirrorAgentsData(forts);
                    rollLogs = _parent.mirrorAgentsData(rollLogs);
                }
    
                traceData.agents = agents;
                traceData.bullets = bullets;
                traceData.bases = bases;
                traceData.forts = forts;
                traceData.rollLogs = rollLogs;
    
                _parent.gameTraceStack.push(traceData);
    
                if(_parent.gameTraceStack.length > _parent.bufferLen) {
                    data = _parent.gameTraceStack[0];
                    _parent.createAgents(data.agents);
                    _parent.createBullets(data.bullets);
                    _parent.createBases(data.bases);
                    _parent.createForts(data.forts);
                    _parent.createLogs(data.rollLogs);
                    //_parent.setAgentsDir(agents);
                }
            });
    */

    this.startTraceTimer();
  },
  mirrorAgentsData_bak: function mirrorAgentsData_bak(agents) {
    //var gwidth = this.node.width/38;
    //var gheight = this.node.height/38;
    //todo
    var gwidth = 16;
    var gheight = 35;

    for (var i = agents.length - 1; i >= 0; i--) {
      agents[i].mypos.x = gwidth - agents[i].mypos.x;
      agents[i].mypos.y = gheight - agents[i].mypos.y;

      if (agents[i].enemypos) {
        agents[i].enemypos.x = gwidth - agents[i].enemypos.x;
        agents[i].enemypos.y = gheight - agents[i].enemypos.y;
      } //for firebomb those which has no specific enmeies, just a target location.


      if (agents[i].targetpos) {
        agents[i].targetpos.x = gwidth - agents[i].targetpos.x;
        agents[i].targetpos.y = gheight - agents[i].targetpos.y;
      } //agents[i].rot += 180;

    }

    ;
    return agents;
  },
  mirrorAgentsData: function mirrorAgentsData(agents) {
    //var gwidth = this.node.width/38;
    //var gheight = this.node.height/38;
    //todo
    var gwidth = 35;
    var gheight = 16;

    for (var i = agents.length - 1; i >= 0; i--) {
      agents[i].mypos.x = gwidth - agents[i].mypos.x;

      if (agents[i].enemypos) {
        agents[i].enemypos.x = gwidth - agents[i].enemypos.x;
      } //for firebomb those which has no specific enmeies, just a target location.


      if (agents[i].targetpos) {
        agents[i].targetpos.x = gwidth - agents[i].targetpos.x;
      } //agents[i].rot += 180;

    }

    ;
    return agents;
  },
  mirrorBuffData: function mirrorBuffData(buff) {
    var gwidth = this.node.width / 30;
    var gheight = this.node.height / 30;
    buff.mypos.x = gwidth - buff.mypos.x;
    buff.mypos.y = gheight - buff.mypos.y;
    return buff;
  },
  mirrorBasesData: function mirrorBasesData(bases) {
    var gwidth = this.node.width / 30;
    var gheight = this.node.height / 30;

    for (var i = bases.length - 1; i >= 0; i--) {
      if (bases[i].objectId == 1) {
        bases[i].objectId = 4;
      } else if (bases[i].objectId == 2) {
        bases[i].objectId = 6;
      } else if (bases[i].objectId == 3) {
        bases[i].objectId = 5;
      } else if (bases[i].objectId == 4) {
        bases[i].objectId = 1;
      } else if (bases[i].objectId == 6) {
        bases[i].objectId = 2;
      } else if (bases[i].objectId == 5) {
        bases[i].objectId = 3;
      } //in mirror mode, x, y should be ajusted.


      bases[i].mypos.x = gwidth - bases[i].mypos.x - 1;
      bases[i].mypos.y = gheight - bases[i].mypos.y;

      if (bases[i].enemypos) {
        bases[i].enemypos.x = gwidth - bases[i].enemypos.x - 1;
        bases[i].enemypos.y = gheight - bases[i].enemypos.y;
      } //for firebomb those which has no specific enmeies, just a target location.


      if (bases[i].targetpos) {
        bases[i].targetpos.x = gwidth - bases[i].targetpos.x - 1;
        bases[i].targetpos.y = gheight - bases[i].targetpos.y;
      }
    }

    ;
    return bases;
  },
  disconnectServer: function disconnectServer() {
    MY_SOCKET.disconnect();
  }
});

cc._RF.pop();