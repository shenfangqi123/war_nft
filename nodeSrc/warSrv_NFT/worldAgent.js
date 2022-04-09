var cr = cr || {};

if(typeof(browserVer) === "undefined") {
    var Box2D = require('box2dweb');
    var const_gridPx = 30;

    var horizon_grids = 16;
    var vertical_grids = 35;

    cr.intersect = require('./intersect.js');
    cr.gameSetting = require("./gameSetting.js");
}

//-----client start--------------------

var extend = function(obj) {
    each(slice.call(arguments,1), function(source) {
        for(var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
};

Array.prototype.flowField = function() {
    var flowField = [];
    for(var i=0;i<this.length;i++) {
        var arr = [];
        for(var j=0;j<this[i].length;j++) {
            arr.push(new B2Vec2(this[i][j][0], this[i][j][1]));
        }
        flowField.push(arr);
    }
    return flowField;
};

Array.prototype.reverseFlowField = function() {
    var reverseFlowField = [];
    for(var i=0;i<this.length;i++) {
        var myarr = [];
        for(var j=0;j<this[i].length;j++) {
            var l=this[i].length-j-1;
            myarr.push(new B2Vec2(this[i][l][0], 0-this[i][l][1]));
        }
        reverseFlowField.push(myarr);
    }
    return reverseFlowField;
};

//shortcut all the common stuff
var B2Math = Box2D.Common.Math.b2Math;
var B2Vec2 = Box2D.Common.Math.b2Vec2;
B2Vec2.Zero = Box2D.Common.Math.b2Math.b2Vec2_zero;

var B2BodyDef = Box2D.Dynamics.b2BodyDef;
var B2Body = Box2D.Dynamics.b2Body;
var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var B2Fixture = Box2D.Dynamics.b2Fixture;
var B2World = Box2D.Dynamics.b2World;
var B2MassData = Box2D.Collision.Shapes.b2MassData;
var B2Shape = Box2D.Collision.Shapes.b2Shape;
var B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

var b2RayCastInput = Box2D.Collision.b2RayCastInput;
var b2RayCastOutput = Box2D.Collision.b2RayCastOutput;

//Methods on box2d stuff start with capitals, so yeah...
B2Vec2.prototype.Round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
};

B2Vec2.prototype.Floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
};

B2Vec2.prototype.Angle = function () {
    return Math.atan2(this.x, -this.y) * 180 / Math.PI;
};

B2Vec2.prototype.DistanceTo = function (target) {
    return this.Copy().Subtract(target).Length();
};

B2Vec2.prototype.Divide = function (a) {
    if (a === undefined) a = 0;
    this.x /= a;
    this.y /= a;
    return this;
};

//////////////////////////////////////
cr.worldObject = function (world,isHero) {
    this.world = world;
    this.gameSetting = new cr.gameSetting();

    this.agentId = 
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

    this.isHero = isHero;
    this.level = 1;
    this.body = null;
    this.size = 0;
    this.objectId = 0;
    this.actType = "";
    this.groupKill = [];

    this.agents = null;
    this.bases = null;
    this.forts = null;

    this.bullets = null;

    this.objectType = "";
    this.originLife = 0;

    this.enemyDestination = null;
    this.baseDestination = null;
    
    this.scoutRangeVal = 0;

    //how far a agent can kill
    this.attackRangeVal = 0;

    //kill enemies within a target range.
    this.killRange = 0;

    this.attackRateVal = 1000;
    this.attackForceVal = 0;
    //the counter of attack duration. 
    this.attackActDura = 0;
    //exceed the max number then count from 0.     
    this.maxAttackActDura = 35;

    this.isActive = true;
    //time scale that object got freezed.
    this.freezeCounter = 0;

    this.innerId = "";

    //attack to surface of the target.
    this.attackToPos = null;

    //game tick will check this value to see if agent start to do attack act, if ture, send to client and set it to false
    this.startAct = false;

    //role used in client as skeleton or archers giant etc
    //charType used in server to handle collision
    //chartype 1, agent
    //         2, base, fort
    //         3, bullet
    //         12, log
    this.userData = {"role":"", "charType":-1, "lifeVal":-1, "isHero":-1};
    this.then = Date.now();

    // designed to store 30 rows of data. 
    this.traceBack = new Array();
};

/*
cr.worldObject.prototype.getLastTraceData = function() {
    if(this.traceBack.length >= 30) {
        //let current agent point to future postion.
        this.traceBack[0].futurepos = this.traceBack[29].mypos;

        this.traceBack[0].futureact = this.traceBack[0].actType;
        return this.traceBack[0];
    } 
    return false;
};

cr.worldObject.prototype.setTraceData = function() {
    var traceData = {};
    traceData.agentType = this.objectType;
    traceData.mypos = {};
    traceData.enemypos = {};
    traceData.life = this.getLife();

    traceData.rot = this.rotation; 
    traceData.mypos.x = this.corePosition().x;
    traceData.mypos.y = vertical_grids - this.corePosition().y;

    traceData.attackDura = 1000/30 * this.maxAttackActDura;

    if(this.enemyDestination && this.enemyDestination.getLife()>0) {
        traceData.eid = this.enemyDestination.agentId;
        traceData.enemypos.x = this.enemyDestination.corePosition().x+0.5;
        traceData.enemypos.y = vertical_grids - this.enemyDestination.corePosition().y-1.0;            
    }

    traceData.aid = this.agentId;
    traceData.role = this.getRole();
    traceData.objectId = this.objectId;
    traceData.actType = this.actType;

    if(this.traceBack.length >= 30) {
        this.traceBack.shift();
    }

    this.traceBack.push(traceData);
};
*/

cr.worldObject.prototype.formTraceData = function() {
    var traceData = {};
    traceData.agentType = this.objectType;
    traceData.mypos = {};
    traceData.life = this.getLife();
    traceData.groupKill = this.isGroupKill();

    traceData.isHero = this.isHero;
    traceData.rot = this.rotation;
    traceData.mypos.x = this.corePosition().x + 0.5;
    traceData.mypos.y = vertical_grids - this.corePosition().y + 0.5;

    traceData.attackDura = 1000/30 * this.maxAttackActDura;

    if(this.enemyDestination) {
        traceData.enemypos = {};
        traceData.eid = this.enemyDestination.agentId;
        traceData.esize = this.enemyDestination.size;
        traceData.enemypos.x = this.enemyDestination.corePosition().x + 0.5;
        traceData.enemypos.y = vertical_grids - this.enemyDestination.corePosition().y + 0.5;            
    }

    //for firebomb bullet, which no enemy, just a target point assigned by client.
    if(this.targetPos) {
        traceData.targetpos = {};
        traceData.targetpos.x = this.targetPos.x + 0.5;
        traceData.targetpos.y = vertical_grids - this.targetPos.y + 0.5;
    }

    //for forts bullet, which the attack point is higher than floor, so 2 bullet will emit
    //client will choose which to display
    if(this.upDown) {
        traceData.updown = this.upDown;
    }

    traceData.aid = this.agentId;
    traceData.innerId = this.innerId;
    traceData.role = this.getRole();
    traceData.objectId = this.objectId;
    traceData.actType = this.actType;
    traceData.size = this.size;
    traceData.level = this.level;

    return traceData;
};

cr.worldObject.prototype.formProtoData = function(acAgent) {
    var eid = "";
    var epx = -1;
    var epy = -1;
    var esize = -1;
    var tpx = -1;
    var tpy = -1;
    var upDown = "no";
    //var offset = 0.5;
    var offset = 0.0;

    if(this.enemyDestination) {
        eid = this.enemyDestination.agentId;
        esize = this.enemyDestination.size;
        epx = this.enemyDestination.corePosition().x + offset;
        epy = vertical_grids - this.enemyDestination.corePosition().y + offset;            
    }

    if(this.targetPos) {
        tpx = this.targetPos.x + offset;
        tpy = vertical_grids - this.targetPos.y + offset;
    }

    if(this.upDown) {
        upDown = this.upDown;
    }

    var agent = acAgent.create({
        agentType: this.objectType,
        innerId: this.innerId,
        mpx: this.corePosition().x + offset,
        mpy: vertical_grids - this.corePosition().y + offset,
        life: this.getLife(),
        groupKill: this.isGroupKill(),
        isHero: this.isHero,
        rot: this.rotation,
        attackDura: 1000/30 * this.maxAttackActDura,
        aid: this.agentId,
        role: this.getRole(),
        objectId: this.objectId,
        actType: this.actType,
        size: this.size,
        level: this.level,

        eid: eid,
        esize : esize,
        epx: epx,
        epy: epy,

        tpx: tpx,
        tpy: tpy,

        updown: upDown
    });

    return agent;
};

cr.worldObject.prototype.setKillRange = function(val) {
    this.killRange = val;
};
cr.worldObject.prototype.setFreezeCounter = function(val) {
    this.freezeCounter = val;
};
cr.worldObject.prototype.setInnerId = function(val) {
    this.innerId = val;
};
cr.worldObject.prototype.setObjectId = function(val) {
    this.objectId = val;
};
cr.worldObject.prototype.setSize = function (val) {
    this.size = val;
};
cr.worldObject.prototype.isHero = function () {
    return this.isHero;
};
cr.worldObject.prototype.setAgents = function(agents) {
    this.agents = agents;
};
cr.worldObject.prototype.setBullets = function(bullets) {
    this.bullets = bullets;
};
cr.worldObject.prototype.setBases = function(bases) {
    this.bases = bases;
};
cr.worldObject.prototype.setForts = function(forts) {
    this.forts = forts;
};
cr.worldObject.prototype.setLife = function (val) {
    this.originLife = val;
    this.body.m_userData.lifeVal = val;
};
cr.worldObject.prototype.getLife = function () {
    return this.body.m_userData.lifeVal;
};
cr.worldObject.prototype.setLevel = function (val) {
    this.level = val;
};
cr.worldObject.prototype.getRole = function () {
    return this.body.m_userData.role;
};
cr.worldObject.prototype.setType = function (val) {
    this.objectType = val;
};
cr.worldObject.prototype.setCharType = function (val) {
    this.body.m_userData.charType = val;
};
cr.worldObject.prototype.getCharType = function (val) {
    return this.body.m_userData.charType;
};
cr.worldObject.prototype.corePosition = function () {
    return this.body.GetPosition();
};
//some remote attack postion was specified by client user, so no emeny agent.
cr.worldObject.prototype.setTargetPos = function (vPos) {
    this.targetPos = vPos;
};
cr.worldObject.prototype.setDestination = function (agent) {
    this.enemyDestination = agent;
};
cr.worldObject.prototype.setBaseDestination = function (base) {
    this.baseDestination = base;
};
cr.worldObject.prototype.setScoutRange = function (val) {
    this.scoutRangeVal = val;
};
cr.worldObject.prototype.getScoutRange = function () {
    return this.scoutRangeVal;
};
cr.worldObject.prototype.damage = function (attackForceVal) {
    var life = this.body.m_userData.lifeVal;
    life -= attackForceVal;
    this.body.m_userData.lifeVal = life;
};
cr.worldObject.prototype.setAttackRange = function (val) {
    this.attackRangeVal = val;
};
cr.worldObject.prototype.setAttackRate = function (val) {
    this.attackRateVal = val;
};
cr.worldObject.prototype.setAttackMaxDura = function (val) {
    this.maxAttackActDura = val;
};
cr.worldObject.prototype.setAttackForce = function (val) {
    this.attackForceVal = val;
};
cr.worldObject.prototype.isKilled = function (agent) {
    var life = this.body.m_userData.lifeVal;
    return life>0?false:true;
};
//client may act different according to encircled by enemy or not.
cr.worldObject.prototype.isGroupKill = function () {
    return this.groupKill.length>1;
};
cr.worldObject.prototype.move = function (val) {
};
cr.worldObject.prototype.preMove = function (dt) {
};
cr.worldObject.prototype.afterMove = function (dt) {
};
cr.worldObject.prototype.preAttack = function (dt) {
};
cr.worldObject.prototype.afterAttack = function (dt) {
};
cr.worldObject.prototype.setParamsByLevel = function (role, level) {
    var life;
    var setting = this.gameSetting.getAgentSetting(role);
    if(setting) {
        if(setting.lifeVal) {
            life = setting.lifeVal + (level-1)*(setting.lifeVal/20);
            this.originLife = life;
            console.log("##############life:" + life);
        }

        //for agent 
        setting.maxSpeed && (this.maxSpeed = setting.maxSpeed);
        setting.attackForceVal && (this.attackForceVal = setting.attackForceVal);
        setting.killRange && (this.killRange = setting.killRange);
        setting.lifeVal && (this.userData.lifeVal = life);
        setting.maxAttackActDura && (this.maxAttackActDura = setting.maxAttackActDura);

        //for bomb
        setting.exploreRange && (this.exploreRange = setting.exploreRange);
        setting.baseExploreVal && (this.baseExploreVal = setting.baseExploreVal);
        setting.agentExploreVal && (this.agentExploreVal = setting.agentExploreVal);
    }
};
cr.worldObject.prototype.attackEnemy = function (target) {
    //only very near attack agent will do following attack.
    if(this.attackRangeVal<2 && target.actType == "move" && Math.abs(this.rotation-target.rotation)<20) {
        //when contact with target twice, attack once.
        if(this.attackActDura < 2) {
            this.attackActDura++;
        } else {
            this.doAttackTask(target);
            this.attackActDura = 0;
        }
        return;
    }

    //just start to attack info should send to client by game tick
    if(this.attackActDura==0) {
        this.actType = "ea";   // start attack
        this.attackActDura++;

        //make remote attack agent to attack at once instead of to wait.
        //if(this.attackRange > 0) {
        //    return;
        //}
    }
    else if(this.attackActDura<this.maxAttackActDura) {
        this.actType = "ia";   // in attacking        
        this.attackActDura++;
    }
    else {
        this.doAttackTask(target);
    }
};

cr.worldObject.prototype.doAttackTask = function(target) {
    this.actType = "sa";   // end attack
    this.groupKill = [];
    this.preAttack();

    this.attackActDura = 1;

    if(this.userData.role == "lr") {
        this.putBullet("bullet", this.corePosition(), this.isHero, this.killRange, this.attackForceVal);
        return;
    }
    else if(this.userData.role == "wiz") {
        this.putBullet("wizfire", this.corePosition(), this.isHero, this.killRange, this.attackForceVal);
        return;
    }
    else if(this.userData.role == "base") {
        var oPos = this.corePosition();

        //if main base, then shoot tama bullet instead of arrow.
        if(this.objectId == 1 || this.objectId == 4) {
            bulletRole = "tama";
        } else {
            bulletRole = "bullet";            
        }

        //0.6 is the value should be ajust according to client
        var dPos = new B2Vec2(oPos.x, oPos.y-1.0);
        this.putBullet(bulletRole, dPos, false, this.killRange, this.attackForceVal, "up");

        dPos = new B2Vec2(oPos.x, oPos.y+1.0);
        this.putBullet(bulletRole, dPos, false, this.killRange, 0, "down");

        return;
    }
    //fort warroir stand on fort, so it is higher than fort floor.
    else if(this.userData.role == "fa") {
        var oPos = this.corePosition();
        //this.putBullet(oPos, false, this.killRange, this.attackForceVal, "up");

        //forts has a height, when up&down mirror, it will need to decide which to display.
        //1.0 is the value should be ajust according to client
        var dPos = new B2Vec2(oPos.x, oPos.y-1.0);
        this.putBullet("bullet", dPos, false, this.killRange, this.attackForceVal, "up");

        dPos = new B2Vec2(oPos.x, oPos.y+1.0);
        this.putBullet("bullet", dPos, false, this.killRange, 0, "down");

        return;
    }

/*
    var mx,my,mr,nx,ny,nr,sinv,cosv,tx,ty;
    if(target.objectType == "base" || target.objectType == "fort") {
        mr = this.corePosition().DistanceTo(target.corePosition());
        mx = target.corePosition().x - this.corePosition().x;
        my = target.corePosition().y - this.corePosition().y;
        sinv = my/mr;
        cosv = mx/mr;

        ny = sinv*(target.size/2);
        nx = cosv*(target.size/2);

        tx = target.corePosition().x - nx;
        ty = target.corePosition().y - ny;

        this.attackToPos = new B2Vec2(tx, ty);
    }
*/


    if(this.groupKill.length > 0) {
        for(agent of this.groupKill) {
            agent.damage(this.attackForceVal);
        }
        //this.groupKill = [];
    }

    target.damage(this.attackForceVal);
    if(target.getLife() <= 0) {
        target.setLife(0);
    }

    if(this.killRange>0) {
        // kill all enemies around the target within attack range
        var allObjects = this.agents.concat(this.forts).concat(this.bases);
        for(agent of allObjects) {
            //if it is enemy.

            if(agent.isHero !== this.isHero) {
                //if enemy within kill range. that mean one attack may result to multi kills.
                //if(agent.corePosition().DistanceTo(target.corePosition()) <= this.killRange + (target.size*0.5+0.5))  {
                if(agent.corePosition().DistanceTo(target.corePosition()) <= this.killRange + (target.size-1)*0.5)  {
                    agent.damage(this.attackForceVal);
                    if(agent.getLife() < 0) {
                        agent.setLife(0);
                    }
                }
            }
        }        
    }

    this.afterAttack();
};


cr.worldObject.prototype.setSteerImp = function(steerImp) {
    this.b2dSteerImp = steerImp;
};

cr.worldObject.prototype.putBullet = function(bulletRole, vPos, isHero, killRange, killForce, updown) {
    var cate,mask,thisAgent;
    cate = 0x0000;
    mask = 0x0002;

    thisAgent = new cr.Bullet(this.world, isHero, bulletRole);
    //param: pos,size,groupIndex,categoryBits,maskBits

    //if set group id to -1, to avoid any collide
    thisAgent.genAgentBody(vPos, 1.2, -1, cate, mask);
    thisAgent.setSteerImp(this.b2dSteerImp);
    thisAgent.setAgents(this.agents);
    thisAgent.setForts(this.forts);
    thisAgent.setBases(this.bases);
    thisAgent.setUpDown(updown);

    thisAgent.setKillRange(killRange);
    thisAgent.setAttackForce(killForce);

    //thisAgent.setNextBaseDestination();

    thisAgent.setDestination(this.enemyDestination);
    //this.agents.push(thisAgent);
    this.bullets.push(thisAgent);
};

//////////////////////////////////////
cr.Fort = function(world, isHero, level) {
    cr.worldObject.call(this);
    this.world = world;
    this.objectType = "fort";  //attack enemy to: all, ground, sky
    this.soidierType = "ground";
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.
    this.isHero = isHero;
    this.buildingBody = null;
    this.recoverFlow = [];
    this.rotation = 0;
    this.userData = {"role":"fa", "charType":2, "lifeVal":1000, "isHero":isHero};
};
cr.Fort.prototype = new cr.worldObject();

cr.Fort.prototype.attack = function() {
    if(this.freezeCounter > 0) {
        this.freezeCounter--;
        return;
    }

    var enemy = this.findEnemy();
    //this.setDestination(enemy);

    //if enemy found and within attack range then stop.
    if(this.enemyDestination != null && this.enemyDestination.getLife() > 0) {
        var targetSize = this.enemyDestination.size;
        var attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1) + 0.2;

        //Apply the force
        if(this.corePosition().DistanceTo(this.enemyDestination.corePosition()) <= attackRange)  {
            this.attackEnemy(this.enemyDestination);
        }
    } else {
        this.actType = "move";
    }

/*
    //if base found and within attack range then stop.
    else if(this.baseDestination != null) {
        var targetSize = this.baseDestination.size;
        var attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1) + 0.2;

        if(this.corePosition().DistanceTo(this.baseDestination.corePosition()) <= attackRange)  {
            this.attackEnemy(this.baseDestination);
        }
    } 
*/
};

