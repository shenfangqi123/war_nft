var mySprite = require("MySprite");
var common = require("Common");

cc.Class({
    extends: mySprite,

    properties: {
        role:"crab",
        aniType:"dragon",
    },

    start () {
        //this._animation = this.getComponent(cc.Animation);
        //this._animation.WrapMode = cc.WrapMode.Loop;
    },

    remove: function() {
        //this._animation.play("dieoff2");
        //this.shadow.destroy();
        this.blood.destroy();
        this.node.destroy();
    },

    playAni: function(agent, agentFuture, isMainPlayer) {
        this.playAngleAnimationRemote(agent, agentFuture, isMainPlayer);
    },

});
