"use strict";
cc._RF.push(module, '8ba670SxMdMZZPZ9uRjICLu', 'LightmanSprite');
// scripts/LightmanSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "lm"
  },
  start: function start() {
    this.layoutOp = this.node.parent.getComponent('Game');
  },
  getAttackDistance: function getAttackDistance(agent) {
    this.attactDistance = (agent.size + agent.esize) * 0.5 * 1.2;
    return this.attactDistance;
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.tkx = agent.enemypos.x * 30;
    this.tky = agent.enemypos.y * 30;
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  remove: function remove() {
    this._animation.play("dieoff1");

    this.shadow.destroy();
    this.blood.destroy();
  },
  playEffect: function playEffect() {
    // attack action will take some time while target enemy may dead, and will locate to another emeny.
    // and the effect will show on that enemy. to avoid that, try to judge if the effect is very far away from current position.
    var p1 = cc.v2(this.node.x, this.node.y);
    var p2 = cc.v2(this.tkx, this.tky);
    var distance = p1.sub(p2).mag();

    if (distance < this.attactDistance * 30 * 2) {
      this.layoutOp.playEffect("lm", this.tkx, this.tky);
    }
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
  aFrame1Evt: function aFrame1Evt() {
    this.attacking = true;
    this.dispShadow(2);
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(4);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  aFrame6Evt: function aFrame6Evt() {
    this.dispShadow(7);
    this.playEffect();
    this.attacking = false;
  } // update (dt) {},

});

cc._RF.pop();