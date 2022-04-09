window.__require = function e(t, n, i) {
function o(s, a) {
if (!n[s]) {
if (!t[s]) {
var l = s.split("/");
l = l[l.length - 1];
if (!t[l]) {
var c = "function" == typeof __require && __require;
if (!a && c) return c(l, !0);
if (r) return r(l, !0);
throw new Error("Cannot find module '" + s + "'");
}
s = l;
}
var f = n[s] = {
exports: {}
};
t[s][0].call(f.exports, function(e) {
return o(t[s][1][e] || e);
}, f, f.exports, e, t, n, i);
}
return n[s].exports;
}
for (var r = "function" == typeof __require && __require, s = 0; s < i.length; s++) o(i[s]);
return o;
}({
AgentObj: [ function(e, t) {
"use strict";
cc._RF.push(t, "de37fFOB2lBv76OrGfwhKh/", "AgentObj");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
setTotalLife: function(e) {
this.totalLife = e;
},
setLife: function(e) {
this.life = e;
this.blood.getComponent("BloodBar").setBloodBar(this.life, this.totalLife);
},
setGroupKill: function(e) {
this.groupKill = e;
},
setBloodLevel: function() {},
setBlood: function(e) {
this.blood = e;
this.blood.active = !0;
}
});
cc._RF.pop();
}, {} ],
AllCard: [ function(e, t) {
"use strict";
cc._RF.push(t, "9b622jQnM9HZLCxDURFLjs8", "AllCard");
cc.Class({
extends: cc.Component,
properties: {
seleRole: "ske",
magicCost: 1,
level: 1,
disp: ""
},
onLoad: function() {},
start: function() {
this.isMoving = !1;
this.seleInnerId = "";
this.setInitImgByRole();
this.setRoleCost();
this.setRoleDisp();
},
setCardStatus: function(e) {
var t = this.node.getChildByName("useButton"), n = this.node.getChildByName("click");
t.getChildByName("disp").getComponent("cc.Label");
if (e) {
t.getComponent(cc.Button).interactable = !1;
n.getComponent(cc.Button).interactable = !1;
} else {
t.getComponent(cc.Button).interactable = !0;
n.getComponent(cc.Button).interactable = !0;
}
},
grey: function(e) {
this.node.getChildByName("useButton");
this.node.opacity = e ? 100 : 255;
},
userButClick: function() {
this.node.parent.getComponent("SelLayout").seleOneCard(this.seleRole);
},
setRole: function(e, t, n) {
this.seleRole = e;
this.magicCost = t;
this.disp = n;
},
getLayoutNode: function() {
return this.node.parent.getChildByName("layout");
},
setRoleCost: function() {
this.node.getChildByName("ringMark").getChildByName("cost").getComponent("cc.Label").string = this.magicCost;
},
setRoleDisp: function() {
this.node.getChildByName("useButton").getChildByName("disp").getComponent("cc.Label").string = this.disp;
},
setSelImg: function(e) {
var t = this.node.getChildByName("icon");
cc.loader.loadRes(e, cc.SpriteFrame, function(e, n) {
t.active = !0;
t.getComponent(cc.Sprite).spriteFrame = n;
});
},
setInitImgByRole: function() {
"ske" == this.seleRole ? this.setSelImg("sel_cards/ske") : "lr" == this.seleRole ? this.setSelImg("sel_cards/lieren") : "gi" == this.seleRole ? this.setSelImg("sel_cards/rockman") : "log" == this.seleRole ? this.setSelImg("sel_cards/log") : "bomb" == this.seleRole ? this.setSelImg("sel_cards/bomb") : "bee" == this.seleRole ? this.setSelImg("sel_cards/bee") : "wiz" == this.seleRole ? this.setSelImg("sel_cards/wiz") : "hr" == this.seleRole ? this.setSelImg("sel_cards/hero") : "lm" == this.seleRole ? this.setSelImg("sel_cards/lightman") : "fa" == this.seleRole ? this.setSelImg("sel_cards/fortA") : "ir" == this.seleRole && this.setSelImg("sel_cards/ironman");
}
});
cc._RF.pop();
}, {} ],
ArcSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "58c5bfG9UVBHrbtlPel5W/y", "ArcSprite");
var n = e("MySprite"), i = e("Common");
cc.Class({
extends: n,
properties: {
role: "lr"
},
start: function() {
this._animation = this.getComponent(cc.Animation);
this._animation.WrapMode = cc.WrapMode.Loop;
null == this.layoutOp && (this.layoutOp = this.node.parent.parent.getComponent("Game"));
},
remove: function() {
this._animation.play("dieoff2");
this.shadow.destroy();
this.blood.destroy();
},
dieStart: function() {
console.log("die start");
},
dieEnd: function() {
console.log("die end");
this._animation.play("footprint");
},
footStart: function() {
console.log("foot start");
},
footEnd: function() {
console.log("foot end");
this.node.destroy();
},
footPrint: function() {
this.node.zIndex = -1;
this.node.scaleX = 1;
this.node.scaleY = 1;
},
beforeKill: function() {},
afterKill: function() {
console.log("--remove archer node--");
this.node.destroy();
},
frame1Evt: function() {
this.dispShadow(1);
},
frame2Evt: function() {
this.dispShadow(2);
},
frame3Evt: function() {
this.dispShadow(3);
},
frame4Evt: function() {
this.dispShadow(4);
},
frame5Evt: function() {
this.dispShadow(5);
},
frame6Evt: function() {
this.dispShadow(6);
},
frame7Evt: function() {
this.dispShadow(7);
},
aFrame1Evt: function() {
this.layoutOp.playSnd("lr");
},
aFrame2Evt: function() {},
aFrame3Evt: function() {},
aFrame4Evt: function() {},
aFrame5Evt: function() {},
playAni: function(e, t, n) {
this.playAngleAnimationRemote(e, t, n);
},
isEnemyBase: function(e) {
return 1 == e || 2 == e || 3 == e;
},
isEnemyFort: function(e, t) {
return !(!e || 2 != t) || !e && 1 == t;
},
playBaseWarriorAnimationDefault: function(e, t) {
var n;
n = this.isEnemyBase(t) ? "lr_s_walk" : "lr_n_walk";
if ("move" != e || this.lastAct != n) {
var i = Math.ceil(125 * Math.random()) / 100;
this._animation.play(n, i);
this.lastAct = n;
}
},
playFortWarriorAnimationDefault: function(e, t, n) {
var i;
i = this.isEnemyFort(t, n) ? "lr_s_walk" : "lr_n_walk";
if ("move" != e || this.lastAct != i) {
var o = Math.ceil(125 * Math.random()) / 100;
this._animation.play(i, o);
this.lastAct = i;
}
},
playBaseWarriorAnimation: function(e, t, n) {
var o, r, s, a, l, c, f, u = i.attackTargetYOffset, h = e.mypos.x, p = e.mypos.y, d = Math.ceil(125 * Math.random()) / 100, y = "", m = 1;
1 == t ? m = 1 : 2 == t && (m = -1);
o = e.enemypos.x;
r = e.enemypos.y;
a = cc.v2(30 * h, 30 * p);
l = cc.v2(30 * o, 30 * r + u * m);
if (0 != (c = a.sub(l)).x || 0 != c.y) {
0 == c.x && (c.x = .1);
0 == c.y && (c.y = .1);
if (0 != c.x && 0 != c.y) {
var g = 180 / Math.PI * Math.atan(c.x / c.y);
s = g;
c.y >= 0 && (s = g + 180);
}
if (this._animation) {
y = (f = this.getActnameByAngle(s, n)).actName;
this.node.scaleX = f.scaleX;
if (this.lastAct != y || "sa" == n) {
if ("sa" == n) {
this._animation.stop();
this._animation.play(y);
} else this._animation.play(y, d);
this.angle = s;
this.lastAct = y;
this.lastScaleX = f.scaleX;
}
}
}
}
});
cc._RF.pop();
}, {
Common: "Common",
MySprite: "MySprite"
} ],
Arrow: [ function(e, t) {
"use strict";
cc._RF.push(t, "fdf0cPTnAZOpoVbhBQTF5fi", "Arrow");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this._animation = this.getComponent(cc.Animation);
this._animation.WrapMode = cc.WrapMode.Default;
},
start: function() {},
onend: function() {}
});
cc._RF.pop();
}, {} ],
BaseSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "22a8a7Kh7NNgJLrjEdbIjIr", "BaseSprite");
cc.Class({
extends: cc.Component,
properties: {
basePosY: 28
},
onLoad: function() {
this.isBase() && (this.node.zIndex = 1e3 + parseInt(32 - this.basePosY - 2));
this._animation = this.getComponent(cc.Animation);
},
isBase: function() {
return !!this.node._name.startWith("base");
},
setZIndex: function(e) {
this.node.zIndex = e;
},
setTotalLife: function(e) {
this.totalLife = e;
},
setLife: function(e) {
this.life = e;
this.blood.getComponent("BloodBar").setBloodBar(this.life, this.totalLife);
},
setBloodLevel: function() {},
setBloodBar: function(e) {
var t = this.blood.getChildByName("bar"), n = this.blood.width;
t.width = e / this.totalLife * n;
},
setBlood: function(e) {
this.blood = e;
this.blood.active = !0;
},
remove: function() {},
frameStartEvt: function() {
console.log("first.");
},
frameEndEvt: function() {
console.log("last.");
}
});
cc._RF.pop();
}, {} ],
BeeSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "b3c5ccJhe1KRrAvyoLJxi+i", "BeeSprite");
var n = e("MySprite");
cc.Class({
extends: n,
properties: {
role: "bee"
},
start: function() {},
shootArrow: function() {},
getAttackDistance: function(e) {
return .6 * (e.size + e.esize);
},
playAni: function(e, t, n) {
this.node.zIndex = 9999;
this.playAngleAnimationNear(e, t, n);
},
remove: function() {
this._animation.play("dieoff2");
this.shadow.destroy();
this.blood.destroy();
},
dieStart: function() {
this.node.scaleX = .8;
this.node.scaleY = .8;
},
dieEnd: function() {
this._animation.play("footprint");
},
footStart: function() {
this.node.zIndex = -1;
},
footEnd: function() {
this.node.destroy();
},
beforeKill: function() {},
afterKill: function() {
this.node.destroy();
},
frame1Evt: function() {},
frame2Evt: function() {},
frame3Evt: function() {},
frame4Evt: function() {},
frame5Evt: function() {},
frame6Evt: function() {},
frame7Evt: function() {}
});
cc._RF.pop();
}, {
MySprite: "MySprite"
} ],
BloodBar: [ function(e, t) {
"use strict";
cc._RF.push(t, "9d601PjDUNLg5RyV8ikyzg8", "BloodBar");
String.prototype.startWith = function(e) {
return new RegExp("^" + e).test(this);
};
cc.Class({
extends: cc.Component,
properties: {
hp: -1,
barWidth: 50,
upToHead: 30,
level: 1,
role: ""
},
onLoad: function() {
this.node.active = !1;
this.setBarWidth();
this.isBase() ? this.setLoc(0, this.node.parent.height / 2 + 20) : this.isFort1() ? this.setLoc(0, this.node.parent.height / 2 + 60) : this.setLoc(0, this.node.parent.height);
},
setBarWidth: function() {
var e = this.node.getChildByName("bar"), t = this.node.getChildByName("level");
this.isBase() ? this.node.width = 80 : this.isFort1() ? this.node.width = 50 : this.node.width = 30;
e.x = this.node.width / 2 * -1;
t.x = e.x - 5;
},
isBase: function() {
return !!this.node.parent._name.startWith("base");
},
isFort1: function() {
return "FortASprite" == this.node.parent.spName;
},
setLoc: function(e, t) {
var n = cc.v2(e, t);
this.node.setPosition(n);
},
setBarLevel: function(e) {
void 0 === e && (e = 1);
this.node.getChildByName("level").getComponent(cc.Label).string = e;
},
setBloodBar: function(e, t) {
e < t && (this.node.active = !0);
var n = this.node.getChildByName("bar"), i = this.node.width;
n.width = e / t * i;
n.color = e < .35 * t ? new cc.Color(250, 0, 0) : new cc.Color(50, 250, 0);
}
});
cc._RF.pop();
}, {} ],
BombScript: [ function(e, t) {
"use strict";
cc._RF.push(t, "ecfc8GKFiNJi73X5NyLqJ8C", "BombScript");
cc.Class({
extends: cc.Component,
properties: {},
init: function() {},
start: function() {},
footPrint: function() {},
playBombEffect: function() {},
beforeKill: function() {},
afterKill: function() {
console.log("--remove bomb node--");
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
Bomb: [ function(e, t) {
"use strict";
cc._RF.push(t, "064984QJhNOW5zJ+swcipxH", "Bomb");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.getComponent(cc.Animation).play("small");
},
start: function() {}
});
cc._RF.pop();
}, {} ],
BuffProcess: [ function(e, t) {
"use strict";
cc._RF.push(t, "02042YX8NVNK4tzeVlz3Yt6", "BuffProcess");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.node.zIndex = 9999;
},
thunder_end: function() {
this.node.destroy();
},
heal_end: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
Common: [ function(e, t) {
"use strict";
cc._RF.push(t, "af885xQixFGPovNcyyj+R7f", "Common");
t.exports = {
attackTargetYOffset: 45
};
cc._RF.pop();
}, {} ],
Dictionary: [ function(e, t) {
"use strict";
cc._RF.push(t, "979d5olSJND5q06NI+w9ly+", "Dictionary");
cc.Class({
_keyMapTb: null,
_valueMapTb: null,
__currId: 0,
ctor: function() {
this._keyMapTb = {};
this._valueMapTb = {};
this.__currId = 2 << (0 | 10 * Math.random());
},
__getKey: function() {
this.__currId++;
return "key_" + this.__currId;
},
setObject: function(e, t) {
if (null != t) {
var n = this.__getKey();
this._keyMapTb[n] = t;
this._valueMapTb[n] = e;
}
},
objectForKey: function(e) {
if (null == e) return null;
var t = this._keyMapTb;
for (var n in t) if (t[n] === e) return this._valueMapTb[n];
return null;
},
valueForKey: function(e) {
return this.objectForKey(e);
},
removeObjectForKey: function(e) {
if (null != e) {
var t = this._keyMapTb;
for (var n in t) if (t[n] === e) {
delete this._valueMapTb[n];
delete t[n];
return;
}
}
},
removeObjectsForKeys: function(e) {
if (null != e) for (var t = 0; t < e.length; t++) this.removeObjectForKey(e[t]);
},
allKeys: function() {
var e = [], t = this._keyMapTb;
for (var n in t) e.push(t[n]);
return e;
},
removeAllObjects: function() {
this._keyMapTb = {};
this._valueMapTb = {};
},
count: function() {
return this.allKeys().length;
}
});
cc._RF.pop();
}, {} ],
EffectSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "6172fstN/ZA5rLXNIqCyFp/", "EffectSprite");
var n;
function i(e, t, n) {
t in e ? Object.defineProperty(e, t, {
value: n,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = n;
return e;
}
cc.Class((i(n = {
extends: cc.Component,
properties: {
role: ""
},
start: function() {
"fd" == this.role ? this.node.zIndex = 9999 : "firecircle" == this.role ? this.node.zIndex = 9999 : "light" == this.role ? this.node.zIndex = 9999 : "doubleMagic" == this.role && (this.node.zIndex = 9999);
},
spinEffectEndEvt: function() {
this.node.destroy();
},
wizfireEffectEndEvt: function() {
this.node.destroy();
},
lightEffectEndEvt: function() {
this.node.destroy();
},
fd_frame5Evt: function() {
this.node.zIndex = 9999;
}
}, "fd_frame5Evt", function() {
this.node.zIndex = -1;
}), i(n, "fd_EffectEndEvt", function() {
this.node.destroy();
}), i(n, "doubleMagic_dispEnd", function() {
this.node.destroy();
}), n));
cc._RF.pop();
}, {} ],
GameData: [ function(e, t) {
"use strict";
cc._RF.push(t, "8204dK680RKmLHLtijslCkm", "GameData");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.game.addPersistRootNode(this.node);
this.name = this.getRandomCharName();
this.nick = this.name;
this.isUpgrade = !1;
this.agentsDef = {
name: "test01",
level: 1,
myscore: 2300,
nextscore: 3500,
basescore: 15,
allList: [ "log", "bomb", "ske", "ir", "hr", "bee", "gi", "lm", "lr", "wiz" ],
myList: [ "log", "hr", "bee", "ske" ],
log: {
level: 1,
cost: 3
},
bomb: {
level: 1,
cost: 4
},
ske: {
level: 1,
cost: 1
},
ir: {
level: 1,
cost: 3
},
hr: {
level: 1,
cost: 4
},
bee: {
level: 1,
cost: 1
},
gi: {
level: 1,
cost: 4
},
lm: {
level: 1,
cost: 3
},
lr: {
level: 1,
cost: 2
},
wiz: {
level: 1,
cost: 5
}
};
},
start: function() {},
getRandomCharName: function() {
for (var e = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], t = "", n = 0; n < 6; n++) t += e[Math.floor(Math.random() * e.length)];
return t;
},
httpPost: function(e, t, n, i) {
var o = "https://www.asobee.mobi/fftower/ffinfo.php?uid=" + e;
n && i && (o += "&fd=" + n + "&file=" + i);
return new Promise(function(e, n) {
var i = cc.loader.getXMLHttpRequest();
i.onreadystatechange = function() {
cc.log("xhr.readyState=" + i.readyState + "  xhr.status=" + i.status);
if (4 === i.readyState && i.status >= 200 && i.status < 300) {
var t = i.responseText;
e(t);
} else 4 === i.readyState && 401 == i.status ? n("err") : 4 === i.readyState && 0 == i.status && n("err");
};
i.open("GET", o, !0);
i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
i.send(t);
});
},
winScore: function(e) {
this.agentsDef.myscore += e;
this.setMyScore(this.agentsDef.myscore);
},
setWxUser: function(e) {
var t = e.avatarUrl.split("/"), n = t[t.length - 2], i = n.substring(0, 6), o = n.substring(n.length - 6);
this.name = i + o;
this.nick = e.nickName;
},
setData: function(e) {
this.agentsDef = e;
},
getName: function() {
return this.name;
},
getNick: function() {
return this.nick;
},
getData: function() {
return this.agentsDef;
},
setMyList: function(e) {
this.agentsDef.myList = e;
this.httpPost(this.name, "", "list", e).then(function(e) {
console.log("------------setMyList------------------");
console.log(e);
}, function(e) {
console.log(e);
});
},
setUpgrade: function() {
this.isUpgrade = !1;
},
setMyScore: function(e) {
var t = this;
this.agentsDef.myscore = e;
this.httpPost(this.name, "", "score", e).then(function(e) {
console.log("------------setMyScore------------------");
console.log(e);
"uped" == e && (t.isUpgrade = !0);
}, function(e) {
console.log(e);
});
}
});
cc._RF.pop();
}, {} ],
GameProvider: [ function(e, t) {
"use strict";
cc._RF.push(t, "fbdd5ReyFxHioXVNcTwoYt5", "GameProvider");
function n(e) {
if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
if (Array.isArray(e) || (e = i(e))) {
var t = 0, n = function() {};
return {
s: n,
n: function() {
return t >= e.length ? {
done: !0
} : {
done: !1,
value: e[t++]
};
},
e: function(e) {
throw e;
},
f: n
};
}
throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var o, r, s = !0, a = !1;
return {
s: function() {
o = e[Symbol.iterator]();
},
n: function() {
var e = o.next();
s = e.done;
return e;
},
e: function(e) {
a = !0;
r = e;
},
f: function() {
try {
s || null == o.return || o.return();
} finally {
if (a) throw r;
}
}
};
}
function i(e, t) {
if (e) {
if ("string" == typeof e) return o(e, t);
var n = Object.prototype.toString.call(e).slice(8, -1);
"Object" === n && e.constructor && (n = e.constructor.name);
return "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
}
}
function o(e, t) {
(null == t || t > e.length) && (t = e.length);
for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
return i;
}
String.prototype.inArray = function(e) {
e || console.log("ERR(in_array):Input is not an array");
for (var t = 0, n = e.length; t < n; t++) if (this == e[t]) return !0;
return !1;
};
Array.prototype.removeByValue = function(e) {
for (var t = 0; t < this.length; t++) if (this[t] == e) {
this.splice(t, 1);
break;
}
};
Array.prototype.minus = function(e) {
for (var t = new Array(), n = {}, i = 0; i < e.length; i++) n[e[i]] = 1;
for (var o = 0; o < this.length; o++) if (!n[this[o]]) {
n[this[o]] = 1;
t.push(this[o]);
}
return t;
};
var r = e("SocketProvider");
cc.Class({
extends: r,
properties: {},
hideDragItem: function(e) {
if (this.putSele[e]) {
this.putSele[e].destroy();
this.putSele[e] = null;
}
},
createBuff: function(e) {
var t, n, i;
this.node.parent;
if (1 == e.typeId) {
this.playSnd("thunder");
t = cc.instantiate(this.playerPrefab[23]);
} else if (2 == e.typeId) {
this.playSnd("heal");
t = cc.instantiate(this.playerPrefab[24]);
}
this.dispCharSele();
this.putSele[e.innerId] && this.putSele[e.innerId].parent.destroy();
this.clickSele = {};
n = 30 * e.mypos.x;
i = 30 * e.mypos.y;
var o = cc.v2(n, i);
t.setPosition(o);
this.node.addChild(t);
},
createAgents: function(e) {
for (var t, n, i, o, r, s, a = 0; a < e.length; a++) {
t = (i = e[a]).aid;
n = this.npcInfo.objectForKey(t);
r = 30 * i.mypos.x;
s = 30 * i.mypos.y;
if (null == n) {
this.hideDragItem(i.innerId);
if ("ske" == i.role) n = cc.instantiate(this.playerPrefab[0]); else if ("ir" == i.role) n = cc.instantiate(this.playerPrefab[20]); else if ("bee" == i.role) n = cc.instantiate(this.playerPrefab[16]); else if ("wiz" == i.role) n = cc.instantiate(this.playerPrefab[17]); else if ("hr" == i.role) n = cc.instantiate(this.playerPrefab[12]); else if ("lm" == i.role) n = cc.instantiate(this.playerPrefab[14]); else if ("lr" == i.role) n = cc.instantiate(this.playerPrefab[3]); else {
if ("gi" != i.role) continue;
n = cc.instantiate(this.playerPrefab[4]);
}
n.name = t;
n.type = "agent";
n.active = !0;
n.role = i.role;
n.size = i.size;
n.level = i.level;
(o = this.getComponentByRole(n)).init();
o.setId(t);
o.setShadow(this.shadowForAgent());
o.setTotalLife(i.life);
o.setBlood(this.bloodForAgent(n));
1 == this.mainPlayer ? i.rot = 180 : 2 == this.mainPlayer && (i.rot = 0);
r = 30 * i.mypos.x;
s = 30 * i.mypos.y;
o.updatePos(r, s);
this.node.addChild(n);
this.npcInfo.setObject(n, t);
}
}
},
createBullets: function(e) {
for (var t, n, i, o, r = 0; r < e.length; r++) {
t = (i = e[r]).aid;
if (null == (n = this.npcInfo.objectForKey(t))) {
if ("bullet" == i.role) {
(n = cc.instantiate(this.playerPrefab[1])).startPos = i.mypos;
n.active = !1;
} else if ("bomb" == i.role) {
console.log("bomb created");
this.playSnd("fireSend");
this.hideDragItem(i.innerId);
n = cc.instantiate(this.playerPrefab[5]);
o = this.enemeyDistance(i.mypos.x, i.mypos.y, i.targetpos.x, i.targetpos.y);
n.startPos = i.mypos;
n.targetDis = o;
} else if ("tama" == i.role) {
this.playSnd("gun");
(n = cc.instantiate(this.playerPrefab[9])).startPos = i.mypos;
n.active = !1;
} else if ("wizfire" == i.role) {
(n = cc.instantiate(this.playerPrefab[18])).startPos = i.mypos;
n.active = !1;
} else console.log("error, no bullet type.");
n.name = t;
n.type = "bullet";
n.role = i.role;
n.updown = i.updown;
n.zIndex = 9999;
this.getComponentByRole(n);
this.node.addChild(n);
var s = cc.v2(-1e3, -1e3), a = i.rot;
1 == this.mainPlayer && (a += 180);
n.angle = -1 * a;
n.setPosition(s);
this.npcInfo.setObject(n, t);
}
}
},
createBases: function(e) {
for (var t, n, i, o, r, s = 0; s < e.length; s++) {
t = (i = e[s]).aid;
if (null == (n = this.npcInfo.objectForKey(t))) {
(n = {}).name = t;
n.type = "base";
n.active = !0;
n.role = i.role;
n.mypos = i.mypos;
n.size = i.size;
o = "base" + i.objectId;
n.baseObj = this.node.getChildByName(o);
(r = n.baseObj.getComponent("BaseSprite")).setTotalLife(i.life);
r.setBlood(this.bloodForAgent(n.baseObj));
r.setLife(i.life);
this.npcInfo.setObject(n, t);
}
}
},
createLogs: function(e) {
for (var t, n, i, o, r, s, a = 0; a < e.length; a++) {
t = (i = e[a]).aid;
n = this.npcInfo.objectForKey(t);
r = 30 * i.mypos.x;
s = 30 * i.mypos.y;
if (null == n) {
this.hideDragItem(i.innerId);
(n = cc.instantiate(this.playerPrefab[8])).name = t;
n.type = "log";
n.active = !0;
n.role = i.role;
(o = this.getComponentByRole(n)).setId(t);
o.setShadow(this.shadowForLog());
var l = cc.v2(r, s);
o.move(l);
this.node.addChild(n);
this.playSnd("log");
this.npcInfo.setObject(n, t);
}
}
},
createForts: function(e) {
for (var t, n, i, o, r, s, a, l = 0; l < e.length; l++) {
t = (i = e[l]).aid;
n = this.npcInfo.objectForKey(t);
r = 30 * i.mypos.x;
s = 30 * i.mypos.y;
if (null == n) {
this.hideDragItem(i.innerId);
(n = cc.instantiate(this.playerPrefab[7])).name = t;
n.type = "fa";
n.spName = "FortASprite";
n.active = !0;
n.role = i.role;
n.size = i.size;
1 == this.mainPlayer ? a = 1001 + parseInt(32 - i.mypos.y - 1) : 2 == this.mainPlayer && (a = 1001 + parseInt(32 - i.mypos.y - 1));
n.zIndex = a;
(o = this.getComponentByRole(n)).setZIndex(a);
o.setTotalLife(i.life);
o.setBlood(this.bloodForAgent(n));
1 == this.mainPlayer ? i.rot = 180 : 2 == this.mainPlayer && (i.rot = 0);
var c = cc.v2(r, s);
n.setPosition(c);
this.node.addChild(n);
this.npcInfo.setObject(n, t);
}
}
},
agentProcess: function(e) {
for (var t, i, o = [], r = 0; r < e.length; r++) o.push(e[r].aid);
var s, a = n(this.npcInfo.allKeys().minus(o));
try {
for (a.s(); !(s = a.n()).done; ) {
i = s.value;
if ("agent" == (t = this.npcInfo.objectForKey(i)).type) {
this.getComponentByRole(t).remove();
this.removedNpcInfo.setObject(t, i);
this.npcInfo.removeObjectForKey(i);
}
}
} catch (e) {
a.e(e);
} finally {
a.f();
}
},
baseProcess: function(e) {
for (var t, i, o = [], r = [], s = 0; s < e.length; s++) {
i = "base" + e[s].objectId;
o.push(i);
r.push(i);
}
var a, l = n(this._defaultBases.minus(o));
try {
for (l.s(); !(a = l.n()).done; ) {
i = a.value;
this.dispLayoutMask(r, i);
this._defaultBases.removeByValue(i);
t = this.node.getChildByName(i);
this.node.removeChild(t);
this.playEffect("base", t.x, t.y);
}
} catch (e) {
l.e(e);
} finally {
l.f();
}
},
plusBaseKillNum: function(e) {
var t = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label"), n = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
e.inArray([ "base1", "base2", "base3" ]) ? t.string = parseInt(t.string) + 1 : n.string = parseInt(t.string) + 1;
},
killBases: function(e) {
var t, i, o, r = n("up" == e ? [ "base1", "base2", "base3" ] : [ "base4", "base5", "base6" ]);
try {
for (r.s(); !(o = r.n()).done; ) {
i = o.value;
if (t = this.node.getChildByName(i)) {
this.playEffect("base", t.x, t.y);
this.node.removeChild(t);
}
}
} catch (e) {
r.e(e);
} finally {
r.f();
}
},
undisplayMask: function(e) {
console.log(e);
this.node.getChildByName(e).active = !1;
},
dispLayoutMask: function(e, t) {
"base4" != t && "base5" != t && "base6" != t && ("base1".inArray(e) && "base2".inArray(e) ? this.showMask("seleMask12", 2) : "base1".inArray(e) && "base3".inArray(e) ? this.showMask("seleMask13", 2) : "base1".inArray(e) && this.showMask("seleMask1", 2));
},
showDragMask: function(e) {
this.ifNotMaskRole(e) || (this.node.getChildByName(this.maskType).active = !0);
},
unshowDragMask: function() {
this.node.getChildByName(this.maskType).active = !1;
},
showMask: function(e, t) {
var n = this;
this.maskType = e;
this.node.getChildByName(e).active = !0;
this.scheduleOnce(function() {
n.undisplayMask(e);
}, t);
},
putErrorMsg: function() {
var e = this;
this.node.getChildByName("putError").active = !0;
this.scheduleOnce(function() {
e.undisplayPutErr();
}, 1);
},
undisplayPutErr: function() {
this.node.getChildByName("putError").active = !1;
},
fortProcess: function(e) {
for (var t, i, o = [], r = 0; r < e.length; r++) o.push(e[r].aid);
var s, a = n(this.npcInfo.allKeys().minus(o));
try {
for (a.s(); !(s = a.n()).done; ) {
i = s.value;
if ("fa" == (t = this.npcInfo.objectForKey(i)).type) {
this.playEffect("fort", t.x, t.y);
this.node.removeChild(t);
this.removedNpcInfo.setObject(t, i);
this.npcInfo.removeObjectForKey(i);
this.playEffect("base", t.x, t.y);
}
}
} catch (e) {
a.e(e);
} finally {
a.f();
}
},
logProcess: function(e) {
for (var t, i, o = [], r = 0; r < e.length; r++) o.push(e[r].aid);
var s, a = n(this.npcInfo.allKeys().minus(o));
try {
for (a.s(); !(s = a.n()).done; ) {
i = s.value;
if ("log" == (t = this.npcInfo.objectForKey(i)).role) {
this.playEffect("log", t.x, t.y);
this.getComponentByRole(t).remove();
this.removedNpcInfo.setObject(t, i);
this.npcInfo.removeObjectForKey(i);
}
}
} catch (e) {
a.e(e);
} finally {
a.f();
}
},
bulletProcess: function(e) {
for (var t, i, o = [], r = 0; r < e.length; r++) o.push(e[r].aid);
var s, a = n(this.npcInfo.allKeys().minus(o));
try {
for (a.s(); !(s = a.n()).done; ) {
i = s.value;
if ("bomb" == (t = this.npcInfo.objectForKey(i)).role) {
this.getComponentByRole(t);
t.destroy();
this.removedNpcInfo.setObject(t, i);
this.npcInfo.removeObjectForKey(i);
this.playEffect("bomb", t.x, t.y);
}
if ("wizfire" == t.role) {
this.getComponentByRole(t);
t.destroy();
this.removedNpcInfo.setObject(t, i);
this.npcInfo.removeObjectForKey(i);
t.x && t.y && this.playEffect("wizfire", t.x, t.y);
} else if ("bullet" == t.role || "tama" == t.role) {
this.getComponentByRole(t);
t.destroy();
this.removedNpcInfo.setObject(t, i);
this.npcInfo.removeObjectForKey(i);
}
}
} catch (e) {
a.e(e);
} finally {
a.f();
}
},
startSceneJitter: function() {
var e = this.node, t = e.x, n = e.y, i = 0, o = this.node, r = cc.delayTime(1 / 30), s = cc.callFunc(function() {
i++;
var o = Math.floor(8 * Math.random()) + -4, r = Math.floor(8 * Math.random()) + -4;
e.x += o;
e.y += r;
if (i >= 10) {
e.stopAllActions();
e.x = t;
e.y = n;
}
}), a = cc.sequence(r, s);
o.runAction(cc.repeatForever(a));
},
playBases: function(e) {
for (var t, n, i, o, r, s = [], a = {}, l = 0; l < e.length; l++) {
i = "base" + (n = e[l]).objectId;
n.attackDura;
t = this.npcInfo.objectForKey(n.aid).baseObj;
a[n.aid] = i;
s.push(i);
n.actType;
if (t) {
t.getComponent("BaseSprite").setLife(n.life);
if (r = t.getChildByName("warrior")) {
r.role = "lr";
o = this.getComponentByRole(r);
t && "wait" == n.actType ? o.playBaseWarriorAnimationDefault("move", n.objectId) : t && "sa" == n.actType && o.playBaseWarriorAnimation(n, this.mainPlayer, "sa");
}
if (r = t.getChildByName("gun")) {
r.role = "gun";
o = this.getComponentByRole(r);
t && "wait" == n.actType || t && "sa" == n.actType && o.playBaseWarriorAnimation(n, this.mainPlayer, "sa");
}
}
}
},
playAgents: function(e, t) {
for (var n, i, o, r, s, a = 0; a < e.length; a++) {
s = e[a];
if ((n = this.npcInfo.objectForKey(s.aid)) && "agent" == n.type) {
(r = this.getComponentByRole(n)).playAni(s, this.getFutureAgent(s.aid, t), this.mainPlayer);
r.setLife(s.life);
r.setGroupKill(s.groupKill);
i = Math.round(30 * s.mypos.x);
o = Math.round(30 * s.mypos.y);
r.updatePos(i, o);
}
}
},
playForts: function(e) {
for (var t, n, i, o = null, r = 0; r < e.length; r++) {
i = e[r];
if (t = this.npcInfo.objectForKey(i.aid)) {
t.role = "fa";
(n = this.getComponentByRole(t)).setLife(i.life);
(o = t.getChildByName("warrior")).role = "lr";
n = this.getComponentByRole(o);
t && "move" == i.actType ? n.playFortWarriorAnimationDefault("move", i.isHero, this.mainPlayer) : t && "sa" == i.actType && n.playBaseWarriorAnimation(i, this.mainPlayer, "sa");
}
}
},
playLogs: function(e) {
for (var t, n, i = 0; i < e.length; i++) {
t = e[i];
(n = this.npcInfo.objectForKey(t.aid)) && this.getComponentByRole(n).move(t.mypos);
}
},
playBullets: function(e) {
for (var t, n, i, o, r, s, a, l = 0; l < e.length; l++) {
o = e[l];
if (t = this.npcInfo.objectForKey(o.aid)) {
t.active = !0;
this.getComponentByRole(t);
if ("bomb" == t.role) {
r = this.getFireBombScale(o.mypos, o.targetpos, t.targetDis, t.startPos);
t.scaleX = r;
t.scaleY = r;
}
if ("up" == o.updown && 2 == this.mainPlayer) continue;
if ("down" == o.updown && 1 == this.mainPlayer) continue;
n = 30 * o.mypos.x;
i = 30 * o.mypos.y;
s = cc.v2(n, i);
a = o.rot;
1 == this.mainPlayer && (a += 180);
t.zIndex = 1e3 + parseInt(32 - o.mypos.y);
"bomb" != t.role && "wizfire" != t.role || (t.zIndex = 9999);
t.angle = -1 * a;
t.setPosition(s);
}
}
},
getFireBombScale: function(e, t, n, i) {
var o = {};
o.x = i.x + (t.x - i.x) / 2;
o.y = i.y + (t.y - i.y) / 2;
var r = e.x - o.x, s = e.y - o.y;
return .7 * ((n *= .5) - Math.sqrt(r * r + s * s)) / n + .5;
},
enemeyDistance: function(e, t, n, i) {
var o, r;
o = e - n;
r = t - i;
return Math.sqrt(o * o + r * r);
},
getComponentByRole: function(e) {
var t = e.role;
return "ske" == t ? e.getComponent("SkeSprite") : "ir" == t ? e.getComponent("SkeSprite") : "bee" == t ? e.getComponent("BeeSprite") : "wiz" == t ? e.getComponent("WizSprite") : "hr" == t ? e.getComponent("HeroSprite") : "lm" == t ? e.getComponent("LightmanSprite") : "lr" == t ? e.getComponent("ArcSprite") : "gi" == t ? e.getComponent("GiantSprite") : "bullet" == t ? e.getComponent("Arrow") : "bomb" == t ? e.getComponent("BombScript") : "log" == t ? e.getComponent("LogSprite") : "gun" == t ? e.getComponent("GunSprite") : "base" == t ? e.getComponent("BaseSprite") : "fa" == t ? e.getComponent("BaseSprite") : void 0;
},
getKilledEnemies: function() {
for (var e, t = this.removedNpcInfo.allKeys(), n = [], i = 0; i < t.length; i++) {
e = t[i];
n.push(this.removedNpcInfo.objectForKey(e));
}
return n;
},
getFutureAgent: function(e, t) {
for (var n = 0; n < t.length; n++) if (t[n].aid == e) return t[n];
return null;
},
bloodForAgent: function(e) {
var t = cc.instantiate(this.playerPrefab[11]);
t.getComponent("BloodBar").setBarLevel(e.level);
t.active = !1;
e.addChild(t);
return t;
},
shadowForAgent: function() {
var e = cc.instantiate(this.playerPrefab[2]);
e.active = !1;
this.node.addChild(e);
return e;
},
shadowForLog: function() {
var e = cc.instantiate(this.playerPrefab[2]);
e.scaleX = 1;
e.sacleY = 1;
e.active = !1;
this.node.addChild(e);
return e;
},
setClickItem: function(e) {
this.clickSele = e;
},
putClickItem: function(e, t, n) {
var i = cc.instantiate(t), o = this.nick + "_" + Number(new Date());
i.x = n.x;
i.y = n.y;
i.name = o;
i.active = !0;
e.addChild(i);
this.putSele[o] = i;
return o;
},
setDragItem: function(e, t) {
var n = e.target, i = cc.instantiate(t), o = this.nick + "_" + Number(new Date());
t.x = 0;
t.y = 0;
i.name = o;
i.actvie = !0;
n.addChild(i);
this.putSele[o] = i;
this.draggingItem = o;
return o;
},
unsetDragItem: function(e) {
this.unshowDragMask();
this.draggingItem = "";
this.putSele[e].destroy();
this.putSele[e] = null;
},
moveDragItem: function(e, t) {
if (this.putSele[this.draggingItem]) {
this.putSele[this.draggingItem].x += t.x;
this.putSele[this.draggingItem].y += t.y;
this.putSele[this.draggingItem].y;
}
},
clearDragItem: function(e, t) {
var n, i, o = e.target, r = (o._name, {}), s = this.node.position, a = t.magicCost, l = t.level, c = t.role;
console.log("role:" + c);
this.unshowDragMask();
i = 1 == this.mainPlayer ? -50 : 20;
if (this.putSele[this.draggingItem]) {
n = this.putSele[this.draggingItem].name;
r.x = (this.putSele[this.draggingItem].x + o.x - s.x) / this.node.scaleX;
r.y = (this.putSele[this.draggingItem].y + o.y - s.y + i) / this.node.scaleY;
if (!this.isValidPutPoint(r) && !this.ifNotMaskRole(c)) {
console.log("invalid postion.");
this.putSele[n].destroy();
this.putSele[n] = null;
this.putErrorMsg();
return;
}
this.sendSodier(a, c, r, n, l);
this.draggingItem = "";
}
},
sendSodier: function(e, t, n, i, o) {
var r = 1 == this.mainPlayer, s = this.canvasNode.getChildByName("magicBar").getChildByName("juice"), a = this.useMagic(e);
this.playSnd("put1");
if (a) {
s.width = a;
MY_SOCKET.json.emit("cmd", {
isHero: r,
roomId: this.roomId,
innerId: i,
role: t,
pt: n,
level: o
});
} else {
this.putSele[i].destroy();
this.putSele[i] = null;
}
},
setMagicBar: function() {
var e = this.canvasNode.getChildByName("magicBar").getChildByName("juice");
e.width < 600 && (e.width += this.addJuice);
if (e.width % 50 == 0) {
this.magicAmount = e.width / 50;
this.updateCardStatus();
}
},
useMagic: function(e) {
var t = this.canvasNode.getChildByName("magicBar").getChildByName("juice").width - 50 * e;
return t >= 0 && t;
},
updateCardStatus: function() {
for (var e, t, n = null, i = 1; i <= 7; i++) {
e = "sel" + i;
(t = this.canvasNode.getChildByName(e)) && (n = t.getComponent("SelCard")) && (n.magicCost <= this.magicAmount ? t.color = new cc.Color(255, 255, 255) : t.color = new cc.Color(127, 127, 127));
}
}
});
cc._RF.pop();
}, {
SocketProvider: "SocketProvider"
} ],
Game: [ function(e, t) {
"use strict";
cc._RF.push(t, "f3bc9CQlNRD6plaPVQ+7BK9", "Game");
e("Common");
var n = e("GameProvider");
cc._Dictionary = e("Dictionary");
cc.Class({
extends: n,
properties: {
playerPrefab: {
default: [],
type: cc.Prefab
},
audios: {
default: [],
type: cc.AudioClip
}
},
ctor: function() {
console.log("-----ctor----");
this.bufferLen = 30;
},
goback: function() {
this.syncTimeout();
cc.director.loadScene("menu");
},
onLoad: function() {
console.log("---------onLoad--------");
var e = this;
this.netErrDisp = !1;
cc.visibleRect;
var t = this.getRandomCharName();
this.nick = t;
this.canvasNode = this.node.parent;
this.resultOp = this.node.getChildByName("Result").getComponent("Result");
this.gameCountDown = 150;
this.mainPlayer = -1;
this.roomId = "";
this.baseAttackDuraRec = [];
this.agentMoveStepRec = [];
this._defaultBases = [ "base1", "base2", "base3", "base4", "base5", "base6" ];
this.gameStartTime = 0;
this.gameCycleTime = 90;
this.gameOver = !1;
this.addJuice = 10;
this.npcInfo = new cc._Dictionary();
this.removedNpcInfo = new cc._Dictionary();
this.setUser(this.getPersistantData());
console.log("name:" + t);
this.socketHandle(this.nick);
this.putSele = [];
this.dragingItem = "";
this.clickSele = {};
this.magicAmount = 0;
this.maskType = "seleMask3";
this.node._parent.getPosition(), this.node.getPosition();
this.node.on(cc.Node.EventType.TOUCH_END, function(t) {
if (0 != e.gameStartTime) {
var n = t.getLocation();
e.clickProcessor(n);
}
});
this.initEventListener();
},
getPersistantData: function() {
return cc.find("GameData").getComponent("GameData").getData();
},
setUser: function(e) {
var t = cc.find("GameData").getComponent("GameData"), n = this.node.parent.getChildByName("banner").getChildByName("title"), i = this.node.parent.getChildByName("banner").getChildByName("level").getChildByName("levelword").getComponent("cc.Label"), o = n.getChildByName("name").getComponent("cc.Label"), r = n.getChildByName("score").getComponent("cc.Label");
o.string = t.getNick();
i.string = e.level;
r.string = e.myscore;
},
setConnFailInfo: function() {
this.netErrDisp = !0;
var e = this.node.getChildByName("putWait").getChildByName("msg").getComponent("cc.Label");
this.node.getChildByName("putWait").getChildByName("retBut").active = !0;
e.string = "网络连接断开!";
},
setBuffDisp: function(e) {
var t = this.node.parent;
this.buffType = e;
"heal" == e ? t.getChildByName("buffHeal").active = !0 : "thunder" == e && (t.getChildByName("buffThunder").active = !0);
},
setParam: function(e, t) {
console.log("----param----");
console.log(e);
console.log(t);
var n = new Date().getTime();
console.log("duration:" + (n - t));
this.setMyCards(e);
this.dispCharSele();
},
setMyCards: function(e) {
for (var t, n, i, o, r, s = e, a = this.node.parent, l = 0; l < s.length; l++) {
(i = cc.instantiate(this.playerPrefab[21]))._name = "sel" + (l + 1);
o = i.getComponent("SelCard");
s[l] && o.setRole(s[l].seleRole, s[l].magicCost, s[l].roleLevel);
t = l % 6 * 105 - 230;
n = -590;
r = cc.v2(t, n);
i.setPosition(r);
a.addChild(i);
}
for (l = s.length; l < 6; l++) {
t = l % 6 * 105 - 230;
n = -590;
i = cc.instantiate(this.playerPrefab[22]);
r = cc.v2(t, n);
i.setPosition(r);
a.addChild(i);
}
},
dispCharSele: function() {
var e = this.node.parent.getChildByName("charSele");
e.zIndex = 9999;
e.active = !1;
console.log(e);
},
gameOverProcessor: function(e, t) {
if (1 == e) {
if (1 == t.win) {
console.log("my win11");
this.killBases("up");
} else if (0 == t.win) {
console.log("my lose11");
this.killBases("down");
}
} else if (2 == e) if (1 == t.win) {
console.log("my lose11");
this.killBases("down");
} else if (0 == t.win) {
console.log("my win11");
this.killBases("up");
}
},
clickProcessor: function(e) {
var t, n = this.canvasNode.getPosition(), i = this.node.getPosition(), o = e, r = {}, s = this.clickSele.magicCost, a = this.clickSele.level, l = this.clickSele.role;
if (void 0 !== l && "" != l) {
var c, f = this.clickSele.params.target, u = this.clickSele.node, h = u.parent.getPosition();
c = 1 == this.mainPlayer ? -20 : 40;
r.x = i.x + o.x - h.x - 10;
r.y = i.y + o.y - h.y - (n.y + i.y);
o.x = o.x / this.node.scaleX - (n.x + i.x);
o.y = o.y / this.node.scaleY - (n.y + i.y) + c;
this.ifNotMaskRole(l) || this.showMask(this.maskType, 1);
if (this.isValidPutPoint(o) || this.ifNotMaskRole(l)) {
t = this.putClickItem(f, u, r);
this.sendSodier(s, l, o, t, a);
} else {
console.log("invalid postion.");
this.putErrorMsg();
}
}
},
isValidPutPoint: function(e) {
var t = {};
t.x = e.x;
t.y = e.y;
2 == this.mainPlayer && (t.y = e.y - 40);
return "seleMask1" == this.maskType ? t.x >= 30 && t.x <= 570 && t.y > 0 && t.y < 650 : "seleMask12" == this.maskType ? t.x >= 30 && t.x <= 570 && t.y > 0 && t.y < 420 || t.x >= 285 && t.x <= 570 && t.y > 420 && t.y < 650 : "seleMask13" == this.maskType ? t.x >= 30 && t.x <= 570 && t.y > 0 && t.y < 420 || t.x >= 30 && t.x <= 285 && t.y > 420 && t.y < 650 : "seleMask3" == this.maskType && t.x >= 30 && t.x <= 570 && t.y > 0 && t.y < 420;
},
ifNotMaskRole: function(e) {
return "bomb" == e || "thunder" == e || "heal" == e;
},
initEventListener: function() {
this.node.on("event_effect", this.onEventEffect.bind(this));
},
onEventEffect: function() {
console.log("listening effect loaded....");
},
setCountDown: function(e) {
var t = parseInt(e / 60), n = e % 60;
n < 10 && (n = "0" + n);
this.canvasNode.getChildByName("banner").getChildByName("time").getChildByName("countDown").getComponent("cc.Label").string = t + ":" + n;
},
doubleMagicDisp: function() {
this.node.getChildByName("doubleMagic").active = !0;
},
setTimeCounter: function(e) {
this.gameNowTime = e;
this.setCountDown(e);
if (60 == e) {
console.log("magic charge speed up");
this.doubleMagicDisp();
this.addJuice = 20;
}
this.setMagicBar();
var t = this.gameCycleTime - e;
t < 0 ? this.gameOver = !0 : parseInt(t / 10);
},
startTraceTimer: function() {
this.interval = 30;
var e = Date.now(), t = this, n = (this.gameCycleTime, Date.now(), 0);
this.traceTimer || (this.traceTimer = function() {
var i = Date.now(), o = i - e, r = i - t.gameStartTime;
if (!t.gameOver && r > 1e3 * n) {
n++;
Math.abs(n - t.gameNowTime) > 5 && this.syncTimeout();
}
if (o > t.interval) {
e = i - o % t.interval;
t.mainGameCycle();
}
}.bind(this));
this.schedule(this.traceTimer, 0);
},
mainGameCycle: function() {
var e, t, n, i, o, r, s, a;
if (this.gameTraceStack.length > this.bufferLen) {
this.gameTraceStack.shift();
t = (e = this.gameTraceStack[0]).agents;
s = this.gameTraceStack[29].agents;
a = this.gameTraceStack[29].forts;
n = e.bullets;
i = e.bases;
o = e.forts;
r = e.rollLogs;
this.playBullets(n);
this.playLogs(r);
this.playAgents(t, s);
this.playBases(i);
this.playForts(o);
this.bulletProcess(n);
this.logProcess(r);
this.agentProcess(t);
this.fortProcess(o, a);
this.baseProcess(i);
}
},
syncTimeout: function() {
this.gameOver = !0;
this.stopTraceTimer();
MY_SOCKET.disconnect();
console.log("网络断开");
},
stopTraceTimer: function() {
this.traceTimer && this.unschedule(this.traceTimer);
},
playSnd: function(e) {
"base" == e ? cc.audioEngine.play(this.audios[0], !1, 1) : "fireSend" == e ? cc.audioEngine.play(this.audios[1], !1, 1) : "bomb" == e ? cc.audioEngine.play(this.audios[2], !1, 1) : "ske" == e ? cc.audioEngine.play(this.audios[3], !1, 1) : "hr" == e ? cc.audioEngine.play(this.audios[4], !1, 1) : "lr" == e ? cc.audioEngine.play(this.audios[5], !1, 1) : "gi" == e ? cc.audioEngine.play(this.audios[6], !1, 1) : "put1" == e ? cc.audioEngine.play(this.audios[7], !1, 1) : "wizfire" == e ? cc.audioEngine.play(this.audios[2], !1, 1) : "lm" == e ? cc.audioEngine.play(this.audios[8], !1, 1) : "gun" == e ? cc.audioEngine.play(this.audios[9], !1, 1) : "thunder" == e ? cc.audioEngine.play(this.audios[10], !1, 1) : "heal" == e ? cc.audioEngine.play(this.audios[11], !1, 1) : "log" == e && cc.audioEngine.play(this.audios[12], !1, 1);
},
playEffect: function(e, t, n) {
var i;
if ("hr" == e) {
(i = cc.instantiate(this.playerPrefab[13])).x = t;
i.y = n + 20;
this.node.addChild(i);
}
if ("lm" == e) {
this.playSnd("lm");
(i = cc.instantiate(this.playerPrefab[15])).x = t;
i.y = n - 40;
this.node.addChild(i);
} else if ("base" == e) {
this.playSnd("base");
(i = cc.instantiate(this.playerPrefab[10])).x = t;
i.y = n;
this.node.addChild(i);
} else if ("fa" == e) {
(i = cc.instantiate(this.playerPrefab[10])).x = t;
i.y = n;
this.node.addChild(i);
} else if ("log" == e) {
(i = cc.instantiate(this.playerPrefab[10])).scaleX = .8;
i.scaleY = .8;
i.x = t + 10;
i.y = n;
this.node.addChild(i);
} else if ("bomb" == e) {
this.playSnd("bomb");
this.startSceneJitter();
(i = cc.instantiate(this.playerPrefab[6])).active = !0;
i.x = t;
i.y = n;
this.node.addChild(i);
} else if ("wizfire" == e) {
this.playSnd("wizfire");
(i = cc.instantiate(this.playerPrefab[19])).active = !0;
i.x = t;
i.y = n;
this.node.addChild(i);
}
}
});
cc._RF.pop();
}, {
Common: "Common",
Dictionary: "Dictionary",
GameProvider: "GameProvider"
} ],
GiantSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "06cfaN7txBFkqJqizTWDtk1", "GiantSprite");
var n = e("MySprite");
cc.Class({
extends: n,
properties: {
role: "gi"
},
start: function() {
this.shadow.scaleX = 1.2;
this.shadow.scaleY = 1.2;
},
getAttackDistance: function(e) {
return .75 * (e.size + e.esize);
},
remove: function() {
this._animation.play("dieoff1");
this.shadow.destroy();
this.blood.destroy();
},
dieStart: function() {},
dieEnd: function() {
this._animation.play("footprint");
},
footStart: function() {
this.node.zIndex = -1;
},
footEnd: function() {
this.node.destroy();
},
playAni: function(e, t, n) {
this.playAngleAnimationNear(e, t, n);
},
frame1Evt: function() {
this.dispShadow(1);
this.shadow.zIndex = -1;
},
frame2Evt: function() {
this.dispShadow(2);
},
frame3Evt: function() {
this.dispShadow(3);
},
frame4Evt: function() {
this.dispShadow(4);
},
frame5Evt: function() {
this.dispShadow(5);
},
frame6Evt: function() {
this.dispShadow(6);
},
frame7Evt: function() {
this.dispShadow(7);
},
aFrame1Evt: function() {
this.dispShadow(2);
this.layoutOp.playSnd("gi");
},
aFrame2Evt: function() {},
aFrame3Evt: function() {
this.dispShadow(4);
},
aFrame4Evt: function() {},
aFrame5Evt: function() {},
aFrame6Evt: function() {
this.dispShadow(7);
}
});
cc._RF.pop();
}, {
MySprite: "MySprite"
} ],
GunSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "2fe15M3k5hEtLqG347kT1t6", "GunSprite");
var n = e("Common");
cc.Class({
extends: cc.Component,
properties: {
role: "gun"
},
start: function() {
this._animation = this.getComponent(cc.Animation);
this._animation.WrapMode = cc.WrapMode.Loop;
},
isEnemyBase: function(e) {
return 1 == e || 2 == e || 3 == e;
},
playBaseWarriorAnimationDefault: function(e, t, n) {
var i;
i = this.isEnemyBase(n) ? "ar_s_walk" : "ar_n_walk";
if ("move" != e || this.lastAct != i) {
var o = Math.ceil(125 * Math.random()) / 100;
this._animation.play(i, o);
this.lastAct = i;
}
},
playBaseWarriorAnimation: function(e, t, i) {
n.attackTargetYOffset;
var o, r, s, a, l, c, f = e.mypos.x, u = e.mypos.y;
1 == e.objectId ? u = e.mypos.y + 1 : 4 == e.objectId && (u = e.mypos.y - 0);
var h, p = Math.ceil(125 * Math.random()) / 100, d = "";
o = e.enemypos.x;
r = e.enemypos.y;
a = cc.v2(30 * f, 30 * u);
l = cc.v2(30 * o, 30 * r);
if (0 != (c = a.sub(l)).x || 0 != c.y) {
if (0 != c.x && 0 != c.y) {
var y = 180 / Math.PI * Math.atan(c.x / c.y);
s = y;
c.y >= 0 && c.x < 0 ? s = y + 180 : c.y >= 0 && c.x >= 0 && (s = y - 180);
}
if (this._animation) {
console.log(s);
d = (h = this.getActnameByAngle(s, i)).actName;
this.node.scaleX = h.scaleX;
if (this.lastAct != d || "sa" == i) {
if ("sa" == i) {
this._animation.stop();
this._animation.play(d);
} else this._animation.play(d, p);
this.angle = s;
this.lastAct = d;
this.lastScaleX = h.scaleX;
}
}
}
},
getActnameByAngle: function(e, t) {
var n = "", i = 1, o = {};
if (e >= 0 && e <= 7.5) "move" == t ? n = "n_walk" : "sa" == t && (n = "n_attack"); else if (e > 7.5 && e <= 22.5) "move" == t ? n = "en5_walk" : "sa" == t && (n = "en5_attack"); else if (e > 22.5 && e <= 37.5) "move" == t ? n = "en4_walk" : "sa" == t && (n = "en4_attack"); else if (e > 37.5 && e <= 52.5) "move" == t ? n = "en3_walk" : "sa" == t && (n = "en3_attack"); else if (e > 52.5 && e <= 67.5) "move" == t ? n = "en2_walk" : "sa" == t && (n = "en2_attack"); else if (e > 67.5 && e <= 82.5) "move" == t ? n = "en1_walk" : "sa" == t && (n = "en1_attack"); else if (e > 82.5 && e <= 97.5) "move" == t ? n = "e_walk" : "sa" == t && (n = "e_attack"); else if (e > 97.5 && e <= 112.5) "move" == t ? n = "se1_walk" : "sa" == t && (n = "se1_attack"); else if (e > 112.5 && e <= 127.5) "move" == t ? n = "se2_walk" : "sa" == t && (n = "se2_attack"); else if (e > 127.5 && e <= 142.5) "move" == t ? n = "se3_walk" : "sa" == t && (n = "se3_attack"); else if (e > 142.5 && e <= 157.5) "move" == t ? n = "se4_walk" : "sa" == t && (n = "se4_attack"); else if (e > 157.5 && e <= 172.5) "move" == t ? n = "se5_walk" : "sa" == t && (n = "se5_attack"); else if (e > 157.5 && e <= 172.5) "move" == t ? n = "s_walk" : "sa" == t && (n = "s_attack"); else if (e < 0 && e >= -7.5) {
"move" == t ? n = "n_walk" : "sa" == t && (n = "n_attack");
i = -1;
} else if (e < -7.5 && e >= -22.5) {
"move" == t ? n = "en5_walk" : "sa" == t && (n = "en5_attack");
i = -1;
} else if (e < -22.5 && e >= -37.5) {
"move" == t ? n = "en4_walk" : "sa" == t && (n = "en4_attack");
i = -1;
} else if (e < -37.5 && e >= -52.5) {
"move" == t ? n = "en3_walk" : "sa" == t && (n = "en3_attack");
i = -1;
} else if (e < -52.5 && e >= -67.5) {
"move" == t ? n = "en2_walk" : "sa" == t && (n = "en2_attack");
i = -1;
} else if (e < -67.5 && e >= -82.5) {
"move" == t ? n = "en1_walk" : "sa" == t && (n = "en1_attack");
i = -1;
} else if (e < -82.5 && e >= -97.5) {
"move" == t ? n = "e_walk" : "sa" == t && (n = "e_attack");
i = -1;
} else if (e < -97.5 && e >= -112.5) {
"move" == t ? n = "se1_walk" : "sa" == t && (n = "se1_attack");
i = -1;
} else if (e < -112.5 && e >= -127.5) {
"move" == t ? n = "se2_walk" : "sa" == t && (n = "se2_attack");
i = -1;
} else if (e < -127.5 && e >= -142.5) {
"move" == t ? n = "se3_walk" : "sa" == t && (n = "se3_attack");
i = -1;
} else if (e < -142.5 && e >= -157.5) {
"move" == t ? n = "se4_walk" : "sa" == t && (n = "se4_attack");
i = -1;
} else if (e < -157.5 && e >= -172.5) {
"move" == t ? n = "se5_walk" : "sa" == t && (n = "se5_attack");
i = -1;
} else if (e < -172.5) {
"move" == t ? n = "s_walk" : "sa" == t && (n = "s_attack");
i = -1;
} else console.log("------:" + e);
n = this.role + "_" + n;
o.actName = n;
o.scaleX = i;
return o;
}
});
cc._RF.pop();
}, {
Common: "Common"
} ],
HeroSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "f1d7dQFNudAhLCXA3TwPg0h", "HeroSprite");
var n = e("MySprite");
cc.Class({
extends: n,
properties: {
role: "hr"
},
start: function() {
this.layoutOp = this.node.parent.getComponent("Game");
},
shootArrow: function() {},
getAttackDistance: function(e) {
return .6 * (e.size + e.esize);
},
playAni: function(e, t, n) {
this.playAngleAnimationNear(e, t, n);
},
remove: function() {
this._animation.play("dieoff1");
this.shadow.destroy();
this.blood.destroy();
},
playEffect: function() {
this.layoutOp.playEffect("hr", this.node.x, this.node.y);
},
removeEffect: function() {},
dieStart: function() {},
dieEnd: function() {
this._animation.play("footprint");
},
footStart: function() {
this.node.zIndex = -1;
this.node.scaleX = 1;
this.node.scaleY = 1;
},
footEnd: function() {
this.node.destroy();
},
beforeKill: function() {},
afterKill: function() {
this.node.destroy();
},
frame1Evt: function() {
this.dispShadow(1);
},
frame2Evt: function() {
this.dispShadow(2);
},
frame3Evt: function() {
this.dispShadow(3);
},
frame4Evt: function() {
this.dispShadow(4);
},
frame5Evt: function() {
this.dispShadow(5);
},
frame6Evt: function() {
this.dispShadow(6);
},
frame7Evt: function() {
this.dispShadow(7);
},
aFrame1Evt: function() {
this.attacking = !0;
this.dispShadow(2);
this.layoutOp.playSnd("hr");
},
aFrame2Evt: function() {},
aFrame3Evt: function() {
this.dispShadow(4);
},
aFrame4Evt: function() {},
aFrame5Evt: function() {},
aFrame6Evt: function() {
this.dispShadow(7);
this.attacking = !1;
},
aFrame11Evt: function() {
this.attacking = !0;
this.dispShadow(2);
this.playEffect();
},
aFrame12Evt: function() {},
aFrame13Evt: function() {
this.dispShadow(4);
},
aFrame14Evt: function() {},
aFrame15Evt: function() {},
aFrame16Evt: function() {
this.dispShadow(7);
this.attacking = !1;
}
});
cc._RF.pop();
}, {
MySprite: "MySprite"
} ],
KingSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "4e1e7ijAIxKo4R8otf0WmYm", "KingSprite");
e("Common");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.zIndex = 2999;
}
});
cc._RF.pop();
}, {
Common: "Common"
} ],
LightmanSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "8ba670SxMdMZZPZ9uRjICLu", "LightmanSprite");
var n = e("MySprite");
cc.Class({
extends: n,
properties: {
role: "lm"
},
start: function() {
this.layoutOp = this.node.parent.getComponent("Game");
},
getAttackDistance: function(e) {
this.attactDistance = .6 * (e.size + e.esize);
return this.attactDistance;
},
playAni: function(e, t, n) {
this.tkx = 30 * e.enemypos.x;
this.tky = 30 * e.enemypos.y;
this.playAngleAnimationNear(e, t, n);
},
remove: function() {
this._animation.play("dieoff1");
this.shadow.destroy();
this.blood.destroy();
},
playEffect: function() {
var e = cc.v2(this.node.x, this.node.y), t = cc.v2(this.tkx, this.tky);
e.sub(t).mag() < 60 * this.attactDistance && this.layoutOp.playEffect("lm", this.tkx, this.tky);
},
dieStart: function() {},
dieEnd: function() {
this._animation.play("footprint");
},
footStart: function() {
this.node.zIndex = -1;
this.node.scaleX = 1;
this.node.scaleY = 1;
},
footEnd: function() {
this.node.destroy();
},
beforeKill: function() {},
afterKill: function() {
this.node.destroy();
},
frame1Evt: function() {
this.dispShadow(1);
},
frame2Evt: function() {
this.dispShadow(2);
},
frame3Evt: function() {
this.dispShadow(3);
},
frame4Evt: function() {
this.dispShadow(4);
},
frame5Evt: function() {
this.dispShadow(5);
},
frame6Evt: function() {
this.dispShadow(6);
},
frame7Evt: function() {
this.dispShadow(7);
},
aFrame1Evt: function() {
this.attacking = !0;
this.dispShadow(2);
},
aFrame2Evt: function() {},
aFrame3Evt: function() {
this.dispShadow(4);
},
aFrame4Evt: function() {},
aFrame5Evt: function() {},
aFrame6Evt: function() {
this.dispShadow(7);
this.playEffect();
this.attacking = !1;
}
});
cc._RF.pop();
}, {
MySprite: "MySprite"
} ],
LogSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "0189eXSyXxOPI5EXmXLbFek", "LogSprite");
cc.Class({
extends: cc.Component,
properties: {
role: "log"
},
start: function() {
this._animation = this.getComponent(cc.Animation);
this._animation.WrapMode = cc.WrapMode.Default;
},
setId: function(e) {
this.aid = e;
},
setShadow: function(e) {
this.shadow = e;
this.shadow.active = !0;
},
frame1Evt: function() {
this.dispShadow();
},
frame2Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 20);
this.shadow.setPosition(t);
},
frame3Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 20);
this.shadow.setPosition(t);
},
frame4Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 5);
this.shadow.setPosition(t);
},
frame5Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 5);
this.shadow.setPosition(t);
},
frame6Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 5);
this.shadow.setPosition(t);
},
frame7Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 10);
this.shadow.setPosition(t);
},
frame8Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 10);
this.shadow.setPosition(t);
},
frame9Evt: function() {
this.dispShadow();
var e = this.shadow.getPosition(), t = cc.v2(e.x, e.y - 10);
this.shadow.setPosition(t);
this.play();
},
frame11Evt: function() {
this.dispShadow();
this.shadow.angle = 2;
},
frame12Evt: function() {
this.dispShadow();
this.shadow.angle = 3;
},
frame13Evt: function() {
this.dispShadow();
this.shadow.angle = 3;
},
frame14Evt: function() {
this.dispShadow();
this.shadow.angle = -2;
},
frame15Evt: function() {
this.dispShadow();
this.shadow.angle = 3;
},
frame16Evt: function() {
this.dispShadow();
this.shadow.angle = -2;
},
move: function(e) {
var t, n, i;
t = 30 * e.x;
n = 30 * e.y;
i = cc.v2(t, n);
this.node.zIndex = 2001;
this.node.setPosition(i);
this.updateShadow(e);
},
updateShadow: function(e) {
var t, n, i;
t = 30 * e.x + 20;
n = 30 * e.y;
i = cc.v2(t, n);
this.shadow && this.shadow.setPosition(i);
},
remove: function() {
this.shadow.destroy();
this.node.destroy();
},
play: function() {
this._animation.play("rollingLog");
},
shadowForAgent: function() {
var e = cc.instantiate(this.playerPrefab[2]);
e.active = !1;
this.node.addChild(e);
return e;
},
dispShadow: function() {
if (this.shadow) {
var e = this.shadow;
this.shadow.active = !0;
cc.loader.loadRes("log_shadow/logShadow", cc.SpriteFrame, function(t, n) {
if (e) try {
"" != e._name && (e.getComponent(cc.Sprite).spriteFrame = n);
} catch (t) {
console.log(e);
console.log(t);
}
});
}
}
});
cc._RF.pop();
}, {} ],
MenuScript: [ function(e, t) {
"use strict";
cc._RF.push(t, "e35c8uvDYNJtZPrAAvt2uLh", "MenuScript");
cc.Class({
extends: cc.Component,
properties: {
loading: cc.ProgressBar,
loadLabel: cc.Label
},
onLoad: function() {},
start: function() {},
onProgress: function(e, t) {
this.loading.progress = e / t;
this.loadLabel.string = Math.floor(e / t * 100) + "%";
},
goRelay: function(e, t) {
this.isShared = !0;
this.shareTag = t;
this.closeTime = new Date().getTime();
CC_WECHATGAME && wx.shareAppMessage({
title: "中古战纪",
imageUrl: "https://www.asobee.mobi/fftower/res/acLogo2.jpg"
});
},
play: function(e, t) {
var n = this, i = t;
if (!CC_WECHATGAME || "heal" != i && "thunder" != i) this.goGame(i); else {
var o = wx.createRewardedVideoAd({
adUnitId: "adunit-ebd5d981ced848c7"
});
o.show().catch(function() {
o.load().then(function() {
return o.show();
}).catch(function() {
console.log("激励视频 广告显示失败");
});
});
o.onError(function() {
console.log("激励视频 广告加载失败");
n.goGame(i);
});
o.onClose(function(e) {
(e && e.isEnded || void 0 === e) && n.goGame(i);
});
}
},
goGame: function(e) {
var t = this.getSelLayoutNode().getComponent("SelLayout").getNowAgents(), n = new Date().getTime();
cc.director.loadScene("game", function() {
console.log(t);
var i = cc.director.getScene().getChildByName("Canvas").getChildByName("layout").getComponent("Game");
i.setBuffDisp(e);
i.setParam(t, n);
});
},
getSelLayoutNode: function() {
return this.node.getChildByName("SelScrollView").getChildByName("view").getChildByName("content").getChildByName("SelLayout");
}
});
cc._RF.pop();
}, {} ],
MySprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "cd79aqd9HxCZLHw2ASr//Gc", "MySprite");
e("Common");
var n = e("AgentObj");
cc.Class({
extends: n,
properties: {
sprAtlas: cc.SpriteAtlas,
wrapMode: cc.WrapMode.Loop,
routes: [],
lastAct: "",
lastAngle: -1,
life: -1,
eid: -1
},
onLoad: function() {
this.layoutOp = this.node.parent.getComponent("Game");
},
start: function() {},
ctor: function() {},
init: function() {
this.posX = 0;
this.posY = 0;
this.now = Date.now();
this.angle = -999;
this.groupKill = !1;
this.attacking = !1;
this._animation = this.getComponent(cc.Animation);
this._animation.WrapMode = cc.WrapMode.Loop;
},
setInitPos: function(e, t) {
this.posX = e;
this.posY = t;
var n = cc.v2(this.posX, this.posY);
this.routes.push(n);
},
updatePos: function(e, t) {
var n, i, o = cc.v2(e, t), r = this.node.getAnchorPoint(), s = this.node.getContentSize();
n = (.5 - r.x) * s.width + e;
i = t;
cc.v2(n, i);
this.node.setPosition(o);
this.shadow && this.shadow.setPosition(o);
},
dispShadow: function(e) {
if (this.shadow) {
var t = this.shadow, n = "ske_shadow/e/ske_walk_e" + e;
if (this.lastAct) {
var i = this.lastAct.split("_"), o = i[1];
i[2], this.lastScaleX;
"en1" == o || "en2" == o || "en3" == o ? n = "ske_shadow/en/ske_walk_en" + e : "se1" == o || "se2" == o || "se3" == o ? n = "ske_shadow/se/ske_walk_se" + e : "s" == o ? n = "ske_shadow/s/ske_walk_s" + e : "n" == o ? n = "ske_shadow/n/ske_walk_n" + e : "e" == o && (n = "ske_shadow/e/ske_walk_e" + e);
this.shadow.active = !0;
cc.loader.loadRes(n, cc.SpriteFrame, function(e, n) {
if (t) try {
"" != t._name && (t.getComponent(cc.Sprite).spriteFrame = n);
} catch (e) {
console.log(t);
console.log(e);
}
});
}
}
},
getActnameByAngle: function(e, t) {
var n, i = "", o = 1, r = {};
if (e > -22.5 && e <= 22.5) "move" == t ? i = "n_walk" : "sa" == t && (i = "n_attack"); else if (e > 22.5 && e <= 67.5) "move" == t ? i = "en2_walk" : "sa" == t && (i = "en2_attack"); else if (e > 67.5 && e <= 112.5) "move" == t ? i = "e_walk" : "sa" == t && (i = "e_attack"); else if (e > 112.5 && e <= 157.5) "move" == t ? i = "se2_walk" : "sa" == t && (i = "se2_attack"); else if (e > 157.5 || e < -202.5) "move" == t ? i = "s_walk" : "sa" == t && (i = "s_attack"); else if (e < -22.5 && e >= -67.5) {
"move" == t ? i = "en2_walk" : "sa" == t && (i = "en2_attack");
o = -1;
} else if (e < -67.5 && e >= -112.5) {
"move" == t ? i = "e_walk" : "sa" == t && (i = "e_attack");
o = -1;
} else if (e < -112.5 && e >= -157.5) {
"move" == t ? i = "se2_walk" : "sa" == t && (i = "se2_attack");
o = -1;
} else if (e < -157.5) {
"move" == t ? i = "s_walk" : "sa" == t && (i = "s_attack");
o = -1;
} else console.log("----error angle--------------:" + e);
i = this.role + "_" + i;
(n = this.specialAct(t)) && (i = n);
r.actName = i;
r.scaleX = o;
return r;
},
specialAct: function(e) {
return !!this.groupKill && "sa" == e && "hr" == this.role && "hr_all_kill";
},
setId: function(e) {
this.aid = e;
},
hide: function() {
this.node.active = !1;
},
setShadow: function(e) {
this.shadow = e;
this.shadow.active = !0;
},
getAgentAngle: function(e, t, n) {
var i, o, r, s, a;
i = t.x;
o = t.y;
r = e.x;
s = e.y;
i - r > 0 && o - s > 0 ? a = n : i - r > 0 && o - s < 0 ? a = 180 - n : i - r < 0 && o - s < 0 ? a = 180 + n : i - r < 0 && o - s > 0 ? a = 0 - n : i - r == 0 && o - s > 0 ? a = 0 : i - r == 0 && o - s < 0 ? a = 180 : o - s == 0 && i - r > 0 ? a = 90 : o - s == 0 && i - r < 0 ? a = -90 : console.log("wrong angle in Func MySprite->getAgentAngle()");
return a;
},
ifFlyAgent: function(e) {
return "bee" == e;
},
playAngleAnimationNear: function(e, t) {
if (!this.attacking) {
var n, i, o, r, s, a = cc.v2(e.mypos.x, e.mypos.y), l = cc.v2(e.enemypos.x, e.enemypos.y), c = 1e3 + parseInt(32 - e.mypos.y), f = Math.ceil(125 * Math.random()) / 100, u = "", h = (e.actType, 
0), p = e.mypos.x, d = e.mypos.y, y = e.enemypos.x, m = e.enemypos.y, g = a.sub(l).mag();
this.ifFlyAgent(e.role) || (this.node.zIndex = c);
this.node.scaleX = 1;
if (this._animation) {
if (g <= (s = this.getAttackDistance(e))) {
a = cc.v2(p, d);
0 == (o = cc.v2(y, m).sub(a)).x && (o.x = .1);
0 == o.y && (o.y = .1);
0 != o.x && 0 != o.y && (h = 180 / Math.PI * Math.atan(Math.abs(o.x / o.y)));
(h = this.getAgentAngle(e.mypos, {
x: y,
y: m
}, h)) > 180 && (h -= 360);
u = (r = this.getActnameByAngle(h, "sa")).actName;
this.node.scaleX = r.scaleX;
} else {
if (t) {
n = t.enemypos.x;
i = t.enemypos.y;
} else {
n = e.enemypos.x;
i = e.enemypos.y;
}
a = cc.v2(p, d);
0 == (o = cc.v2(n, i).sub(a)).x && (o.x = .1);
0 == o.y && (o.y = .1);
0 != o.x && 0 != o.y && (h = 180 / Math.PI * Math.atan(Math.abs(o.x / o.y)));
(h = this.getAgentAngle(e.mypos, {
x: n,
y: i
}, h)) > 180 && (h -= 360);
u = (r = this.getActnameByAngle(h, "move")).actName;
this.node.scaleX = r.scaleX;
}
this.blood.scaleX = this.node.scaleX;
if (this.lastAct != u) {
g <= s ? this._animation.play(u) : this.attacking || this._animation.play(u, f);
this.lastAct = u;
this.lastScaleX = r.scaleX;
}
}
}
},
playAngleAnimationRemote: function(e, t) {
var n, i, o, r, s, a, l = 0, c = e.mypos.x, f = e.mypos.y, u = e.enemypos.x, h = e.enemypos.y, p = 1e3 + parseInt(32 - f), d = Math.ceil(125 * Math.random()) / 100, y = "";
if ("ia" != (o = e.actType) && "ea" != o) {
l = e.rot;
this.node.zIndex = p;
this.node.scaleX = 1;
if ("sa" == o) {
r = cc.v2(30 * c, 30 * f);
0 == (s = cc.v2(30 * u, 30 * h).sub(r)).x && (s.x = .1);
0 == s.y && (s.y = .1);
if (0 != s.x && 0 != s.y) {
l = 180 / Math.PI * Math.atan(Math.abs(s.x / s.y));
l = this.getAgentAngle(e.mypos, {
x: u,
y: h
}, l);
}
}
if ("move" == o) {
if (t) {
n = t.enemypos.x;
i = t.enemypos.y;
t && "ia" != t.actType && (o = t.actType);
} else {
n = e.enemypos.x;
i = e.enemypos.y;
t && "ia" != t.actType && (o = t.actType);
}
r = cc.v2(30 * c, 30 * f);
0 == (s = cc.v2(30 * n, 30 * i).sub(r)).x && (s.x = .1);
0 == s.y && (s.y = .1);
if (0 != s.x && 0 != s.y) {
l = 180 / Math.PI * Math.atan(Math.abs(s.x / s.y));
l = this.getAgentAngle(e.mypos, {
x: n,
y: i
}, l);
}
}
if (this._animation) {
y = (a = this.getActnameByAngle(l, o)).actName;
this.node.scaleX = a.scaleX;
this.blood.scaleX = this.node.scaleX;
if (this.lastAct != y || "sa" == o) {
if ("sa" == o) {
this._animation.stop();
this._animation.play(y);
} else this._animation.play(y, d);
this.lastAct = y;
this.lastScaleX = a.scaleX;
}
}
this.lastActType = o;
}
}
});
cc._RF.pop();
}, {
AgentObj: "AgentObj",
Common: "Common"
} ],
Order1Sprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "c42359qXZlHhp4BGz7DTZfc", "Order1Sprite");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.zIndex = 1;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Order2Sprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "756d3bGzU9JqLNy2riXSzoU", "Order2Sprite");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
console.log("sssssssssssss");
parseInt(104);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Order9Sprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "15fca01GsZO7rsB5Rucz1/r", "Order9Sprite");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.zIndex = 9;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Result: [ function(e, t) {
"use strict";
cc._RF.push(t, "ccd3eaVj6tLpIqIJfTIex3m", "Result");
cc.Class({
extends: cc.Component,
properties: {
win: 0,
flagNum: 2,
score: 0,
boxType: 1
},
start: function() {
this.node.zIndex = 9999;
},
show: function() {
this.node.active = !0;
this.setTitle();
this.setScore();
},
setResultValue: function(e, t) {
var n = this.getPersistantNode(), i = n.getData().basescore;
if (1 == e) {
if (1 == t.win) {
console.log("my win");
this.win = 1;
this.flagNum = t.upk;
} else if (0 == t.win) {
console.log("my lose");
this.win = 0;
this.flagNum = t.upk;
} else if (2 == t.win) {
console.log("even");
this.win = 2;
this.flagNum = t.upk;
}
} else if (2 == e) if (1 == t.win) {
console.log("my lose");
this.win = 0;
this.flagNum = t.dnk;
} else if (0 == t.win) {
console.log("my win");
this.win = 1;
this.flagNum = t.dnk;
} else if (2 == t.win) {
console.log("even");
this.win = 2;
this.flagNum = t.dnk;
}
if (1 == this.win || 2 == this.win) {
this.score = this.flagNum * i;
n.winScore(this.score);
} else n.setUpgrade(!1);
},
getPersistantNode: function() {
return cc.find("GameData").getComponent("GameData");
},
setTitle: function() {
var e = this.node.getChildByName("winnerTxt").getComponent("cc.Label");
1 == this.win ? e.string = "胜利！" : 0 == this.win ? e.string = "失败！" : 2 == this.win && (e.string = "平局！");
},
setFlag: function() {
for (var e, t, n = 1; n <= 3; n++) {
e = "flag" + n;
(t = this.node.getChildByName("killed").getChildByName(e)).active = !1;
n <= this.flagNum && (t.active = !0);
}
},
setScore: function() {
this.node.getChildByName("goldStar").getChildByName("goldTxt").getComponent("cc.Label").string = "+" + this.score;
},
setBox: function() {
var e = this.node.getChildByName("boxFrame").getChildByName("boxInfo").getComponent("cc.Label");
1 == this.boxType ? e.string = "普通宝箱" : 2 == this.boxType ? e.string = "高级宝箱" : 3 == this.boxType && (e.string = "超级宝箱");
},
test: function() {
console.log("clicked...");
this.node.active = !1;
cc.director.loadScene("menu");
}
});
cc._RF.pop();
}, {} ],
SelCard: [ function(e, t) {
"use strict";
cc._RF.push(t, "a9c88Il+79JlLW7EwlscaCD", "SelCard");
cc.Class({
extends: cc.Component,
properties: {
seleRole: "ske",
magicCost: 1,
roleLevel: 1
},
onLoad: function() {
this.ox = this.node.x;
this.oy = this.node.y;
},
start: function() {
this.isMoving = !1;
this.dragTo = null;
this.seleInnerId = "";
var e = this.getLayoutNode(), t = this;
if (e) {
var n = e.getComponent("Game"), i = this.node.parent.getChildByName("charSele");
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
if (0 != n.gameStartTime) {
t.node.getChildByName("dragTo").active = !0;
n.showDragMask(t.seleRole);
t.seleInnerId = n.setDragItem(e, t.node.getChildByName("dragTo"));
}
});
this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
var i = e.touch.getDelta();
t.isMove = !0;
n.moveDragItem(e.target._name, i);
});
this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
var o = t.node.getPosition(), r = {
role: t.seleRole,
level: t.roleLevel,
magicCost: t.magicCost,
params: e,
node: t.node.getChildByName("dragTo")
};
if ("" != t.seleInnerId) {
n.unsetDragItem(t.seleInnerId);
t.seleInnerId = "";
}
t.isMove = !1;
i.active = !0;
i.setPosition(o);
n.setClickItem(r);
});
this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
var i = {
role: t.seleRole,
level: t.roleLevel,
magicCost: t.magicCost
};
n.clearDragItem(e, i);
});
} else this.node.on(cc.Node.EventType.TOUCH_END, function() {
t.processChoose();
});
this.setInitImgByRole();
this.setRoleCost();
},
processChoose: function() {
var e = this.node.parent.parent.getComponent("SelLayout"), t = e.choosenCard;
if (!CC_WECHATGAME || e.ifWxValidRelay()) {
if (t && t.role) {
var n;
this.setRole(t.role, t.cost, t.level);
this.setInitImgByRole();
this.setRoleCost();
n = this.getNowAgents();
e.setCardsStatus(n);
}
} else e.dispWxRelayWarn(!0);
},
getNowAgents: function() {
for (var e = this.node.parent._children, t = [], n = 0; n < e.length; n++) "SelCard" == e[n]._name && t.push(e[n].getComponent("SelCard").seleRole);
return t;
},
setRole: function(e, t, n) {
this.seleRole = e;
this.magicCost = t;
this.roleLevel = n;
},
getLayoutNode: function() {
return this.node.parent.getChildByName("layout");
},
stopCardJitter: function() {
this.node.stopAllActions();
this.node.x = this.ox;
this.node.y = this.oy;
},
startCardJitter: function() {
this.node.stopAllActions();
var e = this, t = this.node, n = 0, i = this.node, o = cc.delayTime(1 / 30), r = cc.callFunc(function() {
n++;
var i = Math.floor(4 * Math.random()) + -2, o = Math.floor(4 * Math.random()) + -2;
t.x += i;
t.y += o;
if (n % 3 == 0) {
t.x = e.ox;
t.y = e.oy;
}
}), s = cc.sequence(o, r);
i.runAction(cc.repeatForever(s));
},
setRoleCost: function() {
0 != this.magicCost && (this.node.getChildByName("ringMark").getChildByName("cost").getComponent("cc.Label").string = this.magicCost);
},
setSelImg: function(e) {
var t = this.node.getChildByName("dragTo"), n = this.node.getChildByName("icon");
cc.loader.loadRes(e, cc.SpriteFrame, function(e, i) {
t.width = 100;
t.height = 120;
t.active = !1;
t.getComponent(cc.Sprite).spriteFrame = i;
n.width = 100;
n.height = 120;
n.active = !0;
n.getComponent(cc.Sprite).spriteFrame = i;
});
},
setInitImgByRole: function() {
"ske" == this.seleRole ? this.setSelImg("sel_cards/ske") : "lr" == this.seleRole ? this.setSelImg("sel_cards/lieren") : "gi" == this.seleRole ? this.setSelImg("sel_cards/rockman") : "log" == this.seleRole ? this.setSelImg("sel_cards/log") : "bomb" == this.seleRole ? this.setSelImg("sel_cards/bomb") : "bee" == this.seleRole ? this.setSelImg("sel_cards/bee") : "wiz" == this.seleRole ? this.setSelImg("sel_cards/wiz") : "hr" == this.seleRole ? this.setSelImg("sel_cards/hero") : "lm" == this.seleRole ? this.setSelImg("sel_cards/lightman") : "fa" == this.seleRole ? this.setSelImg("sel_cards/fortA") : "ir" == this.seleRole ? this.setSelImg("sel_cards/ironman") : "thunder" == this.seleRole ? this.setSelImg("sel_cards/thunder") : "heal" == this.seleRole && this.setSelImg("sel_cards/heal");
}
});
cc._RF.pop();
}, {} ],
SelLayout: [ function(e, t) {
"use strict";
cc._RF.push(t, "82e7bMCmi1Ex52PP3o8kNpv", "SelLayout");
String.prototype.inArray = function(e) {
e || console.log("ERR(in_array):Input is not an array");
for (var t = 0, n = e.length; t < n; t++) if (this == e[t]) return !0;
return !1;
};
cc.Class({
extends: cc.Component,
properties: {
playerPrefab: {
default: [],
type: cc.Prefab
},
startBut1: cc.Button,
startBut2: cc.Button,
startBut3: cc.Button
},
onLoad: function() {
var e = this;
this.startBut1.getComponent(cc.Button).interactable = !1;
this.startBut2.getComponent(cc.Button).interactable = !1;
this.startBut3.getComponent(cc.Button).interactable = !1;
this.allCardNodes = [];
this.myCardNodes = [];
this.agentsDef = this.getPersistantData();
this.node.on(cc.Node.EventType.TOUCH_END, function() {
e.unselect();
});
var t, n = cc.find("GameData").getComponent("GameData");
this.username = n.getName();
this.baseRoles = [ "bee", "ske", "ir", "lr", "log", "lm", "hr" ];
this.wxRelayTime;
n.httpPost(this.username, "").then(function(i) {
console.log("------------GameData------------------");
console.log(i);
t = JSON.parse(i);
e.agentsDef = t;
n.setData(t);
e.setMyCards();
e.setAllCards();
e.setScore();
e.setUser();
setTimeout(function() {
e.startBut1.getComponent(cc.Button).interactable = !0;
e.startBut2.getComponent(cc.Button).interactable = !0;
e.startBut3.getComponent(cc.Button).interactable = !0;
}, 2e3);
}, function() {
e.setMyCards();
e.setAllCards();
e.setScore();
e.setUser();
e.startBut1.getComponent(cc.Button).interactable = !0;
e.startBut2.getComponent(cc.Button).interactable = !0;
e.startBut3.getComponent(cc.Button).interactable = !0;
});
},
start: function() {
var e = cc.find("GameData").getComponent("GameData");
console.log("upgraded:" + e.isUpgrade);
},
getRandomCharName: function() {
for (var e = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], t = "", n = 0; n < 6; n++) t += e[Math.floor(Math.random() * e.length)];
return t;
},
setScore: function() {
var e = this.agentsDef.myscore, t = this.agentsDef.nextscore, n = this.node.getChildByName("clanWall"), i = n.getChildByName("wordbg").getChildByName("myScore").getComponent("cc.Label"), o = n.getChildByName("wordbg").getChildByName("nextScore").getComponent("cc.Label");
i.string = e;
o.string = "/" + t;
},
setUser: function() {
var e = this.node.getChildByName("wobanner"), t = e.getChildByName("username").getComponent("cc.Label"), n = e.getChildByName("userlevel").getComponent("cc.Label");
t.string = this.agentsDef.name;
n.string = this.agentsDef.level;
},
setMyCards: function() {
for (var e, t, n, i, o, r, s = this.agentsDef.myList, a = this.node.getChildByName("clanWall"), l = 0; l < 6; l++) {
n = (t = cc.instantiate(this.playerPrefab[1])).getComponent("SelCard");
if (s[l]) {
i = this.agentsDef[s[l]].cost;
o = this.agentsDef.level;
n.setRole(s[l], i, o);
}
this.myCardNodes.push(n);
e = l % 6 * 124 - 295;
r = cc.v2(e, 24);
t.setPosition(r);
a.addChild(t);
}
},
setRelayUI: function(e) {
if (CC_WECHATGAME && !e.inArray(this.baseRoles)) {
wx.shareAppMessage({
title: "中古战纪",
imageUrl: "https://www.asobee.mobi/fftower/res/acLogo2.jpg"
});
this.wxRelayTime = new Date().getTime();
}
},
ifWxValidRelay: function() {
return !(new Date().getTime() - this.wxRelayTime < 3e3);
},
seleOneCard: function(e) {
for (var t, n = 0; n < this.allCardNodes.length; n++) if ((t = this.allCardNodes[n]).seleRole !== e) {
this.choosenCard = this.agentsDef[e];
this.choosenCard.role = e;
t.grey(!0);
}
this.shakeMyCards(!0);
this.setRelayUI(e);
this.dispWxRelayWarn(!1);
},
dispWxRelayWarn: function(e) {
this.node.getChildByName("wxRelayWarn").active = e;
},
getNowAgents: function() {
for (var e, t, n, i = this.node.getChildByName("clanWall")._children, o = [], r = [], s = {}, a = 0; a < i.length; a++) if ("SelCard" == i[a]._name) {
e = i[a].getComponent("SelCard").seleRole;
t = i[a].getComponent("SelCard").magicCost;
n = i[a].getComponent("SelCard").roleLevel;
if (t > 0) {
s = {
seleRole: e,
magicCost: t,
roleLevel: n
};
r.push(e);
o.push(s);
}
}
cc.find("GameData").getComponent("GameData").setMyList(r);
return o;
},
getPersistantData: function() {
return cc.find("GameData").getComponent("GameData").getData();
},
setCardsStatus: function(e) {
for (var t, n = 0, i = 0, o = 0, r = this.node.getChildByName("clanWall"), s = r.getChildByName("wordboardbg").getChildByName("averageCos").getComponent("cc.Label"), a = r.getChildByName("wordbg").getChildByName("cardBut").getChildByName("myCardNum").getComponent("cc.Label"), l = r.getChildByName("wordbg").getChildByName("cardBut").getChildByName("allCardNum").getComponent("cc.Label"), c = 0; c < this.allCardNodes.length; c++) (t = this.allCardNodes[c]).setCardStatus(t.seleRole.inArray(e));
for (c = 0; c < this.myCardNodes.length; c++) if (0 != this.myCardNodes[c].magicCost) {
n++;
i += this.myCardNodes[c].magicCost;
}
o = i / n;
s.string = o.toFixed(2);
a.string = n;
l.string = "/" + this.allCardNodes.length;
},
shakeMyCards: function(e) {
for (var t, n = 0; n < this.myCardNodes.length; n++) {
t = this.myCardNodes[n];
e ? t.startCardJitter() : t.stopCardJitter();
}
},
unselect: function() {
this.choosenCard = {};
for (var e = 0; e < this.allCardNodes.length; e++) this.allCardNodes[e].grey(!1);
this.shakeMyCards(!1);
},
setAllCards: function() {
for (var e, t, n, i, o, r, s, a, l = this.agentsDef.allList, c = 0; c < l.length; c++) {
o = this.agentsDef[l[c]].cost;
r = this.agentsDef[l[c]].disp;
t = -400 - 200 * Math.floor(c / 4);
e = c % 4 * 170 - 200;
(i = (n = cc.instantiate(this.playerPrefab[0])).getComponent("AllCard")).setRole(l[c], o, r);
if (CC_WECHATGAME && !l[c].inArray(this.baseRoles)) {
(s = cc.instantiate(this.playerPrefab[3])).setPosition(cc.v2(38, 68));
s.scaleX = .6;
s.scaleY = .6;
n.addChild(s);
}
a = cc.v2(e, t);
n.setPosition(a);
this.allCardNodes.push(i);
this.node.addChild(n);
}
this.setCardsStatus(this.agentsDef.myList);
}
});
cc._RF.pop();
}, {} ],
SkeSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "7d74bHhVUFHDLwoV20mklSC", "SkeSprite");
var n = e("MySprite");
cc.Class({
extends: n,
properties: {
role: ""
},
start: function() {},
shootArrow: function() {},
getAttackDistance: function(e) {
return .6 * (e.size + e.esize);
},
playAni: function(e, t, n) {
this.playAngleAnimationNear(e, t, n);
},
remove: function() {
this._animation.play("dieoff2");
this.shadow.destroy();
this.blood.destroy();
},
dieStart: function() {},
dieEnd: function() {
this._animation.play("footprint");
},
footStart: function() {
this.node.zIndex = -1;
this.node.scaleX = 1;
this.node.scaleY = 1;
},
footEnd: function() {
this.node.destroy();
},
beforeKill: function() {},
afterKill: function() {
this.node.destroy();
},
aFrame1Evt: function() {
this.layoutOp.playSnd("ske");
},
frame1Evt: function() {
this.dispShadow(1);
},
frame2Evt: function() {
this.dispShadow(2);
},
frame3Evt: function() {
this.dispShadow(3);
},
frame4Evt: function() {
this.dispShadow(4);
},
frame5Evt: function() {
this.dispShadow(5);
},
frame6Evt: function() {
this.dispShadow(6);
},
frame7Evt: function() {
this.dispShadow(7);
}
});
cc._RF.pop();
}, {
MySprite: "MySprite"
} ],
SocketProvider: [ function(e, t) {
"use strict";
cc._RF.push(t, "04045eoOP5HZaxEvt4Slsa0", "SocketProvider");
var n = e("acdata1").AcWar;
cc.Class({
extends: cc.Component,
properties: {},
getRandomCharName: function() {
for (var e = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], t = "", n = 0; n < 6; n++) t += e[Math.floor(Math.random() * e.length)];
return t;
},
setGameStart: function(e) {
this.roomId = e;
console.log("my room:" + this.roomId);
this.node.getChildByName("putWait").active = !1;
this.node.getChildByName("word3").active = !0;
},
setGameStartTime: function() {
this.gameStartTime = Date.now();
},
socketHandle: function(e) {
var t = this;
this.gameTraceStack = [];
MY_SOCKET = window.io.connect("wss://www.asobee.mobi:443");
MY_SOCKET.on("connect_error", function() {
console.log("Connection Failed");
if (!t.netErrDisp) {
t.syncTimeout();
t.setConnFailInfo();
t.node.getChildByName("putWait").active = !0;
}
});
MY_SOCKET.on("connected", function() {
MY_SOCKET.heartbeatTimeout = 5e3;
MY_SOCKET.json.emit("init", {
name: e,
nick: e,
img: "",
roomId: ""
});
});
MY_SOCKET.on("disconnect", function() {
console.log("disconnect to server");
t.syncTimeout();
t.setConnFailInfo();
t.node.getChildByName("putWait").active = !0;
});
MY_SOCKET.on("otherlogin", function(e) {
-1 == t.mainPlayer && (t.mainPlayer = e.userData.length);
2 == e.userData.length && t.setGameStart(e.roomId);
});
MY_SOCKET.on("heart", function(e) {
var n = parseInt(e.counter);
t.setTimeCounter(n);
});
MY_SOCKET.on("buff", function(e) {
console.log("----buff data----");
console.log(e);
var n = e;
2 == t.mainPlayer && (n = t.mirrorBuffData(e));
t.createBuff(n);
});
MY_SOCKET.on("end", function(e) {
console.log(e);
console.log(t.mainPlayer);
t.gameOverProcessor(t.mainPlayer, e);
t.resultOp.setResultValue(t.mainPlayer, e);
t.resultOp.show();
});
MY_SOCKET.on("proto", function(e) {
for (var i = new Uint8Array(e), o = n.Info.decode(i), r = (o.base, 0); r < o.base.length; r++) {
o.base[r].mypos = {};
o.base[r].enemypos = {};
o.base[r].targetpos = {};
o.base[r].mypos.x = o.base[r].mpx;
o.base[r].mypos.y = o.base[r].mpy;
o.base[r].enemypos.x = o.base[r].epx;
o.base[r].enemypos.y = o.base[r].epy;
o.base[r].targetpos.x = o.base[r].tpx;
o.base[r].targetpos.y = o.base[r].tpy;
}
for (r = 0; r < o.fort.length; r++) {
o.fort[r].mypos = {};
o.fort[r].enemypos = {};
o.fort[r].targetpos = {};
o.fort[r].mypos.x = o.fort[r].mpx;
o.fort[r].mypos.y = o.fort[r].mpy;
o.fort[r].enemypos.x = o.fort[r].epx;
o.fort[r].enemypos.y = o.fort[r].epy;
o.fort[r].targetpos.x = o.fort[r].tpx;
o.fort[r].targetpos.y = o.fort[r].tpy;
}
for (r = 0; r < o.agent.length; r++) {
o.agent[r].mypos = {};
o.agent[r].enemypos = {};
o.agent[r].targetpos = {};
o.agent[r].mypos.x = o.agent[r].mpx;
o.agent[r].mypos.y = o.agent[r].mpy;
o.agent[r].enemypos.x = o.agent[r].epx;
o.agent[r].enemypos.y = o.agent[r].epy;
o.agent[r].targetpos.x = o.agent[r].tpx;
o.agent[r].targetpos.y = o.agent[r].tpy;
}
for (r = 0; r < o.bullet.length; r++) {
o.bullet[r].mypos = {};
o.bullet[r].enemypos = {};
o.bullet[r].targetpos = {};
o.bullet[r].mypos.x = o.bullet[r].mpx;
o.bullet[r].mypos.y = o.bullet[r].mpy;
o.bullet[r].enemypos.x = o.bullet[r].epx;
o.bullet[r].enemypos.y = o.bullet[r].epy;
o.bullet[r].targetpos.x = o.bullet[r].tpx;
o.bullet[r].targetpos.y = o.bullet[r].tpy;
}
for (r = 0; r < o.rollLog.length; r++) {
o.rollLog[r].mypos = {};
o.rollLog[r].enemypos = {};
o.rollLog[r].targetpos = {};
o.rollLog[r].mypos.x = o.rollLog[r].mpx;
o.rollLog[r].mypos.y = o.rollLog[r].mpy;
o.rollLog[r].enemypos.x = o.rollLog[r].epx;
o.rollLog[r].enemypos.y = o.rollLog[r].epy;
o.rollLog[r].targetpos.x = o.rollLog[r].tpx;
o.rollLog[r].targetpos.y = o.rollLog[r].tpy;
}
var s = {}, a = o.agent, l = o.base, c = o.fort, f = o.bullet, u = o.rollLog;
if (2 == t.mainPlayer) {
a = t.mirrorAgentsData(a);
f = t.mirrorAgentsData(f);
l = t.mirrorBasesData(l);
c = t.mirrorAgentsData(c);
u = t.mirrorAgentsData(u);
}
s.agents = a;
s.bullets = f;
s.bases = l;
s.forts = c;
s.rollLogs = u;
t.gameTraceStack.push(s);
if (t.gameTraceStack.length > t.bufferLen) {
e = t.gameTraceStack[0];
t.createAgents(e.agents);
t.createBullets(e.bullets);
t.createBases(e.bases);
t.createForts(e.forts);
t.createLogs(e.rollLogs);
}
});
MY_SOCKET.on("agent", function(e) {
var n = {}, i = e.agents, o = e.bases, r = e.forts, s = e.bullets, a = e.rollLogs;
if (2 == t.mainPlayer) {
i = t.mirrorAgentsData(i);
s = t.mirrorAgentsData(s);
o = t.mirrorBasesData(o);
r = t.mirrorAgentsData(r);
a = t.mirrorAgentsData(a);
}
n.agents = i;
n.bullets = s;
n.bases = o;
n.forts = r;
n.rollLogs = a;
t.gameTraceStack.push(n);
if (t.gameTraceStack.length > t.bufferLen) {
e = t.gameTraceStack[0];
t.createAgents(e.agents);
t.createBullets(e.bullets);
t.createBases(e.bases);
t.createForts(e.forts);
t.createLogs(e.rollLogs);
}
});
this.startTraceTimer();
},
mirrorAgentsData: function(e) {
for (var t = this.node.width / 30, n = this.node.height / 30, i = e.length - 1; i >= 0; i--) {
e[i].mypos.x = t - e[i].mypos.x;
e[i].mypos.y = n - e[i].mypos.y;
if (e[i].enemypos) {
e[i].enemypos.x = t - e[i].enemypos.x;
e[i].enemypos.y = n - e[i].enemypos.y;
}
if (e[i].targetpos) {
e[i].targetpos.x = t - e[i].targetpos.x;
e[i].targetpos.y = n - e[i].targetpos.y;
}
}
return e;
},
mirrorBuffData: function(e) {
var t = this.node.width / 30, n = this.node.height / 30;
e.mypos.x = t - e.mypos.x;
e.mypos.y = n - e.mypos.y;
return e;
},
mirrorBasesData: function(e) {
for (var t = this.node.width / 30, n = this.node.height / 30, i = e.length - 1; i >= 0; i--) {
1 == e[i].objectId ? e[i].objectId = 4 : 2 == e[i].objectId ? e[i].objectId = 6 : 3 == e[i].objectId ? e[i].objectId = 5 : 4 == e[i].objectId ? e[i].objectId = 1 : 6 == e[i].objectId ? e[i].objectId = 2 : 5 == e[i].objectId && (e[i].objectId = 3);
e[i].mypos.x = t - e[i].mypos.x - 1;
e[i].mypos.y = n - e[i].mypos.y;
if (e[i].enemypos) {
e[i].enemypos.x = t - e[i].enemypos.x - 1;
e[i].enemypos.y = n - e[i].enemypos.y;
}
if (e[i].targetpos) {
e[i].targetpos.x = t - e[i].targetpos.x - 1;
e[i].targetpos.y = n - e[i].targetpos.y;
}
}
return e;
},
disconnectServer: function() {
MY_SOCKET.disconnect();
}
});
cc._RF.pop();
}, {
acdata1: "acdata1"
} ],
SpriteIndex: [ function(e, t) {
"use strict";
cc._RF.push(t, "f6dd5p1dgBF87MB1jc9G2P1", "SpriteIndex");
cc.Class({
extends: cc.Component,
editor: !1,
properties: {
spriteFrames: [ cc.SpriteFrame ],
_index: 0,
index: {
type: cc.Integer,
get: function() {
return this._index;
},
set: function(e) {
if (!(e < 0)) {
this._index = e % this.spriteFrames.length;
this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[this._index];
}
}
}
},
next: function() {
this.index++;
}
});
cc._RF.pop();
}, {} ],
Welcome: [ function(e, t) {
"use strict";
cc._RF.push(t, "2a91cx8Yg9CyIhlOix85UiP", "Welcome");
cc.Class({
extends: cc.Component,
properties: {
loading: cc.ProgressBar,
loadLabel: cc.Label,
startBut: cc.Button
},
onLoad: function() {
var e = this;
this.startBut.getComponent(cc.Button).interactable = !1;
cc.loader.downloader.loadSubpackage("resources", function(t) {
if (t) {
console.log(t);
e.goH5Load();
} else cc.loader.loadResDir("resources", function() {
console.log("you can go now!!!!!!!!!");
cc.director.preloadScene("menu", e.onProgress.bind(e), function() {
cc.director.preloadScene("game", e.onProgress.bind(e), function() {
e.wxlogin();
});
});
});
});
},
wxlogin: function() {
var e = cc.find("GameData").getComponent("GameData"), t = this, n = {}, i = window.wx.getSystemInfoSync(), o = i.screenWidth, r = i.screenHeight;
window.wx.getSetting({
success: function(i) {
console.log(i.authSetting);
if (i.authSetting["scope.userInfo"]) {
console.log("用户已授权");
window.wx.getUserInfo({
success: function(i) {
console.log(i);
n.userInfo = i.userInfo;
e.setWxUser(i.userInfo);
t.play();
}
});
} else {
console.log("用户未授权");
t.startBut.getComponent(cc.Button).interactable = !0;
var s = window.wx.createUserInfoButton({
type: "text",
text: "",
style: {
left: 0,
top: 0,
width: o,
height: r,
backgroundColor: "#00000000",
color: "#ffffff",
fontSize: 20,
textAlign: "center",
lineHeight: r
}
});
s.onTap(function(i) {
if (i.userInfo) {
console.log("用户授权:", i);
n.userInfo = i.userInfo;
e.setWxUser(i.userInfo);
t.play();
s.destroy();
} else console.log("用户拒绝授权:", i);
});
}
}
});
},
goH5Load: function() {
var e = this;
cc.director.preloadScene("menu", this.onProgress.bind(this), function() {
cc.director.preloadScene("game", e.onProgress.bind(e), function() {
e.startBut.getComponent(cc.Button).interactable = !0;
});
});
},
start: function() {},
loadProtobuf: function() {
protobuf.load("acdata.proto", function(e, t) {
if (e) throw e;
var n = t.lookupType("AcWar.AcwarMessage");
console.log(n);
});
},
testProtobuf: function() {
if (cc.sys.isNative) {
cc.log("jsb.fileUtils=" + jsb.fileUtils);
jsb.fileUtils.addSearchPath("res/raw-assets/resources", !0);
}
protobuf.load("acdata.proto", function(e) {
if (e) {
console.log("load proto err:" + e);
throw e;
}
cc.log("加载protobuf完毕，开始测试protobuf...");
});
},
play: function() {
cc.director.loadScene("menu");
},
onProgress: function(e, t) {
this.loading.progress = e / t;
this.loadLabel.string = Math.floor(e / t * 100) + "%";
}
});
cc._RF.pop();
}, {} ],
WizSprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "65407smWQ1HBIUtleJMXxyA", "WizSprite");
var n = e("MySprite"), i = e("Common");
cc.Class({
extends: n,
properties: {
role: "wiz"
},
start: function() {
this._animation = this.getComponent(cc.Animation);
this._animation.WrapMode = cc.WrapMode.Loop;
},
remove: function() {
this._animation.play("dieoff2");
this.shadow.destroy();
this.blood.destroy();
},
dieStart: function() {
console.log("die start");
},
dieEnd: function() {
console.log("die end");
this._animation.play("footprint");
},
footStart: function() {
console.log("foot start");
},
footEnd: function() {
console.log("foot end");
this.node.destroy();
},
footPrint: function() {
this.node.zIndex = -1;
this.node.scaleX = 1;
this.node.scaleY = 1;
},
beforeKill: function() {},
afterKill: function() {
console.log("--remove archer node--");
this.node.destroy();
},
frame1Evt: function() {
this.dispShadow(1);
},
frame2Evt: function() {
this.dispShadow(2);
},
frame3Evt: function() {
this.dispShadow(3);
},
frame4Evt: function() {
this.dispShadow(4);
},
frame5Evt: function() {
this.dispShadow(5);
},
frame6Evt: function() {
this.dispShadow(6);
},
frame7Evt: function() {
this.dispShadow(7);
},
aFrame1Evt: function() {
this.dispShadow(1);
},
aFrame2Evt: function() {
this.dispShadow(3);
},
aFrame3Evt: function() {
this.dispShadow(5);
},
aFrame4Evt: function() {},
aFrame5Evt: function() {
this.dispShadow(7);
},
playAni: function(e, t, n) {
this.playAngleAnimationRemote(e, t, n);
},
isEnemyBase: function(e) {
return 1 == e || 2 == e || 3 == e;
},
isEnemyFort: function(e, t) {
return !(!e || 2 != t) || !e && 1 == t;
},
playBaseWarriorAnimationDefault: function(e, t) {
var n;
n = this.isEnemyBase(t) ? "lr_s_walk" : "lr_n_walk";
if ("move" != e || this.lastAct != n) {
var i = Math.ceil(125 * Math.random()) / 100;
this._animation.play(n, i);
this.lastAct = n;
}
},
playFortWarriorAnimationDefault: function(e, t, n) {
var i;
i = this.isEnemyFort(t, n) ? "lr_s_walk" : "lr_n_walk";
if ("move" != e || this.lastAct != i) {
var o = Math.ceil(125 * Math.random()) / 100;
this._animation.play(i, o);
this.lastAct = i;
}
},
playBaseWarriorAnimation: function(e, t, n) {
var o, r, s, a, l, c, f, u = i.attackTargetYOffset, h = e.mypos.x, p = e.mypos.y, d = Math.ceil(125 * Math.random()) / 100, y = "", m = 1;
1 == t ? m = 1 : 2 == t && (m = -1);
o = e.enemypos.x;
r = e.enemypos.y;
a = cc.v2(30 * h, 30 * p);
l = cc.v2(30 * o, 30 * r + u * m);
if (0 != (c = a.sub(l)).x || 0 != c.y) {
0 == c.x && (c.x = .1);
0 == c.y && (c.y = .1);
if (0 != c.x && 0 != c.y) {
var g = 180 / Math.PI * Math.atan(c.x / c.y);
s = g;
c.y >= 0 && (s = g + 180);
}
if (this._animation) {
y = (f = this.getActnameByAngle(s, n)).actName;
this.node.scaleX = f.scaleX;
if (this.lastAct != y || "sa" == n) {
if ("sa" == n) {
this._animation.stop();
this._animation.play(y);
} else this._animation.play(y, d);
this.angle = s;
this.lastAct = y;
this.lastScaleX = f.scaleX;
}
}
}
}
});
cc._RF.pop();
}, {
Common: "Common",
MySprite: "MySprite"
} ],
Word3Sprite: [ function(e, t) {
"use strict";
cc._RF.push(t, "3de4fjEQ25MUY1HJMfSTEZQ", "Word3Sprite");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.node.active = !0;
},
endCounter: function() {
this.node.active = !1;
this.getLayoutOp().setGameStartTime();
},
getLayoutOp: function() {
return this.node.parent.getComponent("Game");
}
});
cc._RF.pop();
}, {} ],
acdata1: [ function(e, t) {
"use strict";
cc._RF.push(t, "059c9En5zlCdYDuYpxXoxZF", "acdata1");
function n(e) {
return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
var i = e("./protobuf.js"), o = i.Reader, r = i.Writer, s = i.util, a = i.roots.default || (i.roots.default = {});
a.AcWar = function() {
var e = {};
e.Agent = function() {
function e(e) {
if (e) for (var t = Object.keys(e), n = 0; n < t.length; ++n) null != e[t[n]] && (this[t[n]] = e[t[n]]);
}
e.prototype.agentType = "";
e.prototype.mpx = 0;
e.prototype.mpy = 0;
e.prototype.life = 0;
e.prototype.groupKill = !1;
e.prototype.isHero = !1;
e.prototype.rot = 0;
e.prototype.attackDura = 0;
e.prototype.aid = "";
e.prototype.innerId = "";
e.prototype.role = "";
e.prototype.objectId = 0;
e.prototype.actType = "";
e.prototype.size = 0;
e.prototype.level = 0;
e.prototype.epx = 0;
e.prototype.epy = 0;
e.prototype.eid = "";
e.prototype.esize = 0;
e.prototype.tpx = 0;
e.prototype.tpy = 0;
e.prototype.updown = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = r.create());
t.uint32(10).string(e.agentType);
t.uint32(21).float(e.mpx);
t.uint32(29).float(e.mpy);
t.uint32(32).int32(e.life);
t.uint32(40).bool(e.groupKill);
t.uint32(48).bool(e.isHero);
t.uint32(61).float(e.rot);
t.uint32(69).float(e.attackDura);
t.uint32(74).string(e.aid);
t.uint32(82).string(e.innerId);
t.uint32(90).string(e.role);
t.uint32(96).int32(e.objectId);
t.uint32(106).string(e.actType);
t.uint32(117).float(e.size);
t.uint32(120).int32(e.level);
null != e.epx && Object.hasOwnProperty.call(e, "epx") && t.uint32(133).float(e.epx);
null != e.epy && Object.hasOwnProperty.call(e, "epy") && t.uint32(141).float(e.epy);
null != e.eid && Object.hasOwnProperty.call(e, "eid") && t.uint32(146).string(e.eid);
null != e.esize && Object.hasOwnProperty.call(e, "esize") && t.uint32(157).float(e.esize);
null != e.tpx && Object.hasOwnProperty.call(e, "tpx") && t.uint32(165).float(e.tpx);
null != e.tpy && Object.hasOwnProperty.call(e, "tpy") && t.uint32(173).float(e.tpy);
null != e.updown && Object.hasOwnProperty.call(e, "updown") && t.uint32(178).string(e.updown);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof o || (e = o.create(e));
for (var n = void 0 === t ? e.len : e.pos + t, i = new a.AcWar.Agent(); e.pos < n; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
i.agentType = e.string();
break;

case 2:
i.mpx = e.float();
break;

case 3:
i.mpy = e.float();
break;

case 4:
i.life = e.int32();
break;

case 5:
i.groupKill = e.bool();
break;

case 6:
i.isHero = e.bool();
break;

case 7:
i.rot = e.float();
break;

case 8:
i.attackDura = e.float();
break;

case 9:
i.aid = e.string();
break;

case 10:
i.innerId = e.string();
break;

case 11:
i.role = e.string();
break;

case 12:
i.objectId = e.int32();
break;

case 13:
i.actType = e.string();
break;

case 14:
i.size = e.float();
break;

case 15:
i.level = e.int32();
break;

case 16:
i.epx = e.float();
break;

case 17:
i.epy = e.float();
break;

case 18:
i.eid = e.string();
break;

case 19:
i.esize = e.float();
break;

case 20:
i.tpx = e.float();
break;

case 21:
i.tpy = e.float();
break;

case 22:
i.updown = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!i.hasOwnProperty("agentType")) throw s.ProtocolError("missing required 'agentType'", {
instance: i
});
if (!i.hasOwnProperty("mpx")) throw s.ProtocolError("missing required 'mpx'", {
instance: i
});
if (!i.hasOwnProperty("mpy")) throw s.ProtocolError("missing required 'mpy'", {
instance: i
});
if (!i.hasOwnProperty("life")) throw s.ProtocolError("missing required 'life'", {
instance: i
});
if (!i.hasOwnProperty("groupKill")) throw s.ProtocolError("missing required 'groupKill'", {
instance: i
});
if (!i.hasOwnProperty("isHero")) throw s.ProtocolError("missing required 'isHero'", {
instance: i
});
if (!i.hasOwnProperty("rot")) throw s.ProtocolError("missing required 'rot'", {
instance: i
});
if (!i.hasOwnProperty("attackDura")) throw s.ProtocolError("missing required 'attackDura'", {
instance: i
});
if (!i.hasOwnProperty("aid")) throw s.ProtocolError("missing required 'aid'", {
instance: i
});
if (!i.hasOwnProperty("innerId")) throw s.ProtocolError("missing required 'innerId'", {
instance: i
});
if (!i.hasOwnProperty("role")) throw s.ProtocolError("missing required 'role'", {
instance: i
});
if (!i.hasOwnProperty("objectId")) throw s.ProtocolError("missing required 'objectId'", {
instance: i
});
if (!i.hasOwnProperty("actType")) throw s.ProtocolError("missing required 'actType'", {
instance: i
});
if (!i.hasOwnProperty("size")) throw s.ProtocolError("missing required 'size'", {
instance: i
});
if (!i.hasOwnProperty("level")) throw s.ProtocolError("missing required 'level'", {
instance: i
});
return i;
};
e.decodeDelimited = function(e) {
e instanceof o || (e = new o(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== n(e) || null === e ? "object expected" : s.isString(e.agentType) ? "number" != typeof e.mpx ? "mpx: number expected" : "number" != typeof e.mpy ? "mpy: number expected" : s.isInteger(e.life) ? "boolean" != typeof e.groupKill ? "groupKill: boolean expected" : "boolean" != typeof e.isHero ? "isHero: boolean expected" : "number" != typeof e.rot ? "rot: number expected" : "number" != typeof e.attackDura ? "attackDura: number expected" : s.isString(e.aid) ? s.isString(e.innerId) ? s.isString(e.role) ? s.isInteger(e.objectId) ? s.isString(e.actType) ? "number" != typeof e.size ? "size: number expected" : s.isInteger(e.level) ? null != e.epx && e.hasOwnProperty("epx") && "number" != typeof e.epx ? "epx: number expected" : null != e.epy && e.hasOwnProperty("epy") && "number" != typeof e.epy ? "epy: number expected" : null != e.eid && e.hasOwnProperty("eid") && !s.isString(e.eid) ? "eid: string expected" : null != e.esize && e.hasOwnProperty("esize") && "number" != typeof e.esize ? "esize: number expected" : null != e.tpx && e.hasOwnProperty("tpx") && "number" != typeof e.tpx ? "tpx: number expected" : null != e.tpy && e.hasOwnProperty("tpy") && "number" != typeof e.tpy ? "tpy: number expected" : null != e.updown && e.hasOwnProperty("updown") && !s.isString(e.updown) ? "updown: string expected" : null : "level: integer expected" : "actType: string expected" : "objectId: integer expected" : "role: string expected" : "innerId: string expected" : "aid: string expected" : "life: integer expected" : "agentType: string expected";
};
e.fromObject = function(e) {
if (e instanceof a.AcWar.Agent) return e;
var t = new a.AcWar.Agent();
null != e.agentType && (t.agentType = String(e.agentType));
null != e.mpx && (t.mpx = Number(e.mpx));
null != e.mpy && (t.mpy = Number(e.mpy));
null != e.life && (t.life = 0 | e.life);
null != e.groupKill && (t.groupKill = Boolean(e.groupKill));
null != e.isHero && (t.isHero = Boolean(e.isHero));
null != e.rot && (t.rot = Number(e.rot));
null != e.attackDura && (t.attackDura = Number(e.attackDura));
null != e.aid && (t.aid = String(e.aid));
null != e.innerId && (t.innerId = String(e.innerId));
null != e.role && (t.role = String(e.role));
null != e.objectId && (t.objectId = 0 | e.objectId);
null != e.actType && (t.actType = String(e.actType));
null != e.size && (t.size = Number(e.size));
null != e.level && (t.level = 0 | e.level);
null != e.epx && (t.epx = Number(e.epx));
null != e.epy && (t.epy = Number(e.epy));
null != e.eid && (t.eid = String(e.eid));
null != e.esize && (t.esize = Number(e.esize));
null != e.tpx && (t.tpx = Number(e.tpx));
null != e.tpy && (t.tpy = Number(e.tpy));
null != e.updown && (t.updown = String(e.updown));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var n = {};
if (t.defaults) {
n.agentType = "";
n.mpx = 0;
n.mpy = 0;
n.life = 0;
n.groupKill = !1;
n.isHero = !1;
n.rot = 0;
n.attackDura = 0;
n.aid = "";
n.innerId = "";
n.role = "";
n.objectId = 0;
n.actType = "";
n.size = 0;
n.level = 0;
n.epx = 0;
n.epy = 0;
n.eid = "";
n.esize = 0;
n.tpx = 0;
n.tpy = 0;
n.updown = "";
}
null != e.agentType && e.hasOwnProperty("agentType") && (n.agentType = e.agentType);
null != e.mpx && e.hasOwnProperty("mpx") && (n.mpx = t.json && !isFinite(e.mpx) ? String(e.mpx) : e.mpx);
null != e.mpy && e.hasOwnProperty("mpy") && (n.mpy = t.json && !isFinite(e.mpy) ? String(e.mpy) : e.mpy);
null != e.life && e.hasOwnProperty("life") && (n.life = e.life);
null != e.groupKill && e.hasOwnProperty("groupKill") && (n.groupKill = e.groupKill);
null != e.isHero && e.hasOwnProperty("isHero") && (n.isHero = e.isHero);
null != e.rot && e.hasOwnProperty("rot") && (n.rot = t.json && !isFinite(e.rot) ? String(e.rot) : e.rot);
null != e.attackDura && e.hasOwnProperty("attackDura") && (n.attackDura = t.json && !isFinite(e.attackDura) ? String(e.attackDura) : e.attackDura);
null != e.aid && e.hasOwnProperty("aid") && (n.aid = e.aid);
null != e.innerId && e.hasOwnProperty("innerId") && (n.innerId = e.innerId);
null != e.role && e.hasOwnProperty("role") && (n.role = e.role);
null != e.objectId && e.hasOwnProperty("objectId") && (n.objectId = e.objectId);
null != e.actType && e.hasOwnProperty("actType") && (n.actType = e.actType);
null != e.size && e.hasOwnProperty("size") && (n.size = t.json && !isFinite(e.size) ? String(e.size) : e.size);
null != e.level && e.hasOwnProperty("level") && (n.level = e.level);
null != e.epx && e.hasOwnProperty("epx") && (n.epx = t.json && !isFinite(e.epx) ? String(e.epx) : e.epx);
null != e.epy && e.hasOwnProperty("epy") && (n.epy = t.json && !isFinite(e.epy) ? String(e.epy) : e.epy);
null != e.eid && e.hasOwnProperty("eid") && (n.eid = e.eid);
null != e.esize && e.hasOwnProperty("esize") && (n.esize = t.json && !isFinite(e.esize) ? String(e.esize) : e.esize);
null != e.tpx && e.hasOwnProperty("tpx") && (n.tpx = t.json && !isFinite(e.tpx) ? String(e.tpx) : e.tpx);
null != e.tpy && e.hasOwnProperty("tpy") && (n.tpy = t.json && !isFinite(e.tpy) ? String(e.tpy) : e.tpy);
null != e.updown && e.hasOwnProperty("updown") && (n.updown = e.updown);
return n;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, i.util.toJSONOptions);
};
return e;
}();
e.Info = function() {
function e(e) {
this.base = [];
this.fort = [];
this.agent = [];
this.bullet = [];
this.rollLog = [];
if (e) for (var t = Object.keys(e), n = 0; n < t.length; ++n) null != e[t[n]] && (this[t[n]] = e[t[n]]);
}
e.prototype.base = s.emptyArray;
e.prototype.fort = s.emptyArray;
e.prototype.agent = s.emptyArray;
e.prototype.bullet = s.emptyArray;
e.prototype.rollLog = s.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = r.create());
if (null != e.base && e.base.length) for (var n = 0; n < e.base.length; ++n) a.AcWar.Agent.encode(e.base[n], t.uint32(10).fork()).ldelim();
if (null != e.fort && e.fort.length) for (n = 0; n < e.fort.length; ++n) a.AcWar.Agent.encode(e.fort[n], t.uint32(18).fork()).ldelim();
if (null != e.agent && e.agent.length) for (n = 0; n < e.agent.length; ++n) a.AcWar.Agent.encode(e.agent[n], t.uint32(26).fork()).ldelim();
if (null != e.bullet && e.bullet.length) for (n = 0; n < e.bullet.length; ++n) a.AcWar.Agent.encode(e.bullet[n], t.uint32(34).fork()).ldelim();
if (null != e.rollLog && e.rollLog.length) for (n = 0; n < e.rollLog.length; ++n) a.AcWar.Agent.encode(e.rollLog[n], t.uint32(42).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof o || (e = o.create(e));
for (var n = void 0 === t ? e.len : e.pos + t, i = new a.AcWar.Info(); e.pos < n; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
i.base && i.base.length || (i.base = []);
i.base.push(a.AcWar.Agent.decode(e, e.uint32()));
break;

case 2:
i.fort && i.fort.length || (i.fort = []);
i.fort.push(a.AcWar.Agent.decode(e, e.uint32()));
break;

case 3:
i.agent && i.agent.length || (i.agent = []);
i.agent.push(a.AcWar.Agent.decode(e, e.uint32()));
break;

case 4:
i.bullet && i.bullet.length || (i.bullet = []);
i.bullet.push(a.AcWar.Agent.decode(e, e.uint32()));
break;

case 5:
i.rollLog && i.rollLog.length || (i.rollLog = []);
i.rollLog.push(a.AcWar.Agent.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return i;
};
e.decodeDelimited = function(e) {
e instanceof o || (e = new o(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== n(e) || null === e) return "object expected";
if (null != e.base && e.hasOwnProperty("base")) {
if (!Array.isArray(e.base)) return "base: array expected";
for (var t = 0; t < e.base.length; ++t) if (i = a.AcWar.Agent.verify(e.base[t])) return "base." + i;
}
if (null != e.fort && e.hasOwnProperty("fort")) {
if (!Array.isArray(e.fort)) return "fort: array expected";
for (t = 0; t < e.fort.length; ++t) if (i = a.AcWar.Agent.verify(e.fort[t])) return "fort." + i;
}
if (null != e.agent && e.hasOwnProperty("agent")) {
if (!Array.isArray(e.agent)) return "agent: array expected";
for (t = 0; t < e.agent.length; ++t) if (i = a.AcWar.Agent.verify(e.agent[t])) return "agent." + i;
}
if (null != e.bullet && e.hasOwnProperty("bullet")) {
if (!Array.isArray(e.bullet)) return "bullet: array expected";
for (t = 0; t < e.bullet.length; ++t) if (i = a.AcWar.Agent.verify(e.bullet[t])) return "bullet." + i;
}
if (null != e.rollLog && e.hasOwnProperty("rollLog")) {
if (!Array.isArray(e.rollLog)) return "rollLog: array expected";
for (t = 0; t < e.rollLog.length; ++t) {
var i;
if (i = a.AcWar.Agent.verify(e.rollLog[t])) return "rollLog." + i;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof a.AcWar.Info) return e;
var t = new a.AcWar.Info();
if (e.base) {
if (!Array.isArray(e.base)) throw TypeError(".AcWar.Info.base: array expected");
t.base = [];
for (var i = 0; i < e.base.length; ++i) {
if ("object" !== n(e.base[i])) throw TypeError(".AcWar.Info.base: object expected");
t.base[i] = a.AcWar.Agent.fromObject(e.base[i]);
}
}
if (e.fort) {
if (!Array.isArray(e.fort)) throw TypeError(".AcWar.Info.fort: array expected");
t.fort = [];
for (i = 0; i < e.fort.length; ++i) {
if ("object" !== n(e.fort[i])) throw TypeError(".AcWar.Info.fort: object expected");
t.fort[i] = a.AcWar.Agent.fromObject(e.fort[i]);
}
}
if (e.agent) {
if (!Array.isArray(e.agent)) throw TypeError(".AcWar.Info.agent: array expected");
t.agent = [];
for (i = 0; i < e.agent.length; ++i) {
if ("object" !== n(e.agent[i])) throw TypeError(".AcWar.Info.agent: object expected");
t.agent[i] = a.AcWar.Agent.fromObject(e.agent[i]);
}
}
if (e.bullet) {
if (!Array.isArray(e.bullet)) throw TypeError(".AcWar.Info.bullet: array expected");
t.bullet = [];
for (i = 0; i < e.bullet.length; ++i) {
if ("object" !== n(e.bullet[i])) throw TypeError(".AcWar.Info.bullet: object expected");
t.bullet[i] = a.AcWar.Agent.fromObject(e.bullet[i]);
}
}
if (e.rollLog) {
if (!Array.isArray(e.rollLog)) throw TypeError(".AcWar.Info.rollLog: array expected");
t.rollLog = [];
for (i = 0; i < e.rollLog.length; ++i) {
if ("object" !== n(e.rollLog[i])) throw TypeError(".AcWar.Info.rollLog: object expected");
t.rollLog[i] = a.AcWar.Agent.fromObject(e.rollLog[i]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var n = {};
if (t.arrays || t.defaults) {
n.base = [];
n.fort = [];
n.agent = [];
n.bullet = [];
n.rollLog = [];
}
if (e.base && e.base.length) {
n.base = [];
for (var i = 0; i < e.base.length; ++i) n.base[i] = a.AcWar.Agent.toObject(e.base[i], t);
}
if (e.fort && e.fort.length) {
n.fort = [];
for (i = 0; i < e.fort.length; ++i) n.fort[i] = a.AcWar.Agent.toObject(e.fort[i], t);
}
if (e.agent && e.agent.length) {
n.agent = [];
for (i = 0; i < e.agent.length; ++i) n.agent[i] = a.AcWar.Agent.toObject(e.agent[i], t);
}
if (e.bullet && e.bullet.length) {
n.bullet = [];
for (i = 0; i < e.bullet.length; ++i) n.bullet[i] = a.AcWar.Agent.toObject(e.bullet[i], t);
}
if (e.rollLog && e.rollLog.length) {
n.rollLog = [];
for (i = 0; i < e.rollLog.length; ++i) n.rollLog[i] = a.AcWar.Agent.toObject(e.rollLog[i], t);
}
return n;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, i.util.toJSONOptions);
};
return e;
}();
return e;
}();
t.exports = a;
cc._RF.pop();
}, {
"./protobuf.js": "protobuf"
} ],
aniComponent: [ function(e, t) {
"use strict";
cc._RF.push(t, "86f1aoqPclID4CwDWRy9QKi", "aniComponent");
cc.Class({
extends: cc.Component,
properties: {
sprAtlas: cc.SpriteAtlas,
wrapMode: cc.WrapMode.default
},
onLoad: function() {
this._animation = this.getComponent(cc.Animation);
this.setAnimation();
},
start: function() {
this.playAnimation();
},
setAnimation: function() {
if (this.sprAtlas) {
var e = this.sprAtlas.getSpriteFrames(), t = cc.AnimationClip.createWithSpriteFrames(e, e.length);
t.name = "anim_001";
t.speed = .1;
t.sample = 60;
t.wrapMode = this.wrapMode;
this._animation.addClip(t);
}
},
playAnimation: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : cc.WrapMode.Default, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .5, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 60;
if (this._animation) {
var i = this._animation.getAnimationState("anim_001");
i.clip.wrapMode = e;
i.clip.speed = t;
i.clip.sample = n;
this._animation.play("anim_001");
}
}
});
cc._RF.pop();
}, {} ],
protobuf: [ function(require, module, exports) {
"use strict";
cc._RF.push(module, "f28ba3pGVlLR6xnGfV2Gugq", "protobuf");
function _typeof(e) {
return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
(function(global, undefined) {
(function(e, t) {
var n = global.protobuf = function n(i) {
var o = t[i];
o || e[i][0].call(o = t[i] = {
exports: {}
}, n, o, o.exports);
return o.exports;
}(19);
"function" == typeof define && define.amd && define([ "long" ], function(e) {
if (e && e.isLong) {
n.util.Long = e;
n.configure();
}
return n;
});
"object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module && module.exports && (module.exports = n);
})({
1: [ function(e, t) {
t.exports = function(e, t) {
for (var n = new Array(arguments.length - 1), i = 0, o = 2, r = !0; o < arguments.length; ) n[i++] = arguments[o++];
return new Promise(function(o, s) {
n[i] = function(e) {
if (r) {
r = !1;
if (e) s(e); else {
for (var t = new Array(arguments.length - 1), n = 0; n < t.length; ) t[n++] = arguments[n];
o.apply(null, t);
}
}
};
try {
e.apply(t || null, n);
} catch (e) {
if (r) {
r = !1;
s(e);
}
}
});
};
}, {} ],
2: [ function(e, t, n) {
var i = n;
i.length = function(e) {
var t = e.length;
if (!t) return 0;
for (var n = 0; --t % 4 > 1 && "=" === e.charAt(t); ) ++n;
return Math.ceil(3 * e.length) / 4 - n;
};
for (var o = new Array(64), r = new Array(123), s = 0; s < 64; ) r[o[s] = s < 26 ? s + 65 : s < 52 ? s + 71 : s < 62 ? s - 4 : s - 59 | 43] = s++;
i.encode = function(e, t, n) {
for (var i, r = null, s = [], a = 0, l = 0; t < n; ) {
var c = e[t++];
switch (l) {
case 0:
s[a++] = o[c >> 2];
i = (3 & c) << 4;
l = 1;
break;

case 1:
s[a++] = o[i | c >> 4];
i = (15 & c) << 2;
l = 2;
break;

case 2:
s[a++] = o[i | c >> 6];
s[a++] = o[63 & c];
l = 0;
}
if (a > 8191) {
(r || (r = [])).push(String.fromCharCode.apply(String, s));
a = 0;
}
}
if (l) {
s[a++] = o[i];
s[a++] = 61;
1 === l && (s[a++] = 61);
}
if (r) {
a && r.push(String.fromCharCode.apply(String, s.slice(0, a)));
return r.join("");
}
return String.fromCharCode.apply(String, s.slice(0, a));
};
i.decode = function(e, t, n) {
for (var i, o = n, s = 0, a = 0; a < e.length; ) {
var l = e.charCodeAt(a++);
if (61 === l && s > 1) break;
if ((l = r[l]) === undefined) throw Error("invalid encoding");
switch (s) {
case 0:
i = l;
s = 1;
break;

case 1:
t[n++] = i << 2 | (48 & l) >> 4;
i = l;
s = 2;
break;

case 2:
t[n++] = (15 & i) << 4 | (60 & l) >> 2;
i = l;
s = 3;
break;

case 3:
t[n++] = (3 & i) << 6 | l;
s = 0;
}
}
if (1 === s) throw Error("invalid encoding");
return n - o;
};
i.test = function(e) {
return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e);
};
}, {} ],
3: [ function(e, t) {
t.exports = n;
function n(e, t) {
if ("string" == typeof e) {
t = e;
e = undefined;
}
var i = [];
function o(e) {
if ("string" != typeof e) {
var t = r();
n.verbose && console.log("codegen: " + t);
t = "return " + t;
if (e) {
for (var s = Object.keys(e), a = new Array(s.length + 1), l = new Array(s.length), c = 0; c < s.length; ) {
a[c] = s[c];
l[c] = e[s[c++]];
}
a[c] = t;
return Function.apply(null, a).apply(null, l);
}
return Function(t)();
}
for (var f = new Array(arguments.length - 1), u = 0; u < f.length; ) f[u] = arguments[++u];
u = 0;
e = e.replace(/%([%dfijs])/g, function(e, t) {
var n = f[u++];
switch (t) {
case "d":
case "f":
return String(Number(n));

case "i":
return String(Math.floor(n));

case "j":
return JSON.stringify(n);

case "s":
return String(n);
}
return "%";
});
if (u !== f.length) throw Error("parameter count mismatch");
i.push(e);
return o;
}
function r(n) {
return "function " + (n || t || "") + "(" + (e && e.join(",") || "") + "){\n  " + i.join("\n  ") + "\n}";
}
o.toString = r;
return o;
}
n.verbose = !1;
}, {} ],
4: [ function(e, t) {
t.exports = n;
function n() {
this._listeners = {};
}
n.prototype.on = function(e, t, n) {
(this._listeners[e] || (this._listeners[e] = [])).push({
fn: t,
ctx: n || this
});
return this;
};
n.prototype.off = function(e, t) {
if (e === undefined) this._listeners = {}; else if (t === undefined) this._listeners[e] = []; else for (var n = this._listeners[e], i = 0; i < n.length; ) n[i].fn === t ? n.splice(i, 1) : ++i;
return this;
};
n.prototype.emit = function(e) {
var t = this._listeners[e];
if (t) {
for (var n = [], i = 1; i < arguments.length; ) n.push(arguments[i++]);
for (i = 0; i < t.length; ) t[i].fn.apply(t[i++].ctx, n);
}
return this;
};
}, {} ],
5: [ function(e, t) {
t.exports = o;
var n = e(1), i = e(7)("fs");
function o(e, t, r) {
if ("function" == typeof t) {
r = t;
t = {};
} else t || (t = {});
return r ? !t.xhr && i && i.readFile ? i.readFile(e, function(n, i) {
return n && "undefined" != typeof XMLHttpRequest ? o.xhr(e, t, r) : n ? r(n) : r(null, t.binary ? i : i.toString("utf8"));
}) : o.xhr(e, t, r) : n(o, this, e, t);
}
o.xhr = function(e, t, n) {
var i = new XMLHttpRequest();
i.onreadystatechange = function() {
if (4 !== i.readyState) return undefined;
if (0 !== i.status && 200 !== i.status) return n(Error("status " + i.status));
if (t.binary) {
var e = i.response;
if (!e) {
e = [];
for (var o = 0; o < i.responseText.length; ++o) e.push(255 & i.responseText.charCodeAt(o));
}
return n(null, "undefined" != typeof Uint8Array ? new Uint8Array(e) : e);
}
return n(null, i.responseText);
};
if (t.binary) {
"overrideMimeType" in i && i.overrideMimeType("text/plain; charset=x-user-defined");
i.responseType = "arraybuffer";
}
i.open("GET", e);
i.send();
};
}, {
1: 1,
7: 7
} ],
6: [ function(e, t) {
t.exports = n(n);
function n(e) {
"undefined" != typeof Float32Array ? function() {
var t = new Float32Array([ -0 ]), n = new Uint8Array(t.buffer), i = 128 === n[3];
function o(e, i, o) {
t[0] = e;
i[o] = n[0];
i[o + 1] = n[1];
i[o + 2] = n[2];
i[o + 3] = n[3];
}
function r(e, i, o) {
t[0] = e;
i[o] = n[3];
i[o + 1] = n[2];
i[o + 2] = n[1];
i[o + 3] = n[0];
}
e.writeFloatLE = i ? o : r;
e.writeFloatBE = i ? r : o;
function s(e, i) {
n[0] = e[i];
n[1] = e[i + 1];
n[2] = e[i + 2];
n[3] = e[i + 3];
return t[0];
}
function a(e, i) {
n[3] = e[i];
n[2] = e[i + 1];
n[1] = e[i + 2];
n[0] = e[i + 3];
return t[0];
}
e.readFloatLE = i ? s : a;
e.readFloatBE = i ? a : s;
}() : function() {
function t(e, t, n, i) {
var o = t < 0 ? 1 : 0;
o && (t = -t);
if (0 === t) e(1 / t > 0 ? 0 : 2147483648, n, i); else if (isNaN(t)) e(2143289344, n, i); else if (t > 34028234663852886e22) e((o << 31 | 2139095040) >>> 0, n, i); else if (t < 11754943508222875e-54) e((o << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, n, i); else {
var r = Math.floor(Math.log(t) / Math.LN2);
e((o << 31 | r + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -r) * 8388608)) >>> 0, n, i);
}
}
e.writeFloatLE = t.bind(null, i);
e.writeFloatBE = t.bind(null, o);
function n(e, t, n) {
var i = e(t, n), o = 2 * (i >> 31) + 1, r = i >>> 23 & 255, s = 8388607 & i;
return 255 === r ? s ? NaN : Infinity * o : 0 === r ? 1401298464324817e-60 * o * s : o * Math.pow(2, r - 150) * (s + 8388608);
}
e.readFloatLE = n.bind(null, r);
e.readFloatBE = n.bind(null, s);
}();
"undefined" != typeof Float64Array ? function() {
var t = new Float64Array([ -0 ]), n = new Uint8Array(t.buffer), i = 128 === n[7];
function o(e, i, o) {
t[0] = e;
i[o] = n[0];
i[o + 1] = n[1];
i[o + 2] = n[2];
i[o + 3] = n[3];
i[o + 4] = n[4];
i[o + 5] = n[5];
i[o + 6] = n[6];
i[o + 7] = n[7];
}
function r(e, i, o) {
t[0] = e;
i[o] = n[7];
i[o + 1] = n[6];
i[o + 2] = n[5];
i[o + 3] = n[4];
i[o + 4] = n[3];
i[o + 5] = n[2];
i[o + 6] = n[1];
i[o + 7] = n[0];
}
e.writeDoubleLE = i ? o : r;
e.writeDoubleBE = i ? r : o;
function s(e, i) {
n[0] = e[i];
n[1] = e[i + 1];
n[2] = e[i + 2];
n[3] = e[i + 3];
n[4] = e[i + 4];
n[5] = e[i + 5];
n[6] = e[i + 6];
n[7] = e[i + 7];
return t[0];
}
function a(e, i) {
n[7] = e[i];
n[6] = e[i + 1];
n[5] = e[i + 2];
n[4] = e[i + 3];
n[3] = e[i + 4];
n[2] = e[i + 5];
n[1] = e[i + 6];
n[0] = e[i + 7];
return t[0];
}
e.readDoubleLE = i ? s : a;
e.readDoubleBE = i ? a : s;
}() : function() {
function t(e, t, n, i, o, r) {
var s = i < 0 ? 1 : 0;
s && (i = -i);
if (0 === i) {
e(0, o, r + t);
e(1 / i > 0 ? 0 : 2147483648, o, r + n);
} else if (isNaN(i)) {
e(0, o, r + t);
e(2146959360, o, r + n);
} else if (i > 17976931348623157e292) {
e(0, o, r + t);
e((s << 31 | 2146435072) >>> 0, o, r + n);
} else {
var a;
if (i < 22250738585072014e-324) {
e((a = i / 5e-324) >>> 0, o, r + t);
e((s << 31 | a / 4294967296) >>> 0, o, r + n);
} else {
var l = Math.floor(Math.log(i) / Math.LN2);
1024 === l && (l = 1023);
e(4503599627370496 * (a = i * Math.pow(2, -l)) >>> 0, o, r + t);
e((s << 31 | l + 1023 << 20 | 1048576 * a & 1048575) >>> 0, o, r + n);
}
}
}
e.writeDoubleLE = t.bind(null, i, 0, 4);
e.writeDoubleBE = t.bind(null, o, 4, 0);
function n(e, t, n, i, o) {
var r = e(i, o + t), s = e(i, o + n), a = 2 * (s >> 31) + 1, l = s >>> 20 & 2047, c = 4294967296 * (1048575 & s) + r;
return 2047 === l ? c ? NaN : Infinity * a : 0 === l ? 5e-324 * a * c : a * Math.pow(2, l - 1075) * (c + 4503599627370496);
}
e.readDoubleLE = n.bind(null, r, 0, 4);
e.readDoubleBE = n.bind(null, s, 4, 0);
}();
return e;
}
function i(e, t, n) {
t[n] = 255 & e;
t[n + 1] = e >>> 8 & 255;
t[n + 2] = e >>> 16 & 255;
t[n + 3] = e >>> 24;
}
function o(e, t, n) {
t[n] = e >>> 24;
t[n + 1] = e >>> 16 & 255;
t[n + 2] = e >>> 8 & 255;
t[n + 3] = 255 & e;
}
function r(e, t) {
return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}
function s(e, t) {
return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
}, {} ],
7: [ function(require, module, exports) {
module.exports = inquire;
function inquire(moduleName) {
try {
var mod = eval("quire".replace(/^/, "re"))(moduleName);
if (mod && (mod.length || Object.keys(mod).length)) return mod;
} catch (e) {}
return null;
}
}, {} ],
8: [ function(e, t, n) {
var i = n, o = i.isAbsolute = function(e) {
return /^(?:\/|\w+:)/.test(e);
}, r = i.normalize = function(e) {
var t = (e = e.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"), n = o(e), i = "";
n && (i = t.shift() + "/");
for (var r = 0; r < t.length; ) ".." === t[r] ? r > 0 && ".." !== t[r - 1] ? t.splice(--r, 2) : n ? t.splice(r, 1) : ++r : "." === t[r] ? t.splice(r, 1) : ++r;
return i + t.join("/");
};
i.resolve = function(e, t, n) {
n || (t = r(t));
if (o(t)) return t;
n || (e = r(e));
return (e = e.replace(/(?:\/|^)[^\/]+$/, "")).length ? r(e + "/" + t) : t;
};
}, {} ],
9: [ function(e, t) {
t.exports = function(e, t, n) {
var i = n || 8192, o = i >>> 1, r = null, s = i;
return function(n) {
if (n < 1 || n > o) return e(n);
if (s + n > i) {
r = e(i);
s = 0;
}
var a = t.call(r, s, s += n);
7 & s && (s = 1 + (7 | s));
return a;
};
};
}, {} ],
10: [ function(e, t, n) {
var i = n;
i.length = function(e) {
for (var t = 0, n = 0, i = 0; i < e.length; ++i) if ((n = e.charCodeAt(i)) < 128) t += 1; else if (n < 2048) t += 2; else if (55296 == (64512 & n) && 56320 == (64512 & e.charCodeAt(i + 1))) {
++i;
t += 4;
} else t += 3;
return t;
};
i.read = function(e, t, n) {
if (n - t < 1) return "";
for (var i, o = null, r = [], s = 0; t < n; ) {
if ((i = e[t++]) < 128) r[s++] = i; else if (i > 191 && i < 224) r[s++] = (31 & i) << 6 | 63 & e[t++]; else if (i > 239 && i < 365) {
i = ((7 & i) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536;
r[s++] = 55296 + (i >> 10);
r[s++] = 56320 + (1023 & i);
} else r[s++] = (15 & i) << 12 | (63 & e[t++]) << 6 | 63 & e[t++];
if (s > 8191) {
(o || (o = [])).push(String.fromCharCode.apply(String, r));
s = 0;
}
}
if (o) {
s && o.push(String.fromCharCode.apply(String, r.slice(0, s)));
return o.join("");
}
return String.fromCharCode.apply(String, r.slice(0, s));
};
i.write = function(e, t, n) {
for (var i, o, r = n, s = 0; s < e.length; ++s) if ((i = e.charCodeAt(s)) < 128) t[n++] = i; else if (i < 2048) {
t[n++] = i >> 6 | 192;
t[n++] = 63 & i | 128;
} else if (55296 == (64512 & i) && 56320 == (64512 & (o = e.charCodeAt(s + 1)))) {
i = 65536 + ((1023 & i) << 10) + (1023 & o);
++s;
t[n++] = i >> 18 | 240;
t[n++] = i >> 12 & 63 | 128;
t[n++] = i >> 6 & 63 | 128;
t[n++] = 63 & i | 128;
} else {
t[n++] = i >> 12 | 224;
t[n++] = i >> 6 & 63 | 128;
t[n++] = 63 & i | 128;
}
return n - r;
};
}, {} ],
11: [ function(e, t) {
t.exports = o;
var n, i = /\/|\./;
function o(e, t) {
if (!i.test(e)) {
e = "google/protobuf/" + e + ".proto";
t = {
nested: {
google: {
nested: {
protobuf: {
nested: t
}
}
}
}
};
}
o[e] = t;
}
o("any", {
Any: {
fields: {
type_url: {
type: "string",
id: 1
},
value: {
type: "bytes",
id: 2
}
}
}
});
o("duration", {
Duration: n = {
fields: {
seconds: {
type: "int64",
id: 1
},
nanos: {
type: "int32",
id: 2
}
}
}
});
o("timestamp", {
Timestamp: n
});
o("empty", {
Empty: {
fields: {}
}
});
o("struct", {
Struct: {
fields: {
fields: {
keyType: "string",
type: "Value",
id: 1
}
}
},
Value: {
oneofs: {
kind: {
oneof: [ "nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue" ]
}
},
fields: {
nullValue: {
type: "NullValue",
id: 1
},
numberValue: {
type: "double",
id: 2
},
stringValue: {
type: "string",
id: 3
},
boolValue: {
type: "bool",
id: 4
},
structValue: {
type: "Struct",
id: 5
},
listValue: {
type: "ListValue",
id: 6
}
}
},
NullValue: {
values: {
NULL_VALUE: 0
}
},
ListValue: {
fields: {
values: {
rule: "repeated",
type: "Value",
id: 1
}
}
}
});
o("wrappers", {
DoubleValue: {
fields: {
value: {
type: "double",
id: 1
}
}
},
FloatValue: {
fields: {
value: {
type: "float",
id: 1
}
}
},
Int64Value: {
fields: {
value: {
type: "int64",
id: 1
}
}
},
UInt64Value: {
fields: {
value: {
type: "uint64",
id: 1
}
}
},
Int32Value: {
fields: {
value: {
type: "int32",
id: 1
}
}
},
UInt32Value: {
fields: {
value: {
type: "uint32",
id: 1
}
}
},
BoolValue: {
fields: {
value: {
type: "bool",
id: 1
}
}
},
StringValue: {
fields: {
value: {
type: "string",
id: 1
}
}
},
BytesValue: {
fields: {
value: {
type: "bytes",
id: 1
}
}
}
});
o("field_mask", {
FieldMask: {
fields: {
paths: {
rule: "repeated",
type: "string",
id: 1
}
}
}
});
o.get = function(e) {
return o[e] || null;
};
}, {} ],
12: [ function(e, t, n) {
var i = n, o = e(15), r = e(37);
function s(e, t, n, i) {
if (t.resolvedType) if (t.resolvedType instanceof o) {
e("switch(d%s){", i);
for (var r = t.resolvedType.values, s = Object.keys(r), a = 0; a < s.length; ++a) {
t.repeated && r[s[a]] === t.typeDefault && e("default:");
e("case%j:", s[a])("case %i:", r[s[a]])("m%s=%j", i, r[s[a]])("break");
}
e("}");
} else e('if(typeof d%s!=="object")', i)("throw TypeError(%j)", t.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", i, n, i); else {
var l = !1;
switch (t.type) {
case "double":
case "float":
e("m%s=Number(d%s)", i, i);
break;

case "uint32":
case "fixed32":
e("m%s=d%s>>>0", i, i);
break;

case "int32":
case "sint32":
case "sfixed32":
e("m%s=d%s|0", i, i);
break;

case "uint64":
l = !0;

case "int64":
case "sint64":
case "fixed64":
case "sfixed64":
e("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", i, i, l)('else if(typeof d%s==="string")', i)("m%s=parseInt(d%s,10)", i, i)('else if(typeof d%s==="number")', i)("m%s=d%s", i, i)('else if(typeof d%s==="object")', i)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", i, i, i, l ? "true" : "");
break;

case "bytes":
e('if(typeof d%s==="string")', i)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", i, i, i)("else if(d%s.length)", i)("m%s=d%s", i, i);
break;

case "string":
e("m%s=String(d%s)", i, i);
break;

case "bool":
e("m%s=Boolean(d%s)", i, i);
}
}
return e;
}
i.fromObject = function(e) {
var t = e.fieldsArray, n = r.codegen([ "d" ], e.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
if (!t.length) return n("return new this.ctor");
n("var m=new this.ctor");
for (var i = 0; i < t.length; ++i) {
var a = t[i].resolve(), l = r.safeProp(a.name);
if (a.map) {
n("if(d%s){", l)('if(typeof d%s!=="object")', l)("throw TypeError(%j)", a.fullName + ": object expected")("m%s={}", l)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", l);
s(n, a, i, l + "[ks[i]]")("}")("}");
} else if (a.repeated) {
n("if(d%s){", l)("if(!Array.isArray(d%s))", l)("throw TypeError(%j)", a.fullName + ": array expected")("m%s=[]", l)("for(var i=0;i<d%s.length;++i){", l);
s(n, a, i, l + "[i]")("}")("}");
} else {
a.resolvedType instanceof o || n("if(d%s!=null){", l);
s(n, a, i, l);
a.resolvedType instanceof o || n("}");
}
}
return n("return m");
};
function a(e, t, n, i) {
if (t.resolvedType) t.resolvedType instanceof o ? e("d%s=o.enums===String?types[%i].values[m%s]:m%s", i, n, i, i) : e("d%s=types[%i].toObject(m%s,o)", i, n, i); else {
var r = !1;
switch (t.type) {
case "double":
case "float":
e("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", i, i, i, i);
break;

case "uint64":
r = !0;

case "int64":
case "sint64":
case "fixed64":
case "sfixed64":
e('if(typeof m%s==="number")', i)("d%s=o.longs===String?String(m%s):m%s", i, i, i)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", i, i, i, i, r ? "true" : "", i);
break;

case "bytes":
e("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", i, i, i, i, i);
break;

default:
e("d%s=m%s", i, i);
}
}
return e;
}
i.toObject = function(e) {
var t = e.fieldsArray.slice().sort(r.compareFieldsById);
if (!t.length) return r.codegen()("return {}");
for (var n = r.codegen([ "m", "o" ], e.name + "$toObject")("if(!o)")("o={}")("var d={}"), i = [], s = [], l = [], c = 0; c < t.length; ++c) t[c].partOf || (t[c].resolve().repeated ? i : t[c].map ? s : l).push(t[c]);
if (i.length) {
n("if(o.arrays||o.defaults){");
for (c = 0; c < i.length; ++c) n("d%s=[]", r.safeProp(i[c].name));
n("}");
}
if (s.length) {
n("if(o.objects||o.defaults){");
for (c = 0; c < s.length; ++c) n("d%s={}", r.safeProp(s[c].name));
n("}");
}
if (l.length) {
n("if(o.defaults){");
for (c = 0; c < l.length; ++c) {
var f = l[c], u = r.safeProp(f.name);
f.resolvedType instanceof o ? n("d%s=o.enums===String?%j:%j", u, f.resolvedType.valuesById[f.typeDefault], f.typeDefault) : f.long ? n("if(util.Long){")("var n=new util.Long(%i,%i,%j)", f.typeDefault.low, f.typeDefault.high, f.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", u)("}else")("d%s=o.longs===String?%j:%i", u, f.typeDefault.toString(), f.typeDefault.toNumber()) : f.bytes ? n("d%s=o.bytes===String?%j:%s", u, String.fromCharCode.apply(String, f.typeDefault), "[" + Array.prototype.slice.call(f.typeDefault).join(",") + "]") : n("d%s=%j", u, f.typeDefault);
}
n("}");
}
var h = !1;
for (c = 0; c < t.length; ++c) {
f = t[c];
var p = e._fieldsArray.indexOf(f);
u = r.safeProp(f.name);
if (f.map) {
if (!h) {
h = !0;
n("var ks2");
}
n("if(m%s&&(ks2=Object.keys(m%s)).length){", u, u)("d%s={}", u)("for(var j=0;j<ks2.length;++j){");
a(n, f, p, u + "[ks2[j]]")("}");
} else if (f.repeated) {
n("if(m%s&&m%s.length){", u, u)("d%s=[]", u)("for(var j=0;j<m%s.length;++j){", u);
a(n, f, p, u + "[j]")("}");
} else {
n("if(m%s!=null&&m.hasOwnProperty(%j)){", u, f.name);
a(n, f, p, u);
f.partOf && n("if(o.oneofs)")("d%s=%j", r.safeProp(f.partOf.name), f.name);
}
n("}");
}
return n("return d");
};
}, {
15: 15,
37: 37
} ],
13: [ function(e, t) {
t.exports = function(e) {
var t = o.codegen([ "r", "l" ], e.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (e.fieldsArray.filter(function(e) {
return e.map;
}).length ? ",k" : ""))("while(r.pos<c){")("var t=r.uint32()");
e.group && t("if((t&7)===4)")("break");
t("switch(t>>>3){");
for (var s = 0; s < e.fieldsArray.length; ++s) {
var a = e._fieldsArray[s].resolve(), l = a.resolvedType instanceof n ? "int32" : a.type, c = "m" + o.safeProp(a.name);
t("case %i:", a.id);
if (a.map) {
t("r.skip().pos++")("if(%s===util.emptyObject)", c)("%s={}", c)("k=r.%s()", a.keyType)("r.pos++");
i.long[a.keyType] !== undefined ? i.basic[l] === undefined ? t('%s[typeof k==="object"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())', c, s) : t('%s[typeof k==="object"?util.longToHash(k):k]=r.%s()', c, l) : i.basic[l] === undefined ? t("%s[k]=types[%i].decode(r,r.uint32())", c, s) : t("%s[k]=r.%s()", c, l);
} else if (a.repeated) {
t("if(!(%s&&%s.length))", c, c)("%s=[]", c);
i.packed[l] !== undefined && t("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", c, l)("}else");
i.basic[l] === undefined ? t(a.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", c, s) : t("%s.push(r.%s())", c, l);
} else i.basic[l] === undefined ? t(a.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", c, s) : t("%s=r.%s()", c, l);
t("break");
}
t("default:")("r.skipType(t&7)")("break")("}")("}");
for (s = 0; s < e._fieldsArray.length; ++s) {
var f = e._fieldsArray[s];
f.required && t("if(!m.hasOwnProperty(%j))", f.name)("throw util.ProtocolError(%j,{instance:m})", r(f));
}
return t("return m");
};
var n = e(15), i = e(36), o = e(37);
function r(e) {
return "missing required '" + e.name + "'";
}
}, {
15: 15,
36: 36,
37: 37
} ],
14: [ function(e, t) {
t.exports = function(e) {
for (var t, s = o.codegen([ "m", "w" ], e.name + "$encode")("if(!w)")("w=Writer.create()"), a = e.fieldsArray.slice().sort(o.compareFieldsById), l = 0; l < a.length; ++l) {
var c = a[l].resolve(), f = e._fieldsArray.indexOf(c), u = c.resolvedType instanceof n ? "int32" : c.type, h = i.basic[u];
t = "m" + o.safeProp(c.name);
if (c.map) {
s("if(%s!=null&&m.hasOwnProperty(%j)){", t, c.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", t)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (c.id << 3 | 2) >>> 0, 8 | i.mapKey[c.keyType], c.keyType);
h === undefined ? s("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", f, t) : s(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | h, u, t);
s("}")("}");
} else if (c.repeated) {
s("if(%s!=null&&%s.length){", t, t);
if (c.packed && i.packed[u] !== undefined) s("w.uint32(%i).fork()", (c.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", t)("w.%s(%s[i])", u, t)("w.ldelim()"); else {
s("for(var i=0;i<%s.length;++i)", t);
h === undefined ? r(s, c, f, t + "[i]") : s("w.uint32(%i).%s(%s[i])", (c.id << 3 | h) >>> 0, u, t);
}
s("}");
} else {
c.optional && s("if(%s!=null&&m.hasOwnProperty(%j))", t, c.name);
h === undefined ? r(s, c, f, t) : s("w.uint32(%i).%s(%s)", (c.id << 3 | h) >>> 0, u, t);
}
}
return s("return w");
};
var n = e(15), i = e(36), o = e(37);
function r(e, t, n, i) {
return t.resolvedType.group ? e("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", n, i, (t.id << 3 | 3) >>> 0, (t.id << 3 | 4) >>> 0) : e("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", n, i, (t.id << 3 | 2) >>> 0);
}
}, {
15: 15,
36: 36,
37: 37
} ],
15: [ function(e, t) {
t.exports = r;
var n = e(24);
((r.prototype = Object.create(n.prototype)).constructor = r).className = "Enum";
var i = e(23), o = e(37);
function r(e, t, i, o, r) {
n.call(this, e, i);
if (t && "object" !== _typeof(t)) throw TypeError("values must be an object");
this.valuesById = {};
this.values = Object.create(this.valuesById);
this.comment = o;
this.comments = r || {};
this.reserved = undefined;
if (t) for (var s = Object.keys(t), a = 0; a < s.length; ++a) "number" == typeof t[s[a]] && (this.valuesById[this.values[s[a]] = t[s[a]]] = s[a]);
}
r.fromJSON = function(e, t) {
var n = new r(e, t.values, t.options, t.comment, t.comments);
n.reserved = t.reserved;
return n;
};
r.prototype.toJSON = function(e) {
var t = !!e && Boolean(e.keepComments);
return o.toObject([ "options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "comment", t ? this.comment : undefined, "comments", t ? this.comments : undefined ]);
};
r.prototype.add = function(e, t, n) {
if (!o.isString(e)) throw TypeError("name must be a string");
if (!o.isInteger(t)) throw TypeError("id must be an integer");
if (this.values[e] !== undefined) throw Error("duplicate name '" + e + "' in " + this);
if (this.isReservedId(t)) throw Error("id " + t + " is reserved in " + this);
if (this.isReservedName(e)) throw Error("name '" + e + "' is reserved in " + this);
if (this.valuesById[t] !== undefined) {
if (!this.options || !this.options.allow_alias) throw Error("duplicate id " + t + " in " + this);
this.values[e] = t;
} else this.valuesById[this.values[e] = t] = e;
this.comments[e] = n || null;
return this;
};
r.prototype.remove = function(e) {
if (!o.isString(e)) throw TypeError("name must be a string");
var t = this.values[e];
if (null == t) throw Error("name '" + e + "' does not exist in " + this);
delete this.valuesById[t];
delete this.values[e];
delete this.comments[e];
return this;
};
r.prototype.isReservedId = function(e) {
return i.isReservedId(this.reserved, e);
};
r.prototype.isReservedName = function(e) {
return i.isReservedName(this.reserved, e);
};
}, {
23: 23,
24: 24,
37: 37
} ],
16: [ function(e, t) {
t.exports = l;
var n = e(24);
((l.prototype = Object.create(n.prototype)).constructor = l).className = "Field";
var i, o = e(15), r = e(36), s = e(37), a = /^required|optional|repeated$/;
l.fromJSON = function(e, t) {
return new l(e, t.id, t.type, t.rule, t.extend, t.options, t.comment);
};
function l(e, t, i, o, l, c, f) {
if (s.isObject(o)) {
f = l;
c = o;
o = l = undefined;
} else if (s.isObject(l)) {
f = c;
c = l;
l = undefined;
}
n.call(this, e, c);
if (!s.isInteger(t) || t < 0) throw TypeError("id must be a non-negative integer");
if (!s.isString(i)) throw TypeError("type must be a string");
if (o !== undefined && !a.test(o = o.toString().toLowerCase())) throw TypeError("rule must be a string rule");
if (l !== undefined && !s.isString(l)) throw TypeError("extend must be a string");
this.rule = o && "optional" !== o ? o : undefined;
this.type = i;
this.id = t;
this.extend = l || undefined;
this.required = "required" === o;
this.optional = !this.required;
this.repeated = "repeated" === o;
this.map = !1;
this.message = null;
this.partOf = null;
this.typeDefault = null;
this.defaultValue = null;
this.long = !!s.Long && r.long[i] !== undefined;
this.bytes = "bytes" === i;
this.resolvedType = null;
this.extensionField = null;
this.declaringField = null;
this._packed = null;
this.comment = f;
}
Object.defineProperty(l.prototype, "packed", {
get: function() {
null === this._packed && (this._packed = !1 !== this.getOption("packed"));
return this._packed;
}
});
l.prototype.setOption = function(e, t, i) {
"packed" === e && (this._packed = null);
return n.prototype.setOption.call(this, e, t, i);
};
l.prototype.toJSON = function(e) {
var t = !!e && Boolean(e.keepComments);
return s.toObject([ "rule", "optional" !== this.rule && this.rule || undefined, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : undefined ]);
};
l.prototype.resolve = function() {
if (this.resolved) return this;
if ((this.typeDefault = r.defaults[this.type]) === undefined) {
this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
this.resolvedType instanceof i ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
}
if (this.options && null != this.options.default) {
this.typeDefault = this.options.default;
this.resolvedType instanceof o && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault]);
}
if (this.options) {
!0 !== this.options.packed && (this.options.packed === undefined || !this.resolvedType || this.resolvedType instanceof o) || delete this.options.packed;
Object.keys(this.options).length || (this.options = undefined);
}
if (this.long) {
this.typeDefault = s.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0));
Object.freeze && Object.freeze(this.typeDefault);
} else if (this.bytes && "string" == typeof this.typeDefault) {
var e;
s.base64.test(this.typeDefault) ? s.base64.decode(this.typeDefault, e = s.newBuffer(s.base64.length(this.typeDefault)), 0) : s.utf8.write(this.typeDefault, e = s.newBuffer(s.utf8.length(this.typeDefault)), 0);
this.typeDefault = e;
}
this.map ? this.defaultValue = s.emptyObject : this.repeated ? this.defaultValue = s.emptyArray : this.defaultValue = this.typeDefault;
this.parent instanceof i && (this.parent.ctor.prototype[this.name] = this.defaultValue);
return n.prototype.resolve.call(this);
};
l.d = function(e, t, n, i) {
"function" == typeof t ? t = s.decorateType(t).name : t && "object" === _typeof(t) && (t = s.decorateEnum(t).name);
return function(o, r) {
s.decorateType(o.constructor).add(new l(r, e, t, n, {
default: i
}));
};
};
l._configure = function(e) {
i = e;
};
}, {
15: 15,
24: 24,
36: 36,
37: 37
} ],
17: [ function(e, t) {
var n = t.exports = e(18);
n.build = "light";
n.load = function(e, t, i) {
if ("function" == typeof t) {
i = t;
t = new n.Root();
} else t || (t = new n.Root());
return t.load(e, i);
};
n.loadSync = function(e, t) {
t || (t = new n.Root());
return t.loadSync(e);
};
n.encoder = e(14);
n.decoder = e(13);
n.verifier = e(40);
n.converter = e(12);
n.ReflectionObject = e(24);
n.Namespace = e(23);
n.Root = e(29);
n.Enum = e(15);
n.Type = e(35);
n.Field = e(16);
n.OneOf = e(25);
n.MapField = e(20);
n.Service = e(33);
n.Method = e(22);
n.Message = e(21);
n.wrappers = e(41);
n.types = e(36);
n.util = e(37);
n.ReflectionObject._configure(n.Root);
n.Namespace._configure(n.Type, n.Service);
n.Root._configure(n.Type);
n.Field._configure(n.Type);
}, {
12: 12,
13: 13,
14: 14,
15: 15,
16: 16,
18: 18,
20: 20,
21: 21,
22: 22,
23: 23,
24: 24,
25: 25,
29: 29,
33: 33,
35: 35,
36: 36,
37: 37,
40: 40,
41: 41
} ],
18: [ function(e, t, n) {
var i = n;
i.build = "minimal";
i.Writer = e(42);
i.BufferWriter = e(43);
i.Reader = e(27);
i.BufferReader = e(28);
i.util = e(39);
i.rpc = e(31);
i.roots = e(30);
i.configure = o;
function o() {
i.Reader._configure(i.BufferReader);
i.util._configure();
}
i.Writer._configure(i.BufferWriter);
o();
}, {
27: 27,
28: 28,
30: 30,
31: 31,
39: 39,
42: 42,
43: 43
} ],
19: [ function(e, t) {
var n = t.exports = e(17);
n.build = "full";
n.tokenize = e(34);
n.parse = e(26);
n.common = e(11);
n.Root._configure(n.Type, n.parse, n.common);
}, {
11: 11,
17: 17,
26: 26,
34: 34
} ],
20: [ function(e, t) {
t.exports = r;
var n = e(16);
((r.prototype = Object.create(n.prototype)).constructor = r).className = "MapField";
var i = e(36), o = e(37);
function r(e, t, i, r, s, a) {
n.call(this, e, t, r, undefined, undefined, s, a);
if (!o.isString(i)) throw TypeError("keyType must be a string");
this.keyType = i;
this.resolvedKeyType = null;
this.map = !0;
}
r.fromJSON = function(e, t) {
return new r(e, t.id, t.keyType, t.type, t.options, t.comment);
};
r.prototype.toJSON = function(e) {
var t = !!e && Boolean(e.keepComments);
return o.toObject([ "keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : undefined ]);
};
r.prototype.resolve = function() {
if (this.resolved) return this;
if (i.mapKey[this.keyType] === undefined) throw Error("invalid key type: " + this.keyType);
return n.prototype.resolve.call(this);
};
r.d = function(e, t, n) {
"function" == typeof n ? n = o.decorateType(n).name : n && "object" === _typeof(n) && (n = o.decorateEnum(n).name);
return function(i, s) {
o.decorateType(i.constructor).add(new r(s, e, t, n));
};
};
}, {
16: 16,
36: 36,
37: 37
} ],
21: [ function(e, t) {
t.exports = i;
var n = e(39);
function i(e) {
if (e) for (var t = Object.keys(e), n = 0; n < t.length; ++n) this[t[n]] = e[t[n]];
}
i.create = function(e) {
return this.$type.create(e);
};
i.encode = function(e, t) {
return this.$type.encode(e, t);
};
i.encodeDelimited = function(e, t) {
return this.$type.encodeDelimited(e, t);
};
i.decode = function(e) {
return this.$type.decode(e);
};
i.decodeDelimited = function(e) {
return this.$type.decodeDelimited(e);
};
i.verify = function(e) {
return this.$type.verify(e);
};
i.fromObject = function(e) {
return this.$type.fromObject(e);
};
i.toObject = function(e, t) {
return this.$type.toObject(e, t);
};
i.prototype.toJSON = function() {
return this.$type.toObject(this, n.toJSONOptions);
};
}, {
39: 39
} ],
22: [ function(e, t) {
t.exports = o;
var n = e(24);
((o.prototype = Object.create(n.prototype)).constructor = o).className = "Method";
var i = e(37);
function o(e, t, o, r, s, a, l, c) {
if (i.isObject(s)) {
l = s;
s = a = undefined;
} else if (i.isObject(a)) {
l = a;
a = undefined;
}
if (t !== undefined && !i.isString(t)) throw TypeError("type must be a string");
if (!i.isString(o)) throw TypeError("requestType must be a string");
if (!i.isString(r)) throw TypeError("responseType must be a string");
n.call(this, e, l);
this.type = t || "rpc";
this.requestType = o;
this.requestStream = !!s || undefined;
this.responseType = r;
this.responseStream = !!a || undefined;
this.resolvedRequestType = null;
this.resolvedResponseType = null;
this.comment = c;
}
o.fromJSON = function(e, t) {
return new o(e, t.type, t.requestType, t.responseType, t.requestStream, t.responseStream, t.options, t.comment);
};
o.prototype.toJSON = function(e) {
var t = !!e && Boolean(e.keepComments);
return i.toObject([ "type", "rpc" !== this.type && this.type || undefined, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", t ? this.comment : undefined ]);
};
o.prototype.resolve = function() {
if (this.resolved) return this;
this.resolvedRequestType = this.parent.lookupType(this.requestType);
this.resolvedResponseType = this.parent.lookupType(this.responseType);
return n.prototype.resolve.call(this);
};
}, {
24: 24,
37: 37
} ],
23: [ function(e, t) {
t.exports = c;
var n = e(24);
((c.prototype = Object.create(n.prototype)).constructor = c).className = "Namespace";
var i, o, r = e(15), s = e(16), a = e(37);
c.fromJSON = function(e, t) {
return new c(e, t.options).addJSON(t.nested);
};
function l(e, t) {
if (!e || !e.length) return undefined;
for (var n = {}, i = 0; i < e.length; ++i) n[e[i].name] = e[i].toJSON(t);
return n;
}
c.arrayToJSON = l;
c.isReservedId = function(e, t) {
if (e) for (var n = 0; n < e.length; ++n) if ("string" != typeof e[n] && e[n][0] <= t && e[n][1] >= t) return !0;
return !1;
};
c.isReservedName = function(e, t) {
if (e) for (var n = 0; n < e.length; ++n) if (e[n] === t) return !0;
return !1;
};
function c(e, t) {
n.call(this, e, t);
this.nested = undefined;
this._nestedArray = null;
}
function f(e) {
e._nestedArray = null;
return e;
}
Object.defineProperty(c.prototype, "nestedArray", {
get: function() {
return this._nestedArray || (this._nestedArray = a.toArray(this.nested));
}
});
c.prototype.toJSON = function(e) {
return a.toObject([ "options", this.options, "nested", l(this.nestedArray, e) ]);
};
c.prototype.addJSON = function(e) {
if (e) for (var t, n = Object.keys(e), a = 0; a < n.length; ++a) {
t = e[n[a]];
this.add((t.fields !== undefined ? i.fromJSON : t.values !== undefined ? r.fromJSON : t.methods !== undefined ? o.fromJSON : t.id !== undefined ? s.fromJSON : c.fromJSON)(n[a], t));
}
return this;
};
c.prototype.get = function(e) {
return this.nested && this.nested[e] || null;
};
c.prototype.getEnum = function(e) {
if (this.nested && this.nested[e] instanceof r) return this.nested[e].values;
throw Error("no such enum: " + e);
};
c.prototype.add = function(e) {
if (!(e instanceof s && e.extend !== undefined || e instanceof i || e instanceof r || e instanceof o || e instanceof c)) throw TypeError("object must be a valid nested object");
if (this.nested) {
var t = this.get(e.name);
if (t) {
if (!(t instanceof c && e instanceof c) || t instanceof i || t instanceof o) throw Error("duplicate name '" + e.name + "' in " + this);
for (var n = t.nestedArray, a = 0; a < n.length; ++a) e.add(n[a]);
this.remove(t);
this.nested || (this.nested = {});
e.setOptions(t.options, !0);
}
} else this.nested = {};
this.nested[e.name] = e;
e.onAdd(this);
return f(this);
};
c.prototype.remove = function(e) {
if (!(e instanceof n)) throw TypeError("object must be a ReflectionObject");
if (e.parent !== this) throw Error(e + " is not a member of " + this);
delete this.nested[e.name];
Object.keys(this.nested).length || (this.nested = undefined);
e.onRemove(this);
return f(this);
};
c.prototype.define = function(e, t) {
if (a.isString(e)) e = e.split("."); else if (!Array.isArray(e)) throw TypeError("illegal path");
if (e && e.length && "" === e[0]) throw Error("path must be relative");
for (var n = this; e.length > 0; ) {
var i = e.shift();
if (n.nested && n.nested[i]) {
if (!((n = n.nested[i]) instanceof c)) throw Error("path conflicts with non-namespace objects");
} else n.add(n = new c(i));
}
t && n.addJSON(t);
return n;
};
c.prototype.resolveAll = function() {
for (var e = this.nestedArray, t = 0; t < e.length; ) e[t] instanceof c ? e[t++].resolveAll() : e[t++].resolve();
return this.resolve();
};
c.prototype.lookup = function(e, t, n) {
if ("boolean" == typeof t) {
n = t;
t = undefined;
} else t && !Array.isArray(t) && (t = [ t ]);
if (a.isString(e) && e.length) {
if ("." === e) return this.root;
e = e.split(".");
} else if (!e.length) return this;
if ("" === e[0]) return this.root.lookup(e.slice(1), t);
var i = this.get(e[0]);
if (i) {
if (1 === e.length) {
if (!t || t.indexOf(i.constructor) > -1) return i;
} else if (i instanceof c && (i = i.lookup(e.slice(1), t, !0))) return i;
} else for (var o = 0; o < this.nestedArray.length; ++o) if (this._nestedArray[o] instanceof c && (i = this._nestedArray[o].lookup(e, t, !0))) return i;
return null === this.parent || n ? null : this.parent.lookup(e, t);
};
c.prototype.lookupType = function(e) {
var t = this.lookup(e, [ i ]);
if (!t) throw Error("no such type: " + e);
return t;
};
c.prototype.lookupEnum = function(e) {
var t = this.lookup(e, [ r ]);
if (!t) throw Error("no such Enum '" + e + "' in " + this);
return t;
};
c.prototype.lookupTypeOrEnum = function(e) {
var t = this.lookup(e, [ i, r ]);
if (!t) throw Error("no such Type or Enum '" + e + "' in " + this);
return t;
};
c.prototype.lookupService = function(e) {
var t = this.lookup(e, [ o ]);
if (!t) throw Error("no such Service '" + e + "' in " + this);
return t;
};
c._configure = function(e, t) {
i = e;
o = t;
};
}, {
15: 15,
16: 16,
24: 24,
37: 37
} ],
24: [ function(e, t) {
t.exports = o;
o.className = "ReflectionObject";
var n, i = e(37);
function o(e, t) {
if (!i.isString(e)) throw TypeError("name must be a string");
if (t && !i.isObject(t)) throw TypeError("options must be an object");
this.options = t;
this.name = e;
this.parent = null;
this.resolved = !1;
this.comment = null;
this.filename = null;
}
Object.defineProperties(o.prototype, {
root: {
get: function() {
for (var e = this; null !== e.parent; ) e = e.parent;
return e;
}
},
fullName: {
get: function() {
for (var e = [ this.name ], t = this.parent; t; ) {
e.unshift(t.name);
t = t.parent;
}
return e.join(".");
}
}
});
o.prototype.toJSON = function() {
throw Error();
};
o.prototype.onAdd = function(e) {
this.parent && this.parent !== e && this.parent.remove(this);
this.parent = e;
this.resolved = !1;
var t = e.root;
t instanceof n && t._handleAdd(this);
};
o.prototype.onRemove = function(e) {
var t = e.root;
t instanceof n && t._handleRemove(this);
this.parent = null;
this.resolved = !1;
};
o.prototype.resolve = function() {
if (this.resolved) return this;
this.root instanceof n && (this.resolved = !0);
return this;
};
o.prototype.getOption = function(e) {
return this.options ? this.options[e] : undefined;
};
o.prototype.setOption = function(e, t, n) {
n && this.options && this.options[e] !== undefined || ((this.options || (this.options = {}))[e] = t);
return this;
};
o.prototype.setOptions = function(e, t) {
if (e) for (var n = Object.keys(e), i = 0; i < n.length; ++i) this.setOption(n[i], e[n[i]], t);
return this;
};
o.prototype.toString = function() {
var e = this.constructor.className, t = this.fullName;
return t.length ? e + " " + t : e;
};
o._configure = function(e) {
n = e;
};
}, {
37: 37
} ],
25: [ function(e, t) {
t.exports = r;
var n = e(24);
((r.prototype = Object.create(n.prototype)).constructor = r).className = "OneOf";
var i = e(16), o = e(37);
function r(e, t, i, o) {
if (!Array.isArray(t)) {
i = t;
t = undefined;
}
n.call(this, e, i);
if (t !== undefined && !Array.isArray(t)) throw TypeError("fieldNames must be an Array");
this.oneof = t || [];
this.fieldsArray = [];
this.comment = o;
}
r.fromJSON = function(e, t) {
return new r(e, t.oneof, t.options, t.comment);
};
r.prototype.toJSON = function(e) {
var t = !!e && Boolean(e.keepComments);
return o.toObject([ "options", this.options, "oneof", this.oneof, "comment", t ? this.comment : undefined ]);
};
function s(e) {
if (e.parent) for (var t = 0; t < e.fieldsArray.length; ++t) e.fieldsArray[t].parent || e.parent.add(e.fieldsArray[t]);
}
r.prototype.add = function(e) {
if (!(e instanceof i)) throw TypeError("field must be a Field");
e.parent && e.parent !== this.parent && e.parent.remove(e);
this.oneof.push(e.name);
this.fieldsArray.push(e);
e.partOf = this;
s(this);
return this;
};
r.prototype.remove = function(e) {
if (!(e instanceof i)) throw TypeError("field must be a Field");
var t = this.fieldsArray.indexOf(e);
if (t < 0) throw Error(e + " is not a member of " + this);
this.fieldsArray.splice(t, 1);
(t = this.oneof.indexOf(e.name)) > -1 && this.oneof.splice(t, 1);
e.partOf = null;
return this;
};
r.prototype.onAdd = function(e) {
n.prototype.onAdd.call(this, e);
for (var t = 0; t < this.oneof.length; ++t) {
var i = e.get(this.oneof[t]);
if (i && !i.partOf) {
i.partOf = this;
this.fieldsArray.push(i);
}
}
s(this);
};
r.prototype.onRemove = function(e) {
for (var t, i = 0; i < this.fieldsArray.length; ++i) (t = this.fieldsArray[i]).parent && t.parent.remove(t);
n.prototype.onRemove.call(this, e);
};
r.d = function() {
for (var e = new Array(arguments.length), t = 0; t < arguments.length; ) e[t] = arguments[t++];
return function(t, n) {
o.decorateType(t.constructor).add(new r(n, e));
Object.defineProperty(t, n, {
get: o.oneOfGetter(e),
set: o.oneOfSetter(e)
});
};
};
}, {
16: 16,
24: 24,
37: 37
} ],
26: [ function(e, t) {
t.exports = C;
C.filename = null;
C.defaults = {
keepCase: !1
};
var n = e(34), i = e(29), o = e(35), r = e(16), s = e(20), a = e(25), l = e(15), c = e(33), f = e(22), u = e(36), h = e(37), p = /^[1-9][0-9]*$/, d = /^-?[1-9][0-9]*$/, y = /^0[x][0-9a-fA-F]+$/, m = /^-?0[x][0-9a-fA-F]+$/, g = /^0[0-7]+$/, v = /^-?0[0-7]+$/, b = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/, w = /^[a-zA-Z_][a-zA-Z_0-9]*$/, S = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/, x = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
function C(e, t, k) {
if (!(t instanceof i)) {
k = t;
t = new i();
}
k || (k = C.defaults);
var _, A, O, E, B, I = n(e, k.alternateCommentMode || !1), N = I.next, j = I.push, T = I.peek, P = I.skip, R = I.cmnt, F = !0, L = !1, M = t, D = k.keepCase ? function(e) {
return e;
} : h.camelCase;
function z(e, t, n) {
var i = C.filename;
n || (C.filename = null);
return Error("illegal " + (t || "token") + " '" + e + "' (" + (i ? i + ", " : "") + "line " + I.line + ")");
}
function W() {
var e, t = [];
do {
if ('"' !== (e = N()) && "'" !== e) throw z(e);
t.push(N());
P(e);
e = T();
} while ('"' === e || "'" === e);
return t.join("");
}
function K(e) {
var t = N();
switch (t) {
case "'":
case '"':
j(t);
return W();

case "true":
case "TRUE":
return !0;

case "false":
case "FALSE":
return !1;
}
try {
return G(t, !0);
} catch (n) {
if (e && S.test(t)) return t;
throw z(t, "value");
}
}
function q(e, t) {
var n, i;
do {
!t || '"' !== (n = T()) && "'" !== n ? e.push([ i = J(N()), P("to", !0) ? J(N()) : i ]) : e.push(W());
} while (P(",", !0));
P(";");
}
function G(e, t) {
var n = 1;
if ("-" === e.charAt(0)) {
n = -1;
e = e.substring(1);
}
switch (e) {
case "inf":
case "INF":
case "Inf":
return Infinity * n;

case "nan":
case "NAN":
case "Nan":
case "NaN":
return NaN;

case "0":
return 0;
}
if (p.test(e)) return n * parseInt(e, 10);
if (y.test(e)) return n * parseInt(e, 16);
if (g.test(e)) return n * parseInt(e, 8);
if (b.test(e)) return n * parseFloat(e);
throw z(e, "number", t);
}
function J(e, t) {
switch (e) {
case "max":
case "MAX":
case "Max":
return 536870911;

case "0":
return 0;
}
if (!t && "-" === e.charAt(0)) throw z(e, "id");
if (d.test(e)) return parseInt(e, 10);
if (m.test(e)) return parseInt(e, 16);
if (v.test(e)) return parseInt(e, 8);
throw z(e, "id");
}
function H() {
if (_ !== undefined) throw z("package");
_ = N();
if (!S.test(_)) throw z(_, "name");
M = M.define(_);
P(";");
}
function U() {
var e, t = T();
switch (t) {
case "weak":
e = O || (O = []);
N();
break;

case "public":
N();

default:
e = A || (A = []);
}
t = W();
P(";");
e.push(t);
}
function X() {
P("=");
E = W();
if (!(L = "proto3" === E) && "proto2" !== E) throw z(E, "syntax");
P(";");
}
function V(e, t) {
switch (t) {
case "option":
oe(e, t);
P(";");
return !0;

case "message":
Y(e, t);
return !0;

case "enum":
ne(e, t);
return !0;

case "service":
le(e, t);
return !0;

case "extend":
fe(e, t);
return !0;
}
return !1;
}
function $(e, t, n) {
var i = I.line;
if (e) {
e.comment = R();
e.filename = C.filename;
}
if (P("{", !0)) {
for (var o; "}" !== (o = N()); ) t(o);
P(";", !0);
} else {
n && n();
P(";");
e && "string" != typeof e.comment && (e.comment = R(i));
}
}
function Y(e, t) {
if (!w.test(t = N())) throw z(t, "type name");
var n = new o(t);
$(n, function(e) {
if (!V(n, e)) switch (e) {
case "map":
ee(n);
break;

case "required":
case "optional":
case "repeated":
Z(n, e);
break;

case "oneof":
te(n, e);
break;

case "extensions":
q(n.extensions || (n.extensions = []));
break;

case "reserved":
q(n.reserved || (n.reserved = []), !0);
break;

default:
if (!L || !S.test(e)) throw z(e);
j(e);
Z(n, "optional");
}
});
e.add(n);
}
function Z(e, t, n) {
var i = N();
if ("group" !== i) {
if (!S.test(i)) throw z(i, "type");
var o = N();
if (!w.test(o)) throw z(o, "name");
o = D(o);
P("=");
var s = new r(o, J(N()), i, t, n);
$(s, function(e) {
if ("option" !== e) throw z(e);
oe(s, e);
P(";");
}, function() {
ae(s);
});
e.add(s);
L || !s.repeated || u.packed[i] === undefined && u.basic[i] !== undefined || s.setOption("packed", !1, !0);
} else Q(e, t);
}
function Q(e, t) {
var n = N();
if (!w.test(n)) throw z(n, "name");
var i = h.lcFirst(n);
n === i && (n = h.ucFirst(n));
P("=");
var s = J(N()), a = new o(n);
a.group = !0;
var l = new r(i, s, n, t);
l.filename = C.filename;
$(a, function(e) {
switch (e) {
case "option":
oe(a, e);
P(";");
break;

case "required":
case "optional":
case "repeated":
Z(a, e);
break;

default:
throw z(e);
}
});
e.add(a).add(l);
}
function ee(e) {
P("<");
var t = N();
if (u.mapKey[t] === undefined) throw z(t, "type");
P(",");
var n = N();
if (!S.test(n)) throw z(n, "type");
P(">");
var i = N();
if (!w.test(i)) throw z(i, "name");
P("=");
var o = new s(D(i), J(N()), t, n);
$(o, function(e) {
if ("option" !== e) throw z(e);
oe(o, e);
P(";");
}, function() {
ae(o);
});
e.add(o);
}
function te(e, t) {
if (!w.test(t = N())) throw z(t, "name");
var n = new a(D(t));
$(n, function(e) {
if ("option" === e) {
oe(n, e);
P(";");
} else {
j(e);
Z(n, "optional");
}
});
e.add(n);
}
function ne(e, t) {
if (!w.test(t = N())) throw z(t, "name");
var n = new l(t);
$(n, function(e) {
switch (e) {
case "option":
oe(n, e);
P(";");
break;

case "reserved":
q(n.reserved || (n.reserved = []), !0);
break;

default:
ie(n, e);
}
});
e.add(n);
}
function ie(e, t) {
if (!w.test(t)) throw z(t, "name");
P("=");
var n = J(N(), !0), i = {};
$(i, function(e) {
if ("option" !== e) throw z(e);
oe(i, e);
P(";");
}, function() {
ae(i);
});
e.add(t, n, i.comment);
}
function oe(e, t) {
var n = P("(", !0);
if (!S.test(t = N())) throw z(t, "name");
var i = t;
if (n) {
P(")");
i = "(" + i + ")";
t = T();
if (x.test(t)) {
i += t;
N();
}
}
P("=");
re(e, i);
}
function re(e, t) {
if (P("{", !0)) do {
if (!w.test(B = N())) throw z(B, "name");
if ("{" === T()) re(e, t + "." + B); else {
P(":");
"{" === T() ? re(e, t + "." + B) : se(e, t + "." + B, K(!0));
}
} while (!P("}", !0)); else se(e, t, K(!0));
}
function se(e, t, n) {
e.setOption && e.setOption(t, n);
}
function ae(e) {
if (P("[", !0)) {
do {
oe(e, "option");
} while (P(",", !0));
P("]");
}
return e;
}
function le(e, t) {
if (!w.test(t = N())) throw z(t, "service name");
var n = new c(t);
$(n, function(e) {
if (!V(n, e)) {
if ("rpc" !== e) throw z(e);
ce(n, e);
}
});
e.add(n);
}
function ce(e, t) {
var n = t;
if (!w.test(t = N())) throw z(t, "name");
var i, o, r, s, a = t;
P("(");
P("stream", !0) && (o = !0);
if (!S.test(t = N())) throw z(t);
i = t;
P(")");
P("returns");
P("(");
P("stream", !0) && (s = !0);
if (!S.test(t = N())) throw z(t);
r = t;
P(")");
var l = new f(a, n, i, r, o, s);
$(l, function(e) {
if ("option" !== e) throw z(e);
oe(l, e);
P(";");
});
e.add(l);
}
function fe(e, t) {
if (!S.test(t = N())) throw z(t, "reference");
var n = t;
$(null, function(t) {
switch (t) {
case "required":
case "repeated":
case "optional":
Z(e, t, n);
break;

default:
if (!L || !S.test(t)) throw z(t);
j(t);
Z(e, "optional", n);
}
});
}
for (;null !== (B = N()); ) switch (B) {
case "package":
if (!F) throw z(B);
H();
break;

case "import":
if (!F) throw z(B);
U();
break;

case "syntax":
if (!F) throw z(B);
X();
break;

case "option":
if (!F) throw z(B);
oe(M, B);
P(";");
break;

default:
if (V(M, B)) {
F = !1;
continue;
}
throw z(B);
}
C.filename = null;
return {
package: _,
imports: A,
weakImports: O,
syntax: E,
root: t
};
}
}, {
15: 15,
16: 16,
20: 20,
22: 22,
25: 25,
29: 29,
33: 33,
34: 34,
35: 35,
36: 36,
37: 37
} ],
27: [ function(e, t) {
t.exports = a;
var n, i = e(39), o = i.LongBits, r = i.utf8;
function s(e, t) {
return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len);
}
function a(e) {
this.buf = e;
this.pos = 0;
this.len = e.length;
}
var l, c = "undefined" != typeof Uint8Array ? function(e) {
if (e instanceof Uint8Array || Array.isArray(e)) return new a(e);
throw Error("illegal buffer");
} : function(e) {
if (Array.isArray(e)) return new a(e);
throw Error("illegal buffer");
};
a.create = i.Buffer ? function(e) {
return (a.create = function(e) {
return i.Buffer.isBuffer(e) ? new n(e) : c(e);
})(e);
} : c;
a.prototype._slice = i.Array.prototype.subarray || i.Array.prototype.slice;
a.prototype.uint32 = (l = 4294967295, function() {
l = (127 & this.buf[this.pos]) >>> 0;
if (this.buf[this.pos++] < 128) return l;
l = (l | (127 & this.buf[this.pos]) << 7) >>> 0;
if (this.buf[this.pos++] < 128) return l;
l = (l | (127 & this.buf[this.pos]) << 14) >>> 0;
if (this.buf[this.pos++] < 128) return l;
l = (l | (127 & this.buf[this.pos]) << 21) >>> 0;
if (this.buf[this.pos++] < 128) return l;
l = (l | (15 & this.buf[this.pos]) << 28) >>> 0;
if (this.buf[this.pos++] < 128) return l;
if ((this.pos += 5) > this.len) {
this.pos = this.len;
throw s(this, 10);
}
return l;
});
a.prototype.int32 = function() {
return 0 | this.uint32();
};
a.prototype.sint32 = function() {
var e = this.uint32();
return e >>> 1 ^ -(1 & e) | 0;
};
function f() {
var e = new o(0, 0), t = 0;
if (!(this.len - this.pos > 4)) {
for (;t < 3; ++t) {
if (this.pos >= this.len) throw s(this);
e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0;
if (this.buf[this.pos++] < 128) return e;
}
e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0;
return e;
}
for (;t < 4; ++t) {
e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0;
if (this.buf[this.pos++] < 128) return e;
}
e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0;
e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0;
if (this.buf[this.pos++] < 128) return e;
t = 0;
if (this.len - this.pos > 4) for (;t < 5; ++t) {
e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0;
if (this.buf[this.pos++] < 128) return e;
} else for (;t < 5; ++t) {
if (this.pos >= this.len) throw s(this);
e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0;
if (this.buf[this.pos++] < 128) return e;
}
throw Error("invalid varint encoding");
}
a.prototype.bool = function() {
return 0 !== this.uint32();
};
function u(e, t) {
return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}
a.prototype.fixed32 = function() {
if (this.pos + 4 > this.len) throw s(this, 4);
return u(this.buf, this.pos += 4);
};
a.prototype.sfixed32 = function() {
if (this.pos + 4 > this.len) throw s(this, 4);
return 0 | u(this.buf, this.pos += 4);
};
function h() {
if (this.pos + 8 > this.len) throw s(this, 8);
return new o(u(this.buf, this.pos += 4), u(this.buf, this.pos += 4));
}
a.prototype.float = function() {
if (this.pos + 4 > this.len) throw s(this, 4);
var e = i.float.readFloatLE(this.buf, this.pos);
this.pos += 4;
return e;
};
a.prototype.double = function() {
if (this.pos + 8 > this.len) throw s(this, 4);
var e = i.float.readDoubleLE(this.buf, this.pos);
this.pos += 8;
return e;
};
a.prototype.bytes = function() {
var e = this.uint32(), t = this.pos, n = this.pos + e;
if (n > this.len) throw s(this, e);
this.pos += e;
return Array.isArray(this.buf) ? this.buf.slice(t, n) : t === n ? new this.buf.constructor(0) : this._slice.call(this.buf, t, n);
};
a.prototype.string = function() {
var e = this.bytes();
return r.read(e, 0, e.length);
};
a.prototype.skip = function(e) {
if ("number" == typeof e) {
if (this.pos + e > this.len) throw s(this, e);
this.pos += e;
} else do {
if (this.pos >= this.len) throw s(this);
} while (128 & this.buf[this.pos++]);
return this;
};
a.prototype.skipType = function(e) {
switch (e) {
case 0:
this.skip();
break;

case 1:
this.skip(8);
break;

case 2:
this.skip(this.uint32());
break;

case 3:
for (;4 != (e = 7 & this.uint32()); ) this.skipType(e);
break;

case 5:
this.skip(4);
break;

default:
throw Error("invalid wire type " + e + " at offset " + this.pos);
}
return this;
};
a._configure = function(e) {
n = e;
var t = i.Long ? "toLong" : "toNumber";
i.merge(a.prototype, {
int64: function() {
return f.call(this)[t](!1);
},
uint64: function() {
return f.call(this)[t](!0);
},
sint64: function() {
return f.call(this).zzDecode()[t](!1);
},
fixed64: function() {
return h.call(this)[t](!0);
},
sfixed64: function() {
return h.call(this)[t](!1);
}
});
};
}, {
39: 39
} ],
28: [ function(e, t) {
t.exports = o;
var n = e(27);
(o.prototype = Object.create(n.prototype)).constructor = o;
var i = e(39);
function o(e) {
n.call(this, e);
}
i.Buffer && (o.prototype._slice = i.Buffer.prototype.slice);
o.prototype.string = function() {
var e = this.uint32();
return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len));
};
}, {
27: 27,
39: 39
} ],
29: [ function(e, t) {
t.exports = f;
var n = e(23);
((f.prototype = Object.create(n.prototype)).constructor = f).className = "Root";
var i, o, r, s = e(16), a = e(15), l = e(25), c = e(37);
function f(e) {
n.call(this, "", e);
this.deferred = [];
this.files = [];
}
f.fromJSON = function(e, t) {
t || (t = new f());
e.options && t.setOptions(e.options);
return t.addJSON(e.nested);
};
f.prototype.resolvePath = c.path.resolve;
function u() {}
f.prototype.load = function e(t, n, i) {
if ("function" == typeof n) {
i = n;
n = undefined;
}
var s = this;
if (!i) return c.asPromise(e, s, t, n);
var a = i === u;
function l(e, t) {
if (i) {
var n = i;
i = null;
if (a) throw e;
n(e, t);
}
}
function f(e, t) {
try {
c.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t));
if (c.isString(t)) {
o.filename = e;
var i, r = o(t, s, n), f = 0;
if (r.imports) for (;f < r.imports.length; ++f) (i = s.resolvePath(e, r.imports[f])) && h(i);
if (r.weakImports) for (f = 0; f < r.weakImports.length; ++f) (i = s.resolvePath(e, r.weakImports[f])) && h(i, !0);
} else s.setOptions(t.options).addJSON(t.nested);
} catch (e) {
l(e);
}
a || p || l(null, s);
}
function h(e, t) {
var n = e.lastIndexOf("google/protobuf/");
if (n > -1) {
var o = e.substring(n);
o in r && (e = o);
}
if (!(s.files.indexOf(e) > -1)) {
s.files.push(e);
if (e in r) if (a) f(e, r[e]); else {
++p;
setTimeout(function() {
--p;
f(e, r[e]);
});
} else if (a) {
var u;
try {
u = c.fs.readFileSync(e).toString("utf8");
} catch (e) {
t || l(e);
return;
}
f(e, u);
} else {
++p;
c.fetch(e, function(n, o) {
--p;
i && (n ? t ? p || l(null, s) : l(n) : f(e, o));
});
}
}
}
var p = 0;
c.isString(t) && (t = [ t ]);
for (var d, y = 0; y < t.length; ++y) (d = s.resolvePath("", t[y])) && h(d);
if (a) return s;
p || l(null, s);
return undefined;
};
f.prototype.loadSync = function(e, t) {
if (!c.isNode) throw Error("not supported");
return this.load(e, t, u);
};
f.prototype.resolveAll = function() {
if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function(e) {
return "'extend " + e.extend + "' in " + e.parent.fullName;
}).join(", "));
return n.prototype.resolveAll.call(this);
};
var h = /^[A-Z]/;
function p(e, t) {
var n = t.parent.lookup(t.extend);
if (n) {
var i = new s(t.fullName, t.id, t.type, t.rule, undefined, t.options);
i.declaringField = t;
t.extensionField = i;
n.add(i);
return !0;
}
return !1;
}
f.prototype._handleAdd = function(e) {
if (e instanceof s) e.extend === undefined || e.extensionField || p(0, e) || this.deferred.push(e); else if (e instanceof a) h.test(e.name) && (e.parent[e.name] = e.values); else if (!(e instanceof l)) {
if (e instanceof i) for (var t = 0; t < this.deferred.length; ) p(0, this.deferred[t]) ? this.deferred.splice(t, 1) : ++t;
for (var n = 0; n < e.nestedArray.length; ++n) this._handleAdd(e._nestedArray[n]);
h.test(e.name) && (e.parent[e.name] = e);
}
};
f.prototype._handleRemove = function(e) {
if (e instanceof s) {
if (e.extend !== undefined) if (e.extensionField) {
e.extensionField.parent.remove(e.extensionField);
e.extensionField = null;
} else {
var t = this.deferred.indexOf(e);
t > -1 && this.deferred.splice(t, 1);
}
} else if (e instanceof a) h.test(e.name) && delete e.parent[e.name]; else if (e instanceof n) {
for (var i = 0; i < e.nestedArray.length; ++i) this._handleRemove(e._nestedArray[i]);
h.test(e.name) && delete e.parent[e.name];
}
};
f._configure = function(e, t, n) {
i = e;
o = t;
r = n;
};
}, {
15: 15,
16: 16,
23: 23,
25: 25,
37: 37
} ],
30: [ function(e, t) {
t.exports = {};
}, {} ],
31: [ function(e, t, n) {
n.Service = e(32);
}, {
32: 32
} ],
32: [ function(e, t) {
t.exports = i;
var n = e(39);
(i.prototype = Object.create(n.EventEmitter.prototype)).constructor = i;
function i(e, t, i) {
if ("function" != typeof e) throw TypeError("rpcImpl must be a function");
n.EventEmitter.call(this);
this.rpcImpl = e;
this.requestDelimited = Boolean(t);
this.responseDelimited = Boolean(i);
}
i.prototype.rpcCall = function e(t, i, o, r, s) {
if (!r) throw TypeError("request must be specified");
var a = this;
if (!s) return n.asPromise(e, a, t, i, o, r);
if (!a.rpcImpl) {
setTimeout(function() {
s(Error("already ended"));
}, 0);
return undefined;
}
try {
return a.rpcImpl(t, i[a.requestDelimited ? "encodeDelimited" : "encode"](r).finish(), function(e, n) {
if (e) {
a.emit("error", e, t);
return s(e);
}
if (null === n) {
a.end(!0);
return undefined;
}
if (!(n instanceof o)) try {
n = o[a.responseDelimited ? "decodeDelimited" : "decode"](n);
} catch (e) {
a.emit("error", e, t);
return s(e);
}
a.emit("data", n, t);
return s(null, n);
});
} catch (e) {
a.emit("error", e, t);
setTimeout(function() {
s(e);
}, 0);
return undefined;
}
};
i.prototype.end = function(e) {
if (this.rpcImpl) {
e || this.rpcImpl(null, null, null);
this.rpcImpl = null;
this.emit("end").off();
}
return this;
};
}, {
39: 39
} ],
33: [ function(e, t) {
t.exports = s;
var n = e(23);
((s.prototype = Object.create(n.prototype)).constructor = s).className = "Service";
var i = e(22), o = e(37), r = e(31);
function s(e, t) {
n.call(this, e, t);
this.methods = {};
this._methodsArray = null;
}
s.fromJSON = function(e, t) {
var n = new s(e, t.options);
if (t.methods) for (var o = Object.keys(t.methods), r = 0; r < o.length; ++r) n.add(i.fromJSON(o[r], t.methods[o[r]]));
t.nested && n.addJSON(t.nested);
n.comment = t.comment;
return n;
};
s.prototype.toJSON = function(e) {
var t = n.prototype.toJSON.call(this, e), i = !!e && Boolean(e.keepComments);
return o.toObject([ "options", t && t.options || undefined, "methods", n.arrayToJSON(this.methodsArray, e) || {}, "nested", t && t.nested || undefined, "comment", i ? this.comment : undefined ]);
};
Object.defineProperty(s.prototype, "methodsArray", {
get: function() {
return this._methodsArray || (this._methodsArray = o.toArray(this.methods));
}
});
function a(e) {
e._methodsArray = null;
return e;
}
s.prototype.get = function(e) {
return this.methods[e] || n.prototype.get.call(this, e);
};
s.prototype.resolveAll = function() {
for (var e = this.methodsArray, t = 0; t < e.length; ++t) e[t].resolve();
return n.prototype.resolve.call(this);
};
s.prototype.add = function(e) {
if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);
if (e instanceof i) {
this.methods[e.name] = e;
e.parent = this;
return a(this);
}
return n.prototype.add.call(this, e);
};
s.prototype.remove = function(e) {
if (e instanceof i) {
if (this.methods[e.name] !== e) throw Error(e + " is not a member of " + this);
delete this.methods[e.name];
e.parent = null;
return a(this);
}
return n.prototype.remove.call(this, e);
};
s.prototype.create = function(e, t, n) {
for (var i, s = new r.Service(e, t, n), a = 0; a < this.methodsArray.length; ++a) {
var l = o.lcFirst((i = this._methodsArray[a]).resolve().name).replace(/[^$\w_]/g, "");
s[l] = o.codegen([ "r", "c" ], o.isReserved(l) ? l + "_" : l)("return this.rpcCall(m,q,s,r,c)")({
m: i,
q: i.resolvedRequestType.ctor,
s: i.resolvedResponseType.ctor
});
}
return s;
};
}, {
22: 22,
23: 23,
31: 31,
37: 37
} ],
34: [ function(e, t) {
t.exports = h;
var n = /[\s{}=;:[\],'"()<>]/g, i = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g, o = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g, r = /^ *[*\/]+ */, s = /^\s*\*?\/*/, a = /\n/g, l = /\s/, c = /\\(.?)/g, f = {
0: "\0",
r: "\r",
n: "\n",
t: "\t"
};
function u(e) {
return e.replace(c, function(e, t) {
switch (t) {
case "\\":
case "":
return t;

default:
return f[t] || "";
}
});
}
h.unescape = u;
function h(e, t) {
e = e.toString();
var c = 0, f = e.length, h = 1, p = null, d = null, y = 0, m = !1, g = [], v = null;
function b(e) {
return Error("illegal " + e + " (line " + h + ")");
}
function w() {
var t = "'" === v ? o : i;
t.lastIndex = c - 1;
var n = t.exec(e);
if (!n) throw b("string");
c = t.lastIndex;
A(v);
v = null;
return u(n[1]);
}
function S(t) {
return e.charAt(t);
}
function x(n, i) {
p = e.charAt(n++);
y = h;
m = !1;
var o, l = n - (t ? 2 : 3);
do {
if (--l < 0 || "\n" === (o = e.charAt(l))) {
m = !0;
break;
}
} while (" " === o || "\t" === o);
for (var c = e.substring(n, i).split(a), f = 0; f < c.length; ++f) c[f] = c[f].replace(t ? s : r, "").trim();
d = c.join("\n").trim();
}
function C(t) {
var n = k(t), i = e.substring(t, n);
return /^\s*\/{1,2}/.test(i);
}
function k(e) {
for (var t = e; t < f && "\n" !== S(t); ) t++;
return t;
}
function _() {
if (g.length > 0) return g.shift();
if (v) return w();
var i, o, r, s, a;
do {
if (c === f) return null;
i = !1;
for (;l.test(r = S(c)); ) {
"\n" === r && ++h;
if (++c === f) return null;
}
if ("/" === S(c)) {
if (++c === f) throw b("comment");
if ("/" === S(c)) if (t) {
s = c;
a = !1;
if (C(c)) {
a = !0;
do {
if ((c = k(c)) === f) break;
c++;
} while (C(c));
} else c = Math.min(f, k(c) + 1);
a && x(s, c);
h++;
i = !0;
} else {
a = "/" === S(s = c + 1);
for (;"\n" !== S(++c); ) if (c === f) return null;
++c;
a && x(s, c - 1);
++h;
i = !0;
} else {
if ("*" !== (r = S(c))) return "/";
s = c + 1;
a = t || "*" === S(s);
do {
"\n" === r && ++h;
if (++c === f) throw b("comment");
o = r;
r = S(c);
} while ("*" !== o || "/" !== r);
++c;
a && x(s, c - 2);
i = !0;
}
}
} while (i);
var u = c;
n.lastIndex = 0;
if (!n.test(S(u++))) for (;u < f && !n.test(S(u)); ) ++u;
var p = e.substring(c, c = u);
'"' !== p && "'" !== p || (v = p);
return p;
}
function A(e) {
g.push(e);
}
function O() {
if (!g.length) {
var e = _();
if (null === e) return null;
A(e);
}
return g[0];
}
return Object.defineProperty({
next: _,
peek: O,
push: A,
skip: function(e, t) {
var n = O();
if (n === e) {
_();
return !0;
}
if (!t) throw b("token '" + n + "', '" + e + "' expected");
return !1;
},
cmnt: function(e) {
var n = null;
if (e === undefined) y === h - 1 && (t || "*" === p || m) && (n = d); else {
y < e && O();
y !== e || m || !t && "/" !== p || (n = d);
}
return n;
}
}, "line", {
get: function() {
return h;
}
});
}
}, {} ],
35: [ function(e, t) {
t.exports = g;
var n = e(23);
((g.prototype = Object.create(n.prototype)).constructor = g).className = "Type";
var i = e(15), o = e(25), r = e(16), s = e(20), a = e(33), l = e(21), c = e(27), f = e(42), u = e(37), h = e(14), p = e(13), d = e(40), y = e(12), m = e(41);
function g(e, t) {
n.call(this, e, t);
this.fields = {};
this.oneofs = undefined;
this.extensions = undefined;
this.reserved = undefined;
this.group = undefined;
this._fieldsById = null;
this._fieldsArray = null;
this._oneofsArray = null;
this._ctor = null;
}
Object.defineProperties(g.prototype, {
fieldsById: {
get: function() {
if (this._fieldsById) return this._fieldsById;
this._fieldsById = {};
for (var e = Object.keys(this.fields), t = 0; t < e.length; ++t) {
var n = this.fields[e[t]], i = n.id;
if (this._fieldsById[i]) throw Error("duplicate id " + i + " in " + this);
this._fieldsById[i] = n;
}
return this._fieldsById;
}
},
fieldsArray: {
get: function() {
return this._fieldsArray || (this._fieldsArray = u.toArray(this.fields));
}
},
oneofsArray: {
get: function() {
return this._oneofsArray || (this._oneofsArray = u.toArray(this.oneofs));
}
},
ctor: {
get: function() {
return this._ctor || (this.ctor = g.generateConstructor(this)());
},
set: function(e) {
var t = e.prototype;
if (!(t instanceof l)) {
(e.prototype = new l()).constructor = e;
u.merge(e.prototype, t);
}
e.$type = e.prototype.$type = this;
u.merge(e, l, !0);
this._ctor = e;
for (var n = 0; n < this.fieldsArray.length; ++n) this._fieldsArray[n].resolve();
var i = {};
for (n = 0; n < this.oneofsArray.length; ++n) i[this._oneofsArray[n].resolve().name] = {
get: u.oneOfGetter(this._oneofsArray[n].oneof),
set: u.oneOfSetter(this._oneofsArray[n].oneof)
};
n && Object.defineProperties(e.prototype, i);
}
}
});
g.generateConstructor = function(e) {
for (var t, n = u.codegen([ "p" ], e.name), i = 0; i < e.fieldsArray.length; ++i) (t = e._fieldsArray[i]).map ? n("this%s={}", u.safeProp(t.name)) : t.repeated && n("this%s=[]", u.safeProp(t.name));
return n("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
};
function v(e) {
e._fieldsById = e._fieldsArray = e._oneofsArray = null;
delete e.encode;
delete e.decode;
delete e.verify;
return e;
}
g.fromJSON = function(e, t) {
var l = new g(e, t.options);
l.extensions = t.extensions;
l.reserved = t.reserved;
for (var c = Object.keys(t.fields), f = 0; f < c.length; ++f) l.add(("undefined" != typeof t.fields[c[f]].keyType ? s.fromJSON : r.fromJSON)(c[f], t.fields[c[f]]));
if (t.oneofs) for (c = Object.keys(t.oneofs), f = 0; f < c.length; ++f) l.add(o.fromJSON(c[f], t.oneofs[c[f]]));
if (t.nested) for (c = Object.keys(t.nested), f = 0; f < c.length; ++f) {
var u = t.nested[c[f]];
l.add((u.id !== undefined ? r.fromJSON : u.fields !== undefined ? g.fromJSON : u.values !== undefined ? i.fromJSON : u.methods !== undefined ? a.fromJSON : n.fromJSON)(c[f], u));
}
t.extensions && t.extensions.length && (l.extensions = t.extensions);
t.reserved && t.reserved.length && (l.reserved = t.reserved);
t.group && (l.group = !0);
t.comment && (l.comment = t.comment);
return l;
};
g.prototype.toJSON = function(e) {
var t = n.prototype.toJSON.call(this, e), i = !!e && Boolean(e.keepComments);
return u.toObject([ "options", t && t.options || undefined, "oneofs", n.arrayToJSON(this.oneofsArray, e), "fields", n.arrayToJSON(this.fieldsArray.filter(function(e) {
return !e.declaringField;
}), e) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : undefined, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "group", this.group || undefined, "nested", t && t.nested || undefined, "comment", i ? this.comment : undefined ]);
};
g.prototype.resolveAll = function() {
for (var e = this.fieldsArray, t = 0; t < e.length; ) e[t++].resolve();
var i = this.oneofsArray;
t = 0;
for (;t < i.length; ) i[t++].resolve();
return n.prototype.resolveAll.call(this);
};
g.prototype.get = function(e) {
return this.fields[e] || this.oneofs && this.oneofs[e] || this.nested && this.nested[e] || null;
};
g.prototype.add = function(e) {
if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);
if (e instanceof r && e.extend === undefined) {
if (this._fieldsById ? this._fieldsById[e.id] : this.fieldsById[e.id]) throw Error("duplicate id " + e.id + " in " + this);
if (this.isReservedId(e.id)) throw Error("id " + e.id + " is reserved in " + this);
if (this.isReservedName(e.name)) throw Error("name '" + e.name + "' is reserved in " + this);
e.parent && e.parent.remove(e);
this.fields[e.name] = e;
e.message = this;
e.onAdd(this);
return v(this);
}
if (e instanceof o) {
this.oneofs || (this.oneofs = {});
this.oneofs[e.name] = e;
e.onAdd(this);
return v(this);
}
return n.prototype.add.call(this, e);
};
g.prototype.remove = function(e) {
if (e instanceof r && e.extend === undefined) {
if (!this.fields || this.fields[e.name] !== e) throw Error(e + " is not a member of " + this);
delete this.fields[e.name];
e.parent = null;
e.onRemove(this);
return v(this);
}
if (e instanceof o) {
if (!this.oneofs || this.oneofs[e.name] !== e) throw Error(e + " is not a member of " + this);
delete this.oneofs[e.name];
e.parent = null;
e.onRemove(this);
return v(this);
}
return n.prototype.remove.call(this, e);
};
g.prototype.isReservedId = function(e) {
return n.isReservedId(this.reserved, e);
};
g.prototype.isReservedName = function(e) {
return n.isReservedName(this.reserved, e);
};
g.prototype.create = function(e) {
return new this.ctor(e);
};
g.prototype.setup = function() {
for (var e = this.fullName, t = [], n = 0; n < this.fieldsArray.length; ++n) t.push(this._fieldsArray[n].resolve().resolvedType);
this.encode = h(this)({
Writer: f,
types: t,
util: u
});
this.decode = p(this)({
Reader: c,
types: t,
util: u
});
this.verify = d(this)({
types: t,
util: u
});
this.fromObject = y.fromObject(this)({
types: t,
util: u
});
this.toObject = y.toObject(this)({
types: t,
util: u
});
var i = m[e];
if (i) {
var o = Object.create(this);
o.fromObject = this.fromObject;
this.fromObject = i.fromObject.bind(o);
o.toObject = this.toObject;
this.toObject = i.toObject.bind(o);
}
return this;
};
g.prototype.encode = function(e, t) {
return this.setup().encode(e, t);
};
g.prototype.encodeDelimited = function(e, t) {
return this.encode(e, t && t.len ? t.fork() : t).ldelim();
};
g.prototype.decode = function(e, t) {
return this.setup().decode(e, t);
};
g.prototype.decodeDelimited = function(e) {
e instanceof c || (e = c.create(e));
return this.decode(e, e.uint32());
};
g.prototype.verify = function(e) {
return this.setup().verify(e);
};
g.prototype.fromObject = function(e) {
return this.setup().fromObject(e);
};
g.prototype.toObject = function(e, t) {
return this.setup().toObject(e, t);
};
g.d = function(e) {
return function(t) {
u.decorateType(t, e);
};
};
}, {
12: 12,
13: 13,
14: 14,
15: 15,
16: 16,
20: 20,
21: 21,
23: 23,
25: 25,
27: 27,
33: 33,
37: 37,
40: 40,
41: 41,
42: 42
} ],
36: [ function(e, t, n) {
var i = n, o = e(37), r = [ "double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes" ];
function s(e, t) {
var n = 0, i = {};
t |= 0;
for (;n < e.length; ) i[r[n + t]] = e[n++];
return i;
}
i.basic = s([ 1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2 ]);
i.defaults = s([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", o.emptyArray, null ]);
i.long = s([ 0, 0, 0, 1, 1 ], 7);
i.mapKey = s([ 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2 ], 2);
i.packed = s([ 1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0 ]);
}, {
37: 37
} ],
37: [ function(e, t) {
var n, i, o = t.exports = e(39), r = e(30);
o.codegen = e(3);
o.fetch = e(5);
o.path = e(8);
o.fs = o.inquire("fs");
o.toArray = function(e) {
if (e) {
for (var t = Object.keys(e), n = new Array(t.length), i = 0; i < t.length; ) n[i] = e[t[i++]];
return n;
}
return [];
};
o.toObject = function(e) {
for (var t = {}, n = 0; n < e.length; ) {
var i = e[n++], o = e[n++];
o !== undefined && (t[i] = o);
}
return t;
};
var s = /\\/g, a = /"/g;
o.isReserved = function(e) {
return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e);
};
o.safeProp = function(e) {
return !/^[$\w_]+$/.test(e) || o.isReserved(e) ? '["' + e.replace(s, "\\\\").replace(a, '\\"') + '"]' : "." + e;
};
o.ucFirst = function(e) {
return e.charAt(0).toUpperCase() + e.substring(1);
};
var l = /_([a-z])/g;
o.camelCase = function(e) {
return e.substring(0, 1) + e.substring(1).replace(l, function(e, t) {
return t.toUpperCase();
});
};
o.compareFieldsById = function(e, t) {
return e.id - t.id;
};
o.decorateType = function(t, i) {
if (t.$type) {
if (i && t.$type.name !== i) {
o.decorateRoot.remove(t.$type);
t.$type.name = i;
o.decorateRoot.add(t.$type);
}
return t.$type;
}
n || (n = e(35));
var r = new n(i || t.name);
o.decorateRoot.add(r);
r.ctor = t;
Object.defineProperty(t, "$type", {
value: r,
enumerable: !1
});
Object.defineProperty(t.prototype, "$type", {
value: r,
enumerable: !1
});
return r;
};
var c = 0;
o.decorateEnum = function(t) {
if (t.$type) return t.$type;
i || (i = e(15));
var n = new i("Enum" + c++, t);
o.decorateRoot.add(n);
Object.defineProperty(t, "$type", {
value: n,
enumerable: !1
});
return n;
};
Object.defineProperty(o, "decorateRoot", {
get: function() {
return r.decorated || (r.decorated = new (e(29))());
}
});
}, {
15: 15,
29: 29,
3: 3,
30: 30,
35: 35,
39: 39,
5: 5,
8: 8
} ],
38: [ function(e, t) {
t.exports = i;
var n = e(39);
function i(e, t) {
this.lo = e >>> 0;
this.hi = t >>> 0;
}
var o = i.zero = new i(0, 0);
o.toNumber = function() {
return 0;
};
o.zzEncode = o.zzDecode = function() {
return this;
};
o.length = function() {
return 1;
};
var r = i.zeroHash = "\0\0\0\0\0\0\0\0";
i.fromNumber = function(e) {
if (0 === e) return o;
var t = e < 0;
t && (e = -e);
var n = e >>> 0, r = (e - n) / 4294967296 >>> 0;
if (t) {
r = ~r >>> 0;
n = ~n >>> 0;
if (++n > 4294967295) {
n = 0;
++r > 4294967295 && (r = 0);
}
}
return new i(n, r);
};
i.from = function(e) {
if ("number" == typeof e) return i.fromNumber(e);
if (n.isString(e)) {
if (!n.Long) return i.fromNumber(parseInt(e, 10));
e = n.Long.fromString(e);
}
return e.low || e.high ? new i(e.low >>> 0, e.high >>> 0) : o;
};
i.prototype.toNumber = function(e) {
if (!e && this.hi >>> 31) {
var t = 1 + ~this.lo >>> 0, n = ~this.hi >>> 0;
t || (n = n + 1 >>> 0);
return -(t + 4294967296 * n);
}
return this.lo + 4294967296 * this.hi;
};
i.prototype.toLong = function(e) {
return n.Long ? new n.Long(0 | this.lo, 0 | this.hi, Boolean(e)) : {
low: 0 | this.lo,
high: 0 | this.hi,
unsigned: Boolean(e)
};
};
var s = String.prototype.charCodeAt;
i.fromHash = function(e) {
return e === r ? o : new i((s.call(e, 0) | s.call(e, 1) << 8 | s.call(e, 2) << 16 | s.call(e, 3) << 24) >>> 0, (s.call(e, 4) | s.call(e, 5) << 8 | s.call(e, 6) << 16 | s.call(e, 7) << 24) >>> 0);
};
i.prototype.toHash = function() {
return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
};
i.prototype.zzEncode = function() {
var e = this.hi >> 31;
this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0;
this.lo = (this.lo << 1 ^ e) >>> 0;
return this;
};
i.prototype.zzDecode = function() {
var e = -(1 & this.lo);
this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0;
this.hi = (this.hi >>> 1 ^ e) >>> 0;
return this;
};
i.prototype.length = function() {
var e = this.lo, t = (this.lo >>> 28 | this.hi << 4) >>> 0, n = this.hi >>> 24;
return 0 === n ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : n < 128 ? 9 : 10;
};
}, {
39: 39
} ],
39: [ function(e, t, n) {
var i = n;
i.asPromise = e(1);
i.base64 = e(2);
i.EventEmitter = e(4);
i.float = e(6);
i.inquire = e(7);
i.utf8 = e(10);
i.pool = e(9);
i.LongBits = e(38);
i.emptyArray = Object.freeze ? Object.freeze([]) : [];
i.emptyObject = Object.freeze ? Object.freeze({}) : {};
i.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);
i.isInteger = Number.isInteger || function(e) {
return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
};
i.isString = function(e) {
return "string" == typeof e || e instanceof String;
};
i.isObject = function(e) {
return e && "object" === _typeof(e);
};
i.isset = i.isSet = function(e, t) {
var n = e[t];
return !(null == n || !e.hasOwnProperty(t)) && ("object" !== _typeof(n) || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0);
};
i.Buffer = function() {
try {
var e = i.inquire("buffer").Buffer;
return e.prototype.utf8Write ? e : null;
} catch (e) {
return null;
}
}();
i._Buffer_from = null;
i._Buffer_allocUnsafe = null;
i.newBuffer = function(e) {
return "number" == typeof e ? i.Buffer ? i._Buffer_allocUnsafe(e) : new i.Array(e) : i.Buffer ? i._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e);
};
i.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array;
i.Long = global.dcodeIO && global.dcodeIO.Long || i.inquire("long");
i.key2Re = /^true|false|0|1$/;
i.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
i.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
i.longToHash = function(e) {
return e ? i.LongBits.from(e).toHash() : i.LongBits.zeroHash;
};
i.longFromHash = function(e, t) {
var n = i.LongBits.fromHash(e);
return i.Long ? i.Long.fromBits(n.lo, n.hi, t) : n.toNumber(Boolean(t));
};
function o(e, t, n) {
for (var i = Object.keys(t), o = 0; o < i.length; ++o) e[i[o]] !== undefined && n || (e[i[o]] = t[i[o]]);
return e;
}
i.merge = o;
i.lcFirst = function(e) {
return e.charAt(0).toLowerCase() + e.substring(1);
};
function r(e) {
function t(e, n) {
if (!(this instanceof t)) return new t(e, n);
Object.defineProperty(this, "message", {
get: function() {
return e;
}
});
Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
value: new Error().stack || ""
});
n && o(this, n);
}
(t.prototype = Object.create(Error.prototype)).constructor = t;
Object.defineProperty(t.prototype, "name", {
get: function() {
return e;
}
});
t.prototype.toString = function() {
return this.name + ": " + this.message;
};
return t;
}
i.newError = r;
i.ProtocolError = r("ProtocolError");
i.oneOfGetter = function(e) {
for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = 1;
return function() {
for (var e = Object.keys(this), n = e.length - 1; n > -1; --n) if (1 === t[e[n]] && this[e[n]] !== undefined && null !== this[e[n]]) return e[n];
};
};
i.oneOfSetter = function(e) {
return function(t) {
for (var n = 0; n < e.length; ++n) e[n] !== t && delete this[e[n]];
};
};
i.toJSONOptions = {
longs: String,
enums: String,
bytes: String,
json: !0
};
i._configure = function() {
var e = i.Buffer;
if (e) {
i._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, n) {
return new e(t, n);
};
i._Buffer_allocUnsafe = e.allocUnsafe || function(t) {
return new e(t);
};
} else i._Buffer_from = i._Buffer_allocUnsafe = null;
};
}, {
1: 1,
10: 10,
2: 2,
38: 38,
4: 4,
6: 6,
7: 7,
9: 9
} ],
40: [ function(e, t) {
t.exports = function(e) {
var t = i.codegen([ "m" ], e.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected"), n = {};
e.oneofsArray.length && t("var p={}");
for (var a = 0; a < e.fieldsArray.length; ++a) {
var l = e._fieldsArray[a].resolve(), c = "m" + i.safeProp(l.name);
l.optional && t("if(%s!=null&&m.hasOwnProperty(%j)){", c, l.name);
if (l.map) {
t("if(!util.isObject(%s))", c)("return%j", o(l, "object"))("var k=Object.keys(%s)", c)("for(var i=0;i<k.length;++i){");
s(t, l, "k[i]");
r(t, l, a, c + "[k[i]]")("}");
} else if (l.repeated) {
t("if(!Array.isArray(%s))", c)("return%j", o(l, "array"))("for(var i=0;i<%s.length;++i){", c);
r(t, l, a, c + "[i]")("}");
} else {
if (l.partOf) {
var f = i.safeProp(l.partOf.name);
1 === n[l.partOf.name] && t("if(p%s===1)", f)("return%j", l.partOf.name + ": multiple values");
n[l.partOf.name] = 1;
t("p%s=1", f);
}
r(t, l, a, c);
}
l.optional && t("}");
}
return t("return null");
};
var n = e(15), i = e(37);
function o(e, t) {
return e.name + ": " + t + (e.repeated && "array" !== t ? "[]" : e.map && "object" !== t ? "{k:" + e.keyType + "}" : "") + " expected";
}
function r(e, t, i, r) {
if (t.resolvedType) if (t.resolvedType instanceof n) {
e("switch(%s){", r)("default:")("return%j", o(t, "enum value"));
for (var s = Object.keys(t.resolvedType.values), a = 0; a < s.length; ++a) e("case %i:", t.resolvedType.values[s[a]]);
e("break")("}");
} else e("{")("var e=types[%i].verify(%s);", i, r)("if(e)")("return%j+e", t.name + ".")("}"); else switch (t.type) {
case "int32":
case "uint32":
case "sint32":
case "fixed32":
case "sfixed32":
e("if(!util.isInteger(%s))", r)("return%j", o(t, "integer"));
break;

case "int64":
case "uint64":
case "sint64":
case "fixed64":
case "sfixed64":
e("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", r, r, r, r)("return%j", o(t, "integer|Long"));
break;

case "float":
case "double":
e('if(typeof %s!=="number")', r)("return%j", o(t, "number"));
break;

case "bool":
e('if(typeof %s!=="boolean")', r)("return%j", o(t, "boolean"));
break;

case "string":
e("if(!util.isString(%s))", r)("return%j", o(t, "string"));
break;

case "bytes":
e('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', r, r, r)("return%j", o(t, "buffer"));
}
return e;
}
function s(e, t, n) {
switch (t.keyType) {
case "int32":
case "uint32":
case "sint32":
case "fixed32":
case "sfixed32":
e("if(!util.key32Re.test(%s))", n)("return%j", o(t, "integer key"));
break;

case "int64":
case "uint64":
case "sint64":
case "fixed64":
case "sfixed64":
e("if(!util.key64Re.test(%s))", n)("return%j", o(t, "integer|Long key"));
break;

case "bool":
e("if(!util.key2Re.test(%s))", n)("return%j", o(t, "boolean key"));
}
return e;
}
}, {
15: 15,
37: 37
} ],
41: [ function(e, t, n) {
var i = n, o = e(21);
i[".google.protobuf.Any"] = {
fromObject: function(e) {
if (e && e["@type"]) {
var t = this.lookup(e["@type"]);
if (t) {
var n = "." === e["@type"].charAt(0) ? e["@type"].substr(1) : e["@type"];
return this.create({
type_url: "/" + n,
value: t.encode(t.fromObject(e)).finish()
});
}
}
return this.fromObject(e);
},
toObject: function(e, t) {
if (t && t.json && e.type_url && e.value) {
var n = e.type_url.substring(e.type_url.lastIndexOf("/") + 1), i = this.lookup(n);
i && (e = i.decode(e.value));
}
if (!(e instanceof this.ctor) && e instanceof o) {
var r = e.$type.toObject(e, t);
r["@type"] = e.$type.fullName;
return r;
}
return this.toObject(e, t);
}
};
}, {
21: 21
} ],
42: [ function(e, t) {
t.exports = f;
var n, i = e(39), o = i.LongBits, r = i.base64, s = i.utf8;
function a(e, t, n) {
this.fn = e;
this.len = t;
this.next = undefined;
this.val = n;
}
function l() {}
function c(e) {
this.head = e.head;
this.tail = e.tail;
this.len = e.len;
this.next = e.states;
}
function f() {
this.len = 0;
this.head = new a(l, 0, 0);
this.tail = this.head;
this.states = null;
}
f.create = i.Buffer ? function() {
return (f.create = function() {
return new n();
})();
} : function() {
return new f();
};
f.alloc = function(e) {
return new i.Array(e);
};
i.Array !== Array && (f.alloc = i.pool(f.alloc, i.Array.prototype.subarray));
f.prototype._push = function(e, t, n) {
this.tail = this.tail.next = new a(e, t, n);
this.len += t;
return this;
};
function u(e, t, n) {
t[n] = 255 & e;
}
function h(e, t) {
this.len = e;
this.next = undefined;
this.val = t;
}
h.prototype = Object.create(a.prototype);
h.prototype.fn = function(e, t, n) {
for (;e > 127; ) {
t[n++] = 127 & e | 128;
e >>>= 7;
}
t[n] = e;
};
f.prototype.uint32 = function(e) {
this.len += (this.tail = this.tail.next = new h((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len;
return this;
};
f.prototype.int32 = function(e) {
return e < 0 ? this._push(p, 10, o.fromNumber(e)) : this.uint32(e);
};
f.prototype.sint32 = function(e) {
return this.uint32((e << 1 ^ e >> 31) >>> 0);
};
function p(e, t, n) {
for (;e.hi; ) {
t[n++] = 127 & e.lo | 128;
e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0;
e.hi >>>= 7;
}
for (;e.lo > 127; ) {
t[n++] = 127 & e.lo | 128;
e.lo = e.lo >>> 7;
}
t[n++] = e.lo;
}
f.prototype.uint64 = function(e) {
var t = o.from(e);
return this._push(p, t.length(), t);
};
f.prototype.int64 = f.prototype.uint64;
f.prototype.sint64 = function(e) {
var t = o.from(e).zzEncode();
return this._push(p, t.length(), t);
};
f.prototype.bool = function(e) {
return this._push(u, 1, e ? 1 : 0);
};
function d(e, t, n) {
t[n] = 255 & e;
t[n + 1] = e >>> 8 & 255;
t[n + 2] = e >>> 16 & 255;
t[n + 3] = e >>> 24;
}
f.prototype.fixed32 = function(e) {
return this._push(d, 4, e >>> 0);
};
f.prototype.sfixed32 = f.prototype.fixed32;
f.prototype.fixed64 = function(e) {
var t = o.from(e);
return this._push(d, 4, t.lo)._push(d, 4, t.hi);
};
f.prototype.sfixed64 = f.prototype.fixed64;
f.prototype.float = function(e) {
return this._push(i.float.writeFloatLE, 4, e);
};
f.prototype.double = function(e) {
return this._push(i.float.writeDoubleLE, 8, e);
};
var y = i.Array.prototype.set ? function(e, t, n) {
t.set(e, n);
} : function(e, t, n) {
for (var i = 0; i < e.length; ++i) t[n + i] = e[i];
};
f.prototype.bytes = function(e) {
var t = e.length >>> 0;
if (!t) return this._push(u, 1, 0);
if (i.isString(e)) {
var n = f.alloc(t = r.length(e));
r.decode(e, n, 0);
e = n;
}
return this.uint32(t)._push(y, t, e);
};
f.prototype.string = function(e) {
var t = s.length(e);
return t ? this.uint32(t)._push(s.write, t, e) : this._push(u, 1, 0);
};
f.prototype.fork = function() {
this.states = new c(this);
this.head = this.tail = new a(l, 0, 0);
this.len = 0;
return this;
};
f.prototype.reset = function() {
if (this.states) {
this.head = this.states.head;
this.tail = this.states.tail;
this.len = this.states.len;
this.states = this.states.next;
} else {
this.head = this.tail = new a(l, 0, 0);
this.len = 0;
}
return this;
};
f.prototype.ldelim = function() {
var e = this.head, t = this.tail, n = this.len;
this.reset().uint32(n);
if (n) {
this.tail.next = e.next;
this.tail = t;
this.len += n;
}
return this;
};
f.prototype.finish = function() {
for (var e = this.head.next, t = this.constructor.alloc(this.len), n = 0; e; ) {
e.fn(e.val, t, n);
n += e.len;
e = e.next;
}
return t;
};
f._configure = function(e) {
n = e;
};
}, {
39: 39
} ],
43: [ function(e, t) {
t.exports = r;
var n = e(42);
(r.prototype = Object.create(n.prototype)).constructor = r;
var i = e(39), o = i.Buffer;
function r() {
n.call(this);
}
r.alloc = function(e) {
return (r.alloc = i._Buffer_allocUnsafe)(e);
};
var s = o && o.prototype instanceof Uint8Array && "set" === o.prototype.set.name ? function(e, t, n) {
t.set(e, n);
} : function(e, t, n) {
if (e.copy) e.copy(t, n, 0, e.length); else for (var i = 0; i < e.length; ) t[n++] = e[i++];
};
r.prototype.bytes = function(e) {
i.isString(e) && (e = i._Buffer_from(e, "base64"));
var t = e.length >>> 0;
this.uint32(t);
t && this._push(s, t, e);
return this;
};
function a(e, t, n) {
e.length < 40 ? i.utf8.write(e, t, n) : t.utf8Write(e, n);
}
r.prototype.string = function(e) {
var t = o.byteLength(e);
this.uint32(t);
t && this._push(a, t, e);
return this;
};
}, {
39: 39,
42: 42
} ]
}, {});
})("object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && window || "object" === ("undefined" == typeof self ? "undefined" : _typeof(self)) && self || void 0);
cc._RF.pop();
}, {
1: void 0,
10: void 0,
11: void 0,
12: void 0,
13: void 0,
14: void 0,
15: void 0,
16: void 0,
17: void 0,
18: void 0,
2: void 0,
20: void 0,
21: void 0,
22: void 0,
23: void 0,
24: void 0,
25: void 0,
26: void 0,
27: void 0,
28: void 0,
29: void 0,
3: void 0,
30: void 0,
31: void 0,
32: void 0,
33: void 0,
34: void 0,
35: void 0,
36: void 0,
37: void 0,
38: void 0,
39: void 0,
4: void 0,
40: void 0,
41: void 0,
42: void 0,
43: void 0,
5: void 0,
6: void 0,
7: void 0,
8: void 0,
9: void 0
} ],
"use_v2.0.x_cc.Toggle_event": [ function(e, t) {
"use strict";
cc._RF.push(t, "22346HXLqNDd6dt7jODMK+Y", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "AgentObj", "AllCard", "ArcSprite", "Arrow", "BaseSprite", "BeeSprite", "BloodBar", "Bomb", "BombScript", "BuffProcess", "Common", "Dictionary", "EffectSprite", "Game", "GameData", "GameProvider", "GiantSprite", "GunSprite", "HeroSprite", "KingSprite", "LightmanSprite", "LogSprite", "MenuScript", "MySprite", "Order1Sprite", "Order2Sprite", "Order9Sprite", "Result", "SelCard", "SelLayout", "SkeSprite", "SocketProvider", "SpriteIndex", "Welcome", "WizSprite", "Word3Sprite", "acdata1", "aniComponent", "protobuf" ]);