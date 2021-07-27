"use strict";

console.log("publicFunction.js");

function supportLocalStorage() {
    try {
        return eval("window.localStorage !== undefined");
    } catch (e) {
        return false;
    }
}
if (false === supportLocalStorage()) {
    console.log("Browser didn't support window.localStorage");
}

function supportsLiterals() {
    try {
        return eval("'' === ``");
    } catch (e) {
        return false;
    }
}
if (false === supportsLiterals()) {
    console.log("Browser didn't support String Template literals");
}

if (!Number.MAX_SAFE_INTEGER) {
    /* for support Internet Explorer browser */
    console.log("Start loading Number.MAX_SAFE_INTEGER");
    Number.MAX_SAFE_INTEGER = 9007199254740991;
}

if (!Number.MIN_SAFE_INTEGER) {
    /* for support Internet Explorer browser */
    console.log("Start loading Number.MIN_SAFE_INTEGER");
    Number.MIN_SAFE_INTEGER = -9007199254740991;
}

if (!Number.parseInt) {
    /* for support Internet Explorer browser */
    console.log("Start loading Number.parseInt")
    Number.parseInt = window.parseInt;
}

if (!Number.parseFloat) {
    /* for support Internet Explorer browser */
    console.log("Start loading Number.parseFloat()")
    Number.parseFloat = window.parseFloat;
}

if (!Number.isInteger) {
    /* for support Internet Explorer browser */
    console.log("Start loading Number.isInteger");
    Number.isInteger = function isInteger(input) {
        if (typeof (input) !== "number") {
            return false;
        }
        let inputStr = String(input);
        if (Number.parseInt(inputStr) === Number.parseFloat(inputStr)) {
            return true;
        } else {
            return false;
        }
    }
}

function check(inputObj, flag, type) {
    if (null == inputObj) {
        throw new TypeError("null type " + type);
    }
    if (flag instanceof RegExp) {
        throw new TypeError("RegExp type " + type);
    }
    return inputObj + "";
}

if (!String.prototype.repeat) {
    /* for support Internet Explorer browser */
    console.log("Start loading String.prototype.repeat");
    String.prototype.repeat = function (count) {
        let thisObj = check(this, null, "repeat");
        if (0 > count || 1342177279 < count) {
            throw new RangeError("1");
        }
        count |= 0;
        for (var result = ""; count;) {
            if ((count & 1) && (result = result + thisObj), (count = count >> 1)) {
                thisObj = thisObj + thisObj;
            }
        }
        return result;
    }
}

if (!String.prototype.padStart) {
    /* for support Internet Explorer browser */
    console.log("Start loading String.prototype.padStart");
    String.prototype.padStart = function (targetLength, padString) {
        let thisObj = check(this, null, "padStart");
        targetLength = targetLength - thisObj.length;

        if (void (0) !== padString) {
            padString = String(padString);
        } else {
            padString = ' ';
        }

        if (0 < targetLength && padString) {
            return padString.repeat(Math.ceil(targetLength / padString.length)).substring(0, targetLength) + thisObj;
        } else {
            return "" + thisObj;
        }
    }
}

if (!String.prototype.includes) {
    /* for support Internet Explorer browser */
    console.log("Start loading String.prototype.includes");
    String.prototype.includes = function includes(searchString) {
        if (this.match(searchString) === null) {
            return false;
        } else {
            return true;
        }
    }
}

function MyStorage(app) {
    this.app = app;
    this.storage = window.localStorage;
    this.data = JSON.parse(this.storage[this.app] || "{}");
}

MyStorage.prototype = {
    getItem: function getItem(key) {
        return this.data[key];
    },
    setItem: function setItem(key, value) {
        this.data[key] = value;
        this.storage[this.app] = JSON.stringify(this.data);
    },
    deleteItem: function deleteItem(key) {
        delete this.data[key];
        this.storage[this.app] = JSON.stringify(this.data);
    },
    clear: function clear() {
        this.data = null;
        this.data = JSON.parse("{}");
        this.storage[this.app] = JSON.stringify(this.data);
    }
};
