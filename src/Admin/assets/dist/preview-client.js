(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};
	var global_1 =
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;
	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;
	var indexedObject = fails(function () {
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);
	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString;
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}
	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var isPure = false;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.7.0',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();
	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');
	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;
	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};
	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};
	if (nativeWeakMap) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}
	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');
	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) {
	      createNonEnumerableProperty(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};
	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
	};

	var max = Math.max;
	var min$1 = Math.min;
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};
	var arrayIncludes = {
	  includes: createMethod(true),
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;
	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};
	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;
	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};
	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};
	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');
	var EmptyConstructor = function () {  };
	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null;
	  return temp;
	};
	var NullProtoObjectViaIFrame = function () {
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {  }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};
	hiddenKeys[IE_PROTO] = true;
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};
	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;
	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var f$6 = wellKnownSymbol;
	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty = objectDefineProperty.f;
	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var defineProperty$1 = objectDefineProperty.f;
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function () {
	    return fn.apply(that, arguments);
	  };
	};

	var SPECIES = wellKnownSymbol('species');
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result;
	        else if (result) switch (TYPE) {
	          case 3: return true;
	          case 5: return value;
	          case 6: return index;
	          case 2: push.call(target, value);
	        } else if (IS_EVERY) return false;
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};
	var arrayIteration = {
	  forEach: createMethod$1(0),
	  map: createMethod$1(1),
	  filter: createMethod$1(2),
	  some: createMethod$1(3),
	  every: createMethod$1(4),
	  find: createMethod$1(5),
	  findIndex: createMethod$1(6)
	};

	var $forEach = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;
	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};
	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};
	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};
	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};
	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };
	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });
	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;
	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	  if (descriptors) {
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}
	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});
	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});
	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});
	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  create: $create,
	  defineProperty: $defineProperty,
	  defineProperties: $defineProperties,
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  getOwnPropertyNames: $getOwnPropertyNames,
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    return $stringify([symbol]) != '[null]'
	      || $stringify({ a: symbol }) != '{}'
	      || $stringify(Object(symbol)) != '{}';
	  });
	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return;
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	var defineProperty$2 = objectDefineProperty.f;
	var NativeSymbol = global_1.Symbol;
	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;
	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$2(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });
	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	defineWellKnownSymbol('asyncIterator');

	defineWellKnownSymbol('iterator');

	defineWellKnownSymbol('toStringTag');

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty$3 = Object.defineProperty;
	var cache = {};
	var thrower = function (it) { throw it; };
	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };
	    if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach$1 = arrayIteration.forEach;
	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');
	var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn ) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() {  }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;
	var returnThis = function () { return this; };
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
	if ([].keys) {
	  arrayIterator = [].keys();
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}
	if (IteratorPrototype == undefined) IteratorPrototype = {};
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}
	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var returnThis$1 = function () { return this; };
	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {  }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';
	var returnThis$2 = function () { return this; };
	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);
	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };
	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }
	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    index: 0,
	    kind: kind
	  });
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');
	iterators.Arguments = iterators.Array;
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeReverse = [].reverse;
	var test = [1, 2];
	_export({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
	  reverse: function reverse() {
	    if (isArray(this)) this.length = this.length;
	    return nativeReverse.call(this);
	  }
	});

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;
	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}
	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');
	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });
	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var defineProperty$4 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$4(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	setToStringTag(global_1.JSON, 'JSON', true);

	setToStringTag(Math, 'Math', true);

	var FAILS_ON_PRIMITIVES = fails(function () { objectGetPrototypeOf(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test$1 = {};
	test$1[TO_STRING_TAG$1] = 'z';
	var toStringTagSupport = String(test$1) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {  }
	};
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');
	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;
	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject(returnMethod.call(iterator)).value;
	  }
	};

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};
	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;
	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };
	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };
	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }
	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;
	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  };
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) {  }
	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$4] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) {  }
	  return ITERATION_SUPPORT;
	};

	var SPECIES$4 = wellKnownSymbol('species');
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function (id) {
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};
	var listener = function (event) {
	  run(event.data);
	};
	var post = function (id) {
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  if (engineIsNode) {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    };
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  } else if (
	    global_1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global_1.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails(post)
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}
	var task = {
	  set: set$1,
	  clear: clear
	};

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task.set;
	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var document$2 = global_1.document;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var flush, head, last, notify, toggle, node, promise, then;
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };
	  if (!engineIsIos && !engineIsNode && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  } else if (Promise$1 && Promise$1.resolve) {
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  } else if (engineIsNode) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  } else {
	    notify = function () {
	      macrotask.call(global_1, flush);
	    };
	  }
	}
	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};
	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};
	var newPromiseCapability = {
		f: f$7
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;
	var SPECIES$5 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$2 = internalState.get;
	var setInternalState$2 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$3 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && global_1.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
	var FORCED = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    if (engineV8Version === 66) return true;
	    if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
	  }
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () {  }, function () {  });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$5] = FakePromise;
	  return !(promise.then(function () {  }) instanceof FakePromise);
	});
	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () {  });
	});
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify$1 = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};
	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$3.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};
	var onUnhandled = function (state) {
	  task$1.call(global_1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};
	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};
	var onHandleUnhandled = function (state) {
	  task$1.call(global_1, function () {
	    var promise = state.facade;
	    if (engineIsNode) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};
	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};
	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(state, true);
	};
	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};
	if (FORCED) {
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$2(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  Internal = function Promise(executor) {
	    setInternalState$2(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = engineIsNode ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(state, false);
	      return reaction.promise;
	    },
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$2(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    }, { unsafe: true });
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      fetch: function fetch(input ) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}
	_export({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});
	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);
	PromiseWrapper = getBuiltIn(PROMISE);
	_export({ target: PROMISE, stat: true, forced: FORCED }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});
	_export({ target: PROMISE, stat: true, forced:  FORCED }, {
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});
	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];
	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	var INCORRECT_NAME = nativeToString.name != TO_STRING;
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};
	var stringMultibyte = {
	  codeAt: createMethod$2(false),
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$3(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	}, function next() {
	  var state = getInternalState$3(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;
	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1) {
	    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    }
	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }
	  return _typeof(obj);
	}
	module.exports = _typeof;
	});

	var runtime_1=createCommonjsModule(function(a){
	var b=function(a){function b(a,b,c){return Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}),a[b]}function c(a,b,c,d){
	var f=b&&b.prototype instanceof e?b:e,g=Object.create(f.prototype),h=new n(d||[]);return g._invoke=j(a,c,h),g}
	function d(a,b,c){try{return {type:"normal",arg:a.call(b,c)}}catch(a){return {type:"throw",arg:a}}}
	function e(){}function f(){}function g(){}
	function h(a){["next","throw","return"].forEach(function(c){b(a,c,function(a){return this._invoke(c,a)});});}function i(a,b){function c(e,f,g,h){var i=d(a[e],a,f);if("throw"===i.type)h(i.arg);else {var j=i.arg,k=j.value;return k&&"object"===_typeof_1(k)&&r.call(k,"__await")?b.resolve(k.__await).then(function(a){c("next",a,g,h);},function(a){c("throw",a,g,h);}):b.resolve(k).then(function(a){j.value=a,g(j);},function(a){
	return c("throw",a,g,h)})}}function e(a,d){function e(){return new b(function(b,e){c(a,d,b,e);})}return f=
	f?f.then(e,
	e):e()}
	var f;this._invoke=e;}function j(a,b,c){var e="suspendedStart";return function(f,g){if("executing"===e)throw new Error("Generator is already running");if("completed"===e){if("throw"===f)throw g;
	return p()}for(c.method=f,c.arg=g;;){var h=c.delegate;if(h){var i=k(h,c);if(i){if(i===w)continue;return i}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if("suspendedStart"===e)throw e="completed",c.arg;c.dispatchException(c.arg);}else "return"===c.method&&c.abrupt("return",c.arg);e="executing";var j=d(a,b,c);if("normal"===j.type){if(e=c.done?"completed":"suspendedYield",j.arg===w)continue;return {value:j.arg,done:c.done}}"throw"===j.type&&(
	e="completed",c.method="throw",c.arg=j.arg);}}}
	function k(a,b){var c=a.iterator[b.method];if(void 0===c){if(b.delegate=null,"throw"===b.method){
	if(a.iterator["return"]&&(b.method="return",b.arg=void 0,k(a,b),"throw"===b.method))
	return w;b.method="throw",b.arg=new TypeError("The iterator does not provide a 'throw' method");}return w}var e=d(c,a.iterator,b.arg);if("throw"===e.type)return b.method="throw",b.arg=e.arg,b.delegate=null,w;var f=e.arg;if(!f)return b.method="throw",b.arg=new TypeError("iterator result is not an object"),b.delegate=null,w;if(f.done)b[a.resultName]=f.value,b.next=a.nextLoc,"return"!==b.method&&(b.method="next",b.arg=void 0);else
	return f;
	return b.delegate=null,w}
	function l(a){var b={tryLoc:a[0]};1 in a&&(b.catchLoc=a[1]),2 in a&&(b.finallyLoc=a[2],b.afterLoc=a[3]),this.tryEntries.push(b);}function m(a){var b=a.completion||{};b.type="normal",delete b.arg,a.completion=b;}function n(a){this.tryEntries=[{tryLoc:"root"}],a.forEach(l,this),this.reset(!0);}function o(a){if(a){var b=a[t];if(b)return b.call(a);if("function"==typeof a.next)return a;if(!isNaN(a.length)){var c=-1,d=function b(){for(;++c<a.length;)if(r.call(a,c))return b.value=a[c],b.done=!1,b;return b.value=void 0,b.done=!0,b};return d.next=d}}
	return {next:p}}function p(){return {value:void 0,done:!0}}var q=Object.prototype,r=q.hasOwnProperty,s="function"==typeof Symbol?Symbol:{},t=s.iterator||"@@iterator",u=s.asyncIterator||"@@asyncIterator",v=s.toStringTag||"@@toStringTag";try{b({},"");}catch(a){b=function(a,b,c){return a[b]=c};}a.wrap=c;var w={},x={};x[t]=function(){return this};var y=Object.getPrototypeOf,z=y&&y(y(o([])));z&&z!==q&&r.call(z,t)&&(x=z);var A=g.prototype=e.prototype=Object.create(x);
	return f.prototype=A.constructor=g,g.constructor=f,f.displayName=b(g,v,"GeneratorFunction"),a.isGeneratorFunction=function(a){var b="function"==typeof a&&a.constructor;return !!b&&(b===f||
	"GeneratorFunction"===(b.displayName||b.name))},a.mark=function(a){return Object.setPrototypeOf?Object.setPrototypeOf(a,g):(a.__proto__=g,b(a,v,"GeneratorFunction")),a.prototype=Object.create(A),a},a.awrap=function(a){return {__await:a}},h(i.prototype),i.prototype[u]=function(){return this},a.AsyncIterator=i,a.async=function(b,d,e,f,g){void 0===g&&(g=Promise);var h=new i(c(b,d,e,f),g);return a.isGeneratorFunction(d)?h
	:h.next().then(function(a){return a.done?a.value:h.next()})},h(A),b(A,v,"Generator"),A[t]=function(){return this},A.toString=function(){return "[object Generator]"},a.keys=function(a){var b=[];for(var c in a)b.push(c);
	return b.reverse(),function c(){for(;b.length;){var d=b.pop();if(d in a)return c.value=d,c.done=!1,c}
	return c.done=!0,c}},a.values=o,n.prototype={constructor:n,reset:function reset(a){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(m),!a)for(var b in this)
	"t"===b.charAt(0)&&r.call(this,b)&&!isNaN(+b.slice(1))&&(this[b]=void 0);},stop:function stop(){this.done=!0;var a=this.tryEntries[0],b=a.completion;if("throw"===b.type)throw b.arg;return this.rval},dispatchException:function dispatchException(a){function b(b,d){return f.type="throw",f.arg=a,c.next=b,d&&(c.method="next",c.arg=void 0),!!d}if(this.done)throw a;for(var c=this,d=this.tryEntries.length-1;0<=d;--d){var e=this.tryEntries[d],f=e.completion;if("root"===e.tryLoc)
	return b("end");if(e.tryLoc<=this.prev){var g=r.call(e,"catchLoc"),h=r.call(e,"finallyLoc");if(g&&h){if(this.prev<e.catchLoc)return b(e.catchLoc,!0);if(this.prev<e.finallyLoc)return b(e.finallyLoc)}else if(g){if(this.prev<e.catchLoc)return b(e.catchLoc,!0);}else if(!h)throw new Error("try statement without catch or finally");else if(this.prev<e.finallyLoc)return b(e.finallyLoc)}}},abrupt:function abrupt(a,b){for(var c,d=this.tryEntries.length-1;0<=d;--d)if(c=this.tryEntries[d],c.tryLoc<=this.prev&&r.call(c,"finallyLoc")&&this.prev<c.finallyLoc){var e=c;break}e&&("break"===a||"continue"===a)&&e.tryLoc<=b&&b<=e.finallyLoc&&(e=null);var f=e?e.completion:{};return f.type=a,f.arg=b,e?(this.method="next",this.next=e.finallyLoc,w):this.complete(f)},complete:function complete(a,b){if("throw"===a.type)throw a.arg;return "break"===a.type||"continue"===a.type?this.next=a.arg:"return"===a.type?(this.rval=this.arg=a.arg,this.method="return",this.next="end"):"normal"===a.type&&b&&(this.next=b),w},finish:function finish(a){for(var b,c=this.tryEntries.length-1;0<=c;--c)if(b=this.tryEntries[c],b.finallyLoc===a)return this.complete(b.completion,b.afterLoc),m(b),w},catch:function _catch(a){for(var b,c=this.tryEntries.length-1;0<=c;--c)if(b=this.tryEntries[c],b.tryLoc===a){var d=b.completion;if("throw"===d.type){var e=d.arg;m(b);}return e}
	throw new Error("illegal catch attempt")},delegateYield:function delegateYield(a,b,c){return this.delegate={iterator:o(a),resultName:b,nextLoc:c},"next"===this.method&&(this.arg=void 0),w}},a}(
	a.exports);try{regeneratorRuntime=b;}catch(a){
	Function("r","regeneratorRuntime = r")(b);}});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }
	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}
	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);
	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }
	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }
	      _next(undefined);
	    });
	  };
	}
	var asyncToGenerator = _asyncToGenerator;

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$2 }, {
	  indexOf: function indexOf(searchElement ) {
	    return NEGATIVE_ZERO
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var nativeJoin = [].join;
	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $map = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map');
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
	  map: function map(callbackfn ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	var Infinity = 1 / 0;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$1 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var pack = function (number, mantissaLength, bytes) {
	  var buffer = new Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  if (number != number || number === Infinity) {
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$1(log(number) / LN2);
	    if (number * (c = pow(2, -exponent)) < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow(2, mantissaLength);
	      exponent = exponent + eBias;
	    } else {
	      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
	  buffer[--index] |= sign * 128;
	  return buffer;
	};
	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity : Infinity;
	  } else {
	    mantissa = mantissa + pow(2, mantissaLength);
	    exponent = exponent - eBias;
	  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};
	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	var arrayFill = function fill(value ) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var defineProperty$5 = objectDefineProperty.f;
	var getInternalState$4 = internalState.get;
	var setInternalState$4 = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$2 = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$2];
	var ObjectPrototype$2 = Object.prototype;
	var RangeError$1 = global_1.RangeError;
	var packIEEE754 = ieee754.pack;
	var unpackIEEE754 = ieee754.unpack;
	var packInt8 = function (number) {
	  return [number & 0xFF];
	};
	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};
	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};
	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};
	var packFloat32 = function (number) {
	  return packIEEE754(number, 23, 4);
	};
	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};
	var addGetter = function (Constructor, key) {
	  defineProperty$5(Constructor[PROTOTYPE$2], key, { get: function () { return getInternalState$4(this)[key]; } });
	};
	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$4(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$4(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set$2 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$4(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$4(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};
	if (!arrayBufferNative) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState$4(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };
	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState$4(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState$4(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });
	    if (!descriptors) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };
	  if (descriptors) {
	    addGetter($ArrayBuffer, 'byteLength');
	    addGetter($DataView, 'buffer');
	    addGetter($DataView, 'byteLength');
	    addGetter($DataView, 'byteOffset');
	  }
	  redefineAll($DataView[PROTOTYPE$2], {
	    getInt8: function getInt8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset ) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset ) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset ) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset ) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset ) {
	      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset ) {
	      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$2(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$2(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value ) {
	      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value ) {
	      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value ) {
	      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value ) {
	      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value ) {
	      set$2(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value ) {
	      set$2(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1);
	  }) || fails(function () {
	    new NativeArrayBuffer();
	    new NativeArrayBuffer(1.5);
	    new NativeArrayBuffer(NaN);
	    return NativeArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new NativeArrayBuffer(toIndex(length));
	    };
	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$2] = NativeArrayBuffer[PROTOTYPE$2];
	    for (var keys$1 = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys$1.length > j;) {
	      if (!((key = keys$1[j++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
	      }
	    }
	    ArrayBufferPrototype.constructor = $ArrayBuffer;
	  }
	  if (objectSetPrototypeOf && objectGetPrototypeOf($DataViewPrototype) !== ObjectPrototype$2) {
	    objectSetPrototypeOf($DataViewPrototype, ObjectPrototype$2);
	  }
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataViewPrototype.setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
	    setInt8: function setInt8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var ArrayBuffer$1 = arrayBuffer[ARRAY_BUFFER$1];
	var NativeArrayBuffer$1 = global_1[ARRAY_BUFFER$1];
	_export({ global: true, forced: NativeArrayBuffer$1 !== ArrayBuffer$1 }, {
	  ArrayBuffer: ArrayBuffer$1
	});
	setSpecies(ARRAY_BUFFER$1);

	var ArrayBuffer$2 = arrayBuffer.ArrayBuffer;
	var DataView$1 = arrayBuffer.DataView;
	var nativeArrayBufferSlice = ArrayBuffer$2.prototype.slice;
	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer$2(2).slice(1, undefined).byteLength;
	});
	_export({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice !== undefined && end === undefined) {
	      return nativeArrayBufferSlice.call(anObject(this), start);
	    }
	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var result = new (speciesConstructor(this, ArrayBuffer$2))(toLength(fin - first));
	    var viewSource = new DataView$1(this);
	    var viewTarget = new DataView$1(result);
	    var index = 0;
	    while (first < fin) {
	      viewTarget.setUint8(index++, viewSource.getUint8(first++));
	    } return result;
	  }
	});

	var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
	var FAILS_ON_PRIMITIVES$1 = fails(function () { return !Object.getOwnPropertyNames(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  getOwnPropertyNames: nativeGetOwnPropertyNames$2
	});

	function RE(s, f) {
	  return RegExp(s, f);
	}
	var UNSUPPORTED_Y = fails(function () {
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	var BROKEN_CARET = fails(function () {
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;
	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();
	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;
	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;
	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }
	      strCopy = String(str).slice(re.lastIndex);
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }
	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
	    match = nativeExec.call(sticky ? reCopy : re, strCopy);
	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }
	    return match;
	  };
	}
	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var SPECIES$6 = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();
	var REPLACE = wellKnownSymbol('replace');
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});
	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    var execCalled = false;
	    var re = /a/;
	    if (KEY === 'split') {
	      re = {};
	      re.constructor = {};
	      re.constructor[SPECIES$6] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }
	    re.exec = function () { execCalled = true; return null; };
	    re[SYMBOL]('');
	    return !execCalled;
	  });
	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }
	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return regexpExec.call(R, S);
	};

	var max$2 = Math.max;
	var min$2 = Math.min;
	var floor$2 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }
	      var rx = anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$2(min$2(toInteger(result.index), S.length), 0);
	        var captures = [];
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default:
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$2(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var MATCH = wellKnownSymbol('match');
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++;
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;
	  return [
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;
	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);
	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};
	var stringTrim = {
	  start: createMethod$3(1),
	  end: createMethod$3(2),
	  trim: createMethod$3(3)
	};

	var non = '\u200B\u0085\u180E';
	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;
	_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var defineProperty$6 = objectDefineProperty.f;
	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$3 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$3.isPrototypeOf;
	var TO_STRING_TAG$4 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME$1;
	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};
	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};
	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};
	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};
	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME$1)) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  } throw TypeError('Target is not a typed array constructor');
	};
	var exportTypedArrayMethod = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }
	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};
	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;
	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];
	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }
	    if (!TypedArray[KEY] || forced) {
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) {  }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};
	for (NAME$1 in TypedArrayConstructorsList) {
	  if (!global_1[NAME$1]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	}
	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1], TypedArray);
	  }
	}
	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$3) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1].prototype, TypedArrayPrototype);
	  }
	}
	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}
	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$4)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$6(TypedArrayPrototype, TO_STRING_TAG$4, { get: function () {
	    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	  } });
	  for (NAME$1 in TypedArrayConstructorsList) if (global_1[NAME$1]) {
	    createNonEnumerableProperty(global_1[NAME$1], TYPED_ARRAY_TAG, NAME$1);
	  }
	}
	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var ArrayBuffer$3 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;
	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  return new Int8Array$2(new ArrayBuffer$3(2), 1, undefined).length !== 1;
	});

	var toPositiveInteger = function (it) {
	  var result = toInteger(it);
	  if (result < 0) throw RangeError("The argument can't be less than 0");
	  return result;
	};

	var toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;
	var typedArrayFrom = function from(source ) {
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, step, iterator, next;
	  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    O = [];
	    while (!(step = next.call(iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = functionBindContext(mapfn, arguments[2], 2);
	  }
	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);
	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }
	  return result;
	};

	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    objectSetPrototypeOf &&
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var forEach = arrayIteration.forEach;
	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var nativeDefineProperty = objectDefineProperty.f;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var round = Math.round;
	var RangeError = global_1.RangeError;
	var ArrayBuffer = arrayBuffer.ArrayBuffer;
	var DataView = arrayBuffer.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	var TypedArray = arrayBufferViewCore.TypedArray;
	var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	var isTypedArray = arrayBufferViewCore.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';
	var fromList = function (C, list) {
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};
	var addGetter = function (it, key) {
	  nativeDefineProperty(it, key, { get: function () {
	    return getInternalState(this)[key];
	  } });
	};
	var isArrayBuffer = function (it) {
	  var klass;
	  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	};
	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && typeof key != 'symbol'
	    && key in target
	    && String(+key) == String(key);
	};
	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  return isTypedArrayIndex(target, key = toPrimitive(key, true))
	    ? createPropertyDescriptor(2, target[key])
	    : nativeGetOwnPropertyDescriptor(target, key);
	};
	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
	    && isObject(descriptor)
	    && has(descriptor, 'value')
	    && !has(descriptor, 'get')
	    && !has(descriptor, 'set')
	    && !descriptor.configurable
	    && (!has(descriptor, 'writable') || descriptor.writable)
	    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty(target, key, descriptor);
	};
	if (descriptors) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	    objectDefineProperty.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype, 'buffer');
	    addGetter(TypedArrayPrototype, 'byteOffset');
	    addGetter(TypedArrayPrototype, 'byteLength');
	    addGetter(TypedArrayPrototype, 'length');
	  }
	  _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });
	  module.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+$/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};
	    var getter = function (that, index) {
	      var data = getInternalState(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };
	    var setter = function (that, index, value) {
	      var data = getInternalState(that);
	      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	    };
	    var addElement = function (that, index) {
	      nativeDefineProperty(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return fromList(TypedArrayConstructor, data);
	        } else {
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }
	        setInternalState(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	    } else if (typedArrayConstructorsRequireWrappers) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        return inheritIfRequired(function () {
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });
	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }
	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }
	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }
	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
	    _export({
	      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, exported);
	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }
	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }
	    setSpecies(CONSTRUCTOR_NAME);
	  };
	} else module.exports = function () {  };
	});

	typedArrayConstructor('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var min$4 = Math.min;
	var arrayCopyWithin = [].copyWithin || function copyWithin(target , start ) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$4((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start ) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var $every = arrayIteration.every;
	var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$2('every', function every(callbackfn ) {
	  return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$3('fill', function fill(value ) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var $filter = arrayIteration.filter;
	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$4('filter', function filter(callbackfn ) {
	  var list = $filter(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	});

	var $find = arrayIteration.find;
	var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$5('find', function find(predicate ) {
	  return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $findIndex = arrayIteration.findIndex;
	var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$6('findIndex', function findIndex(predicate ) {
	  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $forEach$2 = arrayIteration.forEach;
	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$7('forEach', function forEach(callbackfn ) {
	  $forEach$2(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes = arrayIncludes.includes;
	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$8('includes', function includes(searchElement ) {
	  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $indexOf$1 = arrayIncludes.indexOf;
	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$9('indexOf', function indexOf(searchElement ) {
	  return $indexOf$1(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$6 = wellKnownSymbol('iterator');
	var Uint8Array$1 = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
	var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$6];
	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
	  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);
	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	};
	exportTypedArrayMethod$a('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	});
	exportTypedArrayMethod$a('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	});
	exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME);
	exportTypedArrayMethod$a(ITERATOR$6, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
	var $join = [].join;
	exportTypedArrayMethod$b('join', function join(separator) {
	  return $join.apply(aTypedArray$b(this), arguments);
	});

	var min$5 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$3 = arrayMethodIsStrict('lastIndexOf');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
	var FORCED$1 = NEGATIVE_ZERO$1 || !STRICT_METHOD$3 || !USES_TO_LENGTH$4;
	var arrayLastIndexOf = FORCED$1 ? function lastIndexOf(searchElement ) {
	  if (NEGATIVE_ZERO$1) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$5(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement ) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var $map$1 = arrayIteration.map;
	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$d('map', function map(mapfn ) {
	  return $map$1(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	  });
	});

	var createMethod$4 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};
	var arrayReduce = {
	  left: createMethod$4(false),
	  right: createMethod$4(true)
	};

	var $reduce = arrayReduce.left;
	var aTypedArray$e = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$e('reduce', function reduce(callbackfn ) {
	  return $reduce(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $reduceRight = arrayReduce.right;
	var aTypedArray$f = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn ) {
	  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
	var floor$3 = Math.floor;
	exportTypedArrayMethod$g('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
	  var middle = floor$3(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;
	var FORCED$2 = fails(function () {
	  new Int8Array(1).set({});
	});
	exportTypedArrayMethod$h('set', function set(arrayLike ) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, FORCED$2);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;
	var FORCED$3 = fails(function () {
	  new Int8Array(1).slice();
	});
	exportTypedArrayMethod$i('slice', function slice(start, end) {
	  var list = $slice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$3);

	var $some = arrayIteration.some;
	var aTypedArray$j = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$j('some', function some(callbackfn ) {
	  return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
	var $sort = [].sort;
	exportTypedArrayMethod$k('sort', function sort(comparefn) {
	  return $sort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;
	exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
	  );
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var $slice$1 = [].slice;
	var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
	  $toLocaleString.call(new Int8Array$3(1));
	});
	var FORCED$4 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	});
	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$4);

	var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;
	var Uint8Array$2 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype || {};
	var arrayToString = [].toString;
	var arrayJoin = [].join;
	if (fails(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return arrayJoin.call(this);
	  };
	}
	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;
	exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var ITERATOR$7 = wellKnownSymbol('iterator');
	var nativeUrl = !fails(function () {
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var searchParams = url.searchParams;
	  var result = '';
	  url.pathname = 'c%20d';
	  searchParams.forEach(function (value, key) {
	    searchParams['delete']('b');
	    result += key + value;
	  });
	  return (isPure && !url.toJSON)
	    || !searchParams.sort
	    || url.href !== 'http://a/c%20d?a=1&c=3'
	    || searchParams.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !searchParams[ITERATOR$7]
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    || new URL('http://тест').host !== 'xn--e1aybc'
	    || new URL('http://a#б').hash !== '#%D0%B1'
	    || result !== 'a1c3'
	    || new URL('http://x', undefined).host !== 'x';
	});

	var nativeAssign = Object.assign;
	var defineProperty$7 = Object.defineProperty;
	var objectAssign = !nativeAssign || fails(function () {
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$7({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$7(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  var A = {};
	  var B = {};
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose(iterator);
	    throw error;
	  }
	};

	var arrayFrom = function from(arrayLike ) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var maxInt = 2147483647;
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128;
	var delimiter = '-';
	var regexNonASCII = /[^\0-\u007E]/;
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;
	var floor$4 = Math.floor;
	var stringFromCharCode = String.fromCharCode;
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = string.charCodeAt(counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      var extra = string.charCodeAt(counter++);
	      if ((extra & 0xFC00) == 0xDC00) {
	        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        output.push(value);
	        counter--;
	      }
	    } else {
	      output.push(value);
	    }
	  }
	  return output;
	};
	var digitToBasic = function (digit) {
	  return digit + 22 + 75 * (digit < 26);
	};
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$4(delta / damp) : delta >> 1;
	  delta += floor$4(delta / numPoints);
	  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
	    delta = floor$4(delta / baseMinusTMin);
	  }
	  return floor$4(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};
	var encode = function (input) {
	  var output = [];
	  input = ucs2decode(input);
	  var inputLength = input.length;
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      output.push(stringFromCharCode(currentValue));
	    }
	  }
	  var basicLength = output.length;
	  var handledCPCount = basicLength;
	  if (basicLength) {
	    output.push(delimiter);
	  }
	  while (handledCPCount < inputLength) {
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$4((maxInt - delta) / handledCPCountPlusOne)) {
	      throw RangeError(OVERFLOW_ERROR);
	    }
	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw RangeError(OVERFLOW_ERROR);
	      }
	      if (currentValue == n) {
	        var q = delta;
	        for (var k = base; ; k += base) {
	          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$4(qMinusT / baseMinusT);
	        }
	        output.push(stringFromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        ++handledCPCount;
	      }
	    }
	    ++delta;
	    ++n;
	  }
	  return output.join('');
	};
	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
	  }
	  return encoded.join('.');
	};

	var getIterator = function (it) {
	  var iteratorMethod = getIteratorMethod(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject(iteratorMethod.call(it));
	};

	var $fetch$1 = getBuiltIn('fetch');
	var Headers = getBuiltIn('Headers');
	var ITERATOR$8 = wellKnownSymbol('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$5 = internalState.set;
	var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);
	var plus = /\+/g;
	var sequences = Array(4);
	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};
	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};
	var deserialize = function (it) {
	  var result = it.replace(plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent(result);
	  } catch (error) {
	    while (bytes) {
	      result = result.replace(percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};
	var find = /[!'()~]|%20/g;
	var replace = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};
	var replacer = function (match) {
	  return replace[match];
	};
	var serialize = function (it) {
	  return encodeURIComponent(it).replace(find, replacer);
	};
	var parseSearchParams = function (result, query) {
	  if (query) {
	    var attributes = query.split('&');
	    var index = 0;
	    var attribute, entry;
	    while (index < attributes.length) {
	      attribute = attributes[index++];
	      if (attribute.length) {
	        entry = attribute.split('=');
	        result.push({
	          key: deserialize(entry.shift()),
	          value: deserialize(entry.join('='))
	        });
	      }
	    }
	  }
	};
	var updateSearchParams = function (query) {
	  this.entries.length = 0;
	  parseSearchParams(this.entries, query);
	};
	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw TypeError('Not enough arguments');
	};
	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$5(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    iterator: getIterator(getInternalParamsState(params).entries),
	    kind: kind
	  });
	}, 'Iterator', function next() {
	  var state = getInternalIteratorState(this);
	  var kind = state.kind;
	  var step = state.iterator.next();
	  var entry = step.value;
	  if (!step.done) {
	    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
	  } return step;
	});
	var URLSearchParamsConstructor = function URLSearchParams() {
	  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var that = this;
	  var entries = [];
	  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
	  setInternalState$5(that, {
	    type: URL_SEARCH_PARAMS,
	    entries: entries,
	    updateURL: function () {  },
	    updateSearchParams: updateSearchParams
	  });
	  if (init !== undefined) {
	    if (isObject(init)) {
	      iteratorMethod = getIteratorMethod(init);
	      if (typeof iteratorMethod === 'function') {
	        iterator = iteratorMethod.call(init);
	        next = iterator.next;
	        while (!(step = next.call(iterator)).done) {
	          entryIterator = getIterator(anObject(step.value));
	          entryNext = entryIterator.next;
	          if (
	            (first = entryNext.call(entryIterator)).done ||
	            (second = entryNext.call(entryIterator)).done ||
	            !entryNext.call(entryIterator).done
	          ) throw TypeError('Expected sequence with length 2');
	          entries.push({ key: first.value + '', value: second.value + '' });
	        }
	      } else for (key in init) if (has(init, key)) entries.push({ key: key, value: init[key] + '' });
	    } else {
	      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
	    }
	  }
	};
	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
	redefineAll(URLSearchParamsPrototype, {
	  append: function append(name, value) {
	    validateArgumentsLength(arguments.length, 2);
	    var state = getInternalParamsState(this);
	    state.entries.push({ key: name + '', value: value + '' });
	    state.updateURL();
	  },
	  'delete': function (name) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var key = name + '';
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index].key === key) entries.splice(index, 1);
	      else index++;
	    }
	    state.updateURL();
	  },
	  get: function get(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  getAll: function getAll(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) result.push(entries[index].value);
	    }
	    return result;
	  },
	  has: function has(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index++].key === key) return true;
	    }
	    return false;
	  },
	  set: function set(name, value) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var found = false;
	    var key = name + '';
	    var val = value + '';
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) entries.splice(index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) entries.push({ key: key, value: val });
	    state.updateURL();
	  },
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var slice = entries.slice();
	    var entry, entriesIndex, sliceIndex;
	    entries.length = 0;
	    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
	      entry = slice[sliceIndex];
	      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
	        if (entries[entriesIndex].key > entry.key) {
	          entries.splice(entriesIndex, 0, entry);
	          break;
	        }
	      }
	      if (entriesIndex === sliceIndex) entries.push(entry);
	    }
	    state.updateURL();
	  },
	  forEach: function forEach(callback ) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = functionBindContext(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });
	redefine(URLSearchParamsPrototype, ITERATOR$8, URLSearchParamsPrototype.entries);
	redefine(URLSearchParamsPrototype, 'toString', function toString() {
	  var entries = getInternalParamsState(this).entries;
	  var result = [];
	  var index = 0;
	  var entry;
	  while (index < entries.length) {
	    entry = entries[index++];
	    result.push(serialize(entry.key) + '=' + serialize(entry.value));
	  } return result.join('&');
	}, { enumerable: true });
	setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
	_export({ global: true, forced: !nativeUrl }, {
	  URLSearchParams: URLSearchParamsConstructor
	});
	if (!nativeUrl && typeof $fetch$1 == 'function' && typeof Headers == 'function') {
	  _export({ global: true, enumerable: true, forced: true }, {
	    fetch: function fetch(input ) {
	      var args = [input];
	      var init, body, headers;
	      if (arguments.length > 1) {
	        init = arguments[1];
	        if (isObject(init)) {
	          body = init.body;
	          if (classof(body) === URL_SEARCH_PARAMS) {
	            headers = init.headers ? new Headers(init.headers) : new Headers();
	            if (!headers.has('content-type')) {
	              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	            }
	            init = objectCreate(init, {
	              body: createPropertyDescriptor(0, String(body)),
	              headers: createPropertyDescriptor(0, headers)
	            });
	          }
	        }
	        args.push(init);
	      } return $fetch$1.apply(this, args);
	    }
	  });
	}
	var web_urlSearchParams = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	var codeAt = stringMultibyte.codeAt;
	var NativeURL = global_1.URL;
	var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
	var getInternalSearchParamsState = web_urlSearchParams.getState;
	var setInternalState$6 = internalState.set;
	var getInternalURLState = internalState.getterFor('URL');
	var floor$5 = Math.floor;
	var pow$1 = Math.pow;
	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';
	var ALPHA = /[A-Za-z]/;
	var ALPHANUMERIC = /[\d+-.A-Za-z]/;
	var DIGIT = /\d/;
	var HEX_START = /^(0x|0X)/;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\dA-Fa-f]+$/;
	var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
	var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
	var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
	var EOF;
	var parseHost = function (url, input) {
	  var result, codePoints, index;
	  if (input.charAt(0) == '[') {
	    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
	    result = parseIPv6(input.slice(1, -1));
	    if (!result) return INVALID_HOST;
	    url.host = result;
	  } else if (!isSpecial(url)) {
	    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
	    result = '';
	    codePoints = arrayFrom(input);
	    for (index = 0; index < codePoints.length; index++) {
	      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	    }
	    url.host = result;
	  } else {
	    input = stringPunycodeToAscii(input);
	    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
	    result = parseIPv4(input);
	    if (result === null) return INVALID_HOST;
	    url.host = result;
	  }
	};
	var parseIPv4 = function (input) {
	  var parts = input.split('.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] == '') {
	    parts.pop();
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part == '') return input;
	    radix = 10;
	    if (part.length > 1 && part.charAt(0) == '0') {
	      radix = HEX_START.test(part) ? 16 : 8;
	      part = part.slice(radix == 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
	      number = parseInt(part, radix);
	    }
	    numbers.push(number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index == partsLength - 1) {
	      if (number >= pow$1(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = numbers.pop();
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow$1(256, 3 - index);
	  }
	  return ipv4;
	};
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
	  var char = function () {
	    return input.charAt(pointer);
	  };
	  if (char() == ':') {
	    if (input.charAt(1) != ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (char()) {
	    if (pieceIndex == 8) return;
	    if (char() == ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && HEX.test(char())) {
	      value = value * 16 + parseInt(char(), 16);
	      pointer++;
	      length++;
	    }
	    if (char() == '.') {
	      if (length == 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (char()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (char() == '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!DIGIT.test(char())) return;
	        while (DIGIT.test(char())) {
	          number = parseInt(char(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece == 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
	      }
	      if (numbersSeen != 4) return;
	      break;
	    } else if (char() == ':') {
	      pointer++;
	      if (!char()) return;
	    } else if (char()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex != 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex != 8) return;
	  return address;
	};
	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  if (currLength > maxLength) {
	    maxIndex = currStart;
	    maxLength = currLength;
	  }
	  return maxIndex;
	};
	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      result.unshift(host % 256);
	      host = floor$5(host / 256);
	    } return result.join('.');
	  } else if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += host[index].toString(16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};
	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});
	var percentEncode = function (char, set) {
	  var code = codeAt(char, 0);
	  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
	};
	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};
	var isSpecial = function (url) {
	  return has(specialSchemes, url.scheme);
	};
	var includesCredentials = function (url) {
	  return url.username != '' || url.password != '';
	};
	var cannotHaveUsernamePasswordPort = function (url) {
	  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
	};
	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length == 2 && ALPHA.test(string.charAt(0))
	    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
	};
	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
	    string.length == 2 ||
	    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};
	var shortenURLsPath = function (url) {
	  var path = url.path;
	  var pathSize = path.length;
	  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
	    path.pop();
	  }
	};
	var isSingleDot = function (segment) {
	  return segment === '.' || segment.toLowerCase() === '%2e';
	};
	var isDoubleDot = function (segment) {
	  segment = segment.toLowerCase();
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};
	var parseURL = function (url, input, stateOverride, base) {
	  var state = stateOverride || SCHEME_START;
	  var pointer = 0;
	  var buffer = '';
	  var seenAt = false;
	  var seenBracket = false;
	  var seenPasswordToken = false;
	  var codePoints, char, bufferCodePoints, failure;
	  if (!stateOverride) {
	    url.scheme = '';
	    url.username = '';
	    url.password = '';
	    url.host = null;
	    url.port = null;
	    url.path = [];
	    url.query = null;
	    url.fragment = null;
	    url.cannotBeABaseURL = false;
	    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
	  }
	  input = input.replace(TAB_AND_NEW_LINE, '');
	  codePoints = arrayFrom(input);
	  while (pointer <= codePoints.length) {
	    char = codePoints[pointer];
	    switch (state) {
	      case SCHEME_START:
	        if (char && ALPHA.test(char)) {
	          buffer += char.toLowerCase();
	          state = SCHEME;
	        } else if (!stateOverride) {
	          state = NO_SCHEME;
	          continue;
	        } else return INVALID_SCHEME;
	        break;
	      case SCHEME:
	        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
	          buffer += char.toLowerCase();
	        } else if (char == ':') {
	          if (stateOverride && (
	            (isSpecial(url) != has(specialSchemes, buffer)) ||
	            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
	            (url.scheme == 'file' && !url.host)
	          )) return;
	          url.scheme = buffer;
	          if (stateOverride) {
	            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
	            return;
	          }
	          buffer = '';
	          if (url.scheme == 'file') {
	            state = FILE;
	          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
	            state = SPECIAL_RELATIVE_OR_AUTHORITY;
	          } else if (isSpecial(url)) {
	            state = SPECIAL_AUTHORITY_SLASHES;
	          } else if (codePoints[pointer + 1] == '/') {
	            state = PATH_OR_AUTHORITY;
	            pointer++;
	          } else {
	            url.cannotBeABaseURL = true;
	            url.path.push('');
	            state = CANNOT_BE_A_BASE_URL_PATH;
	          }
	        } else if (!stateOverride) {
	          buffer = '';
	          state = NO_SCHEME;
	          pointer = 0;
	          continue;
	        } else return INVALID_SCHEME;
	        break;
	      case NO_SCHEME:
	        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
	        if (base.cannotBeABaseURL && char == '#') {
	          url.scheme = base.scheme;
	          url.path = base.path.slice();
	          url.query = base.query;
	          url.fragment = '';
	          url.cannotBeABaseURL = true;
	          state = FRAGMENT;
	          break;
	        }
	        state = base.scheme == 'file' ? FILE : RELATIVE;
	        continue;
	      case SPECIAL_RELATIVE_OR_AUTHORITY:
	        if (char == '/' && codePoints[pointer + 1] == '/') {
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          pointer++;
	        } else {
	          state = RELATIVE;
	          continue;
	        } break;
	      case PATH_OR_AUTHORITY:
	        if (char == '/') {
	          state = AUTHORITY;
	          break;
	        } else {
	          state = PATH;
	          continue;
	        }
	      case RELATIVE:
	        url.scheme = base.scheme;
	        if (char == EOF) {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = base.query;
	        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
	          state = RELATIVE_SLASH;
	        } else if (char == '?') {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = '';
	          state = QUERY;
	        } else if (char == '#') {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = base.query;
	          url.fragment = '';
	          state = FRAGMENT;
	        } else {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.path.pop();
	          state = PATH;
	          continue;
	        } break;
	      case RELATIVE_SLASH:
	        if (isSpecial(url) && (char == '/' || char == '\\')) {
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	        } else if (char == '/') {
	          state = AUTHORITY;
	        } else {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          state = PATH;
	          continue;
	        } break;
	      case SPECIAL_AUTHORITY_SLASHES:
	        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
	        pointer++;
	        break;
	      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	        if (char != '/' && char != '\\') {
	          state = AUTHORITY;
	          continue;
	        } break;
	      case AUTHORITY:
	        if (char == '@') {
	          if (seenAt) buffer = '%40' + buffer;
	          seenAt = true;
	          bufferCodePoints = arrayFrom(buffer);
	          for (var i = 0; i < bufferCodePoints.length; i++) {
	            var codePoint = bufferCodePoints[i];
	            if (codePoint == ':' && !seenPasswordToken) {
	              seenPasswordToken = true;
	              continue;
	            }
	            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	            if (seenPasswordToken) url.password += encodedCodePoints;
	            else url.username += encodedCodePoints;
	          }
	          buffer = '';
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url))
	        ) {
	          if (seenAt && buffer == '') return INVALID_AUTHORITY;
	          pointer -= arrayFrom(buffer).length + 1;
	          buffer = '';
	          state = HOST;
	        } else buffer += char;
	        break;
	      case HOST:
	      case HOSTNAME:
	        if (stateOverride && url.scheme == 'file') {
	          state = FILE_HOST;
	          continue;
	        } else if (char == ':' && !seenBracket) {
	          if (buffer == '') return INVALID_HOST;
	          failure = parseHost(url, buffer);
	          if (failure) return failure;
	          buffer = '';
	          state = PORT;
	          if (stateOverride == HOSTNAME) return;
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url))
	        ) {
	          if (isSpecial(url) && buffer == '') return INVALID_HOST;
	          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
	          failure = parseHost(url, buffer);
	          if (failure) return failure;
	          buffer = '';
	          state = PATH_START;
	          if (stateOverride) return;
	          continue;
	        } else {
	          if (char == '[') seenBracket = true;
	          else if (char == ']') seenBracket = false;
	          buffer += char;
	        } break;
	      case PORT:
	        if (DIGIT.test(char)) {
	          buffer += char;
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url)) ||
	          stateOverride
	        ) {
	          if (buffer != '') {
	            var port = parseInt(buffer, 10);
	            if (port > 0xFFFF) return INVALID_PORT;
	            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
	            buffer = '';
	          }
	          if (stateOverride) return;
	          state = PATH_START;
	          continue;
	        } else return INVALID_PORT;
	        break;
	      case FILE:
	        url.scheme = 'file';
	        if (char == '/' || char == '\\') state = FILE_SLASH;
	        else if (base && base.scheme == 'file') {
	          if (char == EOF) {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = base.query;
	          } else if (char == '?') {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = '';
	            state = QUERY;
	          } else if (char == '#') {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
	              url.host = base.host;
	              url.path = base.path.slice();
	              shortenURLsPath(url);
	            }
	            state = PATH;
	            continue;
	          }
	        } else {
	          state = PATH;
	          continue;
	        } break;
	      case FILE_SLASH:
	        if (char == '/' || char == '\\') {
	          state = FILE_HOST;
	          break;
	        }
	        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
	          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
	          else url.host = base.host;
	        }
	        state = PATH;
	        continue;
	      case FILE_HOST:
	        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
	          if (!stateOverride && isWindowsDriveLetter(buffer)) {
	            state = PATH;
	          } else if (buffer == '') {
	            url.host = '';
	            if (stateOverride) return;
	            state = PATH_START;
	          } else {
	            failure = parseHost(url, buffer);
	            if (failure) return failure;
	            if (url.host == 'localhost') url.host = '';
	            if (stateOverride) return;
	            buffer = '';
	            state = PATH_START;
	          } continue;
	        } else buffer += char;
	        break;
	      case PATH_START:
	        if (isSpecial(url)) {
	          state = PATH;
	          if (char != '/' && char != '\\') continue;
	        } else if (!stateOverride && char == '?') {
	          url.query = '';
	          state = QUERY;
	        } else if (!stateOverride && char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          state = PATH;
	          if (char != '/') continue;
	        } break;
	      case PATH:
	        if (
	          char == EOF || char == '/' ||
	          (char == '\\' && isSpecial(url)) ||
	          (!stateOverride && (char == '?' || char == '#'))
	        ) {
	          if (isDoubleDot(buffer)) {
	            shortenURLsPath(url);
	            if (char != '/' && !(char == '\\' && isSpecial(url))) {
	              url.path.push('');
	            }
	          } else if (isSingleDot(buffer)) {
	            if (char != '/' && !(char == '\\' && isSpecial(url))) {
	              url.path.push('');
	            }
	          } else {
	            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	              if (url.host) url.host = '';
	              buffer = buffer.charAt(0) + ':';
	            }
	            url.path.push(buffer);
	          }
	          buffer = '';
	          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
	            while (url.path.length > 1 && url.path[0] === '') {
	              url.path.shift();
	            }
	          }
	          if (char == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (char == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          }
	        } else {
	          buffer += percentEncode(char, pathPercentEncodeSet);
	        } break;
	      case CANNOT_BE_A_BASE_URL_PATH:
	        if (char == '?') {
	          url.query = '';
	          state = QUERY;
	        } else if (char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
	        } break;
	      case QUERY:
	        if (!stateOverride && char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          if (char == "'" && isSpecial(url)) url.query += '%27';
	          else if (char == '#') url.query += '%23';
	          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
	        } break;
	      case FRAGMENT:
	        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
	        break;
	    }
	    pointer++;
	  }
	};
	var URLConstructor = function URL(url ) {
	  var that = anInstance(this, URLConstructor, 'URL');
	  var base = arguments.length > 1 ? arguments[1] : undefined;
	  var urlString = String(url);
	  var state = setInternalState$6(that, { type: 'URL' });
	  var baseState, failure;
	  if (base !== undefined) {
	    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
	    else {
	      failure = parseURL(baseState = {}, String(base));
	      if (failure) throw TypeError(failure);
	    }
	  }
	  failure = parseURL(state, urlString, null, baseState);
	  if (failure) throw TypeError(failure);
	  var searchParams = state.searchParams = new URLSearchParams$1();
	  var searchParamsState = getInternalSearchParamsState(searchParams);
	  searchParamsState.updateSearchParams(state.query);
	  searchParamsState.updateURL = function () {
	    state.query = String(searchParams) || null;
	  };
	  if (!descriptors) {
	    that.href = serializeURL.call(that);
	    that.origin = getOrigin.call(that);
	    that.protocol = getProtocol.call(that);
	    that.username = getUsername.call(that);
	    that.password = getPassword.call(that);
	    that.host = getHost.call(that);
	    that.hostname = getHostname.call(that);
	    that.port = getPort.call(that);
	    that.pathname = getPathname.call(that);
	    that.search = getSearch.call(that);
	    that.searchParams = getSearchParams.call(that);
	    that.hash = getHash.call(that);
	  }
	};
	var URLPrototype = URLConstructor.prototype;
	var serializeURL = function () {
	  var url = getInternalURLState(this);
	  var scheme = url.scheme;
	  var username = url.username;
	  var password = url.password;
	  var host = url.host;
	  var port = url.port;
	  var path = url.path;
	  var query = url.query;
	  var fragment = url.fragment;
	  var output = scheme + ':';
	  if (host !== null) {
	    output += '//';
	    if (includesCredentials(url)) {
	      output += username + (password ? ':' + password : '') + '@';
	    }
	    output += serializeHost(host);
	    if (port !== null) output += ':' + port;
	  } else if (scheme == 'file') output += '//';
	  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
	  if (query !== null) output += '?' + query;
	  if (fragment !== null) output += '#' + fragment;
	  return output;
	};
	var getOrigin = function () {
	  var url = getInternalURLState(this);
	  var scheme = url.scheme;
	  var port = url.port;
	  if (scheme == 'blob') try {
	    return new URL(scheme.path[0]).origin;
	  } catch (error) {
	    return 'null';
	  }
	  if (scheme == 'file' || !isSpecial(url)) return 'null';
	  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
	};
	var getProtocol = function () {
	  return getInternalURLState(this).scheme + ':';
	};
	var getUsername = function () {
	  return getInternalURLState(this).username;
	};
	var getPassword = function () {
	  return getInternalURLState(this).password;
	};
	var getHost = function () {
	  var url = getInternalURLState(this);
	  var host = url.host;
	  var port = url.port;
	  return host === null ? ''
	    : port === null ? serializeHost(host)
	    : serializeHost(host) + ':' + port;
	};
	var getHostname = function () {
	  var host = getInternalURLState(this).host;
	  return host === null ? '' : serializeHost(host);
	};
	var getPort = function () {
	  var port = getInternalURLState(this).port;
	  return port === null ? '' : String(port);
	};
	var getPathname = function () {
	  var url = getInternalURLState(this);
	  var path = url.path;
	  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
	};
	var getSearch = function () {
	  var query = getInternalURLState(this).query;
	  return query ? '?' + query : '';
	};
	var getSearchParams = function () {
	  return getInternalURLState(this).searchParams;
	};
	var getHash = function () {
	  var fragment = getInternalURLState(this).fragment;
	  return fragment ? '#' + fragment : '';
	};
	var accessorDescriptor = function (getter, setter) {
	  return { get: getter, set: setter, configurable: true, enumerable: true };
	};
	if (descriptors) {
	  objectDefineProperties(URLPrototype, {
	    href: accessorDescriptor(serializeURL, function (href) {
	      var url = getInternalURLState(this);
	      var urlString = String(href);
	      var failure = parseURL(url, urlString);
	      if (failure) throw TypeError(failure);
	      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
	    }),
	    origin: accessorDescriptor(getOrigin),
	    protocol: accessorDescriptor(getProtocol, function (protocol) {
	      var url = getInternalURLState(this);
	      parseURL(url, String(protocol) + ':', SCHEME_START);
	    }),
	    username: accessorDescriptor(getUsername, function (username) {
	      var url = getInternalURLState(this);
	      var codePoints = arrayFrom(String(username));
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      url.username = '';
	      for (var i = 0; i < codePoints.length; i++) {
	        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	      }
	    }),
	    password: accessorDescriptor(getPassword, function (password) {
	      var url = getInternalURLState(this);
	      var codePoints = arrayFrom(String(password));
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      url.password = '';
	      for (var i = 0; i < codePoints.length; i++) {
	        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	      }
	    }),
	    host: accessorDescriptor(getHost, function (host) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      parseURL(url, String(host), HOST);
	    }),
	    hostname: accessorDescriptor(getHostname, function (hostname) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      parseURL(url, String(hostname), HOSTNAME);
	    }),
	    port: accessorDescriptor(getPort, function (port) {
	      var url = getInternalURLState(this);
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      port = String(port);
	      if (port == '') url.port = null;
	      else parseURL(url, port, PORT);
	    }),
	    pathname: accessorDescriptor(getPathname, function (pathname) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      url.path = [];
	      parseURL(url, pathname + '', PATH_START);
	    }),
	    search: accessorDescriptor(getSearch, function (search) {
	      var url = getInternalURLState(this);
	      search = String(search);
	      if (search == '') {
	        url.query = null;
	      } else {
	        if ('?' == search.charAt(0)) search = search.slice(1);
	        url.query = '';
	        parseURL(url, search, QUERY);
	      }
	      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
	    }),
	    searchParams: accessorDescriptor(getSearchParams),
	    hash: accessorDescriptor(getHash, function (hash) {
	      var url = getInternalURLState(this);
	      hash = String(hash);
	      if (hash == '') {
	        url.fragment = null;
	        return;
	      }
	      if ('#' == hash.charAt(0)) hash = hash.slice(1);
	      url.fragment = '';
	      parseURL(url, hash, FRAGMENT);
	    })
	  });
	}
	redefine(URLPrototype, 'toJSON', function toJSON() {
	  return serializeURL.call(this);
	}, { enumerable: true });
	redefine(URLPrototype, 'toString', function toString() {
	  return serializeURL.call(this);
	}, { enumerable: true });
	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
	    return nativeCreateObjectURL.apply(NativeURL, arguments);
	  });
	  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
	    return nativeRevokeObjectURL.apply(NativeURL, arguments);
	  });
	}
	setToStringTag(URLConstructor, 'URL');
	_export({ global: true, forced: !nativeUrl, sham: !descriptors }, {
	  URL: URLConstructor
	});

	var global$1="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||"undefined"!=typeof global$1&&global$1,support={searchParams:"URLSearchParams"in global$1,iterable:"Symbol"in global$1&&"iterator"in Symbol,blob:"FileReader"in global$1&&"Blob"in global$1&&function(){try{return new Blob,!0}catch(a){return !1}}(),formData:"FormData"in global$1,arrayBuffer:"ArrayBuffer"in global$1};function isDataView(a){return a&&DataView.prototype.isPrototypeOf(a)}if(support.arrayBuffer)var viewClasses=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],isArrayBufferView=ArrayBuffer.isView||function(a){return a&&-1<viewClasses.indexOf(Object.prototype.toString.call(a))};function normalizeName(a){if("string"!=typeof a&&(a+=""),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(a)||""===a)throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function normalizeValue(a){return "string"!=typeof a&&(a+=""),a}
	function iteratorFor(a){var b={next:function next(){var b=a.shift();return {done:void 0===b,value:b}}};return support.iterable&&(b[Symbol.iterator]=function(){return b}),b}function Headers$1(a){this.map={},a instanceof Headers$1?a.forEach(function(a,b){this.append(b,a);},this):Array.isArray(a)?a.forEach(function(a){this.append(a[0],a[1]);},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b]);},this);}Headers$1.prototype.append=function(a,b){a=normalizeName(a),b=normalizeValue(b);var c=this.map[a];this.map[a]=c?c+", "+b:b;},Headers$1.prototype["delete"]=function(a){delete this.map[normalizeName(a)];},Headers$1.prototype.get=function(a){return a=normalizeName(a),this.has(a)?this.map[a]:null},Headers$1.prototype.has=function(a){return this.map.hasOwnProperty(normalizeName(a))},Headers$1.prototype.set=function(a,b){this.map[normalizeName(a)]=normalizeValue(b);},Headers$1.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this);},Headers$1.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c);}),iteratorFor(a)},Headers$1.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b);}),iteratorFor(a)},Headers$1.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b]);}),iteratorFor(a)},support.iterable&&(Headers$1.prototype[Symbol.iterator]=Headers$1.prototype.entries);function consumed(a){return a.bodyUsed?Promise.reject(new TypeError("Already read")):void(a.bodyUsed=!0)}function fileReaderReady(a){return new Promise(function(b,c){a.onload=function(){b(a.result);},a.onerror=function(){c(a.error);};})}function readBlobAsArrayBuffer(a){var b=new FileReader,c=fileReaderReady(b);return b.readAsArrayBuffer(a),c}function readBlobAsText(a){var b=new FileReader,c=fileReaderReady(b);return b.readAsText(a),c}function readArrayBufferAsText(a){for(var b=new Uint8Array(a),c=Array(b.length),d=0;d<b.length;d++)c[d]=String.fromCharCode(b[d]);return c.join("")}function bufferClone(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);return b.set(new Uint8Array(a)),b.buffer}function Body(){return this.bodyUsed=!1,this._initBody=function(a){this.bodyUsed=this.bodyUsed,this._bodyInit=a,a?"string"==typeof a?this._bodyText=a:support.blob&&Blob.prototype.isPrototypeOf(a)?this._bodyBlob=a:support.formData&&FormData.prototype.isPrototypeOf(a)?this._bodyFormData=a:support.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)?this._bodyText=a.toString():support.arrayBuffer&&support.blob&&isDataView(a)?(this._bodyArrayBuffer=bufferClone(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):support.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||isArrayBufferView(a))?this._bodyArrayBuffer=bufferClone(a):this._bodyText=a=Object.prototype.toString.call(a):this._bodyText="",this.headers.get("content-type")||("string"==typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):support.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"));},support.blob&&(this.blob=function(){var a=consumed(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");else return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var a=consumed(this);return a?a:ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)}return this.blob().then(readBlobAsArrayBuffer)}),this.text=function(){var a=consumed(this);if(a)return a;if(this._bodyBlob)return readBlobAsText(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");else return Promise.resolve(this._bodyText)},support.formData&&(this.formData=function(){return this.text().then(decode)}),this.json=function(){return this.text().then(JSON.parse)},this}
	var methods=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function normalizeMethod(a){var b=a.toUpperCase();return -1<methods.indexOf(b)?b:a}function Request(a,b){if(!(this instanceof Request))throw new TypeError("Please use the \"new\" operator, this DOM object constructor cannot be called as a function.");b=b||{};var c=b.body;if(a instanceof Request){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new Headers$1(a.headers)),this.method=a.method,this.mode=a.mode,this.signal=a.signal,c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0);}else this.url=a+"";if(this.credentials=b.credentials||this.credentials||"same-origin",(b.headers||!this.headers)&&(this.headers=new Headers$1(b.headers)),this.method=normalizeMethod(b.method||this.method||"GET"),this.mode=b.mode||this.mode||null,this.signal=b.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(c),("GET"===this.method||"HEAD"===this.method)&&("no-store"===b.cache||"no-cache"===b.cache)){
	var d=/([?&])_=[^&]*/;if(d.test(this.url))this.url=this.url.replace(d,"$1_="+new Date().getTime());else {
	this.url+=(/\?/.test(this.url)?"&":"?")+"_="+new Date().getTime();}}}Request.prototype.clone=function(){return new Request(this,{body:this._bodyInit})};function decode(a){var b=new FormData;return a.trim().split("&").forEach(function(a){if(a){var c=a.split("="),d=c.shift().replace(/\+/g," "),e=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(d),decodeURIComponent(e));}}),b}function parseHeaders(a){var b=new Headers$1,c=a.replace(/\r?\n[\t ]+/g," ");
	return c.split("\r").map(function(a){return 0===a.indexOf("\n")?a.substr(1,a.length):a}).forEach(function(a){var c=a.split(":"),d=c.shift().trim();if(d){var e=c.join(":").trim();b.append(d,e);}}),b}Body.call(Request.prototype);function Response(a,b){if(!(this instanceof Response))throw new TypeError("Please use the \"new\" operator, this DOM object constructor cannot be called as a function.");b||(b={}),this.type="default",this.status=b.status===void 0?200:b.status,this.ok=200<=this.status&&300>this.status,this.statusText="statusText"in b?b.statusText:"",this.headers=new Headers$1(b.headers),this.url=b.url||"",this._initBody(a);}Body.call(Response.prototype),Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers$1(this.headers),url:this.url})},Response.error=function(){var a=new Response(null,{status:0,statusText:""});return a.type="error",a};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(a,b){if(-1===redirectStatuses.indexOf(b))throw new RangeError("Invalid status code");return new Response(null,{status:b,headers:{location:a}})};var DOMException=global$1.DOMException;try{new DOMException;}catch(a){DOMException=function(a,b){this.message=a,this.name=b;var c=Error(a);this.stack=c.stack;},DOMException.prototype=Object.create(Error.prototype),DOMException.prototype.constructor=DOMException;}function fetch$1(a,b){return new Promise(function(c,d){function e(){g.abort();}var f=new Request(a,b);if(f.signal&&f.signal.aborted)return d(new DOMException("Aborted","AbortError"));var g=new XMLHttpRequest;g.onload=function(){var a={status:g.status,statusText:g.statusText,headers:parseHeaders(g.getAllResponseHeaders()||"")};a.url="responseURL"in g?g.responseURL:a.headers.get("X-Request-URL");var b="response"in g?g.response:g.responseText;setTimeout(function(){c(new Response(b,a));},0);},g.onerror=function(){setTimeout(function(){d(new TypeError("Network request failed"));},0);},g.ontimeout=function(){setTimeout(function(){d(new TypeError("Network request failed"));},0);},g.onabort=function(){setTimeout(function(){d(new DOMException("Aborted","AbortError"));},0);},g.open(f.method,function(a){try{return ""===a&&global$1.location.href?global$1.location.href:a}catch(b){return a}}(f.url),!0),"include"===f.credentials?g.withCredentials=!0:"omit"===f.credentials&&(g.withCredentials=!1),"responseType"in g&&(support.blob?g.responseType="blob":support.arrayBuffer&&f.headers.get("Content-Type")&&-1!==f.headers.get("Content-Type").indexOf("application/octet-stream")&&(g.responseType="arraybuffer")),b&&"object"===_typeof_1(b.headers)&&!(b.headers instanceof Headers$1)?Object.getOwnPropertyNames(b.headers).forEach(function(a){g.setRequestHeader(a,normalizeValue(b.headers[a]));}):f.headers.forEach(function(a,b){g.setRequestHeader(b,a);}),f.signal&&(f.signal.addEventListener("abort",e),g.onreadystatechange=function(){4===g.readyState&&f.signal.removeEventListener("abort",e);}),g.send("undefined"==typeof f._bodyInit?null:f._bodyInit);})}fetch$1.polyfill=!0,global$1.fetch||(global$1.fetch=fetch$1,global$1.Headers=Headers$1,global$1.Request=Request,global$1.Response=Response);

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');
	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};
	var FORCED$5 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
	_export({ target: 'Array', proto: true, forced: FORCED$5 }, {
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var timeoutSeconds=45,timeoutMilliseconds=45000;/**
	 * After 45 seconds, display a warning, unless cancelled by clearing this timeout once the UI is updated and the iframe is loaded.
	 */var timeoutWarning=setTimeout(function(){updateLoaderWarning("Preview is taking a very long time to load (more than ".concat(timeoutSeconds," seconds).<br />Try pressing \"preview\" again from the WordPress edit screen.<br />If you see this again, your preview builds are either slow or there's something wrong."));},timeoutMilliseconds);function showError(a){"string"==typeof a&&(a={message:a});var b=document.getElementById("preview");b.style.display="none";var c=document.getElementById("loader");c.style.display="none";var d=document.getElementById("error-message-element");d.textContent=a.message;var e=document.querySelector(".content.error");if(e.style.display="block",!!("remoteStatus"in a))switch(a.remoteStatus){case"NO_PAGE_CREATED_FOR_PREVIEWED_NODE":updateTroubleshootingMessage("\n\t\t\tGatsby wasn't able to find a page for the post you're trying to preview. This can mean one of three things:\n\t\t\t</p>\n\t\t\t<ol>\n\t\t\t\t <li>A page is not being built for the post being previewed.</li>\n\t\t\t\t <li>The id of this post is not being included in the pageContext of it's Gatsby page.</li>\n\t\t\t\t <li>An error was thrown in Gatsby during Preview sourcing (check your logs).</li>\n\t\t\t</ol>\n\t\t\t<br /> \n\t\t\t<p>\n\t\t\t\t<b>Hint:</b> if you want to account for any possible post type (even those that haven't yet been registered) you can use the WpContentNode interface as a fallback template in gatsby-node.js when you're creating pages and you'll never see this message when registering new post types.\t\t\t\n\t\t");break;case"GATSBY_PREVIEW_PROCESS_ERROR":updateTroubleshootingMessage("\n\t\t\t\tThe Gatsby Preview process errored while sourcing this preview.<br />Please check your error logs for additional information.\t\t\n\t\t\t");break;case"RECEIVED_PREVIEW_DATA_FROM_WRONG_URL":updateTroubleshootingMessage("\n\t\t\t\tThe Gatsby instance this WP site is configured to send Previews to is configured to receive source data from a different WordPress instance. Please check your gatsby-config.js and WPGatsby settings to ensure the WordPress instance URL's match up.\t\t\t\n\t\t\t");break;}}function updateTroubleshootingMessage(a){var b=document.getElementById("troubleshooting-html-area");b.innerHTML="\n\t\t<p>".concat(a).concat("<br/><br/>If you're not a developer, please screenshot this page and send it to your developer.<br /><br /><b>Note:</b> Once this error is fixed, you'll need to press \"preview\" again to clear out this message.","</p>\t\t\t\n\t");}function updateLoaderWarning(a){var b=document.getElementById("preview-loader-warning");b.innerHTML="".concat(a,"<br /><br /><button id=\"cancel-button\">Cancel and Troubleshoot</button>"),b.style.display="initial";var c=document.getElementById("cancel-button");c.addEventListener("keypress",function(a){"Enter"===a.key&&cancelPreviewLoader();}),c.addEventListener("click",cancelPreviewLoader);}function cancelPreviewLoader(){showError("Preview was cancelled.");}

	var $includes$1 = arrayIncludes.includes;
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
	_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$5 }, {
	  includes: function includes(el ) {
	    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	addToUnscopables('includes');

	var previewFrontendIsOnlineQuery=/* GraphQL */"\n\tquery PREVIEW_FRONTEND_IS_ONLINE {\n\t\twpGatsby {\n\t\t\tisPreviewFrontendOnline\n\t\t}\n\t}\n",previewStatusQuery=/* GraphQL */"\n\tquery PREVIEW_STATUS_QUERY($postId: Float!) {\n\t\twpGatsby {\n\t\t\tgatsbyPreviewStatus(nodeId: $postId) {\n\t\t\t\tpageNode {\n\t\t\t\t\tpath\n\t\t\t\t}\n\t\t\t\tstatusType\n\t\t\t\tremoteStatus\n\t\t\t\tstatusContext\n\t\t\t}\n\t\t}\n\t}\n",remoteStatuses=["NO_PAGE_CREATED_FOR_PREVIEWED_NODE","GATSBY_PREVIEW_PROCESS_ERROR","RECEIVED_PREVIEW_DATA_FROM_WRONG_URL"];/**
	 * This function checks the preview status that Gatsby has stored in post meta for
	 * the parent post of this preview
	 * When the preview is ready, it calls onPreviewReadyUpdateUI() which updates the UI
	 *
	 * If a status besides PREVIEW_READY comes back, we wait a bit and try again
	 *
	 * This function doesn't return anything
	 */function fetchPreviewStatusAndUpdateUI(){return _fetchPreviewStatusAndUpdateUI.apply(this,arguments)}function _fetchPreviewStatusAndUpdateUI(){return _fetchPreviewStatusAndUpdateUI=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s=arguments;return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=0<s.length&&void 0!==s[0]?s[0]:{},e=d.refetchCount,f=void 0===e?0:e,g=d.refetchDelay,h=void 0===g?500:g,i=initialState,j=i.wordpressSiteUrl,k=i.graphqlEndpoint,a.next=4,fetch("".concat(j,"/?").concat(k),{method:"POST",body:JSON.stringify({query:previewStatusQuery,variables:{postId:initialState.postId}}),headers:{"Content-Type":"application/json"}});case 4:return a.next=6,a.sent.json();case 6:if(l=a.sent,m=(null===l||void 0===l||null===(b=l.data)||void 0===b||null===(c=b.wpGatsby)||void 0===c?void 0:c.gatsbyPreviewStatus)||{},n=m.statusType,o=m.remoteStatus,p=m.statusContext,q=remoteStatuses.includes(o),!q){a.next=13;break}throw console.log({response:l}),clearTimeout(timeoutWarning),{remoteStatus:o,message:"Gatsby returned unsuccessful Preview status:\n".concat(o).concat(p?"\n\nWith additional context:\n".concat(p):"")};case 13:if(n&&console.log(n),o&&console.log(o),"PREVIEW_READY"!==n){a.next=19;break}return clearTimeout(timeoutWarning),onPreviewReadyUpdateUI(l),a.abrupt("return");case 19:return r={// after 30 retries of 500ms, start checking every second
	30:1e3,// after 20 more retries of 1 second, start checking every 2 seconds
	50:2e3,// after 20 more retries of 2 seconds, start checking every 5 seconds
	70:5e3},f++,h=r[f]||h,a.next=24,new Promise(function(a){return setTimeout(function(){a();},h)});case 24:return a.next=26,fetchPreviewStatusAndUpdateUI({refetchCount:f,refetchDelay:h});case 26:case"end":return a.stop();}},a)})),_fetchPreviewStatusAndUpdateUI.apply(this,arguments)}function onPreviewReadyUpdateUI(a){var b,c,d=(null===a||void 0===a||null===(b=a.data)||void 0===b?void 0:b.wpGatsby)||{},e=d.gatsbyPreviewStatus;if(console.log({previewReady:{gatsbyPreviewStatus:e}}),!e||!e.statusType||null===e||void 0===e||null===(c=e.pageNode)||void 0===c||!c.path)throw Error("Received an improper response from the Preview server.");var f=document.getElementById("preview");// when the iframe loads we want our iframe loaded event to fire
	// so we can remove the loader
	f.addEventListener("load",onIframeLoadedHideLoaderUI),console.log("Loading Gatsby Preview in an iframe..."),f.src=initialState.previewFrontendUrl+e.pageNode.path;var g=new Event("wp-gatsby-preview-ready");document.dispatchEvent(g);}function onIframeLoadedHideLoaderUI(){var a=document.getElementById("loader");// this delay prevents a flash between
	// the iframe painting and the loader dissapearing
	console.log("Loaded Gatsby Preview!"),console.log(a),setTimeout(function(){// there is a fadeout css animation on this
	a.classList.add("loaded"),setTimeout(function(){// we wait a sec to display none so the css animation fadeout can complete
	a.style.display="none";},100);},50);}var requestPreviewFrontendIsOnline=/*#__PURE__*/function(){var a=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){var b,c,d;return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/?".concat(initialState.graphqlEndpoint),{method:"POST",body:JSON.stringify({query:previewFrontendIsOnlineQuery}),headers:{"Content-Type":"application/json"}});case 2:return a.next=4,a.sent.json();case 4:if(a.t1=b=a.sent,a.t0=null===a.t1,a.t0){a.next=8;break}a.t0=void 0===b;case 8:if(!a.t0){a.next=12;break}a.t2=void 0,a.next=13;break;case 12:a.t2=null===(c=b.data)||void 0===c||null===(d=c.wpGatsby)||void 0===d?void 0:d.isPreviewFrontendOnline;case 13:return a.abrupt("return",a.t2);case 14:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}(),frontendOnlineCheckCount=0;/**
	 * If our backend webhook preview POST came back with an error, we can't be sure our frontend is online.
	 * So this function checks just that and then after 10 seconds (+ request time) of it not being online it will show an error
	 * If it's online it will start the preview status watcher and update the UI
	 */function doubleCheckIfPreviewFrontendIsOnline(){return _doubleCheckIfPreviewFrontendIsOnline.apply(this,arguments)}function _doubleCheckIfPreviewFrontendIsOnline(){return _doubleCheckIfPreviewFrontendIsOnline=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){var b;return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,requestPreviewFrontendIsOnline();case 2:if(b=a.sent,!b){a.next=8;break}return a.next=6,fetchPreviewStatusAndUpdateUI();case 6:a.next=18;break;case 8:if(!(10>frontendOnlineCheckCount)){a.next=17;break}return console.log("frontend not online.. rechecking"),frontendOnlineCheckCount++,a.next=13,new Promise(function(a){return setTimeout(a,1e3)});case 13:return a.next=15,doubleCheckIfPreviewFrontendIsOnline();case 15:a.next=18;break;case 17:throw Error("The Gatsby Preview frontend is not responding to requests.");case 18:case"end":return a.stop();}},a)})),_doubleCheckIfPreviewFrontendIsOnline.apply(this,arguments)}

	start().catch(function(a){console.error(a),"complete"===document.readyState?showError(a):document.addEventListener("DOMContentLoaded",function(){showError(a);});});function start(){return _start.apply(this,arguments)}function _start(){return _start=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!initialState.previewWebhookIsOnline){a.next=5;break}return a.next=3,fetchPreviewStatusAndUpdateUI();case 3:a.next=7;break;case 5:return a.next=7,doubleCheckIfPreviewFrontendIsOnline();case 7:case"end":return a.stop();}},a)})),_start.apply(this,arguments)}

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1jbGllbnQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wdXJlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLnRvLXN0cmluZy10YWcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5yZXZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLm5hbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmpzb24udG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtc3BlY2llcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1pbnN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jbG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9taWNyb3Rhc2suanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BlcmZvcm0uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb20taXRlcmFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5qb2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLW5hdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZWVlNzU0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS1idWZmZXIuY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LWJ1ZmZlci5zbGljZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5zcGxpdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy50cmltLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHlwZWQtYXJyYXktY29uc3RydWN0b3JzLXJlcXVpcmUtd3JhcHBlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcG9zaXRpdmUtaW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vZmZzZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHlwZWQtYXJyYXktZnJvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3R5cGVkLWFycmF5LWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS51aW50OC1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1jb3B5LXdpdGhpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkuY29weS13aXRoaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmV2ZXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5maWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmZpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmZpbmQtaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkuaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5qb2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWxhc3QtaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5Lmxhc3QtaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5Lm1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1yZWR1Y2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LnJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkucmVkdWNlLXJpZ2h0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5yZXZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zb21lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zdWJhcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkudG8tbG9jYWxlLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS11cmwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mcm9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1wdW55Y29kZS10by1hc2NpaS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi51cmwtc2VhcmNoLXBhcmFtcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnVybC5qcyIsIi4uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIi4uL3NyYy9lcnJvci13YXJuaW5nLnRzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcy5qcyIsIi4uL3NyYy9wcmV2aWV3LXN0YXR1cy50cyIsIi4uL3NyYy9zdGFydC1wcmV2aWV3LWNsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQuY2FsbChpdCwgJycpIDogT2JqZWN0KGl0KTtcbn0gOiBPYmplY3Q7XG4iLCIvLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcblxudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy43LjAnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMjAgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIHZhciBzdGF0ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgJiYgIWhhcyh2YWx1ZSwgJ25hbWUnKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHZhbHVlLCAnbmFtZScsIGtleSk7XG4gICAgfVxuICAgIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpO1xuICAgIGlmICghc3RhdGUuc291cmNlKSB7XG4gICAgICBzdGF0ZS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBrZXkgOiAnJyk7XG4gICAgfVxuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KE8sIGtleSwgdmFsdWUpO1xuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBUb0ludGVnZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgIVN5bWJvbC5zaGFtXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80NzVcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhKUyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCdkb2N1bWVudC5GPU9iamVjdCcpKTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgcmV0dXJuIGlmcmFtZURvY3VtZW50LkY7XG59O1xuXG4vLyBDaGVjayBmb3IgZG9jdW1lbnQuZG9tYWluIGFuZCBhY3RpdmUgeCBzdXBwb3J0XG4vLyBObyBuZWVkIHRvIHVzZSBhY3RpdmUgeCBhcHByb2FjaCB3aGVuIGRvY3VtZW50LmRvbWFpbiBpcyBub3Qgc2V0XG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltL2lzc3Vlcy8xNTBcbi8vIHZhcmlhdGlvbiBvZiBodHRwczovL2dpdGh1Yi5jb20va2l0Y2FtYnJpZGdlL2VzNS1zaGltL2NvbW1pdC80ZjczOGFjMDY2MzQ2XG4vLyBhdm9pZCBJRSBHQyBidWdcbnZhciBhY3RpdmVYRG9jdW1lbnQ7XG52YXIgTnVsbFByb3RvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0ICovXG4gICAgYWN0aXZlWERvY3VtZW50ID0gZG9jdW1lbnQuZG9tYWluICYmIG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSBhY3RpdmVYRG9jdW1lbnQgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5Q29uc3RydWN0b3IoKTtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IE51bGxQcm90b09iamVjdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChpdCkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgZWxzZSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbmV4cG9ydHMuZiA9IHdlbGxLbm93blN5bWJvbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgdmFyIFN5bWJvbCA9IHBhdGguU3ltYm9sIHx8IChwYXRoLlN5bWJvbCA9IHt9KTtcbiAgaWYgKCFoYXMoU3ltYm9sLCBOQU1FKSkgZGVmaW5lUHJvcGVydHkoU3ltYm9sLCBOQU1FLCB7XG4gICAgdmFsdWU6IHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZihOQU1FKVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQpO1xuICAgIH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBuZXcgKEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQykobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBuYXRpdmVPYmplY3RDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBISURERU4gPSBzaGFyZWRLZXkoJ2hpZGRlbicpO1xudmFyIFNZTUJPTCA9ICdTeW1ib2wnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNZTUJPTCk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJHN0cmluZ2lmeSA9IGdldEJ1aWx0SW4oJ0pTT04nLCAnc3RyaW5naWZ5Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZjtcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvdHlwZVN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgVVNFX1NFVFRFUiA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RDcmVhdGUobmF0aXZlRGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgdmFyIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCBQKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpIGRlbGV0ZSBPYmplY3RQcm90b3R5cGVbUF07XG4gIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciAmJiBPICE9PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGUsIFAsIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpO1xuICB9XG59IDogbmF0aXZlRGVmaW5lUHJvcGVydHk7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZywgZGVzY3JpcHRpb24pIHtcbiAgdmFyIHN5bWJvbCA9IEFsbFN5bWJvbHNbdGFnXSA9IG5hdGl2ZU9iamVjdENyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzZXRJbnRlcm5hbFN0YXRlKHN5bWJvbCwge1xuICAgIHR5cGU6IFNZTUJPTCxcbiAgICB0YWc6IHRhZyxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHN5bWJvbC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gc3ltYm9sO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChpdCkgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgaWYgKE8gPT09IE9iamVjdFByb3RvdHlwZSkgJGRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFAsIEF0dHJpYnV0ZXMpO1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFBdHRyaWJ1dGVzLmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKE8sIEhJRERFTikpIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIEhJRERFTiwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHt9KSk7XG4gICAgICBPW0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoTywgSElEREVOKSAmJiBPW0hJRERFTl1ba2V5XSkgT1tISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSBuYXRpdmVPYmplY3RDcmVhdGUoQXR0cmlidXRlcywgeyBlbnVtZXJhYmxlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2NyaXB0b3IoTywga2V5LCBBdHRyaWJ1dGVzKTtcbiAgfSByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywga2V5LCBBdHRyaWJ1dGVzKTtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BlcnRpZXMgPSB0b0luZGV4ZWRPYmplY3QoUHJvcGVydGllcyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhwcm9wZXJ0aWVzKS5jb25jYXQoJGdldE93blByb3BlcnR5U3ltYm9scyhwcm9wZXJ0aWVzKSk7XG4gICRmb3JFYWNoKGtleXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIURFU0NSSVBUT1JTIHx8ICRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHByb3BlcnRpZXMsIGtleSkpICRkZWZpbmVQcm9wZXJ0eShPLCBrZXksIHByb3BlcnRpZXNba2V5XSk7XG4gIH0pO1xuICByZXR1cm4gTztcbn07XG5cbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IG5hdGl2ZU9iamVjdENyZWF0ZShPKSA6ICRkZWZpbmVQcm9wZXJ0aWVzKG5hdGl2ZU9iamVjdENyZWF0ZShPKSwgUHJvcGVydGllcyk7XG59O1xuXG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgUCA9IHRvUHJpbWl0aXZlKFYsIHRydWUpO1xuICB2YXIgZW51bWVyYWJsZSA9IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGhpcywgUCk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIFApICYmICFoYXMoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGVudW1lcmFibGUgfHwgIWhhcyh0aGlzLCBQKSB8fCAhaGFzKEFsbFN5bWJvbHMsIFApIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtQXSA/IGVudW1lcmFibGUgOiB0cnVlO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICB2YXIgaXQgPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBkZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSB7XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoaGlkZGVuS2V5cywga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhPKSB7XG4gIHZhciBJU19PQkpFQ1RfUFJPVE9UWVBFID0gTyA9PT0gT2JqZWN0UHJvdG90eXBlO1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKElTX09CSkVDVF9QUk9UT1RZUEUgPyBPYmplY3RQcm90b3R5cGVTeW1ib2xzIDogdG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSAmJiAoIUlTX09CSkVDVF9QUk9UT1RZUEUgfHwgaGFzKE9iamVjdFByb3RvdHlwZSwga2V5KSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIGBTeW1ib2xgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wtY29uc3RydWN0b3JcbmlmICghTkFUSVZFX1NZTUJPTCkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAhYXJndW1lbnRzLmxlbmd0aCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciB0YWcgPSB1aWQoZGVzY3JpcHRpb24pO1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUpIHNldHRlci5jYWxsKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzY3JpcHRvcih0aGlzLCB0YWcsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIFVTRV9TRVRURVIpIHNldFN5bWJvbERlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6IHNldHRlciB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcsIGRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnRhZztcbiAgfSk7XG5cbiAgcmVkZWZpbmUoJFN5bWJvbCwgJ3dpdGhvdXRTZXR0ZXInLCBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gd3JhcCh1aWQoZGVzY3JpcHRpb24pLCBkZXNjcmlwdGlvbik7XG4gIH0pO1xuXG4gIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIGRlZmluZVByb3BlcnR5TW9kdWxlLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2VsbEtub3duU3ltYm9sKG5hbWUpLCBuYW1lKTtcbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1TeW1ib2wtZGVzY3JpcHRpb25cbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sICdkZXNjcmlwdGlvbicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghSVNfUFVSRSkge1xuICAgICAgcmVkZWZpbmUoT2JqZWN0UHJvdG90eXBlLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHsgdW5zYWZlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCB3cmFwOiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MLCBzaGFtOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIFN5bWJvbDogJFN5bWJvbFxufSk7XG5cbiRmb3JFYWNoKG9iamVjdEtleXMoV2VsbEtub3duU3ltYm9sc1N0b3JlKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVmaW5lV2VsbEtub3duU3ltYm9sKG5hbWUpO1xufSk7XG5cbiQoeyB0YXJnZXQ6IFNZTUJPTCwgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBTeW1ib2wuZm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLmZvclxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcoa2V5KTtcbiAgICBpZiAoaGFzKFN0cmluZ1RvU3ltYm9sUmVnaXN0cnksIHN0cmluZykpIHJldHVybiBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ107XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woc3RyaW5nKTtcbiAgICBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ10gPSBzeW1ib2w7XG4gICAgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1ib2xdID0gc3RyaW5nO1xuICAgIHJldHVybiBzeW1ib2w7XG4gIH0sXG4gIC8vIGBTeW1ib2wua2V5Rm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLmtleWZvclxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuICAgIGlmIChoYXMoU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSwgc3ltKSkgcmV0dXJuIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltXTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IGZhbHNlOyB9XG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIC8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlzeW1ib2xzXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIENocm9tZSAzOCBhbmQgMzkgYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIGZhaWxzIG9uIHByaW1pdGl2ZXNcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM0NDNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IGZhaWxzKGZ1bmN0aW9uICgpIHsgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYoMSk7IH0pIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbi8vIGBKU09OLnN0cmluZ2lmeWAgbWV0aG9kIGJlaGF2aW9yIHdpdGggc3ltYm9sc1xuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtanNvbi5zdHJpbmdpZnlcbmlmICgkc3RyaW5naWZ5KSB7XG4gIHZhciBGT1JDRURfSlNPTl9TVFJJTkdJRlkgPSAhTkFUSVZFX1NZTUJPTCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woKTtcbiAgICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAgIHJldHVybiAkc3RyaW5naWZ5KFtzeW1ib2xdKSAhPSAnW251bGxdJ1xuICAgICAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gICAgICB8fCAkc3RyaW5naWZ5KHsgYTogc3ltYm9sIH0pICE9ICd7fSdcbiAgICAgIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gICAgICB8fCAkc3RyaW5naWZ5KE9iamVjdChzeW1ib2wpKSAhPSAne30nO1xuICB9KTtcblxuICAkKHsgdGFyZ2V0OiAnSlNPTicsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEX0pTT05fU1RSSU5HSUZZIH0sIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgICB2YXIgaW5kZXggPSAxO1xuICAgICAgdmFyICRyZXBsYWNlcjtcbiAgICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaW5kZXgpIGFyZ3MucHVzaChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgICAgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgICAgcmV0dXJuICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvcHJpbWl0aXZlXG5pZiAoISRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xufVxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11gIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsIFNZTUJPTCk7XG5cbmhpZGRlbktleXNbSElEREVOXSA9IHRydWU7XG4iLCIvLyBgU3ltYm9sLnByb3RvdHlwZS5kZXNjcmlwdGlvbmAgZ2V0dGVyXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLmRlc2NyaXB0aW9uXG4ndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcblxudmFyIE5hdGl2ZVN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG5cbmlmIChERVNDUklQVE9SUyAmJiB0eXBlb2YgTmF0aXZlU3ltYm9sID09ICdmdW5jdGlvbicgJiYgKCEoJ2Rlc2NyaXB0aW9uJyBpbiBOYXRpdmVTeW1ib2wucHJvdG90eXBlKSB8fFxuICAvLyBTYWZhcmkgMTIgYnVnXG4gIE5hdGl2ZVN5bWJvbCgpLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWRcbikpIHtcbiAgdmFyIEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZSA9IHt9O1xuICAvLyB3cmFwIFN5bWJvbCBjb25zdHJ1Y3RvciBmb3IgY29ycmVjdCB3b3JrIHdpdGggdW5kZWZpbmVkIGRlc2NyaXB0aW9uXG4gIHZhciBTeW1ib2xXcmFwcGVyID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIHZhciBkZXNjcmlwdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMgaW5zdGFuY2VvZiBTeW1ib2xXcmFwcGVyXG4gICAgICA/IG5ldyBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pXG4gICAgICAvLyBpbiBFZGdlIDEzLCBTdHJpbmcoU3ltYm9sKHVuZGVmaW5lZCkpID09PSAnU3ltYm9sKHVuZGVmaW5lZCknXG4gICAgICA6IGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyBOYXRpdmVTeW1ib2woKSA6IE5hdGl2ZVN5bWJvbChkZXNjcmlwdGlvbik7XG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSAnJykgRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlW3Jlc3VsdF0gPSB0cnVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoU3ltYm9sV3JhcHBlciwgTmF0aXZlU3ltYm9sKTtcbiAgdmFyIHN5bWJvbFByb3RvdHlwZSA9IFN5bWJvbFdyYXBwZXIucHJvdG90eXBlID0gTmF0aXZlU3ltYm9sLnByb3RvdHlwZTtcbiAgc3ltYm9sUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ltYm9sV3JhcHBlcjtcblxuICB2YXIgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBuYXRpdmUgPSBTdHJpbmcoTmF0aXZlU3ltYm9sKCd0ZXN0JykpID09ICdTeW1ib2wodGVzdCknO1xuICB2YXIgcmVnZXhwID0gL15TeW1ib2xcXCgoLiopXFwpW14pXSskLztcbiAgZGVmaW5lUHJvcGVydHkoc3ltYm9sUHJvdG90eXBlLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICB2YXIgc3ltYm9sID0gaXNPYmplY3QodGhpcykgPyB0aGlzLnZhbHVlT2YoKSA6IHRoaXM7XG4gICAgICB2YXIgc3RyaW5nID0gc3ltYm9sVG9TdHJpbmcuY2FsbChzeW1ib2wpO1xuICAgICAgaWYgKGhhcyhFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmUsIHN5bWJvbCkpIHJldHVybiAnJztcbiAgICAgIHZhciBkZXNjID0gbmF0aXZlID8gc3RyaW5nLnNsaWNlKDcsIC0xKSA6IHN0cmluZy5yZXBsYWNlKHJlZ2V4cCwgJyQxJyk7XG4gICAgICByZXR1cm4gZGVzYyA9PT0gJycgPyB1bmRlZmluZWQgOiBkZXNjO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiB0cnVlIH0sIHtcbiAgICBTeW1ib2w6IFN5bWJvbFdyYXBwZXJcbiAgfSk7XG59XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmFzeW5jSXRlcmF0b3JgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wuYXN5bmNpdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLml0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLml0ZXJhdG9yXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3ltYm9sLnRvc3RyaW5ndGFnXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBjYWNoZSA9IHt9O1xuXG52YXIgdGhyb3dlciA9IGZ1bmN0aW9uIChpdCkgeyB0aHJvdyBpdDsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIG9wdGlvbnMpIHtcbiAgaWYgKGhhcyhjYWNoZSwgTUVUSE9EX05BTUUpKSByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgdmFyIEFDQ0VTU09SUyA9IGhhcyhvcHRpb25zLCAnQUNDRVNTT1JTJykgPyBvcHRpb25zLkFDQ0VTU09SUyA6IGZhbHNlO1xuICB2YXIgYXJndW1lbnQwID0gaGFzKG9wdGlvbnMsIDApID8gb3B0aW9uc1swXSA6IHRocm93ZXI7XG4gIHZhciBhcmd1bWVudDEgPSBoYXMob3B0aW9ucywgMSkgPyBvcHRpb25zWzFdIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiBjYWNoZVtNRVRIT0RfTkFNRV0gPSAhIW1ldGhvZCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIGlmIChBQ0NFU1NPUlMgJiYgIURFU0NSSVBUT1JTKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgTyA9IHsgbGVuZ3RoOiAtMSB9O1xuXG4gICAgaWYgKEFDQ0VTU09SUykgZGVmaW5lUHJvcGVydHkoTywgMSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IHRocm93ZXIgfSk7XG4gICAgZWxzZSBPWzFdID0gMTtcblxuICAgIG1ldGhvZC5jYWxsKE8sIGFyZ3VtZW50MCwgYXJndW1lbnQxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICghU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEgpID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxuaWYgKEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICghSVNfUFVSRSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJdGVyYXRvclByb3RvdHlwZTogSXRlcmF0b3JQcm90b3R5cGUsXG4gIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlM6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlNcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIEl0ZXJhdG9yQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JDb25zdHJ1Y3RvciwgVE9fU1RSSU5HX1RBRywgZmFsc2UsIHRydWUpO1xuICBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICByZXR1cm4gSXRlcmF0b3JDb25zdHJ1Y3Rvcjtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCB0cnVlLCB0cnVlKTtcbiAgICAgIGlmIChJU19QVVJFKSBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRkFVTFQgPT0gVkFMVUVTICYmIG5hdGl2ZUl0ZXJhdG9yICYmIG5hdGl2ZUl0ZXJhdG9yLm5hbWUgIT09IFZBTFVFUykge1xuICAgIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IHRydWU7XG4gICAgZGVmYXVsdEl0ZXJhdG9yID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmF0aXZlSXRlcmF0b3IuY2FsbCh0aGlzKTsgfTtcbiAgfVxuXG4gIC8vIGRlZmluZSBpdGVyYXRvclxuICBpZiAoKCFJU19QVVJFIHx8IEZPUkNFRCkgJiYgSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdICE9PSBkZWZhdWx0SXRlcmF0b3IpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgQVJSQVlfSVRFUkFUT1IgPSAnQXJyYXkgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoQVJSQVlfSVRFUkFUT1IpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnZhbHVlc1xuLy8gYEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4geyB2YWx1ZTogaW5kZXgsIGRvbmU6IGZhbHNlIH07XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4geyB2YWx1ZTogdGFyZ2V0W2luZGV4XSwgZG9uZTogZmFsc2UgfTtcbiAgcmV0dXJuIHsgdmFsdWU6IFtpbmRleCwgdGFyZ2V0W2luZGV4XV0sIGRvbmU6IGZhbHNlIH07XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xuXG52YXIgbmF0aXZlUmV2ZXJzZSA9IFtdLnJldmVyc2U7XG52YXIgdGVzdCA9IFsxLCAyXTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5yZXZlcnNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZXZlcnNlXG4vLyBmaXggZm9yIFNhZmFyaSAxMi4wIGJ1Z1xuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE4ODc5NFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogU3RyaW5nKHRlc3QpID09PSBTdHJpbmcodGVzdC5yZXZlcnNlKCkpIH0sIHtcbiAgcmV2ZXJzZTogZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1hc3NpZ25cbiAgICBpZiAoaXNBcnJheSh0aGlzKSkgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gbmF0aXZlUmV2ZXJzZS5jYWxsKHRoaXMpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1ByaW1pdGl2ZShrZXkpO1xuICBpZiAocHJvcGVydHlLZXkgaW4gb2JqZWN0KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwgcHJvcGVydHlLZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtwcm9wZXJ0eUtleV0gPSB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuICAvLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc3XG4gIHJldHVybiBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gYXJyYXkuY29uc3RydWN0b3IgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGZvbzogMSB9O1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5W01FVEhPRF9OQU1FXShCb29sZWFuKS5mb28gIT09IDE7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnc2xpY2UnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdzbGljZScsIHsgQUNDRVNTT1JTOiB0cnVlLCAwOiAwLCAxOiAyIH0pO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyIG5hdGl2ZVNsaWNlID0gW10uc2xpY2U7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc2xpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNsaWNlXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGsgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICAvLyBpbmxpbmUgYEFycmF5U3BlY2llc0NyZWF0ZWAgZm9yIHVzYWdlIG5hdGl2ZSBgQXJyYXkjc2xpY2VgIHdoZXJlIGl0J3MgcG9zc2libGVcbiAgICB2YXIgQ29uc3RydWN0b3IsIHJlc3VsdCwgbjtcbiAgICBpZiAoaXNBcnJheShPKSkge1xuICAgICAgQ29uc3RydWN0b3IgPSBPLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICAgIGlmICh0eXBlb2YgQ29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IGlzQXJyYXkoQ29uc3RydWN0b3IucHJvdG90eXBlKSkpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KENvbnN0cnVjdG9yKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yW1NQRUNJRVNdO1xuICAgICAgICBpZiAoQ29uc3RydWN0b3IgPT09IG51bGwpIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTbGljZS5jYWxsKE8sIGssIGZpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IG5ldyAoQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQ29uc3RydWN0b3IpKG1heChmaW4gLSBrLCAwKSk7XG4gICAgZm9yIChuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGlmIChrIGluIE8pIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcgPSBGdW5jdGlvblByb3RvdHlwZS50b1N0cmluZztcbnZhciBuYW1lUkUgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS87XG52YXIgTkFNRSA9ICduYW1lJztcblxuLy8gRnVuY3Rpb24gaW5zdGFuY2VzIGAubmFtZWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLWluc3RhbmNlcy1uYW1lXG5pZiAoREVTQ1JJUFRPUlMgJiYgIShOQU1FIGluIEZ1bmN0aW9uUHJvdG90eXBlKSkge1xuICBkZWZpbmVQcm9wZXJ0eShGdW5jdGlvblByb3RvdHlwZSwgTkFNRSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nLmNhbGwodGhpcykubWF0Y2gobmFtZVJFKVsxXTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xuXG4vLyBKU09OW0BAdG9TdHJpbmdUYWddIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1qc29uLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwidmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG5cbi8vIE1hdGhbQEB0b1N0cmluZ1RhZ10gcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW1hdGgtQEB0b3N0cmluZ3RhZ1xuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbmF0aXZlR2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBuYXRpdmVHZXRQcm90b3R5cGVPZigxKTsgfSk7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGQUlMU19PTl9QUklNSVRJVkVTLCBzaGFtOiAhQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSIH0sIHtcbiAgZ2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH1cbn0pO1xuXG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbmlmICghVE9fU1RSSU5HX1RBR19TVVBQT1JUKSB7XG4gIHJlZGVmaW5lKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIHRvU3RyaW5nLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbn1cbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlByb21pc2U7XG4iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29ycmVjdCAnICsgKG5hbWUgPyBuYW1lICsgJyAnIDogJycpICsgJ2ludm9jYXRpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvdHlwZVtJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gIHZhciByZXR1cm5NZXRob2QgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gIGlmIChyZXR1cm5NZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBhbk9iamVjdChyZXR1cm5NZXRob2QuY2FsbChpdGVyYXRvcikpLnZhbHVlO1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpdGVyYXRvckNsb3NlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlJyk7XG5cbnZhciBSZXN1bHQgPSBmdW5jdGlvbiAoc3RvcHBlZCwgcmVzdWx0KSB7XG4gIHRoaXMuc3RvcHBlZCA9IHN0b3BwZWQ7XG4gIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIHVuYm91bmRGdW5jdGlvbiwgb3B0aW9ucykge1xuICB2YXIgdGhhdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aGF0O1xuICB2YXIgQVNfRU5UUklFUyA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5BU19FTlRSSUVTKTtcbiAgdmFyIElTX0lURVJBVE9SID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklTX0lURVJBVE9SKTtcbiAgdmFyIElOVEVSUlVQVEVEID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklOVEVSUlVQVEVEKTtcbiAgdmFyIGZuID0gYmluZCh1bmJvdW5kRnVuY3Rpb24sIHRoYXQsIDEgKyBBU19FTlRSSUVTICsgSU5URVJSVVBURUQpO1xuICB2YXIgaXRlcmF0b3IsIGl0ZXJGbiwgaW5kZXgsIGxlbmd0aCwgcmVzdWx0LCBuZXh0LCBzdGVwO1xuXG4gIHZhciBzdG9wID0gZnVuY3Rpb24gKGNvbmRpdGlvbikge1xuICAgIGlmIChpdGVyYXRvcikgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHQodHJ1ZSwgY29uZGl0aW9uKTtcbiAgfTtcblxuICB2YXIgY2FsbEZuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKEFTX0VOVFJJRVMpIHtcbiAgICAgIGFuT2JqZWN0KHZhbHVlKTtcbiAgICAgIHJldHVybiBJTlRFUlJVUFRFRCA/IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSwgc3RvcCkgOiBmbih2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0gcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWUsIHN0b3ApIDogZm4odmFsdWUpO1xuICB9O1xuXG4gIGlmIChJU19JVEVSQVRPUikge1xuICAgIGl0ZXJhdG9yID0gaXRlcmFibGU7XG4gIH0gZWxzZSB7XG4gICAgaXRlckZuID0gZ2V0SXRlcmF0b3JNZXRob2QoaXRlcmFibGUpO1xuICAgIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBpdGVyYWJsZScpO1xuICAgIC8vIG9wdGltaXNhdGlvbiBmb3IgYXJyYXkgaXRlcmF0b3JzXG4gICAgaWYgKGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyRm4pKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbEZuKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG4gICAgfVxuICAgIGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpO1xuICB9XG5cbiAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gIHdoaWxlICghKHN0ZXAgPSBuZXh0LmNhbGwoaXRlcmF0b3IpKS5kb25lKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGNhbGxGbihzdGVwLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmIHJlc3VsdCBpbnN0YW5jZW9mIFJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oaXBob25lfGlwb2R8aXBhZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSkuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhciA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChJU19OT0RFKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2socnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIC8vIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjI0XG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwgJiYgIUlTX0lPUykge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gYmluZChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiZcbiAgICB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICFnbG9iYWwuaW1wb3J0U2NyaXB0cyAmJlxuICAgIGxvY2F0aW9uICYmIGxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgIWZhaWxzKHBvc3QpXG4gICkge1xuICAgIGRlZmVyID0gcG9zdDtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChydW5uZXIoaWQpLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbi8vIE5vZGUuanMgMTEgc2hvd3MgRXhwZXJpbWVudGFsV2FybmluZyBvbiBnZXR0aW5nIGBxdWV1ZU1pY3JvdGFza2BcbnZhciBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCAncXVldWVNaWNyb3Rhc2snKTtcbnZhciBxdWV1ZU1pY3JvdGFzayA9IHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciAmJiBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IudmFsdWU7XG5cbnZhciBmbHVzaCwgaGVhZCwgbGFzdCwgbm90aWZ5LCB0b2dnbGUsIG5vZGUsIHByb21pc2UsIHRoZW47XG5cbi8vIG1vZGVybiBlbmdpbmVzIGhhdmUgcXVldWVNaWNyb3Rhc2sgbWV0aG9kXG5pZiAoIXF1ZXVlTWljcm90YXNrKSB7XG4gIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChJU19OT0RFICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIGlmICghSVNfSU9TICYmICFJU19OT0RFICYmIE11dGF0aW9uT2JzZXJ2ZXIgJiYgZG9jdW1lbnQpIHtcbiAgICB0b2dnbGUgPSB0cnVlO1xuICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIHRoZW4gPSBwcm9taXNlLnRoZW47XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhlbi5jYWxsKHByb21pc2UsIGZsdXNoKTtcbiAgICB9O1xuICAvLyBOb2RlLmpzIHdpdGhvdXQgcHJvbWlzZXNcbiAgfSBlbHNlIGlmIChJU19OT0RFKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBxdWV1ZU1pY3JvdGFzayB8fCBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICBpZiAoIWhlYWQpIHtcbiAgICBoZWFkID0gdGFzaztcbiAgICBub3RpZnkoKTtcbiAgfSBsYXN0ID0gdGFzaztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG5cbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICB2YXIgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlO1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGNvbnNvbGUuZXJyb3IoYSkgOiBjb25zb2xlLmVycm9yKGEsIGIpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGVycm9yOiBmYWxzZSwgdmFsdWU6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IGVycm9yOiB0cnVlLCB2YWx1ZTogZXJyb3IgfTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIE5hdGl2ZVByb21pc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXByb21pc2UtY29uc3RydWN0b3InKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lLWFsbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgc2V0U3BlY2llcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtc3BlY2llcycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcbnZhciBjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21pY3JvdGFzaycpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIGhvc3RSZXBvcnRFcnJvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFBST01JU0UpO1xudmFyIFByb21pc2VDb25zdHJ1Y3RvciA9IE5hdGl2ZVByb21pc2U7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgJGZldGNoID0gZ2V0QnVpbHRJbignZmV0Y2gnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG52YXIgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHk7XG52YXIgRElTUEFUQ0hfRVZFTlQgPSAhIShkb2N1bWVudCAmJiBkb2N1bWVudC5jcmVhdGVFdmVudCAmJiBnbG9iYWwuZGlzcGF0Y2hFdmVudCk7XG52YXIgTkFUSVZFX1JFSkVDVElPTl9FVkVOVCA9IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJztcbnZhciBVTkhBTkRMRURfUkVKRUNUSU9OID0gJ3VuaGFuZGxlZHJlamVjdGlvbic7XG52YXIgUkVKRUNUSU9OX0hBTkRMRUQgPSAncmVqZWN0aW9uaGFuZGxlZCc7XG52YXIgUEVORElORyA9IDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG52YXIgSEFORExFRCA9IDE7XG52YXIgVU5IQU5ETEVEID0gMjtcbnZhciBJbnRlcm5hbCwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFByb21pc2VXcmFwcGVyLCBuYXRpdmVUaGVuO1xuXG52YXIgRk9SQ0VEID0gaXNGb3JjZWQoUFJPTUlTRSwgZnVuY3Rpb24gKCkge1xuICB2YXIgR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSA9IGluc3BlY3RTb3VyY2UoUHJvbWlzZUNvbnN0cnVjdG9yKSAhPT0gU3RyaW5nKFByb21pc2VDb25zdHJ1Y3Rvcik7XG4gIGlmICghR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSkge1xuICAgIC8vIFY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAvLyBXZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgIGlmIChWOF9WRVJTSU9OID09PSA2NikgcmV0dXJuIHRydWU7XG4gICAgLy8gVW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIGlmICghSVNfTk9ERSAmJiAhTkFUSVZFX1JFSkVDVElPTl9FVkVOVCkgcmV0dXJuIHRydWU7XG4gIH1cbiAgLy8gV2UgbmVlZCBQcm9taXNlI2ZpbmFsbHkgaW4gdGhlIHB1cmUgdmVyc2lvbiBmb3IgcHJldmVudGluZyBwcm90b3R5cGUgcG9sbHV0aW9uXG4gIGlmIChJU19QVVJFICYmICFQcm9taXNlQ29uc3RydWN0b3IucHJvdG90eXBlWydmaW5hbGx5J10pIHJldHVybiB0cnVlO1xuICAvLyBXZSBjYW4ndCB1c2UgQEBzcGVjaWVzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuICAvLyBkZW9wdGltaXphdGlvbiBhbmQgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxuICBpZiAoVjhfVkVSU0lPTiA+PSA1MSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoUHJvbWlzZUNvbnN0cnVjdG9yKSkgcmV0dXJuIGZhbHNlO1xuICAvLyBEZXRlY3QgY29ycmVjdG5lc3Mgb2Ygc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICB2YXIgcHJvbWlzZSA9IFByb21pc2VDb25zdHJ1Y3Rvci5yZXNvbHZlKDEpO1xuICB2YXIgRmFrZVByb21pc2UgPSBmdW5jdGlvbiAoZXhlYykge1xuICAgIGV4ZWMoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xuICB9O1xuICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yID0ge307XG4gIGNvbnN0cnVjdG9yW1NQRUNJRVNdID0gRmFrZVByb21pc2U7XG4gIHJldHVybiAhKHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pIGluc3RhbmNlb2YgRmFrZVByb21pc2UpO1xufSk7XG5cbnZhciBJTkNPUlJFQ1RfSVRFUkFUSU9OID0gRk9SQ0VEIHx8ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIFByb21pc2VDb25zdHJ1Y3Rvci5hbGwoaXRlcmFibGUpWydjYXRjaCddKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG59KTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG5cbnZhciBub3RpZnkgPSBmdW5jdGlvbiAoc3RhdGUsIGlzUmVqZWN0KSB7XG4gIGlmIChzdGF0ZS5ub3RpZmllZCkgcmV0dXJuO1xuICBzdGF0ZS5ub3RpZmllZCA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHN0YXRlLnJlYWN0aW9ucztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBzdGF0ZS52YWx1ZTtcbiAgICB2YXIgb2sgPSBzdGF0ZS5zdGF0ZSA9PSBGVUxGSUxMRUQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gY2hhaW5baW5kZXgrK107XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZWplY3Rpb24gPT09IFVOSEFORExFRCkgb25IYW5kbGVVbmhhbmRsZWQoc3RhdGUpO1xuICAgICAgICAgICAgc3RhdGUucmVqZWN0aW9uID0gSEFORExFRDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gY2FuIHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGF0ZS5yZWFjdGlvbnMgPSBbXTtcbiAgICBzdGF0ZS5ub3RpZmllZCA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhc3RhdGUucmVqZWN0aW9uKSBvblVuaGFuZGxlZChzdGF0ZSk7XG4gIH0pO1xufTtcblxudmFyIGRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAobmFtZSwgcHJvbWlzZSwgcmVhc29uKSB7XG4gIHZhciBldmVudCwgaGFuZGxlcjtcbiAgaWYgKERJU1BBVENIX0VWRU5UKSB7XG4gICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldmVudC5wcm9taXNlID0gcHJvbWlzZTtcbiAgICBldmVudC5yZWFzb24gPSByZWFzb247XG4gICAgZXZlbnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKTtcbiAgICBnbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH0gZWxzZSBldmVudCA9IHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiByZWFzb24gfTtcbiAgaWYgKCFOQVRJVkVfUkVKRUNUSU9OX0VWRU5UICYmIChoYW5kbGVyID0gZ2xvYmFsWydvbicgKyBuYW1lXSkpIGhhbmRsZXIoZXZlbnQpO1xuICBlbHNlIGlmIChuYW1lID09PSBVTkhBTkRMRURfUkVKRUNUSU9OKSBob3N0UmVwb3J0RXJyb3JzKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCByZWFzb24pO1xufTtcblxudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHN0YXRlLmZhY2FkZTtcbiAgICB2YXIgdmFsdWUgPSBzdGF0ZS52YWx1ZTtcbiAgICB2YXIgSVNfVU5IQU5ETEVEID0gaXNVbmhhbmRsZWQoc3RhdGUpO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKElTX1VOSEFORExFRCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChJU19OT0RFKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBkaXNwYXRjaEV2ZW50KFVOSEFORExFRF9SRUpFQ1RJT04sIHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHN0YXRlLnJlamVjdGlvbiA9IElTX05PREUgfHwgaXNVbmhhbmRsZWQoc3RhdGUpID8gVU5IQU5ETEVEIDogSEFORExFRDtcbiAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHRocm93IHJlc3VsdC52YWx1ZTtcbiAgICB9XG4gIH0pO1xufTtcblxudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5yZWplY3Rpb24gIT09IEhBTkRMRUQgJiYgIXN0YXRlLnBhcmVudDtcbn07XG5cbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBzdGF0ZS5mYWNhZGU7XG4gICAgaWYgKElTX05PREUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBkaXNwYXRjaEV2ZW50KFJFSkVDVElPTl9IQU5ETEVELCBwcm9taXNlLCBzdGF0ZS52YWx1ZSk7XG4gIH0pO1xufTtcblxudmFyIGJpbmQgPSBmdW5jdGlvbiAoZm4sIHN0YXRlLCB1bndyYXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGZuKHN0YXRlLCB2YWx1ZSwgdW53cmFwKTtcbiAgfTtcbn07XG5cbnZhciBpbnRlcm5hbFJlamVjdCA9IGZ1bmN0aW9uIChzdGF0ZSwgdmFsdWUsIHVud3JhcCkge1xuICBpZiAoc3RhdGUuZG9uZSkgcmV0dXJuO1xuICBzdGF0ZS5kb25lID0gdHJ1ZTtcbiAgaWYgKHVud3JhcCkgc3RhdGUgPSB1bndyYXA7XG4gIHN0YXRlLnZhbHVlID0gdmFsdWU7XG4gIHN0YXRlLnN0YXRlID0gUkVKRUNURUQ7XG4gIG5vdGlmeShzdGF0ZSwgdHJ1ZSk7XG59O1xuXG52YXIgaW50ZXJuYWxSZXNvbHZlID0gZnVuY3Rpb24gKHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgdHJ5IHtcbiAgICBpZiAoc3RhdGUuZmFjYWRlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgdmFyIHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKTtcbiAgICBpZiAodGhlbikge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IGRvbmU6IGZhbHNlIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlc29sdmUsIHdyYXBwZXIsIHN0YXRlKSxcbiAgICAgICAgICAgIGJpbmQoaW50ZXJuYWxSZWplY3QsIHdyYXBwZXIsIHN0YXRlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaW50ZXJuYWxSZWplY3Qod3JhcHBlciwgZXJyb3IsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICBzdGF0ZS5zdGF0ZSA9IEZVTEZJTExFRDtcbiAgICAgIG5vdGlmeShzdGF0ZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpbnRlcm5hbFJlamVjdCh7IGRvbmU6IGZhbHNlIH0sIGVycm9yLCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoRk9SQ0VEKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFByb21pc2VDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsIFByb21pc2VDb25zdHJ1Y3RvciwgUFJPTUlTRSk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGJpbmQoaW50ZXJuYWxSZXNvbHZlLCBzdGF0ZSksIGJpbmQoaW50ZXJuYWxSZWplY3QsIHN0YXRlKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGludGVybmFsUmVqZWN0KHN0YXRlLCBlcnJvcik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgICB0eXBlOiBQUk9NSVNFLFxuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICBub3RpZmllZDogZmFsc2UsXG4gICAgICBwYXJlbnQ6IGZhbHNlLFxuICAgICAgcmVhY3Rpb25zOiBbXSxcbiAgICAgIHJlamVjdGlvbjogZmFsc2UsXG4gICAgICBzdGF0ZTogUEVORElORyxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS50aGVuYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcm9taXNlLnByb3RvdHlwZS50aGVuXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQcm9taXNlU3RhdGUodGhpcyk7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgUHJvbWlzZUNvbnN0cnVjdG9yKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IElTX05PREUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHN0YXRlLnBhcmVudCA9IHRydWU7XG4gICAgICBzdGF0ZS5yZWFjdGlvbnMucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAoc3RhdGUuc3RhdGUgIT0gUEVORElORykgbm90aWZ5KHN0YXRlLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS5jYXRjaGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZShwcm9taXNlKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGJpbmQoaW50ZXJuYWxSZXNvbHZlLCBzdGF0ZSk7XG4gICAgdGhpcy5yZWplY3QgPSBiaW5kKGludGVybmFsUmVqZWN0LCBzdGF0ZSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09IFByb21pc2VDb25zdHJ1Y3RvciB8fCBDID09PSBQcm9taXNlV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xuXG4gIGlmICghSVNfUFVSRSAmJiB0eXBlb2YgTmF0aXZlUHJvbWlzZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgbmF0aXZlVGhlbiA9IE5hdGl2ZVByb21pc2UucHJvdG90eXBlLnRoZW47XG5cbiAgICAvLyB3cmFwIG5hdGl2ZSBQcm9taXNlI3RoZW4gZm9yIG5hdGl2ZSBhc3luYyBmdW5jdGlvbnNcbiAgICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ3RoZW4nLCBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2VDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG5hdGl2ZVRoZW4uY2FsbCh0aGF0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY0MFxuICAgIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xuXG4gICAgLy8gd3JhcCBmZXRjaCByZXN1bHRcbiAgICBpZiAodHlwZW9mICRmZXRjaCA9PSAnZnVuY3Rpb24nKSAkKHsgZ2xvYmFsOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShQcm9taXNlQ29uc3RydWN0b3IsICRmZXRjaC5hcHBseShnbG9iYWwsIGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgUHJvbWlzZTogUHJvbWlzZUNvbnN0cnVjdG9yXG59KTtcblxuc2V0VG9TdHJpbmdUYWcoUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFLCBmYWxzZSwgdHJ1ZSk7XG5zZXRTcGVjaWVzKFBST01JU0UpO1xuXG5Qcm9taXNlV3JhcHBlciA9IGdldEJ1aWx0SW4oUFJPTUlTRSk7XG5cbi8vIHN0YXRpY3NcbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVqZWN0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZWplY3RcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgY2FwYWJpbGl0eS5yZWplY3QuY2FsbCh1bmRlZmluZWQsIHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElTX1BVUkUgfHwgRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVzb2x2ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXByb21pc2UucmVzb2x2ZVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoSVNfUFVSRSAmJiB0aGlzID09PSBQcm9taXNlV3JhcHBlciA/IFByb21pc2VDb25zdHJ1Y3RvciA6IHRoaXMsIHgpO1xuICB9XG59KTtcblxuJCh7IHRhcmdldDogUFJPTUlTRSwgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgLy8gYFByb21pc2UuYWxsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbGxcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIGBQcm9taXNlLnJhY2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJhY2VcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbmlmIChOT1RfR0VORVJJQyB8fCBJTkNPUlJFQ1RfTkFNRSkge1xuICByZWRlZmluZShSZWdFeHAucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciBSID0gYW5PYmplY3QodGhpcyk7XG4gICAgdmFyIHAgPSBTdHJpbmcoUi5zb3VyY2UpO1xuICAgIHZhciByZiA9IFIuZmxhZ3M7XG4gICAgdmFyIGYgPSBTdHJpbmcocmYgPT09IHVuZGVmaW5lZCAmJiBSIGluc3RhbmNlb2YgUmVnRXhwICYmICEoJ2ZsYWdzJyBpbiBSZWdFeHBQcm90b3R5cGUpID8gZmxhZ3MuY2FsbChSKSA6IHJmKTtcbiAgICByZXR1cm4gJy8nICsgcCArICcvJyArIGY7XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IFN0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCAhPT0gZm9yRWFjaCkgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgJ2ZvckVhY2gnLCBmb3JFYWNoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggPSBmb3JFYWNoO1xuICB9XG59XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgQXJyYXlJdGVyYXRvck1ldGhvZHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEFycmF5SXRlcmF0b3JNZXRob2RzLnZhbHVlcztcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlKSB7XG4gICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdICE9PSBBcnJheVZhbHVlcykgdHJ5IHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSA9IEFycmF5VmFsdWVzO1xuICAgIH1cbiAgICBpZiAoIUNvbGxlY3Rpb25Qcm90b3R5cGVbVE9fU1RSSU5HX1RBR10pIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCBDT0xMRUNUSU9OX05BTUUpO1xuICAgIH1cbiAgICBpZiAoRE9NSXRlcmFibGVzW0NPTExFQ1RJT05fTkFNRV0pIGZvciAodmFyIE1FVEhPRF9OQU1FIGluIEFycmF5SXRlcmF0b3JNZXRob2RzKSB7XG4gICAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW01FVEhPRF9OQU1FXSAhPT0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKSB0cnkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgTUVUSE9EX05BTUUsIEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBDb2xsZWN0aW9uUHJvdG90eXBlW01FVEhPRF9OQU1FXSA9IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdpbmRleE9mJywgeyBBQ0NFU1NPUlM6IHRydWUsIDE6IDAgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUpvaW4gPSBbXS5qb2luO1xuXG52YXIgRVMzX1NUUklOR1MgPSBJbmRleGVkT2JqZWN0ICE9IE9iamVjdDtcbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnam9pbicsICcsJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuam9pbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuam9pblxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRVMzX1NUUklOR1MgfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuICAgIHJldHVybiBuYXRpdmVKb2luLmNhbGwodG9JbmRleGVkT2JqZWN0KHRoaXMpLCBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCA/ICcsJyA6IHNlcGFyYXRvcik7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ21hcCcpO1xuLy8gRkY0OS0gaXNzdWVcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdtYXAnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRGF0YVZpZXcgIT09ICd1bmRlZmluZWQnO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBUb0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMDtcbiAgdmFyIG51bWJlciA9IHRvSW50ZWdlcihpdCk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChudW1iZXIpO1xuICBpZiAobnVtYmVyICE9PSBsZW5ndGgpIHRocm93IFJhbmdlRXJyb3IoJ1dyb25nIGxlbmd0aCBvciBpbmRleCcpO1xuICByZXR1cm4gbGVuZ3RoO1xufTtcbiIsIi8vIElFRUU3NTQgY29udmVyc2lvbnMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pZWVlNzU0XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93LXJlc3RyaWN0ZWQtbmFtZXNcbnZhciBJbmZpbml0eSA9IDEgLyAwO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIHBvdyA9IE1hdGgucG93O1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBsb2cgPSBNYXRoLmxvZztcbnZhciBMTjIgPSBNYXRoLkxOMjtcblxudmFyIHBhY2sgPSBmdW5jdGlvbiAobnVtYmVyLCBtYW50aXNzYUxlbmd0aCwgYnl0ZXMpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheShieXRlcyk7XG4gIHZhciBleHBvbmVudExlbmd0aCA9IGJ5dGVzICogOCAtIG1hbnRpc3NhTGVuZ3RoIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBleHBvbmVudExlbmd0aCkgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBydCA9IG1hbnRpc3NhTGVuZ3RoID09PSAyMyA/IHBvdygyLCAtMjQpIC0gcG93KDIsIC03NykgOiAwO1xuICB2YXIgc2lnbiA9IG51bWJlciA8IDAgfHwgbnVtYmVyID09PSAwICYmIDEgLyBudW1iZXIgPCAwID8gMSA6IDA7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBleHBvbmVudCwgbWFudGlzc2EsIGM7XG4gIG51bWJlciA9IGFicyhudW1iZXIpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIGlmIChudW1iZXIgIT0gbnVtYmVyIHx8IG51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgbWFudGlzc2EgPSBudW1iZXIgIT0gbnVtYmVyID8gMSA6IDA7XG4gICAgZXhwb25lbnQgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGV4cG9uZW50ID0gZmxvb3IobG9nKG51bWJlcikgLyBMTjIpO1xuICAgIGlmIChudW1iZXIgKiAoYyA9IHBvdygyLCAtZXhwb25lbnQpKSA8IDEpIHtcbiAgICAgIGV4cG9uZW50LS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChleHBvbmVudCArIGVCaWFzID49IDEpIHtcbiAgICAgIG51bWJlciArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciArPSBydCAqIHBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAobnVtYmVyICogYyA+PSAyKSB7XG4gICAgICBleHBvbmVudCsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cbiAgICBpZiAoZXhwb25lbnQgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtYW50aXNzYSA9IDA7XG4gICAgICBleHBvbmVudCA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChleHBvbmVudCArIGVCaWFzID49IDEpIHtcbiAgICAgIG1hbnRpc3NhID0gKG51bWJlciAqIGMgLSAxKSAqIHBvdygyLCBtYW50aXNzYUxlbmd0aCk7XG4gICAgICBleHBvbmVudCA9IGV4cG9uZW50ICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hbnRpc3NhID0gbnVtYmVyICogcG93KDIsIGVCaWFzIC0gMSkgKiBwb3coMiwgbWFudGlzc2FMZW5ndGgpO1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cbiAgfVxuICBmb3IgKDsgbWFudGlzc2FMZW5ndGggPj0gODsgYnVmZmVyW2luZGV4KytdID0gbWFudGlzc2EgJiAyNTUsIG1hbnRpc3NhIC89IDI1NiwgbWFudGlzc2FMZW5ndGggLT0gOCk7XG4gIGV4cG9uZW50ID0gZXhwb25lbnQgPDwgbWFudGlzc2FMZW5ndGggfCBtYW50aXNzYTtcbiAgZXhwb25lbnRMZW5ndGggKz0gbWFudGlzc2FMZW5ndGg7XG4gIGZvciAoOyBleHBvbmVudExlbmd0aCA+IDA7IGJ1ZmZlcltpbmRleCsrXSA9IGV4cG9uZW50ICYgMjU1LCBleHBvbmVudCAvPSAyNTYsIGV4cG9uZW50TGVuZ3RoIC09IDgpO1xuICBidWZmZXJbLS1pbmRleF0gfD0gc2lnbiAqIDEyODtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn07XG5cbnZhciB1bnBhY2sgPSBmdW5jdGlvbiAoYnVmZmVyLCBtYW50aXNzYUxlbmd0aCkge1xuICB2YXIgYnl0ZXMgPSBidWZmZXIubGVuZ3RoO1xuICB2YXIgZXhwb25lbnRMZW5ndGggPSBieXRlcyAqIDggLSBtYW50aXNzYUxlbmd0aCAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZXhwb25lbnRMZW5ndGgpIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgbkJpdHMgPSBleHBvbmVudExlbmd0aCAtIDc7XG4gIHZhciBpbmRleCA9IGJ5dGVzIC0gMTtcbiAgdmFyIHNpZ24gPSBidWZmZXJbaW5kZXgtLV07XG4gIHZhciBleHBvbmVudCA9IHNpZ24gJiAxMjc7XG4gIHZhciBtYW50aXNzYTtcbiAgc2lnbiA+Pj0gNztcbiAgZm9yICg7IG5CaXRzID4gMDsgZXhwb25lbnQgPSBleHBvbmVudCAqIDI1NiArIGJ1ZmZlcltpbmRleF0sIGluZGV4LS0sIG5CaXRzIC09IDgpO1xuICBtYW50aXNzYSA9IGV4cG9uZW50ICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGV4cG9uZW50ID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1hbnRpc3NhTGVuZ3RoO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtYW50aXNzYSA9IG1hbnRpc3NhICogMjU2ICsgYnVmZmVyW2luZGV4XSwgaW5kZXgtLSwgbkJpdHMgLT0gOCk7XG4gIGlmIChleHBvbmVudCA9PT0gMCkge1xuICAgIGV4cG9uZW50ID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGV4cG9uZW50ID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG1hbnRpc3NhID8gTmFOIDogc2lnbiA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG1hbnRpc3NhID0gbWFudGlzc2EgKyBwb3coMiwgbWFudGlzc2FMZW5ndGgpO1xuICAgIGV4cG9uZW50ID0gZXhwb25lbnQgLSBlQmlhcztcbiAgfSByZXR1cm4gKHNpZ24gPyAtMSA6IDEpICogbWFudGlzc2EgKiBwb3coMiwgZXhwb25lbnQgLSBtYW50aXNzYUxlbmd0aCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFjazogcGFjayxcbiAgdW5wYWNrOiB1bnBhY2tcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmlsbGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsbFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qICwgc3RhcnQgPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKTtcbiAgdmFyIGVuZCA9IGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvQWJzb2x1dGVJbmRleChlbmQsIGxlbmd0aCk7XG4gIHdoaWxlIChlbmRQb3MgPiBpbmRleCkgT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgTkFUSVZFX0FSUkFZX0JVRkZFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItbmF0aXZlJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lLWFsbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleCcpO1xudmFyIElFRUU3NTQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWVlZTc1NCcpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBhcnJheUZpbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZmlsbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBBUlJBWV9CVUZGRVIgPSAnQXJyYXlCdWZmZXInO1xudmFyIERBVEFfVklFVyA9ICdEYXRhVmlldyc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgV1JPTkdfTEVOR1RIID0gJ1dyb25nIGxlbmd0aCc7XG52YXIgV1JPTkdfSU5ERVggPSAnV3JvbmcgaW5kZXgnO1xudmFyIE5hdGl2ZUFycmF5QnVmZmVyID0gZ2xvYmFsW0FSUkFZX0JVRkZFUl07XG52YXIgJEFycmF5QnVmZmVyID0gTmF0aXZlQXJyYXlCdWZmZXI7XG52YXIgJERhdGFWaWV3ID0gZ2xvYmFsW0RBVEFfVklFV107XG52YXIgJERhdGFWaWV3UHJvdG90eXBlID0gJERhdGFWaWV3ICYmICREYXRhVmlld1tQUk9UT1RZUEVdO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG52YXIgUmFuZ2VFcnJvciA9IGdsb2JhbC5SYW5nZUVycm9yO1xuXG52YXIgcGFja0lFRUU3NTQgPSBJRUVFNzU0LnBhY2s7XG52YXIgdW5wYWNrSUVFRTc1NCA9IElFRUU3NTQudW5wYWNrO1xuXG52YXIgcGFja0ludDggPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gIHJldHVybiBbbnVtYmVyICYgMHhGRl07XG59O1xuXG52YXIgcGFja0ludDE2ID0gZnVuY3Rpb24gKG51bWJlcikge1xuICByZXR1cm4gW251bWJlciAmIDB4RkYsIG51bWJlciA+PiA4ICYgMHhGRl07XG59O1xuXG52YXIgcGFja0ludDMyID0gZnVuY3Rpb24gKG51bWJlcikge1xuICByZXR1cm4gW251bWJlciAmIDB4RkYsIG51bWJlciA+PiA4ICYgMHhGRiwgbnVtYmVyID4+IDE2ICYgMHhGRiwgbnVtYmVyID4+IDI0ICYgMHhGRl07XG59O1xuXG52YXIgdW5wYWNrSW50MzIgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gIHJldHVybiBidWZmZXJbM10gPDwgMjQgfCBidWZmZXJbMl0gPDwgMTYgfCBidWZmZXJbMV0gPDwgOCB8IGJ1ZmZlclswXTtcbn07XG5cbnZhciBwYWNrRmxvYXQzMiA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgcmV0dXJuIHBhY2tJRUVFNzU0KG51bWJlciwgMjMsIDQpO1xufTtcblxudmFyIHBhY2tGbG9hdDY0ID0gZnVuY3Rpb24gKG51bWJlcikge1xuICByZXR1cm4gcGFja0lFRUU3NTQobnVtYmVyLCA1MiwgOCk7XG59O1xuXG52YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBrZXkpIHtcbiAgZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3JbUFJPVE9UWVBFXSwga2V5LCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKVtrZXldOyB9IH0pO1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uICh2aWV3LCBjb3VudCwgaW5kZXgsIGlzTGl0dGxlRW5kaWFuKSB7XG4gIHZhciBpbnRJbmRleCA9IHRvSW5kZXgoaW5kZXgpO1xuICB2YXIgc3RvcmUgPSBnZXRJbnRlcm5hbFN0YXRlKHZpZXcpO1xuICBpZiAoaW50SW5kZXggKyBjb3VudCA+IHN0b3JlLmJ5dGVMZW5ndGgpIHRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgYnl0ZXMgPSBnZXRJbnRlcm5hbFN0YXRlKHN0b3JlLmJ1ZmZlcikuYnl0ZXM7XG4gIHZhciBzdGFydCA9IGludEluZGV4ICsgc3RvcmUuYnl0ZU9mZnNldDtcbiAgdmFyIHBhY2sgPSBieXRlcy5zbGljZShzdGFydCwgc3RhcnQgKyBjb3VudCk7XG4gIHJldHVybiBpc0xpdHRsZUVuZGlhbiA/IHBhY2sgOiBwYWNrLnJldmVyc2UoKTtcbn07XG5cbnZhciBzZXQgPSBmdW5jdGlvbiAodmlldywgY291bnQsIGluZGV4LCBjb252ZXJzaW9uLCB2YWx1ZSwgaXNMaXR0bGVFbmRpYW4pIHtcbiAgdmFyIGludEluZGV4ID0gdG9JbmRleChpbmRleCk7XG4gIHZhciBzdG9yZSA9IGdldEludGVybmFsU3RhdGUodmlldyk7XG4gIGlmIChpbnRJbmRleCArIGNvdW50ID4gc3RvcmUuYnl0ZUxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19JTkRFWCk7XG4gIHZhciBieXRlcyA9IGdldEludGVybmFsU3RhdGUoc3RvcmUuYnVmZmVyKS5ieXRlcztcbiAgdmFyIHN0YXJ0ID0gaW50SW5kZXggKyBzdG9yZS5ieXRlT2Zmc2V0O1xuICB2YXIgcGFjayA9IGNvbnZlcnNpb24oK3ZhbHVlKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSBieXRlc1tzdGFydCArIGldID0gcGFja1tpc0xpdHRsZUVuZGlhbiA/IGkgOiBjb3VudCAtIGkgLSAxXTtcbn07XG5cbmlmICghTkFUSVZFX0FSUkFZX0JVRkZFUikge1xuICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRBcnJheUJ1ZmZlciwgQVJSQVlfQlVGRkVSKTtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHRvSW5kZXgobGVuZ3RoKTtcbiAgICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICAgIGJ5dGVzOiBhcnJheUZpbGwuY2FsbChuZXcgQXJyYXkoYnl0ZUxlbmd0aCksIDApLFxuICAgICAgYnl0ZUxlbmd0aDogYnl0ZUxlbmd0aFxuICAgIH0pO1xuICAgIGlmICghREVTQ1JJUFRPUlMpIHRoaXMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGg7XG4gIH07XG5cbiAgJERhdGFWaWV3ID0gZnVuY3Rpb24gRGF0YVZpZXcoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkRGF0YVZpZXcsIERBVEFfVklFVyk7XG4gICAgYW5JbnN0YW5jZShidWZmZXIsICRBcnJheUJ1ZmZlciwgREFUQV9WSUVXKTtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gZ2V0SW50ZXJuYWxTdGF0ZShidWZmZXIpLmJ5dGVMZW5ndGg7XG4gICAgdmFyIG9mZnNldCA9IHRvSW50ZWdlcihieXRlT2Zmc2V0KTtcbiAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgPiBidWZmZXJMZW5ndGgpIHRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG9mZnNldCcpO1xuICAgIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID09PSB1bmRlZmluZWQgPyBidWZmZXJMZW5ndGggLSBvZmZzZXQgOiB0b0xlbmd0aChieXRlTGVuZ3RoKTtcbiAgICBpZiAob2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlckxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgICAgYnVmZmVyOiBidWZmZXIsXG4gICAgICBieXRlTGVuZ3RoOiBieXRlTGVuZ3RoLFxuICAgICAgYnl0ZU9mZnNldDogb2Zmc2V0XG4gICAgfSk7XG4gICAgaWYgKCFERVNDUklQVE9SUykge1xuICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGlzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xuICAgICAgdGhpcy5ieXRlT2Zmc2V0ID0gb2Zmc2V0O1xuICAgIH1cbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICBhZGRHZXR0ZXIoJEFycmF5QnVmZmVyLCAnYnl0ZUxlbmd0aCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsICdidWZmZXInKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCAnYnl0ZUxlbmd0aCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsICdieXRlT2Zmc2V0Jyk7XG4gIH1cblxuICByZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIGdldEludDg6IGZ1bmN0aW9uIGdldEludDgoYnl0ZU9mZnNldCkge1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCAxLCBieXRlT2Zmc2V0KVswXSA8PCAyNCA+PiAyNDtcbiAgICB9LFxuICAgIGdldFVpbnQ4OiBmdW5jdGlvbiBnZXRVaW50OChieXRlT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQpWzBdO1xuICAgIH0sXG4gICAgZ2V0SW50MTY6IGZ1bmN0aW9uIGdldEludDE2KGJ5dGVPZmZzZXQgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHZhciBieXRlcyA9IGdldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm4gKGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXSkgPDwgMTYgPj4gMTY7XG4gICAgfSxcbiAgICBnZXRVaW50MTY6IGZ1bmN0aW9uIGdldFVpbnQxNihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgICAgcmV0dXJuIGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXTtcbiAgICB9LFxuICAgIGdldEludDMyOiBmdW5jdGlvbiBnZXRJbnQzMihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSW50MzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSk7XG4gICAgfSxcbiAgICBnZXRVaW50MzI6IGZ1bmN0aW9uIGdldFVpbnQzMihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSW50MzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSkgPj4+IDA7XG4gICAgfSxcbiAgICBnZXRGbG9hdDMyOiBmdW5jdGlvbiBnZXRGbG9hdDMyKGJ5dGVPZmZzZXQgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHJldHVybiB1bnBhY2tJRUVFNzU0KGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCksIDIzKTtcbiAgICB9LFxuICAgIGdldEZsb2F0NjQ6IGZ1bmN0aW9uIGdldEZsb2F0NjQoYnl0ZU9mZnNldCAvKiAsIGxpdHRsZUVuZGlhbiAqLykge1xuICAgICAgcmV0dXJuIHVucGFja0lFRUU3NTQoZ2V0KHRoaXMsIDgsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSwgNTIpO1xuICAgIH0sXG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgc2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQsIHBhY2tJbnQ4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRVaW50ODogZnVuY3Rpb24gc2V0VWludDgoYnl0ZU9mZnNldCwgdmFsdWUpIHtcbiAgICAgIHNldCh0aGlzLCAxLCBieXRlT2Zmc2V0LCBwYWNrSW50OCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0SW50MTY6IGZ1bmN0aW9uIHNldEludDE2KGJ5dGVPZmZzZXQsIHZhbHVlIC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0ludDE2LCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgc2V0VWludDE2OiBmdW5jdGlvbiBzZXRVaW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBwYWNrSW50MTYsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBzZXRJbnQzMjogZnVuY3Rpb24gc2V0SW50MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSW50MzIsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBzZXRVaW50MzI6IGZ1bmN0aW9uIHNldFVpbnQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiAsIGxpdHRsZUVuZGlhbiAqLykge1xuICAgICAgc2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIHBhY2tJbnQzMiwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHNldEZsb2F0MzI6IGZ1bmN0aW9uIHNldEZsb2F0MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrRmxvYXQzMiwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHNldEZsb2F0NjQ6IGZ1bmN0aW9uIHNldEZsb2F0NjQoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA4LCBieXRlT2Zmc2V0LCBwYWNrRmxvYXQ2NCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgaWYgKCFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgTmF0aXZlQXJyYXlCdWZmZXIoMSk7XG4gIH0pIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgbmV3IE5hdGl2ZUFycmF5QnVmZmVyKC0xKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIG5ldyBOYXRpdmVBcnJheUJ1ZmZlcigpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5ldyBOYXRpdmVBcnJheUJ1ZmZlcigxLjUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5ldyBOYXRpdmVBcnJheUJ1ZmZlcihOYU4pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIHJldHVybiBOYXRpdmVBcnJheUJ1ZmZlci5uYW1lICE9IEFSUkFZX0JVRkZFUjtcbiAgfSkpIHtcbiAgICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpIHtcbiAgICAgIGFuSW5zdGFuY2UodGhpcywgJEFycmF5QnVmZmVyKTtcbiAgICAgIHJldHVybiBuZXcgTmF0aXZlQXJyYXlCdWZmZXIodG9JbmRleChsZW5ndGgpKTtcbiAgICB9O1xuICAgIHZhciBBcnJheUJ1ZmZlclByb3RvdHlwZSA9ICRBcnJheUJ1ZmZlcltQUk9UT1RZUEVdID0gTmF0aXZlQXJyYXlCdWZmZXJbUFJPVE9UWVBFXTtcbiAgICBmb3IgKHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVBcnJheUJ1ZmZlciksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajspIHtcbiAgICAgIGlmICghKChrZXkgPSBrZXlzW2orK10pIGluICRBcnJheUJ1ZmZlcikpIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRBcnJheUJ1ZmZlciwga2V5LCBOYXRpdmVBcnJheUJ1ZmZlcltrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQXJyYXlCdWZmZXJQcm90b3R5cGUuY29uc3RydWN0b3IgPSAkQXJyYXlCdWZmZXI7XG4gIH1cblxuICAvLyBXZWJLaXQgYnVnIC0gdGhlIHNhbWUgcGFyZW50IHByb3RvdHlwZSBmb3IgdHlwZWQgYXJyYXlzIGFuZCBkYXRhIHZpZXdcbiAgaWYgKHNldFByb3RvdHlwZU9mICYmIGdldFByb3RvdHlwZU9mKCREYXRhVmlld1Byb3RvdHlwZSkgIT09IE9iamVjdFByb3RvdHlwZSkge1xuICAgIHNldFByb3RvdHlwZU9mKCREYXRhVmlld1Byb3RvdHlwZSwgT2JqZWN0UHJvdG90eXBlKTtcbiAgfVxuXG4gIC8vIGlPUyBTYWZhcmkgNy54IGJ1Z1xuICB2YXIgdGVzdFZpZXcgPSBuZXcgJERhdGFWaWV3KG5ldyAkQXJyYXlCdWZmZXIoMikpO1xuICB2YXIgbmF0aXZlU2V0SW50OCA9ICREYXRhVmlld1Byb3RvdHlwZS5zZXRJbnQ4O1xuICB0ZXN0Vmlldy5zZXRJbnQ4KDAsIDIxNDc0ODM2NDgpO1xuICB0ZXN0Vmlldy5zZXRJbnQ4KDEsIDIxNDc0ODM2NDkpO1xuICBpZiAodGVzdFZpZXcuZ2V0SW50OCgwKSB8fCAhdGVzdFZpZXcuZ2V0SW50OCgxKSkgcmVkZWZpbmVBbGwoJERhdGFWaWV3UHJvdG90eXBlLCB7XG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgbmF0aXZlU2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9LFxuICAgIHNldFVpbnQ4OiBmdW5jdGlvbiBzZXRVaW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgbmF0aXZlU2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuXG5zZXRUb1N0cmluZ1RhZygkQXJyYXlCdWZmZXIsIEFSUkFZX0JVRkZFUik7XG5zZXRUb1N0cmluZ1RhZygkRGF0YVZpZXcsIERBVEFfVklFVyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBBcnJheUJ1ZmZlcjogJEFycmF5QnVmZmVyLFxuICBEYXRhVmlldzogJERhdGFWaWV3XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGFycmF5QnVmZmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlcicpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcblxudmFyIEFSUkFZX0JVRkZFUiA9ICdBcnJheUJ1ZmZlcic7XG52YXIgQXJyYXlCdWZmZXIgPSBhcnJheUJ1ZmZlck1vZHVsZVtBUlJBWV9CVUZGRVJdO1xudmFyIE5hdGl2ZUFycmF5QnVmZmVyID0gZ2xvYmFsW0FSUkFZX0JVRkZFUl07XG5cbi8vIGBBcnJheUJ1ZmZlcmAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5YnVmZmVyLWNvbnN0cnVjdG9yXG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IE5hdGl2ZUFycmF5QnVmZmVyICE9PSBBcnJheUJ1ZmZlciB9LCB7XG4gIEFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlclxufSk7XG5cbnNldFNwZWNpZXMoQVJSQVlfQlVGRkVSKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgQXJyYXlCdWZmZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcblxudmFyIEFycmF5QnVmZmVyID0gQXJyYXlCdWZmZXJNb2R1bGUuQXJyYXlCdWZmZXI7XG52YXIgRGF0YVZpZXcgPSBBcnJheUJ1ZmZlck1vZHVsZS5EYXRhVmlldztcbnZhciBuYXRpdmVBcnJheUJ1ZmZlclNsaWNlID0gQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlO1xuXG52YXIgSU5DT1JSRUNUX1NMSUNFID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIW5ldyBBcnJheUJ1ZmZlcigyKS5zbGljZSgxLCB1bmRlZmluZWQpLmJ5dGVMZW5ndGg7XG59KTtcblxuLy8gYEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheWJ1ZmZlci5wcm90b3R5cGUuc2xpY2VcbiQoeyB0YXJnZXQ6ICdBcnJheUJ1ZmZlcicsIHByb3RvOiB0cnVlLCB1bnNhZmU6IHRydWUsIGZvcmNlZDogSU5DT1JSRUNUX1NMSUNFIH0sIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAobmF0aXZlQXJyYXlCdWZmZXJTbGljZSAhPT0gdW5kZWZpbmVkICYmIGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmF0aXZlQXJyYXlCdWZmZXJTbGljZS5jYWxsKGFuT2JqZWN0KHRoaXMpLCBzdGFydCk7IC8vIEZGIGZpeFxuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYW5PYmplY3QodGhpcykuYnl0ZUxlbmd0aDtcbiAgICB2YXIgZmlyc3QgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IChzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgQXJyYXlCdWZmZXIpKSh0b0xlbmd0aChmaW4gLSBmaXJzdCkpO1xuICAgIHZhciB2aWV3U291cmNlID0gbmV3IERhdGFWaWV3KHRoaXMpO1xuICAgIHZhciB2aWV3VGFyZ2V0ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoZmlyc3QgPCBmaW4pIHtcbiAgICAgIHZpZXdUYXJnZXQuc2V0VWludDgoaW5kZXgrKywgdmlld1NvdXJjZS5nZXRVaW50OChmaXJzdCsrKSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbCcpLmY7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gIU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGQUlMU19PTl9QUklNSVRJVkVTIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lc1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vZmFpbHMnKTtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3IsXG4vLyBzbyB3ZSB1c2UgYW4gaW50ZXJtZWRpYXRlIGZ1bmN0aW9uLlxuZnVuY3Rpb24gUkUocywgZikge1xuICByZXR1cm4gUmVnRXhwKHMsIGYpO1xufVxuXG5leHBvcnRzLlVOU1VQUE9SVEVEX1kgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgnYScsICd5JykgLT4gL2EveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG4gIHZhciByZSA9IFJFKCdhJywgJ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2FiY2QnKSAhPSBudWxsO1xufSk7XG5cbmV4cG9ydHMuQlJPS0VOX0NBUkVUID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03NzM2ODdcbiAgdmFyIHJlID0gUkUoJ15yJywgJ2d5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdzdHInKSAhPSBudWxsO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL3JlZ2V4cC1mbGFncycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xuXG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbi8vIFRoaXMgYWx3YXlzIHJlZmVycyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLCBiZWNhdXNlIHRoZVxuLy8gU3RyaW5nI3JlcGxhY2UgcG9seWZpbGwgdXNlcyAuL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMsXG4vLyB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYmVmb3JlIHBhdGNoaW5nIHRoZSBtZXRob2QuXG52YXIgbmF0aXZlUmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS87XG4gIHZhciByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMS5sYXN0SW5kZXggIT09IDAgfHwgcmUyLmxhc3RJbmRleCAhPT0gMDtcbn0pKCk7XG5cbnZhciBVTlNVUFBPUlRFRF9ZID0gc3RpY2t5SGVscGVycy5VTlNVUFBPUlRFRF9ZIHx8IHN0aWNreUhlbHBlcnMuQlJPS0VOX0NBUkVUO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRCB8fCBVTlNVUFBPUlRFRF9ZO1xuXG5pZiAoUEFUQ0gpIHtcbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cikge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIGxhc3RJbmRleCwgcmVDb3B5LCBtYXRjaCwgaTtcbiAgICB2YXIgc3RpY2t5ID0gVU5TVVBQT1JURURfWSAmJiByZS5zdGlja3k7XG4gICAgdmFyIGZsYWdzID0gcmVnZXhwRmxhZ3MuY2FsbChyZSk7XG4gICAgdmFyIHNvdXJjZSA9IHJlLnNvdXJjZTtcbiAgICB2YXIgY2hhcnNBZGRlZCA9IDA7XG4gICAgdmFyIHN0ckNvcHkgPSBzdHI7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBmbGFncyA9IGZsYWdzLnJlcGxhY2UoJ3knLCAnJyk7XG4gICAgICBpZiAoZmxhZ3MuaW5kZXhPZignZycpID09PSAtMSkge1xuICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICB9XG5cbiAgICAgIHN0ckNvcHkgPSBTdHJpbmcoc3RyKS5zbGljZShyZS5sYXN0SW5kZXgpO1xuICAgICAgLy8gU3VwcG9ydCBhbmNob3JlZCBzdGlja3kgYmVoYXZpb3IuXG4gICAgICBpZiAocmUubGFzdEluZGV4ID4gMCAmJiAoIXJlLm11bHRpbGluZSB8fCByZS5tdWx0aWxpbmUgJiYgc3RyW3JlLmxhc3RJbmRleCAtIDFdICE9PSAnXFxuJykpIHtcbiAgICAgICAgc291cmNlID0gJyg/OiAnICsgc291cmNlICsgJyknO1xuICAgICAgICBzdHJDb3B5ID0gJyAnICsgc3RyQ29weTtcbiAgICAgICAgY2hhcnNBZGRlZCsrO1xuICAgICAgfVxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIHN0ciBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXig/OicgKyBzb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICB9XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuXG4gICAgbWF0Y2ggPSBuYXRpdmVFeGVjLmNhbGwoc3RpY2t5ID8gcmVDb3B5IDogcmUsIHN0ckNvcHkpO1xuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoLmlucHV0ID0gbWF0Y2guaW5wdXQuc2xpY2UoY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoLmluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZS5sYXN0SW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJyB3b3JrIGZvciAvKC4/KT8vXG4gICAgICBuYXRpdmVSZXBsYWNlLmNhbGwobWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaGVkRXhlYztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcblxuJCh7IHRhcmdldDogJ1JlZ0V4cCcsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IC8uLy5leGVjICE9PSBleGVjIH0sIHtcbiAgZXhlYzogZXhlY1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIG1vdmVkIHRvIGVudHJ5IHBvaW50c1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5yZWdleHAuZXhlYycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG4vLyBJRSA8PSAxMSByZXBsYWNlcyAkMCB3aXRoIHRoZSB3aG9sZSBtYXRjaCwgYXMgaWYgaXQgd2FzICQmXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MDI0NjY2L2dldHRpbmctaWUtdG8tcmVwbGFjZS1hLXJlZ2V4LXdpdGgtdGhlLWxpdGVyYWwtc3RyaW5nLTBcbnZhciBSRVBMQUNFX0tFRVBTXyQwID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICdhJy5yZXBsYWNlKC8uLywgJyQwJykgPT09ICckMCc7XG59KSgpO1xuXG52YXIgUkVQTEFDRSA9IHdlbGxLbm93blN5bWJvbCgncmVwbGFjZScpO1xuLy8gU2FmYXJpIDw9IDEzLjAuMyg/KSBzdWJzdGl0dXRlcyBudGggY2FwdHVyZSB3aGVyZSBuPm0gd2l0aCBhbiBlbXB0eSBzdHJpbmdcbnZhciBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA9IChmdW5jdGlvbiAoKSB7XG4gIGlmICgvLi9bUkVQTEFDRV0pIHtcbiAgICByZXR1cm4gLy4vW1JFUExBQ0VdKCdhJywgJyQwJykgPT09ICcnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbi8vIENocm9tZSA1MSBoYXMgYSBidWdneSBcInNwbGl0XCIgaW1wbGVtZW50YXRpb24gd2hlbiBSZWdFeHAjZXhlYyAhPT0gbmF0aXZlRXhlY1xuLy8gV2VleCBKUyBoYXMgZnJvemVuIGJ1aWx0LWluIHByb3RvdHlwZXMsIHNvIHVzZSB0cnkgLyBjYXRjaCB3cmFwcGVyXG52YXIgU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjLCBzaGFtKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIShcbiAgICAgIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTICYmXG4gICAgICBSRVBMQUNFX0tFRVBTXyQwICYmXG4gICAgICAhUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICApKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0sIHtcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDA6IFJFUExBQ0VfS0VFUFNfJDAsXG4gICAgICBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTogUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICB9KTtcbiAgICB2YXIgc3RyaW5nTWV0aG9kID0gbWV0aG9kc1swXTtcbiAgICB2YXIgcmVnZXhNZXRob2QgPSBtZXRob2RzWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJpbmdNZXRob2QpO1xuICAgIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcmVnZXhNZXRob2QuY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG5cbiAgaWYgKHNoYW0pIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShSZWdFeHAucHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xuXG4vLyBgQWR2YW5jZVN0cmluZ0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFkdmFuY2VzdHJpbmdpbmRleFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUywgaW5kZXgsIHVuaWNvZGUpIHtcbiAgcmV0dXJuIGluZGV4ICsgKHVuaWNvZGUgPyBjaGFyQXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cblxuICByZXR1cm4gcmVnZXhwRXhlYy5jYWxsKFIsIFMpO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTID0gL1xcJChbJCYnYF18XFxkXFxkP3w8W14+XSo+KS9nO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEID0gL1xcJChbJCYnYF18XFxkXFxkPykvZztcblxudmFyIG1heWJlVG9TdHJpbmcgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyBpdCA6IFN0cmluZyhpdCk7XG59O1xuXG4vLyBAQHJlcGxhY2UgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24gKFJFUExBQ0UsIG5hdGl2ZVJlcGxhY2UsIG1heWJlQ2FsbE5hdGl2ZSwgcmVhc29uKSB7XG4gIHZhciBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA9IHJlYXNvbi5SRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTtcbiAgdmFyIFJFUExBQ0VfS0VFUFNfJDAgPSByZWFzb24uUkVQTEFDRV9LRUVQU18kMDtcbiAgdmFyIFVOU0FGRV9TVUJTVElUVVRFID0gUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPyAnJCcgOiAnJDAnO1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICAgIHJldHVybiByZXBsYWNlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVwbGFjZXIuY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6IG5hdGl2ZVJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAocmVnZXhwLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKCFSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSAmJiBSRVBMQUNFX0tFRVBTXyQwKSB8fFxuICAgICAgICAodHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVwbGFjZVZhbHVlLmluZGV4T2YoVU5TQUZFX1NVQlNUSVRVVEUpID09PSAtMSlcbiAgICAgICkge1xuICAgICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZVJlcGxhY2UsIHJlZ2V4cCwgdGhpcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG5cbiAgICAgIHZhciBmdW5jdGlvbmFsUmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlVmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSBTdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBtYXgobWluKHRvSW50ZWdlcihyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBjYXB0dXJlcy5wdXNoKG1heWJlVG9TdHJpbmcocmVzdWx0W2pdKSk7XG4gICAgICAgIHZhciBuYW1lZENhcHR1cmVzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgaWYgKGZ1bmN0aW9uYWxSZXBsYWNlKSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VyQXJncyA9IFttYXRjaGVkXS5jb25jYXQoY2FwdHVyZXMsIHBvc2l0aW9uLCBTKTtcbiAgICAgICAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSByZXBsYWNlckFyZ3MucHVzaChuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBTdHJpbmcocmVwbGFjZVZhbHVlLmFwcGx5KHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcblxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRzdWJzdGl0dXRpb25cbiAgZnVuY3Rpb24gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIHN0ciwgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlbWVudCkge1xuICAgIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgICB2YXIgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEO1xuICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICAgIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MUztcbiAgICB9XG4gICAgcmV0dXJuIG5hdGl2ZVJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgICAgdmFyIGNhcHR1cmU7XG4gICAgICBzd2l0Y2ggKGNoLmNoYXJBdCgwKSkge1xuICAgICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgICAgY2FzZSAnJic6IHJldHVybiBtYXRjaGVkO1xuICAgICAgICBjYXNlICdgJzogcmV0dXJuIHN0ci5zbGljZSgwLCBwb3NpdGlvbik7XG4gICAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW2NoLnNsaWNlKDEsIC0xKV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIFxcZFxcZD9cbiAgICAgICAgICB2YXIgbiA9ICtjaDtcbiAgICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIGlmIChuID4gbSkge1xuICAgICAgICAgICAgdmFyIGYgPSBmbG9vcihuIC8gMTApO1xuICAgICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgIGlmIChmIDw9IG0pIHJldHVybiBjYXB0dXJlc1tmIC0gMV0gPT09IHVuZGVmaW5lZCA/IGNoLmNoYXJBdCgxKSA6IGNhcHR1cmVzW2YgLSAxXSArIGNoLmNoYXJBdCgxKTtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FwdHVyZSA9IGNhcHR1cmVzW24gLSAxXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNyZWdleHBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNsYXNzb2YoaXQpID09ICdSZWdFeHAnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjYWxsUmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgYXJyYXlQdXNoID0gW10ucHVzaDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBNQVhfVUlOVDMyID0gMHhGRkZGRkZGRjtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCd4JywgJ3knKSAtPiAveC95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBTVVBQT1JUU19ZID0gIWZhaWxzKGZ1bmN0aW9uICgpIHsgcmV0dXJuICFSZWdFeHAoTUFYX1VJTlQzMiwgJ3knKTsgfSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdzcGxpdCcsIDIsIGZ1bmN0aW9uIChTUExJVCwgbmF0aXZlU3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJy5zcGxpdCgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgICd0ZXN0Jy5zcGxpdCgvKD86KS8sIC0xKS5sZW5ndGggIT0gNCB8fFxuICAgICdhYicuc3BsaXQoLyg/OmFiKSovKS5sZW5ndGggIT0gMiB8fFxuICAgICcuJy5zcGxpdCgvKC4/KSguPykvKS5sZW5ndGggIT0gNCB8fFxuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDEgfHxcbiAgICAnJy5zcGxpdCgvLj8vKS5sZW5ndGhcbiAgKSB7XG4gICAgLy8gYmFzZWQgb24gZXM1LXNoaW0gaW1wbGVtZW50YXRpb24sIG5lZWQgdG8gcmV3b3JrIGl0XG4gICAgaW50ZXJuYWxTcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSB1bmRlZmluZWQpIHJldHVybiBbc3RyaW5nXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZiAoIWlzUmVnRXhwKHNlcGFyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbSk7XG4gICAgICB9XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4cEV4ZWMuY2FsbChzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHkubGFzdEluZGV4O1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkgYXJyYXlQdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHNlcGFyYXRvckNvcHkubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKSBvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltID8gb3V0cHV0LnNsaWNlKDAsIGxpbSkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJy5zcGxpdCh1bmRlZmluZWQsIDApLmxlbmd0aCkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBuYXRpdmVTcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH0gZWxzZSBpbnRlcm5hbFNwbGl0ID0gbmF0aXZlU3BsaXQ7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zcGxpdFxuICAgIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzcGxpdHRlciA9IHNlcGFyYXRvciA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZXBhcmF0b3JbU1BMSVRdO1xuICAgICAgcmV0dXJuIHNwbGl0dGVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBzcGxpdHRlci5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpXG4gICAgICAgIDogaW50ZXJuYWxTcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHNwbGl0XG4gICAgLy9cbiAgICAvLyBOT1RFOiBUaGlzIGNhbm5vdCBiZSBwcm9wZXJseSBwb2x5ZmlsbGVkIGluIGVuZ2luZXMgdGhhdCBkb24ndCBzdXBwb3J0XG4gICAgLy8gdGhlICd5JyBmbGFnLlxuICAgIGZ1bmN0aW9uIChyZWdleHAsIGxpbWl0KSB7XG4gICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKGludGVybmFsU3BsaXQsIHJlZ2V4cCwgdGhpcywgbGltaXQsIGludGVybmFsU3BsaXQgIT09IG5hdGl2ZVNwbGl0KTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IocngsIFJlZ0V4cCk7XG5cbiAgICAgIHZhciB1bmljb2RlTWF0Y2hpbmcgPSByeC51bmljb2RlO1xuICAgICAgdmFyIGZsYWdzID0gKHJ4Lmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4Lm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoU1VQUE9SVFNfWSA/ICd5JyA6ICdnJyk7XG5cbiAgICAgIC8vIF4oPyArIHJ4ICsgKSBpcyBuZWVkZWQsIGluIGNvbWJpbmF0aW9uIHdpdGggc29tZSBTIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgQyhTVVBQT1JUU19ZID8gcnggOiAnXig/OicgKyByeC5zb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKFMubGVuZ3RoID09PSAwKSByZXR1cm4gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFMpID09PSBudWxsID8gW1NdIDogW107XG4gICAgICB2YXIgcCA9IDA7XG4gICAgICB2YXIgcSA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgd2hpbGUgKHEgPCBTLmxlbmd0aCkge1xuICAgICAgICBzcGxpdHRlci5sYXN0SW5kZXggPSBTVVBQT1JUU19ZID8gcSA6IDA7XG4gICAgICAgIHZhciB6ID0gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFNVUFBPUlRTX1kgPyBTIDogUy5zbGljZShxKSk7XG4gICAgICAgIHZhciBlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeiA9PT0gbnVsbCB8fFxuICAgICAgICAgIChlID0gbWluKHRvTGVuZ3RoKHNwbGl0dGVyLmxhc3RJbmRleCArIChTVVBQT1JUU19ZID8gMCA6IHEpKSwgUy5sZW5ndGgpKSA9PT0gcFxuICAgICAgICApIHtcbiAgICAgICAgICBxID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHEsIHVuaWNvZGVNYXRjaGluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQS5wdXNoKFMuc2xpY2UocCwgcSkpO1xuICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB6Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgQS5wdXNoKHpbaV0pO1xuICAgICAgICAgICAgaWYgKEEubGVuZ3RoID09PSBsaW0pIHJldHVybiBBO1xuICAgICAgICAgIH1cbiAgICAgICAgICBxID0gcCA9IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEEucHVzaChTLnNsaWNlKHApKTtcbiAgICAgIHJldHVybiBBO1xuICAgIH1cbiAgXTtcbn0sICFTVVBQT1JUU19ZKTtcbiIsIi8vIGEgc3RyaW5nIG9mIGFsbCB2YWxpZCB1bmljb2RlIHdoaXRlc3BhY2VzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgd2hpdGVzcGFjZSA9ICdbJyArIHdoaXRlc3BhY2VzICsgJ10nO1xudmFyIGx0cmltID0gUmVnRXhwKCdeJyArIHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyonKTtcbnZhciBydHJpbSA9IFJlZ0V4cCh3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW0sIHRyaW1TdGFydCwgdHJpbUVuZCwgdHJpbUxlZnQsIHRyaW1SaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcykge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1MZWZ0LCB0cmltU3RhcnQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbWVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuICB0cmltOiBjcmVhdGVNZXRob2QoMylcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgbm9uID0gJ1xcdTIwMEJcXHUwMDg1XFx1MTgwRSc7XG5cbi8vIGNoZWNrIHRoYXQgYSBtZXRob2Qgd29ya3Mgd2l0aCB0aGUgY29ycmVjdCBsaXN0XG4vLyBvZiB3aGl0ZXNwYWNlcyBhbmQgaGFzIGEgY29ycmVjdCBuYW1lXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICByZXR1cm4gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXdoaXRlc3BhY2VzW01FVEhPRF9OQU1FXSgpIHx8IG5vbltNRVRIT0RfTkFNRV0oKSAhPSBub24gfHwgd2hpdGVzcGFjZXNbTUVUSE9EX05BTUVdLm5hbWUgIT09IE1FVEhPRF9OQU1FO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBmb3JjZWRTdHJpbmdUcmltTWV0aG9kKCd0cmltJykgfSwge1xuICB0cmltOiBmdW5jdGlvbiB0cmltKCkge1xuICAgIHJldHVybiAkdHJpbSh0aGlzKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0FSUkFZX0JVRkZFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItbmF0aXZlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBJbnQ4QXJyYXkgPSBnbG9iYWwuSW50OEFycmF5O1xudmFyIEludDhBcnJheVByb3RvdHlwZSA9IEludDhBcnJheSAmJiBJbnQ4QXJyYXkucHJvdG90eXBlO1xudmFyIFVpbnQ4Q2xhbXBlZEFycmF5ID0gZ2xvYmFsLlVpbnQ4Q2xhbXBlZEFycmF5O1xudmFyIFVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlID0gVWludDhDbGFtcGVkQXJyYXkgJiYgVWludDhDbGFtcGVkQXJyYXkucHJvdG90eXBlO1xudmFyIFR5cGVkQXJyYXkgPSBJbnQ4QXJyYXkgJiYgZ2V0UHJvdG90eXBlT2YoSW50OEFycmF5KTtcbnZhciBUeXBlZEFycmF5UHJvdG90eXBlID0gSW50OEFycmF5UHJvdG90eXBlICYmIGdldFByb3RvdHlwZU9mKEludDhBcnJheVByb3RvdHlwZSk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBpc1Byb3RvdHlwZU9mID0gT2JqZWN0UHJvdG90eXBlLmlzUHJvdG90eXBlT2Y7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIFRZUEVEX0FSUkFZX1RBRyA9IHVpZCgnVFlQRURfQVJSQVlfVEFHJyk7XG4vLyBGaXhpbmcgbmF0aXZlIHR5cGVkIGFycmF5cyBpbiBPcGVyYSBQcmVzdG8gY3Jhc2hlcyB0aGUgYnJvd3Nlciwgc2VlICM1OTVcbnZhciBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTID0gTkFUSVZFX0FSUkFZX0JVRkZFUiAmJiAhIXNldFByb3RvdHlwZU9mICYmIGNsYXNzb2YoZ2xvYmFsLm9wZXJhKSAhPT0gJ09wZXJhJztcbnZhciBUWVBFRF9BUlJBWV9UQUdfUkVRSVJFRCA9IGZhbHNlO1xudmFyIE5BTUU7XG5cbnZhciBUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCA9IHtcbiAgSW50OEFycmF5OiAxLFxuICBVaW50OEFycmF5OiAxLFxuICBVaW50OENsYW1wZWRBcnJheTogMSxcbiAgSW50MTZBcnJheTogMixcbiAgVWludDE2QXJyYXk6IDIsXG4gIEludDMyQXJyYXk6IDQsXG4gIFVpbnQzMkFycmF5OiA0LFxuICBGbG9hdDMyQXJyYXk6IDQsXG4gIEZsb2F0NjRBcnJheTogOFxufTtcblxudmFyIGlzVmlldyA9IGZ1bmN0aW9uIGlzVmlldyhpdCkge1xuICB2YXIga2xhc3MgPSBjbGFzc29mKGl0KTtcbiAgcmV0dXJuIGtsYXNzID09PSAnRGF0YVZpZXcnIHx8IGhhcyhUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCwga2xhc3MpO1xufTtcblxudmFyIGlzVHlwZWRBcnJheSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIGhhcyhUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCwgY2xhc3NvZihpdCkpO1xufTtcblxudmFyIGFUeXBlZEFycmF5ID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc1R5cGVkQXJyYXkoaXQpKSByZXR1cm4gaXQ7XG4gIHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBhIHR5cGVkIGFycmF5Jyk7XG59O1xuXG52YXIgYVR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChDKSB7XG4gIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgIGlmIChpc1Byb3RvdHlwZU9mLmNhbGwoVHlwZWRBcnJheSwgQykpIHJldHVybiBDO1xuICB9IGVsc2UgZm9yICh2YXIgQVJSQVkgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QpIGlmIChoYXMoVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QsIE5BTUUpKSB7XG4gICAgdmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IGdsb2JhbFtBUlJBWV07XG4gICAgaWYgKFR5cGVkQXJyYXlDb25zdHJ1Y3RvciAmJiAoQyA9PT0gVHlwZWRBcnJheUNvbnN0cnVjdG9yIHx8IGlzUHJvdG90eXBlT2YuY2FsbChUeXBlZEFycmF5Q29uc3RydWN0b3IsIEMpKSkge1xuICAgICAgcmV0dXJuIEM7XG4gICAgfVxuICB9IHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBhIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yJyk7XG59O1xuXG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IGZ1bmN0aW9uIChLRVksIHByb3BlcnR5LCBmb3JjZWQpIHtcbiAgaWYgKCFERVNDUklQVE9SUykgcmV0dXJuO1xuICBpZiAoZm9yY2VkKSBmb3IgKHZhciBBUlJBWSBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCkge1xuICAgIHZhciBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQVJSQVldO1xuICAgIGlmIChUeXBlZEFycmF5Q29uc3RydWN0b3IgJiYgaGFzKFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIEtFWSkpIHtcbiAgICAgIGRlbGV0ZSBUeXBlZEFycmF5Q29uc3RydWN0b3IucHJvdG90eXBlW0tFWV07XG4gICAgfVxuICB9XG4gIGlmICghVHlwZWRBcnJheVByb3RvdHlwZVtLRVldIHx8IGZvcmNlZCkge1xuICAgIHJlZGVmaW5lKFR5cGVkQXJyYXlQcm90b3R5cGUsIEtFWSwgZm9yY2VkID8gcHJvcGVydHlcbiAgICAgIDogTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyAmJiBJbnQ4QXJyYXlQcm90b3R5cGVbS0VZXSB8fCBwcm9wZXJ0eSk7XG4gIH1cbn07XG5cbnZhciBleHBvcnRUeXBlZEFycmF5U3RhdGljTWV0aG9kID0gZnVuY3Rpb24gKEtFWSwgcHJvcGVydHksIGZvcmNlZCkge1xuICB2YXIgQVJSQVksIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcjtcbiAgaWYgKCFERVNDUklQVE9SUykgcmV0dXJuO1xuICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICBpZiAoZm9yY2VkKSBmb3IgKEFSUkFZIGluIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnNMaXN0KSB7XG4gICAgICBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQVJSQVldO1xuICAgICAgaWYgKFR5cGVkQXJyYXlDb25zdHJ1Y3RvciAmJiBoYXMoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBLRVkpKSB7XG4gICAgICAgIGRlbGV0ZSBUeXBlZEFycmF5Q29uc3RydWN0b3JbS0VZXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFUeXBlZEFycmF5W0tFWV0gfHwgZm9yY2VkKSB7XG4gICAgICAvLyBWOCB+IENocm9tZSA0OS01MCBgJVR5cGVkQXJyYXklYCBtZXRob2RzIGFyZSBub24td3JpdGFibGUgbm9uLWNvbmZpZ3VyYWJsZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHJlZGVmaW5lKFR5cGVkQXJyYXksIEtFWSwgZm9yY2VkID8gcHJvcGVydHkgOiBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTICYmIEludDhBcnJheVtLRVldIHx8IHByb3BlcnR5KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgICB9IGVsc2UgcmV0dXJuO1xuICB9XG4gIGZvciAoQVJSQVkgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QpIHtcbiAgICBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQVJSQVldO1xuICAgIGlmIChUeXBlZEFycmF5Q29uc3RydWN0b3IgJiYgKCFUeXBlZEFycmF5Q29uc3RydWN0b3JbS0VZXSB8fCBmb3JjZWQpKSB7XG4gICAgICByZWRlZmluZShUeXBlZEFycmF5Q29uc3RydWN0b3IsIEtFWSwgcHJvcGVydHkpO1xuICAgIH1cbiAgfVxufTtcblxuZm9yIChOQU1FIGluIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnNMaXN0KSB7XG4gIGlmICghZ2xvYmFsW05BTUVdKSBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTID0gZmFsc2U7XG59XG5cbi8vIFdlYktpdCBidWcgLSB0eXBlZCBhcnJheXMgY29uc3RydWN0b3JzIHByb3RvdHlwZSBpcyBPYmplY3QucHJvdG90eXBlXG5pZiAoIU5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MgfHwgdHlwZW9mIFR5cGVkQXJyYXkgIT0gJ2Z1bmN0aW9uJyB8fCBUeXBlZEFycmF5ID09PSBGdW5jdGlvbi5wcm90b3R5cGUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICBUeXBlZEFycmF5ID0gZnVuY3Rpb24gVHlwZWRBcnJheSgpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29ycmVjdCBpbnZvY2F0aW9uJyk7XG4gIH07XG4gIGlmIChOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTKSBmb3IgKE5BTUUgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QpIHtcbiAgICBpZiAoZ2xvYmFsW05BTUVdKSBzZXRQcm90b3R5cGVPZihnbG9iYWxbTkFNRV0sIFR5cGVkQXJyYXkpO1xuICB9XG59XG5cbmlmICghTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyB8fCAhVHlwZWRBcnJheVByb3RvdHlwZSB8fCBUeXBlZEFycmF5UHJvdG90eXBlID09PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXkucHJvdG90eXBlO1xuICBpZiAoTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUykgZm9yIChOQU1FIGluIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnNMaXN0KSB7XG4gICAgaWYgKGdsb2JhbFtOQU1FXSkgc2V0UHJvdG90eXBlT2YoZ2xvYmFsW05BTUVdLnByb3RvdHlwZSwgVHlwZWRBcnJheVByb3RvdHlwZSk7XG4gIH1cbn1cblxuLy8gV2ViS2l0IGJ1ZyAtIG9uZSBtb3JlIG9iamVjdCBpbiBVaW50OENsYW1wZWRBcnJheSBwcm90b3R5cGUgY2hhaW5cbmlmIChOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlKSAhPT0gVHlwZWRBcnJheVByb3RvdHlwZSkge1xuICBzZXRQcm90b3R5cGVPZihVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSwgVHlwZWRBcnJheVByb3RvdHlwZSk7XG59XG5cbmlmIChERVNDUklQVE9SUyAmJiAhaGFzKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gIFRZUEVEX0FSUkFZX1RBR19SRVFJUkVEID0gdHJ1ZTtcbiAgZGVmaW5lUHJvcGVydHkoVHlwZWRBcnJheVByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaXNPYmplY3QodGhpcykgPyB0aGlzW1RZUEVEX0FSUkFZX1RBR10gOiB1bmRlZmluZWQ7XG4gIH0gfSk7XG4gIGZvciAoTkFNRSBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCkgaWYgKGdsb2JhbFtOQU1FXSkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWxbTkFNRV0sIFRZUEVEX0FSUkFZX1RBRywgTkFNRSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1M6IE5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MsXG4gIFRZUEVEX0FSUkFZX1RBRzogVFlQRURfQVJSQVlfVEFHX1JFUUlSRUQgJiYgVFlQRURfQVJSQVlfVEFHLFxuICBhVHlwZWRBcnJheTogYVR5cGVkQXJyYXksXG4gIGFUeXBlZEFycmF5Q29uc3RydWN0b3I6IGFUeXBlZEFycmF5Q29uc3RydWN0b3IsXG4gIGV4cG9ydFR5cGVkQXJyYXlNZXRob2Q6IGV4cG9ydFR5cGVkQXJyYXlNZXRob2QsXG4gIGV4cG9ydFR5cGVkQXJyYXlTdGF0aWNNZXRob2Q6IGV4cG9ydFR5cGVkQXJyYXlTdGF0aWNNZXRob2QsXG4gIGlzVmlldzogaXNWaWV3LFxuICBpc1R5cGVkQXJyYXk6IGlzVHlwZWRBcnJheSxcbiAgVHlwZWRBcnJheTogVHlwZWRBcnJheSxcbiAgVHlwZWRBcnJheVByb3RvdHlwZTogVHlwZWRBcnJheVByb3RvdHlwZVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24nKTtcbnZhciBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKS5OQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTO1xuXG52YXIgQXJyYXlCdWZmZXIgPSBnbG9iYWwuQXJyYXlCdWZmZXI7XG52YXIgSW50OEFycmF5ID0gZ2xvYmFsLkludDhBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSAhTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBJbnQ4QXJyYXkoMSk7XG59KSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBuZXcgSW50OEFycmF5KC0xKTtcbn0pIHx8ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIG5ldyBJbnQ4QXJyYXkoKTtcbiAgbmV3IEludDhBcnJheShudWxsKTtcbiAgbmV3IEludDhBcnJheSgxLjUpO1xuICBuZXcgSW50OEFycmF5KGl0ZXJhYmxlKTtcbn0sIHRydWUpIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gU2FmYXJpICgxMSspIGJ1ZyAtIGEgcmVhc29uIHdoeSBldmVuIFNhZmFyaSAxMyBzaG91bGQgbG9hZCBhIHR5cGVkIGFycmF5IHBvbHlmaWxsXG4gIHJldHVybiBuZXcgSW50OEFycmF5KG5ldyBBcnJheUJ1ZmZlcigyKSwgMSwgdW5kZWZpbmVkKS5sZW5ndGggIT09IDE7XG59KTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gdG9JbnRlZ2VyKGl0KTtcbiAgaWYgKHJlc3VsdCA8IDApIHRocm93IFJhbmdlRXJyb3IoXCJUaGUgYXJndW1lbnQgY2FuJ3QgYmUgbGVzcyB0aGFuIDBcIik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIHRvUG9zaXRpdmVJbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXBvc2l0aXZlLWludGVnZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIEJZVEVTKSB7XG4gIHZhciBvZmZzZXQgPSB0b1Bvc2l0aXZlSW50ZWdlcihpdCk7XG4gIGlmIChvZmZzZXQgJSBCWVRFUykgdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0Jyk7XG4gIHJldHVybiBvZmZzZXQ7XG59O1xuIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpc0FycmF5SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBhVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKS5hVHlwZWRBcnJheUNvbnN0cnVjdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oc291cmNlIC8qICwgbWFwZm4sIHRoaXNBcmcgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChzb3VyY2UpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGksIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvciwgbmV4dDtcbiAgaWYgKGl0ZXJhdG9yTWV0aG9kICE9IHVuZGVmaW5lZCAmJiAhaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJhdG9yTWV0aG9kKSkge1xuICAgIGl0ZXJhdG9yID0gaXRlcmF0b3JNZXRob2QuY2FsbChPKTtcbiAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICBPID0gW107XG4gICAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICAgIE8ucHVzaChzdGVwLnZhbHVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKG1hcHBpbmcgJiYgYXJndW1lbnRzTGVuZ3RoID4gMikge1xuICAgIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgfVxuICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHJlc3VsdCA9IG5ldyAoYVR5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0aGlzKSkobGVuZ3RoKTtcbiAgZm9yIChpID0gMDsgbGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgcmVzdWx0W2ldID0gbWFwcGluZyA/IG1hcGZuKE9baV0sIGkpIDogT1tpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBtYWtlcyBzdWJjbGFzc2luZyB3b3JrIGNvcnJlY3QgZm9yIHdyYXBwZWQgYnVpbHQtaW5zXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkdGhpcywgZHVtbXksIFdyYXBwZXIpIHtcbiAgdmFyIE5ld1RhcmdldCwgTmV3VGFyZ2V0UHJvdG90eXBlO1xuICBpZiAoXG4gICAgLy8gaXQgY2FuIHdvcmsgb25seSB3aXRoIG5hdGl2ZSBgc2V0UHJvdG90eXBlT2ZgXG4gICAgc2V0UHJvdG90eXBlT2YgJiZcbiAgICAvLyB3ZSBoYXZlbid0IGNvbXBsZXRlbHkgY29ycmVjdCBwcmUtRVM2IHdheSBmb3IgZ2V0dGluZyBgbmV3LnRhcmdldGAsIHNvIHVzZSB0aGlzXG4gICAgdHlwZW9mIChOZXdUYXJnZXQgPSBkdW1teS5jb25zdHJ1Y3RvcikgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgVFlQRURfQVJSQVlTX0NPTlNUUlVDVE9SU19SRVFVSVJFU19XUkFQUEVSUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90eXBlZC1hcnJheS1jb25zdHJ1Y3RvcnMtcmVxdWlyZS13cmFwcGVycycpO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIEFycmF5QnVmZmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlcicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleCcpO1xudmFyIHRvT2Zmc2V0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9mZnNldCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpLmY7XG52YXIgdHlwZWRBcnJheUZyb20gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHlwZWQtYXJyYXktZnJvbScpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xudmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBSYW5nZUVycm9yID0gZ2xvYmFsLlJhbmdlRXJyb3I7XG52YXIgQXJyYXlCdWZmZXIgPSBBcnJheUJ1ZmZlck1vZHVsZS5BcnJheUJ1ZmZlcjtcbnZhciBEYXRhVmlldyA9IEFycmF5QnVmZmVyTW9kdWxlLkRhdGFWaWV3O1xudmFyIE5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLk5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1M7XG52YXIgVFlQRURfQVJSQVlfVEFHID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5UWVBFRF9BUlJBWV9UQUc7XG52YXIgVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuVHlwZWRBcnJheTtcbnZhciBUeXBlZEFycmF5UHJvdG90eXBlID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5UeXBlZEFycmF5UHJvdG90eXBlO1xudmFyIGFUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5Q29uc3RydWN0b3I7XG52YXIgaXNUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5pc1R5cGVkQXJyYXk7XG52YXIgQllURVNfUEVSX0VMRU1FTlQgPSAnQllURVNfUEVSX0VMRU1FTlQnO1xudmFyIFdST05HX0xFTkdUSCA9ICdXcm9uZyBsZW5ndGgnO1xuXG52YXIgZnJvbUxpc3QgPSBmdW5jdGlvbiAoQywgbGlzdCkge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBuZXcgKGFUeXBlZEFycmF5Q29uc3RydWN0b3IoQykpKGxlbmd0aCk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgcmVzdWx0W2luZGV4XSA9IGxpc3RbaW5kZXgrK107XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgbmF0aXZlRGVmaW5lUHJvcGVydHkoaXQsIGtleSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKVtrZXldO1xuICB9IH0pO1xufTtcblxudmFyIGlzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGtsYXNzO1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCAoa2xhc3MgPSBjbGFzc29mKGl0KSkgPT0gJ0FycmF5QnVmZmVyJyB8fCBrbGFzcyA9PSAnU2hhcmVkQXJyYXlCdWZmZXInO1xufTtcblxudmFyIGlzVHlwZWRBcnJheUluZGV4ID0gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gIHJldHVybiBpc1R5cGVkQXJyYXkodGFyZ2V0KVxuICAgICYmIHR5cGVvZiBrZXkgIT0gJ3N5bWJvbCdcbiAgICAmJiBrZXkgaW4gdGFyZ2V0XG4gICAgJiYgU3RyaW5nKCtrZXkpID09IFN0cmluZyhrZXkpO1xufTtcblxudmFyIHdyYXBwZWRHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcbiAgcmV0dXJuIGlzVHlwZWRBcnJheUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICA/IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigyLCB0YXJnZXRba2V5XSlcbiAgICA6IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG59O1xuXG52YXIgd3JhcHBlZERlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgaWYgKGlzVHlwZWRBcnJheUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAmJiBpc09iamVjdChkZXNjcmlwdG9yKVxuICAgICYmIGhhcyhkZXNjcmlwdG9yLCAndmFsdWUnKVxuICAgICYmICFoYXMoZGVzY3JpcHRvciwgJ2dldCcpXG4gICAgJiYgIWhhcyhkZXNjcmlwdG9yLCAnc2V0JylcbiAgICAvLyBUT0RPOiBhZGQgdmFsaWRhdGlvbiBkZXNjcmlwdG9yIHcvbyBjYWxsaW5nIGFjY2Vzc29yc1xuICAgICYmICFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZVxuICAgICYmICghaGFzKGRlc2NyaXB0b3IsICd3cml0YWJsZScpIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUpXG4gICAgJiYgKCFoYXMoZGVzY3JpcHRvciwgJ2VudW1lcmFibGUnKSB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUpXG4gICkge1xuICAgIHRhcmdldFtrZXldID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG59O1xuXG5pZiAoREVTQ1JJUFRPUlMpIHtcbiAgaWYgKCFOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTKSB7XG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmYgPSB3cmFwcGVkR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAgIGRlZmluZVByb3BlcnR5TW9kdWxlLmYgPSB3cmFwcGVkRGVmaW5lUHJvcGVydHk7XG4gICAgYWRkR2V0dGVyKFR5cGVkQXJyYXlQcm90b3R5cGUsICdidWZmZXInKTtcbiAgICBhZGRHZXR0ZXIoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2J5dGVPZmZzZXQnKTtcbiAgICBhZGRHZXR0ZXIoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2J5dGVMZW5ndGgnKTtcbiAgICBhZGRHZXR0ZXIoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2xlbmd0aCcpO1xuICB9XG5cbiAgJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MgfSwge1xuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogd3JhcHBlZEdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICBkZWZpbmVQcm9wZXJ0eTogd3JhcHBlZERlZmluZVByb3BlcnR5XG4gIH0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRZUEUsIHdyYXBwZXIsIENMQU1QRUQpIHtcbiAgICB2YXIgQllURVMgPSBUWVBFLm1hdGNoKC9cXGQrJC8pWzBdIC8gODtcbiAgICB2YXIgQ09OU1RSVUNUT1JfTkFNRSA9IFRZUEUgKyAoQ0xBTVBFRCA/ICdDbGFtcGVkJyA6ICcnKSArICdBcnJheSc7XG4gICAgdmFyIEdFVFRFUiA9ICdnZXQnICsgVFlQRTtcbiAgICB2YXIgU0VUVEVSID0gJ3NldCcgKyBUWVBFO1xuICAgIHZhciBOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQ09OU1RSVUNUT1JfTkFNRV07XG4gICAgdmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvcjtcbiAgICB2YXIgVHlwZWRBcnJheUNvbnN0cnVjdG9yUHJvdG90eXBlID0gVHlwZWRBcnJheUNvbnN0cnVjdG9yICYmIFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgdmFyIGV4cG9ydGVkID0ge307XG5cbiAgICB2YXIgZ2V0dGVyID0gZnVuY3Rpb24gKHRoYXQsIGluZGV4KSB7XG4gICAgICB2YXIgZGF0YSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICByZXR1cm4gZGF0YS52aWV3W0dFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEuYnl0ZU9mZnNldCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodGhhdCwgaW5kZXgsIHZhbHVlKSB7XG4gICAgICB2YXIgZGF0YSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICBpZiAoQ0xBTVBFRCkgdmFsdWUgPSAodmFsdWUgPSByb3VuZCh2YWx1ZSkpIDwgMCA/IDAgOiB2YWx1ZSA+IDB4RkYgPyAweEZGIDogdmFsdWUgJiAweEZGO1xuICAgICAgZGF0YS52aWV3W1NFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEuYnl0ZU9mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIH07XG5cbiAgICB2YXIgYWRkRWxlbWVudCA9IGZ1bmN0aW9uICh0aGF0LCBpbmRleCkge1xuICAgICAgbmF0aXZlRGVmaW5lUHJvcGVydHkodGhhdCwgaW5kZXgsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldHRlcih0aGlzLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHNldHRlcih0aGlzLCBpbmRleCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKCFOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTKSB7XG4gICAgICBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBkYXRhLCBvZmZzZXQsICRsZW5ndGgpIHtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGF0LCBUeXBlZEFycmF5Q29uc3RydWN0b3IsIENPTlNUUlVDVE9SX05BTUUpO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgYnl0ZU9mZnNldCA9IDA7XG4gICAgICAgIHZhciBidWZmZXIsIGJ5dGVMZW5ndGgsIGxlbmd0aDtcbiAgICAgICAgaWYgKCFpc09iamVjdChkYXRhKSkge1xuICAgICAgICAgIGxlbmd0aCA9IHRvSW5kZXgoZGF0YSk7XG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGxlbmd0aCAqIEJZVEVTO1xuICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5QnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgYnVmZmVyID0gZGF0YTtcbiAgICAgICAgICBieXRlT2Zmc2V0ID0gdG9PZmZzZXQob2Zmc2V0LCBCWVRFUyk7XG4gICAgICAgICAgdmFyICRsZW4gPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgaWYgKCRsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCRsZW4gJSBCWVRFUykgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9ICRsZW4gLSBieXRlT2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGJ5dGVMZW5ndGggPCAwKSB0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGggPSB0b0xlbmd0aCgkbGVuZ3RoKSAqIEJZVEVTO1xuICAgICAgICAgICAgaWYgKGJ5dGVMZW5ndGggKyBieXRlT2Zmc2V0ID4gJGxlbikgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZW5ndGggPSBieXRlTGVuZ3RoIC8gQllURVM7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNUeXBlZEFycmF5KGRhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuIGZyb21MaXN0KFR5cGVkQXJyYXlDb25zdHJ1Y3RvciwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVkQXJyYXlGcm9tLmNhbGwoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRJbnRlcm5hbFN0YXRlKHRoYXQsIHtcbiAgICAgICAgICBidWZmZXI6IGJ1ZmZlcixcbiAgICAgICAgICBieXRlT2Zmc2V0OiBieXRlT2Zmc2V0LFxuICAgICAgICAgIGJ5dGVMZW5ndGg6IGJ5dGVMZW5ndGgsXG4gICAgICAgICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgICAgICAgdmlldzogbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICAgICAgfSk7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCkgYWRkRWxlbWVudCh0aGF0LCBpbmRleCsrKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHNldFByb3RvdHlwZU9mKFR5cGVkQXJyYXlDb25zdHJ1Y3RvciwgVHlwZWRBcnJheSk7XG4gICAgICBUeXBlZEFycmF5Q29uc3RydWN0b3JQcm90b3R5cGUgPSBUeXBlZEFycmF5Q29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKFR5cGVkQXJyYXlQcm90b3R5cGUpO1xuICAgIH0gZWxzZSBpZiAoVFlQRURfQVJSQVlTX0NPTlNUUlVDVE9SU19SRVFVSVJFU19XUkFQUEVSUykge1xuICAgICAgVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gd3JhcHBlcihmdW5jdGlvbiAoZHVtbXksIGRhdGEsIHR5cGVkQXJyYXlPZmZzZXQsICRsZW5ndGgpIHtcbiAgICAgICAgYW5JbnN0YW5jZShkdW1teSwgVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICAgICAgcmV0dXJuIGluaGVyaXRJZlJlcXVpcmVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIWlzT2JqZWN0KGRhdGEpKSByZXR1cm4gbmV3IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0b0luZGV4KGRhdGEpKTtcbiAgICAgICAgICBpZiAoaXNBcnJheUJ1ZmZlcihkYXRhKSkgcmV0dXJuICRsZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBuZXcgTmF0aXZlVHlwZWRBcnJheUNvbnN0cnVjdG9yKGRhdGEsIHRvT2Zmc2V0KHR5cGVkQXJyYXlPZmZzZXQsIEJZVEVTKSwgJGxlbmd0aClcbiAgICAgICAgICAgIDogdHlwZWRBcnJheU9mZnNldCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gbmV3IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvcihkYXRhLCB0b09mZnNldCh0eXBlZEFycmF5T2Zmc2V0LCBCWVRFUykpXG4gICAgICAgICAgICAgIDogbmV3IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvcihkYXRhKTtcbiAgICAgICAgICBpZiAoaXNUeXBlZEFycmF5KGRhdGEpKSByZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBkYXRhKTtcbiAgICAgICAgICByZXR1cm4gdHlwZWRBcnJheUZyb20uY2FsbChUeXBlZEFycmF5Q29uc3RydWN0b3IsIGRhdGEpO1xuICAgICAgICB9KCksIGR1bW15LCBUeXBlZEFycmF5Q29uc3RydWN0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzZXRQcm90b3R5cGVPZikgc2V0UHJvdG90eXBlT2YoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBUeXBlZEFycmF5KTtcbiAgICAgIGZvckVhY2goZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3IpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFR5cGVkQXJyYXlDb25zdHJ1Y3Rvciwga2V5LCBOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3Jba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgVHlwZWRBcnJheUNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IFR5cGVkQXJyYXlDb25zdHJ1Y3RvclByb3RvdHlwZTtcbiAgICB9XG5cbiAgICBpZiAoVHlwZWRBcnJheUNvbnN0cnVjdG9yUHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShUeXBlZEFycmF5Q29uc3RydWN0b3JQcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKFRZUEVEX0FSUkFZX1RBRykge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFR5cGVkQXJyYXlDb25zdHJ1Y3RvclByb3RvdHlwZSwgVFlQRURfQVJSQVlfVEFHLCBDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICB9XG5cbiAgICBleHBvcnRlZFtDT05TVFJVQ1RPUl9OQU1FXSA9IFR5cGVkQXJyYXlDb25zdHJ1Y3RvcjtcblxuICAgICQoe1xuICAgICAgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IFR5cGVkQXJyYXlDb25zdHJ1Y3RvciAhPSBOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3IsIHNoYW06ICFOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTXG4gICAgfSwgZXhwb3J0ZWQpO1xuXG4gICAgaWYgKCEoQllURVNfUEVSX0VMRU1FTlQgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFR5cGVkQXJyYXlDb25zdHJ1Y3RvciwgQllURVNfUEVSX0VMRU1FTlQsIEJZVEVTKTtcbiAgICB9XG5cbiAgICBpZiAoIShCWVRFU19QRVJfRUxFTUVOVCBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3JQcm90b3R5cGUpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoVHlwZWRBcnJheUNvbnN0cnVjdG9yUHJvdG90eXBlLCBCWVRFU19QRVJfRUxFTUVOVCwgQllURVMpO1xuICAgIH1cblxuICAgIHNldFNwZWNpZXMoQ09OU1RSVUNUT1JfTkFNRSk7XG4gIH07XG59IGVsc2UgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCJ2YXIgY3JlYXRlVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3R5cGVkLWFycmF5LWNvbnN0cnVjdG9yJyk7XG5cbi8vIGBVaW50OEFycmF5YCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZWRhcnJheS1vYmplY3RzXG5jcmVhdGVUeXBlZEFycmF5Q29uc3RydWN0b3IoJ1VpbnQ4JywgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbmAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29weXdpdGhpblxubW9kdWxlLmV4cG9ydHMgPSBbXS5jb3B5V2l0aGluIHx8IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0IC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciB0byA9IHRvQWJzb2x1dGVJbmRleCh0YXJnZXQsIGxlbik7XG4gIHZhciBmcm9tID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICB2YXIgZW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBjb3VudCA9IG1pbigoZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW4pKSAtIGZyb20sIGxlbiAtIHRvKTtcbiAgdmFyIGluYyA9IDE7XG4gIGlmIChmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpIHtcbiAgICBpbmMgPSAtMTtcbiAgICBmcm9tICs9IGNvdW50IC0gMTtcbiAgICB0byArPSBjb3VudCAtIDE7XG4gIH1cbiAgd2hpbGUgKGNvdW50LS0gPiAwKSB7XG4gICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgIHRvICs9IGluYztcbiAgICBmcm9tICs9IGluYztcbiAgfSByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGNvcHlXaXRoaW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktY29weS13aXRoaW4nKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5jb3B5V2l0aGluYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuY29weXdpdGhpblxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnY29weVdpdGhpbicsIGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCAvKiAsIGVuZCAqLykge1xuICByZXR1cm4gJGNvcHlXaXRoaW4uY2FsbChhVHlwZWRBcnJheSh0aGlzKSwgdGFyZ2V0LCBzdGFydCwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGV2ZXJ5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmV2ZXJ5O1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuZXZlcnlcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2V2ZXJ5JywgZnVuY3Rpb24gZXZlcnkoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRldmVyeShhVHlwZWRBcnJheSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGZpbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZmlsbCcpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmZpbGxgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5maWxsXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2ZpbGwnLCBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qICwgc3RhcnQsIGVuZCAqLykge1xuICByZXR1cm4gJGZpbGwuYXBwbHkoYVR5cGVkQXJyYXkodGhpcyksIGFyZ3VtZW50cyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkZmlsdGVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbHRlcjtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGFUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5Q29uc3RydWN0b3I7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuZmlsdGVyXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdmaWx0ZXInLCBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgdmFyIGxpc3QgPSAkZmlsdGVyKGFUeXBlZEFycmF5KHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBuZXcgKGFUeXBlZEFycmF5Q29uc3RydWN0b3IoQykpKGxlbmd0aCk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgcmVzdWx0W2luZGV4XSA9IGxpc3RbaW5kZXgrK107XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkZmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maW5kO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5maW5kXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdmaW5kJywgZnVuY3Rpb24gZmluZChwcmVkaWNhdGUgLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZmluZChhVHlwZWRBcnJheSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkZmluZEluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmRJbmRleDtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5maW5kaW5kZXhcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2ZpbmRJbmRleCcsIGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUgLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZmluZEluZGV4KGFUeXBlZEFycmF5KHRoaXMpLCBwcmVkaWNhdGUsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLmZvcmVhY2hcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2ZvckVhY2gnLCBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICRmb3JFYWNoKGFUeXBlZEFycmF5KHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmNsdWRlcztcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLmluY2x1ZGVzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdpbmNsdWRlcycsIGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggKi8pIHtcbiAgcmV0dXJuICRpbmNsdWRlcyhhVHlwZWRBcnJheSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5pbmRleG9mXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdpbmRleE9mJywgZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ICovKSB7XG4gIHJldHVybiAkaW5kZXhPZihhVHlwZWRBcnJheSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIEFycmF5SXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5O1xudmFyIGFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvcnMudmFsdWVzO1xudmFyIGFycmF5S2V5cyA9IEFycmF5SXRlcmF0b3JzLmtleXM7XG52YXIgYXJyYXlFbnRyaWVzID0gQXJyYXlJdGVyYXRvcnMuZW50cmllcztcbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcbnZhciBuYXRpdmVUeXBlZEFycmF5SXRlcmF0b3IgPSBVaW50OEFycmF5ICYmIFVpbnQ4QXJyYXkucHJvdG90eXBlW0lURVJBVE9SXTtcblxudmFyIENPUlJFQ1RfSVRFUl9OQU1FID0gISFuYXRpdmVUeXBlZEFycmF5SXRlcmF0b3JcbiAgJiYgKG5hdGl2ZVR5cGVkQXJyYXlJdGVyYXRvci5uYW1lID09ICd2YWx1ZXMnIHx8IG5hdGl2ZVR5cGVkQXJyYXlJdGVyYXRvci5uYW1lID09IHVuZGVmaW5lZCk7XG5cbnZhciB0eXBlZEFycmF5VmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKCkge1xuICByZXR1cm4gYXJyYXlWYWx1ZXMuY2FsbChhVHlwZWRBcnJheSh0aGlzKSk7XG59O1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuZW50cmllc1xuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnZW50cmllcycsIGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gIHJldHVybiBhcnJheUVudHJpZXMuY2FsbChhVHlwZWRBcnJheSh0aGlzKSk7XG59KTtcbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5rZXlzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdrZXlzJywgZnVuY3Rpb24ga2V5cygpIHtcbiAgcmV0dXJuIGFycmF5S2V5cy5jYWxsKGFUeXBlZEFycmF5KHRoaXMpKTtcbn0pO1xuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUudmFsdWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUudmFsdWVzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCd2YWx1ZXMnLCB0eXBlZEFycmF5VmFsdWVzLCAhQ09SUkVDVF9JVEVSX05BTUUpO1xuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKElURVJBVE9SLCB0eXBlZEFycmF5VmFsdWVzLCAhQ09SUkVDVF9JVEVSX05BTUUpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJGpvaW4gPSBbXS5qb2luO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5qb2luYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuam9pblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdqb2luJywgZnVuY3Rpb24gam9pbihzZXBhcmF0b3IpIHtcbiAgcmV0dXJuICRqb2luLmFwcGx5KGFUeXBlZEFycmF5KHRoaXMpLCBhcmd1bWVudHMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIG5hdGl2ZUxhc3RJbmRleE9mID0gW10ubGFzdEluZGV4T2Y7XG52YXIgTkVHQVRJVkVfWkVSTyA9ICEhbmF0aXZlTGFzdEluZGV4T2YgJiYgMSAvIFsxXS5sYXN0SW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdsYXN0SW5kZXhPZicpO1xuLy8gRm9yIHByZXZlbnRpbmcgcG9zc2libGUgYWxtb3N0IGluZmluaXRlIGxvb3AgaW4gbm9uLXN0YW5kYXJkIGltcGxlbWVudGF0aW9ucywgdGVzdCB0aGUgZm9yd2FyZCB2ZXJzaW9uIG9mIHRoZSBtZXRob2RcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdpbmRleE9mJywgeyBBQ0NFU1NPUlM6IHRydWUsIDE6IDAgfSk7XG52YXIgRk9SQ0VEID0gTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEg7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2ZgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmxhc3RpbmRleG9mXG5tb2R1bGUuZXhwb3J0cyA9IEZPUkNFRCA/IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSBAWyotMV0gKi8pIHtcbiAgLy8gY29udmVydCAtMCB0byArMFxuICBpZiAoTkVHQVRJVkVfWkVSTykgcmV0dXJuIG5hdGl2ZUxhc3RJbmRleE9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMDtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciBpbmRleCA9IGxlbmd0aCAtIDE7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgaW5kZXggPSBtaW4oaW5kZXgsIHRvSW50ZWdlcihhcmd1bWVudHNbMV0pKTtcbiAgaWYgKGluZGV4IDwgMCkgaW5kZXggPSBsZW5ndGggKyBpbmRleDtcbiAgZm9yICg7aW5kZXggPj0gMDsgaW5kZXgtLSkgaWYgKGluZGV4IGluIE8gJiYgT1tpbmRleF0gPT09IHNlYXJjaEVsZW1lbnQpIHJldHVybiBpbmRleCB8fCAwO1xuICByZXR1cm4gLTE7XG59IDogbmF0aXZlTGFzdEluZGV4T2Y7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGxhc3RJbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWxhc3QtaW5kZXgtb2YnKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5sYXN0SW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLmxhc3RpbmRleG9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2xhc3RJbmRleE9mJywgZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCAqLykge1xuICByZXR1cm4gJGxhc3RJbmRleE9mLmFwcGx5KGFUeXBlZEFycmF5KHRoaXMpLCBhcmd1bWVudHMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBhVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheUNvbnN0cnVjdG9yO1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLm1hcFxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnbWFwJywgZnVuY3Rpb24gbWFwKG1hcGZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJG1hcChhVHlwZWRBcnJheSh0aGlzKSwgbWFwZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCBmdW5jdGlvbiAoTywgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyAoYVR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzcGVjaWVzQ29uc3RydWN0b3IoTywgTy5jb25zdHJ1Y3RvcikpKShsZW5ndGgpO1xuICB9KTtcbn0pO1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgcmVkdWNlLCByZWR1Y2VSaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX1JJR0hUKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgY2FsbGJhY2tmbiwgYXJndW1lbnRzTGVuZ3RoLCBtZW1vKSB7XG4gICAgYUZ1bmN0aW9uKGNhbGxiYWNrZm4pO1xuICAgIHZhciBPID0gdG9PYmplY3QodGhhdCk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gSVNfUklHSFQgPyBsZW5ndGggLSAxIDogMDtcbiAgICB2YXIgaSA9IElTX1JJR0hUID8gLTEgOiAxO1xuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPCAyKSB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKGluZGV4IGluIHNlbGYpIHtcbiAgICAgICAgbWVtbyA9IHNlbGZbaW5kZXhdO1xuICAgICAgICBpbmRleCArPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGluZGV4ICs9IGk7XG4gICAgICBpZiAoSVNfUklHSFQgPyBpbmRleCA8IDAgOiBsZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoO0lTX1JJR0hUID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKSBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgICAgbWVtbyA9IGNhbGxiYWNrZm4obWVtbywgc2VsZltpbmRleF0sIGluZGV4LCBPKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlXG4gIGxlZnQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlcmlnaHRcbiAgcmlnaHQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkcmVkdWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXJlZHVjZScpLmxlZnQ7XG5cbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUucmVkdWNlXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdyZWR1Y2UnLCBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICByZXR1cm4gJHJlZHVjZShhVHlwZWRBcnJheSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJHJlZHVjZVJpZ2h0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXJlZHVjZScpLnJpZ2h0O1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLnJlZHVjZVJpY2h0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUucmVkdWNlcmlnaHRcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ3JlZHVjZVJpZ2h0JywgZnVuY3Rpb24gcmVkdWNlUmlnaHQoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICByZXR1cm4gJHJlZHVjZVJpZ2h0KGFUeXBlZEFycmF5KHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUucmV2ZXJzZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLnJldmVyc2VcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ3JldmVyc2UnLCBmdW5jdGlvbiByZXZlcnNlKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBsZW5ndGggPSBhVHlwZWRBcnJheSh0aGF0KS5sZW5ndGg7XG4gIHZhciBtaWRkbGUgPSBmbG9vcihsZW5ndGggLyAyKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHZhbHVlO1xuICB3aGlsZSAoaW5kZXggPCBtaWRkbGUpIHtcbiAgICB2YWx1ZSA9IHRoYXRbaW5kZXhdO1xuICAgIHRoYXRbaW5kZXgrK10gPSB0aGF0Wy0tbGVuZ3RoXTtcbiAgICB0aGF0W2xlbmd0aF0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdGhhdDtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvT2Zmc2V0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9mZnNldCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxudmFyIEZPUkNFRCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIG5ldyBJbnQ4QXJyYXkoMSkuc2V0KHt9KTtcbn0pO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5zZXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5zZXRcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ3NldCcsIGZ1bmN0aW9uIHNldChhcnJheUxpa2UgLyogLCBvZmZzZXQgKi8pIHtcbiAgYVR5cGVkQXJyYXkodGhpcyk7XG4gIHZhciBvZmZzZXQgPSB0b09mZnNldChhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMSk7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgdmFyIHNyYyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gIHZhciBsZW4gPSB0b0xlbmd0aChzcmMubGVuZ3RoKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgaWYgKGxlbiArIG9mZnNldCA+IGxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcignV3JvbmcgbGVuZ3RoJyk7XG4gIHdoaWxlIChpbmRleCA8IGxlbikgdGhpc1tvZmZzZXQgKyBpbmRleF0gPSBzcmNbaW5kZXgrK107XG59LCBGT1JDRUQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBhVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheUNvbnN0cnVjdG9yO1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJHNsaWNlID0gW10uc2xpY2U7XG5cbnZhciBGT1JDRUQgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBuZXcgSW50OEFycmF5KDEpLnNsaWNlKCk7XG59KTtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUuc2xpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5zbGljZVxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnc2xpY2UnLCBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gIHZhciBsaXN0ID0gJHNsaWNlLmNhbGwoYVR5cGVkQXJyYXkodGhpcyksIHN0YXJ0LCBlbmQpO1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gbmV3IChhVHlwZWRBcnJheUNvbnN0cnVjdG9yKEMpKShsZW5ndGgpO1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHJlc3VsdFtpbmRleF0gPSBsaXN0W2luZGV4KytdO1xuICByZXR1cm4gcmVzdWx0O1xufSwgRk9SQ0VEKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkc29tZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5zb21lO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5zb21lXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdzb21lJywgZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJHNvbWUoYVR5cGVkQXJyYXkodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJHNvcnQgPSBbXS5zb3J0O1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5zb3J0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuc29ydFxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnc29ydCcsIGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKSB7XG4gIHJldHVybiAkc29ydC5jYWxsKGFUeXBlZEFycmF5KHRoaXMpLCBjb21wYXJlZm4pO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5zdWJhcnJheWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLnN1YmFycmF5XG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdzdWJhcnJheScsIGZ1bmN0aW9uIHN1YmFycmF5KGJlZ2luLCBlbmQpIHtcbiAgdmFyIE8gPSBhVHlwZWRBcnJheSh0aGlzKTtcbiAgdmFyIGxlbmd0aCA9IE8ubGVuZ3RoO1xuICB2YXIgYmVnaW5JbmRleCA9IHRvQWJzb2x1dGVJbmRleChiZWdpbiwgbGVuZ3RoKTtcbiAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE8uY29uc3RydWN0b3IpKShcbiAgICBPLmJ1ZmZlcixcbiAgICBPLmJ5dGVPZmZzZXQgKyBiZWdpbkluZGV4ICogTy5CWVRFU19QRVJfRUxFTUVOVCxcbiAgICB0b0xlbmd0aCgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW5ndGgpKSAtIGJlZ2luSW5kZXgpXG4gICk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIEludDhBcnJheSA9IGdsb2JhbC5JbnQ4QXJyYXk7XG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJHRvTG9jYWxlU3RyaW5nID0gW10udG9Mb2NhbGVTdHJpbmc7XG52YXIgJHNsaWNlID0gW10uc2xpY2U7XG5cbi8vIGlPUyBTYWZhcmkgNi54IGZhaWxzIGhlcmVcbnZhciBUT19MT0NBTEVfU1RSSU5HX0JVRyA9ICEhSW50OEFycmF5ICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgJHRvTG9jYWxlU3RyaW5nLmNhbGwobmV3IEludDhBcnJheSgxKSk7XG59KTtcblxudmFyIEZPUkNFRCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFsxLCAyXS50b0xvY2FsZVN0cmluZygpICE9IG5ldyBJbnQ4QXJyYXkoWzEsIDJdKS50b0xvY2FsZVN0cmluZygpO1xufSkgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgSW50OEFycmF5LnByb3RvdHlwZS50b0xvY2FsZVN0cmluZy5jYWxsKFsxLCAyXSk7XG59KTtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS50b2xvY2FsZXN0cmluZ1xuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgndG9Mb2NhbGVTdHJpbmcnLCBmdW5jdGlvbiB0b0xvY2FsZVN0cmluZygpIHtcbiAgcmV0dXJuICR0b0xvY2FsZVN0cmluZy5hcHBseShUT19MT0NBTEVfU1RSSU5HX0JVRyA/ICRzbGljZS5jYWxsKGFUeXBlZEFycmF5KHRoaXMpKSA6IGFUeXBlZEFycmF5KHRoaXMpLCBhcmd1bWVudHMpO1xufSwgRk9SQ0VEKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5O1xudmFyIFVpbnQ4QXJyYXlQcm90b3R5cGUgPSBVaW50OEFycmF5ICYmIFVpbnQ4QXJyYXkucHJvdG90eXBlIHx8IHt9O1xudmFyIGFycmF5VG9TdHJpbmcgPSBbXS50b1N0cmluZztcbnZhciBhcnJheUpvaW4gPSBbXS5qb2luO1xuXG5pZiAoZmFpbHMoZnVuY3Rpb24gKCkgeyBhcnJheVRvU3RyaW5nLmNhbGwoe30pOyB9KSkge1xuICBhcnJheVRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRoaXMpO1xuICB9O1xufVxuXG52YXIgSVNfTk9UX0FSUkFZX01FVEhPRCA9IFVpbnQ4QXJyYXlQcm90b3R5cGUudG9TdHJpbmcgIT0gYXJyYXlUb1N0cmluZztcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS50b3N0cmluZ1xuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgndG9TdHJpbmcnLCBhcnJheVRvU3RyaW5nLCBJU19OT1RfQVJSQVlfTUVUSE9EKTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHVybCA9IG5ldyBVUkwoJ2I/YT0xJmI9MiZjPTMnLCAnaHR0cDovL2EnKTtcbiAgdmFyIHNlYXJjaFBhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXM7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdXJsLnBhdGhuYW1lID0gJ2MlMjBkJztcbiAgc2VhcmNoUGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBzZWFyY2hQYXJhbXNbJ2RlbGV0ZSddKCdiJyk7XG4gICAgcmVzdWx0ICs9IGtleSArIHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIChJU19QVVJFICYmICF1cmwudG9KU09OKVxuICAgIHx8ICFzZWFyY2hQYXJhbXMuc29ydFxuICAgIHx8IHVybC5ocmVmICE9PSAnaHR0cDovL2EvYyUyMGQ/YT0xJmM9MydcbiAgICB8fCBzZWFyY2hQYXJhbXMuZ2V0KCdjJykgIT09ICczJ1xuICAgIHx8IFN0cmluZyhuZXcgVVJMU2VhcmNoUGFyYW1zKCc/YT0xJykpICE9PSAnYT0xJ1xuICAgIHx8ICFzZWFyY2hQYXJhbXNbSVRFUkFUT1JdXG4gICAgLy8gdGhyb3dzIGluIEVkZ2VcbiAgICB8fCBuZXcgVVJMKCdodHRwczovL2FAYicpLnVzZXJuYW1lICE9PSAnYSdcbiAgICB8fCBuZXcgVVJMU2VhcmNoUGFyYW1zKG5ldyBVUkxTZWFyY2hQYXJhbXMoJ2E9YicpKS5nZXQoJ2EnKSAhPT0gJ2InXG4gICAgLy8gbm90IHB1bnljb2RlZCBpbiBFZGdlXG4gICAgfHwgbmV3IFVSTCgnaHR0cDovL9GC0LXRgdGCJykuaG9zdCAhPT0gJ3huLS1lMWF5YmMnXG4gICAgLy8gbm90IGVzY2FwZWQgaW4gQ2hyb21lIDYyLVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly9hI9CxJykuaGFzaCAhPT0gJyMlRDAlQjEnXG4gICAgLy8gZmFpbHMgaW4gQ2hyb21lIDY2LVxuICAgIHx8IHJlc3VsdCAhPT0gJ2ExYzMnXG4gICAgLy8gdGhyb3dzIGluIFNhZmFyaVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly94JywgdW5kZWZpbmVkKS5ob3N0ICE9PSAneCc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG5cbnZhciBuYXRpdmVBc3NpZ24gPSBPYmplY3QuYXNzaWduO1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgbmF0aXZlQXNzaWduKHsgYjogMSB9LCBuYXRpdmVBc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgRU5UUklFUykge1xuICB0cnkge1xuICAgIHJldHVybiBFTlRSSUVTID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvciwgbmV4dCwgdmFsdWU7XG4gIGlmIChtYXBwaW5nKSBtYXBmbiA9IGJpbmQobWFwZm4sIGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAvLyBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBpdGVyYWJsZSBvciBpdCdzIGFuIGFycmF5IHdpdGggdGhlIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2UgYSBzaW1wbGUgY2FzZVxuICBpZiAoaXRlcmF0b3JNZXRob2QgIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcmF0b3JNZXRob2QoaXRlcmF0b3JNZXRob2QpKSkge1xuICAgIGl0ZXJhdG9yID0gaXRlcmF0b3JNZXRob2QuY2FsbChPKTtcbiAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICByZXN1bHQgPSBuZXcgQygpO1xuICAgIGZvciAoOyEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IGNhbGxXaXRoU2FmZUl0ZXJhdGlvbkNsb3NpbmcoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICByZXN1bHQgPSBuZXcgQyhsZW5ndGgpO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICB2YWx1ZSA9IG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF07XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvcHVueWNvZGUuanMvYmxvYi9tYXN0ZXIvcHVueWNvZGUuanNcbnZhciBtYXhJbnQgPSAyMTQ3NDgzNjQ3OyAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG52YXIgYmFzZSA9IDM2O1xudmFyIHRNaW4gPSAxO1xudmFyIHRNYXggPSAyNjtcbnZhciBza2V3ID0gMzg7XG52YXIgZGFtcCA9IDcwMDtcbnZhciBpbml0aWFsQmlhcyA9IDcyO1xudmFyIGluaXRpYWxOID0gMTI4OyAvLyAweDgwXG52YXIgZGVsaW1pdGVyID0gJy0nOyAvLyAnXFx4MkQnXG52YXIgcmVnZXhOb25BU0NJSSA9IC9bXlxcMC1cXHUwMDdFXS87IC8vIG5vbi1BU0NJSSBjaGFyc1xudmFyIHJlZ2V4U2VwYXJhdG9ycyA9IC9bLlxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZzsgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xudmFyIE9WRVJGTE9XX0VSUk9SID0gJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJztcbnZhciBiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcbiAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuICogbWF0Y2hpbmcgVVRGLTE2LlxuICovXG52YXIgdWNzMmRlY29kZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgY291bnRlciA9IDA7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgaWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuICAgICAgLy8gSXQncyBhIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3Rlci5cbiAgICAgIHZhciBleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgICBpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gTG93IHN1cnJvZ2F0ZS5cbiAgICAgICAgb3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0J3MgYW4gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlXG4gICAgICAgIC8vIG5leHQgY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyLlxuICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKi9cbnZhciBkaWdpdFRvQmFzaWMgPSBmdW5jdGlvbiAoZGlnaXQpIHtcbiAgLy8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcbiAgLy8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG4gIHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNik7XG59O1xuXG4vKipcbiAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuICovXG52YXIgYWRhcHQgPSBmdW5jdGlvbiAoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG4gIHZhciBrID0gMDtcbiAgZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcbiAgZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuICBmb3IgKDsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcbiAgICBkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG4gIH1cbiAgcmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG4gKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgIG1heC1zdGF0ZW1lbnRzXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcblxuICAvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBhbiBhcnJheSBvZiBVbmljb2RlIGNvZGUgcG9pbnRzLlxuICBpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG4gIC8vIENhY2hlIHRoZSBsZW5ndGguXG4gIHZhciBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzdGF0ZS5cbiAgdmFyIG4gPSBpbml0aWFsTjtcbiAgdmFyIGRlbHRhID0gMDtcbiAgdmFyIGJpYXMgPSBpbml0aWFsQmlhcztcbiAgdmFyIGksIGN1cnJlbnRWYWx1ZTtcblxuICAvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzLlxuICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICBjdXJyZW50VmFsdWUgPSBpbnB1dFtpXTtcbiAgICBpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuICAgICAgb3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7IC8vIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cbiAgdmFyIGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGg7IC8vIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXG4gIC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIHdpdGggYSBkZWxpbWl0ZXIgdW5sZXNzIGl0J3MgZW1wdHkuXG4gIGlmIChiYXNpY0xlbmd0aCkge1xuICAgIG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG4gIH1cblxuICAvLyBNYWluIGVuY29kaW5nIGxvb3A6XG4gIHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG4gICAgLy8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dCBsYXJnZXIgb25lOlxuICAgIHZhciBtID0gbWF4SW50O1xuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuICAgICAgICBtID0gY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPiwgYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3cuXG4gICAgdmFyIGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcbiAgICBpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuICAgICAgdGhyb3cgUmFuZ2VFcnJvcihPVkVSRkxPV19FUlJPUik7XG4gICAgfVxuXG4gICAgZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcbiAgICBuID0gbTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG4gICAgICAgIHRocm93IFJhbmdlRXJyb3IoT1ZFUkZMT1dfRVJST1IpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG4gICAgICAgIC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxuICAgICAgICB2YXIgcSA9IGRlbHRhO1xuICAgICAgICBmb3IgKHZhciBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcbiAgICAgICAgICB2YXIgdCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG4gICAgICAgICAgaWYgKHEgPCB0KSBicmVhaztcbiAgICAgICAgICB2YXIgcU1pbnVzVCA9IHEgLSB0O1xuICAgICAgICAgIHZhciBiYXNlTWludXNUID0gYmFzZSAtIHQ7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QpKSk7XG4gICAgICAgICAgcSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSkpKTtcbiAgICAgICAgYmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICArK2hhbmRsZWRDUENvdW50O1xuICAgICAgfVxuICAgIH1cblxuICAgICsrZGVsdGE7XG4gICAgKytuO1xuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgZW5jb2RlZCA9IFtdO1xuICB2YXIgbGFiZWxzID0gaW5wdXQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xcdTAwMkUnKS5zcGxpdCgnLicpO1xuICB2YXIgaSwgbGFiZWw7XG4gIGZvciAoaSA9IDA7IGkgPCBsYWJlbHMubGVuZ3RoOyBpKyspIHtcbiAgICBsYWJlbCA9IGxhYmVsc1tpXTtcbiAgICBlbmNvZGVkLnB1c2gocmVnZXhOb25BU0NJSS50ZXN0KGxhYmVsKSA/ICd4bi0tJyArIGVuY29kZShsYWJlbCkgOiBsYWJlbCk7XG4gIH1cbiAgcmV0dXJuIGVuY29kZWQuam9pbignLicpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvck1ldGhvZCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBpdGVyYWJsZScpO1xuICB9IHJldHVybiBhbk9iamVjdChpdGVyYXRvck1ldGhvZC5jYWxsKGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogaW4gY29yZS1qc0A0LCBtb3ZlIC9tb2R1bGVzLyBkZXBlbmRlbmNpZXMgdG8gcHVibGljIGVudHJpZXMgZm9yIGJldHRlciBvcHRpbWl6YXRpb24gYnkgdG9vbHMgbGlrZSBgcHJlc2V0LWVudmBcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgVVNFX05BVElWRV9VUkwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXVybCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBnZXRJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3InKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkZmV0Y2ggPSBnZXRCdWlsdEluKCdmZXRjaCcpO1xudmFyIEhlYWRlcnMgPSBnZXRCdWlsdEluKCdIZWFkZXJzJyk7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVVJMX1NFQVJDSF9QQVJBTVMgPSAnVVJMU2VhcmNoUGFyYW1zJztcbnZhciBVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUiA9IFVSTF9TRUFSQ0hfUEFSQU1TICsgJ0l0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFVSTF9TRUFSQ0hfUEFSQU1TKTtcbnZhciBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUik7XG5cbnZhciBwbHVzID0gL1xcKy9nO1xudmFyIHNlcXVlbmNlcyA9IEFycmF5KDQpO1xuXG52YXIgcGVyY2VudFNlcXVlbmNlID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gIHJldHVybiBzZXF1ZW5jZXNbYnl0ZXMgLSAxXSB8fCAoc2VxdWVuY2VzW2J5dGVzIC0gMV0gPSBSZWdFeHAoJygoPzolW1xcXFxkYS1mXXsyfSl7JyArIGJ5dGVzICsgJ30pJywgJ2dpJykpO1xufTtcblxudmFyIHBlcmNlbnREZWNvZGUgPSBmdW5jdGlvbiAoc2VxdWVuY2UpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHNlcXVlbmNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gc2VxdWVuY2U7XG4gIH1cbn07XG5cbnZhciBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gaXQucmVwbGFjZShwbHVzLCAnICcpO1xuICB2YXIgYnl0ZXMgPSA0O1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB3aGlsZSAoYnl0ZXMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHBlcmNlbnRTZXF1ZW5jZShieXRlcy0tKSwgcGVyY2VudERlY29kZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbnZhciBmaW5kID0gL1shJygpfl18JTIwL2c7XG5cbnZhciByZXBsYWNlID0ge1xuICAnISc6ICclMjEnLFxuICBcIidcIjogJyUyNycsXG4gICcoJzogJyUyOCcsXG4gICcpJzogJyUyOScsXG4gICd+JzogJyU3RScsXG4gICclMjAnOiAnKydcbn07XG5cbnZhciByZXBsYWNlciA9IGZ1bmN0aW9uIChtYXRjaCkge1xuICByZXR1cm4gcmVwbGFjZVttYXRjaF07XG59O1xuXG52YXIgc2VyaWFsaXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaXQpLnJlcGxhY2UoZmluZCwgcmVwbGFjZXIpO1xufTtcblxudmFyIHBhcnNlU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gKHJlc3VsdCwgcXVlcnkpIHtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBxdWVyeS5zcGxpdCgnJicpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGF0dHJpYnV0ZSwgZW50cnk7XG4gICAgd2hpbGUgKGluZGV4IDwgYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaW5kZXgrK107XG4gICAgICBpZiAoYXR0cmlidXRlLmxlbmd0aCkge1xuICAgICAgICBlbnRyeSA9IGF0dHJpYnV0ZS5zcGxpdCgnPScpO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAga2V5OiBkZXNlcmlhbGl6ZShlbnRyeS5zaGlmdCgpKSxcbiAgICAgICAgICB2YWx1ZTogZGVzZXJpYWxpemUoZW50cnkuam9pbignPScpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciB1cGRhdGVTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgdGhpcy5lbnRyaWVzLmxlbmd0aCA9IDA7XG4gIHBhcnNlU2VhcmNoUGFyYW1zKHRoaXMuZW50cmllcywgcXVlcnkpO1xufTtcblxudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gZnVuY3Rpb24gKHBhc3NlZCwgcmVxdWlyZWQpIHtcbiAgaWYgKHBhc3NlZCA8IHJlcXVpcmVkKSB0aHJvdyBUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IgPSBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKGZ1bmN0aW9uIEl0ZXJhdG9yKHBhcmFtcywga2luZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUixcbiAgICBpdGVyYXRvcjogZ2V0SXRlcmF0b3IoZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZShwYXJhbXMpLmVudHJpZXMpLFxuICAgIGtpbmQ6IGtpbmRcbiAgfSk7XG59LCAnSXRlcmF0b3InLCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUodGhpcyk7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIHN0ZXAgPSBzdGF0ZS5pdGVyYXRvci5uZXh0KCk7XG4gIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gIGlmICghc3RlcC5kb25lKSB7XG4gICAgc3RlcC52YWx1ZSA9IGtpbmQgPT09ICdrZXlzJyA/IGVudHJ5LmtleSA6IGtpbmQgPT09ICd2YWx1ZXMnID8gZW50cnkudmFsdWUgOiBbZW50cnkua2V5LCBlbnRyeS52YWx1ZV07XG4gIH0gcmV0dXJuIHN0ZXA7XG59KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtc2AgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLXVybHNlYXJjaHBhcmFtc1xudmFyIFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yID0gZnVuY3Rpb24gVVJMU2VhcmNoUGFyYW1zKC8qIGluaXQgKi8pIHtcbiAgYW5JbnN0YW5jZSh0aGlzLCBVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3RvciwgVVJMX1NFQVJDSF9QQVJBTVMpO1xuICB2YXIgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBlbnRyaWVzID0gW107XG4gIHZhciBpdGVyYXRvck1ldGhvZCwgaXRlcmF0b3IsIG5leHQsIHN0ZXAsIGVudHJ5SXRlcmF0b3IsIGVudHJ5TmV4dCwgZmlyc3QsIHNlY29uZCwga2V5O1xuXG4gIHNldEludGVybmFsU3RhdGUodGhhdCwge1xuICAgIHR5cGU6IFVSTF9TRUFSQ0hfUEFSQU1TLFxuICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgdXBkYXRlVVJMOiBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sXG4gICAgdXBkYXRlU2VhcmNoUGFyYW1zOiB1cGRhdGVTZWFyY2hQYXJhbXNcbiAgfSk7XG5cbiAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChpc09iamVjdChpbml0KSkge1xuICAgICAgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChpbml0KTtcbiAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3JNZXRob2QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKGluaXQpO1xuICAgICAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICAgICAgICBlbnRyeUl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoYW5PYmplY3Qoc3RlcC52YWx1ZSkpO1xuICAgICAgICAgIGVudHJ5TmV4dCA9IGVudHJ5SXRlcmF0b3IubmV4dDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZmlyc3QgPSBlbnRyeU5leHQuY2FsbChlbnRyeUl0ZXJhdG9yKSkuZG9uZSB8fFxuICAgICAgICAgICAgKHNlY29uZCA9IGVudHJ5TmV4dC5jYWxsKGVudHJ5SXRlcmF0b3IpKS5kb25lIHx8XG4gICAgICAgICAgICAhZW50cnlOZXh0LmNhbGwoZW50cnlJdGVyYXRvcikuZG9uZVxuICAgICAgICAgICkgdGhyb3cgVHlwZUVycm9yKCdFeHBlY3RlZCBzZXF1ZW5jZSB3aXRoIGxlbmd0aCAyJyk7XG4gICAgICAgICAgZW50cmllcy5wdXNoKHsga2V5OiBmaXJzdC52YWx1ZSArICcnLCB2YWx1ZTogc2Vjb25kLnZhbHVlICsgJycgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBmb3IgKGtleSBpbiBpbml0KSBpZiAoaGFzT3duKGluaXQsIGtleSkpIGVudHJpZXMucHVzaCh7IGtleToga2V5LCB2YWx1ZTogaW5pdFtrZXldICsgJycgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlU2VhcmNoUGFyYW1zKGVudHJpZXMsIHR5cGVvZiBpbml0ID09PSAnc3RyaW5nJyA/IGluaXQuY2hhckF0KDApID09PSAnPycgPyBpbml0LnNsaWNlKDEpIDogaW5pdCA6IGluaXQgKyAnJyk7XG4gICAgfVxuICB9XG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlID0gVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IucHJvdG90eXBlO1xuXG5yZWRlZmluZUFsbChVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUsIHtcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuYXBwZW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWFwcGVuZFxuICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDIpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgc3RhdGUuZW50cmllcy5wdXNoKHsga2V5OiBuYW1lICsgJycsIHZhbHVlOiB2YWx1ZSArICcnIH0pO1xuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5kZWxldGVgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZGVsZXRlXG4gICdkZWxldGUnOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgdmFyIGVudHJpZXMgPSBzdGF0ZS5lbnRyaWVzO1xuICAgIHZhciBrZXkgPSBuYW1lICsgJyc7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXhdLmtleSA9PT0ga2V5KSBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBlbHNlIGluZGV4Kys7XG4gICAgfVxuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5nZXRgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZ2V0XG4gIGdldDogZnVuY3Rpb24gZ2V0KG5hbWUpIHtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgZW50cmllcyA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcztcbiAgICB2YXIga2V5ID0gbmFtZSArICcnO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICg7IGluZGV4IDwgZW50cmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChlbnRyaWVzW2luZGV4XS5rZXkgPT09IGtleSkgcmV0dXJuIGVudHJpZXNbaW5kZXhdLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZ2V0QWxsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWdldGFsbFxuICBnZXRBbGw6IGZ1bmN0aW9uIGdldEFsbChuYW1lKSB7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFyIGtleSA9IG5hbWUgKyAnJztcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKDsgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXhdLmtleSA9PT0ga2V5KSByZXN1bHQucHVzaChlbnRyaWVzW2luZGV4XS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmhhc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1oYXNcbiAgaGFzOiBmdW5jdGlvbiBoYXMobmFtZSkge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICAgIHZhciBrZXkgPSBuYW1lICsgJyc7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXgrK10ua2V5ID09PSBrZXkpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnNldGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1zZXRcbiAgc2V0OiBmdW5jdGlvbiBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpO1xuICAgIHZhciBlbnRyaWVzID0gc3RhdGUuZW50cmllcztcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICB2YXIga2V5ID0gbmFtZSArICcnO1xuICAgIHZhciB2YWwgPSB2YWx1ZSArICcnO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGVudHJ5O1xuICAgIGZvciAoOyBpbmRleCA8IGVudHJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgICAgaWYgKGVudHJ5LmtleSA9PT0ga2V5KSB7XG4gICAgICAgIGlmIChmb3VuZCkgZW50cmllcy5zcGxpY2UoaW5kZXgtLSwgMSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBlbnRyeS52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSBlbnRyaWVzLnB1c2goeyBrZXk6IGtleSwgdmFsdWU6IHZhbCB9KTtcbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuc29ydGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1zb3J0XG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoKSB7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKTtcbiAgICB2YXIgZW50cmllcyA9IHN0YXRlLmVudHJpZXM7XG4gICAgLy8gQXJyYXkjc29ydCBpcyBub3Qgc3RhYmxlIGluIHNvbWUgZW5naW5lc1xuICAgIHZhciBzbGljZSA9IGVudHJpZXMuc2xpY2UoKTtcbiAgICB2YXIgZW50cnksIGVudHJpZXNJbmRleCwgc2xpY2VJbmRleDtcbiAgICBlbnRyaWVzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChzbGljZUluZGV4ID0gMDsgc2xpY2VJbmRleCA8IHNsaWNlLmxlbmd0aDsgc2xpY2VJbmRleCsrKSB7XG4gICAgICBlbnRyeSA9IHNsaWNlW3NsaWNlSW5kZXhdO1xuICAgICAgZm9yIChlbnRyaWVzSW5kZXggPSAwOyBlbnRyaWVzSW5kZXggPCBzbGljZUluZGV4OyBlbnRyaWVzSW5kZXgrKykge1xuICAgICAgICBpZiAoZW50cmllc1tlbnRyaWVzSW5kZXhdLmtleSA+IGVudHJ5LmtleSkge1xuICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGVudHJpZXNJbmRleCwgMCwgZW50cnkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZW50cmllc0luZGV4ID09PSBzbGljZUluZGV4KSBlbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2sgLyogLCB0aGlzQXJnICovKSB7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMyk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZW50cnk7XG4gICAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIGVudHJ5ID0gZW50cmllc1tpbmRleCsrXTtcbiAgICAgIGJvdW5kRnVuY3Rpb24oZW50cnkudmFsdWUsIGVudHJ5LmtleSwgdGhpcyk7XG4gICAgfVxuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5rZXlzYCBtZXRob2RcbiAga2V5czogZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICdrZXlzJyk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IodGhpcywgJ3ZhbHVlcycpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2RcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICdlbnRyaWVzJyk7XG4gIH1cbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxucmVkZWZpbmUoVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLCBJVEVSQVRPUiwgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLmVudHJpZXMpO1xuXG4vLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHNlYXJjaHBhcmFtcy1zdHJpbmdpZmljYXRpb24tYmVoYXZpb3JcbnJlZGVmaW5lKFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBlbnRyeTtcbiAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXgrK107XG4gICAgcmVzdWx0LnB1c2goc2VyaWFsaXplKGVudHJ5LmtleSkgKyAnPScgKyBzZXJpYWxpemUoZW50cnkudmFsdWUpKTtcbiAgfSByZXR1cm4gcmVzdWx0LmpvaW4oJyYnKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuc2V0VG9TdHJpbmdUYWcoVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IsIFVSTF9TRUFSQ0hfUEFSQU1TKTtcblxuJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiAhVVNFX05BVElWRV9VUkwgfSwge1xuICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yXG59KTtcblxuLy8gV3JhcCBgZmV0Y2hgIGZvciBjb3JyZWN0IHdvcmsgd2l0aCBwb2x5ZmlsbGVkIGBVUkxTZWFyY2hQYXJhbXNgXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc0XG5pZiAoIVVTRV9OQVRJVkVfVVJMICYmIHR5cGVvZiAkZmV0Y2ggPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSGVhZGVycyA9PSAnZnVuY3Rpb24nKSB7XG4gICQoeyBnbG9iYWw6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogdHJ1ZSB9LCB7XG4gICAgZmV0Y2g6IGZ1bmN0aW9uIGZldGNoKGlucHV0IC8qICwgaW5pdCAqLykge1xuICAgICAgdmFyIGFyZ3MgPSBbaW5wdXRdO1xuICAgICAgdmFyIGluaXQsIGJvZHksIGhlYWRlcnM7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaW5pdCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KGluaXQpKSB7XG4gICAgICAgICAgYm9keSA9IGluaXQuYm9keTtcbiAgICAgICAgICBpZiAoY2xhc3NvZihib2R5KSA9PT0gVVJMX1NFQVJDSF9QQVJBTVMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBpbml0LmhlYWRlcnMgPyBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMpIDogbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgICAgIGlmICghaGVhZGVycy5oYXMoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgIGhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXQgPSBjcmVhdGUoaW5pdCwge1xuICAgICAgICAgICAgICBib2R5OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgU3RyaW5nKGJvZHkpKSxcbiAgICAgICAgICAgICAgaGVhZGVyczogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIGhlYWRlcnMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJncy5wdXNoKGluaXQpO1xuICAgICAgfSByZXR1cm4gJGZldGNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yLFxuICBnZXRTdGF0ZTogZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IGluIGNvcmUtanNANCwgbW92ZSAvbW9kdWxlcy8gZGVwZW5kZW5jaWVzIHRvIHB1YmxpYyBlbnRyaWVzIGZvciBiZXR0ZXIgb3B0aW1pemF0aW9uIGJ5IHRvb2xzIGxpa2UgYHByZXNldC1lbnZgXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBVU0VfTkFUSVZFX1VSTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtdXJsJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtYXNzaWduJyk7XG52YXIgYXJyYXlGcm9tID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZyb20nKTtcbnZhciBjb2RlQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNvZGVBdDtcbnZhciB0b0FTQ0lJID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1wdW55Y29kZS10by1hc2NpaScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgVVJMU2VhcmNoUGFyYW1zTW9kdWxlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIudXJsLXNlYXJjaC1wYXJhbXMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBOYXRpdmVVUkwgPSBnbG9iYWwuVVJMO1xudmFyIFVSTFNlYXJjaFBhcmFtcyA9IFVSTFNlYXJjaFBhcmFtc01vZHVsZS5VUkxTZWFyY2hQYXJhbXM7XG52YXIgZ2V0SW50ZXJuYWxTZWFyY2hQYXJhbXNTdGF0ZSA9IFVSTFNlYXJjaFBhcmFtc01vZHVsZS5nZXRTdGF0ZTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxVUkxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKCdVUkwnKTtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgcG93ID0gTWF0aC5wb3c7XG5cbnZhciBJTlZBTElEX0FVVEhPUklUWSA9ICdJbnZhbGlkIGF1dGhvcml0eSc7XG52YXIgSU5WQUxJRF9TQ0hFTUUgPSAnSW52YWxpZCBzY2hlbWUnO1xudmFyIElOVkFMSURfSE9TVCA9ICdJbnZhbGlkIGhvc3QnO1xudmFyIElOVkFMSURfUE9SVCA9ICdJbnZhbGlkIHBvcnQnO1xuXG52YXIgQUxQSEEgPSAvW0EtWmEtel0vO1xudmFyIEFMUEhBTlVNRVJJQyA9IC9bXFxkKy0uQS1aYS16XS87XG52YXIgRElHSVQgPSAvXFxkLztcbnZhciBIRVhfU1RBUlQgPSAvXigweHwwWCkvO1xudmFyIE9DVCA9IC9eWzAtN10rJC87XG52YXIgREVDID0gL15cXGQrJC87XG52YXIgSEVYID0gL15bXFxkQS1GYS1mXSskLztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVCA9IC9bXFx1MDAwMFxcdTAwMDlcXHUwMDBBXFx1MDAwRCAjJS86P0BbXFxcXF1dLztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVF9FWENMVURJTkdfUEVSQ0VOVCA9IC9bXFx1MDAwMFxcdTAwMDlcXHUwMDBBXFx1MDAwRCAjLzo/QFtcXFxcXV0vO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbnZhciBMRUFESU5HX0FORF9UUkFJTElOR19DMF9DT05UUk9MX09SX1NQQUNFID0gL15bXFx1MDAwMC1cXHUwMDFGIF0rfFtcXHUwMDAwLVxcdTAwMUYgXSskL2c7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxudmFyIFRBQl9BTkRfTkVXX0xJTkUgPSAvW1xcdTAwMDlcXHUwMDBBXFx1MDAwRF0vZztcbnZhciBFT0Y7XG5cbnZhciBwYXJzZUhvc3QgPSBmdW5jdGlvbiAodXJsLCBpbnB1dCkge1xuICB2YXIgcmVzdWx0LCBjb2RlUG9pbnRzLCBpbmRleDtcbiAgaWYgKGlucHV0LmNoYXJBdCgwKSA9PSAnWycpIHtcbiAgICBpZiAoaW5wdXQuY2hhckF0KGlucHV0Lmxlbmd0aCAtIDEpICE9ICddJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICByZXN1bHQgPSBwYXJzZUlQdjYoaW5wdXQuc2xpY2UoMSwgLTEpKTtcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICB1cmwuaG9zdCA9IHJlc3VsdDtcbiAgLy8gb3BhcXVlIGhvc3RcbiAgfSBlbHNlIGlmICghaXNTcGVjaWFsKHVybCkpIHtcbiAgICBpZiAoRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVF9FWENMVURJTkdfUEVSQ0VOVC50ZXN0KGlucHV0KSkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICByZXN1bHQgPSAnJztcbiAgICBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKGlucHV0KTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBjb2RlUG9pbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0ICs9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50c1tpbmRleF0sIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgIH1cbiAgICB1cmwuaG9zdCA9IHJlc3VsdDtcbiAgfSBlbHNlIHtcbiAgICBpbnB1dCA9IHRvQVNDSUkoaW5wdXQpO1xuICAgIGlmIChGT1JCSURERU5fSE9TVF9DT0RFX1BPSU5ULnRlc3QoaW5wdXQpKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgIHJlc3VsdCA9IHBhcnNlSVB2NChpbnB1dCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICB1cmwuaG9zdCA9IHJlc3VsdDtcbiAgfVxufTtcblxudmFyIHBhcnNlSVB2NCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgcGFydHMgPSBpbnB1dC5zcGxpdCgnLicpO1xuICB2YXIgcGFydHNMZW5ndGgsIG51bWJlcnMsIGluZGV4LCBwYXJ0LCByYWRpeCwgbnVtYmVyLCBpcHY0O1xuICBpZiAocGFydHMubGVuZ3RoICYmIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdID09ICcnKSB7XG4gICAgcGFydHMucG9wKCk7XG4gIH1cbiAgcGFydHNMZW5ndGggPSBwYXJ0cy5sZW5ndGg7XG4gIGlmIChwYXJ0c0xlbmd0aCA+IDQpIHJldHVybiBpbnB1dDtcbiAgbnVtYmVycyA9IFtdO1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBwYXJ0c0xlbmd0aDsgaW5kZXgrKykge1xuICAgIHBhcnQgPSBwYXJ0c1tpbmRleF07XG4gICAgaWYgKHBhcnQgPT0gJycpIHJldHVybiBpbnB1dDtcbiAgICByYWRpeCA9IDEwO1xuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDEgJiYgcGFydC5jaGFyQXQoMCkgPT0gJzAnKSB7XG4gICAgICByYWRpeCA9IEhFWF9TVEFSVC50ZXN0KHBhcnQpID8gMTYgOiA4O1xuICAgICAgcGFydCA9IHBhcnQuc2xpY2UocmFkaXggPT0gOCA/IDEgOiAyKTtcbiAgICB9XG4gICAgaWYgKHBhcnQgPT09ICcnKSB7XG4gICAgICBudW1iZXIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIShyYWRpeCA9PSAxMCA/IERFQyA6IHJhZGl4ID09IDggPyBPQ1QgOiBIRVgpLnRlc3QocGFydCkpIHJldHVybiBpbnB1dDtcbiAgICAgIG51bWJlciA9IHBhcnNlSW50KHBhcnQsIHJhZGl4KTtcbiAgICB9XG4gICAgbnVtYmVycy5wdXNoKG51bWJlcik7XG4gIH1cbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcGFydHNMZW5ndGg7IGluZGV4KyspIHtcbiAgICBudW1iZXIgPSBudW1iZXJzW2luZGV4XTtcbiAgICBpZiAoaW5kZXggPT0gcGFydHNMZW5ndGggLSAxKSB7XG4gICAgICBpZiAobnVtYmVyID49IHBvdygyNTYsIDUgLSBwYXJ0c0xlbmd0aCkpIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAobnVtYmVyID4gMjU1KSByZXR1cm4gbnVsbDtcbiAgfVxuICBpcHY0ID0gbnVtYmVycy5wb3AoKTtcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbnVtYmVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBpcHY0ICs9IG51bWJlcnNbaW5kZXhdICogcG93KDI1NiwgMyAtIGluZGV4KTtcbiAgfVxuICByZXR1cm4gaXB2NDtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50c1xudmFyIHBhcnNlSVB2NiA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgYWRkcmVzcyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgdmFyIHBpZWNlSW5kZXggPSAwO1xuICB2YXIgY29tcHJlc3MgPSBudWxsO1xuICB2YXIgcG9pbnRlciA9IDA7XG4gIHZhciB2YWx1ZSwgbGVuZ3RoLCBudW1iZXJzU2VlbiwgaXB2NFBpZWNlLCBudW1iZXIsIHN3YXBzLCBzd2FwO1xuXG4gIHZhciBjaGFyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpbnB1dC5jaGFyQXQocG9pbnRlcik7XG4gIH07XG5cbiAgaWYgKGNoYXIoKSA9PSAnOicpIHtcbiAgICBpZiAoaW5wdXQuY2hhckF0KDEpICE9ICc6JykgcmV0dXJuO1xuICAgIHBvaW50ZXIgKz0gMjtcbiAgICBwaWVjZUluZGV4Kys7XG4gICAgY29tcHJlc3MgPSBwaWVjZUluZGV4O1xuICB9XG4gIHdoaWxlIChjaGFyKCkpIHtcbiAgICBpZiAocGllY2VJbmRleCA9PSA4KSByZXR1cm47XG4gICAgaWYgKGNoYXIoKSA9PSAnOicpIHtcbiAgICAgIGlmIChjb21wcmVzcyAhPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgcGllY2VJbmRleCsrO1xuICAgICAgY29tcHJlc3MgPSBwaWVjZUluZGV4O1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhbHVlID0gbGVuZ3RoID0gMDtcbiAgICB3aGlsZSAobGVuZ3RoIDwgNCAmJiBIRVgudGVzdChjaGFyKCkpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlICogMTYgKyBwYXJzZUludChjaGFyKCksIDE2KTtcbiAgICAgIHBvaW50ZXIrKztcbiAgICAgIGxlbmd0aCsrO1xuICAgIH1cbiAgICBpZiAoY2hhcigpID09ICcuJykge1xuICAgICAgaWYgKGxlbmd0aCA9PSAwKSByZXR1cm47XG4gICAgICBwb2ludGVyIC09IGxlbmd0aDtcbiAgICAgIGlmIChwaWVjZUluZGV4ID4gNikgcmV0dXJuO1xuICAgICAgbnVtYmVyc1NlZW4gPSAwO1xuICAgICAgd2hpbGUgKGNoYXIoKSkge1xuICAgICAgICBpcHY0UGllY2UgPSBudWxsO1xuICAgICAgICBpZiAobnVtYmVyc1NlZW4gPiAwKSB7XG4gICAgICAgICAgaWYgKGNoYXIoKSA9PSAnLicgJiYgbnVtYmVyc1NlZW4gPCA0KSBwb2ludGVyKys7XG4gICAgICAgICAgZWxzZSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFESUdJVC50ZXN0KGNoYXIoKSkpIHJldHVybjtcbiAgICAgICAgd2hpbGUgKERJR0lULnRlc3QoY2hhcigpKSkge1xuICAgICAgICAgIG51bWJlciA9IHBhcnNlSW50KGNoYXIoKSwgMTApO1xuICAgICAgICAgIGlmIChpcHY0UGllY2UgPT09IG51bGwpIGlwdjRQaWVjZSA9IG51bWJlcjtcbiAgICAgICAgICBlbHNlIGlmIChpcHY0UGllY2UgPT0gMCkgcmV0dXJuO1xuICAgICAgICAgIGVsc2UgaXB2NFBpZWNlID0gaXB2NFBpZWNlICogMTAgKyBudW1iZXI7XG4gICAgICAgICAgaWYgKGlwdjRQaWVjZSA+IDI1NSkgcmV0dXJuO1xuICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzW3BpZWNlSW5kZXhdID0gYWRkcmVzc1twaWVjZUluZGV4XSAqIDI1NiArIGlwdjRQaWVjZTtcbiAgICAgICAgbnVtYmVyc1NlZW4rKztcbiAgICAgICAgaWYgKG51bWJlcnNTZWVuID09IDIgfHwgbnVtYmVyc1NlZW4gPT0gNCkgcGllY2VJbmRleCsrO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlcnNTZWVuICE9IDQpIHJldHVybjtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoY2hhcigpID09ICc6Jykge1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgaWYgKCFjaGFyKCkpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoYXIoKSkgcmV0dXJuO1xuICAgIGFkZHJlc3NbcGllY2VJbmRleCsrXSA9IHZhbHVlO1xuICB9XG4gIGlmIChjb21wcmVzcyAhPT0gbnVsbCkge1xuICAgIHN3YXBzID0gcGllY2VJbmRleCAtIGNvbXByZXNzO1xuICAgIHBpZWNlSW5kZXggPSA3O1xuICAgIHdoaWxlIChwaWVjZUluZGV4ICE9IDAgJiYgc3dhcHMgPiAwKSB7XG4gICAgICBzd2FwID0gYWRkcmVzc1twaWVjZUluZGV4XTtcbiAgICAgIGFkZHJlc3NbcGllY2VJbmRleC0tXSA9IGFkZHJlc3NbY29tcHJlc3MgKyBzd2FwcyAtIDFdO1xuICAgICAgYWRkcmVzc1tjb21wcmVzcyArIC0tc3dhcHNdID0gc3dhcDtcbiAgICB9XG4gIH0gZWxzZSBpZiAocGllY2VJbmRleCAhPSA4KSByZXR1cm47XG4gIHJldHVybiBhZGRyZXNzO1xufTtcblxudmFyIGZpbmRMb25nZXN0WmVyb1NlcXVlbmNlID0gZnVuY3Rpb24gKGlwdjYpIHtcbiAgdmFyIG1heEluZGV4ID0gbnVsbDtcbiAgdmFyIG1heExlbmd0aCA9IDE7XG4gIHZhciBjdXJyU3RhcnQgPSBudWxsO1xuICB2YXIgY3Vyckxlbmd0aCA9IDA7XG4gIHZhciBpbmRleCA9IDA7XG4gIGZvciAoOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICBpZiAoaXB2NltpbmRleF0gIT09IDApIHtcbiAgICAgIGlmIChjdXJyTGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICAgIG1heEluZGV4ID0gY3VyclN0YXJ0O1xuICAgICAgICBtYXhMZW5ndGggPSBjdXJyTGVuZ3RoO1xuICAgICAgfVxuICAgICAgY3VyclN0YXJ0ID0gbnVsbDtcbiAgICAgIGN1cnJMZW5ndGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VyclN0YXJ0ID09PSBudWxsKSBjdXJyU3RhcnQgPSBpbmRleDtcbiAgICAgICsrY3Vyckxlbmd0aDtcbiAgICB9XG4gIH1cbiAgaWYgKGN1cnJMZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICBtYXhJbmRleCA9IGN1cnJTdGFydDtcbiAgICBtYXhMZW5ndGggPSBjdXJyTGVuZ3RoO1xuICB9XG4gIHJldHVybiBtYXhJbmRleDtcbn07XG5cbnZhciBzZXJpYWxpemVIb3N0ID0gZnVuY3Rpb24gKGhvc3QpIHtcbiAgdmFyIHJlc3VsdCwgaW5kZXgsIGNvbXByZXNzLCBpZ25vcmUwO1xuICAvLyBpcHY0XG4gIGlmICh0eXBlb2YgaG9zdCA9PSAnbnVtYmVyJykge1xuICAgIHJlc3VsdCA9IFtdO1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IDQ7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KGhvc3QgJSAyNTYpO1xuICAgICAgaG9zdCA9IGZsb29yKGhvc3QgLyAyNTYpO1xuICAgIH0gcmV0dXJuIHJlc3VsdC5qb2luKCcuJyk7XG4gIC8vIGlwdjZcbiAgfSBlbHNlIGlmICh0eXBlb2YgaG9zdCA9PSAnb2JqZWN0Jykge1xuICAgIHJlc3VsdCA9ICcnO1xuICAgIGNvbXByZXNzID0gZmluZExvbmdlc3RaZXJvU2VxdWVuY2UoaG9zdCk7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgODsgaW5kZXgrKykge1xuICAgICAgaWYgKGlnbm9yZTAgJiYgaG9zdFtpbmRleF0gPT09IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKGlnbm9yZTApIGlnbm9yZTAgPSBmYWxzZTtcbiAgICAgIGlmIChjb21wcmVzcyA9PT0gaW5kZXgpIHtcbiAgICAgICAgcmVzdWx0ICs9IGluZGV4ID8gJzonIDogJzo6JztcbiAgICAgICAgaWdub3JlMCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gaG9zdFtpbmRleF0udG9TdHJpbmcoMTYpO1xuICAgICAgICBpZiAoaW5kZXggPCA3KSByZXN1bHQgKz0gJzonO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJ1snICsgcmVzdWx0ICsgJ10nO1xuICB9IHJldHVybiBob3N0O1xufTtcblxudmFyIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQgPSB7fTtcbnZhciBmcmFnbWVudFBlcmNlbnRFbmNvZGVTZXQgPSBhc3NpZ24oe30sIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQsIHtcbiAgJyAnOiAxLCAnXCInOiAxLCAnPCc6IDEsICc+JzogMSwgJ2AnOiAxXG59KTtcbnZhciBwYXRoUGVyY2VudEVuY29kZVNldCA9IGFzc2lnbih7fSwgZnJhZ21lbnRQZXJjZW50RW5jb2RlU2V0LCB7XG4gICcjJzogMSwgJz8nOiAxLCAneyc6IDEsICd9JzogMVxufSk7XG52YXIgdXNlcmluZm9QZXJjZW50RW5jb2RlU2V0ID0gYXNzaWduKHt9LCBwYXRoUGVyY2VudEVuY29kZVNldCwge1xuICAnLyc6IDEsICc6JzogMSwgJzsnOiAxLCAnPSc6IDEsICdAJzogMSwgJ1snOiAxLCAnXFxcXCc6IDEsICddJzogMSwgJ14nOiAxLCAnfCc6IDFcbn0pO1xuXG52YXIgcGVyY2VudEVuY29kZSA9IGZ1bmN0aW9uIChjaGFyLCBzZXQpIHtcbiAgdmFyIGNvZGUgPSBjb2RlQXQoY2hhciwgMCk7XG4gIHJldHVybiBjb2RlID4gMHgyMCAmJiBjb2RlIDwgMHg3RiAmJiAhaGFzKHNldCwgY2hhcikgPyBjaGFyIDogZW5jb2RlVVJJQ29tcG9uZW50KGNoYXIpO1xufTtcblxudmFyIHNwZWNpYWxTY2hlbWVzID0ge1xuICBmdHA6IDIxLFxuICBmaWxlOiBudWxsLFxuICBodHRwOiA4MCxcbiAgaHR0cHM6IDQ0MyxcbiAgd3M6IDgwLFxuICB3c3M6IDQ0M1xufTtcblxudmFyIGlzU3BlY2lhbCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgcmV0dXJuIGhhcyhzcGVjaWFsU2NoZW1lcywgdXJsLnNjaGVtZSk7XG59O1xuXG52YXIgaW5jbHVkZXNDcmVkZW50aWFscyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgcmV0dXJuIHVybC51c2VybmFtZSAhPSAnJyB8fCB1cmwucGFzc3dvcmQgIT0gJyc7XG59O1xuXG52YXIgY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0ID0gZnVuY3Rpb24gKHVybCkge1xuICByZXR1cm4gIXVybC5ob3N0IHx8IHVybC5jYW5ub3RCZUFCYXNlVVJMIHx8IHVybC5zY2hlbWUgPT0gJ2ZpbGUnO1xufTtcblxudmFyIGlzV2luZG93c0RyaXZlTGV0dGVyID0gZnVuY3Rpb24gKHN0cmluZywgbm9ybWFsaXplZCkge1xuICB2YXIgc2Vjb25kO1xuICByZXR1cm4gc3RyaW5nLmxlbmd0aCA9PSAyICYmIEFMUEhBLnRlc3Qoc3RyaW5nLmNoYXJBdCgwKSlcbiAgICAmJiAoKHNlY29uZCA9IHN0cmluZy5jaGFyQXQoMSkpID09ICc6JyB8fCAoIW5vcm1hbGl6ZWQgJiYgc2Vjb25kID09ICd8JykpO1xufTtcblxudmFyIHN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciB0aGlyZDtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPiAxICYmIGlzV2luZG93c0RyaXZlTGV0dGVyKHN0cmluZy5zbGljZSgwLCAyKSkgJiYgKFxuICAgIHN0cmluZy5sZW5ndGggPT0gMiB8fFxuICAgICgodGhpcmQgPSBzdHJpbmcuY2hhckF0KDIpKSA9PT0gJy8nIHx8IHRoaXJkID09PSAnXFxcXCcgfHwgdGhpcmQgPT09ICc/JyB8fCB0aGlyZCA9PT0gJyMnKVxuICApO1xufTtcblxudmFyIHNob3J0ZW5VUkxzUGF0aCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgdmFyIHBhdGggPSB1cmwucGF0aDtcbiAgdmFyIHBhdGhTaXplID0gcGF0aC5sZW5ndGg7XG4gIGlmIChwYXRoU2l6ZSAmJiAodXJsLnNjaGVtZSAhPSAnZmlsZScgfHwgcGF0aFNpemUgIT0gMSB8fCAhaXNXaW5kb3dzRHJpdmVMZXR0ZXIocGF0aFswXSwgdHJ1ZSkpKSB7XG4gICAgcGF0aC5wb3AoKTtcbiAgfVxufTtcblxudmFyIGlzU2luZ2xlRG90ID0gZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgcmV0dXJuIHNlZ21lbnQgPT09ICcuJyB8fCBzZWdtZW50LnRvTG93ZXJDYXNlKCkgPT09ICclMmUnO1xufTtcblxudmFyIGlzRG91YmxlRG90ID0gZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgc2VnbWVudCA9IHNlZ21lbnQudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHNlZ21lbnQgPT09ICcuLicgfHwgc2VnbWVudCA9PT0gJyUyZS4nIHx8IHNlZ21lbnQgPT09ICcuJTJlJyB8fCBzZWdtZW50ID09PSAnJTJlJTJlJztcbn07XG5cbi8vIFN0YXRlczpcbnZhciBTQ0hFTUVfU1RBUlQgPSB7fTtcbnZhciBTQ0hFTUUgPSB7fTtcbnZhciBOT19TQ0hFTUUgPSB7fTtcbnZhciBTUEVDSUFMX1JFTEFUSVZFX09SX0FVVEhPUklUWSA9IHt9O1xudmFyIFBBVEhfT1JfQVVUSE9SSVRZID0ge307XG52YXIgUkVMQVRJVkUgPSB7fTtcbnZhciBSRUxBVElWRV9TTEFTSCA9IHt9O1xudmFyIFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVMgPSB7fTtcbnZhciBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUyA9IHt9O1xudmFyIEFVVEhPUklUWSA9IHt9O1xudmFyIEhPU1QgPSB7fTtcbnZhciBIT1NUTkFNRSA9IHt9O1xudmFyIFBPUlQgPSB7fTtcbnZhciBGSUxFID0ge307XG52YXIgRklMRV9TTEFTSCA9IHt9O1xudmFyIEZJTEVfSE9TVCA9IHt9O1xudmFyIFBBVEhfU1RBUlQgPSB7fTtcbnZhciBQQVRIID0ge307XG52YXIgQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSCA9IHt9O1xudmFyIFFVRVJZID0ge307XG52YXIgRlJBR01FTlQgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1zdGF0ZW1lbnRzXG52YXIgcGFyc2VVUkwgPSBmdW5jdGlvbiAodXJsLCBpbnB1dCwgc3RhdGVPdmVycmlkZSwgYmFzZSkge1xuICB2YXIgc3RhdGUgPSBzdGF0ZU92ZXJyaWRlIHx8IFNDSEVNRV9TVEFSVDtcbiAgdmFyIHBvaW50ZXIgPSAwO1xuICB2YXIgYnVmZmVyID0gJyc7XG4gIHZhciBzZWVuQXQgPSBmYWxzZTtcbiAgdmFyIHNlZW5CcmFja2V0ID0gZmFsc2U7XG4gIHZhciBzZWVuUGFzc3dvcmRUb2tlbiA9IGZhbHNlO1xuICB2YXIgY29kZVBvaW50cywgY2hhciwgYnVmZmVyQ29kZVBvaW50cywgZmFpbHVyZTtcblxuICBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICB1cmwuc2NoZW1lID0gJyc7XG4gICAgdXJsLnVzZXJuYW1lID0gJyc7XG4gICAgdXJsLnBhc3N3b3JkID0gJyc7XG4gICAgdXJsLmhvc3QgPSBudWxsO1xuICAgIHVybC5wb3J0ID0gbnVsbDtcbiAgICB1cmwucGF0aCA9IFtdO1xuICAgIHVybC5xdWVyeSA9IG51bGw7XG4gICAgdXJsLmZyYWdtZW50ID0gbnVsbDtcbiAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IGZhbHNlO1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShMRUFESU5HX0FORF9UUkFJTElOR19DMF9DT05UUk9MX09SX1NQQUNFLCAnJyk7XG4gIH1cblxuICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoVEFCX0FORF9ORVdfTElORSwgJycpO1xuXG4gIGNvZGVQb2ludHMgPSBhcnJheUZyb20oaW5wdXQpO1xuXG4gIHdoaWxlIChwb2ludGVyIDw9IGNvZGVQb2ludHMubGVuZ3RoKSB7XG4gICAgY2hhciA9IGNvZGVQb2ludHNbcG9pbnRlcl07XG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBTQ0hFTUVfU1RBUlQ6XG4gICAgICAgIGlmIChjaGFyICYmIEFMUEhBLnRlc3QoY2hhcikpIHtcbiAgICAgICAgICBidWZmZXIgKz0gY2hhci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHN0YXRlID0gU0NIRU1FO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgc3RhdGUgPSBOT19TQ0hFTUU7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gSU5WQUxJRF9TQ0hFTUU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNDSEVNRTpcbiAgICAgICAgaWYgKGNoYXIgJiYgKEFMUEhBTlVNRVJJQy50ZXN0KGNoYXIpIHx8IGNoYXIgPT0gJysnIHx8IGNoYXIgPT0gJy0nIHx8IGNoYXIgPT0gJy4nKSkge1xuICAgICAgICAgIGJ1ZmZlciArPSBjaGFyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnOicpIHtcbiAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiAoXG4gICAgICAgICAgICAoaXNTcGVjaWFsKHVybCkgIT0gaGFzKHNwZWNpYWxTY2hlbWVzLCBidWZmZXIpKSB8fFxuICAgICAgICAgICAgKGJ1ZmZlciA9PSAnZmlsZScgJiYgKGluY2x1ZGVzQ3JlZGVudGlhbHModXJsKSB8fCB1cmwucG9ydCAhPT0gbnVsbCkpIHx8XG4gICAgICAgICAgICAodXJsLnNjaGVtZSA9PSAnZmlsZScgJiYgIXVybC5ob3N0KVxuICAgICAgICAgICkpIHJldHVybjtcbiAgICAgICAgICB1cmwuc2NoZW1lID0gYnVmZmVyO1xuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgICBpZiAoaXNTcGVjaWFsKHVybCkgJiYgc3BlY2lhbFNjaGVtZXNbdXJsLnNjaGVtZV0gPT0gdXJsLnBvcnQpIHVybC5wb3J0ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEZJTEU7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1NwZWNpYWwodXJsKSAmJiBiYXNlICYmIGJhc2Uuc2NoZW1lID09IHVybC5zY2hlbWUpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9SRUxBVElWRV9PUl9BVVRIT1JJVFk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1NwZWNpYWwodXJsKSkge1xuICAgICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9TTEFTSEVTO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29kZVBvaW50c1twb2ludGVyICsgMV0gPT0gJy8nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEhfT1JfQVVUSE9SSVRZO1xuICAgICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IHRydWU7XG4gICAgICAgICAgICB1cmwucGF0aC5wdXNoKCcnKTtcbiAgICAgICAgICAgIHN0YXRlID0gQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICBzdGF0ZSA9IE5PX1NDSEVNRTtcbiAgICAgICAgICBwb2ludGVyID0gMDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTk9fU0NIRU1FOlxuICAgICAgICBpZiAoIWJhc2UgfHwgKGJhc2UuY2Fubm90QmVBQmFzZVVSTCAmJiBjaGFyICE9ICcjJykpIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgaWYgKGJhc2UuY2Fubm90QmVBQmFzZVVSTCAmJiBjaGFyID09ICcjJykge1xuICAgICAgICAgIHVybC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICAgICAgICB1cmwucGF0aCA9IGJhc2UucGF0aC5zbGljZSgpO1xuICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgdXJsLmNhbm5vdEJlQUJhc2VVUkwgPSB0cnVlO1xuICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBiYXNlLnNjaGVtZSA9PSAnZmlsZScgPyBGSUxFIDogUkVMQVRJVkU7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBjYXNlIFNQRUNJQUxfUkVMQVRJVkVfT1JfQVVUSE9SSVRZOlxuICAgICAgICBpZiAoY2hhciA9PSAnLycgJiYgY29kZVBvaW50c1twb2ludGVyICsgMV0gPT0gJy8nKSB7XG4gICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUztcbiAgICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUgPSBSRUxBVElWRTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBQQVRIX09SX0FVVEhPUklUWTpcbiAgICAgICAgaWYgKGNoYXIgPT0gJy8nKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVVRIT1JJVFk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVMQVRJVkU6XG4gICAgICAgIHVybC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICAgICAgaWYgKGNoYXIgPT0gRU9GKSB7XG4gICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09ICcvJyB8fCAoY2hhciA9PSAnXFxcXCcgJiYgaXNTcGVjaWFsKHVybCkpKSB7XG4gICAgICAgICAgc3RhdGUgPSBSRUxBVElWRV9TTEFTSDtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09ICc/Jykge1xuICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICB1cmwucGF0aCA9IGJhc2UucGF0aC5zbGljZSgpO1xuICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnIycpIHtcbiAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgdXJsLnBhdGggPSBiYXNlLnBhdGguc2xpY2UoKTtcbiAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgdXJsLnBhdGgucG9wKCk7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIFJFTEFUSVZFX1NMQVNIOlxuICAgICAgICBpZiAoaXNTcGVjaWFsKHVybCkgJiYgKGNoYXIgPT0gJy8nIHx8IGNoYXIgPT0gJ1xcXFwnKSkge1xuICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnLycpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVM6XG4gICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgIGlmIChjaGFyICE9ICcvJyB8fCBidWZmZXIuY2hhckF0KHBvaW50ZXIgKyAxKSAhPSAnLycpIGNvbnRpbnVlO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTOlxuICAgICAgICBpZiAoY2hhciAhPSAnLycgJiYgY2hhciAhPSAnXFxcXCcpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBBVVRIT1JJVFk6XG4gICAgICAgIGlmIChjaGFyID09ICdAJykge1xuICAgICAgICAgIGlmIChzZWVuQXQpIGJ1ZmZlciA9ICclNDAnICsgYnVmZmVyO1xuICAgICAgICAgIHNlZW5BdCA9IHRydWU7XG4gICAgICAgICAgYnVmZmVyQ29kZVBvaW50cyA9IGFycmF5RnJvbShidWZmZXIpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyQ29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9IGJ1ZmZlckNvZGVQb2ludHNbaV07XG4gICAgICAgICAgICBpZiAoY29kZVBvaW50ID09ICc6JyAmJiAhc2VlblBhc3N3b3JkVG9rZW4pIHtcbiAgICAgICAgICAgICAgc2VlblBhc3N3b3JkVG9rZW4gPSB0cnVlO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlbmNvZGVkQ29kZVBvaW50cyA9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50LCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgICAgaWYgKHNlZW5QYXNzd29yZFRva2VuKSB1cmwucGFzc3dvcmQgKz0gZW5jb2RlZENvZGVQb2ludHM7XG4gICAgICAgICAgICBlbHNlIHVybC51c2VybmFtZSArPSBlbmNvZGVkQ29kZVBvaW50cztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgY2hhciA9PSBFT0YgfHwgY2hhciA9PSAnLycgfHwgY2hhciA9PSAnPycgfHwgY2hhciA9PSAnIycgfHxcbiAgICAgICAgICAoY2hhciA9PSAnXFxcXCcgJiYgaXNTcGVjaWFsKHVybCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChzZWVuQXQgJiYgYnVmZmVyID09ICcnKSByZXR1cm4gSU5WQUxJRF9BVVRIT1JJVFk7XG4gICAgICAgICAgcG9pbnRlciAtPSBhcnJheUZyb20oYnVmZmVyKS5sZW5ndGggKyAxO1xuICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gSE9TVDtcbiAgICAgICAgfSBlbHNlIGJ1ZmZlciArPSBjaGFyO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBIT1NUOlxuICAgICAgY2FzZSBIT1NUTkFNRTpcbiAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgJiYgdXJsLnNjaGVtZSA9PSAnZmlsZScpIHtcbiAgICAgICAgICBzdGF0ZSA9IEZJTEVfSE9TVDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09ICc6JyAmJiAhc2VlbkJyYWNrZXQpIHtcbiAgICAgICAgICBpZiAoYnVmZmVyID09ICcnKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgICAgIGZhaWx1cmUgPSBwYXJzZUhvc3QodXJsLCBidWZmZXIpO1xuICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICBzdGF0ZSA9IFBPUlQ7XG4gICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgPT0gSE9TVE5BTUUpIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBjaGFyID09IEVPRiB8fCBjaGFyID09ICcvJyB8fCBjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJyB8fFxuICAgICAgICAgIChjaGFyID09ICdcXFxcJyAmJiBpc1NwZWNpYWwodXJsKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKGlzU3BlY2lhbCh1cmwpICYmIGJ1ZmZlciA9PSAnJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiBidWZmZXIgPT0gJycgJiYgKGluY2x1ZGVzQ3JlZGVudGlhbHModXJsKSB8fCB1cmwucG9ydCAhPT0gbnVsbCkpIHJldHVybjtcbiAgICAgICAgICBmYWlsdXJlID0gcGFyc2VIb3N0KHVybCwgYnVmZmVyKTtcbiAgICAgICAgICBpZiAoZmFpbHVyZSkgcmV0dXJuIGZhaWx1cmU7XG4gICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNoYXIgPT0gJ1snKSBzZWVuQnJhY2tldCA9IHRydWU7XG4gICAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAnXScpIHNlZW5CcmFja2V0ID0gZmFsc2U7XG4gICAgICAgICAgYnVmZmVyICs9IGNoYXI7XG4gICAgICAgIH0gYnJlYWs7XG5cbiAgICAgIGNhc2UgUE9SVDpcbiAgICAgICAgaWYgKERJR0lULnRlc3QoY2hhcikpIHtcbiAgICAgICAgICBidWZmZXIgKz0gY2hhcjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBjaGFyID09IEVPRiB8fCBjaGFyID09ICcvJyB8fCBjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJyB8fFxuICAgICAgICAgIChjaGFyID09ICdcXFxcJyAmJiBpc1NwZWNpYWwodXJsKSkgfHxcbiAgICAgICAgICBzdGF0ZU92ZXJyaWRlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChidWZmZXIgIT0gJycpIHtcbiAgICAgICAgICAgIHZhciBwb3J0ID0gcGFyc2VJbnQoYnVmZmVyLCAxMCk7XG4gICAgICAgICAgICBpZiAocG9ydCA+IDB4RkZGRikgcmV0dXJuIElOVkFMSURfUE9SVDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gKGlzU3BlY2lhbCh1cmwpICYmIHBvcnQgPT09IHNwZWNpYWxTY2hlbWVzW3VybC5zY2hlbWVdKSA/IG51bGwgOiBwb3J0O1xuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIElOVkFMSURfUE9SVDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRklMRTpcbiAgICAgICAgdXJsLnNjaGVtZSA9ICdmaWxlJztcbiAgICAgICAgaWYgKGNoYXIgPT0gJy8nIHx8IGNoYXIgPT0gJ1xcXFwnKSBzdGF0ZSA9IEZJTEVfU0xBU0g7XG4gICAgICAgIGVsc2UgaWYgKGJhc2UgJiYgYmFzZS5zY2hlbWUgPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgaWYgKGNoYXIgPT0gRU9GKSB7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnPycpIHtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBhdGggPSBiYXNlLnBhdGguc2xpY2UoKTtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYXIgPT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIoY29kZVBvaW50cy5zbGljZShwb2ludGVyKS5qb2luKCcnKSkpIHtcbiAgICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICAgIHNob3J0ZW5VUkxzUGF0aCh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBGSUxFX1NMQVNIOlxuICAgICAgICBpZiAoY2hhciA9PSAnLycgfHwgY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgICBzdGF0ZSA9IEZJTEVfSE9TVDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmFzZSAmJiBiYXNlLnNjaGVtZSA9PSAnZmlsZScgJiYgIXN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIoY29kZVBvaW50cy5zbGljZShwb2ludGVyKS5qb2luKCcnKSkpIHtcbiAgICAgICAgICBpZiAoaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYmFzZS5wYXRoWzBdLCB0cnVlKSkgdXJsLnBhdGgucHVzaChiYXNlLnBhdGhbMF0pO1xuICAgICAgICAgIGVsc2UgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgY2FzZSBGSUxFX0hPU1Q6XG4gICAgICAgIGlmIChjaGFyID09IEVPRiB8fCBjaGFyID09ICcvJyB8fCBjaGFyID09ICdcXFxcJyB8fCBjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJykge1xuICAgICAgICAgIGlmICghc3RhdGVPdmVycmlkZSAmJiBpc1dpbmRvd3NEcml2ZUxldHRlcihidWZmZXIpKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgfSBlbHNlIGlmIChidWZmZXIgPT0gJycpIHtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmYWlsdXJlID0gcGFyc2VIb3N0KHVybCwgYnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICAgIGlmICh1cmwuaG9zdCA9PSAnbG9jYWxob3N0JykgdXJsLmhvc3QgPSAnJztcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSF9TVEFSVDtcbiAgICAgICAgICB9IGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgYnVmZmVyICs9IGNoYXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBBVEhfU1RBUlQ6XG4gICAgICAgIGlmIChpc1NwZWNpYWwodXJsKSkge1xuICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICBpZiAoY2hhciAhPSAnLycgJiYgY2hhciAhPSAnXFxcXCcpIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNoYXIgPT0gJz8nKSB7XG4gICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgfSBlbHNlIGlmICghc3RhdGVPdmVycmlkZSAmJiBjaGFyID09ICcjJykge1xuICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciAhPSBFT0YpIHtcbiAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgaWYgKGNoYXIgIT0gJy8nKSBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBQQVRIOlxuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhciA9PSBFT0YgfHwgY2hhciA9PSAnLycgfHxcbiAgICAgICAgICAoY2hhciA9PSAnXFxcXCcgJiYgaXNTcGVjaWFsKHVybCkpIHx8XG4gICAgICAgICAgKCFzdGF0ZU92ZXJyaWRlICYmIChjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJykpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChpc0RvdWJsZURvdChidWZmZXIpKSB7XG4gICAgICAgICAgICBzaG9ydGVuVVJMc1BhdGgodXJsKTtcbiAgICAgICAgICAgIGlmIChjaGFyICE9ICcvJyAmJiAhKGNoYXIgPT0gJ1xcXFwnICYmIGlzU3BlY2lhbCh1cmwpKSkge1xuICAgICAgICAgICAgICB1cmwucGF0aC5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGlzU2luZ2xlRG90KGJ1ZmZlcikpIHtcbiAgICAgICAgICAgIGlmIChjaGFyICE9ICcvJyAmJiAhKGNoYXIgPT0gJ1xcXFwnICYmIGlzU3BlY2lhbCh1cmwpKSkge1xuICAgICAgICAgICAgICB1cmwucGF0aC5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT0gJ2ZpbGUnICYmICF1cmwucGF0aC5sZW5ndGggJiYgaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYnVmZmVyKSkge1xuICAgICAgICAgICAgICBpZiAodXJsLmhvc3QpIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jaGFyQXQoMCkgKyAnOic7IC8vIG5vcm1hbGl6ZSB3aW5kb3dzIGRyaXZlIGxldHRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXJsLnBhdGgucHVzaChidWZmZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICBpZiAodXJsLnNjaGVtZSA9PSAnZmlsZScgJiYgKGNoYXIgPT0gRU9GIHx8IGNoYXIgPT0gJz8nIHx8IGNoYXIgPT0gJyMnKSkge1xuICAgICAgICAgICAgd2hpbGUgKHVybC5wYXRoLmxlbmd0aCA+IDEgJiYgdXJsLnBhdGhbMF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgIHVybC5wYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaGFyID09ICc/Jykge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnIycpIHtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyICs9IHBlcmNlbnRFbmNvZGUoY2hhciwgcGF0aFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIENBTk5PVF9CRV9BX0JBU0VfVVJMX1BBVEg6XG4gICAgICAgIGlmIChjaGFyID09ICc/Jykge1xuICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnIycpIHtcbiAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXIgIT0gRU9GKSB7XG4gICAgICAgICAgdXJsLnBhdGhbMF0gKz0gcGVyY2VudEVuY29kZShjaGFyLCBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBRVUVSWTpcbiAgICAgICAgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNoYXIgPT0gJyMnKSB7XG4gICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyICE9IEVPRikge1xuICAgICAgICAgIGlmIChjaGFyID09IFwiJ1wiICYmIGlzU3BlY2lhbCh1cmwpKSB1cmwucXVlcnkgKz0gJyUyNyc7XG4gICAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAnIycpIHVybC5xdWVyeSArPSAnJTIzJztcbiAgICAgICAgICBlbHNlIHVybC5xdWVyeSArPSBwZXJjZW50RW5jb2RlKGNoYXIsIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIEZSQUdNRU5UOlxuICAgICAgICBpZiAoY2hhciAhPSBFT0YpIHVybC5mcmFnbWVudCArPSBwZXJjZW50RW5jb2RlKGNoYXIsIGZyYWdtZW50UGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHBvaW50ZXIrKztcbiAgfVxufTtcblxuLy8gYFVSTGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsLWNsYXNzXG52YXIgVVJMQ29uc3RydWN0b3IgPSBmdW5jdGlvbiBVUkwodXJsIC8qICwgYmFzZSAqLykge1xuICB2YXIgdGhhdCA9IGFuSW5zdGFuY2UodGhpcywgVVJMQ29uc3RydWN0b3IsICdVUkwnKTtcbiAgdmFyIGJhc2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIHVybFN0cmluZyA9IFN0cmluZyh1cmwpO1xuICB2YXIgc3RhdGUgPSBzZXRJbnRlcm5hbFN0YXRlKHRoYXQsIHsgdHlwZTogJ1VSTCcgfSk7XG4gIHZhciBiYXNlU3RhdGUsIGZhaWx1cmU7XG4gIGlmIChiYXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYmFzZSBpbnN0YW5jZW9mIFVSTENvbnN0cnVjdG9yKSBiYXNlU3RhdGUgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKGJhc2UpO1xuICAgIGVsc2Uge1xuICAgICAgZmFpbHVyZSA9IHBhcnNlVVJMKGJhc2VTdGF0ZSA9IHt9LCBTdHJpbmcoYmFzZSkpO1xuICAgICAgaWYgKGZhaWx1cmUpIHRocm93IFR5cGVFcnJvcihmYWlsdXJlKTtcbiAgICB9XG4gIH1cbiAgZmFpbHVyZSA9IHBhcnNlVVJMKHN0YXRlLCB1cmxTdHJpbmcsIG51bGwsIGJhc2VTdGF0ZSk7XG4gIGlmIChmYWlsdXJlKSB0aHJvdyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gIHZhciBzZWFyY2hQYXJhbXMgPSBzdGF0ZS5zZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gIHZhciBzZWFyY2hQYXJhbXNTdGF0ZSA9IGdldEludGVybmFsU2VhcmNoUGFyYW1zU3RhdGUoc2VhcmNoUGFyYW1zKTtcbiAgc2VhcmNoUGFyYW1zU3RhdGUudXBkYXRlU2VhcmNoUGFyYW1zKHN0YXRlLnF1ZXJ5KTtcbiAgc2VhcmNoUGFyYW1zU3RhdGUudXBkYXRlVVJMID0gZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnF1ZXJ5ID0gU3RyaW5nKHNlYXJjaFBhcmFtcykgfHwgbnVsbDtcbiAgfTtcbiAgaWYgKCFERVNDUklQVE9SUykge1xuICAgIHRoYXQuaHJlZiA9IHNlcmlhbGl6ZVVSTC5jYWxsKHRoYXQpO1xuICAgIHRoYXQub3JpZ2luID0gZ2V0T3JpZ2luLmNhbGwodGhhdCk7XG4gICAgdGhhdC5wcm90b2NvbCA9IGdldFByb3RvY29sLmNhbGwodGhhdCk7XG4gICAgdGhhdC51c2VybmFtZSA9IGdldFVzZXJuYW1lLmNhbGwodGhhdCk7XG4gICAgdGhhdC5wYXNzd29yZCA9IGdldFBhc3N3b3JkLmNhbGwodGhhdCk7XG4gICAgdGhhdC5ob3N0ID0gZ2V0SG9zdC5jYWxsKHRoYXQpO1xuICAgIHRoYXQuaG9zdG5hbWUgPSBnZXRIb3N0bmFtZS5jYWxsKHRoYXQpO1xuICAgIHRoYXQucG9ydCA9IGdldFBvcnQuY2FsbCh0aGF0KTtcbiAgICB0aGF0LnBhdGhuYW1lID0gZ2V0UGF0aG5hbWUuY2FsbCh0aGF0KTtcbiAgICB0aGF0LnNlYXJjaCA9IGdldFNlYXJjaC5jYWxsKHRoYXQpO1xuICAgIHRoYXQuc2VhcmNoUGFyYW1zID0gZ2V0U2VhcmNoUGFyYW1zLmNhbGwodGhhdCk7XG4gICAgdGhhdC5oYXNoID0gZ2V0SGFzaC5jYWxsKHRoYXQpO1xuICB9XG59O1xuXG52YXIgVVJMUHJvdG90eXBlID0gVVJMQ29uc3RydWN0b3IucHJvdG90eXBlO1xuXG52YXIgc2VyaWFsaXplVVJMID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgdmFyIHNjaGVtZSA9IHVybC5zY2hlbWU7XG4gIHZhciB1c2VybmFtZSA9IHVybC51c2VybmFtZTtcbiAgdmFyIHBhc3N3b3JkID0gdXJsLnBhc3N3b3JkO1xuICB2YXIgaG9zdCA9IHVybC5ob3N0O1xuICB2YXIgcG9ydCA9IHVybC5wb3J0O1xuICB2YXIgcGF0aCA9IHVybC5wYXRoO1xuICB2YXIgcXVlcnkgPSB1cmwucXVlcnk7XG4gIHZhciBmcmFnbWVudCA9IHVybC5mcmFnbWVudDtcbiAgdmFyIG91dHB1dCA9IHNjaGVtZSArICc6JztcbiAgaWYgKGhvc3QgIT09IG51bGwpIHtcbiAgICBvdXRwdXQgKz0gJy8vJztcbiAgICBpZiAoaW5jbHVkZXNDcmVkZW50aWFscyh1cmwpKSB7XG4gICAgICBvdXRwdXQgKz0gdXNlcm5hbWUgKyAocGFzc3dvcmQgPyAnOicgKyBwYXNzd29yZCA6ICcnKSArICdAJztcbiAgICB9XG4gICAgb3V0cHV0ICs9IHNlcmlhbGl6ZUhvc3QoaG9zdCk7XG4gICAgaWYgKHBvcnQgIT09IG51bGwpIG91dHB1dCArPSAnOicgKyBwb3J0O1xuICB9IGVsc2UgaWYgKHNjaGVtZSA9PSAnZmlsZScpIG91dHB1dCArPSAnLy8nO1xuICBvdXRwdXQgKz0gdXJsLmNhbm5vdEJlQUJhc2VVUkwgPyBwYXRoWzBdIDogcGF0aC5sZW5ndGggPyAnLycgKyBwYXRoLmpvaW4oJy8nKSA6ICcnO1xuICBpZiAocXVlcnkgIT09IG51bGwpIG91dHB1dCArPSAnPycgKyBxdWVyeTtcbiAgaWYgKGZyYWdtZW50ICE9PSBudWxsKSBvdXRwdXQgKz0gJyMnICsgZnJhZ21lbnQ7XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG52YXIgZ2V0T3JpZ2luID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgdmFyIHNjaGVtZSA9IHVybC5zY2hlbWU7XG4gIHZhciBwb3J0ID0gdXJsLnBvcnQ7XG4gIGlmIChzY2hlbWUgPT0gJ2Jsb2InKSB0cnkge1xuICAgIHJldHVybiBuZXcgVVJMKHNjaGVtZS5wYXRoWzBdKS5vcmlnaW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuICBpZiAoc2NoZW1lID09ICdmaWxlJyB8fCAhaXNTcGVjaWFsKHVybCkpIHJldHVybiAnbnVsbCc7XG4gIHJldHVybiBzY2hlbWUgKyAnOi8vJyArIHNlcmlhbGl6ZUhvc3QodXJsLmhvc3QpICsgKHBvcnQgIT09IG51bGwgPyAnOicgKyBwb3J0IDogJycpO1xufTtcblxudmFyIGdldFByb3RvY29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5zY2hlbWUgKyAnOic7XG59O1xuXG52YXIgZ2V0VXNlcm5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnVzZXJuYW1lO1xufTtcblxudmFyIGdldFBhc3N3b3JkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5wYXNzd29yZDtcbn07XG5cbnZhciBnZXRIb3N0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgdmFyIGhvc3QgPSB1cmwuaG9zdDtcbiAgdmFyIHBvcnQgPSB1cmwucG9ydDtcbiAgcmV0dXJuIGhvc3QgPT09IG51bGwgPyAnJ1xuICAgIDogcG9ydCA9PT0gbnVsbCA/IHNlcmlhbGl6ZUhvc3QoaG9zdClcbiAgICA6IHNlcmlhbGl6ZUhvc3QoaG9zdCkgKyAnOicgKyBwb3J0O1xufTtcblxudmFyIGdldEhvc3RuYW1lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaG9zdCA9IGdldEludGVybmFsVVJMU3RhdGUodGhpcykuaG9zdDtcbiAgcmV0dXJuIGhvc3QgPT09IG51bGwgPyAnJyA6IHNlcmlhbGl6ZUhvc3QoaG9zdCk7XG59O1xuXG52YXIgZ2V0UG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBvcnQgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnBvcnQ7XG4gIHJldHVybiBwb3J0ID09PSBudWxsID8gJycgOiBTdHJpbmcocG9ydCk7XG59O1xuXG52YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICB2YXIgcGF0aCA9IHVybC5wYXRoO1xuICByZXR1cm4gdXJsLmNhbm5vdEJlQUJhc2VVUkwgPyBwYXRoWzBdIDogcGF0aC5sZW5ndGggPyAnLycgKyBwYXRoLmpvaW4oJy8nKSA6ICcnO1xufTtcblxudmFyIGdldFNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5xdWVyeTtcbiAgcmV0dXJuIHF1ZXJ5ID8gJz8nICsgcXVlcnkgOiAnJztcbn07XG5cbnZhciBnZXRTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnNlYXJjaFBhcmFtcztcbn07XG5cbnZhciBnZXRIYXNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZnJhZ21lbnQgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLmZyYWdtZW50O1xuICByZXR1cm4gZnJhZ21lbnQgPyAnIycgKyBmcmFnbWVudCA6ICcnO1xufTtcblxudmFyIGFjY2Vzc29yRGVzY3JpcHRvciA9IGZ1bmN0aW9uIChnZXR0ZXIsIHNldHRlcikge1xuICByZXR1cm4geyBnZXQ6IGdldHRlciwgc2V0OiBzZXR0ZXIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSB9O1xufTtcblxuaWYgKERFU0NSSVBUT1JTKSB7XG4gIGRlZmluZVByb3BlcnRpZXMoVVJMUHJvdG90eXBlLCB7XG4gICAgLy8gYFVSTC5wcm90b3R5cGUuaHJlZmAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaHJlZlxuICAgIGhyZWY6IGFjY2Vzc29yRGVzY3JpcHRvcihzZXJpYWxpemVVUkwsIGZ1bmN0aW9uIChocmVmKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciB1cmxTdHJpbmcgPSBTdHJpbmcoaHJlZik7XG4gICAgICB2YXIgZmFpbHVyZSA9IHBhcnNlVVJMKHVybCwgdXJsU3RyaW5nKTtcbiAgICAgIGlmIChmYWlsdXJlKSB0aHJvdyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gICAgICBnZXRJbnRlcm5hbFNlYXJjaFBhcmFtc1N0YXRlKHVybC5zZWFyY2hQYXJhbXMpLnVwZGF0ZVNlYXJjaFBhcmFtcyh1cmwucXVlcnkpO1xuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLm9yaWdpbmAgZ2V0dGVyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLW9yaWdpblxuICAgIG9yaWdpbjogYWNjZXNzb3JEZXNjcmlwdG9yKGdldE9yaWdpbiksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUucHJvdG9jb2xgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXByb3RvY29sXG4gICAgcHJvdG9jb2w6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRQcm90b2NvbCwgZnVuY3Rpb24gKHByb3RvY29sKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHBhcnNlVVJMKHVybCwgU3RyaW5nKHByb3RvY29sKSArICc6JywgU0NIRU1FX1NUQVJUKTtcbiAgICB9KSxcbiAgICAvLyBgVVJMLnByb3RvdHlwZS51c2VybmFtZWAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtdXNlcm5hbWVcbiAgICB1c2VybmFtZTogYWNjZXNzb3JEZXNjcmlwdG9yKGdldFVzZXJuYW1lLCBmdW5jdGlvbiAodXNlcm5hbWUpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICAgICAgdmFyIGNvZGVQb2ludHMgPSBhcnJheUZyb20oU3RyaW5nKHVzZXJuYW1lKSk7XG4gICAgICBpZiAoY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KHVybCkpIHJldHVybjtcbiAgICAgIHVybC51c2VybmFtZSA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVybC51c2VybmFtZSArPSBwZXJjZW50RW5jb2RlKGNvZGVQb2ludHNbaV0sIHVzZXJpbmZvUGVyY2VudEVuY29kZVNldCk7XG4gICAgICB9XG4gICAgfSksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUucGFzc3dvcmRgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBhc3N3b3JkXG4gICAgcGFzc3dvcmQ6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRQYXNzd29yZCwgZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKFN0cmluZyhwYXNzd29yZCkpO1xuICAgICAgaWYgKGNhbm5vdEhhdmVVc2VybmFtZVBhc3N3b3JkUG9ydCh1cmwpKSByZXR1cm47XG4gICAgICB1cmwucGFzc3dvcmQgPSAnJztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB1cmwucGFzc3dvcmQgKz0gcGVyY2VudEVuY29kZShjb2RlUG9pbnRzW2ldLCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLmhvc3RgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RcbiAgICBob3N0OiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0SG9zdCwgZnVuY3Rpb24gKGhvc3QpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICAgICAgaWYgKHVybC5jYW5ub3RCZUFCYXNlVVJMKSByZXR1cm47XG4gICAgICBwYXJzZVVSTCh1cmwsIFN0cmluZyhob3N0KSwgSE9TVCk7XG4gICAgfSksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUuaG9zdG5hbWVgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RuYW1lXG4gICAgaG9zdG5hbWU6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRIb3N0bmFtZSwgZnVuY3Rpb24gKGhvc3RuYW1lKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIGlmICh1cmwuY2Fubm90QmVBQmFzZVVSTCkgcmV0dXJuO1xuICAgICAgcGFyc2VVUkwodXJsLCBTdHJpbmcoaG9zdG5hbWUpLCBIT1NUTkFNRSk7XG4gICAgfSksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUucG9ydGAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcG9ydFxuICAgIHBvcnQ6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRQb3J0LCBmdW5jdGlvbiAocG9ydCkge1xuICAgICAgdmFyIHVybCA9IGdldEludGVybmFsVVJMU3RhdGUodGhpcyk7XG4gICAgICBpZiAoY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KHVybCkpIHJldHVybjtcbiAgICAgIHBvcnQgPSBTdHJpbmcocG9ydCk7XG4gICAgICBpZiAocG9ydCA9PSAnJykgdXJsLnBvcnQgPSBudWxsO1xuICAgICAgZWxzZSBwYXJzZVVSTCh1cmwsIHBvcnQsIFBPUlQpO1xuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLnBhdGhuYW1lYCBhY2Nlc3NvcnMgcGFpclxuICAgIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wYXRobmFtZVxuICAgIHBhdGhuYW1lOiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0UGF0aG5hbWUsIGZ1bmN0aW9uIChwYXRobmFtZSkge1xuICAgICAgdmFyIHVybCA9IGdldEludGVybmFsVVJMU3RhdGUodGhpcyk7XG4gICAgICBpZiAodXJsLmNhbm5vdEJlQUJhc2VVUkwpIHJldHVybjtcbiAgICAgIHVybC5wYXRoID0gW107XG4gICAgICBwYXJzZVVSTCh1cmwsIHBhdGhuYW1lICsgJycsIFBBVEhfU1RBUlQpO1xuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLnNlYXJjaGAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtc2VhcmNoXG4gICAgc2VhcmNoOiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0U2VhcmNoLCBmdW5jdGlvbiAoc2VhcmNoKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHNlYXJjaCA9IFN0cmluZyhzZWFyY2gpO1xuICAgICAgaWYgKHNlYXJjaCA9PSAnJykge1xuICAgICAgICB1cmwucXVlcnkgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCc/JyA9PSBzZWFyY2guY2hhckF0KDApKSBzZWFyY2ggPSBzZWFyY2guc2xpY2UoMSk7XG4gICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICBwYXJzZVVSTCh1cmwsIHNlYXJjaCwgUVVFUlkpO1xuICAgICAgfVxuICAgICAgZ2V0SW50ZXJuYWxTZWFyY2hQYXJhbXNTdGF0ZSh1cmwuc2VhcmNoUGFyYW1zKS51cGRhdGVTZWFyY2hQYXJhbXModXJsLnF1ZXJ5KTtcbiAgICB9KSxcbiAgICAvLyBgVVJMLnByb3RvdHlwZS5zZWFyY2hQYXJhbXNgIGdldHRlclxuICAgIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1zZWFyY2hwYXJhbXNcbiAgICBzZWFyY2hQYXJhbXM6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRTZWFyY2hQYXJhbXMpLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLmhhc2hgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhhc2hcbiAgICBoYXNoOiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0SGFzaCwgZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICAgICAgaGFzaCA9IFN0cmluZyhoYXNoKTtcbiAgICAgIGlmIChoYXNoID09ICcnKSB7XG4gICAgICAgIHVybC5mcmFnbWVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgnIycgPT0gaGFzaC5jaGFyQXQoMCkpIGhhc2ggPSBoYXNoLnNsaWNlKDEpO1xuICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICBwYXJzZVVSTCh1cmwsIGhhc2gsIEZSQUdNRU5UKTtcbiAgICB9KVxuICB9KTtcbn1cblxuLy8gYFVSTC5wcm90b3R5cGUudG9KU09OYCBtZXRob2Rcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC10b2pzb25cbnJlZGVmaW5lKFVSTFByb3RvdHlwZSwgJ3RvSlNPTicsIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIHNlcmlhbGl6ZVVSTC5jYWxsKHRoaXMpO1xufSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vLyBgVVJMLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI1VSTC1zdHJpbmdpZmljYXRpb24tYmVoYXZpb3JcbnJlZGVmaW5lKFVSTFByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBzZXJpYWxpemVVUkwuY2FsbCh0aGlzKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuaWYgKE5hdGl2ZVVSTCkge1xuICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gTmF0aXZlVVJMLmNyZWF0ZU9iamVjdFVSTDtcbiAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IE5hdGl2ZVVSTC5yZXZva2VPYmplY3RVUkw7XG4gIC8vIGBVUkwuY3JlYXRlT2JqZWN0VVJMYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC9jcmVhdGVPYmplY3RVUkxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGlmIChuYXRpdmVDcmVhdGVPYmplY3RVUkwpIHJlZGVmaW5lKFVSTENvbnN0cnVjdG9yLCAnY3JlYXRlT2JqZWN0VVJMJywgZnVuY3Rpb24gY3JlYXRlT2JqZWN0VVJMKGJsb2IpIHtcbiAgICByZXR1cm4gbmF0aXZlQ3JlYXRlT2JqZWN0VVJMLmFwcGx5KE5hdGl2ZVVSTCwgYXJndW1lbnRzKTtcbiAgfSk7XG4gIC8vIGBVUkwucmV2b2tlT2JqZWN0VVJMYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC9yZXZva2VPYmplY3RVUkxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGlmIChuYXRpdmVSZXZva2VPYmplY3RVUkwpIHJlZGVmaW5lKFVSTENvbnN0cnVjdG9yLCAncmV2b2tlT2JqZWN0VVJMJywgZnVuY3Rpb24gcmV2b2tlT2JqZWN0VVJMKHVybCkge1xuICAgIHJldHVybiBuYXRpdmVSZXZva2VPYmplY3RVUkwuYXBwbHkoTmF0aXZlVVJMLCBhcmd1bWVudHMpO1xuICB9KTtcbn1cblxuc2V0VG9TdHJpbmdUYWcoVVJMQ29uc3RydWN0b3IsICdVUkwnKTtcblxuJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiAhVVNFX05BVElWRV9VUkwsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIFVSTDogVVJMQ29uc3RydWN0b3Jcbn0pO1xuIiwidmFyIGdsb2JhbCA9XG4gICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmKSB8fFxuICAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsKVxuXG52YXIgc3VwcG9ydCA9IHtcbiAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBnbG9iYWwsXG4gIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBnbG9iYWwgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gIGJsb2I6XG4gICAgJ0ZpbGVSZWFkZXInIGluIGdsb2JhbCAmJlxuICAgICdCbG9iJyBpbiBnbG9iYWwgJiZcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIGdsb2JhbCxcbiAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gZ2xvYmFsXG59XG5cbmZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxufVxuXG5pZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgXVxuXG4gIHZhciBpc0FycmF5QnVmZmVyVmlldyA9XG4gICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICB9XG4gIGlmICgvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+IV0vaS50ZXN0KG5hbWUpIHx8IG5hbWUgPT09ICcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICB9XG4gIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbmZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gIHZhciBpdGVyYXRvciA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGl0ZXJhdG9yXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdGhpcy5tYXAgPSB7fVxuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgfSwgdGhpcylcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgfSwgdGhpcylcbiAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgIH0sIHRoaXMpXG4gIH1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV1cbiAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlICsgJywgJyArIHZhbHVlIDogdmFsdWVcbn1cblxuSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpXG4gICAgfVxuICB9XG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgaXRlbXMucHVzaChuYW1lKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbmlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG59XG5cbmZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gIH1cbiAgYm9keS5ib2R5VXNlZCA9IHRydWVcbn1cblxuZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgIH1cbiAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gIHJldHVybiBwcm9taXNlXG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5mdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gIH1cbiAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICB9IGVsc2Uge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgfVxufVxuXG5mdW5jdGlvbiBCb2R5KCkge1xuICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAvKlxuICAgICAgZmV0Y2gtbW9jayB3cmFwcyB0aGUgUmVzcG9uc2Ugb2JqZWN0IGluIGFuIEVTNiBQcm94eSB0b1xuICAgICAgcHJvdmlkZSB1c2VmdWwgdGVzdCBoYXJuZXNzIGZlYXR1cmVzIHN1Y2ggYXMgZmx1c2guIEhvd2V2ZXIsIG9uXG4gICAgICBFUzUgYnJvd3NlcnMgd2l0aG91dCBmZXRjaCBvciBQcm94eSBzdXBwb3J0IHBvbGx5ZmlsbHMgbXVzdCBiZSB1c2VkO1xuICAgICAgdGhlIHByb3h5LXBvbGx5ZmlsbCBpcyB1bmFibGUgdG8gcHJveHkgYW4gYXR0cmlidXRlIHVubGVzcyBpdCBleGlzdHNcbiAgICAgIG9uIHRoZSBvYmplY3QgYmVmb3JlIHRoZSBQcm94eSBpcyBjcmVhdGVkLiBUaGlzIGNoYW5nZSBlbnN1cmVzXG4gICAgICBSZXNwb25zZS5ib2R5VXNlZCBleGlzdHMgb24gdGhlIGluc3RhbmNlLCB3aGlsZSBtYWludGFpbmluZyB0aGVcbiAgICAgIHNlbWFudGljIG9mIHNldHRpbmcgUmVxdWVzdC5ib2R5VXNlZCBpbiB0aGUgY29uc3RydWN0b3IgYmVmb3JlXG4gICAgICBfaW5pdEJvZHkgaXMgY2FsbGVkLlxuICAgICovXG4gICAgdGhpcy5ib2R5VXNlZCA9IHRoaXMuYm9keVVzZWRcbiAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSlcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdmFyIGlzQ29uc3VtZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAoaXNDb25zdW1lZCkge1xuICAgICAgICAgIHJldHVybiBpc0NvbnN1bWVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5idWZmZXIuc2xpY2UoXG4gICAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlT2Zmc2V0LFxuICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZU9mZnNldCArIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3RlZFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxudmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gIHJldHVybiBtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSA/IHVwY2FzZWQgOiBtZXRob2Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcXVlc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSB0aGUgXCJuZXdcIiBvcGVyYXRvciwgdGhpcyBET00gb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi4nKVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgIH1cbiAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICB0aGlzLnNpZ25hbCA9IGlucHV0LnNpZ25hbFxuICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICB9XG5cbiAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nXG4gIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgfVxuICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gIHRoaXMuc2lnbmFsID0gb3B0aW9ucy5zaWduYWwgfHwgdGhpcy5zaWduYWxcbiAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICB9XG4gIHRoaXMuX2luaXRCb2R5KGJvZHkpXG5cbiAgaWYgKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSB7XG4gICAgaWYgKG9wdGlvbnMuY2FjaGUgPT09ICduby1zdG9yZScgfHwgb3B0aW9ucy5jYWNoZSA9PT0gJ25vLWNhY2hlJykge1xuICAgICAgLy8gU2VhcmNoIGZvciBhICdfJyBwYXJhbWV0ZXIgaW4gdGhlIHF1ZXJ5IHN0cmluZ1xuICAgICAgdmFyIHJlUGFyYW1TZWFyY2ggPSAvKFs/Jl0pXz1bXiZdKi9cbiAgICAgIGlmIChyZVBhcmFtU2VhcmNoLnRlc3QodGhpcy51cmwpKSB7XG4gICAgICAgIC8vIElmIGl0IGFscmVhZHkgZXhpc3RzIHRoZW4gc2V0IHRoZSB2YWx1ZSB3aXRoIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5yZXBsYWNlKHJlUGFyYW1TZWFyY2gsICckMV89JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBhIG5ldyAnXycgcGFyYW1ldGVyIHRvIHRoZSBlbmQgd2l0aCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIHZhciByZVF1ZXJ5U3RyaW5nID0gL1xcPy9cbiAgICAgICAgdGhpcy51cmwgKz0gKHJlUXVlcnlTdHJpbmcudGVzdCh0aGlzLnVybCkgPyAnJicgOiAnPycpICsgJ189JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7Ym9keTogdGhpcy5fYm9keUluaXR9KVxufVxuXG5mdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gIGJvZHlcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KCcmJylcbiAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIGZvcm1cbn1cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgdmFyIHByZVByb2Nlc3NlZEhlYWRlcnMgPSByYXdIZWFkZXJzLnJlcGxhY2UoL1xccj9cXG5bXFx0IF0rL2csICcgJylcbiAgLy8gQXZvaWRpbmcgc3BsaXQgdmlhIHJlZ2V4IHRvIHdvcmsgYXJvdW5kIGEgY29tbW9uIElFMTEgYnVnIHdpdGggdGhlIGNvcmUtanMgMy42LjAgcmVnZXggcG9seWZpbGxcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9pc3N1ZXMvNzQ4XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy83NTFcbiAgcHJlUHJvY2Vzc2VkSGVhZGVyc1xuICAgIC5zcGxpdCgnXFxyJylcbiAgICAubWFwKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgcmV0dXJuIGhlYWRlci5pbmRleE9mKCdcXG4nKSA9PT0gMCA/IGhlYWRlci5zdWJzdHIoMSwgaGVhZGVyLmxlbmd0aCkgOiBoZWFkZXJcbiAgICB9KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICByZXR1cm4gaGVhZGVyc1xufVxuXG5Cb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSB0aGUgXCJuZXdcIiBvcGVyYXRvciwgdGhpcyBET00gb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi4nKVxuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzXG4gIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnJ1xuICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG59XG5cbkJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cblJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICB1cmw6IHRoaXMudXJsXG4gIH0pXG59XG5cblJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gIHJldHVybiByZXNwb25zZVxufVxuXG52YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG59XG5cbmV4cG9ydCB2YXIgRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvblxudHJ5IHtcbiAgbmV3IERPTUV4Y2VwdGlvbigpXG59IGNhdGNoIChlcnIpIHtcbiAgRE9NRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgbmFtZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSlcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxuICBET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01FeGNlcHRpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICBmdW5jdGlvbiBhYm9ydFhocigpIHtcbiAgICAgIHhoci5hYm9ydCgpXG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICB9XG4gICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhVcmwodXJsKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdXJsID09PSAnJyAmJiBnbG9iYWwubG9jYXRpb24uaHJlZiA/IGdsb2JhbC5sb2NhdGlvbi5ocmVmIDogdXJsXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgZml4VXJsKHJlcXVlc3QudXJsKSwgdHJ1ZSlcblxuICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIpIHtcbiAgICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc3VwcG9ydC5hcnJheUJ1ZmZlciAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKS5pbmRleE9mKCdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbml0ICYmIHR5cGVvZiBpbml0LmhlYWRlcnMgPT09ICdvYmplY3QnICYmICEoaW5pdC5oZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIG5vcm1hbGl6ZVZhbHVlKGluaXQuaGVhZGVyc1tuYW1lXSkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsKSB7XG4gICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gIH0pXG59XG5cbmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxuXG5pZiAoIWdsb2JhbC5mZXRjaCkge1xuICBnbG9iYWwuZmV0Y2ggPSBmZXRjaFxuICBnbG9iYWwuSGVhZGVycyA9IEhlYWRlcnNcbiAgZ2xvYmFsLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIGdsb2JhbC5SZXNwb25zZSA9IFJlc3BvbnNlXG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgUmVtb3RlU3RhdHVzVW5pb24gfSBmcm9tIFwiLi9wcmV2aWV3LXN0YXR1c1wiXG5jb25zdCB0aW1lb3V0U2Vjb25kczogbnVtYmVyID0gNDVcbmNvbnN0IHRpbWVvdXRNaWxsaXNlY29uZHM6IG51bWJlciA9IDEwMDAgKiB0aW1lb3V0U2Vjb25kc1xuXG4vKipcbiAqIEFmdGVyIDQ1IHNlY29uZHMsIGRpc3BsYXkgYSB3YXJuaW5nLCB1bmxlc3MgY2FuY2VsbGVkIGJ5IGNsZWFyaW5nIHRoaXMgdGltZW91dCBvbmNlIHRoZSBVSSBpcyB1cGRhdGVkIGFuZCB0aGUgaWZyYW1lIGlzIGxvYWRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHRpbWVvdXRXYXJuaW5nOiBudW1iZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0dXBkYXRlTG9hZGVyV2FybmluZyhcblx0XHRgUHJldmlldyBpcyB0YWtpbmcgYSB2ZXJ5IGxvbmcgdGltZSB0byBsb2FkIChtb3JlIHRoYW4gJHt0aW1lb3V0U2Vjb25kc30gc2Vjb25kcykuPGJyIC8+VHJ5IHByZXNzaW5nIFwicHJldmlld1wiIGFnYWluIGZyb20gdGhlIFdvcmRQcmVzcyBlZGl0IHNjcmVlbi48YnIgLz5JZiB5b3Ugc2VlIHRoaXMgYWdhaW4sIHlvdXIgcHJldmlldyBidWlsZHMgYXJlIGVpdGhlciBzbG93IG9yIHRoZXJlJ3Mgc29tZXRoaW5nIHdyb25nLmAsXG5cdClcbn0sIHRpbWVvdXRNaWxsaXNlY29uZHMpXG5cbmV4cG9ydCB0eXBlIEN1c3RvbUVycm9yID0ge1xuXHRtZXNzYWdlOiBzdHJpbmdcblx0cmVtb3RlU3RhdHVzPzogUmVtb3RlU3RhdHVzVW5pb25cbn1cblxudHlwZSBTaG93YWJsZUVycm9yID0gQ3VzdG9tRXJyb3IgfCBFcnJvciB8IHN0cmluZ1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKGVycm9yOiBTaG93YWJsZUVycm9yKTogdm9pZCB7XG5cdGlmICh0eXBlb2YgZXJyb3IgPT09IGBzdHJpbmdgKSB7XG5cdFx0ZXJyb3IgPSB7XG5cdFx0XHRtZXNzYWdlOiBlcnJvcixcblx0XHR9XG5cdH1cblxuXHRjb25zdCBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XCJwcmV2aWV3XCIsXG5cdCkgYXMgSFRNTElGcmFtZUVsZW1lbnRcblxuXHRpZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0Y29uc3QgbG9hZGVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGVyXCIpXG5cblx0bG9hZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdGNvbnN0IGVycm9yRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcImVycm9yLW1lc3NhZ2UtZWxlbWVudFwiLFxuXHQpXG5cblx0ZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3IubWVzc2FnZVxuXG5cdGNvbnN0IGNvbnRlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcIi5jb250ZW50LmVycm9yXCIsXG5cdCkgYXMgSFRNTEVsZW1lbnRcblxuXHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcblxuXHRpZiAoIShgcmVtb3RlU3RhdHVzYCBpbiBlcnJvcikpIHtcblx0XHRyZXR1cm5cblx0fVxuXG5cdHN3aXRjaCAoZXJyb3IucmVtb3RlU3RhdHVzKSB7XG5cdFx0Y2FzZSBgTk9fUEFHRV9DUkVBVEVEX0ZPUl9QUkVWSUVXRURfTk9ERWA6XG5cdFx0XHR1cGRhdGVUcm91Ymxlc2hvb3RpbmdNZXNzYWdlKGBcblx0XHRcdEdhdHNieSB3YXNuJ3QgYWJsZSB0byBmaW5kIGEgcGFnZSBmb3IgdGhlIHBvc3QgeW91J3JlIHRyeWluZyB0byBwcmV2aWV3LiBUaGlzIGNhbiBtZWFuIG9uZSBvZiB0aHJlZSB0aGluZ3M6XG5cdFx0XHQ8L3A+XG5cdFx0XHQ8b2w+XG5cdFx0XHRcdCA8bGk+QSBwYWdlIGlzIG5vdCBiZWluZyBidWlsdCBmb3IgdGhlIHBvc3QgYmVpbmcgcHJldmlld2VkLjwvbGk+XG5cdFx0XHRcdCA8bGk+VGhlIGlkIG9mIHRoaXMgcG9zdCBpcyBub3QgYmVpbmcgaW5jbHVkZWQgaW4gdGhlIHBhZ2VDb250ZXh0IG9mIGl0J3MgR2F0c2J5IHBhZ2UuPC9saT5cblx0XHRcdFx0IDxsaT5BbiBlcnJvciB3YXMgdGhyb3duIGluIEdhdHNieSBkdXJpbmcgUHJldmlldyBzb3VyY2luZyAoY2hlY2sgeW91ciBsb2dzKS48L2xpPlxuXHRcdFx0PC9vbD5cblx0XHRcdDxiciAvPiBcblx0XHRcdDxwPlxuXHRcdFx0XHQ8Yj5IaW50OjwvYj4gaWYgeW91IHdhbnQgdG8gYWNjb3VudCBmb3IgYW55IHBvc3NpYmxlIHBvc3QgdHlwZSAoZXZlbiB0aG9zZSB0aGF0IGhhdmVuJ3QgeWV0IGJlZW4gcmVnaXN0ZXJlZCkgeW91IGNhbiB1c2UgdGhlIFdwQ29udGVudE5vZGUgaW50ZXJmYWNlIGFzIGEgZmFsbGJhY2sgdGVtcGxhdGUgaW4gZ2F0c2J5LW5vZGUuanMgd2hlbiB5b3UncmUgY3JlYXRpbmcgcGFnZXMgYW5kIHlvdSdsbCBuZXZlciBzZWUgdGhpcyBtZXNzYWdlIHdoZW4gcmVnaXN0ZXJpbmcgbmV3IHBvc3QgdHlwZXMuXHRcdFx0XG5cdFx0YClcblx0XHRcdGJyZWFrXG5cblx0XHRjYXNlIGBHQVRTQllfUFJFVklFV19QUk9DRVNTX0VSUk9SYDpcblx0XHRcdHVwZGF0ZVRyb3VibGVzaG9vdGluZ01lc3NhZ2UoYFxuXHRcdFx0XHRUaGUgR2F0c2J5IFByZXZpZXcgcHJvY2VzcyBlcnJvcmVkIHdoaWxlIHNvdXJjaW5nIHRoaXMgcHJldmlldy48YnIgLz5QbGVhc2UgY2hlY2sgeW91ciBlcnJvciBsb2dzIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlx0XHRcblx0XHRcdGApXG5cdFx0XHRicmVha1xuXG5cdFx0Y2FzZSBgUkVDRUlWRURfUFJFVklFV19EQVRBX0ZST01fV1JPTkdfVVJMYDpcblx0XHRcdHVwZGF0ZVRyb3VibGVzaG9vdGluZ01lc3NhZ2UoYFxuXHRcdFx0XHRUaGUgR2F0c2J5IGluc3RhbmNlIHRoaXMgV1Agc2l0ZSBpcyBjb25maWd1cmVkIHRvIHNlbmQgUHJldmlld3MgdG8gaXMgY29uZmlndXJlZCB0byByZWNlaXZlIHNvdXJjZSBkYXRhIGZyb20gYSBkaWZmZXJlbnQgV29yZFByZXNzIGluc3RhbmNlLiBQbGVhc2UgY2hlY2sgeW91ciBnYXRzYnktY29uZmlnLmpzIGFuZCBXUEdhdHNieSBzZXR0aW5ncyB0byBlbnN1cmUgdGhlIFdvcmRQcmVzcyBpbnN0YW5jZSBVUkwncyBtYXRjaCB1cC5cdFx0XHRcblx0XHRcdGApXG5cdFx0XHRicmVha1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdGJyZWFrXG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJvdWJsZXNob290aW5nTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcblx0Y29uc3Qgc2hhcmVkTWVzc2FnZSA9IGA8YnIvPjxici8+SWYgeW91J3JlIG5vdCBhIGRldmVsb3BlciwgcGxlYXNlIHNjcmVlbnNob3QgdGhpcyBwYWdlIGFuZCBzZW5kIGl0IHRvIHlvdXIgZGV2ZWxvcGVyLjxiciAvPjxiciAvPjxiPk5vdGU6PC9iPiBPbmNlIHRoaXMgZXJyb3IgaXMgZml4ZWQsIHlvdSdsbCBuZWVkIHRvIHByZXNzIFwicHJldmlld1wiIGFnYWluIHRvIGNsZWFyIG91dCB0aGlzIG1lc3NhZ2UuYFxuXG5cdGNvbnN0IHRyb3VibGVzaG9vdGluZ0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcInRyb3VibGVzaG9vdGluZy1odG1sLWFyZWFcIixcblx0KVxuXG5cdHRyb3VibGVzaG9vdGluZ0VsZW1lbnQuaW5uZXJIVE1MID0gYFxuXHRcdDxwPiR7bWVzc2FnZX0ke3NoYXJlZE1lc3NhZ2V9PC9wPlx0XHRcdFxuXHRgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb2FkZXJXYXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRjb25zdCBwcmV2aWV3V2FybmluZ1AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpZXctbG9hZGVyLXdhcm5pbmdcIilcblxuXHRwcmV2aWV3V2FybmluZ1AuaW5uZXJIVE1MID0gYCR7bWVzc2FnZX08YnIgLz48YnIgLz48YnV0dG9uIGlkPVwiY2FuY2VsLWJ1dHRvblwiPkNhbmNlbCBhbmQgVHJvdWJsZXNob290PC9idXR0b24+YFxuXHRwcmV2aWV3V2FybmluZ1Auc3R5bGUuZGlzcGxheSA9IFwiaW5pdGlhbFwiXG5cblx0Y29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtYnV0dG9uXCIpXG5cblx0Y2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0XHRjYW5jZWxQcmV2aWV3TG9hZGVyKClcblx0XHR9XG5cdH0pXG5cblx0Y2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW5jZWxQcmV2aWV3TG9hZGVyKVxufVxuXG5mdW5jdGlvbiBjYW5jZWxQcmV2aWV3TG9hZGVyKCk6IHZvaWQge1xuXHRzaG93RXJyb3IoYFByZXZpZXcgd2FzIGNhbmNlbGxlZC5gKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluY2x1ZGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5jbHVkZXM7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2luZGV4T2YnLCB7IEFDQ0VTU09SUzogdHJ1ZSwgMTogMCB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygnaW5jbHVkZXMnKTtcbiIsImltcG9ydCB7IHRpbWVvdXRXYXJuaW5nIH0gZnJvbSBcIi4vZXJyb3Itd2FybmluZ1wiXG5cbmltcG9ydCB0eXBlIHsgSW5pdGlhbFN0YXRlIH0gZnJvbSBcIi4vc3RhcnQtcHJldmlldy1jbGllbnRcIlxuXG5kZWNsYXJlIHZhciBpbml0aWFsU3RhdGU6IEluaXRpYWxTdGF0ZVxuXG5jb25zdCBwcmV2aWV3RnJvbnRlbmRJc09ubGluZVF1ZXJ5OiBzdHJpbmcgPSAvKiBHcmFwaFFMICovIGBcblx0cXVlcnkgUFJFVklFV19GUk9OVEVORF9JU19PTkxJTkUge1xuXHRcdHdwR2F0c2J5IHtcblx0XHRcdGlzUHJldmlld0Zyb250ZW5kT25saW5lXG5cdFx0fVxuXHR9XG5gXG5cbmNvbnN0IHByZXZpZXdTdGF0dXNRdWVyeTogc3RyaW5nID0gLyogR3JhcGhRTCAqLyBgXG5cdHF1ZXJ5IFBSRVZJRVdfU1RBVFVTX1FVRVJZKCRwb3N0SWQ6IEZsb2F0ISkge1xuXHRcdHdwR2F0c2J5IHtcblx0XHRcdGdhdHNieVByZXZpZXdTdGF0dXMobm9kZUlkOiAkcG9zdElkKSB7XG5cdFx0XHRcdHBhZ2VOb2RlIHtcblx0XHRcdFx0XHRwYXRoXG5cdFx0XHRcdH1cblx0XHRcdFx0c3RhdHVzVHlwZVxuXHRcdFx0XHRyZW1vdGVTdGF0dXNcblx0XHRcdFx0c3RhdHVzQ29udGV4dFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuYFxuXG5jb25zdCB3cFByZXZpZXdlZE5vZGVTdGF0dXMgPSBbXG5cdGBOT19OT0RFX0ZPVU5EYCxcblx0YFBSRVZJRVdfUkVBRFlgLFxuXHRgUkVNT1RFX05PREVfTk9UX1lFVF9VUERBVEVEYCxcblx0YE5PX1BSRVZJRVdfUEFUSF9GT1VORGAsXG5cdGBQUkVWSUVXX1BBR0VfVVBEQVRFRF9CVVRfTk9UX1lFVF9ERVBMT1lFRGAsXG5dIGFzIGNvbnN0XG5cbnR5cGUgV3BQcmV2aWV3ZWROb2RlU3RhdHVzVW5pb24gPSB0eXBlb2Ygd3BQcmV2aWV3ZWROb2RlU3RhdHVzW251bWJlcl1cblxuY29uc3QgcmVtb3RlU3RhdHVzZXMgPSBbXG5cdGBOT19QQUdFX0NSRUFURURfRk9SX1BSRVZJRVdFRF9OT0RFYCxcblx0YEdBVFNCWV9QUkVWSUVXX1BST0NFU1NfRVJST1JgLFxuXHRgUkVDRUlWRURfUFJFVklFV19EQVRBX0ZST01fV1JPTkdfVVJMYCxcbl0gYXMgY29uc3RcblxuZXhwb3J0IHR5cGUgUmVtb3RlU3RhdHVzVW5pb24gPSB0eXBlb2YgcmVtb3RlU3RhdHVzZXNbbnVtYmVyXVxuXG50eXBlIFByZXZpZXdTdGF0dXNSZXNwb25zZUpzb24gPSB7XG5cdGRhdGE6IHtcblx0XHR3cEdhdHNieToge1xuXHRcdFx0Z2F0c2J5UHJldmlld1N0YXR1czoge1xuXHRcdFx0XHRwYWdlTm9kZToge1xuXHRcdFx0XHRcdHBhdGg6IHN0cmluZ1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXR1c1R5cGU6IFdwUHJldmlld2VkTm9kZVN0YXR1c1VuaW9uXG5cdFx0XHRcdHJlbW90ZVN0YXR1czogUmVtb3RlU3RhdHVzVW5pb25cblx0XHRcdFx0c3RhdHVzQ29udGV4dDogc3RyaW5nXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgdGhlIHByZXZpZXcgc3RhdHVzIHRoYXQgR2F0c2J5IGhhcyBzdG9yZWQgaW4gcG9zdCBtZXRhIGZvclxuICogdGhlIHBhcmVudCBwb3N0IG9mIHRoaXMgcHJldmlld1xuICogV2hlbiB0aGUgcHJldmlldyBpcyByZWFkeSwgaXQgY2FsbHMgb25QcmV2aWV3UmVhZHlVcGRhdGVVSSgpIHdoaWNoIHVwZGF0ZXMgdGhlIFVJXG4gKlxuICogSWYgYSBzdGF0dXMgYmVzaWRlcyBQUkVWSUVXX1JFQURZIGNvbWVzIGJhY2ssIHdlIHdhaXQgYSBiaXQgYW5kIHRyeSBhZ2FpblxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZG9lc24ndCByZXR1cm4gYW55dGhpbmdcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUHJldmlld1N0YXR1c0FuZFVwZGF0ZVVJKHtcblx0cmVmZXRjaENvdW50ID0gMCxcblx0cmVmZXRjaERlbGF5ID0gNTAwLFxufSA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG5cdGNvbnN0IHsgd29yZHByZXNzU2l0ZVVybCwgZ3JhcGhxbEVuZHBvaW50IH0gPSBpbml0aWFsU3RhdGVcblx0Ly8gQXNrIFdQR3JhcGhRTCBmb3IgdGhlIHN0YXR1cyBvZiB0aGlzIHByZXZpZXdcblx0Ly8gR2F0c2J5IHdpbGwgdXBkYXRlIHRoaXMgd2hlbiB0aGUgcHJldmlldyBpcyByZWFkeVxuXHRjb25zdCByZXNwb25zZTogUHJldmlld1N0YXR1c1Jlc3BvbnNlSnNvbiA9IGF3YWl0IChcblx0XHRhd2FpdCBmZXRjaChgJHt3b3JkcHJlc3NTaXRlVXJsfS8/JHtncmFwaHFsRW5kcG9pbnR9YCwge1xuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IHByZXZpZXdTdGF0dXNRdWVyeSxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0cG9zdElkOiBpbml0aWFsU3RhdGUucG9zdElkLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0fSxcblx0XHR9KVxuXHQpLmpzb24oKVxuXG5cdGNvbnN0IHsgc3RhdHVzVHlwZSwgcmVtb3RlU3RhdHVzLCBzdGF0dXNDb250ZXh0IH0gPVxuXHRcdHJlc3BvbnNlPy5kYXRhPy53cEdhdHNieT8uZ2F0c2J5UHJldmlld1N0YXR1cyB8fCB7fVxuXG5cdGNvbnN0IGlzU3BlY2lhbFN0YXR1czogYm9vbGVhbiA9IHJlbW90ZVN0YXR1c2VzLmluY2x1ZGVzKHJlbW90ZVN0YXR1cylcblxuXHRpZiAoaXNTcGVjaWFsU3RhdHVzKSB7XG5cdFx0Y29uc29sZS5sb2coeyByZXNwb25zZSB9KVxuXHRcdC8vIHdlIGNsZWFyIHRoaXMgdGltZW91dCB3aGVuIHRoZSBwcmV2aWV3IGlzIHJlYWR5IHNvIHRoYXQgdGhlXG5cdFx0Ly8gXCJsb25nIHByZXZpZXcgdGltZVwiIHdhcm5pbmcgZG9lc24ndCBhcHBlYXJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dFdhcm5pbmcpXG5cblx0XHR0aHJvdyB7XG5cdFx0XHRyZW1vdGVTdGF0dXMsXG5cdFx0XHRtZXNzYWdlOiBgR2F0c2J5IHJldHVybmVkIHVuc3VjY2Vzc2Z1bCBQcmV2aWV3IHN0YXR1czpcXG4ke3JlbW90ZVN0YXR1c30ke1xuXHRcdFx0XHRzdGF0dXNDb250ZXh0ID8gYFxcblxcbldpdGggYWRkaXRpb25hbCBjb250ZXh0OlxcbiR7c3RhdHVzQ29udGV4dH1gIDogYGBcblx0XHRcdH1gLFxuXHRcdH1cblx0fVxuXG5cdGlmIChzdGF0dXNUeXBlKSB7XG5cdFx0Y29uc29sZS5sb2coc3RhdHVzVHlwZSlcblx0fVxuXG5cdGlmIChyZW1vdGVTdGF0dXMpIHtcblx0XHRjb25zb2xlLmxvZyhyZW1vdGVTdGF0dXMpXG5cdH1cblxuXHRpZiAoc3RhdHVzVHlwZSA9PT0gYFBSRVZJRVdfUkVBRFlgKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRXYXJuaW5nKVxuXG5cdFx0b25QcmV2aWV3UmVhZHlVcGRhdGVVSShyZXNwb25zZSlcblxuXHRcdC8vIGlmIHRoZSBwcmV2aWV3IGlzIHJlYWR5IHdlIGRvbid0IG5lZWQgdG8gY29udGludWUgc28gd2UgcmV0dXJuIGhlcmVcblx0XHQvLyB0aGlzIGZ1bmN0aW9uIGlzbid0IGV4cGVjdGVkIHRvIHJldHVybiBhbnl0aGluZ1xuXHRcdHJldHVyblxuXHR9XG5cblx0Y29uc3QgcmVmZXRjaERlbGF5TWFwID0ge1xuXHRcdC8vIGFmdGVyIDMwIHJldHJpZXMgb2YgNTAwbXMsIHN0YXJ0IGNoZWNraW5nIGV2ZXJ5IHNlY29uZFxuXHRcdDMwOiAxMDAwLFxuXHRcdC8vIGFmdGVyIDIwIG1vcmUgcmV0cmllcyBvZiAxIHNlY29uZCwgc3RhcnQgY2hlY2tpbmcgZXZlcnkgMiBzZWNvbmRzXG5cdFx0NTA6IDIwMDAsXG5cdFx0Ly8gYWZ0ZXIgMjAgbW9yZSByZXRyaWVzIG9mIDIgc2Vjb25kcywgc3RhcnQgY2hlY2tpbmcgZXZlcnkgNSBzZWNvbmRzXG5cdFx0NzA6IDUwMDAsXG5cdH1cblxuXHRyZWZldGNoQ291bnQrK1xuXHQvLyBvdXIgZGVsYXkgaW5jcmVhc2VzIGlmIHdlIGhhdmUgYSB2YWx1ZSBmb3IgdGhlIGN1cnJlbnQgcmVmZXRjaENvdW50XG5cdHJlZmV0Y2hEZWxheSA9IHJlZmV0Y2hEZWxheU1hcFtyZWZldGNoQ291bnRdIHx8IHJlZmV0Y2hEZWxheVxuXG5cdGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0cmVzb2x2ZSgpXG5cdFx0fSwgcmVmZXRjaERlbGF5KSxcblx0KVxuXG5cdC8vIHdlIG5lZWQgdG8gYXdhaXQgdGhpcyBzbyBvdXIgdG9wIGxldmVsIHN0YXJ0KCkgZm4gY2FuIHByb3Blcmx5IHRyeS9jYXRjaCBhbmQgZGlzcGxheSB0aGUgZXJyb3Igdmlld1xuXHRhd2FpdCBmZXRjaFByZXZpZXdTdGF0dXNBbmRVcGRhdGVVSSh7XG5cdFx0cmVmZXRjaENvdW50LFxuXHRcdHJlZmV0Y2hEZWxheSxcblx0fSlcbn1cblxuZnVuY3Rpb24gb25QcmV2aWV3UmVhZHlVcGRhdGVVSShyZXNwb25zZTogUHJldmlld1N0YXR1c1Jlc3BvbnNlSnNvbik6IHZvaWQge1xuXHRjb25zdCB7IGdhdHNieVByZXZpZXdTdGF0dXMgfSA9IHJlc3BvbnNlPy5kYXRhPy53cEdhdHNieSB8fCB7fVxuXG5cdGNvbnNvbGUubG9nKHsgcHJldmlld1JlYWR5OiB7IGdhdHNieVByZXZpZXdTdGF0dXMgfSB9KVxuXG5cdGlmIChcblx0XHQhZ2F0c2J5UHJldmlld1N0YXR1cyB8fFxuXHRcdCFnYXRzYnlQcmV2aWV3U3RhdHVzLnN0YXR1c1R5cGUgfHxcblx0XHQhZ2F0c2J5UHJldmlld1N0YXR1cz8ucGFnZU5vZGU/LnBhdGhcblx0KSB7XG5cdFx0dGhyb3cgRXJyb3IoYFJlY2VpdmVkIGFuIGltcHJvcGVyIHJlc3BvbnNlIGZyb20gdGhlIFByZXZpZXcgc2VydmVyLmApXG5cdH1cblxuXHRjb25zdCBwcmV2aWV3SWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdFwicHJldmlld1wiLFxuXHQpIGFzIEhUTUxJRnJhbWVFbGVtZW50XG5cblx0Ly8gd2hlbiB0aGUgaWZyYW1lIGxvYWRzIHdlIHdhbnQgb3VyIGlmcmFtZSBsb2FkZWQgZXZlbnQgdG8gZmlyZVxuXHQvLyBzbyB3ZSBjYW4gcmVtb3ZlIHRoZSBsb2FkZXJcblx0cHJldmlld0lmcmFtZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvbklmcmFtZUxvYWRlZEhpZGVMb2FkZXJVSSlcblxuXHRjb25zb2xlLmxvZyhgTG9hZGluZyBHYXRzYnkgUHJldmlldyBpbiBhbiBpZnJhbWUuLi5gKVxuXHQvLyBwb2ludCB0aGUgaWZyYW1lIGF0IHRoZSBmcm9udGVuZCBwcmV2aWV3IHVybCBmb3IgdGhpcyBwcmV2aWV3XG5cdHByZXZpZXdJZnJhbWUuc3JjID1cblx0XHRpbml0aWFsU3RhdGUucHJldmlld0Zyb250ZW5kVXJsICsgZ2F0c2J5UHJldmlld1N0YXR1cy5wYWdlTm9kZS5wYXRoXG5cblx0Y29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJ3cC1nYXRzYnktcHJldmlldy1yZWFkeVwiKVxuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxufVxuXG5mdW5jdGlvbiBvbklmcmFtZUxvYWRlZEhpZGVMb2FkZXJVSSgpOiB2b2lkIHtcblx0Y29uc3QgbG9hZGVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGVyXCIpXG5cdGNvbnNvbGUubG9nKGBMb2FkZWQgR2F0c2J5IFByZXZpZXchYClcblxuXHRjb25zb2xlLmxvZyhsb2FkZXIpXG5cblx0Ly8gdGhpcyBkZWxheSBwcmV2ZW50cyBhIGZsYXNoIGJldHdlZW5cblx0Ly8gdGhlIGlmcmFtZSBwYWludGluZyBhbmQgdGhlIGxvYWRlciBkaXNzYXBlYXJpbmdcblx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0Ly8gdGhlcmUgaXMgYSBmYWRlb3V0IGNzcyBhbmltYXRpb24gb24gdGhpc1xuXHRcdGxvYWRlci5jbGFzc0xpc3QuYWRkKFwibG9hZGVkXCIpXG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdC8vIHdlIHdhaXQgYSBzZWMgdG8gZGlzcGxheSBub25lIHNvIHRoZSBjc3MgYW5pbWF0aW9uIGZhZGVvdXQgY2FuIGNvbXBsZXRlXG5cdFx0XHRsb2FkZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0fSwgMTAwKVxuXHR9LCA1MClcbn1cblxuY29uc3QgcmVxdWVzdFByZXZpZXdGcm9udGVuZElzT25saW5lID0gYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbj4gPT5cblx0KFxuXHRcdGF3YWl0IChcblx0XHRcdGF3YWl0IGZldGNoKGAvPyR7aW5pdGlhbFN0YXRlLmdyYXBocWxFbmRwb2ludH1gLCB7XG5cdFx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRxdWVyeTogcHJldmlld0Zyb250ZW5kSXNPbmxpbmVRdWVyeSxcblx0XHRcdFx0fSksXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdFx0fSxcblx0XHRcdH0pXG5cdFx0KS5qc29uKClcblx0KT8uZGF0YT8ud3BHYXRzYnk/LmlzUHJldmlld0Zyb250ZW5kT25saW5lXG5cbmxldCBmcm9udGVuZE9ubGluZUNoZWNrQ291bnQgPSAwXG5cbi8qKlxuICogSWYgb3VyIGJhY2tlbmQgd2ViaG9vayBwcmV2aWV3IFBPU1QgY2FtZSBiYWNrIHdpdGggYW4gZXJyb3IsIHdlIGNhbid0IGJlIHN1cmUgb3VyIGZyb250ZW5kIGlzIG9ubGluZS5cbiAqIFNvIHRoaXMgZnVuY3Rpb24gY2hlY2tzIGp1c3QgdGhhdCBhbmQgdGhlbiBhZnRlciAxMCBzZWNvbmRzICgrIHJlcXVlc3QgdGltZSkgb2YgaXQgbm90IGJlaW5nIG9ubGluZSBpdCB3aWxsIHNob3cgYW4gZXJyb3JcbiAqIElmIGl0J3Mgb25saW5lIGl0IHdpbGwgc3RhcnQgdGhlIHByZXZpZXcgc3RhdHVzIHdhdGNoZXIgYW5kIHVwZGF0ZSB0aGUgVUlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRvdWJsZUNoZWNrSWZQcmV2aWV3RnJvbnRlbmRJc09ubGluZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3QgcHJldmlld0Zyb250ZW5kSXNPbmxpbmU6IGJvb2xlYW4gPSBhd2FpdCByZXF1ZXN0UHJldmlld0Zyb250ZW5kSXNPbmxpbmUoKVxuXG5cdGlmIChwcmV2aWV3RnJvbnRlbmRJc09ubGluZSkge1xuXHRcdC8vIGlmIHRoZSByZXNwb25zZSBjYW1lIGJhY2sgb2sgc3RhcnQgbG9hZGluZyB0aGUgZnJvbnRlbmRcblx0XHQvLyAgYmVjYXVzZSB0aGUgZnJvbnRlbmQgYWN0dWFsbHkgaXMgb25saW5lXG5cdFx0YXdhaXQgZmV0Y2hQcmV2aWV3U3RhdHVzQW5kVXBkYXRlVUkoKVxuXHR9IGVsc2UgaWYgKGZyb250ZW5kT25saW5lQ2hlY2tDb3VudCA8IDEwKSB7XG5cdFx0Y29uc29sZS5sb2coYGZyb250ZW5kIG5vdCBvbmxpbmUuLiByZWNoZWNraW5nYClcblxuXHRcdGZyb250ZW5kT25saW5lQ2hlY2tDb3VudCsrXG5cblx0XHRhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSlcblxuXHRcdGF3YWl0IGRvdWJsZUNoZWNrSWZQcmV2aWV3RnJvbnRlbmRJc09ubGluZSgpXG5cdH0gZWxzZSB7XG5cdFx0Ly8gb3RoZXJ3aXNlIHRocm93aW5nIHRoaXMgd2lsbCBkaXNwbGF5IHRoZSBlcnJvciBVSVxuXHRcdHRocm93IEVycm9yKGBUaGUgR2F0c2J5IFByZXZpZXcgZnJvbnRlbmQgaXMgbm90IHJlc3BvbmRpbmcgdG8gcmVxdWVzdHMuYClcblx0fVxufVxuIiwiaW1wb3J0IFwid2hhdHdnLWZldGNoXCJcblxuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcIi4vZXJyb3Itd2FybmluZ1wiXG5pbXBvcnQge1xuXHRmZXRjaFByZXZpZXdTdGF0dXNBbmRVcGRhdGVVSSxcblx0ZG91YmxlQ2hlY2tJZlByZXZpZXdGcm9udGVuZElzT25saW5lLFxufSBmcm9tIFwiLi9wcmV2aWV3LXN0YXR1c1wiXG5cbmV4cG9ydCB0eXBlIEluaXRpYWxTdGF0ZSA9IHtcblx0cHJldmlld1dlYmhvb2tJc09ubGluZTogYm9vbGVhblxuXHRwcmV2aWV3RnJvbnRlbmRVcmw6IHN0cmluZ1xuXHRwb3N0SWQ6IG51bWJlclxuXHRncmFwaHFsRW5kcG9pbnQ6IHN0cmluZ1xuXHR3ZWJob29rV2FzQ2FsbGVkOiBib29sZWFuXG5cdHdvcmRwcmVzc1NpdGVVcmw6IHN0cmluZ1xufVxuXG5kZWNsYXJlIHZhciBpbml0aWFsU3RhdGU6IEluaXRpYWxTdGF0ZVxuXG4vKipcbiAqIFRoaXMgZmlsZSBpcyBwcmludGVkIG91dCBpbiBwcmV2aWV3LXRlbXBsYXRlLnBocFxuICogaW5pdGlhbFN0YXRlIGdsb2JhbCBjb21lcyBmcm9tIHByZXZpZXctdGVtcGxhdGUucGhwIGFib3ZlIHdoZXJlIHRoaXMgaXMgcHJpbnRlZCB0byB0aGUgcGFnZVxuICovXG5zdGFydCgpLmNhdGNoKChlKSA9PiB7XG5cdGNvbnNvbGUuZXJyb3IoZSlcblx0XG5cdGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcblx0XHQvLyBkb2N1bWVudCBpcyBhbHJlYWR5IHJlYWR5IHRvIGdvIHNvIHNob3cgdGhlIGVycm9yXG5cdFx0c2hvd0Vycm9yKGUpXG5cdH0gZWxzZSB7XG5cdFx0Ly8gb3RoZXJ3aXNlIHdhaXQgZm9yIGl0IHRvIGxvYWQgYmVmb3JlIHNob3dpbmcgdGhlIGVycm9yXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXHRcdFx0c2hvd0Vycm9yKGUpXG5cdFx0fSlcblx0fVxufSlcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChpbml0aWFsU3RhdGUucHJldmlld1dlYmhvb2tJc09ubGluZSkge1xuXHRcdC8vIGlmIHdlIHdlYmhvb2sgY2FtZSBiYWNrIGFzIG9ubGluZSwgZmV0Y2ggdGhlIHN0YXR1cyBhbmQgdXBkYXRlIHRoZSB1aVxuXHRcdGF3YWl0IGZldGNoUHJldmlld1N0YXR1c0FuZFVwZGF0ZVVJKClcblx0fSBlbHNlIHtcblx0XHQvLyBvdGhlcndpc2UgY2hlY2sgdG8gc2VlIGlmIGl0IGFjdHVhbGx5IGlzIG9ubGluZVxuXHRcdC8vIHRoZW4gaWYgaXQgaXMsIGZldGNoIHRoZSBzdGF0dXMgYW5kIHVwZGF0ZSB0aGUgVUlcblx0XHRhd2FpdCBkb3VibGVDaGVja0lmUHJldmlld0Zyb250ZW5kSXNPbmxpbmUoKVxuXHR9XG59XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiY2xhc3NvZiIsIkluZGV4ZWRPYmplY3QiLCJkb2N1bWVudCIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlRWxlbWVudCIsIklFOF9ET01fREVGSU5FIiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsInN0b3JlIiwiV2Vha01hcCIsImhhcyIsIk5BVElWRV9XRUFLX01BUCIsInNoYXJlZCIsIm9iamVjdEhhcyIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJtaW4iLCJyZXF1aXJlJCQwIiwiaGlkZGVuS2V5cyIsImludGVybmFsT2JqZWN0S2V5cyIsImdldE93blByb3BlcnR5TmFtZXNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0ZvcmNlZCIsIk5BVElWRV9TWU1CT0wiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidG9TdHJpbmciLCJTeW1ib2wiLCJVU0VfU1lNQk9MX0FTX1VJRCIsIndyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUiLCJkZWZpbmVQcm9wZXJ0eSIsImFGdW5jdGlvbiIsImNyZWF0ZU1ldGhvZCIsImJpbmQiLCJQUk9UT1RZUEUiLCJuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJuYXRpdmVEZWZpbmVQcm9wZXJ0eSIsIm5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwiLCJuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSIsIldlbGxLbm93blN5bWJvbHNTdG9yZSIsIm5hdGl2ZU9iamVjdENyZWF0ZSIsIiQiLCIkZm9yRWFjaCIsImZvckVhY2giLCJjcmVhdGUiLCJJRV9QUk9UTyIsIk9iamVjdFByb3RvdHlwZSIsIkNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiIsImdldFByb3RvdHlwZU9mIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJyZXR1cm5UaGlzIiwiSXRlcmF0b3JzIiwiSXRlcmF0b3JzQ29yZSIsIkJVR0dZX1NBRkFSSV9JVEVSQVRPUlMiLCJJVEVSQVRPUiIsInNldFByb3RvdHlwZU9mIiwic2V0SW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJ1c2VyQWdlbnQiLCJTUEVDSUVTIiwiVjhfVkVSU0lPTiIsIlVTRVNfVE9fTEVOR1RIIiwibWF4IiwibmF0aXZlR2V0UHJvdG90eXBlT2YiLCJUT19TVFJJTkdfVEFHIiwidGVzdCIsIlRPX1NUUklOR19UQUdfU1VQUE9SVCIsIkFycmF5UHJvdG90eXBlIiwic2V0IiwicHJvY2VzcyIsIklTX05PREUiLCJJU19JT1MiLCJyZXF1aXJlJCQxIiwiUHJvbWlzZSIsInRhc2siLCJOYXRpdmVQcm9taXNlIiwiVHlwZUVycm9yIiwibmV3UHJvbWlzZUNhcGFiaWxpdHkiLCJuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSIsIm5vdGlmeSIsImZsYWdzIiwiRE9NSXRlcmFibGVzIiwiQXJyYXlJdGVyYXRvck1ldGhvZHMiLCJDT0xMRUNUSU9OX05BTUUiLCJDb2xsZWN0aW9uIiwiQ29sbGVjdGlvblByb3RvdHlwZSIsInJ1bnRpbWUiLCJleHBvcnRzIiwiZGVmaW5lIiwib2JqIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwibWV0aG9kIiwiQXN5bmNJdGVyYXRvciIsIlByb21pc2VJbXBsIiwiaW52b2tlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlY29yZCIsInJlc3VsdCIsImhhc093biIsIl9fYXdhaXQiLCJ0aGVuIiwidW53cmFwcGVkIiwiZXJyb3IiLCJlbnF1ZXVlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJwcmV2aW91c1Byb21pc2UiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwiQ29udGludWVTZW50aW5lbCIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiZG9uZSIsIml0ZXJhdG9yIiwiaW5mbyIsInJlc3VsdE5hbWUiLCJuZXh0IiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwidmFsdWVzIiwiaXRlcmFibGUiLCJpdGVyYXRvck1ldGhvZCIsIml0ZXJhdG9yU3ltYm9sIiwiaXNOYU4iLCJsZW5ndGgiLCJpIiwiT3AiLCJoYXNPd25Qcm9wZXJ0eSIsIiRTeW1ib2wiLCJhc3luY0l0ZXJhdG9yU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsInRvU3RyaW5nVGFnU3ltYm9sIiwidG9TdHJpbmdUYWciLCJnZXRQcm90byIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImdlbkZ1biIsImN0b3IiLCJuYW1lIiwibWFyayIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJpdGVyIiwia2V5cyIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RFbnRyeSIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwibW9kdWxlIiwicmVnZW5lcmF0b3JSdW50aW1lIiwiYWNjaWRlbnRhbFN0cmljdE1vZGUiLCJGdW5jdGlvbiIsIlNUUklDVF9NRVRIT0QiLCJIQVNfU1BFQ0lFU19TVVBQT1JUIiwiZmxvb3IiLCJSYW5nZUVycm9yIiwiSUVFRTc1NCIsImdldCIsIk5BVElWRV9BUlJBWV9CVUZGRVIiLCJBUlJBWV9CVUZGRVIiLCJBcnJheUJ1ZmZlciIsImFycmF5QnVmZmVyTW9kdWxlIiwiTmF0aXZlQXJyYXlCdWZmZXIiLCJBcnJheUJ1ZmZlck1vZHVsZSIsIkRhdGFWaWV3IiwiRkFJTFNfT05fUFJJTUlUSVZFUyIsIlVOU1VQUE9SVEVEX1kiLCJzdGlja3lIZWxwZXJzIiwiZXhlYyIsImZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljIiwicmVnRXhwRXhlYyIsImlzUmVnRXhwIiwiY2FsbFJlZ0V4cEV4ZWMiLCJmb3JjZWRTdHJpbmdUcmltTWV0aG9kIiwiSW50OEFycmF5IiwiTkFNRSIsIk5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MiLCJhVHlwZWRBcnJheUNvbnN0cnVjdG9yIiwiQXJyYXlCdWZmZXJWaWV3Q29yZSIsIlRZUEVEX0FSUkFZU19DT05TVFJVQ1RPUlNfUkVRVUlSRVNfV1JBUFBFUlMiLCJjcmVhdGVUeXBlZEFycmF5Q29uc3RydWN0b3IiLCJhVHlwZWRBcnJheSIsImV4cG9ydFR5cGVkQXJyYXlNZXRob2QiLCIkY29weVdpdGhpbiIsIiRmaWxsIiwiJGluZGV4T2YiLCJVaW50OEFycmF5IiwiQXJyYXlJdGVyYXRvcnMiLCJORUdBVElWRV9aRVJPIiwiRk9SQ0VEIiwiJGxhc3RJbmRleE9mIiwiJG1hcCIsIiRzbGljZSIsIklTX1BVUkUiLCIkZmV0Y2giLCJVU0VfTkFUSVZFX1VSTCIsIlVSTFNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtc01vZHVsZSIsInBvdyIsInRvQVNDSUkiLCJhc3NpZ24iLCJnbG9iYWxUaGlzIiwic3VwcG9ydCIsInNlYXJjaFBhcmFtcyIsImJsb2IiLCJCbG9iIiwiZSIsImZvcm1EYXRhIiwiYXJyYXlCdWZmZXIiLCJpc0RhdGFWaWV3IiwiaXNQcm90b3R5cGVPZiIsInZpZXdDbGFzc2VzIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJpc1ZpZXciLCJpbmRleE9mIiwibm9ybWFsaXplTmFtZSIsInRvTG93ZXJDYXNlIiwibm9ybWFsaXplVmFsdWUiLCJpdGVyYXRvckZvciIsIml0ZW1zIiwic2hpZnQiLCJIZWFkZXJzIiwiaGVhZGVycyIsIm1hcCIsImFwcGVuZCIsIkFycmF5IiwiaXNBcnJheSIsImhlYWRlciIsImdldE93blByb3BlcnR5TmFtZXMiLCJvbGRWYWx1ZSIsImNhbGxiYWNrIiwidGhpc0FyZyIsImVudHJpZXMiLCJjb25zdW1lZCIsImJvZHkiLCJib2R5VXNlZCIsImZpbGVSZWFkZXJSZWFkeSIsInJlYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJyZWFkQmxvYkFzQXJyYXlCdWZmZXIiLCJGaWxlUmVhZGVyIiwicHJvbWlzZSIsInJlYWRBc0FycmF5QnVmZmVyIiwicmVhZEJsb2JBc1RleHQiLCJyZWFkQXNUZXh0IiwicmVhZEFycmF5QnVmZmVyQXNUZXh0IiwiYnVmIiwidmlldyIsImNoYXJzIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiam9pbiIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJGb3JtRGF0YSIsIl9ib2R5Rm9ybURhdGEiLCJfYm9keUFycmF5QnVmZmVyIiwicmVqZWN0ZWQiLCJpc0NvbnN1bWVkIiwiYnl0ZU9mZnNldCIsInRleHQiLCJkZWNvZGUiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsIm5vcm1hbGl6ZU1ldGhvZCIsInVwY2FzZWQiLCJ0b1VwcGVyQ2FzZSIsIlJlcXVlc3QiLCJpbnB1dCIsIm9wdGlvbnMiLCJ1cmwiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJzaWduYWwiLCJyZWZlcnJlciIsImNhY2hlIiwicmVQYXJhbVNlYXJjaCIsInJlcGxhY2UiLCJEYXRlIiwiZ2V0VGltZSIsImNsb25lIiwiZm9ybSIsInRyaW0iLCJzcGxpdCIsImJ5dGVzIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VIZWFkZXJzIiwicmF3SGVhZGVycyIsInByZVByb2Nlc3NlZEhlYWRlcnMiLCJzdWJzdHIiLCJsaW5lIiwicGFydHMiLCJSZXNwb25zZSIsImJvZHlJbml0Iiwic3RhdHVzIiwib2siLCJzdGF0dXNUZXh0IiwicmVzcG9uc2UiLCJyZWRpcmVjdFN0YXR1c2VzIiwicmVkaXJlY3QiLCJsb2NhdGlvbiIsIkRPTUV4Y2VwdGlvbiIsIm1lc3NhZ2UiLCJzdGFjayIsImZldGNoIiwiaW5pdCIsImFib3J0WGhyIiwieGhyIiwiYWJvcnQiLCJyZXF1ZXN0IiwiYWJvcnRlZCIsIlhNTEh0dHBSZXF1ZXN0IiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZVRleHQiLCJzZXRUaW1lb3V0Iiwib250aW1lb3V0Iiwib25hYm9ydCIsIm9wZW4iLCJocmVmIiwid2l0aENyZWRlbnRpYWxzIiwicmVzcG9uc2VUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNlbmQiLCJwb2x5ZmlsbCIsInRpbWVvdXRTZWNvbmRzIiwidGltZW91dE1pbGxpc2Vjb25kcyIsInRpbWVvdXRXYXJuaW5nIiwidXBkYXRlTG9hZGVyV2FybmluZyIsInNob3dFcnJvciIsImlmcmFtZSIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJkaXNwbGF5IiwibG9hZGVyIiwiZXJyb3JFbGVtZW50IiwidGV4dENvbnRlbnQiLCJjb250ZW50IiwicXVlcnlTZWxlY3RvciIsInJlbW90ZVN0YXR1cyIsInVwZGF0ZVRyb3VibGVzaG9vdGluZ01lc3NhZ2UiLCJ0cm91Ymxlc2hvb3RpbmdFbGVtZW50IiwiaW5uZXJIVE1MIiwicHJldmlld1dhcm5pbmdQIiwiY2FuY2VsQnV0dG9uIiwiY2FuY2VsUHJldmlld0xvYWRlciIsIiRpbmNsdWRlcyIsInByZXZpZXdGcm9udGVuZElzT25saW5lUXVlcnkiLCJwcmV2aWV3U3RhdHVzUXVlcnkiLCJyZW1vdGVTdGF0dXNlcyIsImZldGNoUHJldmlld1N0YXR1c0FuZFVwZGF0ZVVJIiwicmVmZXRjaENvdW50IiwicmVmZXRjaERlbGF5IiwiaW5pdGlhbFN0YXRlIiwid29yZHByZXNzU2l0ZVVybCIsImdyYXBocWxFbmRwb2ludCIsInN0cmluZ2lmeSIsInF1ZXJ5IiwidmFyaWFibGVzIiwicG9zdElkIiwiZGF0YSIsIndwR2F0c2J5IiwiZ2F0c2J5UHJldmlld1N0YXR1cyIsInN0YXR1c1R5cGUiLCJzdGF0dXNDb250ZXh0IiwiaXNTcGVjaWFsU3RhdHVzIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIiwiY2xlYXJUaW1lb3V0Iiwib25QcmV2aWV3UmVhZHlVcGRhdGVVSSIsInJlZmV0Y2hEZWxheU1hcCIsInByZXZpZXdSZWFkeSIsInBhZ2VOb2RlIiwicGF0aCIsInByZXZpZXdJZnJhbWUiLCJvbklmcmFtZUxvYWRlZEhpZGVMb2FkZXJVSSIsInNyYyIsInByZXZpZXdGcm9udGVuZFVybCIsImV2ZW50IiwiRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVxdWVzdFByZXZpZXdGcm9udGVuZElzT25saW5lIiwiaXNQcmV2aWV3RnJvbnRlbmRPbmxpbmUiLCJmcm9udGVuZE9ubGluZUNoZWNrQ291bnQiLCJkb3VibGVDaGVja0lmUHJldmlld0Zyb250ZW5kSXNPbmxpbmUiLCJwcmV2aWV3RnJvbnRlbmRJc09ubGluZSIsInN0YXJ0IiwiY2F0Y2giLCJwcmV2aWV3V2ViaG9va0lzT25saW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDMUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Q0FDckMsQ0FBQyxDQUFDO0NBR0YsWUFBYztDQUVkLEVBQUUsS0FBSyxDQUFDLE9BQU8sVUFBVSxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUM7Q0FDcEQsRUFBRSxLQUFLLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztDQUM1QyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0NBQ3hDLEVBQUUsS0FBSyxDQUFDLE9BQU9BLGNBQU0sSUFBSSxRQUFRLElBQUlBLGNBQU0sQ0FBQztDQUU1QyxFQUFFLENBQUMsWUFBWSxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTs7Q0NaL0QsU0FBYyxHQUFHLFVBQVUsSUFBSSxFQUFFO0NBQ2pDLEVBQUUsSUFBSTtDQUNOLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDcEIsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ2xCLElBQUksT0FBTyxJQUFJLENBQUM7Q0FDaEIsR0FBRztDQUNILENBQUM7O0NDSEQsZUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDcEMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEYsQ0FBQyxDQUFDOztDQ0pGLElBQUksMEJBQTBCLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0NBQ3pELElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0NBRy9ELElBQUksV0FBVyxHQUFHLHdCQUF3QixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBSTVGLEtBQVMsR0FBRyxXQUFXLEdBQUcsU0FBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUU7Q0FDM0QsRUFBRSxJQUFJLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDckQsRUFBRSxPQUFPLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQztDQUMvQyxDQUFDLEdBQUcsMEJBQTBCOzs7OztDQ1o5Qiw0QkFBYyxHQUFHLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRTtDQUMxQyxFQUFFLE9BQU87Q0FDVCxJQUFJLFVBQVUsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDN0IsSUFBSSxZQUFZLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQy9CLElBQUksUUFBUSxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUMzQixJQUFJLEtBQUssRUFBRSxLQUFLO0NBQ2hCLEdBQUcsQ0FBQztDQUNKLENBQUM7O0NDUEQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztDQUUzQixjQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hDLENBQUM7O0NDREQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUdyQixpQkFBYyxHQUFHLEtBQUssQ0FBQyxZQUFZO0NBR25DLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNuQixFQUFFLE9BQU9DLFVBQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ25FLENBQUMsR0FBRyxNQUFNOztDQ1ZWLDBCQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDckUsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUNaLENBQUM7O0NDREQsbUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU9DLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ25ELENBQUM7O0NDTkQsWUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsT0FBTyxPQUFPLEVBQUUsS0FBSyxRQUFRLEdBQUcsRUFBRSxLQUFLLElBQUksR0FBRyxPQUFPLEVBQUUsS0FBSyxVQUFVLENBQUM7Q0FDekUsQ0FBQzs7Q0NJRCxlQUFjLEdBQUcsVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7Q0FDcEQsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO0NBQ2QsRUFBRSxJQUFJLGdCQUFnQixJQUFJLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQztDQUNwSCxFQUFFLElBQUksUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDO0NBQy9GLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQztDQUNySCxFQUFFLE1BQU0sU0FBUyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7Q0FDN0QsQ0FBQzs7Q0NiRCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0NBRXZDLE9BQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUU7Q0FDcEMsRUFBRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3RDLENBQUM7O0NDREQsSUFBSUMsVUFBUSxHQUFHSCxRQUFNLENBQUMsUUFBUSxDQUFDO0NBRS9CLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQ0csVUFBUSxDQUFDLElBQUksUUFBUSxDQUFDQSxVQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FFcEUseUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU8sTUFBTSxHQUFHQSxVQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNsRCxDQUFDOztDQ0pELGdCQUFjLEdBQUcsQ0FBQ0MsV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDcEQsRUFBRSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUNDLHFCQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFO0NBQzFELElBQUksR0FBRyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFO0NBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDWixDQUFDLENBQUM7O0NDREYsSUFBSSw4QkFBOEIsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUM7Q0FJckUsT0FBUyxHQUFHRCxXQUFXLEdBQUcsOEJBQThCLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQ25HLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6QixFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzNCLEVBQUUsSUFBSUUsWUFBYyxFQUFFLElBQUk7Q0FDMUIsSUFBSSxPQUFPLDhCQUE4QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNoRCxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBZTtDQUNqQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLHdCQUF3QixDQUFDLENBQUNDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pHLENBQUM7Ozs7O0NDakJELFlBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDckIsSUFBSSxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztDQUN0RCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDZCxDQUFDOztDQ0RELElBQUksb0JBQW9CLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztDQUlqRCxPQUFTLEdBQUdILFdBQVcsR0FBRyxvQkFBb0IsR0FBRyxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRTtDQUMzRixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNkLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDM0IsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDdkIsRUFBRSxJQUFJRSxZQUFjLEVBQUUsSUFBSTtDQUMxQixJQUFJLE9BQU8sb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNsRCxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBZTtDQUNqQyxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVUsSUFBSSxLQUFLLElBQUksVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Q0FDN0YsRUFBRSxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7Q0FDckQsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNYLENBQUM7Ozs7O0NDZkQsK0JBQWMsR0FBR0YsV0FBVyxHQUFHLFVBQVUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDN0QsRUFBRSxPQUFPSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNqRixDQUFDLEdBQUcsVUFBVSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUNsQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDdEIsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDOztDQ05ELGFBQWMsR0FBRyxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDdkMsRUFBRSxJQUFJO0NBQ04sSUFBSSwyQkFBMkIsQ0FBQ1IsUUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNwRCxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSUEsUUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN4QixHQUFHLENBQUMsT0FBTyxLQUFLLENBQUM7Q0FDakIsQ0FBQzs7Q0NORCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztDQUNsQyxJQUFJLEtBQUssR0FBR0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FFcEQsZUFBYyxHQUFHLEtBQUs7O0NDSnRCLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztDQUd6QyxJQUFJLE9BQU9TLFdBQUssQ0FBQyxhQUFhLElBQUksVUFBVSxFQUFFO0NBQzlDLEVBQUVBLFdBQUssQ0FBQyxhQUFhLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDdEMsSUFBSSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQyxHQUFHLENBQUM7Q0FDSixDQUFDO0NBRUQsaUJBQWMsR0FBR0EsV0FBSyxDQUFDLGFBQWE7O0NDUnBDLElBQUksT0FBTyxHQUFHVCxRQUFNLENBQUMsT0FBTyxDQUFDO0NBRTdCLGlCQUFjLEdBQUcsT0FBTyxPQUFPLEtBQUssVUFBVSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztDQ0w1RixVQUFjLEdBQUcsS0FBSzs7O0NDR3RCLENBQUMsY0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUN4QyxFQUFFLE9BQU9TLFdBQUssQ0FBQyxHQUFHLENBQUMsS0FBS0EsV0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssS0FBSyxTQUFTLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0NBQ3hCLEVBQUUsT0FBTyxFQUFFLE9BQU87Q0FDbEIsRUFBRSxJQUFJLEdBQXFCLFFBQVE7Q0FDbkMsRUFBRSxTQUFTLEVBQUUsc0NBQXNDO0NBQ25ELENBQUMsQ0FBQzs7O0NDVEYsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ1gsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0NBRTVCLE9BQWMsR0FBRyxVQUFVLEdBQUcsRUFBRTtDQUNoQyxFQUFFLE9BQU8sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2pHLENBQUM7O0NDRkQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTFCLGFBQWMsR0FBRyxVQUFVLEdBQUcsRUFBRTtDQUNoQyxFQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM3QyxDQUFDOztDQ1BELGNBQWMsR0FBRyxFQUFFOztDQ1NuQixJQUFJQyxTQUFPLEdBQUdWLFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFVyxLQUFHLENBQUM7Q0FFbEIsSUFBSSxPQUFPLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDNUIsRUFBRSxPQUFPQSxLQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDekMsQ0FBQyxDQUFDO0NBRUYsSUFBSSxTQUFTLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLFVBQVUsRUFBRSxFQUFFO0NBQ3ZCLElBQUksSUFBSSxLQUFLLENBQUM7Q0FDZCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksS0FBSyxJQUFJLEVBQUU7Q0FDMUQsTUFBTSxNQUFNLFNBQVMsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUM7Q0FDdEUsS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDO0NBQ25CLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztDQUVGLElBQUlDLGFBQWUsRUFBRTtDQUNyQixFQUFFLElBQUlILE9BQUssR0FBR0ksV0FBTSxDQUFDLEtBQUssS0FBS0EsV0FBTSxDQUFDLEtBQUssR0FBRyxJQUFJSCxTQUFPLEVBQUUsQ0FBQyxDQUFDO0NBQzdELEVBQUUsSUFBSSxLQUFLLEdBQUdELE9BQUssQ0FBQyxHQUFHLENBQUM7Q0FDeEIsRUFBRSxJQUFJLEtBQUssR0FBR0EsT0FBSyxDQUFDLEdBQUcsQ0FBQztDQUN4QixFQUFFLElBQUksS0FBSyxHQUFHQSxPQUFLLENBQUMsR0FBRyxDQUFDO0NBQ3hCLEVBQUUsR0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRTtDQUNoQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQ0EsT0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNwQyxJQUFJLE9BQU8sUUFBUSxDQUFDO0NBQ3BCLEdBQUcsQ0FBQztDQUNKLEVBQUUsR0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3RCLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDQSxPQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0NBQ3ZDLEdBQUcsQ0FBQztDQUNKLEVBQUVFLEtBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUN0QixJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQ0YsT0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ2pDLEdBQUcsQ0FBQztDQUNKLENBQUMsTUFBTTtDQUNQLEVBQUUsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztDQUMzQixFQUFFLEdBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUU7Q0FDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUN6QixJQUFJLDJCQUEyQixDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDckQsSUFBSSxPQUFPLFFBQVEsQ0FBQztDQUNwQixHQUFHLENBQUM7Q0FDSixFQUFFLEdBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUN0QixJQUFJLE9BQU9LLEdBQVMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNqRCxHQUFHLENBQUM7Q0FDSixFQUFFSCxLQUFHLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDdEIsSUFBSSxPQUFPRyxHQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsQ0FBQztDQUNKLENBQUM7Q0FFRCxpQkFBYyxHQUFHO0NBQ2pCLEVBQUUsR0FBRyxFQUFFLEdBQUc7Q0FDVixFQUFFLEdBQUcsRUFBRSxHQUFHO0NBQ1YsRUFBRSxHQUFHLEVBQUVILEtBQUc7Q0FDVixFQUFFLE9BQU8sRUFBRSxPQUFPO0NBQ2xCLEVBQUUsU0FBUyxFQUFFLFNBQVM7Q0FDdEIsQ0FBQzs7O0NDeERELElBQUksZ0JBQWdCLEdBQUdJLGFBQW1CLENBQUMsR0FBRyxDQUFDO0NBQy9DLElBQUksb0JBQW9CLEdBQUdBLGFBQW1CLENBQUMsT0FBTyxDQUFDO0NBQ3ZELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FFOUMsQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7Q0FDcEQsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0NBQ2xELEVBQUUsSUFBSSxNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztDQUN0RCxFQUFFLElBQUksV0FBVyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Q0FDNUQsRUFBRSxJQUFJLEtBQUssQ0FBQztDQUNaLEVBQUUsSUFBSSxPQUFPLEtBQUssSUFBSSxVQUFVLEVBQUU7Q0FDbEMsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUU7Q0FDdkQsTUFBTSwyQkFBMkIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3RELEtBQUs7Q0FDTCxJQUFJLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN4QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0NBQ3ZCLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDdEUsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLElBQUksQ0FBQyxLQUFLZixRQUFNLEVBQUU7Q0FDcEIsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQy9CLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMvQixJQUFJLE9BQU87Q0FDWCxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRTtDQUN0QixJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtDQUNyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Q0FDbEIsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUM3QixPQUFPLDJCQUEyQixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FFbEQsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsUUFBUSxHQUFHO0NBQ3ZELEVBQUUsT0FBTyxPQUFPLElBQUksSUFBSSxVQUFVLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzRixDQUFDLENBQUM7OztDQ3JDRixRQUFjLEdBQUdBLFFBQU07O0NDQ3ZCLElBQUksU0FBUyxHQUFHLFVBQVUsUUFBUSxFQUFFO0NBQ3BDLEVBQUUsT0FBTyxPQUFPLFFBQVEsSUFBSSxVQUFVLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQztDQUM5RCxDQUFDLENBQUM7Q0FFRixjQUFjLEdBQUcsVUFBVSxTQUFTLEVBQUUsTUFBTSxFQUFFO0NBQzlDLEVBQUUsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDQSxRQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDMUYsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJQSxRQUFNLENBQUMsU0FBUyxDQUFDLElBQUlBLFFBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNuRyxDQUFDOztDQ1ZELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztDQUl2QixhQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDckMsRUFBRSxPQUFPLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDbkYsQ0FBQzs7Q0NMRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0NBSW5CLFlBQWMsR0FBRyxVQUFVLFFBQVEsRUFBRTtDQUNyQyxFQUFFLE9BQU8sUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZFLENBQUM7O0NDTkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUNuQixJQUFJZ0IsS0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FLbkIsbUJBQWMsR0FBRyxVQUFVLEtBQUssRUFBRSxNQUFNLEVBQUU7Q0FDMUMsRUFBRSxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDakMsRUFBRSxPQUFPLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUdBLEtBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdkUsQ0FBQzs7Q0NORCxJQUFJLFlBQVksR0FBRyxVQUFVLFdBQVcsRUFBRTtDQUMxQyxFQUFFLE9BQU8sVUFBVSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRTtDQUN6QyxJQUFJLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNuQyxJQUFJLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDcEMsSUFBSSxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ25ELElBQUksSUFBSSxLQUFLLENBQUM7Q0FHZCxJQUFJLElBQUksV0FBVyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxNQUFNLEdBQUcsS0FBSyxFQUFFO0NBQ3hELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBRXpCLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFLE9BQU8sSUFBSSxDQUFDO0NBRXRDLEtBQUssTUFBTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDMUMsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLFdBQVcsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQzNGLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztDQUVGLGlCQUFjLEdBQUc7Q0FHakIsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQztDQUc5QixFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDO0NBQzlCLENBQUM7O0NDN0JELElBQUksT0FBTyxHQUFHQyxhQUFzQyxDQUFDLE9BQU8sQ0FBQztDQUc3RCxzQkFBYyxHQUFHLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRTtDQUMxQyxFQUFFLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNsQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNaLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxHQUFHLENBQUM7Q0FDVixFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBRTFFLEVBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Q0FDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM5QyxHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDOztDQ2ZELGVBQWMsR0FBRztDQUNqQixFQUFFLGFBQWE7Q0FDZixFQUFFLGdCQUFnQjtDQUNsQixFQUFFLGVBQWU7Q0FDakIsRUFBRSxzQkFBc0I7Q0FDeEIsRUFBRSxnQkFBZ0I7Q0FDbEIsRUFBRSxVQUFVO0NBQ1osRUFBRSxTQUFTO0NBQ1gsQ0FBQzs7Q0NORCxJQUFJQyxZQUFVLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FJM0QsT0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSxTQUFTLG1CQUFtQixDQUFDLENBQUMsRUFBRTtDQUMxRSxFQUFFLE9BQU9DLGtCQUFrQixDQUFDLENBQUMsRUFBRUQsWUFBVSxDQUFDLENBQUM7Q0FDM0MsQ0FBQzs7Ozs7Q0NURCxPQUFTLEdBQUcsTUFBTSxDQUFDLHFCQUFxQjs7Ozs7Q0NNeEMsV0FBYyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksU0FBUyxPQUFPLENBQUMsRUFBRSxFQUFFO0NBQzFFLEVBQUUsSUFBSSxJQUFJLEdBQUdFLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxFQUFFLElBQUkscUJBQXFCLEdBQUdDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztDQUM1RCxFQUFFLE9BQU8scUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUMvRSxDQUFDOztDQ0xELDZCQUFjLEdBQUcsVUFBVSxNQUFNLEVBQUUsTUFBTSxFQUFFO0NBQzNDLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzdCLEVBQUUsSUFBSSxjQUFjLEdBQUdiLG9CQUFvQixDQUFDLENBQUMsQ0FBQztDQUM5QyxFQUFFLElBQUksd0JBQXdCLEdBQUdjLDhCQUE4QixDQUFDLENBQUMsQ0FBQztDQUNsRSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0NBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDOUYsR0FBRztDQUNILENBQUM7O0NDWEQsSUFBSSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7Q0FFcEMsSUFBSSxRQUFRLEdBQUcsVUFBVSxPQUFPLEVBQUUsU0FBUyxFQUFFO0NBQzdDLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDLEVBQUUsT0FBTyxLQUFLLElBQUksUUFBUSxHQUFHLElBQUk7Q0FDakMsTUFBTSxLQUFLLElBQUksTUFBTSxHQUFHLEtBQUs7Q0FDN0IsTUFBTSxPQUFPLFNBQVMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztDQUN2RCxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7Q0FDbEIsQ0FBQyxDQUFDO0NBRUYsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLE1BQU0sRUFBRTtDQUN2RCxFQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Q0FDaEUsQ0FBQyxDQUFDO0NBRUYsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDOUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7Q0FDbkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Q0FFdkMsY0FBYyxHQUFHLFFBQVE7O0NDbkJ6QixJQUFJQywwQkFBd0IsR0FBR04sOEJBQTBELENBQUMsQ0FBQyxDQUFDO0NBcUI1RixXQUFjLEdBQUcsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0NBQzVDLEVBQUUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUM5QixFQUFFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDOUIsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQzVCLEVBQUUsSUFBSSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztDQUN0RSxFQUFFLElBQUksTUFBTSxFQUFFO0NBQ2QsSUFBSSxNQUFNLEdBQUdqQixRQUFNLENBQUM7Q0FDcEIsR0FBRyxNQUFNLElBQUksTUFBTSxFQUFFO0NBQ3JCLElBQUksTUFBTSxHQUFHQSxRQUFNLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNyRCxHQUFHLE1BQU07Q0FDVCxJQUFJLE1BQU0sR0FBRyxDQUFDQSxRQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsQ0FBQztDQUM5QyxHQUFHO0NBQ0gsRUFBRSxJQUFJLE1BQU0sRUFBRSxLQUFLLEdBQUcsSUFBSSxNQUFNLEVBQUU7Q0FDbEMsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2pDLElBQUksSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO0NBQzdCLE1BQU0sVUFBVSxHQUFHdUIsMEJBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3pELE1BQU0sY0FBYyxHQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDO0NBQ3RELEtBQUssTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3hDLElBQUksTUFBTSxHQUFHQyxVQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTFGLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO0NBQ2pELE1BQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxPQUFPLGNBQWMsRUFBRSxTQUFTO0NBQ3BFLE1BQU0seUJBQXlCLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQ2hFLEtBQUs7Q0FFTCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0NBQ2pFLE1BQU0sMkJBQTJCLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNoRSxLQUFLO0NBRUwsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDbkQsR0FBRztDQUNILENBQUM7O0NDbkRELGdCQUFjLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBR3RFLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0NBQzNCLENBQUMsQ0FBQzs7Q0NKRixrQkFBYyxHQUFHQyxZQUFhO0NBRTlCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSTtDQUVqQixLQUFLLE9BQU8sTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFROztDQ0Z2QyxXQUFjLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Q0FDeEQsRUFBRSxPQUFPeEIsVUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQztDQUNqQyxDQUFDOztDQ0ZELFlBQWMsR0FBRyxVQUFVLFFBQVEsRUFBRTtDQUNyQyxFQUFFLE9BQU8sTUFBTSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Q0FDbEQsQ0FBQzs7Q0NERCxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUU7Q0FDakQsRUFBRSxPQUFPa0Isa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0NBQzVDLENBQUM7O0NDQUQsMEJBQWMsR0FBR2YsV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUU7Q0FDbEcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDZCxFQUFFLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNwQyxFQUFFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Q0FDM0IsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLEdBQUcsQ0FBQztDQUNWLEVBQUUsT0FBTyxNQUFNLEdBQUcsS0FBSyxFQUFFSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUN6RixFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ1gsQ0FBQzs7Q0NiRCxRQUFjLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQzs7Q0NNMUQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0NBQ2IsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0NBQ2IsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDO0NBQzVCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztDQUN0QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FFckMsSUFBSSxnQkFBZ0IsR0FBRyxZQUFZLElBQWUsQ0FBQztDQUVuRCxJQUFJLFNBQVMsR0FBRyxVQUFVLE9BQU8sRUFBRTtDQUNuQyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUM3RCxDQUFDLENBQUM7Q0FHRixJQUFJLHlCQUF5QixHQUFHLFVBQVUsZUFBZSxFQUFFO0NBQzNELEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2QyxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUMxQixFQUFFLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0NBQ2pELEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQztDQUN6QixFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ2QsQ0FBQyxDQUFDO0NBR0YsSUFBSSx3QkFBd0IsR0FBRyxZQUFZO0NBRTNDLEVBQUUsSUFBSSxNQUFNLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDL0MsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztDQUNqQyxFQUFFLElBQUksY0FBYyxDQUFDO0NBQ3JCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0NBQ2hDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUUzQixFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzFCLEVBQUUsY0FBYyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0NBQ2pELEVBQUUsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0NBQ3hCLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3pCLEVBQUUsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDO0NBQzFCLENBQUMsQ0FBQztDQU9GLElBQUksZUFBZSxDQUFDO0NBQ3BCLElBQUksZUFBZSxHQUFHLFlBQVk7Q0FDbEMsRUFBRSxJQUFJO0NBRU4sSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUN2RSxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBZ0I7Q0FDbEMsRUFBRSxlQUFlLEdBQUcsZUFBZSxHQUFHLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLHdCQUF3QixFQUFFLENBQUM7Q0FDOUcsRUFBRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0NBQ2xDLEVBQUUsT0FBTyxNQUFNLEVBQUUsRUFBRSxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUMxRSxFQUFFLE9BQU8sZUFBZSxFQUFFLENBQUM7Q0FDM0IsQ0FBQyxDQUFDO0NBRUYsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUk1QixnQkFBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRTtDQUNqRSxFQUFFLElBQUksTUFBTSxDQUFDO0NBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Q0FDbEIsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0NBQ3BDLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBRXZDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN6QixHQUFHLE1BQU0sTUFBTSxHQUFHLGVBQWUsRUFBRSxDQUFDO0NBQ3BDLEVBQUUsT0FBTyxVQUFVLEtBQUssU0FBUyxHQUFHLE1BQU0sR0FBR2tCLHNCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNsRixDQUFDOztDQzVFRCxJQUFJLHlCQUF5QixHQUFHVCx5QkFBcUQsQ0FBQyxDQUFDLENBQUM7Q0FFeEYsSUFBSVUsVUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7Q0FFM0IsSUFBSSxXQUFXLEdBQUcsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsbUJBQW1CO0NBQ25GLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUU1QyxJQUFJLGNBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNuQyxFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8seUJBQXlCLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDekMsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ2xCLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDL0IsR0FBRztDQUNILENBQUMsQ0FBQztDQUdGLE9BQWdCLEdBQUcsU0FBUyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUU7Q0FDcEQsRUFBRSxPQUFPLFdBQVcsSUFBSUEsVUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBaUI7Q0FDOUQsTUFBTSxjQUFjLENBQUMsRUFBRSxDQUFDO0NBQ3hCLE1BQU0seUJBQXlCLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDckQsQ0FBQzs7Ozs7Q0NkRCxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQyxJQUFJQyxRQUFNLEdBQUc1QixRQUFNLENBQUMsTUFBTSxDQUFDO0NBQzNCLElBQUkscUJBQXFCLEdBQUc2QixjQUFpQixHQUFHRCxRQUFNLEdBQUdBLFFBQU0sSUFBSUEsUUFBTSxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUM7Q0FFL0YsbUJBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNqQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEVBQUU7Q0FDekMsSUFBSSxJQUFJSCxZQUFhLElBQUksR0FBRyxDQUFDRyxRQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUdBLFFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN2RixTQUFTLHFCQUFxQixDQUFDLElBQUksQ0FBQyxHQUFHLHFCQUFxQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUMvRSxHQUFHLENBQUMsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN2QyxDQUFDOztDQ2RELE9BQVMsR0FBRyxlQUFlOzs7OztDQ0MzQixJQUFJLGNBQWMsR0FBR1gsb0JBQThDLENBQUMsQ0FBQyxDQUFDO0NBRXRFLHlCQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDakMsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDakQsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtDQUN2RCxJQUFJLEtBQUssRUFBRWEsc0JBQTRCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztDQUMvQyxHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7O0NDVkQsSUFBSUMsZ0JBQWMsR0FBR2Qsb0JBQThDLENBQUMsQ0FBQyxDQUFDO0NBSXRFLElBQUksYUFBYSxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUVuRCxrQkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Q0FDNUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFO0NBQ2xFLElBQUljLGdCQUFjLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDMUUsR0FBRztDQUNILENBQUM7O0NDVkQsZUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxPQUFPLEVBQUUsSUFBSSxVQUFVLEVBQUU7Q0FDL0IsSUFBSSxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztDQUN2RCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDZCxDQUFDOztDQ0RELHVCQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUM3QyxFQUFFQyxXQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUM7Q0FDcEMsRUFBRSxRQUFRLE1BQU07Q0FDaEIsSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLFlBQVk7Q0FDL0IsTUFBTSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDM0IsS0FBSyxDQUFDO0NBQ04sSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFO0NBQ2hDLE1BQU0sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM5QixLQUFLLENBQUM7Q0FDTixJQUFJLEtBQUssQ0FBQyxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQ25DLE1BQU0sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDakMsS0FBSyxDQUFDO0NBQ04sSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDdEMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDcEMsS0FBSyxDQUFDO0NBQ04sR0FBRztDQUNILEVBQUUsT0FBTyxZQUF5QjtDQUNsQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDckMsR0FBRyxDQUFDO0NBQ0osQ0FBQzs7Q0NuQkQsSUFBSSxPQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBSXpDLHNCQUFjLEdBQUcsVUFBVSxhQUFhLEVBQUUsTUFBTSxFQUFFO0NBQ2xELEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDUixFQUFFLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO0NBQzlCLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUM7Q0FFbEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFVBQVUsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0NBQ3ZGLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3JCLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDcEMsS0FBSztDQUNMLEdBQUcsQ0FBQyxPQUFPLEtBQUssQ0FBQyxLQUFLLFNBQVMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0NBQ3hFLENBQUM7O0NDYkQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztDQUduQixJQUFJQyxjQUFZLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDbkMsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO0NBQ3pCLEVBQUUsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztDQUM1QixFQUFFLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7Q0FDMUIsRUFBRSxJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO0NBQzNCLEVBQUUsSUFBSSxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztDQUNoQyxFQUFFLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDO0NBQzVDLEVBQUUsT0FBTyxVQUFVLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtDQUM1RCxJQUFJLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM1QixJQUFJLElBQUksSUFBSSxHQUFHL0IsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLElBQUksSUFBSSxhQUFhLEdBQUdnQyxtQkFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDbEQsSUFBSSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLElBQUksSUFBSSxNQUFNLEdBQUcsY0FBYyxJQUFJLGtCQUFrQixDQUFDO0NBQ3RELElBQUksSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO0NBQzNGLElBQUksSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO0NBQ3RCLElBQUksTUFBTSxNQUFNLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Q0FDbEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFCLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzlDLE1BQU0sSUFBSSxJQUFJLEVBQUU7Q0FDaEIsUUFBUSxJQUFJLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO0NBQzNDLGFBQWEsSUFBSSxNQUFNLEVBQUUsUUFBUSxJQUFJO0NBQ3JDLFVBQVUsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FDOUIsVUFBVSxLQUFLLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUMvQixVQUFVLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQy9CLFVBQVUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDM0MsU0FBUyxNQUFNLElBQUksUUFBUSxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQzFDLE9BQU87Q0FDUCxLQUFLO0NBQ0wsSUFBSSxPQUFPLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7Q0FDeEUsR0FBRyxDQUFDO0NBQ0osQ0FBQyxDQUFDO0NBRUYsa0JBQWMsR0FBRztDQUdqQixFQUFFLE9BQU8sRUFBRUQsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUcxQixFQUFFLEdBQUcsRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUd0QixFQUFFLE1BQU0sRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUd6QixFQUFFLElBQUksRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUd2QixFQUFFLEtBQUssRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUd4QixFQUFFLElBQUksRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUd2QixFQUFFLFNBQVMsRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUM1QixDQUFDOztDQzVCRCxJQUFJLFFBQVEsR0FBR2hCLGNBQXVDLENBQUMsT0FBTyxDQUFDO0NBRS9ELElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNqQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7Q0FDdEIsSUFBSWtCLFdBQVMsR0FBRyxXQUFXLENBQUM7Q0FDNUIsSUFBSSxZQUFZLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ2xELElBQUksZ0JBQWdCLEdBQUdwQixhQUFtQixDQUFDLEdBQUcsQ0FBQztDQUMvQyxJQUFJLGdCQUFnQixHQUFHQSxhQUFtQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM3RCxJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUNvQixXQUFTLENBQUMsQ0FBQztDQUN4QyxJQUFJLE9BQU8sR0FBR25DLFFBQU0sQ0FBQyxNQUFNLENBQUM7Q0FDNUIsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztDQUNqRCxJQUFJb0MsZ0NBQThCLEdBQUdkLDhCQUE4QixDQUFDLENBQUMsQ0FBQztDQUN0RSxJQUFJZSxzQkFBb0IsR0FBRzdCLG9CQUFvQixDQUFDLENBQUMsQ0FBQztDQUNsRCxJQUFJOEIsMkJBQXlCLEdBQUdDLGlDQUEyQixDQUFDLENBQUMsQ0FBQztDQUM5RCxJQUFJQyw0QkFBMEIsR0FBR2pDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztDQUM5RCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDbkMsSUFBSSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Q0FDbEQsSUFBSSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztDQUNqRSxJQUFJLHNCQUFzQixHQUFHLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0NBQ2pFLElBQUlrQyx1QkFBcUIsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDMUMsSUFBSSxPQUFPLEdBQUd6QyxRQUFNLENBQUMsT0FBTyxDQUFDO0NBRTdCLElBQUksVUFBVSxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDbUMsV0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUNBLFdBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztDQUdsRixJQUFJLG1CQUFtQixHQUFHL0IsV0FBVyxJQUFJLEtBQUssQ0FBQyxZQUFZO0NBQzNELEVBQUUsT0FBT3NDLFlBQWtCLENBQUNMLHNCQUFvQixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7Q0FDMUQsSUFBSSxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU9BLHNCQUFvQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUNoRixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDYixDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFO0NBQ2pDLEVBQUUsSUFBSSx5QkFBeUIsR0FBR0QsZ0NBQThCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3JGLEVBQUUsSUFBSSx5QkFBeUIsRUFBRSxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzRCxFQUFFQyxzQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3pDLEVBQUUsSUFBSSx5QkFBeUIsSUFBSSxDQUFDLEtBQUssZUFBZSxFQUFFO0NBQzFELElBQUlBLHNCQUFvQixDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQztDQUN4RSxHQUFHO0NBQ0gsQ0FBQyxHQUFHQSxzQkFBb0IsQ0FBQztDQUV6QixJQUFJLElBQUksR0FBRyxVQUFVLEdBQUcsRUFBRSxXQUFXLEVBQUU7Q0FDdkMsRUFBRSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUdLLFlBQWtCLENBQUMsT0FBTyxDQUFDUCxXQUFTLENBQUMsQ0FBQyxDQUFDO0NBQ3hFLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0NBQzNCLElBQUksSUFBSSxFQUFFLE1BQU07Q0FDaEIsSUFBSSxHQUFHLEVBQUUsR0FBRztDQUNaLElBQUksV0FBVyxFQUFFLFdBQVc7Q0FDNUIsR0FBRyxDQUFDLENBQUM7Q0FDTCxFQUFFLElBQUksQ0FBQy9CLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztDQUNyRCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUMsQ0FBQztDQUVGLElBQUksUUFBUSxHQUFHeUIsY0FBaUIsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNqRCxFQUFFLE9BQU8sT0FBTyxFQUFFLElBQUksUUFBUSxDQUFDO0NBQy9CLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNsQixFQUFFLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLE9BQU8sQ0FBQztDQUN2QyxDQUFDLENBQUM7Q0FFRixJQUFJLGVBQWUsR0FBRyxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRTtDQUNoRSxFQUFFLElBQUksQ0FBQyxLQUFLLGVBQWUsRUFBRSxlQUFlLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3BGLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2QsRUFBRSxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2pDLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ3ZCLEVBQUUsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0NBQzVCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Q0FDaEMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRVEsc0JBQW9CLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM1RixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDNUIsS0FBSyxNQUFNO0NBQ1gsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDbkUsTUFBTSxVQUFVLEdBQUdLLFlBQWtCLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdEcsS0FBSyxDQUFDLE9BQU8sbUJBQW1CLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNyRCxHQUFHLENBQUMsT0FBT0wsc0JBQW9CLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNwRCxDQUFDLENBQUM7Q0FFRixJQUFJLGlCQUFpQixHQUFHLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRTtDQUNqRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNkLEVBQUUsSUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQy9DLEVBQUUsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0NBQy9FLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRTtDQUNoQyxJQUFJLElBQUksQ0FBQ2pDLFdBQVcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQzlHLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNYLENBQUMsQ0FBQztDQUVGLElBQUksT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUU7Q0FDN0MsRUFBRSxPQUFPLFVBQVUsS0FBSyxTQUFTLEdBQUdzQyxZQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixDQUFDQSxZQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ2pILENBQUMsQ0FBQztDQUVGLElBQUkscUJBQXFCLEdBQUcsU0FBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUU7Q0FDN0QsRUFBRSxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQy9CLEVBQUUsSUFBSSxVQUFVLEdBQUdGLDRCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDNUQsRUFBRSxJQUFJLElBQUksS0FBSyxlQUFlLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUN0RyxFQUFFLE9BQU8sVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztDQUN4SCxDQUFDLENBQUM7Q0FFRixJQUFJLHlCQUF5QixHQUFHLFNBQVMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUN4RSxFQUFFLElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QixFQUFFLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDakMsRUFBRSxJQUFJLEVBQUUsS0FBSyxlQUFlLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPO0NBQ2xHLEVBQUUsSUFBSSxVQUFVLEdBQUdKLGdDQUE4QixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUMzRCxFQUFFLElBQUksVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0NBQ25GLElBQUksVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Q0FDakMsR0FBRztDQUNILEVBQUUsT0FBTyxVQUFVLENBQUM7Q0FDcEIsQ0FBQyxDQUFDO0NBRUYsSUFBSSxvQkFBb0IsR0FBRyxTQUFTLG1CQUFtQixDQUFDLENBQUMsRUFBRTtDQUMzRCxFQUFFLElBQUksS0FBSyxHQUFHRSwyQkFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1RCxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxHQUFHLEVBQUU7Q0FDakMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN6RSxHQUFHLENBQUMsQ0FBQztDQUNMLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQyxDQUFDO0NBRUYsSUFBSSxzQkFBc0IsR0FBRyxTQUFTLHFCQUFxQixDQUFDLENBQUMsRUFBRTtDQUMvRCxFQUFFLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxLQUFLLGVBQWUsQ0FBQztDQUNsRCxFQUFFLElBQUksS0FBSyxHQUFHQSwyQkFBeUIsQ0FBQyxtQkFBbUIsR0FBRyxzQkFBc0IsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzRyxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxHQUFHLEVBQUU7Q0FDakMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Q0FDckYsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ25DLEtBQUs7Q0FDTCxHQUFHLENBQUMsQ0FBQztDQUNMLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQyxDQUFDO0NBSUYsSUFBSSxDQUFDYixZQUFhLEVBQUU7Q0FDcEIsRUFBRSxPQUFPLEdBQUcsU0FBUyxNQUFNLEdBQUc7Q0FDOUIsSUFBSSxJQUFJLElBQUksWUFBWSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQztDQUNoRixJQUFJLElBQUksV0FBVyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekcsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDL0IsSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLEtBQUssRUFBRTtDQUNsQyxNQUFNLElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQy9FLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUNqRixNQUFNLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDekUsS0FBSyxDQUFDO0NBQ04sSUFBSSxJQUFJckIsV0FBVyxJQUFJLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztDQUNsSCxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztDQUNsQyxHQUFHLENBQUM7Q0FFSixFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMrQixXQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxRQUFRLEdBQUc7Q0FDL0QsSUFBSSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUN0QyxHQUFHLENBQUMsQ0FBQztDQUVMLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxXQUFXLEVBQUU7Q0FDNUQsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FDL0MsR0FBRyxDQUFDLENBQUM7Q0FFTCxFQUFFNUIsMEJBQTBCLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDO0NBQ3ZELEVBQUVDLG9CQUFvQixDQUFDLENBQUMsR0FBRyxlQUFlLENBQUM7Q0FDM0MsRUFBRWMsOEJBQThCLENBQUMsQ0FBQyxHQUFHLHlCQUF5QixDQUFDO0NBQy9ELEVBQUVGLHlCQUF5QixDQUFDLENBQUMsR0FBR21CLGlDQUEyQixDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztDQUNyRixFQUFFbEIsMkJBQTJCLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFDO0NBRXpELEVBQUVTLHNCQUE0QixDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNuRCxJQUFJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUM3QyxHQUFHLENBQUM7Q0FFSixFQUFFLElBQUkxQixXQUFXLEVBQUU7Q0FFbkIsSUFBSWlDLHNCQUFvQixDQUFDLE9BQU8sQ0FBQ0YsV0FBUyxDQUFDLEVBQUUsYUFBYSxFQUFFO0NBQzVELE1BQU0sWUFBWSxFQUFFLElBQUk7Q0FDeEIsTUFBTSxHQUFHLEVBQUUsU0FBUyxXQUFXLEdBQUc7Q0FDbEMsUUFBUSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQztDQUNsRCxPQUFPO0NBQ1AsS0FBSyxDQUFDLENBQUM7Q0FDUCxJQUFrQjtDQUNsQixNQUFNLFFBQVEsQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUNqRyxLQUFLO0NBQ0wsR0FBRztDQUNILENBQUM7QUFFRFEsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDbEIsWUFBYSxFQUFFLElBQUksRUFBRSxDQUFDQSxZQUFhLEVBQUUsRUFBRTtDQUM5RSxFQUFFLE1BQU0sRUFBRSxPQUFPO0NBQ2pCLENBQUMsQ0FBQyxDQUFDO0NBRUgsUUFBUSxDQUFDLFVBQVUsQ0FBQ2dCLHVCQUFxQixDQUFDLEVBQUUsVUFBVSxJQUFJLEVBQUU7Q0FDNUQsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM5QixDQUFDLENBQUMsQ0FBQztBQUVIRSxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUNsQixZQUFhLEVBQUUsRUFBRTtDQUcxRCxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRTtDQUN4QixJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDbkYsSUFBSSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDakMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7Q0FDNUMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7Q0FDNUMsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0NBR0gsRUFBRSxNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0NBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLFNBQVMsQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztDQUNsRSxJQUFJLElBQUksR0FBRyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxFQUFFLE9BQU8sc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDN0UsR0FBRztDQUNILEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUU7Q0FDL0MsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRTtDQUNoRCxDQUFDLENBQUMsQ0FBQztBQUVIa0IsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDbEIsWUFBYSxFQUFFLElBQUksRUFBRSxDQUFDckIsV0FBVyxFQUFFLEVBQUU7Q0FHaEYsRUFBRSxNQUFNLEVBQUUsT0FBTztDQUdqQixFQUFFLGNBQWMsRUFBRSxlQUFlO0NBR2pDLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCO0NBR3JDLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCO0NBQ3JELENBQUMsQ0FBQyxDQUFDO0FBRUh1QyxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUNsQixZQUFhLEVBQUUsRUFBRTtDQUc1RCxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQjtDQUczQyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQjtDQUMvQyxDQUFDLENBQUMsQ0FBQztBQUlIa0IsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFdEIsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDdEcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLHFCQUFxQixDQUFDLEVBQUUsRUFBRTtDQUM1RCxJQUFJLE9BQU9BLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxHQUFHO0NBQ0gsQ0FBQyxDQUFDLENBQUM7Q0FJSCxJQUFJLFVBQVUsRUFBRTtDQUNoQixFQUFFLElBQUkscUJBQXFCLEdBQUcsQ0FBQ0ksWUFBYSxJQUFJLEtBQUssQ0FBQyxZQUFZO0NBQ2xFLElBQUksSUFBSSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7Q0FFM0IsSUFBSSxPQUFPLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksUUFBUTtDQUUzQyxTQUFTLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLElBQUk7Q0FFMUMsU0FBUyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0NBQzVDLEdBQUcsQ0FBQyxDQUFDO0NBRUwsRUFBRWtCLE9BQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsRUFBRTtDQUVuRSxJQUFJLFNBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtDQUN2RCxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdEIsTUFBTSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDcEIsTUFBTSxJQUFJLFNBQVMsQ0FBQztDQUNwQixNQUFNLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3JFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQztDQUMzQixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTztDQUMxRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxHQUFHLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUMvRCxRQUFRLElBQUksT0FBTyxTQUFTLElBQUksVUFBVSxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDckYsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQzNDLE9BQU8sQ0FBQztDQUNSLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztDQUN6QixNQUFNLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDMUMsS0FBSztDQUNMLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQztDQUlELElBQUksQ0FBQyxPQUFPLENBQUNSLFdBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO0NBQ3ZDLEVBQUUsMkJBQTJCLENBQUMsT0FBTyxDQUFDQSxXQUFTLENBQUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDQSxXQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUM1RixDQUFDO0NBR0QsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztDQUVoQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSTs7Q0M5U3pCLElBQUlKLGdCQUFjLEdBQUdkLG9CQUE4QyxDQUFDLENBQUMsQ0FBQztDQUd0RSxJQUFJLFlBQVksR0FBR2pCLFFBQU0sQ0FBQyxNQUFNLENBQUM7Q0FFakMsSUFBSUksV0FBVyxJQUFJLE9BQU8sWUFBWSxJQUFJLFVBQVUsS0FBSyxFQUFFLGFBQWEsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDO0NBRW5HLEVBQUUsWUFBWSxFQUFFLENBQUMsV0FBVyxLQUFLLFNBQVM7Q0FDMUMsQ0FBQyxFQUFFO0NBQ0gsRUFBRSxJQUFJLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztDQUV2QyxFQUFFLElBQUksYUFBYSxHQUFHLFNBQVMsTUFBTSxHQUFHO0NBQ3hDLElBQUksSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVHLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxZQUFZLGFBQWE7Q0FDOUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUM7Q0FFckMsUUFBUSxXQUFXLEtBQUssU0FBUyxHQUFHLFlBQVksRUFBRSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUMvRSxJQUFJLElBQUksV0FBVyxLQUFLLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDdkUsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHLENBQUM7Q0FDSixFQUFFLHlCQUF5QixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUN6RCxFQUFFLElBQUksZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztDQUN6RSxFQUFFLGVBQWUsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO0NBRTlDLEVBQUUsSUFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztDQUNoRCxFQUFFLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUM7Q0FDOUQsRUFBRSxJQUFJLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQztDQUN2QyxFQUFFMkIsZ0JBQWMsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFO0NBQ2pELElBQUksWUFBWSxFQUFFLElBQUk7Q0FDdEIsSUFBSSxHQUFHLEVBQUUsU0FBUyxXQUFXLEdBQUc7Q0FDaEMsTUFBTSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztDQUMxRCxNQUFNLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDL0MsTUFBTSxJQUFJLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUM5RCxNQUFNLElBQUksSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzdFLE1BQU0sT0FBTyxJQUFJLEtBQUssRUFBRSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7Q0FDNUMsS0FBSztDQUNMLEdBQUcsQ0FBQyxDQUFDO0NBRUwsRUFBRVksT0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FDcEMsSUFBSSxNQUFNLEVBQUUsYUFBYTtDQUN6QixHQUFHLENBQUMsQ0FBQztDQUNMOztDQzdDQSxxQkFBcUIsQ0FBQyxlQUFlLENBQUM7O0NDQXRDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQzs7Q0NBakMscUJBQXFCLENBQUMsYUFBYSxDQUFDOztDQ0RwQyx1QkFBYyxHQUFHLFVBQVUsV0FBVyxFQUFFLFFBQVEsRUFBRTtDQUNsRCxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUMvQixFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWTtDQUV2QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsSUFBSSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9ELEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQzs7Q0NMRCxJQUFJWixnQkFBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7Q0FDM0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBRWYsSUFBSSxPQUFPLEdBQUcsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FFMUMsMkJBQWMsR0FBRyxVQUFVLFdBQVcsRUFBRSxPQUFPLEVBQUU7Q0FDakQsRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDekQsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7Q0FDN0IsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDL0IsRUFBRSxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0NBQ3hFLEVBQUUsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0NBQ3pELEVBQUUsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO0NBRTNELEVBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBQzdELElBQUksSUFBSSxTQUFTLElBQUksQ0FBQzNCLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQztDQUMvQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FFM0IsSUFBSSxJQUFJLFNBQVMsRUFBRTJCLGdCQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Q0FDNUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBRWxCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3pDLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQzs7Q0N6QkQsSUFBSWEsVUFBUSxHQUFHM0IsY0FBdUMsQ0FBQyxPQUFPLENBQUM7Q0FJL0QsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDbkQsSUFBSSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FJeEQsZ0JBQWMsR0FBRyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsT0FBTyxDQUFDLFVBQVUsR0FBa0I7Q0FDcEcsRUFBRSxPQUFPMkIsVUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3JGLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTzs7QUNOZEQsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxJQUFJRSxZQUFPLEVBQUUsRUFBRTtDQUNuRSxFQUFFLE9BQU8sRUFBRUEsWUFBTztDQUNsQixDQUFDLENBQUM7O0NDSkYsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ2pELElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7Q0FJckMsSUFBSSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxFQUFFO0NBQzlDLEVBQUVyQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRTtDQUN0RCxJQUFJLFlBQVksRUFBRSxJQUFJO0NBQ3RCLElBQUksS0FBSyxFQUFFc0MsWUFBTSxDQUFDLElBQUksQ0FBQztDQUN2QixHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7Q0FHRCxvQkFBYyxHQUFHLFVBQVUsR0FBRyxFQUFFO0NBQ2hDLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUMxQyxDQUFDOztDQ25CRCxhQUFjLEdBQUcsRUFBRTs7Q0NFbkIsMEJBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBQ3BDLEVBQUUsU0FBUyxDQUFDLEdBQUcsSUFBZTtDQUM5QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztDQUNqQyxFQUFFLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztDQUN4RCxDQUFDLENBQUM7O0NDREYsSUFBSUMsVUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNyQyxJQUFJQyxpQkFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Q0FJdkMsd0JBQWMsR0FBR0Msc0JBQXdCLEdBQUcsTUFBTSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsRUFBRTtDQUNqRixFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEIsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUVGLFVBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDQSxVQUFRLENBQUMsQ0FBQztDQUMzQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsV0FBVyxJQUFJLFVBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRTtDQUN4RSxJQUFJLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7Q0FDbkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLE1BQU0sR0FBR0MsaUJBQWUsR0FBRyxJQUFJLENBQUM7Q0FDeEQsQ0FBQzs7Q0NURCxJQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDM0MsSUFBSSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7Q0FFbkMsSUFBSSxVQUFVLEdBQUcsWUFBWSxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUk5QyxJQUFJLGlCQUFpQixFQUFFLGlDQUFpQyxFQUFFLGFBQWEsQ0FBQztDQUV4RSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7Q0FDYixFQUFFLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FFNUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxJQUFJLGFBQWEsQ0FBQyxFQUFFLHNCQUFzQixHQUFHLElBQUksQ0FBQztDQUNoRSxPQUFPO0NBQ1AsSUFBSSxpQ0FBaUMsR0FBR0Usb0JBQWMsQ0FBQ0Esb0JBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0NBQ3RGLElBQUksSUFBSSxpQ0FBaUMsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLGlCQUFpQixHQUFHLGlDQUFpQyxDQUFDO0NBQ3RILEdBQUc7Q0FDSCxDQUFDO0NBRUQsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLEVBQUUsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0NBRzNELEtBQWdCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxFQUFFO0NBQ25ELEVBQUUsMkJBQTJCLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3ZFLENBQUM7Q0FFRCxpQkFBYyxHQUFHO0NBQ2pCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCO0NBQ3RDLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCO0NBQ2hELENBQUM7O0NDbkNELElBQUlDLG1CQUFpQixHQUFHbEMsYUFBc0MsQ0FBQyxpQkFBaUIsQ0FBQztDQU1qRixJQUFJbUMsWUFBVSxHQUFHLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FFOUMsNkJBQWMsR0FBRyxVQUFVLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7Q0FDNUQsRUFBRSxJQUFJLGFBQWEsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO0NBQ3pDLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxHQUFHTixZQUFNLENBQUNLLG1CQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDekcsRUFBRSxjQUFjLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLEtBQVcsQ0FBQyxDQUFDO0NBQ2xFLEVBQUVFLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBR0QsWUFBVSxDQUFDO0NBQ3hDLEVBQUUsT0FBTyxtQkFBbUIsQ0FBQztDQUM3QixDQUFDOztDQ2JELHNCQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7Q0FDcEMsSUFBSSxNQUFNLFNBQVMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLENBQUM7Q0FDbkUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0NBQ2QsQ0FBQzs7Q0NDRCx3QkFBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEtBQUssV0FBVyxJQUFJLEVBQUUsR0FBRyxZQUFZO0NBQzNFLEVBQUUsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0NBQzdCLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxNQUFNLENBQUM7Q0FDYixFQUFFLElBQUk7Q0FDTixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDaEYsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUMxQixJQUFJLGNBQWMsR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDO0NBQzNDLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFlO0NBQ2pDLEVBQUUsT0FBTyxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFO0NBQzNDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDOUIsSUFBSSxJQUFJLGNBQWMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM5QyxTQUFTLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0NBQzdCLElBQUksT0FBTyxDQUFDLENBQUM7Q0FDYixHQUFHLENBQUM7Q0FDSixDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7O0NDVmhCLElBQUlELG1CQUFpQixHQUFHRyxhQUFhLENBQUMsaUJBQWlCLENBQUM7Q0FDeEQsSUFBSUMsd0JBQXNCLEdBQUdELGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztDQUNsRSxJQUFJRSxVQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztDQUNsQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7Q0FDdEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0NBRXhCLElBQUlKLFlBQVUsR0FBRyxZQUFZLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0NBRTlDLGtCQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtDQUMvRixFQUFFLHlCQUF5QixDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3RCxFQUFFLElBQUksa0JBQWtCLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDM0MsSUFBSSxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksZUFBZSxFQUFFLE9BQU8sZUFBZSxDQUFDO0NBQ3BFLElBQUksSUFBSSxDQUFDRyx3QkFBc0IsSUFBSSxJQUFJLElBQUksaUJBQWlCLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM3RixJQUFJLFFBQVEsSUFBSTtDQUNoQixNQUFNLEtBQUssSUFBSSxFQUFFLE9BQU8sU0FBUyxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUN4RixNQUFNLEtBQUssTUFBTSxFQUFFLE9BQU8sU0FBUyxNQUFNLEdBQUcsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUM1RixNQUFNLEtBQUssT0FBTyxFQUFFLE9BQU8sU0FBUyxPQUFPLEdBQUcsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUM5RixLQUFLLENBQUMsT0FBTyxZQUFZLEVBQUUsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNuRSxHQUFHLENBQUM7Q0FFSixFQUFFLElBQUksYUFBYSxHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7Q0FDekMsRUFBRSxJQUFJLHFCQUFxQixHQUFHLEtBQUssQ0FBQztDQUNwQyxFQUFFLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztDQUM3QyxFQUFFLElBQUksY0FBYyxHQUFHLGlCQUFpQixDQUFDQyxVQUFRLENBQUM7Q0FDbEQsT0FBTyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7Q0FDdEMsT0FBTyxPQUFPLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDN0MsRUFBRSxJQUFJLGVBQWUsR0FBRyxDQUFDRCx3QkFBc0IsSUFBSSxjQUFjLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDakcsRUFBRSxJQUFJLGlCQUFpQixHQUFHLElBQUksSUFBSSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxJQUFJLGNBQWMsR0FBRyxjQUFjLENBQUM7Q0FDekcsRUFBRSxJQUFJLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUM7Q0FHN0MsRUFBRSxJQUFJLGlCQUFpQixFQUFFO0NBQ3pCLElBQUksd0JBQXdCLEdBQUdMLG9CQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3RGLElBQUksSUFBSUMsbUJBQWlCLEtBQUssTUFBTSxDQUFDLFNBQVMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUU7Q0FDakYsTUFBTSxLQUFnQkQsb0JBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLQyxtQkFBaUIsRUFBRTtDQUN0RixRQUFRLElBQUlNLG9CQUFjLEVBQUU7Q0FDNUIsVUFBVUEsb0JBQWMsQ0FBQyx3QkFBd0IsRUFBRU4sbUJBQWlCLENBQUMsQ0FBQztDQUN0RSxTQUFTLE1BQU0sSUFBSSxPQUFPLHdCQUF3QixDQUFDSyxVQUFRLENBQUMsSUFBSSxVQUFVLEVBQUU7Q0FDNUUsVUFBVSwyQkFBMkIsQ0FBQyx3QkFBd0IsRUFBRUEsVUFBUSxFQUFFSixZQUFVLENBQUMsQ0FBQztDQUN0RixTQUFTO0NBQ1QsT0FBTztDQUVQLE1BQU0sY0FBYyxDQUFDLHdCQUF3QixFQUFFLGFBQWEsRUFBRSxJQUFVLENBQUMsQ0FBQztDQUUxRSxLQUFLO0NBQ0wsR0FBRztDQUdILEVBQUUsSUFBSSxPQUFPLElBQUksTUFBTSxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtDQUM3RSxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQztDQUNqQyxJQUFJLGVBQWUsR0FBRyxTQUFTLE1BQU0sR0FBRyxFQUFFLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDOUUsR0FBRztDQUdILEVBQUUsS0FBNEIsaUJBQWlCLENBQUNJLFVBQVEsQ0FBQyxLQUFLLGVBQWUsRUFBRTtDQUMvRSxJQUFJLDJCQUEyQixDQUFDLGlCQUFpQixFQUFFQSxVQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7Q0FDOUUsR0FBRztDQUNILEVBQUVILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUM7Q0FHcEMsRUFBRSxJQUFJLE9BQU8sRUFBRTtDQUNmLElBQUksT0FBTyxHQUFHO0NBQ2QsTUFBTSxNQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDO0NBQ3hDLE1BQU0sSUFBSSxFQUFFLE1BQU0sR0FBRyxlQUFlLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO0NBQy9ELE1BQU0sT0FBTyxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztDQUMxQyxLQUFLLENBQUM7Q0FDTixJQUFJLElBQUksTUFBTSxFQUFFLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBRTtDQUNyQyxNQUFNLElBQUlFLHdCQUFzQixJQUFJLHFCQUFxQixJQUFJLEVBQUUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUU7Q0FDMUYsUUFBUSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ3ZELE9BQU87Q0FDUCxLQUFLLE1BQU1aLE9BQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUVZLHdCQUFzQixJQUFJLHFCQUFxQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDOUcsR0FBRztDQUVILEVBQUUsT0FBTyxPQUFPLENBQUM7Q0FDakIsQ0FBQzs7Q0NsRkQsSUFBSSxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7Q0FDdEMsSUFBSUcsa0JBQWdCLEdBQUczQyxhQUFtQixDQUFDLEdBQUcsQ0FBQztDQUMvQyxJQUFJNEMsa0JBQWdCLEdBQUc1QyxhQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztDQVlyRSxxQkFBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsUUFBUSxFQUFFLElBQUksRUFBRTtDQUMxRSxFQUFFMkMsa0JBQWdCLENBQUMsSUFBSSxFQUFFO0NBQ3pCLElBQUksSUFBSSxFQUFFLGNBQWM7Q0FDeEIsSUFBSSxNQUFNLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQztDQUNyQyxJQUFJLEtBQUssRUFBRSxDQUFDO0NBQ1osSUFBSSxJQUFJLEVBQUUsSUFBSTtDQUNkLEdBQUcsQ0FBQyxDQUFDO0NBR0wsQ0FBQyxFQUFFLFlBQVk7Q0FDZixFQUFFLElBQUksS0FBSyxHQUFHQyxrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNyQyxFQUFFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDNUIsRUFBRSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0NBQ3hCLEVBQUUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQzVCLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtDQUN6QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0NBQzdCLElBQUksT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0NBQzVDLEdBQUc7Q0FDSCxFQUFFLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7Q0FDM0QsRUFBRSxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ3JFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7Q0FDeEQsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBS2JOLFVBQVMsQ0FBQyxTQUFTLEdBQUdBLFNBQVMsQ0FBQyxLQUFLLENBQUM7Q0FHdEMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekIsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDM0IsZ0JBQWdCLENBQUMsU0FBUyxDQUFDOztDQ2hEM0IsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztDQUMvQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQU1sQlYsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDckYsRUFBRSxPQUFPLEVBQUUsU0FBUyxPQUFPLEdBQUc7Q0FFOUIsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Q0FDakQsSUFBSSxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDcEMsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NaRixrQkFBYyxHQUFHLFVBQVUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDL0MsRUFBRSxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDckMsRUFBRSxJQUFJLFdBQVcsSUFBSSxNQUFNLEVBQUVuQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUM3RyxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDbkMsQ0FBQzs7Q0NQRCxtQkFBYyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRTs7Q0NDM0QsSUFBSSxPQUFPLEdBQUdSLFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxRQUFRLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUM7Q0FDM0MsSUFBSSxFQUFFLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7Q0FDakMsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDO0NBRW5CLElBQUksRUFBRSxFQUFFO0NBQ1IsRUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN4QixFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLENBQUMsTUFBTSxJQUFJNEQsZUFBUyxFQUFFO0NBQ3RCLEVBQUUsS0FBSyxHQUFHQSxlQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ3pDLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO0NBQ2hDLElBQUksS0FBSyxHQUFHQSxlQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0NBQzdDLElBQUksSUFBSSxLQUFLLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsQyxHQUFHO0NBQ0gsQ0FBQztDQUVELG1CQUFjLEdBQUcsT0FBTyxJQUFJLENBQUMsT0FBTzs7Q0NmcEMsSUFBSUMsU0FBTyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUV6QyxnQ0FBYyxHQUFHLFVBQVUsV0FBVyxFQUFFO0NBSXhDLEVBQUUsT0FBT0MsZUFBVSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBQ2hELElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ25CLElBQUksSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7Q0FDN0MsSUFBSSxXQUFXLENBQUNELFNBQU8sQ0FBQyxHQUFHLFlBQVk7Q0FDdkMsTUFBTSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0NBQ3hCLEtBQUssQ0FBQztDQUNOLElBQUksT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztDQUNqRCxHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7O0NDTkQsSUFBSSxtQkFBbUIsR0FBRyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNoRSxJQUFJRSxnQkFBYyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUV2RixJQUFJRixTQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3pDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDM0IsSUFBSUcsS0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFLbkJyQixRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsbUJBQW1CLElBQUksQ0FBQ29CLGdCQUFjLEVBQUUsRUFBRTtDQUNyRixFQUFFLEtBQUssRUFBRSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQ3BDLElBQUksSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDLElBQUksSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNwQyxJQUFJLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDM0MsSUFBSSxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxLQUFLLFNBQVMsR0FBRyxNQUFNLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBRXhFLElBQUksSUFBSSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztDQUMvQixJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQ3BCLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7Q0FFbEMsTUFBTSxJQUFJLE9BQU8sV0FBVyxJQUFJLFVBQVUsS0FBSyxXQUFXLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtDQUN6RyxRQUFRLFdBQVcsR0FBRyxTQUFTLENBQUM7Q0FDaEMsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0NBQ3hDLFFBQVEsV0FBVyxHQUFHLFdBQVcsQ0FBQ0YsU0FBTyxDQUFDLENBQUM7Q0FDM0MsUUFBUSxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUUsV0FBVyxHQUFHLFNBQVMsQ0FBQztDQUMxRCxPQUFPO0NBQ1AsTUFBTSxJQUFJLFdBQVcsS0FBSyxLQUFLLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtDQUM5RCxRQUFRLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzNDLE9BQU87Q0FDUCxLQUFLO0NBQ0wsSUFBSSxNQUFNLEdBQUcsS0FBSyxXQUFXLEtBQUssU0FBUyxHQUFHLEtBQUssR0FBRyxXQUFXLEVBQUVHLEtBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDcEYsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDL0UsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUN0QixJQUFJLE9BQU8sTUFBTSxDQUFDO0NBQ2xCLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDL0NGLElBQUlqQyxnQkFBYyxHQUFHZCxvQkFBOEMsQ0FBQyxDQUFDLENBQUM7Q0FFdEUsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO0NBQzNDLElBQUkseUJBQXlCLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDO0NBQzNELElBQUksTUFBTSxHQUFHLHVCQUF1QixDQUFDO0NBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztDQUlsQixJQUFJYixXQUFXLElBQUksRUFBRSxJQUFJLElBQUksaUJBQWlCLENBQUMsRUFBRTtDQUNqRCxFQUFFMkIsZ0JBQWMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUU7Q0FDMUMsSUFBSSxZQUFZLEVBQUUsSUFBSTtDQUN0QixJQUFJLEdBQUcsRUFBRSxZQUFZO0NBQ3JCLE1BQU0sSUFBSTtDQUNWLFFBQVEsT0FBTyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3JFLE9BQU8sQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUN0QixRQUFRLE9BQU8sRUFBRSxDQUFDO0NBQ2xCLE9BQU87Q0FDUCxLQUFLO0NBQ0wsR0FBRyxDQUFDLENBQUM7Q0FDTDs7Q0NoQkEsY0FBYyxDQUFDL0IsUUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztDQ0R6QyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O0NDRWxDLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRWlFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBSTFFdEIsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQ00sc0JBQXdCLEVBQUUsRUFBRTtDQUNsRyxFQUFFLGNBQWMsRUFBRSxTQUFTLGNBQWMsQ0FBQyxFQUFFLEVBQUU7Q0FDOUMsSUFBSSxPQUFPZ0Isb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NaRixJQUFJQyxlQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ25ELElBQUlDLE1BQUksR0FBRyxFQUFFLENBQUM7QUFFZEEsT0FBSSxDQUFDRCxlQUFhLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FFMUIsc0JBQWMsR0FBRyxNQUFNLENBQUNDLE1BQUksQ0FBQyxLQUFLLFlBQVk7O0NDSDlDLElBQUlELGVBQWEsR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FFbkQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLE9BQU8sU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFDO0NBR3ZGLElBQUksTUFBTSxHQUFHLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRTtDQUNoQyxFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ25CLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFlO0NBQ2pDLENBQUMsQ0FBQztDQUdGLFdBQWMsR0FBR0Usa0JBQXFCLEdBQUcsVUFBVSxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3BFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQztDQUNyQixFQUFFLE9BQU8sRUFBRSxLQUFLLFNBQVMsR0FBRyxXQUFXLEdBQUcsRUFBRSxLQUFLLElBQUksR0FBRyxNQUFNO0NBRTlELE1BQU0sUUFBUSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUVGLGVBQWEsQ0FBQyxDQUFDLElBQUksUUFBUSxHQUFHLEdBQUc7Q0FFNUUsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0NBRXZDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksVUFBVSxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUM7Q0FDbkcsQ0FBQzs7Q0NuQkQsa0JBQWMsR0FBR0Usa0JBQXFCLEdBQUcsRUFBRSxDQUFDLFFBQVEsR0FBRyxTQUFTLFFBQVEsR0FBRztDQUMzRSxFQUFFLE9BQU8sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDMUMsQ0FBQzs7Q0NGRCxJQUFJLENBQUNBLGtCQUFxQixFQUFFO0NBQzVCLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFekMsY0FBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDckU7O0NDTkEsNEJBQWMsR0FBRzNCLFFBQU0sQ0FBQyxPQUFPOztDQ0EvQixlQUFjLEdBQUcsVUFBVSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtDQUNqRCxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNoRSxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUM7O0NDQ0QsSUFBSTZELFNBQU8sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FFekMsY0FBYyxHQUFHLFVBQVUsZ0JBQWdCLEVBQUU7Q0FDN0MsRUFBRSxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztDQUNqRCxFQUFFLElBQUksY0FBYyxHQUFHckQsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0NBRTlDLEVBQUUsSUFBSUosV0FBVyxJQUFJLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQ3lELFNBQU8sQ0FBQyxFQUFFO0NBQzNELElBQUksY0FBYyxDQUFDLFdBQVcsRUFBRUEsU0FBTyxFQUFFO0NBQ3pDLE1BQU0sWUFBWSxFQUFFLElBQUk7Q0FDeEIsTUFBTSxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUU7Q0FDdkMsS0FBSyxDQUFDLENBQUM7Q0FDUCxHQUFHO0NBQ0gsQ0FBQzs7Q0NsQkQsY0FBYyxHQUFHLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Q0FDbEQsRUFBRSxJQUFJLEVBQUUsRUFBRSxZQUFZLFdBQVcsQ0FBQyxFQUFFO0NBQ3BDLElBQUksTUFBTSxTQUFTLENBQUMsWUFBWSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO0NBQzVFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNkLENBQUM7O0NDREQsSUFBSUwsVUFBUSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUMzQyxJQUFJYSxnQkFBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7Q0FHckMseUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU8sRUFBRSxLQUFLLFNBQVMsS0FBS2hCLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJZ0IsZ0JBQWMsQ0FBQ2IsVUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDekYsQ0FBQzs7Q0NMRCxJQUFJQSxVQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBRTNDLHFCQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUNBLFVBQVEsQ0FBQztDQUMxQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Q0FDdkIsT0FBT0gsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzlCLENBQUM7O0NDUkQsaUJBQWMsR0FBRyxVQUFVLFFBQVEsRUFBRTtDQUNyQyxFQUFFLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN4QyxFQUFFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtDQUNsQyxJQUFJLE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Q0FDdkQsR0FBRztDQUNILENBQUM7O0NDQUQsSUFBSSxNQUFNLEdBQUcsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0NBQ3hDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDekIsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUN2QixDQUFDLENBQUM7Q0FFRixXQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRTtDQUMvRCxFQUFFLElBQUksSUFBSSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDckQsRUFBRSxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN2RCxFQUFFLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsSUFBSSxFQUFFLEdBQUduQixtQkFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQztDQUNyRSxFQUFFLElBQUksUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBRTFELEVBQUUsSUFBSSxJQUFJLEdBQUcsVUFBVSxTQUFTLEVBQUU7Q0FDbEMsSUFBSSxJQUFJLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDMUMsSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztDQUN2QyxHQUFHLENBQUM7Q0FFSixFQUFFLElBQUksTUFBTSxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ2hDLElBQUksSUFBSSxVQUFVLEVBQUU7Q0FDcEIsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDdEIsTUFBTSxPQUFPLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pGLEtBQUssQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN2RCxHQUFHLENBQUM7Q0FFSixFQUFFLElBQUksV0FBVyxFQUFFO0NBQ25CLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztDQUN4QixHQUFHLE1BQU07Q0FDVCxJQUFJLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN6QyxJQUFJLElBQUksT0FBTyxNQUFNLElBQUksVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Q0FFL0UsSUFBSSxJQUFJLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxFQUFFO0NBQ3ZDLE1BQU0sS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDbkYsUUFBUSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLFFBQVEsSUFBSSxNQUFNLElBQUksTUFBTSxZQUFZLE1BQU0sRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUM5RCxPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNqQyxLQUFLO0NBQ0wsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNyQyxHQUFHO0NBRUgsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztDQUN2QixFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRTtDQUM3QyxJQUFJLElBQUk7Q0FDUixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2xDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNwQixNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUM5QixNQUFNLE1BQU0sS0FBSyxDQUFDO0NBQ2xCLEtBQUs7Q0FDTCxJQUFJLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLFlBQVksTUFBTSxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ3ZGLEdBQUcsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzdCLENBQUM7O0NDdkRELElBQUlzQixVQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztDQUV6QixJQUFJO0NBQ0osRUFBRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDakIsRUFBRSxJQUFJLGtCQUFrQixHQUFHO0NBQzNCLElBQUksSUFBSSxFQUFFLFlBQVk7Q0FDdEIsTUFBTSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0NBQ2xDLEtBQUs7Q0FDTCxJQUFJLFFBQVEsRUFBRSxZQUFZO0NBQzFCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztDQUMxQixLQUFLO0NBQ0wsR0FBRyxDQUFDO0NBQ0osRUFBRSxrQkFBa0IsQ0FBQ0EsVUFBUSxDQUFDLEdBQUcsWUFBWTtDQUM3QyxJQUFJLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLEdBQUcsQ0FBQztDQUVKLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDM0QsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQWU7Q0FFL0IsK0JBQWMsR0FBRyxVQUFVLElBQUksRUFBRSxZQUFZLEVBQUU7Q0FDL0MsRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ25ELEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7Q0FDaEMsRUFBRSxJQUFJO0NBQ04sSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDcEIsSUFBSSxNQUFNLENBQUNBLFVBQVEsQ0FBQyxHQUFHLFlBQVk7Q0FDbkMsTUFBTSxPQUFPO0NBQ2IsUUFBUSxJQUFJLEVBQUUsWUFBWTtDQUMxQixVQUFVLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEdBQUcsSUFBSSxFQUFFLENBQUM7Q0FDcEQsU0FBUztDQUNULE9BQU8sQ0FBQztDQUNSLEtBQUssQ0FBQztDQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2pCLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFlO0NBQ2pDLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQztDQUMzQixDQUFDOztDQ2pDRCxJQUFJSyxTQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBSXpDLHNCQUFjLEdBQUcsVUFBVSxDQUFDLEVBQUUsa0JBQWtCLEVBQUU7Q0FDbEQsRUFBRSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0NBQ2xDLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDUixFQUFFLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQU8sQ0FBQyxLQUFLLFNBQVMsR0FBRyxrQkFBa0IsR0FBRzdCLFdBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN4RyxDQUFDOztDQ1ZELGVBQWMsR0FBRyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUM0QixlQUFTLENBQUM7O0NDQ25FLGdCQUFjLEdBQUczRCxVQUFPLENBQUNELFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTOztDQ0tyRCxJQUFJLFFBQVEsR0FBR0EsUUFBTSxDQUFDLFFBQVEsQ0FBQztDQUMvQixJQUFJc0UsS0FBRyxHQUFHdEUsUUFBTSxDQUFDLFlBQVksQ0FBQztDQUM5QixJQUFJLEtBQUssR0FBR0EsUUFBTSxDQUFDLGNBQWMsQ0FBQztDQUNsQyxJQUFJdUUsU0FBTyxHQUFHdkUsUUFBTSxDQUFDLE9BQU8sQ0FBQztDQUM3QixJQUFJLGNBQWMsR0FBR0EsUUFBTSxDQUFDLGNBQWMsQ0FBQztDQUMzQyxJQUFJLFFBQVEsR0FBR0EsUUFBTSxDQUFDLFFBQVEsQ0FBQztDQUMvQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Q0FDaEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ2YsSUFBSSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztDQUM5QyxJQUFJLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO0NBRXpCLElBQUksR0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBRXhCLEVBQUUsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQ2hDLElBQUksSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZCLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDckIsSUFBSSxFQUFFLEVBQUUsQ0FBQztDQUNULEdBQUc7Q0FDSCxDQUFDLENBQUM7Q0FFRixJQUFJLE1BQU0sR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMzQixFQUFFLE9BQU8sWUFBWTtDQUNyQixJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNaLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztDQUVGLElBQUksUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ2hDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsQixDQUFDLENBQUM7Q0FFRixJQUFJLElBQUksR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUV6QixFQUFFQSxRQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hFLENBQUMsQ0FBQztDQUdGLElBQUksQ0FBQ3NFLEtBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtDQUNwQixFQUFFQSxLQUFHLEdBQUcsU0FBUyxZQUFZLENBQUMsRUFBRSxFQUFFO0NBQ2xDLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2xCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2QsSUFBSSxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMzRCxJQUFJLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLFlBQVk7Q0FFbkMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLFVBQVUsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDM0UsS0FBSyxDQUFDO0NBQ04sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDbkIsSUFBSSxPQUFPLE9BQU8sQ0FBQztDQUNuQixHQUFHLENBQUM7Q0FDSixFQUFFLEtBQUssR0FBRyxTQUFTLGNBQWMsQ0FBQyxFQUFFLEVBQUU7Q0FDdEMsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQixHQUFHLENBQUM7Q0FFSixFQUFFLElBQUlFLFlBQU8sRUFBRTtDQUNmLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzFCLE1BQU1ELFNBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDbkMsS0FBSyxDQUFDO0NBRU4sR0FBRyxNQUFNLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Q0FDdkMsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDMUIsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9CLEtBQUssQ0FBQztDQUdOLEdBQUcsTUFBTSxJQUFJLGNBQWMsSUFBSSxDQUFDRSxXQUFNLEVBQUU7Q0FDeEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztDQUNuQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0NBQ3pCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0NBQ3ZDLElBQUksS0FBSyxHQUFHdkMsbUJBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUc1QyxHQUFHLE1BQU07Q0FDVCxJQUFJbEMsUUFBTSxDQUFDLGdCQUFnQjtDQUMzQixJQUFJLE9BQU8sV0FBVyxJQUFJLFVBQVU7Q0FDcEMsSUFBSSxDQUFDQSxRQUFNLENBQUMsYUFBYTtDQUN6QixJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLE9BQU87Q0FDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Q0FDaEIsSUFBSTtDQUNKLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztDQUNqQixJQUFJQSxRQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUV4RCxHQUFHLE1BQU0sSUFBSSxrQkFBa0IsSUFBSUsscUJBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUM1RCxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMxQixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUNBLHFCQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLFlBQVk7Q0FDbEYsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQy9CLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2hCLE9BQU8sQ0FBQztDQUNSLEtBQUssQ0FBQztDQUVOLEdBQUcsTUFBTTtDQUNULElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzFCLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNoQyxLQUFLLENBQUM7Q0FDTixHQUFHO0NBQ0gsQ0FBQztDQUVELFFBQWMsR0FBRztDQUNqQixFQUFFLEdBQUcsRUFBRWlFLEtBQUc7Q0FDVixFQUFFLEtBQUssRUFBRSxLQUFLO0NBQ2QsQ0FBQzs7Q0N6R0QsSUFBSS9DLDBCQUF3QixHQUFHTiw4QkFBMEQsQ0FBQyxDQUFDLENBQUM7Q0FDNUYsSUFBSSxTQUFTLEdBQUd5RCxJQUE0QixDQUFDLEdBQUcsQ0FBQztDQUlqRCxJQUFJLGdCQUFnQixHQUFHMUUsUUFBTSxDQUFDLGdCQUFnQixJQUFJQSxRQUFNLENBQUMsc0JBQXNCLENBQUM7Q0FDaEYsSUFBSUcsVUFBUSxHQUFHSCxRQUFNLENBQUMsUUFBUSxDQUFDO0NBQy9CLElBQUl1RSxTQUFPLEdBQUd2RSxRQUFNLENBQUMsT0FBTyxDQUFDO0NBQzdCLElBQUkyRSxTQUFPLEdBQUczRSxRQUFNLENBQUMsT0FBTyxDQUFDO0NBRTdCLElBQUksd0JBQXdCLEdBQUd1QiwwQkFBd0IsQ0FBQ3ZCLFFBQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0NBQ2xGLElBQUksY0FBYyxHQUFHLHdCQUF3QixJQUFJLHdCQUF3QixDQUFDLEtBQUssQ0FBQztDQUVoRixJQUFJLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7Q0FHM0QsSUFBSSxDQUFDLGNBQWMsRUFBRTtDQUNyQixFQUFFLEtBQUssR0FBRyxZQUFZO0NBQ3RCLElBQUksSUFBSSxNQUFNLEVBQUUsRUFBRSxDQUFDO0NBQ25CLElBQUksSUFBSXdFLFlBQU8sS0FBSyxNQUFNLEdBQUdELFNBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDNUQsSUFBSSxPQUFPLElBQUksRUFBRTtDQUNqQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0NBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDdkIsTUFBTSxJQUFJO0NBQ1YsUUFBUSxFQUFFLEVBQUUsQ0FBQztDQUNiLE9BQU8sQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUN0QixRQUFRLElBQUksSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0NBQzNCLGFBQWEsSUFBSSxHQUFHLFNBQVMsQ0FBQztDQUM5QixRQUFRLE1BQU0sS0FBSyxDQUFDO0NBQ3BCLE9BQU87Q0FDUCxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztDQUN2QixJQUFJLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUMvQixHQUFHLENBQUM7Q0FHSixFQUFFLElBQUksQ0FBQ0UsV0FBTSxJQUFJLENBQUNELFlBQU8sSUFBSSxnQkFBZ0IsSUFBSXJFLFVBQVEsRUFBRTtDQUMzRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Q0FDbEIsSUFBSSxJQUFJLEdBQUdBLFVBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdkMsSUFBSSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUN2RSxJQUFJLE1BQU0sR0FBRyxZQUFZO0NBQ3pCLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUM7Q0FDbkMsS0FBSyxDQUFDO0NBRU4sR0FBRyxNQUFNLElBQUl3RSxTQUFPLElBQUlBLFNBQU8sQ0FBQyxPQUFPLEVBQUU7Q0FFekMsSUFBSSxPQUFPLEdBQUdBLFNBQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDekMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztDQUN4QixJQUFJLE1BQU0sR0FBRyxZQUFZO0NBQ3pCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDaEMsS0FBSyxDQUFDO0NBRU4sR0FBRyxNQUFNLElBQUlILFlBQU8sRUFBRTtDQUN0QixJQUFJLE1BQU0sR0FBRyxZQUFZO0NBQ3pCLE1BQU1ELFNBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDOUIsS0FBSyxDQUFDO0NBT04sR0FBRyxNQUFNO0NBQ1QsSUFBSSxNQUFNLEdBQUcsWUFBWTtDQUV6QixNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUN2RSxRQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDcEMsS0FBSyxDQUFDO0NBQ04sR0FBRztDQUNILENBQUM7Q0FFRCxhQUFjLEdBQUcsY0FBYyxJQUFJLFVBQVUsRUFBRSxFQUFFO0NBQ2pELEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztDQUN6QyxFQUFFLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzdCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtDQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztDQUNoQixJQUFJLE1BQU0sRUFBRSxDQUFDO0NBQ2IsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDaEIsQ0FBQzs7Q0MxRUQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsRUFBRTtDQUNyQyxFQUFFLElBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQztDQUN0QixFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxTQUFTLEVBQUUsUUFBUSxFQUFFO0NBQ3RELElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztDQUNsRyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7Q0FDeEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO0NBQ3RCLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHZ0MsV0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3BDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBR0EsV0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2xDLENBQUMsQ0FBQztDQUdGLE9BQWdCLEdBQUcsVUFBVSxDQUFDLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7Ozs7Q0NiRCxrQkFBYyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNqQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNkLEVBQUUsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDbkQsRUFBRSxJQUFJLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNwRCxFQUFFLElBQUksT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztDQUMxQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNiLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7Q0FDbkMsQ0FBQzs7Q0NURCxvQkFBYyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNqQyxFQUFFLElBQUksT0FBTyxHQUFHaEMsUUFBTSxDQUFDLE9BQU8sQ0FBQztDQUMvQixFQUFFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Q0FDaEMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3BFLEdBQUc7Q0FDSCxDQUFDOztDQ1BELFdBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNqQyxFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0NBQzNDLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNsQixJQUFJLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUN6QyxHQUFHO0NBQ0gsQ0FBQzs7Q0NXRCxJQUFJNEUsTUFBSSxHQUFHM0QsSUFBNEIsQ0FBQyxHQUFHLENBQUM7Q0FZNUMsSUFBSTRDLFNBQU8sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDekMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0NBQ3hCLElBQUlGLGtCQUFnQixHQUFHNUMsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSTJDLGtCQUFnQixHQUFHM0MsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSx1QkFBdUIsR0FBR0EsYUFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDckUsSUFBSSxrQkFBa0IsR0FBRzhELHdCQUFhLENBQUM7Q0FDdkMsSUFBSUMsV0FBUyxHQUFHOUUsUUFBTSxDQUFDLFNBQVMsQ0FBQztDQUNqQyxJQUFJRyxVQUFRLEdBQUdILFFBQU0sQ0FBQyxRQUFRLENBQUM7Q0FDL0IsSUFBSXVFLFNBQU8sR0FBR3ZFLFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pDLElBQUkrRSxzQkFBb0IsR0FBR0Msb0JBQTBCLENBQUMsQ0FBQyxDQUFDO0NBQ3hELElBQUksMkJBQTJCLEdBQUdELHNCQUFvQixDQUFDO0NBQ3ZELElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTVFLFVBQVEsSUFBSUEsVUFBUSxDQUFDLFdBQVcsSUFBSUgsUUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ2xGLElBQUksc0JBQXNCLEdBQUcsT0FBTyxxQkFBcUIsSUFBSSxVQUFVLENBQUM7Q0FDeEUsSUFBSSxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztDQUMvQyxJQUFJLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0NBQzNDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztDQUNoQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDbEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0NBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztDQUNoQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDbEIsSUFBSSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztDQUUvRCxJQUFJLE1BQU0sR0FBR3dCLFVBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWTtDQUMzQyxFQUFFLElBQUksc0JBQXNCLEdBQUcsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEtBQUssTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Q0FDaEcsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7Q0FJL0IsSUFBSSxJQUFJc0MsZUFBVSxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQztDQUV2QyxJQUFJLElBQUksQ0FBQ1UsWUFBTyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FDekQsR0FBRztDQU1ILEVBQUUsSUFBSVYsZUFBVSxJQUFJLEVBQUUsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FFL0UsRUFBRSxJQUFJLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsRUFBRSxJQUFJLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNwQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQWUsRUFBRSxZQUFZLElBQWUsQ0FBQyxDQUFDO0NBQ25FLEdBQUcsQ0FBQztDQUNKLEVBQUUsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7Q0FDN0MsRUFBRSxXQUFXLENBQUNELFNBQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztDQUNyQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBZSxDQUFDLFlBQVksV0FBVyxDQUFDLENBQUM7Q0FDN0UsQ0FBQyxDQUFDLENBQUM7Q0FFSCxJQUFJLG1CQUFtQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsUUFBUSxFQUFFO0NBQ3JGLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksSUFBZSxDQUFDLENBQUM7Q0FDekUsQ0FBQyxDQUFDLENBQUM7Q0FHSCxJQUFJLFVBQVUsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLElBQUksSUFBSSxDQUFDO0NBQ1gsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7Q0FDOUUsQ0FBQyxDQUFDO0NBRUYsSUFBSW9CLFFBQU0sR0FBRyxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7Q0FDeEMsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTztDQUM3QixFQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0NBQ3hCLEVBQUUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztDQUM5QixFQUFFLFNBQVMsQ0FBQyxZQUFZO0NBQ3hCLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztDQUM1QixJQUFJLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO0NBQ3RDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBRWxCLElBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtDQUNqQyxNQUFNLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ3BDLE1BQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztDQUNyRCxNQUFNLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7Q0FDckMsTUFBTSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0NBQ25DLE1BQU0sSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztDQUNuQyxNQUFNLElBQUksTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7Q0FDL0IsTUFBTSxJQUFJO0NBQ1YsUUFBUSxJQUFJLE9BQU8sRUFBRTtDQUNyQixVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDbkIsWUFBWSxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hFLFlBQVksS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7Q0FDdEMsV0FBVztDQUNYLFVBQVUsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDL0MsZUFBZTtDQUNmLFlBQVksSUFBSSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3ZDLFlBQVksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNwQyxZQUFZLElBQUksTUFBTSxFQUFFO0NBQ3hCLGNBQWMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0NBQzVCLGNBQWMsTUFBTSxHQUFHLElBQUksQ0FBQztDQUM1QixhQUFhO0NBQ2IsV0FBVztDQUNYLFVBQVUsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLE9BQU8sRUFBRTtDQUMzQyxZQUFZLE1BQU0sQ0FBQ0gsV0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztDQUNyRCxXQUFXLE1BQU0sSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0NBQ2hELFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQy9DLFdBQVcsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDakMsU0FBUyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM3QixPQUFPLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDdEIsUUFBUSxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDN0MsUUFBUSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDdEIsT0FBTztDQUNQLEtBQUs7Q0FDTCxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Q0FDM0IsSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pELEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDO0NBRUYsSUFBSSxhQUFhLEdBQUcsVUFBVSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtDQUNyRCxFQUFFLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztDQUNyQixFQUFFLElBQUksY0FBYyxFQUFFO0NBQ3RCLElBQUksS0FBSyxHQUFHM0UsVUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMxQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzVCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDMUIsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDdkMsSUFBSUgsUUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoQyxHQUFHLE1BQU0sS0FBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7Q0FDdEQsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEtBQUssT0FBTyxHQUFHQSxRQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2pGLE9BQU8sSUFBSSxJQUFJLEtBQUssbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDakcsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsVUFBVSxLQUFLLEVBQUU7Q0FDbkMsRUFBRTRFLE1BQUksQ0FBQyxJQUFJLENBQUM1RSxRQUFNLEVBQUUsWUFBWTtDQUNoQyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDL0IsSUFBSSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0NBQzVCLElBQUksSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFDLElBQUksSUFBSSxNQUFNLENBQUM7Q0FDZixJQUFJLElBQUksWUFBWSxFQUFFO0NBQ3RCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZO0NBQ25DLFFBQVEsSUFBSXdFLFlBQU8sRUFBRTtDQUNyQixVQUFVRCxTQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztDQUM3RCxTQUFTLE1BQU0sYUFBYSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNsRSxPQUFPLENBQUMsQ0FBQztDQUVULE1BQU0sS0FBSyxDQUFDLFNBQVMsR0FBR0MsWUFBTyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDO0NBQzVFLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztDQUMzQyxLQUFLO0NBQ0wsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUM7Q0FFRixJQUFJLFdBQVcsR0FBRyxVQUFVLEtBQUssRUFBRTtDQUNuQyxFQUFFLE9BQU8sS0FBSyxDQUFDLFNBQVMsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQ3RELENBQUMsQ0FBQztDQUVGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxLQUFLLEVBQUU7Q0FDekMsRUFBRUksTUFBSSxDQUFDLElBQUksQ0FBQzVFLFFBQU0sRUFBRSxZQUFZO0NBQ2hDLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUMvQixJQUFJLElBQUl3RSxZQUFPLEVBQUU7Q0FDakIsTUFBTUQsU0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNoRCxLQUFLLE1BQU0sYUFBYSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDbEUsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUM7Q0FFRixJQUFJLElBQUksR0FBRyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0NBQ3hDLEVBQUUsT0FBTyxVQUFVLEtBQUssRUFBRTtDQUMxQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQzdCLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztDQUVGLElBQUksY0FBYyxHQUFHLFVBQVUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7Q0FDckQsRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTztDQUN6QixFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLEVBQUUsSUFBSSxNQUFNLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQztDQUM3QixFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQ3RCLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Q0FDekIsRUFBRVUsUUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztDQUN0QixDQUFDLENBQUM7Q0FFRixJQUFJLGVBQWUsR0FBRyxVQUFVLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0NBQ3RELEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU87Q0FDekIsRUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNwQixFQUFFLElBQUksTUFBTSxFQUFFLEtBQUssR0FBRyxNQUFNLENBQUM7Q0FDN0IsRUFBRSxJQUFJO0NBQ04sSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFLE1BQU1ILFdBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0NBQ3BGLElBQUksSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2pDLElBQUksSUFBSSxJQUFJLEVBQUU7Q0FDZCxNQUFNLFNBQVMsQ0FBQyxZQUFZO0NBQzVCLFFBQVEsSUFBSSxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7Q0FDdEMsUUFBUSxJQUFJO0NBQ1osVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Q0FDekIsWUFBWSxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUM7Q0FDakQsWUFBWSxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUM7Q0FDaEQsV0FBVyxDQUFDO0NBQ1osU0FBUyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ3hCLFVBQVUsY0FBYyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDaEQsU0FBUztDQUNULE9BQU8sQ0FBQyxDQUFDO0NBQ1QsS0FBSyxNQUFNO0NBQ1gsTUFBTSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztDQUMxQixNQUFNLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0NBQzlCLE1BQU1HLFFBQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDM0IsS0FBSztDQUNMLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNsQixJQUFJLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDbEQsR0FBRztDQUNILENBQUMsQ0FBQztDQUdGLElBQUksTUFBTSxFQUFFO0NBRVosRUFBRSxrQkFBa0IsR0FBRyxTQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Q0FDbEQsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ2xELElBQUlqRCxXQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDeEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hCLElBQUksSUFBSSxLQUFLLEdBQUcyQixrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN2QyxJQUFJLElBQUk7Q0FDUixNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUMxRSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDcEIsTUFBTSxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ25DLEtBQUs7Q0FDTCxHQUFHLENBQUM7Q0FFSixFQUFFLFFBQVEsR0FBRyxTQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Q0FDeEMsSUFBSUQsa0JBQWdCLENBQUMsSUFBSSxFQUFFO0NBQzNCLE1BQU0sSUFBSSxFQUFFLE9BQU87Q0FDbkIsTUFBTSxJQUFJLEVBQUUsS0FBSztDQUNqQixNQUFNLFFBQVEsRUFBRSxLQUFLO0NBQ3JCLE1BQU0sTUFBTSxFQUFFLEtBQUs7Q0FDbkIsTUFBTSxTQUFTLEVBQUUsRUFBRTtDQUNuQixNQUFNLFNBQVMsRUFBRSxLQUFLO0NBQ3RCLE1BQU0sS0FBSyxFQUFFLE9BQU87Q0FDcEIsTUFBTSxLQUFLLEVBQUUsU0FBUztDQUN0QixLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUcsQ0FBQztDQUNKLEVBQUUsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFO0NBR2pFLElBQUksSUFBSSxFQUFFLFNBQVMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUU7Q0FDakQsTUFBTSxJQUFJLEtBQUssR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNoRCxNQUFNLElBQUksUUFBUSxHQUFHcUIsc0JBQW9CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztDQUN4RixNQUFNLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxXQUFXLElBQUksVUFBVSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7Q0FDMUUsTUFBTSxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sVUFBVSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUM7Q0FDcEUsTUFBTSxRQUFRLENBQUMsTUFBTSxHQUFHUCxZQUFPLEdBQUdELFNBQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0NBQzdELE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Q0FDMUIsTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEVBQUVVLFFBQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDdkQsTUFBTSxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7Q0FDOUIsS0FBSztDQUdMLElBQUksT0FBTyxFQUFFLFVBQVUsVUFBVSxFQUFFO0NBQ25DLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM5QyxLQUFLO0NBQ0wsR0FBRyxDQUFDLENBQUM7Q0FDTCxFQUFFLG9CQUFvQixHQUFHLFlBQVk7Q0FDckMsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0NBQ2pDLElBQUksSUFBSSxLQUFLLEdBQUd0QixrQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzlDLEdBQUcsQ0FBQztDQUNKLEVBQUVxQixvQkFBMEIsQ0FBQyxDQUFDLEdBQUdELHNCQUFvQixHQUFHLFVBQVUsQ0FBQyxFQUFFO0NBQ3JFLElBQUksT0FBTyxDQUFDLEtBQUssa0JBQWtCLElBQUksQ0FBQyxLQUFLLGNBQWM7Q0FDM0QsUUFBUSxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQztDQUNuQyxRQUFRLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDLEdBQUcsQ0FBQztDQUVKLEVBQUUsS0FBZ0IsT0FBT0Ysd0JBQWEsSUFBSSxVQUFVLEVBQUU7Q0FDdEQsSUFBSSxVQUFVLEdBQUdBLHdCQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztDQUc5QyxJQUFJLFFBQVEsQ0FBQ0Esd0JBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUU7Q0FDckYsTUFBTSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDdEIsTUFBTSxPQUFPLElBQUksa0JBQWtCLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0NBQy9ELFFBQVEsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQy9DLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FFdkMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Q0FHekIsSUFBSSxJQUFJLE9BQU8sTUFBTSxJQUFJLFVBQVUsRUFBRWxDLE9BQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FFekYsTUFBTSxLQUFLLEVBQUUsU0FBUyxLQUFLLENBQUMsS0FBSyxHQUFlO0NBQ2hELFFBQVEsT0FBTyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQzNDLFFBQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQ25GLE9BQU87Q0FDUCxLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUc7Q0FDSCxDQUFDO0FBRUQyQyxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0NBQ2hELEVBQUUsT0FBTyxFQUFFLGtCQUFrQjtDQUM3QixDQUFDLENBQUMsQ0FBQztDQUVILGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsS0FBVyxDQUFDLENBQUM7Q0FDekQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBRXBCLGNBQWMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFHckNBLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7Q0FHbkQsRUFBRSxNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFO0NBQzdCLElBQUksSUFBSSxVQUFVLEdBQUdvQyxzQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNoRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN6QyxJQUFJLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQztDQUM5QixHQUFHO0NBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSHBDLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQWEsTUFBTSxFQUFFLEVBQUU7Q0FHOUQsRUFBRSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFO0NBQy9CLElBQUksT0FBTyxjQUFjLEVBQTJELElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3RixHQUFHO0NBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSEEsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFO0NBR2hFLEVBQUUsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDLFFBQVEsRUFBRTtDQUM5QixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztDQUNqQixJQUFJLElBQUksVUFBVSxHQUFHb0Msc0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDN0MsSUFBSSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO0NBQ3JDLElBQUksSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztDQUNuQyxJQUFJLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZO0NBQ3JDLE1BQU0sSUFBSSxlQUFlLEdBQUcvQyxXQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pELE1BQU0sSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLE1BQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0NBQ3RCLE1BQU0sSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0NBQ3hCLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLE9BQU8sRUFBRTtDQUMzQyxRQUFRLElBQUksS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDO0NBQzlCLFFBQVEsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0NBQ2xDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUMvQixRQUFRLFNBQVMsRUFBRSxDQUFDO0NBQ3BCLFFBQVEsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFO0NBQy9ELFVBQVUsSUFBSSxhQUFhLEVBQUUsT0FBTztDQUNwQyxVQUFVLGFBQWEsR0FBRyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQ2hDLFVBQVUsRUFBRSxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3pDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUNuQixPQUFPLENBQUMsQ0FBQztDQUNULE1BQU0sRUFBRSxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3JDLEtBQUssQ0FBQyxDQUFDO0NBQ1AsSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMzQyxJQUFJLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQztDQUM5QixHQUFHO0NBR0gsRUFBRSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFO0NBQ2hDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLElBQUksSUFBSSxVQUFVLEdBQUcrQyxzQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QyxJQUFJLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7Q0FDbkMsSUFBSSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWTtDQUNyQyxNQUFNLElBQUksZUFBZSxHQUFHL0MsV0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNqRCxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxPQUFPLEVBQUU7Q0FDM0MsUUFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztDQUMxRSxPQUFPLENBQUMsQ0FBQztDQUNULEtBQUssQ0FBQyxDQUFDO0NBQ1AsSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMzQyxJQUFJLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQztDQUM5QixHQUFHO0NBQ0gsQ0FBQyxDQUFDOztDQ3ZYRixlQUFjLEdBQUcsWUFBWTtDQUM3QixFQUFFLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM1QixFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7Q0FDckMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxJQUFJLEdBQUcsQ0FBQztDQUNwQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7Q0FDbEMsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLEdBQUcsQ0FBQztDQUNqQyxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUM7O0NDVEQsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQzNCLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Q0FDdkMsSUFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBRWhELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FFNUcsSUFBSSxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7Q0FJdEQsSUFBSSxXQUFXLElBQUksY0FBYyxFQUFFO0NBQ25DLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsUUFBUSxHQUFHO0NBQzVELElBQUksSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNCLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM3QixJQUFJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7Q0FDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxDQUFDLFlBQVksTUFBTSxJQUFJLEVBQUUsT0FBTyxJQUFJLGVBQWUsQ0FBQyxHQUFHa0QsV0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztDQUNsSCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0NBQzdCLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZCOztDQ3BCQSxJQUFJakQsY0FBWSxHQUFHLFVBQVUsaUJBQWlCLEVBQUU7Q0FDaEQsRUFBRSxPQUFPLFVBQVUsS0FBSyxFQUFFLEdBQUcsRUFBRTtDQUMvQixJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2xELElBQUksSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2xDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztDQUN4QixJQUFJLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQztDQUN0QixJQUFJLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFLE9BQU8saUJBQWlCLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztDQUNwRixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ25DLElBQUksT0FBTyxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxJQUFJO0NBQ3BFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLE1BQU0sR0FBRyxNQUFNO0NBQzFFLFVBQVUsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLO0NBQ3hELFVBQVUsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxFQUFFLEtBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztDQUNySCxHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7Q0FFRixtQkFBYyxHQUFHO0NBR2pCLEVBQUUsTUFBTSxFQUFFQSxjQUFZLENBQUMsS0FBSyxDQUFDO0NBRzdCLEVBQUUsTUFBTSxFQUFFQSxjQUFZLENBQUMsSUFBSSxDQUFDO0NBQzVCLENBQUM7O0NDekJELElBQUksTUFBTSxHQUFHaEIsZUFBd0MsQ0FBQyxNQUFNLENBQUM7Q0FJN0QsSUFBSSxlQUFlLEdBQUcsaUJBQWlCLENBQUM7Q0FDeEMsSUFBSXlDLGtCQUFnQixHQUFHM0MsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSTRDLGtCQUFnQixHQUFHNUMsYUFBbUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FJdEUsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxRQUFRLEVBQUU7Q0FDckQsRUFBRTJDLGtCQUFnQixDQUFDLElBQUksRUFBRTtDQUN6QixJQUFJLElBQUksRUFBRSxlQUFlO0NBQ3pCLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7Q0FDNUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztDQUNaLEdBQUcsQ0FBQyxDQUFDO0NBR0wsQ0FBQyxFQUFFLFNBQVMsSUFBSSxHQUFHO0NBQ25CLEVBQUUsSUFBSSxLQUFLLEdBQUdDLGtCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUM1QixFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Q0FDMUIsRUFBRSxJQUFJLEtBQUssQ0FBQztDQUNaLEVBQUUsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDdEUsRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNoQyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUM5QixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUN2QyxDQUFDLENBQUM7O0NDMUJGLGdCQUFjLEdBQUc7Q0FDakIsRUFBRSxXQUFXLEVBQUUsQ0FBQztDQUNoQixFQUFFLG1CQUFtQixFQUFFLENBQUM7Q0FDeEIsRUFBRSxZQUFZLEVBQUUsQ0FBQztDQUNqQixFQUFFLGNBQWMsRUFBRSxDQUFDO0NBQ25CLEVBQUUsV0FBVyxFQUFFLENBQUM7Q0FDaEIsRUFBRSxhQUFhLEVBQUUsQ0FBQztDQUNsQixFQUFFLFlBQVksRUFBRSxDQUFDO0NBQ2pCLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztDQUN6QixFQUFFLFFBQVEsRUFBRSxDQUFDO0NBQ2IsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO0NBQ3RCLEVBQUUsY0FBYyxFQUFFLENBQUM7Q0FDbkIsRUFBRSxlQUFlLEVBQUUsQ0FBQztDQUNwQixFQUFFLGlCQUFpQixFQUFFLENBQUM7Q0FDdEIsRUFBRSxTQUFTLEVBQUUsQ0FBQztDQUNkLEVBQUUsYUFBYSxFQUFFLENBQUM7Q0FDbEIsRUFBRSxZQUFZLEVBQUUsQ0FBQztDQUNqQixFQUFFLFFBQVEsRUFBRSxDQUFDO0NBQ2IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0NBQ3JCLEVBQUUsTUFBTSxFQUFFLENBQUM7Q0FDWCxFQUFFLFdBQVcsRUFBRSxDQUFDO0NBQ2hCLEVBQUUsYUFBYSxFQUFFLENBQUM7Q0FDbEIsRUFBRSxhQUFhLEVBQUUsQ0FBQztDQUNsQixFQUFFLGNBQWMsRUFBRSxDQUFDO0NBQ25CLEVBQUUsWUFBWSxFQUFFLENBQUM7Q0FDakIsRUFBRSxhQUFhLEVBQUUsQ0FBQztDQUNsQixFQUFFLGdCQUFnQixFQUFFLENBQUM7Q0FDckIsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0NBQ3JCLEVBQUUsY0FBYyxFQUFFLENBQUM7Q0FDbkIsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0NBQ3JCLEVBQUUsYUFBYSxFQUFFLENBQUM7Q0FDbEIsRUFBRSxTQUFTLEVBQUUsQ0FBQztDQUNkLENBQUM7O0NDN0JELEtBQUssSUFBSSxlQUFlLElBQUl3QixZQUFZLEVBQUU7Q0FDMUMsRUFBRSxJQUFJLFVBQVUsR0FBR25GLFFBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUMzQyxFQUFFLElBQUksbUJBQW1CLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUM7Q0FFL0QsRUFBRSxJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixDQUFDLE9BQU8sS0FBSzZDLFlBQU8sRUFBRSxJQUFJO0NBQzFFLElBQUksMkJBQTJCLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxFQUFFQSxZQUFPLENBQUMsQ0FBQztDQUN6RSxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEdBQUdBLFlBQU8sQ0FBQztDQUMxQyxHQUFHO0NBQ0g7O0NDUkEsSUFBSVcsVUFBUSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUMzQyxJQUFJVSxlQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ25ELElBQUksV0FBVyxHQUFHa0IsaUJBQW9CLENBQUMsTUFBTSxDQUFDO0NBRTlDLEtBQUssSUFBSUMsaUJBQWUsSUFBSUYsWUFBWSxFQUFFO0NBQzFDLEVBQUUsSUFBSUcsWUFBVSxHQUFHdEYsUUFBTSxDQUFDcUYsaUJBQWUsQ0FBQyxDQUFDO0NBQzNDLEVBQUUsSUFBSUUscUJBQW1CLEdBQUdELFlBQVUsSUFBSUEsWUFBVSxDQUFDLFNBQVMsQ0FBQztDQUMvRCxFQUFFLElBQUlDLHFCQUFtQixFQUFFO0NBRTNCLElBQUksSUFBSUEscUJBQW1CLENBQUMvQixVQUFRLENBQUMsS0FBSyxXQUFXLEVBQUUsSUFBSTtDQUMzRCxNQUFNLDJCQUEyQixDQUFDK0IscUJBQW1CLEVBQUUvQixVQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FDOUUsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ3BCLE1BQU0rQixxQkFBbUIsQ0FBQy9CLFVBQVEsQ0FBQyxHQUFHLFdBQVcsQ0FBQztDQUNsRCxLQUFLO0NBQ0wsSUFBSSxJQUFJLENBQUMrQixxQkFBbUIsQ0FBQ3JCLGVBQWEsQ0FBQyxFQUFFO0NBQzdDLE1BQU0sMkJBQTJCLENBQUNxQixxQkFBbUIsRUFBRXJCLGVBQWEsRUFBRW1CLGlCQUFlLENBQUMsQ0FBQztDQUN2RixLQUFLO0NBQ0wsSUFBSSxJQUFJRixZQUFZLENBQUNFLGlCQUFlLENBQUMsRUFBRSxLQUFLLElBQUksV0FBVyxJQUFJRCxpQkFBb0IsRUFBRTtDQUVyRixNQUFNLElBQUlHLHFCQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLSCxpQkFBb0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJO0NBQ3RGLFFBQVEsMkJBQTJCLENBQUNHLHFCQUFtQixFQUFFLFdBQVcsRUFBRUgsaUJBQW9CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztDQUN6RyxPQUFPLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDdEIsUUFBUUcscUJBQW1CLENBQUMsV0FBVyxDQUFDLEdBQUdILGlCQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQzdFLE9BQU87Q0FDUCxLQUFLO0NBQ0wsR0FBRztDQUNIOzs7Q0NoQ0EsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0NBQ3RCLEVBQUUseUJBQXlCLENBQUM7Q0FFNUIsRUFBRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO0NBQzNFLElBQUksY0FBYyxHQUFHLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Q0FDckQsTUFBTSxPQUFPLE9BQU8sR0FBRyxDQUFDO0NBQ3hCLEtBQUssQ0FBQztDQUNOLEdBQUcsTUFBTTtDQUNULElBQUksY0FBYyxHQUFHLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Q0FDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxDQUFDO0NBQ25JLEtBQUssQ0FBQztDQUNOLEdBQUc7Q0FFSCxFQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3RCLENBQUM7Q0FFRCxjQUFjLEdBQUcsT0FBTzs7OztDQ1R4QixJQUFJSSxDQUFPLENBQUksU0FBVUMsQ0FBVixDQUFtQixDQVdoQyxTQUFTQyxDQUFULENBQWdCQyxDQUFoQixDQUFxQkMsQ0FBckIsQ0FBMEJDLENBQTFCLENBQWlDLENBTy9CLE9BTkFDLE1BQU0sQ0FBQy9ELGNBQVAsQ0FBc0I0RCxDQUF0QixDQUEyQkMsQ0FBM0IsQ0FBZ0MsQ0FDOUJDLEtBQUssQ0FBRUEsQ0FEdUIsQ0FFOUJFLFVBQVUsR0FGb0IsQ0FHOUJDLFlBQVksR0FIa0IsQ0FJOUJDLFFBQVEsR0FKc0IsQ0FBaEMsQ0FNQSxDQUFPTixDQUFHLENBQUNDLENBQUQsQ0FDWCxDQVVELFNBQVNNLENBQVQsQ0FBY0MsQ0FBZCxDQUF1QkMsQ0FBdkIsQ0FBZ0NDLENBQWhDLENBQXNDQyxDQUF0QyxDQUFtRDtDQUFBLElBRTdDQyxDQUFjLENBQUdILENBQU8sRUFBSUEsQ0FBTyxDQUFDSSxTQUFSLFlBQTZCQyxDQUF4QyxDQUFvREwsQ0FBcEQsQ0FBOERLLENBRmxDLENBRzdDQyxDQUFTLENBQUdaLE1BQU0sQ0FBQ2hELE1BQVAsQ0FBY3lELENBQWMsQ0FBQ0MsU0FBN0IsQ0FIaUMsQ0FJN0NHLENBQU8sQ0FBRyxJQUFJQyxDQUFKLENBQVlOLENBQVcsRUFBSSxFQUEzQixDQUptQyxDQVVqRCxPQUZBSSxDQUFTLENBQUNHLE9BQVYsQ0FBb0JDLENBQWdCLENBQUNYLENBQUQsQ0FBVUUsQ0FBVixDQUFnQk0sQ0FBaEIsQ0FFcEMsQ0FBT0QsQ0FDUjtDQWFELFNBQVNLLENBQVQsQ0FBa0JDLENBQWxCLENBQXNCckIsQ0FBdEIsQ0FBMkJzQixDQUEzQixDQUFnQyxDQUM5QixHQUFJLENBQ0YsT0FBTyxDQUFFQyxJQUFJLENBQUUsUUFBUixDQUFrQkQsR0FBRyxDQUFFRCxDQUFFLENBQUNHLElBQUgsQ0FBUXhCLENBQVIsQ0FBYXNCLENBQWIsQ0FBdkIsQ0FDUixDQUFDLE1BQU9HLENBQVAsQ0FBWSxDQUNaLE9BQU8sQ0FBRUYsSUFBSSxDQUFFLE9BQVIsQ0FBaUJELEdBQUcsQ0FBRUcsQ0FBdEIsQ0FDUixDQUNGO0NBZUQsU0FBU1gsQ0FBVCxFQUFxQixFQUNyQixTQUFTWSxDQUFULEVBQTZCLEVBQzdCLFNBQVNDLENBQVQsRUFBc0M7Q0ErQnRDLFNBQVNDLENBQVQsQ0FBK0JmLENBQS9CLENBQTBDLENBQ3hDLENBQUMsTUFBRCxDQUFTLE9BQVQsQ0FBa0IsUUFBbEIsRUFBNEIzRCxPQUE1QixDQUFvQyxTQUFTMkUsQ0FBVCxDQUFpQixDQUNuRDlCLENBQU0sQ0FBQ2MsQ0FBRCxDQUFZZ0IsQ0FBWixDQUFvQixTQUFTUCxDQUFULENBQWMsQ0FDdEMsWUFBWUosT0FBTCxDQUFhVyxDQUFiLENBQXFCUCxDQUFyQixDQUNSLENBRkssRUFHUCxDQUpELEVBS0QsQ0ErQkQsU0FBU1EsQ0FBVCxDQUF1QmYsQ0FBdkIsQ0FBa0NnQixDQUFsQyxDQUErQyxDQUM3QyxTQUFTQyxDQUFULENBQWdCSCxDQUFoQixDQUF3QlAsQ0FBeEIsQ0FBNkJXLENBQTdCLENBQXNDQyxDQUF0QyxDQUE4QyxDQUM1QyxJQUFJQyxDQUFNLENBQUdmLENBQVEsQ0FBQ0wsQ0FBUyxDQUFDYyxDQUFELENBQVYsQ0FBb0JkLENBQXBCLENBQStCTyxDQUEvQixDQUFyQixDQUNBLEdBQW9CLE9BQWhCLEdBQUFhLENBQU0sQ0FBQ1osSUFBWCxDQUNFVyxDQUFNLENBQUNDLENBQU0sQ0FBQ2IsR0FBUixDQURSLE1BRU8sS0FDRGMsQ0FBTSxDQUFHRCxDQUFNLENBQUNiLEdBRGYsQ0FFRHBCLENBQUssQ0FBR2tDLENBQU0sQ0FBQ2xDLEtBRmQsUUFHREEsQ0FBSyxFQUNZLFFBQWpCLGFBQU9BLENBQVAsQ0FEQSxFQUVBbUMsQ0FBTSxDQUFDYixJQUFQLENBQVl0QixDQUFaLENBQW1CLFNBQW5CLENBTEMsQ0FNSTZCLENBQVcsQ0FBQ0UsT0FBWixDQUFvQi9CLENBQUssQ0FBQ29DLE9BQTFCLEVBQW1DQyxJQUFuQyxDQUF3QyxTQUFTckMsQ0FBVCxDQUFnQixDQUM3RDhCLENBQU0sQ0FBQyxNQUFELENBQVM5QixDQUFULENBQWdCK0IsQ0FBaEIsQ0FBeUJDLENBQXpCLEVBQ1AsQ0FGTSxDQUVKLFNBQVNULENBQVQsQ0FBYyxDQUNmTyxDQUFNLENBQUMsT0FBRCxDQUFVUCxDQUFWLENBQWVRLENBQWYsQ0FBd0JDLENBQXhCLEVBQ1AsQ0FKTSxDQU5KLENBYUVILENBQVcsQ0FBQ0UsT0FBWixDQUFvQi9CLENBQXBCLEVBQTJCcUMsSUFBM0IsQ0FBZ0MsU0FBU0MsQ0FBVCxDQUFvQixDQUl6REosQ0FBTSxDQUFDbEMsS0FBUCxDQUFlc0MsQ0FKMEMsQ0FLekRQLENBQU8sQ0FBQ0csQ0FBRCxFQUNSLENBTk0sQ0FNSixTQUFTSyxDQUFULENBQWdCO0NBR2pCLE9BQU9ULENBQU0sQ0FBQyxPQUFELENBQVVTLENBQVYsQ0FBaUJSLENBQWpCLENBQTBCQyxDQUExQixDQUNkLENBVk0sQ0FXUixDQUNGLENBSUQsU0FBU1EsQ0FBVCxDQUFpQmIsQ0FBakIsQ0FBeUJQLENBQXpCLENBQThCLENBQzVCLFNBQVNxQixDQUFULEVBQXNDLENBQ3BDLFdBQVdaLENBQUosQ0FBZ0IsU0FBU0UsQ0FBVCxDQUFrQkMsQ0FBbEIsQ0FBMEIsQ0FDL0NGLENBQU0sQ0FBQ0gsQ0FBRCxDQUFTUCxDQUFULENBQWNXLENBQWQsQ0FBdUJDLENBQXZCLEVBQ1AsQ0FGTSxDQUdSLENBRUQsT0FBT1UsQ0FBZTtDQWFwQkEsQ0FBZSxDQUFHQSxDQUFlLENBQUNMLElBQWhCLENBQ2hCSSxDQURnQjtDQUloQkEsQ0FKZ0IsQ0FBSCxDQUtYQSxDQUEwQixFQUNqQztDQTVCRCxJQUFJQyxDQUFKLENBZ0NBLEtBQUsxQixPQUFMLENBQWV3QixFQUNoQixDQTBCRCxTQUFTdkIsQ0FBVCxDQUEwQlgsQ0FBMUIsQ0FBbUNFLENBQW5DLENBQXlDTSxDQUF6QyxDQUFrRCxDQUNoRCxJQUFJNkIsQ0FBSyxpQkFBVCxDQUVBLGdCQUF1QmhCLENBQWhCLENBQXdCUCxDQUF4QixDQUE2QixDQUNsQyxHQUFJLGNBQUF1QixDQUFKLENBQ0UsVUFBVUMsS0FBSixDQUFVLDhCQUFWLENBQU4sQ0FHRixHQUFJLGNBQUFELENBQUosQ0FBaUMsQ0FDL0IsR0FBZSxPQUFYLEdBQUFoQixDQUFKLENBQ0UsTUFBTVAsQ0FBTjtDQUtGLE9BQU95QixDQUFVLEVBQ2xCLENBYmlDLElBZWxDL0IsQ0FBTyxDQUFDYSxNQUFSLENBQWlCQSxDQWZpQixDQWdCbENiLENBQU8sQ0FBQ00sR0FBUixDQUFjQSxDQWhCb0IsR0FrQnJCLENBQ1gsSUFBSTBCLENBQVEsQ0FBR2hDLENBQU8sQ0FBQ2dDLFFBQXZCLENBQ0EsR0FBSUEsQ0FBSixDQUFjLENBQ1osSUFBSUMsQ0FBYyxDQUFHQyxDQUFtQixDQUFDRixDQUFELENBQVdoQyxDQUFYLENBQXhDLENBQ0EsR0FBSWlDLENBQUosQ0FBb0IsQ0FDbEIsR0FBSUEsQ0FBYyxHQUFLRSxDQUF2QixDQUF5QyxTQUN6QyxPQUFPRixDQUNSLENBQ0YsQ0FFRCxHQUF1QixNQUFuQixHQUFBakMsQ0FBTyxDQUFDYSxNQUFaLENBR0ViLENBQU8sQ0FBQ29DLElBQVIsQ0FBZXBDLENBQU8sQ0FBQ3FDLEtBQVIsQ0FBZ0JyQyxDQUFPLENBQUNNLEdBSHpDLFNBSzhCLE9BQW5CLEdBQUFOLENBQU8sQ0FBQ2EsTUFBWixDQUFnQyxDQUNyQyxHQUFJLG1CQUFBZ0IsQ0FBSixDQUVFLE1BREFBLENBQUssWUFDTCxDQUFNN0IsQ0FBTyxDQUFDTSxHQUFkLENBR0ZOLENBQU8sQ0FBQ3NDLGlCQUFSLENBQTBCdEMsQ0FBTyxDQUFDTSxHQUFsQyxFQUVELENBUk0sS0FRdUIsUUFBbkIsR0FBQU4sQ0FBTyxDQUFDYSxNQVJaLEVBU0xiLENBQU8sQ0FBQ3VDLE1BQVIsQ0FBZSxRQUFmLENBQXlCdkMsQ0FBTyxDQUFDTSxHQUFqQyxDQVRLLENBWVB1QixDQUFLLFlBM0JNLENBNkJYLElBQUlWLENBQU0sQ0FBR2YsQ0FBUSxDQUFDWixDQUFELENBQVVFLENBQVYsQ0FBZ0JNLENBQWhCLENBQXJCLENBQ0EsR0FBb0IsUUFBaEIsR0FBQW1CLENBQU0sQ0FBQ1osSUFBWCxDQUE4QixDQU81QixHQUpBc0IsQ0FBSyxDQUFHN0IsQ0FBTyxDQUFDd0MsSUFBUiw2QkFJUixDQUFJckIsQ0FBTSxDQUFDYixHQUFQLEdBQWU2QixDQUFuQixDQUNFLFNBR0YsT0FBTyxDQUNMakQsS0FBSyxDQUFFaUMsQ0FBTSxDQUFDYixHQURULENBRUxrQyxJQUFJLENBQUV4QyxDQUFPLENBQUN3QyxJQUZULENBS1IsQ0FBMEIsT0FBaEIsR0FBQXJCLENBQU0sQ0FBQ1osSUE5Q1A7Q0ErQ1RzQixDQUFLLFlBL0NJLENBa0RUN0IsQ0FBTyxDQUFDYSxNQUFSLENBQWlCLE9BbERSLENBbURUYixDQUFPLENBQUNNLEdBQVIsQ0FBY2EsQ0FBTSxDQUFDYixHQW5EWixFQXFEWixDQUNGLENBQ0Y7Q0FNRCxTQUFTNEIsQ0FBVCxDQUE2QkYsQ0FBN0IsQ0FBdUNoQyxDQUF2QyxDQUFnRCxDQUM5QyxJQUFJYSxDQUFNLENBQUdtQixDQUFRLENBQUNTLFFBQVQsQ0FBa0J6QyxDQUFPLENBQUNhLE1BQTFCLENBQWIsQ0FDQSxHQUFJLFNBQUFBLENBQUosQ0FBMEIsQ0FLeEIsR0FGQWIsQ0FBTyxDQUFDZ0MsUUFBUixDQUFtQixJQUVuQixDQUF1QixPQUFuQixHQUFBaEMsQ0FBTyxDQUFDYSxNQUFaLENBQWdDO0NBRTlCLEdBQUltQixDQUFRLENBQUNTLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBSixHQUdFekMsQ0FBTyxDQUFDYSxNQUFSLENBQWlCLFFBSG5CLENBSUViLENBQU8sQ0FBQ00sR0FBUixPQUpGLENBS0U0QixDQUFtQixDQUFDRixDQUFELENBQVdoQyxDQUFYLENBTHJCLENBT3lCLE9BQW5CLEdBQUFBLENBQU8sQ0FBQ2EsTUFQZDtDQVVJLE9BQU9zQixDQUFQLENBSUpuQyxDQUFPLENBQUNhLE1BQVIsQ0FBaUIsT0FoQmEsQ0FpQjlCYixDQUFPLENBQUNNLEdBQVIsQ0FBYyxJQUFJbkMsU0FBSixDQUNaLGdEQURZLEVBRWYsQ0FFRCxPQUFPZ0UsQ0FDUixDQUVELElBQUloQixDQUFNLENBQUdmLENBQVEsQ0FBQ1MsQ0FBRCxDQUFTbUIsQ0FBUSxDQUFDUyxRQUFsQixDQUE0QnpDLENBQU8sQ0FBQ00sR0FBcEMsQ0FBckIsQ0FFQSxHQUFvQixPQUFoQixHQUFBYSxDQUFNLENBQUNaLElBQVgsQ0FJRSxPQUhBUCxDQUFPLENBQUNhLE1BQVIsQ0FBaUIsT0FHakIsQ0FGQWIsQ0FBTyxDQUFDTSxHQUFSLENBQWNhLENBQU0sQ0FBQ2IsR0FFckIsQ0FEQU4sQ0FBTyxDQUFDZ0MsUUFBUixDQUFtQixJQUNuQixDQUFPRyxDQUFQLENBR0YsSUFBSU8sQ0FBSSxDQUFHdkIsQ0FBTSxDQUFDYixHQUFsQixDQUVBLEdBQUksQ0FBRW9DLENBQU4sQ0FJRSxPQUhBMUMsQ0FBTyxDQUFDYSxNQUFSLENBQWlCLE9BR2pCLENBRkFiLENBQU8sQ0FBQ00sR0FBUixDQUFjLElBQUluQyxTQUFKLENBQWMsa0NBQWQsQ0FFZCxDQURBNkIsQ0FBTyxDQUFDZ0MsUUFBUixDQUFtQixJQUNuQixDQUFPRyxDQUFQLENBR0YsR0FBSU8sQ0FBSSxDQUFDRixJQUFULENBR0V4QyxDQUFPLENBQUNnQyxDQUFRLENBQUNXLFVBQVYsQ0FBUCxDQUErQkQsQ0FBSSxDQUFDeEQsS0FIdEMsQ0FNRWMsQ0FBTyxDQUFDNEMsSUFBUixDQUFlWixDQUFRLENBQUNhLE9BTjFCLENBY3lCLFFBQW5CLEdBQUE3QyxDQUFPLENBQUNhLE1BZGQsR0FlSWIsQ0FBTyxDQUFDYSxNQUFSLENBQWlCLE1BZnJCLENBZ0JJYixDQUFPLENBQUNNLEdBQVIsT0FoQko7Q0FxQkUsT0FBT29DLENBQVA7Q0FNRixPQURBMUMsQ0FBTyxDQUFDZ0MsUUFBUixDQUFtQixJQUNuQixDQUFPRyxDQUNSO0NBcUJELFNBQVNXLENBQVQsQ0FBc0JDLENBQXRCLENBQTRCLENBQzFCLElBQUlDLENBQUssQ0FBRyxDQUFFQyxNQUFNLENBQUVGLENBQUksQ0FBQyxDQUFELENBQWQsQ0FBWixDQUVJLEtBQUtBLENBSGlCLEdBSXhCQyxDQUFLLENBQUNFLFFBQU4sQ0FBaUJILENBQUksQ0FBQyxDQUFELENBSkcsRUFPdEIsS0FBS0EsQ0FQaUIsR0FReEJDLENBQUssQ0FBQ0csVUFBTixDQUFtQkosQ0FBSSxDQUFDLENBQUQsQ0FSQyxDQVN4QkMsQ0FBSyxDQUFDSSxRQUFOLENBQWlCTCxDQUFJLENBQUMsQ0FBRCxDQVRHLEVBWTFCLEtBQUtNLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCTixDQUFyQixFQUNELENBRUQsU0FBU08sQ0FBVCxDQUF1QlAsQ0FBdkIsQ0FBOEIsQ0FDNUIsSUFBSTdCLENBQU0sQ0FBRzZCLENBQUssQ0FBQ1EsVUFBTixFQUFvQixFQUFqQyxDQUNBckMsQ0FBTSxDQUFDWixJQUFQLENBQWMsUUFGYyxDQUc1QixPQUFPWSxDQUFNLENBQUNiLEdBSGMsQ0FJNUIwQyxDQUFLLENBQUNRLFVBQU4sQ0FBbUJyQyxFQUNwQixDQUVELFNBQVNsQixDQUFULENBQWlCTixDQUFqQixDQUE4QixDQUk1QixLQUFLMEQsVUFBTCxDQUFrQixDQUFDLENBQUVKLE1BQU0sQ0FBRSxNQUFWLENBQUQsQ0FKVSxDQUs1QnRELENBQVcsQ0FBQ3pELE9BQVosQ0FBb0I0RyxDQUFwQixDQUFrQyxJQUFsQyxDQUw0QixDQU01QixLQUFLVyxLQUFMLEtBQ0QsQ0E2QkQsU0FBU0MsQ0FBVCxDQUFnQkMsQ0FBaEIsQ0FBMEIsQ0FDeEIsR0FBSUEsQ0FBSixDQUFjLENBQ1osSUFBSUMsQ0FBYyxDQUFHRCxDQUFRLENBQUNFLENBQUQsQ0FBN0IsQ0FDQSxHQUFJRCxDQUFKLENBQ0UsT0FBT0EsQ0FBYyxDQUFDcEQsSUFBZixDQUFvQm1ELENBQXBCLENBQVAsQ0FHRixHQUE2QixVQUF6QixTQUFPQSxDQUFRLENBQUNmLElBQXBCLENBQ0UsT0FBT2UsQ0FBUCxDQUdGLEdBQUksQ0FBQ0csS0FBSyxDQUFDSCxDQUFRLENBQUNJLE1BQVYsQ0FBVixDQUE2QixDQUMzQixJQUFJQyxDQUFDLENBQUcsQ0FBQyxDQUFULENBQVlwQixDQUFJLENBQUcsU0FBU0EsQ0FBVCxFQUFnQixNQUMxQixFQUFFb0IsQ0FBRixDQUFNTCxDQUFRLENBQUNJLE1BRFcsRUFFL0IsR0FBSTFDLENBQU0sQ0FBQ2IsSUFBUCxDQUFZbUQsQ0FBWixDQUFzQkssQ0FBdEIsQ0FBSixDQUdFLE9BRkFwQixDQUFJLENBQUMxRCxLQUFMLENBQWF5RSxDQUFRLENBQUNLLENBQUQsQ0FFckIsQ0FEQXBCLENBQUksQ0FBQ0osSUFBTCxHQUNBLENBQU9JLENBQVAsQ0FPSixPQUhBQSxDQUFJLENBQUMxRCxLQUFMLE9BR0EsQ0FGQTBELENBQUksQ0FBQ0osSUFBTCxHQUVBLENBQU9JLENBQ1IsQ0FiRCxDQWVBLE9BQU9BLENBQUksQ0FBQ0EsSUFBTCxDQUFZQSxDQUNwQixDQUNGO0NBR0QsT0FBTyxDQUFFQSxJQUFJLENBQUViLENBQVIsQ0FDUixDQUdELFNBQVNBLENBQVQsRUFBc0IsQ0FDcEIsT0FBTyxDQUFFN0MsS0FBSyxPQUFQLENBQW9Cc0QsSUFBSSxHQUF4QixDQUNSLENBL2YrQixJQUc1QnlCLENBQUUsQ0FBRzlFLE1BQU0sQ0FBQ1UsU0FIZ0IsQ0FJNUJ3QixDQUFNLENBQUc0QyxDQUFFLENBQUNDLGNBSmdCLENBTTVCQyxDQUFPLENBQXFCLFVBQWxCLFNBQU9sSixNQUFQLENBQStCQSxNQUEvQixDQUF3QyxFQU50QixDQU81QjRJLENBQWMsQ0FBR00sQ0FBTyxDQUFDMUIsUUFBUixFQUFvQixZQVBULENBUTVCMkIsQ0FBbUIsQ0FBR0QsQ0FBTyxDQUFDRSxhQUFSLEVBQXlCLGlCQVJuQixDQVM1QkMsQ0FBaUIsQ0FBR0gsQ0FBTyxDQUFDSSxXQUFSLEVBQXVCLGVBVGYsQ0FvQmhDLEdBQUksQ0FFRnhGLENBQU0sQ0FBQyxFQUFELENBQUssRUFBTCxFQUNQLENBQUMsTUFBTzBCLENBQVAsQ0FBWSxDQUNaMUIsQ0FBTSxDQUFHLFNBQVNDLENBQVQsQ0FBY0MsQ0FBZCxDQUFtQkMsQ0FBbkIsQ0FBMEIsQ0FDakMsT0FBT0YsQ0FBRyxDQUFDQyxDQUFELENBQUgsQ0FBV0MsQ0FDbkIsRUFDRixDQWNESixDQUFPLENBQUNTLElBQVIsQ0FBZUEsQ0F6Q2lCLEtBb0U1QjRDLENBQWdCLENBQUcsRUFwRVMsQ0FnRjVCM0YsQ0FBaUIsQ0FBRyxFQWhGUSxDQWlGaENBLENBQWlCLENBQUNxSCxDQUFELENBQWpCLENBQW9DLFVBQVksQ0FDOUMsV0FDRCxDQW5GK0IsS0FxRjVCVyxDQUFRLENBQUdyRixNQUFNLENBQUM1QyxjQXJGVSxDQXNGNUJrSSxDQUF1QixDQUFHRCxDQUFRLEVBQUlBLENBQVEsQ0FBQ0EsQ0FBUSxDQUFDZCxDQUFNLENBQUMsRUFBRCxDQUFQLENBQVQsQ0F0RmxCLENBdUY1QmUsQ0FBdUIsRUFDdkJBLENBQXVCLEdBQUtSLENBRDVCLEVBRUE1QyxDQUFNLENBQUNiLElBQVAsQ0FBWWlFLENBQVosQ0FBcUNaLENBQXJDLENBekY0QixHQTRGOUJySCxDQUFpQixDQUFHaUksQ0E1RlUsRUErRmhDLElBQUlDLENBQUUsQ0FBRy9ELENBQTBCLENBQUNkLFNBQTNCLENBQ1BDLENBQVMsQ0FBQ0QsU0FBVixDQUFzQlYsTUFBTSxDQUFDaEQsTUFBUCxDQUFjSyxDQUFkLENBRHhCO0NBOG1CQSxPQTVtQkFrRSxDQUFpQixDQUFDYixTQUFsQixDQUE4QjZFLENBQUUsQ0FBQ0MsV0FBSCxDQUFpQmhFLENBNG1CL0MsQ0EzbUJBQSxDQUEwQixDQUFDZ0UsV0FBM0IsQ0FBeUNqRSxDQTJtQnpDLENBMW1CQUEsQ0FBaUIsQ0FBQ2tFLFdBQWxCLENBQWdDN0YsQ0FBTSxDQUNwQzRCLENBRG9DLENBRXBDMkQsQ0FGb0MsQ0FHcEMsbUJBSG9DLENBMG1CdEMsQ0ExbEJBeEYsQ0FBTyxDQUFDK0YsbUJBQVIsQ0FBOEIsU0FBU0MsQ0FBVCxDQUFpQixDQUM3QyxJQUFJQyxDQUFJLENBQXFCLFVBQWxCLFNBQU9ELENBQVAsRUFBZ0NBLENBQU0sQ0FBQ0gsV0FBbEQsQ0FDQSxTQUFPSSxDQUFQLEdBQ0lBLENBQUksR0FBS3JFLENBQVQ7Q0FHb0MsbUJBQXBDLElBQUNxRSxDQUFJLENBQUNILFdBQUwsRUFBb0JHLENBQUksQ0FBQ0MsSUFBMUIsQ0FKSixDQU1ELENBa2xCRCxDQWhsQkFsRyxDQUFPLENBQUNtRyxJQUFSLENBQWUsU0FBU0gsQ0FBVCxDQUFpQixDQVE5QixPQVBJM0YsTUFBTSxDQUFDckMsY0FPWCxDQU5FcUMsTUFBTSxDQUFDckMsY0FBUCxDQUFzQmdJLENBQXRCLENBQThCbkUsQ0FBOUIsQ0FNRixFQUpFbUUsQ0FBTSxDQUFDSSxTQUFQLENBQW1CdkUsQ0FJckIsQ0FIRTVCLENBQU0sQ0FBQytGLENBQUQsQ0FBU1IsQ0FBVCxDQUE0QixtQkFBNUIsQ0FHUixFQURBUSxDQUFNLENBQUNqRixTQUFQLENBQW1CVixNQUFNLENBQUNoRCxNQUFQLENBQWN1SSxDQUFkLENBQ25CLENBQU9JLENBQ1IsQ0F1a0JELENBamtCQWhHLENBQU8sQ0FBQ3FHLEtBQVIsQ0FBZ0IsU0FBUzdFLENBQVQsQ0FBYyxDQUM1QixPQUFPLENBQUVnQixPQUFPLENBQUVoQixDQUFYLENBQ1IsQ0ErakJELENBMWZBTSxDQUFxQixDQUFDRSxDQUFhLENBQUNqQixTQUFmLENBMGZyQixDQXpmQWlCLENBQWEsQ0FBQ2pCLFNBQWQsQ0FBd0J1RSxDQUF4QixFQUErQyxVQUFZLENBQ3pELFdBQ0QsQ0F1ZkQsQ0F0ZkF0RixDQUFPLENBQUNnQyxhQUFSLENBQXdCQSxDQXNmeEIsQ0FqZkFoQyxDQUFPLENBQUNzRyxLQUFSLENBQWdCLFNBQVM1RixDQUFULENBQWtCQyxDQUFsQixDQUEyQkMsQ0FBM0IsQ0FBaUNDLENBQWpDLENBQThDb0IsQ0FBOUMsQ0FBMkQsQ0FDckQsTUFBaEIsR0FBQUEsQ0FEcUUsR0FDN0NBLENBQVcsQ0FBRy9DLE9BRCtCLEVBR3pFLElBQUlxSCxDQUFJLENBQUcsSUFBSXZFLENBQUosQ0FDVHZCLENBQUksQ0FBQ0MsQ0FBRCxDQUFVQyxDQUFWLENBQW1CQyxDQUFuQixDQUF5QkMsQ0FBekIsQ0FESyxDQUVUb0IsQ0FGUyxDQUFYLENBS0EsT0FBT2pDLENBQU8sQ0FBQytGLG1CQUFSLENBQTRCcEYsQ0FBNUIsRUFDSDRGO0NBREcsQ0FFSEEsQ0FBSSxDQUFDekMsSUFBTCxHQUFZckIsSUFBWixDQUFpQixTQUFTSCxDQUFULENBQWlCLENBQ2hDLE9BQU9BLENBQU0sQ0FBQ29CLElBQVAsQ0FBY3BCLENBQU0sQ0FBQ2xDLEtBQXJCLENBQTZCbUcsQ0FBSSxDQUFDekMsSUFBTCxFQUNyQyxDQUZELENBR0wsQ0FvZUQsQ0EvVEFoQyxDQUFxQixDQUFDOEQsQ0FBRCxDQStUckIsQ0E3VEEzRixDQUFNLENBQUMyRixDQUFELENBQUtKLENBQUwsQ0FBd0IsV0FBeEIsQ0E2VE4sQ0F0VEFJLENBQUUsQ0FBQ2IsQ0FBRCxDQUFGLENBQXFCLFVBQVcsQ0FDOUIsV0FDRCxDQW9URCxDQWxUQWEsQ0FBRSxDQUFDMUosUUFBSCxDQUFjLFVBQVcsQ0FDdkIsT0FBTyxvQkFDUixDQWdURCxDQS9RQThELENBQU8sQ0FBQ3dHLElBQVIsQ0FBZSxTQUFTQyxDQUFULENBQWlCLENBQzlCLElBQUlELENBQUksQ0FBRyxFQUFYLENBQ0EsSUFBSyxJQUFJckcsQ0FBVCxJQUFnQnNHLENBQWhCLENBQ0VELENBQUksQ0FBQ2hDLElBQUwsQ0FBVXJFLENBQVY7Q0FNRixPQUpBcUcsQ0FBSSxDQUFDRSxPQUFMLEVBSUEsQ0FBTyxTQUFTNUMsQ0FBVCxFQUFnQixNQUNkMEMsQ0FBSSxDQUFDdkIsTUFEUyxFQUNELENBQ2xCLElBQUk5RSxDQUFHLENBQUdxRyxDQUFJLENBQUNHLEdBQUwsRUFBVixDQUNBLEdBQUl4RyxDQUFHLElBQUlzRyxDQUFYLENBR0UsT0FGQTNDLENBQUksQ0FBQzFELEtBQUwsQ0FBYUQsQ0FFYixDQURBMkQsQ0FBSSxDQUFDSixJQUFMLEdBQ0EsQ0FBT0ksQ0FFVjtDQU1ELE9BREFBLENBQUksQ0FBQ0osSUFBTCxHQUNBLENBQU9JLENBQ1IsQ0FDRixDQXNQRCxDQWxOQTlELENBQU8sQ0FBQzRFLE1BQVIsQ0FBaUJBLENBa05qQixDQTVNQXpELENBQU8sQ0FBQ0osU0FBUixDQUFvQixDQUNsQjhFLFdBQVcsQ0FBRTFFLENBREssQ0FHbEJ3RCxLQUFLLENBQUUsZUFBU2lDLENBQVQsQ0FBd0IsQ0FjN0IsR0FiQSxLQUFLQyxJQUFMLENBQVksQ0FhWixDQVpBLEtBQUsvQyxJQUFMLENBQVksQ0FZWixDQVRBLEtBQUtSLElBQUwsQ0FBWSxLQUFLQyxLQUFMLE9BU1osQ0FSQSxLQUFLRyxJQUFMLEdBUUEsQ0FQQSxLQUFLUixRQUFMLENBQWdCLElBT2hCLENBTEEsS0FBS25CLE1BQUwsQ0FBYyxNQUtkLENBSkEsS0FBS1AsR0FBTCxPQUlBLENBRkEsS0FBSytDLFVBQUwsQ0FBZ0JuSCxPQUFoQixDQUF3QnFILENBQXhCLENBRUEsQ0FBSSxDQUFDbUMsQ0FBTCxDQUNFLElBQUssSUFBSVYsQ0FBVCxRQUFBO0NBRXlCLEdBQW5CLEdBQUFBLENBQUksQ0FBQ1ksTUFBTCxDQUFZLENBQVosR0FDQXZFLENBQU0sQ0FBQ2IsSUFBUCxDQUFZLElBQVosQ0FBa0J3RSxDQUFsQixDQURBLEVBRUEsQ0FBQ2xCLEtBQUssQ0FBQyxDQUFDa0IsQ0FBSSxDQUFDYSxLQUFMLENBQVcsQ0FBWCxDQUFGLENBSlosR0FLSSxLQUFLYixDQUFMLFFBTEosRUFTSCxDQTNCaUIsQ0E2QmxCYyxJQUFJLENBQUUsZUFBVyxDQUNmLEtBQUt0RCxJQUFMLEdBRGUsS0FHWHVELENBQVMsQ0FBRyxLQUFLMUMsVUFBTCxDQUFnQixDQUFoQixDQUhELENBSVgyQyxDQUFVLENBQUdELENBQVMsQ0FBQ3ZDLFVBSlosQ0FLZixHQUF3QixPQUFwQixHQUFBd0MsQ0FBVSxDQUFDekYsSUFBZixDQUNFLE1BQU15RixDQUFVLENBQUMxRixHQUFqQixDQUdGLFlBQVkyRixJQUNiLENBdkNpQixDQXlDbEIzRCxpQkFBaUIsQ0FBRSwyQkFBUzRELENBQVQsQ0FBb0IsQ0FNckMsU0FBU0MsQ0FBVCxDQUFnQkMsQ0FBaEIsQ0FBcUJDLENBQXJCLENBQTZCLENBWTNCLE9BWEFsRixDQUFNLENBQUNaLElBQVAsQ0FBYyxPQVdkLENBVkFZLENBQU0sQ0FBQ2IsR0FBUCxDQUFhNEYsQ0FVYixDQVRBbEcsQ0FBTyxDQUFDNEMsSUFBUixDQUFld0QsQ0FTZixDQVBJQyxDQU9KLEdBSkVyRyxDQUFPLENBQUNhLE1BQVIsQ0FBaUIsTUFJbkIsQ0FIRWIsQ0FBTyxDQUFDTSxHQUFSLE9BR0YsRUFBTyxDQUFDLENBQUUrRixDQUNYLENBbEJELEdBQUksS0FBSzdELElBQVQsQ0FDRSxNQUFNMEQsQ0FBTixDQW1CRixRQWhCSWxHLENBQU8sQ0FBRyxJQWdCZCxDQUFTZ0UsQ0FBQyxDQUFHLEtBQUtYLFVBQUwsQ0FBZ0JVLE1BQWhCLENBQXlCLENBQXRDLENBQThDLENBQUwsRUFBQUMsQ0FBekMsQ0FBaUQsRUFBRUEsQ0FBbkQsQ0FBc0QsS0FDaERoQixDQUFLLENBQUcsS0FBS0ssVUFBTCxDQUFnQlcsQ0FBaEIsQ0FEd0MsQ0FFaEQ3QyxDQUFNLENBQUc2QixDQUFLLENBQUNRLFVBRmlDLENBSXBELEdBQXFCLE1BQWpCLEdBQUFSLENBQUssQ0FBQ0MsTUFBVjtDQUlFLE9BQU9rRCxDQUFNLENBQUMsS0FBRCxDQUFiLENBR0YsR0FBSW5ELENBQUssQ0FBQ0MsTUFBTixFQUFnQixLQUFLMEMsSUFBekIsQ0FBK0IsS0FDekJXLENBQVEsQ0FBR2pGLENBQU0sQ0FBQ2IsSUFBUCxDQUFZd0MsQ0FBWixDQUFtQixVQUFuQixDQURjLENBRXpCdUQsQ0FBVSxDQUFHbEYsQ0FBTSxDQUFDYixJQUFQLENBQVl3QyxDQUFaLENBQW1CLFlBQW5CLENBRlksQ0FJN0IsR0FBSXNELENBQVEsRUFBSUMsQ0FBaEIsQ0FBNEIsQ0FDMUIsR0FBSSxLQUFLWixJQUFMLENBQVkzQyxDQUFLLENBQUNFLFFBQXRCLENBQ0UsT0FBT2lELENBQU0sQ0FBQ25ELENBQUssQ0FBQ0UsUUFBUCxJQUFiLENBQ0ssR0FBSSxLQUFLeUMsSUFBTCxDQUFZM0MsQ0FBSyxDQUFDRyxVQUF0QixDQUNMLE9BQU9nRCxDQUFNLENBQUNuRCxDQUFLLENBQUNHLFVBQVAsQ0FHaEIsQ0FQRCxRQU9XbUQsQ0FBSixFQUNMLEdBQUksS0FBS1gsSUFBTCxDQUFZM0MsQ0FBSyxDQUFDRSxRQUF0QixDQUNFLE9BQU9pRCxDQUFNLENBQUNuRCxDQUFLLENBQUNFLFFBQVAsSUFBYixDQUZHLFVBS0lxRCxDQUFKLENBTUwsVUFBVXpFLEtBQUosQ0FBVSx3Q0FBVixDQUFOLENBTkssUUFDRCxLQUFLNkQsSUFBTCxDQUFZM0MsQ0FBSyxDQUFDRyxVQUF0QixDQUNFLE9BQU9nRCxDQUFNLENBQUNuRCxDQUFLLENBQUNHLFVBQVAsQ0FNbEIsQ0FDRixDQUNGLENBbkdpQixDQXFHbEJaLE1BQU0sQ0FBRSxnQkFBU2hDLENBQVQsQ0FBZUQsQ0FBZixDQUFvQixDQUMxQixJQUFLLElBQ0MwQyxDQURELENBQUlnQixDQUFDLENBQUcsS0FBS1gsVUFBTCxDQUFnQlUsTUFBaEIsQ0FBeUIsQ0FBdEMsQ0FBOEMsQ0FBTCxFQUFBQyxDQUF6QyxDQUFpRCxFQUFFQSxDQUFuRCxDQUVFLEdBREloQixDQUNKLENBRFksS0FBS0ssVUFBTCxDQUFnQlcsQ0FBaEIsQ0FDWixDQUFJaEIsQ0FBSyxDQUFDQyxNQUFOLEVBQWdCLEtBQUswQyxJQUFyQixFQUNBdEUsQ0FBTSxDQUFDYixJQUFQLENBQVl3QyxDQUFaLENBQW1CLFlBQW5CLENBREEsRUFFQSxLQUFLMkMsSUFBTCxDQUFZM0MsQ0FBSyxDQUFDRyxVQUZ0QixDQUVrQyxDQUNoQyxJQUFJcUQsQ0FBWSxDQUFHeEQsQ0FBbkIsQ0FDQSxLQUNELENBR0N3RCxDQUFZLEdBQ0YsT0FBVCxHQUFBakcsQ0FBSSxFQUNLLFVBQVQsR0FBQUEsQ0FGVyxDQUFaLEVBR0FpRyxDQUFZLENBQUN2RCxNQUFiLEVBQXVCM0MsQ0FIdkIsRUFJQUEsQ0FBRyxFQUFJa0csQ0FBWSxDQUFDckQsVUFmRSxHQWtCeEJxRCxDQUFZLENBQUcsSUFsQlMsRUFxQjFCLElBQUlyRixDQUFNLENBQUdxRixDQUFZLENBQUdBLENBQVksQ0FBQ2hELFVBQWhCLENBQTZCLEVBQXRELENBckIwQixPQXNCMUJyQyxDQUFNLENBQUNaLElBQVAsQ0FBY0EsQ0F0QlksQ0F1QjFCWSxDQUFNLENBQUNiLEdBQVAsQ0FBYUEsQ0F2QmEsQ0F5QnRCa0csQ0F6QnNCLEVBMEJ4QixLQUFLM0YsTUFBTCxDQUFjLE1BMUJVLENBMkJ4QixLQUFLK0IsSUFBTCxDQUFZNEQsQ0FBWSxDQUFDckQsVUEzQkQsQ0E0QmpCaEIsQ0E1QmlCLEVBK0JuQixLQUFLc0UsUUFBTCxDQUFjdEYsQ0FBZCxDQUNSLENBcklpQixDQXVJbEJzRixRQUFRLENBQUUsa0JBQVN0RixDQUFULENBQWlCaUMsQ0FBakIsQ0FBMkIsQ0FDbkMsR0FBb0IsT0FBaEIsR0FBQWpDLENBQU0sQ0FBQ1osSUFBWCxDQUNFLE1BQU1ZLENBQU0sQ0FBQ2IsR0FBYixDQWNGLE9BWG9CLE9BQWhCLEdBQUFhLENBQU0sQ0FBQ1osSUFBUCxFQUNnQixVQUFoQixHQUFBWSxDQUFNLENBQUNaLElBVVgsQ0FURSxLQUFLcUMsSUFBTCxDQUFZekIsQ0FBTSxDQUFDYixHQVNyQixDQVIyQixRQUFoQixHQUFBYSxDQUFNLENBQUNaLElBUWxCLEVBUEUsS0FBSzBGLElBQUwsQ0FBWSxLQUFLM0YsR0FBTCxDQUFXYSxDQUFNLENBQUNiLEdBT2hDLENBTkUsS0FBS08sTUFBTCxDQUFjLFFBTWhCLENBTEUsS0FBSytCLElBQUwsQ0FBWSxLQUtkLEVBSjJCLFFBQWhCLEdBQUF6QixDQUFNLENBQUNaLElBQVAsRUFBNEI2QyxDQUl2QyxHQUhFLEtBQUtSLElBQUwsQ0FBWVEsQ0FHZCxFQUFPakIsQ0FDUixDQXhKaUIsQ0EwSmxCdUUsTUFBTSxDQUFFLGdCQUFTdkQsQ0FBVCxDQUFxQixDQUMzQixJQUFLLElBQ0NILENBREQsQ0FBSWdCLENBQUMsQ0FBRyxLQUFLWCxVQUFMLENBQWdCVSxNQUFoQixDQUF5QixDQUF0QyxDQUE4QyxDQUFMLEVBQUFDLENBQXpDLENBQWlELEVBQUVBLENBQW5ELENBRUUsR0FESWhCLENBQ0osQ0FEWSxLQUFLSyxVQUFMLENBQWdCVyxDQUFoQixDQUNaLENBQUloQixDQUFLLENBQUNHLFVBQU4sR0FBcUJBLENBQXpCLENBR0UsWUFGS3NELFFBQUwsQ0FBY3pELENBQUssQ0FBQ1EsVUFBcEIsQ0FBZ0NSLENBQUssQ0FBQ0ksUUFBdEMsQ0FFQSxDQURBRyxDQUFhLENBQUNQLENBQUQsQ0FDYixDQUFPYixDQUdaLENBbktpQixDQXFLbEIsTUFBUyxnQkFBU2MsQ0FBVCxDQUFpQixDQUN4QixJQUFLLElBQ0NELENBREQsQ0FBSWdCLENBQUMsQ0FBRyxLQUFLWCxVQUFMLENBQWdCVSxNQUFoQixDQUF5QixDQUF0QyxDQUE4QyxDQUFMLEVBQUFDLENBQXpDLENBQWlELEVBQUVBLENBQW5ELENBRUUsR0FESWhCLENBQ0osQ0FEWSxLQUFLSyxVQUFMLENBQWdCVyxDQUFoQixDQUNaLENBQUloQixDQUFLLENBQUNDLE1BQU4sR0FBaUJBLENBQXJCLENBQTZCLENBQzNCLElBQUk5QixDQUFNLENBQUc2QixDQUFLLENBQUNRLFVBQW5CLENBQ0EsR0FBb0IsT0FBaEIsR0FBQXJDLENBQU0sQ0FBQ1osSUFBWCxDQUE2QixDQUMzQixJQUFJb0csQ0FBTSxDQUFHeEYsQ0FBTSxDQUFDYixHQUFwQixDQUNBaUQsQ0FBYSxDQUFDUCxDQUFELEVBQ2QsQ0FDRCxPQUFPMkQsQ0FDUjtDQUtILFVBQVU3RSxLQUFKLENBQVUsdUJBQVYsQ0FDUCxDQXJMaUIsQ0F1TGxCOEUsYUFBYSxDQUFFLHVCQUFTakQsQ0FBVCxDQUFtQmhCLENBQW5CLENBQStCRSxDQUEvQixDQUF3QyxDQWFyRCxZQVpLYixRQUFMLENBQWdCLENBQ2RTLFFBQVEsQ0FBRWlCLENBQU0sQ0FBQ0MsQ0FBRCxDQURGLENBRWRoQixVQUFVLENBQUVBLENBRkUsQ0FHZEUsT0FBTyxDQUFFQSxDQUhLLENBWWhCLENBTm9CLE1BQWhCLFFBQUtoQyxNQU1ULEdBSEUsS0FBS1AsR0FBTCxPQUdGLEVBQU82QixDQUNSLENBck1pQixDQTRNcEIsQ0FBT3JELENBRVIsQ0Evc0JjO0NBb3RCZ0IrSCxDQUFNLENBQUMvSCxPQXB0QnZCLENBQWYsQ0F1dEJBLEdBQUksQ0FDRmdJLGtCQUFrQixDQUFHakksRUFDdEIsQ0FBQyxNQUFPa0ksQ0FBUCxDQUE2QjtDQVU3QkMsUUFBUSxDQUFDLEdBQUQsQ0FBTSx3QkFBTixDQUFSLENBQXdDbkksQ0FBeEM7O0NDMXVCRixlQUFjLEdBQUd2RSxTQUE4Qjs7Q0NBL0MsU0FBUyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7Q0FDM0UsRUFBRSxJQUFJO0NBQ04sSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDN0IsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0NBQzNCLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNsQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNsQixJQUFJLE9BQU87Q0FDWCxHQUFHO0NBRUgsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Q0FDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDbkIsR0FBRyxNQUFNO0NBQ1QsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDL0MsR0FBRztDQUNILENBQUM7Q0FFRCxTQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU8sWUFBWTtDQUNyQixJQUFJLElBQUksSUFBSSxHQUFHLElBQUk7Q0FDbkIsUUFBUSxJQUFJLEdBQUcsU0FBUyxDQUFDO0NBQ3pCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7Q0FDbEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztDQUVyQyxNQUFNLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRTtDQUM1QixRQUFRLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQy9FLE9BQU87Q0FFUCxNQUFNLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtDQUMzQixRQUFRLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzlFLE9BQU87Q0FFUCxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUN2QixLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUcsQ0FBQztDQUNKLENBQUM7Q0FFRCxvQkFBYyxHQUFHLGlCQUFpQjs7Q0NsQ2xDLElBQUksUUFBUSxHQUFHQSxhQUFzQyxDQUFDLE9BQU8sQ0FBQztDQUk5RCxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0NBRS9CLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNsRSxJQUFJMk0sZUFBYSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ25ELElBQUk3SixnQkFBYyxHQUFHLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFJbkZwQixRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsSUFBSSxDQUFDaUwsZUFBYSxJQUFJLENBQUM3SixnQkFBYyxFQUFFLEVBQUU7Q0FDaEcsRUFBRSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsYUFBYSxHQUF3QjtDQUNqRSxJQUFJLE9BQU8sYUFBYTtDQUV4QixRQUFRLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUM7Q0FDakQsUUFBUSxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDdkYsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NmRixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0NBRXpCLElBQUksV0FBVyxHQUFHN0QsYUFBYSxJQUFJLE1BQU0sQ0FBQztDQUMxQyxJQUFJME4sZUFBYSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUlyRGpMLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxJQUFJLENBQUNpTCxlQUFhLEVBQUUsRUFBRTtDQUMzRSxFQUFFLElBQUksRUFBRSxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQUU7Q0FDakMsSUFBSSxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsS0FBSyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQzdGLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDZkYsSUFBSSxJQUFJLEdBQUczTSxjQUF1QyxDQUFDLEdBQUcsQ0FBQztDQUl2RCxJQUFJNE0scUJBQW1CLEdBQUcsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FFOUQsSUFBSTlKLGdCQUFjLEdBQUcsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFLcERwQixRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUNrTCxxQkFBbUIsSUFBSSxDQUFDOUosZ0JBQWMsRUFBRSxFQUFFO0NBQ3JGLEVBQUUsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDLFVBQVUsR0FBa0I7Q0FDaEQsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNuRixHQUFHO0NBQ0gsQ0FBQyxDQUFDOztDQ2pCRixxQkFBYyxHQUFHLE9BQU8sV0FBVyxLQUFLLFdBQVcsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXOztDQ0t0RixXQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDakMsRUFBRSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDN0IsRUFBRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDaEMsRUFBRSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztDQUNuRSxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUM7O0NDVEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNyQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0NBQ25CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FDbkIsSUFBSStKLE9BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0NBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUVuQixJQUFJLElBQUksR0FBRyxVQUFVLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFO0NBQ3BELEVBQUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEMsRUFBRSxJQUFJLGNBQWMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUM7Q0FDdEQsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztDQUN4QixFQUFFLElBQUksRUFBRSxHQUFHLGNBQWMsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDakUsRUFBRSxJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNsRSxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUksUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Q0FDNUIsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRXZCLEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7Q0FFL0MsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztDQUNwQixHQUFHLE1BQU07Q0FDVCxJQUFJLFFBQVEsR0FBR0EsT0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztDQUN4QyxJQUFJLElBQUksTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDOUMsTUFBTSxRQUFRLEVBQUUsQ0FBQztDQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDYixLQUFLO0NBQ0wsSUFBSSxJQUFJLFFBQVEsR0FBRyxLQUFLLElBQUksQ0FBQyxFQUFFO0NBQy9CLE1BQU0sTUFBTSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDdkIsS0FBSyxNQUFNO0NBQ1gsTUFBTSxNQUFNLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0NBQ3ZDLEtBQUs7Q0FDTCxJQUFJLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDekIsTUFBTSxRQUFRLEVBQUUsQ0FBQztDQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDYixLQUFLO0NBQ0wsSUFBSSxJQUFJLFFBQVEsR0FBRyxLQUFLLElBQUksSUFBSSxFQUFFO0NBQ2xDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQztDQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7Q0FDdEIsS0FBSyxNQUFNLElBQUksUUFBUSxHQUFHLEtBQUssSUFBSSxDQUFDLEVBQUU7Q0FDdEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQzNELE1BQU0sUUFBUSxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUM7Q0FDbEMsS0FBSyxNQUFNO0NBQ1gsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDckUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0NBQ25CLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLGNBQWMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxHQUFHLEdBQUcsRUFBRSxRQUFRLElBQUksR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUN0RyxFQUFFLFFBQVEsR0FBRyxRQUFRLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQztDQUNuRCxFQUFFLGNBQWMsSUFBSSxjQUFjLENBQUM7Q0FDbkMsRUFBRSxPQUFPLGNBQWMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsUUFBUSxHQUFHLEdBQUcsRUFBRSxRQUFRLElBQUksR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNyRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7Q0FDaEMsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDLENBQUM7Q0FFRixJQUFJLE1BQU0sR0FBRyxVQUFVLE1BQU0sRUFBRSxjQUFjLEVBQUU7Q0FDL0MsRUFBRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0NBQzVCLEVBQUUsSUFBSSxjQUFjLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksY0FBYyxJQUFJLENBQUMsQ0FBQztDQUN2QyxFQUFFLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7Q0FDeEIsRUFBRSxJQUFJLEtBQUssR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztDQUN4QixFQUFFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQzdCLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztDQUM1QixFQUFFLElBQUksUUFBUSxDQUFDO0NBQ2YsRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDO0NBQ2IsRUFBRSxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNwRixFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQzFDLEVBQUUsUUFBUSxLQUFLLENBQUMsS0FBSyxDQUFDO0NBQ3RCLEVBQUUsS0FBSyxJQUFJLGNBQWMsQ0FBQztDQUMxQixFQUFFLE9BQU8sS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ3BGLEVBQUUsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFO0NBQ3RCLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDekIsR0FBRyxNQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtDQUNoQyxJQUFJLE9BQU8sUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0NBQ3hELEdBQUcsTUFBTTtDQUNULElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQ2pELElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUM7Q0FDaEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQztDQUMxRSxDQUFDLENBQUM7Q0FFRixXQUFjLEdBQUc7Q0FDakIsRUFBRSxJQUFJLEVBQUUsSUFBSTtDQUNaLEVBQUUsTUFBTSxFQUFFLE1BQU07Q0FDaEIsQ0FBQzs7Q0NoRkQsYUFBYyxHQUFHLFNBQVMsSUFBSSxDQUFDLEtBQUssR0FBbUM7Q0FDdkUsRUFBRSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDekIsRUFBRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2xDLEVBQUUsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUN6QyxFQUFFLElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdEYsRUFBRSxJQUFJLEdBQUcsR0FBRyxlQUFlLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDM0QsRUFBRSxJQUFJLE1BQU0sR0FBRyxHQUFHLEtBQUssU0FBUyxHQUFHLE1BQU0sR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3pFLEVBQUUsT0FBTyxNQUFNLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUM1QyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ1gsQ0FBQzs7Q0NGRCxJQUFJLG1CQUFtQixHQUFHN00seUJBQXFELENBQUMsQ0FBQyxDQUFDO0NBQ2xGLElBQUljLGdCQUFjLEdBQUcyQyxvQkFBOEMsQ0FBQyxDQUFDLENBQUM7Q0FLdEUsSUFBSWYsa0JBQWdCLEdBQUc1QyxhQUFtQixDQUFDLEdBQUcsQ0FBQztDQUMvQyxJQUFJMkMsa0JBQWdCLEdBQUczQyxhQUFtQixDQUFDLEdBQUcsQ0FBQztDQUMvQyxJQUFJLFlBQVksR0FBRyxhQUFhLENBQUM7Q0FDakMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQzNCLElBQUlvQixXQUFTLEdBQUcsV0FBVyxDQUFDO0NBQzVCLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQztDQUNsQyxJQUFJLFdBQVcsR0FBRyxhQUFhLENBQUM7Q0FDaEMsSUFBSSxpQkFBaUIsR0FBR25DLFFBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztDQUM3QyxJQUFJLFlBQVksR0FBRyxpQkFBaUIsQ0FBQztDQUNyQyxJQUFJLFNBQVMsR0FBR0EsUUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ2xDLElBQUksa0JBQWtCLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQ21DLFdBQVMsQ0FBQyxDQUFDO0NBQzNELElBQUlhLGlCQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztDQUN2QyxJQUFJK0ssWUFBVSxHQUFHL04sUUFBTSxDQUFDLFVBQVUsQ0FBQztDQUVuQyxJQUFJLFdBQVcsR0FBR2dPLE9BQU8sQ0FBQyxJQUFJLENBQUM7Q0FDL0IsSUFBSSxhQUFhLEdBQUdBLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FFbkMsSUFBSSxRQUFRLEdBQUcsVUFBVSxNQUFNLEVBQUU7Q0FDakMsRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQ3pCLENBQUMsQ0FBQztDQUVGLElBQUksU0FBUyxHQUFHLFVBQVUsTUFBTSxFQUFFO0NBQ2xDLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsTUFBTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUM3QyxDQUFDLENBQUM7Q0FFRixJQUFJLFNBQVMsR0FBRyxVQUFVLE1BQU0sRUFBRTtDQUNsQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLE1BQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLE1BQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDdkYsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsVUFBVSxNQUFNLEVBQUU7Q0FDcEMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN4RSxDQUFDLENBQUM7Q0FFRixJQUFJLFdBQVcsR0FBRyxVQUFVLE1BQU0sRUFBRTtDQUNwQyxFQUFFLE9BQU8sV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDcEMsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsVUFBVSxNQUFNLEVBQUU7Q0FDcEMsRUFBRSxPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3BDLENBQUMsQ0FBQztDQUVGLElBQUksU0FBUyxHQUFHLFVBQVUsV0FBVyxFQUFFLEdBQUcsRUFBRTtDQUM1QyxFQUFFak0sZ0JBQWMsQ0FBQyxXQUFXLENBQUNJLFdBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBT3dCLGtCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDNUcsQ0FBQyxDQUFDO0NBRUYsSUFBSXNLLEtBQUcsR0FBRyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtDQUN4RCxFQUFFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoQyxFQUFFLElBQUksS0FBSyxHQUFHdEssa0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDckMsRUFBRSxJQUFJLFFBQVEsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNb0ssWUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ3pFLEVBQUUsSUFBSSxLQUFLLEdBQUdwSyxrQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO0NBQ25ELEVBQUUsSUFBSSxLQUFLLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7Q0FDMUMsRUFBRSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7Q0FDL0MsRUFBRSxPQUFPLGNBQWMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0NBQ2hELENBQUMsQ0FBQztDQUVGLElBQUlXLEtBQUcsR0FBRyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO0NBQzNFLEVBQUUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLEVBQUUsSUFBSSxLQUFLLEdBQUdYLGtCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsTUFBTW9LLFlBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN6RSxFQUFFLElBQUksS0FBSyxHQUFHcEssa0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztDQUNuRCxFQUFFLElBQUksS0FBSyxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0NBQzFDLEVBQUUsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEMsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM5RixDQUFDLENBQUM7Q0FFRixJQUFJLENBQUN1SyxpQkFBbUIsRUFBRTtDQUMxQixFQUFFLFlBQVksR0FBRyxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Q0FDOUMsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNqRCxJQUFJLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNyQyxJQUFJeEssa0JBQWdCLENBQUMsSUFBSSxFQUFFO0NBQzNCLE1BQU0sS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3JELE1BQU0sVUFBVSxFQUFFLFVBQVU7Q0FDNUIsS0FBSyxDQUFDLENBQUM7Q0FDUCxJQUFJLElBQUksQ0FBQ3RELFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztDQUNuRCxHQUFHLENBQUM7Q0FFSixFQUFFLFNBQVMsR0FBRyxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtDQUNoRSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQzNDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDaEQsSUFBSSxJQUFJLFlBQVksR0FBR3VELGtCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQztDQUMzRCxJQUFJLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUN2QyxJQUFJLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsWUFBWSxFQUFFLE1BQU1vSyxZQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7Q0FDOUUsSUFBSSxVQUFVLEdBQUcsVUFBVSxLQUFLLFNBQVMsR0FBRyxZQUFZLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUN6RixJQUFJLElBQUksTUFBTSxHQUFHLFVBQVUsR0FBRyxZQUFZLEVBQUUsTUFBTUEsWUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQzNFLElBQUlySyxrQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7Q0FDM0IsTUFBTSxNQUFNLEVBQUUsTUFBTTtDQUNwQixNQUFNLFVBQVUsRUFBRSxVQUFVO0NBQzVCLE1BQU0sVUFBVSxFQUFFLE1BQU07Q0FDeEIsS0FBSyxDQUFDLENBQUM7Q0FDUCxJQUFJLElBQUksQ0FBQ3RELFdBQVcsRUFBRTtDQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQzNCLE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Q0FDbkMsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztDQUMvQixLQUFLO0NBQ0wsR0FBRyxDQUFDO0NBRUosRUFBRSxJQUFJQSxXQUFXLEVBQUU7Q0FDbkIsSUFBSSxTQUFTLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQzFDLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNuQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDdkMsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQ3ZDLEdBQUc7Q0FFSCxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMrQixXQUFTLENBQUMsRUFBRTtDQUNwQyxJQUFJLE9BQU8sRUFBRSxTQUFTLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Q0FDMUMsTUFBTSxPQUFPOEwsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUNyRCxLQUFLO0NBQ0wsSUFBSSxRQUFRLEVBQUUsU0FBUyxRQUFRLENBQUMsVUFBVSxFQUFFO0NBQzVDLE1BQU0sT0FBT0EsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekMsS0FBSztDQUNMLElBQUksUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLFVBQVUsR0FBdUI7Q0FDakUsTUFBTSxJQUFJLEtBQUssR0FBR0EsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUM1RixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0NBQ3BELEtBQUs7Q0FDTCxJQUFJLFNBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxVQUFVLEdBQXVCO0NBQ25FLE1BQU0sSUFBSSxLQUFLLEdBQUdBLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDNUYsTUFBTSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RDLEtBQUs7Q0FDTCxJQUFJLFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLEdBQXVCO0NBQ2pFLE1BQU0sT0FBTyxXQUFXLENBQUNBLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztDQUNwRyxLQUFLO0NBQ0wsSUFBSSxTQUFTLEVBQUUsU0FBUyxTQUFTLENBQUMsVUFBVSxHQUF1QjtDQUNuRSxNQUFNLE9BQU8sV0FBVyxDQUFDQSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFHLEtBQUs7Q0FDTCxJQUFJLFVBQVUsRUFBRSxTQUFTLFVBQVUsQ0FBQyxVQUFVLEdBQXVCO0NBQ3JFLE1BQU0sT0FBTyxhQUFhLENBQUNBLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDMUcsS0FBSztDQUNMLElBQUksVUFBVSxFQUFFLFNBQVMsVUFBVSxDQUFDLFVBQVUsR0FBdUI7Q0FDckUsTUFBTSxPQUFPLGFBQWEsQ0FBQ0EsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUMxRyxLQUFLO0NBQ0wsSUFBSSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRTtDQUNqRCxNQUFNM0osS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNoRCxLQUFLO0NBQ0wsSUFBSSxRQUFRLEVBQUUsU0FBUyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRTtDQUNuRCxNQUFNQSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hELEtBQUs7Q0FDTCxJQUFJLFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxHQUF1QjtDQUN4RSxNQUFNQSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDbEcsS0FBSztDQUNMLElBQUksU0FBUyxFQUFFLFNBQVMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLEdBQXVCO0NBQzFFLE1BQU1BLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNsRyxLQUFLO0NBQ0wsSUFBSSxRQUFRLEVBQUUsU0FBUyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssR0FBdUI7Q0FDeEUsTUFBTUEsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ2xHLEtBQUs7Q0FDTCxJQUFJLFNBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxHQUF1QjtDQUMxRSxNQUFNQSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDbEcsS0FBSztDQUNMLElBQUksVUFBVSxFQUFFLFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLEdBQXVCO0NBQzVFLE1BQU1BLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNwRyxLQUFLO0NBQ0wsSUFBSSxVQUFVLEVBQUUsU0FBUyxVQUFVLENBQUMsVUFBVSxFQUFFLEtBQUssR0FBdUI7Q0FDNUUsTUFBTUEsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3BHLEtBQUs7Q0FDTCxHQUFHLENBQUMsQ0FBQztDQUNMLENBQUMsTUFBTTtDQUNQLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBQ3pCLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUMzQixJQUFJLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QixHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWTtDQUMxQixJQUFJLElBQUksaUJBQWlCLEVBQUUsQ0FBQztDQUM1QixJQUFJLElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDL0IsSUFBSSxJQUFJLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQy9CLElBQUksT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDO0NBQ2xELEdBQUcsQ0FBQyxFQUFFO0NBQ04sSUFBSSxZQUFZLEdBQUcsU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0NBQ2hELE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNyQyxNQUFNLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUNwRCxLQUFLLENBQUM7Q0FDTixJQUFJLElBQUksb0JBQW9CLEdBQUcsWUFBWSxDQUFDbkMsV0FBUyxDQUFDLEdBQUcsaUJBQWlCLENBQUNBLFdBQVMsQ0FBQyxDQUFDO0NBQ3RGLElBQUksS0FBSyxJQUFJOEosTUFBSSxHQUFHLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUVBLE1BQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHO0NBQzFGLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHQSxNQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLENBQUMsRUFBRTtDQUNoRCxRQUFRLDJCQUEyQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUMvRSxPQUFPO0NBQ1AsS0FBSztDQUNMLElBQUksb0JBQW9CLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQztDQUNwRCxHQUFHO0NBR0gsRUFBRSxJQUFJeEksb0JBQWMsSUFBSVAsb0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLRixpQkFBZSxFQUFFO0NBQ2hGLElBQUlTLG9CQUFjLENBQUMsa0JBQWtCLEVBQUVULGlCQUFlLENBQUMsQ0FBQztDQUN4RCxHQUFHO0NBR0gsRUFBRSxJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BELEVBQUUsSUFBSSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDO0NBQ2pELEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDbEMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNsQyxFQUFFLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixFQUFFO0NBQ25GLElBQUksT0FBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUU7Q0FDakQsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUM5RCxLQUFLO0NBQ0wsSUFBSSxRQUFRLEVBQUUsU0FBUyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRTtDQUNuRCxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQzlELEtBQUs7Q0FDTCxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUN2QixDQUFDO0NBRUQsY0FBYyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztDQUMzQyxjQUFjLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBRXJDLGVBQWMsR0FBRztDQUNqQixFQUFFLFdBQVcsRUFBRSxZQUFZO0NBQzNCLEVBQUUsUUFBUSxFQUFFLFNBQVM7Q0FDckIsQ0FBQzs7Q0MzTkQsSUFBSW1MLGNBQVksR0FBRyxhQUFhLENBQUM7Q0FDakMsSUFBSUMsYUFBVyxHQUFHQyxXQUFpQixDQUFDRixjQUFZLENBQUMsQ0FBQztDQUNsRCxJQUFJRyxtQkFBaUIsR0FBR3RPLFFBQU0sQ0FBQ21PLGNBQVksQ0FBQyxDQUFDO0FBSTdDeEwsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUyTCxtQkFBaUIsS0FBS0YsYUFBVyxFQUFFLEVBQUU7Q0FDL0QsRUFBRSxXQUFXLEVBQUVBLGFBQVc7Q0FDMUIsQ0FBQyxDQUFDLENBQUM7Q0FFSCxVQUFVLENBQUNELGNBQVksQ0FBQzs7Q0NQeEIsSUFBSUMsYUFBVyxHQUFHRyxXQUFpQixDQUFDLFdBQVcsQ0FBQztDQUNoRCxJQUFJQyxVQUFRLEdBQUdELFdBQWlCLENBQUMsUUFBUSxDQUFDO0NBQzFDLElBQUksc0JBQXNCLEdBQUdILGFBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0NBRXpELElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxZQUFZO0NBQ3hDLEVBQUUsT0FBTyxDQUFDLElBQUlBLGFBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztDQUM1RCxDQUFDLENBQUMsQ0FBQztBQUlIekwsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFO0NBQ2pGLEVBQUUsS0FBSyxFQUFFLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7Q0FDcEMsSUFBSSxJQUFJLHNCQUFzQixLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0NBQ25FLE1BQU0sT0FBTyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hFLEtBQUs7Q0FDTCxJQUFJLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7Q0FDM0MsSUFBSSxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQy9DLElBQUksSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLEdBQUcsS0FBSyxTQUFTLEdBQUcsTUFBTSxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN4RSxJQUFJLElBQUksTUFBTSxHQUFHLEtBQUssa0JBQWtCLENBQUMsSUFBSSxFQUFFeUwsYUFBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ3BGLElBQUksSUFBSSxVQUFVLEdBQUcsSUFBSUksVUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hDLElBQUksSUFBSSxVQUFVLEdBQUcsSUFBSUEsVUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzFDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLElBQUksT0FBTyxLQUFLLEdBQUcsR0FBRyxFQUFFO0NBQ3hCLE1BQU0sVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqRSxLQUFLLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDcEIsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NqQ0YsSUFBSWxNLDJCQUF5QixHQUFHckIsaUNBQThELENBQUMsQ0FBQyxDQUFDO0NBRWpHLElBQUl3TixxQkFBbUIsR0FBRyxLQUFLLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFJeEY5TCxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFOEwscUJBQW1CLEVBQUUsRUFBRTtDQUNqRSxFQUFFLG1CQUFtQixFQUFFbk0sMkJBQXlCO0NBQ2hELENBQUMsQ0FBQzs7Q0NKRixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQ2xCLEVBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3RCLENBQUM7Q0FFRCxpQkFBcUIsR0FBRyxLQUFLLENBQUMsWUFBWTtDQUUxQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDeEIsRUFBRSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUNuQixFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7Q0FDakMsQ0FBQyxDQUFDLENBQUM7Q0FFSCxnQkFBb0IsR0FBRyxLQUFLLENBQUMsWUFBWTtDQUV6QyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDMUIsRUFBRSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUNuQixFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7Q0FDaEMsQ0FBQyxDQUFDOzs7Ozs7Q0NsQkYsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Q0FJdkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Q0FFN0MsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDO0NBRTdCLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxZQUFZO0NBQzVDLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO0NBQ2xCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDNUIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUM1QixFQUFFLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUM7Q0FDcEQsQ0FBQyxHQUFHLENBQUM7Q0FFTCxJQUFJb00sZUFBYSxHQUFHQyxtQkFBYSxDQUFDLGFBQWEsSUFBSUEsbUJBQWEsQ0FBQyxZQUFZLENBQUM7Q0FHOUUsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7Q0FFckQsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLElBQUksYUFBYSxJQUFJRCxlQUFhLENBQUM7Q0FFdkUsSUFBSSxLQUFLLEVBQUU7Q0FDWCxFQUFFLFdBQVcsR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUU7Q0FDbkMsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7Q0FDbEIsSUFBSSxJQUFJLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztDQUNwQyxJQUFJLElBQUksTUFBTSxHQUFHQSxlQUFhLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztDQUM1QyxJQUFJLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDckMsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0NBQzNCLElBQUksSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZCLElBQUksSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0NBRXRCLElBQUksSUFBSSxNQUFNLEVBQUU7Q0FDaEIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Q0FDckMsUUFBUSxLQUFLLElBQUksR0FBRyxDQUFDO0NBQ3JCLE9BQU87Q0FFUCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUVoRCxNQUFNLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7Q0FDakcsUUFBUSxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7Q0FDdkMsUUFBUSxPQUFPLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztDQUNoQyxRQUFRLFVBQVUsRUFBRSxDQUFDO0NBQ3JCLE9BQU87Q0FHUCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN4RCxLQUFLO0NBRUwsSUFBSSxJQUFJLGFBQWEsRUFBRTtDQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM1RCxLQUFLO0NBQ0wsSUFBSSxJQUFJLHdCQUF3QixFQUFFLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0NBRTNELElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FFM0QsSUFBSSxJQUFJLE1BQU0sRUFBRTtDQUNoQixNQUFNLElBQUksS0FBSyxFQUFFO0NBQ2pCLFFBQVEsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNwRCxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzlDLFFBQVEsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0NBQ25DLFFBQVEsRUFBRSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQ3hDLE9BQU8sTUFBTSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUM5QixLQUFLLE1BQU0sSUFBSSx3QkFBd0IsSUFBSSxLQUFLLEVBQUU7Q0FDbEQsTUFBTSxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztDQUMzRSxLQUFLO0NBQ0wsSUFBSSxJQUFJLGFBQWEsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Q0FHcEQsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWTtDQUN2RCxRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDbkQsVUFBVSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUMvRCxTQUFTO0NBQ1QsT0FBTyxDQUFDLENBQUM7Q0FDVCxLQUFLO0NBRUwsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHLENBQUM7Q0FDSixDQUFDO0NBRUQsY0FBYyxHQUFHLFdBQVc7O0FDbEY1Qi9MLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBS2lNLFVBQUksRUFBRSxFQUFFO0NBQ2hFLEVBQUUsSUFBSSxFQUFFQSxVQUFJO0NBQ1osQ0FBQyxDQUFDOztDQ0dGLElBQUkvSyxTQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBRXpDLElBQUksNkJBQTZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUl2RCxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztDQUNmLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxZQUFZO0NBQ3hCLElBQUksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3BCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUMvQixJQUFJLE9BQU8sTUFBTSxDQUFDO0NBQ2xCLEdBQUcsQ0FBQztDQUNKLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUM7Q0FDeEMsQ0FBQyxDQUFDLENBQUM7Q0FJSCxJQUFJLGdCQUFnQixHQUFHLENBQUMsWUFBWTtDQUNwQyxFQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO0NBQ3pDLENBQUMsR0FBRyxDQUFDO0NBRUwsSUFBSSxPQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBRXpDLElBQUksNENBQTRDLEdBQUcsQ0FBQyxZQUFZO0NBQ2hFLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7Q0FDcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQzFDLEdBQUc7Q0FDSCxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ2YsQ0FBQyxHQUFHLENBQUM7Q0FJTCxJQUFJLGlDQUFpQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDM0QsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7Q0FDbEIsRUFBRSxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0NBQzdCLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxZQUFZLEVBQUUsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDeEUsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzlCLEVBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7Q0FDdkUsQ0FBQyxDQUFDLENBQUM7Q0FFSCxpQ0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0NBQ3BELEVBQUUsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBRXBDLEVBQUUsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBRS9DLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ2YsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUMxQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzQixHQUFHLENBQUMsQ0FBQztDQUVMLEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBRXBFLElBQUksSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0NBQzNCLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0NBRWpCLElBQUksSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFO0NBSXpCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUdkLE1BQU0sRUFBRSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7Q0FDMUIsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDQSxTQUFPLENBQUMsR0FBRyxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0NBQzNELE1BQU0sRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Q0FDcEIsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQy9CLEtBQUs7Q0FFTCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FFOUQsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDbkIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDO0NBQ3ZCLEdBQUcsQ0FBQyxDQUFDO0NBRUwsRUFBRTtDQUNGLElBQUksQ0FBQyxtQkFBbUI7Q0FDeEIsSUFBSSxDQUFDLGlCQUFpQjtDQUN0QixLQUFLLEdBQUcsS0FBSyxTQUFTLElBQUk7Q0FDMUIsTUFBTSw2QkFBNkI7Q0FDbkMsTUFBTSxnQkFBZ0I7Q0FDdEIsTUFBTSxDQUFDLDRDQUE0QztDQUNuRCxLQUFLLENBQUM7Q0FDTixLQUFLLEdBQUcsS0FBSyxPQUFPLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQztDQUMzRCxJQUFJO0NBQ0osSUFBSSxJQUFJLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN6QyxJQUFJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFO0NBQ3RHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtDQUN0QyxRQUFRLElBQUksbUJBQW1CLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtDQUl2RCxVQUFVLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0NBQ25GLFNBQVM7Q0FDVCxRQUFRLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUMzRSxPQUFPO0NBQ1AsTUFBTSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQzdCLEtBQUssRUFBRTtDQUNQLE1BQU0sZ0JBQWdCLEVBQUUsZ0JBQWdCO0NBQ3hDLE1BQU0sNENBQTRDLEVBQUUsNENBQTRDO0NBQ2hHLEtBQUssQ0FBQyxDQUFDO0NBQ1AsSUFBSSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsSUFBSSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FFakMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDbEQsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7Q0FHbEQsUUFBUSxVQUFVLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0NBRzlFLFFBQVEsVUFBVSxNQUFNLEVBQUUsRUFBRSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7Q0FDcEUsS0FBSyxDQUFDO0NBQ04sR0FBRztDQUVILEVBQUUsSUFBSSxJQUFJLEVBQUUsMkJBQTJCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDaEYsQ0FBQzs7Q0MzSEQsSUFBSTBJLFFBQU0sR0FBR3RMLGVBQXdDLENBQUMsTUFBTSxDQUFDO0NBSTdELHNCQUFjLEdBQUcsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtDQUM5QyxFQUFFLE9BQU8sS0FBSyxJQUFJLE9BQU8sR0FBR3NMLFFBQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ3pELENBQUM7O0NDRkQsc0JBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDakMsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0NBQ3BCLEVBQUUsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLEVBQUU7Q0FDbEMsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqQyxJQUFJLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO0NBQ3BDLE1BQU0sTUFBTSxTQUFTLENBQUMsb0VBQW9FLENBQUMsQ0FBQztDQUM1RixLQUFLO0NBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0NBRUgsRUFBRSxJQUFJdE0sVUFBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtDQUMvQixJQUFJLE1BQU0sU0FBUyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Q0FDbkUsR0FBRztDQUVILEVBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMvQixDQUFDOztDQ1ZELElBQUkrRCxLQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUNuQixJQUFJaEQsS0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FDbkIsSUFBSThNLE9BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0NBQ3ZCLElBQUksb0JBQW9CLEdBQUcsMkJBQTJCLENBQUM7Q0FDdkQsSUFBSSw2QkFBNkIsR0FBRyxtQkFBbUIsQ0FBQztDQUV4RCxJQUFJLGFBQWEsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNsQyxFQUFFLE9BQU8sRUFBRSxLQUFLLFNBQVMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzVDLENBQUMsQ0FBQztBQUdGZSw4QkFBNkIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFO0NBQ3ZHLEVBQUUsSUFBSSw0Q0FBNEMsR0FBRyxNQUFNLENBQUMsNENBQTRDLENBQUM7Q0FDekcsRUFBRSxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztDQUNqRCxFQUFFLElBQUksaUJBQWlCLEdBQUcsNENBQTRDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztDQUVwRixFQUFFLE9BQU87Q0FHVCxJQUFJLFNBQVMsT0FBTyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUU7Q0FDaEQsTUFBTSxJQUFJLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzQyxNQUFNLElBQUksUUFBUSxHQUFHLFdBQVcsSUFBSSxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNqRixNQUFNLE9BQU8sUUFBUSxLQUFLLFNBQVM7Q0FDbkMsVUFBVSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0NBQ3JELFVBQVUsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQ25FLEtBQUs7Q0FHTCxJQUFJLFVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRTtDQUNwQyxNQUFNO0NBQ04sUUFBUSxDQUFDLENBQUMsNENBQTRDLElBQUksZ0JBQWdCO0NBQzFFLFNBQVMsT0FBTyxZQUFZLEtBQUssUUFBUSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUM1RixRQUFRO0NBQ1IsUUFBUSxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDN0UsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0NBQ3ZDLE9BQU87Q0FFUCxNQUFNLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNoQyxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUUzQixNQUFNLElBQUksaUJBQWlCLEdBQUcsT0FBTyxZQUFZLEtBQUssVUFBVSxDQUFDO0NBQ2pFLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Q0FFbEUsTUFBTSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0NBQzdCLE1BQU0sSUFBSSxNQUFNLEVBQUU7Q0FDbEIsUUFBUSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0NBQ3JDLFFBQVEsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDekIsT0FBTztDQUNQLE1BQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0NBQ3ZCLE1BQU0sT0FBTyxJQUFJLEVBQUU7Q0FDbkIsUUFBUSxJQUFJLE1BQU0sR0FBR0Msa0JBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDdkMsUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTTtDQUVuQyxRQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDN0IsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU07Q0FFM0IsUUFBUSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekMsUUFBUSxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztDQUN2RyxPQUFPO0NBRVAsTUFBTSxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztDQUNqQyxNQUFNLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0NBQ2pDLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDL0MsUUFBUSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBRTVCLFFBQVEsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hDLFFBQVEsSUFBSSxRQUFRLEdBQUc5SyxLQUFHLENBQUNoRCxLQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDdEUsUUFBUSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FNMUIsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hGLFFBQVEsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUMxQyxRQUFRLElBQUksaUJBQWlCLEVBQUU7Q0FDL0IsVUFBVSxJQUFJLFlBQVksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3JFLFVBQVUsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FDNUUsVUFBVSxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztDQUNoRixTQUFTLE1BQU07Q0FDZixVQUFVLFdBQVcsR0FBRyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNyRyxTQUFTO0NBQ1QsUUFBUSxJQUFJLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtDQUM1QyxVQUFVLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLEdBQUcsV0FBVyxDQUFDO0NBQ25GLFVBQVUsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDekQsU0FBUztDQUNULE9BQU87Q0FDUCxNQUFNLE9BQU8saUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0NBQzdELEtBQUs7Q0FDTCxHQUFHLENBQUM7Q0FHSixFQUFFLFNBQVMsZUFBZSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFO0NBQ3pGLElBQUksSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDNUMsSUFBSSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0NBQzVCLElBQUksSUFBSSxPQUFPLEdBQUcsNkJBQTZCLENBQUM7Q0FDaEQsSUFBSSxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7Q0FDckMsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQzlDLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDO0NBQ3JDLEtBQUs7Q0FDTCxJQUFJLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUFFLEVBQUUsRUFBRTtDQUN6RSxNQUFNLElBQUksT0FBTyxDQUFDO0NBQ2xCLE1BQU0sUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUMxQixRQUFRLEtBQUssR0FBRyxFQUFFLE9BQU8sR0FBRyxDQUFDO0NBQzdCLFFBQVEsS0FBSyxHQUFHLEVBQUUsT0FBTyxPQUFPLENBQUM7Q0FDakMsUUFBUSxLQUFLLEdBQUcsRUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ2hELFFBQVEsS0FBSyxHQUFHLEVBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQzVDLFFBQVEsS0FBSyxHQUFHO0NBQ2hCLFVBQVUsT0FBTyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbkQsVUFBVSxNQUFNO0NBQ2hCLFFBQVE7Q0FDUixVQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0NBQ3RCLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ3BDLFVBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQ3JCLFlBQVksSUFBSSxDQUFDLEdBQUc4TSxPQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ2xDLFlBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ3RDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDN0csWUFBWSxPQUFPLEtBQUssQ0FBQztDQUN6QixXQUFXO0NBQ1gsVUFBVSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUNwQyxPQUFPO0NBQ1AsTUFBTSxPQUFPLE9BQU8sS0FBSyxTQUFTLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztDQUNsRCxLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDbElGLElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUlyQyxZQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLFFBQVEsQ0FBQztDQUNmLEVBQUUsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHN04sVUFBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0NBQ3ZHLENBQUM7O0NDQ0QsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztDQUN4QixJQUFJZSxLQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUNuQixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7Q0FHNUIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRzFFNk4sOEJBQTZCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO0NBQ3pGLEVBQUUsSUFBSSxhQUFhLENBQUM7Q0FDcEIsRUFBRTtDQUNGLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHO0NBQ2xDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztDQUN4QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUM7Q0FDckMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDO0NBQ3JDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztDQUNoQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtDQUN6QixJQUFJO0NBRUosSUFBSSxhQUFhLEdBQUcsVUFBVSxTQUFTLEVBQUUsS0FBSyxFQUFFO0NBQ2hELE1BQU0sSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDeEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxLQUFLLEtBQUssU0FBUyxHQUFHLFVBQVUsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO0NBQy9ELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDO0NBQy9CLE1BQU0sSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUVuRCxNQUFNLElBQUksQ0FBQ0UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO0NBQ2hDLFFBQVEsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDeEQsT0FBTztDQUNQLE1BQU0sSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLE1BQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFO0NBQ2xELG1CQUFtQixTQUFTLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7Q0FDbEQsbUJBQW1CLFNBQVMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztDQUNoRCxtQkFBbUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDaEQsTUFBTSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7Q0FFNUIsTUFBTSxJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztDQUNwRSxNQUFNLElBQUksS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7Q0FDdkMsTUFBTSxPQUFPLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRTtDQUM3RCxRQUFRLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO0NBQzVDLFFBQVEsSUFBSSxTQUFTLEdBQUcsYUFBYSxFQUFFO0NBQ3ZDLFVBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNoRSxVQUFVLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2RyxVQUFVLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQ3ZDLFVBQVUsYUFBYSxHQUFHLFNBQVMsQ0FBQztDQUNwQyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsTUFBTTtDQUMxQyxTQUFTO0NBQ1QsUUFBUSxJQUFJLGFBQWEsQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDL0UsT0FBTztDQUNQLE1BQU0sSUFBSSxhQUFhLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtDQUMzQyxRQUFRLElBQUksVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ25FLE9BQU8sTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztDQUN0RCxNQUFNLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO0NBQ2pFLEtBQUssQ0FBQztDQUVOLEdBQUcsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtDQUM3QyxJQUFJLGFBQWEsR0FBRyxVQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUU7Q0FDaEQsTUFBTSxPQUFPLFNBQVMsS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3BHLEtBQUssQ0FBQztDQUNOLEdBQUcsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0NBRXJDLEVBQUUsT0FBTztDQUdULElBQUksU0FBUyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRTtDQUNyQyxNQUFNLElBQUksQ0FBQyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLE1BQU0sSUFBSSxRQUFRLEdBQUcsU0FBUyxJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzNFLE1BQU0sT0FBTyxRQUFRLEtBQUssU0FBUztDQUNuQyxVQUFVLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7Q0FDNUMsVUFBVSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDMUQsS0FBSztDQU1MLElBQUksVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFO0NBQzdCLE1BQU0sSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEtBQUssV0FBVyxDQUFDLENBQUM7Q0FDbkcsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0NBRXJDLE1BQU0sSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2hDLE1BQU0sSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNCLE1BQU0sSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBRTdDLE1BQU0sSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztDQUN2QyxNQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRTtDQUMzQyxtQkFBbUIsRUFBRSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0NBQzNDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7Q0FDekMsbUJBQW1CLFVBQVUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7Q0FJM0MsTUFBTSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM5RSxNQUFNLElBQUksR0FBRyxHQUFHLEtBQUssS0FBSyxTQUFTLEdBQUcsVUFBVSxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7Q0FDL0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUM7Q0FDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLE9BQU9DLGtCQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNqRixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNqQixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7Q0FDM0IsUUFBUSxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2hELFFBQVEsSUFBSSxDQUFDLEdBQUdBLGtCQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RFLFFBQVEsSUFBSSxDQUFDLENBQUM7Q0FDZCxRQUFRO0NBQ1IsVUFBVSxDQUFDLEtBQUssSUFBSTtDQUNwQixVQUFVLENBQUMsQ0FBQyxHQUFHaE8sS0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUN4RixVQUFVO0NBQ1YsVUFBVSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztDQUN4RCxTQUFTLE1BQU07Q0FDZixVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNoQyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDekMsVUFBVSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDbEQsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pCLFlBQVksSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUMzQyxXQUFXO0NBQ1gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQixTQUFTO0NBQ1QsT0FBTztDQUNQLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekIsTUFBTSxPQUFPLENBQUMsQ0FBQztDQUNmLEtBQUs7Q0FDTCxHQUFHLENBQUM7Q0FDSixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7O0NDbklmLGVBQWMsR0FBRyx3SkFBd0o7O0NDQ3pLLElBQUksVUFBVSxHQUFHLEdBQUcsR0FBRyxXQUFXLEdBQUcsR0FBRyxDQUFDO0NBQ3pDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztDQUN4RCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUduRCxJQUFJaUIsY0FBWSxHQUFHLFVBQVUsSUFBSSxFQUFFO0NBQ25DLEVBQUUsT0FBTyxVQUFVLEtBQUssRUFBRTtDQUMxQixJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ3ZELElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNyRCxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDckQsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7Q0FFRixjQUFjLEdBQUc7Q0FHakIsRUFBRSxLQUFLLEVBQUVBLGNBQVksQ0FBQyxDQUFDLENBQUM7Q0FHeEIsRUFBRSxHQUFHLEVBQUVBLGNBQVksQ0FBQyxDQUFDLENBQUM7Q0FHdEIsRUFBRSxJQUFJLEVBQUVBLGNBQVksQ0FBQyxDQUFDLENBQUM7Q0FDdkIsQ0FBQzs7Q0N4QkQsSUFBSSxHQUFHLEdBQUcsb0JBQW9CLENBQUM7Q0FJL0Isb0JBQWMsR0FBRyxVQUFVLFdBQVcsRUFBRTtDQUN4QyxFQUFFLE9BQU8sS0FBSyxDQUFDLFlBQVk7Q0FDM0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7Q0FDdEgsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDOztDQ1RELElBQUksS0FBSyxHQUFHaEIsVUFBbUMsQ0FBQyxJQUFJLENBQUM7QUFLckQwQixRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFc00sZ0JBQXNCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtDQUM3RSxFQUFFLElBQUksRUFBRSxTQUFTLElBQUksR0FBRztDQUN4QixJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZCLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDRkYsSUFBSWxOLGdCQUFjLEdBQUdkLG9CQUE4QyxDQUFDLENBQUMsQ0FBQztDQU10RSxJQUFJaU8sV0FBUyxHQUFHbFAsUUFBTSxDQUFDLFNBQVMsQ0FBQztDQUNqQyxJQUFJLGtCQUFrQixHQUFHa1AsV0FBUyxJQUFJQSxXQUFTLENBQUMsU0FBUyxDQUFDO0NBQzFELElBQUksaUJBQWlCLEdBQUdsUCxRQUFNLENBQUMsaUJBQWlCLENBQUM7Q0FDakQsSUFBSSwwQkFBMEIsR0FBRyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7Q0FDbEYsSUFBSSxVQUFVLEdBQUdrUCxXQUFTLElBQUloTSxvQkFBYyxDQUFDZ00sV0FBUyxDQUFDLENBQUM7Q0FDeEQsSUFBSSxtQkFBbUIsR0FBRyxrQkFBa0IsSUFBSWhNLG9CQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztDQUNuRixJQUFJRixpQkFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Q0FDdkMsSUFBSSxhQUFhLEdBQUdBLGlCQUFlLENBQUMsYUFBYSxDQUFDO0NBRWxELElBQUlrQixlQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ25ELElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0NBRTdDLElBQUkseUJBQXlCLEdBQUdnSyxpQkFBbUIsSUFBSSxDQUFDLENBQUN6SyxvQkFBYyxJQUFJLE9BQU8sQ0FBQ3pELFFBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxPQUFPLENBQUM7Q0FDN0csSUFBSSx1QkFBdUIsR0FBRyxLQUFLLENBQUM7Q0FDcEMsSUFBSW1QLE1BQUksQ0FBQztDQUVULElBQUksMEJBQTBCLEdBQUc7Q0FDakMsRUFBRSxTQUFTLEVBQUUsQ0FBQztDQUNkLEVBQUUsVUFBVSxFQUFFLENBQUM7Q0FDZixFQUFFLGlCQUFpQixFQUFFLENBQUM7Q0FDdEIsRUFBRSxVQUFVLEVBQUUsQ0FBQztDQUNmLEVBQUUsV0FBVyxFQUFFLENBQUM7Q0FDaEIsRUFBRSxVQUFVLEVBQUUsQ0FBQztDQUNmLEVBQUUsV0FBVyxFQUFFLENBQUM7Q0FDaEIsRUFBRSxZQUFZLEVBQUUsQ0FBQztDQUNqQixFQUFFLFlBQVksRUFBRSxDQUFDO0NBQ2pCLENBQUMsQ0FBQztDQUVGLElBQUksTUFBTSxHQUFHLFNBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRTtDQUNqQyxFQUFFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUMxQixFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDeEUsQ0FBQyxDQUFDO0NBRUYsSUFBSSxZQUFZLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDakMsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDaEMsRUFBRSxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUNsQyxFQUFFLE1BQU0sU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7Q0FDakQsQ0FBQyxDQUFDO0NBRUYsSUFBSSxzQkFBc0IsR0FBRyxVQUFVLENBQUMsRUFBRTtDQUMxQyxFQUFFLElBQUkxTCxvQkFBYyxFQUFFO0NBQ3RCLElBQUksSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNwRCxHQUFHLE1BQU0sS0FBSyxJQUFJLEtBQUssSUFBSSwwQkFBMEIsRUFBRSxJQUFJLEdBQUcsQ0FBQywwQkFBMEIsRUFBRTBMLE1BQUksQ0FBQyxFQUFFO0NBQ2xHLElBQUksSUFBSSxxQkFBcUIsR0FBR25QLFFBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM5QyxJQUFJLElBQUkscUJBQXFCLEtBQUssQ0FBQyxLQUFLLHFCQUFxQixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtDQUNoSCxNQUFNLE9BQU8sQ0FBQyxDQUFDO0NBQ2YsS0FBSztDQUNMLEdBQUcsQ0FBQyxNQUFNLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0NBQy9ELENBQUMsQ0FBQztDQUVGLElBQUksc0JBQXNCLEdBQUcsVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtDQUM5RCxFQUFFLElBQUksQ0FBQ0ksV0FBVyxFQUFFLE9BQU87Q0FDM0IsRUFBRSxJQUFJLE1BQU0sRUFBRSxLQUFLLElBQUksS0FBSyxJQUFJLDBCQUEwQixFQUFFO0NBQzVELElBQUksSUFBSSxxQkFBcUIsR0FBR0osUUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzlDLElBQUksSUFBSSxxQkFBcUIsSUFBSSxHQUFHLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0NBQzVFLE1BQU0sT0FBTyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbEQsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLEVBQUU7Q0FDM0MsSUFBSSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFRO0NBQ3hELFFBQVEseUJBQXlCLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUM7Q0FDMUUsR0FBRztDQUNILENBQUMsQ0FBQztDQUVGLElBQUksNEJBQTRCLEdBQUcsVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtDQUNwRSxFQUFFLElBQUksS0FBSyxFQUFFLHFCQUFxQixDQUFDO0NBQ25DLEVBQUUsSUFBSSxDQUFDSSxXQUFXLEVBQUUsT0FBTztDQUMzQixFQUFFLElBQUlxRCxvQkFBYyxFQUFFO0NBQ3RCLElBQUksSUFBSSxNQUFNLEVBQUUsS0FBSyxLQUFLLElBQUksMEJBQTBCLEVBQUU7Q0FDMUQsTUFBTSxxQkFBcUIsR0FBR3pELFFBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM1QyxNQUFNLElBQUkscUJBQXFCLElBQUksR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxFQUFFO0NBQ3BFLFFBQVEsT0FBTyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQyxPQUFPO0NBQ1AsS0FBSztDQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLEVBQUU7Q0FFcEMsTUFBTSxJQUFJO0NBQ1YsUUFBUSxPQUFPLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFRLEdBQUcseUJBQXlCLElBQUlrUCxXQUFTLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUM7Q0FDdEgsT0FBTyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQWU7Q0FDckMsS0FBSyxNQUFNLE9BQU87Q0FDbEIsR0FBRztDQUNILEVBQUUsS0FBSyxLQUFLLElBQUksMEJBQTBCLEVBQUU7Q0FDNUMsSUFBSSxxQkFBcUIsR0FBR2xQLFFBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQyxJQUFJLElBQUkscUJBQXFCLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBRTtDQUMxRSxNQUFNLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDckQsS0FBSztDQUNMLEdBQUc7Q0FDSCxDQUFDLENBQUM7Q0FFRixLQUFLbVAsTUFBSSxJQUFJLDBCQUEwQixFQUFFO0NBQ3pDLEVBQUUsSUFBSSxDQUFDblAsUUFBTSxDQUFDbVAsTUFBSSxDQUFDLEVBQUUseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0NBQ3ZELENBQUM7Q0FHRCxJQUFJLENBQUMseUJBQXlCLElBQUksT0FBTyxVQUFVLElBQUksVUFBVSxJQUFJLFVBQVUsS0FBSyxRQUFRLENBQUMsU0FBUyxFQUFFO0NBRXhHLEVBQUUsVUFBVSxHQUFHLFNBQVMsVUFBVSxHQUFHO0NBQ3JDLElBQUksTUFBTSxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztDQUM1QyxHQUFHLENBQUM7Q0FDSixFQUFFLElBQUkseUJBQXlCLEVBQUUsS0FBS0EsTUFBSSxJQUFJLDBCQUEwQixFQUFFO0NBQzFFLElBQUksSUFBSW5QLFFBQU0sQ0FBQ21QLE1BQUksQ0FBQyxFQUFFMUwsb0JBQWMsQ0FBQ3pELFFBQU0sQ0FBQ21QLE1BQUksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQy9ELEdBQUc7Q0FDSCxDQUFDO0NBRUQsSUFBSSxDQUFDLHlCQUF5QixJQUFJLENBQUMsbUJBQW1CLElBQUksbUJBQW1CLEtBQUtuTSxpQkFBZSxFQUFFO0NBQ25HLEVBQUUsbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztDQUM3QyxFQUFFLElBQUkseUJBQXlCLEVBQUUsS0FBS21NLE1BQUksSUFBSSwwQkFBMEIsRUFBRTtDQUMxRSxJQUFJLElBQUluUCxRQUFNLENBQUNtUCxNQUFJLENBQUMsRUFBRTFMLG9CQUFjLENBQUN6RCxRQUFNLENBQUNtUCxNQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUNsRixHQUFHO0NBQ0gsQ0FBQztDQUdELElBQUkseUJBQXlCLElBQUlqTSxvQkFBYyxDQUFDLDBCQUEwQixDQUFDLEtBQUssbUJBQW1CLEVBQUU7Q0FDckcsRUFBRU8sb0JBQWMsQ0FBQywwQkFBMEIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0NBQ2xFLENBQUM7Q0FFRCxJQUFJckQsV0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFOEQsZUFBYSxDQUFDLEVBQUU7Q0FDN0QsRUFBRSx1QkFBdUIsR0FBRyxJQUFJLENBQUM7Q0FDakMsRUFBRW5DLGdCQUFjLENBQUMsbUJBQW1CLEVBQUVtQyxlQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWTtDQUN4RSxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDOUQsR0FBRyxFQUFFLENBQUMsQ0FBQztDQUNQLEVBQUUsS0FBS2lMLE1BQUksSUFBSSwwQkFBMEIsRUFBRSxJQUFJblAsUUFBTSxDQUFDbVAsTUFBSSxDQUFDLEVBQUU7Q0FDN0QsSUFBSSwyQkFBMkIsQ0FBQ25QLFFBQU0sQ0FBQ21QLE1BQUksQ0FBQyxFQUFFLGVBQWUsRUFBRUEsTUFBSSxDQUFDLENBQUM7Q0FDckUsR0FBRztDQUNILENBQUM7Q0FFRCx1QkFBYyxHQUFHO0NBQ2pCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCO0NBQ3RELEVBQUUsZUFBZSxFQUFFLHVCQUF1QixJQUFJLGVBQWU7Q0FDN0QsRUFBRSxXQUFXLEVBQUUsV0FBVztDQUMxQixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQjtDQUNoRCxFQUFFLHNCQUFzQixFQUFFLHNCQUFzQjtDQUNoRCxFQUFFLDRCQUE0QixFQUFFLDRCQUE0QjtDQUM1RCxFQUFFLE1BQU0sRUFBRSxNQUFNO0NBQ2hCLEVBQUUsWUFBWSxFQUFFLFlBQVk7Q0FDNUIsRUFBRSxVQUFVLEVBQUUsVUFBVTtDQUN4QixFQUFFLG1CQUFtQixFQUFFLG1CQUFtQjtDQUMxQyxDQUFDOztDQ3ZKRCxJQUFJQywyQkFBeUIsR0FBR25PLG1CQUE4QyxDQUFDLHlCQUF5QixDQUFDO0NBRXpHLElBQUltTixhQUFXLEdBQUdwTyxRQUFNLENBQUMsV0FBVyxDQUFDO0NBQ3JDLElBQUlrUCxXQUFTLEdBQUdsUCxRQUFNLENBQUMsU0FBUyxDQUFDO0NBRWpDLHlDQUFjLEdBQUcsQ0FBQ29QLDJCQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDbEUsRUFBRUYsV0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUN6QixFQUFFLElBQUlBLFdBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxRQUFRLEVBQUU7Q0FDdkQsRUFBRSxJQUFJQSxXQUFTLEVBQUUsQ0FBQztDQUNsQixFQUFFLElBQUlBLFdBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0QixFQUFFLElBQUlBLFdBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNyQixFQUFFLElBQUlBLFdBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVk7Q0FFOUIsRUFBRSxPQUFPLElBQUlBLFdBQVMsQ0FBQyxJQUFJZCxhQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDOztDQ25CRixxQkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzdCLEVBQUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sVUFBVSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Q0FDeEUsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDOztDQ0pELFlBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUU7Q0FDdEMsRUFBRSxJQUFJLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQyxFQUFFLElBQUksTUFBTSxHQUFHLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztDQUN2RCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUM7O0NDREQsSUFBSWlCLHdCQUFzQixHQUFHcE8sbUJBQThDLENBQUMsc0JBQXNCLENBQUM7Q0FFbkcsa0JBQWMsR0FBRyxTQUFTLElBQUksQ0FBQyxNQUFNLEdBQXlCO0NBQzlELEVBQUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzNCLEVBQUUsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUN6QyxFQUFFLElBQUksS0FBSyxHQUFHLGVBQWUsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUM3RCxFQUFFLElBQUksT0FBTyxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUM7Q0FDcEMsRUFBRSxJQUFJLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1QyxFQUFFLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7Q0FDOUMsRUFBRSxJQUFJLGNBQWMsSUFBSSxTQUFTLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsRUFBRTtDQUM3RSxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Q0FDekIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ1gsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUU7Q0FDL0MsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN6QixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsSUFBSSxPQUFPLElBQUksZUFBZSxHQUFHLENBQUMsRUFBRTtDQUN0QyxJQUFJLEtBQUssR0FBR2lCLG1CQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN6QyxHQUFHO0NBQ0gsRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM5QixFQUFFLE1BQU0sR0FBRyxLQUFLbU4sd0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdEQsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtDQUMvQixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEQsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQzs7Q0MzQkQscUJBQWMsR0FBRyxVQUFVLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO0NBQ2xELEVBQUUsSUFBSSxTQUFTLEVBQUUsa0JBQWtCLENBQUM7Q0FDcEMsRUFBRTtDQUVGLElBQUk1TCxvQkFBYztDQUVsQixJQUFJLFFBQVEsU0FBUyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxVQUFVO0NBQ3hELElBQUksU0FBUyxLQUFLLE9BQU87Q0FDekIsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztDQUN0RCxJQUFJLGtCQUFrQixLQUFLLE9BQU8sQ0FBQyxTQUFTO0NBQzVDLElBQUlBLG9CQUFjLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7Q0FDOUMsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNmLENBQUM7OztDQ0dELElBQUksbUJBQW1CLEdBQUd4Qyx5QkFBcUQsQ0FBQyxDQUFDLENBQUM7Q0FFbEYsSUFBSSxPQUFPLEdBQUd5RCxjQUF1QyxDQUFDLE9BQU8sQ0FBQztDQU85RCxJQUFJLGdCQUFnQixHQUFHM0QsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSxnQkFBZ0IsR0FBR0EsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSxvQkFBb0IsR0FBR1Asb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0NBQ2xELElBQUksOEJBQThCLEdBQUdjLDhCQUE4QixDQUFDLENBQUMsQ0FBQztDQUN0RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0NBQ3ZCLElBQUksVUFBVSxHQUFHdEIsUUFBTSxDQUFDLFVBQVUsQ0FBQztDQUNuQyxJQUFJLFdBQVcsR0FBR3VPLFdBQWlCLENBQUMsV0FBVyxDQUFDO0NBQ2hELElBQUksUUFBUSxHQUFHQSxXQUFpQixDQUFDLFFBQVEsQ0FBQztDQUMxQyxJQUFJLHlCQUF5QixHQUFHZSxtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQztDQUM5RSxJQUFJLGVBQWUsR0FBR0EsbUJBQW1CLENBQUMsZUFBZSxDQUFDO0NBQzFELElBQUksVUFBVSxHQUFHQSxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7Q0FDaEQsSUFBSSxtQkFBbUIsR0FBR0EsbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7Q0FDbEUsSUFBSSxzQkFBc0IsR0FBR0EsbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSSxZQUFZLEdBQUdBLG1CQUFtQixDQUFDLFlBQVksQ0FBQztDQUNwRCxJQUFJLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0NBQzVDLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQztDQUVsQyxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUU7Q0FDbEMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQzNCLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN2RCxFQUFFLE9BQU8sTUFBTSxHQUFHLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDdkQsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDLENBQUM7Q0FFRixJQUFJLFNBQVMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUU7Q0FDbkMsRUFBRSxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVk7Q0FDbkQsSUFBSSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZDLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDUCxDQUFDLENBQUM7Q0FFRixJQUFJLGFBQWEsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNsQyxFQUFFLElBQUksS0FBSyxDQUFDO0NBQ1osRUFBRSxPQUFPLEVBQUUsWUFBWSxXQUFXLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLGFBQWEsSUFBSSxLQUFLLElBQUksbUJBQW1CLENBQUM7Q0FDN0csQ0FBQyxDQUFDO0NBRUYsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLE1BQU0sRUFBRSxHQUFHLEVBQUU7Q0FDL0MsRUFBRSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUM7Q0FDN0IsT0FBTyxPQUFPLEdBQUcsSUFBSSxRQUFRO0NBQzdCLE9BQU8sR0FBRyxJQUFJLE1BQU07Q0FDcEIsT0FBTyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbkMsQ0FBQyxDQUFDO0NBRUYsSUFBSSwrQkFBK0IsR0FBRyxTQUFTLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Q0FDckYsRUFBRSxPQUFPLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNoRSxNQUFNLHdCQUF3QixDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDOUMsTUFBTSw4QkFBOEIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDbEQsQ0FBQyxDQUFDO0NBRUYsSUFBSSxxQkFBcUIsR0FBRyxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtDQUM3RSxFQUFFLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzdELE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQztDQUMzQixPQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO0NBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztDQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7Q0FFOUIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZO0NBQy9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUM7Q0FDNUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQztDQUNoRSxJQUFJO0NBQ0osSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztDQUNuQyxJQUFJLE9BQU8sTUFBTSxDQUFDO0NBQ2xCLEdBQUcsQ0FBQyxPQUFPLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDekQsQ0FBQyxDQUFDO0NBRUYsSUFBSWxQLFdBQVcsRUFBRTtDQUNqQixFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtDQUNsQyxJQUFJa0IsOEJBQThCLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDO0NBQ3ZFLElBQUlkLG9CQUFvQixDQUFDLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztDQUNuRCxJQUFJLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUM3QyxJQUFJLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNqRCxJQUFJLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNqRCxJQUFJLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUM3QyxHQUFHO0NBRUgsRUFBRW1DLE9BQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO0NBQzFFLElBQUksd0JBQXdCLEVBQUUsK0JBQStCO0NBQzdELElBQUksY0FBYyxFQUFFLHFCQUFxQjtDQUN6QyxHQUFHLENBQUMsQ0FBQztDQUVMLEVBQUUsY0FBYyxHQUFHLFVBQVUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7Q0FDckQsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQyxJQUFJLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxJQUFJLE9BQU8sR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO0NBQ3ZFLElBQUksSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztDQUM5QixJQUFJLElBQUksTUFBTSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDOUIsSUFBSSxJQUFJLDJCQUEyQixHQUFHM0MsUUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Q0FDL0QsSUFBSSxJQUFJLHFCQUFxQixHQUFHLDJCQUEyQixDQUFDO0NBQzVELElBQUksSUFBSSw4QkFBOEIsR0FBRyxxQkFBcUIsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7Q0FDbEcsSUFBSSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FFdEIsSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUU7Q0FDeEMsTUFBTSxJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN4QyxNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDdEUsS0FBSyxDQUFDO0NBRU4sSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQy9DLE1BQU0sSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDeEMsTUFBTSxJQUFJLE9BQU8sRUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztDQUMvRixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztDQUN0RSxLQUFLLENBQUM7Q0FFTixJQUFJLElBQUksVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLEtBQUssRUFBRTtDQUM1QyxNQUFNLG9CQUFvQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7Q0FDeEMsUUFBUSxHQUFHLEVBQUUsWUFBWTtDQUN6QixVQUFVLE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNyQyxTQUFTO0NBQ1QsUUFBUSxHQUFHLEVBQUUsVUFBVSxLQUFLLEVBQUU7Q0FDOUIsVUFBVSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzVDLFNBQVM7Q0FDVCxRQUFRLFVBQVUsRUFBRSxJQUFJO0NBQ3hCLE9BQU8sQ0FBQyxDQUFDO0NBQ1QsS0FBSyxDQUFDO0NBRU4sSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7Q0FDcEMsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUU7Q0FDN0UsUUFBUSxVQUFVLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7Q0FDbEUsUUFBUSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDdEIsUUFBUSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7Q0FDM0IsUUFBUSxJQUFJLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDO0NBQ3ZDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtDQUM3QixVQUFVLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDakMsVUFBVSxVQUFVLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztDQUN0QyxVQUFVLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUMvQyxTQUFTLE1BQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDeEMsVUFBVSxNQUFNLEdBQUcsSUFBSSxDQUFDO0NBQ3hCLFVBQVUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDL0MsVUFBVSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0NBQ3JDLFVBQVUsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO0NBQ3JDLFlBQVksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQzdELFlBQVksVUFBVSxHQUFHLElBQUksR0FBRyxVQUFVLENBQUM7Q0FDM0MsWUFBWSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsTUFBTSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Q0FDL0QsV0FBVyxNQUFNO0NBQ2pCLFlBQVksVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDbkQsWUFBWSxJQUFJLFVBQVUsR0FBRyxVQUFVLEdBQUcsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQy9FLFdBQVc7Q0FDWCxVQUFVLE1BQU0sR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDO0NBQ3RDLFNBQVMsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtDQUN2QyxVQUFVLE9BQU8sUUFBUSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3ZELFNBQVMsTUFBTTtDQUNmLFVBQVUsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2xFLFNBQVM7Q0FDVCxRQUFRLGdCQUFnQixDQUFDLElBQUksRUFBRTtDQUMvQixVQUFVLE1BQU0sRUFBRSxNQUFNO0NBQ3hCLFVBQVUsVUFBVSxFQUFFLFVBQVU7Q0FDaEMsVUFBVSxVQUFVLEVBQUUsVUFBVTtDQUNoQyxVQUFVLE1BQU0sRUFBRSxNQUFNO0NBQ3hCLFVBQVUsSUFBSSxFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztDQUNwQyxTQUFTLENBQUMsQ0FBQztDQUNYLFFBQVEsT0FBTyxLQUFLLEdBQUcsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztDQUN6RCxPQUFPLENBQUMsQ0FBQztDQUVULE1BQU0sSUFBSXlELG9CQUFjLEVBQUVBLG9CQUFjLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDNUUsTUFBTSw4QkFBOEIsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLEdBQUdYLFlBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3JHLEtBQUssTUFBTSxJQUFJeU0scUNBQTJDLEVBQUU7Q0FDNUQsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRTtDQUN4RixRQUFRLFVBQVUsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztDQUNuRSxRQUFRLE9BQU8saUJBQWlCLENBQUMsWUFBWTtDQUM3QyxVQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxJQUFJLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ3JGLFVBQVUsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxPQUFPLEtBQUssU0FBUztDQUMvRCxjQUFjLElBQUksMkJBQTJCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUM7Q0FDL0YsY0FBYyxnQkFBZ0IsS0FBSyxTQUFTO0NBQzVDLGdCQUFnQixJQUFJLDJCQUEyQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDeEYsZ0JBQWdCLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdEQsVUFBVSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvRSxVQUFVLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNsRSxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUscUJBQXFCLENBQUMsQ0FBQztDQUMzQyxPQUFPLENBQUMsQ0FBQztDQUVULE1BQU0sSUFBSTlMLG9CQUFjLEVBQUVBLG9CQUFjLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDNUUsTUFBTSxPQUFPLENBQUMsbUJBQW1CLENBQUMsMkJBQTJCLENBQUMsRUFBRSxVQUFVLEdBQUcsRUFBRTtDQUMvRSxRQUFRLElBQUksRUFBRSxHQUFHLElBQUkscUJBQXFCLENBQUMsRUFBRTtDQUM3QyxVQUFVLDJCQUEyQixDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ3BHLFNBQVM7Q0FDVCxPQUFPLENBQUMsQ0FBQztDQUNULE1BQU0scUJBQXFCLENBQUMsU0FBUyxHQUFHLDhCQUE4QixDQUFDO0NBQ3ZFLEtBQUs7Q0FFTCxJQUFJLElBQUksOEJBQThCLENBQUMsV0FBVyxLQUFLLHFCQUFxQixFQUFFO0NBQzlFLE1BQU0sMkJBQTJCLENBQUMsOEJBQThCLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7Q0FDeEcsS0FBSztDQUVMLElBQUksSUFBSSxlQUFlLEVBQUU7Q0FDekIsTUFBTSwyQkFBMkIsQ0FBQyw4QkFBOEIsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztDQUNyRyxLQUFLO0NBRUwsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztDQUV2RCxJQUFJZCxPQUFDLENBQUM7Q0FDTixNQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixJQUFJLDJCQUEyQixFQUFFLElBQUksRUFBRSxDQUFDLHlCQUF5QjtDQUNsSCxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FFakIsSUFBSSxJQUFJLEVBQUUsaUJBQWlCLElBQUkscUJBQXFCLENBQUMsRUFBRTtDQUN2RCxNQUFNLDJCQUEyQixDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ25GLEtBQUs7Q0FFTCxJQUFJLElBQUksRUFBRSxpQkFBaUIsSUFBSSw4QkFBOEIsQ0FBQyxFQUFFO0NBQ2hFLE1BQU0sMkJBQTJCLENBQUMsOEJBQThCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDNUYsS0FBSztDQUVMLElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Q0FDakMsR0FBRyxDQUFDO0NBQ0osQ0FBQyxNQUFNLGNBQWMsR0FBRyxZQUFZLElBQWU7OztBQ2pPbkQ2TSxzQkFBMkIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUU7Q0FDckQsRUFBRSxPQUFPLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0NBQ3ZELElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDaEQsR0FBRyxDQUFDO0NBQ0osQ0FBQyxDQUFDOztDQ0hGLElBQUl4TyxLQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUluQixtQkFBYyxHQUFHLEVBQUUsQ0FBQyxVQUFVLElBQUksU0FBUyxVQUFVLENBQUMsTUFBTSxHQUFZLEtBQUssR0FBMkI7Q0FDeEcsRUFBRSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDekIsRUFBRSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQy9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN4QyxFQUFFLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDekMsRUFBRSxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO0NBQzVELEVBQUUsSUFBSSxLQUFLLEdBQUdBLEtBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxTQUFTLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztDQUMxRixFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztDQUNkLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxFQUFFO0NBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2IsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUN0QixJQUFJLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ3BCLEdBQUc7Q0FDSCxFQUFFLE9BQU8sS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0NBQ3RCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbkMsU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN0QixJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUM7Q0FDZCxJQUFJLElBQUksSUFBSSxHQUFHLENBQUM7Q0FDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2IsQ0FBQzs7Q0N4QkQsSUFBSXlPLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlJLHdCQUFzQixHQUFHSixtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztBQUl4RUkseUJBQXNCLENBQUMsWUFBWSxFQUFFLFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQWM7Q0FDcEYsRUFBRSxPQUFPQyxlQUFXLENBQUMsSUFBSSxDQUFDRixhQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDN0csQ0FBQyxDQUFDOztDQ1RGLElBQUksTUFBTSxHQUFHeE8sY0FBdUMsQ0FBQyxLQUFLLENBQUM7Q0FFM0QsSUFBSXdPLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlJLHdCQUFzQixHQUFHSixtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztBQUl4RUkseUJBQXNCLENBQUMsT0FBTyxFQUFFLFNBQVMsS0FBSyxDQUFDLFVBQVUsR0FBa0I7Q0FDM0UsRUFBRSxPQUFPLE1BQU0sQ0FBQ0QsYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDaEcsQ0FBQyxDQUFDOztDQ1BGLElBQUlBLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlJLHdCQUFzQixHQUFHSixtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztBQUt4RUkseUJBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLEtBQUssR0FBcUI7Q0FDdkUsRUFBRSxPQUFPRSxTQUFLLENBQUMsS0FBSyxDQUFDSCxhQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDbkQsQ0FBQyxDQUFDOztDQ1ZGLElBQUksT0FBTyxHQUFHeE8sY0FBdUMsQ0FBQyxNQUFNLENBQUM7Q0FHN0QsSUFBSXdPLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlELHdCQUFzQixHQUFHQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztDQUN4RSxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7QUFJeEVJLHlCQUFzQixDQUFDLFFBQVEsRUFBRSxTQUFTLE1BQU0sQ0FBQyxVQUFVLEdBQWtCO0NBQzdFLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDRCxhQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNyRyxFQUFFLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDckQsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQzNCLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBS0osd0JBQXNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdkQsRUFBRSxPQUFPLE1BQU0sR0FBRyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQyxDQUFDOztDQ2pCRixJQUFJLEtBQUssR0FBR3BPLGNBQXVDLENBQUMsSUFBSSxDQUFDO0NBRXpELElBQUl3TyxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7QUFJeEVJLHlCQUFzQixDQUFDLE1BQU0sRUFBRSxTQUFTLElBQUksQ0FBQyxTQUFTLEdBQWtCO0NBQ3hFLEVBQUUsT0FBTyxLQUFLLENBQUNELGFBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQzlGLENBQUMsQ0FBQzs7Q0NURixJQUFJLFVBQVUsR0FBR3hPLGNBQXVDLENBQUMsU0FBUyxDQUFDO0NBRW5FLElBQUl3TyxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7QUFJeEVJLHlCQUFzQixDQUFDLFdBQVcsRUFBRSxTQUFTLFNBQVMsQ0FBQyxTQUFTLEdBQWtCO0NBQ2xGLEVBQUUsT0FBTyxVQUFVLENBQUNELGFBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ25HLENBQUMsQ0FBQzs7Q0NURixJQUFJN00sVUFBUSxHQUFHM0IsY0FBdUMsQ0FBQyxPQUFPLENBQUM7Q0FFL0QsSUFBSXdPLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlJLHdCQUFzQixHQUFHSixtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztBQUl4RUkseUJBQXNCLENBQUMsU0FBUyxFQUFFLFNBQVMsT0FBTyxDQUFDLFVBQVUsR0FBa0I7Q0FDL0UsRUFBRTlNLFVBQVEsQ0FBQzZNLGFBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQzNGLENBQUMsQ0FBQzs7Q0NURixJQUFJLFNBQVMsR0FBR3hPLGFBQXNDLENBQUMsUUFBUSxDQUFDO0NBRWhFLElBQUl3TyxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7QUFJeEVJLHlCQUFzQixDQUFDLFVBQVUsRUFBRSxTQUFTLFFBQVEsQ0FBQyxhQUFhLEdBQW9CO0NBQ3RGLEVBQUUsT0FBTyxTQUFTLENBQUNELGFBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3RHLENBQUMsQ0FBQzs7Q0NURixJQUFJSSxVQUFRLEdBQUc1TyxhQUFzQyxDQUFDLE9BQU8sQ0FBQztDQUU5RCxJQUFJd08sYUFBVyxHQUFHSCxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7Q0FDbEQsSUFBSUksd0JBQXNCLEdBQUdKLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDO0FBSXhFSSx5QkFBc0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxPQUFPLENBQUMsYUFBYSxHQUFvQjtDQUNwRixFQUFFLE9BQU9HLFVBQVEsQ0FBQ0osYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDckcsQ0FBQyxDQUFDOztDQ0xGLElBQUlqTSxVQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzNDLElBQUlzTSxZQUFVLEdBQUc5UCxRQUFNLENBQUMsVUFBVSxDQUFDO0NBQ25DLElBQUksV0FBVyxHQUFHK1AsaUJBQWMsQ0FBQyxNQUFNLENBQUM7Q0FDeEMsSUFBSSxTQUFTLEdBQUdBLGlCQUFjLENBQUMsSUFBSSxDQUFDO0NBQ3BDLElBQUksWUFBWSxHQUFHQSxpQkFBYyxDQUFDLE9BQU8sQ0FBQztDQUMxQyxJQUFJTixhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSSx3QkFBd0IsR0FBR1EsWUFBVSxJQUFJQSxZQUFVLENBQUMsU0FBUyxDQUFDdE0sVUFBUSxDQUFDLENBQUM7Q0FFNUUsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsd0JBQXdCO0NBQ2xELE1BQU0sd0JBQXdCLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLENBQUM7Q0FFL0YsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLE1BQU0sR0FBRztDQUN6QyxFQUFFLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQ2lNLGFBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQzdDLENBQUMsQ0FBQztBQUlGQyx5QkFBc0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxPQUFPLEdBQUc7Q0FDckQsRUFBRSxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUNELGFBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQzlDLENBQUMsQ0FBQyxDQUFDO0FBR0hDLHlCQUFzQixDQUFDLE1BQU0sRUFBRSxTQUFTLElBQUksR0FBRztDQUMvQyxFQUFFLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQ0QsYUFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDLENBQUM7QUFHSEMseUJBQXNCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUd2RUEseUJBQXNCLENBQUNsTSxVQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs7Q0NsQ3RFLElBQUlpTSxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUtwQkkseUJBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLFNBQVMsRUFBRTtDQUN4RCxFQUFFLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQ0QsYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ25ELENBQUMsQ0FBQzs7Q0NMRixJQUFJek8sS0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FDbkIsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0NBQ3ZDLElBQUlnUCxlQUFhLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDMUUsSUFBSXBDLGVBQWEsR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUV2RCxJQUFJN0osZ0JBQWMsR0FBRyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ25GLElBQUlrTSxRQUFNLEdBQUdELGVBQWEsSUFBSSxDQUFDcEMsZUFBYSxJQUFJLENBQUM3SixnQkFBYyxDQUFDO0NBSWhFLG9CQUFjLEdBQUdrTSxRQUFNLEdBQUcsU0FBUyxXQUFXLENBQUMsYUFBYSxHQUE2QjtDQUV6RixFQUFFLElBQUlELGVBQWEsRUFBRSxPQUFPLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2hDLEVBQUUsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNsQyxFQUFFLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDekIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBR2hQLEtBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEUsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDeEMsRUFBRSxNQUFNLEtBQUssSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxhQUFhLEVBQUUsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQzdGLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUNaLENBQUMsR0FBRyxpQkFBaUI7O0NDdkJyQixJQUFJeU8sYUFBVyxHQUFHSCxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7Q0FDbEQsSUFBSUksd0JBQXNCLEdBQUdKLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDO0FBS3hFSSx5QkFBc0IsQ0FBQyxhQUFhLEVBQUUsU0FBUyxXQUFXLENBQUMsYUFBYSxHQUFvQjtDQUM1RixFQUFFLE9BQU9RLGdCQUFZLENBQUMsS0FBSyxDQUFDVCxhQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDMUQsQ0FBQyxDQUFDOztDQ1ZGLElBQUlVLE1BQUksR0FBR2xQLGNBQXVDLENBQUMsR0FBRyxDQUFDO0NBR3ZELElBQUl3TyxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJRCx3QkFBc0IsR0FBR0MsbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSUksd0JBQXNCLEdBQUdKLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDO0FBSXhFSSx5QkFBc0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxHQUFHLENBQUMsS0FBSyxHQUFrQjtDQUNsRSxFQUFFLE9BQU9TLE1BQUksQ0FBQ1YsYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtDQUM5RyxJQUFJLE9BQU8sS0FBS0osd0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3RGLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDOztDQ1RGLElBQUlwTixjQUFZLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDdkMsRUFBRSxPQUFPLFVBQVUsSUFBSSxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFO0NBQzVELElBQUlELFdBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUMxQixJQUFJLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzQixJQUFJLElBQUksSUFBSSxHQUFHOUIsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLElBQUksSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNwQyxJQUFJLElBQUksS0FBSyxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQyxJQUFJLElBQUksQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDOUIsSUFBSSxJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUUsT0FBTyxJQUFJLEVBQUU7Q0FDMUMsTUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Q0FDekIsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzNCLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQztDQUNuQixRQUFRLE1BQU07Q0FDZCxPQUFPO0NBQ1AsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQ2pCLE1BQU0sSUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxNQUFNLElBQUksS0FBSyxFQUFFO0NBQ2xELFFBQVEsTUFBTSxTQUFTLENBQUMsNkNBQTZDLENBQUMsQ0FBQztDQUN2RSxPQUFPO0NBQ1AsS0FBSztDQUNMLElBQUksTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsS0FBSyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0NBQ2pGLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNyRCxLQUFLO0NBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQztDQUNoQixHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7Q0FFRixlQUFjLEdBQUc7Q0FHakIsRUFBRSxJQUFJLEVBQUUrQixjQUFZLENBQUMsS0FBSyxDQUFDO0NBRzNCLEVBQUUsS0FBSyxFQUFFQSxjQUFZLENBQUMsSUFBSSxDQUFDO0NBQzNCLENBQUM7O0NDckNELElBQUksT0FBTyxHQUFHaEIsV0FBb0MsQ0FBQyxJQUFJLENBQUM7Q0FFeEQsSUFBSXdPLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlJLHdCQUFzQixHQUFHSixtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztBQUl4RUkseUJBQXNCLENBQUMsUUFBUSxFQUFFLFNBQVMsTUFBTSxDQUFDLFVBQVUsR0FBdUI7Q0FDbEYsRUFBRSxPQUFPLE9BQU8sQ0FBQ0QsYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNuSCxDQUFDLENBQUM7O0NDVEYsSUFBSSxZQUFZLEdBQUd4TyxXQUFvQyxDQUFDLEtBQUssQ0FBQztDQUU5RCxJQUFJd08sYUFBVyxHQUFHSCxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7Q0FDbEQsSUFBSUksd0JBQXNCLEdBQUdKLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDO0FBSXhFSSx5QkFBc0IsQ0FBQyxhQUFhLEVBQUUsU0FBUyxXQUFXLENBQUMsVUFBVSxHQUF1QjtDQUM1RixFQUFFLE9BQU8sWUFBWSxDQUFDRCxhQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3hILENBQUMsQ0FBQzs7Q0NSRixJQUFJQSxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSXhCLE9BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBSXZCNEIseUJBQXNCLENBQUMsU0FBUyxFQUFFLFNBQVMsT0FBTyxHQUFHO0NBQ3JELEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxNQUFNLEdBQUdELGFBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7Q0FDeEMsRUFBRSxJQUFJLE1BQU0sR0FBRzNCLE9BQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDakMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLEtBQUssQ0FBQztDQUNaLEVBQUUsT0FBTyxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ25DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN6QixHQUFHLENBQUMsT0FBTyxJQUFJLENBQUM7Q0FDaEIsQ0FBQyxDQUFDOztDQ2JGLElBQUkyQixhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FFeEUsSUFBSVcsUUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZO0NBRS9CLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzNCLENBQUMsQ0FBQyxDQUFDO0FBSUhQLHlCQUFzQixDQUFDLEtBQUssRUFBRSxTQUFTLEdBQUcsQ0FBQyxTQUFTLEdBQWlCO0NBQ3JFLEVBQUVELGFBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNwQixFQUFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzVFLEVBQUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUMzQixFQUFFLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUNoQyxFQUFFLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDakMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0NBQzlELEVBQUUsT0FBTyxLQUFLLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDMUQsQ0FBQyxFQUFFUSxRQUFNLENBQUM7O0NDckJWLElBQUlSLGFBQVcsR0FBR0gsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUlELHdCQUFzQixHQUFHQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztDQUN4RSxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUV0QixJQUFJVyxRQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVk7Q0FFL0IsRUFBRSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUMzQixDQUFDLENBQUMsQ0FBQztBQUlIUCx5QkFBc0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtDQUMzRCxFQUFFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUNELGFBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDeEQsRUFBRSxJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ3JELEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUMzQixFQUFFLElBQUksTUFBTSxHQUFHLEtBQUtKLHdCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsT0FBTyxNQUFNLEdBQUcsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztDQUN2RCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUMsRUFBRVksUUFBTSxDQUFDOztDQ3ZCVixJQUFJLEtBQUssR0FBR2hQLGNBQXVDLENBQUMsSUFBSSxDQUFDO0NBRXpELElBQUl3TyxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7QUFJeEVJLHlCQUFzQixDQUFDLE1BQU0sRUFBRSxTQUFTLElBQUksQ0FBQyxVQUFVLEdBQWtCO0NBQ3pFLEVBQUUsT0FBTyxLQUFLLENBQUNELGFBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQy9GLENBQUMsQ0FBQzs7Q0NSRixJQUFJQSxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7Q0FDeEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUlwQkkseUJBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLFNBQVMsRUFBRTtDQUN4RCxFQUFFLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQ0QsYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ2xELENBQUMsQ0FBQzs7Q0NMRixJQUFJQSxhQUFXLEdBQUdILG1CQUFtQixDQUFDLFdBQVcsQ0FBQztDQUNsRCxJQUFJSSx3QkFBc0IsR0FBR0osbUJBQW1CLENBQUMsc0JBQXNCLENBQUM7QUFJeEVJLHlCQUFzQixDQUFDLFVBQVUsRUFBRSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQ2pFLEVBQUUsSUFBSSxDQUFDLEdBQUdELGFBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM1QixFQUFFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7Q0FDeEIsRUFBRSxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ2xELEVBQUUsT0FBTyxLQUFLLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0NBQ2xELElBQUksQ0FBQyxDQUFDLE1BQU07Q0FDWixJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxpQkFBaUI7Q0FDbkQsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxHQUFHLE1BQU0sR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQztDQUN0RixHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7O0NDZkYsSUFBSVAsV0FBUyxHQUFHbFAsUUFBTSxDQUFDLFNBQVMsQ0FBQztDQUNqQyxJQUFJeVAsYUFBVyxHQUFHSCxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7Q0FDbEQsSUFBSUksd0JBQXNCLEdBQUdKLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDO0NBQ3hFLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7Q0FDeEMsSUFBSWMsUUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FHdEIsSUFBSSxvQkFBb0IsR0FBRyxDQUFDLENBQUNsQixXQUFTLElBQUksS0FBSyxDQUFDLFlBQVk7Q0FDNUQsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUlBLFdBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLENBQUMsQ0FBQyxDQUFDO0NBRUgsSUFBSWUsUUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZO0NBQy9CLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJZixXQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztDQUMzRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBQ3pCLEVBQUVBLFdBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xELENBQUMsQ0FBQyxDQUFDO0FBSUhRLHlCQUFzQixDQUFDLGdCQUFnQixFQUFFLFNBQVMsY0FBYyxHQUFHO0NBQ25FLEVBQUUsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLG9CQUFvQixHQUFHVSxRQUFNLENBQUMsSUFBSSxDQUFDWCxhQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBR0EsYUFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3JILENBQUMsRUFBRVEsUUFBTSxDQUFDOztDQ3pCVixJQUFJUCx3QkFBc0IsR0FBR3pPLG1CQUE4QyxDQUFDLHNCQUFzQixDQUFDO0NBSW5HLElBQUk2TyxZQUFVLEdBQUc5UCxRQUFNLENBQUMsVUFBVSxDQUFDO0NBQ25DLElBQUksbUJBQW1CLEdBQUc4UCxZQUFVLElBQUlBLFlBQVUsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0NBQ25FLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7Q0FDaEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztDQUV4QixJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNwRCxFQUFFLGFBQWEsR0FBRyxTQUFTLFFBQVEsR0FBRztDQUN0QyxJQUFJLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNoQyxHQUFHLENBQUM7Q0FDSixDQUFDO0NBRUQsSUFBSSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBSXhFSix5QkFBc0IsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixDQUFDOztDQ2hCdEUsSUFBSWxNLFVBQVEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FFM0MsYUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDcEMsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDakQsRUFBRSxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO0NBQ3RDLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Q0FDekIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxFQUFFLEdBQUcsRUFBRTtDQUM3QyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQyxJQUFJLE1BQU0sSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO0NBQzFCLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsRUFBRSxPQUFPLENBQUM2TSxNQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUNoQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUk7Q0FDekIsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLHdCQUF3QjtDQUM1QyxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRztDQUNwQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEtBQUs7Q0FDcEQsT0FBTyxDQUFDLFlBQVksQ0FBQzdNLFVBQVEsQ0FBQztDQUU5QixPQUFPLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsS0FBSyxHQUFHO0NBQzlDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRztDQUV2RSxPQUFPLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZO0NBRW5ELE9BQU8sSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVM7Q0FFL0MsT0FBTyxNQUFNLEtBQUssTUFBTTtDQUV4QixPQUFPLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDO0NBQ25ELENBQUMsQ0FBQzs7Q0N2QkYsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUNqQyxJQUFJekIsZ0JBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0NBSTNDLGdCQUFjLEdBQUcsQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLFlBQVk7Q0FFcEQsRUFBRSxJQUFJM0IsV0FBVyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMyQixnQkFBYyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7Q0FDakYsSUFBSSxVQUFVLEVBQUUsSUFBSTtDQUNwQixJQUFJLEdBQUcsRUFBRSxZQUFZO0NBQ3JCLE1BQU1BLGdCQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtDQUNoQyxRQUFRLEtBQUssRUFBRSxDQUFDO0NBQ2hCLFFBQVEsVUFBVSxFQUFFLEtBQUs7Q0FDekIsT0FBTyxDQUFDLENBQUM7Q0FDVCxLQUFLO0NBQ0wsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FFdEMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDYixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUViLEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7Q0FDeEIsRUFBRSxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztDQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDaEIsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDL0QsRUFBRSxPQUFPLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQVEsQ0FBQztDQUNsRyxDQUFDLENBQUMsR0FBRyxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0NBQ3JDLEVBQUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzNCLEVBQUUsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUN6QyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUkscUJBQXFCLEdBQUdWLDJCQUEyQixDQUFDLENBQUMsQ0FBQztDQUM1RCxFQUFFLElBQUksb0JBQW9CLEdBQUdkLDBCQUEwQixDQUFDLENBQUMsQ0FBQztDQUMxRCxFQUFFLE9BQU8sZUFBZSxHQUFHLEtBQUssRUFBRTtDQUNsQyxJQUFJLElBQUksQ0FBQyxHQUFHTCxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM5QyxJQUFJLElBQUksSUFBSSxHQUFHLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEcsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQzdCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2QsSUFBSSxJQUFJLEdBQUcsQ0FBQztDQUNaLElBQUksT0FBTyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0NBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3RCLE1BQU0sSUFBSSxDQUFDRSxXQUFXLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzdFLEtBQUs7Q0FDTCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDYixDQUFDLEdBQUcsWUFBWTs7Q0MvQ2hCLGdDQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7Q0FDekQsRUFBRSxJQUFJO0NBQ04sSUFBSSxPQUFPLE9BQU8sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUVsRSxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDNUIsSUFBSSxNQUFNLEtBQUssQ0FBQztDQUNoQixHQUFHO0NBQ0gsQ0FBQzs7Q0NERCxhQUFjLEdBQUcsU0FBUyxJQUFJLENBQUMsU0FBUyxHQUFpRDtDQUN6RixFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUM5QixFQUFFLElBQUksQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0NBQ25ELEVBQUUsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUN6QyxFQUFFLElBQUksS0FBSyxHQUFHLGVBQWUsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUM3RCxFQUFFLElBQUksT0FBTyxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUM7Q0FDcEMsRUFBRSxJQUFJLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1QyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7Q0FDbEQsRUFBRSxJQUFJLE9BQU8sRUFBRSxLQUFLLEdBQUc4QixtQkFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FFdEYsRUFBRSxJQUFJLGNBQWMsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7Q0FDN0YsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0NBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDckIsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDdkQsTUFBTSxLQUFLLEdBQUcsT0FBTyxHQUFHLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDOUcsTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMzQyxLQUFLO0NBQ0wsR0FBRyxNQUFNO0NBQ1QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMzQixJQUFJLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtDQUNuQyxNQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDMUQsTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMzQyxLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDeEIsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDOztDQ3RDRCxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7Q0FDeEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQ2IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO0NBQ2YsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0NBQ3JCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztDQUNuQixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUM7Q0FDcEIsSUFBSSxhQUFhLEdBQUcsY0FBYyxDQUFDO0NBQ25DLElBQUksZUFBZSxHQUFHLHdCQUF3QixDQUFDO0NBQy9DLElBQUksY0FBYyxHQUFHLGlEQUFpRCxDQUFDO0NBQ3ZFLElBQUksYUFBYSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDaEMsSUFBSTRMLE9BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0NBQ3ZCLElBQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztDQVM3QyxJQUFJLFVBQVUsR0FBRyxVQUFVLE1BQU0sRUFBRTtDQUNuQyxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztDQUNsQixFQUFFLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDN0IsRUFBRSxPQUFPLE9BQU8sR0FBRyxNQUFNLEVBQUU7Q0FDM0IsSUFBSSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Q0FDN0MsSUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFO0NBRWhFLE1BQU0sSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0NBQy9DLE1BQU0sSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEtBQUssTUFBTSxFQUFFO0NBQ3RDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssS0FBSyxFQUFFLEtBQUssS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0NBQ3pFLE9BQU8sTUFBTTtDQUdiLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMzQixRQUFRLE9BQU8sRUFBRSxDQUFDO0NBQ2xCLE9BQU87Q0FDUCxLQUFLLE1BQU07Q0FDWCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDekIsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUMsQ0FBQztDQUtGLElBQUksWUFBWSxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBR3BDLEVBQUUsT0FBTyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDeEMsQ0FBQyxDQUFDO0NBTUYsSUFBSSxLQUFLLEdBQUcsVUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRTtDQUNuRCxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNaLEVBQUUsS0FBSyxHQUFHLFNBQVMsR0FBR0EsT0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsS0FBSyxJQUFJQSxPQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3BDLEVBQUUsT0FBTyxLQUFLLEdBQUcsYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRTtDQUN2RCxJQUFJLEtBQUssR0FBR0EsT0FBSyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQztDQUN6QyxHQUFHO0NBQ0gsRUFBRSxPQUFPQSxPQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDakUsQ0FBQyxDQUFDO0NBT0YsSUFBSSxNQUFNLEdBQUcsVUFBVSxLQUFLLEVBQUU7Q0FDOUIsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FHbEIsRUFBRSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBRzVCLEVBQUUsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUdqQyxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztDQUNuQixFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQztDQUN6QixFQUFFLElBQUksQ0FBQyxFQUFFLFlBQVksQ0FBQztDQUd0QixFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtDQUNyQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUIsSUFBSSxJQUFJLFlBQVksR0FBRyxJQUFJLEVBQUU7Q0FDN0IsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Q0FDcEQsS0FBSztDQUNMLEdBQUc7Q0FFSCxFQUFFLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDbEMsRUFBRSxJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUM7Q0FHbkMsRUFBRSxJQUFJLFdBQVcsRUFBRTtDQUNuQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDM0IsR0FBRztDQUdILEVBQUUsT0FBTyxjQUFjLEdBQUcsV0FBVyxFQUFFO0NBRXZDLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0NBQ25CLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0NBQ3ZDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QixNQUFNLElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO0NBQ2pELFFBQVEsQ0FBQyxHQUFHLFlBQVksQ0FBQztDQUN6QixPQUFPO0NBQ1AsS0FBSztDQUdMLElBQUksSUFBSSxxQkFBcUIsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0NBQ25ELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxPQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLHFCQUFxQixDQUFDLEVBQUU7Q0FDakUsTUFBTSxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztDQUN2QyxLQUFLO0NBRUwsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLHFCQUFxQixDQUFDO0NBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUVWLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0NBQ3ZDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QixNQUFNLElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUU7Q0FDaEQsUUFBUSxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztDQUN6QyxPQUFPO0NBQ1AsTUFBTSxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUU7Q0FFN0IsUUFBUSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDdEIsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksSUFBc0IsQ0FBQyxJQUFJLElBQUksRUFBRTtDQUMxRCxVQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDMUUsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTTtDQUMzQixVQUFVLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDOUIsVUFBVSxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQ3BDLFVBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEYsVUFBVSxDQUFDLEdBQUdBLE9BQUssQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUM7Q0FDMUMsU0FBUztDQUVULFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pELFFBQVEsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxJQUFJLFdBQVcsQ0FBQyxDQUFDO0NBQ2xGLFFBQVEsS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQixRQUFRLEVBQUUsY0FBYyxDQUFDO0NBQ3pCLE9BQU87Q0FDUCxLQUFLO0NBRUwsSUFBSSxFQUFFLEtBQUssQ0FBQztDQUNaLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDUixHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDekIsQ0FBQyxDQUFDO0NBRUYseUJBQWMsR0FBRyxVQUFVLEtBQUssRUFBRTtDQUNsQyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztDQUNuQixFQUFFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNqRixFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQztDQUNmLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0NBQ3RDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0NBQzdFLEdBQUc7Q0FDSCxFQUFFLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMzQixDQUFDOztDQ3BLRCxlQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUM3QyxFQUFFLElBQUksT0FBTyxjQUFjLElBQUksVUFBVSxFQUFFO0NBQzNDLElBQUksTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUM7Q0FDckQsR0FBRyxDQUFDLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3QyxDQUFDOztDQ2VELElBQUl3QyxRQUFNLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pDLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUNwQyxJQUFJOU0sVUFBUSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUMzQyxJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0NBQzFDLElBQUksMEJBQTBCLEdBQUcsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0NBQ2hFLElBQUlFLGtCQUFnQixHQUFHM0MsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSxzQkFBc0IsR0FBR0EsYUFBbUIsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztDQUM5RSxJQUFJLHdCQUF3QixHQUFHQSxhQUFtQixDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0NBRXpGLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztDQUNqQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FFekIsSUFBSSxlQUFlLEdBQUcsVUFBVSxLQUFLLEVBQUU7Q0FDdkMsRUFBRSxPQUFPLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQzVHLENBQUMsQ0FBQztDQUVGLElBQUksYUFBYSxHQUFHLFVBQVUsUUFBUSxFQUFFO0NBQ3hDLEVBQUUsSUFBSTtDQUNOLElBQUksT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN4QyxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxPQUFPLFFBQVEsQ0FBQztDQUNwQixHQUFHO0NBQ0gsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDaEMsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNyQyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDdEMsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ2xCLElBQUksT0FBTyxLQUFLLEVBQUU7Q0FDbEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztDQUN2RSxLQUFLO0NBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0NBQ0gsQ0FBQyxDQUFDO0NBRUYsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDO0NBRTFCLElBQUksT0FBTyxHQUFHO0NBQ2QsRUFBRSxHQUFHLEVBQUUsS0FBSztDQUNaLEVBQUUsR0FBRyxFQUFFLEtBQUs7Q0FDWixFQUFFLEdBQUcsRUFBRSxLQUFLO0NBQ1osRUFBRSxHQUFHLEVBQUUsS0FBSztDQUNaLEVBQUUsR0FBRyxFQUFFLEtBQUs7Q0FDWixFQUFFLEtBQUssRUFBRSxHQUFHO0NBQ1osQ0FBQyxDQUFDO0NBRUYsSUFBSSxRQUFRLEdBQUcsVUFBVSxLQUFLLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN4QixDQUFDLENBQUM7Q0FFRixJQUFJLFNBQVMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUM5QixFQUFFLE9BQU8sa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUN4RCxDQUFDLENBQUM7Q0FFRixJQUFJLGlCQUFpQixHQUFHLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRTtDQUNqRCxFQUFFLElBQUksS0FBSyxFQUFFO0NBQ2IsSUFBSSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3RDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLElBQUksSUFBSSxTQUFTLEVBQUUsS0FBSyxDQUFDO0NBQ3pCLElBQUksT0FBTyxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRTtDQUN0QyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztDQUN0QyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtDQUM1QixRQUFRLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3JDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQztDQUNwQixVQUFVLEdBQUcsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3pDLFVBQVUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzdDLFNBQVMsQ0FBQyxDQUFDO0NBQ1gsT0FBTztDQUNQLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsQ0FBQyxDQUFDO0NBRUYsSUFBSSxrQkFBa0IsR0FBRyxVQUFVLEtBQUssRUFBRTtDQUMxQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUMxQixFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDekMsQ0FBQyxDQUFDO0NBRUYsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLE1BQU0sRUFBRSxRQUFRLEVBQUU7Q0FDMUQsRUFBRSxJQUFJLE1BQU0sR0FBRyxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztDQUNqRSxDQUFDLENBQUM7Q0FFRixJQUFJLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7Q0FDeEYsRUFBRTJDLGtCQUFnQixDQUFDLElBQUksRUFBRTtDQUN6QixJQUFJLElBQUksRUFBRSwwQkFBMEI7Q0FDcEMsSUFBSSxRQUFRLEVBQUUsV0FBVyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztDQUNqRSxJQUFJLElBQUksRUFBRSxJQUFJO0NBQ2QsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsSUFBSSxHQUFHO0NBQy9CLEVBQUUsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDN0MsRUFBRSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0NBQ3hCLEVBQUUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUNuQyxFQUFFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDekIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtDQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFHLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQztDQUNoQixDQUFDLENBQUMsQ0FBQztDQUlILElBQUksMEJBQTBCLEdBQUcsU0FBUyxlQUFlLEdBQWE7Q0FDdEUsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFLGlCQUFpQixDQUFDLENBQUM7Q0FDbEUsRUFBRSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO0NBQzdELEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0NBQ25CLEVBQUUsSUFBSSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQztDQUV6RixFQUFFQSxrQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7Q0FDekIsSUFBSSxJQUFJLEVBQUUsaUJBQWlCO0NBQzNCLElBQUksT0FBTyxFQUFFLE9BQU87Q0FDcEIsSUFBSSxTQUFTLEVBQUUsWUFBWSxJQUFlO0NBQzFDLElBQUksa0JBQWtCLEVBQUUsa0JBQWtCO0NBQzFDLEdBQUcsQ0FBQyxDQUFDO0NBRUwsRUFBRSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7Q0FDMUIsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtDQUN4QixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMvQyxNQUFNLElBQUksT0FBTyxjQUFjLEtBQUssVUFBVSxFQUFFO0NBQ2hELFFBQVEsUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDN0MsUUFBUSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztDQUM3QixRQUFRLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRTtDQUNuRCxVQUFVLGFBQWEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQzVELFVBQVUsU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7Q0FDekMsVUFBVTtDQUNWLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJO0NBQ3hELFlBQVksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJO0NBQ3pELFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUk7Q0FDL0MsWUFBWSxNQUFNLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0NBQy9ELFVBQVUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQzVFLFNBQVM7Q0FDVCxPQUFPLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLElBQUlzRSxHQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUN4RyxLQUFLLE1BQU07Q0FDWCxNQUFNLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZILEtBQUs7Q0FDTCxHQUFHO0NBQ0gsQ0FBQyxDQUFDO0NBRUYsSUFBSSx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7Q0FFcEUsV0FBVyxDQUFDLHdCQUF3QixFQUFFO0NBR3RDLEVBQUUsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7Q0FDdkMsSUFBSSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2pELElBQUksSUFBSSxLQUFLLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDN0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUM5RCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUN0QixHQUFHO0NBR0gsRUFBRSxRQUFRLEVBQUUsVUFBVSxJQUFJLEVBQUU7Q0FDNUIsSUFBSSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2pELElBQUksSUFBSSxLQUFLLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDN0MsSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0NBQ2hDLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUN4QixJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQixJQUFJLE9BQU8sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Q0FDbkMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9ELFdBQVcsS0FBSyxFQUFFLENBQUM7Q0FDbkIsS0FBSztDQUNMLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0NBQ3RCLEdBQUc7Q0FHSCxFQUFFLEdBQUcsRUFBRSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Q0FDMUIsSUFBSSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2pELElBQUksSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQ3ZELElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUN4QixJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQixJQUFJLE9BQU8sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDNUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztDQUNsRSxLQUFLO0NBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQztDQUNoQixHQUFHO0NBR0gsRUFBRSxNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFO0NBQ2hDLElBQUksdUJBQXVCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqRCxJQUFJLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztDQUN2RCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDeEIsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDcEIsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDbEIsSUFBSSxPQUFPLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQzVDLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN4RSxLQUFLO0NBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0NBR0gsRUFBRSxHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFO0NBQzFCLElBQUksdUJBQXVCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqRCxJQUFJLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztDQUN2RCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDeEIsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDbEIsSUFBSSxPQUFPLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFO0NBQ25DLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ3BELEtBQUs7Q0FDTCxJQUFJLE9BQU8sS0FBSyxDQUFDO0NBQ2pCLEdBQUc7Q0FHSCxFQUFFLEdBQUcsRUFBRSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0NBQ2pDLElBQUksdUJBQXVCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqRCxJQUFJLElBQUksS0FBSyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzdDLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztDQUNoQyxJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztDQUN0QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDeEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLElBQUksSUFBSSxLQUFLLENBQUM7Q0FDZCxJQUFJLE9BQU8sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDNUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtDQUM3QixRQUFRLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsYUFBYTtDQUNiLFVBQVUsS0FBSyxHQUFHLElBQUksQ0FBQztDQUN2QixVQUFVLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0NBQzVCLFNBQVM7Q0FDVCxPQUFPO0NBQ1AsS0FBSztDQUNMLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztDQUN2RCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUN0QixHQUFHO0NBR0gsRUFBRSxJQUFJLEVBQUUsU0FBUyxJQUFJLEdBQUc7Q0FDeEIsSUFBSSxJQUFJLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM3QyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7Q0FFaEMsSUFBSSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDaEMsSUFBSSxJQUFJLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO0NBQ3hDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDdkIsSUFBSSxLQUFLLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUU7Q0FDbEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ2hDLE1BQU0sS0FBSyxZQUFZLEdBQUcsQ0FBQyxFQUFFLFlBQVksR0FBRyxVQUFVLEVBQUUsWUFBWSxFQUFFLEVBQUU7Q0FDeEUsUUFBUSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRTtDQUNuRCxVQUFVLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNqRCxVQUFVLE1BQU07Q0FDaEIsU0FBUztDQUNULE9BQU87Q0FDUCxNQUFNLElBQUksWUFBWSxLQUFLLFVBQVUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzNELEtBQUs7Q0FDTCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUN0QixHQUFHO0NBRUgsRUFBRSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsUUFBUSxHQUFrQjtDQUN0RCxJQUFJLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztDQUN2RCxJQUFJLElBQUksYUFBYSxHQUFHOUYsbUJBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMzRixJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQixJQUFJLElBQUksS0FBSyxDQUFDO0NBQ2QsSUFBSSxPQUFPLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFO0NBQ25DLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQy9CLE1BQU0sYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNsRCxLQUFLO0NBQ0wsR0FBRztDQUVILEVBQUUsSUFBSSxFQUFFLFNBQVMsSUFBSSxHQUFHO0NBQ3hCLElBQUksT0FBTyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztDQUNyRCxHQUFHO0NBRUgsRUFBRSxNQUFNLEVBQUUsU0FBUyxNQUFNLEdBQUc7Q0FDNUIsSUFBSSxPQUFPLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3ZELEdBQUc7Q0FFSCxFQUFFLE9BQU8sRUFBRSxTQUFTLE9BQU8sR0FBRztDQUM5QixJQUFJLE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDeEQsR0FBRztDQUNILENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBR3pCLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRXNCLFVBQVEsRUFBRSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUkvRSxRQUFRLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFNBQVMsUUFBUSxHQUFHO0NBQ25FLEVBQUUsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQ3JELEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxLQUFLLENBQUM7Q0FDWixFQUFFLE9BQU8sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Q0FDakMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDN0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNyRSxHQUFHLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzVCLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBRXpCLGNBQWMsQ0FBQywwQkFBMEIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBRTlEYixRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDNE4sU0FBYyxFQUFFLEVBQUU7Q0FDN0MsRUFBRSxlQUFlLEVBQUUsMEJBQTBCO0NBQzdDLENBQUMsQ0FBQyxDQUFDO0NBSUgsSUFBSSxDQUFDQSxTQUFjLElBQUksT0FBT0QsUUFBTSxJQUFJLFVBQVUsSUFBSSxPQUFPLE9BQU8sSUFBSSxVQUFVLEVBQUU7Q0FDcEYsRUFBRTNOLE9BQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FDdEQsSUFBSSxLQUFLLEVBQUUsU0FBUyxLQUFLLENBQUMsS0FBSyxHQUFlO0NBQzlDLE1BQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN6QixNQUFNLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7Q0FDOUIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0NBQ2hDLFFBQVEsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1QixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0NBQzVCLFVBQVUsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDM0IsVUFBVSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtDQUNuRCxZQUFZLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0NBQy9FLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUU7Q0FDOUMsY0FBYyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxpREFBaUQsQ0FBQyxDQUFDO0NBQzdGLGFBQWE7Q0FDYixZQUFZLElBQUksR0FBR0csWUFBTSxDQUFDLElBQUksRUFBRTtDQUNoQyxjQUFjLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzdELGNBQWMsT0FBTyxFQUFFLHdCQUF3QixDQUFDLENBQUMsRUFBRSxPQUFPLENBQUM7Q0FDM0QsYUFBYSxDQUFDLENBQUM7Q0FDZixXQUFXO0NBQ1gsU0FBUztDQUNULFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN4QixPQUFPLENBQUMsT0FBT3dOLFFBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3hDLEtBQUs7Q0FDTCxHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7Q0FFRCx1QkFBYyxHQUFHO0NBQ2pCLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjtDQUM3QyxFQUFFLFFBQVEsRUFBRSxzQkFBc0I7Q0FDbEMsQ0FBQzs7Q0M3VUQsSUFBSSxNQUFNLEdBQUc1TCxlQUF3QyxDQUFDLE1BQU0sQ0FBQztDQU03RCxJQUFJLFNBQVMsR0FBRzFFLFFBQU0sQ0FBQyxHQUFHLENBQUM7Q0FDM0IsSUFBSXdRLGlCQUFlLEdBQUdDLG1CQUFxQixDQUFDLGVBQWUsQ0FBQztDQUM1RCxJQUFJLDRCQUE0QixHQUFHQSxtQkFBcUIsQ0FBQyxRQUFRLENBQUM7Q0FDbEUsSUFBSS9NLGtCQUFnQixHQUFHM0MsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSxtQkFBbUIsR0FBR0EsYUFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDL0QsSUFBSStNLE9BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0NBQ3ZCLElBQUk0QyxLQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUVuQixJQUFJLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0NBQzVDLElBQUksY0FBYyxHQUFHLGdCQUFnQixDQUFDO0NBQ3RDLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQztDQUNsQyxJQUFJLFlBQVksR0FBRyxjQUFjLENBQUM7Q0FFbEMsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDO0NBQ3ZCLElBQUksWUFBWSxHQUFHLGVBQWUsQ0FBQztDQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDakIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDO0NBQzNCLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQztDQUNyQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7Q0FDbEIsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDO0NBRTFCLElBQUkseUJBQXlCLEdBQUcsdUNBQXVDLENBQUM7Q0FFeEUsSUFBSSwyQ0FBMkMsR0FBRyxzQ0FBc0MsQ0FBQztDQUV6RixJQUFJLHdDQUF3QyxHQUFHLHdDQUF3QyxDQUFDO0NBRXhGLElBQUksZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUM7Q0FDL0MsSUFBSSxHQUFHLENBQUM7Q0FFUixJQUFJLFNBQVMsR0FBRyxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDdEMsRUFBRSxJQUFJLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDO0NBQ2hDLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtDQUM5QixJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxPQUFPLFlBQVksQ0FBQztDQUNuRSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLFlBQVksQ0FBQztDQUNyQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0NBRXRCLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQzlCLElBQUksSUFBSSwyQ0FBMkMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxZQUFZLENBQUM7Q0FDckYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNsQyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtDQUN4RCxNQUFNLE1BQU0sSUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLHlCQUF5QixDQUFDLENBQUM7Q0FDNUUsS0FBSztDQUNMLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Q0FDdEIsR0FBRyxNQUFNO0NBQ1QsSUFBSSxLQUFLLEdBQUdDLHFCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDM0IsSUFBSSxJQUFJLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLFlBQVksQ0FBQztDQUNuRSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDOUIsSUFBSSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsT0FBTyxZQUFZLENBQUM7Q0FDN0MsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztDQUN0QixHQUFHO0NBQ0gsQ0FBQyxDQUFDO0NBRUYsSUFBSSxTQUFTLEdBQUcsVUFBVSxLQUFLLEVBQUU7Q0FDakMsRUFBRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQy9CLEVBQUUsSUFBSSxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7Q0FDN0QsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO0NBQ3JELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLEdBQUc7Q0FDSCxFQUFFLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQzdCLEVBQUUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ3BDLEVBQUUsT0FBTyxHQUFHLEVBQUUsQ0FBQztDQUNmLEVBQUUsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDaEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ2pDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNmLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtDQUNsRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDNUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM1QyxLQUFLO0NBQ0wsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7Q0FDckIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQ2pCLEtBQUssTUFBTTtDQUNYLE1BQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNqRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3JDLEtBQUs7Q0FDTCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekIsR0FBRztDQUNILEVBQUUsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDaEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzVCLElBQUksSUFBSSxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtDQUNsQyxNQUFNLElBQUksTUFBTSxJQUFJRCxLQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQztDQUMzRCxLQUFLLE1BQU0sSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ3pDLEdBQUc7Q0FDSCxFQUFFLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDdkIsRUFBRSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDbkQsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHQSxLQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztDQUNqRCxHQUFHO0NBQ0gsRUFBRSxPQUFPLElBQUksQ0FBQztDQUNkLENBQUMsQ0FBQztDQUdGLElBQUksU0FBUyxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ2pDLEVBQUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDekMsRUFBRSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7Q0FDckIsRUFBRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7Q0FDdEIsRUFBRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Q0FDbEIsRUFBRSxJQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztDQUVqRSxFQUFFLElBQUksSUFBSSxHQUFHLFlBQVk7Q0FDekIsSUFBSSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDakMsR0FBRyxDQUFDO0NBRUosRUFBRSxJQUFJLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtDQUNyQixJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTztDQUN2QyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUM7Q0FDakIsSUFBSSxVQUFVLEVBQUUsQ0FBQztDQUNqQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUM7Q0FDMUIsR0FBRztDQUNILEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRTtDQUNqQixJQUFJLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRSxPQUFPO0NBQ2hDLElBQUksSUFBSSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUU7Q0FDdkIsTUFBTSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUUsT0FBTztDQUNwQyxNQUFNLE9BQU8sRUFBRSxDQUFDO0NBQ2hCLE1BQU0sVUFBVSxFQUFFLENBQUM7Q0FDbkIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0NBQzVCLE1BQU0sU0FBUztDQUNmLEtBQUs7Q0FDTCxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZCLElBQUksT0FBTyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtDQUMzQyxNQUFNLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNoRCxNQUFNLE9BQU8sRUFBRSxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxFQUFFLENBQUM7Q0FDZixLQUFLO0NBQ0wsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtDQUN2QixNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRSxPQUFPO0NBQzlCLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQztDQUN4QixNQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxPQUFPO0NBQ2pDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztDQUN0QixNQUFNLE9BQU8sSUFBSSxFQUFFLEVBQUU7Q0FDckIsUUFBUSxTQUFTLEdBQUcsSUFBSSxDQUFDO0NBQ3pCLFFBQVEsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO0NBQzdCLFVBQVUsSUFBSSxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUMxRCxlQUFlLE9BQU87Q0FDdEIsU0FBUztDQUNULFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPO0NBQ3hDLFFBQVEsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7Q0FDbkMsVUFBVSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3hDLFVBQVUsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFLFNBQVMsR0FBRyxNQUFNLENBQUM7Q0FDckQsZUFBZSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsT0FBTztDQUMxQyxlQUFlLFNBQVMsR0FBRyxTQUFTLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztDQUNuRCxVQUFVLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRSxPQUFPO0NBQ3RDLFVBQVUsT0FBTyxFQUFFLENBQUM7Q0FDcEIsU0FBUztDQUNULFFBQVEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO0NBQ3BFLFFBQVEsV0FBVyxFQUFFLENBQUM7Q0FDdEIsUUFBUSxJQUFJLFdBQVcsSUFBSSxDQUFDLElBQUksV0FBVyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQztDQUMvRCxPQUFPO0NBQ1AsTUFBTSxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUUsT0FBTztDQUNuQyxNQUFNLE1BQU07Q0FDWixLQUFLLE1BQU0sSUFBSSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUU7Q0FDOUIsTUFBTSxPQUFPLEVBQUUsQ0FBQztDQUNoQixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPO0NBQzFCLEtBQUssTUFBTSxJQUFJLElBQUksRUFBRSxFQUFFLE9BQU87Q0FDOUIsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDbEMsR0FBRztDQUNILEVBQUUsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO0NBQ3pCLElBQUksS0FBSyxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUM7Q0FDbEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0NBQ25CLElBQUksT0FBTyxVQUFVLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Q0FDekMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ2pDLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDNUQsTUFBTSxPQUFPLENBQUMsUUFBUSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ3pDLEtBQUs7Q0FDTCxHQUFHLE1BQU0sSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFLE9BQU87Q0FDckMsRUFBRSxPQUFPLE9BQU8sQ0FBQztDQUNqQixDQUFDLENBQUM7Q0FFRixJQUFJLHVCQUF1QixHQUFHLFVBQVUsSUFBSSxFQUFFO0NBQzlDLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0NBQ3RCLEVBQUUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0NBQ3BCLEVBQUUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO0NBQ3ZCLEVBQUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0NBQ3JCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLEVBQUUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQzdCLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQzNCLE1BQU0sSUFBSSxVQUFVLEdBQUcsU0FBUyxFQUFFO0NBQ2xDLFFBQVEsUUFBUSxHQUFHLFNBQVMsQ0FBQztDQUM3QixRQUFRLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FDL0IsT0FBTztDQUNQLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQztDQUN2QixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7Q0FDckIsS0FBSyxNQUFNO0NBQ1gsTUFBTSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztDQUNoRCxNQUFNLEVBQUUsVUFBVSxDQUFDO0NBQ25CLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxJQUFJLFVBQVUsR0FBRyxTQUFTLEVBQUU7Q0FDOUIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO0NBQ3pCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQztDQUMzQixHQUFHO0NBQ0gsRUFBRSxPQUFPLFFBQVEsQ0FBQztDQUNsQixDQUFDLENBQUM7Q0FFRixJQUFJLGFBQWEsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNwQyxFQUFFLElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO0NBRXZDLEVBQUUsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7Q0FDL0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDeEMsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztDQUNqQyxNQUFNLElBQUksR0FBRzVDLE9BQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7Q0FDL0IsS0FBSyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUU5QixHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7Q0FDdEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLElBQUksUUFBUSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzdDLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDeEMsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVM7Q0FDakQsTUFBTSxJQUFJLE9BQU8sRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDO0NBQ25DLE1BQU0sSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO0NBQzlCLFFBQVEsTUFBTSxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0NBQ3JDLFFBQVEsT0FBTyxHQUFHLElBQUksQ0FBQztDQUN2QixPQUFPLE1BQU07Q0FDYixRQUFRLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzNDLFFBQVEsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7Q0FDckMsT0FBTztDQUNQLEtBQUs7Q0FDTCxJQUFJLE9BQU8sR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7Q0FDOUIsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLENBQUMsQ0FBQztDQUVGLElBQUkseUJBQXlCLEdBQUcsRUFBRSxDQUFDO0NBQ25DLElBQUksd0JBQXdCLEdBQUc4QyxZQUFNLENBQUMsRUFBRSxFQUFFLHlCQUF5QixFQUFFO0NBQ3JFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUN4QyxDQUFDLENBQUMsQ0FBQztDQUNILElBQUksb0JBQW9CLEdBQUdBLFlBQU0sQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLEVBQUU7Q0FDaEUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUNoQyxDQUFDLENBQUMsQ0FBQztDQUNILElBQUksd0JBQXdCLEdBQUdBLFlBQU0sQ0FBQyxFQUFFLEVBQUUsb0JBQW9CLEVBQUU7Q0FDaEUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUNqRixDQUFDLENBQUMsQ0FBQztDQUVILElBQUksYUFBYSxHQUFHLFVBQVUsSUFBSSxFQUFFLEdBQUcsRUFBRTtDQUN6QyxFQUFFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDN0IsRUFBRSxPQUFPLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3pGLENBQUMsQ0FBQztDQUVGLElBQUksY0FBYyxHQUFHO0NBQ3JCLEVBQUUsR0FBRyxFQUFFLEVBQUU7Q0FDVCxFQUFFLElBQUksRUFBRSxJQUFJO0NBQ1osRUFBRSxJQUFJLEVBQUUsRUFBRTtDQUNWLEVBQUUsS0FBSyxFQUFFLEdBQUc7Q0FDWixFQUFFLEVBQUUsRUFBRSxFQUFFO0NBQ1IsRUFBRSxHQUFHLEVBQUUsR0FBRztDQUNWLENBQUMsQ0FBQztDQUVGLElBQUksU0FBUyxHQUFHLFVBQVUsR0FBRyxFQUFFO0NBQy9CLEVBQUUsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN6QyxDQUFDLENBQUM7Q0FFRixJQUFJLG1CQUFtQixHQUFHLFVBQVUsR0FBRyxFQUFFO0NBQ3pDLEVBQUUsT0FBTyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztDQUNsRCxDQUFDLENBQUM7Q0FFRixJQUFJLDhCQUE4QixHQUFHLFVBQVUsR0FBRyxFQUFFO0NBQ3BELEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLGdCQUFnQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO0NBQ25FLENBQUMsQ0FBQztDQUVGLElBQUksb0JBQW9CLEdBQUcsVUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFO0NBQ3pELEVBQUUsSUFBSSxNQUFNLENBQUM7Q0FDYixFQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDOUUsQ0FBQyxDQUFDO0NBRUYsSUFBSSw0QkFBNEIsR0FBRyxVQUFVLE1BQU0sRUFBRTtDQUNyRCxFQUFFLElBQUksS0FBSyxDQUFDO0NBQ1osRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3RFLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDO0NBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUM7Q0FDNUYsR0FBRyxDQUFDO0NBQ0osQ0FBQyxDQUFDO0NBRUYsSUFBSSxlQUFlLEdBQUcsVUFBVSxHQUFHLEVBQUU7Q0FDckMsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQ3RCLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUM3QixFQUFFLElBQUksUUFBUSxLQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTtDQUNuRyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNmLEdBQUc7Q0FDSCxDQUFDLENBQUM7Q0FFRixJQUFJLFdBQVcsR0FBRyxVQUFVLE9BQU8sRUFBRTtDQUNyQyxFQUFFLE9BQU8sT0FBTyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxDQUFDO0NBQzVELENBQUMsQ0FBQztDQUVGLElBQUksV0FBVyxHQUFHLFVBQVUsT0FBTyxFQUFFO0NBQ3JDLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztDQUNsQyxFQUFFLE9BQU8sT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLElBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQztDQUM5RixDQUFDLENBQUM7Q0FHRixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7Q0FDdEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztDQUNuQixJQUFJLDZCQUE2QixHQUFHLEVBQUUsQ0FBQztDQUN2QyxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztDQUMzQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDbEIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0NBQ3hCLElBQUkseUJBQXlCLEdBQUcsRUFBRSxDQUFDO0NBQ25DLElBQUksZ0NBQWdDLEdBQUcsRUFBRSxDQUFDO0NBQzFDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztDQUNuQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDZCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDbEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0NBQ3BCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztDQUNuQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Q0FDcEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2QsSUFBSSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7Q0FDbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ2YsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBR2xCLElBQUksUUFBUSxHQUFHLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFO0NBQzFELEVBQUUsSUFBSSxLQUFLLEdBQUcsYUFBYSxJQUFJLFlBQVksQ0FBQztDQUM1QyxFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztDQUNsQixFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztDQUNyQixFQUFFLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztDQUMxQixFQUFFLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0NBQ2hDLEVBQUUsSUFBSSxVQUFVLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sQ0FBQztDQUVsRCxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Q0FDdEIsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNwQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLElBQUksR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNwQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDbEIsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztDQUNyQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0NBQ3hCLElBQUksR0FBRyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3hFLEdBQUc7Q0FFSCxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBRTlDLEVBQUUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUVoQyxFQUFFLE9BQU8sT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Q0FDdkMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQy9CLElBQUksUUFBUSxLQUFLO0NBQ2pCLE1BQU0sS0FBSyxZQUFZO0NBQ3ZCLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtDQUN0QyxVQUFVLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Q0FDdkMsVUFBVSxLQUFLLEdBQUcsTUFBTSxDQUFDO0NBQ3pCLFNBQVMsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFO0NBQ25DLFVBQVUsS0FBSyxHQUFHLFNBQVMsQ0FBQztDQUM1QixVQUFVLFNBQVM7Q0FDbkIsU0FBUyxNQUFNLE9BQU8sY0FBYyxDQUFDO0NBQ3JDLFFBQVEsTUFBTTtDQUVkLE1BQU0sS0FBSyxNQUFNO0NBQ2pCLFFBQVEsSUFBSSxJQUFJLEtBQUssWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0NBQzVGLFVBQVUsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztDQUN2QyxTQUFTLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ2hDLFVBQVUsSUFBSSxhQUFhO0NBQzNCLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7Q0FDMUQsYUFBYSxNQUFNLElBQUksTUFBTSxLQUFLLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7Q0FDakYsYUFBYSxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Q0FDL0MsV0FBVyxFQUFFLE9BQU87Q0FDcEIsVUFBVSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUM5QixVQUFVLElBQUksYUFBYSxFQUFFO0NBQzdCLFlBQVksSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzFGLFlBQVksT0FBTztDQUNuQixXQUFXO0NBQ1gsVUFBVSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLFVBQVUsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtDQUNwQyxZQUFZLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDekIsV0FBVyxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Q0FDMUUsWUFBWSxLQUFLLEdBQUcsNkJBQTZCLENBQUM7Q0FDbEQsV0FBVyxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQ3JDLFlBQVksS0FBSyxHQUFHLHlCQUF5QixDQUFDO0NBQzlDLFdBQVcsTUFBTSxJQUFJLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO0NBQ3JELFlBQVksS0FBSyxHQUFHLGlCQUFpQixDQUFDO0NBQ3RDLFlBQVksT0FBTyxFQUFFLENBQUM7Q0FDdEIsV0FBVyxNQUFNO0NBQ2pCLFlBQVksR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztDQUN4QyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzlCLFlBQVksS0FBSyxHQUFHLHlCQUF5QixDQUFDO0NBQzlDLFdBQVc7Q0FDWCxTQUFTLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRTtDQUNuQyxVQUFVLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDdEIsVUFBVSxLQUFLLEdBQUcsU0FBUyxDQUFDO0NBQzVCLFVBQVUsT0FBTyxHQUFHLENBQUMsQ0FBQztDQUN0QixVQUFVLFNBQVM7Q0FDbkIsU0FBUyxNQUFNLE9BQU8sY0FBYyxDQUFDO0NBQ3JDLFFBQVEsTUFBTTtDQUVkLE1BQU0sS0FBSyxTQUFTO0NBQ3BCLFFBQVEsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLE9BQU8sY0FBYyxDQUFDO0NBQ25GLFFBQVEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUNsRCxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUNuQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUN2QyxVQUFVLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztDQUNqQyxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBQzVCLFVBQVUsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztDQUN0QyxVQUFVLEtBQUssR0FBRyxRQUFRLENBQUM7Q0FDM0IsVUFBVSxNQUFNO0NBQ2hCLFNBQVM7Q0FDVCxRQUFRLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO0NBQ3hELFFBQVEsU0FBUztDQUVqQixNQUFNLEtBQUssNkJBQTZCO0NBQ3hDLFFBQVEsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO0NBQzNELFVBQVUsS0FBSyxHQUFHLGdDQUFnQyxDQUFDO0NBQ25ELFVBQVUsT0FBTyxFQUFFLENBQUM7Q0FDcEIsU0FBUyxNQUFNO0NBQ2YsVUFBVSxLQUFLLEdBQUcsUUFBUSxDQUFDO0NBQzNCLFVBQVUsU0FBUztDQUNuQixTQUFTLENBQUMsTUFBTTtDQUVoQixNQUFNLEtBQUssaUJBQWlCO0NBQzVCLFFBQVEsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ3pCLFVBQVUsS0FBSyxHQUFHLFNBQVMsQ0FBQztDQUM1QixVQUFVLE1BQU07Q0FDaEIsU0FBUyxNQUFNO0NBQ2YsVUFBVSxLQUFLLEdBQUcsSUFBSSxDQUFDO0NBQ3ZCLFVBQVUsU0FBUztDQUNuQixTQUFTO0NBRVQsTUFBTSxLQUFLLFFBQVE7Q0FDbkIsUUFBUSxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Q0FDakMsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDekIsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDakMsU0FBUyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0NBQ3BFLFVBQVUsS0FBSyxHQUFHLGNBQWMsQ0FBQztDQUNqQyxTQUFTLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ2hDLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0NBQ3ZDLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0NBQ3ZDLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0NBQy9CLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0NBQy9CLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3ZDLFVBQVUsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Q0FDekIsVUFBVSxLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQ3hCLFNBQVMsTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDaEMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDakMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUM1QixVQUFVLEtBQUssR0FBRyxRQUFRLENBQUM7Q0FDM0IsU0FBUyxNQUFNO0NBQ2YsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLFVBQVUsS0FBSyxHQUFHLElBQUksQ0FBQztDQUN2QixVQUFVLFNBQVM7Q0FDbkIsU0FBUyxDQUFDLE1BQU07Q0FFaEIsTUFBTSxLQUFLLGNBQWM7Q0FDekIsUUFBUSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtDQUM3RCxVQUFVLEtBQUssR0FBRyxnQ0FBZ0MsQ0FBQztDQUNuRCxTQUFTLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ2hDLFVBQVUsS0FBSyxHQUFHLFNBQVMsQ0FBQztDQUM1QixTQUFTLE1BQU07Q0FDZixVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztDQUN2QyxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztDQUN2QyxVQUFVLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUMvQixVQUFVLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUMvQixVQUFVLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDdkIsVUFBVSxTQUFTO0NBQ25CLFNBQVMsQ0FBQyxNQUFNO0NBRWhCLE1BQU0sS0FBSyx5QkFBeUI7Q0FDcEMsUUFBUSxLQUFLLEdBQUcsZ0NBQWdDLENBQUM7Q0FDakQsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLFNBQVM7Q0FDdkUsUUFBUSxPQUFPLEVBQUUsQ0FBQztDQUNsQixRQUFRLE1BQU07Q0FFZCxNQUFNLEtBQUssZ0NBQWdDO0NBQzNDLFFBQVEsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7Q0FDekMsVUFBVSxLQUFLLEdBQUcsU0FBUyxDQUFDO0NBQzVCLFVBQVUsU0FBUztDQUNuQixTQUFTLENBQUMsTUFBTTtDQUVoQixNQUFNLEtBQUssU0FBUztDQUNwQixRQUFRLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUN6QixVQUFVLElBQUksTUFBTSxFQUFFLE1BQU0sR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO0NBQzlDLFVBQVUsTUFBTSxHQUFHLElBQUksQ0FBQztDQUN4QixVQUFVLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMvQyxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDNUQsWUFBWSxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNoRCxZQUFZLElBQUksU0FBUyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO0NBQ3hELGNBQWMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0NBQ3ZDLGNBQWMsU0FBUztDQUN2QixhQUFhO0NBQ2IsWUFBWSxJQUFJLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztDQUN2RixZQUFZLElBQUksaUJBQWlCLEVBQUUsR0FBRyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQztDQUNyRSxpQkFBaUIsR0FBRyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQztDQUNuRCxXQUFXO0NBQ1gsVUFBVSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLFNBQVMsTUFBTTtDQUNmLFVBQVUsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7Q0FDbEUsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQyxVQUFVO0NBQ1YsVUFBVSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFLE9BQU8saUJBQWlCLENBQUM7Q0FDL0QsVUFBVSxPQUFPLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDbEQsVUFBVSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLFVBQVUsS0FBSyxHQUFHLElBQUksQ0FBQztDQUN2QixTQUFTLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQztDQUM5QixRQUFRLE1BQU07Q0FFZCxNQUFNLEtBQUssSUFBSSxDQUFDO0NBQ2hCLE1BQU0sS0FBSyxRQUFRO0NBQ25CLFFBQVEsSUFBSSxhQUFhLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7Q0FDbkQsVUFBVSxLQUFLLEdBQUcsU0FBUyxDQUFDO0NBQzVCLFVBQVUsU0FBUztDQUNuQixTQUFTLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO0NBQ2hELFVBQVUsSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFLE9BQU8sWUFBWSxDQUFDO0NBQ2hELFVBQVUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDM0MsVUFBVSxJQUFJLE9BQU8sRUFBRSxPQUFPLE9BQU8sQ0FBQztDQUN0QyxVQUFVLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDdEIsVUFBVSxLQUFLLEdBQUcsSUFBSSxDQUFDO0NBQ3ZCLFVBQVUsSUFBSSxhQUFhLElBQUksUUFBUSxFQUFFLE9BQU87Q0FDaEQsU0FBUyxNQUFNO0NBQ2YsVUFBVSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztDQUNsRSxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzFDLFVBQVU7Q0FDVixVQUFVLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sSUFBSSxFQUFFLEVBQUUsT0FBTyxZQUFZLENBQUM7Q0FDbEUsVUFBVSxJQUFJLGFBQWEsSUFBSSxNQUFNLElBQUksRUFBRSxLQUFLLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsT0FBTztDQUN2RyxVQUFVLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQzNDLFVBQVUsSUFBSSxPQUFPLEVBQUUsT0FBTyxPQUFPLENBQUM7Q0FDdEMsVUFBVSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLFVBQVUsS0FBSyxHQUFHLFVBQVUsQ0FBQztDQUM3QixVQUFVLElBQUksYUFBYSxFQUFFLE9BQU87Q0FDcEMsVUFBVSxTQUFTO0NBQ25CLFNBQVMsTUFBTTtDQUNmLFVBQVUsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUM7Q0FDOUMsZUFBZSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQztDQUNwRCxVQUFVLE1BQU0sSUFBSSxJQUFJLENBQUM7Q0FDekIsU0FBUyxDQUFDLE1BQU07Q0FFaEIsTUFBTSxLQUFLLElBQUk7Q0FDZixRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtDQUM5QixVQUFVLE1BQU0sSUFBSSxJQUFJLENBQUM7Q0FDekIsU0FBUyxNQUFNO0NBQ2YsVUFBVSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztDQUNsRSxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzFDLFVBQVUsYUFBYTtDQUN2QixVQUFVO0NBQ1YsVUFBVSxJQUFJLE1BQU0sSUFBSSxFQUFFLEVBQUU7Q0FDNUIsWUFBWSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQzVDLFlBQVksSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLE9BQU8sWUFBWSxDQUFDO0NBQ25ELFlBQVksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzdGLFlBQVksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUN4QixXQUFXO0NBQ1gsVUFBVSxJQUFJLGFBQWEsRUFBRSxPQUFPO0NBQ3BDLFVBQVUsS0FBSyxHQUFHLFVBQVUsQ0FBQztDQUM3QixVQUFVLFNBQVM7Q0FDbkIsU0FBUyxNQUFNLE9BQU8sWUFBWSxDQUFDO0NBQ25DLFFBQVEsTUFBTTtDQUVkLE1BQU0sS0FBSyxJQUFJO0NBQ2YsUUFBUSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUM1QixRQUFRLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLEtBQUssR0FBRyxVQUFVLENBQUM7Q0FDNUQsYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtDQUNoRCxVQUFVLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUMzQixZQUFZLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUNqQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUN6QyxZQUFZLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztDQUNuQyxXQUFXLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ2xDLFlBQVksR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0NBQ2pDLFlBQVksR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3pDLFlBQVksR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Q0FDM0IsWUFBWSxLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQzFCLFdBQVcsTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDbEMsWUFBWSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDakMsWUFBWSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDekMsWUFBWSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDbkMsWUFBWSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUM5QixZQUFZLEtBQUssR0FBRyxRQUFRLENBQUM7Q0FDN0IsV0FBVyxNQUFNO0NBQ2pCLFlBQVksSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Q0FDbkYsY0FBYyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDbkMsY0FBYyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDM0MsY0FBYyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbkMsYUFBYTtDQUNiLFlBQVksS0FBSyxHQUFHLElBQUksQ0FBQztDQUN6QixZQUFZLFNBQVM7Q0FDckIsV0FBVztDQUNYLFNBQVMsTUFBTTtDQUNmLFVBQVUsS0FBSyxHQUFHLElBQUksQ0FBQztDQUN2QixVQUFVLFNBQVM7Q0FDbkIsU0FBUyxDQUFDLE1BQU07Q0FFaEIsTUFBTSxLQUFLLFVBQVU7Q0FDckIsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtDQUN6QyxVQUFVLEtBQUssR0FBRyxTQUFTLENBQUM7Q0FDNUIsVUFBVSxNQUFNO0NBQ2hCLFNBQVM7Q0FDVCxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtDQUNoSCxVQUFVLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDcEYsZUFBZSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDcEMsU0FBUztDQUNULFFBQVEsS0FBSyxHQUFHLElBQUksQ0FBQztDQUNyQixRQUFRLFNBQVM7Q0FFakIsTUFBTSxLQUFLLFNBQVM7Q0FDcEIsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUN0RixVQUFVLElBQUksQ0FBQyxhQUFhLElBQUksb0JBQW9CLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDOUQsWUFBWSxLQUFLLEdBQUcsSUFBSSxDQUFDO0NBQ3pCLFdBQVcsTUFBTSxJQUFJLE1BQU0sSUFBSSxFQUFFLEVBQUU7Q0FDbkMsWUFBWSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUMxQixZQUFZLElBQUksYUFBYSxFQUFFLE9BQU87Q0FDdEMsWUFBWSxLQUFLLEdBQUcsVUFBVSxDQUFDO0NBQy9CLFdBQVcsTUFBTTtDQUNqQixZQUFZLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQzdDLFlBQVksSUFBSSxPQUFPLEVBQUUsT0FBTyxPQUFPLENBQUM7Q0FDeEMsWUFBWSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ3ZELFlBQVksSUFBSSxhQUFhLEVBQUUsT0FBTztDQUN0QyxZQUFZLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDeEIsWUFBWSxLQUFLLEdBQUcsVUFBVSxDQUFDO0NBQy9CLFdBQVcsQ0FBQyxTQUFTO0NBQ3JCLFNBQVMsTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDO0NBQzlCLFFBQVEsTUFBTTtDQUVkLE1BQU0sS0FBSyxVQUFVO0NBQ3JCLFFBQVEsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDNUIsVUFBVSxLQUFLLEdBQUcsSUFBSSxDQUFDO0NBQ3ZCLFVBQVUsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsU0FBUztDQUNwRCxTQUFTLE1BQU0sSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ2xELFVBQVUsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Q0FDekIsVUFBVSxLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQ3hCLFNBQVMsTUFBTSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDbEQsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUM1QixVQUFVLEtBQUssR0FBRyxRQUFRLENBQUM7Q0FDM0IsU0FBUyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUNoQyxVQUFVLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDdkIsVUFBVSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsU0FBUztDQUNwQyxTQUFTLENBQUMsTUFBTTtDQUVoQixNQUFNLEtBQUssSUFBSTtDQUNmLFFBQVE7Q0FDUixVQUFVLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7Q0FDcEMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQyxXQUFXLENBQUMsYUFBYSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQzFELFVBQVU7Q0FDVixVQUFVLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0NBQ25DLFlBQVksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2pDLFlBQVksSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtDQUNsRSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2hDLGFBQWE7Q0FDYixXQUFXLE1BQU0sSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDMUMsWUFBWSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0NBQ2xFLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDaEMsYUFBYTtDQUNiLFdBQVcsTUFBTTtDQUNqQixZQUFZLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUMxRixjQUFjLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUMxQyxjQUFjLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUM5QyxhQUFhO0NBQ2IsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNsQyxXQUFXO0NBQ1gsVUFBVSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLFVBQVUsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0NBQ25GLFlBQVksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Q0FDOUQsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQy9CLGFBQWE7Q0FDYixXQUFXO0NBQ1gsVUFBVSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDM0IsWUFBWSxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUMzQixZQUFZLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDMUIsV0FBVyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUNsQyxZQUFZLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBQzlCLFlBQVksS0FBSyxHQUFHLFFBQVEsQ0FBQztDQUM3QixXQUFXO0NBQ1gsU0FBUyxNQUFNO0NBQ2YsVUFBVSxNQUFNLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0NBQzlELFNBQVMsQ0FBQyxNQUFNO0NBRWhCLE1BQU0sS0FBSyx5QkFBeUI7Q0FDcEMsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDekIsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUN6QixVQUFVLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDeEIsU0FBUyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUNoQyxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBQzVCLFVBQVUsS0FBSyxHQUFHLFFBQVEsQ0FBQztDQUMzQixTQUFTLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO0NBQ2hDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUM7Q0FDeEUsU0FBUyxDQUFDLE1BQU07Q0FFaEIsTUFBTSxLQUFLLEtBQUs7Q0FDaEIsUUFBUSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Q0FDM0MsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUM1QixVQUFVLEtBQUssR0FBRyxRQUFRLENBQUM7Q0FDM0IsU0FBUyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUNoQyxVQUFVLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7Q0FDaEUsZUFBZSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7Q0FDbkQsZUFBZSxHQUFHLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQztDQUMzRSxTQUFTLENBQUMsTUFBTTtDQUVoQixNQUFNLEtBQUssUUFBUTtDQUNuQixRQUFRLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztDQUN2RixRQUFRLE1BQU07Q0FDZCxLQUFLO0NBRUwsSUFBSSxPQUFPLEVBQUUsQ0FBQztDQUNkLEdBQUc7Q0FDSCxDQUFDLENBQUM7Q0FJRixJQUFJLGNBQWMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQWU7Q0FDcEQsRUFBRSxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNyRCxFQUFFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDN0QsRUFBRSxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDOUIsRUFBRSxJQUFJLEtBQUssR0FBR2xOLGtCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxTQUFTLEVBQUUsT0FBTyxDQUFDO0NBQ3pCLEVBQUUsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0NBQzFCLElBQUksSUFBSSxJQUFJLFlBQVksY0FBYyxFQUFFLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM5RSxTQUFTO0NBQ1QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDdkQsTUFBTSxJQUFJLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUM1QyxLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztDQUN4RCxFQUFFLElBQUksT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3hDLEVBQUUsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJOE0saUJBQWUsRUFBRSxDQUFDO0NBQ2hFLEVBQUUsSUFBSSxpQkFBaUIsR0FBRyw0QkFBNEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztDQUNyRSxFQUFFLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNwRCxFQUFFLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxZQUFZO0NBQzVDLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDO0NBQy9DLEdBQUcsQ0FBQztDQUNKLEVBQUUsSUFBSSxDQUFDcFEsV0FBVyxFQUFFO0NBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ25ELElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ25DLEdBQUc7Q0FDSCxDQUFDLENBQUM7Q0FFRixJQUFJLFlBQVksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBRTVDLElBQUksWUFBWSxHQUFHLFlBQVk7Q0FDL0IsRUFBRSxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0QyxFQUFFLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Q0FDMUIsRUFBRSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0NBQzlCLEVBQUUsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztDQUM5QixFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Q0FDdEIsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQ3RCLEVBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztDQUN0QixFQUFFLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Q0FDeEIsRUFBRSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0NBQzlCLEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztDQUM1QixFQUFFLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtDQUNyQixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUM7Q0FDbkIsSUFBSSxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQ2xDLE1BQU0sTUFBTSxJQUFJLFFBQVEsSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDbEUsS0FBSztDQUNMLElBQUksTUFBTSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsQyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztDQUM1QyxHQUFHLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUM7Q0FDOUMsRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNyRixFQUFFLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxNQUFNLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztDQUM1QyxFQUFFLElBQUksUUFBUSxLQUFLLElBQUksRUFBRSxNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztDQUNsRCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUMsQ0FBQztDQUVGLElBQUksU0FBUyxHQUFHLFlBQVk7Q0FDNUIsRUFBRSxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0QyxFQUFFLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Q0FDMUIsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQ3RCLEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFLElBQUk7Q0FDNUIsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Q0FDMUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ2xCLElBQUksT0FBTyxNQUFNLENBQUM7Q0FDbEIsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ3pELEVBQUUsT0FBTyxNQUFNLEdBQUcsS0FBSyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3RGLENBQUMsQ0FBQztDQUVGLElBQUksV0FBVyxHQUFHLFlBQVk7Q0FDOUIsRUFBRSxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7Q0FDaEQsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsWUFBWTtDQUM5QixFQUFFLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO0NBQzVDLENBQUMsQ0FBQztDQUVGLElBQUksV0FBVyxHQUFHLFlBQVk7Q0FDOUIsRUFBRSxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztDQUM1QyxDQUFDLENBQUM7Q0FFRixJQUFJLE9BQU8sR0FBRyxZQUFZO0NBQzFCLEVBQUUsSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdEMsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQ3RCLEVBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztDQUN0QixFQUFFLE9BQU8sSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFO0NBQzNCLE1BQU0sSUFBSSxLQUFLLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO0NBQ3pDLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7Q0FDdkMsQ0FBQyxDQUFDO0NBRUYsSUFBSSxXQUFXLEdBQUcsWUFBWTtDQUM5QixFQUFFLElBQUksSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztDQUM1QyxFQUFFLE9BQU8sSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xELENBQUMsQ0FBQztDQUVGLElBQUksT0FBTyxHQUFHLFlBQVk7Q0FDMUIsRUFBRSxJQUFJLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7Q0FDNUMsRUFBRSxPQUFPLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzQyxDQUFDLENBQUM7Q0FFRixJQUFJLFdBQVcsR0FBRyxZQUFZO0NBQzlCLEVBQUUsSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDdEMsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQ3RCLEVBQUUsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ2xGLENBQUMsQ0FBQztDQUVGLElBQUksU0FBUyxHQUFHLFlBQVk7Q0FDNUIsRUFBRSxJQUFJLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7Q0FDOUMsRUFBRSxPQUFPLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNsQyxDQUFDLENBQUM7Q0FFRixJQUFJLGVBQWUsR0FBRyxZQUFZO0NBQ2xDLEVBQUUsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7Q0FDaEQsQ0FBQyxDQUFDO0NBRUYsSUFBSSxPQUFPLEdBQUcsWUFBWTtDQUMxQixFQUFFLElBQUksUUFBUSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztDQUNwRCxFQUFFLE9BQU8sUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBQ3hDLENBQUMsQ0FBQztDQUVGLElBQUksa0JBQWtCLEdBQUcsVUFBVSxNQUFNLEVBQUUsTUFBTSxFQUFFO0NBQ25ELEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUM1RSxDQUFDLENBQUM7Q0FFRixJQUFJQSxXQUFXLEVBQUU7Q0FDakIsRUFBRXNCLHNCQUFnQixDQUFDLFlBQVksRUFBRTtDQUdqQyxJQUFJLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxJQUFJLEVBQUU7Q0FDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMxQyxNQUFNLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNuQyxNQUFNLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDN0MsTUFBTSxJQUFJLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUM1QyxNQUFNLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDbkYsS0FBSyxDQUFDO0NBR04sSUFBSSxNQUFNLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDO0NBR3pDLElBQUksUUFBUSxFQUFFLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxVQUFVLFFBQVEsRUFBRTtDQUNsRSxNQUFNLElBQUksR0FBRyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFDLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQzFELEtBQUssQ0FBQztDQUdOLElBQUksUUFBUSxFQUFFLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxVQUFVLFFBQVEsRUFBRTtDQUNsRSxNQUFNLElBQUksR0FBRyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFDLE1BQU0sSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0NBQ25ELE1BQU0sSUFBSSw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPO0NBQ3RELE1BQU0sR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDeEIsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtDQUNsRCxRQUFRLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0NBQy9FLE9BQU87Q0FDUCxLQUFLLENBQUM7Q0FHTixJQUFJLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxRQUFRLEVBQUU7Q0FDbEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMxQyxNQUFNLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztDQUNuRCxNQUFNLElBQUksOEJBQThCLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTztDQUN0RCxNQUFNLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0NBQ3hCLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDbEQsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztDQUMvRSxPQUFPO0NBQ1AsS0FBSyxDQUFDO0NBR04sSUFBSSxJQUFJLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFO0NBQ3RELE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPO0NBQ3ZDLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDeEMsS0FBSyxDQUFDO0NBR04sSUFBSSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFVBQVUsUUFBUSxFQUFFO0NBQ2xFLE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPO0NBQ3ZDLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDaEQsS0FBSyxDQUFDO0NBR04sSUFBSSxJQUFJLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFO0NBQ3RELE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUMsTUFBTSxJQUFJLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU87Q0FDdEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFCLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3RDLFdBQVcsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDckMsS0FBSyxDQUFDO0NBR04sSUFBSSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFVBQVUsUUFBUSxFQUFFO0NBQ2xFLE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPO0NBQ3ZDLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDcEIsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDL0MsS0FBSyxDQUFDO0NBR04sSUFBSSxNQUFNLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsTUFBTSxFQUFFO0NBQzVELE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzlCLE1BQU0sSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFO0NBQ3hCLFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Q0FDekIsT0FBTyxNQUFNO0NBQ2IsUUFBUSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzlELFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Q0FDdkIsUUFBUSxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNyQyxPQUFPO0NBQ1AsTUFBTSw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ25GLEtBQUssQ0FBQztDQUdOLElBQUksWUFBWSxFQUFFLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztDQUdyRCxJQUFJLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUU7Q0FDdEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMxQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUIsTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7Q0FDdEIsUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztDQUM1QixRQUFRLE9BQU87Q0FDZixPQUFPO0NBQ1AsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RELE1BQU0sR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDeEIsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNwQyxLQUFLLENBQUM7Q0FDTixHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7Q0FJRCxRQUFRLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxTQUFTLE1BQU0sR0FBRztDQUNuRCxFQUFFLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNqQyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUl6QixRQUFRLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLFFBQVEsR0FBRztDQUN2RCxFQUFFLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNqQyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUV6QixJQUFJLFNBQVMsRUFBRTtDQUNmLEVBQUUsSUFBSSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDO0NBQ3hELEVBQUUsSUFBSSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDO0NBSXhELEVBQUUsSUFBSSxxQkFBcUIsRUFBRSxRQUFRLENBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsZUFBZSxDQUFDLElBQUksRUFBRTtDQUN4RyxJQUFJLE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUM3RCxHQUFHLENBQUMsQ0FBQztDQUlMLEVBQUUsSUFBSSxxQkFBcUIsRUFBRSxRQUFRLENBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtDQUN2RyxJQUFJLE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUM3RCxHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7Q0FFRCxjQUFjLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRXRDaUIsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzROLFNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQ25RLFdBQVcsRUFBRSxFQUFFO0NBQ2pFLEVBQUUsR0FBRyxFQUFFLGNBQWM7Q0FDckIsQ0FBQyxDQUFDOztLQzkrQkVKLFFBQU0sQ0FDZSxXQUF0QixTQUFPNlEsVUFBUCxFQUFxQ0EsVUFBdEMsRUFDaUIsV0FBaEIsU0FBT3hLLElBQVAsRUFBK0JBLElBRGhDLEVBRW1CLFdBQWxCLFNBQU9yRyxRQUFQLEVBQWlDQSxTQUVoQzhRLE9BQU8sQ0FBRyxDQUNaQyxZQUFZLENBQUUsb0JBQXFCL1EsUUFEdkIsQ0FFWnNLLFFBQVEsQ0FBRSxXQUFZdEssUUFBWixFQUFzQixhQUFjNEIsTUFGbEMsQ0FHWm9QLElBQUksQ0FDRixlQUFnQmhSLFFBQWhCLEVBQ0EsU0FBVUEsUUFEVixFQUVDLFVBQVcsQ0FDVixHQUFJLENBRUYsV0FESWlSLElBQ0osR0FDRCxDQUFDLE1BQU9DLENBQVAsQ0FBVSxDQUNWLFNBQ0QsQ0FDRixDQVBELEVBTlUsQ0FjWkMsUUFBUSxDQUFFLGFBQWNuUixRQWRaLENBZVpvUixXQUFXLENBQUUsZ0JBQWlCcFIsUUFmbEIsRUFrQmQsU0FBU3FSLFVBQVQsQ0FBb0IxTCxDQUFwQixDQUF5QixDQUN2QixPQUFPQSxDQUFHLEVBQUk2SSxRQUFRLENBQUNoSSxTQUFULENBQW1COEssYUFBbkIsQ0FBaUMzTCxDQUFqQyxDQUNmLENBRUQsR0FBSW1MLE9BQU8sQ0FBQ00sV0FBWixLQUNNRyxXQUFXLENBQUcsQ0FDaEIsb0JBRGdCLENBRWhCLHFCQUZnQixDQUdoQiw0QkFIZ0IsQ0FJaEIscUJBSmdCLENBS2hCLHNCQUxnQixDQU1oQixxQkFOZ0IsQ0FPaEIsc0JBUGdCLENBUWhCLHVCQVJnQixDQVNoQix1QkFUZ0IsQ0FEcEIsQ0FhTUMsaUJBQWlCLENBQ25CcEQsV0FBVyxDQUFDcUQsTUFBWixFQUNBLFNBQVM5TCxDQUFULENBQWMsQ0FDWixPQUFPQSxDQUFHLEVBQStELENBQUMsQ0FBNUQsQ0FBQTRMLFdBQVcsQ0FBQ0csT0FBWixDQUFvQjVMLE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQjdFLFFBQWpCLENBQTBCd0YsSUFBMUIsQ0FBK0J4QixDQUEvQixDQUFwQixDQUNmLENBakJMLENBb0JBLFNBQVNnTSxhQUFULENBQXVCaEcsQ0FBdkIsQ0FBNkIsQ0FJM0IsR0FIb0IsUUFBaEIsU0FBT0EsQ0FHWCxHQUZFQSxDQUVGLE1BQUksNkJBQTZCeEgsSUFBN0IsQ0FBa0N3SCxDQUFsQyxHQUFvRCxFQUFULEdBQUFBLENBQS9DLENBQ0UsVUFBVTdHLFNBQUosQ0FBYyx3Q0FBZCxDQUFOLENBRUYsT0FBTzZHLENBQUksQ0FBQ2lHLFdBQUwsRUFDUixDQUVELFNBQVNDLGNBQVQsQ0FBd0JoTSxDQUF4QixDQUErQixDQUk3QixPQUhxQixRQUFqQixTQUFPQSxDQUdYLEdBRkVBLENBRUYsTUFBT0EsQ0FDUixDQUVEO0NBQ0EsU0FBU2lNLFdBQVQsQ0FBcUJDLENBQXJCLENBQTRCLENBQzFCLElBQUkzSSxDQUFRLENBQUcsQ0FDYkcsSUFBSSxDQUFFLGVBQVcsQ0FDZixJQUFJMUQsQ0FBSyxDQUFHa00sQ0FBSyxDQUFDQyxLQUFOLEVBQVosQ0FDQSxPQUFPLENBQUM3SSxJQUFJLENBQUUsU0FBQXRELENBQVAsQ0FBNEJBLEtBQUssQ0FBRUEsQ0FBbkMsQ0FDUixDQUpZLENBQWYsQ0FhQSxPQU5JaUwsT0FBTyxDQUFDeEcsUUFNWixHQUxFbEIsQ0FBUSxDQUFDeEgsTUFBTSxDQUFDd0gsUUFBUixDQUFSLENBQTRCLFVBQVcsQ0FDckMsT0FBT0EsQ0FDUixDQUdILEVBQU9BLENBQ1IsVUFFZTZJLFNBQVQsQ0FBaUJDLENBQWpCLENBQTBCLENBQy9CLEtBQUtDLEdBQUwsQ0FBVyxFQURvQixDQUczQkQsQ0FBTyxZQUFZRCxTQUhRLENBSTdCQyxDQUFPLENBQUNyUCxPQUFSLENBQWdCLFNBQVNnRCxDQUFULENBQWdCOEYsQ0FBaEIsQ0FBc0IsQ0FDcEMsS0FBS3lHLE1BQUwsQ0FBWXpHLENBQVosQ0FBa0I5RixDQUFsQixFQUNELENBRkQsQ0FFRyxJQUZILENBSjZCLENBT3BCd00sS0FBSyxDQUFDQyxPQUFOLENBQWNKLENBQWQsQ0FQb0IsQ0FRN0JBLENBQU8sQ0FBQ3JQLE9BQVIsQ0FBZ0IsU0FBUzBQLENBQVQsQ0FBaUIsQ0FDL0IsS0FBS0gsTUFBTCxDQUFZRyxDQUFNLENBQUMsQ0FBRCxDQUFsQixDQUF1QkEsQ0FBTSxDQUFDLENBQUQsQ0FBN0IsRUFDRCxDQUZELENBRUcsSUFGSCxDQVI2QixDQVdwQkwsQ0FYb0IsRUFZN0JwTSxNQUFNLENBQUMwTSxtQkFBUCxDQUEyQk4sQ0FBM0IsRUFBb0NyUCxPQUFwQyxDQUE0QyxTQUFTOEksQ0FBVCxDQUFlLENBQ3pELEtBQUt5RyxNQUFMLENBQVl6RyxDQUFaLENBQWtCdUcsQ0FBTyxDQUFDdkcsQ0FBRCxDQUF6QixFQUNELENBRkQsQ0FFRyxJQUZILEVBSUgsQ0FFRHNHLFNBQU8sQ0FBQ3pMLFNBQVIsQ0FBa0I0TCxNQUFsQixDQUEyQixTQUFTekcsQ0FBVCxDQUFlOUYsQ0FBZixDQUFzQixDQUMvQzhGLENBQUksQ0FBR2dHLGFBQWEsQ0FBQ2hHLENBQUQsQ0FEMkIsQ0FFL0M5RixDQUFLLENBQUdnTSxjQUFjLENBQUNoTSxDQUFELENBRnlCLENBRy9DLElBQUk0TSxDQUFRLENBQUcsS0FBS04sR0FBTCxDQUFTeEcsQ0FBVCxDQUFmLENBQ0EsS0FBS3dHLEdBQUwsQ0FBU3hHLENBQVQsRUFBaUI4RyxDQUFRLENBQUdBLENBQVEsQ0FBRyxJQUFYLENBQWtCNU0sQ0FBckIsQ0FBNkJBLEVBQ3ZELEVBRURvTSxTQUFPLENBQUN6TCxTQUFSLENBQWtCLFFBQWxCLEVBQThCLFNBQVNtRixDQUFULENBQWUsQ0FDM0MsWUFBWXdHLEdBQUwsQ0FBU1IsYUFBYSxDQUFDaEcsQ0FBRCxDQUF0QixFQUNSLEVBRURzRyxTQUFPLENBQUN6TCxTQUFSLENBQWtCeUgsR0FBbEIsQ0FBd0IsU0FBU3RDLENBQVQsQ0FBZSxDQUVyQyxPQURBQSxDQUFJLENBQUdnRyxhQUFhLENBQUNoRyxDQUFELENBQ3BCLENBQU8sS0FBS2hMLEdBQUwsQ0FBU2dMLENBQVQsRUFBaUIsS0FBS3dHLEdBQUwsQ0FBU3hHLENBQVQsQ0FBakIsQ0FBa0MsSUFDMUMsRUFFRHNHLFNBQU8sQ0FBQ3pMLFNBQVIsQ0FBa0I3RixHQUFsQixDQUF3QixTQUFTZ0wsQ0FBVCxDQUFlLENBQ3JDLFlBQVl3RyxHQUFMLENBQVN0SCxjQUFULENBQXdCOEcsYUFBYSxDQUFDaEcsQ0FBRCxDQUFyQyxDQUNSLEVBRURzRyxTQUFPLENBQUN6TCxTQUFSLENBQWtCbEMsR0FBbEIsQ0FBd0IsU0FBU3FILENBQVQsQ0FBZTlGLENBQWYsQ0FBc0IsQ0FDNUMsS0FBS3NNLEdBQUwsQ0FBU1IsYUFBYSxDQUFDaEcsQ0FBRCxDQUF0QixFQUFnQ2tHLGNBQWMsQ0FBQ2hNLENBQUQsRUFDL0MsRUFFRG9NLFNBQU8sQ0FBQ3pMLFNBQVIsQ0FBa0IzRCxPQUFsQixDQUE0QixTQUFTNlAsQ0FBVCxDQUFtQkMsQ0FBbkIsQ0FBNEIsQ0FDdEQsSUFBSyxJQUFJaEgsQ0FBVCxTQUFzQndHLEdBQXRCLENBQ00sS0FBS0EsR0FBTCxDQUFTdEgsY0FBVCxDQUF3QmMsQ0FBeEIsQ0FETixFQUVJK0csQ0FBUSxDQUFDdkwsSUFBVCxDQUFjd0wsQ0FBZCxDQUF1QixLQUFLUixHQUFMLENBQVN4RyxDQUFULENBQXZCLENBQXVDQSxDQUF2QyxDQUE2QyxJQUE3QyxFQUdMLEVBRURzRyxTQUFPLENBQUN6TCxTQUFSLENBQWtCeUYsSUFBbEIsQ0FBeUIsVUFBVyxDQUNsQyxJQUFJOEYsQ0FBSyxDQUFHLEVBQVosQ0FJQSxZQUhLbFAsT0FBTCxDQUFhLFNBQVNnRCxDQUFULENBQWdCOEYsQ0FBaEIsQ0FBc0IsQ0FDakNvRyxDQUFLLENBQUM5SCxJQUFOLENBQVcwQixDQUFYLEVBQ0QsQ0FGRCxDQUdBLENBQU9tRyxXQUFXLENBQUNDLENBQUQsQ0FDbkIsRUFFREUsU0FBTyxDQUFDekwsU0FBUixDQUFrQjZELE1BQWxCLENBQTJCLFVBQVcsQ0FDcEMsSUFBSTBILENBQUssQ0FBRyxFQUFaLENBSUEsWUFIS2xQLE9BQUwsQ0FBYSxTQUFTZ0QsQ0FBVCxDQUFnQixDQUMzQmtNLENBQUssQ0FBQzlILElBQU4sQ0FBV3BFLENBQVgsRUFDRCxDQUZELENBR0EsQ0FBT2lNLFdBQVcsQ0FBQ0MsQ0FBRCxDQUNuQixFQUVERSxTQUFPLENBQUN6TCxTQUFSLENBQWtCb00sT0FBbEIsQ0FBNEIsVUFBVyxDQUNyQyxJQUFJYixDQUFLLENBQUcsRUFBWixDQUlBLFlBSEtsUCxPQUFMLENBQWEsU0FBU2dELENBQVQsQ0FBZ0I4RixDQUFoQixDQUFzQixDQUNqQ29HLENBQUssQ0FBQzlILElBQU4sQ0FBVyxDQUFDMEIsQ0FBRCxDQUFPOUYsQ0FBUCxDQUFYLEVBQ0QsQ0FGRCxDQUdBLENBQU9pTSxXQUFXLENBQUNDLENBQUQsQ0FDbkIsRUFFR2pCLE9BQU8sQ0FBQ3hHLFdBQ1YySCxTQUFPLENBQUN6TCxTQUFSLENBQWtCNUUsTUFBTSxDQUFDd0gsUUFBekIsRUFBcUM2SSxTQUFPLENBQUN6TCxTQUFSLENBQWtCb00sU0FHekQsU0FBU0MsUUFBVCxDQUFrQkMsQ0FBbEIsQ0FBd0IsUUFDbEJBLENBQUksQ0FBQ0MsUUFEYSxDQUVicE8sT0FBTyxDQUFDa0QsTUFBUixDQUFlLElBQUkvQyxTQUFKLENBQWMsY0FBZCxDQUFmLENBRmEsTUFJdEJnTyxDQUFJLENBQUNDLFFBQUwsR0FKc0IsQ0FLdkIsQ0FFRCxTQUFTQyxlQUFULENBQXlCQyxDQUF6QixDQUFpQyxDQUMvQixXQUFXdE8sT0FBSixDQUFZLFNBQVNpRCxDQUFULENBQWtCQyxDQUFsQixDQUEwQixDQUMzQ29MLENBQU0sQ0FBQ0MsTUFBUCxDQUFnQixVQUFXLENBQ3pCdEwsQ0FBTyxDQUFDcUwsQ0FBTSxDQUFDbEwsTUFBUixFQUNSLENBSDBDLENBSTNDa0wsQ0FBTSxDQUFDRSxPQUFQLENBQWlCLFVBQVcsQ0FDMUJ0TCxDQUFNLENBQUNvTCxDQUFNLENBQUM3SyxLQUFSLEVBQ1AsRUFDRixDQVBNLENBUVIsQ0FFRCxTQUFTZ0wscUJBQVQsQ0FBK0JwQyxDQUEvQixDQUFxQyxLQUMvQmlDLENBQU0sQ0FBRyxJQUFJSSxVQURrQixDQUUvQkMsQ0FBTyxDQUFHTixlQUFlLENBQUNDLENBQUQsQ0FGTSxDQUluQyxPQURBQSxDQUFNLENBQUNNLGlCQUFQLENBQXlCdkMsQ0FBekIsQ0FDQSxDQUFPc0MsQ0FDUixDQUVELFNBQVNFLGNBQVQsQ0FBd0J4QyxDQUF4QixDQUE4QixLQUN4QmlDLENBQU0sQ0FBRyxJQUFJSSxVQURXLENBRXhCQyxDQUFPLENBQUdOLGVBQWUsQ0FBQ0MsQ0FBRCxDQUZELENBSTVCLE9BREFBLENBQU0sQ0FBQ1EsVUFBUCxDQUFrQnpDLENBQWxCLENBQ0EsQ0FBT3NDLENBQ1IsQ0FFRCxTQUFTSSxxQkFBVCxDQUErQkMsQ0FBL0IsQ0FBb0MsQ0FJbEMsUUFISUMsQ0FBSSxDQUFHLElBQUk5RCxVQUFKLENBQWU2RCxDQUFmLENBR1gsQ0FGSUUsQ0FBSyxDQUFPeEIsS0FBUCxDQUFhdUIsQ0FBSSxDQUFDbEosTUFBbEIsQ0FFVCxDQUFTQyxDQUFDLENBQUcsQ0FBYixDQUFnQkEsQ0FBQyxDQUFHaUosQ0FBSSxDQUFDbEosTUFBekIsQ0FBaUNDLENBQUMsRUFBbEMsQ0FDRWtKLENBQUssQ0FBQ2xKLENBQUQsQ0FBTCxDQUFXbUosTUFBTSxDQUFDQyxZQUFQLENBQW9CSCxDQUFJLENBQUNqSixDQUFELENBQXhCLENBQVgsQ0FFRixPQUFPa0osQ0FBSyxDQUFDRyxJQUFOLENBQVcsRUFBWCxDQUNSLENBRUQsU0FBU0MsV0FBVCxDQUFxQk4sQ0FBckIsQ0FBMEIsQ0FDeEIsR0FBSUEsQ0FBRyxDQUFDbkgsS0FBUixDQUNFLE9BQU9tSCxDQUFHLENBQUNuSCxLQUFKLENBQVUsQ0FBVixDQUFQLENBRUEsSUFBSW9ILENBQUksQ0FBRyxJQUFJOUQsVUFBSixDQUFlNkQsQ0FBRyxDQUFDTyxVQUFuQixDQUFYLENBRUEsT0FEQU4sQ0FBSSxDQUFDdFAsR0FBTCxDQUFTLElBQUl3TCxVQUFKLENBQWU2RCxDQUFmLENBQVQsQ0FDQSxDQUFPQyxDQUFJLENBQUNPLE1BRWYsQ0FFRCxTQUFTQyxJQUFULEVBQWdCLENBa0hkLFlBakhLckIsUUFBTCxHQWlIQSxDQS9HQSxLQUFLc0IsU0FBTCxDQUFpQixTQUFTdkIsQ0FBVCxDQUFlLENBVzlCLEtBQUtDLFFBQUwsQ0FBZ0IsS0FBS0EsUUFYUyxDQVk5QixLQUFLdUIsU0FBTCxDQUFpQnhCLENBWmEsQ0FhekJBLENBYnlCLENBZUgsUUFBaEIsU0FBT0EsQ0FmWSxDQWdCNUIsS0FBS3lCLFNBQUwsQ0FBaUJ6QixDQWhCVyxDQWlCbkJoQyxPQUFPLENBQUNFLElBQVIsRUFBZ0JDLElBQUksQ0FBQ3pLLFNBQUwsQ0FBZThLLGFBQWYsQ0FBNkJ3QixDQUE3QixDQWpCRyxDQWtCNUIsS0FBSzBCLFNBQUwsQ0FBaUIxQixDQWxCVyxDQW1CbkJoQyxPQUFPLENBQUNLLFFBQVIsRUFBb0JzRCxRQUFRLENBQUNqTyxTQUFULENBQW1COEssYUFBbkIsQ0FBaUN3QixDQUFqQyxDQW5CRCxDQW9CNUIsS0FBSzRCLGFBQUwsQ0FBcUI1QixDQXBCTyxDQXFCbkJoQyxPQUFPLENBQUNDLFlBQVIsRUFBd0JQLGVBQWUsQ0FBQ2hLLFNBQWhCLENBQTBCOEssYUFBMUIsQ0FBd0N3QixDQUF4QyxDQXJCTCxDQXNCNUIsS0FBS3lCLFNBQUwsQ0FBaUJ6QixDQUFJLENBQUNuUixRQUFMLEVBdEJXLENBdUJuQm1QLE9BQU8sQ0FBQ00sV0FBUixFQUF1Qk4sT0FBTyxDQUFDRSxJQUEvQixFQUF1Q0ssVUFBVSxDQUFDeUIsQ0FBRCxDQXZCOUIsRUF3QjVCLEtBQUs2QixnQkFBTCxDQUF3QlYsV0FBVyxDQUFDbkIsQ0FBSSxDQUFDcUIsTUFBTixDQXhCUCxDQTBCNUIsS0FBS0csU0FBTCxDQUFpQixJQUFJckQsSUFBSixDQUFTLENBQUMsS0FBSzBELGdCQUFOLENBQVQsQ0ExQlcsRUEyQm5CN0QsT0FBTyxDQUFDTSxXQUFSLEdBQXdCaEQsV0FBVyxDQUFDNUgsU0FBWixDQUFzQjhLLGFBQXRCLENBQW9Dd0IsQ0FBcEMsR0FBNkN0QixpQkFBaUIsQ0FBQ3NCLENBQUQsQ0FBdEYsQ0EzQm1CLENBNEI1QixLQUFLNkIsZ0JBQUwsQ0FBd0JWLFdBQVcsQ0FBQ25CLENBQUQsQ0E1QlAsQ0E4QjVCLEtBQUt5QixTQUFMLENBQWlCekIsQ0FBSSxDQUFHaE4sTUFBTSxDQUFDVSxTQUFQLENBQWlCN0UsUUFBakIsQ0FBMEJ3RixJQUExQixDQUErQjJMLENBQS9CLENBOUJJLENBYzVCLEtBQUt5QixTQUFMLENBQWlCLEVBZFcsQ0FpQ3pCLEtBQUtyQyxPQUFMLENBQWFqRSxHQUFiLENBQWlCLGNBQWpCLENBakN5QixHQWtDUixRQUFoQixTQUFPNkUsQ0FsQ2lCLENBbUMxQixLQUFLWixPQUFMLENBQWE1TixHQUFiLENBQWlCLGNBQWpCLENBQWlDLDBCQUFqQyxDQW5DMEIsQ0FvQ2pCLEtBQUtrUSxTQUFMLEVBQWtCLEtBQUtBLFNBQUwsQ0FBZXROLElBcENoQixDQXFDMUIsS0FBS2dMLE9BQUwsQ0FBYTVOLEdBQWIsQ0FBaUIsY0FBakIsQ0FBaUMsS0FBS2tRLFNBQUwsQ0FBZXROLElBQWhELENBckMwQixDQXNDakI0SixPQUFPLENBQUNDLFlBQVIsRUFBd0JQLGVBQWUsQ0FBQ2hLLFNBQWhCLENBQTBCOEssYUFBMUIsQ0FBd0N3QixDQUF4QyxDQXRDUCxFQXVDMUIsS0FBS1osT0FBTCxDQUFhNU4sR0FBYixDQUFpQixjQUFqQixDQUFpQyxpREFBakMsQ0F2QzBCLEVBMEMvQixDQXFFRCxDQW5FSXdNLE9BQU8sQ0FBQ0UsSUFtRVosR0FsRUUsS0FBS0EsSUFBTCxDQUFZLFVBQVcsQ0FDckIsSUFBSTRELENBQVEsQ0FBRy9CLFFBQVEsQ0FBQyxJQUFELENBQXZCLENBQ0EsR0FBSStCLENBQUosQ0FDRSxPQUFPQSxDQUFQLENBR0YsR0FBSSxLQUFLSixTQUFULENBQ0UsT0FBTzdQLE9BQU8sQ0FBQ2lELE9BQVIsQ0FBZ0IsS0FBSzRNLFNBQXJCLENBQVAsQ0FDSyxHQUFJLEtBQUtHLGdCQUFULENBQ0wsT0FBT2hRLE9BQU8sQ0FBQ2lELE9BQVIsQ0FBZ0IsSUFBSXFKLElBQUosQ0FBUyxDQUFDLEtBQUswRCxnQkFBTixDQUFULENBQWhCLENBQVAsQ0FDSyxHQUFJLEtBQUtELGFBQVQsQ0FDTCxVQUFVak0sS0FBSixDQUFVLHNDQUFWLENBQU4sQ0FESyxZQUdFOUQsT0FBTyxDQUFDaUQsT0FBUixDQUFnQixJQUFJcUosSUFBSixDQUFTLENBQUMsS0FBS3NELFNBQU4sQ0FBVCxDQUFoQixDQUVWLENBbURILENBakRFLEtBQUtuRCxXQUFMLENBQW1CLFVBQVcsQ0FDNUIsR0FBSSxLQUFLdUQsZ0JBQVQsQ0FBMkIsQ0FDekIsSUFBSUUsQ0FBVSxDQUFHaEMsUUFBUSxDQUFDLElBQUQsQ0FBekIsQ0FEeUIsT0FFckJnQyxDQUZxQixDQUdoQkEsQ0FIZ0IsQ0FLckJ6RyxXQUFXLENBQUNxRCxNQUFaLENBQW1CLEtBQUtrRCxnQkFBeEIsQ0FMcUIsQ0FNaEJoUSxPQUFPLENBQUNpRCxPQUFSLENBQ0wsS0FBSytNLGdCQUFMLENBQXNCUixNQUF0QixDQUE2QjNILEtBQTdCLENBQ0UsS0FBS21JLGdCQUFMLENBQXNCRyxVQUR4QixDQUVFLEtBQUtILGdCQUFMLENBQXNCRyxVQUF0QixDQUFtQyxLQUFLSCxnQkFBTCxDQUFzQlQsVUFGM0QsQ0FESyxDQU5nQixDQWFoQnZQLE9BQU8sQ0FBQ2lELE9BQVIsQ0FBZ0IsS0FBSytNLGdCQUFyQixDQUVWLENBQ0MsWUFBWTNELElBQUwsR0FBWTlJLElBQVosQ0FBaUJrTCxxQkFBakIsQ0FFVixDQThCSCxFQTNCQSxLQUFLMkIsSUFBTCxDQUFZLFVBQVcsQ0FDckIsSUFBSUgsQ0FBUSxDQUFHL0IsUUFBUSxDQUFDLElBQUQsQ0FBdkIsQ0FDQSxHQUFJK0IsQ0FBSixDQUNFLE9BQU9BLENBQVAsQ0FHRixHQUFJLEtBQUtKLFNBQVQsQ0FDRSxPQUFPaEIsY0FBYyxDQUFDLEtBQUtnQixTQUFOLENBQXJCLENBQ0ssR0FBSSxLQUFLRyxnQkFBVCxDQUNMLE9BQU9oUSxPQUFPLENBQUNpRCxPQUFSLENBQWdCOEwscUJBQXFCLENBQUMsS0FBS2lCLGdCQUFOLENBQXJDLENBQVAsQ0FDSyxHQUFJLEtBQUtELGFBQVQsQ0FDTCxVQUFVak0sS0FBSixDQUFVLHNDQUFWLENBQU4sQ0FESyxZQUdFOUQsT0FBTyxDQUFDaUQsT0FBUixDQUFnQixLQUFLMk0sU0FBckIsQ0FFVixDQVlELENBVkl6RCxPQUFPLENBQUNLLFFBVVosR0FURSxLQUFLQSxRQUFMLENBQWdCLFVBQVcsQ0FDekIsWUFBWTRELElBQUwsR0FBWTdNLElBQVosQ0FBaUI4TSxNQUFqQixDQUNSLENBT0gsRUFKQSxLQUFLQyxJQUFMLENBQVksVUFBVyxDQUNyQixZQUFZRixJQUFMLEdBQVk3TSxJQUFaLENBQWlCZ04sSUFBSSxDQUFDQyxLQUF0QixDQUNSLENBRUQsQ0FBTyxJQUNSLENBRUQ7Q0FDQSxJQUFJQyxPQUFPLENBQUcsQ0FBQyxRQUFELENBQVcsS0FBWCxDQUFrQixNQUFsQixDQUEwQixTQUExQixDQUFxQyxNQUFyQyxDQUE2QyxLQUE3QyxDQUFkLENBRUEsU0FBU0MsZUFBVCxDQUF5QjdOLENBQXpCLENBQWlDLENBQy9CLElBQUk4TixDQUFPLENBQUc5TixDQUFNLENBQUMrTixXQUFQLEVBQWQsQ0FDQSxPQUFrQyxDQUFDLENBQTVCLENBQUFILE9BQU8sQ0FBQzFELE9BQVIsQ0FBZ0I0RCxDQUFoQixFQUFnQ0EsQ0FBaEMsQ0FBMEM5TixDQUNsRCxVQUVlZ08sT0FBVCxDQUFpQkMsQ0FBakIsQ0FBd0JDLENBQXhCLENBQWlDLENBQ3RDLEdBQUksRUFBRSxnQkFBZ0JGLE9BQWxCLENBQUosQ0FDRSxVQUFVMVEsU0FBSixDQUFjLDhGQUFkLENBQU4sQ0FHRjRRLENBQU8sQ0FBR0EsQ0FBTyxFQUFJLEVBTGlCLENBTXRDLElBQUk1QyxDQUFJLENBQUc0QyxDQUFPLENBQUM1QyxJQUFuQixDQUVBLEdBQUkyQyxDQUFLLFlBQVlELE9BQXJCLENBQThCLENBQzVCLEdBQUlDLENBQUssQ0FBQzFDLFFBQVYsQ0FDRSxVQUFVak8sU0FBSixDQUFjLGNBQWQsQ0FBTixDQUVGLEtBQUs2USxHQUFMLENBQVdGLENBQUssQ0FBQ0UsR0FKVyxDQUs1QixLQUFLQyxXQUFMLENBQW1CSCxDQUFLLENBQUNHLFdBTEcsQ0FNdkJGLENBQU8sQ0FBQ3hELE9BTmUsR0FPMUIsS0FBS0EsT0FBTCxDQUFlLElBQUlELFNBQUosQ0FBWXdELENBQUssQ0FBQ3ZELE9BQWxCLENBUFcsRUFTNUIsS0FBSzFLLE1BQUwsQ0FBY2lPLENBQUssQ0FBQ2pPLE1BVFEsQ0FVNUIsS0FBS3FPLElBQUwsQ0FBWUosQ0FBSyxDQUFDSSxJQVZVLENBVzVCLEtBQUtDLE1BQUwsQ0FBY0wsQ0FBSyxDQUFDSyxNQVhRLENBWXZCaEQsQ0FBRCxFQUE0QixJQUFuQixFQUFBMkMsQ0FBSyxDQUFDbkIsU0FaUyxHQWExQnhCLENBQUksQ0FBRzJDLENBQUssQ0FBQ25CLFNBYmEsQ0FjMUJtQixDQUFLLENBQUMxQyxRQUFOLEdBZDBCLEVBZ0I3QixDQWhCRCxVQWlCTzRDLEdBQUwsQ0FBa0JGLENBQWxCLEdBakJGLENBNkJBLEdBVEEsS0FBS0csV0FBTCxDQUFtQkYsQ0FBTyxDQUFDRSxXQUFSLEVBQXVCLEtBQUtBLFdBQTVCLEVBQTJDLGFBUzlELEVBUklGLENBQU8sQ0FBQ3hELE9BQVIsRUFBbUIsQ0FBQyxLQUFLQSxPQVE3QixJQVBFLEtBQUtBLE9BQUwsQ0FBZSxJQUFJRCxTQUFKLENBQVl5RCxDQUFPLENBQUN4RCxPQUFwQixDQU9qQixFQUxBLEtBQUsxSyxNQUFMLENBQWM2TixlQUFlLENBQUNLLENBQU8sQ0FBQ2xPLE1BQVIsRUFBa0IsS0FBS0EsTUFBdkIsRUFBaUMsS0FBbEMsQ0FLN0IsQ0FKQSxLQUFLcU8sSUFBTCxDQUFZSCxDQUFPLENBQUNHLElBQVIsRUFBZ0IsS0FBS0EsSUFBckIsRUFBNkIsSUFJekMsQ0FIQSxLQUFLQyxNQUFMLENBQWNKLENBQU8sQ0FBQ0ksTUFBUixFQUFrQixLQUFLQSxNQUdyQyxDQUZBLEtBQUtDLFFBQUwsQ0FBZ0IsSUFFaEIsQ0FBSSxDQUFpQixLQUFoQixRQUFLdk8sTUFBTCxFQUF5QyxNQUFoQixRQUFLQSxNQUEvQixHQUFxRHNMLENBQXpELENBQ0UsVUFBVWhPLFNBQUosQ0FBYywyQ0FBZCxDQUFOLENBSUYsR0FGQSxLQUFLdVAsU0FBTCxDQUFldkIsQ0FBZixDQUVBLEVBQW9CLEtBQWhCLFFBQUt0TCxNQUFMLEVBQXlDLE1BQWhCLFFBQUtBLE1BQWxDLElBQ3dCLFVBQWxCLEdBQUFrTyxDQUFPLENBQUNNLEtBQVIsRUFBa0QsVUFBbEIsR0FBQU4sQ0FBTyxDQUFDTSxLQUQ5QyxFQUNvRTtDQUVoRSxJQUFJQyxDQUFhLENBQUcsZUFBcEIsQ0FDQSxHQUFJQSxDQUFhLENBQUM5UixJQUFkLENBQW1CLEtBQUt3UixHQUF4QixDQUFKLENBRUUsS0FBS0EsR0FBTCxDQUFXLEtBQUtBLEdBQUwsQ0FBU08sT0FBVCxDQUFpQkQsQ0FBakIsQ0FBZ0MsT0FBUyxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsRUFBekMsQ0FGYixNQUdPO0NBR0wsS0FBS1QsR0FBTCxFQUFZLENBRFEsSUFDUCxDQUFjeFIsSUFBZCxDQUFtQixLQUFLd1IsR0FBeEIsRUFBK0IsR0FBL0IsQ0FBcUMsR0FBdEMsRUFBNkMsSUFBN0MsQ0FBb0QsSUFBSVEsSUFBSixHQUFXQyxPQUFYLEdBQ2pFLENBQ0YsQ0FFSixDQUVEWixPQUFPLENBQUNoUCxTQUFSLENBQWtCNlAsS0FBbEIsQ0FBMEIsVUFBVyxDQUNuQyxXQUFXYixPQUFKLENBQVksSUFBWixDQUFrQixDQUFDMUMsSUFBSSxDQUFFLEtBQUt3QixTQUFaLENBQWxCLENBQ1IsRUFFRCxTQUFTVSxNQUFULENBQWdCbEMsQ0FBaEIsQ0FBc0IsQ0FDcEIsSUFBSXdELENBQUksQ0FBRyxJQUFJN0IsUUFBZixDQVlBLE9BWEEzQixDQUFJLENBQ0R5RCxJQURILEdBRUdDLEtBRkgsQ0FFUyxHQUZULEVBR0czVCxPQUhILENBR1csU0FBUzRULENBQVQsQ0FBZ0IsQ0FDdkIsR0FBSUEsQ0FBSixDQUFXLEtBQ0xELENBQUssQ0FBR0MsQ0FBSyxDQUFDRCxLQUFOLENBQVksR0FBWixDQURILENBRUw3SyxDQUFJLENBQUc2SyxDQUFLLENBQUN4RSxLQUFOLEdBQWNrRSxPQUFkLENBQXNCLEtBQXRCLENBQTZCLEdBQTdCLENBRkYsQ0FHTHJRLENBQUssQ0FBRzJRLENBQUssQ0FBQ3hDLElBQU4sQ0FBVyxHQUFYLEVBQWdCa0MsT0FBaEIsQ0FBd0IsS0FBeEIsQ0FBK0IsR0FBL0IsQ0FISCxDQUlUSSxDQUFJLENBQUNsRSxNQUFMLENBQVlzRSxrQkFBa0IsQ0FBQy9LLENBQUQsQ0FBOUIsQ0FBc0MrSyxrQkFBa0IsQ0FBQzdRLENBQUQsQ0FBeEQsRUFDRCxDQUNGLENBVkgsQ0FXQSxDQUFPeVEsQ0FDUixDQUVELFNBQVNLLFlBQVQsQ0FBc0JDLENBQXRCLENBQWtDLEtBQzVCMUUsQ0FBTyxDQUFHLElBQUlELFNBRGMsQ0FJNUI0RSxDQUFtQixDQUFHRCxDQUFVLENBQUNWLE9BQVgsQ0FBbUIsY0FBbkIsQ0FBbUMsR0FBbkMsQ0FKTSxDQUVoQztDQW1CQSxPQWJBVyxDQUFtQixDQUNoQkwsS0FESCxDQUNTLElBRFQsRUFFR3JFLEdBRkgsQ0FFTyxTQUFTSSxDQUFULENBQWlCLENBQ3BCLFFBQU8sR0FBQUEsQ0FBTSxDQUFDYixPQUFQLENBQWUsSUFBZixFQUE2QmEsQ0FBTSxDQUFDdUUsTUFBUCxDQUFjLENBQWQsQ0FBaUJ2RSxDQUFNLENBQUM3SCxNQUF4QixDQUE3QixDQUErRDZILENBQ3ZFLENBSkgsRUFLRzFQLE9BTEgsQ0FLVyxTQUFTa1UsQ0FBVCxDQUFlLEtBQ2xCQyxDQUFLLENBQUdELENBQUksQ0FBQ1AsS0FBTCxDQUFXLEdBQVgsQ0FEVSxDQUVsQjVRLENBQUcsQ0FBR29SLENBQUssQ0FBQ2hGLEtBQU4sR0FBY3VFLElBQWQsRUFGWSxDQUd0QixHQUFJM1EsQ0FBSixDQUFTLENBQ1AsSUFBSUMsQ0FBSyxDQUFHbVIsQ0FBSyxDQUFDaEQsSUFBTixDQUFXLEdBQVgsRUFBZ0J1QyxJQUFoQixFQUFaLENBQ0FyRSxDQUFPLENBQUNFLE1BQVIsQ0FBZXhNLENBQWYsQ0FBb0JDLENBQXBCLEVBQ0QsQ0FDRixDQVpILENBYUEsQ0FBT3FNLENBQ1IsQ0FFRGtDLElBQUksQ0FBQ2pOLElBQUwsQ0FBVXFPLE9BQU8sQ0FBQ2hQLFNBQWxCLFdBRWdCeVEsUUFBVCxDQUFrQkMsQ0FBbEIsQ0FBNEJ4QixDQUE1QixDQUFxQyxDQUMxQyxHQUFJLEVBQUUsZ0JBQWdCdUIsUUFBbEIsQ0FBSixDQUNFLFVBQVVuUyxTQUFKLENBQWMsOEZBQWQsQ0FBTixDQUVHNFEsQ0FKcUMsR0FLeENBLENBQU8sQ0FBRyxFQUw4QixFQVExQyxLQUFLeE8sSUFBTCxDQUFZLFNBUjhCLENBUzFDLEtBQUtpUSxNQUFMLENBQWN6QixDQUFPLENBQUN5QixNQUFSLFVBQStCLEdBQS9CLENBQXFDekIsQ0FBTyxDQUFDeUIsTUFUakIsQ0FVMUMsS0FBS0MsRUFBTCxDQUF5QixHQUFmLE9BQUtELE1BQUwsRUFBb0MsR0FBZCxNQUFLQSxNQVZLLENBVzFDLEtBQUtFLFVBQUwsQ0FBa0IsZUFBZ0IzQixDQUFoQixDQUEwQkEsQ0FBTyxDQUFDMkIsVUFBbEMsQ0FBK0MsRUFYdkIsQ0FZMUMsS0FBS25GLE9BQUwsQ0FBZSxJQUFJRCxTQUFKLENBQVl5RCxDQUFPLENBQUN4RCxPQUFwQixDQVoyQixDQWExQyxLQUFLeUQsR0FBTCxDQUFXRCxDQUFPLENBQUNDLEdBQVIsRUFBZSxFQWJnQixDQWMxQyxLQUFLdEIsU0FBTCxDQUFlNkMsQ0FBZixFQUNELENBRUQ5QyxJQUFJLENBQUNqTixJQUFMLENBQVU4UCxRQUFRLENBQUN6USxTQUFuQixFQUVBeVEsUUFBUSxDQUFDelEsU0FBVCxDQUFtQjZQLEtBQW5CLENBQTJCLFVBQVcsQ0FDcEMsV0FBV1ksUUFBSixDQUFhLEtBQUszQyxTQUFsQixDQUE2QixDQUNsQzZDLE1BQU0sQ0FBRSxLQUFLQSxNQURxQixDQUVsQ0UsVUFBVSxDQUFFLEtBQUtBLFVBRmlCLENBR2xDbkYsT0FBTyxDQUFFLElBQUlELFNBQUosQ0FBWSxLQUFLQyxPQUFqQixDQUh5QixDQUlsQ3lELEdBQUcsQ0FBRSxLQUFLQSxHQUp3QixDQUE3QixDQU1SLEVBRURzQixRQUFRLENBQUM3TyxLQUFULENBQWlCLFVBQVcsQ0FDMUIsSUFBSWtQLENBQVEsQ0FBRyxJQUFJTCxRQUFKLENBQWEsSUFBYixDQUFtQixDQUFDRSxNQUFNLENBQUUsQ0FBVCxDQUFZRSxVQUFVLENBQUUsRUFBeEIsQ0FBbkIsQ0FBZixDQUVBLE9BREFDLENBQVEsQ0FBQ3BRLElBQVQsQ0FBZ0IsT0FDaEIsQ0FBT29RLENBQ1IsRUFFRCxJQUFJQyxnQkFBZ0IsQ0FBRyxDQUFDLEdBQUQsQ0FBTSxHQUFOLENBQVcsR0FBWCxDQUFnQixHQUFoQixDQUFxQixHQUFyQixDQUF2QixDQUVBTixRQUFRLENBQUNPLFFBQVQsQ0FBb0IsU0FBUzdCLENBQVQsQ0FBY3dCLENBQWQsQ0FBc0IsQ0FDeEMsR0FBeUMsQ0FBQyxDQUF0QyxHQUFBSSxnQkFBZ0IsQ0FBQzdGLE9BQWpCLENBQXlCeUYsQ0FBekIsQ0FBSixDQUNFLFVBQVVwSixVQUFKLENBQWUscUJBQWYsQ0FBTixDQUdGLFdBQVdrSixRQUFKLENBQWEsSUFBYixDQUFtQixDQUFDRSxNQUFNLENBQUVBLENBQVQsQ0FBaUJqRixPQUFPLENBQUUsQ0FBQ3VGLFFBQVEsQ0FBRTlCLENBQVgsQ0FBMUIsQ0FBbkIsQ0FDUixNQUVVK0IsWUFBWSxDQUFHMVgsUUFBTSxDQUFDMFgsWUFBMUIsQ0FDUCxHQUFJLENBQ0YsSUFBSUEsYUFDTCxDQUFDLE1BQU90USxDQUFQLENBQVksQ0FDWnNRLFlBQVksQ0FBRyxTQUFTQyxDQUFULENBQWtCaE0sQ0FBbEIsQ0FBd0IsQ0FDckMsS0FBS2dNLE9BQUwsQ0FBZUEsQ0FEc0IsQ0FFckMsS0FBS2hNLElBQUwsQ0FBWUEsQ0FGeUIsQ0FHckMsSUFBSXZELENBQUssQ0FBR0ssS0FBSyxDQUFDa1AsQ0FBRCxDQUFqQixDQUNBLEtBQUtDLEtBQUwsQ0FBYXhQLENBQUssQ0FBQ3dQLE1BQ3BCLENBTlcsQ0FPWkYsWUFBWSxDQUFDbFIsU0FBYixDQUF5QlYsTUFBTSxDQUFDaEQsTUFBUCxDQUFjMkYsS0FBSyxDQUFDakMsU0FBcEIsQ0FQYixDQVFaa1IsWUFBWSxDQUFDbFIsU0FBYixDQUF1QjhFLFdBQXZCLENBQXFDb00sYUFDdEMsVUFFZUcsT0FBVCxDQUFlcEMsQ0FBZixDQUFzQnFDLENBQXRCLENBQTRCLENBQ2pDLFdBQVduVCxPQUFKLENBQVksU0FBU2lELENBQVQsQ0FBa0JDLENBQWxCLENBQTBCLENBUzNDLFNBQVNrUSxDQUFULEVBQW9CLENBQ2xCQyxDQUFHLENBQUNDLEtBQUosR0FDRCxDQVZELElBQUlDLENBQU8sQ0FBRyxJQUFJMUMsT0FBSixDQUFZQyxDQUFaLENBQW1CcUMsQ0FBbkIsQ0FBZCxDQUVBLEdBQUlJLENBQU8sQ0FBQ3BDLE1BQVIsRUFBa0JvQyxDQUFPLENBQUNwQyxNQUFSLENBQWVxQyxPQUFyQyxDQUNFLE9BQU90USxDQUFNLENBQUMsSUFBSTZQLFlBQUosQ0FBaUIsU0FBakIsQ0FBNEIsWUFBNUIsQ0FBRCxDQUFiLENBR0YsSUFBSU0sQ0FBRyxDQUFHLElBQUlJLGNBQWQsQ0FNQUosQ0FBRyxDQUFDOUUsTUFBSixDQUFhLFVBQVcsQ0FDdEIsSUFBSXdDLENBQU8sQ0FBRyxDQUNaeUIsTUFBTSxDQUFFYSxDQUFHLENBQUNiLE1BREEsQ0FFWkUsVUFBVSxDQUFFVyxDQUFHLENBQUNYLFVBRkosQ0FHWm5GLE9BQU8sQ0FBRXlFLFlBQVksQ0FBQ3FCLENBQUcsQ0FBQ0sscUJBQUosSUFBK0IsRUFBaEMsQ0FIVCxDQUFkLENBS0EzQyxDQUFPLENBQUNDLEdBQVIsQ0FBYyxnQkFBaUJxQyxDQUFqQixDQUF1QkEsQ0FBRyxDQUFDTSxXQUEzQixDQUF5QzVDLENBQU8sQ0FBQ3hELE9BQVIsQ0FBZ0JqRSxHQUFoQixDQUFvQixlQUFwQixDQU5qQyxDQU90QixJQUFJNkUsQ0FBSSxDQUFHLGFBQWNrRixDQUFkLENBQW9CQSxDQUFHLENBQUNWLFFBQXhCLENBQW1DVSxDQUFHLENBQUNPLFlBQWxELENBQ0FDLFVBQVUsQ0FBQyxVQUFXLENBQ3BCNVEsQ0FBTyxDQUFDLElBQUlxUCxRQUFKLENBQWFuRSxDQUFiLENBQW1CNEMsQ0FBbkIsQ0FBRCxFQUNSLENBRlMsQ0FFUCxDQUZPLEVBR1gsQ0F4QjBDLENBMEIzQ3NDLENBQUcsQ0FBQzdFLE9BQUosQ0FBYyxVQUFXLENBQ3ZCcUYsVUFBVSxDQUFDLFVBQVcsQ0FDcEIzUSxDQUFNLENBQUMsSUFBSS9DLFNBQUosQ0FBYyx3QkFBZCxDQUFELEVBQ1AsQ0FGUyxDQUVQLENBRk8sRUFHWCxDQTlCMEMsQ0FnQzNDa1QsQ0FBRyxDQUFDUyxTQUFKLENBQWdCLFVBQVcsQ0FDekJELFVBQVUsQ0FBQyxVQUFXLENBQ3BCM1EsQ0FBTSxDQUFDLElBQUkvQyxTQUFKLENBQWMsd0JBQWQsQ0FBRCxFQUNQLENBRlMsQ0FFUCxDQUZPLEVBR1gsQ0FwQzBDLENBc0MzQ2tULENBQUcsQ0FBQ1UsT0FBSixDQUFjLFVBQVcsQ0FDdkJGLFVBQVUsQ0FBQyxVQUFXLENBQ3BCM1EsQ0FBTSxDQUFDLElBQUk2UCxZQUFKLENBQWlCLFNBQWpCLENBQTRCLFlBQTVCLENBQUQsRUFDUCxDQUZTLENBRVAsQ0FGTyxFQUdYLENBMUMwQyxDQW9EM0NNLENBQUcsQ0FBQ1csSUFBSixDQUFTVCxDQUFPLENBQUMxUSxNQUFqQixDQVJBLFNBQWdCbU8sQ0FBaEIsQ0FBcUIsQ0FDbkIsR0FBSSxDQUNGLE9BQWUsRUFBUixHQUFBQSxDQUFHLEVBQVczVixRQUFNLENBQUN5WCxRQUFQLENBQWdCbUIsSUFBOUIsQ0FBcUM1WSxRQUFNLENBQUN5WCxRQUFQLENBQWdCbUIsSUFBckQsQ0FBNERqRCxDQUNwRSxDQUFDLE1BQU96RSxDQUFQLENBQVUsQ0FDVixPQUFPeUUsQ0FDUixDQUNGLENBRXdCLENBQU91QyxDQUFPLENBQUN2QyxHQUFmLENBQXpCLElBcEQyQyxDQXNEZixTQUF4QixHQUFBdUMsQ0FBTyxDQUFDdEMsV0F0RCtCLENBdUR6Q29DLENBQUcsQ0FBQ2EsZUFBSixHQXZEeUMsQ0F3RFIsTUFBeEIsR0FBQVgsQ0FBTyxDQUFDdEMsV0F4RHdCLEdBeUR6Q29DLENBQUcsQ0FBQ2EsZUFBSixHQXpEeUMsRUE0RHZDLGlCQUFrQmIsQ0E1RHFCLEdBNkRyQ2xILE9BQU8sQ0FBQ0UsSUE3RDZCLENBOER2Q2dILENBQUcsQ0FBQ2MsWUFBSixDQUFtQixNQTlEb0IsQ0FnRXZDaEksT0FBTyxDQUFDTSxXQUFSLEVBQ0E4RyxDQUFPLENBQUNoRyxPQUFSLENBQWdCakUsR0FBaEIsQ0FBb0IsY0FBcEIsQ0FEQSxFQUU0RSxDQUFDLENBQTdFLEdBQUFpSyxDQUFPLENBQUNoRyxPQUFSLENBQWdCakUsR0FBaEIsQ0FBb0IsY0FBcEIsRUFBb0N5RCxPQUFwQyxDQUE0QywwQkFBNUMsQ0FsRXVDLEdBb0V2Q3NHLENBQUcsQ0FBQ2MsWUFBSixDQUFtQixhQXBFb0IsR0F3RXZDaEIsQ0FBSSxFQUE0QixRQUF4QixhQUFPQSxDQUFJLENBQUM1RixPQUFaLENBQVIsRUFBNEMsRUFBRTRGLENBQUksQ0FBQzVGLE9BQUwsWUFBd0JELFNBQTFCLENBeEVMLENBeUV6Q25NLE1BQU0sQ0FBQzBNLG1CQUFQLENBQTJCc0YsQ0FBSSxDQUFDNUYsT0FBaEMsRUFBeUNyUCxPQUF6QyxDQUFpRCxTQUFTOEksQ0FBVCxDQUFlLENBQzlEcU0sQ0FBRyxDQUFDZSxnQkFBSixDQUFxQnBOLENBQXJCLENBQTJCa0csY0FBYyxDQUFDaUcsQ0FBSSxDQUFDNUYsT0FBTCxDQUFhdkcsQ0FBYixDQUFELENBQXpDLEVBQ0QsQ0FGRCxDQXpFeUMsQ0E2RXpDdU0sQ0FBTyxDQUFDaEcsT0FBUixDQUFnQnJQLE9BQWhCLENBQXdCLFNBQVNnRCxDQUFULENBQWdCOEYsQ0FBaEIsQ0FBc0IsQ0FDNUNxTSxDQUFHLENBQUNlLGdCQUFKLENBQXFCcE4sQ0FBckIsQ0FBMkI5RixDQUEzQixFQUNELENBRkQsQ0E3RXlDLENBa0Z2Q3FTLENBQU8sQ0FBQ3BDLE1BbEYrQixHQW1GekNvQyxDQUFPLENBQUNwQyxNQUFSLENBQWVrRCxnQkFBZixDQUFnQyxPQUFoQyxDQUF5Q2pCLENBQXpDLENBbkZ5QyxDQXFGekNDLENBQUcsQ0FBQ2lCLGtCQUFKLENBQXlCLFVBQVcsQ0FFWCxDQUFuQixHQUFBakIsQ0FBRyxDQUFDa0IsVUFGMEIsRUFHaENoQixDQUFPLENBQUNwQyxNQUFSLENBQWVxRCxtQkFBZixDQUFtQyxPQUFuQyxDQUE0Q3BCLENBQTVDLEVBRUgsQ0ExRndDLEVBNkYzQ0MsQ0FBRyxDQUFDb0IsSUFBSixDQUFzQyxXQUE3QixTQUFPbEIsQ0FBTyxDQUFDNUQsU0FBZixDQUEyQyxJQUEzQyxDQUFrRDRELENBQU8sQ0FBQzVELFNBQW5FLEVBQ0QsQ0E5Rk0sQ0ErRlIsQ0FFRHVELE9BQUssQ0FBQ3dCLFFBQU4sSUFFS3JaLFFBQU0sQ0FBQzZYLFFBQ1Y3WCxRQUFNLENBQUM2WCxLQUFQLENBQWVBLFFBQ2Y3WCxRQUFNLENBQUNpUyxPQUFQLENBQWlCQSxVQUNqQmpTLFFBQU0sQ0FBQ3dWLE9BQVAsQ0FBaUJBLFFBQ2pCeFYsUUFBTSxDQUFDaVgsUUFBUCxDQUFrQkE7O0NDOWtCcEIsSUFBSSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztDQUNqRSxJQUFJLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0NBQ3hDLElBQUksOEJBQThCLEdBQUcsZ0NBQWdDLENBQUM7Q0FLdEUsSUFBSSw0QkFBNEIsR0FBR25ULGVBQVUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUMxRSxFQUFFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNqQixFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN0QyxFQUFFLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQztDQUNyQyxDQUFDLENBQUMsQ0FBQztDQUVILElBQUksZUFBZSxHQUFHLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBRTdELElBQUksa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEVBQUU7Q0FDdEMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Q0FDM0MsRUFBRSxPQUFPLFVBQVUsS0FBSyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUQsQ0FBQyxDQUFDO0NBRUYsSUFBSW1NLFFBQU0sR0FBRyxDQUFDLDRCQUE0QixJQUFJLENBQUMsZUFBZSxDQUFDO0FBSy9EdE4sUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRXNOLFFBQU0sRUFBRSxFQUFFO0NBQ3BELEVBQUUsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtDQUMvQixJQUFJLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzQixJQUFJLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNyQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNkLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQzdCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtDQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxNQUFNLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDakMsUUFBUSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNqQyxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0NBQ3hGLFFBQVEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzlFLE9BQU8sTUFBTTtDQUNiLFFBQVEsSUFBSSxDQUFDLElBQUksZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztDQUNuRixRQUFRLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsT0FBTztDQUNQLEtBQUs7Q0FDTCxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQ2pCLElBQUksT0FBTyxDQUFDLENBQUM7Q0FDYixHQUFHO0NBQ0gsQ0FBQyxDQUFDOztLQzFESXFKLGNBQXNCLENBQUcsR0FDekJDLG1CQUEyQixPQUVqQztDQUNBO0NBQ0EsT0FDYUMsY0FBc0IsQ0FBR2hCLFVBQVUsQ0FBQyxVQUFNLENBQ3REaUIsbUJBQW1CLGlFQUN1Q0gsY0FEdkMsZ0xBR25CLENBSitDLENBSTdDQyxtQkFKNkMsQ0FBekMsVUFhU0csU0FBVCxDQUFtQnRSLENBQW5CLENBQStDLENBQ2pELGlCQUFPQSxDQUQwQyxHQUVwREEsQ0FBSyxDQUFHLENBQ1B1UCxPQUFPLENBQUV2UCxDQURGLENBRjRDLEVBT3JELElBQU11UixDQUF5QixDQUFHeFosUUFBUSxDQUFDeVosY0FBVCxDQUNqQyxTQURpQyxDQUFsQyxDQUlBRCxDQUFNLENBQUNFLEtBQVAsQ0FBYUMsT0FBYixDQUF1QixNQVg4QixDQWFyRCxJQUFNQyxDQUFtQixDQUFHNVosUUFBUSxDQUFDeVosY0FBVCxDQUF3QixRQUF4QixDQUE1QixDQUVBRyxDQUFNLENBQUNGLEtBQVAsQ0FBYUMsT0FBYixDQUF1QixNQWY4QixDQWlCckQsSUFBTUUsQ0FBeUIsQ0FBRzdaLFFBQVEsQ0FBQ3laLGNBQVQsQ0FDakMsdUJBRGlDLENBQWxDLENBSUFJLENBQVksQ0FBQ0MsV0FBYixDQUEyQjdSLENBQUssQ0FBQ3VQLE9BckJvQixDQXVCckQsSUFBTXVDLENBQW9CLENBQUcvWixRQUFRLENBQUNnYSxhQUFULENBQzVCLGdCQUQ0QixDQUE3QixDQU1BLEdBRkFELENBQU8sQ0FBQ0wsS0FBUixDQUFjQyxPQUFkLENBQXdCLE9BRXhCLEVBQUksRUFBRSxpQkFBa0IxUixDQUFwQixDQUFKLENBSUEsT0FBUUEsQ0FBSyxDQUFDZ1MsWUFBZCxFQUNDLHlDQUNDQyw0QkFBNEIsbXZCQUQ3QixDQWFDLE1BRUQsbUNBQ0NBLDRCQUE0Qix1SkFEN0IsQ0FJQyxNQUVELDJDQUNDQSw0QkFBNEIsa1JBRDdCLENBSUMsTUExQkYsQ0ErQkEsQ0FFRCxTQUFTQSw0QkFBVCxDQUFzQzFDLENBQXRDLENBQTZELEtBR3REMkMsQ0FBc0IsQ0FBR25hLFFBQVEsQ0FBQ3laLGNBQVQsQ0FDOUIsMkJBRDhCLENBSDZCLENBTzVEVSxDQUFzQixDQUFDQyxTQUF2QixvQkFDTTVDLENBRE4saVBBR0EsVUFFZThCLG1CQUFULENBQTZCOUIsQ0FBN0IsQ0FBb0QsQ0FDMUQsSUFBTTZDLENBQWUsQ0FBR3JhLFFBQVEsQ0FBQ3laLGNBQVQsQ0FBd0Isd0JBQXhCLENBQXhCLENBRUFZLENBQWUsQ0FBQ0QsU0FBaEIsV0FBK0I1QyxDQUEvQiw2RUFIMEQsQ0FJMUQ2QyxDQUFlLENBQUNYLEtBQWhCLENBQXNCQyxPQUF0QixDQUFnQyxTQUowQixDQU0xRCxJQUFNVyxDQUFZLENBQUd0YSxRQUFRLENBQUN5WixjQUFULENBQXdCLGVBQXhCLENBQXJCLENBRUFhLENBQVksQ0FBQ3pCLGdCQUFiLENBQThCLFVBQTlCLENBQTBDLFNBQVU5SCxDQUFWLENBQWEsQ0FDeEMsT0FBVixHQUFBQSxDQUFDLENBQUN0TCxHQURnRCxFQUVyRDhVLG1CQUFtQixHQUVwQixDQUpELENBUjBELENBYzFERCxDQUFZLENBQUN6QixnQkFBYixDQUE4QixPQUE5QixDQUF1QzBCLG1CQUF2QyxFQUNBLENBRUQsU0FBU0EsbUJBQVQsRUFBcUMsQ0FDcENoQixTQUFTLDJCQUNUOztDQ25IRCxJQUFJaUIsV0FBUyxHQUFHMVosYUFBc0MsQ0FBQyxRQUFRLENBQUM7Q0FJaEUsSUFBSThDLGdCQUFjLEdBQUcsdUJBQXVCLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUluRnBCLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQ29CLGdCQUFjLEVBQUUsRUFBRTtDQUM3RCxFQUFFLFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxFQUFFLEdBQXdCO0NBQ3hELElBQUksT0FBTzRXLFdBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNoRixHQUFHO0NBQ0gsQ0FBQyxDQUFDLENBQUM7Q0FHSCxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7O0FDWHRCQyxLQUFBQSw0QkFBb0MsY0FBQSxzR0FRcENDLGtCQUEwQixjQUFBLHlQQXlCMUJDLGNBQWMsQ0FBRyw2R0F1QnZCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxZQUNzQkMsNkJBQXRCLDhMQUFPLCtLQUdILEVBSEcsS0FDTkMsWUFETSxDQUNOQSxDQURNLFlBQ1MsQ0FEVCxPQUVOQyxZQUZNLENBRU5BLENBRk0sWUFFUyxHQUZULEtBSXdDQyxZQUp4QyxDQUlFQyxDQUpGLEdBSUVBLGdCQUpGLENBSW9CQyxDQUpwQixHQUlvQkEsZUFKcEIsVUFRQ3ZELEtBQUssV0FBSXNELENBQUosY0FBeUJDLENBQXpCLEVBQTRDLENBQ3RENVQsTUFBTSxDQUFFLE1BRDhDLENBRXREc0wsSUFBSSxDQUFFb0MsSUFBSSxDQUFDbUcsU0FBTCxDQUFlLENBQ3BCQyxLQUFLLENBQUVULGtCQURhLENBRXBCVSxTQUFTLENBQUUsQ0FDVkMsTUFBTSxDQUFFTixZQUFZLENBQUNNLE1BRFgsQ0FGUyxDQUFmLENBRmdELENBUXREdEosT0FBTyxDQUFFLENBQ1IsZUFBZ0Isa0JBRFIsQ0FSNkMsQ0FBNUMsQ0FSTiwrQkFvQkorQyxJQXBCSSxhQU9BcUMsQ0FQQSxVQXVCTCxRQUFBQSxDQUFRLFdBQVJBLGFBQUFBLENBQVEsQ0FBRW1FLElBQVYsMkJBQWdCQyxRQUFoQix1QkFBMEJDLG1CQUExQixHQUFpRCxFQXZCNUMsQ0FzQkVDLENBdEJGLEdBc0JFQSxVQXRCRixDQXNCY3hCLENBdEJkLEdBc0JjQSxZQXRCZCxDQXNCNEJ5QixDQXRCNUIsR0FzQjRCQSxhQXRCNUIsQ0F5QkFDLENBekJBLENBeUIyQmhCLGNBQWMsQ0FBQ2lCLFFBQWYsQ0FBd0IzQixDQUF4QixDQXpCM0IsRUEyQkYwQixDQTNCRSx3QkE0QkxFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLENBQUUzRSxRQUFRLENBQVJBLENBQUYsQ0FBWixDQTVCSyxDQStCTDRFLFlBQVksQ0FBQzFDLGNBQUQsQ0EvQlAsQ0FpQ0MsQ0FDTFksWUFBWSxDQUFaQSxDQURLLENBRUx6QyxPQUFPLHlEQUFtRHlDLENBQW5ELFNBQ055QixDQUFhLHlDQUFvQ0EsQ0FBcEMsSUFEUCxDQUZGLENBakNELFlBeUNGRCxDQXpDRSxFQTBDTEksT0FBTyxDQUFDQyxHQUFSLENBQVlMLENBQVosQ0ExQ0ssQ0E2Q0Z4QixDQTdDRSxFQThDTDRCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZN0IsQ0FBWixDQTlDSyxDQWlERixrQkFBQXdCLENBakRFLHlCQWtETE0sWUFBWSxDQUFDMUMsY0FBRCxDQWxEUCxDQW9ETDJDLHNCQUFzQixDQUFDN0UsQ0FBRCxDQXBEakIsbUNBMkRBOEUsQ0EzREEsQ0EyRGtCO0NBRXZCLEdBQUksR0FGbUI7Q0FJdkIsR0FBSSxHQUptQjtDQU12QixHQUFJLEdBTm1CLENBM0RsQixDQW9FTnBCLENBQVksRUFwRU4sQ0FzRU5DLENBQVksQ0FBR21CLENBQWUsQ0FBQ3BCLENBQUQsQ0FBZixFQUFpQ0MsQ0F0RTFDLFdBd0VBLElBQUl0VyxPQUFKLENBQVksU0FBQ2lELENBQUQsU0FDakI0USxVQUFVLENBQUMsVUFBTSxDQUNoQjVRLENBQU8sR0FDUCxDQUZTLENBRVBxVCxDQUZPLENBRE8sQ0FBWixDQXhFQSwwQkErRUFGLDZCQUE2QixDQUFDLENBQ25DQyxZQUFZLENBQVpBLENBRG1DLENBRW5DQyxZQUFZLENBQVpBLENBRm1DLENBQUQsQ0EvRTdCLGlHQXFGUCxTQUFTa0Isc0JBQVQsQ0FBZ0M3RSxDQUFoQyxDQUEyRSxXQUMxQyxRQUFBQSxDQUFRLFdBQVJBLGFBQUFBLENBQVEsQ0FBRW1FLElBQVYsdUJBQWdCQyxRQUFoQixHQUE0QixFQURjLENBQ2xFQyxDQURrRSxHQUNsRUEsbUJBRGtFLENBSzFFLEdBRkFLLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLENBQUVJLFlBQVksQ0FBRSxDQUFFVixtQkFBbUIsQ0FBbkJBLENBQUYsQ0FBaEIsQ0FBWixDQUVBLENBQ0MsQ0FBQ0EsQ0FBRCxFQUNBLENBQUNBLENBQW1CLENBQUNDLFVBRHJCLFNBRUNELENBRkQsV0FFQ0EsQ0FGRCxZQUVDQSxDQUFtQixDQUFFVyxRQUZ0QixnQkFFQyxFQUErQkMsSUFIakMsQ0FLQyxNQUFNOVQsS0FBSywwREFBWCxDQUdELElBQU0rVCxDQUFnQyxDQUFHcmMsUUFBUSxDQUFDeVosY0FBVCxDQUN4QyxTQUR3QyxDQUF6QyxDQUlBO0NBQ0E7Q0FDQTRDLENBQWEsQ0FBQ3hELGdCQUFkLENBQStCLE1BQS9CLENBQXVDeUQsMEJBQXZDLENBbkIwRSxDQXFCMUVULE9BQU8sQ0FBQ0MsR0FBUiwwQ0FyQjBFLENBdUIxRU8sQ0FBYSxDQUFDRSxHQUFkLENBQ0N4QixZQUFZLENBQUN5QixrQkFBYixDQUFrQ2hCLENBQW1CLENBQUNXLFFBQXBCLENBQTZCQyxJQXhCVSxDQTBCMUUsSUFBTUssQ0FBSyxDQUFHLElBQUlDLEtBQUosQ0FBVSx5QkFBVixDQUFkLENBQ0ExYyxRQUFRLENBQUMyYyxhQUFULENBQXVCRixDQUF2QixFQUNBLENBRUQsU0FBU0gsMEJBQVQsRUFBNEMsQ0FDM0MsSUFBTTFDLENBQW1CLENBQUc1WixRQUFRLENBQUN5WixjQUFULENBQXdCLFFBQXhCLENBQTVCLENBS0E7Q0FDQTtDQUxBb0MsT0FBTyxDQUFDQyxHQUFSLDBCQUYyQyxDQUkzQ0QsT0FBTyxDQUFDQyxHQUFSLENBQVlsQyxDQUFaLENBSjJDLENBUTNDdkIsVUFBVSxDQUFDLFVBQU07Q0FFaEJ1QixDQUFNLENBQUNnRCxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixRQUFyQixDQUZnQixDQUloQnhFLFVBQVUsQ0FBQyxVQUFNO0NBRWhCdUIsQ0FBTSxDQUFDRixLQUFQLENBQWFDLE9BQWIsQ0FBdUIsT0FDdkIsQ0FIUyxDQUdQLEdBSE8sRUFJVixDQVJTLENBUVAsRUFSTyxFQVNWLEtBRUttRCw4QkFBOEIsOEVBQUcsK0dBRzlCcEYsS0FBSyxhQUFNcUQsWUFBWSxDQUFDRSxlQUFuQixFQUFzQyxDQUNoRDVULE1BQU0sQ0FBRSxNQUR3QyxDQUVoRHNMLElBQUksQ0FBRW9DLElBQUksQ0FBQ21HLFNBQUwsQ0FBZSxDQUNwQkMsS0FBSyxDQUFFViw0QkFEYSxDQUFmLENBRjBDLENBS2hEMUksT0FBTyxDQUFFLENBQ1IsZUFBZ0Isa0JBRFIsQ0FMdUMsQ0FBdEMsQ0FIeUIsK0JBWW5DK0MsSUFabUMscUtBQ3RDLEVBWUd3RyxJQWJtQyx5QkFDdEMsRUFZU0MsUUFiNkIscUJBQ3RDLEVBWW1Cd0IsdUJBYm1CLGdGQUFILHdEQWVoQ0Msd0JBQXdCLENBQUcsRUFFL0I7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxZQUNzQkMsb0NBQXRCLG1OQUFPLDJHQUN5Q0gsOEJBQThCLEVBRHZFLFdBQ0FJLENBREEsU0FHRkEsQ0FIRSxpQ0FNQ3RDLDZCQUE2QixFQU45QixvQ0FPZ0MsRUFBM0IsQ0FBQW9DLHdCQVBMLDBCQVFMbkIsT0FBTyxDQUFDQyxHQUFSLG9DQVJLLENBVUxrQix3QkFBd0IsRUFWbkIsV0FZQyxJQUFJeFksT0FBSixDQUFZLFNBQUNpRCxDQUFELFNBQWE0USxVQUFVLENBQUM1USxDQUFELENBQVUsR0FBVixDQUF2QixDQUFaLENBWkQsMEJBY0N3VixvQ0FBb0MsRUFkckMsdUNBaUJDM1UsS0FBSyw4REFqQk47O0NDNU1QNlUsS0FBSyxHQUFHQyxLQUFSLENBQWMsU0FBQ3JNLENBQUQsQ0FBTyxDQUNwQjhLLE9BQU8sQ0FBQzVULEtBQVIsQ0FBYzhJLENBQWQsQ0FEb0IsQ0FHUSxVQUF4QixHQUFBL1EsUUFBUSxDQUFDK1ksVUFITyxDQUtuQlEsU0FBUyxDQUFDeEksQ0FBRCxDQUxVLENBUW5CL1EsUUFBUSxDQUFDNlksZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQThDLFVBQU0sQ0FDbkRVLFNBQVMsQ0FBQ3hJLENBQUQsRUFDVCxDQUZELEVBSUQsQ0FaRCxXQWNlb00sMkhBQWYseUZBQ0twQyxZQUFZLENBQUNzQyxzQkFEbEIsaUNBR1F6Qyw2QkFBNkIsRUFIckMsOENBT1FxQyxvQ0FBb0MsRUFQNUM7Ozs7OzsifQ==
