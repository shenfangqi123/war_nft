
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/MySprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL015U3ByaXRlLmpzIl0sIm5hbWVzIjpbImNvbW1vbiIsInJlcXVpcmUiLCJhZ2VudE9iaiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwic3ByQXRsYXMiLCJTcHJpdGVBdGxhcyIsIndyYXBNb2RlIiwiV3JhcE1vZGUiLCJMb29wIiwicm91dGVzIiwibGFzdEFjdCIsImxhc3RBbmdsZSIsImxpZmUiLCJlaWQiLCJvbkxvYWQiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImN0b3IiLCJpbml0IiwicG9zWCIsInBvc1kiLCJub3ciLCJEYXRlIiwiYW5nbGUiLCJncm91cEtpbGwiLCJhdHRhY2tpbmciLCJhbmlUeXBlIiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsInJvbGUiLCJjcmFiQm9keU5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIl9hbmltYXRpb24iLCJkcmFnb25Cb25lcyIsIkFybWF0dXJlRGlzcGxheSIsIkFuaW1hdGlvbiIsInNldEluaXRQb3MiLCJweCIsInB5IiwicHQiLCJ2MiIsInB1c2giLCJ1cGRhdGVQb3MiLCJtb3ZlVG8iLCJueCIsIm55IiwiYXAiLCJnZXRBbmNob3JQb2ludCIsInNpemUiLCJnZXRDb250ZW50U2l6ZSIsIngiLCJ3aWR0aCIsInNoYWRvd01vdmVUbyIsInNldFBvc2l0aW9uIiwic2hhZG93IiwiZGlzcFNoYWRvdyIsImZyYW1lTm8iLCJzaGFkb3dOb2RlIiwiZnJhbWVJbWciLCJhY3QiLCJhY3RUbXAiLCJzcGxpdCIsImFjdERpciIsImFjdFR5cGUiLCJzY2FsZVgiLCJsYXN0U2NhbGVYIiwiYWN0aXZlIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJfbmFtZSIsIlNwcml0ZSIsImUiLCJnZXRBY3RuYW1lQnlBbmdsZSIsImFjdE5hbWUiLCJyZXQiLCJzcGVjaWFsQWN0bmFtZSIsInNwZWNpYWxBY3QiLCJzZXRJZCIsImFpZCIsImhpZGUiLCJzZXRTaGFkb3ciLCJnZXRBZ2VudEFuZ2xlIiwib1BvcyIsImRQb3MiLCJ0YW5BbmdsZSIsImR4IiwiZHkiLCJveCIsIm95IiwieSIsImlmRmx5QWdlbnQiLCJwbGF5QW5nbGVBbmltYXRpb25OZWFyIiwiYWdlbnQiLCJhZ2VudEZ1dHVyZSIsImlzTWFpblBsYXllciIsInN0YXJ0UG9zIiwibXlwb3MiLCJlbmVteVBvcyIsImVuZW15cG9zIiwiem9yZGVyIiwicGFyc2VJbnQiLCJyYW5kb21UaW1lIiwiTWF0aCIsImNlaWwiLCJyYW5kb20iLCJmeCIsImZ5IiwidnQiLCJhZyIsInRhcmdldFBvcyIsImFuZ2xlSW5mbyIsImV4IiwiZXkiLCJkaXN0YW5jZSIsInN1YiIsIm1hZyIsImF0dGFja0Rpc3RhbmNlIiwiekluZGV4IiwiZ2V0QXR0YWNrRGlzdGFuY2UiLCJQSSIsImF0YW4iLCJhYnMiLCJibG9vZCIsInBsYXkiLCJwbGF5QW5nbGVBbmltYXRpb25SZW1vdGUiLCJzdGFydEVQb3MiLCJ0YXJnZXRFUG9zIiwidnRFIiwiX3NlbGYiLCJ0aGVuIiwicm90IiwiYW5pU3RvcCIsImFuaVBsYXkiLCJsYXN0QWN0VHlwZSIsInBsYXlBbmltYXRpb24iLCJzdG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRixRQURKO0FBR0xHLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUVILEVBQUUsQ0FBQ0ksV0FETDtBQUVSQyxJQUFBQSxRQUFRLEVBQUVMLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxJQUZkO0FBR1JDLElBQUFBLE1BQU0sRUFBQyxFQUhDO0FBSVJDLElBQUFBLE9BQU8sRUFBQyxFQUpBO0FB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QUFpQkMsU0FBakIsSUFBOEIsS0FBS0QsT0FBTCxJQUFnQixRQUFqRCxFQUEyRCxDQUN2RDtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtPLFVBQUwsQ0FBZ0IwRyxJQUFoQjtBQUNIO0FBQ0osR0EzMUJJLENBNjFCTDs7QUE3MUJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xudmFyIGFnZW50T2JqID0gcmVxdWlyZShcIkFnZW50T2JqXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogYWdlbnRPYmosXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwckF0bGFzOiBjYy5TcHJpdGVBdGxhcyxcbiAgICAgICAgd3JhcE1vZGU6IGNjLldyYXBNb2RlLkxvb3AsXG4gICAgICAgIHJvdXRlczpbXSxcbiAgICAgICAgbGFzdEFjdDpcIlwiLFxuICAgICAgICBsYXN0QW5nbGU6LTEsXG4gICAgICAgIGxpZmU6LTEsXG4gICAgICAgIGVpZDotMSxcbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5sYXlvdXRPcCA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZVwiKTtcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgIH0sXG5cbiAgICBjdG9yKCkge1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gMDtcbiAgICAgICAgdGhpcy5wb3NZID0gMDtcbiAgICAgICAgdGhpcy5ub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmFuZ2xlID0gLTk5OTtcbiAgICAgICAgdGhpcy5ncm91cEtpbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdHRhY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICAvL2lmIGRyYWdvbmJvbmVzIGFuaW1hdG9yIG5vZGVcbiAgICAgICAgaWYodGhpcy5hbmlUeXBlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hbmlUeXBlID09IFwiZHJhZ29uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicm9sZTpcIiArIHRoaXMucm9sZSk7XG5cbiAgICAgICAgICAgIHZhciBjcmFiQm9keU5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjcmFiX2JvZHlcIik7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24gPSBjcmFiQm9keU5vZGUuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgLy90aGlzLl9hbmltYXRpb24ucGxheUFuaW1hdGlvbignc2tlX25fYXR0YWNrJywgMCk7XG4gICAgICAgIH0gZWxzZSB7ICAvL2lmIGZyYW1lIGFuaW1hdG9yIG5vZGVcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24uV3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Mb29wO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4vKiAgICBcbiAgICBzZXRFbmVteTogZnVuY3Rpb24oZW5lbXlPYmopIHtcbiAgICAgICAgaWYoZW5lbXlPYmopIHtcbiAgICAgICAgICAgIHRoaXMuZWlkID0gZW5lbXlPYmoubmFtZTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXkgPSBlbmVteU9iajsgICAgICAgICAgICBcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVpZCA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmVuZW15ID0gbnVsbDsgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uZW5kOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgYWdlbnROb2RlO1xuICAgICAgICBpZih0aGlzLmVuZW15LmlzVmFsaWQpIHtcbiAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZW5lbXkuZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgICAgIGFnZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgfSBcbiAgICAgICAgLy90aGlzLnNob290QXJyb3codGhpcy5veCwgdGhpcy5veSwgdGhpcy5leCwgdGhpcy5leSwgdGhpcy5hcnJvdyk7XG4gICAgfSxcbiovXG5cbiAgICBzZXRJbml0UG9zOiBmdW5jdGlvbihweCwgcHkpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcHg7XG4gICAgICAgIHRoaXMucG9zWSA9IHB5O1xuICAgICAgICB2YXIgcHQgPSBjYy52Mih0aGlzLnBvc1gsIHRoaXMucG9zWSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXMucHVzaChwdCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVBvczogZnVuY3Rpb24ocHgsIHB5KSB7XG4gICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICB2YXIgbngsbnk7XG4gICAgICAgIHZhciBhcCA9IHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpO1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBcbiAgICAgICAgbnggPSAoMC41LWFwLngpICogc2l6ZS53aWR0aCArIHB4O1xuICAgICAgICAvL255ID0gKDAuNS1hcC55KSAqIHNpemUuaGVpZ2h0ICsgcHk7XG4gICAgICAgIG55ID0gcHk7XG5cbiAgICAgICAgdmFyIHNoYWRvd01vdmVUbyA9IGNjLnYyKG54LCBueSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICBpZih0aGlzLnNoYWRvdykgeyBcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG5cbi8qXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLm5vZGUuc2NhbGVYID0gMC4zO1xuICAgICAgICAvL3RoaXMubm9kZS5zY2FsZVkgPSAwLjM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImRpZW9mZjJcIik7XG4gICAgICAgIHRoaXMuc2hhZG93LmRlc3Ryb3koKTtcblxuICAgICAgICAvL25vZGUgZGVzdG9yeSBpbiBzcHJpdGUgYWZ0ZXJraWxsIGZ1bmNcbiAgICAgICAgLy90aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4qL1xuXG4gICAgZGlzcFNoYWRvdzogZnVuY3Rpb24oZnJhbWVObykge1xuICAgICAgICAvL3NoYWRvdyBvYmplY3QgbWF5IG5vdCByZWFkeSBpbiBpbml0KCkgd2hlbiBwbGF5aW5nXG4gICAgICAgIGlmKCF0aGlzLnNoYWRvdykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzaGFkb3dOb2RlID0gdGhpcy5zaGFkb3c7XG4gICAgICAgIHZhciBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9lL3NrZV93YWxrX2VcIitmcmFtZU5vO1xuICAgICAgICB2YXIgYWN0ID0gdGhpcy5sYXN0QWN0O1xuXG4gICAgICAgIGlmKCFhY3QpIHJldHVybjtcblxuICAgICAgICB2YXIgYWN0VG1wID0gdGhpcy5sYXN0QWN0LnNwbGl0KFwiX1wiKTtcblxuICAgICAgICB2YXIgYWN0RGlyID0gYWN0VG1wWzFdO1xuICAgICAgICB2YXIgYWN0VHlwZSA9IGFjdFRtcFsyXTtcbiAgICAgICAgdmFyIHNjYWxlWCA9IHRoaXMubGFzdFNjYWxlWDtcblxuICAgICAgICBpZihhY3REaXIgPT0gXCJlbjFcIiB8fCBhY3REaXIgPT0gXCJlbjJcIiB8fCBhY3REaXIgPT0gXCJlbjNcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvZW4vc2tlX3dhbGtfZW5cIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwic2UxXCIgfHwgYWN0RGlyID09IFwic2UyXCIgfHwgYWN0RGlyID09IFwic2UzXCIpIHtcbiAgICAgICAgICAgIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L3NlL3NrZV93YWxrX3NlXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcInNcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvcy9za2Vfd2Fsa19zXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcIm5cIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvbi9za2Vfd2Fsa19uXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcImVcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvZS9za2Vfd2Fsa19lXCIrZnJhbWVObztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhZG93LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGZyYW1lSW1nLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGlmKHNoYWRvd05vZGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZihzaGFkb3dOb2RlLl9uYW1lICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hhZG93Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuLypcbiAgICBtb3ZlOiBmdW5jdGlvbihwdCkge1xuICAgICAgICBpZih0aGlzLnJlbW92ZUZsYWcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZW4gPSB0aGlzLnJvdXRlcy5sZW5ndGg7XG4gICAgICAgIHZhciBtb3ZlVG87XG5cbiAgICAgICAgaWYobGVuID09IDApIHJldHVybjtcbiAgICAgICAgaWYobGVuID09IDEpIHtcbiAgICAgICAgICAgIG1vdmVUbyA9IHRoaXMucm91dGVzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW92ZVRvID0gdGhpcy5yb3V0ZXMuc2hpZnQoKTsgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgIGlmKHRoaXMuc2hhZG93ICYmIHRoaXMuc2hhZG93LmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKG1vdmVUbyk7ICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWFzdEFuaW1GcmFtZXMgPSBbXSxcbiAgICAgICAgICAgIHN0ciA9IFwiXCIsXG4gICAgICAgICAgICBmcmFtZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA0OyBpKyspIHsgICAgICAgIFxuICAgICAgICAgICAgc3RyID0gXCJjNXVcIiArIGk7XG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuc3ByQXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3RyKTtcbiAgICAgICAgICAgIGVhc3RBbmltRnJhbWVzLnB1c2goZnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9hbmltYXRpb24gPSBuZXcgY2MuQW5pbWF0aW9uKGVhc3RBbmltRnJhbWVzKTtcblxuICAgICAgICB2YXIgY2xpcCA9IGNjLkFuaW1hdGlvbkNsaXAuY3JlYXRlV2l0aFNwcml0ZUZyYW1lcyhlYXN0QW5pbUZyYW1lcyxmcmFtZXMubGVuZ3RoKTtcbiAgICAgICAgY2xpcC5uYW1lID0gXCJhbmltXzAwMVwiO1xuICAgICAgICBjbGlwLnNwZWVkID0gMC4wODtcbiAgICAgICAgY2xpcC5zYW1wbGUgPSA0O1xuICAgICAgICBjbGlwLndyYXBNb2RlID0gdGhpcy53cmFwTW9kZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmFkZENsaXAoY2xpcCk7XG4gICAgfSxcblxuICAgIHBsYXlBbmltYXRpb246IGZ1bmN0aW9uICh3cmFwTW9kZSA9IGNjLldyYXBNb2RlLkRlZmF1bHQsIHNwZWVkID0gMC41LCBzYW1wbGUgPSA2MCkge1xuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBhbmltU3RhdGUgPSB0aGlzLl9hbmltYXRpb24uZ2V0QW5pbWF0aW9uU3RhdGUoXCJhbmltXzAwMVwiKTtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5jbGlwLndyYXBNb2RlID0gd3JhcE1vZGU7XG4gICAgICAgICAgICBhbmltU3RhdGUuY2xpcC5zcGVlZCA9IHNwZWVkO1xuICAgICAgICAgICAgYW5pbVN0YXRlLmNsaXAuc2FtcGxlID0gc2FtcGxlO1xuICAgICAgICAgICAgYW5pbVN0YXRlLnJlcGVhdENvdW50ID0gSW5maW5pdHk7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImFuaW1fMDAxXCIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEluaXRBY3Q6IGZ1bmN0aW9uKGFuZ2xlLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYW5nbGVJbmZvLmFjdE5hbWU7XG4gICAgfSxcblxuICAgIGdldEFjdG5hbWVCeUFuZ2xlX2JhazogZnVuY3Rpb24oYW5nbGUsIGFjdFR5cGUpIHtcbiAgICAgICAgdmFyIGFjdE5hbWU9XCJcIjtcbiAgICAgICAgdmFyIHNjYWxlWCA9IDE7XG4gICAgICAgIHZhciByZXQgPSB7fTtcblxuICAgICAgICBpZihhbmdsZT49MCAmJiBhbmdsZTw9MTEuMjUqMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxICYmIGFuZ2xlPD0xMS4yNSozKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSozICYmIGFuZ2xlPD0xMS4yNSo1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSo1ICYmIGFuZ2xlPD0xMS4yNSo3KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4xX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSo3ICYmIGFuZ2xlPD0xMS4yNSo5KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjkgJiYgYW5nbGU8PTExLjI1KjExKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UxX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxMSAmJiBhbmdsZTw9MTEuMjUqMTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjEzICYmIGFuZ2xlPD0xMS4yNSoxNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlM193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMTUgfHwgYW5nbGU8PTE4MCkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MCAmJiBhbmdsZT49MTEuMjUqLTEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xICYmIGFuZ2xlPj0xMS4yNSotMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuM193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0zICYmIGFuZ2xlPj0xMS4yNSotNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTUgJiYgYW5nbGU+PTExLjI1Ki03KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4xX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotNyAmJiBhbmdsZT49MTEuMjUqLTkpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki05ICYmIGFuZ2xlPj0xMS4yNSotMTEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotMTEgJiYgYW5nbGU+PTExLjI1Ki0xMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xMyAmJiBhbmdsZT49MTEuMjUqLTE1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xNSAmJiBhbmdsZT4tMTgwKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tOlwiK2FuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xuXG4gICAgICAgIHJldC5hY3ROYW1lID0gYWN0TmFtZTtcbiAgICAgICAgcmV0LnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuKi9cblxuICAgIGdldEFjdG5hbWVCeUFuZ2xlOiBmdW5jdGlvbihhbmdsZSwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgYWN0TmFtZT1cIlwiO1xuICAgICAgICB2YXIgc2NhbGVYID0gMTtcbiAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICB2YXIgc3BlY2lhbEFjdG5hbWUgPSBmYWxzZTtcblxuICAgICAgICBpZihhbmdsZT4yMi41Ki0xICYmIGFuZ2xlPD0yMi41KjEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MjIuNSoxICYmIGFuZ2xlPD0yMi41KjMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqMyAmJiBhbmdsZTw9MjIuNSo1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqNSAmJiBhbmdsZTw9MjIuNSo3KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjcgfHwgYW5nbGU8LTIyLjUqOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDIyLjUqLTEgJiYgYW5nbGU+PTIyLjUqLTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki0zICYmIGFuZ2xlPj0yMi41Ki01KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki01ICYmIGFuZ2xlPj0yMi41Ki03KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHsgIC8vIHN0YXJ0IGF0dGFja1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYW5nbGU8MjIuNSotNyl7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAgLy8gc3RhcnQgYXR0YWNrXG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS1lcnJvciBhbmdsZS0tLS0tLS0tLS0tLS0tOlwiK2FuZ2xlKTtcbiAgICAgICAgfVxuXG5cblxuaWYodGhpcy5hbmlUeXBlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hbmlUeXBlID09IFwiZHJhZ29uXCIpIHtcbiAgICAgICAgYWN0TmFtZSA9IFwic2tlXCIgK1wiX1wiKyBhY3ROYW1lO1xufSBlbHNlIHtcbiAgICAgICAgYWN0TmFtZSA9IHRoaXMucm9sZSArXCJfXCIrIGFjdE5hbWU7XG59XG5cblxuLy9hY3ROYW1lID0gdGhpcy5yb2xlICtcIl9cIisgYWN0TmFtZTtcblxuXG4gXG4gICAgICAgIHNwZWNpYWxBY3RuYW1lID0gdGhpcy5zcGVjaWFsQWN0KGFjdFR5cGUpO1xuICAgICAgICBpZihzcGVjaWFsQWN0bmFtZSkge1xuICAgICAgICAgICAgYWN0TmFtZSA9IHNwZWNpYWxBY3RuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0LmFjdE5hbWUgPSBhY3ROYW1lO1xuICAgICAgICByZXQuc2NhbGVYID0gc2NhbGVYO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBzcGVjaWFsQWN0OiBmdW5jdGlvbihhY3RUeXBlKSB7XG4gICAgICAgIC8vIGlmIGp1c3QgMSB2cyAxIGF0dGFja1xuICAgICAgICBpZighdGhpcy5ncm91cEtpbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihhY3RUeXBlID09IFwic2FcIiAmJiB0aGlzLnJvbGUgPT0gXCJoclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJocl9hbGxfa2lsbFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2V0SWQ6IGZ1bmN0aW9uKGFpZCkge1xuICAgICAgICB0aGlzLmFpZCA9IGFpZDtcblxuICAgICAgICAvL3ZhciBldmVudCA9IG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbShcImV2ZW50X2VmZmVjdFwiLCB0cnVlKTtcbiAgICAgICAgLy9ldmVudC5kZXRhaWwgPSBcIjEyM1wiO1xuICAgICAgICAvL3RoaXMubm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9LFxuXG4gICAgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2V0U2hhZG93OiBmdW5jdGlvbihzaGFkb3cpIHtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSBzaGFkb3c7XG4gICAgICAgIHRoaXMuc2hhZG93LmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIGdldEFnZW50QW5nbGU6IGZ1bmN0aW9uKG9Qb3MsIGRQb3MsIHRhbkFuZ2xlKSB7XG4gICAgICAgIHZhciBkeCxkeSxveCxveTtcbiAgICAgICAgdmFyIGFuZ2xlO1xuXG4gICAgICAgIGR4ID0gZFBvcy54O1xuICAgICAgICBkeSA9IGRQb3MueTtcbiAgICAgICAgb3ggPSBvUG9zLng7XG4gICAgICAgIG95ID0gb1Bvcy55O1xuXG4gICAgICAgIGlmKGR4LW94PjAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSB0YW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGR4LW94PjAgJiYgZHktb3k8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAxODAtdGFuQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veDwwICYmIGR5LW95PDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gMTgwK3RhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g8MCAmJiBkeS1veT4wKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDAtdGFuQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veD09MCAmJiBkeS1veT4wKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veD09MCAmJiBkeS1veTwwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDE4MDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGR5LW95PT0wICYmIGR4LW94PjApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gOTA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeS1veT09MCAmJiBkeC1veDwwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IC05MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3JvbmcgYW5nbGUgaW4gRnVuYyBNeVNwcml0ZS0+Z2V0QWdlbnRBbmdsZSgpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgIH0sXG5cbiAgICBpZkZseUFnZW50OiBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgIGlmKHJvbGUgPT0gXCJiZWVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBwbGF5QW5nbGVBbmltYXRpb25OZWFyOiBmdW5jdGlvbihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcikge1xuICAgICAgICBpZih0aGlzLmF0dGFja2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2MudjIoYWdlbnQubXlwb3MueCwgYWdlbnQubXlwb3MueSk7XG4gICAgICAgIHZhciBlbmVteVBvcyA9IGNjLnYyKGFnZW50LmVuZW15cG9zLngsIGFnZW50LmVuZW15cG9zLnkpO1xuICAgICAgICB2YXIgem9yZGVyID0gMTAwMCtwYXJzZUludCgzMi1hZ2VudC5teXBvcy55KTtcbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMjUpLzEwMDtcbiAgICAgICAgdmFyIGFjdE5hbWUgPSBcIlwiO1xuICAgICAgICB2YXIgYWN0VHlwZSA9IGFnZW50LmFjdFR5cGU7XG4gICAgICAgIHZhciBmeCxmeSx2dCxhZz0wLHRhcmdldFBvcyxhbmdsZUluZm87XG5cbiAgICAgICAgdmFyIHggPSBhZ2VudC5teXBvcy54O1xuICAgICAgICB2YXIgeSA9IGFnZW50Lm15cG9zLnk7XG4gICAgICAgIHZhciBleCA9IGFnZW50LmVuZW15cG9zLng7XG4gICAgICAgIHZhciBleSA9IGFnZW50LmVuZW15cG9zLnk7XG5cbiAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RhcnRQb3Muc3ViKGVuZW15UG9zKS5tYWcoKTtcbiAgICAgICAgdmFyIGF0dGFja0Rpc3RhbmNlO1xuXG4gICAgICAgIC8vIGZseSBhZ2VudCBzaG91bGQgaG92ZXIgb3ZlciBhbnkgb3RoZXIgYWdlbnQuXG4gICAgICAgIGlmKCF0aGlzLmlmRmx5QWdlbnQoYWdlbnQucm9sZSkpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB6b3JkZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IDE7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIGF0dGFja0Rpc3RhbmNlID0gdGhpcy5nZXRBdHRhY2tEaXN0YW5jZShhZ2VudCk7XG5cbiAgICAgICAgICAgIC8vMS41IGlzIHRoZSBkaXN0YW5jZSBhanVzdG1lbnQgdmFyaWFibGUsIHNob3VsZCBiZSBhanVzdCBhY2NvcmRpbmcgdG8gZWFjaCBhZ2VudCBzaXplLlxuICAgICAgICAgICAgLy9hdHRhY2tEaXN0YW5jZSA9IChhZ2VudC5zaXplICsgYWdlbnQuZXNpemUpKjAuNSoxLjU7XG5cbiAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1hdHRhY2tEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIGRpciBhY2NvcmRpbmcgdG8gZW5lbXkgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBzdGFydFBvcyAgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MihleCwgZXkpO1xuICAgICAgICAgICAgICAgIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG5cbiAgICAgICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueC92dC55KSk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmV4LCBcInlcIjpleX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYWcsIFwic2FcIik7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuICAgICAgICAgICAgICAgIC8vdXNlZCB0byBtaXJyb3IgYSBzcHJpdGUuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBmeCA9IGFnZW50RnV0dXJlLmVuZW15cG9zLng7IFxuICAgICAgICAgICAgICAgICAgICBmeSA9IGFnZW50RnV0dXJlLmVuZW15cG9zLnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZnggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICAgICAgICAgICAgICBmeSA9IGFnZW50LmVuZW15cG9zLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKGZ4LCBmeSk7XG4gICAgICAgICAgICAgICAgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcblxuICAgICAgICAgICAgICAgIC8vaWYgZGlyIG5vIGNoYW5nZWQsIHZ0Lnggb3IgdnQueSBpcyAwLCBhdGFuIHZhbHVlIHNob3VsZCBiZSBpbnZhaWxkXG4gICAgICAgICAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZ0LnggPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2dC55ID0gMC4xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHZ0LnggIT0gMCAmJiB2dC55ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmZ4LCBcInlcIjpmeX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYWcsIFwibW92ZVwiKTtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gYW5nbGVJbmZvLmFjdE5hbWU7XG5cbiAgICAgICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2Jsb29kIGJhciBtYXkgZmxpcCB3aGVuIGFnZW50IGZsaXAsIHNob3VsZCBtYWtlIGl0IGJhY2suXG4gICAgICAgICAgICB0aGlzLmJsb29kLnNjYWxlWCA9IHRoaXMubm9kZS5zY2FsZVg7XG5cbiAgICAgICAgICAgIGlmKHRoaXMubGFzdEFjdCAhPSBhY3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PWF0dGFja0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAvL2lmKHRoaXMucGxheUVmZmVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMucGxheUVmZmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIXRoaXMuYXR0YWNraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RBY3QgPSBhY3ROYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlOiBmdW5jdGlvbihhZ2VudCwgYWdlbnRGdXR1cmUsIGlzTWFpblBsYXllcikge1xuICAgICAgICB2YXIgZngsZnksYWN0VHlwZTtcbiAgICAgICAgdmFyIGFnID0gMDtcbiAgICAgICAgdmFyIHggPSBhZ2VudC5teXBvcy54OyBcbiAgICAgICAgdmFyIHkgPSBhZ2VudC5teXBvcy55OyBcbiAgICAgICAgdmFyIGV4ID0gYWdlbnQuZW5lbXlwb3MueDsgXG4gICAgICAgIHZhciBleSA9IGFnZW50LmVuZW15cG9zLnk7IFxuXG4gICAgICAgIHZhciBzdGFydFBvcyx0YXJnZXRQb3Msc3RhcnRFUG9zLCB0YXJnZXRFUG9zLCB2dCwgdnRFO1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgem9yZGVyID0gMTAwMCtwYXJzZUludCgzMi15KTtcblxuICAgICAgICAvL3RvdGFsIGFuaW1hdG9yIGR1cmF0aW9uIGlzIDEuMjVzLCBzbyB0YWtlIGEgcmFuZG9tIHRpbWUgZnJvbSAwLTEuMjUgdG8gcHJldmVudCBzYW1lIGFjdGlvblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB2YXIgYWN0TmFtZSA9IFwiXCI7XG4gICAgICAgIHZhciB0aGVuO1xuICAgICAgICB2YXIgYW5nbGVJbmZvO1xuXG4gICAgICAgIGFjdFR5cGUgPSBhZ2VudC5hY3RUeXBlO1xuICAgICAgICBpZihhY3RUeXBlID09IFwiaWFcIiB8fCBhY3RUeXBlID09IFwiZWFcIiApIHsgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhZyA9IGFnZW50LnJvdDtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHpvcmRlcjtcbi8vdGhpcy5ub2RlLnNjYWxlWCA9IDE7XG5cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHsgIC8vc3RhcnQgYXR0YWNrXG4gICAgICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgICAgICBzdGFydFBvcyAgPSBjYy52MigoeCkqMzAsICh5KSozMCk7XG4gICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MigoZXgpKjMwLCAoZXkpKjMwKTtcbiAgICAgICAgICAgIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG5cbiAgICAgICAgICAgIC8vaWYgZGlyIG5vIGNoYW5nZWQsIHZ0Lnggb3IgdnQueSBpcyAwLCBhdGFuIHZhbHVlIHNob3VsZCBiZSBpbnZhaWxkXG4gICAgICAgICAgICBpZih2dC54ID09IDApIHtcbiAgICAgICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodnQueSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgICAgIC8vYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC55L3Z0LngpKTtcbiAgICAgICAgICAgICAgICBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LngvdnQueSkpO1xuICAgICAgICAgICAgICAgIGFnID0gdGhpcy5nZXRBZ2VudEFuZ2xlKGFnZW50Lm15cG9zLCB7XCJ4XCI6ZXgsIFwieVwiOmV5fSwgYWcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfSBcblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSkge1xuICAgICAgICAgICAgICAgIGZ4ID0gYWdlbnRGdXR1cmUuZW5lbXlwb3MueDsgXG4gICAgICAgICAgICAgICAgZnkgPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIC8vZnV0dXJlIGFjdHR5cGUgbWF5YmUgaWEgaW5zdGVhZCBvZiBtb3ZlIG9yIHNhLCBpbiB0aGlzIGNhc2Ugc2hvdWxkIG5vdCBiZSBoYW5kbGVkLlxuICAgICAgICAgICAgICAgIGlmKGFnZW50RnV0dXJlICYmIGFnZW50RnV0dXJlLmFjdFR5cGUgIT0gXCJpYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdFR5cGUgPSBhZ2VudEZ1dHVyZS5hY3RUeXBlO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZ4ID0gYWdlbnQuZW5lbXlwb3MueDtcbiAgICAgICAgICAgICAgICBmeSA9IGFnZW50LmVuZW15cG9zLnk7XG4gICAgICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUgJiYgYWdlbnRGdXR1cmUuYWN0VHlwZSAhPSBcImlhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0VHlwZSA9IGFnZW50RnV0dXJlLmFjdFR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoKHgpKjMwLCAoeSkqMzApO1xuICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGZ4KSozMCwgKGZ5KSozMCk7XG4gICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZ0LnggIT0gMCAmJiB2dC55ICE9IDApIHtcbiAgICAgICAgICAgICAgICBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LngvdnQueSkpO1xuICAgICAgICAgICAgICAgIGFnID0gdGhpcy5nZXRBZ2VudEFuZ2xlKGFnZW50Lm15cG9zLCB7XCJ4XCI6ZngsIFwieVwiOmZ5fSwgYWcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuX2FuaW1hdGlvbikge1xuICAgICAgICAgICAgYW5nbGVJbmZvID0gdGhpcy5nZXRBY3RuYW1lQnlBbmdsZShhZywgYWN0VHlwZSk7XG4gICAgICAgICAgICBhY3ROYW1lID0gYW5nbGVJbmZvLmFjdE5hbWU7XG5cbiAgICAgICAgICAgIC8vdXNlZCB0byBtaXJyb3IgYSBzcHJpdGUuXG4vL3RoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2Jsb29kIGJhciBtYXkgZmxpcCB3aGVuIGFnZW50IGZsaXAsIHNob3VsZCBtYWtlIGl0IGJhY2suXG4gICAgICAgICAgICB0aGlzLmJsb29kLnNjYWxlWCA9IHRoaXMubm9kZS5zY2FsZVg7XG5cbiAgICAgICAgICAgIC8vaWYgYWxyZWFkeSBpbiBhdHRhY2sgbW9kZSwganVzdCBza2lwIHRoZSBhbmltYXRpb25cbiAgICAgICAgICAgIGlmKHRoaXMubGFzdEFjdCAhPSBhY3ROYW1lIHx8IGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmlTdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pUGxheShhY3ROYW1lKTtcbi8vdGhpcy5fYW5pbWF0aW9uLnN0b3AoKTtcbi8vdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy93YWxraW5nIGFjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmlQbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuLy90aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbi8vdGhpcy5sYXN0U2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4vKlxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYW5nbGUsIGFjdFR5cGUpO1xuICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG5cbiAgICAgICAgICAgIC8vaWYgYWxyZWFkeSBpbiBhdHRhY2sgbW9kZSwganVzdCBza2lwIHRoZSBhbmltYXRpb25cbiAgICAgICAgICAgIGlmKHRoaXMubGFzdEFjdCAhPSBhY3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgY2hhbmdpbmcgZGlyIGZyZXF1ZW50bHkuIGFnZW50IHdvdWxkIGxvb2tzIHRyZW1ibGUgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICAgIGlmKHRoZW4gLSB0aGlzLm5vdyA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdyA9IHRoZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2lmKHRoaXMubGFzdEFjdCAhPSBhY3ROYW1lICYmIGFjdFR5cGU9PVwic2FcIikge1xuICAgICAgICAgICAgLy8gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vICAgIHZhciBhbmltU3RhdGUgPSB0aGlzLl9hbmltYXRpb24uZ2V0QW5pbWF0aW9uU3RhdGUoYWN0TmFtZSk7XG4gICAgICAgICAgICAvLyAgICBpZiAoYW5pbVN0YXRlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgYW5pbVN0YXRlLm9uKCdsYXN0ZnJhbWUnLCAoZXZlbnQpID0+IHt9LCB0aGlzKTtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICB0aGlzLmxhc3RBY3QgPSBhY3ROYW1lO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICB9XG4qL1xuXG4gICAgICAgIHRoaXMubGFzdEFjdFR5cGUgPSBhY3RUeXBlO1xuICAgIH0sXG5cbiAgICBhbmlQbGF5OiBmdW5jdGlvbihhY3ROYW1lLCByYW5kb21UaW1lPW51bGwpIHtcbiAgICAgICAgaWYodGhpcy5hbmlUeXBlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hbmlUeXBlID09IFwiZHJhZ29uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKGFjdE5hbWUsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYocmFuZG9tVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYW5pU3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgICAgICAvL3Nob3VsZCBkbyBzdG9wIGRyYWdvbiBhbmkgaGVyZS5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19