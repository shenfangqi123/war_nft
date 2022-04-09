/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.AcWar = (function() {

    /**
     * Namespace AcWar.
     * @exports AcWar
     * @namespace
     */
    var AcWar = {};

    AcWar.Agent = (function() {

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
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
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
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.agentType);
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.mpx);
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.mpy);
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.life);
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.groupKill);
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isHero);
            writer.uint32(/* id 7, wireType 5 =*/61).float(message.rot);
            writer.uint32(/* id 8, wireType 5 =*/69).float(message.attackDura);
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.aid);
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.innerId);
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.role);
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.objectId);
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.actType);
            writer.uint32(/* id 14, wireType 5 =*/117).float(message.size);
            writer.uint32(/* id 15, wireType 0 =*/120).int32(message.level);
            if (message.epx != null && Object.hasOwnProperty.call(message, "epx"))
                writer.uint32(/* id 16, wireType 5 =*/133).float(message.epx);
            if (message.epy != null && Object.hasOwnProperty.call(message, "epy"))
                writer.uint32(/* id 17, wireType 5 =*/141).float(message.epy);
            if (message.eid != null && Object.hasOwnProperty.call(message, "eid"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.eid);
            if (message.esize != null && Object.hasOwnProperty.call(message, "esize"))
                writer.uint32(/* id 19, wireType 5 =*/157).float(message.esize);
            if (message.tpx != null && Object.hasOwnProperty.call(message, "tpx"))
                writer.uint32(/* id 20, wireType 5 =*/165).float(message.tpx);
            if (message.tpy != null && Object.hasOwnProperty.call(message, "tpy"))
                writer.uint32(/* id 21, wireType 5 =*/173).float(message.tpy);
            if (message.updown != null && Object.hasOwnProperty.call(message, "updown"))
                writer.uint32(/* id 22, wireType 2 =*/178).string(message.updown);
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AcWar.Agent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.agentType = reader.string();
                    break;
                case 2:
                    message.mpx = reader.float();
                    break;
                case 3:
                    message.mpy = reader.float();
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
                    message.rot = reader.float();
                    break;
                case 8:
                    message.attackDura = reader.float();
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
                    message.size = reader.float();
                    break;
                case 15:
                    message.level = reader.int32();
                    break;
                case 16:
                    message.epx = reader.float();
                    break;
                case 17:
                    message.epy = reader.float();
                    break;
                case 18:
                    message.eid = reader.string();
                    break;
                case 19:
                    message.esize = reader.float();
                    break;
                case 20:
                    message.tpx = reader.float();
                    break;
                case 21:
                    message.tpy = reader.float();
                    break;
                case 22:
                    message.updown = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("agentType"))
                throw $util.ProtocolError("missing required 'agentType'", { instance: message });
            if (!message.hasOwnProperty("mpx"))
                throw $util.ProtocolError("missing required 'mpx'", { instance: message });
            if (!message.hasOwnProperty("mpy"))
                throw $util.ProtocolError("missing required 'mpy'", { instance: message });
            if (!message.hasOwnProperty("life"))
                throw $util.ProtocolError("missing required 'life'", { instance: message });
            if (!message.hasOwnProperty("groupKill"))
                throw $util.ProtocolError("missing required 'groupKill'", { instance: message });
            if (!message.hasOwnProperty("isHero"))
                throw $util.ProtocolError("missing required 'isHero'", { instance: message });
            if (!message.hasOwnProperty("rot"))
                throw $util.ProtocolError("missing required 'rot'", { instance: message });
            if (!message.hasOwnProperty("attackDura"))
                throw $util.ProtocolError("missing required 'attackDura'", { instance: message });
            if (!message.hasOwnProperty("aid"))
                throw $util.ProtocolError("missing required 'aid'", { instance: message });
            if (!message.hasOwnProperty("innerId"))
                throw $util.ProtocolError("missing required 'innerId'", { instance: message });
            if (!message.hasOwnProperty("role"))
                throw $util.ProtocolError("missing required 'role'", { instance: message });
            if (!message.hasOwnProperty("objectId"))
                throw $util.ProtocolError("missing required 'objectId'", { instance: message });
            if (!message.hasOwnProperty("actType"))
                throw $util.ProtocolError("missing required 'actType'", { instance: message });
            if (!message.hasOwnProperty("size"))
                throw $util.ProtocolError("missing required 'size'", { instance: message });
            if (!message.hasOwnProperty("level"))
                throw $util.ProtocolError("missing required 'level'", { instance: message });
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.agentType))
                return "agentType: string expected";
            if (typeof message.mpx !== "number")
                return "mpx: number expected";
            if (typeof message.mpy !== "number")
                return "mpy: number expected";
            if (!$util.isInteger(message.life))
                return "life: integer expected";
            if (typeof message.groupKill !== "boolean")
                return "groupKill: boolean expected";
            if (typeof message.isHero !== "boolean")
                return "isHero: boolean expected";
            if (typeof message.rot !== "number")
                return "rot: number expected";
            if (typeof message.attackDura !== "number")
                return "attackDura: number expected";
            if (!$util.isString(message.aid))
                return "aid: string expected";
            if (!$util.isString(message.innerId))
                return "innerId: string expected";
            if (!$util.isString(message.role))
                return "role: string expected";
            if (!$util.isInteger(message.objectId))
                return "objectId: integer expected";
            if (!$util.isString(message.actType))
                return "actType: string expected";
            if (typeof message.size !== "number")
                return "size: number expected";
            if (!$util.isInteger(message.level))
                return "level: integer expected";
            if (message.epx != null && message.hasOwnProperty("epx"))
                if (typeof message.epx !== "number")
                    return "epx: number expected";
            if (message.epy != null && message.hasOwnProperty("epy"))
                if (typeof message.epy !== "number")
                    return "epy: number expected";
            if (message.eid != null && message.hasOwnProperty("eid"))
                if (!$util.isString(message.eid))
                    return "eid: string expected";
            if (message.esize != null && message.hasOwnProperty("esize"))
                if (typeof message.esize !== "number")
                    return "esize: number expected";
            if (message.tpx != null && message.hasOwnProperty("tpx"))
                if (typeof message.tpx !== "number")
                    return "tpx: number expected";
            if (message.tpy != null && message.hasOwnProperty("tpy"))
                if (typeof message.tpy !== "number")
                    return "tpy: number expected";
            if (message.updown != null && message.hasOwnProperty("updown"))
                if (!$util.isString(message.updown))
                    return "updown: string expected";
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
            if (object instanceof $root.AcWar.Agent)
                return object;
            var message = new $root.AcWar.Agent();
            if (object.agentType != null)
                message.agentType = String(object.agentType);
            if (object.mpx != null)
                message.mpx = Number(object.mpx);
            if (object.mpy != null)
                message.mpy = Number(object.mpy);
            if (object.life != null)
                message.life = object.life | 0;
            if (object.groupKill != null)
                message.groupKill = Boolean(object.groupKill);
            if (object.isHero != null)
                message.isHero = Boolean(object.isHero);
            if (object.rot != null)
                message.rot = Number(object.rot);
            if (object.attackDura != null)
                message.attackDura = Number(object.attackDura);
            if (object.aid != null)
                message.aid = String(object.aid);
            if (object.innerId != null)
                message.innerId = String(object.innerId);
            if (object.role != null)
                message.role = String(object.role);
            if (object.objectId != null)
                message.objectId = object.objectId | 0;
            if (object.actType != null)
                message.actType = String(object.actType);
            if (object.size != null)
                message.size = Number(object.size);
            if (object.level != null)
                message.level = object.level | 0;
            if (object.epx != null)
                message.epx = Number(object.epx);
            if (object.epy != null)
                message.epy = Number(object.epy);
            if (object.eid != null)
                message.eid = String(object.eid);
            if (object.esize != null)
                message.esize = Number(object.esize);
            if (object.tpx != null)
                message.tpx = Number(object.tpx);
            if (object.tpy != null)
                message.tpy = Number(object.tpy);
            if (object.updown != null)
                message.updown = String(object.updown);
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
            if (!options)
                options = {};
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
            if (message.agentType != null && message.hasOwnProperty("agentType"))
                object.agentType = message.agentType;
            if (message.mpx != null && message.hasOwnProperty("mpx"))
                object.mpx = options.json && !isFinite(message.mpx) ? String(message.mpx) : message.mpx;
            if (message.mpy != null && message.hasOwnProperty("mpy"))
                object.mpy = options.json && !isFinite(message.mpy) ? String(message.mpy) : message.mpy;
            if (message.life != null && message.hasOwnProperty("life"))
                object.life = message.life;
            if (message.groupKill != null && message.hasOwnProperty("groupKill"))
                object.groupKill = message.groupKill;
            if (message.isHero != null && message.hasOwnProperty("isHero"))
                object.isHero = message.isHero;
            if (message.rot != null && message.hasOwnProperty("rot"))
                object.rot = options.json && !isFinite(message.rot) ? String(message.rot) : message.rot;
            if (message.attackDura != null && message.hasOwnProperty("attackDura"))
                object.attackDura = options.json && !isFinite(message.attackDura) ? String(message.attackDura) : message.attackDura;
            if (message.aid != null && message.hasOwnProperty("aid"))
                object.aid = message.aid;
            if (message.innerId != null && message.hasOwnProperty("innerId"))
                object.innerId = message.innerId;
            if (message.role != null && message.hasOwnProperty("role"))
                object.role = message.role;
            if (message.objectId != null && message.hasOwnProperty("objectId"))
                object.objectId = message.objectId;
            if (message.actType != null && message.hasOwnProperty("actType"))
                object.actType = message.actType;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = options.json && !isFinite(message.size) ? String(message.size) : message.size;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            if (message.epx != null && message.hasOwnProperty("epx"))
                object.epx = options.json && !isFinite(message.epx) ? String(message.epx) : message.epx;
            if (message.epy != null && message.hasOwnProperty("epy"))
                object.epy = options.json && !isFinite(message.epy) ? String(message.epy) : message.epy;
            if (message.eid != null && message.hasOwnProperty("eid"))
                object.eid = message.eid;
            if (message.esize != null && message.hasOwnProperty("esize"))
                object.esize = options.json && !isFinite(message.esize) ? String(message.esize) : message.esize;
            if (message.tpx != null && message.hasOwnProperty("tpx"))
                object.tpx = options.json && !isFinite(message.tpx) ? String(message.tpx) : message.tpx;
            if (message.tpy != null && message.hasOwnProperty("tpy"))
                object.tpy = options.json && !isFinite(message.tpy) ? String(message.tpy) : message.tpy;
            if (message.updown != null && message.hasOwnProperty("updown"))
                object.updown = message.updown;
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
    })();

    AcWar.Info = (function() {

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
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
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
            if (!writer)
                writer = $Writer.create();
            if (message.base != null && message.base.length)
                for (var i = 0; i < message.base.length; ++i)
                    $root.AcWar.Agent.encode(message.base[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.fort != null && message.fort.length)
                for (var i = 0; i < message.fort.length; ++i)
                    $root.AcWar.Agent.encode(message.fort[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.agent != null && message.agent.length)
                for (var i = 0; i < message.agent.length; ++i)
                    $root.AcWar.Agent.encode(message.agent[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.bullet != null && message.bullet.length)
                for (var i = 0; i < message.bullet.length; ++i)
                    $root.AcWar.Agent.encode(message.bullet[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.rollLog != null && message.rollLog.length)
                for (var i = 0; i < message.rollLog.length; ++i)
                    $root.AcWar.Agent.encode(message.rollLog[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AcWar.Info();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.base && message.base.length))
                        message.base = [];
                    message.base.push($root.AcWar.Agent.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.fort && message.fort.length))
                        message.fort = [];
                    message.fort.push($root.AcWar.Agent.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.agent && message.agent.length))
                        message.agent = [];
                    message.agent.push($root.AcWar.Agent.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.bullet && message.bullet.length))
                        message.bullet = [];
                    message.bullet.push($root.AcWar.Agent.decode(reader, reader.uint32()));
                    break;
                case 5:
                    if (!(message.rollLog && message.rollLog.length))
                        message.rollLog = [];
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.base != null && message.hasOwnProperty("base")) {
                if (!Array.isArray(message.base))
                    return "base: array expected";
                for (var i = 0; i < message.base.length; ++i) {
                    var error = $root.AcWar.Agent.verify(message.base[i]);
                    if (error)
                        return "base." + error;
                }
            }
            if (message.fort != null && message.hasOwnProperty("fort")) {
                if (!Array.isArray(message.fort))
                    return "fort: array expected";
                for (var i = 0; i < message.fort.length; ++i) {
                    var error = $root.AcWar.Agent.verify(message.fort[i]);
                    if (error)
                        return "fort." + error;
                }
            }
            if (message.agent != null && message.hasOwnProperty("agent")) {
                if (!Array.isArray(message.agent))
                    return "agent: array expected";
                for (var i = 0; i < message.agent.length; ++i) {
                    var error = $root.AcWar.Agent.verify(message.agent[i]);
                    if (error)
                        return "agent." + error;
                }
            }
            if (message.bullet != null && message.hasOwnProperty("bullet")) {
                if (!Array.isArray(message.bullet))
                    return "bullet: array expected";
                for (var i = 0; i < message.bullet.length; ++i) {
                    var error = $root.AcWar.Agent.verify(message.bullet[i]);
                    if (error)
                        return "bullet." + error;
                }
            }
            if (message.rollLog != null && message.hasOwnProperty("rollLog")) {
                if (!Array.isArray(message.rollLog))
                    return "rollLog: array expected";
                for (var i = 0; i < message.rollLog.length; ++i) {
                    var error = $root.AcWar.Agent.verify(message.rollLog[i]);
                    if (error)
                        return "rollLog." + error;
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
            if (object instanceof $root.AcWar.Info)
                return object;
            var message = new $root.AcWar.Info();
            if (object.base) {
                if (!Array.isArray(object.base))
                    throw TypeError(".AcWar.Info.base: array expected");
                message.base = [];
                for (var i = 0; i < object.base.length; ++i) {
                    if (typeof object.base[i] !== "object")
                        throw TypeError(".AcWar.Info.base: object expected");
                    message.base[i] = $root.AcWar.Agent.fromObject(object.base[i]);
                }
            }
            if (object.fort) {
                if (!Array.isArray(object.fort))
                    throw TypeError(".AcWar.Info.fort: array expected");
                message.fort = [];
                for (var i = 0; i < object.fort.length; ++i) {
                    if (typeof object.fort[i] !== "object")
                        throw TypeError(".AcWar.Info.fort: object expected");
                    message.fort[i] = $root.AcWar.Agent.fromObject(object.fort[i]);
                }
            }
            if (object.agent) {
                if (!Array.isArray(object.agent))
                    throw TypeError(".AcWar.Info.agent: array expected");
                message.agent = [];
                for (var i = 0; i < object.agent.length; ++i) {
                    if (typeof object.agent[i] !== "object")
                        throw TypeError(".AcWar.Info.agent: object expected");
                    message.agent[i] = $root.AcWar.Agent.fromObject(object.agent[i]);
                }
            }
            if (object.bullet) {
                if (!Array.isArray(object.bullet))
                    throw TypeError(".AcWar.Info.bullet: array expected");
                message.bullet = [];
                for (var i = 0; i < object.bullet.length; ++i) {
                    if (typeof object.bullet[i] !== "object")
                        throw TypeError(".AcWar.Info.bullet: object expected");
                    message.bullet[i] = $root.AcWar.Agent.fromObject(object.bullet[i]);
                }
            }
            if (object.rollLog) {
                if (!Array.isArray(object.rollLog))
                    throw TypeError(".AcWar.Info.rollLog: array expected");
                message.rollLog = [];
                for (var i = 0; i < object.rollLog.length; ++i) {
                    if (typeof object.rollLog[i] !== "object")
                        throw TypeError(".AcWar.Info.rollLog: object expected");
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
            if (!options)
                options = {};
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
                for (var j = 0; j < message.base.length; ++j)
                    object.base[j] = $root.AcWar.Agent.toObject(message.base[j], options);
            }
            if (message.fort && message.fort.length) {
                object.fort = [];
                for (var j = 0; j < message.fort.length; ++j)
                    object.fort[j] = $root.AcWar.Agent.toObject(message.fort[j], options);
            }
            if (message.agent && message.agent.length) {
                object.agent = [];
                for (var j = 0; j < message.agent.length; ++j)
                    object.agent[j] = $root.AcWar.Agent.toObject(message.agent[j], options);
            }
            if (message.bullet && message.bullet.length) {
                object.bullet = [];
                for (var j = 0; j < message.bullet.length; ++j)
                    object.bullet[j] = $root.AcWar.Agent.toObject(message.bullet[j], options);
            }
            if (message.rollLog && message.rollLog.length) {
                object.rollLog = [];
                for (var j = 0; j < message.rollLog.length; ++j)
                    object.rollLog[j] = $root.AcWar.Agent.toObject(message.rollLog[j], options);
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
    })();

    return AcWar;
})();

module.exports = $root;
