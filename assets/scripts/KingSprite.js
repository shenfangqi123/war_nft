var common = require("Common");

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 2999;
    },

    //start () {},

/*
    shootArrow: function(x, y, ex, ey, enemies, arrow, attackDura, isDead) {
        var startPos = cc.v2(x*30+15, y*30+15);
        var targetYOffset = common.attackTargetYOffset;

        //var targetPos = cc.v2(ex, ey);
        var targetPos = cc.v2((ex)*30, (ey+0.5)*30+targetYOffset);

        var blink = cc.blink(0.05,1);

        var agentNode;
        var enemy;

        if(targetPos.x == 0 && targetPos.y == 0) return;

        var vt = targetPos.sub(startPos);
        var ag = 180/Math.PI * Math.atan(vt.x/vt.y);

        if(vt.y<0) {
            arrow.scaleY = -1;
        }

        arrow.active = true;
        arrow.setRotation(ag+180);
        arrow.setPosition(startPos);

        var callback = cc.callFunc(function () {
            arrow.active = false;

//            while(enemies.length>0) {
//                enemy = enemies.pop();
//                //console.log(enemy);
//                // no fucking idea why an empty recorder appears with "" in every field.
//                if(enemy && enemy._name) {
//                    agentNode = enemy.getComponent('MySprite');
//                    //agentNode.remove();                    
//                }
//            }
        });

        arrow.runAction(cc.sequence(cc.moveTo(0.2, targetPos), callback));            
    },  
*/    
    // update (dt) {},
});
