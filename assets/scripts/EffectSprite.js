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
        role:"",
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //fire drop effect
        if(this.role == "fd") {
            this.node.zIndex = 9999;
        }
        else if(this.role == "firecircle") {
            this.node.zIndex = 9999;
        }
        //lightman attack effect
        else if(this.role == "light") {
            this.node.zIndex = 9999;
        }
        else if(this.role == "doubleMagic") {
            this.node.zIndex = 9999;
        }
    },

    spinEffectEndEvt: function() {
        this.node.destroy();
    },

    wizfireEffectEndEvt: function() {
        this.node.destroy();
    },

    lightEffectEndEvt: function() {
        this.node.destroy();
    },

    fd_frame5Evt: function() {
        this.node.zIndex = 9999;
    },

    fd_frame5Evt: function() {
        this.node.zIndex = -1;
    },

    fd_EffectEndEvt: function() {
        this.node.destroy();
    },

    doubleMagic_dispEnd: function() {
        this.node.destroy();
    },

    // update (dt) {},
});
