"use strict";
cc._RF.push(module, '2fe15M3k5hEtLqG347kT1t6', 'GunSprite');
// scripts/GunSprite.js

"use strict";

var common = require("Common"); // Learn cc.Class:
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
    role: "gun"
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this._animation = this.getComponent(cc.Animation);
    this._animation.WrapMode = cc.WrapMode.Loop;
  },
  isEnemyBase: function isEnemyBase(baseId) {
    if (baseId == 1 || baseId == 2 || baseId == 3) {
      return true;
    } else {
      return false;
    }
  },
  playBaseWarriorAnimationDefault: function playBaseWarriorAnimationDefault(actType, isMainPlayer, baseId) {
    var actName;

    if (this.isEnemyBase(baseId)) {
      actName = "ar_s_walk";
    } else {
      actName = "ar_n_walk";
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
    var y = agent.mypos.y; //gun is located on the up&down inside base, 
    //but default attack point is in the central of the base, so angle may need to ajust.

    if (agent.objectId == 1) {
      y = agent.mypos.y + 1;
    } else if (agent.objectId == 4) {
      y = agent.mypos.y - 0;
    }

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

    startPos = cc.v2(x * 30, y * 30); //targetPos = cc.v2((ex)*30, (ey)*30+targetYOffset*offsetDir);

    targetPos = cc.v2(ex * 30, ey * 30);
    vt = startPos.sub(targetPos);

    if (vt.x == 0 && vt.y == 0) {
      return;
    } //if postion not changed, do nothing, or the math.atan will do error.


    if (vt.x != 0 && vt.y != 0) {
      var ag = 180 / Math.PI * Math.atan(vt.x / vt.y);
      angle = ag; //if base is up, left right angle should be ajusted.

      if (vt.y >= 0 && vt.x < 0) {
        angle = ag + 180;
      } else if (vt.y >= 0 && vt.x >= 0) {
        angle = ag - 180;
      }
    }

    if (this._animation) {
      console.log(angle);
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
  },
  getActnameByAngle: function getActnameByAngle(angle, actType) {
    var actName = "";
    var scaleX = 1;
    var ret = {};

    if (angle >= 0 && angle <= 7.5 * 1) {
      if (actType == "move") {
        actName = "n_walk";
      } else if (actType == "sa") {
        actName = "n_attack";
      }
    } else if (angle > 7.5 * 1 && angle <= 7.5 * 3) {
      if (actType == "move") {
        actName = "en5_walk";
      } else if (actType == "sa") {
        actName = "en5_attack";
      }
    } else if (angle > 7.5 * 3 && angle <= 7.5 * 5) {
      if (actType == "move") {
        actName = "en4_walk";
      } else if (actType == "sa") {
        actName = "en4_attack";
      }
    } else if (angle > 7.5 * 5 && angle <= 7.5 * 7) {
      if (actType == "move") {
        actName = "en3_walk";
      } else if (actType == "sa") {
        actName = "en3_attack";
      }
    } else if (angle > 7.5 * 7 && angle <= 7.5 * 9) {
      if (actType == "move") {
        actName = "en2_walk";
      } else if (actType == "sa") {
        actName = "en2_attack";
      }
    } else if (angle > 7.5 * 9 && angle <= 7.5 * 11) {
      if (actType == "move") {
        actName = "en1_walk";
      } else if (actType == "sa") {
        actName = "en1_attack";
      }
    } else if (angle > 7.5 * 11 && angle <= 7.5 * 13) {
      if (actType == "move") {
        actName = "e_walk";
      } else if (actType == "sa") {
        actName = "e_attack";
      }
    } else if (angle > 7.5 * 13 && angle <= 7.5 * 15) {
      if (actType == "move") {
        actName = "se1_walk";
      } else if (actType == "sa") {
        actName = "se1_attack";
      }
    } else if (angle > 7.5 * 15 && angle <= 7.5 * 17) {
      if (actType == "move") {
        actName = "se2_walk";
      } else if (actType == "sa") {
        actName = "se2_attack";
      }
    } else if (angle > 7.5 * 17 && angle <= 7.5 * 19) {
      if (actType == "move") {
        actName = "se3_walk";
      } else if (actType == "sa") {
        actName = "se3_attack";
      }
    } else if (angle > 7.5 * 19 && angle <= 7.5 * 21) {
      if (actType == "move") {
        actName = "se4_walk";
      } else if (actType == "sa") {
        actName = "se4_attack";
      }
    } else if (angle > 7.5 * 21 && angle <= 7.5 * 23) {
      if (actType == "move") {
        actName = "se5_walk";
      } else if (actType == "sa") {
        actName = "se5_attack";
      }
    } else if (angle > 7.5 * 21 && angle <= 7.5 * 23) {
      if (actType == "move") {
        actName = "s_walk";
      } else if (actType == "sa") {
        actName = "s_attack";
      }
    } else if (angle < 0 && angle >= 7.5 * -1) {
      if (actType == "move") {
        actName = "n_walk";
      } else if (actType == "sa") {
        actName = "n_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -1 && angle >= 7.5 * -3) {
      if (actType == "move") {
        actName = "en5_walk";
      } else if (actType == "sa") {
        actName = "en5_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -3 && angle >= 7.5 * -5) {
      if (actType == "move") {
        actName = "en4_walk";
      } else if (actType == "sa") {
        actName = "en4_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -5 && angle >= 7.5 * -7) {
      if (actType == "move") {
        actName = "en3_walk";
      } else if (actType == "sa") {
        actName = "en3_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -7 && angle >= 7.5 * -9) {
      if (actType == "move") {
        actName = "en2_walk";
      } else if (actType == "sa") {
        actName = "en2_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -9 && angle >= 7.5 * -11) {
      if (actType == "move") {
        actName = "en1_walk";
      } else if (actType == "sa") {
        actName = "en1_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -11 && angle >= 7.5 * -13) {
      if (actType == "move") {
        actName = "e_walk";
      } else if (actType == "sa") {
        actName = "e_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -13 && angle >= 7.5 * -15) {
      if (actType == "move") {
        actName = "se1_walk";
      } else if (actType == "sa") {
        actName = "se1_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -15 && angle >= 7.5 * -17) {
      if (actType == "move") {
        actName = "se2_walk";
      } else if (actType == "sa") {
        actName = "se2_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -17 && angle >= 7.5 * -19) {
      if (actType == "move") {
        actName = "se3_walk";
      } else if (actType == "sa") {
        actName = "se3_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -19 && angle >= 7.5 * -21) {
      if (actType == "move") {
        actName = "se4_walk";
      } else if (actType == "sa") {
        actName = "se4_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -21 && angle >= 7.5 * -23) {
      if (actType == "move") {
        actName = "se5_walk";
      } else if (actType == "sa") {
        actName = "se5_attack";
      }

      scaleX = -1;
    } else if (angle < 7.5 * -23) {
      if (actType == "move") {
        actName = "s_walk";
      } else if (actType == "sa") {
        actName = "s_attack";
      }

      scaleX = -1;
    } else {
      console.log("------:" + angle);
    }

    actName = this.role + "_" + actName;
    ret.actName = actName;
    ret.scaleX = scaleX;
    return ret;
  } // update (dt) {},

});

cc._RF.pop();