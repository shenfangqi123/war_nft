
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/aniComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '86f1aoqPclID4CwDWRy9QKi', 'aniComponent');
// scripts/aniComponent.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    sprAtlas: cc.SpriteAtlas,
    wrapMode: cc.WrapMode["default"]
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this._animation = this.getComponent(cc.Animation);
    this.setAnimation();
  },
  start: function start() {
    this.playAnimation();
  },
  setAnimation: function setAnimation() {
    var self = this;

    if (this.sprAtlas) {
      var frames = this.sprAtlas.getSpriteFrames();
      var clip = cc.AnimationClip.createWithSpriteFrames(frames, frames.length);
      clip.name = "anim_001";
      clip.speed = 0.1;
      clip.sample = 60;
      clip.wrapMode = this.wrapMode;

      this._animation.addClip(clip);
    }
  },
  playAnimation: function playAnimation(wrapMode, speed, sample) {
    if (wrapMode === void 0) {
      wrapMode = cc.WrapMode.Default;
    }

    if (speed === void 0) {
      speed = 0.5;
    }

    if (sample === void 0) {
      sample = 60;
    }

    if (this._animation) {
      var animState = this._animation.getAnimationState("anim_001");

      animState.clip.wrapMode = wrapMode;
      animState.clip.speed = speed;
      animState.clip.sample = sample;

      this._animation.play("anim_001");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2FuaUNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwckF0bGFzIiwiU3ByaXRlQXRsYXMiLCJ3cmFwTW9kZSIsIldyYXBNb2RlIiwib25Mb2FkIiwiX2FuaW1hdGlvbiIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInNldEFuaW1hdGlvbiIsInN0YXJ0IiwicGxheUFuaW1hdGlvbiIsInNlbGYiLCJmcmFtZXMiLCJnZXRTcHJpdGVGcmFtZXMiLCJjbGlwIiwiQW5pbWF0aW9uQ2xpcCIsImNyZWF0ZVdpdGhTcHJpdGVGcmFtZXMiLCJsZW5ndGgiLCJuYW1lIiwic3BlZWQiLCJzYW1wbGUiLCJhZGRDbGlwIiwiRGVmYXVsdCIsImFuaW1TdGF0ZSIsImdldEFuaW1hdGlvblN0YXRlIiwicGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUosRUFBRSxDQUFDSyxXQURMO0FBRVJDLElBQUFBLFFBQVEsRUFBRU4sRUFBRSxDQUFDTyxRQUFIO0FBRkYsR0FIUDtBQVFMO0FBRUFDLEVBQUFBLE1BVkssb0JBVUs7QUFDTixTQUFLQyxVQUFMLEdBQWtCLEtBQUtDLFlBQUwsQ0FBa0JWLEVBQUUsQ0FBQ1csU0FBckIsQ0FBbEI7QUFDQSxTQUFLQyxZQUFMO0FBQ0gsR0FiSTtBQWVMQyxFQUFBQSxLQWZLLG1CQWVJO0FBQ0wsU0FBS0MsYUFBTDtBQUNILEdBakJJO0FBbUJMRixFQUFBQSxZQW5CSywwQkFtQlc7QUFDWixRQUFJRyxJQUFJLEdBQUcsSUFBWDs7QUFDQSxRQUFHLEtBQUtYLFFBQVIsRUFBa0I7QUFDZCxVQUFJWSxNQUFNLEdBQUcsS0FBS1osUUFBTCxDQUFjYSxlQUFkLEVBQWI7QUFDQSxVQUFJQyxJQUFJLEdBQUdsQixFQUFFLENBQUNtQixhQUFILENBQWlCQyxzQkFBakIsQ0FBd0NKLE1BQXhDLEVBQStDQSxNQUFNLENBQUNLLE1BQXRELENBQVg7QUFDQUgsTUFBQUEsSUFBSSxDQUFDSSxJQUFMLEdBQVksVUFBWjtBQUNBSixNQUFBQSxJQUFJLENBQUNLLEtBQUwsR0FBYSxHQUFiO0FBQ0FMLE1BQUFBLElBQUksQ0FBQ00sTUFBTCxHQUFjLEVBQWQ7QUFDQU4sTUFBQUEsSUFBSSxDQUFDWixRQUFMLEdBQWdCLEtBQUtBLFFBQXJCOztBQUNBLFdBQUtHLFVBQUwsQ0FBZ0JnQixPQUFoQixDQUF3QlAsSUFBeEI7QUFDSDtBQUNKLEdBOUJJO0FBZ0NMSixFQUFBQSxhQWhDSyx5QkFnQ1VSLFFBaENWLEVBZ0MwQ2lCLEtBaEMxQyxFQWdDdURDLE1BaEN2RCxFQWdDb0U7QUFBQSxRQUExRGxCLFFBQTBEO0FBQTFEQSxNQUFBQSxRQUEwRCxHQUEvQ04sRUFBRSxDQUFDTyxRQUFILENBQVltQixPQUFtQztBQUFBOztBQUFBLFFBQTFCSCxLQUEwQjtBQUExQkEsTUFBQUEsS0FBMEIsR0FBbEIsR0FBa0I7QUFBQTs7QUFBQSxRQUFiQyxNQUFhO0FBQWJBLE1BQUFBLE1BQWEsR0FBSixFQUFJO0FBQUE7O0FBQ3JFLFFBQUcsS0FBS2YsVUFBUixFQUFvQjtBQUNoQixVQUFJa0IsU0FBUyxHQUFHLEtBQUtsQixVQUFMLENBQWdCbUIsaUJBQWhCLENBQWtDLFVBQWxDLENBQWhCOztBQUNBRCxNQUFBQSxTQUFTLENBQUNULElBQVYsQ0FBZVosUUFBZixHQUEwQkEsUUFBMUI7QUFDQXFCLE1BQUFBLFNBQVMsQ0FBQ1QsSUFBVixDQUFlSyxLQUFmLEdBQXVCQSxLQUF2QjtBQUNBSSxNQUFBQSxTQUFTLENBQUNULElBQVYsQ0FBZU0sTUFBZixHQUF3QkEsTUFBeEI7O0FBQ0EsV0FBS2YsVUFBTCxDQUFnQm9CLElBQWhCLENBQXFCLFVBQXJCO0FBQ0g7QUFDSixHQXhDSSxDQTBDTDs7QUExQ0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcHJBdGxhczogY2MuU3ByaXRlQXRsYXMsXG4gICAgICAgIHdyYXBNb2RlOiBjYy5XcmFwTW9kZS5kZWZhdWx0LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKCk7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7XG4gICAgfSxcblxuICAgIHNldEFuaW1hdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYodGhpcy5zcHJBdGxhcykge1xuICAgICAgICAgICAgdmFyIGZyYW1lcyA9IHRoaXMuc3ByQXRsYXMuZ2V0U3ByaXRlRnJhbWVzKCk7XG4gICAgICAgICAgICB2YXIgY2xpcCA9IGNjLkFuaW1hdGlvbkNsaXAuY3JlYXRlV2l0aFNwcml0ZUZyYW1lcyhmcmFtZXMsZnJhbWVzLmxlbmd0aCk7XG4gICAgICAgICAgICBjbGlwLm5hbWUgPSBcImFuaW1fMDAxXCI7XG4gICAgICAgICAgICBjbGlwLnNwZWVkID0gMC4xO1xuICAgICAgICAgICAgY2xpcC5zYW1wbGUgPSA2MDtcbiAgICAgICAgICAgIGNsaXAud3JhcE1vZGUgPSB0aGlzLndyYXBNb2RlO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmFkZENsaXAoY2xpcCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUFuaW1hdGlvbiAod3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5EZWZhdWx0LCBzcGVlZCA9IDAuNSwgc2FtcGxlID0gNjApIHtcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB2YXIgYW5pbVN0YXRlID0gdGhpcy5fYW5pbWF0aW9uLmdldEFuaW1hdGlvblN0YXRlKFwiYW5pbV8wMDFcIik7XG4gICAgICAgICAgICBhbmltU3RhdGUuY2xpcC53cmFwTW9kZSA9IHdyYXBNb2RlO1xuICAgICAgICAgICAgYW5pbVN0YXRlLmNsaXAuc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5jbGlwLnNhbXBsZSA9IHNhbXBsZTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiYW5pbV8wMDFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19