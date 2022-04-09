"use strict";
cc._RF.push(module, '3de4fjEQ25MUY1HJMfSTEZQ', 'Word3Sprite');
// scripts/Word3Sprite.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
  start: function start() {
    this.node.active = true;
  },
  endCounter: function endCounter() {
    this.node.active = false;
    this.getLayoutOp().setGameStartTime();
  },
  getLayoutOp: function getLayoutOp() {
    return this.node.parent.getComponent('Game');
  } // update (dt) {},

});

cc._RF.pop();