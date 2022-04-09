// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

// 定义一个判断函数
String.prototype.inArray = function(arr){  
    // 不是数组则抛出异常
    if(!arr){
         console.log("ERR(in_array):Input is not an array");
    }
    // 遍历是否在数组中
    for(var i=0,k=arr.length;i<k;i++){
        if(this==arr[i]) {
            return true;  
        }
    }
    // 如果不在数组中就会返回false
    return false;
};

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
        // 这个属性引用了预制资源
        playerPrefab: {
            default: [],
            type: cc.Prefab
        },
        startBut1: cc.Button,
        startBut2: cc.Button,
        startBut3: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        var _self = this;
        this.startBut1.getComponent(cc.Button).interactable = false;
        this.startBut2.getComponent(cc.Button).interactable = false;
        this.startBut3.getComponent(cc.Button).interactable = false;

        var choosenCard = {};

        this.allCardNodes = [];
        this.myCardNodes = [];

        this.agentsDef = this.getPersistantData();

        this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
            _self.unselect();
        });

        var node = cc.find('GameData').getComponent('GameData');
        var dataobj;
        this.username = node.getName();

        //default roles for a user. other may need to get via video or relay.
        this.baseRoles = ["bee","ske","ir","lr","log","lm","hr"];
        this.wxRelayTime;

        node.httpPost(this.username, "").then((data) => {
            console.log("------------GameData------------------");
            console.log(data);
            dataobj = JSON.parse(data);
            _self.agentsDef = dataobj;
            node.setData(dataobj);
            _self.setMyCards();
            _self.setAllCards();
            _self.setScore();
            _self.setUser();

            setTimeout(function() {
                _self.startBut1.getComponent(cc.Button).interactable = true; 
                _self.startBut2.getComponent(cc.Button).interactable = true; 
                _self.startBut3.getComponent(cc.Button).interactable = true; 
            }, 2000);
        }, (err) => {   //if no connection then use default data for test.
            _self.setMyCards();
            _self.setAllCards();
            _self.setScore();
            _self.setUser();
            _self.startBut1.getComponent(cc.Button).interactable = true;
            _self.startBut2.getComponent(cc.Button).interactable = true;
            _self.startBut3.getComponent(cc.Button).interactable = true;
        });


    },

    start () {
        var node = cc.find('GameData').getComponent('GameData');
        console.log("upgraded:" + node.isUpgrade);


/*
        var _self = this;
        //var name = this.getRandomCharName();
        var node = cc.find('GameData').getComponent('GameData');
        var dataobj;
        this.username = node.getName();

        node.httpPost(this.username, "").then((data) => {
            console.log("------------GameData------------------");
            console.log(data);
            dataobj = JSON.parse(data);
            _self.agentsDef = dataobj;
            node.setData(dataobj);
            _self.setMyCards();
            _self.setAllCards();
            _self.setScore();
            _self.setUser();

            _self.startBut1.getComponent(cc.Button).interactable = true;
        }, (err) => {   //if no connection then use default data for test.
            _self.setMyCards();
            _self.setAllCards();
            _self.setScore();
            _self.setUser();
        });
*/
    },

    getRandomCharName: function() {
        var aphabets =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        var nick = "";
        for(var i=0;i<6;i++) {
            nick += aphabets[Math.floor(Math.random()*aphabets.length)];
        } 
        return nick;
    },

    setScore: function() {
        var myscore = this.agentsDef.myscore;
        var nextscore = this.agentsDef.nextscore;

        var wallNode = this.node.getChildByName("clanWall");
        var myScoreLabel = wallNode.getChildByName("wordbg").getChildByName("myScore").getComponent("cc.Label");
        var nextScoreLabel = wallNode.getChildByName("wordbg").getChildByName("nextScore").getComponent("cc.Label");

        myScoreLabel.string = myscore;
        nextScoreLabel.string = "/" + nextscore;
    },

    setUser: function() {
        var wonode = this.node.getChildByName("wobanner");
        var userLabel = wonode.getChildByName("username").getComponent("cc.Label");
        var levelLabel = wonode.getChildByName("userlevel").getComponent("cc.Label");

        userLabel.string = this.agentsDef.name;
        levelLabel.string = this.agentsDef.level;
    },

    setMyCards: function() {
        var sx = -295;
        var sy = 24;
        var mx, my;
        var card, cardNode, cost, level;
        var moveTo;
        var allCards = this.agentsDef.myList;
        var rowItems = 0;
        var rows = 0;
        var cols = 0;
        var wallNode = this.node.getChildByName("clanWall");
/*
        for(var i=0;i<6;i++) {
            cols = i%6;
            mx = sx+(cols*124);
            my = sy;
            card = cc.instantiate(this.playerPrefab[2]);
            moveTo = cc.v2(mx, my);
            card.setPosition(moveTo);
            wallNode.addChild(card);
        }
*/
        for(var i=0;i<6;i++) {
            card = cc.instantiate(this.playerPrefab[1]);
            cardNode = card.getComponent('SelCard');
            if(allCards[i]) {
                cost = this.agentsDef[allCards[i]].cost;
                level = this.agentsDef.level;
                cardNode.setRole(allCards[i], cost, level);
            }

            this.myCardNodes.push(cardNode);                
            cols = i%6;
            mx = sx+(cols*124);
            my = sy;
            moveTo = cc.v2(mx, my);
            card.setPosition(moveTo);
            wallNode.addChild(card);
        }
    },

    setRelayUI: function(role) {
        if (CC_WECHATGAME && !role.inArray(this.baseRoles)) {    //if wechat platform
            wx.shareAppMessage({
                title: "中古战纪",
                imageUrl: "https://www.asobee.mobi/fftower/res/acLogo2.jpg"
            })
            this.wxRelayTime = new Date().getTime();
        }
    },

    ifWxValidRelay: function() {
        var cur = new Date().getTime();
        if (cur - this.wxRelayTime < 3000) {
            return false;
        }
        return true;
    },

    seleOneCard: function(role) {
        var card;
        for(var i=0;i<this.allCardNodes.length;i++) {
            card = this.allCardNodes[i];
            if(card.seleRole !== role) {
                this.choosenCard = this.agentsDef[role];
                this.choosenCard.role = role;
                card.grey(true);
            }
        }
        this.shakeMyCards(true);
        this.setRelayUI(role);
        this.dispWxRelayWarn(false);
    },

    dispWxRelayWarn: function(flag) {
        var warn = this.node.getChildByName("wxRelayWarn");
        warn.active = flag;
    },

    getNowAgents: function() {
        var cNodes = this.node.getChildByName("clanWall")._children;
        var tn;
        var ret = [];
        var agentsList = [];
        var ad = {};
        var role, cost, level;
        for(var i=0;i<cNodes.length;i++) {
            if(cNodes[i]._name == "SelCard") {
                role = cNodes[i].getComponent("SelCard").seleRole;
                cost = cNodes[i].getComponent("SelCard").magicCost;
                level = cNodes[i].getComponent("SelCard").roleLevel;

                if(cost > 0) {
                    ad = {"seleRole":role, "magicCost":cost, "roleLevel":level};
                    agentsList.push(role);
                    ret.push(ad);                    
                }
            }
        }

        var node = cc.find('GameData').getComponent('GameData');
        node.setMyList(agentsList);
        return ret;
    },

    getPersistantData: function(param) {
        var node = cc.find('GameData').getComponent('GameData');
        return node.getData();
    },

    setCardsStatus: function(nowAgents) {
        var card;
        var sumMyCards = 0;
        var sumCost = 0;
        var average = 0;
        var wallNode = this.node.getChildByName("clanWall");
        var averageLabel = wallNode.getChildByName("wordboardbg").getChildByName("averageCos").getComponent("cc.Label")
        var myCardsNumLabel = wallNode.getChildByName("wordbg").getChildByName("cardBut").getChildByName("myCardNum").getComponent("cc.Label")
        var allCardsNumLabel = wallNode.getChildByName("wordbg").getChildByName("cardBut").getChildByName("allCardNum").getComponent("cc.Label")

        for(var i=0;i<this.allCardNodes.length;i++) {
            card = this.allCardNodes[i];
            card.setCardStatus(card.seleRole.inArray(nowAgents));
        }

        //for average magicCost display
        for(var i=0;i<this.myCardNodes.length;i++) {
            if(this.myCardNodes[i].magicCost !=0) {
                sumMyCards++;
                sumCost += this.myCardNodes[i].magicCost;
            }
        }

        average = sumCost/sumMyCards;
        averageLabel.string = average.toFixed(2);

        //我的兵牌显示
        myCardsNumLabel.string = sumMyCards;
        allCardsNumLabel.string = "/" + this.allCardNodes.length;
    },

    shakeMyCards: function(flag) {
        var card;
        for(var i=0;i<this.myCardNodes.length;i++) {
            card = this.myCardNodes[i];
            if(flag) {
                card.startCardJitter();
            } else {
                card.stopCardJitter();
            }
        }
    },

    unselect: function() {
        var card;
        this.choosenCard = {};
        for(var i=0;i<this.allCardNodes.length;i++) {
            card = this.allCardNodes[i];
            card.grey(false);
        }
        this.shakeMyCards(false);
//this.dispWxRelayWarn(false);
    },

    setAllCards: function() {
        var sx = -200;
        var sy = -400;
        var mx, my;
        var card, cardNode, cost, disp, icon;
        var moveTo;
        var allCards = this.agentsDef.allList;
        var rowItems = 0;
        var rows = 0;
        var cols = 0;

        for(var i=0;i<allCards.length;i++) {
            cost = this.agentsDef[allCards[i]].cost;
            disp = this.agentsDef[allCards[i]].disp;
            rows = Math.floor(i/4);
            cols = i%4;

            my = sy-(rows*200);
            mx = sx+(cols*170);

            card = cc.instantiate(this.playerPrefab[0]);
            cardNode = card.getComponent('AllCard');
            cardNode.setRole(allCards[i], cost, disp);

            if(CC_WECHATGAME && !allCards[i].inArray(this.baseRoles)) {
                icon = cc.instantiate(this.playerPrefab[3]);
                icon.setPosition(cc.v2(38,68));
                icon.scaleX = 0.6;
                icon.scaleY = 0.6;
                card.addChild(icon);
            }

            moveTo = cc.v2(mx, my);
            card.setPosition(moveTo);

            this.allCardNodes.push(cardNode);
            this.node.addChild(card);
        }

        this.setCardsStatus(this.agentsDef.myList);
    },

    // update (dt) {},
});
