
(function () {
var scripts = [{"deps":{"./assets/scripts/ArcSprite":8,"./assets/scripts/Arrow":5,"./assets/scripts/BeeSprite":10,"./assets/scripts/AgentObj":39,"./assets/scripts/BaseSprite":29,"./assets/scripts/Bomb":16,"./assets/scripts/BuffProcess":14,"./assets/scripts/BloodBar":11,"./assets/scripts/BombScript":13,"./assets/scripts/Common":12,"./assets/scripts/CrabSprite":19,"./assets/scripts/Game":6,"./assets/scripts/GameData":17,"./assets/scripts/Dictionary":22,"./assets/scripts/GameProvider":40,"./assets/scripts/EffectSprite":15,"./assets/scripts/GunSprite":1,"./assets/scripts/HeroSprite":21,"./assets/scripts/KingSprite":18,"./assets/scripts/GiantSprite":27,"./assets/scripts/LightmanSprite":20,"./assets/scripts/LogSprite":23,"./assets/scripts/MySprite":28,"./assets/scripts/MenuScript":24,"./assets/scripts/NFTArcherSprite":26,"./assets/scripts/Order2Sprite":25,"./assets/scripts/Order1Sprite":30,"./assets/scripts/Result":33,"./assets/scripts/SelCard":31,"./assets/scripts/Order9Sprite":37,"./assets/scripts/SelLayout":3,"./assets/scripts/SkeSprite":32,"./assets/scripts/WizSprite":34,"./assets/scripts/SpriteIndex":35,"./assets/scripts/SocketProvider":4,"./assets/scripts/Welcome":2,"./assets/scripts/Word3Sprite":36,"./assets/scripts/acdata1":41,"./assets/scripts/aniComponent":38,"./assets/scripts/AllCard":9,"./assets/scripts/protobuf":42,"./assets/scripts/dragonbones/DragonBonesCtrl":44,"./assets/scripts/dragonbones/loadDragonBones/loadDragonBonesCtrl":45,"./assets/scripts/dragonbones/ReplaceSlotDisplay":43,"./assets/migration/use_v2.0.x_cc.Toggle_event":7},"path":"preview-scripts/__qc_index__.js"},{"deps":{"Common":12},"path":"preview-scripts/assets/scripts/GunSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Welcome.js"},{"deps":{},"path":"preview-scripts/assets/scripts/SelLayout.js"},{"deps":{"acdata1":41},"path":"preview-scripts/assets/scripts/SocketProvider.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Arrow.js"},{"deps":{"Common":12,"GameProvider":40,"Dictionary":22},"path":"preview-scripts/assets/scripts/Game.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{"MySprite":28,"Common":12},"path":"preview-scripts/assets/scripts/ArcSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AllCard.js"},{"deps":{"MySprite":28},"path":"preview-scripts/assets/scripts/BeeSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/BloodBar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Common.js"},{"deps":{},"path":"preview-scripts/assets/scripts/BombScript.js"},{"deps":{},"path":"preview-scripts/assets/scripts/BuffProcess.js"},{"deps":{},"path":"preview-scripts/assets/scripts/EffectSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Bomb.js"},{"deps":{},"path":"preview-scripts/assets/scripts/GameData.js"},{"deps":{"Common":12},"path":"preview-scripts/assets/scripts/KingSprite.js"},{"deps":{"MySprite":28,"Common":12},"path":"preview-scripts/assets/scripts/CrabSprite.js"},{"deps":{"MySprite":28},"path":"preview-scripts/assets/scripts/LightmanSprite.js"},{"deps":{"MySprite":28},"path":"preview-scripts/assets/scripts/HeroSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Dictionary.js"},{"deps":{},"path":"preview-scripts/assets/scripts/LogSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/MenuScript.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Order2Sprite.js"},{"deps":{"MySprite":28,"Common":12},"path":"preview-scripts/assets/scripts/NFTArcherSprite.js"},{"deps":{"MySprite":28},"path":"preview-scripts/assets/scripts/GiantSprite.js"},{"deps":{"Common":12,"AgentObj":39},"path":"preview-scripts/assets/scripts/MySprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/BaseSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Order1Sprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/SelCard.js"},{"deps":{"MySprite":28},"path":"preview-scripts/assets/scripts/SkeSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Result.js"},{"deps":{"MySprite":28,"Common":12},"path":"preview-scripts/assets/scripts/WizSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/SpriteIndex.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Word3Sprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Order9Sprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/aniComponent.js"},{"deps":{},"path":"preview-scripts/assets/scripts/AgentObj.js"},{"deps":{"Common":12,"SocketProvider":4},"path":"preview-scripts/assets/scripts/GameProvider.js"},{"deps":{"./protobuf.js":42},"path":"preview-scripts/assets/scripts/acdata1.js"},{"deps":{},"path":"preview-scripts/assets/scripts/protobuf.js"},{"deps":{},"path":"preview-scripts/assets/scripts/dragonbones/ReplaceSlotDisplay.js"},{"deps":{},"path":"preview-scripts/assets/scripts/dragonbones/DragonBonesCtrl.js"},{"deps":{},"path":"preview-scripts/assets/scripts/dragonbones/loadDragonBones/loadDragonBonesCtrl.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    