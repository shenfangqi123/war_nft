"use strict";
cc._RF.push(module, 'e35c8uvDYNJtZPrAAvt2uLh', 'MenuScript');
// scripts/MenuScript.js

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
    loading: cc.ProgressBar,
    loadLabel: cc.Label //audioMng: cc.Node,

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {//this.audioMng = this.audioMng.getComponent('AudioMng');
    //this.audioMng.playMusic();
  },
  start: function start() {},
  onProgress: function onProgress(completedCount, totalCount, item) {
    //console.log( Math.floor(completedCount/totalCount * 100) + "%");
    this.loading.progress = completedCount / totalCount;
    this.loadLabel.string = Math.floor(completedCount / totalCount * 100) + "%";
  },
  goRelay: function goRelay(event, customEventData) {
    this.isShared = true;
    this.shareTag = customEventData;
    this.closeTime = new Date().getTime();

    if (CC_WECHATGAME) {
      //if wechat platform
      wx.shareAppMessage({
        title: "中古战纪",
        imageUrl: "https://www.asobee.mobi/fftower/res/acLogo2.jpg"
      });
    }
  },
  play: function play(event, customEventData) {
    var _this = this;

    var buffType = customEventData;

    if (CC_WECHATGAME && (buffType == "heal" || buffType == "thunder")) {
      // 创建激励视频广告实例，提前初始化
      var videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-ebd5d981ced848c7'
      }); // 用户触发广告后，显示激励视频广告

      videoAd.show()["catch"](function () {
        // 失败重试
        videoAd.load().then(function () {
          return videoAd.show();
        })["catch"](function (err) {
          console.log('激励视频 广告显示失败');
        });
      });
      videoAd.onError(function () {
        console.log('激励视频 广告加载失败');

        _this.goGame(buffType);
      });
      videoAd.onClose(function (res) {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
          //cc.director.loadScene('game', onSceneLaunched);
          _this.goGame(buffType);
        }
      });
    } else {
      //cc.director.loadScene('game', onSceneLaunched);
      this.goGame(buffType);
    }
  },
  goGame: function goGame(buffType) {
    var selLayout = this.getSelLayoutNode();
    var selLayoutNode = selLayout.getComponent("SelLayout");
    var myAgentsParam = selLayoutNode.getNowAgents();
    var curTime = new Date().getTime();

    var onSceneLaunched = function onSceneLaunched() {
      console.log("--ss1---");
      console.log(myAgentsParam);
      var gameObj = cc.director.getScene().getChildByName('Canvas').getChildByName('layout');
      var gameNode = gameObj.getComponent('Game');
      gameNode.setBuffDisp(buffType);
      gameNode.setParam(myAgentsParam, curTime);
    };

    cc.director.loadScene('game', onSceneLaunched);
  },
  getSelLayoutNode: function getSelLayoutNode() {
    var selLayout = this.node.getChildByName("SelScrollView").getChildByName("view").getChildByName("content").getChildByName("SelLayout");
    return selLayout;
  } // update (dt) {},

});

cc._RF.pop();