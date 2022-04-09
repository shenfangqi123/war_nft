
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Dictionary.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '979d5olSJND5q06NI+w9ly+', 'Dictionary');
// scripts/Dictionary.js

"use strict";

cc.Class({
  _keyMapTb: null,
  _valueMapTb: null,
  __currId: 0,
  ctor: function ctor() {
    this._keyMapTb = {};
    this._valueMapTb = {};
    this.__currId = 2 << (0 | Math.random() * 10);
  },
  __getKey: function __getKey() {
    this.__currId++;
    return "key_" + this.__currId;
  },
  setObject: function setObject(value, key) {
    if (key == null) return;

    var keyId = this.__getKey();

    this._keyMapTb[keyId] = key;
    this._valueMapTb[keyId] = value;
  },
  objectForKey: function objectForKey(key) {
    if (key == null) return null;
    var locKeyMapTb = this._keyMapTb;

    for (var keyId in locKeyMapTb) {
      if (locKeyMapTb[keyId] === key) return this._valueMapTb[keyId];
    }

    return null;
  },
  valueForKey: function valueForKey(key) {
    return this.objectForKey(key);
  },
  removeObjectForKey: function removeObjectForKey(key) {
    if (key == null) return;
    var locKeyMapTb = this._keyMapTb;

    for (var keyId in locKeyMapTb) {
      if (locKeyMapTb[keyId] === key) {
        delete this._valueMapTb[keyId];
        delete locKeyMapTb[keyId];
        return;
      }
    }
  },
  removeObjectsForKeys: function removeObjectsForKeys(keys) {
    if (keys == null) return;

    for (var i = 0; i < keys.length; i++) {
      this.removeObjectForKey(keys[i]);
    }
  },
  allKeys: function allKeys() {
    var keyArr = [],
        locKeyMapTb = this._keyMapTb;

    for (var key in locKeyMapTb) {
      keyArr.push(locKeyMapTb[key]);
    }

    return keyArr;
  },
  removeAllObjects: function removeAllObjects() {
    this._keyMapTb = {};
    this._valueMapTb = {};
  },
  count: function count() {
    return this.allKeys().length;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0RpY3Rpb25hcnkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIl9rZXlNYXBUYiIsIl92YWx1ZU1hcFRiIiwiX19jdXJySWQiLCJjdG9yIiwiTWF0aCIsInJhbmRvbSIsIl9fZ2V0S2V5Iiwic2V0T2JqZWN0IiwidmFsdWUiLCJrZXkiLCJrZXlJZCIsIm9iamVjdEZvcktleSIsImxvY0tleU1hcFRiIiwidmFsdWVGb3JLZXkiLCJyZW1vdmVPYmplY3RGb3JLZXkiLCJyZW1vdmVPYmplY3RzRm9yS2V5cyIsImtleXMiLCJpIiwibGVuZ3RoIiwiYWxsS2V5cyIsImtleUFyciIsInB1c2giLCJyZW1vdmVBbGxPYmplY3RzIiwiY291bnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0xDLEVBQUFBLFNBQVMsRUFBRSxJQUROO0FBRUxDLEVBQUFBLFdBQVcsRUFBRSxJQUZSO0FBR0xDLEVBQUFBLFFBQVEsRUFBRSxDQUhMO0FBS0xDLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtILFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixNQUFNLElBQUtFLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixFQUEzQixDQUFoQjtBQUNILEdBVEk7QUFVTEMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUtKLFFBQUw7QUFDQSxXQUFPLFNBQVMsS0FBS0EsUUFBckI7QUFDSCxHQWJJO0FBY0xLLEVBQUFBLFNBQVMsRUFBRSxtQkFBVUMsS0FBVixFQUFpQkMsR0FBakIsRUFBc0I7QUFDN0IsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFDSTs7QUFDSixRQUFJQyxLQUFLLEdBQUcsS0FBS0osUUFBTCxFQUFaOztBQUNBLFNBQUtOLFNBQUwsQ0FBZVUsS0FBZixJQUF3QkQsR0FBeEI7QUFDQSxTQUFLUixXQUFMLENBQWlCUyxLQUFqQixJQUEwQkYsS0FBMUI7QUFDSCxHQXBCSTtBQXFCTEcsRUFBQUEsWUFBWSxFQUFFLHNCQUFVRixHQUFWLEVBQWU7QUFDekIsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFDSSxPQUFPLElBQVA7QUFDSixRQUFJRyxXQUFXLEdBQUcsS0FBS1osU0FBdkI7O0FBQ0EsU0FBSyxJQUFJVSxLQUFULElBQWtCRSxXQUFsQixFQUErQjtBQUMzQixVQUFJQSxXQUFXLENBQUNGLEtBQUQsQ0FBWCxLQUF1QkQsR0FBM0IsRUFDSSxPQUFPLEtBQUtSLFdBQUwsQ0FBaUJTLEtBQWpCLENBQVA7QUFDUDs7QUFDRCxXQUFPLElBQVA7QUFDSCxHQTlCSTtBQStCTEcsRUFBQUEsV0FBVyxFQUFFLHFCQUFVSixHQUFWLEVBQWU7QUFDeEIsV0FBTyxLQUFLRSxZQUFMLENBQWtCRixHQUFsQixDQUFQO0FBQ0gsR0FqQ0k7QUFrQ0xLLEVBQUFBLGtCQUFrQixFQUFFLDRCQUFVTCxHQUFWLEVBQWU7QUFDL0IsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFDSTtBQUNKLFFBQUlHLFdBQVcsR0FBRyxLQUFLWixTQUF2Qjs7QUFDQSxTQUFLLElBQUlVLEtBQVQsSUFBa0JFLFdBQWxCLEVBQStCO0FBQzNCLFVBQUlBLFdBQVcsQ0FBQ0YsS0FBRCxDQUFYLEtBQXVCRCxHQUEzQixFQUFnQztBQUM1QixlQUFPLEtBQUtSLFdBQUwsQ0FBaUJTLEtBQWpCLENBQVA7QUFDQSxlQUFPRSxXQUFXLENBQUNGLEtBQUQsQ0FBbEI7QUFDQTtBQUNIO0FBQ0o7QUFDSixHQTdDSTtBQThDTEssRUFBQUEsb0JBQW9CLEVBQUUsOEJBQVVDLElBQVYsRUFBZ0I7QUFDbEMsUUFBSUEsSUFBSSxJQUFJLElBQVosRUFDSTs7QUFDSixTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELElBQUksQ0FBQ0UsTUFBekIsRUFBaUNELENBQUMsRUFBbEM7QUFDSSxXQUFLSCxrQkFBTCxDQUF3QkUsSUFBSSxDQUFDQyxDQUFELENBQTVCO0FBREo7QUFFSCxHQW5ESTtBQW9ETEUsRUFBQUEsT0FBTyxFQUFFLG1CQUFZO0FBQ2pCLFFBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQUEsUUFBaUJSLFdBQVcsR0FBRyxLQUFLWixTQUFwQzs7QUFDQSxTQUFLLElBQUlTLEdBQVQsSUFBZ0JHLFdBQWhCO0FBQ0lRLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZVCxXQUFXLENBQUNILEdBQUQsQ0FBdkI7QUFESjs7QUFFQSxXQUFPVyxNQUFQO0FBQ0gsR0F6REk7QUEwRExFLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFNBQUt0QixTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNILEdBN0RJO0FBOERMc0IsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2YsV0FBTyxLQUFLSixPQUFMLEdBQWVELE1BQXRCO0FBQ0g7QUFoRUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIF9rZXlNYXBUYjogbnVsbCxcbiAgICBfdmFsdWVNYXBUYjogbnVsbCxcbiAgICBfX2N1cnJJZDogMCxcbiAgICBcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2tleU1hcFRiID0ge307XG4gICAgICAgIHRoaXMuX3ZhbHVlTWFwVGIgPSB7fTtcbiAgICAgICAgdGhpcy5fX2N1cnJJZCA9IDIgPDwgKDAgfCAoTWF0aC5yYW5kb20oKSAqIDEwKSk7XG4gICAgfSxcbiAgICBfX2dldEtleTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9fY3VycklkKys7XG4gICAgICAgIHJldHVybiBcImtleV9cIiArIHRoaXMuX19jdXJySWQ7XG4gICAgfSxcbiAgICBzZXRPYmplY3Q6IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGtleUlkID0gdGhpcy5fX2dldEtleSgpO1xuICAgICAgICB0aGlzLl9rZXlNYXBUYltrZXlJZF0gPSBrZXk7XG4gICAgICAgIHRoaXMuX3ZhbHVlTWFwVGJba2V5SWRdID0gdmFsdWU7XG4gICAgfSxcbiAgICBvYmplY3RGb3JLZXk6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBsb2NLZXlNYXBUYiA9IHRoaXMuX2tleU1hcFRiO1xuICAgICAgICBmb3IgKHZhciBrZXlJZCBpbiBsb2NLZXlNYXBUYikge1xuICAgICAgICAgICAgaWYgKGxvY0tleU1hcFRiW2tleUlkXSA9PT0ga2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZU1hcFRiW2tleUlkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHZhbHVlRm9yS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdEZvcktleShrZXkpO1xuICAgIH0sXG4gICAgcmVtb3ZlT2JqZWN0Rm9yS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGxvY0tleU1hcFRiID0gdGhpcy5fa2V5TWFwVGI7XG4gICAgICAgIGZvciAodmFyIGtleUlkIGluIGxvY0tleU1hcFRiKSB7XG4gICAgICAgICAgICBpZiAobG9jS2V5TWFwVGJba2V5SWRdID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdmFsdWVNYXBUYltrZXlJZF07XG4gICAgICAgICAgICAgICAgZGVsZXRlIGxvY0tleU1hcFRiW2tleUlkXTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZU9iamVjdHNGb3JLZXlzOiBmdW5jdGlvbiAoa2V5cykge1xuICAgICAgICBpZiAoa2V5cyA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9iamVjdEZvcktleShrZXlzW2ldKTtcbiAgICB9LFxuICAgIGFsbEtleXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGtleUFyciA9IFtdLCBsb2NLZXlNYXBUYiA9IHRoaXMuX2tleU1hcFRiO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbG9jS2V5TWFwVGIpXG4gICAgICAgICAgICBrZXlBcnIucHVzaChsb2NLZXlNYXBUYltrZXldKTtcbiAgICAgICAgcmV0dXJuIGtleUFycjtcbiAgICB9LFxuICAgIHJlbW92ZUFsbE9iamVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFwVGIgPSB7fTtcbiAgICAgICAgdGhpcy5fdmFsdWVNYXBUYiA9IHt9O1xuICAgIH0sXG4gICAgY291bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsS2V5cygpLmxlbmd0aDtcbiAgICB9XG59KTsiXX0=