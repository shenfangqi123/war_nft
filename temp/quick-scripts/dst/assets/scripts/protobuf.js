
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/protobuf.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f28ba3pGVlLR6xnGfV2Gugq', 'protobuf');
// scripts/protobuf.js

"use strict";

/*!
 * protobuf.js v6.8.6 (c) 2016, daniel wirtz
 * compiled mon, 26 feb 2018 11:35:34 utc
 * licensed under the bsd-3-clause license
 * see: https://github.com/dcodeio/protobuf.js for details
 */
(function (global, undefined) {
  "use strict";

  (function prelude(modules, cache, entries) {
    // This is the prelude used to bundle protobuf.js for the browser. Wraps up the CommonJS
    // sources through a conflict-free require shim and is again wrapped within an iife that
    // provides a unified `global` and a minification-friendly `undefined` var plus a global
    // "use strict" directive so that minification can remove the directives of each module.
    function $require(name) {
      var $module = cache[name];
      if (!$module) modules[name][0].call($module = cache[name] = {
        exports: {}
      }, $require, $module, $module.exports);
      return $module.exports;
    } // Expose globally


    var protobuf = global.protobuf = $require(entries[0]); // Be nice to AMD

    if (typeof define === "function" && define.amd) define(["long"], function (Long) {
      if (Long && Long.isLong) {
        protobuf.util.Long = Long;
        protobuf.configure();
      }

      return protobuf;
    }); // Be nice to CommonJS

    if (typeof module === "object" && module && module.exports) module.exports = protobuf;
  })(
  /* end of prelude */
  {
    1: [function (require, module, exports) {
      "use strict";

      module.exports = asPromise;
      /**
       * Callback as used by {@link util.asPromise}.
       * @typedef asPromiseCallback
       * @type {function}
       * @param {Error|null} error Error, if any
       * @param {...*} params Additional arguments
       * @returns {undefined}
       */

      /**
       * Returns a promise from a node-style callback function.
       * @memberof util
       * @param {asPromiseCallback} fn Function to call
       * @param {*} ctx Function context
       * @param {...*} params Function arguments
       * @returns {Promise<*>} Promisified function
       */

      function asPromise(fn, ctx
      /*, varargs */
      ) {
        var params = new Array(arguments.length - 1),
            offset = 0,
            index = 2,
            pending = true;

        while (index < arguments.length) {
          params[offset++] = arguments[index++];
        }

        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err
          /*, varargs */
          ) {
            if (pending) {
              pending = false;
              if (err) reject(err);else {
                var params = new Array(arguments.length - 1),
                    offset = 0;

                while (offset < params.length) {
                  params[offset++] = arguments[offset];
                }

                resolve.apply(null, params);
              }
            }
          };

          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }, {}],
    2: [function (require, module, exports) {
      "use strict";
      /**
       * A minimal base64 implementation for number arrays.
       * @memberof util
       * @namespace
       */

      var base64 = exports;
      /**
       * Calculates the byte length of a base64 encoded string.
       * @param {string} string Base64 encoded string
       * @returns {number} Byte length
       */

      base64.length = function length(string) {
        var p = string.length;
        if (!p) return 0;
        var n = 0;

        while (--p % 4 > 1 && string.charAt(p) === "=") {
          ++n;
        }

        return Math.ceil(string.length * 3) / 4 - n;
      }; // Base64 encoding table


      var b64 = new Array(64); // Base64 decoding table

      var s64 = new Array(123); // 65..90, 97..122, 48..57, 43, 47

      for (var i = 0; i < 64;) {
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      }
      /**
       * Encodes a buffer to a base64 encoded string.
       * @param {Uint8Array} buffer Source buffer
       * @param {number} start Source start
       * @param {number} end Source end
       * @returns {string} Base64 encoded string
       */


      base64.encode = function encode(buffer, start, end) {
        var parts = null,
            chunk = [];
        var i = 0,
            // output index
        j = 0,
            // goto index
        t; // temporary

        while (start < end) {
          var b = buffer[start++];

          switch (j) {
            case 0:
              chunk[i++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;

            case 1:
              chunk[i++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;

            case 2:
              chunk[i++] = b64[t | b >> 6];
              chunk[i++] = b64[b & 63];
              j = 0;
              break;
          }

          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }

        if (j) {
          chunk[i++] = b64[t];
          chunk[i++] = 61;
          if (j === 1) chunk[i++] = 61;
        }

        if (parts) {
          if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }

        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };

      var invalidEncoding = "invalid encoding";
      /**
       * Decodes a base64 encoded string to a buffer.
       * @param {string} string Source string
       * @param {Uint8Array} buffer Destination buffer
       * @param {number} offset Destination offset
       * @returns {number} Number of bytes written
       * @throws {Error} If encoding is invalid
       */

      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0,
            // goto index
        t; // temporary

        for (var i = 0; i < string.length;) {
          var c = string.charCodeAt(i++);
          if (c === 61 && j > 1) break;
          if ((c = s64[c]) === undefined) throw Error(invalidEncoding);

          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;

            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;

            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;

            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }

        if (j === 1) throw Error(invalidEncoding);
        return offset - start;
      };
      /**
       * Tests if the specified string appears to be base64 encoded.
       * @param {string} string String to test
       * @returns {boolean} `true` if probably base64 encoded, otherwise false
       */


      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }, {}],
    3: [function (require, module, exports) {
      "use strict";

      module.exports = codegen;
      /**
       * Begins generating a function.
       * @memberof util
       * @param {string[]} functionParams Function parameter names
       * @param {string} [functionName] Function name if not anonymous
       * @returns {Codegen} Appender that appends code to the function's body
       */

      function codegen(functionParams, functionName) {
        /* istanbul ignore if */
        if (typeof functionParams === "string") {
          functionName = functionParams;
          functionParams = undefined;
        }

        var body = [];
        /**
         * Appends code to the function's body or finishes generation.
         * @typedef Codegen
         * @type {function}
         * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
         * @param {...*} [formatParams] Format parameters
         * @returns {Codegen|Function} Itself or the generated function if finished
         * @throws {Error} If format parameter counts do not match
         */

        function Codegen(formatStringOrScope) {
          // note that explicit array handling below makes this ~50% faster
          // finish the function
          if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose) console.log("codegen: " + source); // eslint-disable-line no-console

            source = "return " + source;

            if (formatStringOrScope) {
              var scopeKeys = Object.keys(formatStringOrScope),
                  scopeParams = new Array(scopeKeys.length + 1),
                  scopeValues = new Array(scopeKeys.length),
                  scopeOffset = 0;

              while (scopeOffset < scopeKeys.length) {
                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
              }

              scopeParams[scopeOffset] = source;
              return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }

            return Function(source)(); // eslint-disable-line no-new-func
          } // otherwise append to body


          var formatParams = new Array(arguments.length - 1),
              formatOffset = 0;

          while (formatOffset < formatParams.length) {
            formatParams[formatOffset] = arguments[++formatOffset];
          }

          formatOffset = 0;
          formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];

            switch ($1) {
              case "d":
              case "f":
                return String(Number(value));

              case "i":
                return String(Math.floor(value));

              case "j":
                return JSON.stringify(value);

              case "s":
                return String(value);
            }

            return "%";
          });
          if (formatOffset !== formatParams.length) throw Error("parameter count mismatch");
          body.push(formatStringOrScope);
          return Codegen;
        }

        function toString(functionNameOverride) {
          return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
        }

        Codegen.toString = toString;
        return Codegen;
      }
      /**
       * Begins generating a function.
       * @memberof util
       * @function codegen
       * @param {string} [functionName] Function name if not anonymous
       * @returns {Codegen} Appender that appends code to the function's body
       * @variation 2
       */

      /**
       * When set to `true`, codegen will log generated code to console. Useful for debugging.
       * @name util.codegen.verbose
       * @type {boolean}
       */


      codegen.verbose = false;
    }, {}],
    4: [function (require, module, exports) {
      "use strict";

      module.exports = EventEmitter;
      /**
       * Constructs a new event emitter instance.
       * @classdesc A minimal event emitter.
       * @memberof util
       * @constructor
       */

      function EventEmitter() {
        /**
         * Registered listeners.
         * @type {Object.<string,*>}
         * @private
         */
        this._listeners = {};
      }
      /**
       * Registers an event listener.
       * @param {string} evt Event name
       * @param {function} fn Listener
       * @param {*} [ctx] Listener context
       * @returns {util.EventEmitter} `this`
       */


      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn: fn,
          ctx: ctx || this
        });
        return this;
      };
      /**
       * Removes an event listener or any matching listeners if arguments are omitted.
       * @param {string} [evt] Event name. Removes all listeners if omitted.
       * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
       * @returns {util.EventEmitter} `this`
       */


      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === undefined) this._listeners = {};else {
          if (fn === undefined) this._listeners[evt] = [];else {
            var listeners = this._listeners[evt];

            for (var i = 0; i < listeners.length;) {
              if (listeners[i].fn === fn) listeners.splice(i, 1);else ++i;
            }
          }
        }
        return this;
      };
      /**
       * Emits an event by calling its listeners with the specified arguments.
       * @param {string} evt Event name
       * @param {...*} args Arguments
       * @returns {util.EventEmitter} `this`
       */


      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];

        if (listeners) {
          var args = [],
              i = 1;

          for (; i < arguments.length;) {
            args.push(arguments[i++]);
          }

          for (i = 0; i < listeners.length;) {
            listeners[i].fn.apply(listeners[i++].ctx, args);
          }
        }

        return this;
      };
    }, {}],
    5: [function (require, module, exports) {
      "use strict";

      module.exports = fetch;

      var asPromise = require(1),
          inquire = require(7);

      var fs = inquire("fs");
      /**
       * Node-style callback as used by {@link util.fetch}.
       * @typedef FetchCallback
       * @type {function}
       * @param {?Error} error Error, if any, otherwise `null`
       * @param {string} [contents] File contents, if there hasn't been an error
       * @returns {undefined}
       */

      /**
       * Options as used by {@link util.fetch}.
       * @typedef FetchOptions
       * @type {Object}
       * @property {boolean} [binary=false] Whether expecting a binary response
       * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
       */

      /**
       * Fetches the contents of a file.
       * @memberof util
       * @param {string} filename File path or url
       * @param {FetchOptions} options Fetch options
       * @param {FetchCallback} callback Callback function
       * @returns {undefined}
       */

      function fetch(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options) options = {};

        if (!callback) return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this
        // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.

        if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        }); // use the XHR version otherwise.

        return fetch.xhr(filename, options, callback);
      }

      function fetch1(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options) options = {};

        if (!callback) return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

        if (typeof cc !== "undefined") {
          //判断是否是cocos项目
          if (cc.sys.isNative) {
            //native
            var content = jsb.fileUtils.getStringFromFile(filename); //对于一些新版的creator(作者creator2.3.2)来说，他会把资源混淆在不同的目录下，所以这里是没办法找到该文件的,直接使用cc.loader的loadRes方法尝试加载一次。

            if (content === "") {
              cc.loader.loadRes(filename, cc.TextAsset, function (error, result) {
                cc.log("error1=" + error + ",result = " + result + ",type=" + typeof result);

                if (error) {
                  callback(Error("status " + error));
                } else {
                  //callback(null, result);//creator1.9及以下版本使用此行
                  callback(null, result.text); //新版creator可放心运行
                }
              });
            } else {
              callback(content === "" ? Error(filename + " not exits") : null, content);
            }
          } else {
            //cc.log("cc.loader load 1 filename=" + filename);
            //这里可以加载一个url图片 : "Host"+filename
            // cc.loader.load(filename, function (error, result) {
            //     cc.log("error1=" + error + ",result = " + result + ",type=" + typeof result);
            //     // callback(null, result);
            // });
            //cc.log("cc.loader load 2");
            // 这里h5会去加载resources目录下的文件 : "resources/"+ filename
            // 这里filename一般不用指定扩展名,当然你也可以强制指定
            cc.loader.loadRes(filename, cc.TextAsset, function (error, result) {
              //cc.log("error2=" + error + ",result = " + result + ",type=" + typeof result);
              if (error) {
                callback(Error("status " + error));
              } else {
                //callback(null, result);//creator1.9及以下版本使用此行
                callback(null, result.text); //新版creator可放心运行
              }
            }); //cc.log("cc.loader load 3");
          }

          return;
        } // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.


        if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        }); // use the XHR version otherwise.

        return fetch.xhr(filename, options, callback);
      }
      /**
       * Fetches the contents of a file.
       * @name util.fetch
       * @function
       * @param {string} path File path or url
       * @param {FetchCallback} callback Callback function
       * @returns {undefined}
       * @variation 2
       */

      /**
       * Fetches the contents of a file.
       * @name util.fetch
       * @function
       * @param {string} path File path or url
       * @param {FetchOptions} [options] Fetch options
       * @returns {Promise<string|Uint8Array>} Promise
       * @variation 3
       */

      /**/


      fetch.xhr = function fetch_xhr(filename, options, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange
        /* works everywhere */
        = function fetchOnReadyStateChange() {
          if (xhr.readyState !== 4) return undefined; // local cors security errors return status 0 / empty string, too. afaik this cannot be
          // reliably distinguished from an actually empty file for security reasons. feel free
          // to send a pull request if you are aware of a solution.

          if (xhr.status !== 0 && xhr.status !== 200) return callback(Error("status " + xhr.status)); // if binary data is expected, make sure that some sort of array is returned, even if
          // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.

          if (options.binary) {
            var buffer = xhr.response;

            if (!buffer) {
              buffer = [];

              for (var i = 0; i < xhr.responseText.length; ++i) {
                buffer.push(xhr.responseText.charCodeAt(i) & 255);
              }
            }

            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
          }

          return callback(null, xhr.responseText);
        };

        if (options.binary) {
          // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
          if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.responseType = "arraybuffer";
        }

        xhr.open("GET", filename);
        xhr.send();
      };
    }, {
      "1": 1,
      "7": 7
    }],
    6: [function (require, module, exports) {
      "use strict";

      module.exports = factory(factory);
      /**
       * Reads / writes floats / doubles from / to buffers.
       * @name util.float
       * @namespace
       */

      /**
       * Writes a 32 bit float to a buffer using little endian byte order.
       * @name util.float.writeFloatLE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Writes a 32 bit float to a buffer using big endian byte order.
       * @name util.float.writeFloatBE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Reads a 32 bit float from a buffer using little endian byte order.
       * @name util.float.readFloatLE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */

      /**
       * Reads a 32 bit float from a buffer using big endian byte order.
       * @name util.float.readFloatBE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */

      /**
       * Writes a 64 bit double to a buffer using little endian byte order.
       * @name util.float.writeDoubleLE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Writes a 64 bit double to a buffer using big endian byte order.
       * @name util.float.writeDoubleBE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Reads a 64 bit double from a buffer using little endian byte order.
       * @name util.float.readDoubleLE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */

      /**
       * Reads a 64 bit double from a buffer using big endian byte order.
       * @name util.float.readDoubleBE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */
      // Factory function for the purpose of node-based testing in modified global environments

      function factory(exports) {
        // float: typed array
        if (typeof Float32Array !== "undefined") (function () {
          var f32 = new Float32Array([-0]),
              f8b = new Uint8Array(f32.buffer),
              le = f8b[3] === 128;

          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }

          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          /* istanbul ignore next */


          exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          /* istanbul ignore next */

          exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }

          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          /* istanbul ignore next */


          exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          /* istanbul ignore next */

          exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy; // float: ieee754
        })();else (function () {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ?
            /* positive */
            0 :
            /* negative 0 */
            2147483648, buf, pos);else if (isNaN(val)) writeUint(2143289344, buf, pos);else if (val > 3.4028234663852886e+38) // +-Infinity
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else if (val < 1.1754943508222875e-38) // denormal
              writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);else {
              var exponent = Math.floor(Math.log(val) / Math.LN2),
                  mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }

          exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
            ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }

          exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })(); // double: typed array

        if (typeof Float64Array !== "undefined") (function () {
          var f64 = new Float64Array([-0]),
              f8b = new Uint8Array(f64.buffer),
              le = f8b[7] === 128;

          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }

          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          /* istanbul ignore next */


          exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          /* istanbul ignore next */

          exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }

          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          /* istanbul ignore next */


          exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          /* istanbul ignore next */

          exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy; // double: ieee754
        })();else (function () {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;

            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ?
              /* positive */
              0 :
              /* negative 0 */
              2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) {
              // +-Infinity
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;

              if (val < 2.2250738585072014e-308) {
                // denormal
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024) exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }

          exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
            ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }

          exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports;
      } // uint helpers


      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }

      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }

      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }

      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }, {}],
    7: [function (require, module, exports) {
      "use strict";

      module.exports = inquire;
      /**
       * Requires a module only if available.
       * @memberof util
       * @param {string} moduleName Module to require
       * @returns {?Object} Required module if available and not empty, otherwise `null`
       */

      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName); // eslint-disable-line no-eval

          if (mod && (mod.length || Object.keys(mod).length)) return mod;
        } catch (e) {} // eslint-disable-line no-empty


        return null;
      }
    }, {}],
    8: [function (require, module, exports) {
      "use strict";
      /**
       * A minimal path module to resolve Unix, Windows and URL paths alike.
       * @memberof util
       * @namespace
       */

      var path = exports;

      var isAbsolute =
      /**
       * Tests if the specified path is absolute.
       * @param {string} path Path to test
       * @returns {boolean} `true` if path is absolute
       */
      path.isAbsolute = function isAbsolute(path) {
        return /^(?:\/|\w+:)/.test(path);
      };

      var normalize =
      /**
       * Normalizes the specified path.
       * @param {string} path Path to normalize
       * @returns {string} Normalized path
       */
      path.normalize = function normalize(path) {
        path = path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
        var parts = path.split("/"),
            absolute = isAbsolute(path),
            prefix = "";
        if (absolute) prefix = parts.shift() + "/";

        for (var i = 0; i < parts.length;) {
          if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..") parts.splice(--i, 2);else if (absolute) parts.splice(i, 1);else ++i;
          } else if (parts[i] === ".") parts.splice(i, 1);else ++i;
        }

        return prefix + parts.join("/");
      };
      /**
       * Resolves the specified include path against the specified origin path.
       * @param {string} originPath Path to the origin file
       * @param {string} includePath Include path relative to origin path
       * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
       * @returns {string} Path to the include file
       */


      path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
        if (!alreadyNormalized) includePath = normalize(includePath);
        if (isAbsolute(includePath)) return includePath;
        if (!alreadyNormalized) originPath = normalize(originPath);
        return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
      };
    }, {}],
    9: [function (require, module, exports) {
      "use strict";

      module.exports = pool;
      /**
       * An allocator as used by {@link util.pool}.
       * @typedef PoolAllocator
       * @type {function}
       * @param {number} size Buffer size
       * @returns {Uint8Array} Buffer
       */

      /**
       * A slicer as used by {@link util.pool}.
       * @typedef PoolSlicer
       * @type {function}
       * @param {number} start Start offset
       * @param {number} end End offset
       * @returns {Uint8Array} Buffer slice
       * @this {Uint8Array}
       */

      /**
       * A general purpose buffer pool.
       * @memberof util
       * @function
       * @param {PoolAllocator} alloc Allocator
       * @param {PoolSlicer} slice Slicer
       * @param {number} [size=8192] Slab size
       * @returns {PoolAllocator} Pooled allocator
       */

      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size) {
          if (size < 1 || size > MAX) return alloc(size);

          if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }

          var buf = slice.call(slab, offset, offset += size);
          if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }, {}],
    10: [function (require, module, exports) {
      "use strict";
      /**
       * A minimal UTF8 implementation for number arrays.
       * @memberof util
       * @namespace
       */

      var utf8 = exports;
      /**
       * Calculates the UTF8 byte length of a string.
       * @param {string} string String
       * @returns {number} Byte length
       */

      utf8.length = function utf8_length(string) {
        var len = 0,
            c = 0;

        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128) len += 1;else if (c < 2048) len += 2;else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
          } else len += 3;
        }

        return len;
      };
      /**
       * Reads UTF8 bytes as a string.
       * @param {Uint8Array} buffer Source buffer
       * @param {number} start Source start
       * @param {number} end Source end
       * @returns {string} String read
       */


      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1) return "";
        var parts = null,
            chunk = [],
            i = 0,
            // char offset
        t; // temporary

        while (start < end) {
          t = buffer[start++];
          if (t < 128) chunk[i++] = t;else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
          } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;

          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }

        if (parts) {
          if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }

        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      /**
       * Writes a string as UTF8 bytes.
       * @param {string} string Source string
       * @param {Uint8Array} buffer Destination buffer
       * @param {number} offset Destination offset
       * @returns {number} Bytes written
       */


      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset,
            c1,
            // character 1
        c2; // character 2

        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);

          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }

        return offset - start;
      };
    }, {}],
    11: [function (require, module, exports) {
      "use strict";

      module.exports = common;
      var commonRe = /\/|\./;
      /**
       * Provides common type definitions.
       * Can also be used to provide additional google types or your own custom types.
       * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
       * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
       * @returns {undefined}
       * @property {INamespace} google/protobuf/any.proto Any
       * @property {INamespace} google/protobuf/duration.proto Duration
       * @property {INamespace} google/protobuf/empty.proto Empty
       * @property {INamespace} google/protobuf/field_mask.proto FieldMask
       * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
       * @property {INamespace} google/protobuf/timestamp.proto Timestamp
       * @property {INamespace} google/protobuf/wrappers.proto Wrappers
       * @example
       * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
       * protobuf.common("descriptor", descriptorJson);
       *
       * // manually provides a custom definition (uses my.foo namespace)
       * protobuf.common("my/foo/bar.proto", myFooBarJson);
       */

      function common(name, json) {
        if (!commonRe.test(name)) {
          name = "google/protobuf/" + name + ".proto";
          json = {
            nested: {
              google: {
                nested: {
                  protobuf: {
                    nested: json
                  }
                }
              }
            }
          };
        }

        common[name] = json;
      } // Not provided because of limited use (feel free to discuss or to provide yourself):
      //
      // google/protobuf/descriptor.proto
      // google/protobuf/source_context.proto
      // google/protobuf/type.proto
      //
      // Stripped and pre-parsed versions of these non-bundled files are instead available as part of
      // the repository or package within the google/protobuf directory.


      common("any", {
        /**
         * Properties of a google.protobuf.Any message.
         * @interface IAny
         * @type {Object}
         * @property {string} [typeUrl]
         * @property {Uint8Array} [bytes]
         * @memberof common
         */
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
      var timeType;
      common("duration", {
        /**
         * Properties of a google.protobuf.Duration message.
         * @interface IDuration
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Duration: timeType = {
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
      common("timestamp", {
        /**
         * Properties of a google.protobuf.Timestamp message.
         * @interface ITimestamp
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Timestamp: timeType
      });
      common("empty", {
        /**
         * Properties of a google.protobuf.Empty message.
         * @interface IEmpty
         * @memberof common
         */
        Empty: {
          fields: {}
        }
      });
      common("struct", {
        /**
         * Properties of a google.protobuf.Struct message.
         * @interface IStruct
         * @type {Object}
         * @property {Object.<string,IValue>} [fields]
         * @memberof common
         */
        Struct: {
          fields: {
            fields: {
              keyType: "string",
              type: "Value",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.Value message.
         * @interface IValue
         * @type {Object}
         * @property {string} [kind]
         * @property {0} [nullValue]
         * @property {number} [numberValue]
         * @property {string} [stringValue]
         * @property {boolean} [boolValue]
         * @property {IStruct} [structValue]
         * @property {IListValue} [listValue]
         * @memberof common
         */
        Value: {
          oneofs: {
            kind: {
              oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
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

        /**
         * Properties of a google.protobuf.ListValue message.
         * @interface IListValue
         * @type {Object}
         * @property {Array.<IValue>} [values]
         * @memberof common
         */
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
      common("wrappers", {
        /**
         * Properties of a google.protobuf.DoubleValue message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        DoubleValue: {
          fields: {
            value: {
              type: "double",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.FloatValue message.
         * @interface IFloatValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FloatValue: {
          fields: {
            value: {
              type: "float",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.Int64Value message.
         * @interface IInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        Int64Value: {
          fields: {
            value: {
              type: "int64",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.UInt64Value message.
         * @interface IUInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        UInt64Value: {
          fields: {
            value: {
              type: "uint64",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.Int32Value message.
         * @interface IInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        Int32Value: {
          fields: {
            value: {
              type: "int32",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.UInt32Value message.
         * @interface IUInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        UInt32Value: {
          fields: {
            value: {
              type: "uint32",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.BoolValue message.
         * @interface IBoolValue
         * @type {Object}
         * @property {boolean} [value]
         * @memberof common
         */
        BoolValue: {
          fields: {
            value: {
              type: "bool",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.StringValue message.
         * @interface IStringValue
         * @type {Object}
         * @property {string} [value]
         * @memberof common
         */
        StringValue: {
          fields: {
            value: {
              type: "string",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.BytesValue message.
         * @interface IBytesValue
         * @type {Object}
         * @property {Uint8Array} [value]
         * @memberof common
         */
        BytesValue: {
          fields: {
            value: {
              type: "bytes",
              id: 1
            }
          }
        }
      });
      common("field_mask", {
        /**
         * Properties of a google.protobuf.FieldMask message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
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
      /**
       * Gets the root definition of the specified common proto file.
       *
       * Bundled definitions are:
       * - google/protobuf/any.proto
       * - google/protobuf/duration.proto
       * - google/protobuf/empty.proto
       * - google/protobuf/field_mask.proto
       * - google/protobuf/struct.proto
       * - google/protobuf/timestamp.proto
       * - google/protobuf/wrappers.proto
       *
       * @param {string} file Proto file name
       * @returns {INamespace|null} Root definition or `null` if not defined
       */

      common.get = function get(file) {
        return common[file] || null;
      };
    }, {}],
    12: [function (require, module, exports) {
      "use strict";
      /**
       * Runtime message from/to plain object converters.
       * @namespace
       */

      var converter = exports;

      var Enum = require(15),
          util = require(37);
      /**
       * Generates a partial value fromObject conveter.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} prop Property reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(d%s){", prop);

            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
              if (field.repeated && values[keys[i]] === field.typeDefault) gen("default:");
              gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
            }

            gen("}");
          } else gen("if(typeof d%s!==\"object\")", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;

          switch (field.type) {
            case "double":
            case "float":
              gen("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"

              break;

            case "uint32":
            case "fixed32":
              gen("m%s=d%s>>>0", prop, prop);
              break;

            case "int32":
            case "sint32":
            case "sfixed32":
              gen("m%s=d%s|0", prop, prop);
              break;

            case "uint64":
              isUnsigned = true;
            // eslint-disable-line no-fallthrough

            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)("else if(typeof d%s===\"string\")", prop)("m%s=parseInt(d%s,10)", prop, prop)("else if(typeof d%s===\"number\")", prop)("m%s=d%s", prop, prop)("else if(typeof d%s===\"object\")", prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
              break;

            case "bytes":
              gen("if(typeof d%s===\"string\")", prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length)", prop)("m%s=d%s", prop, prop);
              break;

            case "string":
              gen("m%s=String(d%s)", prop, prop);
              break;

            case "bool":
              gen("m%s=Boolean(d%s)", prop, prop);
              break;

            /* default: gen
                ("m%s=d%s", prop, prop);
                break; */
          }
        }

        return gen;
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      }
      /**
       * Generates a plain object to runtime message converter specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      converter.fromObject = function fromObject(mtype) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        var fields = mtype.fieldsArray;
        var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
        if (!fields.length) return gen("return new this.ctor");
        gen("var m=new this.ctor");

        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(),
              prop = util.safeProp(field.name); // Map fields

          if (field.map) {
            gen("if(d%s){", prop)("if(typeof d%s!==\"object\")", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field,
            /* not sorted */
            i, prop + "[ks[i]]")("}")("}"); // Repeated fields
          } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field,
            /* not sorted */
            i, prop + "[i]")("}")("}"); // Non-repeated fields
          } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
            ("if(d%s!=null){", prop); // !== undefined && !== null

            genValuePartial_fromObject(gen, field,
            /* not sorted */
            i, prop);
            if (!(field.resolvedType instanceof Enum)) gen("}");
          }
        }

        return gen("return m");
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      };
      /**
       * Generates a partial value toObject converter.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} prop Property reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genValuePartial_toObject(gen, field, fieldIndex, prop) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;

          switch (field.type) {
            case "double":
            case "float":
              gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
              break;

            case "uint64":
              isUnsigned = true;
            // eslint-disable-line no-fallthrough

            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(typeof m%s===\"number\")", prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else") // Long-like
              ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
              break;

            case "bytes":
              gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
              break;

            default:
              gen("d%s=m%s", prop, prop);
              break;
          }
        }

        return gen;
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      }
      /**
       * Generates a runtime message to plain object converter specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      converter.toObject = function toObject(mtype) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
        if (!fields.length) return util.codegen()("return {}");
        var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
        var repeatedFields = [],
            mapFields = [],
            normalFields = [],
            i = 0;

        for (; i < fields.length; ++i) {
          if (!fields[i].partOf) (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
        }

        if (repeatedFields.length) {
          gen("if(o.arrays||o.defaults){");

          for (i = 0; i < repeatedFields.length; ++i) {
            gen("d%s=[]", util.safeProp(repeatedFields[i].name));
          }

          gen("}");
        }

        if (mapFields.length) {
          gen("if(o.objects||o.defaults){");

          for (i = 0; i < mapFields.length; ++i) {
            gen("d%s={}", util.safeProp(mapFields[i].name));
          }

          gen("}");
        }

        if (normalFields.length) {
          gen("if(o.defaults){");

          for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);else if (field["long"]) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());else if (field.bytes) gen("d%s=o.bytes===String?%j:%s", prop, String.fromCharCode.apply(String, field.typeDefault), "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]");else gen("d%s=%j", prop, field.typeDefault); // also messages (=null)
          }

          gen("}");
        }

        var hasKs2 = false;

        for (i = 0; i < fields.length; ++i) {
          var field = fields[i],
              index = mtype._fieldsArray.indexOf(field),
              prop = util.safeProp(field.name);

          if (field.map) {
            if (!hasKs2) {
              hasKs2 = true;
              gen("var ks2");
            }

            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field,
            /* sorted */
            index, prop + "[ks2[j]]")("}");
          } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field,
            /* sorted */
            index, prop + "[j]")("}");
          } else {
            gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null

            genValuePartial_toObject(gen, field,
            /* sorted */
            index, prop);
            if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
          }

          gen("}");
        }

        return gen("return d");
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      };
    }, {
      "15": 15,
      "37": 37
    }],
    13: [function (require, module, exports) {
      "use strict";

      module.exports = decoder;

      var Enum = require(15),
          types = require(36),
          util = require(37);

      function missing(field) {
        return "missing required '" + field.name + "'";
      }
      /**
       * Generates a decoder specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      function decoder(mtype) {
        /* eslint-disable no-unexpected-multiline */
        var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function (field) {
          return field.map;
        }).length ? ",k" : ""))("while(r.pos<c){")("var t=r.uint32()");
        if (mtype.group) gen("if((t&7)===4)")("break");
        gen("switch(t>>>3){");
        var i = 0;

        for (; i <
        /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
              type = field.resolvedType instanceof Enum ? "int32" : field.type,
              ref = "m" + util.safeProp(field.name);

          gen("case %i:", field.id); // Map fields

          if (field.map) {
            gen("r.skip().pos++") // assumes id 1 + key wireType
            ("if(%s===util.emptyObject)", ref)("%s={}", ref)("k=r.%s()", field.keyType)("r.pos++"); // assumes id 2 + value wireType

            if (types["long"][field.keyType] !== undefined) {
              if (types.basic[type] === undefined) gen("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
              else gen("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
              if (types.basic[type] === undefined) gen("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
              else gen("%s[k]=r.%s()", ref, type);
            } // Repeated fields

          } else if (field.repeated) {
            gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref); // Packable (always check for forward and backward compatiblity)

            if (types.packed[type] !== undefined) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else"); // Non-packed

            if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);else gen("%s.push(r.%s())", ref, type); // Non-repeated
          } else if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);else gen("%s=r.%s()", ref, type);

          gen("break"); // Unknown fields
        }

        gen("default:")("r.skipType(t&7)")("break")("}")("}"); // Field presence

        for (i = 0; i < mtype._fieldsArray.length; ++i) {
          var rfield = mtype._fieldsArray[i];
          if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
        }

        return gen("return m");
        /* eslint-enable no-unexpected-multiline */
      }
    }, {
      "15": 15,
      "36": 36,
      "37": 37
    }],
    14: [function (require, module, exports) {
      "use strict";

      module.exports = encoder;

      var Enum = require(15),
          types = require(36),
          util = require(37);
      /**
       * Generates a partial message type encoder.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} ref Variable reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genTypePartial(gen, field, fieldIndex, ref) {
        return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
      }
      /**
       * Generates an encoder specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      function encoder(mtype) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
        var i, ref; // "when a message is serialized its known fields should be written sequentially by field number"

        var fields =
        /* initializes */
        mtype.fieldsArray.slice().sort(util.compareFieldsById);

        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(),
              index = mtype._fieldsArray.indexOf(field),
              type = field.resolvedType instanceof Enum ? "int32" : field.type,
              wireType = types.basic[type];

          ref = "m" + util.safeProp(field.name); // Map fields

          if (field.map) {
            gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
            ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}"); // Repeated fields
          } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null
            // Packed repeated

            if (field.packed && types.packed[type] !== undefined) {
              gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()"); // Non-packed
            } else {
              gen("for(var i=0;i<%s.length;++i)", ref);
              if (wireType === undefined) genTypePartial(gen, field, index, ref + "[i]");else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }

            gen("}"); // Non-repeated
          } else {
            if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

            if (wireType === undefined) genTypePartial(gen, field, index, ref);else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
          }
        }

        return gen("return w");
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      }
    }, {
      "15": 15,
      "36": 36,
      "37": 37
    }],
    15: [function (require, module, exports) {
      "use strict";

      module.exports = Enum; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

      var Namespace = require(23),
          util = require(37);
      /**
       * Constructs a new enum instance.
       * @classdesc Reflected enum.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {Object.<string,number>} [values] Enum values as an object, by name
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] The comment for this enum
       * @param {Object.<string,string>} [comments] The value comments for this enum
       */


      function Enum(name, values, options, comment, comments) {
        ReflectionObject.call(this, name, options);
        if (values && typeof values !== "object") throw TypeError("values must be an object");
        /**
         * Enum values by id.
         * @type {Object.<number,string>}
         */

        this.valuesById = {};
        /**
         * Enum values by name.
         * @type {Object.<string,number>}
         */

        this.values = Object.create(this.valuesById); // toJSON, marker

        /**
         * Enum comment text.
         * @type {string|null}
         */

        this.comment = comment;
        /**
         * Value comment texts, if any.
         * @type {Object.<string,string>}
         */

        this.comments = comments || {};
        /**
         * Reserved ranges, if any.
         * @type {Array.<number[]|string>}
         */

        this.reserved = undefined; // toJSON
        // Note that values inherit valuesById on their prototype which makes them a TypeScript-
        // compatible enum. This is used by pbts to write actual enum definitions that work for
        // static and reflection code alike instead of emitting generic object definitions.

        if (values) for (var keys = Object.keys(values), i = 0; i < keys.length; ++i) {
          if (typeof values[keys[i]] === "number") // use forward entries only
            this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
        }
      }
      /**
       * Enum descriptor.
       * @interface IEnum
       * @property {Object.<string,number>} values Enum values
       * @property {Object.<string,*>} [options] Enum options
       */

      /**
       * Constructs an enum from an enum descriptor.
       * @param {string} name Enum name
       * @param {IEnum} json Enum descriptor
       * @returns {Enum} Created enum
       * @throws {TypeError} If arguments are invalid
       */


      Enum.fromJSON = function fromJSON(name, json) {
        var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
        enm.reserved = json.reserved;
        return enm;
      };
      /**
       * Converts this enum to an enum descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IEnum} Enum descriptor
       */


      Enum.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "comment", keepComments ? this.comment : undefined, "comments", keepComments ? this.comments : undefined]);
      };
      /**
       * Adds a value to this enum.
       * @param {string} name Value name
       * @param {number} id Value id
       * @param {string} [comment] Comment, if any
       * @returns {Enum} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a value with this name or id
       */


      Enum.prototype.add = function add(name, id, comment) {
        // utilized by the parser but not by .fromJSON
        if (!util.isString(name)) throw TypeError("name must be a string");
        if (!util.isInteger(id)) throw TypeError("id must be an integer");
        if (this.values[name] !== undefined) throw Error("duplicate name '" + name + "' in " + this);
        if (this.isReservedId(id)) throw Error("id " + id + " is reserved in " + this);
        if (this.isReservedName(name)) throw Error("name '" + name + "' is reserved in " + this);

        if (this.valuesById[id] !== undefined) {
          if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + id + " in " + this);
          this.values[name] = id;
        } else this.valuesById[this.values[name] = id] = name;

        this.comments[name] = comment || null;
        return this;
      };
      /**
       * Removes a value from this enum
       * @param {string} name Value name
       * @returns {Enum} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `name` is not a name of this enum
       */


      Enum.prototype.remove = function remove(name) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        var val = this.values[name];
        if (val == null) throw Error("name '" + name + "' does not exist in " + this);
        delete this.valuesById[val];
        delete this.values[name];
        delete this.comments[name];
        return this;
      };
      /**
       * Tests if the specified id is reserved.
       * @param {number} id Id to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Enum.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      /**
       * Tests if the specified name is reserved.
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Enum.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
    }, {
      "23": 23,
      "24": 24,
      "37": 37
    }],
    16: [function (require, module, exports) {
      "use strict";

      module.exports = Field; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

      var Enum = require(15),
          types = require(36),
          util = require(37);

      var Type; // cyclic

      var ruleRe = /^required|optional|repeated$/;
      /**
       * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
       * @name Field
       * @classdesc Reflected message field.
       * @extends FieldBase
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} type Value type
       * @param {string|Object.<string,*>} [rule="optional"] Field rule
       * @param {string|Object.<string,*>} [extend] Extended type if different from parent
       * @param {Object.<string,*>} [options] Declared options
       */

      /**
       * Constructs a field from a field descriptor.
       * @param {string} name Field name
       * @param {IField} json Field descriptor
       * @returns {Field} Created field
       * @throws {TypeError} If arguments are invalid
       */

      Field.fromJSON = function fromJSON(name, json) {
        return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
      };
      /**
       * Not an actual constructor. Use {@link Field} instead.
       * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
       * @exports FieldBase
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} type Value type
       * @param {string|Object.<string,*>} [rule="optional"] Field rule
       * @param {string|Object.<string,*>} [extend] Extended type if different from parent
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */


      function Field(name, id, type, rule, extend, options, comment) {
        if (util.isObject(rule)) {
          comment = extend;
          options = rule;
          rule = extend = undefined;
        } else if (util.isObject(extend)) {
          comment = options;
          options = extend;
          extend = undefined;
        }

        ReflectionObject.call(this, name, options);
        if (!util.isInteger(id) || id < 0) throw TypeError("id must be a non-negative integer");
        if (!util.isString(type)) throw TypeError("type must be a string");
        if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase())) throw TypeError("rule must be a string rule");
        if (extend !== undefined && !util.isString(extend)) throw TypeError("extend must be a string");
        /**
         * Field rule, if any.
         * @type {string|undefined}
         */

        this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

        /**
         * Field type.
         * @type {string}
         */

        this.type = type; // toJSON

        /**
         * Unique field id.
         * @type {number}
         */

        this.id = id; // toJSON, marker

        /**
         * Extended type if different from parent.
         * @type {string|undefined}
         */

        this.extend = extend || undefined; // toJSON

        /**
         * Whether this field is required.
         * @type {boolean}
         */

        this.required = rule === "required";
        /**
         * Whether this field is optional.
         * @type {boolean}
         */

        this.optional = !this.required;
        /**
         * Whether this field is repeated.
         * @type {boolean}
         */

        this.repeated = rule === "repeated";
        /**
         * Whether this field is a map or not.
         * @type {boolean}
         */

        this.map = false;
        /**
         * Message this field belongs to.
         * @type {Type|null}
         */

        this.message = null;
        /**
         * OneOf this field belongs to, if any,
         * @type {OneOf|null}
         */

        this.partOf = null;
        /**
         * The field type's default value.
         * @type {*}
         */

        this.typeDefault = null;
        /**
         * The field's default value on prototypes.
         * @type {*}
         */

        this.defaultValue = null;
        /**
         * Whether this field's value should be treated as a long.
         * @type {boolean}
         */

        this["long"] = util.Long ? types["long"][type] !== undefined :
        /* istanbul ignore next */
        false;
        /**
         * Whether this field's value is a buffer.
         * @type {boolean}
         */

        this.bytes = type === "bytes";
        /**
         * Resolved type if not a basic type.
         * @type {Type|Enum|null}
         */

        this.resolvedType = null;
        /**
         * Sister-field within the extended type if a declaring extension field.
         * @type {Field|null}
         */

        this.extensionField = null;
        /**
         * Sister-field within the declaring namespace if an extended field.
         * @type {Field|null}
         */

        this.declaringField = null;
        /**
         * Internally remembers whether this field is packed.
         * @type {boolean|null}
         * @private
         */

        this._packed = null;
        /**
         * Comment for this field.
         * @type {string|null}
         */

        this.comment = comment;
      }
      /**
       * Determines whether this field is packed. Only relevant when repeated and working with proto2.
       * @name Field#packed
       * @type {boolean}
       * @readonly
       */


      Object.defineProperty(Field.prototype, "packed", {
        get: function get() {
          // defaults to packed=true if not explicity set to false
          if (this._packed === null) this._packed = this.getOption("packed") !== false;
          return this._packed;
        }
      });
      /**
       * @override
       */

      Field.prototype.setOption = function setOption(name, value, ifNotSet) {
        if (name === "packed") // clear cached before setting
          this._packed = null;
        return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
      };
      /**
       * Field descriptor.
       * @interface IField
       * @property {string} [rule="optional"] Field rule
       * @property {string} type Field type
       * @property {number} id Field id
       * @property {Object.<string,*>} [options] Field options
       */

      /**
       * Extension field descriptor.
       * @interface IExtensionField
       * @extends IField
       * @property {string} extend Extended type
       */

      /**
       * Converts this field to a field descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IField} Field descriptor
       */


      Field.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["rule", this.rule !== "optional" && this.rule || undefined, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * Resolves this field's type references.
       * @returns {Field} `this`
       * @throws {Error} If any reference cannot be resolved
       */


      Field.prototype.resolve = function resolve() {
        if (this.resolved) return this;

        if ((this.typeDefault = types.defaults[this.type]) === undefined) {
          // if not a basic type, resolve it
          this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
          if (this.resolvedType instanceof Type) this.typeDefault = null;else // instanceof Enum
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
        } // use explicitly set default value if present


        if (this.options && this.options["default"] != null) {
          this.typeDefault = this.options["default"];
          if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault];
        } // remove unnecessary options


        if (this.options) {
          if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum)) delete this.options.packed;
          if (!Object.keys(this.options).length) this.options = undefined;
        } // convert to internal data type if necesssary


        if (this["long"]) {
          this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
          /* istanbul ignore else */

          if (Object.freeze) Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)
        } else if (this.bytes && typeof this.typeDefault === "string") {
          var buf;
          if (util.base64.test(this.typeDefault)) util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);else util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
          this.typeDefault = buf;
        } // take special care of maps and repeated fields


        if (this.map) this.defaultValue = util.emptyObject;else if (this.repeated) this.defaultValue = util.emptyArray;else this.defaultValue = this.typeDefault; // ensure proper value on prototype

        if (this.parent instanceof Type) this.parent.ctor.prototype[this.name] = this.defaultValue;
        return ReflectionObject.prototype.resolve.call(this);
      };
      /**
       * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
       * @typedef FieldDecorator
       * @type {function}
       * @param {Object} prototype Target prototype
       * @param {string} fieldName Field name
       * @returns {undefined}
       */

      /**
       * Field decorator (TypeScript).
       * @name Field.d
       * @function
       * @param {number} fieldId Field id
       * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
       * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
       * @param {T} [defaultValue] Default value
       * @returns {FieldDecorator} Decorator function
       * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
       */


      Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
        // submessage: decorate the submessage and use its name as the type
        if (typeof fieldType === "function") fieldType = util.decorateType(fieldType).name; // enum reference: create a reflected copy of the enum and keep reuseing it
        else if (fieldType && typeof fieldType === "object") fieldType = util.decorateEnum(fieldType).name;
        return function fieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, {
            "default": defaultValue
          }));
        };
      };
      /**
       * Field decorator (TypeScript).
       * @name Field.d
       * @function
       * @param {number} fieldId Field id
       * @param {Constructor<T>|string} fieldType Field type
       * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
       * @returns {FieldDecorator} Decorator function
       * @template T extends Message<T>
       * @variation 2
       */
      // like Field.d but without a default value


      Field._configure = function configure(Type_) {
        Type = Type_;
      };
    }, {
      "15": 15,
      "24": 24,
      "36": 36,
      "37": 37
    }],
    17: [function (require, module, exports) {
      "use strict";

      var protobuf = module.exports = require(18);

      protobuf.build = "light";
      /**
       * A node-style callback as used by {@link load} and {@link Root#load}.
       * @typedef LoadCallback
       * @type {function}
       * @param {Error|null} error Error, if any, otherwise `null`
       * @param {Root} [root] Root, if there hasn't been an error
       * @returns {undefined}
       */

      /**
       * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
       * @param {string|string[]} filename One or multiple files to load
       * @param {Root} root Root namespace, defaults to create a new one if omitted.
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       * @see {@link Root#load}
       */

      function load(filename, root, callback) {
        if (typeof root === "function") {
          callback = root;
          root = new protobuf.Root();
        } else if (!root) root = new protobuf.Root();

        return root.load(filename, callback);
      }
      /**
       * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
       * @name load
       * @function
       * @param {string|string[]} filename One or multiple files to load
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       * @see {@link Root#load}
       * @variation 2
       */
      // function load(filename:string, callback:LoadCallback):undefined

      /**
       * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
       * @name load
       * @function
       * @param {string|string[]} filename One or multiple files to load
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
       * @returns {Promise<Root>} Promise
       * @see {@link Root#load}
       * @variation 3
       */
      // function load(filename:string, [root:Root]):Promise<Root>


      protobuf.load = load;
      /**
       * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
       * @param {string|string[]} filename One or multiple files to load
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
       * @returns {Root} Root namespace
       * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
       * @see {@link Root#loadSync}
       */

      function loadSync(filename, root) {
        if (!root) root = new protobuf.Root();
        return root.loadSync(filename);
      }

      protobuf.loadSync = loadSync; // Serialization

      protobuf.encoder = require(14);
      protobuf.decoder = require(13);
      protobuf.verifier = require(40);
      protobuf.converter = require(12); // Reflection

      protobuf.ReflectionObject = require(24);
      protobuf.Namespace = require(23);
      protobuf.Root = require(29);
      protobuf.Enum = require(15);
      protobuf.Type = require(35);
      protobuf.Field = require(16);
      protobuf.OneOf = require(25);
      protobuf.MapField = require(20);
      protobuf.Service = require(33);
      protobuf.Method = require(22); // Runtime

      protobuf.Message = require(21);
      protobuf.wrappers = require(41); // Utility

      protobuf.types = require(36);
      protobuf.util = require(37); // Configure reflection

      protobuf.ReflectionObject._configure(protobuf.Root);

      protobuf.Namespace._configure(protobuf.Type, protobuf.Service);

      protobuf.Root._configure(protobuf.Type);

      protobuf.Field._configure(protobuf.Type);
    }, {
      "12": 12,
      "13": 13,
      "14": 14,
      "15": 15,
      "16": 16,
      "18": 18,
      "20": 20,
      "21": 21,
      "22": 22,
      "23": 23,
      "24": 24,
      "25": 25,
      "29": 29,
      "33": 33,
      "35": 35,
      "36": 36,
      "37": 37,
      "40": 40,
      "41": 41
    }],
    18: [function (require, module, exports) {
      "use strict";

      var protobuf = exports;
      /**
       * Build type, one of `"full"`, `"light"` or `"minimal"`.
       * @name build
       * @type {string}
       * @const
       */

      protobuf.build = "minimal"; // Serialization

      protobuf.Writer = require(42);
      protobuf.BufferWriter = require(43);
      protobuf.Reader = require(27);
      protobuf.BufferReader = require(28); // Utility

      protobuf.util = require(39);
      protobuf.rpc = require(31);
      protobuf.roots = require(30);
      protobuf.configure = configure;
      /* istanbul ignore next */

      /**
       * Reconfigures the library according to the environment.
       * @returns {undefined}
       */

      function configure() {
        protobuf.Reader._configure(protobuf.BufferReader);

        protobuf.util._configure();
      } // Configure serialization


      protobuf.Writer._configure(protobuf.BufferWriter);

      configure();
    }, {
      "27": 27,
      "28": 28,
      "30": 30,
      "31": 31,
      "39": 39,
      "42": 42,
      "43": 43
    }],
    19: [function (require, module, exports) {
      "use strict";

      var protobuf = module.exports = require(17);

      protobuf.build = "full"; // Parser

      protobuf.tokenize = require(34);
      protobuf.parse = require(26);
      protobuf.common = require(11); // Configure parser

      protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
    }, {
      "11": 11,
      "17": 17,
      "26": 26,
      "34": 34
    }],
    20: [function (require, module, exports) {
      "use strict";

      module.exports = MapField; // extends Field

      var Field = require(16);

      ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

      var types = require(36),
          util = require(37);
      /**
       * Constructs a new map field instance.
       * @classdesc Reflected map field.
       * @extends FieldBase
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} keyType Key type
       * @param {string} type Value type
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */


      function MapField(name, id, keyType, type, options, comment) {
        Field.call(this, name, id, type, undefined, undefined, options, comment);
        /* istanbul ignore if */

        if (!util.isString(keyType)) throw TypeError("keyType must be a string");
        /**
         * Key type.
         * @type {string}
         */

        this.keyType = keyType; // toJSON, marker

        /**
         * Resolved key type if not a basic type.
         * @type {ReflectionObject|null}
         */

        this.resolvedKeyType = null; // Overrides Field#map

        this.map = true;
      }
      /**
       * Map field descriptor.
       * @interface IMapField
       * @extends {IField}
       * @property {string} keyType Key type
       */

      /**
       * Extension map field descriptor.
       * @interface IExtensionMapField
       * @extends IMapField
       * @property {string} extend Extended type
       */

      /**
       * Constructs a map field from a map field descriptor.
       * @param {string} name Field name
       * @param {IMapField} json Map field descriptor
       * @returns {MapField} Created map field
       * @throws {TypeError} If arguments are invalid
       */


      MapField.fromJSON = function fromJSON(name, json) {
        return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
      };
      /**
       * Converts this map field to a map field descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IMapField} Map field descriptor
       */


      MapField.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * @override
       */


      MapField.prototype.resolve = function resolve() {
        if (this.resolved) return this; // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"

        if (types.mapKey[this.keyType] === undefined) throw Error("invalid key type: " + this.keyType);
        return Field.prototype.resolve.call(this);
      };
      /**
       * Map field decorator (TypeScript).
       * @name MapField.d
       * @function
       * @param {number} fieldId Field id
       * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
       * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
       * @returns {FieldDecorator} Decorator function
       * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
       */


      MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
        // submessage value: decorate the submessage and use its name as the type
        if (typeof fieldValueType === "function") fieldValueType = util.decorateType(fieldValueType).name; // enum reference value: create a reflected copy of the enum and keep reuseing it
        else if (fieldValueType && typeof fieldValueType === "object") fieldValueType = util.decorateEnum(fieldValueType).name;
        return function mapFieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
        };
      };
    }, {
      "16": 16,
      "36": 36,
      "37": 37
    }],
    21: [function (require, module, exports) {
      "use strict";

      module.exports = Message;

      var util = require(39);
      /**
       * Constructs a new message instance.
       * @classdesc Abstract runtime message.
       * @constructor
       * @param {Properties<T>} [properties] Properties to set
       * @template T extends object
       */


      function Message(properties) {
        // not used internally
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * Reference to the reflected type.
       * @name Message.$type
       * @type {Type}
       * @readonly
       */

      /**
       * Reference to the reflected type.
       * @name Message#$type
       * @type {Type}
       * @readonly
       */

      /*eslint-disable valid-jsdoc*/

      /**
       * Creates a new message of this type using the specified properties.
       * @param {Object.<string,*>} [properties] Properties to set
       * @returns {Message<T>} Message instance
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.create = function create(properties) {
        return this.$type.create(properties);
      };
      /**
       * Encodes a message of this type.
       * @param {T|Object.<string,*>} message Message to encode
       * @param {Writer} [writer] Writer to use
       * @returns {Writer} Writer
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.encode = function encode(message, writer) {
        return this.$type.encode(message, writer);
      };
      /**
       * Encodes a message of this type preceeded by its length as a varint.
       * @param {T|Object.<string,*>} message Message to encode
       * @param {Writer} [writer] Writer to use
       * @returns {Writer} Writer
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.$type.encodeDelimited(message, writer);
      };
      /**
       * Decodes a message of this type.
       * @name Message.decode
       * @function
       * @param {Reader|Uint8Array} reader Reader or buffer to decode
       * @returns {T} Decoded message
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.decode = function decode(reader) {
        return this.$type.decode(reader);
      };
      /**
       * Decodes a message of this type preceeded by its length as a varint.
       * @name Message.decodeDelimited
       * @function
       * @param {Reader|Uint8Array} reader Reader or buffer to decode
       * @returns {T} Decoded message
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.decodeDelimited = function decodeDelimited(reader) {
        return this.$type.decodeDelimited(reader);
      };
      /**
       * Verifies a message of this type.
       * @name Message.verify
       * @function
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      Message.verify = function verify(message) {
        return this.$type.verify(message);
      };
      /**
       * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
       * @param {Object.<string,*>} object Plain object
       * @returns {T} Message instance
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.fromObject = function fromObject(object) {
        return this.$type.fromObject(object);
      };
      /**
       * Creates a plain object from a message of this type. Also converts values to other types if specified.
       * @param {T} message Message instance
       * @param {IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.toObject = function toObject(message, options) {
        return this.$type.toObject(message, options);
      };
      /**
       * Converts this message to JSON.
       * @returns {Object.<string,*>} JSON object
       */


      Message.prototype.toJSON = function toJSON() {
        return this.$type.toObject(this, util.toJSONOptions);
      };
      /*eslint-enable valid-jsdoc*/

    }, {
      "39": 39
    }],
    22: [function (require, module, exports) {
      "use strict";

      module.exports = Method; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

      var util = require(37);
      /**
       * Constructs a new service method instance.
       * @classdesc Reflected service method.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Method name
       * @param {string|undefined} type Method type, usually `"rpc"`
       * @param {string} requestType Request message type
       * @param {string} responseType Response message type
       * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
       * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] The comment for this method
       */


      function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {
        /* istanbul ignore next */
        if (util.isObject(requestStream)) {
          options = requestStream;
          requestStream = responseStream = undefined;
        } else if (util.isObject(responseStream)) {
          options = responseStream;
          responseStream = undefined;
        }
        /* istanbul ignore if */


        if (!(type === undefined || util.isString(type))) throw TypeError("type must be a string");
        /* istanbul ignore if */

        if (!util.isString(requestType)) throw TypeError("requestType must be a string");
        /* istanbul ignore if */

        if (!util.isString(responseType)) throw TypeError("responseType must be a string");
        ReflectionObject.call(this, name, options);
        /**
         * Method type.
         * @type {string}
         */

        this.type = type || "rpc"; // toJSON

        /**
         * Request type.
         * @type {string}
         */

        this.requestType = requestType; // toJSON, marker

        /**
         * Whether requests are streamed or not.
         * @type {boolean|undefined}
         */

        this.requestStream = requestStream ? true : undefined; // toJSON

        /**
         * Response type.
         * @type {string}
         */

        this.responseType = responseType; // toJSON

        /**
         * Whether responses are streamed or not.
         * @type {boolean|undefined}
         */

        this.responseStream = responseStream ? true : undefined; // toJSON

        /**
         * Resolved request type.
         * @type {Type|null}
         */

        this.resolvedRequestType = null;
        /**
         * Resolved response type.
         * @type {Type|null}
         */

        this.resolvedResponseType = null;
        /**
         * Comment for this method
         * @type {string|null}
         */

        this.comment = comment;
      }
      /**
       * Method descriptor.
       * @interface IMethod
       * @property {string} [type="rpc"] Method type
       * @property {string} requestType Request type
       * @property {string} responseType Response type
       * @property {boolean} [requestStream=false] Whether requests are streamed
       * @property {boolean} [responseStream=false] Whether responses are streamed
       * @property {Object.<string,*>} [options] Method options
       */

      /**
       * Constructs a method from a method descriptor.
       * @param {string} name Method name
       * @param {IMethod} json Method descriptor
       * @returns {Method} Created method
       * @throws {TypeError} If arguments are invalid
       */


      Method.fromJSON = function fromJSON(name, json) {
        return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
      };
      /**
       * Converts this method to a method descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IMethod} Method descriptor
       */


      Method.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["type", this.type !== "rpc" &&
        /* istanbul ignore next */
        this.type || undefined, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * @override
       */


      Method.prototype.resolve = function resolve() {
        /* istanbul ignore if */
        if (this.resolved) return this;
        this.resolvedRequestType = this.parent.lookupType(this.requestType);
        this.resolvedResponseType = this.parent.lookupType(this.responseType);
        return ReflectionObject.prototype.resolve.call(this);
      };
    }, {
      "24": 24,
      "37": 37
    }],
    23: [function (require, module, exports) {
      "use strict";

      module.exports = Namespace; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

      var Enum = require(15),
          Field = require(16),
          util = require(37);

      var Type, // cyclic
      Service; // "

      /**
       * Constructs a new namespace instance.
       * @name Namespace
       * @classdesc Reflected namespace.
       * @extends NamespaceBase
       * @constructor
       * @param {string} name Namespace name
       * @param {Object.<string,*>} [options] Declared options
       */

      /**
       * Constructs a namespace from JSON.
       * @memberof Namespace
       * @function
       * @param {string} name Namespace name
       * @param {Object.<string,*>} json JSON object
       * @returns {Namespace} Created namespace
       * @throws {TypeError} If arguments are invalid
       */

      Namespace.fromJSON = function fromJSON(name, json) {
        return new Namespace(name, json.options).addJSON(json.nested);
      };
      /**
       * Converts an array of reflection objects to JSON.
       * @memberof Namespace
       * @param {ReflectionObject[]} array Object array
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
       */


      function arrayToJSON(array, toJSONOptions) {
        if (!(array && array.length)) return undefined;
        var obj = {};

        for (var i = 0; i < array.length; ++i) {
          obj[array[i].name] = array[i].toJSON(toJSONOptions);
        }

        return obj;
      }

      Namespace.arrayToJSON = arrayToJSON;
      /**
       * Tests if the specified id is reserved.
       * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
       * @param {number} id Id to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */

      Namespace.isReservedId = function isReservedId(reserved, id) {
        if (reserved) for (var i = 0; i < reserved.length; ++i) {
          if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id) return true;
        }
        return false;
      };
      /**
       * Tests if the specified name is reserved.
       * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Namespace.isReservedName = function isReservedName(reserved, name) {
        if (reserved) for (var i = 0; i < reserved.length; ++i) {
          if (reserved[i] === name) return true;
        }
        return false;
      };
      /**
       * Not an actual constructor. Use {@link Namespace} instead.
       * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
       * @exports NamespaceBase
       * @extends ReflectionObject
       * @abstract
       * @constructor
       * @param {string} name Namespace name
       * @param {Object.<string,*>} [options] Declared options
       * @see {@link Namespace}
       */


      function Namespace(name, options) {
        ReflectionObject.call(this, name, options);
        /**
         * Nested objects by name.
         * @type {Object.<string,ReflectionObject>|undefined}
         */

        this.nested = undefined; // toJSON

        /**
         * Cached nested objects as an array.
         * @type {ReflectionObject[]|null}
         * @private
         */

        this._nestedArray = null;
      }

      function clearCache(namespace) {
        namespace._nestedArray = null;
        return namespace;
      }
      /**
       * Nested objects of this namespace as an array for iteration.
       * @name NamespaceBase#nestedArray
       * @type {ReflectionObject[]}
       * @readonly
       */


      Object.defineProperty(Namespace.prototype, "nestedArray", {
        get: function get() {
          return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }
      });
      /**
       * Namespace descriptor.
       * @interface INamespace
       * @property {Object.<string,*>} [options] Namespace options
       * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
       */

      /**
       * Any extension field descriptor.
       * @typedef AnyExtensionField
       * @type {IExtensionField|IExtensionMapField}
       */

      /**
       * Any nested object descriptor.
       * @typedef AnyNestedObject
       * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
       */
      // ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

      /**
       * Converts this namespace to a namespace descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {INamespace} Namespace descriptor
       */

      Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
        return util.toObject(["options", this.options, "nested", arrayToJSON(this.nestedArray, toJSONOptions)]);
      };
      /**
       * Adds nested objects to this namespace from nested object descriptors.
       * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
       * @returns {Namespace} `this`
       */


      Namespace.prototype.addJSON = function addJSON(nestedJson) {
        var ns = this;
        /* istanbul ignore else */

        if (nestedJson) {
          for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add( // most to least likely
            (nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : nested.id !== undefined ? Field.fromJSON : Namespace.fromJSON)(names[i], nested));
          }
        }

        return this;
      };
      /**
       * Gets the nested object of the specified name.
       * @param {string} name Nested object name
       * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
       */


      Namespace.prototype.get = function get(name) {
        return this.nested && this.nested[name] || null;
      };
      /**
       * Gets the values of the nested {@link Enum|enum} of the specified name.
       * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
       * @param {string} name Nested enum name
       * @returns {Object.<string,number>} Enum values
       * @throws {Error} If there is no such enum
       */


      Namespace.prototype.getEnum = function getEnum(name) {
        if (this.nested && this.nested[name] instanceof Enum) return this.nested[name].values;
        throw Error("no such enum: " + name);
      };
      /**
       * Adds a nested object to this namespace.
       * @param {ReflectionObject} object Nested object to add
       * @returns {Namespace} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a nested object with this name
       */


      Namespace.prototype.add = function add(object) {
        if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace)) throw TypeError("object must be a valid nested object");
        if (!this.nested) this.nested = {};else {
          var prev = this.get(object.name);

          if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
              // replace plain namespace but keep existing nested elements and options
              var nested = prev.nestedArray;

              for (var i = 0; i < nested.length; ++i) {
                object.add(nested[i]);
              }

              this.remove(prev);
              if (!this.nested) this.nested = {};
              object.setOptions(prev.options, true);
            } else throw Error("duplicate name '" + object.name + "' in " + this);
          }
        }
        this.nested[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      };
      /**
       * Removes a nested object from this namespace.
       * @param {ReflectionObject} object Nested object to remove
       * @returns {Namespace} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `object` is not a member of this namespace
       */


      Namespace.prototype.remove = function remove(object) {
        if (!(object instanceof ReflectionObject)) throw TypeError("object must be a ReflectionObject");
        if (object.parent !== this) throw Error(object + " is not a member of " + this);
        delete this.nested[object.name];
        if (!Object.keys(this.nested).length) this.nested = undefined;
        object.onRemove(this);
        return clearCache(this);
      };
      /**
       * Defines additial namespaces within this one if not yet existing.
       * @param {string|string[]} path Path to create
       * @param {*} [json] Nested types to create from JSON
       * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
       */


      Namespace.prototype.define = function define(path, json) {
        if (util.isString(path)) path = path.split(".");else if (!Array.isArray(path)) throw TypeError("illegal path");
        if (path && path.length && path[0] === "") throw Error("path must be relative");
        var ptr = this;

        while (path.length > 0) {
          var part = path.shift();

          if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace)) throw Error("path conflicts with non-namespace objects");
          } else ptr.add(ptr = new Namespace(part));
        }

        if (json) ptr.addJSON(json);
        return ptr;
      };
      /**
       * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
       * @returns {Namespace} `this`
       */


      Namespace.prototype.resolveAll = function resolveAll() {
        var nested = this.nestedArray,
            i = 0;

        while (i < nested.length) {
          if (nested[i] instanceof Namespace) nested[i++].resolveAll();else nested[i++].resolve();
        }

        return this.resolve();
      };
      /**
       * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
       * @param {string|string[]} path Path to look up
       * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
       * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
       * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
       */


      Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
        /* istanbul ignore next */
        if (typeof filterTypes === "boolean") {
          parentAlreadyChecked = filterTypes;
          filterTypes = undefined;
        } else if (filterTypes && !Array.isArray(filterTypes)) filterTypes = [filterTypes];

        if (util.isString(path) && path.length) {
          if (path === ".") return this.root;
          path = path.split(".");
        } else if (!path.length) return this; // Start at root if path is absolute


        if (path[0] === "") return this.root.lookup(path.slice(1), filterTypes); // Test if the first part matches any nested object, and if so, traverse if path contains more

        var found = this.get(path[0]);

        if (found) {
          if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1) return found;
          } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true))) return found; // Otherwise try each nested namespace

        } else for (var i = 0; i < this.nestedArray.length; ++i) {
          if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true))) return found;
        } // If there hasn't been a match, try again at the parent


        if (this.parent === null || parentAlreadyChecked) return null;
        return this.parent.lookup(path, filterTypes);
      };
      /**
       * Looks up the reflection object at the specified path, relative to this namespace.
       * @name NamespaceBase#lookup
       * @function
       * @param {string|string[]} path Path to look up
       * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
       * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
       * @variation 2
       */
      // lookup(path: string, [parentAlreadyChecked: boolean])

      /**
       * Looks up the {@link Type|type} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Type} Looked up type
       * @throws {Error} If `path` does not point to a type
       */


      Namespace.prototype.lookupType = function lookupType(path) {
        var found = this.lookup(path, [Type]);
        if (!found) throw Error("no such type: " + path);
        return found;
      };
      /**
       * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Enum} Looked up enum
       * @throws {Error} If `path` does not point to an enum
       */


      Namespace.prototype.lookupEnum = function lookupEnum(path) {
        var found = this.lookup(path, [Enum]);
        if (!found) throw Error("no such Enum '" + path + "' in " + this);
        return found;
      };
      /**
       * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Type} Looked up type or enum
       * @throws {Error} If `path` does not point to a type or enum
       */


      Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
        var found = this.lookup(path, [Type, Enum]);
        if (!found) throw Error("no such Type or Enum '" + path + "' in " + this);
        return found;
      };
      /**
       * Looks up the {@link Service|service} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Service} Looked up service
       * @throws {Error} If `path` does not point to a service
       */


      Namespace.prototype.lookupService = function lookupService(path) {
        var found = this.lookup(path, [Service]);
        if (!found) throw Error("no such Service '" + path + "' in " + this);
        return found;
      };

      Namespace._configure = function (Type_, Service_) {
        Type = Type_;
        Service = Service_;
      };
    }, {
      "15": 15,
      "16": 16,
      "24": 24,
      "37": 37
    }],
    24: [function (require, module, exports) {
      "use strict";

      module.exports = ReflectionObject;
      ReflectionObject.className = "ReflectionObject";

      var util = require(37);

      var Root; // cyclic

      /**
       * Constructs a new reflection object instance.
       * @classdesc Base class of all reflection objects.
       * @constructor
       * @param {string} name Object name
       * @param {Object.<string,*>} [options] Declared options
       * @abstract
       */

      function ReflectionObject(name, options) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        if (options && !util.isObject(options)) throw TypeError("options must be an object");
        /**
         * Options.
         * @type {Object.<string,*>|undefined}
         */

        this.options = options; // toJSON

        /**
         * Unique name within its namespace.
         * @type {string}
         */

        this.name = name;
        /**
         * Parent namespace.
         * @type {Namespace|null}
         */

        this.parent = null;
        /**
         * Whether already resolved or not.
         * @type {boolean}
         */

        this.resolved = false;
        /**
         * Comment text, if any.
         * @type {string|null}
         */

        this.comment = null;
        /**
         * Defining file name.
         * @type {string|null}
         */

        this.filename = null;
      }

      Object.defineProperties(ReflectionObject.prototype, {
        /**
         * Reference to the root namespace.
         * @name ReflectionObject#root
         * @type {Root}
         * @readonly
         */
        root: {
          get: function get() {
            var ptr = this;

            while (ptr.parent !== null) {
              ptr = ptr.parent;
            }

            return ptr;
          }
        },

        /**
         * Full name including leading dot.
         * @name ReflectionObject#fullName
         * @type {string}
         * @readonly
         */
        fullName: {
          get: function get() {
            var path = [this.name],
                ptr = this.parent;

            while (ptr) {
              path.unshift(ptr.name);
              ptr = ptr.parent;
            }

            return path.join(".");
          }
        }
      });
      /**
       * Converts this reflection object to its descriptor representation.
       * @returns {Object.<string,*>} Descriptor
       * @abstract
       */

      ReflectionObject.prototype.toJSON =
      /* istanbul ignore next */
      function toJSON() {
        throw Error(); // not implemented, shouldn't happen
      };
      /**
       * Called when this object is added to a parent.
       * @param {ReflectionObject} parent Parent added to
       * @returns {undefined}
       */


      ReflectionObject.prototype.onAdd = function onAdd(parent) {
        if (this.parent && this.parent !== parent) this.parent.remove(this);
        this.parent = parent;
        this.resolved = false;
        var root = parent.root;
        if (root instanceof Root) root._handleAdd(this);
      };
      /**
       * Called when this object is removed from a parent.
       * @param {ReflectionObject} parent Parent removed from
       * @returns {undefined}
       */


      ReflectionObject.prototype.onRemove = function onRemove(parent) {
        var root = parent.root;
        if (root instanceof Root) root._handleRemove(this);
        this.parent = null;
        this.resolved = false;
      };
      /**
       * Resolves this objects type references.
       * @returns {ReflectionObject} `this`
       */


      ReflectionObject.prototype.resolve = function resolve() {
        if (this.resolved) return this;
        if (this.root instanceof Root) this.resolved = true; // only if part of a root

        return this;
      };
      /**
       * Gets an option value.
       * @param {string} name Option name
       * @returns {*} Option value or `undefined` if not set
       */


      ReflectionObject.prototype.getOption = function getOption(name) {
        if (this.options) return this.options[name];
        return undefined;
      };
      /**
       * Sets an option.
       * @param {string} name Option name
       * @param {*} value Option value
       * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
       * @returns {ReflectionObject} `this`
       */


      ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
        if (!ifNotSet || !this.options || this.options[name] === undefined) (this.options || (this.options = {}))[name] = value;
        return this;
      };
      /**
       * Sets multiple options.
       * @param {Object.<string,*>} options Options to set
       * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
       * @returns {ReflectionObject} `this`
       */


      ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
        if (options) for (var keys = Object.keys(options), i = 0; i < keys.length; ++i) {
          this.setOption(keys[i], options[keys[i]], ifNotSet);
        }
        return this;
      };
      /**
       * Converts this instance to its string representation.
       * @returns {string} Class name[, space, full name]
       */


      ReflectionObject.prototype.toString = function toString() {
        var className = this.constructor.className,
            fullName = this.fullName;
        if (fullName.length) return className + " " + fullName;
        return className;
      };

      ReflectionObject._configure = function (Root_) {
        Root = Root_;
      };
    }, {
      "37": 37
    }],
    25: [function (require, module, exports) {
      "use strict";

      module.exports = OneOf; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

      var Field = require(16),
          util = require(37);
      /**
       * Constructs a new oneof instance.
       * @classdesc Reflected oneof.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Oneof name
       * @param {string[]|Object.<string,*>} [fieldNames] Field names
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */


      function OneOf(name, fieldNames, options, comment) {
        if (!Array.isArray(fieldNames)) {
          options = fieldNames;
          fieldNames = undefined;
        }

        ReflectionObject.call(this, name, options);
        /* istanbul ignore if */

        if (!(fieldNames === undefined || Array.isArray(fieldNames))) throw TypeError("fieldNames must be an Array");
        /**
         * Field names that belong to this oneof.
         * @type {string[]}
         */

        this.oneof = fieldNames || []; // toJSON, marker

        /**
         * Fields that belong to this oneof as an array for iteration.
         * @type {Field[]}
         * @readonly
         */

        this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

        /**
         * Comment for this field.
         * @type {string|null}
         */

        this.comment = comment;
      }
      /**
       * Oneof descriptor.
       * @interface IOneOf
       * @property {Array.<string>} oneof Oneof field names
       * @property {Object.<string,*>} [options] Oneof options
       */

      /**
       * Constructs a oneof from a oneof descriptor.
       * @param {string} name Oneof name
       * @param {IOneOf} json Oneof descriptor
       * @returns {OneOf} Created oneof
       * @throws {TypeError} If arguments are invalid
       */


      OneOf.fromJSON = function fromJSON(name, json) {
        return new OneOf(name, json.oneof, json.options, json.comment);
      };
      /**
       * Converts this oneof to a oneof descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IOneOf} Oneof descriptor
       */


      OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", this.options, "oneof", this.oneof, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * Adds the fields of the specified oneof to the parent if not already done so.
       * @param {OneOf} oneof The oneof
       * @returns {undefined}
       * @inner
       * @ignore
       */


      function addFieldsToParent(oneof) {
        if (oneof.parent) for (var i = 0; i < oneof.fieldsArray.length; ++i) {
          if (!oneof.fieldsArray[i].parent) oneof.parent.add(oneof.fieldsArray[i]);
        }
      }
      /**
       * Adds a field to this oneof and removes it from its current parent, if any.
       * @param {Field} field Field to add
       * @returns {OneOf} `this`
       */


      OneOf.prototype.add = function add(field) {
        /* istanbul ignore if */
        if (!(field instanceof Field)) throw TypeError("field must be a Field");
        if (field.parent && field.parent !== this.parent) field.parent.remove(field);
        this.oneof.push(field.name);
        this.fieldsArray.push(field);
        field.partOf = this; // field.parent remains null

        addFieldsToParent(this);
        return this;
      };
      /**
       * Removes a field from this oneof and puts it back to the oneof's parent.
       * @param {Field} field Field to remove
       * @returns {OneOf} `this`
       */


      OneOf.prototype.remove = function remove(field) {
        /* istanbul ignore if */
        if (!(field instanceof Field)) throw TypeError("field must be a Field");
        var index = this.fieldsArray.indexOf(field);
        /* istanbul ignore if */

        if (index < 0) throw Error(field + " is not a member of " + this);
        this.fieldsArray.splice(index, 1);
        index = this.oneof.indexOf(field.name);
        /* istanbul ignore else */

        if (index > -1) // theoretical
          this.oneof.splice(index, 1);
        field.partOf = null;
        return this;
      };
      /**
       * @override
       */


      OneOf.prototype.onAdd = function onAdd(parent) {
        ReflectionObject.prototype.onAdd.call(this, parent);
        var self = this; // Collect present fields

        for (var i = 0; i < this.oneof.length; ++i) {
          var field = parent.get(this.oneof[i]);

          if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
          }
        } // Add not yet present fields


        addFieldsToParent(this);
      };
      /**
       * @override
       */


      OneOf.prototype.onRemove = function onRemove(parent) {
        for (var i = 0, field; i < this.fieldsArray.length; ++i) {
          if ((field = this.fieldsArray[i]).parent) field.parent.remove(field);
        }

        ReflectionObject.prototype.onRemove.call(this, parent);
      };
      /**
       * Decorator function as returned by {@link OneOf.d} (TypeScript).
       * @typedef OneOfDecorator
       * @type {function}
       * @param {Object} prototype Target prototype
       * @param {string} oneofName OneOf name
       * @returns {undefined}
       */

      /**
       * OneOf decorator (TypeScript).
       * @function
       * @param {...string} fieldNames Field names
       * @returns {OneOfDecorator} Decorator function
       * @template T extends string
       */


      OneOf.d = function decorateOneOf() {
        var fieldNames = new Array(arguments.length),
            index = 0;

        while (index < arguments.length) {
          fieldNames[index] = arguments[index++];
        }

        return function oneOfDecorator(prototype, oneofName) {
          util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
          Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
          });
        };
      };
    }, {
      "16": 16,
      "24": 24,
      "37": 37
    }],
    26: [function (require, module, exports) {
      "use strict";

      module.exports = parse;
      parse.filename = null;
      parse.defaults = {
        keepCase: false
      };

      var tokenize = require(34),
          Root = require(29),
          Type = require(35),
          Field = require(16),
          MapField = require(20),
          OneOf = require(25),
          Enum = require(15),
          Service = require(33),
          Method = require(22),
          types = require(36),
          util = require(37);

      var base10Re = /^[1-9][0-9]*$/,
          base10NegRe = /^-?[1-9][0-9]*$/,
          base16Re = /^0[x][0-9a-fA-F]+$/,
          base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
          base8Re = /^0[0-7]+$/,
          base8NegRe = /^-?0[0-7]+$/,
          numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
          nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
          typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
          fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
      /**
       * Result object returned from {@link parse}.
       * @interface IParserResult
       * @property {string|undefined} package Package name, if declared
       * @property {string[]|undefined} imports Imports, if any
       * @property {string[]|undefined} weakImports Weak imports, if any
       * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
       * @property {Root} root Populated root instance
       */

      /**
       * Options modifying the behavior of {@link parse}.
       * @interface IParseOptions
       * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
       * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
       */

      /**
       * Options modifying the behavior of JSON serialization.
       * @interface IToJSONOptions
       * @property {boolean} [keepComments=false] Serializes comments.
       */

      /**
       * Parses the given .proto source and returns an object with the parsed contents.
       * @param {string} source Source contents
       * @param {Root} root Root to populate
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {IParserResult} Parser result
       * @property {string} filename=null Currently processing file name for error reporting, if known
       * @property {IParseOptions} defaults Default {@link IParseOptions}
       */

      function parse(source, root, options) {
        /* eslint-disable callback-return */
        if (!(root instanceof Root)) {
          options = root;
          root = new Root();
        }

        if (!options) options = parse.defaults;
        var tn = tokenize(source, options.alternateCommentMode || false),
            next = tn.next,
            push = tn.push,
            peek = tn.peek,
            skip = tn.skip,
            cmnt = tn.cmnt;
        var head = true,
            pkg,
            imports,
            weakImports,
            syntax,
            isProto3 = false;
        var ptr = root;
        var applyCase = options.keepCase ? function (name) {
          return name;
        } : util.camelCase;
        /* istanbul ignore next */

        function illegal(token, name, insideTryCatch) {
          var filename = parse.filename;
          if (!insideTryCatch) parse.filename = null;
          return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
        }

        function readString() {
          var values = [],
              token;

          do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'") throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
          } while (token === "\"" || token === "'");

          return values.join("");
        }

        function readValue(acceptTypeRef) {
          var token = next();

          switch (token) {
            case "'":
            case "\"":
              push(token);
              return readString();

            case "true":
            case "TRUE":
              return true;

            case "false":
            case "FALSE":
              return false;
          }

          try {
            return parseNumber(token,
            /* insideTryCatch */
            true);
          } catch (e) {
            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token)) return token;
            /* istanbul ignore next */

            throw illegal(token, "value");
          }
        }

        function readRanges(target, acceptStrings) {
          var token, start;

          do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'")) target.push(readString());else target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
          } while (skip(",", true));

          skip(";");
        }

        function parseNumber(token, insideTryCatch) {
          var sign = 1;

          if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
          }

          switch (token) {
            case "inf":
            case "INF":
            case "Inf":
              return sign * Infinity;

            case "nan":
            case "NAN":
            case "Nan":
            case "NaN":
              return NaN;

            case "0":
              return 0;
          }

          if (base10Re.test(token)) return sign * parseInt(token, 10);
          if (base16Re.test(token)) return sign * parseInt(token, 16);
          if (base8Re.test(token)) return sign * parseInt(token, 8);
          /* istanbul ignore else */

          if (numberRe.test(token)) return sign * parseFloat(token);
          /* istanbul ignore next */

          throw illegal(token, "number", insideTryCatch);
        }

        function parseId(token, acceptNegative) {
          switch (token) {
            case "max":
            case "MAX":
            case "Max":
              return 536870911;

            case "0":
              return 0;
          }
          /* istanbul ignore if */


          if (!acceptNegative && token.charAt(0) === "-") throw illegal(token, "id");
          if (base10NegRe.test(token)) return parseInt(token, 10);
          if (base16NegRe.test(token)) return parseInt(token, 16);
          /* istanbul ignore else */

          if (base8NegRe.test(token)) return parseInt(token, 8);
          /* istanbul ignore next */

          throw illegal(token, "id");
        }

        function parsePackage() {
          /* istanbul ignore if */
          if (pkg !== undefined) throw illegal("package");
          pkg = next();
          /* istanbul ignore if */

          if (!typeRefRe.test(pkg)) throw illegal(pkg, "name");
          ptr = ptr.define(pkg);
          skip(";");
        }

        function parseImport() {
          var token = peek();
          var whichImports;

          switch (token) {
            case "weak":
              whichImports = weakImports || (weakImports = []);
              next();
              break;

            case "public":
              next();
            // eslint-disable-line no-fallthrough

            default:
              whichImports = imports || (imports = []);
              break;
          }

          token = readString();
          skip(";");
          whichImports.push(token);
        }

        function parseSyntax() {
          skip("=");
          syntax = readString();
          isProto3 = syntax === "proto3";
          /* istanbul ignore if */

          if (!isProto3 && syntax !== "proto2") throw illegal(syntax, "syntax");
          skip(";");
        }

        function parseCommon(parent, token) {
          switch (token) {
            case "option":
              parseOption(parent, token);
              skip(";");
              return true;

            case "message":
              parseType(parent, token);
              return true;

            case "enum":
              parseEnum(parent, token);
              return true;

            case "service":
              parseService(parent, token);
              return true;

            case "extend":
              parseExtension(parent, token);
              return true;
          }

          return false;
        }

        function ifBlock(obj, fnIf, fnElse) {
          var trailingLine = tn.line;

          if (obj) {
            obj.comment = cmnt(); // try block-type comment

            obj.filename = parse.filename;
          }

          if (skip("{", true)) {
            var token;

            while ((token = next()) !== "}") {
              fnIf(token);
            }

            skip(";", true);
          } else {
            if (fnElse) fnElse();
            skip(";");
            if (obj && typeof obj.comment !== "string") obj.comment = cmnt(trailingLine); // try line-type comment if no block
          }
        }

        function parseType(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "type name");
          var type = new Type(token);
          ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token)) return;

            switch (token) {
              case "map":
                parseMapField(type, token);
                break;

              case "required":
              case "optional":
              case "repeated":
                parseField(type, token);
                break;

              case "oneof":
                parseOneOf(type, token);
                break;

              case "extensions":
                readRanges(type.extensions || (type.extensions = []));
                break;

              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;

              default:
                /* istanbul ignore if */
                if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                push(token);
                parseField(type, "optional");
                break;
            }
          });
          parent.add(type);
        }

        function parseField(parent, rule, extend) {
          var type = next();

          if (type === "group") {
            parseGroup(parent, rule);
            return;
          }
          /* istanbul ignore if */


          if (!typeRefRe.test(type)) throw illegal(type, "type");
          var name = next();
          /* istanbul ignore if */

          if (!nameRe.test(name)) throw illegal(name, "name");
          name = applyCase(name);
          skip("=");
          var field = new Field(name, parseId(next()), type, rule, extend);
          ifBlock(field, function parseField_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(field, token);
              skip(";");
            } else throw illegal(token);
          }, function parseField_line() {
            parseInlineOptions(field);
          });
          parent.add(field); // JSON defaults to packed=true if not set so we have to set packed=false explicity when
          // parsing proto2 descriptors without the option, where applicable. This must be done for
          // all known packable types and anything that could be an enum (= is not a basic type).

          if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined)) field.setOption("packed", false,
          /* ifNotSet */
          true);
        }

        function parseGroup(parent, rule) {
          var name = next();
          /* istanbul ignore if */

          if (!nameRe.test(name)) throw illegal(name, "name");
          var fieldName = util.lcFirst(name);
          if (name === fieldName) name = util.ucFirst(name);
          skip("=");
          var id = parseId(next());
          var type = new Type(name);
          type.group = true;
          var field = new Field(fieldName, id, name, rule);
          field.filename = parse.filename;
          ifBlock(type, function parseGroup_block(token) {
            switch (token) {
              case "option":
                parseOption(type, token);
                skip(";");
                break;

              case "required":
              case "optional":
              case "repeated":
                parseField(type, token);
                break;

              /* istanbul ignore next */

              default:
                throw illegal(token);
              // there are no groups with proto3 semantics
            }
          });
          parent.add(type).add(field);
        }

        function parseMapField(parent) {
          skip("<");
          var keyType = next();
          /* istanbul ignore if */

          if (types.mapKey[keyType] === undefined) throw illegal(keyType, "type");
          skip(",");
          var valueType = next();
          /* istanbul ignore if */

          if (!typeRefRe.test(valueType)) throw illegal(valueType, "type");
          skip(">");
          var name = next();
          /* istanbul ignore if */

          if (!nameRe.test(name)) throw illegal(name, "name");
          skip("=");
          var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
          ifBlock(field, function parseMapField_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(field, token);
              skip(";");
            } else throw illegal(token);
          }, function parseMapField_line() {
            parseInlineOptions(field);
          });
          parent.add(field);
        }

        function parseOneOf(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "name");
          var oneof = new OneOf(applyCase(token));
          ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
              parseOption(oneof, token);
              skip(";");
            } else {
              push(token);
              parseField(oneof, "optional");
            }
          });
          parent.add(oneof);
        }

        function parseEnum(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "name");
          var enm = new Enum(token);
          ifBlock(enm, function parseEnum_block(token) {
            switch (token) {
              case "option":
                parseOption(enm, token);
                skip(";");
                break;

              case "reserved":
                readRanges(enm.reserved || (enm.reserved = []), true);
                break;

              default:
                parseEnumValue(enm, token);
            }
          });
          parent.add(enm);
        }

        function parseEnumValue(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token)) throw illegal(token, "name");
          skip("=");
          var value = parseId(next(), true),
              dummy = {};
          ifBlock(dummy, function parseEnumValue_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(dummy, token); // skip

              skip(";");
            } else throw illegal(token);
          }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
          });
          parent.add(token, value, dummy.comment);
        }

        function parseOption(parent, token) {
          var isCustom = skip("(", true);
          /* istanbul ignore if */

          if (!typeRefRe.test(token = next())) throw illegal(token, "name");
          var name = token;

          if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();

            if (fqTypeRefRe.test(token)) {
              name += token;
              next();
            }
          }

          skip("=");
          parseOptionValue(parent, name);
        }

        function parseOptionValue(parent, name) {
          if (skip("{", true)) {
            // { a: "foo" b { c: "bar" } }
            do {
              /* istanbul ignore if */
              if (!nameRe.test(token = next())) throw illegal(token, "name");
              if (peek() === "{") parseOptionValue(parent, name + "." + token);else {
                skip(":");
                if (peek() === "{") parseOptionValue(parent, name + "." + token);else setOption(parent, name + "." + token, readValue(true));
              }
            } while (!skip("}", true));
          } else setOption(parent, name, readValue(true)); // Does not enforce a delimiter to be universal

        }

        function setOption(parent, name, value) {
          if (parent.setOption) parent.setOption(name, value);
        }

        function parseInlineOptions(parent) {
          if (skip("[", true)) {
            do {
              parseOption(parent, "option");
            } while (skip(",", true));

            skip("]");
          }

          return parent;
        }

        function parseService(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "service name");
          var service = new Service(token);
          ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token)) return;
            /* istanbul ignore else */

            if (token === "rpc") parseMethod(service, token);else throw illegal(token);
          });
          parent.add(service);
        }

        function parseMethod(parent, token) {
          var type = token;
          /* istanbul ignore if */

          if (!nameRe.test(token = next())) throw illegal(token, "name");
          var name = token,
              requestType,
              requestStream,
              responseType,
              responseStream;
          skip("(");
          if (skip("stream", true)) requestStream = true;
          /* istanbul ignore if */

          if (!typeRefRe.test(token = next())) throw illegal(token);
          requestType = token;
          skip(")");
          skip("returns");
          skip("(");
          if (skip("stream", true)) responseStream = true;
          /* istanbul ignore if */

          if (!typeRefRe.test(token = next())) throw illegal(token);
          responseType = token;
          skip(")");
          var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
          ifBlock(method, function parseMethod_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(method, token);
              skip(";");
            } else throw illegal(token);
          });
          parent.add(method);
        }

        function parseExtension(parent, token) {
          /* istanbul ignore if */
          if (!typeRefRe.test(token = next())) throw illegal(token, "reference");
          var reference = token;
          ifBlock(null, function parseExtension_block(token) {
            switch (token) {
              case "required":
              case "repeated":
              case "optional":
                parseField(parent, token, reference);
                break;

              default:
                /* istanbul ignore if */
                if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                push(token);
                parseField(parent, "optional", reference);
                break;
            }
          });
        }

        var token;

        while ((token = next()) !== null) {
          switch (token) {
            case "package":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parsePackage();
              break;

            case "import":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parseImport();
              break;

            case "syntax":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parseSyntax();
              break;

            case "option":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parseOption(ptr, token);
              skip(";");
              break;

            default:
              /* istanbul ignore else */
              if (parseCommon(ptr, token)) {
                head = false;
                continue;
              }
              /* istanbul ignore next */


              throw illegal(token);
          }
        }

        parse.filename = null;
        return {
          "package": pkg,
          "imports": imports,
          weakImports: weakImports,
          syntax: syntax,
          root: root
        };
      }
      /**
       * Parses the given .proto source and returns an object with the parsed contents.
       * @name parse
       * @function
       * @param {string} source Source contents
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {IParserResult} Parser result
       * @property {string} filename=null Currently processing file name for error reporting, if known
       * @property {IParseOptions} defaults Default {@link IParseOptions}
       * @variation 2
       */

    }, {
      "15": 15,
      "16": 16,
      "20": 20,
      "22": 22,
      "25": 25,
      "29": 29,
      "33": 33,
      "34": 34,
      "35": 35,
      "36": 36,
      "37": 37
    }],
    27: [function (require, module, exports) {
      "use strict";

      module.exports = Reader;

      var util = require(39);

      var BufferReader; // cyclic

      var LongBits = util.LongBits,
          utf8 = util.utf8;
      /* istanbul ignore next */

      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      /**
       * Constructs a new reader instance using the specified buffer.
       * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
       * @constructor
       * @param {Uint8Array} buffer Buffer to read from
       */


      function Reader(buffer) {
        /**
         * Read buffer.
         * @type {Uint8Array}
         */
        this.buf = buffer;
        /**
         * Read buffer position.
         * @type {number}
         */

        this.pos = 0;
        /**
         * Read buffer length.
         * @type {number}
         */

        this.len = buffer.length;
      }

      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
        throw Error("illegal buffer");
      }
      /* istanbul ignore next */
      : function create_array(buffer) {
        if (Array.isArray(buffer)) return new Reader(buffer);
        throw Error("illegal buffer");
      };
      /**
       * Creates a new reader using the specified buffer.
       * @function
       * @param {Uint8Array|Buffer} buffer Buffer to read from
       * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
       * @throws {Error} If `buffer` is not a valid buffer
       */

      Reader.create = util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
          return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer)
          /* istanbul ignore next */
          : create_array(buffer);
        })(buffer);
      }
      /* istanbul ignore next */
      : create_array;
      Reader.prototype._slice = util.Array.prototype.subarray ||
      /* istanbul ignore next */
      util.Array.prototype.slice;
      /**
       * Reads a varint as an unsigned 32 bit value.
       * @function
       * @returns {number} Value read
       */

      Reader.prototype.uint32 = function read_uint32_setup() {
        var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)

        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          /* istanbul ignore if */

          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }

          return value;
        };
      }();
      /**
       * Reads a varint as a signed 32 bit value.
       * @returns {number} Value read
       */


      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      /**
       * Reads a zig-zag encoded varint as a signed 32 bit value.
       * @returns {number} Value read
       */


      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      /* eslint-disable no-invalid-this */


      function readLongVarint() {
        // tends to deopt with local vars for octet etc.
        var bits = new LongBits(0, 0);
        var i = 0;

        if (this.len - this.pos > 4) {
          // fast route (lo)
          for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          } // 5th


          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this); // 1st..3th

            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          } // 4th


          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }

        if (this.len - this.pos > 4) {
          // fast route (hi)
          for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        } else {
          for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this); // 6th..10th

            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        }
        /* istanbul ignore next */


        throw Error("invalid varint encoding");
      }
      /* eslint-enable no-invalid-this */

      /**
       * Reads a varint as a signed 64 bit value.
       * @name Reader#int64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a varint as an unsigned 64 bit value.
       * @name Reader#uint64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a zig-zag encoded varint as a signed 64 bit value.
       * @name Reader#sint64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a varint as a boolean.
       * @returns {boolean} Value read
       */


      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };

      function readFixed32_end(buf, end) {
        // note that this uses `end`, not `pos`
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      /**
       * Reads fixed 32 bits as an unsigned 32 bit integer.
       * @returns {number} Value read
       */


      Reader.prototype.fixed32 = function read_fixed32() {
        /* istanbul ignore if */
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      /**
       * Reads fixed 32 bits as a signed 32 bit integer.
       * @returns {number} Value read
       */


      Reader.prototype.sfixed32 = function read_sfixed32() {
        /* istanbul ignore if */
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      /* eslint-disable no-invalid-this */


      function readFixed64()
      /* this: Reader */
      {
        /* istanbul ignore if */
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      /* eslint-enable no-invalid-this */

      /**
       * Reads fixed 64 bits.
       * @name Reader#fixed64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads zig-zag encoded fixed 64 bits.
       * @name Reader#sfixed64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a float (32 bit) as a number.
       * @function
       * @returns {number} Value read
       */


      Reader.prototype["float"] = function read_float() {
        /* istanbul ignore if */
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        var value = util["float"].readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      /**
       * Reads a double (64 bit float) as a number.
       * @function
       * @returns {number} Value read
       */


      Reader.prototype["double"] = function read_double() {
        /* istanbul ignore if */
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
        var value = util["float"].readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      /**
       * Reads a sequence of bytes preceeded by its length as a varint.
       * @returns {Uint8Array} Value read
       */


      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(),
            start = this.pos,
            end = this.pos + length;
        /* istanbul ignore if */

        if (end > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf)) // plain array
          return this.buf.slice(start, end);
        return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
      };
      /**
       * Reads a string preceeded by its byte length as a varint.
       * @returns {string} Value read
       */


      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      /**
       * Skips the specified number of bytes if specified, otherwise skips a varint.
       * @param {number} [length] Length if known, otherwise a varint is assumed
       * @returns {Reader} `this`
       */


      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          /* istanbul ignore if */
          if (this.pos + length > this.len) throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }

        return this;
      };
      /**
       * Skips the next element of the specified wire type.
       * @param {number} wireType Wire type received
       * @returns {Reader} `this`
       */


      Reader.prototype.skipType = function (wireType) {
        switch (wireType) {
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
            do {
              // eslint-disable-line no-constant-condition
              if ((wireType = this.uint32() & 7) === 4) break;
              this.skipType(wireType);
            } while (true);

            break;

          case 5:
            this.skip(4);
            break;

          /* istanbul ignore next */

          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }

        return this;
      };

      Reader._configure = function (BufferReader_) {
        BufferReader = BufferReader_;
        var fn = util.Long ? "toLong" :
        /* istanbul ignore next */
        "toNumber";
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }, {
      "39": 39
    }],
    28: [function (require, module, exports) {
      "use strict";

      module.exports = BufferReader; // extends Reader

      var Reader = require(27);

      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

      var util = require(39);
      /**
       * Constructs a new buffer reader instance.
       * @classdesc Wire format reader using node buffers.
       * @extends Reader
       * @constructor
       * @param {Buffer} buffer Buffer to read from
       */


      function BufferReader(buffer) {
        Reader.call(this, buffer);
        /**
         * Read buffer.
         * @name BufferReader#buf
         * @type {Buffer}
         */
      }
      /* istanbul ignore else */


      if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
      /**
       * @override
       */

      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32(); // modifies pos

        return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      /**
       * Reads a sequence of bytes preceeded by its length as a varint.
       * @name BufferReader#bytes
       * @function
       * @returns {Buffer} Value read
       */

    }, {
      "27": 27,
      "39": 39
    }],
    29: [function (require, module, exports) {
      "use strict";

      module.exports = Root; // extends Namespace

      var Namespace = require(23);

      ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

      var Field = require(16),
          Enum = require(15),
          OneOf = require(25),
          util = require(37);

      var Type, // cyclic
      parse, // might be excluded
      common; // "

      /**
       * Constructs a new root namespace instance.
       * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
       * @extends NamespaceBase
       * @constructor
       * @param {Object.<string,*>} [options] Top level options
       */

      function Root(options) {
        Namespace.call(this, "", options);
        /**
         * Deferred extension fields.
         * @type {Field[]}
         */

        this.deferred = [];
        /**
         * Resolved file names of loaded files.
         * @type {string[]}
         */

        this.files = [];
      }
      /**
       * Loads a namespace descriptor into a root namespace.
       * @param {INamespace} json Nameespace descriptor
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted
       * @returns {Root} Root namespace
       */


      Root.fromJSON = function fromJSON(json, root) {
        if (!root) root = new Root();
        if (json.options) root.setOptions(json.options);
        return root.addJSON(json.nested);
      };
      /**
       * Resolves the path of an imported file, relative to the importing origin.
       * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
       * @function
       * @param {string} origin The file name of the importing file
       * @param {string} target The file name being imported
       * @returns {string|null} Resolved path to `target` or `null` to skip the file
       */


      Root.prototype.resolvePath = util.path.resolve; // A symbol-like function to safely signal synchronous loading

      /* istanbul ignore next */

      function SYNC() {} // eslint-disable-line no-empty-function

      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {IParseOptions} options Parse options
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       */


      Root.prototype.load = function load(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = undefined;
        }

        var self = this;
        if (!callback) return util.asPromise(load, self, filename, options);
        var sync = callback === SYNC; // undocumented
        // Finishes loading by calling the callback (exactly once)

        function finish(err, root) {
          /* istanbul ignore if */
          if (!callback) return;
          var cb = callback;
          callback = null;
          if (sync) throw err;
          cb(err, root);
        } // Processes a single file


        function process(filename, source) {
          try {
            if (util.isString(source) && source.charAt(0) === "{") source = JSON.parse(source);
            if (!util.isString(source)) self.setOptions(source.options).addJSON(source.nested);else {
              parse.filename = filename;
              var parsed = parse(source, self, options),
                  resolved,
                  i = 0;
              if (parsed.imports) for (; i < parsed.imports.length; ++i) {
                if (resolved = self.resolvePath(filename, parsed.imports[i])) fetch(resolved);
              }
              if (parsed.weakImports) for (i = 0; i < parsed.weakImports.length; ++i) {
                if (resolved = self.resolvePath(filename, parsed.weakImports[i])) fetch(resolved, true);
              }
            }
          } catch (err) {
            finish(err);
          }

          if (!sync && !queued) finish(null, self); // only once anyway
        } // Fetches a single file


        function fetch(filename, weak) {
          // Strip path if this file references a bundled definition
          var idx = filename.lastIndexOf("google/protobuf/");

          if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common) filename = altname;
          } // Skip if already loaded / attempted


          if (self.files.indexOf(filename) > -1) return;
          self.files.push(filename); // Shortcut bundled definitions

          if (filename in common) {
            if (sync) process(filename, common[filename]);else {
              ++queued;
              setTimeout(function () {
                --queued;
                process(filename, common[filename]);
              });
            }
            return;
          } // Otherwise fetch from disk or network


          if (sync) {
            var source;

            try {
              source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
              if (!weak) finish(err);
              return;
            }

            process(filename, source);
          } else {
            ++queued;
            util.fetch(filename, function (err, source) {
              --queued;
              /* istanbul ignore if */

              if (!callback) return; // terminated meanwhile

              if (err) {
                /* istanbul ignore else */
                if (!weak) finish(err);else if (!queued) // can't be covered reliably
                  finish(null, self);
                return;
              }

              process(filename, source);
            });
          }
        }

        var queued = 0; // Assembling the root namespace doesn't require working type
        // references anymore, so we can load everything in parallel

        if (util.isString(filename)) filename = [filename];

        for (var i = 0, resolved; i < filename.length; ++i) {
          if (resolved = self.resolvePath("", filename[i])) fetch(resolved);
        }

        if (sync) return self;
        if (!queued) finish(null, self);
        return undefined;
      }; // function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
       * @function Root#load
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       * @variation 2
       */
      // function load(filename:string, callback:LoadCallback):undefined

      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
       * @function Root#load
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {Promise<Root>} Promise
       * @variation 3
       */
      // function load(filename:string, [options:IParseOptions]):Promise<Root>

      /**
       * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
       * @function Root#loadSync
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {Root} Root namespace
       * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
       */


      Root.prototype.loadSync = function loadSync(filename, options) {
        if (!util.isNode) throw Error("not supported");
        return this.load(filename, options, SYNC);
      };
      /**
       * @override
       */


      Root.prototype.resolveAll = function resolveAll() {
        if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (field) {
          return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
        return Namespace.prototype.resolveAll.call(this);
      }; // only uppercased (and thus conflict-free) children are exposed, see below


      var exposeRe = /^[A-Z]/;
      /**
       * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
       * @param {Root} root Root instance
       * @param {Field} field Declaring extension field witin the declaring type
       * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
       * @inner
       * @ignore
       */

      function tryHandleExtension(root, field) {
        var extendedType = field.parent.lookup(field.extend);

        if (extendedType) {
          var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
          sisterField.declaringField = field;
          field.extensionField = sisterField;
          extendedType.add(sisterField);
          return true;
        }

        return false;
      }
      /**
       * Called when any object is added to this root or its sub-namespaces.
       * @param {ReflectionObject} object Object added
       * @returns {undefined}
       * @private
       */


      Root.prototype._handleAdd = function _handleAdd(object) {
        if (object instanceof Field) {
          if (
          /* an extension field (implies not part of a oneof) */
          object.extend !== undefined &&
          /* not already handled */
          !object.extensionField) if (!tryHandleExtension(this, object)) this.deferred.push(object);
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name)) object.parent[object.name] = object.values; // expose enum values as property of its parent
        } else if (!(object instanceof OneOf))
          /* everything else is a namespace */
          {
            if (object instanceof Type) // Try to handle any deferred extensions
              for (var i = 0; i < this.deferred.length;) {
                if (tryHandleExtension(this, this.deferred[i])) this.deferred.splice(i, 1);else ++i;
              }

            for (var j = 0; j <
            /* initializes */
            object.nestedArray.length; ++j) {
              // recurse into the namespace
              this._handleAdd(object._nestedArray[j]);
            }

            if (exposeRe.test(object.name)) object.parent[object.name] = object; // expose namespace as property of its parent
          } // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
        // properties of namespaces just like static code does. This allows using a .d.ts generated for
        // a static module with reflection-based solutions where the condition is met.

      };
      /**
       * Called when any object is removed from this root or its sub-namespaces.
       * @param {ReflectionObject} object Object removed
       * @returns {undefined}
       * @private
       */


      Root.prototype._handleRemove = function _handleRemove(object) {
        if (object instanceof Field) {
          if (
          /* an extension field */
          object.extend !== undefined) {
            if (
            /* already handled */
            object.extensionField) {
              // remove its sister field
              object.extensionField.parent.remove(object.extensionField);
              object.extensionField = null;
            } else {
              // cancel the extension
              var index = this.deferred.indexOf(object);
              /* istanbul ignore else */

              if (index > -1) this.deferred.splice(index, 1);
            }
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose enum values
        } else if (object instanceof Namespace) {
          for (var i = 0; i <
          /* initializes */
          object.nestedArray.length; ++i) {
            // recurse into the namespace
            this._handleRemove(object._nestedArray[i]);
          }

          if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose namespaces
        }
      };

      Root._configure = function (Type_, parse_, common_) {
        Type = Type_;
        parse = parse_;
        common = common_;
      };
    }, {
      "15": 15,
      "16": 16,
      "23": 23,
      "25": 25,
      "37": 37
    }],
    30: [function (require, module, exports) {
      "use strict";

      module.exports = {};
      /**
       * Named roots.
       * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
       * Can also be used manually to make roots available accross modules.
       * @name roots
       * @type {Object.<string,Root>}
       * @example
       * // pbjs -r myroot -o compiled.js ...
       *
       * // in another module:
       * require("./compiled.js");
       *
       * // in any subsequent module:
       * var root = protobuf.roots["myroot"];
       */
    }, {}],
    31: [function (require, module, exports) {
      "use strict";
      /**
       * Streaming RPC helpers.
       * @namespace
       */

      var rpc = exports;
      /**
       * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
       * @typedef RPCImpl
       * @type {function}
       * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
       * @param {Uint8Array} requestData Request data
       * @param {RPCImplCallback} callback Callback function
       * @returns {undefined}
       * @example
       * function rpcImpl(method, requestData, callback) {
       *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
       *         throw Error("no such method");
       *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
       *         callback(err, responseData);
       *     });
       * }
       */

      /**
       * Node-style callback as used by {@link RPCImpl}.
       * @typedef RPCImplCallback
       * @type {function}
       * @param {Error|null} error Error, if any, otherwise `null`
       * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
       * @returns {undefined}
       */

      rpc.Service = require(32);
    }, {
      "32": 32
    }],
    32: [function (require, module, exports) {
      "use strict";

      module.exports = Service;

      var util = require(39); // Extends EventEmitter


      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      /**
       * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
       *
       * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
       * @typedef rpc.ServiceMethodCallback
       * @template TRes extends Message<TRes>
       * @type {function}
       * @param {Error|null} error Error, if any
       * @param {TRes} [response] Response message
       * @returns {undefined}
       */

      /**
       * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
       * @typedef rpc.ServiceMethod
       * @template TReq extends Message<TReq>
       * @template TRes extends Message<TRes>
       * @type {function}
       * @param {TReq|Properties<TReq>} request Request message or plain object
       * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
       * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
       */

      /**
       * Constructs a new RPC service instance.
       * @classdesc An RPC service as returned by {@link Service#create}.
       * @exports rpc.Service
       * @extends util.EventEmitter
       * @constructor
       * @param {RPCImpl} rpcImpl RPC implementation
       * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
       * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
       */

      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        /**
         * RPC implementation. Becomes `null` once the service is ended.
         * @type {RPCImpl|null}
         */

        this.rpcImpl = rpcImpl;
        /**
         * Whether requests are length-delimited.
         * @type {boolean}
         */

        this.requestDelimited = Boolean(requestDelimited);
        /**
         * Whether responses are length-delimited.
         * @type {boolean}
         */

        this.responseDelimited = Boolean(responseDelimited);
      }
      /**
       * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
       * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
       * @param {Constructor<TReq>} requestCtor Request constructor
       * @param {Constructor<TRes>} responseCtor Response constructor
       * @param {TReq|Properties<TReq>} request Request message or plain object
       * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
       * @returns {undefined}
       * @template TReq extends Message<TReq>
       * @template TRes extends Message<TRes>
       */


      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request) throw TypeError("request must be specified");
        var self = this;
        if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

        if (!self.rpcImpl) {
          setTimeout(function () {
            callback(Error("already ended"));
          }, 0);
          return undefined;
        }

        try {
          return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
            if (err) {
              self.emit("error", err, method);
              return callback(err);
            }

            if (response === null) {
              self.end(
              /* endedByRPC */
              true);
              return undefined;
            }

            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err) {
                self.emit("error", err, method);
                return callback(err);
              }
            }

            self.emit("data", response, method);
            return callback(null, response);
          });
        } catch (err) {
          self.emit("error", err, method);
          setTimeout(function () {
            callback(err);
          }, 0);
          return undefined;
        }
      };
      /**
       * Ends this service and emits the `end` event.
       * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
       * @returns {rpc.Service} `this`
       */


      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }

        return this;
      };
    }, {
      "39": 39
    }],
    33: [function (require, module, exports) {
      "use strict";

      module.exports = Service; // extends Namespace

      var Namespace = require(23);

      ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

      var Method = require(22),
          util = require(37),
          rpc = require(31);
      /**
       * Constructs a new service instance.
       * @classdesc Reflected service.
       * @extends NamespaceBase
       * @constructor
       * @param {string} name Service name
       * @param {Object.<string,*>} [options] Service options
       * @throws {TypeError} If arguments are invalid
       */


      function Service(name, options) {
        Namespace.call(this, name, options);
        /**
         * Service methods.
         * @type {Object.<string,Method>}
         */

        this.methods = {}; // toJSON, marker

        /**
         * Cached methods as an array.
         * @type {Method[]|null}
         * @private
         */

        this._methodsArray = null;
      }
      /**
       * Service descriptor.
       * @interface IService
       * @extends INamespace
       * @property {Object.<string,IMethod>} methods Method descriptors
       */

      /**
       * Constructs a service from a service descriptor.
       * @param {string} name Service name
       * @param {IService} json Service descriptor
       * @returns {Service} Created service
       * @throws {TypeError} If arguments are invalid
       */


      Service.fromJSON = function fromJSON(name, json) {
        var service = new Service(name, json.options);
        /* istanbul ignore else */

        if (json.methods) for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i) {
          service.add(Method.fromJSON(names[i], json.methods[names[i]]));
        }
        if (json.nested) service.addJSON(json.nested);
        service.comment = json.comment;
        return service;
      };
      /**
       * Converts this service to a service descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IService} Service descriptor
       */


      Service.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", inherited && inherited.options || undefined, "methods", Namespace.arrayToJSON(this.methodsArray, toJSONOptions) ||
        /* istanbul ignore next */
        {}, "nested", inherited && inherited.nested || undefined, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * Methods of this service as an array for iteration.
       * @name Service#methodsArray
       * @type {Method[]}
       * @readonly
       */


      Object.defineProperty(Service.prototype, "methodsArray", {
        get: function get() {
          return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }
      });

      function clearCache(service) {
        service._methodsArray = null;
        return service;
      }
      /**
       * @override
       */


      Service.prototype.get = function get(name) {
        return this.methods[name] || Namespace.prototype.get.call(this, name);
      };
      /**
       * @override
       */


      Service.prototype.resolveAll = function resolveAll() {
        var methods = this.methodsArray;

        for (var i = 0; i < methods.length; ++i) {
          methods[i].resolve();
        }

        return Namespace.prototype.resolve.call(this);
      };
      /**
       * @override
       */


      Service.prototype.add = function add(object) {
        /* istanbul ignore if */
        if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);

        if (object instanceof Method) {
          this.methods[object.name] = object;
          object.parent = this;
          return clearCache(this);
        }

        return Namespace.prototype.add.call(this, object);
      };
      /**
       * @override
       */


      Service.prototype.remove = function remove(object) {
        if (object instanceof Method) {
          /* istanbul ignore if */
          if (this.methods[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.methods[object.name];
          object.parent = null;
          return clearCache(this);
        }

        return Namespace.prototype.remove.call(this, object);
      };
      /**
       * Creates a runtime service using the specified rpc implementation.
       * @param {RPCImpl} rpcImpl RPC implementation
       * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
       * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
       * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
       */


      Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);

        for (var i = 0, method; i <
        /* initializes */
        this.methodsArray.length; ++i) {
          var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
          rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
          });
        }

        return rpcService;
      };
    }, {
      "22": 22,
      "23": 23,
      "31": 31,
      "37": 37
    }],
    34: [function (require, module, exports) {
      "use strict";

      module.exports = tokenize;
      var delimRe = /[\s{}=;:[\],'"()<>]/g,
          stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
          stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
      var setCommentRe = /^ *[*/]+ */,
          setCommentAltRe = /^\s*\*?\/*/,
          setCommentSplitRe = /\n/g,
          whitespaceRe = /\s/,
          unescapeRe = /\\(.?)/g;
      var unescapeMap = {
        "0": "\0",
        "r": "\r",
        "n": "\n",
        "t": "\t"
      };
      /**
       * Unescapes a string.
       * @param {string} str String to unescape
       * @returns {string} Unescaped string
       * @property {Object.<string,string>} map Special characters map
       * @memberof tokenize
       */

      function unescape(str) {
        return str.replace(unescapeRe, function ($0, $1) {
          switch ($1) {
            case "\\":
            case "":
              return $1;

            default:
              return unescapeMap[$1] || "";
          }
        });
      }

      tokenize.unescape = unescape;
      /**
       * Gets the next token and advances.
       * @typedef TokenizerHandleNext
       * @type {function}
       * @returns {string|null} Next token or `null` on eof
       */

      /**
       * Peeks for the next token.
       * @typedef TokenizerHandlePeek
       * @type {function}
       * @returns {string|null} Next token or `null` on eof
       */

      /**
       * Pushes a token back to the stack.
       * @typedef TokenizerHandlePush
       * @type {function}
       * @param {string} token Token
       * @returns {undefined}
       */

      /**
       * Skips the next token.
       * @typedef TokenizerHandleSkip
       * @type {function}
       * @param {string} expected Expected token
       * @param {boolean} [optional=false] If optional
       * @returns {boolean} Whether the token matched
       * @throws {Error} If the token didn't match and is not optional
       */

      /**
       * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
       * @typedef TokenizerHandleCmnt
       * @type {function}
       * @param {number} [line] Line number
       * @returns {string|null} Comment text or `null` if none
       */

      /**
       * Handle object returned from {@link tokenize}.
       * @interface ITokenizerHandle
       * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
       * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
       * @property {TokenizerHandlePush} push Pushes a token back to the stack
       * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
       * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
       * @property {number} line Current line number
       */

      /**
       * Tokenizes the given .proto source and returns an object with useful utility functions.
       * @param {string} source Source contents
       * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
       * @returns {ITokenizerHandle} Tokenizer handle
       */

      function tokenize(source, alternateCommentMode) {
        /* eslint-disable callback-return */
        source = source.toString();
        var offset = 0,
            length = source.length,
            line = 1,
            commentType = null,
            commentText = null,
            commentLine = 0,
            commentLineEmpty = false;
        var stack = [];
        var stringDelim = null;
        /* istanbul ignore next */

        /**
         * Creates an error for illegal syntax.
         * @param {string} subject Subject
         * @returns {Error} Error created
         * @inner
         */

        function illegal(subject) {
          return Error("illegal " + subject + " (line " + line + ")");
        }
        /**
         * Reads a string till its end.
         * @returns {string} String read
         * @inner
         */


        function readString() {
          var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
          re.lastIndex = offset - 1;
          var match = re.exec(source);
          if (!match) throw illegal("string");
          offset = re.lastIndex;
          push(stringDelim);
          stringDelim = null;
          return unescape(match[1]);
        }
        /**
         * Gets the character at `pos` within the source.
         * @param {number} pos Position
         * @returns {string} Character
         * @inner
         */


        function charAt(pos) {
          return source.charAt(pos);
        }
        /**
         * Sets the current comment text.
         * @param {number} start Start offset
         * @param {number} end End offset
         * @returns {undefined}
         * @inner
         */


        function setComment(start, end) {
          commentType = source.charAt(start++);
          commentLine = line;
          commentLineEmpty = false;
          var lookback;

          if (alternateCommentMode) {
            lookback = 2; // alternate comment parsing: "//" or "/*"
          } else {
            lookback = 3; // "///" or "/**"
          }

          var commentOffset = start - lookback,
              c;

          do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
              commentLineEmpty = true;
              break;
            }
          } while (c === " " || c === "\t");

          var lines = source.substring(start, end).split(setCommentSplitRe);

          for (var i = 0; i < lines.length; ++i) {
            lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
          }

          commentText = lines.join("\n").trim();
        }

        function isDoubleSlashCommentLine(startOffset) {
          var endOffset = findEndOfLine(startOffset); // see if remaining line matches comment pattern

          var lineText = source.substring(startOffset, endOffset); // look for 1 or 2 slashes since startOffset would already point past
          // the first slash that started the comment.

          var isComment = /^\s*\/{1,2}/.test(lineText);
          return isComment;
        }

        function findEndOfLine(cursor) {
          // find end of cursor's line
          var endOffset = cursor;

          while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
          }

          return endOffset;
        }
        /**
         * Obtains the next token.
         * @returns {string|null} Next token or `null` on eof
         * @inner
         */


        function next() {
          if (stack.length > 0) return stack.shift();
          if (stringDelim) return readString();
          var repeat, prev, curr, start, isDoc;

          do {
            if (offset === length) return null;
            repeat = false;

            while (whitespaceRe.test(curr = charAt(offset))) {
              if (curr === "\n") ++line;
              if (++offset === length) return null;
            }

            if (charAt(offset) === "/") {
              if (++offset === length) {
                throw illegal("comment");
              }

              if (charAt(offset) === "/") {
                // Line
                if (!alternateCommentMode) {
                  // check for triple-slash comment
                  isDoc = charAt(start = offset + 1) === "/";

                  while (charAt(++offset) !== "\n") {
                    if (offset === length) {
                      return null;
                    }
                  }

                  ++offset;

                  if (isDoc) {
                    setComment(start, offset - 1);
                  }

                  ++line;
                  repeat = true;
                } else {
                  // check for double-slash comments, consolidating consecutive lines
                  start = offset;
                  isDoc = false;

                  if (isDoubleSlashCommentLine(offset)) {
                    isDoc = true;

                    do {
                      offset = findEndOfLine(offset);

                      if (offset === length) {
                        break;
                      }

                      offset++;
                    } while (isDoubleSlashCommentLine(offset));
                  } else {
                    offset = Math.min(length, findEndOfLine(offset) + 1);
                  }

                  if (isDoc) {
                    setComment(start, offset);
                  }

                  line++;
                  repeat = true;
                }
              } else if ((curr = charAt(offset)) === "*") {
                /* Block */
                // check for /** (regular comment mode) or /* (alternate comment mode)
                start = offset + 1;
                isDoc = alternateCommentMode || charAt(start) === "*";

                do {
                  if (curr === "\n") {
                    ++line;
                  }

                  if (++offset === length) {
                    throw illegal("comment");
                  }

                  prev = curr;
                  curr = charAt(offset);
                } while (prev !== "*" || curr !== "/");

                ++offset;

                if (isDoc) {
                  setComment(start, offset - 2);
                }

                repeat = true;
              } else {
                return "/";
              }
            }
          } while (repeat); // offset !== length if we got here


          var end = offset;
          delimRe.lastIndex = 0;
          var delim = delimRe.test(charAt(end++));
          if (!delim) while (end < length && !delimRe.test(charAt(end))) {
            ++end;
          }
          var token = source.substring(offset, offset = end);
          if (token === "\"" || token === "'") stringDelim = token;
          return token;
        }
        /**
         * Pushes a token back to the stack.
         * @param {string} token Token
         * @returns {undefined}
         * @inner
         */


        function push(token) {
          stack.push(token);
        }
        /**
         * Peeks for the next token.
         * @returns {string|null} Token or `null` on eof
         * @inner
         */


        function peek() {
          if (!stack.length) {
            var token = next();
            if (token === null) return null;
            push(token);
          }

          return stack[0];
        }
        /**
         * Skips a token.
         * @param {string} expected Expected token
         * @param {boolean} [optional=false] Whether the token is optional
         * @returns {boolean} `true` when skipped, `false` if not
         * @throws {Error} When a required token is not present
         * @inner
         */


        function skip(expected, optional) {
          var actual = peek(),
              equals = actual === expected;

          if (equals) {
            next();
            return true;
          }

          if (!optional) throw illegal("token '" + actual + "', '" + expected + "' expected");
          return false;
        }
        /**
         * Gets a comment.
         * @param {number} [trailingLine] Line number if looking for a trailing comment
         * @returns {string|null} Comment text
         * @inner
         */


        function cmnt(trailingLine) {
          var ret = null;

          if (trailingLine === undefined) {
            if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
              ret = commentText;
            }
          } else {
            /* istanbul ignore else */
            if (commentLine < trailingLine) {
              peek();
            }

            if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
              ret = commentText;
            }
          }

          return ret;
        }

        return Object.defineProperty({
          next: next,
          peek: peek,
          push: push,
          skip: skip,
          cmnt: cmnt
        }, "line", {
          get: function get() {
            return line;
          }
        });
        /* eslint-enable callback-return */
      }
    }, {}],
    35: [function (require, module, exports) {
      "use strict";

      module.exports = Type; // extends Namespace

      var Namespace = require(23);

      ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

      var Enum = require(15),
          OneOf = require(25),
          Field = require(16),
          MapField = require(20),
          Service = require(33),
          Message = require(21),
          Reader = require(27),
          Writer = require(42),
          util = require(37),
          encoder = require(14),
          decoder = require(13),
          verifier = require(40),
          converter = require(12),
          wrappers = require(41);
      /**
       * Constructs a new reflected message type instance.
       * @classdesc Reflected message type.
       * @extends NamespaceBase
       * @constructor
       * @param {string} name Message name
       * @param {Object.<string,*>} [options] Declared options
       */


      function Type(name, options) {
        Namespace.call(this, name, options);
        /**
         * Message fields.
         * @type {Object.<string,Field>}
         */

        this.fields = {}; // toJSON, marker

        /**
         * Oneofs declared within this namespace, if any.
         * @type {Object.<string,OneOf>}
         */

        this.oneofs = undefined; // toJSON

        /**
         * Extension ranges, if any.
         * @type {number[][]}
         */

        this.extensions = undefined; // toJSON

        /**
         * Reserved ranges, if any.
         * @type {Array.<number[]|string>}
         */

        this.reserved = undefined; // toJSON

        /*?
         * Whether this type is a legacy group.
         * @type {boolean|undefined}
         */

        this.group = undefined; // toJSON

        /**
         * Cached fields by id.
         * @type {Object.<number,Field>|null}
         * @private
         */

        this._fieldsById = null;
        /**
         * Cached fields as an array.
         * @type {Field[]|null}
         * @private
         */

        this._fieldsArray = null;
        /**
         * Cached oneofs as an array.
         * @type {OneOf[]|null}
         * @private
         */

        this._oneofsArray = null;
        /**
         * Cached constructor.
         * @type {Constructor<{}>}
         * @private
         */

        this._ctor = null;
      }

      Object.defineProperties(Type.prototype, {
        /**
         * Message fields by id.
         * @name Type#fieldsById
         * @type {Object.<number,Field>}
         * @readonly
         */
        fieldsById: {
          get: function get() {
            /* istanbul ignore if */
            if (this._fieldsById) return this._fieldsById;
            this._fieldsById = {};

            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
              var field = this.fields[names[i]],
                  id = field.id;
              /* istanbul ignore if */

              if (this._fieldsById[id]) throw Error("duplicate id " + id + " in " + this);
              this._fieldsById[id] = field;
            }

            return this._fieldsById;
          }
        },

        /**
         * Fields of this message as an array for iteration.
         * @name Type#fieldsArray
         * @type {Field[]}
         * @readonly
         */
        fieldsArray: {
          get: function get() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
          }
        },

        /**
         * Oneofs of this message as an array for iteration.
         * @name Type#oneofsArray
         * @type {OneOf[]}
         * @readonly
         */
        oneofsArray: {
          get: function get() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
          }
        },

        /**
         * The registered constructor, if any registered, otherwise a generic constructor.
         * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
         * @name Type#ctor
         * @type {Constructor<{}>}
         */
        ctor: {
          get: function get() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
          },
          set: function set(ctor) {
            // Ensure proper prototype
            var prototype = ctor.prototype;

            if (!(prototype instanceof Message)) {
              (ctor.prototype = new Message()).constructor = ctor;
              util.merge(ctor.prototype, prototype);
            } // Classes and messages reference their reflected type


            ctor.$type = ctor.prototype.$type = this; // Mix in static methods

            util.merge(ctor, Message, true);
            this._ctor = ctor; // Messages have non-enumerable default values on their prototype

            var i = 0;

            for (; i <
            /* initializes */
            this.fieldsArray.length; ++i) {
              this._fieldsArray[i].resolve();
            } // ensures a proper value
            // Messages have non-enumerable getters and setters for each virtual oneof field


            var ctorProperties = {};

            for (i = 0; i <
            /* initializes */
            this.oneofsArray.length; ++i) {
              ctorProperties[this._oneofsArray[i].resolve().name] = {
                get: util.oneOfGetter(this._oneofsArray[i].oneof),
                set: util.oneOfSetter(this._oneofsArray[i].oneof)
              };
            }

            if (i) Object.defineProperties(ctor.prototype, ctorProperties);
          }
        }
      });
      /**
       * Generates a constructor function for the specified type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */

      Type.generateConstructor = function generateConstructor(mtype) {
        /* eslint-disable no-unexpected-multiline */
        var gen = util.codegen(["p"], mtype.name); // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype

        for (var i = 0, field; i < mtype.fieldsArray.length; ++i) {
          if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
        }

        return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
        /* eslint-enable no-unexpected-multiline */
      };

      function clearCache(type) {
        type._fieldsById = type._fieldsArray = type._oneofsArray = null;
        delete type.encode;
        delete type.decode;
        delete type.verify;
        return type;
      }
      /**
       * Message type descriptor.
       * @interface IType
       * @extends INamespace
       * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
       * @property {Object.<string,IField>} fields Field descriptors
       * @property {number[][]} [extensions] Extension ranges
       * @property {number[][]} [reserved] Reserved ranges
       * @property {boolean} [group=false] Whether a legacy group or not
       */

      /**
       * Creates a message type from a message type descriptor.
       * @param {string} name Message name
       * @param {IType} json Message type descriptor
       * @returns {Type} Created message type
       */


      Type.fromJSON = function fromJSON(name, json) {
        var type = new Type(name, json.options);
        type.extensions = json.extensions;
        type.reserved = json.reserved;
        var names = Object.keys(json.fields),
            i = 0;

        for (; i < names.length; ++i) {
          type.add((typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]]));
        }

        if (json.oneofs) for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i) {
          type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
        }
        if (json.nested) for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add( // most to least likely
          (nested.id !== undefined ? Field.fromJSON : nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : Namespace.fromJSON)(names[i], nested));
        }
        if (json.extensions && json.extensions.length) type.extensions = json.extensions;
        if (json.reserved && json.reserved.length) type.reserved = json.reserved;
        if (json.group) type.group = true;
        if (json.comment) type.comment = json.comment;
        return type;
      };
      /**
       * Converts this message type to a message type descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IType} Message type descriptor
       */


      Type.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", inherited && inherited.options || undefined, "oneofs", Namespace.arrayToJSON(this.oneofsArray, toJSONOptions), "fields", Namespace.arrayToJSON(this.fieldsArray.filter(function (obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : undefined, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "group", this.group || undefined, "nested", inherited && inherited.nested || undefined, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * @override
       */


      Type.prototype.resolveAll = function resolveAll() {
        var fields = this.fieldsArray,
            i = 0;

        while (i < fields.length) {
          fields[i++].resolve();
        }

        var oneofs = this.oneofsArray;
        i = 0;

        while (i < oneofs.length) {
          oneofs[i++].resolve();
        }

        return Namespace.prototype.resolveAll.call(this);
      };
      /**
       * @override
       */


      Type.prototype.get = function get(name) {
        return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
      };
      /**
       * Adds a nested object to this type.
       * @param {ReflectionObject} object Nested object to add
       * @returns {Type} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
       */


      Type.prototype.add = function add(object) {
        if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);

        if (object instanceof Field && object.extend === undefined) {
          // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
          // The root object takes care of adding distinct sister-fields to the respective extended
          // type instead.
          // avoids calling the getter if not absolutely necessary because it's called quite frequently
          if (this._fieldsById ?
          /* istanbul ignore next */
          this._fieldsById[object.id] : this.fieldsById[object.id]) throw Error("duplicate id " + object.id + " in " + this);
          if (this.isReservedId(object.id)) throw Error("id " + object.id + " is reserved in " + this);
          if (this.isReservedName(object.name)) throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.parent) object.parent.remove(object);
          this.fields[object.name] = object;
          object.message = this;
          object.onAdd(this);
          return clearCache(this);
        }

        if (object instanceof OneOf) {
          if (!this.oneofs) this.oneofs = {};
          this.oneofs[object.name] = object;
          object.onAdd(this);
          return clearCache(this);
        }

        return Namespace.prototype.add.call(this, object);
      };
      /**
       * Removes a nested object from this type.
       * @param {ReflectionObject} object Nested object to remove
       * @returns {Type} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `object` is not a member of this type
       */


      Type.prototype.remove = function remove(object) {
        if (object instanceof Field && object.extend === undefined) {
          // See Type#add for the reason why extension fields are excluded here.

          /* istanbul ignore if */
          if (!this.fields || this.fields[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.fields[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }

        if (object instanceof OneOf) {
          /* istanbul ignore if */
          if (!this.oneofs || this.oneofs[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.oneofs[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }

        return Namespace.prototype.remove.call(this, object);
      };
      /**
       * Tests if the specified id is reserved.
       * @param {number} id Id to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Type.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      /**
       * Tests if the specified name is reserved.
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Type.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
      /**
       * Creates a new message of this type using the specified properties.
       * @param {Object.<string,*>} [properties] Properties to set
       * @returns {Message<{}>} Message instance
       */


      Type.prototype.create = function create(properties) {
        return new this.ctor(properties);
      };
      /**
       * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
       * @returns {Type} `this`
       */


      Type.prototype.setup = function setup() {
        // Sets up everything at once so that the prototype chain does not have to be re-evaluated
        // multiple times (V8, soft-deopt prototype-check).
        var fullName = this.fullName,
            types = [];

        for (var i = 0; i <
        /* initializes */
        this.fieldsArray.length; ++i) {
          types.push(this._fieldsArray[i].resolve().resolvedType);
        } // Replace setup methods with type-specific generated functions


        this.encode = encoder(this)({
          Writer: Writer,
          types: types,
          util: util
        });
        this.decode = decoder(this)({
          Reader: Reader,
          types: types,
          util: util
        });
        this.verify = verifier(this)({
          types: types,
          util: util
        });
        this.fromObject = converter.fromObject(this)({
          types: types,
          util: util
        });
        this.toObject = converter.toObject(this)({
          types: types,
          util: util
        }); // Inject custom wrappers for common types

        var wrapper = wrappers[fullName];

        if (wrapper) {
          var originalThis = Object.create(this); // if (wrapper.fromObject) {

          originalThis.fromObject = this.fromObject;
          this.fromObject = wrapper.fromObject.bind(originalThis); // }
          // if (wrapper.toObject) {

          originalThis.toObject = this.toObject;
          this.toObject = wrapper.toObject.bind(originalThis); // }
        }

        return this;
      };
      /**
       * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
       * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       */


      Type.prototype.encode = function encode_setup(message, writer) {
        return this.setup().encode(message, writer); // overrides this method
      };
      /**
       * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
       * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       */


      Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
      };
      /**
       * Decodes a message of this type.
       * @param {Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Length of the message, if known beforehand
       * @returns {Message<{}>} Decoded message
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {util.ProtocolError<{}>} If required fields are missing
       */


      Type.prototype.decode = function decode_setup(reader, length) {
        return this.setup().decode(reader, length); // overrides this method
      };
      /**
       * Decodes a message of this type preceeded by its byte length as a varint.
       * @param {Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {Message<{}>} Decoded message
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {util.ProtocolError} If required fields are missing
       */


      Type.prototype.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof Reader)) reader = Reader.create(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies that field values are valid and that required fields are present.
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {null|string} `null` if valid, otherwise the reason why it is not
       */


      Type.prototype.verify = function verify_setup(message) {
        return this.setup().verify(message); // overrides this method
      };
      /**
       * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
       * @param {Object.<string,*>} object Plain object to convert
       * @returns {Message<{}>} Message instance
       */


      Type.prototype.fromObject = function fromObject(object) {
        return this.setup().fromObject(object);
      };
      /**
       * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
       * @interface IConversionOptions
       * @property {Function} [longs] Long conversion type.
       * Valid values are `String` and `Number` (the global types).
       * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
       * @property {Function} [enums] Enum value conversion type.
       * Only valid value is `String` (the global type).
       * Defaults to copy the present value, which is the numeric id.
       * @property {Function} [bytes] Bytes value conversion type.
       * Valid values are `Array` and (a base64 encoded) `String` (the global types).
       * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
       * @property {boolean} [defaults=false] Also sets default values on the resulting object
       * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
       * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
       * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
       * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
       */

      /**
       * Creates a plain object from a message of this type. Also converts values to other types if specified.
       * @param {Message<{}>} message Message instance
       * @param {IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      Type.prototype.toObject = function toObject(message, options) {
        return this.setup().toObject(message, options);
      };
      /**
       * Decorator function as returned by {@link Type.d} (TypeScript).
       * @typedef TypeDecorator
       * @type {function}
       * @param {Constructor<T>} target Target constructor
       * @returns {undefined}
       * @template T extends Message<T>
       */

      /**
       * Type decorator (TypeScript).
       * @param {string} [typeName] Type name, defaults to the constructor's name
       * @returns {TypeDecorator<T>} Decorator function
       * @template T extends Message<T>
       */


      Type.d = function decorateType(typeName) {
        return function typeDecorator(target) {
          util.decorateType(target, typeName);
        };
      };
    }, {
      "12": 12,
      "13": 13,
      "14": 14,
      "15": 15,
      "16": 16,
      "20": 20,
      "21": 21,
      "23": 23,
      "25": 25,
      "27": 27,
      "33": 33,
      "37": 37,
      "40": 40,
      "41": 41,
      "42": 42
    }],
    36: [function (require, module, exports) {
      "use strict";
      /**
       * Common type constants.
       * @namespace
       */

      var types = exports;

      var util = require(37);

      var s = ["double", // 0
      "float", // 1
      "int32", // 2
      "uint32", // 3
      "sint32", // 4
      "fixed32", // 5
      "sfixed32", // 6
      "int64", // 7
      "uint64", // 8
      "sint64", // 9
      "fixed64", // 10
      "sfixed64", // 11
      "bool", // 12
      "string", // 13
      "bytes" // 14
      ];

      function bake(values, offset) {
        var i = 0,
            o = {};
        offset |= 0;

        while (i < values.length) {
          o[s[i + offset]] = values[i++];
        }

        return o;
      }
      /**
       * Basic type wire types.
       * @type {Object.<string,number>}
       * @const
       * @property {number} double=1 Fixed64 wire type
       * @property {number} float=5 Fixed32 wire type
       * @property {number} int32=0 Varint wire type
       * @property {number} uint32=0 Varint wire type
       * @property {number} sint32=0 Varint wire type
       * @property {number} fixed32=5 Fixed32 wire type
       * @property {number} sfixed32=5 Fixed32 wire type
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       * @property {number} bool=0 Varint wire type
       * @property {number} string=2 Ldelim wire type
       * @property {number} bytes=2 Ldelim wire type
       */


      types.basic = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2,
      /* bytes    */
      2]);
      /**
       * Basic type defaults.
       * @type {Object.<string,*>}
       * @const
       * @property {number} double=0 Double default
       * @property {number} float=0 Float default
       * @property {number} int32=0 Int32 default
       * @property {number} uint32=0 Uint32 default
       * @property {number} sint32=0 Sint32 default
       * @property {number} fixed32=0 Fixed32 default
       * @property {number} sfixed32=0 Sfixed32 default
       * @property {number} int64=0 Int64 default
       * @property {number} uint64=0 Uint64 default
       * @property {number} sint64=0 Sint32 default
       * @property {number} fixed64=0 Fixed64 default
       * @property {number} sfixed64=0 Sfixed64 default
       * @property {boolean} bool=false Bool default
       * @property {string} string="" String default
       * @property {Array.<number>} bytes=Array(0) Bytes default
       * @property {null} message=null Message default
       */

      types.defaults = bake([
      /* double   */
      0,
      /* float    */
      0,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      0,
      /* sfixed32 */
      0,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      0,
      /* sfixed64 */
      0,
      /* bool     */
      false,
      /* string   */
      "",
      /* bytes    */
      util.emptyArray,
      /* message  */
      null]);
      /**
       * Basic long type wire types.
       * @type {Object.<string,number>}
       * @const
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       */

      types["long"] = bake([
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1], 7);
      /**
       * Allowed types for map keys with their associated wire type.
       * @type {Object.<string,number>}
       * @const
       * @property {number} int32=0 Varint wire type
       * @property {number} uint32=0 Varint wire type
       * @property {number} sint32=0 Varint wire type
       * @property {number} fixed32=5 Fixed32 wire type
       * @property {number} sfixed32=5 Fixed32 wire type
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       * @property {number} bool=0 Varint wire type
       * @property {number} string=2 Ldelim wire type
       */

      types.mapKey = bake([
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2], 2);
      /**
       * Allowed types for packed repeated fields with their associated wire type.
       * @type {Object.<string,number>}
       * @const
       * @property {number} double=1 Fixed64 wire type
       * @property {number} float=5 Fixed32 wire type
       * @property {number} int32=0 Varint wire type
       * @property {number} uint32=0 Varint wire type
       * @property {number} sint32=0 Varint wire type
       * @property {number} fixed32=5 Fixed32 wire type
       * @property {number} sfixed32=5 Fixed32 wire type
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       * @property {number} bool=0 Varint wire type
       */

      types.packed = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0]);
    }, {
      "37": 37
    }],
    37: [function (require, module, exports) {
      "use strict";
      /**
       * Various utility functions.
       * @namespace
       */

      var util = module.exports = require(39);

      var roots = require(30);

      var Type, // cyclic
      Enum;
      util.codegen = require(3);
      util.fetch = require(5);
      util.path = require(8);
      /**
       * Node's fs module if available.
       * @type {Object.<string,*>}
       */

      util.fs = util.inquire("fs");
      /**
       * Converts an object's values to an array.
       * @param {Object.<string,*>} object Object to convert
       * @returns {Array.<*>} Converted array
       */

      util.toArray = function toArray(object) {
        if (object) {
          var keys = Object.keys(object),
              array = new Array(keys.length),
              index = 0;

          while (index < keys.length) {
            array[index] = object[keys[index++]];
          }

          return array;
        }

        return [];
      };
      /**
       * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
       * @param {Array.<*>} array Array to convert
       * @returns {Object.<string,*>} Converted object
       */


      util.toObject = function toObject(array) {
        var object = {},
            index = 0;

        while (index < array.length) {
          var key = array[index++],
              val = array[index++];
          if (val !== undefined) object[key] = val;
        }

        return object;
      };

      var safePropBackslashRe = /\\/g,
          safePropQuoteRe = /"/g;
      /**
       * Tests whether the specified name is a reserved word in JS.
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */

      util.isReserved = function isReserved(name) {
        return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
      };
      /**
       * Returns a safe property accessor for the specified property name.
       * @param {string} prop Property name
       * @returns {string} Safe accessor
       */


      util.safeProp = function safeProp(prop) {
        if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop)) return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
        return "." + prop;
      };
      /**
       * Converts the first character of a string to upper case.
       * @param {string} str String to convert
       * @returns {string} Converted string
       */


      util.ucFirst = function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      };

      var camelCaseRe = /_([a-z])/g;
      /**
       * Converts a string to camel case.
       * @param {string} str String to convert
       * @returns {string} Converted string
       */

      util.camelCase = function camelCase(str) {
        return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function ($0, $1) {
          return $1.toUpperCase();
        });
      };
      /**
       * Compares reflected fields by id.
       * @param {Field} a First field
       * @param {Field} b Second field
       * @returns {number} Comparison value
       */


      util.compareFieldsById = function compareFieldsById(a, b) {
        return a.id - b.id;
      };
      /**
       * Decorator helper for types (TypeScript).
       * @param {Constructor<T>} ctor Constructor function
       * @param {string} [typeName] Type name, defaults to the constructor's name
       * @returns {Type} Reflected type
       * @template T extends Message<T>
       * @property {Root} root Decorators root
       */


      util.decorateType = function decorateType(ctor, typeName) {
        /* istanbul ignore if */
        if (ctor.$type) {
          if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
          }

          return ctor.$type;
        }
        /* istanbul ignore next */


        if (!Type) Type = require(35);
        var type = new Type(typeName || ctor.name);
        util.decorateRoot.add(type);
        type.ctor = ctor; // sets up .encode, .decode etc.

        Object.defineProperty(ctor, "$type", {
          value: type,
          enumerable: false
        });
        Object.defineProperty(ctor.prototype, "$type", {
          value: type,
          enumerable: false
        });
        return type;
      };

      var decorateEnumIndex = 0;
      /**
       * Decorator helper for enums (TypeScript).
       * @param {Object} object Enum object
       * @returns {Enum} Reflected enum
       */

      util.decorateEnum = function decorateEnum(object) {
        /* istanbul ignore if */
        if (object.$type) return object.$type;
        /* istanbul ignore next */

        if (!Enum) Enum = require(15);
        var enm = new Enum("Enum" + decorateEnumIndex++, object);
        util.decorateRoot.add(enm);
        Object.defineProperty(object, "$type", {
          value: enm,
          enumerable: false
        });
        return enm;
      };
      /**
       * Decorator root (TypeScript).
       * @name util.decorateRoot
       * @type {Root}
       * @readonly
       */


      Object.defineProperty(util, "decorateRoot", {
        get: function get() {
          return roots["decorated"] || (roots["decorated"] = new (require(29))());
        }
      });
    }, {
      "15": 15,
      "29": 29,
      "3": 3,
      "30": 30,
      "35": 35,
      "39": 39,
      "5": 5,
      "8": 8
    }],
    38: [function (require, module, exports) {
      "use strict";

      module.exports = LongBits;

      var util = require(39);
      /**
       * Constructs new long bits.
       * @classdesc Helper class for working with the low and high bits of a 64 bit value.
       * @memberof util
       * @constructor
       * @param {number} lo Low 32 bits, unsigned
       * @param {number} hi High 32 bits, unsigned
       */


      function LongBits(lo, hi) {
        // note that the casts below are theoretically unnecessary as of today, but older statically
        // generated converter code might still call the ctor with signed 32bits. kept for compat.

        /**
         * Low bits.
         * @type {number}
         */
        this.lo = lo >>> 0;
        /**
         * High bits.
         * @type {number}
         */

        this.hi = hi >>> 0;
      }
      /**
       * Zero bits.
       * @memberof util.LongBits
       * @type {util.LongBits}
       */


      var zero = LongBits.zero = new LongBits(0, 0);

      zero.toNumber = function () {
        return 0;
      };

      zero.zzEncode = zero.zzDecode = function () {
        return this;
      };

      zero.length = function () {
        return 1;
      };
      /**
       * Zero hash.
       * @memberof util.LongBits
       * @type {string}
       */


      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      /**
       * Constructs new long bits from the specified number.
       * @param {number} value Value
       * @returns {util.LongBits} Instance
       */

      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0) return zero;
        var sign = value < 0;
        if (sign) value = -value;
        var lo = value >>> 0,
            hi = (value - lo) / 4294967296 >>> 0;

        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;

          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
          }
        }

        return new LongBits(lo, hi);
      };
      /**
       * Constructs new long bits from a number, long or string.
       * @param {Long|number|string} value Value
       * @returns {util.LongBits} Instance
       */


      LongBits.from = function from(value) {
        if (typeof value === "number") return LongBits.fromNumber(value);

        if (util.isString(value)) {
          /* istanbul ignore else */
          if (util.Long) value = util.Long.fromString(value);else return LongBits.fromNumber(parseInt(value, 10));
        }

        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      /**
       * Converts this long bits to a possibly unsafe JavaScript number.
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {number} Possibly unsafe number
       */


      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0,
              hi = ~this.hi >>> 0;
          if (!lo) hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }

        return this.lo + this.hi * 4294967296;
      };
      /**
       * Converts this long bits to a long.
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {Long} Long
       */


      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : {
          low: this.lo | 0,
          high: this.hi | 0,
          unsigned: Boolean(unsigned)
        };
      };

      var charCodeAt = String.prototype.charCodeAt;
      /**
       * Constructs new long bits from the specified 8 characters long hash.
       * @param {string} hash Hash
       * @returns {util.LongBits} Bits
       */

      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash) return zero;
        return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
      };
      /**
       * Converts this long bits to a 8 characters long hash.
       * @returns {string} Hash
       */


      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      };
      /**
       * Zig-zag encodes this long bits.
       * @returns {util.LongBits} `this`
       */


      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      /**
       * Zig-zag decodes this long bits.
       * @returns {util.LongBits} `this`
       */


      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      /**
       * Calculates the length of this longbits when encoded as a varint.
       * @returns {number} Length
       */


      LongBits.prototype.length = function length() {
        var part0 = this.lo,
            part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
            part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }, {
      "39": 39
    }],
    39: [function (require, module, exports) {
      "use strict";

      var util = exports; // used to return a Promise where callback is omitted

      util.asPromise = require(1); // converts to / from base64 encoded strings

      util.base64 = require(2); // base class of rpc.Service

      util.EventEmitter = require(4); // float handling accross browsers

      util["float"] = require(6); // requires modules optionally and hides the call from bundlers

      util.inquire = require(7); // converts to / from utf8 encoded strings

      util.utf8 = require(10); // provides a node-like buffer pool in the browser

      util.pool = require(9); // utility to work with the low and high bits of a 64 bit value

      util.LongBits = require(38);
      /**
       * An immuable empty array.
       * @memberof util
       * @type {Array.<*>}
       * @const
       */

      util.emptyArray = Object.freeze ? Object.freeze([]) :
      /* istanbul ignore next */
      []; // used on prototypes

      /**
       * An immutable empty object.
       * @type {Object}
       * @const
       */

      util.emptyObject = Object.freeze ? Object.freeze({}) :
      /* istanbul ignore next */
      {}; // used on prototypes

      /**
       * Whether running within node or not.
       * @memberof util
       * @type {boolean}
       * @const
       */

      util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);
      /**
       * Tests if the specified value is an integer.
       * @function
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is an integer
       */

      util.isInteger = Number.isInteger ||
      /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      /**
       * Tests if the specified value is a string.
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is a string
       */


      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      /**
       * Tests if the specified value is a non-null object.
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is a non-null object
       */


      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      /**
       * Checks if a property on a message is considered to be present.
       * This is an alias of {@link util.isSet}.
       * @function
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */


      util.isset =
      /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      /**
       * Any compatible Buffer instance.
       * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
       * @interface Buffer
       * @extends Uint8Array
       */

      /**
       * Node's Buffer class if available.
       * @type {Constructor<Buffer>}
       */


      util.Buffer = function () {
        try {
          var Buffer = util.inquire("buffer").Buffer; // refuse to use non-node buffers if not explicitly assigned (perf reasons):

          return Buffer.prototype.utf8Write ? Buffer :
          /* istanbul ignore next */
          null;
        } catch (e) {
          /* istanbul ignore next */
          return null;
        }
      }(); // Internal alias of or polyfull for Buffer.from.


      util._Buffer_from = null; // Internal alias of or polyfill for Buffer.allocUnsafe.

      util._Buffer_allocUnsafe = null;
      /**
       * Creates a new buffer of whatever type supported by the environment.
       * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
       * @returns {Uint8Array|Buffer} Buffer
       */

      util.newBuffer = function newBuffer(sizeOrArray) {
        /* istanbul ignore next */
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      /**
       * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
       * @type {Constructor<Uint8Array>}
       */


      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array
      /* istanbul ignore next */
      : Array;
      /**
       * Any compatible Long instance.
       * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
       * @interface Long
       * @property {number} low Low bits
       * @property {number} high High bits
       * @property {boolean} unsigned Whether unsigned or not
       */

      /**
       * Long.js's Long class if available.
       * @type {Constructor<Long>}
       */

      util.Long =
      /* istanbul ignore next */
      global.dcodeIO &&
      /* istanbul ignore next */
      global.dcodeIO.Long || util.inquire("long");
      /**
       * Regular expression used to verify 2 bit (`bool`) map keys.
       * @type {RegExp}
       * @const
       */

      util.key2Re = /^true|false|0|1$/;
      /**
       * Regular expression used to verify 32 bit (`int32` etc.) map keys.
       * @type {RegExp}
       * @const
       */

      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      /**
       * Regular expression used to verify 64 bit (`int64` etc.) map keys.
       * @type {RegExp}
       * @const
       */

      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      /**
       * Converts a number or long to an 8 characters long hash string.
       * @param {Long|number} value Value to convert
       * @returns {string} Hash
       */

      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      /**
       * Converts an 8 characters long hash string to a long or number.
       * @param {string} hash Hash
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {Long|number} Original value
       */


      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      /**
       * Merges the properties of the source object into the destination object.
       * @memberof util
       * @param {Object.<string,*>} dst Destination object
       * @param {Object.<string,*>} src Source object
       * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
       * @returns {Object.<string,*>} Destination object
       */


      function merge(dst, src, ifNotSet) {
        // used by converters
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) {
          if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
        }

        return dst;
      }

      util.merge = merge;
      /**
       * Converts the first character of a string to lower case.
       * @param {string} str String to convert
       * @returns {string} Converted string
       */

      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      /**
       * Creates a custom error constructor.
       * @memberof util
       * @param {string} name Error name
       * @returns {Constructor<Error>} Custom error constructor
       */


      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError)) return new CustomError(message, properties); // Error.call(this, message);
          // ^ just returns a new error instance because the ctor can be called as a function

          Object.defineProperty(this, "message", {
            get: function get() {
              return message;
            }
          });
          /* istanbul ignore next */

          if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);else Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
          });
          if (properties) merge(this, properties);
        }

        (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
        Object.defineProperty(CustomError.prototype, "name", {
          get: function get() {
            return name;
          }
        });

        CustomError.prototype.toString = function toString() {
          return this.name + ": " + this.message;
        };

        return CustomError;
      }

      util.newError = newError;
      /**
       * Constructs a new protocol error.
       * @classdesc Error subclass indicating a protocol specifc error.
       * @memberof util
       * @extends Error
       * @template T extends Message<T>
       * @constructor
       * @param {string} message Error message
       * @param {Object.<string,*>} [properties] Additional properties
       * @example
       * try {
       *     MyMessage.decode(someBuffer); // throws if required fields are missing
       * } catch (e) {
       *     if (e instanceof ProtocolError && e.instance)
       *         console.log("decoded so far: " + JSON.stringify(e.instance));
       * }
       */

      util.ProtocolError = newError("ProtocolError");
      /**
       * So far decoded message instance.
       * @name util.ProtocolError#instance
       * @type {Message<T>}
       */

      /**
       * A OneOf getter as returned by {@link util.oneOfGetter}.
       * @typedef OneOfGetter
       * @type {function}
       * @returns {string|undefined} Set field name, if any
       */

      /**
       * Builds a getter for a oneof's present field name.
       * @param {string[]} fieldNames Field names
       * @returns {OneOfGetter} Unbound getter
       */

      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};

        for (var i = 0; i < fieldNames.length; ++i) {
          fieldMap[fieldNames[i]] = 1;
        }
        /**
         * @returns {string|undefined} Set field name, if any
         * @this Object
         * @ignore
         */


        return function () {
          // eslint-disable-line consistent-return
          for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) {
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
          }
        };
      };
      /**
       * A OneOf setter as returned by {@link util.oneOfSetter}.
       * @typedef OneOfSetter
       * @type {function}
       * @param {string|undefined} value Field name
       * @returns {undefined}
       */

      /**
       * Builds a setter for a oneof's present field name.
       * @param {string[]} fieldNames Field names
       * @returns {OneOfSetter} Unbound setter
       */


      util.oneOfSetter = function setOneOf(fieldNames) {
        /**
         * @param {string} name Field name
         * @returns {undefined}
         * @this Object
         * @ignore
         */
        return function (name) {
          for (var i = 0; i < fieldNames.length; ++i) {
            if (fieldNames[i] !== name) delete this[fieldNames[i]];
          }
        };
      };
      /**
       * Default conversion options used for {@link Message#toJSON} implementations.
       *
       * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
       *
       * - Longs become strings
       * - Enums become string keys
       * - Bytes become base64 encoded strings
       * - (Sub-)Messages become plain objects
       * - Maps become plain objects with all string keys
       * - Repeated fields become arrays
       * - NaN and Infinity for float and double fields become strings
       *
       * @type {IConversionOptions}
       * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
       */


      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };

      util._configure = function () {
        var Buffer = util.Buffer;
        /* istanbul ignore if */

        if (!Buffer) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        } // because node 4.x buffers are incompatible & immutable
        // see: https://github.com/dcodeIO/protobuf.js/pull/665


        util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
          return new Buffer(value, encoding);
        };

        util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
          return new Buffer(size);
        };
      };
    }, {
      "1": 1,
      "10": 10,
      "2": 2,
      "38": 38,
      "4": 4,
      "6": 6,
      "7": 7,
      "9": 9
    }],
    40: [function (require, module, exports) {
      "use strict";

      module.exports = verifier;

      var Enum = require(15),
          util = require(37);

      function invalid(field, expected) {
        return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
      }
      /**
       * Generates a partial value verifier.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} ref Variable reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genVerifyValue(gen, field, fieldIndex, ref) {
        /* eslint-disable no-unexpected-multiline */
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));

            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) {
              gen("case %i:", field.resolvedType.values[keys[j]]);
            }

            gen("break")("}");
          } else {
            gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
          }
        } else {
          switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
              gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
              break;

            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
              break;

            case "float":
            case "double":
              gen("if(typeof %s!==\"number\")", ref)("return%j", invalid(field, "number"));
              break;

            case "bool":
              gen("if(typeof %s!==\"boolean\")", ref)("return%j", invalid(field, "boolean"));
              break;

            case "string":
              gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
              break;

            case "bytes":
              gen("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)("return%j", invalid(field, "buffer"));
              break;
          }
        }

        return gen;
        /* eslint-enable no-unexpected-multiline */
      }
      /**
       * Generates a partial key verifier.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {string} ref Variable reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genVerifyKey(gen, field, ref) {
        /* eslint-disable no-unexpected-multiline */
        switch (field.keyType) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
            break;

          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
            ("return%j", invalid(field, "integer|Long key"));
            break;

          case "bool":
            gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
            break;
        }

        return gen;
        /* eslint-enable no-unexpected-multiline */
      }
      /**
       * Generates a verifier specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      function verifier(mtype) {
        /* eslint-disable no-unexpected-multiline */
        var gen = util.codegen(["m"], mtype.name + "$verify")("if(typeof m!==\"object\"||m===null)")("return%j", "object expected");
        var oneofs = mtype.oneofsArray,
            seenFirstField = {};
        if (oneofs.length) gen("var p={}");

        for (var i = 0; i <
        /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
              ref = "m" + util.safeProp(field.name);

          if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null
          // map fields

          if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i, ref + "[k[i]]")("}"); // repeated fields
          } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i, ref + "[i]")("}"); // required or present fields
          } else {
            if (field.partOf) {
              var oneofProp = util.safeProp(field.partOf.name);
              if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
              seenFirstField[field.partOf.name] = 1;
              gen("p%s=1", oneofProp);
            }

            genVerifyValue(gen, field, i, ref);
          }

          if (field.optional) gen("}");
        }

        return gen("return null");
        /* eslint-enable no-unexpected-multiline */
      }
    }, {
      "15": 15,
      "37": 37
    }],
    41: [function (require, module, exports) {
      "use strict";
      /**
       * Wrappers for common types.
       * @type {Object.<string,IWrapper>}
       * @const
       */

      var wrappers = exports;

      var Message = require(21);
      /**
       * From object converter part of an {@link IWrapper}.
       * @typedef WrapperFromObjectConverter
       * @type {function}
       * @param {Object.<string,*>} object Plain object
       * @returns {Message<{}>} Message instance
       * @this Type
       */

      /**
       * To object converter part of an {@link IWrapper}.
       * @typedef WrapperToObjectConverter
       * @type {function}
       * @param {Message<{}>} message Message instance
       * @param {IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       * @this Type
       */

      /**
       * Common type wrapper part of {@link wrappers}.
       * @interface IWrapper
       * @property {WrapperFromObjectConverter} [fromObject] From object converter
       * @property {WrapperToObjectConverter} [toObject] To object converter
       */
      // Custom wrapper for Any


      wrappers[".google.protobuf.Any"] = {
        fromObject: function fromObject(object) {
          // unwrap value type if mapped
          if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */

            if (type) {
              // type_url does not accept leading "."
              var type_url = object["@type"].charAt(0) === "." ? object["@type"].substr(1) : object["@type"]; // type_url prefix is optional, but path seperator is required

              return this.create({
                type_url: "/" + type_url,
                value: type.encode(type.fromObject(object)).finish()
              });
            }
          }

          return this.fromObject(object);
        },
        toObject: function toObject(message, options) {
          // decode value if requested and unmapped
          if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */

            if (type) message = type.decode(message.value);
          } // wrap value if unmapped


          if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
          }

          return this.toObject(message, options);
        }
      };
    }, {
      "21": 21
    }],
    42: [function (require, module, exports) {
      "use strict";

      module.exports = Writer;

      var util = require(39);

      var BufferWriter; // cyclic

      var LongBits = util.LongBits,
          base64 = util.base64,
          utf8 = util.utf8;
      /**
       * Constructs a new writer operation instance.
       * @classdesc Scheduled writer operation.
       * @constructor
       * @param {function(*, Uint8Array, number)} fn Function to call
       * @param {number} len Value byte length
       * @param {*} val Value to write
       * @ignore
       */

      function Op(fn, len, val) {
        /**
         * Function to call.
         * @type {function(Uint8Array, number, *)}
         */
        this.fn = fn;
        /**
         * Value byte length.
         * @type {number}
         */

        this.len = len;
        /**
         * Next operation.
         * @type {Writer.Op|undefined}
         */

        this.next = undefined;
        /**
         * Value to write.
         * @type {*}
         */

        this.val = val; // type varies
      }
      /* istanbul ignore next */


      function noop() {} // eslint-disable-line no-empty-function

      /**
       * Constructs a new writer state instance.
       * @classdesc Copied writer state.
       * @memberof Writer
       * @constructor
       * @param {Writer} writer Writer to copy state from
       * @ignore
       */


      function State(writer) {
        /**
         * Current head.
         * @type {Writer.Op}
         */
        this.head = writer.head;
        /**
         * Current tail.
         * @type {Writer.Op}
         */

        this.tail = writer.tail;
        /**
         * Current buffer length.
         * @type {number}
         */

        this.len = writer.len;
        /**
         * Next state.
         * @type {State|null}
         */

        this.next = writer.states;
      }
      /**
       * Constructs a new writer instance.
       * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
       * @constructor
       */


      function Writer() {
        /**
         * Current length.
         * @type {number}
         */
        this.len = 0;
        /**
         * Operations head.
         * @type {Object}
         */

        this.head = new Op(noop, 0, 0);
        /**
         * Operations tail
         * @type {Object}
         */

        this.tail = this.head;
        /**
         * Linked forked states.
         * @type {Object|null}
         */

        this.states = null; // When a value is written, the writer calculates its byte length and puts it into a linked
        // list of operations to perform when finish() is called. This both allows us to allocate
        // buffers of the exact required size and reduces the amount of work we have to do compared
        // to first calculating over objects and then encoding over objects. In our case, the encoding
        // part is just a linked list walk calling operations with already prepared values.
      }
      /**
       * Creates a new writer.
       * @function
       * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
       */


      Writer.create = util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      }
      /* istanbul ignore next */
      : function create_array() {
        return new Writer();
      };
      /**
       * Allocates a buffer of the specified size.
       * @param {number} size Buffer size
       * @returns {Uint8Array} Buffer
       */

      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      }; // Use Uint8Array buffer pool in the browser, just like node does with buffers

      /* istanbul ignore else */


      if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      /**
       * Pushes a new operation to the queue.
       * @param {function(Uint8Array, number, *)} fn Function to call
       * @param {number} len Value byte length
       * @param {number} val Value to write
       * @returns {Writer} `this`
       * @private
       */

      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };

      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }

      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }

        buf[pos] = val;
      }
      /**
       * Constructs a new varint writer operation instance.
       * @classdesc Scheduled varint writer operation.
       * @extends Op
       * @constructor
       * @param {number} len Value byte length
       * @param {number} val Value to write
       * @ignore
       */


      function VarintOp(len, val) {
        this.len = len;
        this.next = undefined;
        this.val = val;
      }

      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      /**
       * Writes an unsigned 32 bit value as a varint.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */

      Writer.prototype.uint32 = function write_uint32(value) {
        // here, the call to this.push has been inlined and a varint specific Op subclass is used.
        // uint32 is by far the most frequently used operation and benefits significantly from this.
        this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
        return this;
      };
      /**
       * Writes a signed 32 bit value as a varint.
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
      };
      /**
       * Writes a 32 bit value as a varint, zig-zag encoded.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };

      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }

        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }

        buf[pos++] = val.lo;
      }
      /**
       * Writes an unsigned 64 bit value as a varint.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */


      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      /**
       * Writes a signed 64 bit value as a varint.
       * @function
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */


      Writer.prototype.int64 = Writer.prototype.uint64;
      /**
       * Writes a signed 64 bit value as a varint, zig-zag encoded.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */

      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      /**
       * Writes a boolish value as a varint.
       * @param {boolean} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };

      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      /**
       * Writes an unsigned 32 bit value as fixed 32 bits.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      /**
       * Writes a signed 32 bit value as fixed 32 bits.
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      /**
       * Writes an unsigned 64 bit value as fixed 64 bits.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */

      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      /**
       * Writes a signed 64 bit value as fixed 64 bits.
       * @function
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */


      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      /**
       * Writes a float (32 bit).
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */

      Writer.prototype["float"] = function write_float(value) {
        return this._push(util["float"].writeFloatLE, 4, value);
      };
      /**
       * Writes a double (64 bit float).
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype["double"] = function write_double(value) {
        return this._push(util["float"].writeDoubleLE, 8, value);
      };

      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
      }
      /* istanbul ignore next */
      : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i) {
          buf[pos + i] = val[i];
        }
      };
      /**
       * Writes a sequence of bytes.
       * @param {Uint8Array|string} value Buffer or base64 encoded string to write
       * @returns {Writer} `this`
       */

      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len) return this._push(writeByte, 1, 0);

        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }

        return this.uint32(len)._push(writeBytes, len, value);
      };
      /**
       * Writes a string.
       * @param {string} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      /**
       * Forks this writer's state by pushing it to a stack.
       * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
       * @returns {Writer} `this`
       */


      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      /**
       * Resets this instance to the last state.
       * @returns {Writer} `this`
       */


      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }

        return this;
      };
      /**
       * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
       * @returns {Writer} `this`
       */


      Writer.prototype.ldelim = function ldelim() {
        var head = this.head,
            tail = this.tail,
            len = this.len;
        this.reset().uint32(len);

        if (len) {
          this.tail.next = head.next; // skip noop

          this.tail = tail;
          this.len += len;
        }

        return this;
      };
      /**
       * Finishes the write operation.
       * @returns {Uint8Array} Finished buffer
       */


      Writer.prototype.finish = function finish() {
        var head = this.head.next,
            // skip noop
        buf = this.constructor.alloc(this.len),
            pos = 0;

        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        } // this.head = this.tail = null;


        return buf;
      };

      Writer._configure = function (BufferWriter_) {
        BufferWriter = BufferWriter_;
      };
    }, {
      "39": 39
    }],
    43: [function (require, module, exports) {
      "use strict";

      module.exports = BufferWriter; // extends Writer

      var Writer = require(42);

      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

      var util = require(39);

      var Buffer = util.Buffer;
      /**
       * Constructs a new buffer writer instance.
       * @classdesc Wire format writer using node buffers.
       * @extends Writer
       * @constructor
       */

      function BufferWriter() {
        Writer.call(this);
      }
      /**
       * Allocates a buffer of the specified size.
       * @param {number} size Buffer size
       * @returns {Buffer} Buffer
       */


      BufferWriter.alloc = function alloc_buffer(size) {
        return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
      };

      var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
        // also works for plain array values
      }
      /* istanbul ignore next */
      : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
          val.copy(buf, pos, 0, val.length);else for (var i = 0; i < val.length;) {
          // plain array values
          buf[pos++] = val[i++];
        }
      };
      /**
       * @override
       */

      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value)) value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len) this._push(writeBytesBuffer, len, value);
        return this;
      };

      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
          util.utf8.write(val, buf, pos);else buf.utf8Write(val, pos);
      }
      /**
       * @override
       */


      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = Buffer.byteLength(value);
        this.uint32(len);
        if (len) this._push(writeStringBuffer, len, value);
        return this;
      };
      /**
       * Finishes the write operation.
       * @name BufferWriter#finish
       * @function
       * @returns {Buffer} Finished buffer
       */

    }, {
      "39": 39,
      "42": 42
    }]
  }, {}, [19]);
})(typeof window === "object" && window || typeof self === "object" && self || void 0); //# sourceMappingURL=protobuf.js.map

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3Byb3RvYnVmLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInVuZGVmaW5lZCIsInByZWx1ZGUiLCJtb2R1bGVzIiwiY2FjaGUiLCJlbnRyaWVzIiwiJHJlcXVpcmUiLCJuYW1lIiwiJG1vZHVsZSIsImNhbGwiLCJleHBvcnRzIiwicHJvdG9idWYiLCJkZWZpbmUiLCJhbWQiLCJMb25nIiwiaXNMb25nIiwidXRpbCIsImNvbmZpZ3VyZSIsIm1vZHVsZSIsInJlcXVpcmUiLCJhc1Byb21pc2UiLCJmbiIsImN0eCIsInBhcmFtcyIsIkFycmF5IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwib2Zmc2V0IiwiaW5kZXgiLCJwZW5kaW5nIiwiUHJvbWlzZSIsImV4ZWN1dG9yIiwicmVzb2x2ZSIsInJlamVjdCIsImNhbGxiYWNrIiwiZXJyIiwiYXBwbHkiLCJiYXNlNjQiLCJzdHJpbmciLCJwIiwibiIsImNoYXJBdCIsIk1hdGgiLCJjZWlsIiwiYjY0IiwiczY0IiwiaSIsImVuY29kZSIsImJ1ZmZlciIsInN0YXJ0IiwiZW5kIiwicGFydHMiLCJjaHVuayIsImoiLCJ0IiwiYiIsInB1c2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJzbGljZSIsImpvaW4iLCJpbnZhbGlkRW5jb2RpbmciLCJkZWNvZGUiLCJjIiwiY2hhckNvZGVBdCIsIkVycm9yIiwidGVzdCIsImNvZGVnZW4iLCJmdW5jdGlvblBhcmFtcyIsImZ1bmN0aW9uTmFtZSIsImJvZHkiLCJDb2RlZ2VuIiwiZm9ybWF0U3RyaW5nT3JTY29wZSIsInNvdXJjZSIsInRvU3RyaW5nIiwidmVyYm9zZSIsImNvbnNvbGUiLCJsb2ciLCJzY29wZUtleXMiLCJPYmplY3QiLCJrZXlzIiwic2NvcGVQYXJhbXMiLCJzY29wZVZhbHVlcyIsInNjb3BlT2Zmc2V0IiwiRnVuY3Rpb24iLCJmb3JtYXRQYXJhbXMiLCJmb3JtYXRPZmZzZXQiLCJyZXBsYWNlIiwiJDAiLCIkMSIsInZhbHVlIiwiTnVtYmVyIiwiZmxvb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiZnVuY3Rpb25OYW1lT3ZlcnJpZGUiLCJFdmVudEVtaXR0ZXIiLCJfbGlzdGVuZXJzIiwicHJvdG90eXBlIiwib24iLCJldnQiLCJvZmYiLCJsaXN0ZW5lcnMiLCJzcGxpY2UiLCJlbWl0IiwiYXJncyIsImZldGNoIiwiaW5xdWlyZSIsImZzIiwiZmlsZW5hbWUiLCJvcHRpb25zIiwieGhyIiwicmVhZEZpbGUiLCJmZXRjaFJlYWRGaWxlQ2FsbGJhY2siLCJjb250ZW50cyIsIlhNTEh0dHBSZXF1ZXN0IiwiYmluYXJ5IiwiZmV0Y2gxIiwiY2MiLCJzeXMiLCJpc05hdGl2ZSIsImNvbnRlbnQiLCJqc2IiLCJmaWxlVXRpbHMiLCJnZXRTdHJpbmdGcm9tRmlsZSIsImxvYWRlciIsImxvYWRSZXMiLCJUZXh0QXNzZXQiLCJlcnJvciIsInJlc3VsdCIsInRleHQiLCJmZXRjaF94aHIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJmZXRjaE9uUmVhZHlTdGF0ZUNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIlVpbnQ4QXJyYXkiLCJvdmVycmlkZU1pbWVUeXBlIiwicmVzcG9uc2VUeXBlIiwib3BlbiIsInNlbmQiLCJmYWN0b3J5IiwiRmxvYXQzMkFycmF5IiwiZjMyIiwiZjhiIiwibGUiLCJ3cml0ZUZsb2F0X2YzMl9jcHkiLCJ2YWwiLCJidWYiLCJwb3MiLCJ3cml0ZUZsb2F0X2YzMl9yZXYiLCJ3cml0ZUZsb2F0TEUiLCJ3cml0ZUZsb2F0QkUiLCJyZWFkRmxvYXRfZjMyX2NweSIsInJlYWRGbG9hdF9mMzJfcmV2IiwicmVhZEZsb2F0TEUiLCJyZWFkRmxvYXRCRSIsIndyaXRlRmxvYXRfaWVlZTc1NCIsIndyaXRlVWludCIsInNpZ24iLCJpc05hTiIsInJvdW5kIiwiZXhwb25lbnQiLCJMTjIiLCJtYW50aXNzYSIsInBvdyIsImJpbmQiLCJ3cml0ZVVpbnRMRSIsIndyaXRlVWludEJFIiwicmVhZEZsb2F0X2llZWU3NTQiLCJyZWFkVWludCIsInVpbnQiLCJOYU4iLCJJbmZpbml0eSIsInJlYWRVaW50TEUiLCJyZWFkVWludEJFIiwiRmxvYXQ2NEFycmF5IiwiZjY0Iiwid3JpdGVEb3VibGVfZjY0X2NweSIsIndyaXRlRG91YmxlX2Y2NF9yZXYiLCJ3cml0ZURvdWJsZUxFIiwid3JpdGVEb3VibGVCRSIsInJlYWREb3VibGVfZjY0X2NweSIsInJlYWREb3VibGVfZjY0X3JldiIsInJlYWREb3VibGVMRSIsInJlYWREb3VibGVCRSIsIndyaXRlRG91YmxlX2llZWU3NTQiLCJvZmYwIiwib2ZmMSIsInJlYWREb3VibGVfaWVlZTc1NCIsImxvIiwiaGkiLCJtb2R1bGVOYW1lIiwibW9kIiwiZXZhbCIsImUiLCJwYXRoIiwiaXNBYnNvbHV0ZSIsIm5vcm1hbGl6ZSIsInNwbGl0IiwiYWJzb2x1dGUiLCJwcmVmaXgiLCJzaGlmdCIsIm9yaWdpblBhdGgiLCJpbmNsdWRlUGF0aCIsImFscmVhZHlOb3JtYWxpemVkIiwicG9vbCIsImFsbG9jIiwic2l6ZSIsIlNJWkUiLCJNQVgiLCJzbGFiIiwicG9vbF9hbGxvYyIsInV0ZjgiLCJ1dGY4X2xlbmd0aCIsImxlbiIsInJlYWQiLCJ1dGY4X3JlYWQiLCJ3cml0ZSIsInV0Zjhfd3JpdGUiLCJjMSIsImMyIiwiY29tbW9uIiwiY29tbW9uUmUiLCJqc29uIiwibmVzdGVkIiwiZ29vZ2xlIiwiQW55IiwiZmllbGRzIiwidHlwZV91cmwiLCJ0eXBlIiwiaWQiLCJ0aW1lVHlwZSIsIkR1cmF0aW9uIiwic2Vjb25kcyIsIm5hbm9zIiwiVGltZXN0YW1wIiwiRW1wdHkiLCJTdHJ1Y3QiLCJrZXlUeXBlIiwiVmFsdWUiLCJvbmVvZnMiLCJraW5kIiwib25lb2YiLCJudWxsVmFsdWUiLCJudW1iZXJWYWx1ZSIsInN0cmluZ1ZhbHVlIiwiYm9vbFZhbHVlIiwic3RydWN0VmFsdWUiLCJsaXN0VmFsdWUiLCJOdWxsVmFsdWUiLCJ2YWx1ZXMiLCJOVUxMX1ZBTFVFIiwiTGlzdFZhbHVlIiwicnVsZSIsIkRvdWJsZVZhbHVlIiwiRmxvYXRWYWx1ZSIsIkludDY0VmFsdWUiLCJVSW50NjRWYWx1ZSIsIkludDMyVmFsdWUiLCJVSW50MzJWYWx1ZSIsIkJvb2xWYWx1ZSIsIlN0cmluZ1ZhbHVlIiwiQnl0ZXNWYWx1ZSIsIkZpZWxkTWFzayIsInBhdGhzIiwiZ2V0IiwiZmlsZSIsImNvbnZlcnRlciIsIkVudW0iLCJnZW5WYWx1ZVBhcnRpYWxfZnJvbU9iamVjdCIsImdlbiIsImZpZWxkIiwiZmllbGRJbmRleCIsInByb3AiLCJyZXNvbHZlZFR5cGUiLCJyZXBlYXRlZCIsInR5cGVEZWZhdWx0IiwiZnVsbE5hbWUiLCJpc1Vuc2lnbmVkIiwiZnJvbU9iamVjdCIsIm10eXBlIiwiZmllbGRzQXJyYXkiLCJzYWZlUHJvcCIsIm1hcCIsImdlblZhbHVlUGFydGlhbF90b09iamVjdCIsInRvT2JqZWN0Iiwic29ydCIsImNvbXBhcmVGaWVsZHNCeUlkIiwicmVwZWF0ZWRGaWVsZHMiLCJtYXBGaWVsZHMiLCJub3JtYWxGaWVsZHMiLCJwYXJ0T2YiLCJ2YWx1ZXNCeUlkIiwibG93IiwiaGlnaCIsInVuc2lnbmVkIiwidG9OdW1iZXIiLCJieXRlcyIsImhhc0tzMiIsIl9maWVsZHNBcnJheSIsImluZGV4T2YiLCJkZWNvZGVyIiwidHlwZXMiLCJtaXNzaW5nIiwiZmlsdGVyIiwiZ3JvdXAiLCJyZWYiLCJiYXNpYyIsInBhY2tlZCIsInJmaWVsZCIsInJlcXVpcmVkIiwiZW5jb2RlciIsImdlblR5cGVQYXJ0aWFsIiwid2lyZVR5cGUiLCJtYXBLZXkiLCJvcHRpb25hbCIsIlJlZmxlY3Rpb25PYmplY3QiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsImNsYXNzTmFtZSIsIk5hbWVzcGFjZSIsImNvbW1lbnQiLCJjb21tZW50cyIsIlR5cGVFcnJvciIsInJlc2VydmVkIiwiZnJvbUpTT04iLCJlbm0iLCJ0b0pTT04iLCJ0b0pTT05PcHRpb25zIiwia2VlcENvbW1lbnRzIiwiQm9vbGVhbiIsImFkZCIsImlzU3RyaW5nIiwiaXNJbnRlZ2VyIiwiaXNSZXNlcnZlZElkIiwiaXNSZXNlcnZlZE5hbWUiLCJhbGxvd19hbGlhcyIsInJlbW92ZSIsIkZpZWxkIiwiVHlwZSIsInJ1bGVSZSIsImV4dGVuZCIsImlzT2JqZWN0IiwidG9Mb3dlckNhc2UiLCJtZXNzYWdlIiwiZGVmYXVsdFZhbHVlIiwiZXh0ZW5zaW9uRmllbGQiLCJkZWNsYXJpbmdGaWVsZCIsIl9wYWNrZWQiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE9wdGlvbiIsInNldE9wdGlvbiIsImlmTm90U2V0IiwicmVzb2x2ZWQiLCJkZWZhdWx0cyIsInBhcmVudCIsImxvb2t1cFR5cGVPckVudW0iLCJmcm9tTnVtYmVyIiwiZnJlZXplIiwibmV3QnVmZmVyIiwiZW1wdHlPYmplY3QiLCJlbXB0eUFycmF5IiwiY3RvciIsImQiLCJkZWNvcmF0ZUZpZWxkIiwiZmllbGRJZCIsImZpZWxkVHlwZSIsImZpZWxkUnVsZSIsImRlY29yYXRlVHlwZSIsImRlY29yYXRlRW51bSIsImZpZWxkRGVjb3JhdG9yIiwiZmllbGROYW1lIiwiX2NvbmZpZ3VyZSIsIlR5cGVfIiwiYnVpbGQiLCJsb2FkIiwicm9vdCIsIlJvb3QiLCJsb2FkU3luYyIsInZlcmlmaWVyIiwiT25lT2YiLCJNYXBGaWVsZCIsIlNlcnZpY2UiLCJNZXRob2QiLCJNZXNzYWdlIiwid3JhcHBlcnMiLCJXcml0ZXIiLCJCdWZmZXJXcml0ZXIiLCJSZWFkZXIiLCJCdWZmZXJSZWFkZXIiLCJycGMiLCJyb290cyIsInRva2VuaXplIiwicGFyc2UiLCJyZXNvbHZlZEtleVR5cGUiLCJkZWNvcmF0ZU1hcEZpZWxkIiwiZmllbGRLZXlUeXBlIiwiZmllbGRWYWx1ZVR5cGUiLCJtYXBGaWVsZERlY29yYXRvciIsInByb3BlcnRpZXMiLCIkdHlwZSIsIndyaXRlciIsImVuY29kZURlbGltaXRlZCIsInJlYWRlciIsImRlY29kZURlbGltaXRlZCIsInZlcmlmeSIsIm9iamVjdCIsInJlcXVlc3RUeXBlIiwicmVxdWVzdFN0cmVhbSIsInJlc3BvbnNlU3RyZWFtIiwicmVzb2x2ZWRSZXF1ZXN0VHlwZSIsInJlc29sdmVkUmVzcG9uc2VUeXBlIiwibG9va3VwVHlwZSIsImFkZEpTT04iLCJhcnJheVRvSlNPTiIsImFycmF5Iiwib2JqIiwiX25lc3RlZEFycmF5IiwiY2xlYXJDYWNoZSIsIm5hbWVzcGFjZSIsInRvQXJyYXkiLCJuZXN0ZWRBcnJheSIsIm5lc3RlZEpzb24iLCJucyIsIm5hbWVzIiwibWV0aG9kcyIsImdldEVudW0iLCJwcmV2Iiwic2V0T3B0aW9ucyIsIm9uQWRkIiwib25SZW1vdmUiLCJpc0FycmF5IiwicHRyIiwicGFydCIsInJlc29sdmVBbGwiLCJsb29rdXAiLCJmaWx0ZXJUeXBlcyIsInBhcmVudEFscmVhZHlDaGVja2VkIiwiZm91bmQiLCJsb29rdXBFbnVtIiwibG9va3VwU2VydmljZSIsIlNlcnZpY2VfIiwiZGVmaW5lUHJvcGVydGllcyIsInVuc2hpZnQiLCJfaGFuZGxlQWRkIiwiX2hhbmRsZVJlbW92ZSIsIlJvb3RfIiwiZmllbGROYW1lcyIsImFkZEZpZWxkc1RvUGFyZW50Iiwic2VsZiIsImRlY29yYXRlT25lT2YiLCJvbmVPZkRlY29yYXRvciIsIm9uZW9mTmFtZSIsIm9uZU9mR2V0dGVyIiwic2V0Iiwib25lT2ZTZXR0ZXIiLCJrZWVwQ2FzZSIsImJhc2UxMFJlIiwiYmFzZTEwTmVnUmUiLCJiYXNlMTZSZSIsImJhc2UxNk5lZ1JlIiwiYmFzZThSZSIsImJhc2U4TmVnUmUiLCJudW1iZXJSZSIsIm5hbWVSZSIsInR5cGVSZWZSZSIsImZxVHlwZVJlZlJlIiwidG4iLCJhbHRlcm5hdGVDb21tZW50TW9kZSIsIm5leHQiLCJwZWVrIiwic2tpcCIsImNtbnQiLCJoZWFkIiwicGtnIiwiaW1wb3J0cyIsIndlYWtJbXBvcnRzIiwic3ludGF4IiwiaXNQcm90bzMiLCJhcHBseUNhc2UiLCJjYW1lbENhc2UiLCJpbGxlZ2FsIiwidG9rZW4iLCJpbnNpZGVUcnlDYXRjaCIsImxpbmUiLCJyZWFkU3RyaW5nIiwicmVhZFZhbHVlIiwiYWNjZXB0VHlwZVJlZiIsInBhcnNlTnVtYmVyIiwicmVhZFJhbmdlcyIsInRhcmdldCIsImFjY2VwdFN0cmluZ3MiLCJwYXJzZUlkIiwic3Vic3RyaW5nIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwiYWNjZXB0TmVnYXRpdmUiLCJwYXJzZVBhY2thZ2UiLCJwYXJzZUltcG9ydCIsIndoaWNoSW1wb3J0cyIsInBhcnNlU3ludGF4IiwicGFyc2VDb21tb24iLCJwYXJzZU9wdGlvbiIsInBhcnNlVHlwZSIsInBhcnNlRW51bSIsInBhcnNlU2VydmljZSIsInBhcnNlRXh0ZW5zaW9uIiwiaWZCbG9jayIsImZuSWYiLCJmbkVsc2UiLCJ0cmFpbGluZ0xpbmUiLCJwYXJzZVR5cGVfYmxvY2siLCJwYXJzZU1hcEZpZWxkIiwicGFyc2VGaWVsZCIsInBhcnNlT25lT2YiLCJleHRlbnNpb25zIiwicGFyc2VHcm91cCIsInBhcnNlRmllbGRfYmxvY2siLCJwYXJzZUZpZWxkX2xpbmUiLCJwYXJzZUlubGluZU9wdGlvbnMiLCJsY0ZpcnN0IiwidWNGaXJzdCIsInBhcnNlR3JvdXBfYmxvY2siLCJ2YWx1ZVR5cGUiLCJwYXJzZU1hcEZpZWxkX2Jsb2NrIiwicGFyc2VNYXBGaWVsZF9saW5lIiwicGFyc2VPbmVPZl9ibG9jayIsInBhcnNlRW51bV9ibG9jayIsInBhcnNlRW51bVZhbHVlIiwiZHVtbXkiLCJwYXJzZUVudW1WYWx1ZV9ibG9jayIsInBhcnNlRW51bVZhbHVlX2xpbmUiLCJpc0N1c3RvbSIsInBhcnNlT3B0aW9uVmFsdWUiLCJzZXJ2aWNlIiwicGFyc2VTZXJ2aWNlX2Jsb2NrIiwicGFyc2VNZXRob2QiLCJtZXRob2QiLCJwYXJzZU1ldGhvZF9ibG9jayIsInJlZmVyZW5jZSIsInBhcnNlRXh0ZW5zaW9uX2Jsb2NrIiwiTG9uZ0JpdHMiLCJpbmRleE91dE9mUmFuZ2UiLCJ3cml0ZUxlbmd0aCIsIlJhbmdlRXJyb3IiLCJjcmVhdGVfYXJyYXkiLCJjcmVhdGVfdHlwZWRfYXJyYXkiLCJCdWZmZXIiLCJjcmVhdGVfYnVmZmVyX3NldHVwIiwiY3JlYXRlX2J1ZmZlciIsImlzQnVmZmVyIiwiX3NsaWNlIiwic3ViYXJyYXkiLCJ1aW50MzIiLCJyZWFkX3VpbnQzMl9zZXR1cCIsInJlYWRfdWludDMyIiwiaW50MzIiLCJyZWFkX2ludDMyIiwic2ludDMyIiwicmVhZF9zaW50MzIiLCJyZWFkTG9uZ1ZhcmludCIsImJpdHMiLCJib29sIiwicmVhZF9ib29sIiwicmVhZEZpeGVkMzJfZW5kIiwiZml4ZWQzMiIsInJlYWRfZml4ZWQzMiIsInNmaXhlZDMyIiwicmVhZF9zZml4ZWQzMiIsInJlYWRGaXhlZDY0IiwicmVhZF9mbG9hdCIsInJlYWRfZG91YmxlIiwicmVhZF9ieXRlcyIsInJlYWRfc3RyaW5nIiwic2tpcFR5cGUiLCJCdWZmZXJSZWFkZXJfIiwibWVyZ2UiLCJpbnQ2NCIsInJlYWRfaW50NjQiLCJ1aW50NjQiLCJyZWFkX3VpbnQ2NCIsInNpbnQ2NCIsInJlYWRfc2ludDY0IiwienpEZWNvZGUiLCJmaXhlZDY0IiwicmVhZF9maXhlZDY0Iiwic2ZpeGVkNjQiLCJyZWFkX3NmaXhlZDY0IiwicmVhZF9zdHJpbmdfYnVmZmVyIiwidXRmOFNsaWNlIiwibWluIiwiZGVmZXJyZWQiLCJmaWxlcyIsInJlc29sdmVQYXRoIiwiU1lOQyIsInN5bmMiLCJmaW5pc2giLCJjYiIsInByb2Nlc3MiLCJwYXJzZWQiLCJxdWV1ZWQiLCJ3ZWFrIiwiaWR4IiwibGFzdEluZGV4T2YiLCJhbHRuYW1lIiwic2V0VGltZW91dCIsInJlYWRGaWxlU3luYyIsImlzTm9kZSIsImV4cG9zZVJlIiwidHJ5SGFuZGxlRXh0ZW5zaW9uIiwiZXh0ZW5kZWRUeXBlIiwic2lzdGVyRmllbGQiLCJwYXJzZV8iLCJjb21tb25fIiwicnBjSW1wbCIsInJlcXVlc3REZWxpbWl0ZWQiLCJyZXNwb25zZURlbGltaXRlZCIsInJwY0NhbGwiLCJyZXF1ZXN0Q3RvciIsInJlc3BvbnNlQ3RvciIsInJlcXVlc3QiLCJycGNDYWxsYmFjayIsImVuZGVkQnlSUEMiLCJfbWV0aG9kc0FycmF5IiwiaW5oZXJpdGVkIiwibWV0aG9kc0FycmF5IiwicnBjU2VydmljZSIsIm1ldGhvZE5hbWUiLCJpc1Jlc2VydmVkIiwibSIsInEiLCJzIiwiZGVsaW1SZSIsInN0cmluZ0RvdWJsZVJlIiwic3RyaW5nU2luZ2xlUmUiLCJzZXRDb21tZW50UmUiLCJzZXRDb21tZW50QWx0UmUiLCJzZXRDb21tZW50U3BsaXRSZSIsIndoaXRlc3BhY2VSZSIsInVuZXNjYXBlUmUiLCJ1bmVzY2FwZU1hcCIsInVuZXNjYXBlIiwic3RyIiwiY29tbWVudFR5cGUiLCJjb21tZW50VGV4dCIsImNvbW1lbnRMaW5lIiwiY29tbWVudExpbmVFbXB0eSIsInN0YWNrIiwic3RyaW5nRGVsaW0iLCJzdWJqZWN0IiwicmUiLCJsYXN0SW5kZXgiLCJtYXRjaCIsImV4ZWMiLCJzZXRDb21tZW50IiwibG9va2JhY2siLCJjb21tZW50T2Zmc2V0IiwibGluZXMiLCJ0cmltIiwiaXNEb3VibGVTbGFzaENvbW1lbnRMaW5lIiwic3RhcnRPZmZzZXQiLCJlbmRPZmZzZXQiLCJmaW5kRW5kT2ZMaW5lIiwibGluZVRleHQiLCJpc0NvbW1lbnQiLCJjdXJzb3IiLCJyZXBlYXQiLCJjdXJyIiwiaXNEb2MiLCJkZWxpbSIsImV4cGVjdGVkIiwiYWN0dWFsIiwiZXF1YWxzIiwicmV0IiwiX2ZpZWxkc0J5SWQiLCJfb25lb2ZzQXJyYXkiLCJfY3RvciIsImZpZWxkc0J5SWQiLCJvbmVvZnNBcnJheSIsImdlbmVyYXRlQ29uc3RydWN0b3IiLCJjdG9yUHJvcGVydGllcyIsInNldHVwIiwid3JhcHBlciIsIm9yaWdpbmFsVGhpcyIsImVuY29kZV9zZXR1cCIsImZvcmsiLCJsZGVsaW0iLCJkZWNvZGVfc2V0dXAiLCJ2ZXJpZnlfc2V0dXAiLCJ0eXBlTmFtZSIsInR5cGVEZWNvcmF0b3IiLCJiYWtlIiwibyIsImtleSIsInNhZmVQcm9wQmFja3NsYXNoUmUiLCJzYWZlUHJvcFF1b3RlUmUiLCJ0b1VwcGVyQ2FzZSIsImNhbWVsQ2FzZVJlIiwiYSIsImRlY29yYXRlUm9vdCIsImVudW1lcmFibGUiLCJkZWNvcmF0ZUVudW1JbmRleCIsInplcm8iLCJ6ekVuY29kZSIsInplcm9IYXNoIiwiZnJvbSIsImZyb21TdHJpbmciLCJ0b0xvbmciLCJmcm9tSGFzaCIsImhhc2giLCJ0b0hhc2giLCJtYXNrIiwicGFydDAiLCJwYXJ0MSIsInBhcnQyIiwidmVyc2lvbnMiLCJub2RlIiwiaXNGaW5pdGUiLCJpc3NldCIsImlzU2V0IiwiaGFzT3duUHJvcGVydHkiLCJ1dGY4V3JpdGUiLCJfQnVmZmVyX2Zyb20iLCJfQnVmZmVyX2FsbG9jVW5zYWZlIiwic2l6ZU9yQXJyYXkiLCJkY29kZUlPIiwia2V5MlJlIiwia2V5MzJSZSIsImtleTY0UmUiLCJsb25nVG9IYXNoIiwibG9uZ0Zyb21IYXNoIiwiZnJvbUJpdHMiLCJkc3QiLCJzcmMiLCJuZXdFcnJvciIsIkN1c3RvbUVycm9yIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJQcm90b2NvbEVycm9yIiwiZ2V0T25lT2YiLCJmaWVsZE1hcCIsInNldE9uZU9mIiwibG9uZ3MiLCJlbnVtcyIsIkJ1ZmZlcl9mcm9tIiwiZW5jb2RpbmciLCJhbGxvY1Vuc2FmZSIsIkJ1ZmZlcl9hbGxvY1Vuc2FmZSIsImludmFsaWQiLCJnZW5WZXJpZnlWYWx1ZSIsImdlblZlcmlmeUtleSIsInNlZW5GaXJzdEZpZWxkIiwib25lb2ZQcm9wIiwic3Vic3RyIiwiT3AiLCJub29wIiwiU3RhdGUiLCJ0YWlsIiwic3RhdGVzIiwiX3B1c2giLCJ3cml0ZUJ5dGUiLCJ3cml0ZVZhcmludDMyIiwiVmFyaW50T3AiLCJ3cml0ZV91aW50MzIiLCJ3cml0ZV9pbnQzMiIsIndyaXRlVmFyaW50NjQiLCJ3cml0ZV9zaW50MzIiLCJ3cml0ZV91aW50NjQiLCJ3cml0ZV9zaW50NjQiLCJ3cml0ZV9ib29sIiwid3JpdGVGaXhlZDMyIiwid3JpdGVfZml4ZWQzMiIsIndyaXRlX2ZpeGVkNjQiLCJ3cml0ZV9mbG9hdCIsIndyaXRlX2RvdWJsZSIsIndyaXRlQnl0ZXMiLCJ3cml0ZUJ5dGVzX3NldCIsIndyaXRlQnl0ZXNfZm9yIiwid3JpdGVfYnl0ZXMiLCJ3cml0ZV9zdHJpbmciLCJyZXNldCIsIkJ1ZmZlcldyaXRlcl8iLCJhbGxvY19idWZmZXIiLCJ3cml0ZUJ5dGVzQnVmZmVyIiwid3JpdGVCeXRlc0J1ZmZlcl9zZXQiLCJ3cml0ZUJ5dGVzQnVmZmVyX2NvcHkiLCJjb3B5Iiwid3JpdGVfYnl0ZXNfYnVmZmVyIiwid3JpdGVTdHJpbmdCdWZmZXIiLCJ3cml0ZV9zdHJpbmdfYnVmZmVyIiwiYnl0ZUxlbmd0aCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBTUEsQ0FBQyxVQUFTQSxNQUFULEVBQWdCQyxTQUFoQixFQUEwQjtBQUFDOztBQUFhLEdBQUMsU0FBU0MsT0FBVCxDQUFpQkMsT0FBakIsRUFBMEJDLEtBQTFCLEVBQWlDQyxPQUFqQyxFQUEwQztBQUVoRjtBQUNBO0FBQ0E7QUFDQTtBQUVBLGFBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3BCLFVBQUlDLE9BQU8sR0FBR0osS0FBSyxDQUFDRyxJQUFELENBQW5CO0FBQ0EsVUFBSSxDQUFDQyxPQUFMLEVBQ0lMLE9BQU8sQ0FBQ0ksSUFBRCxDQUFQLENBQWMsQ0FBZCxFQUFpQkUsSUFBakIsQ0FBc0JELE9BQU8sR0FBR0osS0FBSyxDQUFDRyxJQUFELENBQUwsR0FBYztBQUFFRyxRQUFBQSxPQUFPLEVBQUU7QUFBWCxPQUE5QyxFQUErREosUUFBL0QsRUFBeUVFLE9BQXpFLEVBQWtGQSxPQUFPLENBQUNFLE9BQTFGO0FBQ0osYUFBT0YsT0FBTyxDQUFDRSxPQUFmO0FBQ0gsS0FaK0UsQ0FjaEY7OztBQUNBLFFBQUlDLFFBQVEsR0FBR1gsTUFBTSxDQUFDVyxRQUFQLEdBQWtCTCxRQUFRLENBQUNELE9BQU8sQ0FBQyxDQUFELENBQVIsQ0FBekMsQ0FmZ0YsQ0FpQmhGOztBQUNBLFFBQUksT0FBT08sTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsTUFBTSxDQUFDQyxHQUEzQyxFQUNJRCxNQUFNLENBQUMsQ0FBQyxNQUFELENBQUQsRUFBVyxVQUFTRSxJQUFULEVBQWU7QUFDNUIsVUFBSUEsSUFBSSxJQUFJQSxJQUFJLENBQUNDLE1BQWpCLEVBQXlCO0FBQ3JCSixRQUFBQSxRQUFRLENBQUNLLElBQVQsQ0FBY0YsSUFBZCxHQUFxQkEsSUFBckI7QUFDQUgsUUFBQUEsUUFBUSxDQUFDTSxTQUFUO0FBQ0g7O0FBQ0QsYUFBT04sUUFBUDtBQUNILEtBTkssQ0FBTixDQW5CNEUsQ0EyQmhGOztBQUNBLFFBQUksT0FBT08sTUFBUCxLQUFrQixRQUFsQixJQUE4QkEsTUFBOUIsSUFBd0NBLE1BQU0sQ0FBQ1IsT0FBbkQsRUFDSVEsTUFBTSxDQUFDUixPQUFQLEdBQWlCQyxRQUFqQjtBQUVQLEdBL0J3QztBQStCdkM7QUFBcUI7QUFBQyxPQUFFLENBQUMsVUFBU1EsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQzNEOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJVLFNBQWpCO0FBRUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFRQSxlQUFTQSxTQUFULENBQW1CQyxFQUFuQixFQUF1QkM7QUFBRztBQUExQixRQUEwQztBQUN0QyxZQUFJQyxNQUFNLEdBQUksSUFBSUMsS0FBSixDQUFVQyxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBN0IsQ0FBZDtBQUFBLFlBQ0lDLE1BQU0sR0FBSSxDQURkO0FBQUEsWUFFSUMsS0FBSyxHQUFLLENBRmQ7QUFBQSxZQUdJQyxPQUFPLEdBQUcsSUFIZDs7QUFJQSxlQUFPRCxLQUFLLEdBQUdILFNBQVMsQ0FBQ0MsTUFBekI7QUFDSUgsVUFBQUEsTUFBTSxDQUFDSSxNQUFNLEVBQVAsQ0FBTixHQUFtQkYsU0FBUyxDQUFDRyxLQUFLLEVBQU4sQ0FBNUI7QUFESjs7QUFFQSxlQUFPLElBQUlFLE9BQUosQ0FBWSxTQUFTQyxRQUFULENBQWtCQyxPQUFsQixFQUEyQkMsTUFBM0IsRUFBbUM7QUFDbERWLFVBQUFBLE1BQU0sQ0FBQ0ksTUFBRCxDQUFOLEdBQWlCLFNBQVNPLFFBQVQsQ0FBa0JDO0FBQUc7QUFBckIsWUFBcUM7QUFDbEQsZ0JBQUlOLE9BQUosRUFBYTtBQUNUQSxjQUFBQSxPQUFPLEdBQUcsS0FBVjtBQUNBLGtCQUFJTSxHQUFKLEVBQ0lGLE1BQU0sQ0FBQ0UsR0FBRCxDQUFOLENBREosS0FFSztBQUNELG9CQUFJWixNQUFNLEdBQUcsSUFBSUMsS0FBSixDQUFVQyxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBN0IsQ0FBYjtBQUFBLG9CQUNJQyxNQUFNLEdBQUcsQ0FEYjs7QUFFQSx1QkFBT0EsTUFBTSxHQUFHSixNQUFNLENBQUNHLE1BQXZCO0FBQ0lILGtCQUFBQSxNQUFNLENBQUNJLE1BQU0sRUFBUCxDQUFOLEdBQW1CRixTQUFTLENBQUNFLE1BQUQsQ0FBNUI7QUFESjs7QUFFQUssZ0JBQUFBLE9BQU8sQ0FBQ0ksS0FBUixDQUFjLElBQWQsRUFBb0JiLE1BQXBCO0FBQ0g7QUFDSjtBQUNKLFdBYkQ7O0FBY0EsY0FBSTtBQUNBRixZQUFBQSxFQUFFLENBQUNlLEtBQUgsQ0FBU2QsR0FBRyxJQUFJLElBQWhCLEVBQXNCQyxNQUF0QjtBQUNILFdBRkQsQ0FFRSxPQUFPWSxHQUFQLEVBQVk7QUFDVixnQkFBSU4sT0FBSixFQUFhO0FBQ1RBLGNBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0FJLGNBQUFBLE1BQU0sQ0FBQ0UsR0FBRCxDQUFOO0FBQ0g7QUFDSjtBQUNKLFNBdkJNLENBQVA7QUF3Qkg7QUFFQSxLQXREeUIsRUFzRHhCLEVBdER3QixDQUFIO0FBc0RqQixPQUFFLENBQUMsVUFBU2hCLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUN6QztBQUVBOzs7Ozs7QUFLQSxVQUFJMkIsTUFBTSxHQUFHM0IsT0FBYjtBQUVBOzs7Ozs7QUFLQTJCLE1BQUFBLE1BQU0sQ0FBQ1gsTUFBUCxHQUFnQixTQUFTQSxNQUFULENBQWdCWSxNQUFoQixFQUF3QjtBQUNwQyxZQUFJQyxDQUFDLEdBQUdELE1BQU0sQ0FBQ1osTUFBZjtBQUNBLFlBQUksQ0FBQ2EsQ0FBTCxFQUNJLE9BQU8sQ0FBUDtBQUNKLFlBQUlDLENBQUMsR0FBRyxDQUFSOztBQUNBLGVBQU8sRUFBRUQsQ0FBRixHQUFNLENBQU4sR0FBVSxDQUFWLElBQWVELE1BQU0sQ0FBQ0csTUFBUCxDQUFjRixDQUFkLE1BQXFCLEdBQTNDO0FBQ0ksWUFBRUMsQ0FBRjtBQURKOztBQUVBLGVBQU9FLElBQUksQ0FBQ0MsSUFBTCxDQUFVTCxNQUFNLENBQUNaLE1BQVAsR0FBZ0IsQ0FBMUIsSUFBK0IsQ0FBL0IsR0FBbUNjLENBQTFDO0FBQ0gsT0FSRCxDQWZ5QyxDQXlCekM7OztBQUNBLFVBQUlJLEdBQUcsR0FBRyxJQUFJcEIsS0FBSixDQUFVLEVBQVYsQ0FBVixDQTFCeUMsQ0E0QnpDOztBQUNBLFVBQUlxQixHQUFHLEdBQUcsSUFBSXJCLEtBQUosQ0FBVSxHQUFWLENBQVYsQ0E3QnlDLENBK0J6Qzs7QUFDQSxXQUFLLElBQUlzQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCO0FBQ0lELFFBQUFBLEdBQUcsQ0FBQ0QsR0FBRyxDQUFDRSxDQUFELENBQUgsR0FBU0EsQ0FBQyxHQUFHLEVBQUosR0FBU0EsQ0FBQyxHQUFHLEVBQWIsR0FBa0JBLENBQUMsR0FBRyxFQUFKLEdBQVNBLENBQUMsR0FBRyxFQUFiLEdBQWtCQSxDQUFDLEdBQUcsRUFBSixHQUFTQSxDQUFDLEdBQUcsQ0FBYixHQUFpQkEsQ0FBQyxHQUFHLEVBQUosR0FBUyxFQUF4RSxDQUFILEdBQWlGQSxDQUFDLEVBQWxGO0FBREo7QUFHQTs7Ozs7Ozs7O0FBT0FULE1BQUFBLE1BQU0sQ0FBQ1UsTUFBUCxHQUFnQixTQUFTQSxNQUFULENBQWdCQyxNQUFoQixFQUF3QkMsS0FBeEIsRUFBK0JDLEdBQS9CLEVBQW9DO0FBQ2hELFlBQUlDLEtBQUssR0FBRyxJQUFaO0FBQUEsWUFDSUMsS0FBSyxHQUFHLEVBRFo7QUFFQSxZQUFJTixDQUFDLEdBQUcsQ0FBUjtBQUFBLFlBQVc7QUFDUE8sUUFBQUEsQ0FBQyxHQUFHLENBRFI7QUFBQSxZQUNXO0FBQ1BDLFFBQUFBLENBRkosQ0FIZ0QsQ0FLckM7O0FBQ1gsZUFBT0wsS0FBSyxHQUFHQyxHQUFmLEVBQW9CO0FBQ2hCLGNBQUlLLENBQUMsR0FBR1AsTUFBTSxDQUFDQyxLQUFLLEVBQU4sQ0FBZDs7QUFDQSxrQkFBUUksQ0FBUjtBQUNJLGlCQUFLLENBQUw7QUFDSUQsY0FBQUEsS0FBSyxDQUFDTixDQUFDLEVBQUYsQ0FBTCxHQUFhRixHQUFHLENBQUNXLENBQUMsSUFBSSxDQUFOLENBQWhCO0FBQ0FELGNBQUFBLENBQUMsR0FBRyxDQUFDQyxDQUFDLEdBQUcsQ0FBTCxLQUFXLENBQWY7QUFDQUYsY0FBQUEsQ0FBQyxHQUFHLENBQUo7QUFDQTs7QUFDSixpQkFBSyxDQUFMO0FBQ0lELGNBQUFBLEtBQUssQ0FBQ04sQ0FBQyxFQUFGLENBQUwsR0FBYUYsR0FBRyxDQUFDVSxDQUFDLEdBQUdDLENBQUMsSUFBSSxDQUFWLENBQWhCO0FBQ0FELGNBQUFBLENBQUMsR0FBRyxDQUFDQyxDQUFDLEdBQUcsRUFBTCxLQUFZLENBQWhCO0FBQ0FGLGNBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0E7O0FBQ0osaUJBQUssQ0FBTDtBQUNJRCxjQUFBQSxLQUFLLENBQUNOLENBQUMsRUFBRixDQUFMLEdBQWFGLEdBQUcsQ0FBQ1UsQ0FBQyxHQUFHQyxDQUFDLElBQUksQ0FBVixDQUFoQjtBQUNBSCxjQUFBQSxLQUFLLENBQUNOLENBQUMsRUFBRixDQUFMLEdBQWFGLEdBQUcsQ0FBQ1csQ0FBQyxHQUFHLEVBQUwsQ0FBaEI7QUFDQUYsY0FBQUEsQ0FBQyxHQUFHLENBQUo7QUFDQTtBQWZSOztBQWlCQSxjQUFJUCxDQUFDLEdBQUcsSUFBUixFQUFjO0FBQ1YsYUFBQ0ssS0FBSyxLQUFLQSxLQUFLLEdBQUcsRUFBYixDQUFOLEVBQXdCSyxJQUF4QixDQUE2QkMsTUFBTSxDQUFDQyxZQUFQLENBQW9CdEIsS0FBcEIsQ0FBMEJxQixNQUExQixFQUFrQ0wsS0FBbEMsQ0FBN0I7QUFDQU4sWUFBQUEsQ0FBQyxHQUFHLENBQUo7QUFDSDtBQUNKOztBQUNELFlBQUlPLENBQUosRUFBTztBQUNIRCxVQUFBQSxLQUFLLENBQUNOLENBQUMsRUFBRixDQUFMLEdBQWFGLEdBQUcsQ0FBQ1UsQ0FBRCxDQUFoQjtBQUNBRixVQUFBQSxLQUFLLENBQUNOLENBQUMsRUFBRixDQUFMLEdBQWEsRUFBYjtBQUNBLGNBQUlPLENBQUMsS0FBSyxDQUFWLEVBQ0lELEtBQUssQ0FBQ04sQ0FBQyxFQUFGLENBQUwsR0FBYSxFQUFiO0FBQ1A7O0FBQ0QsWUFBSUssS0FBSixFQUFXO0FBQ1AsY0FBSUwsQ0FBSixFQUNJSyxLQUFLLENBQUNLLElBQU4sQ0FBV0MsTUFBTSxDQUFDQyxZQUFQLENBQW9CdEIsS0FBcEIsQ0FBMEJxQixNQUExQixFQUFrQ0wsS0FBSyxDQUFDTyxLQUFOLENBQVksQ0FBWixFQUFlYixDQUFmLENBQWxDLENBQVg7QUFDSixpQkFBT0ssS0FBSyxDQUFDUyxJQUFOLENBQVcsRUFBWCxDQUFQO0FBQ0g7O0FBQ0QsZUFBT0gsTUFBTSxDQUFDQyxZQUFQLENBQW9CdEIsS0FBcEIsQ0FBMEJxQixNQUExQixFQUFrQ0wsS0FBSyxDQUFDTyxLQUFOLENBQVksQ0FBWixFQUFlYixDQUFmLENBQWxDLENBQVA7QUFDSCxPQTFDRDs7QUE0Q0EsVUFBSWUsZUFBZSxHQUFHLGtCQUF0QjtBQUVBOzs7Ozs7Ozs7QUFRQXhCLE1BQUFBLE1BQU0sQ0FBQ3lCLE1BQVAsR0FBZ0IsU0FBU0EsTUFBVCxDQUFnQnhCLE1BQWhCLEVBQXdCVSxNQUF4QixFQUFnQ3JCLE1BQWhDLEVBQXdDO0FBQ3BELFlBQUlzQixLQUFLLEdBQUd0QixNQUFaO0FBQ0EsWUFBSTBCLENBQUMsR0FBRyxDQUFSO0FBQUEsWUFBVztBQUNQQyxRQUFBQSxDQURKLENBRm9ELENBR3pDOztBQUNYLGFBQUssSUFBSVIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1IsTUFBTSxDQUFDWixNQUEzQixHQUFvQztBQUNoQyxjQUFJcUMsQ0FBQyxHQUFHekIsTUFBTSxDQUFDMEIsVUFBUCxDQUFrQmxCLENBQUMsRUFBbkIsQ0FBUjtBQUNBLGNBQUlpQixDQUFDLEtBQUssRUFBTixJQUFZVixDQUFDLEdBQUcsQ0FBcEIsRUFDSTtBQUNKLGNBQUksQ0FBQ1UsQ0FBQyxHQUFHbEIsR0FBRyxDQUFDa0IsQ0FBRCxDQUFSLE1BQWlCOUQsU0FBckIsRUFDSSxNQUFNZ0UsS0FBSyxDQUFDSixlQUFELENBQVg7O0FBQ0osa0JBQVFSLENBQVI7QUFDSSxpQkFBSyxDQUFMO0FBQ0lDLGNBQUFBLENBQUMsR0FBR1MsQ0FBSjtBQUNBVixjQUFBQSxDQUFDLEdBQUcsQ0FBSjtBQUNBOztBQUNKLGlCQUFLLENBQUw7QUFDSUwsY0FBQUEsTUFBTSxDQUFDckIsTUFBTSxFQUFQLENBQU4sR0FBbUIyQixDQUFDLElBQUksQ0FBTCxHQUFTLENBQUNTLENBQUMsR0FBRyxFQUFMLEtBQVksQ0FBeEM7QUFDQVQsY0FBQUEsQ0FBQyxHQUFHUyxDQUFKO0FBQ0FWLGNBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0E7O0FBQ0osaUJBQUssQ0FBTDtBQUNJTCxjQUFBQSxNQUFNLENBQUNyQixNQUFNLEVBQVAsQ0FBTixHQUFtQixDQUFDMkIsQ0FBQyxHQUFHLEVBQUwsS0FBWSxDQUFaLEdBQWdCLENBQUNTLENBQUMsR0FBRyxFQUFMLEtBQVksQ0FBL0M7QUFDQVQsY0FBQUEsQ0FBQyxHQUFHUyxDQUFKO0FBQ0FWLGNBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0E7O0FBQ0osaUJBQUssQ0FBTDtBQUNJTCxjQUFBQSxNQUFNLENBQUNyQixNQUFNLEVBQVAsQ0FBTixHQUFtQixDQUFDMkIsQ0FBQyxHQUFHLENBQUwsS0FBVyxDQUFYLEdBQWVTLENBQWxDO0FBQ0FWLGNBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0E7QUFsQlI7QUFvQkg7O0FBQ0QsWUFBSUEsQ0FBQyxLQUFLLENBQVYsRUFDSSxNQUFNWSxLQUFLLENBQUNKLGVBQUQsQ0FBWDtBQUNKLGVBQU9sQyxNQUFNLEdBQUdzQixLQUFoQjtBQUNILE9BbENEO0FBb0NBOzs7Ozs7O0FBS0FaLE1BQUFBLE1BQU0sQ0FBQzZCLElBQVAsR0FBYyxTQUFTQSxJQUFULENBQWM1QixNQUFkLEVBQXNCO0FBQ2hDLGVBQU8sbUVBQW1FNEIsSUFBbkUsQ0FBd0U1QixNQUF4RSxDQUFQO0FBQ0gsT0FGRDtBQUlDLEtBN0lPLEVBNklOLEVBN0lNLENBdERlO0FBbU1qQixPQUFFLENBQUMsVUFBU25CLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUN6Qzs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCeUQsT0FBakI7QUFFQTs7Ozs7Ozs7QUFPQSxlQUFTQSxPQUFULENBQWlCQyxjQUFqQixFQUFpQ0MsWUFBakMsRUFBK0M7QUFFM0M7QUFDQSxZQUFJLE9BQU9ELGNBQVAsS0FBMEIsUUFBOUIsRUFBd0M7QUFDcENDLFVBQUFBLFlBQVksR0FBR0QsY0FBZjtBQUNBQSxVQUFBQSxjQUFjLEdBQUduRSxTQUFqQjtBQUNIOztBQUVELFlBQUlxRSxJQUFJLEdBQUcsRUFBWDtBQUVBOzs7Ozs7Ozs7O0FBVUEsaUJBQVNDLE9BQVQsQ0FBaUJDLG1CQUFqQixFQUFzQztBQUNsQztBQUVBO0FBQ0EsY0FBSSxPQUFPQSxtQkFBUCxLQUErQixRQUFuQyxFQUE2QztBQUN6QyxnQkFBSUMsTUFBTSxHQUFHQyxRQUFRLEVBQXJCO0FBQ0EsZ0JBQUlQLE9BQU8sQ0FBQ1EsT0FBWixFQUNJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFjSixNQUExQixFQUhxQyxDQUdGOztBQUN2Q0EsWUFBQUEsTUFBTSxHQUFHLFlBQVlBLE1BQXJCOztBQUNBLGdCQUFJRCxtQkFBSixFQUF5QjtBQUNyQixrQkFBSU0sU0FBUyxHQUFLQyxNQUFNLENBQUNDLElBQVAsQ0FBWVIsbUJBQVosQ0FBbEI7QUFBQSxrQkFDSVMsV0FBVyxHQUFHLElBQUl6RCxLQUFKLENBQVVzRCxTQUFTLENBQUNwRCxNQUFWLEdBQW1CLENBQTdCLENBRGxCO0FBQUEsa0JBRUl3RCxXQUFXLEdBQUcsSUFBSTFELEtBQUosQ0FBVXNELFNBQVMsQ0FBQ3BELE1BQXBCLENBRmxCO0FBQUEsa0JBR0l5RCxXQUFXLEdBQUcsQ0FIbEI7O0FBSUEscUJBQU9BLFdBQVcsR0FBR0wsU0FBUyxDQUFDcEQsTUFBL0IsRUFBdUM7QUFDbkN1RCxnQkFBQUEsV0FBVyxDQUFDRSxXQUFELENBQVgsR0FBMkJMLFNBQVMsQ0FBQ0ssV0FBRCxDQUFwQztBQUNBRCxnQkFBQUEsV0FBVyxDQUFDQyxXQUFELENBQVgsR0FBMkJYLG1CQUFtQixDQUFDTSxTQUFTLENBQUNLLFdBQVcsRUFBWixDQUFWLENBQTlDO0FBQ0g7O0FBQ0RGLGNBQUFBLFdBQVcsQ0FBQ0UsV0FBRCxDQUFYLEdBQTJCVixNQUEzQjtBQUNBLHFCQUFPVyxRQUFRLENBQUNoRCxLQUFULENBQWUsSUFBZixFQUFxQjZDLFdBQXJCLEVBQWtDN0MsS0FBbEMsQ0FBd0MsSUFBeEMsRUFBOEM4QyxXQUE5QyxDQUFQLENBVnFCLENBVThDO0FBQ3RFOztBQUNELG1CQUFPRSxRQUFRLENBQUNYLE1BQUQsQ0FBUixFQUFQLENBakJ5QyxDQWlCZDtBQUM5QixXQXRCaUMsQ0F3QmxDOzs7QUFDQSxjQUFJWSxZQUFZLEdBQUcsSUFBSTdELEtBQUosQ0FBVUMsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQTdCLENBQW5CO0FBQUEsY0FDSTRELFlBQVksR0FBRyxDQURuQjs7QUFFQSxpQkFBT0EsWUFBWSxHQUFHRCxZQUFZLENBQUMzRCxNQUFuQztBQUNJMkQsWUFBQUEsWUFBWSxDQUFDQyxZQUFELENBQVosR0FBNkI3RCxTQUFTLENBQUMsRUFBRTZELFlBQUgsQ0FBdEM7QUFESjs7QUFFQUEsVUFBQUEsWUFBWSxHQUFHLENBQWY7QUFDQWQsVUFBQUEsbUJBQW1CLEdBQUdBLG1CQUFtQixDQUFDZSxPQUFwQixDQUE0QixjQUE1QixFQUE0QyxTQUFTQSxPQUFULENBQWlCQyxFQUFqQixFQUFxQkMsRUFBckIsRUFBeUI7QUFDdkYsZ0JBQUlDLEtBQUssR0FBR0wsWUFBWSxDQUFDQyxZQUFZLEVBQWIsQ0FBeEI7O0FBQ0Esb0JBQVFHLEVBQVI7QUFDSSxtQkFBSyxHQUFMO0FBQVUsbUJBQUssR0FBTDtBQUFVLHVCQUFPaEMsTUFBTSxDQUFDa0MsTUFBTSxDQUFDRCxLQUFELENBQVAsQ0FBYjs7QUFDcEIsbUJBQUssR0FBTDtBQUFVLHVCQUFPakMsTUFBTSxDQUFDZixJQUFJLENBQUNrRCxLQUFMLENBQVdGLEtBQVgsQ0FBRCxDQUFiOztBQUNWLG1CQUFLLEdBQUw7QUFBVSx1QkFBT0csSUFBSSxDQUFDQyxTQUFMLENBQWVKLEtBQWYsQ0FBUDs7QUFDVixtQkFBSyxHQUFMO0FBQVUsdUJBQU9qQyxNQUFNLENBQUNpQyxLQUFELENBQWI7QUFKZDs7QUFNQSxtQkFBTyxHQUFQO0FBQ0gsV0FUcUIsQ0FBdEI7QUFVQSxjQUFJSixZQUFZLEtBQUtELFlBQVksQ0FBQzNELE1BQWxDLEVBQ0ksTUFBTXVDLEtBQUssQ0FBQywwQkFBRCxDQUFYO0FBQ0pLLFVBQUFBLElBQUksQ0FBQ2QsSUFBTCxDQUFVZ0IsbUJBQVY7QUFDQSxpQkFBT0QsT0FBUDtBQUNIOztBQUVELGlCQUFTRyxRQUFULENBQWtCcUIsb0JBQWxCLEVBQXdDO0FBQ3BDLGlCQUFPLGVBQWVBLG9CQUFvQixJQUFJMUIsWUFBeEIsSUFBd0MsRUFBdkQsSUFBNkQsR0FBN0QsSUFBb0VELGNBQWMsSUFBSUEsY0FBYyxDQUFDUixJQUFmLENBQW9CLEdBQXBCLENBQWxCLElBQThDLEVBQWxILElBQXdILFFBQXhILEdBQW1JVSxJQUFJLENBQUNWLElBQUwsQ0FBVSxNQUFWLENBQW5JLEdBQXVKLEtBQTlKO0FBQ0g7O0FBRURXLFFBQUFBLE9BQU8sQ0FBQ0csUUFBUixHQUFtQkEsUUFBbkI7QUFDQSxlQUFPSCxPQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFLQUosTUFBQUEsT0FBTyxDQUFDUSxPQUFSLEdBQWtCLEtBQWxCO0FBRUMsS0FyR08sRUFxR04sRUFyR00sQ0FuTWU7QUF3U2pCLE9BQUUsQ0FBQyxVQUFTeEQsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3pDOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJzRixZQUFqQjtBQUVBOzs7Ozs7O0FBTUEsZUFBU0EsWUFBVCxHQUF3QjtBQUVwQjs7Ozs7QUFLQSxhQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBT0FELE1BQUFBLFlBQVksQ0FBQ0UsU0FBYixDQUF1QkMsRUFBdkIsR0FBNEIsU0FBU0EsRUFBVCxDQUFZQyxHQUFaLEVBQWlCL0UsRUFBakIsRUFBcUJDLEdBQXJCLEVBQTBCO0FBQ2xELFNBQUMsS0FBSzJFLFVBQUwsQ0FBZ0JHLEdBQWhCLE1BQXlCLEtBQUtILFVBQUwsQ0FBZ0JHLEdBQWhCLElBQXVCLEVBQWhELENBQUQsRUFBc0Q1QyxJQUF0RCxDQUEyRDtBQUN2RG5DLFVBQUFBLEVBQUUsRUFBSUEsRUFEaUQ7QUFFdkRDLFVBQUFBLEdBQUcsRUFBR0EsR0FBRyxJQUFJO0FBRjBDLFNBQTNEO0FBSUEsZUFBTyxJQUFQO0FBQ0gsT0FORDtBQVFBOzs7Ozs7OztBQU1BMEUsTUFBQUEsWUFBWSxDQUFDRSxTQUFiLENBQXVCRyxHQUF2QixHQUE2QixTQUFTQSxHQUFULENBQWFELEdBQWIsRUFBa0IvRSxFQUFsQixFQUFzQjtBQUMvQyxZQUFJK0UsR0FBRyxLQUFLbkcsU0FBWixFQUNJLEtBQUtnRyxVQUFMLEdBQWtCLEVBQWxCLENBREosS0FFSztBQUNELGNBQUk1RSxFQUFFLEtBQUtwQixTQUFYLEVBQ0ksS0FBS2dHLFVBQUwsQ0FBZ0JHLEdBQWhCLElBQXVCLEVBQXZCLENBREosS0FFSztBQUNELGdCQUFJRSxTQUFTLEdBQUcsS0FBS0wsVUFBTCxDQUFnQkcsR0FBaEIsQ0FBaEI7O0FBQ0EsaUJBQUssSUFBSXRELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd3RCxTQUFTLENBQUM1RSxNQUE5QjtBQUNJLGtCQUFJNEUsU0FBUyxDQUFDeEQsQ0FBRCxDQUFULENBQWF6QixFQUFiLEtBQW9CQSxFQUF4QixFQUNJaUYsU0FBUyxDQUFDQyxNQUFWLENBQWlCekQsQ0FBakIsRUFBb0IsQ0FBcEIsRUFESixLQUdJLEVBQUVBLENBQUY7QUFKUjtBQUtIO0FBQ0o7QUFDRCxlQUFPLElBQVA7QUFDSCxPQWhCRDtBQWtCQTs7Ozs7Ozs7QUFNQWtELE1BQUFBLFlBQVksQ0FBQ0UsU0FBYixDQUF1Qk0sSUFBdkIsR0FBOEIsU0FBU0EsSUFBVCxDQUFjSixHQUFkLEVBQW1CO0FBQzdDLFlBQUlFLFNBQVMsR0FBRyxLQUFLTCxVQUFMLENBQWdCRyxHQUFoQixDQUFoQjs7QUFDQSxZQUFJRSxTQUFKLEVBQWU7QUFDWCxjQUFJRyxJQUFJLEdBQUcsRUFBWDtBQUFBLGNBQ0kzRCxDQUFDLEdBQUcsQ0FEUjs7QUFFQSxpQkFBT0EsQ0FBQyxHQUFHckIsU0FBUyxDQUFDQyxNQUFyQjtBQUNJK0UsWUFBQUEsSUFBSSxDQUFDakQsSUFBTCxDQUFVL0IsU0FBUyxDQUFDcUIsQ0FBQyxFQUFGLENBQW5CO0FBREo7O0FBRUEsZUFBS0EsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHd0QsU0FBUyxDQUFDNUUsTUFBMUI7QUFDSTRFLFlBQUFBLFNBQVMsQ0FBQ3hELENBQUQsQ0FBVCxDQUFhekIsRUFBYixDQUFnQmUsS0FBaEIsQ0FBc0JrRSxTQUFTLENBQUN4RCxDQUFDLEVBQUYsQ0FBVCxDQUFleEIsR0FBckMsRUFBMENtRixJQUExQztBQURKO0FBRUg7O0FBQ0QsZUFBTyxJQUFQO0FBQ0gsT0FYRDtBQWFDLEtBOUVPLEVBOEVOLEVBOUVNLENBeFNlO0FBc1hqQixPQUFFLENBQUMsVUFBU3RGLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUN6Qzs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCZ0csS0FBakI7O0FBRUEsVUFBSXRGLFNBQVMsR0FBR0QsT0FBTyxDQUFDLENBQUQsQ0FBdkI7QUFBQSxVQUNJd0YsT0FBTyxHQUFLeEYsT0FBTyxDQUFDLENBQUQsQ0FEdkI7O0FBR0EsVUFBSXlGLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBaEI7QUFFQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztBQVFBLGVBQVNELEtBQVQsQ0FBZUcsUUFBZixFQUF5QkMsT0FBekIsRUFBa0M1RSxRQUFsQyxFQUE0QztBQUN4QyxZQUFJLE9BQU80RSxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQy9CNUUsVUFBQUEsUUFBUSxHQUFHNEUsT0FBWDtBQUNBQSxVQUFBQSxPQUFPLEdBQUcsRUFBVjtBQUNILFNBSEQsTUFHTyxJQUFJLENBQUNBLE9BQUwsRUFDSEEsT0FBTyxHQUFHLEVBQVY7O0FBRUosWUFBSSxDQUFDNUUsUUFBTCxFQUNJLE9BQU9kLFNBQVMsQ0FBQ3NGLEtBQUQsRUFBUSxJQUFSLEVBQWNHLFFBQWQsRUFBd0JDLE9BQXhCLENBQWhCLENBUm9DLENBUWM7QUFFdEQ7O0FBQ0EsWUFBSSxDQUFDQSxPQUFPLENBQUNDLEdBQVQsSUFBZ0JILEVBQWhCLElBQXNCQSxFQUFFLENBQUNJLFFBQTdCLEVBQ0ksT0FBT0osRUFBRSxDQUFDSSxRQUFILENBQVlILFFBQVosRUFBc0IsU0FBU0kscUJBQVQsQ0FBK0I5RSxHQUEvQixFQUFvQytFLFFBQXBDLEVBQThDO0FBQ3ZFLGlCQUFPL0UsR0FBRyxJQUFJLE9BQU9nRixjQUFQLEtBQTBCLFdBQWpDLEdBQ0RULEtBQUssQ0FBQ0ssR0FBTixDQUFVRixRQUFWLEVBQW9CQyxPQUFwQixFQUE2QjVFLFFBQTdCLENBREMsR0FFREMsR0FBRyxHQUNIRCxRQUFRLENBQUNDLEdBQUQsQ0FETCxHQUVIRCxRQUFRLENBQUMsSUFBRCxFQUFPNEUsT0FBTyxDQUFDTSxNQUFSLEdBQWlCRixRQUFqQixHQUE0QkEsUUFBUSxDQUFDeEMsUUFBVCxDQUFrQixNQUFsQixDQUFuQyxDQUpkO0FBS0gsU0FOTSxDQUFQLENBWm9DLENBb0J4Qzs7QUFDQSxlQUFPZ0MsS0FBSyxDQUFDSyxHQUFOLENBQVVGLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCNUUsUUFBN0IsQ0FBUDtBQUNIOztBQUVELGVBQVNtRixNQUFULENBQWdCUixRQUFoQixFQUEwQkMsT0FBMUIsRUFBbUM1RSxRQUFuQyxFQUE2QztBQUN6QyxZQUFJLE9BQU80RSxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQy9CNUUsVUFBQUEsUUFBUSxHQUFHNEUsT0FBWDtBQUNBQSxVQUFBQSxPQUFPLEdBQUcsRUFBVjtBQUNILFNBSEQsTUFHTyxJQUFJLENBQUNBLE9BQUwsRUFDSEEsT0FBTyxHQUFHLEVBQVY7O0FBRUosWUFBSSxDQUFDNUUsUUFBTCxFQUNJLE9BQU9kLFNBQVMsQ0FBQ3NGLEtBQUQsRUFBUSxJQUFSLEVBQWNHLFFBQWQsRUFBd0JDLE9BQXhCLENBQWhCLENBUnFDLENBUWE7O0FBRXRELFlBQUksT0FBT1EsRUFBUCxLQUFjLFdBQWxCLEVBQStCO0FBQUM7QUFFNUIsY0FBSUEsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFBQztBQUNsQixnQkFBSUMsT0FBTyxHQUFHQyxHQUFHLENBQUNDLFNBQUosQ0FBY0MsaUJBQWQsQ0FBZ0NmLFFBQWhDLENBQWQsQ0FEaUIsQ0FFakI7O0FBQ0EsZ0JBQUdZLE9BQU8sS0FBSyxFQUFmLEVBQWtCO0FBQ2RILGNBQUFBLEVBQUUsQ0FBQ08sTUFBSCxDQUFVQyxPQUFWLENBQWtCakIsUUFBbEIsRUFBNEJTLEVBQUUsQ0FBQ1MsU0FBL0IsRUFBMEMsVUFBVUMsS0FBVixFQUFpQkMsTUFBakIsRUFBeUI7QUFDL0RYLGdCQUFBQSxFQUFFLENBQUN6QyxHQUFILENBQU8sWUFBWW1ELEtBQVosR0FBb0IsWUFBcEIsR0FBbUNDLE1BQW5DLEdBQTRDLFFBQTVDLEdBQXVELE9BQU9BLE1BQXJFOztBQUNBLG9CQUFJRCxLQUFKLEVBQVc7QUFDUDlGLGtCQUFBQSxRQUFRLENBQUMrQixLQUFLLENBQUMsWUFBWStELEtBQWIsQ0FBTixDQUFSO0FBQ0gsaUJBRkQsTUFFTztBQUNIO0FBQ0E5RixrQkFBQUEsUUFBUSxDQUFDLElBQUQsRUFBTytGLE1BQU0sQ0FBQ0MsSUFBZCxDQUFSLENBRkcsQ0FFeUI7QUFDL0I7QUFDSixlQVJEO0FBU0gsYUFWRCxNQVVPO0FBQ0hoRyxjQUFBQSxRQUFRLENBQUN1RixPQUFPLEtBQUssRUFBWixHQUFpQnhELEtBQUssQ0FBQzRDLFFBQVEsR0FBRyxZQUFaLENBQXRCLEdBQWtELElBQW5ELEVBQXlEWSxPQUF6RCxDQUFSO0FBQ0g7QUFDSixXQWhCRCxNQWdCTztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBSCxZQUFBQSxFQUFFLENBQUNPLE1BQUgsQ0FBVUMsT0FBVixDQUFrQmpCLFFBQWxCLEVBQTRCUyxFQUFFLENBQUNTLFNBQS9CLEVBQTBDLFVBQVVDLEtBQVYsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQy9EO0FBQ0Esa0JBQUlELEtBQUosRUFBVztBQUNQOUYsZ0JBQUFBLFFBQVEsQ0FBQytCLEtBQUssQ0FBQyxZQUFZK0QsS0FBYixDQUFOLENBQVI7QUFDSCxlQUZELE1BRU87QUFDSDtBQUNBOUYsZ0JBQUFBLFFBQVEsQ0FBQyxJQUFELEVBQU8rRixNQUFNLENBQUNDLElBQWQsQ0FBUixDQUZHLENBRXlCO0FBQy9CO0FBQ0osYUFSRCxFQVhHLENBb0JIO0FBQ0g7O0FBRUQ7QUFDSCxTQXBEd0MsQ0FzRHpDOzs7QUFDQSxZQUFJLENBQUNwQixPQUFPLENBQUNDLEdBQVQsSUFBZ0JILEVBQWhCLElBQXNCQSxFQUFFLENBQUNJLFFBQTdCLEVBQ0ksT0FBT0osRUFBRSxDQUFDSSxRQUFILENBQVlILFFBQVosRUFBc0IsU0FBU0kscUJBQVQsQ0FBK0I5RSxHQUEvQixFQUFvQytFLFFBQXBDLEVBQThDO0FBQ3ZFLGlCQUFPL0UsR0FBRyxJQUFJLE9BQU9nRixjQUFQLEtBQTBCLFdBQWpDLEdBQ0RULEtBQUssQ0FBQ0ssR0FBTixDQUFVRixRQUFWLEVBQW9CQyxPQUFwQixFQUE2QjVFLFFBQTdCLENBREMsR0FFREMsR0FBRyxHQUNDRCxRQUFRLENBQUNDLEdBQUQsQ0FEVCxHQUVDRCxRQUFRLENBQUMsSUFBRCxFQUFPNEUsT0FBTyxDQUFDTSxNQUFSLEdBQWlCRixRQUFqQixHQUE0QkEsUUFBUSxDQUFDeEMsUUFBVCxDQUFrQixNQUFsQixDQUFuQyxDQUpsQjtBQUtILFNBTk0sQ0FBUCxDQXhEcUMsQ0FnRXpDOztBQUNBLGVBQU9nQyxLQUFLLENBQUNLLEdBQU4sQ0FBVUYsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI1RSxRQUE3QixDQUFQO0FBQ0g7QUFJRDs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7OztBQUNBd0UsTUFBQUEsS0FBSyxDQUFDSyxHQUFOLEdBQVksU0FBU29CLFNBQVQsQ0FBbUJ0QixRQUFuQixFQUE2QkMsT0FBN0IsRUFBc0M1RSxRQUF0QyxFQUFnRDtBQUN4RCxZQUFJNkUsR0FBRyxHQUFHLElBQUlJLGNBQUosRUFBVjs7QUFDQUosUUFBQUEsR0FBRyxDQUFDcUI7QUFBbUI7QUFBdkIsVUFBZ0QsU0FBU0MsdUJBQVQsR0FBbUM7QUFFL0UsY0FBSXRCLEdBQUcsQ0FBQ3VCLFVBQUosS0FBbUIsQ0FBdkIsRUFDSSxPQUFPckksU0FBUCxDQUgyRSxDQUsvRTtBQUNBO0FBQ0E7O0FBQ0EsY0FBSThHLEdBQUcsQ0FBQ3dCLE1BQUosS0FBZSxDQUFmLElBQW9CeEIsR0FBRyxDQUFDd0IsTUFBSixLQUFlLEdBQXZDLEVBQ0ksT0FBT3JHLFFBQVEsQ0FBQytCLEtBQUssQ0FBQyxZQUFZOEMsR0FBRyxDQUFDd0IsTUFBakIsQ0FBTixDQUFmLENBVDJFLENBVy9FO0FBQ0E7O0FBQ0EsY0FBSXpCLE9BQU8sQ0FBQ00sTUFBWixFQUFvQjtBQUNoQixnQkFBSXBFLE1BQU0sR0FBRytELEdBQUcsQ0FBQ3lCLFFBQWpCOztBQUNBLGdCQUFJLENBQUN4RixNQUFMLEVBQWE7QUFDVEEsY0FBQUEsTUFBTSxHQUFHLEVBQVQ7O0FBQ0EsbUJBQUssSUFBSUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lFLEdBQUcsQ0FBQzBCLFlBQUosQ0FBaUIvRyxNQUFyQyxFQUE2QyxFQUFFb0IsQ0FBL0M7QUFDSUUsZ0JBQUFBLE1BQU0sQ0FBQ1EsSUFBUCxDQUFZdUQsR0FBRyxDQUFDMEIsWUFBSixDQUFpQnpFLFVBQWpCLENBQTRCbEIsQ0FBNUIsSUFBaUMsR0FBN0M7QUFESjtBQUVIOztBQUNELG1CQUFPWixRQUFRLENBQUMsSUFBRCxFQUFPLE9BQU93RyxVQUFQLEtBQXNCLFdBQXRCLEdBQW9DLElBQUlBLFVBQUosQ0FBZTFGLE1BQWYsQ0FBcEMsR0FBNkRBLE1BQXBFLENBQWY7QUFDSDs7QUFDRCxpQkFBT2QsUUFBUSxDQUFDLElBQUQsRUFBTzZFLEdBQUcsQ0FBQzBCLFlBQVgsQ0FBZjtBQUNILFNBdkJEOztBQXlCQSxZQUFJM0IsT0FBTyxDQUFDTSxNQUFaLEVBQW9CO0FBQ2hCO0FBQ0EsY0FBSSxzQkFBc0JMLEdBQTFCLEVBQ0lBLEdBQUcsQ0FBQzRCLGdCQUFKLENBQXFCLG9DQUFyQjtBQUNKNUIsVUFBQUEsR0FBRyxDQUFDNkIsWUFBSixHQUFtQixhQUFuQjtBQUNIOztBQUVEN0IsUUFBQUEsR0FBRyxDQUFDOEIsSUFBSixDQUFTLEtBQVQsRUFBZ0JoQyxRQUFoQjtBQUNBRSxRQUFBQSxHQUFHLENBQUMrQixJQUFKO0FBQ0gsT0FwQ0Q7QUFzQ0MsS0EzTE8sRUEyTE47QUFBQyxXQUFJLENBQUw7QUFBTyxXQUFJO0FBQVgsS0EzTE0sQ0F0WGU7QUFpakJOLE9BQUUsQ0FBQyxVQUFTM0gsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3BEOztBQUVBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJxSSxPQUFPLENBQUNBLE9BQUQsQ0FBeEI7QUFFQTs7Ozs7O0FBTUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7QUFDQSxlQUFTQSxPQUFULENBQWlCckksT0FBakIsRUFBMEI7QUFFdEI7QUFDQSxZQUFJLE9BQU9zSSxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDLENBQUMsWUFBVztBQUVqRCxjQUFJQyxHQUFHLEdBQUcsSUFBSUQsWUFBSixDQUFpQixDQUFFLENBQUMsQ0FBSCxDQUFqQixDQUFWO0FBQUEsY0FDSUUsR0FBRyxHQUFHLElBQUlSLFVBQUosQ0FBZU8sR0FBRyxDQUFDakcsTUFBbkIsQ0FEVjtBQUFBLGNBRUltRyxFQUFFLEdBQUlELEdBQUcsQ0FBQyxDQUFELENBQUgsS0FBVyxHQUZyQjs7QUFJQSxtQkFBU0Usa0JBQVQsQ0FBNEJDLEdBQTVCLEVBQWlDQyxHQUFqQyxFQUFzQ0MsR0FBdEMsRUFBMkM7QUFDdkNOLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBVDtBQUNBQyxZQUFBQSxHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0FJLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNIOztBQUVELG1CQUFTTSxrQkFBVCxDQUE0QkgsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQXNDQyxHQUF0QyxFQUEyQztBQUN2Q04sWUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTSSxHQUFUO0FBQ0FDLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0FJLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0g7QUFFRDs7O0FBQ0F4SSxVQUFBQSxPQUFPLENBQUMrSSxZQUFSLEdBQXVCTixFQUFFLEdBQUdDLGtCQUFILEdBQXdCSSxrQkFBakQ7QUFDQTs7QUFDQTlJLFVBQUFBLE9BQU8sQ0FBQ2dKLFlBQVIsR0FBdUJQLEVBQUUsR0FBR0ssa0JBQUgsR0FBd0JKLGtCQUFqRDs7QUFFQSxtQkFBU08saUJBQVQsQ0FBMkJMLEdBQTNCLEVBQWdDQyxHQUFoQyxFQUFxQztBQUNqQ0wsWUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTSSxHQUFHLENBQUNDLEdBQUQsQ0FBWjtBQUNBTCxZQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNJLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBWjtBQUNBTCxZQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNJLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBWjtBQUNBTCxZQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNJLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBWjtBQUNBLG1CQUFPTixHQUFHLENBQUMsQ0FBRCxDQUFWO0FBQ0g7O0FBRUQsbUJBQVNXLGlCQUFULENBQTJCTixHQUEzQixFQUFnQ0MsR0FBaEMsRUFBcUM7QUFDakNMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFELENBQVo7QUFDQUwsWUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTSSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQVo7QUFDQUwsWUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTSSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQVo7QUFDQUwsWUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTSSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQVo7QUFDQSxtQkFBT04sR0FBRyxDQUFDLENBQUQsQ0FBVjtBQUNIO0FBRUQ7OztBQUNBdkksVUFBQUEsT0FBTyxDQUFDbUosV0FBUixHQUFzQlYsRUFBRSxHQUFHUSxpQkFBSCxHQUF1QkMsaUJBQS9DO0FBQ0E7O0FBQ0FsSixVQUFBQSxPQUFPLENBQUNvSixXQUFSLEdBQXNCWCxFQUFFLEdBQUdTLGlCQUFILEdBQXVCRCxpQkFBL0MsQ0E5Q2lELENBZ0RyRDtBQUNDLFNBakR3QyxJQUF6QyxLQWlEVyxDQUFDLFlBQVc7QUFFbkIsbUJBQVNJLGtCQUFULENBQTRCQyxTQUE1QixFQUF1Q1gsR0FBdkMsRUFBNENDLEdBQTVDLEVBQWlEQyxHQUFqRCxFQUFzRDtBQUNsRCxnQkFBSVUsSUFBSSxHQUFHWixHQUFHLEdBQUcsQ0FBTixHQUFVLENBQVYsR0FBYyxDQUF6QjtBQUNBLGdCQUFJWSxJQUFKLEVBQ0laLEdBQUcsR0FBRyxDQUFDQSxHQUFQO0FBQ0osZ0JBQUlBLEdBQUcsS0FBSyxDQUFaLEVBQ0lXLFNBQVMsQ0FBQyxJQUFJWCxHQUFKLEdBQVUsQ0FBVjtBQUFjO0FBQWUsYUFBN0I7QUFBaUM7QUFBaUIsc0JBQW5ELEVBQStEQyxHQUEvRCxFQUFvRUMsR0FBcEUsQ0FBVCxDQURKLEtBRUssSUFBSVcsS0FBSyxDQUFDYixHQUFELENBQVQsRUFDRFcsU0FBUyxDQUFDLFVBQUQsRUFBYVYsR0FBYixFQUFrQkMsR0FBbEIsQ0FBVCxDQURDLEtBRUEsSUFBSUYsR0FBRyxHQUFHLHNCQUFWLEVBQWtDO0FBQ25DVyxjQUFBQSxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxJQUFJLEVBQVIsR0FBYSxVQUFkLE1BQThCLENBQS9CLEVBQWtDWCxHQUFsQyxFQUF1Q0MsR0FBdkMsQ0FBVCxDQURDLEtBRUEsSUFBSUYsR0FBRyxHQUFHLHNCQUFWLEVBQWtDO0FBQ25DVyxjQUFBQSxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxJQUFJLEVBQVIsR0FBYXZILElBQUksQ0FBQ3lILEtBQUwsQ0FBV2QsR0FBRyxHQUFHLHFCQUFqQixDQUFkLE1BQTJELENBQTVELEVBQStEQyxHQUEvRCxFQUFvRUMsR0FBcEUsQ0FBVCxDQURDLEtBRUE7QUFDRCxrQkFBSWEsUUFBUSxHQUFHMUgsSUFBSSxDQUFDa0QsS0FBTCxDQUFXbEQsSUFBSSxDQUFDbUMsR0FBTCxDQUFTd0UsR0FBVCxJQUFnQjNHLElBQUksQ0FBQzJILEdBQWhDLENBQWY7QUFBQSxrQkFDSUMsUUFBUSxHQUFHNUgsSUFBSSxDQUFDeUgsS0FBTCxDQUFXZCxHQUFHLEdBQUczRyxJQUFJLENBQUM2SCxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQUNILFFBQWIsQ0FBTixHQUErQixPQUExQyxJQUFxRCxPQURwRTtBQUVBSixjQUFBQSxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxJQUFJLEVBQVIsR0FBYUcsUUFBUSxHQUFHLEdBQVgsSUFBa0IsRUFBL0IsR0FBb0NFLFFBQXJDLE1BQW1ELENBQXBELEVBQXVEaEIsR0FBdkQsRUFBNERDLEdBQTVELENBQVQ7QUFDSDtBQUNKOztBQUVEN0ksVUFBQUEsT0FBTyxDQUFDK0ksWUFBUixHQUF1Qk0sa0JBQWtCLENBQUNTLElBQW5CLENBQXdCLElBQXhCLEVBQThCQyxXQUE5QixDQUF2QjtBQUNBL0osVUFBQUEsT0FBTyxDQUFDZ0osWUFBUixHQUF1Qkssa0JBQWtCLENBQUNTLElBQW5CLENBQXdCLElBQXhCLEVBQThCRSxXQUE5QixDQUF2Qjs7QUFFQSxtQkFBU0MsaUJBQVQsQ0FBMkJDLFFBQTNCLEVBQXFDdEIsR0FBckMsRUFBMENDLEdBQTFDLEVBQStDO0FBQzNDLGdCQUFJc0IsSUFBSSxHQUFHRCxRQUFRLENBQUN0QixHQUFELEVBQU1DLEdBQU4sQ0FBbkI7QUFBQSxnQkFDSVUsSUFBSSxHQUFHLENBQUNZLElBQUksSUFBSSxFQUFULElBQWUsQ0FBZixHQUFtQixDQUQ5QjtBQUFBLGdCQUVJVCxRQUFRLEdBQUdTLElBQUksS0FBSyxFQUFULEdBQWMsR0FGN0I7QUFBQSxnQkFHSVAsUUFBUSxHQUFHTyxJQUFJLEdBQUcsT0FIdEI7QUFJQSxtQkFBT1QsUUFBUSxLQUFLLEdBQWIsR0FDREUsUUFBUSxHQUNSUSxHQURRLEdBRVJiLElBQUksR0FBR2MsUUFITixHQUlEWCxRQUFRLEtBQUssQ0FBYixDQUFlO0FBQWYsY0FDQUgsSUFBSSxHQUFHLHFCQUFQLEdBQStCSyxRQUQvQixHQUVBTCxJQUFJLEdBQUd2SCxJQUFJLENBQUM2SCxHQUFMLENBQVMsQ0FBVCxFQUFZSCxRQUFRLEdBQUcsR0FBdkIsQ0FBUCxJQUFzQ0UsUUFBUSxHQUFHLE9BQWpELENBTk47QUFPSDs7QUFFRDVKLFVBQUFBLE9BQU8sQ0FBQ21KLFdBQVIsR0FBc0JjLGlCQUFpQixDQUFDSCxJQUFsQixDQUF1QixJQUF2QixFQUE2QlEsVUFBN0IsQ0FBdEI7QUFDQXRLLFVBQUFBLE9BQU8sQ0FBQ29KLFdBQVIsR0FBc0JhLGlCQUFpQixDQUFDSCxJQUFsQixDQUF1QixJQUF2QixFQUE2QlMsVUFBN0IsQ0FBdEI7QUFFSCxTQXpDVSxJQXBEVyxDQStGdEI7O0FBQ0EsWUFBSSxPQUFPQyxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDLENBQUMsWUFBVztBQUVqRCxjQUFJQyxHQUFHLEdBQUcsSUFBSUQsWUFBSixDQUFpQixDQUFDLENBQUMsQ0FBRixDQUFqQixDQUFWO0FBQUEsY0FDSWhDLEdBQUcsR0FBRyxJQUFJUixVQUFKLENBQWV5QyxHQUFHLENBQUNuSSxNQUFuQixDQURWO0FBQUEsY0FFSW1HLEVBQUUsR0FBSUQsR0FBRyxDQUFDLENBQUQsQ0FBSCxLQUFXLEdBRnJCOztBQUlBLG1CQUFTa0MsbUJBQVQsQ0FBNkIvQixHQUE3QixFQUFrQ0MsR0FBbEMsRUFBdUNDLEdBQXZDLEVBQTRDO0FBQ3hDNEIsWUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTOUIsR0FBVDtBQUNBQyxZQUFBQSxHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0FJLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0FJLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDSDs7QUFFRCxtQkFBU21DLG1CQUFULENBQTZCaEMsR0FBN0IsRUFBa0NDLEdBQWxDLEVBQXVDQyxHQUF2QyxFQUE0QztBQUN4QzRCLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBUzlCLEdBQVQ7QUFDQUMsWUFBQUEsR0FBRyxDQUFDQyxHQUFELENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0FJLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0FJLFlBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlTCxHQUFHLENBQUMsQ0FBRCxDQUFsQjtBQUNBSSxZQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZUwsR0FBRyxDQUFDLENBQUQsQ0FBbEI7QUFDQUksWUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVMLEdBQUcsQ0FBQyxDQUFELENBQWxCO0FBQ0g7QUFFRDs7O0FBQ0F4SSxVQUFBQSxPQUFPLENBQUM0SyxhQUFSLEdBQXdCbkMsRUFBRSxHQUFHaUMsbUJBQUgsR0FBeUJDLG1CQUFuRDtBQUNBOztBQUNBM0ssVUFBQUEsT0FBTyxDQUFDNkssYUFBUixHQUF3QnBDLEVBQUUsR0FBR2tDLG1CQUFILEdBQXlCRCxtQkFBbkQ7O0FBRUEsbUJBQVNJLGtCQUFULENBQTRCbEMsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQXNDO0FBQ2xDTCxZQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNJLEdBQUcsQ0FBQ0MsR0FBRCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0EsbUJBQU80QixHQUFHLENBQUMsQ0FBRCxDQUFWO0FBQ0g7O0FBRUQsbUJBQVNNLGtCQUFULENBQTRCbkMsR0FBNUIsRUFBaUNDLEdBQWpDLEVBQXNDO0FBQ2xDTCxZQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNJLEdBQUcsQ0FBQ0MsR0FBRCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0FMLFlBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0ksR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFaO0FBQ0EsbUJBQU80QixHQUFHLENBQUMsQ0FBRCxDQUFWO0FBQ0g7QUFFRDs7O0FBQ0F6SyxVQUFBQSxPQUFPLENBQUNnTCxZQUFSLEdBQXVCdkMsRUFBRSxHQUFHcUMsa0JBQUgsR0FBd0JDLGtCQUFqRDtBQUNBOztBQUNBL0ssVUFBQUEsT0FBTyxDQUFDaUwsWUFBUixHQUF1QnhDLEVBQUUsR0FBR3NDLGtCQUFILEdBQXdCRCxrQkFBakQsQ0E5RGlELENBZ0VyRDtBQUNDLFNBakV3QyxJQUF6QyxLQWlFVyxDQUFDLFlBQVc7QUFFbkIsbUJBQVNJLG1CQUFULENBQTZCNUIsU0FBN0IsRUFBd0M2QixJQUF4QyxFQUE4Q0MsSUFBOUMsRUFBb0R6QyxHQUFwRCxFQUF5REMsR0FBekQsRUFBOERDLEdBQTlELEVBQW1FO0FBQy9ELGdCQUFJVSxJQUFJLEdBQUdaLEdBQUcsR0FBRyxDQUFOLEdBQVUsQ0FBVixHQUFjLENBQXpCO0FBQ0EsZ0JBQUlZLElBQUosRUFDSVosR0FBRyxHQUFHLENBQUNBLEdBQVA7O0FBQ0osZ0JBQUlBLEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDWFcsY0FBQUEsU0FBUyxDQUFDLENBQUQsRUFBSVYsR0FBSixFQUFTQyxHQUFHLEdBQUdzQyxJQUFmLENBQVQ7QUFDQTdCLGNBQUFBLFNBQVMsQ0FBQyxJQUFJWCxHQUFKLEdBQVUsQ0FBVjtBQUFjO0FBQWUsZUFBN0I7QUFBaUM7QUFBaUIsd0JBQW5ELEVBQStEQyxHQUEvRCxFQUFvRUMsR0FBRyxHQUFHdUMsSUFBMUUsQ0FBVDtBQUNILGFBSEQsTUFHTyxJQUFJNUIsS0FBSyxDQUFDYixHQUFELENBQVQsRUFBZ0I7QUFDbkJXLGNBQUFBLFNBQVMsQ0FBQyxDQUFELEVBQUlWLEdBQUosRUFBU0MsR0FBRyxHQUFHc0MsSUFBZixDQUFUO0FBQ0E3QixjQUFBQSxTQUFTLENBQUMsVUFBRCxFQUFhVixHQUFiLEVBQWtCQyxHQUFHLEdBQUd1QyxJQUF4QixDQUFUO0FBQ0gsYUFITSxNQUdBLElBQUl6QyxHQUFHLEdBQUcsdUJBQVYsRUFBbUM7QUFBRTtBQUN4Q1csY0FBQUEsU0FBUyxDQUFDLENBQUQsRUFBSVYsR0FBSixFQUFTQyxHQUFHLEdBQUdzQyxJQUFmLENBQVQ7QUFDQTdCLGNBQUFBLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLElBQUksRUFBUixHQUFhLFVBQWQsTUFBOEIsQ0FBL0IsRUFBa0NYLEdBQWxDLEVBQXVDQyxHQUFHLEdBQUd1QyxJQUE3QyxDQUFUO0FBQ0gsYUFITSxNQUdBO0FBQ0gsa0JBQUl4QixRQUFKOztBQUNBLGtCQUFJakIsR0FBRyxHQUFHLHVCQUFWLEVBQW1DO0FBQUU7QUFDakNpQixnQkFBQUEsUUFBUSxHQUFHakIsR0FBRyxHQUFHLE1BQWpCO0FBQ0FXLGdCQUFBQSxTQUFTLENBQUNNLFFBQVEsS0FBSyxDQUFkLEVBQWlCaEIsR0FBakIsRUFBc0JDLEdBQUcsR0FBR3NDLElBQTVCLENBQVQ7QUFDQTdCLGdCQUFBQSxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxJQUFJLEVBQVIsR0FBYUssUUFBUSxHQUFHLFVBQXpCLE1BQXlDLENBQTFDLEVBQTZDaEIsR0FBN0MsRUFBa0RDLEdBQUcsR0FBR3VDLElBQXhELENBQVQ7QUFDSCxlQUpELE1BSU87QUFDSCxvQkFBSTFCLFFBQVEsR0FBRzFILElBQUksQ0FBQ2tELEtBQUwsQ0FBV2xELElBQUksQ0FBQ21DLEdBQUwsQ0FBU3dFLEdBQVQsSUFBZ0IzRyxJQUFJLENBQUMySCxHQUFoQyxDQUFmO0FBQ0Esb0JBQUlELFFBQVEsS0FBSyxJQUFqQixFQUNJQSxRQUFRLEdBQUcsSUFBWDtBQUNKRSxnQkFBQUEsUUFBUSxHQUFHakIsR0FBRyxHQUFHM0csSUFBSSxDQUFDNkgsR0FBTCxDQUFTLENBQVQsRUFBWSxDQUFDSCxRQUFiLENBQWpCO0FBQ0FKLGdCQUFBQSxTQUFTLENBQUNNLFFBQVEsR0FBRyxnQkFBWCxLQUFnQyxDQUFqQyxFQUFvQ2hCLEdBQXBDLEVBQXlDQyxHQUFHLEdBQUdzQyxJQUEvQyxDQUFUO0FBQ0E3QixnQkFBQUEsU0FBUyxDQUFDLENBQUNDLElBQUksSUFBSSxFQUFSLEdBQWFHLFFBQVEsR0FBRyxJQUFYLElBQW1CLEVBQWhDLEdBQXFDRSxRQUFRLEdBQUcsT0FBWCxHQUFxQixPQUEzRCxNQUF3RSxDQUF6RSxFQUE0RWhCLEdBQTVFLEVBQWlGQyxHQUFHLEdBQUd1QyxJQUF2RixDQUFUO0FBQ0g7QUFDSjtBQUNKOztBQUVEcEwsVUFBQUEsT0FBTyxDQUFDNEssYUFBUixHQUF3Qk0sbUJBQW1CLENBQUNwQixJQUFwQixDQUF5QixJQUF6QixFQUErQkMsV0FBL0IsRUFBNEMsQ0FBNUMsRUFBK0MsQ0FBL0MsQ0FBeEI7QUFDQS9KLFVBQUFBLE9BQU8sQ0FBQzZLLGFBQVIsR0FBd0JLLG1CQUFtQixDQUFDcEIsSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0JFLFdBQS9CLEVBQTRDLENBQTVDLEVBQStDLENBQS9DLENBQXhCOztBQUVBLG1CQUFTcUIsa0JBQVQsQ0FBNEJuQixRQUE1QixFQUFzQ2lCLElBQXRDLEVBQTRDQyxJQUE1QyxFQUFrRHhDLEdBQWxELEVBQXVEQyxHQUF2RCxFQUE0RDtBQUN4RCxnQkFBSXlDLEVBQUUsR0FBR3BCLFFBQVEsQ0FBQ3RCLEdBQUQsRUFBTUMsR0FBRyxHQUFHc0MsSUFBWixDQUFqQjtBQUFBLGdCQUNJSSxFQUFFLEdBQUdyQixRQUFRLENBQUN0QixHQUFELEVBQU1DLEdBQUcsR0FBR3VDLElBQVosQ0FEakI7QUFFQSxnQkFBSTdCLElBQUksR0FBRyxDQUFDZ0MsRUFBRSxJQUFJLEVBQVAsSUFBYSxDQUFiLEdBQWlCLENBQTVCO0FBQUEsZ0JBQ0k3QixRQUFRLEdBQUc2QixFQUFFLEtBQUssRUFBUCxHQUFZLElBRDNCO0FBQUEsZ0JBRUkzQixRQUFRLEdBQUcsY0FBYzJCLEVBQUUsR0FBRyxPQUFuQixJQUE4QkQsRUFGN0M7QUFHQSxtQkFBTzVCLFFBQVEsS0FBSyxJQUFiLEdBQ0RFLFFBQVEsR0FDUlEsR0FEUSxHQUVSYixJQUFJLEdBQUdjLFFBSE4sR0FJRFgsUUFBUSxLQUFLLENBQWIsQ0FBZTtBQUFmLGNBQ0FILElBQUksR0FBRyxNQUFQLEdBQWdCSyxRQURoQixHQUVBTCxJQUFJLEdBQUd2SCxJQUFJLENBQUM2SCxHQUFMLENBQVMsQ0FBVCxFQUFZSCxRQUFRLEdBQUcsSUFBdkIsQ0FBUCxJQUF1Q0UsUUFBUSxHQUFHLGdCQUFsRCxDQU5OO0FBT0g7O0FBRUQ1SixVQUFBQSxPQUFPLENBQUNnTCxZQUFSLEdBQXVCSyxrQkFBa0IsQ0FBQ3ZCLElBQW5CLENBQXdCLElBQXhCLEVBQThCUSxVQUE5QixFQUEwQyxDQUExQyxFQUE2QyxDQUE3QyxDQUF2QjtBQUNBdEssVUFBQUEsT0FBTyxDQUFDaUwsWUFBUixHQUF1Qkksa0JBQWtCLENBQUN2QixJQUFuQixDQUF3QixJQUF4QixFQUE4QlMsVUFBOUIsRUFBMEMsQ0FBMUMsRUFBNkMsQ0FBN0MsQ0FBdkI7QUFFSCxTQXJEVTtBQXVEWCxlQUFPdkssT0FBUDtBQUNILE9BalRtRCxDQW1UcEQ7OztBQUVBLGVBQVMrSixXQUFULENBQXFCcEIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQStCQyxHQUEvQixFQUFvQztBQUNoQ0QsUUFBQUEsR0FBRyxDQUFDQyxHQUFELENBQUgsR0FBZ0JGLEdBQUcsR0FBVSxHQUE3QjtBQUNBQyxRQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZ0JGLEdBQUcsS0FBSyxDQUFSLEdBQWEsR0FBN0I7QUFDQUMsUUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWdCRixHQUFHLEtBQUssRUFBUixHQUFhLEdBQTdCO0FBQ0FDLFFBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFnQkYsR0FBRyxLQUFLLEVBQXhCO0FBQ0g7O0FBRUQsZUFBU3FCLFdBQVQsQ0FBcUJyQixHQUFyQixFQUEwQkMsR0FBMUIsRUFBK0JDLEdBQS9CLEVBQW9DO0FBQ2hDRCxRQUFBQSxHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFnQkYsR0FBRyxLQUFLLEVBQXhCO0FBQ0FDLFFBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFnQkYsR0FBRyxLQUFLLEVBQVIsR0FBYSxHQUE3QjtBQUNBQyxRQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZ0JGLEdBQUcsS0FBSyxDQUFSLEdBQWEsR0FBN0I7QUFDQUMsUUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWdCRixHQUFHLEdBQVUsR0FBN0I7QUFDSDs7QUFFRCxlQUFTMkIsVUFBVCxDQUFvQjFCLEdBQXBCLEVBQXlCQyxHQUF6QixFQUE4QjtBQUMxQixlQUFPLENBQUNELEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQ0FELEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxJQUFnQixDQURoQixHQUVBRCxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsSUFBZ0IsRUFGaEIsR0FHQUQsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILElBQWdCLEVBSGpCLE1BR3lCLENBSGhDO0FBSUg7O0FBRUQsZUFBUzBCLFVBQVQsQ0FBb0IzQixHQUFwQixFQUF5QkMsR0FBekIsRUFBOEI7QUFDMUIsZUFBTyxDQUFDRCxHQUFHLENBQUNDLEdBQUQsQ0FBSCxJQUFnQixFQUFoQixHQUNBRCxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsSUFBZ0IsRUFEaEIsR0FFQUQsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILElBQWdCLENBRmhCLEdBR0FELEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FISixNQUdtQixDQUgxQjtBQUlIO0FBRUEsS0FqVmtCLEVBaVZqQixFQWpWaUIsQ0FqakJJO0FBazRCakIsT0FBRSxDQUFDLFVBQVNwSSxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDekM7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQmlHLE9BQWpCO0FBRUE7Ozs7Ozs7QUFNQSxlQUFTQSxPQUFULENBQWlCdUYsVUFBakIsRUFBNkI7QUFDekIsWUFBSTtBQUNBLGNBQUlDLEdBQUcsR0FBR0MsSUFBSSxDQUFDLFFBQVE3RyxPQUFSLENBQWdCLEdBQWhCLEVBQW9CLElBQXBCLENBQUQsQ0FBSixDQUFnQzJHLFVBQWhDLENBQVYsQ0FEQSxDQUN1RDs7QUFDdkQsY0FBSUMsR0FBRyxLQUFLQSxHQUFHLENBQUN6SyxNQUFKLElBQWNxRCxNQUFNLENBQUNDLElBQVAsQ0FBWW1ILEdBQVosRUFBaUJ6SyxNQUFwQyxDQUFQLEVBQ0ksT0FBT3lLLEdBQVA7QUFDUCxTQUpELENBSUUsT0FBT0UsQ0FBUCxFQUFVLENBQUUsQ0FMVyxDQUtWOzs7QUFDZixlQUFPLElBQVA7QUFDSDtBQUVBLEtBbkJPLEVBbUJOLEVBbkJNLENBbDRCZTtBQXE1QmpCLE9BQUUsQ0FBQyxVQUFTbEwsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3pDO0FBRUE7Ozs7OztBQUtBLFVBQUk0TCxJQUFJLEdBQUc1TCxPQUFYOztBQUVBLFVBQUk2TCxVQUFVO0FBQ2Q7Ozs7O0FBS0FELE1BQUFBLElBQUksQ0FBQ0MsVUFBTCxHQUFrQixTQUFTQSxVQUFULENBQW9CRCxJQUFwQixFQUEwQjtBQUN4QyxlQUFPLGVBQWVwSSxJQUFmLENBQW9Cb0ksSUFBcEIsQ0FBUDtBQUNILE9BUkQ7O0FBVUEsVUFBSUUsU0FBUztBQUNiOzs7OztBQUtBRixNQUFBQSxJQUFJLENBQUNFLFNBQUwsR0FBaUIsU0FBU0EsU0FBVCxDQUFtQkYsSUFBbkIsRUFBeUI7QUFDdENBLFFBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDL0csT0FBTCxDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFDS0EsT0FETCxDQUNhLFNBRGIsRUFDd0IsR0FEeEIsQ0FBUDtBQUVBLFlBQUlwQyxLQUFLLEdBQU1tSixJQUFJLENBQUNHLEtBQUwsQ0FBVyxHQUFYLENBQWY7QUFBQSxZQUNJQyxRQUFRLEdBQUdILFVBQVUsQ0FBQ0QsSUFBRCxDQUR6QjtBQUFBLFlBRUlLLE1BQU0sR0FBSyxFQUZmO0FBR0EsWUFBSUQsUUFBSixFQUNJQyxNQUFNLEdBQUd4SixLQUFLLENBQUN5SixLQUFOLEtBQWdCLEdBQXpCOztBQUNKLGFBQUssSUFBSTlKLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdLLEtBQUssQ0FBQ3pCLE1BQTFCLEdBQW1DO0FBQy9CLGNBQUl5QixLQUFLLENBQUNMLENBQUQsQ0FBTCxLQUFhLElBQWpCLEVBQXVCO0FBQ25CLGdCQUFJQSxDQUFDLEdBQUcsQ0FBSixJQUFTSyxLQUFLLENBQUNMLENBQUMsR0FBRyxDQUFMLENBQUwsS0FBaUIsSUFBOUIsRUFDSUssS0FBSyxDQUFDb0QsTUFBTixDQUFhLEVBQUV6RCxDQUFmLEVBQWtCLENBQWxCLEVBREosS0FFSyxJQUFJNEosUUFBSixFQUNEdkosS0FBSyxDQUFDb0QsTUFBTixDQUFhekQsQ0FBYixFQUFnQixDQUFoQixFQURDLEtBR0QsRUFBRUEsQ0FBRjtBQUNQLFdBUEQsTUFPTyxJQUFJSyxLQUFLLENBQUNMLENBQUQsQ0FBTCxLQUFhLEdBQWpCLEVBQ0hLLEtBQUssQ0FBQ29ELE1BQU4sQ0FBYXpELENBQWIsRUFBZ0IsQ0FBaEIsRUFERyxLQUdILEVBQUVBLENBQUY7QUFDUDs7QUFDRCxlQUFPNkosTUFBTSxHQUFHeEosS0FBSyxDQUFDUyxJQUFOLENBQVcsR0FBWCxDQUFoQjtBQUNILE9BNUJEO0FBOEJBOzs7Ozs7Ozs7QUFPQTBJLE1BQUFBLElBQUksQ0FBQ3RLLE9BQUwsR0FBZSxTQUFTQSxPQUFULENBQWlCNkssVUFBakIsRUFBNkJDLFdBQTdCLEVBQTBDQyxpQkFBMUMsRUFBNkQ7QUFDeEUsWUFBSSxDQUFDQSxpQkFBTCxFQUNJRCxXQUFXLEdBQUdOLFNBQVMsQ0FBQ00sV0FBRCxDQUF2QjtBQUNKLFlBQUlQLFVBQVUsQ0FBQ08sV0FBRCxDQUFkLEVBQ0ksT0FBT0EsV0FBUDtBQUNKLFlBQUksQ0FBQ0MsaUJBQUwsRUFDSUYsVUFBVSxHQUFHTCxTQUFTLENBQUNLLFVBQUQsQ0FBdEI7QUFDSixlQUFPLENBQUNBLFVBQVUsR0FBR0EsVUFBVSxDQUFDdEgsT0FBWCxDQUFtQixnQkFBbkIsRUFBcUMsRUFBckMsQ0FBZCxFQUF3RDdELE1BQXhELEdBQWlFOEssU0FBUyxDQUFDSyxVQUFVLEdBQUcsR0FBYixHQUFtQkMsV0FBcEIsQ0FBMUUsR0FBNkdBLFdBQXBIO0FBQ0gsT0FSRDtBQVVDLEtBbkVPLEVBbUVOLEVBbkVNLENBcjVCZTtBQXc5QmpCLE9BQUUsQ0FBQyxVQUFTM0wsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3pDOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJzTSxJQUFqQjtBQUVBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFTQSxlQUFTQSxJQUFULENBQWNDLEtBQWQsRUFBcUJ0SixLQUFyQixFQUE0QnVKLElBQTVCLEVBQWtDO0FBQzlCLFlBQUlDLElBQUksR0FBS0QsSUFBSSxJQUFJLElBQXJCO0FBQ0EsWUFBSUUsR0FBRyxHQUFNRCxJQUFJLEtBQUssQ0FBdEI7QUFDQSxZQUFJRSxJQUFJLEdBQUssSUFBYjtBQUNBLFlBQUkxTCxNQUFNLEdBQUd3TCxJQUFiO0FBQ0EsZUFBTyxTQUFTRyxVQUFULENBQW9CSixJQUFwQixFQUEwQjtBQUM3QixjQUFJQSxJQUFJLEdBQUcsQ0FBUCxJQUFZQSxJQUFJLEdBQUdFLEdBQXZCLEVBQ0ksT0FBT0gsS0FBSyxDQUFDQyxJQUFELENBQVo7O0FBQ0osY0FBSXZMLE1BQU0sR0FBR3VMLElBQVQsR0FBZ0JDLElBQXBCLEVBQTBCO0FBQ3RCRSxZQUFBQSxJQUFJLEdBQUdKLEtBQUssQ0FBQ0UsSUFBRCxDQUFaO0FBQ0F4TCxZQUFBQSxNQUFNLEdBQUcsQ0FBVDtBQUNIOztBQUNELGNBQUkySCxHQUFHLEdBQUczRixLQUFLLENBQUNsRCxJQUFOLENBQVc0TSxJQUFYLEVBQWlCMUwsTUFBakIsRUFBeUJBLE1BQU0sSUFBSXVMLElBQW5DLENBQVY7QUFDQSxjQUFJdkwsTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDWkEsWUFBQUEsTUFBTSxHQUFHLENBQUNBLE1BQU0sR0FBRyxDQUFWLElBQWUsQ0FBeEI7QUFDSixpQkFBTzJILEdBQVA7QUFDSCxTQVhEO0FBWUg7QUFFQSxLQWxETyxFQWtETixFQWxETSxDQXg5QmU7QUEwZ0NqQixRQUFHLENBQUMsVUFBU25JLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUMxQztBQUVBOzs7Ozs7QUFLQSxVQUFJNk0sSUFBSSxHQUFHN00sT0FBWDtBQUVBOzs7Ozs7QUFLQTZNLE1BQUFBLElBQUksQ0FBQzdMLE1BQUwsR0FBYyxTQUFTOEwsV0FBVCxDQUFxQmxMLE1BQXJCLEVBQTZCO0FBQ3ZDLFlBQUltTCxHQUFHLEdBQUcsQ0FBVjtBQUFBLFlBQ0kxSixDQUFDLEdBQUcsQ0FEUjs7QUFFQSxhQUFLLElBQUlqQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUixNQUFNLENBQUNaLE1BQTNCLEVBQW1DLEVBQUVvQixDQUFyQyxFQUF3QztBQUNwQ2lCLFVBQUFBLENBQUMsR0FBR3pCLE1BQU0sQ0FBQzBCLFVBQVAsQ0FBa0JsQixDQUFsQixDQUFKO0FBQ0EsY0FBSWlCLENBQUMsR0FBRyxHQUFSLEVBQ0kwSixHQUFHLElBQUksQ0FBUCxDQURKLEtBRUssSUFBSTFKLENBQUMsR0FBRyxJQUFSLEVBQ0QwSixHQUFHLElBQUksQ0FBUCxDQURDLEtBRUEsSUFBSSxDQUFDMUosQ0FBQyxHQUFHLE1BQUwsTUFBaUIsTUFBakIsSUFBMkIsQ0FBQ3pCLE1BQU0sQ0FBQzBCLFVBQVAsQ0FBa0JsQixDQUFDLEdBQUcsQ0FBdEIsSUFBMkIsTUFBNUIsTUFBd0MsTUFBdkUsRUFBK0U7QUFDaEYsY0FBRUEsQ0FBRjtBQUNBMkssWUFBQUEsR0FBRyxJQUFJLENBQVA7QUFDSCxXQUhJLE1BSURBLEdBQUcsSUFBSSxDQUFQO0FBQ1A7O0FBQ0QsZUFBT0EsR0FBUDtBQUNILE9BaEJEO0FBa0JBOzs7Ozs7Ozs7QUFPQUYsTUFBQUEsSUFBSSxDQUFDRyxJQUFMLEdBQVksU0FBU0MsU0FBVCxDQUFtQjNLLE1BQW5CLEVBQTJCQyxLQUEzQixFQUFrQ0MsR0FBbEMsRUFBdUM7QUFDL0MsWUFBSXVLLEdBQUcsR0FBR3ZLLEdBQUcsR0FBR0QsS0FBaEI7QUFDQSxZQUFJd0ssR0FBRyxHQUFHLENBQVYsRUFDSSxPQUFPLEVBQVA7QUFDSixZQUFJdEssS0FBSyxHQUFHLElBQVo7QUFBQSxZQUNJQyxLQUFLLEdBQUcsRUFEWjtBQUFBLFlBRUlOLENBQUMsR0FBRyxDQUZSO0FBQUEsWUFFVztBQUNQUSxRQUFBQSxDQUhKLENBSitDLENBT3BDOztBQUNYLGVBQU9MLEtBQUssR0FBR0MsR0FBZixFQUFvQjtBQUNoQkksVUFBQUEsQ0FBQyxHQUFHTixNQUFNLENBQUNDLEtBQUssRUFBTixDQUFWO0FBQ0EsY0FBSUssQ0FBQyxHQUFHLEdBQVIsRUFDSUYsS0FBSyxDQUFDTixDQUFDLEVBQUYsQ0FBTCxHQUFhUSxDQUFiLENBREosS0FFSyxJQUFJQSxDQUFDLEdBQUcsR0FBSixJQUFXQSxDQUFDLEdBQUcsR0FBbkIsRUFDREYsS0FBSyxDQUFDTixDQUFDLEVBQUYsQ0FBTCxHQUFhLENBQUNRLENBQUMsR0FBRyxFQUFMLEtBQVksQ0FBWixHQUFnQk4sTUFBTSxDQUFDQyxLQUFLLEVBQU4sQ0FBTixHQUFrQixFQUEvQyxDQURDLEtBRUEsSUFBSUssQ0FBQyxHQUFHLEdBQUosSUFBV0EsQ0FBQyxHQUFHLEdBQW5CLEVBQXdCO0FBQ3pCQSxZQUFBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsQ0FBTCxLQUFXLEVBQVgsR0FBZ0IsQ0FBQ04sTUFBTSxDQUFDQyxLQUFLLEVBQU4sQ0FBTixHQUFrQixFQUFuQixLQUEwQixFQUExQyxHQUErQyxDQUFDRCxNQUFNLENBQUNDLEtBQUssRUFBTixDQUFOLEdBQWtCLEVBQW5CLEtBQTBCLENBQXpFLEdBQTZFRCxNQUFNLENBQUNDLEtBQUssRUFBTixDQUFOLEdBQWtCLEVBQWhHLElBQXNHLE9BQTFHO0FBQ0FHLFlBQUFBLEtBQUssQ0FBQ04sQ0FBQyxFQUFGLENBQUwsR0FBYSxVQUFVUSxDQUFDLElBQUksRUFBZixDQUFiO0FBQ0FGLFlBQUFBLEtBQUssQ0FBQ04sQ0FBQyxFQUFGLENBQUwsR0FBYSxVQUFVUSxDQUFDLEdBQUcsSUFBZCxDQUFiO0FBQ0gsV0FKSSxNQUtERixLQUFLLENBQUNOLENBQUMsRUFBRixDQUFMLEdBQWEsQ0FBQ1EsQ0FBQyxHQUFHLEVBQUwsS0FBWSxFQUFaLEdBQWlCLENBQUNOLE1BQU0sQ0FBQ0MsS0FBSyxFQUFOLENBQU4sR0FBa0IsRUFBbkIsS0FBMEIsQ0FBM0MsR0FBK0NELE1BQU0sQ0FBQ0MsS0FBSyxFQUFOLENBQU4sR0FBa0IsRUFBOUU7O0FBQ0osY0FBSUgsQ0FBQyxHQUFHLElBQVIsRUFBYztBQUNWLGFBQUNLLEtBQUssS0FBS0EsS0FBSyxHQUFHLEVBQWIsQ0FBTixFQUF3QkssSUFBeEIsQ0FBNkJDLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnRCLEtBQXBCLENBQTBCcUIsTUFBMUIsRUFBa0NMLEtBQWxDLENBQTdCO0FBQ0FOLFlBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0g7QUFDSjs7QUFDRCxZQUFJSyxLQUFKLEVBQVc7QUFDUCxjQUFJTCxDQUFKLEVBQ0lLLEtBQUssQ0FBQ0ssSUFBTixDQUFXQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0J0QixLQUFwQixDQUEwQnFCLE1BQTFCLEVBQWtDTCxLQUFLLENBQUNPLEtBQU4sQ0FBWSxDQUFaLEVBQWViLENBQWYsQ0FBbEMsQ0FBWDtBQUNKLGlCQUFPSyxLQUFLLENBQUNTLElBQU4sQ0FBVyxFQUFYLENBQVA7QUFDSDs7QUFDRCxlQUFPSCxNQUFNLENBQUNDLFlBQVAsQ0FBb0J0QixLQUFwQixDQUEwQnFCLE1BQTFCLEVBQWtDTCxLQUFLLENBQUNPLEtBQU4sQ0FBWSxDQUFaLEVBQWViLENBQWYsQ0FBbEMsQ0FBUDtBQUNILE9BL0JEO0FBaUNBOzs7Ozs7Ozs7QUFPQXlLLE1BQUFBLElBQUksQ0FBQ0ssS0FBTCxHQUFhLFNBQVNDLFVBQVQsQ0FBb0J2TCxNQUFwQixFQUE0QlUsTUFBNUIsRUFBb0NyQixNQUFwQyxFQUE0QztBQUNyRCxZQUFJc0IsS0FBSyxHQUFHdEIsTUFBWjtBQUFBLFlBQ0ltTSxFQURKO0FBQUEsWUFDUTtBQUNKQyxRQUFBQSxFQUZKLENBRHFELENBRzdDOztBQUNSLGFBQUssSUFBSWpMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLE1BQU0sQ0FBQ1osTUFBM0IsRUFBbUMsRUFBRW9CLENBQXJDLEVBQXdDO0FBQ3BDZ0wsVUFBQUEsRUFBRSxHQUFHeEwsTUFBTSxDQUFDMEIsVUFBUCxDQUFrQmxCLENBQWxCLENBQUw7O0FBQ0EsY0FBSWdMLEVBQUUsR0FBRyxHQUFULEVBQWM7QUFDVjlLLFlBQUFBLE1BQU0sQ0FBQ3JCLE1BQU0sRUFBUCxDQUFOLEdBQW1CbU0sRUFBbkI7QUFDSCxXQUZELE1BRU8sSUFBSUEsRUFBRSxHQUFHLElBQVQsRUFBZTtBQUNsQjlLLFlBQUFBLE1BQU0sQ0FBQ3JCLE1BQU0sRUFBUCxDQUFOLEdBQW1CbU0sRUFBRSxJQUFJLENBQU4sR0FBZ0IsR0FBbkM7QUFDQTlLLFlBQUFBLE1BQU0sQ0FBQ3JCLE1BQU0sRUFBUCxDQUFOLEdBQW1CbU0sRUFBRSxHQUFTLEVBQVgsR0FBZ0IsR0FBbkM7QUFDSCxXQUhNLE1BR0EsSUFBSSxDQUFDQSxFQUFFLEdBQUcsTUFBTixNQUFrQixNQUFsQixJQUE0QixDQUFDLENBQUNDLEVBQUUsR0FBR3pMLE1BQU0sQ0FBQzBCLFVBQVAsQ0FBa0JsQixDQUFDLEdBQUcsQ0FBdEIsQ0FBTixJQUFrQyxNQUFuQyxNQUErQyxNQUEvRSxFQUF1RjtBQUMxRmdMLFlBQUFBLEVBQUUsR0FBRyxXQUFXLENBQUNBLEVBQUUsR0FBRyxNQUFOLEtBQWlCLEVBQTVCLEtBQW1DQyxFQUFFLEdBQUcsTUFBeEMsQ0FBTDtBQUNBLGNBQUVqTCxDQUFGO0FBQ0FFLFlBQUFBLE1BQU0sQ0FBQ3JCLE1BQU0sRUFBUCxDQUFOLEdBQW1CbU0sRUFBRSxJQUFJLEVBQU4sR0FBZ0IsR0FBbkM7QUFDQTlLLFlBQUFBLE1BQU0sQ0FBQ3JCLE1BQU0sRUFBUCxDQUFOLEdBQW1CbU0sRUFBRSxJQUFJLEVBQU4sR0FBVyxFQUFYLEdBQWdCLEdBQW5DO0FBQ0E5SyxZQUFBQSxNQUFNLENBQUNyQixNQUFNLEVBQVAsQ0FBTixHQUFtQm1NLEVBQUUsSUFBSSxDQUFOLEdBQVcsRUFBWCxHQUFnQixHQUFuQztBQUNBOUssWUFBQUEsTUFBTSxDQUFDckIsTUFBTSxFQUFQLENBQU4sR0FBbUJtTSxFQUFFLEdBQVMsRUFBWCxHQUFnQixHQUFuQztBQUNILFdBUE0sTUFPQTtBQUNIOUssWUFBQUEsTUFBTSxDQUFDckIsTUFBTSxFQUFQLENBQU4sR0FBbUJtTSxFQUFFLElBQUksRUFBTixHQUFnQixHQUFuQztBQUNBOUssWUFBQUEsTUFBTSxDQUFDckIsTUFBTSxFQUFQLENBQU4sR0FBbUJtTSxFQUFFLElBQUksQ0FBTixHQUFXLEVBQVgsR0FBZ0IsR0FBbkM7QUFDQTlLLFlBQUFBLE1BQU0sQ0FBQ3JCLE1BQU0sRUFBUCxDQUFOLEdBQW1CbU0sRUFBRSxHQUFTLEVBQVgsR0FBZ0IsR0FBbkM7QUFDSDtBQUNKOztBQUNELGVBQU9uTSxNQUFNLEdBQUdzQixLQUFoQjtBQUNILE9BekJEO0FBMkJDLEtBM0dRLEVBMkdQLEVBM0dPLENBMWdDYztBQXFuQ2pCLFFBQUcsQ0FBQyxVQUFTOUIsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQzFDOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJzTixNQUFqQjtBQUVBLFVBQUlDLFFBQVEsR0FBRyxPQUFmO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxlQUFTRCxNQUFULENBQWdCek4sSUFBaEIsRUFBc0IyTixJQUF0QixFQUE0QjtBQUN4QixZQUFJLENBQUNELFFBQVEsQ0FBQy9KLElBQVQsQ0FBYzNELElBQWQsQ0FBTCxFQUEwQjtBQUN0QkEsVUFBQUEsSUFBSSxHQUFHLHFCQUFxQkEsSUFBckIsR0FBNEIsUUFBbkM7QUFDQTJOLFVBQUFBLElBQUksR0FBRztBQUFFQyxZQUFBQSxNQUFNLEVBQUU7QUFBRUMsY0FBQUEsTUFBTSxFQUFFO0FBQUVELGdCQUFBQSxNQUFNLEVBQUU7QUFBRXhOLGtCQUFBQSxRQUFRLEVBQUU7QUFBRXdOLG9CQUFBQSxNQUFNLEVBQUVEO0FBQVY7QUFBWjtBQUFWO0FBQVY7QUFBVixXQUFQO0FBQ0g7O0FBQ0RGLFFBQUFBLE1BQU0sQ0FBQ3pOLElBQUQsQ0FBTixHQUFlMk4sSUFBZjtBQUNILE9BaEN5QyxDQWtDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFGLE1BQUFBLE1BQU0sQ0FBQyxLQUFELEVBQVE7QUFFVjs7Ozs7Ozs7QUFRQUssUUFBQUEsR0FBRyxFQUFFO0FBQ0RDLFVBQUFBLE1BQU0sRUFBRTtBQUNKQyxZQUFBQSxRQUFRLEVBQUU7QUFDTkMsY0FBQUEsSUFBSSxFQUFFLFFBREE7QUFFTkMsY0FBQUEsRUFBRSxFQUFFO0FBRkUsYUFETjtBQUtKL0ksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsT0FESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQUxIO0FBRFA7QUFWSyxPQUFSLENBQU47QUF3QkEsVUFBSUMsUUFBSjtBQUVBVixNQUFBQSxNQUFNLENBQUMsVUFBRCxFQUFhO0FBRWY7Ozs7Ozs7O0FBUUFXLFFBQUFBLFFBQVEsRUFBRUQsUUFBUSxHQUFHO0FBQ2pCSixVQUFBQSxNQUFNLEVBQUU7QUFDSk0sWUFBQUEsT0FBTyxFQUFFO0FBQ0xKLGNBQUFBLElBQUksRUFBRSxPQUREO0FBRUxDLGNBQUFBLEVBQUUsRUFBRTtBQUZDLGFBREw7QUFLSkksWUFBQUEsS0FBSyxFQUFFO0FBQ0hMLGNBQUFBLElBQUksRUFBRSxPQURIO0FBRUhDLGNBQUFBLEVBQUUsRUFBRTtBQUZEO0FBTEg7QUFEUztBQVZOLE9BQWIsQ0FBTjtBQXdCQVQsTUFBQUEsTUFBTSxDQUFDLFdBQUQsRUFBYztBQUVoQjs7Ozs7Ozs7QUFRQWMsUUFBQUEsU0FBUyxFQUFFSjtBQVZLLE9BQWQsQ0FBTjtBQWFBVixNQUFBQSxNQUFNLENBQUMsT0FBRCxFQUFVO0FBRVo7Ozs7O0FBS0FlLFFBQUFBLEtBQUssRUFBRTtBQUNIVCxVQUFBQSxNQUFNLEVBQUU7QUFETDtBQVBLLE9BQVYsQ0FBTjtBQVlBTixNQUFBQSxNQUFNLENBQUMsUUFBRCxFQUFXO0FBRWI7Ozs7Ozs7QUFPQWdCLFFBQUFBLE1BQU0sRUFBRTtBQUNKVixVQUFBQSxNQUFNLEVBQUU7QUFDSkEsWUFBQUEsTUFBTSxFQUFFO0FBQ0pXLGNBQUFBLE9BQU8sRUFBRSxRQURMO0FBRUpULGNBQUFBLElBQUksRUFBRSxPQUZGO0FBR0pDLGNBQUFBLEVBQUUsRUFBRTtBQUhBO0FBREo7QUFESixTQVRLOztBQW1CYjs7Ozs7Ozs7Ozs7OztBQWFBUyxRQUFBQSxLQUFLLEVBQUU7QUFDSEMsVUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFlBQUFBLElBQUksRUFBRTtBQUNGQyxjQUFBQSxLQUFLLEVBQUUsQ0FDSCxXQURHLEVBRUgsYUFGRyxFQUdILGFBSEcsRUFJSCxXQUpHLEVBS0gsYUFMRyxFQU1ILFdBTkc7QUFETDtBQURGLFdBREw7QUFhSGYsVUFBQUEsTUFBTSxFQUFFO0FBQ0pnQixZQUFBQSxTQUFTLEVBQUU7QUFDUGQsY0FBQUEsSUFBSSxFQUFFLFdBREM7QUFFUEMsY0FBQUEsRUFBRSxFQUFFO0FBRkcsYUFEUDtBQUtKYyxZQUFBQSxXQUFXLEVBQUU7QUFDVGYsY0FBQUEsSUFBSSxFQUFFLFFBREc7QUFFVEMsY0FBQUEsRUFBRSxFQUFFO0FBRkssYUFMVDtBQVNKZSxZQUFBQSxXQUFXLEVBQUU7QUFDVGhCLGNBQUFBLElBQUksRUFBRSxRQURHO0FBRVRDLGNBQUFBLEVBQUUsRUFBRTtBQUZLLGFBVFQ7QUFhSmdCLFlBQUFBLFNBQVMsRUFBRTtBQUNQakIsY0FBQUEsSUFBSSxFQUFFLE1BREM7QUFFUEMsY0FBQUEsRUFBRSxFQUFFO0FBRkcsYUFiUDtBQWlCSmlCLFlBQUFBLFdBQVcsRUFBRTtBQUNUbEIsY0FBQUEsSUFBSSxFQUFFLFFBREc7QUFFVEMsY0FBQUEsRUFBRSxFQUFFO0FBRkssYUFqQlQ7QUFxQkprQixZQUFBQSxTQUFTLEVBQUU7QUFDUG5CLGNBQUFBLElBQUksRUFBRSxXQURDO0FBRVBDLGNBQUFBLEVBQUUsRUFBRTtBQUZHO0FBckJQO0FBYkwsU0FoQ007QUF5RWJtQixRQUFBQSxTQUFTLEVBQUU7QUFDUEMsVUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFlBQUFBLFVBQVUsRUFBRTtBQURSO0FBREQsU0F6RUU7O0FBK0ViOzs7Ozs7O0FBT0FDLFFBQUFBLFNBQVMsRUFBRTtBQUNQekIsVUFBQUEsTUFBTSxFQUFFO0FBQ0p1QixZQUFBQSxNQUFNLEVBQUU7QUFDSkcsY0FBQUEsSUFBSSxFQUFFLFVBREY7QUFFSnhCLGNBQUFBLElBQUksRUFBRSxPQUZGO0FBR0pDLGNBQUFBLEVBQUUsRUFBRTtBQUhBO0FBREo7QUFERDtBQXRGRSxPQUFYLENBQU47QUFpR0FULE1BQUFBLE1BQU0sQ0FBQyxVQUFELEVBQWE7QUFFZjs7Ozs7OztBQU9BaUMsUUFBQUEsV0FBVyxFQUFFO0FBQ1QzQixVQUFBQSxNQUFNLEVBQUU7QUFDSjVJLFlBQUFBLEtBQUssRUFBRTtBQUNIOEksY0FBQUEsSUFBSSxFQUFFLFFBREg7QUFFSEMsY0FBQUEsRUFBRSxFQUFFO0FBRkQ7QUFESDtBQURDLFNBVEU7O0FBa0JmOzs7Ozs7O0FBT0F5QixRQUFBQSxVQUFVLEVBQUU7QUFDUjVCLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsT0FESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREEsU0F6Qkc7O0FBa0NmOzs7Ozs7O0FBT0EwQixRQUFBQSxVQUFVLEVBQUU7QUFDUjdCLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsT0FESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREEsU0F6Q0c7O0FBa0RmOzs7Ozs7O0FBT0EyQixRQUFBQSxXQUFXLEVBQUU7QUFDVDlCLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsUUFESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREMsU0F6REU7O0FBa0VmOzs7Ozs7O0FBT0E0QixRQUFBQSxVQUFVLEVBQUU7QUFDUi9CLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsT0FESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREEsU0F6RUc7O0FBa0ZmOzs7Ozs7O0FBT0E2QixRQUFBQSxXQUFXLEVBQUU7QUFDVGhDLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsUUFESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREMsU0F6RkU7O0FBa0dmOzs7Ozs7O0FBT0E4QixRQUFBQSxTQUFTLEVBQUU7QUFDUGpDLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsTUFESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREQsU0F6R0k7O0FBa0hmOzs7Ozs7O0FBT0ErQixRQUFBQSxXQUFXLEVBQUU7QUFDVGxDLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsUUFESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREMsU0F6SEU7O0FBa0lmOzs7Ozs7O0FBT0FnQyxRQUFBQSxVQUFVLEVBQUU7QUFDUm5DLFVBQUFBLE1BQU0sRUFBRTtBQUNKNUksWUFBQUEsS0FBSyxFQUFFO0FBQ0g4SSxjQUFBQSxJQUFJLEVBQUUsT0FESDtBQUVIQyxjQUFBQSxFQUFFLEVBQUU7QUFGRDtBQURIO0FBREE7QUF6SUcsT0FBYixDQUFOO0FBbUpBVCxNQUFBQSxNQUFNLENBQUMsWUFBRCxFQUFlO0FBRWpCOzs7Ozs7O0FBT0EwQyxRQUFBQSxTQUFTLEVBQUU7QUFDUHBDLFVBQUFBLE1BQU0sRUFBRTtBQUNKcUMsWUFBQUEsS0FBSyxFQUFFO0FBQ0hYLGNBQUFBLElBQUksRUFBRSxVQURIO0FBRUh4QixjQUFBQSxJQUFJLEVBQUUsUUFGSDtBQUdIQyxjQUFBQSxFQUFFLEVBQUU7QUFIRDtBQURIO0FBREQ7QUFUTSxPQUFmLENBQU47QUFvQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQVQsTUFBQUEsTUFBTSxDQUFDNEMsR0FBUCxHQUFhLFNBQVNBLEdBQVQsQ0FBYUMsSUFBYixFQUFtQjtBQUM1QixlQUFPN0MsTUFBTSxDQUFDNkMsSUFBRCxDQUFOLElBQWdCLElBQXZCO0FBQ0gsT0FGRDtBQUlDLEtBalpRLEVBaVpQLEVBalpPLENBcm5DYztBQXNnRGpCLFFBQUcsQ0FBQyxVQUFTMVAsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQzFDO0FBQ0E7Ozs7O0FBSUEsVUFBSW9RLFNBQVMsR0FBR3BRLE9BQWhCOztBQUVBLFVBQUlxUSxJQUFJLEdBQUc1UCxPQUFPLENBQUMsRUFBRCxDQUFsQjtBQUFBLFVBQ0lILElBQUksR0FBR0csT0FBTyxDQUFDLEVBQUQsQ0FEbEI7QUFHQTs7Ozs7Ozs7Ozs7QUFTQSxlQUFTNlAsMEJBQVQsQ0FBb0NDLEdBQXBDLEVBQXlDQyxLQUF6QyxFQUFnREMsVUFBaEQsRUFBNERDLElBQTVELEVBQWtFO0FBQzlEO0FBQ0EsWUFBSUYsS0FBSyxDQUFDRyxZQUFWLEVBQXdCO0FBQ3BCLGNBQUlILEtBQUssQ0FBQ0csWUFBTixZQUE4Qk4sSUFBbEMsRUFBd0M7QUFBRUUsWUFBQUEsR0FBRyxDQUN4QyxjQUR3QyxFQUN4QkcsSUFEd0IsQ0FBSDs7QUFFdEMsaUJBQUssSUFBSXZCLE1BQU0sR0FBR3FCLEtBQUssQ0FBQ0csWUFBTixDQUFtQnhCLE1BQWhDLEVBQXdDN0ssSUFBSSxHQUFHRCxNQUFNLENBQUNDLElBQVAsQ0FBWTZLLE1BQVosQ0FBL0MsRUFBb0UvTSxDQUFDLEdBQUcsQ0FBN0UsRUFBZ0ZBLENBQUMsR0FBR2tDLElBQUksQ0FBQ3RELE1BQXpGLEVBQWlHLEVBQUVvQixDQUFuRyxFQUFzRztBQUNsRyxrQkFBSW9PLEtBQUssQ0FBQ0ksUUFBTixJQUFrQnpCLE1BQU0sQ0FBQzdLLElBQUksQ0FBQ2xDLENBQUQsQ0FBTCxDQUFOLEtBQW9Cb08sS0FBSyxDQUFDSyxXQUFoRCxFQUE2RE4sR0FBRyxDQUMvRCxVQUQrRCxDQUFIO0FBRTdEQSxjQUFBQSxHQUFHLENBQ0YsU0FERSxFQUNTak0sSUFBSSxDQUFDbEMsQ0FBRCxDQURiLENBQUgsQ0FFQyxVQUZELEVBRWErTSxNQUFNLENBQUM3SyxJQUFJLENBQUNsQyxDQUFELENBQUwsQ0FGbkIsRUFHSyxRQUhMLEVBR2VzTyxJQUhmLEVBR3FCdkIsTUFBTSxDQUFDN0ssSUFBSSxDQUFDbEMsQ0FBRCxDQUFMLENBSDNCLEVBSUssT0FKTDtBQUtIOztBQUFDbU8sWUFBQUEsR0FBRyxDQUNKLEdBREksQ0FBSDtBQUVMLFdBWkQsTUFZT0EsR0FBRyxDQUNMLDZCQURLLEVBQzBCRyxJQUQxQixDQUFILENBRUUscUJBRkYsRUFFeUJGLEtBQUssQ0FBQ00sUUFBTixHQUFpQixtQkFGMUMsRUFHRiwrQkFIRSxFQUcrQkosSUFIL0IsRUFHcUNELFVBSHJDLEVBR2lEQyxJQUhqRDtBQUlWLFNBakJELE1BaUJPO0FBQ0gsY0FBSUssVUFBVSxHQUFHLEtBQWpCOztBQUNBLGtCQUFRUCxLQUFLLENBQUMxQyxJQUFkO0FBQ0ksaUJBQUssUUFBTDtBQUNBLGlCQUFLLE9BQUw7QUFBY3lDLGNBQUFBLEdBQUcsQ0FDWixpQkFEWSxFQUNPRyxJQURQLEVBQ2FBLElBRGIsQ0FBSCxDQUFkLENBQ3FDOztBQUNqQzs7QUFDSixpQkFBSyxRQUFMO0FBQ0EsaUJBQUssU0FBTDtBQUFnQkgsY0FBQUEsR0FBRyxDQUNkLGFBRGMsRUFDQ0csSUFERCxFQUNPQSxJQURQLENBQUg7QUFFWjs7QUFDSixpQkFBSyxPQUFMO0FBQ0EsaUJBQUssUUFBTDtBQUNBLGlCQUFLLFVBQUw7QUFBaUJILGNBQUFBLEdBQUcsQ0FDZixXQURlLEVBQ0ZHLElBREUsRUFDSUEsSUFESixDQUFIO0FBRWI7O0FBQ0osaUJBQUssUUFBTDtBQUNJSyxjQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBOztBQUNKLGlCQUFLLE9BQUw7QUFDQSxpQkFBSyxRQUFMO0FBQ0EsaUJBQUssU0FBTDtBQUNBLGlCQUFLLFVBQUw7QUFBaUJSLGNBQUFBLEdBQUcsQ0FDZixlQURlLENBQUgsQ0FFUiw0Q0FGUSxFQUVzQ0csSUFGdEMsRUFFNENBLElBRjVDLEVBRWtESyxVQUZsRCxFQUdaLGtDQUhZLEVBR3dCTCxJQUh4QixFQUlSLHNCQUpRLEVBSWdCQSxJQUpoQixFQUlzQkEsSUFKdEIsRUFLWixrQ0FMWSxFQUt3QkEsSUFMeEIsRUFNUixTQU5RLEVBTUdBLElBTkgsRUFNU0EsSUFOVCxFQU9aLGtDQVBZLEVBT3dCQSxJQVB4QixFQVFSLDhEQVJRLEVBUXdEQSxJQVJ4RCxFQVE4REEsSUFSOUQsRUFRb0VBLElBUnBFLEVBUTBFSyxVQUFVLEdBQUcsTUFBSCxHQUFZLEVBUmhHO0FBU2I7O0FBQ0osaUJBQUssT0FBTDtBQUFjUixjQUFBQSxHQUFHLENBQ1osNkJBRFksRUFDbUJHLElBRG5CLENBQUgsQ0FFTCx1RUFGSyxFQUVvRUEsSUFGcEUsRUFFMEVBLElBRjFFLEVBRWdGQSxJQUZoRixFQUdULHFCQUhTLEVBR2NBLElBSGQsRUFJTCxTQUpLLEVBSU1BLElBSk4sRUFJWUEsSUFKWjtBQUtWOztBQUNKLGlCQUFLLFFBQUw7QUFBZUgsY0FBQUEsR0FBRyxDQUNiLGlCQURhLEVBQ01HLElBRE4sRUFDWUEsSUFEWixDQUFIO0FBRVg7O0FBQ0osaUJBQUssTUFBTDtBQUFhSCxjQUFBQSxHQUFHLENBQ1gsa0JBRFcsRUFDU0csSUFEVCxFQUNlQSxJQURmLENBQUg7QUFFVDs7QUFDSjs7O0FBMUNKO0FBOENIOztBQUNELGVBQU9ILEdBQVA7QUFDQTtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQUgsTUFBQUEsU0FBUyxDQUFDWSxVQUFWLEdBQXVCLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQzlDO0FBQ0EsWUFBSXJELE1BQU0sR0FBR3FELEtBQUssQ0FBQ0MsV0FBbkI7QUFDQSxZQUFJWCxHQUFHLEdBQUdqUSxJQUFJLENBQUNtRCxPQUFMLENBQWEsQ0FBQyxHQUFELENBQWIsRUFBb0J3TixLQUFLLENBQUNwUixJQUFOLEdBQWEsYUFBakMsRUFDVCw0QkFEUyxFQUVMLFVBRkssQ0FBVjtBQUdBLFlBQUksQ0FBQytOLE1BQU0sQ0FBQzVNLE1BQVosRUFBb0IsT0FBT3VQLEdBQUcsQ0FDN0Isc0JBRDZCLENBQVY7QUFFcEJBLFFBQUFBLEdBQUcsQ0FDRixxQkFERSxDQUFIOztBQUVBLGFBQUssSUFBSW5PLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd3TCxNQUFNLENBQUM1TSxNQUEzQixFQUFtQyxFQUFFb0IsQ0FBckMsRUFBd0M7QUFDcEMsY0FBSW9PLEtBQUssR0FBSTVDLE1BQU0sQ0FBQ3hMLENBQUQsQ0FBTixDQUFVZCxPQUFWLEVBQWI7QUFBQSxjQUNJb1AsSUFBSSxHQUFLcFEsSUFBSSxDQUFDNlEsUUFBTCxDQUFjWCxLQUFLLENBQUMzUSxJQUFwQixDQURiLENBRG9DLENBSXBDOztBQUNBLGNBQUkyUSxLQUFLLENBQUNZLEdBQVYsRUFBZTtBQUFFYixZQUFBQSxHQUFHLENBQ3ZCLFVBRHVCLEVBQ1hHLElBRFcsQ0FBSCxDQUVoQiw2QkFGZ0IsRUFFZUEsSUFGZixFQUdaLHFCQUhZLEVBR1dGLEtBQUssQ0FBQ00sUUFBTixHQUFpQixtQkFINUIsRUFJaEIsUUFKZ0IsRUFJTkosSUFKTSxFQUtoQixtREFMZ0IsRUFLcUNBLElBTHJDO0FBTWJKLFlBQUFBLDBCQUEwQixDQUFDQyxHQUFELEVBQU1DLEtBQU47QUFBYTtBQUFpQnBPLFlBQUFBLENBQTlCLEVBQWlDc08sSUFBSSxHQUFHLFNBQXhDLENBQTFCLENBQ0gsR0FERyxFQUVQLEdBRk8sRUFOVyxDQVVmO0FBQ0MsV0FYRCxNQVdPLElBQUlGLEtBQUssQ0FBQ0ksUUFBVixFQUFvQjtBQUFFTCxZQUFBQSxHQUFHLENBQ25DLFVBRG1DLEVBQ3ZCRyxJQUR1QixDQUFILENBRTVCLHlCQUY0QixFQUVEQSxJQUZDLEVBR3hCLHFCQUh3QixFQUdERixLQUFLLENBQUNNLFFBQU4sR0FBaUIsa0JBSGhCLEVBSTVCLFFBSjRCLEVBSWxCSixJQUprQixFQUs1QixnQ0FMNEIsRUFLTUEsSUFMTjtBQU16QkosWUFBQUEsMEJBQTBCLENBQUNDLEdBQUQsRUFBTUMsS0FBTjtBQUFhO0FBQWlCcE8sWUFBQUEsQ0FBOUIsRUFBaUNzTyxJQUFJLEdBQUcsS0FBeEMsQ0FBMUIsQ0FDSCxHQURHLEVBRVAsR0FGTyxFQU51QixDQVUzQjtBQUNDLFdBWE0sTUFXQTtBQUNILGdCQUFJLEVBQUVGLEtBQUssQ0FBQ0csWUFBTixZQUE4Qk4sSUFBaEMsQ0FBSixFQUEyQ0UsR0FBRyxDQUFDO0FBQUQsYUFDckQsZ0JBRHFELEVBQ25DRyxJQURtQyxDQUFILENBRHhDLENBRWU7O0FBQ3RCSixZQUFBQSwwQkFBMEIsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOO0FBQWE7QUFBaUJwTyxZQUFBQSxDQUE5QixFQUFpQ3NPLElBQWpDLENBQTFCO0FBQ0ksZ0JBQUksRUFBRUYsS0FBSyxDQUFDRyxZQUFOLFlBQThCTixJQUFoQyxDQUFKLEVBQTJDRSxHQUFHLENBQ3JELEdBRHFELENBQUg7QUFFOUM7QUFDSjs7QUFBQyxlQUFPQSxHQUFHLENBQ1gsVUFEVyxDQUFWO0FBRUY7QUFDSCxPQS9DRDtBQWlEQTs7Ozs7Ozs7Ozs7QUFTQSxlQUFTYyx3QkFBVCxDQUFrQ2QsR0FBbEMsRUFBdUNDLEtBQXZDLEVBQThDQyxVQUE5QyxFQUEwREMsSUFBMUQsRUFBZ0U7QUFDNUQ7QUFDQSxZQUFJRixLQUFLLENBQUNHLFlBQVYsRUFBd0I7QUFDcEIsY0FBSUgsS0FBSyxDQUFDRyxZQUFOLFlBQThCTixJQUFsQyxFQUF3Q0UsR0FBRyxDQUN0QyxnREFEc0MsRUFDWUcsSUFEWixFQUNrQkQsVUFEbEIsRUFDOEJDLElBRDlCLEVBQ29DQSxJQURwQyxDQUFILENBQXhDLEtBRUtILEdBQUcsQ0FDSCwrQkFERyxFQUM4QkcsSUFEOUIsRUFDb0NELFVBRHBDLEVBQ2dEQyxJQURoRCxDQUFIO0FBRVIsU0FMRCxNQUtPO0FBQ0gsY0FBSUssVUFBVSxHQUFHLEtBQWpCOztBQUNBLGtCQUFRUCxLQUFLLENBQUMxQyxJQUFkO0FBQ0ksaUJBQUssUUFBTDtBQUNBLGlCQUFLLE9BQUw7QUFBY3lDLGNBQUFBLEdBQUcsQ0FDaEIsNENBRGdCLEVBQzhCRyxJQUQ5QixFQUNvQ0EsSUFEcEMsRUFDMENBLElBRDFDLEVBQ2dEQSxJQURoRCxDQUFIO0FBRVY7O0FBQ0osaUJBQUssUUFBTDtBQUNJSyxjQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBOztBQUNKLGlCQUFLLE9BQUw7QUFDQSxpQkFBSyxRQUFMO0FBQ0EsaUJBQUssU0FBTDtBQUNBLGlCQUFLLFVBQUw7QUFBaUJSLGNBQUFBLEdBQUcsQ0FDbkIsNkJBRG1CLEVBQ1lHLElBRFosQ0FBSCxDQUVaLHNDQUZZLEVBRTRCQSxJQUY1QixFQUVrQ0EsSUFGbEMsRUFFd0NBLElBRnhDLEVBR2hCLE1BSGdCLEVBR1I7QUFIUSxlQUlaLDJJQUpZLEVBSWlJQSxJQUpqSSxFQUl1SUEsSUFKdkksRUFJNklBLElBSjdJLEVBSW1KQSxJQUpuSixFQUl5SkssVUFBVSxHQUFHLE1BQUgsR0FBVyxFQUo5SyxFQUlrTEwsSUFKbEw7QUFLYjs7QUFDSixpQkFBSyxPQUFMO0FBQWNILGNBQUFBLEdBQUcsQ0FDaEIsK0dBRGdCLEVBQ2lHRyxJQURqRyxFQUN1R0EsSUFEdkcsRUFDNkdBLElBRDdHLEVBQ21IQSxJQURuSCxFQUN5SEEsSUFEekgsQ0FBSDtBQUVWOztBQUNKO0FBQVNILGNBQUFBLEdBQUcsQ0FDWCxTQURXLEVBQ0FHLElBREEsRUFDTUEsSUFETixDQUFIO0FBRUw7QUF0QlI7QUF3Qkg7O0FBQ0QsZUFBT0gsR0FBUDtBQUNBO0FBQ0g7QUFFRDs7Ozs7OztBQUtBSCxNQUFBQSxTQUFTLENBQUNrQixRQUFWLEdBQXFCLFNBQVNBLFFBQVQsQ0FBa0JMLEtBQWxCLEVBQXlCO0FBQzFDO0FBQ0EsWUFBSXJELE1BQU0sR0FBR3FELEtBQUssQ0FBQ0MsV0FBTixDQUFrQmpPLEtBQWxCLEdBQTBCc08sSUFBMUIsQ0FBK0JqUixJQUFJLENBQUNrUixpQkFBcEMsQ0FBYjtBQUNBLFlBQUksQ0FBQzVELE1BQU0sQ0FBQzVNLE1BQVosRUFDSSxPQUFPVixJQUFJLENBQUNtRCxPQUFMLEdBQWUsV0FBZixDQUFQO0FBQ0osWUFBSThNLEdBQUcsR0FBR2pRLElBQUksQ0FBQ21ELE9BQUwsQ0FBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsRUFBeUJ3TixLQUFLLENBQUNwUixJQUFOLEdBQWEsV0FBdEMsRUFDVCxRQURTLEVBRUwsTUFGSyxFQUdULFVBSFMsQ0FBVjtBQUtBLFlBQUk0UixjQUFjLEdBQUcsRUFBckI7QUFBQSxZQUNJQyxTQUFTLEdBQUcsRUFEaEI7QUFBQSxZQUVJQyxZQUFZLEdBQUcsRUFGbkI7QUFBQSxZQUdJdlAsQ0FBQyxHQUFHLENBSFI7O0FBSUEsZUFBT0EsQ0FBQyxHQUFHd0wsTUFBTSxDQUFDNU0sTUFBbEIsRUFBMEIsRUFBRW9CLENBQTVCO0FBQ0ksY0FBSSxDQUFDd0wsTUFBTSxDQUFDeEwsQ0FBRCxDQUFOLENBQVV3UCxNQUFmLEVBQ0ksQ0FBRWhFLE1BQU0sQ0FBQ3hMLENBQUQsQ0FBTixDQUFVZCxPQUFWLEdBQW9Cc1AsUUFBcEIsR0FBK0JhLGNBQS9CLEdBQ0E3RCxNQUFNLENBQUN4TCxDQUFELENBQU4sQ0FBVWdQLEdBQVYsR0FBZ0JNLFNBQWhCLEdBQ0FDLFlBRkYsRUFFZ0I3TyxJQUZoQixDQUVxQjhLLE1BQU0sQ0FBQ3hMLENBQUQsQ0FGM0I7QUFGUjs7QUFNQSxZQUFJcVAsY0FBYyxDQUFDelEsTUFBbkIsRUFBMkI7QUFBRXVQLFVBQUFBLEdBQUcsQ0FDL0IsMkJBRCtCLENBQUg7O0FBRXpCLGVBQUtuTyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdxUCxjQUFjLENBQUN6USxNQUEvQixFQUF1QyxFQUFFb0IsQ0FBekM7QUFBNENtTyxZQUFBQSxHQUFHLENBQzlDLFFBRDhDLEVBQ3BDalEsSUFBSSxDQUFDNlEsUUFBTCxDQUFjTSxjQUFjLENBQUNyUCxDQUFELENBQWQsQ0FBa0J2QyxJQUFoQyxDQURvQyxDQUFIO0FBQTVDOztBQUVBMFEsVUFBQUEsR0FBRyxDQUNOLEdBRE0sQ0FBSDtBQUVIOztBQUVELFlBQUltQixTQUFTLENBQUMxUSxNQUFkLEVBQXNCO0FBQUV1UCxVQUFBQSxHQUFHLENBQzFCLDRCQUQwQixDQUFIOztBQUVwQixlQUFLbk8sQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHc1AsU0FBUyxDQUFDMVEsTUFBMUIsRUFBa0MsRUFBRW9CLENBQXBDO0FBQXVDbU8sWUFBQUEsR0FBRyxDQUN6QyxRQUR5QyxFQUMvQmpRLElBQUksQ0FBQzZRLFFBQUwsQ0FBY08sU0FBUyxDQUFDdFAsQ0FBRCxDQUFULENBQWF2QyxJQUEzQixDQUQrQixDQUFIO0FBQXZDOztBQUVBMFEsVUFBQUEsR0FBRyxDQUNOLEdBRE0sQ0FBSDtBQUVIOztBQUVELFlBQUlvQixZQUFZLENBQUMzUSxNQUFqQixFQUF5QjtBQUFFdVAsVUFBQUEsR0FBRyxDQUM3QixpQkFENkIsQ0FBSDs7QUFFdkIsZUFBS25PLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR3VQLFlBQVksQ0FBQzNRLE1BQTdCLEVBQXFDLEVBQUVvQixDQUF2QyxFQUEwQztBQUN0QyxnQkFBSW9PLEtBQUssR0FBR21CLFlBQVksQ0FBQ3ZQLENBQUQsQ0FBeEI7QUFBQSxnQkFDSXNPLElBQUksR0FBSXBRLElBQUksQ0FBQzZRLFFBQUwsQ0FBY1gsS0FBSyxDQUFDM1EsSUFBcEIsQ0FEWjtBQUVBLGdCQUFJMlEsS0FBSyxDQUFDRyxZQUFOLFlBQThCTixJQUFsQyxFQUF3Q0UsR0FBRyxDQUM5Qyw0QkFEOEMsRUFDaEJHLElBRGdCLEVBQ1ZGLEtBQUssQ0FBQ0csWUFBTixDQUFtQmtCLFVBQW5CLENBQThCckIsS0FBSyxDQUFDSyxXQUFwQyxDQURVLEVBQ3dDTCxLQUFLLENBQUNLLFdBRDlDLENBQUgsQ0FBeEMsS0FFSyxJQUFJTCxLQUFLLFFBQVQsRUFBZ0JELEdBQUcsQ0FDM0IsZ0JBRDJCLENBQUgsQ0FFcEIsK0JBRm9CLEVBRWFDLEtBQUssQ0FBQ0ssV0FBTixDQUFrQmlCLEdBRi9CLEVBRW9DdEIsS0FBSyxDQUFDSyxXQUFOLENBQWtCa0IsSUFGdEQsRUFFNER2QixLQUFLLENBQUNLLFdBQU4sQ0FBa0JtQixRQUY5RSxFQUdwQixtRUFIb0IsRUFHaUR0QixJQUhqRCxFQUl4QixPQUp3QixFQUtwQiw0QkFMb0IsRUFLVUEsSUFMVixFQUtnQkYsS0FBSyxDQUFDSyxXQUFOLENBQWtCN00sUUFBbEIsRUFMaEIsRUFLOEN3TSxLQUFLLENBQUNLLFdBQU4sQ0FBa0JvQixRQUFsQixFQUw5QyxFQUFoQixLQU1BLElBQUl6QixLQUFLLENBQUMwQixLQUFWLEVBQWlCM0IsR0FBRyxDQUM1Qiw0QkFENEIsRUFDRUcsSUFERixFQUNRM04sTUFBTSxDQUFDQyxZQUFQLENBQW9CdEIsS0FBcEIsQ0FBMEJxQixNQUExQixFQUFrQ3lOLEtBQUssQ0FBQ0ssV0FBeEMsQ0FEUixFQUM4RCxNQUFNL1AsS0FBSyxDQUFDMEUsU0FBTixDQUFnQnZDLEtBQWhCLENBQXNCbEQsSUFBdEIsQ0FBMkJ5USxLQUFLLENBQUNLLFdBQWpDLEVBQThDM04sSUFBOUMsQ0FBbUQsR0FBbkQsQ0FBTixHQUFnRSxHQUQ5SCxDQUFILENBQWpCLEtBRUFxTixHQUFHLENBQ1gsUUFEVyxFQUNERyxJQURDLEVBQ0tGLEtBQUssQ0FBQ0ssV0FEWCxDQUFILENBYmlDLENBY0w7QUFDcEM7O0FBQUNOLFVBQUFBLEdBQUcsQ0FDUixHQURRLENBQUg7QUFFTDs7QUFDRCxZQUFJNEIsTUFBTSxHQUFHLEtBQWI7O0FBQ0EsYUFBSy9QLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR3dMLE1BQU0sQ0FBQzVNLE1BQXZCLEVBQStCLEVBQUVvQixDQUFqQyxFQUFvQztBQUNoQyxjQUFJb08sS0FBSyxHQUFHNUMsTUFBTSxDQUFDeEwsQ0FBRCxDQUFsQjtBQUFBLGNBQ0lsQixLQUFLLEdBQUcrUCxLQUFLLENBQUNtQixZQUFOLENBQW1CQyxPQUFuQixDQUEyQjdCLEtBQTNCLENBRFo7QUFBQSxjQUVJRSxJQUFJLEdBQUlwUSxJQUFJLENBQUM2USxRQUFMLENBQWNYLEtBQUssQ0FBQzNRLElBQXBCLENBRlo7O0FBR0EsY0FBSTJRLEtBQUssQ0FBQ1ksR0FBVixFQUFlO0FBQ1gsZ0JBQUksQ0FBQ2UsTUFBTCxFQUFhO0FBQUVBLGNBQUFBLE1BQU0sR0FBRyxJQUFUO0FBQWU1QixjQUFBQSxHQUFHLENBQ3hDLFNBRHdDLENBQUg7QUFFN0I7O0FBQUNBLFlBQUFBLEdBQUcsQ0FDWix5Q0FEWSxFQUMrQkcsSUFEL0IsRUFDcUNBLElBRHJDLENBQUgsQ0FFTCxRQUZLLEVBRUtBLElBRkwsRUFHTCxnQ0FISztBQUlGVyxZQUFBQSx3QkFBd0IsQ0FBQ2QsR0FBRCxFQUFNQyxLQUFOO0FBQWE7QUFBYXRQLFlBQUFBLEtBQTFCLEVBQWlDd1AsSUFBSSxHQUFHLFVBQXhDLENBQXhCLENBQ0gsR0FERztBQUVILFdBVEQsTUFTTyxJQUFJRixLQUFLLENBQUNJLFFBQVYsRUFBb0I7QUFBRUwsWUFBQUEsR0FBRyxDQUNuQyxzQkFEbUMsRUFDWEcsSUFEVyxFQUNMQSxJQURLLENBQUgsQ0FFNUIsUUFGNEIsRUFFbEJBLElBRmtCLEVBRzVCLGdDQUg0QixFQUdNQSxJQUhOO0FBSXpCVyxZQUFBQSx3QkFBd0IsQ0FBQ2QsR0FBRCxFQUFNQyxLQUFOO0FBQWE7QUFBYXRQLFlBQUFBLEtBQTFCLEVBQWlDd1AsSUFBSSxHQUFHLEtBQXhDLENBQXhCLENBQ0gsR0FERztBQUVILFdBTk0sTUFNQTtBQUFFSCxZQUFBQSxHQUFHLENBQ2Ysc0NBRGUsRUFDeUJHLElBRHpCLEVBQytCRixLQUFLLENBQUMzUSxJQURyQyxDQUFILENBQUYsQ0FDaUQ7O0FBQ3hEd1IsWUFBQUEsd0JBQXdCLENBQUNkLEdBQUQsRUFBTUMsS0FBTjtBQUFhO0FBQWF0UCxZQUFBQSxLQUExQixFQUFpQ3dQLElBQWpDLENBQXhCO0FBQ0EsZ0JBQUlGLEtBQUssQ0FBQ29CLE1BQVYsRUFBa0JyQixHQUFHLENBQ3BCLGNBRG9CLENBQUgsQ0FFYixRQUZhLEVBRUhqUSxJQUFJLENBQUM2USxRQUFMLENBQWNYLEtBQUssQ0FBQ29CLE1BQU4sQ0FBYS9SLElBQTNCLENBRkcsRUFFK0IyUSxLQUFLLENBQUMzUSxJQUZyQztBQUdqQjs7QUFDRDBRLFVBQUFBLEdBQUcsQ0FDTixHQURNLENBQUg7QUFFSDs7QUFDRCxlQUFPQSxHQUFHLENBQ1QsVUFEUyxDQUFWO0FBRUE7QUFDSCxPQXpGRDtBQTJGQyxLQWpTUSxFQWlTUDtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUs7QUFBZCxLQWpTTyxDQXRnRGM7QUF1eURGLFFBQUcsQ0FBQyxVQUFTOVAsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3pEOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJzUyxPQUFqQjs7QUFFQSxVQUFJakMsSUFBSSxHQUFNNVAsT0FBTyxDQUFDLEVBQUQsQ0FBckI7QUFBQSxVQUNJOFIsS0FBSyxHQUFLOVIsT0FBTyxDQUFDLEVBQUQsQ0FEckI7QUFBQSxVQUVJSCxJQUFJLEdBQU1HLE9BQU8sQ0FBQyxFQUFELENBRnJCOztBQUlBLGVBQVMrUixPQUFULENBQWlCaEMsS0FBakIsRUFBd0I7QUFDcEIsZUFBTyx1QkFBdUJBLEtBQUssQ0FBQzNRLElBQTdCLEdBQW9DLEdBQTNDO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLGVBQVN5UyxPQUFULENBQWlCckIsS0FBakIsRUFBd0I7QUFDcEI7QUFDQSxZQUFJVixHQUFHLEdBQUdqUSxJQUFJLENBQUNtRCxPQUFMLENBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLEVBQXlCd04sS0FBSyxDQUFDcFIsSUFBTixHQUFhLFNBQXRDLEVBQ1QsNEJBRFMsRUFFTCxvQkFGSyxFQUdULHVEQUF1RG9SLEtBQUssQ0FBQ0MsV0FBTixDQUFrQnVCLE1BQWxCLENBQXlCLFVBQVNqQyxLQUFULEVBQWdCO0FBQUUsaUJBQU9BLEtBQUssQ0FBQ1ksR0FBYjtBQUFtQixTQUE5RCxFQUFnRXBRLE1BQWhFLEdBQXlFLElBQXpFLEdBQWdGLEVBQXZJLENBSFMsRUFJVCxpQkFKUyxFQUtMLGtCQUxLLENBQVY7QUFNQSxZQUFJaVEsS0FBSyxDQUFDeUIsS0FBVixFQUFpQm5DLEdBQUcsQ0FDZixlQURlLENBQUgsQ0FFUixPQUZRO0FBR2pCQSxRQUFBQSxHQUFHLENBQ0UsZ0JBREYsQ0FBSDtBQUdBLFlBQUluTyxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxlQUFPQSxDQUFDO0FBQUc7QUFBa0I2TyxRQUFBQSxLQUFLLENBQUNDLFdBQU4sQ0FBa0JsUSxNQUEvQyxFQUF1RCxFQUFFb0IsQ0FBekQsRUFBNEQ7QUFDeEQsY0FBSW9PLEtBQUssR0FBR1MsS0FBSyxDQUFDbUIsWUFBTixDQUFtQmhRLENBQW5CLEVBQXNCZCxPQUF0QixFQUFaO0FBQUEsY0FDSXdNLElBQUksR0FBSTBDLEtBQUssQ0FBQ0csWUFBTixZQUE4Qk4sSUFBOUIsR0FBcUMsT0FBckMsR0FBK0NHLEtBQUssQ0FBQzFDLElBRGpFO0FBQUEsY0FFSTZFLEdBQUcsR0FBSyxNQUFNclMsSUFBSSxDQUFDNlEsUUFBTCxDQUFjWCxLQUFLLENBQUMzUSxJQUFwQixDQUZsQjs7QUFFNkMwUSxVQUFBQSxHQUFHLENBQzNDLFVBRDJDLEVBQy9CQyxLQUFLLENBQUN6QyxFQUR5QixDQUFILENBSFcsQ0FNeEQ7O0FBQ0EsY0FBSXlDLEtBQUssQ0FBQ1ksR0FBVixFQUFlO0FBQUViLFlBQUFBLEdBQUcsQ0FDWCxnQkFEVyxDQUFILENBQ1U7QUFEVixhQUVSLDJCQUZRLEVBRXFCb0MsR0FGckIsRUFHSixPQUhJLEVBR0tBLEdBSEwsRUFJUixVQUpRLEVBSUluQyxLQUFLLENBQUNqQyxPQUpWLEVBS1IsU0FMUSxFQUFGLENBS007O0FBQ2pCLGdCQUFJZ0UsS0FBSyxRQUFMLENBQVcvQixLQUFLLENBQUNqQyxPQUFqQixNQUE4QmhQLFNBQWxDLEVBQTZDO0FBQ3pDLGtCQUFJZ1QsS0FBSyxDQUFDSyxLQUFOLENBQVk5RSxJQUFaLE1BQXNCdk8sU0FBMUIsRUFBcUNnUixHQUFHLENBQ3ZDLCtFQUR1QyxFQUMwQ29DLEdBRDFDLEVBQytDdlEsQ0FEL0MsQ0FBSCxDQUFyQyxDQUMyRjtBQUQzRixtQkFFS21PLEdBQUcsQ0FDUCx1REFETyxFQUNrRG9DLEdBRGxELEVBQ3VEN0UsSUFEdkQsQ0FBSDtBQUVSLGFBTEQsTUFLTztBQUNILGtCQUFJeUUsS0FBSyxDQUFDSyxLQUFOLENBQVk5RSxJQUFaLE1BQXNCdk8sU0FBMUIsRUFBcUNnUixHQUFHLENBQ3ZDLHNDQUR1QyxFQUNDb0MsR0FERCxFQUNNdlEsQ0FETixDQUFILENBQXJDLENBQ2tEO0FBRGxELG1CQUVLbU8sR0FBRyxDQUNQLGNBRE8sRUFDU29DLEdBRFQsRUFDYzdFLElBRGQsQ0FBSDtBQUVSLGFBaEJVLENBa0JmOztBQUNDLFdBbkJELE1BbUJPLElBQUkwQyxLQUFLLENBQUNJLFFBQVYsRUFBb0I7QUFBRUwsWUFBQUEsR0FBRyxDQUV2QixzQkFGdUIsRUFFQ29DLEdBRkQsRUFFTUEsR0FGTixDQUFILENBR2hCLE9BSGdCLEVBR1BBLEdBSE8sRUFBRixDQUt2Qjs7QUFDQSxnQkFBSUosS0FBSyxDQUFDTSxNQUFOLENBQWEvRSxJQUFiLE1BQXVCdk8sU0FBM0IsRUFBc0NnUixHQUFHLENBQ3BDLGdCQURvQyxDQUFILENBRTdCLHlCQUY2QixFQUc3QixpQkFINkIsRUFJekIsaUJBSnlCLEVBSU5vQyxHQUpNLEVBSUQ3RSxJQUpDLEVBS2pDLE9BTGlDLEVBTmYsQ0FhdkI7O0FBQ0EsZ0JBQUl5RSxLQUFLLENBQUNLLEtBQU4sQ0FBWTlFLElBQVosTUFBc0J2TyxTQUExQixFQUFxQ2dSLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDRyxZQUFOLENBQW1CK0IsS0FBbkIsR0FDL0IsOEJBRCtCLEdBRS9CLHlDQUY4QixFQUVhQyxHQUZiLEVBRWtCdlEsQ0FGbEIsQ0FBSCxDQUFyQyxLQUdLbU8sR0FBRyxDQUNDLGlCQURELEVBQ29Cb0MsR0FEcEIsRUFDeUI3RSxJQUR6QixDQUFILENBakJrQixDQW9CM0I7QUFDQyxXQXJCTSxNQXFCQSxJQUFJeUUsS0FBSyxDQUFDSyxLQUFOLENBQVk5RSxJQUFaLE1BQXNCdk8sU0FBMUIsRUFBcUNnUixHQUFHLENBQUNDLEtBQUssQ0FBQ0csWUFBTixDQUFtQitCLEtBQW5CLEdBQ3RDLHdCQURzQyxHQUV0QyxtQ0FGcUMsRUFFQUMsR0FGQSxFQUVLdlEsQ0FGTCxDQUFILENBQXJDLEtBR0ZtTyxHQUFHLENBQ0MsV0FERCxFQUNjb0MsR0FEZCxFQUNtQjdFLElBRG5CLENBQUg7O0FBRUx5QyxVQUFBQSxHQUFHLENBQ00sT0FETixDQUFILENBcER3RCxDQXNENUQ7QUFDQzs7QUFBQ0EsUUFBQUEsR0FBRyxDQUNJLFVBREosQ0FBSCxDQUVXLGlCQUZYLEVBR1csT0FIWCxFQUtHLEdBTEgsRUFNRCxHQU5DLEVBdEVrQixDQThFcEI7O0FBQ0EsYUFBS25PLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRzZPLEtBQUssQ0FBQ21CLFlBQU4sQ0FBbUJwUixNQUFuQyxFQUEyQyxFQUFFb0IsQ0FBN0MsRUFBZ0Q7QUFDNUMsY0FBSTBRLE1BQU0sR0FBRzdCLEtBQUssQ0FBQ21CLFlBQU4sQ0FBbUJoUSxDQUFuQixDQUFiO0FBQ0EsY0FBSTBRLE1BQU0sQ0FBQ0MsUUFBWCxFQUFxQnhDLEdBQUcsQ0FDM0IsMkJBRDJCLEVBQ0V1QyxNQUFNLENBQUNqVCxJQURULENBQUgsQ0FFcEIsMkNBRm9CLEVBRXlCMlMsT0FBTyxDQUFDTSxNQUFELENBRmhDO0FBR3hCOztBQUVELGVBQU92QyxHQUFHLENBQ1QsVUFEUyxDQUFWO0FBRUE7QUFDSDtBQUVBLEtBNUd1QixFQTRHdEI7QUFBQyxZQUFLLEVBQU47QUFBUyxZQUFLLEVBQWQ7QUFBaUIsWUFBSztBQUF0QixLQTVHc0IsQ0F2eUREO0FBbTVETSxRQUFHLENBQUMsVUFBUzlQLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUNqRTs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCZ1QsT0FBakI7O0FBRUEsVUFBSTNDLElBQUksR0FBTzVQLE9BQU8sQ0FBQyxFQUFELENBQXRCO0FBQUEsVUFDSThSLEtBQUssR0FBTTlSLE9BQU8sQ0FBQyxFQUFELENBRHRCO0FBQUEsVUFFSUgsSUFBSSxHQUFPRyxPQUFPLENBQUMsRUFBRCxDQUZ0QjtBQUlBOzs7Ozs7Ozs7OztBQVNBLGVBQVN3UyxjQUFULENBQXdCMUMsR0FBeEIsRUFBNkJDLEtBQTdCLEVBQW9DQyxVQUFwQyxFQUFnRGtDLEdBQWhELEVBQXFEO0FBQ2pELGVBQU9uQyxLQUFLLENBQUNHLFlBQU4sQ0FBbUIrQixLQUFuQixHQUNEbkMsR0FBRyxDQUFDLDhDQUFELEVBQWlERSxVQUFqRCxFQUE2RGtDLEdBQTdELEVBQWtFLENBQUNuQyxLQUFLLENBQUN6QyxFQUFOLElBQVksQ0FBWixHQUFnQixDQUFqQixNQUF3QixDQUExRixFQUE2RixDQUFDeUMsS0FBSyxDQUFDekMsRUFBTixJQUFZLENBQVosR0FBZ0IsQ0FBakIsTUFBd0IsQ0FBckgsQ0FERixHQUVEd0MsR0FBRyxDQUFDLG1EQUFELEVBQXNERSxVQUF0RCxFQUFrRWtDLEdBQWxFLEVBQXVFLENBQUNuQyxLQUFLLENBQUN6QyxFQUFOLElBQVksQ0FBWixHQUFnQixDQUFqQixNQUF3QixDQUEvRixDQUZUO0FBR0g7QUFFRDs7Ozs7OztBQUtBLGVBQVNpRixPQUFULENBQWlCL0IsS0FBakIsRUFBd0I7QUFDcEI7QUFDQSxZQUFJVixHQUFHLEdBQUdqUSxJQUFJLENBQUNtRCxPQUFMLENBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLEVBQXlCd04sS0FBSyxDQUFDcFIsSUFBTixHQUFhLFNBQXRDLEVBQ1QsUUFEUyxFQUVMLG1CQUZLLENBQVY7QUFJQSxZQUFJdUMsQ0FBSixFQUFPdVEsR0FBUCxDQU5vQixDQVFwQjs7QUFDQSxZQUFJL0UsTUFBTTtBQUFHO0FBQWtCcUQsUUFBQUEsS0FBSyxDQUFDQyxXQUFOLENBQWtCak8sS0FBbEIsR0FBMEJzTyxJQUExQixDQUErQmpSLElBQUksQ0FBQ2tSLGlCQUFwQyxDQUEvQjs7QUFFQSxhQUFLLElBQUlwUCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHd0wsTUFBTSxDQUFDNU0sTUFBM0IsRUFBbUMsRUFBRW9CLENBQXJDLEVBQXdDO0FBQ3BDLGNBQUlvTyxLQUFLLEdBQU01QyxNQUFNLENBQUN4TCxDQUFELENBQU4sQ0FBVWQsT0FBVixFQUFmO0FBQUEsY0FDSUosS0FBSyxHQUFNK1AsS0FBSyxDQUFDbUIsWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkI3QixLQUEzQixDQURmO0FBQUEsY0FFSTFDLElBQUksR0FBTzBDLEtBQUssQ0FBQ0csWUFBTixZQUE4Qk4sSUFBOUIsR0FBcUMsT0FBckMsR0FBK0NHLEtBQUssQ0FBQzFDLElBRnBFO0FBQUEsY0FHSW9GLFFBQVEsR0FBR1gsS0FBSyxDQUFDSyxLQUFOLENBQVk5RSxJQUFaLENBSGY7O0FBSUk2RSxVQUFBQSxHQUFHLEdBQVEsTUFBTXJTLElBQUksQ0FBQzZRLFFBQUwsQ0FBY1gsS0FBSyxDQUFDM1EsSUFBcEIsQ0FBakIsQ0FMZ0MsQ0FPcEM7O0FBQ0EsY0FBSTJRLEtBQUssQ0FBQ1ksR0FBVixFQUFlO0FBQ1hiLFlBQUFBLEdBQUcsQ0FDVixxQ0FEVSxFQUM2Qm9DLEdBRDdCLEVBQ2tDbkMsS0FBSyxDQUFDM1EsSUFEeEMsQ0FBSCxDQUNpRDtBQURqRCxhQUVILGtEQUZHLEVBRWlEOFMsR0FGakQsRUFHQywwQ0FIRCxFQUc2QyxDQUFDbkMsS0FBSyxDQUFDekMsRUFBTixJQUFZLENBQVosR0FBZ0IsQ0FBakIsTUFBd0IsQ0FIckUsRUFHd0UsSUFBSXdFLEtBQUssQ0FBQ1ksTUFBTixDQUFhM0MsS0FBSyxDQUFDakMsT0FBbkIsQ0FINUUsRUFHeUdpQyxLQUFLLENBQUNqQyxPQUgvRztBQUlBLGdCQUFJMkUsUUFBUSxLQUFLM1QsU0FBakIsRUFBNEJnUixHQUFHLENBQzlCLG1FQUQ4QixFQUN1Q3JQLEtBRHZDLEVBQzhDeVIsR0FEOUMsQ0FBSCxDQUE1QixDQUNtRjtBQURuRixpQkFFS3BDLEdBQUcsQ0FDUCxvQ0FETyxFQUMrQixLQUFLMkMsUUFEcEMsRUFDOENwRixJQUQ5QyxFQUNvRDZFLEdBRHBELENBQUg7QUFFTHBDLFlBQUFBLEdBQUcsQ0FDTixHQURNLENBQUgsQ0FFUCxHQUZPLEVBVFcsQ0FhWDtBQUNILFdBZEQsTUFjTyxJQUFJQyxLQUFLLENBQUNJLFFBQVYsRUFBb0I7QUFBRUwsWUFBQUEsR0FBRyxDQUNuQywwQkFEbUMsRUFDUG9DLEdBRE8sRUFDRkEsR0FERSxDQUFILENBQUYsQ0FDUztBQUVoQzs7QUFDQSxnQkFBSW5DLEtBQUssQ0FBQ3FDLE1BQU4sSUFBZ0JOLEtBQUssQ0FBQ00sTUFBTixDQUFhL0UsSUFBYixNQUF1QnZPLFNBQTNDLEVBQXNEO0FBQUVnUixjQUFBQSxHQUFHLENBRTlELHFCQUY4RCxFQUV2QyxDQUFDQyxLQUFLLENBQUN6QyxFQUFOLElBQVksQ0FBWixHQUFnQixDQUFqQixNQUF3QixDQUZlLENBQUgsQ0FHM0QsOEJBSDJELEVBRzNCNEUsR0FIMkIsRUFJdkQsYUFKdUQsRUFJeEM3RSxJQUp3QyxFQUlsQzZFLEdBSmtDLEVBSzNELFlBTDJELEVBQUYsQ0FPdEQ7QUFDQyxhQVJELE1BUU87QUFBRXBDLGNBQUFBLEdBQUcsQ0FFZiw4QkFGZSxFQUVpQm9DLEdBRmpCLENBQUg7QUFHTCxrQkFBSU8sUUFBUSxLQUFLM1QsU0FBakIsRUFDSjBULGNBQWMsQ0FBQzFDLEdBQUQsRUFBTUMsS0FBTixFQUFhdFAsS0FBYixFQUFvQnlSLEdBQUcsR0FBRyxLQUExQixDQUFkLENBREksS0FFS3BDLEdBQUcsQ0FDWCx3QkFEVyxFQUNlLENBQUNDLEtBQUssQ0FBQ3pDLEVBQU4sSUFBWSxDQUFaLEdBQWdCbUYsUUFBakIsTUFBK0IsQ0FEOUMsRUFDaURwRixJQURqRCxFQUN1RDZFLEdBRHZELENBQUg7QUFHUjs7QUFBQ3BDLFlBQUFBLEdBQUcsQ0FDWixHQURZLENBQUgsQ0FwQnFCLENBdUIzQjtBQUNDLFdBeEJNLE1Bd0JBO0FBQ0gsZ0JBQUlDLEtBQUssQ0FBQzRDLFFBQVYsRUFBb0I3QyxHQUFHLENBQzlCLG9DQUQ4QixFQUNRb0MsR0FEUixFQUNhbkMsS0FBSyxDQUFDM1EsSUFEbkIsQ0FBSCxDQURqQixDQUU4Qzs7QUFFakQsZ0JBQUlxVCxRQUFRLEtBQUszVCxTQUFqQixFQUNKMFQsY0FBYyxDQUFDMUMsR0FBRCxFQUFNQyxLQUFOLEVBQWF0UCxLQUFiLEVBQW9CeVIsR0FBcEIsQ0FBZCxDQURJLEtBRUtwQyxHQUFHLENBQ1gscUJBRFcsRUFDWSxDQUFDQyxLQUFLLENBQUN6QyxFQUFOLElBQVksQ0FBWixHQUFnQm1GLFFBQWpCLE1BQStCLENBRDNDLEVBQzhDcEYsSUFEOUMsRUFDb0Q2RSxHQURwRCxDQUFIO0FBR1I7QUFDSjs7QUFFRCxlQUFPcEMsR0FBRyxDQUNULFVBRFMsQ0FBVjtBQUVBO0FBQ0g7QUFDQSxLQXJHK0IsRUFxRzlCO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSyxFQUFkO0FBQWlCLFlBQUs7QUFBdEIsS0FyRzhCLENBbjVEVDtBQXcvRE0sUUFBRyxDQUFDLFVBQVM5UCxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakU7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQnFRLElBQWpCLENBRmlFLENBSWpFOztBQUNBLFVBQUlnRCxnQkFBZ0IsR0FBRzVTLE9BQU8sQ0FBQyxFQUFELENBQTlCOztBQUNBLE9BQUMsQ0FBQzRQLElBQUksQ0FBQzdLLFNBQUwsR0FBaUJuQixNQUFNLENBQUNpUCxNQUFQLENBQWNELGdCQUFnQixDQUFDN04sU0FBL0IsQ0FBbEIsRUFBNkQrTixXQUE3RCxHQUEyRWxELElBQTVFLEVBQWtGbUQsU0FBbEYsR0FBOEYsTUFBOUY7O0FBRUEsVUFBSUMsU0FBUyxHQUFHaFQsT0FBTyxDQUFDLEVBQUQsQ0FBdkI7QUFBQSxVQUNJSCxJQUFJLEdBQUdHLE9BQU8sQ0FBQyxFQUFELENBRGxCO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFXQSxlQUFTNFAsSUFBVCxDQUFjeFEsSUFBZCxFQUFvQnNQLE1BQXBCLEVBQTRCL0ksT0FBNUIsRUFBcUNzTixPQUFyQyxFQUE4Q0MsUUFBOUMsRUFBd0Q7QUFDcEROLFFBQUFBLGdCQUFnQixDQUFDdFQsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEJGLElBQTVCLEVBQWtDdUcsT0FBbEM7QUFFQSxZQUFJK0ksTUFBTSxJQUFJLE9BQU9BLE1BQVAsS0FBa0IsUUFBaEMsRUFDSSxNQUFNeUUsU0FBUyxDQUFDLDBCQUFELENBQWY7QUFFSjs7Ozs7QUFJQSxhQUFLL0IsVUFBTCxHQUFrQixFQUFsQjtBQUVBOzs7OztBQUlBLGFBQUsxQyxNQUFMLEdBQWM5SyxNQUFNLENBQUNpUCxNQUFQLENBQWMsS0FBS3pCLFVBQW5CLENBQWQsQ0FoQm9ELENBZ0JOOztBQUU5Qzs7Ozs7QUFJQSxhQUFLNkIsT0FBTCxHQUFlQSxPQUFmO0FBRUE7Ozs7O0FBSUEsYUFBS0MsUUFBTCxHQUFnQkEsUUFBUSxJQUFJLEVBQTVCO0FBRUE7Ozs7O0FBSUEsYUFBS0UsUUFBTCxHQUFnQnRVLFNBQWhCLENBbENvRCxDQWtDekI7QUFFM0I7QUFDQTtBQUNBOztBQUVBLFlBQUk0UCxNQUFKLEVBQ0ksS0FBSyxJQUFJN0ssSUFBSSxHQUFHRCxNQUFNLENBQUNDLElBQVAsQ0FBWTZLLE1BQVosQ0FBWCxFQUFnQy9NLENBQUMsR0FBRyxDQUF6QyxFQUE0Q0EsQ0FBQyxHQUFHa0MsSUFBSSxDQUFDdEQsTUFBckQsRUFBNkQsRUFBRW9CLENBQS9EO0FBQ0ksY0FBSSxPQUFPK00sTUFBTSxDQUFDN0ssSUFBSSxDQUFDbEMsQ0FBRCxDQUFMLENBQWIsS0FBMkIsUUFBL0IsRUFBeUM7QUFDckMsaUJBQUt5UCxVQUFMLENBQWlCLEtBQUsxQyxNQUFMLENBQVk3SyxJQUFJLENBQUNsQyxDQUFELENBQWhCLElBQXVCK00sTUFBTSxDQUFDN0ssSUFBSSxDQUFDbEMsQ0FBRCxDQUFMLENBQTlDLElBQTREa0MsSUFBSSxDQUFDbEMsQ0FBRCxDQUFoRTtBQUZSO0FBR1A7QUFFRDs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFPQWlPLE1BQUFBLElBQUksQ0FBQ3lELFFBQUwsR0FBZ0IsU0FBU0EsUUFBVCxDQUFrQmpVLElBQWxCLEVBQXdCMk4sSUFBeEIsRUFBOEI7QUFDMUMsWUFBSXVHLEdBQUcsR0FBRyxJQUFJMUQsSUFBSixDQUFTeFEsSUFBVCxFQUFlMk4sSUFBSSxDQUFDMkIsTUFBcEIsRUFBNEIzQixJQUFJLENBQUNwSCxPQUFqQyxFQUEwQ29ILElBQUksQ0FBQ2tHLE9BQS9DLEVBQXdEbEcsSUFBSSxDQUFDbUcsUUFBN0QsQ0FBVjtBQUNBSSxRQUFBQSxHQUFHLENBQUNGLFFBQUosR0FBZXJHLElBQUksQ0FBQ3FHLFFBQXBCO0FBQ0EsZUFBT0UsR0FBUDtBQUNILE9BSkQ7QUFNQTs7Ozs7OztBQUtBMUQsTUFBQUEsSUFBSSxDQUFDN0ssU0FBTCxDQUFld08sTUFBZixHQUF3QixTQUFTQSxNQUFULENBQWdCQyxhQUFoQixFQUErQjtBQUNuRCxZQUFJQyxZQUFZLEdBQUdELGFBQWEsR0FBR0UsT0FBTyxDQUFDRixhQUFhLENBQUNDLFlBQWYsQ0FBVixHQUF5QyxLQUF6RTtBQUNBLGVBQU81VCxJQUFJLENBQUNnUixRQUFMLENBQWMsQ0FDakIsU0FEaUIsRUFDSixLQUFLbEwsT0FERCxFQUVqQixRQUZpQixFQUVKLEtBQUsrSSxNQUZELEVBR2pCLFVBSGlCLEVBR0osS0FBSzBFLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjN1MsTUFBL0IsR0FBd0MsS0FBSzZTLFFBQTdDLEdBQXdEdFUsU0FIcEQsRUFJakIsU0FKaUIsRUFJSjJVLFlBQVksR0FBRyxLQUFLUixPQUFSLEdBQWtCblUsU0FKMUIsRUFLakIsVUFMaUIsRUFLSjJVLFlBQVksR0FBRyxLQUFLUCxRQUFSLEdBQW1CcFUsU0FMM0IsQ0FBZCxDQUFQO0FBT0gsT0FURDtBQVdBOzs7Ozs7Ozs7OztBQVNBOFEsTUFBQUEsSUFBSSxDQUFDN0ssU0FBTCxDQUFlNE8sR0FBZixHQUFxQixTQUFTQSxHQUFULENBQWF2VSxJQUFiLEVBQW1Ca08sRUFBbkIsRUFBdUIyRixPQUF2QixFQUFnQztBQUNqRDtBQUVBLFlBQUksQ0FBQ3BULElBQUksQ0FBQytULFFBQUwsQ0FBY3hVLElBQWQsQ0FBTCxFQUNJLE1BQU0rVCxTQUFTLENBQUMsdUJBQUQsQ0FBZjtBQUVKLFlBQUksQ0FBQ3RULElBQUksQ0FBQ2dVLFNBQUwsQ0FBZXZHLEVBQWYsQ0FBTCxFQUNJLE1BQU02RixTQUFTLENBQUMsdUJBQUQsQ0FBZjtBQUVKLFlBQUksS0FBS3pFLE1BQUwsQ0FBWXRQLElBQVosTUFBc0JOLFNBQTFCLEVBQ0ksTUFBTWdFLEtBQUssQ0FBQyxxQkFBcUIxRCxJQUFyQixHQUE0QixPQUE1QixHQUFzQyxJQUF2QyxDQUFYO0FBRUosWUFBSSxLQUFLMFUsWUFBTCxDQUFrQnhHLEVBQWxCLENBQUosRUFDSSxNQUFNeEssS0FBSyxDQUFDLFFBQVF3SyxFQUFSLEdBQWEsa0JBQWIsR0FBa0MsSUFBbkMsQ0FBWDtBQUVKLFlBQUksS0FBS3lHLGNBQUwsQ0FBb0IzVSxJQUFwQixDQUFKLEVBQ0ksTUFBTTBELEtBQUssQ0FBQyxXQUFXMUQsSUFBWCxHQUFrQixtQkFBbEIsR0FBd0MsSUFBekMsQ0FBWDs7QUFFSixZQUFJLEtBQUtnUyxVQUFMLENBQWdCOUQsRUFBaEIsTUFBd0J4TyxTQUE1QixFQUF1QztBQUNuQyxjQUFJLEVBQUUsS0FBSzZHLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhcU8sV0FBL0IsQ0FBSixFQUNJLE1BQU1sUixLQUFLLENBQUMsa0JBQWtCd0ssRUFBbEIsR0FBdUIsTUFBdkIsR0FBZ0MsSUFBakMsQ0FBWDtBQUNKLGVBQUtvQixNQUFMLENBQVl0UCxJQUFaLElBQW9Ca08sRUFBcEI7QUFDSCxTQUpELE1BS0ksS0FBSzhELFVBQUwsQ0FBZ0IsS0FBSzFDLE1BQUwsQ0FBWXRQLElBQVosSUFBb0JrTyxFQUFwQyxJQUEwQ2xPLElBQTFDOztBQUVKLGFBQUs4VCxRQUFMLENBQWM5VCxJQUFkLElBQXNCNlQsT0FBTyxJQUFJLElBQWpDO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsT0EzQkQ7QUE2QkE7Ozs7Ozs7OztBQU9BckQsTUFBQUEsSUFBSSxDQUFDN0ssU0FBTCxDQUFla1AsTUFBZixHQUF3QixTQUFTQSxNQUFULENBQWdCN1UsSUFBaEIsRUFBc0I7QUFFMUMsWUFBSSxDQUFDUyxJQUFJLENBQUMrVCxRQUFMLENBQWN4VSxJQUFkLENBQUwsRUFDSSxNQUFNK1QsU0FBUyxDQUFDLHVCQUFELENBQWY7QUFFSixZQUFJakwsR0FBRyxHQUFHLEtBQUt3RyxNQUFMLENBQVl0UCxJQUFaLENBQVY7QUFDQSxZQUFJOEksR0FBRyxJQUFJLElBQVgsRUFDSSxNQUFNcEYsS0FBSyxDQUFDLFdBQVcxRCxJQUFYLEdBQWtCLHNCQUFsQixHQUEyQyxJQUE1QyxDQUFYO0FBRUosZUFBTyxLQUFLZ1MsVUFBTCxDQUFnQmxKLEdBQWhCLENBQVA7QUFDQSxlQUFPLEtBQUt3RyxNQUFMLENBQVl0UCxJQUFaLENBQVA7QUFDQSxlQUFPLEtBQUs4VCxRQUFMLENBQWM5VCxJQUFkLENBQVA7QUFFQSxlQUFPLElBQVA7QUFDSCxPQWREO0FBZ0JBOzs7Ozs7O0FBS0F3USxNQUFBQSxJQUFJLENBQUM3SyxTQUFMLENBQWUrTyxZQUFmLEdBQThCLFNBQVNBLFlBQVQsQ0FBc0J4RyxFQUF0QixFQUEwQjtBQUNwRCxlQUFPMEYsU0FBUyxDQUFDYyxZQUFWLENBQXVCLEtBQUtWLFFBQTVCLEVBQXNDOUYsRUFBdEMsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7OztBQUtBc0MsTUFBQUEsSUFBSSxDQUFDN0ssU0FBTCxDQUFlZ1AsY0FBZixHQUFnQyxTQUFTQSxjQUFULENBQXdCM1UsSUFBeEIsRUFBOEI7QUFDMUQsZUFBTzRULFNBQVMsQ0FBQ2UsY0FBVixDQUF5QixLQUFLWCxRQUE5QixFQUF3Q2hVLElBQXhDLENBQVA7QUFDSCxPQUZEO0FBSUMsS0F2TCtCLEVBdUw5QjtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUssRUFBZDtBQUFpQixZQUFLO0FBQXRCLEtBdkw4QixDQXgvRFQ7QUErcUVNLFFBQUcsQ0FBQyxVQUFTWSxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakU7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQjJVLEtBQWpCLENBRmlFLENBSWpFOztBQUNBLFVBQUl0QixnQkFBZ0IsR0FBRzVTLE9BQU8sQ0FBQyxFQUFELENBQTlCOztBQUNBLE9BQUMsQ0FBQ2tVLEtBQUssQ0FBQ25QLFNBQU4sR0FBa0JuQixNQUFNLENBQUNpUCxNQUFQLENBQWNELGdCQUFnQixDQUFDN04sU0FBL0IsQ0FBbkIsRUFBOEQrTixXQUE5RCxHQUE0RW9CLEtBQTdFLEVBQW9GbkIsU0FBcEYsR0FBZ0csT0FBaEc7O0FBRUEsVUFBSW5ELElBQUksR0FBSTVQLE9BQU8sQ0FBQyxFQUFELENBQW5CO0FBQUEsVUFDSThSLEtBQUssR0FBRzlSLE9BQU8sQ0FBQyxFQUFELENBRG5CO0FBQUEsVUFFSUgsSUFBSSxHQUFJRyxPQUFPLENBQUMsRUFBRCxDQUZuQjs7QUFJQSxVQUFJbVUsSUFBSixDQVppRSxDQVl2RDs7QUFFVixVQUFJQyxNQUFNLEdBQUcsOEJBQWI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7QUFPQUYsTUFBQUEsS0FBSyxDQUFDYixRQUFOLEdBQWlCLFNBQVNBLFFBQVQsQ0FBa0JqVSxJQUFsQixFQUF3QjJOLElBQXhCLEVBQThCO0FBQzNDLGVBQU8sSUFBSW1ILEtBQUosQ0FBVTlVLElBQVYsRUFBZ0IyTixJQUFJLENBQUNPLEVBQXJCLEVBQXlCUCxJQUFJLENBQUNNLElBQTlCLEVBQW9DTixJQUFJLENBQUM4QixJQUF6QyxFQUErQzlCLElBQUksQ0FBQ3NILE1BQXBELEVBQTREdEgsSUFBSSxDQUFDcEgsT0FBakUsRUFBMEVvSCxJQUFJLENBQUNrRyxPQUEvRSxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsZUFBU2lCLEtBQVQsQ0FBZTlVLElBQWYsRUFBcUJrTyxFQUFyQixFQUF5QkQsSUFBekIsRUFBK0J3QixJQUEvQixFQUFxQ3dGLE1BQXJDLEVBQTZDMU8sT0FBN0MsRUFBc0RzTixPQUF0RCxFQUErRDtBQUUzRCxZQUFJcFQsSUFBSSxDQUFDeVUsUUFBTCxDQUFjekYsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCb0UsVUFBQUEsT0FBTyxHQUFHb0IsTUFBVjtBQUNBMU8sVUFBQUEsT0FBTyxHQUFHa0osSUFBVjtBQUNBQSxVQUFBQSxJQUFJLEdBQUd3RixNQUFNLEdBQUd2VixTQUFoQjtBQUNILFNBSkQsTUFJTyxJQUFJZSxJQUFJLENBQUN5VSxRQUFMLENBQWNELE1BQWQsQ0FBSixFQUEyQjtBQUM5QnBCLFVBQUFBLE9BQU8sR0FBR3ROLE9BQVY7QUFDQUEsVUFBQUEsT0FBTyxHQUFHME8sTUFBVjtBQUNBQSxVQUFBQSxNQUFNLEdBQUd2VixTQUFUO0FBQ0g7O0FBRUQ4VCxRQUFBQSxnQkFBZ0IsQ0FBQ3RULElBQWpCLENBQXNCLElBQXRCLEVBQTRCRixJQUE1QixFQUFrQ3VHLE9BQWxDO0FBRUEsWUFBSSxDQUFDOUYsSUFBSSxDQUFDZ1UsU0FBTCxDQUFldkcsRUFBZixDQUFELElBQXVCQSxFQUFFLEdBQUcsQ0FBaEMsRUFDSSxNQUFNNkYsU0FBUyxDQUFDLG1DQUFELENBQWY7QUFFSixZQUFJLENBQUN0VCxJQUFJLENBQUMrVCxRQUFMLENBQWN2RyxJQUFkLENBQUwsRUFDSSxNQUFNOEYsU0FBUyxDQUFDLHVCQUFELENBQWY7QUFFSixZQUFJdEUsSUFBSSxLQUFLL1AsU0FBVCxJQUFzQixDQUFDc1YsTUFBTSxDQUFDclIsSUFBUCxDQUFZOEwsSUFBSSxHQUFHQSxJQUFJLENBQUN0TCxRQUFMLEdBQWdCZ1IsV0FBaEIsRUFBbkIsQ0FBM0IsRUFDSSxNQUFNcEIsU0FBUyxDQUFDLDRCQUFELENBQWY7QUFFSixZQUFJa0IsTUFBTSxLQUFLdlYsU0FBWCxJQUF3QixDQUFDZSxJQUFJLENBQUMrVCxRQUFMLENBQWNTLE1BQWQsQ0FBN0IsRUFDSSxNQUFNbEIsU0FBUyxDQUFDLHlCQUFELENBQWY7QUFFSjs7Ozs7QUFJQSxhQUFLdEUsSUFBTCxHQUFZQSxJQUFJLElBQUlBLElBQUksS0FBSyxVQUFqQixHQUE4QkEsSUFBOUIsR0FBcUMvUCxTQUFqRCxDQTlCMkQsQ0E4QkM7O0FBRTVEOzs7OztBQUlBLGFBQUt1TyxJQUFMLEdBQVlBLElBQVosQ0FwQzJELENBb0N6Qzs7QUFFbEI7Ozs7O0FBSUEsYUFBS0MsRUFBTCxHQUFVQSxFQUFWLENBMUMyRCxDQTBDN0M7O0FBRWQ7Ozs7O0FBSUEsYUFBSytHLE1BQUwsR0FBY0EsTUFBTSxJQUFJdlYsU0FBeEIsQ0FoRDJELENBZ0R4Qjs7QUFFbkM7Ozs7O0FBSUEsYUFBS3dULFFBQUwsR0FBZ0J6RCxJQUFJLEtBQUssVUFBekI7QUFFQTs7Ozs7QUFJQSxhQUFLOEQsUUFBTCxHQUFnQixDQUFDLEtBQUtMLFFBQXRCO0FBRUE7Ozs7O0FBSUEsYUFBS25DLFFBQUwsR0FBZ0J0QixJQUFJLEtBQUssVUFBekI7QUFFQTs7Ozs7QUFJQSxhQUFLOEIsR0FBTCxHQUFXLEtBQVg7QUFFQTs7Ozs7QUFJQSxhQUFLNkQsT0FBTCxHQUFlLElBQWY7QUFFQTs7Ozs7QUFJQSxhQUFLckQsTUFBTCxHQUFjLElBQWQ7QUFFQTs7Ozs7QUFJQSxhQUFLZixXQUFMLEdBQW1CLElBQW5CO0FBRUE7Ozs7O0FBSUEsYUFBS3FFLFlBQUwsR0FBb0IsSUFBcEI7QUFFQTs7Ozs7QUFJQSx1QkFBWTVVLElBQUksQ0FBQ0YsSUFBTCxHQUFZbVMsS0FBSyxRQUFMLENBQVd6RSxJQUFYLE1BQXFCdk8sU0FBakM7QUFBNkM7QUFBMkIsYUFBcEY7QUFFQTs7Ozs7QUFJQSxhQUFLMlMsS0FBTCxHQUFhcEUsSUFBSSxLQUFLLE9BQXRCO0FBRUE7Ozs7O0FBSUEsYUFBSzZDLFlBQUwsR0FBb0IsSUFBcEI7QUFFQTs7Ozs7QUFJQSxhQUFLd0UsY0FBTCxHQUFzQixJQUF0QjtBQUVBOzs7OztBQUlBLGFBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFFQTs7Ozs7O0FBS0EsYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFFQTs7Ozs7QUFJQSxhQUFLM0IsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7QUFFRDs7Ozs7Ozs7QUFNQXJQLE1BQUFBLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0JYLEtBQUssQ0FBQ25QLFNBQTVCLEVBQXVDLFFBQXZDLEVBQWlEO0FBQzdDMEssUUFBQUEsR0FBRyxFQUFFLGVBQVc7QUFDWjtBQUNBLGNBQUksS0FBS21GLE9BQUwsS0FBaUIsSUFBckIsRUFDSSxLQUFLQSxPQUFMLEdBQWUsS0FBS0UsU0FBTCxDQUFlLFFBQWYsTUFBNkIsS0FBNUM7QUFDSixpQkFBTyxLQUFLRixPQUFaO0FBQ0g7QUFONEMsT0FBakQ7QUFTQTs7OztBQUdBVixNQUFBQSxLQUFLLENBQUNuUCxTQUFOLENBQWdCZ1EsU0FBaEIsR0FBNEIsU0FBU0EsU0FBVCxDQUFtQjNWLElBQW5CLEVBQXlCbUYsS0FBekIsRUFBZ0N5USxRQUFoQyxFQUEwQztBQUNsRSxZQUFJNVYsSUFBSSxLQUFLLFFBQWIsRUFBdUI7QUFDbkIsZUFBS3dWLE9BQUwsR0FBZSxJQUFmO0FBQ0osZUFBT2hDLGdCQUFnQixDQUFDN04sU0FBakIsQ0FBMkJnUSxTQUEzQixDQUFxQ3pWLElBQXJDLENBQTBDLElBQTFDLEVBQWdERixJQUFoRCxFQUFzRG1GLEtBQXRELEVBQTZEeVEsUUFBN0QsQ0FBUDtBQUNILE9BSkQ7QUFNQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFPQTs7Ozs7OztBQUtBZCxNQUFBQSxLQUFLLENBQUNuUCxTQUFOLENBQWdCd08sTUFBaEIsR0FBeUIsU0FBU0EsTUFBVCxDQUFnQkMsYUFBaEIsRUFBK0I7QUFDcEQsWUFBSUMsWUFBWSxHQUFHRCxhQUFhLEdBQUdFLE9BQU8sQ0FBQ0YsYUFBYSxDQUFDQyxZQUFmLENBQVYsR0FBeUMsS0FBekU7QUFDQSxlQUFPNVQsSUFBSSxDQUFDZ1IsUUFBTCxDQUFjLENBQ2pCLE1BRGlCLEVBQ0wsS0FBS2hDLElBQUwsS0FBYyxVQUFkLElBQTRCLEtBQUtBLElBQWpDLElBQXlDL1AsU0FEcEMsRUFFakIsTUFGaUIsRUFFTCxLQUFLdU8sSUFGQSxFQUdqQixJQUhpQixFQUdMLEtBQUtDLEVBSEEsRUFJakIsUUFKaUIsRUFJTCxLQUFLK0csTUFKQSxFQUtqQixTQUxpQixFQUtMLEtBQUsxTyxPQUxBLEVBTWpCLFNBTmlCLEVBTUw4TixZQUFZLEdBQUcsS0FBS1IsT0FBUixHQUFrQm5VLFNBTnpCLENBQWQsQ0FBUDtBQVFILE9BVkQ7QUFZQTs7Ozs7OztBQUtBb1YsTUFBQUEsS0FBSyxDQUFDblAsU0FBTixDQUFnQmxFLE9BQWhCLEdBQTBCLFNBQVNBLE9BQVQsR0FBbUI7QUFFekMsWUFBSSxLQUFLb1UsUUFBVCxFQUNJLE9BQU8sSUFBUDs7QUFFSixZQUFJLENBQUMsS0FBSzdFLFdBQUwsR0FBbUIwQixLQUFLLENBQUNvRCxRQUFOLENBQWUsS0FBSzdILElBQXBCLENBQXBCLE1BQW1Edk8sU0FBdkQsRUFBa0U7QUFBRTtBQUNoRSxlQUFLb1IsWUFBTCxHQUFvQixDQUFDLEtBQUt5RSxjQUFMLEdBQXNCLEtBQUtBLGNBQUwsQ0FBb0JRLE1BQTFDLEdBQW1ELEtBQUtBLE1BQXpELEVBQWlFQyxnQkFBakUsQ0FBa0YsS0FBSy9ILElBQXZGLENBQXBCO0FBQ0EsY0FBSSxLQUFLNkMsWUFBTCxZQUE2QmlFLElBQWpDLEVBQ0ksS0FBSy9ELFdBQUwsR0FBbUIsSUFBbkIsQ0FESixLQUVLO0FBQ0QsaUJBQUtBLFdBQUwsR0FBbUIsS0FBS0YsWUFBTCxDQUFrQnhCLE1BQWxCLENBQXlCOUssTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS3FNLFlBQUwsQ0FBa0J4QixNQUE5QixFQUFzQyxDQUF0QyxDQUF6QixDQUFuQixDQUwwRCxDQUs2QjtBQUM5RixTQVh3QyxDQWF6Qzs7O0FBQ0EsWUFBSSxLQUFLL0ksT0FBTCxJQUFnQixLQUFLQSxPQUFMLENBQWEsU0FBYixLQUEyQixJQUEvQyxFQUFxRDtBQUNqRCxlQUFLeUssV0FBTCxHQUFtQixLQUFLekssT0FBTCxDQUFhLFNBQWIsQ0FBbkI7QUFDQSxjQUFJLEtBQUt1SyxZQUFMLFlBQTZCTixJQUE3QixJQUFxQyxPQUFPLEtBQUtRLFdBQVosS0FBNEIsUUFBckUsRUFDSSxLQUFLQSxXQUFMLEdBQW1CLEtBQUtGLFlBQUwsQ0FBa0J4QixNQUFsQixDQUF5QixLQUFLMEIsV0FBOUIsQ0FBbkI7QUFDUCxTQWxCd0MsQ0FvQnpDOzs7QUFDQSxZQUFJLEtBQUt6SyxPQUFULEVBQWtCO0FBQ2QsY0FBSSxLQUFLQSxPQUFMLENBQWF5TSxNQUFiLEtBQXdCLElBQXhCLElBQWdDLEtBQUt6TSxPQUFMLENBQWF5TSxNQUFiLEtBQXdCdFQsU0FBeEIsSUFBcUMsS0FBS29SLFlBQTFDLElBQTBELEVBQUUsS0FBS0EsWUFBTCxZQUE2Qk4sSUFBL0IsQ0FBOUYsRUFDSSxPQUFPLEtBQUtqSyxPQUFMLENBQWF5TSxNQUFwQjtBQUNKLGNBQUksQ0FBQ3hPLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUs4QixPQUFqQixFQUEwQnBGLE1BQS9CLEVBQ0ksS0FBS29GLE9BQUwsR0FBZTdHLFNBQWY7QUFDUCxTQTFCd0MsQ0E0QnpDOzs7QUFDQSxZQUFJLFlBQUosRUFBZTtBQUNYLGVBQUtzUixXQUFMLEdBQW1CdlEsSUFBSSxDQUFDRixJQUFMLENBQVUwVixVQUFWLENBQXFCLEtBQUtqRixXQUExQixFQUF1QyxLQUFLL0MsSUFBTCxDQUFVL0wsTUFBVixDQUFpQixDQUFqQixNQUF3QixHQUEvRCxDQUFuQjtBQUVBOztBQUNBLGNBQUlzQyxNQUFNLENBQUMwUixNQUFYLEVBQ0kxUixNQUFNLENBQUMwUixNQUFQLENBQWMsS0FBS2xGLFdBQW5CLEVBTE8sQ0FLMEI7QUFFeEMsU0FQRCxNQU9PLElBQUksS0FBS3FCLEtBQUwsSUFBYyxPQUFPLEtBQUtyQixXQUFaLEtBQTRCLFFBQTlDLEVBQXdEO0FBQzNELGNBQUlqSSxHQUFKO0FBQ0EsY0FBSXRJLElBQUksQ0FBQ3FCLE1BQUwsQ0FBWTZCLElBQVosQ0FBaUIsS0FBS3FOLFdBQXRCLENBQUosRUFDSXZRLElBQUksQ0FBQ3FCLE1BQUwsQ0FBWXlCLE1BQVosQ0FBbUIsS0FBS3lOLFdBQXhCLEVBQXFDakksR0FBRyxHQUFHdEksSUFBSSxDQUFDMFYsU0FBTCxDQUFlMVYsSUFBSSxDQUFDcUIsTUFBTCxDQUFZWCxNQUFaLENBQW1CLEtBQUs2UCxXQUF4QixDQUFmLENBQTNDLEVBQWlHLENBQWpHLEVBREosS0FHSXZRLElBQUksQ0FBQ3VNLElBQUwsQ0FBVUssS0FBVixDQUFnQixLQUFLMkQsV0FBckIsRUFBa0NqSSxHQUFHLEdBQUd0SSxJQUFJLENBQUMwVixTQUFMLENBQWUxVixJQUFJLENBQUN1TSxJQUFMLENBQVU3TCxNQUFWLENBQWlCLEtBQUs2UCxXQUF0QixDQUFmLENBQXhDLEVBQTRGLENBQTVGO0FBQ0osZUFBS0EsV0FBTCxHQUFtQmpJLEdBQW5CO0FBQ0gsU0EzQ3dDLENBNkN6Qzs7O0FBQ0EsWUFBSSxLQUFLd0ksR0FBVCxFQUNJLEtBQUs4RCxZQUFMLEdBQW9CNVUsSUFBSSxDQUFDMlYsV0FBekIsQ0FESixLQUVLLElBQUksS0FBS3JGLFFBQVQsRUFDRCxLQUFLc0UsWUFBTCxHQUFvQjVVLElBQUksQ0FBQzRWLFVBQXpCLENBREMsS0FHRCxLQUFLaEIsWUFBTCxHQUFvQixLQUFLckUsV0FBekIsQ0FuRHFDLENBcUR6Qzs7QUFDQSxZQUFJLEtBQUsrRSxNQUFMLFlBQXVCaEIsSUFBM0IsRUFDSSxLQUFLZ0IsTUFBTCxDQUFZTyxJQUFaLENBQWlCM1EsU0FBakIsQ0FBMkIsS0FBSzNGLElBQWhDLElBQXdDLEtBQUtxVixZQUE3QztBQUVKLGVBQU83QixnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCbEUsT0FBM0IsQ0FBbUN2QixJQUFuQyxDQUF3QyxJQUF4QyxDQUFQO0FBQ0gsT0ExREQ7QUE0REE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7O0FBV0E0VSxNQUFBQSxLQUFLLENBQUN5QixDQUFOLEdBQVUsU0FBU0MsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0NDLFNBQWhDLEVBQTJDQyxTQUEzQyxFQUFzRHRCLFlBQXRELEVBQW9FO0FBRTFFO0FBQ0EsWUFBSSxPQUFPcUIsU0FBUCxLQUFxQixVQUF6QixFQUNJQSxTQUFTLEdBQUdqVyxJQUFJLENBQUNtVyxZQUFMLENBQWtCRixTQUFsQixFQUE2QjFXLElBQXpDLENBREosQ0FHQTtBQUhBLGFBSUssSUFBSTBXLFNBQVMsSUFBSSxPQUFPQSxTQUFQLEtBQXFCLFFBQXRDLEVBQ0RBLFNBQVMsR0FBR2pXLElBQUksQ0FBQ29XLFlBQUwsQ0FBa0JILFNBQWxCLEVBQTZCMVcsSUFBekM7QUFFSixlQUFPLFNBQVM4VyxjQUFULENBQXdCblIsU0FBeEIsRUFBbUNvUixTQUFuQyxFQUE4QztBQUNqRHRXLFVBQUFBLElBQUksQ0FBQ21XLFlBQUwsQ0FBa0JqUixTQUFTLENBQUMrTixXQUE1QixFQUNLYSxHQURMLENBQ1MsSUFBSU8sS0FBSixDQUFVaUMsU0FBVixFQUFxQk4sT0FBckIsRUFBOEJDLFNBQTlCLEVBQXlDQyxTQUF6QyxFQUFvRDtBQUFFLHVCQUFXdEI7QUFBYixXQUFwRCxDQURUO0FBRUgsU0FIRDtBQUlILE9BZEQ7QUFnQkE7Ozs7Ozs7Ozs7O0FBV0E7OztBQUVBUCxNQUFBQSxLQUFLLENBQUNrQyxVQUFOLEdBQW1CLFNBQVN0VyxTQUFULENBQW1CdVcsS0FBbkIsRUFBMEI7QUFDekNsQyxRQUFBQSxJQUFJLEdBQUdrQyxLQUFQO0FBQ0gsT0FGRDtBQUlDLEtBcFgrQixFQW9YOUI7QUFBQyxZQUFLLEVBQU47QUFBUyxZQUFLLEVBQWQ7QUFBaUIsWUFBSyxFQUF0QjtBQUF5QixZQUFLO0FBQTlCLEtBcFg4QixDQS9xRVQ7QUFtaUZjLFFBQUcsQ0FBQyxVQUFTclcsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3pFOztBQUNBLFVBQUlDLFFBQVEsR0FBR08sTUFBTSxDQUFDUixPQUFQLEdBQWlCUyxPQUFPLENBQUMsRUFBRCxDQUF2Qzs7QUFFQVIsTUFBQUEsUUFBUSxDQUFDOFcsS0FBVCxHQUFpQixPQUFqQjtBQUVBOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBUUEsZUFBU0MsSUFBVCxDQUFjN1EsUUFBZCxFQUF3QjhRLElBQXhCLEVBQThCelYsUUFBOUIsRUFBd0M7QUFDcEMsWUFBSSxPQUFPeVYsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QnpWLFVBQUFBLFFBQVEsR0FBR3lWLElBQVg7QUFDQUEsVUFBQUEsSUFBSSxHQUFHLElBQUloWCxRQUFRLENBQUNpWCxJQUFiLEVBQVA7QUFDSCxTQUhELE1BR08sSUFBSSxDQUFDRCxJQUFMLEVBQ0hBLElBQUksR0FBRyxJQUFJaFgsUUFBUSxDQUFDaVgsSUFBYixFQUFQOztBQUNKLGVBQU9ELElBQUksQ0FBQ0QsSUFBTCxDQUFVN1EsUUFBVixFQUFvQjNFLFFBQXBCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O0FBVUE7O0FBRUE7Ozs7Ozs7Ozs7QUFVQTs7O0FBRUF2QixNQUFBQSxRQUFRLENBQUMrVyxJQUFULEdBQWdCQSxJQUFoQjtBQUVBOzs7Ozs7Ozs7QUFRQSxlQUFTRyxRQUFULENBQWtCaFIsUUFBbEIsRUFBNEI4USxJQUE1QixFQUFrQztBQUM5QixZQUFJLENBQUNBLElBQUwsRUFDSUEsSUFBSSxHQUFHLElBQUloWCxRQUFRLENBQUNpWCxJQUFiLEVBQVA7QUFDSixlQUFPRCxJQUFJLENBQUNFLFFBQUwsQ0FBY2hSLFFBQWQsQ0FBUDtBQUNIOztBQUVEbEcsTUFBQUEsUUFBUSxDQUFDa1gsUUFBVCxHQUFvQkEsUUFBcEIsQ0F4RXlFLENBMEV6RTs7QUFDQWxYLE1BQUFBLFFBQVEsQ0FBQytTLE9BQVQsR0FBNEJ2UyxPQUFPLENBQUMsRUFBRCxDQUFuQztBQUNBUixNQUFBQSxRQUFRLENBQUNxUyxPQUFULEdBQTRCN1IsT0FBTyxDQUFDLEVBQUQsQ0FBbkM7QUFDQVIsTUFBQUEsUUFBUSxDQUFDbVgsUUFBVCxHQUE0QjNXLE9BQU8sQ0FBQyxFQUFELENBQW5DO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ21RLFNBQVQsR0FBNEIzUCxPQUFPLENBQUMsRUFBRCxDQUFuQyxDQTlFeUUsQ0FnRnpFOztBQUNBUixNQUFBQSxRQUFRLENBQUNvVCxnQkFBVCxHQUE0QjVTLE9BQU8sQ0FBQyxFQUFELENBQW5DO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ3dULFNBQVQsR0FBNEJoVCxPQUFPLENBQUMsRUFBRCxDQUFuQztBQUNBUixNQUFBQSxRQUFRLENBQUNpWCxJQUFULEdBQTRCelcsT0FBTyxDQUFDLEVBQUQsQ0FBbkM7QUFDQVIsTUFBQUEsUUFBUSxDQUFDb1EsSUFBVCxHQUE0QjVQLE9BQU8sQ0FBQyxFQUFELENBQW5DO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQzJVLElBQVQsR0FBNEJuVSxPQUFPLENBQUMsRUFBRCxDQUFuQztBQUNBUixNQUFBQSxRQUFRLENBQUMwVSxLQUFULEdBQTRCbFUsT0FBTyxDQUFDLEVBQUQsQ0FBbkM7QUFDQVIsTUFBQUEsUUFBUSxDQUFDb1gsS0FBVCxHQUE0QjVXLE9BQU8sQ0FBQyxFQUFELENBQW5DO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ3FYLFFBQVQsR0FBNEI3VyxPQUFPLENBQUMsRUFBRCxDQUFuQztBQUNBUixNQUFBQSxRQUFRLENBQUNzWCxPQUFULEdBQTRCOVcsT0FBTyxDQUFDLEVBQUQsQ0FBbkM7QUFDQVIsTUFBQUEsUUFBUSxDQUFDdVgsTUFBVCxHQUE0Qi9XLE9BQU8sQ0FBQyxFQUFELENBQW5DLENBMUZ5RSxDQTRGekU7O0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ3dYLE9BQVQsR0FBNEJoWCxPQUFPLENBQUMsRUFBRCxDQUFuQztBQUNBUixNQUFBQSxRQUFRLENBQUN5WCxRQUFULEdBQTRCalgsT0FBTyxDQUFDLEVBQUQsQ0FBbkMsQ0E5RnlFLENBZ0d6RTs7QUFDQVIsTUFBQUEsUUFBUSxDQUFDc1MsS0FBVCxHQUE0QjlSLE9BQU8sQ0FBQyxFQUFELENBQW5DO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ0ssSUFBVCxHQUE0QkcsT0FBTyxDQUFDLEVBQUQsQ0FBbkMsQ0FsR3lFLENBb0d6RTs7QUFDQVIsTUFBQUEsUUFBUSxDQUFDb1QsZ0JBQVQsQ0FBMEJ3RCxVQUExQixDQUFxQzVXLFFBQVEsQ0FBQ2lYLElBQTlDOztBQUNBalgsTUFBQUEsUUFBUSxDQUFDd1QsU0FBVCxDQUFtQm9ELFVBQW5CLENBQThCNVcsUUFBUSxDQUFDMlUsSUFBdkMsRUFBNkMzVSxRQUFRLENBQUNzWCxPQUF0RDs7QUFDQXRYLE1BQUFBLFFBQVEsQ0FBQ2lYLElBQVQsQ0FBY0wsVUFBZCxDQUF5QjVXLFFBQVEsQ0FBQzJVLElBQWxDOztBQUNBM1UsTUFBQUEsUUFBUSxDQUFDMFUsS0FBVCxDQUFla0MsVUFBZixDQUEwQjVXLFFBQVEsQ0FBQzJVLElBQW5DO0FBRUMsS0ExR3VDLEVBMEd0QztBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUssRUFBZDtBQUFpQixZQUFLLEVBQXRCO0FBQXlCLFlBQUssRUFBOUI7QUFBaUMsWUFBSyxFQUF0QztBQUF5QyxZQUFLLEVBQTlDO0FBQWlELFlBQUssRUFBdEQ7QUFBeUQsWUFBSyxFQUE5RDtBQUFpRSxZQUFLLEVBQXRFO0FBQXlFLFlBQUssRUFBOUU7QUFBaUYsWUFBSyxFQUF0RjtBQUF5RixZQUFLLEVBQTlGO0FBQWlHLFlBQUssRUFBdEc7QUFBeUcsWUFBSyxFQUE5RztBQUFpSCxZQUFLLEVBQXRIO0FBQXlILFlBQUssRUFBOUg7QUFBaUksWUFBSyxFQUF0STtBQUF5SSxZQUFLLEVBQTlJO0FBQWlKLFlBQUs7QUFBdEosS0ExR3NDLENBbmlGakI7QUE2b0ZzSSxRQUFHLENBQUMsVUFBU25VLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUNqTTs7QUFDQSxVQUFJQyxRQUFRLEdBQUdELE9BQWY7QUFFQTs7Ozs7OztBQU1BQyxNQUFBQSxRQUFRLENBQUM4VyxLQUFULEdBQWlCLFNBQWpCLENBVmlNLENBWWpNOztBQUNBOVcsTUFBQUEsUUFBUSxDQUFDMFgsTUFBVCxHQUF3QmxYLE9BQU8sQ0FBQyxFQUFELENBQS9CO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQzJYLFlBQVQsR0FBd0JuWCxPQUFPLENBQUMsRUFBRCxDQUEvQjtBQUNBUixNQUFBQSxRQUFRLENBQUM0WCxNQUFULEdBQXdCcFgsT0FBTyxDQUFDLEVBQUQsQ0FBL0I7QUFDQVIsTUFBQUEsUUFBUSxDQUFDNlgsWUFBVCxHQUF3QnJYLE9BQU8sQ0FBQyxFQUFELENBQS9CLENBaEJpTSxDQWtCak07O0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ0ssSUFBVCxHQUF3QkcsT0FBTyxDQUFDLEVBQUQsQ0FBL0I7QUFDQVIsTUFBQUEsUUFBUSxDQUFDOFgsR0FBVCxHQUF3QnRYLE9BQU8sQ0FBQyxFQUFELENBQS9CO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQytYLEtBQVQsR0FBd0J2WCxPQUFPLENBQUMsRUFBRCxDQUEvQjtBQUNBUixNQUFBQSxRQUFRLENBQUNNLFNBQVQsR0FBd0JBLFNBQXhCO0FBRUE7O0FBQ0E7Ozs7O0FBSUEsZUFBU0EsU0FBVCxHQUFxQjtBQUNqQk4sUUFBQUEsUUFBUSxDQUFDNFgsTUFBVCxDQUFnQmhCLFVBQWhCLENBQTJCNVcsUUFBUSxDQUFDNlgsWUFBcEM7O0FBQ0E3WCxRQUFBQSxRQUFRLENBQUNLLElBQVQsQ0FBY3VXLFVBQWQ7QUFDSCxPQWhDZ00sQ0FrQ2pNOzs7QUFDQTVXLE1BQUFBLFFBQVEsQ0FBQzBYLE1BQVQsQ0FBZ0JkLFVBQWhCLENBQTJCNVcsUUFBUSxDQUFDMlgsWUFBcEM7O0FBQ0FyWCxNQUFBQSxTQUFTO0FBRVIsS0F0QytKLEVBc0M5SjtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUssRUFBZDtBQUFpQixZQUFLLEVBQXRCO0FBQXlCLFlBQUssRUFBOUI7QUFBaUMsWUFBSyxFQUF0QztBQUF5QyxZQUFLLEVBQTlDO0FBQWlELFlBQUs7QUFBdEQsS0F0QzhKLENBN29Gekk7QUFtckZzQyxRQUFHLENBQUMsVUFBU0UsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ2pHOztBQUNBLFVBQUlDLFFBQVEsR0FBR08sTUFBTSxDQUFDUixPQUFQLEdBQWlCUyxPQUFPLENBQUMsRUFBRCxDQUF2Qzs7QUFFQVIsTUFBQUEsUUFBUSxDQUFDOFcsS0FBVCxHQUFpQixNQUFqQixDQUppRyxDQU1qRzs7QUFDQTlXLE1BQUFBLFFBQVEsQ0FBQ2dZLFFBQVQsR0FBNEJ4WCxPQUFPLENBQUMsRUFBRCxDQUFuQztBQUNBUixNQUFBQSxRQUFRLENBQUNpWSxLQUFULEdBQTRCelgsT0FBTyxDQUFDLEVBQUQsQ0FBbkM7QUFDQVIsTUFBQUEsUUFBUSxDQUFDcU4sTUFBVCxHQUE0QjdNLE9BQU8sQ0FBQyxFQUFELENBQW5DLENBVGlHLENBV2pHOztBQUNBUixNQUFBQSxRQUFRLENBQUNpWCxJQUFULENBQWNMLFVBQWQsQ0FBeUI1VyxRQUFRLENBQUMyVSxJQUFsQyxFQUF3QzNVLFFBQVEsQ0FBQ2lZLEtBQWpELEVBQXdEalksUUFBUSxDQUFDcU4sTUFBakU7QUFFQyxLQWQrRCxFQWM5RDtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUssRUFBZDtBQUFpQixZQUFLLEVBQXRCO0FBQXlCLFlBQUs7QUFBOUIsS0FkOEQsQ0FuckZ6QztBQWlzRmMsUUFBRyxDQUFDLFVBQVM3TSxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDekU7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQnNYLFFBQWpCLENBRnlFLENBSXpFOztBQUNBLFVBQUkzQyxLQUFLLEdBQUdsVSxPQUFPLENBQUMsRUFBRCxDQUFuQjs7QUFDQSxPQUFDLENBQUM2VyxRQUFRLENBQUM5UixTQUFULEdBQXFCbkIsTUFBTSxDQUFDaVAsTUFBUCxDQUFjcUIsS0FBSyxDQUFDblAsU0FBcEIsQ0FBdEIsRUFBc0QrTixXQUF0RCxHQUFvRStELFFBQXJFLEVBQStFOUQsU0FBL0UsR0FBMkYsVUFBM0Y7O0FBRUEsVUFBSWpCLEtBQUssR0FBSzlSLE9BQU8sQ0FBQyxFQUFELENBQXJCO0FBQUEsVUFDSUgsSUFBSSxHQUFNRyxPQUFPLENBQUMsRUFBRCxDQURyQjtBQUdBOzs7Ozs7Ozs7Ozs7OztBQVlBLGVBQVM2VyxRQUFULENBQWtCelgsSUFBbEIsRUFBd0JrTyxFQUF4QixFQUE0QlEsT0FBNUIsRUFBcUNULElBQXJDLEVBQTJDMUgsT0FBM0MsRUFBb0RzTixPQUFwRCxFQUE2RDtBQUN6RGlCLFFBQUFBLEtBQUssQ0FBQzVVLElBQU4sQ0FBVyxJQUFYLEVBQWlCRixJQUFqQixFQUF1QmtPLEVBQXZCLEVBQTJCRCxJQUEzQixFQUFpQ3ZPLFNBQWpDLEVBQTRDQSxTQUE1QyxFQUF1RDZHLE9BQXZELEVBQWdFc04sT0FBaEU7QUFFQTs7QUFDQSxZQUFJLENBQUNwVCxJQUFJLENBQUMrVCxRQUFMLENBQWM5RixPQUFkLENBQUwsRUFDSSxNQUFNcUYsU0FBUyxDQUFDLDBCQUFELENBQWY7QUFFSjs7Ozs7QUFJQSxhQUFLckYsT0FBTCxHQUFlQSxPQUFmLENBWHlELENBV2pDOztBQUV4Qjs7Ozs7QUFJQSxhQUFLNEosZUFBTCxHQUF1QixJQUF2QixDQWpCeUQsQ0FtQnpEOztBQUNBLGFBQUsvRyxHQUFMLEdBQVcsSUFBWDtBQUNIO0FBRUQ7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFPQWtHLE1BQUFBLFFBQVEsQ0FBQ3hELFFBQVQsR0FBb0IsU0FBU0EsUUFBVCxDQUFrQmpVLElBQWxCLEVBQXdCMk4sSUFBeEIsRUFBOEI7QUFDOUMsZUFBTyxJQUFJOEosUUFBSixDQUFhelgsSUFBYixFQUFtQjJOLElBQUksQ0FBQ08sRUFBeEIsRUFBNEJQLElBQUksQ0FBQ2UsT0FBakMsRUFBMENmLElBQUksQ0FBQ00sSUFBL0MsRUFBcUROLElBQUksQ0FBQ3BILE9BQTFELEVBQW1Fb0gsSUFBSSxDQUFDa0csT0FBeEUsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7OztBQUtBNEQsTUFBQUEsUUFBUSxDQUFDOVIsU0FBVCxDQUFtQndPLE1BQW5CLEdBQTRCLFNBQVNBLE1BQVQsQ0FBZ0JDLGFBQWhCLEVBQStCO0FBQ3ZELFlBQUlDLFlBQVksR0FBR0QsYUFBYSxHQUFHRSxPQUFPLENBQUNGLGFBQWEsQ0FBQ0MsWUFBZixDQUFWLEdBQXlDLEtBQXpFO0FBQ0EsZUFBTzVULElBQUksQ0FBQ2dSLFFBQUwsQ0FBYyxDQUNqQixTQURpQixFQUNMLEtBQUsvQyxPQURBLEVBRWpCLE1BRmlCLEVBRUwsS0FBS1QsSUFGQSxFQUdqQixJQUhpQixFQUdMLEtBQUtDLEVBSEEsRUFJakIsUUFKaUIsRUFJTCxLQUFLK0csTUFKQSxFQUtqQixTQUxpQixFQUtMLEtBQUsxTyxPQUxBLEVBTWpCLFNBTmlCLEVBTUw4TixZQUFZLEdBQUcsS0FBS1IsT0FBUixHQUFrQm5VLFNBTnpCLENBQWQsQ0FBUDtBQVFILE9BVkQ7QUFZQTs7Ozs7QUFHQStYLE1BQUFBLFFBQVEsQ0FBQzlSLFNBQVQsQ0FBbUJsRSxPQUFuQixHQUE2QixTQUFTQSxPQUFULEdBQW1CO0FBQzVDLFlBQUksS0FBS29VLFFBQVQsRUFDSSxPQUFPLElBQVAsQ0FGd0MsQ0FJNUM7O0FBQ0EsWUFBSW5ELEtBQUssQ0FBQ1ksTUFBTixDQUFhLEtBQUs1RSxPQUFsQixNQUErQmhQLFNBQW5DLEVBQ0ksTUFBTWdFLEtBQUssQ0FBQyx1QkFBdUIsS0FBS2dMLE9BQTdCLENBQVg7QUFFSixlQUFPb0csS0FBSyxDQUFDblAsU0FBTixDQUFnQmxFLE9BQWhCLENBQXdCdkIsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBUDtBQUNILE9BVEQ7QUFXQTs7Ozs7Ozs7Ozs7O0FBVUF1WCxNQUFBQSxRQUFRLENBQUNsQixDQUFULEdBQWEsU0FBU2dDLGdCQUFULENBQTBCOUIsT0FBMUIsRUFBbUMrQixZQUFuQyxFQUFpREMsY0FBakQsRUFBaUU7QUFFMUU7QUFDQSxZQUFJLE9BQU9BLGNBQVAsS0FBMEIsVUFBOUIsRUFDSUEsY0FBYyxHQUFHaFksSUFBSSxDQUFDbVcsWUFBTCxDQUFrQjZCLGNBQWxCLEVBQWtDelksSUFBbkQsQ0FESixDQUdBO0FBSEEsYUFJSyxJQUFJeVksY0FBYyxJQUFJLE9BQU9BLGNBQVAsS0FBMEIsUUFBaEQsRUFDREEsY0FBYyxHQUFHaFksSUFBSSxDQUFDb1csWUFBTCxDQUFrQjRCLGNBQWxCLEVBQWtDelksSUFBbkQ7QUFFSixlQUFPLFNBQVMwWSxpQkFBVCxDQUEyQi9TLFNBQTNCLEVBQXNDb1IsU0FBdEMsRUFBaUQ7QUFDcER0VyxVQUFBQSxJQUFJLENBQUNtVyxZQUFMLENBQWtCalIsU0FBUyxDQUFDK04sV0FBNUIsRUFDS2EsR0FETCxDQUNTLElBQUlrRCxRQUFKLENBQWFWLFNBQWIsRUFBd0JOLE9BQXhCLEVBQWlDK0IsWUFBakMsRUFBK0NDLGNBQS9DLENBRFQ7QUFFSCxTQUhEO0FBSUgsT0FkRDtBQWdCQyxLQWhJdUMsRUFnSXRDO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSyxFQUFkO0FBQWlCLFlBQUs7QUFBdEIsS0FoSXNDLENBanNGakI7QUFpMEZNLFFBQUcsQ0FBQyxVQUFTN1gsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ2pFOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJ5WCxPQUFqQjs7QUFFQSxVQUFJblgsSUFBSSxHQUFHRyxPQUFPLENBQUMsRUFBRCxDQUFsQjtBQUVBOzs7Ozs7Ozs7QUFPQSxlQUFTZ1gsT0FBVCxDQUFpQmUsVUFBakIsRUFBNkI7QUFDekI7QUFDQSxZQUFJQSxVQUFKLEVBQ0ksS0FBSyxJQUFJbFUsSUFBSSxHQUFHRCxNQUFNLENBQUNDLElBQVAsQ0FBWWtVLFVBQVosQ0FBWCxFQUFvQ3BXLENBQUMsR0FBRyxDQUE3QyxFQUFnREEsQ0FBQyxHQUFHa0MsSUFBSSxDQUFDdEQsTUFBekQsRUFBaUUsRUFBRW9CLENBQW5FO0FBQ0ksZUFBS2tDLElBQUksQ0FBQ2xDLENBQUQsQ0FBVCxJQUFnQm9XLFVBQVUsQ0FBQ2xVLElBQUksQ0FBQ2xDLENBQUQsQ0FBTCxDQUExQjtBQURKO0FBRVA7QUFFRDs7Ozs7OztBQU9BOzs7Ozs7O0FBT0E7O0FBRUE7Ozs7Ozs7OztBQU9BcVYsTUFBQUEsT0FBTyxDQUFDbkUsTUFBUixHQUFpQixTQUFTQSxNQUFULENBQWdCa0YsVUFBaEIsRUFBNEI7QUFDekMsZUFBTyxLQUFLQyxLQUFMLENBQVduRixNQUFYLENBQWtCa0YsVUFBbEIsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7Ozs7OztBQVFBZixNQUFBQSxPQUFPLENBQUNwVixNQUFSLEdBQWlCLFNBQVNBLE1BQVQsQ0FBZ0I0UyxPQUFoQixFQUF5QnlELE1BQXpCLEVBQWlDO0FBQzlDLGVBQU8sS0FBS0QsS0FBTCxDQUFXcFcsTUFBWCxDQUFrQjRTLE9BQWxCLEVBQTJCeUQsTUFBM0IsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7Ozs7OztBQVFBakIsTUFBQUEsT0FBTyxDQUFDa0IsZUFBUixHQUEwQixTQUFTQSxlQUFULENBQXlCMUQsT0FBekIsRUFBa0N5RCxNQUFsQyxFQUEwQztBQUNoRSxlQUFPLEtBQUtELEtBQUwsQ0FBV0UsZUFBWCxDQUEyQjFELE9BQTNCLEVBQW9DeUQsTUFBcEMsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7Ozs7Ozs7QUFTQWpCLE1BQUFBLE9BQU8sQ0FBQ3JVLE1BQVIsR0FBaUIsU0FBU0EsTUFBVCxDQUFnQndWLE1BQWhCLEVBQXdCO0FBQ3JDLGVBQU8sS0FBS0gsS0FBTCxDQUFXclYsTUFBWCxDQUFrQndWLE1BQWxCLENBQVA7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7Ozs7O0FBU0FuQixNQUFBQSxPQUFPLENBQUNvQixlQUFSLEdBQTBCLFNBQVNBLGVBQVQsQ0FBeUJELE1BQXpCLEVBQWlDO0FBQ3ZELGVBQU8sS0FBS0gsS0FBTCxDQUFXSSxlQUFYLENBQTJCRCxNQUEzQixDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7Ozs7QUFPQW5CLE1BQUFBLE9BQU8sQ0FBQ3FCLE1BQVIsR0FBaUIsU0FBU0EsTUFBVCxDQUFnQjdELE9BQWhCLEVBQXlCO0FBQ3RDLGVBQU8sS0FBS3dELEtBQUwsQ0FBV0ssTUFBWCxDQUFrQjdELE9BQWxCLENBQVA7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7OztBQU9Bd0MsTUFBQUEsT0FBTyxDQUFDekcsVUFBUixHQUFxQixTQUFTQSxVQUFULENBQW9CK0gsTUFBcEIsRUFBNEI7QUFDN0MsZUFBTyxLQUFLTixLQUFMLENBQVd6SCxVQUFYLENBQXNCK0gsTUFBdEIsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7Ozs7OztBQVFBdEIsTUFBQUEsT0FBTyxDQUFDbkcsUUFBUixHQUFtQixTQUFTQSxRQUFULENBQWtCMkQsT0FBbEIsRUFBMkI3TyxPQUEzQixFQUFvQztBQUNuRCxlQUFPLEtBQUtxUyxLQUFMLENBQVduSCxRQUFYLENBQW9CMkQsT0FBcEIsRUFBNkI3TyxPQUE3QixDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7QUFJQXFSLE1BQUFBLE9BQU8sQ0FBQ2pTLFNBQVIsQ0FBa0J3TyxNQUFsQixHQUEyQixTQUFTQSxNQUFULEdBQWtCO0FBQ3pDLGVBQU8sS0FBS3lFLEtBQUwsQ0FBV25ILFFBQVgsQ0FBb0IsSUFBcEIsRUFBMEJoUixJQUFJLENBQUMyVCxhQUEvQixDQUFQO0FBQ0gsT0FGRDtBQUlBOztBQUNDLEtBNUkrQixFQTRJOUI7QUFBQyxZQUFLO0FBQU4sS0E1SThCLENBajBGVDtBQTY4RlYsUUFBRyxDQUFDLFVBQVN4VCxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakQ7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQndYLE1BQWpCLENBRmlELENBSWpEOztBQUNBLFVBQUluRSxnQkFBZ0IsR0FBRzVTLE9BQU8sQ0FBQyxFQUFELENBQTlCOztBQUNBLE9BQUMsQ0FBQytXLE1BQU0sQ0FBQ2hTLFNBQVAsR0FBbUJuQixNQUFNLENBQUNpUCxNQUFQLENBQWNELGdCQUFnQixDQUFDN04sU0FBL0IsQ0FBcEIsRUFBK0QrTixXQUEvRCxHQUE2RWlFLE1BQTlFLEVBQXNGaEUsU0FBdEYsR0FBa0csUUFBbEc7O0FBRUEsVUFBSWxULElBQUksR0FBR0csT0FBTyxDQUFDLEVBQUQsQ0FBbEI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLGVBQVMrVyxNQUFULENBQWdCM1gsSUFBaEIsRUFBc0JpTyxJQUF0QixFQUE0QmtMLFdBQTVCLEVBQXlDOVEsWUFBekMsRUFBdUQrUSxhQUF2RCxFQUFzRUMsY0FBdEUsRUFBc0Y5UyxPQUF0RixFQUErRnNOLE9BQS9GLEVBQXdHO0FBRXBHO0FBQ0EsWUFBSXBULElBQUksQ0FBQ3lVLFFBQUwsQ0FBY2tFLGFBQWQsQ0FBSixFQUFrQztBQUM5QjdTLFVBQUFBLE9BQU8sR0FBRzZTLGFBQVY7QUFDQUEsVUFBQUEsYUFBYSxHQUFHQyxjQUFjLEdBQUczWixTQUFqQztBQUNILFNBSEQsTUFHTyxJQUFJZSxJQUFJLENBQUN5VSxRQUFMLENBQWNtRSxjQUFkLENBQUosRUFBbUM7QUFDdEM5UyxVQUFBQSxPQUFPLEdBQUc4UyxjQUFWO0FBQ0FBLFVBQUFBLGNBQWMsR0FBRzNaLFNBQWpCO0FBQ0g7QUFFRDs7O0FBQ0EsWUFBSSxFQUFFdU8sSUFBSSxLQUFLdk8sU0FBVCxJQUFzQmUsSUFBSSxDQUFDK1QsUUFBTCxDQUFjdkcsSUFBZCxDQUF4QixDQUFKLEVBQ0ksTUFBTThGLFNBQVMsQ0FBQyx1QkFBRCxDQUFmO0FBRUo7O0FBQ0EsWUFBSSxDQUFDdFQsSUFBSSxDQUFDK1QsUUFBTCxDQUFjMkUsV0FBZCxDQUFMLEVBQ0ksTUFBTXBGLFNBQVMsQ0FBQyw4QkFBRCxDQUFmO0FBRUo7O0FBQ0EsWUFBSSxDQUFDdFQsSUFBSSxDQUFDK1QsUUFBTCxDQUFjbk0sWUFBZCxDQUFMLEVBQ0ksTUFBTTBMLFNBQVMsQ0FBQywrQkFBRCxDQUFmO0FBRUpQLFFBQUFBLGdCQUFnQixDQUFDdFQsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEJGLElBQTVCLEVBQWtDdUcsT0FBbEM7QUFFQTs7Ozs7QUFJQSxhQUFLMEgsSUFBTCxHQUFZQSxJQUFJLElBQUksS0FBcEIsQ0E3Qm9HLENBNkJ6RTs7QUFFM0I7Ozs7O0FBSUEsYUFBS2tMLFdBQUwsR0FBbUJBLFdBQW5CLENBbkNvRyxDQW1DcEU7O0FBRWhDOzs7OztBQUlBLGFBQUtDLGFBQUwsR0FBcUJBLGFBQWEsR0FBRyxJQUFILEdBQVUxWixTQUE1QyxDQXpDb0csQ0F5QzdDOztBQUV2RDs7Ozs7QUFJQSxhQUFLMkksWUFBTCxHQUFvQkEsWUFBcEIsQ0EvQ29HLENBK0NsRTs7QUFFbEM7Ozs7O0FBSUEsYUFBS2dSLGNBQUwsR0FBc0JBLGNBQWMsR0FBRyxJQUFILEdBQVUzWixTQUE5QyxDQXJEb0csQ0FxRDNDOztBQUV6RDs7Ozs7QUFJQSxhQUFLNFosbUJBQUwsR0FBMkIsSUFBM0I7QUFFQTs7Ozs7QUFJQSxhQUFLQyxvQkFBTCxHQUE0QixJQUE1QjtBQUVBOzs7OztBQUlBLGFBQUsxRixPQUFMLEdBQWVBLE9BQWY7QUFDSDtBQUVEOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7QUFPQThELE1BQUFBLE1BQU0sQ0FBQzFELFFBQVAsR0FBa0IsU0FBU0EsUUFBVCxDQUFrQmpVLElBQWxCLEVBQXdCMk4sSUFBeEIsRUFBOEI7QUFDNUMsZUFBTyxJQUFJZ0ssTUFBSixDQUFXM1gsSUFBWCxFQUFpQjJOLElBQUksQ0FBQ00sSUFBdEIsRUFBNEJOLElBQUksQ0FBQ3dMLFdBQWpDLEVBQThDeEwsSUFBSSxDQUFDdEYsWUFBbkQsRUFBaUVzRixJQUFJLENBQUN5TCxhQUF0RSxFQUFxRnpMLElBQUksQ0FBQzBMLGNBQTFGLEVBQTBHMUwsSUFBSSxDQUFDcEgsT0FBL0csRUFBd0hvSCxJQUFJLENBQUNrRyxPQUE3SCxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7O0FBS0E4RCxNQUFBQSxNQUFNLENBQUNoUyxTQUFQLENBQWlCd08sTUFBakIsR0FBMEIsU0FBU0EsTUFBVCxDQUFnQkMsYUFBaEIsRUFBK0I7QUFDckQsWUFBSUMsWUFBWSxHQUFHRCxhQUFhLEdBQUdFLE9BQU8sQ0FBQ0YsYUFBYSxDQUFDQyxZQUFmLENBQVYsR0FBeUMsS0FBekU7QUFDQSxlQUFPNVQsSUFBSSxDQUFDZ1IsUUFBTCxDQUFjLENBQ2pCLE1BRGlCLEVBQ0UsS0FBS3hELElBQUwsS0FBYyxLQUFkO0FBQXVCO0FBQTJCLGFBQUtBLElBQXZELElBQStEdk8sU0FEakUsRUFFakIsYUFGaUIsRUFFRSxLQUFLeVosV0FGUCxFQUdqQixlQUhpQixFQUdFLEtBQUtDLGFBSFAsRUFJakIsY0FKaUIsRUFJRSxLQUFLL1EsWUFKUCxFQUtqQixnQkFMaUIsRUFLRSxLQUFLZ1IsY0FMUCxFQU1qQixTQU5pQixFQU1FLEtBQUs5UyxPQU5QLEVBT2pCLFNBUGlCLEVBT0U4TixZQUFZLEdBQUcsS0FBS1IsT0FBUixHQUFrQm5VLFNBUGhDLENBQWQsQ0FBUDtBQVNILE9BWEQ7QUFhQTs7Ozs7QUFHQWlZLE1BQUFBLE1BQU0sQ0FBQ2hTLFNBQVAsQ0FBaUJsRSxPQUFqQixHQUEyQixTQUFTQSxPQUFULEdBQW1CO0FBRTFDO0FBQ0EsWUFBSSxLQUFLb1UsUUFBVCxFQUNJLE9BQU8sSUFBUDtBQUVKLGFBQUt5RCxtQkFBTCxHQUEyQixLQUFLdkQsTUFBTCxDQUFZeUQsVUFBWixDQUF1QixLQUFLTCxXQUE1QixDQUEzQjtBQUNBLGFBQUtJLG9CQUFMLEdBQTRCLEtBQUt4RCxNQUFMLENBQVl5RCxVQUFaLENBQXVCLEtBQUtuUixZQUE1QixDQUE1QjtBQUVBLGVBQU9tTCxnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCbEUsT0FBM0IsQ0FBbUN2QixJQUFuQyxDQUF3QyxJQUF4QyxDQUFQO0FBQ0gsT0FWRDtBQVlDLEtBekplLEVBeUpkO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSztBQUFkLEtBekpjLENBNzhGTztBQXNtR0YsUUFBRyxDQUFDLFVBQVNVLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUN6RDs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCeVQsU0FBakIsQ0FGeUQsQ0FJekQ7O0FBQ0EsVUFBSUosZ0JBQWdCLEdBQUc1UyxPQUFPLENBQUMsRUFBRCxDQUE5Qjs7QUFDQSxPQUFDLENBQUNnVCxTQUFTLENBQUNqTyxTQUFWLEdBQXNCbkIsTUFBTSxDQUFDaVAsTUFBUCxDQUFjRCxnQkFBZ0IsQ0FBQzdOLFNBQS9CLENBQXZCLEVBQWtFK04sV0FBbEUsR0FBZ0ZFLFNBQWpGLEVBQTRGRCxTQUE1RixHQUF3RyxXQUF4Rzs7QUFFQSxVQUFJbkQsSUFBSSxHQUFPNVAsT0FBTyxDQUFDLEVBQUQsQ0FBdEI7QUFBQSxVQUNJa1UsS0FBSyxHQUFNbFUsT0FBTyxDQUFDLEVBQUQsQ0FEdEI7QUFBQSxVQUVJSCxJQUFJLEdBQU9HLE9BQU8sQ0FBQyxFQUFELENBRnRCOztBQUlBLFVBQUltVSxJQUFKLEVBQWE7QUFDVDJDLE1BQUFBLE9BREosQ0FaeUQsQ0FhNUM7O0FBRWI7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVNBOUQsTUFBQUEsU0FBUyxDQUFDSyxRQUFWLEdBQXFCLFNBQVNBLFFBQVQsQ0FBa0JqVSxJQUFsQixFQUF3QjJOLElBQXhCLEVBQThCO0FBQy9DLGVBQU8sSUFBSWlHLFNBQUosQ0FBYzVULElBQWQsRUFBb0IyTixJQUFJLENBQUNwSCxPQUF6QixFQUFrQ2tULE9BQWxDLENBQTBDOUwsSUFBSSxDQUFDQyxNQUEvQyxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7Ozs7QUFPQSxlQUFTOEwsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEJ2RixhQUE1QixFQUEyQztBQUN2QyxZQUFJLEVBQUV1RixLQUFLLElBQUlBLEtBQUssQ0FBQ3hZLE1BQWpCLENBQUosRUFDSSxPQUFPekIsU0FBUDtBQUNKLFlBQUlrYSxHQUFHLEdBQUcsRUFBVjs7QUFDQSxhQUFLLElBQUlyWCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHb1gsS0FBSyxDQUFDeFksTUFBMUIsRUFBa0MsRUFBRW9CLENBQXBDO0FBQ0lxWCxVQUFBQSxHQUFHLENBQUNELEtBQUssQ0FBQ3BYLENBQUQsQ0FBTCxDQUFTdkMsSUFBVixDQUFILEdBQXFCMlosS0FBSyxDQUFDcFgsQ0FBRCxDQUFMLENBQVM0UixNQUFULENBQWdCQyxhQUFoQixDQUFyQjtBQURKOztBQUVBLGVBQU93RixHQUFQO0FBQ0g7O0FBRURoRyxNQUFBQSxTQUFTLENBQUM4RixXQUFWLEdBQXdCQSxXQUF4QjtBQUVBOzs7Ozs7O0FBTUE5RixNQUFBQSxTQUFTLENBQUNjLFlBQVYsR0FBeUIsU0FBU0EsWUFBVCxDQUFzQlYsUUFBdEIsRUFBZ0M5RixFQUFoQyxFQUFvQztBQUN6RCxZQUFJOEYsUUFBSixFQUNJLEtBQUssSUFBSXpSLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5UixRQUFRLENBQUM3UyxNQUE3QixFQUFxQyxFQUFFb0IsQ0FBdkM7QUFDSSxjQUFJLE9BQU95UixRQUFRLENBQUN6UixDQUFELENBQWYsS0FBdUIsUUFBdkIsSUFBbUN5UixRQUFRLENBQUN6UixDQUFELENBQVIsQ0FBWSxDQUFaLEtBQWtCMkwsRUFBckQsSUFBMkQ4RixRQUFRLENBQUN6UixDQUFELENBQVIsQ0FBWSxDQUFaLEtBQWtCMkwsRUFBakYsRUFDSSxPQUFPLElBQVA7QUFGUjtBQUdKLGVBQU8sS0FBUDtBQUNILE9BTkQ7QUFRQTs7Ozs7Ozs7QUFNQTBGLE1BQUFBLFNBQVMsQ0FBQ2UsY0FBVixHQUEyQixTQUFTQSxjQUFULENBQXdCWCxRQUF4QixFQUFrQ2hVLElBQWxDLEVBQXdDO0FBQy9ELFlBQUlnVSxRQUFKLEVBQ0ksS0FBSyxJQUFJelIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lSLFFBQVEsQ0FBQzdTLE1BQTdCLEVBQXFDLEVBQUVvQixDQUF2QztBQUNJLGNBQUl5UixRQUFRLENBQUN6UixDQUFELENBQVIsS0FBZ0J2QyxJQUFwQixFQUNJLE9BQU8sSUFBUDtBQUZSO0FBR0osZUFBTyxLQUFQO0FBQ0gsT0FORDtBQVFBOzs7Ozs7Ozs7Ozs7O0FBV0EsZUFBUzRULFNBQVQsQ0FBbUI1VCxJQUFuQixFQUF5QnVHLE9BQXpCLEVBQWtDO0FBQzlCaU4sUUFBQUEsZ0JBQWdCLENBQUN0VCxJQUFqQixDQUFzQixJQUF0QixFQUE0QkYsSUFBNUIsRUFBa0N1RyxPQUFsQztBQUVBOzs7OztBQUlBLGFBQUtxSCxNQUFMLEdBQWNsTyxTQUFkLENBUDhCLENBT0w7O0FBRXpCOzs7Ozs7QUFLQSxhQUFLbWEsWUFBTCxHQUFvQixJQUFwQjtBQUNIOztBQUVELGVBQVNDLFVBQVQsQ0FBb0JDLFNBQXBCLEVBQStCO0FBQzNCQSxRQUFBQSxTQUFTLENBQUNGLFlBQVYsR0FBeUIsSUFBekI7QUFDQSxlQUFPRSxTQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7QUFNQXZWLE1BQUFBLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0I3QixTQUFTLENBQUNqTyxTQUFoQyxFQUEyQyxhQUEzQyxFQUEwRDtBQUN0RDBLLFFBQUFBLEdBQUcsRUFBRSxlQUFXO0FBQ1osaUJBQU8sS0FBS3dKLFlBQUwsS0FBc0IsS0FBS0EsWUFBTCxHQUFvQnBaLElBQUksQ0FBQ3VaLE9BQUwsQ0FBYSxLQUFLcE0sTUFBbEIsQ0FBMUMsQ0FBUDtBQUNIO0FBSHFELE9BQTFEO0FBTUE7Ozs7Ozs7QUFPQTs7Ozs7O0FBTUE7Ozs7O0FBS0E7O0FBRUE7Ozs7OztBQUtBZ0csTUFBQUEsU0FBUyxDQUFDak8sU0FBVixDQUFvQndPLE1BQXBCLEdBQTZCLFNBQVNBLE1BQVQsQ0FBZ0JDLGFBQWhCLEVBQStCO0FBQ3hELGVBQU8zVCxJQUFJLENBQUNnUixRQUFMLENBQWMsQ0FDakIsU0FEaUIsRUFDTCxLQUFLbEwsT0FEQSxFQUVqQixRQUZpQixFQUVMbVQsV0FBVyxDQUFDLEtBQUtPLFdBQU4sRUFBbUI3RixhQUFuQixDQUZOLENBQWQsQ0FBUDtBQUlILE9BTEQ7QUFPQTs7Ozs7OztBQUtBUixNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9COFQsT0FBcEIsR0FBOEIsU0FBU0EsT0FBVCxDQUFpQlMsVUFBakIsRUFBNkI7QUFDdkQsWUFBSUMsRUFBRSxHQUFHLElBQVQ7QUFDQTs7QUFDQSxZQUFJRCxVQUFKLEVBQWdCO0FBQ1osZUFBSyxJQUFJRSxLQUFLLEdBQUc1VixNQUFNLENBQUNDLElBQVAsQ0FBWXlWLFVBQVosQ0FBWixFQUFxQzNYLENBQUMsR0FBRyxDQUF6QyxFQUE0Q3FMLE1BQWpELEVBQXlEckwsQ0FBQyxHQUFHNlgsS0FBSyxDQUFDalosTUFBbkUsRUFBMkUsRUFBRW9CLENBQTdFLEVBQWdGO0FBQzVFcUwsWUFBQUEsTUFBTSxHQUFHc00sVUFBVSxDQUFDRSxLQUFLLENBQUM3WCxDQUFELENBQU4sQ0FBbkI7QUFDQTRYLFlBQUFBLEVBQUUsQ0FBQzVGLEdBQUgsRUFBUTtBQUNKLGFBQUUzRyxNQUFNLENBQUNHLE1BQVAsS0FBa0JyTyxTQUFsQixHQUNBcVYsSUFBSSxDQUFDZCxRQURMLEdBRUFyRyxNQUFNLENBQUMwQixNQUFQLEtBQWtCNVAsU0FBbEIsR0FDQThRLElBQUksQ0FBQ3lELFFBREwsR0FFQXJHLE1BQU0sQ0FBQ3lNLE9BQVAsS0FBbUIzYSxTQUFuQixHQUNBZ1ksT0FBTyxDQUFDekQsUUFEUixHQUVBckcsTUFBTSxDQUFDTSxFQUFQLEtBQWN4TyxTQUFkLEdBQ0FvVixLQUFLLENBQUNiLFFBRE4sR0FFQUwsU0FBUyxDQUFDSyxRQVJaLEVBUXVCbUcsS0FBSyxDQUFDN1gsQ0FBRCxDQVI1QixFQVFpQ3FMLE1BUmpDLENBREo7QUFXSDtBQUNKOztBQUNELGVBQU8sSUFBUDtBQUNILE9BcEJEO0FBc0JBOzs7Ozs7O0FBS0FnRyxNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9CMEssR0FBcEIsR0FBMEIsU0FBU0EsR0FBVCxDQUFhclEsSUFBYixFQUFtQjtBQUN6QyxlQUFPLEtBQUs0TixNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZNU4sSUFBWixDQUFmLElBQ0EsSUFEUDtBQUVILE9BSEQ7QUFLQTs7Ozs7Ozs7O0FBT0E0VCxNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9CMlUsT0FBcEIsR0FBOEIsU0FBU0EsT0FBVCxDQUFpQnRhLElBQWpCLEVBQXVCO0FBQ2pELFlBQUksS0FBSzROLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVk1TixJQUFaLGFBQTZCd1EsSUFBaEQsRUFDSSxPQUFPLEtBQUs1QyxNQUFMLENBQVk1TixJQUFaLEVBQWtCc1AsTUFBekI7QUFDSixjQUFNNUwsS0FBSyxDQUFDLG1CQUFtQjFELElBQXBCLENBQVg7QUFDSCxPQUpEO0FBTUE7Ozs7Ozs7OztBQU9BNFQsTUFBQUEsU0FBUyxDQUFDak8sU0FBVixDQUFvQjRPLEdBQXBCLEdBQTBCLFNBQVNBLEdBQVQsQ0FBYTJFLE1BQWIsRUFBcUI7QUFFM0MsWUFBSSxFQUFFQSxNQUFNLFlBQVlwRSxLQUFsQixJQUEyQm9FLE1BQU0sQ0FBQ2pFLE1BQVAsS0FBa0J2VixTQUE3QyxJQUEwRHdaLE1BQU0sWUFBWW5FLElBQTVFLElBQW9GbUUsTUFBTSxZQUFZMUksSUFBdEcsSUFBOEcwSSxNQUFNLFlBQVl4QixPQUFoSSxJQUEySXdCLE1BQU0sWUFBWXRGLFNBQS9KLENBQUosRUFDSSxNQUFNRyxTQUFTLENBQUMsc0NBQUQsQ0FBZjtBQUVKLFlBQUksQ0FBQyxLQUFLbkcsTUFBVixFQUNJLEtBQUtBLE1BQUwsR0FBYyxFQUFkLENBREosS0FFSztBQUNELGNBQUkyTSxJQUFJLEdBQUcsS0FBS2xLLEdBQUwsQ0FBUzZJLE1BQU0sQ0FBQ2xaLElBQWhCLENBQVg7O0FBQ0EsY0FBSXVhLElBQUosRUFBVTtBQUNOLGdCQUFJQSxJQUFJLFlBQVkzRyxTQUFoQixJQUE2QnNGLE1BQU0sWUFBWXRGLFNBQS9DLElBQTRELEVBQUUyRyxJQUFJLFlBQVl4RixJQUFoQixJQUF3QndGLElBQUksWUFBWTdDLE9BQTFDLENBQWhFLEVBQW9IO0FBQ2hIO0FBQ0Esa0JBQUk5SixNQUFNLEdBQUcyTSxJQUFJLENBQUNOLFdBQWxCOztBQUNBLG1CQUFLLElBQUkxWCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcUwsTUFBTSxDQUFDek0sTUFBM0IsRUFBbUMsRUFBRW9CLENBQXJDO0FBQ0kyVyxnQkFBQUEsTUFBTSxDQUFDM0UsR0FBUCxDQUFXM0csTUFBTSxDQUFDckwsQ0FBRCxDQUFqQjtBQURKOztBQUVBLG1CQUFLc1MsTUFBTCxDQUFZMEYsSUFBWjtBQUNBLGtCQUFJLENBQUMsS0FBSzNNLE1BQVYsRUFDSSxLQUFLQSxNQUFMLEdBQWMsRUFBZDtBQUNKc0wsY0FBQUEsTUFBTSxDQUFDc0IsVUFBUCxDQUFrQkQsSUFBSSxDQUFDaFUsT0FBdkIsRUFBZ0MsSUFBaEM7QUFFSCxhQVZELE1BV0ksTUFBTTdDLEtBQUssQ0FBQyxxQkFBcUJ3VixNQUFNLENBQUNsWixJQUE1QixHQUFtQyxPQUFuQyxHQUE2QyxJQUE5QyxDQUFYO0FBQ1A7QUFDSjtBQUNELGFBQUs0TixNQUFMLENBQVlzTCxNQUFNLENBQUNsWixJQUFuQixJQUEyQmtaLE1BQTNCO0FBQ0FBLFFBQUFBLE1BQU0sQ0FBQ3VCLEtBQVAsQ0FBYSxJQUFiO0FBQ0EsZUFBT1gsVUFBVSxDQUFDLElBQUQsQ0FBakI7QUFDSCxPQTNCRDtBQTZCQTs7Ozs7Ozs7O0FBT0FsRyxNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9Ca1AsTUFBcEIsR0FBNkIsU0FBU0EsTUFBVCxDQUFnQnFFLE1BQWhCLEVBQXdCO0FBRWpELFlBQUksRUFBRUEsTUFBTSxZQUFZMUYsZ0JBQXBCLENBQUosRUFDSSxNQUFNTyxTQUFTLENBQUMsbUNBQUQsQ0FBZjtBQUNKLFlBQUltRixNQUFNLENBQUNuRCxNQUFQLEtBQWtCLElBQXRCLEVBQ0ksTUFBTXJTLEtBQUssQ0FBQ3dWLE1BQU0sR0FBRyxzQkFBVCxHQUFrQyxJQUFuQyxDQUFYO0FBRUosZUFBTyxLQUFLdEwsTUFBTCxDQUFZc0wsTUFBTSxDQUFDbFosSUFBbkIsQ0FBUDtBQUNBLFlBQUksQ0FBQ3dFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUttSixNQUFqQixFQUF5QnpNLE1BQTlCLEVBQ0ksS0FBS3lNLE1BQUwsR0FBY2xPLFNBQWQ7QUFFSndaLFFBQUFBLE1BQU0sQ0FBQ3dCLFFBQVAsQ0FBZ0IsSUFBaEI7QUFDQSxlQUFPWixVQUFVLENBQUMsSUFBRCxDQUFqQjtBQUNILE9BYkQ7QUFlQTs7Ozs7Ozs7QUFNQWxHLE1BQUFBLFNBQVMsQ0FBQ2pPLFNBQVYsQ0FBb0J0RixNQUFwQixHQUE2QixTQUFTQSxNQUFULENBQWdCMEwsSUFBaEIsRUFBc0I0QixJQUF0QixFQUE0QjtBQUVyRCxZQUFJbE4sSUFBSSxDQUFDK1QsUUFBTCxDQUFjekksSUFBZCxDQUFKLEVBQ0lBLElBQUksR0FBR0EsSUFBSSxDQUFDRyxLQUFMLENBQVcsR0FBWCxDQUFQLENBREosS0FFSyxJQUFJLENBQUNqTCxLQUFLLENBQUMwWixPQUFOLENBQWM1TyxJQUFkLENBQUwsRUFDRCxNQUFNZ0ksU0FBUyxDQUFDLGNBQUQsQ0FBZjtBQUNKLFlBQUloSSxJQUFJLElBQUlBLElBQUksQ0FBQzVLLE1BQWIsSUFBdUI0SyxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQVksRUFBdkMsRUFDSSxNQUFNckksS0FBSyxDQUFDLHVCQUFELENBQVg7QUFFSixZQUFJa1gsR0FBRyxHQUFHLElBQVY7O0FBQ0EsZUFBTzdPLElBQUksQ0FBQzVLLE1BQUwsR0FBYyxDQUFyQixFQUF3QjtBQUNwQixjQUFJMFosSUFBSSxHQUFHOU8sSUFBSSxDQUFDTSxLQUFMLEVBQVg7O0FBQ0EsY0FBSXVPLEdBQUcsQ0FBQ2hOLE1BQUosSUFBY2dOLEdBQUcsQ0FBQ2hOLE1BQUosQ0FBV2lOLElBQVgsQ0FBbEIsRUFBb0M7QUFDaENELFlBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDaE4sTUFBSixDQUFXaU4sSUFBWCxDQUFOO0FBQ0EsZ0JBQUksRUFBRUQsR0FBRyxZQUFZaEgsU0FBakIsQ0FBSixFQUNJLE1BQU1sUSxLQUFLLENBQUMsMkNBQUQsQ0FBWDtBQUNQLFdBSkQsTUFLSWtYLEdBQUcsQ0FBQ3JHLEdBQUosQ0FBUXFHLEdBQUcsR0FBRyxJQUFJaEgsU0FBSixDQUFjaUgsSUFBZCxDQUFkO0FBQ1A7O0FBQ0QsWUFBSWxOLElBQUosRUFDSWlOLEdBQUcsQ0FBQ25CLE9BQUosQ0FBWTlMLElBQVo7QUFDSixlQUFPaU4sR0FBUDtBQUNILE9BdEJEO0FBd0JBOzs7Ozs7QUFJQWhILE1BQUFBLFNBQVMsQ0FBQ2pPLFNBQVYsQ0FBb0JtVixVQUFwQixHQUFpQyxTQUFTQSxVQUFULEdBQXNCO0FBQ25ELFlBQUlsTixNQUFNLEdBQUcsS0FBS3FNLFdBQWxCO0FBQUEsWUFBK0IxWCxDQUFDLEdBQUcsQ0FBbkM7O0FBQ0EsZUFBT0EsQ0FBQyxHQUFHcUwsTUFBTSxDQUFDek0sTUFBbEI7QUFDSSxjQUFJeU0sTUFBTSxDQUFDckwsQ0FBRCxDQUFOLFlBQXFCcVIsU0FBekIsRUFDSWhHLE1BQU0sQ0FBQ3JMLENBQUMsRUFBRixDQUFOLENBQVl1WSxVQUFaLEdBREosS0FHSWxOLE1BQU0sQ0FBQ3JMLENBQUMsRUFBRixDQUFOLENBQVlkLE9BQVo7QUFKUjs7QUFLQSxlQUFPLEtBQUtBLE9BQUwsRUFBUDtBQUNILE9BUkQ7QUFVQTs7Ozs7Ozs7O0FBT0FtUyxNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9Cb1YsTUFBcEIsR0FBNkIsU0FBU0EsTUFBVCxDQUFnQmhQLElBQWhCLEVBQXNCaVAsV0FBdEIsRUFBbUNDLG9CQUFuQyxFQUF5RDtBQUVsRjtBQUNBLFlBQUksT0FBT0QsV0FBUCxLQUF1QixTQUEzQixFQUFzQztBQUNsQ0MsVUFBQUEsb0JBQW9CLEdBQUdELFdBQXZCO0FBQ0FBLFVBQUFBLFdBQVcsR0FBR3RiLFNBQWQ7QUFDSCxTQUhELE1BR08sSUFBSXNiLFdBQVcsSUFBSSxDQUFDL1osS0FBSyxDQUFDMFosT0FBTixDQUFjSyxXQUFkLENBQXBCLEVBQ0hBLFdBQVcsR0FBRyxDQUFFQSxXQUFGLENBQWQ7O0FBRUosWUFBSXZhLElBQUksQ0FBQytULFFBQUwsQ0FBY3pJLElBQWQsS0FBdUJBLElBQUksQ0FBQzVLLE1BQWhDLEVBQXdDO0FBQ3BDLGNBQUk0SyxJQUFJLEtBQUssR0FBYixFQUNJLE9BQU8sS0FBS3FMLElBQVo7QUFDSnJMLFVBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDRyxLQUFMLENBQVcsR0FBWCxDQUFQO0FBQ0gsU0FKRCxNQUlPLElBQUksQ0FBQ0gsSUFBSSxDQUFDNUssTUFBVixFQUNILE9BQU8sSUFBUCxDQWQ4RSxDQWdCbEY7OztBQUNBLFlBQUk0SyxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQVksRUFBaEIsRUFDSSxPQUFPLEtBQUtxTCxJQUFMLENBQVUyRCxNQUFWLENBQWlCaFAsSUFBSSxDQUFDM0ksS0FBTCxDQUFXLENBQVgsQ0FBakIsRUFBZ0M0WCxXQUFoQyxDQUFQLENBbEI4RSxDQW9CbEY7O0FBQ0EsWUFBSUUsS0FBSyxHQUFHLEtBQUs3SyxHQUFMLENBQVN0RSxJQUFJLENBQUMsQ0FBRCxDQUFiLENBQVo7O0FBQ0EsWUFBSW1QLEtBQUosRUFBVztBQUNQLGNBQUluUCxJQUFJLENBQUM1SyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLGdCQUFJLENBQUM2WixXQUFELElBQWdCQSxXQUFXLENBQUN4SSxPQUFaLENBQW9CMEksS0FBSyxDQUFDeEgsV0FBMUIsSUFBeUMsQ0FBQyxDQUE5RCxFQUNJLE9BQU93SCxLQUFQO0FBQ1AsV0FIRCxNQUdPLElBQUlBLEtBQUssWUFBWXRILFNBQWpCLEtBQStCc0gsS0FBSyxHQUFHQSxLQUFLLENBQUNILE1BQU4sQ0FBYWhQLElBQUksQ0FBQzNJLEtBQUwsQ0FBVyxDQUFYLENBQWIsRUFBNEI0WCxXQUE1QixFQUF5QyxJQUF6QyxDQUF2QyxDQUFKLEVBQ0gsT0FBT0UsS0FBUCxDQUxHLENBT1g7O0FBQ0MsU0FSRCxNQVNJLEtBQUssSUFBSTNZLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzBYLFdBQUwsQ0FBaUI5WSxNQUFyQyxFQUE2QyxFQUFFb0IsQ0FBL0M7QUFDSSxjQUFJLEtBQUtzWCxZQUFMLENBQWtCdFgsQ0FBbEIsYUFBZ0NxUixTQUFoQyxLQUE4Q3NILEtBQUssR0FBRyxLQUFLckIsWUFBTCxDQUFrQnRYLENBQWxCLEVBQXFCd1ksTUFBckIsQ0FBNEJoUCxJQUE1QixFQUFrQ2lQLFdBQWxDLEVBQStDLElBQS9DLENBQXRELENBQUosRUFDSSxPQUFPRSxLQUFQO0FBRlIsU0EvQjhFLENBbUNsRjs7O0FBQ0EsWUFBSSxLQUFLbkYsTUFBTCxLQUFnQixJQUFoQixJQUF3QmtGLG9CQUE1QixFQUNJLE9BQU8sSUFBUDtBQUNKLGVBQU8sS0FBS2xGLE1BQUwsQ0FBWWdGLE1BQVosQ0FBbUJoUCxJQUFuQixFQUF5QmlQLFdBQXpCLENBQVA7QUFDSCxPQXZDRDtBQXlDQTs7Ozs7Ozs7O0FBU0E7O0FBRUE7Ozs7Ozs7OztBQU9BcEgsTUFBQUEsU0FBUyxDQUFDak8sU0FBVixDQUFvQjZULFVBQXBCLEdBQWlDLFNBQVNBLFVBQVQsQ0FBb0J6TixJQUFwQixFQUEwQjtBQUN2RCxZQUFJbVAsS0FBSyxHQUFHLEtBQUtILE1BQUwsQ0FBWWhQLElBQVosRUFBa0IsQ0FBRWdKLElBQUYsQ0FBbEIsQ0FBWjtBQUNBLFlBQUksQ0FBQ21HLEtBQUwsRUFDSSxNQUFNeFgsS0FBSyxDQUFDLG1CQUFtQnFJLElBQXBCLENBQVg7QUFDSixlQUFPbVAsS0FBUDtBQUNILE9BTEQ7QUFPQTs7Ozs7Ozs7O0FBT0F0SCxNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9Cd1YsVUFBcEIsR0FBaUMsU0FBU0EsVUFBVCxDQUFvQnBQLElBQXBCLEVBQTBCO0FBQ3ZELFlBQUltUCxLQUFLLEdBQUcsS0FBS0gsTUFBTCxDQUFZaFAsSUFBWixFQUFrQixDQUFFeUUsSUFBRixDQUFsQixDQUFaO0FBQ0EsWUFBSSxDQUFDMEssS0FBTCxFQUNJLE1BQU14WCxLQUFLLENBQUMsbUJBQW1CcUksSUFBbkIsR0FBMEIsT0FBMUIsR0FBb0MsSUFBckMsQ0FBWDtBQUNKLGVBQU9tUCxLQUFQO0FBQ0gsT0FMRDtBQU9BOzs7Ozs7Ozs7QUFPQXRILE1BQUFBLFNBQVMsQ0FBQ2pPLFNBQVYsQ0FBb0JxUSxnQkFBcEIsR0FBdUMsU0FBU0EsZ0JBQVQsQ0FBMEJqSyxJQUExQixFQUFnQztBQUNuRSxZQUFJbVAsS0FBSyxHQUFHLEtBQUtILE1BQUwsQ0FBWWhQLElBQVosRUFBa0IsQ0FBRWdKLElBQUYsRUFBUXZFLElBQVIsQ0FBbEIsQ0FBWjtBQUNBLFlBQUksQ0FBQzBLLEtBQUwsRUFDSSxNQUFNeFgsS0FBSyxDQUFDLDJCQUEyQnFJLElBQTNCLEdBQWtDLE9BQWxDLEdBQTRDLElBQTdDLENBQVg7QUFDSixlQUFPbVAsS0FBUDtBQUNILE9BTEQ7QUFPQTs7Ozs7Ozs7O0FBT0F0SCxNQUFBQSxTQUFTLENBQUNqTyxTQUFWLENBQW9CeVYsYUFBcEIsR0FBb0MsU0FBU0EsYUFBVCxDQUF1QnJQLElBQXZCLEVBQTZCO0FBQzdELFlBQUltUCxLQUFLLEdBQUcsS0FBS0gsTUFBTCxDQUFZaFAsSUFBWixFQUFrQixDQUFFMkwsT0FBRixDQUFsQixDQUFaO0FBQ0EsWUFBSSxDQUFDd0QsS0FBTCxFQUNJLE1BQU14WCxLQUFLLENBQUMsc0JBQXNCcUksSUFBdEIsR0FBNkIsT0FBN0IsR0FBdUMsSUFBeEMsQ0FBWDtBQUNKLGVBQU9tUCxLQUFQO0FBQ0gsT0FMRDs7QUFPQXRILE1BQUFBLFNBQVMsQ0FBQ29ELFVBQVYsR0FBdUIsVUFBU0MsS0FBVCxFQUFnQm9FLFFBQWhCLEVBQTBCO0FBQzdDdEcsUUFBQUEsSUFBSSxHQUFNa0MsS0FBVjtBQUNBUyxRQUFBQSxPQUFPLEdBQUcyRCxRQUFWO0FBQ0gsT0FIRDtBQUtDLEtBamJ1QixFQWlidEI7QUFBQyxZQUFLLEVBQU47QUFBUyxZQUFLLEVBQWQ7QUFBaUIsWUFBSyxFQUF0QjtBQUF5QixZQUFLO0FBQTlCLEtBamJzQixDQXRtR0Q7QUF1aEhjLFFBQUcsQ0FBQyxVQUFTemEsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ3pFOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJxVCxnQkFBakI7QUFFQUEsTUFBQUEsZ0JBQWdCLENBQUNHLFNBQWpCLEdBQTZCLGtCQUE3Qjs7QUFFQSxVQUFJbFQsSUFBSSxHQUFHRyxPQUFPLENBQUMsRUFBRCxDQUFsQjs7QUFFQSxVQUFJeVcsSUFBSixDQVJ5RSxDQVEvRDs7QUFFVjs7Ozs7Ozs7O0FBUUEsZUFBUzdELGdCQUFULENBQTBCeFQsSUFBMUIsRUFBZ0N1RyxPQUFoQyxFQUF5QztBQUVyQyxZQUFJLENBQUM5RixJQUFJLENBQUMrVCxRQUFMLENBQWN4VSxJQUFkLENBQUwsRUFDSSxNQUFNK1QsU0FBUyxDQUFDLHVCQUFELENBQWY7QUFFSixZQUFJeE4sT0FBTyxJQUFJLENBQUM5RixJQUFJLENBQUN5VSxRQUFMLENBQWMzTyxPQUFkLENBQWhCLEVBQ0ksTUFBTXdOLFNBQVMsQ0FBQywyQkFBRCxDQUFmO0FBRUo7Ozs7O0FBSUEsYUFBS3hOLE9BQUwsR0FBZUEsT0FBZixDQVpxQyxDQVliOztBQUV4Qjs7Ozs7QUFJQSxhQUFLdkcsSUFBTCxHQUFZQSxJQUFaO0FBRUE7Ozs7O0FBSUEsYUFBSytWLE1BQUwsR0FBYyxJQUFkO0FBRUE7Ozs7O0FBSUEsYUFBS0YsUUFBTCxHQUFnQixLQUFoQjtBQUVBOzs7OztBQUlBLGFBQUtoQyxPQUFMLEdBQWUsSUFBZjtBQUVBOzs7OztBQUlBLGFBQUt2TixRQUFMLEdBQWdCLElBQWhCO0FBQ0g7O0FBRUQ5QixNQUFBQSxNQUFNLENBQUM4VyxnQkFBUCxDQUF3QjlILGdCQUFnQixDQUFDN04sU0FBekMsRUFBb0Q7QUFFaEQ7Ozs7OztBQU1BeVIsUUFBQUEsSUFBSSxFQUFFO0FBQ0YvRyxVQUFBQSxHQUFHLEVBQUUsZUFBVztBQUNaLGdCQUFJdUssR0FBRyxHQUFHLElBQVY7O0FBQ0EsbUJBQU9BLEdBQUcsQ0FBQzdFLE1BQUosS0FBZSxJQUF0QjtBQUNJNkUsY0FBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUM3RSxNQUFWO0FBREo7O0FBRUEsbUJBQU82RSxHQUFQO0FBQ0g7QUFOQyxTQVIwQzs7QUFpQmhEOzs7Ozs7QUFNQTNKLFFBQUFBLFFBQVEsRUFBRTtBQUNOWixVQUFBQSxHQUFHLEVBQUUsZUFBVztBQUNaLGdCQUFJdEUsSUFBSSxHQUFHLENBQUUsS0FBSy9MLElBQVAsQ0FBWDtBQUFBLGdCQUNJNGEsR0FBRyxHQUFHLEtBQUs3RSxNQURmOztBQUVBLG1CQUFPNkUsR0FBUCxFQUFZO0FBQ1I3TyxjQUFBQSxJQUFJLENBQUN3UCxPQUFMLENBQWFYLEdBQUcsQ0FBQzVhLElBQWpCO0FBQ0E0YSxjQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQzdFLE1BQVY7QUFDSDs7QUFDRCxtQkFBT2hLLElBQUksQ0FBQzFJLElBQUwsQ0FBVSxHQUFWLENBQVA7QUFDSDtBQVRLO0FBdkJzQyxPQUFwRDtBQW9DQTs7Ozs7O0FBS0FtUSxNQUFBQSxnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCd08sTUFBM0I7QUFBb0M7QUFBMkIsZUFBU0EsTUFBVCxHQUFrQjtBQUM3RSxjQUFNelEsS0FBSyxFQUFYLENBRDZFLENBQzlEO0FBQ2xCLE9BRkQ7QUFJQTs7Ozs7OztBQUtBOFAsTUFBQUEsZ0JBQWdCLENBQUM3TixTQUFqQixDQUEyQjhVLEtBQTNCLEdBQW1DLFNBQVNBLEtBQVQsQ0FBZTFFLE1BQWYsRUFBdUI7QUFDdEQsWUFBSSxLQUFLQSxNQUFMLElBQWUsS0FBS0EsTUFBTCxLQUFnQkEsTUFBbkMsRUFDSSxLQUFLQSxNQUFMLENBQVlsQixNQUFaLENBQW1CLElBQW5CO0FBQ0osYUFBS2tCLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtGLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxZQUFJdUIsSUFBSSxHQUFHckIsTUFBTSxDQUFDcUIsSUFBbEI7QUFDQSxZQUFJQSxJQUFJLFlBQVlDLElBQXBCLEVBQ0lELElBQUksQ0FBQ29FLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDUCxPQVJEO0FBVUE7Ozs7Ozs7QUFLQWhJLE1BQUFBLGdCQUFnQixDQUFDN04sU0FBakIsQ0FBMkIrVSxRQUEzQixHQUFzQyxTQUFTQSxRQUFULENBQWtCM0UsTUFBbEIsRUFBMEI7QUFDNUQsWUFBSXFCLElBQUksR0FBR3JCLE1BQU0sQ0FBQ3FCLElBQWxCO0FBQ0EsWUFBSUEsSUFBSSxZQUFZQyxJQUFwQixFQUNJRCxJQUFJLENBQUNxRSxhQUFMLENBQW1CLElBQW5CO0FBQ0osYUFBSzFGLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBS0YsUUFBTCxHQUFnQixLQUFoQjtBQUNILE9BTkQ7QUFRQTs7Ozs7O0FBSUFyQyxNQUFBQSxnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCbEUsT0FBM0IsR0FBcUMsU0FBU0EsT0FBVCxHQUFtQjtBQUNwRCxZQUFJLEtBQUtvVSxRQUFULEVBQ0ksT0FBTyxJQUFQO0FBQ0osWUFBSSxLQUFLdUIsSUFBTCxZQUFxQkMsSUFBekIsRUFDSSxLQUFLeEIsUUFBTCxHQUFnQixJQUFoQixDQUpnRCxDQUkxQjs7QUFDMUIsZUFBTyxJQUFQO0FBQ0gsT0FORDtBQVFBOzs7Ozs7O0FBS0FyQyxNQUFBQSxnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCK1AsU0FBM0IsR0FBdUMsU0FBU0EsU0FBVCxDQUFtQjFWLElBQW5CLEVBQXlCO0FBQzVELFlBQUksS0FBS3VHLE9BQVQsRUFDSSxPQUFPLEtBQUtBLE9BQUwsQ0FBYXZHLElBQWIsQ0FBUDtBQUNKLGVBQU9OLFNBQVA7QUFDSCxPQUpEO0FBTUE7Ozs7Ozs7OztBQU9BOFQsTUFBQUEsZ0JBQWdCLENBQUM3TixTQUFqQixDQUEyQmdRLFNBQTNCLEdBQXVDLFNBQVNBLFNBQVQsQ0FBbUIzVixJQUFuQixFQUF5Qm1GLEtBQXpCLEVBQWdDeVEsUUFBaEMsRUFBMEM7QUFDN0UsWUFBSSxDQUFDQSxRQUFELElBQWEsQ0FBQyxLQUFLclAsT0FBbkIsSUFBOEIsS0FBS0EsT0FBTCxDQUFhdkcsSUFBYixNQUF1Qk4sU0FBekQsRUFDSSxDQUFDLEtBQUs2RyxPQUFMLEtBQWlCLEtBQUtBLE9BQUwsR0FBZSxFQUFoQyxDQUFELEVBQXNDdkcsSUFBdEMsSUFBOENtRixLQUE5QztBQUNKLGVBQU8sSUFBUDtBQUNILE9BSkQ7QUFNQTs7Ozs7Ozs7QUFNQXFPLE1BQUFBLGdCQUFnQixDQUFDN04sU0FBakIsQ0FBMkI2VSxVQUEzQixHQUF3QyxTQUFTQSxVQUFULENBQW9CalUsT0FBcEIsRUFBNkJxUCxRQUE3QixFQUF1QztBQUMzRSxZQUFJclAsT0FBSixFQUNJLEtBQUssSUFBSTlCLElBQUksR0FBR0QsTUFBTSxDQUFDQyxJQUFQLENBQVk4QixPQUFaLENBQVgsRUFBaUNoRSxDQUFDLEdBQUcsQ0FBMUMsRUFBNkNBLENBQUMsR0FBR2tDLElBQUksQ0FBQ3RELE1BQXRELEVBQThELEVBQUVvQixDQUFoRTtBQUNJLGVBQUtvVCxTQUFMLENBQWVsUixJQUFJLENBQUNsQyxDQUFELENBQW5CLEVBQXdCZ0UsT0FBTyxDQUFDOUIsSUFBSSxDQUFDbEMsQ0FBRCxDQUFMLENBQS9CLEVBQTBDcVQsUUFBMUM7QUFESjtBQUVKLGVBQU8sSUFBUDtBQUNILE9BTEQ7QUFPQTs7Ozs7O0FBSUFwQyxNQUFBQSxnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCeEIsUUFBM0IsR0FBc0MsU0FBU0EsUUFBVCxHQUFvQjtBQUN0RCxZQUFJd1AsU0FBUyxHQUFHLEtBQUtELFdBQUwsQ0FBaUJDLFNBQWpDO0FBQUEsWUFDSTFDLFFBQVEsR0FBSSxLQUFLQSxRQURyQjtBQUVBLFlBQUlBLFFBQVEsQ0FBQzlQLE1BQWIsRUFDSSxPQUFPd1MsU0FBUyxHQUFHLEdBQVosR0FBa0IxQyxRQUF6QjtBQUNKLGVBQU8wQyxTQUFQO0FBQ0gsT0FORDs7QUFRQUgsTUFBQUEsZ0JBQWdCLENBQUN3RCxVQUFqQixHQUE4QixVQUFTMEUsS0FBVCxFQUFnQjtBQUMxQ3JFLFFBQUFBLElBQUksR0FBR3FFLEtBQVA7QUFDSCxPQUZEO0FBSUMsS0F6TXVDLEVBeU10QztBQUFDLFlBQUs7QUFBTixLQXpNc0MsQ0F2aEhqQjtBQWd1SFYsUUFBRyxDQUFDLFVBQVM5YSxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakQ7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQnFYLEtBQWpCLENBRmlELENBSWpEOztBQUNBLFVBQUloRSxnQkFBZ0IsR0FBRzVTLE9BQU8sQ0FBQyxFQUFELENBQTlCOztBQUNBLE9BQUMsQ0FBQzRXLEtBQUssQ0FBQzdSLFNBQU4sR0FBa0JuQixNQUFNLENBQUNpUCxNQUFQLENBQWNELGdCQUFnQixDQUFDN04sU0FBL0IsQ0FBbkIsRUFBOEQrTixXQUE5RCxHQUE0RThELEtBQTdFLEVBQW9GN0QsU0FBcEYsR0FBZ0csT0FBaEc7O0FBRUEsVUFBSW1CLEtBQUssR0FBR2xVLE9BQU8sQ0FBQyxFQUFELENBQW5CO0FBQUEsVUFDSUgsSUFBSSxHQUFJRyxPQUFPLENBQUMsRUFBRCxDQURuQjtBQUdBOzs7Ozs7Ozs7Ozs7QUFVQSxlQUFTNFcsS0FBVCxDQUFleFgsSUFBZixFQUFxQjJiLFVBQXJCLEVBQWlDcFYsT0FBakMsRUFBMENzTixPQUExQyxFQUFtRDtBQUMvQyxZQUFJLENBQUM1UyxLQUFLLENBQUMwWixPQUFOLENBQWNnQixVQUFkLENBQUwsRUFBZ0M7QUFDNUJwVixVQUFBQSxPQUFPLEdBQUdvVixVQUFWO0FBQ0FBLFVBQUFBLFVBQVUsR0FBR2pjLFNBQWI7QUFDSDs7QUFDRDhULFFBQUFBLGdCQUFnQixDQUFDdFQsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEJGLElBQTVCLEVBQWtDdUcsT0FBbEM7QUFFQTs7QUFDQSxZQUFJLEVBQUVvVixVQUFVLEtBQUtqYyxTQUFmLElBQTRCdUIsS0FBSyxDQUFDMFosT0FBTixDQUFjZ0IsVUFBZCxDQUE5QixDQUFKLEVBQ0ksTUFBTTVILFNBQVMsQ0FBQyw2QkFBRCxDQUFmO0FBRUo7Ozs7O0FBSUEsYUFBS2pGLEtBQUwsR0FBYTZNLFVBQVUsSUFBSSxFQUEzQixDQWYrQyxDQWVoQjs7QUFFL0I7Ozs7OztBQUtBLGFBQUt0SyxXQUFMLEdBQW1CLEVBQW5CLENBdEIrQyxDQXNCeEI7O0FBRXZCOzs7OztBQUlBLGFBQUt3QyxPQUFMLEdBQWVBLE9BQWY7QUFDSDtBQUVEOzs7Ozs7O0FBT0E7Ozs7Ozs7OztBQU9BMkQsTUFBQUEsS0FBSyxDQUFDdkQsUUFBTixHQUFpQixTQUFTQSxRQUFULENBQWtCalUsSUFBbEIsRUFBd0IyTixJQUF4QixFQUE4QjtBQUMzQyxlQUFPLElBQUk2SixLQUFKLENBQVV4WCxJQUFWLEVBQWdCMk4sSUFBSSxDQUFDbUIsS0FBckIsRUFBNEJuQixJQUFJLENBQUNwSCxPQUFqQyxFQUEwQ29ILElBQUksQ0FBQ2tHLE9BQS9DLENBQVA7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7QUFLQTJELE1BQUFBLEtBQUssQ0FBQzdSLFNBQU4sQ0FBZ0J3TyxNQUFoQixHQUF5QixTQUFTQSxNQUFULENBQWdCQyxhQUFoQixFQUErQjtBQUNwRCxZQUFJQyxZQUFZLEdBQUdELGFBQWEsR0FBR0UsT0FBTyxDQUFDRixhQUFhLENBQUNDLFlBQWYsQ0FBVixHQUF5QyxLQUF6RTtBQUNBLGVBQU81VCxJQUFJLENBQUNnUixRQUFMLENBQWMsQ0FDakIsU0FEaUIsRUFDTCxLQUFLbEwsT0FEQSxFQUVqQixPQUZpQixFQUVMLEtBQUt1SSxLQUZBLEVBR2pCLFNBSGlCLEVBR0x1RixZQUFZLEdBQUcsS0FBS1IsT0FBUixHQUFrQm5VLFNBSHpCLENBQWQsQ0FBUDtBQUtILE9BUEQ7QUFTQTs7Ozs7Ozs7O0FBT0EsZUFBU2tjLGlCQUFULENBQTJCOU0sS0FBM0IsRUFBa0M7QUFDOUIsWUFBSUEsS0FBSyxDQUFDaUgsTUFBVixFQUNJLEtBQUssSUFBSXhULENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd1TSxLQUFLLENBQUN1QyxXQUFOLENBQWtCbFEsTUFBdEMsRUFBOEMsRUFBRW9CLENBQWhEO0FBQ0ksY0FBSSxDQUFDdU0sS0FBSyxDQUFDdUMsV0FBTixDQUFrQjlPLENBQWxCLEVBQXFCd1QsTUFBMUIsRUFDSWpILEtBQUssQ0FBQ2lILE1BQU4sQ0FBYXhCLEdBQWIsQ0FBaUJ6RixLQUFLLENBQUN1QyxXQUFOLENBQWtCOU8sQ0FBbEIsQ0FBakI7QUFGUjtBQUdQO0FBRUQ7Ozs7Ozs7QUFLQWlWLE1BQUFBLEtBQUssQ0FBQzdSLFNBQU4sQ0FBZ0I0TyxHQUFoQixHQUFzQixTQUFTQSxHQUFULENBQWE1RCxLQUFiLEVBQW9CO0FBRXRDO0FBQ0EsWUFBSSxFQUFFQSxLQUFLLFlBQVltRSxLQUFuQixDQUFKLEVBQ0ksTUFBTWYsU0FBUyxDQUFDLHVCQUFELENBQWY7QUFFSixZQUFJcEQsS0FBSyxDQUFDb0YsTUFBTixJQUFnQnBGLEtBQUssQ0FBQ29GLE1BQU4sS0FBaUIsS0FBS0EsTUFBMUMsRUFDSXBGLEtBQUssQ0FBQ29GLE1BQU4sQ0FBYWxCLE1BQWIsQ0FBb0JsRSxLQUFwQjtBQUNKLGFBQUs3QixLQUFMLENBQVc3TCxJQUFYLENBQWdCME4sS0FBSyxDQUFDM1EsSUFBdEI7QUFDQSxhQUFLcVIsV0FBTCxDQUFpQnBPLElBQWpCLENBQXNCME4sS0FBdEI7QUFDQUEsUUFBQUEsS0FBSyxDQUFDb0IsTUFBTixHQUFlLElBQWYsQ0FWc0MsQ0FVakI7O0FBQ3JCNkosUUFBQUEsaUJBQWlCLENBQUMsSUFBRCxDQUFqQjtBQUNBLGVBQU8sSUFBUDtBQUNILE9BYkQ7QUFlQTs7Ozs7OztBQUtBcEUsTUFBQUEsS0FBSyxDQUFDN1IsU0FBTixDQUFnQmtQLE1BQWhCLEdBQXlCLFNBQVNBLE1BQVQsQ0FBZ0JsRSxLQUFoQixFQUF1QjtBQUU1QztBQUNBLFlBQUksRUFBRUEsS0FBSyxZQUFZbUUsS0FBbkIsQ0FBSixFQUNJLE1BQU1mLFNBQVMsQ0FBQyx1QkFBRCxDQUFmO0FBRUosWUFBSTFTLEtBQUssR0FBRyxLQUFLZ1EsV0FBTCxDQUFpQm1CLE9BQWpCLENBQXlCN0IsS0FBekIsQ0FBWjtBQUVBOztBQUNBLFlBQUl0UCxLQUFLLEdBQUcsQ0FBWixFQUNJLE1BQU1xQyxLQUFLLENBQUNpTixLQUFLLEdBQUcsc0JBQVIsR0FBaUMsSUFBbEMsQ0FBWDtBQUVKLGFBQUtVLFdBQUwsQ0FBaUJyTCxNQUFqQixDQUF3QjNFLEtBQXhCLEVBQStCLENBQS9CO0FBQ0FBLFFBQUFBLEtBQUssR0FBRyxLQUFLeU4sS0FBTCxDQUFXMEQsT0FBWCxDQUFtQjdCLEtBQUssQ0FBQzNRLElBQXpCLENBQVI7QUFFQTs7QUFDQSxZQUFJcUIsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtBQUNaLGVBQUt5TixLQUFMLENBQVc5SSxNQUFYLENBQWtCM0UsS0FBbEIsRUFBeUIsQ0FBekI7QUFFSnNQLFFBQUFBLEtBQUssQ0FBQ29CLE1BQU4sR0FBZSxJQUFmO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsT0FyQkQ7QUF1QkE7Ozs7O0FBR0F5RixNQUFBQSxLQUFLLENBQUM3UixTQUFOLENBQWdCOFUsS0FBaEIsR0FBd0IsU0FBU0EsS0FBVCxDQUFlMUUsTUFBZixFQUF1QjtBQUMzQ3ZDLFFBQUFBLGdCQUFnQixDQUFDN04sU0FBakIsQ0FBMkI4VSxLQUEzQixDQUFpQ3ZhLElBQWpDLENBQXNDLElBQXRDLEVBQTRDNlYsTUFBNUM7QUFDQSxZQUFJOEYsSUFBSSxHQUFHLElBQVgsQ0FGMkMsQ0FHM0M7O0FBQ0EsYUFBSyxJQUFJdFosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdU0sS0FBTCxDQUFXM04sTUFBL0IsRUFBdUMsRUFBRW9CLENBQXpDLEVBQTRDO0FBQ3hDLGNBQUlvTyxLQUFLLEdBQUdvRixNQUFNLENBQUMxRixHQUFQLENBQVcsS0FBS3ZCLEtBQUwsQ0FBV3ZNLENBQVgsQ0FBWCxDQUFaOztBQUNBLGNBQUlvTyxLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDb0IsTUFBcEIsRUFBNEI7QUFDeEJwQixZQUFBQSxLQUFLLENBQUNvQixNQUFOLEdBQWU4SixJQUFmO0FBQ0FBLFlBQUFBLElBQUksQ0FBQ3hLLFdBQUwsQ0FBaUJwTyxJQUFqQixDQUFzQjBOLEtBQXRCO0FBQ0g7QUFDSixTQVYwQyxDQVczQzs7O0FBQ0FpTCxRQUFBQSxpQkFBaUIsQ0FBQyxJQUFELENBQWpCO0FBQ0gsT0FiRDtBQWVBOzs7OztBQUdBcEUsTUFBQUEsS0FBSyxDQUFDN1IsU0FBTixDQUFnQitVLFFBQWhCLEdBQTJCLFNBQVNBLFFBQVQsQ0FBa0IzRSxNQUFsQixFQUEwQjtBQUNqRCxhQUFLLElBQUl4VCxDQUFDLEdBQUcsQ0FBUixFQUFXb08sS0FBaEIsRUFBdUJwTyxDQUFDLEdBQUcsS0FBSzhPLFdBQUwsQ0FBaUJsUSxNQUE1QyxFQUFvRCxFQUFFb0IsQ0FBdEQ7QUFDSSxjQUFJLENBQUNvTyxLQUFLLEdBQUcsS0FBS1UsV0FBTCxDQUFpQjlPLENBQWpCLENBQVQsRUFBOEJ3VCxNQUFsQyxFQUNJcEYsS0FBSyxDQUFDb0YsTUFBTixDQUFhbEIsTUFBYixDQUFvQmxFLEtBQXBCO0FBRlI7O0FBR0E2QyxRQUFBQSxnQkFBZ0IsQ0FBQzdOLFNBQWpCLENBQTJCK1UsUUFBM0IsQ0FBb0N4YSxJQUFwQyxDQUF5QyxJQUF6QyxFQUErQzZWLE1BQS9DO0FBQ0gsT0FMRDtBQU9BOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBT0F5QixNQUFBQSxLQUFLLENBQUNqQixDQUFOLEdBQVUsU0FBU3VGLGFBQVQsR0FBeUI7QUFDL0IsWUFBSUgsVUFBVSxHQUFHLElBQUkxYSxLQUFKLENBQVVDLFNBQVMsQ0FBQ0MsTUFBcEIsQ0FBakI7QUFBQSxZQUNJRSxLQUFLLEdBQUcsQ0FEWjs7QUFFQSxlQUFPQSxLQUFLLEdBQUdILFNBQVMsQ0FBQ0MsTUFBekI7QUFDSXdhLFVBQUFBLFVBQVUsQ0FBQ3RhLEtBQUQsQ0FBVixHQUFvQkgsU0FBUyxDQUFDRyxLQUFLLEVBQU4sQ0FBN0I7QUFESjs7QUFFQSxlQUFPLFNBQVMwYSxjQUFULENBQXdCcFcsU0FBeEIsRUFBbUNxVyxTQUFuQyxFQUE4QztBQUNqRHZiLFVBQUFBLElBQUksQ0FBQ21XLFlBQUwsQ0FBa0JqUixTQUFTLENBQUMrTixXQUE1QixFQUNLYSxHQURMLENBQ1MsSUFBSWlELEtBQUosQ0FBVXdFLFNBQVYsRUFBcUJMLFVBQXJCLENBRFQ7QUFFQW5YLFVBQUFBLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0I5UCxTQUF0QixFQUFpQ3FXLFNBQWpDLEVBQTRDO0FBQ3hDM0wsWUFBQUEsR0FBRyxFQUFFNVAsSUFBSSxDQUFDd2IsV0FBTCxDQUFpQk4sVUFBakIsQ0FEbUM7QUFFeENPLFlBQUFBLEdBQUcsRUFBRXpiLElBQUksQ0FBQzBiLFdBQUwsQ0FBaUJSLFVBQWpCO0FBRm1DLFdBQTVDO0FBSUgsU0FQRDtBQVFILE9BYkQ7QUFlQyxLQTdNZSxFQTZNZDtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUssRUFBZDtBQUFpQixZQUFLO0FBQXRCLEtBN01jLENBaHVITztBQTY2SE0sUUFBRyxDQUFDLFVBQVMvYSxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakU7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQmtZLEtBQWpCO0FBRUFBLE1BQUFBLEtBQUssQ0FBQy9SLFFBQU4sR0FBaUIsSUFBakI7QUFDQStSLE1BQUFBLEtBQUssQ0FBQ3ZDLFFBQU4sR0FBaUI7QUFBRXNHLFFBQUFBLFFBQVEsRUFBRTtBQUFaLE9BQWpCOztBQUVBLFVBQUloRSxRQUFRLEdBQUl4WCxPQUFPLENBQUMsRUFBRCxDQUF2QjtBQUFBLFVBQ0l5VyxJQUFJLEdBQVF6VyxPQUFPLENBQUMsRUFBRCxDQUR2QjtBQUFBLFVBRUltVSxJQUFJLEdBQVFuVSxPQUFPLENBQUMsRUFBRCxDQUZ2QjtBQUFBLFVBR0lrVSxLQUFLLEdBQU9sVSxPQUFPLENBQUMsRUFBRCxDQUh2QjtBQUFBLFVBSUk2VyxRQUFRLEdBQUk3VyxPQUFPLENBQUMsRUFBRCxDQUp2QjtBQUFBLFVBS0k0VyxLQUFLLEdBQU81VyxPQUFPLENBQUMsRUFBRCxDQUx2QjtBQUFBLFVBTUk0UCxJQUFJLEdBQVE1UCxPQUFPLENBQUMsRUFBRCxDQU52QjtBQUFBLFVBT0k4VyxPQUFPLEdBQUs5VyxPQUFPLENBQUMsRUFBRCxDQVB2QjtBQUFBLFVBUUkrVyxNQUFNLEdBQU0vVyxPQUFPLENBQUMsRUFBRCxDQVJ2QjtBQUFBLFVBU0k4UixLQUFLLEdBQU85UixPQUFPLENBQUMsRUFBRCxDQVR2QjtBQUFBLFVBVUlILElBQUksR0FBUUcsT0FBTyxDQUFDLEVBQUQsQ0FWdkI7O0FBWUEsVUFBSXliLFFBQVEsR0FBTSxlQUFsQjtBQUFBLFVBQ0lDLFdBQVcsR0FBRyxpQkFEbEI7QUFBQSxVQUVJQyxRQUFRLEdBQU0sb0JBRmxCO0FBQUEsVUFHSUMsV0FBVyxHQUFHLHNCQUhsQjtBQUFBLFVBSUlDLE9BQU8sR0FBTyxXQUpsQjtBQUFBLFVBS0lDLFVBQVUsR0FBSSxhQUxsQjtBQUFBLFVBTUlDLFFBQVEsR0FBTSxtREFObEI7QUFBQSxVQU9JQyxNQUFNLEdBQVEsMEJBUGxCO0FBQUEsVUFRSUMsU0FBUyxHQUFLLDhEQVJsQjtBQUFBLFVBU0lDLFdBQVcsR0FBRyxpQ0FUbEI7QUFXQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7O0FBT0E7Ozs7OztBQU1BOzs7Ozs7Ozs7O0FBU0EsZUFBU3pFLEtBQVQsQ0FBZW5VLE1BQWYsRUFBdUJrVCxJQUF2QixFQUE2QjdRLE9BQTdCLEVBQXNDO0FBQ2xDO0FBQ0EsWUFBSSxFQUFFNlEsSUFBSSxZQUFZQyxJQUFsQixDQUFKLEVBQTZCO0FBQ3pCOVEsVUFBQUEsT0FBTyxHQUFHNlEsSUFBVjtBQUNBQSxVQUFBQSxJQUFJLEdBQUcsSUFBSUMsSUFBSixFQUFQO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDOVEsT0FBTCxFQUNJQSxPQUFPLEdBQUc4UixLQUFLLENBQUN2QyxRQUFoQjtBQUVKLFlBQUlpSCxFQUFFLEdBQUczRSxRQUFRLENBQUNsVSxNQUFELEVBQVNxQyxPQUFPLENBQUN5VyxvQkFBUixJQUFnQyxLQUF6QyxDQUFqQjtBQUFBLFlBQ0lDLElBQUksR0FBR0YsRUFBRSxDQUFDRSxJQURkO0FBQUEsWUFFSWhhLElBQUksR0FBRzhaLEVBQUUsQ0FBQzlaLElBRmQ7QUFBQSxZQUdJaWEsSUFBSSxHQUFHSCxFQUFFLENBQUNHLElBSGQ7QUFBQSxZQUlJQyxJQUFJLEdBQUdKLEVBQUUsQ0FBQ0ksSUFKZDtBQUFBLFlBS0lDLElBQUksR0FBR0wsRUFBRSxDQUFDSyxJQUxkO0FBT0EsWUFBSUMsSUFBSSxHQUFHLElBQVg7QUFBQSxZQUNJQyxHQURKO0FBQUEsWUFFSUMsT0FGSjtBQUFBLFlBR0lDLFdBSEo7QUFBQSxZQUlJQyxNQUpKO0FBQUEsWUFLSUMsUUFBUSxHQUFHLEtBTGY7QUFPQSxZQUFJOUMsR0FBRyxHQUFHeEQsSUFBVjtBQUVBLFlBQUl1RyxTQUFTLEdBQUdwWCxPQUFPLENBQUM2VixRQUFSLEdBQW1CLFVBQVNwYyxJQUFULEVBQWU7QUFBRSxpQkFBT0EsSUFBUDtBQUFjLFNBQWxELEdBQXFEUyxJQUFJLENBQUNtZCxTQUExRTtBQUVBOztBQUNBLGlCQUFTQyxPQUFULENBQWlCQyxLQUFqQixFQUF3QjlkLElBQXhCLEVBQThCK2QsY0FBOUIsRUFBOEM7QUFDMUMsY0FBSXpYLFFBQVEsR0FBRytSLEtBQUssQ0FBQy9SLFFBQXJCO0FBQ0EsY0FBSSxDQUFDeVgsY0FBTCxFQUNJMUYsS0FBSyxDQUFDL1IsUUFBTixHQUFpQixJQUFqQjtBQUNKLGlCQUFPNUMsS0FBSyxDQUFDLGNBQWMxRCxJQUFJLElBQUksT0FBdEIsSUFBaUMsSUFBakMsR0FBd0M4ZCxLQUF4QyxHQUFnRCxLQUFoRCxJQUF5RHhYLFFBQVEsR0FBR0EsUUFBUSxHQUFHLElBQWQsR0FBcUIsRUFBdEYsSUFBNEYsT0FBNUYsR0FBc0d5VyxFQUFFLENBQUNpQixJQUF6RyxHQUFnSCxHQUFqSCxDQUFaO0FBQ0g7O0FBRUQsaUJBQVNDLFVBQVQsR0FBc0I7QUFDbEIsY0FBSTNPLE1BQU0sR0FBRyxFQUFiO0FBQUEsY0FDSXdPLEtBREo7O0FBRUEsYUFBRztBQUNDO0FBQ0EsZ0JBQUksQ0FBQ0EsS0FBSyxHQUFHYixJQUFJLEVBQWIsTUFBcUIsSUFBckIsSUFBNkJhLEtBQUssS0FBSyxHQUEzQyxFQUNJLE1BQU1ELE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBRUp4TyxZQUFBQSxNQUFNLENBQUNyTSxJQUFQLENBQVlnYSxJQUFJLEVBQWhCO0FBQ0FFLFlBQUFBLElBQUksQ0FBQ1csS0FBRCxDQUFKO0FBQ0FBLFlBQUFBLEtBQUssR0FBR1osSUFBSSxFQUFaO0FBQ0gsV0FSRCxRQVFTWSxLQUFLLEtBQUssSUFBVixJQUFrQkEsS0FBSyxLQUFLLEdBUnJDOztBQVNBLGlCQUFPeE8sTUFBTSxDQUFDak0sSUFBUCxDQUFZLEVBQVosQ0FBUDtBQUNIOztBQUVELGlCQUFTNmEsU0FBVCxDQUFtQkMsYUFBbkIsRUFBa0M7QUFDOUIsY0FBSUwsS0FBSyxHQUFHYixJQUFJLEVBQWhCOztBQUNBLGtCQUFRYSxLQUFSO0FBQ0ksaUJBQUssR0FBTDtBQUNBLGlCQUFLLElBQUw7QUFDSTdhLGNBQUFBLElBQUksQ0FBQzZhLEtBQUQsQ0FBSjtBQUNBLHFCQUFPRyxVQUFVLEVBQWpCOztBQUNKLGlCQUFLLE1BQUw7QUFBYSxpQkFBSyxNQUFMO0FBQ1QscUJBQU8sSUFBUDs7QUFDSixpQkFBSyxPQUFMO0FBQWMsaUJBQUssT0FBTDtBQUNWLHFCQUFPLEtBQVA7QUFSUjs7QUFVQSxjQUFJO0FBQ0EsbUJBQU9HLFdBQVcsQ0FBQ04sS0FBRDtBQUFRO0FBQXFCLGdCQUE3QixDQUFsQjtBQUNILFdBRkQsQ0FFRSxPQUFPaFMsQ0FBUCxFQUFVO0FBRVI7QUFDQSxnQkFBSXFTLGFBQWEsSUFBSXRCLFNBQVMsQ0FBQ2xaLElBQVYsQ0FBZW1hLEtBQWYsQ0FBckIsRUFDSSxPQUFPQSxLQUFQO0FBRUo7O0FBQ0Esa0JBQU1ELE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLE9BQVIsQ0FBYjtBQUNIO0FBQ0o7O0FBRUQsaUJBQVNPLFVBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCQyxhQUE1QixFQUEyQztBQUN2QyxjQUFJVCxLQUFKLEVBQVdwYixLQUFYOztBQUNBLGFBQUc7QUFDQyxnQkFBSTZiLGFBQWEsS0FBSyxDQUFDVCxLQUFLLEdBQUdaLElBQUksRUFBYixNQUFxQixJQUFyQixJQUE2QlksS0FBSyxLQUFLLEdBQTVDLENBQWpCLEVBQ0lRLE1BQU0sQ0FBQ3JiLElBQVAsQ0FBWWdiLFVBQVUsRUFBdEIsRUFESixLQUdJSyxNQUFNLENBQUNyYixJQUFQLENBQVksQ0FBRVAsS0FBSyxHQUFHOGIsT0FBTyxDQUFDdkIsSUFBSSxFQUFMLENBQWpCLEVBQTJCRSxJQUFJLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBSixHQUFtQnFCLE9BQU8sQ0FBQ3ZCLElBQUksRUFBTCxDQUExQixHQUFxQ3ZhLEtBQWhFLENBQVo7QUFDUCxXQUxELFFBS1N5YSxJQUFJLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FMYjs7QUFNQUEsVUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUNIOztBQUVELGlCQUFTaUIsV0FBVCxDQUFxQk4sS0FBckIsRUFBNEJDLGNBQTVCLEVBQTRDO0FBQ3hDLGNBQUlyVSxJQUFJLEdBQUcsQ0FBWDs7QUFDQSxjQUFJb1UsS0FBSyxDQUFDNWIsTUFBTixDQUFhLENBQWIsTUFBb0IsR0FBeEIsRUFBNkI7QUFDekJ3SCxZQUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFSO0FBQ0FvVSxZQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ1csU0FBTixDQUFnQixDQUFoQixDQUFSO0FBQ0g7O0FBQ0Qsa0JBQVFYLEtBQVI7QUFDSSxpQkFBSyxLQUFMO0FBQVksaUJBQUssS0FBTDtBQUFZLGlCQUFLLEtBQUw7QUFDcEIscUJBQU9wVSxJQUFJLEdBQUdjLFFBQWQ7O0FBQ0osaUJBQUssS0FBTDtBQUFZLGlCQUFLLEtBQUw7QUFBWSxpQkFBSyxLQUFMO0FBQVksaUJBQUssS0FBTDtBQUNoQyxxQkFBT0QsR0FBUDs7QUFDSixpQkFBSyxHQUFMO0FBQ0kscUJBQU8sQ0FBUDtBQU5SOztBQVFBLGNBQUk4UixRQUFRLENBQUMxWSxJQUFULENBQWNtYSxLQUFkLENBQUosRUFDSSxPQUFPcFUsSUFBSSxHQUFHZ1YsUUFBUSxDQUFDWixLQUFELEVBQVEsRUFBUixDQUF0QjtBQUNKLGNBQUl2QixRQUFRLENBQUM1WSxJQUFULENBQWNtYSxLQUFkLENBQUosRUFDSSxPQUFPcFUsSUFBSSxHQUFHZ1YsUUFBUSxDQUFDWixLQUFELEVBQVEsRUFBUixDQUF0QjtBQUNKLGNBQUlyQixPQUFPLENBQUM5WSxJQUFSLENBQWFtYSxLQUFiLENBQUosRUFDSSxPQUFPcFUsSUFBSSxHQUFHZ1YsUUFBUSxDQUFDWixLQUFELEVBQVEsQ0FBUixDQUF0QjtBQUVKOztBQUNBLGNBQUluQixRQUFRLENBQUNoWixJQUFULENBQWNtYSxLQUFkLENBQUosRUFDSSxPQUFPcFUsSUFBSSxHQUFHaVYsVUFBVSxDQUFDYixLQUFELENBQXhCO0FBRUo7O0FBQ0EsZ0JBQU1ELE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLFFBQVIsRUFBa0JDLGNBQWxCLENBQWI7QUFDSDs7QUFFRCxpQkFBU1MsT0FBVCxDQUFpQlYsS0FBakIsRUFBd0JjLGNBQXhCLEVBQXdDO0FBQ3BDLGtCQUFRZCxLQUFSO0FBQ0ksaUJBQUssS0FBTDtBQUFZLGlCQUFLLEtBQUw7QUFBWSxpQkFBSyxLQUFMO0FBQ3BCLHFCQUFPLFNBQVA7O0FBQ0osaUJBQUssR0FBTDtBQUNJLHFCQUFPLENBQVA7QUFKUjtBQU9BOzs7QUFDQSxjQUFJLENBQUNjLGNBQUQsSUFBbUJkLEtBQUssQ0FBQzViLE1BQU4sQ0FBYSxDQUFiLE1BQW9CLEdBQTNDLEVBQ0ksTUFBTTJiLE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLElBQVIsQ0FBYjtBQUVKLGNBQUl4QixXQUFXLENBQUMzWSxJQUFaLENBQWlCbWEsS0FBakIsQ0FBSixFQUNJLE9BQU9ZLFFBQVEsQ0FBQ1osS0FBRCxFQUFRLEVBQVIsQ0FBZjtBQUNKLGNBQUl0QixXQUFXLENBQUM3WSxJQUFaLENBQWlCbWEsS0FBakIsQ0FBSixFQUNJLE9BQU9ZLFFBQVEsQ0FBQ1osS0FBRCxFQUFRLEVBQVIsQ0FBZjtBQUVKOztBQUNBLGNBQUlwQixVQUFVLENBQUMvWSxJQUFYLENBQWdCbWEsS0FBaEIsQ0FBSixFQUNJLE9BQU9ZLFFBQVEsQ0FBQ1osS0FBRCxFQUFRLENBQVIsQ0FBZjtBQUVKOztBQUNBLGdCQUFNRCxPQUFPLENBQUNDLEtBQUQsRUFBUSxJQUFSLENBQWI7QUFDSDs7QUFFRCxpQkFBU2UsWUFBVCxHQUF3QjtBQUVwQjtBQUNBLGNBQUl2QixHQUFHLEtBQUs1ZCxTQUFaLEVBQ0ksTUFBTW1lLE9BQU8sQ0FBQyxTQUFELENBQWI7QUFFSlAsVUFBQUEsR0FBRyxHQUFHTCxJQUFJLEVBQVY7QUFFQTs7QUFDQSxjQUFJLENBQUNKLFNBQVMsQ0FBQ2xaLElBQVYsQ0FBZTJaLEdBQWYsQ0FBTCxFQUNJLE1BQU1PLE9BQU8sQ0FBQ1AsR0FBRCxFQUFNLE1BQU4sQ0FBYjtBQUVKMUMsVUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUN2YSxNQUFKLENBQVdpZCxHQUFYLENBQU47QUFDQUgsVUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUNIOztBQUVELGlCQUFTMkIsV0FBVCxHQUF1QjtBQUNuQixjQUFJaEIsS0FBSyxHQUFHWixJQUFJLEVBQWhCO0FBQ0EsY0FBSTZCLFlBQUo7O0FBQ0Esa0JBQVFqQixLQUFSO0FBQ0ksaUJBQUssTUFBTDtBQUNJaUIsY0FBQUEsWUFBWSxHQUFHdkIsV0FBVyxLQUFLQSxXQUFXLEdBQUcsRUFBbkIsQ0FBMUI7QUFDQVAsY0FBQUEsSUFBSTtBQUNKOztBQUNKLGlCQUFLLFFBQUw7QUFDSUEsY0FBQUEsSUFBSTtBQUNKOztBQUNKO0FBQ0k4QixjQUFBQSxZQUFZLEdBQUd4QixPQUFPLEtBQUtBLE9BQU8sR0FBRyxFQUFmLENBQXRCO0FBQ0E7QUFWUjs7QUFZQU8sVUFBQUEsS0FBSyxHQUFHRyxVQUFVLEVBQWxCO0FBQ0FkLFVBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDQTRCLFVBQUFBLFlBQVksQ0FBQzliLElBQWIsQ0FBa0I2YSxLQUFsQjtBQUNIOztBQUVELGlCQUFTa0IsV0FBVCxHQUF1QjtBQUNuQjdCLFVBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDQU0sVUFBQUEsTUFBTSxHQUFHUSxVQUFVLEVBQW5CO0FBQ0FQLFVBQUFBLFFBQVEsR0FBR0QsTUFBTSxLQUFLLFFBQXRCO0FBRUE7O0FBQ0EsY0FBSSxDQUFDQyxRQUFELElBQWFELE1BQU0sS0FBSyxRQUE1QixFQUNJLE1BQU1JLE9BQU8sQ0FBQ0osTUFBRCxFQUFTLFFBQVQsQ0FBYjtBQUVKTixVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0g7O0FBRUQsaUJBQVM4QixXQUFULENBQXFCbEosTUFBckIsRUFBNkIrSCxLQUE3QixFQUFvQztBQUNoQyxrQkFBUUEsS0FBUjtBQUVJLGlCQUFLLFFBQUw7QUFDSW9CLGNBQUFBLFdBQVcsQ0FBQ25KLE1BQUQsRUFBUytILEtBQVQsQ0FBWDtBQUNBWCxjQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EscUJBQU8sSUFBUDs7QUFFSixpQkFBSyxTQUFMO0FBQ0lnQyxjQUFBQSxTQUFTLENBQUNwSixNQUFELEVBQVMrSCxLQUFULENBQVQ7QUFDQSxxQkFBTyxJQUFQOztBQUVKLGlCQUFLLE1BQUw7QUFDSXNCLGNBQUFBLFNBQVMsQ0FBQ3JKLE1BQUQsRUFBUytILEtBQVQsQ0FBVDtBQUNBLHFCQUFPLElBQVA7O0FBRUosaUJBQUssU0FBTDtBQUNJdUIsY0FBQUEsWUFBWSxDQUFDdEosTUFBRCxFQUFTK0gsS0FBVCxDQUFaO0FBQ0EscUJBQU8sSUFBUDs7QUFFSixpQkFBSyxRQUFMO0FBQ0l3QixjQUFBQSxjQUFjLENBQUN2SixNQUFELEVBQVMrSCxLQUFULENBQWQ7QUFDQSxxQkFBTyxJQUFQO0FBckJSOztBQXVCQSxpQkFBTyxLQUFQO0FBQ0g7O0FBRUQsaUJBQVN5QixPQUFULENBQWlCM0YsR0FBakIsRUFBc0I0RixJQUF0QixFQUE0QkMsTUFBNUIsRUFBb0M7QUFDaEMsY0FBSUMsWUFBWSxHQUFHM0MsRUFBRSxDQUFDaUIsSUFBdEI7O0FBQ0EsY0FBSXBFLEdBQUosRUFBUztBQUNMQSxZQUFBQSxHQUFHLENBQUMvRixPQUFKLEdBQWN1SixJQUFJLEVBQWxCLENBREssQ0FDaUI7O0FBQ3RCeEQsWUFBQUEsR0FBRyxDQUFDdFQsUUFBSixHQUFlK1IsS0FBSyxDQUFDL1IsUUFBckI7QUFDSDs7QUFDRCxjQUFJNlcsSUFBSSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQVIsRUFBcUI7QUFDakIsZ0JBQUlXLEtBQUo7O0FBQ0EsbUJBQU8sQ0FBQ0EsS0FBSyxHQUFHYixJQUFJLEVBQWIsTUFBcUIsR0FBNUI7QUFDSXVDLGNBQUFBLElBQUksQ0FBQzFCLEtBQUQsQ0FBSjtBQURKOztBQUVBWCxZQUFBQSxJQUFJLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FBSjtBQUNILFdBTEQsTUFLTztBQUNILGdCQUFJc0MsTUFBSixFQUNJQSxNQUFNO0FBQ1Z0QyxZQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EsZ0JBQUl2RCxHQUFHLElBQUksT0FBT0EsR0FBRyxDQUFDL0YsT0FBWCxLQUF1QixRQUFsQyxFQUNJK0YsR0FBRyxDQUFDL0YsT0FBSixHQUFjdUosSUFBSSxDQUFDc0MsWUFBRCxDQUFsQixDQUxELENBS21DO0FBQ3pDO0FBQ0o7O0FBRUQsaUJBQVNQLFNBQVQsQ0FBbUJwSixNQUFuQixFQUEyQitILEtBQTNCLEVBQWtDO0FBRTlCO0FBQ0EsY0FBSSxDQUFDbEIsTUFBTSxDQUFDalosSUFBUCxDQUFZbWEsS0FBSyxHQUFHYixJQUFJLEVBQXhCLENBQUwsRUFDSSxNQUFNWSxPQUFPLENBQUNDLEtBQUQsRUFBUSxXQUFSLENBQWI7QUFFSixjQUFJN1AsSUFBSSxHQUFHLElBQUk4RyxJQUFKLENBQVMrSSxLQUFULENBQVg7QUFDQXlCLFVBQUFBLE9BQU8sQ0FBQ3RSLElBQUQsRUFBTyxTQUFTMFIsZUFBVCxDQUF5QjdCLEtBQXpCLEVBQWdDO0FBQzFDLGdCQUFJbUIsV0FBVyxDQUFDaFIsSUFBRCxFQUFPNlAsS0FBUCxDQUFmLEVBQ0k7O0FBRUosb0JBQVFBLEtBQVI7QUFFSSxtQkFBSyxLQUFMO0FBQ0k4QixnQkFBQUEsYUFBYSxDQUFDM1IsSUFBRCxFQUFPNlAsS0FBUCxDQUFiO0FBQ0E7O0FBRUosbUJBQUssVUFBTDtBQUNBLG1CQUFLLFVBQUw7QUFDQSxtQkFBSyxVQUFMO0FBQ0krQixnQkFBQUEsVUFBVSxDQUFDNVIsSUFBRCxFQUFPNlAsS0FBUCxDQUFWO0FBQ0E7O0FBRUosbUJBQUssT0FBTDtBQUNJZ0MsZ0JBQUFBLFVBQVUsQ0FBQzdSLElBQUQsRUFBTzZQLEtBQVAsQ0FBVjtBQUNBOztBQUVKLG1CQUFLLFlBQUw7QUFDSU8sZ0JBQUFBLFVBQVUsQ0FBQ3BRLElBQUksQ0FBQzhSLFVBQUwsS0FBb0I5UixJQUFJLENBQUM4UixVQUFMLEdBQWtCLEVBQXRDLENBQUQsQ0FBVjtBQUNBOztBQUVKLG1CQUFLLFVBQUw7QUFDSTFCLGdCQUFBQSxVQUFVLENBQUNwUSxJQUFJLENBQUMrRixRQUFMLEtBQWtCL0YsSUFBSSxDQUFDK0YsUUFBTCxHQUFnQixFQUFsQyxDQUFELEVBQXdDLElBQXhDLENBQVY7QUFDQTs7QUFFSjtBQUNJO0FBQ0Esb0JBQUksQ0FBQzBKLFFBQUQsSUFBYSxDQUFDYixTQUFTLENBQUNsWixJQUFWLENBQWVtYSxLQUFmLENBQWxCLEVBQ0ksTUFBTUQsT0FBTyxDQUFDQyxLQUFELENBQWI7QUFFSjdhLGdCQUFBQSxJQUFJLENBQUM2YSxLQUFELENBQUo7QUFDQStCLGdCQUFBQSxVQUFVLENBQUM1UixJQUFELEVBQU8sVUFBUCxDQUFWO0FBQ0E7QUEvQlI7QUFpQ0gsV0FyQ00sQ0FBUDtBQXNDQThILFVBQUFBLE1BQU0sQ0FBQ3hCLEdBQVAsQ0FBV3RHLElBQVg7QUFDSDs7QUFFRCxpQkFBUzRSLFVBQVQsQ0FBb0I5SixNQUFwQixFQUE0QnRHLElBQTVCLEVBQWtDd0YsTUFBbEMsRUFBMEM7QUFDdEMsY0FBSWhILElBQUksR0FBR2dQLElBQUksRUFBZjs7QUFDQSxjQUFJaFAsSUFBSSxLQUFLLE9BQWIsRUFBc0I7QUFDbEIrUixZQUFBQSxVQUFVLENBQUNqSyxNQUFELEVBQVN0RyxJQUFULENBQVY7QUFDQTtBQUNIO0FBRUQ7OztBQUNBLGNBQUksQ0FBQ29OLFNBQVMsQ0FBQ2xaLElBQVYsQ0FBZXNLLElBQWYsQ0FBTCxFQUNJLE1BQU00UCxPQUFPLENBQUM1UCxJQUFELEVBQU8sTUFBUCxDQUFiO0FBRUosY0FBSWpPLElBQUksR0FBR2lkLElBQUksRUFBZjtBQUVBOztBQUNBLGNBQUksQ0FBQ0wsTUFBTSxDQUFDalosSUFBUCxDQUFZM0QsSUFBWixDQUFMLEVBQ0ksTUFBTTZkLE9BQU8sQ0FBQzdkLElBQUQsRUFBTyxNQUFQLENBQWI7QUFFSkEsVUFBQUEsSUFBSSxHQUFHMmQsU0FBUyxDQUFDM2QsSUFBRCxDQUFoQjtBQUNBbWQsVUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUVBLGNBQUl4TSxLQUFLLEdBQUcsSUFBSW1FLEtBQUosQ0FBVTlVLElBQVYsRUFBZ0J3ZSxPQUFPLENBQUN2QixJQUFJLEVBQUwsQ0FBdkIsRUFBaUNoUCxJQUFqQyxFQUF1Q3dCLElBQXZDLEVBQTZDd0YsTUFBN0MsQ0FBWjtBQUNBc0ssVUFBQUEsT0FBTyxDQUFDNU8sS0FBRCxFQUFRLFNBQVNzUCxnQkFBVCxDQUEwQm5DLEtBQTFCLEVBQWlDO0FBRTVDO0FBQ0EsZ0JBQUlBLEtBQUssS0FBSyxRQUFkLEVBQXdCO0FBQ3BCb0IsY0FBQUEsV0FBVyxDQUFDdk8sS0FBRCxFQUFRbU4sS0FBUixDQUFYO0FBQ0FYLGNBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDSCxhQUhELE1BSUksTUFBTVUsT0FBTyxDQUFDQyxLQUFELENBQWI7QUFFUCxXQVRNLEVBU0osU0FBU29DLGVBQVQsR0FBMkI7QUFDMUJDLFlBQUFBLGtCQUFrQixDQUFDeFAsS0FBRCxDQUFsQjtBQUNILFdBWE0sQ0FBUDtBQVlBb0YsVUFBQUEsTUFBTSxDQUFDeEIsR0FBUCxDQUFXNUQsS0FBWCxFQWpDc0MsQ0FtQ3RDO0FBQ0E7QUFDQTs7QUFDQSxjQUFJLENBQUMrTSxRQUFELElBQWEvTSxLQUFLLENBQUNJLFFBQW5CLEtBQWdDMkIsS0FBSyxDQUFDTSxNQUFOLENBQWEvRSxJQUFiLE1BQXVCdk8sU0FBdkIsSUFBb0NnVCxLQUFLLENBQUNLLEtBQU4sQ0FBWTlFLElBQVosTUFBc0J2TyxTQUExRixDQUFKLEVBQ0lpUixLQUFLLENBQUNnRixTQUFOLENBQWdCLFFBQWhCLEVBQTBCLEtBQTFCO0FBQWlDO0FBQWUsY0FBaEQ7QUFDUDs7QUFFRCxpQkFBU3FLLFVBQVQsQ0FBb0JqSyxNQUFwQixFQUE0QnRHLElBQTVCLEVBQWtDO0FBQzlCLGNBQUl6UCxJQUFJLEdBQUdpZCxJQUFJLEVBQWY7QUFFQTs7QUFDQSxjQUFJLENBQUNMLE1BQU0sQ0FBQ2paLElBQVAsQ0FBWTNELElBQVosQ0FBTCxFQUNJLE1BQU02ZCxPQUFPLENBQUM3ZCxJQUFELEVBQU8sTUFBUCxDQUFiO0FBRUosY0FBSStXLFNBQVMsR0FBR3RXLElBQUksQ0FBQzJmLE9BQUwsQ0FBYXBnQixJQUFiLENBQWhCO0FBQ0EsY0FBSUEsSUFBSSxLQUFLK1csU0FBYixFQUNJL1csSUFBSSxHQUFHUyxJQUFJLENBQUM0ZixPQUFMLENBQWFyZ0IsSUFBYixDQUFQO0FBQ0ptZCxVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EsY0FBSWpQLEVBQUUsR0FBR3NRLE9BQU8sQ0FBQ3ZCLElBQUksRUFBTCxDQUFoQjtBQUNBLGNBQUloUCxJQUFJLEdBQUcsSUFBSThHLElBQUosQ0FBUy9VLElBQVQsQ0FBWDtBQUNBaU8sVUFBQUEsSUFBSSxDQUFDNEUsS0FBTCxHQUFhLElBQWI7QUFDQSxjQUFJbEMsS0FBSyxHQUFHLElBQUltRSxLQUFKLENBQVVpQyxTQUFWLEVBQXFCN0ksRUFBckIsRUFBeUJsTyxJQUF6QixFQUErQnlQLElBQS9CLENBQVo7QUFDQWtCLFVBQUFBLEtBQUssQ0FBQ3JLLFFBQU4sR0FBaUIrUixLQUFLLENBQUMvUixRQUF2QjtBQUNBaVosVUFBQUEsT0FBTyxDQUFDdFIsSUFBRCxFQUFPLFNBQVNxUyxnQkFBVCxDQUEwQnhDLEtBQTFCLEVBQWlDO0FBQzNDLG9CQUFRQSxLQUFSO0FBRUksbUJBQUssUUFBTDtBQUNJb0IsZ0JBQUFBLFdBQVcsQ0FBQ2pSLElBQUQsRUFBTzZQLEtBQVAsQ0FBWDtBQUNBWCxnQkFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUNBOztBQUVKLG1CQUFLLFVBQUw7QUFDQSxtQkFBSyxVQUFMO0FBQ0EsbUJBQUssVUFBTDtBQUNJMEMsZ0JBQUFBLFVBQVUsQ0FBQzVSLElBQUQsRUFBTzZQLEtBQVAsQ0FBVjtBQUNBOztBQUVKOztBQUNBO0FBQ0ksc0JBQU1ELE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBQXNCO0FBZjlCO0FBaUJILFdBbEJNLENBQVA7QUFtQkEvSCxVQUFBQSxNQUFNLENBQUN4QixHQUFQLENBQVd0RyxJQUFYLEVBQ09zRyxHQURQLENBQ1c1RCxLQURYO0FBRUg7O0FBRUQsaUJBQVNpUCxhQUFULENBQXVCN0osTUFBdkIsRUFBK0I7QUFDM0JvSCxVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EsY0FBSXpPLE9BQU8sR0FBR3VPLElBQUksRUFBbEI7QUFFQTs7QUFDQSxjQUFJdkssS0FBSyxDQUFDWSxNQUFOLENBQWE1RSxPQUFiLE1BQTBCaFAsU0FBOUIsRUFDSSxNQUFNbWUsT0FBTyxDQUFDblAsT0FBRCxFQUFVLE1BQVYsQ0FBYjtBQUVKeU8sVUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUNBLGNBQUlvRCxTQUFTLEdBQUd0RCxJQUFJLEVBQXBCO0FBRUE7O0FBQ0EsY0FBSSxDQUFDSixTQUFTLENBQUNsWixJQUFWLENBQWU0YyxTQUFmLENBQUwsRUFDSSxNQUFNMUMsT0FBTyxDQUFDMEMsU0FBRCxFQUFZLE1BQVosQ0FBYjtBQUVKcEQsVUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUNBLGNBQUluZCxJQUFJLEdBQUdpZCxJQUFJLEVBQWY7QUFFQTs7QUFDQSxjQUFJLENBQUNMLE1BQU0sQ0FBQ2paLElBQVAsQ0FBWTNELElBQVosQ0FBTCxFQUNJLE1BQU02ZCxPQUFPLENBQUM3ZCxJQUFELEVBQU8sTUFBUCxDQUFiO0FBRUptZCxVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EsY0FBSXhNLEtBQUssR0FBRyxJQUFJOEcsUUFBSixDQUFha0csU0FBUyxDQUFDM2QsSUFBRCxDQUF0QixFQUE4QndlLE9BQU8sQ0FBQ3ZCLElBQUksRUFBTCxDQUFyQyxFQUErQ3ZPLE9BQS9DLEVBQXdENlIsU0FBeEQsQ0FBWjtBQUNBaEIsVUFBQUEsT0FBTyxDQUFDNU8sS0FBRCxFQUFRLFNBQVM2UCxtQkFBVCxDQUE2QjFDLEtBQTdCLEVBQW9DO0FBRS9DO0FBQ0EsZ0JBQUlBLEtBQUssS0FBSyxRQUFkLEVBQXdCO0FBQ3BCb0IsY0FBQUEsV0FBVyxDQUFDdk8sS0FBRCxFQUFRbU4sS0FBUixDQUFYO0FBQ0FYLGNBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDSCxhQUhELE1BSUksTUFBTVUsT0FBTyxDQUFDQyxLQUFELENBQWI7QUFFUCxXQVRNLEVBU0osU0FBUzJDLGtCQUFULEdBQThCO0FBQzdCTixZQUFBQSxrQkFBa0IsQ0FBQ3hQLEtBQUQsQ0FBbEI7QUFDSCxXQVhNLENBQVA7QUFZQW9GLFVBQUFBLE1BQU0sQ0FBQ3hCLEdBQVAsQ0FBVzVELEtBQVg7QUFDSDs7QUFFRCxpQkFBU21QLFVBQVQsQ0FBb0IvSixNQUFwQixFQUE0QitILEtBQTVCLEVBQW1DO0FBRS9CO0FBQ0EsY0FBSSxDQUFDbEIsTUFBTSxDQUFDalosSUFBUCxDQUFZbWEsS0FBSyxHQUFHYixJQUFJLEVBQXhCLENBQUwsRUFDSSxNQUFNWSxPQUFPLENBQUNDLEtBQUQsRUFBUSxNQUFSLENBQWI7QUFFSixjQUFJaFAsS0FBSyxHQUFHLElBQUkwSSxLQUFKLENBQVVtRyxTQUFTLENBQUNHLEtBQUQsQ0FBbkIsQ0FBWjtBQUNBeUIsVUFBQUEsT0FBTyxDQUFDelEsS0FBRCxFQUFRLFNBQVM0UixnQkFBVCxDQUEwQjVDLEtBQTFCLEVBQWlDO0FBQzVDLGdCQUFJQSxLQUFLLEtBQUssUUFBZCxFQUF3QjtBQUNwQm9CLGNBQUFBLFdBQVcsQ0FBQ3BRLEtBQUQsRUFBUWdQLEtBQVIsQ0FBWDtBQUNBWCxjQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0gsYUFIRCxNQUdPO0FBQ0hsYSxjQUFBQSxJQUFJLENBQUM2YSxLQUFELENBQUo7QUFDQStCLGNBQUFBLFVBQVUsQ0FBQy9RLEtBQUQsRUFBUSxVQUFSLENBQVY7QUFDSDtBQUNKLFdBUk0sQ0FBUDtBQVNBaUgsVUFBQUEsTUFBTSxDQUFDeEIsR0FBUCxDQUFXekYsS0FBWDtBQUNIOztBQUVELGlCQUFTc1EsU0FBVCxDQUFtQnJKLE1BQW5CLEVBQTJCK0gsS0FBM0IsRUFBa0M7QUFFOUI7QUFDQSxjQUFJLENBQUNsQixNQUFNLENBQUNqWixJQUFQLENBQVltYSxLQUFLLEdBQUdiLElBQUksRUFBeEIsQ0FBTCxFQUNJLE1BQU1ZLE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLE1BQVIsQ0FBYjtBQUVKLGNBQUk1SixHQUFHLEdBQUcsSUFBSTFELElBQUosQ0FBU3NOLEtBQVQsQ0FBVjtBQUNBeUIsVUFBQUEsT0FBTyxDQUFDckwsR0FBRCxFQUFNLFNBQVN5TSxlQUFULENBQXlCN0MsS0FBekIsRUFBZ0M7QUFDM0Msb0JBQU9BLEtBQVA7QUFDRSxtQkFBSyxRQUFMO0FBQ0VvQixnQkFBQUEsV0FBVyxDQUFDaEwsR0FBRCxFQUFNNEosS0FBTixDQUFYO0FBQ0FYLGdCQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0E7O0FBRUYsbUJBQUssVUFBTDtBQUNFa0IsZ0JBQUFBLFVBQVUsQ0FBQ25LLEdBQUcsQ0FBQ0YsUUFBSixLQUFpQkUsR0FBRyxDQUFDRixRQUFKLEdBQWUsRUFBaEMsQ0FBRCxFQUFzQyxJQUF0QyxDQUFWO0FBQ0E7O0FBRUY7QUFDRTRNLGdCQUFBQSxjQUFjLENBQUMxTSxHQUFELEVBQU00SixLQUFOLENBQWQ7QUFYSjtBQWFELFdBZE0sQ0FBUDtBQWVBL0gsVUFBQUEsTUFBTSxDQUFDeEIsR0FBUCxDQUFXTCxHQUFYO0FBQ0g7O0FBRUQsaUJBQVMwTSxjQUFULENBQXdCN0ssTUFBeEIsRUFBZ0MrSCxLQUFoQyxFQUF1QztBQUVuQztBQUNBLGNBQUksQ0FBQ2xCLE1BQU0sQ0FBQ2paLElBQVAsQ0FBWW1hLEtBQVosQ0FBTCxFQUNJLE1BQU1ELE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLE1BQVIsQ0FBYjtBQUVKWCxVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EsY0FBSWhZLEtBQUssR0FBR3FaLE9BQU8sQ0FBQ3ZCLElBQUksRUFBTCxFQUFTLElBQVQsQ0FBbkI7QUFBQSxjQUNJNEQsS0FBSyxHQUFHLEVBRFo7QUFFQXRCLFVBQUFBLE9BQU8sQ0FBQ3NCLEtBQUQsRUFBUSxTQUFTQyxvQkFBVCxDQUE4QmhELEtBQTlCLEVBQXFDO0FBRWhEO0FBQ0EsZ0JBQUlBLEtBQUssS0FBSyxRQUFkLEVBQXdCO0FBQ3BCb0IsY0FBQUEsV0FBVyxDQUFDMkIsS0FBRCxFQUFRL0MsS0FBUixDQUFYLENBRG9CLENBQ087O0FBQzNCWCxjQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0gsYUFIRCxNQUlJLE1BQU1VLE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBRVAsV0FUTSxFQVNKLFNBQVNpRCxtQkFBVCxHQUErQjtBQUM5QlosWUFBQUEsa0JBQWtCLENBQUNVLEtBQUQsQ0FBbEIsQ0FEOEIsQ0FDSDtBQUM5QixXQVhNLENBQVA7QUFZQTlLLFVBQUFBLE1BQU0sQ0FBQ3hCLEdBQVAsQ0FBV3VKLEtBQVgsRUFBa0IzWSxLQUFsQixFQUF5QjBiLEtBQUssQ0FBQ2hOLE9BQS9CO0FBQ0g7O0FBRUQsaUJBQVNxTCxXQUFULENBQXFCbkosTUFBckIsRUFBNkIrSCxLQUE3QixFQUFvQztBQUNoQyxjQUFJa0QsUUFBUSxHQUFHN0QsSUFBSSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQW5CO0FBRUE7O0FBQ0EsY0FBSSxDQUFDTixTQUFTLENBQUNsWixJQUFWLENBQWVtYSxLQUFLLEdBQUdiLElBQUksRUFBM0IsQ0FBTCxFQUNJLE1BQU1ZLE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLE1BQVIsQ0FBYjtBQUVKLGNBQUk5ZCxJQUFJLEdBQUc4ZCxLQUFYOztBQUNBLGNBQUlrRCxRQUFKLEVBQWM7QUFDVjdELFlBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDQW5kLFlBQUFBLElBQUksR0FBRyxNQUFNQSxJQUFOLEdBQWEsR0FBcEI7QUFDQThkLFlBQUFBLEtBQUssR0FBR1osSUFBSSxFQUFaOztBQUNBLGdCQUFJSixXQUFXLENBQUNuWixJQUFaLENBQWlCbWEsS0FBakIsQ0FBSixFQUE2QjtBQUN6QjlkLGNBQUFBLElBQUksSUFBSThkLEtBQVI7QUFDQWIsY0FBQUEsSUFBSTtBQUNQO0FBQ0o7O0FBQ0RFLFVBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDQThELFVBQUFBLGdCQUFnQixDQUFDbEwsTUFBRCxFQUFTL1YsSUFBVCxDQUFoQjtBQUNIOztBQUVELGlCQUFTaWhCLGdCQUFULENBQTBCbEwsTUFBMUIsRUFBa0MvVixJQUFsQyxFQUF3QztBQUNwQyxjQUFJbWQsSUFBSSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQVIsRUFBcUI7QUFBRTtBQUNuQixlQUFHO0FBQ0M7QUFDQSxrQkFBSSxDQUFDUCxNQUFNLENBQUNqWixJQUFQLENBQVltYSxLQUFLLEdBQUdiLElBQUksRUFBeEIsQ0FBTCxFQUNJLE1BQU1ZLE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLE1BQVIsQ0FBYjtBQUVKLGtCQUFJWixJQUFJLE9BQU8sR0FBZixFQUNJK0QsZ0JBQWdCLENBQUNsTCxNQUFELEVBQVMvVixJQUFJLEdBQUcsR0FBUCxHQUFhOGQsS0FBdEIsQ0FBaEIsQ0FESixLQUVLO0FBQ0RYLGdCQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0Esb0JBQUlELElBQUksT0FBTyxHQUFmLEVBQ0krRCxnQkFBZ0IsQ0FBQ2xMLE1BQUQsRUFBUy9WLElBQUksR0FBRyxHQUFQLEdBQWE4ZCxLQUF0QixDQUFoQixDQURKLEtBR0luSSxTQUFTLENBQUNJLE1BQUQsRUFBUy9WLElBQUksR0FBRyxHQUFQLEdBQWE4ZCxLQUF0QixFQUE2QkksU0FBUyxDQUFDLElBQUQsQ0FBdEMsQ0FBVDtBQUNQO0FBQ0osYUFkRCxRQWNTLENBQUNmLElBQUksQ0FBQyxHQUFELEVBQU0sSUFBTixDQWRkO0FBZUgsV0FoQkQsTUFpQkl4SCxTQUFTLENBQUNJLE1BQUQsRUFBUy9WLElBQVQsRUFBZWtlLFNBQVMsQ0FBQyxJQUFELENBQXhCLENBQVQsQ0FsQmdDLENBbUJwQzs7QUFDSDs7QUFFRCxpQkFBU3ZJLFNBQVQsQ0FBbUJJLE1BQW5CLEVBQTJCL1YsSUFBM0IsRUFBaUNtRixLQUFqQyxFQUF3QztBQUNwQyxjQUFJNFEsTUFBTSxDQUFDSixTQUFYLEVBQ0lJLE1BQU0sQ0FBQ0osU0FBUCxDQUFpQjNWLElBQWpCLEVBQXVCbUYsS0FBdkI7QUFDUDs7QUFFRCxpQkFBU2diLGtCQUFULENBQTRCcEssTUFBNUIsRUFBb0M7QUFDaEMsY0FBSW9ILElBQUksQ0FBQyxHQUFELEVBQU0sSUFBTixDQUFSLEVBQXFCO0FBQ2pCLGVBQUc7QUFDQytCLGNBQUFBLFdBQVcsQ0FBQ25KLE1BQUQsRUFBUyxRQUFULENBQVg7QUFDSCxhQUZELFFBRVNvSCxJQUFJLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FGYjs7QUFHQUEsWUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUNIOztBQUNELGlCQUFPcEgsTUFBUDtBQUNIOztBQUVELGlCQUFTc0osWUFBVCxDQUFzQnRKLE1BQXRCLEVBQThCK0gsS0FBOUIsRUFBcUM7QUFFakM7QUFDQSxjQUFJLENBQUNsQixNQUFNLENBQUNqWixJQUFQLENBQVltYSxLQUFLLEdBQUdiLElBQUksRUFBeEIsQ0FBTCxFQUNJLE1BQU1ZLE9BQU8sQ0FBQ0MsS0FBRCxFQUFRLGNBQVIsQ0FBYjtBQUVKLGNBQUlvRCxPQUFPLEdBQUcsSUFBSXhKLE9BQUosQ0FBWW9HLEtBQVosQ0FBZDtBQUNBeUIsVUFBQUEsT0FBTyxDQUFDMkIsT0FBRCxFQUFVLFNBQVNDLGtCQUFULENBQTRCckQsS0FBNUIsRUFBbUM7QUFDaEQsZ0JBQUltQixXQUFXLENBQUNpQyxPQUFELEVBQVVwRCxLQUFWLENBQWYsRUFDSTtBQUVKOztBQUNBLGdCQUFJQSxLQUFLLEtBQUssS0FBZCxFQUNJc0QsV0FBVyxDQUFDRixPQUFELEVBQVVwRCxLQUFWLENBQVgsQ0FESixLQUdJLE1BQU1ELE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBQ1AsV0FUTSxDQUFQO0FBVUEvSCxVQUFBQSxNQUFNLENBQUN4QixHQUFQLENBQVcyTSxPQUFYO0FBQ0g7O0FBRUQsaUJBQVNFLFdBQVQsQ0FBcUJyTCxNQUFyQixFQUE2QitILEtBQTdCLEVBQW9DO0FBQ2hDLGNBQUk3UCxJQUFJLEdBQUc2UCxLQUFYO0FBRUE7O0FBQ0EsY0FBSSxDQUFDbEIsTUFBTSxDQUFDalosSUFBUCxDQUFZbWEsS0FBSyxHQUFHYixJQUFJLEVBQXhCLENBQUwsRUFDSSxNQUFNWSxPQUFPLENBQUNDLEtBQUQsRUFBUSxNQUFSLENBQWI7QUFFSixjQUFJOWQsSUFBSSxHQUFHOGQsS0FBWDtBQUFBLGNBQ0kzRSxXQURKO0FBQUEsY0FDaUJDLGFBRGpCO0FBQUEsY0FFSS9RLFlBRko7QUFBQSxjQUVrQmdSLGNBRmxCO0FBSUE4RCxVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0EsY0FBSUEsSUFBSSxDQUFDLFFBQUQsRUFBVyxJQUFYLENBQVIsRUFDSS9ELGFBQWEsR0FBRyxJQUFoQjtBQUVKOztBQUNBLGNBQUksQ0FBQ3lELFNBQVMsQ0FBQ2xaLElBQVYsQ0FBZW1hLEtBQUssR0FBR2IsSUFBSSxFQUEzQixDQUFMLEVBQ0ksTUFBTVksT0FBTyxDQUFDQyxLQUFELENBQWI7QUFFSjNFLFVBQUFBLFdBQVcsR0FBRzJFLEtBQWQ7QUFDQVgsVUFBQUEsSUFBSSxDQUFDLEdBQUQsQ0FBSjtBQUFXQSxVQUFBQSxJQUFJLENBQUMsU0FBRCxDQUFKO0FBQWlCQSxVQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQzVCLGNBQUlBLElBQUksQ0FBQyxRQUFELEVBQVcsSUFBWCxDQUFSLEVBQ0k5RCxjQUFjLEdBQUcsSUFBakI7QUFFSjs7QUFDQSxjQUFJLENBQUN3RCxTQUFTLENBQUNsWixJQUFWLENBQWVtYSxLQUFLLEdBQUdiLElBQUksRUFBM0IsQ0FBTCxFQUNJLE1BQU1ZLE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBRUp6VixVQUFBQSxZQUFZLEdBQUd5VixLQUFmO0FBQ0FYLFVBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFFQSxjQUFJa0UsTUFBTSxHQUFHLElBQUkxSixNQUFKLENBQVczWCxJQUFYLEVBQWlCaU8sSUFBakIsRUFBdUJrTCxXQUF2QixFQUFvQzlRLFlBQXBDLEVBQWtEK1EsYUFBbEQsRUFBaUVDLGNBQWpFLENBQWI7QUFDQWtHLFVBQUFBLE9BQU8sQ0FBQzhCLE1BQUQsRUFBUyxTQUFTQyxpQkFBVCxDQUEyQnhELEtBQTNCLEVBQWtDO0FBRTlDO0FBQ0EsZ0JBQUlBLEtBQUssS0FBSyxRQUFkLEVBQXdCO0FBQ3BCb0IsY0FBQUEsV0FBVyxDQUFDbUMsTUFBRCxFQUFTdkQsS0FBVCxDQUFYO0FBQ0FYLGNBQUFBLElBQUksQ0FBQyxHQUFELENBQUo7QUFDSCxhQUhELE1BSUksTUFBTVUsT0FBTyxDQUFDQyxLQUFELENBQWI7QUFFUCxXQVRNLENBQVA7QUFVQS9ILFVBQUFBLE1BQU0sQ0FBQ3hCLEdBQVAsQ0FBVzhNLE1BQVg7QUFDSDs7QUFFRCxpQkFBUy9CLGNBQVQsQ0FBd0J2SixNQUF4QixFQUFnQytILEtBQWhDLEVBQXVDO0FBRW5DO0FBQ0EsY0FBSSxDQUFDakIsU0FBUyxDQUFDbFosSUFBVixDQUFlbWEsS0FBSyxHQUFHYixJQUFJLEVBQTNCLENBQUwsRUFDSSxNQUFNWSxPQUFPLENBQUNDLEtBQUQsRUFBUSxXQUFSLENBQWI7QUFFSixjQUFJeUQsU0FBUyxHQUFHekQsS0FBaEI7QUFDQXlCLFVBQUFBLE9BQU8sQ0FBQyxJQUFELEVBQU8sU0FBU2lDLG9CQUFULENBQThCMUQsS0FBOUIsRUFBcUM7QUFDL0Msb0JBQVFBLEtBQVI7QUFFSSxtQkFBSyxVQUFMO0FBQ0EsbUJBQUssVUFBTDtBQUNBLG1CQUFLLFVBQUw7QUFDSStCLGdCQUFBQSxVQUFVLENBQUM5SixNQUFELEVBQVMrSCxLQUFULEVBQWdCeUQsU0FBaEIsQ0FBVjtBQUNBOztBQUVKO0FBQ0k7QUFDQSxvQkFBSSxDQUFDN0QsUUFBRCxJQUFhLENBQUNiLFNBQVMsQ0FBQ2xaLElBQVYsQ0FBZW1hLEtBQWYsQ0FBbEIsRUFDSSxNQUFNRCxPQUFPLENBQUNDLEtBQUQsQ0FBYjtBQUNKN2EsZ0JBQUFBLElBQUksQ0FBQzZhLEtBQUQsQ0FBSjtBQUNBK0IsZ0JBQUFBLFVBQVUsQ0FBQzlKLE1BQUQsRUFBUyxVQUFULEVBQXFCd0wsU0FBckIsQ0FBVjtBQUNBO0FBZFI7QUFnQkgsV0FqQk0sQ0FBUDtBQWtCSDs7QUFFRCxZQUFJekQsS0FBSjs7QUFDQSxlQUFPLENBQUNBLEtBQUssR0FBR2IsSUFBSSxFQUFiLE1BQXFCLElBQTVCLEVBQWtDO0FBQzlCLGtCQUFRYSxLQUFSO0FBRUksaUJBQUssU0FBTDtBQUVJO0FBQ0Esa0JBQUksQ0FBQ1QsSUFBTCxFQUNJLE1BQU1RLE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBRUplLGNBQUFBLFlBQVk7QUFDWjs7QUFFSixpQkFBSyxRQUFMO0FBRUk7QUFDQSxrQkFBSSxDQUFDeEIsSUFBTCxFQUNJLE1BQU1RLE9BQU8sQ0FBQ0MsS0FBRCxDQUFiO0FBRUpnQixjQUFBQSxXQUFXO0FBQ1g7O0FBRUosaUJBQUssUUFBTDtBQUVJO0FBQ0Esa0JBQUksQ0FBQ3pCLElBQUwsRUFDSSxNQUFNUSxPQUFPLENBQUNDLEtBQUQsQ0FBYjtBQUVKa0IsY0FBQUEsV0FBVztBQUNYOztBQUVKLGlCQUFLLFFBQUw7QUFFSTtBQUNBLGtCQUFJLENBQUMzQixJQUFMLEVBQ0ksTUFBTVEsT0FBTyxDQUFDQyxLQUFELENBQWI7QUFFSm9CLGNBQUFBLFdBQVcsQ0FBQ3RFLEdBQUQsRUFBTWtELEtBQU4sQ0FBWDtBQUNBWCxjQUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKO0FBQ0E7O0FBRUo7QUFFSTtBQUNBLGtCQUFJOEIsV0FBVyxDQUFDckUsR0FBRCxFQUFNa0QsS0FBTixDQUFmLEVBQTZCO0FBQ3pCVCxnQkFBQUEsSUFBSSxHQUFHLEtBQVA7QUFDQTtBQUNIO0FBRUQ7OztBQUNBLG9CQUFNUSxPQUFPLENBQUNDLEtBQUQsQ0FBYjtBQWhEUjtBQWtESDs7QUFFRHpGLFFBQUFBLEtBQUssQ0FBQy9SLFFBQU4sR0FBaUIsSUFBakI7QUFDQSxlQUFPO0FBQ0gscUJBQWdCZ1gsR0FEYjtBQUVILHFCQUFnQkMsT0FGYjtBQUdGQyxVQUFBQSxXQUFXLEVBQUlBLFdBSGI7QUFJRkMsVUFBQUEsTUFBTSxFQUFTQSxNQUpiO0FBS0ZyRyxVQUFBQSxJQUFJLEVBQVdBO0FBTGIsU0FBUDtBQU9IO0FBRUQ7Ozs7Ozs7Ozs7OztBQVlDLEtBdnZCK0IsRUF1dkI5QjtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUssRUFBZDtBQUFpQixZQUFLLEVBQXRCO0FBQXlCLFlBQUssRUFBOUI7QUFBaUMsWUFBSyxFQUF0QztBQUF5QyxZQUFLLEVBQTlDO0FBQWlELFlBQUssRUFBdEQ7QUFBeUQsWUFBSyxFQUE5RDtBQUFpRSxZQUFLLEVBQXRFO0FBQXlFLFlBQUssRUFBOUU7QUFBaUYsWUFBSztBQUF0RixLQXZ2QjhCLENBNzZIVDtBQW9xSnNFLFFBQUcsQ0FBQyxVQUFTeFcsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ2pJOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUI2WCxNQUFqQjs7QUFFQSxVQUFJdlgsSUFBSSxHQUFRRyxPQUFPLENBQUMsRUFBRCxDQUF2Qjs7QUFFQSxVQUFJcVgsWUFBSixDQU5pSSxDQU0vRzs7QUFFbEIsVUFBSXdKLFFBQVEsR0FBSWhoQixJQUFJLENBQUNnaEIsUUFBckI7QUFBQSxVQUNJelUsSUFBSSxHQUFRdk0sSUFBSSxDQUFDdU0sSUFEckI7QUFHQTs7QUFDQSxlQUFTMFUsZUFBVCxDQUF5QjNJLE1BQXpCLEVBQWlDNEksV0FBakMsRUFBOEM7QUFDMUMsZUFBT0MsVUFBVSxDQUFDLHlCQUF5QjdJLE1BQU0sQ0FBQy9QLEdBQWhDLEdBQXNDLEtBQXRDLElBQStDMlksV0FBVyxJQUFJLENBQTlELElBQW1FLEtBQW5FLEdBQTJFNUksTUFBTSxDQUFDN0wsR0FBbkYsQ0FBakI7QUFDSDtBQUVEOzs7Ozs7OztBQU1BLGVBQVM4SyxNQUFULENBQWdCdlYsTUFBaEIsRUFBd0I7QUFFcEI7Ozs7QUFJQSxhQUFLc0csR0FBTCxHQUFXdEcsTUFBWDtBQUVBOzs7OztBQUlBLGFBQUt1RyxHQUFMLEdBQVcsQ0FBWDtBQUVBOzs7OztBQUlBLGFBQUtrRSxHQUFMLEdBQVd6SyxNQUFNLENBQUN0QixNQUFsQjtBQUNIOztBQUVELFVBQUkwZ0IsWUFBWSxHQUFHLE9BQU8xWixVQUFQLEtBQXNCLFdBQXRCLEdBQ2IsU0FBUzJaLGtCQUFULENBQTRCcmYsTUFBNUIsRUFBb0M7QUFDbEMsWUFBSUEsTUFBTSxZQUFZMEYsVUFBbEIsSUFBZ0NsSCxLQUFLLENBQUMwWixPQUFOLENBQWNsWSxNQUFkLENBQXBDLEVBQ0ksT0FBTyxJQUFJdVYsTUFBSixDQUFXdlYsTUFBWCxDQUFQO0FBQ0osY0FBTWlCLEtBQUssQ0FBQyxnQkFBRCxDQUFYO0FBQ0g7QUFDRDtBQU5lLFFBT2IsU0FBU21lLFlBQVQsQ0FBc0JwZixNQUF0QixFQUE4QjtBQUM1QixZQUFJeEIsS0FBSyxDQUFDMFosT0FBTixDQUFjbFksTUFBZCxDQUFKLEVBQ0ksT0FBTyxJQUFJdVYsTUFBSixDQUFXdlYsTUFBWCxDQUFQO0FBQ0osY0FBTWlCLEtBQUssQ0FBQyxnQkFBRCxDQUFYO0FBQ0gsT0FYTDtBQWFBOzs7Ozs7OztBQU9Bc1UsTUFBQUEsTUFBTSxDQUFDdkUsTUFBUCxHQUFnQmhULElBQUksQ0FBQ3NoQixNQUFMLEdBQ1YsU0FBU0MsbUJBQVQsQ0FBNkJ2ZixNQUE3QixFQUFxQztBQUNuQyxlQUFPLENBQUN1VixNQUFNLENBQUN2RSxNQUFQLEdBQWdCLFNBQVN3TyxhQUFULENBQXVCeGYsTUFBdkIsRUFBK0I7QUFDbkQsaUJBQU9oQyxJQUFJLENBQUNzaEIsTUFBTCxDQUFZRyxRQUFaLENBQXFCemYsTUFBckIsSUFDRCxJQUFJd1YsWUFBSixDQUFpQnhWLE1BQWpCO0FBQ0Y7QUFGRyxZQUdEb2YsWUFBWSxDQUFDcGYsTUFBRCxDQUhsQjtBQUlILFNBTE0sRUFLSkEsTUFMSSxDQUFQO0FBTUg7QUFDRDtBQVRZLFFBVVZvZixZQVZOO0FBWUE3SixNQUFBQSxNQUFNLENBQUNyUyxTQUFQLENBQWlCd2MsTUFBakIsR0FBMEIxaEIsSUFBSSxDQUFDUSxLQUFMLENBQVcwRSxTQUFYLENBQXFCeWMsUUFBckI7QUFBaUM7QUFBMkIzaEIsTUFBQUEsSUFBSSxDQUFDUSxLQUFMLENBQVcwRSxTQUFYLENBQXFCdkMsS0FBM0c7QUFFQTs7Ozs7O0FBS0E0VSxNQUFBQSxNQUFNLENBQUNyUyxTQUFQLENBQWlCMGMsTUFBakIsR0FBMkIsU0FBU0MsaUJBQVQsR0FBNkI7QUFDcEQsWUFBSW5kLEtBQUssR0FBRyxVQUFaLENBRG9ELENBQzVCOztBQUN4QixlQUFPLFNBQVNvZCxXQUFULEdBQXVCO0FBQzFCcGQsVUFBQUEsS0FBSyxHQUFHLENBQVUsS0FBSzRELEdBQUwsQ0FBUyxLQUFLQyxHQUFkLElBQXFCLEdBQS9CLE1BQStDLENBQXZEO0FBQTBELGNBQUksS0FBS0QsR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUEzQixFQUFnQyxPQUFPN0QsS0FBUDtBQUMxRkEsVUFBQUEsS0FBSyxHQUFHLENBQUNBLEtBQUssR0FBRyxDQUFDLEtBQUs0RCxHQUFMLENBQVMsS0FBS0MsR0FBZCxJQUFxQixHQUF0QixLQUErQixDQUF4QyxNQUErQyxDQUF2RDtBQUEwRCxjQUFJLEtBQUtELEdBQUwsQ0FBUyxLQUFLQyxHQUFMLEVBQVQsSUFBdUIsR0FBM0IsRUFBZ0MsT0FBTzdELEtBQVA7QUFDMUZBLFVBQUFBLEtBQUssR0FBRyxDQUFDQSxLQUFLLEdBQUcsQ0FBQyxLQUFLNEQsR0FBTCxDQUFTLEtBQUtDLEdBQWQsSUFBcUIsR0FBdEIsS0FBOEIsRUFBdkMsTUFBK0MsQ0FBdkQ7QUFBMEQsY0FBSSxLQUFLRCxHQUFMLENBQVMsS0FBS0MsR0FBTCxFQUFULElBQXVCLEdBQTNCLEVBQWdDLE9BQU83RCxLQUFQO0FBQzFGQSxVQUFBQSxLQUFLLEdBQUcsQ0FBQ0EsS0FBSyxHQUFHLENBQUMsS0FBSzRELEdBQUwsQ0FBUyxLQUFLQyxHQUFkLElBQXFCLEdBQXRCLEtBQThCLEVBQXZDLE1BQStDLENBQXZEO0FBQTBELGNBQUksS0FBS0QsR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUEzQixFQUFnQyxPQUFPN0QsS0FBUDtBQUMxRkEsVUFBQUEsS0FBSyxHQUFHLENBQUNBLEtBQUssR0FBRyxDQUFDLEtBQUs0RCxHQUFMLENBQVMsS0FBS0MsR0FBZCxJQUFzQixFQUF2QixLQUE4QixFQUF2QyxNQUErQyxDQUF2RDtBQUEwRCxjQUFJLEtBQUtELEdBQUwsQ0FBUyxLQUFLQyxHQUFMLEVBQVQsSUFBdUIsR0FBM0IsRUFBZ0MsT0FBTzdELEtBQVA7QUFFMUY7O0FBQ0EsY0FBSSxDQUFDLEtBQUs2RCxHQUFMLElBQVksQ0FBYixJQUFrQixLQUFLa0UsR0FBM0IsRUFBZ0M7QUFDNUIsaUJBQUtsRSxHQUFMLEdBQVcsS0FBS2tFLEdBQWhCO0FBQ0Esa0JBQU13VSxlQUFlLENBQUMsSUFBRCxFQUFPLEVBQVAsQ0FBckI7QUFDSDs7QUFDRCxpQkFBT3ZjLEtBQVA7QUFDSCxTQWJEO0FBY0gsT0FoQnlCLEVBQTFCO0FBa0JBOzs7Ozs7QUFJQTZTLE1BQUFBLE1BQU0sQ0FBQ3JTLFNBQVAsQ0FBaUI2YyxLQUFqQixHQUF5QixTQUFTQyxVQUFULEdBQXNCO0FBQzNDLGVBQU8sS0FBS0osTUFBTCxLQUFnQixDQUF2QjtBQUNILE9BRkQ7QUFJQTs7Ozs7O0FBSUFySyxNQUFBQSxNQUFNLENBQUNyUyxTQUFQLENBQWlCK2MsTUFBakIsR0FBMEIsU0FBU0MsV0FBVCxHQUF1QjtBQUM3QyxZQUFJeGQsS0FBSyxHQUFHLEtBQUtrZCxNQUFMLEVBQVo7QUFDQSxlQUFPbGQsS0FBSyxLQUFLLENBQVYsR0FBYyxFQUFFQSxLQUFLLEdBQUcsQ0FBVixDQUFkLEdBQTZCLENBQXBDO0FBQ0gsT0FIRDtBQUtBOzs7QUFFQSxlQUFTeWQsY0FBVCxHQUEwQjtBQUN0QjtBQUNBLFlBQUlDLElBQUksR0FBRyxJQUFJcEIsUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBWDtBQUNBLFlBQUlsZixDQUFDLEdBQUcsQ0FBUjs7QUFDQSxZQUFJLEtBQUsySyxHQUFMLEdBQVcsS0FBS2xFLEdBQWhCLEdBQXNCLENBQTFCLEVBQTZCO0FBQUU7QUFDM0IsaUJBQU96RyxDQUFDLEdBQUcsQ0FBWCxFQUFjLEVBQUVBLENBQWhCLEVBQW1CO0FBQ2Y7QUFDQXNnQixZQUFBQSxJQUFJLENBQUNwWCxFQUFMLEdBQVUsQ0FBQ29YLElBQUksQ0FBQ3BYLEVBQUwsR0FBVSxDQUFDLEtBQUsxQyxHQUFMLENBQVMsS0FBS0MsR0FBZCxJQUFxQixHQUF0QixLQUE4QnpHLENBQUMsR0FBRyxDQUE3QyxNQUFvRCxDQUE5RDtBQUNBLGdCQUFJLEtBQUt3RyxHQUFMLENBQVMsS0FBS0MsR0FBTCxFQUFULElBQXVCLEdBQTNCLEVBQ0ksT0FBTzZaLElBQVA7QUFDUCxXQU53QixDQU96Qjs7O0FBQ0FBLFVBQUFBLElBQUksQ0FBQ3BYLEVBQUwsR0FBVSxDQUFDb1gsSUFBSSxDQUFDcFgsRUFBTCxHQUFVLENBQUMsS0FBSzFDLEdBQUwsQ0FBUyxLQUFLQyxHQUFkLElBQXFCLEdBQXRCLEtBQThCLEVBQXpDLE1BQWlELENBQTNEO0FBQ0E2WixVQUFBQSxJQUFJLENBQUNuWCxFQUFMLEdBQVUsQ0FBQ21YLElBQUksQ0FBQ25YLEVBQUwsR0FBVSxDQUFDLEtBQUszQyxHQUFMLENBQVMsS0FBS0MsR0FBZCxJQUFxQixHQUF0QixLQUErQixDQUExQyxNQUFpRCxDQUEzRDtBQUNBLGNBQUksS0FBS0QsR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUEzQixFQUNJLE9BQU82WixJQUFQO0FBQ0p0Z0IsVUFBQUEsQ0FBQyxHQUFHLENBQUo7QUFDSCxTQWJELE1BYU87QUFDSCxpQkFBT0EsQ0FBQyxHQUFHLENBQVgsRUFBYyxFQUFFQSxDQUFoQixFQUFtQjtBQUNmO0FBQ0EsZ0JBQUksS0FBS3lHLEdBQUwsSUFBWSxLQUFLa0UsR0FBckIsRUFDSSxNQUFNd1UsZUFBZSxDQUFDLElBQUQsQ0FBckIsQ0FIVyxDQUlmOztBQUNBbUIsWUFBQUEsSUFBSSxDQUFDcFgsRUFBTCxHQUFVLENBQUNvWCxJQUFJLENBQUNwWCxFQUFMLEdBQVUsQ0FBQyxLQUFLMUMsR0FBTCxDQUFTLEtBQUtDLEdBQWQsSUFBcUIsR0FBdEIsS0FBOEJ6RyxDQUFDLEdBQUcsQ0FBN0MsTUFBb0QsQ0FBOUQ7QUFDQSxnQkFBSSxLQUFLd0csR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUEzQixFQUNJLE9BQU82WixJQUFQO0FBQ1AsV0FURSxDQVVIOzs7QUFDQUEsVUFBQUEsSUFBSSxDQUFDcFgsRUFBTCxHQUFVLENBQUNvWCxJQUFJLENBQUNwWCxFQUFMLEdBQVUsQ0FBQyxLQUFLMUMsR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUF4QixLQUFnQ3pHLENBQUMsR0FBRyxDQUEvQyxNQUFzRCxDQUFoRTtBQUNBLGlCQUFPc2dCLElBQVA7QUFDSDs7QUFDRCxZQUFJLEtBQUszVixHQUFMLEdBQVcsS0FBS2xFLEdBQWhCLEdBQXNCLENBQTFCLEVBQTZCO0FBQUU7QUFDM0IsaUJBQU96RyxDQUFDLEdBQUcsQ0FBWCxFQUFjLEVBQUVBLENBQWhCLEVBQW1CO0FBQ2Y7QUFDQXNnQixZQUFBQSxJQUFJLENBQUNuWCxFQUFMLEdBQVUsQ0FBQ21YLElBQUksQ0FBQ25YLEVBQUwsR0FBVSxDQUFDLEtBQUszQyxHQUFMLENBQVMsS0FBS0MsR0FBZCxJQUFxQixHQUF0QixLQUE4QnpHLENBQUMsR0FBRyxDQUFKLEdBQVEsQ0FBakQsTUFBd0QsQ0FBbEU7QUFDQSxnQkFBSSxLQUFLd0csR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUEzQixFQUNJLE9BQU82WixJQUFQO0FBQ1A7QUFDSixTQVBELE1BT087QUFDSCxpQkFBT3RnQixDQUFDLEdBQUcsQ0FBWCxFQUFjLEVBQUVBLENBQWhCLEVBQW1CO0FBQ2Y7QUFDQSxnQkFBSSxLQUFLeUcsR0FBTCxJQUFZLEtBQUtrRSxHQUFyQixFQUNJLE1BQU13VSxlQUFlLENBQUMsSUFBRCxDQUFyQixDQUhXLENBSWY7O0FBQ0FtQixZQUFBQSxJQUFJLENBQUNuWCxFQUFMLEdBQVUsQ0FBQ21YLElBQUksQ0FBQ25YLEVBQUwsR0FBVSxDQUFDLEtBQUszQyxHQUFMLENBQVMsS0FBS0MsR0FBZCxJQUFxQixHQUF0QixLQUE4QnpHLENBQUMsR0FBRyxDQUFKLEdBQVEsQ0FBakQsTUFBd0QsQ0FBbEU7QUFDQSxnQkFBSSxLQUFLd0csR0FBTCxDQUFTLEtBQUtDLEdBQUwsRUFBVCxJQUF1QixHQUEzQixFQUNJLE9BQU82WixJQUFQO0FBQ1A7QUFDSjtBQUNEOzs7QUFDQSxjQUFNbmYsS0FBSyxDQUFDLHlCQUFELENBQVg7QUFDSDtBQUVEOztBQUVBOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7QUFJQXNVLE1BQUFBLE1BQU0sQ0FBQ3JTLFNBQVAsQ0FBaUJtZCxJQUFqQixHQUF3QixTQUFTQyxTQUFULEdBQXFCO0FBQ3pDLGVBQU8sS0FBS1YsTUFBTCxPQUFrQixDQUF6QjtBQUNILE9BRkQ7O0FBSUEsZUFBU1csZUFBVCxDQUF5QmphLEdBQXpCLEVBQThCcEcsR0FBOUIsRUFBbUM7QUFBRTtBQUNqQyxlQUFPLENBQUNvRyxHQUFHLENBQUNwRyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQ0FvRyxHQUFHLENBQUNwRyxHQUFHLEdBQUcsQ0FBUCxDQUFILElBQWdCLENBRGhCLEdBRUFvRyxHQUFHLENBQUNwRyxHQUFHLEdBQUcsQ0FBUCxDQUFILElBQWdCLEVBRmhCLEdBR0FvRyxHQUFHLENBQUNwRyxHQUFHLEdBQUcsQ0FBUCxDQUFILElBQWdCLEVBSGpCLE1BR3lCLENBSGhDO0FBSUg7QUFFRDs7Ozs7O0FBSUFxVixNQUFBQSxNQUFNLENBQUNyUyxTQUFQLENBQWlCc2QsT0FBakIsR0FBMkIsU0FBU0MsWUFBVCxHQUF3QjtBQUUvQztBQUNBLFlBQUksS0FBS2xhLEdBQUwsR0FBVyxDQUFYLEdBQWUsS0FBS2tFLEdBQXhCLEVBQ0ksTUFBTXdVLGVBQWUsQ0FBQyxJQUFELEVBQU8sQ0FBUCxDQUFyQjtBQUVKLGVBQU9zQixlQUFlLENBQUMsS0FBS2phLEdBQU4sRUFBVyxLQUFLQyxHQUFMLElBQVksQ0FBdkIsQ0FBdEI7QUFDSCxPQVBEO0FBU0E7Ozs7OztBQUlBZ1AsTUFBQUEsTUFBTSxDQUFDclMsU0FBUCxDQUFpQndkLFFBQWpCLEdBQTRCLFNBQVNDLGFBQVQsR0FBeUI7QUFFakQ7QUFDQSxZQUFJLEtBQUtwYSxHQUFMLEdBQVcsQ0FBWCxHQUFlLEtBQUtrRSxHQUF4QixFQUNJLE1BQU13VSxlQUFlLENBQUMsSUFBRCxFQUFPLENBQVAsQ0FBckI7QUFFSixlQUFPc0IsZUFBZSxDQUFDLEtBQUtqYSxHQUFOLEVBQVcsS0FBS0MsR0FBTCxJQUFZLENBQXZCLENBQWYsR0FBMkMsQ0FBbEQ7QUFDSCxPQVBEO0FBU0E7OztBQUVBLGVBQVNxYSxXQUFUO0FBQXFCO0FBQW9CO0FBRXJDO0FBQ0EsWUFBSSxLQUFLcmEsR0FBTCxHQUFXLENBQVgsR0FBZSxLQUFLa0UsR0FBeEIsRUFDSSxNQUFNd1UsZUFBZSxDQUFDLElBQUQsRUFBTyxDQUFQLENBQXJCO0FBRUosZUFBTyxJQUFJRCxRQUFKLENBQWF1QixlQUFlLENBQUMsS0FBS2phLEdBQU4sRUFBVyxLQUFLQyxHQUFMLElBQVksQ0FBdkIsQ0FBNUIsRUFBdURnYSxlQUFlLENBQUMsS0FBS2phLEdBQU4sRUFBVyxLQUFLQyxHQUFMLElBQVksQ0FBdkIsQ0FBdEUsQ0FBUDtBQUNIO0FBRUQ7O0FBRUE7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7O0FBS0FnUCxNQUFBQSxNQUFNLENBQUNyUyxTQUFQLFlBQXlCLFNBQVMyZCxVQUFULEdBQXNCO0FBRTNDO0FBQ0EsWUFBSSxLQUFLdGEsR0FBTCxHQUFXLENBQVgsR0FBZSxLQUFLa0UsR0FBeEIsRUFDSSxNQUFNd1UsZUFBZSxDQUFDLElBQUQsRUFBTyxDQUFQLENBQXJCO0FBRUosWUFBSXZjLEtBQUssR0FBRzFFLElBQUksU0FBSixDQUFXNkksV0FBWCxDQUF1QixLQUFLUCxHQUE1QixFQUFpQyxLQUFLQyxHQUF0QyxDQUFaO0FBQ0EsYUFBS0EsR0FBTCxJQUFZLENBQVo7QUFDQSxlQUFPN0QsS0FBUDtBQUNILE9BVEQ7QUFXQTs7Ozs7OztBQUtBNlMsTUFBQUEsTUFBTSxDQUFDclMsU0FBUCxhQUEwQixTQUFTNGQsV0FBVCxHQUF1QjtBQUU3QztBQUNBLFlBQUksS0FBS3ZhLEdBQUwsR0FBVyxDQUFYLEdBQWUsS0FBS2tFLEdBQXhCLEVBQ0ksTUFBTXdVLGVBQWUsQ0FBQyxJQUFELEVBQU8sQ0FBUCxDQUFyQjtBQUVKLFlBQUl2YyxLQUFLLEdBQUcxRSxJQUFJLFNBQUosQ0FBVzBLLFlBQVgsQ0FBd0IsS0FBS3BDLEdBQTdCLEVBQWtDLEtBQUtDLEdBQXZDLENBQVo7QUFDQSxhQUFLQSxHQUFMLElBQVksQ0FBWjtBQUNBLGVBQU83RCxLQUFQO0FBQ0gsT0FURDtBQVdBOzs7Ozs7QUFJQTZTLE1BQUFBLE1BQU0sQ0FBQ3JTLFNBQVAsQ0FBaUIwTSxLQUFqQixHQUF5QixTQUFTbVIsVUFBVCxHQUFzQjtBQUMzQyxZQUFJcmlCLE1BQU0sR0FBRyxLQUFLa2hCLE1BQUwsRUFBYjtBQUFBLFlBQ0kzZixLQUFLLEdBQUksS0FBS3NHLEdBRGxCO0FBQUEsWUFFSXJHLEdBQUcsR0FBTSxLQUFLcUcsR0FBTCxHQUFXN0gsTUFGeEI7QUFJQTs7QUFDQSxZQUFJd0IsR0FBRyxHQUFHLEtBQUt1SyxHQUFmLEVBQ0ksTUFBTXdVLGVBQWUsQ0FBQyxJQUFELEVBQU92Z0IsTUFBUCxDQUFyQjtBQUVKLGFBQUs2SCxHQUFMLElBQVk3SCxNQUFaO0FBQ0EsWUFBSUYsS0FBSyxDQUFDMFosT0FBTixDQUFjLEtBQUs1UixHQUFuQixDQUFKLEVBQTZCO0FBQ3pCLGlCQUFPLEtBQUtBLEdBQUwsQ0FBUzNGLEtBQVQsQ0FBZVYsS0FBZixFQUFzQkMsR0FBdEIsQ0FBUDtBQUNKLGVBQU9ELEtBQUssS0FBS0MsR0FBVixDQUFjO0FBQWQsVUFDRCxJQUFJLEtBQUtvRyxHQUFMLENBQVMySyxXQUFiLENBQXlCLENBQXpCLENBREMsR0FFRCxLQUFLeU8sTUFBTCxDQUFZamlCLElBQVosQ0FBaUIsS0FBSzZJLEdBQXRCLEVBQTJCckcsS0FBM0IsRUFBa0NDLEdBQWxDLENBRk47QUFHSCxPQWZEO0FBaUJBOzs7Ozs7QUFJQXFWLE1BQUFBLE1BQU0sQ0FBQ3JTLFNBQVAsQ0FBaUI1RCxNQUFqQixHQUEwQixTQUFTMGhCLFdBQVQsR0FBdUI7QUFDN0MsWUFBSXBSLEtBQUssR0FBRyxLQUFLQSxLQUFMLEVBQVo7QUFDQSxlQUFPckYsSUFBSSxDQUFDRyxJQUFMLENBQVVrRixLQUFWLEVBQWlCLENBQWpCLEVBQW9CQSxLQUFLLENBQUNsUixNQUExQixDQUFQO0FBQ0gsT0FIRDtBQUtBOzs7Ozs7O0FBS0E2VyxNQUFBQSxNQUFNLENBQUNyUyxTQUFQLENBQWlCd1gsSUFBakIsR0FBd0IsU0FBU0EsSUFBVCxDQUFjaGMsTUFBZCxFQUFzQjtBQUMxQyxZQUFJLE9BQU9BLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDNUI7QUFDQSxjQUFJLEtBQUs2SCxHQUFMLEdBQVc3SCxNQUFYLEdBQW9CLEtBQUsrTCxHQUE3QixFQUNJLE1BQU13VSxlQUFlLENBQUMsSUFBRCxFQUFPdmdCLE1BQVAsQ0FBckI7QUFDSixlQUFLNkgsR0FBTCxJQUFZN0gsTUFBWjtBQUNILFNBTEQsTUFLTztBQUNILGFBQUc7QUFDQztBQUNBLGdCQUFJLEtBQUs2SCxHQUFMLElBQVksS0FBS2tFLEdBQXJCLEVBQ0ksTUFBTXdVLGVBQWUsQ0FBQyxJQUFELENBQXJCO0FBQ1AsV0FKRCxRQUlTLEtBQUszWSxHQUFMLENBQVMsS0FBS0MsR0FBTCxFQUFULElBQXVCLEdBSmhDO0FBS0g7O0FBQ0QsZUFBTyxJQUFQO0FBQ0gsT0FkRDtBQWdCQTs7Ozs7OztBQUtBZ1AsTUFBQUEsTUFBTSxDQUFDclMsU0FBUCxDQUFpQitkLFFBQWpCLEdBQTRCLFVBQVNyUSxRQUFULEVBQW1CO0FBQzNDLGdCQUFRQSxRQUFSO0FBQ0ksZUFBSyxDQUFMO0FBQ0ksaUJBQUs4SixJQUFMO0FBQ0E7O0FBQ0osZUFBSyxDQUFMO0FBQ0ksaUJBQUtBLElBQUwsQ0FBVSxDQUFWO0FBQ0E7O0FBQ0osZUFBSyxDQUFMO0FBQ0ksaUJBQUtBLElBQUwsQ0FBVSxLQUFLa0YsTUFBTCxFQUFWO0FBQ0E7O0FBQ0osZUFBSyxDQUFMO0FBQ0ksZUFBRztBQUFFO0FBQ0Qsa0JBQUksQ0FBQ2hQLFFBQVEsR0FBRyxLQUFLZ1AsTUFBTCxLQUFnQixDQUE1QixNQUFtQyxDQUF2QyxFQUNJO0FBQ0osbUJBQUtxQixRQUFMLENBQWNyUSxRQUFkO0FBQ0gsYUFKRCxRQUlTLElBSlQ7O0FBS0E7O0FBQ0osZUFBSyxDQUFMO0FBQ0ksaUJBQUs4SixJQUFMLENBQVUsQ0FBVjtBQUNBOztBQUVKOztBQUNBO0FBQ0ksa0JBQU16WixLQUFLLENBQUMsdUJBQXVCMlAsUUFBdkIsR0FBa0MsYUFBbEMsR0FBa0QsS0FBS3JLLEdBQXhELENBQVg7QUF2QlI7O0FBeUJBLGVBQU8sSUFBUDtBQUNILE9BM0JEOztBQTZCQWdQLE1BQUFBLE1BQU0sQ0FBQ2hCLFVBQVAsR0FBb0IsVUFBUzJNLGFBQVQsRUFBd0I7QUFDeEMxTCxRQUFBQSxZQUFZLEdBQUcwTCxhQUFmO0FBRUEsWUFBSTdpQixFQUFFLEdBQUdMLElBQUksQ0FBQ0YsSUFBTCxHQUFZLFFBQVo7QUFBdUI7QUFBMkIsa0JBQTNEO0FBQ0FFLFFBQUFBLElBQUksQ0FBQ21qQixLQUFMLENBQVc1TCxNQUFNLENBQUNyUyxTQUFsQixFQUE2QjtBQUV6QmtlLFVBQUFBLEtBQUssRUFBRSxTQUFTQyxVQUFULEdBQXNCO0FBQ3pCLG1CQUFPbEIsY0FBYyxDQUFDMWlCLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJZLEVBQTFCLEVBQThCLEtBQTlCLENBQVA7QUFDSCxXQUp3QjtBQU16QmlqQixVQUFBQSxNQUFNLEVBQUUsU0FBU0MsV0FBVCxHQUF1QjtBQUMzQixtQkFBT3BCLGNBQWMsQ0FBQzFpQixJQUFmLENBQW9CLElBQXBCLEVBQTBCWSxFQUExQixFQUE4QixJQUE5QixDQUFQO0FBQ0gsV0FSd0I7QUFVekJtakIsVUFBQUEsTUFBTSxFQUFFLFNBQVNDLFdBQVQsR0FBdUI7QUFDM0IsbUJBQU90QixjQUFjLENBQUMxaUIsSUFBZixDQUFvQixJQUFwQixFQUEwQmlrQixRQUExQixHQUFxQ3JqQixFQUFyQyxFQUF5QyxLQUF6QyxDQUFQO0FBQ0gsV0Fad0I7QUFjekJzakIsVUFBQUEsT0FBTyxFQUFFLFNBQVNDLFlBQVQsR0FBd0I7QUFDN0IsbUJBQU9oQixXQUFXLENBQUNuakIsSUFBWixDQUFpQixJQUFqQixFQUF1QlksRUFBdkIsRUFBMkIsSUFBM0IsQ0FBUDtBQUNILFdBaEJ3QjtBQWtCekJ3akIsVUFBQUEsUUFBUSxFQUFFLFNBQVNDLGFBQVQsR0FBeUI7QUFDL0IsbUJBQU9sQixXQUFXLENBQUNuakIsSUFBWixDQUFpQixJQUFqQixFQUF1QlksRUFBdkIsRUFBMkIsS0FBM0IsQ0FBUDtBQUNIO0FBcEJ3QixTQUE3QjtBQXVCSCxPQTNCRDtBQTZCQyxLQXpaK0YsRUF5WjlGO0FBQUMsWUFBSztBQUFOLEtBelo4RixDQXBxSnpFO0FBNmpLVixRQUFHLENBQUMsVUFBU0YsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ2pEOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUI4WCxZQUFqQixDQUZpRCxDQUlqRDs7QUFDQSxVQUFJRCxNQUFNLEdBQUdwWCxPQUFPLENBQUMsRUFBRCxDQUFwQjs7QUFDQSxPQUFDcVgsWUFBWSxDQUFDdFMsU0FBYixHQUF5Qm5CLE1BQU0sQ0FBQ2lQLE1BQVAsQ0FBY3VFLE1BQU0sQ0FBQ3JTLFNBQXJCLENBQTFCLEVBQTJEK04sV0FBM0QsR0FBeUV1RSxZQUF6RTs7QUFFQSxVQUFJeFgsSUFBSSxHQUFHRyxPQUFPLENBQUMsRUFBRCxDQUFsQjtBQUVBOzs7Ozs7Ozs7QUFPQSxlQUFTcVgsWUFBVCxDQUFzQnhWLE1BQXRCLEVBQThCO0FBQzFCdVYsUUFBQUEsTUFBTSxDQUFDOVgsSUFBUCxDQUFZLElBQVosRUFBa0J1QyxNQUFsQjtBQUVBOzs7OztBQUtIO0FBRUQ7OztBQUNBLFVBQUloQyxJQUFJLENBQUNzaEIsTUFBVCxFQUNJOUosWUFBWSxDQUFDdFMsU0FBYixDQUF1QndjLE1BQXZCLEdBQWdDMWhCLElBQUksQ0FBQ3NoQixNQUFMLENBQVlwYyxTQUFaLENBQXNCdkMsS0FBdEQ7QUFFSjs7OztBQUdBNlUsTUFBQUEsWUFBWSxDQUFDdFMsU0FBYixDQUF1QjVELE1BQXZCLEdBQWdDLFNBQVN5aUIsa0JBQVQsR0FBOEI7QUFDMUQsWUFBSXRYLEdBQUcsR0FBRyxLQUFLbVYsTUFBTCxFQUFWLENBRDBELENBQ2pDOztBQUN6QixlQUFPLEtBQUt0WixHQUFMLENBQVMwYixTQUFULENBQW1CLEtBQUt6YixHQUF4QixFQUE2QixLQUFLQSxHQUFMLEdBQVc3RyxJQUFJLENBQUN1aUIsR0FBTCxDQUFTLEtBQUsxYixHQUFMLEdBQVdrRSxHQUFwQixFQUF5QixLQUFLQSxHQUE5QixDQUF4QyxDQUFQO0FBQ0gsT0FIRDtBQUtBOzs7Ozs7O0FBT0MsS0E5Q2UsRUE4Q2Q7QUFBQyxZQUFLLEVBQU47QUFBUyxZQUFLO0FBQWQsS0E5Q2MsQ0E3aktPO0FBMm1LRixRQUFHLENBQUMsVUFBU3RNLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUN6RDs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCa1gsSUFBakIsQ0FGeUQsQ0FJekQ7O0FBQ0EsVUFBSXpELFNBQVMsR0FBR2hULE9BQU8sQ0FBQyxFQUFELENBQXZCOztBQUNBLE9BQUMsQ0FBQ3lXLElBQUksQ0FBQzFSLFNBQUwsR0FBaUJuQixNQUFNLENBQUNpUCxNQUFQLENBQWNHLFNBQVMsQ0FBQ2pPLFNBQXhCLENBQWxCLEVBQXNEK04sV0FBdEQsR0FBb0UyRCxJQUFyRSxFQUEyRTFELFNBQTNFLEdBQXVGLE1BQXZGOztBQUVBLFVBQUltQixLQUFLLEdBQUtsVSxPQUFPLENBQUMsRUFBRCxDQUFyQjtBQUFBLFVBQ0k0UCxJQUFJLEdBQU01UCxPQUFPLENBQUMsRUFBRCxDQURyQjtBQUFBLFVBRUk0VyxLQUFLLEdBQUs1VyxPQUFPLENBQUMsRUFBRCxDQUZyQjtBQUFBLFVBR0lILElBQUksR0FBTUcsT0FBTyxDQUFDLEVBQUQsQ0FIckI7O0FBS0EsVUFBSW1VLElBQUosRUFBWTtBQUNSc0QsTUFBQUEsS0FESixFQUNZO0FBQ1I1SyxNQUFBQSxNQUZKLENBYnlELENBZTdDOztBQUVaOzs7Ozs7OztBQU9BLGVBQVM0SixJQUFULENBQWM5USxPQUFkLEVBQXVCO0FBQ25CcU4sUUFBQUEsU0FBUyxDQUFDMVQsSUFBVixDQUFlLElBQWYsRUFBcUIsRUFBckIsRUFBeUJxRyxPQUF6QjtBQUVBOzs7OztBQUlBLGFBQUtvZSxRQUFMLEdBQWdCLEVBQWhCO0FBRUE7Ozs7O0FBSUEsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSDtBQUVEOzs7Ozs7OztBQU1Bdk4sTUFBQUEsSUFBSSxDQUFDcEQsUUFBTCxHQUFnQixTQUFTQSxRQUFULENBQWtCdEcsSUFBbEIsRUFBd0J5SixJQUF4QixFQUE4QjtBQUMxQyxZQUFJLENBQUNBLElBQUwsRUFDSUEsSUFBSSxHQUFHLElBQUlDLElBQUosRUFBUDtBQUNKLFlBQUkxSixJQUFJLENBQUNwSCxPQUFULEVBQ0k2USxJQUFJLENBQUNvRCxVQUFMLENBQWdCN00sSUFBSSxDQUFDcEgsT0FBckI7QUFDSixlQUFPNlEsSUFBSSxDQUFDcUMsT0FBTCxDQUFhOUwsSUFBSSxDQUFDQyxNQUFsQixDQUFQO0FBQ0gsT0FORDtBQVFBOzs7Ozs7Ozs7O0FBUUF5SixNQUFBQSxJQUFJLENBQUMxUixTQUFMLENBQWVrZixXQUFmLEdBQTZCcGtCLElBQUksQ0FBQ3NMLElBQUwsQ0FBVXRLLE9BQXZDLENBOUR5RCxDQWdFekQ7O0FBQ0E7O0FBQ0EsZUFBU3FqQixJQUFULEdBQWdCLENBQUUsQ0FsRXVDLENBa0V0Qzs7QUFFbkI7Ozs7Ozs7OztBQU9Bek4sTUFBQUEsSUFBSSxDQUFDMVIsU0FBTCxDQUFld1IsSUFBZixHQUFzQixTQUFTQSxJQUFULENBQWM3USxRQUFkLEVBQXdCQyxPQUF4QixFQUFpQzVFLFFBQWpDLEVBQTJDO0FBQzdELFlBQUksT0FBTzRFLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDL0I1RSxVQUFBQSxRQUFRLEdBQUc0RSxPQUFYO0FBQ0FBLFVBQUFBLE9BQU8sR0FBRzdHLFNBQVY7QUFDSDs7QUFDRCxZQUFJbWMsSUFBSSxHQUFHLElBQVg7QUFDQSxZQUFJLENBQUNsYSxRQUFMLEVBQ0ksT0FBT2xCLElBQUksQ0FBQ0ksU0FBTCxDQUFlc1csSUFBZixFQUFxQjBFLElBQXJCLEVBQTJCdlYsUUFBM0IsRUFBcUNDLE9BQXJDLENBQVA7QUFFSixZQUFJd2UsSUFBSSxHQUFHcGpCLFFBQVEsS0FBS21qQixJQUF4QixDQVQ2RCxDQVMvQjtBQUU5Qjs7QUFDQSxpQkFBU0UsTUFBVCxDQUFnQnBqQixHQUFoQixFQUFxQndWLElBQXJCLEVBQTJCO0FBQ3ZCO0FBQ0EsY0FBSSxDQUFDelYsUUFBTCxFQUNJO0FBQ0osY0FBSXNqQixFQUFFLEdBQUd0akIsUUFBVDtBQUNBQSxVQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNBLGNBQUlvakIsSUFBSixFQUNJLE1BQU1uakIsR0FBTjtBQUNKcWpCLFVBQUFBLEVBQUUsQ0FBQ3JqQixHQUFELEVBQU13VixJQUFOLENBQUY7QUFDSCxTQXJCNEQsQ0F1QjdEOzs7QUFDQSxpQkFBUzhOLE9BQVQsQ0FBaUI1ZSxRQUFqQixFQUEyQnBDLE1BQTNCLEVBQW1DO0FBQy9CLGNBQUk7QUFDQSxnQkFBSXpELElBQUksQ0FBQytULFFBQUwsQ0FBY3RRLE1BQWQsS0FBeUJBLE1BQU0sQ0FBQ2hDLE1BQVAsQ0FBYyxDQUFkLE1BQXFCLEdBQWxELEVBQ0lnQyxNQUFNLEdBQUdvQixJQUFJLENBQUMrUyxLQUFMLENBQVduVSxNQUFYLENBQVQ7QUFDSixnQkFBSSxDQUFDekQsSUFBSSxDQUFDK1QsUUFBTCxDQUFjdFEsTUFBZCxDQUFMLEVBQ0kyWCxJQUFJLENBQUNyQixVQUFMLENBQWdCdFcsTUFBTSxDQUFDcUMsT0FBdkIsRUFBZ0NrVCxPQUFoQyxDQUF3Q3ZWLE1BQU0sQ0FBQzBKLE1BQS9DLEVBREosS0FFSztBQUNEeUssY0FBQUEsS0FBSyxDQUFDL1IsUUFBTixHQUFpQkEsUUFBakI7QUFDQSxrQkFBSTZlLE1BQU0sR0FBRzlNLEtBQUssQ0FBQ25VLE1BQUQsRUFBUzJYLElBQVQsRUFBZXRWLE9BQWYsQ0FBbEI7QUFBQSxrQkFDSXNQLFFBREo7QUFBQSxrQkFFSXRULENBQUMsR0FBRyxDQUZSO0FBR0Esa0JBQUk0aUIsTUFBTSxDQUFDNUgsT0FBWCxFQUNJLE9BQU9oYixDQUFDLEdBQUc0aUIsTUFBTSxDQUFDNUgsT0FBUCxDQUFlcGMsTUFBMUIsRUFBa0MsRUFBRW9CLENBQXBDO0FBQ0ksb0JBQUlzVCxRQUFRLEdBQUdnRyxJQUFJLENBQUNnSixXQUFMLENBQWlCdmUsUUFBakIsRUFBMkI2ZSxNQUFNLENBQUM1SCxPQUFQLENBQWVoYixDQUFmLENBQTNCLENBQWYsRUFDSTRELEtBQUssQ0FBQzBQLFFBQUQsQ0FBTDtBQUZSO0FBR0osa0JBQUlzUCxNQUFNLENBQUMzSCxXQUFYLEVBQ0ksS0FBS2piLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRzRpQixNQUFNLENBQUMzSCxXQUFQLENBQW1CcmMsTUFBbkMsRUFBMkMsRUFBRW9CLENBQTdDO0FBQ0ksb0JBQUlzVCxRQUFRLEdBQUdnRyxJQUFJLENBQUNnSixXQUFMLENBQWlCdmUsUUFBakIsRUFBMkI2ZSxNQUFNLENBQUMzSCxXQUFQLENBQW1CamIsQ0FBbkIsQ0FBM0IsQ0FBZixFQUNJNEQsS0FBSyxDQUFDMFAsUUFBRCxFQUFXLElBQVgsQ0FBTDtBQUZSO0FBR1A7QUFDSixXQW5CRCxDQW1CRSxPQUFPalUsR0FBUCxFQUFZO0FBQ1ZvakIsWUFBQUEsTUFBTSxDQUFDcGpCLEdBQUQsQ0FBTjtBQUNIOztBQUNELGNBQUksQ0FBQ21qQixJQUFELElBQVMsQ0FBQ0ssTUFBZCxFQUNJSixNQUFNLENBQUMsSUFBRCxFQUFPbkosSUFBUCxDQUFOLENBeEIyQixDQXdCUDtBQUMzQixTQWpENEQsQ0FtRDdEOzs7QUFDQSxpQkFBUzFWLEtBQVQsQ0FBZUcsUUFBZixFQUF5QitlLElBQXpCLEVBQStCO0FBRTNCO0FBQ0EsY0FBSUMsR0FBRyxHQUFHaGYsUUFBUSxDQUFDaWYsV0FBVCxDQUFxQixrQkFBckIsQ0FBVjs7QUFDQSxjQUFJRCxHQUFHLEdBQUcsQ0FBQyxDQUFYLEVBQWM7QUFDVixnQkFBSUUsT0FBTyxHQUFHbGYsUUFBUSxDQUFDbVksU0FBVCxDQUFtQjZHLEdBQW5CLENBQWQ7QUFDQSxnQkFBSUUsT0FBTyxJQUFJL1gsTUFBZixFQUNJbkgsUUFBUSxHQUFHa2YsT0FBWDtBQUNQLFdBUjBCLENBVTNCOzs7QUFDQSxjQUFJM0osSUFBSSxDQUFDK0ksS0FBTCxDQUFXcFMsT0FBWCxDQUFtQmxNLFFBQW5CLElBQStCLENBQUMsQ0FBcEMsRUFDSTtBQUNKdVYsVUFBQUEsSUFBSSxDQUFDK0ksS0FBTCxDQUFXM2hCLElBQVgsQ0FBZ0JxRCxRQUFoQixFQWIyQixDQWUzQjs7QUFDQSxjQUFJQSxRQUFRLElBQUltSCxNQUFoQixFQUF3QjtBQUNwQixnQkFBSXNYLElBQUosRUFDSUcsT0FBTyxDQUFDNWUsUUFBRCxFQUFXbUgsTUFBTSxDQUFDbkgsUUFBRCxDQUFqQixDQUFQLENBREosS0FFSztBQUNELGdCQUFFOGUsTUFBRjtBQUNBSyxjQUFBQSxVQUFVLENBQUMsWUFBVztBQUNsQixrQkFBRUwsTUFBRjtBQUNBRixnQkFBQUEsT0FBTyxDQUFDNWUsUUFBRCxFQUFXbUgsTUFBTSxDQUFDbkgsUUFBRCxDQUFqQixDQUFQO0FBQ0gsZUFIUyxDQUFWO0FBSUg7QUFDRDtBQUNILFdBM0IwQixDQTZCM0I7OztBQUNBLGNBQUl5ZSxJQUFKLEVBQVU7QUFDTixnQkFBSTdnQixNQUFKOztBQUNBLGdCQUFJO0FBQ0FBLGNBQUFBLE1BQU0sR0FBR3pELElBQUksQ0FBQzRGLEVBQUwsQ0FBUXFmLFlBQVIsQ0FBcUJwZixRQUFyQixFQUErQm5DLFFBQS9CLENBQXdDLE1BQXhDLENBQVQ7QUFDSCxhQUZELENBRUUsT0FBT3ZDLEdBQVAsRUFBWTtBQUNWLGtCQUFJLENBQUN5akIsSUFBTCxFQUNJTCxNQUFNLENBQUNwakIsR0FBRCxDQUFOO0FBQ0o7QUFDSDs7QUFDRHNqQixZQUFBQSxPQUFPLENBQUM1ZSxRQUFELEVBQVdwQyxNQUFYLENBQVA7QUFDSCxXQVZELE1BVU87QUFDSCxjQUFFa2hCLE1BQUY7QUFDQTNrQixZQUFBQSxJQUFJLENBQUMwRixLQUFMLENBQVdHLFFBQVgsRUFBcUIsVUFBUzFFLEdBQVQsRUFBY3NDLE1BQWQsRUFBc0I7QUFDdkMsZ0JBQUVraEIsTUFBRjtBQUNBOztBQUNBLGtCQUFJLENBQUN6akIsUUFBTCxFQUNJLE9BSm1DLENBSTNCOztBQUNaLGtCQUFJQyxHQUFKLEVBQVM7QUFDTDtBQUNBLG9CQUFJLENBQUN5akIsSUFBTCxFQUNJTCxNQUFNLENBQUNwakIsR0FBRCxDQUFOLENBREosS0FFSyxJQUFJLENBQUN3akIsTUFBTCxFQUFhO0FBQ2RKLGtCQUFBQSxNQUFNLENBQUMsSUFBRCxFQUFPbkosSUFBUCxDQUFOO0FBQ0o7QUFDSDs7QUFDRHFKLGNBQUFBLE9BQU8sQ0FBQzVlLFFBQUQsRUFBV3BDLE1BQVgsQ0FBUDtBQUNILGFBZEQ7QUFlSDtBQUNKOztBQUNELFlBQUlraEIsTUFBTSxHQUFHLENBQWIsQ0EvRzZELENBaUg3RDtBQUNBOztBQUNBLFlBQUkza0IsSUFBSSxDQUFDK1QsUUFBTCxDQUFjbE8sUUFBZCxDQUFKLEVBQ0lBLFFBQVEsR0FBRyxDQUFFQSxRQUFGLENBQVg7O0FBQ0osYUFBSyxJQUFJL0QsQ0FBQyxHQUFHLENBQVIsRUFBV3NULFFBQWhCLEVBQTBCdFQsQ0FBQyxHQUFHK0QsUUFBUSxDQUFDbkYsTUFBdkMsRUFBK0MsRUFBRW9CLENBQWpEO0FBQ0ksY0FBSXNULFFBQVEsR0FBR2dHLElBQUksQ0FBQ2dKLFdBQUwsQ0FBaUIsRUFBakIsRUFBcUJ2ZSxRQUFRLENBQUMvRCxDQUFELENBQTdCLENBQWYsRUFDSTRELEtBQUssQ0FBQzBQLFFBQUQsQ0FBTDtBQUZSOztBQUlBLFlBQUlrUCxJQUFKLEVBQ0ksT0FBT2xKLElBQVA7QUFDSixZQUFJLENBQUN1SixNQUFMLEVBQ0lKLE1BQU0sQ0FBQyxJQUFELEVBQU9uSixJQUFQLENBQU47QUFDSixlQUFPbmMsU0FBUDtBQUNILE9BOUhELENBM0V5RCxDQTBNekQ7O0FBRUE7Ozs7Ozs7O0FBUUE7O0FBRUE7Ozs7Ozs7O0FBUUE7O0FBRUE7Ozs7Ozs7Ozs7QUFRQTJYLE1BQUFBLElBQUksQ0FBQzFSLFNBQUwsQ0FBZTJSLFFBQWYsR0FBMEIsU0FBU0EsUUFBVCxDQUFrQmhSLFFBQWxCLEVBQTRCQyxPQUE1QixFQUFxQztBQUMzRCxZQUFJLENBQUM5RixJQUFJLENBQUNrbEIsTUFBVixFQUNJLE1BQU1qaUIsS0FBSyxDQUFDLGVBQUQsQ0FBWDtBQUNKLGVBQU8sS0FBS3lULElBQUwsQ0FBVTdRLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCdWUsSUFBN0IsQ0FBUDtBQUNILE9BSkQ7QUFNQTs7Ozs7QUFHQXpOLE1BQUFBLElBQUksQ0FBQzFSLFNBQUwsQ0FBZW1WLFVBQWYsR0FBNEIsU0FBU0EsVUFBVCxHQUFzQjtBQUM5QyxZQUFJLEtBQUs2SixRQUFMLENBQWN4akIsTUFBbEIsRUFDSSxNQUFNdUMsS0FBSyxDQUFDLDhCQUE4QixLQUFLaWhCLFFBQUwsQ0FBY3BULEdBQWQsQ0FBa0IsVUFBU1osS0FBVCxFQUFnQjtBQUN4RSxpQkFBTyxhQUFhQSxLQUFLLENBQUNzRSxNQUFuQixHQUE0QixPQUE1QixHQUFzQ3RFLEtBQUssQ0FBQ29GLE1BQU4sQ0FBYTlFLFFBQTFEO0FBQ0gsU0FGeUMsRUFFdkM1TixJQUZ1QyxDQUVsQyxJQUZrQyxDQUEvQixDQUFYO0FBR0osZUFBT3VRLFNBQVMsQ0FBQ2pPLFNBQVYsQ0FBb0JtVixVQUFwQixDQUErQjVhLElBQS9CLENBQW9DLElBQXBDLENBQVA7QUFDSCxPQU5ELENBalB5RCxDQXlQekQ7OztBQUNBLFVBQUkwbEIsUUFBUSxHQUFHLFFBQWY7QUFFQTs7Ozs7Ozs7O0FBUUEsZUFBU0Msa0JBQVQsQ0FBNEJ6TyxJQUE1QixFQUFrQ3pHLEtBQWxDLEVBQXlDO0FBQ3JDLFlBQUltVixZQUFZLEdBQUduVixLQUFLLENBQUNvRixNQUFOLENBQWFnRixNQUFiLENBQW9CcEssS0FBSyxDQUFDc0UsTUFBMUIsQ0FBbkI7O0FBQ0EsWUFBSTZRLFlBQUosRUFBa0I7QUFDZCxjQUFJQyxXQUFXLEdBQUcsSUFBSWpSLEtBQUosQ0FBVW5FLEtBQUssQ0FBQ00sUUFBaEIsRUFBMEJOLEtBQUssQ0FBQ3pDLEVBQWhDLEVBQW9DeUMsS0FBSyxDQUFDMUMsSUFBMUMsRUFBZ0QwQyxLQUFLLENBQUNsQixJQUF0RCxFQUE0RC9QLFNBQTVELEVBQXVFaVIsS0FBSyxDQUFDcEssT0FBN0UsQ0FBbEI7QUFDQXdmLFVBQUFBLFdBQVcsQ0FBQ3hRLGNBQVosR0FBNkI1RSxLQUE3QjtBQUNBQSxVQUFBQSxLQUFLLENBQUMyRSxjQUFOLEdBQXVCeVEsV0FBdkI7QUFDQUQsVUFBQUEsWUFBWSxDQUFDdlIsR0FBYixDQUFpQndSLFdBQWpCO0FBQ0EsaUJBQU8sSUFBUDtBQUNIOztBQUNELGVBQU8sS0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O0FBTUExTyxNQUFBQSxJQUFJLENBQUMxUixTQUFMLENBQWU2VixVQUFmLEdBQTRCLFNBQVNBLFVBQVQsQ0FBb0J0QyxNQUFwQixFQUE0QjtBQUNwRCxZQUFJQSxNQUFNLFlBQVlwRSxLQUF0QixFQUE2QjtBQUV6QjtBQUFJO0FBQXVEb0UsVUFBQUEsTUFBTSxDQUFDakUsTUFBUCxLQUFrQnZWLFNBQWxCO0FBQStCO0FBQTBCLFdBQUN3WixNQUFNLENBQUM1RCxjQUE1SCxFQUNJLElBQUksQ0FBQ3VRLGtCQUFrQixDQUFDLElBQUQsRUFBTzNNLE1BQVAsQ0FBdkIsRUFDSSxLQUFLeUwsUUFBTCxDQUFjMWhCLElBQWQsQ0FBbUJpVyxNQUFuQjtBQUVYLFNBTkQsTUFNTyxJQUFJQSxNQUFNLFlBQVkxSSxJQUF0QixFQUE0QjtBQUUvQixjQUFJb1YsUUFBUSxDQUFDamlCLElBQVQsQ0FBY3VWLE1BQU0sQ0FBQ2xaLElBQXJCLENBQUosRUFDSWtaLE1BQU0sQ0FBQ25ELE1BQVAsQ0FBY21ELE1BQU0sQ0FBQ2xaLElBQXJCLElBQTZCa1osTUFBTSxDQUFDNUosTUFBcEMsQ0FIMkIsQ0FHaUI7QUFFbkQsU0FMTSxNQUtBLElBQUksRUFBRTRKLE1BQU0sWUFBWTFCLEtBQXBCLENBQUo7QUFBZ0M7QUFBcUM7QUFFeEUsZ0JBQUkwQixNQUFNLFlBQVluRSxJQUF0QixFQUE0QjtBQUN4QixtQkFBSyxJQUFJeFMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLb2lCLFFBQUwsQ0FBY3hqQixNQUFsQztBQUNJLG9CQUFJMGtCLGtCQUFrQixDQUFDLElBQUQsRUFBTyxLQUFLbEIsUUFBTCxDQUFjcGlCLENBQWQsQ0FBUCxDQUF0QixFQUNJLEtBQUtvaUIsUUFBTCxDQUFjM2UsTUFBZCxDQUFxQnpELENBQXJCLEVBQXdCLENBQXhCLEVBREosS0FHSSxFQUFFQSxDQUFGO0FBSlI7O0FBS0osaUJBQUssSUFBSU8sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUM7QUFBRztBQUFrQm9XLFlBQUFBLE1BQU0sQ0FBQ2UsV0FBUCxDQUFtQjlZLE1BQXpELEVBQWlFLEVBQUUyQixDQUFuRTtBQUFzRTtBQUNsRSxtQkFBSzBZLFVBQUwsQ0FBZ0J0QyxNQUFNLENBQUNXLFlBQVAsQ0FBb0IvVyxDQUFwQixDQUFoQjtBQURKOztBQUVBLGdCQUFJOGlCLFFBQVEsQ0FBQ2ppQixJQUFULENBQWN1VixNQUFNLENBQUNsWixJQUFyQixDQUFKLEVBQ0lrWixNQUFNLENBQUNuRCxNQUFQLENBQWNtRCxNQUFNLENBQUNsWixJQUFyQixJQUE2QmtaLE1BQTdCLENBWG9FLENBVy9CO0FBQzVDLFdBeEJtRCxDQTBCcEQ7QUFDQTtBQUNBOztBQUNILE9BN0JEO0FBK0JBOzs7Ozs7OztBQU1BN0IsTUFBQUEsSUFBSSxDQUFDMVIsU0FBTCxDQUFlOFYsYUFBZixHQUErQixTQUFTQSxhQUFULENBQXVCdkMsTUFBdkIsRUFBK0I7QUFDMUQsWUFBSUEsTUFBTSxZQUFZcEUsS0FBdEIsRUFBNkI7QUFFekI7QUFBSTtBQUF5Qm9FLFVBQUFBLE1BQU0sQ0FBQ2pFLE1BQVAsS0FBa0J2VixTQUEvQyxFQUEwRDtBQUN0RDtBQUFJO0FBQXNCd1osWUFBQUEsTUFBTSxDQUFDNUQsY0FBakMsRUFBaUQ7QUFBRTtBQUMvQzRELGNBQUFBLE1BQU0sQ0FBQzVELGNBQVAsQ0FBc0JTLE1BQXRCLENBQTZCbEIsTUFBN0IsQ0FBb0NxRSxNQUFNLENBQUM1RCxjQUEzQztBQUNBNEQsY0FBQUEsTUFBTSxDQUFDNUQsY0FBUCxHQUF3QixJQUF4QjtBQUNILGFBSEQsTUFHTztBQUFFO0FBQ0wsa0JBQUlqVSxLQUFLLEdBQUcsS0FBS3NqQixRQUFMLENBQWNuUyxPQUFkLENBQXNCMEcsTUFBdEIsQ0FBWjtBQUNBOztBQUNBLGtCQUFJN1gsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUNJLEtBQUtzakIsUUFBTCxDQUFjM2UsTUFBZCxDQUFxQjNFLEtBQXJCLEVBQTRCLENBQTVCO0FBQ1A7QUFDSjtBQUVKLFNBZEQsTUFjTyxJQUFJNlgsTUFBTSxZQUFZMUksSUFBdEIsRUFBNEI7QUFFL0IsY0FBSW9WLFFBQVEsQ0FBQ2ppQixJQUFULENBQWN1VixNQUFNLENBQUNsWixJQUFyQixDQUFKLEVBQ0ksT0FBT2taLE1BQU0sQ0FBQ25ELE1BQVAsQ0FBY21ELE1BQU0sQ0FBQ2xaLElBQXJCLENBQVAsQ0FIMkIsQ0FHUTtBQUUxQyxTQUxNLE1BS0EsSUFBSWtaLE1BQU0sWUFBWXRGLFNBQXRCLEVBQWlDO0FBRXBDLGVBQUssSUFBSXJSLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDO0FBQUc7QUFBa0IyVyxVQUFBQSxNQUFNLENBQUNlLFdBQVAsQ0FBbUI5WSxNQUF6RCxFQUFpRSxFQUFFb0IsQ0FBbkU7QUFBc0U7QUFDbEUsaUJBQUtrWixhQUFMLENBQW1CdkMsTUFBTSxDQUFDVyxZQUFQLENBQW9CdFgsQ0FBcEIsQ0FBbkI7QUFESjs7QUFHQSxjQUFJcWpCLFFBQVEsQ0FBQ2ppQixJQUFULENBQWN1VixNQUFNLENBQUNsWixJQUFyQixDQUFKLEVBQ0ksT0FBT2taLE1BQU0sQ0FBQ25ELE1BQVAsQ0FBY21ELE1BQU0sQ0FBQ2xaLElBQXJCLENBQVAsQ0FOZ0MsQ0FNRztBQUUxQztBQUNKLE9BN0JEOztBQStCQXFYLE1BQUFBLElBQUksQ0FBQ0wsVUFBTCxHQUFrQixVQUFTQyxLQUFULEVBQWdCK08sTUFBaEIsRUFBd0JDLE9BQXhCLEVBQWlDO0FBQy9DbFIsUUFBQUEsSUFBSSxHQUFHa0MsS0FBUDtBQUNBb0IsUUFBQUEsS0FBSyxHQUFHMk4sTUFBUjtBQUNBdlksUUFBQUEsTUFBTSxHQUFHd1ksT0FBVDtBQUNILE9BSkQ7QUFNQyxLQWhXdUIsRUFnV3RCO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSyxFQUFkO0FBQWlCLFlBQUssRUFBdEI7QUFBeUIsWUFBSyxFQUE5QjtBQUFpQyxZQUFLO0FBQXRDLEtBaFdzQixDQTNtS0Q7QUEyOEtzQixRQUFHLENBQUMsVUFBU3JsQixPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakY7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQixFQUFqQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkMsS0FwQitDLEVBb0I5QyxFQXBCOEMsQ0EzOEt6QjtBQSs5S2pCLFFBQUcsQ0FBQyxVQUFTUyxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDMUM7QUFFQTs7Ozs7QUFJQSxVQUFJK1gsR0FBRyxHQUFHL1gsT0FBVjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7OztBQVNBK1gsTUFBQUEsR0FBRyxDQUFDUixPQUFKLEdBQWM5VyxPQUFPLENBQUMsRUFBRCxDQUFyQjtBQUVDLEtBdENRLEVBc0NQO0FBQUMsWUFBSztBQUFOLEtBdENPLENBLzlLYztBQXFnTFYsUUFBRyxDQUFDLFVBQVNBLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUNqRDs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCdVgsT0FBakI7O0FBRUEsVUFBSWpYLElBQUksR0FBR0csT0FBTyxDQUFDLEVBQUQsQ0FBbEIsQ0FKaUQsQ0FNakQ7OztBQUNBLE9BQUM4VyxPQUFPLENBQUMvUixTQUFSLEdBQW9CbkIsTUFBTSxDQUFDaVAsTUFBUCxDQUFjaFQsSUFBSSxDQUFDZ0YsWUFBTCxDQUFrQkUsU0FBaEMsQ0FBckIsRUFBaUUrTixXQUFqRSxHQUErRWdFLE9BQS9FO0FBRUE7Ozs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVVBLGVBQVNBLE9BQVQsQ0FBaUJ3TyxPQUFqQixFQUEwQkMsZ0JBQTFCLEVBQTRDQyxpQkFBNUMsRUFBK0Q7QUFFM0QsWUFBSSxPQUFPRixPQUFQLEtBQW1CLFVBQXZCLEVBQ0ksTUFBTW5TLFNBQVMsQ0FBQyw0QkFBRCxDQUFmO0FBRUp0VCxRQUFBQSxJQUFJLENBQUNnRixZQUFMLENBQWtCdkYsSUFBbEIsQ0FBdUIsSUFBdkI7QUFFQTs7Ozs7QUFJQSxhQUFLZ21CLE9BQUwsR0FBZUEsT0FBZjtBQUVBOzs7OztBQUlBLGFBQUtDLGdCQUFMLEdBQXdCN1IsT0FBTyxDQUFDNlIsZ0JBQUQsQ0FBL0I7QUFFQTs7Ozs7QUFJQSxhQUFLQyxpQkFBTCxHQUF5QjlSLE9BQU8sQ0FBQzhSLGlCQUFELENBQWhDO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7OztBQVdBMU8sTUFBQUEsT0FBTyxDQUFDL1IsU0FBUixDQUFrQjBnQixPQUFsQixHQUE0QixTQUFTQSxPQUFULENBQWlCaEYsTUFBakIsRUFBeUJpRixXQUF6QixFQUFzQ0MsWUFBdEMsRUFBb0RDLE9BQXBELEVBQTZEN2tCLFFBQTdELEVBQXVFO0FBRS9GLFlBQUksQ0FBQzZrQixPQUFMLEVBQ0ksTUFBTXpTLFNBQVMsQ0FBQywyQkFBRCxDQUFmO0FBRUosWUFBSThILElBQUksR0FBRyxJQUFYO0FBQ0EsWUFBSSxDQUFDbGEsUUFBTCxFQUNJLE9BQU9sQixJQUFJLENBQUNJLFNBQUwsQ0FBZXdsQixPQUFmLEVBQXdCeEssSUFBeEIsRUFBOEJ3RixNQUE5QixFQUFzQ2lGLFdBQXRDLEVBQW1EQyxZQUFuRCxFQUFpRUMsT0FBakUsQ0FBUDs7QUFFSixZQUFJLENBQUMzSyxJQUFJLENBQUNxSyxPQUFWLEVBQW1CO0FBQ2ZULFVBQUFBLFVBQVUsQ0FBQyxZQUFXO0FBQUU5akIsWUFBQUEsUUFBUSxDQUFDK0IsS0FBSyxDQUFDLGVBQUQsQ0FBTixDQUFSO0FBQW1DLFdBQWpELEVBQW1ELENBQW5ELENBQVY7QUFDQSxpQkFBT2hFLFNBQVA7QUFDSDs7QUFFRCxZQUFJO0FBQ0EsaUJBQU9tYyxJQUFJLENBQUNxSyxPQUFMLENBQ0g3RSxNQURHLEVBRUhpRixXQUFXLENBQUN6SyxJQUFJLENBQUNzSyxnQkFBTCxHQUF3QixpQkFBeEIsR0FBNEMsUUFBN0MsQ0FBWCxDQUFrRUssT0FBbEUsRUFBMkV4QixNQUEzRSxFQUZHLEVBR0gsU0FBU3lCLFdBQVQsQ0FBcUI3a0IsR0FBckIsRUFBMEJxRyxRQUExQixFQUFvQztBQUVoQyxnQkFBSXJHLEdBQUosRUFBUztBQUNMaWEsY0FBQUEsSUFBSSxDQUFDNVYsSUFBTCxDQUFVLE9BQVYsRUFBbUJyRSxHQUFuQixFQUF3QnlmLE1BQXhCO0FBQ0EscUJBQU8xZixRQUFRLENBQUNDLEdBQUQsQ0FBZjtBQUNIOztBQUVELGdCQUFJcUcsUUFBUSxLQUFLLElBQWpCLEVBQXVCO0FBQ25CNFQsY0FBQUEsSUFBSSxDQUFDbFosR0FBTDtBQUFTO0FBQWlCLGtCQUExQjtBQUNBLHFCQUFPakQsU0FBUDtBQUNIOztBQUVELGdCQUFJLEVBQUV1SSxRQUFRLFlBQVlzZSxZQUF0QixDQUFKLEVBQXlDO0FBQ3JDLGtCQUFJO0FBQ0F0ZSxnQkFBQUEsUUFBUSxHQUFHc2UsWUFBWSxDQUFDMUssSUFBSSxDQUFDdUssaUJBQUwsR0FBeUIsaUJBQXpCLEdBQTZDLFFBQTlDLENBQVosQ0FBb0VuZSxRQUFwRSxDQUFYO0FBQ0gsZUFGRCxDQUVFLE9BQU9yRyxHQUFQLEVBQVk7QUFDVmlhLGdCQUFBQSxJQUFJLENBQUM1VixJQUFMLENBQVUsT0FBVixFQUFtQnJFLEdBQW5CLEVBQXdCeWYsTUFBeEI7QUFDQSx1QkFBTzFmLFFBQVEsQ0FBQ0MsR0FBRCxDQUFmO0FBQ0g7QUFDSjs7QUFFRGlhLFlBQUFBLElBQUksQ0FBQzVWLElBQUwsQ0FBVSxNQUFWLEVBQWtCZ0MsUUFBbEIsRUFBNEJvWixNQUE1QjtBQUNBLG1CQUFPMWYsUUFBUSxDQUFDLElBQUQsRUFBT3NHLFFBQVAsQ0FBZjtBQUNILFdBMUJFLENBQVA7QUE0QkgsU0E3QkQsQ0E2QkUsT0FBT3JHLEdBQVAsRUFBWTtBQUNWaWEsVUFBQUEsSUFBSSxDQUFDNVYsSUFBTCxDQUFVLE9BQVYsRUFBbUJyRSxHQUFuQixFQUF3QnlmLE1BQXhCO0FBQ0FvRSxVQUFBQSxVQUFVLENBQUMsWUFBVztBQUFFOWpCLFlBQUFBLFFBQVEsQ0FBQ0MsR0FBRCxDQUFSO0FBQWdCLFdBQTlCLEVBQWdDLENBQWhDLENBQVY7QUFDQSxpQkFBT2xDLFNBQVA7QUFDSDtBQUNKLE9BaEREO0FBa0RBOzs7Ozs7O0FBS0FnWSxNQUFBQSxPQUFPLENBQUMvUixTQUFSLENBQWtCaEQsR0FBbEIsR0FBd0IsU0FBU0EsR0FBVCxDQUFhK2pCLFVBQWIsRUFBeUI7QUFDN0MsWUFBSSxLQUFLUixPQUFULEVBQWtCO0FBQ2QsY0FBSSxDQUFDUSxVQUFMLEVBQWlCO0FBQ2IsaUJBQUtSLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCO0FBQ0osZUFBS0EsT0FBTCxHQUFlLElBQWY7QUFDQSxlQUFLamdCLElBQUwsQ0FBVSxLQUFWLEVBQWlCSCxHQUFqQjtBQUNIOztBQUNELGVBQU8sSUFBUDtBQUNILE9BUkQ7QUFVQyxLQWhKZSxFQWdKZDtBQUFDLFlBQUs7QUFBTixLQWhKYyxDQXJnTE87QUFxcExWLFFBQUcsQ0FBQyxVQUFTbEYsT0FBVCxFQUFpQkQsTUFBakIsRUFBd0JSLE9BQXhCLEVBQWdDO0FBQ2pEOztBQUNBUSxNQUFBQSxNQUFNLENBQUNSLE9BQVAsR0FBaUJ1WCxPQUFqQixDQUZpRCxDQUlqRDs7QUFDQSxVQUFJOUQsU0FBUyxHQUFHaFQsT0FBTyxDQUFDLEVBQUQsQ0FBdkI7O0FBQ0EsT0FBQyxDQUFDOFcsT0FBTyxDQUFDL1IsU0FBUixHQUFvQm5CLE1BQU0sQ0FBQ2lQLE1BQVAsQ0FBY0csU0FBUyxDQUFDak8sU0FBeEIsQ0FBckIsRUFBeUQrTixXQUF6RCxHQUF1RWdFLE9BQXhFLEVBQWlGL0QsU0FBakYsR0FBNkYsU0FBN0Y7O0FBRUEsVUFBSWdFLE1BQU0sR0FBRy9XLE9BQU8sQ0FBQyxFQUFELENBQXBCO0FBQUEsVUFDSUgsSUFBSSxHQUFLRyxPQUFPLENBQUMsRUFBRCxDQURwQjtBQUFBLFVBRUlzWCxHQUFHLEdBQU10WCxPQUFPLENBQUMsRUFBRCxDQUZwQjtBQUlBOzs7Ozs7Ozs7OztBQVNBLGVBQVM4VyxPQUFULENBQWlCMVgsSUFBakIsRUFBdUJ1RyxPQUF2QixFQUFnQztBQUM1QnFOLFFBQUFBLFNBQVMsQ0FBQzFULElBQVYsQ0FBZSxJQUFmLEVBQXFCRixJQUFyQixFQUEyQnVHLE9BQTNCO0FBRUE7Ozs7O0FBSUEsYUFBSzhULE9BQUwsR0FBZSxFQUFmLENBUDRCLENBT1Q7O0FBRW5COzs7Ozs7QUFLQSxhQUFLc00sYUFBTCxHQUFxQixJQUFyQjtBQUNIO0FBRUQ7Ozs7Ozs7QUFPQTs7Ozs7Ozs7O0FBT0FqUCxNQUFBQSxPQUFPLENBQUN6RCxRQUFSLEdBQW1CLFNBQVNBLFFBQVQsQ0FBa0JqVSxJQUFsQixFQUF3QjJOLElBQXhCLEVBQThCO0FBQzdDLFlBQUl1VCxPQUFPLEdBQUcsSUFBSXhKLE9BQUosQ0FBWTFYLElBQVosRUFBa0IyTixJQUFJLENBQUNwSCxPQUF2QixDQUFkO0FBQ0E7O0FBQ0EsWUFBSW9ILElBQUksQ0FBQzBNLE9BQVQsRUFDSSxLQUFLLElBQUlELEtBQUssR0FBRzVWLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZa0osSUFBSSxDQUFDME0sT0FBakIsQ0FBWixFQUF1QzlYLENBQUMsR0FBRyxDQUFoRCxFQUFtREEsQ0FBQyxHQUFHNlgsS0FBSyxDQUFDalosTUFBN0QsRUFBcUUsRUFBRW9CLENBQXZFO0FBQ0kyZSxVQUFBQSxPQUFPLENBQUMzTSxHQUFSLENBQVlvRCxNQUFNLENBQUMxRCxRQUFQLENBQWdCbUcsS0FBSyxDQUFDN1gsQ0FBRCxDQUFyQixFQUEwQm9MLElBQUksQ0FBQzBNLE9BQUwsQ0FBYUQsS0FBSyxDQUFDN1gsQ0FBRCxDQUFsQixDQUExQixDQUFaO0FBREo7QUFFSixZQUFJb0wsSUFBSSxDQUFDQyxNQUFULEVBQ0lzVCxPQUFPLENBQUN6SCxPQUFSLENBQWdCOUwsSUFBSSxDQUFDQyxNQUFyQjtBQUNKc1QsUUFBQUEsT0FBTyxDQUFDck4sT0FBUixHQUFrQmxHLElBQUksQ0FBQ2tHLE9BQXZCO0FBQ0EsZUFBT3FOLE9BQVA7QUFDSCxPQVZEO0FBWUE7Ozs7Ozs7QUFLQXhKLE1BQUFBLE9BQU8sQ0FBQy9SLFNBQVIsQ0FBa0J3TyxNQUFsQixHQUEyQixTQUFTQSxNQUFULENBQWdCQyxhQUFoQixFQUErQjtBQUN0RCxZQUFJd1MsU0FBUyxHQUFHaFQsU0FBUyxDQUFDak8sU0FBVixDQUFvQndPLE1BQXBCLENBQTJCalUsSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0NrVSxhQUF0QyxDQUFoQjtBQUNBLFlBQUlDLFlBQVksR0FBR0QsYUFBYSxHQUFHRSxPQUFPLENBQUNGLGFBQWEsQ0FBQ0MsWUFBZixDQUFWLEdBQXlDLEtBQXpFO0FBQ0EsZUFBTzVULElBQUksQ0FBQ2dSLFFBQUwsQ0FBYyxDQUNqQixTQURpQixFQUNMbVYsU0FBUyxJQUFJQSxTQUFTLENBQUNyZ0IsT0FBdkIsSUFBa0M3RyxTQUQ3QixFQUVqQixTQUZpQixFQUVMa1UsU0FBUyxDQUFDOEYsV0FBVixDQUFzQixLQUFLbU4sWUFBM0IsRUFBeUN6UyxhQUF6QztBQUEyRDtBQUEyQixVQUZqRixFQUdqQixRQUhpQixFQUdMd1MsU0FBUyxJQUFJQSxTQUFTLENBQUNoWixNQUF2QixJQUFpQ2xPLFNBSDVCLEVBSWpCLFNBSmlCLEVBSUwyVSxZQUFZLEdBQUcsS0FBS1IsT0FBUixHQUFrQm5VLFNBSnpCLENBQWQsQ0FBUDtBQU1ILE9BVEQ7QUFXQTs7Ozs7Ozs7QUFNQThFLE1BQUFBLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0JpQyxPQUFPLENBQUMvUixTQUE5QixFQUF5QyxjQUF6QyxFQUF5RDtBQUNyRDBLLFFBQUFBLEdBQUcsRUFBRSxlQUFXO0FBQ1osaUJBQU8sS0FBS3NXLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQmxtQixJQUFJLENBQUN1WixPQUFMLENBQWEsS0FBS0ssT0FBbEIsQ0FBNUMsQ0FBUDtBQUNIO0FBSG9ELE9BQXpEOztBQU1BLGVBQVNQLFVBQVQsQ0FBb0JvSCxPQUFwQixFQUE2QjtBQUN6QkEsUUFBQUEsT0FBTyxDQUFDeUYsYUFBUixHQUF3QixJQUF4QjtBQUNBLGVBQU96RixPQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQXhKLE1BQUFBLE9BQU8sQ0FBQy9SLFNBQVIsQ0FBa0IwSyxHQUFsQixHQUF3QixTQUFTQSxHQUFULENBQWFyUSxJQUFiLEVBQW1CO0FBQ3ZDLGVBQU8sS0FBS3FhLE9BQUwsQ0FBYXJhLElBQWIsS0FDQTRULFNBQVMsQ0FBQ2pPLFNBQVYsQ0FBb0IwSyxHQUFwQixDQUF3Qm5RLElBQXhCLENBQTZCLElBQTdCLEVBQW1DRixJQUFuQyxDQURQO0FBRUgsT0FIRDtBQUtBOzs7OztBQUdBMFgsTUFBQUEsT0FBTyxDQUFDL1IsU0FBUixDQUFrQm1WLFVBQWxCLEdBQStCLFNBQVNBLFVBQVQsR0FBc0I7QUFDakQsWUFBSVQsT0FBTyxHQUFHLEtBQUt3TSxZQUFuQjs7QUFDQSxhQUFLLElBQUl0a0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzhYLE9BQU8sQ0FBQ2xaLE1BQTVCLEVBQW9DLEVBQUVvQixDQUF0QztBQUNJOFgsVUFBQUEsT0FBTyxDQUFDOVgsQ0FBRCxDQUFQLENBQVdkLE9BQVg7QUFESjs7QUFFQSxlQUFPbVMsU0FBUyxDQUFDak8sU0FBVixDQUFvQmxFLE9BQXBCLENBQTRCdkIsSUFBNUIsQ0FBaUMsSUFBakMsQ0FBUDtBQUNILE9BTEQ7QUFPQTs7Ozs7QUFHQXdYLE1BQUFBLE9BQU8sQ0FBQy9SLFNBQVIsQ0FBa0I0TyxHQUFsQixHQUF3QixTQUFTQSxHQUFULENBQWEyRSxNQUFiLEVBQXFCO0FBRXpDO0FBQ0EsWUFBSSxLQUFLN0ksR0FBTCxDQUFTNkksTUFBTSxDQUFDbFosSUFBaEIsQ0FBSixFQUNJLE1BQU0wRCxLQUFLLENBQUMscUJBQXFCd1YsTUFBTSxDQUFDbFosSUFBNUIsR0FBbUMsT0FBbkMsR0FBNkMsSUFBOUMsQ0FBWDs7QUFFSixZQUFJa1osTUFBTSxZQUFZdkIsTUFBdEIsRUFBOEI7QUFDMUIsZUFBSzBDLE9BQUwsQ0FBYW5CLE1BQU0sQ0FBQ2xaLElBQXBCLElBQTRCa1osTUFBNUI7QUFDQUEsVUFBQUEsTUFBTSxDQUFDbkQsTUFBUCxHQUFnQixJQUFoQjtBQUNBLGlCQUFPK0QsVUFBVSxDQUFDLElBQUQsQ0FBakI7QUFDSDs7QUFDRCxlQUFPbEcsU0FBUyxDQUFDak8sU0FBVixDQUFvQjRPLEdBQXBCLENBQXdCclUsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNnWixNQUFuQyxDQUFQO0FBQ0gsT0FaRDtBQWNBOzs7OztBQUdBeEIsTUFBQUEsT0FBTyxDQUFDL1IsU0FBUixDQUFrQmtQLE1BQWxCLEdBQTJCLFNBQVNBLE1BQVQsQ0FBZ0JxRSxNQUFoQixFQUF3QjtBQUMvQyxZQUFJQSxNQUFNLFlBQVl2QixNQUF0QixFQUE4QjtBQUUxQjtBQUNBLGNBQUksS0FBSzBDLE9BQUwsQ0FBYW5CLE1BQU0sQ0FBQ2xaLElBQXBCLE1BQThCa1osTUFBbEMsRUFDSSxNQUFNeFYsS0FBSyxDQUFDd1YsTUFBTSxHQUFHLHNCQUFULEdBQWtDLElBQW5DLENBQVg7QUFFSixpQkFBTyxLQUFLbUIsT0FBTCxDQUFhbkIsTUFBTSxDQUFDbFosSUFBcEIsQ0FBUDtBQUNBa1osVUFBQUEsTUFBTSxDQUFDbkQsTUFBUCxHQUFnQixJQUFoQjtBQUNBLGlCQUFPK0QsVUFBVSxDQUFDLElBQUQsQ0FBakI7QUFDSDs7QUFDRCxlQUFPbEcsU0FBUyxDQUFDak8sU0FBVixDQUFvQmtQLE1BQXBCLENBQTJCM1UsSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0NnWixNQUF0QyxDQUFQO0FBQ0gsT0FaRDtBQWNBOzs7Ozs7Ozs7QUFPQXhCLE1BQUFBLE9BQU8sQ0FBQy9SLFNBQVIsQ0FBa0I4TixNQUFsQixHQUEyQixTQUFTQSxNQUFULENBQWdCeVMsT0FBaEIsRUFBeUJDLGdCQUF6QixFQUEyQ0MsaUJBQTNDLEVBQThEO0FBQ3JGLFlBQUlVLFVBQVUsR0FBRyxJQUFJNU8sR0FBRyxDQUFDUixPQUFSLENBQWdCd08sT0FBaEIsRUFBeUJDLGdCQUF6QixFQUEyQ0MsaUJBQTNDLENBQWpCOztBQUNBLGFBQUssSUFBSTdqQixDQUFDLEdBQUcsQ0FBUixFQUFXOGUsTUFBaEIsRUFBd0I5ZSxDQUFDO0FBQUc7QUFBa0IsYUFBS3NrQixZQUFMLENBQWtCMWxCLE1BQWhFLEVBQXdFLEVBQUVvQixDQUExRSxFQUE2RTtBQUN6RSxjQUFJd2tCLFVBQVUsR0FBR3RtQixJQUFJLENBQUMyZixPQUFMLENBQWEsQ0FBQ2lCLE1BQU0sR0FBRyxLQUFLc0YsYUFBTCxDQUFtQnBrQixDQUFuQixDQUFWLEVBQWlDZCxPQUFqQyxHQUEyQ3pCLElBQXhELEVBQThEZ0YsT0FBOUQsQ0FBc0UsVUFBdEUsRUFBa0YsRUFBbEYsQ0FBakI7QUFDQThoQixVQUFBQSxVQUFVLENBQUNDLFVBQUQsQ0FBVixHQUF5QnRtQixJQUFJLENBQUNtRCxPQUFMLENBQWEsQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFiLEVBQXdCbkQsSUFBSSxDQUFDdW1CLFVBQUwsQ0FBZ0JELFVBQWhCLElBQThCQSxVQUFVLEdBQUcsR0FBM0MsR0FBaURBLFVBQXpFLEVBQXFGLGdDQUFyRixFQUF1SDtBQUM1SUUsWUFBQUEsQ0FBQyxFQUFFNUYsTUFEeUk7QUFFNUk2RixZQUFBQSxDQUFDLEVBQUU3RixNQUFNLENBQUMvSCxtQkFBUCxDQUEyQmhELElBRjhHO0FBRzVJNlEsWUFBQUEsQ0FBQyxFQUFFOUYsTUFBTSxDQUFDOUgsb0JBQVAsQ0FBNEJqRDtBQUg2RyxXQUF2SCxDQUF6QjtBQUtIOztBQUNELGVBQU93USxVQUFQO0FBQ0gsT0FYRDtBQWFDLEtBektlLEVBeUtkO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSyxFQUFkO0FBQWlCLFlBQUssRUFBdEI7QUFBeUIsWUFBSztBQUE5QixLQXpLYyxDQXJwTE87QUE4ekxjLFFBQUcsQ0FBQyxVQUFTbG1CLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUN6RTs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCaVksUUFBakI7QUFFQSxVQUFJZ1AsT0FBTyxHQUFVLHNCQUFyQjtBQUFBLFVBQ0lDLGNBQWMsR0FBRyxpQ0FEckI7QUFBQSxVQUVJQyxjQUFjLEdBQUcsaUNBRnJCO0FBSUEsVUFBSUMsWUFBWSxHQUFHLFlBQW5CO0FBQUEsVUFDSUMsZUFBZSxHQUFHLFlBRHRCO0FBQUEsVUFFSUMsaUJBQWlCLEdBQUcsS0FGeEI7QUFBQSxVQUdJQyxZQUFZLEdBQUcsSUFIbkI7QUFBQSxVQUlJQyxVQUFVLEdBQUcsU0FKakI7QUFNQSxVQUFJQyxXQUFXLEdBQUc7QUFDZCxhQUFLLElBRFM7QUFFZCxhQUFLLElBRlM7QUFHZCxhQUFLLElBSFM7QUFJZCxhQUFLO0FBSlMsT0FBbEI7QUFPQTs7Ozs7Ozs7QUFPQSxlQUFTQyxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUNuQixlQUFPQSxHQUFHLENBQUM5aUIsT0FBSixDQUFZMmlCLFVBQVosRUFBd0IsVUFBUzFpQixFQUFULEVBQWFDLEVBQWIsRUFBaUI7QUFDNUMsa0JBQVFBLEVBQVI7QUFDSSxpQkFBSyxJQUFMO0FBQ0EsaUJBQUssRUFBTDtBQUNJLHFCQUFPQSxFQUFQOztBQUNKO0FBQ0kscUJBQU8waUIsV0FBVyxDQUFDMWlCLEVBQUQsQ0FBWCxJQUFtQixFQUExQjtBQUxSO0FBT0gsU0FSTSxDQUFQO0FBU0g7O0FBRURrVCxNQUFBQSxRQUFRLENBQUN5UCxRQUFULEdBQW9CQSxRQUFwQjtBQUVBOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7O0FBTUEsZUFBU3pQLFFBQVQsQ0FBa0JsVSxNQUFsQixFQUEwQjhZLG9CQUExQixFQUFnRDtBQUM1QztBQUNBOVksUUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNDLFFBQVAsRUFBVDtBQUVBLFlBQUkvQyxNQUFNLEdBQUcsQ0FBYjtBQUFBLFlBQ0lELE1BQU0sR0FBRytDLE1BQU0sQ0FBQy9DLE1BRHBCO0FBQUEsWUFFSTZjLElBQUksR0FBRyxDQUZYO0FBQUEsWUFHSStKLFdBQVcsR0FBRyxJQUhsQjtBQUFBLFlBSUlDLFdBQVcsR0FBRyxJQUpsQjtBQUFBLFlBS0lDLFdBQVcsR0FBRyxDQUxsQjtBQUFBLFlBTUlDLGdCQUFnQixHQUFHLEtBTnZCO0FBUUEsWUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFFQSxZQUFJQyxXQUFXLEdBQUcsSUFBbEI7QUFFQTs7QUFDQTs7Ozs7OztBQU1BLGlCQUFTdkssT0FBVCxDQUFpQndLLE9BQWpCLEVBQTBCO0FBQ3RCLGlCQUFPM2tCLEtBQUssQ0FBQyxhQUFhMmtCLE9BQWIsR0FBdUIsU0FBdkIsR0FBbUNySyxJQUFuQyxHQUEwQyxHQUEzQyxDQUFaO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLGlCQUFTQyxVQUFULEdBQXNCO0FBQ2xCLGNBQUlxSyxFQUFFLEdBQUdGLFdBQVcsS0FBSyxHQUFoQixHQUFzQmQsY0FBdEIsR0FBdUNELGNBQWhEO0FBQ0FpQixVQUFBQSxFQUFFLENBQUNDLFNBQUgsR0FBZW5uQixNQUFNLEdBQUcsQ0FBeEI7QUFDQSxjQUFJb25CLEtBQUssR0FBR0YsRUFBRSxDQUFDRyxJQUFILENBQVF2a0IsTUFBUixDQUFaO0FBQ0EsY0FBSSxDQUFDc2tCLEtBQUwsRUFDSSxNQUFNM0ssT0FBTyxDQUFDLFFBQUQsQ0FBYjtBQUNKemMsVUFBQUEsTUFBTSxHQUFHa25CLEVBQUUsQ0FBQ0MsU0FBWjtBQUNBdGxCLFVBQUFBLElBQUksQ0FBQ21sQixXQUFELENBQUo7QUFDQUEsVUFBQUEsV0FBVyxHQUFHLElBQWQ7QUFDQSxpQkFBT1AsUUFBUSxDQUFDVyxLQUFLLENBQUMsQ0FBRCxDQUFOLENBQWY7QUFDSDtBQUVEOzs7Ozs7OztBQU1BLGlCQUFTdG1CLE1BQVQsQ0FBZ0I4RyxHQUFoQixFQUFxQjtBQUNqQixpQkFBTzlFLE1BQU0sQ0FBQ2hDLE1BQVAsQ0FBYzhHLEdBQWQsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7OztBQU9BLGlCQUFTMGYsVUFBVCxDQUFvQmhtQixLQUFwQixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUJvbEIsVUFBQUEsV0FBVyxHQUFHN2pCLE1BQU0sQ0FBQ2hDLE1BQVAsQ0FBY1EsS0FBSyxFQUFuQixDQUFkO0FBQ0F1bEIsVUFBQUEsV0FBVyxHQUFHakssSUFBZDtBQUNBa0ssVUFBQUEsZ0JBQWdCLEdBQUcsS0FBbkI7QUFDQSxjQUFJUyxRQUFKOztBQUNBLGNBQUkzTCxvQkFBSixFQUEwQjtBQUN0QjJMLFlBQUFBLFFBQVEsR0FBRyxDQUFYLENBRHNCLENBQ1A7QUFDbEIsV0FGRCxNQUVPO0FBQ0hBLFlBQUFBLFFBQVEsR0FBRyxDQUFYLENBREcsQ0FDWTtBQUNsQjs7QUFDRCxjQUFJQyxhQUFhLEdBQUdsbUIsS0FBSyxHQUFHaW1CLFFBQTVCO0FBQUEsY0FDSW5sQixDQURKOztBQUVBLGFBQUc7QUFDQyxnQkFBSSxFQUFFb2xCLGFBQUYsR0FBa0IsQ0FBbEIsSUFDSSxDQUFDcGxCLENBQUMsR0FBR1UsTUFBTSxDQUFDaEMsTUFBUCxDQUFjMG1CLGFBQWQsQ0FBTCxNQUF1QyxJQUQvQyxFQUNxRDtBQUNqRFYsY0FBQUEsZ0JBQWdCLEdBQUcsSUFBbkI7QUFDQTtBQUNIO0FBQ0osV0FORCxRQU1TMWtCLENBQUMsS0FBSyxHQUFOLElBQWFBLENBQUMsS0FBSyxJQU41Qjs7QUFPQSxjQUFJcWxCLEtBQUssR0FBRzNrQixNQUFNLENBQ2J1YSxTQURPLENBQ0cvYixLQURILEVBQ1VDLEdBRFYsRUFFUHVKLEtBRk8sQ0FFRHViLGlCQUZDLENBQVo7O0FBR0EsZUFBSyxJQUFJbGxCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdzbUIsS0FBSyxDQUFDMW5CLE1BQTFCLEVBQWtDLEVBQUVvQixDQUFwQztBQUNJc21CLFlBQUFBLEtBQUssQ0FBQ3RtQixDQUFELENBQUwsR0FBV3NtQixLQUFLLENBQUN0bUIsQ0FBRCxDQUFMLENBQ055QyxPQURNLENBQ0VnWSxvQkFBb0IsR0FBR3dLLGVBQUgsR0FBcUJELFlBRDNDLEVBQ3lELEVBRHpELEVBRU51QixJQUZNLEVBQVg7QUFESjs7QUFJQWQsVUFBQUEsV0FBVyxHQUFHYSxLQUFLLENBQ2R4bEIsSUFEUyxDQUNKLElBREksRUFFVHlsQixJQUZTLEVBQWQ7QUFHSDs7QUFFRCxpQkFBU0Msd0JBQVQsQ0FBa0NDLFdBQWxDLEVBQStDO0FBQzNDLGNBQUlDLFNBQVMsR0FBR0MsYUFBYSxDQUFDRixXQUFELENBQTdCLENBRDJDLENBRzNDOztBQUNBLGNBQUlHLFFBQVEsR0FBR2psQixNQUFNLENBQUN1YSxTQUFQLENBQWlCdUssV0FBakIsRUFBOEJDLFNBQTlCLENBQWYsQ0FKMkMsQ0FLM0M7QUFDQTs7QUFDQSxjQUFJRyxTQUFTLEdBQUcsY0FBY3psQixJQUFkLENBQW1Cd2xCLFFBQW5CLENBQWhCO0FBQ0EsaUJBQU9DLFNBQVA7QUFDSDs7QUFFRCxpQkFBU0YsYUFBVCxDQUF1QkcsTUFBdkIsRUFBK0I7QUFDM0I7QUFDQSxjQUFJSixTQUFTLEdBQUdJLE1BQWhCOztBQUNBLGlCQUFPSixTQUFTLEdBQUc5bkIsTUFBWixJQUFzQmUsTUFBTSxDQUFDK21CLFNBQUQsQ0FBTixLQUFzQixJQUFuRCxFQUF5RDtBQUNyREEsWUFBQUEsU0FBUztBQUNaOztBQUNELGlCQUFPQSxTQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLGlCQUFTaE0sSUFBVCxHQUFnQjtBQUNaLGNBQUlrTCxLQUFLLENBQUNobkIsTUFBTixHQUFlLENBQW5CLEVBQ0ksT0FBT2duQixLQUFLLENBQUM5YixLQUFOLEVBQVA7QUFDSixjQUFJK2IsV0FBSixFQUNJLE9BQU9uSyxVQUFVLEVBQWpCO0FBQ0osY0FBSXFMLE1BQUosRUFDSS9PLElBREosRUFFSWdQLElBRkosRUFHSTdtQixLQUhKLEVBSUk4bUIsS0FKSjs7QUFLQSxhQUFHO0FBQ0MsZ0JBQUlwb0IsTUFBTSxLQUFLRCxNQUFmLEVBQ0ksT0FBTyxJQUFQO0FBQ0ptb0IsWUFBQUEsTUFBTSxHQUFHLEtBQVQ7O0FBQ0EsbUJBQU81QixZQUFZLENBQUMvakIsSUFBYixDQUFrQjRsQixJQUFJLEdBQUdybkIsTUFBTSxDQUFDZCxNQUFELENBQS9CLENBQVAsRUFBaUQ7QUFDN0Msa0JBQUltb0IsSUFBSSxLQUFLLElBQWIsRUFDSSxFQUFFdkwsSUFBRjtBQUNKLGtCQUFJLEVBQUU1YyxNQUFGLEtBQWFELE1BQWpCLEVBQ0ksT0FBTyxJQUFQO0FBQ1A7O0FBRUQsZ0JBQUllLE1BQU0sQ0FBQ2QsTUFBRCxDQUFOLEtBQW1CLEdBQXZCLEVBQTRCO0FBQ3hCLGtCQUFJLEVBQUVBLE1BQUYsS0FBYUQsTUFBakIsRUFBeUI7QUFDckIsc0JBQU0wYyxPQUFPLENBQUMsU0FBRCxDQUFiO0FBQ0g7O0FBQ0Qsa0JBQUkzYixNQUFNLENBQUNkLE1BQUQsQ0FBTixLQUFtQixHQUF2QixFQUE0QjtBQUFFO0FBQzFCLG9CQUFJLENBQUM0YixvQkFBTCxFQUEyQjtBQUN2QjtBQUNBd00sa0JBQUFBLEtBQUssR0FBR3RuQixNQUFNLENBQUNRLEtBQUssR0FBR3RCLE1BQU0sR0FBRyxDQUFsQixDQUFOLEtBQStCLEdBQXZDOztBQUVBLHlCQUFPYyxNQUFNLENBQUMsRUFBRWQsTUFBSCxDQUFOLEtBQXFCLElBQTVCLEVBQWtDO0FBQzlCLHdCQUFJQSxNQUFNLEtBQUtELE1BQWYsRUFBdUI7QUFDbkIsNkJBQU8sSUFBUDtBQUNIO0FBQ0o7O0FBQ0Qsb0JBQUVDLE1BQUY7O0FBQ0Esc0JBQUlvb0IsS0FBSixFQUFXO0FBQ1BkLG9CQUFBQSxVQUFVLENBQUNobUIsS0FBRCxFQUFRdEIsTUFBTSxHQUFHLENBQWpCLENBQVY7QUFDSDs7QUFDRCxvQkFBRTRjLElBQUY7QUFDQXNMLGtCQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNILGlCQWZELE1BZU87QUFDSDtBQUNBNW1CLGtCQUFBQSxLQUFLLEdBQUd0QixNQUFSO0FBQ0Fvb0Isa0JBQUFBLEtBQUssR0FBRyxLQUFSOztBQUNBLHNCQUFJVCx3QkFBd0IsQ0FBQzNuQixNQUFELENBQTVCLEVBQXNDO0FBQ2xDb29CLG9CQUFBQSxLQUFLLEdBQUcsSUFBUjs7QUFDQSx1QkFBRztBQUNDcG9CLHNCQUFBQSxNQUFNLEdBQUc4bkIsYUFBYSxDQUFDOW5CLE1BQUQsQ0FBdEI7O0FBQ0EsMEJBQUlBLE1BQU0sS0FBS0QsTUFBZixFQUF1QjtBQUNuQjtBQUNIOztBQUNEQyxzQkFBQUEsTUFBTTtBQUNULHFCQU5ELFFBTVMybkIsd0JBQXdCLENBQUMzbkIsTUFBRCxDQU5qQztBQU9ILG1CQVRELE1BU087QUFDSEEsb0JBQUFBLE1BQU0sR0FBR2UsSUFBSSxDQUFDdWlCLEdBQUwsQ0FBU3ZqQixNQUFULEVBQWlCK25CLGFBQWEsQ0FBQzluQixNQUFELENBQWIsR0FBd0IsQ0FBekMsQ0FBVDtBQUNIOztBQUNELHNCQUFJb29CLEtBQUosRUFBVztBQUNQZCxvQkFBQUEsVUFBVSxDQUFDaG1CLEtBQUQsRUFBUXRCLE1BQVIsQ0FBVjtBQUNIOztBQUNENGMsa0JBQUFBLElBQUk7QUFDSnNMLGtCQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNIO0FBQ0osZUF0Q0QsTUFzQ08sSUFBSSxDQUFDQyxJQUFJLEdBQUdybkIsTUFBTSxDQUFDZCxNQUFELENBQWQsTUFBNEIsR0FBaEMsRUFBcUM7QUFBRTtBQUMxQztBQUNBc0IsZ0JBQUFBLEtBQUssR0FBR3RCLE1BQU0sR0FBRyxDQUFqQjtBQUNBb29CLGdCQUFBQSxLQUFLLEdBQUd4TSxvQkFBb0IsSUFBSTlhLE1BQU0sQ0FBQ1EsS0FBRCxDQUFOLEtBQWtCLEdBQWxEOztBQUNBLG1CQUFHO0FBQ0Msc0JBQUk2bUIsSUFBSSxLQUFLLElBQWIsRUFBbUI7QUFDZixzQkFBRXZMLElBQUY7QUFDSDs7QUFDRCxzQkFBSSxFQUFFNWMsTUFBRixLQUFhRCxNQUFqQixFQUF5QjtBQUNyQiwwQkFBTTBjLE9BQU8sQ0FBQyxTQUFELENBQWI7QUFDSDs7QUFDRHRELGtCQUFBQSxJQUFJLEdBQUdnUCxJQUFQO0FBQ0FBLGtCQUFBQSxJQUFJLEdBQUdybkIsTUFBTSxDQUFDZCxNQUFELENBQWI7QUFDSCxpQkFURCxRQVNTbVosSUFBSSxLQUFLLEdBQVQsSUFBZ0JnUCxJQUFJLEtBQUssR0FUbEM7O0FBVUEsa0JBQUVub0IsTUFBRjs7QUFDQSxvQkFBSW9vQixLQUFKLEVBQVc7QUFDUGQsa0JBQUFBLFVBQVUsQ0FBQ2htQixLQUFELEVBQVF0QixNQUFNLEdBQUcsQ0FBakIsQ0FBVjtBQUNIOztBQUNEa29CLGdCQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNILGVBbkJNLE1BbUJBO0FBQ0gsdUJBQU8sR0FBUDtBQUNIO0FBQ0o7QUFDSixXQTVFRCxRQTRFU0EsTUE1RVQsRUFWWSxDQXdGWjs7O0FBRUEsY0FBSTNtQixHQUFHLEdBQUd2QixNQUFWO0FBQ0FnbUIsVUFBQUEsT0FBTyxDQUFDbUIsU0FBUixHQUFvQixDQUFwQjtBQUNBLGNBQUlrQixLQUFLLEdBQUdyQyxPQUFPLENBQUN6akIsSUFBUixDQUFhekIsTUFBTSxDQUFDUyxHQUFHLEVBQUosQ0FBbkIsQ0FBWjtBQUNBLGNBQUksQ0FBQzhtQixLQUFMLEVBQ0ksT0FBTzltQixHQUFHLEdBQUd4QixNQUFOLElBQWdCLENBQUNpbUIsT0FBTyxDQUFDempCLElBQVIsQ0FBYXpCLE1BQU0sQ0FBQ1MsR0FBRCxDQUFuQixDQUF4QjtBQUNJLGNBQUVBLEdBQUY7QUFESjtBQUVKLGNBQUltYixLQUFLLEdBQUc1WixNQUFNLENBQUN1YSxTQUFQLENBQWlCcmQsTUFBakIsRUFBeUJBLE1BQU0sR0FBR3VCLEdBQWxDLENBQVo7QUFDQSxjQUFJbWIsS0FBSyxLQUFLLElBQVYsSUFBa0JBLEtBQUssS0FBSyxHQUFoQyxFQUNJc0ssV0FBVyxHQUFHdEssS0FBZDtBQUNKLGlCQUFPQSxLQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7QUFNQSxpQkFBUzdhLElBQVQsQ0FBYzZhLEtBQWQsRUFBcUI7QUFDakJxSyxVQUFBQSxLQUFLLENBQUNsbEIsSUFBTixDQUFXNmEsS0FBWDtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQSxpQkFBU1osSUFBVCxHQUFnQjtBQUNaLGNBQUksQ0FBQ2lMLEtBQUssQ0FBQ2huQixNQUFYLEVBQW1CO0FBQ2YsZ0JBQUkyYyxLQUFLLEdBQUdiLElBQUksRUFBaEI7QUFDQSxnQkFBSWEsS0FBSyxLQUFLLElBQWQsRUFDSSxPQUFPLElBQVA7QUFDSjdhLFlBQUFBLElBQUksQ0FBQzZhLEtBQUQsQ0FBSjtBQUNIOztBQUNELGlCQUFPcUssS0FBSyxDQUFDLENBQUQsQ0FBWjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7QUFRQSxpQkFBU2hMLElBQVQsQ0FBY3VNLFFBQWQsRUFBd0JuVyxRQUF4QixFQUFrQztBQUM5QixjQUFJb1csTUFBTSxHQUFHek0sSUFBSSxFQUFqQjtBQUFBLGNBQ0kwTSxNQUFNLEdBQUdELE1BQU0sS0FBS0QsUUFEeEI7O0FBRUEsY0FBSUUsTUFBSixFQUFZO0FBQ1IzTSxZQUFBQSxJQUFJO0FBQ0osbUJBQU8sSUFBUDtBQUNIOztBQUNELGNBQUksQ0FBQzFKLFFBQUwsRUFDSSxNQUFNc0ssT0FBTyxDQUFDLFlBQVk4TCxNQUFaLEdBQXFCLE1BQXJCLEdBQThCRCxRQUE5QixHQUF5QyxZQUExQyxDQUFiO0FBQ0osaUJBQU8sS0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O0FBTUEsaUJBQVN0TSxJQUFULENBQWNzQyxZQUFkLEVBQTRCO0FBQ3hCLGNBQUltSyxHQUFHLEdBQUcsSUFBVjs7QUFDQSxjQUFJbkssWUFBWSxLQUFLaGdCLFNBQXJCLEVBQWdDO0FBQzVCLGdCQUFJdW9CLFdBQVcsS0FBS2pLLElBQUksR0FBRyxDQUF2QixLQUE2QmhCLG9CQUFvQixJQUFJK0ssV0FBVyxLQUFLLEdBQXhDLElBQStDRyxnQkFBNUUsQ0FBSixFQUFtRztBQUMvRjJCLGNBQUFBLEdBQUcsR0FBRzdCLFdBQU47QUFDSDtBQUNKLFdBSkQsTUFJTztBQUNIO0FBQ0EsZ0JBQUlDLFdBQVcsR0FBR3ZJLFlBQWxCLEVBQWdDO0FBQzVCeEMsY0FBQUEsSUFBSTtBQUNQOztBQUNELGdCQUFJK0ssV0FBVyxLQUFLdkksWUFBaEIsSUFBZ0MsQ0FBQ3dJLGdCQUFqQyxLQUFzRGxMLG9CQUFvQixJQUFJK0ssV0FBVyxLQUFLLEdBQTlGLENBQUosRUFBd0c7QUFDcEc4QixjQUFBQSxHQUFHLEdBQUc3QixXQUFOO0FBQ0g7QUFDSjs7QUFDRCxpQkFBTzZCLEdBQVA7QUFDSDs7QUFFRCxlQUFPcmxCLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0I7QUFDekJ3SCxVQUFBQSxJQUFJLEVBQUVBLElBRG1CO0FBRXpCQyxVQUFBQSxJQUFJLEVBQUVBLElBRm1CO0FBR3pCamEsVUFBQUEsSUFBSSxFQUFFQSxJQUhtQjtBQUl6QmthLFVBQUFBLElBQUksRUFBRUEsSUFKbUI7QUFLekJDLFVBQUFBLElBQUksRUFBRUE7QUFMbUIsU0FBdEIsRUFNSixNQU5JLEVBTUk7QUFDUC9NLFVBQUFBLEdBQUcsRUFBRSxlQUFXO0FBQUUsbUJBQU8yTixJQUFQO0FBQWM7QUFEekIsU0FOSixDQUFQO0FBU0E7QUFDSDtBQUVBLEtBL1l1QyxFQStZdEMsRUEvWXNDLENBOXpMakI7QUE2c01qQixRQUFHLENBQUMsVUFBU3BkLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUMxQzs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCNFUsSUFBakIsQ0FGMEMsQ0FJMUM7O0FBQ0EsVUFBSW5CLFNBQVMsR0FBR2hULE9BQU8sQ0FBQyxFQUFELENBQXZCOztBQUNBLE9BQUMsQ0FBQ21VLElBQUksQ0FBQ3BQLFNBQUwsR0FBaUJuQixNQUFNLENBQUNpUCxNQUFQLENBQWNHLFNBQVMsQ0FBQ2pPLFNBQXhCLENBQWxCLEVBQXNEK04sV0FBdEQsR0FBb0VxQixJQUFyRSxFQUEyRXBCLFNBQTNFLEdBQXVGLE1BQXZGOztBQUVBLFVBQUluRCxJQUFJLEdBQVE1UCxPQUFPLENBQUMsRUFBRCxDQUF2QjtBQUFBLFVBQ0k0VyxLQUFLLEdBQU81VyxPQUFPLENBQUMsRUFBRCxDQUR2QjtBQUFBLFVBRUlrVSxLQUFLLEdBQU9sVSxPQUFPLENBQUMsRUFBRCxDQUZ2QjtBQUFBLFVBR0k2VyxRQUFRLEdBQUk3VyxPQUFPLENBQUMsRUFBRCxDQUh2QjtBQUFBLFVBSUk4VyxPQUFPLEdBQUs5VyxPQUFPLENBQUMsRUFBRCxDQUp2QjtBQUFBLFVBS0lnWCxPQUFPLEdBQUtoWCxPQUFPLENBQUMsRUFBRCxDQUx2QjtBQUFBLFVBTUlvWCxNQUFNLEdBQU1wWCxPQUFPLENBQUMsRUFBRCxDQU52QjtBQUFBLFVBT0lrWCxNQUFNLEdBQU1sWCxPQUFPLENBQUMsRUFBRCxDQVB2QjtBQUFBLFVBUUlILElBQUksR0FBUUcsT0FBTyxDQUFDLEVBQUQsQ0FSdkI7QUFBQSxVQVNJdVMsT0FBTyxHQUFLdlMsT0FBTyxDQUFDLEVBQUQsQ0FUdkI7QUFBQSxVQVVJNlIsT0FBTyxHQUFLN1IsT0FBTyxDQUFDLEVBQUQsQ0FWdkI7QUFBQSxVQVdJMlcsUUFBUSxHQUFJM1csT0FBTyxDQUFDLEVBQUQsQ0FYdkI7QUFBQSxVQVlJMlAsU0FBUyxHQUFHM1AsT0FBTyxDQUFDLEVBQUQsQ0FadkI7QUFBQSxVQWFJaVgsUUFBUSxHQUFJalgsT0FBTyxDQUFDLEVBQUQsQ0FidkI7QUFlQTs7Ozs7Ozs7OztBQVFBLGVBQVNtVSxJQUFULENBQWMvVSxJQUFkLEVBQW9CdUcsT0FBcEIsRUFBNkI7QUFDekJxTixRQUFBQSxTQUFTLENBQUMxVCxJQUFWLENBQWUsSUFBZixFQUFxQkYsSUFBckIsRUFBMkJ1RyxPQUEzQjtBQUVBOzs7OztBQUlBLGFBQUt3SCxNQUFMLEdBQWMsRUFBZCxDQVB5QixDQU9OOztBQUVuQjs7Ozs7QUFJQSxhQUFLYSxNQUFMLEdBQWNsUCxTQUFkLENBYnlCLENBYUE7O0FBRXpCOzs7OztBQUlBLGFBQUtxZ0IsVUFBTCxHQUFrQnJnQixTQUFsQixDQW5CeUIsQ0FtQkk7O0FBRTdCOzs7OztBQUlBLGFBQUtzVSxRQUFMLEdBQWdCdFUsU0FBaEIsQ0F6QnlCLENBeUJFOztBQUUzQjs7Ozs7QUFJQSxhQUFLbVQsS0FBTCxHQUFhblQsU0FBYixDQS9CeUIsQ0ErQkQ7O0FBRXhCOzs7Ozs7QUFLQSxhQUFLb3FCLFdBQUwsR0FBbUIsSUFBbkI7QUFFQTs7Ozs7O0FBS0EsYUFBS3ZYLFlBQUwsR0FBb0IsSUFBcEI7QUFFQTs7Ozs7O0FBS0EsYUFBS3dYLFlBQUwsR0FBb0IsSUFBcEI7QUFFQTs7Ozs7O0FBS0EsYUFBS0MsS0FBTCxHQUFhLElBQWI7QUFDSDs7QUFFRHhsQixNQUFBQSxNQUFNLENBQUM4VyxnQkFBUCxDQUF3QnZHLElBQUksQ0FBQ3BQLFNBQTdCLEVBQXdDO0FBRXBDOzs7Ozs7QUFNQXNrQixRQUFBQSxVQUFVLEVBQUU7QUFDUjVaLFVBQUFBLEdBQUcsRUFBRSxlQUFXO0FBRVo7QUFDQSxnQkFBSSxLQUFLeVosV0FBVCxFQUNJLE9BQU8sS0FBS0EsV0FBWjtBQUVKLGlCQUFLQSxXQUFMLEdBQW1CLEVBQW5COztBQUNBLGlCQUFLLElBQUkxUCxLQUFLLEdBQUc1VixNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLc0osTUFBakIsQ0FBWixFQUFzQ3hMLENBQUMsR0FBRyxDQUEvQyxFQUFrREEsQ0FBQyxHQUFHNlgsS0FBSyxDQUFDalosTUFBNUQsRUFBb0UsRUFBRW9CLENBQXRFLEVBQXlFO0FBQ3JFLGtCQUFJb08sS0FBSyxHQUFHLEtBQUs1QyxNQUFMLENBQVlxTSxLQUFLLENBQUM3WCxDQUFELENBQWpCLENBQVo7QUFBQSxrQkFDSTJMLEVBQUUsR0FBR3lDLEtBQUssQ0FBQ3pDLEVBRGY7QUFHQTs7QUFDQSxrQkFBSSxLQUFLNGIsV0FBTCxDQUFpQjViLEVBQWpCLENBQUosRUFDSSxNQUFNeEssS0FBSyxDQUFDLGtCQUFrQndLLEVBQWxCLEdBQXVCLE1BQXZCLEdBQWdDLElBQWpDLENBQVg7QUFFSixtQkFBSzRiLFdBQUwsQ0FBaUI1YixFQUFqQixJQUF1QnlDLEtBQXZCO0FBQ0g7O0FBQ0QsbUJBQU8sS0FBS21aLFdBQVo7QUFDSDtBQW5CTyxTQVJ3Qjs7QUE4QnBDOzs7Ozs7QUFNQXpZLFFBQUFBLFdBQVcsRUFBRTtBQUNUaEIsVUFBQUEsR0FBRyxFQUFFLGVBQVc7QUFDWixtQkFBTyxLQUFLa0MsWUFBTCxLQUFzQixLQUFLQSxZQUFMLEdBQW9COVIsSUFBSSxDQUFDdVosT0FBTCxDQUFhLEtBQUtqTSxNQUFsQixDQUExQyxDQUFQO0FBQ0g7QUFIUSxTQXBDdUI7O0FBMENwQzs7Ozs7O0FBTUFtYyxRQUFBQSxXQUFXLEVBQUU7QUFDVDdaLFVBQUFBLEdBQUcsRUFBRSxlQUFXO0FBQ1osbUJBQU8sS0FBSzBaLFlBQUwsS0FBc0IsS0FBS0EsWUFBTCxHQUFvQnRwQixJQUFJLENBQUN1WixPQUFMLENBQWEsS0FBS3BMLE1BQWxCLENBQTFDLENBQVA7QUFDSDtBQUhRLFNBaER1Qjs7QUFzRHBDOzs7Ozs7QUFNQTBILFFBQUFBLElBQUksRUFBRTtBQUNGakcsVUFBQUEsR0FBRyxFQUFFLGVBQVc7QUFDWixtQkFBTyxLQUFLMlosS0FBTCxLQUFlLEtBQUsxVCxJQUFMLEdBQVl2QixJQUFJLENBQUNvVixtQkFBTCxDQUF5QixJQUF6QixHQUEzQixDQUFQO0FBQ0gsV0FIQztBQUlGak8sVUFBQUEsR0FBRyxFQUFFLGFBQVM1RixJQUFULEVBQWU7QUFFaEI7QUFDQSxnQkFBSTNRLFNBQVMsR0FBRzJRLElBQUksQ0FBQzNRLFNBQXJCOztBQUNBLGdCQUFJLEVBQUVBLFNBQVMsWUFBWWlTLE9BQXZCLENBQUosRUFBcUM7QUFDakMsZUFBQ3RCLElBQUksQ0FBQzNRLFNBQUwsR0FBaUIsSUFBSWlTLE9BQUosRUFBbEIsRUFBaUNsRSxXQUFqQyxHQUErQzRDLElBQS9DO0FBQ0E3VixjQUFBQSxJQUFJLENBQUNtakIsS0FBTCxDQUFXdE4sSUFBSSxDQUFDM1EsU0FBaEIsRUFBMkJBLFNBQTNCO0FBQ0gsYUFQZSxDQVNoQjs7O0FBQ0EyUSxZQUFBQSxJQUFJLENBQUNzQyxLQUFMLEdBQWF0QyxJQUFJLENBQUMzUSxTQUFMLENBQWVpVCxLQUFmLEdBQXVCLElBQXBDLENBVmdCLENBWWhCOztBQUNBblksWUFBQUEsSUFBSSxDQUFDbWpCLEtBQUwsQ0FBV3ROLElBQVgsRUFBaUJzQixPQUFqQixFQUEwQixJQUExQjtBQUVBLGlCQUFLb1MsS0FBTCxHQUFhMVQsSUFBYixDQWZnQixDQWlCaEI7O0FBQ0EsZ0JBQUkvVCxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxtQkFBT0EsQ0FBQztBQUFHO0FBQWtCLGlCQUFLOE8sV0FBTCxDQUFpQmxRLE1BQTlDLEVBQXNELEVBQUVvQixDQUF4RDtBQUNJLG1CQUFLZ1EsWUFBTCxDQUFrQmhRLENBQWxCLEVBQXFCZCxPQUFyQjtBQURKLGFBbkJnQixDQW9Cb0I7QUFFcEM7OztBQUNBLGdCQUFJMm9CLGNBQWMsR0FBRyxFQUFyQjs7QUFDQSxpQkFBSzduQixDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDO0FBQUc7QUFBa0IsaUJBQUsybkIsV0FBTCxDQUFpQi9vQixNQUFuRCxFQUEyRCxFQUFFb0IsQ0FBN0Q7QUFDSTZuQixjQUFBQSxjQUFjLENBQUMsS0FBS0wsWUFBTCxDQUFrQnhuQixDQUFsQixFQUFxQmQsT0FBckIsR0FBK0J6QixJQUFoQyxDQUFkLEdBQXNEO0FBQ2xEcVEsZ0JBQUFBLEdBQUcsRUFBRTVQLElBQUksQ0FBQ3diLFdBQUwsQ0FBaUIsS0FBSzhOLFlBQUwsQ0FBa0J4bkIsQ0FBbEIsRUFBcUJ1TSxLQUF0QyxDQUQ2QztBQUVsRG9OLGdCQUFBQSxHQUFHLEVBQUV6YixJQUFJLENBQUMwYixXQUFMLENBQWlCLEtBQUs0TixZQUFMLENBQWtCeG5CLENBQWxCLEVBQXFCdU0sS0FBdEM7QUFGNkMsZUFBdEQ7QUFESjs7QUFLQSxnQkFBSXZNLENBQUosRUFDSWlDLE1BQU0sQ0FBQzhXLGdCQUFQLENBQXdCaEYsSUFBSSxDQUFDM1EsU0FBN0IsRUFBd0N5a0IsY0FBeEM7QUFDUDtBQW5DQztBQTVEOEIsT0FBeEM7QUFtR0E7Ozs7OztBQUtBclYsTUFBQUEsSUFBSSxDQUFDb1YsbUJBQUwsR0FBMkIsU0FBU0EsbUJBQVQsQ0FBNkIvWSxLQUE3QixFQUFvQztBQUMzRDtBQUNBLFlBQUlWLEdBQUcsR0FBR2pRLElBQUksQ0FBQ21ELE9BQUwsQ0FBYSxDQUFDLEdBQUQsQ0FBYixFQUFvQndOLEtBQUssQ0FBQ3BSLElBQTFCLENBQVYsQ0FGMkQsQ0FHM0Q7O0FBQ0EsYUFBSyxJQUFJdUMsQ0FBQyxHQUFHLENBQVIsRUFBV29PLEtBQWhCLEVBQXVCcE8sQ0FBQyxHQUFHNk8sS0FBSyxDQUFDQyxXQUFOLENBQWtCbFEsTUFBN0MsRUFBcUQsRUFBRW9CLENBQXZEO0FBQ0ksY0FBSSxDQUFDb08sS0FBSyxHQUFHUyxLQUFLLENBQUNtQixZQUFOLENBQW1CaFEsQ0FBbkIsQ0FBVCxFQUFnQ2dQLEdBQXBDLEVBQXlDYixHQUFHLENBQ3ZDLFdBRHVDLEVBQzFCalEsSUFBSSxDQUFDNlEsUUFBTCxDQUFjWCxLQUFLLENBQUMzUSxJQUFwQixDQUQwQixDQUFILENBQXpDLEtBRUssSUFBSTJRLEtBQUssQ0FBQ0ksUUFBVixFQUFvQkwsR0FBRyxDQUN2QixXQUR1QixFQUNWalEsSUFBSSxDQUFDNlEsUUFBTCxDQUFjWCxLQUFLLENBQUMzUSxJQUFwQixDQURVLENBQUg7QUFIN0I7O0FBS0EsZUFBTzBRLEdBQUcsQ0FDVCx1RUFEUyxDQUFILENBQ21FO0FBRG5FLFNBRUYsc0JBRkUsQ0FBUDtBQUdBO0FBQ0gsT0FiRDs7QUFlQSxlQUFTb0osVUFBVCxDQUFvQjdMLElBQXBCLEVBQTBCO0FBQ3RCQSxRQUFBQSxJQUFJLENBQUM2YixXQUFMLEdBQW1CN2IsSUFBSSxDQUFDc0UsWUFBTCxHQUFvQnRFLElBQUksQ0FBQzhiLFlBQUwsR0FBb0IsSUFBM0Q7QUFDQSxlQUFPOWIsSUFBSSxDQUFDekwsTUFBWjtBQUNBLGVBQU95TCxJQUFJLENBQUMxSyxNQUFaO0FBQ0EsZUFBTzBLLElBQUksQ0FBQ2dMLE1BQVo7QUFDQSxlQUFPaEwsSUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0FBTUE4RyxNQUFBQSxJQUFJLENBQUNkLFFBQUwsR0FBZ0IsU0FBU0EsUUFBVCxDQUFrQmpVLElBQWxCLEVBQXdCMk4sSUFBeEIsRUFBOEI7QUFDMUMsWUFBSU0sSUFBSSxHQUFHLElBQUk4RyxJQUFKLENBQVMvVSxJQUFULEVBQWUyTixJQUFJLENBQUNwSCxPQUFwQixDQUFYO0FBQ0EwSCxRQUFBQSxJQUFJLENBQUM4UixVQUFMLEdBQWtCcFMsSUFBSSxDQUFDb1MsVUFBdkI7QUFDQTlSLFFBQUFBLElBQUksQ0FBQytGLFFBQUwsR0FBZ0JyRyxJQUFJLENBQUNxRyxRQUFyQjtBQUNBLFlBQUlvRyxLQUFLLEdBQUc1VixNQUFNLENBQUNDLElBQVAsQ0FBWWtKLElBQUksQ0FBQ0ksTUFBakIsQ0FBWjtBQUFBLFlBQ0l4TCxDQUFDLEdBQUcsQ0FEUjs7QUFFQSxlQUFPQSxDQUFDLEdBQUc2WCxLQUFLLENBQUNqWixNQUFqQixFQUF5QixFQUFFb0IsQ0FBM0I7QUFDSTBMLFVBQUFBLElBQUksQ0FBQ3NHLEdBQUwsQ0FDSSxDQUFFLE9BQU81RyxJQUFJLENBQUNJLE1BQUwsQ0FBWXFNLEtBQUssQ0FBQzdYLENBQUQsQ0FBakIsRUFBc0JtTSxPQUE3QixLQUF5QyxXQUF6QyxHQUNBK0ksUUFBUSxDQUFDeEQsUUFEVCxHQUVBYSxLQUFLLENBQUNiLFFBRlIsRUFFbUJtRyxLQUFLLENBQUM3WCxDQUFELENBRnhCLEVBRTZCb0wsSUFBSSxDQUFDSSxNQUFMLENBQVlxTSxLQUFLLENBQUM3WCxDQUFELENBQWpCLENBRjdCLENBREo7QUFESjs7QUFNQSxZQUFJb0wsSUFBSSxDQUFDaUIsTUFBVCxFQUNJLEtBQUt3TCxLQUFLLEdBQUc1VixNQUFNLENBQUNDLElBQVAsQ0FBWWtKLElBQUksQ0FBQ2lCLE1BQWpCLENBQVIsRUFBa0NyTSxDQUFDLEdBQUcsQ0FBM0MsRUFBOENBLENBQUMsR0FBRzZYLEtBQUssQ0FBQ2paLE1BQXhELEVBQWdFLEVBQUVvQixDQUFsRTtBQUNJMEwsVUFBQUEsSUFBSSxDQUFDc0csR0FBTCxDQUFTaUQsS0FBSyxDQUFDdkQsUUFBTixDQUFlbUcsS0FBSyxDQUFDN1gsQ0FBRCxDQUFwQixFQUF5Qm9MLElBQUksQ0FBQ2lCLE1BQUwsQ0FBWXdMLEtBQUssQ0FBQzdYLENBQUQsQ0FBakIsQ0FBekIsQ0FBVDtBQURKO0FBRUosWUFBSW9MLElBQUksQ0FBQ0MsTUFBVCxFQUNJLEtBQUt3TSxLQUFLLEdBQUc1VixNQUFNLENBQUNDLElBQVAsQ0FBWWtKLElBQUksQ0FBQ0MsTUFBakIsQ0FBUixFQUFrQ3JMLENBQUMsR0FBRyxDQUEzQyxFQUE4Q0EsQ0FBQyxHQUFHNlgsS0FBSyxDQUFDalosTUFBeEQsRUFBZ0UsRUFBRW9CLENBQWxFLEVBQXFFO0FBQ2pFLGNBQUlxTCxNQUFNLEdBQUdELElBQUksQ0FBQ0MsTUFBTCxDQUFZd00sS0FBSyxDQUFDN1gsQ0FBRCxDQUFqQixDQUFiO0FBQ0EwTCxVQUFBQSxJQUFJLENBQUNzRyxHQUFMLEVBQVU7QUFDTixXQUFFM0csTUFBTSxDQUFDTSxFQUFQLEtBQWN4TyxTQUFkLEdBQ0FvVixLQUFLLENBQUNiLFFBRE4sR0FFQXJHLE1BQU0sQ0FBQ0csTUFBUCxLQUFrQnJPLFNBQWxCLEdBQ0FxVixJQUFJLENBQUNkLFFBREwsR0FFQXJHLE1BQU0sQ0FBQzBCLE1BQVAsS0FBa0I1UCxTQUFsQixHQUNBOFEsSUFBSSxDQUFDeUQsUUFETCxHQUVBckcsTUFBTSxDQUFDeU0sT0FBUCxLQUFtQjNhLFNBQW5CLEdBQ0FnWSxPQUFPLENBQUN6RCxRQURSLEdBRUFMLFNBQVMsQ0FBQ0ssUUFSWixFQVF1Qm1HLEtBQUssQ0FBQzdYLENBQUQsQ0FSNUIsRUFRaUNxTCxNQVJqQyxDQURKO0FBV0g7QUFDTCxZQUFJRCxJQUFJLENBQUNvUyxVQUFMLElBQW1CcFMsSUFBSSxDQUFDb1MsVUFBTCxDQUFnQjVlLE1BQXZDLEVBQ0k4TSxJQUFJLENBQUM4UixVQUFMLEdBQWtCcFMsSUFBSSxDQUFDb1MsVUFBdkI7QUFDSixZQUFJcFMsSUFBSSxDQUFDcUcsUUFBTCxJQUFpQnJHLElBQUksQ0FBQ3FHLFFBQUwsQ0FBYzdTLE1BQW5DLEVBQ0k4TSxJQUFJLENBQUMrRixRQUFMLEdBQWdCckcsSUFBSSxDQUFDcUcsUUFBckI7QUFDSixZQUFJckcsSUFBSSxDQUFDa0YsS0FBVCxFQUNJNUUsSUFBSSxDQUFDNEUsS0FBTCxHQUFhLElBQWI7QUFDSixZQUFJbEYsSUFBSSxDQUFDa0csT0FBVCxFQUNJNUYsSUFBSSxDQUFDNEYsT0FBTCxHQUFlbEcsSUFBSSxDQUFDa0csT0FBcEI7QUFDSixlQUFPNUYsSUFBUDtBQUNILE9BdkNEO0FBeUNBOzs7Ozs7O0FBS0E4RyxNQUFBQSxJQUFJLENBQUNwUCxTQUFMLENBQWV3TyxNQUFmLEdBQXdCLFNBQVNBLE1BQVQsQ0FBZ0JDLGFBQWhCLEVBQStCO0FBQ25ELFlBQUl3UyxTQUFTLEdBQUdoVCxTQUFTLENBQUNqTyxTQUFWLENBQW9Cd08sTUFBcEIsQ0FBMkJqVSxJQUEzQixDQUFnQyxJQUFoQyxFQUFzQ2tVLGFBQXRDLENBQWhCO0FBQ0EsWUFBSUMsWUFBWSxHQUFHRCxhQUFhLEdBQUdFLE9BQU8sQ0FBQ0YsYUFBYSxDQUFDQyxZQUFmLENBQVYsR0FBeUMsS0FBekU7QUFDQSxlQUFPNVQsSUFBSSxDQUFDZ1IsUUFBTCxDQUFjLENBQ2pCLFNBRGlCLEVBQ0ZtVixTQUFTLElBQUlBLFNBQVMsQ0FBQ3JnQixPQUF2QixJQUFrQzdHLFNBRGhDLEVBRWpCLFFBRmlCLEVBRUZrVSxTQUFTLENBQUM4RixXQUFWLENBQXNCLEtBQUt3USxXQUEzQixFQUF3QzlWLGFBQXhDLENBRkUsRUFHakIsUUFIaUIsRUFHRlIsU0FBUyxDQUFDOEYsV0FBVixDQUFzQixLQUFLckksV0FBTCxDQUFpQnVCLE1BQWpCLENBQXdCLFVBQVNnSCxHQUFULEVBQWM7QUFBRSxpQkFBTyxDQUFDQSxHQUFHLENBQUNyRSxjQUFaO0FBQTZCLFNBQXJFLENBQXRCLEVBQThGbkIsYUFBOUYsS0FBZ0gsRUFIOUcsRUFJakIsWUFKaUIsRUFJRixLQUFLMkwsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCNWUsTUFBbkMsR0FBNEMsS0FBSzRlLFVBQWpELEdBQThEcmdCLFNBSjVELEVBS2pCLFVBTGlCLEVBS0YsS0FBS3NVLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjN1MsTUFBL0IsR0FBd0MsS0FBSzZTLFFBQTdDLEdBQXdEdFUsU0FMdEQsRUFNakIsT0FOaUIsRUFNRixLQUFLbVQsS0FBTCxJQUFjblQsU0FOWixFQU9qQixRQVBpQixFQU9Ga25CLFNBQVMsSUFBSUEsU0FBUyxDQUFDaFosTUFBdkIsSUFBaUNsTyxTQVAvQixFQVFqQixTQVJpQixFQVFGMlUsWUFBWSxHQUFHLEtBQUtSLE9BQVIsR0FBa0JuVSxTQVI1QixDQUFkLENBQVA7QUFVSCxPQWJEO0FBZUE7Ozs7O0FBR0FxVixNQUFBQSxJQUFJLENBQUNwUCxTQUFMLENBQWVtVixVQUFmLEdBQTRCLFNBQVNBLFVBQVQsR0FBc0I7QUFDOUMsWUFBSS9NLE1BQU0sR0FBRyxLQUFLc0QsV0FBbEI7QUFBQSxZQUErQjlPLENBQUMsR0FBRyxDQUFuQzs7QUFDQSxlQUFPQSxDQUFDLEdBQUd3TCxNQUFNLENBQUM1TSxNQUFsQjtBQUNJNE0sVUFBQUEsTUFBTSxDQUFDeEwsQ0FBQyxFQUFGLENBQU4sQ0FBWWQsT0FBWjtBQURKOztBQUVBLFlBQUltTixNQUFNLEdBQUcsS0FBS3NiLFdBQWxCO0FBQStCM25CLFFBQUFBLENBQUMsR0FBRyxDQUFKOztBQUMvQixlQUFPQSxDQUFDLEdBQUdxTSxNQUFNLENBQUN6TixNQUFsQjtBQUNJeU4sVUFBQUEsTUFBTSxDQUFDck0sQ0FBQyxFQUFGLENBQU4sQ0FBWWQsT0FBWjtBQURKOztBQUVBLGVBQU9tUyxTQUFTLENBQUNqTyxTQUFWLENBQW9CbVYsVUFBcEIsQ0FBK0I1YSxJQUEvQixDQUFvQyxJQUFwQyxDQUFQO0FBQ0gsT0FSRDtBQVVBOzs7OztBQUdBNlUsTUFBQUEsSUFBSSxDQUFDcFAsU0FBTCxDQUFlMEssR0FBZixHQUFxQixTQUFTQSxHQUFULENBQWFyUSxJQUFiLEVBQW1CO0FBQ3BDLGVBQU8sS0FBSytOLE1BQUwsQ0FBWS9OLElBQVosS0FDQSxLQUFLNE8sTUFBTCxJQUFlLEtBQUtBLE1BQUwsQ0FBWTVPLElBQVosQ0FEZixJQUVBLEtBQUs0TixNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZNU4sSUFBWixDQUZmLElBR0EsSUFIUDtBQUlILE9BTEQ7QUFPQTs7Ozs7Ozs7O0FBT0ErVSxNQUFBQSxJQUFJLENBQUNwUCxTQUFMLENBQWU0TyxHQUFmLEdBQXFCLFNBQVNBLEdBQVQsQ0FBYTJFLE1BQWIsRUFBcUI7QUFFdEMsWUFBSSxLQUFLN0ksR0FBTCxDQUFTNkksTUFBTSxDQUFDbFosSUFBaEIsQ0FBSixFQUNJLE1BQU0wRCxLQUFLLENBQUMscUJBQXFCd1YsTUFBTSxDQUFDbFosSUFBNUIsR0FBbUMsT0FBbkMsR0FBNkMsSUFBOUMsQ0FBWDs7QUFFSixZQUFJa1osTUFBTSxZQUFZcEUsS0FBbEIsSUFBMkJvRSxNQUFNLENBQUNqRSxNQUFQLEtBQWtCdlYsU0FBakQsRUFBNEQ7QUFDeEQ7QUFDQTtBQUNBO0FBRUE7QUFDQSxjQUFJLEtBQUtvcUIsV0FBTDtBQUFtQjtBQUEyQixlQUFLQSxXQUFMLENBQWlCNVEsTUFBTSxDQUFDaEwsRUFBeEIsQ0FBOUMsR0FBNEUsS0FBSytiLFVBQUwsQ0FBZ0IvUSxNQUFNLENBQUNoTCxFQUF2QixDQUFoRixFQUNJLE1BQU14SyxLQUFLLENBQUMsa0JBQWtCd1YsTUFBTSxDQUFDaEwsRUFBekIsR0FBOEIsTUFBOUIsR0FBdUMsSUFBeEMsQ0FBWDtBQUNKLGNBQUksS0FBS3dHLFlBQUwsQ0FBa0J3RSxNQUFNLENBQUNoTCxFQUF6QixDQUFKLEVBQ0ksTUFBTXhLLEtBQUssQ0FBQyxRQUFRd1YsTUFBTSxDQUFDaEwsRUFBZixHQUFvQixrQkFBcEIsR0FBeUMsSUFBMUMsQ0FBWDtBQUNKLGNBQUksS0FBS3lHLGNBQUwsQ0FBb0J1RSxNQUFNLENBQUNsWixJQUEzQixDQUFKLEVBQ0ksTUFBTTBELEtBQUssQ0FBQyxXQUFXd1YsTUFBTSxDQUFDbFosSUFBbEIsR0FBeUIsbUJBQXpCLEdBQStDLElBQWhELENBQVg7QUFFSixjQUFJa1osTUFBTSxDQUFDbkQsTUFBWCxFQUNJbUQsTUFBTSxDQUFDbkQsTUFBUCxDQUFjbEIsTUFBZCxDQUFxQnFFLE1BQXJCO0FBQ0osZUFBS25MLE1BQUwsQ0FBWW1MLE1BQU0sQ0FBQ2xaLElBQW5CLElBQTJCa1osTUFBM0I7QUFDQUEsVUFBQUEsTUFBTSxDQUFDOUQsT0FBUCxHQUFpQixJQUFqQjtBQUNBOEQsVUFBQUEsTUFBTSxDQUFDdUIsS0FBUCxDQUFhLElBQWI7QUFDQSxpQkFBT1gsVUFBVSxDQUFDLElBQUQsQ0FBakI7QUFDSDs7QUFDRCxZQUFJWixNQUFNLFlBQVkxQixLQUF0QixFQUE2QjtBQUN6QixjQUFJLENBQUMsS0FBSzVJLE1BQVYsRUFDSSxLQUFLQSxNQUFMLEdBQWMsRUFBZDtBQUNKLGVBQUtBLE1BQUwsQ0FBWXNLLE1BQU0sQ0FBQ2xaLElBQW5CLElBQTJCa1osTUFBM0I7QUFDQUEsVUFBQUEsTUFBTSxDQUFDdUIsS0FBUCxDQUFhLElBQWI7QUFDQSxpQkFBT1gsVUFBVSxDQUFDLElBQUQsQ0FBakI7QUFDSDs7QUFDRCxlQUFPbEcsU0FBUyxDQUFDak8sU0FBVixDQUFvQjRPLEdBQXBCLENBQXdCclUsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNnWixNQUFuQyxDQUFQO0FBQ0gsT0FqQ0Q7QUFtQ0E7Ozs7Ozs7OztBQU9BbkUsTUFBQUEsSUFBSSxDQUFDcFAsU0FBTCxDQUFla1AsTUFBZixHQUF3QixTQUFTQSxNQUFULENBQWdCcUUsTUFBaEIsRUFBd0I7QUFDNUMsWUFBSUEsTUFBTSxZQUFZcEUsS0FBbEIsSUFBMkJvRSxNQUFNLENBQUNqRSxNQUFQLEtBQWtCdlYsU0FBakQsRUFBNEQ7QUFDeEQ7O0FBRUE7QUFDQSxjQUFJLENBQUMsS0FBS3FPLE1BQU4sSUFBZ0IsS0FBS0EsTUFBTCxDQUFZbUwsTUFBTSxDQUFDbFosSUFBbkIsTUFBNkJrWixNQUFqRCxFQUNJLE1BQU14VixLQUFLLENBQUN3VixNQUFNLEdBQUcsc0JBQVQsR0FBa0MsSUFBbkMsQ0FBWDtBQUVKLGlCQUFPLEtBQUtuTCxNQUFMLENBQVltTCxNQUFNLENBQUNsWixJQUFuQixDQUFQO0FBQ0FrWixVQUFBQSxNQUFNLENBQUNuRCxNQUFQLEdBQWdCLElBQWhCO0FBQ0FtRCxVQUFBQSxNQUFNLENBQUN3QixRQUFQLENBQWdCLElBQWhCO0FBQ0EsaUJBQU9aLFVBQVUsQ0FBQyxJQUFELENBQWpCO0FBQ0g7O0FBQ0QsWUFBSVosTUFBTSxZQUFZMUIsS0FBdEIsRUFBNkI7QUFFekI7QUFDQSxjQUFJLENBQUMsS0FBSzVJLE1BQU4sSUFBZ0IsS0FBS0EsTUFBTCxDQUFZc0ssTUFBTSxDQUFDbFosSUFBbkIsTUFBNkJrWixNQUFqRCxFQUNJLE1BQU14VixLQUFLLENBQUN3VixNQUFNLEdBQUcsc0JBQVQsR0FBa0MsSUFBbkMsQ0FBWDtBQUVKLGlCQUFPLEtBQUt0SyxNQUFMLENBQVlzSyxNQUFNLENBQUNsWixJQUFuQixDQUFQO0FBQ0FrWixVQUFBQSxNQUFNLENBQUNuRCxNQUFQLEdBQWdCLElBQWhCO0FBQ0FtRCxVQUFBQSxNQUFNLENBQUN3QixRQUFQLENBQWdCLElBQWhCO0FBQ0EsaUJBQU9aLFVBQVUsQ0FBQyxJQUFELENBQWpCO0FBQ0g7O0FBQ0QsZUFBT2xHLFNBQVMsQ0FBQ2pPLFNBQVYsQ0FBb0JrUCxNQUFwQixDQUEyQjNVLElBQTNCLENBQWdDLElBQWhDLEVBQXNDZ1osTUFBdEMsQ0FBUDtBQUNILE9BekJEO0FBMkJBOzs7Ozs7O0FBS0FuRSxNQUFBQSxJQUFJLENBQUNwUCxTQUFMLENBQWUrTyxZQUFmLEdBQThCLFNBQVNBLFlBQVQsQ0FBc0J4RyxFQUF0QixFQUEwQjtBQUNwRCxlQUFPMEYsU0FBUyxDQUFDYyxZQUFWLENBQXVCLEtBQUtWLFFBQTVCLEVBQXNDOUYsRUFBdEMsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7OztBQUtBNkcsTUFBQUEsSUFBSSxDQUFDcFAsU0FBTCxDQUFlZ1AsY0FBZixHQUFnQyxTQUFTQSxjQUFULENBQXdCM1UsSUFBeEIsRUFBOEI7QUFDMUQsZUFBTzRULFNBQVMsQ0FBQ2UsY0FBVixDQUF5QixLQUFLWCxRQUE5QixFQUF3Q2hVLElBQXhDLENBQVA7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7QUFLQStVLE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZThOLE1BQWYsR0FBd0IsU0FBU0EsTUFBVCxDQUFnQmtGLFVBQWhCLEVBQTRCO0FBQ2hELGVBQU8sSUFBSSxLQUFLckMsSUFBVCxDQUFjcUMsVUFBZCxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7QUFJQTVELE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZTBrQixLQUFmLEdBQXVCLFNBQVNBLEtBQVQsR0FBaUI7QUFDcEM7QUFDQTtBQUVBLFlBQUlwWixRQUFRLEdBQUcsS0FBS0EsUUFBcEI7QUFBQSxZQUNJeUIsS0FBSyxHQUFNLEVBRGY7O0FBRUEsYUFBSyxJQUFJblEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUM7QUFBRztBQUFrQixhQUFLOE8sV0FBTCxDQUFpQmxRLE1BQXZELEVBQStELEVBQUVvQixDQUFqRTtBQUNJbVEsVUFBQUEsS0FBSyxDQUFDelAsSUFBTixDQUFXLEtBQUtzUCxZQUFMLENBQWtCaFEsQ0FBbEIsRUFBcUJkLE9BQXJCLEdBQStCcVAsWUFBMUM7QUFESixTQU5vQyxDQVNwQzs7O0FBQ0EsYUFBS3RPLE1BQUwsR0FBYzJRLE9BQU8sQ0FBQyxJQUFELENBQVAsQ0FBYztBQUN4QjJFLFVBQUFBLE1BQU0sRUFBR0EsTUFEZTtBQUV4QnBGLFVBQUFBLEtBQUssRUFBSUEsS0FGZTtBQUd4QmpTLFVBQUFBLElBQUksRUFBS0E7QUFIZSxTQUFkLENBQWQ7QUFLQSxhQUFLOEMsTUFBTCxHQUFja1AsT0FBTyxDQUFDLElBQUQsQ0FBUCxDQUFjO0FBQ3hCdUYsVUFBQUEsTUFBTSxFQUFHQSxNQURlO0FBRXhCdEYsVUFBQUEsS0FBSyxFQUFJQSxLQUZlO0FBR3hCalMsVUFBQUEsSUFBSSxFQUFLQTtBQUhlLFNBQWQsQ0FBZDtBQUtBLGFBQUt3WSxNQUFMLEdBQWMxQixRQUFRLENBQUMsSUFBRCxDQUFSLENBQWU7QUFDekI3RSxVQUFBQSxLQUFLLEVBQUdBLEtBRGlCO0FBRXpCalMsVUFBQUEsSUFBSSxFQUFJQTtBQUZpQixTQUFmLENBQWQ7QUFJQSxhQUFLMFEsVUFBTCxHQUFrQlosU0FBUyxDQUFDWSxVQUFWLENBQXFCLElBQXJCLEVBQTJCO0FBQ3pDdUIsVUFBQUEsS0FBSyxFQUFHQSxLQURpQztBQUV6Q2pTLFVBQUFBLElBQUksRUFBSUE7QUFGaUMsU0FBM0IsQ0FBbEI7QUFJQSxhQUFLZ1IsUUFBTCxHQUFnQmxCLFNBQVMsQ0FBQ2tCLFFBQVYsQ0FBbUIsSUFBbkIsRUFBeUI7QUFDckNpQixVQUFBQSxLQUFLLEVBQUdBLEtBRDZCO0FBRXJDalMsVUFBQUEsSUFBSSxFQUFJQTtBQUY2QixTQUF6QixDQUFoQixDQTVCb0MsQ0FpQ3BDOztBQUNBLFlBQUk2cEIsT0FBTyxHQUFHelMsUUFBUSxDQUFDNUcsUUFBRCxDQUF0Qjs7QUFDQSxZQUFJcVosT0FBSixFQUFhO0FBQ1QsY0FBSUMsWUFBWSxHQUFHL2xCLE1BQU0sQ0FBQ2lQLE1BQVAsQ0FBYyxJQUFkLENBQW5CLENBRFMsQ0FFVDs7QUFDSThXLFVBQUFBLFlBQVksQ0FBQ3BaLFVBQWIsR0FBMEIsS0FBS0EsVUFBL0I7QUFDQSxlQUFLQSxVQUFMLEdBQWtCbVosT0FBTyxDQUFDblosVUFBUixDQUFtQmxILElBQW5CLENBQXdCc2dCLFlBQXhCLENBQWxCLENBSkssQ0FLVDtBQUNBOztBQUNJQSxVQUFBQSxZQUFZLENBQUM5WSxRQUFiLEdBQXdCLEtBQUtBLFFBQTdCO0FBQ0EsZUFBS0EsUUFBTCxHQUFnQjZZLE9BQU8sQ0FBQzdZLFFBQVIsQ0FBaUJ4SCxJQUFqQixDQUFzQnNnQixZQUF0QixDQUFoQixDQVJLLENBU1Q7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxPQWhERDtBQWtEQTs7Ozs7Ozs7QUFNQXhWLE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZW5ELE1BQWYsR0FBd0IsU0FBU2dvQixZQUFULENBQXNCcFYsT0FBdEIsRUFBK0J5RCxNQUEvQixFQUF1QztBQUMzRCxlQUFPLEtBQUt3UixLQUFMLEdBQWE3bkIsTUFBYixDQUFvQjRTLE9BQXBCLEVBQTZCeUQsTUFBN0IsQ0FBUCxDQUQyRCxDQUNkO0FBQ2hELE9BRkQ7QUFJQTs7Ozs7Ozs7QUFNQTlELE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZW1ULGVBQWYsR0FBaUMsU0FBU0EsZUFBVCxDQUF5QjFELE9BQXpCLEVBQWtDeUQsTUFBbEMsRUFBMEM7QUFDdkUsZUFBTyxLQUFLclcsTUFBTCxDQUFZNFMsT0FBWixFQUFxQnlELE1BQU0sSUFBSUEsTUFBTSxDQUFDM0wsR0FBakIsR0FBdUIyTCxNQUFNLENBQUM0UixJQUFQLEVBQXZCLEdBQXVDNVIsTUFBNUQsRUFBb0U2UixNQUFwRSxFQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7Ozs7O0FBUUEzVixNQUFBQSxJQUFJLENBQUNwUCxTQUFMLENBQWVwQyxNQUFmLEdBQXdCLFNBQVNvbkIsWUFBVCxDQUFzQjVSLE1BQXRCLEVBQThCNVgsTUFBOUIsRUFBc0M7QUFDMUQsZUFBTyxLQUFLa3BCLEtBQUwsR0FBYTltQixNQUFiLENBQW9Cd1YsTUFBcEIsRUFBNEI1WCxNQUE1QixDQUFQLENBRDBELENBQ2Q7QUFDL0MsT0FGRDtBQUlBOzs7Ozs7Ozs7QUFPQTRULE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZXFULGVBQWYsR0FBaUMsU0FBU0EsZUFBVCxDQUF5QkQsTUFBekIsRUFBaUM7QUFDOUQsWUFBSSxFQUFFQSxNQUFNLFlBQVlmLE1BQXBCLENBQUosRUFDSWUsTUFBTSxHQUFHZixNQUFNLENBQUN2RSxNQUFQLENBQWNzRixNQUFkLENBQVQ7QUFDSixlQUFPLEtBQUt4VixNQUFMLENBQVl3VixNQUFaLEVBQW9CQSxNQUFNLENBQUNzSixNQUFQLEVBQXBCLENBQVA7QUFDSCxPQUpEO0FBTUE7Ozs7Ozs7QUFLQXROLE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZXNULE1BQWYsR0FBd0IsU0FBUzJSLFlBQVQsQ0FBc0J4VixPQUF0QixFQUErQjtBQUNuRCxlQUFPLEtBQUtpVixLQUFMLEdBQWFwUixNQUFiLENBQW9CN0QsT0FBcEIsQ0FBUCxDQURtRCxDQUNkO0FBQ3hDLE9BRkQ7QUFJQTs7Ozs7OztBQUtBTCxNQUFBQSxJQUFJLENBQUNwUCxTQUFMLENBQWV3TCxVQUFmLEdBQTRCLFNBQVNBLFVBQVQsQ0FBb0IrSCxNQUFwQixFQUE0QjtBQUNwRCxlQUFPLEtBQUttUixLQUFMLEdBQWFsWixVQUFiLENBQXdCK0gsTUFBeEIsQ0FBUDtBQUNILE9BRkQ7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7Ozs7QUFNQW5FLE1BQUFBLElBQUksQ0FBQ3BQLFNBQUwsQ0FBZThMLFFBQWYsR0FBMEIsU0FBU0EsUUFBVCxDQUFrQjJELE9BQWxCLEVBQTJCN08sT0FBM0IsRUFBb0M7QUFDMUQsZUFBTyxLQUFLOGpCLEtBQUwsR0FBYTVZLFFBQWIsQ0FBc0IyRCxPQUF0QixFQUErQjdPLE9BQS9CLENBQVA7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7OztBQVNBOzs7Ozs7OztBQU1Bd08sTUFBQUEsSUFBSSxDQUFDd0IsQ0FBTCxHQUFTLFNBQVNLLFlBQVQsQ0FBc0JpVSxRQUF0QixFQUFnQztBQUNyQyxlQUFPLFNBQVNDLGFBQVQsQ0FBdUJ4TSxNQUF2QixFQUErQjtBQUNsQzdkLFVBQUFBLElBQUksQ0FBQ21XLFlBQUwsQ0FBa0IwSCxNQUFsQixFQUEwQnVNLFFBQTFCO0FBQ0gsU0FGRDtBQUdILE9BSkQ7QUFNQyxLQS9rQlEsRUEra0JQO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSyxFQUFkO0FBQWlCLFlBQUssRUFBdEI7QUFBeUIsWUFBSyxFQUE5QjtBQUFpQyxZQUFLLEVBQXRDO0FBQXlDLFlBQUssRUFBOUM7QUFBaUQsWUFBSyxFQUF0RDtBQUF5RCxZQUFLLEVBQTlEO0FBQWlFLFlBQUssRUFBdEU7QUFBeUUsWUFBSyxFQUE5RTtBQUFpRixZQUFLLEVBQXRGO0FBQXlGLFlBQUssRUFBOUY7QUFBaUcsWUFBSyxFQUF0RztBQUF5RyxZQUFLLEVBQTlHO0FBQWlILFlBQUs7QUFBdEgsS0Eva0JPLENBN3NNYztBQTR4TnNHLFFBQUcsQ0FBQyxVQUFTanFCLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUNqSztBQUVBOzs7OztBQUlBLFVBQUl1UyxLQUFLLEdBQUd2UyxPQUFaOztBQUVBLFVBQUlNLElBQUksR0FBR0csT0FBTyxDQUFDLEVBQUQsQ0FBbEI7O0FBRUEsVUFBSXVtQixDQUFDLEdBQUcsQ0FDSixRQURJLEVBQ1E7QUFDWixhQUZJLEVBRVE7QUFDWixhQUhJLEVBR1E7QUFDWixjQUpJLEVBSVE7QUFDWixjQUxJLEVBS1E7QUFDWixlQU5JLEVBTVE7QUFDWixnQkFQSSxFQU9RO0FBQ1osYUFSSSxFQVFRO0FBQ1osY0FUSSxFQVNRO0FBQ1osY0FWSSxFQVVRO0FBQ1osZUFYSSxFQVdRO0FBQ1osZ0JBWkksRUFZUTtBQUNaLFlBYkksRUFhUTtBQUNaLGNBZEksRUFjUTtBQUNaLGFBZkksQ0FlUTtBQWZSLE9BQVI7O0FBa0JBLGVBQVM0RCxJQUFULENBQWN6YixNQUFkLEVBQXNCbE8sTUFBdEIsRUFBOEI7QUFDMUIsWUFBSW1CLENBQUMsR0FBRyxDQUFSO0FBQUEsWUFBV3lvQixDQUFDLEdBQUcsRUFBZjtBQUNBNXBCLFFBQUFBLE1BQU0sSUFBSSxDQUFWOztBQUNBLGVBQU9tQixDQUFDLEdBQUcrTSxNQUFNLENBQUNuTyxNQUFsQjtBQUEwQjZwQixVQUFBQSxDQUFDLENBQUM3RCxDQUFDLENBQUM1a0IsQ0FBQyxHQUFHbkIsTUFBTCxDQUFGLENBQUQsR0FBbUJrTyxNQUFNLENBQUMvTSxDQUFDLEVBQUYsQ0FBekI7QUFBMUI7O0FBQ0EsZUFBT3lvQixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQXRZLE1BQUFBLEtBQUssQ0FBQ0ssS0FBTixHQUFjZ1ksSUFBSSxDQUFDO0FBQ2Y7QUFBZSxPQURBO0FBRWY7QUFBZSxPQUZBO0FBR2Y7QUFBZSxPQUhBO0FBSWY7QUFBZSxPQUpBO0FBS2Y7QUFBZSxPQUxBO0FBTWY7QUFBZSxPQU5BO0FBT2Y7QUFBZSxPQVBBO0FBUWY7QUFBZSxPQVJBO0FBU2Y7QUFBZSxPQVRBO0FBVWY7QUFBZSxPQVZBO0FBV2Y7QUFBZSxPQVhBO0FBWWY7QUFBZSxPQVpBO0FBYWY7QUFBZSxPQWJBO0FBY2Y7QUFBZSxPQWRBO0FBZWY7QUFBZSxPQWZBLENBQUQsQ0FBbEI7QUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkFyWSxNQUFBQSxLQUFLLENBQUNvRCxRQUFOLEdBQWlCaVYsSUFBSSxDQUFDO0FBQ2xCO0FBQWUsT0FERztBQUVsQjtBQUFlLE9BRkc7QUFHbEI7QUFBZSxPQUhHO0FBSWxCO0FBQWUsT0FKRztBQUtsQjtBQUFlLE9BTEc7QUFNbEI7QUFBZSxPQU5HO0FBT2xCO0FBQWUsT0FQRztBQVFsQjtBQUFlLE9BUkc7QUFTbEI7QUFBZSxPQVRHO0FBVWxCO0FBQWUsT0FWRztBQVdsQjtBQUFlLE9BWEc7QUFZbEI7QUFBZSxPQVpHO0FBYWxCO0FBQWUsV0FiRztBQWNsQjtBQUFlLFFBZEc7QUFlbEI7QUFBZXRxQixNQUFBQSxJQUFJLENBQUM0VixVQWZGO0FBZ0JsQjtBQUFlLFVBaEJHLENBQUQsQ0FBckI7QUFtQkE7Ozs7Ozs7Ozs7O0FBVUEzRCxNQUFBQSxLQUFLLFFBQUwsR0FBYXFZLElBQUksQ0FBQztBQUNkO0FBQWUsT0FERDtBQUVkO0FBQWUsT0FGRDtBQUdkO0FBQWUsT0FIRDtBQUlkO0FBQWUsT0FKRDtBQUtkO0FBQWUsT0FMRCxDQUFELEVBTWQsQ0FOYyxDQUFqQjtBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkFyWSxNQUFBQSxLQUFLLENBQUNZLE1BQU4sR0FBZXlYLElBQUksQ0FBQztBQUNoQjtBQUFlLE9BREM7QUFFaEI7QUFBZSxPQUZDO0FBR2hCO0FBQWUsT0FIQztBQUloQjtBQUFlLE9BSkM7QUFLaEI7QUFBZSxPQUxDO0FBTWhCO0FBQWUsT0FOQztBQU9oQjtBQUFlLE9BUEM7QUFRaEI7QUFBZSxPQVJDO0FBU2hCO0FBQWUsT0FUQztBQVVoQjtBQUFlLE9BVkM7QUFXaEI7QUFBZSxPQVhDO0FBWWhCO0FBQWUsT0FaQyxDQUFELEVBYWhCLENBYmdCLENBQW5CO0FBZUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFyWSxNQUFBQSxLQUFLLENBQUNNLE1BQU4sR0FBZStYLElBQUksQ0FBQztBQUNoQjtBQUFlLE9BREM7QUFFaEI7QUFBZSxPQUZDO0FBR2hCO0FBQWUsT0FIQztBQUloQjtBQUFlLE9BSkM7QUFLaEI7QUFBZSxPQUxDO0FBTWhCO0FBQWUsT0FOQztBQU9oQjtBQUFlLE9BUEM7QUFRaEI7QUFBZSxPQVJDO0FBU2hCO0FBQWUsT0FUQztBQVVoQjtBQUFlLE9BVkM7QUFXaEI7QUFBZSxPQVhDO0FBWWhCO0FBQWUsT0FaQztBQWFoQjtBQUFlLE9BYkMsQ0FBRCxDQUFuQjtBQWdCQyxLQXRNK0gsRUFzTTlIO0FBQUMsWUFBSztBQUFOLEtBdE04SCxDQTV4TnpHO0FBaytOVixRQUFHLENBQUMsVUFBU25xQixPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakQ7QUFFQTs7Ozs7QUFJQSxVQUFJTSxJQUFJLEdBQUdFLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQlMsT0FBTyxDQUFDLEVBQUQsQ0FBbkM7O0FBRUEsVUFBSXVYLEtBQUssR0FBR3ZYLE9BQU8sQ0FBQyxFQUFELENBQW5COztBQUVBLFVBQUltVSxJQUFKLEVBQVU7QUFDTnZFLE1BQUFBLElBREo7QUFHQS9QLE1BQUFBLElBQUksQ0FBQ21ELE9BQUwsR0FBZWhELE9BQU8sQ0FBQyxDQUFELENBQXRCO0FBQ0FILE1BQUFBLElBQUksQ0FBQzBGLEtBQUwsR0FBZXZGLE9BQU8sQ0FBQyxDQUFELENBQXRCO0FBQ0FILE1BQUFBLElBQUksQ0FBQ3NMLElBQUwsR0FBZW5MLE9BQU8sQ0FBQyxDQUFELENBQXRCO0FBRUE7Ozs7O0FBSUFILE1BQUFBLElBQUksQ0FBQzRGLEVBQUwsR0FBVTVGLElBQUksQ0FBQzJGLE9BQUwsQ0FBYSxJQUFiLENBQVY7QUFFQTs7Ozs7O0FBS0EzRixNQUFBQSxJQUFJLENBQUN1WixPQUFMLEdBQWUsU0FBU0EsT0FBVCxDQUFpQmQsTUFBakIsRUFBeUI7QUFDcEMsWUFBSUEsTUFBSixFQUFZO0FBQ1IsY0FBSXpVLElBQUksR0FBSUQsTUFBTSxDQUFDQyxJQUFQLENBQVl5VSxNQUFaLENBQVo7QUFBQSxjQUNJUyxLQUFLLEdBQUcsSUFBSTFZLEtBQUosQ0FBVXdELElBQUksQ0FBQ3RELE1BQWYsQ0FEWjtBQUFBLGNBRUlFLEtBQUssR0FBRyxDQUZaOztBQUdBLGlCQUFPQSxLQUFLLEdBQUdvRCxJQUFJLENBQUN0RCxNQUFwQjtBQUNJd1ksWUFBQUEsS0FBSyxDQUFDdFksS0FBRCxDQUFMLEdBQWU2WCxNQUFNLENBQUN6VSxJQUFJLENBQUNwRCxLQUFLLEVBQU4sQ0FBTCxDQUFyQjtBQURKOztBQUVBLGlCQUFPc1ksS0FBUDtBQUNIOztBQUNELGVBQU8sRUFBUDtBQUNILE9BVkQ7QUFZQTs7Ozs7OztBQUtBbFosTUFBQUEsSUFBSSxDQUFDZ1IsUUFBTCxHQUFnQixTQUFTQSxRQUFULENBQWtCa0ksS0FBbEIsRUFBeUI7QUFDckMsWUFBSVQsTUFBTSxHQUFHLEVBQWI7QUFBQSxZQUNJN1gsS0FBSyxHQUFJLENBRGI7O0FBRUEsZUFBT0EsS0FBSyxHQUFHc1ksS0FBSyxDQUFDeFksTUFBckIsRUFBNkI7QUFDekIsY0FBSThwQixHQUFHLEdBQUd0UixLQUFLLENBQUN0WSxLQUFLLEVBQU4sQ0FBZjtBQUFBLGNBQ0l5SCxHQUFHLEdBQUc2USxLQUFLLENBQUN0WSxLQUFLLEVBQU4sQ0FEZjtBQUVBLGNBQUl5SCxHQUFHLEtBQUtwSixTQUFaLEVBQ0l3WixNQUFNLENBQUMrUixHQUFELENBQU4sR0FBY25pQixHQUFkO0FBQ1A7O0FBQ0QsZUFBT29RLE1BQVA7QUFDSCxPQVZEOztBQVlBLFVBQUlnUyxtQkFBbUIsR0FBRyxLQUExQjtBQUFBLFVBQ0lDLGVBQWUsR0FBTyxJQUQxQjtBQUdBOzs7Ozs7QUFLQTFxQixNQUFBQSxJQUFJLENBQUN1bUIsVUFBTCxHQUFrQixTQUFTQSxVQUFULENBQW9CaG5CLElBQXBCLEVBQTBCO0FBQ3hDLGVBQU8sdVRBQXVUMkQsSUFBdlQsQ0FBNFQzRCxJQUE1VCxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7O0FBS0FTLE1BQUFBLElBQUksQ0FBQzZRLFFBQUwsR0FBZ0IsU0FBU0EsUUFBVCxDQUFrQlQsSUFBbEIsRUFBd0I7QUFDcEMsWUFBSSxDQUFDLFlBQVlsTixJQUFaLENBQWlCa04sSUFBakIsQ0FBRCxJQUEyQnBRLElBQUksQ0FBQ3VtQixVQUFMLENBQWdCblcsSUFBaEIsQ0FBL0IsRUFDSSxPQUFPLFFBQVFBLElBQUksQ0FBQzdMLE9BQUwsQ0FBYWttQixtQkFBYixFQUFrQyxNQUFsQyxFQUEwQ2xtQixPQUExQyxDQUFrRG1tQixlQUFsRCxFQUFtRSxNQUFuRSxDQUFSLEdBQXFGLEtBQTVGO0FBQ0osZUFBTyxNQUFNdGEsSUFBYjtBQUNILE9BSkQ7QUFNQTs7Ozs7OztBQUtBcFEsTUFBQUEsSUFBSSxDQUFDNGYsT0FBTCxHQUFlLFNBQVNBLE9BQVQsQ0FBaUJ5SCxHQUFqQixFQUFzQjtBQUNqQyxlQUFPQSxHQUFHLENBQUM1bEIsTUFBSixDQUFXLENBQVgsRUFBY2twQixXQUFkLEtBQThCdEQsR0FBRyxDQUFDckosU0FBSixDQUFjLENBQWQsQ0FBckM7QUFDSCxPQUZEOztBQUlBLFVBQUk0TSxXQUFXLEdBQUcsV0FBbEI7QUFFQTs7Ozs7O0FBS0E1cUIsTUFBQUEsSUFBSSxDQUFDbWQsU0FBTCxHQUFpQixTQUFTQSxTQUFULENBQW1Ca0ssR0FBbkIsRUFBd0I7QUFDckMsZUFBT0EsR0FBRyxDQUFDckosU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsSUFDQXFKLEdBQUcsQ0FBQ3JKLFNBQUosQ0FBYyxDQUFkLEVBQ0t6WixPQURMLENBQ2FxbUIsV0FEYixFQUMwQixVQUFTcG1CLEVBQVQsRUFBYUMsRUFBYixFQUFpQjtBQUFFLGlCQUFPQSxFQUFFLENBQUNrbUIsV0FBSCxFQUFQO0FBQTBCLFNBRHZFLENBRFA7QUFHSCxPQUpEO0FBTUE7Ozs7Ozs7O0FBTUEzcUIsTUFBQUEsSUFBSSxDQUFDa1IsaUJBQUwsR0FBeUIsU0FBU0EsaUJBQVQsQ0FBMkIyWixDQUEzQixFQUE4QnRvQixDQUE5QixFQUFpQztBQUN0RCxlQUFPc29CLENBQUMsQ0FBQ3BkLEVBQUYsR0FBT2xMLENBQUMsQ0FBQ2tMLEVBQWhCO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7Ozs7O0FBUUF6TixNQUFBQSxJQUFJLENBQUNtVyxZQUFMLEdBQW9CLFNBQVNBLFlBQVQsQ0FBc0JOLElBQXRCLEVBQTRCdVUsUUFBNUIsRUFBc0M7QUFFdEQ7QUFDQSxZQUFJdlUsSUFBSSxDQUFDc0MsS0FBVCxFQUFnQjtBQUNaLGNBQUlpUyxRQUFRLElBQUl2VSxJQUFJLENBQUNzQyxLQUFMLENBQVc1WSxJQUFYLEtBQW9CNnFCLFFBQXBDLEVBQThDO0FBQzFDcHFCLFlBQUFBLElBQUksQ0FBQzhxQixZQUFMLENBQWtCMVcsTUFBbEIsQ0FBeUJ5QixJQUFJLENBQUNzQyxLQUE5QjtBQUNBdEMsWUFBQUEsSUFBSSxDQUFDc0MsS0FBTCxDQUFXNVksSUFBWCxHQUFrQjZxQixRQUFsQjtBQUNBcHFCLFlBQUFBLElBQUksQ0FBQzhxQixZQUFMLENBQWtCaFgsR0FBbEIsQ0FBc0IrQixJQUFJLENBQUNzQyxLQUEzQjtBQUNIOztBQUNELGlCQUFPdEMsSUFBSSxDQUFDc0MsS0FBWjtBQUNIO0FBRUQ7OztBQUNBLFlBQUksQ0FBQzdELElBQUwsRUFDSUEsSUFBSSxHQUFHblUsT0FBTyxDQUFDLEVBQUQsQ0FBZDtBQUVKLFlBQUlxTixJQUFJLEdBQUcsSUFBSThHLElBQUosQ0FBUzhWLFFBQVEsSUFBSXZVLElBQUksQ0FBQ3RXLElBQTFCLENBQVg7QUFDQVMsUUFBQUEsSUFBSSxDQUFDOHFCLFlBQUwsQ0FBa0JoWCxHQUFsQixDQUFzQnRHLElBQXRCO0FBQ0FBLFFBQUFBLElBQUksQ0FBQ3FJLElBQUwsR0FBWUEsSUFBWixDQWxCc0QsQ0FrQnBDOztBQUNsQjlSLFFBQUFBLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0JhLElBQXRCLEVBQTRCLE9BQTVCLEVBQXFDO0FBQUVuUixVQUFBQSxLQUFLLEVBQUU4SSxJQUFUO0FBQWV1ZCxVQUFBQSxVQUFVLEVBQUU7QUFBM0IsU0FBckM7QUFDQWhuQixRQUFBQSxNQUFNLENBQUNpUixjQUFQLENBQXNCYSxJQUFJLENBQUMzUSxTQUEzQixFQUFzQyxPQUF0QyxFQUErQztBQUFFUixVQUFBQSxLQUFLLEVBQUU4SSxJQUFUO0FBQWV1ZCxVQUFBQSxVQUFVLEVBQUU7QUFBM0IsU0FBL0M7QUFDQSxlQUFPdmQsSUFBUDtBQUNILE9BdEJEOztBQXdCQSxVQUFJd2QsaUJBQWlCLEdBQUcsQ0FBeEI7QUFFQTs7Ozs7O0FBS0FockIsTUFBQUEsSUFBSSxDQUFDb1csWUFBTCxHQUFvQixTQUFTQSxZQUFULENBQXNCcUMsTUFBdEIsRUFBOEI7QUFFOUM7QUFDQSxZQUFJQSxNQUFNLENBQUNOLEtBQVgsRUFDSSxPQUFPTSxNQUFNLENBQUNOLEtBQWQ7QUFFSjs7QUFDQSxZQUFJLENBQUNwSSxJQUFMLEVBQ0lBLElBQUksR0FBRzVQLE9BQU8sQ0FBQyxFQUFELENBQWQ7QUFFSixZQUFJc1QsR0FBRyxHQUFHLElBQUkxRCxJQUFKLENBQVMsU0FBU2liLGlCQUFpQixFQUFuQyxFQUF1Q3ZTLE1BQXZDLENBQVY7QUFDQXpZLFFBQUFBLElBQUksQ0FBQzhxQixZQUFMLENBQWtCaFgsR0FBbEIsQ0FBc0JMLEdBQXRCO0FBQ0ExUCxRQUFBQSxNQUFNLENBQUNpUixjQUFQLENBQXNCeUQsTUFBdEIsRUFBOEIsT0FBOUIsRUFBdUM7QUFBRS9ULFVBQUFBLEtBQUssRUFBRStPLEdBQVQ7QUFBY3NYLFVBQUFBLFVBQVUsRUFBRTtBQUExQixTQUF2QztBQUNBLGVBQU90WCxHQUFQO0FBQ0gsT0FkRDtBQWdCQTs7Ozs7Ozs7QUFNQTFQLE1BQUFBLE1BQU0sQ0FBQ2lSLGNBQVAsQ0FBc0JoVixJQUF0QixFQUE0QixjQUE1QixFQUE0QztBQUN4QzRQLFFBQUFBLEdBQUcsRUFBRSxlQUFXO0FBQ1osaUJBQU84SCxLQUFLLENBQUMsV0FBRCxDQUFMLEtBQXVCQSxLQUFLLENBQUMsV0FBRCxDQUFMLEdBQXFCLEtBQUt2WCxPQUFPLENBQUMsRUFBRCxDQUFaLEdBQTVDLENBQVA7QUFDSDtBQUh1QyxPQUE1QztBQU1DLEtBcExlLEVBb0xkO0FBQUMsWUFBSyxFQUFOO0FBQVMsWUFBSyxFQUFkO0FBQWlCLFdBQUksQ0FBckI7QUFBdUIsWUFBSyxFQUE1QjtBQUErQixZQUFLLEVBQXBDO0FBQXVDLFlBQUssRUFBNUM7QUFBK0MsV0FBSSxDQUFuRDtBQUFxRCxXQUFJO0FBQXpELEtBcExjLENBbCtOTztBQXNwT3dDLFFBQUcsQ0FBQyxVQUFTQSxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDbkc7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQnNoQixRQUFqQjs7QUFFQSxVQUFJaGhCLElBQUksR0FBR0csT0FBTyxDQUFDLEVBQUQsQ0FBbEI7QUFFQTs7Ozs7Ozs7OztBQVFBLGVBQVM2Z0IsUUFBVCxDQUFrQmhXLEVBQWxCLEVBQXNCQyxFQUF0QixFQUEwQjtBQUV0QjtBQUNBOztBQUVBOzs7O0FBSUEsYUFBS0QsRUFBTCxHQUFVQSxFQUFFLEtBQUssQ0FBakI7QUFFQTs7Ozs7QUFJQSxhQUFLQyxFQUFMLEdBQVVBLEVBQUUsS0FBSyxDQUFqQjtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQSxVQUFJZ2dCLElBQUksR0FBR2pLLFFBQVEsQ0FBQ2lLLElBQVQsR0FBZ0IsSUFBSWpLLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQTNCOztBQUVBaUssTUFBQUEsSUFBSSxDQUFDdFosUUFBTCxHQUFnQixZQUFXO0FBQUUsZUFBTyxDQUFQO0FBQVcsT0FBeEM7O0FBQ0FzWixNQUFBQSxJQUFJLENBQUNDLFFBQUwsR0FBZ0JELElBQUksQ0FBQ3ZILFFBQUwsR0FBZ0IsWUFBVztBQUFFLGVBQU8sSUFBUDtBQUFjLE9BQTNEOztBQUNBdUgsTUFBQUEsSUFBSSxDQUFDdnFCLE1BQUwsR0FBYyxZQUFXO0FBQUUsZUFBTyxDQUFQO0FBQVcsT0FBdEM7QUFFQTs7Ozs7OztBQUtBLFVBQUl5cUIsUUFBUSxHQUFHbkssUUFBUSxDQUFDbUssUUFBVCxHQUFvQixrQkFBbkM7QUFFQTs7Ozs7O0FBS0FuSyxNQUFBQSxRQUFRLENBQUN4TCxVQUFULEdBQXNCLFNBQVNBLFVBQVQsQ0FBb0I5USxLQUFwQixFQUEyQjtBQUM3QyxZQUFJQSxLQUFLLEtBQUssQ0FBZCxFQUNJLE9BQU91bUIsSUFBUDtBQUNKLFlBQUloaUIsSUFBSSxHQUFHdkUsS0FBSyxHQUFHLENBQW5CO0FBQ0EsWUFBSXVFLElBQUosRUFDSXZFLEtBQUssR0FBRyxDQUFDQSxLQUFUO0FBQ0osWUFBSXNHLEVBQUUsR0FBR3RHLEtBQUssS0FBSyxDQUFuQjtBQUFBLFlBQ0l1RyxFQUFFLEdBQUcsQ0FBQ3ZHLEtBQUssR0FBR3NHLEVBQVQsSUFBZSxVQUFmLEtBQThCLENBRHZDOztBQUVBLFlBQUkvQixJQUFKLEVBQVU7QUFDTmdDLFVBQUFBLEVBQUUsR0FBRyxDQUFDQSxFQUFELEtBQVEsQ0FBYjtBQUNBRCxVQUFBQSxFQUFFLEdBQUcsQ0FBQ0EsRUFBRCxLQUFRLENBQWI7O0FBQ0EsY0FBSSxFQUFFQSxFQUFGLEdBQU8sVUFBWCxFQUF1QjtBQUNuQkEsWUFBQUEsRUFBRSxHQUFHLENBQUw7QUFDQSxnQkFBSSxFQUFFQyxFQUFGLEdBQU8sVUFBWCxFQUNJQSxFQUFFLEdBQUcsQ0FBTDtBQUNQO0FBQ0o7O0FBQ0QsZUFBTyxJQUFJK1YsUUFBSixDQUFhaFcsRUFBYixFQUFpQkMsRUFBakIsQ0FBUDtBQUNILE9BbEJEO0FBb0JBOzs7Ozs7O0FBS0ErVixNQUFBQSxRQUFRLENBQUNvSyxJQUFULEdBQWdCLFNBQVNBLElBQVQsQ0FBYzFtQixLQUFkLEVBQXFCO0FBQ2pDLFlBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUNJLE9BQU9zYyxRQUFRLENBQUN4TCxVQUFULENBQW9COVEsS0FBcEIsQ0FBUDs7QUFDSixZQUFJMUUsSUFBSSxDQUFDK1QsUUFBTCxDQUFjclAsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCO0FBQ0EsY0FBSTFFLElBQUksQ0FBQ0YsSUFBVCxFQUNJNEUsS0FBSyxHQUFHMUUsSUFBSSxDQUFDRixJQUFMLENBQVV1ckIsVUFBVixDQUFxQjNtQixLQUFyQixDQUFSLENBREosS0FHSSxPQUFPc2MsUUFBUSxDQUFDeEwsVUFBVCxDQUFvQnlJLFFBQVEsQ0FBQ3ZaLEtBQUQsRUFBUSxFQUFSLENBQTVCLENBQVA7QUFDUDs7QUFDRCxlQUFPQSxLQUFLLENBQUM4TSxHQUFOLElBQWE5TSxLQUFLLENBQUMrTSxJQUFuQixHQUEwQixJQUFJdVAsUUFBSixDQUFhdGMsS0FBSyxDQUFDOE0sR0FBTixLQUFjLENBQTNCLEVBQThCOU0sS0FBSyxDQUFDK00sSUFBTixLQUFlLENBQTdDLENBQTFCLEdBQTRFd1osSUFBbkY7QUFDSCxPQVhEO0FBYUE7Ozs7Ozs7QUFLQWpLLE1BQUFBLFFBQVEsQ0FBQzliLFNBQVQsQ0FBbUJ5TSxRQUFuQixHQUE4QixTQUFTQSxRQUFULENBQWtCRCxRQUFsQixFQUE0QjtBQUN0RCxZQUFJLENBQUNBLFFBQUQsSUFBYSxLQUFLekcsRUFBTCxLQUFZLEVBQTdCLEVBQWlDO0FBQzdCLGNBQUlELEVBQUUsR0FBRyxDQUFDLEtBQUtBLEVBQU4sR0FBVyxDQUFYLEtBQWlCLENBQTFCO0FBQUEsY0FDSUMsRUFBRSxHQUFHLENBQUMsS0FBS0EsRUFBTixLQUFpQixDQUQxQjtBQUVBLGNBQUksQ0FBQ0QsRUFBTCxFQUNJQyxFQUFFLEdBQUdBLEVBQUUsR0FBRyxDQUFMLEtBQVcsQ0FBaEI7QUFDSixpQkFBTyxFQUFFRCxFQUFFLEdBQUdDLEVBQUUsR0FBRyxVQUFaLENBQVA7QUFDSDs7QUFDRCxlQUFPLEtBQUtELEVBQUwsR0FBVSxLQUFLQyxFQUFMLEdBQVUsVUFBM0I7QUFDSCxPQVREO0FBV0E7Ozs7Ozs7QUFLQStWLE1BQUFBLFFBQVEsQ0FBQzliLFNBQVQsQ0FBbUJvbUIsTUFBbkIsR0FBNEIsU0FBU0EsTUFBVCxDQUFnQjVaLFFBQWhCLEVBQTBCO0FBQ2xELGVBQU8xUixJQUFJLENBQUNGLElBQUwsR0FDRCxJQUFJRSxJQUFJLENBQUNGLElBQVQsQ0FBYyxLQUFLa0wsRUFBTCxHQUFVLENBQXhCLEVBQTJCLEtBQUtDLEVBQUwsR0FBVSxDQUFyQyxFQUF3QzRJLE9BQU8sQ0FBQ25DLFFBQUQsQ0FBL0M7QUFDRjtBQUZHLFVBR0Q7QUFBRUYsVUFBQUEsR0FBRyxFQUFFLEtBQUt4RyxFQUFMLEdBQVUsQ0FBakI7QUFBb0J5RyxVQUFBQSxJQUFJLEVBQUUsS0FBS3hHLEVBQUwsR0FBVSxDQUFwQztBQUF1Q3lHLFVBQUFBLFFBQVEsRUFBRW1DLE9BQU8sQ0FBQ25DLFFBQUQ7QUFBeEQsU0FITjtBQUlILE9BTEQ7O0FBT0EsVUFBSTFPLFVBQVUsR0FBR1AsTUFBTSxDQUFDeUMsU0FBUCxDQUFpQmxDLFVBQWxDO0FBRUE7Ozs7OztBQUtBZ2UsTUFBQUEsUUFBUSxDQUFDdUssUUFBVCxHQUFvQixTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUN4QyxZQUFJQSxJQUFJLEtBQUtMLFFBQWIsRUFDSSxPQUFPRixJQUFQO0FBQ0osZUFBTyxJQUFJakssUUFBSixDQUNILENBQUVoZSxVQUFVLENBQUN2RCxJQUFYLENBQWdCK3JCLElBQWhCLEVBQXNCLENBQXRCLElBQ0F4b0IsVUFBVSxDQUFDdkQsSUFBWCxDQUFnQityQixJQUFoQixFQUFzQixDQUF0QixLQUE0QixDQUQ1QixHQUVBeG9CLFVBQVUsQ0FBQ3ZELElBQVgsQ0FBZ0IrckIsSUFBaEIsRUFBc0IsQ0FBdEIsS0FBNEIsRUFGNUIsR0FHQXhvQixVQUFVLENBQUN2RCxJQUFYLENBQWdCK3JCLElBQWhCLEVBQXNCLENBQXRCLEtBQTRCLEVBSDlCLE1BR3NDLENBSm5DLEVBTUgsQ0FBRXhvQixVQUFVLENBQUN2RCxJQUFYLENBQWdCK3JCLElBQWhCLEVBQXNCLENBQXRCLElBQ0F4b0IsVUFBVSxDQUFDdkQsSUFBWCxDQUFnQityQixJQUFoQixFQUFzQixDQUF0QixLQUE0QixDQUQ1QixHQUVBeG9CLFVBQVUsQ0FBQ3ZELElBQVgsQ0FBZ0IrckIsSUFBaEIsRUFBc0IsQ0FBdEIsS0FBNEIsRUFGNUIsR0FHQXhvQixVQUFVLENBQUN2RCxJQUFYLENBQWdCK3JCLElBQWhCLEVBQXNCLENBQXRCLEtBQTRCLEVBSDlCLE1BR3NDLENBVG5DLENBQVA7QUFXSCxPQWREO0FBZ0JBOzs7Ozs7QUFJQXhLLE1BQUFBLFFBQVEsQ0FBQzliLFNBQVQsQ0FBbUJ1bUIsTUFBbkIsR0FBNEIsU0FBU0EsTUFBVCxHQUFrQjtBQUMxQyxlQUFPaHBCLE1BQU0sQ0FBQ0MsWUFBUCxDQUNILEtBQUtzSSxFQUFMLEdBQWlCLEdBRGQsRUFFSCxLQUFLQSxFQUFMLEtBQVksQ0FBWixHQUFpQixHQUZkLEVBR0gsS0FBS0EsRUFBTCxLQUFZLEVBQVosR0FBaUIsR0FIZCxFQUlILEtBQUtBLEVBQUwsS0FBWSxFQUpULEVBS0gsS0FBS0MsRUFBTCxHQUFpQixHQUxkLEVBTUgsS0FBS0EsRUFBTCxLQUFZLENBQVosR0FBaUIsR0FOZCxFQU9ILEtBQUtBLEVBQUwsS0FBWSxFQUFaLEdBQWlCLEdBUGQsRUFRSCxLQUFLQSxFQUFMLEtBQVksRUFSVCxDQUFQO0FBVUgsT0FYRDtBQWFBOzs7Ozs7QUFJQStWLE1BQUFBLFFBQVEsQ0FBQzliLFNBQVQsQ0FBbUJnbUIsUUFBbkIsR0FBOEIsU0FBU0EsUUFBVCxHQUFvQjtBQUM5QyxZQUFJUSxJQUFJLEdBQUssS0FBS3pnQixFQUFMLElBQVcsRUFBeEI7QUFDQSxhQUFLQSxFQUFMLEdBQVcsQ0FBQyxDQUFDLEtBQUtBLEVBQUwsSUFBVyxDQUFYLEdBQWUsS0FBS0QsRUFBTCxLQUFZLEVBQTVCLElBQWtDMGdCLElBQW5DLE1BQTZDLENBQXhEO0FBQ0EsYUFBSzFnQixFQUFMLEdBQVcsQ0FBRSxLQUFLQSxFQUFMLElBQVcsQ0FBWCxHQUFpQzBnQixJQUFuQyxNQUE2QyxDQUF4RDtBQUNBLGVBQU8sSUFBUDtBQUNILE9BTEQ7QUFPQTs7Ozs7O0FBSUExSyxNQUFBQSxRQUFRLENBQUM5YixTQUFULENBQW1Cd2UsUUFBbkIsR0FBOEIsU0FBU0EsUUFBVCxHQUFvQjtBQUM5QyxZQUFJZ0ksSUFBSSxHQUFHLEVBQUUsS0FBSzFnQixFQUFMLEdBQVUsQ0FBWixDQUFYO0FBQ0EsYUFBS0EsRUFBTCxHQUFXLENBQUMsQ0FBQyxLQUFLQSxFQUFMLEtBQVksQ0FBWixHQUFnQixLQUFLQyxFQUFMLElBQVcsRUFBNUIsSUFBa0N5Z0IsSUFBbkMsTUFBNkMsQ0FBeEQ7QUFDQSxhQUFLemdCLEVBQUwsR0FBVyxDQUFFLEtBQUtBLEVBQUwsS0FBWSxDQUFaLEdBQWlDeWdCLElBQW5DLE1BQTZDLENBQXhEO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsT0FMRDtBQU9BOzs7Ozs7QUFJQTFLLE1BQUFBLFFBQVEsQ0FBQzliLFNBQVQsQ0FBbUJ4RSxNQUFuQixHQUE0QixTQUFTQSxNQUFULEdBQWtCO0FBQzFDLFlBQUlpckIsS0FBSyxHQUFJLEtBQUszZ0IsRUFBbEI7QUFBQSxZQUNJNGdCLEtBQUssR0FBRyxDQUFDLEtBQUs1Z0IsRUFBTCxLQUFZLEVBQVosR0FBaUIsS0FBS0MsRUFBTCxJQUFXLENBQTdCLE1BQW9DLENBRGhEO0FBQUEsWUFFSTRnQixLQUFLLEdBQUksS0FBSzVnQixFQUFMLEtBQVksRUFGekI7QUFHQSxlQUFPNGdCLEtBQUssS0FBSyxDQUFWLEdBQ0FELEtBQUssS0FBSyxDQUFWLEdBQ0VELEtBQUssR0FBRyxLQUFSLEdBQ0VBLEtBQUssR0FBRyxHQUFSLEdBQWMsQ0FBZCxHQUFrQixDQURwQixHQUVFQSxLQUFLLEdBQUcsT0FBUixHQUFrQixDQUFsQixHQUFzQixDQUgxQixHQUlFQyxLQUFLLEdBQUcsS0FBUixHQUNFQSxLQUFLLEdBQUcsR0FBUixHQUFjLENBQWQsR0FBa0IsQ0FEcEIsR0FFRUEsS0FBSyxHQUFHLE9BQVIsR0FBa0IsQ0FBbEIsR0FBc0IsQ0FQMUIsR0FRQUMsS0FBSyxHQUFHLEdBQVIsR0FBYyxDQUFkLEdBQWtCLEVBUnpCO0FBU0gsT0FiRDtBQWVDLEtBMU1pRSxFQTBNaEU7QUFBQyxZQUFLO0FBQU4sS0ExTWdFLENBdHBPM0M7QUFnMk9WLFFBQUcsQ0FBQyxVQUFTMXJCLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUNqRDs7QUFDQSxVQUFJTSxJQUFJLEdBQUdOLE9BQVgsQ0FGaUQsQ0FJakQ7O0FBQ0FNLE1BQUFBLElBQUksQ0FBQ0ksU0FBTCxHQUFpQkQsT0FBTyxDQUFDLENBQUQsQ0FBeEIsQ0FMaUQsQ0FPakQ7O0FBQ0FILE1BQUFBLElBQUksQ0FBQ3FCLE1BQUwsR0FBY2xCLE9BQU8sQ0FBQyxDQUFELENBQXJCLENBUmlELENBVWpEOztBQUNBSCxNQUFBQSxJQUFJLENBQUNnRixZQUFMLEdBQW9CN0UsT0FBTyxDQUFDLENBQUQsQ0FBM0IsQ0FYaUQsQ0FhakQ7O0FBQ0FILE1BQUFBLElBQUksU0FBSixHQUFhRyxPQUFPLENBQUMsQ0FBRCxDQUFwQixDQWRpRCxDQWdCakQ7O0FBQ0FILE1BQUFBLElBQUksQ0FBQzJGLE9BQUwsR0FBZXhGLE9BQU8sQ0FBQyxDQUFELENBQXRCLENBakJpRCxDQW1CakQ7O0FBQ0FILE1BQUFBLElBQUksQ0FBQ3VNLElBQUwsR0FBWXBNLE9BQU8sQ0FBQyxFQUFELENBQW5CLENBcEJpRCxDQXNCakQ7O0FBQ0FILE1BQUFBLElBQUksQ0FBQ2dNLElBQUwsR0FBWTdMLE9BQU8sQ0FBQyxDQUFELENBQW5CLENBdkJpRCxDQXlCakQ7O0FBQ0FILE1BQUFBLElBQUksQ0FBQ2doQixRQUFMLEdBQWdCN2dCLE9BQU8sQ0FBQyxFQUFELENBQXZCO0FBRUE7Ozs7Ozs7QUFNQUgsTUFBQUEsSUFBSSxDQUFDNFYsVUFBTCxHQUFrQjdSLE1BQU0sQ0FBQzBSLE1BQVAsR0FBZ0IxUixNQUFNLENBQUMwUixNQUFQLENBQWMsRUFBZCxDQUFoQjtBQUFvQztBQUEyQixRQUFqRixDQWxDaUQsQ0FrQ29DOztBQUVyRjs7Ozs7O0FBS0F6VixNQUFBQSxJQUFJLENBQUMyVixXQUFMLEdBQW1CNVIsTUFBTSxDQUFDMFIsTUFBUCxHQUFnQjFSLE1BQU0sQ0FBQzBSLE1BQVAsQ0FBYyxFQUFkLENBQWhCO0FBQW9DO0FBQTJCLFFBQWxGLENBekNpRCxDQXlDcUM7O0FBRXRGOzs7Ozs7O0FBTUF6VixNQUFBQSxJQUFJLENBQUNrbEIsTUFBTCxHQUFjclIsT0FBTyxDQUFDN1UsTUFBTSxDQUFDeWxCLE9BQVAsSUFBa0J6bEIsTUFBTSxDQUFDeWxCLE9BQVAsQ0FBZXFILFFBQWpDLElBQTZDOXNCLE1BQU0sQ0FBQ3lsQixPQUFQLENBQWVxSCxRQUFmLENBQXdCQyxJQUF0RSxDQUFyQjtBQUVBOzs7Ozs7O0FBTUEvckIsTUFBQUEsSUFBSSxDQUFDZ1UsU0FBTCxHQUFpQnJQLE1BQU0sQ0FBQ3FQLFNBQVA7QUFBb0I7QUFBMkIsZUFBU0EsU0FBVCxDQUFtQnRQLEtBQW5CLEVBQTBCO0FBQ3RGLGVBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QnNuQixRQUFRLENBQUN0bkIsS0FBRCxDQUFyQyxJQUFnRGhELElBQUksQ0FBQ2tELEtBQUwsQ0FBV0YsS0FBWCxNQUFzQkEsS0FBN0U7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7QUFLQTFFLE1BQUFBLElBQUksQ0FBQytULFFBQUwsR0FBZ0IsU0FBU0EsUUFBVCxDQUFrQnJQLEtBQWxCLEVBQXlCO0FBQ3JDLGVBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsS0FBSyxZQUFZakMsTUFBckQ7QUFDSCxPQUZEO0FBSUE7Ozs7Ozs7QUFLQXpDLE1BQUFBLElBQUksQ0FBQ3lVLFFBQUwsR0FBZ0IsU0FBU0EsUUFBVCxDQUFrQi9QLEtBQWxCLEVBQXlCO0FBQ3JDLGVBQU9BLEtBQUssSUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpDO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7Ozs7O0FBUUExRSxNQUFBQSxJQUFJLENBQUNpc0IsS0FBTDtBQUVBOzs7Ozs7QUFNQWpzQixNQUFBQSxJQUFJLENBQUNrc0IsS0FBTCxHQUFhLFNBQVNBLEtBQVQsQ0FBZS9TLEdBQWYsRUFBb0IvSSxJQUFwQixFQUEwQjtBQUNuQyxZQUFJMUwsS0FBSyxHQUFHeVUsR0FBRyxDQUFDL0ksSUFBRCxDQUFmO0FBQ0EsWUFBSTFMLEtBQUssSUFBSSxJQUFULElBQWlCeVUsR0FBRyxDQUFDZ1QsY0FBSixDQUFtQi9iLElBQW5CLENBQXJCLEVBQStDO0FBQzNDLGlCQUFPLE9BQU8xTCxLQUFQLEtBQWlCLFFBQWpCLElBQTZCLENBQUNsRSxLQUFLLENBQUMwWixPQUFOLENBQWN4VixLQUFkLElBQXVCQSxLQUFLLENBQUNoRSxNQUE3QixHQUFzQ3FELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZVSxLQUFaLEVBQW1CaEUsTUFBMUQsSUFBb0UsQ0FBeEc7QUFDSixlQUFPLEtBQVA7QUFDSCxPQWJEO0FBZUE7Ozs7Ozs7QUFPQTs7Ozs7O0FBSUFWLE1BQUFBLElBQUksQ0FBQ3NoQixNQUFMLEdBQWUsWUFBVztBQUN0QixZQUFJO0FBQ0EsY0FBSUEsTUFBTSxHQUFHdGhCLElBQUksQ0FBQzJGLE9BQUwsQ0FBYSxRQUFiLEVBQXVCMmIsTUFBcEMsQ0FEQSxDQUVBOztBQUNBLGlCQUFPQSxNQUFNLENBQUNwYyxTQUFQLENBQWlCa25CLFNBQWpCLEdBQTZCOUssTUFBN0I7QUFBc0M7QUFBMkIsY0FBeEU7QUFDSCxTQUpELENBSUUsT0FBT2pXLENBQVAsRUFBVTtBQUNSO0FBQ0EsaUJBQU8sSUFBUDtBQUNIO0FBQ0osT0FUYSxFQUFkLENBakhpRCxDQTRIakQ7OztBQUNBckwsTUFBQUEsSUFBSSxDQUFDcXNCLFlBQUwsR0FBb0IsSUFBcEIsQ0E3SGlELENBK0hqRDs7QUFDQXJzQixNQUFBQSxJQUFJLENBQUNzc0IsbUJBQUwsR0FBMkIsSUFBM0I7QUFFQTs7Ozs7O0FBS0F0c0IsTUFBQUEsSUFBSSxDQUFDMFYsU0FBTCxHQUFpQixTQUFTQSxTQUFULENBQW1CNlcsV0FBbkIsRUFBZ0M7QUFDN0M7QUFDQSxlQUFPLE9BQU9BLFdBQVAsS0FBdUIsUUFBdkIsR0FDRHZzQixJQUFJLENBQUNzaEIsTUFBTCxHQUNJdGhCLElBQUksQ0FBQ3NzQixtQkFBTCxDQUF5QkMsV0FBekIsQ0FESixHQUVJLElBQUl2c0IsSUFBSSxDQUFDUSxLQUFULENBQWUrckIsV0FBZixDQUhILEdBSUR2c0IsSUFBSSxDQUFDc2hCLE1BQUwsR0FDSXRoQixJQUFJLENBQUNxc0IsWUFBTCxDQUFrQkUsV0FBbEIsQ0FESixHQUVJLE9BQU83a0IsVUFBUCxLQUFzQixXQUF0QixHQUNJNmtCLFdBREosR0FFSSxJQUFJN2tCLFVBQUosQ0FBZTZrQixXQUFmLENBUmQ7QUFTSCxPQVhEO0FBYUE7Ozs7OztBQUlBdnNCLE1BQUFBLElBQUksQ0FBQ1EsS0FBTCxHQUFhLE9BQU9rSCxVQUFQLEtBQXNCLFdBQXRCLEdBQW9DQTtBQUFXO0FBQS9DLFFBQTRFbEgsS0FBekY7QUFFQTs7Ozs7Ozs7O0FBU0E7Ozs7O0FBSUFSLE1BQUFBLElBQUksQ0FBQ0YsSUFBTDtBQUFZO0FBQTJCZCxNQUFBQSxNQUFNLENBQUN3dEIsT0FBUDtBQUFrQjtBQUEyQnh0QixNQUFBQSxNQUFNLENBQUN3dEIsT0FBUCxDQUFlMXNCLElBQTVELElBQW9FRSxJQUFJLENBQUMyRixPQUFMLENBQWEsTUFBYixDQUEzRztBQUVBOzs7Ozs7QUFLQTNGLE1BQUFBLElBQUksQ0FBQ3lzQixNQUFMLEdBQWMsa0JBQWQ7QUFFQTs7Ozs7O0FBS0F6c0IsTUFBQUEsSUFBSSxDQUFDMHNCLE9BQUwsR0FBZSx1QkFBZjtBQUVBOzs7Ozs7QUFLQTFzQixNQUFBQSxJQUFJLENBQUMyc0IsT0FBTCxHQUFlLDRDQUFmO0FBRUE7Ozs7OztBQUtBM3NCLE1BQUFBLElBQUksQ0FBQzRzQixVQUFMLEdBQWtCLFNBQVNBLFVBQVQsQ0FBb0Jsb0IsS0FBcEIsRUFBMkI7QUFDekMsZUFBT0EsS0FBSyxHQUNOMUUsSUFBSSxDQUFDZ2hCLFFBQUwsQ0FBY29LLElBQWQsQ0FBbUIxbUIsS0FBbkIsRUFBMEIrbUIsTUFBMUIsRUFETSxHQUVOenJCLElBQUksQ0FBQ2doQixRQUFMLENBQWNtSyxRQUZwQjtBQUdILE9BSkQ7QUFNQTs7Ozs7Ozs7QUFNQW5yQixNQUFBQSxJQUFJLENBQUM2c0IsWUFBTCxHQUFvQixTQUFTQSxZQUFULENBQXNCckIsSUFBdEIsRUFBNEI5WixRQUE1QixFQUFzQztBQUN0RCxZQUFJMFEsSUFBSSxHQUFHcGlCLElBQUksQ0FBQ2doQixRQUFMLENBQWN1SyxRQUFkLENBQXVCQyxJQUF2QixDQUFYO0FBQ0EsWUFBSXhyQixJQUFJLENBQUNGLElBQVQsRUFDSSxPQUFPRSxJQUFJLENBQUNGLElBQUwsQ0FBVWd0QixRQUFWLENBQW1CMUssSUFBSSxDQUFDcFgsRUFBeEIsRUFBNEJvWCxJQUFJLENBQUNuWCxFQUFqQyxFQUFxQ3lHLFFBQXJDLENBQVA7QUFDSixlQUFPMFEsSUFBSSxDQUFDelEsUUFBTCxDQUFja0MsT0FBTyxDQUFDbkMsUUFBRCxDQUFyQixDQUFQO0FBQ0gsT0FMRDtBQU9BOzs7Ozs7Ozs7O0FBUUEsZUFBU3lSLEtBQVQsQ0FBZTRKLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCN1gsUUFBekIsRUFBbUM7QUFBRTtBQUNqQyxhQUFLLElBQUluUixJQUFJLEdBQUdELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZZ3BCLEdBQVosQ0FBWCxFQUE2QmxyQixDQUFDLEdBQUcsQ0FBdEMsRUFBeUNBLENBQUMsR0FBR2tDLElBQUksQ0FBQ3RELE1BQWxELEVBQTBELEVBQUVvQixDQUE1RDtBQUNJLGNBQUlpckIsR0FBRyxDQUFDL29CLElBQUksQ0FBQ2xDLENBQUQsQ0FBTCxDQUFILEtBQWlCN0MsU0FBakIsSUFBOEIsQ0FBQ2tXLFFBQW5DLEVBQ0k0WCxHQUFHLENBQUMvb0IsSUFBSSxDQUFDbEMsQ0FBRCxDQUFMLENBQUgsR0FBZWtyQixHQUFHLENBQUNocEIsSUFBSSxDQUFDbEMsQ0FBRCxDQUFMLENBQWxCO0FBRlI7O0FBR0EsZUFBT2lyQixHQUFQO0FBQ0g7O0FBRUQvc0IsTUFBQUEsSUFBSSxDQUFDbWpCLEtBQUwsR0FBYUEsS0FBYjtBQUVBOzs7Ozs7QUFLQW5qQixNQUFBQSxJQUFJLENBQUMyZixPQUFMLEdBQWUsU0FBU0EsT0FBVCxDQUFpQjBILEdBQWpCLEVBQXNCO0FBQ2pDLGVBQU9BLEdBQUcsQ0FBQzVsQixNQUFKLENBQVcsQ0FBWCxFQUFjaVQsV0FBZCxLQUE4QjJTLEdBQUcsQ0FBQ3JKLFNBQUosQ0FBYyxDQUFkLENBQXJDO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7OztBQU1BLGVBQVNpUCxRQUFULENBQWtCMXRCLElBQWxCLEVBQXdCO0FBRXBCLGlCQUFTMnRCLFdBQVQsQ0FBcUJ2WSxPQUFyQixFQUE4QnVELFVBQTlCLEVBQTBDO0FBRXRDLGNBQUksRUFBRSxnQkFBZ0JnVixXQUFsQixDQUFKLEVBQ0ksT0FBTyxJQUFJQSxXQUFKLENBQWdCdlksT0FBaEIsRUFBeUJ1RCxVQUF6QixDQUFQLENBSGtDLENBS3RDO0FBQ0E7O0FBRUFuVSxVQUFBQSxNQUFNLENBQUNpUixjQUFQLENBQXNCLElBQXRCLEVBQTRCLFNBQTVCLEVBQXVDO0FBQUVwRixZQUFBQSxHQUFHLEVBQUUsZUFBVztBQUFFLHFCQUFPK0UsT0FBUDtBQUFpQjtBQUFyQyxXQUF2QztBQUVBOztBQUNBLGNBQUkxUixLQUFLLENBQUNrcUIsaUJBQVYsRUFBNkI7QUFDekJscUIsWUFBQUEsS0FBSyxDQUFDa3FCLGlCQUFOLENBQXdCLElBQXhCLEVBQThCRCxXQUE5QixFQURKLEtBR0lucEIsTUFBTSxDQUFDaVIsY0FBUCxDQUFzQixJQUF0QixFQUE0QixPQUE1QixFQUFxQztBQUFFdFEsWUFBQUEsS0FBSyxFQUFHLElBQUl6QixLQUFKLEVBQUQsQ0FBY3lrQixLQUFkLElBQXVCO0FBQWhDLFdBQXJDO0FBRUosY0FBSXhQLFVBQUosRUFDSWlMLEtBQUssQ0FBQyxJQUFELEVBQU9qTCxVQUFQLENBQUw7QUFDUDs7QUFFRCxTQUFDZ1YsV0FBVyxDQUFDaG9CLFNBQVosR0FBd0JuQixNQUFNLENBQUNpUCxNQUFQLENBQWMvUCxLQUFLLENBQUNpQyxTQUFwQixDQUF6QixFQUF5RCtOLFdBQXpELEdBQXVFaWEsV0FBdkU7QUFFQW5wQixRQUFBQSxNQUFNLENBQUNpUixjQUFQLENBQXNCa1ksV0FBVyxDQUFDaG9CLFNBQWxDLEVBQTZDLE1BQTdDLEVBQXFEO0FBQUUwSyxVQUFBQSxHQUFHLEVBQUUsZUFBVztBQUFFLG1CQUFPclEsSUFBUDtBQUFjO0FBQWxDLFNBQXJEOztBQUVBMnRCLFFBQUFBLFdBQVcsQ0FBQ2hvQixTQUFaLENBQXNCeEIsUUFBdEIsR0FBaUMsU0FBU0EsUUFBVCxHQUFvQjtBQUNqRCxpQkFBTyxLQUFLbkUsSUFBTCxHQUFZLElBQVosR0FBbUIsS0FBS29WLE9BQS9CO0FBQ0gsU0FGRDs7QUFJQSxlQUFPdVksV0FBUDtBQUNIOztBQUVEbHRCLE1BQUFBLElBQUksQ0FBQ2l0QixRQUFMLEdBQWdCQSxRQUFoQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkFqdEIsTUFBQUEsSUFBSSxDQUFDb3RCLGFBQUwsR0FBcUJILFFBQVEsQ0FBQyxlQUFELENBQTdCO0FBRUE7Ozs7OztBQU1BOzs7Ozs7O0FBT0E7Ozs7OztBQUtBanRCLE1BQUFBLElBQUksQ0FBQ3diLFdBQUwsR0FBbUIsU0FBUzZSLFFBQVQsQ0FBa0JuUyxVQUFsQixFQUE4QjtBQUM3QyxZQUFJb1MsUUFBUSxHQUFHLEVBQWY7O0FBQ0EsYUFBSyxJQUFJeHJCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdvWixVQUFVLENBQUN4YSxNQUEvQixFQUF1QyxFQUFFb0IsQ0FBekM7QUFDSXdyQixVQUFBQSxRQUFRLENBQUNwUyxVQUFVLENBQUNwWixDQUFELENBQVgsQ0FBUixHQUEwQixDQUExQjtBQURKO0FBR0E7Ozs7Ozs7QUFLQSxlQUFPLFlBQVc7QUFBRTtBQUNoQixlQUFLLElBQUlrQyxJQUFJLEdBQUdELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLElBQVosQ0FBWCxFQUE4QmxDLENBQUMsR0FBR2tDLElBQUksQ0FBQ3RELE1BQUwsR0FBYyxDQUFyRCxFQUF3RG9CLENBQUMsR0FBRyxDQUFDLENBQTdELEVBQWdFLEVBQUVBLENBQWxFO0FBQ0ksZ0JBQUl3ckIsUUFBUSxDQUFDdHBCLElBQUksQ0FBQ2xDLENBQUQsQ0FBTCxDQUFSLEtBQXNCLENBQXRCLElBQTJCLEtBQUtrQyxJQUFJLENBQUNsQyxDQUFELENBQVQsTUFBa0I3QyxTQUE3QyxJQUEwRCxLQUFLK0UsSUFBSSxDQUFDbEMsQ0FBRCxDQUFULE1BQWtCLElBQWhGLEVBQ0ksT0FBT2tDLElBQUksQ0FBQ2xDLENBQUQsQ0FBWDtBQUZSO0FBR0gsU0FKRDtBQUtILE9BZkQ7QUFpQkE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7QUFLQTlCLE1BQUFBLElBQUksQ0FBQzBiLFdBQUwsR0FBbUIsU0FBUzZSLFFBQVQsQ0FBa0JyUyxVQUFsQixFQUE4QjtBQUU3Qzs7Ozs7O0FBTUEsZUFBTyxVQUFTM2IsSUFBVCxFQUFlO0FBQ2xCLGVBQUssSUFBSXVDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdvWixVQUFVLENBQUN4YSxNQUEvQixFQUF1QyxFQUFFb0IsQ0FBekM7QUFDSSxnQkFBSW9aLFVBQVUsQ0FBQ3BaLENBQUQsQ0FBVixLQUFrQnZDLElBQXRCLEVBQ0ksT0FBTyxLQUFLMmIsVUFBVSxDQUFDcFosQ0FBRCxDQUFmLENBQVA7QUFGUjtBQUdILFNBSkQ7QUFLSCxPQWJEO0FBZUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTlCLE1BQUFBLElBQUksQ0FBQzJULGFBQUwsR0FBcUI7QUFDakI2WixRQUFBQSxLQUFLLEVBQUUvcUIsTUFEVTtBQUVqQmdyQixRQUFBQSxLQUFLLEVBQUVockIsTUFGVTtBQUdqQm1QLFFBQUFBLEtBQUssRUFBRW5QLE1BSFU7QUFJakJ5SyxRQUFBQSxJQUFJLEVBQUU7QUFKVyxPQUFyQjs7QUFPQWxOLE1BQUFBLElBQUksQ0FBQ3VXLFVBQUwsR0FBa0IsWUFBVztBQUN6QixZQUFJK0ssTUFBTSxHQUFHdGhCLElBQUksQ0FBQ3NoQixNQUFsQjtBQUNBOztBQUNBLFlBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1R0aEIsVUFBQUEsSUFBSSxDQUFDcXNCLFlBQUwsR0FBb0Jyc0IsSUFBSSxDQUFDc3NCLG1CQUFMLEdBQTJCLElBQS9DO0FBQ0E7QUFDSCxTQU53QixDQU96QjtBQUNBOzs7QUFDQXRzQixRQUFBQSxJQUFJLENBQUNxc0IsWUFBTCxHQUFvQi9LLE1BQU0sQ0FBQzhKLElBQVAsS0FBZ0IxakIsVUFBVSxDQUFDMGpCLElBQTNCLElBQW1DOUosTUFBTSxDQUFDOEosSUFBMUM7QUFDaEI7QUFDQSxpQkFBU3NDLFdBQVQsQ0FBcUJocEIsS0FBckIsRUFBNEJpcEIsUUFBNUIsRUFBc0M7QUFDbEMsaUJBQU8sSUFBSXJNLE1BQUosQ0FBVzVjLEtBQVgsRUFBa0JpcEIsUUFBbEIsQ0FBUDtBQUNILFNBSkw7O0FBS0EzdEIsUUFBQUEsSUFBSSxDQUFDc3NCLG1CQUFMLEdBQTJCaEwsTUFBTSxDQUFDc00sV0FBUDtBQUN2QjtBQUNBLGlCQUFTQyxrQkFBVCxDQUE0QjNoQixJQUE1QixFQUFrQztBQUM5QixpQkFBTyxJQUFJb1YsTUFBSixDQUFXcFYsSUFBWCxDQUFQO0FBQ0gsU0FKTDtBQUtILE9BbkJEO0FBcUJDLEtBdlplLEVBdVpkO0FBQUMsV0FBSSxDQUFMO0FBQU8sWUFBSyxFQUFaO0FBQWUsV0FBSSxDQUFuQjtBQUFxQixZQUFLLEVBQTFCO0FBQTZCLFdBQUksQ0FBakM7QUFBbUMsV0FBSSxDQUF2QztBQUF5QyxXQUFJLENBQTdDO0FBQStDLFdBQUk7QUFBbkQsS0F2WmMsQ0FoMk9PO0FBdXZQa0MsUUFBRyxDQUFDLFVBQVMvTCxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDN0Y7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQm9YLFFBQWpCOztBQUVBLFVBQUkvRyxJQUFJLEdBQVE1UCxPQUFPLENBQUMsRUFBRCxDQUF2QjtBQUFBLFVBQ0lILElBQUksR0FBUUcsT0FBTyxDQUFDLEVBQUQsQ0FEdkI7O0FBR0EsZUFBUzJ0QixPQUFULENBQWlCNWQsS0FBakIsRUFBd0IrWSxRQUF4QixFQUFrQztBQUM5QixlQUFPL1ksS0FBSyxDQUFDM1EsSUFBTixHQUFhLElBQWIsR0FBb0IwcEIsUUFBcEIsSUFBZ0MvWSxLQUFLLENBQUNJLFFBQU4sSUFBa0IyWSxRQUFRLEtBQUssT0FBL0IsR0FBeUMsSUFBekMsR0FBZ0QvWSxLQUFLLENBQUNZLEdBQU4sSUFBYW1ZLFFBQVEsS0FBSyxRQUExQixHQUFxQyxRQUFNL1ksS0FBSyxDQUFDakMsT0FBWixHQUFvQixHQUF6RCxHQUErRCxFQUEvSSxJQUFxSixXQUE1SjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O0FBU0EsZUFBUzhmLGNBQVQsQ0FBd0I5ZCxHQUF4QixFQUE2QkMsS0FBN0IsRUFBb0NDLFVBQXBDLEVBQWdEa0MsR0FBaEQsRUFBcUQ7QUFDakQ7QUFDQSxZQUFJbkMsS0FBSyxDQUFDRyxZQUFWLEVBQXdCO0FBQ3BCLGNBQUlILEtBQUssQ0FBQ0csWUFBTixZQUE4Qk4sSUFBbEMsRUFBd0M7QUFBRUUsWUFBQUEsR0FBRyxDQUN4QyxhQUR3QyxFQUN6Qm9DLEdBRHlCLENBQUgsQ0FFakMsVUFGaUMsRUFHN0IsVUFINkIsRUFHakJ5YixPQUFPLENBQUM1ZCxLQUFELEVBQVEsWUFBUixDQUhVOztBQUl0QyxpQkFBSyxJQUFJbE0sSUFBSSxHQUFHRCxNQUFNLENBQUNDLElBQVAsQ0FBWWtNLEtBQUssQ0FBQ0csWUFBTixDQUFtQnhCLE1BQS9CLENBQVgsRUFBbUR4TSxDQUFDLEdBQUcsQ0FBNUQsRUFBK0RBLENBQUMsR0FBRzJCLElBQUksQ0FBQ3RELE1BQXhFLEVBQWdGLEVBQUUyQixDQUFsRjtBQUFxRjROLGNBQUFBLEdBQUcsQ0FDbkYsVUFEbUYsRUFDdkVDLEtBQUssQ0FBQ0csWUFBTixDQUFtQnhCLE1BQW5CLENBQTBCN0ssSUFBSSxDQUFDM0IsQ0FBRCxDQUE5QixDQUR1RSxDQUFIO0FBQXJGOztBQUVBNE4sWUFBQUEsR0FBRyxDQUNNLE9BRE4sQ0FBSCxDQUVDLEdBRkQ7QUFHSCxXQVRELE1BU087QUFDSEEsWUFBQUEsR0FBRyxDQUNGLEdBREUsQ0FBSCxDQUVLLDZCQUZMLEVBRW9DRSxVQUZwQyxFQUVnRGtDLEdBRmhELEVBR0ssT0FITCxFQUlTLFlBSlQsRUFJdUJuQyxLQUFLLENBQUMzUSxJQUFOLEdBQWEsR0FKcEMsRUFLQyxHQUxEO0FBTUg7QUFDSixTQWxCRCxNQWtCTztBQUNILGtCQUFRMlEsS0FBSyxDQUFDMUMsSUFBZDtBQUNJLGlCQUFLLE9BQUw7QUFDQSxpQkFBSyxRQUFMO0FBQ0EsaUJBQUssUUFBTDtBQUNBLGlCQUFLLFNBQUw7QUFDQSxpQkFBSyxVQUFMO0FBQWlCeUMsY0FBQUEsR0FBRyxDQUNmLHlCQURlLEVBQ1lvQyxHQURaLENBQUgsQ0FFUixVQUZRLEVBRUl5YixPQUFPLENBQUM1ZCxLQUFELEVBQVEsU0FBUixDQUZYO0FBR2I7O0FBQ0osaUJBQUssT0FBTDtBQUNBLGlCQUFLLFFBQUw7QUFDQSxpQkFBSyxRQUFMO0FBQ0EsaUJBQUssU0FBTDtBQUNBLGlCQUFLLFVBQUw7QUFBaUJELGNBQUFBLEdBQUcsQ0FDZixpRkFEZSxFQUNvRW9DLEdBRHBFLEVBQ3lFQSxHQUR6RSxFQUM4RUEsR0FEOUUsRUFDbUZBLEdBRG5GLENBQUgsQ0FFUixVQUZRLEVBRUl5YixPQUFPLENBQUM1ZCxLQUFELEVBQVEsY0FBUixDQUZYO0FBR2I7O0FBQ0osaUJBQUssT0FBTDtBQUNBLGlCQUFLLFFBQUw7QUFBZUQsY0FBQUEsR0FBRyxDQUNiLDRCQURhLEVBQ2lCb0MsR0FEakIsQ0FBSCxDQUVOLFVBRk0sRUFFTXliLE9BQU8sQ0FBQzVkLEtBQUQsRUFBUSxRQUFSLENBRmI7QUFHWDs7QUFDSixpQkFBSyxNQUFMO0FBQWFELGNBQUFBLEdBQUcsQ0FDWCw2QkFEVyxFQUNvQm9DLEdBRHBCLENBQUgsQ0FFSixVQUZJLEVBRVF5YixPQUFPLENBQUM1ZCxLQUFELEVBQVEsU0FBUixDQUZmO0FBR1Q7O0FBQ0osaUJBQUssUUFBTDtBQUFlRCxjQUFBQSxHQUFHLENBQ2Isd0JBRGEsRUFDYW9DLEdBRGIsQ0FBSCxDQUVOLFVBRk0sRUFFTXliLE9BQU8sQ0FBQzVkLEtBQUQsRUFBUSxRQUFSLENBRmI7QUFHWDs7QUFDSixpQkFBSyxPQUFMO0FBQWNELGNBQUFBLEdBQUcsQ0FDWiw2REFEWSxFQUNtRG9DLEdBRG5ELEVBQ3dEQSxHQUR4RCxFQUM2REEsR0FEN0QsQ0FBSCxDQUVMLFVBRkssRUFFT3liLE9BQU8sQ0FBQzVkLEtBQUQsRUFBUSxRQUFSLENBRmQ7QUFHVjtBQWpDUjtBQW1DSDs7QUFDRCxlQUFPRCxHQUFQO0FBQ0E7QUFDSDtBQUVEOzs7Ozs7Ozs7O0FBUUEsZUFBUytkLFlBQVQsQ0FBc0IvZCxHQUF0QixFQUEyQkMsS0FBM0IsRUFBa0NtQyxHQUFsQyxFQUF1QztBQUNuQztBQUNBLGdCQUFRbkMsS0FBSyxDQUFDakMsT0FBZDtBQUNJLGVBQUssT0FBTDtBQUNBLGVBQUssUUFBTDtBQUNBLGVBQUssUUFBTDtBQUNBLGVBQUssU0FBTDtBQUNBLGVBQUssVUFBTDtBQUFpQmdDLFlBQUFBLEdBQUcsQ0FDZiw0QkFEZSxFQUNlb0MsR0FEZixDQUFILENBRVIsVUFGUSxFQUVJeWIsT0FBTyxDQUFDNWQsS0FBRCxFQUFRLGFBQVIsQ0FGWDtBQUdiOztBQUNKLGVBQUssT0FBTDtBQUNBLGVBQUssUUFBTDtBQUNBLGVBQUssUUFBTDtBQUNBLGVBQUssU0FBTDtBQUNBLGVBQUssVUFBTDtBQUFpQkQsWUFBQUEsR0FBRyxDQUNmLDRCQURlLEVBQ2VvQyxHQURmLENBQUgsQ0FDdUI7QUFEdkIsYUFFUixVQUZRLEVBRUl5YixPQUFPLENBQUM1ZCxLQUFELEVBQVEsa0JBQVIsQ0FGWDtBQUdiOztBQUNKLGVBQUssTUFBTDtBQUFhRCxZQUFBQSxHQUFHLENBQ1gsMkJBRFcsRUFDa0JvQyxHQURsQixDQUFILENBRUosVUFGSSxFQUVReWIsT0FBTyxDQUFDNWQsS0FBRCxFQUFRLGFBQVIsQ0FGZjtBQUdUO0FBcEJSOztBQXNCQSxlQUFPRCxHQUFQO0FBQ0E7QUFDSDtBQUVEOzs7Ozs7O0FBS0EsZUFBUzZHLFFBQVQsQ0FBa0JuRyxLQUFsQixFQUF5QjtBQUNyQjtBQUVBLFlBQUlWLEdBQUcsR0FBR2pRLElBQUksQ0FBQ21ELE9BQUwsQ0FBYSxDQUFDLEdBQUQsQ0FBYixFQUFvQndOLEtBQUssQ0FBQ3BSLElBQU4sR0FBYSxTQUFqQyxFQUNULHFDQURTLEVBRUwsVUFGSyxFQUVPLGlCQUZQLENBQVY7QUFHQSxZQUFJNE8sTUFBTSxHQUFHd0MsS0FBSyxDQUFDOFksV0FBbkI7QUFBQSxZQUNJd0UsY0FBYyxHQUFHLEVBRHJCO0FBRUEsWUFBSTlmLE1BQU0sQ0FBQ3pOLE1BQVgsRUFBbUJ1UCxHQUFHLENBQ3JCLFVBRHFCLENBQUg7O0FBR25CLGFBQUssSUFBSW5PLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDO0FBQUc7QUFBa0I2TyxRQUFBQSxLQUFLLENBQUNDLFdBQU4sQ0FBa0JsUSxNQUF4RCxFQUFnRSxFQUFFb0IsQ0FBbEUsRUFBcUU7QUFDakUsY0FBSW9PLEtBQUssR0FBR1MsS0FBSyxDQUFDbUIsWUFBTixDQUFtQmhRLENBQW5CLEVBQXNCZCxPQUF0QixFQUFaO0FBQUEsY0FDSXFSLEdBQUcsR0FBSyxNQUFNclMsSUFBSSxDQUFDNlEsUUFBTCxDQUFjWCxLQUFLLENBQUMzUSxJQUFwQixDQURsQjs7QUFHQSxjQUFJMlEsS0FBSyxDQUFDNEMsUUFBVixFQUFvQjdDLEdBQUcsQ0FDdEIscUNBRHNCLEVBQ2lCb0MsR0FEakIsRUFDc0JuQyxLQUFLLENBQUMzUSxJQUQ1QixDQUFILENBSjZDLENBS1A7QUFFMUQ7O0FBQ0EsY0FBSTJRLEtBQUssQ0FBQ1ksR0FBVixFQUFlO0FBQUViLFlBQUFBLEdBQUcsQ0FDZix3QkFEZSxFQUNXb0MsR0FEWCxDQUFILENBRVIsVUFGUSxFQUVJeWIsT0FBTyxDQUFDNWQsS0FBRCxFQUFRLFFBQVIsQ0FGWCxFQUdaLHVCQUhZLEVBR2FtQyxHQUhiLEVBSVosOEJBSlk7QUFLVDJiLFlBQUFBLFlBQVksQ0FBQy9kLEdBQUQsRUFBTUMsS0FBTixFQUFhLE1BQWIsQ0FBWjtBQUNBNmQsWUFBQUEsY0FBYyxDQUFDOWQsR0FBRCxFQUFNQyxLQUFOLEVBQWFwTyxDQUFiLEVBQWdCdVEsR0FBRyxHQUFHLFFBQXRCLENBQWQsQ0FDSCxHQURHLEVBTk8sQ0FTZjtBQUNDLFdBVkQsTUFVTyxJQUFJbkMsS0FBSyxDQUFDSSxRQUFWLEVBQW9CO0FBQUVMLFlBQUFBLEdBQUcsQ0FDM0Isd0JBRDJCLEVBQ0RvQyxHQURDLENBQUgsQ0FFcEIsVUFGb0IsRUFFUnliLE9BQU8sQ0FBQzVkLEtBQUQsRUFBUSxPQUFSLENBRkMsRUFHeEIsK0JBSHdCLEVBR1NtQyxHQUhUO0FBSXJCMGIsWUFBQUEsY0FBYyxDQUFDOWQsR0FBRCxFQUFNQyxLQUFOLEVBQWFwTyxDQUFiLEVBQWdCdVEsR0FBRyxHQUFHLEtBQXRCLENBQWQsQ0FDSCxHQURHLEVBSm1CLENBTzNCO0FBQ0MsV0FSTSxNQVFBO0FBQ0gsZ0JBQUluQyxLQUFLLENBQUNvQixNQUFWLEVBQWtCO0FBQ2Qsa0JBQUk0YyxTQUFTLEdBQUdsdUIsSUFBSSxDQUFDNlEsUUFBTCxDQUFjWCxLQUFLLENBQUNvQixNQUFOLENBQWEvUixJQUEzQixDQUFoQjtBQUNBLGtCQUFJMHVCLGNBQWMsQ0FBQy9kLEtBQUssQ0FBQ29CLE1BQU4sQ0FBYS9SLElBQWQsQ0FBZCxLQUFzQyxDQUExQyxFQUE2QzBRLEdBQUcsQ0FDbkQsYUFEbUQsRUFDcENpZSxTQURvQyxDQUFILENBRTVDLFVBRjRDLEVBRWhDaGUsS0FBSyxDQUFDb0IsTUFBTixDQUFhL1IsSUFBYixHQUFvQixtQkFGWTtBQUc3QzB1QixjQUFBQSxjQUFjLENBQUMvZCxLQUFLLENBQUNvQixNQUFOLENBQWEvUixJQUFkLENBQWQsR0FBb0MsQ0FBcEM7QUFDQTBRLGNBQUFBLEdBQUcsQ0FDTixPQURNLEVBQ0dpZSxTQURILENBQUg7QUFFSDs7QUFDREgsWUFBQUEsY0FBYyxDQUFDOWQsR0FBRCxFQUFNQyxLQUFOLEVBQWFwTyxDQUFiLEVBQWdCdVEsR0FBaEIsQ0FBZDtBQUNIOztBQUNELGNBQUluQyxLQUFLLENBQUM0QyxRQUFWLEVBQW9CN0MsR0FBRyxDQUN0QixHQURzQixDQUFIO0FBRXZCOztBQUNELGVBQU9BLEdBQUcsQ0FDVCxhQURTLENBQVY7QUFFQTtBQUNIO0FBQ0EsS0FsTDJELEVBa0wxRDtBQUFDLFlBQUssRUFBTjtBQUFTLFlBQUs7QUFBZCxLQWxMMEQsQ0F2dlByQztBQXk2UEYsUUFBRyxDQUFDLFVBQVM5UCxPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDekQ7QUFFQTs7Ozs7O0FBS0EsVUFBSTBYLFFBQVEsR0FBRzFYLE9BQWY7O0FBRUEsVUFBSXlYLE9BQU8sR0FBR2hYLE9BQU8sQ0FBQyxFQUFELENBQXJCO0FBRUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7O0FBVUE7Ozs7OztBQU9BOzs7QUFDQWlYLE1BQUFBLFFBQVEsQ0FBQyxzQkFBRCxDQUFSLEdBQW1DO0FBRS9CMUcsUUFBQUEsVUFBVSxFQUFFLG9CQUFTK0gsTUFBVCxFQUFpQjtBQUV6QjtBQUNBLGNBQUlBLE1BQU0sSUFBSUEsTUFBTSxDQUFDLE9BQUQsQ0FBcEIsRUFBK0I7QUFDM0IsZ0JBQUlqTCxJQUFJLEdBQUcsS0FBSzhNLE1BQUwsQ0FBWTdCLE1BQU0sQ0FBQyxPQUFELENBQWxCLENBQVg7QUFDQTs7QUFDQSxnQkFBSWpMLElBQUosRUFBVTtBQUNOO0FBQ0Esa0JBQUlELFFBQVEsR0FBR2tMLE1BQU0sQ0FBQyxPQUFELENBQU4sQ0FBZ0JoWCxNQUFoQixDQUF1QixDQUF2QixNQUE4QixHQUE5QixHQUNYZ1gsTUFBTSxDQUFDLE9BQUQsQ0FBTixDQUFnQjBWLE1BQWhCLENBQXVCLENBQXZCLENBRFcsR0FDaUIxVixNQUFNLENBQUMsT0FBRCxDQUR0QyxDQUZNLENBSU47O0FBQ0EscUJBQU8sS0FBS3pGLE1BQUwsQ0FBWTtBQUNmekYsZ0JBQUFBLFFBQVEsRUFBRSxNQUFNQSxRQUREO0FBRWY3SSxnQkFBQUEsS0FBSyxFQUFFOEksSUFBSSxDQUFDekwsTUFBTCxDQUFZeUwsSUFBSSxDQUFDa0QsVUFBTCxDQUFnQitILE1BQWhCLENBQVosRUFBcUM4TCxNQUFyQztBQUZRLGVBQVosQ0FBUDtBQUlIO0FBQ0o7O0FBRUQsaUJBQU8sS0FBSzdULFVBQUwsQ0FBZ0IrSCxNQUFoQixDQUFQO0FBQ0gsU0FyQjhCO0FBdUIvQnpILFFBQUFBLFFBQVEsRUFBRSxrQkFBUzJELE9BQVQsRUFBa0I3TyxPQUFsQixFQUEyQjtBQUVqQztBQUNBLGNBQUlBLE9BQU8sSUFBSUEsT0FBTyxDQUFDb0gsSUFBbkIsSUFBMkJ5SCxPQUFPLENBQUNwSCxRQUFuQyxJQUErQ29ILE9BQU8sQ0FBQ2pRLEtBQTNELEVBQWtFO0FBQzlEO0FBQ0EsZ0JBQUluRixJQUFJLEdBQUdvVixPQUFPLENBQUNwSCxRQUFSLENBQWlCeVEsU0FBakIsQ0FBMkJySixPQUFPLENBQUNwSCxRQUFSLENBQWlCdVgsV0FBakIsQ0FBNkIsR0FBN0IsSUFBb0MsQ0FBL0QsQ0FBWDtBQUNBLGdCQUFJdFgsSUFBSSxHQUFHLEtBQUs4TSxNQUFMLENBQVkvYSxJQUFaLENBQVg7QUFDQTs7QUFDQSxnQkFBSWlPLElBQUosRUFDSW1ILE9BQU8sR0FBR25ILElBQUksQ0FBQzFLLE1BQUwsQ0FBWTZSLE9BQU8sQ0FBQ2pRLEtBQXBCLENBQVY7QUFDUCxXQVZnQyxDQVlqQzs7O0FBQ0EsY0FBSSxFQUFFaVEsT0FBTyxZQUFZLEtBQUtrQixJQUExQixLQUFtQ2xCLE9BQU8sWUFBWXdDLE9BQTFELEVBQW1FO0FBQy9ELGdCQUFJc0IsTUFBTSxHQUFHOUQsT0FBTyxDQUFDd0QsS0FBUixDQUFjbkgsUUFBZCxDQUF1QjJELE9BQXZCLEVBQWdDN08sT0FBaEMsQ0FBYjtBQUNBMlMsWUFBQUEsTUFBTSxDQUFDLE9BQUQsQ0FBTixHQUFrQjlELE9BQU8sQ0FBQ3dELEtBQVIsQ0FBYzNILFFBQWhDO0FBQ0EsbUJBQU9pSSxNQUFQO0FBQ0g7O0FBRUQsaUJBQU8sS0FBS3pILFFBQUwsQ0FBYzJELE9BQWQsRUFBdUI3TyxPQUF2QixDQUFQO0FBQ0g7QUEzQzhCLE9BQW5DO0FBOENDLEtBckZ1QixFQXFGdEI7QUFBQyxZQUFLO0FBQU4sS0FyRnNCLENBejZQRDtBQTgvUFYsUUFBRyxDQUFDLFVBQVMzRixPQUFULEVBQWlCRCxNQUFqQixFQUF3QlIsT0FBeEIsRUFBZ0M7QUFDakQ7O0FBQ0FRLE1BQUFBLE1BQU0sQ0FBQ1IsT0FBUCxHQUFpQjJYLE1BQWpCOztBQUVBLFVBQUlyWCxJQUFJLEdBQVFHLE9BQU8sQ0FBQyxFQUFELENBQXZCOztBQUVBLFVBQUltWCxZQUFKLENBTmlELENBTS9COztBQUVsQixVQUFJMEosUUFBUSxHQUFJaGhCLElBQUksQ0FBQ2doQixRQUFyQjtBQUFBLFVBQ0kzZixNQUFNLEdBQU1yQixJQUFJLENBQUNxQixNQURyQjtBQUFBLFVBRUlrTCxJQUFJLEdBQVF2TSxJQUFJLENBQUN1TSxJQUZyQjtBQUlBOzs7Ozs7Ozs7O0FBU0EsZUFBUzZoQixFQUFULENBQVkvdEIsRUFBWixFQUFnQm9NLEdBQWhCLEVBQXFCcEUsR0FBckIsRUFBMEI7QUFFdEI7Ozs7QUFJQSxhQUFLaEksRUFBTCxHQUFVQSxFQUFWO0FBRUE7Ozs7O0FBSUEsYUFBS29NLEdBQUwsR0FBV0EsR0FBWDtBQUVBOzs7OztBQUlBLGFBQUsrUCxJQUFMLEdBQVl2ZCxTQUFaO0FBRUE7Ozs7O0FBSUEsYUFBS29KLEdBQUwsR0FBV0EsR0FBWCxDQXhCc0IsQ0F3Qk47QUFDbkI7QUFFRDs7O0FBQ0EsZUFBU2dtQixJQUFULEdBQWdCLENBQUUsQ0FqRCtCLENBaUQ5Qjs7QUFFbkI7Ozs7Ozs7Ozs7QUFRQSxlQUFTQyxLQUFULENBQWVsVyxNQUFmLEVBQXVCO0FBRW5COzs7O0FBSUEsYUFBS3dFLElBQUwsR0FBWXhFLE1BQU0sQ0FBQ3dFLElBQW5CO0FBRUE7Ozs7O0FBSUEsYUFBSzJSLElBQUwsR0FBWW5XLE1BQU0sQ0FBQ21XLElBQW5CO0FBRUE7Ozs7O0FBSUEsYUFBSzloQixHQUFMLEdBQVcyTCxNQUFNLENBQUMzTCxHQUFsQjtBQUVBOzs7OztBQUlBLGFBQUsrUCxJQUFMLEdBQVlwRSxNQUFNLENBQUNvVyxNQUFuQjtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQSxlQUFTblgsTUFBVCxHQUFrQjtBQUVkOzs7O0FBSUEsYUFBSzVLLEdBQUwsR0FBVyxDQUFYO0FBRUE7Ozs7O0FBSUEsYUFBS21RLElBQUwsR0FBWSxJQUFJd1IsRUFBSixDQUFPQyxJQUFQLEVBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFaO0FBRUE7Ozs7O0FBSUEsYUFBS0UsSUFBTCxHQUFZLEtBQUszUixJQUFqQjtBQUVBOzs7OztBQUlBLGFBQUs0UixNQUFMLEdBQWMsSUFBZCxDQXhCYyxDQTBCZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFFRDs7Ozs7OztBQUtBblgsTUFBQUEsTUFBTSxDQUFDckUsTUFBUCxHQUFnQmhULElBQUksQ0FBQ3NoQixNQUFMLEdBQ1YsU0FBU0MsbUJBQVQsR0FBK0I7QUFDN0IsZUFBTyxDQUFDbEssTUFBTSxDQUFDckUsTUFBUCxHQUFnQixTQUFTd08sYUFBVCxHQUF5QjtBQUM3QyxpQkFBTyxJQUFJbEssWUFBSixFQUFQO0FBQ0gsU0FGTSxHQUFQO0FBR0g7QUFDRDtBQU5ZLFFBT1YsU0FBUzhKLFlBQVQsR0FBd0I7QUFDdEIsZUFBTyxJQUFJL0osTUFBSixFQUFQO0FBQ0gsT0FUTDtBQVdBOzs7Ozs7QUFLQUEsTUFBQUEsTUFBTSxDQUFDcEwsS0FBUCxHQUFlLFNBQVNBLEtBQVQsQ0FBZUMsSUFBZixFQUFxQjtBQUNoQyxlQUFPLElBQUlsTSxJQUFJLENBQUNRLEtBQVQsQ0FBZTBMLElBQWYsQ0FBUDtBQUNILE9BRkQsQ0FqSmlELENBcUpqRDs7QUFDQTs7O0FBQ0EsVUFBSWxNLElBQUksQ0FBQ1EsS0FBTCxLQUFlQSxLQUFuQixFQUNJNlcsTUFBTSxDQUFDcEwsS0FBUCxHQUFlak0sSUFBSSxDQUFDZ00sSUFBTCxDQUFVcUwsTUFBTSxDQUFDcEwsS0FBakIsRUFBd0JqTSxJQUFJLENBQUNRLEtBQUwsQ0FBVzBFLFNBQVgsQ0FBcUJ5YyxRQUE3QyxDQUFmO0FBRUo7Ozs7Ozs7OztBQVFBdEssTUFBQUEsTUFBTSxDQUFDblMsU0FBUCxDQUFpQnVwQixLQUFqQixHQUF5QixTQUFTanNCLElBQVQsQ0FBY25DLEVBQWQsRUFBa0JvTSxHQUFsQixFQUF1QnBFLEdBQXZCLEVBQTRCO0FBQ2pELGFBQUtrbUIsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVS9SLElBQVYsR0FBaUIsSUFBSTRSLEVBQUosQ0FBTy90QixFQUFQLEVBQVdvTSxHQUFYLEVBQWdCcEUsR0FBaEIsQ0FBN0I7QUFDQSxhQUFLb0UsR0FBTCxJQUFZQSxHQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsT0FKRDs7QUFNQSxlQUFTaWlCLFNBQVQsQ0FBbUJybUIsR0FBbkIsRUFBd0JDLEdBQXhCLEVBQTZCQyxHQUE3QixFQUFrQztBQUM5QkQsUUFBQUEsR0FBRyxDQUFDQyxHQUFELENBQUgsR0FBV0YsR0FBRyxHQUFHLEdBQWpCO0FBQ0g7O0FBRUQsZUFBU3NtQixhQUFULENBQXVCdG1CLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDbEMsZUFBT0YsR0FBRyxHQUFHLEdBQWIsRUFBa0I7QUFDZEMsVUFBQUEsR0FBRyxDQUFDQyxHQUFHLEVBQUosQ0FBSCxHQUFhRixHQUFHLEdBQUcsR0FBTixHQUFZLEdBQXpCO0FBQ0FBLFVBQUFBLEdBQUcsTUFBTSxDQUFUO0FBQ0g7O0FBQ0RDLFFBQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQVdGLEdBQVg7QUFDSDtBQUVEOzs7Ozs7Ozs7OztBQVNBLGVBQVN1bUIsUUFBVCxDQUFrQm5pQixHQUFsQixFQUF1QnBFLEdBQXZCLEVBQTRCO0FBQ3hCLGFBQUtvRSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxhQUFLK1AsSUFBTCxHQUFZdmQsU0FBWjtBQUNBLGFBQUtvSixHQUFMLEdBQVdBLEdBQVg7QUFDSDs7QUFFRHVtQixNQUFBQSxRQUFRLENBQUMxcEIsU0FBVCxHQUFxQm5CLE1BQU0sQ0FBQ2lQLE1BQVAsQ0FBY29iLEVBQUUsQ0FBQ2xwQixTQUFqQixDQUFyQjtBQUNBMHBCLE1BQUFBLFFBQVEsQ0FBQzFwQixTQUFULENBQW1CN0UsRUFBbkIsR0FBd0JzdUIsYUFBeEI7QUFFQTs7Ozs7O0FBS0F0WCxNQUFBQSxNQUFNLENBQUNuUyxTQUFQLENBQWlCMGMsTUFBakIsR0FBMEIsU0FBU2lOLFlBQVQsQ0FBc0JucUIsS0FBdEIsRUFBNkI7QUFDbkQ7QUFDQTtBQUNBLGFBQUsrSCxHQUFMLElBQVksQ0FBQyxLQUFLOGhCLElBQUwsR0FBWSxLQUFLQSxJQUFMLENBQVUvUixJQUFWLEdBQWlCLElBQUlvUyxRQUFKLENBQ3RDLENBQUNscUIsS0FBSyxHQUFHQSxLQUFLLEtBQUssQ0FBbkIsSUFDVSxHQURWLEdBQ3NCLENBRHRCLEdBRUVBLEtBQUssR0FBRyxLQUFSLEdBQW9CLENBQXBCLEdBQ0FBLEtBQUssR0FBRyxPQUFSLEdBQW9CLENBQXBCLEdBQ0FBLEtBQUssR0FBRyxTQUFSLEdBQW9CLENBQXBCLEdBQ29CLENBTmdCLEVBTzFDQSxLQVAwQyxDQUE5QixFQU9KK0gsR0FQUjtBQVFBLGVBQU8sSUFBUDtBQUNILE9BWkQ7QUFjQTs7Ozs7Ozs7QUFNQTRLLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUI2YyxLQUFqQixHQUF5QixTQUFTK00sV0FBVCxDQUFxQnBxQixLQUFyQixFQUE0QjtBQUNqRCxlQUFPQSxLQUFLLEdBQUcsQ0FBUixHQUNELEtBQUsrcEIsS0FBTCxDQUFXTSxhQUFYLEVBQTBCLEVBQTFCLEVBQThCL04sUUFBUSxDQUFDeEwsVUFBVCxDQUFvQjlRLEtBQXBCLENBQTlCLENBREMsQ0FDeUQ7QUFEekQsVUFFRCxLQUFLa2QsTUFBTCxDQUFZbGQsS0FBWixDQUZOO0FBR0gsT0FKRDtBQU1BOzs7Ozs7O0FBS0EyUyxNQUFBQSxNQUFNLENBQUNuUyxTQUFQLENBQWlCK2MsTUFBakIsR0FBMEIsU0FBUytNLFlBQVQsQ0FBc0J0cUIsS0FBdEIsRUFBNkI7QUFDbkQsZUFBTyxLQUFLa2QsTUFBTCxDQUFZLENBQUNsZCxLQUFLLElBQUksQ0FBVCxHQUFhQSxLQUFLLElBQUksRUFBdkIsTUFBK0IsQ0FBM0MsQ0FBUDtBQUNILE9BRkQ7O0FBSUEsZUFBU3FxQixhQUFULENBQXVCMW1CLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDbEMsZUFBT0YsR0FBRyxDQUFDNEMsRUFBWCxFQUFlO0FBQ1gzQyxVQUFBQSxHQUFHLENBQUNDLEdBQUcsRUFBSixDQUFILEdBQWFGLEdBQUcsQ0FBQzJDLEVBQUosR0FBUyxHQUFULEdBQWUsR0FBNUI7QUFDQTNDLFVBQUFBLEdBQUcsQ0FBQzJDLEVBQUosR0FBUyxDQUFDM0MsR0FBRyxDQUFDMkMsRUFBSixLQUFXLENBQVgsR0FBZTNDLEdBQUcsQ0FBQzRDLEVBQUosSUFBVSxFQUExQixNQUFrQyxDQUEzQztBQUNBNUMsVUFBQUEsR0FBRyxDQUFDNEMsRUFBSixNQUFZLENBQVo7QUFDSDs7QUFDRCxlQUFPNUMsR0FBRyxDQUFDMkMsRUFBSixHQUFTLEdBQWhCLEVBQXFCO0FBQ2pCMUMsVUFBQUEsR0FBRyxDQUFDQyxHQUFHLEVBQUosQ0FBSCxHQUFhRixHQUFHLENBQUMyQyxFQUFKLEdBQVMsR0FBVCxHQUFlLEdBQTVCO0FBQ0EzQyxVQUFBQSxHQUFHLENBQUMyQyxFQUFKLEdBQVMzQyxHQUFHLENBQUMyQyxFQUFKLEtBQVcsQ0FBcEI7QUFDSDs7QUFDRDFDLFFBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxFQUFKLENBQUgsR0FBYUYsR0FBRyxDQUFDMkMsRUFBakI7QUFDSDtBQUVEOzs7Ozs7OztBQU1BcU0sTUFBQUEsTUFBTSxDQUFDblMsU0FBUCxDQUFpQm9lLE1BQWpCLEdBQTBCLFNBQVMyTCxZQUFULENBQXNCdnFCLEtBQXRCLEVBQTZCO0FBQ25ELFlBQUkwZCxJQUFJLEdBQUdwQixRQUFRLENBQUNvSyxJQUFULENBQWMxbUIsS0FBZCxDQUFYO0FBQ0EsZUFBTyxLQUFLK3BCLEtBQUwsQ0FBV00sYUFBWCxFQUEwQjNNLElBQUksQ0FBQzFoQixNQUFMLEVBQTFCLEVBQXlDMGhCLElBQXpDLENBQVA7QUFDSCxPQUhEO0FBS0E7Ozs7Ozs7OztBQU9BL0ssTUFBQUEsTUFBTSxDQUFDblMsU0FBUCxDQUFpQmtlLEtBQWpCLEdBQXlCL0wsTUFBTSxDQUFDblMsU0FBUCxDQUFpQm9lLE1BQTFDO0FBRUE7Ozs7Ozs7QUFNQWpNLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUJzZSxNQUFqQixHQUEwQixTQUFTMEwsWUFBVCxDQUFzQnhxQixLQUF0QixFQUE2QjtBQUNuRCxZQUFJMGQsSUFBSSxHQUFHcEIsUUFBUSxDQUFDb0ssSUFBVCxDQUFjMW1CLEtBQWQsRUFBcUJ3bUIsUUFBckIsRUFBWDtBQUNBLGVBQU8sS0FBS3VELEtBQUwsQ0FBV00sYUFBWCxFQUEwQjNNLElBQUksQ0FBQzFoQixNQUFMLEVBQTFCLEVBQXlDMGhCLElBQXpDLENBQVA7QUFDSCxPQUhEO0FBS0E7Ozs7Ozs7QUFLQS9LLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUJtZCxJQUFqQixHQUF3QixTQUFTOE0sVUFBVCxDQUFvQnpxQixLQUFwQixFQUEyQjtBQUMvQyxlQUFPLEtBQUsrcEIsS0FBTCxDQUFXQyxTQUFYLEVBQXNCLENBQXRCLEVBQXlCaHFCLEtBQUssR0FBRyxDQUFILEdBQU8sQ0FBckMsQ0FBUDtBQUNILE9BRkQ7O0FBSUEsZUFBUzBxQixZQUFULENBQXNCL21CLEdBQXRCLEVBQTJCQyxHQUEzQixFQUFnQ0MsR0FBaEMsRUFBcUM7QUFDakNELFFBQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQWdCRixHQUFHLEdBQVcsR0FBOUI7QUFDQUMsUUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWdCRixHQUFHLEtBQUssQ0FBUixHQUFjLEdBQTlCO0FBQ0FDLFFBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFnQkYsR0FBRyxLQUFLLEVBQVIsR0FBYyxHQUE5QjtBQUNBQyxRQUFBQSxHQUFHLENBQUNDLEdBQUcsR0FBRyxDQUFQLENBQUgsR0FBZ0JGLEdBQUcsS0FBSyxFQUF4QjtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQWdQLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUJzZCxPQUFqQixHQUEyQixTQUFTNk0sYUFBVCxDQUF1QjNxQixLQUF2QixFQUE4QjtBQUNyRCxlQUFPLEtBQUsrcEIsS0FBTCxDQUFXVyxZQUFYLEVBQXlCLENBQXpCLEVBQTRCMXFCLEtBQUssS0FBSyxDQUF0QyxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7OztBQU1BMlMsTUFBQUEsTUFBTSxDQUFDblMsU0FBUCxDQUFpQndkLFFBQWpCLEdBQTRCckwsTUFBTSxDQUFDblMsU0FBUCxDQUFpQnNkLE9BQTdDO0FBRUE7Ozs7Ozs7QUFNQW5MLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUJ5ZSxPQUFqQixHQUEyQixTQUFTMkwsYUFBVCxDQUF1QjVxQixLQUF2QixFQUE4QjtBQUNyRCxZQUFJMGQsSUFBSSxHQUFHcEIsUUFBUSxDQUFDb0ssSUFBVCxDQUFjMW1CLEtBQWQsQ0FBWDtBQUNBLGVBQU8sS0FBSytwQixLQUFMLENBQVdXLFlBQVgsRUFBeUIsQ0FBekIsRUFBNEJoTixJQUFJLENBQUNwWCxFQUFqQyxFQUFxQ3lqQixLQUFyQyxDQUEyQ1csWUFBM0MsRUFBeUQsQ0FBekQsRUFBNERoTixJQUFJLENBQUNuWCxFQUFqRSxDQUFQO0FBQ0gsT0FIRDtBQUtBOzs7Ozs7Ozs7QUFPQW9NLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUIyZSxRQUFqQixHQUE0QnhNLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUJ5ZSxPQUE3QztBQUVBOzs7Ozs7O0FBTUF0TSxNQUFBQSxNQUFNLENBQUNuUyxTQUFQLFlBQXlCLFNBQVNxcUIsV0FBVCxDQUFxQjdxQixLQUFyQixFQUE0QjtBQUNqRCxlQUFPLEtBQUsrcEIsS0FBTCxDQUFXenVCLElBQUksU0FBSixDQUFXeUksWUFBdEIsRUFBb0MsQ0FBcEMsRUFBdUMvRCxLQUF2QyxDQUFQO0FBQ0gsT0FGRDtBQUlBOzs7Ozs7OztBQU1BMlMsTUFBQUEsTUFBTSxDQUFDblMsU0FBUCxhQUEwQixTQUFTc3FCLFlBQVQsQ0FBc0I5cUIsS0FBdEIsRUFBNkI7QUFDbkQsZUFBTyxLQUFLK3BCLEtBQUwsQ0FBV3p1QixJQUFJLFNBQUosQ0FBV3NLLGFBQXRCLEVBQXFDLENBQXJDLEVBQXdDNUYsS0FBeEMsQ0FBUDtBQUNILE9BRkQ7O0FBSUEsVUFBSStxQixVQUFVLEdBQUd6dkIsSUFBSSxDQUFDUSxLQUFMLENBQVcwRSxTQUFYLENBQXFCdVcsR0FBckIsR0FDWCxTQUFTaVUsY0FBVCxDQUF3QnJuQixHQUF4QixFQUE2QkMsR0FBN0IsRUFBa0NDLEdBQWxDLEVBQXVDO0FBQ3JDRCxRQUFBQSxHQUFHLENBQUNtVCxHQUFKLENBQVFwVCxHQUFSLEVBQWFFLEdBQWIsRUFEcUMsQ0FDbEI7QUFDdEI7QUFDRDtBQUphLFFBS1gsU0FBU29uQixjQUFULENBQXdCdG5CLEdBQXhCLEVBQTZCQyxHQUE3QixFQUFrQ0MsR0FBbEMsRUFBdUM7QUFDckMsYUFBSyxJQUFJekcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3VHLEdBQUcsQ0FBQzNILE1BQXhCLEVBQWdDLEVBQUVvQixDQUFsQztBQUNJd0csVUFBQUEsR0FBRyxDQUFDQyxHQUFHLEdBQUd6RyxDQUFQLENBQUgsR0FBZXVHLEdBQUcsQ0FBQ3ZHLENBQUQsQ0FBbEI7QUFESjtBQUVILE9BUkw7QUFVQTs7Ozs7O0FBS0F1VixNQUFBQSxNQUFNLENBQUNuUyxTQUFQLENBQWlCME0sS0FBakIsR0FBeUIsU0FBU2dlLFdBQVQsQ0FBcUJsckIsS0FBckIsRUFBNEI7QUFDakQsWUFBSStILEdBQUcsR0FBRy9ILEtBQUssQ0FBQ2hFLE1BQU4sS0FBaUIsQ0FBM0I7QUFDQSxZQUFJLENBQUMrTCxHQUFMLEVBQ0ksT0FBTyxLQUFLZ2lCLEtBQUwsQ0FBV0MsU0FBWCxFQUFzQixDQUF0QixFQUF5QixDQUF6QixDQUFQOztBQUNKLFlBQUkxdUIsSUFBSSxDQUFDK1QsUUFBTCxDQUFjclAsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLGNBQUk0RCxHQUFHLEdBQUcrTyxNQUFNLENBQUNwTCxLQUFQLENBQWFRLEdBQUcsR0FBR3BMLE1BQU0sQ0FBQ1gsTUFBUCxDQUFjZ0UsS0FBZCxDQUFuQixDQUFWO0FBQ0FyRCxVQUFBQSxNQUFNLENBQUN5QixNQUFQLENBQWM0QixLQUFkLEVBQXFCNEQsR0FBckIsRUFBMEIsQ0FBMUI7QUFDQTVELFVBQUFBLEtBQUssR0FBRzRELEdBQVI7QUFDSDs7QUFDRCxlQUFPLEtBQUtzWixNQUFMLENBQVluVixHQUFaLEVBQWlCZ2lCLEtBQWpCLENBQXVCZ0IsVUFBdkIsRUFBbUNoakIsR0FBbkMsRUFBd0MvSCxLQUF4QyxDQUFQO0FBQ0gsT0FWRDtBQVlBOzs7Ozs7O0FBS0EyUyxNQUFBQSxNQUFNLENBQUNuUyxTQUFQLENBQWlCNUQsTUFBakIsR0FBMEIsU0FBU3V1QixZQUFULENBQXNCbnJCLEtBQXRCLEVBQTZCO0FBQ25ELFlBQUkrSCxHQUFHLEdBQUdGLElBQUksQ0FBQzdMLE1BQUwsQ0FBWWdFLEtBQVosQ0FBVjtBQUNBLGVBQU8rSCxHQUFHLEdBQ0osS0FBS21WLE1BQUwsQ0FBWW5WLEdBQVosRUFBaUJnaUIsS0FBakIsQ0FBdUJsaUIsSUFBSSxDQUFDSyxLQUE1QixFQUFtQ0gsR0FBbkMsRUFBd0MvSCxLQUF4QyxDQURJLEdBRUosS0FBSytwQixLQUFMLENBQVdDLFNBQVgsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FGTjtBQUdILE9BTEQ7QUFPQTs7Ozs7OztBQUtBclgsTUFBQUEsTUFBTSxDQUFDblMsU0FBUCxDQUFpQjhrQixJQUFqQixHQUF3QixTQUFTQSxJQUFULEdBQWdCO0FBQ3BDLGFBQUt3RSxNQUFMLEdBQWMsSUFBSUYsS0FBSixDQUFVLElBQVYsQ0FBZDtBQUNBLGFBQUsxUixJQUFMLEdBQVksS0FBSzJSLElBQUwsR0FBWSxJQUFJSCxFQUFKLENBQU9DLElBQVAsRUFBYSxDQUFiLEVBQWdCLENBQWhCLENBQXhCO0FBQ0EsYUFBSzVoQixHQUFMLEdBQVcsQ0FBWDtBQUNBLGVBQU8sSUFBUDtBQUNILE9BTEQ7QUFPQTs7Ozs7O0FBSUE0SyxNQUFBQSxNQUFNLENBQUNuUyxTQUFQLENBQWlCNHFCLEtBQWpCLEdBQXlCLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEMsWUFBSSxLQUFLdEIsTUFBVCxFQUFpQjtBQUNiLGVBQUs1UixJQUFMLEdBQWMsS0FBSzRSLE1BQUwsQ0FBWTVSLElBQTFCO0FBQ0EsZUFBSzJSLElBQUwsR0FBYyxLQUFLQyxNQUFMLENBQVlELElBQTFCO0FBQ0EsZUFBSzloQixHQUFMLEdBQWMsS0FBSytoQixNQUFMLENBQVkvaEIsR0FBMUI7QUFDQSxlQUFLK2hCLE1BQUwsR0FBYyxLQUFLQSxNQUFMLENBQVloUyxJQUExQjtBQUNILFNBTEQsTUFLTztBQUNILGVBQUtJLElBQUwsR0FBWSxLQUFLMlIsSUFBTCxHQUFZLElBQUlILEVBQUosQ0FBT0MsSUFBUCxFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBeEI7QUFDQSxlQUFLNWhCLEdBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBQ0QsZUFBTyxJQUFQO0FBQ0gsT0FYRDtBQWFBOzs7Ozs7QUFJQTRLLE1BQUFBLE1BQU0sQ0FBQ25TLFNBQVAsQ0FBaUIra0IsTUFBakIsR0FBMEIsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QyxZQUFJck4sSUFBSSxHQUFHLEtBQUtBLElBQWhCO0FBQUEsWUFDSTJSLElBQUksR0FBRyxLQUFLQSxJQURoQjtBQUFBLFlBRUk5aEIsR0FBRyxHQUFJLEtBQUtBLEdBRmhCO0FBR0EsYUFBS3FqQixLQUFMLEdBQWFsTyxNQUFiLENBQW9CblYsR0FBcEI7O0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZUFBSzhoQixJQUFMLENBQVUvUixJQUFWLEdBQWlCSSxJQUFJLENBQUNKLElBQXRCLENBREssQ0FDdUI7O0FBQzVCLGVBQUsrUixJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLOWhCLEdBQUwsSUFBWUEsR0FBWjtBQUNIOztBQUNELGVBQU8sSUFBUDtBQUNILE9BWEQ7QUFhQTs7Ozs7O0FBSUE0SyxNQUFBQSxNQUFNLENBQUNuUyxTQUFQLENBQWlCcWYsTUFBakIsR0FBMEIsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QyxZQUFJM0gsSUFBSSxHQUFHLEtBQUtBLElBQUwsQ0FBVUosSUFBckI7QUFBQSxZQUEyQjtBQUN2QmxVLFFBQUFBLEdBQUcsR0FBSSxLQUFLMkssV0FBTCxDQUFpQmhILEtBQWpCLENBQXVCLEtBQUtRLEdBQTVCLENBRFg7QUFBQSxZQUVJbEUsR0FBRyxHQUFJLENBRlg7O0FBR0EsZUFBT3FVLElBQVAsRUFBYTtBQUNUQSxVQUFBQSxJQUFJLENBQUN2YyxFQUFMLENBQVF1YyxJQUFJLENBQUN2VSxHQUFiLEVBQWtCQyxHQUFsQixFQUF1QkMsR0FBdkI7QUFDQUEsVUFBQUEsR0FBRyxJQUFJcVUsSUFBSSxDQUFDblEsR0FBWjtBQUNBbVEsVUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUNKLElBQVo7QUFDSCxTQVJ1QyxDQVN4Qzs7O0FBQ0EsZUFBT2xVLEdBQVA7QUFDSCxPQVhEOztBQWFBK08sTUFBQUEsTUFBTSxDQUFDZCxVQUFQLEdBQW9CLFVBQVN3WixhQUFULEVBQXdCO0FBQ3hDelksUUFBQUEsWUFBWSxHQUFHeVksYUFBZjtBQUNILE9BRkQ7QUFJQyxLQTdjZSxFQTZjZDtBQUFDLFlBQUs7QUFBTixLQTdjYyxDQTkvUE87QUEyOFFWLFFBQUcsQ0FBQyxVQUFTNXZCLE9BQVQsRUFBaUJELE1BQWpCLEVBQXdCUixPQUF4QixFQUFnQztBQUNqRDs7QUFDQVEsTUFBQUEsTUFBTSxDQUFDUixPQUFQLEdBQWlCNFgsWUFBakIsQ0FGaUQsQ0FJakQ7O0FBQ0EsVUFBSUQsTUFBTSxHQUFHbFgsT0FBTyxDQUFDLEVBQUQsQ0FBcEI7O0FBQ0EsT0FBQ21YLFlBQVksQ0FBQ3BTLFNBQWIsR0FBeUJuQixNQUFNLENBQUNpUCxNQUFQLENBQWNxRSxNQUFNLENBQUNuUyxTQUFyQixDQUExQixFQUEyRCtOLFdBQTNELEdBQXlFcUUsWUFBekU7O0FBRUEsVUFBSXRYLElBQUksR0FBR0csT0FBTyxDQUFDLEVBQUQsQ0FBbEI7O0FBRUEsVUFBSW1oQixNQUFNLEdBQUd0aEIsSUFBSSxDQUFDc2hCLE1BQWxCO0FBRUE7Ozs7Ozs7QUFNQSxlQUFTaEssWUFBVCxHQUF3QjtBQUNwQkQsUUFBQUEsTUFBTSxDQUFDNVgsSUFBUCxDQUFZLElBQVo7QUFDSDtBQUVEOzs7Ozs7O0FBS0E2WCxNQUFBQSxZQUFZLENBQUNyTCxLQUFiLEdBQXFCLFNBQVMrakIsWUFBVCxDQUFzQjlqQixJQUF0QixFQUE0QjtBQUM3QyxlQUFPLENBQUNvTCxZQUFZLENBQUNyTCxLQUFiLEdBQXFCak0sSUFBSSxDQUFDc3NCLG1CQUEzQixFQUFnRHBnQixJQUFoRCxDQUFQO0FBQ0gsT0FGRDs7QUFJQSxVQUFJK2pCLGdCQUFnQixHQUFHM08sTUFBTSxJQUFJQSxNQUFNLENBQUNwYyxTQUFQLFlBQTRCd0MsVUFBdEMsSUFBb0Q0WixNQUFNLENBQUNwYyxTQUFQLENBQWlCdVcsR0FBakIsQ0FBcUJsYyxJQUFyQixLQUE4QixLQUFsRixHQUNqQixTQUFTMndCLG9CQUFULENBQThCN25CLEdBQTlCLEVBQW1DQyxHQUFuQyxFQUF3Q0MsR0FBeEMsRUFBNkM7QUFDM0NELFFBQUFBLEdBQUcsQ0FBQ21ULEdBQUosQ0FBUXBULEdBQVIsRUFBYUUsR0FBYixFQUQyQyxDQUN4QjtBQUNBO0FBQ3RCO0FBQ0Q7QUFMbUIsUUFNakIsU0FBUzRuQixxQkFBVCxDQUErQjluQixHQUEvQixFQUFvQ0MsR0FBcEMsRUFBeUNDLEdBQXpDLEVBQThDO0FBQzVDLFlBQUlGLEdBQUcsQ0FBQytuQixJQUFSLEVBQWM7QUFDVi9uQixVQUFBQSxHQUFHLENBQUMrbkIsSUFBSixDQUFTOW5CLEdBQVQsRUFBY0MsR0FBZCxFQUFtQixDQUFuQixFQUFzQkYsR0FBRyxDQUFDM0gsTUFBMUIsRUFESixLQUVLLEtBQUssSUFBSW9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd1RyxHQUFHLENBQUMzSCxNQUF4QjtBQUFpQztBQUNsQzRILFVBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxFQUFKLENBQUgsR0FBYUYsR0FBRyxDQUFDdkcsQ0FBQyxFQUFGLENBQWhCO0FBREM7QUFFUixPQVhMO0FBYUE7Ozs7QUFHQXdWLE1BQUFBLFlBQVksQ0FBQ3BTLFNBQWIsQ0FBdUIwTSxLQUF2QixHQUErQixTQUFTeWUsa0JBQVQsQ0FBNEIzckIsS0FBNUIsRUFBbUM7QUFDOUQsWUFBSTFFLElBQUksQ0FBQytULFFBQUwsQ0FBY3JQLEtBQWQsQ0FBSixFQUNJQSxLQUFLLEdBQUcxRSxJQUFJLENBQUNxc0IsWUFBTCxDQUFrQjNuQixLQUFsQixFQUF5QixRQUF6QixDQUFSO0FBQ0osWUFBSStILEdBQUcsR0FBRy9ILEtBQUssQ0FBQ2hFLE1BQU4sS0FBaUIsQ0FBM0I7QUFDQSxhQUFLa2hCLE1BQUwsQ0FBWW5WLEdBQVo7QUFDQSxZQUFJQSxHQUFKLEVBQ0ksS0FBS2dpQixLQUFMLENBQVd3QixnQkFBWCxFQUE2QnhqQixHQUE3QixFQUFrQy9ILEtBQWxDO0FBQ0osZUFBTyxJQUFQO0FBQ0gsT0FSRDs7QUFVQSxlQUFTNHJCLGlCQUFULENBQTJCam9CLEdBQTNCLEVBQWdDQyxHQUFoQyxFQUFxQ0MsR0FBckMsRUFBMEM7QUFDdEMsWUFBSUYsR0FBRyxDQUFDM0gsTUFBSixHQUFhLEVBQWpCLEVBQXFCO0FBQ2pCVixVQUFBQSxJQUFJLENBQUN1TSxJQUFMLENBQVVLLEtBQVYsQ0FBZ0J2RSxHQUFoQixFQUFxQkMsR0FBckIsRUFBMEJDLEdBQTFCLEVBREosS0FHSUQsR0FBRyxDQUFDOGpCLFNBQUosQ0FBYy9qQixHQUFkLEVBQW1CRSxHQUFuQjtBQUNQO0FBRUQ7Ozs7O0FBR0ErTyxNQUFBQSxZQUFZLENBQUNwUyxTQUFiLENBQXVCNUQsTUFBdkIsR0FBZ0MsU0FBU2l2QixtQkFBVCxDQUE2QjdyQixLQUE3QixFQUFvQztBQUNoRSxZQUFJK0gsR0FBRyxHQUFHNlUsTUFBTSxDQUFDa1AsVUFBUCxDQUFrQjlyQixLQUFsQixDQUFWO0FBQ0EsYUFBS2tkLE1BQUwsQ0FBWW5WLEdBQVo7QUFDQSxZQUFJQSxHQUFKLEVBQ0ksS0FBS2dpQixLQUFMLENBQVc2QixpQkFBWCxFQUE4QjdqQixHQUE5QixFQUFtQy9ILEtBQW5DO0FBQ0osZUFBTyxJQUFQO0FBQ0gsT0FORDtBQVNBOzs7Ozs7O0FBT0MsS0FuRmUsRUFtRmQ7QUFBQyxZQUFLLEVBQU47QUFBUyxZQUFLO0FBQWQsS0FuRmM7QUEzOFFPLEdBL0JrQixFQTZqUm5CLEVBN2pSbUIsRUE2alJoQixDQUFDLEVBQUQsQ0E3alJnQjtBQStqUnhDLENBL2pSRCxFQStqUkcsT0FBTytyQixNQUFQLEtBQWdCLFFBQWhCLElBQTBCQSxNQUExQixJQUFrQyxPQUFPclYsSUFBUCxLQUFjLFFBQWQsSUFBd0JBLElBQTFELFVBL2pSSCxHQWdrUkEiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBwcm90b2J1Zi5qcyB2Ni44LjYgKGMpIDIwMTYsIGRhbmllbCB3aXJ0elxyXG4gKiBjb21waWxlZCBtb24sIDI2IGZlYiAyMDE4IDExOjM1OjM0IHV0Y1xyXG4gKiBsaWNlbnNlZCB1bmRlciB0aGUgYnNkLTMtY2xhdXNlIGxpY2Vuc2VcclxuICogc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNvZGVpby9wcm90b2J1Zi5qcyBmb3IgZGV0YWlsc1xyXG4gKi9cclxuKGZ1bmN0aW9uKGdsb2JhbCx1bmRlZmluZWQpe1widXNlIHN0cmljdFwiOyhmdW5jdGlvbiBwcmVsdWRlKG1vZHVsZXMsIGNhY2hlLCBlbnRyaWVzKSB7XHJcblxyXG4gICAgLy8gVGhpcyBpcyB0aGUgcHJlbHVkZSB1c2VkIHRvIGJ1bmRsZSBwcm90b2J1Zi5qcyBmb3IgdGhlIGJyb3dzZXIuIFdyYXBzIHVwIHRoZSBDb21tb25KU1xyXG4gICAgLy8gc291cmNlcyB0aHJvdWdoIGEgY29uZmxpY3QtZnJlZSByZXF1aXJlIHNoaW0gYW5kIGlzIGFnYWluIHdyYXBwZWQgd2l0aGluIGFuIGlpZmUgdGhhdFxyXG4gICAgLy8gcHJvdmlkZXMgYSB1bmlmaWVkIGBnbG9iYWxgIGFuZCBhIG1pbmlmaWNhdGlvbi1mcmllbmRseSBgdW5kZWZpbmVkYCB2YXIgcGx1cyBhIGdsb2JhbFxyXG4gICAgLy8gXCJ1c2Ugc3RyaWN0XCIgZGlyZWN0aXZlIHNvIHRoYXQgbWluaWZpY2F0aW9uIGNhbiByZW1vdmUgdGhlIGRpcmVjdGl2ZXMgb2YgZWFjaCBtb2R1bGUuXHJcblxyXG4gICAgZnVuY3Rpb24gJHJlcXVpcmUobmFtZSkge1xyXG4gICAgICAgIHZhciAkbW9kdWxlID0gY2FjaGVbbmFtZV07XHJcbiAgICAgICAgaWYgKCEkbW9kdWxlKVxyXG4gICAgICAgICAgICBtb2R1bGVzW25hbWVdWzBdLmNhbGwoJG1vZHVsZSA9IGNhY2hlW25hbWVdID0geyBleHBvcnRzOiB7fSB9LCAkcmVxdWlyZSwgJG1vZHVsZSwgJG1vZHVsZS5leHBvcnRzKTtcclxuICAgICAgICByZXR1cm4gJG1vZHVsZS5leHBvcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV4cG9zZSBnbG9iYWxseVxyXG4gICAgdmFyIHByb3RvYnVmID0gZ2xvYmFsLnByb3RvYnVmID0gJHJlcXVpcmUoZW50cmllc1swXSk7XHJcblxyXG4gICAgLy8gQmUgbmljZSB0byBBTURcclxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZClcclxuICAgICAgICBkZWZpbmUoW1wibG9uZ1wiXSwgZnVuY3Rpb24oTG9uZykge1xyXG4gICAgICAgICAgICBpZiAoTG9uZyAmJiBMb25nLmlzTG9uZykge1xyXG4gICAgICAgICAgICAgICAgcHJvdG9idWYudXRpbC5Mb25nID0gTG9uZztcclxuICAgICAgICAgICAgICAgIHByb3RvYnVmLmNvbmZpZ3VyZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm90b2J1ZjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBCZSBuaWNlIHRvIENvbW1vbkpTXHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpXHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBwcm90b2J1ZjtcclxuXHJcbn0pLyogZW5kIG9mIHByZWx1ZGUgKi8oezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBhc1Byb21pc2U7XHJcblxyXG4vKipcclxuICogQ2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5hc1Byb21pc2V9LlxyXG4gKiBAdHlwZWRlZiBhc1Byb21pc2VDYWxsYmFja1xyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueVxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBBZGRpdGlvbmFsIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcHJvbWlzZSBmcm9tIGEgbm9kZS1zdHlsZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHthc1Byb21pc2VDYWxsYmFja30gZm4gRnVuY3Rpb24gdG8gY2FsbFxyXG4gKiBAcGFyYW0geyp9IGN0eCBGdW5jdGlvbiBjb250ZXh0XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEZ1bmN0aW9uIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTwqPn0gUHJvbWlzaWZpZWQgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGFzUHJvbWlzZShmbiwgY3R4LyosIHZhcmFyZ3MgKi8pIHtcclxuICAgIHZhciBwYXJhbXMgID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICBvZmZzZXQgID0gMCxcclxuICAgICAgICBpbmRleCAgID0gMixcclxuICAgICAgICBwZW5kaW5nID0gdHJ1ZTtcclxuICAgIHdoaWxlIChpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGgpXHJcbiAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0XSA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVyci8qLCB2YXJhcmdzICovKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldCA8IHBhcmFtcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbb2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlLmFwcGx5KG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KGN0eCB8fCBudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWluaW1hbCBiYXNlNjQgaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciBiYXNlNjQgPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGJ5dGUgbGVuZ3RoIG9mIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxuYmFzZTY0Lmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBwID0gc3RyaW5nLmxlbmd0aDtcclxuICAgIGlmICghcClcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHZhciBuID0gMDtcclxuICAgIHdoaWxlICgtLXAgJSA0ID4gMSAmJiBzdHJpbmcuY2hhckF0KHApID09PSBcIj1cIilcclxuICAgICAgICArK247XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKHN0cmluZy5sZW5ndGggKiAzKSAvIDQgLSBuO1xyXG59O1xyXG5cclxuLy8gQmFzZTY0IGVuY29kaW5nIHRhYmxlXHJcbnZhciBiNjQgPSBuZXcgQXJyYXkoNjQpO1xyXG5cclxuLy8gQmFzZTY0IGRlY29kaW5nIHRhYmxlXHJcbnZhciBzNjQgPSBuZXcgQXJyYXkoMTIzKTtcclxuXHJcbi8vIDY1Li45MCwgOTcuLjEyMiwgNDguLjU3LCA0MywgNDdcclxuZm9yICh2YXIgaSA9IDA7IGkgPCA2NDspXHJcbiAgICBzNjRbYjY0W2ldID0gaSA8IDI2ID8gaSArIDY1IDogaSA8IDUyID8gaSArIDcxIDogaSA8IDYyID8gaSAtIDQgOiBpIC0gNTkgfCA0M10gPSBpKys7XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIGJ1ZmZlciB0byBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZy5cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU291cmNlIHN0YXJ0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgU291cmNlIGVuZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICovXHJcbmJhc2U2NC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgcGFydHMgPSBudWxsLFxyXG4gICAgICAgIGNodW5rID0gW107XHJcbiAgICB2YXIgaSA9IDAsIC8vIG91dHB1dCBpbmRleFxyXG4gICAgICAgIGogPSAwLCAvLyBnb3RvIGluZGV4XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICAgICAgdmFyIGIgPSBidWZmZXJbc3RhcnQrK107XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbYiA+PiAyXTtcclxuICAgICAgICAgICAgICAgIHQgPSAoYiAmIDMpIDw8IDQ7XHJcbiAgICAgICAgICAgICAgICBqID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W3QgfCBiID4+IDRdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMTUpIDw8IDI7XHJcbiAgICAgICAgICAgICAgICBqID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W3QgfCBiID4+IDZdO1xyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiICYgNjNdO1xyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqKSB7XHJcbiAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0XTtcclxuICAgICAgICBjaHVua1tpKytdID0gNjE7XHJcbiAgICAgICAgaWYgKGogPT09IDEpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG52YXIgaW52YWxpZEVuY29kaW5nID0gXCJpbnZhbGlkIGVuY29kaW5nXCI7XHJcblxyXG4vKipcclxuICogRGVjb2RlcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0byBhIGJ1ZmZlci5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTb3VyY2Ugc3RyaW5nXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIERlc3RpbmF0aW9uIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IERlc3RpbmF0aW9uIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBOdW1iZXIgb2YgYnl0ZXMgd3JpdHRlblxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgZW5jb2RpbmcgaXMgaW52YWxpZFxyXG4gKi9cclxuYmFzZTY0LmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShzdHJpbmcsIGJ1ZmZlciwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQ7XHJcbiAgICB2YXIgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7KSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKyspO1xyXG4gICAgICAgIGlmIChjID09PSA2MSAmJiBqID4gMSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgaWYgKChjID0gczY0W2NdKSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkRW5jb2RpbmcpO1xyXG4gICAgICAgIHN3aXRjaCAoaikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0IDw8IDIgfCAoYyAmIDQ4KSA+PiA0O1xyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHQgJiAxNSkgPDwgNCB8IChjICYgNjApID4+IDI7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDMpIDw8IDYgfCBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkRW5jb2RpbmcpO1xyXG4gICAgcmV0dXJuIG9mZnNldCAtIHN0YXJ0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgc3RyaW5nIGFwcGVhcnMgdG8gYmUgYmFzZTY0IGVuY29kZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3RyaW5nIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBwcm9iYWJseSBiYXNlNjQgZW5jb2RlZCwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5iYXNlNjQudGVzdCA9IGZ1bmN0aW9uIHRlc3Qoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvLnRlc3Qoc3RyaW5nKTtcclxufTtcclxuXHJcbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBjb2RlZ2VuO1xyXG5cclxuLyoqXHJcbiAqIEJlZ2lucyBnZW5lcmF0aW5nIGEgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7c3RyaW5nW119IGZ1bmN0aW9uUGFyYW1zIEZ1bmN0aW9uIHBhcmFtZXRlciBuYW1lc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Z1bmN0aW9uTmFtZV0gRnVuY3Rpb24gbmFtZSBpZiBub3QgYW5vbnltb3VzXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBBcHBlbmRlciB0aGF0IGFwcGVuZHMgY29kZSB0byB0aGUgZnVuY3Rpb24ncyBib2R5XHJcbiAqL1xyXG5mdW5jdGlvbiBjb2RlZ2VuKGZ1bmN0aW9uUGFyYW1zLCBmdW5jdGlvbk5hbWUpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICh0eXBlb2YgZnVuY3Rpb25QYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBmdW5jdGlvbk5hbWUgPSBmdW5jdGlvblBhcmFtcztcclxuICAgICAgICBmdW5jdGlvblBhcmFtcyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm9keSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kcyBjb2RlIHRvIHRoZSBmdW5jdGlvbidzIGJvZHkgb3IgZmluaXNoZXMgZ2VuZXJhdGlvbi5cclxuICAgICAqIEB0eXBlZGVmIENvZGVnZW5cclxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdC48c3RyaW5nLCo+fSBbZm9ybWF0U3RyaW5nT3JTY29wZV0gRm9ybWF0IHN0cmluZyBvciwgdG8gZmluaXNoIHRoZSBmdW5jdGlvbiwgYW4gb2JqZWN0IG9mIGFkZGl0aW9uYWwgc2NvcGUgdmFyaWFibGVzLCBpZiBhbnlcclxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2Zvcm1hdFBhcmFtc10gRm9ybWF0IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtDb2RlZ2VufEZ1bmN0aW9ufSBJdHNlbGYgb3IgdGhlIGdlbmVyYXRlZCBmdW5jdGlvbiBpZiBmaW5pc2hlZFxyXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIGZvcm1hdCBwYXJhbWV0ZXIgY291bnRzIGRvIG5vdCBtYXRjaFxyXG4gICAgICovXHJcblxyXG4gICAgZnVuY3Rpb24gQ29kZWdlbihmb3JtYXRTdHJpbmdPclNjb3BlKSB7XHJcbiAgICAgICAgLy8gbm90ZSB0aGF0IGV4cGxpY2l0IGFycmF5IGhhbmRsaW5nIGJlbG93IG1ha2VzIHRoaXMgfjUwJSBmYXN0ZXJcclxuXHJcbiAgICAgICAgLy8gZmluaXNoIHRoZSBmdW5jdGlvblxyXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0U3RyaW5nT3JTY29wZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gdG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKGNvZGVnZW4udmVyYm9zZSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29kZWdlbjogXCIgKyBzb3VyY2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgICAgICAgc291cmNlID0gXCJyZXR1cm4gXCIgKyBzb3VyY2U7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXRTdHJpbmdPclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NvcGVLZXlzICAgPSBPYmplY3Qua2V5cyhmb3JtYXRTdHJpbmdPclNjb3BlKSxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZVBhcmFtcyA9IG5ldyBBcnJheShzY29wZUtleXMubGVuZ3RoICsgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVWYWx1ZXMgPSBuZXcgQXJyYXkoc2NvcGVLZXlzLmxlbmd0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNjb3BlT2Zmc2V0IDwgc2NvcGVLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlUGFyYW1zW3Njb3BlT2Zmc2V0XSA9IHNjb3BlS2V5c1tzY29wZU9mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVWYWx1ZXNbc2NvcGVPZmZzZXRdID0gZm9ybWF0U3RyaW5nT3JTY29wZVtzY29wZUtleXNbc2NvcGVPZmZzZXQrK11dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2NvcGVQYXJhbXNbc2NvcGVPZmZzZXRdID0gc291cmNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLmFwcGx5KG51bGwsIHNjb3BlUGFyYW1zKS5hcHBseShudWxsLCBzY29wZVZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24oc291cmNlKSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy1mdW5jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvdGhlcndpc2UgYXBwZW5kIHRvIGJvZHlcclxuICAgICAgICB2YXIgZm9ybWF0UGFyYW1zID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICAgICAgZm9ybWF0T2Zmc2V0ID0gMDtcclxuICAgICAgICB3aGlsZSAoZm9ybWF0T2Zmc2V0IDwgZm9ybWF0UGFyYW1zLmxlbmd0aClcclxuICAgICAgICAgICAgZm9ybWF0UGFyYW1zW2Zvcm1hdE9mZnNldF0gPSBhcmd1bWVudHNbKytmb3JtYXRPZmZzZXRdO1xyXG4gICAgICAgIGZvcm1hdE9mZnNldCA9IDA7XHJcbiAgICAgICAgZm9ybWF0U3RyaW5nT3JTY29wZSA9IGZvcm1hdFN0cmluZ09yU2NvcGUucmVwbGFjZSgvJShbJWRmaWpzXSkvZywgZnVuY3Rpb24gcmVwbGFjZSgkMCwgJDEpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybWF0UGFyYW1zW2Zvcm1hdE9mZnNldCsrXTtcclxuICAgICAgICAgICAgc3dpdGNoICgkMSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRcIjogY2FzZSBcImZcIjogcmV0dXJuIFN0cmluZyhOdW1iZXIodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJpXCI6IHJldHVybiBTdHJpbmcoTWF0aC5mbG9vcih2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImpcIjogcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzXCI6IHJldHVybiBTdHJpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIiVcIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZm9ybWF0T2Zmc2V0ICE9PSBmb3JtYXRQYXJhbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcInBhcmFtZXRlciBjb3VudCBtaXNtYXRjaFwiKTtcclxuICAgICAgICBib2R5LnB1c2goZm9ybWF0U3RyaW5nT3JTY29wZSk7XHJcbiAgICAgICAgcmV0dXJuIENvZGVnZW47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoZnVuY3Rpb25OYW1lT3ZlcnJpZGUpIHtcclxuICAgICAgICByZXR1cm4gXCJmdW5jdGlvbiBcIiArIChmdW5jdGlvbk5hbWVPdmVycmlkZSB8fCBmdW5jdGlvbk5hbWUgfHwgXCJcIikgKyBcIihcIiArIChmdW5jdGlvblBhcmFtcyAmJiBmdW5jdGlvblBhcmFtcy5qb2luKFwiLFwiKSB8fCBcIlwiKSArIFwiKXtcXG4gIFwiICsgYm9keS5qb2luKFwiXFxuICBcIikgKyBcIlxcbn1cIjtcclxuICAgIH1cclxuXHJcbiAgICBDb2RlZ2VuLnRvU3RyaW5nID0gdG9TdHJpbmc7XHJcbiAgICByZXR1cm4gQ29kZWdlbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJlZ2lucyBnZW5lcmF0aW5nIGEgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBmdW5jdGlvbiBjb2RlZ2VuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZnVuY3Rpb25OYW1lXSBGdW5jdGlvbiBuYW1lIGlmIG5vdCBhbm9ueW1vdXNcclxuICogQHJldHVybnMge0NvZGVnZW59IEFwcGVuZGVyIHRoYXQgYXBwZW5kcyBjb2RlIHRvIHRoZSBmdW5jdGlvbidzIGJvZHlcclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gc2V0IHRvIGB0cnVlYCwgY29kZWdlbiB3aWxsIGxvZyBnZW5lcmF0ZWQgY29kZSB0byBjb25zb2xlLiBVc2VmdWwgZm9yIGRlYnVnZ2luZy5cclxuICogQG5hbWUgdXRpbC5jb2RlZ2VuLnZlcmJvc2VcclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqL1xyXG5jb2RlZ2VuLnZlcmJvc2UgPSBmYWxzZTtcclxuXHJcbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBldmVudCBlbWl0dGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEEgbWluaW1hbCBldmVudCBlbWl0dGVyLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBMaXN0ZW5lclxyXG4gKiBAcGFyYW0geyp9IFtjdHhdIExpc3RlbmVyIGNvbnRleHRcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldnQsIGZuLCBjdHgpIHtcclxuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSB8fCAodGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXSkpLnB1c2goe1xyXG4gICAgICAgIGZuICA6IGZuLFxyXG4gICAgICAgIGN0eCA6IGN0eCB8fCB0aGlzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgb3IgYW55IG1hdGNoaW5nIGxpc3RlbmVycyBpZiBhcmd1bWVudHMgYXJlIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0XSBFdmVudCBuYW1lLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgaWYgb21pdHRlZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZuXSBMaXN0ZW5lciB0byByZW1vdmUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBgZXZ0YCBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZ0LCBmbikge1xyXG4gICAgaWYgKGV2dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGZuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXRzIGFuIGV2ZW50IGJ5IGNhbGxpbmcgaXRzIGxpc3RlbmVycyB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLFxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpKytdLmN0eCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbn0se31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmZXRjaDtcclxuXHJcbnZhciBhc1Byb21pc2UgPSByZXF1aXJlKDEpLFxyXG4gICAgaW5xdWlyZSAgID0gcmVxdWlyZSg3KTtcclxuXHJcbnZhciBmcyA9IGlucXVpcmUoXCJmc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlLXN0eWxlIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwuZmV0Y2h9LlxyXG4gKiBAdHlwZWRlZiBGZXRjaENhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHs/RXJyb3J9IGVycm9yIEVycm9yLCBpZiBhbnksIG90aGVyd2lzZSBgbnVsbGBcclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZW50c10gRmlsZSBjb250ZW50cywgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gZXJyb3JcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogT3B0aW9ucyBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLmZldGNofS5cclxuICogQHR5cGVkZWYgRmV0Y2hPcHRpb25zXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2JpbmFyeT1mYWxzZV0gV2hldGhlciBleHBlY3RpbmcgYSBiaW5hcnkgcmVzcG9uc2VcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbeGhyPWZhbHNlXSBJZiBgdHJ1ZWAsIGZvcmNlcyB0aGUgdXNlIG9mIFhNTEh0dHBSZXF1ZXN0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZldGNoZXMgdGhlIGNvbnRlbnRzIG9mIGEgZmlsZS5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lIEZpbGUgcGF0aCBvciB1cmxcclxuICogQHBhcmFtIHtGZXRjaE9wdGlvbnN9IG9wdGlvbnMgRmV0Y2ggb3B0aW9uc1xyXG4gKiBAcGFyYW0ge0ZldGNoQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmZXRjaChmaWxlbmFtZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG5cclxuICAgIGlmICghY2FsbGJhY2spXHJcbiAgICAgICAgcmV0dXJuIGFzUHJvbWlzZShmZXRjaCwgdGhpcywgZmlsZW5hbWUsIG9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWludmFsaWQtdGhpc1xyXG5cclxuICAgIC8vIGlmIGEgbm9kZS1saWtlIGZpbGVzeXN0ZW0gaXMgcHJlc2VudCwgdHJ5IGl0IGZpcnN0IGJ1dCBmYWxsIGJhY2sgdG8gWEhSIGlmIG5vdGhpbmcgaXMgZm91bmQuXHJcbiAgICBpZiAoIW9wdGlvbnMueGhyICYmIGZzICYmIGZzLnJlYWRGaWxlKVxyXG4gICAgICAgIHJldHVybiBmcy5yZWFkRmlsZShmaWxlbmFtZSwgZnVuY3Rpb24gZmV0Y2hSZWFkRmlsZUNhbGxiYWNrKGVyciwgY29udGVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVyciAmJiB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgICAgID8gZmV0Y2gueGhyKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIDogZXJyXHJcbiAgICAgICAgICAgICAgICA/IGNhbGxiYWNrKGVycilcclxuICAgICAgICAgICAgICAgIDogY2FsbGJhY2sobnVsbCwgb3B0aW9ucy5iaW5hcnkgPyBjb250ZW50cyA6IGNvbnRlbnRzLnRvU3RyaW5nKFwidXRmOFwiKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gdXNlIHRoZSBYSFIgdmVyc2lvbiBvdGhlcndpc2UuXHJcbiAgICByZXR1cm4gZmV0Y2gueGhyKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZldGNoMShmaWxlbmFtZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG5cclxuICAgIGlmICghY2FsbGJhY2spXHJcbiAgICAgICAgcmV0dXJuIGFzUHJvbWlzZShmZXRjaCwgdGhpcywgZmlsZW5hbWUsIG9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWludmFsaWQtdGhpc1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2MgIT09IFwidW5kZWZpbmVkXCIpIHsvL+WIpOaWreaYr+WQpuaYr2NvY29z6aG555uuXHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHsvL25hdGl2ZVxyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUoZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICAvL+WvueS6juS4gOS6m+aWsOeJiOeahGNyZWF0b3Io5L2c6ICFY3JlYXRvcjIuMy4yKeadpeivtO+8jOS7luS8muaKiui1hOa6kOa3t+a3huWcqOS4jeWQjOeahOebruW9leS4i++8jOaJgOS7pei/memHjOaYr+ayoeWKnuazleaJvuWIsOivpeaWh+S7tueahCznm7TmjqXkvb/nlKhjYy5sb2FkZXLnmoRsb2FkUmVz5pa55rOV5bCd6K+V5Yqg6L295LiA5qyh44CCXHJcbiAgICAgICAgICAgIGlmKGNvbnRlbnQgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoZmlsZW5hbWUsIGNjLlRleHRBc3NldCwgZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJlcnJvcjE9XCIgKyBlcnJvciArIFwiLHJlc3VsdCA9IFwiICsgcmVzdWx0ICsgXCIsdHlwZT1cIiArIHR5cGVvZiByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhFcnJvcihcInN0YXR1cyBcIiArIGVycm9yKSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHJlc3VsdCk7Ly9jcmVhdG9yMS455Y+K5Lul5LiL54mI5pys5L2/55So5q2k6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdC50ZXh0KTsvL+aWsOeJiGNyZWF0b3Llj6/mlL7lv4Pov5DooYxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNvbnRlbnQgPT09IFwiXCIgPyBFcnJvcihmaWxlbmFtZSArIFwiIG5vdCBleGl0c1wiKSA6IG51bGwsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jYy5sb2coXCJjYy5sb2FkZXIgbG9hZCAxIGZpbGVuYW1lPVwiICsgZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICAvL+i/memHjOWPr+S7peWKoOi9veS4gOS4qnVybOWbvueJhyA6IFwiSG9zdFwiK2ZpbGVuYW1lXHJcbiAgICAgICAgICAgIC8vIGNjLmxvYWRlci5sb2FkKGZpbGVuYW1lLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiZXJyb3IxPVwiICsgZXJyb3IgKyBcIixyZXN1bHQgPSBcIiArIHJlc3VsdCArIFwiLHR5cGU9XCIgKyB0eXBlb2YgcmVzdWx0KTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvL2NjLmxvZyhcImNjLmxvYWRlciBsb2FkIDJcIik7XHJcblxyXG4gICAgICAgICAgICAvLyDov5nph4xoNeS8muWOu+WKoOi9vXJlc291cmNlc+ebruW9leS4i+eahOaWh+S7tiA6IFwicmVzb3VyY2VzL1wiKyBmaWxlbmFtZVxyXG4gICAgICAgICAgICAvLyDov5nph4xmaWxlbmFtZeS4gOiIrOS4jeeUqOaMh+WumuaJqeWxleWQjSzlvZPnhLbkvaDkuZ/lj6/ku6XlvLrliLbmjIflrppcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoZmlsZW5hbWUsIGNjLlRleHRBc3NldCwgZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vY2MubG9nKFwiZXJyb3IyPVwiICsgZXJyb3IgKyBcIixyZXN1bHQgPSBcIiArIHJlc3VsdCArIFwiLHR5cGU9XCIgKyB0eXBlb2YgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKEVycm9yKFwic3RhdHVzIFwiICsgZXJyb3IpKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHJlc3VsdCk7Ly9jcmVhdG9yMS455Y+K5Lul5LiL54mI5pys5L2/55So5q2k6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0LnRleHQpOy8v5paw54mIY3JlYXRvcuWPr+aUvuW/g+i/kOihjFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jYy5sb2coXCJjYy5sb2FkZXIgbG9hZCAzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGEgbm9kZS1saWtlIGZpbGVzeXN0ZW0gaXMgcHJlc2VudCwgdHJ5IGl0IGZpcnN0IGJ1dCBmYWxsIGJhY2sgdG8gWEhSIGlmIG5vdGhpbmcgaXMgZm91bmQuXHJcbiAgICBpZiAoIW9wdGlvbnMueGhyICYmIGZzICYmIGZzLnJlYWRGaWxlKVxyXG4gICAgICAgIHJldHVybiBmcy5yZWFkRmlsZShmaWxlbmFtZSwgZnVuY3Rpb24gZmV0Y2hSZWFkRmlsZUNhbGxiYWNrKGVyciwgY29udGVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVyciAmJiB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgICAgID8gZmV0Y2gueGhyKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIDogZXJyXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjYWxsYmFjayhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvcHRpb25zLmJpbmFyeSA/IGNvbnRlbnRzIDogY29udGVudHMudG9TdHJpbmcoXCJ1dGY4XCIpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB1c2UgdGhlIFhIUiB2ZXJzaW9uIG90aGVyd2lzZS5cclxuICAgIHJldHVybiBmZXRjaC54aHIoZmlsZW5hbWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogRmV0Y2hlcyB0aGUgY29udGVudHMgb2YgYSBmaWxlLlxyXG4gKiBAbmFtZSB1dGlsLmZldGNoXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBGaWxlIHBhdGggb3IgdXJsXHJcbiAqIEBwYXJhbSB7RmV0Y2hDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZldGNoZXMgdGhlIGNvbnRlbnRzIG9mIGEgZmlsZS5cclxuICogQG5hbWUgdXRpbC5mZXRjaFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggRmlsZSBwYXRoIG9yIHVybFxyXG4gKiBAcGFyYW0ge0ZldGNoT3B0aW9uc30gW29wdGlvbnNdIEZldGNoIG9wdGlvbnNcclxuICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nfFVpbnQ4QXJyYXk+fSBQcm9taXNlXHJcbiAqIEB2YXJpYXRpb24gM1xyXG4gKi9cclxuXHJcbi8qKi9cclxuZmV0Y2gueGhyID0gZnVuY3Rpb24gZmV0Y2hfeGhyKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSAvKiB3b3JrcyBldmVyeXdoZXJlICovID0gZnVuY3Rpb24gZmV0Y2hPblJlYWR5U3RhdGVDaGFuZ2UoKSB7XHJcblxyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gbG9jYWwgY29ycyBzZWN1cml0eSBlcnJvcnMgcmV0dXJuIHN0YXR1cyAwIC8gZW1wdHkgc3RyaW5nLCB0b28uIGFmYWlrIHRoaXMgY2Fubm90IGJlXHJcbiAgICAgICAgLy8gcmVsaWFibHkgZGlzdGluZ3Vpc2hlZCBmcm9tIGFuIGFjdHVhbGx5IGVtcHR5IGZpbGUgZm9yIHNlY3VyaXR5IHJlYXNvbnMuIGZlZWwgZnJlZVxyXG4gICAgICAgIC8vIHRvIHNlbmQgYSBwdWxsIHJlcXVlc3QgaWYgeW91IGFyZSBhd2FyZSBvZiBhIHNvbHV0aW9uLlxyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAwICYmIHhoci5zdGF0dXMgIT09IDIwMClcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEVycm9yKFwic3RhdHVzIFwiICsgeGhyLnN0YXR1cykpO1xyXG5cclxuICAgICAgICAvLyBpZiBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCwgbWFrZSBzdXJlIHRoYXQgc29tZSBzb3J0IG9mIGFycmF5IGlzIHJldHVybmVkLCBldmVuIGlmXHJcbiAgICAgICAgLy8gQXJyYXlCdWZmZXJzIGFyZSBub3Qgc3VwcG9ydGVkLiB0aGUgYmluYXJ5IHN0cmluZyBmYWxsYmFjaywgaG93ZXZlciwgaXMgdW5zYWZlLlxyXG4gICAgICAgIGlmIChvcHRpb25zLmJpbmFyeSkge1xyXG4gICAgICAgICAgICB2YXIgYnVmZmVyID0geGhyLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhoci5yZXNwb25zZVRleHQubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goeGhyLnJlc3BvbnNlVGV4dC5jaGFyQ29kZUF0KGkpICYgMjU1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCIgPyBuZXcgVWludDhBcnJheShidWZmZXIpIDogYnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5iaW5hcnkpIHtcclxuICAgICAgICAvLyByZWY6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9TZW5kaW5nX2FuZF9SZWNlaXZpbmdfQmluYXJ5X0RhdGEjUmVjZWl2aW5nX2JpbmFyeV9kYXRhX2luX29sZGVyX2Jyb3dzZXJzXHJcbiAgICAgICAgaWYgKFwib3ZlcnJpZGVNaW1lVHlwZVwiIGluIHhocilcclxuICAgICAgICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkXCIpO1xyXG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgZmlsZW5hbWUpO1xyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbn0se1wiMVwiOjEsXCI3XCI6N31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShmYWN0b3J5KTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyAvIHdyaXRlcyBmbG9hdHMgLyBkb3VibGVzIGZyb20gLyB0byBidWZmZXJzLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0XHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDY0IGJpdCBkb3VibGUgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRG91YmxlTEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDY0IGJpdCBkb3VibGUgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRG91YmxlQkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgNjQgYml0IGRvdWJsZSBmcm9tIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRG91YmxlTEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgNjQgYml0IGRvdWJsZSBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRG91YmxlQkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgdGhlIHB1cnBvc2Ugb2Ygbm9kZS1iYXNlZCB0ZXN0aW5nIGluIG1vZGlmaWVkIGdsb2JhbCBlbnZpcm9ubWVudHNcclxuZnVuY3Rpb24gZmFjdG9yeShleHBvcnRzKSB7XHJcblxyXG4gICAgLy8gZmxvYXQ6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjMyID0gbmV3IEZsb2F0MzJBcnJheShbIC0wIF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmMzIuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzNdID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX2NweSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzBdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfcmV2KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9jcHkgOiB3cml0ZUZsb2F0X2YzMl9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRCRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfcmV2IDogd3JpdGVGbG9hdF9mMzJfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfZjMyX2NweShidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIHJldHVybiBmMzJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfZjMyX3JldihidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIHJldHVybiBmMzJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0TEUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfY3B5IDogcmVhZEZsb2F0X2YzMl9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gbGUgPyByZWFkRmxvYXRfZjMyX3JldiA6IHJlYWRGbG9hdF9mMzJfY3B5O1xyXG5cclxuICAgIC8vIGZsb2F0OiBpZWVlNzU0XHJcbiAgICB9KSgpOyBlbHNlIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9pZWVlNzU0KHdyaXRlVWludCwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChpc05hTih2YWwpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDIxNDMyODkzNDQsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsID4gMy40MDI4MjM0NjYzODUyODg2ZSszOCkgLy8gKy1JbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjEzOTA5NTA0MCkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsIDwgMS4xNzU0OTQzNTA4MjIyODc1ZS0zOCkgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IE1hdGgucm91bmQodmFsIC8gMS40MDEyOTg0NjQzMjQ4MTdlLTQ1KSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbCkgLyBNYXRoLkxOMiksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSBNYXRoLnJvdW5kKHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCkgKiA4Mzg4NjA4KSAmIDgzODg2MDc7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEyNyA8PCAyMyB8IG1hbnRpc3NhKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IHdyaXRlRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFKTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRCRSA9IHdyaXRlRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludEJFKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2llZWU3NTQocmVhZFVpbnQsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciB1aW50ID0gcmVhZFVpbnQoYnVmLCBwb3MpLFxyXG4gICAgICAgICAgICAgICAgc2lnbiA9ICh1aW50ID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSB1aW50ID4+PiAyMyAmIDI1NSxcclxuICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdWludCAmIDgzODg2MDc7XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvbmVudCA9PT0gMjU1XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDE1MCkgKiAobWFudGlzc2EgKyA4Mzg4NjA4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0TEUgPSByZWFkRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSByZWFkRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50QkUpO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gZG91YmxlOiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDY0QXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGY2NCA9IG5ldyBGbG9hdDY0QXJyYXkoWy0wXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGY2NC5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbN10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X2NweSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzBdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbNF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbN107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfcmV2KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbN107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbNF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfY3B5IDogd3JpdGVEb3VibGVfZjY0X3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X3JldiA6IHdyaXRlRG91YmxlX2Y2NF9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfZjY0X2NweShidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyA0XTtcclxuICAgICAgICAgICAgZjhiWzVdID0gYnVmW3BvcyArIDVdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgNl07XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgKyA3XTtcclxuICAgICAgICAgICAgcmV0dXJuIGY2NFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfZjY0X3JldihidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzVdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyA0XTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDVdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgNl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyA3XTtcclxuICAgICAgICAgICAgcmV0dXJuIGY2NFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlTEUgPSBsZSA/IHJlYWREb3VibGVfZjY0X2NweSA6IHJlYWREb3VibGVfZjY0X3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9yZXYgOiByZWFkRG91YmxlX2Y2NF9jcHk7XHJcblxyXG4gICAgLy8gZG91YmxlOiBpZWVlNzU0XHJcbiAgICB9KSgpOyBlbHNlIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfaWVlZTc1NCh3cml0ZVVpbnQsIG9mZjAsIG9mZjEsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDIxNDY5NTkzNjAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpIHsgLy8gKy1JbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTQ2NDM1MDcyKSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYW50aXNzYTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAyLjIyNTA3Mzg1ODUwNzIwMTRlLTMwOCkgeyAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsIC8gNWUtMzI0O1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludChtYW50aXNzYSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBtYW50aXNzYSAvIDQyOTQ5NjcyOTYpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbCkgLyBNYXRoLkxOMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cG9uZW50ID09PSAxMDI0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvbmVudCA9IDEwMjM7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludChtYW50aXNzYSAqIDQ1MDM1OTk2MjczNzA0OTYgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMDIzIDw8IDIwIHwgbWFudGlzc2EgKiAxMDQ4NTc2ICYgMTA0ODU3NSkgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9pZWVlNzU0KHJlYWRVaW50LCBvZmYwLCBvZmYxLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgbG8gPSByZWFkVWludChidWYsIHBvcyArIG9mZjApLFxyXG4gICAgICAgICAgICAgICAgaGkgPSByZWFkVWludChidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IChoaSA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gaGkgPj4+IDIwICYgMjA0NyxcclxuICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gNDI5NDk2NzI5NiAqIChoaSAmIDEwNDg1NzUpICsgbG87XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvbmVudCA9PT0gMjA0N1xyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiA1ZS0zMjQgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxMDc1KSAqIChtYW50aXNzYSArIDQ1MDM1OTk2MjczNzA0OTYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlTEUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50QkUsIDQsIDApO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHM7XHJcbn1cclxuXHJcbi8vIHVpbnQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50TEUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiA4ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCA+Pj4gMjQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludEJFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgPj4+IDI0O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiA4ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludExFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXVxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdIDw8IDI0KSA+Pj4gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRCRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF0gPDwgMjRcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSkgPj4+IDA7XHJcbn1cclxuXHJcbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBpbnF1aXJlO1xyXG5cclxuLyoqXHJcbiAqIFJlcXVpcmVzIGEgbW9kdWxlIG9ubHkgaWYgYXZhaWxhYmxlLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlTmFtZSBNb2R1bGUgdG8gcmVxdWlyZVxyXG4gKiBAcmV0dXJucyB7P09iamVjdH0gUmVxdWlyZWQgbW9kdWxlIGlmIGF2YWlsYWJsZSBhbmQgbm90IGVtcHR5LCBvdGhlcndpc2UgYG51bGxgXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnF1aXJlKG1vZHVsZU5hbWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIG1vZCA9IGV2YWwoXCJxdWlyZVwiLnJlcGxhY2UoL14vLFwicmVcIikpKG1vZHVsZU5hbWUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcclxuICAgICAgICBpZiAobW9kICYmIChtb2QubGVuZ3RoIHx8IE9iamVjdC5rZXlzKG1vZCkubGVuZ3RoKSlcclxuICAgICAgICAgICAgcmV0dXJuIG1vZDtcclxuICAgIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG59LHt9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIHBhdGggbW9kdWxlIHRvIHJlc29sdmUgVW5peCwgV2luZG93cyBhbmQgVVJMIHBhdGhzIGFsaWtlLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgcGF0aCA9IGV4cG9ydHM7XHJcblxyXG52YXIgaXNBYnNvbHV0ZSA9XHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHBhdGggaXMgYWJzb2x1dGUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFBhdGggdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHBhdGggaXMgYWJzb2x1dGVcclxuICovXHJcbnBhdGguaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eKD86XFwvfFxcdys6KS8udGVzdChwYXRoKTtcclxufTtcclxuXHJcbnZhciBub3JtYWxpemUgPVxyXG4vKipcclxuICogTm9ybWFsaXplcyB0aGUgc3BlY2lmaWVkIHBhdGguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFBhdGggdG8gbm9ybWFsaXplXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IE5vcm1hbGl6ZWQgcGF0aFxyXG4gKi9cclxucGF0aC5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUocGF0aCkge1xyXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL3syLH0vZywgXCIvXCIpO1xyXG4gICAgdmFyIHBhcnRzICAgID0gcGF0aC5zcGxpdChcIi9cIiksXHJcbiAgICAgICAgYWJzb2x1dGUgPSBpc0Fic29sdXRlKHBhdGgpLFxyXG4gICAgICAgIHByZWZpeCAgID0gXCJcIjtcclxuICAgIGlmIChhYnNvbHV0ZSlcclxuICAgICAgICBwcmVmaXggPSBwYXJ0cy5zaGlmdCgpICsgXCIvXCI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDspIHtcclxuICAgICAgICBpZiAocGFydHNbaV0gPT09IFwiLi5cIikge1xyXG4gICAgICAgICAgICBpZiAoaSA+IDAgJiYgcGFydHNbaSAtIDFdICE9PSBcIi4uXCIpXHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5zcGxpY2UoLS1pLCAyKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoYWJzb2x1dGUpXHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBcIi5cIilcclxuICAgICAgICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZWZpeCArIHBhcnRzLmpvaW4oXCIvXCIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIHRoZSBzcGVjaWZpZWQgaW5jbHVkZSBwYXRoIGFnYWluc3QgdGhlIHNwZWNpZmllZCBvcmlnaW4gcGF0aC5cclxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpblBhdGggUGF0aCB0byB0aGUgb3JpZ2luIGZpbGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGluY2x1ZGVQYXRoIEluY2x1ZGUgcGF0aCByZWxhdGl2ZSB0byBvcmlnaW4gcGF0aFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthbHJlYWR5Tm9ybWFsaXplZD1mYWxzZV0gYHRydWVgIGlmIGJvdGggcGF0aHMgYXJlIGFscmVhZHkga25vd24gdG8gYmUgbm9ybWFsaXplZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBpbmNsdWRlIGZpbGVcclxuICovXHJcbnBhdGgucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUob3JpZ2luUGF0aCwgaW5jbHVkZVBhdGgsIGFscmVhZHlOb3JtYWxpemVkKSB7XHJcbiAgICBpZiAoIWFscmVhZHlOb3JtYWxpemVkKVxyXG4gICAgICAgIGluY2x1ZGVQYXRoID0gbm9ybWFsaXplKGluY2x1ZGVQYXRoKTtcclxuICAgIGlmIChpc0Fic29sdXRlKGluY2x1ZGVQYXRoKSlcclxuICAgICAgICByZXR1cm4gaW5jbHVkZVBhdGg7XHJcbiAgICBpZiAoIWFscmVhZHlOb3JtYWxpemVkKVxyXG4gICAgICAgIG9yaWdpblBhdGggPSBub3JtYWxpemUob3JpZ2luUGF0aCk7XHJcbiAgICByZXR1cm4gKG9yaWdpblBhdGggPSBvcmlnaW5QYXRoLnJlcGxhY2UoLyg/OlxcL3xeKVteL10rJC8sIFwiXCIpKS5sZW5ndGggPyBub3JtYWxpemUob3JpZ2luUGF0aCArIFwiL1wiICsgaW5jbHVkZVBhdGgpIDogaW5jbHVkZVBhdGg7XHJcbn07XHJcblxyXG59LHt9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDtcclxuXHJcbi8qKlxyXG4gKiBBbiBhbGxvY2F0b3IgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbEFsbG9jYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcclxuICovXHJcblxyXG4vKipcclxuICogQSBzbGljZXIgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbFNsaWNlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBvZmZzZXRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXIgc2xpY2VcclxuICogQHRoaXMge1VpbnQ4QXJyYXl9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgZ2VuZXJhbCBwdXJwb3NlIGJ1ZmZlciBwb29sLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtQb29sQWxsb2NhdG9yfSBhbGxvYyBBbGxvY2F0b3JcclxuICogQHBhcmFtIHtQb29sU2xpY2VyfSBzbGljZSBTbGljZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTgxOTJdIFNsYWIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7UG9vbEFsbG9jYXRvcn0gUG9vbGVkIGFsbG9jYXRvclxyXG4gKi9cclxuZnVuY3Rpb24gcG9vbChhbGxvYywgc2xpY2UsIHNpemUpIHtcclxuICAgIHZhciBTSVpFICAgPSBzaXplIHx8IDgxOTI7XHJcbiAgICB2YXIgTUFYICAgID0gU0laRSA+Pj4gMTtcclxuICAgIHZhciBzbGFiICAgPSBudWxsO1xyXG4gICAgdmFyIG9mZnNldCA9IFNJWkU7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcG9vbF9hbGxvYyhzaXplKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiBNQVgpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxvYyhzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICsgc2l6ZSA+IFNJWkUpIHtcclxuICAgICAgICAgICAgc2xhYiA9IGFsbG9jKFNJWkUpO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmID0gc2xpY2UuY2FsbChzbGFiLCBvZmZzZXQsIG9mZnNldCArPSBzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICYgNykgLy8gYWxpZ24gdG8gMzIgYml0XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgfCA3KSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH07XHJcbn1cclxuXHJcbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIFVURjggaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGY4ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBVVEY4IGJ5dGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxudXRmOC5sZW5ndGggPSBmdW5jdGlvbiB1dGY4X2xlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBsZW4gPSAwLFxyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMgPCAxMjgpXHJcbiAgICAgICAgICAgIGxlbiArPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBlbHNlIGlmICgoYyAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgbGVuICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGxlbiArPSAzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBVVEY4IGJ5dGVzIGFzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAqL1xyXG51dGY4LnJlYWQgPSBmdW5jdGlvbiB1dGY4X3JlYWQoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICBpZiAobGVuIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXSxcclxuICAgICAgICBpID0gMCwgLy8gY2hhciBvZmZzZXRcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB0ID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIGlmICh0IDwgMTI4KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gdDtcclxuICAgICAgICBlbHNlIGlmICh0ID4gMTkxICYmIHQgPCAyMjQpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDMxKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDIzOSAmJiB0IDwgMzY1KSB7XHJcbiAgICAgICAgICAgIHQgPSAoKHQgJiA3KSA8PCAxOCB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MykgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEODAwICsgKHQgPj4gMTApO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEQzAwICsgKHQgJiAxMDIzKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMTUpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nIGFzIFVURjggYnl0ZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZXMgd3JpdHRlblxyXG4gKi9cclxudXRmOC53cml0ZSA9IGZ1bmN0aW9uIHV0Zjhfd3JpdGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGMxLCAvLyBjaGFyYWN0ZXIgMVxyXG4gICAgICAgIGMyOyAvLyBjaGFyYWN0ZXIgMlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjMSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjMSA8IDEyOCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjMSA8IDIwNDgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICAgICAgfCAxOTI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGMxICYgMHhGQzAwKSA9PT0gMHhEODAwICYmICgoYzIgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgIGMxID0gMHgxMDAwMCArICgoYzEgJiAweDAzRkYpIDw8IDEwKSArIChjMiAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDE4ICAgICAgfCAyNDA7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICAgICAgfCAyMjQ7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcblxyXG59LHt9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbW1vbjtcclxuXHJcbnZhciBjb21tb25SZSA9IC9cXC98XFwuLztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBjb21tb24gdHlwZSBkZWZpbml0aW9ucy5cclxuICogQ2FuIGFsc28gYmUgdXNlZCB0byBwcm92aWRlIGFkZGl0aW9uYWwgZ29vZ2xlIHR5cGVzIG9yIHlvdXIgb3duIGN1c3RvbSB0eXBlcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgU2hvcnQgbmFtZSBhcyBpbiBgZ29vZ2xlL3Byb3RvYnVmL1tuYW1lXS5wcm90b2Agb3IgZnVsbCBmaWxlIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0ganNvbiBKU09OIGRlZmluaXRpb24gd2l0aGluIGBnb29nbGUucHJvdG9idWZgIGlmIGEgc2hvcnQgbmFtZSwgb3RoZXJ3aXNlIHRoZSBmaWxlJ3Mgcm9vdCBkZWZpbml0aW9uXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEBwcm9wZXJ0eSB7SU5hbWVzcGFjZX0gZ29vZ2xlL3Byb3RvYnVmL2FueS5wcm90byBBbnlcclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG8gRHVyYXRpb25cclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvZW1wdHkucHJvdG8gRW1wdHlcclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvZmllbGRfbWFzay5wcm90byBGaWVsZE1hc2tcclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvIFN0cnVjdCwgVmFsdWUsIE51bGxWYWx1ZSBhbmQgTGlzdFZhbHVlXHJcbiAqIEBwcm9wZXJ0eSB7SU5hbWVzcGFjZX0gZ29vZ2xlL3Byb3RvYnVmL3RpbWVzdGFtcC5wcm90byBUaW1lc3RhbXBcclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvd3JhcHBlcnMucHJvdG8gV3JhcHBlcnNcclxuICogQGV4YW1wbGVcclxuICogLy8gbWFudWFsbHkgcHJvdmlkZXMgZGVzY3JpcHRvci5wcm90byAoYXNzdW1lcyBnb29nbGUvcHJvdG9idWYvIG5hbWVzcGFjZSBhbmQgLnByb3RvIGV4dGVuc2lvbilcclxuICogcHJvdG9idWYuY29tbW9uKFwiZGVzY3JpcHRvclwiLCBkZXNjcmlwdG9ySnNvbik7XHJcbiAqXHJcbiAqIC8vIG1hbnVhbGx5IHByb3ZpZGVzIGEgY3VzdG9tIGRlZmluaXRpb24gKHVzZXMgbXkuZm9vIG5hbWVzcGFjZSlcclxuICogcHJvdG9idWYuY29tbW9uKFwibXkvZm9vL2Jhci5wcm90b1wiLCBteUZvb0Jhckpzb24pO1xyXG4gKi9cclxuZnVuY3Rpb24gY29tbW9uKG5hbWUsIGpzb24pIHtcclxuICAgIGlmICghY29tbW9uUmUudGVzdChuYW1lKSkge1xyXG4gICAgICAgIG5hbWUgPSBcImdvb2dsZS9wcm90b2J1Zi9cIiArIG5hbWUgKyBcIi5wcm90b1wiO1xyXG4gICAgICAgIGpzb24gPSB7IG5lc3RlZDogeyBnb29nbGU6IHsgbmVzdGVkOiB7IHByb3RvYnVmOiB7IG5lc3RlZDoganNvbiB9IH0gfSB9IH07XHJcbiAgICB9XHJcbiAgICBjb21tb25bbmFtZV0gPSBqc29uO1xyXG59XHJcblxyXG4vLyBOb3QgcHJvdmlkZWQgYmVjYXVzZSBvZiBsaW1pdGVkIHVzZSAoZmVlbCBmcmVlIHRvIGRpc2N1c3Mgb3IgdG8gcHJvdmlkZSB5b3Vyc2VsZik6XHJcbi8vXHJcbi8vIGdvb2dsZS9wcm90b2J1Zi9kZXNjcmlwdG9yLnByb3RvXHJcbi8vIGdvb2dsZS9wcm90b2J1Zi9zb3VyY2VfY29udGV4dC5wcm90b1xyXG4vLyBnb29nbGUvcHJvdG9idWYvdHlwZS5wcm90b1xyXG4vL1xyXG4vLyBTdHJpcHBlZCBhbmQgcHJlLXBhcnNlZCB2ZXJzaW9ucyBvZiB0aGVzZSBub24tYnVuZGxlZCBmaWxlcyBhcmUgaW5zdGVhZCBhdmFpbGFibGUgYXMgcGFydCBvZlxyXG4vLyB0aGUgcmVwb3NpdG9yeSBvciBwYWNrYWdlIHdpdGhpbiB0aGUgZ29vZ2xlL3Byb3RvYnVmIGRpcmVjdG9yeS5cclxuXHJcbmNvbW1vbihcImFueVwiLCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLkFueSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJQW55XHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFt0eXBlVXJsXVxyXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBbYnl0ZXNdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIEFueToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB0eXBlX3VybDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ5dGVzXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciB0aW1lVHlwZTtcclxuXHJcbmNvbW1vbihcImR1cmF0aW9uXCIsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuRHVyYXRpb24gbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSUR1cmF0aW9uXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ30gW3NlY29uZHNdXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW25hbm9zXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBEdXJhdGlvbjogdGltZVR5cGUgPSB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHNlY29uZHM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW50NjRcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbm9zOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImludDMyXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbW1vbihcInRpbWVzdGFtcFwiLCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcCBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJVGltZXN0YW1wXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ30gW3NlY29uZHNdXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW25hbm9zXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBUaW1lc3RhbXA6IHRpbWVUeXBlXHJcbn0pO1xyXG5cclxuY29tbW9uKFwiZW1wdHlcIiwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5FbXB0eSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJRW1wdHlcclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgRW1wdHk6IHtcclxuICAgICAgICBmaWVsZHM6IHt9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29tbW9uKFwic3RydWN0XCIsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuU3RydWN0IG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElTdHJ1Y3RcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLElWYWx1ZT59IFtmaWVsZHNdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIFN0cnVjdDoge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIGtleVR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuVmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSVZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFtraW5kXVxyXG4gICAgICogQHByb3BlcnR5IHswfSBbbnVsbFZhbHVlXVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFtudW1iZXJWYWx1ZV1cclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3RyaW5nVmFsdWVdXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IFtib29sVmFsdWVdXHJcbiAgICAgKiBAcHJvcGVydHkge0lTdHJ1Y3R9IFtzdHJ1Y3RWYWx1ZV1cclxuICAgICAqIEBwcm9wZXJ0eSB7SUxpc3RWYWx1ZX0gW2xpc3RWYWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgVmFsdWU6IHtcclxuICAgICAgICBvbmVvZnM6IHtcclxuICAgICAgICAgICAga2luZDoge1xyXG4gICAgICAgICAgICAgICAgb25lb2Y6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIm51bGxWYWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibnVtYmVyVmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0cmluZ1ZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib29sVmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0cnVjdFZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaXN0VmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgbnVsbFZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIk51bGxWYWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbnVtYmVyVmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZG91YmxlXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHJpbmdWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIGlkOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvb2xWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJib29sXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHJ1Y3RWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJTdHJ1Y3RcIixcclxuICAgICAgICAgICAgICAgIGlkOiA1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpc3RWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJMaXN0VmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGlkOiA2XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE51bGxWYWx1ZToge1xyXG4gICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICBOVUxMX1ZBTFVFOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuTGlzdFZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElMaXN0VmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge0FycmF5LjxJVmFsdWU+fSBbdmFsdWVzXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBMaXN0VmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICBydWxlOiBcInJlcGVhdGVkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbW1vbihcIndyYXBwZXJzXCIsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSURvdWJsZVZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgRG91YmxlVmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZG91YmxlXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJRmxvYXRWYWx1ZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbdmFsdWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIEZsb2F0VmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZmxvYXRcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElJbnQ2NFZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ30gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBJbnQ2NFZhbHVlOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImludDY0XCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSVVJbnQ2NFZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ8TG9uZ30gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBVSW50NjRWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1aW50NjRcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElJbnQzMlZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgSW50MzJWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbnQzMlwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElVSW50MzJWYWx1ZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbdmFsdWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIFVJbnQzMlZhbHVlOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVpbnQzMlwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLkJvb2xWYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJQm9vbFZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBbdmFsdWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIEJvb2xWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJib29sXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuU3RyaW5nVmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSVN0cmluZ1ZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgU3RyaW5nVmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuQnl0ZXNWYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJQnl0ZXNWYWx1ZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBCeXRlc1ZhbHVlOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ5dGVzXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbW1vbihcImZpZWxkX21hc2tcIiwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2sgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSURvdWJsZVZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgRmllbGRNYXNrOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHBhdGhzOiB7XHJcbiAgICAgICAgICAgICAgICBydWxlOiBcInJlcGVhdGVkXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcm9vdCBkZWZpbml0aW9uIG9mIHRoZSBzcGVjaWZpZWQgY29tbW9uIHByb3RvIGZpbGUuXHJcbiAqXHJcbiAqIEJ1bmRsZWQgZGVmaW5pdGlvbnMgYXJlOlxyXG4gKiAtIGdvb2dsZS9wcm90b2J1Zi9hbnkucHJvdG9cclxuICogLSBnb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG9cclxuICogLSBnb29nbGUvcHJvdG9idWYvZW1wdHkucHJvdG9cclxuICogLSBnb29nbGUvcHJvdG9idWYvZmllbGRfbWFzay5wcm90b1xyXG4gKiAtIGdvb2dsZS9wcm90b2J1Zi9zdHJ1Y3QucHJvdG9cclxuICogLSBnb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvXHJcbiAqIC0gZ29vZ2xlL3Byb3RvYnVmL3dyYXBwZXJzLnByb3RvXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlIFByb3RvIGZpbGUgbmFtZVxyXG4gKiBAcmV0dXJucyB7SU5hbWVzcGFjZXxudWxsfSBSb290IGRlZmluaXRpb24gb3IgYG51bGxgIGlmIG5vdCBkZWZpbmVkXHJcbiAqL1xyXG5jb21tb24uZ2V0ID0gZnVuY3Rpb24gZ2V0KGZpbGUpIHtcclxuICAgIHJldHVybiBjb21tb25bZmlsZV0gfHwgbnVsbDtcclxufTtcclxuXHJcbn0se31dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiBSdW50aW1lIG1lc3NhZ2UgZnJvbS90byBwbGFpbiBvYmplY3QgY29udmVydGVycy5cclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIGNvbnZlcnRlciA9IGV4cG9ydHM7XHJcblxyXG52YXIgRW51bSA9IHJlcXVpcmUoMTUpLFxyXG4gICAgdXRpbCA9IHJlcXVpcmUoMzcpO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBhcnRpYWwgdmFsdWUgZnJvbU9iamVjdCBjb252ZXRlci5cclxuICogQHBhcmFtIHtDb2RlZ2VufSBnZW4gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBSZWZsZWN0ZWQgZmllbGRcclxuICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkSW5kZXggRmllbGQgaW5kZXhcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgcmVmZXJlbmNlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIGdlblZhbHVlUGFydGlhbF9mcm9tT2JqZWN0KGdlbiwgZmllbGQsIGZpZWxkSW5kZXgsIHByb3ApIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxuICAgIGlmIChmaWVsZC5yZXNvbHZlZFR5cGUpIHtcclxuICAgICAgICBpZiAoZmllbGQucmVzb2x2ZWRUeXBlIGluc3RhbmNlb2YgRW51bSkgeyBnZW5cclxuICAgICAgICAgICAgKFwic3dpdGNoKGQlcyl7XCIsIHByb3ApO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB2YWx1ZXMgPSBmaWVsZC5yZXNvbHZlZFR5cGUudmFsdWVzLCBrZXlzID0gT2JqZWN0LmtleXModmFsdWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGQucmVwZWF0ZWQgJiYgdmFsdWVzW2tleXNbaV1dID09PSBmaWVsZC50eXBlRGVmYXVsdCkgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJkZWZhdWx0OlwiKTtcclxuICAgICAgICAgICAgICAgIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiY2FzZSVqOlwiLCBrZXlzW2ldKVxyXG4gICAgICAgICAgICAgICAgKFwiY2FzZSAlaTpcIiwgdmFsdWVzW2tleXNbaV1dKVxyXG4gICAgICAgICAgICAgICAgICAgIChcIm0lcz0lalwiLCBwcm9wLCB2YWx1ZXNba2V5c1tpXV0pXHJcbiAgICAgICAgICAgICAgICAgICAgKFwiYnJlYWtcIik7XHJcbiAgICAgICAgICAgIH0gZ2VuXHJcbiAgICAgICAgICAgIChcIn1cIik7XHJcbiAgICAgICAgfSBlbHNlIGdlblxyXG4gICAgICAgICAgICAoXCJpZih0eXBlb2YgZCVzIT09XFxcIm9iamVjdFxcXCIpXCIsIHByb3ApXHJcbiAgICAgICAgICAgICAgICAoXCJ0aHJvdyBUeXBlRXJyb3IoJWopXCIsIGZpZWxkLmZ1bGxOYW1lICsgXCI6IG9iamVjdCBleHBlY3RlZFwiKVxyXG4gICAgICAgICAgICAoXCJtJXM9dHlwZXNbJWldLmZyb21PYmplY3QoZCVzKVwiLCBwcm9wLCBmaWVsZEluZGV4LCBwcm9wKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGlzVW5zaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImRvdWJsZVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZmxvYXRcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJtJXM9TnVtYmVyKGQlcylcIiwgcHJvcCwgcHJvcCk7IC8vIGFsc28gY2F0Y2hlcyBcIk5hTlwiLCBcIkluZmluaXR5XCJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidWludDMyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmaXhlZDMyXCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwibSVzPWQlcz4+PjBcIiwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImludDMyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaW50MzJcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNmaXhlZDMyXCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwibSVzPWQlc3wwXCIsIHByb3AsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aW50NjRcIjpcclxuICAgICAgICAgICAgICAgIGlzVW5zaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1mYWxsdGhyb3VnaFxyXG4gICAgICAgICAgICBjYXNlIFwiaW50NjRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNpbnQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZml4ZWQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ZpeGVkNjRcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZih1dGlsLkxvbmcpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKFwiKG0lcz11dGlsLkxvbmcuZnJvbVZhbHVlKGQlcykpLnVuc2lnbmVkPSVqXCIsIHByb3AsIHByb3AsIGlzVW5zaWduZWQpXHJcbiAgICAgICAgICAgICAgICAoXCJlbHNlIGlmKHR5cGVvZiBkJXM9PT1cXFwic3RyaW5nXFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgICAgICAoXCJtJXM9cGFyc2VJbnQoZCVzLDEwKVwiLCBwcm9wLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgKFwiZWxzZSBpZih0eXBlb2YgZCVzPT09XFxcIm51bWJlclxcXCIpXCIsIHByb3ApXHJcbiAgICAgICAgICAgICAgICAgICAgKFwibSVzPWQlc1wiLCBwcm9wLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgKFwiZWxzZSBpZih0eXBlb2YgZCVzPT09XFxcIm9iamVjdFxcXCIpXCIsIHByb3ApXHJcbiAgICAgICAgICAgICAgICAgICAgKFwibSVzPW5ldyB1dGlsLkxvbmdCaXRzKGQlcy5sb3c+Pj4wLGQlcy5oaWdoPj4+MCkudG9OdW1iZXIoJXMpXCIsIHByb3AsIHByb3AsIHByb3AsIGlzVW5zaWduZWQgPyBcInRydWVcIiA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJieXRlc1wiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcImlmKHR5cGVvZiBkJXM9PT1cXFwic3RyaW5nXFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgICAgICAoXCJ1dGlsLmJhc2U2NC5kZWNvZGUoZCVzLG0lcz11dGlsLm5ld0J1ZmZlcih1dGlsLmJhc2U2NC5sZW5ndGgoZCVzKSksMClcIiwgcHJvcCwgcHJvcCwgcHJvcClcclxuICAgICAgICAgICAgICAgIChcImVsc2UgaWYoZCVzLmxlbmd0aClcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgICAgICAoXCJtJXM9ZCVzXCIsIHByb3AsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJtJXM9U3RyaW5nKGQlcylcIiwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJvb2xcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJtJXM9Qm9vbGVhbihkJXMpXCIsIHByb3AsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8qIGRlZmF1bHQ6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwibSVzPWQlc1wiLCBwcm9wLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBnZW47XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBsYWluIG9iamVjdCB0byBydW50aW1lIG1lc3NhZ2UgY29udmVydGVyIHNwZWNpZmljIHRvIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSB0eXBlLlxyXG4gKiBAcGFyYW0ge1R5cGV9IG10eXBlIE1lc3NhZ2UgdHlwZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKi9cclxuY29udmVydGVyLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG10eXBlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSwgYmxvY2stc2NvcGVkLXZhciwgbm8tcmVkZWNsYXJlICovXHJcbiAgICB2YXIgZmllbGRzID0gbXR5cGUuZmllbGRzQXJyYXk7XHJcbiAgICB2YXIgZ2VuID0gdXRpbC5jb2RlZ2VuKFtcImRcIl0sIG10eXBlLm5hbWUgKyBcIiRmcm9tT2JqZWN0XCIpXHJcbiAgICAoXCJpZihkIGluc3RhbmNlb2YgdGhpcy5jdG9yKVwiKVxyXG4gICAgICAgIChcInJldHVybiBkXCIpO1xyXG4gICAgaWYgKCFmaWVsZHMubGVuZ3RoKSByZXR1cm4gZ2VuXHJcbiAgICAoXCJyZXR1cm4gbmV3IHRoaXMuY3RvclwiKTtcclxuICAgIGdlblxyXG4gICAgKFwidmFyIG09bmV3IHRoaXMuY3RvclwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkICA9IGZpZWxkc1tpXS5yZXNvbHZlKCksXHJcbiAgICAgICAgICAgIHByb3AgICA9IHV0aWwuc2FmZVByb3AoZmllbGQubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBmaWVsZHNcclxuICAgICAgICBpZiAoZmllbGQubWFwKSB7IGdlblxyXG4gICAgKFwiaWYoZCVzKXtcIiwgcHJvcClcclxuICAgICAgICAoXCJpZih0eXBlb2YgZCVzIT09XFxcIm9iamVjdFxcXCIpXCIsIHByb3ApXHJcbiAgICAgICAgICAgIChcInRocm93IFR5cGVFcnJvciglailcIiwgZmllbGQuZnVsbE5hbWUgKyBcIjogb2JqZWN0IGV4cGVjdGVkXCIpXHJcbiAgICAgICAgKFwibSVzPXt9XCIsIHByb3ApXHJcbiAgICAgICAgKFwiZm9yKHZhciBrcz1PYmplY3Qua2V5cyhkJXMpLGk9MDtpPGtzLmxlbmd0aDsrK2kpe1wiLCBwcm9wKTtcclxuICAgICAgICAgICAgZ2VuVmFsdWVQYXJ0aWFsX2Zyb21PYmplY3QoZ2VuLCBmaWVsZCwgLyogbm90IHNvcnRlZCAqLyBpLCBwcm9wICsgXCJba3NbaV1dXCIpXHJcbiAgICAgICAgKFwifVwiKVxyXG4gICAgKFwifVwiKTtcclxuXHJcbiAgICAgICAgLy8gUmVwZWF0ZWQgZmllbGRzXHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5yZXBlYXRlZCkgeyBnZW5cclxuICAgIChcImlmKGQlcyl7XCIsIHByb3ApXHJcbiAgICAgICAgKFwiaWYoIUFycmF5LmlzQXJyYXkoZCVzKSlcIiwgcHJvcClcclxuICAgICAgICAgICAgKFwidGhyb3cgVHlwZUVycm9yKCVqKVwiLCBmaWVsZC5mdWxsTmFtZSArIFwiOiBhcnJheSBleHBlY3RlZFwiKVxyXG4gICAgICAgIChcIm0lcz1bXVwiLCBwcm9wKVxyXG4gICAgICAgIChcImZvcih2YXIgaT0wO2k8ZCVzLmxlbmd0aDsrK2kpe1wiLCBwcm9wKTtcclxuICAgICAgICAgICAgZ2VuVmFsdWVQYXJ0aWFsX2Zyb21PYmplY3QoZ2VuLCBmaWVsZCwgLyogbm90IHNvcnRlZCAqLyBpLCBwcm9wICsgXCJbaV1cIilcclxuICAgICAgICAoXCJ9XCIpXHJcbiAgICAoXCJ9XCIpO1xyXG5cclxuICAgICAgICAvLyBOb24tcmVwZWF0ZWQgZmllbGRzXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCEoZmllbGQucmVzb2x2ZWRUeXBlIGluc3RhbmNlb2YgRW51bSkpIGdlbiAvLyBubyBuZWVkIHRvIHRlc3QgZm9yIG51bGwvdW5kZWZpbmVkIGlmIGFuIGVudW0gKHVzZXMgc3dpdGNoKVxyXG4gICAgKFwiaWYoZCVzIT1udWxsKXtcIiwgcHJvcCk7IC8vICE9PSB1bmRlZmluZWQgJiYgIT09IG51bGxcclxuICAgICAgICBnZW5WYWx1ZVBhcnRpYWxfZnJvbU9iamVjdChnZW4sIGZpZWxkLCAvKiBub3Qgc29ydGVkICovIGksIHByb3ApO1xyXG4gICAgICAgICAgICBpZiAoIShmaWVsZC5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtKSkgZ2VuXHJcbiAgICAoXCJ9XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gcmV0dXJuIGdlblxyXG4gICAgKFwicmV0dXJuIG1cIik7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBwYXJ0aWFsIHZhbHVlIHRvT2JqZWN0IGNvbnZlcnRlci5cclxuICogQHBhcmFtIHtDb2RlZ2VufSBnZW4gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBSZWZsZWN0ZWQgZmllbGRcclxuICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkSW5kZXggRmllbGQgaW5kZXhcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgcmVmZXJlbmNlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIGdlblZhbHVlUGFydGlhbF90b09iamVjdChnZW4sIGZpZWxkLCBmaWVsZEluZGV4LCBwcm9wKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSwgYmxvY2stc2NvcGVkLXZhciwgbm8tcmVkZWNsYXJlICovXHJcbiAgICBpZiAoZmllbGQucmVzb2x2ZWRUeXBlKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0pIGdlblxyXG4gICAgICAgICAgICAoXCJkJXM9by5lbnVtcz09PVN0cmluZz90eXBlc1slaV0udmFsdWVzW20lc106bSVzXCIsIHByb3AsIGZpZWxkSW5kZXgsIHByb3AsIHByb3ApO1xyXG4gICAgICAgIGVsc2UgZ2VuXHJcbiAgICAgICAgICAgIChcImQlcz10eXBlc1slaV0udG9PYmplY3QobSVzLG8pXCIsIHByb3AsIGZpZWxkSW5kZXgsIHByb3ApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgaXNVbnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZG91YmxlXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmbG9hdFwiOiBnZW5cclxuICAgICAgICAgICAgKFwiZCVzPW8uanNvbiYmIWlzRmluaXRlKG0lcyk/U3RyaW5nKG0lcyk6bSVzXCIsIHByb3AsIHByb3AsIHByb3AsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aW50NjRcIjpcclxuICAgICAgICAgICAgICAgIGlzVW5zaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1mYWxsdGhyb3VnaFxyXG4gICAgICAgICAgICBjYXNlIFwiaW50NjRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNpbnQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZml4ZWQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ZpeGVkNjRcIjogZ2VuXHJcbiAgICAgICAgICAgIChcImlmKHR5cGVvZiBtJXM9PT1cXFwibnVtYmVyXFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgIChcImQlcz1vLmxvbmdzPT09U3RyaW5nP1N0cmluZyhtJXMpOm0lc1wiLCBwcm9wLCBwcm9wLCBwcm9wKVxyXG4gICAgICAgICAgICAoXCJlbHNlXCIpIC8vIExvbmctbGlrZVxyXG4gICAgICAgICAgICAgICAgKFwiZCVzPW8ubG9uZ3M9PT1TdHJpbmc/dXRpbC5Mb25nLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG0lcyk6by5sb25ncz09PU51bWJlcj9uZXcgdXRpbC5Mb25nQml0cyhtJXMubG93Pj4+MCxtJXMuaGlnaD4+PjApLnRvTnVtYmVyKCVzKTptJXNcIiwgcHJvcCwgcHJvcCwgcHJvcCwgcHJvcCwgaXNVbnNpZ25lZCA/IFwidHJ1ZVwiOiBcIlwiLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnl0ZXNcIjogZ2VuXHJcbiAgICAgICAgICAgIChcImQlcz1vLmJ5dGVzPT09U3RyaW5nP3V0aWwuYmFzZTY0LmVuY29kZShtJXMsMCxtJXMubGVuZ3RoKTpvLmJ5dGVzPT09QXJyYXk/QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobSVzKTptJXNcIiwgcHJvcCwgcHJvcCwgcHJvcCwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogZ2VuXHJcbiAgICAgICAgICAgIChcImQlcz1tJXNcIiwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2VuO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSwgYmxvY2stc2NvcGVkLXZhciwgbm8tcmVkZWNsYXJlICovXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBydW50aW1lIG1lc3NhZ2UgdG8gcGxhaW4gb2JqZWN0IGNvbnZlcnRlciBzcGVjaWZpYyB0byB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UgdHlwZS5cclxuICogQHBhcmFtIHtUeXBlfSBtdHlwZSBNZXNzYWdlIHR5cGVcclxuICogQHJldHVybnMge0NvZGVnZW59IENvZGVnZW4gaW5zdGFuY2VcclxuICovXHJcbmNvbnZlcnRlci50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG10eXBlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSwgYmxvY2stc2NvcGVkLXZhciwgbm8tcmVkZWNsYXJlICovXHJcbiAgICB2YXIgZmllbGRzID0gbXR5cGUuZmllbGRzQXJyYXkuc2xpY2UoKS5zb3J0KHV0aWwuY29tcGFyZUZpZWxkc0J5SWQpO1xyXG4gICAgaWYgKCFmaWVsZHMubGVuZ3RoKVxyXG4gICAgICAgIHJldHVybiB1dGlsLmNvZGVnZW4oKShcInJldHVybiB7fVwiKTtcclxuICAgIHZhciBnZW4gPSB1dGlsLmNvZGVnZW4oW1wibVwiLCBcIm9cIl0sIG10eXBlLm5hbWUgKyBcIiR0b09iamVjdFwiKVxyXG4gICAgKFwiaWYoIW8pXCIpXHJcbiAgICAgICAgKFwibz17fVwiKVxyXG4gICAgKFwidmFyIGQ9e31cIik7XHJcblxyXG4gICAgdmFyIHJlcGVhdGVkRmllbGRzID0gW10sXHJcbiAgICAgICAgbWFwRmllbGRzID0gW10sXHJcbiAgICAgICAgbm9ybWFsRmllbGRzID0gW10sXHJcbiAgICAgICAgaSA9IDA7XHJcbiAgICBmb3IgKDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSlcclxuICAgICAgICBpZiAoIWZpZWxkc1tpXS5wYXJ0T2YpXHJcbiAgICAgICAgICAgICggZmllbGRzW2ldLnJlc29sdmUoKS5yZXBlYXRlZCA/IHJlcGVhdGVkRmllbGRzXHJcbiAgICAgICAgICAgIDogZmllbGRzW2ldLm1hcCA/IG1hcEZpZWxkc1xyXG4gICAgICAgICAgICA6IG5vcm1hbEZpZWxkcykucHVzaChmaWVsZHNbaV0pO1xyXG5cclxuICAgIGlmIChyZXBlYXRlZEZpZWxkcy5sZW5ndGgpIHsgZ2VuXHJcbiAgICAoXCJpZihvLmFycmF5c3x8by5kZWZhdWx0cyl7XCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXBlYXRlZEZpZWxkcy5sZW5ndGg7ICsraSkgZ2VuXHJcbiAgICAgICAgKFwiZCVzPVtdXCIsIHV0aWwuc2FmZVByb3AocmVwZWF0ZWRGaWVsZHNbaV0ubmFtZSkpO1xyXG4gICAgICAgIGdlblxyXG4gICAgKFwifVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWFwRmllbGRzLmxlbmd0aCkgeyBnZW5cclxuICAgIChcImlmKG8ub2JqZWN0c3x8by5kZWZhdWx0cyl7XCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtYXBGaWVsZHMubGVuZ3RoOyArK2kpIGdlblxyXG4gICAgICAgIChcImQlcz17fVwiLCB1dGlsLnNhZmVQcm9wKG1hcEZpZWxkc1tpXS5uYW1lKSk7XHJcbiAgICAgICAgZ2VuXHJcbiAgICAoXCJ9XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxGaWVsZHMubGVuZ3RoKSB7IGdlblxyXG4gICAgKFwiaWYoby5kZWZhdWx0cyl7XCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBub3JtYWxGaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gbm9ybWFsRmllbGRzW2ldLFxyXG4gICAgICAgICAgICAgICAgcHJvcCAgPSB1dGlsLnNhZmVQcm9wKGZpZWxkLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZmllbGQucmVzb2x2ZWRUeXBlIGluc3RhbmNlb2YgRW51bSkgZ2VuXHJcbiAgICAgICAgKFwiZCVzPW8uZW51bXM9PT1TdHJpbmc/JWo6JWpcIiwgcHJvcCwgZmllbGQucmVzb2x2ZWRUeXBlLnZhbHVlc0J5SWRbZmllbGQudHlwZURlZmF1bHRdLCBmaWVsZC50eXBlRGVmYXVsdCk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkLmxvbmcpIGdlblxyXG4gICAgICAgIChcImlmKHV0aWwuTG9uZyl7XCIpXHJcbiAgICAgICAgICAgIChcInZhciBuPW5ldyB1dGlsLkxvbmcoJWksJWksJWopXCIsIGZpZWxkLnR5cGVEZWZhdWx0LmxvdywgZmllbGQudHlwZURlZmF1bHQuaGlnaCwgZmllbGQudHlwZURlZmF1bHQudW5zaWduZWQpXHJcbiAgICAgICAgICAgIChcImQlcz1vLmxvbmdzPT09U3RyaW5nP24udG9TdHJpbmcoKTpvLmxvbmdzPT09TnVtYmVyP24udG9OdW1iZXIoKTpuXCIsIHByb3ApXHJcbiAgICAgICAgKFwifWVsc2VcIilcclxuICAgICAgICAgICAgKFwiZCVzPW8ubG9uZ3M9PT1TdHJpbmc/JWo6JWlcIiwgcHJvcCwgZmllbGQudHlwZURlZmF1bHQudG9TdHJpbmcoKSwgZmllbGQudHlwZURlZmF1bHQudG9OdW1iZXIoKSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkLmJ5dGVzKSBnZW5cclxuICAgICAgICAoXCJkJXM9by5ieXRlcz09PVN0cmluZz8lajolc1wiLCBwcm9wLCBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgZmllbGQudHlwZURlZmF1bHQpLCBcIltcIiArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZpZWxkLnR5cGVEZWZhdWx0KS5qb2luKFwiLFwiKSArIFwiXVwiKTtcclxuICAgICAgICAgICAgZWxzZSBnZW5cclxuICAgICAgICAoXCJkJXM9JWpcIiwgcHJvcCwgZmllbGQudHlwZURlZmF1bHQpOyAvLyBhbHNvIG1lc3NhZ2VzICg9bnVsbClcclxuICAgICAgICB9IGdlblxyXG4gICAgKFwifVwiKTtcclxuICAgIH1cclxuICAgIHZhciBoYXNLczIgPSBmYWxzZTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNbaV0sXHJcbiAgICAgICAgICAgIGluZGV4ID0gbXR5cGUuX2ZpZWxkc0FycmF5LmluZGV4T2YoZmllbGQpLFxyXG4gICAgICAgICAgICBwcm9wICA9IHV0aWwuc2FmZVByb3AoZmllbGQubmFtZSk7XHJcbiAgICAgICAgaWYgKGZpZWxkLm1hcCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc0tzMikgeyBoYXNLczIgPSB0cnVlOyBnZW5cclxuICAgIChcInZhciBrczJcIik7XHJcbiAgICAgICAgICAgIH0gZ2VuXHJcbiAgICAoXCJpZihtJXMmJihrczI9T2JqZWN0LmtleXMobSVzKSkubGVuZ3RoKXtcIiwgcHJvcCwgcHJvcClcclxuICAgICAgICAoXCJkJXM9e31cIiwgcHJvcClcclxuICAgICAgICAoXCJmb3IodmFyIGo9MDtqPGtzMi5sZW5ndGg7KytqKXtcIik7XHJcbiAgICAgICAgICAgIGdlblZhbHVlUGFydGlhbF90b09iamVjdChnZW4sIGZpZWxkLCAvKiBzb3J0ZWQgKi8gaW5kZXgsIHByb3AgKyBcIltrczJbal1dXCIpXHJcbiAgICAgICAgKFwifVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLnJlcGVhdGVkKSB7IGdlblxyXG4gICAgKFwiaWYobSVzJiZtJXMubGVuZ3RoKXtcIiwgcHJvcCwgcHJvcClcclxuICAgICAgICAoXCJkJXM9W11cIiwgcHJvcClcclxuICAgICAgICAoXCJmb3IodmFyIGo9MDtqPG0lcy5sZW5ndGg7KytqKXtcIiwgcHJvcCk7XHJcbiAgICAgICAgICAgIGdlblZhbHVlUGFydGlhbF90b09iamVjdChnZW4sIGZpZWxkLCAvKiBzb3J0ZWQgKi8gaW5kZXgsIHByb3AgKyBcIltqXVwiKVxyXG4gICAgICAgIChcIn1cIik7XHJcbiAgICAgICAgfSBlbHNlIHsgZ2VuXHJcbiAgICAoXCJpZihtJXMhPW51bGwmJm0uaGFzT3duUHJvcGVydHkoJWopKXtcIiwgcHJvcCwgZmllbGQubmFtZSk7IC8vICE9PSB1bmRlZmluZWQgJiYgIT09IG51bGxcclxuICAgICAgICBnZW5WYWx1ZVBhcnRpYWxfdG9PYmplY3QoZ2VuLCBmaWVsZCwgLyogc29ydGVkICovIGluZGV4LCBwcm9wKTtcclxuICAgICAgICBpZiAoZmllbGQucGFydE9mKSBnZW5cclxuICAgICAgICAoXCJpZihvLm9uZW9mcylcIilcclxuICAgICAgICAgICAgKFwiZCVzPSVqXCIsIHV0aWwuc2FmZVByb3AoZmllbGQucGFydE9mLm5hbWUpLCBmaWVsZC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2VuXHJcbiAgICAoXCJ9XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdlblxyXG4gICAgKFwicmV0dXJuIGRcIik7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxufTtcclxuXHJcbn0se1wiMTVcIjoxNSxcIjM3XCI6Mzd9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZXI7XHJcblxyXG52YXIgRW51bSAgICA9IHJlcXVpcmUoMTUpLFxyXG4gICAgdHlwZXMgICA9IHJlcXVpcmUoMzYpLFxyXG4gICAgdXRpbCAgICA9IHJlcXVpcmUoMzcpO1xyXG5cclxuZnVuY3Rpb24gbWlzc2luZyhmaWVsZCkge1xyXG4gICAgcmV0dXJuIFwibWlzc2luZyByZXF1aXJlZCAnXCIgKyBmaWVsZC5uYW1lICsgXCInXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBkZWNvZGVyIHNwZWNpZmljIHRvIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSB0eXBlLlxyXG4gKiBAcGFyYW0ge1R5cGV9IG10eXBlIE1lc3NhZ2UgdHlwZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKi9cclxuZnVuY3Rpb24gZGVjb2RlcihtdHlwZSkge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cclxuICAgIHZhciBnZW4gPSB1dGlsLmNvZGVnZW4oW1wiclwiLCBcImxcIl0sIG10eXBlLm5hbWUgKyBcIiRkZWNvZGVcIilcclxuICAgIChcImlmKCEociBpbnN0YW5jZW9mIFJlYWRlcikpXCIpXHJcbiAgICAgICAgKFwicj1SZWFkZXIuY3JlYXRlKHIpXCIpXHJcbiAgICAoXCJ2YXIgYz1sPT09dW5kZWZpbmVkP3IubGVuOnIucG9zK2wsbT1uZXcgdGhpcy5jdG9yXCIgKyAobXR5cGUuZmllbGRzQXJyYXkuZmlsdGVyKGZ1bmN0aW9uKGZpZWxkKSB7IHJldHVybiBmaWVsZC5tYXA7IH0pLmxlbmd0aCA/IFwiLGtcIiA6IFwiXCIpKVxyXG4gICAgKFwid2hpbGUoci5wb3M8Yyl7XCIpXHJcbiAgICAgICAgKFwidmFyIHQ9ci51aW50MzIoKVwiKTtcclxuICAgIGlmIChtdHlwZS5ncm91cCkgZ2VuXHJcbiAgICAgICAgKFwiaWYoKHQmNyk9PT00KVwiKVxyXG4gICAgICAgICAgICAoXCJicmVha1wiKTtcclxuICAgIGdlblxyXG4gICAgICAgIChcInN3aXRjaCh0Pj4+Myl7XCIpO1xyXG5cclxuICAgIHZhciBpID0gMDtcclxuICAgIGZvciAoOyBpIDwgLyogaW5pdGlhbGl6ZXMgKi8gbXR5cGUuZmllbGRzQXJyYXkubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZmllbGQgPSBtdHlwZS5fZmllbGRzQXJyYXlbaV0ucmVzb2x2ZSgpLFxyXG4gICAgICAgICAgICB0eXBlICA9IGZpZWxkLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0gPyBcImludDMyXCIgOiBmaWVsZC50eXBlLFxyXG4gICAgICAgICAgICByZWYgICA9IFwibVwiICsgdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKTsgZ2VuXHJcbiAgICAgICAgICAgIChcImNhc2UgJWk6XCIsIGZpZWxkLmlkKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGZpZWxkc1xyXG4gICAgICAgIGlmIChmaWVsZC5tYXApIHsgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJyLnNraXAoKS5wb3MrK1wiKSAvLyBhc3N1bWVzIGlkIDEgKyBrZXkgd2lyZVR5cGVcclxuICAgICAgICAgICAgICAgIChcImlmKCVzPT09dXRpbC5lbXB0eU9iamVjdClcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIChcIiVzPXt9XCIsIHJlZilcclxuICAgICAgICAgICAgICAgIChcIms9ci4lcygpXCIsIGZpZWxkLmtleVR5cGUpXHJcbiAgICAgICAgICAgICAgICAoXCJyLnBvcysrXCIpOyAvLyBhc3N1bWVzIGlkIDIgKyB2YWx1ZSB3aXJlVHlwZVxyXG4gICAgICAgICAgICBpZiAodHlwZXMubG9uZ1tmaWVsZC5rZXlUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZXMuYmFzaWNbdHlwZV0gPT09IHVuZGVmaW5lZCkgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCIlc1t0eXBlb2Ygaz09PVxcXCJvYmplY3RcXFwiP3V0aWwubG9uZ1RvSGFzaChrKTprXT10eXBlc1slaV0uZGVjb2RlKHIsci51aW50MzIoKSlcIiwgcmVmLCBpKTsgLy8gY2FuJ3QgYmUgZ3JvdXBzXHJcbiAgICAgICAgICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiJXNbdHlwZW9mIGs9PT1cXFwib2JqZWN0XFxcIj91dGlsLmxvbmdUb0hhc2goayk6a109ci4lcygpXCIsIHJlZiwgdHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZXMuYmFzaWNbdHlwZV0gPT09IHVuZGVmaW5lZCkgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCIlc1trXT10eXBlc1slaV0uZGVjb2RlKHIsci51aW50MzIoKSlcIiwgcmVmLCBpKTsgLy8gY2FuJ3QgYmUgZ3JvdXBzXHJcbiAgICAgICAgICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiJXNba109ci4lcygpXCIsIHJlZiwgdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVwZWF0ZWQgZmllbGRzXHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5yZXBlYXRlZCkgeyBnZW5cclxuXHJcbiAgICAgICAgICAgICAgICAoXCJpZighKCVzJiYlcy5sZW5ndGgpKVwiLCByZWYsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCIlcz1bXVwiLCByZWYpO1xyXG5cclxuICAgICAgICAgICAgLy8gUGFja2FibGUgKGFsd2F5cyBjaGVjayBmb3IgZm9yd2FyZCBhbmQgYmFja3dhcmQgY29tcGF0aWJsaXR5KVxyXG4gICAgICAgICAgICBpZiAodHlwZXMucGFja2VkW3R5cGVdICE9PSB1bmRlZmluZWQpIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiaWYoKHQmNyk9PT0yKXtcIilcclxuICAgICAgICAgICAgICAgICAgICAoXCJ2YXIgYzI9ci51aW50MzIoKStyLnBvc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIChcIndoaWxlKHIucG9zPGMyKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCIlcy5wdXNoKHIuJXMoKSlcIiwgcmVmLCB0eXBlKVxyXG4gICAgICAgICAgICAgICAgKFwifWVsc2VcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBOb24tcGFja2VkXHJcbiAgICAgICAgICAgIGlmICh0eXBlcy5iYXNpY1t0eXBlXSA9PT0gdW5kZWZpbmVkKSBnZW4oZmllbGQucmVzb2x2ZWRUeXBlLmdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcIiVzLnB1c2godHlwZXNbJWldLmRlY29kZShyKSlcIlxyXG4gICAgICAgICAgICAgICAgICAgIDogXCIlcy5wdXNoKHR5cGVzWyVpXS5kZWNvZGUocixyLnVpbnQzMigpKSlcIiwgcmVmLCBpKTtcclxuICAgICAgICAgICAgZWxzZSBnZW5cclxuICAgICAgICAgICAgICAgICAgICAoXCIlcy5wdXNoKHIuJXMoKSlcIiwgcmVmLCB0eXBlKTtcclxuXHJcbiAgICAgICAgLy8gTm9uLXJlcGVhdGVkXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlcy5iYXNpY1t0eXBlXSA9PT0gdW5kZWZpbmVkKSBnZW4oZmllbGQucmVzb2x2ZWRUeXBlLmdyb3VwXHJcbiAgICAgICAgICAgICAgICA/IFwiJXM9dHlwZXNbJWldLmRlY29kZShyKVwiXHJcbiAgICAgICAgICAgICAgICA6IFwiJXM9dHlwZXNbJWldLmRlY29kZShyLHIudWludDMyKCkpXCIsIHJlZiwgaSk7XHJcbiAgICAgICAgZWxzZSBnZW5cclxuICAgICAgICAgICAgICAgIChcIiVzPXIuJXMoKVwiLCByZWYsIHR5cGUpO1xyXG4gICAgICAgIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiYnJlYWtcIik7XHJcbiAgICAvLyBVbmtub3duIGZpZWxkc1xyXG4gICAgfSBnZW5cclxuICAgICAgICAgICAgKFwiZGVmYXVsdDpcIilcclxuICAgICAgICAgICAgICAgIChcInIuc2tpcFR5cGUodCY3KVwiKVxyXG4gICAgICAgICAgICAgICAgKFwiYnJlYWtcIilcclxuXHJcbiAgICAgICAgKFwifVwiKVxyXG4gICAgKFwifVwiKTtcclxuXHJcbiAgICAvLyBGaWVsZCBwcmVzZW5jZVxyXG4gICAgZm9yIChpID0gMDsgaSA8IG10eXBlLl9maWVsZHNBcnJheS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciByZmllbGQgPSBtdHlwZS5fZmllbGRzQXJyYXlbaV07XHJcbiAgICAgICAgaWYgKHJmaWVsZC5yZXF1aXJlZCkgZ2VuXHJcbiAgICAoXCJpZighbS5oYXNPd25Qcm9wZXJ0eSglaikpXCIsIHJmaWVsZC5uYW1lKVxyXG4gICAgICAgIChcInRocm93IHV0aWwuUHJvdG9jb2xFcnJvciglaix7aW5zdGFuY2U6bX0pXCIsIG1pc3NpbmcocmZpZWxkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdlblxyXG4gICAgKFwicmV0dXJuIG1cIik7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbn1cclxuXHJcbn0se1wiMTVcIjoxNSxcIjM2XCI6MzYsXCIzN1wiOjM3fV0sMTQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBlbmNvZGVyO1xyXG5cclxudmFyIEVudW0gICAgID0gcmVxdWlyZSgxNSksXHJcbiAgICB0eXBlcyAgICA9IHJlcXVpcmUoMzYpLFxyXG4gICAgdXRpbCAgICAgPSByZXF1aXJlKDM3KTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBwYXJ0aWFsIG1lc3NhZ2UgdHlwZSBlbmNvZGVyLlxyXG4gKiBAcGFyYW0ge0NvZGVnZW59IGdlbiBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7RmllbGR9IGZpZWxkIFJlZmxlY3RlZCBmaWVsZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmllbGRJbmRleCBGaWVsZCBpbmRleFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVmIFZhcmlhYmxlIHJlZmVyZW5jZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZW5UeXBlUGFydGlhbChnZW4sIGZpZWxkLCBmaWVsZEluZGV4LCByZWYpIHtcclxuICAgIHJldHVybiBmaWVsZC5yZXNvbHZlZFR5cGUuZ3JvdXBcclxuICAgICAgICA/IGdlbihcInR5cGVzWyVpXS5lbmNvZGUoJXMsdy51aW50MzIoJWkpKS51aW50MzIoJWkpXCIsIGZpZWxkSW5kZXgsIHJlZiwgKGZpZWxkLmlkIDw8IDMgfCAzKSA+Pj4gMCwgKGZpZWxkLmlkIDw8IDMgfCA0KSA+Pj4gMClcclxuICAgICAgICA6IGdlbihcInR5cGVzWyVpXS5lbmNvZGUoJXMsdy51aW50MzIoJWkpLmZvcmsoKSkubGRlbGltKClcIiwgZmllbGRJbmRleCwgcmVmLCAoZmllbGQuaWQgPDwgMyB8IDIpID4+PiAwKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhbiBlbmNvZGVyIHNwZWNpZmljIHRvIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSB0eXBlLlxyXG4gKiBAcGFyYW0ge1R5cGV9IG10eXBlIE1lc3NhZ2UgdHlwZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKi9cclxuZnVuY3Rpb24gZW5jb2RlcihtdHlwZSkge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUsIGJsb2NrLXNjb3BlZC12YXIsIG5vLXJlZGVjbGFyZSAqL1xyXG4gICAgdmFyIGdlbiA9IHV0aWwuY29kZWdlbihbXCJtXCIsIFwid1wiXSwgbXR5cGUubmFtZSArIFwiJGVuY29kZVwiKVxyXG4gICAgKFwiaWYoIXcpXCIpXHJcbiAgICAgICAgKFwidz1Xcml0ZXIuY3JlYXRlKClcIik7XHJcblxyXG4gICAgdmFyIGksIHJlZjtcclxuXHJcbiAgICAvLyBcIndoZW4gYSBtZXNzYWdlIGlzIHNlcmlhbGl6ZWQgaXRzIGtub3duIGZpZWxkcyBzaG91bGQgYmUgd3JpdHRlbiBzZXF1ZW50aWFsbHkgYnkgZmllbGQgbnVtYmVyXCJcclxuICAgIHZhciBmaWVsZHMgPSAvKiBpbml0aWFsaXplcyAqLyBtdHlwZS5maWVsZHNBcnJheS5zbGljZSgpLnNvcnQodXRpbC5jb21wYXJlRmllbGRzQnlJZCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZmllbGQgICAgPSBmaWVsZHNbaV0ucmVzb2x2ZSgpLFxyXG4gICAgICAgICAgICBpbmRleCAgICA9IG10eXBlLl9maWVsZHNBcnJheS5pbmRleE9mKGZpZWxkKSxcclxuICAgICAgICAgICAgdHlwZSAgICAgPSBmaWVsZC5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtID8gXCJpbnQzMlwiIDogZmllbGQudHlwZSxcclxuICAgICAgICAgICAgd2lyZVR5cGUgPSB0eXBlcy5iYXNpY1t0eXBlXTtcclxuICAgICAgICAgICAgcmVmICAgICAgPSBcIm1cIiArIHV0aWwuc2FmZVByb3AoZmllbGQubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBmaWVsZHNcclxuICAgICAgICBpZiAoZmllbGQubWFwKSB7XHJcbiAgICAgICAgICAgIGdlblxyXG4gICAgKFwiaWYoJXMhPW51bGwmJm0uaGFzT3duUHJvcGVydHkoJWopKXtcIiwgcmVmLCBmaWVsZC5uYW1lKSAvLyAhPT0gdW5kZWZpbmVkICYmICE9PSBudWxsXHJcbiAgICAgICAgKFwiZm9yKHZhciBrcz1PYmplY3Qua2V5cyglcyksaT0wO2k8a3MubGVuZ3RoOysraSl7XCIsIHJlZilcclxuICAgICAgICAgICAgKFwidy51aW50MzIoJWkpLmZvcmsoKS51aW50MzIoJWkpLiVzKGtzW2ldKVwiLCAoZmllbGQuaWQgPDwgMyB8IDIpID4+PiAwLCA4IHwgdHlwZXMubWFwS2V5W2ZpZWxkLmtleVR5cGVdLCBmaWVsZC5rZXlUeXBlKTtcclxuICAgICAgICAgICAgaWYgKHdpcmVUeXBlID09PSB1bmRlZmluZWQpIGdlblxyXG4gICAgICAgICAgICAoXCJ0eXBlc1slaV0uZW5jb2RlKCVzW2tzW2ldXSx3LnVpbnQzMigxOCkuZm9yaygpKS5sZGVsaW0oKS5sZGVsaW0oKVwiLCBpbmRleCwgcmVmKTsgLy8gY2FuJ3QgYmUgZ3JvdXBzXHJcbiAgICAgICAgICAgIGVsc2UgZ2VuXHJcbiAgICAgICAgICAgIChcIi51aW50MzIoJWkpLiVzKCVzW2tzW2ldXSkubGRlbGltKClcIiwgMTYgfCB3aXJlVHlwZSwgdHlwZSwgcmVmKTtcclxuICAgICAgICAgICAgZ2VuXHJcbiAgICAgICAgKFwifVwiKVxyXG4gICAgKFwifVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlcGVhdGVkIGZpZWxkc1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQucmVwZWF0ZWQpIHsgZ2VuXHJcbiAgICAoXCJpZiglcyE9bnVsbCYmJXMubGVuZ3RoKXtcIiwgcmVmLCByZWYpOyAvLyAhPT0gdW5kZWZpbmVkICYmICE9PSBudWxsXHJcblxyXG4gICAgICAgICAgICAvLyBQYWNrZWQgcmVwZWF0ZWRcclxuICAgICAgICAgICAgaWYgKGZpZWxkLnBhY2tlZCAmJiB0eXBlcy5wYWNrZWRbdHlwZV0gIT09IHVuZGVmaW5lZCkgeyBnZW5cclxuXHJcbiAgICAgICAgKFwidy51aW50MzIoJWkpLmZvcmsoKVwiLCAoZmllbGQuaWQgPDwgMyB8IDIpID4+PiAwKVxyXG4gICAgICAgIChcImZvcih2YXIgaT0wO2k8JXMubGVuZ3RoOysraSlcIiwgcmVmKVxyXG4gICAgICAgICAgICAoXCJ3LiVzKCVzW2ldKVwiLCB0eXBlLCByZWYpXHJcbiAgICAgICAgKFwidy5sZGVsaW0oKVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vbi1wYWNrZWRcclxuICAgICAgICAgICAgfSBlbHNlIHsgZ2VuXHJcblxyXG4gICAgICAgIChcImZvcih2YXIgaT0wO2k8JXMubGVuZ3RoOysraSlcIiwgcmVmKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aXJlVHlwZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBnZW5UeXBlUGFydGlhbChnZW4sIGZpZWxkLCBpbmRleCwgcmVmICsgXCJbaV1cIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgICAgICAoXCJ3LnVpbnQzMiglaSkuJXMoJXNbaV0pXCIsIChmaWVsZC5pZCA8PCAzIHwgd2lyZVR5cGUpID4+PiAwLCB0eXBlLCByZWYpO1xyXG5cclxuICAgICAgICAgICAgfSBnZW5cclxuICAgIChcIn1cIik7XHJcblxyXG4gICAgICAgIC8vIE5vbi1yZXBlYXRlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5vcHRpb25hbCkgZ2VuXHJcbiAgICAoXCJpZiglcyE9bnVsbCYmbS5oYXNPd25Qcm9wZXJ0eSglaikpXCIsIHJlZiwgZmllbGQubmFtZSk7IC8vICE9PSB1bmRlZmluZWQgJiYgIT09IG51bGxcclxuXHJcbiAgICAgICAgICAgIGlmICh3aXJlVHlwZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGdlblR5cGVQYXJ0aWFsKGdlbiwgZmllbGQsIGluZGV4LCByZWYpO1xyXG4gICAgICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgIChcIncudWludDMyKCVpKS4lcyglcylcIiwgKGZpZWxkLmlkIDw8IDMgfCB3aXJlVHlwZSkgPj4+IDAsIHR5cGUsIHJlZik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2VuXHJcbiAgICAoXCJyZXR1cm4gd1wiKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUsIGJsb2NrLXNjb3BlZC12YXIsIG5vLXJlZGVjbGFyZSAqL1xyXG59XHJcbn0se1wiMTVcIjoxNSxcIjM2XCI6MzYsXCIzN1wiOjM3fV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFbnVtO1xyXG5cclxuLy8gZXh0ZW5kcyBSZWZsZWN0aW9uT2JqZWN0XHJcbnZhciBSZWZsZWN0aW9uT2JqZWN0ID0gcmVxdWlyZSgyNCk7XHJcbigoRW51bS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBFbnVtKS5jbGFzc05hbWUgPSBcIkVudW1cIjtcclxuXHJcbnZhciBOYW1lc3BhY2UgPSByZXF1aXJlKDIzKSxcclxuICAgIHV0aWwgPSByZXF1aXJlKDM3KTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGVudW0gaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgUmVmbGVjdGVkIGVudW0uXHJcbiAqIEBleHRlbmRzIFJlZmxlY3Rpb25PYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFVuaXF1ZSBuYW1lIHdpdGhpbiBpdHMgbmFtZXNwYWNlXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsbnVtYmVyPn0gW3ZhbHVlc10gRW51bSB2YWx1ZXMgYXMgYW4gb2JqZWN0LCBieSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29tbWVudF0gVGhlIGNvbW1lbnQgZm9yIHRoaXMgZW51bVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLHN0cmluZz59IFtjb21tZW50c10gVGhlIHZhbHVlIGNvbW1lbnRzIGZvciB0aGlzIGVudW1cclxuICovXHJcbmZ1bmN0aW9uIEVudW0obmFtZSwgdmFsdWVzLCBvcHRpb25zLCBjb21tZW50LCBjb21tZW50cykge1xyXG4gICAgUmVmbGVjdGlvbk9iamVjdC5jYWxsKHRoaXMsIG5hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmICh2YWx1ZXMgJiYgdHlwZW9mIHZhbHVlcyAhPT0gXCJvYmplY3RcIilcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJ2YWx1ZXMgbXVzdCBiZSBhbiBvYmplY3RcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbnVtIHZhbHVlcyBieSBpZC5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPG51bWJlcixzdHJpbmc+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnZhbHVlc0J5SWQgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVudW0gdmFsdWVzIGJ5IG5hbWUuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsbnVtYmVyPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy52YWx1ZXMgPSBPYmplY3QuY3JlYXRlKHRoaXMudmFsdWVzQnlJZCk7IC8vIHRvSlNPTiwgbWFya2VyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbnVtIGNvbW1lbnQgdGV4dC5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb21tZW50ID0gY29tbWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbHVlIGNvbW1lbnQgdGV4dHMsIGlmIGFueS5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxzdHJpbmc+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbW1lbnRzID0gY29tbWVudHMgfHwge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNlcnZlZCByYW5nZXMsIGlmIGFueS5cclxuICAgICAqIEB0eXBlIHtBcnJheS48bnVtYmVyW118c3RyaW5nPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNlcnZlZCA9IHVuZGVmaW5lZDsgLy8gdG9KU09OXHJcblxyXG4gICAgLy8gTm90ZSB0aGF0IHZhbHVlcyBpbmhlcml0IHZhbHVlc0J5SWQgb24gdGhlaXIgcHJvdG90eXBlIHdoaWNoIG1ha2VzIHRoZW0gYSBUeXBlU2NyaXB0LVxyXG4gICAgLy8gY29tcGF0aWJsZSBlbnVtLiBUaGlzIGlzIHVzZWQgYnkgcGJ0cyB0byB3cml0ZSBhY3R1YWwgZW51bSBkZWZpbml0aW9ucyB0aGF0IHdvcmsgZm9yXHJcbiAgICAvLyBzdGF0aWMgYW5kIHJlZmxlY3Rpb24gY29kZSBhbGlrZSBpbnN0ZWFkIG9mIGVtaXR0aW5nIGdlbmVyaWMgb2JqZWN0IGRlZmluaXRpb25zLlxyXG5cclxuICAgIGlmICh2YWx1ZXMpXHJcbiAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZXNba2V5c1tpXV0gPT09IFwibnVtYmVyXCIpIC8vIHVzZSBmb3J3YXJkIGVudHJpZXMgb25seVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNCeUlkWyB0aGlzLnZhbHVlc1trZXlzW2ldXSA9IHZhbHVlc1trZXlzW2ldXSBdID0ga2V5c1tpXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW0gZGVzY3JpcHRvci5cclxuICogQGludGVyZmFjZSBJRW51bVxyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLG51bWJlcj59IHZhbHVlcyBFbnVtIHZhbHVlc1xyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRW51bSBvcHRpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYW4gZW51bSBmcm9tIGFuIGVudW0gZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRW51bSBuYW1lXHJcbiAqIEBwYXJhbSB7SUVudW19IGpzb24gRW51bSBkZXNjcmlwdG9yXHJcbiAqIEByZXR1cm5zIHtFbnVtfSBDcmVhdGVkIGVudW1cclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbkVudW0uZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihuYW1lLCBqc29uKSB7XHJcbiAgICB2YXIgZW5tID0gbmV3IEVudW0obmFtZSwganNvbi52YWx1ZXMsIGpzb24ub3B0aW9ucywganNvbi5jb21tZW50LCBqc29uLmNvbW1lbnRzKTtcclxuICAgIGVubS5yZXNlcnZlZCA9IGpzb24ucmVzZXJ2ZWQ7XHJcbiAgICByZXR1cm4gZW5tO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgZW51bSB0byBhbiBlbnVtIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7SUVudW19IEVudW0gZGVzY3JpcHRvclxyXG4gKi9cclxuRW51bS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKHRvSlNPTk9wdGlvbnMpIHtcclxuICAgIHZhciBrZWVwQ29tbWVudHMgPSB0b0pTT05PcHRpb25zID8gQm9vbGVhbih0b0pTT05PcHRpb25zLmtlZXBDb21tZW50cykgOiBmYWxzZTtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcIm9wdGlvbnNcIiAgLCB0aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgXCJ2YWx1ZXNcIiAgICwgdGhpcy52YWx1ZXMsXHJcbiAgICAgICAgXCJyZXNlcnZlZFwiICwgdGhpcy5yZXNlcnZlZCAmJiB0aGlzLnJlc2VydmVkLmxlbmd0aCA/IHRoaXMucmVzZXJ2ZWQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJjb21tZW50XCIgICwga2VlcENvbW1lbnRzID8gdGhpcy5jb21tZW50IDogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwiY29tbWVudHNcIiAsIGtlZXBDb21tZW50cyA/IHRoaXMuY29tbWVudHMgOiB1bmRlZmluZWRcclxuICAgIF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSB2YWx1ZSB0byB0aGlzIGVudW0uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFZhbHVlIG5hbWVcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIFZhbHVlIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29tbWVudF0gQ29tbWVudCwgaWYgYW55XHJcbiAqIEByZXR1cm5zIHtFbnVtfSBgdGhpc2BcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZXJlIGlzIGFscmVhZHkgYSB2YWx1ZSB3aXRoIHRoaXMgbmFtZSBvciBpZFxyXG4gKi9cclxuRW51bS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKG5hbWUsIGlkLCBjb21tZW50KSB7XHJcbiAgICAvLyB1dGlsaXplZCBieSB0aGUgcGFyc2VyIGJ1dCBub3QgYnkgLmZyb21KU09OXHJcblxyXG4gICAgaWYgKCF1dGlsLmlzU3RyaW5nKG5hbWUpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIm5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuXHJcbiAgICBpZiAoIXV0aWwuaXNJbnRlZ2VyKGlkKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJpZCBtdXN0IGJlIGFuIGludGVnZXJcIik7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWVzW25hbWVdICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJkdXBsaWNhdGUgbmFtZSAnXCIgKyBuYW1lICsgXCInIGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNSZXNlcnZlZElkKGlkKSlcclxuICAgICAgICB0aHJvdyBFcnJvcihcImlkIFwiICsgaWQgKyBcIiBpcyByZXNlcnZlZCBpbiBcIiArIHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLmlzUmVzZXJ2ZWROYW1lKG5hbWUpKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwibmFtZSAnXCIgKyBuYW1lICsgXCInIGlzIHJlc2VydmVkIGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWVzQnlJZFtpZF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICghKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYWxsb3dfYWxpYXMpKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImR1cGxpY2F0ZSBpZCBcIiArIGlkICsgXCIgaW4gXCIgKyB0aGlzKTtcclxuICAgICAgICB0aGlzLnZhbHVlc1tuYW1lXSA9IGlkO1xyXG4gICAgfSBlbHNlXHJcbiAgICAgICAgdGhpcy52YWx1ZXNCeUlkW3RoaXMudmFsdWVzW25hbWVdID0gaWRdID0gbmFtZTtcclxuXHJcbiAgICB0aGlzLmNvbW1lbnRzW25hbWVdID0gY29tbWVudCB8fCBudWxsO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIHZhbHVlIGZyb20gdGhpcyBlbnVtXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFZhbHVlIG5hbWVcclxuICogQHJldHVybnMge0VudW19IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYG5hbWVgIGlzIG5vdCBhIG5hbWUgb2YgdGhpcyBlbnVtXHJcbiAqL1xyXG5FbnVtLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xyXG5cclxuICAgIGlmICghdXRpbC5pc1N0cmluZyhuYW1lKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJuYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgdmFyIHZhbCA9IHRoaXMudmFsdWVzW25hbWVdO1xyXG4gICAgaWYgKHZhbCA9PSBudWxsKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwibmFtZSAnXCIgKyBuYW1lICsgXCInIGRvZXMgbm90IGV4aXN0IGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgZGVsZXRlIHRoaXMudmFsdWVzQnlJZFt2YWxdO1xyXG4gICAgZGVsZXRlIHRoaXMudmFsdWVzW25hbWVdO1xyXG4gICAgZGVsZXRlIHRoaXMuY29tbWVudHNbbmFtZV07XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBpZCBpcyByZXNlcnZlZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIElkIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiByZXNlcnZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcclxuICovXHJcbkVudW0ucHJvdG90eXBlLmlzUmVzZXJ2ZWRJZCA9IGZ1bmN0aW9uIGlzUmVzZXJ2ZWRJZChpZCkge1xyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5pc1Jlc2VydmVkSWQodGhpcy5yZXNlcnZlZCwgaWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgbmFtZSBpcyByZXNlcnZlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcmVzZXJ2ZWQsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAqL1xyXG5FbnVtLnByb3RvdHlwZS5pc1Jlc2VydmVkTmFtZSA9IGZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBOYW1lc3BhY2UuaXNSZXNlcnZlZE5hbWUodGhpcy5yZXNlcnZlZCwgbmFtZSk7XHJcbn07XHJcblxyXG59LHtcIjIzXCI6MjMsXCIyNFwiOjI0LFwiMzdcIjozN31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGQ7XHJcblxyXG4vLyBleHRlbmRzIFJlZmxlY3Rpb25PYmplY3RcclxudmFyIFJlZmxlY3Rpb25PYmplY3QgPSByZXF1aXJlKDI0KTtcclxuKChGaWVsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBGaWVsZCkuY2xhc3NOYW1lID0gXCJGaWVsZFwiO1xyXG5cclxudmFyIEVudW0gID0gcmVxdWlyZSgxNSksXHJcbiAgICB0eXBlcyA9IHJlcXVpcmUoMzYpLFxyXG4gICAgdXRpbCAgPSByZXF1aXJlKDM3KTtcclxuXHJcbnZhciBUeXBlOyAvLyBjeWNsaWNcclxuXHJcbnZhciBydWxlUmUgPSAvXnJlcXVpcmVkfG9wdGlvbmFsfHJlcGVhdGVkJC87XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBtZXNzYWdlIGZpZWxkIGluc3RhbmNlLiBOb3RlIHRoYXQge0BsaW5rIE1hcEZpZWxkfG1hcCBmaWVsZHN9IGhhdmUgdGhlaXIgb3duIGNsYXNzLlxyXG4gKiBAbmFtZSBGaWVsZFxyXG4gKiBAY2xhc3NkZXNjIFJlZmxlY3RlZCBtZXNzYWdlIGZpZWxkLlxyXG4gKiBAZXh0ZW5kcyBGaWVsZEJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFVuaXF1ZSBuYW1lIHdpdGhpbiBpdHMgbmFtZXNwYWNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCBVbmlxdWUgaWQgd2l0aGluIGl0cyBuYW1lc3BhY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVmFsdWUgdHlwZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3QuPHN0cmluZywqPn0gW3J1bGU9XCJvcHRpb25hbFwiXSBGaWVsZCBydWxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdC48c3RyaW5nLCo+fSBbZXh0ZW5kXSBFeHRlbmRlZCB0eXBlIGlmIGRpZmZlcmVudCBmcm9tIHBhcmVudFxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRGVjbGFyZWQgb3B0aW9uc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgZmllbGQgZnJvbSBhIGZpZWxkIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEZpZWxkIG5hbWVcclxuICogQHBhcmFtIHtJRmllbGR9IGpzb24gRmllbGQgZGVzY3JpcHRvclxyXG4gKiBAcmV0dXJucyB7RmllbGR9IENyZWF0ZWQgZmllbGRcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbkZpZWxkLmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04obmFtZSwganNvbikge1xyXG4gICAgcmV0dXJuIG5ldyBGaWVsZChuYW1lLCBqc29uLmlkLCBqc29uLnR5cGUsIGpzb24ucnVsZSwganNvbi5leHRlbmQsIGpzb24ub3B0aW9ucywganNvbi5jb21tZW50KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3QgYW4gYWN0dWFsIGNvbnN0cnVjdG9yLiBVc2Uge0BsaW5rIEZpZWxkfSBpbnN0ZWFkLlxyXG4gKiBAY2xhc3NkZXNjIEJhc2UgY2xhc3Mgb2YgYWxsIHJlZmxlY3RlZCBtZXNzYWdlIGZpZWxkcy4gVGhpcyBpcyBub3QgYW4gYWN0dWFsIGNsYXNzIGJ1dCBoZXJlIGZvciB0aGUgc2FrZSBvZiBoYXZpbmcgY29uc2lzdGVudCB0eXBlIGRlZmluaXRpb25zLlxyXG4gKiBAZXhwb3J0cyBGaWVsZEJhc2VcclxuICogQGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVW5pcXVlIG5hbWUgd2l0aGluIGl0cyBuYW1lc3BhY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIFVuaXF1ZSBpZCB3aXRoaW4gaXRzIG5hbWVzcGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBWYWx1ZSB0eXBlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdC48c3RyaW5nLCo+fSBbcnVsZT1cIm9wdGlvbmFsXCJdIEZpZWxkIHJ1bGVcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0LjxzdHJpbmcsKj59IFtleHRlbmRdIEV4dGVuZGVkIHR5cGUgaWYgZGlmZmVyZW50IGZyb20gcGFyZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29tbWVudF0gQ29tbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBmaWVsZFxyXG4gKi9cclxuZnVuY3Rpb24gRmllbGQobmFtZSwgaWQsIHR5cGUsIHJ1bGUsIGV4dGVuZCwgb3B0aW9ucywgY29tbWVudCkge1xyXG5cclxuICAgIGlmICh1dGlsLmlzT2JqZWN0KHJ1bGUpKSB7XHJcbiAgICAgICAgY29tbWVudCA9IGV4dGVuZDtcclxuICAgICAgICBvcHRpb25zID0gcnVsZTtcclxuICAgICAgICBydWxlID0gZXh0ZW5kID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIGlmICh1dGlsLmlzT2JqZWN0KGV4dGVuZCkpIHtcclxuICAgICAgICBjb21tZW50ID0gb3B0aW9ucztcclxuICAgICAgICBvcHRpb25zID0gZXh0ZW5kO1xyXG4gICAgICAgIGV4dGVuZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBSZWZsZWN0aW9uT2JqZWN0LmNhbGwodGhpcywgbmFtZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKCF1dGlsLmlzSW50ZWdlcihpZCkgfHwgaWQgPCAwKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcImlkIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlclwiKTtcclxuXHJcbiAgICBpZiAoIXV0aWwuaXNTdHJpbmcodHlwZSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwidHlwZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG5cclxuICAgIGlmIChydWxlICE9PSB1bmRlZmluZWQgJiYgIXJ1bGVSZS50ZXN0KHJ1bGUgPSBydWxlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicnVsZSBtdXN0IGJlIGEgc3RyaW5nIHJ1bGVcIik7XHJcblxyXG4gICAgaWYgKGV4dGVuZCAhPT0gdW5kZWZpbmVkICYmICF1dGlsLmlzU3RyaW5nKGV4dGVuZCkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiZXh0ZW5kIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWVsZCBydWxlLCBpZiBhbnkuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5ydWxlID0gcnVsZSAmJiBydWxlICE9PSBcIm9wdGlvbmFsXCIgPyBydWxlIDogdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpZWxkIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBmaWVsZCBpZC5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaWQgPSBpZDsgLy8gdG9KU09OLCBtYXJrZXJcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dGVuZGVkIHR5cGUgaWYgZGlmZmVyZW50IGZyb20gcGFyZW50LlxyXG4gICAgICogQHR5cGUge3N0cmluZ3x1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXh0ZW5kID0gZXh0ZW5kIHx8IHVuZGVmaW5lZDsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXF1aXJlZCA9IHJ1bGUgPT09IFwicmVxdWlyZWRcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBmaWVsZCBpcyBvcHRpb25hbC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLm9wdGlvbmFsID0gIXRoaXMucmVxdWlyZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoaXMgZmllbGQgaXMgcmVwZWF0ZWQuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXBlYXRlZCA9IHJ1bGUgPT09IFwicmVwZWF0ZWRcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBmaWVsZCBpcyBhIG1hcCBvciBub3QuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXAgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lc3NhZ2UgdGhpcyBmaWVsZCBiZWxvbmdzIHRvLlxyXG4gICAgICogQHR5cGUge1R5cGV8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9uZU9mIHRoaXMgZmllbGQgYmVsb25ncyB0bywgaWYgYW55LFxyXG4gICAgICogQHR5cGUge09uZU9mfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGFydE9mID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWVsZCB0eXBlJ3MgZGVmYXVsdCB2YWx1ZS5cclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGVEZWZhdWx0ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWVsZCdzIGRlZmF1bHQgdmFsdWUgb24gcHJvdG90eXBlcy5cclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoaXMgZmllbGQncyB2YWx1ZSBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIGxvbmcuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5sb25nID0gdXRpbC5Mb25nID8gdHlwZXMubG9uZ1t0eXBlXSAhPT0gdW5kZWZpbmVkIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoaXMgZmllbGQncyB2YWx1ZSBpcyBhIGJ1ZmZlci5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJ5dGVzID0gdHlwZSA9PT0gXCJieXRlc1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZWQgdHlwZSBpZiBub3QgYSBiYXNpYyB0eXBlLlxyXG4gICAgICogQHR5cGUge1R5cGV8RW51bXxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc29sdmVkVHlwZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaXN0ZXItZmllbGQgd2l0aGluIHRoZSBleHRlbmRlZCB0eXBlIGlmIGEgZGVjbGFyaW5nIGV4dGVuc2lvbiBmaWVsZC5cclxuICAgICAqIEB0eXBlIHtGaWVsZHxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmV4dGVuc2lvbkZpZWxkID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNpc3Rlci1maWVsZCB3aXRoaW4gdGhlIGRlY2xhcmluZyBuYW1lc3BhY2UgaWYgYW4gZXh0ZW5kZWQgZmllbGQuXHJcbiAgICAgKiBAdHlwZSB7RmllbGR8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kZWNsYXJpbmdGaWVsZCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbGx5IHJlbWVtYmVycyB3aGV0aGVyIHRoaXMgZmllbGQgaXMgcGFja2VkLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW58bnVsbH1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX3BhY2tlZCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21tZW50IGZvciB0aGlzIGZpZWxkLlxyXG4gICAgICogQHR5cGUge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50O1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgZmllbGQgaXMgcGFja2VkLiBPbmx5IHJlbGV2YW50IHdoZW4gcmVwZWF0ZWQgYW5kIHdvcmtpbmcgd2l0aCBwcm90bzIuXHJcbiAqIEBuYW1lIEZpZWxkI3BhY2tlZFxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICogQHJlYWRvbmx5XHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRmllbGQucHJvdG90eXBlLCBcInBhY2tlZFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGRlZmF1bHRzIHRvIHBhY2tlZD10cnVlIGlmIG5vdCBleHBsaWNpdHkgc2V0IHRvIGZhbHNlXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhY2tlZCA9PT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fcGFja2VkID0gdGhpcy5nZXRPcHRpb24oXCJwYWNrZWRcIikgIT09IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYWNrZWQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuRmllbGQucHJvdG90eXBlLnNldE9wdGlvbiA9IGZ1bmN0aW9uIHNldE9wdGlvbihuYW1lLCB2YWx1ZSwgaWZOb3RTZXQpIHtcclxuICAgIGlmIChuYW1lID09PSBcInBhY2tlZFwiKSAvLyBjbGVhciBjYWNoZWQgYmVmb3JlIHNldHRpbmdcclxuICAgICAgICB0aGlzLl9wYWNrZWQgPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLnNldE9wdGlvbi5jYWxsKHRoaXMsIG5hbWUsIHZhbHVlLCBpZk5vdFNldCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmllbGQgZGVzY3JpcHRvci5cclxuICogQGludGVyZmFjZSBJRmllbGRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtydWxlPVwib3B0aW9uYWxcIl0gRmllbGQgcnVsZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHlwZSBGaWVsZCB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpZCBGaWVsZCBpZFxyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRmllbGQgb3B0aW9uc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFeHRlbnNpb24gZmllbGQgZGVzY3JpcHRvci5cclxuICogQGludGVyZmFjZSBJRXh0ZW5zaW9uRmllbGRcclxuICogQGV4dGVuZHMgSUZpZWxkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleHRlbmQgRXh0ZW5kZWQgdHlwZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIGZpZWxkIHRvIGEgZmllbGQgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJRmllbGR9IEZpZWxkIGRlc2NyaXB0b3JcclxuICovXHJcbkZpZWxkLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04odG9KU09OT3B0aW9ucykge1xyXG4gICAgdmFyIGtlZXBDb21tZW50cyA9IHRvSlNPTk9wdGlvbnMgPyBCb29sZWFuKHRvSlNPTk9wdGlvbnMua2VlcENvbW1lbnRzKSA6IGZhbHNlO1xyXG4gICAgcmV0dXJuIHV0aWwudG9PYmplY3QoW1xyXG4gICAgICAgIFwicnVsZVwiICAgICwgdGhpcy5ydWxlICE9PSBcIm9wdGlvbmFsXCIgJiYgdGhpcy5ydWxlIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIiAgICAsIHRoaXMudHlwZSxcclxuICAgICAgICBcImlkXCIgICAgICAsIHRoaXMuaWQsXHJcbiAgICAgICAgXCJleHRlbmRcIiAgLCB0aGlzLmV4dGVuZCxcclxuICAgICAgICBcIm9wdGlvbnNcIiAsIHRoaXMub3B0aW9ucyxcclxuICAgICAgICBcImNvbW1lbnRcIiAsIGtlZXBDb21tZW50cyA/IHRoaXMuY29tbWVudCA6IHVuZGVmaW5lZFxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzb2x2ZXMgdGhpcyBmaWVsZCdzIHR5cGUgcmVmZXJlbmNlcy5cclxuICogQHJldHVybnMge0ZpZWxkfSBgdGhpc2BcclxuICogQHRocm93cyB7RXJyb3J9IElmIGFueSByZWZlcmVuY2UgY2Fubm90IGJlIHJlc29sdmVkXHJcbiAqL1xyXG5GaWVsZC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucmVzb2x2ZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgaWYgKCh0aGlzLnR5cGVEZWZhdWx0ID0gdHlwZXMuZGVmYXVsdHNbdGhpcy50eXBlXSkgPT09IHVuZGVmaW5lZCkgeyAvLyBpZiBub3QgYSBiYXNpYyB0eXBlLCByZXNvbHZlIGl0XHJcbiAgICAgICAgdGhpcy5yZXNvbHZlZFR5cGUgPSAodGhpcy5kZWNsYXJpbmdGaWVsZCA/IHRoaXMuZGVjbGFyaW5nRmllbGQucGFyZW50IDogdGhpcy5wYXJlbnQpLmxvb2t1cFR5cGVPckVudW0odGhpcy50eXBlKTtcclxuICAgICAgICBpZiAodGhpcy5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBUeXBlKVxyXG4gICAgICAgICAgICB0aGlzLnR5cGVEZWZhdWx0ID0gbnVsbDtcclxuICAgICAgICBlbHNlIC8vIGluc3RhbmNlb2YgRW51bVxyXG4gICAgICAgICAgICB0aGlzLnR5cGVEZWZhdWx0ID0gdGhpcy5yZXNvbHZlZFR5cGUudmFsdWVzW09iamVjdC5rZXlzKHRoaXMucmVzb2x2ZWRUeXBlLnZhbHVlcylbMF1dOyAvLyBmaXJzdCBkZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlIGV4cGxpY2l0bHkgc2V0IGRlZmF1bHQgdmFsdWUgaWYgcHJlc2VudFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnNbXCJkZWZhdWx0XCJdICE9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnR5cGVEZWZhdWx0ID0gdGhpcy5vcHRpb25zW1wiZGVmYXVsdFwiXTtcclxuICAgICAgICBpZiAodGhpcy5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtICYmIHR5cGVvZiB0aGlzLnR5cGVEZWZhdWx0ID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICB0aGlzLnR5cGVEZWZhdWx0ID0gdGhpcy5yZXNvbHZlZFR5cGUudmFsdWVzW3RoaXMudHlwZURlZmF1bHRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB1bm5lY2Vzc2FyeSBvcHRpb25zXHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYWNrZWQgPT09IHRydWUgfHwgdGhpcy5vcHRpb25zLnBhY2tlZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVzb2x2ZWRUeXBlICYmICEodGhpcy5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtKSlcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5wYWNrZWQ7XHJcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMpLmxlbmd0aClcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnZlcnQgdG8gaW50ZXJuYWwgZGF0YSB0eXBlIGlmIG5lY2Vzc3NhcnlcclxuICAgIGlmICh0aGlzLmxvbmcpIHtcclxuICAgICAgICB0aGlzLnR5cGVEZWZhdWx0ID0gdXRpbC5Mb25nLmZyb21OdW1iZXIodGhpcy50eXBlRGVmYXVsdCwgdGhpcy50eXBlLmNoYXJBdCgwKSA9PT0gXCJ1XCIpO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgIGlmIChPYmplY3QuZnJlZXplKVxyXG4gICAgICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMudHlwZURlZmF1bHQpOyAvLyBsb25nIGluc3RhbmNlcyBhcmUgbWVhbnQgdG8gYmUgaW1tdXRhYmxlIGFueXdheSAoaS5lLiB1c2Ugc21hbGwgaW50IGNhY2hlIHRoYXQgZXZlbiByZXF1aXJlcyBpdClcclxuXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYnl0ZXMgJiYgdHlwZW9mIHRoaXMudHlwZURlZmF1bHQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB2YXIgYnVmO1xyXG4gICAgICAgIGlmICh1dGlsLmJhc2U2NC50ZXN0KHRoaXMudHlwZURlZmF1bHQpKVxyXG4gICAgICAgICAgICB1dGlsLmJhc2U2NC5kZWNvZGUodGhpcy50eXBlRGVmYXVsdCwgYnVmID0gdXRpbC5uZXdCdWZmZXIodXRpbC5iYXNlNjQubGVuZ3RoKHRoaXMudHlwZURlZmF1bHQpKSwgMCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB1dGlsLnV0Zjgud3JpdGUodGhpcy50eXBlRGVmYXVsdCwgYnVmID0gdXRpbC5uZXdCdWZmZXIodXRpbC51dGY4Lmxlbmd0aCh0aGlzLnR5cGVEZWZhdWx0KSksIDApO1xyXG4gICAgICAgIHRoaXMudHlwZURlZmF1bHQgPSBidWY7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGFrZSBzcGVjaWFsIGNhcmUgb2YgbWFwcyBhbmQgcmVwZWF0ZWQgZmllbGRzXHJcbiAgICBpZiAodGhpcy5tYXApXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSB1dGlsLmVtcHR5T2JqZWN0O1xyXG4gICAgZWxzZSBpZiAodGhpcy5yZXBlYXRlZClcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IHV0aWwuZW1wdHlBcnJheTtcclxuICAgIGVsc2VcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IHRoaXMudHlwZURlZmF1bHQ7XHJcblxyXG4gICAgLy8gZW5zdXJlIHByb3BlciB2YWx1ZSBvbiBwcm90b3R5cGVcclxuICAgIGlmICh0aGlzLnBhcmVudCBpbnN0YW5jZW9mIFR5cGUpXHJcbiAgICAgICAgdGhpcy5wYXJlbnQuY3Rvci5wcm90b3R5cGVbdGhpcy5uYW1lXSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG5cclxuICAgIHJldHVybiBSZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS5yZXNvbHZlLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb3JhdG9yIGZ1bmN0aW9uIGFzIHJldHVybmVkIGJ5IHtAbGluayBGaWVsZC5kfSBhbmQge0BsaW5rIE1hcEZpZWxkLmR9IChUeXBlU2NyaXB0KS5cclxuICogQHR5cGVkZWYgRmllbGREZWNvcmF0b3JcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRhcmdldCBwcm90b3R5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSBGaWVsZCBuYW1lXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZpZWxkIGRlY29yYXRvciAoVHlwZVNjcmlwdCkuXHJcbiAqIEBuYW1lIEZpZWxkLmRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmaWVsZElkIEZpZWxkIGlkXHJcbiAqIEBwYXJhbSB7XCJkb3VibGVcInxcImZsb2F0XCJ8XCJpbnQzMlwifFwidWludDMyXCJ8XCJzaW50MzJcInxcImZpeGVkMzJcInxcInNmaXhlZDMyXCJ8XCJpbnQ2NFwifFwidWludDY0XCJ8XCJzaW50NjRcInxcImZpeGVkNjRcInxcInNmaXhlZDY0XCJ8XCJzdHJpbmdcInxcImJvb2xcInxcImJ5dGVzXCJ8T2JqZWN0fSBmaWVsZFR5cGUgRmllbGQgdHlwZVxyXG4gKiBAcGFyYW0ge1wib3B0aW9uYWxcInxcInJlcXVpcmVkXCJ8XCJyZXBlYXRlZFwifSBbZmllbGRSdWxlPVwib3B0aW9uYWxcIl0gRmllbGQgcnVsZVxyXG4gKiBAcGFyYW0ge1R9IFtkZWZhdWx0VmFsdWVdIERlZmF1bHQgdmFsdWVcclxuICogQHJldHVybnMge0ZpZWxkRGVjb3JhdG9yfSBEZWNvcmF0b3IgZnVuY3Rpb25cclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBudW1iZXIgfCBudW1iZXJbXSB8IExvbmcgfCBMb25nW10gfCBzdHJpbmcgfCBzdHJpbmdbXSB8IGJvb2xlYW4gfCBib29sZWFuW10gfCBVaW50OEFycmF5IHwgVWludDhBcnJheVtdIHwgQnVmZmVyIHwgQnVmZmVyW11cclxuICovXHJcbkZpZWxkLmQgPSBmdW5jdGlvbiBkZWNvcmF0ZUZpZWxkKGZpZWxkSWQsIGZpZWxkVHlwZSwgZmllbGRSdWxlLCBkZWZhdWx0VmFsdWUpIHtcclxuXHJcbiAgICAvLyBzdWJtZXNzYWdlOiBkZWNvcmF0ZSB0aGUgc3VibWVzc2FnZSBhbmQgdXNlIGl0cyBuYW1lIGFzIHRoZSB0eXBlXHJcbiAgICBpZiAodHlwZW9mIGZpZWxkVHlwZSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZpZWxkVHlwZSA9IHV0aWwuZGVjb3JhdGVUeXBlKGZpZWxkVHlwZSkubmFtZTtcclxuXHJcbiAgICAvLyBlbnVtIHJlZmVyZW5jZTogY3JlYXRlIGEgcmVmbGVjdGVkIGNvcHkgb2YgdGhlIGVudW0gYW5kIGtlZXAgcmV1c2VpbmcgaXRcclxuICAgIGVsc2UgaWYgKGZpZWxkVHlwZSAmJiB0eXBlb2YgZmllbGRUeXBlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIGZpZWxkVHlwZSA9IHV0aWwuZGVjb3JhdGVFbnVtKGZpZWxkVHlwZSkubmFtZTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZmllbGREZWNvcmF0b3IocHJvdG90eXBlLCBmaWVsZE5hbWUpIHtcclxuICAgICAgICB1dGlsLmRlY29yYXRlVHlwZShwcm90b3R5cGUuY29uc3RydWN0b3IpXHJcbiAgICAgICAgICAgIC5hZGQobmV3IEZpZWxkKGZpZWxkTmFtZSwgZmllbGRJZCwgZmllbGRUeXBlLCBmaWVsZFJ1bGUsIHsgXCJkZWZhdWx0XCI6IGRlZmF1bHRWYWx1ZSB9KSk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpZWxkIGRlY29yYXRvciAoVHlwZVNjcmlwdCkuXHJcbiAqIEBuYW1lIEZpZWxkLmRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmaWVsZElkIEZpZWxkIGlkXHJcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VD58c3RyaW5nfSBmaWVsZFR5cGUgRmllbGQgdHlwZVxyXG4gKiBAcGFyYW0ge1wib3B0aW9uYWxcInxcInJlcXVpcmVkXCJ8XCJyZXBlYXRlZFwifSBbZmllbGRSdWxlPVwib3B0aW9uYWxcIl0gRmllbGQgcnVsZVxyXG4gKiBAcmV0dXJucyB7RmllbGREZWNvcmF0b3J9IERlY29yYXRvciBmdW5jdGlvblxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG4vLyBsaWtlIEZpZWxkLmQgYnV0IHdpdGhvdXQgYSBkZWZhdWx0IHZhbHVlXHJcblxyXG5GaWVsZC5fY29uZmlndXJlID0gZnVuY3Rpb24gY29uZmlndXJlKFR5cGVfKSB7XHJcbiAgICBUeXBlID0gVHlwZV87XHJcbn07XHJcblxyXG59LHtcIjE1XCI6MTUsXCIyNFwiOjI0LFwiMzZcIjozNixcIjM3XCI6Mzd9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvdG9idWYgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoMTgpO1xyXG5cclxucHJvdG9idWYuYnVpbGQgPSBcImxpZ2h0XCI7XHJcblxyXG4vKipcclxuICogQSBub2RlLXN0eWxlIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIGxvYWR9IGFuZCB7QGxpbmsgUm9vdCNsb2FkfS5cclxuICogQHR5cGVkZWYgTG9hZENhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55LCBvdGhlcndpc2UgYG51bGxgXHJcbiAqIEBwYXJhbSB7Um9vdH0gW3Jvb3RdIFJvb3QsIGlmIHRoZXJlIGhhc24ndCBiZWVuIGFuIGVycm9yXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIExvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gYSBjb21tb24gcm9vdCBuYW1lc3BhY2UgYW5kIGNhbGxzIHRoZSBjYWxsYmFjay5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7Um9vdH0gcm9vdCBSb290IG5hbWVzcGFjZSwgZGVmYXVsdHMgdG8gY3JlYXRlIGEgbmV3IG9uZSBpZiBvbWl0dGVkLlxyXG4gKiBAcGFyYW0ge0xvYWRDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHNlZSB7QGxpbmsgUm9vdCNsb2FkfVxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZChmaWxlbmFtZSwgcm9vdCwgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2Ygcm9vdCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSByb290O1xyXG4gICAgICAgIHJvb3QgPSBuZXcgcHJvdG9idWYuUm9vdCgpO1xyXG4gICAgfSBlbHNlIGlmICghcm9vdClcclxuICAgICAgICByb290ID0gbmV3IHByb3RvYnVmLlJvb3QoKTtcclxuICAgIHJldHVybiByb290LmxvYWQoZmlsZW5hbWUsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gYSBjb21tb24gcm9vdCBuYW1lc3BhY2UgYW5kIGNhbGxzIHRoZSBjYWxsYmFjay5cclxuICogQG5hbWUgbG9hZFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7TG9hZENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAc2VlIHtAbGluayBSb290I2xvYWR9XHJcbiAqIEB2YXJpYXRpb24gMlxyXG4gKi9cclxuLy8gZnVuY3Rpb24gbG9hZChmaWxlbmFtZTpzdHJpbmcsIGNhbGxiYWNrOkxvYWRDYWxsYmFjayk6dW5kZWZpbmVkXHJcblxyXG4vKipcclxuICogTG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byBhIGNvbW1vbiByb290IG5hbWVzcGFjZSBhbmQgcmV0dXJucyBhIHByb21pc2UuXHJcbiAqIEBuYW1lIGxvYWRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlbmFtZSBPbmUgb3IgbXVsdGlwbGUgZmlsZXMgdG8gbG9hZFxyXG4gKiBAcGFyYW0ge1Jvb3R9IFtyb290XSBSb290IG5hbWVzcGFjZSwgZGVmYXVsdHMgdG8gY3JlYXRlIGEgbmV3IG9uZSBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxSb290Pn0gUHJvbWlzZVxyXG4gKiBAc2VlIHtAbGluayBSb290I2xvYWR9XHJcbiAqIEB2YXJpYXRpb24gM1xyXG4gKi9cclxuLy8gZnVuY3Rpb24gbG9hZChmaWxlbmFtZTpzdHJpbmcsIFtyb290OlJvb3RdKTpQcm9taXNlPFJvb3Q+XHJcblxyXG5wcm90b2J1Zi5sb2FkID0gbG9hZDtcclxuXHJcbi8qKlxyXG4gKiBTeW5jaHJvbm91c2x5IGxvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gYSBjb21tb24gcm9vdCBuYW1lc3BhY2UgKG5vZGUgb25seSkuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlbmFtZSBPbmUgb3IgbXVsdGlwbGUgZmlsZXMgdG8gbG9hZFxyXG4gKiBAcGFyYW0ge1Jvb3R9IFtyb290XSBSb290IG5hbWVzcGFjZSwgZGVmYXVsdHMgdG8gY3JlYXRlIGEgbmV3IG9uZSBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7Um9vdH0gUm9vdCBuYW1lc3BhY2VcclxuICogQHRocm93cyB7RXJyb3J9IElmIHN5bmNocm9ub3VzIGZldGNoaW5nIGlzIG5vdCBzdXBwb3J0ZWQgKGkuZS4gaW4gYnJvd3NlcnMpIG9yIGlmIGEgZmlsZSdzIHN5bnRheCBpcyBpbnZhbGlkXHJcbiAqIEBzZWUge0BsaW5rIFJvb3QjbG9hZFN5bmN9XHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkU3luYyhmaWxlbmFtZSwgcm9vdCkge1xyXG4gICAgaWYgKCFyb290KVxyXG4gICAgICAgIHJvb3QgPSBuZXcgcHJvdG9idWYuUm9vdCgpO1xyXG4gICAgcmV0dXJuIHJvb3QubG9hZFN5bmMoZmlsZW5hbWUpO1xyXG59XHJcblxyXG5wcm90b2J1Zi5sb2FkU3luYyA9IGxvYWRTeW5jO1xyXG5cclxuLy8gU2VyaWFsaXphdGlvblxyXG5wcm90b2J1Zi5lbmNvZGVyICAgICAgICAgID0gcmVxdWlyZSgxNCk7XHJcbnByb3RvYnVmLmRlY29kZXIgICAgICAgICAgPSByZXF1aXJlKDEzKTtcclxucHJvdG9idWYudmVyaWZpZXIgICAgICAgICA9IHJlcXVpcmUoNDApO1xyXG5wcm90b2J1Zi5jb252ZXJ0ZXIgICAgICAgID0gcmVxdWlyZSgxMik7XHJcblxyXG4vLyBSZWZsZWN0aW9uXHJcbnByb3RvYnVmLlJlZmxlY3Rpb25PYmplY3QgPSByZXF1aXJlKDI0KTtcclxucHJvdG9idWYuTmFtZXNwYWNlICAgICAgICA9IHJlcXVpcmUoMjMpO1xyXG5wcm90b2J1Zi5Sb290ICAgICAgICAgICAgID0gcmVxdWlyZSgyOSk7XHJcbnByb3RvYnVmLkVudW0gICAgICAgICAgICAgPSByZXF1aXJlKDE1KTtcclxucHJvdG9idWYuVHlwZSAgICAgICAgICAgICA9IHJlcXVpcmUoMzUpO1xyXG5wcm90b2J1Zi5GaWVsZCAgICAgICAgICAgID0gcmVxdWlyZSgxNik7XHJcbnByb3RvYnVmLk9uZU9mICAgICAgICAgICAgPSByZXF1aXJlKDI1KTtcclxucHJvdG9idWYuTWFwRmllbGQgICAgICAgICA9IHJlcXVpcmUoMjApO1xyXG5wcm90b2J1Zi5TZXJ2aWNlICAgICAgICAgID0gcmVxdWlyZSgzMyk7XHJcbnByb3RvYnVmLk1ldGhvZCAgICAgICAgICAgPSByZXF1aXJlKDIyKTtcclxuXHJcbi8vIFJ1bnRpbWVcclxucHJvdG9idWYuTWVzc2FnZSAgICAgICAgICA9IHJlcXVpcmUoMjEpO1xyXG5wcm90b2J1Zi53cmFwcGVycyAgICAgICAgID0gcmVxdWlyZSg0MSk7XHJcblxyXG4vLyBVdGlsaXR5XHJcbnByb3RvYnVmLnR5cGVzICAgICAgICAgICAgPSByZXF1aXJlKDM2KTtcclxucHJvdG9idWYudXRpbCAgICAgICAgICAgICA9IHJlcXVpcmUoMzcpO1xyXG5cclxuLy8gQ29uZmlndXJlIHJlZmxlY3Rpb25cclxucHJvdG9idWYuUmVmbGVjdGlvbk9iamVjdC5fY29uZmlndXJlKHByb3RvYnVmLlJvb3QpO1xyXG5wcm90b2J1Zi5OYW1lc3BhY2UuX2NvbmZpZ3VyZShwcm90b2J1Zi5UeXBlLCBwcm90b2J1Zi5TZXJ2aWNlKTtcclxucHJvdG9idWYuUm9vdC5fY29uZmlndXJlKHByb3RvYnVmLlR5cGUpO1xyXG5wcm90b2J1Zi5GaWVsZC5fY29uZmlndXJlKHByb3RvYnVmLlR5cGUpO1xyXG5cclxufSx7XCIxMlwiOjEyLFwiMTNcIjoxMyxcIjE0XCI6MTQsXCIxNVwiOjE1LFwiMTZcIjoxNixcIjE4XCI6MTgsXCIyMFwiOjIwLFwiMjFcIjoyMSxcIjIyXCI6MjIsXCIyM1wiOjIzLFwiMjRcIjoyNCxcIjI1XCI6MjUsXCIyOVwiOjI5LFwiMzNcIjozMyxcIjM1XCI6MzUsXCIzNlwiOjM2LFwiMzdcIjozNyxcIjQwXCI6NDAsXCI0MVwiOjQxfV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxudmFyIHByb3RvYnVmID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBCdWlsZCB0eXBlLCBvbmUgb2YgYFwiZnVsbFwiYCwgYFwibGlnaHRcImAgb3IgYFwibWluaW1hbFwiYC5cclxuICogQG5hbWUgYnVpbGRcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQGNvbnN0XHJcbiAqL1xyXG5wcm90b2J1Zi5idWlsZCA9IFwibWluaW1hbFwiO1xyXG5cclxuLy8gU2VyaWFsaXphdGlvblxyXG5wcm90b2J1Zi5Xcml0ZXIgICAgICAgPSByZXF1aXJlKDQyKTtcclxucHJvdG9idWYuQnVmZmVyV3JpdGVyID0gcmVxdWlyZSg0Myk7XHJcbnByb3RvYnVmLlJlYWRlciAgICAgICA9IHJlcXVpcmUoMjcpO1xyXG5wcm90b2J1Zi5CdWZmZXJSZWFkZXIgPSByZXF1aXJlKDI4KTtcclxuXHJcbi8vIFV0aWxpdHlcclxucHJvdG9idWYudXRpbCAgICAgICAgID0gcmVxdWlyZSgzOSk7XHJcbnByb3RvYnVmLnJwYyAgICAgICAgICA9IHJlcXVpcmUoMzEpO1xyXG5wcm90b2J1Zi5yb290cyAgICAgICAgPSByZXF1aXJlKDMwKTtcclxucHJvdG9idWYuY29uZmlndXJlICAgID0gY29uZmlndXJlO1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuLyoqXHJcbiAqIFJlY29uZmlndXJlcyB0aGUgbGlicmFyeSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50LlxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuZnVuY3Rpb24gY29uZmlndXJlKCkge1xyXG4gICAgcHJvdG9idWYuUmVhZGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyUmVhZGVyKTtcclxuICAgIHByb3RvYnVmLnV0aWwuX2NvbmZpZ3VyZSgpO1xyXG59XHJcblxyXG4vLyBDb25maWd1cmUgc2VyaWFsaXphdGlvblxyXG5wcm90b2J1Zi5Xcml0ZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJXcml0ZXIpO1xyXG5jb25maWd1cmUoKTtcclxuXHJcbn0se1wiMjdcIjoyNyxcIjI4XCI6MjgsXCIzMFwiOjMwLFwiMzFcIjozMSxcIjM5XCI6MzksXCI0MlwiOjQyLFwiNDNcIjo0M31dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBwcm90b2J1ZiA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgxNyk7XHJcblxyXG5wcm90b2J1Zi5idWlsZCA9IFwiZnVsbFwiO1xyXG5cclxuLy8gUGFyc2VyXHJcbnByb3RvYnVmLnRva2VuaXplICAgICAgICAgPSByZXF1aXJlKDM0KTtcclxucHJvdG9idWYucGFyc2UgICAgICAgICAgICA9IHJlcXVpcmUoMjYpO1xyXG5wcm90b2J1Zi5jb21tb24gICAgICAgICAgID0gcmVxdWlyZSgxMSk7XHJcblxyXG4vLyBDb25maWd1cmUgcGFyc2VyXHJcbnByb3RvYnVmLlJvb3QuX2NvbmZpZ3VyZShwcm90b2J1Zi5UeXBlLCBwcm90b2J1Zi5wYXJzZSwgcHJvdG9idWYuY29tbW9uKTtcclxuXHJcbn0se1wiMTFcIjoxMSxcIjE3XCI6MTcsXCIyNlwiOjI2LFwiMzRcIjozNH1dLDIwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gTWFwRmllbGQ7XHJcblxyXG4vLyBleHRlbmRzIEZpZWxkXHJcbnZhciBGaWVsZCA9IHJlcXVpcmUoMTYpO1xyXG4oKE1hcEZpZWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRmllbGQucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBNYXBGaWVsZCkuY2xhc3NOYW1lID0gXCJNYXBGaWVsZFwiO1xyXG5cclxudmFyIHR5cGVzICAgPSByZXF1aXJlKDM2KSxcclxuICAgIHV0aWwgICAgPSByZXF1aXJlKDM3KTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IG1hcCBmaWVsZCBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBSZWZsZWN0ZWQgbWFwIGZpZWxkLlxyXG4gKiBAZXh0ZW5kcyBGaWVsZEJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFVuaXF1ZSBuYW1lIHdpdGhpbiBpdHMgbmFtZXNwYWNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCBVbmlxdWUgaWQgd2l0aGluIGl0cyBuYW1lc3BhY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVR5cGUgS2V5IHR5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVmFsdWUgdHlwZVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRGVjbGFyZWQgb3B0aW9uc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvbW1lbnRdIENvbW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZmllbGRcclxuICovXHJcbmZ1bmN0aW9uIE1hcEZpZWxkKG5hbWUsIGlkLCBrZXlUeXBlLCB0eXBlLCBvcHRpb25zLCBjb21tZW50KSB7XHJcbiAgICBGaWVsZC5jYWxsKHRoaXMsIG5hbWUsIGlkLCB0eXBlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgb3B0aW9ucywgY29tbWVudCk7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIXV0aWwuaXNTdHJpbmcoa2V5VHlwZSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwia2V5VHlwZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2V5IHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmtleVR5cGUgPSBrZXlUeXBlOyAvLyB0b0pTT04sIG1hcmtlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZWQga2V5IHR5cGUgaWYgbm90IGEgYmFzaWMgdHlwZS5cclxuICAgICAqIEB0eXBlIHtSZWZsZWN0aW9uT2JqZWN0fG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzb2x2ZWRLZXlUeXBlID0gbnVsbDtcclxuXHJcbiAgICAvLyBPdmVycmlkZXMgRmllbGQjbWFwXHJcbiAgICB0aGlzLm1hcCA9IHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXAgZmllbGQgZGVzY3JpcHRvci5cclxuICogQGludGVyZmFjZSBJTWFwRmllbGRcclxuICogQGV4dGVuZHMge0lGaWVsZH1cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleVR5cGUgS2V5IHR5cGVcclxuICovXHJcblxyXG4vKipcclxuICogRXh0ZW5zaW9uIG1hcCBmaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElFeHRlbnNpb25NYXBGaWVsZFxyXG4gKiBAZXh0ZW5kcyBJTWFwRmllbGRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4dGVuZCBFeHRlbmRlZCB0eXBlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBtYXAgZmllbGQgZnJvbSBhIG1hcCBmaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBGaWVsZCBuYW1lXHJcbiAqIEBwYXJhbSB7SU1hcEZpZWxkfSBqc29uIE1hcCBmaWVsZCBkZXNjcmlwdG9yXHJcbiAqIEByZXR1cm5zIHtNYXBGaWVsZH0gQ3JlYXRlZCBtYXAgZmllbGRcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbk1hcEZpZWxkLmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04obmFtZSwganNvbikge1xyXG4gICAgcmV0dXJuIG5ldyBNYXBGaWVsZChuYW1lLCBqc29uLmlkLCBqc29uLmtleVR5cGUsIGpzb24udHlwZSwganNvbi5vcHRpb25zLCBqc29uLmNvbW1lbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgbWFwIGZpZWxkIHRvIGEgbWFwIGZpZWxkIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7SU1hcEZpZWxkfSBNYXAgZmllbGQgZGVzY3JpcHRvclxyXG4gKi9cclxuTWFwRmllbGQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTih0b0pTT05PcHRpb25zKSB7XHJcbiAgICB2YXIga2VlcENvbW1lbnRzID0gdG9KU09OT3B0aW9ucyA/IEJvb2xlYW4odG9KU09OT3B0aW9ucy5rZWVwQ29tbWVudHMpIDogZmFsc2U7XHJcbiAgICByZXR1cm4gdXRpbC50b09iamVjdChbXHJcbiAgICAgICAgXCJrZXlUeXBlXCIgLCB0aGlzLmtleVR5cGUsXHJcbiAgICAgICAgXCJ0eXBlXCIgICAgLCB0aGlzLnR5cGUsXHJcbiAgICAgICAgXCJpZFwiICAgICAgLCB0aGlzLmlkLFxyXG4gICAgICAgIFwiZXh0ZW5kXCIgICwgdGhpcy5leHRlbmQsXHJcbiAgICAgICAgXCJvcHRpb25zXCIgLCB0aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgXCJjb21tZW50XCIgLCBrZWVwQ29tbWVudHMgPyB0aGlzLmNvbW1lbnQgOiB1bmRlZmluZWRcclxuICAgIF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuTWFwRmllbGQucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb2x2ZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgLy8gQmVzaWRlcyBhIHZhbHVlIHR5cGUsIG1hcCBmaWVsZHMgaGF2ZSBhIGtleSB0eXBlIHRoYXQgbWF5IGJlIFwiYW55IHNjYWxhciB0eXBlIGV4Y2VwdCBmb3IgZmxvYXRpbmcgcG9pbnQgdHlwZXMgYW5kIGJ5dGVzXCJcclxuICAgIGlmICh0eXBlcy5tYXBLZXlbdGhpcy5rZXlUeXBlXSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBrZXkgdHlwZTogXCIgKyB0aGlzLmtleVR5cGUpO1xyXG5cclxuICAgIHJldHVybiBGaWVsZC5wcm90b3R5cGUucmVzb2x2ZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hcCBmaWVsZCBkZWNvcmF0b3IgKFR5cGVTY3JpcHQpLlxyXG4gKiBAbmFtZSBNYXBGaWVsZC5kXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmllbGRJZCBGaWVsZCBpZFxyXG4gKiBAcGFyYW0ge1wiaW50MzJcInxcInVpbnQzMlwifFwic2ludDMyXCJ8XCJmaXhlZDMyXCJ8XCJzZml4ZWQzMlwifFwiaW50NjRcInxcInVpbnQ2NFwifFwic2ludDY0XCJ8XCJmaXhlZDY0XCJ8XCJzZml4ZWQ2NFwifFwiYm9vbFwifFwic3RyaW5nXCJ9IGZpZWxkS2V5VHlwZSBGaWVsZCBrZXkgdHlwZVxyXG4gKiBAcGFyYW0ge1wiZG91YmxlXCJ8XCJmbG9hdFwifFwiaW50MzJcInxcInVpbnQzMlwifFwic2ludDMyXCJ8XCJmaXhlZDMyXCJ8XCJzZml4ZWQzMlwifFwiaW50NjRcInxcInVpbnQ2NFwifFwic2ludDY0XCJ8XCJmaXhlZDY0XCJ8XCJzZml4ZWQ2NFwifFwiYm9vbFwifFwic3RyaW5nXCJ8XCJieXRlc1wifE9iamVjdHxDb25zdHJ1Y3Rvcjx7fT59IGZpZWxkVmFsdWVUeXBlIEZpZWxkIHZhbHVlIHR5cGVcclxuICogQHJldHVybnMge0ZpZWxkRGVjb3JhdG9yfSBEZWNvcmF0b3IgZnVuY3Rpb25cclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IG51bWJlciB8IExvbmcgfCBzdHJpbmcgfCBib29sZWFuIHwgVWludDhBcnJheSB8IEJ1ZmZlciB8IG51bWJlcltdIHwgTWVzc2FnZTx7fT4gfVxyXG4gKi9cclxuTWFwRmllbGQuZCA9IGZ1bmN0aW9uIGRlY29yYXRlTWFwRmllbGQoZmllbGRJZCwgZmllbGRLZXlUeXBlLCBmaWVsZFZhbHVlVHlwZSkge1xyXG5cclxuICAgIC8vIHN1Ym1lc3NhZ2UgdmFsdWU6IGRlY29yYXRlIHRoZSBzdWJtZXNzYWdlIGFuZCB1c2UgaXRzIG5hbWUgYXMgdGhlIHR5cGVcclxuICAgIGlmICh0eXBlb2YgZmllbGRWYWx1ZVR5cGUgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmaWVsZFZhbHVlVHlwZSA9IHV0aWwuZGVjb3JhdGVUeXBlKGZpZWxkVmFsdWVUeXBlKS5uYW1lO1xyXG5cclxuICAgIC8vIGVudW0gcmVmZXJlbmNlIHZhbHVlOiBjcmVhdGUgYSByZWZsZWN0ZWQgY29weSBvZiB0aGUgZW51bSBhbmQga2VlcCByZXVzZWluZyBpdFxyXG4gICAgZWxzZSBpZiAoZmllbGRWYWx1ZVR5cGUgJiYgdHlwZW9mIGZpZWxkVmFsdWVUeXBlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIGZpZWxkVmFsdWVUeXBlID0gdXRpbC5kZWNvcmF0ZUVudW0oZmllbGRWYWx1ZVR5cGUpLm5hbWU7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1hcEZpZWxkRGVjb3JhdG9yKHByb3RvdHlwZSwgZmllbGROYW1lKSB7XHJcbiAgICAgICAgdXRpbC5kZWNvcmF0ZVR5cGUocHJvdG90eXBlLmNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAgICAuYWRkKG5ldyBNYXBGaWVsZChmaWVsZE5hbWUsIGZpZWxkSWQsIGZpZWxkS2V5VHlwZSwgZmllbGRWYWx1ZVR5cGUpKTtcclxuICAgIH07XHJcbn07XHJcblxyXG59LHtcIjE2XCI6MTYsXCIzNlwiOjM2LFwiMzdcIjozN31dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZTtcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgzOSk7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBtZXNzYWdlIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEFic3RyYWN0IHJ1bnRpbWUgbWVzc2FnZS5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7UHJvcGVydGllczxUPn0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBNZXNzYWdlKHByb3BlcnRpZXMpIHtcclxuICAgIC8vIG5vdCB1c2VkIGludGVybmFsbHlcclxuICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlZmVyZW5jZSB0byB0aGUgcmVmbGVjdGVkIHR5cGUuXHJcbiAqIEBuYW1lIE1lc3NhZ2UuJHR5cGVcclxuICogQHR5cGUge1R5cGV9XHJcbiAqIEByZWFkb25seVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWZlcmVuY2UgdG8gdGhlIHJlZmxlY3RlZCB0eXBlLlxyXG4gKiBAbmFtZSBNZXNzYWdlIyR0eXBlXHJcbiAqIEB0eXBlIHtUeXBlfVxyXG4gKiBAcmVhZG9ubHlcclxuICovXHJcblxyXG4vKmVzbGludC1kaXNhYmxlIHZhbGlkLWpzZG9jKi9cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAqIEByZXR1cm5zIHtNZXNzYWdlPFQ+fSBNZXNzYWdlIGluc3RhbmNlXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAdGhpcyBDb25zdHJ1Y3RvcjxUPlxyXG4gKi9cclxuTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUuY3JlYXRlKHByb3BlcnRpZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBtZXNzYWdlIG9mIHRoaXMgdHlwZS5cclxuICogQHBhcmFtIHtUfE9iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIE1lc3NhZ2UgdG8gZW5jb2RlXHJcbiAqIEBwYXJhbSB7V3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gdXNlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IFdyaXRlclxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cclxuICogQHRoaXMgQ29uc3RydWN0b3I8VD5cclxuICovXHJcbk1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxyXG4gKiBAcGFyYW0ge1R8T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgTWVzc2FnZSB0byBlbmNvZGVcclxuICogQHBhcmFtIHtXcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byB1c2VcclxuICogQHJldHVybnMge1dyaXRlcn0gV3JpdGVyXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAdGhpcyBDb25zdHJ1Y3RvcjxUPlxyXG4gKi9cclxuTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdHlwZS5lbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUuXHJcbiAqIEBuYW1lIE1lc3NhZ2UuZGVjb2RlXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1JlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGVcclxuICogQHJldHVybnMge1R9IERlY29kZWQgbWVzc2FnZVxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cclxuICogQHRoaXMgQ29uc3RydWN0b3I8VD5cclxuICovXHJcbk1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUuZGVjb2RlKHJlYWRlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxyXG4gKiBAbmFtZSBNZXNzYWdlLmRlY29kZURlbGltaXRlZFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtSZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlXHJcbiAqIEByZXR1cm5zIHtUfSBEZWNvZGVkIG1lc3NhZ2VcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEB0aGlzIENvbnN0cnVjdG9yPFQ+XHJcbiAqL1xyXG5NZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcclxuICAgIHJldHVybiB0aGlzLiR0eXBlLmRlY29kZURlbGltaXRlZChyZWFkZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZlcmlmaWVzIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUuXHJcbiAqIEBuYW1lIE1lc3NhZ2UudmVyaWZ5XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcclxuICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcclxuICovXHJcbk1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiB0aGlzLiR0eXBlLnZlcmlmeShtZXNzYWdlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICogQHJldHVybnMge1R9IE1lc3NhZ2UgaW5zdGFuY2VcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEB0aGlzIENvbnN0cnVjdG9yPFQ+XHJcbiAqL1xyXG5NZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUuZnJvbU9iamVjdChvYmplY3QpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAqIEBwYXJhbSB7VH0gbWVzc2FnZSBNZXNzYWdlIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7SUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAdGhpcyBDb25zdHJ1Y3RvcjxUPlxyXG4gKi9cclxuTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiB0aGlzLiR0eXBlLnRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgbWVzc2FnZSB0byBKU09OLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XHJcbiAqL1xyXG5NZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdHlwZS50b09iamVjdCh0aGlzLCB1dGlsLnRvSlNPTk9wdGlvbnMpO1xyXG59O1xyXG5cclxuLyplc2xpbnQtZW5hYmxlIHZhbGlkLWpzZG9jKi9cclxufSx7XCIzOVwiOjM5fV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBNZXRob2Q7XHJcblxyXG4vLyBleHRlbmRzIFJlZmxlY3Rpb25PYmplY3RcclxudmFyIFJlZmxlY3Rpb25PYmplY3QgPSByZXF1aXJlKDI0KTtcclxuKChNZXRob2QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gTWV0aG9kKS5jbGFzc05hbWUgPSBcIk1ldGhvZFwiO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKDM3KTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHNlcnZpY2UgbWV0aG9kIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFJlZmxlY3RlZCBzZXJ2aWNlIG1ldGhvZC5cclxuICogQGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTWV0aG9kIG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSB0eXBlIE1ldGhvZCB0eXBlLCB1c3VhbGx5IGBcInJwY1wiYFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdFR5cGUgUmVxdWVzdCBtZXNzYWdlIHR5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlc3BvbnNlVHlwZSBSZXNwb25zZSBtZXNzYWdlIHR5cGVcclxuICogQHBhcmFtIHtib29sZWFufE9iamVjdC48c3RyaW5nLCo+fSBbcmVxdWVzdFN0cmVhbV0gV2hldGhlciB0aGUgcmVxdWVzdCBpcyBzdHJlYW1lZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58T2JqZWN0LjxzdHJpbmcsKj59IFtyZXNwb25zZVN0cmVhbV0gV2hldGhlciB0aGUgcmVzcG9uc2UgaXMgc3RyZWFtZWRcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb21tZW50XSBUaGUgY29tbWVudCBmb3IgdGhpcyBtZXRob2RcclxuICovXHJcbmZ1bmN0aW9uIE1ldGhvZChuYW1lLCB0eXBlLCByZXF1ZXN0VHlwZSwgcmVzcG9uc2VUeXBlLCByZXF1ZXN0U3RyZWFtLCByZXNwb25zZVN0cmVhbSwgb3B0aW9ucywgY29tbWVudCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBpZiAodXRpbC5pc09iamVjdChyZXF1ZXN0U3RyZWFtKSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSByZXF1ZXN0U3RyZWFtO1xyXG4gICAgICAgIHJlcXVlc3RTdHJlYW0gPSByZXNwb25zZVN0cmVhbSA9IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSBpZiAodXRpbC5pc09iamVjdChyZXNwb25zZVN0cmVhbSkpIHtcclxuICAgICAgICBvcHRpb25zID0gcmVzcG9uc2VTdHJlYW07XHJcbiAgICAgICAgcmVzcG9uc2VTdHJlYW0gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoISh0eXBlID09PSB1bmRlZmluZWQgfHwgdXRpbC5pc1N0cmluZyh0eXBlKSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwidHlwZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKCF1dGlsLmlzU3RyaW5nKHJlcXVlc3RUeXBlKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZXF1ZXN0VHlwZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKCF1dGlsLmlzU3RyaW5nKHJlc3BvbnNlVHlwZSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVzcG9uc2VUeXBlIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgUmVmbGVjdGlvbk9iamVjdC5jYWxsKHRoaXMsIG5hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlIHx8IFwicnBjXCI7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVxdWVzdCB0eXBlLlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXF1ZXN0VHlwZSA9IHJlcXVlc3RUeXBlOyAvLyB0b0pTT04sIG1hcmtlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciByZXF1ZXN0cyBhcmUgc3RyZWFtZWQgb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlcXVlc3RTdHJlYW0gPSByZXF1ZXN0U3RyZWFtID8gdHJ1ZSA6IHVuZGVmaW5lZDsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNwb25zZSB0eXBlLlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciByZXNwb25zZXMgYXJlIHN0cmVhbWVkIG9yIG5vdC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNwb25zZVN0cmVhbSA9IHJlc3BvbnNlU3RyZWFtID8gdHJ1ZSA6IHVuZGVmaW5lZDsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlZCByZXF1ZXN0IHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7VHlwZXxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc29sdmVkUmVxdWVzdFR5cGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZWQgcmVzcG9uc2UgdHlwZS5cclxuICAgICAqIEB0eXBlIHtUeXBlfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzb2x2ZWRSZXNwb25zZVR5cGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWVudCBmb3IgdGhpcyBtZXRob2RcclxuICAgICAqIEB0eXBlIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb21tZW50ID0gY29tbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElNZXRob2RcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0eXBlPVwicnBjXCJdIE1ldGhvZCB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByZXF1ZXN0VHlwZSBSZXF1ZXN0IHR5cGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJlc3BvbnNlVHlwZSBSZXNwb25zZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3JlcXVlc3RTdHJlYW09ZmFsc2VdIFdoZXRoZXIgcmVxdWVzdHMgYXJlIHN0cmVhbWVkXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Jlc3BvbnNlU3RyZWFtPWZhbHNlXSBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgc3RyZWFtZWRcclxuICogQHByb3BlcnR5IHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIE1ldGhvZCBvcHRpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBtZXRob2QgZnJvbSBhIG1ldGhvZCBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBNZXRob2QgbmFtZVxyXG4gKiBAcGFyYW0ge0lNZXRob2R9IGpzb24gTWV0aG9kIGRlc2NyaXB0b3JcclxuICogQHJldHVybnMge01ldGhvZH0gQ3JlYXRlZCBtZXRob2RcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbk1ldGhvZC5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKG5hbWUsIGpzb24pIHtcclxuICAgIHJldHVybiBuZXcgTWV0aG9kKG5hbWUsIGpzb24udHlwZSwganNvbi5yZXF1ZXN0VHlwZSwganNvbi5yZXNwb25zZVR5cGUsIGpzb24ucmVxdWVzdFN0cmVhbSwganNvbi5yZXNwb25zZVN0cmVhbSwganNvbi5vcHRpb25zLCBqc29uLmNvbW1lbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgbWV0aG9kIHRvIGEgbWV0aG9kIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7SU1ldGhvZH0gTWV0aG9kIGRlc2NyaXB0b3JcclxuICovXHJcbk1ldGhvZC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKHRvSlNPTk9wdGlvbnMpIHtcclxuICAgIHZhciBrZWVwQ29tbWVudHMgPSB0b0pTT05PcHRpb25zID8gQm9vbGVhbih0b0pTT05PcHRpb25zLmtlZXBDb21tZW50cykgOiBmYWxzZTtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcInR5cGVcIiAgICAgICAgICAgLCB0aGlzLnR5cGUgIT09IFwicnBjXCIgJiYgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdGhpcy50eXBlIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBcInJlcXVlc3RUeXBlXCIgICAgLCB0aGlzLnJlcXVlc3RUeXBlLFxyXG4gICAgICAgIFwicmVxdWVzdFN0cmVhbVwiICAsIHRoaXMucmVxdWVzdFN0cmVhbSxcclxuICAgICAgICBcInJlc3BvbnNlVHlwZVwiICAgLCB0aGlzLnJlc3BvbnNlVHlwZSxcclxuICAgICAgICBcInJlc3BvbnNlU3RyZWFtXCIgLCB0aGlzLnJlc3BvbnNlU3RyZWFtLFxyXG4gICAgICAgIFwib3B0aW9uc1wiICAgICAgICAsIHRoaXMub3B0aW9ucyxcclxuICAgICAgICBcImNvbW1lbnRcIiAgICAgICAgLCBrZWVwQ29tbWVudHMgPyB0aGlzLmNvbW1lbnQgOiB1bmRlZmluZWRcclxuICAgIF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuTWV0aG9kLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSgpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICh0aGlzLnJlc29sdmVkKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIHRoaXMucmVzb2x2ZWRSZXF1ZXN0VHlwZSA9IHRoaXMucGFyZW50Lmxvb2t1cFR5cGUodGhpcy5yZXF1ZXN0VHlwZSk7XHJcbiAgICB0aGlzLnJlc29sdmVkUmVzcG9uc2VUeXBlID0gdGhpcy5wYXJlbnQubG9va3VwVHlwZSh0aGlzLnJlc3BvbnNlVHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLnJlc29sdmUuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbn0se1wiMjRcIjoyNCxcIjM3XCI6Mzd9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVzcGFjZTtcclxuXHJcbi8vIGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG52YXIgUmVmbGVjdGlvbk9iamVjdCA9IHJlcXVpcmUoMjQpO1xyXG4oKE5hbWVzcGFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBOYW1lc3BhY2UpLmNsYXNzTmFtZSA9IFwiTmFtZXNwYWNlXCI7XHJcblxyXG52YXIgRW51bSAgICAgPSByZXF1aXJlKDE1KSxcclxuICAgIEZpZWxkICAgID0gcmVxdWlyZSgxNiksXHJcbiAgICB1dGlsICAgICA9IHJlcXVpcmUoMzcpO1xyXG5cclxudmFyIFR5cGUsICAgIC8vIGN5Y2xpY1xyXG4gICAgU2VydmljZTsgLy8gXCJcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IG5hbWVzcGFjZSBpbnN0YW5jZS5cclxuICogQG5hbWUgTmFtZXNwYWNlXHJcbiAqIEBjbGFzc2Rlc2MgUmVmbGVjdGVkIG5hbWVzcGFjZS5cclxuICogQGV4dGVuZHMgTmFtZXNwYWNlQmFzZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZXNwYWNlIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5hbWVzcGFjZSBmcm9tIEpTT04uXHJcbiAqIEBtZW1iZXJvZiBOYW1lc3BhY2VcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWVzcGFjZSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IGpzb24gSlNPTiBvYmplY3RcclxuICogQHJldHVybnMge05hbWVzcGFjZX0gQ3JlYXRlZCBuYW1lc3BhY2VcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbk5hbWVzcGFjZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKG5hbWUsIGpzb24pIHtcclxuICAgIHJldHVybiBuZXcgTmFtZXNwYWNlKG5hbWUsIGpzb24ub3B0aW9ucykuYWRkSlNPTihqc29uLm5lc3RlZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gYXJyYXkgb2YgcmVmbGVjdGlvbiBvYmplY3RzIHRvIEpTT04uXHJcbiAqIEBtZW1iZXJvZiBOYW1lc3BhY2VcclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0W119IGFycmF5IE9iamVjdCBhcnJheVxyXG4gKiBAcGFyYW0ge0lUb0pTT05PcHRpb25zfSBbdG9KU09OT3B0aW9uc10gSlNPTiBjb252ZXJzaW9uIG9wdGlvbnNcclxuICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fHVuZGVmaW5lZH0gSlNPTiBvYmplY3Qgb3IgYHVuZGVmaW5lZGAgd2hlbiBhcnJheSBpcyBlbXB0eVxyXG4gKi9cclxuZnVuY3Rpb24gYXJyYXlUb0pTT04oYXJyYXksIHRvSlNPTk9wdGlvbnMpIHtcclxuICAgIGlmICghKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkpXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHZhciBvYmogPSB7fTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgb2JqW2FycmF5W2ldLm5hbWVdID0gYXJyYXlbaV0udG9KU09OKHRvSlNPTk9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuTmFtZXNwYWNlLmFycmF5VG9KU09OID0gYXJyYXlUb0pTT047XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBpZCBpcyByZXNlcnZlZC5cclxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyW118c3RyaW5nPnx1bmRlZmluZWR9IHJlc2VydmVkIEFycmF5IG9mIHJlc2VydmVkIHJhbmdlcyBhbmQgbmFtZXNcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIElkIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiByZXNlcnZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcclxuICovXHJcbk5hbWVzcGFjZS5pc1Jlc2VydmVkSWQgPSBmdW5jdGlvbiBpc1Jlc2VydmVkSWQocmVzZXJ2ZWQsIGlkKSB7XHJcbiAgICBpZiAocmVzZXJ2ZWQpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNlcnZlZC5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNlcnZlZFtpXSAhPT0gXCJzdHJpbmdcIiAmJiByZXNlcnZlZFtpXVswXSA8PSBpZCAmJiByZXNlcnZlZFtpXVsxXSA+PSBpZClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgbmFtZSBpcyByZXNlcnZlZC5cclxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyW118c3RyaW5nPnx1bmRlZmluZWR9IHJlc2VydmVkIEFycmF5IG9mIHJlc2VydmVkIHJhbmdlcyBhbmQgbmFtZXNcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcmVzZXJ2ZWQsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAqL1xyXG5OYW1lc3BhY2UuaXNSZXNlcnZlZE5hbWUgPSBmdW5jdGlvbiBpc1Jlc2VydmVkTmFtZShyZXNlcnZlZCwgbmFtZSkge1xyXG4gICAgaWYgKHJlc2VydmVkKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzZXJ2ZWQubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIGlmIChyZXNlcnZlZFtpXSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdCBhbiBhY3R1YWwgY29uc3RydWN0b3IuIFVzZSB7QGxpbmsgTmFtZXNwYWNlfSBpbnN0ZWFkLlxyXG4gKiBAY2xhc3NkZXNjIEJhc2UgY2xhc3Mgb2YgYWxsIHJlZmxlY3Rpb24gb2JqZWN0cyBjb250YWluaW5nIG5lc3RlZCBvYmplY3RzLiBUaGlzIGlzIG5vdCBhbiBhY3R1YWwgY2xhc3MgYnV0IGhlcmUgZm9yIHRoZSBzYWtlIG9mIGhhdmluZyBjb25zaXN0ZW50IHR5cGUgZGVmaW5pdGlvbnMuXHJcbiAqIEBleHBvcnRzIE5hbWVzcGFjZUJhc2VcclxuICogQGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWVzcGFjZSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqIEBzZWUge0BsaW5rIE5hbWVzcGFjZX1cclxuICovXHJcbmZ1bmN0aW9uIE5hbWVzcGFjZShuYW1lLCBvcHRpb25zKSB7XHJcbiAgICBSZWZsZWN0aW9uT2JqZWN0LmNhbGwodGhpcywgbmFtZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXN0ZWQgb2JqZWN0cyBieSBuYW1lLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLFJlZmxlY3Rpb25PYmplY3Q+fHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5uZXN0ZWQgPSB1bmRlZmluZWQ7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FjaGVkIG5lc3RlZCBvYmplY3RzIGFzIGFuIGFycmF5LlxyXG4gICAgICogQHR5cGUge1JlZmxlY3Rpb25PYmplY3RbXXxudWxsfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbmVzdGVkQXJyYXkgPSBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckNhY2hlKG5hbWVzcGFjZSkge1xyXG4gICAgbmFtZXNwYWNlLl9uZXN0ZWRBcnJheSA9IG51bGw7XHJcbiAgICByZXR1cm4gbmFtZXNwYWNlO1xyXG59XHJcblxyXG4vKipcclxuICogTmVzdGVkIG9iamVjdHMgb2YgdGhpcyBuYW1lc3BhY2UgYXMgYW4gYXJyYXkgZm9yIGl0ZXJhdGlvbi5cclxuICogQG5hbWUgTmFtZXNwYWNlQmFzZSNuZXN0ZWRBcnJheVxyXG4gKiBAdHlwZSB7UmVmbGVjdGlvbk9iamVjdFtdfVxyXG4gKiBAcmVhZG9ubHlcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShOYW1lc3BhY2UucHJvdG90eXBlLCBcIm5lc3RlZEFycmF5XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25lc3RlZEFycmF5IHx8ICh0aGlzLl9uZXN0ZWRBcnJheSA9IHV0aWwudG9BcnJheSh0aGlzLm5lc3RlZCkpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBOYW1lc3BhY2UgZGVzY3JpcHRvci5cclxuICogQGludGVyZmFjZSBJTmFtZXNwYWNlXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBOYW1lc3BhY2Ugb3B0aW9uc1xyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLEFueU5lc3RlZE9iamVjdD59IFtuZXN0ZWRdIE5lc3RlZCBvYmplY3QgZGVzY3JpcHRvcnNcclxuICovXHJcblxyXG4vKipcclxuICogQW55IGV4dGVuc2lvbiBmaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAdHlwZWRlZiBBbnlFeHRlbnNpb25GaWVsZFxyXG4gKiBAdHlwZSB7SUV4dGVuc2lvbkZpZWxkfElFeHRlbnNpb25NYXBGaWVsZH1cclxuICovXHJcblxyXG4vKipcclxuICogQW55IG5lc3RlZCBvYmplY3QgZGVzY3JpcHRvci5cclxuICogQHR5cGVkZWYgQW55TmVzdGVkT2JqZWN0XHJcbiAqIEB0eXBlIHtJRW51bXxJVHlwZXxJU2VydmljZXxBbnlFeHRlbnNpb25GaWVsZHxJTmFtZXNwYWNlfVxyXG4gKi9cclxuLy8gXiBCRVdBUkU6IFZTQ29kZSBoYW5ncyBmb3JldmVyIHdoZW4gdXNpbmcgbW9yZSB0aGFuIDUgdHlwZXMgKHRoYXQncyB3aHkgQW55RXh0ZW5zaW9uRmllbGQgZXhpc3RzIGluIHRoZSBmaXJzdCBwbGFjZSlcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIG5hbWVzcGFjZSB0byBhIG5hbWVzcGFjZSBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge0lUb0pTT05PcHRpb25zfSBbdG9KU09OT3B0aW9uc10gSlNPTiBjb252ZXJzaW9uIG9wdGlvbnNcclxuICogQHJldHVybnMge0lOYW1lc3BhY2V9IE5hbWVzcGFjZSBkZXNjcmlwdG9yXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTih0b0pTT05PcHRpb25zKSB7XHJcbiAgICByZXR1cm4gdXRpbC50b09iamVjdChbXHJcbiAgICAgICAgXCJvcHRpb25zXCIgLCB0aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgXCJuZXN0ZWRcIiAgLCBhcnJheVRvSlNPTih0aGlzLm5lc3RlZEFycmF5LCB0b0pTT05PcHRpb25zKVxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBuZXN0ZWQgb2JqZWN0cyB0byB0aGlzIG5hbWVzcGFjZSBmcm9tIG5lc3RlZCBvYmplY3QgZGVzY3JpcHRvcnMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsQW55TmVzdGVkT2JqZWN0Pn0gbmVzdGVkSnNvbiBBbnkgbmVzdGVkIG9iamVjdCBkZXNjcmlwdG9yc1xyXG4gKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBgdGhpc2BcclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUuYWRkSlNPTiA9IGZ1bmN0aW9uIGFkZEpTT04obmVzdGVkSnNvbikge1xyXG4gICAgdmFyIG5zID0gdGhpcztcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICBpZiAobmVzdGVkSnNvbikge1xyXG4gICAgICAgIGZvciAodmFyIG5hbWVzID0gT2JqZWN0LmtleXMobmVzdGVkSnNvbiksIGkgPSAwLCBuZXN0ZWQ7IGkgPCBuYW1lcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBuZXN0ZWQgPSBuZXN0ZWRKc29uW25hbWVzW2ldXTtcclxuICAgICAgICAgICAgbnMuYWRkKCAvLyBtb3N0IHRvIGxlYXN0IGxpa2VseVxyXG4gICAgICAgICAgICAgICAgKCBuZXN0ZWQuZmllbGRzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gVHlwZS5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBuZXN0ZWQudmFsdWVzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gRW51bS5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBuZXN0ZWQubWV0aG9kcyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IFNlcnZpY2UuZnJvbUpTT05cclxuICAgICAgICAgICAgICAgIDogbmVzdGVkLmlkICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gRmllbGQuZnJvbUpTT05cclxuICAgICAgICAgICAgICAgIDogTmFtZXNwYWNlLmZyb21KU09OICkobmFtZXNbaV0sIG5lc3RlZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBuZXN0ZWQgb2JqZWN0IG9mIHRoZSBzcGVjaWZpZWQgbmFtZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmVzdGVkIG9iamVjdCBuYW1lXHJcbiAqIEByZXR1cm5zIHtSZWZsZWN0aW9uT2JqZWN0fG51bGx9IFRoZSByZWZsZWN0aW9uIG9iamVjdCBvciBgbnVsbGAgaWYgaXQgZG9lc24ndCBleGlzdFxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMubmVzdGVkICYmIHRoaXMubmVzdGVkW25hbWVdXHJcbiAgICAgICAgfHwgbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIG5lc3RlZCB7QGxpbmsgRW51bXxlbnVtfSBvZiB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcbiAqIFRoaXMgbWV0aG9kcyBkaWZmZXJzIGZyb20ge0BsaW5rIE5hbWVzcGFjZSNnZXR8Z2V0fSBpbiB0aGF0IGl0IHJldHVybnMgYW4gZW51bSdzIHZhbHVlcyBkaXJlY3RseSBhbmQgdGhyb3dzIGluc3RlYWQgb2YgcmV0dXJuaW5nIGBudWxsYC5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmVzdGVkIGVudW0gbmFtZVxyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsbnVtYmVyPn0gRW51bSB2YWx1ZXNcclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZXJlIGlzIG5vIHN1Y2ggZW51bVxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5nZXRFbnVtID0gZnVuY3Rpb24gZ2V0RW51bShuYW1lKSB7XHJcbiAgICBpZiAodGhpcy5uZXN0ZWQgJiYgdGhpcy5uZXN0ZWRbbmFtZV0gaW5zdGFuY2VvZiBFbnVtKVxyXG4gICAgICAgIHJldHVybiB0aGlzLm5lc3RlZFtuYW1lXS52YWx1ZXM7XHJcbiAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggZW51bTogXCIgKyBuYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgbmVzdGVkIG9iamVjdCB0byB0aGlzIG5hbWVzcGFjZS5cclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0fSBvYmplY3QgTmVzdGVkIG9iamVjdCB0byBhZGRcclxuICogQHJldHVybnMge05hbWVzcGFjZX0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgbmVzdGVkIG9iamVjdCB3aXRoIHRoaXMgbmFtZVxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQob2JqZWN0KSB7XHJcblxyXG4gICAgaWYgKCEob2JqZWN0IGluc3RhbmNlb2YgRmllbGQgJiYgb2JqZWN0LmV4dGVuZCAhPT0gdW5kZWZpbmVkIHx8IG9iamVjdCBpbnN0YW5jZW9mIFR5cGUgfHwgb2JqZWN0IGluc3RhbmNlb2YgRW51bSB8fCBvYmplY3QgaW5zdGFuY2VvZiBTZXJ2aWNlIHx8IG9iamVjdCBpbnN0YW5jZW9mIE5hbWVzcGFjZSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwib2JqZWN0IG11c3QgYmUgYSB2YWxpZCBuZXN0ZWQgb2JqZWN0XCIpO1xyXG5cclxuICAgIGlmICghdGhpcy5uZXN0ZWQpXHJcbiAgICAgICAgdGhpcy5uZXN0ZWQgPSB7fTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBwcmV2ID0gdGhpcy5nZXQob2JqZWN0Lm5hbWUpO1xyXG4gICAgICAgIGlmIChwcmV2KSB7XHJcbiAgICAgICAgICAgIGlmIChwcmV2IGluc3RhbmNlb2YgTmFtZXNwYWNlICYmIG9iamVjdCBpbnN0YW5jZW9mIE5hbWVzcGFjZSAmJiAhKHByZXYgaW5zdGFuY2VvZiBUeXBlIHx8IHByZXYgaW5zdGFuY2VvZiBTZXJ2aWNlKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBwbGFpbiBuYW1lc3BhY2UgYnV0IGtlZXAgZXhpc3RpbmcgbmVzdGVkIGVsZW1lbnRzIGFuZCBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICB2YXIgbmVzdGVkID0gcHJldi5uZXN0ZWRBcnJheTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVzdGVkLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5hZGQobmVzdGVkW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHByZXYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5lc3RlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lc3RlZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnNldE9wdGlvbnMocHJldi5vcHRpb25zLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJkdXBsaWNhdGUgbmFtZSAnXCIgKyBvYmplY3QubmFtZSArIFwiJyBpbiBcIiArIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubmVzdGVkW29iamVjdC5uYW1lXSA9IG9iamVjdDtcclxuICAgIG9iamVjdC5vbkFkZCh0aGlzKTtcclxuICAgIHJldHVybiBjbGVhckNhY2hlKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYSBuZXN0ZWQgb2JqZWN0IGZyb20gdGhpcyBuYW1lc3BhY2UuXHJcbiAqIEBwYXJhbSB7UmVmbGVjdGlvbk9iamVjdH0gb2JqZWN0IE5lc3RlZCBvYmplY3QgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYG9iamVjdGAgaXMgbm90IGEgbWVtYmVyIG9mIHRoaXMgbmFtZXNwYWNlXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShvYmplY3QpIHtcclxuXHJcbiAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBSZWZsZWN0aW9uT2JqZWN0KSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJvYmplY3QgbXVzdCBiZSBhIFJlZmxlY3Rpb25PYmplY3RcIik7XHJcbiAgICBpZiAob2JqZWN0LnBhcmVudCAhPT0gdGhpcylcclxuICAgICAgICB0aHJvdyBFcnJvcihvYmplY3QgKyBcIiBpcyBub3QgYSBtZW1iZXIgb2YgXCIgKyB0aGlzKTtcclxuXHJcbiAgICBkZWxldGUgdGhpcy5uZXN0ZWRbb2JqZWN0Lm5hbWVdO1xyXG4gICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLm5lc3RlZCkubGVuZ3RoKVxyXG4gICAgICAgIHRoaXMubmVzdGVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIG9iamVjdC5vblJlbW92ZSh0aGlzKTtcclxuICAgIHJldHVybiBjbGVhckNhY2hlKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYWRkaXRpYWwgbmFtZXNwYWNlcyB3aXRoaW4gdGhpcyBvbmUgaWYgbm90IHlldCBleGlzdGluZy5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBjcmVhdGVcclxuICogQHBhcmFtIHsqfSBbanNvbl0gTmVzdGVkIHR5cGVzIHRvIGNyZWF0ZSBmcm9tIEpTT05cclxuICogQHJldHVybnMge05hbWVzcGFjZX0gUG9pbnRlciB0byB0aGUgbGFzdCBuYW1lc3BhY2UgY3JlYXRlZCBvciBgdGhpc2AgaWYgcGF0aCBpcyBlbXB0eVxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5kZWZpbmUgPSBmdW5jdGlvbiBkZWZpbmUocGF0aCwganNvbikge1xyXG5cclxuICAgIGlmICh1dGlsLmlzU3RyaW5nKHBhdGgpKVxyXG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcImlsbGVnYWwgcGF0aFwiKTtcclxuICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoICYmIHBhdGhbMF0gPT09IFwiXCIpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJwYXRoIG11c3QgYmUgcmVsYXRpdmVcIik7XHJcblxyXG4gICAgdmFyIHB0ciA9IHRoaXM7XHJcbiAgICB3aGlsZSAocGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIHBhcnQgPSBwYXRoLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHB0ci5uZXN0ZWQgJiYgcHRyLm5lc3RlZFtwYXJ0XSkge1xyXG4gICAgICAgICAgICBwdHIgPSBwdHIubmVzdGVkW3BhcnRdO1xyXG4gICAgICAgICAgICBpZiAoIShwdHIgaW5zdGFuY2VvZiBOYW1lc3BhY2UpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJwYXRoIGNvbmZsaWN0cyB3aXRoIG5vbi1uYW1lc3BhY2Ugb2JqZWN0c1wiKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgcHRyLmFkZChwdHIgPSBuZXcgTmFtZXNwYWNlKHBhcnQpKTtcclxuICAgIH1cclxuICAgIGlmIChqc29uKVxyXG4gICAgICAgIHB0ci5hZGRKU09OKGpzb24pO1xyXG4gICAgcmV0dXJuIHB0cjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlcyB0aGlzIG5hbWVzcGFjZSdzIGFuZCBhbGwgaXRzIG5lc3RlZCBvYmplY3RzJyB0eXBlIHJlZmVyZW5jZXMuIFVzZWZ1bCB0byB2YWxpZGF0ZSBhIHJlZmxlY3Rpb24gdHJlZSwgYnV0IGNvbWVzIGF0IGEgY29zdC5cclxuICogQHJldHVybnMge05hbWVzcGFjZX0gYHRoaXNgXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLnJlc29sdmVBbGwgPSBmdW5jdGlvbiByZXNvbHZlQWxsKCkge1xyXG4gICAgdmFyIG5lc3RlZCA9IHRoaXMubmVzdGVkQXJyYXksIGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBuZXN0ZWQubGVuZ3RoKVxyXG4gICAgICAgIGlmIChuZXN0ZWRbaV0gaW5zdGFuY2VvZiBOYW1lc3BhY2UpXHJcbiAgICAgICAgICAgIG5lc3RlZFtpKytdLnJlc29sdmVBbGwoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIG5lc3RlZFtpKytdLnJlc29sdmUoKTtcclxuICAgIHJldHVybiB0aGlzLnJlc29sdmUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWN1cnNpdmVseSBsb29rcyB1cCB0aGUgcmVmbGVjdGlvbiBvYmplY3QgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBwYXRoIGluIHRoZSBzY29wZSBvZiB0aGlzIG5hbWVzcGFjZS5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBsb29rIHVwXHJcbiAqIEBwYXJhbSB7KnxBcnJheS48Kj59IGZpbHRlclR5cGVzIEZpbHRlciB0eXBlcywgYW55IGNvbWJpbmF0aW9uIG9mIHRoZSBjb25zdHJ1Y3RvcnMgb2YgYHByb3RvYnVmLlR5cGVgLCBgcHJvdG9idWYuRW51bWAsIGBwcm90b2J1Zi5TZXJ2aWNlYCBldGMuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3BhcmVudEFscmVhZHlDaGVja2VkPWZhbHNlXSBJZiBrbm93biwgd2hldGhlciB0aGUgcGFyZW50IGhhcyBhbHJlYWR5IGJlZW4gY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7UmVmbGVjdGlvbk9iamVjdHxudWxsfSBMb29rZWQgdXAgb2JqZWN0IG9yIGBudWxsYCBpZiBub25lIGNvdWxkIGJlIGZvdW5kXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChwYXRoLCBmaWx0ZXJUeXBlcywgcGFyZW50QWxyZWFkeUNoZWNrZWQpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXJUeXBlcyA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICBwYXJlbnRBbHJlYWR5Q2hlY2tlZCA9IGZpbHRlclR5cGVzO1xyXG4gICAgICAgIGZpbHRlclR5cGVzID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIGlmIChmaWx0ZXJUeXBlcyAmJiAhQXJyYXkuaXNBcnJheShmaWx0ZXJUeXBlcykpXHJcbiAgICAgICAgZmlsdGVyVHlwZXMgPSBbIGZpbHRlclR5cGVzIF07XHJcblxyXG4gICAgaWYgKHV0aWwuaXNTdHJpbmcocGF0aCkgJiYgcGF0aC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAocGF0aCA9PT0gXCIuXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3Q7XHJcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgfSBlbHNlIGlmICghcGF0aC5sZW5ndGgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgLy8gU3RhcnQgYXQgcm9vdCBpZiBwYXRoIGlzIGFic29sdXRlXHJcbiAgICBpZiAocGF0aFswXSA9PT0gXCJcIilcclxuICAgICAgICByZXR1cm4gdGhpcy5yb290Lmxvb2t1cChwYXRoLnNsaWNlKDEpLCBmaWx0ZXJUeXBlcyk7XHJcblxyXG4gICAgLy8gVGVzdCBpZiB0aGUgZmlyc3QgcGFydCBtYXRjaGVzIGFueSBuZXN0ZWQgb2JqZWN0LCBhbmQgaWYgc28sIHRyYXZlcnNlIGlmIHBhdGggY29udGFpbnMgbW9yZVxyXG4gICAgdmFyIGZvdW5kID0gdGhpcy5nZXQocGF0aFswXSk7XHJcbiAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFmaWx0ZXJUeXBlcyB8fCBmaWx0ZXJUeXBlcy5pbmRleE9mKGZvdW5kLmNvbnN0cnVjdG9yKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZm91bmQgaW5zdGFuY2VvZiBOYW1lc3BhY2UgJiYgKGZvdW5kID0gZm91bmQubG9va3VwKHBhdGguc2xpY2UoMSksIGZpbHRlclR5cGVzLCB0cnVlKSkpXHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuXHJcbiAgICAvLyBPdGhlcndpc2UgdHJ5IGVhY2ggbmVzdGVkIG5hbWVzcGFjZVxyXG4gICAgfSBlbHNlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm5lc3RlZEFycmF5Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmVzdGVkQXJyYXlbaV0gaW5zdGFuY2VvZiBOYW1lc3BhY2UgJiYgKGZvdW5kID0gdGhpcy5fbmVzdGVkQXJyYXlbaV0ubG9va3VwKHBhdGgsIGZpbHRlclR5cGVzLCB0cnVlKSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaGFzbid0IGJlZW4gYSBtYXRjaCwgdHJ5IGFnYWluIGF0IHRoZSBwYXJlbnRcclxuICAgIGlmICh0aGlzLnBhcmVudCA9PT0gbnVsbCB8fCBwYXJlbnRBbHJlYWR5Q2hlY2tlZClcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudC5sb29rdXAocGF0aCwgZmlsdGVyVHlwZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvb2tzIHVwIHRoZSByZWZsZWN0aW9uIG9iamVjdCBhdCB0aGUgc3BlY2lmaWVkIHBhdGgsIHJlbGF0aXZlIHRvIHRoaXMgbmFtZXNwYWNlLlxyXG4gKiBAbmFtZSBOYW1lc3BhY2VCYXNlI2xvb2t1cFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBsb29rIHVwXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3BhcmVudEFscmVhZHlDaGVja2VkPWZhbHNlXSBXaGV0aGVyIHRoZSBwYXJlbnQgaGFzIGFscmVhZHkgYmVlbiBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtSZWZsZWN0aW9uT2JqZWN0fG51bGx9IExvb2tlZCB1cCBvYmplY3Qgb3IgYG51bGxgIGlmIG5vbmUgY291bGQgYmUgZm91bmRcclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG4vLyBsb29rdXAocGF0aDogc3RyaW5nLCBbcGFyZW50QWxyZWFkeUNoZWNrZWQ6IGJvb2xlYW5dKVxyXG5cclxuLyoqXHJcbiAqIExvb2tzIHVwIHRoZSB7QGxpbmsgVHlwZXx0eXBlfSBhdCB0aGUgc3BlY2lmaWVkIHBhdGgsIHJlbGF0aXZlIHRvIHRoaXMgbmFtZXNwYWNlLlxyXG4gKiBCZXNpZGVzIGl0cyBzaWduYXR1cmUsIHRoaXMgbWV0aG9kcyBkaWZmZXJzIGZyb20ge0BsaW5rIE5hbWVzcGFjZSNsb29rdXB8bG9va3VwfSBpbiB0aGF0IGl0IHRocm93cyBpbnN0ZWFkIG9mIHJldHVybmluZyBgbnVsbGAuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwYXRoIFBhdGggdG8gbG9vayB1cFxyXG4gKiBAcmV0dXJucyB7VHlwZX0gTG9va2VkIHVwIHR5cGVcclxuICogQHRocm93cyB7RXJyb3J9IElmIGBwYXRoYCBkb2VzIG5vdCBwb2ludCB0byBhIHR5cGVcclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUubG9va3VwVHlwZSA9IGZ1bmN0aW9uIGxvb2t1cFR5cGUocGF0aCkge1xyXG4gICAgdmFyIGZvdW5kID0gdGhpcy5sb29rdXAocGF0aCwgWyBUeXBlIF0pO1xyXG4gICAgaWYgKCFmb3VuZClcclxuICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggdHlwZTogXCIgKyBwYXRoKTtcclxuICAgIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb29rcyB1cCB0aGUgdmFsdWVzIG9mIHRoZSB7QGxpbmsgRW51bXxlbnVtfSBhdCB0aGUgc3BlY2lmaWVkIHBhdGgsIHJlbGF0aXZlIHRvIHRoaXMgbmFtZXNwYWNlLlxyXG4gKiBCZXNpZGVzIGl0cyBzaWduYXR1cmUsIHRoaXMgbWV0aG9kcyBkaWZmZXJzIGZyb20ge0BsaW5rIE5hbWVzcGFjZSNsb29rdXB8bG9va3VwfSBpbiB0aGF0IGl0IHRocm93cyBpbnN0ZWFkIG9mIHJldHVybmluZyBgbnVsbGAuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwYXRoIFBhdGggdG8gbG9vayB1cFxyXG4gKiBAcmV0dXJucyB7RW51bX0gTG9va2VkIHVwIGVudW1cclxuICogQHRocm93cyB7RXJyb3J9IElmIGBwYXRoYCBkb2VzIG5vdCBwb2ludCB0byBhbiBlbnVtXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmxvb2t1cEVudW0gPSBmdW5jdGlvbiBsb29rdXBFbnVtKHBhdGgpIHtcclxuICAgIHZhciBmb3VuZCA9IHRoaXMubG9va3VwKHBhdGgsIFsgRW51bSBdKTtcclxuICAgIGlmICghZm91bmQpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBzdWNoIEVudW0gJ1wiICsgcGF0aCArIFwiJyBpbiBcIiArIHRoaXMpO1xyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvb2tzIHVwIHRoZSB7QGxpbmsgVHlwZXx0eXBlfSBvciB7QGxpbmsgRW51bXxlbnVtfSBhdCB0aGUgc3BlY2lmaWVkIHBhdGgsIHJlbGF0aXZlIHRvIHRoaXMgbmFtZXNwYWNlLlxyXG4gKiBCZXNpZGVzIGl0cyBzaWduYXR1cmUsIHRoaXMgbWV0aG9kcyBkaWZmZXJzIGZyb20ge0BsaW5rIE5hbWVzcGFjZSNsb29rdXB8bG9va3VwfSBpbiB0aGF0IGl0IHRocm93cyBpbnN0ZWFkIG9mIHJldHVybmluZyBgbnVsbGAuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwYXRoIFBhdGggdG8gbG9vayB1cFxyXG4gKiBAcmV0dXJucyB7VHlwZX0gTG9va2VkIHVwIHR5cGUgb3IgZW51bVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYHBhdGhgIGRvZXMgbm90IHBvaW50IHRvIGEgdHlwZSBvciBlbnVtXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmxvb2t1cFR5cGVPckVudW0gPSBmdW5jdGlvbiBsb29rdXBUeXBlT3JFbnVtKHBhdGgpIHtcclxuICAgIHZhciBmb3VuZCA9IHRoaXMubG9va3VwKHBhdGgsIFsgVHlwZSwgRW51bSBdKTtcclxuICAgIGlmICghZm91bmQpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBzdWNoIFR5cGUgb3IgRW51bSAnXCIgKyBwYXRoICsgXCInIGluIFwiICsgdGhpcyk7XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9va3MgdXAgdGhlIHtAbGluayBTZXJ2aWNlfHNlcnZpY2V9IGF0IHRoZSBzcGVjaWZpZWQgcGF0aCwgcmVsYXRpdmUgdG8gdGhpcyBuYW1lc3BhY2UuXHJcbiAqIEJlc2lkZXMgaXRzIHNpZ25hdHVyZSwgdGhpcyBtZXRob2RzIGRpZmZlcnMgZnJvbSB7QGxpbmsgTmFtZXNwYWNlI2xvb2t1cHxsb29rdXB9IGluIHRoYXQgaXQgdGhyb3dzIGluc3RlYWQgb2YgcmV0dXJuaW5nIGBudWxsYC5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBsb29rIHVwXHJcbiAqIEByZXR1cm5zIHtTZXJ2aWNlfSBMb29rZWQgdXAgc2VydmljZVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYHBhdGhgIGRvZXMgbm90IHBvaW50IHRvIGEgc2VydmljZVxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5sb29rdXBTZXJ2aWNlID0gZnVuY3Rpb24gbG9va3VwU2VydmljZShwYXRoKSB7XHJcbiAgICB2YXIgZm91bmQgPSB0aGlzLmxvb2t1cChwYXRoLCBbIFNlcnZpY2UgXSk7XHJcbiAgICBpZiAoIWZvdW5kKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwibm8gc3VjaCBTZXJ2aWNlICdcIiArIHBhdGggKyBcIicgaW4gXCIgKyB0aGlzKTtcclxuICAgIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcbk5hbWVzcGFjZS5fY29uZmlndXJlID0gZnVuY3Rpb24oVHlwZV8sIFNlcnZpY2VfKSB7XHJcbiAgICBUeXBlICAgID0gVHlwZV87XHJcbiAgICBTZXJ2aWNlID0gU2VydmljZV87XHJcbn07XHJcblxyXG59LHtcIjE1XCI6MTUsXCIxNlwiOjE2LFwiMjRcIjoyNCxcIjM3XCI6Mzd9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmxlY3Rpb25PYmplY3Q7XHJcblxyXG5SZWZsZWN0aW9uT2JqZWN0LmNsYXNzTmFtZSA9IFwiUmVmbGVjdGlvbk9iamVjdFwiO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKDM3KTtcclxuXHJcbnZhciBSb290OyAvLyBjeWNsaWNcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHJlZmxlY3Rpb24gb2JqZWN0IGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEJhc2UgY2xhc3Mgb2YgYWxsIHJlZmxlY3Rpb24gb2JqZWN0cy5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE9iamVjdCBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuZnVuY3Rpb24gUmVmbGVjdGlvbk9iamVjdChuYW1lLCBvcHRpb25zKSB7XHJcblxyXG4gICAgaWYgKCF1dGlsLmlzU3RyaW5nKG5hbWUpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIm5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucyAmJiAhdXRpbC5pc09iamVjdChvcHRpb25zKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9ucy5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywqPnx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIG5hbWUgd2l0aGluIGl0cyBuYW1lc3BhY2UuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyZW50IG5hbWVzcGFjZS5cclxuICAgICAqIEB0eXBlIHtOYW1lc3BhY2V8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBhbHJlYWR5IHJlc29sdmVkIG9yIG5vdC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc29sdmVkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21tZW50IHRleHQsIGlmIGFueS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb21tZW50ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaW5nIGZpbGUgbmFtZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5maWxlbmFtZSA9IG51bGw7XHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIHJvb3QgbmFtZXNwYWNlLlxyXG4gICAgICogQG5hbWUgUmVmbGVjdGlvbk9iamVjdCNyb290XHJcbiAgICAgKiBAdHlwZSB7Um9vdH1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICByb290OiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHB0ciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHdoaWxlIChwdHIucGFyZW50ICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcHRyID0gcHRyLnBhcmVudDtcclxuICAgICAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVsbCBuYW1lIGluY2x1ZGluZyBsZWFkaW5nIGRvdC5cclxuICAgICAqIEBuYW1lIFJlZmxlY3Rpb25PYmplY3QjZnVsbE5hbWVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZnVsbE5hbWU6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IFsgdGhpcy5uYW1lIF0sXHJcbiAgICAgICAgICAgICAgICBwdHIgPSB0aGlzLnBhcmVudDtcclxuICAgICAgICAgICAgd2hpbGUgKHB0cikge1xyXG4gICAgICAgICAgICAgICAgcGF0aC51bnNoaWZ0KHB0ci5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHB0ciA9IHB0ci5wYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhdGguam9pbihcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIHJlZmxlY3Rpb24gb2JqZWN0IHRvIGl0cyBkZXNjcmlwdG9yIHJlcHJlc2VudGF0aW9uLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IERlc2NyaXB0b3JcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5SZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS50b0pTT04gPSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICB0aHJvdyBFcnJvcigpOyAvLyBub3QgaW1wbGVtZW50ZWQsIHNob3VsZG4ndCBoYXBwZW5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgd2hlbiB0aGlzIG9iamVjdCBpcyBhZGRlZCB0byBhIHBhcmVudC5cclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0fSBwYXJlbnQgUGFyZW50IGFkZGVkIHRvXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5SZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uIG9uQWRkKHBhcmVudCkge1xyXG4gICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50ICE9PSBwYXJlbnQpXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlKHRoaXMpO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB0aGlzLnJlc29sdmVkID0gZmFsc2U7XHJcbiAgICB2YXIgcm9vdCA9IHBhcmVudC5yb290O1xyXG4gICAgaWYgKHJvb3QgaW5zdGFuY2VvZiBSb290KVxyXG4gICAgICAgIHJvb3QuX2hhbmRsZUFkZCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgd2hlbiB0aGlzIG9iamVjdCBpcyByZW1vdmVkIGZyb20gYSBwYXJlbnQuXHJcbiAqIEBwYXJhbSB7UmVmbGVjdGlvbk9iamVjdH0gcGFyZW50IFBhcmVudCByZW1vdmVkIGZyb21cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24gb25SZW1vdmUocGFyZW50KSB7XHJcbiAgICB2YXIgcm9vdCA9IHBhcmVudC5yb290O1xyXG4gICAgaWYgKHJvb3QgaW5zdGFuY2VvZiBSb290KVxyXG4gICAgICAgIHJvb3QuX2hhbmRsZVJlbW92ZSh0aGlzKTtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMucmVzb2x2ZWQgPSBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlcyB0aGlzIG9iamVjdHMgdHlwZSByZWZlcmVuY2VzLlxyXG4gKiBAcmV0dXJucyB7UmVmbGVjdGlvbk9iamVjdH0gYHRoaXNgXHJcbiAqL1xyXG5SZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSgpIHtcclxuICAgIGlmICh0aGlzLnJlc29sdmVkKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgaWYgKHRoaXMucm9vdCBpbnN0YW5jZW9mIFJvb3QpXHJcbiAgICAgICAgdGhpcy5yZXNvbHZlZCA9IHRydWU7IC8vIG9ubHkgaWYgcGFydCBvZiBhIHJvb3RcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgYW4gb3B0aW9uIHZhbHVlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBPcHRpb24gbmFtZVxyXG4gKiBAcmV0dXJucyB7Kn0gT3B0aW9uIHZhbHVlIG9yIGB1bmRlZmluZWRgIGlmIG5vdCBzZXRcclxuICovXHJcblJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLmdldE9wdGlvbiA9IGZ1bmN0aW9uIGdldE9wdGlvbihuYW1lKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKVxyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbbmFtZV07XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgYW4gb3B0aW9uLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBPcHRpb24gbmFtZVxyXG4gKiBAcGFyYW0geyp9IHZhbHVlIE9wdGlvbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpZk5vdFNldF0gU2V0cyB0aGUgb3B0aW9uIG9ubHkgaWYgaXQgaXNuJ3QgY3VycmVudGx5IHNldFxyXG4gKiBAcmV0dXJucyB7UmVmbGVjdGlvbk9iamVjdH0gYHRoaXNgXHJcbiAqL1xyXG5SZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS5zZXRPcHRpb24gPSBmdW5jdGlvbiBzZXRPcHRpb24obmFtZSwgdmFsdWUsIGlmTm90U2V0KSB7XHJcbiAgICBpZiAoIWlmTm90U2V0IHx8ICF0aGlzLm9wdGlvbnMgfHwgdGhpcy5vcHRpb25zW25hbWVdID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgKHRoaXMub3B0aW9ucyB8fCAodGhpcy5vcHRpb25zID0ge30pKVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBtdWx0aXBsZSBvcHRpb25zLlxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvcHRpb25zIE9wdGlvbnMgdG8gc2V0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lmTm90U2V0XSBTZXRzIGFuIG9wdGlvbiBvbmx5IGlmIGl0IGlzbid0IGN1cnJlbnRseSBzZXRcclxuICogQHJldHVybnMge1JlZmxlY3Rpb25PYmplY3R9IGB0aGlzYFxyXG4gKi9cclxuUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucywgaWZOb3RTZXQpIHtcclxuICAgIGlmIChvcHRpb25zKVxyXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbihrZXlzW2ldLCBvcHRpb25zW2tleXNbaV1dLCBpZk5vdFNldCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIGluc3RhbmNlIHRvIGl0cyBzdHJpbmcgcmVwcmVzZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENsYXNzIG5hbWVbLCBzcGFjZSwgZnVsbCBuYW1lXVxyXG4gKi9cclxuUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLmNsYXNzTmFtZSxcclxuICAgICAgICBmdWxsTmFtZSAgPSB0aGlzLmZ1bGxOYW1lO1xyXG4gICAgaWYgKGZ1bGxOYW1lLmxlbmd0aClcclxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lICsgXCIgXCIgKyBmdWxsTmFtZTtcclxuICAgIHJldHVybiBjbGFzc05hbWU7XHJcbn07XHJcblxyXG5SZWZsZWN0aW9uT2JqZWN0Ll9jb25maWd1cmUgPSBmdW5jdGlvbihSb290Xykge1xyXG4gICAgUm9vdCA9IFJvb3RfO1xyXG59O1xyXG5cclxufSx7XCIzN1wiOjM3fV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBPbmVPZjtcclxuXHJcbi8vIGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG52YXIgUmVmbGVjdGlvbk9iamVjdCA9IHJlcXVpcmUoMjQpO1xyXG4oKE9uZU9mLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IE9uZU9mKS5jbGFzc05hbWUgPSBcIk9uZU9mXCI7XHJcblxyXG52YXIgRmllbGQgPSByZXF1aXJlKDE2KSxcclxuICAgIHV0aWwgID0gcmVxdWlyZSgzNyk7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBvbmVvZiBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBSZWZsZWN0ZWQgb25lb2YuXHJcbiAqIEBleHRlbmRzIFJlZmxlY3Rpb25PYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE9uZW9mIG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmdbXXxPYmplY3QuPHN0cmluZywqPn0gW2ZpZWxkTmFtZXNdIEZpZWxkIG5hbWVzXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29tbWVudF0gQ29tbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBmaWVsZFxyXG4gKi9cclxuZnVuY3Rpb24gT25lT2YobmFtZSwgZmllbGROYW1lcywgb3B0aW9ucywgY29tbWVudCkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGZpZWxkTmFtZXMpKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGZpZWxkTmFtZXM7XHJcbiAgICAgICAgZmllbGROYW1lcyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIFJlZmxlY3Rpb25PYmplY3QuY2FsbCh0aGlzLCBuYW1lLCBvcHRpb25zKTtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICghKGZpZWxkTmFtZXMgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KGZpZWxkTmFtZXMpKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJmaWVsZE5hbWVzIG11c3QgYmUgYW4gQXJyYXlcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWVsZCBuYW1lcyB0aGF0IGJlbG9uZyB0byB0aGlzIG9uZW9mLlxyXG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm9uZW9mID0gZmllbGROYW1lcyB8fCBbXTsgLy8gdG9KU09OLCBtYXJrZXJcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpZWxkcyB0aGF0IGJlbG9uZyB0byB0aGlzIG9uZW9mIGFzIGFuIGFycmF5IGZvciBpdGVyYXRpb24uXHJcbiAgICAgKiBAdHlwZSB7RmllbGRbXX1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZpZWxkc0FycmF5ID0gW107IC8vIGRlY2xhcmVkIHJlYWRvbmx5IGZvciBjb25mb3JtYW5jZSwgcG9zc2libHkgbm90IHlldCBhZGRlZCB0byBwYXJlbnRcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1lbnQgZm9yIHRoaXMgZmllbGQuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbmVvZiBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElPbmVPZlxyXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSBvbmVvZiBPbmVvZiBmaWVsZCBuYW1lc1xyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gT25lb2Ygb3B0aW9uc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgb25lb2YgZnJvbSBhIG9uZW9mIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE9uZW9mIG5hbWVcclxuICogQHBhcmFtIHtJT25lT2Z9IGpzb24gT25lb2YgZGVzY3JpcHRvclxyXG4gKiBAcmV0dXJucyB7T25lT2Z9IENyZWF0ZWQgb25lb2ZcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbk9uZU9mLmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04obmFtZSwganNvbikge1xyXG4gICAgcmV0dXJuIG5ldyBPbmVPZihuYW1lLCBqc29uLm9uZW9mLCBqc29uLm9wdGlvbnMsIGpzb24uY29tbWVudCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBvbmVvZiB0byBhIG9uZW9mIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7SU9uZU9mfSBPbmVvZiBkZXNjcmlwdG9yXHJcbiAqL1xyXG5PbmVPZi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKHRvSlNPTk9wdGlvbnMpIHtcclxuICAgIHZhciBrZWVwQ29tbWVudHMgPSB0b0pTT05PcHRpb25zID8gQm9vbGVhbih0b0pTT05PcHRpb25zLmtlZXBDb21tZW50cykgOiBmYWxzZTtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcIm9wdGlvbnNcIiAsIHRoaXMub3B0aW9ucyxcclxuICAgICAgICBcIm9uZW9mXCIgICAsIHRoaXMub25lb2YsXHJcbiAgICAgICAgXCJjb21tZW50XCIgLCBrZWVwQ29tbWVudHMgPyB0aGlzLmNvbW1lbnQgOiB1bmRlZmluZWRcclxuICAgIF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgdGhlIGZpZWxkcyBvZiB0aGUgc3BlY2lmaWVkIG9uZW9mIHRvIHRoZSBwYXJlbnQgaWYgbm90IGFscmVhZHkgZG9uZSBzby5cclxuICogQHBhcmFtIHtPbmVPZn0gb25lb2YgVGhlIG9uZW9mXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEBpbm5lclxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRGaWVsZHNUb1BhcmVudChvbmVvZikge1xyXG4gICAgaWYgKG9uZW9mLnBhcmVudClcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9uZW9mLmZpZWxkc0FycmF5Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBpZiAoIW9uZW9mLmZpZWxkc0FycmF5W2ldLnBhcmVudClcclxuICAgICAgICAgICAgICAgIG9uZW9mLnBhcmVudC5hZGQob25lb2YuZmllbGRzQXJyYXlbaV0pO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBhIGZpZWxkIHRvIHRoaXMgb25lb2YgYW5kIHJlbW92ZXMgaXQgZnJvbSBpdHMgY3VycmVudCBwYXJlbnQsIGlmIGFueS5cclxuICogQHBhcmFtIHtGaWVsZH0gZmllbGQgRmllbGQgdG8gYWRkXHJcbiAqIEByZXR1cm5zIHtPbmVPZn0gYHRoaXNgXHJcbiAqL1xyXG5PbmVPZi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKGZpZWxkKSB7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIShmaWVsZCBpbnN0YW5jZW9mIEZpZWxkKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJmaWVsZCBtdXN0IGJlIGEgRmllbGRcIik7XHJcblxyXG4gICAgaWYgKGZpZWxkLnBhcmVudCAmJiBmaWVsZC5wYXJlbnQgIT09IHRoaXMucGFyZW50KVxyXG4gICAgICAgIGZpZWxkLnBhcmVudC5yZW1vdmUoZmllbGQpO1xyXG4gICAgdGhpcy5vbmVvZi5wdXNoKGZpZWxkLm5hbWUpO1xyXG4gICAgdGhpcy5maWVsZHNBcnJheS5wdXNoKGZpZWxkKTtcclxuICAgIGZpZWxkLnBhcnRPZiA9IHRoaXM7IC8vIGZpZWxkLnBhcmVudCByZW1haW5zIG51bGxcclxuICAgIGFkZEZpZWxkc1RvUGFyZW50KHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIGZpZWxkIGZyb20gdGhpcyBvbmVvZiBhbmQgcHV0cyBpdCBiYWNrIHRvIHRoZSBvbmVvZidzIHBhcmVudC5cclxuICogQHBhcmFtIHtGaWVsZH0gZmllbGQgRmllbGQgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm5zIHtPbmVPZn0gYHRoaXNgXHJcbiAqL1xyXG5PbmVPZi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGZpZWxkKSB7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIShmaWVsZCBpbnN0YW5jZW9mIEZpZWxkKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJmaWVsZCBtdXN0IGJlIGEgRmllbGRcIik7XHJcblxyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5maWVsZHNBcnJheS5pbmRleE9mKGZpZWxkKTtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmIChpbmRleCA8IDApXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoZmllbGQgKyBcIiBpcyBub3QgYSBtZW1iZXIgb2YgXCIgKyB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkc0FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICBpbmRleCA9IHRoaXMub25lb2YuaW5kZXhPZihmaWVsZC5uYW1lKTtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgaWYgKGluZGV4ID4gLTEpIC8vIHRoZW9yZXRpY2FsXHJcbiAgICAgICAgdGhpcy5vbmVvZi5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIGZpZWxkLnBhcnRPZiA9IG51bGw7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcbk9uZU9mLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uIG9uQWRkKHBhcmVudCkge1xyXG4gICAgUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBwYXJlbnQpO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgLy8gQ29sbGVjdCBwcmVzZW50IGZpZWxkc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9uZW9mLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkID0gcGFyZW50LmdldCh0aGlzLm9uZW9mW2ldKTtcclxuICAgICAgICBpZiAoZmllbGQgJiYgIWZpZWxkLnBhcnRPZikge1xyXG4gICAgICAgICAgICBmaWVsZC5wYXJ0T2YgPSBzZWxmO1xyXG4gICAgICAgICAgICBzZWxmLmZpZWxkc0FycmF5LnB1c2goZmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEFkZCBub3QgeWV0IHByZXNlbnQgZmllbGRzXHJcbiAgICBhZGRGaWVsZHNUb1BhcmVudCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcbk9uZU9mLnByb3RvdHlwZS5vblJlbW92ZSA9IGZ1bmN0aW9uIG9uUmVtb3ZlKHBhcmVudCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGZpZWxkOyBpIDwgdGhpcy5maWVsZHNBcnJheS5sZW5ndGg7ICsraSlcclxuICAgICAgICBpZiAoKGZpZWxkID0gdGhpcy5maWVsZHNBcnJheVtpXSkucGFyZW50KVxyXG4gICAgICAgICAgICBmaWVsZC5wYXJlbnQucmVtb3ZlKGZpZWxkKTtcclxuICAgIFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgcGFyZW50KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgZnVuY3Rpb24gYXMgcmV0dXJuZWQgYnkge0BsaW5rIE9uZU9mLmR9IChUeXBlU2NyaXB0KS5cclxuICogQHR5cGVkZWYgT25lT2ZEZWNvcmF0b3JcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRhcmdldCBwcm90b3R5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IG9uZW9mTmFtZSBPbmVPZiBuYW1lXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE9uZU9mIGRlY29yYXRvciAoVHlwZVNjcmlwdCkuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xyXG4gKiBAcmV0dXJucyB7T25lT2ZEZWNvcmF0b3J9IERlY29yYXRvciBmdW5jdGlvblxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIHN0cmluZ1xyXG4gKi9cclxuT25lT2YuZCA9IGZ1bmN0aW9uIGRlY29yYXRlT25lT2YoKSB7XHJcbiAgICB2YXIgZmllbGROYW1lcyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKSxcclxuICAgICAgICBpbmRleCA9IDA7XHJcbiAgICB3aGlsZSAoaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoKVxyXG4gICAgICAgIGZpZWxkTmFtZXNbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4KytdO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9uZU9mRGVjb3JhdG9yKHByb3RvdHlwZSwgb25lb2ZOYW1lKSB7XHJcbiAgICAgICAgdXRpbC5kZWNvcmF0ZVR5cGUocHJvdG90eXBlLmNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAgICAuYWRkKG5ldyBPbmVPZihvbmVvZk5hbWUsIGZpZWxkTmFtZXMpKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCBvbmVvZk5hbWUsIHtcclxuICAgICAgICAgICAgZ2V0OiB1dGlsLm9uZU9mR2V0dGVyKGZpZWxkTmFtZXMpLFxyXG4gICAgICAgICAgICBzZXQ6IHV0aWwub25lT2ZTZXR0ZXIoZmllbGROYW1lcylcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn07XHJcblxyXG59LHtcIjE2XCI6MTYsXCIyNFwiOjI0LFwiMzdcIjozN31dLDI2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XHJcblxyXG5wYXJzZS5maWxlbmFtZSA9IG51bGw7XHJcbnBhcnNlLmRlZmF1bHRzID0geyBrZWVwQ2FzZTogZmFsc2UgfTtcclxuXHJcbnZhciB0b2tlbml6ZSAgPSByZXF1aXJlKDM0KSxcclxuICAgIFJvb3QgICAgICA9IHJlcXVpcmUoMjkpLFxyXG4gICAgVHlwZSAgICAgID0gcmVxdWlyZSgzNSksXHJcbiAgICBGaWVsZCAgICAgPSByZXF1aXJlKDE2KSxcclxuICAgIE1hcEZpZWxkICA9IHJlcXVpcmUoMjApLFxyXG4gICAgT25lT2YgICAgID0gcmVxdWlyZSgyNSksXHJcbiAgICBFbnVtICAgICAgPSByZXF1aXJlKDE1KSxcclxuICAgIFNlcnZpY2UgICA9IHJlcXVpcmUoMzMpLFxyXG4gICAgTWV0aG9kICAgID0gcmVxdWlyZSgyMiksXHJcbiAgICB0eXBlcyAgICAgPSByZXF1aXJlKDM2KSxcclxuICAgIHV0aWwgICAgICA9IHJlcXVpcmUoMzcpO1xyXG5cclxudmFyIGJhc2UxMFJlICAgID0gL15bMS05XVswLTldKiQvLFxyXG4gICAgYmFzZTEwTmVnUmUgPSAvXi0/WzEtOV1bMC05XSokLyxcclxuICAgIGJhc2UxNlJlICAgID0gL14wW3hdWzAtOWEtZkEtRl0rJC8sXHJcbiAgICBiYXNlMTZOZWdSZSA9IC9eLT8wW3hdWzAtOWEtZkEtRl0rJC8sXHJcbiAgICBiYXNlOFJlICAgICA9IC9eMFswLTddKyQvLFxyXG4gICAgYmFzZThOZWdSZSAgPSAvXi0/MFswLTddKyQvLFxyXG4gICAgbnVtYmVyUmUgICAgPSAvXig/IVtlRV0pWzAtOV0qKD86XFwuWzAtOV0qKT8oPzpbZUVdWystXT9bMC05XSspPyQvLFxyXG4gICAgbmFtZVJlICAgICAgPSAvXlthLXpBLVpfXVthLXpBLVpfMC05XSokLyxcclxuICAgIHR5cGVSZWZSZSAgID0gL14oPzpcXC4/W2EtekEtWl9dW2EtekEtWl8wLTldKikoPzpcXC5bYS16QS1aX11bYS16QS1aXzAtOV0qKSokLyxcclxuICAgIGZxVHlwZVJlZlJlID0gL14oPzpcXC5bYS16QS1aX11bYS16QS1aXzAtOV0qKSskLztcclxuXHJcbi8qKlxyXG4gKiBSZXN1bHQgb2JqZWN0IHJldHVybmVkIGZyb20ge0BsaW5rIHBhcnNlfS5cclxuICogQGludGVyZmFjZSBJUGFyc2VyUmVzdWx0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfHVuZGVmaW5lZH0gcGFja2FnZSBQYWNrYWdlIG5hbWUsIGlmIGRlY2xhcmVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW118dW5kZWZpbmVkfSBpbXBvcnRzIEltcG9ydHMsIGlmIGFueVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfHVuZGVmaW5lZH0gd2Vha0ltcG9ydHMgV2VhayBpbXBvcnRzLCBpZiBhbnlcclxuICogQHByb3BlcnR5IHtzdHJpbmd8dW5kZWZpbmVkfSBzeW50YXggU3ludGF4LCBpZiBzcGVjaWZpZWQgKGVpdGhlciBgXCJwcm90bzJcImAgb3IgYFwicHJvdG8zXCJgKVxyXG4gKiBAcHJvcGVydHkge1Jvb3R9IHJvb3QgUG9wdWxhdGVkIHJvb3QgaW5zdGFuY2VcclxuICovXHJcblxyXG4vKipcclxuICogT3B0aW9ucyBtb2RpZnlpbmcgdGhlIGJlaGF2aW9yIG9mIHtAbGluayBwYXJzZX0uXHJcbiAqIEBpbnRlcmZhY2UgSVBhcnNlT3B0aW9uc1xyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtrZWVwQ2FzZT1mYWxzZV0gS2VlcHMgZmllbGQgY2FzaW5nIGluc3RlYWQgb2YgY29udmVydGluZyB0byBjYW1lbCBjYXNlXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2FsdGVybmF0ZUNvbW1lbnRNb2RlPWZhbHNlXSBSZWNvZ25pemUgZG91YmxlLXNsYXNoIGNvbW1lbnRzIGluIGFkZGl0aW9uIHRvIGRvYy1ibG9jayBjb21tZW50cy5cclxuICovXHJcblxyXG4vKipcclxuICogT3B0aW9ucyBtb2RpZnlpbmcgdGhlIGJlaGF2aW9yIG9mIEpTT04gc2VyaWFsaXphdGlvbi5cclxuICogQGludGVyZmFjZSBJVG9KU09OT3B0aW9uc1xyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtrZWVwQ29tbWVudHM9ZmFsc2VdIFNlcmlhbGl6ZXMgY29tbWVudHMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gLnByb3RvIHNvdXJjZSBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgcGFyc2VkIGNvbnRlbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFNvdXJjZSBjb250ZW50c1xyXG4gKiBAcGFyYW0ge1Jvb3R9IHJvb3QgUm9vdCB0byBwb3B1bGF0ZVxyXG4gKiBAcGFyYW0ge0lQYXJzZU9wdGlvbnN9IFtvcHRpb25zXSBQYXJzZSBvcHRpb25zLiBEZWZhdWx0cyB0byB7QGxpbmsgcGFyc2UuZGVmYXVsdHN9IHdoZW4gb21pdHRlZC5cclxuICogQHJldHVybnMge0lQYXJzZXJSZXN1bHR9IFBhcnNlciByZXN1bHRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGZpbGVuYW1lPW51bGwgQ3VycmVudGx5IHByb2Nlc3NpbmcgZmlsZSBuYW1lIGZvciBlcnJvciByZXBvcnRpbmcsIGlmIGtub3duXHJcbiAqIEBwcm9wZXJ0eSB7SVBhcnNlT3B0aW9uc30gZGVmYXVsdHMgRGVmYXVsdCB7QGxpbmsgSVBhcnNlT3B0aW9uc31cclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlKHNvdXJjZSwgcm9vdCwgb3B0aW9ucykge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FsbGJhY2stcmV0dXJuICovXHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgUm9vdCkpIHtcclxuICAgICAgICBvcHRpb25zID0gcm9vdDtcclxuICAgICAgICByb290ID0gbmV3IFJvb3QoKTtcclxuICAgIH1cclxuICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICBvcHRpb25zID0gcGFyc2UuZGVmYXVsdHM7XHJcblxyXG4gICAgdmFyIHRuID0gdG9rZW5pemUoc291cmNlLCBvcHRpb25zLmFsdGVybmF0ZUNvbW1lbnRNb2RlIHx8IGZhbHNlKSxcclxuICAgICAgICBuZXh0ID0gdG4ubmV4dCxcclxuICAgICAgICBwdXNoID0gdG4ucHVzaCxcclxuICAgICAgICBwZWVrID0gdG4ucGVlayxcclxuICAgICAgICBza2lwID0gdG4uc2tpcCxcclxuICAgICAgICBjbW50ID0gdG4uY21udDtcclxuXHJcbiAgICB2YXIgaGVhZCA9IHRydWUsXHJcbiAgICAgICAgcGtnLFxyXG4gICAgICAgIGltcG9ydHMsXHJcbiAgICAgICAgd2Vha0ltcG9ydHMsXHJcbiAgICAgICAgc3ludGF4LFxyXG4gICAgICAgIGlzUHJvdG8zID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIHB0ciA9IHJvb3Q7XHJcblxyXG4gICAgdmFyIGFwcGx5Q2FzZSA9IG9wdGlvbnMua2VlcENhc2UgPyBmdW5jdGlvbihuYW1lKSB7IHJldHVybiBuYW1lOyB9IDogdXRpbC5jYW1lbENhc2U7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGZ1bmN0aW9uIGlsbGVnYWwodG9rZW4sIG5hbWUsIGluc2lkZVRyeUNhdGNoKSB7XHJcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gcGFyc2UuZmlsZW5hbWU7XHJcbiAgICAgICAgaWYgKCFpbnNpZGVUcnlDYXRjaClcclxuICAgICAgICAgICAgcGFyc2UuZmlsZW5hbWUgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBFcnJvcihcImlsbGVnYWwgXCIgKyAobmFtZSB8fCBcInRva2VuXCIpICsgXCIgJ1wiICsgdG9rZW4gKyBcIicgKFwiICsgKGZpbGVuYW1lID8gZmlsZW5hbWUgKyBcIiwgXCIgOiBcIlwiKSArIFwibGluZSBcIiArIHRuLmxpbmUgKyBcIilcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFN0cmluZygpIHtcclxuICAgICAgICB2YXIgdmFsdWVzID0gW10sXHJcbiAgICAgICAgICAgIHRva2VuO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICgodG9rZW4gPSBuZXh0KCkpICE9PSBcIlxcXCJcIiAmJiB0b2tlbiAhPT0gXCInXCIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG5leHQoKSk7XHJcbiAgICAgICAgICAgIHNraXAodG9rZW4pO1xyXG4gICAgICAgICAgICB0b2tlbiA9IHBlZWsoKTtcclxuICAgICAgICB9IHdoaWxlICh0b2tlbiA9PT0gXCJcXFwiXCIgfHwgdG9rZW4gPT09IFwiJ1wiKTtcclxuICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFZhbHVlKGFjY2VwdFR5cGVSZWYpIHtcclxuICAgICAgICB2YXIgdG9rZW4gPSBuZXh0KCk7XHJcbiAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiJ1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiXFxcIlwiOlxyXG4gICAgICAgICAgICAgICAgcHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICBjYXNlIFwidHJ1ZVwiOiBjYXNlIFwiVFJVRVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmYWxzZVwiOiBjYXNlIFwiRkFMU0VcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlTnVtYmVyKHRva2VuLCAvKiBpbnNpZGVUcnlDYXRjaCAqLyB0cnVlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICBpZiAoYWNjZXB0VHlwZVJlZiAmJiB0eXBlUmVmUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuLCBcInZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkUmFuZ2VzKHRhcmdldCwgYWNjZXB0U3RyaW5ncykge1xyXG4gICAgICAgIHZhciB0b2tlbiwgc3RhcnQ7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpZiAoYWNjZXB0U3RyaW5ncyAmJiAoKHRva2VuID0gcGVlaygpKSA9PT0gXCJcXFwiXCIgfHwgdG9rZW4gPT09IFwiJ1wiKSlcclxuICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKHJlYWRTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKFsgc3RhcnQgPSBwYXJzZUlkKG5leHQoKSksIHNraXAoXCJ0b1wiLCB0cnVlKSA/IHBhcnNlSWQobmV4dCgpKSA6IHN0YXJ0IF0pO1xyXG4gICAgICAgIH0gd2hpbGUgKHNraXAoXCIsXCIsIHRydWUpKTtcclxuICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZU51bWJlcih0b2tlbiwgaW5zaWRlVHJ5Q2F0Y2gpIHtcclxuICAgICAgICB2YXIgc2lnbiA9IDE7XHJcbiAgICAgICAgaWYgKHRva2VuLmNoYXJBdCgwKSA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgc2lnbiA9IC0xO1xyXG4gICAgICAgICAgICB0b2tlbiA9IHRva2VuLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5mXCI6IGNhc2UgXCJJTkZcIjogY2FzZSBcIkluZlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpZ24gKiBJbmZpbml0eTtcclxuICAgICAgICAgICAgY2FzZSBcIm5hblwiOiBjYXNlIFwiTkFOXCI6IGNhc2UgXCJOYW5cIjogY2FzZSBcIk5hTlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmFzZTEwUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHJldHVybiBzaWduICogcGFyc2VJbnQodG9rZW4sIDEwKTtcclxuICAgICAgICBpZiAoYmFzZTE2UmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHJldHVybiBzaWduICogcGFyc2VJbnQodG9rZW4sIDE2KTtcclxuICAgICAgICBpZiAoYmFzZThSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh0b2tlbiwgOCk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgaWYgKG51bWJlclJlLnRlc3QodG9rZW4pKVxyXG4gICAgICAgICAgICByZXR1cm4gc2lnbiAqIHBhcnNlRmxvYXQodG9rZW4pO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwibnVtYmVyXCIsIGluc2lkZVRyeUNhdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUlkKHRva2VuLCBhY2NlcHROZWdhdGl2ZSkge1xyXG4gICAgICAgIHN3aXRjaCAodG9rZW4pIHtcclxuICAgICAgICAgICAgY2FzZSBcIm1heFwiOiBjYXNlIFwiTUFYXCI6IGNhc2UgXCJNYXhcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA1MzY4NzA5MTE7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghYWNjZXB0TmVnYXRpdmUgJiYgdG9rZW4uY2hhckF0KDApID09PSBcIi1cIilcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJpZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKGJhc2UxME5lZ1JlLnRlc3QodG9rZW4pKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodG9rZW4sIDEwKTtcclxuICAgICAgICBpZiAoYmFzZTE2TmVnUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0b2tlbiwgMTYpO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgIGlmIChiYXNlOE5lZ1JlLnRlc3QodG9rZW4pKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodG9rZW4sIDgpO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwiaWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VQYWNrYWdlKCkge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAocGtnICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwoXCJwYWNrYWdlXCIpO1xyXG5cclxuICAgICAgICBwa2cgPSBuZXh0KCk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghdHlwZVJlZlJlLnRlc3QocGtnKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChwa2csIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgcHRyID0gcHRyLmRlZmluZShwa2cpO1xyXG4gICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlSW1wb3J0KCkge1xyXG4gICAgICAgIHZhciB0b2tlbiA9IHBlZWsoKTtcclxuICAgICAgICB2YXIgd2hpY2hJbXBvcnRzO1xyXG4gICAgICAgIHN3aXRjaCAodG9rZW4pIHtcclxuICAgICAgICAgICAgY2FzZSBcIndlYWtcIjpcclxuICAgICAgICAgICAgICAgIHdoaWNoSW1wb3J0cyA9IHdlYWtJbXBvcnRzIHx8ICh3ZWFrSW1wb3J0cyA9IFtdKTtcclxuICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicHVibGljXCI6XHJcbiAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWZhbGx0aHJvdWdoXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB3aGljaEltcG9ydHMgPSBpbXBvcnRzIHx8IChpbXBvcnRzID0gW10pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRva2VuID0gcmVhZFN0cmluZygpO1xyXG4gICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgICAgIHdoaWNoSW1wb3J0cy5wdXNoKHRva2VuKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVN5bnRheCgpIHtcclxuICAgICAgICBza2lwKFwiPVwiKTtcclxuICAgICAgICBzeW50YXggPSByZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgaXNQcm90bzMgPSBzeW50YXggPT09IFwicHJvdG8zXCI7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghaXNQcm90bzMgJiYgc3ludGF4ICE9PSBcInByb3RvMlwiKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHN5bnRheCwgXCJzeW50YXhcIik7XHJcblxyXG4gICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlQ29tbW9uKHBhcmVudCwgdG9rZW4pIHtcclxuICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwib3B0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihwYXJlbnQsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwibWVzc2FnZVwiOlxyXG4gICAgICAgICAgICAgICAgcGFyc2VUeXBlKHBhcmVudCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiZW51bVwiOlxyXG4gICAgICAgICAgICAgICAgcGFyc2VFbnVtKHBhcmVudCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwic2VydmljZVwiOlxyXG4gICAgICAgICAgICAgICAgcGFyc2VTZXJ2aWNlKHBhcmVudCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiZXh0ZW5kXCI6XHJcbiAgICAgICAgICAgICAgICBwYXJzZUV4dGVuc2lvbihwYXJlbnQsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaWZCbG9jayhvYmosIGZuSWYsIGZuRWxzZSkge1xyXG4gICAgICAgIHZhciB0cmFpbGluZ0xpbmUgPSB0bi5saW5lO1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgb2JqLmNvbW1lbnQgPSBjbW50KCk7IC8vIHRyeSBibG9jay10eXBlIGNvbW1lbnRcclxuICAgICAgICAgICAgb2JqLmZpbGVuYW1lID0gcGFyc2UuZmlsZW5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChza2lwKFwie1wiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICB2YXIgdG9rZW47XHJcbiAgICAgICAgICAgIHdoaWxlICgodG9rZW4gPSBuZXh0KCkpICE9PSBcIn1cIilcclxuICAgICAgICAgICAgICAgIGZuSWYodG9rZW4pO1xyXG4gICAgICAgICAgICBza2lwKFwiO1wiLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZm5FbHNlKVxyXG4gICAgICAgICAgICAgICAgZm5FbHNlKCk7XHJcbiAgICAgICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmouY29tbWVudCAhPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIG9iai5jb21tZW50ID0gY21udCh0cmFpbGluZ0xpbmUpOyAvLyB0cnkgbGluZS10eXBlIGNvbW1lbnQgaWYgbm8gYmxvY2tcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VUeXBlKHBhcmVudCwgdG9rZW4pIHtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwidHlwZSBuYW1lXCIpO1xyXG5cclxuICAgICAgICB2YXIgdHlwZSA9IG5ldyBUeXBlKHRva2VuKTtcclxuICAgICAgICBpZkJsb2NrKHR5cGUsIGZ1bmN0aW9uIHBhcnNlVHlwZV9ibG9jayh0b2tlbikge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VDb21tb24odHlwZSwgdG9rZW4pKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtYXBcIjpcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZU1hcEZpZWxkKHR5cGUsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVxdWlyZWRcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvcHRpb25hbFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlcGVhdGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGaWVsZCh0eXBlLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9uZW9mXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VPbmVPZih0eXBlLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImV4dGVuc2lvbnNcIjpcclxuICAgICAgICAgICAgICAgICAgICByZWFkUmFuZ2VzKHR5cGUuZXh0ZW5zaW9ucyB8fCAodHlwZS5leHRlbnNpb25zID0gW10pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXJ2ZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICByZWFkUmFuZ2VzKHR5cGUucmVzZXJ2ZWQgfHwgKHR5cGUucmVzZXJ2ZWQgPSBbXSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Byb3RvMyB8fCAhdHlwZVJlZlJlLnRlc3QodG9rZW4pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGaWVsZCh0eXBlLCBcIm9wdGlvbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50LmFkZCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUZpZWxkKHBhcmVudCwgcnVsZSwgZXh0ZW5kKSB7XHJcbiAgICAgICAgdmFyIHR5cGUgPSBuZXh0KCk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiZ3JvdXBcIikge1xyXG4gICAgICAgICAgICBwYXJzZUdyb3VwKHBhcmVudCwgcnVsZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghdHlwZVJlZlJlLnRlc3QodHlwZSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodHlwZSwgXCJ0eXBlXCIpO1xyXG5cclxuICAgICAgICB2YXIgbmFtZSA9IG5leHQoKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdChuYW1lKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChuYW1lLCBcIm5hbWVcIik7XHJcblxyXG4gICAgICAgIG5hbWUgPSBhcHBseUNhc2UobmFtZSk7XHJcbiAgICAgICAgc2tpcChcIj1cIik7XHJcblxyXG4gICAgICAgIHZhciBmaWVsZCA9IG5ldyBGaWVsZChuYW1lLCBwYXJzZUlkKG5leHQoKSksIHR5cGUsIHJ1bGUsIGV4dGVuZCk7XHJcbiAgICAgICAgaWZCbG9jayhmaWVsZCwgZnVuY3Rpb24gcGFyc2VGaWVsZF9ibG9jayh0b2tlbikge1xyXG5cclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBcIm9wdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihmaWVsZCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIHBhcnNlRmllbGRfbGluZSgpIHtcclxuICAgICAgICAgICAgcGFyc2VJbmxpbmVPcHRpb25zKGZpZWxkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKGZpZWxkKTtcclxuXHJcbiAgICAgICAgLy8gSlNPTiBkZWZhdWx0cyB0byBwYWNrZWQ9dHJ1ZSBpZiBub3Qgc2V0IHNvIHdlIGhhdmUgdG8gc2V0IHBhY2tlZD1mYWxzZSBleHBsaWNpdHkgd2hlblxyXG4gICAgICAgIC8vIHBhcnNpbmcgcHJvdG8yIGRlc2NyaXB0b3JzIHdpdGhvdXQgdGhlIG9wdGlvbiwgd2hlcmUgYXBwbGljYWJsZS4gVGhpcyBtdXN0IGJlIGRvbmUgZm9yXHJcbiAgICAgICAgLy8gYWxsIGtub3duIHBhY2thYmxlIHR5cGVzIGFuZCBhbnl0aGluZyB0aGF0IGNvdWxkIGJlIGFuIGVudW0gKD0gaXMgbm90IGEgYmFzaWMgdHlwZSkuXHJcbiAgICAgICAgaWYgKCFpc1Byb3RvMyAmJiBmaWVsZC5yZXBlYXRlZCAmJiAodHlwZXMucGFja2VkW3R5cGVdICE9PSB1bmRlZmluZWQgfHwgdHlwZXMuYmFzaWNbdHlwZV0gPT09IHVuZGVmaW5lZCkpXHJcbiAgICAgICAgICAgIGZpZWxkLnNldE9wdGlvbihcInBhY2tlZFwiLCBmYWxzZSwgLyogaWZOb3RTZXQgKi8gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VHcm91cChwYXJlbnQsIHJ1bGUpIHtcclxuICAgICAgICB2YXIgbmFtZSA9IG5leHQoKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdChuYW1lKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChuYW1lLCBcIm5hbWVcIik7XHJcblxyXG4gICAgICAgIHZhciBmaWVsZE5hbWUgPSB1dGlsLmxjRmlyc3QobmFtZSk7XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IGZpZWxkTmFtZSlcclxuICAgICAgICAgICAgbmFtZSA9IHV0aWwudWNGaXJzdChuYW1lKTtcclxuICAgICAgICBza2lwKFwiPVwiKTtcclxuICAgICAgICB2YXIgaWQgPSBwYXJzZUlkKG5leHQoKSk7XHJcbiAgICAgICAgdmFyIHR5cGUgPSBuZXcgVHlwZShuYW1lKTtcclxuICAgICAgICB0eXBlLmdyb3VwID0gdHJ1ZTtcclxuICAgICAgICB2YXIgZmllbGQgPSBuZXcgRmllbGQoZmllbGROYW1lLCBpZCwgbmFtZSwgcnVsZSk7XHJcbiAgICAgICAgZmllbGQuZmlsZW5hbWUgPSBwYXJzZS5maWxlbmFtZTtcclxuICAgICAgICBpZkJsb2NrKHR5cGUsIGZ1bmN0aW9uIHBhcnNlR3JvdXBfYmxvY2sodG9rZW4pIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvcHRpb25cIjpcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbih0eXBlLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlcXVpcmVkXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwib3B0aW9uYWxcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXBlYXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRmllbGQodHlwZSwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pOyAvLyB0aGVyZSBhcmUgbm8gZ3JvdXBzIHdpdGggcHJvdG8zIHNlbWFudGljc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50LmFkZCh0eXBlKVxyXG4gICAgICAgICAgICAgIC5hZGQoZmllbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlTWFwRmllbGQocGFyZW50KSB7XHJcbiAgICAgICAgc2tpcChcIjxcIik7XHJcbiAgICAgICAgdmFyIGtleVR5cGUgPSBuZXh0KCk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0eXBlcy5tYXBLZXlba2V5VHlwZV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChrZXlUeXBlLCBcInR5cGVcIik7XHJcblxyXG4gICAgICAgIHNraXAoXCIsXCIpO1xyXG4gICAgICAgIHZhciB2YWx1ZVR5cGUgPSBuZXh0KCk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghdHlwZVJlZlJlLnRlc3QodmFsdWVUeXBlKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh2YWx1ZVR5cGUsIFwidHlwZVwiKTtcclxuXHJcbiAgICAgICAgc2tpcChcIj5cIik7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBuZXh0KCk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghbmFtZVJlLnRlc3QobmFtZSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwobmFtZSwgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICBza2lwKFwiPVwiKTtcclxuICAgICAgICB2YXIgZmllbGQgPSBuZXcgTWFwRmllbGQoYXBwbHlDYXNlKG5hbWUpLCBwYXJzZUlkKG5leHQoKSksIGtleVR5cGUsIHZhbHVlVHlwZSk7XHJcbiAgICAgICAgaWZCbG9jayhmaWVsZCwgZnVuY3Rpb24gcGFyc2VNYXBGaWVsZF9ibG9jayh0b2tlbikge1xyXG5cclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBcIm9wdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihmaWVsZCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIHBhcnNlTWFwRmllbGRfbGluZSgpIHtcclxuICAgICAgICAgICAgcGFyc2VJbmxpbmVPcHRpb25zKGZpZWxkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKGZpZWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZU9uZU9mKHBhcmVudCwgdG9rZW4pIHtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIG9uZW9mID0gbmV3IE9uZU9mKGFwcGx5Q2FzZSh0b2tlbikpO1xyXG4gICAgICAgIGlmQmxvY2sob25lb2YsIGZ1bmN0aW9uIHBhcnNlT25lT2ZfYmxvY2sodG9rZW4pIHtcclxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBcIm9wdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihvbmVvZiwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHBhcnNlRmllbGQob25lb2YsIFwib3B0aW9uYWxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKG9uZW9mKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUVudW0ocGFyZW50LCB0b2tlbikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KHRva2VuID0gbmV4dCgpKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICB2YXIgZW5tID0gbmV3IEVudW0odG9rZW4pO1xyXG4gICAgICAgIGlmQmxvY2soZW5tLCBmdW5jdGlvbiBwYXJzZUVudW1fYmxvY2sodG9rZW4pIHtcclxuICAgICAgICAgIHN3aXRjaCh0b2tlbikge1xyXG4gICAgICAgICAgICBjYXNlIFwib3B0aW9uXCI6XHJcbiAgICAgICAgICAgICAgcGFyc2VPcHRpb24oZW5tLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwicmVzZXJ2ZWRcIjpcclxuICAgICAgICAgICAgICByZWFkUmFuZ2VzKGVubS5yZXNlcnZlZCB8fCAoZW5tLnJlc2VydmVkID0gW10pLCB0cnVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgcGFyc2VFbnVtVmFsdWUoZW5tLCB0b2tlbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50LmFkZChlbm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlRW51bVZhbHVlKHBhcmVudCwgdG9rZW4pIHtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgc2tpcChcIj1cIik7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gcGFyc2VJZChuZXh0KCksIHRydWUpLFxyXG4gICAgICAgICAgICBkdW1teSA9IHt9O1xyXG4gICAgICAgIGlmQmxvY2soZHVtbXksIGZ1bmN0aW9uIHBhcnNlRW51bVZhbHVlX2Jsb2NrKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IFwib3B0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uKGR1bW15LCB0b2tlbik7IC8vIHNraXBcclxuICAgICAgICAgICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICB9LCBmdW5jdGlvbiBwYXJzZUVudW1WYWx1ZV9saW5lKCkge1xyXG4gICAgICAgICAgICBwYXJzZUlubGluZU9wdGlvbnMoZHVtbXkpOyAvLyBza2lwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50LmFkZCh0b2tlbiwgdmFsdWUsIGR1bW15LmNvbW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlT3B0aW9uKHBhcmVudCwgdG9rZW4pIHtcclxuICAgICAgICB2YXIgaXNDdXN0b20gPSBza2lwKFwiKFwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIG5hbWUgPSB0b2tlbjtcclxuICAgICAgICBpZiAoaXNDdXN0b20pIHtcclxuICAgICAgICAgICAgc2tpcChcIilcIik7XHJcbiAgICAgICAgICAgIG5hbWUgPSBcIihcIiArIG5hbWUgKyBcIilcIjtcclxuICAgICAgICAgICAgdG9rZW4gPSBwZWVrKCk7XHJcbiAgICAgICAgICAgIGlmIChmcVR5cGVSZWZSZS50ZXN0KHRva2VuKSkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSArPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBza2lwKFwiPVwiKTtcclxuICAgICAgICBwYXJzZU9wdGlvblZhbHVlKHBhcmVudCwgbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VPcHRpb25WYWx1ZShwYXJlbnQsIG5hbWUpIHtcclxuICAgICAgICBpZiAoc2tpcChcIntcIiwgdHJ1ZSkpIHsgLy8geyBhOiBcImZvb1wiIGIgeyBjOiBcImJhclwiIH0gfVxyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgIGlmICghbmFtZVJlLnRlc3QodG9rZW4gPSBuZXh0KCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGVlaygpID09PSBcIntcIilcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZU9wdGlvblZhbHVlKHBhcmVudCwgbmFtZSArIFwiLlwiICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlZWsoKSA9PT0gXCJ7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uVmFsdWUocGFyZW50LCBuYW1lICsgXCIuXCIgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPcHRpb24ocGFyZW50LCBuYW1lICsgXCIuXCIgKyB0b2tlbiwgcmVhZFZhbHVlKHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSB3aGlsZSAoIXNraXAoXCJ9XCIsIHRydWUpKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgc2V0T3B0aW9uKHBhcmVudCwgbmFtZSwgcmVhZFZhbHVlKHRydWUpKTtcclxuICAgICAgICAvLyBEb2VzIG5vdCBlbmZvcmNlIGEgZGVsaW1pdGVyIHRvIGJlIHVuaXZlcnNhbFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbihwYXJlbnQsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudC5zZXRPcHRpb24pXHJcbiAgICAgICAgICAgIHBhcmVudC5zZXRPcHRpb24obmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlSW5saW5lT3B0aW9ucyhwYXJlbnQpIHtcclxuICAgICAgICBpZiAoc2tpcChcIltcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VPcHRpb24ocGFyZW50LCBcIm9wdGlvblwiKTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoc2tpcChcIixcIiwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBza2lwKFwiXVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNlcnZpY2UocGFyZW50LCB0b2tlbikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KHRva2VuID0gbmV4dCgpKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJzZXJ2aWNlIG5hbWVcIik7XHJcblxyXG4gICAgICAgIHZhciBzZXJ2aWNlID0gbmV3IFNlcnZpY2UodG9rZW4pO1xyXG4gICAgICAgIGlmQmxvY2soc2VydmljZSwgZnVuY3Rpb24gcGFyc2VTZXJ2aWNlX2Jsb2NrKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUNvbW1vbihzZXJ2aWNlLCB0b2tlbikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IFwicnBjXCIpXHJcbiAgICAgICAgICAgICAgICBwYXJzZU1ldGhvZChzZXJ2aWNlLCB0b2tlbik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcmVudC5hZGQoc2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VNZXRob2QocGFyZW50LCB0b2tlbikge1xyXG4gICAgICAgIHZhciB0eXBlID0gdG9rZW47XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghbmFtZVJlLnRlc3QodG9rZW4gPSBuZXh0KCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuLCBcIm5hbWVcIik7XHJcblxyXG4gICAgICAgIHZhciBuYW1lID0gdG9rZW4sXHJcbiAgICAgICAgICAgIHJlcXVlc3RUeXBlLCByZXF1ZXN0U3RyZWFtLFxyXG4gICAgICAgICAgICByZXNwb25zZVR5cGUsIHJlc3BvbnNlU3RyZWFtO1xyXG5cclxuICAgICAgICBza2lwKFwiKFwiKTtcclxuICAgICAgICBpZiAoc2tpcChcInN0cmVhbVwiLCB0cnVlKSlcclxuICAgICAgICAgICAgcmVxdWVzdFN0cmVhbSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghdHlwZVJlZlJlLnRlc3QodG9rZW4gPSBuZXh0KCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdFR5cGUgPSB0b2tlbjtcclxuICAgICAgICBza2lwKFwiKVwiKTsgc2tpcChcInJldHVybnNcIik7IHNraXAoXCIoXCIpO1xyXG4gICAgICAgIGlmIChza2lwKFwic3RyZWFtXCIsIHRydWUpKVxyXG4gICAgICAgICAgICByZXNwb25zZVN0cmVhbSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghdHlwZVJlZlJlLnRlc3QodG9rZW4gPSBuZXh0KCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gdG9rZW47XHJcbiAgICAgICAgc2tpcChcIilcIik7XHJcblxyXG4gICAgICAgIHZhciBtZXRob2QgPSBuZXcgTWV0aG9kKG5hbWUsIHR5cGUsIHJlcXVlc3RUeXBlLCByZXNwb25zZVR5cGUsIHJlcXVlc3RTdHJlYW0sIHJlc3BvbnNlU3RyZWFtKTtcclxuICAgICAgICBpZkJsb2NrKG1ldGhvZCwgZnVuY3Rpb24gcGFyc2VNZXRob2RfYmxvY2sodG9rZW4pIHtcclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gXCJvcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VPcHRpb24obWV0aG9kLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50LmFkZChtZXRob2QpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlRXh0ZW5zaW9uKHBhcmVudCwgdG9rZW4pIHtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwicmVmZXJlbmNlXCIpO1xyXG5cclxuICAgICAgICB2YXIgcmVmZXJlbmNlID0gdG9rZW47XHJcbiAgICAgICAgaWZCbG9jayhudWxsLCBmdW5jdGlvbiBwYXJzZUV4dGVuc2lvbl9ibG9jayh0b2tlbikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlcXVpcmVkXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVwZWF0ZWRcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvcHRpb25hbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRmllbGQocGFyZW50LCB0b2tlbiwgcmVmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNQcm90bzMgfHwgIXR5cGVSZWZSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGaWVsZChwYXJlbnQsIFwib3B0aW9uYWxcIiwgcmVmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0b2tlbjtcclxuICAgIHdoaWxlICgodG9rZW4gPSBuZXh0KCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInBhY2thZ2VcIjpcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgIGlmICghaGVhZClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJzZVBhY2thZ2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcImltcG9ydFwiOlxyXG5cclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhcnNlSW1wb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJzeW50YXhcIjpcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgIGlmICghaGVhZClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJzZVN5bnRheCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwib3B0aW9uXCI6XHJcblxyXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgICAgICBpZiAoIWhlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFyc2VPcHRpb24ocHRyLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlQ29tbW9uKHB0ciwgdG9rZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2UuZmlsZW5hbWUgPSBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBcInBhY2thZ2VcIiAgICAgOiBwa2csXHJcbiAgICAgICAgXCJpbXBvcnRzXCIgICAgIDogaW1wb3J0cyxcclxuICAgICAgICAgd2Vha0ltcG9ydHMgIDogd2Vha0ltcG9ydHMsXHJcbiAgICAgICAgIHN5bnRheCAgICAgICA6IHN5bnRheCxcclxuICAgICAgICAgcm9vdCAgICAgICAgIDogcm9vdFxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gLnByb3RvIHNvdXJjZSBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgcGFyc2VkIGNvbnRlbnRzLlxyXG4gKiBAbmFtZSBwYXJzZVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBTb3VyY2UgY29udGVudHNcclxuICogQHBhcmFtIHtJUGFyc2VPcHRpb25zfSBbb3B0aW9uc10gUGFyc2Ugb3B0aW9ucy4gRGVmYXVsdHMgdG8ge0BsaW5rIHBhcnNlLmRlZmF1bHRzfSB3aGVuIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHtJUGFyc2VyUmVzdWx0fSBQYXJzZXIgcmVzdWx0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBmaWxlbmFtZT1udWxsIEN1cnJlbnRseSBwcm9jZXNzaW5nIGZpbGUgbmFtZSBmb3IgZXJyb3IgcmVwb3J0aW5nLCBpZiBrbm93blxyXG4gKiBAcHJvcGVydHkge0lQYXJzZU9wdGlvbnN9IGRlZmF1bHRzIERlZmF1bHQge0BsaW5rIElQYXJzZU9wdGlvbnN9XHJcbiAqIEB2YXJpYXRpb24gMlxyXG4gKi9cclxuXHJcbn0se1wiMTVcIjoxNSxcIjE2XCI6MTYsXCIyMFwiOjIwLFwiMjJcIjoyMixcIjI1XCI6MjUsXCIyOVwiOjI5LFwiMzNcIjozMyxcIjM0XCI6MzQsXCIzNVwiOjM1LFwiMzZcIjozNixcIjM3XCI6Mzd9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRlcjtcclxuXHJcbnZhciB1dGlsICAgICAgPSByZXF1aXJlKDM5KTtcclxuXHJcbnZhciBCdWZmZXJSZWFkZXI7IC8vIGN5Y2xpY1xyXG5cclxudmFyIExvbmdCaXRzICA9IHV0aWwuTG9uZ0JpdHMsXHJcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG5mdW5jdGlvbiBpbmRleE91dE9mUmFuZ2UocmVhZGVyLCB3cml0ZUxlbmd0aCkge1xyXG4gICAgcmV0dXJuIFJhbmdlRXJyb3IoXCJpbmRleCBvdXQgb2YgcmFuZ2U6IFwiICsgcmVhZGVyLnBvcyArIFwiICsgXCIgKyAod3JpdGVMZW5ndGggfHwgMSkgKyBcIiA+IFwiICsgcmVhZGVyLmxlbik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHJlYWRlciBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIGJ1ZmZlci5cclxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXHJcbiAqL1xyXG5mdW5jdGlvbiBSZWFkZXIoYnVmZmVyKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGJ1ZmZlci5cclxuICAgICAqIEB0eXBlIHtVaW50OEFycmF5fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJ1ZiA9IGJ1ZmZlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYnVmZmVyIHBvc2l0aW9uLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wb3MgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBidWZmZXIgbGVuZ3RoLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5sZW4gPSBidWZmZXIubGVuZ3RoO1xyXG59XHJcblxyXG52YXIgY3JlYXRlX2FycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCJcclxuICAgID8gZnVuY3Rpb24gY3JlYXRlX3R5cGVkX2FycmF5KGJ1ZmZlcikge1xyXG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcclxuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xyXG4gICAgfVxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KGJ1ZmZlcikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1ZmZlcikpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbGxlZ2FsIGJ1ZmZlclwiKTtcclxuICAgIH07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyByZWFkZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxyXG4gKiBAcmV0dXJucyB7UmVhZGVyfEJ1ZmZlclJlYWRlcn0gQSB7QGxpbmsgQnVmZmVyUmVhZGVyfSBpZiBgYnVmZmVyYCBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGEge0BsaW5rIFJlYWRlcn1cclxuICogQHRocm93cyB7RXJyb3J9IElmIGBidWZmZXJgIGlzIG5vdCBhIHZhbGlkIGJ1ZmZlclxyXG4gKi9cclxuUmVhZGVyLmNyZWF0ZSA9IHV0aWwuQnVmZmVyXHJcbiAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoYnVmZmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIChSZWFkZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcihidWZmZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWwuQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcilcclxuICAgICAgICAgICAgICAgID8gbmV3IEJ1ZmZlclJlYWRlcihidWZmZXIpXHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICAgICAgOiBjcmVhdGVfYXJyYXkoYnVmZmVyKTtcclxuICAgICAgICB9KShidWZmZXIpO1xyXG4gICAgfVxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIDogY3JlYXRlX2FycmF5O1xyXG5cclxuUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLkFycmF5LnByb3RvdHlwZS5zbGljZTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLnVpbnQzMiA9IChmdW5jdGlvbiByZWFkX3VpbnQzMl9zZXR1cCgpIHtcclxuICAgIHZhciB2YWx1ZSA9IDQyOTQ5NjcyOTU7IC8vIG9wdGltaXplciB0eXBlLWhpbnQsIHRlbmRzIHRvIGRlb3B0IG90aGVyd2lzZSAoPyEpXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVhZF91aW50MzIoKSB7XHJcbiAgICAgICAgdmFsdWUgPSAoICAgICAgICAgdGhpcy5idWZbdGhpcy5wb3NdICYgMTI3ICAgICAgICkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgIDcpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDE0KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyMSkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmICAxNSkgPDwgMjgpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCh0aGlzLnBvcyArPSA1KSA+IHRoaXMubGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5sZW47XHJcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLmludDMyID0gZnVuY3Rpb24gcmVhZF9pbnQzMigpIHtcclxuICAgIHJldHVybiB0aGlzLnVpbnQzMigpIHwgMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ludDMyKCkge1xyXG4gICAgdmFyIHZhbHVlID0gdGhpcy51aW50MzIoKTtcclxuICAgIHJldHVybiB2YWx1ZSA+Pj4gMSBeIC0odmFsdWUgJiAxKSB8IDA7XHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHJcbmZ1bmN0aW9uIHJlYWRMb25nVmFyaW50KCkge1xyXG4gICAgLy8gdGVuZHMgdG8gZGVvcHQgd2l0aCBsb2NhbCB2YXJzIGZvciBvY3RldCBldGMuXHJcbiAgICB2YXIgYml0cyA9IG5ldyBMb25nQml0cygwLCAwKTtcclxuICAgIHZhciBpID0gMDtcclxuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChsbylcclxuICAgICAgICBmb3IgKDsgaSA8IDQ7ICsraSkge1xyXG4gICAgICAgICAgICAvLyAxc3QuLjR0aFxyXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcclxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA1dGhcclxuICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyOCkgPj4+IDA7XHJcbiAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPj4gIDQpID4+PiAwO1xyXG4gICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcclxuICAgICAgICAgICAgcmV0dXJuIGJpdHM7XHJcbiAgICAgICAgaSA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoOyBpIDwgMzsgKytpKSB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIDFzdC4uM3RoXHJcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDR0aFxyXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xyXG4gICAgICAgIHJldHVybiBiaXRzO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGhpKVxyXG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XHJcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxyXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxyXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHZhcmludCBlbmNvZGluZ1wiKTtcclxufVxyXG5cclxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXHJcbiAqIEBuYW1lIFJlYWRlciNpbnQ2NFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSB2YXJpbnQgYXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlLlxyXG4gKiBAbmFtZSBSZWFkZXIjdWludDY0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxyXG4gKiBAbmFtZSBSZWFkZXIjc2ludDY0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIGJvb2xlYW4uXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiByZWFkX2Jvb2woKSB7XHJcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKSAhPT0gMDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHJlYWRGaXhlZDMyX2VuZChidWYsIGVuZCkgeyAvLyBub3RlIHRoYXQgdGhpcyB1c2VzIGBlbmRgLCBub3QgYHBvc2BcclxuICAgIHJldHVybiAoYnVmW2VuZCAtIDRdXHJcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAzXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAyXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbZW5kIC0gMV0gPDwgMjQpID4+PiAwO1xyXG59XHJcblxyXG4vKipcclxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgaW50ZWdlci5cclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5maXhlZDMyID0gZnVuY3Rpb24gcmVhZF9maXhlZDMyKCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxyXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcclxuXHJcbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBmaXhlZCAzMiBiaXRzIGFzIGEgc2lnbmVkIDMyIGJpdCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLnNmaXhlZDMyID0gZnVuY3Rpb24gcmVhZF9zZml4ZWQzMigpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcclxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XHJcblxyXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCkgfCAwO1xyXG59O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXHJcblxyXG5mdW5jdGlvbiByZWFkRml4ZWQ2NCgvKiB0aGlzOiBSZWFkZXIgKi8pIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcclxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgOCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhyZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpLCByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpKTtcclxufVxyXG5cclxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBmaXhlZCA2NCBiaXRzLlxyXG4gKiBAbmFtZSBSZWFkZXIjZml4ZWQ2NFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgemlnLXphZyBlbmNvZGVkIGZpeGVkIDY0IGJpdHMuXHJcbiAqIEBuYW1lIFJlYWRlciNzZml4ZWQ2NFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSBmbG9hdCAoMzIgYml0KSBhcyBhIG51bWJlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiByZWFkX2Zsb2F0KCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxyXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcclxuXHJcbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XHJcbiAgICB0aGlzLnBvcyArPSA0O1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpIGFzIGEgbnVtYmVyLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiByZWFkX2RvdWJsZSgpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcclxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XHJcblxyXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRG91YmxlTEUodGhpcy5idWYsIHRoaXMucG9zKTtcclxuICAgIHRoaXMucG9zICs9IDg7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHMgYSBzZXF1ZW5jZSBvZiBieXRlcyBwcmVjZWVkZWQgYnkgaXRzIGxlbmd0aCBhcyBhIHZhcmludC5cclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiByZWFkX2J5dGVzKCkge1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMudWludDMyKCksXHJcbiAgICAgICAgc3RhcnQgID0gdGhpcy5wb3MsXHJcbiAgICAgICAgZW5kICAgID0gdGhpcy5wb3MgKyBsZW5ndGg7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoZW5kID4gdGhpcy5sZW4pXHJcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XHJcblxyXG4gICAgdGhpcy5wb3MgKz0gbGVuZ3RoO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5idWYpKSAvLyBwbGFpbiBhcnJheVxyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1Zi5zbGljZShzdGFydCwgZW5kKTtcclxuICAgIHJldHVybiBzdGFydCA9PT0gZW5kIC8vIGZpeCBmb3IgSUUgMTAvV2luOCBhbmQgb3RoZXJzJyBzdWJhcnJheSByZXR1cm5pbmcgYXJyYXkgb2Ygc2l6ZSAxXHJcbiAgICAgICAgPyBuZXcgdGhpcy5idWYuY29uc3RydWN0b3IoMClcclxuICAgICAgICA6IHRoaXMuX3NsaWNlLmNhbGwodGhpcy5idWYsIHN0YXJ0LCBlbmQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgc3RyaW5nIHByZWNlZWRlZCBieSBpdHMgYnl0ZSBsZW5ndGggYXMgYSB2YXJpbnQuXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmcoKSB7XHJcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzKCk7XHJcbiAgICByZXR1cm4gdXRmOC5yZWFkKGJ5dGVzLCAwLCBieXRlcy5sZW5ndGgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNraXBzIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGJ5dGVzIGlmIHNwZWNpZmllZCwgb3RoZXJ3aXNlIHNraXBzIGEgdmFyaW50LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTGVuZ3RoIGlmIGtub3duLCBvdGhlcndpc2UgYSB2YXJpbnQgaXMgYXNzdW1lZFxyXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIHNraXAobGVuZ3RoKSB7XHJcbiAgICBpZiAodHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICh0aGlzLnBvcyArIGxlbmd0aCA+IHRoaXMubGVuKVxyXG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcclxuICAgICAgICB0aGlzLnBvcyArPSBsZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcclxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcclxuICAgICAgICB9IHdoaWxlICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyOCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTa2lwcyB0aGUgbmV4dCBlbGVtZW50IG9mIHRoZSBzcGVjaWZpZWQgd2lyZSB0eXBlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lyZVR5cGUgV2lyZSB0eXBlIHJlY2VpdmVkXHJcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5za2lwVHlwZSA9IGZ1bmN0aW9uKHdpcmVUeXBlKSB7XHJcbiAgICBzd2l0Y2ggKHdpcmVUeXBlKSB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLnNraXAoOCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgdGhpcy5za2lwKHRoaXMudWludDMyKCkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGRvIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cclxuICAgICAgICAgICAgICAgIGlmICgod2lyZVR5cGUgPSB0aGlzLnVpbnQzMigpICYgNykgPT09IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBUeXBlKHdpcmVUeXBlKTtcclxuICAgICAgICAgICAgfSB3aGlsZSAodHJ1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgdGhpcy5za2lwKDQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgd2lyZSB0eXBlIFwiICsgd2lyZVR5cGUgKyBcIiBhdCBvZmZzZXQgXCIgKyB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyUmVhZGVyXykge1xyXG4gICAgQnVmZmVyUmVhZGVyID0gQnVmZmVyUmVhZGVyXztcclxuXHJcbiAgICB2YXIgZm4gPSB1dGlsLkxvbmcgPyBcInRvTG9uZ1wiIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXCJ0b051bWJlclwiO1xyXG4gICAgdXRpbC5tZXJnZShSZWFkZXIucHJvdG90eXBlLCB7XHJcblxyXG4gICAgICAgIGludDY0OiBmdW5jdGlvbiByZWFkX2ludDY0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVpbnQ2NDogZnVuY3Rpb24gcmVhZF91aW50NjQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpW2ZuXSh0cnVlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaW50NjQ6IGZ1bmN0aW9uIHJlYWRfc2ludDY0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKS56ekRlY29kZSgpW2ZuXShmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9maXhlZDY0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2ZpeGVkNjQ6IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkNjQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkRml4ZWQ2NC5jYWxsKHRoaXMpW2ZuXShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxufSx7XCIzOVwiOjM5fV0sMjg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJSZWFkZXI7XHJcblxyXG4vLyBleHRlbmRzIFJlYWRlclxyXG52YXIgUmVhZGVyID0gcmVxdWlyZSgyNyk7XHJcbihCdWZmZXJSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZWFkZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJSZWFkZXI7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoMzkpO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHJlYWRlciBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxyXG4gKiBAZXh0ZW5kcyBSZWFkZXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxyXG4gKi9cclxuZnVuY3Rpb24gQnVmZmVyUmVhZGVyKGJ1ZmZlcikge1xyXG4gICAgUmVhZGVyLmNhbGwodGhpcywgYnVmZmVyKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYnVmZmVyLlxyXG4gICAgICogQG5hbWUgQnVmZmVyUmVhZGVyI2J1ZlxyXG4gICAgICogQHR5cGUge0J1ZmZlcn1cclxuICAgICAqL1xyXG59XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG5pZiAodXRpbC5CdWZmZXIpXHJcbiAgICBCdWZmZXJSZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zbGljZTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcbkJ1ZmZlclJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmdfYnVmZmVyKCkge1xyXG4gICAgdmFyIGxlbiA9IHRoaXMudWludDMyKCk7IC8vIG1vZGlmaWVzIHBvc1xyXG4gICAgcmV0dXJuIHRoaXMuYnVmLnV0ZjhTbGljZSh0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxyXG4gKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnl0ZXNcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG59LHtcIjI3XCI6MjcsXCIzOVwiOjM5fV0sMjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBSb290O1xyXG5cclxuLy8gZXh0ZW5kcyBOYW1lc3BhY2VcclxudmFyIE5hbWVzcGFjZSA9IHJlcXVpcmUoMjMpO1xyXG4oKFJvb3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShOYW1lc3BhY2UucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBSb290KS5jbGFzc05hbWUgPSBcIlJvb3RcIjtcclxuXHJcbnZhciBGaWVsZCAgID0gcmVxdWlyZSgxNiksXHJcbiAgICBFbnVtICAgID0gcmVxdWlyZSgxNSksXHJcbiAgICBPbmVPZiAgID0gcmVxdWlyZSgyNSksXHJcbiAgICB1dGlsICAgID0gcmVxdWlyZSgzNyk7XHJcblxyXG52YXIgVHlwZSwgICAvLyBjeWNsaWNcclxuICAgIHBhcnNlLCAgLy8gbWlnaHQgYmUgZXhjbHVkZWRcclxuICAgIGNvbW1vbjsgLy8gXCJcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHJvb3QgbmFtZXNwYWNlIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFJvb3QgbmFtZXNwYWNlIHdyYXBwaW5nIGFsbCB0eXBlcywgZW51bXMsIHNlcnZpY2VzLCBzdWItbmFtZXNwYWNlcyBldGMuIHRoYXQgYmVsb25nIHRvZ2V0aGVyLlxyXG4gKiBAZXh0ZW5kcyBOYW1lc3BhY2VCYXNlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gVG9wIGxldmVsIG9wdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIFJvb3Qob3B0aW9ucykge1xyXG4gICAgTmFtZXNwYWNlLmNhbGwodGhpcywgXCJcIiwgb3B0aW9ucyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZlcnJlZCBleHRlbnNpb24gZmllbGRzLlxyXG4gICAgICogQHR5cGUge0ZpZWxkW119XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGVmZXJyZWQgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc29sdmVkIGZpbGUgbmFtZXMgb2YgbG9hZGVkIGZpbGVzLlxyXG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZpbGVzID0gW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBhIG5hbWVzcGFjZSBkZXNjcmlwdG9yIGludG8gYSByb290IG5hbWVzcGFjZS5cclxuICogQHBhcmFtIHtJTmFtZXNwYWNlfSBqc29uIE5hbWVlc3BhY2UgZGVzY3JpcHRvclxyXG4gKiBAcGFyYW0ge1Jvb3R9IFtyb290XSBSb290IG5hbWVzcGFjZSwgZGVmYXVsdHMgdG8gY3JlYXRlIGEgbmV3IG9uZSBpZiBvbWl0dGVkXHJcbiAqIEByZXR1cm5zIHtSb290fSBSb290IG5hbWVzcGFjZVxyXG4gKi9cclxuUm9vdC5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKGpzb24sIHJvb3QpIHtcclxuICAgIGlmICghcm9vdClcclxuICAgICAgICByb290ID0gbmV3IFJvb3QoKTtcclxuICAgIGlmIChqc29uLm9wdGlvbnMpXHJcbiAgICAgICAgcm9vdC5zZXRPcHRpb25zKGpzb24ub3B0aW9ucyk7XHJcbiAgICByZXR1cm4gcm9vdC5hZGRKU09OKGpzb24ubmVzdGVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlcyB0aGUgcGF0aCBvZiBhbiBpbXBvcnRlZCBmaWxlLCByZWxhdGl2ZSB0byB0aGUgaW1wb3J0aW5nIG9yaWdpbi5cclxuICogVGhpcyBtZXRob2QgZXhpc3RzIHNvIHlvdSBjYW4gb3ZlcnJpZGUgaXQgd2l0aCB5b3VyIG93biBsb2dpYyBpbiBjYXNlIHlvdXIgaW1wb3J0cyBhcmUgc2NhdHRlcmVkIG92ZXIgbXVsdGlwbGUgZGlyZWN0b3JpZXMuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luIFRoZSBmaWxlIG5hbWUgb2YgdGhlIGltcG9ydGluZyBmaWxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXQgVGhlIGZpbGUgbmFtZSBiZWluZyBpbXBvcnRlZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IFJlc29sdmVkIHBhdGggdG8gYHRhcmdldGAgb3IgYG51bGxgIHRvIHNraXAgdGhlIGZpbGVcclxuICovXHJcblJvb3QucHJvdG90eXBlLnJlc29sdmVQYXRoID0gdXRpbC5wYXRoLnJlc29sdmU7XHJcblxyXG4vLyBBIHN5bWJvbC1saWtlIGZ1bmN0aW9uIHRvIHNhZmVseSBzaWduYWwgc3luY2hyb25vdXMgbG9hZGluZ1xyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG5mdW5jdGlvbiBTWU5DKCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eS1mdW5jdGlvblxyXG5cclxuLyoqXHJcbiAqIExvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gdGhpcyByb290IG5hbWVzcGFjZSBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZmlsZW5hbWUgTmFtZXMgb2Ygb25lIG9yIG11bHRpcGxlIGZpbGVzIHRvIGxvYWRcclxuICogQHBhcmFtIHtJUGFyc2VPcHRpb25zfSBvcHRpb25zIFBhcnNlIG9wdGlvbnNcclxuICogQHBhcmFtIHtMb2FkQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5Sb290LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gbG9hZChmaWxlbmFtZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAoIWNhbGxiYWNrKVxyXG4gICAgICAgIHJldHVybiB1dGlsLmFzUHJvbWlzZShsb2FkLCBzZWxmLCBmaWxlbmFtZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgdmFyIHN5bmMgPSBjYWxsYmFjayA9PT0gU1lOQzsgLy8gdW5kb2N1bWVudGVkXHJcblxyXG4gICAgLy8gRmluaXNoZXMgbG9hZGluZyBieSBjYWxsaW5nIHRoZSBjYWxsYmFjayAoZXhhY3RseSBvbmNlKVxyXG4gICAgZnVuY3Rpb24gZmluaXNoKGVyciwgcm9vdCkge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghY2FsbGJhY2spXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgY2IgPSBjYWxsYmFjaztcclxuICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgaWYgKHN5bmMpXHJcbiAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICBjYihlcnIsIHJvb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFByb2Nlc3NlcyBhIHNpbmdsZSBmaWxlXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzKGZpbGVuYW1lLCBzb3VyY2UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodXRpbC5pc1N0cmluZyhzb3VyY2UpICYmIHNvdXJjZS5jaGFyQXQoMCkgPT09IFwie1wiKVxyXG4gICAgICAgICAgICAgICAgc291cmNlID0gSlNPTi5wYXJzZShzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAoIXV0aWwuaXNTdHJpbmcoc291cmNlKSlcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9ucyhzb3VyY2Uub3B0aW9ucykuYWRkSlNPTihzb3VyY2UubmVzdGVkKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZS5maWxlbmFtZSA9IGZpbGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlKHNvdXJjZSwgc2VsZiwgb3B0aW9ucyksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkLmltcG9ydHMpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBwYXJzZWQuaW1wb3J0cy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkID0gc2VsZi5yZXNvbHZlUGF0aChmaWxlbmFtZSwgcGFyc2VkLmltcG9ydHNbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2gocmVzb2x2ZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZC53ZWFrSW1wb3J0cylcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFyc2VkLndlYWtJbXBvcnRzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQgPSBzZWxmLnJlc29sdmVQYXRoKGZpbGVuYW1lLCBwYXJzZWQud2Vha0ltcG9ydHNbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2gocmVzb2x2ZWQsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGZpbmlzaChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXN5bmMgJiYgIXF1ZXVlZClcclxuICAgICAgICAgICAgZmluaXNoKG51bGwsIHNlbGYpOyAvLyBvbmx5IG9uY2UgYW55d2F5XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmV0Y2hlcyBhIHNpbmdsZSBmaWxlXHJcbiAgICBmdW5jdGlvbiBmZXRjaChmaWxlbmFtZSwgd2Vhaykge1xyXG5cclxuICAgICAgICAvLyBTdHJpcCBwYXRoIGlmIHRoaXMgZmlsZSByZWZlcmVuY2VzIGEgYnVuZGxlZCBkZWZpbml0aW9uXHJcbiAgICAgICAgdmFyIGlkeCA9IGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiZ29vZ2xlL3Byb3RvYnVmL1wiKTtcclxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgdmFyIGFsdG5hbWUgPSBmaWxlbmFtZS5zdWJzdHJpbmcoaWR4KTtcclxuICAgICAgICAgICAgaWYgKGFsdG5hbWUgaW4gY29tbW9uKVxyXG4gICAgICAgICAgICAgICAgZmlsZW5hbWUgPSBhbHRuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2tpcCBpZiBhbHJlYWR5IGxvYWRlZCAvIGF0dGVtcHRlZFxyXG4gICAgICAgIGlmIChzZWxmLmZpbGVzLmluZGV4T2YoZmlsZW5hbWUpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzZWxmLmZpbGVzLnB1c2goZmlsZW5hbWUpO1xyXG5cclxuICAgICAgICAvLyBTaG9ydGN1dCBidW5kbGVkIGRlZmluaXRpb25zXHJcbiAgICAgICAgaWYgKGZpbGVuYW1lIGluIGNvbW1vbikge1xyXG4gICAgICAgICAgICBpZiAoc3luYylcclxuICAgICAgICAgICAgICAgIHByb2Nlc3MoZmlsZW5hbWUsIGNvbW1vbltmaWxlbmFtZV0pO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICsrcXVldWVkO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAtLXF1ZXVlZDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzKGZpbGVuYW1lLCBjb21tb25bZmlsZW5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE90aGVyd2lzZSBmZXRjaCBmcm9tIGRpc2sgb3IgbmV0d29ya1xyXG4gICAgICAgIGlmIChzeW5jKSB7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2U7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSB1dGlsLmZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSkudG9TdHJpbmcoXCJ1dGY4XCIpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghd2VhaylcclxuICAgICAgICAgICAgICAgICAgICBmaW5pc2goZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9jZXNzKGZpbGVuYW1lLCBzb3VyY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICsrcXVldWVkO1xyXG4gICAgICAgICAgICB1dGlsLmZldGNoKGZpbGVuYW1lLCBmdW5jdGlvbihlcnIsIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgLS1xdWV1ZWQ7XHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgIGlmICghY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyB0ZXJtaW5hdGVkIG1lYW53aGlsZVxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3ZWFrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5pc2goZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghcXVldWVkKSAvLyBjYW4ndCBiZSBjb3ZlcmVkIHJlbGlhYmx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmlzaChudWxsLCBzZWxmKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGZpbGVuYW1lLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgcXVldWVkID0gMDtcclxuXHJcbiAgICAvLyBBc3NlbWJsaW5nIHRoZSByb290IG5hbWVzcGFjZSBkb2Vzbid0IHJlcXVpcmUgd29ya2luZyB0eXBlXHJcbiAgICAvLyByZWZlcmVuY2VzIGFueW1vcmUsIHNvIHdlIGNhbiBsb2FkIGV2ZXJ5dGhpbmcgaW4gcGFyYWxsZWxcclxuICAgIGlmICh1dGlsLmlzU3RyaW5nKGZpbGVuYW1lKSlcclxuICAgICAgICBmaWxlbmFtZSA9IFsgZmlsZW5hbWUgXTtcclxuICAgIGZvciAodmFyIGkgPSAwLCByZXNvbHZlZDsgaSA8IGZpbGVuYW1lLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGlmIChyZXNvbHZlZCA9IHNlbGYucmVzb2x2ZVBhdGgoXCJcIiwgZmlsZW5hbWVbaV0pKVxyXG4gICAgICAgICAgICBmZXRjaChyZXNvbHZlZCk7XHJcblxyXG4gICAgaWYgKHN5bmMpXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICBpZiAoIXF1ZXVlZClcclxuICAgICAgICBmaW5pc2gobnVsbCwgc2VsZik7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG4vLyBmdW5jdGlvbiBsb2FkKGZpbGVuYW1lOnN0cmluZywgb3B0aW9uczpJUGFyc2VPcHRpb25zLCBjYWxsYmFjazpMb2FkQ2FsbGJhY2spOnVuZGVmaW5lZFxyXG5cclxuLyoqXHJcbiAqIExvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gdGhpcyByb290IG5hbWVzcGFjZSBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrLlxyXG4gKiBAZnVuY3Rpb24gUm9vdCNsb2FkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlbmFtZSBOYW1lcyBvZiBvbmUgb3IgbXVsdGlwbGUgZmlsZXMgdG8gbG9hZFxyXG4gKiBAcGFyYW0ge0xvYWRDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG4vLyBmdW5jdGlvbiBsb2FkKGZpbGVuYW1lOnN0cmluZywgY2FsbGJhY2s6TG9hZENhbGxiYWNrKTp1bmRlZmluZWRcclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBvbmUgb3IgbXVsdGlwbGUgLnByb3RvIG9yIHByZXByb2Nlc3NlZCAuanNvbiBmaWxlcyBpbnRvIHRoaXMgcm9vdCBuYW1lc3BhY2UgYW5kIHJldHVybnMgYSBwcm9taXNlLlxyXG4gKiBAZnVuY3Rpb24gUm9vdCNsb2FkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlbmFtZSBOYW1lcyBvZiBvbmUgb3IgbXVsdGlwbGUgZmlsZXMgdG8gbG9hZFxyXG4gKiBAcGFyYW0ge0lQYXJzZU9wdGlvbnN9IFtvcHRpb25zXSBQYXJzZSBvcHRpb25zLiBEZWZhdWx0cyB0byB7QGxpbmsgcGFyc2UuZGVmYXVsdHN9IHdoZW4gb21pdHRlZC5cclxuICogQHJldHVybnMge1Byb21pc2U8Um9vdD59IFByb21pc2VcclxuICogQHZhcmlhdGlvbiAzXHJcbiAqL1xyXG4vLyBmdW5jdGlvbiBsb2FkKGZpbGVuYW1lOnN0cmluZywgW29wdGlvbnM6SVBhcnNlT3B0aW9uc10pOlByb21pc2U8Um9vdD5cclxuXHJcbi8qKlxyXG4gKiBTeW5jaHJvbm91c2x5IGxvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gdGhpcyByb290IG5hbWVzcGFjZSAobm9kZSBvbmx5KS5cclxuICogQGZ1bmN0aW9uIFJvb3QjbG9hZFN5bmNcclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE5hbWVzIG9mIG9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7SVBhcnNlT3B0aW9uc30gW29wdGlvbnNdIFBhcnNlIG9wdGlvbnMuIERlZmF1bHRzIHRvIHtAbGluayBwYXJzZS5kZWZhdWx0c30gd2hlbiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7Um9vdH0gUm9vdCBuYW1lc3BhY2VcclxuICogQHRocm93cyB7RXJyb3J9IElmIHN5bmNocm9ub3VzIGZldGNoaW5nIGlzIG5vdCBzdXBwb3J0ZWQgKGkuZS4gaW4gYnJvd3NlcnMpIG9yIGlmIGEgZmlsZSdzIHN5bnRheCBpcyBpbnZhbGlkXHJcbiAqL1xyXG5Sb290LnByb3RvdHlwZS5sb2FkU3luYyA9IGZ1bmN0aW9uIGxvYWRTeW5jKGZpbGVuYW1lLCBvcHRpb25zKSB7XHJcbiAgICBpZiAoIXV0aWwuaXNOb2RlKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwibm90IHN1cHBvcnRlZFwiKTtcclxuICAgIHJldHVybiB0aGlzLmxvYWQoZmlsZW5hbWUsIG9wdGlvbnMsIFNZTkMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuUm9vdC5wcm90b3R5cGUucmVzb2x2ZUFsbCA9IGZ1bmN0aW9uIHJlc29sdmVBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5kZWZlcnJlZC5sZW5ndGgpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJ1bnJlc29sdmFibGUgZXh0ZW5zaW9uczogXCIgKyB0aGlzLmRlZmVycmVkLm1hcChmdW5jdGlvbihmaWVsZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCInZXh0ZW5kIFwiICsgZmllbGQuZXh0ZW5kICsgXCInIGluIFwiICsgZmllbGQucGFyZW50LmZ1bGxOYW1lO1xyXG4gICAgICAgIH0pLmpvaW4oXCIsIFwiKSk7XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLnByb3RvdHlwZS5yZXNvbHZlQWxsLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vLyBvbmx5IHVwcGVyY2FzZWQgKGFuZCB0aHVzIGNvbmZsaWN0LWZyZWUpIGNoaWxkcmVuIGFyZSBleHBvc2VkLCBzZWUgYmVsb3dcclxudmFyIGV4cG9zZVJlID0gL15bQS1aXS87XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBhIGRlZmVycmVkIGRlY2xhcmluZyBleHRlbnNpb24gZmllbGQgYnkgY3JlYXRpbmcgYSBzaXN0ZXIgZmllbGQgdG8gcmVwcmVzZW50IGl0IHdpdGhpbiBpdHMgZXh0ZW5kZWQgdHlwZS5cclxuICogQHBhcmFtIHtSb290fSByb290IFJvb3QgaW5zdGFuY2VcclxuICogQHBhcmFtIHtGaWVsZH0gZmllbGQgRGVjbGFyaW5nIGV4dGVuc2lvbiBmaWVsZCB3aXRpbiB0aGUgZGVjbGFyaW5nIHR5cGVcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBzdWNjZXNzZnVsbHkgYWRkZWQgdG8gdGhlIGV4dGVuZGVkIHR5cGUsIGBmYWxzZWAgb3RoZXJ3aXNlXHJcbiAqIEBpbm5lclxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5mdW5jdGlvbiB0cnlIYW5kbGVFeHRlbnNpb24ocm9vdCwgZmllbGQpIHtcclxuICAgIHZhciBleHRlbmRlZFR5cGUgPSBmaWVsZC5wYXJlbnQubG9va3VwKGZpZWxkLmV4dGVuZCk7XHJcbiAgICBpZiAoZXh0ZW5kZWRUeXBlKSB7XHJcbiAgICAgICAgdmFyIHNpc3RlckZpZWxkID0gbmV3IEZpZWxkKGZpZWxkLmZ1bGxOYW1lLCBmaWVsZC5pZCwgZmllbGQudHlwZSwgZmllbGQucnVsZSwgdW5kZWZpbmVkLCBmaWVsZC5vcHRpb25zKTtcclxuICAgICAgICBzaXN0ZXJGaWVsZC5kZWNsYXJpbmdGaWVsZCA9IGZpZWxkO1xyXG4gICAgICAgIGZpZWxkLmV4dGVuc2lvbkZpZWxkID0gc2lzdGVyRmllbGQ7XHJcbiAgICAgICAgZXh0ZW5kZWRUeXBlLmFkZChzaXN0ZXJGaWVsZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgd2hlbiBhbnkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoaXMgcm9vdCBvciBpdHMgc3ViLW5hbWVzcGFjZXMuXHJcbiAqIEBwYXJhbSB7UmVmbGVjdGlvbk9iamVjdH0gb2JqZWN0IE9iamVjdCBhZGRlZFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuUm9vdC5wcm90b3R5cGUuX2hhbmRsZUFkZCA9IGZ1bmN0aW9uIF9oYW5kbGVBZGQob2JqZWN0KSB7XHJcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRmllbGQpIHtcclxuXHJcbiAgICAgICAgaWYgKC8qIGFuIGV4dGVuc2lvbiBmaWVsZCAoaW1wbGllcyBub3QgcGFydCBvZiBhIG9uZW9mKSAqLyBvYmplY3QuZXh0ZW5kICE9PSB1bmRlZmluZWQgJiYgLyogbm90IGFscmVhZHkgaGFuZGxlZCAqLyAhb2JqZWN0LmV4dGVuc2lvbkZpZWxkKVxyXG4gICAgICAgICAgICBpZiAoIXRyeUhhbmRsZUV4dGVuc2lvbih0aGlzLCBvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZC5wdXNoKG9iamVjdCk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBFbnVtKSB7XHJcblxyXG4gICAgICAgIGlmIChleHBvc2VSZS50ZXN0KG9iamVjdC5uYW1lKSlcclxuICAgICAgICAgICAgb2JqZWN0LnBhcmVudFtvYmplY3QubmFtZV0gPSBvYmplY3QudmFsdWVzOyAvLyBleHBvc2UgZW51bSB2YWx1ZXMgYXMgcHJvcGVydHkgb2YgaXRzIHBhcmVudFxyXG5cclxuICAgIH0gZWxzZSBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBPbmVPZikpIC8qIGV2ZXJ5dGhpbmcgZWxzZSBpcyBhIG5hbWVzcGFjZSAqLyB7XHJcblxyXG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBUeXBlKSAvLyBUcnkgdG8gaGFuZGxlIGFueSBkZWZlcnJlZCBleHRlbnNpb25zXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kZWZlcnJlZC5sZW5ndGg7KVxyXG4gICAgICAgICAgICAgICAgaWYgKHRyeUhhbmRsZUV4dGVuc2lvbih0aGlzLCB0aGlzLmRlZmVycmVkW2ldKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAvKiBpbml0aWFsaXplcyAqLyBvYmplY3QubmVzdGVkQXJyYXkubGVuZ3RoOyArK2opIC8vIHJlY3Vyc2UgaW50byB0aGUgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFkZChvYmplY3QuX25lc3RlZEFycmF5W2pdKTtcclxuICAgICAgICBpZiAoZXhwb3NlUmUudGVzdChvYmplY3QubmFtZSkpXHJcbiAgICAgICAgICAgIG9iamVjdC5wYXJlbnRbb2JqZWN0Lm5hbWVdID0gb2JqZWN0OyAvLyBleHBvc2UgbmFtZXNwYWNlIGFzIHByb3BlcnR5IG9mIGl0cyBwYXJlbnRcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgYWJvdmUgYWxzbyBhZGRzIHVwcGVyY2FzZWQgKGFuZCB0aHVzIGNvbmZsaWN0LWZyZWUpIG5lc3RlZCB0eXBlcywgc2VydmljZXMgYW5kIGVudW1zIGFzXHJcbiAgICAvLyBwcm9wZXJ0aWVzIG9mIG5hbWVzcGFjZXMganVzdCBsaWtlIHN0YXRpYyBjb2RlIGRvZXMuIFRoaXMgYWxsb3dzIHVzaW5nIGEgLmQudHMgZ2VuZXJhdGVkIGZvclxyXG4gICAgLy8gYSBzdGF0aWMgbW9kdWxlIHdpdGggcmVmbGVjdGlvbi1iYXNlZCBzb2x1dGlvbnMgd2hlcmUgdGhlIGNvbmRpdGlvbiBpcyBtZXQuXHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIHdoZW4gYW55IG9iamVjdCBpcyByZW1vdmVkIGZyb20gdGhpcyByb290IG9yIGl0cyBzdWItbmFtZXNwYWNlcy5cclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0fSBvYmplY3QgT2JqZWN0IHJlbW92ZWRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHByaXZhdGVcclxuICovXHJcblJvb3QucHJvdG90eXBlLl9oYW5kbGVSZW1vdmUgPSBmdW5jdGlvbiBfaGFuZGxlUmVtb3ZlKG9iamVjdCkge1xyXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEZpZWxkKSB7XHJcblxyXG4gICAgICAgIGlmICgvKiBhbiBleHRlbnNpb24gZmllbGQgKi8gb2JqZWN0LmV4dGVuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICgvKiBhbHJlYWR5IGhhbmRsZWQgKi8gb2JqZWN0LmV4dGVuc2lvbkZpZWxkKSB7IC8vIHJlbW92ZSBpdHMgc2lzdGVyIGZpZWxkXHJcbiAgICAgICAgICAgICAgICBvYmplY3QuZXh0ZW5zaW9uRmllbGQucGFyZW50LnJlbW92ZShvYmplY3QuZXh0ZW5zaW9uRmllbGQpO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LmV4dGVuc2lvbkZpZWxkID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gY2FuY2VsIHRoZSBleHRlbnNpb25cclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZGVmZXJyZWQuaW5kZXhPZihvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEVudW0pIHtcclxuXHJcbiAgICAgICAgaWYgKGV4cG9zZVJlLnRlc3Qob2JqZWN0Lm5hbWUpKVxyXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LnBhcmVudFtvYmplY3QubmFtZV07IC8vIHVuZXhwb3NlIGVudW0gdmFsdWVzXHJcblxyXG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBOYW1lc3BhY2UpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAvKiBpbml0aWFsaXplcyAqLyBvYmplY3QubmVzdGVkQXJyYXkubGVuZ3RoOyArK2kpIC8vIHJlY3Vyc2UgaW50byB0aGUgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVJlbW92ZShvYmplY3QuX25lc3RlZEFycmF5W2ldKTtcclxuXHJcbiAgICAgICAgaWYgKGV4cG9zZVJlLnRlc3Qob2JqZWN0Lm5hbWUpKVxyXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LnBhcmVudFtvYmplY3QubmFtZV07IC8vIHVuZXhwb3NlIG5hbWVzcGFjZXNcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5Sb290Ll9jb25maWd1cmUgPSBmdW5jdGlvbihUeXBlXywgcGFyc2VfLCBjb21tb25fKSB7XHJcbiAgICBUeXBlID0gVHlwZV87XHJcbiAgICBwYXJzZSA9IHBhcnNlXztcclxuICAgIGNvbW1vbiA9IGNvbW1vbl87XHJcbn07XHJcblxyXG59LHtcIjE1XCI6MTUsXCIxNlwiOjE2LFwiMjNcIjoyMyxcIjI1XCI6MjUsXCIzN1wiOjM3fV0sMzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBOYW1lZCByb290cy5cclxuICogVGhpcyBpcyB3aGVyZSBwYmpzIHN0b3JlcyBnZW5lcmF0ZWQgc3RydWN0dXJlcyAodGhlIG9wdGlvbiBgLXIsIC0tcm9vdGAgc3BlY2lmaWVzIGEgbmFtZSkuXHJcbiAqIENhbiBhbHNvIGJlIHVzZWQgbWFudWFsbHkgdG8gbWFrZSByb290cyBhdmFpbGFibGUgYWNjcm9zcyBtb2R1bGVzLlxyXG4gKiBAbmFtZSByb290c1xyXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsUm9vdD59XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIHBianMgLXIgbXlyb290IC1vIGNvbXBpbGVkLmpzIC4uLlxyXG4gKlxyXG4gKiAvLyBpbiBhbm90aGVyIG1vZHVsZTpcclxuICogcmVxdWlyZShcIi4vY29tcGlsZWQuanNcIik7XHJcbiAqXHJcbiAqIC8vIGluIGFueSBzdWJzZXF1ZW50IG1vZHVsZTpcclxuICogdmFyIHJvb3QgPSBwcm90b2J1Zi5yb290c1tcIm15cm9vdFwiXTtcclxuICovXHJcblxyXG59LHt9XSwzMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIFN0cmVhbWluZyBSUEMgaGVscGVycy5cclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIHJwYyA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogUlBDIGltcGxlbWVudGF0aW9uIHBhc3NlZCB0byB7QGxpbmsgU2VydmljZSNjcmVhdGV9IHBlcmZvcm1pbmcgYSBzZXJ2aWNlIHJlcXVlc3Qgb24gbmV0d29yayBsZXZlbCwgaS5lLiBieSB1dGlsaXppbmcgaHR0cCByZXF1ZXN0cyBvciB3ZWJzb2NrZXRzLlxyXG4gKiBAdHlwZWRlZiBSUENJbXBsXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8TWVzc2FnZTx7fT4sTWVzc2FnZTx7fT4+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2QgYmVpbmcgY2FsbGVkXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gcmVxdWVzdERhdGEgUmVxdWVzdCBkYXRhXHJcbiAqIEBwYXJhbSB7UlBDSW1wbENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBmdW5jdGlvbiBycGNJbXBsKG1ldGhvZCwgcmVxdWVzdERhdGEsIGNhbGxiYWNrKSB7XHJcbiAqICAgICBpZiAocHJvdG9idWYudXRpbC5sY0ZpcnN0KG1ldGhvZC5uYW1lKSAhPT0gXCJteU1ldGhvZFwiKSAvLyBjb21wYXRpYmxlIHdpdGggc3RhdGljIGNvZGVcclxuICogICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggbWV0aG9kXCIpO1xyXG4gKiAgICAgYXN5bmNocm9ub3VzbHlPYnRhaW5BUmVzcG9uc2UocmVxdWVzdERhdGEsIGZ1bmN0aW9uKGVyciwgcmVzcG9uc2VEYXRhKSB7XHJcbiAqICAgICAgICAgY2FsbGJhY2soZXJyLCByZXNwb25zZURhdGEpO1xyXG4gKiAgICAgfSk7XHJcbiAqIH1cclxuICovXHJcblxyXG4vKipcclxuICogTm9kZS1zdHlsZSBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBSUENJbXBsfS5cclxuICogQHR5cGVkZWYgUlBDSW1wbENhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55LCBvdGhlcndpc2UgYG51bGxgXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheXxudWxsfSBbcmVzcG9uc2VdIFJlc3BvbnNlIGRhdGEgb3IgYG51bGxgIHRvIHNpZ25hbCBlbmQgb2Ygc3RyZWFtLCBpZiB0aGVyZSBoYXNuJ3QgYmVlbiBhbiBlcnJvclxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbnJwYy5TZXJ2aWNlID0gcmVxdWlyZSgzMik7XHJcblxyXG59LHtcIjMyXCI6MzJ9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2U7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoMzkpO1xyXG5cclxuLy8gRXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuKFNlcnZpY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh1dGlsLkV2ZW50RW1pdHRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFNlcnZpY2U7XHJcblxyXG4vKipcclxuICogQSBzZXJ2aWNlIG1ldGhvZCBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBycGMuU2VydmljZU1ldGhvZHxTZXJ2aWNlTWV0aG9kfS5cclxuICpcclxuICogRGlmZmVycyBmcm9tIHtAbGluayBSUENJbXBsQ2FsbGJhY2t9IGluIHRoYXQgaXQgaXMgYW4gYWN0dWFsIGNhbGxiYWNrIG9mIGEgc2VydmljZSBtZXRob2Qgd2hpY2ggbWF5IG5vdCByZXR1cm4gYHJlc3BvbnNlID0gbnVsbGAuXHJcbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2tcclxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XHJcbiAqIEBwYXJhbSB7VFJlc30gW3Jlc3BvbnNlXSBSZXNwb25zZSBtZXNzYWdlXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgc2VydmljZSBtZXRob2QgcGFydCBvZiBhIHtAbGluayBycGMuU2VydmljZX0gYXMgY3JlYXRlZCBieSB7QGxpbmsgU2VydmljZS5jcmVhdGV9LlxyXG4gKiBAdHlwZWRlZiBycGMuU2VydmljZU1ldGhvZFxyXG4gKiBAdGVtcGxhdGUgVFJlcSBleHRlbmRzIE1lc3NhZ2U8VFJlcT5cclxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxyXG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IFtjYWxsYmFja10gTm9kZS1zdHlsZSBjYWxsYmFjayBjYWxsZWQgd2l0aCB0aGUgZXJyb3IsIGlmIGFueSwgYW5kIHRoZSByZXNwb25zZSBtZXNzYWdlXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1lc3NhZ2U8VFJlcz4+fSBQcm9taXNlIGlmIGBjYWxsYmFja2AgaGFzIGJlZW4gb21pdHRlZCwgb3RoZXJ3aXNlIGB1bmRlZmluZWRgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgUlBDIHNlcnZpY2UgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQW4gUlBDIHNlcnZpY2UgYXMgcmV0dXJuZWQgYnkge0BsaW5rIFNlcnZpY2UjY3JlYXRlfS5cclxuICogQGV4cG9ydHMgcnBjLlNlcnZpY2VcclxuICogQGV4dGVuZHMgdXRpbC5FdmVudEVtaXR0ZXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7UlBDSW1wbH0gcnBjSW1wbCBSUEMgaW1wbGVtZW50YXRpb25cclxuICogQHBhcmFtIHtib29sZWFufSBbcmVxdWVzdERlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNwb25zZURlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcclxuICovXHJcbmZ1bmN0aW9uIFNlcnZpY2UocnBjSW1wbCwgcmVxdWVzdERlbGltaXRlZCwgcmVzcG9uc2VEZWxpbWl0ZWQpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIHJwY0ltcGwgIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJycGNJbXBsIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcclxuXHJcbiAgICB1dGlsLkV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUlBDIGltcGxlbWVudGF0aW9uLiBCZWNvbWVzIGBudWxsYCBvbmNlIHRoZSBzZXJ2aWNlIGlzIGVuZGVkLlxyXG4gICAgICogQHR5cGUge1JQQ0ltcGx8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5ycGNJbXBsID0gcnBjSW1wbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXF1ZXN0RGVsaW1pdGVkID0gQm9vbGVhbihyZXF1ZXN0RGVsaW1pdGVkKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzcG9uc2VEZWxpbWl0ZWQgPSBCb29sZWFuKHJlc3BvbnNlRGVsaW1pdGVkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGxzIGEgc2VydmljZSBtZXRob2QgdGhyb3VnaCB7QGxpbmsgcnBjLlNlcnZpY2UjcnBjSW1wbHxycGNJbXBsfS5cclxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8VFJlcSxUUmVzPn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kXHJcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcT59IHJlcXVlc3RDdG9yIFJlcXVlc3QgY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUUmVzPn0gcmVzcG9uc2VDdG9yIFJlc3BvbnNlIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcclxuICogQHBhcmFtIHtycGMuU2VydmljZU1ldGhvZENhbGxiYWNrPFRSZXM+fSBjYWxsYmFjayBTZXJ2aWNlIGNhbGxiYWNrXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxyXG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLnJwY0NhbGwgPSBmdW5jdGlvbiBycGNDYWxsKG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBpZiAoIXJlcXVlc3QpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVxdWVzdCBtdXN0IGJlIHNwZWNpZmllZFwiKTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAoIWNhbGxiYWNrKVxyXG4gICAgICAgIHJldHVybiB1dGlsLmFzUHJvbWlzZShycGNDYWxsLCBzZWxmLCBtZXRob2QsIHJlcXVlc3RDdG9yLCByZXNwb25zZUN0b3IsIHJlcXVlc3QpO1xyXG5cclxuICAgIGlmICghc2VsZi5ycGNJbXBsKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soRXJyb3IoXCJhbHJlYWR5IGVuZGVkXCIpKTsgfSwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJwY0ltcGwoXHJcbiAgICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICAgICAgcmVxdWVzdEN0b3Jbc2VsZi5yZXF1ZXN0RGVsaW1pdGVkID8gXCJlbmNvZGVEZWxpbWl0ZWRcIiA6IFwiZW5jb2RlXCJdKHJlcXVlc3QpLmZpbmlzaCgpLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBycGNDYWxsYmFjayhlcnIsIHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZCgvKiBlbmRlZEJ5UlBDICovIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiByZXNwb25zZUN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZUN0b3Jbc2VsZi5yZXNwb25zZURlbGltaXRlZCA/IFwiZGVjb2RlRGVsaW1pdGVkXCIgOiBcImRlY29kZVwiXShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImRhdGFcIiwgcmVzcG9uc2UsIG1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhlcnIpOyB9LCAwKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuZHMgdGhpcyBzZXJ2aWNlIGFuZCBlbWl0cyB0aGUgYGVuZGAgZXZlbnQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuZGVkQnlSUEM9ZmFsc2VdIFdoZXRoZXIgdGhlIHNlcnZpY2UgaGFzIGJlZW4gZW5kZWQgYnkgdGhlIFJQQyBpbXBsZW1lbnRhdGlvbi5cclxuICogQHJldHVybnMge3JwYy5TZXJ2aWNlfSBgdGhpc2BcclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZChlbmRlZEJ5UlBDKSB7XHJcbiAgICBpZiAodGhpcy5ycGNJbXBsKSB7XHJcbiAgICAgICAgaWYgKCFlbmRlZEJ5UlBDKSAvLyBzaWduYWwgZW5kIHRvIHJwY0ltcGxcclxuICAgICAgICAgICAgdGhpcy5ycGNJbXBsKG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgIHRoaXMucnBjSW1wbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwiZW5kXCIpLm9mZigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG59LHtcIjM5XCI6Mzl9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2U7XHJcblxyXG4vLyBleHRlbmRzIE5hbWVzcGFjZVxyXG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgyMyk7XHJcbigoU2VydmljZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5hbWVzcGFjZS5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFNlcnZpY2UpLmNsYXNzTmFtZSA9IFwiU2VydmljZVwiO1xyXG5cclxudmFyIE1ldGhvZCA9IHJlcXVpcmUoMjIpLFxyXG4gICAgdXRpbCAgID0gcmVxdWlyZSgzNyksXHJcbiAgICBycGMgICAgPSByZXF1aXJlKDMxKTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHNlcnZpY2UgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgUmVmbGVjdGVkIHNlcnZpY2UuXHJcbiAqIEBleHRlbmRzIE5hbWVzcGFjZUJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFNlcnZpY2UgbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gU2VydmljZSBvcHRpb25zXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBTZXJ2aWNlKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgIE5hbWVzcGFjZS5jYWxsKHRoaXMsIG5hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VydmljZSBtZXRob2RzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLE1ldGhvZD59XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWV0aG9kcyA9IHt9OyAvLyB0b0pTT04sIG1hcmtlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FjaGVkIG1ldGhvZHMgYXMgYW4gYXJyYXkuXHJcbiAgICAgKiBAdHlwZSB7TWV0aG9kW118bnVsbH1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX21ldGhvZHNBcnJheSA9IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIGRlc2NyaXB0b3IuXHJcbiAqIEBpbnRlcmZhY2UgSVNlcnZpY2VcclxuICogQGV4dGVuZHMgSU5hbWVzcGFjZVxyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLElNZXRob2Q+fSBtZXRob2RzIE1ldGhvZCBkZXNjcmlwdG9yc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgc2VydmljZSBmcm9tIGEgc2VydmljZSBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBTZXJ2aWNlIG5hbWVcclxuICogQHBhcmFtIHtJU2VydmljZX0ganNvbiBTZXJ2aWNlIGRlc2NyaXB0b3JcclxuICogQHJldHVybnMge1NlcnZpY2V9IENyZWF0ZWQgc2VydmljZVxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuU2VydmljZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKG5hbWUsIGpzb24pIHtcclxuICAgIHZhciBzZXJ2aWNlID0gbmV3IFNlcnZpY2UobmFtZSwganNvbi5vcHRpb25zKTtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICBpZiAoanNvbi5tZXRob2RzKVxyXG4gICAgICAgIGZvciAodmFyIG5hbWVzID0gT2JqZWN0LmtleXMoanNvbi5tZXRob2RzKSwgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgc2VydmljZS5hZGQoTWV0aG9kLmZyb21KU09OKG5hbWVzW2ldLCBqc29uLm1ldGhvZHNbbmFtZXNbaV1dKSk7XHJcbiAgICBpZiAoanNvbi5uZXN0ZWQpXHJcbiAgICAgICAgc2VydmljZS5hZGRKU09OKGpzb24ubmVzdGVkKTtcclxuICAgIHNlcnZpY2UuY29tbWVudCA9IGpzb24uY29tbWVudDtcclxuICAgIHJldHVybiBzZXJ2aWNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgc2VydmljZSB0byBhIHNlcnZpY2UgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJU2VydmljZX0gU2VydmljZSBkZXNjcmlwdG9yXHJcbiAqL1xyXG5TZXJ2aWNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04odG9KU09OT3B0aW9ucykge1xyXG4gICAgdmFyIGluaGVyaXRlZCA9IE5hbWVzcGFjZS5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdG9KU09OT3B0aW9ucyk7XHJcbiAgICB2YXIga2VlcENvbW1lbnRzID0gdG9KU09OT3B0aW9ucyA/IEJvb2xlYW4odG9KU09OT3B0aW9ucy5rZWVwQ29tbWVudHMpIDogZmFsc2U7XHJcbiAgICByZXR1cm4gdXRpbC50b09iamVjdChbXHJcbiAgICAgICAgXCJvcHRpb25zXCIgLCBpbmhlcml0ZWQgJiYgaW5oZXJpdGVkLm9wdGlvbnMgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwibWV0aG9kc1wiICwgTmFtZXNwYWNlLmFycmF5VG9KU09OKHRoaXMubWV0aG9kc0FycmF5LCB0b0pTT05PcHRpb25zKSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB7fSxcclxuICAgICAgICBcIm5lc3RlZFwiICAsIGluaGVyaXRlZCAmJiBpbmhlcml0ZWQubmVzdGVkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBcImNvbW1lbnRcIiAsIGtlZXBDb21tZW50cyA/IHRoaXMuY29tbWVudCA6IHVuZGVmaW5lZFxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWV0aG9kcyBvZiB0aGlzIHNlcnZpY2UgYXMgYW4gYXJyYXkgZm9yIGl0ZXJhdGlvbi5cclxuICogQG5hbWUgU2VydmljZSNtZXRob2RzQXJyYXlcclxuICogQHR5cGUge01ldGhvZFtdfVxyXG4gKiBAcmVhZG9ubHlcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXJ2aWNlLnByb3RvdHlwZSwgXCJtZXRob2RzQXJyYXlcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kc0FycmF5IHx8ICh0aGlzLl9tZXRob2RzQXJyYXkgPSB1dGlsLnRvQXJyYXkodGhpcy5tZXRob2RzKSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY2xlYXJDYWNoZShzZXJ2aWNlKSB7XHJcbiAgICBzZXJ2aWNlLl9tZXRob2RzQXJyYXkgPSBudWxsO1xyXG4gICAgcmV0dXJuIHNlcnZpY2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXRob2RzW25hbWVdXHJcbiAgICAgICAgfHwgTmFtZXNwYWNlLnByb3RvdHlwZS5nZXQuY2FsbCh0aGlzLCBuYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLnJlc29sdmVBbGwgPSBmdW5jdGlvbiByZXNvbHZlQWxsKCkge1xyXG4gICAgdmFyIG1ldGhvZHMgPSB0aGlzLm1ldGhvZHNBcnJheTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0aG9kcy5sZW5ndGg7ICsraSlcclxuICAgICAgICBtZXRob2RzW2ldLnJlc29sdmUoKTtcclxuICAgIHJldHVybiBOYW1lc3BhY2UucHJvdG90eXBlLnJlc29sdmUuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChvYmplY3QpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICh0aGlzLmdldChvYmplY3QubmFtZSkpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJkdXBsaWNhdGUgbmFtZSAnXCIgKyBvYmplY3QubmFtZSArIFwiJyBpbiBcIiArIHRoaXMpO1xyXG5cclxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNZXRob2QpIHtcclxuICAgICAgICB0aGlzLm1ldGhvZHNbb2JqZWN0Lm5hbWVdID0gb2JqZWN0O1xyXG4gICAgICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBjbGVhckNhY2hlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5wcm90b3R5cGUuYWRkLmNhbGwodGhpcywgb2JqZWN0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShvYmplY3QpIHtcclxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNZXRob2QpIHtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kc1tvYmplY3QubmFtZV0gIT09IG9iamVjdClcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3Iob2JqZWN0ICsgXCIgaXMgbm90IGEgbWVtYmVyIG9mIFwiICsgdGhpcyk7XHJcblxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1ldGhvZHNbb2JqZWN0Lm5hbWVdO1xyXG4gICAgICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBjbGVhckNhY2hlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcywgb2JqZWN0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgcnVudGltZSBzZXJ2aWNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcnBjIGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0ge1JQQ0ltcGx9IHJwY0ltcGwgUlBDIGltcGxlbWVudGF0aW9uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVlc3REZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcclxuICogQHBhcmFtIHtib29sZWFufSBbcmVzcG9uc2VEZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXHJcbiAqIEByZXR1cm5zIHtycGMuU2VydmljZX0gUlBDIHNlcnZpY2UuIFVzZWZ1bCB3aGVyZSByZXF1ZXN0cyBhbmQvb3IgcmVzcG9uc2VzIGFyZSBzdHJlYW1lZC5cclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCkge1xyXG4gICAgdmFyIHJwY1NlcnZpY2UgPSBuZXcgcnBjLlNlcnZpY2UocnBjSW1wbCwgcmVxdWVzdERlbGltaXRlZCwgcmVzcG9uc2VEZWxpbWl0ZWQpO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIG1ldGhvZDsgaSA8IC8qIGluaXRpYWxpemVzICovIHRoaXMubWV0aG9kc0FycmF5Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSB1dGlsLmxjRmlyc3QoKG1ldGhvZCA9IHRoaXMuX21ldGhvZHNBcnJheVtpXSkucmVzb2x2ZSgpLm5hbWUpLnJlcGxhY2UoL1teJFxcd19dL2csIFwiXCIpO1xyXG4gICAgICAgIHJwY1NlcnZpY2VbbWV0aG9kTmFtZV0gPSB1dGlsLmNvZGVnZW4oW1wiclwiLFwiY1wiXSwgdXRpbC5pc1Jlc2VydmVkKG1ldGhvZE5hbWUpID8gbWV0aG9kTmFtZSArIFwiX1wiIDogbWV0aG9kTmFtZSkoXCJyZXR1cm4gdGhpcy5ycGNDYWxsKG0scSxzLHIsYylcIikoe1xyXG4gICAgICAgICAgICBtOiBtZXRob2QsXHJcbiAgICAgICAgICAgIHE6IG1ldGhvZC5yZXNvbHZlZFJlcXVlc3RUeXBlLmN0b3IsXHJcbiAgICAgICAgICAgIHM6IG1ldGhvZC5yZXNvbHZlZFJlc3BvbnNlVHlwZS5jdG9yXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcnBjU2VydmljZTtcclxufTtcclxuXHJcbn0se1wiMjJcIjoyMixcIjIzXCI6MjMsXCIzMVwiOjMxLFwiMzdcIjozN31dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gdG9rZW5pemU7XHJcblxyXG52YXIgZGVsaW1SZSAgICAgICAgPSAvW1xcc3t9PTs6W1xcXSwnXCIoKTw+XS9nLFxyXG4gICAgc3RyaW5nRG91YmxlUmUgPSAvKD86XCIoW15cIlxcXFxdKig/OlxcXFwuW15cIlxcXFxdKikqKVwiKS9nLFxyXG4gICAgc3RyaW5nU2luZ2xlUmUgPSAvKD86JyhbXidcXFxcXSooPzpcXFxcLlteJ1xcXFxdKikqKScpL2c7XHJcblxyXG52YXIgc2V0Q29tbWVudFJlID0gL14gKlsqL10rICovLFxyXG4gICAgc2V0Q29tbWVudEFsdFJlID0gL15cXHMqXFwqP1xcLyovLFxyXG4gICAgc2V0Q29tbWVudFNwbGl0UmUgPSAvXFxuL2csXHJcbiAgICB3aGl0ZXNwYWNlUmUgPSAvXFxzLyxcclxuICAgIHVuZXNjYXBlUmUgPSAvXFxcXCguPykvZztcclxuXHJcbnZhciB1bmVzY2FwZU1hcCA9IHtcclxuICAgIFwiMFwiOiBcIlxcMFwiLFxyXG4gICAgXCJyXCI6IFwiXFxyXCIsXHJcbiAgICBcIm5cIjogXCJcXG5cIixcclxuICAgIFwidFwiOiBcIlxcdFwiXHJcbn07XHJcblxyXG4vKipcclxuICogVW5lc2NhcGVzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byB1bmVzY2FwZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVbmVzY2FwZWQgc3RyaW5nXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsc3RyaW5nPn0gbWFwIFNwZWNpYWwgY2hhcmFjdGVycyBtYXBcclxuICogQG1lbWJlcm9mIHRva2VuaXplXHJcbiAqL1xyXG5mdW5jdGlvbiB1bmVzY2FwZShzdHIpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSh1bmVzY2FwZVJlLCBmdW5jdGlvbigkMCwgJDEpIHtcclxuICAgICAgICBzd2l0Y2ggKCQxKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJcXFxcXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAkMTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmVzY2FwZU1hcFskMV0gfHwgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxudG9rZW5pemUudW5lc2NhcGUgPSB1bmVzY2FwZTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBuZXh0IHRva2VuIGFuZCBhZHZhbmNlcy5cclxuICogQHR5cGVkZWYgVG9rZW5pemVySGFuZGxlTmV4dFxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gTmV4dCB0b2tlbiBvciBgbnVsbGAgb24gZW9mXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFBlZWtzIGZvciB0aGUgbmV4dCB0b2tlbi5cclxuICogQHR5cGVkZWYgVG9rZW5pemVySGFuZGxlUGVla1xyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gTmV4dCB0b2tlbiBvciBgbnVsbGAgb24gZW9mXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFB1c2hlcyBhIHRva2VuIGJhY2sgdG8gdGhlIHN0YWNrLlxyXG4gKiBAdHlwZWRlZiBUb2tlbml6ZXJIYW5kbGVQdXNoXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtzdHJpbmd9IHRva2VuIFRva2VuXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFNraXBzIHRoZSBuZXh0IHRva2VuLlxyXG4gKiBAdHlwZWRlZiBUb2tlbml6ZXJIYW5kbGVTa2lwXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtzdHJpbmd9IGV4cGVjdGVkIEV4cGVjdGVkIHRva2VuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbmFsPWZhbHNlXSBJZiBvcHRpb25hbFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgdG9rZW4gbWF0Y2hlZFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHRva2VuIGRpZG4ndCBtYXRjaCBhbmQgaXMgbm90IG9wdGlvbmFsXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGNvbW1lbnQgb24gdGhlIHByZXZpb3VzIGxpbmUgb3IsIGFsdGVybmF0aXZlbHksIHRoZSBsaW5lIGNvbW1lbnQgb24gdGhlIHNwZWNpZmllZCBsaW5lLlxyXG4gKiBAdHlwZWRlZiBUb2tlbml6ZXJIYW5kbGVDbW50XHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IFtsaW5lXSBMaW5lIG51bWJlclxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IENvbW1lbnQgdGV4dCBvciBgbnVsbGAgaWYgbm9uZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgb2JqZWN0IHJldHVybmVkIGZyb20ge0BsaW5rIHRva2VuaXplfS5cclxuICogQGludGVyZmFjZSBJVG9rZW5pemVySGFuZGxlXHJcbiAqIEBwcm9wZXJ0eSB7VG9rZW5pemVySGFuZGxlTmV4dH0gbmV4dCBHZXRzIHRoZSBuZXh0IHRva2VuIGFuZCBhZHZhbmNlcyAoYG51bGxgIG9uIGVvZilcclxuICogQHByb3BlcnR5IHtUb2tlbml6ZXJIYW5kbGVQZWVrfSBwZWVrIFBlZWtzIGZvciB0aGUgbmV4dCB0b2tlbiAoYG51bGxgIG9uIGVvZilcclxuICogQHByb3BlcnR5IHtUb2tlbml6ZXJIYW5kbGVQdXNofSBwdXNoIFB1c2hlcyBhIHRva2VuIGJhY2sgdG8gdGhlIHN0YWNrXHJcbiAqIEBwcm9wZXJ0eSB7VG9rZW5pemVySGFuZGxlU2tpcH0gc2tpcCBTa2lwcyBhIHRva2VuLCByZXR1cm5zIGl0cyBwcmVzZW5jZSBhbmQgYWR2YW5jZXMgb3IsIGlmIG5vbi1vcHRpb25hbCBhbmQgbm90IHByZXNlbnQsIHRocm93c1xyXG4gKiBAcHJvcGVydHkge1Rva2VuaXplckhhbmRsZUNtbnR9IGNtbnQgR2V0cyB0aGUgY29tbWVudCBvbiB0aGUgcHJldmlvdXMgbGluZSBvciB0aGUgbGluZSBjb21tZW50IG9uIHRoZSBzcGVjaWZpZWQgbGluZSwgaWYgYW55XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW5lIEN1cnJlbnQgbGluZSBudW1iZXJcclxuICovXHJcblxyXG4vKipcclxuICogVG9rZW5pemVzIHRoZSBnaXZlbiAucHJvdG8gc291cmNlIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHVzZWZ1bCB1dGlsaXR5IGZ1bmN0aW9ucy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBTb3VyY2UgY29udGVudHNcclxuICogQHBhcmFtIHtib29sZWFufSBhbHRlcm5hdGVDb21tZW50TW9kZSBXaGV0aGVyIHdlIHNob3VsZCBhY3RpdmF0ZSBhbHRlcm5hdGUgY29tbWVudCBwYXJzaW5nIG1vZGUuXHJcbiAqIEByZXR1cm5zIHtJVG9rZW5pemVySGFuZGxlfSBUb2tlbml6ZXIgaGFuZGxlXHJcbiAqL1xyXG5mdW5jdGlvbiB0b2tlbml6ZShzb3VyY2UsIGFsdGVybmF0ZUNvbW1lbnRNb2RlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYWxsYmFjay1yZXR1cm4gKi9cclxuICAgIHNvdXJjZSA9IHNvdXJjZS50b1N0cmluZygpO1xyXG5cclxuICAgIHZhciBvZmZzZXQgPSAwLFxyXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGgsXHJcbiAgICAgICAgbGluZSA9IDEsXHJcbiAgICAgICAgY29tbWVudFR5cGUgPSBudWxsLFxyXG4gICAgICAgIGNvbW1lbnRUZXh0ID0gbnVsbCxcclxuICAgICAgICBjb21tZW50TGluZSA9IDAsXHJcbiAgICAgICAgY29tbWVudExpbmVFbXB0eSA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBzdGFjayA9IFtdO1xyXG5cclxuICAgIHZhciBzdHJpbmdEZWxpbSA9IG51bGw7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBlcnJvciBmb3IgaWxsZWdhbCBzeW50YXguXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3ViamVjdCBTdWJqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7RXJyb3J9IEVycm9yIGNyZWF0ZWRcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbGxlZ2FsKHN1YmplY3QpIHtcclxuICAgICAgICByZXR1cm4gRXJyb3IoXCJpbGxlZ2FsIFwiICsgc3ViamVjdCArIFwiIChsaW5lIFwiICsgbGluZSArIFwiKVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIGEgc3RyaW5nIHRpbGwgaXRzIGVuZC5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVhZFN0cmluZygpIHtcclxuICAgICAgICB2YXIgcmUgPSBzdHJpbmdEZWxpbSA9PT0gXCInXCIgPyBzdHJpbmdTaW5nbGVSZSA6IHN0cmluZ0RvdWJsZVJlO1xyXG4gICAgICAgIHJlLmxhc3RJbmRleCA9IG9mZnNldCAtIDE7XHJcbiAgICAgICAgdmFyIG1hdGNoID0gcmUuZXhlYyhzb3VyY2UpO1xyXG4gICAgICAgIGlmICghbWF0Y2gpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwoXCJzdHJpbmdcIik7XHJcbiAgICAgICAgb2Zmc2V0ID0gcmUubGFzdEluZGV4O1xyXG4gICAgICAgIHB1c2goc3RyaW5nRGVsaW0pO1xyXG4gICAgICAgIHN0cmluZ0RlbGltID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gdW5lc2NhcGUobWF0Y2hbMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2hhcmFjdGVyIGF0IGBwb3NgIHdpdGhpbiB0aGUgc291cmNlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvcyBQb3NpdGlvblxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQ2hhcmFjdGVyXHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2hhckF0KHBvcykge1xyXG4gICAgICAgIHJldHVybiBzb3VyY2UuY2hhckF0KHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IGNvbW1lbnQgdGV4dC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBvZmZzZXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG9mZnNldFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzZXRDb21tZW50KHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICBjb21tZW50VHlwZSA9IHNvdXJjZS5jaGFyQXQoc3RhcnQrKyk7XHJcbiAgICAgICAgY29tbWVudExpbmUgPSBsaW5lO1xyXG4gICAgICAgIGNvbW1lbnRMaW5lRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICB2YXIgbG9va2JhY2s7XHJcbiAgICAgICAgaWYgKGFsdGVybmF0ZUNvbW1lbnRNb2RlKSB7XHJcbiAgICAgICAgICAgIGxvb2tiYWNrID0gMjsgIC8vIGFsdGVybmF0ZSBjb21tZW50IHBhcnNpbmc6IFwiLy9cIiBvciBcIi8qXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb29rYmFjayA9IDM7ICAvLyBcIi8vL1wiIG9yIFwiLyoqXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbW1lbnRPZmZzZXQgPSBzdGFydCAtIGxvb2tiYWNrLFxyXG4gICAgICAgICAgICBjO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKC0tY29tbWVudE9mZnNldCA8IDAgfHxcclxuICAgICAgICAgICAgICAgICAgICAoYyA9IHNvdXJjZS5jaGFyQXQoY29tbWVudE9mZnNldCkpID09PSBcIlxcblwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50TGluZUVtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAoYyA9PT0gXCIgXCIgfHwgYyA9PT0gXCJcXHRcIik7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gc291cmNlXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoc3RhcnQsIGVuZClcclxuICAgICAgICAgICAgLnNwbGl0KHNldENvbW1lbnRTcGxpdFJlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBsaW5lc1tpXSA9IGxpbmVzW2ldXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZShhbHRlcm5hdGVDb21tZW50TW9kZSA/IHNldENvbW1lbnRBbHRSZSA6IHNldENvbW1lbnRSZSwgXCJcIilcclxuICAgICAgICAgICAgICAgIC50cmltKCk7XHJcbiAgICAgICAgY29tbWVudFRleHQgPSBsaW5lc1xyXG4gICAgICAgICAgICAuam9pbihcIlxcblwiKVxyXG4gICAgICAgICAgICAudHJpbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRG91YmxlU2xhc2hDb21tZW50TGluZShzdGFydE9mZnNldCkge1xyXG4gICAgICAgIHZhciBlbmRPZmZzZXQgPSBmaW5kRW5kT2ZMaW5lKHN0YXJ0T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgLy8gc2VlIGlmIHJlbWFpbmluZyBsaW5lIG1hdGNoZXMgY29tbWVudCBwYXR0ZXJuXHJcbiAgICAgICAgdmFyIGxpbmVUZXh0ID0gc291cmNlLnN1YnN0cmluZyhzdGFydE9mZnNldCwgZW5kT2Zmc2V0KTtcclxuICAgICAgICAvLyBsb29rIGZvciAxIG9yIDIgc2xhc2hlcyBzaW5jZSBzdGFydE9mZnNldCB3b3VsZCBhbHJlYWR5IHBvaW50IHBhc3RcclxuICAgICAgICAvLyB0aGUgZmlyc3Qgc2xhc2ggdGhhdCBzdGFydGVkIHRoZSBjb21tZW50LlxyXG4gICAgICAgIHZhciBpc0NvbW1lbnQgPSAvXlxccypcXC97MSwyfS8udGVzdChsaW5lVGV4dCk7XHJcbiAgICAgICAgcmV0dXJuIGlzQ29tbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kRW5kT2ZMaW5lKGN1cnNvcikge1xyXG4gICAgICAgIC8vIGZpbmQgZW5kIG9mIGN1cnNvcidzIGxpbmVcclxuICAgICAgICB2YXIgZW5kT2Zmc2V0ID0gY3Vyc29yO1xyXG4gICAgICAgIHdoaWxlIChlbmRPZmZzZXQgPCBsZW5ndGggJiYgY2hhckF0KGVuZE9mZnNldCkgIT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgZW5kT2Zmc2V0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbmRPZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBuZXh0IHRva2VuLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBOZXh0IHRva2VuIG9yIGBudWxsYCBvbiBlb2ZcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICByZXR1cm4gc3RhY2suc2hpZnQoKTtcclxuICAgICAgICBpZiAoc3RyaW5nRGVsaW0pXHJcbiAgICAgICAgICAgIHJldHVybiByZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIHJlcGVhdCxcclxuICAgICAgICAgICAgcHJldixcclxuICAgICAgICAgICAgY3VycixcclxuICAgICAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgICAgIGlzRG9jO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHJlcGVhdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAod2hpdGVzcGFjZVJlLnRlc3QoY3VyciA9IGNoYXJBdChvZmZzZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnIgPT09IFwiXFxuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKytsaW5lO1xyXG4gICAgICAgICAgICAgICAgaWYgKCsrb2Zmc2V0ID09PSBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFyQXQob2Zmc2V0KSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICgrK29mZnNldCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChcImNvbW1lbnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhckF0KG9mZnNldCkgPT09IFwiL1wiKSB7IC8vIExpbmVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsdGVybmF0ZUNvbW1lbnRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciB0cmlwbGUtc2xhc2ggY29tbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RvYyA9IGNoYXJBdChzdGFydCA9IG9mZnNldCArIDEpID09PSBcIi9cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjaGFyQXQoKytvZmZzZXQpICE9PSBcIlxcblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArK29mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRG9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb21tZW50KHN0YXJ0LCBvZmZzZXQgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGRvdWJsZS1zbGFzaCBjb21tZW50cywgY29uc29saWRhdGluZyBjb25zZWN1dGl2ZSBsaW5lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEb2MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRG91YmxlU2xhc2hDb21tZW50TGluZShvZmZzZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RvYyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gZmluZEVuZE9mTGluZShvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChpc0RvdWJsZVNsYXNoQ29tbWVudExpbmUob2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBNYXRoLm1pbihsZW5ndGgsIGZpbmRFbmRPZkxpbmUob2Zmc2V0KSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RvYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29tbWVudChzdGFydCwgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoY3VyciA9IGNoYXJBdChvZmZzZXQpKSA9PT0gXCIqXCIpIHsgLyogQmxvY2sgKi9cclxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgLyoqIChyZWd1bGFyIGNvbW1lbnQgbW9kZSkgb3IgLyogKGFsdGVybmF0ZSBjb21tZW50IG1vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBvZmZzZXQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRG9jID0gYWx0ZXJuYXRlQ29tbWVudE1vZGUgfHwgY2hhckF0KHN0YXJ0KSA9PT0gXCIqXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyciA9PT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKytsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK29mZnNldCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKFwiY29tbWVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gY3VycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyciA9IGNoYXJBdChvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHByZXYgIT09IFwiKlwiIHx8IGN1cnIgIT09IFwiL1wiKTtcclxuICAgICAgICAgICAgICAgICAgICArK29mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEb2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29tbWVudChzdGFydCwgb2Zmc2V0IC0gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIi9cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gd2hpbGUgKHJlcGVhdCk7XHJcblxyXG4gICAgICAgIC8vIG9mZnNldCAhPT0gbGVuZ3RoIGlmIHdlIGdvdCBoZXJlXHJcblxyXG4gICAgICAgIHZhciBlbmQgPSBvZmZzZXQ7XHJcbiAgICAgICAgZGVsaW1SZS5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgIHZhciBkZWxpbSA9IGRlbGltUmUudGVzdChjaGFyQXQoZW5kKyspKTtcclxuICAgICAgICBpZiAoIWRlbGltKVxyXG4gICAgICAgICAgICB3aGlsZSAoZW5kIDwgbGVuZ3RoICYmICFkZWxpbVJlLnRlc3QoY2hhckF0KGVuZCkpKVxyXG4gICAgICAgICAgICAgICAgKytlbmQ7XHJcbiAgICAgICAgdmFyIHRva2VuID0gc291cmNlLnN1YnN0cmluZyhvZmZzZXQsIG9mZnNldCA9IGVuZCk7XHJcbiAgICAgICAgaWYgKHRva2VuID09PSBcIlxcXCJcIiB8fCB0b2tlbiA9PT0gXCInXCIpXHJcbiAgICAgICAgICAgIHN0cmluZ0RlbGltID0gdG9rZW47XHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVzaGVzIGEgdG9rZW4gYmFjayB0byB0aGUgc3RhY2suXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9rZW4gVG9rZW5cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHVzaCh0b2tlbikge1xyXG4gICAgICAgIHN0YWNrLnB1c2godG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVla3MgZm9yIHRoZSBuZXh0IHRva2VuLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBUb2tlbiBvciBgbnVsbGAgb24gZW9mXHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcGVlaygpIHtcclxuICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBuZXh0KCk7XHJcbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBwdXNoKHRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWNrWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2tpcHMgYSB0b2tlbi5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHBlY3RlZCBFeHBlY3RlZCB0b2tlblxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9uYWw9ZmFsc2VdIFdoZXRoZXIgdGhlIHRva2VuIGlzIG9wdGlvbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIHdoZW4gc2tpcHBlZCwgYGZhbHNlYCBpZiBub3RcclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBXaGVuIGEgcmVxdWlyZWQgdG9rZW4gaXMgbm90IHByZXNlbnRcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBza2lwKGV4cGVjdGVkLCBvcHRpb25hbCkge1xyXG4gICAgICAgIHZhciBhY3R1YWwgPSBwZWVrKCksXHJcbiAgICAgICAgICAgIGVxdWFscyA9IGFjdHVhbCA9PT0gZXhwZWN0ZWQ7XHJcbiAgICAgICAgaWYgKGVxdWFscykge1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW9wdGlvbmFsKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKFwidG9rZW4gJ1wiICsgYWN0dWFsICsgXCInLCAnXCIgKyBleHBlY3RlZCArIFwiJyBleHBlY3RlZFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgY29tbWVudC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdHJhaWxpbmdMaW5lXSBMaW5lIG51bWJlciBpZiBsb29raW5nIGZvciBhIHRyYWlsaW5nIGNvbW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gQ29tbWVudCB0ZXh0XHJcbiAgICAgKiBAaW5uZXJcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY21udCh0cmFpbGluZ0xpbmUpIHtcclxuICAgICAgICB2YXIgcmV0ID0gbnVsbDtcclxuICAgICAgICBpZiAodHJhaWxpbmdMaW5lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1lbnRMaW5lID09PSBsaW5lIC0gMSAmJiAoYWx0ZXJuYXRlQ29tbWVudE1vZGUgfHwgY29tbWVudFR5cGUgPT09IFwiKlwiIHx8IGNvbW1lbnRMaW5lRW1wdHkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBjb21tZW50VGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgIGlmIChjb21tZW50TGluZSA8IHRyYWlsaW5nTGluZSkge1xyXG4gICAgICAgICAgICAgICAgcGVlaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb21tZW50TGluZSA9PT0gdHJhaWxpbmdMaW5lICYmICFjb21tZW50TGluZUVtcHR5ICYmIChhbHRlcm5hdGVDb21tZW50TW9kZSB8fCBjb21tZW50VHlwZSA9PT0gXCIvXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBjb21tZW50VGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe1xyXG4gICAgICAgIG5leHQ6IG5leHQsXHJcbiAgICAgICAgcGVlazogcGVlayxcclxuICAgICAgICBwdXNoOiBwdXNoLFxyXG4gICAgICAgIHNraXA6IHNraXAsXHJcbiAgICAgICAgY21udDogY21udFxyXG4gICAgfSwgXCJsaW5lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbGluZTsgfVxyXG4gICAgfSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIGNhbGxiYWNrLXJldHVybiAqL1xyXG59XHJcblxyXG59LHt9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGU7XHJcblxyXG4vLyBleHRlbmRzIE5hbWVzcGFjZVxyXG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgyMyk7XHJcbigoVHlwZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5hbWVzcGFjZS5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFR5cGUpLmNsYXNzTmFtZSA9IFwiVHlwZVwiO1xyXG5cclxudmFyIEVudW0gICAgICA9IHJlcXVpcmUoMTUpLFxyXG4gICAgT25lT2YgICAgID0gcmVxdWlyZSgyNSksXHJcbiAgICBGaWVsZCAgICAgPSByZXF1aXJlKDE2KSxcclxuICAgIE1hcEZpZWxkICA9IHJlcXVpcmUoMjApLFxyXG4gICAgU2VydmljZSAgID0gcmVxdWlyZSgzMyksXHJcbiAgICBNZXNzYWdlICAgPSByZXF1aXJlKDIxKSxcclxuICAgIFJlYWRlciAgICA9IHJlcXVpcmUoMjcpLFxyXG4gICAgV3JpdGVyICAgID0gcmVxdWlyZSg0MiksXHJcbiAgICB1dGlsICAgICAgPSByZXF1aXJlKDM3KSxcclxuICAgIGVuY29kZXIgICA9IHJlcXVpcmUoMTQpLFxyXG4gICAgZGVjb2RlciAgID0gcmVxdWlyZSgxMyksXHJcbiAgICB2ZXJpZmllciAgPSByZXF1aXJlKDQwKSxcclxuICAgIGNvbnZlcnRlciA9IHJlcXVpcmUoMTIpLFxyXG4gICAgd3JhcHBlcnMgID0gcmVxdWlyZSg0MSk7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyByZWZsZWN0ZWQgbWVzc2FnZSB0eXBlIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFJlZmxlY3RlZCBtZXNzYWdlIHR5cGUuXHJcbiAqIEBleHRlbmRzIE5hbWVzcGFjZUJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE1lc3NhZ2UgbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRGVjbGFyZWQgb3B0aW9uc1xyXG4gKi9cclxuZnVuY3Rpb24gVHlwZShuYW1lLCBvcHRpb25zKSB7XHJcbiAgICBOYW1lc3BhY2UuY2FsbCh0aGlzLCBuYW1lLCBvcHRpb25zKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lc3NhZ2UgZmllbGRzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLEZpZWxkPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5maWVsZHMgPSB7fTsgIC8vIHRvSlNPTiwgbWFya2VyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPbmVvZnMgZGVjbGFyZWQgd2l0aGluIHRoaXMgbmFtZXNwYWNlLCBpZiBhbnkuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsT25lT2Y+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLm9uZW9mcyA9IHVuZGVmaW5lZDsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbnNpb24gcmFuZ2VzLCBpZiBhbnkuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyW11bXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5leHRlbnNpb25zID0gdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2VydmVkIHJhbmdlcywgaWYgYW55LlxyXG4gICAgICogQHR5cGUge0FycmF5LjxudW1iZXJbXXxzdHJpbmc+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc2VydmVkID0gdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKj9cclxuICAgICAqIFdoZXRoZXIgdGhpcyB0eXBlIGlzIGEgbGVnYWN5IGdyb3VwLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmdyb3VwID0gdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhY2hlZCBmaWVsZHMgYnkgaWQuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxudW1iZXIsRmllbGQ+fG51bGx9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9maWVsZHNCeUlkID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhY2hlZCBmaWVsZHMgYXMgYW4gYXJyYXkuXHJcbiAgICAgKiBAdHlwZSB7RmllbGRbXXxudWxsfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fZmllbGRzQXJyYXkgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FjaGVkIG9uZW9mcyBhcyBhbiBhcnJheS5cclxuICAgICAqIEB0eXBlIHtPbmVPZltdfG51bGx9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9vbmVvZnNBcnJheSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNoZWQgY29uc3RydWN0b3IuXHJcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3I8e30+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fY3RvciA9IG51bGw7XHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFR5cGUucHJvdG90eXBlLCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXNzYWdlIGZpZWxkcyBieSBpZC5cclxuICAgICAqIEBuYW1lIFR5cGUjZmllbGRzQnlJZFxyXG4gICAgICogQHR5cGUge09iamVjdC48bnVtYmVyLEZpZWxkPn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmaWVsZHNCeUlkOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmllbGRzQnlJZClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWVsZHNCeUlkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmllbGRzQnlJZCA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuZmllbGRzKSwgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5maWVsZHNbbmFtZXNbaV1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gZmllbGQuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmllbGRzQnlJZFtpZF0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJkdXBsaWNhdGUgaWQgXCIgKyBpZCArIFwiIGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmllbGRzQnlJZFtpZF0gPSBmaWVsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmllbGRzQnlJZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmllbGRzIG9mIHRoaXMgbWVzc2FnZSBhcyBhbiBhcnJheSBmb3IgaXRlcmF0aW9uLlxyXG4gICAgICogQG5hbWUgVHlwZSNmaWVsZHNBcnJheVxyXG4gICAgICogQHR5cGUge0ZpZWxkW119XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZmllbGRzQXJyYXk6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmllbGRzQXJyYXkgfHwgKHRoaXMuX2ZpZWxkc0FycmF5ID0gdXRpbC50b0FycmF5KHRoaXMuZmllbGRzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9uZW9mcyBvZiB0aGlzIG1lc3NhZ2UgYXMgYW4gYXJyYXkgZm9yIGl0ZXJhdGlvbi5cclxuICAgICAqIEBuYW1lIFR5cGUjb25lb2ZzQXJyYXlcclxuICAgICAqIEB0eXBlIHtPbmVPZltdfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG9uZW9mc0FycmF5OiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uZW9mc0FycmF5IHx8ICh0aGlzLl9vbmVvZnNBcnJheSA9IHV0aWwudG9BcnJheSh0aGlzLm9uZW9mcykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmVnaXN0ZXJlZCBjb25zdHJ1Y3RvciwgaWYgYW55IHJlZ2lzdGVyZWQsIG90aGVyd2lzZSBhIGdlbmVyaWMgY29uc3RydWN0b3IuXHJcbiAgICAgKiBBc3NpZ25pbmcgYSBmdW5jdGlvbiByZXBsYWNlcyB0aGUgaW50ZXJuYWwgY29uc3RydWN0b3IuIElmIHRoZSBmdW5jdGlvbiBkb2VzIG5vdCBleHRlbmQge0BsaW5rIE1lc3NhZ2V9IHlldCwgaXRzIHByb3RvdHlwZSB3aWxsIGJlIHNldHVwIGFjY29yZGluZ2x5IGFuZCBzdGF0aWMgbWV0aG9kcyB3aWxsIGJlIHBvcHVsYXRlZC4gSWYgaXQgYWxyZWFkeSBleHRlbmRzIHtAbGluayBNZXNzYWdlfSwgaXQgd2lsbCBqdXN0IHJlcGxhY2UgdGhlIGludGVybmFsIGNvbnN0cnVjdG9yLlxyXG4gICAgICogQG5hbWUgVHlwZSNjdG9yXHJcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3I8e30+fVxyXG4gICAgICovXHJcbiAgICBjdG9yOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N0b3IgfHwgKHRoaXMuY3RvciA9IFR5cGUuZ2VuZXJhdGVDb25zdHJ1Y3Rvcih0aGlzKSgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24oY3Rvcikge1xyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIHByb3BlciBwcm90b3R5cGVcclxuICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IGN0b3IucHJvdG90eXBlO1xyXG4gICAgICAgICAgICBpZiAoIShwcm90b3R5cGUgaW5zdGFuY2VvZiBNZXNzYWdlKSkge1xyXG4gICAgICAgICAgICAgICAgKGN0b3IucHJvdG90eXBlID0gbmV3IE1lc3NhZ2UoKSkuY29uc3RydWN0b3IgPSBjdG9yO1xyXG4gICAgICAgICAgICAgICAgdXRpbC5tZXJnZShjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBhbmQgbWVzc2FnZXMgcmVmZXJlbmNlIHRoZWlyIHJlZmxlY3RlZCB0eXBlXHJcbiAgICAgICAgICAgIGN0b3IuJHR5cGUgPSBjdG9yLnByb3RvdHlwZS4kdHlwZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBNaXggaW4gc3RhdGljIG1ldGhvZHNcclxuICAgICAgICAgICAgdXRpbC5tZXJnZShjdG9yLCBNZXNzYWdlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2N0b3IgPSBjdG9yO1xyXG5cclxuICAgICAgICAgICAgLy8gTWVzc2FnZXMgaGF2ZSBub24tZW51bWVyYWJsZSBkZWZhdWx0IHZhbHVlcyBvbiB0aGVpciBwcm90b3R5cGVcclxuICAgICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IC8qIGluaXRpYWxpemVzICovIHRoaXMuZmllbGRzQXJyYXkubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maWVsZHNBcnJheVtpXS5yZXNvbHZlKCk7IC8vIGVuc3VyZXMgYSBwcm9wZXIgdmFsdWVcclxuXHJcbiAgICAgICAgICAgIC8vIE1lc3NhZ2VzIGhhdmUgbm9uLWVudW1lcmFibGUgZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgZWFjaCB2aXJ0dWFsIG9uZW9mIGZpZWxkXHJcbiAgICAgICAgICAgIHZhciBjdG9yUHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgLyogaW5pdGlhbGl6ZXMgKi8gdGhpcy5vbmVvZnNBcnJheS5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgIGN0b3JQcm9wZXJ0aWVzW3RoaXMuX29uZW9mc0FycmF5W2ldLnJlc29sdmUoKS5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHV0aWwub25lT2ZHZXR0ZXIodGhpcy5fb25lb2ZzQXJyYXlbaV0ub25lb2YpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldDogdXRpbC5vbmVPZlNldHRlcih0aGlzLl9vbmVvZnNBcnJheVtpXS5vbmVvZilcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3Rvci5wcm90b3R5cGUsIGN0b3JQcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgc3BlY2lmaWVkIHR5cGUuXHJcbiAqIEBwYXJhbSB7VHlwZX0gbXR5cGUgTWVzc2FnZSB0eXBlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqL1xyXG5UeXBlLmdlbmVyYXRlQ29uc3RydWN0b3IgPSBmdW5jdGlvbiBnZW5lcmF0ZUNvbnN0cnVjdG9yKG10eXBlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG4gICAgdmFyIGdlbiA9IHV0aWwuY29kZWdlbihbXCJwXCJdLCBtdHlwZS5uYW1lKTtcclxuICAgIC8vIGV4cGxpY2l0bHkgaW5pdGlhbGl6ZSBtdXRhYmxlIG9iamVjdC9hcnJheSBmaWVsZHMgc28gdGhhdCB0aGVzZSBhcmVuJ3QganVzdCBpbmhlcml0ZWQgZnJvbSB0aGUgcHJvdG90eXBlXHJcbiAgICBmb3IgKHZhciBpID0gMCwgZmllbGQ7IGkgPCBtdHlwZS5maWVsZHNBcnJheS5sZW5ndGg7ICsraSlcclxuICAgICAgICBpZiAoKGZpZWxkID0gbXR5cGUuX2ZpZWxkc0FycmF5W2ldKS5tYXApIGdlblxyXG4gICAgICAgICAgICAoXCJ0aGlzJXM9e31cIiwgdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQucmVwZWF0ZWQpIGdlblxyXG4gICAgICAgICAgICAoXCJ0aGlzJXM9W11cIiwgdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKSk7XHJcbiAgICByZXR1cm4gZ2VuXHJcbiAgICAoXCJpZihwKWZvcih2YXIga3M9T2JqZWN0LmtleXMocCksaT0wO2k8a3MubGVuZ3RoOysraSlpZihwW2tzW2ldXSE9bnVsbClcIikgLy8gb21pdCB1bmRlZmluZWQgb3IgbnVsbFxyXG4gICAgICAgIChcInRoaXNba3NbaV1dPXBba3NbaV1dXCIpO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2xlYXJDYWNoZSh0eXBlKSB7XHJcbiAgICB0eXBlLl9maWVsZHNCeUlkID0gdHlwZS5fZmllbGRzQXJyYXkgPSB0eXBlLl9vbmVvZnNBcnJheSA9IG51bGw7XHJcbiAgICBkZWxldGUgdHlwZS5lbmNvZGU7XHJcbiAgICBkZWxldGUgdHlwZS5kZWNvZGU7XHJcbiAgICBkZWxldGUgdHlwZS52ZXJpZnk7XHJcbiAgICByZXR1cm4gdHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lc3NhZ2UgdHlwZSBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElUeXBlXHJcbiAqIEBleHRlbmRzIElOYW1lc3BhY2VcclxuICogQHByb3BlcnR5IHtPYmplY3QuPHN0cmluZyxJT25lT2Y+fSBbb25lb2ZzXSBPbmVvZiBkZXNjcmlwdG9yc1xyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLElGaWVsZD59IGZpZWxkcyBGaWVsZCBkZXNjcmlwdG9yc1xyXG4gKiBAcHJvcGVydHkge251bWJlcltdW119IFtleHRlbnNpb25zXSBFeHRlbnNpb24gcmFuZ2VzXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyW11bXX0gW3Jlc2VydmVkXSBSZXNlcnZlZCByYW5nZXNcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JvdXA9ZmFsc2VdIFdoZXRoZXIgYSBsZWdhY3kgZ3JvdXAgb3Igbm90XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtZXNzYWdlIHR5cGUgZnJvbSBhIG1lc3NhZ2UgdHlwZSBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBNZXNzYWdlIG5hbWVcclxuICogQHBhcmFtIHtJVHlwZX0ganNvbiBNZXNzYWdlIHR5cGUgZGVzY3JpcHRvclxyXG4gKiBAcmV0dXJucyB7VHlwZX0gQ3JlYXRlZCBtZXNzYWdlIHR5cGVcclxuICovXHJcblR5cGUuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihuYW1lLCBqc29uKSB7XHJcbiAgICB2YXIgdHlwZSA9IG5ldyBUeXBlKG5hbWUsIGpzb24ub3B0aW9ucyk7XHJcbiAgICB0eXBlLmV4dGVuc2lvbnMgPSBqc29uLmV4dGVuc2lvbnM7XHJcbiAgICB0eXBlLnJlc2VydmVkID0ganNvbi5yZXNlcnZlZDtcclxuICAgIHZhciBuYW1lcyA9IE9iamVjdC5rZXlzKGpzb24uZmllbGRzKSxcclxuICAgICAgICBpID0gMDtcclxuICAgIGZvciAoOyBpIDwgbmFtZXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgdHlwZS5hZGQoXHJcbiAgICAgICAgICAgICggdHlwZW9mIGpzb24uZmllbGRzW25hbWVzW2ldXS5rZXlUeXBlICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgID8gTWFwRmllbGQuZnJvbUpTT05cclxuICAgICAgICAgICAgOiBGaWVsZC5mcm9tSlNPTiApKG5hbWVzW2ldLCBqc29uLmZpZWxkc1tuYW1lc1tpXV0pXHJcbiAgICAgICAgKTtcclxuICAgIGlmIChqc29uLm9uZW9mcylcclxuICAgICAgICBmb3IgKG5hbWVzID0gT2JqZWN0LmtleXMoanNvbi5vbmVvZnMpLCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICB0eXBlLmFkZChPbmVPZi5mcm9tSlNPTihuYW1lc1tpXSwganNvbi5vbmVvZnNbbmFtZXNbaV1dKSk7XHJcbiAgICBpZiAoanNvbi5uZXN0ZWQpXHJcbiAgICAgICAgZm9yIChuYW1lcyA9IE9iamVjdC5rZXlzKGpzb24ubmVzdGVkKSwgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgbmVzdGVkID0ganNvbi5uZXN0ZWRbbmFtZXNbaV1dO1xyXG4gICAgICAgICAgICB0eXBlLmFkZCggLy8gbW9zdCB0byBsZWFzdCBsaWtlbHlcclxuICAgICAgICAgICAgICAgICggbmVzdGVkLmlkICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gRmllbGQuZnJvbUpTT05cclxuICAgICAgICAgICAgICAgIDogbmVzdGVkLmZpZWxkcyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IFR5cGUuZnJvbUpTT05cclxuICAgICAgICAgICAgICAgIDogbmVzdGVkLnZhbHVlcyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IEVudW0uZnJvbUpTT05cclxuICAgICAgICAgICAgICAgIDogbmVzdGVkLm1ldGhvZHMgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBTZXJ2aWNlLmZyb21KU09OXHJcbiAgICAgICAgICAgICAgICA6IE5hbWVzcGFjZS5mcm9tSlNPTiApKG5hbWVzW2ldLCBuZXN0ZWQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgaWYgKGpzb24uZXh0ZW5zaW9ucyAmJiBqc29uLmV4dGVuc2lvbnMubGVuZ3RoKVxyXG4gICAgICAgIHR5cGUuZXh0ZW5zaW9ucyA9IGpzb24uZXh0ZW5zaW9ucztcclxuICAgIGlmIChqc29uLnJlc2VydmVkICYmIGpzb24ucmVzZXJ2ZWQubGVuZ3RoKVxyXG4gICAgICAgIHR5cGUucmVzZXJ2ZWQgPSBqc29uLnJlc2VydmVkO1xyXG4gICAgaWYgKGpzb24uZ3JvdXApXHJcbiAgICAgICAgdHlwZS5ncm91cCA9IHRydWU7XHJcbiAgICBpZiAoanNvbi5jb21tZW50KVxyXG4gICAgICAgIHR5cGUuY29tbWVudCA9IGpzb24uY29tbWVudDtcclxuICAgIHJldHVybiB0eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgbWVzc2FnZSB0eXBlIHRvIGEgbWVzc2FnZSB0eXBlIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7SVR5cGV9IE1lc3NhZ2UgdHlwZSBkZXNjcmlwdG9yXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04odG9KU09OT3B0aW9ucykge1xyXG4gICAgdmFyIGluaGVyaXRlZCA9IE5hbWVzcGFjZS5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdG9KU09OT3B0aW9ucyk7XHJcbiAgICB2YXIga2VlcENvbW1lbnRzID0gdG9KU09OT3B0aW9ucyA/IEJvb2xlYW4odG9KU09OT3B0aW9ucy5rZWVwQ29tbWVudHMpIDogZmFsc2U7XHJcbiAgICByZXR1cm4gdXRpbC50b09iamVjdChbXHJcbiAgICAgICAgXCJvcHRpb25zXCIgICAgLCBpbmhlcml0ZWQgJiYgaW5oZXJpdGVkLm9wdGlvbnMgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwib25lb2ZzXCIgICAgICwgTmFtZXNwYWNlLmFycmF5VG9KU09OKHRoaXMub25lb2ZzQXJyYXksIHRvSlNPTk9wdGlvbnMpLFxyXG4gICAgICAgIFwiZmllbGRzXCIgICAgICwgTmFtZXNwYWNlLmFycmF5VG9KU09OKHRoaXMuZmllbGRzQXJyYXkuZmlsdGVyKGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gIW9iai5kZWNsYXJpbmdGaWVsZDsgfSksIHRvSlNPTk9wdGlvbnMpIHx8IHt9LFxyXG4gICAgICAgIFwiZXh0ZW5zaW9uc1wiICwgdGhpcy5leHRlbnNpb25zICYmIHRoaXMuZXh0ZW5zaW9ucy5sZW5ndGggPyB0aGlzLmV4dGVuc2lvbnMgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJyZXNlcnZlZFwiICAgLCB0aGlzLnJlc2VydmVkICYmIHRoaXMucmVzZXJ2ZWQubGVuZ3RoID8gdGhpcy5yZXNlcnZlZCA6IHVuZGVmaW5lZCxcclxuICAgICAgICBcImdyb3VwXCIgICAgICAsIHRoaXMuZ3JvdXAgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwibmVzdGVkXCIgICAgICwgaW5oZXJpdGVkICYmIGluaGVyaXRlZC5uZXN0ZWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwiY29tbWVudFwiICAgICwga2VlcENvbW1lbnRzID8gdGhpcy5jb21tZW50IDogdW5kZWZpbmVkXHJcbiAgICBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcblR5cGUucHJvdG90eXBlLnJlc29sdmVBbGwgPSBmdW5jdGlvbiByZXNvbHZlQWxsKCkge1xyXG4gICAgdmFyIGZpZWxkcyA9IHRoaXMuZmllbGRzQXJyYXksIGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBmaWVsZHMubGVuZ3RoKVxyXG4gICAgICAgIGZpZWxkc1tpKytdLnJlc29sdmUoKTtcclxuICAgIHZhciBvbmVvZnMgPSB0aGlzLm9uZW9mc0FycmF5OyBpID0gMDtcclxuICAgIHdoaWxlIChpIDwgb25lb2ZzLmxlbmd0aClcclxuICAgICAgICBvbmVvZnNbaSsrXS5yZXNvbHZlKCk7XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLnByb3RvdHlwZS5yZXNvbHZlQWxsLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRzW25hbWVdXHJcbiAgICAgICAgfHwgdGhpcy5vbmVvZnMgJiYgdGhpcy5vbmVvZnNbbmFtZV1cclxuICAgICAgICB8fCB0aGlzLm5lc3RlZCAmJiB0aGlzLm5lc3RlZFtuYW1lXVxyXG4gICAgICAgIHx8IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhIG5lc3RlZCBvYmplY3QgdG8gdGhpcyB0eXBlLlxyXG4gKiBAcGFyYW0ge1JlZmxlY3Rpb25PYmplY3R9IG9iamVjdCBOZXN0ZWQgb2JqZWN0IHRvIGFkZFxyXG4gKiBAcmV0dXJucyB7VHlwZX0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgbmVzdGVkIG9iamVjdCB3aXRoIHRoaXMgbmFtZSBvciwgaWYgYSBmaWVsZCwgd2hlbiB0aGVyZSBpcyBhbHJlYWR5IGEgZmllbGQgd2l0aCB0aGlzIGlkXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQob2JqZWN0KSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZ2V0KG9iamVjdC5uYW1lKSlcclxuICAgICAgICB0aHJvdyBFcnJvcihcImR1cGxpY2F0ZSBuYW1lICdcIiArIG9iamVjdC5uYW1lICsgXCInIGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEZpZWxkICYmIG9iamVjdC5leHRlbmQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIE5PVEU6IEV4dGVuc2lvbiBmaWVsZHMgYXJlbid0IGFjdHVhbCBmaWVsZHMgb24gdGhlIGRlY2xhcmluZyB0eXBlLCBidXQgbmVzdGVkIG9iamVjdHMuXHJcbiAgICAgICAgLy8gVGhlIHJvb3Qgb2JqZWN0IHRha2VzIGNhcmUgb2YgYWRkaW5nIGRpc3RpbmN0IHNpc3Rlci1maWVsZHMgdG8gdGhlIHJlc3BlY3RpdmUgZXh0ZW5kZWRcclxuICAgICAgICAvLyB0eXBlIGluc3RlYWQuXHJcblxyXG4gICAgICAgIC8vIGF2b2lkcyBjYWxsaW5nIHRoZSBnZXR0ZXIgaWYgbm90IGFic29sdXRlbHkgbmVjZXNzYXJ5IGJlY2F1c2UgaXQncyBjYWxsZWQgcXVpdGUgZnJlcXVlbnRseVxyXG4gICAgICAgIGlmICh0aGlzLl9maWVsZHNCeUlkID8gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdGhpcy5fZmllbGRzQnlJZFtvYmplY3QuaWRdIDogdGhpcy5maWVsZHNCeUlkW29iamVjdC5pZF0pXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiZHVwbGljYXRlIGlkIFwiICsgb2JqZWN0LmlkICsgXCIgaW4gXCIgKyB0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5pc1Jlc2VydmVkSWQob2JqZWN0LmlkKSlcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpZCBcIiArIG9iamVjdC5pZCArIFwiIGlzIHJlc2VydmVkIGluIFwiICsgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXNlcnZlZE5hbWUob2JqZWN0Lm5hbWUpKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIm5hbWUgJ1wiICsgb2JqZWN0Lm5hbWUgKyBcIicgaXMgcmVzZXJ2ZWQgaW4gXCIgKyB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKG9iamVjdC5wYXJlbnQpXHJcbiAgICAgICAgICAgIG9iamVjdC5wYXJlbnQucmVtb3ZlKG9iamVjdCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbb2JqZWN0Lm5hbWVdID0gb2JqZWN0O1xyXG4gICAgICAgIG9iamVjdC5tZXNzYWdlID0gdGhpcztcclxuICAgICAgICBvYmplY3Qub25BZGQodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgT25lT2YpIHtcclxuICAgICAgICBpZiAoIXRoaXMub25lb2ZzKVxyXG4gICAgICAgICAgICB0aGlzLm9uZW9mcyA9IHt9O1xyXG4gICAgICAgIHRoaXMub25lb2ZzW29iamVjdC5uYW1lXSA9IG9iamVjdDtcclxuICAgICAgICBvYmplY3Qub25BZGQodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBvYmplY3QpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYSBuZXN0ZWQgb2JqZWN0IGZyb20gdGhpcyB0eXBlLlxyXG4gKiBAcGFyYW0ge1JlZmxlY3Rpb25PYmplY3R9IG9iamVjdCBOZXN0ZWQgb2JqZWN0IHRvIHJlbW92ZVxyXG4gKiBAcmV0dXJucyB7VHlwZX0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgb2JqZWN0YCBpcyBub3QgYSBtZW1iZXIgb2YgdGhpcyB0eXBlXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUob2JqZWN0KSB7XHJcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRmllbGQgJiYgb2JqZWN0LmV4dGVuZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gU2VlIFR5cGUjYWRkIGZvciB0aGUgcmVhc29uIHdoeSBleHRlbnNpb24gZmllbGRzIGFyZSBleGNsdWRlZCBoZXJlLlxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIXRoaXMuZmllbGRzIHx8IHRoaXMuZmllbGRzW29iamVjdC5uYW1lXSAhPT0gb2JqZWN0KVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihvYmplY3QgKyBcIiBpcyBub3QgYSBtZW1iZXIgb2YgXCIgKyB0aGlzKTtcclxuXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZmllbGRzW29iamVjdC5uYW1lXTtcclxuICAgICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICBvYmplY3Qub25SZW1vdmUodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgT25lT2YpIHtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0aGlzLm9uZW9mcyB8fCB0aGlzLm9uZW9mc1tvYmplY3QubmFtZV0gIT09IG9iamVjdClcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3Iob2JqZWN0ICsgXCIgaXMgbm90IGEgbWVtYmVyIG9mIFwiICsgdGhpcyk7XHJcblxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9uZW9mc1tvYmplY3QubmFtZV07XHJcbiAgICAgICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgb2JqZWN0Lm9uUmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBjbGVhckNhY2hlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcywgb2JqZWN0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIGlkIGlzIHJlc2VydmVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgSWQgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHJlc2VydmVkLCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuaXNSZXNlcnZlZElkID0gZnVuY3Rpb24gaXNSZXNlcnZlZElkKGlkKSB7XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLmlzUmVzZXJ2ZWRJZCh0aGlzLnJlc2VydmVkLCBpZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBuYW1lIGlzIHJlc2VydmVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiByZXNlcnZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcclxuICovXHJcblR5cGUucHJvdG90eXBlLmlzUmVzZXJ2ZWROYW1lID0gZnVuY3Rpb24gaXNSZXNlcnZlZE5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5pc1Jlc2VydmVkTmFtZSh0aGlzLnJlc2VydmVkLCBuYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XHJcbiAqIEByZXR1cm5zIHtNZXNzYWdlPHt9Pn0gTWVzc2FnZSBpbnN0YW5jZVxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcy5jdG9yKHByb3BlcnRpZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdXAge0BsaW5rIFR5cGUjZW5jb2RlfGVuY29kZX0sIHtAbGluayBUeXBlI2RlY29kZXxkZWNvZGV9IGFuZCB7QGxpbmsgVHlwZSN2ZXJpZnl8dmVyaWZ5fS5cclxuICogQHJldHVybnMge1R5cGV9IGB0aGlzYFxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbiBzZXR1cCgpIHtcclxuICAgIC8vIFNldHMgdXAgZXZlcnl0aGluZyBhdCBvbmNlIHNvIHRoYXQgdGhlIHByb3RvdHlwZSBjaGFpbiBkb2VzIG5vdCBoYXZlIHRvIGJlIHJlLWV2YWx1YXRlZFxyXG4gICAgLy8gbXVsdGlwbGUgdGltZXMgKFY4LCBzb2Z0LWRlb3B0IHByb3RvdHlwZS1jaGVjaykuXHJcblxyXG4gICAgdmFyIGZ1bGxOYW1lID0gdGhpcy5mdWxsTmFtZSxcclxuICAgICAgICB0eXBlcyAgICA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAvKiBpbml0aWFsaXplcyAqLyB0aGlzLmZpZWxkc0FycmF5Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgIHR5cGVzLnB1c2godGhpcy5fZmllbGRzQXJyYXlbaV0ucmVzb2x2ZSgpLnJlc29sdmVkVHlwZSk7XHJcblxyXG4gICAgLy8gUmVwbGFjZSBzZXR1cCBtZXRob2RzIHdpdGggdHlwZS1zcGVjaWZpYyBnZW5lcmF0ZWQgZnVuY3Rpb25zXHJcbiAgICB0aGlzLmVuY29kZSA9IGVuY29kZXIodGhpcykoe1xyXG4gICAgICAgIFdyaXRlciA6IFdyaXRlcixcclxuICAgICAgICB0eXBlcyAgOiB0eXBlcyxcclxuICAgICAgICB1dGlsICAgOiB1dGlsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGVjb2RlID0gZGVjb2Rlcih0aGlzKSh7XHJcbiAgICAgICAgUmVhZGVyIDogUmVhZGVyLFxyXG4gICAgICAgIHR5cGVzICA6IHR5cGVzLFxyXG4gICAgICAgIHV0aWwgICA6IHV0aWxcclxuICAgIH0pO1xyXG4gICAgdGhpcy52ZXJpZnkgPSB2ZXJpZmllcih0aGlzKSh7XHJcbiAgICAgICAgdHlwZXMgOiB0eXBlcyxcclxuICAgICAgICB1dGlsICA6IHV0aWxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5mcm9tT2JqZWN0ID0gY29udmVydGVyLmZyb21PYmplY3QodGhpcykoe1xyXG4gICAgICAgIHR5cGVzIDogdHlwZXMsXHJcbiAgICAgICAgdXRpbCAgOiB1dGlsXHJcbiAgICB9KTtcclxuICAgIHRoaXMudG9PYmplY3QgPSBjb252ZXJ0ZXIudG9PYmplY3QodGhpcykoe1xyXG4gICAgICAgIHR5cGVzIDogdHlwZXMsXHJcbiAgICAgICAgdXRpbCAgOiB1dGlsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJbmplY3QgY3VzdG9tIHdyYXBwZXJzIGZvciBjb21tb24gdHlwZXNcclxuICAgIHZhciB3cmFwcGVyID0gd3JhcHBlcnNbZnVsbE5hbWVdO1xyXG4gICAgaWYgKHdyYXBwZXIpIHtcclxuICAgICAgICB2YXIgb3JpZ2luYWxUaGlzID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuICAgICAgICAvLyBpZiAod3JhcHBlci5mcm9tT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsVGhpcy5mcm9tT2JqZWN0ID0gdGhpcy5mcm9tT2JqZWN0O1xyXG4gICAgICAgICAgICB0aGlzLmZyb21PYmplY3QgPSB3cmFwcGVyLmZyb21PYmplY3QuYmluZChvcmlnaW5hbFRoaXMpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZiAod3JhcHBlci50b09iamVjdCkge1xyXG4gICAgICAgICAgICBvcmlnaW5hbFRoaXMudG9PYmplY3QgPSB0aGlzLnRvT2JqZWN0O1xyXG4gICAgICAgICAgICB0aGlzLnRvT2JqZWN0ID0gd3JhcHBlci50b09iamVjdC5iaW5kKG9yaWdpbmFsVGhpcyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBtZXNzYWdlIG9mIHRoaXMgdHlwZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgVHlwZSN2ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cclxuICogQHBhcmFtIHtNZXNzYWdlPHt9PnxPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBNZXNzYWdlIGluc3RhbmNlIG9yIHBsYWluIG9iamVjdFxyXG4gKiBAcGFyYW0ge1dyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSB3cml0ZXJcclxuICovXHJcblR5cGUucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZV9zZXR1cChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHVwKCkuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcik7IC8vIG92ZXJyaWRlcyB0aGlzIG1ldGhvZFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBtZXNzYWdlIG9mIHRoaXMgdHlwZSBwcmVjZWVkZWQgYnkgaXRzIGJ5dGUgbGVuZ3RoIGFzIGEgdmFyaW50LiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBUeXBlI3ZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gKiBAcGFyYW0ge01lc3NhZ2U8e30+fE9iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIE1lc3NhZ2UgaW5zdGFuY2Ugb3IgcGxhaW4gb2JqZWN0XHJcbiAqIEBwYXJhbSB7V3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IHdyaXRlclxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlciAmJiB3cml0ZXIubGVuID8gd3JpdGVyLmZvcmsoKSA6IHdyaXRlcikubGRlbGltKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlLlxyXG4gKiBAcGFyYW0ge1JlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTGVuZ3RoIG9mIHRoZSBtZXNzYWdlLCBpZiBrbm93biBiZWZvcmVoYW5kXHJcbiAqIEByZXR1cm5zIHtNZXNzYWdlPHt9Pn0gRGVjb2RlZCBtZXNzYWdlXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAqIEB0aHJvd3Mge3V0aWwuUHJvdG9jb2xFcnJvcjx7fT59IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlX3NldHVwKHJlYWRlciwgbGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR1cCgpLmRlY29kZShyZWFkZXIsIGxlbmd0aCk7IC8vIG92ZXJyaWRlcyB0aGlzIG1ldGhvZFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgYSBtZXNzYWdlIG9mIHRoaXMgdHlwZSBwcmVjZWVkZWQgYnkgaXRzIGJ5dGUgbGVuZ3RoIGFzIGEgdmFyaW50LlxyXG4gKiBAcGFyYW0ge1JlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxyXG4gKiBAcmV0dXJucyB7TWVzc2FnZTx7fT59IERlY29kZWQgbWVzc2FnZVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxyXG4gKiBAdGhyb3dzIHt1dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgUmVhZGVyKSlcclxuICAgICAgICByZWFkZXIgPSBSZWFkZXIuY3JlYXRlKHJlYWRlcik7XHJcbiAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZlcmlmaWVzIHRoYXQgZmllbGQgdmFsdWVzIGFyZSB2YWxpZCBhbmQgdGhhdCByZXF1aXJlZCBmaWVsZHMgYXJlIHByZXNlbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gKiBAcmV0dXJucyB7bnVsbHxzdHJpbmd9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5X3NldHVwKG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHVwKCkudmVyaWZ5KG1lc3NhZ2UpOyAvLyBvdmVycmlkZXMgdGhpcyBtZXRob2RcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3QgdG8gY29udmVydFxyXG4gKiBAcmV0dXJucyB7TWVzc2FnZTx7fT59IE1lc3NhZ2UgaW5zdGFuY2VcclxuICovXHJcblR5cGUucHJvdG90eXBlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dXAoKS5mcm9tT2JqZWN0KG9iamVjdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVyc2lvbiBvcHRpb25zIGFzIHVzZWQgYnkge0BsaW5rIFR5cGUjdG9PYmplY3R9IGFuZCB7QGxpbmsgTWVzc2FnZS50b09iamVjdH0uXHJcbiAqIEBpbnRlcmZhY2UgSUNvbnZlcnNpb25PcHRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IFtsb25nc10gTG9uZyBjb252ZXJzaW9uIHR5cGUuXHJcbiAqIFZhbGlkIHZhbHVlcyBhcmUgYFN0cmluZ2AgYW5kIGBOdW1iZXJgICh0aGUgZ2xvYmFsIHR5cGVzKS5cclxuICogRGVmYXVsdHMgdG8gY29weSB0aGUgcHJlc2VudCB2YWx1ZSwgd2hpY2ggaXMgYSBwb3NzaWJseSB1bnNhZmUgbnVtYmVyIHdpdGhvdXQgYW5kIGEge0BsaW5rIExvbmd9IHdpdGggYSBsb25nIGxpYnJhcnkuXHJcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IFtlbnVtc10gRW51bSB2YWx1ZSBjb252ZXJzaW9uIHR5cGUuXHJcbiAqIE9ubHkgdmFsaWQgdmFsdWUgaXMgYFN0cmluZ2AgKHRoZSBnbG9iYWwgdHlwZSkuXHJcbiAqIERlZmF1bHRzIHRvIGNvcHkgdGhlIHByZXNlbnQgdmFsdWUsIHdoaWNoIGlzIHRoZSBudW1lcmljIGlkLlxyXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBbYnl0ZXNdIEJ5dGVzIHZhbHVlIGNvbnZlcnNpb24gdHlwZS5cclxuICogVmFsaWQgdmFsdWVzIGFyZSBgQXJyYXlgIGFuZCAoYSBiYXNlNjQgZW5jb2RlZCkgYFN0cmluZ2AgKHRoZSBnbG9iYWwgdHlwZXMpLlxyXG4gKiBEZWZhdWx0cyB0byBjb3B5IHRoZSBwcmVzZW50IHZhbHVlLCB3aGljaCB1c3VhbGx5IGlzIGEgQnVmZmVyIHVuZGVyIG5vZGUgYW5kIGFuIFVpbnQ4QXJyYXkgaW4gdGhlIGJyb3dzZXIuXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2RlZmF1bHRzPWZhbHNlXSBBbHNvIHNldHMgZGVmYXVsdCB2YWx1ZXMgb24gdGhlIHJlc3VsdGluZyBvYmplY3RcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbYXJyYXlzPWZhbHNlXSBTZXRzIGVtcHR5IGFycmF5cyBmb3IgbWlzc2luZyByZXBlYXRlZCBmaWVsZHMgZXZlbiBpZiBgZGVmYXVsdHM9ZmFsc2VgXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW29iamVjdHM9ZmFsc2VdIFNldHMgZW1wdHkgb2JqZWN0cyBmb3IgbWlzc2luZyBtYXAgZmllbGRzIGV2ZW4gaWYgYGRlZmF1bHRzPWZhbHNlYFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtvbmVvZnM9ZmFsc2VdIEluY2x1ZGVzIHZpcnR1YWwgb25lb2YgcHJvcGVydGllcyBzZXQgdG8gdGhlIHByZXNlbnQgZmllbGQncyBuYW1lLCBpZiBhbnlcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbanNvbj1mYWxzZV0gUGVyZm9ybXMgYWRkaXRpb25hbCBKU09OIGNvbXBhdGliaWxpdHkgY29udmVyc2lvbnMsIGkuZS4gTmFOIGFuZCBJbmZpbml0eSB0byBzdHJpbmdzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXHJcbiAqIEBwYXJhbSB7TWVzc2FnZTx7fT59IG1lc3NhZ2UgTWVzc2FnZSBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge0lDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR1cCgpLnRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29yYXRvciBmdW5jdGlvbiBhcyByZXR1cm5lZCBieSB7QGxpbmsgVHlwZS5kfSAoVHlwZVNjcmlwdCkuXHJcbiAqIEB0eXBlZGVmIFR5cGVEZWNvcmF0b3JcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFQ+fSB0YXJnZXQgVGFyZ2V0IGNvbnN0cnVjdG9yXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUeXBlIGRlY29yYXRvciAoVHlwZVNjcmlwdCkuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZU5hbWVdIFR5cGUgbmFtZSwgZGVmYXVsdHMgdG8gdGhlIGNvbnN0cnVjdG9yJ3MgbmFtZVxyXG4gKiBAcmV0dXJucyB7VHlwZURlY29yYXRvcjxUPn0gRGVjb3JhdG9yIGZ1bmN0aW9uXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKi9cclxuVHlwZS5kID0gZnVuY3Rpb24gZGVjb3JhdGVUeXBlKHR5cGVOYW1lKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gdHlwZURlY29yYXRvcih0YXJnZXQpIHtcclxuICAgICAgICB1dGlsLmRlY29yYXRlVHlwZSh0YXJnZXQsIHR5cGVOYW1lKTtcclxuICAgIH07XHJcbn07XHJcblxyXG59LHtcIjEyXCI6MTIsXCIxM1wiOjEzLFwiMTRcIjoxNCxcIjE1XCI6MTUsXCIxNlwiOjE2LFwiMjBcIjoyMCxcIjIxXCI6MjEsXCIyM1wiOjIzLFwiMjVcIjoyNSxcIjI3XCI6MjcsXCIzM1wiOjMzLFwiMzdcIjozNyxcIjQwXCI6NDAsXCI0MVwiOjQxLFwiNDJcIjo0Mn1dLDM2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQ29tbW9uIHR5cGUgY29uc3RhbnRzLlxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgdHlwZXMgPSBleHBvcnRzO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKDM3KTtcclxuXHJcbnZhciBzID0gW1xyXG4gICAgXCJkb3VibGVcIiwgICAvLyAwXHJcbiAgICBcImZsb2F0XCIsICAgIC8vIDFcclxuICAgIFwiaW50MzJcIiwgICAgLy8gMlxyXG4gICAgXCJ1aW50MzJcIiwgICAvLyAzXHJcbiAgICBcInNpbnQzMlwiLCAgIC8vIDRcclxuICAgIFwiZml4ZWQzMlwiLCAgLy8gNVxyXG4gICAgXCJzZml4ZWQzMlwiLCAvLyA2XHJcbiAgICBcImludDY0XCIsICAgIC8vIDdcclxuICAgIFwidWludDY0XCIsICAgLy8gOFxyXG4gICAgXCJzaW50NjRcIiwgICAvLyA5XHJcbiAgICBcImZpeGVkNjRcIiwgIC8vIDEwXHJcbiAgICBcInNmaXhlZDY0XCIsIC8vIDExXHJcbiAgICBcImJvb2xcIiwgICAgIC8vIDEyXHJcbiAgICBcInN0cmluZ1wiLCAgIC8vIDEzXHJcbiAgICBcImJ5dGVzXCIgICAgIC8vIDE0XHJcbl07XHJcblxyXG5mdW5jdGlvbiBiYWtlKHZhbHVlcywgb2Zmc2V0KSB7XHJcbiAgICB2YXIgaSA9IDAsIG8gPSB7fTtcclxuICAgIG9mZnNldCB8PSAwO1xyXG4gICAgd2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSBvW3NbaSArIG9mZnNldF1dID0gdmFsdWVzW2krK107XHJcbiAgICByZXR1cm4gbztcclxufVxyXG5cclxuLyoqXHJcbiAqIEJhc2ljIHR5cGUgd2lyZSB0eXBlcy5cclxuICogQHR5cGUge09iamVjdC48c3RyaW5nLG51bWJlcj59XHJcbiAqIEBjb25zdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZG91YmxlPTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZsb2F0PTUgRml4ZWQzMiB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdWludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQzMj01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzZml4ZWQzMj01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkNjQ9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkNjQ9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gYm9vbD0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHN0cmluZz0yIExkZWxpbSB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGJ5dGVzPTIgTGRlbGltIHdpcmUgdHlwZVxyXG4gKi9cclxudHlwZXMuYmFzaWMgPSBiYWtlKFtcclxuICAgIC8qIGRvdWJsZSAgICovIDEsXHJcbiAgICAvKiBmbG9hdCAgICAqLyA1LFxyXG4gICAgLyogaW50MzIgICAgKi8gMCxcclxuICAgIC8qIHVpbnQzMiAgICovIDAsXHJcbiAgICAvKiBzaW50MzIgICAqLyAwLFxyXG4gICAgLyogZml4ZWQzMiAgKi8gNSxcclxuICAgIC8qIHNmaXhlZDMyICovIDUsXHJcbiAgICAvKiBpbnQ2NCAgICAqLyAwLFxyXG4gICAgLyogdWludDY0ICAgKi8gMCxcclxuICAgIC8qIHNpbnQ2NCAgICovIDAsXHJcbiAgICAvKiBmaXhlZDY0ICAqLyAxLFxyXG4gICAgLyogc2ZpeGVkNjQgKi8gMSxcclxuICAgIC8qIGJvb2wgICAgICovIDAsXHJcbiAgICAvKiBzdHJpbmcgICAqLyAyLFxyXG4gICAgLyogYnl0ZXMgICAgKi8gMlxyXG5dKTtcclxuXHJcbi8qKlxyXG4gKiBCYXNpYyB0eXBlIGRlZmF1bHRzLlxyXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsKj59XHJcbiAqIEBjb25zdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZG91YmxlPTAgRG91YmxlIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZsb2F0PTAgRmxvYXQgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW50MzI9MCBJbnQzMiBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1aW50MzI9MCBVaW50MzIgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDMyPTAgU2ludDMyIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkMzI9MCBGaXhlZDMyIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNmaXhlZDMyPTAgU2ZpeGVkMzIgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW50NjQ9MCBJbnQ2NCBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1aW50NjQ9MCBVaW50NjQgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDY0PTAgU2ludDMyIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkNjQ9MCBGaXhlZDY0IGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNmaXhlZDY0PTAgU2ZpeGVkNjQgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGJvb2w9ZmFsc2UgQm9vbCBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdHJpbmc9XCJcIiBTdHJpbmcgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge0FycmF5LjxudW1iZXI+fSBieXRlcz1BcnJheSgwKSBCeXRlcyBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVsbH0gbWVzc2FnZT1udWxsIE1lc3NhZ2UgZGVmYXVsdFxyXG4gKi9cclxudHlwZXMuZGVmYXVsdHMgPSBiYWtlKFtcclxuICAgIC8qIGRvdWJsZSAgICovIDAsXHJcbiAgICAvKiBmbG9hdCAgICAqLyAwLFxyXG4gICAgLyogaW50MzIgICAgKi8gMCxcclxuICAgIC8qIHVpbnQzMiAgICovIDAsXHJcbiAgICAvKiBzaW50MzIgICAqLyAwLFxyXG4gICAgLyogZml4ZWQzMiAgKi8gMCxcclxuICAgIC8qIHNmaXhlZDMyICovIDAsXHJcbiAgICAvKiBpbnQ2NCAgICAqLyAwLFxyXG4gICAgLyogdWludDY0ICAgKi8gMCxcclxuICAgIC8qIHNpbnQ2NCAgICovIDAsXHJcbiAgICAvKiBmaXhlZDY0ICAqLyAwLFxyXG4gICAgLyogc2ZpeGVkNjQgKi8gMCxcclxuICAgIC8qIGJvb2wgICAgICovIGZhbHNlLFxyXG4gICAgLyogc3RyaW5nICAgKi8gXCJcIixcclxuICAgIC8qIGJ5dGVzICAgICovIHV0aWwuZW1wdHlBcnJheSxcclxuICAgIC8qIG1lc3NhZ2UgICovIG51bGxcclxuXSk7XHJcblxyXG4vKipcclxuICogQmFzaWMgbG9uZyB0eXBlIHdpcmUgdHlwZXMuXHJcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxudW1iZXI+fVxyXG4gKiBAY29uc3RcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludDY0PTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdWludDY0PTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDY0PTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQ2ND0xIEZpeGVkNjQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzZml4ZWQ2ND0xIEZpeGVkNjQgd2lyZSB0eXBlXHJcbiAqL1xyXG50eXBlcy5sb25nID0gYmFrZShbXHJcbiAgICAvKiBpbnQ2NCAgICAqLyAwLFxyXG4gICAgLyogdWludDY0ICAgKi8gMCxcclxuICAgIC8qIHNpbnQ2NCAgICovIDAsXHJcbiAgICAvKiBmaXhlZDY0ICAqLyAxLFxyXG4gICAgLyogc2ZpeGVkNjQgKi8gMVxyXG5dLCA3KTtcclxuXHJcbi8qKlxyXG4gKiBBbGxvd2VkIHR5cGVzIGZvciBtYXAga2V5cyB3aXRoIHRoZWlyIGFzc29jaWF0ZWQgd2lyZSB0eXBlLlxyXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsbnVtYmVyPn1cclxuICogQGNvbnN0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQzMj0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQzMj0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNpbnQzMj0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkMzI9NSBGaXhlZDMyIHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkMzI9NSBGaXhlZDMyIHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1aW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaXhlZDY0PTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNmaXhlZDY0PTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGJvb2w9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdHJpbmc9MiBMZGVsaW0gd2lyZSB0eXBlXHJcbiAqL1xyXG50eXBlcy5tYXBLZXkgPSBiYWtlKFtcclxuICAgIC8qIGludDMyICAgICovIDAsXHJcbiAgICAvKiB1aW50MzIgICAqLyAwLFxyXG4gICAgLyogc2ludDMyICAgKi8gMCxcclxuICAgIC8qIGZpeGVkMzIgICovIDUsXHJcbiAgICAvKiBzZml4ZWQzMiAqLyA1LFxyXG4gICAgLyogaW50NjQgICAgKi8gMCxcclxuICAgIC8qIHVpbnQ2NCAgICovIDAsXHJcbiAgICAvKiBzaW50NjQgICAqLyAwLFxyXG4gICAgLyogZml4ZWQ2NCAgKi8gMSxcclxuICAgIC8qIHNmaXhlZDY0ICovIDEsXHJcbiAgICAvKiBib29sICAgICAqLyAwLFxyXG4gICAgLyogc3RyaW5nICAgKi8gMlxyXG5dLCAyKTtcclxuXHJcbi8qKlxyXG4gKiBBbGxvd2VkIHR5cGVzIGZvciBwYWNrZWQgcmVwZWF0ZWQgZmllbGRzIHdpdGggdGhlaXIgYXNzb2NpYXRlZCB3aXJlIHR5cGUuXHJcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxudW1iZXI+fVxyXG4gKiBAY29uc3RcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRvdWJsZT0xIEZpeGVkNjQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmbG9hdD01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQzMj0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQzMj0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNpbnQzMj0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkMzI9NSBGaXhlZDMyIHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkMzI9NSBGaXhlZDMyIHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1aW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaXhlZDY0PTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNmaXhlZDY0PTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGJvb2w9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqL1xyXG50eXBlcy5wYWNrZWQgPSBiYWtlKFtcclxuICAgIC8qIGRvdWJsZSAgICovIDEsXHJcbiAgICAvKiBmbG9hdCAgICAqLyA1LFxyXG4gICAgLyogaW50MzIgICAgKi8gMCxcclxuICAgIC8qIHVpbnQzMiAgICovIDAsXHJcbiAgICAvKiBzaW50MzIgICAqLyAwLFxyXG4gICAgLyogZml4ZWQzMiAgKi8gNSxcclxuICAgIC8qIHNmaXhlZDMyICovIDUsXHJcbiAgICAvKiBpbnQ2NCAgICAqLyAwLFxyXG4gICAgLyogdWludDY0ICAgKi8gMCxcclxuICAgIC8qIHNpbnQ2NCAgICovIDAsXHJcbiAgICAvKiBmaXhlZDY0ICAqLyAxLFxyXG4gICAgLyogc2ZpeGVkNjQgKi8gMSxcclxuICAgIC8qIGJvb2wgICAgICovIDBcclxuXSk7XHJcblxyXG59LHtcIjM3XCI6Mzd9XSwzNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIFZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGlsID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKDM5KTtcclxuXHJcbnZhciByb290cyA9IHJlcXVpcmUoMzApO1xyXG5cclxudmFyIFR5cGUsIC8vIGN5Y2xpY1xyXG4gICAgRW51bTtcclxuXHJcbnV0aWwuY29kZWdlbiA9IHJlcXVpcmUoMyk7XHJcbnV0aWwuZmV0Y2ggICA9IHJlcXVpcmUoNSk7XHJcbnV0aWwucGF0aCAgICA9IHJlcXVpcmUoOCk7XHJcblxyXG4vKipcclxuICogTm9kZSdzIGZzIG1vZHVsZSBpZiBhdmFpbGFibGUuXHJcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywqPn1cclxuICovXHJcbnV0aWwuZnMgPSB1dGlsLmlucXVpcmUoXCJmc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QncyB2YWx1ZXMgdG8gYW4gYXJyYXkuXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBPYmplY3QgdG8gY29udmVydFxyXG4gKiBAcmV0dXJucyB7QXJyYXkuPCo+fSBDb252ZXJ0ZWQgYXJyYXlcclxuICovXHJcbnV0aWwudG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0KSB7XHJcbiAgICBpZiAob2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIGtleXMgID0gT2JqZWN0LmtleXMob2JqZWN0KSxcclxuICAgICAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgpLFxyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwga2V5cy5sZW5ndGgpXHJcbiAgICAgICAgICAgIGFycmF5W2luZGV4XSA9IG9iamVjdFtrZXlzW2luZGV4KytdXTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gYXJyYXkgb2Yga2V5cyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGVpciByZXNwZWN0aXZlIHZhbHVlIHRvIGFuIG9iamVjdCwgb21pdHRpbmcgdW5kZWZpbmVkIHZhbHVlcy5cclxuICogQHBhcmFtIHtBcnJheS48Kj59IGFycmF5IEFycmF5IHRvIGNvbnZlcnRcclxuICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBDb252ZXJ0ZWQgb2JqZWN0XHJcbiAqL1xyXG51dGlsLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QoYXJyYXkpIHtcclxuICAgIHZhciBvYmplY3QgPSB7fSxcclxuICAgICAgICBpbmRleCAgPSAwO1xyXG4gICAgd2hpbGUgKGluZGV4IDwgYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IGFycmF5W2luZGV4KytdLFxyXG4gICAgICAgICAgICB2YWwgPSBhcnJheVtpbmRleCsrXTtcclxuICAgICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iamVjdDtcclxufTtcclxuXHJcbnZhciBzYWZlUHJvcEJhY2tzbGFzaFJlID0gL1xcXFwvZyxcclxuICAgIHNhZmVQcm9wUXVvdGVSZSAgICAgPSAvXCIvZztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgbmFtZSBpcyBhIHJlc2VydmVkIHdvcmQgaW4gSlMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHJlc2VydmVkLCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxudXRpbC5pc1Jlc2VydmVkID0gZnVuY3Rpb24gaXNSZXNlcnZlZChuYW1lKSB7XHJcbiAgICByZXR1cm4gL14oPzpkb3xpZnxpbnxmb3J8bGV0fG5ld3x0cnl8dmFyfGNhc2V8ZWxzZXxlbnVtfGV2YWx8ZmFsc2V8bnVsbHx0aGlzfHRydWV8dm9pZHx3aXRofGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxleHBvcnR8aW1wb3J0fHB1YmxpY3xyZXR1cm58c3RhdGljfHN3aXRjaHx0eXBlb2Z8ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufGFyZ3VtZW50c3xpbnRlcmZhY2V8cHJvdGVjdGVkfGltcGxlbWVudHN8aW5zdGFuY2VvZikkLy50ZXN0KG5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBzYWZlIHByb3BlcnR5IGFjY2Vzc29yIGZvciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG5hbWUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcclxuICogQHJldHVybnMge3N0cmluZ30gU2FmZSBhY2Nlc3NvclxyXG4gKi9cclxudXRpbC5zYWZlUHJvcCA9IGZ1bmN0aW9uIHNhZmVQcm9wKHByb3ApIHtcclxuICAgIGlmICghL15bJFxcd19dKyQvLnRlc3QocHJvcCkgfHwgdXRpbC5pc1Jlc2VydmVkKHByb3ApKVxyXG4gICAgICAgIHJldHVybiBcIltcXFwiXCIgKyBwcm9wLnJlcGxhY2Uoc2FmZVByb3BCYWNrc2xhc2hSZSwgXCJcXFxcXFxcXFwiKS5yZXBsYWNlKHNhZmVQcm9wUXVvdGVSZSwgXCJcXFxcXFxcIlwiKSArIFwiXFxcIl1cIjtcclxuICAgIHJldHVybiBcIi5cIiArIHByb3A7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyB0byB1cHBlciBjYXNlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvbnZlcnRlZCBzdHJpbmdcclxuICovXHJcbnV0aWwudWNGaXJzdCA9IGZ1bmN0aW9uIHVjRmlyc3Qoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcclxufTtcclxuXHJcbnZhciBjYW1lbENhc2VSZSA9IC9fKFthLXpdKS9nO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGNhbWVsIGNhc2UuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIGNvbnZlcnRcclxuICogQHJldHVybnMge3N0cmluZ30gQ29udmVydGVkIHN0cmluZ1xyXG4gKi9cclxudXRpbC5jYW1lbENhc2UgPSBmdW5jdGlvbiBjYW1lbENhc2Uoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnN1YnN0cmluZygwLCAxKVxyXG4gICAgICAgICArIHN0ci5zdWJzdHJpbmcoMSlcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoY2FtZWxDYXNlUmUsIGZ1bmN0aW9uKCQwLCAkMSkgeyByZXR1cm4gJDEudG9VcHBlckNhc2UoKTsgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcGFyZXMgcmVmbGVjdGVkIGZpZWxkcyBieSBpZC5cclxuICogQHBhcmFtIHtGaWVsZH0gYSBGaXJzdCBmaWVsZFxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBiIFNlY29uZCBmaWVsZFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBDb21wYXJpc29uIHZhbHVlXHJcbiAqL1xyXG51dGlsLmNvbXBhcmVGaWVsZHNCeUlkID0gZnVuY3Rpb24gY29tcGFyZUZpZWxkc0J5SWQoYSwgYikge1xyXG4gICAgcmV0dXJuIGEuaWQgLSBiLmlkO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29yYXRvciBoZWxwZXIgZm9yIHR5cGVzIChUeXBlU2NyaXB0KS5cclxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUPn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVOYW1lXSBUeXBlIG5hbWUsIGRlZmF1bHRzIHRvIHRoZSBjb25zdHJ1Y3RvcidzIG5hbWVcclxuICogQHJldHVybnMge1R5cGV9IFJlZmxlY3RlZCB0eXBlXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAcHJvcGVydHkge1Jvb3R9IHJvb3QgRGVjb3JhdG9ycyByb290XHJcbiAqL1xyXG51dGlsLmRlY29yYXRlVHlwZSA9IGZ1bmN0aW9uIGRlY29yYXRlVHlwZShjdG9yLCB0eXBlTmFtZSkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKGN0b3IuJHR5cGUpIHtcclxuICAgICAgICBpZiAodHlwZU5hbWUgJiYgY3Rvci4kdHlwZS5uYW1lICE9PSB0eXBlTmFtZSkge1xyXG4gICAgICAgICAgICB1dGlsLmRlY29yYXRlUm9vdC5yZW1vdmUoY3Rvci4kdHlwZSk7XHJcbiAgICAgICAgICAgIGN0b3IuJHR5cGUubmFtZSA9IHR5cGVOYW1lO1xyXG4gICAgICAgICAgICB1dGlsLmRlY29yYXRlUm9vdC5hZGQoY3Rvci4kdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdG9yLiR0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBpZiAoIVR5cGUpXHJcbiAgICAgICAgVHlwZSA9IHJlcXVpcmUoMzUpO1xyXG5cclxuICAgIHZhciB0eXBlID0gbmV3IFR5cGUodHlwZU5hbWUgfHwgY3Rvci5uYW1lKTtcclxuICAgIHV0aWwuZGVjb3JhdGVSb290LmFkZCh0eXBlKTtcclxuICAgIHR5cGUuY3RvciA9IGN0b3I7IC8vIHNldHMgdXAgLmVuY29kZSwgLmRlY29kZSBldGMuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3RvciwgXCIkdHlwZVwiLCB7IHZhbHVlOiB0eXBlLCBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdG9yLnByb3RvdHlwZSwgXCIkdHlwZVwiLCB7IHZhbHVlOiB0eXBlLCBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcclxuICAgIHJldHVybiB0eXBlO1xyXG59O1xyXG5cclxudmFyIGRlY29yYXRlRW51bUluZGV4ID0gMDtcclxuXHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgaGVscGVyIGZvciBlbnVtcyAoVHlwZVNjcmlwdCkuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgRW51bSBvYmplY3RcclxuICogQHJldHVybnMge0VudW19IFJlZmxlY3RlZCBlbnVtXHJcbiAqL1xyXG51dGlsLmRlY29yYXRlRW51bSA9IGZ1bmN0aW9uIGRlY29yYXRlRW51bShvYmplY3QpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmIChvYmplY3QuJHR5cGUpXHJcbiAgICAgICAgcmV0dXJuIG9iamVjdC4kdHlwZTtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgaWYgKCFFbnVtKVxyXG4gICAgICAgIEVudW0gPSByZXF1aXJlKDE1KTtcclxuXHJcbiAgICB2YXIgZW5tID0gbmV3IEVudW0oXCJFbnVtXCIgKyBkZWNvcmF0ZUVudW1JbmRleCsrLCBvYmplY3QpO1xyXG4gICAgdXRpbC5kZWNvcmF0ZVJvb3QuYWRkKGVubSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBcIiR0eXBlXCIsIHsgdmFsdWU6IGVubSwgZW51bWVyYWJsZTogZmFsc2UgfSk7XHJcbiAgICByZXR1cm4gZW5tO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29yYXRvciByb290IChUeXBlU2NyaXB0KS5cclxuICogQG5hbWUgdXRpbC5kZWNvcmF0ZVJvb3RcclxuICogQHR5cGUge1Jvb3R9XHJcbiAqIEByZWFkb25seVxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHV0aWwsIFwiZGVjb3JhdGVSb290XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvb3RzW1wiZGVjb3JhdGVkXCJdIHx8IChyb290c1tcImRlY29yYXRlZFwiXSA9IG5ldyAocmVxdWlyZSgyOSkpKCkpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbn0se1wiMTVcIjoxNSxcIjI5XCI6MjksXCIzXCI6MyxcIjMwXCI6MzAsXCIzNVwiOjM1LFwiMzlcIjozOSxcIjVcIjo1LFwiOFwiOjh9XSwzODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IExvbmdCaXRzO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKDM5KTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMuXHJcbiAqIEBjbGFzc2Rlc2MgSGVscGVyIGNsYXNzIGZvciB3b3JraW5nIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtudW1iZXJ9IGxvIExvdyAzMiBiaXRzLCB1bnNpZ25lZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgSGlnaCAzMiBiaXRzLCB1bnNpZ25lZFxyXG4gKi9cclxuZnVuY3Rpb24gTG9uZ0JpdHMobG8sIGhpKSB7XHJcblxyXG4gICAgLy8gbm90ZSB0aGF0IHRoZSBjYXN0cyBiZWxvdyBhcmUgdGhlb3JldGljYWxseSB1bm5lY2Vzc2FyeSBhcyBvZiB0b2RheSwgYnV0IG9sZGVyIHN0YXRpY2FsbHlcclxuICAgIC8vIGdlbmVyYXRlZCBjb252ZXJ0ZXIgY29kZSBtaWdodCBzdGlsbCBjYWxsIHRoZSBjdG9yIHdpdGggc2lnbmVkIDMyYml0cy4ga2VwdCBmb3IgY29tcGF0LlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG93IGJpdHMuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvID0gbG8gPj4+IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdoIGJpdHMuXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmhpID0gaGkgPj4+IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBaZXJvIGJpdHMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXHJcbiAqIEB0eXBlIHt1dGlsLkxvbmdCaXRzfVxyXG4gKi9cclxudmFyIHplcm8gPSBMb25nQml0cy56ZXJvID0gbmV3IExvbmdCaXRzKDAsIDApO1xyXG5cclxuemVyby50b051bWJlciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcclxuemVyby56ekVuY29kZSA9IHplcm8uenpEZWNvZGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH07XHJcbnplcm8ubGVuZ3RoID0gZnVuY3Rpb24oKSB7IHJldHVybiAxOyB9O1xyXG5cclxuLyoqXHJcbiAqIFplcm8gaGFzaC5cclxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbnZhciB6ZXJvSGFzaCA9IExvbmdCaXRzLnplcm9IYXNoID0gXCJcXDBcXDBcXDBcXDBcXDBcXDBcXDBcXDBcIjtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIG51bWJlci5cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlXHJcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxyXG4gKi9cclxuTG9uZ0JpdHMuZnJvbU51bWJlciA9IGZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gMClcclxuICAgICAgICByZXR1cm4gemVybztcclxuICAgIHZhciBzaWduID0gdmFsdWUgPCAwO1xyXG4gICAgaWYgKHNpZ24pXHJcbiAgICAgICAgdmFsdWUgPSAtdmFsdWU7XHJcbiAgICB2YXIgbG8gPSB2YWx1ZSA+Pj4gMCxcclxuICAgICAgICBoaSA9ICh2YWx1ZSAtIGxvKSAvIDQyOTQ5NjcyOTYgPj4+IDA7XHJcbiAgICBpZiAoc2lnbikge1xyXG4gICAgICAgIGhpID0gfmhpID4+PiAwO1xyXG4gICAgICAgIGxvID0gfmxvID4+PiAwO1xyXG4gICAgICAgIGlmICgrK2xvID4gNDI5NDk2NzI5NSkge1xyXG4gICAgICAgICAgICBsbyA9IDA7XHJcbiAgICAgICAgICAgIGlmICgrK2hpID4gNDI5NDk2NzI5NSlcclxuICAgICAgICAgICAgICAgIGhpID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKGxvLCBoaSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gYSBudW1iZXIsIGxvbmcgb3Igc3RyaW5nLlxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWVcclxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXHJcbiAqL1xyXG5Mb25nQml0cy5mcm9tID0gZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcih2YWx1ZSk7XHJcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgIGlmICh1dGlsLkxvbmcpXHJcbiAgICAgICAgICAgIHZhbHVlID0gdXRpbC5Mb25nLmZyb21TdHJpbmcodmFsdWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIocGFyc2VJbnQodmFsdWUsIDEwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUubG93IHx8IHZhbHVlLmhpZ2ggPyBuZXcgTG9uZ0JpdHModmFsdWUubG93ID4+PiAwLCB2YWx1ZS5oaWdoID4+PiAwKSA6IHplcm87XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBwb3NzaWJseSB1bnNhZmUgSmF2YVNjcmlwdCBudW1iZXIuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBQb3NzaWJseSB1bnNhZmUgbnVtYmVyXHJcbiAqL1xyXG5Mb25nQml0cy5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiB0b051bWJlcih1bnNpZ25lZCkge1xyXG4gICAgaWYgKCF1bnNpZ25lZCAmJiB0aGlzLmhpID4+PiAzMSkge1xyXG4gICAgICAgIHZhciBsbyA9IH50aGlzLmxvICsgMSA+Pj4gMCxcclxuICAgICAgICAgICAgaGkgPSB+dGhpcy5oaSAgICAgPj4+IDA7XHJcbiAgICAgICAgaWYgKCFsbylcclxuICAgICAgICAgICAgaGkgPSBoaSArIDEgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIC0obG8gKyBoaSAqIDQyOTQ5NjcyOTYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubG8gKyB0aGlzLmhpICogNDI5NDk2NzI5NjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIGxvbmcuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxyXG4gKiBAcmV0dXJucyB7TG9uZ30gTG9uZ1xyXG4gKi9cclxuTG9uZ0JpdHMucHJvdG90eXBlLnRvTG9uZyA9IGZ1bmN0aW9uIHRvTG9uZyh1bnNpZ25lZCkge1xyXG4gICAgcmV0dXJuIHV0aWwuTG9uZ1xyXG4gICAgICAgID8gbmV3IHV0aWwuTG9uZyh0aGlzLmxvIHwgMCwgdGhpcy5oaSB8IDAsIEJvb2xlYW4odW5zaWduZWQpKVxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgOiB7IGxvdzogdGhpcy5sbyB8IDAsIGhpZ2g6IHRoaXMuaGkgfCAwLCB1bnNpZ25lZDogQm9vbGVhbih1bnNpZ25lZCkgfTtcclxufTtcclxuXHJcbnZhciBjaGFyQ29kZUF0ID0gU3RyaW5nLnByb3RvdHlwZS5jaGFyQ29kZUF0O1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxyXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gQml0c1xyXG4gKi9cclxuTG9uZ0JpdHMuZnJvbUhhc2ggPSBmdW5jdGlvbiBmcm9tSGFzaChoYXNoKSB7XHJcbiAgICBpZiAoaGFzaCA9PT0gemVyb0hhc2gpXHJcbiAgICAgICAgcmV0dXJuIHplcm87XHJcbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKFxyXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDApXHJcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMSkgPDwgOFxyXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDIpIDw8IDE2XHJcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMykgPDwgMjQpID4+PiAwXHJcbiAgICAsXHJcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNClcclxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA1KSA8PCA4XHJcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNikgPDwgMTZcclxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA3KSA8PCAyNCkgPj4+IDBcclxuICAgICk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXHJcbiAqL1xyXG5Mb25nQml0cy5wcm90b3R5cGUudG9IYXNoID0gZnVuY3Rpb24gdG9IYXNoKCkge1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXHJcbiAgICAgICAgdGhpcy5sbyAgICAgICAgJiAyNTUsXHJcbiAgICAgICAgdGhpcy5sbyA+Pj4gOCAgJiAyNTUsXHJcbiAgICAgICAgdGhpcy5sbyA+Pj4gMTYgJiAyNTUsXHJcbiAgICAgICAgdGhpcy5sbyA+Pj4gMjQgICAgICAsXHJcbiAgICAgICAgdGhpcy5oaSAgICAgICAgJiAyNTUsXHJcbiAgICAgICAgdGhpcy5oaSA+Pj4gOCAgJiAyNTUsXHJcbiAgICAgICAgdGhpcy5oaSA+Pj4gMTYgJiAyNTUsXHJcbiAgICAgICAgdGhpcy5oaSA+Pj4gMjRcclxuICAgICk7XHJcbn07XHJcblxyXG4vKipcclxuICogWmlnLXphZyBlbmNvZGVzIHRoaXMgbG9uZyBiaXRzLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXHJcbiAqL1xyXG5Mb25nQml0cy5wcm90b3R5cGUuenpFbmNvZGUgPSBmdW5jdGlvbiB6ekVuY29kZSgpIHtcclxuICAgIHZhciBtYXNrID0gICB0aGlzLmhpID4+IDMxO1xyXG4gICAgdGhpcy5oaSAgPSAoKHRoaXMuaGkgPDwgMSB8IHRoaXMubG8gPj4+IDMxKSBeIG1hc2spID4+PiAwO1xyXG4gICAgdGhpcy5sbyAgPSAoIHRoaXMubG8gPDwgMSAgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogWmlnLXphZyBkZWNvZGVzIHRoaXMgbG9uZyBiaXRzLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXHJcbiAqL1xyXG5Mb25nQml0cy5wcm90b3R5cGUuenpEZWNvZGUgPSBmdW5jdGlvbiB6ekRlY29kZSgpIHtcclxuICAgIHZhciBtYXNrID0gLSh0aGlzLmxvICYgMSk7XHJcbiAgICB0aGlzLmxvICA9ICgodGhpcy5sbyA+Pj4gMSB8IHRoaXMuaGkgPDwgMzEpIF4gbWFzaykgPj4+IDA7XHJcbiAgICB0aGlzLmhpICA9ICggdGhpcy5oaSA+Pj4gMSAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhpcyBsb25nYml0cyB3aGVuIGVuY29kZWQgYXMgYSB2YXJpbnQuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aFxyXG4gKi9cclxuTG9uZ0JpdHMucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aCgpIHtcclxuICAgIHZhciBwYXJ0MCA9ICB0aGlzLmxvLFxyXG4gICAgICAgIHBhcnQxID0gKHRoaXMubG8gPj4+IDI4IHwgdGhpcy5oaSA8PCA0KSA+Pj4gMCxcclxuICAgICAgICBwYXJ0MiA9ICB0aGlzLmhpID4+PiAyNDtcclxuICAgIHJldHVybiBwYXJ0MiA9PT0gMFxyXG4gICAgICAgICA/IHBhcnQxID09PSAwXHJcbiAgICAgICAgICAgPyBwYXJ0MCA8IDE2Mzg0XHJcbiAgICAgICAgICAgICA/IHBhcnQwIDwgMTI4ID8gMSA6IDJcclxuICAgICAgICAgICAgIDogcGFydDAgPCAyMDk3MTUyID8gMyA6IDRcclxuICAgICAgICAgICA6IHBhcnQxIDwgMTYzODRcclxuICAgICAgICAgICAgID8gcGFydDEgPCAxMjggPyA1IDogNlxyXG4gICAgICAgICAgICAgOiBwYXJ0MSA8IDIwOTcxNTIgPyA3IDogOFxyXG4gICAgICAgICA6IHBhcnQyIDwgMTI4ID8gOSA6IDEwO1xyXG59O1xyXG5cclxufSx7XCIzOVwiOjM5fV0sMzk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxudmFyIHV0aWwgPSBleHBvcnRzO1xyXG5cclxuLy8gdXNlZCB0byByZXR1cm4gYSBQcm9taXNlIHdoZXJlIGNhbGxiYWNrIGlzIG9taXR0ZWRcclxudXRpbC5hc1Byb21pc2UgPSByZXF1aXJlKDEpO1xyXG5cclxuLy8gY29udmVydHMgdG8gLyBmcm9tIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcclxudXRpbC5iYXNlNjQgPSByZXF1aXJlKDIpO1xyXG5cclxuLy8gYmFzZSBjbGFzcyBvZiBycGMuU2VydmljZVxyXG51dGlsLkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoNCk7XHJcblxyXG4vLyBmbG9hdCBoYW5kbGluZyBhY2Nyb3NzIGJyb3dzZXJzXHJcbnV0aWwuZmxvYXQgPSByZXF1aXJlKDYpO1xyXG5cclxuLy8gcmVxdWlyZXMgbW9kdWxlcyBvcHRpb25hbGx5IGFuZCBoaWRlcyB0aGUgY2FsbCBmcm9tIGJ1bmRsZXJzXHJcbnV0aWwuaW5xdWlyZSA9IHJlcXVpcmUoNyk7XHJcblxyXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gdXRmOCBlbmNvZGVkIHN0cmluZ3NcclxudXRpbC51dGY4ID0gcmVxdWlyZSgxMCk7XHJcblxyXG4vLyBwcm92aWRlcyBhIG5vZGUtbGlrZSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlclxyXG51dGlsLnBvb2wgPSByZXF1aXJlKDkpO1xyXG5cclxuLy8gdXRpbGl0eSB0byB3b3JrIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlXHJcbnV0aWwuTG9uZ0JpdHMgPSByZXF1aXJlKDM4KTtcclxuXHJcbi8qKlxyXG4gKiBBbiBpbW11YWJsZSBlbXB0eSBhcnJheS5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHR5cGUge0FycmF5LjwqPn1cclxuICogQGNvbnN0XHJcbiAqL1xyXG51dGlsLmVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZShbXSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBbXTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXHJcblxyXG4vKipcclxuICogQW4gaW1tdXRhYmxlIGVtcHR5IG9iamVjdC5cclxuICogQHR5cGUge09iamVjdH1cclxuICogQGNvbnN0XHJcbiAqL1xyXG51dGlsLmVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoe30pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge307IC8vIHVzZWQgb24gcHJvdG90eXBlc1xyXG5cclxuLyoqXHJcbiAqIFdoZXRoZXIgcnVubmluZyB3aXRoaW4gbm9kZSBvciBub3QuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKiBAY29uc3RcclxuICovXHJcbnV0aWwuaXNOb2RlID0gQm9vbGVhbihnbG9iYWwucHJvY2VzcyAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9ucyAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGludGVnZXIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlclxyXG4gKi9cclxudXRpbC5pc0ludGVnZXIgPSBOdW1iZXIuaXNJbnRlZ2VyIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZ1xyXG4gKi9cclxudXRpbC5pc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3QuXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdFxyXG4gKi9cclxudXRpbC5pc09iamVjdCA9IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXHJcbiAqIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIHV0aWwuaXNTZXR9LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxudXRpbC5pc3NldCA9XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgb24gYSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudC5cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxudXRpbC5pc1NldCA9IGZ1bmN0aW9uIGlzU2V0KG9iaiwgcHJvcCkge1xyXG4gICAgdmFyIHZhbHVlID0gb2JqW3Byb3BdO1xyXG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcSwgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoKSA+IDA7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogQW55IGNvbXBhdGlibGUgQnVmZmVyIGluc3RhbmNlLlxyXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgQnVmZmVyIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBub2RlJ3MgdHlwaW5ncy5cclxuICogQGludGVyZmFjZSBCdWZmZXJcclxuICogQGV4dGVuZHMgVWludDhBcnJheVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBOb2RlJ3MgQnVmZmVyIGNsYXNzIGlmIGF2YWlsYWJsZS5cclxuICogQHR5cGUge0NvbnN0cnVjdG9yPEJ1ZmZlcj59XHJcbiAqL1xyXG51dGlsLkJ1ZmZlciA9IChmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIEJ1ZmZlciA9IHV0aWwuaW5xdWlyZShcImJ1ZmZlclwiKS5CdWZmZXI7XHJcbiAgICAgICAgLy8gcmVmdXNlIHRvIHVzZSBub24tbm9kZSBidWZmZXJzIGlmIG5vdCBleHBsaWNpdGx5IGFzc2lnbmVkIChwZXJmIHJlYXNvbnMpOlxyXG4gICAgICAgIHJldHVybiBCdWZmZXIucHJvdG90eXBlLnV0ZjhXcml0ZSA/IEJ1ZmZlciA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIG51bGw7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIEludGVybmFsIGFsaWFzIG9mIG9yIHBvbHlmdWxsIGZvciBCdWZmZXIuZnJvbS5cclxudXRpbC5fQnVmZmVyX2Zyb20gPSBudWxsO1xyXG5cclxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZpbGwgZm9yIEJ1ZmZlci5hbGxvY1Vuc2FmZS5cclxudXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IGJ1ZmZlciBvZiB3aGF0ZXZlciB0eXBlIHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBbc2l6ZU9yQXJyYXk9MF0gQnVmZmVyIHNpemUgb3IgbnVtYmVyIGFycmF5XHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fEJ1ZmZlcn0gQnVmZmVyXHJcbiAqL1xyXG51dGlsLm5ld0J1ZmZlciA9IGZ1bmN0aW9uIG5ld0J1ZmZlcihzaXplT3JBcnJheSkge1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIHJldHVybiB0eXBlb2Ygc2l6ZU9yQXJyYXkgPT09IFwibnVtYmVyXCJcclxuICAgICAgICA/IHV0aWwuQnVmZmVyXHJcbiAgICAgICAgICAgID8gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlKHNpemVPckFycmF5KVxyXG4gICAgICAgICAgICA6IG5ldyB1dGlsLkFycmF5KHNpemVPckFycmF5KVxyXG4gICAgICAgIDogdXRpbC5CdWZmZXJcclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfZnJvbShzaXplT3JBcnJheSlcclxuICAgICAgICAgICAgOiB0eXBlb2YgVWludDhBcnJheSA9PT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAgICAgPyBzaXplT3JBcnJheVxyXG4gICAgICAgICAgICAgICAgOiBuZXcgVWludDhBcnJheShzaXplT3JBcnJheSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQXJyYXkgaW1wbGVtZW50YXRpb24gdXNlZCBpbiB0aGUgYnJvd3Nlci4gYFVpbnQ4QXJyYXlgIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGBBcnJheWAuXHJcbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxVaW50OEFycmF5Pn1cclxuICovXHJcbnV0aWwuQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IFVpbnQ4QXJyYXkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOiBBcnJheTtcclxuXHJcbi8qKlxyXG4gKiBBbnkgY29tcGF0aWJsZSBMb25nIGluc3RhbmNlLlxyXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgTG9uZyBpbnN0YW5jZS4gVGhlIGFjdHVhbCB0eXBlIGlzIHRoYXQgZXhwb3J0ZWQgYnkgbG9uZy5qcy5cclxuICogQGludGVyZmFjZSBMb25nXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb3cgTG93IGJpdHNcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhpZ2ggSGlnaCBiaXRzXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3RcclxuICovXHJcblxyXG4vKipcclxuICogTG9uZy5qcydzIExvbmcgY2xhc3MgaWYgYXZhaWxhYmxlLlxyXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8TG9uZz59XHJcbiAqL1xyXG51dGlsLkxvbmcgPSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBnbG9iYWwuZGNvZGVJTyAmJiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBnbG9iYWwuZGNvZGVJTy5Mb25nIHx8IHV0aWwuaW5xdWlyZShcImxvbmdcIik7XHJcblxyXG4vKipcclxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDIgYml0IChgYm9vbGApIG1hcCBrZXlzLlxyXG4gKiBAdHlwZSB7UmVnRXhwfVxyXG4gKiBAY29uc3RcclxuICovXHJcbnV0aWwua2V5MlJlID0gL150cnVlfGZhbHNlfDB8MSQvO1xyXG5cclxuLyoqXHJcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAzMiBiaXQgKGBpbnQzMmAgZXRjLikgbWFwIGtleXMuXHJcbiAqIEB0eXBlIHtSZWdFeHB9XHJcbiAqIEBjb25zdFxyXG4gKi9cclxudXRpbC5rZXkzMlJlID0gL14tPyg/OjB8WzEtOV1bMC05XSopJC87XHJcblxyXG4vKipcclxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDY0IGJpdCAoYGludDY0YCBldGMuKSBtYXAga2V5cy5cclxuICogQHR5cGUge1JlZ0V4cH1cclxuICogQGNvbnN0XHJcbiAqL1xyXG51dGlsLmtleTY0UmUgPSAvXig/OltcXFxceDAwLVxcXFx4ZmZdezh9fC0/KD86MHxbMS05XVswLTldKikpJC87XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBudW1iZXIgb3IgbG9uZyB0byBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZy5cclxuICogQHBhcmFtIHtMb25nfG51bWJlcn0gdmFsdWUgVmFsdWUgdG8gY29udmVydFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXHJcbiAqL1xyXG51dGlsLmxvbmdUb0hhc2ggPSBmdW5jdGlvbiBsb25nVG9IYXNoKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICA/IHV0aWwuTG9uZ0JpdHMuZnJvbSh2YWx1ZSkudG9IYXNoKClcclxuICAgICAgICA6IHV0aWwuTG9uZ0JpdHMuemVyb0hhc2g7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaCBzdHJpbmcgdG8gYSBsb25nIG9yIG51bWJlci5cclxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcclxuICogQHJldHVybnMge0xvbmd8bnVtYmVyfSBPcmlnaW5hbCB2YWx1ZVxyXG4gKi9cclxudXRpbC5sb25nRnJvbUhhc2ggPSBmdW5jdGlvbiBsb25nRnJvbUhhc2goaGFzaCwgdW5zaWduZWQpIHtcclxuICAgIHZhciBiaXRzID0gdXRpbC5Mb25nQml0cy5mcm9tSGFzaChoYXNoKTtcclxuICAgIGlmICh1dGlsLkxvbmcpXHJcbiAgICAgICAgcmV0dXJuIHV0aWwuTG9uZy5mcm9tQml0cyhiaXRzLmxvLCBiaXRzLmhpLCB1bnNpZ25lZCk7XHJcbiAgICByZXR1cm4gYml0cy50b051bWJlcihCb29sZWFuKHVuc2lnbmVkKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gZHN0IERlc3RpbmF0aW9uIG9iamVjdFxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBzcmMgU291cmNlIG9iamVjdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpZk5vdFNldD1mYWxzZV0gTWVyZ2VzIG9ubHkgaWYgdGhlIGtleSBpcyBub3QgYWxyZWFkeSBzZXRcclxuICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBEZXN0aW5hdGlvbiBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlKGRzdCwgc3JjLCBpZk5vdFNldCkgeyAvLyB1c2VkIGJ5IGNvbnZlcnRlcnNcclxuICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgaWYgKGRzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkIHx8ICFpZk5vdFNldClcclxuICAgICAgICAgICAgZHN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xyXG4gICAgcmV0dXJuIGRzdDtcclxufVxyXG5cclxudXRpbC5tZXJnZSA9IG1lcmdlO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYSBzdHJpbmcgdG8gbG93ZXIgY2FzZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gY29udmVydFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb252ZXJ0ZWQgc3RyaW5nXHJcbiAqL1xyXG51dGlsLmxjRmlyc3QgPSBmdW5jdGlvbiBsY0ZpcnN0KHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGN1c3RvbSBlcnJvciBjb25zdHJ1Y3Rvci5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRXJyb3IgbmFtZVxyXG4gKiBAcmV0dXJucyB7Q29uc3RydWN0b3I8RXJyb3I+fSBDdXN0b20gZXJyb3IgY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIG5ld0Vycm9yKG5hbWUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKSB7XHJcblxyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDdXN0b21FcnJvcikpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRXJyb3IobWVzc2FnZSwgcHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIC8vIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XHJcbiAgICAgICAgLy8gXiBqdXN0IHJldHVybnMgYSBuZXcgZXJyb3IgaW5zdGFuY2UgYmVjYXVzZSB0aGUgY3RvciBjYW4gYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb25cclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibWVzc2FnZVwiLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtZXNzYWdlOyB9IH0pO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgLy8gbm9kZVxyXG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDdXN0b21FcnJvcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGFja1wiLCB7IHZhbHVlOiAobmV3IEVycm9yKCkpLnN0YWNrIHx8IFwiXCIgfSk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICBtZXJnZSh0aGlzLCBwcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAoQ3VzdG9tRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEN1c3RvbUVycm9yO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDdXN0b21FcnJvci5wcm90b3R5cGUsIFwibmFtZVwiLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBuYW1lOyB9IH0pO1xyXG5cclxuICAgIEN1c3RvbUVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIjogXCIgKyB0aGlzLm1lc3NhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBDdXN0b21FcnJvcjtcclxufVxyXG5cclxudXRpbC5uZXdFcnJvciA9IG5ld0Vycm9yO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgcHJvdG9jb2wgZXJyb3IuXHJcbiAqIEBjbGFzc2Rlc2MgRXJyb3Igc3ViY2xhc3MgaW5kaWNhdGluZyBhIHByb3RvY29sIHNwZWNpZmMgZXJyb3IuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBleHRlbmRzIEVycm9yXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWVzc2FnZVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbcHJvcGVydGllc10gQWRkaXRpb25hbCBwcm9wZXJ0aWVzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHRyeSB7XHJcbiAqICAgICBNeU1lc3NhZ2UuZGVjb2RlKHNvbWVCdWZmZXIpOyAvLyB0aHJvd3MgaWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAqIH0gY2F0Y2ggKGUpIHtcclxuICogICAgIGlmIChlIGluc3RhbmNlb2YgUHJvdG9jb2xFcnJvciAmJiBlLmluc3RhbmNlKVxyXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVjb2RlZCBzbyBmYXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZS5pbnN0YW5jZSkpO1xyXG4gKiB9XHJcbiAqL1xyXG51dGlsLlByb3RvY29sRXJyb3IgPSBuZXdFcnJvcihcIlByb3RvY29sRXJyb3JcIik7XHJcblxyXG4vKipcclxuICogU28gZmFyIGRlY29kZWQgbWVzc2FnZSBpbnN0YW5jZS5cclxuICogQG5hbWUgdXRpbC5Qcm90b2NvbEVycm9yI2luc3RhbmNlXHJcbiAqIEB0eXBlIHtNZXNzYWdlPFQ+fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIE9uZU9mIGdldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZkdldHRlcn0uXHJcbiAqIEB0eXBlZGVmIE9uZU9mR2V0dGVyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcclxuICovXHJcblxyXG4vKipcclxuICogQnVpbGRzIGEgZ2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXHJcbiAqIEByZXR1cm5zIHtPbmVPZkdldHRlcn0gVW5ib3VuZCBnZXR0ZXJcclxuICovXHJcbnV0aWwub25lT2ZHZXR0ZXIgPSBmdW5jdGlvbiBnZXRPbmVPZihmaWVsZE5hbWVzKSB7XHJcbiAgICB2YXIgZmllbGRNYXAgPSB7fTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcclxuICAgICAgICBmaWVsZE1hcFtmaWVsZE5hbWVzW2ldXSA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxyXG4gICAgICogQHRoaXMgT2JqZWN0XHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHJldHVybiBmdW5jdGlvbigpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxyXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKSwgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+IC0xOyAtLWkpXHJcbiAgICAgICAgICAgIGlmIChmaWVsZE1hcFtrZXlzW2ldXSA9PT0gMSAmJiB0aGlzW2tleXNbaV1dICE9PSB1bmRlZmluZWQgJiYgdGhpc1trZXlzW2ldXSAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzW2ldO1xyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIE9uZU9mIHNldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZlNldHRlcn0uXHJcbiAqIEB0eXBlZGVmIE9uZU9mU2V0dGVyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSB2YWx1ZSBGaWVsZCBuYW1lXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkcyBhIHNldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cclxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xyXG4gKiBAcmV0dXJucyB7T25lT2ZTZXR0ZXJ9IFVuYm91bmQgc2V0dGVyXHJcbiAqL1xyXG51dGlsLm9uZU9mU2V0dGVyID0gZnVuY3Rpb24gc2V0T25lT2YoZmllbGROYW1lcykge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRmllbGQgbmFtZVxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqIEB0aGlzIE9iamVjdFxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgaWYgKGZpZWxkTmFtZXNbaV0gIT09IG5hbWUpXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tmaWVsZE5hbWVzW2ldXTtcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogRGVmYXVsdCBjb252ZXJzaW9uIG9wdGlvbnMgdXNlZCBmb3Ige0BsaW5rIE1lc3NhZ2UjdG9KU09OfSBpbXBsZW1lbnRhdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIG9wdGlvbnMgYXJlIGNsb3NlIHRvIHByb3RvMydzIEpTT04gbWFwcGluZyB3aXRoIHRoZSBleGNlcHRpb24gdGhhdCBpbnRlcm5hbCB0eXBlcyBsaWtlIEFueSBhcmUgaGFuZGxlZCBqdXN0IGxpa2UgbWVzc2FnZXMuIE1vcmUgcHJlY2lzZWx5OlxyXG4gKlxyXG4gKiAtIExvbmdzIGJlY29tZSBzdHJpbmdzXHJcbiAqIC0gRW51bXMgYmVjb21lIHN0cmluZyBrZXlzXHJcbiAqIC0gQnl0ZXMgYmVjb21lIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcclxuICogLSAoU3ViLSlNZXNzYWdlcyBiZWNvbWUgcGxhaW4gb2JqZWN0c1xyXG4gKiAtIE1hcHMgYmVjb21lIHBsYWluIG9iamVjdHMgd2l0aCBhbGwgc3RyaW5nIGtleXNcclxuICogLSBSZXBlYXRlZCBmaWVsZHMgYmVjb21lIGFycmF5c1xyXG4gKiAtIE5hTiBhbmQgSW5maW5pdHkgZm9yIGZsb2F0IGFuZCBkb3VibGUgZmllbGRzIGJlY29tZSBzdHJpbmdzXHJcbiAqXHJcbiAqIEB0eXBlIHtJQ29udmVyc2lvbk9wdGlvbnN9XHJcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcHJvdG9jb2wtYnVmZmVycy9kb2NzL3Byb3RvMz9obD1lbiNqc29uXHJcbiAqL1xyXG51dGlsLnRvSlNPTk9wdGlvbnMgPSB7XHJcbiAgICBsb25nczogU3RyaW5nLFxyXG4gICAgZW51bXM6IFN0cmluZyxcclxuICAgIGJ5dGVzOiBTdHJpbmcsXHJcbiAgICBqc29uOiB0cnVlXHJcbn07XHJcblxyXG51dGlsLl9jb25maWd1cmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBCdWZmZXIgPSB1dGlsLkJ1ZmZlcjtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKCFCdWZmZXIpIHtcclxuICAgICAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gYmVjYXVzZSBub2RlIDQueCBidWZmZXJzIGFyZSBpbmNvbXBhdGlibGUgJiBpbW11dGFibGVcclxuICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Rjb2RlSU8vcHJvdG9idWYuanMvcHVsbC82NjVcclxuICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gQnVmZmVyLmZyb20gIT09IFVpbnQ4QXJyYXkuZnJvbSAmJiBCdWZmZXIuZnJvbSB8fFxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2Zyb20odmFsdWUsIGVuY29kaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyKHZhbHVlLCBlbmNvZGluZyk7XHJcbiAgICAgICAgfTtcclxuICAgIHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSB8fFxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2FsbG9jVW5zYWZlKHNpemUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XHJcbiAgICAgICAgfTtcclxufTtcclxuXHJcbn0se1wiMVwiOjEsXCIxMFwiOjEwLFwiMlwiOjIsXCIzOFwiOjM4LFwiNFwiOjQsXCI2XCI6NixcIjdcIjo3LFwiOVwiOjl9XSw0MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHZlcmlmaWVyO1xyXG5cclxudmFyIEVudW0gICAgICA9IHJlcXVpcmUoMTUpLFxyXG4gICAgdXRpbCAgICAgID0gcmVxdWlyZSgzNyk7XHJcblxyXG5mdW5jdGlvbiBpbnZhbGlkKGZpZWxkLCBleHBlY3RlZCkge1xyXG4gICAgcmV0dXJuIGZpZWxkLm5hbWUgKyBcIjogXCIgKyBleHBlY3RlZCArIChmaWVsZC5yZXBlYXRlZCAmJiBleHBlY3RlZCAhPT0gXCJhcnJheVwiID8gXCJbXVwiIDogZmllbGQubWFwICYmIGV4cGVjdGVkICE9PSBcIm9iamVjdFwiID8gXCJ7azpcIitmaWVsZC5rZXlUeXBlK1wifVwiIDogXCJcIikgKyBcIiBleHBlY3RlZFwiO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcGFydGlhbCB2YWx1ZSB2ZXJpZmllci5cclxuICogQHBhcmFtIHtDb2RlZ2VufSBnZW4gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBSZWZsZWN0ZWQgZmllbGRcclxuICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkSW5kZXggRmllbGQgaW5kZXhcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlZiBWYXJpYWJsZSByZWZlcmVuY2VcclxuICogQHJldHVybnMge0NvZGVnZW59IENvZGVnZW4gaW5zdGFuY2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuVmVyaWZ5VmFsdWUoZ2VuLCBmaWVsZCwgZmllbGRJbmRleCwgcmVmKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG4gICAgaWYgKGZpZWxkLnJlc29sdmVkVHlwZSkge1xyXG4gICAgICAgIGlmIChmaWVsZC5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtKSB7IGdlblxyXG4gICAgICAgICAgICAoXCJzd2l0Y2goJXMpe1wiLCByZWYpXHJcbiAgICAgICAgICAgICAgICAoXCJkZWZhdWx0OlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwiZW51bSB2YWx1ZVwiKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhmaWVsZC5yZXNvbHZlZFR5cGUudmFsdWVzKSwgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSBnZW5cclxuICAgICAgICAgICAgICAgIChcImNhc2UgJWk6XCIsIGZpZWxkLnJlc29sdmVkVHlwZS52YWx1ZXNba2V5c1tqXV0pO1xyXG4gICAgICAgICAgICBnZW5cclxuICAgICAgICAgICAgICAgICAgICAoXCJicmVha1wiKVxyXG4gICAgICAgICAgICAoXCJ9XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdlblxyXG4gICAgICAgICAgICAoXCJ7XCIpXHJcbiAgICAgICAgICAgICAgICAoXCJ2YXIgZT10eXBlc1slaV0udmVyaWZ5KCVzKTtcIiwgZmllbGRJbmRleCwgcmVmKVxyXG4gICAgICAgICAgICAgICAgKFwiaWYoZSlcIilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4laitlXCIsIGZpZWxkLm5hbWUgKyBcIi5cIilcclxuICAgICAgICAgICAgKFwifVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW50MzJcIjpcclxuICAgICAgICAgICAgY2FzZSBcInVpbnQzMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ludDMyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmaXhlZDMyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZml4ZWQzMlwiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcImlmKCF1dGlsLmlzSW50ZWdlciglcykpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImludGVnZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbnQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwidWludDY0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaW50NjRcIjpcclxuICAgICAgICAgICAgY2FzZSBcImZpeGVkNjRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNmaXhlZDY0XCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwiaWYoIXV0aWwuaXNJbnRlZ2VyKCVzKSYmISglcyYmdXRpbC5pc0ludGVnZXIoJXMubG93KSYmdXRpbC5pc0ludGVnZXIoJXMuaGlnaCkpKVwiLCByZWYsIHJlZiwgcmVmLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgKFwicmV0dXJuJWpcIiwgaW52YWxpZChmaWVsZCwgXCJpbnRlZ2VyfExvbmdcIikpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmbG9hdFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZG91YmxlXCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwiaWYodHlwZW9mICVzIT09XFxcIm51bWJlclxcXCIpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcIm51bWJlclwiKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJvb2xcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZih0eXBlb2YgJXMhPT1cXFwiYm9vbGVhblxcXCIpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImJvb2xlYW5cIikpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZighdXRpbC5pc1N0cmluZyglcykpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcInN0cmluZ1wiKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ5dGVzXCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwiaWYoISglcyYmdHlwZW9mICVzLmxlbmd0aD09PVxcXCJudW1iZXJcXFwifHx1dGlsLmlzU3RyaW5nKCVzKSkpXCIsIHJlZiwgcmVmLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgKFwicmV0dXJuJWpcIiwgaW52YWxpZChmaWVsZCwgXCJidWZmZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdlbjtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBhcnRpYWwga2V5IHZlcmlmaWVyLlxyXG4gKiBAcGFyYW0ge0NvZGVnZW59IGdlbiBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7RmllbGR9IGZpZWxkIFJlZmxlY3RlZCBmaWVsZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVmIFZhcmlhYmxlIHJlZmVyZW5jZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZW5WZXJpZnlLZXkoZ2VuLCBmaWVsZCwgcmVmKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG4gICAgc3dpdGNoIChmaWVsZC5rZXlUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImludDMyXCI6XHJcbiAgICAgICAgY2FzZSBcInVpbnQzMlwiOlxyXG4gICAgICAgIGNhc2UgXCJzaW50MzJcIjpcclxuICAgICAgICBjYXNlIFwiZml4ZWQzMlwiOlxyXG4gICAgICAgIGNhc2UgXCJzZml4ZWQzMlwiOiBnZW5cclxuICAgICAgICAgICAgKFwiaWYoIXV0aWwua2V5MzJSZS50ZXN0KCVzKSlcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgKFwicmV0dXJuJWpcIiwgaW52YWxpZChmaWVsZCwgXCJpbnRlZ2VyIGtleVwiKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJpbnQ2NFwiOlxyXG4gICAgICAgIGNhc2UgXCJ1aW50NjRcIjpcclxuICAgICAgICBjYXNlIFwic2ludDY0XCI6XHJcbiAgICAgICAgY2FzZSBcImZpeGVkNjRcIjpcclxuICAgICAgICBjYXNlIFwic2ZpeGVkNjRcIjogZ2VuXHJcbiAgICAgICAgICAgIChcImlmKCF1dGlsLmtleTY0UmUudGVzdCglcykpXCIsIHJlZikgLy8gc2VlIGNvbW1lbnQgYWJvdmU6IHggaXMgb2ssIGQgaXMgbm90XHJcbiAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImludGVnZXJ8TG9uZyBrZXlcIikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiYm9vbFwiOiBnZW5cclxuICAgICAgICAgICAgKFwiaWYoIXV0aWwua2V5MlJlLnRlc3QoJXMpKVwiLCByZWYpXHJcbiAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImJvb2xlYW4ga2V5XCIpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2VuO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgdmVyaWZpZXIgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZmllZCBtZXNzYWdlIHR5cGUuXHJcbiAqIEBwYXJhbSB7VHlwZX0gbXR5cGUgTWVzc2FnZSB0eXBlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqL1xyXG5mdW5jdGlvbiB2ZXJpZmllcihtdHlwZSkge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cclxuXHJcbiAgICB2YXIgZ2VuID0gdXRpbC5jb2RlZ2VuKFtcIm1cIl0sIG10eXBlLm5hbWUgKyBcIiR2ZXJpZnlcIilcclxuICAgIChcImlmKHR5cGVvZiBtIT09XFxcIm9iamVjdFxcXCJ8fG09PT1udWxsKVwiKVxyXG4gICAgICAgIChcInJldHVybiVqXCIsIFwib2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgdmFyIG9uZW9mcyA9IG10eXBlLm9uZW9mc0FycmF5LFxyXG4gICAgICAgIHNlZW5GaXJzdEZpZWxkID0ge307XHJcbiAgICBpZiAob25lb2ZzLmxlbmd0aCkgZ2VuXHJcbiAgICAoXCJ2YXIgcD17fVwiKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IC8qIGluaXRpYWxpemVzICovIG10eXBlLmZpZWxkc0FycmF5Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkID0gbXR5cGUuX2ZpZWxkc0FycmF5W2ldLnJlc29sdmUoKSxcclxuICAgICAgICAgICAgcmVmICAgPSBcIm1cIiArIHV0aWwuc2FmZVByb3AoZmllbGQubmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZC5vcHRpb25hbCkgZ2VuXHJcbiAgICAgICAgKFwiaWYoJXMhPW51bGwmJm0uaGFzT3duUHJvcGVydHkoJWopKXtcIiwgcmVmLCBmaWVsZC5uYW1lKTsgLy8gIT09IHVuZGVmaW5lZCAmJiAhPT0gbnVsbFxyXG5cclxuICAgICAgICAvLyBtYXAgZmllbGRzXHJcbiAgICAgICAgaWYgKGZpZWxkLm1hcCkgeyBnZW5cclxuICAgICAgICAgICAgKFwiaWYoIXV0aWwuaXNPYmplY3QoJXMpKVwiLCByZWYpXHJcbiAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcIm9iamVjdFwiKSlcclxuICAgICAgICAgICAgKFwidmFyIGs9T2JqZWN0LmtleXMoJXMpXCIsIHJlZilcclxuICAgICAgICAgICAgKFwiZm9yKHZhciBpPTA7aTxrLmxlbmd0aDsrK2kpe1wiKTtcclxuICAgICAgICAgICAgICAgIGdlblZlcmlmeUtleShnZW4sIGZpZWxkLCBcImtbaV1cIik7XHJcbiAgICAgICAgICAgICAgICBnZW5WZXJpZnlWYWx1ZShnZW4sIGZpZWxkLCBpLCByZWYgKyBcIltrW2ldXVwiKVxyXG4gICAgICAgICAgICAoXCJ9XCIpO1xyXG5cclxuICAgICAgICAvLyByZXBlYXRlZCBmaWVsZHNcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLnJlcGVhdGVkKSB7IGdlblxyXG4gICAgICAgICAgICAoXCJpZighQXJyYXkuaXNBcnJheSglcykpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwiYXJyYXlcIikpXHJcbiAgICAgICAgICAgIChcImZvcih2YXIgaT0wO2k8JXMubGVuZ3RoOysraSl7XCIsIHJlZik7XHJcbiAgICAgICAgICAgICAgICBnZW5WZXJpZnlWYWx1ZShnZW4sIGZpZWxkLCBpLCByZWYgKyBcIltpXVwiKVxyXG4gICAgICAgICAgICAoXCJ9XCIpO1xyXG5cclxuICAgICAgICAvLyByZXF1aXJlZCBvciBwcmVzZW50IGZpZWxkc1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5wYXJ0T2YpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbmVvZlByb3AgPSB1dGlsLnNhZmVQcm9wKGZpZWxkLnBhcnRPZi5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWVuRmlyc3RGaWVsZFtmaWVsZC5wYXJ0T2YubmFtZV0gPT09IDEpIGdlblxyXG4gICAgICAgICAgICAoXCJpZihwJXM9PT0xKVwiLCBvbmVvZlByb3ApXHJcbiAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBmaWVsZC5wYXJ0T2YubmFtZSArIFwiOiBtdWx0aXBsZSB2YWx1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICBzZWVuRmlyc3RGaWVsZFtmaWVsZC5wYXJ0T2YubmFtZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgZ2VuXHJcbiAgICAgICAgICAgIChcInAlcz0xXCIsIG9uZW9mUHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2VuVmVyaWZ5VmFsdWUoZ2VuLCBmaWVsZCwgaSwgcmVmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpZWxkLm9wdGlvbmFsKSBnZW5cclxuICAgICAgICAoXCJ9XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdlblxyXG4gICAgKFwicmV0dXJuIG51bGxcIik7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbn1cclxufSx7XCIxNVwiOjE1LFwiMzdcIjozN31dLDQxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogV3JhcHBlcnMgZm9yIGNvbW1vbiB0eXBlcy5cclxuICogQHR5cGUge09iamVjdC48c3RyaW5nLElXcmFwcGVyPn1cclxuICogQGNvbnN0XHJcbiAqL1xyXG52YXIgd3JhcHBlcnMgPSBleHBvcnRzO1xyXG5cclxudmFyIE1lc3NhZ2UgPSByZXF1aXJlKDIxKTtcclxuXHJcbi8qKlxyXG4gKiBGcm9tIG9iamVjdCBjb252ZXJ0ZXIgcGFydCBvZiBhbiB7QGxpbmsgSVdyYXBwZXJ9LlxyXG4gKiBAdHlwZWRlZiBXcmFwcGVyRnJvbU9iamVjdENvbnZlcnRlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcclxuICogQHJldHVybnMge01lc3NhZ2U8e30+fSBNZXNzYWdlIGluc3RhbmNlXHJcbiAqIEB0aGlzIFR5cGVcclxuICovXHJcblxyXG4vKipcclxuICogVG8gb2JqZWN0IGNvbnZlcnRlciBwYXJ0IG9mIGFuIHtAbGluayBJV3JhcHBlcn0uXHJcbiAqIEB0eXBlZGVmIFdyYXBwZXJUb09iamVjdENvbnZlcnRlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7TWVzc2FnZTx7fT59IG1lc3NhZ2UgTWVzc2FnZSBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge0lDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxyXG4gKiBAdGhpcyBUeXBlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbW1vbiB0eXBlIHdyYXBwZXIgcGFydCBvZiB7QGxpbmsgd3JhcHBlcnN9LlxyXG4gKiBAaW50ZXJmYWNlIElXcmFwcGVyXHJcbiAqIEBwcm9wZXJ0eSB7V3JhcHBlckZyb21PYmplY3RDb252ZXJ0ZXJ9IFtmcm9tT2JqZWN0XSBGcm9tIG9iamVjdCBjb252ZXJ0ZXJcclxuICogQHByb3BlcnR5IHtXcmFwcGVyVG9PYmplY3RDb252ZXJ0ZXJ9IFt0b09iamVjdF0gVG8gb2JqZWN0IGNvbnZlcnRlclxyXG4gKi9cclxuXHJcbi8vIEN1c3RvbSB3cmFwcGVyIGZvciBBbnlcclxud3JhcHBlcnNbXCIuZ29vZ2xlLnByb3RvYnVmLkFueVwiXSA9IHtcclxuXHJcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbihvYmplY3QpIHtcclxuXHJcbiAgICAgICAgLy8gdW53cmFwIHZhbHVlIHR5cGUgaWYgbWFwcGVkXHJcbiAgICAgICAgaWYgKG9iamVjdCAmJiBvYmplY3RbXCJAdHlwZVwiXSkge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMubG9va3VwKG9iamVjdFtcIkB0eXBlXCJdKTtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHR5cGVfdXJsIGRvZXMgbm90IGFjY2VwdCBsZWFkaW5nIFwiLlwiXHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZV91cmwgPSBvYmplY3RbXCJAdHlwZVwiXS5jaGFyQXQoMCkgPT09IFwiLlwiID9cclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RbXCJAdHlwZVwiXS5zdWJzdHIoMSkgOiBvYmplY3RbXCJAdHlwZVwiXTtcclxuICAgICAgICAgICAgICAgIC8vIHR5cGVfdXJsIHByZWZpeCBpcyBvcHRpb25hbCwgYnV0IHBhdGggc2VwZXJhdG9yIGlzIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVfdXJsOiBcIi9cIiArIHR5cGVfdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0eXBlLmVuY29kZSh0eXBlLmZyb21PYmplY3Qob2JqZWN0KSkuZmluaXNoKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mcm9tT2JqZWN0KG9iamVjdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIC8vIGRlY29kZSB2YWx1ZSBpZiByZXF1ZXN0ZWQgYW5kIHVubWFwcGVkXHJcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5qc29uICYmIG1lc3NhZ2UudHlwZV91cmwgJiYgbWVzc2FnZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBPbmx5IHVzZSBmdWxseSBxdWFsaWZpZWQgdHlwZSBuYW1lIGFmdGVyIHRoZSBsYXN0ICcvJ1xyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1lc3NhZ2UudHlwZV91cmwuc3Vic3RyaW5nKG1lc3NhZ2UudHlwZV91cmwubGFzdEluZGV4T2YoXCIvXCIpICsgMSk7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gdGhpcy5sb29rdXAobmFtZSk7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgIGlmICh0eXBlKVxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHR5cGUuZGVjb2RlKG1lc3NhZ2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd3JhcCB2YWx1ZSBpZiB1bm1hcHBlZFxyXG4gICAgICAgIGlmICghKG1lc3NhZ2UgaW5zdGFuY2VvZiB0aGlzLmN0b3IpICYmIG1lc3NhZ2UgaW5zdGFuY2VvZiBNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBtZXNzYWdlLiR0eXBlLnRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvYmplY3RbXCJAdHlwZVwiXSA9IG1lc3NhZ2UuJHR5cGUuZnVsbE5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy50b09iamVjdChtZXNzYWdlLCBvcHRpb25zKTtcclxuICAgIH1cclxufTtcclxuXHJcbn0se1wiMjFcIjoyMX1dLDQyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gV3JpdGVyO1xyXG5cclxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoMzkpO1xyXG5cclxudmFyIEJ1ZmZlcldyaXRlcjsgLy8gY3ljbGljXHJcblxyXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcclxuICAgIGJhc2U2NCAgICA9IHV0aWwuYmFzZTY0LFxyXG4gICAgdXRmOCAgICAgID0gdXRpbC51dGY4O1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIG9wZXJhdGlvbiBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgd3JpdGVyIG9wZXJhdGlvbi5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgVWludDhBcnJheSwgbnVtYmVyKX0gZm4gRnVuY3Rpb24gdG8gY2FsbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXHJcbiAqIEBwYXJhbSB7Kn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIE9wKGZuLCBsZW4sIHZhbCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gY2FsbC5cclxuICAgICAqIEB0eXBlIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZuID0gZm47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWx1ZSBieXRlIGxlbmd0aC5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV4dCBvcGVyYXRpb24uXHJcbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsdWUgdG8gd3JpdGUuXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqL1xyXG4gICAgdGhpcy52YWwgPSB2YWw7IC8vIHR5cGUgdmFyaWVzXHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmZ1bmN0aW9uIG5vb3AoKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgc3RhdGUgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQ29waWVkIHdyaXRlciBzdGF0ZS5cclxuICogQG1lbWJlcm9mIFdyaXRlclxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtXcml0ZXJ9IHdyaXRlciBXcml0ZXIgdG8gY29weSBzdGF0ZSBmcm9tXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIFN0YXRlKHdyaXRlcikge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBoZWFkLlxyXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5oZWFkID0gd3JpdGVyLmhlYWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IHRhaWwuXHJcbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhaWwgPSB3cml0ZXIudGFpbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgYnVmZmVyIGxlbmd0aC5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubGVuID0gd3JpdGVyLmxlbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5leHQgc3RhdGUuXHJcbiAgICAgKiBAdHlwZSB7U3RhdGV8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5uZXh0ID0gd3JpdGVyLnN0YXRlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBXcml0ZXIoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IGxlbmd0aC5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubGVuID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZXJhdGlvbnMgaGVhZC5cclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaGVhZCA9IG5ldyBPcChub29wLCAwLCAwKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZXJhdGlvbnMgdGFpbFxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWlsID0gdGhpcy5oZWFkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGlua2VkIGZvcmtlZCBzdGF0ZXMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcclxuXHJcbiAgICAvLyBXaGVuIGEgdmFsdWUgaXMgd3JpdHRlbiwgdGhlIHdyaXRlciBjYWxjdWxhdGVzIGl0cyBieXRlIGxlbmd0aCBhbmQgcHV0cyBpdCBpbnRvIGEgbGlua2VkXHJcbiAgICAvLyBsaXN0IG9mIG9wZXJhdGlvbnMgdG8gcGVyZm9ybSB3aGVuIGZpbmlzaCgpIGlzIGNhbGxlZC4gVGhpcyBib3RoIGFsbG93cyB1cyB0byBhbGxvY2F0ZVxyXG4gICAgLy8gYnVmZmVycyBvZiB0aGUgZXhhY3QgcmVxdWlyZWQgc2l6ZSBhbmQgcmVkdWNlcyB0aGUgYW1vdW50IG9mIHdvcmsgd2UgaGF2ZSB0byBkbyBjb21wYXJlZFxyXG4gICAgLy8gdG8gZmlyc3QgY2FsY3VsYXRpbmcgb3ZlciBvYmplY3RzIGFuZCB0aGVuIGVuY29kaW5nIG92ZXIgb2JqZWN0cy4gSW4gb3VyIGNhc2UsIHRoZSBlbmNvZGluZ1xyXG4gICAgLy8gcGFydCBpcyBqdXN0IGEgbGlua2VkIGxpc3Qgd2FsayBjYWxsaW5nIG9wZXJhdGlvbnMgd2l0aCBhbHJlYWR5IHByZXBhcmVkIHZhbHVlcy5cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgd3JpdGVyLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge0J1ZmZlcldyaXRlcnxXcml0ZXJ9IEEge0BsaW5rIEJ1ZmZlcldyaXRlcn0gd2hlbiBCdWZmZXJzIGFyZSBzdXBwb3J0ZWQsIG90aGVyd2lzZSBhIHtAbGluayBXcml0ZXJ9XHJcbiAqL1xyXG5Xcml0ZXIuY3JlYXRlID0gdXRpbC5CdWZmZXJcclxuICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cCgpIHtcclxuICAgICAgICByZXR1cm4gKFdyaXRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcldyaXRlcigpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoKTtcclxuICAgIH07XHJcblxyXG4vKipcclxuICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxyXG4gKi9cclxuV3JpdGVyLmFsbG9jID0gZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xyXG4gICAgcmV0dXJuIG5ldyB1dGlsLkFycmF5KHNpemUpO1xyXG59O1xyXG5cclxuLy8gVXNlIFVpbnQ4QXJyYXkgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXIsIGp1c3QgbGlrZSBub2RlIGRvZXMgd2l0aCBidWZmZXJzXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbmlmICh1dGlsLkFycmF5ICE9PSBBcnJheSlcclxuICAgIFdyaXRlci5hbGxvYyA9IHV0aWwucG9vbChXcml0ZXIuYWxsb2MsIHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5KTtcclxuXHJcbi8qKlxyXG4gKiBQdXNoZXMgYSBuZXcgb3BlcmF0aW9uIHRvIHRoZSBxdWV1ZS5cclxuICogQHBhcmFtIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfSBmbiBGdW5jdGlvbiB0byBjYWxsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICogQHByaXZhdGVcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuX3B1c2ggPSBmdW5jdGlvbiBwdXNoKGZuLCBsZW4sIHZhbCkge1xyXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgT3AoZm4sIGxlbiwgdmFsKTtcclxuICAgIHRoaXMubGVuICs9IGxlbjtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gd3JpdGVCeXRlKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3NdID0gdmFsICYgMjU1O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZVZhcmludDMyKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIHdoaWxlICh2YWwgPiAxMjcpIHtcclxuICAgICAgICBidWZbcG9zKytdID0gdmFsICYgMTI3IHwgMTI4O1xyXG4gICAgICAgIHZhbCA+Pj49IDc7XHJcbiAgICB9XHJcbiAgICBidWZbcG9zXSA9IHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgdmFyaW50IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgU2NoZWR1bGVkIHZhcmludCB3cml0ZXIgb3BlcmF0aW9uLlxyXG4gKiBAZXh0ZW5kcyBPcFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIFZhcmludE9wKGxlbiwgdmFsKSB7XHJcbiAgICB0aGlzLmxlbiA9IGxlbjtcclxuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMudmFsID0gdmFsO1xyXG59XHJcblxyXG5WYXJpbnRPcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSk7XHJcblZhcmludE9wLnByb3RvdHlwZS5mbiA9IHdyaXRlVmFyaW50MzI7XHJcblxyXG4vKipcclxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS51aW50MzIgPSBmdW5jdGlvbiB3cml0ZV91aW50MzIodmFsdWUpIHtcclxuICAgIC8vIGhlcmUsIHRoZSBjYWxsIHRvIHRoaXMucHVzaCBoYXMgYmVlbiBpbmxpbmVkIGFuZCBhIHZhcmludCBzcGVjaWZpYyBPcCBzdWJjbGFzcyBpcyB1c2VkLlxyXG4gICAgLy8gdWludDMyIGlzIGJ5IGZhciB0aGUgbW9zdCBmcmVxdWVudGx5IHVzZWQgb3BlcmF0aW9uIGFuZCBiZW5lZml0cyBzaWduaWZpY2FudGx5IGZyb20gdGhpcy5cclxuICAgIHRoaXMubGVuICs9ICh0aGlzLnRhaWwgPSB0aGlzLnRhaWwubmV4dCA9IG5ldyBWYXJpbnRPcChcclxuICAgICAgICAodmFsdWUgPSB2YWx1ZSA+Pj4gMClcclxuICAgICAgICAgICAgICAgIDwgMTI4ICAgICAgID8gMVxyXG4gICAgICAgIDogdmFsdWUgPCAxNjM4NCAgICAgPyAyXHJcbiAgICAgICAgOiB2YWx1ZSA8IDIwOTcxNTIgICA/IDNcclxuICAgICAgICA6IHZhbHVlIDwgMjY4NDM1NDU2ID8gNFxyXG4gICAgICAgIDogICAgICAgICAgICAgICAgICAgICA1LFxyXG4gICAgdmFsdWUpKS5sZW47XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzaWduZWQgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ludDMyKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgPCAwXHJcbiAgICAgICAgPyB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIDEwLCBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKSkgLy8gMTAgYnl0ZXMgcGVyIHNwZWNcclxuICAgICAgICA6IHRoaXMudWludDMyKHZhbHVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQsIHppZy16YWcgZW5jb2RlZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9zaW50MzIodmFsdWUpIHtcclxuICAgIHJldHVybiB0aGlzLnVpbnQzMigodmFsdWUgPDwgMSBeIHZhbHVlID4+IDMxKSA+Pj4gMCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB3cml0ZVZhcmludDY0KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIHdoaWxlICh2YWwuaGkpIHtcclxuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xyXG4gICAgICAgIHZhbC5sbyA9ICh2YWwubG8gPj4+IDcgfCB2YWwuaGkgPDwgMjUpID4+PiAwO1xyXG4gICAgICAgIHZhbC5oaSA+Pj49IDc7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAodmFsLmxvID4gMTI3KSB7XHJcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbC5sbyAmIDEyNyB8IDEyODtcclxuICAgICAgICB2YWwubG8gPSB2YWwubG8gPj4+IDc7XHJcbiAgICB9XHJcbiAgICBidWZbcG9zKytdID0gdmFsLmxvO1xyXG59XHJcblxyXG4vKipcclxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cclxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS51aW50NjQgPSBmdW5jdGlvbiB3cml0ZV91aW50NjQodmFsdWUpIHtcclxuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XHJcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCBiaXRzLmxlbmd0aCgpLCBiaXRzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5pbnQ2NCA9IFdyaXRlci5wcm90b3R5cGUudWludDY0O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQsIHppZy16YWcgZW5jb2RlZC5cclxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5zaW50NjQgPSBmdW5jdGlvbiB3cml0ZV9zaW50NjQodmFsdWUpIHtcclxuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSkuenpFbmNvZGUoKTtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIGJvb2xpc2ggdmFsdWUgYXMgYSB2YXJpbnQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiB3cml0ZV9ib29sKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIHZhbHVlID8gMSA6IDApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gd3JpdGVGaXhlZDMyKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xyXG59XHJcblxyXG4vKipcclxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBmaXhlZCAzMiBiaXRzLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDMyKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIHZhbHVlID4+PiAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDMyID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDMyO1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cclxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0ID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQ2NCh2YWx1ZSkge1xyXG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgYml0cy5sbykuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmhpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDY0ID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIGZsb2F0ICgzMiBiaXQpLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5mbG9hdCA9IGZ1bmN0aW9uIHdyaXRlX2Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRmxvYXRMRSwgNCwgdmFsdWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gd3JpdGVfZG91YmxlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRG91YmxlTEUsIDgsIHZhbHVlKTtcclxufTtcclxuXHJcbnZhciB3cml0ZUJ5dGVzID0gdXRpbC5BcnJheS5wcm90b3R5cGUuc2V0XHJcbiAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfc2V0KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXHJcbiAgICB9XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzX2Zvcih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyBpXSA9IHZhbFtpXTtcclxuICAgIH07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheXxzdHJpbmd9IHZhbHVlIEJ1ZmZlciBvciBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXModmFsdWUpIHtcclxuICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGggPj4+IDA7XHJcbiAgICBpZiAoIWxlbilcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xyXG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKSB7XHJcbiAgICAgICAgdmFyIGJ1ZiA9IFdyaXRlci5hbGxvYyhsZW4gPSBiYXNlNjQubGVuZ3RoKHZhbHVlKSk7XHJcbiAgICAgICAgYmFzZTY0LmRlY29kZSh2YWx1ZSwgYnVmLCAwKTtcclxuICAgICAgICB2YWx1ZSA9IGJ1ZjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHdyaXRlQnl0ZXMsIGxlbiwgdmFsdWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHN0cmluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmcodmFsdWUpIHtcclxuICAgIHZhciBsZW4gPSB1dGY4Lmxlbmd0aCh2YWx1ZSk7XHJcbiAgICByZXR1cm4gbGVuXHJcbiAgICAgICAgPyB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHV0Zjgud3JpdGUsIGxlbiwgdmFsdWUpXHJcbiAgICAgICAgOiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRm9ya3MgdGhpcyB3cml0ZXIncyBzdGF0ZSBieSBwdXNoaW5nIGl0IHRvIGEgc3RhY2suXHJcbiAqIENhbGxpbmcge0BsaW5rIFdyaXRlciNyZXNldHxyZXNldH0gb3Ige0BsaW5rIFdyaXRlciNsZGVsaW18bGRlbGltfSByZXNldHMgdGhlIHdyaXRlciB0byB0aGUgcHJldmlvdXMgc3RhdGUuXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5mb3JrID0gZnVuY3Rpb24gZm9yaygpIHtcclxuICAgIHRoaXMuc3RhdGVzID0gbmV3IFN0YXRlKHRoaXMpO1xyXG4gICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xyXG4gICAgdGhpcy5sZW4gPSAwO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzZXRzIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGxhc3Qgc3RhdGUuXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkICAgPSB0aGlzLnN0YXRlcy5oZWFkO1xyXG4gICAgICAgIHRoaXMudGFpbCAgID0gdGhpcy5zdGF0ZXMudGFpbDtcclxuICAgICAgICB0aGlzLmxlbiAgICA9IHRoaXMuc3RhdGVzLmxlbjtcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLm5leHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmxlbiAgPSAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzZXRzIHRvIHRoZSBsYXN0IHN0YXRlIGFuZCBhcHBlbmRzIHRoZSBmb3JrIHN0YXRlJ3MgY3VycmVudCB3cml0ZSBsZW5ndGggYXMgYSB2YXJpbnQgZm9sbG93ZWQgYnkgaXRzIG9wZXJhdGlvbnMuXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5sZGVsaW0gPSBmdW5jdGlvbiBsZGVsaW0oKSB7XHJcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZCxcclxuICAgICAgICB0YWlsID0gdGhpcy50YWlsLFxyXG4gICAgICAgIGxlbiAgPSB0aGlzLmxlbjtcclxuICAgIHRoaXMucmVzZXQoKS51aW50MzIobGVuKTtcclxuICAgIGlmIChsZW4pIHtcclxuICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGhlYWQubmV4dDsgLy8gc2tpcCBub29wXHJcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcclxuICAgICAgICB0aGlzLmxlbiArPSBsZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gRmluaXNoZWQgYnVmZmVyXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcclxuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLm5leHQsIC8vIHNraXAgbm9vcFxyXG4gICAgICAgIGJ1ZiAgPSB0aGlzLmNvbnN0cnVjdG9yLmFsbG9jKHRoaXMubGVuKSxcclxuICAgICAgICBwb3MgID0gMDtcclxuICAgIHdoaWxlIChoZWFkKSB7XHJcbiAgICAgICAgaGVhZC5mbihoZWFkLnZhbCwgYnVmLCBwb3MpO1xyXG4gICAgICAgIHBvcyArPSBoZWFkLmxlbjtcclxuICAgICAgICBoZWFkID0gaGVhZC5uZXh0O1xyXG4gICAgfVxyXG4gICAgLy8gdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcclxuICAgIHJldHVybiBidWY7XHJcbn07XHJcblxyXG5Xcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKEJ1ZmZlcldyaXRlcl8pIHtcclxuICAgIEJ1ZmZlcldyaXRlciA9IEJ1ZmZlcldyaXRlcl87XHJcbn07XHJcblxyXG59LHtcIjM5XCI6Mzl9XSw0MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcldyaXRlcjtcclxuXHJcbi8vIGV4dGVuZHMgV3JpdGVyXHJcbnZhciBXcml0ZXIgPSByZXF1aXJlKDQyKTtcclxuKEJ1ZmZlcldyaXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFdyaXRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlcldyaXRlcjtcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgzOSk7XHJcblxyXG52YXIgQnVmZmVyID0gdXRpbC5CdWZmZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgd3JpdGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXHJcbiAqIEBleHRlbmRzIFdyaXRlclxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEJ1ZmZlcldyaXRlcigpIHtcclxuICAgIFdyaXRlci5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcclxuICogQHJldHVybnMge0J1ZmZlcn0gQnVmZmVyXHJcbiAqL1xyXG5CdWZmZXJXcml0ZXIuYWxsb2MgPSBmdW5jdGlvbiBhbGxvY19idWZmZXIoc2l6ZSkge1xyXG4gICAgcmV0dXJuIChCdWZmZXJXcml0ZXIuYWxsb2MgPSB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUpKHNpemUpO1xyXG59O1xyXG5cclxudmFyIHdyaXRlQnl0ZXNCdWZmZXIgPSBCdWZmZXIgJiYgQnVmZmVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgJiYgQnVmZmVyLnByb3RvdHlwZS5zZXQubmFtZSA9PT0gXCJzZXRcIlxyXG4gICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgYnVmLnNldCh2YWwsIHBvcyk7IC8vIGZhc3RlciB0aGFuIGNvcHkgKHJlcXVpcmVzIG5vZGUgPj0gNCB3aGVyZSBCdWZmZXJzIGV4dGVuZCBVaW50OEFycmF5IGFuZCBzZXQgaXMgcHJvcGVybHkgaW5oZXJpdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcclxuICAgIH1cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfY29weSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgaWYgKHZhbC5jb3B5KSAvLyBCdWZmZXIgdmFsdWVzXHJcbiAgICAgICAgICAgIHZhbC5jb3B5KGJ1ZiwgcG9zLCAwLCB2YWwubGVuZ3RoKTtcclxuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDspIC8vIHBsYWluIGFycmF5IHZhbHVlc1xyXG4gICAgICAgICAgICBidWZbcG9zKytdID0gdmFsW2krK107XHJcbiAgICB9O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzX2J1ZmZlcih2YWx1ZSkge1xyXG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKVxyXG4gICAgICAgIHZhbHVlID0gdXRpbC5fQnVmZmVyX2Zyb20odmFsdWUsIFwiYmFzZTY0XCIpO1xyXG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcclxuICAgIHRoaXMudWludDMyKGxlbik7XHJcbiAgICBpZiAobGVuKVxyXG4gICAgICAgIHRoaXMuX3B1c2god3JpdGVCeXRlc0J1ZmZlciwgbGVuLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbmZ1bmN0aW9uIHdyaXRlU3RyaW5nQnVmZmVyKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGlmICh2YWwubGVuZ3RoIDwgNDApIC8vIHBsYWluIGpzIGlzIGZhc3RlciBmb3Igc2hvcnQgc3RyaW5ncyAocHJvYmFibHkgZHVlIHRvIHJlZHVuZGFudCBhc3NlcnRpb25zKVxyXG4gICAgICAgIHV0aWwudXRmOC53cml0ZSh2YWwsIGJ1ZiwgcG9zKTtcclxuICAgIGVsc2VcclxuICAgICAgICBidWYudXRmOFdyaXRlKHZhbCwgcG9zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmdfYnVmZmVyKHZhbHVlKSB7XHJcbiAgICB2YXIgbGVuID0gQnVmZmVyLmJ5dGVMZW5ndGgodmFsdWUpO1xyXG4gICAgdGhpcy51aW50MzIobGVuKTtcclxuICAgIGlmIChsZW4pXHJcbiAgICAgICAgdGhpcy5fcHVzaCh3cml0ZVN0cmluZ0J1ZmZlciwgbGVuLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRmluaXNoZXMgdGhlIHdyaXRlIG9wZXJhdGlvbi5cclxuICogQG5hbWUgQnVmZmVyV3JpdGVyI2ZpbmlzaFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge0J1ZmZlcn0gRmluaXNoZWQgYnVmZmVyXHJcbiAqL1xyXG5cclxufSx7XCIzOVwiOjM5LFwiNDJcIjo0Mn1dfSx7fSxbMTldKVxyXG5cclxufSkodHlwZW9mIHdpbmRvdz09PVwib2JqZWN0XCImJndpbmRvd3x8dHlwZW9mIHNlbGY9PT1cIm9iamVjdFwiJiZzZWxmfHx0aGlzKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvdG9idWYuanMubWFwXHJcbiJdfQ==