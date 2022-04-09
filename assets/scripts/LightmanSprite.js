var mySprite = require("MySprite")

cc.Class({
    extends: mySprite,

    properties: {
        role:"lm",
    },

    start () {
        this.layoutOp = this.node.parent.getComponent('Game');
    },

    getAttackDistance: function(agent) {
        this.attactDistance = (agent.size + agent.esize)*0.5*1.2;
        return this.attactDistance;
    },

    playAni: function(agent, agentFuture, isMainPlayer) {
        this.tkx = agent.enemypos.x*30;
        this.tky = agent.enemypos.y*30;
        this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
    },

    remove: function() {
        this._animation.play("dieoff1");
        this.shadow.destroy();
        this.blood.destroy();
    },

    playEffect: function() {
        // attack action will take some time while target enemy may dead, and will locate to another emeny.
        // and the effect will show on that enemy. to avoid that, try to judge if the effect is very far away from current position.
        var p1 = cc.v2(this.node.x, this.node.y);
        var p2 = cc.v2(this.tkx, this.tky);
        var distance = p1.sub(p2).mag();
        if(distance < this.attactDistance*30*2) {
            this.layoutOp.playEffect("lm", this.tkx, this.tky);
        }
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

    aFrame1Evt: function() {
        this.attacking = true;
        this.dispShadow(2);
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
        this.playEffect();

        this.attacking = false;
    }

    // update (dt) {},
});
