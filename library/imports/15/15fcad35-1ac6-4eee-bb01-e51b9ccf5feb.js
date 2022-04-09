"use strict";
cc._RF.push(module, '15fca01GsZO7rsB5Rucz1/r', 'Order9Sprite');
// scripts/Order9Sprite.js

"use strict";

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
  onLoad: function onLoad() {
    //var mynode = cc.find("Canvas/layout/ske2/shadow");
    //mynode.zIndex = 1;
    this.node.zIndex = 9;
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();