
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/MenuScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL01lbnVTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwiUHJvZ3Jlc3NCYXIiLCJsb2FkTGFiZWwiLCJMYWJlbCIsIm9uTG9hZCIsInN0YXJ0Iiwib25Qcm9ncmVzcyIsImNvbXBsZXRlZENvdW50IiwidG90YWxDb3VudCIsIml0ZW0iLCJwcm9ncmVzcyIsInN0cmluZyIsIk1hdGgiLCJmbG9vciIsImdvUmVsYXkiLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsImlzU2hhcmVkIiwic2hhcmVUYWciLCJjbG9zZVRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIkNDX1dFQ0hBVEdBTUUiLCJ3eCIsInNoYXJlQXBwTWVzc2FnZSIsInRpdGxlIiwiaW1hZ2VVcmwiLCJwbGF5IiwiYnVmZlR5cGUiLCJ2aWRlb0FkIiwiY3JlYXRlUmV3YXJkZWRWaWRlb0FkIiwiYWRVbml0SWQiLCJzaG93IiwibG9hZCIsInRoZW4iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwib25FcnJvciIsImdvR2FtZSIsIm9uQ2xvc2UiLCJyZXMiLCJpc0VuZGVkIiwidW5kZWZpbmVkIiwic2VsTGF5b3V0IiwiZ2V0U2VsTGF5b3V0Tm9kZSIsInNlbExheW91dE5vZGUiLCJnZXRDb21wb25lbnQiLCJteUFnZW50c1BhcmFtIiwiZ2V0Tm93QWdlbnRzIiwiY3VyVGltZSIsIm9uU2NlbmVMYXVuY2hlZCIsImdhbWVPYmoiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnYW1lTm9kZSIsInNldEJ1ZmZEaXNwIiwic2V0UGFyYW0iLCJsb2FkU2NlbmUiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUMsSUFBQUEsT0FBTyxFQUFFSixFQUFFLENBQUNLLFdBakJKO0FBa0JSQyxJQUFBQSxTQUFTLEVBQUVOLEVBQUUsQ0FBQ08sS0FsQk4sQ0FvQlI7O0FBcEJRLEdBSFA7QUEwQkw7QUFFQUMsRUFBQUEsTUE1Qkssb0JBNEJLLENBQ047QUFDQTtBQUNILEdBL0JJO0FBaUNMQyxFQUFBQSxLQWpDSyxtQkFpQ0ksQ0FDUixDQWxDSTtBQW9DTEMsRUFBQUEsVUFBVSxFQUFFLG9CQUFTQyxjQUFULEVBQXlCQyxVQUF6QixFQUFxQ0MsSUFBckMsRUFBMEM7QUFDbEQ7QUFDQSxTQUFLVCxPQUFMLENBQWFVLFFBQWIsR0FBd0JILGNBQWMsR0FBQ0MsVUFBdkM7QUFDQSxTQUFLTixTQUFMLENBQWVTLE1BQWYsR0FBd0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixjQUFjLEdBQUNDLFVBQWYsR0FBNEIsR0FBdkMsSUFBOEMsR0FBdEU7QUFDSCxHQXhDSTtBQTBDTE0sRUFBQUEsT0FBTyxFQUFFLGlCQUFTQyxLQUFULEVBQWdCQyxlQUFoQixFQUFpQztBQUN0QyxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkYsZUFBaEI7QUFDQSxTQUFLRyxTQUFMLEdBQWlCLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUFqQjs7QUFDQSxRQUFJQyxhQUFKLEVBQW1CO0FBQUs7QUFDcEJDLE1BQUFBLEVBQUUsQ0FBQ0MsZUFBSCxDQUFtQjtBQUNmQyxRQUFBQSxLQUFLLEVBQUUsTUFEUTtBQUVmQyxRQUFBQSxRQUFRLEVBQUU7QUFGSyxPQUFuQjtBQUlIO0FBQ0osR0FwREk7QUFzRExDLEVBQUFBLElBQUksRUFBRSxjQUFTWixLQUFULEVBQWdCQyxlQUFoQixFQUFpQztBQUFBOztBQUNuQyxRQUFJWSxRQUFRLEdBQUdaLGVBQWY7O0FBRUEsUUFBR00sYUFBYSxLQUFLTSxRQUFRLElBQUksTUFBWixJQUFzQkEsUUFBUSxJQUFJLFNBQXZDLENBQWhCLEVBQW1FO0FBQy9EO0FBQ0EsVUFBSUMsT0FBTyxHQUFHTixFQUFFLENBQUNPLHFCQUFILENBQXlCO0FBQ25DQyxRQUFBQSxRQUFRLEVBQUU7QUFEeUIsT0FBekIsQ0FBZCxDQUYrRCxDQU0vRDs7QUFDQUYsTUFBQUEsT0FBTyxDQUFDRyxJQUFSLFlBQXFCLFlBQU07QUFDdkI7QUFDQUgsUUFBQUEsT0FBTyxDQUFDSSxJQUFSLEdBQ0tDLElBREwsQ0FDVTtBQUFBLGlCQUFNTCxPQUFPLENBQUNHLElBQVIsRUFBTjtBQUFBLFNBRFYsV0FFVyxVQUFBRyxHQUFHLEVBQUk7QUFDWkMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWjtBQUNELFNBSkw7QUFLSCxPQVBEO0FBU0FSLE1BQUFBLE9BQU8sQ0FBQ1MsT0FBUixDQUFnQixZQUFNO0FBQ2xCRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaOztBQUNBLFFBQUEsS0FBSSxDQUFDRSxNQUFMLENBQVlYLFFBQVo7QUFDSCxPQUhEO0FBS0FDLE1BQUFBLE9BQU8sQ0FBQ1csT0FBUixDQUFnQixVQUFBQyxHQUFHLEVBQUk7QUFDbkI7QUFDQTtBQUNBLFlBQUlBLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxPQUFYLElBQXNCRCxHQUFHLEtBQUtFLFNBQWxDLEVBQTZDO0FBQ3pDO0FBQ0EsVUFBQSxLQUFJLENBQUNKLE1BQUwsQ0FBWVgsUUFBWjtBQUNIO0FBQ0osT0FQRDtBQVFILEtBN0JELE1BNkJPO0FBQ0g7QUFDQSxXQUFLVyxNQUFMLENBQVlYLFFBQVo7QUFDSDtBQUNKLEdBMUZJO0FBNEZMVyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVNYLFFBQVQsRUFBbUI7QUFDdkIsUUFBSWdCLFNBQVMsR0FBRyxLQUFLQyxnQkFBTCxFQUFoQjtBQUNBLFFBQUlDLGFBQWEsR0FBR0YsU0FBUyxDQUFDRyxZQUFWLENBQXVCLFdBQXZCLENBQXBCO0FBQ0EsUUFBSUMsYUFBYSxHQUFHRixhQUFhLENBQUNHLFlBQWQsRUFBcEI7QUFDQSxRQUFJQyxPQUFPLEdBQUcsSUFBSTlCLElBQUosR0FBV0MsT0FBWCxFQUFkOztBQUVBLFFBQUk4QixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQVc7QUFDN0JmLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVo7QUFDQUQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlXLGFBQVo7QUFDQSxVQUFJSSxPQUFPLEdBQUd4RCxFQUFFLENBQUN5RCxRQUFILENBQVlDLFFBQVosR0FBdUJDLGNBQXZCLENBQXNDLFFBQXRDLEVBQWdEQSxjQUFoRCxDQUErRCxRQUEvRCxDQUFkO0FBQ0EsVUFBSUMsUUFBUSxHQUFHSixPQUFPLENBQUNMLFlBQVIsQ0FBcUIsTUFBckIsQ0FBZjtBQUNBUyxNQUFBQSxRQUFRLENBQUNDLFdBQVQsQ0FBcUI3QixRQUFyQjtBQUNBNEIsTUFBQUEsUUFBUSxDQUFDRSxRQUFULENBQWtCVixhQUFsQixFQUFpQ0UsT0FBakM7QUFDSCxLQVBEOztBQVNBdEQsSUFBQUEsRUFBRSxDQUFDeUQsUUFBSCxDQUFZTSxTQUFaLENBQXNCLE1BQXRCLEVBQThCUixlQUE5QjtBQUNILEdBNUdJO0FBOEdMTixFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBVztBQUN6QixRQUFJRCxTQUFTLEdBQUcsS0FBS2dCLElBQUwsQ0FBVUwsY0FBVixDQUF5QixlQUF6QixFQUEwQ0EsY0FBMUMsQ0FBeUQsTUFBekQsRUFBaUVBLGNBQWpFLENBQWdGLFNBQWhGLEVBQTJGQSxjQUEzRixDQUEwRyxXQUExRyxDQUFoQjtBQUNBLFdBQU9YLFNBQVA7QUFDSCxHQWpISSxDQW1ITDs7QUFuSEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcblxuICAgICAgICBsb2FkaW5nOiBjYy5Qcm9ncmVzc0JhcixcbiAgICAgICAgbG9hZExhYmVsOiBjYy5MYWJlbCxcblxuICAgICAgICAvL2F1ZGlvTW5nOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vdGhpcy5hdWRpb01uZyA9IHRoaXMuYXVkaW9NbmcuZ2V0Q29tcG9uZW50KCdBdWRpb01uZycpO1xuICAgICAgICAvL3RoaXMuYXVkaW9NbmcucGxheU11c2ljKCk7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICB9LFxuXG4gICAgb25Qcm9ncmVzczogZnVuY3Rpb24oY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pe1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBNYXRoLmZsb29yKGNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQgKiAxMDApICsgXCIlXCIpO1xuICAgICAgICB0aGlzLmxvYWRpbmcucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xuICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmcgPSBNYXRoLmZsb29yKGNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQgKiAxMDApICsgXCIlXCI7XG4gICAgfSxcblxuICAgIGdvUmVsYXk6IGZ1bmN0aW9uKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5pc1NoYXJlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hhcmVUYWcgPSBjdXN0b21FdmVudERhdGE7XG4gICAgICAgIHRoaXMuY2xvc2VUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGlmIChDQ19XRUNIQVRHQU1FKSB7ICAgIC8vaWYgd2VjaGF0IHBsYXRmb3JtXG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuS4reWPpOaImOe6qlwiLFxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBcImh0dHBzOi8vd3d3LmFzb2JlZS5tb2JpL2ZmdG93ZXIvcmVzL2FjTG9nbzIuanBnXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheTogZnVuY3Rpb24oZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICB2YXIgYnVmZlR5cGUgPSBjdXN0b21FdmVudERhdGE7XG5cbiAgICAgICAgaWYoQ0NfV0VDSEFUR0FNRSAmJiAoYnVmZlR5cGUgPT0gXCJoZWFsXCIgfHwgYnVmZlR5cGUgPT0gXCJ0aHVuZGVyXCIpKSB7XG4gICAgICAgICAgICAvLyDliJvlu7rmv4DlirHop4bpopHlub/lkYrlrp7kvovvvIzmj5DliY3liJ3lp4vljJZcbiAgICAgICAgICAgIGxldCB2aWRlb0FkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogJ2FkdW5pdC1lYmQ1ZDk4MWNlZDg0OGM3J1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIOeUqOaIt+inpuWPkeW5v+WRiuWQju+8jOaYvuekuua/gOWKseinhumikeW5v+WRilxuICAgICAgICAgICAgdmlkZW9BZC5zaG93KCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOWksei0pemHjeivlVxuICAgICAgICAgICAgICAgIHZpZGVvQWQubG9hZCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHZpZGVvQWQuc2hvdygpKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuaYvuekuuWksei0pScpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmlkZW9BZC5vbkVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuWKoOi9veWksei0pScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29HYW1lKGJ1ZmZUeXBlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2aWRlb0FkLm9uQ2xvc2UocmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyDnlKjmiLfngrnlh7vkuobjgJDlhbPpl63lub/lkYrjgJHmjInpkq5cbiAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJywgb25TY2VuZUxhdW5jaGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb0dhbWUoYnVmZlR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnLCBvblNjZW5lTGF1bmNoZWQpO1xuICAgICAgICAgICAgdGhpcy5nb0dhbWUoYnVmZlR5cGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdvR2FtZTogZnVuY3Rpb24oYnVmZlR5cGUpIHtcbiAgICAgICAgdmFyIHNlbExheW91dCA9IHRoaXMuZ2V0U2VsTGF5b3V0Tm9kZSgpO1xuICAgICAgICB2YXIgc2VsTGF5b3V0Tm9kZSA9IHNlbExheW91dC5nZXRDb21wb25lbnQoXCJTZWxMYXlvdXRcIik7XG4gICAgICAgIHZhciBteUFnZW50c1BhcmFtID0gc2VsTGF5b3V0Tm9kZS5nZXROb3dBZ2VudHMoKTtcbiAgICAgICAgdmFyIGN1clRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICB2YXIgb25TY2VuZUxhdW5jaGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tc3MxLS0tXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXlBZ2VudHNQYXJhbSk7XG4gICAgICAgICAgICB2YXIgZ2FtZU9iaiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKTtcbiAgICAgICAgICAgIHZhciBnYW1lTm9kZSA9IGdhbWVPYmouZ2V0Q29tcG9uZW50KCdHYW1lJyk7XG4gICAgICAgICAgICBnYW1lTm9kZS5zZXRCdWZmRGlzcChidWZmVHlwZSk7XG4gICAgICAgICAgICBnYW1lTm9kZS5zZXRQYXJhbShteUFnZW50c1BhcmFtLCBjdXJUaW1lKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnLCBvblNjZW5lTGF1bmNoZWQpO1xuICAgIH0sXG5cbiAgICBnZXRTZWxMYXlvdXROb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbExheW91dCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlNlbFNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIlNlbExheW91dFwiKTtcbiAgICAgICAgcmV0dXJuIHNlbExheW91dDtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==