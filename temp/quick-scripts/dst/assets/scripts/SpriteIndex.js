
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/SpriteIndex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Nwcml0ZUluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFnQjtBQUNoQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ04sT0FBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTO0lBQ3JCLE1BQU0sRUFBRSxTQUFTLElBQUk7UUFDakIsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU07S0FDOUI7SUFDRCxVQUFVLEVBQUU7UUFDUixZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQzlCLE1BQU0sRUFBRSxDQUFDO1FBRVQsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPO1lBQ2hCLDJDQUEyQztZQUMzQyxHQUFHO2dCQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDO1lBQ0EsUUFBUTtZQUNSLEdBQUcsWUFBQyxLQUFLO2dCQUNOLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDVixPQUFPO2lCQUNYO2dCQUNBLGlDQUFpQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQzlDLG9CQUFvQjtnQkFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QywrQkFBK0I7Z0JBQ2hDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsQ0FBQztTQUNKO0tBQ0o7SUFDRDs7O01BR0U7SUFDRixJQUFJO1FBQ0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsa0JBQWtCO0lBQ3JDLENBQUM7Q0FDSCxDQUFDLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL1Nwcml0ZUluZGV4LmpzXG5jYy5DbGFzcyh7XG4gICBleHRlbmRzOiBjYy5Db21wb25lbnQsICAgICAgICAgICAgICAgLy/nvJbovpHlmajlsZ7mgKfvvIzlj6rlnKjnvJbovpHnirbmgIHmnInmlYhcbiAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5TcHJpdGUsICAgICAvL+imgeaxguiKgueCueW/hemhu+aciWNjLlNwcml0Zee7hOS7tlxuICAgfSwgICBcbiAgIHByb3BlcnRpZXM6IHtcbiAgICAgICBzcHJpdGVGcmFtZXM6IFtjYy5TcHJpdGVGcmFtZV0sICAvL+WumuS5ieS4gOS4qlNwcml0ZUZyYW1lc+aVsOe7hFxuICAgICAgIF9pbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgIC8v5Lul5LiL5YiS57q/4oCcX+KAneW8gOWni+eahOS4uuengeeUqOWPmOmHj1xuICAgICBcbiAgICAgICBpbmRleDogeyAgICAgICAgICAgICAgICAgICAgICAgICAvL2luZGV45bGe5oCn5o6n5Yi25Zu+54mH5YiH5o2iXG4gICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsICAgICAgICAgICAgLy/lrprkuYnlsZ7mgKfkuLrmlbTmlbDnsbvlnotcbiAgICAgICAgICAgLy/ov5nmrKHmsqHkvb/nlKhub3RpZnnmlrnlvI/lrp7njrDlsZ7mgKflgLznmoTlj5jljJbnm5HlkKzvvIzmlLnnlKhnZXR0ZXIvc2V0dGVy5pa55byPXG4gICAgICAgICAgIGdldCgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4O1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy/kuLrotJ/mlbDpgIDlh7ogXG4gICAgICAgICAgICBzZXQodmFsdWUpIHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwKSB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL+agueaNrnNwcml0ZUZyYW1lc+e7hOS7tumVv+W6puiuoeeul3RoaXMuX2luZGV4XG4gICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IHZhbHVlICUgdGhpcy5zcHJpdGVGcmFtZXMubGVuZ3RoOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL+iOt+WPluW9k+WJjeiKgueCueS4iueahFNwcml0Zee7hOS7tuWvueixoVxuICAgICAgICAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy/orr7nva5TcHJpdGXnu4Tku7bnmoRzcHJpdGVGcmFtZeWxnuaAp++8jOWPmOaNouWbvueJh1xuICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZXNbdGhpcy5faW5kZXhdO1xuICAgICAgICAgICB9LFxuICAgICAgIH1cbiAgIH0sICAgIFxuICAgLyoqXG4gICAqbmV4dOaWueazle+8jOiwg+eUqGluZGV4KyvliIfmjaLlm77niYfvvIxcbiAgICrlj6/ku6Xmlrnkvr/ooqtjYy5CdXR0b27nu4Tku7bnmoTkuovku7bosIPnlKhcbiAgICovXG4gICBuZXh0KCkgeyAgICAgICAgXG4gICAgICAgIHRoaXMuaW5kZXgrKzsgLy/osIPnlKjoh6rouqtpbmRleOWxnuaAp++8jOe8luWPtysxXG4gICB9XG59KTsiXX0=