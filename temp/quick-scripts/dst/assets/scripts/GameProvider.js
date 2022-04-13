
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
      return agentObj.getComponent('NFTArcherSprite');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVQcm92aWRlci5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJpbkFycmF5IiwiYXJyIiwiY29uc29sZSIsImxvZyIsImkiLCJrIiwibGVuZ3RoIiwiQXJyYXkiLCJyZW1vdmVCeVZhbHVlIiwidmFsIiwic3BsaWNlIiwibWludXMiLCJyZXN1bHQiLCJvYmoiLCJqIiwicHVzaCIsImNvbW1vbiIsInJlcXVpcmUiLCJzb2NrZXRQcm92aWRlciIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYmNudCIsImhpZGVEcmFnSXRlbSIsImlubmVySWQiLCJwdXRTZWxlIiwiZGVzdHJveSIsImNyZWF0ZUJ1ZmYiLCJidWZmIiwibXlCdWZmIiwicHgiLCJweSIsImNhbnZhc05vZGUiLCJub2RlIiwicGFyZW50IiwidHlwZUlkIiwicGxheVNuZCIsImluc3RhbnRpYXRlIiwicGxheWVyUHJlZmFiIiwiZGlzcENoYXJTZWxlIiwiY2xpY2tTZWxlIiwibXlwb3MiLCJ4IiwieSIsIm1vdmVUbyIsInYyIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsImNyZWF0ZUFnZW50cyIsImFnZW50cyIsImFpZCIsIm15QWdlbnQiLCJhZ2VudCIsImFnZW50Tm9kZSIsImVvIiwibnBjSW5mbyIsIm9iamVjdEZvcktleSIsInJvbGUiLCJuYW1lIiwidHlwZSIsImFjdGl2ZSIsInNpemUiLCJsZXZlbCIsImdldENvbXBvbmVudEJ5Um9sZSIsImluaXQiLCJzZXRJZCIsInNldFNoYWRvdyIsInNoYWRvd0ZvckFnZW50Iiwic2V0VG90YWxMaWZlIiwibGlmZSIsInNldEJsb29kIiwiYmxvb2RGb3JBZ2VudCIsIm1haW5QbGF5ZXIiLCJyb3QiLCJ1cGRhdGVQb3MiLCJzZXRPYmplY3QiLCJjcmVhdGVCdWxsZXRzIiwiYnVsbGV0cyIsIm15QnVsbGV0IiwiYnVsbGV0IiwiZURpcyIsInN0YXJ0UG9zIiwiZW5lbWV5RGlzdGFuY2UiLCJ0YXJnZXRwb3MiLCJ0YXJnZXREaXMiLCJ1cGRvd24iLCJ6SW5kZXgiLCJidWxsZXRSb3QiLCJhbmdsZSIsImNyZWF0ZUJhc2VzIiwiYmFzZXMiLCJiYXNlTmFtZSIsImJhc2VOb2RlIiwib2JqZWN0SWQiLCJiYXNlT2JqIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJzZXRMaWZlIiwiY3JlYXRlTG9ncyIsImxvZ3MiLCJzaGFkb3dGb3JMb2ciLCJtb3ZlIiwiY3JlYXRlRm9ydHMiLCJmb3J0cyIsInpvcmRlciIsInNwTmFtZSIsInBhcnNlSW50Iiwic2V0WkluZGV4IiwiYWdlbnRQcm9jZXNzIiwicmVtb3RlQWdlbnRzIiwibG9jYWxBZ2VudHMiLCJraWxsQWdlbnRzIiwiYWdlbnRPYmoiLCJhZ2VudElkIiwiYWxsS2V5cyIsInJlbW92ZSIsInJlbW92ZWROcGNJbmZvIiwicmVtb3ZlT2JqZWN0Rm9yS2V5IiwiYmFzZVByb2Nlc3MiLCJyZW1vdGVCYXNlcyIsImtpbGxCYXNlcyIsImVuZW15QmFzZXMiLCJ3YXJyaW9yTmFtZSIsIndhcnJpb3JPYmoiLCJfZGVmYXVsdEJhc2VzIiwiZGlzcExheW91dE1hc2siLCJyZW1vdmVDaGlsZCIsInBsYXlFZmZlY3QiLCJwbHVzQmFzZUtpbGxOdW0iLCJlbmVteW51bSIsIm15bnVtIiwic3RyaW5nIiwiZGlyIiwiYmQiLCJ1bmRpc3BsYXlNYXNrIiwic2VsIiwia2lsbEVuZW15QmFzZXMiLCJfc2VsZiIsInNob3dNYXNrIiwic2hvd0RyYWdNYXNrIiwiaWZOb3RNYXNrUm9sZSIsIm1hc2tUeXBlIiwidW5zaG93RHJhZ01hc2siLCJkZWxheSIsInNjaGVkdWxlT25jZSIsInB1dEVycm9yTXNnIiwidW5kaXNwbGF5UHV0RXJyIiwiZm9ydFByb2Nlc3MiLCJmb3J0c0Z1dHVyZSIsImxvZ1Byb2Nlc3MiLCJidWxsZXRQcm9jZXNzIiwicmVtb3RlQnVsbGV0cyIsImxvY2FsQnVsbGV0cyIsImtpbGxCdWxsZXRzIiwic3RhcnRTY2VuZUppdHRlciIsInNjZW5lTm9kZSIsIm94Iiwib3kiLCJjbnQiLCJsb3dlciIsInVwcGVyIiwiY2FsbEJhY2siLCJyYW5kb21YIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tWSIsInN0b3BBbGxBY3Rpb25zIiwiZGVsIiwiZGVsYXlUaW1lIiwiY2FsIiwiY2FsbEZ1bmMiLCJzZXEiLCJzZXF1ZW5jZSIsInJ1bkFjdGlvbiIsInJlcGVhdEZvcmV2ZXIiLCJwbGF5QmFzZXMiLCJraW5nTm9kZSIsImtpbmdBcnJvdyIsIndhcnJpb3IiLCJhY3RUeXBlIiwiYXR0YWNrRHVyYSIsIm5vdyIsInRtcEIiLCJlb0RlYWQiLCJwbGF5QmFzZVdhcnJpb3JBbmltYXRpb25EZWZhdWx0IiwicGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uIiwicGxheUFnZW50cyIsImFnZW50c0Z1dHVyZSIsInBsYXlBbmkiLCJnZXRGdXR1cmVBZ2VudCIsInNldEdyb3VwS2lsbCIsImdyb3VwS2lsbCIsInJvdW5kIiwicGxheUZvcnRzIiwicGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdCIsImlzSGVybyIsInBsYXlMb2dzIiwic2MiLCJwbGF5QnVsbGV0cyIsInN1YkJ1bGxldCIsInNob3dCdWxsZXQiLCJwcCIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiZ2V0RmlyZUJvbWJTY2FsZSIsInNjYWxlWCIsInNjYWxlWSIsImxhc3Rwb3MiLCJzdWIiLCJtYWciLCJidWxsZXRQb3MiLCJ0YXJnZXRQb3MiLCJ4RGlmIiwieURpZiIsIm1pZFBvcyIsImRpcyIsInNxcnQiLCJleCIsImV5IiwiZ2V0S2lsbGVkRW5lbWllcyIsImFpZHMiLCJraWxsZWRFbmVtaWVzIiwiYmxvb2RPYmoiLCJibG9vZE9wIiwic2V0QmFyTGV2ZWwiLCJzaGFkb3dPYmoiLCJzYWNsZVkiLCJzZXRDbGlja0l0ZW0iLCJzZWxlY3QiLCJwdXRDbGlja0l0ZW0iLCJzZWxDYXJkIiwicHQiLCJwdXROb2RlIiwibmljayIsIk51bWJlciIsIkRhdGUiLCJzZXREcmFnSXRlbSIsInBhcmFtcyIsImNhcmQiLCJ0YXJnZXQiLCJkcmFnTm9kZSIsImFjdHZpZSIsImRyYWdnaW5nSXRlbSIsInVuc2V0RHJhZ0l0ZW0iLCJtb3ZlRHJhZ0l0ZW0iLCJkZWx0YSIsImNsZWFyRHJhZ0l0ZW0iLCJwYXJhbSIsIl9uYW1lIiwibGF5b3V0UHQiLCJwb3NpdGlvbiIsInlPZmZzZXQiLCJtYWdpY0Nvc3QiLCJpc1ZhbGlkUHV0UG9pbnQiLCJzZW5kU29kaWVyIiwiYmFyIiwianVpY2UiLCJjb3N0IiwidXNlTWFnaWMiLCJ3aWR0aCIsIk1ZX1NPQ0tFVCIsImpzb24iLCJlbWl0Iiwicm9vbUlkIiwic2V0TWFnaWNCYXIiLCJhZGRKdWljZSIsIm1hZ2ljQW1vdW50IiwidXBkYXRlQ2FyZFN0YXR1cyIsImFtb3VudCIsImFmdGVyVXNlIiwiaGVhZCIsIm5vZGVOYW1lIiwic2VsTm9kZSIsInNlbFNwcml0ZSIsImNvbG9yIiwiQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxPQUFqQixHQUEyQixVQUFTQyxHQUFULEVBQWM7QUFDckM7QUFDQSxNQUFHLENBQUNBLEdBQUosRUFBUTtBQUNMQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNGLEdBSm9DLENBS3JDOzs7QUFDQSxPQUFJLElBQUlDLENBQUMsR0FBQyxDQUFOLEVBQVFDLENBQUMsR0FBQ0osR0FBRyxDQUFDSyxNQUFsQixFQUF5QkYsQ0FBQyxHQUFDQyxDQUEzQixFQUE2QkQsQ0FBQyxFQUE5QixFQUFrQztBQUM5QixRQUFHLFFBQU1ILEdBQUcsQ0FBQ0csQ0FBRCxDQUFaLEVBQWlCO0FBQ2IsYUFBTyxJQUFQO0FBQ0g7QUFDSixHQVZvQyxDQVdyQzs7O0FBQ0EsU0FBTyxLQUFQO0FBQ0gsQ0FiRDs7QUFlQUcsS0FBSyxDQUFDUixTQUFOLENBQWdCUyxhQUFoQixHQUFnQyxVQUFTQyxHQUFULEVB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O0FBQ1osYUFBT0EsUUFBUDtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNILEdBeG9DSTtBQTBvQ0xGLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFXO0FBQ3pCLFFBQUlHLElBQUksR0FBRyxLQUFYO0FBQ0EsUUFBSUMsUUFBSixFQUFjQyxPQUFkO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLElBQWhCOztBQUVBLFNBQUksSUFBSTlRLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsSUFBRSxDQUFmLEVBQWlCQSxDQUFDLEVBQWxCLEVBQXNCO0FBQ2xCNFEsTUFBQUEsUUFBUSxHQUFHRCxJQUFJLEdBQUczUSxDQUFsQjtBQUNBNlEsTUFBQUEsT0FBTyxHQUFHLEtBQUtqUCxVQUFMLENBQWdCK0QsY0FBaEIsQ0FBK0JpTCxRQUEvQixDQUFWOztBQUNBLFVBQUdDLE9BQUgsRUFBWTtBQUNSQyxRQUFBQSxTQUFTLEdBQUdELE9BQU8sQ0FBQ2pMLFlBQVIsQ0FBcUIsU0FBckIsQ0FBWjs7QUFDQSxZQUFHa0wsU0FBSCxFQUFjO0FBQ1YsY0FBR0EsU0FBUyxDQUFDckIsU0FBVixJQUF1QixLQUFLYyxXQUEvQixFQUE0QztBQUN4Q00sWUFBQUEsT0FBTyxDQUFDRSxLQUFSLEdBQWdCLElBQUloUSxFQUFFLENBQUNpUSxLQUFQLENBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixDQUFoQjtBQUNILFdBRkQsTUFFTztBQUNISCxZQUFBQSxPQUFPLENBQUNFLEtBQVIsR0FBZ0IsSUFBSWhRLEVBQUUsQ0FBQ2lRLEtBQVAsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLENBQWhCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSjtBQTdwQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5a6a5LmJ5LiA5Liq5Yik5pat5Ye95pWwXG5TdHJpbmcucHJvdG90eXBlLmluQXJyYXkgPSBmdW5jdGlvbihhcnIpIHtcbiAgICAvLyDkuI3mmK/mlbDnu4TliJnmipvlh7rlvILluLhcbiAgICBpZighYXJyKXtcbiAgICAgICBjb25zb2xlLmxvZyhcIkVSUihpbl9hcnJheSk6SW5wdXQgaXMgbm90IGFuIGFycmF5XCIpO1xuICAgIH1cbiAgICAvLyDpgY3ljobmmK/lkKblnKjmlbDnu4TkuK1cbiAgICBmb3IodmFyIGk9MCxrPWFyci5sZW5ndGg7aTxrO2krKykge1xuICAgICAgICBpZih0aGlzPT1hcnJbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOWmguaenOS4jeWcqOaVsOe7hOS4reWwseS8mui/lOWbnmZhbHNlXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuQXJyYXkucHJvdG90eXBlLnJlbW92ZUJ5VmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICBmb3IodmFyIGk9MDtpPHRoaXMubGVuZ3RoO2krKykge1xuICAgICAgICBpZih0aGlzW2ldID09IHZhbCkge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkFycmF5LnByb3RvdHlwZS5taW51cyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KCk7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9ialthcnJbaV1dID0gMTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICghb2JqW3RoaXNbal1dKVxuICAgICAgICB7XG4gICAgICAgICAgICBvYmpbdGhpc1tqXV0gPSAxO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tqXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBjb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xudmFyIHNvY2tldFByb3ZpZGVyID0gcmVxdWlyZShcIlNvY2tldFByb3ZpZGVyXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogc29ja2V0UHJvdmlkZXIsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJjbnQ6MFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIC8vIHN0YXJ0ICgpIHt9LFxuXG4gICAgaGlkZURyYWdJdGVtOmZ1bmN0aW9uIChpbm5lcklkKSB7XG4gICAgICAgIGlmKHRoaXMucHV0U2VsZVtpbm5lcklkXSkge1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlQnVmZjpmdW5jdGlvbihidWZmKSB7XG4gICAgICAgIHZhciBteUJ1ZmYscHgscHk7XG4gICAgICAgIHZhciBjYW52YXNOb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcblxuICAgICAgICBpZihidWZmLnR5cGVJZCA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJ0aHVuZGVyXCIpO1xuICAgICAgICAgICAgbXlCdWZmID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjNdKTtcbiAgICAgICAgICAgIC8vY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1ZmZUaHVuZGVyXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYnVmZi50eXBlSWQgPT0gMikge1xuICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwiaGVhbFwiKTtcbiAgICAgICAgICAgIG15QnVmZiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzI0XSk7XG4gICAgICAgICAgICAvL2NhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidWZmSGVhbFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9oaWRlIHNlbGVjdCBmcmFtZVxuICAgICAgICB0aGlzLmRpc3BDaGFyU2VsZSgpO1xuXG4gICAgICAgIC8vcmVtb3ZlIGJ1ZmYgaWNvblxuICAgICAgICBpZih0aGlzLnB1dFNlbGVbYnVmZi5pbm5lcklkXSkge1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2J1ZmYuaW5uZXJJZF0ucGFyZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaGlkZSBkcmFnIGl0ZW0gZGlzcFxuICAgICAgICAvL3RoaXMuaGlkZURyYWdJdGVtKGJ1ZmYuaW5uZXJJZCk7XG5cbiAgICAgICAgdGhpcy5jbGlja1NlbGUgPSB7fTtcblxuICAgICAgICAvL3RvZG8gMzhcbiAgICAgICAgcHggPSAoYnVmZi5teXBvcy54KSozODtcbiAgICAgICAgcHkgPSAoYnVmZi5teXBvcy55KSozODtcblxuICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcbiAgICAgICAgbXlCdWZmLnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QnVmZik7XG4gICAgfSxcblxuICAgIGNyZWF0ZUFnZW50czpmdW5jdGlvbihhZ2VudHMpIHtcbiAgICAgICAgdmFyIGFpZCxteUFnZW50LGFnZW50LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5LGVvO1xuICAgICAgICAvL3ZhciBub2RlbGlzdCA9IGNjLmZpbmQoXCJDYW52YXMvbGF5b3V0XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5vZGVsaXN0KTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGFnZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGFnZW50c1tpXTtcblxuICAgICAgICAgICAgYWlkID0gYWdlbnQuYWlkO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcblxuICAgICAgICAgICAgLy9weCA9IChhZ2VudC5teXBvcy54KSozODtcbiAgICAgICAgICAgIC8vcHkgPSAoYWdlbnQubXlwb3MueSkqMzg7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyYWdJdGVtKGFnZW50LmlubmVySWQpO1xuXG4gICAgICAgICAgICAgICAgaWYoYWdlbnQucm9sZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlswXSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJpclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyMF0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzE2XSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJ3aXpcIikge1xuLy9teUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTddKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyNl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJoclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxMl0pOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwibG1cIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTRdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImxyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzNdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImdpXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzRdKTsgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiYWdlbnRcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuICAgICAgICAgICAgICAgIG15QWdlbnQubGV2ZWwgPSBhZ2VudC5sZXZlbDtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldElkKGFpZCk7XG5cbiAgICAgICAgICAgICAgICAvL3NoYWRvdyBzaG91bGQgc2V0IGluIGxheW91dCwgYmVjYXVzZSBpdHMgemluZGV4IHNob3VsZCBiZSBsb3dlciB0aGFuIGFueSBhZ2VudHMuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFNoYWRvdyh0aGlzLnNoYWRvd0ZvckFnZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFRvdGFsTGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0Qmxvb2QodGhpcy5ibG9vZEZvckFnZW50KG15QWdlbnQpKTtcblxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdCBwb3MgaXMgaW4gc291dGgsIGZhY2UgdG8gbm9ydGgsIG90aGVyd2lzZS4uLi5cbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAxODA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQucm90ID0gMDsgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuY29uc29sZS5sb2coXCItLXJlYyBwdC0tXCIpO1xuY29uc29sZS5sb2coYWdlbnQubXlwb3MueCArXCI6OjpcIisgYWdlbnQubXlwb3MueSk7XG5cbiAgICAgICAgICAgICAgICBweCA9IChhZ2VudC5teXBvcy54KSozODtcbiAgICAgICAgICAgICAgICBweSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS51cGRhdGVQb3MocHgsIHB5KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUFnZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QWdlbnQsIGFpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlQnVsbGV0czpmdW5jdGlvbihidWxsZXRzKSB7XG4gICAgICAgIHZhciBhaWQsbXlCdWxsZXQsYnVsbGV0LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5LGVvLGVEaXM7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxidWxsZXRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGJ1bGxldCA9IGJ1bGxldHNbaV07XG4gICAgICAgICAgICBhaWQgPSBidWxsZXQuYWlkO1xuICAgICAgICAgICAgbXlCdWxsZXQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFpZCk7XG5cbiAgICAgICAgICAgIGlmKG15QnVsbGV0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZihidWxsZXQucm9sZT09XCJidWxsZXRcIikge1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zdGFydFBvcyA9IGJ1bGxldC5teXBvcztcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYnVsbGV0LnJvbGU9PVwiYm9tYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm9tYiBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJmaXJlU2VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYnVsbGV0LmlubmVySWQpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzVdKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIGVEaXMgPSB0aGlzLmVuZW1leURpc3RhbmNlKGJ1bGxldC5teXBvcy54LCBidWxsZXQubXlwb3MueSwgYnVsbGV0LnRhcmdldHBvcy54LCBidWxsZXQudGFyZ2V0cG9zLnkpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zdGFydFBvcyA9IGJ1bGxldC5teXBvcztcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQudGFyZ2V0RGlzID0gZURpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihidWxsZXQucm9sZT09XCJ0YW1hXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwiZ3VuXCIpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzldKTtcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuc3RhcnRQb3MgPSBidWxsZXQubXlwb3M7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGJ1bGxldC5yb2xlPT1cIndpemZpcmVcIikge1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzE4XSk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnN0YXJ0UG9zID0gYnVsbGV0Lm15cG9zO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IsIG5vIGJ1bGxldCB0eXBlLlwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBteUJ1bGxldC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LnR5cGUgPSBcImJ1bGxldFwiO1xuICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5yb2xlID0gYnVsbGV0LnJvbGU7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQudXBkb3duID0gYnVsbGV0LnVwZG93bjtcblxuICAgICAgICAgICAgICAgIG15QnVsbGV0LnpJbmRleCA9IDk5OTk7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUJ1bGxldCk7XG5cbiAgICAgICAgICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUJ1bGxldCk7XG5cbiAgICAgICAgICAgICAgICAvL3B4ID0gLTEwMDA7XG4gICAgICAgICAgICAgICAgLy9weSA9IC0xMDAwO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHB4ID0gNTA7XG4gICAgICAgICAgICAgICAgcHkgPSA1MDtcblxuXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0Um90ID0gYnVsbGV0LnJvdDtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBidWxsZXRSb3QgKz0gMTgwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vc2luY2UgMi4xLjEgc2V0Um90YXRpb24gaXMgZGVzcGVyYXRlZC5cbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDtcbiAgICAgICAgICAgICAgICAvL215QnVsbGV0LnNldFJvdGF0aW9uKGJ1bGxldFJvdCk7ICAvL2J1bGxldC5yb3QrMTgwXG5cbiAgICAgICAgICAgICAgICBteUJ1bGxldC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUJ1bGxldCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVCYXNlczpmdW5jdGlvbihiYXNlcykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYmFzZU5hbWUsYmFzZU5vZGU7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxiYXNlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGJhc2VzW2ldO1xuICAgICAgICAgICAgYWlkID0gYWdlbnQuYWlkO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbXlBZ2VudCA9IHt9O1xuICAgICAgICAgICAgICAgIG15QWdlbnQubmFtZSA9IGFpZDtcbiAgICAgICAgICAgICAgICBteUFnZW50LnR5cGUgPSBcImJhc2VcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50Lm15cG9zID0gYWdlbnQubXlwb3M7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5zaXplID0gYWdlbnQuc2l6ZTtcblxuICAgICAgICAgICAgICAgIGJhc2VOYW1lID0gXCJiYXNlXCIrIGFnZW50Lm9iamVjdElkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYmFzZU9iaiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShiYXNlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBiYXNlTm9kZSA9IG15QWdlbnQuYmFzZU9iai5nZXRDb21wb25lbnQoXCJCYXNlU3ByaXRlXCIpO1xuICAgICAgICAgICAgICAgIGJhc2VOb2RlLnNldFRvdGFsTGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBiYXNlTm9kZS5zZXRCbG9vZCh0aGlzLmJsb29kRm9yQWdlbnQobXlBZ2VudC5iYXNlT2JqKSk7XG4gICAgICAgICAgICAgICAgYmFzZU5vZGUuc2V0TGlmZShhZ2VudC5saWZlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5zZXRPYmplY3QobXlBZ2VudCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVMb2dzOmZ1bmN0aW9uKGxvZ3MpIHtcbiAgICAgICAgdmFyIGFpZCxteUFnZW50LGFnZW50LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5O1xuXG4gICAgICAgIC8vdGhpcy5wbGF5U25kKFwibG9nXCIpO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bG9ncy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGxvZ3NbaV07XG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG5cbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFpZCk7XG5cbiAgICAgICAgICAgIC8vdG9kbyAzOFxuICAgICAgICAgICAgcHggPSAoYWdlbnQubXlwb3MueCkqMzg7XG4gICAgICAgICAgICBweSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYWdlbnQuaW5uZXJJZCk7XG5cbiAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbOF0pO1xuICAgICAgICAgICAgICAgIG15QWdlbnQubmFtZSA9IGFpZDtcbiAgICAgICAgICAgICAgICBteUFnZW50LnR5cGUgPSBcImxvZ1wiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldElkKGFpZCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFNoYWRvdyh0aGlzLnNoYWRvd0ZvckxvZygpKTtcblxuICAgICAgICAgICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5tb3ZlKG1vdmVUbyk7XG5cbiAgICAgICAgICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUFnZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJsb2dcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QWdlbnQsIGFpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlRm9ydHM6ZnVuY3Rpb24oZm9ydHMpIHtcbiAgICAgICAgdmFyIGFpZCxteUFnZW50LGFnZW50LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5LGVvLHpvcmRlcjtcblxuICAgICAgICAvL3ZhciBub2RlbGlzdCA9IGNjLmZpbmQoXCJDYW52YXMvbGF5b3V0XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5vZGVsaXN0KTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGZvcnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gZm9ydHNbaV07XG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICAvL3RvZG8gMzhcbiAgICAgICAgICAgIHB4ID0gKGFnZW50Lm15cG9zLngpKjM4O1xuICAgICAgICAgICAgcHkgPSAoYWdlbnQubXlwb3MueSkqMzg7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyYWdJdGVtKGFnZW50LmlubmVySWQpO1xuXG4gICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzddKTsgICAgXG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiZmFcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNwTmFtZSA9IFwiRm9ydEFTcHJpdGVcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuXG4gICAgICAgICAgICAgICAgLy8xMDAwOmFnZW50LCA5OTk6YnVsbGV0IDk5ODp0aGlzO1xuICAgICAgICAgICAgICAgIC8vZm9ydCBiYXNlIGFuY2hvclkgaXMgbWlkZGxlLCBzbyB5LTIgaXMgbmVzc2VzYXJ5LlxuXG4gICAgICAgICAgICAgICAgLy90b2RvIDE2XG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgem9yZGVyID0gMTAwMStwYXJzZUludCgxNi1hZ2VudC5teXBvcy55LTEpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICB6b3JkZXIgPSAxMDAxK3BhcnNlSW50KDE2LWFnZW50Lm15cG9zLnktMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG15QWdlbnQuekluZGV4ID0gem9yZGVyO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFpJbmRleCh6b3JkZXIpO1xuLyogICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnNldElkKGFpZCk7XG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUuc2V0U2hhZG93KHRoaXMuc2hhZG93Rm9yQWdlbnQoKSk7XG4qL1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFRvdGFsTGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0Qmxvb2QodGhpcy5ibG9vZEZvckFnZW50KG15QWdlbnQpKTtcblxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdCBwb3MgaXMgaW4gc291dGgsIGZhY2UgdG8gbm9ydGgsIG90aGVyd2lzZS4uLi5cbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAxODA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQucm90ID0gMDsgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnBsYXlBbmdsZUFuaW1hdGlvbihhZ2VudCwgbnVsbCwgdGhpcy5tYWluUGxheWVyKTtcblxuICAgICAgICAgICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QWdlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUFnZW50LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFnZW50UHJvY2VzczogZnVuY3Rpb24oYWdlbnRzKSB7XG4gICAgICAgIHZhciByZW1vdGVBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGxvY2FsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBraWxsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBhZ2VudE9iaiwgYWdlbnROb2RlO1xuICAgICAgICB2YXIgYWdlbnRJZDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGFnZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICByZW1vdGVBZ2VudHMucHVzaChhZ2VudHNbaV0uYWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQWdlbnRzID0gdGhpcy5ucGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAga2lsbEFnZW50cyA9IGxvY2FsQWdlbnRzLm1pbnVzKHJlbW90ZUFnZW50cyk7XG5cbiAgICAgICAgZm9yKGFnZW50SWQgb2Yga2lsbEFnZW50cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoudHlwZSA9PSBcImFnZW50XCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJhc2VQcm9jZXNzOiBmdW5jdGlvbihiYXNlcykge1xuICAgICAgICB2YXIgcmVtb3RlQmFzZXMgPSBbXTtcbiAgICAgICAgdmFyIGtpbGxCYXNlcyA9IFtdO1xuICAgICAgICB2YXIgZW5lbXlCYXNlcyA9IFtdO1xuICAgICAgICB2YXIgYmFzZU9iajtcbiAgICAgICAgdmFyIHdhcnJpb3JOYW1lO1xuICAgICAgICB2YXIgd2Fycmlvck9iajtcbiAgICAgICAgdmFyIGJhc2VOYW1lO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YmFzZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYmFzZU5hbWUgPSBcImJhc2VcIisgYmFzZXNbaV0ub2JqZWN0SWQ7XG4gICAgICAgICAgICByZW1vdGVCYXNlcy5wdXNoKGJhc2VOYW1lKTtcbiAgICAgICAgICAgIGVuZW15QmFzZXMucHVzaChiYXNlTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2RvIGxpc3Q6IHNob3VsZCBtYW5hZ2UgdG8gcmVtb3ZlIHRoZSBiYXNlIHJlY29yZCBpbiBucGNJbmZvLlxuICAgICAgICBraWxsQmFzZXMgPSB0aGlzLl9kZWZhdWx0QmFzZXMubWludXMocmVtb3RlQmFzZXMpO1xuXG4gICAgICAgIGZvcihiYXNlTmFtZSBvZiBraWxsQmFzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcExheW91dE1hc2soZW5lbXlCYXNlcywgYmFzZU5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0QmFzZXMucmVtb3ZlQnlWYWx1ZShiYXNlTmFtZSk7XG4gICAgICAgICAgICBiYXNlT2JqID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgLy90aGlzLnBsdXNCYXNlS2lsbE51bShiYXNlTmFtZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZChiYXNlT2JqKTtcbiAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJhc2VcIiwgYmFzZU9iai54LCBiYXNlT2JqLnkpO1xuICAgICAgICB9XG4gICAgfSxcbiBcbiAgICBwbHVzQmFzZUtpbGxOdW06IGZ1bmN0aW9uKGJhc2VOYW1lKSB7XG4gICAgICAgIC8vdG9kbzogbGF5b3V0IG5vZGUgbXVzdCBiZSBzZXQgaW4gaW5pdCBcbiAgICAgICAgdmFyIGVuZW15bnVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXBGbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICB2YXIgbXludW0gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkb3duRmxhZ1wiKS5nZXRDaGlsZEJ5TmFtZShcInJpbmdNYXJrXCIpLmdldENoaWxkQnlOYW1lKFwia2lsbG51bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGJhc2VOYW1lLmluQXJyYXkoW1wiYmFzZTFcIiwgXCJiYXNlMlwiLCBcImJhc2UzXCJdKSkge1xuICAgICAgICAgICAgZW5lbXludW0uc3RyaW5nID0gcGFyc2VJbnQoZW5lbXludW0uc3RyaW5nKSsxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXludW0uc3RyaW5nID0gcGFyc2VJbnQoZW5lbXludW0uc3RyaW5nKSsxOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vY2FsbGVkIHdoZW4gZ2FtZSBpcyBvdmVyXG4gICAga2lsbEJhc2VzOmZ1bmN0aW9uKGRpcikge1xuICAgICAgICAvL3RvZG86IGxheW91dCBub2RlIG11c3QgYmUgc2V0IGluIGluaXQgXG4gICAgICAgIC8vdmFyIGVuZW15bnVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXBGbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICAvL3ZhciBteW51bSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRvd25GbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgXG4gICAgICAgIHZhciBraWxsQmFzZXM7XG4gICAgICAgIHZhciBiYXNlT2JqLCBiZDtcbiAgICAgICAgdmFyIGJhc2VOYW1lO1xuICAgICAgICBpZihkaXIgPT0gXCJ1cFwiKSB7XG4gICAgICAgICAgICBraWxsQmFzZXM9IFtcImJhc2UxXCIsIFwiYmFzZTJcIiwgXCJiYXNlM1wiXTtcbiAgICAgICAgICAgIC8vZW5lbXludW0uc3RyaW5nID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtpbGxCYXNlcz0gW1wiYmFzZTRcIiwgXCJiYXNlNVwiLCBcImJhc2U2XCJdO1xuICAgICAgICAgICAgLy9teW51bS5zdHJpbmcgPSAzO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGJhc2VOYW1lIG9mIGtpbGxCYXNlcykge1xuICAgICAgICAgICAgLy90aGlzLl9kZWZhdWx0QmFzZXMucmVtb3ZlQnlWYWx1ZShiYXNlTmFtZSk7XG4gICAgICAgICAgICBiYXNlT2JqID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgaWYoYmFzZU9iaikge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJhc2VcIiwgYmFzZU9iai54LCBiYXNlT2JqLnkpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZChiYXNlT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmRpc3BsYXlNYXNrOiBmdW5jdGlvbihzZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2VsKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHNlbCkuYWN0aXZlPWZhbHNlO1xuICAgIH0sXG5cbiAgICBkaXNwTGF5b3V0TWFzazogZnVuY3Rpb24oa2lsbEVuZW15QmFzZXMsIGJhc2VOYW1lKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKGJhc2VOYW1lID09IFwiYmFzZTRcIiB8fCBiYXNlTmFtZSA9PSBcImJhc2U1XCIgfHwgYmFzZU5hbWUgPT0gXCJiYXNlNlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmKFwiYmFzZTFcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSAmJiBcImJhc2UyXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykgJiYgXCJiYXNlM1wiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpKSB7XG4gICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgLy99XG5cbiAgICAgICAgaWYoXCJiYXNlMVwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpICYmIFwiYmFzZTJcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayhcInNlbGVNYXNrMTJcIiwgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihcImJhc2UxXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykgJiYgXCJiYXNlM1wiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNYXNrKFwic2VsZU1hc2sxM1wiLCAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKFwiYmFzZTFcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayhcInNlbGVNYXNrMVwiLCAyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93RHJhZ01hc2s6IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgaWYoIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHRoaXMubWFza1R5cGUpLmFjdGl2ZT10cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVuc2hvd0RyYWdNYXNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHRoaXMubWFza1R5cGUpLmFjdGl2ZT1mYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd01hc2s6IGZ1bmN0aW9uKG1hc2tUeXBlLCBkZWxheSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm1hc2tUeXBlID0gbWFza1R5cGU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShtYXNrVHlwZSkuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3NlbGYudW5kaXNwbGF5TWFzayhtYXNrVHlwZSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9LFxuXG4gICAgcHV0RXJyb3JNc2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwdXRFcnJvclwiKS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfc2VsZi51bmRpc3BsYXlQdXRFcnIoKTtcbiAgICAgICAgfSwgMSk7XG4gICAgfSxcblxuICAgIHVuZGlzcGxheVB1dEVycjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInB1dEVycm9yXCIpLmFjdGl2ZT1mYWxzZTtcbiAgICB9LFxuXG4gICAgZm9ydFByb2Nlc3M6IGZ1bmN0aW9uKGZvcnRzLCBmb3J0c0Z1dHVyZSkge1xuICAgICAgICB2YXIgcmVtb3RlQWdlbnRzID0gW107XG4gICAgICAgIHZhciBsb2NhbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIga2lsbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQsIGJkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8Zm9ydHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgcmVtb3RlQWdlbnRzLnB1c2goZm9ydHNbaV0uYWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQWdlbnRzID0gdGhpcy5ucGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAga2lsbEFnZW50cyA9IGxvY2FsQWdlbnRzLm1pbnVzKHJlbW90ZUFnZW50cyk7XG5cbiAgICAgICAgZm9yKGFnZW50SWQgb2Yga2lsbEFnZW50cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoudHlwZSA9PSBcImZhXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJmb3J0XCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuXG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJhc2VcIiwgYWdlbnRPYmoueCwgYWdlbnRPYmoueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbG9nUHJvY2VzczogZnVuY3Rpb24obG9ncykge1xuICAgICAgICB2YXIgcmVtb3RlQWdlbnRzID0gW107XG4gICAgICAgIHZhciBsb2NhbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIga2lsbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQsIGJkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bG9ncy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICByZW1vdGVBZ2VudHMucHVzaChsb2dzW2ldLmFpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEFnZW50cyA9IHRoaXMubnBjSW5mby5hbGxLZXlzKCk7XG4gICAgICAgIGtpbGxBZ2VudHMgPSBsb2NhbEFnZW50cy5taW51cyhyZW1vdGVBZ2VudHMpO1xuXG4gICAgICAgIGZvcihhZ2VudElkIG9mIGtpbGxBZ2VudHMpIHtcbiAgICAgICAgICAgIGFnZW50T2JqID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnJvbGUgPT0gXCJsb2dcIikge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImxvZ1wiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYnVsbGV0UHJvY2VzczogZnVuY3Rpb24oYnVsbGV0cykge1xuICAgICAgICB2YXIgcmVtb3RlQnVsbGV0cyA9IFtdO1xuICAgICAgICB2YXIgbG9jYWxCdWxsZXRzID0gW107XG4gICAgICAgIHZhciBraWxsQnVsbGV0cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxidWxsZXRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIHJlbW90ZUJ1bGxldHMucHVzaChidWxsZXRzW2ldLmFpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEJ1bGxldHMgPSB0aGlzLm5wY0luZm8uYWxsS2V5cygpO1xuICAgICAgICBraWxsQnVsbGV0cyA9IGxvY2FsQnVsbGV0cy5taW51cyhyZW1vdGVCdWxsZXRzKTtcblxuICAgICAgICBmb3IoYWdlbnRJZCBvZiBraWxsQnVsbGV0cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoucm9sZSA9PSBcImJvbWJcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE9iai5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiYm9tYlwiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnJvbGUgPT0gXCJ3aXpmaXJlXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnRPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIGlmKGFnZW50T2JqLnggJiYgYWdlbnRPYmoueSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJ3aXpmaXJlXCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWdlbnRPYmoucm9sZSA9PSBcImJ1bGxldFwiIHx8IGFnZW50T2JqLnJvbGUgPT0gXCJ0YW1hXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnRPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vc2hha2UgdGhlIHNjcmVlblxuICAgIHN0YXJ0U2NlbmVKaXR0ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzY2VuZU5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHZhciBveCA9IHNjZW5lTm9kZS54O1xuICAgICAgICB2YXIgb3kgPSBzY2VuZU5vZGUueTtcblxuICAgICAgICB2YXIgY250ID0gMDtcblxuICAgICAgICB2YXIgbG93ZXIgPSAtNDtcbiAgICAgICAgdmFyIHVwcGVyID0gNDtcbiAgICAgICAgdmFyIGNhbGxCYWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgdmFyIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikpICsgbG93ZXI7XG4gICAgICAgICAgICB2YXIgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh1cHBlciAtIGxvd2VyKSkgKyBsb3dlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2NlbmVOb2RlLnggKz0gcmFuZG9tWDtcbiAgICAgICAgICAgIHNjZW5lTm9kZS55ICs9IHJhbmRvbVk7XG4gICAgICAgICAgICBpZihjbnQ+PTEwKSB7XG4gICAgICAgICAgICAgICAgc2NlbmVOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgc2NlbmVOb2RlLnggPSBveDtcbiAgICAgICAgICAgICAgICBzY2VuZU5vZGUueSA9IG95O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGU7Ly/lnLrmma/luLjpqbvoioLngrlcbiAgICAgICAgdmFyIGRlbCA9IGNjLmRlbGF5VGltZSgxLzMwKTtcbiAgICAgICAgdmFyIGNhbCA9IGNjLmNhbGxGdW5jKGNhbGxCYWNrKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGRlbCwgY2FsKTtcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihzZXEpKTtcbiAgICB9LFxuXG4gICAgcGxheUJhc2VzOiBmdW5jdGlvbihiYXNlcykge1xuICAgICAgICB2YXIgcmVtb3RlQmFzZXMgPSBbXTtcbiAgICAgICAgdmFyIGJhc2VPYmosbXlBZ2VudCxhZ2VudDtcbiAgICAgICAgdmFyIHdhcnJpb3JOYW1lO1xuICAgICAgICB2YXIgd2Fycmlvck9iajtcbiAgICAgICAgdmFyIGJhc2VOYW1lLCBraW5nTm9kZSwgYWdlbnROb2RlLCBraW5nQXJyb3csd2FycmlvcjtcbiAgICAgICAgdmFyIGFjdFR5cGUsIGF0dGFja0R1cmEsIG5vdztcbiAgICAgICAgdmFyIHRtcEIgPSB7fTtcbiAgICAgICAgdmFyIGVvRGVhZDtcbiAgICAgICAgdmFyIGVvID0gbnVsbDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJhc2VzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYmFzZXNbaV07XG5cbiAgICAgICAgICAgIGJhc2VOYW1lID0gXCJiYXNlXCIrIGFnZW50Lm9iamVjdElkO1xuICAgICAgICAgICAgYXR0YWNrRHVyYSA9IGFnZW50LmF0dGFja0R1cmE7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpLmJhc2VPYmo7XG5cbiAgICAgICAgICAgIHRtcEJbYWdlbnQuYWlkXSA9IGJhc2VOYW1lO1xuICAgICAgICAgICAgcmVtb3RlQmFzZXMucHVzaChiYXNlTmFtZSk7XG4gICAgICAgICAgICBhY3RUeXBlID0gYWdlbnQuYWN0VHlwZTtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCkge1xuICAgICAgICAgICAgICAgIG15QWdlbnQuZ2V0Q29tcG9uZW50KFwiQmFzZVNwcml0ZVwiKS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgd2FycmlvciA9IG15QWdlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJyaW9yXCIpO1xuICAgICAgICAgICAgICAgIGlmKHdhcnJpb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Fycmlvci5yb2xlID0gXCJsclwiO1xuICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZSh3YXJyaW9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIG5vIGVubWV5IHRoZW4gc3RhbmRieVxuICAgICAgICAgICAgICAgICAgICBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwid2FpdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdChcIm1vdmVcIiwgYWdlbnQub2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QmFzZVdhcnJpb3JBbmltYXRpb24oYWdlbnQsIHRoaXMubWFpblBsYXllciwgXCJzYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3YXJyaW9yID0gbXlBZ2VudC5nZXRDaGlsZEJ5TmFtZShcImd1blwiKTtcbiAgICAgICAgICAgICAgICBpZih3YXJyaW9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcnJpb3Iucm9sZSA9IFwiZ3VuXCI7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKHdhcnJpb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbm8gZW5tZXkgdGhlbiBzdGFuZGJ5XG4gICAgICAgICAgICAgICAgICAgIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJ3YWl0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnBsYXlGb3J0V2FycmlvckFuaW1hdGlvbkRlZmF1bHQoXCJtb3ZlXCIsIHRoaXMubWFpblBsYXllciwgYWdlbnQub2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QmFzZVdhcnJpb3JBbmltYXRpb24oYWdlbnQsIHRoaXMubWFpblBsYXllciwgXCJzYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5QWdlbnRzOiBmdW5jdGlvbihhZ2VudHMsIGFnZW50c0Z1dHVyZSkge1xuICAgICAgICB2YXIgbXlBZ2VudDtcbiAgICAgICAgdmFyIHB4LCBweSwgYWlkO1xuICAgICAgICB2YXIgYWdlbnROb2RlLGFnZW50LGVvPW51bGw7XG4gICAgICAgIHZhciBlb0RlYWQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxhZ2VudHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWdlbnQgPSBhZ2VudHNbaV07XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpO1xuXG4gICAgICAgICAgICBpZihteUFnZW50ICYmIG15QWdlbnQudHlwZT09XCJhZ2VudFwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlBbmkoYWdlbnQsIHRoaXMuZ2V0RnV0dXJlQWdlbnQoYWdlbnQuYWlkLCBhZ2VudHNGdXR1cmUpLCB0aGlzLm1haW5QbGF5ZXIpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRHcm91cEtpbGwoYWdlbnQuZ3JvdXBLaWxsKTtcblxuICAgICAgICAgICAgICAgIHB4ID0gTWF0aC5yb3VuZCgoYWdlbnQubXlwb3MueCkqMzgpO1xuICAgICAgICAgICAgICAgIHB5ID0gTWF0aC5yb3VuZCgoYWdlbnQubXlwb3MueSkqMzgpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS51cGRhdGVQb3MocHgsIHB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5Rm9ydHM6IGZ1bmN0aW9uKGZvcnRzKSB7XG4gICAgICAgIHZhciBteUFnZW50O1xuICAgICAgICB2YXIgYWdlbnROb2RlLGFnZW50LHdhcnJpb3I9bnVsbDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGZvcnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gZm9ydHNbaV07XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpO1xuICAgICAgICAgICAgaWYoIW15QWdlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG15QWdlbnQucm9sZSA9IFwiZmFcIjtcbiAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgYWdlbnROb2RlLnNldExpZmUoYWdlbnQubGlmZSk7XG5cbiAgICAgICAgICAgIHdhcnJpb3IgPSBteUFnZW50LmdldENoaWxkQnlOYW1lKFwid2FycmlvclwiKTtcbiAgICAgICAgICAgIHdhcnJpb3Iucm9sZSA9IFwibHJcIjtcbiAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKHdhcnJpb3IpO1xuXG4gICAgICAgICAgICAvL2lmIG5vIGVubWV5IHRoZW4gc3RhbmRieVxuICAgICAgICAgICAgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5Rm9ydFdhcnJpb3JBbmltYXRpb25EZWZhdWx0KFwibW92ZVwiLCBhZ2VudC5pc0hlcm8sIHRoaXMubWFpblBsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlCYXNlV2FycmlvckFuaW1hdGlvbihhZ2VudCwgdGhpcy5tYWluUGxheWVyLCBcInNhXCIpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5TG9nczogZnVuY3Rpb24obG9ncykge1xuICAgICAgICB2YXIgYWdlbnQsbXlBZ2VudDtcbiAgICAgICAgdmFyIHB4LCBweSwgYWlkO1xuICAgICAgICB2YXIgYWdlbnROb2RlLGJ1bGxldCxlbz1udWxsO1xuICAgICAgICB2YXIgc2M7XG4gICAgICAgIHZhciBtb3ZlVG87XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxsb2dzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gbG9nc1tpXTtcbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50LmFpZCk7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUFnZW50KTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUubW92ZShhZ2VudC5teXBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUJ1bGxldHM6IGZ1bmN0aW9uKGJ1bGxldHMpIHtcbiAgICAgICAgdmFyIG15QnVsbGV0O1xuICAgICAgICB2YXIgcHgsIHB5LCBhaWQ7XG4gICAgICAgIHZhciBhZ2VudE5vZGUsYnVsbGV0LGVvPW51bGw7XG4gICAgICAgIHZhciBzYztcbiAgICAgICAgdmFyIGJ1bGxldFJvdDtcbiAgICAgICAgdmFyIHN1YkJ1bGxldDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJ1bGxldHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYnVsbGV0ID0gYnVsbGV0c1tpXTtcblxuICAgICAgICAgICAgbXlCdWxsZXQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGJ1bGxldC5haWQpO1xuICAgICAgICAgICAgaWYobXlCdWxsZXQpIHtcbiAgICAgICAgICAgICAgICAvLzIgZm9ydCBidWxsZXQgZW1pdCB0aGUgc2FtZSB0aW1lLCBvbmx5IGRpc3BsYXkgdGhlIHByb3BlciBidWxsZXQuXG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnVwZG93bj09XCJ1cFwiICYmIHRoaXMubWFpblBsYXllcj09Mikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnVwZG93bj09XCJkb3duXCIgJiYgdGhpcy5tYWluUGxheWVyPT0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J1bGxldChteUJ1bGxldCwgYnVsbGV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93QnVsbGV0OiBmdW5jdGlvbihteUJ1bGxldCwgYnVsbGV0KSB7XG4gICAgICAgIHZhciBzdWJCdWxsZXQsIGFnZW50Tm9kZSwgcHgsIHB5LCBtb3ZlVG8sIGJ1bGxldFJvdDtcblxuICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QnVsbGV0KTtcblxuICAgICAgICAvL3RvZG8gMzhcbiAgICAgICAgcHggPSAoYnVsbGV0Lm15cG9zLngpKjM4O1xuICAgICAgICBweSA9IChidWxsZXQubXlwb3MueSkqMzg7XG5cbiAgICAgICAgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcblxuICAgICAgICBidWxsZXRSb3QgPSBidWxsZXQucm90O1xuICAgICAgICAvL2lmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgIC8vICAgIGJ1bGxldFJvdCArPSAxODA7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vMTAwMDphZ2VudCwgOTk5OnRoaXMgYnVsbGV0IDk5ODpmb3J0cztcbiAgICAgICAgLy9tYWtlIGJ1bGxldCBkaXNwbGF5IHVuZGVyIGFnZW50IHdoaWNoIGlzIGF0IHNhbWUgcG9zaXRpb24uXG4gICAgICAgIC8vdG9kbyAxNlxuICAgICAgICBteUJ1bGxldC56SW5kZXggPSAxMDAwK3BhcnNlSW50KDE2LWJ1bGxldC5teXBvcy55KTtcblxuICAgICAgICBpZihteUJ1bGxldC5yb2xlID09IFwiYnVsbGV0XCIpIHtcbiAgICAgICAgICAgIHN1YkJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzFdKTtcbiAgICAgICAgICAgIC8vc3ViQnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjVdKTtcblxuICAgICAgICAgICAgLy8gZmlyc3QgY29udmVydCBtb3ZlVG8oYmVsb25nIHRvIGxheW91dCBub2RlKSB0byB3b3JsZCBwb3NpdGlvbi5cbiAgICAgICAgICAgIHZhciBwcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobW92ZVRvKTtcblxuICAgICAgICAgICAgLy8gY29udmVydCB3b3JsZCBwb3N0aW9uIHRvIG15QnVsbGV0IHBvc2l0aW9uLlxuICAgICAgICAgICAgcHAgPSBteUJ1bGxldC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwcCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSA5MCAtIGJ1bGxldFJvdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSAoOTAgLSBidWxsZXRSb3QpKi0xOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdWJCdWxsZXQuc2V0UG9zaXRpb24ocHApO1xuICAgICAgICAgICAgbXlCdWxsZXQuYWRkQ2hpbGQoc3ViQnVsbGV0KTtcbiAgICAgICAgfSBcblxuICAgICAgICBlbHNlIGlmKG15QnVsbGV0LnJvbGUgPT0gXCJib21iXCIpIHtcbiAgICAgICAgICAgIHNjID0gdGhpcy5nZXRGaXJlQm9tYlNjYWxlKGJ1bGxldC5teXBvcywgYnVsbGV0LnRhcmdldHBvcywgbXlCdWxsZXQudGFyZ2V0RGlzLCBteUJ1bGxldC5zdGFydFBvcyk7XG4gICAgICAgICAgICBteUJ1bGxldC5zY2FsZVg9c2M7XG4gICAgICAgICAgICBteUJ1bGxldC5zY2FsZVk9c2M7XG4gICAgICAgICAgICBteUJ1bGxldC56SW5kZXggPSA5OTk5O1xuXG4gICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDtcbiAgICAgICAgICAgIG15QnVsbGV0LnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSo0MCktMTA7XG4gICAgICAgICAgICAgICAgdmFyIGZoID0gbXlCdWxsZXQuZ2V0Q2hpbGRCeU5hbWUoXCJmaXJlSGVhZFwiKTtcbiAgICAgICAgICAgICAgICAvL2ZoLnNrZXdZID0gcmFuZG9tVGltZTtcbiAgICAgICAgICAgICAgICAvL2ZoLnNrZXdYID0gcmFuZG9tVGltZTtcblxuICAgICAgICAgICAgICAgIC8vZmlyZSBib21iIHNpemUgY2hhbmdpbmcgYWNjb3JkaW5nIHRvIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRhcmdldCBhbmQgb3JpZ2luLlxuICAgICAgICAgICAgICAgIHNjID0gdGhpcy5nZXRGaXJlQm9tYlNjYWxlKGJ1bGxldC5teXBvcywgYnVsbGV0LnRhcmdldHBvcywgbXlCdWxsZXQudGFyZ2V0RGlzLCBteUJ1bGxldC5zdGFydFBvcyk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLm5vZGUuc2NhbGVYPXNjO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5ub2RlLnNjYWxlWT1zYztcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5zdHJva2UgKj0gc2M7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZihteUJ1bGxldC5yb2xlID09IFwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICAvKiBcbiAgICAgICAgICAgIC8vb2xkIHdpeiBmaXJlIGJhbGxcblxuICAgICAgICAgICAgbXlCdWxsZXQuekluZGV4ID0gOTk5OTtcbiAgICAgICAgICAgIC8vIHNoYWtlIGEgbGl0dGxlIGJpdFxuICAgICAgICAgICAgLy92YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjQwKS0xMDtcbiAgICAgICAgICAgIC8vYnVsbGV0Um90ICs9IHJhbmRvbVRpbWU7XG5cbiAgICAgICAgICAgIG15QnVsbGV0LmFuZ2xlID0gLTEqYnVsbGV0Um90OyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIG15QnVsbGV0LnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBzdWJCdWxsZXQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyNV0pO1xuXG4gICAgICAgICAgICAvLyBmaXJzdCBjb252ZXJ0IG1vdmVUbyhiZWxvbmcgdG8gbGF5b3V0IG5vZGUpIHRvIHdvcmxkIHBvc2l0aW9uLlxuICAgICAgICAgICAgdmFyIHBwID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtb3ZlVG8pO1xuXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHdvcmxkIHBvc3Rpb24gdG8gbXlCdWxsZXQgcG9zaXRpb24uXG4gICAgICAgICAgICBwcCA9IG15QnVsbGV0LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBwKTtcblxuICAgICAgICAgICAgLy9zdWJCdWxsZXQuc2V0UG9zaXRpb24ocHApO1xuICAgICAgICAgICAgLy9teUJ1bGxldC5hZGRDaGlsZChzdWJCdWxsZXQpO1xuXG4gICAgICAgICAgICBpZihteUJ1bGxldC5sYXN0cG9zICYmIG15QnVsbGV0Lmxhc3Rwb3Muc3ViKHBwKS5tYWcoKSA+IDUwKSB7XG4gICAgICAgICAgICAgICAgc3ViQnVsbGV0LnNldFBvc2l0aW9uKHBwKTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hZGRDaGlsZChzdWJCdWxsZXQpO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0Lmxhc3Rwb3MgPSBwcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIW15QnVsbGV0Lmxhc3Rwb3MpIHtcbiAgICAgICAgICAgICAgICBzdWJCdWxsZXQuc2V0UG9zaXRpb24ocHApO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LmFkZENoaWxkKHN1YkJ1bGxldCk7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQubGFzdHBvcyA9IHBwOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSAtMSpidWxsZXRSb3Q7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgbXlCdWxsZXQuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRGaXJlQm9tYlNjYWxlOiBmdW5jdGlvbihidWxsZXRQb3MsIHRhcmdldFBvcywgdGFyZ2V0RGlzLCBzdGFydFBvcykge1xuICAgICAgICB2YXIgeERpZiwgeURpZjtcbiAgICAgICAgdmFyIG1pZFBvcyA9IHt9O1xuICAgICAgICBtaWRQb3MueCA9IHN0YXJ0UG9zLnggKyAodGFyZ2V0UG9zLnggLSBzdGFydFBvcy54KS8yO1xuICAgICAgICBtaWRQb3MueSA9IHN0YXJ0UG9zLnkgKyAodGFyZ2V0UG9zLnkgLSBzdGFydFBvcy55KS8yO1xuICAgICAgICB2YXIgeERpZiA9IGJ1bGxldFBvcy54IC0gbWlkUG9zLng7XG4gICAgICAgIHZhciB5RGlmID0gYnVsbGV0UG9zLnkgLSBtaWRQb3MueTtcbiAgICAgICAgdmFyIGRpcyA9IE1hdGguc3FydCgoeERpZiAqIHhEaWYpICsgKHlEaWYgKiB5RGlmKSk7XG4gICAgICAgIHZhciB0YXJnZXREaXMgPSB0YXJnZXREaXMgKiAwLjU7XG5cbiAgICAgICAgcmV0dXJuICh0YXJnZXREaXMtZGlzKSowLjcvdGFyZ2V0RGlzKzAuNTsgICAvL3NjYWxlIGZyb20gMC41IC0tIDEuMlxuICAgIH0sXG5cbiAgICBlbmVtZXlEaXN0YW5jZTpmdW5jdGlvbihweCxweSxleCxleSkge1xuICAgICAgICB2YXIgeERpZiwgeURpZiwgZGlzO1xuICAgICAgICB4RGlmID0gcHggLSBleDtcbiAgICAgICAgeURpZiA9IHB5IC0gZXk7XG4gICAgICAgIGRpcyA9IE1hdGguc3FydCgoeERpZiAqIHhEaWYpICsgKHlEaWYgKiB5RGlmKSk7XG4gICAgICAgIHJldHVybiBkaXM7XG4gICAgfSxcblxuICAgIGdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaikge1xuICAgICAgICB2YXIgcm9sZSA9IGFnZW50T2JqLnJvbGU7XG4gICAgICAgIGlmKHJvbGUgPT0gXCJza2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnU2tlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiaXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnU2tlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0JlZVNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcIndpelwiKSB7XG4vL3JldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ1dpelNwcml0ZScpO1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnTkZUQXJjaGVyU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnSGVyb1Nwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImxtXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0xpZ2h0bWFuU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwibHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQXJjU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiZ2lcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnR2lhbnRTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJidWxsZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQXJyb3cnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJib21iXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0JvbWJTY3JpcHQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJsb2dcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnTG9nU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiZ3VuXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0d1blNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImJhc2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQmFzZVNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImZhXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0Jhc2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRLaWxsZWRFbmVtaWVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFpZHMgPSB0aGlzLnJlbW92ZWROcGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAgdmFyIGFpZDtcbiAgICAgICAgdmFyIGtpbGxlZEVuZW1pZXMgPSBbXTtcbiAgICAgICAgLy93aGVuIG9uZSBhdHRhY2sgY2F1c2UgbXVsdGkga2lsbHMgb2NjdXJlZCBpbiBvbmUgZnJhbWUsIG11bHRpIGVuZW1pZXMgbXVzdCBiZSBoYW5kbGVkLiBcbiAgICAgICAgZm9yKHZhciBpPTA7aTxhaWRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFpZCA9IGFpZHNbaV07XG4gICAgICAgICAgICBraWxsZWRFbmVtaWVzLnB1c2godGhpcy5yZW1vdmVkTnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2lsbGVkRW5lbWllcztcbiAgICB9LFxuXG4gICAgZ2V0RnV0dXJlQWdlbnQ6IGZ1bmN0aW9uKGFpZCwgYWdlbnRzRnV0dXJlKSB7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWdlbnRzRnV0dXJlLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGlmKGFnZW50c0Z1dHVyZVtpXS5haWQgPT0gYWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFnZW50c0Z1dHVyZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgYmxvb2RGb3JBZ2VudDogZnVuY3Rpb24gKGFnZW50KSB7XG4gICAgICAgIHZhciBibG9vZE9iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzExXSk7XG4gICAgICAgIHZhciBibG9vZE9wID0gYmxvb2RPYmouZ2V0Q29tcG9uZW50KFwiQmxvb2RCYXJcIik7XG4gICAgICAgIGJsb29kT3Auc2V0QmFyTGV2ZWwoYWdlbnQubGV2ZWwpO1xuXG4gICAgICAgIGJsb29kT2JqLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBhZ2VudC5hZGRDaGlsZChibG9vZE9iaik7XG4gICAgICAgIHJldHVybiBibG9vZE9iajtcbiAgICB9LFxuXG4gICAgc2hhZG93Rm9yQWdlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNoYWRvd09iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzJdKTtcbiAgICAgICAgc2hhZG93T2JqLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoc2hhZG93T2JqKTtcbiAgICAgICAgcmV0dXJuIHNoYWRvd09iajtcbiAgICB9LFxuXG4gICAgc2hhZG93Rm9yTG9nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaGFkb3dPYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyXSk7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG5cbiAgICAgICAgc2hhZG93T2JqLnNjYWxlWCA9IDE7XG4gICAgICAgIHNoYWRvd09iai5zYWNsZVkgPSAxO1xuICAgICAgICBzaGFkb3dPYmouYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzaGFkb3dPYmopO1xuICAgICAgICByZXR1cm4gc2hhZG93T2JqO1xuICAgIH0sXG5cbiAgICBzZXRDbGlja0l0ZW06IGZ1bmN0aW9uIChzZWxlY3QpIHtcbiAgICAgICAgdGhpcy5jbGlja1NlbGUgPSBzZWxlY3Q7XG4gICAgfSxcblxuICAgIHB1dENsaWNrSXRlbTogZnVuY3Rpb24gKHNlbENhcmQsIG5vZGUsIHB0KSB7XG4gICAgICAgIHZhciBwdXROb2RlID0gY2MuaW5zdGFudGlhdGUobm9kZSk7XG4gICAgICAgIHZhciBpbm5lcklkID0gdGhpcy5uaWNrICtcIl9cIisgTnVtYmVyKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIHB1dE5vZGUueCA9IHB0Lng7XG4gICAgICAgIHB1dE5vZGUueSA9IHB0Lnk7XG4gICAgICAgIHB1dE5vZGUubmFtZSA9IGlubmVySWQ7XG4gICAgICAgIHB1dE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2VsQ2FyZC5hZGRDaGlsZChwdXROb2RlKTtcblxuICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBwdXROb2RlO1xuXG4gICAgICAgIHJldHVybiBpbm5lcklkO1xuICAgIH0sXG5cbiAgICBzZXREcmFnSXRlbTogZnVuY3Rpb24gKHBhcmFtcywgbm9kZSkge1xuICAgICAgICB2YXIgY2FyZCA9IHBhcmFtcy50YXJnZXQ7XG4gICAgICAgIHZhciBkcmFnTm9kZSA9IGNjLmluc3RhbnRpYXRlKG5vZGUpO1xuICAgICAgICB2YXIgaW5uZXJJZCA9IHRoaXMubmljayArXCJfXCIrIE51bWJlcihuZXcgRGF0ZSgpKTtcblxuICAgICAgICBub2RlLnggPSAwO1xuICAgICAgICBub2RlLnkgPSAwO1xuICAgICAgICBkcmFnTm9kZS5uYW1lID0gaW5uZXJJZDtcbiAgICAgICAgZHJhZ05vZGUuYWN0dmllID0gdHJ1ZTtcbiAgICAgICAgY2FyZC5hZGRDaGlsZChkcmFnTm9kZSk7XG5cbiAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gZHJhZ05vZGU7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdJdGVtID0gaW5uZXJJZDtcblxuICAgICAgICByZXR1cm4gaW5uZXJJZDtcbiAgICB9LFxuXG4gICAgdW5zZXREcmFnSXRlbTogZnVuY3Rpb24gKGlubmVySWQpIHtcbiAgICAgICAgdGhpcy51bnNob3dEcmFnTWFzaygpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nSXRlbSA9IFwiXCI7XG4gICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IG51bGw7ICAgICBcbiAgICB9LFxuXG4gICAgbW92ZURyYWdJdGVtOiBmdW5jdGlvbihzZWwsIGRlbHRhKSB7XG4gICAgICAgIGlmKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0pIHtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS55ICs9IGRlbHRhLnk7ICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueSA8IDApIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbGVhckRyYWdJdGVtOiBmdW5jdGlvbihwYXJhbSwgc2VsZWN0KSB7XG4gICAgICAgIHZhciBpbm5lcklkO1xuICAgICAgICB2YXIgY2FyZCA9IHBhcmFtLnRhcmdldDtcbiAgICAgICAgdmFyIHNlbCA9IGNhcmQuX25hbWU7XG4gICAgICAgIHZhciBwdD17fTtcbiAgICAgICAgdmFyIGxheW91dFB0ID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICB2YXIgeU9mZnNldD0wO1xuICAgICAgICB2YXIgbWFnaWNDb3N0ID0gc2VsZWN0Lm1hZ2ljQ29zdDtcbiAgICAgICAgdmFyIGxldmVsID0gc2VsZWN0LmxldmVsO1xuICAgICAgICB2YXIgcm9sZSA9IHNlbGVjdC5yb2xlO1xuXG5jb25zb2xlLmxvZyhcInJvbGU6XCIgKyByb2xlKTtcblxuICAgICAgICB0aGlzLnVuc2hvd0RyYWdNYXNrKCk7XG5cbiAgICAgICAgaWYodGhpcy5tYWluUGxheWVyPT0xKSB7XG4gICAgICAgICAgICB5T2Zmc2V0PS01MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlPZmZzZXQ9MjA7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dKSB7XG4gICAgICAgICAgICBpbm5lcklkID0gdGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS5uYW1lO1xuXG4gICAgICAgICAgICAvL2xheW91dCBtYXliZSBzY2FsZWQgYWNjb3JkaW5nIHRvIGRldmljZXMuXG4gICAgICAgICAgICBwdC54ID0gKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueCtjYXJkLngtbGF5b3V0UHQueCkvdGhpcy5ub2RlLnNjYWxlWDtcbiAgICAgICAgICAgIHB0LnkgPSAodGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS55K2NhcmQueS1sYXlvdXRQdC55K3lPZmZzZXQpL3RoaXMubm9kZS5zY2FsZVk7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWRQdXRQb2ludChwdCkgJiYgIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCBwb3N0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXRFcnJvck1zZygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZW5kU29kaWVyKG1hZ2ljQ29zdCwgcm9sZSwgcHQsIGlubmVySWQsIGxldmVsKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdJdGVtID0gXCJcIjtcbiAgICAgICAgfSBcbiAgICB9LFxuXG4gICAgc2VuZFNvZGllcjogZnVuY3Rpb24obWFnaWNDb3N0LCByb2xlLCBwdCwgaW5uZXJJZCwgbGV2ZWwpIHtcbiAgICAgICAgLy92YXIgaW5uZXJJZCA9IHRoaXMubmljayArXCJfXCIrIE51bWJlcihuZXcgRGF0ZSgpKTtcbiAgICAgICAgdmFyIGlzSGVybyA9ICh0aGlzLm1haW5QbGF5ZXI9PTEpO1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwibWFnaWNCYXJcIik7XG4gICAgICAgIHZhciBqdWljZSA9IGJhci5nZXRDaGlsZEJ5TmFtZShcImp1aWNlXCIpO1xuICAgICAgICB2YXIgY29zdCA9IHRoaXMudXNlTWFnaWMobWFnaWNDb3N0KTtcblxuICAgICAgICB0aGlzLnBsYXlTbmQoXCJwdXQxXCIpO1xuXG4gICAgICAgIGlmKGNvc3QpIHtcbiAgICAgICAgICAgIGp1aWNlLndpZHRoID0gY29zdDtcbiAgICAgICAgICAgIE1ZX1NPQ0tFVC5qc29uLmVtaXQoJ2NtZCcsIHsnaXNIZXJvJzppc0hlcm8sICdyb29tSWQnOiB0aGlzLnJvb21JZCwgJ2lubmVySWQnOiBpbm5lcklkLCAncm9sZSc6IHJvbGUsICdwdCc6cHQsICdsZXZlbCc6bGV2ZWx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBudWxsOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldE1hZ2ljQmFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hZ2ljQmFyXCIpO1xuICAgICAgICB2YXIganVpY2UgPSBiYXIuZ2V0Q2hpbGRCeU5hbWUoXCJqdWljZVwiKTtcblxuICAgICAgICBpZihqdWljZS53aWR0aDw2MDApIHtcbiAgICAgICAgICAgIGp1aWNlLndpZHRoKz10aGlzLmFkZEp1aWNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoanVpY2Uud2lkdGglNTAgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYWdpY0Ftb3VudCA9IGp1aWNlLndpZHRoLzUwO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDYXJkU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXNlTWFnaWM6IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwibWFnaWNCYXJcIik7XG4gICAgICAgIHZhciBqdWljZSA9IGJhci5nZXRDaGlsZEJ5TmFtZShcImp1aWNlXCIpO1xuICAgICAgICB2YXIgYWZ0ZXJVc2UgPSBqdWljZS53aWR0aC1hbW91bnQqNTA7XG5cbiAgICAgICAgaWYoYWZ0ZXJVc2U+PTApIHtcbiAgICAgICAgICAgIHJldHVybiBhZnRlclVzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNhcmRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGVhZCA9IFwic2VsXCI7XG4gICAgICAgIHZhciBub2RlTmFtZSwgc2VsTm9kZTtcbiAgICAgICAgdmFyIHNlbFNwcml0ZSA9IG51bGw7XG5cbiAgICAgICAgZm9yKHZhciBpPTE7aTw9NztpKyspIHtcbiAgICAgICAgICAgIG5vZGVOYW1lID0gaGVhZCArIGk7XG4gICAgICAgICAgICBzZWxOb2RlID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKG5vZGVOYW1lKTtcbiAgICAgICAgICAgIGlmKHNlbE5vZGUpIHtcbiAgICAgICAgICAgICAgICBzZWxTcHJpdGUgPSBzZWxOb2RlLmdldENvbXBvbmVudCgnU2VsQ2FyZCcpO1xuICAgICAgICAgICAgICAgIGlmKHNlbFNwcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxTcHJpdGUubWFnaWNDb3N0IDw9IHRoaXMubWFnaWNBbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbE5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LDI1NSwyNTUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsTm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMjcsMTI3LDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=