cr.Fort.prototype.recoverFlowField = function(flowField, reverseFlowField) {
    var gx, gy;
    for(var rec of this.recoverFlow) {
        gx = rec[0];
        gy = rec[1];
        flowField[gx][gy] = rec[2];
        reverseFlowField[gx][gy] = rec[3];
    }
};
cr.Fort.prototype.destroy = function(flowField, reverseFlowField) {
    this.world.DestroyBody(this.body);
    this.world.DestroyBody(this.buildingBody);
    this.recoverFlowField(flowField, reverseFlowField);
};
cr.Fort.prototype.genFortBody = function (pos, size) {
    if(this.isHero) {
        cate = 0x0001;
        mask = 0x0011;
        group = 2;
    } else {
        cate = 0x0002;
        mask = 0x0010;
        group = 11;        
    }

    this.size = size;
    this.x = pos.x;
    this.y = pos.y;
    var basePos = new B2Vec2(pos.x+size/2-0.5, pos.y+size/2-0.5);

    //Create a physics body for the agent
    var fixDef = new B2FixtureDef();
    var bodyDef = new B2BodyDef();

    // create base center object
    fixDef.density = 10.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.0;
    fixDef.shape = new B2CircleShape(this.radius * 0.5);

    fixDef.filter.groupIndex = 9;
    fixDef.filter.categoryBits = 0;
    fixDef.filter.maskBits = 0x4;
    bodyDef.type = B2Body.b2_staticBody;
    //bodyDef.position.SetV(basePos);


    this.body = this.world.CreateBody(bodyDef);
    this.body.SetPosition(basePos);
    this.body.CreateFixture(fixDef);
    this.body.SetUserData(this.userData);

    //create base building
    fixDef.density = 100;
    fixDef.friction = 0;
    fixDef.restitution = 0;
    fixDef.shape = new B2PolygonShape();

//    fixDef.filter.groupIndex = 11;
//    fixDef.filter.categoryBits = 0x0002;
//    fixDef.filter.maskBits = 0x0010;

//    fixDef.filter.groupIndex = 2;
//    fixDef.filter.categoryBits = 0x0001;
//    fixDef.filter.maskBits = 0x0011;

    fixDef.filter.groupIndex = group;
    fixDef.filter.categoryBits = cate;
    fixDef.filter.maskBits = mask;

    bodyDef.type = B2Body.b2_staticBody;
    fixDef.shape.SetAsBox(size*0.5, size*0.5);
    //bodyDef.position.SetV(basePos);

    this.buildingBody = this.world.CreateBody(bodyDef);
    this.buildingBody.SetPosition(basePos);
    this.buildingBody.CreateFixture(fixDef);
};
cr.Fort.prototype.findEnemy = function () {
    var agent;
    var isHero;
    var thisScoutRange = this.getScoutRange(); 
    var choosen;
    var distance;
    var dMax = 99;
    var mergeArr = [];

    mergeArr = this.agents.concat(this.forts);
    mergeArr = mergeArr.concat(this.bases);

    //find enmey which is the nearest to agent
    for (agent of mergeArr) {
        isHero = agent.isHero;
        //if(agent.isHero != this.isHero && agent.getLife()>0 && agent.userData.charType == 1) {
        if(agent.isHero != this.isHero && agent.getLife()>0) {
            distance = this.corePosition().DistanceTo(agent.corePosition());
            if(distance < thisScoutRange) {
                if(distance<dMax) {
                    choosen = agent;
                    dMax = distance;
                }
            }
        }
    }

    if(choosen) {
        this.setDestination(choosen);
    }

    //return null;
};
cr.Fort.prototype.regenFlow = function (flowField, reverseFlowField) {
    var mx = this.y;
    var my = this.x;

    var gx,gy;

    gx = my;
    gy = mx;

    var recoverTemp = [];
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 0);
        reverseFlowField[gx][gy] = new B2Vec2(0, 0);
    }

    gx = my+1;
    gy = mx;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 0);
        reverseFlowField[gx][gy] = new B2Vec2(0, 0);
    }

    gx = my;
    gy = mx+1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 0);
        reverseFlowField[gx][gy] = new B2Vec2(0, 0);
    }

    gx = my+1;
    gy = mx+1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 0);
        reverseFlowField[gx][gy] = new B2Vec2(0, 0);
    }


    gx = my - 1;
    gy = mx - 1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my;
    gy = mx - 1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(-1, 0);
        reverseFlowField[gx][gy] = new B2Vec2(-1, 0);
    }

    gx = my + 1;
    gy = mx - 1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(1, 0);
        reverseFlowField[gx][gy] = new B2Vec2(1, 0);
    }

    gx = my + 2;
    gy = mx - 1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }


    gx = my - 1;
    gy = mx;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my - 1;
    gy = mx + 1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my - 1;
    gy = mx + 2;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my + 2;
    gy = mx;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my + 2;
    gy = mx + 1;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my + 2;
    gy = mx + 2;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(0, 1);
        reverseFlowField[gx][gy] = new B2Vec2(0, -1);
    }

    gx = my + 1;
    gy = mx + 2;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(1, 0);
        reverseFlowField[gx][gy] = new B2Vec2(1, 0);
    }

    gx = my;
    gy = mx + 2;
    if(gx >= 1 && gy >= 1 && gx <= 18 && gy <= vertical_grids) {
        this.recoverFlow.push([gx,gy,flowField[gx][gy],reverseFlowField[gx][gy]]);
        flowField[gx][gy] = new B2Vec2(-1, 0);
        reverseFlowField[gx][gy] = new B2Vec2(-1, 0);
    }
};


