
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
    console.log(angle + "::::" + actType);
    angle = -90;
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

        if (ag > 180) {
          ag = ag - 360;
        }
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

        if (ag > 180) {
          ag = ag - 360;
        }
      }
    }

    if (this._animation) {
      angleInfo = this.getActnameByAngle(ag, actType);
      actName = angleInfo.actName;
      console.log(actName); //used to mirror a sprite.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL015U3ByaXRlLmpzIl0sIm5hbWVzIjpbImNvbW1vbiIsInJlcXVpcmUiLCJhZ2VudE9iaiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwic3ByQXRsYXMiLCJTcHJpdGVBdGxhcyIsIndyYXBNb2RlIiwiV3JhcE1vZGUiLCJMb29wIiwicm91dGVzIiwibGFzdEFjdCIsImxhc3RBbmdsZSIsImxpZmUiLCJlaWQiLCJvbkxvYWQiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImN0b3IiLCJpbml0IiwicG9zWCIsInBvc1kiLCJub3ciLCJEYXRlIiwiYW5nbGUiLCJncm91cEtpbGwiLCJhdHRhY2tpbmciLCJhbmlUeXBlIiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsInJvbGUiLCJjcmFiQm9keU5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIl9hbmltYXRpb24iLCJkcmFnb25Cb25lcyIsIkFybWF0dXJlRGlzcGxheSIsIkFuaW1hdGlvbiIsInNldEluaXRQb3MiLCJweCIsInB5IiwicHQiLCJ2MiIsInB1c2giLCJ1cGRhdGVQb3MiLCJtb3ZlVG8iLCJueCIsIm55IiwiYXAiLCJnZXRBbmNob3JQb2ludCIsInNpemUiLCJnZXRDb250ZW50U2l6ZSIsIngiLCJ3aWR0aCIsInNoYWRvd01vdmVUbyIsInNldFBvc2l0aW9uIiwic2hhZG93IiwiZGlzcFNoYWRvdyIsImZyYW1lTm8iLCJzaGFkb3dOb2RlIiwiZnJhbWVJbWciLCJhY3QiLCJhY3RUbXAiLCJzcGxpdCIsImFjdERpciIsImFjdFR5cGUiLCJzY2FsZVgiLCJsYXN0U2NhbGVYIiwiYWN0aXZlIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJfbmFtZSIsIlNwcml0ZSIsImUiLCJnZXRBY3RuYW1lQnlBbmdsZSIsImFjdE5hbWUiLCJyZXQiLCJzcGVjaWFsQWN0bmFtZSIsInNwZWNpYWxBY3QiLCJzZXRJZCIsImFpZCIsImhpZGUiLCJzZXRTaGFkb3ciLCJnZXRBZ2VudEFuZ2xlIiwib1BvcyIsImRQb3MiLCJ0YW5BbmdsZSIsImR4IiwiZHkiLCJveCIsIm95IiwieSIsImlmRmx5QWdlbnQiLCJwbGF5QW5nbGVBbmltYXRpb25OZWFyIiwiYWdlbnQiLCJhZ2VudEZ1dHVyZSIsImlzTWFpblBsYXllciIsInN0YXJ0UG9zIiwibXlwb3MiLCJlbmVteVBvcyIsImVuZW15cG9zIiwiem9yZGVyIiwicGFyc2VJbnQiLCJyYW5kb21UaW1lIiwiTWF0aCIsImNlaWwiLCJyYW5kb20iLCJmeCIsImZ5IiwidnQiLCJhZyIsInRhcmdldFBvcyIsImFuZ2xlSW5mbyIsImV4IiwiZXkiLCJkaXN0YW5jZSIsInN1YiIsIm1hZyIsImF0dGFja0Rpc3RhbmNlIiwiekluZGV4IiwiZ2V0QXR0YWNrRGlzdGFuY2UiLCJQSSIsImF0YW4iLCJhYnMiLCJibG9vZCIsInBsYXkiLCJwbGF5QW5nbGVBbmltYXRpb25SZW1vdGUiLCJzdGFydEVQb3MiLCJ0YXJnZXRFUG9zIiwidnRFIiwiX3NlbGYiLCJ0aGVuIiwicm90IiwiYW5pU3RvcCIsImFuaVBsYXkiLCJsYXN0QWN0VHlwZSIsInBsYXlBbmltYXRpb24iLCJzdG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRixRQURKO0FBR0xHLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUVILEVBQUUsQ0FBQ0ksV0FETDtBQUVSQyxJQUFBQSxRQUFRLEVBQUVMLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxJQUZkO0FBR1JDLElBQUFBLE1BQU0sRUFBQyxFQUhDO0FBSVJDLElBQUFBLE9BQU8sRUFBQyxFQUpBO0FB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QUFDdkQsV0FBS08sVUFBTCxDQUFnQnlHLGFBQWhCLENBQThCN0QsT0FBOUIsRUFBdUMsQ0FBdkM7QUFDSCxLQUZELE1BRU87QUFDSCxVQUFHNEIsVUFBSCxFQUFlO0FBQ1gsYUFBS3hFLFVBQUwsQ0FBZ0I4RixJQUFoQixDQUFxQmxELE9BQXJCLEVBQThCNEIsVUFBOUI7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLeEUsVUFBTCxDQUFnQjhGLElBQWhCLENBQXFCbEQsT0FBckI7QUFDSDtBQUNKO0FBQ0osR0FsMkJJO0FBbzJCTDBELEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixRQUFHLEtBQUs3RyxPQUFMLEtBQWlCQyxTQUFqQixJQUE4QixLQUFLRCxPQUFMLElBQWdCLFFBQWpELEVBQTJELENBQ3ZEO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS08sVUFBTCxDQUFnQjBHLElBQWhCO0FBQ0g7QUFDSixHQTEyQkksQ0E0MkJMOztBQTUyQkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG52YXIgYWdlbnRPYmogPSByZXF1aXJlKFwiQWdlbnRPYmpcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBhZ2VudE9iaixcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3ByQXRsYXM6IGNjLlNwcml0ZUF0bGFzLFxuICAgICAgICB3cmFwTW9kZTogY2MuV3JhcE1vZGUuTG9vcCxcbiAgICAgICAgcm91dGVzOltdLFxuICAgICAgICBsYXN0QWN0OlwiXCIsXG4gICAgICAgIGxhc3RBbmdsZTotMSxcbiAgICAgICAgbGlmZTotMSxcbiAgICAgICAgZWlkOi0xLFxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJHYW1lXCIpO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgfSxcblxuICAgIGN0b3IoKSB7XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnBvc1ggPSAwO1xuICAgICAgICB0aGlzLnBvc1kgPSAwO1xuICAgICAgICB0aGlzLm5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAtOTk5O1xuICAgICAgICB0aGlzLmdyb3VwS2lsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF0dGFja2luZyA9IGZhbHNlO1xuXG4gICAgICAgIC8vaWYgZHJhZ29uYm9uZXMgYW5pbWF0b3Igbm9kZVxuICAgICAgICBpZih0aGlzLmFuaVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFuaVR5cGUgPT0gXCJkcmFnb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb2xlOlwiICsgdGhpcy5yb2xlKTtcblxuICAgICAgICAgICAgdmFyIGNyYWJCb2R5Tm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNyYWJfYm9keVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IGNyYWJCb2R5Tm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCItLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAvL3RoaXMuX2FuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKCdza2Vfbl9hdHRhY2snLCAwKTtcbiAgICAgICAgfSBlbHNlIHsgIC8vaWYgZnJhbWUgYW5pbWF0b3Igbm9kZVxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5XcmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbi8qICAgIFxuICAgIHNldEVuZW15OiBmdW5jdGlvbihlbmVteU9iaikge1xuICAgICAgICBpZihlbmVteU9iaikge1xuICAgICAgICAgICAgdGhpcy5laWQgPSBlbmVteU9iai5uYW1lO1xuICAgICAgICAgICAgdGhpcy5lbmVteSA9IGVuZW15T2JqOyAgICAgICAgICAgIFxuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWlkID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuZW5lbXkgPSBudWxsOyAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25lbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBhZ2VudE5vZGU7XG4gICAgICAgIGlmKHRoaXMuZW5lbXkuaXNWYWxpZCkge1xuICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5lbmVteS5nZXRDb21wb25lbnQoJ1NrZVNwcml0ZScpO1xuICAgICAgICAgICAgYWdlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICB9IFxuICAgICAgICAvL3RoaXMuc2hvb3RBcnJvdyh0aGlzLm94LCB0aGlzLm95LCB0aGlzLmV4LCB0aGlzLmV5LCB0aGlzLmFycm93KTtcbiAgICB9LFxuKi9cblxuICAgIHNldEluaXRQb3M6IGZ1bmN0aW9uKHB4LCBweSkge1xuICAgICAgICB0aGlzLnBvc1ggPSBweDtcbiAgICAgICAgdGhpcy5wb3NZID0gcHk7XG4gICAgICAgIHZhciBwdCA9IGNjLnYyKHRoaXMucG9zWCwgdGhpcy5wb3NZKTtcblxuICAgICAgICB0aGlzLnJvdXRlcy5wdXNoKHB0KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUG9zOiBmdW5jdGlvbihweCwgcHkpIHtcbiAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG4gICAgICAgIHZhciBueCxueTtcbiAgICAgICAgdmFyIGFwID0gdGhpcy5ub2RlLmdldEFuY2hvclBvaW50KCk7XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIFxuICAgICAgICBueCA9ICgwLjUtYXAueCkgKiBzaXplLndpZHRoICsgcHg7XG4gICAgICAgIC8vbnkgPSAoMC41LWFwLnkpICogc2l6ZS5oZWlnaHQgKyBweTtcbiAgICAgICAgbnkgPSBweTtcblxuICAgICAgICB2YXIgc2hhZG93TW92ZVRvID0gY2MudjIobngsIG55KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuXG4gICAgICAgIGlmKHRoaXMuc2hhZG93KSB7IFxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfSxcblxuLypcbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMubm9kZS5zY2FsZVggPSAwLjM7XG4gICAgICAgIC8vdGhpcy5ub2RlLnNjYWxlWSA9IDAuMztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMlwiKTtcbiAgICAgICAgdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuXG4gICAgICAgIC8vbm9kZSBkZXN0b3J5IGluIHNwcml0ZSBhZnRlcmtpbGwgZnVuY1xuICAgICAgICAvL3RoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiovXG5cbiAgICBkaXNwU2hhZG93OiBmdW5jdGlvbihmcmFtZU5vKSB7XG4gICAgICAgIC8vc2hhZG93IG9iamVjdCBtYXkgbm90IHJlYWR5IGluIGluaXQoKSB3aGVuIHBsYXlpbmdcbiAgICAgICAgaWYoIXRoaXMuc2hhZG93KSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNoYWRvd05vZGUgPSB0aGlzLnNoYWRvdztcbiAgICAgICAgdmFyIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L2Uvc2tlX3dhbGtfZVwiK2ZyYW1lTm87XG4gICAgICAgIHZhciBhY3QgPSB0aGlzLmxhc3RBY3Q7XG5cbiAgICAgICAgaWYoIWFjdCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBhY3RUbXAgPSB0aGlzLmxhc3RBY3Quc3BsaXQoXCJfXCIpO1xuXG4gICAgICAgIHZhciBhY3REaXIgPSBhY3RUbXBbMV07XG4gICAgICAgIHZhciBhY3RUeXBlID0gYWN0VG1wWzJdO1xuICAgICAgICB2YXIgc2NhbGVYID0gdGhpcy5sYXN0U2NhbGVYO1xuXG4gICAgICAgIGlmKGFjdERpciA9PSBcImVuMVwiIHx8IGFjdERpciA9PSBcImVuMlwiIHx8IGFjdERpciA9PSBcImVuM1wiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9lbi9za2Vfd2Fsa19lblwiK2ZyYW1lTm87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhY3REaXIgPT0gXCJzZTFcIiB8fCBhY3REaXIgPT0gXCJzZTJcIiB8fCBhY3REaXIgPT0gXCJzZTNcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvc2Uvc2tlX3dhbGtfc2VcIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwic1wiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9zL3NrZV93YWxrX3NcIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwiblwiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9uL3NrZV93YWxrX25cIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwiZVwiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9lL3NrZV93YWxrX2VcIitmcmFtZU5vO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFkb3cuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoZnJhbWVJbWcsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgaWYoc2hhZG93Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNoYWRvd05vZGUuX25hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGFkb3dOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4vKlxuICAgIG1vdmU6IGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgIGlmKHRoaXMucmVtb3ZlRmxhZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbiA9IHRoaXMucm91dGVzLmxlbmd0aDtcbiAgICAgICAgdmFyIG1vdmVUbztcblxuICAgICAgICBpZihsZW4gPT0gMCkgcmV0dXJuO1xuICAgICAgICBpZihsZW4gPT0gMSkge1xuICAgICAgICAgICAgbW92ZVRvID0gdGhpcy5yb3V0ZXNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3ZlVG8gPSB0aGlzLnJvdXRlcy5zaGlmdCgpOyAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgaWYodGhpcy5zaGFkb3cgJiYgdGhpcy5zaGFkb3cuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24obW92ZVRvKTsgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlYXN0QW5pbUZyYW1lcyA9IFtdLFxuICAgICAgICAgICAgc3RyID0gXCJcIixcbiAgICAgICAgICAgIGZyYW1lLFxuICAgICAgICAgICAgYW5pbWF0aW9uO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDQ7IGkrKykgeyAgICAgICAgXG4gICAgICAgICAgICBzdHIgPSBcImM1dVwiICsgaTtcbiAgICAgICAgICAgIGZyYW1lID0gdGhpcy5zcHJBdGxhcy5nZXRTcHJpdGVGcmFtZShzdHIpO1xuICAgICAgICAgICAgZWFzdEFuaW1GcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2FuaW1hdGlvbiA9IG5ldyBjYy5BbmltYXRpb24oZWFzdEFuaW1GcmFtZXMpO1xuXG4gICAgICAgIHZhciBjbGlwID0gY2MuQW5pbWF0aW9uQ2xpcC5jcmVhdGVXaXRoU3ByaXRlRnJhbWVzKGVhc3RBbmltRnJhbWVzLGZyYW1lcy5sZW5ndGgpO1xuICAgICAgICBjbGlwLm5hbWUgPSBcImFuaW1fMDAxXCI7XG4gICAgICAgIGNsaXAuc3BlZWQgPSAwLjA4O1xuICAgICAgICBjbGlwLnNhbXBsZSA9IDQ7XG4gICAgICAgIGNsaXAud3JhcE1vZGUgPSB0aGlzLndyYXBNb2RlO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24uYWRkQ2xpcChjbGlwKTtcbiAgICB9LFxuXG4gICAgcGxheUFuaW1hdGlvbjogZnVuY3Rpb24gKHdyYXBNb2RlID0gY2MuV3JhcE1vZGUuRGVmYXVsdCwgc3BlZWQgPSAwLjUsIHNhbXBsZSA9IDYwKSB7XG4gICAgICAgIGlmKHRoaXMuX2FuaW1hdGlvbikge1xuICAgICAgICAgICAgdmFyIGFuaW1TdGF0ZSA9IHRoaXMuX2FuaW1hdGlvbi5nZXRBbmltYXRpb25TdGF0ZShcImFuaW1fMDAxXCIpO1xuICAgICAgICAgICAgYW5pbVN0YXRlLmNsaXAud3JhcE1vZGUgPSB3cmFwTW9kZTtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5jbGlwLnNwZWVkID0gc3BlZWQ7XG4gICAgICAgICAgICBhbmltU3RhdGUuY2xpcC5zYW1wbGUgPSBzYW1wbGU7XG4gICAgICAgICAgICBhbmltU3RhdGUucmVwZWF0Q291bnQgPSBJbmZpbml0eTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiYW5pbV8wMDFcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0SW5pdEFjdDogZnVuY3Rpb24oYW5nbGUsIGFjdFR5cGUpIHtcbiAgICAgICAgdmFyIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYW5nbGUsIGFjdFR5cGUpO1xuICAgICAgICB0aGlzLmxhc3RBY3QgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgZ2V0QWN0bmFtZUJ5QW5nbGVfYmFrOiBmdW5jdGlvbihhbmdsZSwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgYWN0TmFtZT1cIlwiO1xuICAgICAgICB2YXIgc2NhbGVYID0gMTtcbiAgICAgICAgdmFyIHJldCA9IHt9O1xuXG4gICAgICAgIGlmKGFuZ2xlPj0wICYmIGFuZ2xlPD0xMS4yNSoxKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjEgJiYgYW5nbGU8PTExLjI1KjMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuM19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjMgJiYgYW5nbGU8PTExLjI1KjUpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjUgJiYgYW5nbGU8PTExLjI1KjcpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjcgJiYgYW5nbGU8PTExLjI1KjkpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqOSAmJiBhbmdsZTw9MTEuMjUqMTEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjExICYmIGFuZ2xlPD0xMS4yNSoxMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMTMgJiYgYW5nbGU8PTExLjI1KjE1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxNSB8fCBhbmdsZTw9MTgwKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZWxzZSBpZihhbmdsZTwwICYmIGFuZ2xlPj0xMS4yNSotMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTEgJiYgYW5nbGU+PTExLjI1Ki0zKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTMgJiYgYW5nbGU+PTExLjI1Ki01KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotNSAmJiBhbmdsZT49MTEuMjUqLTcpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki03ICYmIGFuZ2xlPj0xMS4yNSotOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTkgJiYgYW5nbGU+PTExLjI1Ki0xMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UxX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xMSAmJiBhbmdsZT49MTEuMjUqLTEzKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTEzICYmIGFuZ2xlPj0xMS4yNSotMTUpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlM19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTE1ICYmIGFuZ2xlPi0xODApIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS06XCIrYW5nbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0TmFtZSA9IHRoaXMucm9sZSArXCJfXCIrIGFjdE5hbWU7XG5cbiAgICAgICAgcmV0LmFjdE5hbWUgPSBhY3ROYW1lO1xuICAgICAgICByZXQuc2NhbGVYID0gc2NhbGVYO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG4qL1xuXG4gICAgZ2V0QWN0bmFtZUJ5QW5nbGU6IGZ1bmN0aW9uKGFuZ2xlLCBhY3RUeXBlKSB7XG5cblxuY29uc29sZS5sb2coYW5nbGUgK1wiOjo6OlwiKyBhY3RUeXBlKTtcblxuYW5nbGUgPSAtOTA7XG5cbiAgICAgICAgdmFyIGFjdE5hbWU9XCJcIjtcbiAgICAgICAgdmFyIHNjYWxlWCA9IDE7XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgdmFyIHNwZWNpYWxBY3RuYW1lID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYW5nbGU+MjIuNSotMSAmJiBhbmdsZTw9MjIuNSoxKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqMSAmJiBhbmdsZTw9MjIuNSozKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjMgJiYgYW5nbGU8PTIyLjUqNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjUgJiYgYW5nbGU8PTIyLjUqNykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MjIuNSo3IHx8IGFuZ2xlPC0yMi41KjkpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki0xICYmIGFuZ2xlPj0yMi41Ki0zKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MjIuNSotMyAmJiBhbmdsZT49MjIuNSotNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MjIuNSotNSAmJiBhbmdsZT49MjIuNSotNykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAvLyBzdGFydCBhdHRhY2tcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlPDIyLjUqLTcpe1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikgeyAgIC8vIHN0YXJ0IGF0dGFja1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tZXJyb3IgYW5nbGUtLS0tLS0tLS0tLS0tLTpcIithbmdsZSk7XG4gICAgICAgIH1cblxuXG5cbmlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgIGFjdE5hbWUgPSBcInNrZVwiICtcIl9cIisgYWN0TmFtZTtcbn0gZWxzZSB7XG4gICAgICAgIGFjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xufVxuXG5cbi8vYWN0TmFtZSA9IHRoaXMucm9sZSArXCJfXCIrIGFjdE5hbWU7XG5cblxuIFxuICAgICAgICBzcGVjaWFsQWN0bmFtZSA9IHRoaXMuc3BlY2lhbEFjdChhY3RUeXBlKTtcbiAgICAgICAgaWYoc3BlY2lhbEFjdG5hbWUpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBzcGVjaWFsQWN0bmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldC5hY3ROYW1lID0gYWN0TmFtZTtcbiAgICAgICAgcmV0LnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgc3BlY2lhbEFjdDogZnVuY3Rpb24oYWN0VHlwZSkge1xuICAgICAgICAvLyBpZiBqdXN0IDEgdnMgMSBhdHRhY2tcbiAgICAgICAgaWYoIXRoaXMuZ3JvdXBLaWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcInNhXCIgJiYgdGhpcy5yb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaHJfYWxsX2tpbGxcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldElkOiBmdW5jdGlvbihhaWQpIHtcbiAgICAgICAgdGhpcy5haWQgPSBhaWQ7XG5cbiAgICAgICAgLy92YXIgZXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oXCJldmVudF9lZmZlY3RcIiwgdHJ1ZSk7XG4gICAgICAgIC8vZXZlbnQuZGV0YWlsID0gXCIxMjNcIjtcbiAgICAgICAgLy90aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldFNoYWRvdzogZnVuY3Rpb24oc2hhZG93KSB7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gc2hhZG93O1xuICAgICAgICB0aGlzLnNoYWRvdy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRBZ2VudEFuZ2xlOiBmdW5jdGlvbihvUG9zLCBkUG9zLCB0YW5BbmdsZSkge1xuICAgICAgICB2YXIgZHgsZHksb3gsb3k7XG4gICAgICAgIHZhciBhbmdsZTtcblxuICAgICAgICBkeCA9IGRQb3MueDtcbiAgICAgICAgZHkgPSBkUG9zLnk7XG4gICAgICAgIG94ID0gb1Bvcy54O1xuICAgICAgICBveSA9IG9Qb3MueTtcblxuICAgICAgICBpZihkeC1veD4wICYmIGR5LW95PjApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gdGFuQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veD4wICYmIGR5LW95PDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gMTgwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g8MCAmJiBkeS1veTwwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDE4MCt0YW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGR4LW94PDAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAxODA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeS1veT09MCAmJiBkeC1veD4wKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDkwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHktb3k9PTAgJiYgZHgtb3g8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAtOTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndyb25nIGFuZ2xlIGluIEZ1bmMgTXlTcHJpdGUtPmdldEFnZW50QW5nbGUoKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbmdsZTtcbiAgICB9LFxuXG4gICAgaWZGbHlBZ2VudDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICBpZihyb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcGxheUFuZ2xlQW5pbWF0aW9uTmVhcjogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgaWYodGhpcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNjLnYyKGFnZW50Lm15cG9zLngsIGFnZW50Lm15cG9zLnkpO1xuICAgICAgICB2YXIgZW5lbXlQb3MgPSBjYy52MihhZ2VudC5lbmVteXBvcy54LCBhZ2VudC5lbmVteXBvcy55KTtcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzItYWdlbnQubXlwb3MueSk7XG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIGFjdFR5cGUgPSBhZ2VudC5hY3RUeXBlO1xuICAgICAgICB2YXIgZngsZnksdnQsYWc9MCx0YXJnZXRQb3MsYW5nbGVJbmZvO1xuXG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDtcbiAgICAgICAgdmFyIHkgPSBhZ2VudC5teXBvcy55O1xuICAgICAgICB2YXIgZXggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55O1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHN0YXJ0UG9zLnN1YihlbmVteVBvcykubWFnKCk7XG4gICAgICAgIHZhciBhdHRhY2tEaXN0YW5jZTtcblxuICAgICAgICAvLyBmbHkgYWdlbnQgc2hvdWxkIGhvdmVyIG92ZXIgYW55IG90aGVyIGFnZW50LlxuICAgICAgICBpZighdGhpcy5pZkZseUFnZW50KGFnZW50LnJvbGUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gem9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhdHRhY2tEaXN0YW5jZSA9IHRoaXMuZ2V0QXR0YWNrRGlzdGFuY2UoYWdlbnQpO1xuXG4gICAgICAgICAgICAvLzEuNSBpcyB0aGUgZGlzdGFuY2UgYWp1c3RtZW50IHZhcmlhYmxlLCBzaG91bGQgYmUgYWp1c3QgYWNjb3JkaW5nIHRvIGVhY2ggYWdlbnQgc2l6ZS5cbiAgICAgICAgICAgIC8vYXR0YWNrRGlzdGFuY2UgPSAoYWdlbnQuc2l6ZSArIGFnZW50LmVzaXplKSowLjUqMS41O1xuXG4gICAgICAgICAgICBpZihkaXN0YW5jZTw9YXR0YWNrRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoeCwgeSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgICAgICBpZih2dC54ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodnQueSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LngvdnQueSkpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpleCwgXCJ5XCI6ZXl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcInNhXCIpO1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICAgICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnggPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy54OyBcbiAgICAgICAgICAgICAgICAgICAgZnkgPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ4ID0gYWdlbnQuZW5lbXlwb3MueDtcbiAgICAgICAgICAgICAgICAgICAgZnkgPSBhZ2VudC5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydFBvcyAgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MihmeCwgZnkpO1xuICAgICAgICAgICAgICAgIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG5cbiAgICAgICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueC92dC55KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpmeCwgXCJ5XCI6Znl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcIm1vdmVcIik7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG4gICAgICAgICAgICAgICAgLy91c2VkIHRvIG1pcnJvciBhIHNwcml0ZS5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9ibG9vZCBiYXIgbWF5IGZsaXAgd2hlbiBhZ2VudCBmbGlwLCBzaG91bGQgbWFrZSBpdCBiYWNrLlxuICAgICAgICAgICAgdGhpcy5ibG9vZC5zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1hdHRhY2tEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy9pZih0aGlzLnBsYXlFZmZlY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLnBsYXlFZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCF0aGlzLmF0dGFja2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlBbmdsZUFuaW1hdGlvblJlbW90ZTogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgdmFyIGZ4LGZ5LGFjdFR5cGU7XG4gICAgICAgIHZhciBhZyA9IDA7XG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDsgXG4gICAgICAgIHZhciB5ID0gYWdlbnQubXlwb3MueTsgXG4gICAgICAgIHZhciBleCA9IGFnZW50LmVuZW15cG9zLng7IFxuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55OyBcblxuICAgICAgICB2YXIgc3RhcnRQb3MsdGFyZ2V0UG9zLHN0YXJ0RVBvcywgdGFyZ2V0RVBvcywgdnQsIHZ0RTtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzIteSk7XG5cbiAgICAgICAgLy90b3RhbCBhbmltYXRvciBkdXJhdGlvbiBpcyAxLjI1cywgc28gdGFrZSBhIHJhbmRvbSB0aW1lIGZyb20gMC0xLjI1IHRvIHByZXZlbnQgc2FtZSBhY3Rpb25cbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMjUpLzEwMDtcbiAgICAgICAgdmFyIGFjdE5hbWUgPSBcIlwiO1xuICAgICAgICB2YXIgdGhlbjtcbiAgICAgICAgdmFyIGFuZ2xlSW5mbztcblxuICAgICAgICBhY3RUeXBlID0gYWdlbnQuYWN0VHlwZTtcbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcImlhXCIgfHwgYWN0VHlwZSA9PSBcImVhXCIgKSB7IFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYWcgPSBhZ2VudC5yb3Q7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB6b3JkZXI7XG4vL3RoaXMubm9kZS5zY2FsZVggPSAxO1xuXG4gICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAvL3N0YXJ0IGF0dGFja1xuICAgICAgICAgICAgLy8gZGlyIGFjY29yZGluZyB0byBlbmVteSBwb3NpdGlvblxuICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoKHgpKjMwLCAoeSkqMzApO1xuICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGV4KSozMCwgKGV5KSozMCk7XG4gICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZ0LnggIT0gMCAmJiB2dC55ICE9IDApIHtcbiAgICAgICAgICAgICAgICAvL2FnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueS92dC54KSk7XG4gICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmV4LCBcInlcIjpleX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUpIHtcbiAgICAgICAgICAgICAgICBmeCA9IGFnZW50RnV0dXJlLmVuZW15cG9zLng7IFxuICAgICAgICAgICAgICAgIGZ5ID0gYWdlbnRGdXR1cmUuZW5lbXlwb3MueTtcbiAgICAgICAgICAgICAgICAvL2Z1dHVyZSBhY3R0eXBlIG1heWJlIGlhIGluc3RlYWQgb2YgbW92ZSBvciBzYSwgaW4gdGhpcyBjYXNlIHNob3VsZCBub3QgYmUgaGFuZGxlZC5cbiAgICAgICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSAmJiBhZ2VudEZ1dHVyZS5hY3RUeXBlICE9IFwiaWFcIikge1xuICAgICAgICAgICAgICAgICAgICBhY3RUeXBlID0gYWdlbnRGdXR1cmUuYWN0VHlwZTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmeCA9IGFnZW50LmVuZW15cG9zLng7XG4gICAgICAgICAgICAgICAgZnkgPSBhZ2VudC5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIGlmKGFnZW50RnV0dXJlICYmIGFnZW50RnV0dXJlLmFjdFR5cGUgIT0gXCJpYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdFR5cGUgPSBhZ2VudEZ1dHVyZS5hY3RUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKChmeCkqMzAsIChmeSkqMzApO1xuICAgICAgICAgICAgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcblxuICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnggPSAwLjE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICB2dC55ID0gMC4xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmZ4LCBcInlcIjpmeX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYWcsIGFjdFR5cGUpO1xuICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG5jb25zb2xlLmxvZyhhY3ROYW1lKTtcblxuXG4gICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuLy90aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcblxuICAgICAgICAgICAgLy9ibG9vZCBiYXIgbWF5IGZsaXAgd2hlbiBhZ2VudCBmbGlwLCBzaG91bGQgbWFrZSBpdCBiYWNrLlxuICAgICAgICAgICAgdGhpcy5ibG9vZC5zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSB8fCBhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pU3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaVBsYXkoYWN0TmFtZSk7XG4vL3RoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4vL3RoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2Fsa2luZyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pUGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbi8vdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4vL3RoaXMubGFzdFNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuLypcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgICAgIHRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIC8vIHRvIGF2b2lkIGNoYW5naW5nIGRpciBmcmVxdWVudGx5LiBhZ2VudCB3b3VsZCBsb29rcyB0cmVtYmxlIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgICBpZih0aGVuIC0gdGhpcy5ub3cgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3cgPSB0aGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9pZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSAmJiBhY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgIC8vICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyAgICB2YXIgYW5pbVN0YXRlID0gdGhpcy5fYW5pbWF0aW9uLmdldEFuaW1hdGlvblN0YXRlKGFjdE5hbWUpO1xuICAgICAgICAgICAgLy8gICAgaWYgKGFuaW1TdGF0ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgIGFuaW1TdGF0ZS5vbignbGFzdGZyYW1lJywgKGV2ZW50KSA9PiB7fSwgdGhpcyk7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0U2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgfVxuKi9cblxuICAgICAgICB0aGlzLmxhc3RBY3RUeXBlID0gYWN0VHlwZTtcbiAgICB9LFxuXG4gICAgYW5pUGxheTogZnVuY3Rpb24oYWN0TmFtZSwgcmFuZG9tVGltZT1udWxsKSB7XG4gICAgICAgIGlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheUFuaW1hdGlvbihhY3ROYW1lLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHJhbmRvbVRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFuaVN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmFuaVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFuaVR5cGUgPT0gXCJkcmFnb25cIikge1xuICAgICAgICAgICAgLy9zaG91bGQgZG8gc3RvcCBkcmFnb24gYW5pIGhlcmUuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==