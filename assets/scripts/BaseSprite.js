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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        basePosY:28,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // base postion is fixed by this.basePosY.
        if(this.isBase()) {
            this.node.zIndex = 1000+parseInt(32-this.basePosY-2);
        }
        this._animation = this.getComponent(cc.Animation);        
    },

    // start () {},

    isBase: function() {
        if(this.node._name.startWith("base")) {
            return true;
        }
        return false;
    },

    setZIndex: function(val) {
        this.node.zIndex = val;
    },

    setTotalLife: function(val) {
        this.totalLife = val;
    },

    setLife: function(val) {
        this.life = val;
        var bloodNode = this.blood.getComponent("BloodBar");
        bloodNode.setBloodBar(this.life, this.totalLife);
    },

    setBloodLevel: function(val) {
        
    },

    setBloodBar: function(life) {
        var bar = this.blood.getChildByName("bar");
        var barTotalWidth = this.blood.width;
        bar.width = life/this.totalLife * barTotalWidth;
    },

    setBlood: function(blood) {
        this.blood = blood;
        this.blood.active = true;
    },

    remove: function() {
    },

    frameStartEvt: function() {
        console.log("first.");

    },

    frameEndEvt: function() {
        console.log("last.");
    },
    // update (dt) {},
});
