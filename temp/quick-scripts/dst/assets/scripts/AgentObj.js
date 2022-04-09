
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/AgentObj.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'de37fFOB2lBv76OrGfwhKh/', 'AgentObj');
// scripts/AgentObj.js

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
  start: function start() {},
  setTotalLife: function setTotalLife(val) {
    this.totalLife = val;
  },
  setLife: function setLife(val) {
    this.life = val; //this.setBloodBar(val);

    var bloodNode = this.blood.getComponent("BloodBar");
    bloodNode.setBloodBar(this.life, this.totalLife);
  },
  setGroupKill: function setGroupKill(val) {
    this.groupKill = val;
  },
  setBloodLevel: function setBloodLevel(val) {},
  setBlood: function setBlood(blood) {
    this.blood = blood;
    this.blood.active = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FnZW50T2JqLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiLCJzZXRUb3RhbExpZmUiLCJ2YWwiLCJ0b3RhbExpZmUiLCJzZXRMaWZlIiwibGlmZSIsImJsb29kTm9kZSIsImJsb29kIiwiZ2V0Q29tcG9uZW50Iiwic2V0Qmxvb2RCYXIiLCJzZXRHcm91cEtpbGwiLCJncm91cEtpbGwiLCJzZXRCbG9vZExldmVsIiwic2V0Qmxvb2QiLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQTtBQUVBQyxFQUFBQSxLQXpCSyxtQkF5QkksQ0FFUixDQTNCSTtBQTZCTEMsRUFBQUEsWUFBWSxFQUFFLHNCQUFTQyxHQUFULEVBQWM7QUFDeEIsU0FBS0MsU0FBTCxHQUFpQkQsR0FBakI7QUFDSCxHQS9CSTtBQWlDTEUsRUFBQUEsT0FBTyxFQUFFLGlCQUFTRixHQUFULEVBQWM7QUFDbkIsU0FBS0csSUFBTCxHQUFZSCxHQUFaLENBRG1CLENBRW5COztBQUNBLFFBQUlJLFNBQVMsR0FBRyxLQUFLQyxLQUFMLENBQVdDLFlBQVgsQ0FBd0IsVUFBeEIsQ0FBaEI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDRyxXQUFWLENBQXNCLEtBQUtKLElBQTNCLEVBQWlDLEtBQUtGLFNBQXRDO0FBQ0gsR0F0Q0k7QUF3Q0xPLEVBQUFBLFlBQVksRUFBRSxzQkFBU1IsR0FBVCxFQUFjO0FBQ3hCLFNBQUtTLFNBQUwsR0FBaUJULEdBQWpCO0FBQ0gsR0ExQ0k7QUE0Q0xVLEVBQUFBLGFBQWEsRUFBRSx1QkFBU1YsR0FBVCxFQUFjLENBRTVCLENBOUNJO0FBZ0RMVyxFQUFBQSxRQUFRLEVBQUUsa0JBQVNOLEtBQVQsRUFBZ0I7QUFDdEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0EsS0FBTCxDQUFXTyxNQUFYLEdBQW9CLElBQXBCO0FBQ0gsR0FuREksQ0FxREw7O0FBckRLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIHNldFRvdGFsTGlmZTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMudG90YWxMaWZlID0gdmFsO1xuICAgIH0sXG5cbiAgICBzZXRMaWZlOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5saWZlID0gdmFsO1xuICAgICAgICAvL3RoaXMuc2V0Qmxvb2RCYXIodmFsKTtcbiAgICAgICAgdmFyIGJsb29kTm9kZSA9IHRoaXMuYmxvb2QuZ2V0Q29tcG9uZW50KFwiQmxvb2RCYXJcIik7XG4gICAgICAgIGJsb29kTm9kZS5zZXRCbG9vZEJhcih0aGlzLmxpZmUsIHRoaXMudG90YWxMaWZlKTtcbiAgICB9LFxuXG4gICAgc2V0R3JvdXBLaWxsOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5ncm91cEtpbGwgPSB2YWw7XG4gICAgfSxcblxuICAgIHNldEJsb29kTGV2ZWw6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgc2V0Qmxvb2Q6IGZ1bmN0aW9uKGJsb29kKSB7XG4gICAgICAgIHRoaXMuYmxvb2QgPSBibG9vZDtcbiAgICAgICAgdGhpcy5ibG9vZC5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19