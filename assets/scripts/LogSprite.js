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
    extends: cc.Component,

    properties: {
        role:"log",
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._animation = this.getComponent(cc.Animation);
        this._animation.WrapMode = cc.WrapMode.Default;
    },

    setId: function(aid) {
        this.aid = aid;
    },

    setShadow: function(shadow) {
        this.shadow = shadow;
        this.shadow.active = true;
    },

    frame1Evt: function() {
        this.dispShadow();
    },

    frame2Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-20);
        this.shadow.setPosition(moveTo);
    },

    frame3Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-20);
        this.shadow.setPosition(moveTo);
    },

    frame4Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-5);
        this.shadow.setPosition(moveTo);
    },

    frame5Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-5);
        this.shadow.setPosition(moveTo);
    },

    frame6Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-5);
        this.shadow.setPosition(moveTo);
    },

    frame7Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-10);
        this.shadow.setPosition(moveTo);
    },

    frame8Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-10);
        this.shadow.setPosition(moveTo);
    },

    frame9Evt: function() {
        this.dispShadow();

        var np = this.shadow.getPosition();
        var moveTo = cc.v2(np.x, np.y-10);
        this.shadow.setPosition(moveTo);

        this.play();
    },

    frame11Evt: function() {
        this.dispShadow();

        //since 2.1.1 setRotation is desperated.
        this.shadow.angle = 2;
        //this.shadow.setRotation(-2);
    },

    frame12Evt: function() {
        this.dispShadow();
        this.shadow.angle = 3;
        //this.shadow.setRotation(3);
    },

    frame13Evt: function() {
        this.dispShadow();
        this.shadow.angle = 3;
        //this.shadow.setRotation(-3);
    },

    frame14Evt: function() {
        this.dispShadow();
        this.shadow.angle = -2;
        //this.shadow.setRotation(2);
    },

    frame15Evt: function() {
        this.dispShadow();
        this.shadow.angle = 3;
        //this.shadow.setRotation(-3);
    },

    frame16Evt: function() {
        this.dispShadow();
        this.shadow.angle = -2;
        //this.shadow.setRotation(2);
    },

    move: function(mypos) {
        var px,py,moveTo;
        px = (mypos.x)*30;
        py = (mypos.y)*30;    

        moveTo = cc.v2(px, py);

        //1000:agent, 999:this bullet 998:forts;
        //make bullet display under agent which is at same position.
        //this.node.zIndex = 999+parseInt(32-mypos.y);

        this.node.zIndex = 2001;

        this.node.setPosition(moveTo);

        this.updateShadow(mypos);
    },

    updateShadow: function(mypos) {
        var px, py, moveTo;
        px = (mypos.x)*30 + 20;
        py = (mypos.y)*30;    

        moveTo = cc.v2(px, py);
        if(this.shadow) {
            this.shadow.setPosition(moveTo);     
        }
        return;
    },

    remove: function() {
        this.shadow.destroy();
        this.node.destroy();
    },

    play: function() {
        this._animation.play("rollingLog");
    },

    shadowForAgent: function () {
        var shadowObj = cc.instantiate(this.playerPrefab[2]);
        // 将新增的节点添加到 Canvas 节点下面
        shadowObj.active = false;
        this.node.addChild(shadowObj);
        return shadowObj;
    },

    dispShadow: function() {
        //shadow object may not ready in init() when playing
        if(!this.shadow) return;

        var shadowNode = this.shadow;
        var frameImg = "log_shadow/logShadow";

        this.shadow.active = true;
        cc.loader.loadRes(frameImg, cc.SpriteFrame, function (err, spriteFrame) {
            if(shadowNode) {
                try {
                    if(shadowNode._name != "") {
                        shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                } catch (e) {
                    console.log(shadowNode);
                    console.log(e);
                }
            }
        });
    },

    // update (dt) {},
});
