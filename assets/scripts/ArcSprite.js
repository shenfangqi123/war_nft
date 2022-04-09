var mySprite = require("MySprite");
var common = require("Common");

cc.Class({
    extends: mySprite,

    properties: {
        role:"lr",
    },

    start () {
        this._animation = this.getComponent(cc.Animation);
        this._animation.WrapMode = cc.WrapMode.Loop;
        if(this.layoutOp == null) {  //if archer stand up on the base.
            this.layoutOp = this.node.parent.parent.getComponent("Game");
        }
    },

    remove: function() {
        this._animation.play("dieoff2");
        this.shadow.destroy();
        this.blood.destroy();
    },

    dieStart: function() {
        console.log("die start");
    },

    dieEnd: function() {
        console.log("die end");
        this._animation.play("footprint");
    },

    //ske clip ske_bomb, foot print start evt
    footStart: function() {
        console.log("foot start");
    },

    footEnd: function() {
        console.log("foot end");
        this.node.destroy();
    },

    //ske clip ske_bomb, foot print start evt
    footPrint: function() {
        this.node.zIndex = -1;
        this.node.scaleX = 1;
        this.node.scaleY = 1;
    },

    //ske clip ske_bomb, called by first frame of ske_bomb
    beforeKill: function() {
        //this.shadow.destroy();
    },

    //ske clip ske_bomb, called by last frame of ske_bomb
    afterKill: function() {
        console.log("--remove archer node--");
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
        this.layoutOp.playSnd("lr");
    },

    aFrame2Evt: function() {
    },

    aFrame3Evt: function() {
    },

    aFrame4Evt: function() {
    },

    aFrame5Evt: function() {
    },

    playAni: function(agent, agentFuture, isMainPlayer) {
        this.playAngleAnimationRemote(agent, agentFuture, isMainPlayer);
    },

    isEnemyBase: function(baseId) {
        if(baseId == 1 || baseId == 2 || baseId == 3) {
            return true;
        } else {
            return false;
        }
    },

    isEnemyFort: function(isAgentHero, mainPlayer) {
        if(isAgentHero && mainPlayer == 2) {
            return true;
        } 
        if(!isAgentHero && mainPlayer == 1) {
            return true;
        } 
        return false;
    },

    playBaseWarriorAnimationDefault: function(actType, baseId) {
        var actName;

        if(this.isEnemyBase(baseId)) {
            actName = "lr_s_walk";
        } else {
            actName = "lr_n_walk";
        }

        if(actType == "move" && this.lastAct == actName) {
            return;
        }

        var randomTime = Math.ceil(Math.random()*125)/100;
        this._animation.play(actName, randomTime);
        this.lastAct = actName;
    },

    playFortWarriorAnimationDefault: function(actType, isAgentHero, mainPlayer) {
        var actName;

        if(this.isEnemyFort(isAgentHero, mainPlayer)) {
            actName = "lr_s_walk";
        } else {
            actName = "lr_n_walk";
        }

        if(actType == "move" && this.lastAct == actName) {
            return;
        }

        var randomTime = Math.ceil(Math.random()*125)/100;
        this._animation.play(actName, randomTime);
        this.lastAct = actName;
    },

    playBaseWarriorAnimation: function(agent, isMainPlayer, actType) {
        var fx,fy;
        var targetYOffset = common.attackTargetYOffset;
        var ex, ey;
        var angle;
        var x = agent.mypos.x; 
        var y = agent.mypos.y; 

        var startPos,targetPos,startEPos, targetEPos, vt, vtE;

        var randomTime = Math.ceil(Math.random()*125)/100;
        var actName = "";
        var then;
        var angleInfo;

        // user to control the up and down user Y postion offset.
        var offsetDir = 1;

        if(isMainPlayer == 1) {
            offsetDir = 1;
        }
        else if(isMainPlayer == 2) {
            offsetDir = -1;
        }

        ex = agent.enemypos.x; 
        ey = agent.enemypos.y; 

        // dir according to enemy position
        startPos  = cc.v2((x)*30, (y)*30);
        targetPos = cc.v2((ex)*30, (ey)*30+targetYOffset*offsetDir);
        vt = startPos.sub(targetPos);

        if(vt.x == 0 && vt.y == 0) {
            return;
        }

        //if dir no changed, vt.x or vt.y is 0, atan value should be invaild
        if(vt.x == 0) {
            vt.x = 0.1;
        }
        if(vt.y == 0) {
            vt.y = 0.1;
        }

        //if postion not changed, do nothing, or the math.atan will do error.
        if(vt.x != 0 && vt.y != 0) {
            var ag = 180/Math.PI * Math.atan(vt.x/vt.y);
            angle = ag;
            if(vt.y >= 0) {
                //when down to up
                angle = ag + 180;
            } 
        } 

        if(this._animation) {
            angleInfo = this.getActnameByAngle(angle, actType);
            actName = angleInfo.actName;

            //used to mirror a sprite.
            this.node.scaleX = angleInfo.scaleX;

            //if already in attack mode, just skip the animation
            if(this.lastAct != actName || actType == "sa") {
                if(actType == "sa") {
                    this._animation.stop();
                    this._animation.play(actName);
                } else {
                    //walking action.
                    this._animation.play(actName, randomTime);
                }
                this.angle = angle;
                this.lastAct = actName;
                this.lastScaleX = angleInfo.scaleX;
            }
        }

    },

/*
    shootArrow: function() {
        this.shootAgent();    
    },  

    shootAgent:function() {
        var ex, ey;
        var x = this.ox;
        var y = this.oy;
        var arrow = this.arrow;
        var enemies = this.killedEnemies;
        var targetYOffset = common.attackTargetYOffset;

        var startPos = cc.v2(x*30+15, y*30+15);

        //var ex = this.ex*30;
        //var ey = this.ey*30 + targetYOffset;

        if(this.enemy && this.enemy._name !== "" && this.enemy.x && this.enemy.y) {
            ex = this.enemy.x;
            ey = this.enemy.y;
        } else {
            ex = this.ex * 30;
            ey = this.ey *30 + targetYOffset;             
        }


        var targetPos = cc.v2(ex, ey);
        var agentNode, enemy;

        if(targetPos.x == 0 && targetPos.y == 0) return;

        var vt = targetPos.sub(startPos);
        var ag = 180/Math.PI * Math.atan(vt.x/vt.y);

        arrow.active = true;
        arrow.setRotation(ag+180);
        arrow.setPosition(startPos);

        var callback = cc.callFunc(function () {
            arrow.active = false;
        });

        arrow.runAction(cc.sequence(cc.moveTo(0.2, targetPos), callback)); 
    },

    shootBase:function(x, y, enemy, arrow) {
        var x = this.ox;
        var y = this.oy; 
        var enemy = this.enemy; 
        var arrow = this.arrow;

        var startPos = cc.v2(x*30+15, y*30+15);
        var ex = enemy.mypos.x;
        var ey = enemy.mypos.y;
        var blink = cc.blink(0.05,1);

        var targetPos = cc.v2(ex*30+15, ey*30+15);
        var agentNode;
        if(!enemy) {
            return;
        }

        if(targetPos.x == 0 && targetPos.y == 0) return;

        var vt = targetPos.sub(startPos);
        var ag = 180/Math.PI * Math.atan(vt.x/vt.y);

        arrow.active = true;
        arrow.setRotation(ag+180);
        arrow.setPosition(startPos);

        var callback = cc.callFunc(function () {
            enemy.baseObj.runAction(blink);
            arrow.active = false;
        });

        arrow.runAction(cc.sequence(cc.moveTo(0.2, targetPos), callback)); 
    },
*/

});
