// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

//var pp = require("acdata").AcWar;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        loading: cc.ProgressBar,
        loadLabel: cc.Label,
        startBut: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.audioMng = this.audioMng.getComponent('AudioMng');
        //this.audioMng.playMusic();
        var _self = this;

        this.startBut.getComponent(cc.Button).interactable = false;

        cc.loader.downloader.loadSubpackage("resources", (err)=> {
            if(err) {
                console.log(err);
                _self.goH5Load();
            } else {
                cc.loader.loadResDir("resources", (err, res)=> {
                    console.log("you can go now!!!!!!!!!");
                    cc.director.preloadScene('menu', _self.onProgress.bind(_self), function() {
                        cc.director.preloadScene('game', _self.onProgress.bind(_self), function() {
                            //_self.wxlogin();
                            _self.startBut.getComponent(cc.Button).interactable = true;
                        });
                    });
                })                
            }
        })

        //test dragonbones
        var crabNode = this.node.getChildByName("Crab");
        if(crabNode) {
            var crabBodyNode = crabNode.getChildByName("crab_body");
            var armatureDisplay = crabBodyNode.getComponent(dragonBones.ArmatureDisplay);
            console.log("---------");
            console.log(armatureDisplay);
            armatureDisplay.playAnimation('ske_n_attack', 0);
        }

    },

    wxlogin: function() {
        //let exportJson = {};
        //window.wx.login({
        //    success: (userRes) => {
        //        exportJson.code = userRes.code;//向服务端传递code用于获取微信小游戏的用户唯一标识
        //    },
        //});
        let datanode = cc.find('GameData').getComponent('GameData');

        let _self = this;
        let exportJson = {};
        let sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;
        //_self.startBut.getComponent(cc.Button).interactable = false;

        window.wx.getSetting({
            success (res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授权");
                    window.wx.getUserInfo({
                        success(res){
                            console.log(res);
                            exportJson.userInfo = res.userInfo;
                            datanode.setWxUser(res.userInfo);

                            //此时可进行登录操作
                            //_self.startBut.getComponent(cc.Button).interactable = true;
                            _self.play();
                        }
                    });
                } else {
                    console.log("用户未授权");
                    _self.startBut.getComponent(cc.Button).interactable = true;
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            console.log("用户授权:", res);
                            exportJson.userInfo = res.userInfo;
                            
                            //此时可进行登录操作
                            datanode.setWxUser(res.userInfo);
                            _self.play();

                            button.destroy();
                        }else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        })
    },

    goH5Load () {
        var _self = this;
        cc.director.preloadScene('menu', this.onProgress.bind(this), function() {    
            cc.director.preloadScene('game', _self.onProgress.bind(_self), function() {    
                _self.startBut.getComponent(cc.Button).interactable = true;
            });
        });
    },

    start () {
        //this.loadProtobuf();
        //this.testProtobuf();

    },

    loadProtobuf: function() {
        var myprotobuf = protobuf;
        var filename = "acdata.proto";
        myprotobuf.load(filename, function(err, root) {
            if(err) {
                throw err;
            }

            var acMessage = root.lookupType("AcWar.AcwarMessage");
            console.log(acMessage);
        })
    },

    testProtobuf: function () {
        if (cc.sys.isNative) {//在native上加载失败，是因为没有找到目录，我们在testProtobuf函数里面添加一个搜索目录:
            cc.log("jsb.fileUtils=" + jsb.fileUtils);

            //下面这段代码在PC window平台运行没问题，但是在android下面就出问题了
            //jsb.fileUtils.addSearchPath("res\\raw-assets\\resources", true);
            //需要改成这样：
            jsb.fileUtils.addSearchPath("res/raw-assets/resources", true);//坑太多了。。没办法
        }

        var filename1 = "acdata.proto";
        // cc.loader.loadRes(filename1, cc.TextAsset, function (error, result) {//指定加载文本资源
        //     cc.log("loadRes error=" + error + ",result = " + result + ",type=" + typeof result);
        //     // callback(null, result);
        // });

        var protobufHere = protobuf;//require("protobuf");//导入为插件，直接使用
        protobufHere.load(filename1, function (err, root) {//Data/PbLobby.proto
            if (err) {
                console.log("load proto err:" + err);
                throw err;
            }

/*
            cc.log("root=" + root);
            for (var i in root) {
                cc.log("root." + i + "=" + root[i]);
            }
            //return;
*/

            cc.log("加载protobuf完毕，开始测试protobuf...")

/*
            var cmd = root.lookupEnum("PbLobby.Cmd");
            cc.log(`cmd = ${JSON.stringify(cmd)}`);
            cc.log("CMD_KEEPALIVED_C2S = "+cmd.values.CMD_KEEPALIVED_C2S);

            //lookup 等价于 lookupTypeOrEnum 
            //不同的是 lookup找不到返回null,lookupTypeOrEnum找不到则是抛出异常
            var type1 = root.lookup("PbLobby.Cmd1");
            cc.log("type1 = "+type1);
            var type2 = root.lookup("PbLobby.Test1");
            cc.log("type2 = "+type2);
*/

/*
            // Obtain a message type
            var Test1Message = root.lookupType("AcWar.AcwarMessage");
            cc.log("Test1Message = "+Test1Message);

            // Exemplary payload
            var payload = { id: 1,name:"hello protobuf" };
            //var payload = { ids: 1,name:"hello protobuf" };
            cc.log(`payload = ${JSON.stringify(payload)}`);
            //过滤掉一些message中的不存在的字段
            // Create a new message
            var message = Test1Message.create(payload); // or use .fromObject if conversion is necessary
            cc.log(`message = ${JSON.stringify(message)}`);


            // Encode a message to an Uint8Array (browser) or Buffer (node)
            var buffer = Test1Message.encode(message).finish();
            cc.log("buffer1 = "+buffer);
            cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);
            // ... do something with buffer

            // Decode an Uint8Array (browser) or Buffer (node) to a message
            var decoded = Test1Message.decode(buffer);
            cc.log("decoded1 = "+decoded);
            cc.log(`decoded2 = ${JSON.stringify(decoded)}`);
            // ... do something with message

            // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

            //一般情况下，也不需要下面的转换
            // Maybe convert the message back to a plain object
            var object = Test1Message.toObject(decoded, {
                longs: String,
                enums: String,
                bytes: String,
                // see ConversionOptions
            });
            cc.log("object = "+JSON.stringify(object));
*/

        });
    },


    play: function() {
        //cc.director.loadScene('menu');

        var myAgentsParam = [
            {"seleRole":'log', "magicCost":3, "roleLevel":1},
            {"seleRole":'hr', "magicCost":4, "roleLevel":1},
            {"seleRole":'bee', "magicCost":1, "roleLevel":1},
            {"seleRole":'ske', "magicCost":1, "roleLevel":1},
            {"seleRole":'lr', "magicCost":1, "roleLevel":1},
            {"seleRole":'wiz', "magicCost":3, "roleLevel":1}
        ];
        var curTime = new Date().getTime();

        var onSceneLaunched = function() {
            console.log(myAgentsParam);
            var gameObj = cc.director.getScene().getChildByName('Canvas').getChildByName('layout');
            var gameNode = gameObj.getComponent('Game');
            gameNode.setBuffDisp("heal");
            gameNode.setParam(myAgentsParam, curTime);
        };

        cc.director.loadScene('game', onSceneLaunched);
    },

    onProgress: function(completedCount, totalCount, item){
        this.loading.progress = completedCount/totalCount;
        this.loadLabel.string = Math.floor(completedCount/totalCount * 100) + "%";
    },

    // update (dt) {},
});
