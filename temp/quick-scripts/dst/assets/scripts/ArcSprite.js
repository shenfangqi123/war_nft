
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ArcSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58c5bfG9UVBHrbtlPel5W/y', 'ArcSprite');
// scripts/ArcSprite.js

"use strict";

var mySprite = require("MySprite");

var common = require("Common");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "lr",
    aniType: "frame"
  },
  start: function start() {
    this._animation = this.getComponent(cc.Animation);
    this._animation.WrapMode = cc.WrapMode.Loop;

    if (this.layoutOp == null) {
      //if archer stand up on the base.
      this.layoutOp = this.node.parent.parent.getComponent("Game");
    }
  },
  remove: function remove() {
    this._animation.play("dieoff2");

    this.shadow.destroy();
    this.blood.destroy();
  },
  dieStart: function dieStart() {
    console.log("die start");
  },
  dieEnd: function dieEnd() {
    console.log("die end");

    this._animation.play("footprint");
  },
  //ske clip ske_bomb, foot print start evt
  footStart: function footStart() {
    console.log("foot start");
  },
  footEnd: function footEnd() {
    console.log("foot end");
    this.node.destroy();
  },
  //ske clip ske_bomb, foot print start evt
  footPrint: function footPrint() {
    this.node.zIndex = -1;
    this.node.scaleX = 1;
    this.node.scaleY = 1;
  },
  //ske clip ske_bomb, called by first frame of ske_bomb
  beforeKill: function beforeKill() {//this.shadow.destroy();
  },
  //ske clip ske_bomb, called by last frame of ske_bomb
  afterKill: function afterKill() {
    console.log("--remove archer node--");
    this.node.destroy();
  },
  frame1Evt: function frame1Evt() {
    this.dispShadow(1);
  },
  frame2Evt: function frame2Evt() {
    this.dispShadow(2);
  },
  frame3Evt: function frame3Evt() {
    this.dispShadow(3);
  },
  frame4Evt: function frame4Evt() {
    this.dispShadow(4);
  },
  frame5Evt: function frame5Evt() {
    this.dispShadow(5);
  },
  frame6Evt: function frame6Evt() {
    this.dispShadow(6);
  },
  frame7Evt: function frame7Evt() {
    this.dispShadow(7);
  },
  aFrame1Evt: function aFrame1Evt() {
    this.layoutOp.playSnd("lr");
  },
  aFrame2Evt: function aFrame2Evt() {},
  aFrame3Evt: function aFrame3Evt() {},
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {},
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationRemote(agent, agentFuture, isMainPlayer);
  },
  isEnemyBase: function isEnemyBase(baseId) {
    if (baseId == 1 || baseId == 2 || baseId == 3) {
      return true;
    } else {
      return false;
    }
  },
  isEnemyFort: function isEnemyFort(isAgentHero, mainPlayer) {
    if (isAgentHero && mainPlayer == 2) {
      return true;
    }

    if (!isAgentHero && mainPlayer == 1) {
      return true;
    }

    return false;
  },
  playBaseWarriorAnimationDefault: function playBaseWarriorAnimationDefault(actType, baseId) {
    var actName;

    if (this.isEnemyBase(baseId)) {
      actName = "lr_s_walk";
    } else {
      actName = "lr_n_walk";
    }

    if (actType == "move" && this.lastAct == actName) {
      return;
    }

    var randomTime = Math.ceil(Math.random() * 125) / 100;

    this._animation.play(actName, randomTime);

    this.lastAct = actName;
  },
  playFortWarriorAnimationDefault: function playFortWarriorAnimationDefault(actType, isAgentHero, mainPlayer) {
    var actName;

    if (this.isEnemyFort(isAgentHero, mainPlayer)) {
      actName = "lr_s_walk";
    } else {
      actName = "lr_n_walk";
    }

    if (actType == "move" && this.lastAct == actName) {
      return;
    }

    var randomTime = Math.ceil(Math.random() * 125) / 100;

    this._animation.play(actName, randomTime);

    this.lastAct = actName;
  },
  playBaseWarriorAnimation: function playBaseWarriorAnimation(agent, isMainPlayer, actType) {
    var fx, fy;
    var targetYOffset = common.attackTargetYOffset;
    var ex, ey;
    var angle;
    var x = agent.mypos.x;
    var y = agent.mypos.y;
    var startPos, targetPos, startEPos, targetEPos, vt, vtE;
    var randomTime = Math.ceil(Math.random() * 125) / 100;
    var actName = "";
    var then;
    var angleInfo; // user to control the up and down user Y postion offset.

    var offsetDir = 1;

    if (isMainPlayer == 1) {
      offsetDir = 1;
    } else if (isMainPlayer == 2) {
      offsetDir = -1;
    }

    ex = agent.enemypos.x;
    ey = agent.enemypos.y; // dir according to enemy position

    startPos = cc.v2(x * 30, y * 30);
    targetPos = cc.v2(ex * 30, ey * 30 + targetYOffset * offsetDir);
    vt = startPos.sub(targetPos);

    if (vt.x == 0 && vt.y == 0) {
      return;
    } //if dir no changed, vt.x or vt.y is 0, atan value should be invaild


    if (vt.x == 0) {
      vt.x = 0.1;
    }

    if (vt.y == 0) {
      vt.y = 0.1;
    } //if postion not changed, do nothing, or the math.atan will do error.


    if (vt.x != 0 && vt.y != 0) {
      var ag = 180 / Math.PI * Math.atan(vt.x / vt.y);
      angle = ag;

      if (vt.y >= 0) {
        //when down to up
        angle = ag + 180;
      }
    }

    if (this._animation) {
      angleInfo = this.getActnameByAngle(angle, actType);
      actName = angleInfo.actName; //used to mirror a sprite.

      this.node.scaleX = angleInfo.scaleX; //if already in attack mode, just skip the animation

      if (this.lastAct != actName || actType == "sa") {
        if (actType == "sa") {
          this._animation.stop();

          this._animation.play(actName);
        } else {
          //walking action.
          this._animation.play(actName, randomTime);
        }

        this.angle = angle;
        this.lastAct = actName;
        this.lastScaleX = angleInfo.scaleX;
      }
    }
  }
  /*
      shootArrow: function() {
          this.shootAgent();    
      },  
  
      shootAgent:function() {
          var ex, ey;
          var x = this.ox;
          var y = this.oy;
          var arrow = this.arrow;
          var enemies = this.killedEnemies;
          var targetYOffset = common.attackTargetYOffset;
  
          var startPos = cc.v2(x*30+15, y*30+15);
  
          //var ex = this.ex*30;
          //var ey = this.ey*30 + targetYOffset;
  
          if(this.enemy && this.enemy._name !== "" && this.enemy.x && this.enemy.y) {
              ex = this.enemy.x;
              ey = this.enemy.y;
          } else {
              ex = this.ex * 30;
              ey = this.ey *30 + targetYOffset;             
          }
  
  
          var targetPos = cc.v2(ex, ey);
          var agentNode, enemy;
  
          if(targetPos.x == 0 && targetPos.y == 0) return;
  
          var vt = targetPos.sub(startPos);
          var ag = 180/Math.PI * Math.atan(vt.x/vt.y);
  
          arrow.active = true;
          arrow.setRotation(ag+180);
          arrow.setPosition(startPos);
  
          var callback = cc.callFunc(function () {
              arrow.active = false;
          });
  
          arrow.runAction(cc.sequence(cc.moveTo(0.2, targetPos), callback)); 
      },
  
      shootBase:function(x, y, enemy, arrow) {
          var x = this.ox;
          var y = this.oy; 
          var enemy = this.enemy; 
          var arrow = this.arrow;
  
          var startPos = cc.v2(x*30+15, y*30+15);
          var ex = enemy.mypos.x;
          var ey = enemy.mypos.y;
          var blink = cc.blink(0.05,1);
  
          var targetPos = cc.v2(ex*30+15, ey*30+15);
          var agentNode;
          if(!enemy) {
              return;
          }
  
          if(targetPos.x == 0 && targetPos.y == 0) return;
  
          var vt = targetPos.sub(startPos);
          var ag = 180/Math.PI * Math.atan(vt.x/vt.y);
  
          arrow.active = true;
          arrow.setRotation(ag+180);
          arrow.setPosition(startPos);
  
          var callback = cc.callFunc(function () {
              enemy.baseObj.runAction(blink);
              arrow.active = false;
          });
  
          arrow.runAction(cc.sequence(cc.moveTo(0.2, targetPos), callback)); 
      },
  */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FyY1Nwcml0ZS5qcyJdLCJuYW1lcyI6WyJteVNwcml0ZSIsInJlcXVpcmUiLCJjb21tb24iLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJvbGUiLCJhbmlUeXBlIiwic3RhcnQiLCJfYW5pbWF0aW9uIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwiV3JhcE1vZGUiLCJMb29wIiwibGF5b3V0T3AiLCJub2RlIiwicGFyZW50IiwicmVtb3ZlIiwicGxheSIsInNoYWRvdyIsImRlc3Ryb3kiLCJibG9vZCIsImRpZVN0YXJ0IiwiY29uc29sZSIsImxvZyIsImRpZUVuZCIsImZvb3RTdGFydCIsImZvb3RFbmQiLCJmb290UHJpbnQiLCJ6SW5kZXgiLCJzY2FsZVgiLCJzY2FsZVkiLCJiZWZvcmVLaWxsIiwiYWZ0ZXJLaWxsIiwiZnJhbWUxRXZ0IiwiZGlzcFNoYWRvdyIsImZyYW1lMkV2dCIsImZyYW1lM0V2dCIsImZyYW1lNEV2dCIsImZyYW1lNUV2dCIsImZyYW1lNkV2dCIsImZyYW1lN0V2dCIsImFGcmFtZTFFdnQiLCJwbGF5U25kIiwiYUZyYW1lMkV2dCIsImFGcmFtZTNFdnQiLCJhRnJhbWU0RXZ0IiwiYUZyYW1lNUV2dCIsInBsYXlBbmkiLCJhZ2VudCIsImFnZW50RnV0dXJlIiwiaXNNYWluUGxheWVyIiwicGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlIiwiaXNFbmVteUJhc2UiLCJiYXNlSWQiLCJpc0VuZW15Rm9ydCIsImlzQWdlbnRIZXJvIiwibWFpblBsYXllciIsInBsYXlCYXNlV2FycmlvckFuaW1hdGlvbkRlZmF1bHQiLCJhY3RUeXBlIiwiYWN0TmFtZSIsImxhc3RBY3QiLCJyYW5kb21UaW1lIiwiTWF0aCIsImNlaWwiLCJyYW5kb20iLCJwbGF5Rm9ydFdhcnJpb3JBbmltYXRpb25EZWZhdWx0IiwicGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uIiwiZngiLCJmeSIsInRhcmdldFlPZmZzZXQiLCJhdHRhY2tUYXJnZXRZT2Zmc2V0IiwiZXgiLCJleSIsImFuZ2xlIiwieCIsIm15cG9zIiwieSIsInN0YXJ0UG9zIiwidGFyZ2V0UG9zIiwic3RhcnRFUG9zIiwidGFyZ2V0RVBvcyIsInZ0IiwidnRFIiwidGhlbiIsImFuZ2xlSW5mbyIsIm9mZnNldERpciIsImVuZW15cG9zIiwidjIiLCJzdWIiLCJhZyIsIlBJIiwiYXRhbiIsImdldEFjdG5hbWVCeUFuZ2xlIiwic3RvcCIsImxhc3RTY2FsZVgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNKLFFBREo7QUFHTEssRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQyxJQURHO0FBRVJDLElBQUFBLE9BQU8sRUFBQztBQUZBLEdBSFA7QUFRTEMsRUFBQUEsS0FSSyxtQkFRSTtBQUNMLFNBQUtDLFVBQUwsR0FBa0IsS0FBS0MsWUFBTCxDQUFrQlAsRUFBRSxDQUFDUSxTQUFyQixDQUFsQjtBQUNBLFNBQUtGLFVBQUwsQ0FBZ0JHLFFBQWhCLEdBQTJCVCxFQUFFLENBQUNTLFFBQUgsQ0FBWUMsSUFBdkM7O0FBQ0EsUUFBRyxLQUFLQyxRQUFMLElBQWlCLElBQXBCLEVBQTBCO0FBQUc7QUFDekIsV0FBS0EsUUFBTCxHQUFnQixLQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJBLE1BQWpCLENBQXdCTixZQUF4QixDQUFxQyxNQUFyQyxDQUFoQjtBQUNIO0FBQ0osR0FkSTtBQWdCTE8sRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2YsU0FBS1IsVUFBTCxDQUFnQlMsSUFBaEIsQ0FBcUIsU0FBckI7O0FBQ0EsU0FBS0MsTUFBTCxDQUFZQyxPQUFaO0FBQ0EsU0FBS0MsS0FBTCxDQUFXRCxPQUFYO0FBQ0gsR0FwQkk7QUFzQkxF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QSxVQUFHUixFQUFFLENBQUNMLENBQUgsSUFBUSxDQUFYLEVBQWM7QUFDVjtBQUNBSCxRQUFBQSxLQUFLLEdBQUdnQixFQUFFLEdBQUcsR0FBYjtBQUNIO0FBQ0o7O0FBRUQsUUFBRyxLQUFLakYsVUFBUixFQUFvQjtBQUNoQjRFLE1BQUFBLFNBQVMsR0FBRyxLQUFLUSxpQkFBTCxDQUF1Qm5CLEtBQXZCLEVBQThCZixPQUE5QixDQUFaO0FBQ0FDLE1BQUFBLE9BQU8sR0FBR3lCLFNBQVMsQ0FBQ3pCLE9BQXBCLENBRmdCLENBSWhCOztBQUNBLFdBQUs3QyxJQUFMLENBQVVlLE1BQVYsR0FBbUJ1RCxTQUFTLENBQUN2RCxNQUE3QixDQUxnQixDQU9oQjs7QUFDQSxVQUFHLEtBQUsrQixPQUFMLElBQWdCRCxPQUFoQixJQUEyQkQsT0FBTyxJQUFJLElBQXpDLEVBQStDO0FBQzNDLFlBQUdBLE9BQU8sSUFBSSxJQUFkLEVBQW9CO0FBQ2hCLGVBQUtsRCxVQUFMLENBQWdCcUYsSUFBaEI7O0FBQ0EsZUFBS3JGLFVBQUwsQ0FBZ0JTLElBQWhCLENBQXFCMEMsT0FBckI7QUFDSCxTQUhELE1BR087QUFDSDtBQUNBLGVBQUtuRCxVQUFMLENBQWdCUyxJQUFoQixDQUFxQjBDLE9BQXJCLEVBQThCRSxVQUE5QjtBQUNIOztBQUNELGFBQUtZLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtiLE9BQUwsR0FBZUQsT0FBZjtBQUNBLGFBQUttQyxVQUFMLEdBQWtCVixTQUFTLENBQUN2RCxNQUE1QjtBQUNIO0FBQ0o7QUFFSjtBQUVMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFqUFMsQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15U3ByaXRlID0gcmVxdWlyZShcIk15U3ByaXRlXCIpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBteVNwcml0ZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZTpcImxyXCIsXG4gICAgICAgIGFuaVR5cGU6XCJmcmFtZVwiLFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5XcmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0T3AgPT0gbnVsbCkgeyAgLy9pZiBhcmNoZXIgc3RhbmQgdXAgb24gdGhlIGJhc2UuXG4gICAgICAgICAgICB0aGlzLmxheW91dE9wID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImRpZW9mZjJcIik7XG4gICAgICAgIHRoaXMuc2hhZG93LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ibG9vZC5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGRpZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWUgc3RhcnRcIik7XG4gICAgfSxcblxuICAgIGRpZUVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGllIGVuZFwiKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJmb290cHJpbnRcIik7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGZvb3QgcHJpbnQgc3RhcnQgZXZ0XG4gICAgZm9vdFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb290IHN0YXJ0XCIpO1xuICAgIH0sXG5cbiAgICBmb290RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb290IGVuZFwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgZm9vdCBwcmludCBzdGFydCBldnRcbiAgICBmb290UHJpbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gMTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgY2FsbGVkIGJ5IGZpcnN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYmVmb3JlS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgbGFzdCBmcmFtZSBvZiBza2VfYm9tYlxuICAgIGFmdGVyS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS1yZW1vdmUgYXJjaGVyIG5vZGUtLVwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDEpO1xuICAgIH0sXG5cbiAgICBmcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgfSxcblxuICAgIGZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgZnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBmcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNSk7XG4gICAgfSxcblxuICAgIGZyYW1lNkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg2KTtcbiAgICB9LFxuXG4gICAgZnJhbWU3RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgIH0sXG5cblxuICAgIGFGcmFtZTFFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wLnBsYXlTbmQoXCJsclwiKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTNFdnQ6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBhRnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgYUZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIHBsYXlBbmk6IGZ1bmN0aW9uKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKTtcbiAgICB9LFxuXG4gICAgaXNFbmVteUJhc2U6IGZ1bmN0aW9uKGJhc2VJZCkge1xuICAgICAgICBpZihiYXNlSWQgPT0gMSB8fCBiYXNlSWQgPT0gMiB8fCBiYXNlSWQgPT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNFbmVteUZvcnQ6IGZ1bmN0aW9uKGlzQWdlbnRIZXJvLCBtYWluUGxheWVyKSB7XG4gICAgICAgIGlmKGlzQWdlbnRIZXJvICYmIG1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpc0FnZW50SGVybyAmJiBtYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHBsYXlCYXNlV2FycmlvckFuaW1hdGlvbkRlZmF1bHQ6IGZ1bmN0aW9uKGFjdFR5cGUsIGJhc2VJZCkge1xuICAgICAgICB2YXIgYWN0TmFtZTtcblxuICAgICAgICBpZih0aGlzLmlzRW5lbXlCYXNlKGJhc2VJZCkpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX3Nfd2Fsa1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0TmFtZSA9IFwibHJfbl93YWxrXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiICYmIHRoaXMubGFzdEFjdCA9PSBhY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgcGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdDogZnVuY3Rpb24oYWN0VHlwZSwgaXNBZ2VudEhlcm8sIG1haW5QbGF5ZXIpIHtcbiAgICAgICAgdmFyIGFjdE5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5pc0VuZW15Rm9ydChpc0FnZW50SGVybywgbWFpblBsYXllcikpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX3Nfd2Fsa1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0TmFtZSA9IFwibHJfbl93YWxrXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiICYmIHRoaXMubGFzdEFjdCA9PSBhY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgcGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uOiBmdW5jdGlvbihhZ2VudCwgaXNNYWluUGxheWVyLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBmeCxmeTtcbiAgICAgICAgdmFyIHRhcmdldFlPZmZzZXQgPSBjb21tb24uYXR0YWNrVGFyZ2V0WU9mZnNldDtcbiAgICAgICAgdmFyIGV4LCBleTtcbiAgICAgICAgdmFyIGFuZ2xlO1xuICAgICAgICB2YXIgeCA9IGFnZW50Lm15cG9zLng7IFxuICAgICAgICB2YXIgeSA9IGFnZW50Lm15cG9zLnk7IFxuXG4gICAgICAgIHZhciBzdGFydFBvcyx0YXJnZXRQb3Msc3RhcnRFUG9zLCB0YXJnZXRFUG9zLCB2dCwgdnRFO1xuXG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIHRoZW47XG4gICAgICAgIHZhciBhbmdsZUluZm87XG5cbiAgICAgICAgLy8gdXNlciB0byBjb250cm9sIHRoZSB1cCBhbmQgZG93biB1c2VyIFkgcG9zdGlvbiBvZmZzZXQuXG4gICAgICAgIHZhciBvZmZzZXREaXIgPSAxO1xuXG4gICAgICAgIGlmKGlzTWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICBvZmZzZXREaXIgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoaXNNYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgIG9mZnNldERpciA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZXggPSBhZ2VudC5lbmVteXBvcy54OyBcbiAgICAgICAgZXkgPSBhZ2VudC5lbmVteXBvcy55OyBcblxuICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGV4KSozMCwgKGV5KSozMCt0YXJnZXRZT2Zmc2V0Km9mZnNldERpcik7XG4gICAgICAgIHZ0ID0gc3RhcnRQb3Muc3ViKHRhcmdldFBvcyk7XG5cbiAgICAgICAgaWYodnQueCA9PSAwICYmIHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICB9XG4gICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgcG9zdGlvbiBub3QgY2hhbmdlZCwgZG8gbm90aGluZywgb3IgdGhlIG1hdGguYXRhbiB3aWxsIGRvIGVycm9yLlxuICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICB2YXIgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbih2dC54L3Z0LnkpO1xuICAgICAgICAgICAgYW5nbGUgPSBhZztcbiAgICAgICAgICAgIGlmKHZ0LnkgPj0gMCkge1xuICAgICAgICAgICAgICAgIC8vd2hlbiBkb3duIHRvIHVwXG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhZyArIDE4MDtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcblxuICAgICAgICAgICAgLy91c2VkIHRvIG1pcnJvciBhIHNwcml0ZS5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSB8fCBhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2Fsa2luZyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4vKlxuICAgIHNob290QXJyb3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNob290QWdlbnQoKTsgICAgXG4gICAgfSwgIFxuXG4gICAgc2hvb3RBZ2VudDpmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV4LCBleTtcbiAgICAgICAgdmFyIHggPSB0aGlzLm94O1xuICAgICAgICB2YXIgeSA9IHRoaXMub3k7XG4gICAgICAgIHZhciBhcnJvdyA9IHRoaXMuYXJyb3c7XG4gICAgICAgIHZhciBlbmVtaWVzID0gdGhpcy5raWxsZWRFbmVtaWVzO1xuICAgICAgICB2YXIgdGFyZ2V0WU9mZnNldCA9IGNvbW1vbi5hdHRhY2tUYXJnZXRZT2Zmc2V0O1xuXG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNjLnYyKHgqMzArMTUsIHkqMzArMTUpO1xuXG4gICAgICAgIC8vdmFyIGV4ID0gdGhpcy5leCozMDtcbiAgICAgICAgLy92YXIgZXkgPSB0aGlzLmV5KjMwICsgdGFyZ2V0WU9mZnNldDtcblxuICAgICAgICBpZih0aGlzLmVuZW15ICYmIHRoaXMuZW5lbXkuX25hbWUgIT09IFwiXCIgJiYgdGhpcy5lbmVteS54ICYmIHRoaXMuZW5lbXkueSkge1xuICAgICAgICAgICAgZXggPSB0aGlzLmVuZW15Lng7XG4gICAgICAgICAgICBleSA9IHRoaXMuZW5lbXkueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4ID0gdGhpcy5leCAqIDMwO1xuICAgICAgICAgICAgZXkgPSB0aGlzLmV5ICozMCArIHRhcmdldFlPZmZzZXQ7ICAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgdmFyIGFnZW50Tm9kZSwgZW5lbXk7XG5cbiAgICAgICAgaWYodGFyZ2V0UG9zLnggPT0gMCAmJiB0YXJnZXRQb3MueSA9PSAwKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG4gICAgICAgIHZhciBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKHZ0LngvdnQueSk7XG5cbiAgICAgICAgYXJyb3cuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgYXJyb3cuc2V0Um90YXRpb24oYWcrMTgwKTtcbiAgICAgICAgYXJyb3cuc2V0UG9zaXRpb24oc3RhcnRQb3MpO1xuXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFycm93LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMiwgdGFyZ2V0UG9zKSwgY2FsbGJhY2spKTsgXG4gICAgfSxcblxuICAgIHNob290QmFzZTpmdW5jdGlvbih4LCB5LCBlbmVteSwgYXJyb3cpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLm94O1xuICAgICAgICB2YXIgeSA9IHRoaXMub3k7IFxuICAgICAgICB2YXIgZW5lbXkgPSB0aGlzLmVuZW15OyBcbiAgICAgICAgdmFyIGFycm93ID0gdGhpcy5hcnJvdztcblxuICAgICAgICB2YXIgc3RhcnRQb3MgPSBjYy52Mih4KjMwKzE1LCB5KjMwKzE1KTtcbiAgICAgICAgdmFyIGV4ID0gZW5lbXkubXlwb3MueDtcbiAgICAgICAgdmFyIGV5ID0gZW5lbXkubXlwb3MueTtcbiAgICAgICAgdmFyIGJsaW5rID0gY2MuYmxpbmsoMC4wNSwxKTtcblxuICAgICAgICB2YXIgdGFyZ2V0UG9zID0gY2MudjIoZXgqMzArMTUsIGV5KjMwKzE1KTtcbiAgICAgICAgdmFyIGFnZW50Tm9kZTtcbiAgICAgICAgaWYoIWVuZW15KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZih0YXJnZXRQb3MueCA9PSAwICYmIHRhcmdldFBvcy55ID09IDApIHJldHVybjtcblxuICAgICAgICB2YXIgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcbiAgICAgICAgdmFyIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4odnQueC92dC55KTtcblxuICAgICAgICBhcnJvdy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBhcnJvdy5zZXRSb3RhdGlvbihhZysxODApO1xuICAgICAgICBhcnJvdy5zZXRQb3NpdGlvbihzdGFydFBvcyk7XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZW5lbXkuYmFzZU9iai5ydW5BY3Rpb24oYmxpbmspO1xuICAgICAgICAgICAgYXJyb3cuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFycm93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4yLCB0YXJnZXRQb3MpLCBjYWxsYmFjaykpOyBcbiAgICB9LFxuKi9cblxufSk7XG4iXX0=