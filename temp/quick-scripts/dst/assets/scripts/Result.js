
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Result.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ccd3eaVj6tLpIqIJfTIex3m', 'Result');
// scripts/Result.js

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
    win: 0,
    flagNum: 2,
    score: 0,
    boxType: 1
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.node.zIndex = 9999;
  },
  show: function show() {
    this.node.active = true;
    this.setTitle(); //this.setFlag();

    this.setScore(); //this.setBox();
  },
  setResultValue: function setResultValue(mainPlayer, data) {
    var gameDataNode = this.getPersistantNode();
    var agentsDef = gameDataNode.getData();
    var basescore = agentsDef.basescore;

    if (mainPlayer == 1) {
      if (data.win == 1) {
        console.log("my win");
        this.win = 1;
        this.flagNum = data.upk;
      } else if (data.win == 0) {
        console.log("my lose");
        this.win = 0;
        this.flagNum = data.upk;
      } else if (data.win == 2) {
        console.log("even");
        this.win = 2;
        this.flagNum = data.upk;
      }
    } else if (mainPlayer == 2) {
      if (data.win == 1) {
        console.log("my lose");
        this.win = 0;
        this.flagNum = data.dnk;
      } else if (data.win == 0) {
        console.log("my win");
        this.win = 1;
        this.flagNum = data.dnk;
      } else if (data.win == 2) {
        console.log("even");
        this.win = 2;
        this.flagNum = data.dnk;
      }
    }

    if (this.win == 1 || this.win == 2) {
      this.score = this.flagNum * basescore;
      gameDataNode.winScore(this.score);
    } else {
      gameDataNode.setUpgrade(false);
    }
  },
  getPersistantNode: function getPersistantNode(param) {
    var node = cc.find('GameData').getComponent('GameData');
    return node;
  },
  setTitle: function setTitle() {
    var titleNode = this.node.getChildByName("winnerTxt").getComponent("cc.Label");

    if (this.win == 1) {
      titleNode.string = "胜利！";
    } else if (this.win == 0) {
      titleNode.string = "失败！";
    } else if (this.win == 2) {
      titleNode.string = "平局！";
    }
  },
  setFlag: function setFlag() {
    var header = "flag";
    var flagName, flagNode;

    for (var i = 1; i <= 3; i++) {
      flagName = header + i;
      flagNode = this.node.getChildByName("killed").getChildByName(flagName);
      flagNode.active = false;

      if (i <= this.flagNum) {
        flagNode.active = true;
      }
    }
  },
  setScore: function setScore() {
    var scoreNode = this.node.getChildByName("goldStar").getChildByName("goldTxt").getComponent("cc.Label");
    scoreNode.string = "+" + this.score;
  },
  setBox: function setBox() {
    var boxNode = this.node.getChildByName("boxFrame").getChildByName("boxInfo").getComponent("cc.Label");

    if (this.boxType == 1) {
      boxNode.string = "普通宝箱";
    } else if (this.boxType == 2) {
      boxNode.string = "高级宝箱";
    } else if (this.boxType == 3) {
      boxNode.string = "超级宝箱";
    }
  },
  test: function test(event, customEventData) {
    console.log("clicked...");
    this.node.active = false;
    cc.director.loadScene('menu');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Jlc3VsdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIndpbiIsImZsYWdOdW0iLCJzY29yZSIsImJveFR5cGUiLCJzdGFydCIsIm5vZGUiLCJ6SW5kZXgiLCJzaG93IiwiYWN0aXZlIiwic2V0VGl0bGUiLCJzZXRTY29yZSIsInNldFJlc3VsdFZhbHVlIiwibWFpblBsYXllciIsImRhdGEiLCJnYW1lRGF0YU5vZGUiLCJnZXRQZXJzaXN0YW50Tm9kZSIsImFnZW50c0RlZiIsImdldERhdGEiLCJiYXNlc2NvcmUiLCJjb25zb2xlIiwibG9nIiwidXBrIiwiZG5rIiwid2luU2NvcmUiLCJzZXRVcGdyYWRlIiwicGFyYW0iLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwidGl0bGVOb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzdHJpbmciLCJzZXRGbGFnIiwiaGVhZGVyIiwiZmxhZ05hbWUiLCJmbGFnTm9kZSIsImkiLCJzY29yZU5vZGUiLCJzZXRCb3giLCJib3hOb2RlIiwidGVzdCIsImV2ZW50IiwiY3VzdG9tRXZlbnREYXRhIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxHQUFHLEVBQUMsQ0FESTtBQUVSQyxJQUFBQSxPQUFPLEVBQUMsQ0FGQTtBQUdSQyxJQUFBQSxLQUFLLEVBQUMsQ0FIRTtBQUlSQyxJQUFBQSxPQUFPLEVBQUM7QUFKQSxHQUhQO0FBVUw7QUFFQTtBQUVBQyxFQUFBQSxLQWRLLG1CQWNJO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0gsR0FoQkk7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SUFBQUEsU0FBUyxDQUFDTixNQUFWLEdBQW1CLE1BQU0sS0FBSzVCLEtBQTlCO0FBQ0gsR0E5R0k7QUFnSExtQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZixRQUFJQyxPQUFPLEdBQUcsS0FBS2pDLElBQUwsQ0FBVXdCLGNBQVYsQ0FBeUIsVUFBekIsRUFBcUNBLGNBQXJDLENBQW9ELFNBQXBELEVBQStERixZQUEvRCxDQUE0RSxVQUE1RSxDQUFkOztBQUNBLFFBQUcsS0FBS3hCLE9BQUwsSUFBZ0IsQ0FBbkIsRUFBc0I7QUFDbEJtQyxNQUFBQSxPQUFPLENBQUNSLE1BQVIsR0FBaUIsTUFBakI7QUFDSCxLQUZELE1BR0ssSUFBRyxLQUFLM0IsT0FBTCxJQUFnQixDQUFuQixFQUFzQjtBQUN2Qm1DLE1BQUFBLE9BQU8sQ0FBQ1IsTUFBUixHQUFpQixNQUFqQjtBQUNILEtBRkksTUFHQSxJQUFHLEtBQUszQixPQUFMLElBQWdCLENBQW5CLEVBQXNCO0FBQ3ZCbUMsTUFBQUEsT0FBTyxDQUFDUixNQUFSLEdBQWlCLE1BQWpCO0FBQ0g7QUFDSixHQTNISTtBQTZITFMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLEtBQVYsRUFBaUJDLGVBQWpCLEVBQWtDO0FBQ3BDdEIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUNBLFNBQUtmLElBQUwsQ0FBVUcsTUFBVixHQUFtQixLQUFuQjtBQUNBWixJQUFBQSxFQUFFLENBQUM4QyxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDSCxHQWpJSSxDQWtJTDs7QUFsSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgd2luOjAsXG4gICAgICAgIGZsYWdOdW06MixcbiAgICAgICAgc2NvcmU6MCxcbiAgICAgICAgYm94VHlwZToxLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRUaXRsZSgpO1xuICAgICAgICAvL3RoaXMuc2V0RmxhZygpO1xuICAgICAgICB0aGlzLnNldFNjb3JlKCk7XG4gICAgICAgIC8vdGhpcy5zZXRCb3goKTtcbiAgICB9LFxuXG4gICAgc2V0UmVzdWx0VmFsdWU6IGZ1bmN0aW9uKG1haW5QbGF5ZXIsIGRhdGEpIHtcbiAgICAgICAgdmFyIGdhbWVEYXRhTm9kZSA9IHRoaXMuZ2V0UGVyc2lzdGFudE5vZGUoKTtcbiAgICAgICAgdmFyIGFnZW50c0RlZiA9IGdhbWVEYXRhTm9kZS5nZXREYXRhKCk7XG4gICAgICAgIHZhciBiYXNlc2NvcmUgPSBhZ2VudHNEZWYuYmFzZXNjb3JlO1xuXG4gICAgICAgIGlmKG1haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgaWYoZGF0YS53aW4gPT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibXkgd2luXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMud2luID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdOdW0gPSBkYXRhLnVwaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZGF0YS53aW4gPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibXkgbG9zZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLndpbiA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnTnVtID0gZGF0YS51cGs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGRhdGEud2luID09IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy53aW4gPSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuZmxhZ051bSA9IGRhdGEudXBrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobWFpblBsYXllciA9PSAyKSB7XG4gICAgICAgICAgICBpZihkYXRhLndpbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJteSBsb3NlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMud2luID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdOdW0gPSBkYXRhLmRuaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZGF0YS53aW4gPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibXkgd2luXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMud2luID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdOdW0gPSBkYXRhLmRuaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZGF0YS53aW4gPT0gMikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXZlblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLndpbiA9IDI7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnTnVtID0gZGF0YS5kbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLndpbj09MSB8fCB0aGlzLndpbj09Mikge1xuICAgICAgICAgICAgdGhpcy5zY29yZSA9IHRoaXMuZmxhZ051bSpiYXNlc2NvcmU7XG4gICAgICAgICAgICBnYW1lRGF0YU5vZGUud2luU2NvcmUodGhpcy5zY29yZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lRGF0YU5vZGUuc2V0VXBncmFkZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0UGVyc2lzdGFudE5vZGU6IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuZmluZCgnR2FtZURhdGEnKS5nZXRDb21wb25lbnQoJ0dhbWVEYXRhJyk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICBzZXRUaXRsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0aXRsZU5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5uZXJUeHRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIGlmKHRoaXMud2luID09IDEpIHtcbiAgICAgICAgICAgIHRpdGxlTm9kZS5zdHJpbmcgPSBcIuiDnOWIqe+8gVwiO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHRoaXMud2luID09IDApe1xuICAgICAgICAgICAgdGl0bGVOb2RlLnN0cmluZyA9IFwi5aSx6LSl77yBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLndpbiA9PSAyKXtcbiAgICAgICAgICAgIHRpdGxlTm9kZS5zdHJpbmcgPSBcIuW5s+WxgO+8gVwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEZsYWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGVhZGVyID0gXCJmbGFnXCI7XG4gICAgICAgIHZhciBmbGFnTmFtZSwgZmxhZ05vZGU7XG5cbiAgICAgICAgZm9yKHZhciBpPTE7aTw9MztpKyspIHtcbiAgICAgICAgICAgIGZsYWdOYW1lID0gaGVhZGVyICsgaTtcbiAgICAgICAgICAgIGZsYWdOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwia2lsbGVkXCIpLmdldENoaWxkQnlOYW1lKGZsYWdOYW1lKTtcbiAgICAgICAgICAgIGZsYWdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZihpIDw9IHRoaXMuZmxhZ051bSkge1xuICAgICAgICAgICAgICAgIGZsYWdOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U2NvcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2NvcmVOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ29sZFN0YXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkVHh0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICBzY29yZU5vZGUuc3RyaW5nID0gXCIrXCIgKyB0aGlzLnNjb3JlO1xuICAgIH0sXG5cbiAgICBzZXRCb3g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm94Tm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJveEZyYW1lXCIpLmdldENoaWxkQnlOYW1lKFwiYm94SW5mb1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgaWYodGhpcy5ib3hUeXBlID09IDEpIHtcbiAgICAgICAgICAgIGJveE5vZGUuc3RyaW5nID0gXCLmma7pgJrlrp3nrrFcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuYm94VHlwZSA9PSAyKSB7XG4gICAgICAgICAgICBib3hOb2RlLnN0cmluZyA9IFwi6auY57qn5a6d566xXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmJveFR5cGUgPT0gMykge1xuICAgICAgICAgICAgYm94Tm9kZS5zdHJpbmcgPSBcIui2hee6p+WuneeusVwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRlc3Q6IGZ1bmN0aW9uIChldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZC4uLlwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ21lbnUnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==