
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/BaseSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22a8a7Kh7NNgJLrjEdbIjIr', 'BaseSprite');
// scripts/BaseSprite.js

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
  properties: {
    // foo: {
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
    basePosY: 28
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // base postion is fixed by this.basePosY.
    if (this.isBase()) {
      this.node.zIndex = 1000 + parseInt(32 - this.basePosY - 2);
    }

    this._animation = this.getComponent(cc.Animation);
  },
  // start () {},
  isBase: function isBase() {
    if (this.node._name.startWith("base")) {
      return true;
    }

    return false;
  },
  setZIndex: function setZIndex(val) {
    this.node.zIndex = val;
  },
  setTotalLife: function setTotalLife(val) {
    this.totalLife = val;
  },
  setLife: function setLife(val) {
    this.life = val;
    var bloodNode = this.blood.getComponent("BloodBar");
    bloodNode.setBloodBar(this.life, this.totalLife);
  },
  setBloodLevel: function setBloodLevel(val) {},
  setBloodBar: function setBloodBar(life) {
    var bar = this.blood.getChildByName("bar");
    var barTotalWidth = this.blood.width;
    bar.width = life / this.totalLife * barTotalWidth;
  },
  setBlood: function setBlood(blood) {
    this.blood = blood;
    this.blood.active = true;
  },
  remove: function remove() {},
  frameStartEvt: function frameStartEvt() {
    console.log("first.");
  },
  frameEndEvt: function frameEndEvt() {
    console.log("last.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0Jhc2VTcHJpdGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiYXNlUG9zWSIsIm9uTG9hZCIsImlzQmFzZSIsIm5vZGUiLCJ6SW5kZXgiLCJwYXJzZUludCIsIl9hbmltYXRpb24iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJfbmFtZSIsInN0YXJ0V2l0aCIsInNldFpJbmRleCIsInZhbCIsInNldFRvdGFsTGlmZSIsInRvdGFsTGlmZSIsInNldExpZmUiLCJsaWZlIiwiYmxvb2ROb2RlIiwiYmxvb2QiLCJzZXRCbG9vZEJhciIsInNldEJsb29kTGV2ZWwiLCJiYXIiLCJnZXRDaGlsZEJ5TmFtZSIsImJhclRvdGFsV2lkdGgiLCJ3aWR0aCIsInNldEJsb29kIiwiYWN0aXZlIiwicmVtb3ZlIiwiZnJhbWVTdGFydEV2dCIsImNvbnNvbGUiLCJsb2ciLCJmcmFtZUVuZEV2dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLFFBQVEsRUFBQztBQWhCRCxHQUhQO0FBc0JMO0FBRUFDLEVBQUFBLE1BeEJLLG9CQXdCSztBQUNOO0FBQ0EsUUFBRyxLQUFLQyxNQUFMLEVBQUgsRUFBa0I7QUFDZCxXQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsT0FBS0MsUUFBUSxDQUFDLEtBQUcsS0FBS0wsUUFBUixHQUFpQixDQUFsQixDQUFoQztBQUNIOztBQUNELFNBQUtNLFVBQUwsR0FBa0IsS0FBS0MsWUFBTCxDQUFrQlgsRUFBRSxDQUFDWSxTQUFyQixDQUFsQjtBQUNILEdBOUJJO0FBZ0NMO0FBRUFOLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFFBQUcsS0FBS0MsSUFBTCxDQUFVTSxLQUFWLENBQWdCQyxTQUFoQixDQUEwQixNQUExQixDQUFILEVBQXNDO0FBQ2xDLGFBQU8sSUFBUDtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNILEdBdkNJO0FBeUNMQyxFQUFBQSxTQUFTLEVBQUUsbUJBQVNDLEdBQVQsRUFBYztBQUNyQixTQUFLVCxJQUFMLENBQVVDLE1BQVYsR0FBbUJRLEdBQW5CO0FBQ0gsR0EzQ0k7QUE2Q0xDLEVBQUFBLFlBQVksRUFBRSxzQkFBU0QsR0FBVCxFQUFjO0FBQ3hCLFNBQUtFLFNBQUwsR0FBaUJGLEdBQWpCO0FBQ0gsR0EvQ0k7QUFpRExHLEVBQUFBLE9BQU8sRUFBRSxpQkFBU0gsR0FBVCxFQUFjO0FBQ25CLFNBQUtJLElBQUwsR0FBWUosR0FBWjtBQUNBLFFBQUlLLFNBQVMsR0FBRyxLQUFLQyxLQUFMLENBQVdYLFlBQVgsQ0FBd0IsVUFBeEIsQ0FBaEI7QUFDQVUsSUFBQUEsU0FBUyxDQUFDRSxXQUFWLENBQXNCLEtBQUtILElBQTNCLEVBQWlDLEtBQUtGLFNBQXRDO0FBQ0gsR0FyREk7QUF1RExNLEVBQUFBLGFBQWEsRUFBRSx1QkFBU1IsR0FBVCxFQUFjLENBRTVCLENBekRJO0FBMkRMTyxFQUFBQSxXQUFXLEVBQUUscUJBQVNILElBQVQsRUFBZTtBQUN4QixRQUFJSyxHQUFHLEdBQUcsS0FBS0gsS0FBTCxDQUFXSSxjQUFYLENBQTBCLEtBQTFCLENBQVY7QUFDQSxRQUFJQyxhQUFhLEdBQUcsS0FBS0wsS0FBTCxDQUFXTSxLQUEvQjtBQUNBSCxJQUFBQSxHQUFHLENBQUNHLEtBQUosR0FBWVIsSUFBSSxHQUFDLEtBQUtGLFNBQVYsR0FBc0JTLGFBQWxDO0FBQ0gsR0EvREk7QUFpRUxFLEVBQUFBLFFBQVEsRUFBRSxrQkFBU1AsS0FBVCxFQUFnQjtBQUN0QixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQSxLQUFMLENBQVdRLE1BQVgsR0FBb0IsSUFBcEI7QUFDSCxHQXBFSTtBQXNFTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFXLENBQ2xCLENBdkVJO0FBeUVMQyxFQUFBQSxhQUFhLEVBQUUseUJBQVc7QUFDdEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFFSCxHQTVFSTtBQThFTEMsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCRixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaO0FBQ0gsR0FoRkksQ0FpRkw7O0FBakZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGJhc2VQb3NZOjI4LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vIGJhc2UgcG9zdGlvbiBpcyBmaXhlZCBieSB0aGlzLmJhc2VQb3NZLlxuICAgICAgICBpZih0aGlzLmlzQmFzZSgpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwMCtwYXJzZUludCgzMi10aGlzLmJhc2VQb3NZLTIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7ICAgICAgICBcbiAgICB9LFxuXG4gICAgLy8gc3RhcnQgKCkge30sXG5cbiAgICBpc0Jhc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLm5vZGUuX25hbWUuc3RhcnRXaXRoKFwiYmFzZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzZXRaSW5kZXg6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gdmFsO1xuICAgIH0sXG5cbiAgICBzZXRUb3RhbExpZmU6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLnRvdGFsTGlmZSA9IHZhbDtcbiAgICB9LFxuXG4gICAgc2V0TGlmZTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMubGlmZSA9IHZhbDtcbiAgICAgICAgdmFyIGJsb29kTm9kZSA9IHRoaXMuYmxvb2QuZ2V0Q29tcG9uZW50KFwiQmxvb2RCYXJcIik7XG4gICAgICAgIGJsb29kTm9kZS5zZXRCbG9vZEJhcih0aGlzLmxpZmUsIHRoaXMudG90YWxMaWZlKTtcbiAgICB9LFxuXG4gICAgc2V0Qmxvb2RMZXZlbDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBzZXRCbG9vZEJhcjogZnVuY3Rpb24obGlmZSkge1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5ibG9vZC5nZXRDaGlsZEJ5TmFtZShcImJhclwiKTtcbiAgICAgICAgdmFyIGJhclRvdGFsV2lkdGggPSB0aGlzLmJsb29kLndpZHRoO1xuICAgICAgICBiYXIud2lkdGggPSBsaWZlL3RoaXMudG90YWxMaWZlICogYmFyVG90YWxXaWR0aDtcbiAgICB9LFxuXG4gICAgc2V0Qmxvb2Q6IGZ1bmN0aW9uKGJsb29kKSB7XG4gICAgICAgIHRoaXMuYmxvb2QgPSBibG9vZDtcbiAgICAgICAgdGhpcy5ibG9vZC5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBmcmFtZVN0YXJ0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdC5cIik7XG5cbiAgICB9LFxuXG4gICAgZnJhbWVFbmRFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxhc3QuXCIpO1xuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==