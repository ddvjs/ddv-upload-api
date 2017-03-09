module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = DdvUploadApi;
function DdvUploadApi(options) {
  if (!(this instanceof DdvUploadApi)) {
    return new DdvUploadApi(options);
  } else {
    return this.constructor(options);
  }
}
// 提供外部设定api
DdvUploadApi.setApi = function (fn) {
  DdvUploadApi.api = fn;
};
// 设定继承
if (!DdvUploadApi.prototype) {
  DdvUploadApi.prototype = {};
}
// 合并继承
Object.assign(DdvUploadApi.prototype, __webpack_require__(3));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var util = module.exports = {
  // 把对象中所以驼峰的key转小写下滑杠
  upperCaseToUnderlineByObj: function upperCaseToUnderlineByObj(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
      var keyt, key, value;
      for (key in obj) {
        value = util.upperCaseToUnderlineByObj(obj[key]);
        keyt = typeof key === 'string' ? util.upperCaseToUnderline(key) : key;
        delete obj[key];
        obj[keyt] = value;
      }
    }
    return obj;
  },
  // 驼峰单纯转小写下滑杠
  upperCaseToUnderline: function upperCaseToUnderline(str) {
    return str.toString().replace(/([A-Z])/g, function (a) {
      return '_' + (a || '').toLowerCase();
    });
  },
  // 驼峰单纯转小写下滑杠
  underlineToUpperCase: function underlineToUpperCase(str) {
    return str.toString().replace(/(_[a-zA-Z0-9]{1})/g, function (a) {
      return (a.substr(1) || '').toUpperCase();
    });
  },
  // 设置错误id
  setErrorId: function setErrorId(errorId, error) {
    error.errorId = errorId;
    error.error_id = errorId;
    return error;
  },
  // 参数强转数组
  argsToArray: function argsToArray(args) {
    return Array.prototype.slice.call(args);
  },

  // 判断是一个方法
  isFunction: function isFunction(fn) {
    return typeof fn === 'function';
  },

  // 类似php里面的inArray
  inArray: function inArray(a, b) {
    if (!util.isArray(b)) {
      return false;
    }
    for (var i in b) {
      if (b[i] === a) {
        return true;
      }
    }
    return false;
  },
  // 判断是否为一个数组
  isArray: function isArray() {
    return Array.isArray.apply(this, arguments);
  },
  isNumber: function isNumber(obj) {
    return (typeof obj === 'string' || typeof obj === 'number') && !util.isArray(obj) && obj - parseFloat(obj) >= 0;
  },

  // 判断是否一个标准的global
  isGlobal: function isGlobal(obj) {
    return obj !== void 0 && obj === obj.global;
  },

  // 克隆
  clone: function clone(myObj) {
    var i, myNewObj;
    if (!(myObj && (typeof myObj === 'undefined' ? 'undefined' : _typeof(myObj)) === 'object')) {
      return myObj;
    }
    if (myObj === null || myObj === undefined) {
      return myObj;
    }
    myNewObj = '';
    if (Array.isArray(myObj)) {
      myNewObj = [];
      for (i = 0; i < myObj.length; i++) {
        myNewObj.push(myObj[i]);
      }
    } else if ((typeof myObj === 'undefined' ? 'undefined' : _typeof(myObj)) === 'object') {
      myNewObj = {};
      if (myObj.constructor && myObj.constructor !== Object) {
        myNewObj = myObj;
        // 防止克隆ie下克隆  Element 出问题
      } else if (myObj.innerHTML !== undefined && myObj.innerText !== undefined && myObj.tagName !== undefined && myObj.tabIndex !== undefined) {
        myNewObj = myObj;
      } else {
        for (i in myObj) {
          myNewObj[i] = clone(myObj[i]);
        }
      }
    }
    return myNewObj;
  }

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 编码库

