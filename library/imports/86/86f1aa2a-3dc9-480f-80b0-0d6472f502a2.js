"use strict";
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