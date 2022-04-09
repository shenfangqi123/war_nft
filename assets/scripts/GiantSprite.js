var mySprite = require("MySprite")

cc.Class({
    extends: mySprite,

    properties: {
        role:"gi",
    },

    // onLoad () {},

    start () {
        //this._animation = this.getComponent(cc.Animation);
        //this._animation.WrapMode = cc.WrapMode.Loop;
        this.shadow.scaleX = 1.2;
        this.shadow.scaleY = 1.2;
    },

    getAttackDistance: function(agent) {
        return (agent.size + agent.esize)*0.5*1.5;
    },

    remove: function() {
        //this.getChildByName("blood").active = false;
        this._animation.play("dieoff1");
        this.shadow.destroy();
        this.blood.destroy();
    },

    dieStart: function() {
    },

    dieEnd: function() {
        this._animation.play("footprint");
    },

    //ske clip ske_bomb, foot print start evt
    footStart: function() {
        this.node.zIndex = -1;
    },

    footEnd: function() {
        this.node.destroy();
    },

    playAni: function(agent, agentFuture, isMainPlayer) {
        this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
    },

    frame1Evt: function() {
        this.dispShadow(1);
        this.shadow.zIndex = -1;
    },

    frame2Evt: function() {
        this.dispShadow(2);
    },

    frame3Evt: function() {
        this.dispShadow(3);
    },

    frame4Evt: function() {
        this.dispShadow(4);
    },

    frame5Evt: function() {
        this.dispShadow(5);
    },

    frame6Evt: function() {
        this.dispShadow(6);
    },

    frame7Evt: function() {
        this.dispShadow(7);
    },

    aFrame1Evt: function() {
        this.dispShadow(2);
        this.layoutOp.playSnd("gi");
    },

    aFrame2Evt: function() {
    },

    aFrame3Evt: function() {
        this.dispShadow(4);
    },

    aFrame4Evt: function() {
    },

    aFrame5Evt: function() {
    },

    aFrame6Evt: function() {
        this.dispShadow(7);
    }
    // update (dt) {},
});
