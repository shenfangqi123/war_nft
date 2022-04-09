
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/LightmanSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ba670SxMdMZZPZ9uRjICLu', 'LightmanSprite');
// scripts/LightmanSprite.js

"use strict";

var mySprite = require("MySprite");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "lm"
  },
  start: function start() {
    this.layoutOp = this.node.parent.getComponent('Game');
  },
  getAttackDistance: function getAttackDistance(agent) {
    this.attactDistance = (agent.size + agent.esize) * 0.5 * 1.2;
    return this.attactDistance;
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.tkx = agent.enemypos.x * 30;
    this.tky = agent.enemypos.y * 30;
    this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
  },
  remove: function remove() {
    this._animation.play("dieoff1");

    this.shadow.destroy();
    this.blood.destroy();
  },
  playEffect: function playEffect() {
    // attack action will take some time while target enemy may dead, and will locate to another emeny.
    // and the effect will show on that enemy. to avoid that, try to judge if the effect is very far away from current position.
    var p1 = cc.v2(this.node.x, this.node.y);
    var p2 = cc.v2(this.tkx, this.tky);
    var distance = p1.sub(p2).mag();

    if (distance < this.attactDistance * 30 * 2) {
      this.layoutOp.playEffect("lm", this.tkx, this.tky);
    }
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
  aFrame1Evt: function aFrame1Evt() {
    this.attacking = true;
    this.dispShadow(2);
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(4);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  aFrame6Evt: function aFrame6Evt() {
    this.dispShadow(7);
    this.playEffect();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0xpZ2h0bWFuU3ByaXRlLmpzIl0sIm5hbWVzIjpbIm15U3ByaXRlIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicm9sZSIsInN0YXJ0IiwibGF5b3V0T3AiLCJub2RlIiwicGFyZW50IiwiZ2V0Q29tcG9uZW50IiwiZ2V0QXR0YWNrRGlzdGFuY2UiLCJhZ2VudCIsImF0dGFjdERpc3RhbmNlIiwic2l6ZSIsImVzaXplIiwicGxheUFuaSIsImFnZW50RnV0dXJlIiwiaXNNYWluUGxheWVyIiwidGt4IiwiZW5lbXlwb3MiLCJ4IiwidGt5IiwieSIsInBsYXlBbmdsZUFuaW1hdGlvbk5lYXIiLCJyZW1vdmUiLCJfYW5pbWF0aW9uIiwicGxheSIsInNoYWRvdyIsImRlc3Ryb3kiLCJibG9vZCIsInBsYXlFZmZlY3QiLCJwMSIsInYyIiwicDIiLCJkaXN0YW5jZSIsInN1YiIsIm1hZyIsImRpZVN0YXJ0IiwiZGllRW5kIiwiZm9vdFN0YXJ0IiwiekluZGV4Iiwic2NhbGVYIiwic2NhbGVZIiwiZm9vdEVuZCIsImJlZm9yZUtpbGwiLCJhZnRlcktpbGwiLCJmcmFtZTFFdnQiLCJkaXNwU2hhZG93IiwiZnJhbWUyRXZ0IiwiZnJhbWUzRXZ0IiwiZnJhbWU0RXZ0IiwiZnJhbWU1RXZ0IiwiZnJhbWU2RXZ0IiwiZnJhbWU3RXZ0IiwiYUZyYW1lMUV2dCIsImF0dGFja2luZyIsImFGcmFtZTJFdnQiLCJhRnJhbWUzRXZ0IiwiYUZyYW1lNEV2dCIsImFGcmFtZTVFdnQiLCJhRnJhbWU2RXZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0gsUUFESjtBQUdMSSxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBREcsR0FIUDtBQU9MQyxFQUFBQSxL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QStFTEcsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtILFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQWpGSTtBQW1GTEksRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtKLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXJGSTtBQXVGTEssRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtMLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXpGSTtBQTJGTE0sRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLFNBQUtOLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQTdGSTtBQStGTE8sRUFBQUEsVUFBVSxFQUFFLHNCQUFXO0FBQ25CLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLUixVQUFMLENBQWdCLENBQWhCO0FBQ0gsR0FsR0k7QUFvR0xTLEVBQUFBLFVBQVUsRUFBRSxzQkFBVyxDQUN0QixDQXJHSTtBQXVHTEMsRUFBQUEsVUFBVSxFQUFFLHNCQUFXO0FBQ25CLFNBQUtWLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSCxHQXpHSTtBQTJHTFcsRUFBQUEsVUFBVSxFQUFFLHNCQUFXLENBQ3RCLENBNUdJO0FBOEdMQyxFQUFBQSxVQUFVLEVBQUUsc0JBQVcsQ0FDdEIsQ0EvR0k7QUFpSExDLEVBQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixTQUFLYixVQUFMLENBQWdCLENBQWhCO0FBQ0EsU0FBS2pCLFVBQUw7QUFFQSxTQUFLeUIsU0FBTCxHQUFpQixLQUFqQjtBQUNILEdBdEhJLENBd0hMOztBQXhISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbXlTcHJpdGUgPSByZXF1aXJlKFwiTXlTcHJpdGVcIilcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IG15U3ByaXRlLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICByb2xlOlwibG1cIixcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoJ0dhbWUnKTtcbiAgICB9LFxuXG4gICAgZ2V0QXR0YWNrRGlzdGFuY2U6IGZ1bmN0aW9uKGFnZW50KSB7XG4gICAgICAgIHRoaXMuYXR0YWN0RGlzdGFuY2UgPSAoYWdlbnQuc2l6ZSArIGFnZW50LmVzaXplKSowLjUqMS4yO1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRhY3REaXN0YW5jZTtcbiAgICB9LFxuXG4gICAgcGxheUFuaTogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgdGhpcy50a3ggPSBhZ2VudC5lbmVteXBvcy54KjMwO1xuICAgICAgICB0aGlzLnRreSA9IGFnZW50LmVuZW15cG9zLnkqMzA7XG4gICAgICAgIHRoaXMucGxheUFuZ2xlQW5pbWF0aW9uTmVhcihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcik7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMVwiKTtcbiAgICAgICAgdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmJsb29kLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgcGxheUVmZmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGF0dGFjayBhY3Rpb24gd2lsbCB0YWtlIHNvbWUgdGltZSB3aGlsZSB0YXJnZXQgZW5lbXkgbWF5IGRlYWQsIGFuZCB3aWxsIGxvY2F0ZSB0byBhbm90aGVyIGVtZW55LlxuICAgICAgICAvLyBhbmQgdGhlIGVmZmVjdCB3aWxsIHNob3cgb24gdGhhdCBlbmVteS4gdG8gYXZvaWQgdGhhdCwgdHJ5IHRvIGp1ZGdlIGlmIHRoZSBlZmZlY3QgaXMgdmVyeSBmYXIgYXdheSBmcm9tIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICAgIHZhciBwMSA9IGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSk7XG4gICAgICAgIHZhciBwMiA9IGNjLnYyKHRoaXMudGt4LCB0aGlzLnRreSk7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHAxLnN1YihwMikubWFnKCk7XG4gICAgICAgIGlmKGRpc3RhbmNlIDwgdGhpcy5hdHRhY3REaXN0YW5jZSozMCoyKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dE9wLnBsYXlFZmZlY3QoXCJsbVwiLCB0aGlzLnRreCwgdGhpcy50a3kpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRpZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgZGllRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJmb290cHJpbnRcIik7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGZvb3QgcHJpbnQgc3RhcnQgZXZ0XG4gICAgZm9vdFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IDE7XG4gICAgfSxcblxuICAgIGZvb3RFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgZmlyc3QgZnJhbWUgb2Ygc2tlX2JvbWJcbiAgICBiZWZvcmVLaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLnNoYWRvdy5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGNhbGxlZCBieSBsYXN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYWZ0ZXJLaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDEpO1xuICAgIH0sXG5cbiAgICBmcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgfSxcblxuICAgIGZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgZnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBmcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNSk7XG4gICAgfSxcblxuICAgIGZyYW1lNkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg2KTtcbiAgICB9LFxuXG4gICAgZnJhbWU3RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgIH0sXG5cbiAgICBhRnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgfSxcblxuICAgIGFGcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBhRnJhbWUzRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBhRnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgYUZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTZFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNyk7XG4gICAgICAgIHRoaXMucGxheUVmZmVjdCgpO1xuXG4gICAgICAgIHRoaXMuYXR0YWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==