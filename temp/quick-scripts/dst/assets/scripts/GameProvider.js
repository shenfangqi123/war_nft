
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameProvider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fbdd5ReyFxHioXVNcTwoYt5', 'GameProvider');
// scripts/GameProvider.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// 定义一个判断函数
String.prototype.inArray = function (arr) {
  // 不是数组则抛出异常
  if (!arr) {
    console.log("ERR(in_array):Input is not an array");
  } // 遍历是否在数组中


  for (var i = 0, k = arr.length; i < k; i++) {
    if (this == arr[i]) {
      return true;
    }
  } // 如果不在数组中就会返回false


  return false;
};

Array.prototype.removeByValue = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) {
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
    if (!obj[this[j]]) {
      obj[this[j]] = 1;
      result.push(this[j]);
    }
  }

  return result;
};

var common = require("Common");

var socketProvider = require("SocketProvider");

cc.Class({
  "extends": socketProvider,
  properties: {
    bcnt: 0
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  // start () {},
  hideDragItem: function hideDragItem(innerId) {
    if (this.putSele[innerId]) {
      this.putSele[innerId].destroy();
      this.putSele[innerId] = null;
    }
  },
  createBuff: function createBuff(buff) {
    var myBuff, px, py;
    var canvasNode = this.node.parent;

    if (buff.typeId == 1) {
      this.playSnd("thunder");
      myBuff = cc.instantiate(this.playerPrefab[23]); //canvasNode.getChildByName("buffThunder").active = false;
    } else if (buff.typeId == 2) {
      this.playSnd("heal");
      myBuff = cc.instantiate(this.playerPrefab[24]); //canvasNode.getChildByName("buffHeal").active = false;
    } //hide select frame


    this.dispCharSele(); //remove buff icon

    if (this.putSele[buff.innerId]) {
      this.putSele[buff.innerId].parent.destroy();
    } //hide drag item disp
    //this.hideDragItem(buff.innerId);


    this.clickSele = {}; //todo 38

    px = buff.mypos.x * 38;
    py = buff.mypos.y * 38;
    var moveTo = cc.v2(px, py);
    myBuff.setPosition(moveTo);
    this.node.addChild(myBuff);
  },
  createAgents: function createAgents(agents) {
    var aid, myAgent, agent, agentNode;
    var px, py, eo; //var nodelist = cc.find("Canvas/layout");
    //console.log(nodelist);

    for (var i = 0; i < agents.length; i++) {
      agent = agents[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid); //px = (agent.mypos.x)*38;
      //py = (agent.mypos.y)*38;

      if (myAgent == null) {
        this.hideDragItem(agent.innerId);

        if (agent.role == "ske") {
          myAgent = cc.instantiate(this.playerPrefab[0]);
        } else if (agent.role == "ir") {
          myAgent = cc.instantiate(this.playerPrefab[20]);
        } else if (agent.role == "bee") {
          myAgent = cc.instantiate(this.playerPrefab[16]);
        } else if (agent.role == "wiz") {
          //myAgent = cc.instantiate(this.playerPrefab[17]);    
          myAgent = cc.instantiate(this.playerPrefab[26]);
        } else if (agent.role == "hr") {
          myAgent = cc.instantiate(this.playerPrefab[12]);
        } else if (agent.role == "lm") {
          myAgent = cc.instantiate(this.playerPrefab[14]);
        } else if (agent.role == "lr") {
          myAgent = cc.instantiate(this.playerPrefab[3]);
        } else if (agent.role == "gi") {
          myAgent = cc.instantiate(this.playerPrefab[4]);
        } else {
          continue;
        }

        myAgent.name = aid;
        myAgent.type = "agent";
        myAgent.active = true;
        myAgent.role = agent.role;
        myAgent.size = agent.size;
        myAgent.level = agent.level;
        agentNode = this.getComponentByRole(myAgent);
        agentNode.init();
        agentNode.setId(aid); //shadow should set in layout, because its zindex should be lower than any agents.

        agentNode.setShadow(this.shadowForAgent());
        agentNode.setTotalLife(agent.life);
        agentNode.setBlood(this.bloodForAgent(myAgent)); //if init pos is in south, face to north, otherwise....

        if (this.mainPlayer == 1) {
          agent.rot = 180;
        } else if (this.mainPlayer == 2) {
          agent.rot = 0;
        }

        console.log("--rec pt--");
        console.log(agent.mypos.x + ":::" + agent.mypos.y);
        px = agent.mypos.x * 38;
        py = agent.mypos.y * 38;
        agentNode.updatePos(px, py);
        this.node.addChild(myAgent);
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  createBullets: function createBullets(bullets) {
    var aid, myBullet, bullet, agentNode;
    var px, py, eo, eDis;

    for (var i = 0; i < bullets.length; i++) {
      bullet = bullets[i];
      aid = bullet.aid;
      myBullet = this.npcInfo.objectForKey(aid);

      if (myBullet == null) {
        if (bullet.role == "bullet") {
          myBullet = cc.instantiate(this.playerPrefab[1]); //myBullet = new cc.Node();

          myBullet.startPos = bullet.mypos;
          myBullet.active = false;
        } else if (bullet.role == "bomb") {
          console.log("bomb created");
          this.playSnd("fireSend");
          this.hideDragItem(bullet.innerId);
          myBullet = cc.instantiate(this.playerPrefab[5]);
          eDis = this.enemeyDistance(bullet.mypos.x, bullet.mypos.y, bullet.targetpos.x, bullet.targetpos.y);
          myBullet.startPos = bullet.mypos;
          myBullet.targetDis = eDis;
        } else if (bullet.role == "tama") {
          this.playSnd("gun");
          myBullet = cc.instantiate(this.playerPrefab[9]);
          myBullet.startPos = bullet.mypos;
          myBullet.active = false;
        } else if (bullet.role == "wizfire") {
          myBullet = cc.instantiate(this.playerPrefab[18]);
          myBullet.startPos = bullet.mypos;
          myBullet.active = false;
        } else {
          console.log("error, no bullet type.");
        }

        myBullet.name = aid;
        myBullet.type = "bullet"; //myBullet.active = true;

        myBullet.role = bullet.role;
        myBullet.updown = bullet.updown;
        myBullet.zIndex = 9999;
        agentNode = this.getComponentByRole(myBullet); // 将新增的节点添加到 Canvas 节点下面

        this.node.addChild(myBullet); //px = -1000;
        //py = -1000;

        px = 50;
        py = 50;
        var moveTo = cc.v2(px, py);
        var bulletRot = bullet.rot;

        if (this.mainPlayer == 1) {
          bulletRot += 180;
        } //since 2.1.1 setRotation is desperated.


        myBullet.angle = -1 * bulletRot; //myBullet.setRotation(bulletRot);  //bullet.rot+180

        myBullet.setPosition(moveTo);
        this.npcInfo.setObject(myBullet, aid);
      }
    }
  },
  createBases: function createBases(bases) {
    var aid, myAgent, agent, baseName, baseNode;

    for (var i = 0; i < bases.length; i++) {
      agent = bases[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid);

      if (myAgent == null) {
        myAgent = {};
        myAgent.name = aid;
        myAgent.type = "base";
        myAgent.active = true;
        myAgent.role = agent.role;
        myAgent.mypos = agent.mypos;
        myAgent.size = agent.size;
        baseName = "base" + agent.objectId;
        myAgent.baseObj = this.node.getChildByName(baseName);
        baseNode = myAgent.baseObj.getComponent("BaseSprite");
        baseNode.setTotalLife(agent.life);
        baseNode.setBlood(this.bloodForAgent(myAgent.baseObj));
        baseNode.setLife(agent.life);
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  createLogs: function createLogs(logs) {
    var aid, myAgent, agent, agentNode;
    var px, py; //this.playSnd("log");

    for (var i = 0; i < logs.length; i++) {
      agent = logs[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid); //todo 38

      px = agent.mypos.x * 38;
      py = agent.mypos.y * 38;

      if (myAgent == null) {
        this.hideDragItem(agent.innerId);
        myAgent = cc.instantiate(this.playerPrefab[8]);
        myAgent.name = aid;
        myAgent.type = "log";
        myAgent.active = true;
        myAgent.role = agent.role;
        agentNode = this.getComponentByRole(myAgent);
        agentNode.setId(aid);
        agentNode.setShadow(this.shadowForLog());
        var moveTo = cc.v2(px, py);
        agentNode.move(moveTo); // 将新增的节点添加到 Canvas 节点下面

        this.node.addChild(myAgent);
        this.playSnd("log");
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  createForts: function createForts(forts) {
    var aid, myAgent, agent, agentNode;
    var px, py, eo, zorder; //var nodelist = cc.find("Canvas/layout");
    //console.log(nodelist);

    for (var i = 0; i < forts.length; i++) {
      agent = forts[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid); //todo 38

      px = agent.mypos.x * 38;
      py = agent.mypos.y * 38;

      if (myAgent == null) {
        this.hideDragItem(agent.innerId);
        myAgent = cc.instantiate(this.playerPrefab[7]);
        myAgent.name = aid;
        myAgent.type = "fa";
        myAgent.spName = "FortASprite";
        myAgent.active = true;
        myAgent.role = agent.role;
        myAgent.size = agent.size; //1000:agent, 999:bullet 998:this;
        //fort base anchorY is middle, so y-2 is nessesary.
        //todo 16

        if (this.mainPlayer == 1) {
          zorder = 1001 + parseInt(16 - agent.mypos.y - 1);
        } else if (this.mainPlayer == 2) {
          zorder = 1001 + parseInt(16 - agent.mypos.y - 1);
        }

        myAgent.zIndex = zorder;
        agentNode = this.getComponentByRole(myAgent);
        agentNode.setZIndex(zorder);
        /*                
                        //agentNode.init();
                        //agentNode.setId(aid);
                        //agentNode.setShadow(this.shadowForAgent());
        */

        agentNode.setTotalLife(agent.life);
        agentNode.setBlood(this.bloodForAgent(myAgent)); //if init pos is in south, face to north, otherwise....

        if (this.mainPlayer == 1) {
          agent.rot = 180;
        } else if (this.mainPlayer == 2) {
          agent.rot = 0;
        }

        var moveTo = cc.v2(px, py);
        myAgent.setPosition(moveTo); //agentNode.playAngleAnimation(agent, null, this.mainPlayer);
        // 将新增的节点添加到 Canvas 节点下面

        this.node.addChild(myAgent);
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  agentProcess: function agentProcess(agents) {
    var remoteAgents = [];
    var localAgents = [];
    var killAgents = [];
    var agentObj, agentNode;
    var agentId;

    for (var i = 0; i < agents.length; i++) {
      remoteAgents.push(agents[i].aid);
    }

    localAgents = this.npcInfo.allKeys();
    killAgents = localAgents.minus(remoteAgents);

    for (var _iterator = _createForOfIteratorHelperLoose(killAgents), _step; !(_step = _iterator()).done;) {
      agentId = _step.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.type == "agent") {
        agentNode = this.getComponentByRole(agentObj);
        agentNode.remove();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
      }
    }
  },
  baseProcess: function baseProcess(bases) {
    var remoteBases = [];
    var killBases = [];
    var enemyBases = [];
    var baseObj;
    var warriorName;
    var warriorObj;
    var baseName;

    for (var i = 0; i < bases.length; i++) {
      baseName = "base" + bases[i].objectId;
      remoteBases.push(baseName);
      enemyBases.push(baseName);
    } // todo list: should manage to remove the base record in npcInfo.


    killBases = this._defaultBases.minus(remoteBases);

    for (var _iterator2 = _createForOfIteratorHelperLoose(killBases), _step2; !(_step2 = _iterator2()).done;) {
      baseName = _step2.value;
      this.dispLayoutMask(enemyBases, baseName);

      this._defaultBases.removeByValue(baseName);

      baseObj = this.node.getChildByName(baseName); //this.plusBaseKillNum(baseName);

      this.node.removeChild(baseObj);
      this.playEffect("base", baseObj.x, baseObj.y);
    }
  },
  plusBaseKillNum: function plusBaseKillNum(baseName) {
    //todo: layout node must be set in init 
    var enemynum = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
    var mynum = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");

    if (baseName.inArray(["base1", "base2", "base3"])) {
      enemynum.string = parseInt(enemynum.string) + 1;
    } else {
      mynum.string = parseInt(enemynum.string) + 1;
    }
  },
  //called when game is over
  killBases: function killBases(dir) {
    //todo: layout node must be set in init 
    //var enemynum = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
    //var mynum = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
    var killBases;
    var baseObj, bd;
    var baseName;

    if (dir == "up") {
      killBases = ["base1", "base2", "base3"]; //enemynum.string = 3;
    } else {
      killBases = ["base4", "base5", "base6"]; //mynum.string = 3;
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(killBases), _step3; !(_step3 = _iterator3()).done;) {
      baseName = _step3.value;
      //this._defaultBases.removeByValue(baseName);
      baseObj = this.node.getChildByName(baseName);

      if (baseObj) {
        this.playEffect("base", baseObj.x, baseObj.y);
        this.node.removeChild(baseObj);
      }
    }
  },
  undisplayMask: function undisplayMask(sel) {
    console.log(sel);
    this.node.getChildByName(sel).active = false;
  },
  dispLayoutMask: function dispLayoutMask(killEnemyBases, baseName) {
    var _self = this;

    if (baseName == "base4" || baseName == "base5" || baseName == "base6") {
      return;
    } //if("base1".inArray(killEnemyBases) && "base2".inArray(killEnemyBases) && "base3".inArray(killEnemyBases)) {
    //    return;
    //}


    if ("base1".inArray(killEnemyBases) && "base2".inArray(killEnemyBases)) {
      this.showMask("seleMask12", 2);
    } else if ("base1".inArray(killEnemyBases) && "base3".inArray(killEnemyBases)) {
      this.showMask("seleMask13", 2);
    } else if ("base1".inArray(killEnemyBases)) {
      this.showMask("seleMask1", 2);
    }
  },
  showDragMask: function showDragMask(role) {
    if (!this.ifNotMaskRole(role)) {
      this.node.getChildByName(this.maskType).active = true;
    }
  },
  unshowDragMask: function unshowDragMask() {
    this.node.getChildByName(this.maskType).active = false;
  },
  showMask: function showMask(maskType, delay) {
    var _self = this;

    this.maskType = maskType;
    this.node.getChildByName(maskType).active = true;
    this.scheduleOnce(function () {
      _self.undisplayMask(maskType);
    }, delay);
  },
  putErrorMsg: function putErrorMsg() {
    var _self = this;

    this.node.getChildByName("putError").active = true;
    this.scheduleOnce(function () {
      _self.undisplayPutErr();
    }, 1);
  },
  undisplayPutErr: function undisplayPutErr() {
    this.node.getChildByName("putError").active = false;
  },
  fortProcess: function fortProcess(forts, fortsFuture) {
    var remoteAgents = [];
    var localAgents = [];
    var killAgents = [];
    var agentObj, agentNode;
    var agentId, bd;

    for (var i = 0; i < forts.length; i++) {
      remoteAgents.push(forts[i].aid);
    }

    localAgents = this.npcInfo.allKeys();
    killAgents = localAgents.minus(remoteAgents);

    for (var _iterator4 = _createForOfIteratorHelperLoose(killAgents), _step4; !(_step4 = _iterator4()).done;) {
      agentId = _step4.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.type == "fa") {
        this.playEffect("fort", agentObj.x, agentObj.y); //agentNode = this.getComponentByRole(agentObj);
        //agentNode.remove();

        this.node.removeChild(agentObj);
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
        this.playEffect("base", agentObj.x, agentObj.y);
      }
    }
  },
  logProcess: function logProcess(logs) {
    var remoteAgents = [];
    var localAgents = [];
    var killAgents = [];
    var agentObj, agentNode;
    var agentId, bd;

    for (var i = 0; i < logs.length; i++) {
      remoteAgents.push(logs[i].aid);
    }

    localAgents = this.npcInfo.allKeys();
    killAgents = localAgents.minus(remoteAgents);

    for (var _iterator5 = _createForOfIteratorHelperLoose(killAgents), _step5; !(_step5 = _iterator5()).done;) {
      agentId = _step5.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.role == "log") {
        this.playEffect("log", agentObj.x, agentObj.y);
        agentNode = this.getComponentByRole(agentObj);
        agentNode.remove();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
      }
    }
  },
  bulletProcess: function bulletProcess(bullets) {
    var remoteBullets = [];
    var localBullets = [];
    var killBullets = [];
    var agentObj, agentNode;
    var agentId;

    for (var i = 0; i < bullets.length; i++) {
      remoteBullets.push(bullets[i].aid);
    }

    localBullets = this.npcInfo.allKeys();
    killBullets = localBullets.minus(remoteBullets);

    for (var _iterator6 = _createForOfIteratorHelperLoose(killBullets), _step6; !(_step6 = _iterator6()).done;) {
      agentId = _step6.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.role == "bomb") {
        agentNode = this.getComponentByRole(agentObj);
        agentObj.destroy();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
        this.playEffect("bomb", agentObj.x, agentObj.y);
      }

      if (agentObj.role == "wizfire") {
        agentNode = this.getComponentByRole(agentObj);
        agentObj.destroy();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);

        if (agentObj.x && agentObj.y) {
          this.playEffect("wizfire", agentObj.x, agentObj.y);
        }
      } else if (agentObj.role == "bullet" || agentObj.role == "tama") {
        agentNode = this.getComponentByRole(agentObj);
        agentObj.destroy();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
      }
    }
  },
  //shake the screen
  startSceneJitter: function startSceneJitter() {
    var sceneNode = this.node;
    var ox = sceneNode.x;
    var oy = sceneNode.y;
    var cnt = 0;
    var lower = -4;
    var upper = 4;

    var callBack = function callBack() {
      cnt++;
      var randomX = Math.floor(Math.random() * (upper - lower)) + lower;
      var randomY = Math.floor(Math.random() * (upper - lower)) + lower;
      sceneNode.x += randomX;
      sceneNode.y += randomY;

      if (cnt >= 10) {
        sceneNode.stopAllActions();
        sceneNode.x = ox;
        sceneNode.y = oy;
      }
    };

    var node = this.node; //场景常驻节点

    var del = cc.delayTime(1 / 30);
    var cal = cc.callFunc(callBack);
    var seq = cc.sequence(del, cal);
    node.runAction(cc.repeatForever(seq));
  },
  playBases: function playBases(bases) {
    var remoteBases = [];
    var baseObj, myAgent, agent;
    var warriorName;
    var warriorObj;
    var baseName, kingNode, agentNode, kingArrow, warrior;
    var actType, attackDura, now;
    var tmpB = {};
    var eoDead;
    var eo = null;

    for (var i = 0; i < bases.length; i++) {
      agent = bases[i];
      baseName = "base" + agent.objectId;
      attackDura = agent.attackDura;
      myAgent = this.npcInfo.objectForKey(agent.aid).baseObj;
      tmpB[agent.aid] = baseName;
      remoteBases.push(baseName);
      actType = agent.actType;

      if (myAgent) {
        myAgent.getComponent("BaseSprite").setLife(agent.life);
        warrior = myAgent.getChildByName("warrior");

        if (warrior) {
          warrior.role = "lr";
          agentNode = this.getComponentByRole(warrior); //if no enmey then standby

          if (myAgent && agent.actType == "wait") {
            agentNode.playBaseWarriorAnimationDefault("move", agent.objectId);
          } else if (myAgent && agent.actType == "sa") {
            agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
          }
        }

        warrior = myAgent.getChildByName("gun");

        if (warrior) {
          warrior.role = "gun";
          agentNode = this.getComponentByRole(warrior); //if no enmey then standby

          if (myAgent && agent.actType == "wait") {//agentNode.playFortWarriorAnimationDefault("move", this.mainPlayer, agent.objectId);
          } else if (myAgent && agent.actType == "sa") {
            agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
          }
        }
      }
    }
  },
  playAgents: function playAgents(agents, agentsFuture) {
    var myAgent;
    var px, py, aid;
    var agentNode,
        agent,
        eo = null;
    var eoDead;

    for (var i = 0; i < agents.length; i++) {
      agent = agents[i];
      myAgent = this.npcInfo.objectForKey(agent.aid);

      if (myAgent && myAgent.type == "agent") {
        agentNode = this.getComponentByRole(myAgent);
        agentNode.playAni(agent, this.getFutureAgent(agent.aid, agentsFuture), this.mainPlayer);
        agentNode.setLife(agent.life);
        agentNode.setGroupKill(agent.groupKill);
        px = Math.round(agent.mypos.x * 38);
        py = Math.round(agent.mypos.y * 38);
        agentNode.updatePos(px, py);
      }
    }
  },
  playForts: function playForts(forts) {
    var myAgent;
    var agentNode,
        agent,
        warrior = null;

    for (var i = 0; i < forts.length; i++) {
      agent = forts[i];
      myAgent = this.npcInfo.objectForKey(agent.aid);

      if (!myAgent) {
        continue;
      }

      myAgent.role = "fa";
      agentNode = this.getComponentByRole(myAgent);
      agentNode.setLife(agent.life);
      warrior = myAgent.getChildByName("warrior");
      warrior.role = "lr";
      agentNode = this.getComponentByRole(warrior); //if no enmey then standby

      if (myAgent && agent.actType == "move") {
        agentNode.playFortWarriorAnimationDefault("move", agent.isHero, this.mainPlayer);
      } else if (myAgent && agent.actType == "sa") {
        agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
      }
    }
  },
  playLogs: function playLogs(logs) {
    var agent, myAgent;
    var px, py, aid;
    var agentNode,
        bullet,
        eo = null;
    var sc;
    var moveTo;

    for (var i = 0; i < logs.length; i++) {
      agent = logs[i];
      myAgent = this.npcInfo.objectForKey(agent.aid);

      if (myAgent) {
        agentNode = this.getComponentByRole(myAgent);
        agentNode.move(agent.mypos);
      }
    }
  },
  playBullets: function playBullets(bullets) {
    var myBullet;
    var px, py, aid;
    var agentNode,
        bullet,
        eo = null;
    var sc;
    var bulletRot;
    var subBullet;

    for (var i = 0; i < bullets.length; i++) {
      bullet = bullets[i];
      myBullet = this.npcInfo.objectForKey(bullet.aid);

      if (myBullet) {
        //2 fort bullet emit the same time, only display the proper bullet.
        if (bullet.updown == "up" && this.mainPlayer == 2) {
          continue;
        }

        if (bullet.updown == "down" && this.mainPlayer == 1) {
          continue;
        }

        this.showBullet(myBullet, bullet);
      }
    }
  },
  showBullet: function showBullet(myBullet, bullet) {
    var subBullet, agentNode, px, py, moveTo, bulletRot;
    myBullet.active = true;
    agentNode = this.getComponentByRole(myBullet); //todo 38

    px = bullet.mypos.x * 38;
    py = bullet.mypos.y * 38;
    moveTo = cc.v2(px, py);
    bulletRot = bullet.rot; //if(this.mainPlayer == 1) {
    //    bulletRot += 180;
    //}
    //1000:agent, 999:this bullet 998:forts;
    //make bullet display under agent which is at same position.
    //todo 16

    myBullet.zIndex = 1000 + parseInt(16 - bullet.mypos.y);

    if (myBullet.role == "bullet") {
      subBullet = cc.instantiate(this.playerPrefab[1]); //subBullet = cc.instantiate(this.playerPrefab[25]);
      // first convert moveTo(belong to layout node) to world position.

      var pp = this.node.convertToWorldSpaceAR(moveTo); // convert world postion to myBullet position.

      pp = myBullet.convertToNodeSpaceAR(pp);

      if (this.mainPlayer == 1) {
        myBullet.angle = 90 - bulletRot;
      } else {
        myBullet.angle = (90 - bulletRot) * -1;
      }

      subBullet.setPosition(pp);
      myBullet.addChild(subBullet);
    } else if (myBullet.role == "bomb") {
      sc = this.getFireBombScale(bullet.mypos, bullet.targetpos, myBullet.targetDis, myBullet.startPos);
      myBullet.scaleX = sc;
      myBullet.scaleY = sc;
      myBullet.zIndex = 9999;
      myBullet.angle = -1 * bulletRot;
      myBullet.setPosition(moveTo);
      /*
          var randomTime = Math.ceil(Math.random()*40)-10;
          var fh = myBullet.getChildByName("fireHead");
          //fh.skewY = randomTime;
          //fh.skewX = randomTime;
           //fire bomb size changing according to the distance between target and origin.
          sc = this.getFireBombScale(bullet.mypos, bullet.targetpos, myBullet.targetDis, myBullet.startPos);
          agentNode.node.scaleX=sc;
          agentNode.node.scaleY=sc;
          myBullet.getComponent(cc.MotionStreak).stroke *= sc;
      */
    } else if (myBullet.role == "wizfire") {
      /* 
      //old wiz fire ball
       myBullet.zIndex = 9999;
      // shake a little bit
      //var randomTime = Math.ceil(Math.random()*40)-10;
      //bulletRot += randomTime;
       myBullet.angle = -1*bulletRot;                
      myBullet.setPosition(moveTo);
      */
      subBullet = cc.instantiate(this.playerPrefab[25]); // first convert moveTo(belong to layout node) to world position.

      var pp = this.node.convertToWorldSpaceAR(moveTo); // convert world postion to myBullet position.

      pp = myBullet.convertToNodeSpaceAR(pp); //subBullet.setPosition(pp);
      //myBullet.addChild(subBullet);

      if (myBullet.lastpos && myBullet.lastpos.sub(pp).mag() > 50) {
        subBullet.setPosition(pp);
        myBullet.addChild(subBullet);
        myBullet.lastpos = pp;
      }

      if (!myBullet.lastpos) {
        subBullet.setPosition(pp);
        myBullet.addChild(subBullet);
        myBullet.lastpos = pp;
      }
    } else {
      myBullet.angle = -1 * bulletRot;
      myBullet.setPosition(moveTo);
    }
  },
  getFireBombScale: function getFireBombScale(bulletPos, targetPos, targetDis, startPos) {
    var xDif, yDif;
    var midPos = {};
    midPos.x = startPos.x + (targetPos.x - startPos.x) / 2;
    midPos.y = startPos.y + (targetPos.y - startPos.y) / 2;
    var xDif = bulletPos.x - midPos.x;
    var yDif = bulletPos.y - midPos.y;
    var dis = Math.sqrt(xDif * xDif + yDif * yDif);
    var targetDis = targetDis * 0.5;
    return (targetDis - dis) * 0.7 / targetDis + 0.5; //scale from 0.5 -- 1.2
  },
  enemeyDistance: function enemeyDistance(px, py, ex, ey) {
    var xDif, yDif, dis;
    xDif = px - ex;
    yDif = py - ey;
    dis = Math.sqrt(xDif * xDif + yDif * yDif);
    return dis;
  },
  getComponentByRole: function getComponentByRole(agentObj) {
    var role = agentObj.role;

    if (role == "ske") {
      return agentObj.getComponent('SkeSprite');
    } else if (role == "ir") {
      return agentObj.getComponent('SkeSprite');
    } else if (role == "bee") {
      return agentObj.getComponent('BeeSprite');
    } else if (role == "wiz") {
      //return agentObj.getComponent('WizSprite');
      return agentObj.getComponent('CrabSprite');
    } else if (role == "hr") {
      return agentObj.getComponent('HeroSprite');
    } else if (role == "lm") {
      return agentObj.getComponent('LightmanSprite');
    } else if (role == "lr") {
      return agentObj.getComponent('ArcSprite');
    } else if (role == "gi") {
      return agentObj.getComponent('GiantSprite');
    } else if (role == "bullet") {
      return agentObj.getComponent('Arrow');
    } else if (role == "bomb") {
      return agentObj.getComponent('BombScript');
    } else if (role == "log") {
      return agentObj.getComponent('LogSprite');
    } else if (role == "gun") {
      return agentObj.getComponent('GunSprite');
    } else if (role == "base") {
      return agentObj.getComponent('BaseSprite');
    } else if (role == "fa") {
      return agentObj.getComponent('BaseSprite');
    }
  },
  getKilledEnemies: function getKilledEnemies() {
    var aids = this.removedNpcInfo.allKeys();
    var aid;
    var killedEnemies = []; //when one attack cause multi kills occured in one frame, multi enemies must be handled. 

    for (var i = 0; i < aids.length; i++) {
      aid = aids[i];
      killedEnemies.push(this.removedNpcInfo.objectForKey(aid));
    }

    return killedEnemies;
  },
  getFutureAgent: function getFutureAgent(aid, agentsFuture) {
    for (var i = 0; i < agentsFuture.length; i++) {
      if (agentsFuture[i].aid == aid) {
        return agentsFuture[i];
      }
    }

    return null;
  },
  bloodForAgent: function bloodForAgent(agent) {
    var bloodObj = cc.instantiate(this.playerPrefab[11]);
    var bloodOp = bloodObj.getComponent("BloodBar");
    bloodOp.setBarLevel(agent.level);
    bloodObj.active = false;
    agent.addChild(bloodObj);
    return bloodObj;
  },
  shadowForAgent: function shadowForAgent() {
    var shadowObj = cc.instantiate(this.playerPrefab[2]);
    shadowObj.active = false;
    this.node.addChild(shadowObj);
    return shadowObj;
  },
  shadowForLog: function shadowForLog() {
    var shadowObj = cc.instantiate(this.playerPrefab[2]); // 将新增的节点添加到 Canvas 节点下面

    shadowObj.scaleX = 1;
    shadowObj.sacleY = 1;
    shadowObj.active = false;
    this.node.addChild(shadowObj);
    return shadowObj;
  },
  setClickItem: function setClickItem(select) {
    this.clickSele = select;
  },
  putClickItem: function putClickItem(selCard, node, pt) {
    var putNode = cc.instantiate(node);
    var innerId = this.nick + "_" + Number(new Date());
    putNode.x = pt.x;
    putNode.y = pt.y;
    putNode.name = innerId;
    putNode.active = true;
    selCard.addChild(putNode);
    this.putSele[innerId] = putNode;
    return innerId;
  },
  setDragItem: function setDragItem(params, node) {
    var card = params.target;
    var dragNode = cc.instantiate(node);
    var innerId = this.nick + "_" + Number(new Date());
    node.x = 0;
    node.y = 0;
    dragNode.name = innerId;
    dragNode.actvie = true;
    card.addChild(dragNode);
    this.putSele[innerId] = dragNode;
    this.draggingItem = innerId;
    return innerId;
  },
  unsetDragItem: function unsetDragItem(innerId) {
    this.unshowDragMask();
    this.draggingItem = "";
    this.putSele[innerId].destroy();
    this.putSele[innerId] = null;
  },
  moveDragItem: function moveDragItem(sel, delta) {
    if (this.putSele[this.draggingItem]) {
      this.putSele[this.draggingItem].x += delta.x;
      this.putSele[this.draggingItem].y += delta.y;

      if (this.putSele[this.draggingItem].y < 0) {//this.putSele[this.draggingItem].y = 0
      }
    }
  },
  clearDragItem: function clearDragItem(param, select) {
    var innerId;
    var card = param.target;
    var sel = card._name;
    var pt = {};
    var layoutPt = this.node.position;
    var yOffset = 0;
    var magicCost = select.magicCost;
    var level = select.level;
    var role = select.role;
    console.log("role:" + role);
    this.unshowDragMask();

    if (this.mainPlayer == 1) {
      yOffset = -50;
    } else {
      yOffset = 20;
    }

    if (this.putSele[this.draggingItem]) {
      innerId = this.putSele[this.draggingItem].name; //layout maybe scaled according to devices.

      pt.x = (this.putSele[this.draggingItem].x + card.x - layoutPt.x) / this.node.scaleX;
      pt.y = (this.putSele[this.draggingItem].y + card.y - layoutPt.y + yOffset) / this.node.scaleY;

      if (!this.isValidPutPoint(pt) && !this.ifNotMaskRole(role)) {
        console.log("invalid postion.");
        this.putSele[innerId].destroy();
        this.putSele[innerId] = null;
        this.putErrorMsg();
        return;
      }

      this.sendSodier(magicCost, role, pt, innerId, level);
      this.draggingItem = "";
    }
  },
  sendSodier: function sendSodier(magicCost, role, pt, innerId, level) {
    //var innerId = this.nick +"_"+ Number(new Date());
    var isHero = this.mainPlayer == 1;
    var bar = this.canvasNode.getChildByName("magicBar");
    var juice = bar.getChildByName("juice");
    var cost = this.useMagic(magicCost);
    this.playSnd("put1");

    if (cost) {
      juice.width = cost;
      MY_SOCKET.json.emit('cmd', {
        'isHero': isHero,
        'roomId': this.roomId,
        'innerId': innerId,
        'role': role,
        'pt': pt,
        'level': level
      });
    } else {
      this.putSele[innerId].destroy();
      this.putSele[innerId] = null;
    }
  },
  setMagicBar: function setMagicBar() {
    var bar = this.canvasNode.getChildByName("magicBar");
    var juice = bar.getChildByName("juice");

    if (juice.width < 600) {
      juice.width += this.addJuice;
    }

    if (juice.width % 50 == 0) {
      this.magicAmount = juice.width / 50;
      this.updateCardStatus();
    }
  },
  useMagic: function useMagic(amount) {
    var bar = this.canvasNode.getChildByName("magicBar");
    var juice = bar.getChildByName("juice");
    var afterUse = juice.width - amount * 50;

    if (afterUse >= 0) {
      return afterUse;
    }

    return false;
  },
  updateCardStatus: function updateCardStatus() {
    var head = "sel";
    var nodeName, selNode;
    var selSprite = null;

    for (var i = 1; i <= 7; i++) {
      nodeName = head + i;
      selNode = this.canvasNode.getChildByName(nodeName);

      if (selNode) {
        selSprite = selNode.getComponent('SelCard');

        if (selSprite) {
          if (selSprite.magicCost <= this.magicAmount) {
            selNode.color = new cc.Color(255, 255, 255);
          } else {
            selNode.color = new cc.Color(127, 127, 127);
          }
        }
      }
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVQcm92aWRlci5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJpbkFycmF5IiwiYXJyIiwiY29uc29sZSIsImxvZyIsImkiLCJrIiwibGVuZ3RoIiwiQXJyYXkiLCJyZW1vdmVCeVZhbHVlIiwidmFsIiwic3BsaWNlIiwibWludXMiLCJyZXN1bHQiLCJvYmoiLCJqIiwicHVzaCIsImNvbW1vbiIsInJlcXVpcmUiLCJzb2NrZXRQcm92aWRlciIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYmNudCIsImhpZGVEcmFnSXRlbSIsImlubmVySWQiLCJwdXRTZWxlIiwiZGVzdHJveSIsImNyZWF0ZUJ1ZmYiLCJidWZmIiwibXlCdWZmIiwicHgiLCJweSIsImNhbnZhc05vZGUiLCJub2RlIiwicGFyZW50IiwidHlwZUlkIiwicGxheVNuZCIsImluc3RhbnRpYXRlIiwicGxheWVyUHJlZmFiIiwiZGlzcENoYXJTZWxlIiwiY2xpY2tTZWxlIiwibXlwb3MiLCJ4IiwieSIsIm1vdmVUbyIsInYyIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsImNyZWF0ZUFnZW50cyIsImFnZW50cyIsImFpZCIsIm15QWdlbnQiLCJhZ2VudCIsImFnZW50Tm9kZSIsImVvIiwibnBjSW5mbyIsIm9iamVjdEZvcktleSIsInJvbGUiLCJuYW1lIiwidHlwZSIsImFjdGl2ZSIsInNpemUiLCJsZXZlbCIsImdldENvbXBvbmVudEJ5Um9sZSIsImluaXQiLCJzZXRJZCIsInNldFNoYWRvdyIsInNoYWRvd0ZvckFnZW50Iiwic2V0VG90YWxMaWZlIiwibGlmZSIsInNldEJsb29kIiwiYmxvb2RGb3JBZ2VudCIsIm1haW5QbGF5ZXIiLCJyb3QiLCJ1cGRhdGVQb3MiLCJzZXRPYmplY3QiLCJjcmVhdGVCdWxsZXRzIiwiYnVsbGV0cyIsIm15QnVsbGV0IiwiYnVsbGV0IiwiZURpcyIsInN0YXJ0UG9zIiwiZW5lbWV5RGlzdGFuY2UiLCJ0YXJnZXRwb3MiLCJ0YXJnZXREaXMiLCJ1cGRvd24iLCJ6SW5kZXgiLCJidWxsZXRSb3QiLCJhbmdsZSIsImNyZWF0ZUJhc2VzIiwiYmFzZXMiLCJiYXNlTmFtZSIsImJhc2VOb2RlIiwib2JqZWN0SWQiLCJiYXNlT2JqIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJzZXRMaWZlIiwiY3JlYXRlTG9ncyIsImxvZ3MiLCJzaGFkb3dGb3JMb2ciLCJtb3ZlIiwiY3JlYXRlRm9ydHMiLCJmb3J0cyIsInpvcmRlciIsInNwTmFtZSIsInBhcnNlSW50Iiwic2V0WkluZGV4IiwiYWdlbnRQcm9jZXNzIiwicmVtb3RlQWdlbnRzIiwibG9jYWxBZ2VudHMiLCJraWxsQWdlbnRzIiwiYWdlbnRPYmoiLCJhZ2VudElkIiwiYWxsS2V5cyIsInJlbW92ZSIsInJlbW92ZWROcGNJbmZvIiwicmVtb3ZlT2JqZWN0Rm9yS2V5IiwiYmFzZVByb2Nlc3MiLCJyZW1vdGVCYXNlcyIsImtpbGxCYXNlcyIsImVuZW15QmFzZXMiLCJ3YXJyaW9yTmFtZSIsIndhcnJpb3JPYmoiLCJfZGVmYXVsdEJhc2VzIiwiZGlzcExheW91dE1hc2siLCJyZW1vdmVDaGlsZCIsInBsYXlFZmZlY3QiLCJwbHVzQmFzZUtpbGxOdW0iLCJlbmVteW51bSIsIm15bnVtIiwic3RyaW5nIiwiZGlyIiwiYmQiLCJ1bmRpc3BsYXlNYXNrIiwic2VsIiwia2lsbEVuZW15QmFzZXMiLCJfc2VsZiIsInNob3dNYXNrIiwic2hvd0RyYWdNYXNrIiwiaWZOb3RNYXNrUm9sZSIsIm1hc2tUeXBlIiwidW5zaG93RHJhZ01hc2siLCJkZWxheSIsInNjaGVkdWxlT25jZSIsInB1dEVycm9yTXNnIiwidW5kaXNwbGF5UHV0RXJyIiwiZm9ydFByb2Nlc3MiLCJmb3J0c0Z1dHVyZSIsImxvZ1Byb2Nlc3MiLCJidWxsZXRQcm9jZXNzIiwicmVtb3RlQnVsbGV0cyIsImxvY2FsQnVsbGV0cyIsImtpbGxCdWxsZXRzIiwic3RhcnRTY2VuZUppdHRlciIsInNjZW5lTm9kZSIsIm94Iiwib3kiLCJjbnQiLCJsb3dlciIsInVwcGVyIiwiY2FsbEJhY2siLCJyYW5kb21YIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tWSIsInN0b3BBbGxBY3Rpb25zIiwiZGVsIiwiZGVsYXlUaW1lIiwiY2FsIiwiY2FsbEZ1bmMiLCJzZXEiLCJzZXF1ZW5jZSIsInJ1bkFjdGlvbiIsInJlcGVhdEZvcmV2ZXIiLCJwbGF5QmFzZXMiLCJraW5nTm9kZSIsImtpbmdBcnJvdyIsIndhcnJpb3IiLCJhY3RUeXBlIiwiYXR0YWNrRHVyYSIsIm5vdyIsInRtcEIiLCJlb0RlYWQiLCJwbGF5QmFzZVdhcnJpb3JBbmltYXRpb25EZWZhdWx0IiwicGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uIiwicGxheUFnZW50cyIsImFnZW50c0Z1dHVyZSIsInBsYXlBbmkiLCJnZXRGdXR1cmVBZ2VudCIsInNldEdyb3VwS2lsbCIsImdyb3VwS2lsbCIsInJvdW5kIiwicGxheUZvcnRzIiwicGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdCIsImlzSGVybyIsInBsYXlMb2dzIiwic2MiLCJwbGF5QnVsbGV0cyIsInN1YkJ1bGxldCIsInNob3dCdWxsZXQiLCJwcCIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiZ2V0RmlyZUJvbWJTY2FsZSIsInNjYWxlWCIsInNjYWxlWSIsImxhc3Rwb3MiLCJzdWIiLCJtYWciLCJidWxsZXRQb3MiLCJ0YXJnZXRQb3MiLCJ4RGlmIiwieURpZiIsIm1pZFBvcyIsImRpcyIsInNxcnQiLCJleCIsImV5IiwiZ2V0S2lsbGVkRW5lbWllcyIsImFpZHMiLCJraWxsZWRFbmVtaWVzIiwiYmxvb2RPYmoiLCJibG9vZE9wIiwic2V0QmFyTGV2ZWwiLCJzaGFkb3dPYmoiLCJzYWNsZVkiLCJzZXRDbGlja0l0ZW0iLCJzZWxlY3QiLCJwdXRDbGlja0l0ZW0iLCJzZWxDYXJkIiwicHQiLCJwdXROb2RlIiwibmljayIsIk51bWJlciIsIkRhdGUiLCJzZXREcmFnSXRlbSIsInBhcmFtcyIsImNhcmQiLCJ0YXJnZXQiLCJkcmFnTm9kZSIsImFjdHZpZSIsImRyYWdnaW5nSXRlbSIsInVuc2V0RHJhZ0l0ZW0iLCJtb3ZlRHJhZ0l0ZW0iLCJkZWx0YSIsImNsZWFyRHJhZ0l0ZW0iLCJwYXJhbSIsIl9uYW1lIiwibGF5b3V0UHQiLCJwb3NpdGlvbiIsInlPZmZzZXQiLCJtYWdpY0Nvc3QiLCJpc1ZhbGlkUHV0UG9pbnQiLCJzZW5kU29kaWVyIiwiYmFyIiwianVpY2UiLCJjb3N0IiwidXNlTWFnaWMiLCJ3aWR0aCIsIk1ZX1NPQ0tFVCIsImpzb24iLCJlbWl0Iiwicm9vbUlkIiwic2V0TWFnaWNCYXIiLCJhZGRKdWljZSIsIm1hZ2ljQW1vdW50IiwidXBkYXRlQ2FyZFN0YXR1cyIsImFtb3VudCIsImFmdGVyVXNlIiwiaGVhZCIsIm5vZGVOYW1lIiwic2VsTm9kZSIsInNlbFNwcml0ZSIsImNvbG9yIiwiQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxPQUFqQixHQUEyQixVQUFTQyxHQUFULEVBQWM7QUFDckM7QUFDQSxNQUFHLENBQUNBLEdBQUosRUFBUTtBQUNMQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNGLEdBSm9DLENBS3JDOzs7QUFDQSxPQUFJLElBQUlDLENBQUMsR0FBQyxDQUFOLEVBQVFDLENBQUMsR0FBQ0osR0FBRyxDQUFDSyxNQUFsQixFQUF5QkYsQ0FBQyxHQUFDQyxDQUEzQixFQUE2QkQsQ0FBQyxFQUE5QixFQUFrQztBQUM5QixRQUFHLFFBQU1ILEdBQUcsQ0FBQ0csQ0FBRCxDQUFaLEVBQWlCO0FBQ2IsYUFBTyxJQUFQO0FBQ0g7QUFDSixHQVZvQyxDQVdyQzs7O0FBQ0EsU0FBTyxLQUFQO0FBQ0gsQ0FiRDs7QUFlQUcsS0FBSyxDQUFDUixTQUFOLENBQWdCUyxhQUFoQixHQUFnQyxVQUFTQyxHQUFULEVB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QUFDWixhQUFPQSxRQUFQO0FBQ0g7O0FBQ0QsV0FBTyxLQUFQO0FBQ0gsR0F4b0NJO0FBMG9DTEYsRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQVc7QUFDekIsUUFBSUcsSUFBSSxHQUFHLEtBQVg7QUFDQSxRQUFJQyxRQUFKLEVBQWNDLE9BQWQ7QUFDQSxRQUFJQyxTQUFTLEdBQUcsSUFBaEI7O0FBRUEsU0FBSSxJQUFJOVEsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxJQUFFLENBQWYsRUFBaUJBLENBQUMsRUFBbEIsRUFBc0I7QUFDbEI0USxNQUFBQSxRQUFRLEdBQUdELElBQUksR0FBRzNRLENBQWxCO0FBQ0E2USxNQUFBQSxPQUFPLEdBQUcsS0FBS2pQLFVBQUwsQ0FBZ0IrRCxjQUFoQixDQUErQmlMLFFBQS9CLENBQVY7O0FBQ0EsVUFBR0MsT0FBSCxFQUFZO0FBQ1JDLFFBQUFBLFNBQVMsR0FBR0QsT0FBTyxDQUFDakwsWUFBUixDQUFxQixTQUFyQixDQUFaOztBQUNBLFlBQUdrTCxTQUFILEVBQWM7QUFDVixjQUFHQSxTQUFTLENBQUNyQixTQUFWLElBQXVCLEtBQUtjLFdBQS9CLEVBQTRDO0FBQ3hDTSxZQUFBQSxPQUFPLENBQUNFLEtBQVIsR0FBZ0IsSUFBSWhRLEVBQUUsQ0FBQ2lRLEtBQVAsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLENBQWhCO0FBQ0gsV0FGRCxNQUVPO0FBQ0hILFlBQUFBLE9BQU8sQ0FBQ0UsS0FBUixHQUFnQixJQUFJaFEsRUFBRSxDQUFDaVEsS0FBUCxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBaEI7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBN3BDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyDlrprkuYnkuIDkuKrliKTmlq3lh73mlbBcblN0cmluZy5wcm90b3R5cGUuaW5BcnJheSA9IGZ1bmN0aW9uKGFycikge1xuICAgIC8vIOS4jeaYr+aVsOe7hOWImeaKm+WHuuW8guW4uFxuICAgIGlmKCFhcnIpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiRVJSKGluX2FycmF5KTpJbnB1dCBpcyBub3QgYW4gYXJyYXlcIik7XG4gICAgfVxuICAgIC8vIOmBjeWOhuaYr+WQpuWcqOaVsOe7hOS4rVxuICAgIGZvcih2YXIgaT0wLGs9YXJyLmxlbmd0aDtpPGs7aSsrKSB7XG4gICAgICAgIGlmKHRoaXM9PWFycltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g5aaC5p6c5LiN5Zyo5pWw57uE5Lit5bCx5Lya6L+U5ZueZmFsc2VcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5BcnJheS5wcm90b3R5cGUucmVtb3ZlQnlWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIGZvcih2YXIgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGlmKHRoaXNbaV0gPT0gdmFsKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuQXJyYXkucHJvdG90eXBlLm1pbnVzID0gZnVuY3Rpb24gKGFycikge1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb2JqW2FycltpXV0gPSAxO1xuICAgIH1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKCFvYmpbdGhpc1tqXV0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9ialt0aGlzW2pdXSA9IDE7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2pdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG52YXIgc29ja2V0UHJvdmlkZXIgPSByZXF1aXJlKFwiU29ja2V0UHJvdmlkZXJcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBzb2NrZXRQcm92aWRlcixcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYmNudDowXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgLy8gc3RhcnQgKCkge30sXG5cbiAgICBoaWRlRHJhZ0l0ZW06ZnVuY3Rpb24gKGlubmVySWQpIHtcbiAgICAgICAgaWYodGhpcy5wdXRTZWxlW2lubmVySWRdKSB7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVCdWZmOmZ1bmN0aW9uKGJ1ZmYpIHtcbiAgICAgICAgdmFyIG15QnVmZixweCxweTtcbiAgICAgICAgdmFyIGNhbnZhc05vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xuXG4gICAgICAgIGlmKGJ1ZmYudHlwZUlkID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNuZChcInRodW5kZXJcIik7XG4gICAgICAgICAgICBteUJ1ZmYgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyM10pO1xuICAgICAgICAgICAgLy9jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwiYnVmZlRodW5kZXJcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihidWZmLnR5cGVJZCA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJoZWFsXCIpO1xuICAgICAgICAgICAgbXlCdWZmID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjRdKTtcbiAgICAgICAgICAgIC8vY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1ZmZIZWFsXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL2hpZGUgc2VsZWN0IGZyYW1lXG4gICAgICAgIHRoaXMuZGlzcENoYXJTZWxlKCk7XG5cbiAgICAgICAgLy9yZW1vdmUgYnVmZiBpY29uXG4gICAgICAgIGlmKHRoaXMucHV0U2VsZVtidWZmLmlubmVySWRdKSB7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbYnVmZi5pbm5lcklkXS5wYXJlbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9oaWRlIGRyYWcgaXRlbSBkaXNwXG4gICAgICAgIC8vdGhpcy5oaWRlRHJhZ0l0ZW0oYnVmZi5pbm5lcklkKTtcblxuICAgICAgICB0aGlzLmNsaWNrU2VsZSA9IHt9O1xuXG4gICAgICAgIC8vdG9kbyAzOFxuICAgICAgICBweCA9IChidWZmLm15cG9zLngpKjM4O1xuICAgICAgICBweSA9IChidWZmLm15cG9zLnkpKjM4O1xuXG4gICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICBteUJ1ZmYuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobXlCdWZmKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlQWdlbnRzOmZ1bmN0aW9uKGFnZW50cykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYWdlbnROb2RlO1xuICAgICAgICB2YXIgcHgscHksZW87XG4gICAgICAgIC8vdmFyIG5vZGVsaXN0ID0gY2MuZmluZChcIkNhbnZhcy9sYXlvdXRcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2cobm9kZWxpc3QpO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWdlbnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYWdlbnRzW2ldO1xuXG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICAvL3B4ID0gKGFnZW50Lm15cG9zLngpKjM4O1xuICAgICAgICAgICAgLy9weSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYWdlbnQuaW5uZXJJZCk7XG5cbiAgICAgICAgICAgICAgICBpZihhZ2VudC5yb2xlID09IFwic2tlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzBdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImlyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzIwXSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJiZWVcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTZdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcIndpelwiKSB7XG4vL215QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxN10pOyAgICBcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzI2XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImhyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzEyXSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJsbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxNF0pOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwibHJcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbM10pOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwiZ2lcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbNF0pOyAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBteUFnZW50Lm5hbWUgPSBhaWQ7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC50eXBlID0gXCJhZ2VudFwiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuc2l6ZSA9IGFnZW50LnNpemU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5sZXZlbCA9IGFnZW50LmxldmVsO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0SWQoYWlkKTtcblxuICAgICAgICAgICAgICAgIC8vc2hhZG93IHNob3VsZCBzZXQgaW4gbGF5b3V0LCBiZWNhdXNlIGl0cyB6aW5kZXggc2hvdWxkIGJlIGxvd2VyIHRoYW4gYW55IGFnZW50cy5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0U2hhZG93KHRoaXMuc2hhZG93Rm9yQWdlbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0VG90YWxMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRCbG9vZCh0aGlzLmJsb29kRm9yQWdlbnQobXlBZ2VudCkpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0IHBvcyBpcyBpbiBzb3V0aCwgZmFjZSB0byBub3J0aCwgb3RoZXJ3aXNlLi4uLlxuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50LnJvdCA9IDE4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAwOyAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG5jb25zb2xlLmxvZyhcIi0tcmVjIHB0LS1cIik7XG5jb25zb2xlLmxvZyhhZ2VudC5teXBvcy54ICtcIjo6OlwiKyBhZ2VudC5teXBvcy55KTtcblxuICAgICAgICAgICAgICAgIHB4ID0gKGFnZW50Lm15cG9zLngpKjM4O1xuICAgICAgICAgICAgICAgIHB5ID0gKGFnZW50Lm15cG9zLnkpKjM4O1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnVwZGF0ZVBvcyhweCwgcHkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5zZXRPYmplY3QobXlBZ2VudCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVCdWxsZXRzOmZ1bmN0aW9uKGJ1bGxldHMpIHtcbiAgICAgICAgdmFyIGFpZCxteUJ1bGxldCxidWxsZXQsYWdlbnROb2RlO1xuICAgICAgICB2YXIgcHgscHksZW8sZURpcztcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJ1bGxldHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYnVsbGV0ID0gYnVsbGV0c1tpXTtcbiAgICAgICAgICAgIGFpZCA9IGJ1bGxldC5haWQ7XG4gICAgICAgICAgICBteUJ1bGxldCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcblxuICAgICAgICAgICAgaWYobXlCdWxsZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmKGJ1bGxldC5yb2xlPT1cImJ1bGxldFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMV0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9teUJ1bGxldCA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnN0YXJ0UG9zID0gYnVsbGV0Lm15cG9zO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihidWxsZXQucm9sZT09XCJib21iXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib21iIGNyZWF0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNuZChcImZpcmVTZW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcmFnSXRlbShidWxsZXQuaW5uZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbNV0pOyAgICBcbiAgICAgICAgICAgICAgICAgICAgZURpcyA9IHRoaXMuZW5lbWV5RGlzdGFuY2UoYnVsbGV0Lm15cG9zLngsIGJ1bGxldC5teXBvcy55LCBidWxsZXQudGFyZ2V0cG9zLngsIGJ1bGxldC50YXJnZXRwb3MueSk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnN0YXJ0UG9zID0gYnVsbGV0Lm15cG9zO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC50YXJnZXREaXMgPSBlRGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGJ1bGxldC5yb2xlPT1cInRhbWFcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJndW5cIik7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbOV0pO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zdGFydFBvcyA9IGJ1bGxldC5teXBvcztcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYnVsbGV0LnJvbGU9PVwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMThdKTtcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuc3RhcnRQb3MgPSBidWxsZXQubXlwb3M7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciwgbm8gYnVsbGV0IHR5cGUuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG15QnVsbGV0Lm5hbWUgPSBhaWQ7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQudHlwZSA9IFwiYnVsbGV0XCI7XG4gICAgICAgICAgICAgICAgLy9teUJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LnJvbGUgPSBidWxsZXQucm9sZTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC51cGRvd24gPSBidWxsZXQudXBkb3duO1xuXG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuekluZGV4ID0gOTk5OTtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QnVsbGV0KTtcblxuICAgICAgICAgICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QnVsbGV0KTtcblxuICAgICAgICAgICAgICAgIC8vcHggPSAtMTAwMDtcbiAgICAgICAgICAgICAgICAvL3B5ID0gLTEwMDA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcHggPSA1MDtcbiAgICAgICAgICAgICAgICBweSA9IDUwO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcblxuICAgICAgICAgICAgICAgIHZhciBidWxsZXRSb3QgPSBidWxsZXQucm90O1xuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldFJvdCArPSAxODA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9zaW5jZSAyLjEuMSBzZXRSb3RhdGlvbiBpcyBkZXNwZXJhdGVkLlxuICAgICAgICAgICAgICAgIG15QnVsbGV0LmFuZ2xlID0gLTEqYnVsbGV0Um90O1xuICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQuc2V0Um90YXRpb24oYnVsbGV0Um90KTsgIC8vYnVsbGV0LnJvdCsxODBcblxuICAgICAgICAgICAgICAgIG15QnVsbGV0LnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QnVsbGV0LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUJhc2VzOmZ1bmN0aW9uKGJhc2VzKSB7XG4gICAgICAgIHZhciBhaWQsbXlBZ2VudCxhZ2VudCxiYXNlTmFtZSxiYXNlTm9kZTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJhc2VzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYmFzZXNbaV07XG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICBpZihteUFnZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBteUFnZW50ID0ge307XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiYmFzZVwiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuICAgICAgICAgICAgICAgIG15QWdlbnQubXlwb3MgPSBhZ2VudC5teXBvcztcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuXG4gICAgICAgICAgICAgICAgYmFzZU5hbWUgPSBcImJhc2VcIisgYWdlbnQub2JqZWN0SWQ7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5iYXNlT2JqID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgICAgIGJhc2VOb2RlID0gbXlBZ2VudC5iYXNlT2JqLmdldENvbXBvbmVudChcIkJhc2VTcHJpdGVcIik7XG4gICAgICAgICAgICAgICAgYmFzZU5vZGUuc2V0VG90YWxMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGJhc2VOb2RlLnNldEJsb29kKHRoaXMuYmxvb2RGb3JBZ2VudChteUFnZW50LmJhc2VPYmopKTtcbiAgICAgICAgICAgICAgICBiYXNlTm9kZS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUFnZW50LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUxvZ3M6ZnVuY3Rpb24obG9ncykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYWdlbnROb2RlO1xuICAgICAgICB2YXIgcHgscHk7XG5cbiAgICAgICAgLy90aGlzLnBsYXlTbmQoXCJsb2dcIik7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxsb2dzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gbG9nc1tpXTtcbiAgICAgICAgICAgIGFpZCA9IGFnZW50LmFpZDtcblxuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcblxuICAgICAgICAgICAgLy90b2RvIDM4XG4gICAgICAgICAgICBweCA9IChhZ2VudC5teXBvcy54KSozODtcbiAgICAgICAgICAgIHB5ID0gKGFnZW50Lm15cG9zLnkpKjM4O1xuXG4gICAgICAgICAgICBpZihteUFnZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcmFnSXRlbShhZ2VudC5pbm5lcklkKTtcblxuICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYls4XSk7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwibG9nXCI7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG15QWdlbnQucm9sZSA9IGFnZW50LnJvbGU7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUFnZW50KTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0SWQoYWlkKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0U2hhZG93KHRoaXMuc2hhZG93Rm9yTG9nKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLm1vdmUobW92ZVRvKTtcblxuICAgICAgICAgICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheVNuZChcImxvZ1wiKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5zZXRPYmplY3QobXlBZ2VudCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVGb3J0czpmdW5jdGlvbihmb3J0cykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYWdlbnROb2RlO1xuICAgICAgICB2YXIgcHgscHksZW8sem9yZGVyO1xuXG4gICAgICAgIC8vdmFyIG5vZGVsaXN0ID0gY2MuZmluZChcIkNhbnZhcy9sYXlvdXRcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2cobm9kZWxpc3QpO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8Zm9ydHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWdlbnQgPSBmb3J0c1tpXTtcbiAgICAgICAgICAgIGFpZCA9IGFnZW50LmFpZDtcbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFpZCk7XG5cbiAgICAgICAgICAgIC8vdG9kbyAzOFxuICAgICAgICAgICAgcHggPSAoYWdlbnQubXlwb3MueCkqMzg7XG4gICAgICAgICAgICBweSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYWdlbnQuaW5uZXJJZCk7XG5cbiAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbN10pOyAgICBcbiAgICAgICAgICAgICAgICBteUFnZW50Lm5hbWUgPSBhaWQ7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC50eXBlID0gXCJmYVwiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuc3BOYW1lID0gXCJGb3J0QVNwcml0ZVwiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuc2l6ZSA9IGFnZW50LnNpemU7XG5cbiAgICAgICAgICAgICAgICAvLzEwMDA6YWdlbnQsIDk5OTpidWxsZXQgOTk4OnRoaXM7XG4gICAgICAgICAgICAgICAgLy9mb3J0IGJhc2UgYW5jaG9yWSBpcyBtaWRkbGUsIHNvIHktMiBpcyBuZXNzZXNhcnkuXG5cbiAgICAgICAgICAgICAgICAvL3RvZG8gMTZcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB6b3JkZXIgPSAxMDAxK3BhcnNlSW50KDE2LWFnZW50Lm15cG9zLnktMSk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMubWFpblBsYXllciA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHpvcmRlciA9IDEwMDErcGFyc2VJbnQoMTYtYWdlbnQubXlwb3MueS0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbXlBZ2VudC56SW5kZXggPSB6b3JkZXI7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUFnZW50KTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0WkluZGV4KHpvcmRlcik7XG4vKiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUuc2V0SWQoYWlkKTtcbiAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZS5zZXRTaGFkb3codGhpcy5zaGFkb3dGb3JBZ2VudCgpKTtcbiovXG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0VG90YWxMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRCbG9vZCh0aGlzLmJsb29kRm9yQWdlbnQobXlBZ2VudCkpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0IHBvcyBpcyBpbiBzb3V0aCwgZmFjZSB0byBub3J0aCwgb3RoZXJ3aXNlLi4uLlxuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50LnJvdCA9IDE4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAwOyAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuXG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUucGxheUFuZ2xlQW5pbWF0aW9uKGFnZW50LCBudWxsLCB0aGlzLm1haW5QbGF5ZXIpO1xuXG4gICAgICAgICAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobXlBZ2VudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QWdlbnQsIGFpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWdlbnRQcm9jZXNzOiBmdW5jdGlvbihhZ2VudHMpIHtcbiAgICAgICAgdmFyIHJlbW90ZUFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgbG9jYWxBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGtpbGxBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGFnZW50T2JqLCBhZ2VudE5vZGU7XG4gICAgICAgIHZhciBhZ2VudElkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWdlbnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIHJlbW90ZUFnZW50cy5wdXNoKGFnZW50c1tpXS5haWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxBZ2VudHMgPSB0aGlzLm5wY0luZm8uYWxsS2V5cygpO1xuICAgICAgICBraWxsQWdlbnRzID0gbG9jYWxBZ2VudHMubWludXMocmVtb3RlQWdlbnRzKTtcblxuICAgICAgICBmb3IoYWdlbnRJZCBvZiBraWxsQWdlbnRzKSB7XG4gICAgICAgICAgICBhZ2VudE9iaiA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICBpZihhZ2VudE9iai50eXBlID09IFwiYWdlbnRcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmFzZVByb2Nlc3M6IGZ1bmN0aW9uKGJhc2VzKSB7XG4gICAgICAgIHZhciByZW1vdGVCYXNlcyA9IFtdO1xuICAgICAgICB2YXIga2lsbEJhc2VzID0gW107XG4gICAgICAgIHZhciBlbmVteUJhc2VzID0gW107XG4gICAgICAgIHZhciBiYXNlT2JqO1xuICAgICAgICB2YXIgd2Fycmlvck5hbWU7XG4gICAgICAgIHZhciB3YXJyaW9yT2JqO1xuICAgICAgICB2YXIgYmFzZU5hbWU7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxiYXNlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBiYXNlTmFtZSA9IFwiYmFzZVwiKyBiYXNlc1tpXS5vYmplY3RJZDtcbiAgICAgICAgICAgIHJlbW90ZUJhc2VzLnB1c2goYmFzZU5hbWUpO1xuICAgICAgICAgICAgZW5lbXlCYXNlcy5wdXNoKGJhc2VOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZG8gbGlzdDogc2hvdWxkIG1hbmFnZSB0byByZW1vdmUgdGhlIGJhc2UgcmVjb3JkIGluIG5wY0luZm8uXG4gICAgICAgIGtpbGxCYXNlcyA9IHRoaXMuX2RlZmF1bHRCYXNlcy5taW51cyhyZW1vdGVCYXNlcyk7XG5cbiAgICAgICAgZm9yKGJhc2VOYW1lIG9mIGtpbGxCYXNlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwTGF5b3V0TWFzayhlbmVteUJhc2VzLCBiYXNlTmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRCYXNlcy5yZW1vdmVCeVZhbHVlKGJhc2VOYW1lKTtcbiAgICAgICAgICAgIGJhc2VPYmogPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYmFzZU5hbWUpO1xuXG4gICAgICAgICAgICAvL3RoaXMucGx1c0Jhc2VLaWxsTnVtKGJhc2VOYW1lKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGJhc2VPYmopO1xuICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiYmFzZVwiLCBiYXNlT2JqLngsIGJhc2VPYmoueSk7XG4gICAgICAgIH1cbiAgICB9LFxuIFxuICAgIHBsdXNCYXNlS2lsbE51bTogZnVuY3Rpb24oYmFzZU5hbWUpIHtcbiAgICAgICAgLy90b2RvOiBsYXlvdXQgbm9kZSBtdXN0IGJlIHNldCBpbiBpbml0IFxuICAgICAgICB2YXIgZW5lbXludW0gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1cEZsYWdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyaW5nTWFya1wiKS5nZXRDaGlsZEJ5TmFtZShcImtpbGxudW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIHZhciBteW51bSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRvd25GbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYoYmFzZU5hbWUuaW5BcnJheShbXCJiYXNlMVwiLCBcImJhc2UyXCIsIFwiYmFzZTNcIl0pKSB7XG4gICAgICAgICAgICBlbmVteW51bS5zdHJpbmcgPSBwYXJzZUludChlbmVteW51bS5zdHJpbmcpKzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBteW51bS5zdHJpbmcgPSBwYXJzZUludChlbmVteW51bS5zdHJpbmcpKzE7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9jYWxsZWQgd2hlbiBnYW1lIGlzIG92ZXJcbiAgICBraWxsQmFzZXM6ZnVuY3Rpb24oZGlyKSB7XG4gICAgICAgIC8vdG9kbzogbGF5b3V0IG5vZGUgbXVzdCBiZSBzZXQgaW4gaW5pdCBcbiAgICAgICAgLy92YXIgZW5lbXludW0gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1cEZsYWdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyaW5nTWFya1wiKS5nZXRDaGlsZEJ5TmFtZShcImtpbGxudW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIC8vdmFyIG15bnVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZG93bkZsYWdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyaW5nTWFya1wiKS5nZXRDaGlsZEJ5TmFtZShcImtpbGxudW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICBcbiAgICAgICAgdmFyIGtpbGxCYXNlcztcbiAgICAgICAgdmFyIGJhc2VPYmosIGJkO1xuICAgICAgICB2YXIgYmFzZU5hbWU7XG4gICAgICAgIGlmKGRpciA9PSBcInVwXCIpIHtcbiAgICAgICAgICAgIGtpbGxCYXNlcz0gW1wiYmFzZTFcIiwgXCJiYXNlMlwiLCBcImJhc2UzXCJdO1xuICAgICAgICAgICAgLy9lbmVteW51bS5zdHJpbmcgPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2lsbEJhc2VzPSBbXCJiYXNlNFwiLCBcImJhc2U1XCIsIFwiYmFzZTZcIl07XG4gICAgICAgICAgICAvL215bnVtLnN0cmluZyA9IDM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoYmFzZU5hbWUgb2Yga2lsbEJhc2VzKSB7XG4gICAgICAgICAgICAvL3RoaXMuX2RlZmF1bHRCYXNlcy5yZW1vdmVCeVZhbHVlKGJhc2VOYW1lKTtcbiAgICAgICAgICAgIGJhc2VPYmogPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYmFzZU5hbWUpO1xuXG4gICAgICAgICAgICBpZihiYXNlT2JqKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiYmFzZVwiLCBiYXNlT2JqLngsIGJhc2VPYmoueSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGJhc2VPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVuZGlzcGxheU1hc2s6IGZ1bmN0aW9uKHNlbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhzZWwpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoc2VsKS5hY3RpdmU9ZmFsc2U7XG4gICAgfSxcblxuICAgIGRpc3BMYXlvdXRNYXNrOiBmdW5jdGlvbihraWxsRW5lbXlCYXNlcywgYmFzZU5hbWUpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgaWYoYmFzZU5hbWUgPT0gXCJiYXNlNFwiIHx8IGJhc2VOYW1lID09IFwiYmFzZTVcIiB8fCBiYXNlTmFtZSA9PSBcImJhc2U2XCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYoXCJiYXNlMVwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpICYmIFwiYmFzZTJcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSAmJiBcImJhc2UzXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykpIHtcbiAgICAgICAgLy8gICAgcmV0dXJuO1xuICAgICAgICAvL31cblxuICAgICAgICBpZihcImJhc2UxXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykgJiYgXCJiYXNlMlwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNYXNrKFwic2VsZU1hc2sxMlwiLCAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKFwiYmFzZTFcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSAmJiBcImJhc2UzXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01hc2soXCJzZWxlTWFzazEzXCIsIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoXCJiYXNlMVwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNYXNrKFwic2VsZU1hc2sxXCIsIDIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dEcmFnTWFzazogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICBpZighdGhpcy5pZk5vdE1hc2tSb2xlKHJvbGUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5tYXNrVHlwZSkuYWN0aXZlPXRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5zaG93RHJhZ01hc2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5tYXNrVHlwZSkuYWN0aXZlPWZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93TWFzazogZnVuY3Rpb24obWFza1R5cGUsIGRlbGF5KSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubWFza1R5cGUgPSBtYXNrVHlwZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKG1hc2tUeXBlKS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfc2VsZi51bmRpc3BsYXlNYXNrKG1hc2tUeXBlKTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH0sXG5cbiAgICBwdXRFcnJvck1zZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInB1dEVycm9yXCIpLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF9zZWxmLnVuZGlzcGxheVB1dEVycigpO1xuICAgICAgICB9LCAxKTtcbiAgICB9LFxuXG4gICAgdW5kaXNwbGF5UHV0RXJyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHV0RXJyb3JcIikuYWN0aXZlPWZhbHNlO1xuICAgIH0sXG5cbiAgICBmb3J0UHJvY2VzczogZnVuY3Rpb24oZm9ydHMsIGZvcnRzRnV0dXJlKSB7XG4gICAgICAgIHZhciByZW1vdGVBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGxvY2FsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBraWxsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBhZ2VudE9iaiwgYWdlbnROb2RlO1xuICAgICAgICB2YXIgYWdlbnRJZCwgYmQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxmb3J0cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICByZW1vdGVBZ2VudHMucHVzaChmb3J0c1tpXS5haWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxBZ2VudHMgPSB0aGlzLm5wY0luZm8uYWxsS2V5cygpO1xuICAgICAgICBraWxsQWdlbnRzID0gbG9jYWxBZ2VudHMubWludXMocmVtb3RlQWdlbnRzKTtcblxuICAgICAgICBmb3IoYWdlbnRJZCBvZiBraWxsQWdlbnRzKSB7XG4gICAgICAgICAgICBhZ2VudE9iaiA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICBpZihhZ2VudE9iai50eXBlID09IFwiZmFcIikge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImZvcnRcIiwgYWdlbnRPYmoueCwgYWdlbnRPYmoueSk7XG5cbiAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiYmFzZVwiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsb2dQcm9jZXNzOiBmdW5jdGlvbihsb2dzKSB7XG4gICAgICAgIHZhciByZW1vdGVBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGxvY2FsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBraWxsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBhZ2VudE9iaiwgYWdlbnROb2RlO1xuICAgICAgICB2YXIgYWdlbnRJZCwgYmQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxsb2dzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIHJlbW90ZUFnZW50cy5wdXNoKGxvZ3NbaV0uYWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQWdlbnRzID0gdGhpcy5ucGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAga2lsbEFnZW50cyA9IGxvY2FsQWdlbnRzLm1pbnVzKHJlbW90ZUFnZW50cyk7XG5cbiAgICAgICAgZm9yKGFnZW50SWQgb2Yga2lsbEFnZW50cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoucm9sZSA9PSBcImxvZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwibG9nXCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBidWxsZXRQcm9jZXNzOiBmdW5jdGlvbihidWxsZXRzKSB7XG4gICAgICAgIHZhciByZW1vdGVCdWxsZXRzID0gW107XG4gICAgICAgIHZhciBsb2NhbEJ1bGxldHMgPSBbXTtcbiAgICAgICAgdmFyIGtpbGxCdWxsZXRzID0gW107XG4gICAgICAgIHZhciBhZ2VudE9iaiwgYWdlbnROb2RlO1xuICAgICAgICB2YXIgYWdlbnRJZDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJ1bGxldHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgcmVtb3RlQnVsbGV0cy5wdXNoKGJ1bGxldHNbaV0uYWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQnVsbGV0cyA9IHRoaXMubnBjSW5mby5hbGxLZXlzKCk7XG4gICAgICAgIGtpbGxCdWxsZXRzID0gbG9jYWxCdWxsZXRzLm1pbnVzKHJlbW90ZUJ1bGxldHMpO1xuXG4gICAgICAgIGZvcihhZ2VudElkIG9mIGtpbGxCdWxsZXRzKSB7XG4gICAgICAgICAgICBhZ2VudE9iaiA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICBpZihhZ2VudE9iai5yb2xlID09IFwiYm9tYlwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIGFnZW50T2JqLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJib21iXCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoYWdlbnRPYmoucm9sZSA9PSBcIndpemZpcmVcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE9iai5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgaWYoYWdlbnRPYmoueCAmJiBhZ2VudE9iai55KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcIndpemZpcmVcIiwgYWdlbnRPYmoueCwgYWdlbnRPYmoueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhZ2VudE9iai5yb2xlID09IFwiYnVsbGV0XCIgfHwgYWdlbnRPYmoucm9sZSA9PSBcInRhbWFcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE9iai5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9zaGFrZSB0aGUgc2NyZWVuXG4gICAgc3RhcnRTY2VuZUppdHRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHNjZW5lTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdmFyIG94ID0gc2NlbmVOb2RlLng7XG4gICAgICAgIHZhciBveSA9IHNjZW5lTm9kZS55O1xuXG4gICAgICAgIHZhciBjbnQgPSAwO1xuXG4gICAgICAgIHZhciBsb3dlciA9IC00O1xuICAgICAgICB2YXIgdXBwZXIgPSA0O1xuICAgICAgICB2YXIgY2FsbEJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICB2YXIgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh1cHBlciAtIGxvd2VyKSkgKyBsb3dlcjtcbiAgICAgICAgICAgIHZhciByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIpKSArIGxvd2VyO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzY2VuZU5vZGUueCArPSByYW5kb21YO1xuICAgICAgICAgICAgc2NlbmVOb2RlLnkgKz0gcmFuZG9tWTtcbiAgICAgICAgICAgIGlmKGNudD49MTApIHtcbiAgICAgICAgICAgICAgICBzY2VuZU5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBzY2VuZU5vZGUueCA9IG94O1xuICAgICAgICAgICAgICAgIHNjZW5lTm9kZS55ID0gb3k7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTsvL+WcuuaZr+W4uOmpu+iKgueCuVxuICAgICAgICB2YXIgZGVsID0gY2MuZGVsYXlUaW1lKDEvMzApO1xuICAgICAgICB2YXIgY2FsID0gY2MuY2FsbEZ1bmMoY2FsbEJhY2spO1xuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoZGVsLCBjYWwpO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKHNlcSkpO1xuICAgIH0sXG5cbiAgICBwbGF5QmFzZXM6IGZ1bmN0aW9uKGJhc2VzKSB7XG4gICAgICAgIHZhciByZW1vdGVCYXNlcyA9IFtdO1xuICAgICAgICB2YXIgYmFzZU9iaixteUFnZW50LGFnZW50O1xuICAgICAgICB2YXIgd2Fycmlvck5hbWU7XG4gICAgICAgIHZhciB3YXJyaW9yT2JqO1xuICAgICAgICB2YXIgYmFzZU5hbWUsIGtpbmdOb2RlLCBhZ2VudE5vZGUsIGtpbmdBcnJvdyx3YXJyaW9yO1xuICAgICAgICB2YXIgYWN0VHlwZSwgYXR0YWNrRHVyYSwgbm93O1xuICAgICAgICB2YXIgdG1wQiA9IHt9O1xuICAgICAgICB2YXIgZW9EZWFkO1xuICAgICAgICB2YXIgZW8gPSBudWxsO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YmFzZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWdlbnQgPSBiYXNlc1tpXTtcblxuICAgICAgICAgICAgYmFzZU5hbWUgPSBcImJhc2VcIisgYWdlbnQub2JqZWN0SWQ7XG4gICAgICAgICAgICBhdHRhY2tEdXJhID0gYWdlbnQuYXR0YWNrRHVyYTtcbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50LmFpZCkuYmFzZU9iajtcblxuICAgICAgICAgICAgdG1wQlthZ2VudC5haWRdID0gYmFzZU5hbWU7XG4gICAgICAgICAgICByZW1vdGVCYXNlcy5wdXNoKGJhc2VOYW1lKTtcbiAgICAgICAgICAgIGFjdFR5cGUgPSBhZ2VudC5hY3RUeXBlO1xuXG4gICAgICAgICAgICBpZihteUFnZW50KSB7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5nZXRDb21wb25lbnQoXCJCYXNlU3ByaXRlXCIpLnNldExpZmUoYWdlbnQubGlmZSk7XG5cbiAgICAgICAgICAgICAgICB3YXJyaW9yID0gbXlBZ2VudC5nZXRDaGlsZEJ5TmFtZShcIndhcnJpb3JcIik7XG4gICAgICAgICAgICAgICAgaWYod2Fycmlvcikge1xuICAgICAgICAgICAgICAgICAgICB3YXJyaW9yLnJvbGUgPSBcImxyXCI7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKHdhcnJpb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbm8gZW5tZXkgdGhlbiBzdGFuZGJ5XG4gICAgICAgICAgICAgICAgICAgIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJ3YWl0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QmFzZVdhcnJpb3JBbmltYXRpb25EZWZhdWx0KFwibW92ZVwiLCBhZ2VudC5vYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwic2FcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlCYXNlV2FycmlvckFuaW1hdGlvbihhZ2VudCwgdGhpcy5tYWluUGxheWVyLCBcInNhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdhcnJpb3IgPSBteUFnZW50LmdldENoaWxkQnlOYW1lKFwiZ3VuXCIpO1xuICAgICAgICAgICAgICAgIGlmKHdhcnJpb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Fycmlvci5yb2xlID0gXCJndW5cIjtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUod2Fycmlvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiBubyBlbm1leSB0aGVuIHN0YW5kYnlcbiAgICAgICAgICAgICAgICAgICAgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cIndhaXRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUucGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdChcIm1vdmVcIiwgdGhpcy5tYWluUGxheWVyLCBhZ2VudC5vYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwic2FcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlCYXNlV2FycmlvckFuaW1hdGlvbihhZ2VudCwgdGhpcy5tYWluUGxheWVyLCBcInNhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlBZ2VudHM6IGZ1bmN0aW9uKGFnZW50cywgYWdlbnRzRnV0dXJlKSB7XG4gICAgICAgIHZhciBteUFnZW50O1xuICAgICAgICB2YXIgcHgsIHB5LCBhaWQ7XG4gICAgICAgIHZhciBhZ2VudE5vZGUsYWdlbnQsZW89bnVsbDtcbiAgICAgICAgdmFyIGVvRGVhZDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGFnZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGFnZW50c1tpXTtcbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50LmFpZCk7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgJiYgbXlBZ2VudC50eXBlPT1cImFnZW50XCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUFnZW50KTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUFuaShhZ2VudCwgdGhpcy5nZXRGdXR1cmVBZ2VudChhZ2VudC5haWQsIGFnZW50c0Z1dHVyZSksIHRoaXMubWFpblBsYXllcik7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldExpZmUoYWdlbnQubGlmZSk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldEdyb3VwS2lsbChhZ2VudC5ncm91cEtpbGwpO1xuXG4gICAgICAgICAgICAgICAgcHggPSBNYXRoLnJvdW5kKChhZ2VudC5teXBvcy54KSozOCk7XG4gICAgICAgICAgICAgICAgcHkgPSBNYXRoLnJvdW5kKChhZ2VudC5teXBvcy55KSozOCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnVwZGF0ZVBvcyhweCwgcHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlGb3J0czogZnVuY3Rpb24oZm9ydHMpIHtcbiAgICAgICAgdmFyIG15QWdlbnQ7XG4gICAgICAgIHZhciBhZ2VudE5vZGUsYWdlbnQsd2Fycmlvcj1udWxsO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8Zm9ydHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWdlbnQgPSBmb3J0c1tpXTtcbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50LmFpZCk7XG4gICAgICAgICAgICBpZighbXlBZ2VudCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gXCJmYVwiO1xuICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICBhZ2VudE5vZGUuc2V0TGlmZShhZ2VudC5saWZlKTtcblxuICAgICAgICAgICAgd2FycmlvciA9IG15QWdlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJyaW9yXCIpO1xuICAgICAgICAgICAgd2Fycmlvci5yb2xlID0gXCJsclwiO1xuICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUod2Fycmlvcik7XG5cbiAgICAgICAgICAgIC8vaWYgbm8gZW5tZXkgdGhlbiBzdGFuZGJ5XG4gICAgICAgICAgICBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlGb3J0V2FycmlvckFuaW1hdGlvbkRlZmF1bHQoXCJtb3ZlXCIsIGFnZW50LmlzSGVybywgdGhpcy5tYWluUGxheWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uKGFnZW50LCB0aGlzLm1haW5QbGF5ZXIsIFwic2FcIik7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlMb2dzOiBmdW5jdGlvbihsb2dzKSB7XG4gICAgICAgIHZhciBhZ2VudCxteUFnZW50O1xuICAgICAgICB2YXIgcHgsIHB5LCBhaWQ7XG4gICAgICAgIHZhciBhZ2VudE5vZGUsYnVsbGV0LGVvPW51bGw7XG4gICAgICAgIHZhciBzYztcbiAgICAgICAgdmFyIG1vdmVUbztcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGxvZ3MubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWdlbnQgPSBsb2dzW2ldO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnQuYWlkKTtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCkge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5tb3ZlKGFnZW50Lm15cG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5QnVsbGV0czogZnVuY3Rpb24oYnVsbGV0cykge1xuICAgICAgICB2YXIgbXlCdWxsZXQ7XG4gICAgICAgIHZhciBweCwgcHksIGFpZDtcbiAgICAgICAgdmFyIGFnZW50Tm9kZSxidWxsZXQsZW89bnVsbDtcbiAgICAgICAgdmFyIHNjO1xuICAgICAgICB2YXIgYnVsbGV0Um90O1xuICAgICAgICB2YXIgc3ViQnVsbGV0O1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YnVsbGV0cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBidWxsZXQgPSBidWxsZXRzW2ldO1xuXG4gICAgICAgICAgICBteUJ1bGxldCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYnVsbGV0LmFpZCk7XG4gICAgICAgICAgICBpZihteUJ1bGxldCkge1xuICAgICAgICAgICAgICAgIC8vMiBmb3J0IGJ1bGxldCBlbWl0IHRoZSBzYW1lIHRpbWUsIG9ubHkgZGlzcGxheSB0aGUgcHJvcGVyIGJ1bGxldC5cbiAgICAgICAgICAgICAgICBpZihidWxsZXQudXBkb3duPT1cInVwXCIgJiYgdGhpcy5tYWluUGxheWVyPT0yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihidWxsZXQudXBkb3duPT1cImRvd25cIiAmJiB0aGlzLm1haW5QbGF5ZXI9PTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QnVsbGV0KG15QnVsbGV0LCBidWxsZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dCdWxsZXQ6IGZ1bmN0aW9uKG15QnVsbGV0LCBidWxsZXQpIHtcbiAgICAgICAgdmFyIHN1YkJ1bGxldCwgYWdlbnROb2RlLCBweCwgcHksIG1vdmVUbywgYnVsbGV0Um90O1xuXG4gICAgICAgIG15QnVsbGV0LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlCdWxsZXQpO1xuXG4gICAgICAgIC8vdG9kbyAzOFxuICAgICAgICBweCA9IChidWxsZXQubXlwb3MueCkqMzg7XG4gICAgICAgIHB5ID0gKGJ1bGxldC5teXBvcy55KSozODtcblxuICAgICAgICBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuXG4gICAgICAgIGJ1bGxldFJvdCA9IGJ1bGxldC5yb3Q7XG4gICAgICAgIC8vaWYodGhpcy5tYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgLy8gICAgYnVsbGV0Um90ICs9IDE4MDtcbiAgICAgICAgLy99XG5cbiAgICAgICAgLy8xMDAwOmFnZW50LCA5OTk6dGhpcyBidWxsZXQgOTk4OmZvcnRzO1xuICAgICAgICAvL21ha2UgYnVsbGV0IGRpc3BsYXkgdW5kZXIgYWdlbnQgd2hpY2ggaXMgYXQgc2FtZSBwb3NpdGlvbi5cbiAgICAgICAgLy90b2RvIDE2XG4gICAgICAgIG15QnVsbGV0LnpJbmRleCA9IDEwMDArcGFyc2VJbnQoMTYtYnVsbGV0Lm15cG9zLnkpO1xuXG4gICAgICAgIGlmKG15QnVsbGV0LnJvbGUgPT0gXCJidWxsZXRcIikge1xuICAgICAgICAgICAgc3ViQnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMV0pO1xuICAgICAgICAgICAgLy9zdWJCdWxsZXQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyNV0pO1xuXG4gICAgICAgICAgICAvLyBmaXJzdCBjb252ZXJ0IG1vdmVUbyhiZWxvbmcgdG8gbGF5b3V0IG5vZGUpIHRvIHdvcmxkIHBvc2l0aW9uLlxuICAgICAgICAgICAgdmFyIHBwID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtb3ZlVG8pO1xuXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHdvcmxkIHBvc3Rpb24gdG8gbXlCdWxsZXQgcG9zaXRpb24uXG4gICAgICAgICAgICBwcCA9IG15QnVsbGV0LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBwKTtcblxuICAgICAgICAgICAgaWYodGhpcy5tYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IDkwIC0gYnVsbGV0Um90O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9ICg5MCAtIGJ1bGxldFJvdCkqLTE7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN1YkJ1bGxldC5zZXRQb3NpdGlvbihwcCk7XG4gICAgICAgICAgICBteUJ1bGxldC5hZGRDaGlsZChzdWJCdWxsZXQpO1xuICAgICAgICB9IFxuXG4gICAgICAgIGVsc2UgaWYobXlCdWxsZXQucm9sZSA9PSBcImJvbWJcIikge1xuICAgICAgICAgICAgc2MgPSB0aGlzLmdldEZpcmVCb21iU2NhbGUoYnVsbGV0Lm15cG9zLCBidWxsZXQudGFyZ2V0cG9zLCBteUJ1bGxldC50YXJnZXREaXMsIG15QnVsbGV0LnN0YXJ0UG9zKTtcbiAgICAgICAgICAgIG15QnVsbGV0LnNjYWxlWD1zYztcbiAgICAgICAgICAgIG15QnVsbGV0LnNjYWxlWT1zYztcbiAgICAgICAgICAgIG15QnVsbGV0LnpJbmRleCA9IDk5OTk7XG5cbiAgICAgICAgICAgIG15QnVsbGV0LmFuZ2xlID0gLTEqYnVsbGV0Um90O1xuICAgICAgICAgICAgbXlCdWxsZXQuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjQwKS0xMDtcbiAgICAgICAgICAgICAgICB2YXIgZmggPSBteUJ1bGxldC5nZXRDaGlsZEJ5TmFtZShcImZpcmVIZWFkXCIpO1xuICAgICAgICAgICAgICAgIC8vZmguc2tld1kgPSByYW5kb21UaW1lO1xuICAgICAgICAgICAgICAgIC8vZmguc2tld1ggPSByYW5kb21UaW1lO1xuXG4gICAgICAgICAgICAgICAgLy9maXJlIGJvbWIgc2l6ZSBjaGFuZ2luZyBhY2NvcmRpbmcgdG8gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGFyZ2V0IGFuZCBvcmlnaW4uXG4gICAgICAgICAgICAgICAgc2MgPSB0aGlzLmdldEZpcmVCb21iU2NhbGUoYnVsbGV0Lm15cG9zLCBidWxsZXQudGFyZ2V0cG9zLCBteUJ1bGxldC50YXJnZXREaXMsIG15QnVsbGV0LnN0YXJ0UG9zKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUubm9kZS5zY2FsZVg9c2M7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLm5vZGUuc2NhbGVZPXNjO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LmdldENvbXBvbmVudChjYy5Nb3Rpb25TdHJlYWspLnN0cm9rZSAqPSBzYztcbiAgICAgICAgICAgICovXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmKG15QnVsbGV0LnJvbGUgPT0gXCJ3aXpmaXJlXCIpIHtcbiAgICAgICAgICAgIC8qIFxuICAgICAgICAgICAgLy9vbGQgd2l6IGZpcmUgYmFsbFxuXG4gICAgICAgICAgICBteUJ1bGxldC56SW5kZXggPSA5OTk5O1xuICAgICAgICAgICAgLy8gc2hha2UgYSBsaXR0bGUgYml0XG4gICAgICAgICAgICAvL3ZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqNDApLTEwO1xuICAgICAgICAgICAgLy9idWxsZXRSb3QgKz0gcmFuZG9tVGltZTtcblxuICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSAtMSpidWxsZXRSb3Q7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgbXlCdWxsZXQuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIHN1YkJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzI1XSk7XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IGNvbnZlcnQgbW92ZVRvKGJlbG9uZyB0byBsYXlvdXQgbm9kZSkgdG8gd29ybGQgcG9zaXRpb24uXG4gICAgICAgICAgICB2YXIgcHAgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKG1vdmVUbyk7XG5cbiAgICAgICAgICAgIC8vIGNvbnZlcnQgd29ybGQgcG9zdGlvbiB0byBteUJ1bGxldCBwb3NpdGlvbi5cbiAgICAgICAgICAgIHBwID0gbXlCdWxsZXQuY29udmVydFRvTm9kZVNwYWNlQVIocHApO1xuXG4gICAgICAgICAgICAvL3N1YkJ1bGxldC5zZXRQb3NpdGlvbihwcCk7XG4gICAgICAgICAgICAvL215QnVsbGV0LmFkZENoaWxkKHN1YkJ1bGxldCk7XG5cbiAgICAgICAgICAgIGlmKG15QnVsbGV0Lmxhc3Rwb3MgJiYgbXlCdWxsZXQubGFzdHBvcy5zdWIocHApLm1hZygpID4gNTApIHtcbiAgICAgICAgICAgICAgICBzdWJCdWxsZXQuc2V0UG9zaXRpb24ocHApO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LmFkZENoaWxkKHN1YkJ1bGxldCk7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQubGFzdHBvcyA9IHBwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighbXlCdWxsZXQubGFzdHBvcykge1xuICAgICAgICAgICAgICAgIHN1YkJ1bGxldC5zZXRQb3NpdGlvbihwcCk7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYWRkQ2hpbGQoc3ViQnVsbGV0KTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5sYXN0cG9zID0gcHA7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBteUJ1bGxldC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEZpcmVCb21iU2NhbGU6IGZ1bmN0aW9uKGJ1bGxldFBvcywgdGFyZ2V0UG9zLCB0YXJnZXREaXMsIHN0YXJ0UG9zKSB7XG4gICAgICAgIHZhciB4RGlmLCB5RGlmO1xuICAgICAgICB2YXIgbWlkUG9zID0ge307XG4gICAgICAgIG1pZFBvcy54ID0gc3RhcnRQb3MueCArICh0YXJnZXRQb3MueCAtIHN0YXJ0UG9zLngpLzI7XG4gICAgICAgIG1pZFBvcy55ID0gc3RhcnRQb3MueSArICh0YXJnZXRQb3MueSAtIHN0YXJ0UG9zLnkpLzI7XG4gICAgICAgIHZhciB4RGlmID0gYnVsbGV0UG9zLnggLSBtaWRQb3MueDtcbiAgICAgICAgdmFyIHlEaWYgPSBidWxsZXRQb3MueSAtIG1pZFBvcy55O1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5zcXJ0KCh4RGlmICogeERpZikgKyAoeURpZiAqIHlEaWYpKTtcbiAgICAgICAgdmFyIHRhcmdldERpcyA9IHRhcmdldERpcyAqIDAuNTtcblxuICAgICAgICByZXR1cm4gKHRhcmdldERpcy1kaXMpKjAuNy90YXJnZXREaXMrMC41OyAgIC8vc2NhbGUgZnJvbSAwLjUgLS0gMS4yXG4gICAgfSxcblxuICAgIGVuZW1leURpc3RhbmNlOmZ1bmN0aW9uKHB4LHB5LGV4LGV5KSB7XG4gICAgICAgIHZhciB4RGlmLCB5RGlmLCBkaXM7XG4gICAgICAgIHhEaWYgPSBweCAtIGV4O1xuICAgICAgICB5RGlmID0gcHkgLSBleTtcbiAgICAgICAgZGlzID0gTWF0aC5zcXJ0KCh4RGlmICogeERpZikgKyAoeURpZiAqIHlEaWYpKTtcbiAgICAgICAgcmV0dXJuIGRpcztcbiAgICB9LFxuXG4gICAgZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKSB7XG4gICAgICAgIHZhciByb2xlID0gYWdlbnRPYmoucm9sZTtcbiAgICAgICAgaWYocm9sZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJpclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJiZWVcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQmVlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwid2l6XCIpIHtcbi8vcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnV2l6U3ByaXRlJyk7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdDcmFiU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnSGVyb1Nwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImxtXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0xpZ2h0bWFuU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwibHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQXJjU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiZ2lcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnR2lhbnRTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJidWxsZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQXJyb3cnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJib21iXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0JvbWJTY3JpcHQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJsb2dcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnTG9nU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiZ3VuXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0d1blNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImJhc2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQmFzZVNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImZhXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0Jhc2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRLaWxsZWRFbmVtaWVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFpZHMgPSB0aGlzLnJlbW92ZWROcGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAgdmFyIGFpZDtcbiAgICAgICAgdmFyIGtpbGxlZEVuZW1pZXMgPSBbXTtcbiAgICAgICAgLy93aGVuIG9uZSBhdHRhY2sgY2F1c2UgbXVsdGkga2lsbHMgb2NjdXJlZCBpbiBvbmUgZnJhbWUsIG11bHRpIGVuZW1pZXMgbXVzdCBiZSBoYW5kbGVkLiBcbiAgICAgICAgZm9yKHZhciBpPTA7aTxhaWRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFpZCA9IGFpZHNbaV07XG4gICAgICAgICAgICBraWxsZWRFbmVtaWVzLnB1c2godGhpcy5yZW1vdmVkTnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2lsbGVkRW5lbWllcztcbiAgICB9LFxuXG4gICAgZ2V0RnV0dXJlQWdlbnQ6IGZ1bmN0aW9uKGFpZCwgYWdlbnRzRnV0dXJlKSB7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWdlbnRzRnV0dXJlLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGlmKGFnZW50c0Z1dHVyZVtpXS5haWQgPT0gYWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFnZW50c0Z1dHVyZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgYmxvb2RGb3JBZ2VudDogZnVuY3Rpb24gKGFnZW50KSB7XG4gICAgICAgIHZhciBibG9vZE9iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzExXSk7XG4gICAgICAgIHZhciBibG9vZE9wID0gYmxvb2RPYmouZ2V0Q29tcG9uZW50KFwiQmxvb2RCYXJcIik7XG4gICAgICAgIGJsb29kT3Auc2V0QmFyTGV2ZWwoYWdlbnQubGV2ZWwpO1xuXG4gICAgICAgIGJsb29kT2JqLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBhZ2VudC5hZGRDaGlsZChibG9vZE9iaik7XG4gICAgICAgIHJldHVybiBibG9vZE9iajtcbiAgICB9LFxuXG4gICAgc2hhZG93Rm9yQWdlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNoYWRvd09iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzJdKTtcbiAgICAgICAgc2hhZG93T2JqLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoc2hhZG93T2JqKTtcbiAgICAgICAgcmV0dXJuIHNoYWRvd09iajtcbiAgICB9LFxuXG4gICAgc2hhZG93Rm9yTG9nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaGFkb3dPYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyXSk7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG5cbiAgICAgICAgc2hhZG93T2JqLnNjYWxlWCA9IDE7XG4gICAgICAgIHNoYWRvd09iai5zYWNsZVkgPSAxO1xuICAgICAgICBzaGFkb3dPYmouYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzaGFkb3dPYmopO1xuICAgICAgICByZXR1cm4gc2hhZG93T2JqO1xuICAgIH0sXG5cbiAgICBzZXRDbGlja0l0ZW06IGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgdGhpcy5jbGlja1NlbGUgPSBzZWxlY3Q7XG4gICAgfSxcblxuICAgIHB1dENsaWNrSXRlbTogZnVuY3Rpb24gKHNlbENhcmQsIG5vZGUsIHB0KSB7XG4gICAgICAgIHZhciBwdXROb2RlID0gY2MuaW5zdGFudGlhdGUobm9kZSk7XG4gICAgICAgIHZhciBpbm5lcklkID0gdGhpcy5uaWNrICtcIl9cIisgTnVtYmVyKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIHB1dE5vZGUueCA9IHB0Lng7XG4gICAgICAgIHB1dE5vZGUueSA9IHB0Lnk7XG4gICAgICAgIHB1dE5vZGUubmFtZSA9IGlubmVySWQ7XG4gICAgICAgIHB1dE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2VsQ2FyZC5hZGRDaGlsZChwdXROb2RlKTtcblxuICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBwdXROb2RlO1xuXG4gICAgICAgIHJldHVybiBpbm5lcklkO1xuICAgIH0sXG5cbiAgICBzZXREcmFnSXRlbTogZnVuY3Rpb24gKHBhcmFtcywgbm9kZSkge1xuICAgICAgICB2YXIgY2FyZCA9IHBhcmFtcy50YXJnZXQ7XG4gICAgICAgIHZhciBkcmFnTm9kZSA9IGNjLmluc3RhbnRpYXRlKG5vZGUpO1xuICAgICAgICB2YXIgaW5uZXJJZCA9IHRoaXMubmljayArXCJfXCIrIE51bWJlcihuZXcgRGF0ZSgpKTtcblxuICAgICAgICBub2RlLnggPSAwO1xuICAgICAgICBub2RlLnkgPSAwO1xuICAgICAgICBkcmFnTm9kZS5uYW1lID0gaW5uZXJJZDtcbiAgICAgICAgZHJhZ05vZGUuYWN0dmllID0gdHJ1ZTtcbiAgICAgICAgY2FyZC5hZGRDaGlsZChkcmFnTm9kZSk7XG5cbiAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gZHJhZ05vZGU7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdJdGVtID0gaW5uZXJJZDtcblxuICAgICAgICByZXR1cm4gaW5uZXJJZDtcbiAgICB9LFxuXG4gICAgdW5zZXREcmFnSXRlbTogZnVuY3Rpb24gKGlubmVySWQpIHtcbiAgICAgICAgdGhpcy51bnNob3dEcmFnTWFzaygpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nSXRlbSA9IFwiXCI7XG4gICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IG51bGw7ICAgICBcbiAgICB9LFxuXG4gICAgbW92ZURyYWdJdGVtOiBmdW5jdGlvbihzZWwsIGRlbHRhKSB7XG4gICAgICAgIGlmKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0pIHtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS55ICs9IGRlbHRhLnk7ICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueSA8IDApIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbGVhckRyYWdJdGVtOiBmdW5jdGlvbihwYXJhbSwgc2VsZWN0KSB7XG4gICAgICAgIHZhciBpbm5lcklkO1xuICAgICAgICB2YXIgY2FyZCA9IHBhcmFtLnRhcmdldDtcbiAgICAgICAgdmFyIHNlbCA9IGNhcmQuX25hbWU7XG4gICAgICAgIHZhciBwdD17fTtcbiAgICAgICAgdmFyIGxheW91dFB0ID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICB2YXIgeU9mZnNldD0wO1xuICAgICAgICB2YXIgbWFnaWNDb3N0ID0gc2VsZWN0Lm1hZ2ljQ29zdDtcbiAgICAgICAgdmFyIGxldmVsID0gc2VsZWN0LmxldmVsO1xuICAgICAgICB2YXIgcm9sZSA9IHNlbGVjdC5yb2xlO1xuXG5jb25zb2xlLmxvZyhcInJvbGU6XCIgKyByb2xlKTtcblxuICAgICAgICB0aGlzLnVuc2hvd0RyYWdNYXNrKCk7XG5cbiAgICAgICAgaWYodGhpcy5tYWluUGxheWVyPT0xKSB7XG4gICAgICAgICAgICB5T2Zmc2V0PS01MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlPZmZzZXQ9MjA7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dKSB7XG4gICAgICAgICAgICBpbm5lcklkID0gdGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS5uYW1lO1xuXG4gICAgICAgICAgICAvL2xheW91dCBtYXliZSBzY2FsZWQgYWNjb3JkaW5nIHRvIGRldmljZXMuXG4gICAgICAgICAgICBwdC54ID0gKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueCtjYXJkLngtbGF5b3V0UHQueCkvdGhpcy5ub2RlLnNjYWxlWDtcbiAgICAgICAgICAgIHB0LnkgPSAodGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS55K2NhcmQueS1sYXlvdXRQdC55K3lPZmZzZXQpL3RoaXMubm9kZS5zY2FsZVk7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWRQdXRQb2ludChwdCkgJiYgIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCBwb3N0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXRFcnJvck1zZygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZW5kU29kaWVyKG1hZ2ljQ29zdCwgcm9sZSwgcHQsIGlubmVySWQsIGxldmVsKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdJdGVtID0gXCJcIjtcbiAgICAgICAgfSBcbiAgICB9LFxuXG4gICAgc2VuZFNvZGllcjogZnVuY3Rpb24obWFnaWNDb3N0LCByb2xlLCBwdCwgaW5uZXJJZCwgbGV2ZWwpIHtcbiAgICAgICAgLy92YXIgaW5uZXJJZCA9IHRoaXMubmljayArXCJfXCIrIE51bWJlcihuZXcgRGF0ZSgpKTtcbiAgICAgICAgdmFyIGlzSGVybyA9ICh0aGlzLm1haW5QbGF5ZXI9PTEpO1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwibWFnaWNCYXJcIik7XG4gICAgICAgIHZhciBqdWljZSA9IGJhci5nZXRDaGlsZEJ5TmFtZShcImp1aWNlXCIpO1xuICAgICAgICB2YXIgY29zdCA9IHRoaXMudXNlTWFnaWMobWFnaWNDb3N0KTtcblxuICAgICAgICB0aGlzLnBsYXlTbmQoXCJwdXQxXCIpO1xuXG4gICAgICAgIGlmKGNvc3QpIHtcbiAgICAgICAgICAgIGp1aWNlLndpZHRoID0gY29zdDtcbiAgICAgICAgICAgIE1ZX1NPQ0tFVC5qc29uLmVtaXQoJ2NtZCcsIHsnaXNIZXJvJzppc0hlcm8sICdyb29tSWQnOiB0aGlzLnJvb21JZCwgJ2lubmVySWQnOiBpbm5lcklkLCAncm9sZSc6IHJvbGUsICdwdCc6cHQsICdsZXZlbCc6bGV2ZWx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBudWxsOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldE1hZ2ljQmFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hZ2ljQmFyXCIpO1xuICAgICAgICB2YXIganVpY2UgPSBiYXIuZ2V0Q2hpbGRCeU5hbWUoXCJqdWljZVwiKTtcblxuICAgICAgICBpZihqdWljZS53aWR0aDw2MDApIHtcbiAgICAgICAgICAgIGp1aWNlLndpZHRoKz10aGlzLmFkZEp1aWNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoanVpY2Uud2lkdGglNTAgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYWdpY0Ftb3VudCA9IGp1aWNlLndpZHRoLzUwO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDYXJkU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXNlTWFnaWM6IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwibWFnaWNCYXJcIik7XG4gICAgICAgIHZhciBqdWljZSA9IGJhci5nZXRDaGlsZEJ5TmFtZShcImp1aWNlXCIpO1xuICAgICAgICB2YXIgYWZ0ZXJVc2UgPSBqdWljZS53aWR0aC1hbW91bnQqNTA7XG5cbiAgICAgICAgaWYoYWZ0ZXJVc2U+PTApIHtcbiAgICAgICAgICAgIHJldHVybiBhZnRlclVzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNhcmRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGVhZCA9IFwic2VsXCI7XG4gICAgICAgIHZhciBub2RlTmFtZSwgc2VsTm9kZTtcbiAgICAgICAgdmFyIHNlbFNwcml0ZSA9IG51bGw7XG5cbiAgICAgICAgZm9yKHZhciBpPTE7aTw9NztpKyspIHtcbiAgICAgICAgICAgIG5vZGVOYW1lID0gaGVhZCArIGk7XG4gICAgICAgICAgICBzZWxOb2RlID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKG5vZGVOYW1lKTtcbiAgICAgICAgICAgIGlmKHNlbE5vZGUpIHtcbiAgICAgICAgICAgICAgICBzZWxTcHJpdGUgPSBzZWxOb2RlLmdldENvbXBvbmVudCgnU2VsQ2FyZCcpO1xuICAgICAgICAgICAgICAgIGlmKHNlbFNwcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxTcHJpdGUubWFnaWNDb3N0IDw9IHRoaXMubWFnaWNBbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbE5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LDI1NSwyNTUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsTm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMjcsMTI3LDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=