
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
      var nftBodyNode = this.node.getChildByName("nft_body");
      this._animation = nftBodyNode.getComponent(dragonBones.ArmatureDisplay); //console.log("---------");
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
  getActnameByAngle: function getActnameByAngle(angle, actType, aniType) {
    if (aniType == "dragon") {
      return this.getActnameForDragonByAngle(angle, actType);
    } else {
      return this.getActnameForFrameByAngle(angle, actType);
    }
  },
  getActnameForDragonByAngle: function getActnameForDragonByAngle(angle, actType) {
    var actName = ""; //todo ,must be set to 1.0, sprite size should be changed.

    var scaleX = 0.3;
    var ret = {};
    var specialActname = false;

    if (angle > 22.5 * -1 && angle <= 22.5 * 7) {
      if (actType == "move") {
        actName = "running";
      } else if (actType == "sa") {
        actName = "shooting";
      }
    } else if (angle > 22.5 * 7 || angle < -22.5 * 9) {
      if (actType == "move") {
        actName = "running";
      } else if (actType == "sa") {
        actName = "shooting";
      }
    } else if (angle < 22.5 * -1 && angle >= 22.5 * -7) {
      if (actType == "move") {
        actName = "running";
      } else if (actType == "sa") {
        actName = "shooting";
      }

      scaleX = -0.3;
    } else if (angle < 22.5 * -7) {
      if (actType == "move") {
        actName = "running";
      } else if (actType == "sa") {
        actName = "shooting";
      }

      scaleX = -0.3;
    } else {
      console.log("----error angle--------------:" + angle);
    } //actName = this.role +"_"+ actName;


    specialActname = this.specialAct(actType);

    if (specialActname) {
      actName = specialActname;
    }

    ret.actName = actName;
    ret.scaleX = scaleX;
    return ret;
  },
  getActnameForFrameByAngle: function getActnameForFrameByAngle(angle, actType) {
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

    actName = this.role + "_" + actName;
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

        angleInfo = this.getActnameByAngle(ag, "sa", this.aniType);
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

        angleInfo = this.getActnameByAngle(ag, "move", this.aniType);
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
    this.node.zIndex = zorder;
    this.node.scaleX = 1;

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
      angleInfo = this.getActnameByAngle(ag, actType, this.aniType);
      actName = angleInfo.actName; //used to mirror a sprite.

      this.node.scaleX = angleInfo.scaleX; //blood bar may flip when agent flip, should make it back.

      this.blood.scaleX = this.node.scaleX; //if already in attack mode, just skip the animation

      if (this.lastAct != actName || actType == "sa") {
        if (actType == "sa") {
          //if dragon bones animation
          if (this.aniType == "dragon") {
            this.aniStop();
            this.aniPlay(actName);
          } else {
            this._animation.stop();

            this._animation.play(actName);
          }
        } else {
          //walking action.
          //if dragon bones animation
          if (this.aniType == "dragon") {
            this.aniPlay(actName, randomTime);
          } else {
            this._animation.play(actName, randomTime);
          }
        }

        this.lastAct = actName;
        this.lastScaleX = angleInfo.scaleX;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL015U3ByaXRlLmpzIl0sIm5hbWVzIjpbImNvbW1vbiIsInJlcXVpcmUiLCJhZ2VudE9iaiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwic3ByQXRsYXMiLCJTcHJpdGVBdGxhcyIsIndyYXBNb2RlIiwiV3JhcE1vZGUiLCJMb29wIiwicm91dGVzIiwibGFzdEFjdCIsImxhc3RBbmdsZSIsImxpZmUiLCJlaWQiLCJvbkxvYWQiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImN0b3IiLCJpbml0IiwicG9zWCIsInBvc1kiLCJub3ciLCJEYXRlIiwiYW5nbGUiLCJncm91cEtpbGwiLCJhdHRhY2tpbmciLCJhbmlUeXBlIiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsInJvbGUiLCJuZnRCb2R5Tm9kZSIsImdldENoaWxkQnlOYW1lIiwiX2FuaW1hdGlvbiIsImRyYWdvbkJvbmVzIiwiQXJtYXR1cmVEaXNwbGF5IiwiQW5pbWF0aW9uIiwic2V0SW5pdFBvcyIsInB4IiwicHkiLCJwdCIsInYyIiwicHVzaCIsInVwZGF0ZVBvcyIsIm1vdmVUbyIsIm54IiwibnkiLCJhcCIsImdldEFuY2hvclBvaW50Iiwic2l6ZSIsImdldENvbnRlbnRTaXplIiwieCIsIndpZHRoIiwic2hhZG93TW92ZVRvIiwic2V0UG9zaXRpb24iLCJzaGFkb3ciLCJkaXNwU2hhZG93IiwiZnJhbWVObyIsInNoYWRvd05vZGUiLCJmcmFtZUltZyIsImFjdCIsImFjdFRtcCIsInNwbGl0IiwiYWN0RGlyIiwiYWN0VHlwZSIsInNjYWxlWCIsImxhc3RTY2FsZVgiLCJhY3RpdmUiLCJsb2FkZXIiLCJsb2FkUmVzIiwiU3ByaXRlRnJhbWUiLCJlcnIiLCJzcHJpdGVGcmFtZSIsIl9uYW1lIiwiU3ByaXRlIiwiZSIsImdldEFjdG5hbWVCeUFuZ2xlIiwiZ2V0QWN0bmFtZUZvckRyYWdvbkJ5QW5nbGUiLCJnZXRBY3RuYW1lRm9yRnJhbWVCeUFuZ2xlIiwiYWN0TmFtZSIsInJldCIsInNwZWNpYWxBY3RuYW1lIiwic3BlY2lhbEFjdCIsInNldElkIiwiYWlkIiwiaGlkZSIsInNldFNoYWRvdyIsImdldEFnZW50QW5nbGUiLCJvUG9zIiwiZFBvcyIsInRhbkFuZ2xlIiwiZHgiLCJkeSIsIm94Iiwib3kiLCJ5IiwiaWZGbHlBZ2VudCIsInBsYXlBbmdsZUFuaW1hdGlvbk5lYXIiLCJhZ2VudCIsImFnZW50RnV0dXJlIiwiaXNNYWluUGxheWVyIiwic3RhcnRQb3MiLCJteXBvcyIsImVuZW15UG9zIiwiZW5lbXlwb3MiLCJ6b3JkZXIiLCJwYXJzZUludCIsInJhbmRvbVRpbWUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsImZ4IiwiZnkiLCJ2dCIsImFnIiwidGFyZ2V0UG9zIiwiYW5nbGVJbmZvIiwiZXgiLCJleSIsImRpc3RhbmNlIiwic3ViIiwibWFnIiwiYXR0YWNrRGlzdGFuY2UiLCJ6SW5kZXgiLCJnZXRBdHRhY2tEaXN0YW5jZSIsIlBJIiwiYXRhbiIsImFicyIsImJsb29kIiwicGxheSIsInBsYXlBbmdsZUFuaW1hdGlvblJlbW90ZSIsInN0YXJ0RVBvcyIsInRhcmdldEVQb3MiLCJ2dEUiLCJfc2VsZiIsInRoZW4iLCJyb3QiLCJhbmlTdG9wIiwiYW5pUGxheSIsInN0b3AiLCJsYXN0QWN0VHlwZSIsInBsYXlBbmltYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNGLFFBREo7QUFHTEcsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUgsRUFBRSxDQUFDSSxXQURMO0FBRVJDLElBQUFBLFFBQVEsRUFBRUwsRUFBRSxDQUFDTSxRQUFILENBQVlDLElBRmQ7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QUwsSUFBZ0IsUUFBakQsRUFBMkQ7QUFDdkQsV0FBS08sVUFBTCxDQUFnQjRHLGFBQWhCLENBQThCOUQsT0FBOUIsRUFBdUMsQ0FBdkM7QUFDSCxLQUZELE1BRU87QUFDSCxVQUFHNEIsVUFBSCxFQUFlO0FBQ1gsYUFBSzFFLFVBQUwsQ0FBZ0JnRyxJQUFoQixDQUFxQmxELE9BQXJCLEVBQThCNEIsVUFBOUI7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLMUUsVUFBTCxDQUFnQmdHLElBQWhCLENBQXFCbEQsT0FBckI7QUFDSDtBQUNKO0FBQ0osR0ExNUJJO0FBNDVCTDBELEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixRQUFHLEtBQUsvRyxPQUFMLEtBQWlCQyxTQUFqQixJQUE4QixLQUFLRCxPQUFMLElBQWdCLFFBQWpELEVBQTJELENBQ3ZEO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS08sVUFBTCxDQUFnQjBHLElBQWhCO0FBQ0g7QUFDSixHQWw2QkksQ0FvNkJMOztBQXA2QkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG52YXIgYWdlbnRPYmogPSByZXF1aXJlKFwiQWdlbnRPYmpcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBhZ2VudE9iaixcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3ByQXRsYXM6IGNjLlNwcml0ZUF0bGFzLFxuICAgICAgICB3cmFwTW9kZTogY2MuV3JhcE1vZGUuTG9vcCxcbiAgICAgICAgcm91dGVzOltdLFxuICAgICAgICBsYXN0QWN0OlwiXCIsXG4gICAgICAgIGxhc3RBbmdsZTotMSxcbiAgICAgICAgbGlmZTotMSxcbiAgICAgICAgZWlkOi0xLFxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmxheW91dE9wID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJHYW1lXCIpO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgfSxcblxuICAgIGN0b3IoKSB7XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnBvc1ggPSAwO1xuICAgICAgICB0aGlzLnBvc1kgPSAwO1xuICAgICAgICB0aGlzLm5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAtOTk5O1xuICAgICAgICB0aGlzLmdyb3VwS2lsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF0dGFja2luZyA9IGZhbHNlO1xuXG4gICAgICAgIC8vaWYgZHJhZ29uYm9uZXMgYW5pbWF0b3Igbm9kZVxuICAgICAgICBpZih0aGlzLmFuaVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFuaVR5cGUgPT0gXCJkcmFnb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyb2xlOlwiICsgdGhpcy5yb2xlKTtcblxuICAgICAgICAgICAgdmFyIG5mdEJvZHlOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibmZ0X2JvZHlcIik7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24gPSBuZnRCb2R5Tm9kZS5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCItLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAvL3RoaXMuX2FuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKCdza2Vfbl9hdHRhY2snLCAwKTtcbiAgICAgICAgfSBlbHNlIHsgIC8vaWYgZnJhbWUgYW5pbWF0b3Igbm9kZVxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5XcmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbi8qICAgIFxuICAgIHNldEVuZW15OiBmdW5jdGlvbihlbmVteU9iaikge1xuICAgICAgICBpZihlbmVteU9iaikge1xuICAgICAgICAgICAgdGhpcy5laWQgPSBlbmVteU9iai5uYW1lO1xuICAgICAgICAgICAgdGhpcy5lbmVteSA9IGVuZW15T2JqOyAgICAgICAgICAgIFxuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWlkID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuZW5lbXkgPSBudWxsOyAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25lbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBhZ2VudE5vZGU7XG4gICAgICAgIGlmKHRoaXMuZW5lbXkuaXNWYWxpZCkge1xuICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5lbmVteS5nZXRDb21wb25lbnQoJ1NrZVNwcml0ZScpO1xuICAgICAgICAgICAgYWdlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICB9IFxuICAgICAgICAvL3RoaXMuc2hvb3RBcnJvdyh0aGlzLm94LCB0aGlzLm95LCB0aGlzLmV4LCB0aGlzLmV5LCB0aGlzLmFycm93KTtcbiAgICB9LFxuKi9cblxuICAgIHNldEluaXRQb3M6IGZ1bmN0aW9uKHB4LCBweSkge1xuICAgICAgICB0aGlzLnBvc1ggPSBweDtcbiAgICAgICAgdGhpcy5wb3NZID0gcHk7XG4gICAgICAgIHZhciBwdCA9IGNjLnYyKHRoaXMucG9zWCwgdGhpcy5wb3NZKTtcblxuICAgICAgICB0aGlzLnJvdXRlcy5wdXNoKHB0KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUG9zOiBmdW5jdGlvbihweCwgcHkpIHtcbiAgICAgICAgdmFyIG1vdmVUbyA9IGNjLnYyKHB4LCBweSk7XG4gICAgICAgIHZhciBueCxueTtcbiAgICAgICAgdmFyIGFwID0gdGhpcy5ub2RlLmdldEFuY2hvclBvaW50KCk7XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIFxuICAgICAgICBueCA9ICgwLjUtYXAueCkgKiBzaXplLndpZHRoICsgcHg7XG4gICAgICAgIC8vbnkgPSAoMC41LWFwLnkpICogc2l6ZS5oZWlnaHQgKyBweTtcbiAgICAgICAgbnkgPSBweTtcblxuICAgICAgICB2YXIgc2hhZG93TW92ZVRvID0gY2MudjIobngsIG55KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuXG4gICAgICAgIGlmKHRoaXMuc2hhZG93KSB7IFxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfSxcblxuLypcbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMubm9kZS5zY2FsZVggPSAwLjM7XG4gICAgICAgIC8vdGhpcy5ub2RlLnNjYWxlWSA9IDAuMztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMlwiKTtcbiAgICAgICAgdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuXG4gICAgICAgIC8vbm9kZSBkZXN0b3J5IGluIHNwcml0ZSBhZnRlcmtpbGwgZnVuY1xuICAgICAgICAvL3RoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiovXG5cbiAgICBkaXNwU2hhZG93OiBmdW5jdGlvbihmcmFtZU5vKSB7XG4gICAgICAgIC8vc2hhZG93IG9iamVjdCBtYXkgbm90IHJlYWR5IGluIGluaXQoKSB3aGVuIHBsYXlpbmdcbiAgICAgICAgaWYoIXRoaXMuc2hhZG93KSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNoYWRvd05vZGUgPSB0aGlzLnNoYWRvdztcbiAgICAgICAgdmFyIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L2Uvc2tlX3dhbGtfZVwiK2ZyYW1lTm87XG4gICAgICAgIHZhciBhY3QgPSB0aGlzLmxhc3RBY3Q7XG5cbiAgICAgICAgaWYoIWFjdCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBhY3RUbXAgPSB0aGlzLmxhc3RBY3Quc3BsaXQoXCJfXCIpO1xuXG4gICAgICAgIHZhciBhY3REaXIgPSBhY3RUbXBbMV07XG4gICAgICAgIHZhciBhY3RUeXBlID0gYWN0VG1wWzJdO1xuICAgICAgICB2YXIgc2NhbGVYID0gdGhpcy5sYXN0U2NhbGVYO1xuXG4gICAgICAgIGlmKGFjdERpciA9PSBcImVuMVwiIHx8IGFjdERpciA9PSBcImVuMlwiIHx8IGFjdERpciA9PSBcImVuM1wiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9lbi9za2Vfd2Fsa19lblwiK2ZyYW1lTm87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhY3REaXIgPT0gXCJzZTFcIiB8fCBhY3REaXIgPT0gXCJzZTJcIiB8fCBhY3REaXIgPT0gXCJzZTNcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvc2Uvc2tlX3dhbGtfc2VcIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwic1wiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9zL3NrZV93YWxrX3NcIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwiblwiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9uL3NrZV93YWxrX25cIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwiZVwiKSB7XG4gICAgICAgICAgICBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9lL3NrZV93YWxrX2VcIitmcmFtZU5vO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFkb3cuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoZnJhbWVJbWcsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgaWYoc2hhZG93Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNoYWRvd05vZGUuX25hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGFkb3dOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4vKlxuICAgIG1vdmU6IGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgIGlmKHRoaXMucmVtb3ZlRmxhZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbiA9IHRoaXMucm91dGVzLmxlbmd0aDtcbiAgICAgICAgdmFyIG1vdmVUbztcblxuICAgICAgICBpZihsZW4gPT0gMCkgcmV0dXJuO1xuICAgICAgICBpZihsZW4gPT0gMSkge1xuICAgICAgICAgICAgbW92ZVRvID0gdGhpcy5yb3V0ZXNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3ZlVG8gPSB0aGlzLnJvdXRlcy5zaGlmdCgpOyAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgaWYodGhpcy5zaGFkb3cgJiYgdGhpcy5zaGFkb3cuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24obW92ZVRvKTsgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlYXN0QW5pbUZyYW1lcyA9IFtdLFxuICAgICAgICAgICAgc3RyID0gXCJcIixcbiAgICAgICAgICAgIGZyYW1lLFxuICAgICAgICAgICAgYW5pbWF0aW9uO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDQ7IGkrKykgeyAgICAgICAgXG4gICAgICAgICAgICBzdHIgPSBcImM1dVwiICsgaTtcbiAgICAgICAgICAgIGZyYW1lID0gdGhpcy5zcHJBdGxhcy5nZXRTcHJpdGVGcmFtZShzdHIpO1xuICAgICAgICAgICAgZWFzdEFuaW1GcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2FuaW1hdGlvbiA9IG5ldyBjYy5BbmltYXRpb24oZWFzdEFuaW1GcmFtZXMpO1xuXG4gICAgICAgIHZhciBjbGlwID0gY2MuQW5pbWF0aW9uQ2xpcC5jcmVhdGVXaXRoU3ByaXRlRnJhbWVzKGVhc3RBbmltRnJhbWVzLGZyYW1lcy5sZW5ndGgpO1xuICAgICAgICBjbGlwLm5hbWUgPSBcImFuaW1fMDAxXCI7XG4gICAgICAgIGNsaXAuc3BlZWQgPSAwLjA4O1xuICAgICAgICBjbGlwLnNhbXBsZSA9IDQ7XG4gICAgICAgIGNsaXAud3JhcE1vZGUgPSB0aGlzLndyYXBNb2RlO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24uYWRkQ2xpcChjbGlwKTtcbiAgICB9LFxuXG4gICAgcGxheUFuaW1hdGlvbjogZnVuY3Rpb24gKHdyYXBNb2RlID0gY2MuV3JhcE1vZGUuRGVmYXVsdCwgc3BlZWQgPSAwLjUsIHNhbXBsZSA9IDYwKSB7XG4gICAgICAgIGlmKHRoaXMuX2FuaW1hdGlvbikge1xuICAgICAgICAgICAgdmFyIGFuaW1TdGF0ZSA9IHRoaXMuX2FuaW1hdGlvbi5nZXRBbmltYXRpb25TdGF0ZShcImFuaW1fMDAxXCIpO1xuICAgICAgICAgICAgYW5pbVN0YXRlLmNsaXAud3JhcE1vZGUgPSB3cmFwTW9kZTtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5jbGlwLnNwZWVkID0gc3BlZWQ7XG4gICAgICAgICAgICBhbmltU3RhdGUuY2xpcC5zYW1wbGUgPSBzYW1wbGU7XG4gICAgICAgICAgICBhbmltU3RhdGUucmVwZWF0Q291bnQgPSBJbmZpbml0eTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiYW5pbV8wMDFcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0SW5pdEFjdDogZnVuY3Rpb24oYW5nbGUsIGFjdFR5cGUpIHtcbiAgICAgICAgdmFyIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYW5nbGUsIGFjdFR5cGUpO1xuICAgICAgICB0aGlzLmxhc3RBY3QgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgZ2V0QWN0bmFtZUJ5QW5nbGVfYmFrOiBmdW5jdGlvbihhbmdsZSwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgYWN0TmFtZT1cIlwiO1xuICAgICAgICB2YXIgc2NhbGVYID0gMTtcbiAgICAgICAgdmFyIHJldCA9IHt9O1xuXG4gICAgICAgIGlmKGFuZ2xlPj0wICYmIGFuZ2xlPD0xMS4yNSoxKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwibl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjEgJiYgYW5nbGU8PTExLjI1KjMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuM19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjMgJiYgYW5nbGU8PTExLjI1KjUpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjUgJiYgYW5nbGU8PTExLjI1KjcpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjcgJiYgYW5nbGU8PTExLjI1KjkpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqOSAmJiBhbmdsZTw9MTEuMjUqMTEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjExICYmIGFuZ2xlPD0xMS4yNSoxMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMTMgJiYgYW5nbGU8PTExLjI1KjE1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxNSB8fCBhbmdsZTw9MTgwKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZWxzZSBpZihhbmdsZTwwICYmIGFuZ2xlPj0xMS4yNSotMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTEgJiYgYW5nbGU+PTExLjI1Ki0zKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTMgJiYgYW5nbGU+PTExLjI1Ki01KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotNSAmJiBhbmdsZT49MTEuMjUqLTcpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki03ICYmIGFuZ2xlPj0xMS4yNSotOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTkgJiYgYW5nbGU+PTExLjI1Ki0xMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UxX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xMSAmJiBhbmdsZT49MTEuMjUqLTEzKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTEzICYmIGFuZ2xlPj0xMS4yNSotMTUpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlM19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTE1ICYmIGFuZ2xlPi0xODApIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS06XCIrYW5nbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0TmFtZSA9IHRoaXMucm9sZSArXCJfXCIrIGFjdE5hbWU7XG5cbiAgICAgICAgcmV0LmFjdE5hbWUgPSBhY3ROYW1lO1xuICAgICAgICByZXQuc2NhbGVYID0gc2NhbGVYO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG4qL1xuXG4gICAgZ2V0QWN0bmFtZUJ5QW5nbGU6IGZ1bmN0aW9uKGFuZ2xlLCBhY3RUeXBlLCBhbmlUeXBlKSB7XG4gICAgICAgIGlmKGFuaVR5cGUgPT0gXCJkcmFnb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0bmFtZUZvckRyYWdvbkJ5QW5nbGUoYW5nbGUsIGFjdFR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0bmFtZUZvckZyYW1lQnlBbmdsZShhbmdsZSwgYWN0VHlwZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0QWN0bmFtZUZvckRyYWdvbkJ5QW5nbGU6IGZ1bmN0aW9uKGFuZ2xlLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBhY3ROYW1lPVwiXCI7XG4gICAgICAgIFxuICAgICAgICAvL3RvZG8gLG11c3QgYmUgc2V0IHRvIDEuMCwgc3ByaXRlIHNpemUgc2hvdWxkIGJlIGNoYW5nZWQuXG4gICAgICAgIHZhciBzY2FsZVggPSAwLjM7XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgdmFyIHNwZWNpYWxBY3RuYW1lID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYW5nbGU+MjIuNSotMSAmJiBhbmdsZTw9MjIuNSo3KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwicnVubmluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNob290aW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjcgfHwgYW5nbGU8LTIyLjUqOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInJ1bm5pbmdcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzaG9vdGluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki0xICYmIGFuZ2xlPj0yMi41Ki03KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwicnVubmluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNob290aW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY2FsZVggPSAtMC4zO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAoYW5nbGU8MjIuNSotNyl7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwicnVubmluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNob290aW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY2FsZVggPSAtMC4zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tZXJyb3IgYW5nbGUtLS0tLS0tLS0tLS0tLTpcIithbmdsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2FjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xuXG4gICAgICAgIHNwZWNpYWxBY3RuYW1lID0gdGhpcy5zcGVjaWFsQWN0KGFjdFR5cGUpO1xuICAgICAgICBpZihzcGVjaWFsQWN0bmFtZSkge1xuICAgICAgICAgICAgYWN0TmFtZSA9IHNwZWNpYWxBY3RuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0LmFjdE5hbWUgPSBhY3ROYW1lO1xuICAgICAgICByZXQuc2NhbGVYID0gc2NhbGVYO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBnZXRBY3RuYW1lRm9yRnJhbWVCeUFuZ2xlOiBmdW5jdGlvbihhbmdsZSwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgYWN0TmFtZT1cIlwiO1xuICAgICAgICB2YXIgc2NhbGVYID0gMTtcbiAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICB2YXIgc3BlY2lhbEFjdG5hbWUgPSBmYWxzZTtcblxuICAgICAgICBpZihhbmdsZT4yMi41Ki0xICYmIGFuZ2xlPD0yMi41KjEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MjIuNSoxICYmIGFuZ2xlPD0yMi41KjMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqMyAmJiBhbmdsZTw9MjIuNSo1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqNSAmJiBhbmdsZTw9MjIuNSo3KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjcgfHwgYW5nbGU8LTIyLjUqOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDIyLjUqLTEgJiYgYW5nbGU+PTIyLjUqLTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki0zICYmIGFuZ2xlPj0yMi41Ki01KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki01ICYmIGFuZ2xlPj0yMi41Ki03KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHsgIC8vIHN0YXJ0IGF0dGFja1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYW5nbGU8MjIuNSotNyl7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAgLy8gc3RhcnQgYXR0YWNrXG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS1lcnJvciBhbmdsZS0tLS0tLS0tLS0tLS0tOlwiK2FuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xuIFxuICAgICAgICBzcGVjaWFsQWN0bmFtZSA9IHRoaXMuc3BlY2lhbEFjdChhY3RUeXBlKTtcbiAgICAgICAgaWYoc3BlY2lhbEFjdG5hbWUpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBzcGVjaWFsQWN0bmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldC5hY3ROYW1lID0gYWN0TmFtZTtcbiAgICAgICAgcmV0LnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgc3BlY2lhbEFjdDogZnVuY3Rpb24oYWN0VHlwZSkge1xuICAgICAgICAvLyBpZiBqdXN0IDEgdnMgMSBhdHRhY2tcbiAgICAgICAgaWYoIXRoaXMuZ3JvdXBLaWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcInNhXCIgJiYgdGhpcy5yb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaHJfYWxsX2tpbGxcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldElkOiBmdW5jdGlvbihhaWQpIHtcbiAgICAgICAgdGhpcy5haWQgPSBhaWQ7XG5cbiAgICAgICAgLy92YXIgZXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oXCJldmVudF9lZmZlY3RcIiwgdHJ1ZSk7XG4gICAgICAgIC8vZXZlbnQuZGV0YWlsID0gXCIxMjNcIjtcbiAgICAgICAgLy90aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldFNoYWRvdzogZnVuY3Rpb24oc2hhZG93KSB7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gc2hhZG93O1xuICAgICAgICB0aGlzLnNoYWRvdy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRBZ2VudEFuZ2xlOiBmdW5jdGlvbihvUG9zLCBkUG9zLCB0YW5BbmdsZSkge1xuICAgICAgICB2YXIgZHgsZHksb3gsb3k7XG4gICAgICAgIHZhciBhbmdsZTtcblxuICAgICAgICBkeCA9IGRQb3MueDtcbiAgICAgICAgZHkgPSBkUG9zLnk7XG4gICAgICAgIG94ID0gb1Bvcy54O1xuICAgICAgICBveSA9IG9Qb3MueTtcblxuICAgICAgICBpZihkeC1veD4wICYmIGR5LW95PjApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gdGFuQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veD4wICYmIGR5LW95PDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gMTgwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g8MCAmJiBkeS1veTwwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDE4MCt0YW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGR4LW94PDAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAxODA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeS1veT09MCAmJiBkeC1veD4wKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDkwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHktb3k9PTAgJiYgZHgtb3g8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAtOTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndyb25nIGFuZ2xlIGluIEZ1bmMgTXlTcHJpdGUtPmdldEFnZW50QW5nbGUoKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbmdsZTtcbiAgICB9LFxuXG4gICAgaWZGbHlBZ2VudDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICBpZihyb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcGxheUFuZ2xlQW5pbWF0aW9uTmVhcjogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgaWYodGhpcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNjLnYyKGFnZW50Lm15cG9zLngsIGFnZW50Lm15cG9zLnkpO1xuICAgICAgICB2YXIgZW5lbXlQb3MgPSBjYy52MihhZ2VudC5lbmVteXBvcy54LCBhZ2VudC5lbmVteXBvcy55KTtcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzItYWdlbnQubXlwb3MueSk7XG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIGFjdFR5cGUgPSBhZ2VudC5hY3RUeXBlO1xuICAgICAgICB2YXIgZngsZnksdnQsYWc9MCx0YXJnZXRQb3MsYW5nbGVJbmZvO1xuXG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDtcbiAgICAgICAgdmFyIHkgPSBhZ2VudC5teXBvcy55O1xuICAgICAgICB2YXIgZXggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55O1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHN0YXJ0UG9zLnN1YihlbmVteVBvcykubWFnKCk7XG4gICAgICAgIHZhciBhdHRhY2tEaXN0YW5jZTtcblxuICAgICAgICAvLyBmbHkgYWdlbnQgc2hvdWxkIGhvdmVyIG92ZXIgYW55IG90aGVyIGFnZW50LlxuICAgICAgICBpZighdGhpcy5pZkZseUFnZW50KGFnZW50LnJvbGUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gem9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhdHRhY2tEaXN0YW5jZSA9IHRoaXMuZ2V0QXR0YWNrRGlzdGFuY2UoYWdlbnQpO1xuXG4gICAgICAgICAgICAvLzEuNSBpcyB0aGUgZGlzdGFuY2UgYWp1c3RtZW50IHZhcmlhYmxlLCBzaG91bGQgYmUgYWp1c3QgYWNjb3JkaW5nIHRvIGVhY2ggYWdlbnQgc2l6ZS5cbiAgICAgICAgICAgIC8vYXR0YWNrRGlzdGFuY2UgPSAoYWdlbnQuc2l6ZSArIGFnZW50LmVzaXplKSowLjUqMS41O1xuXG4gICAgICAgICAgICBpZihkaXN0YW5jZTw9YXR0YWNrRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoeCwgeSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgICAgICBpZih2dC54ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodnQueSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LngvdnQueSkpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpleCwgXCJ5XCI6ZXl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcInNhXCIsIHRoaXMuYW5pVHlwZSk7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuICAgICAgICAgICAgICAgIC8vdXNlZCB0byBtaXJyb3IgYSBzcHJpdGUuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBmeCA9IGFnZW50RnV0dXJlLmVuZW15cG9zLng7IFxuICAgICAgICAgICAgICAgICAgICBmeSA9IGFnZW50RnV0dXJlLmVuZW15cG9zLnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZnggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICAgICAgICAgICAgICBmeSA9IGFnZW50LmVuZW15cG9zLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKGZ4LCBmeSk7XG4gICAgICAgICAgICAgICAgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcblxuICAgICAgICAgICAgICAgIC8vaWYgZGlyIG5vIGNoYW5nZWQsIHZ0Lnggb3IgdnQueSBpcyAwLCBhdGFuIHZhbHVlIHNob3VsZCBiZSBpbnZhaWxkXG4gICAgICAgICAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZ0LnggPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2dC55ID0gMC4xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHZ0LnggIT0gMCAmJiB2dC55ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmZ4LCBcInlcIjpmeX0sIGFnKTtcbiAgICAgICAgICAgICAgICBpZihhZyA+IDE4MCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IGFnIC0gMzYwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYWcsIFwibW92ZVwiLCB0aGlzLmFuaVR5cGUpO1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcblxuICAgICAgICAgICAgICAgIC8vdXNlZCB0byBtaXJyb3IgYSBzcHJpdGUuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vYmxvb2QgYmFyIG1heSBmbGlwIHdoZW4gYWdlbnQgZmxpcCwgc2hvdWxkIG1ha2UgaXQgYmFjay5cbiAgICAgICAgICAgIHRoaXMuYmxvb2Quc2NhbGVYID0gdGhpcy5ub2RlLnNjYWxlWDtcblxuICAgICAgICAgICAgaWYodGhpcy5sYXN0QWN0ICE9IGFjdE5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTw9YXR0YWNrRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYodGhpcy5wbGF5RWZmZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5wbGF5RWZmZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZighdGhpcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYWN0TmFtZSwgcmFuZG9tVGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5QW5nbGVBbmltYXRpb25SZW1vdGU6IGZ1bmN0aW9uKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKSB7XG4gICAgICAgIHZhciBmeCxmeSxhY3RUeXBlO1xuICAgICAgICB2YXIgYWcgPSAwO1xuICAgICAgICB2YXIgeCA9IGFnZW50Lm15cG9zLng7IFxuICAgICAgICB2YXIgeSA9IGFnZW50Lm15cG9zLnk7IFxuICAgICAgICB2YXIgZXggPSBhZ2VudC5lbmVteXBvcy54OyBcbiAgICAgICAgdmFyIGV5ID0gYWdlbnQuZW5lbXlwb3MueTsgXG5cbiAgICAgICAgdmFyIHN0YXJ0UG9zLHRhcmdldFBvcyxzdGFydEVQb3MsIHRhcmdldEVQb3MsIHZ0LCB2dEU7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB6b3JkZXIgPSAxMDAwK3BhcnNlSW50KDMyLXkpO1xuXG4gICAgICAgIC8vdG90YWwgYW5pbWF0b3IgZHVyYXRpb24gaXMgMS4yNXMsIHNvIHRha2UgYSByYW5kb20gdGltZSBmcm9tIDAtMS4yNSB0byBwcmV2ZW50IHNhbWUgYWN0aW9uXG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIHRoZW47XG4gICAgICAgIHZhciBhbmdsZUluZm87XG5cbiAgICAgICAgYWN0VHlwZSA9IGFnZW50LmFjdFR5cGU7XG4gICAgICAgIGlmKGFjdFR5cGUgPT0gXCJpYVwiIHx8IGFjdFR5cGUgPT0gXCJlYVwiICkgeyBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFnID0gYWdlbnQucm90O1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gem9yZGVyO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcblxuICAgICAgICBpZihhY3RUeXBlID09IFwic2FcIikgeyAgLy9zdGFydCBhdHRhY2tcbiAgICAgICAgICAgIC8vIGRpciBhY2NvcmRpbmcgdG8gZW5lbXkgcG9zaXRpb25cbiAgICAgICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKChleCkqMzAsIChleSkqMzApO1xuICAgICAgICAgICAgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcblxuICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnggPSAwLjE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICB2dC55ID0gMC4xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgLy9hZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LnkvdnQueCkpO1xuICAgICAgICAgICAgICAgIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueC92dC55KSk7XG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpleCwgXCJ5XCI6ZXl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9IFxuXG4gICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgIGlmKGFnZW50RnV0dXJlKSB7XG4gICAgICAgICAgICAgICAgZnggPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy54OyBcbiAgICAgICAgICAgICAgICBmeSA9IGFnZW50RnV0dXJlLmVuZW15cG9zLnk7XG4gICAgICAgICAgICAgICAgLy9mdXR1cmUgYWN0dHlwZSBtYXliZSBpYSBpbnN0ZWFkIG9mIG1vdmUgb3Igc2EsIGluIHRoaXMgY2FzZSBzaG91bGQgbm90IGJlIGhhbmRsZWQuXG4gICAgICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUgJiYgYWdlbnRGdXR1cmUuYWN0VHlwZSAhPSBcImlhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0VHlwZSA9IGFnZW50RnV0dXJlLmFjdFR5cGU7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICAgICAgICAgIGZ5ID0gYWdlbnQuZW5lbXlwb3MueTtcbiAgICAgICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSAmJiBhZ2VudEZ1dHVyZS5hY3RUeXBlICE9IFwiaWFcIikge1xuICAgICAgICAgICAgICAgICAgICBhY3RUeXBlID0gYWdlbnRGdXR1cmUuYWN0VHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFydFBvcyAgPSBjYy52MigoeCkqMzAsICh5KSozMCk7XG4gICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MigoZngpKjMwLCAoZnkpKjMwKTtcbiAgICAgICAgICAgIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG5cbiAgICAgICAgICAgIC8vaWYgZGlyIG5vIGNoYW5nZWQsIHZ0Lnggb3IgdnQueSBpcyAwLCBhdGFuIHZhbHVlIHNob3VsZCBiZSBpbnZhaWxkXG4gICAgICAgICAgICBpZih2dC54ID09IDApIHtcbiAgICAgICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodnQueSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgICAgIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueC92dC55KSk7XG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpmeCwgXCJ5XCI6Znl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBhY3RUeXBlLCB0aGlzLmFuaVR5cGUpO1xuICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG4gICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG5cbiAgICAgICAgICAgIC8vYmxvb2QgYmFyIG1heSBmbGlwIHdoZW4gYWdlbnQgZmxpcCwgc2hvdWxkIG1ha2UgaXQgYmFjay5cbiAgICAgICAgICAgIHRoaXMuYmxvb2Quc2NhbGVYID0gdGhpcy5ub2RlLnNjYWxlWDtcblxuICAgICAgICAgICAgLy9pZiBhbHJlYWR5IGluIGF0dGFjayBtb2RlLCBqdXN0IHNraXAgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgaWYodGhpcy5sYXN0QWN0ICE9IGFjdE5hbWUgfHwgYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgICAgICAvL2lmIGRyYWdvbiBib25lcyBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hbmlUeXBlPT1cImRyYWdvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaVN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pUGxheShhY3ROYW1lKTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2Fsa2luZyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgZHJhZ29uIGJvbmVzIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmFuaVR5cGU9PVwiZHJhZ29uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pUGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4vKlxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYW5nbGUsIGFjdFR5cGUpO1xuICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG5cbiAgICAgICAgICAgIC8vaWYgYWxyZWFkeSBpbiBhdHRhY2sgbW9kZSwganVzdCBza2lwIHRoZSBhbmltYXRpb25cbiAgICAgICAgICAgIGlmKHRoaXMubGFzdEFjdCAhPSBhY3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgY2hhbmdpbmcgZGlyIGZyZXF1ZW50bHkuIGFnZW50IHdvdWxkIGxvb2tzIHRyZW1ibGUgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICAgIGlmKHRoZW4gLSB0aGlzLm5vdyA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdyA9IHRoZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2lmKHRoaXMubGFzdEFjdCAhPSBhY3ROYW1lICYmIGFjdFR5cGU9PVwic2FcIikge1xuICAgICAgICAgICAgLy8gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vICAgIHZhciBhbmltU3RhdGUgPSB0aGlzLl9hbmltYXRpb24uZ2V0QW5pbWF0aW9uU3RhdGUoYWN0TmFtZSk7XG4gICAgICAgICAgICAvLyAgICBpZiAoYW5pbVN0YXRlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgYW5pbVN0YXRlLm9uKCdsYXN0ZnJhbWUnLCAoZXZlbnQpID0+IHt9LCB0aGlzKTtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICB0aGlzLmxhc3RBY3QgPSBhY3ROYW1lO1xuXG4gICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICB9XG4qL1xuXG4gICAgICAgIHRoaXMubGFzdEFjdFR5cGUgPSBhY3RUeXBlO1xuICAgIH0sXG5cbiAgICBhbmlQbGF5OiBmdW5jdGlvbihhY3ROYW1lLCByYW5kb21UaW1lPW51bGwpIHtcbiAgICAgICAgaWYodGhpcy5hbmlUeXBlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hbmlUeXBlID09IFwiZHJhZ29uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5QW5pbWF0aW9uKGFjdE5hbWUsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYocmFuZG9tVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYW5pU3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuYW5pVHlwZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYW5pVHlwZSA9PSBcImRyYWdvblwiKSB7XG4gICAgICAgICAgICAvL3Nob3VsZCBkbyBzdG9wIGRyYWdvbiBhbmkgaGVyZS5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19