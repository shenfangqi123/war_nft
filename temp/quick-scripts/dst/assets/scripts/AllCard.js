
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/AllCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FsbENhcmQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWxlUm9sZSIsIm1hZ2ljQ29zdCIsImxldmVsIiwiZGlzcCIsIm9uTG9hZCIsInN0YXJ0IiwiaXNNb3ZpbmciLCJzZWxlSW5uZXJJZCIsInNldEluaXRJbWdCeVJvbGUiLCJzZXRSb2xlQ29zdCIsInNldFJvbGVEaXNwIiwic2V0Q2FyZFN0YXR1cyIsImZsYWciLCJidXQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJoaWRlYnV0IiwibGIiLCJsYndvcmQiLCJnZXRDb21wb25lbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJncmV5IiwiYnV0Tm9kZSIsIm9wYWNpdHkiLCJ1c2VyQnV0Q2xpY2siLCJsYXlvdXQiLCJwYXJlbnQiLCJzZWxlT25lQ2FyZCIsInNldFJvbGUiLCJyb2xlIiwiY29zdCIsImdldExheW91dE5vZGUiLCJtYXJrIiwiY29zdExhYmVsIiwic3RyaW5nIiwiYnV0TGFiZWwiLCJzZXRTZWxJbWciLCJmcmFtZUltZyIsImljb25Ob2RlIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJhY3RpdmUiLCJTcHJpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUUsS0FERjtBQUVSQyxJQUFBQSxTQUFTLEVBQUUsQ0FGSDtBQUdSQyxJQUFBQSxLQUFLLEVBQUMsQ0FIRTtBQUlSQyxJQUFBQSxJQUFJLEVBQUM7QUFKRyxHQUhQO0FBVUw7QUFFQUMsRUFBQUEsTUFaSyxvQkFZSyxDQUNULENB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QUdBLElBQUcsS0FBS3JDLFFBQUwsSUFBaUIsTUFBcEIsRUFBNEI7QUFDN0IsZUFBS3FDLFNBQUwsQ0FBZSxnQkFBZjtBQUNILFNBRkksTUFHQSxJQUFHLEtBQUtyQyxRQUFMLElBQWlCLEtBQXBCLEVBQTJCO0FBQzVCLGVBQUtxQyxTQUFMLENBQWUsZUFBZjtBQUNILFNBRkksTUFHQSxJQUFHLEtBQUtyQyxRQUFMLElBQWlCLEtBQXBCLEVBQTJCO0FBQzVCLGVBQUtxQyxTQUFMLENBQWUsZUFBZjtBQUNILFNBRkksQ0FHTDtBQUhLLGFBSUEsSUFBRyxLQUFLckMsUUFBTCxJQUFpQixJQUFwQixFQUEwQjtBQUMzQixpQkFBS3FDLFNBQUwsQ0FBZSxnQkFBZjtBQUNILFdBRkksQ0FHTDtBQUhLLGVBSUEsSUFBRyxLQUFLckMsUUFBTCxJQUFpQixJQUFwQixFQUEwQjtBQUMzQixtQkFBS3FDLFNBQUwsQ0FBZSxvQkFBZjtBQUNILGFBRkksQ0FHTDtBQUhLLGlCQUlBLElBQUcsS0FBS3JDLFFBQUwsSUFBaUIsSUFBcEIsRUFBMEI7QUFDM0IscUJBQUtxQyxTQUFMLENBQWUsaUJBQWY7QUFDSCxlQUZJLENBR0w7QUFISyxtQkFJQSxJQUFHLEtBQUtyQyxRQUFMLElBQWlCLElBQXBCLEVBQTBCO0FBQzNCLHVCQUFLcUMsU0FBTCxDQUFlLG1CQUFmO0FBQ0g7QUFDSixHQXBJSSxDQXNJTDs7QUF0SUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2VsZVJvbGU6IFwic2tlXCIsXG4gICAgICAgIG1hZ2ljQ29zdDogMSxcbiAgICAgICAgbGV2ZWw6MSxcbiAgICAgICAgZGlzcDpcIlwiLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVJbm5lcklkID0gXCJcIjtcbiAgICAgICAgdGhpcy5zZXRJbml0SW1nQnlSb2xlKCk7XG4gICAgICAgIHRoaXMuc2V0Um9sZUNvc3QoKTtcbiAgICAgICAgdGhpcy5zZXRSb2xlRGlzcCgpO1xuICAgICAgICAvL3RoaXMuZ3JleSh0cnVlKTtcbiAgICB9LFxuXG4gICAgc2V0Q2FyZFN0YXR1czogZnVuY3Rpb24oZmxhZykge1xuICAgICAgICB2YXIgYnV0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXNlQnV0dG9uXCIpO1xuICAgICAgICB2YXIgaGlkZWJ1dCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNsaWNrXCIpO1xuICAgICAgICB2YXIgbGIgPSBidXQuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNwXCIpO1xuICAgICAgICB2YXIgbGJ3b3JkID0gbGIuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIilcblxuICAgICAgICAvLyBpbiB1c2VkXG4gICAgICAgIGlmKGZsYWcpIHtcbiAgICAgICAgICAgIGJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGhpZGVidXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAvL2xid29yZC5zdHJpbmcgPSBcIuW3suS9v+eUqFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnV0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICBoaWRlYnV0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAvL2xid29yZC5zdHJpbmcgPSBcIuS9v+eUqFwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdyZXk6IGZ1bmN0aW9uKGZsYWcpIHtcbiAgICAgICAgdmFyIGJ1dE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VCdXR0b25cIik7XG4gICAgICAgIGlmKGZsYWcpIHtcbiAgICAgICAgICAgIC8vYnV0Tm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9idXROb2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1c2VyQnV0Q2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGF5b3V0ID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJTZWxMYXlvdXRcIik7XG4gICAgICAgIGxheW91dC5zZWxlT25lQ2FyZCh0aGlzLnNlbGVSb2xlKTtcbiAgICB9LFxuXG4gICAgc2V0Um9sZTogZnVuY3Rpb24ocm9sZSwgY29zdCwgZGlzcCkge1xuICAgICAgICB0aGlzLnNlbGVSb2xlID0gcm9sZTtcbiAgICAgICAgdGhpcy5tYWdpY0Nvc3QgPSBjb3N0O1xuICAgICAgICB0aGlzLmRpc3AgPSBkaXNwO1xuICAgIH0sXG5cbiAgICBnZXRMYXlvdXROb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsYXlvdXRcIik7XG4gICAgfSxcblxuICAgIHNldFJvbGVDb3N0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hcmsgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyaW5nTWFya1wiKTtcbiAgICAgICAgdmFyIGNvc3RMYWJlbCA9IG1hcmsuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0XCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICBjb3N0TGFiZWwuc3RyaW5nID0gdGhpcy5tYWdpY0Nvc3Q7XG4gICAgfSxcblxuICAgIHNldFJvbGVEaXNwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJ1dExhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXNlQnV0dG9uXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzcFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgYnV0TGFiZWwuc3RyaW5nID0gdGhpcy5kaXNwO1xuICAgIH0sXG5cbiAgICBzZXRTZWxJbWc6IGZ1bmN0aW9uKGZyYW1lSW1nKSB7XG4gICAgICAgIHZhciBpY29uTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIik7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGZyYW1lSW1nLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIC8vaWNvbk5vZGUud2lkdGggPSAxMDA7XG4gICAgICAgICAgICAvL2ljb25Ob2RlLmhlaWdodCA9IDEyMDtcbiAgICAgICAgICAgIGljb25Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBpY29uTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2V0SW5pdEltZ0J5Um9sZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmcmFtZUltZyA9IFwiXCI7XG5cbiAgICAgICAgaWYodGhpcy5zZWxlUm9sZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbEltZyhcInNlbF9jYXJkcy9za2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy9saWVyZW5cbiAgICAgICAgZWxzZSBpZih0aGlzLnNlbGVSb2xlID09IFwibHJcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxJbWcoXCJzZWxfY2FyZHMvbGllcmVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vcm9ja21hblxuICAgICAgICBlbHNlIGlmKHRoaXMuc2VsZVJvbGUgPT0gXCJnaVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbEltZyhcInNlbF9jYXJkcy9yb2NrbWFuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5zZWxlUm9sZSA9PSBcImxvZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbEltZyhcInNlbF9jYXJkcy9sb2dcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnNlbGVSb2xlID09IFwiYm9tYlwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbEltZyhcInNlbF9jYXJkcy9ib21iXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5zZWxlUm9sZSA9PSBcImJlZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbEltZyhcInNlbF9jYXJkcy9iZWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnNlbGVSb2xlID09IFwid2l6XCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsSW1nKFwic2VsX2NhcmRzL3dpelwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL2hlcm9cbiAgICAgICAgZWxzZSBpZih0aGlzLnNlbGVSb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxJbWcoXCJzZWxfY2FyZHMvaGVyb1wiKTtcbiAgICAgICAgfVxuICAgICAgICAvL2xpZ2h0IG1hblxuICAgICAgICBlbHNlIGlmKHRoaXMuc2VsZVJvbGUgPT0gXCJsbVwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbEltZyhcInNlbF9jYXJkcy9saWdodG1hblwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL2hlcm9cbiAgICAgICAgZWxzZSBpZih0aGlzLnNlbGVSb2xlID09IFwiZmFcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxJbWcoXCJzZWxfY2FyZHMvZm9ydEFcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy9oZXJvXG4gICAgICAgIGVsc2UgaWYodGhpcy5zZWxlUm9sZSA9PSBcImlyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsSW1nKFwic2VsX2NhcmRzL2lyb25tYW5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19