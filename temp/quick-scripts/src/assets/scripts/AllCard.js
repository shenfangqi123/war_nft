"use strict";
cc._RF.push(module, '9b622jQnM9HZLCxDURFLjs8', 'AllCard');
// scripts/AllCard.js

"use strict";

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
  "extends": cc.Component,
  properties: {
    seleRole: "ske",
    magicCost: 1,
    level: 1,
    disp: ""
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    this.isMoving = false;
    this.seleInnerId = "";
    this.setInitImgByRole();
    this.setRoleCost();
    this.setRoleDisp(); //this.grey(true);
  },
  setCardStatus: function setCardStatus(flag) {
    var but = this.node.getChildByName("useButton");
    var hidebut = this.node.getChildByName("click");
    var lb = but.getChildByName("disp");
    var lbword = lb.getComponent("cc.Label"); // in used

    if (flag) {
      but.getComponent(cc.Button).interactable = false;
      hidebut.getComponent(cc.Button).interactable = false; //lbword.string = "已使用";
    } else {
      but.getComponent(cc.Button).interactable = true;
      hidebut.getComponent(cc.Button).interactable = true; //lbword.string = "使用";
    }
  },
  grey: function grey(flag) {
    var butNode = this.node.getChildByName("useButton");

    if (flag) {
      //butNode.getComponent(cc.Button).interactable = false;
      this.node.opacity = 100;
    } else {
      //butNode.getComponent(cc.Button).interactable = true;
      this.node.opacity = 255;
    }
  },
  userButClick: function userButClick() {
    var layout = this.node.parent.getComponent("SelLayout");
    layout.seleOneCard(this.seleRole);
  },
  setRole: function setRole(role, cost, disp) {
    this.seleRole = role;
    this.magicCost = cost;
    this.disp = disp;
  },
  getLayoutNode: function getLayoutNode() {
    return this.node.parent.getChildByName("layout");
  },
  setRoleCost: function setRoleCost() {
    var mark = this.node.getChildByName("ringMark");
    var costLabel = mark.getChildByName("cost").getComponent("cc.Label");
    costLabel.string = this.magicCost;
  },
  setRoleDisp: function setRoleDisp() {
    var butLabel = this.node.getChildByName("useButton").getChildByName("disp").getComponent("cc.Label");
    butLabel.string = this.disp;
  },
  setSelImg: function setSelImg(frameImg) {
    var iconNode = this.node.getChildByName("icon");
    cc.loader.loadRes(frameImg, cc.SpriteFrame, function (err, spriteFrame) {
      //iconNode.width = 100;
      //iconNode.height = 120;
      iconNode.active = true;
      iconNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
  },
  setInitImgByRole: function setInitImgByRole() {
    var frameImg = "";

    if (this.seleRole == "ske") {
      this.setSelImg("sel_cards/ske");
    } //lieren
    else if (this.seleRole == "lr") {
        this.setSelImg("sel_cards/lieren");
      } //rockman
      else if (this.seleRole == "gi") {
          this.setSelImg("sel_cards/rockman");
        } else if (this.seleRole == "log") {
          this.setSelImg("sel_cards/log");
        } else if (this.seleRole == "bomb") {
          this.setSelImg("sel_cards/bomb");
        } else if (this.seleRole == "bee") {
          this.setSelImg("sel_cards/bee");
        } else if (this.seleRole == "wiz") {
          this.setSelImg("sel_cards/wiz");
        } //hero
        else if (this.seleRole == "hr") {
            this.setSelImg("sel_cards/hero");
          } //light man
          else if (this.seleRole == "lm") {
              this.setSelImg("sel_cards/lightman");
            } //hero
            else if (this.seleRole == "fa") {
                this.setSelImg("sel_cards/fortA");
              } //hero
              else if (this.seleRole == "ir") {
                  this.setSelImg("sel_cards/ironman");
                }
  } // update (dt) {},

});

cc._RF.pop();