var cryptoJsCore = __webpack_require__(0);
__webpack_require__(7);
__webpack_require__(8);
var util = __webpack_require__(2);
var api = __webpack_require__(1);
var getSign = __webpack_require__(5);
var sendUploadPart = __webpack_require__(6);
var eventNames = 'beforeSign completeSign progress progressSign progressUpload complete error success'.split(' ');
module.exports = {
  constructor: function constructor(options) {
    // 初始化事件
    this.optionsInit(options);
    return this.runInit();
  },
  optionsInit: function optionsInit(options) {
    var key, value, tkey;
    for (key in options) {
      value = options[key];
      tkey = key.substr(2, 1).toLowerCase() + key.substr(3);
      if (!key) continue;
      if (eventNames.indexOf(key) > -1) {
        if (util.isFunction(value)) {
          this['on' + key.substr(0, 1).toUpperCase() + key.substr(1)] = value;
        }
      } else if (eventNames.indexOf(tkey) > -1) {
        if (util.isFunction(value)) {
          this[key] = value;
        }
      } else {
        this[key] = options[key];
      }
    }
    key = value = tkey = options = void 0;
  },
  runInit: function runInit() {
    var self = this;
    var _promise = new Promise(function (resolve, reject) {
      self.useUnderline = self.useUnderline === void 0 ? false : self.useUnderline;
      // 默认没有中断
      self._isAbort = false;
      // 文件信息
      self._fileInfo = {};
      // 获取文件大小
      self._fileInfo.fileSize = self.file.size;
      // 获取文件类型
      self._fileInfo.fileType = self.file.type;
      // 上传进度反馈
      self._onUploadPartProgressArray = {};
      // 运行程序
      self.run().then(resolve, reject);
      // 回收
      resolve = reject = void 0;
    })
    // 上传进度触发
    .then(function () {
      return self.onProgressUploadEmit();
    })
    // 完成 - 在成功的时候的参数传回去
    .then(function uploadResolveRun() {
      self._fileInfo.status = 'uploadResolve';
      var fileInfo = util.clone(self._fileInfo);
      return self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo;
    });
    setTimeout(function () {
      // 回收
      _promise = void 0;
    }, 0);
    // 错误事件
    if (this.onError && util.isFunction(this.onError)) {
      _promise.catch(this.onError);
      delete this.onError;
    }
    // 完成事件
    if (this.onComplete && util.isFunction(this.onComplete)) {
      _promise.then(this.onComplete);
      delete this.onComplete;
    } else if (this.onSuccess && util.isFunction(this.onSuccess)) {
      _promise.then(this.onSuccess);
      delete this.onSuccess;
    }
    // 返回一个 Promise
    return _promise;
  },
  run: function run() {
    var self = this;
    return new Promise(function (resolve, reject) {
      // 设备类型
      self._fileInfo.deviceType = self.deviceType || 'html5';
      if (util.isFunction(api.api)) {
        resolve();
      } else {
        reject(util.setErrorId('NOT_SET_API_METHOD', new Error('Please set the Api request method')));
      }
    })
    // 获取分开大小
    .then(function getPartSizeRun() {
      var fileInfo = util.clone(self._fileInfo);
      var _promise = self.getPartSize(self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo);
      if (_promise instanceof Promise) {
        return _promise;
      } else {
        return Promise.reject(util.setErrorId('GET_PART_SIZE_RETURN_PROMISE', new Error('options.getPartSize does not return Promise')));
      }
    }).then(function checkPartSize(partSize) {
      if (!partSize.part_size) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_SIZE_ERROR', new Error('server return part_size error')));
      }
      if (!partSize.part_sum) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_SUM_ERROR', new Error('server return part_sum error')));
      }

      self._fileInfo.partSize = partSize.partSize || partSize.part_size;
      self._fileInfo.partSum = partSize.partSum || partSize.part_sum;
    }).then(function getFileSignRun() {
      return getSign({
        file: self.file,
        onBefore: function onBefore(res) {
          return Promise.resolve().then(function onBeforeSignEmit() {
            if (util.isFunction(self.onBeforeSign)) {
              return self.onBeforeSign(self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res));
            }
          }).then(function returnRes() {
            return res;
          });
        },
        onComplete: function onComplete(res) {
          return Promise.resolve().then(function onCompleteSignEmit() {
            if (util.isFunction(self.onCompleteSign)) {
              return self.onCompleteSign(self.useUnderline ? util.upperCaseToUnderlineByObj(util.clone(res)) : util.clone(res));
            }
          }).then(function returnRes() {
            return res;
          });
        },
        switch: ['md5', 'sha1', 'crc32', 'partmd5'],
        onProgress: function onProgress(res) {
          return Promise.resolve().then(function onProgressSignEmit() {
            if (util.isFunction(self.onProgressSign)) {
              var t = util.clone(res);
              t.percent = t.progress * 100;
              return self.onProgressSign(self.useUnderline ? util.upperCaseToUnderlineByObj(t) : t);
            }
          }).then(function onProgressEmit() {
            if (util.isFunction(self.onProgress)) {
              var t = util.clone(res);
              t.type = 'sign';
              t.progress = (t.progress * 0.15).toFixed(4) * 1;
              t.percent = t.progress * 100;
              return self.onProgress(self.useUnderline ? util.upperCaseToUnderlineByObj(t) : t);
            }
          });
        }
      }).then(function (res) {
        Object.assign(self._fileInfo, res);
      });
    }).then(function getFileIdRun() {
      var key;
      var fileInfo = util.clone(self._fileInfo);

      fileInfo.manageType = self.manageType || 'anonymous';
      fileInfo.directory = self.directory || 'common/other';
      fileInfo.authType = self.authType || 'unknown';
      for (key in fileInfo) {
        if (typeof fileInfo[key] !== 'string' && typeof fileInfo[key] !== 'number' && typeof fileInfo[key] !== 'boolean') {
          delete fileInfo[key];
        }
        if (key === 'lastModified') {
          fileInfo[key] = parseInt(fileInfo[key] / 1000);
        }
      }
      var _promise = self.getFileId(self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo);
      if (_promise instanceof Promise) {
        return _promise;
      } else {
        return Promise.reject(util.setErrorId('GET_FILE_ID_RETURN_PROMISE', new Error('options.getFileId does not return Promise')));
      }
    }).then(function getFileIdCheck(res) {
      res = util.clone(res);
      var keyt, key, value;
      for (key in res) {
        value = res[key];
        // 转驼峰
        keyt = util.underlineToUpperCase(key);
        if (keyt !== key) {
          delete res[key];
          res[keyt] = value;
        }
      }

      // 状态为检测返回信息
      self._fileInfo.status = 'checkFileId';
      // 用户取消上传
      if (self._isAbort === true) {
        return getSign.getAbortError();
      }
      if (!res.fileId) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_Id_ERROR', new Error('server return fileId error')));
      }
      if (!res.fileCrc32) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_CRC32_ERROR', new Error('server return fileCrc32 error')));
      }
      if (!res.fileMd5) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_MD5_ERROR', new Error('server return fileMd5 error')));
      }
      if (!res.fileSha1) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_SHA1_ERROR', new Error('server return fileSha1 error')));
      }
      if (!res.url) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_URL_ERROR', new Error('server return url error')));
      }
      self._fileInfo.url = res.url;
      self._fileInfo.fileId = res.fileId;
      self._fileInfo.fileCrc32 = res.fileCrc32;
      self._fileInfo.fileMd5 = res.fileMd5;
      self._fileInfo.fileSha1 = res.fileSha1;
      self._fileInfo.isUploadEnd = res.isUploadEnd || false;
      if (!res.isUploadEnd) {
        return self.uploadRun();
      }
    });
  },
  uploadRun: function uploadRun() {
    var self = this;
    return Promise.resolve().then(function getFilePartInfoRun() {
      self._fileInfo.status = 'getFilePartInfoRun';
      var fileInfo = {
        fileId: self._fileInfo.fileId,
        fileCrc32: self._fileInfo.fileCrc32,
        fileMd5: self._fileInfo.fileMd5,
        fileSha1: self._fileInfo.fileSha1
      };
      var _promise = self.getFilePartInfo(self.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo);
      if (_promise instanceof Promise) {
        return _promise;
      } else {
        return Promise.reject(util.setErrorId('GET_FILE_PART_INFO_RETURN_PROMISE', new Error('options.getFilePartInfo does not return Promise')));
      }
    }).then(function getFilePartInfoCheck(res) {
      self._fileInfo.status = 'getFilePartInfoCheck';
      res = util.clone(res);
      var keyt, key, value;
      for (key in res) {
        value = res[key];
        // 转驼峰
        keyt = util.underlineToUpperCase(key);
        if (keyt !== key) {
          delete res[key];
          res[keyt] = value;
        }
      }
      // 状态为签名前
      self._fileInfo.status = 'checkFilePartInfo';
      // 用户取消上传
      if (self._isAbort === true) {
        return getSign.getAbortError();
      }
      if (!res.fileSize) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_FILE_SIZE_ERROR', new Error('server return fileSize error')));
      }
      if (!res.partSize) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_CRC32_ERROR', new Error('server return partSize error')));
      }
      if (!res.doneParts || !util.isArray(res.doneParts)) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_DOME_PARTS_ERROR', new Error('server return doneParts error')));
      }
      if (!res.partSum) {
        return Promise.reject(util.setErrorId('SERVER_RETURN_PART_SUM_ERROR', new Error('server return partSum error')));
      }
      self._fileInfo.fileSize = parseFloat(res.fileSize);
      self._fileInfo.partSize = parseFloat(res.partSize);
      self._fileInfo.doneParts = res.doneParts;
      self._fileInfo.partSum = parseFloat(res.partSum);
      self._fileInfo.partNow = 0;
      self._fileInfo.uploadSizeComplete = 0;
      self._fileInfo.isUploadEnd = res.isUploadEnd || self._fileInfo.isUploadEnd || false;
      if (!res.isUploadEnd) {
        return self.uploadPart();
      }
    });
  },
  uploadPart: function uploadPart() {
    var self = this;
    return Promise.resolve().then(function () {
      self._fileInfo.status = 'uploadPart';
      self._fileInfo.partNow = self._fileInfo.partNow === void 0 ? -1 : self._fileInfo.partNow;
      while (++self._fileInfo.partNow <= self._fileInfo.partSum) {
        if (self._fileInfo.partNow === 0 || util.inArray(self._fileInfo.partNow, self._fileInfo.doneParts)) {
          continue;
        }
        return self.uploadPartRun();
      }
      return self.completeUploadSubmit();
    });
  },
  uploadPartRun: function uploadPartRun() {
    var self = this;
    return this.uploadPartFile(this._fileInfo.partNow).then(function () {
      return self.uploadPart();
    });
  },
  uploadPartFile: function uploadPartFile(partNum) {
    var self = this;
    // 状态为签名前
    this._fileInfo.status = 'uploadPartFile';
    // 用户取消上传
    if (this._isAbort === true) {
      return getSign.getAbortError();
    }
    return new Promise(function (resolve, reject) {
      var readSizePos, readSizeEnd, blobSlice;
      // 计算切片起点 (当前块-1)*分块大小
      readSizePos = self._fileInfo.partSize * (partNum - 1);
      // 结尾
      readSizeEnd = Math.min(readSizePos + self._fileInfo.partSize, self._fileInfo.fileSize);

      // 切片
      if (self.file.slice) {
        blobSlice = self.file.slice(readSizePos, readSizeEnd);
      } else if (self.file.webkitSlice) {
        blobSlice = self.file.webkitSlice(readSizePos, readSizeEnd);
      }
      // self.file_info.part_now
      /* global FileReader:true */
      var fileReader = new FileReader();
      // 文件读取后的处理
      fileReader.onload = function (res) {
        self._fileInfo.status = 'progressiveReadNextRunEnd';
        resolve({
          fileInfo: {
            partNumber: partNum,
            partLength: readSizeEnd - readSizePos
          },
          file: res
        });
      };
      fileReader.onerror = function (e) {
        self._fileInfo.status = 'getUploadPartMd5Error';
        reject(util.setErrorId('LOAD_FILE_ERROR', e));
      };
      // 开始读流
      try {
        fileReader.readAsArrayBuffer(blobSlice);
      } catch (e) {
        reject(util.setErrorId('LOAD_FILE_ERROR', e));
      }
    }).then(function getFilePartMd5AndFileInfoRun(res) {
      var contentMd5 = cryptoJsCore.MD5(getSign.arrayBufferToWordArray(res.file.target.result)).toString(cryptoJsCore.enc.Base64);
      var fileInfo = res.fileInfo;
      fileInfo.contentMd5 = contentMd5;
      fileInfo.md5Base64 = fileInfo.contentMd5;
      Object.assign(fileInfo, {
        deviceType: self._fileInfo.deviceType,
        fileId: self._fileInfo.fileId,
        fileCrc32: self._fileInfo.fileCrc32,
        fileMd5: self._fileInfo.fileMd5,
        fileSha1: self._fileInfo.fileSha1
      });
      return { fileInfo: fileInfo, rawData: res.file.target.result };
    }).then(function getFilePartMd5All(res) {
      return Promise.resolve().then(function getFilePartMd5Run() {
        var _promise = self.getFilePartSign(self.useUnderline ? util.upperCaseToUnderlineByObj(res.fileInfo) : res.fileInfo);
        if (_promise instanceof Promise) {
          return _promise;
        } else {
          return Promise.reject(util.setErrorId('GET_FILE_PART_SIGN_RETURN_PROMISE', new Error('options.getFilePartSign does not return Promise')));
        }
      }).then(function getFilePartMd5Check(data) {
        if (!data.url) {
          return Promise.reject(util.setErrorId('SERVER_RETURN_URL_ERROR', new Error('server return url error')));
        }
        if (!data.method) {
          return Promise.reject(util.setErrorId('SERVER_RETURN_METHOD_ERROR', new Error('server return method error')));
        }
        if (!data.headers) {
          return Promise.reject(util.setErrorId('SERVER_RETURN_HEADERS_ERROR', new Error('server return headers error')));
        }
        return {
          data: data,
          rawData: res.rawData
        };
      });
    }).then(function sendUploadPartRun(res) {
      self._fileInfo.status = 'sendUploadPart';
      return sendUploadPart(res.data, res.rawData, function onUploadPartProgress(progress) {
        if (self._onUploadPartProgressArray) {
          self._onUploadPartProgressArray[partNum] = progress;
        }
        return self.onProgressUploadEmit();
      }).catch(function sendUploadPartCatch(e) {
        if (self._onUploadPartProgressArray) {
          delete self._onUploadPartProgressArray[partNum];
        }
        return Promise.reject(e);
      }).then(function sendUploadPartCb() {
        self._fileInfo.doneParts.push(partNum);
        if (self._onUploadPartProgressArray[partNum] !== 1) {
          delete self._onUploadPartProgressArray[partNum];
          return self.onProgressUploadEmit();
        } else {
          delete self._onUploadPartProgressArray[partNum];
        }
      });
    });
  },
  onProgressUploadEmit: function onProgressUploadEmit(progress) {
    if (this._fileInfo) {
      if (this._fileInfo.isUploadEnd) {
        progress = 1;
      } else if (!progress) {
        progress = (util.isArray(this._fileInfo.doneParts) ? this._fileInfo.doneParts.length : 0) / this._fileInfo.partSum;
        if (this._onUploadPartProgressArray) {
          var t, key;
          t = this._onUploadPartProgressArray;
          for (key in t) {
            progress += (t[key] || 0) / this._fileInfo.partSum;
          }
        }
      }
    }
    var self = this;
    var res;
    res = {};
    res.status = this._fileInfo.status;
    res.progress = (progress || 0).toFixed(4) * 1 || 0;
    return Promise.resolve().then(function onProgressSignEmit() {
      if (util.isFunction(self.onProgressUpload)) {
        var t = util.clone(res);
        t.percent = t.progress * 100;
        return self.onProgressUpload(self.useUnderline ? util.upperCaseToUnderlineByObj(t) : t);
      }
    }).then(function onProgressEmit() {
      if (util.isFunction(self.onProgress)) {
        var t = util.clone(res);
        t.type = 'upload';
        t.progress = (t.progress * 0.85 + 0.15).toFixed(4) * 1;
        t.percent = t.progress * 100;
        return self.onProgress(self.useUnderline ? util.upperCaseToUnderlineByObj(t) : t);
      }
    });
  },
  // 合并上传提交
  completeUploadSubmit: function completeUploadSubmit() {
    this._fileInfo.status = 'completeUpload';
    var fileInfo = {
      fileId: this._fileInfo.fileId,
      fileCrc32: this._fileInfo.fileCrc32,
      fileMd5: this._fileInfo.fileMd5,
      fileSha1: this._fileInfo.fileSha1
    };
    var _promise = this.completeUpload(this.useUnderline ? util.upperCaseToUnderlineByObj(fileInfo) : fileInfo);
    if (_promise instanceof Promise) {
      return _promise;
    } else {
      return Promise.reject(util.setErrorId('COMPLETE_UPLOAD_RETURN_PROMISE', new Error('options.completeUpload does not return Promise')));
    }
  },
  // 合并上传
  completeUpload: function completeUpload(fileInfo) {
    return api.api(this.completeUploadUrl || 'v1_0/upload/complete').method(this.completeUploadMethod || 'POST').send(fileInfo).then(function (res) {
      return res && res.data || {};
    });
  },
  // 获取上传文件分块信息
  getFilePartSign: function getFilePartSign(fileInfo) {
    return api.api(this.getFilePartSignUrl || 'v1_0/upload/file_part_md5').method(this.getFilePartSignMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {};
    });
  },
  // 获取上传文件分块信息
  getFilePartInfo: function getFilePartInfo(fileInfo) {
    return api.api(this.getFilePartInfoUrl || 'v1_0/upload/file_part_info').method(this.getFilePartInfoMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {};
    });
  },
  // 获取上传文件id
  getFileId: function getFileId(fileInfo) {
    return api.api(this.getFileIdUrl || 'v1_0/upload/file_id').method(this.getFileIdMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {};
    });
  },
  // 获取上传文件分块大小
  getPartSize: function getPartSize(fileInfo) {
    return api.api(this.getPartSizeUrl || 'v1_0/upload/file_part_size').method(this.getPartSizeMethod || 'PUT').send(fileInfo).then(function (res) {
      return res && res.data || {};
    });
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = crc32;
function crc32( /* Uint8Array */uint8Array, /* Number */crc) {
  if (crc === void 0) crc = 0;
  if (crc === true) {
    return decimalToHexString(uint8Array);
  }

  var n = 0; // a number between 0 and 255

  crc = crc ^ -1;
  for (var i = 0, iTop = uint8Array.byteLength; i < iTop; i++) {
    n = (crc ^ uint8Array[i]) & 0xFF;
    crc = crc >>> 8 ^ table[n];
  }
  return crc ^ -1;
} /* Number */
var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];

