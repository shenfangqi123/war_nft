// 定义一个判断函数
String.prototype.inArray = function(arr) {
    // 不是数组则抛出异常
    if(!arr){
       console.log("ERR(in_array):Input is not an array");
    }
    // 遍历是否在数组中
    for(var i=0,k=arr.length;i<k;i++) {
        if(this==arr[i]) {
            return true;
        }
    }
    // 如果不在数组中就会返回false
    return false;
};

Array.prototype.removeByValue = function(val) {
    for(var i=0;i<this.length;i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

Array.prototype.minus = function (arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1;
    }
    for (var j = 0; j < this.length; j++) {
        if (!obj[this[j]])
        {
            obj[this[j]] = 1;
            result.push(this[j]);
        }
    }
    return result;
};

var common = require("Common");
var socketProvider = require("SocketProvider");

cc.Class({
    extends: socketProvider,

    properties: {
        bcnt:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {},

    hideDragItem:function (innerId) {
        if(this.putSele[innerId]) {
            this.putSele[innerId].destroy();
            this.putSele[innerId] = null;
        }
    },

    createBuff:function(buff) {
        var myBuff,px,py;
        var canvasNode = this.node.parent;

        if(buff.typeId == 1) {
            this.playSnd("thunder");
            myBuff = cc.instantiate(this.playerPrefab[23]);
            //canvasNode.getChildByName("buffThunder").active = false;
        }
        else if(buff.typeId == 2) {
            this.playSnd("heal");
            myBuff = cc.instantiate(this.playerPrefab[24]);
            //canvasNode.getChildByName("buffHeal").active = false;
        }
        
        //hide select frame
        this.dispCharSele();

        //remove buff icon
        if(this.putSele[buff.innerId]) {
            this.putSele[buff.innerId].parent.destroy();
        }

        //hide drag item disp
        //this.hideDragItem(buff.innerId);

        this.clickSele = {};

        //todo 38
        px = (buff.mypos.x)*38;
        py = (buff.mypos.y)*38;

        var moveTo = cc.v2(px, py);
        myBuff.setPosition(moveTo);

        this.node.addChild(myBuff);
    },

    createAgents:function(agents) {
        var aid,myAgent,agent,agentNode;
        var px,py,eo;
        //var nodelist = cc.find("Canvas/layout");
        //console.log(nodelist);

        for(var i=0;i<agents.length;i++) {
            agent = agents[i];

            aid = agent.aid;
            myAgent = this.npcInfo.objectForKey(aid);

            //px = (agent.mypos.x)*38;
            //py = (agent.mypos.y)*38;

            if(myAgent == null) {
                this.hideDragItem(agent.innerId);

                if(agent.role == "ske") {
                    myAgent = cc.instantiate(this.playerPrefab[0]);    
                }
                else if(agent.role == "ir") {
                    myAgent = cc.instantiate(this.playerPrefab[20]); 
                }
                else if(agent.role == "bee") {
                    myAgent = cc.instantiate(this.playerPrefab[16]);    
                }
                else if(agent.role == "wiz") {
//myAgent = cc.instantiate(this.playerPrefab[17]);    
                    myAgent = cc.instantiate(this.playerPrefab[26]);
                }
                else if(agent.role == "hr") {
                    myAgent = cc.instantiate(this.playerPrefab[12]);    
                }
                else if(agent.role == "lm") {
                    myAgent = cc.instantiate(this.playerPrefab[14]);    
                }
                else if(agent.role == "lr") {
                    myAgent = cc.instantiate(this.playerPrefab[3]);    
                }
                else if(agent.role == "gi") {
                    myAgent = cc.instantiate(this.playerPrefab[4]);    
                } else {
                    continue;
                }

                myAgent.name = aid;
                myAgent.type = "agent";
                myAgent.active = true;
                myAgent.role = agent.role;
                myAgent.size = agent.size;
                myAgent.level = agent.level;

                agentNode = this.getComponentByRole(myAgent);
                agentNode.init();
                agentNode.setId(aid);

                //shadow should set in layout, because its zindex should be lower than any agents.
                agentNode.setShadow(this.shadowForAgent());

                agentNode.setTotalLife(agent.life);
                agentNode.setBlood(this.bloodForAgent(myAgent));

                //if init pos is in south, face to north, otherwise....
                if(this.mainPlayer == 1) {
                    agent.rot = 180;
                }
                else if(this.mainPlayer == 2) {
                    agent.rot = 0;        
                }

console.log("--rec pt--");
console.log(agent.mypos.x +":::"+ agent.mypos.y);

                px = (agent.mypos.x)*38;
                py = (agent.mypos.y)*38;

                agentNode.updatePos(px, py);

                this.node.addChild(myAgent);
                this.npcInfo.setObject(myAgent, aid);
            }
        }
    },

    createBullets:function(bullets) {
        var aid,myBullet,bullet,agentNode;
        var px,py,eo,eDis;

        for(var i=0;i<bullets.length;i++) {
            bullet = bullets[i];
            aid = bullet.aid;
            myBullet = this.npcInfo.objectForKey(aid);

            if(myBullet == null) {
                if(bullet.role=="bullet") {
                    myBullet = cc.instantiate(this.playerPrefab[1]);
                    
                    //myBullet = new cc.Node();
                    myBullet.startPos = bullet.mypos;
                    myBullet.active = false;
                }
                else if(bullet.role=="bomb") {
                    console.log("bomb created");
                    this.playSnd("fireSend");
                    this.hideDragItem(bullet.innerId);
                    myBullet = cc.instantiate(this.playerPrefab[5]);    
                    eDis = this.enemeyDistance(bullet.mypos.x, bullet.mypos.y, bullet.targetpos.x, bullet.targetpos.y);
                    myBullet.startPos = bullet.mypos;
                    myBullet.targetDis = eDis;
                }
                else if(bullet.role=="tama") {
                    this.playSnd("gun");
                    myBullet = cc.instantiate(this.playerPrefab[9]);
                    myBullet.startPos = bullet.mypos;
                    myBullet.active = false;
                }
                else if(bullet.role=="wizfire") {
                    myBullet = cc.instantiate(this.playerPrefab[18]);
                    myBullet.startPos = bullet.mypos;
                    myBullet.active = false;
                }
                else {
                    console.log("error, no bullet type.");
                }

                myBullet.name = aid;
                myBullet.type = "bullet";
                //myBullet.active = true;
                myBullet.role = bullet.role;
                myBullet.updown = bullet.updown;

                myBullet.zIndex = 9999;

                agentNode = this.getComponentByRole(myBullet);

                // 将新增的节点添加到 Canvas 节点下面
                this.node.addChild(myBullet);

                //px = -1000;
                //py = -1000;
                
                px = 50;
                py = 50;


                var moveTo = cc.v2(px, py);

                var bulletRot = bullet.rot;
                if(this.mainPlayer == 1) {
                    bulletRot += 180;
                }

                //since 2.1.1 setRotation is desperated.
                myBullet.angle = -1*bulletRot;
                //myBullet.setRotation(bulletRot);  //bullet.rot+180

                myBullet.setPosition(moveTo);

                this.npcInfo.setObject(myBullet, aid);
            }
        }
    },

    createBases:function(bases) {
        var aid,myAgent,agent,baseName,baseNode;

        for(var i=0;i<bases.length;i++) {
            agent = bases[i];
            aid = agent.aid;
            myAgent = this.npcInfo.objectForKey(aid);

            if(myAgent == null) {
                myAgent = {};
                myAgent.name = aid;
                myAgent.type = "base";
                myAgent.active = true;
                myAgent.role = agent.role;
                myAgent.mypos = agent.mypos;
                myAgent.size = agent.size;

                baseName = "base"+ agent.objectId;
                myAgent.baseObj = this.node.getChildByName(baseName);

                baseNode = myAgent.baseObj.getComponent("BaseSprite");
                baseNode.setTotalLife(agent.life);
                baseNode.setBlood(this.bloodForAgent(myAgent.baseObj));
                baseNode.setLife(agent.life);

                this.npcInfo.setObject(myAgent, aid);
            }
        }
    },

    createLogs:function(logs) {
        var aid,myAgent,agent,agentNode;
        var px,py;

        //this.playSnd("log");

        for(var i=0;i<logs.length;i++) {
            agent = logs[i];
            aid = agent.aid;

            myAgent = this.npcInfo.objectForKey(aid);

            //todo 38
            px = (agent.mypos.x)*38;
            py = (agent.mypos.y)*38;

            if(myAgent == null) {
                this.hideDragItem(agent.innerId);

                myAgent = cc.instantiate(this.playerPrefab[8]);
                myAgent.name = aid;
                myAgent.type = "log";
                myAgent.active = true;
                myAgent.role = agent.role;

                agentNode = this.getComponentByRole(myAgent);
                agentNode.setId(aid);
                agentNode.setShadow(this.shadowForLog());

                var moveTo = cc.v2(px, py);
                agentNode.move(moveTo);

                // 将新增的节点添加到 Canvas 节点下面
                this.node.addChild(myAgent);
                this.playSnd("log");

                this.npcInfo.setObject(myAgent, aid);
            }
        }
    },

    createForts:function(forts) {
        var aid,myAgent,agent,agentNode;
        var px,py,eo,zorder;

        //var nodelist = cc.find("Canvas/layout");
        //console.log(nodelist);

        for(var i=0;i<forts.length;i++) {
            agent = forts[i];
            aid = agent.aid;
            myAgent = this.npcInfo.objectForKey(aid);

            //todo 38
            px = (agent.mypos.x)*38;
            py = (agent.mypos.y)*38;

            if(myAgent == null) {
                this.hideDragItem(agent.innerId);

                myAgent = cc.instantiate(this.playerPrefab[7]);    
                myAgent.name = aid;
                myAgent.type = "fa";
                myAgent.spName = "FortASprite";
                myAgent.active = true;
                myAgent.role = agent.role;
                myAgent.size = agent.size;

                //1000:agent, 999:bullet 998:this;
                //fort base anchorY is middle, so y-2 is nessesary.

                //todo 16
                if(this.mainPlayer == 1) {
                    zorder = 1001+parseInt(16-agent.mypos.y-1);
                } 
                else if(this.mainPlayer == 2) {
                    zorder = 1001+parseInt(16-agent.mypos.y-1);
                }
                myAgent.zIndex = zorder;

                agentNode = this.getComponentByRole(myAgent);
                agentNode.setZIndex(zorder);
/*                
                //agentNode.init();
                //agentNode.setId(aid);
                //agentNode.setShadow(this.shadowForAgent());
*/

                agentNode.setTotalLife(agent.life);
                agentNode.setBlood(this.bloodForAgent(myAgent));

                //if init pos is in south, face to north, otherwise....
                if(this.mainPlayer == 1) {
                    agent.rot = 180;
                }
                else if(this.mainPlayer == 2) {
                    agent.rot = 0;        
                }

                var moveTo = cc.v2(px, py);
                myAgent.setPosition(moveTo);

                //agentNode.playAngleAnimation(agent, null, this.mainPlayer);

                // 将新增的节点添加到 Canvas 节点下面
                this.node.addChild(myAgent);

                this.npcInfo.setObject(myAgent, aid);
            }
        }
    },

    agentProcess: function(agents) {
        var remoteAgents = [];
        var localAgents = [];
        var killAgents = [];
        var agentObj, agentNode;
        var agentId;

        for(var i=0;i<agents.length;i++) {
            remoteAgents.push(agents[i].aid);
        }

        localAgents = this.npcInfo.allKeys();
        killAgents = localAgents.minus(remoteAgents);

        for(agentId of killAgents) {
            agentObj = this.npcInfo.objectForKey(agentId);
            if(agentObj.type == "agent") {
                agentNode = this.getComponentByRole(agentObj);
                agentNode.remove();
                this.removedNpcInfo.setObject(agentObj, agentId);
                this.npcInfo.removeObjectForKey(agentId);
            }
        }
    },

    baseProcess: function(bases) {
        var remoteBases = [];
        var killBases = [];
        var enemyBases = [];
        var baseObj;
        var warriorName;
        var warriorObj;
        var baseName;

        for(var i=0;i<bases.length;i++) {
            baseName = "base"+ bases[i].objectId;
            remoteBases.push(baseName);
            enemyBases.push(baseName);
        }

        // todo list: should manage to remove the base record in npcInfo.
        killBases = this._defaultBases.minus(remoteBases);

        for(baseName of killBases) {
            this.dispLayoutMask(enemyBases, baseName);

            this._defaultBases.removeByValue(baseName);
            baseObj = this.node.getChildByName(baseName);

            //this.plusBaseKillNum(baseName);
            
            this.node.removeChild(baseObj);
            this.playEffect("base", baseObj.x, baseObj.y);
        }
    },
 
    plusBaseKillNum: function(baseName) {
        //todo: layout node must be set in init 
        var enemynum = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
        var mynum = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
        
        if(baseName.inArray(["base1", "base2", "base3"])) {
            enemynum.string = parseInt(enemynum.string)+1;
        } else {
            mynum.string = parseInt(enemynum.string)+1;            
        }
    },

    //called when game is over
    killBases:function(dir) {
        //todo: layout node must be set in init 
        //var enemynum = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
        //var mynum = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
      
        var killBases;
        var baseObj, bd;
        var baseName;
        if(dir == "up") {
            killBases= ["base1", "base2", "base3"];
            //enemynum.string = 3;
        } else {
            killBases= ["base4", "base5", "base6"];
            //mynum.string = 3;
        }

        for(baseName of killBases) {
            //this._defaultBases.removeByValue(baseName);
            baseObj = this.node.getChildByName(baseName);

            if(baseObj) {
                this.playEffect("base", baseObj.x, baseObj.y);
                this.node.removeChild(baseObj);
            }
        }
    },

    undisplayMask: function(sel) {
        console.log(sel);
        this.node.getChildByName(sel).active=false;
    },

    dispLayoutMask: function(killEnemyBases, baseName) {
        var _self = this;
        if(baseName == "base4" || baseName == "base5" || baseName == "base6") {
            return;
        }

        //if("base1".inArray(killEnemyBases) && "base2".inArray(killEnemyBases) && "base3".inArray(killEnemyBases)) {
        //    return;
        //}

        if("base1".inArray(killEnemyBases) && "base2".inArray(killEnemyBases)) {
            this.showMask("seleMask12", 2);
        }
        else if("base1".inArray(killEnemyBases) && "base3".inArray(killEnemyBases)) {
            this.showMask("seleMask13", 2);
        }
        else if("base1".inArray(killEnemyBases)) {
            this.showMask("seleMask1", 2);
        }
    },

    showDragMask: function(role) {
        if(!this.ifNotMaskRole(role)) {
            this.node.getChildByName(this.maskType).active=true;
        }
    },

    unshowDragMask: function() {
        this.node.getChildByName(this.maskType).active=false;
    },

    showMask: function(maskType, delay) {
        var _self = this;
        this.maskType = maskType;
        this.node.getChildByName(maskType).active=true;
        this.scheduleOnce(function() {
            _self.undisplayMask(maskType);
        }, delay);
    },

    putErrorMsg: function() {
        var _self = this;
        this.node.getChildByName("putError").active=true;
        this.scheduleOnce(function() {
            _self.undisplayPutErr();
        }, 1);
    },

    undisplayPutErr: function() {
        this.node.getChildByName("putError").active=false;
    },

    fortProcess: function(forts, fortsFuture) {
        var remoteAgents = [];
        var localAgents = [];
        var killAgents = [];
        var agentObj, agentNode;
        var agentId, bd;

        for(var i=0;i<forts.length;i++) {
            remoteAgents.push(forts[i].aid);
        }

        localAgents = this.npcInfo.allKeys();
        killAgents = localAgents.minus(remoteAgents);

        for(agentId of killAgents) {
            agentObj = this.npcInfo.objectForKey(agentId);
            if(agentObj.type == "fa") {
                this.playEffect("fort", agentObj.x, agentObj.y);

                //agentNode = this.getComponentByRole(agentObj);
                //agentNode.remove();
                this.node.removeChild(agentObj);
                this.removedNpcInfo.setObject(agentObj, agentId);
                this.npcInfo.removeObjectForKey(agentId);

                this.playEffect("base", agentObj.x, agentObj.y);
            }
        }
    },

    logProcess: function(logs) {
        var remoteAgents = [];
        var localAgents = [];
        var killAgents = [];
        var agentObj, agentNode;
        var agentId, bd;

        for(var i=0;i<logs.length;i++) {
            remoteAgents.push(logs[i].aid);
        }

        localAgents = this.npcInfo.allKeys();
        killAgents = localAgents.minus(remoteAgents);

        for(agentId of killAgents) {
            agentObj = this.npcInfo.objectForKey(agentId);
            if(agentObj.role == "log") {
                this.playEffect("log", agentObj.x, agentObj.y);

                agentNode = this.getComponentByRole(agentObj);
                agentNode.remove();
                this.removedNpcInfo.setObject(agentObj, agentId);
                this.npcInfo.removeObjectForKey(agentId);
            }
        }
    },

    bulletProcess: function(bullets) {
        var remoteBullets = [];
        var localBullets = [];
        var killBullets = [];
        var agentObj, agentNode;
        var agentId;

        for(var i=0;i<bullets.length;i++) {
            remoteBullets.push(bullets[i].aid);
        }

        localBullets = this.npcInfo.allKeys();
        killBullets = localBullets.minus(remoteBullets);

        for(agentId of killBullets) {
            agentObj = this.npcInfo.objectForKey(agentId);
            if(agentObj.role == "bomb") {
                agentNode = this.getComponentByRole(agentObj);
                agentObj.destroy();
                this.removedNpcInfo.setObject(agentObj, agentId);
                this.npcInfo.removeObjectForKey(agentId);
                this.playEffect("bomb", agentObj.x, agentObj.y);
            }
            if(agentObj.role == "wizfire") {
                agentNode = this.getComponentByRole(agentObj);
                agentObj.destroy();
                this.removedNpcInfo.setObject(agentObj, agentId);
                this.npcInfo.removeObjectForKey(agentId);
                if(agentObj.x && agentObj.y) {
                    this.playEffect("wizfire", agentObj.x, agentObj.y);
                }
            }
            else if(agentObj.role == "bullet" || agentObj.role == "tama") {
                agentNode = this.getComponentByRole(agentObj);
                agentObj.destroy();
                this.removedNpcInfo.setObject(agentObj, agentId);
                this.npcInfo.removeObjectForKey(agentId);
            }
        }
    },

    //shake the screen
    startSceneJitter: function(){
        var sceneNode = this.node;
        var ox = sceneNode.x;
        var oy = sceneNode.y;

        var cnt = 0;

        var lower = -4;
        var upper = 4;
        var callBack = function(){
            cnt++;
            var randomX = Math.floor(Math.random() * (upper - lower)) + lower;
            var randomY = Math.floor(Math.random() * (upper - lower)) + lower;
            
            sceneNode.x += randomX;
            sceneNode.y += randomY;
            if(cnt>=10) {
                sceneNode.stopAllActions();
                sceneNode.x = ox;
                sceneNode.y = oy;
            }
        }

        var node = this.node;//场景常驻节点
        var del = cc.delayTime(1/30);
        var cal = cc.callFunc(callBack);
        var seq = cc.sequence(del, cal);
        node.runAction(cc.repeatForever(seq));
    },

    playBases: function(bases) {
        var remoteBases = [];
        var baseObj,myAgent,agent;
        var warriorName;
        var warriorObj;
        var baseName, kingNode, agentNode, kingArrow,warrior;
        var actType, attackDura, now;
        var tmpB = {};
        var eoDead;
        var eo = null;

        for(var i=0;i<bases.length;i++) {
            agent = bases[i];

            baseName = "base"+ agent.objectId;
            attackDura = agent.attackDura;
            myAgent = this.npcInfo.objectForKey(agent.aid).baseObj;

            tmpB[agent.aid] = baseName;
            remoteBases.push(baseName);
            actType = agent.actType;

            if(myAgent) {
                myAgent.getComponent("BaseSprite").setLife(agent.life);

                warrior = myAgent.getChildByName("warrior");
                if(warrior) {
                    warrior.role = "lr";
                    agentNode = this.getComponentByRole(warrior);

                    //if no enmey then standby
                    if(myAgent && agent.actType=="wait") {
                        agentNode.playBaseWarriorAnimationDefault("move", agent.objectId);
                    }
                    else if(myAgent && agent.actType=="sa") {
                        agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
                    }                     
                }
                warrior = myAgent.getChildByName("gun");
                if(warrior) {
                    warrior.role = "gun";
                    agentNode = this.getComponentByRole(warrior);

                    //if no enmey then standby
                    if(myAgent && agent.actType=="wait") {
                        //agentNode.playFortWarriorAnimationDefault("move", this.mainPlayer, agent.objectId);
                    }
                    else if(myAgent && agent.actType=="sa") {
                        agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
                    }
                }
            }
        }
    },

    playAgents: function(agents, agentsFuture) {
        var myAgent;
        var px, py, aid;
        var agentNode,agent,eo=null;
        var eoDead;

        for(var i=0;i<agents.length;i++) {
            agent = agents[i];
            myAgent = this.npcInfo.objectForKey(agent.aid);

            if(myAgent && myAgent.type=="agent") {
                agentNode = this.getComponentByRole(myAgent);
                agentNode.playAni(agent, this.getFutureAgent(agent.aid, agentsFuture), this.mainPlayer);
                agentNode.setLife(agent.life);
                agentNode.setGroupKill(agent.groupKill);

                px = Math.round((agent.mypos.x)*38);
                py = Math.round((agent.mypos.y)*38);
                agentNode.updatePos(px, py);
            }
        }
    },

    playForts: function(forts) {
        var myAgent;
        var agentNode,agent,warrior=null;

        for(var i=0;i<forts.length;i++) {
            agent = forts[i];
            myAgent = this.npcInfo.objectForKey(agent.aid);
            if(!myAgent) {
                continue;
            }
            myAgent.role = "fa";
            agentNode = this.getComponentByRole(myAgent);
            agentNode.setLife(agent.life);

            warrior = myAgent.getChildByName("warrior");
            warrior.role = "lr";
            agentNode = this.getComponentByRole(warrior);

            //if no enmey then standby
            if(myAgent && agent.actType=="move") {
                agentNode.playFortWarriorAnimationDefault("move", agent.isHero, this.mainPlayer);
            }
            else if(myAgent && agent.actType=="sa") {
                agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
            } 
        }
    },

    playLogs: function(logs) {
        var agent,myAgent;
        var px, py, aid;
        var agentNode,bullet,eo=null;
        var sc;
        var moveTo;

        for(var i=0;i<logs.length;i++) {
            agent = logs[i];
            myAgent = this.npcInfo.objectForKey(agent.aid);

            if(myAgent) {
                agentNode = this.getComponentByRole(myAgent);
                agentNode.move(agent.mypos);
            }
        }
    },

    playBullets: function(bullets) {
        var myBullet;
        var px, py, aid;
        var agentNode,bullet,eo=null;
        var sc;
        var bulletRot;
        var subBullet;

        for(var i=0;i<bullets.length;i++) {
            bullet = bullets[i];

            myBullet = this.npcInfo.objectForKey(bullet.aid);
            if(myBullet) {
                //2 fort bullet emit the same time, only display the proper bullet.
                if(bullet.updown=="up" && this.mainPlayer==2) {
                    continue;
                }
                if(bullet.updown=="down" && this.mainPlayer==1) {
                    continue;
                }

                this.showBullet(myBullet, bullet);
            }
        }
    },

    showBullet: function(myBullet, bullet) {
        var subBullet, agentNode, px, py, moveTo, bulletRot;

        myBullet.active = true;

        agentNode = this.getComponentByRole(myBullet);

        //todo 38
        px = (bullet.mypos.x)*38;
        py = (bullet.mypos.y)*38;

        moveTo = cc.v2(px, py);

        bulletRot = bullet.rot;
        //if(this.mainPlayer == 1) {
        //    bulletRot += 180;
        //}

        //1000:agent, 999:this bullet 998:forts;
        //make bullet display under agent which is at same position.
        //todo 16
        myBullet.zIndex = 1000+parseInt(16-bullet.mypos.y);

        if(myBullet.role == "bullet") {
            subBullet = cc.instantiate(this.playerPrefab[1]);
            //subBullet = cc.instantiate(this.playerPrefab[25]);

            // first convert moveTo(belong to layout node) to world position.
            var pp = this.node.convertToWorldSpaceAR(moveTo);

            // convert world postion to myBullet position.
            pp = myBullet.convertToNodeSpaceAR(pp);

            if(this.mainPlayer == 1) {
                myBullet.angle = 90 - bulletRot;
            } else {
                myBullet.angle = (90 - bulletRot)*-1;            
            }

            subBullet.setPosition(pp);
            myBullet.addChild(subBullet);
        } 

        else if(myBullet.role == "bomb") {
            sc = this.getFireBombScale(bullet.mypos, bullet.targetpos, myBullet.targetDis, myBullet.startPos);
            myBullet.scaleX=sc;
            myBullet.scaleY=sc;
            myBullet.zIndex = 9999;

            myBullet.angle = -1*bulletRot;
            myBullet.setPosition(moveTo);

            /*
                var randomTime = Math.ceil(Math.random()*40)-10;
                var fh = myBullet.getChildByName("fireHead");
                //fh.skewY = randomTime;
                //fh.skewX = randomTime;

                //fire bomb size changing according to the distance between target and origin.
                sc = this.getFireBombScale(bullet.mypos, bullet.targetpos, myBullet.targetDis, myBullet.startPos);
                agentNode.node.scaleX=sc;
                agentNode.node.scaleY=sc;
                myBullet.getComponent(cc.MotionStreak).stroke *= sc;
            */
        }

        else if(myBullet.role == "wizfire") {
            /* 
            //old wiz fire ball

            myBullet.zIndex = 9999;
            // shake a little bit
            //var randomTime = Math.ceil(Math.random()*40)-10;
            //bulletRot += randomTime;

            myBullet.angle = -1*bulletRot;                
            myBullet.setPosition(moveTo);
            */

            subBullet = cc.instantiate(this.playerPrefab[25]);

            // first convert moveTo(belong to layout node) to world position.
            var pp = this.node.convertToWorldSpaceAR(moveTo);

            // convert world postion to myBullet position.
            pp = myBullet.convertToNodeSpaceAR(pp);

            //subBullet.setPosition(pp);
            //myBullet.addChild(subBullet);

            if(myBullet.lastpos && myBullet.lastpos.sub(pp).mag() > 50) {
                subBullet.setPosition(pp);
                myBullet.addChild(subBullet);
                myBullet.lastpos = pp;
            }

            if(!myBullet.lastpos) {
                subBullet.setPosition(pp);
                myBullet.addChild(subBullet);
                myBullet.lastpos = pp;                    
            }

        }

        else {
            myBullet.angle = -1*bulletRot;                
            myBullet.setPosition(moveTo);
        }
    },

    getFireBombScale: function(bulletPos, targetPos, targetDis, startPos) {
        var xDif, yDif;
        var midPos = {};
        midPos.x = startPos.x + (targetPos.x - startPos.x)/2;
        midPos.y = startPos.y + (targetPos.y - startPos.y)/2;
        var xDif = bulletPos.x - midPos.x;
        var yDif = bulletPos.y - midPos.y;
        var dis = Math.sqrt((xDif * xDif) + (yDif * yDif));
        var targetDis = targetDis * 0.5;

        return (targetDis-dis)*0.7/targetDis+0.5;   //scale from 0.5 -- 1.2
    },

    enemeyDistance:function(px,py,ex,ey) {
        var xDif, yDif, dis;
        xDif = px - ex;
        yDif = py - ey;
        dis = Math.sqrt((xDif * xDif) + (yDif * yDif));
        return dis;
    },

    getComponentByRole(agentObj) {
        var role = agentObj.role;
        if(role == "ske") {
            return agentObj.getComponent('SkeSprite');
        }
        else if(role == "ir") {
            return agentObj.getComponent('SkeSprite');
        }
        else if(role == "bee") {
            return agentObj.getComponent('BeeSprite');
        }
        else if(role == "wiz") {
//return agentObj.getComponent('WizSprite');
            return agentObj.getComponent('NFTArcherSprite');
        }
        else if(role == "hr") {
            return agentObj.getComponent('HeroSprite');
        }
        else if(role == "lm") {
            return agentObj.getComponent('LightmanSprite');
        }
        else if(role == "lr") {
            return agentObj.getComponent('ArcSprite');
        }
        else if(role == "gi") {
            return agentObj.getComponent('GiantSprite');
        }
        else if(role == "bullet") {
            return agentObj.getComponent('Arrow');
        }
        else if(role == "bomb") {
            return agentObj.getComponent('BombScript');
        }
        else if(role == "log") {
            return agentObj.getComponent('LogSprite');
        }
        else if(role == "gun") {
            return agentObj.getComponent('GunSprite');
        }
        else if(role == "base") {
            return agentObj.getComponent('BaseSprite');
        }
        else if(role == "fa") {
            return agentObj.getComponent('BaseSprite');
        }
    },

    getKilledEnemies: function() {
        var aids = this.removedNpcInfo.allKeys();
        var aid;
        var killedEnemies = [];
        //when one attack cause multi kills occured in one frame, multi enemies must be handled. 
        for(var i=0;i<aids.length;i++) {
            aid = aids[i];
            killedEnemies.push(this.removedNpcInfo.objectForKey(aid));
        }

        return killedEnemies;
    },

    getFutureAgent: function(aid, agentsFuture) {
        for(var i=0;i<agentsFuture.length;i++) {
            if(agentsFuture[i].aid == aid) {
                return agentsFuture[i];
            }
        }
        return null;
    },

    bloodForAgent: function (agent) {
        var bloodObj = cc.instantiate(this.playerPrefab[11]);
        var bloodOp = bloodObj.getComponent("BloodBar");
        bloodOp.setBarLevel(agent.level);

        bloodObj.active = false;
        agent.addChild(bloodObj);
        return bloodObj;
    },

    shadowForAgent: function () {
        var shadowObj = cc.instantiate(this.playerPrefab[2]);
        shadowObj.active = false;
        this.node.addChild(shadowObj);
        return shadowObj;
    },

    shadowForLog: function () {
        var shadowObj = cc.instantiate(this.playerPrefab[2]);
        // 将新增的节点添加到 Canvas 节点下面

        shadowObj.scaleX = 1;
        shadowObj.sacleY = 1;
        shadowObj.active = false;
        this.node.addChild(shadowObj);
        return shadowObj;
    },

    setClickItem: function (select) {
        this.clickSele = select;
    },

    putClickItem: function (selCard, node, pt) {
        var putNode = cc.instantiate(node);
        var innerId = this.nick +"_"+ Number(new Date());

        putNode.x = pt.x;
        putNode.y = pt.y;
        putNode.name = innerId;
        putNode.active = true;
        selCard.addChild(putNode);

        this.putSele[innerId] = putNode;

        return innerId;
    },

    setDragItem: function (params, node) {
        var card = params.target;
        var dragNode = cc.instantiate(node);
        var innerId = this.nick +"_"+ Number(new Date());

        node.x = 0;
        node.y = 0;
        dragNode.name = innerId;
        dragNode.actvie = true;
        card.addChild(dragNode);

        this.putSele[innerId] = dragNode;
        this.draggingItem = innerId;

        return innerId;
    },

    unsetDragItem: function (innerId) {
        this.unshowDragMask();
        this.draggingItem = "";
        this.putSele[innerId].destroy();
        this.putSele[innerId] = null;     
    },

    moveDragItem: function(sel, delta) {
        if(this.putSele[this.draggingItem]) {
            this.putSele[this.draggingItem].x += delta.x;
            this.putSele[this.draggingItem].y += delta.y;   
            
            if(this.putSele[this.draggingItem].y < 0) {
                //this.putSele[this.draggingItem].y = 0
            }
        }
    },

    clearDragItem: function(param, select) {
        var innerId;
        var card = param.target;
        var sel = card._name;
        var pt={};
        var layoutPt = this.node.position;
        var yOffset=0;
        var magicCost = select.magicCost;
        var level = select.level;
        var role = select.role;

console.log("role:" + role);

        this.unshowDragMask();

        if(this.mainPlayer==1) {
            yOffset=-50;
        } else {
            yOffset=20;
        }

        if(this.putSele[this.draggingItem]) {
            innerId = this.putSele[this.draggingItem].name;

            //layout maybe scaled according to devices.
            pt.x = (this.putSele[this.draggingItem].x+card.x-layoutPt.x)/this.node.scaleX;
            pt.y = (this.putSele[this.draggingItem].y+card.y-layoutPt.y+yOffset)/this.node.scaleY;

            if(!this.isValidPutPoint(pt) && !this.ifNotMaskRole(role)) {
                console.log("invalid postion.");
                this.putSele[innerId].destroy();
                this.putSele[innerId] = null;
                this.putErrorMsg();
                return;
            }

            this.sendSodier(magicCost, role, pt, innerId, level);
            this.draggingItem = "";
        } 
    },

    sendSodier: function(magicCost, role, pt, innerId, level) {
        //var innerId = this.nick +"_"+ Number(new Date());
        var isHero = (this.mainPlayer==1);
        var bar = this.canvasNode.getChildByName("magicBar");
        var juice = bar.getChildByName("juice");
        var cost = this.useMagic(magicCost);

        this.playSnd("put1");

        if(cost) {
            juice.width = cost;
            MY_SOCKET.json.emit('cmd', {'isHero':isHero, 'roomId': this.roomId, 'innerId': innerId, 'role': role, 'pt':pt, 'level':level});
        } else {
            this.putSele[innerId].destroy();
            this.putSele[innerId] = null;            
        }
    },

    setMagicBar: function() {
        var bar = this.canvasNode.getChildByName("magicBar");
        var juice = bar.getChildByName("juice");

        if(juice.width<600) {
            juice.width+=this.addJuice;
        }

        if(juice.width%50 == 0) {
            this.magicAmount = juice.width/50;
            this.updateCardStatus();
        }
    },

    useMagic: function(amount) {
        var bar = this.canvasNode.getChildByName("magicBar");
        var juice = bar.getChildByName("juice");
        var afterUse = juice.width-amount*50;

        if(afterUse>=0) {
            return afterUse;
        }
        return false;
    },

    updateCardStatus: function() {
        var head = "sel";
        var nodeName, selNode;
        var selSprite = null;

        for(var i=1;i<=7;i++) {
            nodeName = head + i;
            selNode = this.canvasNode.getChildByName(nodeName);
            if(selNode) {
                selSprite = selNode.getComponent('SelCard');
                if(selSprite) {
                    if(selSprite.magicCost <= this.magicAmount) {
                        selNode.color = new cc.Color(255,255,255);
                    } else {
                        selNode.color = new cc.Color(127,127,127);
                    }
                }                
            }
        }
    }
});
