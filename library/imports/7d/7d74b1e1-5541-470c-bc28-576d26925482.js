"use strict";
cc._RF.push(module, '7d74bHhVUFHDLwoV20mklSC', 'SkeSprite');
// scripts/SkeSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: ""
  },
  start: function start() {},
  shootArrow: function shootArrow() {},
  getAttackDistance: function getAttackDistance(agent) {
    return (agent.size + agent.esize) * 0.5 * 1.2;
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  remove: function remove() {
    this._animation.play("dieoff2");

    this.shadow.destroy();
    this.blood.destroy();
  },
  dieStart: function dieStart() {},
  dieEnd: function dieEnd() {
    this._animation.play("footprint");
  },
  //ske clip ske_bomb, foot print start evt
  footStart: function footStart() {
    this.node.zIndex = -1;
    this.node.scaleX = 1;
    this.node.scaleY = 1;
  },
  footEnd: function footEnd() {
    this.node.destroy();
  },
  //ske clip ske_bomb, called by first frame of ske_bomb
  beforeKill: function beforeKill() {//this.shadow.destroy();
  },
  //ske clip ske_bomb, called by last frame of ske_bomb
  afterKill: function afterKill() {
    this.node.destroy();
  },
  aFrame1Evt: function aFrame1Evt() {
    this.layoutOp.playSnd("ske");
  },
  frame1Evt: function frame1Evt() {
    this.dispShadow(1);
  },
  frame2Evt: function frame2Evt() {
    this.dispShadow(2);
  },
  frame3Evt: function frame3Evt() {
    this.dispShadow(3);
  },
  frame4Evt: function frame4Evt() {
    this.dispShadow(4);
  },
  frame5Evt: function frame5Evt() {
    this.dispShadow(5);
  },
  frame6Evt: function frame6Evt() {
    this.dispShadow(6);
  },
  frame7Evt: function frame7Evt() {
    this.dispShadow(7);
  } // update (dt) {},

});

cc._RF.pop();