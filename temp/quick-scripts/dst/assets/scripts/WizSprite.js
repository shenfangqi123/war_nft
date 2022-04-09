
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/WizSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '65407smWQ1HBIUtleJMXxyA', 'WizSprite');
// scripts/WizSprite.js

"use strict";

var mySprite = require("MySprite");

var common = require("Common");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "wiz"
  },
  start: function start() {
    this._animation = this.getComponent(cc.Animation);
    this._animation.WrapMode = cc.WrapMode.Loop;
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

  /*
      //ske clip ske_bomb, called by first frame of ske_bomb
      beforeKill: function() {
          //this.shadow.destroy();
      },
  
      //ske clip ske_bomb, called by last frame of ske_bomb
      afterKill: function() {
          console.log("--remove archer node--");
          this.node.destroy();
      },
  */
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
    this.dispShadow(1);
  },
  aFrame2Evt: function aFrame2Evt() {
    this.dispShadow(3);
  },
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(5);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {
    this.dispShadow(7);
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationRemote(agent, agentFuture, isMainPlayer);
  }
  /*
      isEnemyBase: function(baseId) {
          if(baseId == 1 || baseId == 2 || baseId == 3) {
              return true;
          } else {
              return false;
          }
      },
  
      isEnemyFort: function(isAgentHero, mainPlayer) {
          if(isAgentHero && mainPlayer == 2) {
              return true;
          } 
          if(!isAgentHero && mainPlayer == 1) {
              return true;
          } 
          return false;
      },
  
      playBaseWarriorAnimationDefault: function(actType, baseId) {
          var actName;
  
          if(this.isEnemyBase(baseId)) {
              actName = "lr_s_walk";
          } else {
              actName = "lr_n_walk";
          }
  
          if(actType == "move" && this.lastAct == actName) {
              return;
          }
  
          var randomTime = Math.ceil(Math.random()*125)/100;
          this._animation.play(actName, randomTime);
          this.lastAct = actName;
      },
  
      playFortWarriorAnimationDefault: function(actType, isAgentHero, mainPlayer) {
          var actName;
  
          if(this.isEnemyFort(isAgentHero, mainPlayer)) {
              actName = "lr_s_walk";
          } else {
              actName = "lr_n_walk";
          }
  
          if(actType == "move" && this.lastAct == actName) {
              return;
          }
  
          var randomTime = Math.ceil(Math.random()*125)/100;
          this._animation.play(actName, randomTime);
          this.lastAct = actName;
      },
  
      playBaseWarriorAnimation: function(agent, isMainPlayer, actType) {
          var fx,fy;
          var targetYOffset = common.attackTargetYOffset;
          var ex, ey;
          var angle;
          var x = agent.mypos.x; 
          var y = agent.mypos.y; 
  
          var startPos,targetPos,startEPos, targetEPos, vt, vtE;
  
          var randomTime = Math.ceil(Math.random()*125)/100;
          var actName = "";
          var then;
          var angleInfo;
  
          // user to control the up and down user Y postion offset.
          var offsetDir = 1;
  
          if(isMainPlayer == 1) {
              offsetDir = 1;
          }
          else if(isMainPlayer == 2) {
              offsetDir = -1;
          }
  
          ex = agent.enemypos.x; 
          ey = agent.enemypos.y; 
  
          // dir according to enemy position
          startPos  = cc.v2((x)*30, (y)*30);
          targetPos = cc.v2((ex)*30, (ey)*30+targetYOffset*offsetDir);
          vt = startPos.sub(targetPos);
  
          if(vt.x == 0 && vt.y == 0) {
              return;
          }
  
          //if dir no changed, vt.x or vt.y is 0, atan value should be invaild
          if(vt.x == 0) {
              vt.x = 0.1;
          }
          if(vt.y == 0) {
              vt.y = 0.1;
          }
  
          //if postion not changed, do nothing, or the math.atan will do error.
          if(vt.x != 0 && vt.y != 0) {
              var ag = 180/Math.PI * Math.atan(vt.x/vt.y);
              angle = ag;
              if(vt.y >= 0) {
                  //when down to up
                  angle = ag + 180;
              } 
          } 
  
          if(this._animation) {
              angleInfo = this.getActnameByAngle(angle, actType);
              actName = angleInfo.actName;
  
              //used to mirror a sprite.
              this.node.scaleX = angleInfo.scaleX;
  
              //if already in attack mode, just skip the animation
              if(this.lastAct != actName || actType == "sa") {
                  if(actType == "sa") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1dpelNwcml0ZS5qcyJdLCJuYW1lcyI6WyJteVNwcml0ZSIsInJlcXVpcmUiLCJjb21tb24iLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsIl9hbmltYXRpb24iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJXcmFwTW9kZSIsIkxvb3AiLCJyZW1vdmUiLCJwbGF5Iiwic2hhZG93IiwiZGVzdHJveSIsImJsb29kIiwiZGllU3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZGllRW5kIiwiZm9vdFN0YXJ0IiwiZm9vdEVuZCIsIm5vZGUiLCJmb290UHJpbnQiLCJ6SW5kZXgiLCJzY2FsZVgiLCJzY2FsZVkiLCJmcmFtZTFFdnQiLCJkaXNwU2hhZG93IiwiZnJhbWUyRXZ0IiwiZnJhbWUzRXZ0IiwiZnJhbWU0RXZ0IiwiZnJhbWU1RXZ0IiwiZnJhbWU2RXZ0IiwiZnJhbWU3RXZ0IiwiYUZyYW1lMUV2dCIsImFGcmFtZTJFdnQiLCJhRnJhbWUzRXZ0IiwiYUZyYW1lNEV2dCIsImFGcmFtZTVFdnQiLCJwbGF5QW5pIiwiYWdlbnQiLCJhZ2VudEZ1dHVyZSIsImlzTWFpblBsYXllciIsInBsYXlBbmdsZUFuaW1hdGlvblJlbW90ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0osUUFESjtBQUdMSyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBREcsR0FIUDtBQU9MQyxFQUFBQSxLQVBLLG1CQU9JO0FBQ0wsU0FBS0MsVUFBTCxHQUFrQixLQUFLQyxZQUFMLENBQWtCTixFQUFFLENBQUNPLFNBQXJCLENBQWxCO0FBQ0EsU0FBS0YsVUFBTCxDQUFnQkcs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBN0dTLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBteVNwcml0ZSA9IHJlcXVpcmUoXCJNeVNwcml0ZVwiKTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogbXlTcHJpdGUsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvbGU6XCJ3aXpcIixcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24uV3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Mb29wO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImRpZW9mZjJcIik7XG4gICAgICAgIHRoaXMuc2hhZG93LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ibG9vZC5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGRpZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWUgc3RhcnRcIik7XG4gICAgfSxcblxuICAgIGRpZUVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGllIGVuZFwiKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJmb290cHJpbnRcIik7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGZvb3QgcHJpbnQgc3RhcnQgZXZ0XG4gICAgZm9vdFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb290IHN0YXJ0XCIpO1xuICAgIH0sXG5cbiAgICBmb290RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmb290IGVuZFwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgZm9vdCBwcmludCBzdGFydCBldnRcbiAgICBmb290UHJpbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gMTtcbiAgICB9LFxuXG4vKlxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGNhbGxlZCBieSBmaXJzdCBmcmFtZSBvZiBza2VfYm9tYlxuICAgIGJlZm9yZUtpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMuc2hhZG93LmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgY2FsbGVkIGJ5IGxhc3QgZnJhbWUgb2Ygc2tlX2JvbWJcbiAgICBhZnRlcktpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tcmVtb3ZlIGFyY2hlciBub2RlLS1cIik7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiovXG5cbiAgICBmcmFtZTFFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMSk7XG4gICAgfSxcblxuICAgIGZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygyKTtcbiAgICB9LFxuXG4gICAgZnJhbWUzRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDMpO1xuICAgIH0sXG5cbiAgICBmcmFtZTRFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNCk7XG4gICAgfSxcblxuICAgIGZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg1KTtcbiAgICB9LFxuXG4gICAgZnJhbWU2RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDYpO1xuICAgIH0sXG5cbiAgICBmcmFtZTdFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNyk7XG4gICAgfSxcblxuXG4gICAgYUZyYW1lMUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygxKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg1KTtcbiAgICB9LFxuXG4gICAgYUZyYW1lNEV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNyk7XG4gICAgfSxcblxuICAgIHBsYXlBbmk6IGZ1bmN0aW9uKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKTtcbiAgICB9LFxuXG4vKlxuICAgIGlzRW5lbXlCYXNlOiBmdW5jdGlvbihiYXNlSWQpIHtcbiAgICAgICAgaWYoYmFzZUlkID09IDEgfHwgYmFzZUlkID09IDIgfHwgYmFzZUlkID09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGlzRW5lbXlGb3J0OiBmdW5jdGlvbihpc0FnZW50SGVybywgbWFpblBsYXllcikge1xuICAgICAgICBpZihpc0FnZW50SGVybyAmJiBtYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICBpZighaXNBZ2VudEhlcm8gJiYgbWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBwbGF5QmFzZVdhcnJpb3JBbmltYXRpb25EZWZhdWx0OiBmdW5jdGlvbihhY3RUeXBlLCBiYXNlSWQpIHtcbiAgICAgICAgdmFyIGFjdE5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5pc0VuZW15QmFzZShiYXNlSWQpKSB7XG4gICAgICAgICAgICBhY3ROYW1lID0gXCJscl9zX3dhbGtcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX25fd2Fsa1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIiAmJiB0aGlzLmxhc3RBY3QgPT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMjUpLzEwMDtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4gICAgfSxcblxuICAgIHBsYXlGb3J0V2FycmlvckFuaW1hdGlvbkRlZmF1bHQ6IGZ1bmN0aW9uKGFjdFR5cGUsIGlzQWdlbnRIZXJvLCBtYWluUGxheWVyKSB7XG4gICAgICAgIHZhciBhY3ROYW1lO1xuXG4gICAgICAgIGlmKHRoaXMuaXNFbmVteUZvcnQoaXNBZ2VudEhlcm8sIG1haW5QbGF5ZXIpKSB7XG4gICAgICAgICAgICBhY3ROYW1lID0gXCJscl9zX3dhbGtcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX25fd2Fsa1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIiAmJiB0aGlzLmxhc3RBY3QgPT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMjUpLzEwMDtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4gICAgfSxcblxuICAgIHBsYXlCYXNlV2FycmlvckFuaW1hdGlvbjogZnVuY3Rpb24oYWdlbnQsIGlzTWFpblBsYXllciwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgZngsZnk7XG4gICAgICAgIHZhciB0YXJnZXRZT2Zmc2V0ID0gY29tbW9uLmF0dGFja1RhcmdldFlPZmZzZXQ7XG4gICAgICAgIHZhciBleCwgZXk7XG4gICAgICAgIHZhciBhbmdsZTtcbiAgICAgICAgdmFyIHggPSBhZ2VudC5teXBvcy54OyBcbiAgICAgICAgdmFyIHkgPSBhZ2VudC5teXBvcy55OyBcblxuICAgICAgICB2YXIgc3RhcnRQb3MsdGFyZ2V0UG9zLHN0YXJ0RVBvcywgdGFyZ2V0RVBvcywgdnQsIHZ0RTtcblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB2YXIgYWN0TmFtZSA9IFwiXCI7XG4gICAgICAgIHZhciB0aGVuO1xuICAgICAgICB2YXIgYW5nbGVJbmZvO1xuXG4gICAgICAgIC8vIHVzZXIgdG8gY29udHJvbCB0aGUgdXAgYW5kIGRvd24gdXNlciBZIHBvc3Rpb24gb2Zmc2V0LlxuICAgICAgICB2YXIgb2Zmc2V0RGlyID0gMTtcblxuICAgICAgICBpZihpc01haW5QbGF5ZXIgPT0gMSkge1xuICAgICAgICAgICAgb2Zmc2V0RGlyID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGlzTWFpblBsYXllciA9PSAyKSB7XG4gICAgICAgICAgICBvZmZzZXREaXIgPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4ID0gYWdlbnQuZW5lbXlwb3MueDsgXG4gICAgICAgIGV5ID0gYWdlbnQuZW5lbXlwb3MueTsgXG5cbiAgICAgICAgLy8gZGlyIGFjY29yZGluZyB0byBlbmVteSBwb3NpdGlvblxuICAgICAgICBzdGFydFBvcyAgPSBjYy52MigoeCkqMzAsICh5KSozMCk7XG4gICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKChleCkqMzAsIChleSkqMzArdGFyZ2V0WU9mZnNldCpvZmZzZXREaXIpO1xuICAgICAgICB2dCA9IHN0YXJ0UG9zLnN1Yih0YXJnZXRQb3MpO1xuXG4gICAgICAgIGlmKHZ0LnggPT0gMCAmJiB2dC55ID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgZGlyIG5vIGNoYW5nZWQsIHZ0Lnggb3IgdnQueSBpcyAwLCBhdGFuIHZhbHVlIHNob3VsZCBiZSBpbnZhaWxkXG4gICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgfVxuICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIHBvc3Rpb24gbm90IGNoYW5nZWQsIGRvIG5vdGhpbmcsIG9yIHRoZSBtYXRoLmF0YW4gd2lsbCBkbyBlcnJvci5cbiAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgdmFyIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4odnQueC92dC55KTtcbiAgICAgICAgICAgIGFuZ2xlID0gYWc7XG4gICAgICAgICAgICBpZih2dC55ID49IDApIHtcbiAgICAgICAgICAgICAgICAvL3doZW4gZG93biB0byB1cFxuICAgICAgICAgICAgICAgIGFuZ2xlID0gYWcgKyAxODA7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9IFxuXG4gICAgICAgIGlmKHRoaXMuX2FuaW1hdGlvbikge1xuICAgICAgICAgICAgYW5nbGVJbmZvID0gdGhpcy5nZXRBY3RuYW1lQnlBbmdsZShhbmdsZSwgYWN0VHlwZSk7XG4gICAgICAgICAgICBhY3ROYW1lID0gYW5nbGVJbmZvLmFjdE5hbWU7XG5cbiAgICAgICAgICAgIC8vdXNlZCB0byBtaXJyb3IgYSBzcHJpdGUuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcblxuICAgICAgICAgICAgLy9pZiBhbHJlYWR5IGluIGF0dGFjayBtb2RlLCBqdXN0IHNraXAgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgaWYodGhpcy5sYXN0QWN0ICE9IGFjdE5hbWUgfHwgYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL3dhbGtpbmcgYWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcbiovXG5cbn0pO1xuIl19