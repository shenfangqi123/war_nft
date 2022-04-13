
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scripts/AgentObj');
require('./assets/scripts/AllCard');
require('./assets/scripts/ArcSprite');
require('./assets/scripts/Arrow');
require('./assets/scripts/BaseSprite');
require('./assets/scripts/BeeSprite');
require('./assets/scripts/BloodBar');
require('./assets/scripts/Bomb');
require('./assets/scripts/BombScript');
require('./assets/scripts/BuffProcess');
require('./assets/scripts/Common');
require('./assets/scripts/CrabSprite');
require('./assets/scripts/Dictionary');
require('./assets/scripts/EffectSprite');
require('./assets/scripts/Game');
require('./assets/scripts/GameData');
require('./assets/scripts/GameProvider');
require('./assets/scripts/GiantSprite');
require('./assets/scripts/GunSprite');
require('./assets/scripts/HeroSprite');
require('./assets/scripts/KingSprite');
require('./assets/scripts/LightmanSprite');
require('./assets/scripts/LogSprite');
require('./assets/scripts/MenuScript');
require('./assets/scripts/MySprite');
require('./assets/scripts/NFTArcherSprite');
require('./assets/scripts/Order1Sprite');
require('./assets/scripts/Order2Sprite');
require('./assets/scripts/Order9Sprite');
require('./assets/scripts/Result');
require('./assets/scripts/SelCard');
require('./assets/scripts/SelLayout');
require('./assets/scripts/SkeSprite');
require('./assets/scripts/SocketProvider');
require('./assets/scripts/SpriteIndex');
require('./assets/scripts/Welcome');
require('./assets/scripts/WizSprite');
require('./assets/scripts/Word3Sprite');
require('./assets/scripts/acdata1');
require('./assets/scripts/aniComponent');
require('./assets/scripts/protobuf');

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