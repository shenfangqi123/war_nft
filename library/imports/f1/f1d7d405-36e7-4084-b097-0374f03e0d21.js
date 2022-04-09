"use strict";
cc._RF.push(module, 'f1d7dQFNudAhLCXA3TwPg0h', 'HeroSprite');
// scripts/HeroSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "hr"
  },
  start: function start() {
    this.layoutOp = this.node.parent.getComponent('Game');
  },
  shootArrow: function shootArrow() {},
  getAttackDistance: function getAttackDistance(agent) {
    return (agent.size + agent.esize) * 0.5 * 1.2;
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  remove: function remove() {
    this._animation.play("dieoff1");

    this.shadow.destroy();
    this.blood.destroy();
  },
  playEffect: function playEffect() {
    this.layoutOp.playEffect("hr", this.node.x, this.node.y);
  },
  removeEffect: function removeEffect() {},
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
  },
  //----usual attack-------
  aFrame1Evt: function aFrame1Evt() {
    this.attacking = true;
    this.dispShadow(2);
    this.layoutOp.playSnd("hr");
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(4);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  aFrame6Evt: function aFrame6Evt() {
    this.dispShadow(7);
    this.attacking = false;
  },
  //----spin attack effect included------
  aFrame11Evt: function aFrame11Evt() {
    this.attacking = true;
    this.dispShadow(2);
    this.playEffect();
  },
  aFrame12Evt: function aFrame12Evt() {},
  aFrame13Evt: function aFrame13Evt() {
    this.dispShadow(4);
  },
  aFrame14Evt: function aFrame14Evt() {},
  aFrame15Evt: function aFrame15Evt() {},
  aFrame16Evt: function aFrame16Evt() {
    this.dispShadow(7);
    this.attacking = false;
  } // update (dt) {},

});

cc._RF.pop();