function decimalToHexString(number) {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return number.toString(16);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = GetSign;
// 工具
var util = __webpack_require__(2);
var crc32 = __webpack_require__(4);
// 编码库
var cryptoJsCore = __webpack_require__(0);
// 事件
var eventNames = 'before complete progress error complete'.split(' ');
// 获取签名
function GetSign(options) {
  if (this instanceof GetSign) {
    return this.constructor(options);
  } else {
    return new GetSign(options);
  }
}

// 合并继承
Object.assign(GetSign.prototype, {
  constructor: function constructor(options) {
    // 初始化事件
    this.optionsInit(options);
    return this.runInit();
  },
  optionsInit: function optionsInit(options) {
    var key, value, tkey;
    for (key in options) {
      value = options[key];
      tkey = key.substr(2, 1).toLowerCase() + key.substr(3);
      if (!key) continue;
      if (eventNames.indexOf(key) > -1) {
        if (util.isFunction(value)) {
          this['on' + key.substr(0, 1).toUpperCase() + key.substr(1)] = value;
        }
      } else if (eventNames.indexOf(tkey) > -1) {
        if (util.isFunction(value)) {
          this[key] = value;
        }
      } else {
        this[key] = options[key];
      }
    }
    key = value = tkey = options = void 0;
  },
  runInit: function runInit() {
    var self = this;
    var _promise = new Promise(function (resolve, reject) {
      // 默认没有中断
      self.signIsAbort = false;
      // 签名信息
      self.sign = {};
      // 文件信息
      self.signFileInfo = {};
      // 上传完成
      self.signResolve = resolve;
      // 上传失败
      self.signReject = reject;
      // 运行程序
      self.run();
      // 回收
      resolve = reject = void 0;
    });
    setTimeout(function () {
      // 回收
      _promise = void 0;
    }, 0);
    // 错误事件
    if (self.onError && util.isFunction(self.onError)) {
      _promise.catch(self.onError);
      delete self.onError;
    }
    // 完成事件
    if (self.onComplete && util.isFunction(self.onComplete)) {
      _promise.then(self.onComplete);
      delete self.onComplete;
    }
    // 返回一个 Promise
    return _promise;
  },
  run: function run() {
    var self = this;
    this.initCheck().then(function onBeforeRun() {
      // 如果存在签名前操作
      if (util.isFunction(self.onBefore)) {
        // 运行签名前
        var res = self.onBefore(self.signFileInfo);
        if (res === false) {
          // 返回中断
          return GetSign.getAbortError();
        } else if (res instanceof Promise) {
          // 返回承诺
          return res;
        }
      }
    }).then(function initSwitchRun() {
      // 用户取消上传
      if (self.signIsAbort === true) {
        return GetSign.getAbortError();
      }
      return self.initSwitch();
    }).then(function Run() {
      // 用户取消上传
      if (self.signIsAbort === true) {
        return GetSign.getAbortError();
      }
      return self.Run();
    }).then(function progressiveReadRun() {
      return self.progressiveRead();
    }).then(function progressiveReadDoneRun() {
      return self.progressiveReadDone();
    }).then(function returnRes() {
      return self.signFileInfo;
    }).catch(function (e) {
      // 用户取消上传
      if (self.signIsAbort === true) {
        return GetSign.getAbortError();
      }
      return Promise.reject(e);
    }).then(self.signResolve, self.signReject);
  },
  // 完成
  progressiveReadDone: function progressiveReadDone(res) {
    var i, len, key;
    this.signIsProgressiveReadDone = true;
    this.status = 'readFileDone';
    this.signFileInfo.endTime = new Date();
    this.signFileInfo.signTime = this.signFileInfo.endTime - this.signFileInfo.startTime;

    if (this.signIsPartMd5) {
      this.signPartMd5Upper = cryptoJsCore.MD5(this.signPartMd5.toUpperCase()).toString(cryptoJsCore.enc.Hex);
      this.signPartMd5Lower = cryptoJsCore.MD5(this.signPartMd5.toLowerCase()).toString(cryptoJsCore.enc.Hex);
      this.signPartMd5Upper = (this.signPartMd5Upper + '-' + this.signPartMd5Length.toString()).toUpperCase();
      this.signPartMd5Lower = (this.signPartMd5Lower + '-' + this.signPartMd5Length.toString()).toUpperCase();

      this.signFileInfo.filePartMd5Upper = this.signPartMd5Upper;
      this.signFileInfo.filePartMd5Lower = this.signPartMd5Lower;
    }
    // 其它加密信息
    i = 0;
    len = this.signEnabledAlgo.length;
    for (i = 0; i < len; i++) {
      key = this.signEnabledAlgo[i].name.toLowerCase();
      if (key && key.length > 0) {
        key = key.substr(0, 1).toUpperCase() + key.substr(1);
      }
      this.signFileInfo['file' + key] = this.signEnabledAlgo[i].instance.finalize().toString(cryptoJsCore.enc.Hex).toUpperCase();
    }
    // crc32
    if (this.signIsCrc32) {
      this.signFileInfo.fileCrc32 = crc32(this.signCrc32intermediate, true).toUpperCase();
    }
  },
  // 运行哈希签名
  progressiveReadHashWork: function progressiveReadHashWork(res) {
    var i, len, WordArrayData, arrayBufferData;
    arrayBufferData = res.target.result;

    if (this.signEnabledAlgo && this.signEnabledAlgo.length > 0) {
      WordArrayData = GetSign.arrayBufferToWordArray(arrayBufferData);
    }

    if (this.signIsPartMd5) {
      this.signPartMd5Length++;
      this.signPartMd5 += cryptoJsCore.MD5(WordArrayData).toString(cryptoJsCore.enc.Hex);
    }

    i = 0;
    len = this.signEnabledAlgo.length;
    for (i = 0; i < len; i++) {
      this.signEnabledAlgo[i].instance.update(WordArrayData);
    }

    // crc32
    if (this.signIsCrc32) {
      this.signCrc32intermediate = crc32(new Uint8Array(arrayBufferData), this.signCrc32intermediate);
    }
  },
  // 读取分块数据
  progressiveReadPartRun: function progressiveReadPartRun() {
    this.readSizeEnd = Math.min(this.signPos + this.partSize, this.fileSize);
    var blobSlice;
    var fileReader;
    var self = this;
    // 切片
    if (this.file.slice) {
      blobSlice = this.file.slice(this.signPos, this.readSizeEnd);
    } else if (this.file.webkitSlice) {
      blobSlice = this.file.webkitSlice(this.signPos, this.readSizeEnd);
    }
    return new Promise(function (resolve, reject) {
      /* global FileReader:true */
      fileReader = new FileReader();
      // 文件读取后的处理
      fileReader.onload = function (res) {
        self.status = 'progressiveReadNextRunEnd';
        resolve(res);
      };
      fileReader.onerror = function (e) {
        self.status = 'progressiveReadNextRunError';
        reject(util.setErrorId('LOAD_FILE_ERROR', e));
      };
      self.status = 'progressiveReadNextRunIng';
      // 开始读流
      try {
        fileReader.readAsArrayBuffer(blobSlice);
      } catch (e) {
        reject(util.setErrorId('LOAD_FILE_ERROR', e));
      }
      blobSlice = fileReader = void 0;
    }).then(function progressiveReadHashWorkRun(res) {
      // 处理数据
      return self.progressiveReadHashWork(res);
    }).then(function RogressRun() {
      self.signPos = self.readSizeEnd;
      self.signReadpos = self.signPos;
      return self.onProgressEmit();
    }).then(function progressiveReadNextCheck() {
      if (self.signPos < self.fileSize) {
        // 读取下一片
        return self.progressiveReadNext();
      }
    });
  },
  // 读取下一分块
  progressiveReadNext: function progressiveReadNext() {
    this.status = 'progressiveReadNext';
    // 用户取消上传
    if (this.signIsAbort === true) {
      return false;
    }
    return this.progressiveReadPartRun();
  },
  // 读取数据
  progressiveRead: function progressiveRead() {
    this.status = 'progressiveRead';
    this.partSize = this.partSize || 2 * 1024 * 1024; // 20KiB at a time
    this.fileSize = this.fileSize || this.signFileInfo.fileSize || 0;
    this.signPos = 0;
    return this.progressiveReadNext();
  },
  // 运行
  Run: function Run() {
    var i, current;
    for (i = 0; i < this.CryptoJSAlgo.length; i++) {
      current = this.CryptoJSAlgo[i];
      if (util.inArray(current.name.toString().toLowerCase(), this.switch)) {
        this.signEnabledAlgo.push({
          name: current.name,
          instance: current.algo.create(current.param)
        });
      }
    }
    // 分块md5
    if (this.signIsPartMd5) {
      this.signPartMd5Length = 0;
      this.signPartMd5 = '';
      this.signPartMd5Lower = '';
      this.signPartMd5Upper = '';
    }
    // Special case CRC32 as it's not part of CryptoJS and takes another input format.
    if (this.signIsCrc32) {
      this.signCrc32intermediate = 0;
    }
    // 开始时间
    this.signFileInfo.startTime = new Date();
    this.status = 'readFileing';
    return Promise.resolve();
  },
  onProgressEmit: function onProgressEmit() {
    var _promise, data;
    data = {};
    data.status = this.status;
    data.progress = (this.signReadpos / this.fileSize).toFixed(4) * 1;
    if (util.isFunction(this.onProgress, 'function')) {
      _promise = this.onProgress(data);
      if (_promise instanceof Promise) {
        return _promise;
      }
    }
  },
  initSwitch: function initSwitch() {
    var i, CryptoJSLibName;
    this.signIsCrc32 = false;
    this.signIsPartMd5 = false;
    // md5块
    var partmd5 = this.switch.indexOf('partmd5');
    if (partmd5 > -1) {
      // 清理这个
      this.switch.splice(partmd5, 1);
      this.signIsPartMd5 = true;
      if (!util.inArray('md5', this.switch)) {
        this.switch.push('md5');
      }
    }
    // md5块
    var crc32 = this.switch.indexOf('crc32');
    if (crc32 > -1) {
      // 清理这个
      this.switch.splice(crc32, 1);
      this.signIsCrc32 = true;
    }
    if (util.isArray(this.switch) && this.switch.length > 0) {
      for (i = 0; i < this.switch.length; i++) {
        if (!this.switch[i]) continue;
        CryptoJSLibName = this.switch[i].toString().toUpperCase();
        if (cryptoJsCore.algo[CryptoJSLibName]) {
          this.CryptoJSAlgo.push({
            name: CryptoJSLibName,
            algo: cryptoJsCore.algo[CryptoJSLibName],
            param: undefined
          });
        } else {
          // 用户取消上传
          if (this.signIsAbort === true) {
            return GetSign.getAbortError();
          }
          return Promise.reject(util.setErrorId('LOAD_LIB_' + CryptoJSLibName + '_ERROR', new Error('load libraries ' + CryptoJSLibName + ' error')));
        }
      }
    }
  },
  initCheck: function initCheck() {
    this.file = this.file || undefined;
    if (!GetSign.isCompatible()) {
      return Promise.reject(util.setErrorId('NOT_SUPPORT_FILEREADER_OR_BLOB', new Error('Your browser does not support FileReader Or Blob')));
    } else if (this.file === undefined || this.file === null) {
      return Promise.reject(util.setErrorId('SIGNATURE_FILE_NOT_FOUND', new Error('Signature file not found')));
    }
    try {
      // 每次读取文件多大字节 默认：20KiB at a time
      this.partSize = this.partSize || 2 * 1024 * 1024;
      // 签名数组
      this.switch = util.isArray(this.switch) ? this.switch : ['crc32', 'md5', 'sha1'];
      // 文件名称
      this.signFileInfo.fileName = this.file.name;
      // 文件类型
      this.signFileInfo.fileType = this.file.type;
      // 文件大小
      this.signFileInfo.fileSize = this.file.size;
      // 最后修改日期时间戳
      this.signFileInfo.lastModified = this.file.lastModified;
      // 最后修改日期对象
      this.signFileInfo.lastModifiedTime = this.file.lastModifiedDate;
      // 已经签名的大小
      this.signPos = 0;
      // 加密模块
      this.CryptoJSAlgo = this.CryptoJSAlgo || [];
      // 开启签名模块
      this.signEnabledAlgo = [];
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.resolve(this);
  }
});
GetSign.getAbortError = function () {
  return Promise.reject(util.setErrorId('USER_ABORT', new Error('User abort file sign')));
};
GetSign.isCompatible = function () {
  try {
    // Check for FileApi
    if (typeof FileReader === 'undefined') return false;

    // Check for Blob and slice api
    if (typeof Blob === 'undefined') return false;
  } catch (e) {
    return false;
  }
  return true;
};

GetSign.arrayBufferToWordArray = function arrayBufferToWordArray(arrayBuffer) {
  var fullWords = Math.floor(arrayBuffer.byteLength / 4);
  var bytesLeft = arrayBuffer.byteLength % 4;

  var u32 = new Uint32Array(arrayBuffer, 0, fullWords);
  var u8 = new Uint8Array(arrayBuffer);
  var pad;
  var cp = [];
  var i = 0;
  for (i = 0; i < fullWords; ++i) {
    cp.push(GetSign.swapendian32(u32[i]));
  }

  if (bytesLeft) {
    pad = 0;
    i = bytesLeft;
    for (i = bytesLeft; i > 0; --i) {
      pad = pad << 8;
      pad += u8[u8.byteLength - i];
    }
    i = 0;
    for (i = 0; i < 4 - bytesLeft; ++i) {
      pad = pad << 8;
    }

    cp.push(pad);
  }
  return cryptoJsCore.lib.WordArray.create(cp, arrayBuffer.byteLength);
};
GetSign.swapendian32 = function swapendian32(val) {
  return ((val & 0xFF) << 24 | (val & 0xFF00) << 8 | val >> 8 & 0xFF00 | val >> 24 & 0xFF) >>> 0;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = sendUploadPart;
function sendUploadPart(optionts, rawData, onProgress) {
  onProgress = typeof onProgress === 'function' ? onProgress : function () {};
  return new Promise(function (resolve, reject) {
    var xhr;

    // 创建 - 非IE6 - 第一步
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest();
    } else {
      // IE6及其以下版本浏览器
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    // 接收 - 第三步
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status;
        var statusText = xhr.statusText;
        if (status >= 200 && status < 300) {
          var serverRes = {};
          serverRes.headers = {};
          serverRes.rawHeaders = [];
          serverRes.body = xhr.response;
          serverRes.statusCode = xhr.status;
          serverRes.statusMessage = xhr.statusText;
          serverRes.status = xhr.statusText;

          var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
          headers.forEach(function (header) {
            var matches = header.match(/^([^:]+):\s*(.*)/);
            if (matches) {
              var key = matches[1].toLowerCase();
              if (key === 'set-cookie') {
                if (serverRes.headers[key] === undefined) {
                  serverRes.headers[key] = [];
                }
                serverRes.headers[key].push(matches[2]);
              } else if (serverRes.headers[key] !== undefined) {
                serverRes.headers[key] += ', ' + matches[2];
              } else {
                serverRes.headers[key] = matches[2];
              }
              serverRes.rawHeaders.push(matches[1], matches[2]);
            }
          });
          resolve(serverRes);
        } else {
          var e = new Error(statusText);
          e.statusCode = xhr.status;
          e.statusMessage = xhr.statusText;
          e.status = xhr.statusText;
          reject(e);
        }
      }
    };
    // 连接 和 发送 - 第二步
    xhr.open((optionts.method || 'GET').toUpperCase(), optionts.url, true);
    // 设置表单提交时的内容类型
    var key, value, headers;
    headers = optionts.headers;
    for (key in headers) {
      if (key.toLowerCase() === 'host' || key.toLowerCase() === 'content-length') {
        continue;
      }
      value = headers[key];
      if (Array.isArray(value)) {
        value.forEach(function (vt) {
          xhr.setRequestHeader(key, vt);
        });
      } else {
        xhr.setRequestHeader(key, headers[key]);
      }
      value = Array.isArray(value) ? value.join(' ') : value;
    }
    if (xhr.upload) {
      xhr.upload.onprogress = function (res) {
        res.loaded && onProgress((0.95 * ((res.loaded || 0) / res.total)).toFixed(4) * 1);
      };
    }
    xhr.onprogress = function (res) {
      res.loaded && onProgress((0.95 + 0.05 * ((res.loaded || 0) / res.total)).toFixed(4) * 1);
    };
    xhr.send(rawData || null);
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ })
/******/ ]);
//# sourceMappingURL=api.js.map