//////////////////////////////////////
cr.Fence = function(world) {
    cr.worldObject.call(this);
    this.world = world;
    this.objectType = "fence";
};
cr.Fence.prototype = new cr.worldObject();

cr.Fence.prototype.genBaseBody = function (pos) {
    //Create a physics body for the agent
    var fixDef = new B2FixtureDef();
    var bodyDef = new B2BodyDef();

    fixDef.density = 1.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.2;
    fixDef.shape = new B2PolygonShape();

    fixDef.filter.groupIndex = 4;
    fixDef.filter.categoryBits = 0x0010;
    fixDef.filter.maskBits = 0x0012;

    bodyDef.type = B2Body.b2_staticBody;
    fixDef.shape.SetAsBox(0.5, 0.5);
    bodyDef.position.SetV(pos);

    this.world.CreateBody(bodyDef).CreateFixture(fixDef);
};


//////////////////////////////////////
cr.Base = function(world, isHero) {
    cr.worldObject.call(this);
    this.world = world;
    this.objectType = "base";
    this.soldierType = "ground";
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.
    this.isHero = isHero;
    this.userData = {"role":"base", "charType":2, "lifeVal":1000, "isHero":isHero};
    this.actType = "wait";
    this.rotation = 0;
};
cr.Base.prototype = new cr.worldObject();

