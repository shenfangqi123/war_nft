"use strict";
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