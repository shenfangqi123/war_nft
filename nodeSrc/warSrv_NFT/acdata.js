/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

//var $protobuf = require("./protobuf.js");
var protobuf = require('protobufjs');
var $protobuf = protobuf;

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

    AcWar.AcwarMessage = (function() {

        /**
         * Properties of an AcwarMessage.
         * @memberof AcWar
         * @interface IAcwarMessage
         * @property {number|null} [id] AcwarMessage id
         * @property {string|null} [name] AcwarMessage name
         */

        /**
         * Constructs a new AcwarMessage.
         * @memberof AcWar
         * @classdesc Represents an AcwarMessage.
         * @implements IAcwarMessage
         * @constructor
         * @param {AcWar.IAcwarMessage=} [properties] Properties to set
         */
        function AcwarMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AcwarMessage id.
         * @member {number} id
         * @memberof AcWar.AcwarMessage
         * @instance
         */
        AcwarMessage.prototype.id = 0;

        /**
         * AcwarMessage name.
         * @member {string} name
         * @memberof AcWar.AcwarMessage
         * @instance
         */
        AcwarMessage.prototype.name = "";

        /**
         * Creates a new AcwarMessage instance using the specified properties.
         * @function create
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {AcWar.IAcwarMessage=} [properties] Properties to set
         * @returns {AcWar.AcwarMessage} AcwarMessage instance
         */
        AcwarMessage.create = function create(properties) {
            return new AcwarMessage(properties);
        };

        /**
         * Encodes the specified AcwarMessage message. Does not implicitly {@link AcWar.AcwarMessage.verify|verify} messages.
         * @function encode
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {AcWar.IAcwarMessage} message AcwarMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcwarMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified AcwarMessage message, length delimited. Does not implicitly {@link AcWar.AcwarMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {AcWar.IAcwarMessage} message AcwarMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcwarMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AcwarMessage message from the specified reader or buffer.
         * @function decode
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AcWar.AcwarMessage} AcwarMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcwarMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AcWar.AcwarMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AcwarMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AcWar.AcwarMessage} AcwarMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcwarMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AcwarMessage message.
         * @function verify
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AcwarMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates an AcwarMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AcWar.AcwarMessage} AcwarMessage
         */
        AcwarMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.AcWar.AcwarMessage)
                return object;
            var message = new $root.AcWar.AcwarMessage();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from an AcwarMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AcWar.AcwarMessage
         * @static
         * @param {AcWar.AcwarMessage} message AcwarMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AcwarMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this AcwarMessage to JSON.
         * @function toJSON
         * @memberof AcWar.AcwarMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AcwarMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AcwarMessage;
    })();

    return AcWar;
})();

module.exports = $root;