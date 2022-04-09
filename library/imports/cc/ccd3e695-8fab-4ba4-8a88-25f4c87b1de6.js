"use strict";
cc._RF.push(module, 'ccd3eaVj6tLpIqIJfTIex3m', 'Result');
// scripts/Result.js

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
cc.Class({
  "extends": cc.Component,
  properties: {
    win: 0,
    flagNum: 2,
    score: 0,
    boxType: 1
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.node.zIndex = 9999;
  },
  show: function show() {
    this.node.active = true;
    this.setTitle(); //this.setFlag();

    this.setScore(); //this.setBox();
  },
  setResultValue: function setResultValue(mainPlayer, data) {
    var gameDataNode = this.getPersistantNode();
    var agentsDef = gameDataNode.getData();
    var basescore = agentsDef.basescore;

    if (mainPlayer == 1) {
      if (data.win == 1) {
        console.log("my win");
        this.win = 1;
        this.flagNum = data.upk;
      } else if (data.win == 0) {
        console.log("my lose");
        this.win = 0;
        this.flagNum = data.upk;
      } else if (data.win == 2) {
        console.log("even");
        this.win = 2;
        this.flagNum = data.upk;
      }
    } else if (mainPlayer == 2) {
      if (data.win == 1) {
        console.log("my lose");
        this.win = 0;
        this.flagNum = data.dnk;
      } else if (data.win == 0) {
        console.log("my win");
        this.win = 1;
        this.flagNum = data.dnk;
      } else if (data.win == 2) {
        console.log("even");
        this.win = 2;
        this.flagNum = data.dnk;
      }
    }

    if (this.win == 1 || this.win == 2) {
      this.score = this.flagNum * basescore;
      gameDataNode.winScore(this.score);
    } else {
      gameDataNode.setUpgrade(false);
    }
  },
  getPersistantNode: function getPersistantNode(param) {
    var node = cc.find('GameData').getComponent('GameData');
    return node;
  },
  setTitle: function setTitle() {
    var titleNode = this.node.getChildByName("winnerTxt").getComponent("cc.Label");

    if (this.win == 1) {
      titleNode.string = "胜利！";
    } else if (this.win == 0) {
      titleNode.string = "失败！";
    } else if (this.win == 2) {
      titleNode.string = "平局！";
    }
  },
  setFlag: function setFlag() {
    var header = "flag";
    var flagName, flagNode;

    for (var i = 1; i <= 3; i++) {
      flagName = header + i;
      flagNode = this.node.getChildByName("killed").getChildByName(flagName);
      flagNode.active = false;

      if (i <= this.flagNum) {
        flagNode.active = true;
      }
    }
  },
  setScore: function setScore() {
    var scoreNode = this.node.getChildByName("goldStar").getChildByName("goldTxt").getComponent("cc.Label");
    scoreNode.string = "+" + this.score;
  },
  setBox: function setBox() {
    var boxNode = this.node.getChildByName("boxFrame").getChildByName("boxInfo").getComponent("cc.Label");

    if (this.boxType == 1) {
      boxNode.string = "普通宝箱";
    } else if (this.boxType == 2) {
      boxNode.string = "高级宝箱";
    } else if (this.boxType == 3) {
      boxNode.string = "超级宝箱";
    }
  },
  test: function test(event, customEventData) {
    console.log("clicked...");
    this.node.active = false;
    cc.director.loadScene('menu');
  } // update (dt) {},

});

cc._RF.pop();