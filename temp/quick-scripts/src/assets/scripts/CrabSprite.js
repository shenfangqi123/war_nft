"use strict";
cc._RF.push(module, 'cfed1qAsaRDDJLy2rBJpE11', 'CrabSprite');
// scripts/CrabSprite.js

"use strict";

var mySprite = require("MySprite");

var common = require("Common");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "crab",
    aniType: "dragon"
  },
  start: function start() {//this._animation = this.getComponent(cc.Animation);
    //this._animation.WrapMode = cc.WrapMode.Loop;
  },
  remove: function remove() {
    //this._animation.play("dieoff2");
    //this.shadow.destroy();
    this.blood.destroy();
    this.node.destroy();
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationRemote(agent, agentFuture, isMainPlayer);
  }
});

cc._RF.pop();