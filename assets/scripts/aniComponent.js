
cc.Class({
    extends: cc.Component,

    properties: {
        sprAtlas: cc.SpriteAtlas,
        wrapMode: cc.WrapMode.default,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._animation = this.getComponent(cc.Animation);
        this.setAnimation();
    },

    start () {
        this.playAnimation();
    },

    setAnimation () {
        var self = this;
        if(this.sprAtlas) {
            var frames = this.sprAtlas.getSpriteFrames();
            var clip = cc.AnimationClip.createWithSpriteFrames(frames,frames.length);
            clip.name = "anim_001";
            clip.speed = 0.1;
            clip.sample = 60;
            clip.wrapMode = this.wrapMode;
            this._animation.addClip(clip);
        }
    },

    playAnimation (wrapMode = cc.WrapMode.Default, speed = 0.5, sample = 60) {
        if(this._animation) {
            var animState = this._animation.getAnimationState("anim_001");
            animState.clip.wrapMode = wrapMode;
            animState.clip.speed = speed;
            animState.clip.sample = sample;
            this._animation.play("anim_001");
        }
    }

    // update (dt) {},
});