cr.Base.prototype.getLastBaseTraceData = function() {
    var len;
    var retRec;
    if(this.traceBack.length >= 30) {
        retRec = this.traceBack[0];
    } else {
        len = this.traceBack.length;
        retRec = this.traceBack[len-1];
    }
    return this.traceBack[0];
};
cr.Base.prototype.destroy = function() {
    this.world.DestroyBody(this.body);
    this.world.DestroyBody(this.buildingBody);
};
cr.Base.prototype.attack = function() {
    this.actType = "wait";
    if(this.freezeCounter > 0) {
        this.freezeCounter--;
        return;
    }

    var enemy = this.findEnemy();

    //if enemy found and within attack range then stop.
    if(this.enemyDestination != null && this.enemyDestination.getLife() > 0) {
        var targetSize = this.enemyDestination.size;
        var attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1) + 0.2;

        //Apply the force
        if(this.corePosition().DistanceTo(this.enemyDestination.corePosition()) <= attackRange) {
            this.attackEnemy(this.enemyDestination);
            if(this.enemyDestination.isKilled()) {
                this.enemyDestination = null;
            }
        }
    }

    //this.setTraceData();
};

cr.Base.prototype.findEnemy = function () {
    var agent;
    var isHero;
    var thisScoutRange = this.getScoutRange(); 
    var choosen;
    var distance;
    var dMax = 99;
    var mergeArr = [];

    mergeArr = this.agents.concat(this.forts);

    //find enmey which is the nearest to agent
    for (agent of mergeArr) {
        isHero = agent.isHero;
        if(agent.isHero != this.isHero && agent.getLife()>0 && agent.userData.charType == 1) {
            distance = this.corePosition().DistanceTo(agent.corePosition());
            if(distance < thisScoutRange) {
                if(distance<dMax) {
                    choosen = agent;
                    dMax = distance;
                }
            }
        }
    }

    if(choosen) {
        this.setDestination(choosen);
    }
    //return null;
};
cr.Base.prototype.genBaseBody = function (pos, size) {
    //Create a physics body for the agent
    var fixDef = new B2FixtureDef();
    var bodyDef = new B2BodyDef();
    var group,mask,cate;
    this.size = size;
    //basepos is the center of the base Object
    
    //basePos = new B2Vec2(pos.x+size/2-0.5, pos.y+size/2-0.5);
    basePos = new B2Vec2(pos.x, pos.y);


    // create base center object
    fixDef.density = 10.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.0;

    fixDef.shape = new B2CircleShape(this.radius * 0.5);

    fixDef.filter.groupIndex = 9;
    fixDef.filter.categoryBits = 0x0000;
    fixDef.filter.maskBits = 0x0002;

    bodyDef.type = B2Body.b2_staticBody;
    //bodyDef.position.SetV(basePos);

    this.body = this.world.CreateBody(bodyDef);
    this.body.CreateFixture(fixDef);
    this.body.SetUserData(this.userData);
    this.body.SetPosition(basePos);

    // create base whole object
    fixDef.density = 100.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.0;
    //fixDef.shape = new B2PolygonShape();
    fixDef.shape = new B2CircleShape(this.size * 0.5);

    if(this.isHero) {
        cate = 0x0001;
        mask = 0x0011;
        group = 2;
    } else {
        cate = 0x0002;
        mask = 0x0010;
        group = 11;        
    }

    fixDef.filter.groupIndex = group;
    fixDef.filter.categoryBits = cate;
    fixDef.filter.maskBits = mask;

/*
    fixDef.filter.groupIndex = 2;
    fixDef.filter.categoryBits = 0x0002;
    fixDef.filter.maskBits = 0x0013;
*/

    bodyDef.type = B2Body.b2_staticBody;
    //fixDef.shape.SetAsBox(size*0.5, size*0.5);
    
    //bodyDef.position.SetV(basePos);

    this.buildingBody = this.world.CreateBody(bodyDef);
    this.buildingBody.SetPosition(basePos);
    this.buildingBody.CreateFixture(fixDef);
};


//////////////////////////////////////
cr.Agent = function(world, isHero, level) {
    cr.worldObject.call(this);
    this.world = world;
    this.isHero = isHero;
    this.objectType = "agent";
    this.rotation = 0;
    this.bodySize = 1;
    this.soldierType = "";   //ground, sky, this soidier is walking or fly
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    this.maxForce = 5; //rate of acceleration
    this.maxSpeed = 2; //grid squares / second
    this.radius = 0.4;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    this.maxCohesion = 1.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 5.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 1.0;

    this.userData = {"role":"agent", "charType":1, "lifeVal":1000, "isHero":isHero};

    //some agent may kill multi enmey by one blow. eg: agent7 the hero.
    this.groupKill = [];
};
cr.Agent.prototype = new cr.worldObject();

/*
cr.Agent.prototype.ifEncircled = function () {
    var mergeArr = [];
    mergeArr = this.agents.concat(this.forts);  
    mergeArr = mergeArr.concat(this.bases);

    for (agent of this.mergeArr) {
        isHero = agent.isHero;
        //userData.charType 1:agent, 2:base or fort. hereby not to target bullet or log object
        if (
            agent.isHero != this.isHero && 
            agent.getLife()>0 && 
            (agent.userData.charType == 1 || agent.userData.charType == 2)
        ) {
            distance = this.corePosition().DistanceTo(agent.corePosition());
        }
    }
};
*/


cr.Agent.prototype.genAgentBody = function (pos,size,groupIndex,categoryBits,maskBits) {
    this.size = size;

    //Create a physics body for the agent
    var fixDef = new B2FixtureDef();
    var bodyDef = new B2BodyDef();

    fixDef.density = this.density;
    fixDef.friction = this.friction;
    fixDef.restitution = this.restitution;
    fixDef.shape = new B2CircleShape(this.radius * 0.5);

    fixDef.filter.categoryBits = categoryBits;
    fixDef.filter.maskBits = maskBits;
    fixDef.filter.groupIndex = groupIndex;
    this.actType = "move";

    bodyDef.type = B2Body.b2_dynamicBody;
    //bodyDef.position.SetV(pos);
    
    //simulate ground up-down perspective friction
    bodyDef.linearDamping = this.linearDamping;
    bodyDef.active = true;

    this.body = this.world.CreateBody(bodyDef);
    this.body.SetUserData(this.userData);
    this.body.SetPosition(pos);

    this.fixture = this.body.CreateFixture(fixDef);
    this.intersect = new cr.intersect();
};

