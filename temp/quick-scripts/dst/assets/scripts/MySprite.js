
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL015U3ByaXRlLmpzIl0sIm5hbWVzIjpbImNvbW1vbiIsInJlcXVpcmUiLCJhZ2VudE9iaiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwic3ByQXRsYXMiLCJTcHJpdGVBdGxhcyIsIndyYXBNb2RlIiwiV3JhcE1vZGUiLCJMb29wIiwicm91dGVzIiwibGFzdEFjdCIsImxhc3RBbmdsZSIsImxpZmUiLCJlaWQiLCJvbkxvYWQiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImN0b3IiLCJpbml0IiwicG9zWCIsInBvc1kiLCJub3ciLCJEYXRlIiwiYW5nbGUiLCJncm91cEtpbGwiLCJhdHRhY2tpbmciLCJhbmlUeXBlIiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsInJvbGUiLCJjcmFiQm9keU5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIl9hbmltYXRpb24iLCJkcmFnb25Cb25lcyIsIkFybWF0dXJlRGlzcGxheSIsIkFuaW1hdGlvbiIsInNldEluaXRQb3MiLCJweCIsInB5IiwicHQiLCJ2MiIsInB1c2giLCJ1cGRhdGVQb3MiLCJtb3ZlVG8iLCJueCIsIm55IiwiYXAiLCJnZXRBbmNob3JQb2ludCIsInNpemUiLCJnZXRDb250ZW50U2l6ZSIsIngiLCJ3aWR0aCIsInNoYWRvd01vdmVUbyIsInNldFBvc2l0aW9uIiwic2hhZG93IiwiZGlzcFNoYWRvdyIsImZyYW1lTm8iLCJzaGFkb3dOb2RlIiwiZnJhbWVJbWciLCJhY3QiLCJhY3RUbXAiLCJzcGxpdCIsImFjdERpciIsImFjdFR5cGUiLCJzY2FsZVgiLCJsYXN0U2NhbGVYIiwiYWN0aXZlIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJfbmFtZSIsIlNwcml0ZSIsImUiLCJnZXRBY3RuYW1lQnlBbmdsZSIsImFjdE5hbWUiLCJyZXQiLCJzcGVjaWFsQWN0bmFtZSIsInNwZWNpYWxBY3QiLCJzZXRJZCIsImFpZCIsImhpZGUiLCJzZXRTaGFkb3ciLCJnZXRBZ2VudEFuZ2xlIiwib1BvcyIsImRQb3MiLCJ0YW5BbmdsZSIsImR4IiwiZHkiLCJveCIsIm95IiwieSIsImlmRmx5QWdlbnQiLCJwbGF5QW5nbGVBbmltYXRpb25OZWFyIiwiYWdlbnQiLCJhZ2VudEZ1dHVyZSIsImlzTWFpblBsYXllciIsInN0YXJ0UG9zIiwibXlwb3MiLCJlbmVteVBvcyIsImVuZW15cG9zIiwiem9yZGVyIiwicGFyc2VJbnQiLCJyYW5kb21UaW1lIiwiTWF0aCIsImNlaWwiLCJyYW5kb20iLCJmeCIsImZ5IiwidnQiLCJhZyIsInRhcmdldFBvcyIsImFuZ2xlSW5mbyIsImV4IiwiZXkiLCJkaXN0YW5jZSIsInN1YiIsIm1hZyIsImF0dGFja0Rpc3RhbmNlIiwiekluZGV4IiwiZ2V0QXR0YWNrRGlzdGFuY2UiLCJQSSIsImF0YW4iLCJhYnMiLCJibG9vZCIsInBsYXkiLCJwbGF5QW5nbGVBbmltYXRpb25SZW1vdGUiLCJzdGFydEVQb3MiLCJ0YXJnZXRFUG9zIiwidnRFIiwiX3NlbGYiLCJ0aGVuIiwicm90IiwiYW5pU3RvcCIsImFuaVBsYXkiLCJsYXN0QWN0VHlwZSIsInBsYXlBbmltYXRpb24iLCJzdG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRixRQURKO0FBR0xHLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUVILEVBQUUsQ0FBQ0ksV0FETDtBQUVSQyxJQUFBQSxRQUFRLEVBQUVMLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxJQUZkO0FBR1JDLElBQUFBLE1BQU0sRUFBQyxFQUhDO0FBSVJDLElBQUFBLE9BQU8sRUFBQyxFQUpBO0FB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OEI3RCxPQUE5QixFQUF1QyxDQUF2QztBQUNILEtBRkQsTUFFTztBQUNILFVBQUc0QixVQUFILEVBQWU7QUFDWCxhQUFLeEUsVUFBTCxDQUFnQjhGLElBQWhCLENBQXFCbEQsT0FBckIsRUFBOEI0QixVQUE5QjtBQUNILE9BRkQsTUFFTztBQUNILGFBQUt4RSxVQUFMLENBQWdCOEYsSUFBaEIsQ0FBcUJsRCxPQUFyQjtBQUNIO0FBQ0o7QUFDSixHQWoyQkk7QUFtMkJMMEQsRUFBQUEsT0FBTyxFQUFFLG1CQUFXO0FBQ2hCLFFBQUcsS0FBSzdHLE9BQUwsS0FBaUJDLFNBQWpCLElBQThCLEtBQUtELE9BQUwsSUFBZ0IsUUFBakQsRUFBMkQsQ0FDdkQ7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLTyxVQUFMLENBQWdCMEcsSUFBaEI7QUFDSDtBQUNKLEdBejJCSSxDQTIyQkw7O0FBMzJCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29tbW9uID0gcmVxdWlyZShcIkNvbW1vblwiKTtcbnZhciBhZ2VudE9iaiA9IHJlcXVpcmUoXCJBZ2VudE9ialwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGFnZW50T2JqLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcHJBdGxhczogY2MuU3ByaXRlQXRsYXMsXG4gICAgICAgIHdyYXBNb2RlOiBjYy5XcmFwTW9kZS5Mb29wLFxuICAgICAgICByb3V0ZXM6W10sXG4gICAgICAgIGxhc3RBY3Q6XCJcIixcbiAgICAgICAgbGFzdEFuZ2xlOi0xLFxuICAgICAgICBsaWZlOi0xLFxuICAgICAgICBlaWQ6LTEsXG4gICAgfSxcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMubGF5b3V0T3AgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIkdhbWVcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICB9LFxuXG4gICAgY3RvcigpIHtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IDA7XG4gICAgICAgIHRoaXMucG9zWSA9IDA7XG4gICAgICAgIHRoaXMubm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5hbmdsZSA9IC05OTk7XG4gICAgICAgIHRoaXMuZ3JvdXBLaWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXR0YWNraW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy9pZiBkcmFnb25ib25lcyBhbmltYXRvciBub2RlXG4gICAgICAgIGlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJvbGU6XCIgKyB0aGlzLnJvbGUpO1xuXG4gICAgICAgICAgICB2YXIgY3JhYkJvZHlOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY3JhYl9ib2R5XCIpO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gY3JhYkJvZHlOb2RlLmdldENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgIC8vdGhpcy5fYW5pbWF0aW9uLnBsYXlBbmltYXRpb24oJ3NrZV9uX2F0dGFjaycsIDApO1xuICAgICAgICB9IGVsc2UgeyAgLy9pZiBmcmFtZSBhbmltYXRvciBub2RlXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLldyYXBNb2RlID0gY2MuV3JhcE1vZGUuTG9vcDtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuLyogICAgXG4gICAgc2V0RW5lbXk6IGZ1bmN0aW9uKGVuZW15T2JqKSB7XG4gICAgICAgIGlmKGVuZW15T2JqKSB7XG4gICAgICAgICAgICB0aGlzLmVpZCA9IGVuZW15T2JqLm5hbWU7XG4gICAgICAgICAgICB0aGlzLmVuZW15ID0gZW5lbXlPYmo7ICAgICAgICAgICAgXG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5laWQgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5lbmVteSA9IG51bGw7ICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbmVuZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGFnZW50Tm9kZTtcbiAgICAgICAgaWYodGhpcy5lbmVteS5pc1ZhbGlkKSB7XG4gICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmVuZW15LmdldENvbXBvbmVudCgnU2tlU3ByaXRlJyk7XG4gICAgICAgICAgICBhZ2VudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgIH0gXG4gICAgICAgIC8vdGhpcy5zaG9vdEFycm93KHRoaXMub3gsIHRoaXMub3ksIHRoaXMuZXgsIHRoaXMuZXksIHRoaXMuYXJyb3cpO1xuICAgIH0sXG4qL1xuXG4gICAgc2V0SW5pdFBvczogZnVuY3Rpb24ocHgsIHB5KSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHB4O1xuICAgICAgICB0aGlzLnBvc1kgPSBweTtcbiAgICAgICAgdmFyIHB0ID0gY2MudjIodGhpcy5wb3NYLCB0aGlzLnBvc1kpO1xuXG4gICAgICAgIHRoaXMucm91dGVzLnB1c2gocHQpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVQb3M6IGZ1bmN0aW9uKHB4LCBweSkge1xuICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcbiAgICAgICAgdmFyIG54LG55O1xuICAgICAgICB2YXIgYXAgPSB0aGlzLm5vZGUuZ2V0QW5jaG9yUG9pbnQoKTtcbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgXG4gICAgICAgIG54ID0gKDAuNS1hcC54KSAqIHNpemUud2lkdGggKyBweDtcbiAgICAgICAgLy9ueSA9ICgwLjUtYXAueSkgKiBzaXplLmhlaWdodCArIHB5O1xuICAgICAgICBueSA9IHB5O1xuXG4gICAgICAgIHZhciBzaGFkb3dNb3ZlVG8gPSBjYy52MihueCwgbnkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgaWYodGhpcy5zaGFkb3cpIHsgXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9LFxuXG4vKlxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcy5ub2RlLnNjYWxlWCA9IDAuMztcbiAgICAgICAgLy90aGlzLm5vZGUuc2NhbGVZID0gMC4zO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJkaWVvZmYyXCIpO1xuICAgICAgICB0aGlzLnNoYWRvdy5kZXN0cm95KCk7XG5cbiAgICAgICAgLy9ub2RlIGRlc3RvcnkgaW4gc3ByaXRlIGFmdGVya2lsbCBmdW5jXG4gICAgICAgIC8vdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuKi9cblxuICAgIGRpc3BTaGFkb3c6IGZ1bmN0aW9uKGZyYW1lTm8pIHtcbiAgICAgICAgLy9zaGFkb3cgb2JqZWN0IG1heSBub3QgcmVhZHkgaW4gaW5pdCgpIHdoZW4gcGxheWluZ1xuICAgICAgICBpZighdGhpcy5zaGFkb3cpIHJldHVybjtcblxuICAgICAgICB2YXIgc2hhZG93Tm9kZSA9IHRoaXMuc2hhZG93O1xuICAgICAgICB2YXIgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvZS9za2Vfd2Fsa19lXCIrZnJhbWVObztcbiAgICAgICAgdmFyIGFjdCA9IHRoaXMubGFzdEFjdDtcblxuICAgICAgICBpZighYWN0KSByZXR1cm47XG5cbiAgICAgICAgdmFyIGFjdFRtcCA9IHRoaXMubGFzdEFjdC5zcGxpdChcIl9cIik7XG5cbiAgICAgICAgdmFyIGFjdERpciA9IGFjdFRtcFsxXTtcbiAgICAgICAgdmFyIGFjdFR5cGUgPSBhY3RUbXBbMl07XG4gICAgICAgIHZhciBzY2FsZVggPSB0aGlzLmxhc3RTY2FsZVg7XG5cbiAgICAgICAgaWYoYWN0RGlyID09IFwiZW4xXCIgfHwgYWN0RGlyID09IFwiZW4yXCIgfHwgYWN0RGlyID09IFwiZW4zXCIpIHtcbiAgICAgICAgICAgIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L2VuL3NrZV93YWxrX2VuXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcInNlMVwiIHx8IGFjdERpciA9PSBcInNlMlwiIHx8IGFjdERpciA9PSBcInNlM1wiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9zZS9za2Vfd2Fsa19zZVwiK2ZyYW1lTm87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhY3REaXIgPT0gXCJzXCIpIHtcbiAgICAgICAgICAgIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L3Mvc2tlX3dhbGtfc1wiK2ZyYW1lTm87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhY3REaXIgPT0gXCJuXCIpIHtcbiAgICAgICAgICAgIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L24vc2tlX3dhbGtfblwiK2ZyYW1lTm87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhY3REaXIgPT0gXCJlXCIpIHtcbiAgICAgICAgICAgIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L2Uvc2tlX3dhbGtfZVwiK2ZyYW1lTm87XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYWRvdy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhmcmFtZUltZywgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICBpZihzaGFkb3dOb2RlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hhZG93Tm9kZS5fbmFtZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoYWRvd05vZGUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbi8qXG4gICAgbW92ZTogZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgaWYodGhpcy5yZW1vdmVGbGFnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuID0gdGhpcy5yb3V0ZXMubGVuZ3RoO1xuICAgICAgICB2YXIgbW92ZVRvO1xuXG4gICAgICAgIGlmKGxlbiA9PSAwKSByZXR1cm47XG4gICAgICAgIGlmKGxlbiA9PSAxKSB7XG4gICAgICAgICAgICBtb3ZlVG8gPSB0aGlzLnJvdXRlc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVUbyA9IHRoaXMucm91dGVzLnNoaWZ0KCk7ICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICBpZih0aGlzLnNoYWRvdyAmJiB0aGlzLnNoYWRvdy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbihtb3ZlVG8pOyAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0QWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVhc3RBbmltRnJhbWVzID0gW10sXG4gICAgICAgICAgICBzdHIgPSBcIlwiLFxuICAgICAgICAgICAgZnJhbWUsXG4gICAgICAgICAgICBhbmltYXRpb247XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNDsgaSsrKSB7ICAgICAgICBcbiAgICAgICAgICAgIHN0ciA9IFwiYzV1XCIgKyBpO1xuICAgICAgICAgICAgZnJhbWUgPSB0aGlzLnNwckF0bGFzLmdldFNwcml0ZUZyYW1lKHN0cik7XG4gICAgICAgICAgICBlYXN0QW5pbUZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vYW5pbWF0aW9uID0gbmV3IGNjLkFuaW1hdGlvbihlYXN0QW5pbUZyYW1lcyk7XG5cbiAgICAgICAgdmFyIGNsaXAgPSBjYy5BbmltYXRpb25DbGlwLmNyZWF0ZVdpdGhTcHJpdGVGcmFtZXMoZWFzdEFuaW1GcmFtZXMsZnJhbWVzLmxlbmd0aCk7XG4gICAgICAgIGNsaXAubmFtZSA9IFwiYW5pbV8wMDFcIjtcbiAgICAgICAgY2xpcC5zcGVlZCA9IDAuMDg7XG4gICAgICAgIGNsaXAuc2FtcGxlID0gNDtcbiAgICAgICAgY2xpcC53cmFwTW9kZSA9IHRoaXMud3JhcE1vZGU7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5hZGRDbGlwKGNsaXApO1xuICAgIH0sXG5cbiAgICBwbGF5QW5pbWF0aW9uOiBmdW5jdGlvbiAod3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5EZWZhdWx0LCBzcGVlZCA9IDAuNSwgc2FtcGxlID0gNjApIHtcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB2YXIgYW5pbVN0YXRlID0gdGhpcy5fYW5pbWF0aW9uLmdldEFuaW1hdGlvblN0YXRlKFwiYW5pbV8wMDFcIik7XG4gICAgICAgICAgICBhbmltU3RhdGUuY2xpcC53cmFwTW9kZSA9IHdyYXBNb2RlO1xuICAgICAgICAgICAgYW5pbVN0YXRlLmNsaXAuc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5jbGlwLnNhbXBsZSA9IHNhbXBsZTtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5yZXBlYXRDb3VudCA9IEluZmluaXR5O1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJhbmltXzAwMVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRJbml0QWN0OiBmdW5jdGlvbihhbmdsZSwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgYW5nbGVJbmZvID0gdGhpcy5nZXRBY3RuYW1lQnlBbmdsZShhbmdsZSwgYWN0VHlwZSk7XG4gICAgICAgIHRoaXMubGFzdEFjdCA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuICAgIH0sXG5cbiAgICBnZXRBY3RuYW1lQnlBbmdsZV9iYWs6IGZ1bmN0aW9uKGFuZ2xlLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBhY3ROYW1lPVwiXCI7XG4gICAgICAgIHZhciBzY2FsZVggPSAxO1xuICAgICAgICB2YXIgcmV0ID0ge307XG5cbiAgICAgICAgaWYoYW5nbGU+PTAgJiYgYW5nbGU8PTExLjI1KjEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMSAmJiBhbmdsZTw9MTEuMjUqMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuM193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMyAmJiBhbmdsZTw9MTEuMjUqNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqNSAmJiBhbmdsZTw9MTEuMjUqNykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4xX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqNyAmJiBhbmdsZTw9MTEuMjUqOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSo5ICYmIGFuZ2xlPD0xMS4yNSoxMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UxX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMTEgJiYgYW5nbGU8PTExLjI1KjEzKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxMyAmJiBhbmdsZTw9MTEuMjUqMTUpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlM19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjE1IHx8IGFuZ2xlPD0xODApIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDAgJiYgYW5nbGU+PTExLjI1Ki0xKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotMSAmJiBhbmdsZT49MTEuMjUqLTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuM19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotMyAmJiBhbmdsZT49MTEuMjUqLTUpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki01ICYmIGFuZ2xlPj0xMS4yNSotNykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4xX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTcgJiYgYW5nbGU+PTExLjI1Ki05KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotOSAmJiBhbmdsZT49MTEuMjUqLTExKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UxX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTExICYmIGFuZ2xlPj0xMS4yNSotMTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotMTMgJiYgYW5nbGU+PTExLjI1Ki0xNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlM193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotMTUgJiYgYW5nbGU+LTE4MCkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLTpcIithbmdsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhY3ROYW1lID0gdGhpcy5yb2xlICtcIl9cIisgYWN0TmFtZTtcblxuICAgICAgICByZXQuYWN0TmFtZSA9IGFjdE5hbWU7XG4gICAgICAgIHJldC5zY2FsZVggPSBzY2FsZVg7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiovXG5cbiAgICBnZXRBY3RuYW1lQnlBbmdsZTogZnVuY3Rpb24oYW5nbGUsIGFjdFR5cGUpIHtcblxuXG5jb25zb2xlLmxvZyhhbmdsZSArXCI6Ojo6XCIrIGFjdFR5cGUpO1xuXG5cbiAgICAgICAgdmFyIGFjdE5hbWU9XCJcIjtcbiAgICAgICAgdmFyIHNjYWxlWCA9IDE7XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgdmFyIHNwZWNpYWxBY3RuYW1lID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYW5nbGU+MjIuNSotMSAmJiBhbmdsZTw9MjIuNSoxKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqMSAmJiBhbmdsZTw9MjIuNSozKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjMgJiYgYW5nbGU8PTIyLjUqNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjUgJiYgYW5nbGU8PTIyLjUqNykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MjIuNSo3IHx8IGFuZ2xlPC0yMi41KjkpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki0xICYmIGFuZ2xlPj0yMi41Ki0zKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MjIuNSotMyAmJiBhbmdsZT49MjIuNSotNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MjIuNSotNSAmJiBhbmdsZT49MjIuNSotNykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAvLyBzdGFydCBhdHRhY2tcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlPDIyLjUqLTcpe1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikgeyAgIC8vIHN0YXJ0IGF0dGFja1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tZXJyb3IgYW5nbGUtLS0tLS0tLS0tLS0tLTpcIithbmdsZSk7XG4gICAgICAgIH1cblxuXG5cbmlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgIGFjdE5hbWUgPSBcInNrZVwiICtcIl9cIisgYWN0TmFtZTtcbn0gZWxzZSB7XG4gICAgICAgIGFjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xufVxuXG5cbi8vYWN0TmFtZSA9IHRoaXMucm9sZSArXCJfXCIrIGFjdE5hbWU7XG5cblxuIFxuICAgICAgICBzcGVjaWFsQWN0bmFtZSA9IHRoaXMuc3BlY2lhbEFjdChhY3RUeXBlKTtcbiAgICAgICAgaWYoc3BlY2lhbEFjdG5hbWUpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBzcGVjaWFsQWN0bmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldC5hY3ROYW1lID0gYWN0TmFtZTtcbiAgICAgICAgcmV0LnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgc3BlY2lhbEFjdDogZnVuY3Rpb24oYWN0VHlwZSkge1xuICAgICAgICAvLyBpZiBqdXN0IDEgdnMgMSBhdHRhY2tcbiAgICAgICAgaWYoIXRoaXMuZ3JvdXBLaWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcInNhXCIgJiYgdGhpcy5yb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaHJfYWxsX2tpbGxcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldElkOiBmdW5jdGlvbihhaWQpIHtcbiAgICAgICAgdGhpcy5haWQgPSBhaWQ7XG5cbiAgICAgICAgLy92YXIgZXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oXCJldmVudF9lZmZlY3RcIiwgdHJ1ZSk7XG4gICAgICAgIC8vZXZlbnQuZGV0YWlsID0gXCIxMjNcIjtcbiAgICAgICAgLy90aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldFNoYWRvdzogZnVuY3Rpb24oc2hhZG93KSB7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gc2hhZG93O1xuICAgICAgICB0aGlzLnNoYWRvdy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRBZ2VudEFuZ2xlOiBmdW5jdGlvbihvUG9zLCBkUG9zLCB0YW5BbmdsZSkge1xuICAgICAgICB2YXIgZHgsZHksb3gsb3k7XG4gICAgICAgIHZhciBhbmdsZTtcblxuICAgICAgICBkeCA9IGRQb3MueDtcbiAgICAgICAgZHkgPSBkUG9zLnk7XG4gICAgICAgIG94ID0gb1Bvcy54O1xuICAgICAgICBveSA9IG9Qb3MueTtcblxuICAgICAgICBpZihkeC1veD4wICYmIGR5LW95PjApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gdGFuQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veD4wICYmIGR5LW95PDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gMTgwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g8MCAmJiBkeS1veTwwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDE4MCt0YW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGR4LW94PDAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAxODA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeS1veT09MCAmJiBkeC1veD4wKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDkwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHktb3k9PTAgJiYgZHgtb3g8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAtOTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndyb25nIGFuZ2xlIGluIEZ1bmMgTXlTcHJpdGUtPmdldEFnZW50QW5nbGUoKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbmdsZTtcbiAgICB9LFxuXG4gICAgaWZGbHlBZ2VudDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICBpZihyb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcGxheUFuZ2xlQW5pbWF0aW9uTmVhcjogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgaWYodGhpcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNjLnYyKGFnZW50Lm15cG9zLngsIGFnZW50Lm15cG9zLnkpO1xuICAgICAgICB2YXIgZW5lbXlQb3MgPSBjYy52MihhZ2VudC5lbmVteXBvcy54LCBhZ2VudC5lbmVteXBvcy55KTtcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzItYWdlbnQubXlwb3MueSk7XG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIGFjdFR5cGUgPSBhZ2VudC5hY3RUeXBlO1xuICAgICAgICB2YXIgZngsZnksdnQsYWc9MCx0YXJnZXRQb3MsYW5nbGVJbmZvO1xuXG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDtcbiAgICAgICAgdmFyIHkgPSBhZ2VudC5teXBvcy55O1xuICAgICAgICB2YXIgZXggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55O1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHN0YXJ0UG9zLnN1YihlbmVteVBvcykubWFnKCk7XG4gICAgICAgIHZhciBhdHRhY2tEaXN0YW5jZTtcblxuICAgICAgICAvLyBmbHkgYWdlbnQgc2hvdWxkIGhvdmVyIG92ZXIgYW55IG90aGVyIGFnZW50LlxuICAgICAgICBpZighdGhpcy5pZkZseUFnZW50KGFnZW50LnJvbGUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gem9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhdHRhY2tEaXN0YW5jZSA9IHRoaXMuZ2V0QXR0YWNrRGlzdGFuY2UoYWdlbnQpO1xuXG4gICAgICAgICAgICAvLzEuNSBpcyB0aGUgZGlzdGFuY2UgYWp1c3RtZW50IHZhcmlhYmxlLCBzaG91bGQgYmUgYWp1c3QgYWNjb3JkaW5nIHRvIGVhY2ggYWdlbnQgc2l6ZS5cbiAgICAgICAgICAgIC8vYXR0YWNrRGlzdGFuY2UgPSAoYWdlbnQuc2l6ZSArIGFnZW50LmVzaXplKSowLjUqMS41O1xuXG4gICAgICAgICAgICBpZihkaXN0YW5jZTw9YXR0YWNrRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoeCwgeSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgICAgICBpZih2dC54ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodnQueSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LngvdnQueSkpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpleCwgXCJ5XCI6ZXl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcInNhXCIpO1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICAgICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnggPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy54OyBcbiAgICAgICAgICAgICAgICAgICAgZnkgPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ4ID0gYWdlbnQuZW5lbXlwb3MueDtcbiAgICAgICAgICAgICAgICAgICAgZnkgPSBhZ2VudC5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydFBvcyAgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MihmeCwgZnkpO1xuICAgICAgICAgICAgICAgIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG5cbiAgICAgICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueC92dC55KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpmeCwgXCJ5XCI6Znl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcIm1vdmVcIik7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG4gICAgICAgICAgICAgICAgLy91c2VkIHRvIG1pcnJvciBhIHNwcml0ZS5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9ibG9vZCBiYXIgbWF5IGZsaXAgd2hlbiBhZ2VudCBmbGlwLCBzaG91bGQgbWFrZSBpdCBiYWNrLlxuICAgICAgICAgICAgdGhpcy5ibG9vZC5zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1hdHRhY2tEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy9pZih0aGlzLnBsYXlFZmZlY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLnBsYXlFZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCF0aGlzLmF0dGFja2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlBbmdsZUFuaW1hdGlvblJlbW90ZTogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgdmFyIGZ4LGZ5LGFjdFR5cGU7XG4gICAgICAgIHZhciBhZyA9IDA7XG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDsgXG4gICAgICAgIHZhciB5ID0gYWdlbnQubXlwb3MueTsgXG4gICAgICAgIHZhciBleCA9IGFnZW50LmVuZW15cG9zLng7IFxuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55OyBcblxuICAgICAgICB2YXIgc3RhcnRQb3MsdGFyZ2V0UG9zLHN0YXJ0RVBvcywgdGFyZ2V0RVBvcywgdnQsIHZ0RTtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzIteSk7XG5cbiAgICAgICAgLy90b3RhbCBhbmltYXRvciBkdXJhdGlvbiBpcyAxLjI1cywgc28gdGFrZSBhIHJhbmRvbSB0aW1lIGZyb20gMC0xLjI1IHRvIHByZXZlbnQgc2FtZSBhY3Rpb25cbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMjUpLzEwMDtcbiAgICAgICAgdmFyIGFjdE5hbWUgPSBcIlwiO1xuICAgICAgICB2YXIgdGhlbjtcbiAgICAgICAgdmFyIGFuZ2xlSW5mbztcblxuICAgICAgICBhY3RUeXBlID0gYWdlbnQuYWN0VHlwZTtcbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcImlhXCIgfHwgYWN0VHlwZSA9PSBcImVhXCIgKSB7IFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYWcgPSBhZ2VudC5yb3Q7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB6b3JkZXI7XG4vL3RoaXMubm9kZS5zY2FsZVggPSAxO1xuXG4gICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAvL3N0YXJ0IGF0dGFja1xuICAgICAgICAgICAgLy8gZGlyIGFjY29yZGluZyB0byBlbmVteSBwb3NpdGlvblxuICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoKHgpKjMwLCAoeSkqMzApO1xuICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGV4KSozMCwgKGV5KSozMCk7XG4gICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZ0LnggIT0gMCAmJiB2dC55ICE9IDApIHtcbiAgICAgICAgICAgICAgICAvL2FnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueS92dC54KSk7XG4gICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmV4LCBcInlcIjpleX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUpIHtcbiAgICAgICAgICAgICAgICBmeCA9IGFnZW50RnV0dXJlLmVuZW15cG9zLng7IFxuICAgICAgICAgICAgICAgIGZ5ID0gYWdlbnRGdXR1cmUuZW5lbXlwb3MueTtcbiAgICAgICAgICAgICAgICAvL2Z1dHVyZSBhY3R0eXBlIG1heWJlIGlhIGluc3RlYWQgb2YgbW92ZSBvciBzYSwgaW4gdGhpcyBjYXNlIHNob3VsZCBub3QgYmUgaGFuZGxlZC5cbiAgICAgICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSAmJiBhZ2VudEZ1dHVyZS5hY3RUeXBlICE9IFwiaWFcIikge1xuICAgICAgICAgICAgICAgICAgICBhY3RUeXBlID0gYWdlbnRGdXR1cmUuYWN0VHlwZTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmeCA9IGFnZW50LmVuZW15cG9zLng7XG4gICAgICAgICAgICAgICAgZnkgPSBhZ2VudC5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIGlmKGFnZW50RnV0dXJlICYmIGFnZW50RnV0dXJlLmFjdFR5cGUgIT0gXCJpYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdFR5cGUgPSBhZ2VudEZ1dHVyZS5hY3RUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKChmeCkqMzAsIChmeSkqMzApO1xuICAgICAgICAgICAgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcblxuICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnggPSAwLjE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICB2dC55ID0gMC4xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmZ4LCBcInlcIjpmeX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYWcsIGFjdFR5cGUpO1xuICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG5jb25zb2xlLmxvZyhhY3ROYW1lKTtcblxuXG4gICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuLy90aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcblxuICAgICAgICAgICAgLy9ibG9vZCBiYXIgbWF5IGZsaXAgd2hlbiBhZ2VudCBmbGlwLCBzaG91bGQgbWFrZSBpdCBiYWNrLlxuICAgICAgICAgICAgdGhpcy5ibG9vZC5zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSB8fCBhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pU3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaVBsYXkoYWN0TmFtZSk7XG4vL3RoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4vL3RoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2Fsa2luZyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pUGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbi8vdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4vL3RoaXMubGFzdFNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuLypcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgICAgIHRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIC8vIHRvIGF2b2lkIGNoYW5naW5nIGRpciBmcmVxdWVudGx5LiBhZ2VudCB3b3VsZCBsb29rcyB0cmVtYmxlIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgICBpZih0aGVuIC0gdGhpcy5ub3cgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3cgPSB0aGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9pZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSAmJiBhY3RUeXBlPT1cInNhXCIpIHtcbiAgICAgICAgICAgIC8vICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyAgICB2YXIgYW5pbVN0YXRlID0gdGhpcy5fYW5pbWF0aW9uLmdldEFuaW1hdGlvblN0YXRlKGFjdE5hbWUpO1xuICAgICAgICAgICAgLy8gICAgaWYgKGFuaW1TdGF0ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgIGFuaW1TdGF0ZS5vbignbGFzdGZyYW1lJywgKGV2ZW50KSA9PiB7fSwgdGhpcyk7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0U2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgfVxuKi9cblxuICAgICAgICB0aGlzLmxhc3RBY3RUeXBlID0gYWN0VHlwZTtcbiAgICB9LFxuXG4gICAgYW5pUGxheTogZnVuY3Rpb24oYWN0TmFtZSwgcmFuZG9tVGltZT1udWxsKSB7XG4gICAgICAgIGlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheUFuaW1hdGlvbihhY3ROYW1lLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHJhbmRvbVRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFuaVN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmFuaVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFuaVR5cGUgPT0gXCJkcmFnb25cIikge1xuICAgICAgICAgICAgLy9zaG91bGQgZG8gc3RvcCBkcmFnb24gYW5pIGhlcmUuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==