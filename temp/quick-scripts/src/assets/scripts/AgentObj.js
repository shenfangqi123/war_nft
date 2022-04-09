"use strict";
cc._RF.push(module, 'de37fFOB2lBv76OrGfwhKh/', 'AgentObj');
// scripts/AgentObj.js

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
  properties: {// foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  setTotalLife: function setTotalLife(val) {
    this.totalLife = val;
  },
  setLife: function setLife(val) {
    this.life = val; //this.setBloodBar(val);

    var bloodNode = this.blood.getComponent("BloodBar");
    bloodNode.setBloodBar(this.life, this.totalLife);
  },
  setGroupKill: function setGroupKill(val) {
    this.groupKill = val;
  },
  setBloodLevel: function setBloodLevel(val) {},
  setBlood: function setBlood(blood) {
    this.blood = blood;
    this.blood.active = true;
  } // update (dt) {},

});

cc._RF.pop();