cr.Agent.prototype.setSoldierType = function(val) {
    this.soldierType = val;
};
cr.Agent.prototype.setAttackType = function(val) {
    this.attackType = val;
};
cr.Agent.prototype.attack = function(dt) {
    if(this.freezeCounter > 0) {
        //for agent, move function will do this counting down.
        this.freezeCounter--;
        return;
    }

    // if this attack type is all , or attack type is enemy's type.
    if(this.attackType == "all" || this.attackType == this.enemyDestination.soldierType || this.attackType == "base") {
        //if enemy found and within attack range then stop.
        if(this.enemyDestination != null && this.enemyDestination.getLife() > 0) {

            var targetSize = this.enemyDestination.size;
            //var attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1);
            var attackRange = this.attackRangeVal + (targetSize + this.size)*0.5 + 0.2;

            if(this.corePosition().DistanceTo(this.enemyDestination.corePosition()) <= attackRange) {
                this.attackEnemy(this.enemyDestination);
                this.velocity().SetZero();
            }
        }        
    }

/*
    //if base found and within attack range then stop.
    else if(this.baseDestination != null) {
        var targetSize = this.baseDestination.size;
        var attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1) + 0.2;

        //Apply the force
        if(this.corePosition().DistanceTo(this.baseDestination.corePosition()) > attackRange)  {
            //this.body.ApplyImpulse(this.forceToApply.Multiply(dt), this.corePosition());
            this.applyMove(dt);     
        } else {
            this.attackEnemy(this.baseDestination);
            this.velocity().SetZero();
        }
    } 
*/

};
cr.Agent.prototype.applyMove = function(dt) {
    this.actType = "move";
    this.body.ApplyImpulse(this.forceToApply.Multiply(dt), this.body.GetWorldCenter());
};
cr.Agent.prototype.move = function(dt) {
    if(this.freezeCounter > 0) {
        //this.freezeCounter--;
        return;
    }

    var enemy;
    //bullet is also one kind of agent, its charType is 3
    if (this.userData.charType == 1) {
        enemy = this.findEnemy();
    }

    //Work out our behaviours
    if(this.enemyDestination != null) {
        if(this.enemyDestination.objectType != "base") {
            ff = this.b2dSteerImp.steeringBehaviourSeek(this, this.enemyDestination.corePosition());
        }
        else {
            //ff = this.b2dSteerImp.steeringBehaviourFlowField(this);
            if(this.soldierType == "ground") {
                ff = this.b2dSteerImp.steeringBehaviourFlowField(this);
            } 
            else if(this.soldierType == "sky") {
                ff = this.b2dSteerImp.steeringBehaviourSeek(this, this.enemyDestination.corePosition());
            }
        }
    }

    //else if(this.soldierType == "ground") {
    //    ff = this.b2dSteerImp.steeringBehaviourFlowField(this);
    //} 
    //else if(this.soldierType == "sky") {
    //    ff = this.b2dSteerImp.steeringBehaviourSeek(this, this.baseDestination.corePosition());
    //} 

    var sep = this.b2dSteerImp.steeringBehaviourSeparation(this);
    var alg = this.b2dSteerImp.steeringBehaviourAlignment(this);
    var coh = this.b2dSteerImp.steeringBehaviourCohesion(this);

    this.forceToApply = ff.Add(sep.Multiply(1)).Add(alg.Multiply(1)).Add(coh.Multiply(0.1));
    //this.forceToApply = ff.Add(sep.Multiply(1)).Add(alg.Multiply(1));
    //this.forceToApply = ff;

    var lengthSquared = this.forceToApply.LengthSquared();
    if (lengthSquared > this.maxForceSquared) {
        this.forceToApply.Multiply(this.maxForce / Math.sqrt(lengthSquared));
    }

    //this.body.SetActive(true);

    //if enemy found and within attack range then stop.
    if(this.enemyDestination != null) {
        var targetSize = this.enemyDestination.size;
        //var attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1);
        var attackRange = this.attackRangeVal + (targetSize + this.size)*0.5 + 0.2;

        //Apply the force
        if(this.corePosition().DistanceTo(this.enemyDestination.corePosition()) > attackRange)  {
            //Calculate our new movement angle TODO: Should probably be done after running step
            this.rotation = this.velocity().Angle();

            this.actType = "move";
            this.applyMove(dt);
        } else {
            //if agent get to attack zone then stop.
            if(this.userData.charType == 1) {
                this.velocity().SetZero();
            }
            //this.body.SetActive(false);
        }
    } else {
        //this.body.ApplyImpulse(this.forceToApply.Multiply(dt), this.corePosition());   
        this.applyMove(dt);     
    }

    this.afterMove(dt);
};
cr.Agent.prototype.destroy = function() {
    this.world.DestroyBody(this.body);
};
cr.Agent.prototype.velocity = function () {
    return this.body.GetLinearVelocity();
};
cr.Agent.prototype.setVelocity = function (val) {
    this.body.SetLinearVelocity(val);
};

//todo
cr.Agent.prototype.hasFence = function (agent) {
    var sq1 = [1*const_gridPx,18*const_gridPx,4*const_gridPx,16*const_gridPx];
    var sq2 = [6*const_gridPx,18*const_gridPx,14*const_gridPx,16*const_gridPx];
    var sq3 = [16*const_gridPx,18*const_gridPx,19*const_gridPx,16*const_gridPx];

    l1 = [this.corePosition().x*const_gridPx, this.corePosition().y*const_gridPx];  
    l2 = [agent.corePosition().x*const_gridPx, agent.corePosition().y*const_gridPx];  

    return this.intersect.check(l1,l2,sq1) + this.intersect.check(l1,l2,sq2) + this.intersect.check(l1,l2,sq3);
};

cr.Agent.prototype.enemyFilter = function () {
    var mergeArr = [];
    var all = [];
    var agent;

    all = this.agents.concat(this.forts);  
    all = all.concat(this.bases);

    if(this.attackType == "base") {
        mergeArr = this.forts.concat(this.bases);
    } 
    else if(this.attackType == "all") {
        mergeArr = all;
    }
    //not to attack sky agents.
    else if(this.attackType == "ground") {
        for (agent of all) {
            if(agent.soldierType != "sky") {
                mergeArr.push(agent);
            }
        }
    }

    return mergeArr;
};

cr.Agent.prototype.findEnemy = function () {
    var agent;
    var isHero;
    var thisScoutRange = this.getScoutRange(); 
    var choosen = null;
    var distance;
    var dMax = 99;
    var mergeArr = [];

    //if already has enemy target.
    //if it is fly agent
    if(this.enemyDestination && this.enemyDestination.objectType == "agent" && this.enemyDestination.getLife()>0) {
        return this.enemyDestination;
    }

/*
    //eg, giant only attack bases and forts, not agents.
    if(this.attackType == "base") {
        mergeArr = this.forts.concat(this.bases);
    } else {
        mergeArr = this.agents.concat(this.forts);  
        mergeArr = mergeArr.concat(this.bases);
    }
*/

    mergeArr = this.enemyFilter();

    //find enmey which is the nearest to agent
    for (agent of mergeArr) {
        isHero = agent.isHero;
        //userData.charType 1:agent, 2:base or fort. hereby not to target bullet or log object
        if (
            agent.isHero != this.isHero && 
            agent.getLife()>0 && 
            (agent.userData.charType == 1 || agent.userData.charType == 2)
        ) {
            distance = this.corePosition().DistanceTo(agent.corePosition());
            if(distance < thisScoutRange) {
                /*
                    // bug: lieren cant shoot over fence
                    if(distance<dMax && this.hasFence(agent)===0) {
                        choosen = agent;
                        dMax = distance;
                    }
                */

                if(distance<dMax) {
                    // some agents like archer should shoot over fences.
                    if(this.isRemoteAttacker()) {
                        choosen = agent;
                        dMax = distance;
                    } else if(this.hasFence(agent)===0) {
                        choosen = agent;
                        dMax = distance;
                    }
                }
            }
        }
    }

    //if enemy found, then set it as target.
    if(choosen) {
        this.setDestination(choosen);
        return;
    }





    // if not enemy found, agents should try to find the target base.
    return this.setNextBaseDestination();
};

cr.Agent.prototype.isRemoteAttacker = function() {
    if(this.getRole() == "lr") {
        return true;
    }
    else if(this.getRole() == "wiz") {
        return true;
    }
    return false;
};

cr.Agent.prototype.getBaseById = function(bid) {
    for(base of this.bases) {
        if(base.objectId == bid) {
            return base;
        }
    }
    return null;
};

cr.Agent.prototype.setNextBaseDestination = function() {
    var nextDestination;
    var myX = this.corePosition().x;
    var thisBase;

    if(this.isHero) {
        if(myX <= 9.5) {
            nextDestination = this.getBaseById(2);
            if(!nextDestination) {
                nextDestination = this.getBaseById(1);
            }
        }
        else if(myX > 9.5) {
            nextDestination = this.getBaseById(3);
            if(!nextDestination) {
                nextDestination = this.getBaseById(1);
            }
        }        
    } else {
        if(myX <= 9.5) {
            nextDestination = this.getBaseById(5);
            if(!nextDestination) {
                nextDestination = this.getBaseById(4);
            }
        }
        else if(myX >9.5) {
            nextDestination = this.getBaseById(6);
            if(!nextDestination) {
                nextDestination = this.getBaseById(4);
            }
        }           
    }

    if(nextDestination) {
        this.setDestination(nextDestination);
        return nextDestination;
    }
};

cr.Agent.prototype.setNextBaseDestination1 = function(bases) {
    var nextDestination;

/*
    if(this.baseDestination.getLife() <= 0) {
        if(this.baseDestination.objectId == 3) {
            nextDestination = this.getBaseById(1);
        }
        else if(this.baseDestination.objectId == 2) {
            nextDestination = this.getBaseById(1);
        }
        else if(this.baseDestination.objectId == 5) {
            nextDestination = this.getBaseById(4);
        }
        else if(this.baseDestination.objectId == 6) {
            nextDestination = this.getBaseById(4);
        }

    }
*/
    var myPos = this.corePosition();
    var maxDistance = 999;
    var baseId = -1;
    var distance;
    var base;
    if(this.isHero) {
        for(var i=1;i<=3;i++) {
            //if base not destroyed.
            if(this.getBaseById(i)) {
                //find the nearest base to this agent.
                distance = myPos.DistanceTo(this.getBaseById(i).corePosition());
                if(distance<maxDistance) {
                    baseId = i;
                    maxDistance = distance;
                }
            }
        }
    } else {
        for(var i=4;i<=6;i++) {
            if(this.getBaseById(i)) {
                distance = myPos.DistanceTo(this.getBaseById(i).corePosition());
                if(distance<maxDistance) {
                    baseId = i;
                    maxDistance = distance;
                }                   
            }
         
        }
    }
    
    nextDestination = this.getBaseById(baseId);

    if(nextDestination) {
        this.setDestination(nextDestination);
        //this.setBaseDestination(nextDestination);
    } 
};
cr.Agent.prototype.setPosition = function (val) {
    this.body.SetPosition(val);
};

