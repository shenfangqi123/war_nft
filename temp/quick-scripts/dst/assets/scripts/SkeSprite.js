
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/SkeSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1NrZVNwcml0ZS5qcyJdLCJuYW1lcyI6WyJteVNwcml0ZSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsInNob290QXJyb3ciLCJnZXRBdHRhY2tEaXN0YW5jZSIsImFnZW50Iiwic2l6ZSIsImVzaXplIiwicGxheUFuaSIsImFnZW50RnV0dXJlIiwiaXNNYWluUGxheWVyIiwicGxheUFuZ2xlQW5pbWF0aW9uTmVhciIsInJlbW92ZSIsIl9hbmltYXRpb24iLCJwbGF5Iiwic2hhZG93IiwiZGVzdHJveSIsImJsb29kIiwiZGllU3RhcnQiLCJkaWVFbmQiLCJmb290U3RhcnQiLCJub2RlIiwiekluZGV4Iiwic2NhbGVYIiwic2NhbGVZIiwiZm9vdEVuZCIsImJlZm9yZUtpbGwiLCJhZnRlcktpbGwiLCJhRnJhbWUxRXZ0IiwibGF5b3V0T3AiLCJwbGF5U25kIiwiZnJhbWUxRXZ0IiwiZGlzcFNoYWRvdyIsImZyYW1lMkV2dCIsImZyYW1lM0V2dCIsImZyYW1lNEV2dCIsImZyYW1lNUV2dCIsImZyYW1lNkV2dCIsImZyYW1lN0V2dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNILFFBREo7QUFHTEksRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQztBQURHLEdBSFA7QUFPTEMsRUFBQUEsS0FQSyxtQkFPSSxDQUNSLENBUkk7QUFVTEMsRUFBQUEsVUFBVSxFQUFFLHNCQUFXLENBQ3RCLENBWEk7QUFhTEMsRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVNDLEtBQVQsRUFBZ0I7QUFDL0IsV0FBTyxDQUFDQSxLQUFLLENBQUNDLElBQU4sR0FBYUQsS0FBSyxDQUFDRSxLQUFwQixJQUEyQixHQUEzQixHQUErQixHQUF0QztBQUNILEdBZkk7QUFpQkxDLEVBQUFBLE9BQU8sRUFBRSxpQkFBU0gsS0FBVCxFQUFnQkksV0FBaEIsRUFBNkJDLFlBQTdCLEVBQTJDO0FBQ2hELFNBQUtDLHNCQUFMLENBQTRCTixLQUE1QixFQUFtQ0ksV0FBbkMsRUFBZ0RDLFlBQWhEO0FBQ0gsR0FuQkk7QUFxQkxFLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFNBQXJCOztBQUNBLFNBQUtDLE1BQUwsQ0FBWUMsT0FBWjtBQUNBLFNBQUtDLEtBQUwsQ0FBV0QsT0FBWDtBQUNILEdBekJJO0FBMkJMRSxFQUFBQSxRQUFRLEVBQUUsb0JBQVcsQ0FDcEIsQ0E1Qkk7QUE4QkxDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtOLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFdBQXJCO0FBQ0gsR0FoQ0k7QUFrQ0w7QUFDQU0sRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixDQUFDLENBQXBCO0FBQ0EsU0FBS0QsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLENBQW5CO0FBQ0EsU0FBS0YsSUFBTCxDQUFVRyxNQUFWLEdBQW1CLENBQW5CO0FBQ0gsR0F2Q0k7QUF5Q0xDLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixTQUFLSixJQUFMLENBQVVMLE9BQVY7QUFDSCxHQTNDSTtBQTZDTDtBQUNBVSxFQUFBQSxVQUFVLEVBQUUsc0JBQVcsQ0FDbkI7QUFDSCxHQWhESTtBQWtETDtBQUNBQyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS04sSUFBTCxDQUFVTCxPQUFWO0FBQ0gsR0FyREk7QUF1RExZLEVBQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixTQUFLQyxRQUFMLENBQWNDLE9BQWQsQ0FBc0IsS0FBdEI7QUFDSCxHQXpESTtBQTJETEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtDLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQTdESTtBQStETEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtELFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQWpFSTtBQW1FTEUsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtGLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXJFSTtBQXVFTEcsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtILFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXpFSTtBQTJFTEksRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtKLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQTdFSTtBQStFTEssRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtMLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQWpGSTtBQW1GTE0sRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtOLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXJGSSxDQXVGTDs7QUF2RkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15U3ByaXRlID0gcmVxdWlyZShcIk15U3ByaXRlXCIpXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBteVNwcml0ZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZTpcIlwiLFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgfSxcblxuICAgIHNob290QXJyb3c6IGZ1bmN0aW9uKCkge1xuICAgIH0sICBcblxuICAgIGdldEF0dGFja0Rpc3RhbmNlOiBmdW5jdGlvbihhZ2VudCkge1xuICAgICAgICByZXR1cm4gKGFnZW50LnNpemUgKyBhZ2VudC5lc2l6ZSkqMC41KjEuMjtcbiAgICB9LFxuXG4gICAgcGxheUFuaTogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5nbGVBbmltYXRpb25OZWFyKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJkaWVvZmYyXCIpO1xuICAgICAgICB0aGlzLnNoYWRvdy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYmxvb2QuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBkaWVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGRpZUVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZm9vdHByaW50XCIpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBmb290IHByaW50IHN0YXJ0IGV2dFxuICAgIGZvb3RTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSAxO1xuICAgIH0sXG5cbiAgICBmb290RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgY2FsbGVkIGJ5IGZpcnN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYmVmb3JlS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgbGFzdCBmcmFtZSBvZiBza2VfYm9tYlxuICAgIGFmdGVyS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGFGcmFtZTFFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wLnBsYXlTbmQoXCJza2VcIik7XG4gICAgfSxcblxuICAgIGZyYW1lMUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygxKTtcbiAgICB9LFxuXG4gICAgZnJhbWUyRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDIpO1xuICAgIH0sXG5cbiAgICBmcmFtZTNFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMyk7XG4gICAgfSxcblxuICAgIGZyYW1lNEV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg0KTtcbiAgICB9LFxuXG4gICAgZnJhbWU1RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDUpO1xuICAgIH0sXG5cbiAgICBmcmFtZTZFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNik7XG4gICAgfSxcblxuICAgIGZyYW1lN0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg3KTtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==