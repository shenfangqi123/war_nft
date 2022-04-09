
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Welcome.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2a91cx8Yg9CyIhlOix85UiP', 'Welcome');
// scripts/Welcome.js

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
//var pp = require("acdata").AcWar;
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
    loadLabel: cc.Label,
    startBut: cc.Button
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //this.audioMng = this.audioMng.getComponent('AudioMng');
    //this.audioMng.playMusic();
    var _self = this;

    this.startBut.getComponent(cc.Button).interactable = false;
    cc.loader.downloader.loadSubpackage("resources", function (err) {
      if (err) {
        console.log(err);

        _self.goH5Load();
      } else {
        cc.loader.loadResDir("resources", function (err, res) {
          console.log("you can go now!!!!!!!!!");
          cc.director.preloadScene('menu', _self.onProgress.bind(_self), function () {
            cc.director.preloadScene('game', _self.onProgress.bind(_self), function () {
              //_self.wxlogin();
              _self.startBut.getComponent(cc.Button).interactable = true;
            });
          });
        });
      }
    }); //test dragonbones

    var crabNode = this.node.getChildByName("Crab");

    if (crabNode) {
      var crabBodyNode = crabNode.getChildByName("crab_body");
      var armatureDisplay = crabBodyNode.getComponent(dragonBones.ArmatureDisplay);
      console.log("---------");
      console.log(armatureDisplay);
      armatureDisplay.playAnimation('ske_n_attack', 0);
    }
  },
  wxlogin: function wxlogin() {
    //let exportJson = {};
    //window.wx.login({
    //    success: (userRes) => {
    //        exportJson.code = userRes.code;//向服务端传递code用于获取微信小游戏的用户唯一标识
    //    },
    //});
    var datanode = cc.find('GameData').getComponent('GameData');

    var _self = this;

    var exportJson = {};
    var sysInfo = window.wx.getSystemInfoSync(); //获取微信界面大小

    var width = sysInfo.screenWidth;
    var height = sysInfo.screenHeight; //_self.startBut.getComponent(cc.Button).interactable = false;

    window.wx.getSetting({
      success: function success(res) {
        console.log(res.authSetting);

        if (res.authSetting["scope.userInfo"]) {
          console.log("用户已授权");
          window.wx.getUserInfo({
            success: function success(res) {
              console.log(res);
              exportJson.userInfo = res.userInfo;
              datanode.setWxUser(res.userInfo); //此时可进行登录操作
              //_self.startBut.getComponent(cc.Button).interactable = true;

              _self.play();
            }
          });
        } else {
          console.log("用户未授权");
          _self.startBut.getComponent(cc.Button).interactable = true;
          var button = window.wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
              left: 0,
              top: 0,
              width: width,
              height: height,
              backgroundColor: '#00000000',
              //最后两位为透明度
              color: '#ffffff',
              fontSize: 20,
              textAlign: "center",
              lineHeight: height
            }
          });
          button.onTap(function (res) {
            if (res.userInfo) {
              console.log("用户授权:", res);
              exportJson.userInfo = res.userInfo; //此时可进行登录操作

              datanode.setWxUser(res.userInfo);

              _self.play();

              button.destroy();
            } else {
              console.log("用户拒绝授权:", res);
            }
          });
        }
      }
    });
  },
  goH5Load: function goH5Load() {
    var _self = this;

    cc.director.preloadScene('menu', this.onProgress.bind(this), function () {
      cc.director.preloadScene('game', _self.onProgress.bind(_self), function () {
        _self.startBut.getComponent(cc.Button).interactable = true;
      });
    });
  },
  start: function start() {//this.loadProtobuf();
    //this.testProtobuf();
  },
  loadProtobuf: function loadProtobuf() {
    var myprotobuf = protobuf;
    var filename = "acdata.proto";
    myprotobuf.load(filename, function (err, root) {
      if (err) {
        throw err;
      }

      var acMessage = root.lookupType("AcWar.AcwarMessage");
      console.log(acMessage);
    });
  },
  testProtobuf: function testProtobuf() {
    if (cc.sys.isNative) {
      //在native上加载失败，是因为没有找到目录，我们在testProtobuf函数里面添加一个搜索目录:
      cc.log("jsb.fileUtils=" + jsb.fileUtils); //下面这段代码在PC window平台运行没问题，但是在android下面就出问题了
      //jsb.fileUtils.addSearchPath("res\\raw-assets\\resources", true);
      //需要改成这样：

      jsb.fileUtils.addSearchPath("res/raw-assets/resources", true); //坑太多了。。没办法
    }

    var filename1 = "acdata.proto"; // cc.loader.loadRes(filename1, cc.TextAsset, function (error, result) {//指定加载文本资源
    //     cc.log("loadRes error=" + error + ",result = " + result + ",type=" + typeof result);
    //     // callback(null, result);
    // });

    var protobufHere = protobuf; //require("protobuf");//导入为插件，直接使用

    protobufHere.load(filename1, function (err, root) {
      //Data/PbLobby.proto
      if (err) {
        console.log("load proto err:" + err);
        throw err;
      }
      /*
                  cc.log("root=" + root);
                  for (var i in root) {
                      cc.log("root." + i + "=" + root[i]);
                  }
                  //return;
      */


      cc.log("加载protobuf完毕，开始测试protobuf...");
      /*
                  var cmd = root.lookupEnum("PbLobby.Cmd");
                  cc.log(`cmd = ${JSON.stringify(cmd)}`);
                  cc.log("CMD_KEEPALIVED_C2S = "+cmd.values.CMD_KEEPALIVED_C2S);
      
                  //lookup 等价于 lookupTypeOrEnum 
                  //不同的是 lookup找不到返回null,lookupTypeOrEnum找不到则是抛出异常
                  var type1 = root.lookup("PbLobby.Cmd1");
                  cc.log("type1 = "+type1);
                  var type2 = root.lookup("PbLobby.Test1");
                  cc.log("type2 = "+type2);
      */

      /*
                  // Obtain a message type
                  var Test1Message = root.lookupType("AcWar.AcwarMessage");
                  cc.log("Test1Message = "+Test1Message);
      
                  // Exemplary payload
                  var payload = { id: 1,name:"hello protobuf" };
                  //var payload = { ids: 1,name:"hello protobuf" };
                  cc.log(`payload = ${JSON.stringify(payload)}`);
                  //过滤掉一些message中的不存在的字段
                  // Create a new message
                  var message = Test1Message.create(payload); // or use .fromObject if conversion is necessary
                  cc.log(`message = ${JSON.stringify(message)}`);
      
      
                  // Encode a message to an Uint8Array (browser) or Buffer (node)
                  var buffer = Test1Message.encode(message).finish();
                  cc.log("buffer1 = "+buffer);
                  cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);
                  // ... do something with buffer
      
                  // Decode an Uint8Array (browser) or Buffer (node) to a message
                  var decoded = Test1Message.decode(buffer);
                  cc.log("decoded1 = "+decoded);
                  cc.log(`decoded2 = ${JSON.stringify(decoded)}`);
                  // ... do something with message
      
                  // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
      
                  //一般情况下，也不需要下面的转换
                  // Maybe convert the message back to a plain object
                  var object = Test1Message.toObject(decoded, {
                      longs: String,
                      enums: String,
                      bytes: String,
                      // see ConversionOptions
                  });
                  cc.log("object = "+JSON.stringify(object));
      */
    });
  },
  play: function play() {
    //cc.director.loadScene('menu');
    var myAgentsParam = [{
      "seleRole": 'log',
      "magicCost": 3,
      "roleLevel": 1
    }, {
      "seleRole": 'hr',
      "magicCost": 4,
      "roleLevel": 1
    }, {
      "seleRole": 'bee',
      "magicCost": 1,
      "roleLevel": 1
    }, {
      "seleRole": 'ske',
      "magicCost": 1,
      "roleLevel": 1
    }, {
      "seleRole": 'lr',
      "magicCost": 1,
      "roleLevel": 1
    }];
    var curTime = new Date().getTime();

    var onSceneLaunched = function onSceneLaunched() {
      console.log(myAgentsParam);
      var gameObj = cc.director.getScene().getChildByName('Canvas').getChildByName('layout');
      var gameNode = gameObj.getComponent('Game');
      gameNode.setBuffDisp("heal");
      gameNode.setParam(myAgentsParam, curTime);
    };

    cc.director.loadScene('game', onSceneLaunched);
  },
  onProgress: function onProgress(completedCount, totalCount, item) {
    this.loading.progress = completedCount / totalCount;
    this.loadLabel.string = Math.floor(completedCount / totalCount * 100) + "%";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1dlbGNvbWUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwiUHJvZ3Jlc3NCYXIiLCJsb2FkTGFiZWwiLCJMYWJlbCIsInN0YXJ0QnV0IiwiQnV0dG9uIiwib25Mb2FkIiwiX3NlbGYiLCJnZXRDb21wb25lbnQiLCJpbnRlcmFjdGFibGUiLCJsb2FkZXIiLCJkb3dubG9hZGVyIiwibG9hZFN1YnBhY2thZ2UiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZ29INUxvYWQiLCJsb2FkUmVzRGlyIiwicmVzIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJvblByb2dyZXNzIiwiYmluZCIsImNyYWJOb2RlIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiY3JhYkJvZHlOb2RlIiwiYXJtYXR1cmVEaXNwbGF5IiwiZHJhZ29uQm9uZXMiLCJBcm1hdHVyZURpc3BsYXkiLCJwbGF5QW5pbWF0aW9uIiwid3hsb2dpbiIsImRhdGFub2RlIiwiZmluZCIsImV4cG9ydEpzb24iLCJzeXNJbmZvIiwid2luZG93Iiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpZHRoIiwic2NyZWVuV2lkdGgiLCJoZWlnaHQiLCJzY3JlZW5IZWlnaHQiLCJnZXRTZXR0aW5nIiwic3VjY2VzcyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsInNldFd4VXNlciIsInBsYXkiLCJidXR0b24iLCJjcmVhdGVVc2VySW5mb0J1dHRvbiIsInR5cGUiLCJ0ZXh0Iiwic3R5bGUiLCJsZWZ0IiwidG9wIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJmb250U2l6ZSIsInRleHRBbGlnbiIsImxpbmVIZWlnaHQiLCJvblRhcCIsImRlc3Ryb3kiLCJzdGFydCIsImxvYWRQcm90b2J1ZiIsIm15cHJvdG9idWYiLCJwcm90b2J1ZiIsImZpbGVuYW1lIiwibG9hZCIsInJvb3QiLCJhY01lc3NhZ2UiLCJsb29rdXBUeXBlIiwidGVzdFByb3RvYnVmIiwic3lzIiwiaXNOYXRpdmUiLCJqc2IiLCJmaWxlVXRpbHMiLCJhZGRTZWFyY2hQYXRoIiwiZmlsZW5hbWUxIiwicHJvdG9idWZIZXJlIiwibXlBZ2VudHNQYXJhbSIsImN1clRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm9uU2NlbmVMYXVuY2hlZCIsImdhbWVPYmoiLCJnZXRTY2VuZSIsImdhbWVOb2RlIiwic2V0QnVmZkRpc3AiLCJzZXRQYXJhbSIsImxvYWRTY2VuZSIsImNvbXBsZXRlZENvdW50IiwidG90YWxDb3VudCIsIml0ZW0iLCJwcm9ncmVzcyIsInN0cmluZyIsIk1hdGgiLCJmbG9vciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUMsSUFBQUEsT0FBTyxFQUFFSixFQUFFLENBQUNLLFdBakJKO0FBa0JSQyxJQUFBQSxTQUFTLEVBQUVOLEVBQUUsQ0FBQ08sS0FsQk47QUFtQlJDLElBQUFBLFFBQVEsRUFBRVIsRUFBRSxDQUFDUztBQW5CTCxHQUhQO0FBeUJMO0FBRUFDLEVBQUFBLE1BM0JLLG9CQTJCSztBQUNOO0FBQ0E7QUFDQSxRQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFFQSxTQUFLSCxRQUFMLENBQWNJLFlBQWQsQ0FBMkJaLEVBQUUsQ0FBQ1MsTUFBOUIsRUFBc0NJLFlBQXRDLEdBQXFELEtBQXJEO0FBRUFiLElBQUFBLEVBQUUsQ0FBQ2MsTUFBSCxDQUFVQyxVQUFWLENBQXFCQyxjQUFyQixDQUFvQyxXQUFwQyxFQUFpRCxVQUFDQyxHQUFELEVB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b3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuLy92YXIgcHAgPSByZXF1aXJlKFwiYWNkYXRhXCIpLkFjV2FyO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuXG4gICAgICAgIGxvYWRpbmc6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBsb2FkTGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBzdGFydEJ1dDogY2MuQnV0dG9uLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vdGhpcy5hdWRpb01uZyA9IHRoaXMuYXVkaW9NbmcuZ2V0Q29tcG9uZW50KCdBdWRpb01uZycpO1xuICAgICAgICAvL3RoaXMuYXVkaW9NbmcucGxheU11c2ljKCk7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICBjYy5sb2FkZXIuZG93bmxvYWRlci5sb2FkU3VicGFja2FnZShcInJlc291cmNlc1wiLCAoZXJyKT0+IHtcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgX3NlbGYuZ29INUxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoXCJyZXNvdXJjZXNcIiwgKGVyciwgcmVzKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2FuIGdvIG5vdyEhISEhISEhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdtZW51JywgX3NlbGYub25Qcm9ncmVzcy5iaW5kKF9zZWxmKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ2dhbWUnLCBfc2VsZi5vblByb2dyZXNzLmJpbmQoX3NlbGYpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL19zZWxmLnd4bG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vdGVzdCBkcmFnb25ib25lc1xuICAgICAgICB2YXIgY3JhYk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJDcmFiXCIpO1xuICAgICAgICBpZihjcmFiTm9kZSkge1xuICAgICAgICAgICAgdmFyIGNyYWJCb2R5Tm9kZSA9IGNyYWJOb2RlLmdldENoaWxkQnlOYW1lKFwiY3JhYl9ib2R5XCIpO1xuICAgICAgICAgICAgdmFyIGFybWF0dXJlRGlzcGxheSA9IGNyYWJCb2R5Tm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgICAgIGFybWF0dXJlRGlzcGxheS5wbGF5QW5pbWF0aW9uKCdza2Vfbl9hdHRhY2snLCAwKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHd4bG9naW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2xldCBleHBvcnRKc29uID0ge307XG4gICAgICAgIC8vd2luZG93Lnd4LmxvZ2luKHtcbiAgICAgICAgLy8gICAgc3VjY2VzczogKHVzZXJSZXMpID0+IHtcbiAgICAgICAgLy8gICAgICAgIGV4cG9ydEpzb24uY29kZSA9IHVzZXJSZXMuY29kZTsvL+WQkeacjeWKoeerr+S8oOmAkmNvZGXnlKjkuo7ojrflj5blvq7kv6HlsI/muLjmiI/nmoTnlKjmiLfllK/kuIDmoIfor4ZcbiAgICAgICAgLy8gICAgfSxcbiAgICAgICAgLy99KTtcbiAgICAgICAgbGV0IGRhdGFub2RlID0gY2MuZmluZCgnR2FtZURhdGEnKS5nZXRDb21wb25lbnQoJ0dhbWVEYXRhJyk7XG5cbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGV4cG9ydEpzb24gPSB7fTtcbiAgICAgICAgbGV0IHN5c0luZm8gPSB3aW5kb3cud3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgLy/ojrflj5blvq7kv6HnlYzpnaLlpKflsI9cbiAgICAgICAgbGV0IHdpZHRoID0gc3lzSW5mby5zY3JlZW5XaWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHN5c0luZm8uc2NyZWVuSGVpZ2h0O1xuICAgICAgICAvL19zZWxmLnN0YXJ0QnV0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy53eC5nZXRTZXR0aW5nKHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5hdXRoU2V0dGluZyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJJbmZvXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35bey5o6I5p2DXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cud3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0SnNvbi51c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhbm9kZS5zZXRXeFVzZXIocmVzLnVzZXJJbmZvKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5q2k5pe25Y+v6L+b6KGM55m75b2V5pON5L2cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9fc2VsZi5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLfmnKrmjojmnYNcIik7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLnN0YXJ0QnV0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSB3aW5kb3cud3guY3JlYXRlVXNlckluZm9CdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwMDAnLC8v5pyA5ZCO5Lik5L2N5Li66YCP5piO5bqmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5vblRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLfmjojmnYM6XCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0SnNvbi51c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+atpOaXtuWPr+i/m+ihjOeZu+W9leaTjeS9nFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFub2RlLnNldFd4VXNlcihyZXMudXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLnBsYXkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLfmi5Lnu53mjojmnYM6XCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgZ29INUxvYWQgKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ21lbnUnLCB0aGlzLm9uUHJvZ3Jlc3MuYmluZCh0aGlzKSwgZnVuY3Rpb24oKSB7ICAgIFxuICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdnYW1lJywgX3NlbGYub25Qcm9ncmVzcy5iaW5kKF9zZWxmKSwgZnVuY3Rpb24oKSB7ICAgIFxuICAgICAgICAgICAgICAgIF9zZWxmLnN0YXJ0QnV0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgLy90aGlzLmxvYWRQcm90b2J1ZigpO1xuICAgICAgICAvL3RoaXMudGVzdFByb3RvYnVmKCk7XG5cbiAgICB9LFxuXG4gICAgbG9hZFByb3RvYnVmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG15cHJvdG9idWYgPSBwcm90b2J1ZjtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gXCJhY2RhdGEucHJvdG9cIjtcbiAgICAgICAgbXlwcm90b2J1Zi5sb2FkKGZpbGVuYW1lLCBmdW5jdGlvbihlcnIsIHJvb3QpIHtcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjTWVzc2FnZSA9IHJvb3QubG9va3VwVHlwZShcIkFjV2FyLkFjd2FyTWVzc2FnZVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjTWVzc2FnZSk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHRlc3RQcm90b2J1ZjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7Ly/lnKhuYXRpdmXkuIrliqDovb3lpLHotKXvvIzmmK/lm6DkuLrmsqHmnInmib7liLDnm67lvZXvvIzmiJHku6zlnKh0ZXN0UHJvdG9idWblh73mlbDph4zpnaLmt7vliqDkuIDkuKrmkJzntKLnm67lvZU6XG4gICAgICAgICAgICBjYy5sb2coXCJqc2IuZmlsZVV0aWxzPVwiICsganNiLmZpbGVVdGlscyk7XG5cbiAgICAgICAgICAgIC8v5LiL6Z2i6L+Z5q615Luj56CB5ZyoUEMgd2luZG935bmz5Y+w6L+Q6KGM5rKh6Zeu6aKY77yM5L2G5piv5ZyoYW5kcm9pZOS4i+mdouWwseWHuumXrumimOS6hlxuICAgICAgICAgICAgLy9qc2IuZmlsZVV0aWxzLmFkZFNlYXJjaFBhdGgoXCJyZXNcXFxccmF3LWFzc2V0c1xcXFxyZXNvdXJjZXNcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAvL+mcgOimgeaUueaIkOi/meagt++8mlxuICAgICAgICAgICAganNiLmZpbGVVdGlscy5hZGRTZWFyY2hQYXRoKFwicmVzL3Jhdy1hc3NldHMvcmVzb3VyY2VzXCIsIHRydWUpOy8v5Z2R5aSq5aSa5LqG44CC44CC5rKh5Yqe5rOVXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZW5hbWUxID0gXCJhY2RhdGEucHJvdG9cIjtcbiAgICAgICAgLy8gY2MubG9hZGVyLmxvYWRSZXMoZmlsZW5hbWUxLCBjYy5UZXh0QXNzZXQsIGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0KSB7Ly/mjIflrprliqDovb3mlofmnKzotYTmupBcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImxvYWRSZXMgZXJyb3I9XCIgKyBlcnJvciArIFwiLHJlc3VsdCA9IFwiICsgcmVzdWx0ICsgXCIsdHlwZT1cIiArIHR5cGVvZiByZXN1bHQpO1xuICAgICAgICAvLyAgICAgLy8gY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgdmFyIHByb3RvYnVmSGVyZSA9IHByb3RvYnVmOy8vcmVxdWlyZShcInByb3RvYnVmXCIpOy8v5a+85YWl5Li65o+S5Lu277yM55u05o6l5L2/55SoXG4gICAgICAgIHByb3RvYnVmSGVyZS5sb2FkKGZpbGVuYW1lMSwgZnVuY3Rpb24gKGVyciwgcm9vdCkgey8vRGF0YS9QYkxvYmJ5LnByb3RvXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkIHByb3RvIGVycjpcIiArIGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuXG4vKlxuICAgICAgICAgICAgY2MubG9nKFwicm9vdD1cIiArIHJvb3QpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiByb290KSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicm9vdC5cIiArIGkgKyBcIj1cIiArIHJvb3RbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9yZXR1cm47XG4qL1xuXG4gICAgICAgICAgICBjYy5sb2coXCLliqDovb1wcm90b2J1ZuWujOavle+8jOW8gOWni+a1i+ivlXByb3RvYnVmLi4uXCIpXG5cbi8qXG4gICAgICAgICAgICB2YXIgY21kID0gcm9vdC5sb29rdXBFbnVtKFwiUGJMb2JieS5DbWRcIik7XG4gICAgICAgICAgICBjYy5sb2coYGNtZCA9ICR7SlNPTi5zdHJpbmdpZnkoY21kKX1gKTtcbiAgICAgICAgICAgIGNjLmxvZyhcIkNNRF9LRUVQQUxJVkVEX0MyUyA9IFwiK2NtZC52YWx1ZXMuQ01EX0tFRVBBTElWRURfQzJTKTtcblxuICAgICAgICAgICAgLy9sb29rdXAg562J5Lu35LqOIGxvb2t1cFR5cGVPckVudW0gXG4gICAgICAgICAgICAvL+S4jeWQjOeahOaYryBsb29rdXDmib7kuI3liLDov5Tlm55udWxsLGxvb2t1cFR5cGVPckVudW3mib7kuI3liLDliJnmmK/mipvlh7rlvILluLhcbiAgICAgICAgICAgIHZhciB0eXBlMSA9IHJvb3QubG9va3VwKFwiUGJMb2JieS5DbWQxXCIpO1xuICAgICAgICAgICAgY2MubG9nKFwidHlwZTEgPSBcIit0eXBlMSk7XG4gICAgICAgICAgICB2YXIgdHlwZTIgPSByb290Lmxvb2t1cChcIlBiTG9iYnkuVGVzdDFcIik7XG4gICAgICAgICAgICBjYy5sb2coXCJ0eXBlMiA9IFwiK3R5cGUyKTtcbiovXG5cbi8qXG4gICAgICAgICAgICAvLyBPYnRhaW4gYSBtZXNzYWdlIHR5cGVcbiAgICAgICAgICAgIHZhciBUZXN0MU1lc3NhZ2UgPSByb290Lmxvb2t1cFR5cGUoXCJBY1dhci5BY3dhck1lc3NhZ2VcIik7XG4gICAgICAgICAgICBjYy5sb2coXCJUZXN0MU1lc3NhZ2UgPSBcIitUZXN0MU1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAvLyBFeGVtcGxhcnkgcGF5bG9hZFxuICAgICAgICAgICAgdmFyIHBheWxvYWQgPSB7IGlkOiAxLG5hbWU6XCJoZWxsbyBwcm90b2J1ZlwiIH07XG4gICAgICAgICAgICAvL3ZhciBwYXlsb2FkID0geyBpZHM6IDEsbmFtZTpcImhlbGxvIHByb3RvYnVmXCIgfTtcbiAgICAgICAgICAgIGNjLmxvZyhgcGF5bG9hZCA9ICR7SlNPTi5zdHJpbmdpZnkocGF5bG9hZCl9YCk7XG4gICAgICAgICAgICAvL+i/h+a7pOaOieS4gOS6m21lc3NhZ2XkuK3nmoTkuI3lrZjlnKjnmoTlrZfmrrVcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBtZXNzYWdlXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFRlc3QxTWVzc2FnZS5jcmVhdGUocGF5bG9hZCk7IC8vIG9yIHVzZSAuZnJvbU9iamVjdCBpZiBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeVxuICAgICAgICAgICAgY2MubG9nKGBtZXNzYWdlID0gJHtKU09OLnN0cmluZ2lmeShtZXNzYWdlKX1gKTtcblxuXG4gICAgICAgICAgICAvLyBFbmNvZGUgYSBtZXNzYWdlIHRvIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSlcbiAgICAgICAgICAgIHZhciBidWZmZXIgPSBUZXN0MU1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICAgICAgY2MubG9nKFwiYnVmZmVyMSA9IFwiK2J1ZmZlcik7XG4gICAgICAgICAgICBjYy5sb2coYGJ1ZmZlcjIgPSAke0FycmF5LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJ1ZmZlcil9YCk7XG4gICAgICAgICAgICAvLyAuLi4gZG8gc29tZXRoaW5nIHdpdGggYnVmZmVyXG5cbiAgICAgICAgICAgIC8vIERlY29kZSBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpIHRvIGEgbWVzc2FnZVxuICAgICAgICAgICAgdmFyIGRlY29kZWQgPSBUZXN0MU1lc3NhZ2UuZGVjb2RlKGJ1ZmZlcik7XG4gICAgICAgICAgICBjYy5sb2coXCJkZWNvZGVkMSA9IFwiK2RlY29kZWQpO1xuICAgICAgICAgICAgY2MubG9nKGBkZWNvZGVkMiA9ICR7SlNPTi5zdHJpbmdpZnkoZGVjb2RlZCl9YCk7XG4gICAgICAgICAgICAvLyAuLi4gZG8gc29tZXRoaW5nIHdpdGggbWVzc2FnZVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgYXBwbGljYXRpb24gdXNlcyBsZW5ndGgtZGVsaW1pdGVkIGJ1ZmZlcnMsIHRoZXJlIGlzIGFsc28gZW5jb2RlRGVsaW1pdGVkIGFuZCBkZWNvZGVEZWxpbWl0ZWQuXG5cbiAgICAgICAgICAgIC8v5LiA6Iis5oOF5Ya15LiL77yM5Lmf5LiN6ZyA6KaB5LiL6Z2i55qE6L2s5o2iXG4gICAgICAgICAgICAvLyBNYXliZSBjb252ZXJ0IHRoZSBtZXNzYWdlIGJhY2sgdG8gYSBwbGFpbiBvYmplY3RcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBUZXN0MU1lc3NhZ2UudG9PYmplY3QoZGVjb2RlZCwge1xuICAgICAgICAgICAgICAgIGxvbmdzOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZW51bXM6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBieXRlczogU3RyaW5nLFxuICAgICAgICAgICAgICAgIC8vIHNlZSBDb252ZXJzaW9uT3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYy5sb2coXCJvYmplY3QgPSBcIitKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiovXG5cbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdtZW51Jyk7XG5cbiAgICAgICAgdmFyIG15QWdlbnRzUGFyYW0gPSBbe1wic2VsZVJvbGVcIjonbG9nJywgXCJtYWdpY0Nvc3RcIjozLCBcInJvbGVMZXZlbFwiOjF9LHtcInNlbGVSb2xlXCI6J2hyJywgXCJtYWdpY0Nvc3RcIjo0LCBcInJvbGVMZXZlbFwiOjF9LHtcInNlbGVSb2xlXCI6J2JlZScsIFwibWFnaWNDb3N0XCI6MSwgXCJyb2xlTGV2ZWxcIjoxfSx7XCJzZWxlUm9sZVwiOidza2UnLCBcIm1hZ2ljQ29zdFwiOjEsIFwicm9sZUxldmVsXCI6MX0se1wic2VsZVJvbGVcIjonbHInLCBcIm1hZ2ljQ29zdFwiOjEsIFwicm9sZUxldmVsXCI6MX1dO1xuICAgICAgICB2YXIgY3VyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIHZhciBvblNjZW5lTGF1bmNoZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG15QWdlbnRzUGFyYW0pO1xuICAgICAgICAgICAgdmFyIGdhbWVPYmogPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKS5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0Jyk7XG4gICAgICAgICAgICB2YXIgZ2FtZU5vZGUgPSBnYW1lT2JqLmdldENvbXBvbmVudCgnR2FtZScpO1xuICAgICAgICAgICAgZ2FtZU5vZGUuc2V0QnVmZkRpc3AoXCJoZWFsXCIpO1xuICAgICAgICAgICAgZ2FtZU5vZGUuc2V0UGFyYW0obXlBZ2VudHNQYXJhbSwgY3VyVGltZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJywgb25TY2VuZUxhdW5jaGVkKTtcbiAgICB9LFxuXG4gICAgb25Qcm9ncmVzczogZnVuY3Rpb24oY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pe1xuICAgICAgICB0aGlzLmxvYWRpbmcucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xuICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmcgPSBNYXRoLmZsb29yKGNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQgKiAxMDApICsgXCIlXCI7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=