//////////////////////////////////////
cr.RollLog = function(world, isHero, level) {
    cr.worldObject.call(this);
    this.world = world;

    this.isHero = isHero;
    this.objectType = "log";
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "ground";  //ground, sky, all  which target this soldier would attack, walk,fly or both.
    this.level = level;

    this.maxForce = 7500; //rate of acceleration
    this.maxSpeed = 2; //grid squares / second

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 50.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 1.0;

    this.body = null;
    this.userData = {"role":"log", "charType":12, "lifeVal":100, "isHero":isHero};

    this.width = 6;
    this.height = 1;
};
cr.RollLog.prototype = new cr.worldObject();

cr.RollLog.prototype.genAgentBody = function (pos) {
    //Create a physics body for the agent
    var basePos = new B2Vec2(pos.x+this.width/2-0.5, pos.y+this.height/2-0.5);

    var fixDef = new B2FixtureDef();
    var bodyDef = new B2BodyDef();
    var pushForce = this.isHero ? (-1*this.maxForce) : this.maxForce;
    var forceToApply = -1;

    //create base building
    fixDef.density = this.density;
    fixDef.friction = this.friction;
    fixDef.restitution = this.restitution;
    bodyDef.linearDamping = this.linearDamping;

    fixDef.shape = new B2PolygonShape();

    if(!this.isHero) {
        //kill down hero
        fixDef.filter.groupIndex = 12;
        fixDef.filter.categoryBits = 0x0001;
        fixDef.filter.maskBits = 0x0013;
    } else {
        //kill up enemy
        //fixDef.filter.groupIndex = 11;
        //fixDef.filter.categoryBits = 0x0001;
        //fixDef.filter.maskBits = 0x0004;

        fixDef.filter.groupIndex = 15;
        fixDef.filter.categoryBits = 0x0010;
        fixDef.filter.maskBits = 0x0002;
    }

    bodyDef.type = B2Body.b2_dynamicBody;
    fixDef.shape.SetAsBox(this.width*0.5, this.height*0.5);
    //bodyDef.position.SetV(basePos);

    this.body = this.world.CreateBody(bodyDef);
    forceToApply = new B2Vec2(0, pushForce);
    this.body.CreateFixture(fixDef);
    this.body.SetPosition(basePos);
    this.body.ApplyImpulse(forceToApply.Multiply(1), this.body.GetWorldCenter());
    this.body.SetUserData(this.userData);
};

cr.RollLog.prototype.destroy = function() {
    this.world.DestroyBody(this.body);
};

cr.RollLog.prototype.findEnemy = function () {
};




////////////knight agent//////////////////////////
cr.Agent1 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.objectType = "agent";
    this.bodySize = 2;
    this.userData = {"role":"knight", "charType":1, "lifeVal":2000, "isHero":isHero};
    this.rotation = 0;
    this.level = level;

    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "ground";  //ground, sky, all  which target this soldier would attack, walk,fly or both.
    
    this.killRange = 0;

    this.attackRangeVal = 0;
    this.attackForceVal = 100;
    this.scoutRangeVal = 6.0;

    this.maxForce = 200; //rate of acceleration
    this.maxSpeed = 4; //grid squares / second
    this.radius = 1.2;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    //this.maxCohesion = 2.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 30.0;
    this.friction = 0.0;
    this.restitution = 0.1;
    this.linearDamping = 2.1;

    this.rushDura = 0;

};
cr.Agent1.prototype = new cr.Agent();
cr.Agent1.prototype.afterMove = function(dt) {
    this.rushDura++;
};
cr.Agent1.prototype.afterAttack = function(dt) {
};
cr.Agent1.prototype.setRushAttackVals = function(val) {
    var forceAmplifier = 1;
    this.attackForceVal += val*forceAmplifier;
};
cr.Agent1.prototype.recoverAttackVals = function() {
    this.attackForceVal = 100;
};
cr.Agent1.prototype.preAttack = function(dt) {
    var rushForce = this.rushDura - this.maxAttackActDura; //50 is the attackActDura of agent.

    //if rush for a period of time , then attack at once
    if(rushForce > this.maxAttackActDura) {
        console.log(rushForce);  
        this.setRushAttackVals(rushForce);
        this.attackActDura = this.maxAttackActDura+1; //50 is the attackActDura of agent.        
    }
    this.rushDura = 0;
};
cr.Agent1.prototype.afterAttack = function(dt) {
    this.recoverAttackVals();
};



////////////super jump hammer knight agent//////////////////////////
cr.Agent4 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.objectName = "hammer";

    this.objectType = "agent";
    this.bodySize = 2;
    this.userData = {"role":"hammer", "charType":1, "lifeVal":2000, "isHero":isHero};
    this.rotation = 0;
    this.level = level;

    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "ground";  //ground, sky, all  which target this soldier would attack, walk,fly or both.
    
    this.jumpkillRange = 1;
    this.killRange = 0.8;

    this.attackRangeVal = 0;
    this.attackForceVal = 100;
    this.scoutRangeVal = 6.0;

    this.maxForce = 1500; //rate of acceleration set it to 1500 because when collide with giant and stopped,  it may cost a while to move again.
    this.maxSpeed = 2; //grid squares / second
    this.radius = 1.2;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    this.maxCohesion = 2.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 40.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 2.1;

    this.jumpDelay = -1;
};
cr.Agent4.prototype = new cr.Agent();

cr.Agent4.prototype.setJumpAttackVals = function() {
    this.killRange = 1.5;
    this.attackForceVal = 300;
};
cr.Agent4.prototype.recoverAttackVals = function() {
    this.killRange = 0.8;
    this.attackForceVal = 100;
};
cr.Agent4.prototype.afterMove = function(dt) {
    var enemyPos,np,attackRange;
    if(this.enemyDestination != null ) {
        enemyPos = this.enemyDestination.corePosition();
        targetSize = this.enemyDestination.size;
        attackRange = this.attackRangeVal + targetSize - 0.5*(targetSize-1) + 0.2;

        //agent only jump within minJumpRange, otherwise it will jump to any target beyond attackRange.
        var param_minJumpRange = 5;
        var param_jumpDelayTime = 30;
        var mk;

        //jump to enemy only when this enemy is out of the attack range.
        if(this.corePosition().DistanceTo(enemyPos) >= attackRange && this.corePosition().DistanceTo(enemyPos) < param_minJumpRange)  {
            this.velocity().SetZero();
            //this.body.SetActive(false);

            if(this.jumpDelay == -1) {
                console.log("sent jump start act to client.");
            }

            if(this.jumpDelay >= param_jumpDelayTime) {
                //set to jump attack
                this.setJumpAttackVals();
                mk = this.isHero?1:-1;
                np = new B2Vec2(enemyPos.x, enemyPos.y+2.2*mk);
                this.setPosition(np);
                this.attackActDura = this.maxAttackActDura+1;
                this.attack(dt);
                this.jumpDelay = 0; 
                //set to normal attack
                this.recoverAttackVals()            
            } else {
                this.jumpDelay++;
            }
        } else {
            this.jumpDelay = -1;             
        }
    } else {
        console.log("----wrong----");
    }
};

////////////giant agent//////////////////////////
cr.Agent2 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;

    this.isHero = isHero;
    this.objectType = "agent";
    this.bodySize = 2;
    this.level = level;
    this.userData = {"role":"gi", "charType":1, "lifeVal":3000, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "base";  //ground, sky, all, or base only which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackForceVal = 150;
    //this.maxSpeed = 1.0; //grid squares / second

    this.attackRangeVal = 0.5;  //half of the size
    this.scoutRangeVal = 6.0;

    this.maxForce = 1000; //rate of acceleration
    this.radius = 1.3;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    this.maxCohesion = 2.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 100.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 1.0;
};
cr.Agent2.prototype = new cr.Agent();

