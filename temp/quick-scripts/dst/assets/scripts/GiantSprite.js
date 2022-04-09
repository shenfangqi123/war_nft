
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GiantSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06cfaN7txBFkqJqizTWDtk1', 'GiantSprite');
// scripts/GiantSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "gi"
  },
  // onLoad () {},
  start: function start() {
    //this._animation = this.getComponent(cc.Animation);
    //this._animation.WrapMode = cc.WrapMode.Loop;
    this.shadow.scaleX = 1.2;
    this.shadow.scaleY = 1.2;
  },
  getAttackDistance: function getAttackDistance(agent) {
    return (agent.size + agent.esize) * 0.5 * 1.5;
  },
  remove: function remove() {
    //this.getChildByName("blood").active = false;
    this._animation.play("dieoff1");

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
  },
  footEnd: function footEnd() {
    this.node.destroy();
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  frame1Evt: function frame1Evt() {
    this.dispShadow(1);
    this.shadow.zIndex = -1;
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
    this.dispShadow(2);
    this.layoutOp.playSnd("gi");
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(4);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  aFrame6Evt: function aFrame6Evt() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dpYW50U3ByaXRlLmpzIl0sIm5hbWVzIjpbIm15U3ByaXRlIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicm9sZSIsInN0YXJ0Iiwic2hhZG93Iiwic2NhbGVYIiwic2NhbGVZIiwiZ2V0QXR0YWNrRGlzdGFuY2UiLCJhZ2VudCIsInNpemUiLCJlc2l6ZSIsInJlbW92ZSIsIl9hbmltYXRpb24iLCJwbGF5IiwiZGVzdHJveSIsImJsb29kIiwiZGllU3RhcnQiLCJkaWVFbmQiLCJmb290U3RhcnQiLCJub2RlIiwiekluZGV4IiwiZm9vdEVuZCIsInBsYXlBbmkiLCJhZ2VudEZ1dHVyZSIsImlzTWFpblBsYXllciIsInBsYXlBbmdsZUFuaW1hdGlvbk5lYXIiLCJmcmFtZTFFdnQiLCJkaXNwU2hhZG93IiwiZnJhbWUyRXZ0IiwiZnJhbWUzRXZ0IiwiZnJhbWU0RXZ0IiwiZnJhbWU1RXZ0IiwiZnJhbWU2RXZ0IiwiZnJhbWU3RXZ0IiwiYUZyYW1lMUV2dCIsImxheW91dE9wIiwicGxheVNuZCIsImFGcmFtZTJFdnQiLCJhRnJhbWUzRXZ0IiwiYUZyYW1lNEV2dCIsImFGcmFtZTVFdnQiLCJhRnJhbWU2RXZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0gsUUFESjtBQUdMSSxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBREcsR0FIUDtBQU9MO0FBRUFDLEVBQUFBLEtBVEssbUJBU0k7QUFDTDtBQUNBO0FBQ0EsU0FBS0MsTUFBTCxDQUFZQyxNQUFaLEdBQXFCLEdBQXJCO0FBQ0EsU0FBS0QsTUFBTCxDQUFZRSxNQUFaLEdBQXFCLEdBQXJCO0FBQ0gsR0FkSTtBQWdCTEMsRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVNDLEtBQVQsRUFBZ0I7QUFDL0IsV0FBTyxDQUFDQSxLQUFLLENBQUNDLElBQU4sR0FBYUQsS0FBSyxDQUFDRSxLQUFwQixJQUEyQixHQUEzQixHQUErQixHQUF0QztBQUNILEdBbEJJO0FBb0JMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFNBQXJCOztBQUNBLFNBQUtULE1BQUwsQ0FBWVUsT0FBWjtBQUNBLFNBQUtDLEtBQUwsQ0FBV0QsT0FBWDtBQUNILEdBekJJO0FBMkJMRSxFQUFBQSxRQUFRLEVBQUUsb0JBQVcsQ0FDcEIsQ0E1Qkk7QUE4QkxDLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtMLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFdBQXJCO0FBQ0gsR0FoQ0k7QUFrQ0w7QUFDQUssRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixDQUFDLENBQXBCO0FBQ0gsR0FyQ0k7QUF1Q0xDLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixTQUFLRixJQUFMLENBQVVMLE9BQVY7QUFDSCxHQXpDSTtBQTJDTFEsRUFBQUEsT0FBTyxFQUFFLGlCQUFTZCxLQUFULEVBQWdCZSxXQUFoQixFQUE2QkMsWUFBN0IsRUFBMkM7QUFDaEQsU0FBS0Msc0JBQUwsQ0FBNEJqQixLQUE1QixFQUFtQ2UsV0FBbkMsRUFBZ0RDLFlBQWhEO0FBQ0gsR0E3Q0k7QUErQ0xFLEVBQUFBLFNBQVMsRUFBRSxxQkFBVztBQUNsQixTQUFLQyxVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS3ZCLE1BQUwsQ0FBWWdCLE1BQVosR0FBcUIsQ0FBQyxDQUF0QjtBQUNILEdBbERJO0FBb0RMUSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0QsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBdERJO0FBd0RMRSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0YsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBMURJO0FBNERMRyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0gsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBOURJO0FBZ0VMSSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0osVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBbEVJO0FBb0VMSyxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS0wsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBdEVJO0FBd0VMTSxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEIsU0FBS04sVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBMUVJO0FBNEVMTyxFQUFBQSxVQUFVLEVBQUUsc0JBQVc7QUFDbkIsU0FBS1AsVUFBTCxDQUFnQixDQUFoQjtBQUNBLFNBQUtRLFFBQUwsQ0FBY0MsT0FBZCxDQUFzQixJQUF0QjtBQUNILEdBL0VJO0FBaUZMQyxFQUFBQSxVQUFVLEVBQUUsc0JBQVcsQ0FDdEIsQ0FsRkk7QUFvRkxDLEVBQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixTQUFLWCxVQUFMLENBQWdCLENBQWhCO0FBQ0gsR0F0Rkk7QUF3RkxZLEVBQUFBLFVBQVUsRUFBRSxzQkFBVyxDQUN0QixDQXpGSTtBQTJGTEMsRUFBQUEsVUFBVSxFQUFFLHNCQUFXLENBQ3RCLENBNUZJO0FBOEZMQyxFQUFBQSxVQUFVLEVBQUUsc0JBQVc7QUFDbkIsU0FBS2QsVUFBTCxDQUFnQixDQUFoQjtBQUNILEdBaEdJLENBaUdMOztBQWpHSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbXlTcHJpdGUgPSByZXF1aXJlKFwiTXlTcHJpdGVcIilcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IG15U3ByaXRlLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICByb2xlOlwiZ2lcIixcbiAgICB9LFxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICAvL3RoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIC8vdGhpcy5fYW5pbWF0aW9uLldyYXBNb2RlID0gY2MuV3JhcE1vZGUuTG9vcDtcbiAgICAgICAgdGhpcy5zaGFkb3cuc2NhbGVYID0gMS4yO1xuICAgICAgICB0aGlzLnNoYWRvdy5zY2FsZVkgPSAxLjI7XG4gICAgfSxcblxuICAgIGdldEF0dGFja0Rpc3RhbmNlOiBmdW5jdGlvbihhZ2VudCkge1xuICAgICAgICByZXR1cm4gKGFnZW50LnNpemUgKyBhZ2VudC5lc2l6ZSkqMC41KjEuNTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLmdldENoaWxkQnlOYW1lKFwiYmxvb2RcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMVwiKTtcbiAgICAgICAgdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmJsb29kLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZGllU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBkaWVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImZvb3RwcmludFwiKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgZm9vdCBwcmludCBzdGFydCBldnRcbiAgICBmb290U3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gLTE7XG4gICAgfSxcblxuICAgIGZvb3RFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBwbGF5QW5pOiBmdW5jdGlvbihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcikge1xuICAgICAgICB0aGlzLnBsYXlBbmdsZUFuaW1hdGlvbk5lYXIoYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpO1xuICAgIH0sXG5cbiAgICBmcmFtZTFFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMSk7XG4gICAgICAgIHRoaXMuc2hhZG93LnpJbmRleCA9IC0xO1xuICAgIH0sXG5cbiAgICBmcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgfSxcblxuICAgIGZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgZnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBmcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNSk7XG4gICAgfSxcblxuICAgIGZyYW1lNkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg2KTtcbiAgICB9LFxuXG4gICAgZnJhbWU3RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgIH0sXG5cbiAgICBhRnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDIpO1xuICAgICAgICB0aGlzLmxheW91dE9wLnBsYXlTbmQoXCJnaVwiKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTNFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNCk7XG4gICAgfSxcblxuICAgIGFGcmFtZTRFdnQ6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBhRnJhbWU1RXZ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgYUZyYW1lNkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg3KTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==