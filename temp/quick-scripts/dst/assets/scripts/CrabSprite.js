
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CrabSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NyYWJTcHJpdGUuanMiXSwibmFtZXMiOlsibXlTcHJpdGUiLCJyZXF1aXJlIiwiY29tbW9uIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyb2xlIiwiYW5pVHlwZSIsInN0YXJ0IiwicmVtb3ZlIiwiYmxvb2QiLCJkZXN0cm95Iiwibm9kZSIsInBsYXlBbmkiLCJhZ2VudCIsImFnZW50RnV0dXJlIiwiaXNNYWluUGxheWVyIiwicGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTSixRQURKO0FBR0xLLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUMsTUFERztBQUVSQyxJQUFBQSxPQUFPLEVBQUM7QUFGQSxHQUhQO0FBUUxDLEVBQUFBLEtBUkssbUJBUUksQ0FDTDtBQUNBO0FBQ0gsR0FYSTtBQWFMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZjtBQUNBO0FBQ0EsU0FBS0MsS0FBTCxDQUFXQyxPQUFYO0FBQ0EsU0FBS0MsSUFBTCxDQUFVRCxPQUFWO0FBQ0gsR0FsQkk7QUFvQkxFLEVBQUFBLE9BQU8sRUFBRSxpQkFBU0MsS0FBVCxFQUFnQkMsV0FBaEIsRUFBNkJDLFlBQTdCLEVBQTJDO0FBQ2hELFNBQUtDLHdCQUFMLENBQThCSCxLQUE5QixFQUFxQ0MsV0FBckMsRUFBa0RDLFlBQWxEO0FBQ0g7QUF0QkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15U3ByaXRlID0gcmVxdWlyZShcIk15U3ByaXRlXCIpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBteVNwcml0ZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZTpcImNyYWJcIixcbiAgICAgICAgYW5pVHlwZTpcImRyYWdvblwiLFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vdGhpcy5fYW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgLy90aGlzLl9hbmltYXRpb24uV3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Mb29wO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMlwiKTtcbiAgICAgICAgLy90aGlzLnNoYWRvdy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYmxvb2QuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBwbGF5QW5pOiBmdW5jdGlvbihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcikge1xuICAgICAgICB0aGlzLnBsYXlBbmdsZUFuaW1hdGlvblJlbW90ZShhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcik7XG4gICAgfSxcblxufSk7XG4iXX0=