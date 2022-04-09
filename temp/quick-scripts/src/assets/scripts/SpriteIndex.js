"use strict";
cc._RF.push(module, 'f6dd5p1dgBF87MB1jc9G2P1', 'SpriteIndex');
// scripts/SpriteIndex.ts

//SpriteIndex.js
cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        requireComponent: cc.Sprite,
    },
    properties: {
        spriteFrames: [cc.SpriteFrame],
        _index: 0,
        index: {
            type: cc.Integer,
            //这次没使用notify方式实现属性值的变化监听，改用getter/setter方式
            get: function () {
                return this._index;
            },
            //为负数退出 
            set: function (value) {
                if (value < 0) {
                    return;
                }
                //根据spriteFrames组件长度计算this._index
                this._index = value % this.spriteFrames.length;
                //获取当前节点上的Sprite组件对象
                var sprite = this.node.getComponent(cc.Sprite);
                //设置Sprite组件的spriteFrame属性，变换图片
                sprite.spriteFrame = this.spriteFrames[this._index];
            },
        }
    },
    /**
    *next方法，调用index++切换图片，
    *可以方便被cc.Button组件的事件调用
    */
    next: function () {
        this.index++; //调用自身index属性，编号+1
    }
});

cc._RF.pop();