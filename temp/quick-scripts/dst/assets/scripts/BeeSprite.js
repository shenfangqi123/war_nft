
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/BeeSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3c5ccJhe1KRrAvyoLJxi+i', 'BeeSprite');
// scripts/BeeSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "bee"
  },
  start: function start() {},
  shootArrow: function shootArrow() {},
  getAttackDistance: function getAttackDistance(agent) {
    return (agent.size + agent.esize) * 0.5 * 1.2;
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.node.zIndex = 9999;
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  remove: function remove() {
    this._animation.play("dieoff2");

    this.shadow.destroy();
    this.blood.destroy();
  },
  dieStart: function dieStart() {
    this.node.scaleX = 0.8;
    this.node.scaleY = 0.8;
  },
  dieEnd: function dieEnd() {
    this._animation.play("footprint");
  },
  //ske clip ske_bomb, foot print start evt
  footStart: function footStart() {
    this.node.zIndex = -1; //this.node.scaleX = 0.5;
    //this.node.scaleY = 0.5;
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
  frame1Evt: function frame1Evt() {//this.dispShadow(1);
  },
  frame2Evt: function frame2Evt() {//this.dispShadow(2);
  },
  frame3Evt: function frame3Evt() {//this.dispShadow(3);
  },
  frame4Evt: function frame4Evt() {//this.dispShadow(4);
  },
  frame5Evt: function frame5Evt() {//this.dispShadow(5);
  },
  frame6Evt: function frame6Evt() {//this.dispShadow(6);
  },
  frame7Evt: function frame7Evt() {//this.dispShadow(7);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0JlZVNwcml0ZS5qcyJdLCJuYW1lcyI6WyJteVNwcml0ZSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsInNob290QXJyb3ciLCJnZXRBdHRhY2tEaXN0YW5jZSIsImFnZW50Iiwic2l6ZSIsImVzaXplIiwicGxheUFuaSIsImFnZW50RnV0dXJlIiwiaXNNYWluUGxheWVyIiwibm9kZSIsInpJbmRleCIsInBsYXlBbmdsZUFuaW1hdGlvbk5lYXIiLCJyZW1vdmUiLCJfYW5pbWF0aW9uIiwicGxheSIsInNoYWRvdyIsImRlc3Ryb3kiLCJibG9vZCIsImRpZVN0YXJ0Iiwic2NhbGVYIiwic2NhbGVZIiwiZGllRW5kIiwiZm9vdFN0YXJ0IiwiZm9vdEVuZCIsImJlZm9yZUtpbGwiLCJhZnRlcktpbGwiLCJmcmFtZTFFdnQiLCJmcmFtZTJFdnQiLCJmcmFtZTNFdnQiLCJmcmFtZTRFdnQiLCJmcmFtZTVFdnQiLCJmcmFtZTZFdnQiLCJmcmFtZTdFdnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTSCxRQURKO0FBR0xJLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUM7QUFERyxHQUhQO0FBT0xDLEVBQUFBLEtBUEssbUJBT0ksQ0FDUixDQVJJO0FBVUxDLEVBQUFBLFVBQVUsRUFBRSxzQkFBVyxDQUN0QixDQVhJO0FBYUxDLEVBQUFBLGlCQUFpQixFQUFFLDJCQUFTQyxLQUFULEVBQWdCO0FBQy9CLFdBQU8sQ0FBQ0EsS0FBSyxDQUFDQyxJQUFOLEdBQWFELEtBQUssQ0FBQ0UsS0FBcEIsSUFBMkIsR0FBM0IsR0FBK0IsR0FBdEM7QUFDSCxHQWZJO0FBaUJMQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNILEtBQVQsRUFBZ0JJLFdBQWhCLEVBQTZCQyxZQUE3QixFQUEyQztBQUNoRCxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxTQUFLQyxzQkFBTCxDQUE0QlIsS0FBNUIsRUFBbUNJLFdBQW5DLEVBQWdEQyxZQUFoRDtBQUNILEdBcEJJO0FBc0JMSSxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZixTQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixTQUFyQjs7QUFDQSxTQUFLQyxNQUFMLENBQVlDLE9BQVo7QUFDQSxTQUFLQyxLQUFMLENBQVdELE9BQVg7QUFDSCxHQTFCSTtBQTRCTEUsRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ2pCLFNBQUtULElBQUwsQ0FBVVUsTUFBVixHQUFtQixHQUFuQjtBQUNBLFNBQUtWLElBQUwsQ0FBVVcsTUFBVixHQUFtQixHQUFuQjtBQUNILEdBL0JJO0FBaUNMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZixTQUFLUixVQUFMLENBQWdCQyxJQUFoQixDQUFxQixXQUFyQjtBQUNILEdBbkNJO0FBcUNMO0FBQ0FRLEVBQUFBLFNBQVMsRUFBRSxxQkFBVztBQUNsQixTQUFLYixJQUFMLENBQVVDLE1BQVYsR0FBbUIsQ0FBQyxDQUFwQixDQURrQixDQUVsQjtBQUNBO0FBQ0gsR0ExQ0k7QUE0Q0xhLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixTQUFLZCxJQUFMLENBQVVPLE9BQVY7QUFDSCxHQTlDSTtBQWdETDtBQUNBUSxFQUFBQSxVQUFVLEVBQUUsc0JBQVcsQ0FDbkI7QUFDSCxHQW5ESTtBQXFETDtBQUNBQyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS2hCLElBQUwsQ0FBVU8sT0FBVjtBQUNILEdBeERJO0FBMERMVSxFQUFBQSxTQUFTLEVBQUUscUJBQVcsQ0FDbEI7QUFDSCxHQTVESTtBQThETEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXLENBQ2xCO0FBQ0gsR0FoRUk7QUFrRUxDLEVBQUFBLFNBQVMsRUFBRSxxQkFBVyxDQUNsQjtBQUNILEdBcEVJO0FBc0VMQyxFQUFBQSxTQUFTLEVBQUUscUJBQVcsQ0FDbEI7QUFDSCxHQXhFSTtBQTBFTEMsRUFBQUEsU0FBUyxFQUFFLHFCQUFXLENBQ2xCO0FBQ0gsR0E1RUk7QUE4RUxDLEVBQUFBLFNBQVMsRUFBRSxxQkFBVyxDQUNsQjtBQUNILEdBaEZJO0FBa0ZMQyxFQUFBQSxTQUFTLEVBQUUscUJBQVcsQ0FDbEI7QUFDSCxHQXBGSSxDQXNGTDs7QUF0RkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15U3ByaXRlID0gcmVxdWlyZShcIk15U3ByaXRlXCIpXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBteVNwcml0ZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZTpcImJlZVwiLFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgfSxcblxuICAgIHNob290QXJyb3c6IGZ1bmN0aW9uKCkge1xuICAgIH0sICBcblxuICAgIGdldEF0dGFja0Rpc3RhbmNlOiBmdW5jdGlvbihhZ2VudCkge1xuICAgICAgICByZXR1cm4gKGFnZW50LnNpemUgKyBhZ2VudC5lc2l6ZSkqMC41KjEuMjtcbiAgICB9LFxuXG4gICAgcGxheUFuaTogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIHRoaXMucGxheUFuZ2xlQW5pbWF0aW9uTmVhcihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcik7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMlwiKTtcbiAgICAgICAgdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmJsb29kLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZGllU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMC44O1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gMC44O1xuICAgIH0sXG5cbiAgICBkaWVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImZvb3RwcmludFwiKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgZm9vdCBwcmludCBzdGFydCBldnRcbiAgICBmb290U3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gLTE7XG4gICAgICAgIC8vdGhpcy5ub2RlLnNjYWxlWCA9IDAuNTtcbiAgICAgICAgLy90aGlzLm5vZGUuc2NhbGVZID0gMC41O1xuICAgIH0sXG5cbiAgICBmb290RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgY2FsbGVkIGJ5IGZpcnN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYmVmb3JlS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgbGFzdCBmcmFtZSBvZiBza2VfYm9tYlxuICAgIGFmdGVyS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGZyYW1lMUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5kaXNwU2hhZG93KDEpO1xuICAgIH0sXG5cbiAgICBmcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMuZGlzcFNoYWRvdygyKTtcbiAgICB9LFxuXG4gICAgZnJhbWUzRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLmRpc3BTaGFkb3coMyk7XG4gICAgfSxcblxuICAgIGZyYW1lNEV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBmcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMuZGlzcFNoYWRvdyg1KTtcbiAgICB9LFxuXG4gICAgZnJhbWU2RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLmRpc3BTaGFkb3coNik7XG4gICAgfSxcblxuICAgIGZyYW1lN0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19