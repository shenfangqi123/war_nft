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
        seleRole: "ske",
        magicCost: 1,
        roleLevel:1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //save the origin postion, becoz it will restore from shake action
        this.ox = this.node.x;
        this.oy = this.node.y;            
    },

    start () {
        this.isMoving = false;
        this.dragTo = null;
        this.seleInnerId = "";
        var layoutNode = this.getLayoutNode();
        var _self = this;

        //if in game mode page
        if(layoutNode) {
            var innerId;
            var dragItem = null;
            var layoutOp = layoutNode.getComponent('Game');
            var canvasNode = this.node.parent;
            var seleNode = canvasNode.getChildByName("charSele");

            this.node.on(cc.Node.EventType.TOUCH_START, function (params) {
                if(layoutOp.gameStartTime == 0) {
                    return;
                }
                _self.node.getChildByName("dragTo").active = true;
                layoutOp.showDragMask(_self.seleRole);

                _self.seleInnerId = layoutOp.setDragItem(params, _self.node.getChildByName("dragTo"));
            });

            this.node.on(cc.Node.EventType.TOUCH_MOVE, function (params) {
                var delta = params.touch.getDelta();
                _self.isMove = true;

                layoutOp.moveDragItem(params.target._name, delta);
            });

            this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
                var pt = _self.node.getPosition();
                var seleInfo = {"role":_self.seleRole, "level":_self.roleLevel, "magicCost":_self.magicCost, "params":params, "node":_self.node.getChildByName("dragTo")};

                if(_self.seleInnerId != "") {
                    layoutOp.unsetDragItem(_self.seleInnerId);
                    _self.seleInnerId = "";
                }

                _self.isMove = false;
                seleNode.active = true;
                seleNode.setPosition(pt);

                layoutOp.setClickItem(seleInfo);
            });

            this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (params) {
                var seleInfo = {"role":_self.seleRole, "level":_self.roleLevel, "magicCost":_self.magicCost};
                layoutOp.clearDragItem(params, seleInfo);
            });
        } 
        // in select mode page
        else {
            this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
                _self.processChoose();
            });
        }

        this.setInitImgByRole();
        this.setRoleCost();
    },

    processChoose: function() {
        var layoutOp = this.node.parent.parent.getComponent('SelLayout');
        var item = layoutOp.choosenCard;
        var isValidWxRelay;

        //if not valid wx relay(less than 3 seconds), then do nothing.
        if (CC_WECHATGAME) {
            isValidWxRelay = layoutOp.ifWxValidRelay();
            if(!isValidWxRelay) {
                layoutOp.dispWxRelayWarn(true);
                return;
            }
        }

        if(!item  || !item.role) {
            return;
        }
        var currentAgents = [];
        this.setRole(item.role, item.cost, item.level);
        this.setInitImgByRole();
        this.setRoleCost();
        currentAgents = this.getNowAgents();
        layoutOp.setCardsStatus(currentAgents);
    },

    getNowAgents: function() {
        var cNodes = this.node.parent._children;
        var tn;
        var ret = [];
        for(var i=0;i<cNodes.length;i++) {
            if(cNodes[i]._name == "SelCard") {
                ret.push(cNodes[i].getComponent("SelCard").seleRole);
            }
        }
        return ret;
    },

    setRole: function(role, cost, level) {
        this.seleRole = role;
        this.magicCost = cost;
        this.roleLevel = level;
    },

    getLayoutNode: function() {
        return this.node.parent.getChildByName("layout");
    },

    stopCardJitter: function(){
        this.node.stopAllActions();
        this.node.x = this.ox;
        this.node.y = this.oy; 
    },

    //shake the card node
    startCardJitter: function(){
        this.node.stopAllActions();

        var _self = this;
        var sceneNode = this.node;
        var cnt = 0;

        var lower = -2;
        var upper = 2;
        var callBack = function(){
            cnt++;
            var randomX = Math.floor(Math.random() * (upper - lower)) + lower;
            var randomY = Math.floor(Math.random() * (upper - lower)) + lower;
            
            sceneNode.x += randomX;
            sceneNode.y += randomY;
            if(cnt%3 == 0) {
                //sceneNode.stopAllActions();
                sceneNode.x = _self.ox;
                sceneNode.y = _self.oy;
            }
        }

        var node = this.node;//场景常驻节点
        var del = cc.delayTime(1/30);
        var cal = cc.callFunc(callBack);
        var seq = cc.sequence(del, cal);
        node.runAction(cc.repeatForever(seq));
    },

    setRoleCost: function() {
        if(this.magicCost == 0) {
            return;
        }
        var mark = this.node.getChildByName("ringMark");
        var costLabel = mark.getChildByName("cost").getComponent("cc.Label");
        costLabel.string = this.magicCost;
    },

    setSelImg: function(frameImg) {
        var dragNode = this.node.getChildByName("dragTo");
        var iconNode = this.node.getChildByName("icon");

        cc.loader.loadRes(frameImg, cc.SpriteFrame, function (err, spriteFrame) {
            dragNode.width = 100;
            dragNode.height = 120;
            dragNode.active = false;
            dragNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;

            iconNode.width = 100;
            iconNode.height = 120;
            iconNode.active = true;
            iconNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    setInitImgByRole: function() {
        var frameImg = "";

        if(this.seleRole == "ske") {
            this.setSelImg("sel_cards/ske");
        }
        //lieren
        else if(this.seleRole == "lr") {
            this.setSelImg("sel_cards/lieren");
        }
        //rockman
        else if(this.seleRole == "gi") {
            this.setSelImg("sel_cards/rockman");
        }
        else if(this.seleRole == "log") {
            this.setSelImg("sel_cards/log");
        }
        else if(this.seleRole == "bomb") {
            this.setSelImg("sel_cards/bomb");
        }
        else if(this.seleRole == "bee") {
            this.setSelImg("sel_cards/bee");
        }
        else if(this.seleRole == "wiz") {
            this.setSelImg("sel_cards/wiz");
        }
        //hero
        else if(this.seleRole == "hr") {
            this.setSelImg("sel_cards/hero");
        }
        //light man
        else if(this.seleRole == "lm") {
            this.setSelImg("sel_cards/lightman");
        }
        //hero
        else if(this.seleRole == "fa") {
            this.setSelImg("sel_cards/fortA");
        }
        //hero
        else if(this.seleRole == "ir") {
            this.setSelImg("sel_cards/ironman");
        }
        //buff thunder
        else if(this.seleRole == "thunder") {
            this.setSelImg("sel_cards/thunder");
        }
        //buff heal
        else if(this.seleRole == "heal") {
            this.setSelImg("sel_cards/heal");
        }

    }

    // update (dt) {},
});
