"use strict";
cc._RF.push(module, '06cfaN7txBFkqJqizTWDtk1', 'GiantSprite');
// scripts/GiantSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "gi"
  },
  // onLoad () {},
  start: function start() {
    //this._animation = this.getComponent(cc.Animation);
    //this._animation.WrapMode = cc.WrapMode.Loop;
    this.shadow.scaleX = 1.2;
    this.shadow.scaleY = 1.2;
  },
  getAttackDistance: function getAttackDistance(agent) {
    return (agent.size + agent.esize) * 0.5 * 1.5;
  },
  remove: function remove() {
    //this.getChildByName("blood").active = false;
    this._animation.play("dieoff1");

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
  },
  footEnd: function footEnd() {
    this.node.destroy();
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  frame1Evt: function frame1Evt() {
    this.dispShadow(1);
    this.shadow.zIndex = -1;
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
  aFrame1Evt: function aFrame1Evt() {
    this.dispShadow(2);
    this.layoutOp.playSnd("gi");
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(4);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  aFrame6Evt: function aFrame6Evt() {
    this.dispShadow(7);
  } // update (dt) {},

});

cc._RF.pop();