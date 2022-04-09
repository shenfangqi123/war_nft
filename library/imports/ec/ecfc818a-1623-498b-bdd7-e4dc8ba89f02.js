"use strict";
cc._RF.push(module, 'ecfc8GKFiNJi73X5NyLqJ8C', 'BombScript');
// scripts/BombScript.js

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
  init: function init() {},
  start: function start() {},
  // update (dt) {},
  //ske clip ske_bomb, foot print start evt
  footPrint: function footPrint() {},
  playBombEffect: function playBombEffect() {},
  //ske clip ske_bomb, called by first frame of ske_bomb
  beforeKill: function beforeKill() {},
  //ske clip ske_bomb, called by last frame of ske_bomb
  afterKill: function afterKill() {
    console.log("--remove bomb node--");
    this.node.destroy();
  }
});

cc._RF.pop();