"use strict";
cc._RF.push(module, '0189eXSyXxOPI5EXmXLbFek', 'LogSprite');
// scripts/LogSprite.js

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
    role: "log"
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this._animation = this.getComponent(cc.Animation);
    this._animation.WrapMode = cc.WrapMode.Default;
  },
  setId: function setId(aid) {
    this.aid = aid;
  },
  setShadow: function setShadow(shadow) {
    this.shadow = shadow;
    this.shadow.active = true;
  },
  frame1Evt: function frame1Evt() {
    this.dispShadow();
  },
  frame2Evt: function frame2Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 20);
    this.shadow.setPosition(moveTo);
  },
  frame3Evt: function frame3Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 20);
    this.shadow.setPosition(moveTo);
  },
  frame4Evt: function frame4Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 5);
    this.shadow.setPosition(moveTo);
  },
  frame5Evt: function frame5Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 5);
    this.shadow.setPosition(moveTo);
  },
  frame6Evt: function frame6Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 5);
    this.shadow.setPosition(moveTo);
  },
  frame7Evt: function frame7Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 10);
    this.shadow.setPosition(moveTo);
  },
  frame8Evt: function frame8Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 10);
    this.shadow.setPosition(moveTo);
  },
  frame9Evt: function frame9Evt() {
    this.dispShadow();
    var np = this.shadow.getPosition();
    var moveTo = cc.v2(np.x, np.y - 10);
    this.shadow.setPosition(moveTo);
    this.play();
  },
  frame11Evt: function frame11Evt() {
    this.dispShadow(); //since 2.1.1 setRotation is desperated.

    this.shadow.angle = 2; //this.shadow.setRotation(-2);
  },
  frame12Evt: function frame12Evt() {
    this.dispShadow();
    this.shadow.angle = 3; //this.shadow.setRotation(3);
  },
  frame13Evt: function frame13Evt() {
    this.dispShadow();
    this.shadow.angle = 3; //this.shadow.setRotation(-3);
  },
  frame14Evt: function frame14Evt() {
    this.dispShadow();
    this.shadow.angle = -2; //this.shadow.setRotation(2);
  },
  frame15Evt: function frame15Evt() {
    this.dispShadow();
    this.shadow.angle = 3; //this.shadow.setRotation(-3);
  },
  frame16Evt: function frame16Evt() {
    this.dispShadow();
    this.shadow.angle = -2; //this.shadow.setRotation(2);
  },
  move: function move(mypos) {
    var px, py, moveTo;
    px = mypos.x * 30;
    py = mypos.y * 30;
    moveTo = cc.v2(px, py); //1000:agent, 999:this bullet 998:forts;
    //make bullet display under agent which is at same position.
    //this.node.zIndex = 999+parseInt(32-mypos.y);

    this.node.zIndex = 2001;
    this.node.setPosition(moveTo);
    this.updateShadow(mypos);
  },
  updateShadow: function updateShadow(mypos) {
    var px, py, moveTo;
    px = mypos.x * 30 + 20;
    py = mypos.y * 30;
    moveTo = cc.v2(px, py);

    if (this.shadow) {
      this.shadow.setPosition(moveTo);
    }

    return;
  },
  remove: function remove() {
    this.shadow.destroy();
    this.node.destroy();
  },
  play: function play() {
    this._animation.play("rollingLog");
  },
  shadowForAgent: function shadowForAgent() {
    var shadowObj = cc.instantiate(this.playerPrefab[2]); // 将新增的节点添加到 Canvas 节点下面

    shadowObj.active = false;
    this.node.addChild(shadowObj);
    return shadowObj;
  },
  dispShadow: function dispShadow() {
    //shadow object may not ready in init() when playing
    if (!this.shadow) return;
    var shadowNode = this.shadow;
    var frameImg = "log_shadow/logShadow";
    this.shadow.active = true;
    cc.loader.loadRes(frameImg, cc.SpriteFrame, function (err, spriteFrame) {
      if (shadowNode) {
        try {
          if (shadowNode._name != "") {
            shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          }
        } catch (e) {
          console.log(shadowNode);
          console.log(e);
        }
      }
    });
  } // update (dt) {},

});

cc._RF.pop();