var mySprite = require("MySprite")

cc.Class({
    extends: mySprite,

    properties: {
        role:"hr",
    },

    start () {
        this.layoutOp = this.node.parent.getComponent('Game');
    },

    shootArrow: function() {
    },  

    getAttackDistance: function(agent) {
        return (agent.size + agent.esize)*0.5*1.2;
    },

    playAni: function(agent, agentFuture, isMainPlayer) {
        this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
    },

    remove: function() {
        this._animation.play("dieoff1");
        this.shadow.destroy();
        this.blood.destroy();
    },

    playEffect: function() {
        this.layoutOp.playEffect("hr", this.node.x, this.node.y);
    },

    removeEffect: function() {

    },

    dieStart: function() {
    },

    dieEnd: function() {
        this._animation.play("footprint");
    },

    //ske clip ske_bomb, foot print start evt
    footStart: function() {
        this.node.zIndex = -1;
        this.node.scaleX = 1;
        this.node.scaleY = 1;
    },

    footEnd: function() {
        this.node.destroy();
    },

    //ske clip ske_bomb, called by first frame of ske_bomb
    beforeKill: function() {
        //this.shadow.destroy();
    },

    //ske clip ske_bomb, called by last frame of ske_bomb
    afterKill: function() {
        this.node.destroy();
    },

    frame1Evt: function() {
        this.dispShadow(1);
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


    //----usual attack-------
    aFrame1Evt: function() {
        this.attacking = true;
        this.dispShadow(2);
        this.layoutOp.playSnd("hr");
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
        this.attacking = false;
    },


    //----spin attack effect included------
    aFrame11Evt: function() {
        this.attacking = true;
        this.dispShadow(2);
        this.playEffect();
    },

    aFrame12Evt: function() {
    },

    aFrame13Evt: function() {
        this.dispShadow(4);
    },

    aFrame14Evt: function() {
    },

    aFrame15Evt: function() {
    },

    aFrame16Evt: function() {
        this.dispShadow(7);
        this.attacking = false;
    }


    // update (dt) {},
});
