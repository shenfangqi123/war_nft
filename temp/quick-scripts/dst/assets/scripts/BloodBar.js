
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/BloodBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9d601PjDUNLg5RyV8ikyzg8', 'BloodBar');
// scripts/BloodBar.js

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
String.prototype.startWith = function (str) {
  var reg = new RegExp("^" + str);
  return reg.test(this);
};

cc.Class({
  "extends": cc.Component,
  properties: {
    hp: -1,
    barWidth: 50,
    upToHead: 30,
    level: 1,
    role: ""
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.active = false;
    this.setBarWidth();

    if (this.isBase()) {
      this.setLoc(0, this.node.parent.height / 2 + 20);
    } else if (this.isFort1()) {
      this.setLoc(0, this.node.parent.height / 2 + 60);
    } else {
      this.setLoc(0, this.node.parent.height);
    }
  },
  //start () {},
  setBarWidth: function setBarWidth() {
    var bar = this.node.getChildByName("bar");
    var level = this.node.getChildByName("level");

    if (this.isBase()) {
      this.node.width = 80;
    } else if (this.isFort1()) {
      this.node.width = 50;
    } else {
      this.node.width = 30;
    }

    bar.x = this.node.width / 2 * -1;
    level.x = bar.x - 5;
  },
  isBase: function isBase() {
    if (this.node.parent._name.startWith("base")) {
      return true;
    }

    return false;
  },
  isFort1: function isFort1() {
    if (this.node.parent.spName == "FortASprite") {
      return true;
    }

    return false;
  },
  setLoc: function setLoc(px, py) {
    var moveTo = cc.v2(px, py);
    this.node.setPosition(moveTo);
  },
  setBarLevel: function setBarLevel(val) {
    if (val === undefined) {
      val = 1;
    }

    var level = this.node.getChildByName("level");
    level.getComponent(cc.Label).string = val;
  },
  setBloodBar: function setBloodBar(life, totalLife) {
    if (life < totalLife) {
      this.node.active = true;
    }

    var bar = this.node.getChildByName("bar");
    var barTotalWidth = this.node.width;
    bar.width = life / totalLife * barTotalWidth;

    if (life < totalLife * 0.35) {
      bar.color = new cc.Color(250, 0, 0);
    } else {
      bar.color = new cc.Color(50, 250, 0);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0Jsb29kQmFyLmpzIl0sIm5hbWVzIjpbIlN0cmluZyIsInByb3RvdHlwZSIsInN0YXJ0V2l0aCIsInN0ciIsInJlZyIsIlJlZ0V4cCIsInRlc3QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhwIiwiYmFyV2lkdGgiLCJ1cFRvSGVhZCIsImxldmVsIiwicm9sZSIsIm9uTG9hZCIsIm5vZGUiLCJhY3RpdmUiLCJzZXRCYXJXaWR0aCIsImlzQmFzZSIsInNldExvYyIsInBhcmVudCIsImhlaWdodCIsImlzRm9ydDEiLCJiYXIiLCJnZXRDaGlsZEJ5TmFtZSIsIndpZHRoIiwieCIsIl9uYW1lIiwic3BOYW1lIiwicHgiLCJweSIsIm1vdmVUbyIsInYyIiwic2V0UG9zaXRpb24iLCJzZXRCYXJMZXZlbCIsInZhbCIsInVuZGVmaW5lZCIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwic2V0Qmxvb2RCYXIiLCJsaWZlIiwidG90YWxMaWZlIiwiYmFyVG90YWxXaWR0aCIsImNvbG9yIiwiQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsU0FBakIsR0FBMkIsVUFBU0MsR0FBVCxFQUFhO0FBQ3RDLE1BQUlDLEdBQUcsR0FBQyxJQUFJQyxNQUFKLENBQVcsTUFBSUYsR0FBZixDQUFSO0FBQ0EsU0FBT0MsR0FBRyxDQUFDRSxJQUFKLENBQVMsSUFBVCxDQUFQO0FBQ0QsQ0FIRDs7QUFLQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEVBQUUsRUFBQyxDQUFDLENBREk7QUFFUkMsSUFBQUEsUUFBUSxFQUFDLEVBRkQ7QUFHUkMsSUFBQUEsUUFBUSxF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QWVDLFNBQWYsRUFBMEI7QUFDbkMsUUFBR0QsSUFBSSxHQUFHQyxTQUFWLEVBQXFCO0FBQ2pCLFdBQUszQixJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSDs7QUFDRCxRQUFJTyxHQUFHLEdBQUcsS0FBS1IsSUFBTCxDQUFVUyxjQUFWLENBQXlCLEtBQXpCLENBQVY7QUFDQSxRQUFJbUIsYUFBYSxHQUFHLEtBQUs1QixJQUFMLENBQVVVLEtBQTlCO0FBQ0FGLElBQUFBLEdBQUcsQ0FBQ0UsS0FBSixHQUFZZ0IsSUFBSSxHQUFDQyxTQUFMLEdBQWlCQyxhQUE3Qjs7QUFFQSxRQUFHRixJQUFJLEdBQUdDLFNBQVMsR0FBRyxJQUF0QixFQUE0QjtBQUN4Qm5CLE1BQUFBLEdBQUcsQ0FBQ3FCLEtBQUosR0FBWSxJQUFJdkMsRUFBRSxDQUFDd0MsS0FBUCxDQUFhLEdBQWIsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsQ0FBWjtBQUNILEtBRkQsTUFFTztBQUNIdEIsTUFBQUEsR0FBRyxDQUFDcUIsS0FBSixHQUFZLElBQUl2QyxFQUFFLENBQUN3QyxLQUFQLENBQWEsRUFBYixFQUFnQixHQUFoQixFQUFvQixDQUFwQixDQUFaO0FBQ0g7QUFDSixHQXhGSSxDQTBGTDs7QUExRkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblN0cmluZy5wcm90b3R5cGUuc3RhcnRXaXRoPWZ1bmN0aW9uKHN0cil7ICAgIFxuICB2YXIgcmVnPW5ldyBSZWdFeHAoXCJeXCIrc3RyKTsgICAgXG4gIHJldHVybiByZWcudGVzdCh0aGlzKTsgICAgICAgXG59IFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBocDotMSxcbiAgICAgICAgYmFyV2lkdGg6NTAsXG4gICAgICAgIHVwVG9IZWFkOjMwLFxuICAgICAgICBsZXZlbDoxLFxuICAgICAgICByb2xlOlwiXCIsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldEJhcldpZHRoKCk7XG4gICAgICAgIGlmKHRoaXMuaXNCYXNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jKDAsIHRoaXMubm9kZS5wYXJlbnQuaGVpZ2h0LzIrMjApO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHRoaXMuaXNGb3J0MSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNldExvYygwLCB0aGlzLm5vZGUucGFyZW50LmhlaWdodC8yKzYwKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldExvYygwLCB0aGlzLm5vZGUucGFyZW50LmhlaWdodCk7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9zdGFydCAoKSB7fSxcblxuICAgIHNldEJhcldpZHRoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhclwiKTtcbiAgICAgICAgdmFyIGxldmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XG5cbiAgICAgICAgaWYodGhpcy5pc0Jhc2UoKSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gODA7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYodGhpcy5pc0ZvcnQxKCkpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IDUwO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IDMwO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFyLnggPSB0aGlzLm5vZGUud2lkdGgvMiotMTtcbiAgICAgICAgbGV2ZWwueCA9IGJhci54IC0gNTtcbiAgICB9LFxuXG4gICAgaXNCYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYodGhpcy5ub2RlLnBhcmVudC5fbmFtZS5zdGFydFdpdGgoXCJiYXNlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGlzRm9ydDE6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLm5vZGUucGFyZW50LnNwTmFtZSA9PSBcIkZvcnRBU3ByaXRlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2V0TG9jOiBmdW5jdGlvbihweCwgcHkpIHtcbiAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgIH0sXG5cbiAgICBzZXRCYXJMZXZlbDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWwgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxldmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XG4gICAgICAgIGxldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsO1xuICAgIH0sXG5cbiAgICBzZXRCbG9vZEJhcjogZnVuY3Rpb24obGlmZSwgdG90YWxMaWZlKSB7XG4gICAgICAgIGlmKGxpZmUgPCB0b3RhbExpZmUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIik7XG4gICAgICAgIHZhciBiYXJUb3RhbFdpZHRoID0gdGhpcy5ub2RlLndpZHRoO1xuICAgICAgICBiYXIud2lkdGggPSBsaWZlL3RvdGFsTGlmZSAqIGJhclRvdGFsV2lkdGg7XG5cbiAgICAgICAgaWYobGlmZSA8IHRvdGFsTGlmZSAqIDAuMzUpIHtcbiAgICAgICAgICAgIGJhci5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTAsMCwwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhci5jb2xvciA9IG5ldyBjYy5Db2xvcig1MCwyNTAsMCk7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==