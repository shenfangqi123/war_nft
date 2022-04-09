
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/HeroSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1d7dQFNudAhLCXA3TwPg0h', 'HeroSprite');
// scripts/HeroSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "hr"
  },
  start: function start() {
    this.layoutOp = this.node.parent.getComponent('Game');
  },
  shootArrow: function shootArrow() {},
  getAttackDistance: function getAttackDistance(agent) {
    return (agent.size + agent.esize) * 0.5 * 1.2;
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  remove: function remove() {
    this._animation.play("dieoff1");

    this.shadow.destroy();
    this.blood.destroy();
  },
  playEffect: function playEffect() {
    this.layoutOp.playEffect("hr", this.node.x, this.node.y);
  },
  removeEffect: function removeEffect() {},
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
  //----usual attack-------
  aFrame1Evt: function aFrame1Evt() {
    this.attacking = true;
    this.dispShadow(2);
    this.layoutOp.playSnd("hr");
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(4);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  aFrame6Evt: function aFrame6Evt() {
    this.dispShadow(7);
    this.attacking = false;
  },
  //----spin attack effect included------
  aFrame11Evt: function aFrame11Evt() {
    this.attacking = true;
    this.dispShadow(2);
    this.playEffect();
  },
  aFrame12Evt: function aFrame12Evt() {},
  aFrame13Evt: function aFrame13Evt() {
    this.dispShadow(4);
  },
  aFrame14Evt: function aFrame14Evt() {},
  aFrame15Evt: function aFrame15Evt() {},
  aFrame16Evt: function aFrame16Evt() {
    this.dispShadow(7);
    this.attacking = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0hlcm9TcHJpdGUuanMiXSwibmFtZXMiOlsibXlTcHJpdGUiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyb2xlIiwic3RhcnQiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJzaG9vdEFycm93IiwiZ2V0QXR0YWNrRGlzdGFuY2UiLCJhZ2VudCIsInNpemUiLCJlc2l6ZSIsInBsYXlBbmkiLCJhZ2VudEZ1dHVyZSIsImlzTWFpblBsYXllciIsInBsYXlBbmdsZUFuaW1hdGlvbk5lYXIiLCJyZW1vdmUiLCJfYW5pbWF0aW9uIiwicGxheSIsInNoYWRvdyIsImRlc3Ryb3kiLCJibG9vZCIsInBsYXlFZmZlY3QiLCJ4IiwieSIsInJlbW92ZUVmZmVjdCIsImRpZVN0YXJ0IiwiZGllRW5kIiwiZm9vdFN0YXJ0IiwiekluZGV4Iiwic2NhbGVYIiwic2NhbGVZIiwiZm9vdEVuZCIsImJlZm9yZUtpbGwiLCJhZnRlcktpbGwiLCJmcmFtZTFFdnQiLCJkaXNwU2hhZG93IiwiZnJhbWUyRXZ0IiwiZnJhbWUzRXZ0IiwiZnJhbWU0RXZ0IiwiZnJhbWU1RXZ0IiwiZnJhbWU2RXZ0IiwiZnJhbWU3RXZ0IiwiYUZyYW1lMUV2dCIsImF0dGFja2luZyIsInBsYXlTbmQiLCJhRnJhbWUyRXZ0IiwiYUZyYW1lM0V2dCIsImFGcmFtZTRFdnQiLCJhRnJhbWU1RXZ0IiwiYUZyYW1lNkV2dCIsImFGcmFtZTExRXZ0IiwiYUZyYW1lMTJFdnQiLCJhRnJhbWUxM0V2dCIsImFGcmFtZTE0RXZ0IiwiYUZyYW1lMTVFdnQiLCJhRnJhbWUxNkV2dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNILFFBREo7QUFHTEksRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQztBQURHLEdBSFA7QUFPTEMsRUFBQUEsS0FQSyxtQkFPSTtBQUNMLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0MsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxZQUFqQixDQUE4QixNQUE5QixDQUFoQjtBQUNILEdBVEk7QUFXTEMsRUFBQUEsVUFBVSxFQUFFLHNCQUFXLENBQ3RCLENBWkk7QUFjTEMsRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVNDLEtBQVQsRUFBZ0I7QUFDL0IsV0FBTyxDQUFDQSxLQUFLLENBQUNDLElBQU4sR0FBYUQsS0FBSyxDQUFDRSxLQUFwQixJQUEyQixHQUEzQixHQUErQixHQUF0QztBQUNILEdBaEJJO0FBa0JMQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNILEtBQVQsRUFBZ0JJLFdBQWhCLEVBQTZCQyxZQUE3QixFQUEyQztBQUNoRCxTQUFLQyxzQkFBTCxDQUE0Qk4sS0FBNUIsRUFBbUNJLFdBQW5DLEVBQWdEQyxZQUFoRDtBQUNILEdBcEJJO0FBc0JMRSxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZixTQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixTQUFyQjs7QUFDQSxTQUFLQyxNQUFMLENBQVlDLE9BQVo7QUFDQSxTQUFLQyxLQUFMLENBQVdELE9BQVg7QUFDSCxHQTFCSTtBQTRCTEUsRUFBQUEsVUFBVSxFQUFFLHNCQUFXO0FBQ25CLFNBQUtuQixRQUFMLENBQWNtQixVQUFkLENBQXlCLElBQXpCLEVBQStCLEtBQUtsQixJQUFMLENBQVVtQixDQUF6QyxFQUE0QyxLQUFLbkIsSUFBTCxDQUFVb0IsQ0FBdEQ7QUFDSCxHQTlCSTtBQWdDTEMsRUFBQUEsWUFBWSxFQUFFLHdCQUFXLENBRXhCLENBbENJO0FBb0NMQyxFQUFBQSxRQUFRLEVBQUUsb0JBQVcsQ0FDcEIsQ0FyQ0k7QUF1Q0xDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtWLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFdBQXJCO0FBQ0gsR0F6Q0k7QUEyQ0w7QUFDQVUsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUt4QixJQUFMLENBQVV5QixNQUFWLEdBQW1CLENBQUMsQ0FBcEI7QUFDQSxTQUFLekIsSUFBTCxDQUFVMEIsTUFBVixHQUFtQixDQUFuQjtBQUNBLFNBQUsxQixJQUFMLENBQVUyQixNQUFWLEdBQW1CLENBQW5CO0FBQ0gsR0FoREk7QUFrRExDLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixTQUFLNUIsSUFBTCxDQUFVZ0IsT0FBVjtBQUNILEdBcERJO0FBc0RMO0FBQ0FhLEVBQUFBLFVBQVUsRUFBRSxzQkFBVyxDQUNuQjtBQUNILEdBekRJO0FBMkRMO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxxQkFBVztBQUNsQixTQUFLOUIsSUFBTCxDQUFVZ0IsT0FBVjtBQUNILEdBOURJO0FBZ0VMZSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0MsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBbEVJO0FBb0VMQyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0QsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBdEVJO0FBd0VMRSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0YsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBMUVJO0FBNEVMRyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0gsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBOUVJO0FBZ0ZMSSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0osVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBbEZJO0FBb0ZMSyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0wsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBdEZJO0FBd0ZMTSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS04sVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBMUZJO0FBNkZMO0FBQ0FPLEVBQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS1IsVUFBTCxDQUFnQixDQUFoQjtBQUNBLFNBQUtqQyxRQUFMLENBQWMwQyxPQUFkLENBQXNCLElBQXRCO0FBQ0gsR0FsR0k7QUFvR0xDLEVBQUFBLFVBQVUsRUFBRSxzQkFBVyxDQUN0QixDQXJHSTtBQXVHTEMsRUFBQUEsVUFBVSxFQUFFLHNCQUFXO0FBQ25CLFNBQUtYLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXpHSTtBQTJHTFksRUFBQUEsVUFBVSxFQUFFLHNCQUFXLENBQ3RCLENBNUdJO0FBOEdMQyxFQUFBQSxVQUFVLEVBQUUsc0JBQVcsQ0FDdEIsQ0EvR0k7QUFpSExDLEVBQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixTQUFLZCxVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS1EsU0FBTCxHQUFpQixLQUFqQjtBQUNILEdBcEhJO0FBdUhMO0FBQ0FPLEVBQUFBLFdBQVcsRUFBRSx1QkFBVztBQUNwQixTQUFLUCxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS1IsVUFBTCxDQUFnQixDQUFoQjtBQUNBLFNBQUtkLFVBQUw7QUFDSCxHQTVISTtBQThITDhCLEVBQUFBLFdBQVcsRUFBRSx1QkFBVyxDQUN2QixDQS9ISTtBQWlJTEMsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFNBQUtqQixVQUFMLENBQWdCLENBQWhCO0FBQ0gsR0FuSUk7QUFxSUxrQixFQUFBQSxXQUFXLEVBQUUsdUJBQVcsQ0FDdkIsQ0F0SUk7QUF3SUxDLEVBQUFBLFdBQVcsRUFBRSx1QkFBVyxDQUN2QixDQXpJSTtBQTJJTEMsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFNBQUtwQixVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS1EsU0FBTCxHQUFpQixLQUFqQjtBQUNILEdBOUlJLENBaUpMOztBQWpKSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbXlTcHJpdGUgPSByZXF1aXJlKFwiTXlTcHJpdGVcIilcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IG15U3ByaXRlLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICByb2xlOlwiaHJcIixcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoJ0dhbWUnKTtcbiAgICB9LFxuXG4gICAgc2hvb3RBcnJvdzogZnVuY3Rpb24oKSB7XG4gICAgfSwgIFxuXG4gICAgZ2V0QXR0YWNrRGlzdGFuY2U6IGZ1bmN0aW9uKGFnZW50KSB7XG4gICAgICAgIHJldHVybiAoYWdlbnQuc2l6ZSArIGFnZW50LmVzaXplKSowLjUqMS4yO1xuICAgIH0sXG5cbiAgICBwbGF5QW5pOiBmdW5jdGlvbihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcikge1xuICAgICAgICB0aGlzLnBsYXlBbmdsZUFuaW1hdGlvbk5lYXIoYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImRpZW9mZjFcIik7XG4gICAgICAgIHRoaXMuc2hhZG93LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ibG9vZC5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHBsYXlFZmZlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wLnBsYXlFZmZlY3QoXCJoclwiLCB0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xuICAgIH0sXG5cbiAgICByZW1vdmVFZmZlY3Q6IGZ1bmN0aW9uKCkge1xuXG4gICAgfSxcblxuICAgIGRpZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgZGllRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJmb290cHJpbnRcIik7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGZvb3QgcHJpbnQgc3RhcnQgZXZ0XG4gICAgZm9vdFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IDE7XG4gICAgfSxcblxuICAgIGZvb3RFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgZmlyc3QgZnJhbWUgb2Ygc2tlX2JvbWJcbiAgICBiZWZvcmVLaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLnNoYWRvdy5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGNhbGxlZCBieSBsYXN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYWZ0ZXJLaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDEpO1xuICAgIH0sXG5cbiAgICBmcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgfSxcblxuICAgIGZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgZnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBmcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNSk7XG4gICAgfSxcblxuICAgIGZyYW1lNkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg2KTtcbiAgICB9LFxuXG4gICAgZnJhbWU3RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgIH0sXG5cblxuICAgIC8vLS0tLXVzdWFsIGF0dGFjay0tLS0tLS1cbiAgICBhRnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgICAgIHRoaXMubGF5b3V0T3AucGxheVNuZChcImhyXCIpO1xuICAgIH0sXG5cbiAgICBhRnJhbWUyRXZ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgYUZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg0KTtcbiAgICB9LFxuXG4gICAgYUZyYW1lNEV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBhRnJhbWU2RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgICAgICB0aGlzLmF0dGFja2luZyA9IGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8vLS0tLXNwaW4gYXR0YWNrIGVmZmVjdCBpbmNsdWRlZC0tLS0tLVxuICAgIGFGcmFtZTExRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgICAgIHRoaXMucGxheUVmZmVjdCgpO1xuICAgIH0sXG5cbiAgICBhRnJhbWUxMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTEzRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBhRnJhbWUxNEV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTE1RXZ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgYUZyYW1lMTZFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNyk7XG4gICAgICAgIHRoaXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19