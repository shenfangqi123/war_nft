"use strict";
cc._RF.push(module, 'cd79aqd9HxCZLHw2ASr//Gc', 'MySprite');
// scripts/MySprite.js

"use strict";

var common = require("Common");

var agentObj = require("AgentObj");

cc.Class({
  "extends": agentObj,
  properties: {
    sprAtlas: cc.SpriteAtlas,
    wrapMode: cc.WrapMode.Loop,
    routes: [],
    lastAct: "",
    lastAngle: -1,
    life: -1,
    eid: -1
  },
  onLoad: function onLoad() {
    this.layoutOp = this.node.parent.getComponent("Game");
  },
  start: function start() {},
  ctor: function ctor() {},
  init: function init() {
    this.posX = 0;
    this.posY = 0;
    this.now = Date.now();
    this.angle = -999;
    this.groupKill = false;
    this.attacking = false; //if dragonbones animator node

    if (this.aniType !== undefined && this.aniType == "dragon") {
      console.log("role:" + this.role);
      var crabBodyNode = this.node.getChildByName("crab_body");
      this._animation = crabBodyNode.getComponent(dragonBones.ArmatureDisplay); //console.log("---------");
      //this._animation.playAnimation('ske_n_attack', 0);
    } else {
      //if frame animator node
      this._animation = this.getComponent(cc.Animation);
      this._animation.WrapMode = cc.WrapMode.Loop;
    }
  },

  /*    
      setEnemy: function(enemyObj) {
          if(enemyObj) {
              this.eid = enemyObj.name;
              this.enemy = enemyObj;            
          } 
          else {
              this.eid = "";
              this.enemy = null;              
          }
      },
  
      onend: function(event) {
          var agentNode;
          if(this.enemy.isValid) {
              agentNode = this.enemy.getComponent('SkeSprite');
              agentNode.remove();
          } 
          //this.shootArrow(this.ox, this.oy, this.ex, this.ey, this.arrow);
      },
  */
  setInitPos: function setInitPos(px, py) {
    this.posX = px;
    this.posY = py;
    var pt = cc.v2(this.posX, this.posY);
    this.routes.push(pt);
  },
  updatePos: function updatePos(px, py) {
    var moveTo = cc.v2(px, py);
    var nx, ny;
    var ap = this.node.getAnchorPoint();
    var size = this.node.getContentSize();
    nx = (0.5 - ap.x) * size.width + px; //ny = (0.5-ap.y) * size.height + py;

    ny = py;
    var shadowMoveTo = cc.v2(nx, ny);
    this.node.setPosition(moveTo);

    if (this.shadow) {
      this.shadow.setPosition(moveTo);
    }

    return;
  },

  /*
      remove: function() {
          //this.node.scaleX = 0.3;
          //this.node.scaleY = 0.3;
          
          this._animation.play("dieoff2");
          this.shadow.destroy();
  
          //node destory in sprite afterkill func
          //this.node.destroy();
      },
  */
  dispShadow: function dispShadow(frameNo) {
    //shadow object may not ready in init() when playing
    if (!this.shadow) return;
    var shadowNode = this.shadow;
    var frameImg = "ske_shadow/e/ske_walk_e" + frameNo;
    var act = this.lastAct;
    if (!act) return;
    var actTmp = this.lastAct.split("_");
    var actDir = actTmp[1];
    var actType = actTmp[2];
    var scaleX = this.lastScaleX;

    if (actDir == "en1" || actDir == "en2" || actDir == "en3") {
      frameImg = "ske_shadow/en/ske_walk_en" + frameNo;
    } else if (actDir == "se1" || actDir == "se2" || actDir == "se3") {
      frameImg = "ske_shadow/se/ske_walk_se" + frameNo;
    } else if (actDir == "s") {
      frameImg = "ske_shadow/s/ske_walk_s" + frameNo;
    } else if (actDir == "n") {
      frameImg = "ske_shadow/n/ske_walk_n" + frameNo;
    } else if (actDir == "e") {
      frameImg = "ske_shadow/e/ske_walk_e" + frameNo;
    }

    this.shadow.active = true;
    cc.loader.loadRes(frameImg, cc.SpriteFrame, function (err, spriteFrame) {
      if (shadowNode) {
        try {
          if (shadowNode._name != "") {
            shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          }
        } catch (e) {
          console.log(shadowNode);
          console.log(e);
        }
      }
    });
  },

  /*
      move: function(pt) {
          if(this.removeFlag) {
              return;
          }
  
          var len = this.routes.length;
          var moveTo;
  
          if(len == 0) return;
          if(len == 1) {
              moveTo = this.routes[0];
          } else {
              moveTo = this.routes.shift();     
          }
  
          this.node.setPosition(moveTo);
          if(this.shadow && this.shadow.isValid) {
              this.shadow.setPosition(moveTo);     
          }
      },
  
      setAction: function() {
          var eastAnimFrames = [],
              str = "",
              frame,
              animation;
  
          for (var i = 1; i <= 4; i++) {        
              str = "c5u" + i;
              frame = this.sprAtlas.getSpriteFrame(str);
              eastAnimFrames.push(frame);
          }
  
          //animation = new cc.Animation(eastAnimFrames);
  
          var clip = cc.AnimationClip.createWithSpriteFrames(eastAnimFrames,frames.length);
          clip.name = "anim_001";
          clip.speed = 0.08;
          clip.sample = 4;
          clip.wrapMode = this.wrapMode;
          this._animation.addClip(clip);
      },
  
      playAnimation: function (wrapMode = cc.WrapMode.Default, speed = 0.5, sample = 60) {
          if(this._animation) {
              var animState = this._animation.getAnimationState("anim_001");
              animState.clip.wrapMode = wrapMode;
              animState.clip.speed = speed;
              animState.clip.sample = sample;
              animState.repeatCount = Infinity;
              this._animation.play("anim_001");
          }
      },
  
      setInitAct: function(angle, actType) {
          var angleInfo = this.getActnameByAngle(angle, actType);
          this.lastAct = angleInfo.actName;
      },
  
      getActnameByAngle_bak: function(angle, actType) {
          var actName="";
          var scaleX = 1;
          var ret = {};
  
          if(angle>=0 && angle<=11.25*1) {
              if(actType == "move") {
                  actName = "n_walk";
              }
              else if(actType == "sa") {
                  actName = "n_attack";
              }
          }
          else if(angle>11.25*1 && angle<=11.25*3) {
              if(actType == "move") {
                  actName = "en3_walk";
              }
              else if(actType == "sa") {
                  actName = "en3_attack";
              }
          }
          else if(angle>11.25*3 && angle<=11.25*5) {
              if(actType == "move") {
                  actName = "en2_walk";
              }
              else if(actType == "sa") {
                  actName = "en2_attack";
              }
          }
          else if(angle>11.25*5 && angle<=11.25*7) {
              if(actType == "move") {
                  actName = "en1_walk";
              }
              else if(actType == "sa") {
                  actName = "en1_attack";
              }
          }
          else if(angle>11.25*7 && angle<=11.25*9) {
              if(actType == "move") {
                  actName = "e_walk";
              }
              else if(actType == "sa") {
                  actName = "e_attack";
              }
          }
          else if(angle>11.25*9 && angle<=11.25*11) {
              if(actType == "move") {
                  actName = "se1_walk";
              }
              else if(actType == "sa") {
                  actName = "se1_attack";
              }
          }
          else if(angle>11.25*11 && angle<=11.25*13) {
              if(actType == "move") {
                  actName = "se2_walk";
              }
              else if(actType == "sa") {
                  actName = "se2_attack";
              }
          }
          else if(angle>11.25*13 && angle<=11.25*15) {
              if(actType == "move") {
                  actName = "se3_walk";
              }
              else if(actType == "sa") {
                  actName = "se3_attack";
              }
          }
          else if(angle>11.25*15 || angle<=180) {
              if(actType == "move") {
                  actName = "s_walk";
              }
              else if(actType == "sa") {
                  actName = "s_attack";
              }
          }
  
  
          else if(angle<0 && angle>=11.25*-1) {
              if(actType == "move") {
                  actName = "n_walk";
              }
              else if(actType == "sa") {
                  actName = "n_attack";
              }
              //scaleX = -1;
          }
          else if(angle<11.25*-1 && angle>=11.25*-3) {
              if(actType == "move") {
                  actName = "en3_walk";
              }
              else if(actType == "sa") {
                  actName = "en3_attack";
              }
              //scaleX = -1;
          }
          else if(angle<11.25*-3 && angle>=11.25*-5) {
              if(actType == "move") {
                  actName = "en2_walk";
              }
              else if(actType == "sa") {
                  actName = "en2_attack";
              }
  
              //scaleX = -1;
          }
          else if(angle<11.25*-5 && angle>=11.25*-7) {
              if(actType == "move") {
                  actName = "en1_walk";
              }
              else if(actType == "sa") {
                  actName = "en1_attack";
              }
  
              //scaleX = -1;
          }
          else if(angle<11.25*-7 && angle>=11.25*-9) {
              if(actType == "move") {
                  actName = "e_walk";
              }
              else if(actType == "sa") {
                  actName = "e_attack";
              }
  
              scaleX = -1;
          }
          else if(angle<11.25*-9 && angle>=11.25*-11) {
              if(actType == "move") {
                  actName = "se1_walk";
              }
              else if(actType == "sa") {
                  actName = "se1_attack";
              }
  
              scaleX = -1;
          }
          else if(angle<11.25*-11 && angle>=11.25*-13) {
              if(actType == "move") {
                  actName = "se2_walk";
              }
              else if(actType == "sa") {
                  actName = "se2_attack";
              }
  
              scaleX = -1;
          }
          else if(angle<11.25*-13 && angle>=11.25*-15) {
              if(actType == "move") {
                  actName = "se3_walk";
              }
              else if(actType == "sa") {
                  actName = "se3_attack";
              }
  
              scaleX = -1;
          } 
          else if(angle<11.25*-15 && angle>-180) {
              if(actType == "move") {
                  actName = "s_walk";
              }
              else if(actType == "sa") {
                  actName = "s_attack";
              }
  
              scaleX = -1;
          }
  
          else {
              console.log("------:"+angle);
          }
  
          actName = this.role +"_"+ actName;
  
          ret.actName = actName;
          ret.scaleX = scaleX;
          return ret;
      },
  */
  getActnameByAngle: function getActnameByAngle(angle, actType) {
    var actName = "";
    var scaleX = 1;
    var ret = {};
    var specialActname = false;

    if (angle > 22.5 * -1 && angle <= 22.5 * 1) {
      if (actType == "move") {
        actName = "n_walk";
      } else if (actType == "sa") {
        actName = "n_attack";
      }
    } else if (angle > 22.5 * 1 && angle <= 22.5 * 3) {
      if (actType == "move") {
        actName = "en2_walk";
      } else if (actType == "sa") {
        actName = "en2_attack";
      }
    } else if (angle > 22.5 * 3 && angle <= 22.5 * 5) {
      if (actType == "move") {
        actName = "e_walk";
      } else if (actType == "sa") {
        actName = "e_attack";
      }
    } else if (angle > 22.5 * 5 && angle <= 22.5 * 7) {
      if (actType == "move") {
        actName = "se2_walk";
      } else if (actType == "sa") {
        actName = "se2_attack";
      }
    } else if (angle > 22.5 * 7 || angle < -22.5 * 9) {
      if (actType == "move") {
        actName = "s_walk";
      } else if (actType == "sa") {
        actName = "s_attack";
      }
    } else if (angle < 22.5 * -1 && angle >= 22.5 * -3) {
      if (actType == "move") {
        actName = "en2_walk";
      } else if (actType == "sa") {
        actName = "en2_attack";
      }

      scaleX = -1;
    } else if (angle < 22.5 * -3 && angle >= 22.5 * -5) {
      if (actType == "move") {
        actName = "e_walk";
      } else if (actType == "sa") {
        actName = "e_attack";
      }

      scaleX = -1;
    } else if (angle < 22.5 * -5 && angle >= 22.5 * -7) {
      if (actType == "move") {
        actName = "se2_walk";
      } else if (actType == "sa") {
        // start attack
        actName = "se2_attack";
      }

      scaleX = -1;
    } else if (angle < 22.5 * -7) {
      if (actType == "move") {
        actName = "s_walk";
      } else if (actType == "sa") {
        // start attack
        actName = "s_attack";
      }

      scaleX = -1;
    } else {
      console.log("----error angle--------------:" + angle);
    }

    if (this.aniType !== undefined && this.aniType == "dragon") {
      actName = "ske" + "_" + actName;
    } else {
      actName = this.role + "_" + actName;
    } //actName = this.role +"_"+ actName;


    specialActname = this.specialAct(actType);

    if (specialActname) {
      actName = specialActname;
    }

    ret.actName = actName;
    ret.scaleX = scaleX;
    return ret;
  },
  specialAct: function specialAct(actType) {
    // if just 1 vs 1 attack
    if (!this.groupKill) {
      return false;
    }

    if (actType == "sa" && this.role == "hr") {
      return "hr_all_kill";
    }

    return false;
  },
  setId: function setId(aid) {
    this.aid = aid; //var event = new cc.Event.EventCustom("event_effect", true);
    //event.detail = "123";
    //this.node.dispatchEvent(event);
  },
  hide: function hide() {
    this.node.active = false;
  },
  setShadow: function setShadow(shadow) {
    this.shadow = shadow;
    this.shadow.active = true;
  },
  getAgentAngle: function getAgentAngle(oPos, dPos, tanAngle) {
    var dx, dy, ox, oy;
    var angle;
    dx = dPos.x;
    dy = dPos.y;
    ox = oPos.x;
    oy = oPos.y;

    if (dx - ox > 0 && dy - oy > 0) {
      angle = tanAngle;
    } else if (dx - ox > 0 && dy - oy < 0) {
      angle = 180 - tanAngle;
    } else if (dx - ox < 0 && dy - oy < 0) {
      angle = 180 + tanAngle;
    } else if (dx - ox < 0 && dy - oy > 0) {
      angle = 0 - tanAngle;
    } else if (dx - ox == 0 && dy - oy > 0) {
      angle = 0;
    } else if (dx - ox == 0 && dy - oy < 0) {
      angle = 180;
    } else if (dy - oy == 0 && dx - ox > 0) {
      angle = 90;
    } else if (dy - oy == 0 && dx - ox < 0) {
      angle = -90;
    } else {
      console.log("wrong angle in Func MySprite->getAgentAngle()");
    }

    return angle;
  },
  ifFlyAgent: function ifFlyAgent(role) {
    if (role == "bee") {
      return true;
    }

    return false;
  },
  playAngleAnimationNear: function playAngleAnimationNear(agent, agentFuture, isMainPlayer) {
    if (this.attacking) {
      return;
    }

    var startPos = cc.v2(agent.mypos.x, agent.mypos.y);
    var enemyPos = cc.v2(agent.enemypos.x, agent.enemypos.y);
    var zorder = 1000 + parseInt(32 - agent.mypos.y);
    var randomTime = Math.ceil(Math.random() * 125) / 100;
    var actName = "";
    var actType = agent.actType;
    var fx,
        fy,
        vt,
        ag = 0,
        targetPos,
        angleInfo;
    var x = agent.mypos.x;
    var y = agent.mypos.y;
    var ex = agent.enemypos.x;
    var ey = agent.enemypos.y;
    var distance = startPos.sub(enemyPos).mag();
    var attackDistance; // fly agent should hover over any other agent.

    if (!this.ifFlyAgent(agent.role)) {
      this.node.zIndex = zorder;
    }

    this.node.scaleX = 1;

    if (this._animation) {
      attackDistance = this.getAttackDistance(agent); //1.5 is the distance ajustment variable, should be ajust according to each agent size.
      //attackDistance = (agent.size + agent.esize)*0.5*1.5;

      if (distance <= attackDistance) {
        // dir according to enemy position
        startPos = cc.v2(x, y);
        targetPos = cc.v2(ex, ey);
        vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

        if (vt.x == 0) {
          vt.x = 0.1;
        }

        if (vt.y == 0) {
          vt.y = 0.1;
        }

        if (vt.x != 0 && vt.y != 0) {
          ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        }

        ag = this.getAgentAngle(agent.mypos, {
          "x": ex,
          "y": ey
        }, ag);

        if (ag > 180) {
          ag = ag - 360;
        }

        angleInfo = this.getActnameByAngle(ag, "sa");
        actName = angleInfo.actName; //used to mirror a sprite.

        this.node.scaleX = angleInfo.scaleX;
      } else {
        if (agentFuture) {
          fx = agentFuture.enemypos.x;
          fy = agentFuture.enemypos.y;
        } else {
          fx = agent.enemypos.x;
          fy = agent.enemypos.y;
        }

        startPos = cc.v2(x, y);
        targetPos = cc.v2(fx, fy);
        vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

        if (vt.x == 0) {
          vt.x = 0.1;
        }

        if (vt.y == 0) {
          vt.y = 0.1;
        }

        if (vt.x != 0 && vt.y != 0) {
          ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        }

        ag = this.getAgentAngle(agent.mypos, {
          "x": fx,
          "y": fy
        }, ag);

        if (ag > 180) {
          ag = ag - 360;
        }

        angleInfo = this.getActnameByAngle(ag, "move");
        actName = angleInfo.actName; //used to mirror a sprite.

        this.node.scaleX = angleInfo.scaleX;
      } //blood bar may flip when agent flip, should make it back.


      this.blood.scaleX = this.node.scaleX;

      if (this.lastAct != actName) {
        if (distance <= attackDistance) {
          this._animation.play(actName); //if(this.playEffect !== undefined) {
          //    this.playEffect();
          //}

        } else if (!this.attacking) {
          this._animation.play(actName, randomTime);
        }

        this.lastAct = actName;
        this.lastScaleX = angleInfo.scaleX;
      }
    }
  },
  playAngleAnimationRemote: function playAngleAnimationRemote(agent, agentFuture, isMainPlayer) {
    var fx, fy, actType;
    var ag = 0;
    var x = agent.mypos.x;
    var y = agent.mypos.y;
    var ex = agent.enemypos.x;
    var ey = agent.enemypos.y;
    var startPos, targetPos, startEPos, targetEPos, vt, vtE;

    var _self = this;

    var zorder = 1000 + parseInt(32 - y); //total animator duration is 1.25s, so take a random time from 0-1.25 to prevent same action

    var randomTime = Math.ceil(Math.random() * 125) / 100;
    var actName = "";
    var then;
    var angleInfo;
    actType = agent.actType;

    if (actType == "ia" || actType == "ea") {
      return;
    }

    ag = agent.rot;
    this.node.zIndex = zorder; //this.node.scaleX = 1;

    if (actType == "sa") {
      //start attack
      // dir according to enemy position
      startPos = cc.v2(x * 30, y * 30);
      targetPos = cc.v2(ex * 30, ey * 30);
      vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

      if (vt.x == 0) {
        vt.x = 0.1;
      }

      if (vt.y == 0) {
        vt.y = 0.1;
      }

      if (vt.x != 0 && vt.y != 0) {
        //ag = 180/Math.PI * Math.atan(Math.abs(vt.y/vt.x));
        ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        ag = this.getAgentAngle(agent.mypos, {
          "x": ex,
          "y": ey
        }, ag);
      }
    }

    if (actType == "move") {
      if (agentFuture) {
        fx = agentFuture.enemypos.x;
        fy = agentFuture.enemypos.y; //future acttype maybe ia instead of move or sa, in this case should not be handled.

        if (agentFuture && agentFuture.actType != "ia") {
          actType = agentFuture.actType;
        }
      } else {
        fx = agent.enemypos.x;
        fy = agent.enemypos.y;

        if (agentFuture && agentFuture.actType != "ia") {
          actType = agentFuture.actType;
        }
      }

      startPos = cc.v2(x * 30, y * 30);
      targetPos = cc.v2(fx * 30, fy * 30);
      vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

      if (vt.x == 0) {
        vt.x = 0.1;
      }

      if (vt.y == 0) {
        vt.y = 0.1;
      }

      if (vt.x != 0 && vt.y != 0) {
        ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        ag = this.getAgentAngle(agent.mypos, {
          "x": fx,
          "y": fy
        }, ag);
      }
    }

    if (this._animation) {
      angleInfo = this.getActnameByAngle(ag, actType);
      actName = angleInfo.actName; //used to mirror a sprite.
      //this.node.scaleX = angleInfo.scaleX;
      //blood bar may flip when agent flip, should make it back.

      this.blood.scaleX = this.node.scaleX; //if already in attack mode, just skip the animation

      if (this.lastAct != actName || actType == "sa") {
        if (actType == "sa") {
          this.aniStop();
          this.aniPlay(actName); //this._animation.stop();
          //this._animation.play(actName);
        } else {
          //walking action.
          this.aniPlay(actName, randomTime); //this._animation.play(actName, randomTime);
        }

        this.lastAct = actName; //this.lastScaleX = angleInfo.scaleX;
      }
    }
    /*
            if(this._animation) {
                angleInfo = this.getActnameByAngle(angle, actType);
                actName = angleInfo.actName;
                this.node.scaleX = angleInfo.scaleX;
    
                //if already in attack mode, just skip the animation
                if(this.lastAct != actName) {
                    then = Date.now();
                    // to avoid changing dir frequently. agent would looks tremble otherwise.
                    if(then - this.now > 100) {
                        this._animation.play(actName, randomTime);
                        this.angle = angle;
                        this.now = then;
                    }
                }
    
                //if(this.lastAct != actName && actType=="sa") {
                //    var _self = this;
                //    var animState = this._animation.getAnimationState(actName);
                //    if (animState) {
                //        animState.on('lastframe', (event) => {}, this);
                //    }
                //}
    
                this.lastAct = actName;
    
                this.lastScaleX = angleInfo.scaleX;
            }
    */


    this.lastActType = actType;
  },
  aniPlay: function aniPlay(actName, randomTime) {
    if (randomTime === void 0) {
      randomTime = null;
    }

    if (this.aniType !== undefined && this.aniType == "dragon") {
      this._animation.playAnimation(actName, 0);
    } else {
      if (randomTime) {
        this._animation.play(actName, randomTime);
      } else {
        this._animation.play(actName);
      }
    }
  },
  aniStop: function aniStop() {
    if (this.aniType !== undefined && this.aniType == "dragon") {//should do stop dragon ani here.
    } else {
      this._animation.stop();
    }
  } // update (dt) {},

});

cc._RF.pop();