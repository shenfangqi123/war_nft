var cr = cr || {};

cr._Dictionary = function() {
    _keyMapTb = null;
    _valueMapTb = null;
    __currId = 0;
};

cr._Dictionary.prototype.init = function () {
    this._keyMapTb = {};
    this._valueMapTb = {};
    this.__currId = 2 << (0 | (Math.random() * 10));
};

cr._Dictionary.prototype.__getKey = function () {
    this.__currId++;
    return "key_" + this.__currId;
};

cr._Dictionary.prototype.setObject = function (value, key) {
    if (key == null)
        return;

    var keyId = this.__getKey();
    this._keyMapTb[keyId] = key;
    this._valueMapTb[keyId] = value;
};

cr._Dictionary.prototype.objectForKey = function (key) {
    if (key == null)
        return null;

    var locKeyMapTb = this._keyMapTb;
    for (var keyId in locKeyMapTb) {
        if (locKeyMapTb[keyId] === key)
            return this._valueMapTb[keyId];
    }
    return null;
};

cr._Dictionary.prototype.valueForKey = function (key) {
    return this.objectForKey(key);
};

cr._Dictionary.prototype.removeObjectForKey = function (key) {
    if (key == null)
        return;

    var locKeyMapTb = this._keyMapTb;
    for (var keyId in locKeyMapTb) {
        if (locKeyMapTb[keyId] === key) {
            delete this._valueMapTb[keyId];
            delete locKeyMapTb[keyId];
            return;
        }
    }
};

cr._Dictionary.prototype.removeObjectsForKeys = function (keys) {
    if (keys == null)
        return;

    for (var i = 0; i < keys.length; i++)
        this.removeObjectForKey(keys[i]);
};

cr._Dictionary.prototype.allKeys = function () {
    var keyArr = [], locKeyMapTb = this._keyMapTb;
    for (var key in locKeyMapTb)
        keyArr.push(locKeyMapTb[key]);
    return keyArr;
};

cr._Dictionary.prototype.removeAllObjects = function () {
    this._keyMapTb = {};
    this._valueMapTb = {};
};

cr._Dictionary.prototype.count = function () {
    return this.allKeys().length;
}

module.exports = cr._Dictionary;