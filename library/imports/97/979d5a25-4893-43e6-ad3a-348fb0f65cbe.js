"use strict";
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