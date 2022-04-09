
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/acdata1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '059c9En5zlCdYDuYpxXoxZF', 'acdata1');
// scripts/acdata1.js

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("./protobuf.js"); // Common aliases


var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util; // Exported root namespace

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.AcWar = function () {
  /**
   * Namespace AcWar.
   * @exports AcWar
   * @namespace
   */
  var AcWar = {};

  AcWar.Agent = function () {
    /**
     * Properties of an Agent.
     * @memberof AcWar
     * @interface IAgent
     * @property {string} agentType Agent agentType
     * @property {number} mpx Agent mpx
     * @property {number} mpy Agent mpy
     * @property {number} life Agent life
     * @property {boolean} groupKill Agent groupKill
     * @property {boolean} isHero Agent isHero
     * @property {number} rot Agent rot
     * @property {number} attackDura Agent attackDura
     * @property {string} aid Agent aid
     * @property {string} innerId Agent innerId
     * @property {string} role Agent role
     * @property {number} objectId Agent objectId
     * @property {string} actType Agent actType
     * @property {number} size Agent size
     * @property {number} level Agent level
     * @property {number|null} [epx] Agent epx
     * @property {number|null} [epy] Agent epy
     * @property {string|null} [eid] Agent eid
     * @property {number|null} [esize] Agent esize
     * @property {number|null} [tpx] Agent tpx
     * @property {number|null} [tpy] Agent tpy
     * @property {string|null} [updown] Agent updown
     */

    /**
     * Constructs a new Agent.
     * @memberof AcWar
     * @classdesc Represents an Agent.
     * @implements IAgent
     * @constructor
     * @param {AcWar.IAgent=} [properties] Properties to set
     */
    function Agent(properties) {
      if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
      }
    }
    /**
     * Agent agentType.
     * @member {string} agentType
     * @memberof AcWar.Agent
     * @instance
     */


    Agent.prototype.agentType = "";
    /**
     * Agent mpx.
     * @member {number} mpx
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.mpx = 0;
    /**
     * Agent mpy.
     * @member {number} mpy
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.mpy = 0;
    /**
     * Agent life.
     * @member {number} life
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.life = 0;
    /**
     * Agent groupKill.
     * @member {boolean} groupKill
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.groupKill = false;
    /**
     * Agent isHero.
     * @member {boolean} isHero
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.isHero = false;
    /**
     * Agent rot.
     * @member {number} rot
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.rot = 0;
    /**
     * Agent attackDura.
     * @member {number} attackDura
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.attackDura = 0;
    /**
     * Agent aid.
     * @member {string} aid
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.aid = "";
    /**
     * Agent innerId.
     * @member {string} innerId
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.innerId = "";
    /**
     * Agent role.
     * @member {string} role
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.role = "";
    /**
     * Agent objectId.
     * @member {number} objectId
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.objectId = 0;
    /**
     * Agent actType.
     * @member {string} actType
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.actType = "";
    /**
     * Agent size.
     * @member {number} size
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.size = 0;
    /**
     * Agent level.
     * @member {number} level
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.level = 0;
    /**
     * Agent epx.
     * @member {number} epx
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.epx = 0;
    /**
     * Agent epy.
     * @member {number} epy
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.epy = 0;
    /**
     * Agent eid.
     * @member {string} eid
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.eid = "";
    /**
     * Agent esize.
     * @member {number} esize
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.esize = 0;
    /**
     * Agent tpx.
     * @member {number} tpx
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.tpx = 0;
    /**
     * Agent tpy.
     * @member {number} tpy
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.tpy = 0;
    /**
     * Agent updown.
     * @member {string} updown
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.updown = "";
    /**
     * Creates a new Agent instance using the specified properties.
     * @function create
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.IAgent=} [properties] Properties to set
     * @returns {AcWar.Agent} Agent instance
     */

    Agent.create = function create(properties) {
      return new Agent(properties);
    };
    /**
     * Encodes the specified Agent message. Does not implicitly {@link AcWar.Agent.verify|verify} messages.
     * @function encode
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.IAgent} message Agent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Agent.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      writer.uint32(
      /* id 1, wireType 2 =*/
      10).string(message.agentType);
      writer.uint32(
      /* id 2, wireType 5 =*/
      21)["float"](message.mpx);
      writer.uint32(
      /* id 3, wireType 5 =*/
      29)["float"](message.mpy);
      writer.uint32(
      /* id 4, wireType 0 =*/
      32).int32(message.life);
      writer.uint32(
      /* id 5, wireType 0 =*/
      40).bool(message.groupKill);
      writer.uint32(
      /* id 6, wireType 0 =*/
      48).bool(message.isHero);
      writer.uint32(
      /* id 7, wireType 5 =*/
      61)["float"](message.rot);
      writer.uint32(
      /* id 8, wireType 5 =*/
      69)["float"](message.attackDura);
      writer.uint32(
      /* id 9, wireType 2 =*/
      74).string(message.aid);
      writer.uint32(
      /* id 10, wireType 2 =*/
      82).string(message.innerId);
      writer.uint32(
      /* id 11, wireType 2 =*/
      90).string(message.role);
      writer.uint32(
      /* id 12, wireType 0 =*/
      96).int32(message.objectId);
      writer.uint32(
      /* id 13, wireType 2 =*/
      106).string(message.actType);
      writer.uint32(
      /* id 14, wireType 5 =*/
      117)["float"](message.size);
      writer.uint32(
      /* id 15, wireType 0 =*/
      120).int32(message.level);
      if (message.epx != null && Object.hasOwnProperty.call(message, "epx")) writer.uint32(
      /* id 16, wireType 5 =*/
      133)["float"](message.epx);
      if (message.epy != null && Object.hasOwnProperty.call(message, "epy")) writer.uint32(
      /* id 17, wireType 5 =*/
      141)["float"](message.epy);
      if (message.eid != null && Object.hasOwnProperty.call(message, "eid")) writer.uint32(
      /* id 18, wireType 2 =*/
      146).string(message.eid);
      if (message.esize != null && Object.hasOwnProperty.call(message, "esize")) writer.uint32(
      /* id 19, wireType 5 =*/
      157)["float"](message.esize);
      if (message.tpx != null && Object.hasOwnProperty.call(message, "tpx")) writer.uint32(
      /* id 20, wireType 5 =*/
      165)["float"](message.tpx);
      if (message.tpy != null && Object.hasOwnProperty.call(message, "tpy")) writer.uint32(
      /* id 21, wireType 5 =*/
      173)["float"](message.tpy);
      if (message.updown != null && Object.hasOwnProperty.call(message, "updown")) writer.uint32(
      /* id 22, wireType 2 =*/
      178).string(message.updown);
      return writer;
    };
    /**
     * Encodes the specified Agent message, length delimited. Does not implicitly {@link AcWar.Agent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.IAgent} message Agent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Agent.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    /**
     * Decodes an Agent message from the specified reader or buffer.
     * @function decode
     * @memberof AcWar.Agent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AcWar.Agent} Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Agent.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.AcWar.Agent();

      while (reader.pos < end) {
        var tag = reader.uint32();

        switch (tag >>> 3) {
          case 1:
            message.agentType = reader.string();
            break;

          case 2:
            message.mpx = reader["float"]();
            break;

          case 3:
            message.mpy = reader["float"]();
            break;

          case 4:
            message.life = reader.int32();
            break;

          case 5:
            message.groupKill = reader.bool();
            break;

          case 6:
            message.isHero = reader.bool();
            break;

          case 7:
            message.rot = reader["float"]();
            break;

          case 8:
            message.attackDura = reader["float"]();
            break;

          case 9:
            message.aid = reader.string();
            break;

          case 10:
            message.innerId = reader.string();
            break;

          case 11:
            message.role = reader.string();
            break;

          case 12:
            message.objectId = reader.int32();
            break;

          case 13:
            message.actType = reader.string();
            break;

          case 14:
            message.size = reader["float"]();
            break;

          case 15:
            message.level = reader.int32();
            break;

          case 16:
            message.epx = reader["float"]();
            break;

          case 17:
            message.epy = reader["float"]();
            break;

          case 18:
            message.eid = reader.string();
            break;

          case 19:
            message.esize = reader["float"]();
            break;

          case 20:
            message.tpx = reader["float"]();
            break;

          case 21:
            message.tpy = reader["float"]();
            break;

          case 22:
            message.updown = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      if (!message.hasOwnProperty("agentType")) throw $util.ProtocolError("missing required 'agentType'", {
        instance: message
      });
      if (!message.hasOwnProperty("mpx")) throw $util.ProtocolError("missing required 'mpx'", {
        instance: message
      });
      if (!message.hasOwnProperty("mpy")) throw $util.ProtocolError("missing required 'mpy'", {
        instance: message
      });
      if (!message.hasOwnProperty("life")) throw $util.ProtocolError("missing required 'life'", {
        instance: message
      });
      if (!message.hasOwnProperty("groupKill")) throw $util.ProtocolError("missing required 'groupKill'", {
        instance: message
      });
      if (!message.hasOwnProperty("isHero")) throw $util.ProtocolError("missing required 'isHero'", {
        instance: message
      });
      if (!message.hasOwnProperty("rot")) throw $util.ProtocolError("missing required 'rot'", {
        instance: message
      });
      if (!message.hasOwnProperty("attackDura")) throw $util.ProtocolError("missing required 'attackDura'", {
        instance: message
      });
      if (!message.hasOwnProperty("aid")) throw $util.ProtocolError("missing required 'aid'", {
        instance: message
      });
      if (!message.hasOwnProperty("innerId")) throw $util.ProtocolError("missing required 'innerId'", {
        instance: message
      });
      if (!message.hasOwnProperty("role")) throw $util.ProtocolError("missing required 'role'", {
        instance: message
      });
      if (!message.hasOwnProperty("objectId")) throw $util.ProtocolError("missing required 'objectId'", {
        instance: message
      });
      if (!message.hasOwnProperty("actType")) throw $util.ProtocolError("missing required 'actType'", {
        instance: message
      });
      if (!message.hasOwnProperty("size")) throw $util.ProtocolError("missing required 'size'", {
        instance: message
      });
      if (!message.hasOwnProperty("level")) throw $util.ProtocolError("missing required 'level'", {
        instance: message
      });
      return message;
    };
    /**
     * Decodes an Agent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AcWar.Agent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AcWar.Agent} Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Agent.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    /**
     * Verifies an Agent message.
     * @function verify
     * @memberof AcWar.Agent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */


    Agent.verify = function verify(message) {
      if (typeof message !== "object" || message === null) return "object expected";
      if (!$util.isString(message.agentType)) return "agentType: string expected";
      if (typeof message.mpx !== "number") return "mpx: number expected";
      if (typeof message.mpy !== "number") return "mpy: number expected";
      if (!$util.isInteger(message.life)) return "life: integer expected";
      if (typeof message.groupKill !== "boolean") return "groupKill: boolean expected";
      if (typeof message.isHero !== "boolean") return "isHero: boolean expected";
      if (typeof message.rot !== "number") return "rot: number expected";
      if (typeof message.attackDura !== "number") return "attackDura: number expected";
      if (!$util.isString(message.aid)) return "aid: string expected";
      if (!$util.isString(message.innerId)) return "innerId: string expected";
      if (!$util.isString(message.role)) return "role: string expected";
      if (!$util.isInteger(message.objectId)) return "objectId: integer expected";
      if (!$util.isString(message.actType)) return "actType: string expected";
      if (typeof message.size !== "number") return "size: number expected";
      if (!$util.isInteger(message.level)) return "level: integer expected";
      if (message.epx != null && message.hasOwnProperty("epx")) if (typeof message.epx !== "number") return "epx: number expected";
      if (message.epy != null && message.hasOwnProperty("epy")) if (typeof message.epy !== "number") return "epy: number expected";
      if (message.eid != null && message.hasOwnProperty("eid")) if (!$util.isString(message.eid)) return "eid: string expected";
      if (message.esize != null && message.hasOwnProperty("esize")) if (typeof message.esize !== "number") return "esize: number expected";
      if (message.tpx != null && message.hasOwnProperty("tpx")) if (typeof message.tpx !== "number") return "tpx: number expected";
      if (message.tpy != null && message.hasOwnProperty("tpy")) if (typeof message.tpy !== "number") return "tpy: number expected";
      if (message.updown != null && message.hasOwnProperty("updown")) if (!$util.isString(message.updown)) return "updown: string expected";
      return null;
    };
    /**
     * Creates an Agent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AcWar.Agent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AcWar.Agent} Agent
     */


    Agent.fromObject = function fromObject(object) {
      if (object instanceof $root.AcWar.Agent) return object;
      var message = new $root.AcWar.Agent();
      if (object.agentType != null) message.agentType = String(object.agentType);
      if (object.mpx != null) message.mpx = Number(object.mpx);
      if (object.mpy != null) message.mpy = Number(object.mpy);
      if (object.life != null) message.life = object.life | 0;
      if (object.groupKill != null) message.groupKill = Boolean(object.groupKill);
      if (object.isHero != null) message.isHero = Boolean(object.isHero);
      if (object.rot != null) message.rot = Number(object.rot);
      if (object.attackDura != null) message.attackDura = Number(object.attackDura);
      if (object.aid != null) message.aid = String(object.aid);
      if (object.innerId != null) message.innerId = String(object.innerId);
      if (object.role != null) message.role = String(object.role);
      if (object.objectId != null) message.objectId = object.objectId | 0;
      if (object.actType != null) message.actType = String(object.actType);
      if (object.size != null) message.size = Number(object.size);
      if (object.level != null) message.level = object.level | 0;
      if (object.epx != null) message.epx = Number(object.epx);
      if (object.epy != null) message.epy = Number(object.epy);
      if (object.eid != null) message.eid = String(object.eid);
      if (object.esize != null) message.esize = Number(object.esize);
      if (object.tpx != null) message.tpx = Number(object.tpx);
      if (object.tpy != null) message.tpy = Number(object.tpy);
      if (object.updown != null) message.updown = String(object.updown);
      return message;
    };
    /**
     * Creates a plain object from an Agent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.Agent} message Agent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */


    Agent.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};

      if (options.defaults) {
        object.agentType = "";
        object.mpx = 0;
        object.mpy = 0;
        object.life = 0;
        object.groupKill = false;
        object.isHero = false;
        object.rot = 0;
        object.attackDura = 0;
        object.aid = "";
        object.innerId = "";
        object.role = "";
        object.objectId = 0;
        object.actType = "";
        object.size = 0;
        object.level = 0;
        object.epx = 0;
        object.epy = 0;
        object.eid = "";
        object.esize = 0;
        object.tpx = 0;
        object.tpy = 0;
        object.updown = "";
      }

      if (message.agentType != null && message.hasOwnProperty("agentType")) object.agentType = message.agentType;
      if (message.mpx != null && message.hasOwnProperty("mpx")) object.mpx = options.json && !isFinite(message.mpx) ? String(message.mpx) : message.mpx;
      if (message.mpy != null && message.hasOwnProperty("mpy")) object.mpy = options.json && !isFinite(message.mpy) ? String(message.mpy) : message.mpy;
      if (message.life != null && message.hasOwnProperty("life")) object.life = message.life;
      if (message.groupKill != null && message.hasOwnProperty("groupKill")) object.groupKill = message.groupKill;
      if (message.isHero != null && message.hasOwnProperty("isHero")) object.isHero = message.isHero;
      if (message.rot != null && message.hasOwnProperty("rot")) object.rot = options.json && !isFinite(message.rot) ? String(message.rot) : message.rot;
      if (message.attackDura != null && message.hasOwnProperty("attackDura")) object.attackDura = options.json && !isFinite(message.attackDura) ? String(message.attackDura) : message.attackDura;
      if (message.aid != null && message.hasOwnProperty("aid")) object.aid = message.aid;
      if (message.innerId != null && message.hasOwnProperty("innerId")) object.innerId = message.innerId;
      if (message.role != null && message.hasOwnProperty("role")) object.role = message.role;
      if (message.objectId != null && message.hasOwnProperty("objectId")) object.objectId = message.objectId;
      if (message.actType != null && message.hasOwnProperty("actType")) object.actType = message.actType;
      if (message.size != null && message.hasOwnProperty("size")) object.size = options.json && !isFinite(message.size) ? String(message.size) : message.size;
      if (message.level != null && message.hasOwnProperty("level")) object.level = message.level;
      if (message.epx != null && message.hasOwnProperty("epx")) object.epx = options.json && !isFinite(message.epx) ? String(message.epx) : message.epx;
      if (message.epy != null && message.hasOwnProperty("epy")) object.epy = options.json && !isFinite(message.epy) ? String(message.epy) : message.epy;
      if (message.eid != null && message.hasOwnProperty("eid")) object.eid = message.eid;
      if (message.esize != null && message.hasOwnProperty("esize")) object.esize = options.json && !isFinite(message.esize) ? String(message.esize) : message.esize;
      if (message.tpx != null && message.hasOwnProperty("tpx")) object.tpx = options.json && !isFinite(message.tpx) ? String(message.tpx) : message.tpx;
      if (message.tpy != null && message.hasOwnProperty("tpy")) object.tpy = options.json && !isFinite(message.tpy) ? String(message.tpy) : message.tpy;
      if (message.updown != null && message.hasOwnProperty("updown")) object.updown = message.updown;
      return object;
    };
    /**
     * Converts this Agent to JSON.
     * @function toJSON
     * @memberof AcWar.Agent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */


    Agent.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Agent;
  }();

  AcWar.Info = function () {
    /**
     * Properties of an Info.
     * @memberof AcWar
     * @interface IInfo
     * @property {Array.<AcWar.IAgent>|null} [base] Info base
     * @property {Array.<AcWar.IAgent>|null} [fort] Info fort
     * @property {Array.<AcWar.IAgent>|null} [agent] Info agent
     * @property {Array.<AcWar.IAgent>|null} [bullet] Info bullet
     * @property {Array.<AcWar.IAgent>|null} [rollLog] Info rollLog
     */

    /**
     * Constructs a new Info.
     * @memberof AcWar
     * @classdesc Represents an Info.
     * @implements IInfo
     * @constructor
     * @param {AcWar.IInfo=} [properties] Properties to set
     */
    function Info(properties) {
      this.base = [];
      this.fort = [];
      this.agent = [];
      this.bullet = [];
      this.rollLog = [];
      if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
      }
    }
    /**
     * Info base.
     * @member {Array.<AcWar.IAgent>} base
     * @memberof AcWar.Info
     * @instance
     */


    Info.prototype.base = $util.emptyArray;
    /**
     * Info fort.
     * @member {Array.<AcWar.IAgent>} fort
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.fort = $util.emptyArray;
    /**
     * Info agent.
     * @member {Array.<AcWar.IAgent>} agent
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.agent = $util.emptyArray;
    /**
     * Info bullet.
     * @member {Array.<AcWar.IAgent>} bullet
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.bullet = $util.emptyArray;
    /**
     * Info rollLog.
     * @member {Array.<AcWar.IAgent>} rollLog
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.rollLog = $util.emptyArray;
    /**
     * Creates a new Info instance using the specified properties.
     * @function create
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.IInfo=} [properties] Properties to set
     * @returns {AcWar.Info} Info instance
     */

    Info.create = function create(properties) {
      return new Info(properties);
    };
    /**
     * Encodes the specified Info message. Does not implicitly {@link AcWar.Info.verify|verify} messages.
     * @function encode
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.IInfo} message Info message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Info.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.base != null && message.base.length) for (var i = 0; i < message.base.length; ++i) {
        $root.AcWar.Agent.encode(message.base[i], writer.uint32(
        /* id 1, wireType 2 =*/
        10).fork()).ldelim();
      }
      if (message.fort != null && message.fort.length) for (var i = 0; i < message.fort.length; ++i) {
        $root.AcWar.Agent.encode(message.fort[i], writer.uint32(
        /* id 2, wireType 2 =*/
        18).fork()).ldelim();
      }
      if (message.agent != null && message.agent.length) for (var i = 0; i < message.agent.length; ++i) {
        $root.AcWar.Agent.encode(message.agent[i], writer.uint32(
        /* id 3, wireType 2 =*/
        26).fork()).ldelim();
      }
      if (message.bullet != null && message.bullet.length) for (var i = 0; i < message.bullet.length; ++i) {
        $root.AcWar.Agent.encode(message.bullet[i], writer.uint32(
        /* id 4, wireType 2 =*/
        34).fork()).ldelim();
      }
      if (message.rollLog != null && message.rollLog.length) for (var i = 0; i < message.rollLog.length; ++i) {
        $root.AcWar.Agent.encode(message.rollLog[i], writer.uint32(
        /* id 5, wireType 2 =*/
        42).fork()).ldelim();
      }
      return writer;
    };
    /**
     * Encodes the specified Info message, length delimited. Does not implicitly {@link AcWar.Info.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.IInfo} message Info message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Info.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    /**
     * Decodes an Info message from the specified reader or buffer.
     * @function decode
     * @memberof AcWar.Info
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AcWar.Info} Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Info.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.AcWar.Info();

      while (reader.pos < end) {
        var tag = reader.uint32();

        switch (tag >>> 3) {
          case 1:
            if (!(message.base && message.base.length)) message.base = [];
            message.base.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 2:
            if (!(message.fort && message.fort.length)) message.fort = [];
            message.fort.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 3:
            if (!(message.agent && message.agent.length)) message.agent = [];
            message.agent.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 4:
            if (!(message.bullet && message.bullet.length)) message.bullet = [];
            message.bullet.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 5:
            if (!(message.rollLog && message.rollLog.length)) message.rollLog = [];
            message.rollLog.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    };
    /**
     * Decodes an Info message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AcWar.Info
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AcWar.Info} Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Info.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    /**
     * Verifies an Info message.
     * @function verify
     * @memberof AcWar.Info
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */


    Info.verify = function verify(message) {
      if (typeof message !== "object" || message === null) return "object expected";

      if (message.base != null && message.hasOwnProperty("base")) {
        if (!Array.isArray(message.base)) return "base: array expected";

        for (var i = 0; i < message.base.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.base[i]);
          if (error) return "base." + error;
        }
      }

      if (message.fort != null && message.hasOwnProperty("fort")) {
        if (!Array.isArray(message.fort)) return "fort: array expected";

        for (var i = 0; i < message.fort.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.fort[i]);
          if (error) return "fort." + error;
        }
      }

      if (message.agent != null && message.hasOwnProperty("agent")) {
        if (!Array.isArray(message.agent)) return "agent: array expected";

        for (var i = 0; i < message.agent.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.agent[i]);
          if (error) return "agent." + error;
        }
      }

      if (message.bullet != null && message.hasOwnProperty("bullet")) {
        if (!Array.isArray(message.bullet)) return "bullet: array expected";

        for (var i = 0; i < message.bullet.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.bullet[i]);
          if (error) return "bullet." + error;
        }
      }

      if (message.rollLog != null && message.hasOwnProperty("rollLog")) {
        if (!Array.isArray(message.rollLog)) return "rollLog: array expected";

        for (var i = 0; i < message.rollLog.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.rollLog[i]);
          if (error) return "rollLog." + error;
        }
      }

      return null;
    };
    /**
     * Creates an Info message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AcWar.Info
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AcWar.Info} Info
     */


    Info.fromObject = function fromObject(object) {
      if (object instanceof $root.AcWar.Info) return object;
      var message = new $root.AcWar.Info();

      if (object.base) {
        if (!Array.isArray(object.base)) throw TypeError(".AcWar.Info.base: array expected");
        message.base = [];

        for (var i = 0; i < object.base.length; ++i) {
          if (typeof object.base[i] !== "object") throw TypeError(".AcWar.Info.base: object expected");
          message.base[i] = $root.AcWar.Agent.fromObject(object.base[i]);
        }
      }

      if (object.fort) {
        if (!Array.isArray(object.fort)) throw TypeError(".AcWar.Info.fort: array expected");
        message.fort = [];

        for (var i = 0; i < object.fort.length; ++i) {
          if (typeof object.fort[i] !== "object") throw TypeError(".AcWar.Info.fort: object expected");
          message.fort[i] = $root.AcWar.Agent.fromObject(object.fort[i]);
        }
      }

      if (object.agent) {
        if (!Array.isArray(object.agent)) throw TypeError(".AcWar.Info.agent: array expected");
        message.agent = [];

        for (var i = 0; i < object.agent.length; ++i) {
          if (typeof object.agent[i] !== "object") throw TypeError(".AcWar.Info.agent: object expected");
          message.agent[i] = $root.AcWar.Agent.fromObject(object.agent[i]);
        }
      }

      if (object.bullet) {
        if (!Array.isArray(object.bullet)) throw TypeError(".AcWar.Info.bullet: array expected");
        message.bullet = [];

        for (var i = 0; i < object.bullet.length; ++i) {
          if (typeof object.bullet[i] !== "object") throw TypeError(".AcWar.Info.bullet: object expected");
          message.bullet[i] = $root.AcWar.Agent.fromObject(object.bullet[i]);
        }
      }

      if (object.rollLog) {
        if (!Array.isArray(object.rollLog)) throw TypeError(".AcWar.Info.rollLog: array expected");
        message.rollLog = [];

        for (var i = 0; i < object.rollLog.length; ++i) {
          if (typeof object.rollLog[i] !== "object") throw TypeError(".AcWar.Info.rollLog: object expected");
          message.rollLog[i] = $root.AcWar.Agent.fromObject(object.rollLog[i]);
        }
      }

      return message;
    };
    /**
     * Creates a plain object from an Info message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.Info} message Info
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */


    Info.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};

      if (options.arrays || options.defaults) {
        object.base = [];
        object.fort = [];
        object.agent = [];
        object.bullet = [];
        object.rollLog = [];
      }

      if (message.base && message.base.length) {
        object.base = [];

        for (var j = 0; j < message.base.length; ++j) {
          object.base[j] = $root.AcWar.Agent.toObject(message.base[j], options);
        }
      }

      if (message.fort && message.fort.length) {
        object.fort = [];

        for (var j = 0; j < message.fort.length; ++j) {
          object.fort[j] = $root.AcWar.Agent.toObject(message.fort[j], options);
        }
      }

      if (message.agent && message.agent.length) {
        object.agent = [];

        for (var j = 0; j < message.agent.length; ++j) {
          object.agent[j] = $root.AcWar.Agent.toObject(message.agent[j], options);
        }
      }

      if (message.bullet && message.bullet.length) {
        object.bullet = [];

        for (var j = 0; j < message.bullet.length; ++j) {
          object.bullet[j] = $root.AcWar.Agent.toObject(message.bullet[j], options);
        }
      }

      if (message.rollLog && message.rollLog.length) {
        object.rollLog = [];

        for (var j = 0; j < message.rollLog.length; ++j) {
          object.rollLog[j] = $root.AcWar.Agent.toObject(message.rollLog[j], options);
        }
      }

      return object;
    };
    /**
     * Converts this Info to JSON.
     * @function toJSON
     * @memberof AcWar.Info
     * @instance
     * @returns {Object.<string,*>} JSON object
     */


    Info.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Info;
  }();

  return AcWar;
}();

