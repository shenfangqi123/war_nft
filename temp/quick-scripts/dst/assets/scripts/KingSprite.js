
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/KingSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e1e7ijAIxKo4R8otf0WmYm', 'KingSprite');
// scripts/KingSprite.js

"use strict";

var common = require("Common");

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
  onLoad: function onLoad() {
    this.node.zIndex = 2999;
  } //start () {},

  /*
      shootArrow: function(x, y, ex, ey, enemies, arrow, attackDura, isDead) {
          var startPos = cc.v2(x*30+15, y*30+15);
          var targetYOffset = common.attackTargetYOffset;
  
          //var targetPos = cc.v2(ex, ey);
          var targetPos = cc.v2((ex)*30, (ey+0.5)*30+targetYOffset);
  
          var blink = cc.blink(0.05,1);
  
          var agentNode;
          var enemy;
  
          if(targetPos.x == 0 && targetPos.y == 0) return;
  
          var vt = targetPos.sub(startPos);
          var ag = 180/Math.PI * Math.atan(vt.x/vt.y);
  
          if(vt.y<0) {
              arrow.scaleY = -1;
          }
  
          arrow.active = true;
          arrow.setRotation(ag+180);
          arrow.setPosition(startPos);
  
          var callback = cc.callFunc(function () {
              arrow.active = false;
  
  //            while(enemies.length>0) {
  //                enemy = enemies.pop();
  //                //console.log(enemy);
  //                // no fucking idea why an empty recorder appears with "" in every field.
  //                if(enemy && enemy._name) {
  //                    agentNode = enemy.getComponent('MySprite');
  //                    //agentNode.remove();                    
  //                }
  //            }
          });
  
          arrow.runAction(cc.sequence(cc.moveTo(0.2, targetPos), callback));            
      },  
  */
  // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0tpbmdTcHJpdGUuanMiXSwibmFtZXMiOlsiY29tbW9uIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsInpJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsQ0FDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmUSxHQUhQO0FBcUJMO0FBRUFDLEVBQUFBLE1BdkJLLG9CQXVCSztBQUNOLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNILEdBekJJLENBMkJMOztBQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkNJOztBQXhFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29tbW9uID0gcmVxdWlyZShcIkNvbW1vblwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMjk5OTtcbiAgICB9LFxuXG4gICAgLy9zdGFydCAoKSB7fSxcblxuLypcbiAgICBzaG9vdEFycm93OiBmdW5jdGlvbih4LCB5LCBleCwgZXksIGVuZW1pZXMsIGFycm93LCBhdHRhY2tEdXJhLCBpc0RlYWQpIHtcbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2MudjIoeCozMCsxNSwgeSozMCsxNSk7XG4gICAgICAgIHZhciB0YXJnZXRZT2Zmc2V0ID0gY29tbW9uLmF0dGFja1RhcmdldFlPZmZzZXQ7XG5cbiAgICAgICAgLy92YXIgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgdmFyIHRhcmdldFBvcyA9IGNjLnYyKChleCkqMzAsIChleSswLjUpKjMwK3RhcmdldFlPZmZzZXQpO1xuXG4gICAgICAgIHZhciBibGluayA9IGNjLmJsaW5rKDAuMDUsMSk7XG5cbiAgICAgICAgdmFyIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGVuZW15O1xuXG4gICAgICAgIGlmKHRhcmdldFBvcy54ID09IDAgJiYgdGFyZ2V0UG9zLnkgPT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuICAgICAgICB2YXIgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbih2dC54L3Z0LnkpO1xuXG4gICAgICAgIGlmKHZ0Lnk8MCkge1xuICAgICAgICAgICAgYXJyb3cuc2NhbGVZID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBhcnJvdy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBhcnJvdy5zZXRSb3RhdGlvbihhZysxODApO1xuICAgICAgICBhcnJvdy5zZXRQb3NpdGlvbihzdGFydFBvcyk7XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXJyb3cuYWN0aXZlID0gZmFsc2U7XG5cbi8vICAgICAgICAgICAgd2hpbGUoZW5lbWllcy5sZW5ndGg+MCkge1xuLy8gICAgICAgICAgICAgICAgZW5lbXkgPSBlbmVtaWVzLnBvcCgpO1xuLy8gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlbmVteSk7XG4vLyAgICAgICAgICAgICAgICAvLyBubyBmdWNraW5nIGlkZWEgd2h5IGFuIGVtcHR5IHJlY29yZGVyIGFwcGVhcnMgd2l0aCBcIlwiIGluIGV2ZXJ5IGZpZWxkLlxuLy8gICAgICAgICAgICAgICAgaWYoZW5lbXkgJiYgZW5lbXkuX25hbWUpIHtcbi8vICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSBlbmVteS5nZXRDb21wb25lbnQoJ015U3ByaXRlJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgLy9hZ2VudE5vZGUucmVtb3ZlKCk7ICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMiwgdGFyZ2V0UG9zKSwgY2FsbGJhY2spKTsgICAgICAgICAgICBcbiAgICB9LCAgXG4qLyAgICBcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19