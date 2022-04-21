
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
      //old wiz fire ball
      myBullet.zIndex = 9999; // shake a little bit
      //var randomTime = Math.ceil(Math.random()*40)-10;
      //bulletRot += randomTime;

      myBullet.angle = -1 * bulletRot;
      myBullet.setPosition(moveTo);
      /*
                  //continues fire effect
                  subBullet = cc.instantiate(this.playerPrefab[25]);
      
                  // first convert moveTo(belong to layout node) to world position.
                  var pp = this.node.convertToWorldSpaceAR(moveTo);
      
                  // convert world postion to myBullet position.
                  pp = myBullet.convertToNodeSpaceAR(pp);
      
                  //subBullet.setPosition(pp);
                  //myBullet.addChild(subBullet);
      
                  if(myBullet.lastpos && myBullet.lastpos.sub(pp).mag() > 50) {
                      subBullet.setPosition(pp);
                      myBullet.addChild(subBullet);
                      myBullet.lastpos = pp;
                  }
      
                  if(!myBullet.lastpos) {
                      subBullet.setPosition(pp);
                      myBullet.addChild(subBullet);
                      myBullet.lastpos = pp;                    
                  }
      */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVQcm92aWRlci5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJpbkFycmF5IiwiYXJyIiwiY29uc29sZSIsImxvZyIsImkiLCJrIiwibGVuZ3RoIiwiQXJyYXkiLCJyZW1vdmVCeVZhbHVlIiwidmFsIiwic3BsaWNlIiwibWludXMiLCJyZXN1bHQiLCJvYmoiLCJqIiwicHVzaCIsImNvbW1vbiIsInJlcXVpcmUiLCJzb2NrZXRQcm92aWRlciIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYmNudCIsImhpZGVEcmFnSXRlbSIsImlubmVySWQiLCJwdXRTZWxlIiwiZGVzdHJveSIsImNyZWF0ZUJ1ZmYiLCJidWZmIiwibXlCdWZmIiwicHgiLCJweSIsImNhbnZhc05vZGUiLCJub2RlIiwicGFyZW50IiwidHlwZUlkIiwicGxheVNuZCIsImluc3RhbnRpYXRlIiwicGxheWVyUHJlZmFiIiwiZGlzcENoYXJTZWxlIiwiY2xpY2tTZWxlIiwibXlwb3MiLCJ4IiwieSIsIm1vdmVUbyIsInYyIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsImNyZWF0ZUFnZW50cyIsImFnZW50cyIsImFpZCIsIm15QWdlbnQiLCJhZ2VudCIsImFnZW50Tm9kZSIsImVvIiwibnBjSW5mbyIsIm9iamVjdEZvcktleSIsInJvbGUiLCJuYW1lIiwidHlwZSIsImFjdGl2ZSIsInNpemUiLCJsZXZlbCIsImdldENvbXBvbmVudEJ5Um9sZSIsImluaXQiLCJzZXRJZCIsInNldFNoYWRvdyIsInNoYWRvd0ZvckFnZW50Iiwic2V0VG90YWxMaWZlIiwibGlmZSIsInNldEJsb29kIiwiYmxvb2RGb3JBZ2VudCIsIm1haW5QbGF5ZXIiLCJyb3QiLCJ1cGRhdGVQb3MiLCJzZXRPYmplY3QiLCJjcmVhdGVCdWxsZXRzIiwiYnVsbGV0cyIsIm15QnVsbGV0IiwiYnVsbGV0IiwiZURpcyIsInN0YXJ0UG9zIiwiZW5lbWV5RGlzdGFuY2UiLCJ0YXJnZXRwb3MiLCJ0YXJnZXREaXMiLCJ1cGRvd24iLCJ6SW5kZXgiLCJidWxsZXRSb3QiLCJhbmdsZSIsImNyZWF0ZUJhc2VzIiwiYmFzZXMiLCJiYXNlTmFtZSIsImJhc2VOb2RlIiwib2JqZWN0SWQiLCJiYXNlT2JqIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJzZXRMaWZlIiwiY3JlYXRlTG9ncyIsImxvZ3MiLCJzaGFkb3dGb3JMb2ciLCJtb3ZlIiwiY3JlYXRlRm9ydHMiLCJmb3J0cyIsInpvcmRlciIsInNwTmFtZSIsInBhcnNlSW50Iiwic2V0WkluZGV4IiwiYWdlbnRQcm9jZXNzIiwicmVtb3RlQWdlbnRzIiwibG9jYWxBZ2VudHMiLCJraWxsQWdlbnRzIiwiYWdlbnRPYmoiLCJhZ2VudElkIiwiYWxsS2V5cyIsInJlbW92ZSIsInJlbW92ZWROcGNJbmZvIiwicmVtb3ZlT2JqZWN0Rm9yS2V5IiwiYmFzZVByb2Nlc3MiLCJyZW1vdGVCYXNlcyIsImtpbGxCYXNlcyIsImVuZW15QmFzZXMiLCJ3YXJyaW9yTmFtZSIsIndhcnJpb3JPYmoiLCJfZGVmYXVsdEJhc2VzIiwiZGlzcExheW91dE1hc2siLCJyZW1vdmVDaGlsZCIsInBsYXlFZmZlY3QiLCJwbHVzQmFzZUtpbGxOdW0iLCJlbmVteW51bSIsIm15bnVtIiwic3RyaW5nIiwiZGlyIiwiYmQiLCJ1bmRpc3BsYXlNYXNrIiwic2VsIiwia2lsbEVuZW15QmFzZXMiLCJfc2VsZiIsInNob3dNYXNrIiwic2hvd0RyYWdNYXNrIiwiaWZOb3RNYXNrUm9sZSIsIm1hc2tUeXBlIiwidW5zaG93RHJhZ01hc2siLCJkZWxheSIsInNjaGVkdWxlT25jZSIsInB1dEVycm9yTXNnIiwidW5kaXNwbGF5UHV0RXJyIiwiZm9ydFByb2Nlc3MiLCJmb3J0c0Z1dHVyZSIsImxvZ1Byb2Nlc3MiLCJidWxsZXRQcm9jZXNzIiwicmVtb3RlQnVsbGV0cyIsImxvY2FsQnVsbGV0cyIsImtpbGxCdWxsZXRzIiwic3RhcnRTY2VuZUppdHRlciIsInNjZW5lTm9kZSIsIm94Iiwib3kiLCJjbnQiLCJsb3dlciIsInVwcGVyIiwiY2FsbEJhY2siLCJyYW5kb21YIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tWSIsInN0b3BBbGxBY3Rpb25zIiwiZGVsIiwiZGVsYXlUaW1lIiwiY2FsIiwiY2FsbEZ1bmMiLCJzZXEiLCJzZXF1ZW5jZSIsInJ1bkFjdGlvbiIsInJlcGVhdEZvcmV2ZXIiLCJwbGF5QmFzZXMiLCJraW5nTm9kZSIsImtpbmdBcnJvdyIsIndhcnJpb3IiLCJhY3RUeXBlIiwiYXR0YWNrRHVyYSIsIm5vdyIsInRtcEIiLCJlb0RlYWQiLCJwbGF5QmFzZVdhcnJpb3JBbmltYXRpb25EZWZhdWx0IiwicGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uIiwicGxheUFnZW50cyIsImFnZW50c0Z1dHVyZSIsInBsYXlBbmkiLCJnZXRGdXR1cmVBZ2VudCIsInNldEdyb3VwS2lsbCIsImdyb3VwS2lsbCIsInJvdW5kIiwicGxheUZvcnRzIiwicGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdCIsImlzSGVybyIsInBsYXlMb2dzIiwic2MiLCJwbGF5QnVsbGV0cyIsInN1YkJ1bGxldCIsInNob3dCdWxsZXQiLCJwcCIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiZ2V0RmlyZUJvbWJTY2FsZSIsInNjYWxlWCIsInNjYWxlWSIsImJ1bGxldFBvcyIsInRhcmdldFBvcyIsInhEaWYiLCJ5RGlmIiwibWlkUG9zIiwiZGlzIiwic3FydCIsImV4IiwiZXkiLCJnZXRLaWxsZWRFbmVtaWVzIiwiYWlkcyIsImtpbGxlZEVuZW1pZXMiLCJibG9vZE9iaiIsImJsb29kT3AiLCJzZXRCYXJMZXZlbCIsInNoYWRvd09iaiIsInNhY2xlWSIsInNldENsaWNrSXRlbSIsInNlbGVjdCIsInB1dENsaWNrSXRlbSIsInNlbENhcmQiLCJwdCIsInB1dE5vZGUiLCJuaWNrIiwiTnVtYmVyIiwiRGF0ZSIsInNldERyYWdJdGVtIiwicGFyYW1zIiwiY2FyZCIsInRhcmdldCIsImRyYWdOb2RlIiwiYWN0dmllIiwiZHJhZ2dpbmdJdGVtIiwidW5zZXREcmFnSXRlbSIsIm1vdmVEcmFnSXRlbSIsImRlbHRhIiwiY2xlYXJEcmFnSXRlbSIsInBhcmFtIiwiX25hbWUiLCJsYXlvdXRQdCIsInBvc2l0aW9uIiwieU9mZnNldCIsIm1hZ2ljQ29zdCIsImlzVmFsaWRQdXRQb2ludCIsInNlbmRTb2RpZXIiLCJiYXIiLCJqdWljZSIsImNvc3QiLCJ1c2VNYWdpYyIsIndpZHRoIiwiTVlfU09DS0VUIiwianNvbiIsImVtaXQiLCJyb29tSWQiLCJzZXRNYWdpY0JhciIsImFkZEp1aWNlIiwibWFnaWNBbW91bnQiLCJ1cGRhdGVDYXJkU3RhdHVzIiwiYW1vdW50IiwiYWZ0ZXJVc2UiLCJoZWFkIiwibm9kZU5hbWUiLCJzZWxOb2RlIiwic2VsU3ByaXRlIiwiY29sb3IiLCJDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE9BQWpCLEdBQTJCLFVBQVNDLEdBQVQsRUFBYztBQUNyQztBQUNBLE1BQUcsQ0FBQ0EsR0FBSixFQUFRO0FBQ0xDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaO0FBQ0YsR0FKb0MsQ0FLckM7OztBQUNBLE9BQUksSUFBSUMsQ0FBQyxHQUFDLENBQU4sRUFBUUMsQ0FBQyxHQUFDSixHQUFHLENBQUNLLE1BQWxCLEVBQXlCRixDQUFDLEdBQUNDLENBQTNCLEVBQTZCRCxDQUFDLEVBQTlCLEVBQWtDO0FBQzlCLFFBQUcsUUFBTUgsR0FBRyxDQUFDRyxDQUFELENBQVosRUFBaUI7QUFDYixhQUFPLElBQVA7QUFDSDtBQUNKLEdBVm9DLENBV3JDOzs7QUFDQSxTQUFPLEtBQVA7QUFDSCxDQWJEOztBQWVBRyxLQUFLLENBQUNSLFNBQU4sQ0FBZ0JTLGFBQWhCLEdBQWdDLFVBQVNDLEdBQVQsRUFBYztBQUMxQyxPQUFJLElBQUlMLENB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QSxPQUFPLENBQUNFLEtBQVIsR0FBZ0IsSUFBSTdQLEVBQUUsQ0FBQzhQLEtBQVAsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLENBQWhCO0FBQ0gsV0FGRCxNQUVPO0FBQ0hILFlBQUFBLE9BQU8sQ0FBQ0UsS0FBUixHQUFnQixJQUFJN1AsRUFBRSxDQUFDOFAsS0FBUCxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBaEI7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBL3BDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyDlrprkuYnkuIDkuKrliKTmlq3lh73mlbBcblN0cmluZy5wcm90b3R5cGUuaW5BcnJheSA9IGZ1bmN0aW9uKGFycikge1xuICAgIC8vIOS4jeaYr+aVsOe7hOWImeaKm+WHuuW8guW4uFxuICAgIGlmKCFhcnIpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiRVJSKGluX2FycmF5KTpJbnB1dCBpcyBub3QgYW4gYXJyYXlcIik7XG4gICAgfVxuICAgIC8vIOmBjeWOhuaYr+WQpuWcqOaVsOe7hOS4rVxuICAgIGZvcih2YXIgaT0wLGs9YXJyLmxlbmd0aDtpPGs7aSsrKSB7XG4gICAgICAgIGlmKHRoaXM9PWFycltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g5aaC5p6c5LiN5Zyo5pWw57uE5Lit5bCx5Lya6L+U5ZueZmFsc2VcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5BcnJheS5wcm90b3R5cGUucmVtb3ZlQnlWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIGZvcih2YXIgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGlmKHRoaXNbaV0gPT0gdmFsKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuQXJyYXkucHJvdG90eXBlLm1pbnVzID0gZnVuY3Rpb24gKGFycikge1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb2JqW2FycltpXV0gPSAxO1xuICAgIH1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKCFvYmpbdGhpc1tqXV0pXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9ialt0aGlzW2pdXSA9IDE7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2pdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG52YXIgc29ja2V0UHJvdmlkZXIgPSByZXF1aXJlKFwiU29ja2V0UHJvdmlkZXJcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBzb2NrZXRQcm92aWRlcixcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYmNudDowXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgLy8gc3RhcnQgKCkge30sXG5cbiAgICBoaWRlRHJhZ0l0ZW06ZnVuY3Rpb24gKGlubmVySWQpIHtcbiAgICAgICAgaWYodGhpcy5wdXRTZWxlW2lubmVySWRdKSB7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVCdWZmOmZ1bmN0aW9uKGJ1ZmYpIHtcbiAgICAgICAgdmFyIG15QnVmZixweCxweTtcbiAgICAgICAgdmFyIGNhbnZhc05vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xuXG4gICAgICAgIGlmKGJ1ZmYudHlwZUlkID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNuZChcInRodW5kZXJcIik7XG4gICAgICAgICAgICBteUJ1ZmYgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyM10pO1xuICAgICAgICAgICAgLy9jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwiYnVmZlRodW5kZXJcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihidWZmLnR5cGVJZCA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJoZWFsXCIpO1xuICAgICAgICAgICAgbXlCdWZmID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjRdKTtcbiAgICAgICAgICAgIC8vY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1ZmZIZWFsXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL2hpZGUgc2VsZWN0IGZyYW1lXG4gICAgICAgIHRoaXMuZGlzcENoYXJTZWxlKCk7XG5cbiAgICAgICAgLy9yZW1vdmUgYnVmZiBpY29uXG4gICAgICAgIGlmKHRoaXMucHV0U2VsZVtidWZmLmlubmVySWRdKSB7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbYnVmZi5pbm5lcklkXS5wYXJlbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9oaWRlIGRyYWcgaXRlbSBkaXNwXG4gICAgICAgIC8vdGhpcy5oaWRlRHJhZ0l0ZW0oYnVmZi5pbm5lcklkKTtcblxuICAgICAgICB0aGlzLmNsaWNrU2VsZSA9IHt9O1xuXG4gICAgICAgIC8vdG9kbyAzOFxuICAgICAgICBweCA9IChidWZmLm15cG9zLngpKjM4O1xuICAgICAgICBweSA9IChidWZmLm15cG9zLnkpKjM4O1xuXG4gICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICBteUJ1ZmYuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobXlCdWZmKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlQWdlbnRzOmZ1bmN0aW9uKGFnZW50cykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYWdlbnROb2RlO1xuICAgICAgICB2YXIgcHgscHksZW87XG4gICAgICAgIC8vdmFyIG5vZGVsaXN0ID0gY2MuZmluZChcIkNhbnZhcy9sYXlvdXRcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2cobm9kZWxpc3QpO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWdlbnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYWdlbnRzW2ldO1xuXG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICAvL3B4ID0gKGFnZW50Lm15cG9zLngpKjM4O1xuICAgICAgICAgICAgLy9weSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYWdlbnQuaW5uZXJJZCk7XG5cbiAgICAgICAgICAgICAgICBpZihhZ2VudC5yb2xlID09IFwic2tlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzBdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImlyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzIwXSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJiZWVcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTZdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcIndpelwiKSB7XG4vL215QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxN10pO1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjZdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTJdKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImxtXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzE0XSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJsclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlszXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImdpXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzRdKTsgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiYWdlbnRcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuICAgICAgICAgICAgICAgIG15QWdlbnQubGV2ZWwgPSBhZ2VudC5sZXZlbDtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldElkKGFpZCk7XG5cbiAgICAgICAgICAgICAgICAvL3NoYWRvdyBzaG91bGQgc2V0IGluIGxheW91dCwgYmVjYXVzZSBpdHMgemluZGV4IHNob3VsZCBiZSBsb3dlciB0aGFuIGFueSBhZ2VudHMuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFNoYWRvdyh0aGlzLnNoYWRvd0ZvckFnZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFRvdGFsTGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0Qmxvb2QodGhpcy5ibG9vZEZvckFnZW50KG15QWdlbnQpKTtcblxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdCBwb3MgaXMgaW4gc291dGgsIGZhY2UgdG8gbm9ydGgsIG90aGVyd2lzZS4uLi5cbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAxODA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQucm90ID0gMDsgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuY29uc29sZS5sb2coXCItLXJlYyBwdC0tXCIpO1xuY29uc29sZS5sb2coYWdlbnQubXlwb3MueCArXCI6OjpcIisgYWdlbnQubXlwb3MueSk7XG5cbiAgICAgICAgICAgICAgICBweCA9IChhZ2VudC5teXBvcy54KSozODtcbiAgICAgICAgICAgICAgICBweSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS51cGRhdGVQb3MocHgsIHB5KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUFnZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QWdlbnQsIGFpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlQnVsbGV0czpmdW5jdGlvbihidWxsZXRzKSB7XG4gICAgICAgIHZhciBhaWQsbXlCdWxsZXQsYnVsbGV0LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5LGVvLGVEaXM7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxidWxsZXRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGJ1bGxldCA9IGJ1bGxldHNbaV07XG4gICAgICAgICAgICBhaWQgPSBidWxsZXQuYWlkO1xuICAgICAgICAgICAgbXlCdWxsZXQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFpZCk7XG5cbiAgICAgICAgICAgIGlmKG15QnVsbGV0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZihidWxsZXQucm9sZT09XCJidWxsZXRcIikge1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zdGFydFBvcyA9IGJ1bGxldC5teXBvcztcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYnVsbGV0LnJvbGU9PVwiYm9tYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm9tYiBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJmaXJlU2VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYnVsbGV0LmlubmVySWQpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzVdKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIGVEaXMgPSB0aGlzLmVuZW1leURpc3RhbmNlKGJ1bGxldC5teXBvcy54LCBidWxsZXQubXlwb3MueSwgYnVsbGV0LnRhcmdldHBvcy54LCBidWxsZXQudGFyZ2V0cG9zLnkpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zdGFydFBvcyA9IGJ1bGxldC5teXBvcztcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQudGFyZ2V0RGlzID0gZURpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihidWxsZXQucm9sZT09XCJ0YW1hXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwiZ3VuXCIpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzldKTtcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuc3RhcnRQb3MgPSBidWxsZXQubXlwb3M7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGJ1bGxldC5yb2xlPT1cIndpemZpcmVcIikge1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzE4XSk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnN0YXJ0UG9zID0gYnVsbGV0Lm15cG9zO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IsIG5vIGJ1bGxldCB0eXBlLlwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBteUJ1bGxldC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LnR5cGUgPSBcImJ1bGxldFwiO1xuICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5yb2xlID0gYnVsbGV0LnJvbGU7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQudXBkb3duID0gYnVsbGV0LnVwZG93bjtcblxuICAgICAgICAgICAgICAgIG15QnVsbGV0LnpJbmRleCA9IDk5OTk7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUJ1bGxldCk7XG5cbiAgICAgICAgICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUJ1bGxldCk7XG5cbiAgICAgICAgICAgICAgICAvL3B4ID0gLTEwMDA7XG4gICAgICAgICAgICAgICAgLy9weSA9IC0xMDAwO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHB4ID0gNTA7XG4gICAgICAgICAgICAgICAgcHkgPSA1MDtcblxuXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0Um90ID0gYnVsbGV0LnJvdDtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBidWxsZXRSb3QgKz0gMTgwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vc2luY2UgMi4xLjEgc2V0Um90YXRpb24gaXMgZGVzcGVyYXRlZC5cbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDtcbiAgICAgICAgICAgICAgICAvL215QnVsbGV0LnNldFJvdGF0aW9uKGJ1bGxldFJvdCk7ICAvL2J1bGxldC5yb3QrMTgwXG5cbiAgICAgICAgICAgICAgICBteUJ1bGxldC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUJ1bGxldCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVCYXNlczpmdW5jdGlvbihiYXNlcykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYmFzZU5hbWUsYmFzZU5vZGU7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxiYXNlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGJhc2VzW2ldO1xuICAgICAgICAgICAgYWlkID0gYWdlbnQuYWlkO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbXlBZ2VudCA9IHt9O1xuICAgICAgICAgICAgICAgIG15QWdlbnQubmFtZSA9IGFpZDtcbiAgICAgICAgICAgICAgICBteUFnZW50LnR5cGUgPSBcImJhc2VcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50Lm15cG9zID0gYWdlbnQubXlwb3M7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5zaXplID0gYWdlbnQuc2l6ZTtcblxuICAgICAgICAgICAgICAgIGJhc2VOYW1lID0gXCJiYXNlXCIrIGFnZW50Lm9iamVjdElkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYmFzZU9iaiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShiYXNlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBiYXNlTm9kZSA9IG15QWdlbnQuYmFzZU9iai5nZXRDb21wb25lbnQoXCJCYXNlU3ByaXRlXCIpO1xuICAgICAgICAgICAgICAgIGJhc2VOb2RlLnNldFRvdGFsTGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBiYXNlTm9kZS5zZXRCbG9vZCh0aGlzLmJsb29kRm9yQWdlbnQobXlBZ2VudC5iYXNlT2JqKSk7XG4gICAgICAgICAgICAgICAgYmFzZU5vZGUuc2V0TGlmZShhZ2VudC5saWZlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5zZXRPYmplY3QobXlBZ2VudCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVMb2dzOmZ1bmN0aW9uKGxvZ3MpIHtcbiAgICAgICAgdmFyIGFpZCxteUFnZW50LGFnZW50LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5O1xuXG4gICAgICAgIC8vdGhpcy5wbGF5U25kKFwibG9nXCIpO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bG9ncy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGxvZ3NbaV07XG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG5cbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFpZCk7XG5cbiAgICAgICAgICAgIC8vdG9kbyAzOFxuICAgICAgICAgICAgcHggPSAoYWdlbnQubXlwb3MueCkqMzg7XG4gICAgICAgICAgICBweSA9IChhZ2VudC5teXBvcy55KSozODtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhZ0l0ZW0oYWdlbnQuaW5uZXJJZCk7XG5cbiAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbOF0pO1xuICAgICAgICAgICAgICAgIG15QWdlbnQubmFtZSA9IGFpZDtcbiAgICAgICAgICAgICAgICBteUFnZW50LnR5cGUgPSBcImxvZ1wiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldElkKGFpZCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFNoYWRvdyh0aGlzLnNoYWRvd0ZvckxvZygpKTtcblxuICAgICAgICAgICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5tb3ZlKG1vdmVUbyk7XG5cbiAgICAgICAgICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUFnZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJsb2dcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QWdlbnQsIGFpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlRm9ydHM6ZnVuY3Rpb24oZm9ydHMpIHtcbiAgICAgICAgdmFyIGFpZCxteUFnZW50LGFnZW50LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5LGVvLHpvcmRlcjtcblxuICAgICAgICAvL3ZhciBub2RlbGlzdCA9IGNjLmZpbmQoXCJDYW52YXMvbGF5b3V0XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5vZGVsaXN0KTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGZvcnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gZm9ydHNbaV07XG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICAvL3RvZG8gMzhcbiAgICAgICAgICAgIHB4ID0gKGFnZW50Lm15cG9zLngpKjM4O1xuICAgICAgICAgICAgcHkgPSAoYWdlbnQubXlwb3MueSkqMzg7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyYWdJdGVtKGFnZW50LmlubmVySWQpO1xuXG4gICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzddKTsgICAgXG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiZmFcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNwTmFtZSA9IFwiRm9ydEFTcHJpdGVcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuXG4gICAgICAgICAgICAgICAgLy8xMDAwOmFnZW50LCA5OTk6YnVsbGV0IDk5ODp0aGlzO1xuICAgICAgICAgICAgICAgIC8vZm9ydCBiYXNlIGFuY2hvclkgaXMgbWlkZGxlLCBzbyB5LTIgaXMgbmVzc2VzYXJ5LlxuXG4gICAgICAgICAgICAgICAgLy90b2RvIDE2XG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgem9yZGVyID0gMTAwMStwYXJzZUludCgxNi1hZ2VudC5teXBvcy55LTEpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICB6b3JkZXIgPSAxMDAxK3BhcnNlSW50KDE2LWFnZW50Lm15cG9zLnktMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG15QWdlbnQuekluZGV4ID0gem9yZGVyO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFpJbmRleCh6b3JkZXIpO1xuLyogICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnNldElkKGFpZCk7XG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUuc2V0U2hhZG93KHRoaXMuc2hhZG93Rm9yQWdlbnQoKSk7XG4qL1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldFRvdGFsTGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0Qmxvb2QodGhpcy5ibG9vZEZvckFnZW50KG15QWdlbnQpKTtcblxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdCBwb3MgaXMgaW4gc291dGgsIGZhY2UgdG8gbm9ydGgsIG90aGVyd2lzZS4uLi5cbiAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAxODA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQucm90ID0gMDsgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnBsYXlBbmdsZUFuaW1hdGlvbihhZ2VudCwgbnVsbCwgdGhpcy5tYWluUGxheWVyKTtcblxuICAgICAgICAgICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QWdlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUFnZW50LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFnZW50UHJvY2VzczogZnVuY3Rpb24oYWdlbnRzKSB7XG4gICAgICAgIHZhciByZW1vdGVBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGxvY2FsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBraWxsQWdlbnRzID0gW107XG4gICAgICAgIHZhciBhZ2VudE9iaiwgYWdlbnROb2RlO1xuICAgICAgICB2YXIgYWdlbnRJZDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGFnZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICByZW1vdGVBZ2VudHMucHVzaChhZ2VudHNbaV0uYWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQWdlbnRzID0gdGhpcy5ucGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAga2lsbEFnZW50cyA9IGxvY2FsQWdlbnRzLm1pbnVzKHJlbW90ZUFnZW50cyk7XG5cbiAgICAgICAgZm9yKGFnZW50SWQgb2Yga2lsbEFnZW50cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoudHlwZSA9PSBcImFnZW50XCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJhc2VQcm9jZXNzOiBmdW5jdGlvbihiYXNlcykge1xuICAgICAgICB2YXIgcmVtb3RlQmFzZXMgPSBbXTtcbiAgICAgICAgdmFyIGtpbGxCYXNlcyA9IFtdO1xuICAgICAgICB2YXIgZW5lbXlCYXNlcyA9IFtdO1xuICAgICAgICB2YXIgYmFzZU9iajtcbiAgICAgICAgdmFyIHdhcnJpb3JOYW1lO1xuICAgICAgICB2YXIgd2Fycmlvck9iajtcbiAgICAgICAgdmFyIGJhc2VOYW1lO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YmFzZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYmFzZU5hbWUgPSBcImJhc2VcIisgYmFzZXNbaV0ub2JqZWN0SWQ7XG4gICAgICAgICAgICByZW1vdGVCYXNlcy5wdXNoKGJhc2VOYW1lKTtcbiAgICAgICAgICAgIGVuZW15QmFzZXMucHVzaChiYXNlTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2RvIGxpc3Q6IHNob3VsZCBtYW5hZ2UgdG8gcmVtb3ZlIHRoZSBiYXNlIHJlY29yZCBpbiBucGNJbmZvLlxuICAgICAgICBraWxsQmFzZXMgPSB0aGlzLl9kZWZhdWx0QmFzZXMubWludXMocmVtb3RlQmFzZXMpO1xuXG4gICAgICAgIGZvcihiYXNlTmFtZSBvZiBraWxsQmFzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcExheW91dE1hc2soZW5lbXlCYXNlcywgYmFzZU5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0QmFzZXMucmVtb3ZlQnlWYWx1ZShiYXNlTmFtZSk7XG4gICAgICAgICAgICBiYXNlT2JqID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgLy90aGlzLnBsdXNCYXNlS2lsbE51bShiYXNlTmFtZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZChiYXNlT2JqKTtcbiAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJhc2VcIiwgYmFzZU9iai54LCBiYXNlT2JqLnkpO1xuICAgICAgICB9XG4gICAgfSxcbiBcbiAgICBwbHVzQmFzZUtpbGxOdW06IGZ1bmN0aW9uKGJhc2VOYW1lKSB7XG4gICAgICAgIC8vdG9kbzogbGF5b3V0IG5vZGUgbXVzdCBiZSBzZXQgaW4gaW5pdCBcbiAgICAgICAgdmFyIGVuZW15bnVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXBGbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICB2YXIgbXludW0gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkb3duRmxhZ1wiKS5nZXRDaGlsZEJ5TmFtZShcInJpbmdNYXJrXCIpLmdldENoaWxkQnlOYW1lKFwia2lsbG51bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGJhc2VOYW1lLmluQXJyYXkoW1wiYmFzZTFcIiwgXCJiYXNlMlwiLCBcImJhc2UzXCJdKSkge1xuICAgICAgICAgICAgZW5lbXludW0uc3RyaW5nID0gcGFyc2VJbnQoZW5lbXludW0uc3RyaW5nKSsxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXludW0uc3RyaW5nID0gcGFyc2VJbnQoZW5lbXludW0uc3RyaW5nKSsxOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vY2FsbGVkIHdoZW4gZ2FtZSBpcyBvdmVyXG4gICAga2lsbEJhc2VzOmZ1bmN0aW9uKGRpcikge1xuICAgICAgICAvL3RvZG86IGxheW91dCBub2RlIG11c3QgYmUgc2V0IGluIGluaXQgXG4gICAgICAgIC8vdmFyIGVuZW15bnVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXBGbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICAvL3ZhciBteW51bSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRvd25GbGFnXCIpLmdldENoaWxkQnlOYW1lKFwicmluZ01hcmtcIikuZ2V0Q2hpbGRCeU5hbWUoXCJraWxsbnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgXG4gICAgICAgIHZhciBraWxsQmFzZXM7XG4gICAgICAgIHZhciBiYXNlT2JqLCBiZDtcbiAgICAgICAgdmFyIGJhc2VOYW1lO1xuICAgICAgICBpZihkaXIgPT0gXCJ1cFwiKSB7XG4gICAgICAgICAgICBraWxsQmFzZXM9IFtcImJhc2UxXCIsIFwiYmFzZTJcIiwgXCJiYXNlM1wiXTtcbiAgICAgICAgICAgIC8vZW5lbXludW0uc3RyaW5nID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtpbGxCYXNlcz0gW1wiYmFzZTRcIiwgXCJiYXNlNVwiLCBcImJhc2U2XCJdO1xuICAgICAgICAgICAgLy9teW51bS5zdHJpbmcgPSAzO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGJhc2VOYW1lIG9mIGtpbGxCYXNlcykge1xuICAgICAgICAgICAgLy90aGlzLl9kZWZhdWx0QmFzZXMucmVtb3ZlQnlWYWx1ZShiYXNlTmFtZSk7XG4gICAgICAgICAgICBiYXNlT2JqID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgaWYoYmFzZU9iaikge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJhc2VcIiwgYmFzZU9iai54LCBiYXNlT2JqLnkpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZChiYXNlT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmRpc3BsYXlNYXNrOiBmdW5jdGlvbihzZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2VsKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHNlbCkuYWN0aXZlPWZhbHNlO1xuICAgIH0sXG5cbiAgICBkaXNwTGF5b3V0TWFzazogZnVuY3Rpb24oa2lsbEVuZW15QmFzZXMsIGJhc2VOYW1lKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKGJhc2VOYW1lID09IFwiYmFzZTRcIiB8fCBiYXNlTmFtZSA9PSBcImJhc2U1XCIgfHwgYmFzZU5hbWUgPT0gXCJiYXNlNlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmKFwiYmFzZTFcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSAmJiBcImJhc2UyXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykgJiYgXCJiYXNlM1wiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpKSB7XG4gICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgLy99XG5cbiAgICAgICAgaWYoXCJiYXNlMVwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpICYmIFwiYmFzZTJcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayhcInNlbGVNYXNrMTJcIiwgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihcImJhc2UxXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykgJiYgXCJiYXNlM1wiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNYXNrKFwic2VsZU1hc2sxM1wiLCAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKFwiYmFzZTFcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayhcInNlbGVNYXNrMVwiLCAyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93RHJhZ01hc2s6IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgaWYoIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHRoaXMubWFza1R5cGUpLmFjdGl2ZT10cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVuc2hvd0RyYWdNYXNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHRoaXMubWFza1R5cGUpLmFjdGl2ZT1mYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd01hc2s6IGZ1bmN0aW9uKG1hc2tUeXBlLCBkZWxheSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm1hc2tUeXBlID0gbWFza1R5cGU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShtYXNrVHlwZSkuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3NlbGYudW5kaXNwbGF5TWFzayhtYXNrVHlwZSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9LFxuXG4gICAgcHV0RXJyb3JNc2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwdXRFcnJvclwiKS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfc2VsZi51bmRpc3BsYXlQdXRFcnIoKTtcbiAgICAgICAgfSwgMSk7XG4gICAgfSxcblxuICAgIHVuZGlzcGxheVB1dEVycjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInB1dEVycm9yXCIpLmFjdGl2ZT1mYWxzZTtcbiAgICB9LFxuXG4gICAgZm9ydFByb2Nlc3M6IGZ1bmN0aW9uKGZvcnRzLCBmb3J0c0Z1dHVyZSkge1xuICAgICAgICB2YXIgcmVtb3RlQWdlbnRzID0gW107XG4gICAgICAgIHZhciBsb2NhbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIga2lsbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQsIGJkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8Zm9ydHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgcmVtb3RlQWdlbnRzLnB1c2goZm9ydHNbaV0uYWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQWdlbnRzID0gdGhpcy5ucGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAga2lsbEFnZW50cyA9IGxvY2FsQWdlbnRzLm1pbnVzKHJlbW90ZUFnZW50cyk7XG5cbiAgICAgICAgZm9yKGFnZW50SWQgb2Yga2lsbEFnZW50cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoudHlwZSA9PSBcImZhXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJmb3J0XCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuXG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJhc2VcIiwgYWdlbnRPYmoueCwgYWdlbnRPYmoueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbG9nUHJvY2VzczogZnVuY3Rpb24obG9ncykge1xuICAgICAgICB2YXIgcmVtb3RlQWdlbnRzID0gW107XG4gICAgICAgIHZhciBsb2NhbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIga2lsbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQsIGJkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bG9ncy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICByZW1vdGVBZ2VudHMucHVzaChsb2dzW2ldLmFpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEFnZW50cyA9IHRoaXMubnBjSW5mby5hbGxLZXlzKCk7XG4gICAgICAgIGtpbGxBZ2VudHMgPSBsb2NhbEFnZW50cy5taW51cyhyZW1vdGVBZ2VudHMpO1xuXG4gICAgICAgIGZvcihhZ2VudElkIG9mIGtpbGxBZ2VudHMpIHtcbiAgICAgICAgICAgIGFnZW50T2JqID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnJvbGUgPT0gXCJsb2dcIikge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImxvZ1wiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYnVsbGV0UHJvY2VzczogZnVuY3Rpb24oYnVsbGV0cykge1xuICAgICAgICB2YXIgcmVtb3RlQnVsbGV0cyA9IFtdO1xuICAgICAgICB2YXIgbG9jYWxCdWxsZXRzID0gW107XG4gICAgICAgIHZhciBraWxsQnVsbGV0cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxidWxsZXRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIHJlbW90ZUJ1bGxldHMucHVzaChidWxsZXRzW2ldLmFpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEJ1bGxldHMgPSB0aGlzLm5wY0luZm8uYWxsS2V5cygpO1xuICAgICAgICBraWxsQnVsbGV0cyA9IGxvY2FsQnVsbGV0cy5taW51cyhyZW1vdGVCdWxsZXRzKTtcblxuICAgICAgICBmb3IoYWdlbnRJZCBvZiBraWxsQnVsbGV0cykge1xuICAgICAgICAgICAgYWdlbnRPYmogPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgaWYoYWdlbnRPYmoucm9sZSA9PSBcImJvbWJcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKTtcbiAgICAgICAgICAgICAgICBhZ2VudE9iai5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiYm9tYlwiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnJvbGUgPT0gXCJ3aXpmaXJlXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnRPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIGlmKGFnZW50T2JqLnggJiYgYWdlbnRPYmoueSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJ3aXpmaXJlXCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWdlbnRPYmoucm9sZSA9PSBcImJ1bGxldFwiIHx8IGFnZW50T2JqLnJvbGUgPT0gXCJ0YW1hXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnRPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vc2hha2UgdGhlIHNjcmVlblxuICAgIHN0YXJ0U2NlbmVKaXR0ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzY2VuZU5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHZhciBveCA9IHNjZW5lTm9kZS54O1xuICAgICAgICB2YXIgb3kgPSBzY2VuZU5vZGUueTtcblxuICAgICAgICB2YXIgY250ID0gMDtcblxuICAgICAgICB2YXIgbG93ZXIgPSAtNDtcbiAgICAgICAgdmFyIHVwcGVyID0gNDtcbiAgICAgICAgdmFyIGNhbGxCYWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgdmFyIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikpICsgbG93ZXI7XG4gICAgICAgICAgICB2YXIgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh1cHBlciAtIGxvd2VyKSkgKyBsb3dlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2NlbmVOb2RlLnggKz0gcmFuZG9tWDtcbiAgICAgICAgICAgIHNjZW5lTm9kZS55ICs9IHJhbmRvbVk7XG4gICAgICAgICAgICBpZihjbnQ+PTEwKSB7XG4gICAgICAgICAgICAgICAgc2NlbmVOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgc2NlbmVOb2RlLnggPSBveDtcbiAgICAgICAgICAgICAgICBzY2VuZU5vZGUueSA9IG95O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGU7Ly/lnLrmma/luLjpqbvoioLngrlcbiAgICAgICAgdmFyIGRlbCA9IGNjLmRlbGF5VGltZSgxLzMwKTtcbiAgICAgICAgdmFyIGNhbCA9IGNjLmNhbGxGdW5jKGNhbGxCYWNrKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGRlbCwgY2FsKTtcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihzZXEpKTtcbiAgICB9LFxuXG4gICAgcGxheUJhc2VzOiBmdW5jdGlvbihiYXNlcykge1xuICAgICAgICB2YXIgcmVtb3RlQmFzZXMgPSBbXTtcbiAgICAgICAgdmFyIGJhc2VPYmosbXlBZ2VudCxhZ2VudDtcbiAgICAgICAgdmFyIHdhcnJpb3JOYW1lO1xuICAgICAgICB2YXIgd2Fycmlvck9iajtcbiAgICAgICAgdmFyIGJhc2VOYW1lLCBraW5nTm9kZSwgYWdlbnROb2RlLCBraW5nQXJyb3csd2FycmlvcjtcbiAgICAgICAgdmFyIGFjdFR5cGUsIGF0dGFja0R1cmEsIG5vdztcbiAgICAgICAgdmFyIHRtcEIgPSB7fTtcbiAgICAgICAgdmFyIGVvRGVhZDtcbiAgICAgICAgdmFyIGVvID0gbnVsbDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJhc2VzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYmFzZXNbaV07XG5cbiAgICAgICAgICAgIGJhc2VOYW1lID0gXCJiYXNlXCIrIGFnZW50Lm9iamVjdElkO1xuICAgICAgICAgICAgYXR0YWNrRHVyYSA9IGFnZW50LmF0dGFja0R1cmE7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpLmJhc2VPYmo7XG5cbiAgICAgICAgICAgIHRtcEJbYWdlbnQuYWlkXSA9IGJhc2VOYW1lO1xuICAgICAgICAgICAgcmVtb3RlQmFzZXMucHVzaChiYXNlTmFtZSk7XG4gICAgICAgICAgICBhY3RUeXBlID0gYWdlbnQuYWN0VHlwZTtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCkge1xuICAgICAgICAgICAgICAgIG15QWdlbnQuZ2V0Q29tcG9uZW50KFwiQmFzZVNwcml0ZVwiKS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgd2FycmlvciA9IG15QWdlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJyaW9yXCIpO1xuICAgICAgICAgICAgICAgIGlmKHdhcnJpb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Fycmlvci5yb2xlID0gXCJsclwiO1xuICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZSh3YXJyaW9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIG5vIGVubWV5IHRoZW4gc3RhbmRieVxuICAgICAgICAgICAgICAgICAgICBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwid2FpdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdChcIm1vdmVcIiwgYWdlbnQub2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QmFzZVdhcnJpb3JBbmltYXRpb24oYWdlbnQsIHRoaXMubWFpblBsYXllciwgXCJzYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3YXJyaW9yID0gbXlBZ2VudC5nZXRDaGlsZEJ5TmFtZShcImd1blwiKTtcbiAgICAgICAgICAgICAgICBpZih3YXJyaW9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcnJpb3Iucm9sZSA9IFwiZ3VuXCI7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKHdhcnJpb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbm8gZW5tZXkgdGhlbiBzdGFuZGJ5XG4gICAgICAgICAgICAgICAgICAgIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJ3YWl0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnBsYXlGb3J0V2FycmlvckFuaW1hdGlvbkRlZmF1bHQoXCJtb3ZlXCIsIHRoaXMubWFpblBsYXllciwgYWdlbnQub2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QmFzZVdhcnJpb3JBbmltYXRpb24oYWdlbnQsIHRoaXMubWFpblBsYXllciwgXCJzYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5QWdlbnRzOiBmdW5jdGlvbihhZ2VudHMsIGFnZW50c0Z1dHVyZSkge1xuICAgICAgICB2YXIgbXlBZ2VudDtcbiAgICAgICAgdmFyIHB4LCBweSwgYWlkO1xuICAgICAgICB2YXIgYWdlbnROb2RlLGFnZW50LGVvPW51bGw7XG4gICAgICAgIHZhciBlb0RlYWQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxhZ2VudHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWdlbnQgPSBhZ2VudHNbaV07XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpO1xuXG4gICAgICAgICAgICBpZihteUFnZW50ICYmIG15QWdlbnQudHlwZT09XCJhZ2VudFwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlBbmkoYWdlbnQsIHRoaXMuZ2V0RnV0dXJlQWdlbnQoYWdlbnQuYWlkLCBhZ2VudHNGdXR1cmUpLCB0aGlzLm1haW5QbGF5ZXIpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRHcm91cEtpbGwoYWdlbnQuZ3JvdXBLaWxsKTtcblxuICAgICAgICAgICAgICAgIHB4ID0gTWF0aC5yb3VuZCgoYWdlbnQubXlwb3MueCkqMzgpO1xuICAgICAgICAgICAgICAgIHB5ID0gTWF0aC5yb3VuZCgoYWdlbnQubXlwb3MueSkqMzgpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS51cGRhdGVQb3MocHgsIHB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5Rm9ydHM6IGZ1bmN0aW9uKGZvcnRzKSB7XG4gICAgICAgIHZhciBteUFnZW50O1xuICAgICAgICB2YXIgYWdlbnROb2RlLGFnZW50LHdhcnJpb3I9bnVsbDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGZvcnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gZm9ydHNbaV07XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpO1xuICAgICAgICAgICAgaWYoIW15QWdlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG15QWdlbnQucm9sZSA9IFwiZmFcIjtcbiAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgYWdlbnROb2RlLnNldExpZmUoYWdlbnQubGlmZSk7XG5cbiAgICAgICAgICAgIHdhcnJpb3IgPSBteUFnZW50LmdldENoaWxkQnlOYW1lKFwid2FycmlvclwiKTtcbiAgICAgICAgICAgIHdhcnJpb3Iucm9sZSA9IFwibHJcIjtcbiAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKHdhcnJpb3IpO1xuXG4gICAgICAgICAgICAvL2lmIG5vIGVubWV5IHRoZW4gc3RhbmRieVxuICAgICAgICAgICAgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5Rm9ydFdhcnJpb3JBbmltYXRpb25EZWZhdWx0KFwibW92ZVwiLCBhZ2VudC5pc0hlcm8sIHRoaXMubWFpblBsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlCYXNlV2FycmlvckFuaW1hdGlvbihhZ2VudCwgdGhpcy5tYWluUGxheWVyLCBcInNhXCIpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5TG9nczogZnVuY3Rpb24obG9ncykge1xuICAgICAgICB2YXIgYWdlbnQsbXlBZ2VudDtcbiAgICAgICAgdmFyIHB4LCBweSwgYWlkO1xuICAgICAgICB2YXIgYWdlbnROb2RlLGJ1bGxldCxlbz1udWxsO1xuICAgICAgICB2YXIgc2M7XG4gICAgICAgIHZhciBtb3ZlVG87XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxsb2dzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gbG9nc1tpXTtcbiAgICAgICAgICAgIG15QWdlbnQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGFnZW50LmFpZCk7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUFnZW50KTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUubW92ZShhZ2VudC5teXBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUJ1bGxldHM6IGZ1bmN0aW9uKGJ1bGxldHMpIHtcbiAgICAgICAgdmFyIG15QnVsbGV0O1xuICAgICAgICB2YXIgcHgsIHB5LCBhaWQ7XG4gICAgICAgIHZhciBhZ2VudE5vZGUsYnVsbGV0LGVvPW51bGw7XG4gICAgICAgIHZhciBzYztcbiAgICAgICAgdmFyIGJ1bGxldFJvdDtcbiAgICAgICAgdmFyIHN1YkJ1bGxldDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJ1bGxldHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYnVsbGV0ID0gYnVsbGV0c1tpXTtcblxuICAgICAgICAgICAgbXlCdWxsZXQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGJ1bGxldC5haWQpO1xuICAgICAgICAgICAgaWYobXlCdWxsZXQpIHtcbiAgICAgICAgICAgICAgICAvLzIgZm9ydCBidWxsZXQgZW1pdCB0aGUgc2FtZSB0aW1lLCBvbmx5IGRpc3BsYXkgdGhlIHByb3BlciBidWxsZXQuXG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnVwZG93bj09XCJ1cFwiICYmIHRoaXMubWFpblBsYXllcj09Mikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnVwZG93bj09XCJkb3duXCIgJiYgdGhpcy5tYWluUGxheWVyPT0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J1bGxldChteUJ1bGxldCwgYnVsbGV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93QnVsbGV0OiBmdW5jdGlvbihteUJ1bGxldCwgYnVsbGV0KSB7XG4gICAgICAgIHZhciBzdWJCdWxsZXQsIGFnZW50Tm9kZSwgcHgsIHB5LCBtb3ZlVG8sIGJ1bGxldFJvdDtcblxuICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QnVsbGV0KTtcblxuICAgICAgICAvL3RvZG8gMzhcbiAgICAgICAgcHggPSAoYnVsbGV0Lm15cG9zLngpKjM4O1xuICAgICAgICBweSA9IChidWxsZXQubXlwb3MueSkqMzg7XG5cbiAgICAgICAgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcblxuICAgICAgICBidWxsZXRSb3QgPSBidWxsZXQucm90O1xuICAgICAgICAvL2lmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgIC8vICAgIGJ1bGxldFJvdCArPSAxODA7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vMTAwMDphZ2VudCwgOTk5OnRoaXMgYnVsbGV0IDk5ODpmb3J0cztcbiAgICAgICAgLy9tYWtlIGJ1bGxldCBkaXNwbGF5IHVuZGVyIGFnZW50IHdoaWNoIGlzIGF0IHNhbWUgcG9zaXRpb24uXG4gICAgICAgIC8vdG9kbyAxNlxuICAgICAgICBteUJ1bGxldC56SW5kZXggPSAxMDAwK3BhcnNlSW50KDE2LWJ1bGxldC5teXBvcy55KTtcblxuICAgICAgICBpZihteUJ1bGxldC5yb2xlID09IFwiYnVsbGV0XCIpIHtcbiAgICAgICAgICAgIHN1YkJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzFdKTtcbiAgICAgICAgICAgIC8vc3ViQnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjVdKTtcblxuICAgICAgICAgICAgLy8gZmlyc3QgY29udmVydCBtb3ZlVG8oYmVsb25nIHRvIGxheW91dCBub2RlKSB0byB3b3JsZCBwb3NpdGlvbi5cbiAgICAgICAgICAgIHZhciBwcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobW92ZVRvKTtcblxuICAgICAgICAgICAgLy8gY29udmVydCB3b3JsZCBwb3N0aW9uIHRvIG15QnVsbGV0IHBvc2l0aW9uLlxuICAgICAgICAgICAgcHAgPSBteUJ1bGxldC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwcCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSA5MCAtIGJ1bGxldFJvdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSAoOTAgLSBidWxsZXRSb3QpKi0xOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdWJCdWxsZXQuc2V0UG9zaXRpb24ocHApO1xuICAgICAgICAgICAgbXlCdWxsZXQuYWRkQ2hpbGQoc3ViQnVsbGV0KTtcbiAgICAgICAgfSBcblxuICAgICAgICBlbHNlIGlmKG15QnVsbGV0LnJvbGUgPT0gXCJib21iXCIpIHtcbiAgICAgICAgICAgIHNjID0gdGhpcy5nZXRGaXJlQm9tYlNjYWxlKGJ1bGxldC5teXBvcywgYnVsbGV0LnRhcmdldHBvcywgbXlCdWxsZXQudGFyZ2V0RGlzLCBteUJ1bGxldC5zdGFydFBvcyk7XG4gICAgICAgICAgICBteUJ1bGxldC5zY2FsZVg9c2M7XG4gICAgICAgICAgICBteUJ1bGxldC5zY2FsZVk9c2M7XG4gICAgICAgICAgICBteUJ1bGxldC56SW5kZXggPSA5OTk5O1xuXG4gICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDtcbiAgICAgICAgICAgIG15QnVsbGV0LnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSo0MCktMTA7XG4gICAgICAgICAgICAgICAgdmFyIGZoID0gbXlCdWxsZXQuZ2V0Q2hpbGRCeU5hbWUoXCJmaXJlSGVhZFwiKTtcbiAgICAgICAgICAgICAgICAvL2ZoLnNrZXdZID0gcmFuZG9tVGltZTtcbiAgICAgICAgICAgICAgICAvL2ZoLnNrZXdYID0gcmFuZG9tVGltZTtcblxuICAgICAgICAgICAgICAgIC8vZmlyZSBib21iIHNpemUgY2hhbmdpbmcgYWNjb3JkaW5nIHRvIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRhcmdldCBhbmQgb3JpZ2luLlxuICAgICAgICAgICAgICAgIHNjID0gdGhpcy5nZXRGaXJlQm9tYlNjYWxlKGJ1bGxldC5teXBvcywgYnVsbGV0LnRhcmdldHBvcywgbXlCdWxsZXQudGFyZ2V0RGlzLCBteUJ1bGxldC5zdGFydFBvcyk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLm5vZGUuc2NhbGVYPXNjO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5ub2RlLnNjYWxlWT1zYztcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5zdHJva2UgKj0gc2M7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZihteUJ1bGxldC5yb2xlID09IFwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vb2xkIHdpeiBmaXJlIGJhbGxcbiAgICAgICAgICAgIG15QnVsbGV0LnpJbmRleCA9IDk5OTk7XG4gICAgICAgICAgICAvLyBzaGFrZSBhIGxpdHRsZSBiaXRcbiAgICAgICAgICAgIC8vdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSo0MCktMTA7XG4gICAgICAgICAgICAvL2J1bGxldFJvdCArPSByYW5kb21UaW1lO1xuXG4gICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBteUJ1bGxldC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICAgICAgXG5cbi8qXG4gICAgICAgICAgICAvL2NvbnRpbnVlcyBmaXJlIGVmZmVjdFxuICAgICAgICAgICAgc3ViQnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjVdKTtcblxuICAgICAgICAgICAgLy8gZmlyc3QgY29udmVydCBtb3ZlVG8oYmVsb25nIHRvIGxheW91dCBub2RlKSB0byB3b3JsZCBwb3NpdGlvbi5cbiAgICAgICAgICAgIHZhciBwcCA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobW92ZVRvKTtcblxuICAgICAgICAgICAgLy8gY29udmVydCB3b3JsZCBwb3N0aW9uIHRvIG15QnVsbGV0IHBvc2l0aW9uLlxuICAgICAgICAgICAgcHAgPSBteUJ1bGxldC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwcCk7XG5cbiAgICAgICAgICAgIC8vc3ViQnVsbGV0LnNldFBvc2l0aW9uKHBwKTtcbiAgICAgICAgICAgIC8vbXlCdWxsZXQuYWRkQ2hpbGQoc3ViQnVsbGV0KTtcblxuICAgICAgICAgICAgaWYobXlCdWxsZXQubGFzdHBvcyAmJiBteUJ1bGxldC5sYXN0cG9zLnN1YihwcCkubWFnKCkgPiA1MCkge1xuICAgICAgICAgICAgICAgIHN1YkJ1bGxldC5zZXRQb3NpdGlvbihwcCk7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYWRkQ2hpbGQoc3ViQnVsbGV0KTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5sYXN0cG9zID0gcHA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFteUJ1bGxldC5sYXN0cG9zKSB7XG4gICAgICAgICAgICAgICAgc3ViQnVsbGV0LnNldFBvc2l0aW9uKHBwKTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hZGRDaGlsZChzdWJCdWxsZXQpO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0Lmxhc3Rwb3MgPSBwcDsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuKi9cblxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBteUJ1bGxldC5hbmdsZSA9IC0xKmJ1bGxldFJvdDsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBteUJ1bGxldC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEZpcmVCb21iU2NhbGU6IGZ1bmN0aW9uKGJ1bGxldFBvcywgdGFyZ2V0UG9zLCB0YXJnZXREaXMsIHN0YXJ0UG9zKSB7XG4gICAgICAgIHZhciB4RGlmLCB5RGlmO1xuICAgICAgICB2YXIgbWlkUG9zID0ge307XG4gICAgICAgIG1pZFBvcy54ID0gc3RhcnRQb3MueCArICh0YXJnZXRQb3MueCAtIHN0YXJ0UG9zLngpLzI7XG4gICAgICAgIG1pZFBvcy55ID0gc3RhcnRQb3MueSArICh0YXJnZXRQb3MueSAtIHN0YXJ0UG9zLnkpLzI7XG4gICAgICAgIHZhciB4RGlmID0gYnVsbGV0UG9zLnggLSBtaWRQb3MueDtcbiAgICAgICAgdmFyIHlEaWYgPSBidWxsZXRQb3MueSAtIG1pZFBvcy55O1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5zcXJ0KCh4RGlmICogeERpZikgKyAoeURpZiAqIHlEaWYpKTtcbiAgICAgICAgdmFyIHRhcmdldERpcyA9IHRhcmdldERpcyAqIDAuNTtcblxuICAgICAgICByZXR1cm4gKHRhcmdldERpcy1kaXMpKjAuNy90YXJnZXREaXMrMC41OyAgIC8vc2NhbGUgZnJvbSAwLjUgLS0gMS4yXG4gICAgfSxcblxuICAgIGVuZW1leURpc3RhbmNlOmZ1bmN0aW9uKHB4LHB5LGV4LGV5KSB7XG4gICAgICAgIHZhciB4RGlmLCB5RGlmLCBkaXM7XG4gICAgICAgIHhEaWYgPSBweCAtIGV4O1xuICAgICAgICB5RGlmID0gcHkgLSBleTtcbiAgICAgICAgZGlzID0gTWF0aC5zcXJ0KCh4RGlmICogeERpZikgKyAoeURpZiAqIHlEaWYpKTtcbiAgICAgICAgcmV0dXJuIGRpcztcbiAgICB9LFxuXG4gICAgZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKSB7XG4gICAgICAgIHZhciByb2xlID0gYWdlbnRPYmoucm9sZTtcbiAgICAgICAgaWYocm9sZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJpclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJiZWVcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQmVlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwid2l6XCIpIHtcbi8vcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnV2l6U3ByaXRlJyk7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdORlRBcmNoZXJTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJoclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdIZXJvU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwibG1cIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnTGlnaHRtYW5TcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJsclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdBcmNTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJnaVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdHaWFudFNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImJ1bGxldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdBcnJvdycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImJvbWJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQm9tYlNjcmlwdCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImxvZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdMb2dTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJndW5cIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnR3VuU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiYmFzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdCYXNlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiZmFcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQmFzZVNwcml0ZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEtpbGxlZEVuZW1pZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWlkcyA9IHRoaXMucmVtb3ZlZE5wY0luZm8uYWxsS2V5cygpO1xuICAgICAgICB2YXIgYWlkO1xuICAgICAgICB2YXIga2lsbGVkRW5lbWllcyA9IFtdO1xuICAgICAgICAvL3doZW4gb25lIGF0dGFjayBjYXVzZSBtdWx0aSBraWxscyBvY2N1cmVkIGluIG9uZSBmcmFtZSwgbXVsdGkgZW5lbWllcyBtdXN0IGJlIGhhbmRsZWQuIFxuICAgICAgICBmb3IodmFyIGk9MDtpPGFpZHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYWlkID0gYWlkc1tpXTtcbiAgICAgICAgICAgIGtpbGxlZEVuZW1pZXMucHVzaCh0aGlzLnJlbW92ZWROcGNJbmZvLm9iamVjdEZvcktleShhaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBraWxsZWRFbmVtaWVzO1xuICAgIH0sXG5cbiAgICBnZXRGdXR1cmVBZ2VudDogZnVuY3Rpb24oYWlkLCBhZ2VudHNGdXR1cmUpIHtcbiAgICAgICAgZm9yKHZhciBpPTA7aTxhZ2VudHNGdXR1cmUubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgaWYoYWdlbnRzRnV0dXJlW2ldLmFpZCA9PSBhaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWdlbnRzRnV0dXJlW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICBibG9vZEZvckFnZW50OiBmdW5jdGlvbiAoYWdlbnQpIHtcbiAgICAgICAgdmFyIGJsb29kT2JqID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTFdKTtcbiAgICAgICAgdmFyIGJsb29kT3AgPSBibG9vZE9iai5nZXRDb21wb25lbnQoXCJCbG9vZEJhclwiKTtcbiAgICAgICAgYmxvb2RPcC5zZXRCYXJMZXZlbChhZ2VudC5sZXZlbCk7XG5cbiAgICAgICAgYmxvb2RPYmouYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGFnZW50LmFkZENoaWxkKGJsb29kT2JqKTtcbiAgICAgICAgcmV0dXJuIGJsb29kT2JqO1xuICAgIH0sXG5cbiAgICBzaGFkb3dGb3JBZ2VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2hhZG93T2JqID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMl0pO1xuICAgICAgICBzaGFkb3dPYmouYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzaGFkb3dPYmopO1xuICAgICAgICByZXR1cm4gc2hhZG93T2JqO1xuICAgIH0sXG5cbiAgICBzaGFkb3dGb3JMb2c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNoYWRvd09iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzJdKTtcbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcblxuICAgICAgICBzaGFkb3dPYmouc2NhbGVYID0gMTtcbiAgICAgICAgc2hhZG93T2JqLnNhY2xlWSA9IDE7XG4gICAgICAgIHNoYWRvd09iai5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHNoYWRvd09iaik7XG4gICAgICAgIHJldHVybiBzaGFkb3dPYmo7XG4gICAgfSxcblxuICAgIHNldENsaWNrSXRlbTogZnVuY3Rpb24gKHNlbGVjdCkge1xuICAgICAgICB0aGlzLmNsaWNrU2VsZSA9IHNlbGVjdDtcbiAgICB9LFxuXG4gICAgcHV0Q2xpY2tJdGVtOiBmdW5jdGlvbiAoc2VsQ2FyZCwgbm9kZSwgcHQpIHtcbiAgICAgICAgdmFyIHB1dE5vZGUgPSBjYy5pbnN0YW50aWF0ZShub2RlKTtcbiAgICAgICAgdmFyIGlubmVySWQgPSB0aGlzLm5pY2sgK1wiX1wiKyBOdW1iZXIobmV3IERhdGUoKSk7XG5cbiAgICAgICAgcHV0Tm9kZS54ID0gcHQueDtcbiAgICAgICAgcHV0Tm9kZS55ID0gcHQueTtcbiAgICAgICAgcHV0Tm9kZS5uYW1lID0gaW5uZXJJZDtcbiAgICAgICAgcHV0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZWxDYXJkLmFkZENoaWxkKHB1dE5vZGUpO1xuXG4gICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IHB1dE5vZGU7XG5cbiAgICAgICAgcmV0dXJuIGlubmVySWQ7XG4gICAgfSxcblxuICAgIHNldERyYWdJdGVtOiBmdW5jdGlvbiAocGFyYW1zLCBub2RlKSB7XG4gICAgICAgIHZhciBjYXJkID0gcGFyYW1zLnRhcmdldDtcbiAgICAgICAgdmFyIGRyYWdOb2RlID0gY2MuaW5zdGFudGlhdGUobm9kZSk7XG4gICAgICAgIHZhciBpbm5lcklkID0gdGhpcy5uaWNrICtcIl9cIisgTnVtYmVyKG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIG5vZGUueCA9IDA7XG4gICAgICAgIG5vZGUueSA9IDA7XG4gICAgICAgIGRyYWdOb2RlLm5hbWUgPSBpbm5lcklkO1xuICAgICAgICBkcmFnTm9kZS5hY3R2aWUgPSB0cnVlO1xuICAgICAgICBjYXJkLmFkZENoaWxkKGRyYWdOb2RlKTtcblxuICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBkcmFnTm9kZTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ0l0ZW0gPSBpbm5lcklkO1xuXG4gICAgICAgIHJldHVybiBpbm5lcklkO1xuICAgIH0sXG5cbiAgICB1bnNldERyYWdJdGVtOiBmdW5jdGlvbiAoaW5uZXJJZCkge1xuICAgICAgICB0aGlzLnVuc2hvd0RyYWdNYXNrKCk7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdJdGVtID0gXCJcIjtcbiAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gbnVsbDsgICAgIFxuICAgIH0sXG5cbiAgICBtb3ZlRHJhZ0l0ZW06IGZ1bmN0aW9uKHNlbCwgZGVsdGEpIHtcbiAgICAgICAgaWYodGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXSkge1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS54ICs9IGRlbHRhLng7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLnkgKz0gZGVsdGEueTsgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS55IDwgMCkge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS55ID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsZWFyRHJhZ0l0ZW06IGZ1bmN0aW9uKHBhcmFtLCBzZWxlY3QpIHtcbiAgICAgICAgdmFyIGlubmVySWQ7XG4gICAgICAgIHZhciBjYXJkID0gcGFyYW0udGFyZ2V0O1xuICAgICAgICB2YXIgc2VsID0gY2FyZC5fbmFtZTtcbiAgICAgICAgdmFyIHB0PXt9O1xuICAgICAgICB2YXIgbGF5b3V0UHQgPSB0aGlzLm5vZGUucG9zaXRpb247XG4gICAgICAgIHZhciB5T2Zmc2V0PTA7XG4gICAgICAgIHZhciBtYWdpY0Nvc3QgPSBzZWxlY3QubWFnaWNDb3N0O1xuICAgICAgICB2YXIgbGV2ZWwgPSBzZWxlY3QubGV2ZWw7XG4gICAgICAgIHZhciByb2xlID0gc2VsZWN0LnJvbGU7XG5cbmNvbnNvbGUubG9nKFwicm9sZTpcIiArIHJvbGUpO1xuXG4gICAgICAgIHRoaXMudW5zaG93RHJhZ01hc2soKTtcblxuICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXI9PTEpIHtcbiAgICAgICAgICAgIHlPZmZzZXQ9LTUwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeU9mZnNldD0yMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0pIHtcbiAgICAgICAgICAgIGlubmVySWQgPSB0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLm5hbWU7XG5cbiAgICAgICAgICAgIC8vbGF5b3V0IG1heWJlIHNjYWxlZCBhY2NvcmRpbmcgdG8gZGV2aWNlcy5cbiAgICAgICAgICAgIHB0LnggPSAodGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXS54K2NhcmQueC1sYXlvdXRQdC54KS90aGlzLm5vZGUuc2NhbGVYO1xuICAgICAgICAgICAgcHQueSA9ICh0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLnkrY2FyZC55LWxheW91dFB0LnkreU9mZnNldCkvdGhpcy5ub2RlLnNjYWxlWTtcblxuICAgICAgICAgICAgaWYoIXRoaXMuaXNWYWxpZFB1dFBvaW50KHB0KSAmJiAhdGhpcy5pZk5vdE1hc2tSb2xlKHJvbGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHBvc3Rpb24uXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dEVycm9yTXNnKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbmRTb2RpZXIobWFnaWNDb3N0LCByb2xlLCBwdCwgaW5uZXJJZCwgbGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZ0l0ZW0gPSBcIlwiO1xuICAgICAgICB9IFxuICAgIH0sXG5cbiAgICBzZW5kU29kaWVyOiBmdW5jdGlvbihtYWdpY0Nvc3QsIHJvbGUsIHB0LCBpbm5lcklkLCBsZXZlbCkge1xuICAgICAgICAvL3ZhciBpbm5lcklkID0gdGhpcy5uaWNrICtcIl9cIisgTnVtYmVyKG5ldyBEYXRlKCkpO1xuICAgICAgICB2YXIgaXNIZXJvID0gKHRoaXMubWFpblBsYXllcj09MSk7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWdpY0JhclwiKTtcbiAgICAgICAgdmFyIGp1aWNlID0gYmFyLmdldENoaWxkQnlOYW1lKFwianVpY2VcIik7XG4gICAgICAgIHZhciBjb3N0ID0gdGhpcy51c2VNYWdpYyhtYWdpY0Nvc3QpO1xuXG4gICAgICAgIHRoaXMucGxheVNuZChcInB1dDFcIik7XG5cbiAgICAgICAgaWYoY29zdCkge1xuICAgICAgICAgICAganVpY2Uud2lkdGggPSBjb3N0O1xuICAgICAgICAgICAgTVlfU09DS0VULmpzb24uZW1pdCgnY21kJywgeydpc0hlcm8nOmlzSGVybywgJ3Jvb21JZCc6IHRoaXMucm9vbUlkLCAnaW5uZXJJZCc6IGlubmVySWQsICdyb2xlJzogcm9sZSwgJ3B0JzpwdCwgJ2xldmVsJzpsZXZlbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IG51bGw7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0TWFnaWNCYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwibWFnaWNCYXJcIik7XG4gICAgICAgIHZhciBqdWljZSA9IGJhci5nZXRDaGlsZEJ5TmFtZShcImp1aWNlXCIpO1xuXG4gICAgICAgIGlmKGp1aWNlLndpZHRoPDYwMCkge1xuICAgICAgICAgICAganVpY2Uud2lkdGgrPXRoaXMuYWRkSnVpY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihqdWljZS53aWR0aCU1MCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hZ2ljQW1vdW50ID0ganVpY2Uud2lkdGgvNTA7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhcmRTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1c2VNYWdpYzogZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWdpY0JhclwiKTtcbiAgICAgICAgdmFyIGp1aWNlID0gYmFyLmdldENoaWxkQnlOYW1lKFwianVpY2VcIik7XG4gICAgICAgIHZhciBhZnRlclVzZSA9IGp1aWNlLndpZHRoLWFtb3VudCo1MDtcblxuICAgICAgICBpZihhZnRlclVzZT49MCkge1xuICAgICAgICAgICAgcmV0dXJuIGFmdGVyVXNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQ2FyZFN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoZWFkID0gXCJzZWxcIjtcbiAgICAgICAgdmFyIG5vZGVOYW1lLCBzZWxOb2RlO1xuICAgICAgICB2YXIgc2VsU3ByaXRlID0gbnVsbDtcblxuICAgICAgICBmb3IodmFyIGk9MTtpPD03O2krKykge1xuICAgICAgICAgICAgbm9kZU5hbWUgPSBoZWFkICsgaTtcbiAgICAgICAgICAgIHNlbE5vZGUgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUobm9kZU5hbWUpO1xuICAgICAgICAgICAgaWYoc2VsTm9kZSkge1xuICAgICAgICAgICAgICAgIHNlbFNwcml0ZSA9IHNlbE5vZGUuZ2V0Q29tcG9uZW50KCdTZWxDYXJkJyk7XG4gICAgICAgICAgICAgICAgaWYoc2VsU3ByaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbFNwcml0ZS5tYWdpY0Nvc3QgPD0gdGhpcy5tYWdpY0Ftb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsTm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsMjU1LDI1NSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxOb2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEyNywxMjcsMTI3KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==