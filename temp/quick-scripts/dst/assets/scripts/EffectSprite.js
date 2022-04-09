
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/EffectSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6172fstN/ZA5rLXNIqCyFp/', 'EffectSprite');
// scripts/EffectSprite.js

"use strict";

var _cc$Class;

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class((_cc$Class = {
  "extends": cc.Component,
  properties: {
    role: ""
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    //fire drop effect
    if (this.role == "fd") {
      this.node.zIndex = 9999;
    } else if (this.role == "firecircle") {
      this.node.zIndex = 9999;
    } //lightman attack effect
    else if (this.role == "light") {
        this.node.zIndex = 9999;
      } else if (this.role == "doubleMagic") {
        this.node.zIndex = 9999;
      }
  },
  spinEffectEndEvt: function spinEffectEndEvt() {
    this.node.destroy();
  },
  wizfireEffectEndEvt: function wizfireEffectEndEvt() {
    this.node.destroy();
  },
  lightEffectEndEvt: function lightEffectEndEvt() {
    this.node.destroy();
  },
  fd_frame5Evt: function fd_frame5Evt() {
    this.node.zIndex = 9999;
  }
}, _cc$Class["fd_frame5Evt"] = function fd_frame5Evt() {
  this.node.zIndex = -1;
}, _cc$Class.fd_EffectEndEvt = function fd_EffectEndEvt() {
  this.node.destroy();
}, _cc$Class.doubleMagic_dispEnd = function doubleMagic_dispEnd() {
  this.node.destroy();
}, _cc$Class));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0VmZmVjdFNwcml0ZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsIm5vZGUiLCJ6SW5kZXgiLCJzcGluRWZmZWN0RW5kRXZ0IiwiZGVzdHJveSIsIndpemZpcmVFZmZlY3RFbmRFdnQiLCJsaWdodEVmZmVjdEVuZEV2dCIsImZkX2ZyYW1lNUV2dCIsImZkX0VmZmVjdEVuZEV2dCIsImRvdWJsZU1hZ2ljX2Rpc3BFbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFIO0FBQ0ksYUFBU0QsRUFBRSxDQUFDRSxTQURoQjtBQUdJQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBREcsR0FIaEI7QUFPSTtBQUVBO0FBRUFDLEVBQUFBLEtBWEosbUJBV2E7QUFDTDtBQUNBLFFBQUcsS0FBS0QsSUFBTCxJQUFhLElBQWhCLEVBQXNCO0FBQ2xCLFdBQUtFLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNILEtBRkQsTUFHSyxJQUFHLEtBQUtILElBQUwsSUFBYSxZQUFoQixFQUE4QjtBQUMvQixXQUFLRSxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSCxLQUZJLENBR0w7QUFISyxTQUlBLElBQUcsS0FBS0gsSUFBTCxJQUFhLE9BQWhCLEVBQXlCO0FBQzFCLGFBQUtFLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNILE9BRkksTUFHQSxJQUFHLEtBQUtILElBQUwsSUFBYSxhQUFoQixFQUErQjtBQUNoQyxhQUFLRSxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSDtBQUNKLEdBMUJMO0FBNEJJQyxFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBVztBQUN6QixTQUFLRixJQUFMLENBQVVHLE9BQVY7QUFDSCxHQTlCTDtBQWdDSUMsRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVc7QUFDNUIsU0FBS0osSUFBTCxDQUFVRyxPQUFWO0FBQ0gsR0FsQ0w7QUFvQ0lFLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFXO0FBQzFCLFNBQUtMLElBQUwsQ0FBVUcsT0FBVjtBQUNILEdBdENMO0FBd0NJRyxFQUFBQSxZQUFZLEVBQUUsd0JBQVc7QUFDckIsU0FBS04sSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0g7QUExQ0wsK0JBNENrQix3QkFBVztBQUNyQixPQUFLRCxJQUFMLENBQVVDLE1BQVYsR0FBbUIsQ0FBQyxDQUFwQjtBQUNILENBOUNMLFlBZ0RJTSxlQWhESixHQWdEcUIsMkJBQVc7QUFDeEIsT0FBS1AsSUFBTCxDQUFVRyxPQUFWO0FBQ0gsQ0FsREwsWUFvRElLLG1CQXBESixHQW9EeUIsK0JBQVc7QUFDNUIsT0FBS1IsSUFBTCxDQUFVRyxPQUFWO0FBQ0gsQ0F0REwiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvbGU6XCJcIixcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vZmlyZSBkcm9wIGVmZmVjdFxuICAgICAgICBpZih0aGlzLnJvbGUgPT0gXCJmZFwiKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMucm9sZSA9PSBcImZpcmVjaXJjbGVcIikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIH1cbiAgICAgICAgLy9saWdodG1hbiBhdHRhY2sgZWZmZWN0XG4gICAgICAgIGVsc2UgaWYodGhpcy5yb2xlID09IFwibGlnaHRcIikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnJvbGUgPT0gXCJkb3VibGVNYWdpY1wiKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzcGluRWZmZWN0RW5kRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgd2l6ZmlyZUVmZmVjdEVuZEV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGxpZ2h0RWZmZWN0RW5kRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZmRfZnJhbWU1RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgfSxcblxuICAgIGZkX2ZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAtMTtcbiAgICB9LFxuXG4gICAgZmRfRWZmZWN0RW5kRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZG91YmxlTWFnaWNfZGlzcEVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=