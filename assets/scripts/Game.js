// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var common = require("Common");
var gameProvider = require("GameProvider");
cc._Dictionary = require("Dictionary");

cc.Class({
    extends: gameProvider,

    properties: {
        // 这个属性引用了预制资源
        playerPrefab: {
            default: [],
            type: cc.Prefab
        },
        audios: {
            default: [],
            type: cc.AudioClip
        }
    },

    ctor() {
        console.log("-----ctor----");
        this.bufferLen = 30;
    },

    goback: function (event, customEventData) {
        this.syncTimeout();
        cc.director.loadScene('welcome');
    },

    onLoad: function () {
        console.log("---------onLoad--------");

/*
        if (typeof (wx) !== "undefined") {
            let self = this;
            wx.onShow(function () {
                console.log("wx onshow.");
                if (self.isShared && self.shareTag == "keys") {
                    let curTime = new Date().getTime();
                    if (curTime - self.closeTime >= 3000) {
                        //分享成功
                        console.log("分享成功");
                        //self.isShared = false;
                        //self.shareTag = "";
                        //self.closeTime = curTime;
                    }
                }
            })
        }
*/

        var _parent = this;
        this.netErrDisp = false;
        var size = cc.visibleRect;
        var name = this.getRandomCharName();
        this.nick = name;

        this.canvasNode = this.node.parent;
        this.resultOp = this.node.getChildByName("Result").getComponent("Result");

        this.gameCountDown = 150; //2:30
        //up user or down user.
        this.mainPlayer = -1;
        this.roomId = "";

        this.baseAttackDuraRec = [];
        this.agentMoveStepRec = [];
        this._defaultBases = ["base1","base2","base3","base4","base5","base6"];
        
        this.gameStartTime = 0;
        this.gameCycleTime = 90;
        this.gameOver=false;
        this.addJuice = 10;  //each heart add up to magic juice bar

        this.npcInfo = new cc._Dictionary();
        this.removedNpcInfo = new cc._Dictionary();
        this.setUser(this.getPersistantData());

        console.log("name:" + name);
        this.socketHandle(this.nick);

        this.putSele = [];
        this.dragingItem = "";

        this.clickSele = {};
        this.magicAmount = 0;

        //red alert area should not be entered by hero.
        this.maskType = "seleMask3";

        var canvasPt = this.node._parent.getPosition();
        var layoutPt = this.node.getPosition();
        var cnode, pl;
        var magicCost = 0;
        var role;
        var selParams, selNode;
        var innerId;

        this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
            if(_parent.gameStartTime == 0) {
                return;
            }
            var pt = params.getLocation();
            _parent.clickProcessor(pt);
        });

/*
        this.listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,  
            eventName: "event_effect",
            callback: function (event) {
                cc.log("event = "+event.getUserData());
            }
        });
        cc.eventManager.addListener(this.listener, 1);
*/

        this.initEventListener();



        var crabNode = cc.instantiate(this.playerPrefab[26]);    
        crabNode.x = 100;
        crabNode.y = 100;
        this.node.addChild(crabNode);


    },

    getPersistantData: function() {
        var node = cc.find('GameData').getComponent('GameData');
        return node.getData();
    },

    setUser: function(def) {
        var node = cc.find('GameData').getComponent('GameData');
        var titlenode = this.node.parent.getChildByName("banner").getChildByName("title");
        var levelLabel = this.node.parent.getChildByName("banner").getChildByName("level").getChildByName("levelword").getComponent("cc.Label");
        var nameLabel = titlenode.getChildByName("name").getComponent("cc.Label");
        var scoreLabel = titlenode.getChildByName("score").getComponent("cc.Label");

        nameLabel.string = node.getNick();
        levelLabel.string = def.level;
        scoreLabel.string = def.myscore;
    },

    setConnFailInfo: function() {
        this.netErrDisp = true;
        var msgLabel = this.node.getChildByName("putWait").getChildByName("msg").getComponent("cc.Label");
        var retBut = this.node.getChildByName("putWait").getChildByName("retBut");
        retBut.active = true;
        msgLabel.string = "网络连接断开!";
    },

    setBuffDisp: function(buffType) {
        var canvasNode = this.node.parent;
        this.buffType = buffType;
        if(buffType == "heal") {
            canvasNode.getChildByName("buffHeal").active = true;
        }
        else if(buffType == "thunder") {
            canvasNode.getChildByName("buffThunder").active = true;            
        }
    },

