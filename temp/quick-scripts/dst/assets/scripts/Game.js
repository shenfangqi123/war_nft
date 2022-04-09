
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3bc9CQlNRD6plaPVQ+7BK9', 'Game');
// scripts/Game.js

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
var common = require("Common");

var gameProvider = require("GameProvider");

cc._Dictionary = require("Dictionary");
cc.Class({
  "extends": gameProvider,
  properties: {
    // 这个属性引用了预制资源
    playerPrefab: {
      "default": [],
      type: cc.Prefab
    },
    audios: {
      "default": [],
      type: cc.AudioClip
    }
  },
  ctor: function ctor() {
    console.log("-----ctor----");
    this.bufferLen = 30;
  },
  goback: function goback(event, customEventData) {
    this.syncTimeout();
    cc.director.loadScene('welcome');
  },
  onLoad: function onLoad() {
    console.log("---------onLoad--------");
    /*
            if (typeof (wx) !== "undefined") {
                let self = this;
                wx.onShow(function () {
                    console.log("wx onshow.");
                    if (self.isShared && self.shareTag == "keys") {
                        let curTime = new Date().getTime();
                        if (curTime - self.closeTime >= 3000) {
                            //分享成功
                            console.log("分享成功");
                            //self.isShared = false;
                            //self.shareTag = "";
                            //self.closeTime = curTime;
                        }
                    }
                })
            }
    */

    var _parent = this;

    this.netErrDisp = false;
    var size = cc.visibleRect;
    var name = this.getRandomCharName();
    this.nick = name;
    this.canvasNode = this.node.parent;
    this.resultOp = this.node.getChildByName("Result").getComponent("Result");
    this.gameCountDown = 150; //2:30
    //up user or down user.

    this.mainPlayer = -1;
    this.roomId = "";
    this.baseAttackDuraRec = [];
    this.agentMoveStepRec = [];
    this._defaultBases = ["base1", "base2", "base3", "base4", "base5", "base6"];
    this.gameStartTime = 0;
    this.gameCycleTime = 90;
    this.gameOver = false;
    this.addJuice = 10; //each heart add up to magic juice bar

    this.npcInfo = new cc._Dictionary();
    this.removedNpcInfo = new cc._Dictionary();
    this.setUser(this.getPersistantData());
    console.log("name:" + name);
    this.socketHandle(this.nick);
    this.putSele = [];
    this.dragingItem = "";
    this.clickSele = {};
    this.magicAmount = 0; //red alert area should not be entered by hero.

    this.maskType = "seleMask3";

    var canvasPt = this.node._parent.getPosition();

    var layoutPt = this.node.getPosition();
    var cnode, pl;
    var magicCost = 0;
    var role;
    var selParams, selNode;
    var innerId;
    this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
      if (_parent.gameStartTime == 0) {
        return;
      }

      var pt = params.getLocation();

      _parent.clickProcessor(pt);
    });
    /*
            this.listener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,  
                eventName: "event_effect",
                callback: function (event) {
                    cc.log("event = "+event.getUserData());
                }
            });
            cc.eventManager.addListener(this.listener, 1);
    */

    this.initEventListener();
    var crabNode = cc.instantiate(this.playerPrefab[26]);
    crabNode.x = 100;
    crabNode.y = 100;
    this.node.addChild(crabNode);
  },
  getPersistantData: function getPersistantData() {
    var node = cc.find('GameData').getComponent('GameData');
    return node.getData();
  },
  setUser: function setUser(def) {
    var node = cc.find('GameData').getComponent('GameData');
    var titlenode = this.node.parent.getChildByName("banner").getChildByName("title");
    var levelLabel = this.node.parent.getChildByName("banner").getChildByName("level").getChildByName("levelword").getComponent("cc.Label");
    var nameLabel = titlenode.getChildByName("name").getComponent("cc.Label");
    var scoreLabel = titlenode.getChildByName("score").getComponent("cc.Label");
    nameLabel.string = node.getNick();
    levelLabel.string = def.level;
    scoreLabel.string = def.myscore;
  },
  setConnFailInfo: function setConnFailInfo() {
    this.netErrDisp = true;
    var msgLabel = this.node.getChildByName("putWait").getChildByName("msg").getComponent("cc.Label");
    var retBut = this.node.getChildByName("putWait").getChildByName("retBut");
    retBut.active = true;
    msgLabel.string = "网络连接断开!";
  },
  setBuffDisp: function setBuffDisp(buffType) {
    var canvasNode = this.node.parent;
    this.buffType = buffType;

    if (buffType == "heal") {
      canvasNode.getChildByName("buffHeal").active = true;
    } else if (buffType == "thunder") {
      canvasNode.getChildByName("buffThunder").active = true;
    }
  },

  /*
      doBuff: function(event, customEventData) {
          console.log("sssss:" + customEventData);
          var buffType = customEventData;
          if(buffType == 1) {
          }
      },
  */
  setParam: function setParam(param, timestamp) {
    console.log("----param----");
    console.log(param);
    console.log(timestamp);
    var curTime = new Date().getTime();
    console.log("duration:" + (curTime - timestamp));
    this.setMyCards(param);
    this.dispCharSele();
  },
  setMyCards: function setMyCards(param) {
    var sx = -530;
    var sy = -330;
    var mx, my;
    var card, cardNode, cost;
    var moveTo; //var allCards = ["log","bomb","ske","ir"];

    var allCards = param;
    var rowItems = 0;
    var rows = 0;
    var cols = 0;
    var canvasNode = this.node.parent;
    var head = "sel";

    for (var i = 0; i < allCards.length; i++) {
      card = cc.instantiate(this.playerPrefab[21]);
      card._name = head + (i + 1);
      cardNode = card.getComponent('SelCard');

      if (allCards[i]) {
        cost = 1;
        cardNode.setRole(allCards[i].seleRole, allCards[i].magicCost, allCards[i].roleLevel);
      } //this.myCardNodes.push(cardNode);                


      cols = i % 6;
      mx = sx + cols * 105;
      my = sy;
      moveTo = cc.v2(mx, my);
      card.setPosition(moveTo);
      canvasNode.addChild(card);
    }

    for (var i = allCards.length; i < 6; i++) {
      cols = i % 6;
      mx = sx + cols * 105;
      my = sy;
      card = cc.instantiate(this.playerPrefab[22]);
      moveTo = cc.v2(mx, my);
      card.setPosition(moveTo);
      canvasNode.addChild(card);
    }
  },
  dispCharSele: function dispCharSele() {
    var charSele = this.node.parent.getChildByName("charSele");
    charSele.zIndex = 9999;
    charSele.active = false;
    console.log(charSele);
  },
  gameOverProcessor: function gameOverProcessor(mainPlayer, data) {
    if (mainPlayer == 1) {
      if (data.win == 1) {
        console.log("my win11");
        this.killBases("up");
      } else if (data.win == 0) {
        console.log("my lose11");
        this.killBases("down");
      }
    } else if (mainPlayer == 2) {
      if (data.win == 1) {
        console.log("my lose11");
        this.killBases("down");
      } else if (data.win == 0) {
        console.log("my win11");
        this.killBases("up");
      }
    }
  },
  clickProcessor: function clickProcessor(clickPt) {
    var _parent = this;

    var canvasPt = this.canvasNode.getPosition();
    var layoutPt = this.node.getPosition();
    var innerId; //note that pt is the postion in canvas node.

    var pt = clickPt;
    var pt1 = {};
    var magicCost = _parent.clickSele.magicCost;
    var level = _parent.clickSele.level;
    var role = _parent.clickSele.role;

    if (role === undefined || role == "") {
      return;
    }

    var selCard = _parent.clickSele.params.target;
    var selNode = _parent.clickSele.node;
    var pl = selNode.parent.getPosition(); //sel card node.

    var yOffset = 0;

    if (_parent.mainPlayer == 1) {
      yOffset = -20;
    } else {
      yOffset = 40;
    } //pointer position


    pt1.x = layoutPt.x + pt.x - pl.x - 10;
    pt1.y = layoutPt.y + pt.y - pl.y - (canvasPt.y + layoutPt.y); //position in layout
    //pt.x = pt.x/_parent.node.scaleX - (canvasPt.x + layoutPt.x);
    //pt.y = pt.y/_parent.node.scaleY - (canvasPt.y + layoutPt.y) + yOffset;

    pt.x = pt.x - (canvasPt.x + layoutPt.x);
    pt.y = pt.y - (canvasPt.y + layoutPt.y); //todo

    var px = Math.round(parseFloat(pt.x / 38));
    var py = Math.round(parseFloat(pt.y / 38));
    pt.x = py * -1;
    pt.y = px;
    console.log("--sent pt--");
    console.log(pt.x + ":::" + pt.y);

    if (!this.ifNotMaskRole(role)) {
      this.showMask(this.maskType, 1);
    } //todo
    //if(!this.isValidPutPoint(pt) && !this.ifNotMaskRole(role)) {
    //    console.log("invalid postion.");
    //    this.putErrorMsg();
    //    return;
    //}


    innerId = _parent.putClickItem(selCard, selNode, pt1);

    _parent.sendSodier(magicCost, role, pt, innerId, level);
  },
  isValidPutPoint: function isValidPutPoint(point) {
    var pt = {};
    pt.x = point.x;
    pt.y = point.y;

    if (this.mainPlayer == 2) {
      pt.y = point.y - 40;
    }

    if (this.maskType == "seleMask1") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 650) {
        return true;
      } else {
        return false;
      }
    } else if (this.maskType == "seleMask12") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420 || pt.x >= 285 && pt.x <= 570 && pt.y > 420 && pt.y < 650) {
        return true;
      } else {
        return false;
      }
    } else if (this.maskType == "seleMask13") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420 || pt.x >= 30 && pt.x <= 285 && pt.y > 420 && pt.y < 650) {
        return true;
      } else {
        return false;
      }
    } else if (this.maskType == "seleMask3") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  },
  ifNotMaskRole: function ifNotMaskRole(role) {
    if (role == "bomb" || role == "thunder" || role == "heal") {
      return true;
    }

    return false;
  },
  initEventListener: function initEventListener() {
    this.node.on("event_effect", this.onEventEffect.bind(this));
  },
  onEventEffect: function onEventEffect() {
    console.log("listening effect loaded....");
  },
  setCountDown: function setCountDown(counter) {
    var min = parseInt(counter / 60);
    var sec = counter % 60; //console.log(min +":"+ sec);

    var timeNode = this.canvasNode.getChildByName("banner").getChildByName("time");
    var cdNode = timeNode.getChildByName("countDown").getComponent("cc.Label");

    if (sec < 10) {
      sec = "0" + sec;
    }

    cdNode.string = min + ":" + sec;
  },
  doubleMagicDisp: function doubleMagicDisp() {
    var dispnode = this.node.getChildByName("doubleMagic");
    dispnode.active = true;
  },
  setTimeCounter: function setTimeCounter(cnt) {
    //use to compare if timeout, only for pk mode.
    this.gameNowTime = cnt;
    this.setCountDown(cnt);

    if (cnt == 60) {
      console.log("magic charge speed up");
      this.doubleMagicDisp();
      this.addJuice = 20;
    }

    this.setMagicBar(); //counter1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("num_8.png"));
    //3 second is the ai page loading time.

    var count_down = this.gameCycleTime - cnt;

    if (count_down < 0) {
      this.gameOver = true;
      return;
    }

    var tens = parseInt(count_down / 10);
    var ones = count_down % 10; //console.log(tens +":::"+ ones);
  },
  startTraceTimer: function startTraceTimer() {
    //refer to server interval setting, must a little shorter than that in server
    this.interval = 30;
    var then = Date.now();

    var _parent = this; // 30 mini seconds a game cycle.


    var game_cycle = this.gameCycleTime * 1000;
    var game_cycle_then = Date.now();
    var cycle_cnt = 0;

    if (!this.traceTimer) {
      this.traceTimer = function () {
        var now = Date.now();
        var delta = now - then; //when net traffic happened, idle for 5's will halt
        //not tested yet.

        var game_cycle_delta = now - _parent.gameStartTime; // if within game cycle time

        if (!_parent.gameOver && game_cycle_delta > cycle_cnt * 1000) {
          cycle_cnt++; // if no response for 5s, then timeout

          if (Math.abs(cycle_cnt - _parent.gameNowTime) > 5) {
            this.syncTimeout();
          }
        }

        if (delta > _parent.interval) {
          then = now - delta % _parent.interval;

          _parent.mainGameCycle();
        }
      }.bind(this);
    }

    this.schedule(this.traceTimer, 0);
  },
  mainGameCycle: function mainGameCycle() {
    var _parent = this;

    var data, agents, bullets, bases, forts, rollLogs, agentsFuture, fortsFuture;

    if (this.gameTraceStack.length > this.bufferLen) {
      this.gameTraceStack.shift();
      data = this.gameTraceStack[0]; //data = this.gameTraceStack[this.gameTraceStack.length - 10];

      agents = data.agents;
      agentsFuture = this.gameTraceStack[29].agents;
      fortsFuture = this.gameTraceStack[29].forts;
      bullets = data.bullets;
      bases = data.bases;
      forts = data.forts;
      rollLogs = data.rollLogs;

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
    } //var event = new cc.Event.EventCustom("event_effect", true);
    //event.detail = "123";
    //this.node.dispatchEvent(event);

  },
  syncTimeout: function syncTimeout() {
    this.gameOver = true;
    this.stopTraceTimer();
    MY_SOCKET.disconnect();
    console.log("网络断开"); //this.goPrevious();                 
  },
  stopTraceTimer: function stopTraceTimer() {
    if (this.traceTimer) {
      this.unschedule(this.traceTimer);
    }
  },
  playSnd: function playSnd(sndType) {
    if (sndType == "base") {
      cc.audioEngine.play(this.audios[0], false, 1);
    } else if (sndType == "fireSend") {
      cc.audioEngine.play(this.audios[1], false, 1);
    } else if (sndType == "bomb") {
      cc.audioEngine.play(this.audios[2], false, 1);
    } else if (sndType == "ske") {
      cc.audioEngine.play(this.audios[3], false, 1);
    } else if (sndType == "hr") {
      cc.audioEngine.play(this.audios[4], false, 1);
    } else if (sndType == "lr") {
      cc.audioEngine.play(this.audios[5], false, 1);
    } else if (sndType == "gi") {
      cc.audioEngine.play(this.audios[6], false, 1);
    } else if (sndType == "put1") {
      cc.audioEngine.play(this.audios[7], false, 1);
    } else if (sndType == "wizfire") {
      cc.audioEngine.play(this.audios[2], false, 1);
    } else if (sndType == "lm") {
      cc.audioEngine.play(this.audios[8], false, 1);
    } else if (sndType == "gun") {
      cc.audioEngine.play(this.audios[9], false, 1);
    } else if (sndType == "thunder") {
      cc.audioEngine.play(this.audios[10], false, 1);
    } else if (sndType == "heal") {
      cc.audioEngine.play(this.audios[11], false, 1);
    } else if (sndType == "log") {
      cc.audioEngine.play(this.audios[12], false, 1);
    }
  },
  playEffect: function playEffect(role, x, y) {
    var bd; //play effect.
    //should destroy when finish.

    if (role == "hr") {
      bd = cc.instantiate(this.playerPrefab[13]);
      bd.x = x;
      bd.y = y + 20;
      this.node.addChild(bd);
    }

    if (role == "lm") {
      this.playSnd("lm");
      bd = cc.instantiate(this.playerPrefab[15]);
      bd.x = x;
      bd.y = y - 40;
      this.node.addChild(bd);
    } else if (role == "base") {
      this.playSnd("base");
      bd = cc.instantiate(this.playerPrefab[10]);
      bd.x = x;
      bd.y = y;
      this.node.addChild(bd);
    } //fortA
    else if (role == "fa") {
        bd = cc.instantiate(this.playerPrefab[10]);
        bd.x = x;
        bd.y = y;
        this.node.addChild(bd);
      } else if (role == "log") {
        bd = cc.instantiate(this.playerPrefab[10]);
        bd.scaleX = 0.8;
        bd.scaleY = 0.8;
        bd.x = x + 10;
        bd.y = y;
        this.node.addChild(bd);
      } else if (role == "bomb") {
        this.playSnd("bomb"); //shake the screen

        this.startSceneJitter();
        bd = cc.instantiate(this.playerPrefab[6]);
        bd.active = true;
        bd.x = x;
        bd.y = y;
        this.node.addChild(bd);
      } else if (role == "wizfire") {
        this.playSnd("wizfire");
        bd = cc.instantiate(this.playerPrefab[19]);
        bd.active = true;
        bd.x = x;
        bd.y = y;
        this.node.addChild(bd);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiXSwibmFtZXMiOlsiY29tbW9uIiwicmVxdWlyZSIsImdhbWVQcm92aWRlciIsImNjIiwiX0RpY3Rpb25hcnkiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJwbGF5ZXJQcmVmYWIiLCJ0eXBlIiwiUHJlZmFiIiwiYXVkaW9zIiwiQXVkaW9DbGlwIiwiY3RvciIsImNvbnNvbGUiLCJsb2ciLCJidWZmZXJMZW4iLCJnb2JhY2siLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsInN5bmNUaW1lb3V0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJvbkxvYWQiLCJfcGFyZW50IiwibmV0RXJyRGlzcCIsInNpemUiLCJ2aXNpYmxlUmVjdCIsIm5hbWUiLCJnZXRSYW5kb21DaGFyTmFtZSIsIm5pY2siLCJjYW52YXNOb2RlIiwibm9kZSIsInBhcmVudCIsInJlc3VsdE9wIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJnYW1lQ291bnREb3duIiwibWFpblBsYXllciIsInJvb21JZCIsImJhc2VBdHRhY2tEdXJhUmVjIiwiYWdlbnRNb3ZlU3RlcFJlYyIsIl9kZWZhdWx0QmFzZXMiLCJnYW1lU3RhcnRUaW1lIiwiZ2FtZUN5Y2xlVGltZSIsImdhbWVPdmVyIiwiYWRkSnVpY2UiLCJucGNJbmZvIiwicmVtb3ZlZE5wY0luZm8iLCJzZXRVc2VyIiwiZ2V0UGVyc2lzdGFudERhdGEiLCJzb2NrZXRIYW5kbGUiLCJwdXRTZWxlIiwiZHJhZ2luZ0l0ZW0iLCJjbGlja1NlbGUiLCJtYWdpY0Ftb3VudCIsIm1hc2tUeXBlIiwiY2FudmFzUHQiLCJnZXRQb3NpdGlvbiIsImxheW91dFB0IiwiY25vZGUiLCJwbCIsIm1hZ2ljQ29zdCIsInJvbGUiLCJzZWxQYXJhbXMiLCJzZWxOb2RlIiwiaW5uZXJJZCIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsInBhcmFtcyIsInB0IiwiZ2V0TG9jYXRpb24iLCJjbGlja1Byb2Nlc3NvciIsImluaXRFdmVudExpc3RlbmVyIiwiY3JhYk5vZGUiLCJpbnN0YW50aWF0ZSIsIngiLCJ5IiwiYWRkQ2hpbGQiLCJmaW5kIiwiZ2V0RGF0YSIsImRlZiIsInRpdGxlbm9kZSIsImxldmVsTGFiZWwiLCJuYW1lTGFiZWwiLCJzY29yZUxhYmVsIiwic3RyaW5nIiwiZ2V0TmljayIsImxldmVsIiwibXlzY29yZSIsInNldENvbm5GYWlsSW5mbyIsIm1zZ0xhYmVsIiwicmV0QnV0IiwiYWN0aXZlIiwic2V0QnVmZkRpc3AiLCJidWZmVHlwZSIsInNldFBhcmFtIiwicGFyYW0iLCJ0aW1lc3RhbXAiLCJjdXJUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJzZXRNeUNhcmRzIiwiZGlzcENoYXJTZWxlIiwic3giLCJzeSIsIm14IiwibXkiLCJjYXJkIiwiY2FyZE5vZGUiLCJjb3N0IiwibW92ZVRvIiwiYWxsQ2FyZHMiLCJyb3dJdGVtcyIsInJvd3MiLCJjb2xzIiwiaGVhZCIsImkiLCJsZW5ndGgiLCJfbmFtZSIsInNldFJvbGUiLCJzZWxlUm9sZSIsInJvbGVMZXZlbCIsInYyIiwic2V0UG9zaXRpb24iLCJjaGFyU2VsZSIsInpJbmRleCIsImdhbWVPdmVyUHJvY2Vzc29yIiwiZGF0YSIsIndpbiIsImtpbGxCYXNlcyIsImNsaWNrUHQiLCJwdDEiLCJ1bmRlZmluZWQiLCJzZWxDYXJkIiwidGFyZ2V0IiwieU9mZnNldCIsInB4IiwiTWF0aCIsInJvdW5kIiwicGFyc2VGbG9hdCIsInB5IiwiaWZOb3RNYXNrUm9sZSIsInNob3dNYXNrIiwicHV0Q2xpY2tJdGVtIiwic2VuZFNvZGllciIsImlzVmFsaWRQdXRQb2ludCIsInBvaW50Iiwib25FdmVudEVmZmVjdCIsImJpbmQiLCJzZXRDb3VudERvd24iLCJjb3VudGVyIiwibWluIiwicGFyc2VJbnQiLCJzZWMiLCJ0aW1lTm9kZSIsImNkTm9kZSIsImRvdWJsZU1hZ2ljRGlzcCIsImRpc3Bub2RlIiwic2V0VGltZUNvdW50ZXIiLCJjbnQiLCJnYW1lTm93VGltZSIsInNldE1hZ2ljQmFyIiwiY291bnRfZG93biIsInRlbnMiLCJvbmVzIiwic3RhcnRUcmFjZVRpbWVyIiwiaW50ZXJ2YWwiLCJ0aGVuIiwibm93IiwiZ2FtZV9jeWNsZSIsImdhbWVfY3ljbGVfdGhlbiIsImN5Y2xlX2NudCIsInRyYWNlVGltZXIiLCJkZWx0YSIsImdhbWVfY3ljbGVfZGVsdGEiLCJhYnMiLCJtYWluR2FtZUN5Y2xlIiwic2NoZWR1bGUiLCJhZ2VudHMiLCJidWxsZXRzIiwiYmFzZXMiLCJmb3J0cyIsInJvbGxMb2dzIiwiYWdlbnRzRnV0dXJlIiwiZm9ydHNGdXR1cmUiLCJnYW1lVHJhY2VTdGFjayIsInNoaWZ0IiwicGxheUJ1bGxldHMiLCJwbGF5TG9ncyIsInBsYXlBZ2VudHMiLCJwbGF5QmFzZXMiLCJwbGF5Rm9ydHMiLCJidWxsZXRQcm9jZXNzIiwibG9nUHJvY2VzcyIsImFnZW50UHJvY2VzcyIsImZvcnRQcm9jZXNzIiwiYmFzZVByb2Nlc3MiLCJzdG9wVHJhY2VUaW1lciIsIk1ZX1NPQ0tFVCIsImRpc2Nvbm5lY3QiLCJ1bnNjaGVkdWxlIiwicGxheVNuZCIsInNuZFR5cGUiLCJhdWRpb0VuZ2luZSIsInBsYXkiLCJwbGF5RWZmZWN0IiwiYmQiLCJzY2FsZVgiLCJzY2FsZVkiLCJzdGFydFNjZW5lSml0dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHRCxPQUFPLENBQUMsY0FBRCxDQUExQjs7QUFDQUUsRUFBRSxDQUFDQyxXQUFILEdBQWlCSCxPQUFPLENBQUMsWUFBRCxDQUF4QjtBQUVBRSxFQUFFLENBQUNFLEtBQUgsQ0FBUztBQUNMLGFBQVNILFlBREo7QUFHTEksRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsWUFBWSxFQUFF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LENBQWtCLENBQWxCLENBQWYsQ0FBTDtBQUNBeU0sUUFBQUEsRUFBRSxDQUFDbEgsTUFBSCxHQUFZLElBQVo7QUFDQWtILFFBQUFBLEVBQUUsQ0FBQ25JLENBQUgsR0FBT0EsQ0FBUDtBQUNBbUksUUFBQUEsRUFBRSxDQUFDbEksQ0FBSCxHQUFPQSxDQUFQO0FBQ0EsYUFBSy9DLElBQUwsQ0FBVWdELFFBQVYsQ0FBbUJpSSxFQUFuQjtBQUNILE9BVEksTUFVQSxJQUFHbEosSUFBSSxJQUFJLFNBQVgsRUFBc0I7QUFDdkIsYUFBSzZJLE9BQUwsQ0FBYSxTQUFiO0FBQ0FLLFFBQUFBLEVBQUUsR0FBRzdNLEVBQUUsQ0FBQ3lFLFdBQUgsQ0FBZSxLQUFLckUsWUFBTCxDQUFrQixFQUFsQixDQUFmLENBQUw7QUFDQXlNLFFBQUFBLEVBQUUsQ0FBQ2xILE1BQUgsR0FBWSxJQUFaO0FBQ0FrSCxRQUFBQSxFQUFFLENBQUNuSSxDQUFILEdBQU9BLENBQVA7QUFDQW1JLFFBQUFBLEVBQUUsQ0FBQ2xJLENBQUgsR0FBT0EsQ0FBUDtBQUNBLGFBQUsvQyxJQUFMLENBQVVnRCxRQUFWLENBQW1CaUksRUFBbkI7QUFDSDtBQUNKO0FBcG1CSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG52YXIgY29tbW9uID0gcmVxdWlyZShcIkNvbW1vblwiKTtcbnZhciBnYW1lUHJvdmlkZXIgPSByZXF1aXJlKFwiR2FtZVByb3ZpZGVyXCIpO1xuY2MuX0RpY3Rpb25hcnkgPSByZXF1aXJlKFwiRGljdGlvbmFyeVwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGdhbWVQcm92aWRlcixcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g6L+Z5Liq5bGe5oCn5byV55So5LqG6aKE5Yi26LWE5rqQXG4gICAgICAgIHBsYXllclByZWZhYjoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgYXVkaW9zOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS1jdG9yLS0tLVwiKTtcbiAgICAgICAgdGhpcy5idWZmZXJMZW4gPSAzMDtcbiAgICB9LFxuXG4gICAgZ29iYWNrOiBmdW5jdGlvbiAoZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICB0aGlzLnN5bmNUaW1lb3V0KCk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnd2VsY29tZScpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS1vbkxvYWQtLS0tLS0tLVwiKTtcblxuLypcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB3eC5vblNob3coZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3ggb25zaG93LlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc1NoYXJlZCAmJiBzZWxmLnNoYXJlVGFnID09IFwia2V5c1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJUaW1lIC0gc2VsZi5jbG9zZVRpbWUgPj0gMzAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/liIbkuqvmiJDlip9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr5oiQ5YqfXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmlzU2hhcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuc2hhcmVUYWcgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmNsb3NlVGltZSA9IGN1clRpbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4qL1xuXG4gICAgICAgIHZhciBfcGFyZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5uZXRFcnJEaXNwID0gZmFsc2U7XG4gICAgICAgIHZhciBzaXplID0gY2MudmlzaWJsZVJlY3Q7XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXRSYW5kb21DaGFyTmFtZSgpO1xuICAgICAgICB0aGlzLm5pY2sgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIHRoaXMucmVzdWx0T3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJSZXN1bHRcIikuZ2V0Q29tcG9uZW50KFwiUmVzdWx0XCIpO1xuXG4gICAgICAgIHRoaXMuZ2FtZUNvdW50RG93biA9IDE1MDsgLy8yOjMwXG4gICAgICAgIC8vdXAgdXNlciBvciBkb3duIHVzZXIuXG4gICAgICAgIHRoaXMubWFpblBsYXllciA9IC0xO1xuICAgICAgICB0aGlzLnJvb21JZCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5iYXNlQXR0YWNrRHVyYVJlYyA9IFtdO1xuICAgICAgICB0aGlzLmFnZW50TW92ZVN0ZXBSZWMgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdEJhc2VzID0gW1wiYmFzZTFcIixcImJhc2UyXCIsXCJiYXNlM1wiLFwiYmFzZTRcIixcImJhc2U1XCIsXCJiYXNlNlwiXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZVN0YXJ0VGltZSA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZUN5Y2xlVGltZSA9IDkwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyPWZhbHNlO1xuICAgICAgICB0aGlzLmFkZEp1aWNlID0gMTA7ICAvL2VhY2ggaGVhcnQgYWRkIHVwIHRvIG1hZ2ljIGp1aWNlIGJhclxuXG4gICAgICAgIHRoaXMubnBjSW5mbyA9IG5ldyBjYy5fRGljdGlvbmFyeSgpO1xuICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvID0gbmV3IGNjLl9EaWN0aW9uYXJ5KCk7XG4gICAgICAgIHRoaXMuc2V0VXNlcih0aGlzLmdldFBlcnNpc3RhbnREYXRhKCkpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmFtZTpcIiArIG5hbWUpO1xuICAgICAgICB0aGlzLnNvY2tldEhhbmRsZSh0aGlzLm5pY2spO1xuXG4gICAgICAgIHRoaXMucHV0U2VsZSA9IFtdO1xuICAgICAgICB0aGlzLmRyYWdpbmdJdGVtID0gXCJcIjtcblxuICAgICAgICB0aGlzLmNsaWNrU2VsZSA9IHt9O1xuICAgICAgICB0aGlzLm1hZ2ljQW1vdW50ID0gMDtcblxuICAgICAgICAvL3JlZCBhbGVydCBhcmVhIHNob3VsZCBub3QgYmUgZW50ZXJlZCBieSBoZXJvLlxuICAgICAgICB0aGlzLm1hc2tUeXBlID0gXCJzZWxlTWFzazNcIjtcblxuICAgICAgICB2YXIgY2FudmFzUHQgPSB0aGlzLm5vZGUuX3BhcmVudC5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgbGF5b3V0UHQgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGNub2RlLCBwbDtcbiAgICAgICAgdmFyIG1hZ2ljQ29zdCA9IDA7XG4gICAgICAgIHZhciByb2xlO1xuICAgICAgICB2YXIgc2VsUGFyYW1zLCBzZWxOb2RlO1xuICAgICAgICB2YXIgaW5uZXJJZDtcblxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICBpZihfcGFyZW50LmdhbWVTdGFydFRpbWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwdCA9IHBhcmFtcy5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgX3BhcmVudC5jbGlja1Byb2Nlc3NvcihwdCk7XG4gICAgICAgIH0pO1xuXG4vKlxuICAgICAgICB0aGlzLmxpc3RlbmVyID0gY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuQ1VTVE9NLCAgXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiZXZlbnRfZWZmZWN0XCIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwiZXZlbnQgPSBcIitldmVudC5nZXRVc2VyRGF0YSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih0aGlzLmxpc3RlbmVyLCAxKTtcbiovXG5cbiAgICAgICAgdGhpcy5pbml0RXZlbnRMaXN0ZW5lcigpO1xuXG5cblxuICAgICAgICB2YXIgY3JhYk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyNl0pOyAgICBcbiAgICAgICAgY3JhYk5vZGUueCA9IDEwMDtcbiAgICAgICAgY3JhYk5vZGUueSA9IDEwMDtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGNyYWJOb2RlKTtcblxuXG4gICAgfSxcblxuICAgIGdldFBlcnNpc3RhbnREYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5maW5kKCdHYW1lRGF0YScpLmdldENvbXBvbmVudCgnR2FtZURhdGEnKTtcbiAgICAgICAgcmV0dXJuIG5vZGUuZ2V0RGF0YSgpO1xuICAgIH0sXG5cbiAgICBzZXRVc2VyOiBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5maW5kKCdHYW1lRGF0YScpLmdldENvbXBvbmVudCgnR2FtZURhdGEnKTtcbiAgICAgICAgdmFyIHRpdGxlbm9kZSA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJiYW5uZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKTtcbiAgICAgICAgdmFyIGxldmVsTGFiZWwgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiYmFubmVyXCIpLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbHdvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIHZhciBuYW1lTGFiZWwgPSB0aXRsZW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICB2YXIgc2NvcmVMYWJlbCA9IHRpdGxlbm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuXG4gICAgICAgIG5hbWVMYWJlbC5zdHJpbmcgPSBub2RlLmdldE5pY2soKTtcbiAgICAgICAgbGV2ZWxMYWJlbC5zdHJpbmcgPSBkZWYubGV2ZWw7XG4gICAgICAgIHNjb3JlTGFiZWwuc3RyaW5nID0gZGVmLm15c2NvcmU7XG4gICAgfSxcblxuICAgIHNldENvbm5GYWlsSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubmV0RXJyRGlzcCA9IHRydWU7XG4gICAgICAgIHZhciBtc2dMYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInB1dFdhaXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtc2dcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIHZhciByZXRCdXQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwdXRXYWl0XCIpLmdldENoaWxkQnlOYW1lKFwicmV0QnV0XCIpO1xuICAgICAgICByZXRCdXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbXNnTGFiZWwuc3RyaW5nID0gXCLnvZHnu5zov57mjqXmlq3lvIAhXCI7XG4gICAgfSxcblxuICAgIHNldEJ1ZmZEaXNwOiBmdW5jdGlvbihidWZmVHlwZSkge1xuICAgICAgICB2YXIgY2FudmFzTm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIHRoaXMuYnVmZlR5cGUgPSBidWZmVHlwZTtcbiAgICAgICAgaWYoYnVmZlR5cGUgPT0gXCJoZWFsXCIpIHtcbiAgICAgICAgICAgIGNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidWZmSGVhbFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYnVmZlR5cGUgPT0gXCJ0aHVuZGVyXCIpIHtcbiAgICAgICAgICAgIGNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidWZmVGh1bmRlclwiKS5hY3RpdmUgPSB0cnVlOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuLypcbiAgICBkb0J1ZmY6IGZ1bmN0aW9uKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzc3NzczpcIiArIGN1c3RvbUV2ZW50RGF0YSk7XG4gICAgICAgIHZhciBidWZmVHlwZSA9IGN1c3RvbUV2ZW50RGF0YTtcbiAgICAgICAgaWYoYnVmZlR5cGUgPT0gMSkge1xuICAgICAgICB9XG4gICAgfSxcbiovXG5cbiAgICBzZXRQYXJhbTogZnVuY3Rpb24ocGFyYW0sIHRpbWVzdGFtcCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS1wYXJhbS0tLS1cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtKTtcbiAgICAgICAgY29uc29sZS5sb2codGltZXN0YW1wKTtcblxuICAgICAgICB2YXIgY3VyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZHVyYXRpb246XCIgKyAoY3VyVGltZSAtIHRpbWVzdGFtcCkpO1xuXG4gICAgICAgIHRoaXMuc2V0TXlDYXJkcyhwYXJhbSk7XG4gICAgICAgIHRoaXMuZGlzcENoYXJTZWxlKCk7XG4gICAgfSxcblxuICAgIHNldE15Q2FyZHM6IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgIHZhciBzeCA9IC01MzA7XG4gICAgICAgIHZhciBzeSA9IC0zMzA7XG4gICAgICAgIHZhciBteCwgbXk7XG4gICAgICAgIHZhciBjYXJkLCBjYXJkTm9kZSwgY29zdDtcbiAgICAgICAgdmFyIG1vdmVUbztcbiAgICAgICAgLy92YXIgYWxsQ2FyZHMgPSBbXCJsb2dcIixcImJvbWJcIixcInNrZVwiLFwiaXJcIl07XG4gICAgICAgIHZhciBhbGxDYXJkcyA9IHBhcmFtO1xuICAgICAgICB2YXIgcm93SXRlbXMgPSAwO1xuICAgICAgICB2YXIgcm93cyA9IDA7XG4gICAgICAgIHZhciBjb2xzID0gMDtcbiAgICAgICAgdmFyIGNhbnZhc05vZGUgPSB0aGlzLm5vZGUucGFyZW50O1xuICAgICAgICB2YXIgaGVhZCA9IFwic2VsXCI7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxhbGxDYXJkcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBjYXJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjFdKTtcbiAgICAgICAgICAgIGNhcmQuX25hbWUgPSBoZWFkICsgKGkrMSk7XG4gICAgICAgICAgICBjYXJkTm9kZSA9IGNhcmQuZ2V0Q29tcG9uZW50KCdTZWxDYXJkJyk7XG4gICAgICAgICAgICBpZihhbGxDYXJkc1tpXSkge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAxO1xuICAgICAgICAgICAgICAgIGNhcmROb2RlLnNldFJvbGUoYWxsQ2FyZHNbaV0uc2VsZVJvbGUsIGFsbENhcmRzW2ldLm1hZ2ljQ29zdCwgYWxsQ2FyZHNbaV0ucm9sZUxldmVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90aGlzLm15Q2FyZE5vZGVzLnB1c2goY2FyZE5vZGUpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbHMgPSBpJTY7XG4gICAgICAgICAgICBteCA9IHN4Kyhjb2xzKjEwNSk7XG4gICAgICAgICAgICBteSA9IHN5O1xuICAgICAgICAgICAgbW92ZVRvID0gY2MudjIobXgsIG15KTtcbiAgICAgICAgICAgIGNhcmQuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgICAgIGNhbnZhc05vZGUuYWRkQ2hpbGQoY2FyZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IodmFyIGk9YWxsQ2FyZHMubGVuZ3RoO2k8NjtpKyspIHtcbiAgICAgICAgICAgIGNvbHMgPSBpJTY7XG4gICAgICAgICAgICBteCA9IHN4Kyhjb2xzKjEwNSk7XG4gICAgICAgICAgICBteSA9IHN5O1xuICAgICAgICAgICAgY2FyZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzIyXSk7XG4gICAgICAgICAgICBtb3ZlVG8gPSBjYy52MihteCwgbXkpO1xuICAgICAgICAgICAgY2FyZC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICAgICAgY2FudmFzTm9kZS5hZGRDaGlsZChjYXJkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNwQ2hhclNlbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hhclNlbGUgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiY2hhclNlbGVcIik7XG4gICAgICAgIGNoYXJTZWxlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIGNoYXJTZWxlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFyU2VsZSk7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyUHJvY2Vzc29yOmZ1bmN0aW9uKG1haW5QbGF5ZXIsIGRhdGEpIHtcbiAgICAgICAgaWYobWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICBpZihkYXRhLndpbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJteSB3aW4xMVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtpbGxCYXNlcyhcInVwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihkYXRhLndpbiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJteSBsb3NlMTFcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5raWxsQmFzZXMoXCJkb3duXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobWFpblBsYXllciA9PSAyKSB7XG4gICAgICAgICAgICBpZihkYXRhLndpbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJteSBsb3NlMTFcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5raWxsQmFzZXMoXCJkb3duXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihkYXRhLndpbiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJteSB3aW4xMVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtpbGxCYXNlcyhcInVwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsaWNrUHJvY2Vzc29yOmZ1bmN0aW9uIChjbGlja1B0KSB7XG4gICAgICAgIHZhciBfcGFyZW50ID0gdGhpcztcbiAgICAgIFxuICAgICAgICB2YXIgY2FudmFzUHQgPSB0aGlzLmNhbnZhc05vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGxheW91dFB0ID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBpbm5lcklkO1xuXG4gICAgICAgIC8vbm90ZSB0aGF0IHB0IGlzIHRoZSBwb3N0aW9uIGluIGNhbnZhcyBub2RlLlxuICAgICAgICB2YXIgcHQgPSBjbGlja1B0O1xuICAgICAgICB2YXIgcHQxID0ge307XG5cbiAgICAgICAgdmFyIG1hZ2ljQ29zdCA9IF9wYXJlbnQuY2xpY2tTZWxlLm1hZ2ljQ29zdDtcbiAgICAgICAgdmFyIGxldmVsID0gX3BhcmVudC5jbGlja1NlbGUubGV2ZWw7XG4gICAgICAgIHZhciByb2xlID0gX3BhcmVudC5jbGlja1NlbGUucm9sZTtcblxuICAgICAgICBpZihyb2xlID09PSB1bmRlZmluZWQgfHwgcm9sZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gIFxuXG4gICAgICAgIHZhciBzZWxDYXJkID0gX3BhcmVudC5jbGlja1NlbGUucGFyYW1zLnRhcmdldDtcbiAgICAgICAgdmFyIHNlbE5vZGUgPSBfcGFyZW50LmNsaWNrU2VsZS5ub2RlO1xuXG4gICAgICAgIHZhciBwbCA9IHNlbE5vZGUucGFyZW50LmdldFBvc2l0aW9uKCk7ICAvL3NlbCBjYXJkIG5vZGUuXG4gICAgICAgIHZhciB5T2Zmc2V0PTA7XG5cbiAgICAgICAgaWYoX3BhcmVudC5tYWluUGxheWVyPT0xKSB7XG4gICAgICAgICAgICB5T2Zmc2V0PS0yMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlPZmZzZXQ9NDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL3BvaW50ZXIgcG9zaXRpb25cbiAgICAgICAgcHQxLnggPSAobGF5b3V0UHQueCArIHB0LnggLSBwbC54KS0xMDtcbiAgICAgICAgcHQxLnkgPSAobGF5b3V0UHQueSArIHB0LnkgLSBwbC55KS0oY2FudmFzUHQueSArIGxheW91dFB0LnkpO1xuXG4gICAgICAgIC8vcG9zaXRpb24gaW4gbGF5b3V0XG4gICAgICAgIC8vcHQueCA9IHB0LngvX3BhcmVudC5ub2RlLnNjYWxlWCAtIChjYW52YXNQdC54ICsgbGF5b3V0UHQueCk7XG4gICAgICAgIC8vcHQueSA9IHB0LnkvX3BhcmVudC5ub2RlLnNjYWxlWSAtIChjYW52YXNQdC55ICsgbGF5b3V0UHQueSkgKyB5T2Zmc2V0O1xuXG4gICAgICAgIHB0LnggPSBwdC54IC0gKGNhbnZhc1B0LnggKyBsYXlvdXRQdC54KTtcbiAgICAgICAgcHQueSA9IHB0LnkgLSAoY2FudmFzUHQueSArIGxheW91dFB0LnkpO1xuXG4gICAgICAgIC8vdG9kb1xuICAgICAgICB2YXIgcHggPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQocHQueC8zOCkpO1xuICAgICAgICB2YXIgcHkgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQocHQueS8zOCkpO1xuXG4gICAgICAgIHB0LnggPSBweSotMTtcbiAgICAgICAgcHQueSA9IHB4O1xuXG5jb25zb2xlLmxvZyhcIi0tc2VudCBwdC0tXCIpO1xuY29uc29sZS5sb2cocHQueCArXCI6OjpcIisgcHQueSk7XG5cbiAgICAgICAgaWYoIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayh0aGlzLm1hc2tUeXBlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kb1xuICAgICAgICAvL2lmKCF0aGlzLmlzVmFsaWRQdXRQb2ludChwdCkgJiYgIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImludmFsaWQgcG9zdGlvbi5cIik7XG4gICAgICAgIC8vICAgIHRoaXMucHV0RXJyb3JNc2coKTtcbiAgICAgICAgLy8gICAgcmV0dXJuO1xuICAgICAgICAvL31cblxuICAgICAgICBpbm5lcklkID0gX3BhcmVudC5wdXRDbGlja0l0ZW0oc2VsQ2FyZCwgc2VsTm9kZSwgcHQxKTtcbiAgICAgICAgX3BhcmVudC5zZW5kU29kaWVyKG1hZ2ljQ29zdCwgcm9sZSwgcHQsIGlubmVySWQsIGxldmVsKTtcbiAgICB9LFxuXG4gICAgaXNWYWxpZFB1dFBvaW50OiBmdW5jdGlvbihwb2ludCkge1xuICAgICAgICB2YXIgcHQgPSB7fTtcbiAgICAgICAgcHQueCA9IHBvaW50Lng7XG4gICAgICAgIHB0LnkgPSBwb2ludC55O1xuICAgICAgICBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgcHQueSA9IHBvaW50LnktNDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1hc2tUeXBlID09IFwic2VsZU1hc2sxXCIpIHtcbiAgICAgICAgICAgIGlmKHB0LnggPj0gMzAgJiYgcHQueCA8PSA1NzAgJiYgcHQueSA+IDAgJiYgcHQueSA8IDY1MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLm1hc2tUeXBlID09IFwic2VsZU1hc2sxMlwiKSB7XG4gICAgICAgICAgICBpZigocHQueCA+PSAzMCAmJiBwdC54IDw9IDU3MCAmJiBwdC55ID4gMCAmJiBwdC55IDwgNDIwKSB8fCAocHQueCA+PSAyODUgJiYgcHQueCA8PSA1NzAgJiYgcHQueSA+IDQyMCAmJiBwdC55IDwgNjUwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLm1hc2tUeXBlID09IFwic2VsZU1hc2sxM1wiKSB7XG4gICAgICAgICAgICBpZigocHQueCA+PSAzMCAmJiBwdC54IDw9IDU3MCAmJiBwdC55ID4gMCAmJiBwdC55IDwgNDIwKSB8fCAocHQueCA+PSAzMCAmJiBwdC54IDw9IDI4NSAmJiBwdC55ID4gNDIwICYmIHB0LnkgPCA2NTApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMubWFza1R5cGUgPT0gXCJzZWxlTWFzazNcIikge1xuICAgICAgICAgICAgaWYocHQueCA+PSAzMCAmJiBwdC54IDw9IDU3MCAmJiBwdC55ID4gMCAmJiBwdC55IDwgNDIwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGlmTm90TWFza1JvbGU6IGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgIGlmKHJvbGUgPT0gXCJib21iXCIgfHwgcm9sZSA9PSBcInRodW5kZXJcIiAgfHwgcm9sZSA9PSBcImhlYWxcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBpbml0RXZlbnRMaXN0ZW5lcjpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihcImV2ZW50X2VmZmVjdFwiLCB0aGlzLm9uRXZlbnRFZmZlY3QuYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIG9uRXZlbnRFZmZlY3Q6ZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGlzdGVuaW5nIGVmZmVjdCBsb2FkZWQuLi4uXCIpO1xuICAgIH0sXG5cbiAgICBzZXRDb3VudERvd246ZnVuY3Rpb24oY291bnRlcikge1xuICAgICAgICB2YXIgbWluID0gcGFyc2VJbnQoY291bnRlci82MCk7XG4gICAgICAgIHZhciBzZWMgPSBjb3VudGVyJTYwO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG1pbiArXCI6XCIrIHNlYyk7XG4gICAgICAgIHZhciB0aW1lTm9kZSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhbm5lclwiKS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIik7XG4gICAgICAgIHZhciBjZE5vZGUgPSB0aW1lTm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvdW50RG93blwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgaWYoc2VjPDEwKSB7XG4gICAgICAgICAgICBzZWMgPSBcIjBcIiArIHNlYztcbiAgICAgICAgfVxuICAgICAgICBjZE5vZGUuc3RyaW5nID0gKG1pbiArXCI6XCIrIHNlYyk7XG4gICAgfSxcblxuICAgIGRvdWJsZU1hZ2ljRGlzcDpmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3Bub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZG91YmxlTWFnaWNcIik7XG4gICAgICAgIGRpc3Bub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHNldFRpbWVDb3VudGVyOmZ1bmN0aW9uKGNudCkge1xuICAgICAgICAvL3VzZSB0byBjb21wYXJlIGlmIHRpbWVvdXQsIG9ubHkgZm9yIHBrIG1vZGUuXG4gICAgICAgIHRoaXMuZ2FtZU5vd1RpbWUgPSBjbnQ7XG4gICAgICAgIHRoaXMuc2V0Q291bnREb3duKGNudCk7XG4gICAgICAgIGlmKGNudCA9PSA2MCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYWdpYyBjaGFyZ2Ugc3BlZWQgdXBcIik7XG4gICAgICAgICAgICB0aGlzLmRvdWJsZU1hZ2ljRGlzcCgpO1xuICAgICAgICAgICAgdGhpcy5hZGRKdWljZSA9IDIwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRNYWdpY0JhcigpO1xuXG4gICAgICAgIC8vY291bnRlcjEuc2V0U3ByaXRlRnJhbWUoY2Muc3ByaXRlRnJhbWVDYWNoZS5nZXRTcHJpdGVGcmFtZShcIm51bV84LnBuZ1wiKSk7XG4gICAgICAgIC8vMyBzZWNvbmQgaXMgdGhlIGFpIHBhZ2UgbG9hZGluZyB0aW1lLlxuICAgICAgICB2YXIgY291bnRfZG93biA9IHRoaXMuZ2FtZUN5Y2xlVGltZS1jbnQ7XG5cbiAgICAgICAgaWYoY291bnRfZG93bjwwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyPXRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGVucyA9IHBhcnNlSW50KGNvdW50X2Rvd24vMTApO1xuICAgICAgICB2YXIgb25lcyA9IGNvdW50X2Rvd24lMTA7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0ZW5zICtcIjo6OlwiKyBvbmVzKTtcbiAgICB9LFxuXG4gICAgc3RhcnRUcmFjZVRpbWVyOmZ1bmN0aW9uKCkge1xuICAgICAgICAvL3JlZmVyIHRvIHNlcnZlciBpbnRlcnZhbCBzZXR0aW5nLCBtdXN0IGEgbGl0dGxlIHNob3J0ZXIgdGhhbiB0aGF0IGluIHNlcnZlclxuICAgICAgICB0aGlzLmludGVydmFsID0gMzA7XG4gICAgICAgIHZhciB0aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIF9wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAgIC8vIDMwIG1pbmkgc2Vjb25kcyBhIGdhbWUgY3ljbGUuXG4gICAgICAgIHZhciBnYW1lX2N5Y2xlID0gdGhpcy5nYW1lQ3ljbGVUaW1lKjEwMDA7IFxuICAgICAgICB2YXIgZ2FtZV9jeWNsZV90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIGN5Y2xlX2NudCA9IDA7XG5cbiAgICAgICAgaWYoIXRoaXMudHJhY2VUaW1lcikge1xuICAgICAgICAgICAgdGhpcy50cmFjZVRpbWVyID0gZnVuY3Rpb24oKSB7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgICAgICAvL3doZW4gbmV0IHRyYWZmaWMgaGFwcGVuZWQsIGlkbGUgZm9yIDUncyB3aWxsIGhhbHRcbiAgICAgICAgICAgICAgICAvL25vdCB0ZXN0ZWQgeWV0LlxuICAgICAgICAgICAgICAgIHZhciBnYW1lX2N5Y2xlX2RlbHRhID0gbm93IC0gX3BhcmVudC5nYW1lU3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIC8vIGlmIHdpdGhpbiBnYW1lIGN5Y2xlIHRpbWVcbiAgICAgICAgICAgICAgICBpZighX3BhcmVudC5nYW1lT3ZlciAmJiBnYW1lX2N5Y2xlX2RlbHRhID4gY3ljbGVfY250KjEwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY3ljbGVfY250Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm8gcmVzcG9uc2UgZm9yIDVzLCB0aGVuIHRpbWVvdXRcbiAgICAgICAgICAgICAgICAgICAgaWYoTWF0aC5hYnMoY3ljbGVfY250LV9wYXJlbnQuZ2FtZU5vd1RpbWUpID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZGVsdGE+X3BhcmVudC5pbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhJV9wYXJlbnQuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50Lm1haW5HYW1lQ3ljbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMudHJhY2VUaW1lciwwKTtcbiAgICB9LFxuXG4gICAgbWFpbkdhbWVDeWNsZTpmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9wYXJlbnQgPSB0aGlzO1xuICAgICAgICB2YXIgZGF0YSxhZ2VudHMsYnVsbGV0cyxiYXNlcyxmb3J0cyxyb2xsTG9ncyxhZ2VudHNGdXR1cmUsZm9ydHNGdXR1cmU7XG5cbiAgICAgICAgaWYodGhpcy5nYW1lVHJhY2VTdGFjay5sZW5ndGggPiB0aGlzLmJ1ZmZlckxlbikge1xuICAgICAgICAgICAgdGhpcy5nYW1lVHJhY2VTdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZ2FtZVRyYWNlU3RhY2tbMF07XG4gICAgICAgICAgICAvL2RhdGEgPSB0aGlzLmdhbWVUcmFjZVN0YWNrW3RoaXMuZ2FtZVRyYWNlU3RhY2subGVuZ3RoIC0gMTBdO1xuICAgICAgICAgICAgYWdlbnRzID0gZGF0YS5hZ2VudHM7XG4gICAgICAgICAgICBhZ2VudHNGdXR1cmUgPSB0aGlzLmdhbWVUcmFjZVN0YWNrWzI5XS5hZ2VudHM7XG4gICAgICAgICAgICBmb3J0c0Z1dHVyZSA9IHRoaXMuZ2FtZVRyYWNlU3RhY2tbMjldLmZvcnRzO1xuICAgICAgICAgICAgYnVsbGV0cyA9IGRhdGEuYnVsbGV0cztcbiAgICAgICAgICAgIGJhc2VzID0gZGF0YS5iYXNlcztcbiAgICAgICAgICAgIGZvcnRzID0gZGF0YS5mb3J0cztcbiAgICAgICAgICAgIHJvbGxMb2dzID0gZGF0YS5yb2xsTG9ncztcblxuICAgICAgICAgICAgX3BhcmVudC5wbGF5QnVsbGV0cyhidWxsZXRzKTtcbiAgICAgICAgICAgIF9wYXJlbnQucGxheUxvZ3Mocm9sbExvZ3MpO1xuXG4gICAgICAgICAgICBfcGFyZW50LnBsYXlBZ2VudHMoYWdlbnRzLCBhZ2VudHNGdXR1cmUpO1xuICAgICAgICAgICAgX3BhcmVudC5wbGF5QmFzZXMoYmFzZXMpO1xuICAgICAgICAgICAgX3BhcmVudC5wbGF5Rm9ydHMoZm9ydHMpO1xuXG4gICAgICAgICAgICBfcGFyZW50LmJ1bGxldFByb2Nlc3MoYnVsbGV0cyk7XG4gICAgICAgICAgICBfcGFyZW50LmxvZ1Byb2Nlc3Mocm9sbExvZ3MpO1xuICAgICAgICAgICAgX3BhcmVudC5hZ2VudFByb2Nlc3MoYWdlbnRzKTtcbiAgICAgICAgICAgIF9wYXJlbnQuZm9ydFByb2Nlc3MoZm9ydHMsIGZvcnRzRnV0dXJlKTtcbiAgICAgICAgICAgIF9wYXJlbnQuYmFzZVByb2Nlc3MoYmFzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy92YXIgZXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oXCJldmVudF9lZmZlY3RcIiwgdHJ1ZSk7XG4gICAgICAgIC8vZXZlbnQuZGV0YWlsID0gXCIxMjNcIjtcbiAgICAgICAgLy90aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSxcblxuICAgIHN5bmNUaW1lb3V0OmZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWVPdmVyPXRydWU7XG4gICAgICAgIHRoaXMuc3RvcFRyYWNlVGltZXIoKTtcbiAgICAgICAgTVlfU09DS0VULmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIue9kee7nOaWreW8gFwiKTtcbiAgICAgICAgLy90aGlzLmdvUHJldmlvdXMoKTsgICAgICAgICAgICAgICAgIFxuICAgIH0sXG5cbiAgICBzdG9wVHJhY2VUaW1lcjpmdW5jdGlvbigpIHtcbiAgICAgICAgaWYodGhpcy50cmFjZVRpbWVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy50cmFjZVRpbWVyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5U25kOmZ1bmN0aW9uKHNuZFR5cGUpIHtcbiAgICAgICAgaWYoc25kVHlwZSA9PSBcImJhc2VcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1swXSwgZmFsc2UsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcImZpcmVTZW5kXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbMV0sIGZhbHNlLCAxKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwiYm9tYlwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzJdLCBmYWxzZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwic2tlXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbM10sIGZhbHNlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJoclwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzRdLCBmYWxzZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwibHJcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1s1XSwgZmFsc2UsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcImdpXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbNl0sIGZhbHNlLCAxKTtcbiAgICAgICAgfSAgXG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcInB1dDFcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1s3XSwgZmFsc2UsIDEpO1xuICAgICAgICB9ICBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzJdLCBmYWxzZSwgMSk7XG4gICAgICAgIH0gIFxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJsbVwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzhdLCBmYWxzZSwgMSk7XG4gICAgICAgIH0gIFxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJndW5cIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1s5XSwgZmFsc2UsIDEpO1xuICAgICAgICB9ICBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwidGh1bmRlclwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzEwXSwgZmFsc2UsIDEpO1xuICAgICAgICB9ICBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwiaGVhbFwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzExXSwgZmFsc2UsIDEpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJsb2dcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1sxMl0sIGZhbHNlLCAxKTtcbiAgICAgICAgfSBcbiAgICB9LFxuXG4gICAgcGxheUVmZmVjdDogZnVuY3Rpb24ocm9sZSwgeCwgeSkge1xuICAgICAgICB2YXIgYmQ7XG4gICAgICAgIC8vcGxheSBlZmZlY3QuXG4gICAgICAgIC8vc2hvdWxkIGRlc3Ryb3kgd2hlbiBmaW5pc2guXG4gICAgICAgIGlmKHJvbGUgPT0gXCJoclwiKSB7XG4gICAgICAgICAgICBiZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzEzXSk7XG4gICAgICAgICAgICBiZC54ID0geDtcbiAgICAgICAgICAgIGJkLnkgPSB5KzIwO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZihyb2xlID09IFwibG1cIikge1xuICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwibG1cIik7XG4gICAgICAgICAgICBiZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzE1XSk7XG4gICAgICAgICAgICBiZC54ID0geDtcbiAgICAgICAgICAgIGJkLnkgPSB5LTQwO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJiYXNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNuZChcImJhc2VcIik7XG4gICAgICAgICAgICBiZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzEwXSk7XG4gICAgICAgICAgICBiZC54ID0geDtcbiAgICAgICAgICAgIGJkLnkgPSB5O1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJkKTtcbiAgICAgICAgfVxuICAgICAgICAvL2ZvcnRBXG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImZhXCIpIHtcbiAgICAgICAgICAgIGJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTBdKTtcbiAgICAgICAgICAgIGJkLnggPSB4O1xuICAgICAgICAgICAgYmQueSA9IHk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImxvZ1wiKSB7XG4gICAgICAgICAgICBiZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzEwXSk7XG4gICAgICAgICAgICBiZC5zY2FsZVggPSAwLjg7XG4gICAgICAgICAgICBiZC5zY2FsZVkgPSAwLjg7XG4gICAgICAgICAgICBiZC54ID0geCsxMDtcbiAgICAgICAgICAgIGJkLnkgPSB5O1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJib21iXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNuZChcImJvbWJcIik7XG4gICAgICAgICAgICAvL3NoYWtlIHRoZSBzY3JlZW5cbiAgICAgICAgICAgIHRoaXMuc3RhcnRTY2VuZUppdHRlcigpO1xuICAgICAgICAgICAgYmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYls2XSk7XG4gICAgICAgICAgICBiZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgYmQueCA9IHg7XG4gICAgICAgICAgICBiZC55ID0geTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJ3aXpmaXJlXCIpO1xuICAgICAgICAgICAgYmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxOV0pO1xuICAgICAgICAgICAgYmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJkLnggPSB4O1xuICAgICAgICAgICAgYmQueSA9IHk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYmQpO1xuICAgICAgICB9XG4gICAgfSxcblxufSk7XG4iXX0=