////////////goat jumper agent//////////////////////////
//todo afterMove 18
cr.Agent5 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.objectType = "agent";
    this.bodySize = 2;
    this.level = level;
    this.userData = {"role":"goat", "charType":1, "lifeVal":1000, "isHero":isHero};
    this.rotation = 0;

    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "base";  //ground, sky, all, or base only which target this soldier would attack, walk,fly or both.

    this.killRange = 0;

    this.attackRangeVal = 0;
    this.attackForceVal = 200;
    this.scoutRangeVal = 6.0;

    this.maxForce = 200; //rate of acceleration
    this.maxSpeed = 5; //grid squares / second
    this.radius = 1.2;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    this.maxCohesion = 2.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 30.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;

    this.jumpDelay = -1;
};
cr.Agent5.prototype = new cr.Agent();
cr.Agent5.prototype.afterMove = function(dt) {
    if(this.enemyDestination && this.enemyDestination.objectType=="agent") return;
    
    var param_jumpDelayTime = 15;
    var np;


    // 16,17 is the river position in the middle 
    if(!this.isHero && this.corePosition().y > 14.6 && this.corePosition().y <= 15) {

        //4,5 and 14,15 is the bridge postion on the river.
        if(this.corePosition().x >=4 && this.corePosition().x <= 5) {
            return;
        }
        if(this.corePosition().x >=14 && this.corePosition().x <= 15) {
            return;
        }

        this.velocity().SetZero();
        //this.body.SetActive(false);

        if(this.jumpDelay == -1) {
            console.log("sent jump start act to client.");
        }
        if(this.jumpDelay >= param_jumpDelayTime) {
            np = new B2Vec2(this.corePosition().x, this.corePosition().y + 3);
            this.setPosition(np);
            this.jumpDelay = 0; 
        } else {
            this.jumpDelay++;
        }
    } 
    else if(this.isHero && this.corePosition().y < 18.4 && this.corePosition().y > 18) {
        if(this.corePosition().x >=4 && this.corePosition().x <= 5) {
            return;
        }
        if(this.corePosition().x >=14 && this.corePosition().x <= 15) {
            return;
        }

        this.velocity().SetZero();
        //this.body.SetActive(false);

        if(this.jumpDelay == -1) {
            console.log("sent jump start act to client.");
        }
        if(this.jumpDelay >= param_jumpDelayTime) {
            np = new B2Vec2(this.corePosition().x, this.corePosition().y - 3);
            this.setPosition(np);
            this.jumpDelay = 0; 
        } else {
            this.jumpDelay++;
        }
    } 
    else {
        this.jumpDelay = -1;             
    }
};

////////////hero agent//////////////////////////
cr.Agent7 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "agent";
    this.bodySize = 2;
    this.userData = {"role":"hr", "charType":1, "lifeVal":800, "isHero":isHero};
    
    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;
    
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "ground";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackForceVal = 150;
    //this.maxSpeed = 3; //grid squares / second

    this.attackRangeVal = 0;
    this.scoutRangeVal = 6.0;

/*
    this.maxForce = 200; //rate of acceleration
    this.radius = 1.2;
*/

    this.maxForce = 4000; //rate of acceleration
    this.radius = 1.3;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    this.maxCohesion = 2.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

/*
    this.density = 70.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;
*/

    this.density = 100.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 1.0;
};
cr.Agent7.prototype = new cr.Agent();

cr.Agent7.prototype.preAttack = function() {
    var mergeArr = this.agents.concat(this.forts);
    var mergeArr = mergeArr.concat(this.bases);
 
    //find enmey which is the nearest to agent
    for (agent of mergeArr) {
        isHero = agent.isHero;
        distance = this.corePosition().DistanceTo(agent.corePosition());

        if(agent.soldierType == "ground") {
            if (
                agent.isHero != this.isHero && 
                agent.getLife()>0 &&
                agent.userData.role == "base" &&
                (agent.objectId == 1 || agent.objectId == 4) &&
                distance < 2.8
            ) {
                this.groupKill.push(agent);
            }

            else if (
                agent.isHero != this.isHero && 
                agent.getLife()>0 &&
                agent.userData.role == "base" &&
                (agent.objectId == 2 || agent.objectId == 3 || agent.objectId == 5 || agent.objectId == 6) &&
                distance < 2.4
            ) {
                this.groupKill.push(agent);
            }

            else if (
                agent.isHero != this.isHero && 
                agent.getLife()>0 &&
                agent.userData.role == "fa" &&
                distance < 1.8
            ) {
                this.groupKill.push(agent);
            }

            else if (
                agent.isHero != this.isHero && 
                agent.getLife()>0 && 
                agent.userData.charType == 1 &&
                distance < 1.5
            ) {
                this.groupKill.push(agent);
            }
        }
    }
};

////////////lightman agent//////////////////////////
cr.Agent8 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "agent";
    this.bodySize = 2;
    this.userData = {"role":"lm", "charType":1, "lifeVal":800, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;
    
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 1.5;
    //this.attackForceVal = 150;
    //this.maxSpeed = 3; //grid squares / second

    this.attackRangeVal = 0;
    this.scoutRangeVal = 6.0;

    this.maxForce = 2000; //rate of acceleration
    this.radius = 1.2;

    this.minSeparation = 0.8; // We'll move away from anyone nearer than this
    this.maxCohesion = 2.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 100.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 1.0;

/*
    this.density = 70.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;
*/
};
cr.Agent8.prototype = new cr.Agent();

////////////skeleton agent//////////////////////////
cr.Agent3 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "agent";
    this.bodySize = 1;
    this.userData = {"role":"ske", "charType":1, "lifeVal":100, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "ground";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackForceVal = 50;
    //this.maxSpeed = 2; //grid squares / second

    this.attackRangeVal = 0;
    this.scoutRangeVal = 6.0;

    this.maxForce = 30; //rate of acceleration
    this.radius = 0.4;

    this.minSeparation = 1.0; // We'll move away from anyone nearer than this
    this.maxCohesion = 3.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 40.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;
};
cr.Agent3.prototype = new cr.Agent();


////////////ironman agent//////////////////////////
cr.Agent11 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "agent";
    this.bodySize = 1;
    this.userData = {"role":"ir", "charType":1, "lifeVal":500, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "ground";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackForceVal = 50;
    //this.maxSpeed = 2; //grid squares / second

    this.attackRangeVal = 0;
    this.scoutRangeVal = 6.0;

    this.maxForce = 1000; //rate of acceleration
    this.radius = 1.0;

    this.minSeparation = 1.0; // We'll move away from anyone nearer than this
    this.maxCohesion = 3.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 100.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 1.0;
};
cr.Agent11.prototype = new cr.Agent();


////////////flying bee agent//////////////////////////
cr.Agent9 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.level = level;
    this.userData = {"role":"bee", "charType":1, "lifeVal":10, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.isHero = isHero;

    this.objectType = "agent";
    this.bodySize = 1;
    this.rotation = 0;
    
    this.soldierType = "sky";   //ground, sky, this soidier is walking or fly
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackForceVal = 50;
    //this.maxSpeed = 2; //grid squares / second

    this.attackRangeVal = 0;
    this.scoutRangeVal = 6.0;

    this.maxForce = 30; //rate of acceleration
    this.radius = 0.4;

    this.minSeparation = 1.0; // We'll move away from anyone nearer than this
    this.maxCohesion = 3.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 40.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;
};
cr.Agent9.prototype = new cr.Agent();

////////////lieren agent//////////////////////////
cr.Agent6 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "agent";
    this.bodySize = 1;
    this.userData = {"role":"lr", "charType":1, "lifeVal":100, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;
    
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackForceVal = 50;
    //this.maxSpeed = 2; //grid squares / second

    //todo 15.0
    this.attackRangeVal = 15.0;
    this.scoutRangeVal = 15.0;

    this.maxForce = 30; //rate of acceleration
    this.radius = 0.4;

    this.minSeparation = 1.0; // We'll move away from anyone nearer than this
    this.maxCohesion = 3.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 40.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;
};
cr.Agent6.prototype = new cr.Agent();

////////////wiz agent//////////////////////////
cr.Agent10 = function(world, isHero, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "agent";
    this.bodySize = 1;
    this.userData = {"role":"wiz", "charType":1, "lifeVal":500, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.rotation = 0;    
    this.soldierType = "ground";   //ground, sky, this soidier is walking or fly
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 3;
    //this.attackForceVal = 50;
    //this.maxSpeed = 2; //grid squares / second

    this.attackRangeVal = 7.0;
    this.scoutRangeVal = 7.0;

    this.maxForce = 200; //rate of acceleration
    this.radius = 0.4;

    this.minSeparation = 1.0; // We'll move away from anyone nearer than this
    this.maxCohesion = 3.0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 40.0;
    this.friction = 0.0;
    this.restitution = 0.2;
    this.linearDamping = 1.0;
};
cr.Agent10.prototype = new cr.Agent();

////////////bullet agent//////////////////////////
cr.Bullet = function(world, isHero, bulletRole) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;

    this.objectType = "bullet";
    this.bodySize = 0.5;
    this.userData = {"role":bulletRole, "charType":3, "lifeVal":1, "isHero":isHero};
    this.rotation = 0;
    
    this.soldierType = "sky";   //ground, sky, this soidier is walking or fly
    this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    this.killRange = 0;

    this.attackRangeVal = 1.0;
    this.attackForceVal = 50;
    this.scoutRangeVal = 1.0;

    this.maxForce = 300; //rate of acceleration
    this.maxSpeed = 10; //grid squares / second
    this.radius = 0.1;

    this.minSeparation = 0; // We'll move away from anyone nearer than this
    this.maxCohesion = 0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 0.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 0.0;

    this.upDown = "no"; //up, down, no
};

