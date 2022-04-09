// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
String.prototype.startWith=function(str){    
  var reg=new RegExp("^"+str);    
  return reg.test(this);       
} 

cc.Class({
    extends: cc.Component,

    properties: {
        hp:-1,
        barWidth:50,
        upToHead:30,
        level:1,
        role:"",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active = false;
        this.setBarWidth();
        if(this.isBase()) {
            this.setLoc(0, this.node.parent.height/2+20);
        } 
        else if(this.isFort1()) {
            this.setLoc(0, this.node.parent.height/2+60);
        } 
        else {
            this.setLoc(0, this.node.parent.height);            
        }
    },

    //start () {},

    setBarWidth: function() {
        var bar = this.node.getChildByName("bar");
        var level = this.node.getChildByName("level");

        if(this.isBase()) {
            this.node.width = 80;
        } 
        else if(this.isFort1()) {
            this.node.width = 50;
        } 
        else {
            this.node.width = 30;
        }

        bar.x = this.node.width/2*-1;
        level.x = bar.x - 5;
    },

    isBase: function() {
        if(this.node.parent._name.startWith("base")) {
            return true;
        }
        return false;
    },

    isFort1: function() {
        if(this.node.parent.spName == "FortASprite") {
            return true;
        }
        return false;
    },

    setLoc: function(px, py) {
        var moveTo = cc.v2(px, py);
        this.node.setPosition(moveTo);
    },

    setBarLevel: function(val) {
        if(val === undefined) {
            val = 1;
        }

        var level = this.node.getChildByName("level");
        level.getComponent(cc.Label).string = val;
    },

    setBloodBar: function(life, totalLife) {
        if(life < totalLife) {
            this.node.active = true;
        }
        var bar = this.node.getChildByName("bar");
        var barTotalWidth = this.node.width;
        bar.width = life/totalLife * barTotalWidth;

        if(life < totalLife * 0.35) {
            bar.color = new cc.Color(250,0,0);
        } else {
            bar.color = new cc.Color(50,250,0);            
        }
    },

    // update (dt) {},
});
