
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
    role: "lr"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FyY1Nwcml0ZS5qcyJdLCJuYW1lcyI6WyJteVNwcml0ZSIsInJlcXVpcmUiLCJjb21tb24iLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsIl9hbmltYXRpb24iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJXcmFwTW9kZSIsIkxvb3AiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJyZW1vdmUiLCJwbGF5Iiwic2hhZG93IiwiZGVzdHJveSIsImJsb29kIiwiZGllU3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZGllRW5kIiwiZm9vdFN0YXJ0IiwiZm9vdEVuZCIsImZvb3RQcmludCIsInpJbmRleCIsInNjYWxlWCIsInNjYWxlWSIsImJlZm9yZUtpbGwiLCJhZnRlcktpbGwiLCJmcmFtZTFFdnQiLCJkaXNwU2hhZG93IiwiZnJhbWUyRXZ0IiwiZnJhbWUzRXZ0IiwiZnJhbWU0RXZ0IiwiZnJhbWU1RXZ0IiwiZnJhbWU2RXZ0IiwiZnJhbWU3RXZ0IiwiYUZyYW1lMUV2dCIsInBsYXlTbmQiLCJhRnJhbWUyRXZ0IiwiYUZyYW1lM0V2dCIsImFGcmFtZTRFdnQiLCJhRnJhbWU1RXZ0IiwicGxheUFuaSIsImFnZW50IiwiYWdlbnRGdXR1cmUiLCJpc01haW5QbGF5ZXIiLCJwbGF5QW5nbGVBbmltYXRpb25SZW1vdGUiLCJpc0VuZW15QmFzZSIsImJhc2VJZCIsImlzRW5lbXlGb3J0IiwiaXNBZ2VudEhlcm8iLCJtYWluUGxheWVyIiwicGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdCIsImFjdFR5cGUiLCJhY3ROYW1lIiwibGFzdEFjdCIsInJhbmRvbVRpbWUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsInBsYXlGb3J0V2FycmlvckFuaW1hdGlvbkRlZmF1bHQiLCJwbGF5QmFzZVdhcnJpb3JBbmltYXRpb24iLCJmeCIsImZ5IiwidGFyZ2V0WU9mZnNldCIsImF0dGFja1RhcmdldFlPZmZzZXQiLCJleCIsImV5IiwiYW5nbGUiLCJ4IiwibXlwb3MiLCJ5Iiwic3RhcnRQb3MiLCJ0YXJnZXRQb3MiLCJzdGFydEVQb3MiLCJ0YXJnZXRFUG9zIiwidnQiLCJ2dEUiLCJ0aGVuIiwiYW5nbGVJbmZvIiwib2Zmc2V0RGlyIiwiZW5lbXlwb3MiLCJ2MiIsInN1YiIsImFnIiwiUEkiLCJhdGFuIiwiZ2V0QWN0bmFtZUJ5QW5nbGUiLCJzdG9wIiwibGFzdFNjYWxlWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0osUUFESjtBQUdMSyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBREcsR0FIUDtBQU9MQyxFQUFBQSxLQVBLLG1CQU9JO0FBQ0wsU0FBS0MsVUFBTCxHQUFrQixLQUFLQyxZQUFMLENBQWtCTixFQUFFLENBQUNPLFNBQXJCLENBQWxCO0FBQ0EsU0FBS0YsVUFBTCxDQUFnQkcsUUFBaEIsR0FBMkJSLEVBQUUsQ0FBQ1EsUUFBSCxDQUFZQyxJQUF2Qzs7QUFDQSxRQUFHLEtBQUtDLFFBQUwsSUFBaUIsSUFBcEIsRUFBMEI7QUFBRztBQUN6QixXQUFLQSxRQUFMLEdBQWdCLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkEsTUFBakIsQ0FBd0JOLFlBQXhCLENBQXFDLE1BQXJDLENBQWhCO0FBQ0g7QUFDSixHQWJJO0FBZUxPLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtSLFVBQUwsQ0FBZ0JTLElBQWhCLENBQXFCLFNBQXJCOztBQUNBLFNBQUtDLE1BQUwsQ0FBWUMsT0FBWjtBQUNBLFNBQUtDLEtBQUwsQ0FBV0QsT0FBWDtBQUNILEdBbkJJO0FBcUJMRSxFQUFBQSxRQUFRLEVBQUUsb0JBQVc7QUFDakJDLElBQUFBLE9B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O0FBQ1Y7QUFDQUgsUUFBQUEsS0FBSyxHQUFHZ0IsRUFBRSxHQUFHLEdBQWI7QUFDSDtBQUNKOztBQUVELFFBQUcsS0FBS2pGLFVBQVIsRUFBb0I7QUFDaEI0RSxNQUFBQSxTQUFTLEdBQUcsS0FBS1EsaUJBQUwsQ0FBdUJuQixLQUF2QixFQUE4QmYsT0FBOUIsQ0FBWjtBQUNBQyxNQUFBQSxPQUFPLEdBQUd5QixTQUFTLENBQUN6QixPQUFwQixDQUZnQixDQUloQjs7QUFDQSxXQUFLN0MsSUFBTCxDQUFVZSxNQUFWLEdBQW1CdUQsU0FBUyxDQUFDdkQsTUFBN0IsQ0FMZ0IsQ0FPaEI7O0FBQ0EsVUFBRyxLQUFLK0IsT0FBTCxJQUFnQkQsT0FBaEIsSUFBMkJELE9BQU8sSUFBSSxJQUF6QyxFQUErQztBQUMzQyxZQUFHQSxPQUFPLElBQUksSUFBZCxFQUFvQjtBQUNoQixlQUFLbEQsVUFBTCxDQUFnQnFGLElBQWhCOztBQUNBLGVBQUtyRixVQUFMLENBQWdCUyxJQUFoQixDQUFxQjBDLE9BQXJCO0FBQ0gsU0FIRCxNQUdPO0FBQ0g7QUFDQSxlQUFLbkQsVUFBTCxDQUFnQlMsSUFBaEIsQ0FBcUIwQyxPQUFyQixFQUE4QkUsVUFBOUI7QUFDSDs7QUFDRCxhQUFLWSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLYixPQUFMLEdBQWVELE9BQWY7QUFDQSxhQUFLbUMsVUFBTCxHQUFrQlYsU0FBUyxDQUFDdkQsTUFBNUI7QUFDSDtBQUNKO0FBRUo7QUFFTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaFBTLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBteVNwcml0ZSA9IHJlcXVpcmUoXCJNeVNwcml0ZVwiKTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogbXlTcHJpdGUsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvbGU6XCJsclwiLFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5XcmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XG4gICAgICAgIGlmKHRoaXMubGF5b3V0T3AgPT0gbnVsbCkgeyAgLy9pZiBhcmNoZXIgc3RhbmQgdXAgb24gdGhlIGJhc2UuXG4gICAgICAgICAgICB0aGlzLmxheW91dE9wID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImRpZW9mZjJcIik7XG4gICAgICAgIHRoaXMuc2hhZG93LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ibG9vZC5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGRpZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWUgc3RhcnRcIik7XG4gICAgfSxcblxuICAgIGRpZUVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGllIGVuZFwiKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJmb290cHJpbnRcIik7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGZvb3QgcHJpbnQgc3RhcnQgZXZ0XG4gICAgZm9vdFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb290IHN0YXJ0XCIpO1xuICAgIH0sXG5cbiAgICBmb290RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb290IGVuZFwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgZm9vdCBwcmludCBzdGFydCBldnRcbiAgICBmb290UHJpbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gMTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgY2FsbGVkIGJ5IGZpcnN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYmVmb3JlS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgbGFzdCBmcmFtZSBvZiBza2VfYm9tYlxuICAgIGFmdGVyS2lsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS1yZW1vdmUgYXJjaGVyIG5vZGUtLVwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZnJhbWUxRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDEpO1xuICAgIH0sXG5cbiAgICBmcmFtZTJFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMik7XG4gICAgfSxcblxuICAgIGZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgZnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDQpO1xuICAgIH0sXG5cbiAgICBmcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNSk7XG4gICAgfSxcblxuICAgIGZyYW1lNkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg2KTtcbiAgICB9LFxuXG4gICAgZnJhbWU3RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDcpO1xuICAgIH0sXG5cblxuICAgIGFGcmFtZTFFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wLnBsYXlTbmQoXCJsclwiKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTNFdnQ6IGZ1bmN0aW9uKCkge1xuICAgIH0sXG5cbiAgICBhRnJhbWU0RXZ0OiBmdW5jdGlvbigpIHtcbiAgICB9LFxuXG4gICAgYUZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIHBsYXlBbmk6IGZ1bmN0aW9uKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKTtcbiAgICB9LFxuXG4gICAgaXNFbmVteUJhc2U6IGZ1bmN0aW9uKGJhc2VJZCkge1xuICAgICAgICBpZihiYXNlSWQgPT0gMSB8fCBiYXNlSWQgPT0gMiB8fCBiYXNlSWQgPT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNFbmVteUZvcnQ6IGZ1bmN0aW9uKGlzQWdlbnRIZXJvLCBtYWluUGxheWVyKSB7XG4gICAgICAgIGlmKGlzQWdlbnRIZXJvICYmIG1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpc0FnZW50SGVybyAmJiBtYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHBsYXlCYXNlV2FycmlvckFuaW1hdGlvbkRlZmF1bHQ6IGZ1bmN0aW9uKGFjdFR5cGUsIGJhc2VJZCkge1xuICAgICAgICB2YXIgYWN0TmFtZTtcblxuICAgICAgICBpZih0aGlzLmlzRW5lbXlCYXNlKGJhc2VJZCkpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX3Nfd2Fsa1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0TmFtZSA9IFwibHJfbl93YWxrXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiICYmIHRoaXMubGFzdEFjdCA9PSBhY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgcGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdDogZnVuY3Rpb24oYWN0VHlwZSwgaXNBZ2VudEhlcm8sIG1haW5QbGF5ZXIpIHtcbiAgICAgICAgdmFyIGFjdE5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5pc0VuZW15Rm9ydChpc0FnZW50SGVybywgbWFpblBsYXllcikpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX3Nfd2Fsa1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0TmFtZSA9IFwibHJfbl93YWxrXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiICYmIHRoaXMubGFzdEFjdCA9PSBhY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgcGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uOiBmdW5jdGlvbihhZ2VudCwgaXNNYWluUGxheWVyLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBmeCxmeTtcbiAgICAgICAgdmFyIHRhcmdldFlPZmZzZXQgPSBjb21tb24uYXR0YWNrVGFyZ2V0WU9mZnNldDtcbiAgICAgICAgdmFyIGV4LCBleTtcbiAgICAgICAgdmFyIGFuZ2xlO1xuICAgICAgICB2YXIgeCA9IGFnZW50Lm15cG9zLng7IFxuICAgICAgICB2YXIgeSA9IGFnZW50Lm15cG9zLnk7IFxuXG4gICAgICAgIHZhciBzdGFydFBvcyx0YXJnZXRQb3Msc3RhcnRFUG9zLCB0YXJnZXRFUG9zLCB2dCwgdnRFO1xuXG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIHRoZW47XG4gICAgICAgIHZhciBhbmdsZUluZm87XG5cbiAgICAgICAgLy8gdXNlciB0byBjb250cm9sIHRoZSB1cCBhbmQgZG93biB1c2VyIFkgcG9zdGlvbiBvZmZzZXQuXG4gICAgICAgIHZhciBvZmZzZXREaXIgPSAxO1xuXG4gICAgICAgIGlmKGlzTWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICBvZmZzZXREaXIgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoaXNNYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgIG9mZnNldERpciA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZXggPSBhZ2VudC5lbmVteXBvcy54OyBcbiAgICAgICAgZXkgPSBhZ2VudC5lbmVteXBvcy55OyBcblxuICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGV4KSozMCwgKGV5KSozMCt0YXJnZXRZT2Zmc2V0Km9mZnNldERpcik7XG4gICAgICAgIHZ0ID0gc3RhcnRQb3Muc3ViKHRhcmdldFBvcyk7XG5cbiAgICAgICAgaWYodnQueCA9PSAwICYmIHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICB9XG4gICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgcG9zdGlvbiBub3QgY2hhbmdlZCwgZG8gbm90aGluZywgb3IgdGhlIG1hdGguYXRhbiB3aWxsIGRvIGVycm9yLlxuICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICB2YXIgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbih2dC54L3Z0LnkpO1xuICAgICAgICAgICAgYW5nbGUgPSBhZztcbiAgICAgICAgICAgIGlmKHZ0LnkgPj0gMCkge1xuICAgICAgICAgICAgICAgIC8vd2hlbiBkb3duIHRvIHVwXG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhZyArIDE4MDtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcblxuICAgICAgICAgICAgLy91c2VkIHRvIG1pcnJvciBhIHNwcml0ZS5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSB8fCBhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2Fsa2luZyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4vKlxuICAgIHNob290QXJyb3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNob290QWdlbnQoKTsgICAgXG4gICAgfSwgIFxuXG4gICAgc2hvb3RBZ2VudDpmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV4LCBleTtcbiAgICAgICAgdmFyIHggPSB0aGlzLm94O1xuICAgICAgICB2YXIgeSA9IHRoaXMub3k7XG4gICAgICAgIHZhciBhcnJvdyA9IHRoaXMuYXJyb3c7XG4gICAgICAgIHZhciBlbmVtaWVzID0gdGhpcy5raWxsZWRFbmVtaWVzO1xuICAgICAgICB2YXIgdGFyZ2V0WU9mZnNldCA9IGNvbW1vbi5hdHRhY2tUYXJnZXRZT2Zmc2V0O1xuXG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNjLnYyKHgqMzArMTUsIHkqMzArMTUpO1xuXG4gICAgICAgIC8vdmFyIGV4ID0gdGhpcy5leCozMDtcbiAgICAgICAgLy92YXIgZXkgPSB0aGlzLmV5KjMwICsgdGFyZ2V0WU9mZnNldDtcblxuICAgICAgICBpZih0aGlzLmVuZW15ICYmIHRoaXMuZW5lbXkuX25hbWUgIT09IFwiXCIgJiYgdGhpcy5lbmVteS54ICYmIHRoaXMuZW5lbXkueSkge1xuICAgICAgICAgICAgZXggPSB0aGlzLmVuZW15Lng7XG4gICAgICAgICAgICBleSA9IHRoaXMuZW5lbXkueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4ID0gdGhpcy5leCAqIDMwO1xuICAgICAgICAgICAgZXkgPSB0aGlzLmV5ICozMCArIHRhcmdldFlPZmZzZXQ7ICAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgdmFyIGFnZW50Tm9kZSwgZW5lbXk7XG5cbiAgICAgICAgaWYodGFyZ2V0UG9zLnggPT0gMCAmJiB0YXJnZXRQb3MueSA9PSAwKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG4gICAgICAgIHZhciBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKHZ0LngvdnQueSk7XG5cbiAgICAgICAgYXJyb3cuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgYXJyb3cuc2V0Um90YXRpb24oYWcrMTgwKTtcbiAgICAgICAgYXJyb3cuc2V0UG9zaXRpb24oc3RhcnRQb3MpO1xuXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFycm93LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvdy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMiwgdGFyZ2V0UG9zKSwgY2FsbGJhY2spKTsgXG4gICAgfSxcblxuICAgIHNob290QmFzZTpmdW5jdGlvbih4LCB5LCBlbmVteSwgYXJyb3cpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLm94O1xuICAgICAgICB2YXIgeSA9IHRoaXMub3k7IFxuICAgICAgICB2YXIgZW5lbXkgPSB0aGlzLmVuZW15OyBcbiAgICAgICAgdmFyIGFycm93ID0gdGhpcy5hcnJvdztcblxuICAgICAgICB2YXIgc3RhcnRQb3MgPSBjYy52Mih4KjMwKzE1LCB5KjMwKzE1KTtcbiAgICAgICAgdmFyIGV4ID0gZW5lbXkubXlwb3MueDtcbiAgICAgICAgdmFyIGV5ID0gZW5lbXkubXlwb3MueTtcbiAgICAgICAgdmFyIGJsaW5rID0gY2MuYmxpbmsoMC4wNSwxKTtcblxuICAgICAgICB2YXIgdGFyZ2V0UG9zID0gY2MudjIoZXgqMzArMTUsIGV5KjMwKzE1KTtcbiAgICAgICAgdmFyIGFnZW50Tm9kZTtcbiAgICAgICAgaWYoIWVuZW15KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZih0YXJnZXRQb3MueCA9PSAwICYmIHRhcmdldFBvcy55ID09IDApIHJldHVybjtcblxuICAgICAgICB2YXIgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcbiAgICAgICAgdmFyIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4odnQueC92dC55KTtcblxuICAgICAgICBhcnJvdy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBhcnJvdy5zZXRSb3RhdGlvbihhZysxODApO1xuICAgICAgICBhcnJvdy5zZXRQb3NpdGlvbihzdGFydFBvcyk7XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZW5lbXkuYmFzZU9iai5ydW5BY3Rpb24oYmxpbmspO1xuICAgICAgICAgICAgYXJyb3cuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFycm93LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMC4yLCB0YXJnZXRQb3MpLCBjYWxsYmFjaykpOyBcbiAgICB9LFxuKi9cblxufSk7XG4iXX0=