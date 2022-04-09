var cr = cr || {};

cr.gameSetting = function () {
    this.agentSetting = [];
    this.agentSetting["ske"] = {};
    this.agentSetting["hr"] = {};
    this.agentSetting["bee"] = {};
    this.agentSetting["ir"] = {};

    this.setAgentSettings();
};

cr.gameSetting.prototype.setAgentSettings = function() {
    this.agentSetting["log"] = {
        "killVal":80,
        "magic":1,
    };
    this.agentSetting["bomb"] = {
        "exploreRange":3,
        "baseExploreVal":200,
        "agentExploreVal":100,
        "magic":4,
    };
    this.agentSetting["ske"] = {
        "maxSpeed":3,
        "attackForceVal":100,
        "killRange":0,
        "lifeVal":160,
        "maxAttackActDura":23,
    };
    this.agentSetting["ir"] = {
        "maxSpeed":1,
        "attackForceVal":200,
        "killRange":0,
        "lifeVal":2000,
        "maxAttackActDura":35,
    };
    this.agentSetting["hr"] = {
        "maxSpeed":1.5,
        "attackForceVal":150,
        "killRange":0,
        "lifeVal":1200,
        "maxAttackActDura":35,
    };
    this.agentSetting["bee"] = {
        "maxSpeed":4,
        "attackForceVal":50,
        "killRange":0,
        "lifeVal":50,
        "maxAttackActDura":15,
    };
    this.agentSetting["gi"] = {
        "maxSpeed":1,
        "attackForceVal":200,
        "killRange":0,
        "lifeVal":2500,
        "maxAttackActDura":35,
    };
    this.agentSetting["lm"] = {
        "maxSpeed":2,
        "attackForceVal":250,
        "killRange":3,
        "lifeVal":800,
        "maxAttackActDura":35,
    };
    this.agentSetting["lr"] = {
        "maxSpeed":2,
        "attackForceVal":80,
        "killRange":0,
        "lifeVal":100,
        "maxAttackActDura":35,
    };
    this.agentSetting["wiz"] = {
        "maxSpeed":2,
        "attackForceVal":150,
        "killRange":3,
        "lifeVal":100,
        "maxAttackActDura":35,
    };
};

cr.gameSetting.prototype.setAgentLevel = function(role, level) {
    if(this.agentSetting[role]) {
        this.agentSetting[role].level = level;
    } else {
        console.log("cannot set level for role:" + role);
        return false;
    }
};

cr.gameSetting.prototype.getAgentSetting = function(role) {
    if(this.agentSetting[role]) {
        return this.agentSetting[role];
    } else {
        console.log("no game setting for role:" + role);
        return false;
    }
};

module.exports = cr.gameSetting;