cr.Bullet.prototype = new cr.Agent();

cr.Bullet.prototype.move = function(dt) {
    if(this.freezeCounter > 0) {
        this.freezeCounter--;
        return;
    }

    var ff = this.b2dSteerImp.steeringBehaviourSeek(this, this.enemyDestination.corePosition());
    this.forceToApply = ff;

    if(this.enemyDestination != null) {
        //Apply the force
        if(this.corePosition().DistanceTo(this.enemyDestination.corePosition()) > 1) {
            //this.actType = "move";
            this.applyMove(dt);
        } else {
            this.setLife(0);
            this.bulletAttack();
        }
    }

    //Calculate our new movement angle TODO: Should probably be done after running step
    this.rotation = this.velocity().Angle();
};

cr.Bullet.prototype.setUpDown = function(updown) {
    this.upDown = updown;
};

cr.Bullet.prototype.bulletAttack = function(dt) {
    this.bulletAttackEnemy(this.enemyDestination);
};

cr.Bullet.prototype.bulletAttackEnemy = function (target) {
    target.damage(this.attackForceVal);
    if(target.getLife() <= 0) {
        target.setLife(0);
    }

    if(this.killRange>0) {
        // kill all enemies around the target within attack range
        var allObjects = this.agents.concat(this.forts).concat(this.bases);
        for(agent of allObjects) {
            //if it is enemy.
            if(agent.isHero !== this.isHero) {
                //if enemy within kill range. that mean one attack may result to multi kills.
                //if(agent.corePosition().DistanceTo(target.corePosition()) <= this.killRange + (target.size*0.5+0.5))  {
                if(agent.corePosition().DistanceTo(target.corePosition()) <= this.killRange + (target.size-1)*0.5)  {
                    agent.damage(this.attackForceVal);
                    if(agent.getLife() < 0) {
                        agent.setLife(0);
                    }
                }
            }
        }        
    }

    this.afterAttack();
};

////////////fireBomb agent//////////////////////////
cr.FireBomb = function(world, isHero, vPos, level) {
    cr.Agent.call(this);
    this.world = world;
    this.isHero = isHero;
    this.level = level;

    this.objectType = "bullet";
    this.bodySize = 0.5;
    this.userData = {"role":"bomb", "charType":3, "lifeVal":1, "isHero":isHero};

    this.setParamsByLevel(this.userData.role, level);

    this.maxSpeed = 6; //grid squares / second
    this.maxForce = 300; //rate of acceleration
    
    //this.rotation = 0;
    //this.soldierType = "sky";   //ground, sky, this soidier is walking or fly
    //this.attackType = "all";  //ground, sky, all  which target this soldier would attack, walk,fly or both.

    //this.killRange = 0;
    //this.attackRangeVal = 1.0;
    //this.attackForceVal = 50;
    //this.scoutRangeVal = 1.0;
    //this.radius = 0.1;

    //this.minSeparation = 0; // We'll move away from anyone nearer than this
    //this.maxCohesion = 0; //We'll move closer to anyone within this bound

    this.maxForceSquared = this.maxForce * this.maxForce;
    this.maxSpeedSquared = this.maxSpeed * this.maxSpeed;

    this.density = 0.0;
    this.friction = 0.0;
    this.restitution = 0.0;
    this.linearDamping = 0.0;

    this.dest = vPos;
};

cr.FireBomb.prototype = new cr.Agent();

cr.FireBomb.prototype.move = function(dt) {
    if(this.freezeCounter > 0) {
        this.freezeCounter--;
        return;
    }

    var ff = this.b2dSteerImp.steeringBehaviourSeek(this, this.dest);
    this.forceToApply = ff;

    //Apply the force
    if(this.corePosition().DistanceTo(this.dest) > 1) {
        //this.actType = "move";
        this.applyMove(dt);
    } else {
        this.setLife(0);
        this.bombAttack(dt);
    }

    //Calculate our new movement angle TODO: Should probably be done after running step
    this.rotation = this.velocity().Angle();
};

cr.FireBomb.prototype.bombAttack = function(dt) {
    console.log("start to bomb...")
    this.exploreBasesAct();
    this.exploreAgentsAct();
};

cr.FireBomb.prototype.exploreBasesAct = function() {
    var mergeArr = [];
    var agent;
    var param_exporeRange = this.exploreRange;
    var param_exporeBaseKill = this.baseExploreVal;

    mergeArr = this.agents.concat(this.forts);
    mergeArr = mergeArr.concat(this.bases);

    for (agent of mergeArr) {
        isHero = agent.isHero;
        if(agent.isHero !== this.isHero && agent.getLife()>0 && agent.userData.charType == 2) {
            distance = this.corePosition().DistanceTo(agent.corePosition());
            if(distance < param_exporeRange) {
                agent.damage(param_exporeBaseKill);
            }
        }
    }
};

cr.FireBomb.prototype.exploreAgentsAct = function() {
    var position = this.corePosition();
    var param_exporeRange = this.exploreRange;
    var param_exporeKill = this.agentExploreVal;
 
    for (var i = 0; i <= 100; i++) {
        var angle = 360 / 100 * i;
 
        var input = new b2RayCastInput();
        input.p1 = position;
        input.p2.Set(position.x + param_exporeRange * Math.cos(angle), position.y + param_exporeRange * Math.sin(angle));
        input.maxFraction = 1;
  
        for (var currentBody = this.world.GetBodyList(); currentBody; currentBody = currentBody.GetNext()) {
            var output = new b2RayCastOutput();
            var fix = currentBody.GetFixtureList();
            if (!fix) {
                continue;
            }

            //only to kill enemy and none log agent.
            var ud = fix.GetBody().GetUserData();
            if(!ud) continue;

            //no effect to hero agent
            if(ud.isHero === this.isHero) {
                continue;
            }

            var isHit = fix.RayCast(output, input);
            if(isHit) {
                var p1 = input.p1.Copy();
                var p2 = input.p2.Copy();
                p2.Subtract(p1);
                p2.Multiply(output.fraction);
                
                p1.Add(p2);
                var hitPoint = p1.Copy();
                hitPoint.Subtract(position);
                currentBody.ApplyForce(new B2Vec2(hitPoint.x * (1 - output.fraction) * 300, hitPoint.y * (1 - output.fraction) * 300), hitPoint);
                ud.lifeVal -= param_exporeKill;
            }
        }
    }
};


////////////buff//////////////////////////
cr.Buff = function(isHero, vPos, level) {
    cr.Agent.call(this);
    this.isHero = isHero;
    this.level = level;

    this.objectType = "buff";
    this.dest = vPos;
};

cr.Buff.prototype = new cr.Agent();

cr.Buff.prototype.thunderAct = function() {
    var mergeArr = [];
    var agent;
    var param_exporeRange = 3;
    var param_exporeBaseKill = 600;

    mergeArr = this.agents.concat(this.forts);
    mergeArr = mergeArr.concat(this.bases);

    for (agent of mergeArr) {
        isHero = agent.isHero;

        if(agent.isHero !== this.isHero && agent.getLife()>0) {
            distance = this.dest.DistanceTo(agent.corePosition());
            if(distance < param_exporeRange) {
                agent.damage(param_exporeBaseKill);
            }
        }
    }
};

cr.Buff.prototype.healAct = function() {
    var mergeArr = [];
    var agent;
    var param_exporeRange = 3;
    var param_exporeBaseKill = 600;

    mergeArr = this.agents.concat(this.forts);
    mergeArr = mergeArr.concat(this.bases);

    for (agent of mergeArr) {
        isHero = agent.isHero;

        if(agent.isHero == this.isHero && agent.getLife()>0) {
            distance = this.dest.DistanceTo(agent.corePosition());
            if(distance < param_exporeRange) {
                agent.userData.lifeVal = agent.originLife;
            }
        }
    }
};

//-----client end--------------------

module.exports = {
    Agent1:cr.Agent1,
    Agent2:cr.Agent2,
    Agent3:cr.Agent3,
    Agent4:cr.Agent4,
    Agent5:cr.Agent5,
    Agent6:cr.Agent6,
    Agent7:cr.Agent7,
    Agent8:cr.Agent8,
    Agent9:cr.Agent9,
    Agent10:cr.Agent10,
    Agent11:cr.Agent11,
    Bullet:cr.Bullet,
    FireBomb:cr.FireBomb,
    Buff:cr.Buff,
    RollLog:cr.RollLog,
    Fence:cr.Fence,
    Base:cr.Base,
    Fort:cr.Fort,
};
