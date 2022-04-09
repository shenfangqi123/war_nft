
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8204dK680RKmLHLtijslCkm', 'GameData');
// scripts/GameData.js

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
  properties: {// foo: {
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
  onLoad: function onLoad() {
    cc.game.addPersistRootNode(this.node);
    this.name = this.getRandomCharName();
    this.nick = this.name;
    this.isUpgrade = false;
    this.agentsDef = {
      "name": "test01",
      "level": 1,
      "myscore": 2300,
      "nextscore": 3500,
      "basescore": 15,
      //destroy one base will get that score
      "allList": ["log", "bomb", "ske", "ir", "hr", "bee", "gi", "lm", "lr", "wiz"],
      "myList": ["log", "hr", "bee", "ske"],
      "log": {
        "level": 1,
        "cost": 3
      },
      "bomb": {
        "level": 1,
        "cost": 4
      },
      "ske": {
        "level": 1,
        "cost": 1
      },
      "ir": {
        "level": 1,
        "cost": 3
      },
      "hr": {
        "level": 1,
        "cost": 4
      },
      "bee": {
        "level": 1,
        "cost": 1
      },
      "gi": {
        "level": 1,
        "cost": 4
      },
      "lm": {
        "level": 1,
        "cost": 3
      },
      "lr": {
        "level": 1,
        "cost": 2
      },
      "wiz": {
        "level": 1,
        "cost": 5
      }
    };
  },
  start: function start() {},
  getRandomCharName: function getRandomCharName() {
    var aphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var nick = "";

    for (var i = 0; i < 6; i++) {
      nick += aphabets[Math.floor(Math.random() * aphabets.length)];
    }

    return nick;
  },
  httpPost: function httpPost(user, params, fd, file) {
    var url = "https://www.asobee.mobi/fftower/ffinfo.php?uid=" + user; //var url = "http://localhost/fftower/ffinfo.php?uid=" + user;

    if (fd && file) {
      url += "&fd=" + fd + "&file=" + file;
    }

    return new Promise(function (resolve, reject) {
      var xhr = cc.loader.getXMLHttpRequest();

      xhr.onreadystatechange = function () {
        cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);

        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          var respone = xhr.responseText;
          resolve(respone);
        } else if (xhr.readyState === 4 && xhr.status == 401) {
          reject("err");
        } else if (xhr.readyState === 4 && xhr.status == 0) {
          reject("err");
        }
      };

      xhr.open("GET", url, true); // note: In Internet Explorer, the timeout property may be set only after calling the open()
      // method and before calling the send() method.
      //xhr.timeout = 5000;// 5 seconds for timeout

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(params);
    });
  },
  winScore: function winScore(score) {
    this.agentsDef.myscore += score;
    this.setMyScore(this.agentsDef.myscore);
  },
  setWxUser: function setWxUser(userInfo) {
    var uarr = userInfo.avatarUrl.split("/");
    var len = uarr.length;
    var ts = uarr[len - 2];
    var l1 = ts.substring(0, 6);
    var l2 = ts.substring(ts.length - 6);
    this.name = l1 + l2;
    this.nick = userInfo.nickName;
  },
  //自定义的两个函数。将值保存在this变量里
  setData: function setData(json) {
    this.agentsDef = json;
  },
  getName: function getName() {
    return this.name;
  },
  getNick: function getNick() {
    return this.nick;
  },
  getData: function getData() {
    return this.agentsDef;
  },
  setMyList: function setMyList(mylist) {
    this.agentsDef.myList = mylist;
    this.httpPost(this.name, "", "list", mylist).then(function (data) {
      console.log("------------setMyList------------------");
      console.log(data);
    }, function (err) {
      console.log(err);
    });
  },
  setUpgrade: function setUpgrade(val) {
    this.isUpgrade = false;
  },
  setMyScore: function setMyScore(score) {
    var _self = this;

    this.agentsDef.myscore = score;
    this.httpPost(this.name, "", "score", score).then(function (data) {
      console.log("------------setMyScore------------------");
      console.log(data);

      if (data == "uped") {
        _self.isUpgrade = true;
      }
    }, function (err) {
      console.log(err);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVEYXRhLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJuYW1lIiwiZ2V0UmFuZG9tQ2hhck5hbWUiLCJuaWNrIiwiaXNVcGdyYWRlIiwiYWdlbnRzRGVmIiwic3RhcnQiLCJhcGhhYmV0cyIsImkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJodHRwUG9zdCIsInVzZXIiLCJwYXJhbXMiLCJmZCIsImZpbGUiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsImxvYWRlciIsImdldFhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwibG9nIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbmUiLCJyZXNwb25zZVRleHQiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJ3aW5TY29yZSIsInNjb3JlIiwibXlzY29yZSIsInNldE15U2NvcmUiLCJzZXRXeFVzZXIiLCJ1c2VySW5mbyIsInVhcnIiLCJhdmF0YXJVcmwiLCJzcGxpdCIsImxlbiIsInRzIiwibDEiLCJzdWJzdHJpbmciLCJsMiIsIm5pY2tOYW1lIiwic2V0RGF0YSIsImpzb24iLCJnZXROYW1lIiwiZ2V0TmljayIsImdldERhdGEiLCJzZXRNeUxpc3QiLCJteWxpc3QiLCJteUxpc3QiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJlcnIiLCJzZXRVcGdyYWRlIiwidmFsIiwiX3NlbGYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNS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QUFDM0QsU0FBTixHQUFrQixJQUFsQjtBQUNIO0FBQ0osS0FORCxFQU1HLFVBQUN3RCxHQUFELEVBQVM7QUFDUkQsTUFBQUEsT0FBTyxDQUFDakMsR0FBUixDQUFZa0MsR0FBWjtBQUNILEtBUkQ7QUFTSCxHQXpMSSxDQTJMTDs7QUEzTEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmdldFJhbmRvbUNoYXJOYW1lKCk7XG4gICAgICAgIHRoaXMubmljayA9IHRoaXMubmFtZTtcbiAgICAgICAgdGhpcy5pc1VwZ3JhZGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmFnZW50c0RlZiA9IHtcbiAgICAgICAgICAgIFwibmFtZVwiOlwidGVzdDAxXCIsXG4gICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgIFwibXlzY29yZVwiOjIzMDAsXG4gICAgICAgICAgICBcIm5leHRzY29yZVwiOjM1MDAsXG4gICAgICAgICAgICBcImJhc2VzY29yZVwiOjE1LCAgIC8vZGVzdHJveSBvbmUgYmFzZSB3aWxsIGdldCB0aGF0IHNjb3JlXG4gICAgICAgICAgICBcImFsbExpc3RcIjpbXCJsb2dcIixcImJvbWJcIixcInNrZVwiLFwiaXJcIixcImhyXCIsXCJiZWVcIixcImdpXCIsXCJsbVwiLFwibHJcIixcIndpelwiXSxcbiAgICAgICAgICAgIFwibXlMaXN0XCI6W1wibG9nXCIsXCJoclwiLFwiYmVlXCIsXCJza2VcIl0sXG5cbiAgICAgICAgICAgIFwibG9nXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJib21iXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJza2VcIjp7XG4gICAgICAgICAgICAgICAgXCJsZXZlbFwiOjEsXG4gICAgICAgICAgICAgICAgXCJjb3N0XCI6MSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImlyXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoclwiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjo0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYmVlXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnaVwiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjo0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibG1cIjp7XG4gICAgICAgICAgICAgICAgXCJsZXZlbFwiOjEsXG4gICAgICAgICAgICAgICAgXCJjb3N0XCI6MyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxyXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ3aXpcIjp7XG4gICAgICAgICAgICAgICAgXCJsZXZlbFwiOjEsXG4gICAgICAgICAgICAgICAgXCJjb3N0XCI6NSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tQ2hhck5hbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXBoYWJldHMgPVtcImFcIixcImJcIixcImNcIixcImRcIixcImVcIixcImZcIixcImdcIixcImhcIixcImlcIixcImpcIixcImtcIixcImxcIixcIm1cIixcIm5cIixcIm9cIixcInBcIixcInFcIixcInJcIixcInNcIixcInRcIixcInVcIixcInZcIixcIndcIixcInhcIixcInlcIixcInpcIl07XG4gICAgICAgIHZhciBuaWNrID0gXCJcIjtcbiAgICAgICAgZm9yKHZhciBpPTA7aTw2O2krKykge1xuICAgICAgICAgICAgbmljayArPSBhcGhhYmV0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqYXBoYWJldHMubGVuZ3RoKV07XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBuaWNrO1xuICAgIH0sXG5cbiAgICBodHRwUG9zdCh1c2VyLHBhcmFtcyxmZCxmaWxlKSB7XG4gICAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vd3d3LmFzb2JlZS5tb2JpL2ZmdG93ZXIvZmZpbmZvLnBocD91aWQ9XCIgKyB1c2VyO1xuICAgICAgICAvL3ZhciB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3QvZmZ0b3dlci9mZmluZm8ucGhwP3VpZD1cIiArIHVzZXI7XG4gICAgICAgIGlmKGZkICYmIGZpbGUpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZmZD1cIitmZCArXCImZmlsZT1cIitmaWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIHZhciB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCd4aHIucmVhZHlTdGF0ZT0nK3hoci5yZWFkeVN0YXRlKycgIHhoci5zdGF0dXM9Jyt4aHIuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25lID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiZXJyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJlcnJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG4gICAgXG4gICAgICAgICAgICAvLyBub3RlOiBJbiBJbnRlcm5ldCBFeHBsb3JlciwgdGhlIHRpbWVvdXQgcHJvcGVydHkgbWF5IGJlIHNldCBvbmx5IGFmdGVyIGNhbGxpbmcgdGhlIG9wZW4oKVxuICAgICAgICAgICAgLy8gbWV0aG9kIGFuZCBiZWZvcmUgY2FsbGluZyB0aGUgc2VuZCgpIG1ldGhvZC5cbiAgICAgICAgICAgIC8veGhyLnRpbWVvdXQgPSA1MDAwOy8vIDUgc2Vjb25kcyBmb3IgdGltZW91dFxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTsgIFxuICAgICAgICAgICAgeGhyLnNlbmQocGFyYW1zKTtcbiAgICAgICAgfSkgIFxuICAgIH0sXG5cbiAgICB3aW5TY29yZSA6IGZ1bmN0aW9uKHNjb3JlKSB7XG4gICAgICAgIHRoaXMuYWdlbnRzRGVmLm15c2NvcmUgKz0gc2NvcmU7XG4gICAgICAgIHRoaXMuc2V0TXlTY29yZSh0aGlzLmFnZW50c0RlZi5teXNjb3JlKTtcbiAgICB9LFxuXG4gICAgc2V0V3hVc2VyIDogZnVuY3Rpb24odXNlckluZm8pIHtcbiAgICAgICAgdmFyIHVhcnIgPSB1c2VySW5mby5hdmF0YXJVcmwuc3BsaXQoXCIvXCIpO1xuICAgICAgICB2YXIgbGVuID0gdWFyci5sZW5ndGg7XG4gICAgICAgIHZhciB0cyA9IHVhcnJbbGVuLTJdO1xuICAgICAgICB2YXIgbDEgPSB0cy5zdWJzdHJpbmcoMCw2KTtcbiAgICAgICAgdmFyIGwyID0gdHMuc3Vic3RyaW5nKHRzLmxlbmd0aC02KTtcbiAgICAgICAgdGhpcy5uYW1lID0gbDErbDI7XG4gICAgICAgIHRoaXMubmljayA9IHVzZXJJbmZvLm5pY2tOYW1lO1xuICAgIH0sXG5cbiAgICAvL+iHquWumuS5ieeahOS4pOS4quWHveaVsOOAguWwhuWAvOS/neWtmOWcqHRoaXPlj5jph4/ph4xcbiAgICBzZXREYXRhIDogZnVuY3Rpb24oanNvbil7XG4gICAgICAgIHRoaXMuYWdlbnRzRGVmID0ganNvbjtcbiAgICB9LFxuXG4gICAgZ2V0TmFtZSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfSxcblxuICAgIGdldE5pY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5uaWNrO1xuICAgIH0sXG5cbiAgICBnZXREYXRhIDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdlbnRzRGVmOyAgXG4gICAgfSxcblxuICAgIHNldE15TGlzdCA6IGZ1bmN0aW9uKG15bGlzdCkge1xuICAgICAgICB0aGlzLmFnZW50c0RlZi5teUxpc3QgPSBteWxpc3Q7XG5cbiAgICAgICAgdGhpcy5odHRwUG9zdCh0aGlzLm5hbWUsXCJcIixcImxpc3RcIixteWxpc3QpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tc2V0TXlMaXN0LS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzZXRVcGdyYWRlIDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMuaXNVcGdyYWRlID0gZmFsc2U7ICAgICAgICAgICAgICAgIFxuICAgIH0sXG5cbiAgICBzZXRNeVNjb3JlIDogZnVuY3Rpb24oc2NvcmUpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5hZ2VudHNEZWYubXlzY29yZSA9IHNjb3JlO1xuXG4gICAgICAgIHRoaXMuaHR0cFBvc3QodGhpcy5uYW1lLFwiXCIsXCJzY29yZVwiLHNjb3JlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLXNldE15U2NvcmUtLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmKGRhdGEgPT0gXCJ1cGVkXCIpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5pc1VwZ3JhZGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pOyJdfQ==