module.exports = $root;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2FjZGF0YTEuanMiXSwibmFtZXMiOlsiJHByb3RvYnVmIiwicmVxdWlyZSIsIiRSZWFkZXIiLCJSZWFkZXIiLCIkV3JpdGVyIiwiV3JpdGVyIiwiJHV0aWwiLCJ1dGlsIiwiJHJvb3QiLCJyb290cyIsIkFjV2FyIiwiQWdlbnQiLCJwcm9wZXJ0aWVzIiwia2V5cyIsIk9iamVjdCIsImkiLCJsZW5ndGgiLCJwcm90b3R5cGUiLCJhZ2VudFR5cGUiLCJtcHgiLCJtcHkiLCJsaWZlIiwiZ3JvdXBLaWxsIiwiaXNIZXJvIiwicm90IiwiYXR0YWNrRHVyYSIsImFpZCIsImlubmVySWQiLCJyb2xlIiwib2JqZWN0SWQiLCJhY3RUeXBlIiwic2l6ZSIsImxldmVsIiwiZXB4IiwiZXB5IiwiZWlkIiwiZXNpemUiLCJ0cHgiLCJ0cHkiLCJ1cGRvd24iLCJjcmVhdGUiLCJlbmNvZGUiLCJtZXNzYWdlIiwid3JpdGVyIiwidWludDMyIiwic3RyaW5nIiwiaW50MzIiLCJib29sIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZW5jb2RlRGVsaW1pdGVkIiwibGRlbGltIiwiZGVjb2RlIiwicmVhZGVyIiwiZW5kIiwidW5kZWZpbmVkIiwibGVuIiwicG9zIiwidGFnIiwic2tpcFR5cGUiLCJQcm90b2NvbEVycm9yIiwiaW5zdGFuY2UiLCJkZWNvZGVEZWxpbWl0ZWQiLCJ2ZXJpZnkiLCJpc1N0cmluZyIsImlzSW50ZWdlciIsImZyb21PYmplY3QiLCJvYmplY3QiLCJTdHJpbmciLCJOdW1iZXIiLCJCb29sZWFuIiwidG9PYmplY3QiLCJvcHRpb25zIiwiZGVmYXVsdHMiLCJqc29uIiwiaXNGaW5pdGUiLCJ0b0pTT04iLCJjb25zdHJ1Y3RvciIsInRvSlNPTk9wdGlvbnMiLCJJbmZvIiwiYmFzZSIsImZvcnQiLCJhZ2VudCIsImJ1bGxldCIsInJvbGxMb2ciLCJlbXB0eUFycmF5IiwiZm9yayIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJlcnJv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QUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbkQsT0FBTyxDQUFDMEMsT0FBUixDQUFnQnBFLE1BQXBDLEVBQTRDLEVBQUU2RSxDQUE5QztBQUNJMUIsVUFBQUEsTUFBTSxDQUFDaUIsT0FBUCxDQUFlUyxDQUFmLElBQW9CckYsS0FBSyxDQUFDRSxLQUFOLENBQVlDLEtBQVosQ0FBa0I0RCxRQUFsQixDQUEyQjdCLE9BQU8sQ0FBQzBDLE9BQVIsQ0FBZ0JTLENBQWhCLENBQTNCLEVBQStDckIsT0FBL0MsQ0FBcEI7QUFESjtBQUVIOztBQUNELGFBQU9MLE1BQVA7QUFDSCxLQXJDRDtBQXVDQTs7Ozs7Ozs7O0FBT0FZLElBQUFBLElBQUksQ0FBQzlELFNBQUwsQ0FBZTJELE1BQWYsR0FBd0IsU0FBU0EsTUFBVCxHQUFrQjtBQUN0QyxhQUFPLEtBQUtDLFdBQUwsQ0FBaUJOLFFBQWpCLENBQTBCLElBQTFCLEVBQWdDdkUsU0FBUyxDQUFDTyxJQUFWLENBQWV1RSxhQUEvQyxDQUFQO0FBQ0gsS0FGRDs7QUFJQSxXQUFPQyxJQUFQO0FBQ0gsR0EzWFksRUFBYjs7QUE2WEEsU0FBT3JFLEtBQVA7QUFDSCxDQWpoQ2EsRUFBZDs7QUFtaENBb0YsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkYsS0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgYmxvY2stc2NvcGVkLXZhciwgaWQtbGVuZ3RoLCBuby1jb250cm9sLXJlZ2V4LCBuby1tYWdpYy1udW1iZXJzLCBuby1wcm90b3R5cGUtYnVpbHRpbnMsIG5vLXJlZGVjbGFyZSwgbm8tc2hhZG93LCBuby12YXIsIHNvcnQtdmFycyovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyICRwcm90b2J1ZiA9IHJlcXVpcmUoXCIuL3Byb3RvYnVmLmpzXCIpO1xuXG4vLyBDb21tb24gYWxpYXNlc1xudmFyICRSZWFkZXIgPSAkcHJvdG9idWYuUmVhZGVyLCAkV3JpdGVyID0gJHByb3RvYnVmLldyaXRlciwgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcblxuLy8gRXhwb3J0ZWQgcm9vdCBuYW1lc3BhY2VcbnZhciAkcm9vdCA9ICRwcm90b2J1Zi5yb290c1tcImRlZmF1bHRcIl0gfHwgKCRwcm90b2J1Zi5yb290c1tcImRlZmF1bHRcIl0gPSB7fSk7XG5cbiRyb290LkFjV2FyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogTmFtZXNwYWNlIEFjV2FyLlxuICAgICAqIEBleHBvcnRzIEFjV2FyXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqL1xuICAgIHZhciBBY1dhciA9IHt9O1xuXG4gICAgQWNXYXIuQWdlbnQgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3BlcnRpZXMgb2YgYW4gQWdlbnQuXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElBZ2VudFxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gYWdlbnRUeXBlIEFnZW50IGFnZW50VHlwZVxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbXB4IEFnZW50IG1weFxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbXB5IEFnZW50IG1weVxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbGlmZSBBZ2VudCBsaWZlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZ3JvdXBLaWxsIEFnZW50IGdyb3VwS2lsbFxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzSGVybyBBZ2VudCBpc0hlcm9cbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHJvdCBBZ2VudCByb3RcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGF0dGFja0R1cmEgQWdlbnQgYXR0YWNrRHVyYVxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gYWlkIEFnZW50IGFpZFxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gaW5uZXJJZCBBZ2VudCBpbm5lcklkXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByb2xlIEFnZW50IHJvbGVcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IG9iamVjdElkIEFnZW50IG9iamVjdElkXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhY3RUeXBlIEFnZW50IGFjdFR5cGVcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpemUgQWdlbnQgc2l6ZVxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbGV2ZWwgQWdlbnQgbGV2ZWxcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW2VweF0gQWdlbnQgZXB4XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFtlcHldIEFnZW50IGVweVxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbZWlkXSBBZ2VudCBlaWRcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW2VzaXplXSBBZ2VudCBlc2l6ZVxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbdHB4XSBBZ2VudCB0cHhcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW3RweV0gQWdlbnQgdHB5XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFt1cGRvd25dIEFnZW50IHVwZG93blxuICAgICAgICAgKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0cyBhIG5ldyBBZ2VudC5cbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhbiBBZ2VudC5cbiAgICAgICAgICogQGltcGxlbWVudHMgSUFnZW50XG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLklBZ2VudD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gQWdlbnQocHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBhZ2VudFR5cGUuXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gYWdlbnRUeXBlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5hZ2VudFR5cGUgPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBtcHguXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gbXB4XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5tcHggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBtcHkuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gbXB5XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5tcHkgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBsaWZlLlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IGxpZmVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmxpZmUgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBncm91cEtpbGwuXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IGdyb3VwS2lsbFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUuZ3JvdXBLaWxsID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZW50IGlzSGVyby5cbiAgICAgICAgICogQG1lbWJlciB7Ym9vbGVhbn0gaXNIZXJvXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5pc0hlcm8gPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgcm90LlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHJvdFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUucm90ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgYXR0YWNrRHVyYS5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBhdHRhY2tEdXJhXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5hdHRhY2tEdXJhID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgYWlkLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IGFpZFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUuYWlkID0gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgaW5uZXJJZC5cbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBpbm5lcklkXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5pbm5lcklkID0gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgcm9sZS5cbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSByb2xlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5yb2xlID0gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgb2JqZWN0SWQuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gb2JqZWN0SWRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLm9iamVjdElkID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgYWN0VHlwZS5cbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBhY3RUeXBlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5hY3RUeXBlID0gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgc2l6ZS5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBzaXplXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5zaXplID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgbGV2ZWwuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gbGV2ZWxcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmxldmVsID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgZXB4LlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IGVweFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUuZXB4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgZXB5LlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IGVweVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUuZXB5ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgZWlkLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IGVpZFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUuZWlkID0gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgZXNpemUuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gZXNpemVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmVzaXplID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgdHB4LlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRweFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUudHB4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgdHB5LlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRweVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUudHB5ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgdXBkb3duLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHVwZG93blxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUudXBkb3duID0gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBBZ2VudCBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtBY1dhci5JQWdlbnQ9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgICAgICogQHJldHVybnMge0FjV2FyLkFnZW50fSBBZ2VudCBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQWdlbnQocHJvcGVydGllcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBBZ2VudCBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBBY1dhci5BZ2VudC52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLklBZ2VudH0gbWVzc2FnZSBBZ2VudCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLmFnZW50VHlwZSk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDUgPSovMjEpLmZsb2F0KG1lc3NhZ2UubXB4KTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMywgd2lyZVR5cGUgNSA9Ki8yOSkuZmxvYXQobWVzc2FnZS5tcHkpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA0LCB3aXJlVHlwZSAwID0qLzMyKS5pbnQzMihtZXNzYWdlLmxpZmUpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA1LCB3aXJlVHlwZSAwID0qLzQwKS5ib29sKG1lc3NhZ2UuZ3JvdXBLaWxsKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgNiwgd2lyZVR5cGUgMCA9Ki80OCkuYm9vbChtZXNzYWdlLmlzSGVybyk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDcsIHdpcmVUeXBlIDUgPSovNjEpLmZsb2F0KG1lc3NhZ2Uucm90KTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOCwgd2lyZVR5cGUgNSA9Ki82OSkuZmxvYXQobWVzc2FnZS5hdHRhY2tEdXJhKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgOSwgd2lyZVR5cGUgMiA9Ki83NCkuc3RyaW5nKG1lc3NhZ2UuYWlkKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTAsIHdpcmVUeXBlIDIgPSovODIpLnN0cmluZyhtZXNzYWdlLmlubmVySWQpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxMSwgd2lyZVR5cGUgMiA9Ki85MCkuc3RyaW5nKG1lc3NhZ2Uucm9sZSk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEyLCB3aXJlVHlwZSAwID0qLzk2KS5pbnQzMihtZXNzYWdlLm9iamVjdElkKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTMsIHdpcmVUeXBlIDIgPSovMTA2KS5zdHJpbmcobWVzc2FnZS5hY3RUeXBlKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTQsIHdpcmVUeXBlIDUgPSovMTE3KS5mbG9hdChtZXNzYWdlLnNpemUpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxNSwgd2lyZVR5cGUgMCA9Ki8xMjApLmludDMyKG1lc3NhZ2UubGV2ZWwpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXB4ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJlcHhcIikpXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxNiwgd2lyZVR5cGUgNSA9Ki8xMzMpLmZsb2F0KG1lc3NhZ2UuZXB4KTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVweSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiZXB5XCIpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTcsIHdpcmVUeXBlIDUgPSovMTQxKS5mbG9hdChtZXNzYWdlLmVweSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5laWQgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcImVpZFwiKSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDE4LCB3aXJlVHlwZSAyID0qLzE0Nikuc3RyaW5nKG1lc3NhZ2UuZWlkKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVzaXplICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJlc2l6ZVwiKSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDE5LCB3aXJlVHlwZSA1ID0qLzE1NykuZmxvYXQobWVzc2FnZS5lc2l6ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS50cHggIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInRweFwiKSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIwLCB3aXJlVHlwZSA1ID0qLzE2NSkuZmxvYXQobWVzc2FnZS50cHgpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHB5ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ0cHlcIikpXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyMSwgd2lyZVR5cGUgNSA9Ki8xNzMpLmZsb2F0KG1lc3NhZ2UudHB5KTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnVwZG93biAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwidXBkb3duXCIpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMjIsIHdpcmVUeXBlIDIgPSovMTc4KS5zdHJpbmcobWVzc2FnZS51cGRvd24pO1xuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEFnZW50IG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEFjV2FyLkFnZW50LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUFnZW50fSBtZXNzYWdlIEFnZW50IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlY29kZXMgYW4gQWdlbnQgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgICAgICogQHJldHVybnMge0FjV2FyLkFnZW50fSBBZ2VudFxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkFjV2FyLkFnZW50KCk7XG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWdlbnRUeXBlID0gcmVhZGVyLnN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubXB4ID0gcmVhZGVyLmZsb2F0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tcHkgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmxpZmUgPSByZWFkZXIuaW50MzIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmdyb3VwS2lsbCA9IHJlYWRlci5ib29sKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5pc0hlcm8gPSByZWFkZXIuYm9vbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2Uucm90ID0gcmVhZGVyLmZsb2F0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hdHRhY2tEdXJhID0gcmVhZGVyLmZsb2F0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5haWQgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJJZCA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5yb2xlID0gcmVhZGVyLnN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLm9iamVjdElkID0gcmVhZGVyLmludDMyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWN0VHlwZSA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zaXplID0gcmVhZGVyLmZsb2F0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubGV2ZWwgPSByZWFkZXIuaW50MzIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNjpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5lcHggPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNzpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5lcHkgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxODpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5laWQgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTk6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZXNpemUgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS50cHggPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyMTpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS50cHkgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyMjpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS51cGRvd24gPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYWdlbnRUeXBlXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdhZ2VudFR5cGUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtcHhcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ21weCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1weVwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnbXB5J1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwibGlmZVwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnbGlmZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImdyb3VwS2lsbFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnZ3JvdXBLaWxsJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiaXNIZXJvXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdpc0hlcm8nXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb3RcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3JvdCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImF0dGFja0R1cmFcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2F0dGFja0R1cmEnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhaWRcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2FpZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlubmVySWRcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2lubmVySWQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb2xlXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdyb2xlJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwib2JqZWN0SWRcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ29iamVjdElkJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYWN0VHlwZVwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnYWN0VHlwZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInNpemVcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3NpemUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJsZXZlbFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnbGV2ZWwnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVjb2RlcyBhbiBBZ2VudCBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuQWdlbnR9IEFnZW50XG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZlcmlmaWVzIGFuIEFnZW50IG1lc3NhZ2UuXG4gICAgICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuYWdlbnRUeXBlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhZ2VudFR5cGU6IHN0cmluZyBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLm1weCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJtcHg6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLm1weSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJtcHk6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5saWZlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJsaWZlOiBpbnRlZ2VyIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuZ3JvdXBLaWxsICE9PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJncm91cEtpbGw6IGJvb2xlYW4gZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5pc0hlcm8gIT09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImlzSGVybzogYm9vbGVhbiBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnJvdCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJyb3Q6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLmF0dGFja0R1cmEgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYXR0YWNrRHVyYTogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuYWlkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhaWQ6IHN0cmluZyBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmlubmVySWQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImlubmVySWQ6IHN0cmluZyBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnJvbGUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInJvbGU6IHN0cmluZyBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5vYmplY3RJZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0SWQ6IGludGVnZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5hY3RUeXBlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhY3RUeXBlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5zaXplICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInNpemU6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc0ludGVnZXIobWVzc2FnZS5sZXZlbCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibGV2ZWw6IGludGVnZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVweCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJlcHhcIikpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLmVweCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZXB4OiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVweSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJlcHlcIikpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLmVweSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZXB5OiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVpZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJlaWRcIikpXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmVpZCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImVpZDogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5lc2l6ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJlc2l6ZVwiKSlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuZXNpemUgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImVzaXplOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRweCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0cHhcIikpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRweCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidHB4OiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRweSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0cHlcIikpXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRweSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidHB5OiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnVwZG93biAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ1cGRvd25cIikpXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnVwZG93bikpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInVwZG93bjogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhbiBBZ2VudCBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMge0FjV2FyLkFnZW50fSBBZ2VudFxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuQWNXYXIuQWdlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkFjV2FyLkFnZW50KCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmFnZW50VHlwZSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWdlbnRUeXBlID0gU3RyaW5nKG9iamVjdC5hZ2VudFR5cGUpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5tcHggIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm1weCA9IE51bWJlcihvYmplY3QubXB4KTtcbiAgICAgICAgICAgIGlmIChvYmplY3QubXB5ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5tcHkgPSBOdW1iZXIob2JqZWN0Lm1weSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmxpZmUgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmxpZmUgPSBvYmplY3QubGlmZSB8IDA7XG4gICAgICAgICAgICBpZiAob2JqZWN0Lmdyb3VwS2lsbCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ3JvdXBLaWxsID0gQm9vbGVhbihvYmplY3QuZ3JvdXBLaWxsKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuaXNIZXJvICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pc0hlcm8gPSBCb29sZWFuKG9iamVjdC5pc0hlcm8pO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5yb3QgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnJvdCA9IE51bWJlcihvYmplY3Qucm90KTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuYXR0YWNrRHVyYSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYXR0YWNrRHVyYSA9IE51bWJlcihvYmplY3QuYXR0YWNrRHVyYSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmFpZCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWlkID0gU3RyaW5nKG9iamVjdC5haWQpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5pbm5lcklkICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbm5lcklkID0gU3RyaW5nKG9iamVjdC5pbm5lcklkKTtcbiAgICAgICAgICAgIGlmIChvYmplY3Qucm9sZSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2Uucm9sZSA9IFN0cmluZyhvYmplY3Qucm9sZSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0Lm9iamVjdElkICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5vYmplY3RJZCA9IG9iamVjdC5vYmplY3RJZCB8IDA7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmFjdFR5cGUgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFjdFR5cGUgPSBTdHJpbmcob2JqZWN0LmFjdFR5cGUpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5zaXplICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5zaXplID0gTnVtYmVyKG9iamVjdC5zaXplKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QubGV2ZWwgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmxldmVsID0gb2JqZWN0LmxldmVsIHwgMDtcbiAgICAgICAgICAgIGlmIChvYmplY3QuZXB4ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5lcHggPSBOdW1iZXIob2JqZWN0LmVweCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmVweSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZXB5ID0gTnVtYmVyKG9iamVjdC5lcHkpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5laWQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmVpZCA9IFN0cmluZyhvYmplY3QuZWlkKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuZXNpemUgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmVzaXplID0gTnVtYmVyKG9iamVjdC5lc2l6ZSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LnRweCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudHB4ID0gTnVtYmVyKG9iamVjdC50cHgpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC50cHkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRweSA9IE51bWJlcihvYmplY3QudHB5KTtcbiAgICAgICAgICAgIGlmIChvYmplY3QudXBkb3duICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS51cGRvd24gPSBTdHJpbmcob2JqZWN0LnVwZG93bik7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGFuIEFnZW50IG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuQWdlbnR9IG1lc3NhZ2UgQWdlbnRcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xuICAgICAgICAgICAgICAgIG9iamVjdC5hZ2VudFR5cGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG9iamVjdC5tcHggPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5tcHkgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5saWZlID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QuZ3JvdXBLaWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmlzSGVybyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG9iamVjdC5yb3QgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5hdHRhY2tEdXJhID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QuYWlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBvYmplY3QuaW5uZXJJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG9iamVjdC5vYmplY3RJZCA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmFjdFR5cGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG9iamVjdC5zaXplID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QubGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5lcHggPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5lcHkgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5laWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG9iamVjdC5lc2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnRweCA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnRweSA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnVwZG93biA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5hZ2VudFR5cGUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYWdlbnRUeXBlXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5hZ2VudFR5cGUgPSBtZXNzYWdlLmFnZW50VHlwZTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLm1weCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtcHhcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1weCA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS5tcHgpID8gU3RyaW5nKG1lc3NhZ2UubXB4KSA6IG1lc3NhZ2UubXB4O1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UubXB5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1weVwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QubXB5ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLm1weSkgPyBTdHJpbmcobWVzc2FnZS5tcHkpIDogbWVzc2FnZS5tcHk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5saWZlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImxpZmVcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmxpZmUgPSBtZXNzYWdlLmxpZmU7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5ncm91cEtpbGwgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiZ3JvdXBLaWxsXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5ncm91cEtpbGwgPSBtZXNzYWdlLmdyb3VwS2lsbDtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmlzSGVybyAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJpc0hlcm9cIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmlzSGVybyA9IG1lc3NhZ2UuaXNIZXJvO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uucm90ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJvdFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3Qucm90ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLnJvdCkgPyBTdHJpbmcobWVzc2FnZS5yb3QpIDogbWVzc2FnZS5yb3Q7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5hdHRhY2tEdXJhICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImF0dGFja0R1cmFcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmF0dGFja0R1cmEgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UuYXR0YWNrRHVyYSkgPyBTdHJpbmcobWVzc2FnZS5hdHRhY2tEdXJhKSA6IG1lc3NhZ2UuYXR0YWNrRHVyYTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmFpZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhaWRcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmFpZCA9IG1lc3NhZ2UuYWlkO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuaW5uZXJJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJpbm5lcklkXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lcklkID0gbWVzc2FnZS5pbm5lcklkO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uucm9sZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb2xlXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5yb2xlID0gbWVzc2FnZS5yb2xlO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uub2JqZWN0SWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwib2JqZWN0SWRcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0Lm9iamVjdElkID0gbWVzc2FnZS5vYmplY3RJZDtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmFjdFR5cGUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYWN0VHlwZVwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QuYWN0VHlwZSA9IG1lc3NhZ2UuYWN0VHlwZTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnNpemUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwic2l6ZVwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3Quc2l6ZSA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS5zaXplKSA/IFN0cmluZyhtZXNzYWdlLnNpemUpIDogbWVzc2FnZS5zaXplO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UubGV2ZWwgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibGV2ZWxcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmxldmVsID0gbWVzc2FnZS5sZXZlbDtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVweCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJlcHhcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmVweCA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS5lcHgpID8gU3RyaW5nKG1lc3NhZ2UuZXB4KSA6IG1lc3NhZ2UuZXB4O1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXB5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVweVwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QuZXB5ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLmVweSkgPyBTdHJpbmcobWVzc2FnZS5lcHkpIDogbWVzc2FnZS5lcHk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5laWQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiZWlkXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5laWQgPSBtZXNzYWdlLmVpZDtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVzaXplICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVzaXplXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5lc2l6ZSA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS5lc2l6ZSkgPyBTdHJpbmcobWVzc2FnZS5lc2l6ZSkgOiBtZXNzYWdlLmVzaXplO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHB4ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRweFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QudHB4ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLnRweCkgPyBTdHJpbmcobWVzc2FnZS50cHgpIDogbWVzc2FnZS50cHg7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS50cHkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidHB5XCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC50cHkgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UudHB5KSA/IFN0cmluZyhtZXNzYWdlLnRweSkgOiBtZXNzYWdlLnRweTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnVwZG93biAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ1cGRvd25cIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnVwZG93biA9IG1lc3NhZ2UudXBkb3duO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBBZ2VudCB0byBKU09OLlxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBBZ2VudDtcbiAgICB9KSgpO1xuXG4gICAgQWNXYXIuSW5mbyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhbiBJbmZvLlxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXJcbiAgICAgICAgICogQGludGVyZmFjZSBJSW5mb1xuICAgICAgICAgKiBAcHJvcGVydHkge0FycmF5LjxBY1dhci5JQWdlbnQ+fG51bGx9IFtiYXNlXSBJbmZvIGJhc2VcbiAgICAgICAgICogQHByb3BlcnR5IHtBcnJheS48QWNXYXIuSUFnZW50PnxudWxsfSBbZm9ydF0gSW5mbyBmb3J0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFjV2FyLklBZ2VudD58bnVsbH0gW2FnZW50XSBJbmZvIGFnZW50XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFjV2FyLklBZ2VudD58bnVsbH0gW2J1bGxldF0gSW5mbyBidWxsZXRcbiAgICAgICAgICogQHByb3BlcnR5IHtBcnJheS48QWNXYXIuSUFnZW50PnxudWxsfSBbcm9sbExvZ10gSW5mbyByb2xsTG9nXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEluZm8uXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhclxuICAgICAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYW4gSW5mby5cbiAgICAgICAgICogQGltcGxlbWVudHMgSUluZm9cbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUluZm89fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIEluZm8ocHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gW107XG4gICAgICAgICAgICB0aGlzLmZvcnQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYWdlbnQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0ID0gW107XG4gICAgICAgICAgICB0aGlzLnJvbGxMb2cgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5mbyBiYXNlLlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheS48QWNXYXIuSUFnZW50Pn0gYmFzZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEluZm8ucHJvdG90eXBlLmJhc2UgPSAkdXRpbC5lbXB0eUFycmF5O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmZvIGZvcnQuXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5LjxBY1dhci5JQWdlbnQ+fSBmb3J0XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5wcm90b3R5cGUuZm9ydCA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZm8gYWdlbnQuXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5LjxBY1dhci5JQWdlbnQ+fSBhZ2VudFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEluZm8ucHJvdG90eXBlLmFnZW50ID0gJHV0aWwuZW1wdHlBcnJheTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5mbyBidWxsZXQuXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5LjxBY1dhci5JQWdlbnQ+fSBidWxsZXRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLnByb3RvdHlwZS5idWxsZXQgPSAkdXRpbC5lbXB0eUFycmF5O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmZvIHJvbGxMb2cuXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5LjxBY1dhci5JQWdlbnQ+fSByb2xsTG9nXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5wcm90b3R5cGUucm9sbExvZyA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgSW5mbyBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLklJbmZvPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICAgICAqIEByZXR1cm5zIHtBY1dhci5JbmZvfSBJbmZvIGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEluZm8ocHJvcGVydGllcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBJbmZvIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEFjV2FyLkluZm8udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLklJbmZvfSBtZXNzYWdlIEluZm8gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5iYXNlICE9IG51bGwgJiYgbWVzc2FnZS5iYXNlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UuYmFzZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuQWNXYXIuQWdlbnQuZW5jb2RlKG1lc3NhZ2UuYmFzZVtpXSwgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5mb3JrKCkpLmxkZWxpbSgpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZm9ydCAhPSBudWxsICYmIG1lc3NhZ2UuZm9ydC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLmZvcnQubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgICRyb290LkFjV2FyLkFnZW50LmVuY29kZShtZXNzYWdlLmZvcnRbaV0sIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMiA9Ki8xOCkuZm9yaygpKS5sZGVsaW0oKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmFnZW50ICE9IG51bGwgJiYgbWVzc2FnZS5hZ2VudC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLmFnZW50Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgICAgICAkcm9vdC5BY1dhci5BZ2VudC5lbmNvZGUobWVzc2FnZS5hZ2VudFtpXSwgd3JpdGVyLnVpbnQzMigvKiBpZCAzLCB3aXJlVHlwZSAyID0qLzI2KS5mb3JrKCkpLmxkZWxpbSgpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYnVsbGV0ICE9IG51bGwgJiYgbWVzc2FnZS5idWxsZXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5idWxsZXQubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgICRyb290LkFjV2FyLkFnZW50LmVuY29kZShtZXNzYWdlLmJ1bGxldFtpXSwgd3JpdGVyLnVpbnQzMigvKiBpZCA0LCB3aXJlVHlwZSAyID0qLzM0KS5mb3JrKCkpLmxkZWxpbSgpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uucm9sbExvZyAhPSBudWxsICYmIG1lc3NhZ2Uucm9sbExvZy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnJvbGxMb2cubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgICRyb290LkFjV2FyLkFnZW50LmVuY29kZShtZXNzYWdlLnJvbGxMb2dbaV0sIHdyaXRlci51aW50MzIoLyogaWQgNSwgd2lyZVR5cGUgMiA9Ki80MikuZm9yaygpKS5sZGVsaW0oKTtcbiAgICAgICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBJbmZvIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEFjV2FyLkluZm8udmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLklJbmZvfSBtZXNzYWdlIEluZm8gbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWNvZGVzIGFuIEluZm8gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuSW5mb30gSW5mb1xuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgICAgICovXG4gICAgICAgIEluZm8uZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQWNXYXIuSW5mbygpO1xuICAgICAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShtZXNzYWdlLmJhc2UgJiYgbWVzc2FnZS5iYXNlLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmJhc2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5iYXNlLnB1c2goJHJvb3QuQWNXYXIuQWdlbnQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5mb3J0ICYmIG1lc3NhZ2UuZm9ydC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5mb3J0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZm9ydC5wdXNoKCRyb290LkFjV2FyLkFnZW50LmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKG1lc3NhZ2UuYWdlbnQgJiYgbWVzc2FnZS5hZ2VudC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZ2VudCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFnZW50LnB1c2goJHJvb3QuQWNXYXIuQWdlbnQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5idWxsZXQgJiYgbWVzc2FnZS5idWxsZXQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYnVsbGV0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYnVsbGV0LnB1c2goJHJvb3QuQWNXYXIuQWdlbnQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5yb2xsTG9nICYmIG1lc3NhZ2Uucm9sbExvZy5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5yb2xsTG9nID0gW107XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2Uucm9sbExvZy5wdXNoKCRyb290LkFjV2FyLkFnZW50LmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWNvZGVzIGFuIEluZm8gbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuSW5mb30gSW5mb1xuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgICAgICovXG4gICAgICAgIEluZm8uZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZlcmlmaWVzIGFuIEluZm8gbWVzc2FnZS5cbiAgICAgICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAgICAgKi9cbiAgICAgICAgSW5mby52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5iYXNlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImJhc2VcIikpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZS5iYXNlKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYmFzZTogYXJyYXkgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UuYmFzZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAkcm9vdC5BY1dhci5BZ2VudC52ZXJpZnkobWVzc2FnZS5iYXNlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYmFzZS5cIiArIGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmZvcnQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiZm9ydFwiKSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLmZvcnQpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJmb3J0OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5mb3J0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkFjV2FyLkFnZW50LnZlcmlmeShtZXNzYWdlLmZvcnRbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJmb3J0LlwiICsgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYWdlbnQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYWdlbnRcIikpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZS5hZ2VudCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImFnZW50OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5hZ2VudC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAkcm9vdC5BY1dhci5BZ2VudC52ZXJpZnkobWVzc2FnZS5hZ2VudFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImFnZW50LlwiICsgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYnVsbGV0ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImJ1bGxldFwiKSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLmJ1bGxldCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJ1bGxldDogYXJyYXkgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UuYnVsbGV0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkFjV2FyLkFnZW50LnZlcmlmeShtZXNzYWdlLmJ1bGxldFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJ1bGxldC5cIiArIGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnJvbGxMb2cgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwicm9sbExvZ1wiKSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLnJvbGxMb2cpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJyb2xsTG9nOiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5yb2xsTG9nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkFjV2FyLkFnZW50LnZlcmlmeShtZXNzYWdlLnJvbGxMb2dbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJyb2xsTG9nLlwiICsgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYW4gSW5mbyBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuSW5mb30gSW5mb1xuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5BY1dhci5JbmZvKVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5BY1dhci5JbmZvKCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmJhc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0LmJhc2UpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQWNXYXIuSW5mby5iYXNlOiBhcnJheSBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmJhc2UgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5iYXNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmJhc2VbaV0gIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQWNXYXIuSW5mby5iYXNlOiBvYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYmFzZVtpXSA9ICRyb290LkFjV2FyLkFnZW50LmZyb21PYmplY3Qob2JqZWN0LmJhc2VbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmplY3QuZm9ydCkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QuZm9ydCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLmZvcnQ6IGFycmF5IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZm9ydCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LmZvcnQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuZm9ydFtpXSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLmZvcnQ6IG9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5mb3J0W2ldID0gJHJvb3QuQWNXYXIuQWdlbnQuZnJvbU9iamVjdChvYmplY3QuZm9ydFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iamVjdC5hZ2VudCkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QuYWdlbnQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQWNXYXIuSW5mby5hZ2VudDogYXJyYXkgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hZ2VudCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LmFnZW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmFnZW50W2ldICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkFjV2FyLkluZm8uYWdlbnQ6IG9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZ2VudFtpXSA9ICRyb290LkFjV2FyLkFnZW50LmZyb21PYmplY3Qob2JqZWN0LmFnZW50W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0LmJ1bGxldCkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QuYnVsbGV0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkFjV2FyLkluZm8uYnVsbGV0OiBhcnJheSBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmJ1bGxldCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LmJ1bGxldC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5idWxsZXRbaV0gIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQWNXYXIuSW5mby5idWxsZXQ6IG9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5idWxsZXRbaV0gPSAkcm9vdC5BY1dhci5BZ2VudC5mcm9tT2JqZWN0KG9iamVjdC5idWxsZXRbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmplY3Qucm9sbExvZykge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3Qucm9sbExvZykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLnJvbGxMb2c6IGFycmF5IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2Uucm9sbExvZyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LnJvbGxMb2cubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3Qucm9sbExvZ1tpXSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLnJvbGxMb2c6IG9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5yb2xsTG9nW2ldID0gJHJvb3QuQWNXYXIuQWdlbnQuZnJvbU9iamVjdChvYmplY3Qucm9sbExvZ1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhbiBJbmZvIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtBY1dhci5JbmZvfSBtZXNzYWdlIEluZm9cbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFycmF5cyB8fCBvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmJhc2UgPSBbXTtcbiAgICAgICAgICAgICAgICBvYmplY3QuZm9ydCA9IFtdO1xuICAgICAgICAgICAgICAgIG9iamVjdC5hZ2VudCA9IFtdO1xuICAgICAgICAgICAgICAgIG9iamVjdC5idWxsZXQgPSBbXTtcbiAgICAgICAgICAgICAgICBvYmplY3Qucm9sbExvZyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYmFzZSAmJiBtZXNzYWdlLmJhc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmJhc2UgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1lc3NhZ2UuYmFzZS5sZW5ndGg7ICsrailcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmJhc2Vbal0gPSAkcm9vdC5BY1dhci5BZ2VudC50b09iamVjdChtZXNzYWdlLmJhc2Vbal0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZm9ydCAmJiBtZXNzYWdlLmZvcnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmZvcnQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1lc3NhZ2UuZm9ydC5sZW5ndGg7ICsrailcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmZvcnRbal0gPSAkcm9vdC5BY1dhci5BZ2VudC50b09iamVjdChtZXNzYWdlLmZvcnRbal0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYWdlbnQgJiYgbWVzc2FnZS5hZ2VudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QuYWdlbnQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1lc3NhZ2UuYWdlbnQubGVuZ3RoOyArK2opXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5hZ2VudFtqXSA9ICRyb290LkFjV2FyLkFnZW50LnRvT2JqZWN0KG1lc3NhZ2UuYWdlbnRbal0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYnVsbGV0ICYmIG1lc3NhZ2UuYnVsbGV0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9iamVjdC5idWxsZXQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1lc3NhZ2UuYnVsbGV0Lmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuYnVsbGV0W2pdID0gJHJvb3QuQWNXYXIuQWdlbnQudG9PYmplY3QobWVzc2FnZS5idWxsZXRbal0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uucm9sbExvZyAmJiBtZXNzYWdlLnJvbGxMb2cubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJvbGxMb2cgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1lc3NhZ2Uucm9sbExvZy5sZW5ndGg7ICsrailcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnJvbGxMb2dbal0gPSAkcm9vdC5BY1dhci5BZ2VudC50b09iamVjdChtZXNzYWdlLnJvbGxMb2dbal0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgdGhpcyBJbmZvIHRvIEpTT04uXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIEluZm8ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBJbmZvO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gQWNXYXI7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICRyb290O1xuIl19