/*
    doBuff: function(event, customEventData) {
        console.log("sssss:" + customEventData);
        var buffType = customEventData;
        if(buffType == 1) {
        }
    },
*/

    setParam: function(param, timestamp) {
        console.log("----param----");
        console.log(param);
        console.log(timestamp);

        var curTime = new Date().getTime();

        console.log("duration:" + (curTime - timestamp));

        this.setMyCards(param);
        this.dispCharSele();
    },

    setMyCards: function(param) {
        var sx = -530;
        var sy = -330;
        var mx, my;
        var card, cardNode, cost;
        var moveTo;
        //var allCards = ["log","bomb","ske","ir"];
        var allCards = param;
        var rowItems = 0;
        var rows = 0;
        var cols = 0;
        var canvasNode = this.node.parent;
        var head = "sel";

        for(var i=0;i<allCards.length;i++) {
            card = cc.instantiate(this.playerPrefab[21]);
            card._name = head + (i+1);
            cardNode = card.getComponent('SelCard');
            if(allCards[i]) {
                cost = 1;
                cardNode.setRole(allCards[i].seleRole, allCards[i].magicCost, allCards[i].roleLevel);
            }

            //this.myCardNodes.push(cardNode);                
            cols = i%6;
            mx = sx+(cols*105);
            my = sy;
            moveTo = cc.v2(mx, my);
            card.setPosition(moveTo);
            canvasNode.addChild(card);
        }

        for(var i=allCards.length;i<6;i++) {
            cols = i%6;
            mx = sx+(cols*105);
            my = sy;
            card = cc.instantiate(this.playerPrefab[22]);
            moveTo = cc.v2(mx, my);
            card.setPosition(moveTo);
            canvasNode.addChild(card);
        }
    },

    dispCharSele: function() {
        var charSele = this.node.parent.getChildByName("charSele");
        charSele.zIndex = 9999;
        charSele.active = false;
        console.log(charSele);
    },

    gameOverProcessor:function(mainPlayer, data) {
        if(mainPlayer == 1) {
            if(data.win == 1) {
                console.log("my win11");
                this.killBases("up");
            }
            else if(data.win == 0) {
                console.log("my lose11");
                this.killBases("down");
            }
        }
        else if(mainPlayer == 2) {
            if(data.win == 1) {
                console.log("my lose11");
                this.killBases("down");
            }
            else if(data.win == 0) {
                console.log("my win11");
                this.killBases("up");
            }
        }
    },

    clickProcessor:function (clickPt) {
        var _parent = this;
      
        var canvasPt = this.canvasNode.getPosition();
        var layoutPt = this.node.getPosition();
        var innerId;

        //note that pt is the postion in canvas node.
        var pt = clickPt;
        var pt1 = {};

        var magicCost = _parent.clickSele.magicCost;
        var level = _parent.clickSele.level;
        var role = _parent.clickSele.role;

        if(role === undefined || role == "") {
            return;
        }  

        var selCard = _parent.clickSele.params.target;
        var selNode = _parent.clickSele.node;

        var pl = selNode.parent.getPosition();  //sel card node.
        var yOffset=0;

        if(_parent.mainPlayer==1) {
            yOffset=-20;
        } else {
            yOffset=40;
        }

        //pointer position
        pt1.x = (layoutPt.x + pt.x - pl.x)-10;
        pt1.y = (layoutPt.y + pt.y - pl.y)-(canvasPt.y + layoutPt.y);

        //position in layout
        //pt.x = pt.x/_parent.node.scaleX - (canvasPt.x + layoutPt.x);
        //pt.y = pt.y/_parent.node.scaleY - (canvasPt.y + layoutPt.y) + yOffset;

        pt.x = pt.x - (canvasPt.x + layoutPt.x);
        pt.y = pt.y - (canvasPt.y + layoutPt.y);

        //todo
        var px = Math.round(parseFloat(pt.x/38));
        var py = Math.round(parseFloat(pt.y/38));

        pt.x = py*-1;
        pt.y = px;

console.log("--sent pt--");
console.log(pt.x +":::"+ pt.y);

        if(!this.ifNotMaskRole(role)) {
            this.showMask(this.maskType, 1);
        }

        //todo
        //if(!this.isValidPutPoint(pt) && !this.ifNotMaskRole(role)) {
        //    console.log("invalid postion.");
        //    this.putErrorMsg();
        //    return;
        //}

        innerId = _parent.putClickItem(selCard, selNode, pt1);
        _parent.sendSodier(magicCost, role, pt, innerId, level);
    },

    isValidPutPoint: function(point) {
        var pt = {};
        pt.x = point.x;
        pt.y = point.y;
        if(this.mainPlayer == 2) {
            pt.y = point.y-40;
        }

        if(this.maskType == "seleMask1") {
            if(pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 650) {
                return true;
            } else {
                return false;
            }
        }
        else if(this.maskType == "seleMask12") {
            if((pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420) || (pt.x >= 285 && pt.x <= 570 && pt.y > 420 && pt.y < 650)) {
                return true;
            } else {
                return false;
            }
        }
        else if(this.maskType == "seleMask13") {
            if((pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420) || (pt.x >= 30 && pt.x <= 285 && pt.y > 420 && pt.y < 650)) {
                return true;
            } else {
                return false;
            }
        }
        else if(this.maskType == "seleMask3") {
            if(pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    },

    ifNotMaskRole: function (role) {
        if(role == "bomb" || role == "thunder"  || role == "heal") {
            return true;
        }
        return false;
    },

    initEventListener:function () {
        this.node.on("event_effect", this.onEventEffect.bind(this));
    },

    onEventEffect:function() {
        console.log("listening effect loaded....");
    },

    setCountDown:function(counter) {
        var min = parseInt(counter/60);
        var sec = counter%60;
        //console.log(min +":"+ sec);
        var timeNode = this.canvasNode.getChildByName("banner").getChildByName("time");
        var cdNode = timeNode.getChildByName("countDown").getComponent("cc.Label");
        if(sec<10) {
            sec = "0" + sec;
        }
        cdNode.string = (min +":"+ sec);
    },

    doubleMagicDisp:function() {
        var dispnode = this.node.getChildByName("doubleMagic");
        dispnode.active = true;
    },

    setTimeCounter:function(cnt) {
        //use to compare if timeout, only for pk mode.
        this.gameNowTime = cnt;
        this.setCountDown(cnt);
        if(cnt == 60) {
            console.log("magic charge speed up");
            this.doubleMagicDisp();
            this.addJuice = 20;
        }

        this.setMagicBar();

        //counter1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("num_8.png"));
        //3 second is the ai page loading time.
        var count_down = this.gameCycleTime-cnt;

        if(count_down<0) {
            this.gameOver=true;
            return;
        }

        var tens = parseInt(count_down/10);
        var ones = count_down%10;

        //console.log(tens +":::"+ ones);
    },

    startTraceTimer:function() {
        //refer to server interval setting, must a little shorter than that in server
        this.interval = 30;
        var then = Date.now();
        var _parent = this;

        // 30 mini seconds a game cycle.
        var game_cycle = this.gameCycleTime*1000; 
        var game_cycle_then = Date.now();
        var cycle_cnt = 0;

        if(!this.traceTimer) {
            this.traceTimer = function() {                
                var now = Date.now();
                var delta = now - then;

                //when net traffic happened, idle for 5's will halt
                //not tested yet.
                var game_cycle_delta = now - _parent.gameStartTime;
                // if within game cycle time
                if(!_parent.gameOver && game_cycle_delta > cycle_cnt*1000) {
                    cycle_cnt++;

                    // if no response for 5s, then timeout
                    if(Math.abs(cycle_cnt-_parent.gameNowTime) > 5) {
                        this.syncTimeout();
                    }
                }

                if(delta>_parent.interval) {
                    then = now - (delta%_parent.interval);
                    _parent.mainGameCycle();
                }
            }.bind(this);
        }

        this.schedule(this.traceTimer,0);
    },

    mainGameCycle:function() {
        var _parent = this;
        var data,agents,bullets,bases,forts,rollLogs,agentsFuture,fortsFuture;

        if(this.gameTraceStack.length > this.bufferLen) {
            this.gameTraceStack.shift();
            data = this.gameTraceStack[0];
            //data = this.gameTraceStack[this.gameTraceStack.length - 10];
            agents = data.agents;
            agentsFuture = this.gameTraceStack[29].agents;
            fortsFuture = this.gameTraceStack[29].forts;
            bullets = data.bullets;
            bases = data.bases;
            forts = data.forts;
            rollLogs = data.rollLogs;

            _parent.playBullets(bullets);
            _parent.playLogs(rollLogs);

            _parent.playAgents(agents, agentsFuture);
            _parent.playBases(bases);
            _parent.playForts(forts);

            _parent.bulletProcess(bullets);
            _parent.logProcess(rollLogs);
            _parent.agentProcess(agents);
            _parent.fortProcess(forts, fortsFuture);
            _parent.baseProcess(bases);
        }

        //var event = new cc.Event.EventCustom("event_effect", true);
        //event.detail = "123";
        //this.node.dispatchEvent(event);
    },

    syncTimeout:function() {
        this.gameOver=true;
        this.stopTraceTimer();
        MY_SOCKET.disconnect();

        console.log("网络断开");
        //this.goPrevious();                 
    },

    stopTraceTimer:function() {
        if(this.traceTimer) {
            this.unschedule(this.traceTimer);
        }
    },

    playSnd:function(sndType) {
        if(sndType == "base") {
            cc.audioEngine.play(this.audios[0], false, 1);
        }
        else if(sndType == "fireSend") {
            cc.audioEngine.play(this.audios[1], false, 1);
        } 
        else if(sndType == "bomb") {
            cc.audioEngine.play(this.audios[2], false, 1);
        }
        else if(sndType == "ske") {
            cc.audioEngine.play(this.audios[3], false, 1);
        }
        else if(sndType == "hr") {
            cc.audioEngine.play(this.audios[4], false, 1);
        }
        else if(sndType == "lr") {
            cc.audioEngine.play(this.audios[5], false, 1);
        }
        else if(sndType == "gi") {
            cc.audioEngine.play(this.audios[6], false, 1);
        }  
        else if(sndType == "put1") {
            cc.audioEngine.play(this.audios[7], false, 1);
        }  
        else if(sndType == "wizfire") {
            cc.audioEngine.play(this.audios[2], false, 1);
        }  
        else if(sndType == "lm") {
            cc.audioEngine.play(this.audios[8], false, 1);
        }  
        else if(sndType == "gun") {
            cc.audioEngine.play(this.audios[9], false, 1);
        }  
        else if(sndType == "thunder") {
            cc.audioEngine.play(this.audios[10], false, 1);
        }  
        else if(sndType == "heal") {
            cc.audioEngine.play(this.audios[11], false, 1);
        } 
        else if(sndType == "log") {
            cc.audioEngine.play(this.audios[12], false, 1);
        } 
    },

    playEffect: function(role, x, y) {
        var bd;
        //play effect.
        //should destroy when finish.
        if(role == "hr") {
            bd = cc.instantiate(this.playerPrefab[13]);
            bd.x = x;
            bd.y = y+20;
            this.node.addChild(bd);
        }
        if(role == "lm") {
            this.playSnd("lm");
            bd = cc.instantiate(this.playerPrefab[15]);
            bd.x = x;
            bd.y = y-40;
            this.node.addChild(bd);
        }
        else if(role == "base") {
            this.playSnd("base");
            bd = cc.instantiate(this.playerPrefab[10]);
            bd.x = x;
            bd.y = y;
            this.node.addChild(bd);
        }
        //fortA
        else if(role == "fa") {
            bd = cc.instantiate(this.playerPrefab[10]);
            bd.x = x;
            bd.y = y;
            this.node.addChild(bd);
        }
        else if(role == "log") {
            bd = cc.instantiate(this.playerPrefab[10]);
            bd.scaleX = 0.8;
            bd.scaleY = 0.8;
            bd.x = x+10;
            bd.y = y;
            this.node.addChild(bd);
        }
        else if(role == "bomb") {
            this.playSnd("bomb");
            //shake the screen
            this.startSceneJitter();
            bd = cc.instantiate(this.playerPrefab[6]);
            bd.active = true;
            bd.x = x;
            bd.y = y;
            this.node.addChild(bd);
        }
        else if(role == "wizfire") {
            this.playSnd("wizfire");
            bd = cc.instantiate(this.playerPrefab[19]);
            bd.active = true;
            bd.x = x;
            bd.y = y;
            this.node.addChild(bd);
        }
    },

});
