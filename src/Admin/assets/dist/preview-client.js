(function () {
  'use strict';

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
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

  var isPure = false;

  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
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

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.7.0',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
  });

  var hasOwnProperty = {}.hasOwnProperty;
  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var id = 0;
  var postfix = Math.random();
  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;
  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
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

  var hiddenKeys = {};

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

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };
  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var html = getBuiltIn('document', 'documentElement');

  var keys = shared('keys');
  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

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

  var functionToString = Function.toString;
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }
  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;
  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

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

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;
  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {  }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
  	f: f$2
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

  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var correctPrototypeGetter = !fails(function () {
    function F() {  }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
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

  var defineProperty = objectDefineProperty.f;
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
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
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(ARRAY_ITERATOR);
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated),
      index: 0,
      kind: kind
    });
  }, function () {
    var state = getInternalState(this);
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

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var test = {};
  test[TO_STRING_TAG$1] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

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

  var SPECIES = wellKnownSymbol('species');
  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;
    if (descriptors && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
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

  var SPECIES$1 = wellKnownSymbol('species');
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

  var engineIsNode = classofRaw(global_1.process) == 'process';

  var location = global_1.location;
  var set$1 = global_1.setImmediate;
  var clear = global_1.clearImmediate;
  var process = global_1.process;
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
        process.nextTick(runner(id));
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
  var process$1 = global_1.process;
  var Promise$1 = global_1.Promise;
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
  var flush, head, last, notify, toggle, node, promise, then;
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (engineIsNode && (parent = process$1.domain)) parent.exit();
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
        process$1.nextTick(flush);
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
  var f$5 = function (C) {
    return new PromiseCapability(C);
  };
  var newPromiseCapability = {
  	f: f$5
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

  var process$2 = global_1.process;
  var versions = process$2 && process$2.versions;
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

  var task$1 = task.set;
  var SPECIES$2 = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState$1 = internalState.get;
  var setInternalState$1 = internalState.set;
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
    constructor[SPECIES$2] = FakePromise;
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
      var state = getInternalState$1(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    Internal = function Promise(executor) {
      setInternalState$1(this, {
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
      var state = getInternalState$1(promise);
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

  var createMethod$1 = function (CONVERT_TO_STRING) {
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
    codeAt: createMethod$1(false),
    charAt: createMethod$1(true)
  };

  var charAt = stringMultibyte.charAt;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$2 = internalState.set;
  var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);
  defineIterator(String, 'String', function (iterated) {
    setInternalState$2(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  }, function next() {
    var state = getInternalState$2(this);
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

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;
  for (var COLLECTION_NAME in domIterables) {
    var Collection = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype) {
      if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$5] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG$3]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
      }
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  }

  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
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
  var f$6 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]'
      ? getWindowNames(it)
      : nativeGetOwnPropertyNames(toIndexedObject(it));
  };
  var objectGetOwnPropertyNamesExternal = {
  	f: f$6
  };

  var f$7 = wellKnownSymbol;
  var wellKnownSymbolWrapped = {
  	f: f$7
  };

  var defineProperty$1 = objectDefineProperty.f;
  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var SPECIES$3 = wellKnownSymbol('species');
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;
  var createMethod$2 = function (TYPE) {
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
    forEach: createMethod$2(0),
    map: createMethod$2(1),
    filter: createMethod$2(2),
    some: createMethod$2(3),
    every: createMethod$2(4),
    find: createMethod$2(5),
    findIndex: createMethod$2(6)
  };

  var $forEach = arrayIteration.forEach;
  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$1 = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
  var setInternalState$3 = internalState.set;
  var getInternalState$3 = internalState.getterFor(SYMBOL);
  var ObjectPrototype$1 = Object[PROTOTYPE$1];
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
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
    nativeDefineProperty$1(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
      nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty$1;
  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
    setInternalState$3(symbol, {
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
    if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
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
    if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
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
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
    var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
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
        if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };
    redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
      return getInternalState$3(this).tag;
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
          return getInternalState$3(this).description;
        }
      });
      {
        redefine(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
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

  var nativeReverse = [].reverse;
  var test$1 = [1, 2];
  _export({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
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

  var SPECIES$4 = wellKnownSymbol('species');
  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$4] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });
  var SPECIES$5 = wellKnownSymbol('species');
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
          Constructor = Constructor[SPECIES$5];
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

  for (var COLLECTION_NAME$1 in domIterables) {
    var Collection$1 = global_1[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
      createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype$1.forEach = arrayForEach;
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

  var previewStatusQuery=/* GraphQL */"\n\tquery PREVIEW_STATUS_QUERY($postId: Float!) {\n\t\twpGatsby {\n\t\t\tgatsbyPreviewStatus(nodeId: $postId) {\n\t\t\t\tpageNode {\n\t\t\t\t\tpath\n\t\t\t\t}\n\t\t\t\tstatusType\n\t\t\t\tremoteStatus\n\t\t\t\tstatusContext\n\t\t\t}\n\t\t}\n\t}\n",remoteStatuses=["NO_PAGE_CREATED_FOR_PREVIEWED_NODE","GATSBY_PREVIEW_PROCESS_ERROR","RECEIVED_PREVIEW_DATA_FROM_WRONG_URL"];/**
   * This function checks the preview status that Gatsby has stored in post meta for
   * the parent post of this preview
   * When the preview is ready, it calls onPreviewReadyUpdateUI() which updates the UI
   *
   * If a status besides PREVIEW_READY comes back, we wait a bit and try again
   *
   * This function doesn't return anything
   */function fetchPreviewStatusAndUpdateUI(){return _fetchPreviewStatusAndUpdateUI.apply(this,arguments)}function _fetchPreviewStatusAndUpdateUI(){return _fetchPreviewStatusAndUpdateUI=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p=arguments;return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=0<p.length&&void 0!==p[0]?p[0]:{},e=d.refetchCount,f=void 0===e?0:e,g=d.refetchDelay,h=void 0===g?500:g,a.next=3,fetch("/?".concat(initialState.graphqlEndpoint),{method:"POST",body:JSON.stringify({query:previewStatusQuery,variables:{postId:initialState.postId}}),headers:{"Content-Type":"application/json"}});case 3:return a.next=5,a.sent.json();case 5:if(i=a.sent,j=(null===i||void 0===i||null===(b=i.data)||void 0===b||null===(c=b.wpGatsby)||void 0===c?void 0:c.gatsbyPreviewStatus)||{},k=j.statusType,l=j.remoteStatus,m=j.statusContext,n=remoteStatuses.includes(l),!n){a.next=12;break}throw console.log({response:i}),clearTimeout(timeoutWarning),{remoteStatus:l,message:"Gatsby returned unsuccessful Preview status:\n".concat(l).concat(m?"\n\nWith additional context:\n".concat(m):"")};case 12:if("PREVIEW_READY"!==k){a.next=16;break}return clearTimeout(timeoutWarning),onPreviewReadyUpdateUI(i),a.abrupt("return");case 16:return o={// after 30 retries of 500ms, start checking every second
  30:1e3,// after 20 more retries of 1 second, start checking every 2 seconds
  50:2e3,// after 20 more retries of 2 seconds, start checking every 5 seconds
  70:5e3},f++,h=o[f]||h,a.next=21,new Promise(function(a){return setTimeout(function(){console.log({previewStatusCheck:{response:i,refetchCount:f,refetchDelay:h}}),console.log("Preview not yet updated, retrying..."),a();},h)});case 21:return a.next=23,fetchPreviewStatusAndUpdateUI({refetchCount:f,refetchDelay:h});case 23:case"end":return a.stop();}},a)})),_fetchPreviewStatusAndUpdateUI.apply(this,arguments)}function onPreviewReadyUpdateUI(a){var b,c,d=(null===a||void 0===a||null===(b=a.data)||void 0===b?void 0:b.wpGatsby)||{},e=d.gatsbyPreviewStatus;if(console.log({previewReady:{gatsbyPreviewStatus:e}}),!e||!e.statusType||null===e||void 0===e||null===(c=e.pageNode)||void 0===c||!c.path)throw Error("Received an improper response from the Preview server.");var f=document.getElementById("preview");// when the iframe loads we want our iframe loaded event to fire
  // so we can remove the loader
  f.addEventListener("load",onIframeLoadedHideLoaderUI),console.log("Loading Gatsby Preview in an iframe..."),f.src=initialState.previewFrontendUrl+e.pageNode.path;var g=new Event("wp-gatsby-preview-ready");document.dispatchEvent(g);}function onIframeLoadedHideLoaderUI(){var a=document.getElementById("loader");// this delay prevents a flash between
  // the iframe painting and the loader dissapearing
  console.log("Loaded Gatsby Preview!"),console.log(a),setTimeout(function(){// there is a fadeout css animation on this
  a.classList.add("loaded"),setTimeout(function(){// we wait a sec to display none so the css animation fadeout can complete
  a.style.display="none";},100);},50);}function doubleCheckIfPreviewFrontendIsOnline(){return _doubleCheckIfPreviewFrontendIsOnline.apply(this,arguments)}function _doubleCheckIfPreviewFrontendIsOnline(){return _doubleCheckIfPreviewFrontendIsOnline=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){var b;return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch(initialState.previewFrontendUrl);case 2:if(b=a.sent,!b.ok){a.next=9;break}if(initialState.previewWebhookIsOnline){a.next=7;break}return a.next=7,fetchPreviewStatusAndUpdateUI();case 7:a.next=10;break;case 9:throw Error("The Gatsby Preview instance can't be reached.");case 10:case"end":return a.stop();}},a)})),_doubleCheckIfPreviewFrontendIsOnline.apply(this,arguments)}

  start().catch(function(a){console.error(a),"complete"===document.readyState?showError(a):document.addEventListener("DOMContentLoaded",function(){showError(a);});});function start(){return _start.apply(this,arguments)}function _start(){return _start=asyncToGenerator(/*#__PURE__*/regenerator.mark(function a(){return regenerator.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.all([// optimistically try to load the UI
  initialState.previewWebhookIsOnline&&fetchPreviewStatusAndUpdateUI(),// Also check if the frontend has been online
  // since the last backend check
  doubleCheckIfPreviewFrontendIsOnline()]);case 2:case"end":return a.stop();}},a)})),_start.apply(this,arguments)}

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1jbGllbnQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtc3BlY2llcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLWluc3RhbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jbG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9taWNyb3Rhc2suanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BlcmZvcm0uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5kZXNjcmlwdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC50by1zdHJpbmctdGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkucmV2ZXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5mdW5jdGlvbi5uYW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm1hdGgudG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5qb2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLW5hdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZWVlNzU0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS1idWZmZXIuY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LWJ1ZmZlci5zbGljZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5zcGxpdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy50cmltLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHlwZWQtYXJyYXktY29uc3RydWN0b3JzLXJlcXVpcmUtd3JhcHBlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcG9zaXRpdmUtaW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vZmZzZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHlwZWQtYXJyYXktZnJvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3R5cGVkLWFycmF5LWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS51aW50OC1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1jb3B5LXdpdGhpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkuY29weS13aXRoaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmV2ZXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5maWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmZpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmZpbmQtaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LmZvci1lYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkuaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5qb2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWxhc3QtaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5Lmxhc3QtaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5Lm1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1yZWR1Y2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LnJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkucmVkdWNlLXJpZ2h0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5yZXZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnR5cGVkLWFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zb21lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy50eXBlZC1hcnJheS5zdWJhcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkudG8tbG9jYWxlLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMudHlwZWQtYXJyYXkudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS11cmwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mcm9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1wdW55Y29kZS10by1hc2NpaS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi51cmwtc2VhcmNoLXBhcmFtcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnVybC5qcyIsIi4uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIi4uL3NyYy9lcnJvci13YXJuaW5nLnRzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcy5qcyIsIi4uL3NyYy9wcmV2aWV3LXN0YXR1cy50cyIsIi4uL3NyYy9zdGFydC1wcmV2aWV3LWNsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgUFJFRkVSUkVEX1NUUklORykge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFBSRUZFUlJFRF9TVFJJTkcgJiYgdHlwZW9mIChmbiA9IGlucHV0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaW5wdXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVBSRUZFUlJFRF9TVFJJTkcgJiYgdHlwZW9mIChmbiA9IGlucHV0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZURlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy43LjAnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMjAgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgIVN5bWJvbC5zaGFtXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICBlbHNlIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2ludGVnZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc05hTihhcmd1bWVudCA9ICthcmd1bWVudCkgPyAwIDogKGFyZ3VtZW50ID4gMCA/IGZsb29yIDogY2VpbCkoYXJndW1lbnQpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAqL1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IGRvY3VtZW50LmRvbWFpbiAmJiBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gYWN0aXZlWERvY3VtZW50ID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIDogTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKCk7XG4gIHZhciBsZW5ndGggPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIE51bGxQcm90b09iamVjdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2xlbmd0aF1dO1xuICByZXR1cm4gTnVsbFByb3RvT2JqZWN0KCk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICB2YXIgc3RhdGU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIH1cbiAgICBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgICBpZiAoIXN0YXRlLnNvdXJjZSkge1xuICAgICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICAgIH1cbiAgfVxuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBzZXRHbG9iYWwoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCF1bnNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICB9IGVsc2UgaWYgKCFub1RhcmdldEdldCAmJiBPW2tleV0pIHtcbiAgICBzaW1wbGUgPSB0cnVlO1xuICB9XG4gIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0pO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gZmFsc2U7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxuLy8gYCVJdGVyYXRvclByb3RvdHlwZSVgIG9iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1vYmplY3RcbnZhciBJdGVyYXRvclByb3RvdHlwZSwgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlLCBhcnJheUl0ZXJhdG9yO1xuXG5pZiAoW10ua2V5cykge1xuICBhcnJheUl0ZXJhdG9yID0gW10ua2V5cygpO1xuICAvLyBTYWZhcmkgOCBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgaWYgKCEoJ25leHQnIGluIGFycmF5SXRlcmF0b3IpKSBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gdHJ1ZTtcbiAgZWxzZSB7XG4gICAgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoZ2V0UHJvdG90eXBlT2YoYXJyYXlJdGVyYXRvcikpO1xuICAgIGlmIChQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIEl0ZXJhdG9yUHJvdG90eXBlID0gUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG59XG5cbmlmIChJdGVyYXRvclByb3RvdHlwZSA9PSB1bmRlZmluZWQpIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5pZiAoIUlTX1BVUkUgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUQUcsIFNUQVRJQykge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IFNUQVRJQyA/IGl0IDogaXQucHJvdG90eXBlLCBUT19TVFJJTkdfVEFHKSkge1xuICAgIGRlZmluZVByb3BlcnR5KGl0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSXRlcmF0b3JzQ29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpO1xuXG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBJdGVyYXRvcnNDb3JlLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBJdGVyYXRvcnNDb3JlLkJVR0dZX1NBRkFSSV9JVEVSQVRPUlM7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcbnZhciBFTlRSSUVTID0gJ2VudHJpZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhYmxlLCBOQU1FLCBJdGVyYXRvckNvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuXG4gIHZhciBnZXRJdGVyYXRpb25NZXRob2QgPSBmdW5jdGlvbiAoS0lORCkge1xuICAgIGlmIChLSU5EID09PSBERUZBVUxUICYmIGRlZmF1bHRJdGVyYXRvcikgcmV0dXJuIGRlZmF1bHRJdGVyYXRvcjtcbiAgICBpZiAoIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgS0lORCBpbiBJdGVyYWJsZVByb3RvdHlwZSkgcmV0dXJuIEl0ZXJhYmxlUHJvdG90eXBlW0tJTkRdO1xuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzKTsgfTtcbiAgfTtcblxuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IGZhbHNlO1xuICB2YXIgSXRlcmFibGVQcm90b3R5cGUgPSBJdGVyYWJsZS5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVJdGVyYXRvciA9IEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXVxuICAgIHx8IEl0ZXJhYmxlUHJvdG90eXBlWydAQGl0ZXJhdG9yJ11cbiAgICB8fCBERUZBVUxUICYmIEl0ZXJhYmxlUHJvdG90eXBlW0RFRkFVTFRdO1xuICB2YXIgZGVmYXVsdEl0ZXJhdG9yID0gIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgbmF0aXZlSXRlcmF0b3IgfHwgZ2V0SXRlcmF0aW9uTWV0aG9kKERFRkFVTFQpO1xuICB2YXIgYW55TmF0aXZlSXRlcmF0b3IgPSBOQU1FID09ICdBcnJheScgPyBJdGVyYWJsZVByb3RvdHlwZS5lbnRyaWVzIHx8IG5hdGl2ZUl0ZXJhdG9yIDogbmF0aXZlSXRlcmF0b3I7XG4gIHZhciBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIG1ldGhvZHMsIEtFWTtcblxuICAvLyBmaXggbmF0aXZlXG4gIGlmIChhbnlOYXRpdmVJdGVyYXRvcikge1xuICAgIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGFueU5hdGl2ZUl0ZXJhdG9yLmNhbGwobmV3IEl0ZXJhYmxlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIGlmICghSVNfUFVSRSAmJiBnZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUpICE9PSBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICBzZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuYXRpdmVJdGVyYXRvci5jYWxsKHRoaXMpOyB9O1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvcik7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICByZWRlZmluZShJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbmlmICghVE9fU1RSSU5HX1RBR19TVVBQT1JUKSB7XG4gIHJlZGVmaW5lKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIHRvU3RyaW5nLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbn1cbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlByb21pc2U7XG4iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgJyArIChuYW1lID8gbmFtZSArICcgJyA6ICcnKSArICdpbnZvY2F0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b3R5cGVbSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gIHZhciByZXR1cm5NZXRob2QgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gIGlmIChyZXR1cm5NZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBhbk9iamVjdChyZXR1cm5NZXRob2QuY2FsbChpdGVyYXRvcikpLnZhbHVlO1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpdGVyYXRvckNsb3NlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlJyk7XG5cbnZhciBSZXN1bHQgPSBmdW5jdGlvbiAoc3RvcHBlZCwgcmVzdWx0KSB7XG4gIHRoaXMuc3RvcHBlZCA9IHN0b3BwZWQ7XG4gIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIHVuYm91bmRGdW5jdGlvbiwgb3B0aW9ucykge1xuICB2YXIgdGhhdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aGF0O1xuICB2YXIgQVNfRU5UUklFUyA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5BU19FTlRSSUVTKTtcbiAgdmFyIElTX0lURVJBVE9SID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklTX0lURVJBVE9SKTtcbiAgdmFyIElOVEVSUlVQVEVEID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklOVEVSUlVQVEVEKTtcbiAgdmFyIGZuID0gYmluZCh1bmJvdW5kRnVuY3Rpb24sIHRoYXQsIDEgKyBBU19FTlRSSUVTICsgSU5URVJSVVBURUQpO1xuICB2YXIgaXRlcmF0b3IsIGl0ZXJGbiwgaW5kZXgsIGxlbmd0aCwgcmVzdWx0LCBuZXh0LCBzdGVwO1xuXG4gIHZhciBzdG9wID0gZnVuY3Rpb24gKGNvbmRpdGlvbikge1xuICAgIGlmIChpdGVyYXRvcikgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHQodHJ1ZSwgY29uZGl0aW9uKTtcbiAgfTtcblxuICB2YXIgY2FsbEZuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKEFTX0VOVFJJRVMpIHtcbiAgICAgIGFuT2JqZWN0KHZhbHVlKTtcbiAgICAgIHJldHVybiBJTlRFUlJVUFRFRCA/IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSwgc3RvcCkgOiBmbih2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0gcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWUsIHN0b3ApIDogZm4odmFsdWUpO1xuICB9O1xuXG4gIGlmIChJU19JVEVSQVRPUikge1xuICAgIGl0ZXJhdG9yID0gaXRlcmFibGU7XG4gIH0gZWxzZSB7XG4gICAgaXRlckZuID0gZ2V0SXRlcmF0b3JNZXRob2QoaXRlcmFibGUpO1xuICAgIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBpdGVyYWJsZScpO1xuICAgIC8vIG9wdGltaXNhdGlvbiBmb3IgYXJyYXkgaXRlcmF0b3JzXG4gICAgaWYgKGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyRm4pKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbEZuKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG4gICAgfVxuICAgIGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpO1xuICB9XG5cbiAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gIHdoaWxlICghKHN0ZXAgPSBuZXh0LmNhbGwoaXRlcmF0b3IpKS5kb25lKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGNhbGxGbihzdGVwLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmIHJlc3VsdCBpbnN0YW5jZW9mIFJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oaXBob25lfGlwb2R8aXBhZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSkuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhciA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChJU19OT0RFKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2socnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIC8vIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjI0XG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwgJiYgIUlTX0lPUykge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gYmluZChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiZcbiAgICB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICFnbG9iYWwuaW1wb3J0U2NyaXB0cyAmJlxuICAgIGxvY2F0aW9uICYmIGxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgIWZhaWxzKHBvc3QpXG4gICkge1xuICAgIGRlZmVyID0gcG9zdDtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChydW5uZXIoaWQpLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbi8vIE5vZGUuanMgMTEgc2hvd3MgRXhwZXJpbWVudGFsV2FybmluZyBvbiBnZXR0aW5nIGBxdWV1ZU1pY3JvdGFza2BcbnZhciBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCAncXVldWVNaWNyb3Rhc2snKTtcbnZhciBxdWV1ZU1pY3JvdGFzayA9IHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciAmJiBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IudmFsdWU7XG5cbnZhciBmbHVzaCwgaGVhZCwgbGFzdCwgbm90aWZ5LCB0b2dnbGUsIG5vZGUsIHByb21pc2UsIHRoZW47XG5cbi8vIG1vZGVybiBlbmdpbmVzIGhhdmUgcXVldWVNaWNyb3Rhc2sgbWV0aG9kXG5pZiAoIXF1ZXVlTWljcm90YXNrKSB7XG4gIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChJU19OT0RFICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIGlmICghSVNfSU9TICYmICFJU19OT0RFICYmIE11dGF0aW9uT2JzZXJ2ZXIgJiYgZG9jdW1lbnQpIHtcbiAgICB0b2dnbGUgPSB0cnVlO1xuICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIHRoZW4gPSBwcm9taXNlLnRoZW47XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhlbi5jYWxsKHByb21pc2UsIGZsdXNoKTtcbiAgICB9O1xuICAvLyBOb2RlLmpzIHdpdGhvdXQgcHJvbWlzZXNcbiAgfSBlbHNlIGlmIChJU19OT0RFKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBxdWV1ZU1pY3JvdGFzayB8fCBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICBpZiAoIWhlYWQpIHtcbiAgICBoZWFkID0gdGFzaztcbiAgICBub3RpZnkoKTtcbiAgfSBsYXN0ID0gdGFzaztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG5cbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICB2YXIgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlO1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGNvbnNvbGUuZXJyb3IoYSkgOiBjb25zb2xlLmVycm9yKGEsIGIpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGVycm9yOiBmYWxzZSwgdmFsdWU6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IGVycm9yOiB0cnVlLCB2YWx1ZTogZXJyb3IgfTtcbiAgfVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdICsgbWF0Y2hbMV07XG59IGVsc2UgaWYgKHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbiAmJiArdmVyc2lvbjtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIE5hdGl2ZVByb21pc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXByb21pc2UtY29uc3RydWN0b3InKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lLWFsbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgc2V0U3BlY2llcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtc3BlY2llcycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcbnZhciBjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21pY3JvdGFzaycpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIGhvc3RSZXBvcnRFcnJvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFBST01JU0UpO1xudmFyIFByb21pc2VDb25zdHJ1Y3RvciA9IE5hdGl2ZVByb21pc2U7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgJGZldGNoID0gZ2V0QnVpbHRJbignZmV0Y2gnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG52YXIgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHk7XG52YXIgRElTUEFUQ0hfRVZFTlQgPSAhIShkb2N1bWVudCAmJiBkb2N1bWVudC5jcmVhdGVFdmVudCAmJiBnbG9iYWwuZGlzcGF0Y2hFdmVudCk7XG52YXIgTkFUSVZFX1JFSkVDVElPTl9FVkVOVCA9IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJztcbnZhciBVTkhBTkRMRURfUkVKRUNUSU9OID0gJ3VuaGFuZGxlZHJlamVjdGlvbic7XG52YXIgUkVKRUNUSU9OX0hBTkRMRUQgPSAncmVqZWN0aW9uaGFuZGxlZCc7XG52YXIgUEVORElORyA9IDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG52YXIgSEFORExFRCA9IDE7XG52YXIgVU5IQU5ETEVEID0gMjtcbnZhciBJbnRlcm5hbCwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFByb21pc2VXcmFwcGVyLCBuYXRpdmVUaGVuO1xuXG52YXIgRk9SQ0VEID0gaXNGb3JjZWQoUFJPTUlTRSwgZnVuY3Rpb24gKCkge1xuICB2YXIgR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSA9IGluc3BlY3RTb3VyY2UoUHJvbWlzZUNvbnN0cnVjdG9yKSAhPT0gU3RyaW5nKFByb21pc2VDb25zdHJ1Y3Rvcik7XG4gIGlmICghR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSkge1xuICAgIC8vIFY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAvLyBXZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgIGlmIChWOF9WRVJTSU9OID09PSA2NikgcmV0dXJuIHRydWU7XG4gICAgLy8gVW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIGlmICghSVNfTk9ERSAmJiAhTkFUSVZFX1JFSkVDVElPTl9FVkVOVCkgcmV0dXJuIHRydWU7XG4gIH1cbiAgLy8gV2UgbmVlZCBQcm9taXNlI2ZpbmFsbHkgaW4gdGhlIHB1cmUgdmVyc2lvbiBmb3IgcHJldmVudGluZyBwcm90b3R5cGUgcG9sbHV0aW9uXG4gIGlmIChJU19QVVJFICYmICFQcm9taXNlQ29uc3RydWN0b3IucHJvdG90eXBlWydmaW5hbGx5J10pIHJldHVybiB0cnVlO1xuICAvLyBXZSBjYW4ndCB1c2UgQEBzcGVjaWVzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuICAvLyBkZW9wdGltaXphdGlvbiBhbmQgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxuICBpZiAoVjhfVkVSU0lPTiA+PSA1MSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoUHJvbWlzZUNvbnN0cnVjdG9yKSkgcmV0dXJuIGZhbHNlO1xuICAvLyBEZXRlY3QgY29ycmVjdG5lc3Mgb2Ygc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICB2YXIgcHJvbWlzZSA9IFByb21pc2VDb25zdHJ1Y3Rvci5yZXNvbHZlKDEpO1xuICB2YXIgRmFrZVByb21pc2UgPSBmdW5jdGlvbiAoZXhlYykge1xuICAgIGV4ZWMoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xuICB9O1xuICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yID0ge307XG4gIGNvbnN0cnVjdG9yW1NQRUNJRVNdID0gRmFrZVByb21pc2U7XG4gIHJldHVybiAhKHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pIGluc3RhbmNlb2YgRmFrZVByb21pc2UpO1xufSk7XG5cbnZhciBJTkNPUlJFQ1RfSVRFUkFUSU9OID0gRk9SQ0VEIHx8ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIFByb21pc2VDb25zdHJ1Y3Rvci5hbGwoaXRlcmFibGUpWydjYXRjaCddKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG59KTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG5cbnZhciBub3RpZnkgPSBmdW5jdGlvbiAoc3RhdGUsIGlzUmVqZWN0KSB7XG4gIGlmIChzdGF0ZS5ub3RpZmllZCkgcmV0dXJuO1xuICBzdGF0ZS5ub3RpZmllZCA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHN0YXRlLnJlYWN0aW9ucztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBzdGF0ZS52YWx1ZTtcbiAgICB2YXIgb2sgPSBzdGF0ZS5zdGF0ZSA9PSBGVUxGSUxMRUQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gY2hhaW5baW5kZXgrK107XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZWplY3Rpb24gPT09IFVOSEFORExFRCkgb25IYW5kbGVVbmhhbmRsZWQoc3RhdGUpO1xuICAgICAgICAgICAgc3RhdGUucmVqZWN0aW9uID0gSEFORExFRDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gY2FuIHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGF0ZS5yZWFjdGlvbnMgPSBbXTtcbiAgICBzdGF0ZS5ub3RpZmllZCA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhc3RhdGUucmVqZWN0aW9uKSBvblVuaGFuZGxlZChzdGF0ZSk7XG4gIH0pO1xufTtcblxudmFyIGRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAobmFtZSwgcHJvbWlzZSwgcmVhc29uKSB7XG4gIHZhciBldmVudCwgaGFuZGxlcjtcbiAgaWYgKERJU1BBVENIX0VWRU5UKSB7XG4gICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldmVudC5wcm9taXNlID0gcHJvbWlzZTtcbiAgICBldmVudC5yZWFzb24gPSByZWFzb247XG4gICAgZXZlbnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKTtcbiAgICBnbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH0gZWxzZSBldmVudCA9IHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiByZWFzb24gfTtcbiAgaWYgKCFOQVRJVkVfUkVKRUNUSU9OX0VWRU5UICYmIChoYW5kbGVyID0gZ2xvYmFsWydvbicgKyBuYW1lXSkpIGhhbmRsZXIoZXZlbnQpO1xuICBlbHNlIGlmIChuYW1lID09PSBVTkhBTkRMRURfUkVKRUNUSU9OKSBob3N0UmVwb3J0RXJyb3JzKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCByZWFzb24pO1xufTtcblxudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHN0YXRlLmZhY2FkZTtcbiAgICB2YXIgdmFsdWUgPSBzdGF0ZS52YWx1ZTtcbiAgICB2YXIgSVNfVU5IQU5ETEVEID0gaXNVbmhhbmRsZWQoc3RhdGUpO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKElTX1VOSEFORExFRCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChJU19OT0RFKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBkaXNwYXRjaEV2ZW50KFVOSEFORExFRF9SRUpFQ1RJT04sIHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHN0YXRlLnJlamVjdGlvbiA9IElTX05PREUgfHwgaXNVbmhhbmRsZWQoc3RhdGUpID8gVU5IQU5ETEVEIDogSEFORExFRDtcbiAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHRocm93IHJlc3VsdC52YWx1ZTtcbiAgICB9XG4gIH0pO1xufTtcblxudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5yZWplY3Rpb24gIT09IEhBTkRMRUQgJiYgIXN0YXRlLnBhcmVudDtcbn07XG5cbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBzdGF0ZS5mYWNhZGU7XG4gICAgaWYgKElTX05PREUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBkaXNwYXRjaEV2ZW50KFJFSkVDVElPTl9IQU5ETEVELCBwcm9taXNlLCBzdGF0ZS52YWx1ZSk7XG4gIH0pO1xufTtcblxudmFyIGJpbmQgPSBmdW5jdGlvbiAoZm4sIHN0YXRlLCB1bndyYXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGZuKHN0YXRlLCB2YWx1ZSwgdW53cmFwKTtcbiAgfTtcbn07XG5cbnZhciBpbnRlcm5hbFJlamVjdCA9IGZ1bmN0aW9uIChzdGF0ZSwgdmFsdWUsIHVud3JhcCkge1xuICBpZiAoc3RhdGUuZG9uZSkgcmV0dXJuO1xuICBzdGF0ZS5kb25lID0gdHJ1ZTtcbiAgaWYgKHVud3JhcCkgc3RhdGUgPSB1bndyYXA7XG4gIHN0YXRlLnZhbHVlID0gdmFsdWU7XG4gIHN0YXRlLnN0YXRlID0gUkVKRUNURUQ7XG4gIG5vdGlmeShzdGF0ZSwgdHJ1ZSk7XG59O1xuXG52YXIgaW50ZXJuYWxSZXNvbHZlID0gZnVuY3Rpb24gKHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgdHJ5IHtcbiAgICBpZiAoc3RhdGUuZmFjYWRlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgdmFyIHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKTtcbiAgICBpZiAodGhlbikge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IGRvbmU6IGZhbHNlIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlc29sdmUsIHdyYXBwZXIsIHN0YXRlKSxcbiAgICAgICAgICAgIGJpbmQoaW50ZXJuYWxSZWplY3QsIHdyYXBwZXIsIHN0YXRlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaW50ZXJuYWxSZWplY3Qod3JhcHBlciwgZXJyb3IsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICBzdGF0ZS5zdGF0ZSA9IEZVTEZJTExFRDtcbiAgICAgIG5vdGlmeShzdGF0ZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpbnRlcm5hbFJlamVjdCh7IGRvbmU6IGZhbHNlIH0sIGVycm9yLCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoRk9SQ0VEKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFByb21pc2VDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsIFByb21pc2VDb25zdHJ1Y3RvciwgUFJPTUlTRSk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGJpbmQoaW50ZXJuYWxSZXNvbHZlLCBzdGF0ZSksIGJpbmQoaW50ZXJuYWxSZWplY3QsIHN0YXRlKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGludGVybmFsUmVqZWN0KHN0YXRlLCBlcnJvcik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgICB0eXBlOiBQUk9NSVNFLFxuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICBub3RpZmllZDogZmFsc2UsXG4gICAgICBwYXJlbnQ6IGZhbHNlLFxuICAgICAgcmVhY3Rpb25zOiBbXSxcbiAgICAgIHJlamVjdGlvbjogZmFsc2UsXG4gICAgICBzdGF0ZTogUEVORElORyxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS50aGVuYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcm9taXNlLnByb3RvdHlwZS50aGVuXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQcm9taXNlU3RhdGUodGhpcyk7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgUHJvbWlzZUNvbnN0cnVjdG9yKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IElTX05PREUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHN0YXRlLnBhcmVudCA9IHRydWU7XG4gICAgICBzdGF0ZS5yZWFjdGlvbnMucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAoc3RhdGUuc3RhdGUgIT0gUEVORElORykgbm90aWZ5KHN0YXRlLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS5jYXRjaGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZShwcm9taXNlKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGJpbmQoaW50ZXJuYWxSZXNvbHZlLCBzdGF0ZSk7XG4gICAgdGhpcy5yZWplY3QgPSBiaW5kKGludGVybmFsUmVqZWN0LCBzdGF0ZSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09IFByb21pc2VDb25zdHJ1Y3RvciB8fCBDID09PSBQcm9taXNlV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xuXG4gIGlmICghSVNfUFVSRSAmJiB0eXBlb2YgTmF0aXZlUHJvbWlzZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgbmF0aXZlVGhlbiA9IE5hdGl2ZVByb21pc2UucHJvdG90eXBlLnRoZW47XG5cbiAgICAvLyB3cmFwIG5hdGl2ZSBQcm9taXNlI3RoZW4gZm9yIG5hdGl2ZSBhc3luYyBmdW5jdGlvbnNcbiAgICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ3RoZW4nLCBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2VDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG5hdGl2ZVRoZW4uY2FsbCh0aGF0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY0MFxuICAgIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xuXG4gICAgLy8gd3JhcCBmZXRjaCByZXN1bHRcbiAgICBpZiAodHlwZW9mICRmZXRjaCA9PSAnZnVuY3Rpb24nKSAkKHsgZ2xvYmFsOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShQcm9taXNlQ29uc3RydWN0b3IsICRmZXRjaC5hcHBseShnbG9iYWwsIGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgUHJvbWlzZTogUHJvbWlzZUNvbnN0cnVjdG9yXG59KTtcblxuc2V0VG9TdHJpbmdUYWcoUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFLCBmYWxzZSwgdHJ1ZSk7XG5zZXRTcGVjaWVzKFBST01JU0UpO1xuXG5Qcm9taXNlV3JhcHBlciA9IGdldEJ1aWx0SW4oUFJPTUlTRSk7XG5cbi8vIHN0YXRpY3NcbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVqZWN0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZWplY3RcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgY2FwYWJpbGl0eS5yZWplY3QuY2FsbCh1bmRlZmluZWQsIHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElTX1BVUkUgfHwgRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVzb2x2ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXByb21pc2UucmVzb2x2ZVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoSVNfUFVSRSAmJiB0aGlzID09PSBQcm9taXNlV3JhcHBlciA/IFByb21pc2VDb25zdHJ1Y3RvciA6IHRoaXMsIHgpO1xuICB9XG59KTtcblxuJCh7IHRhcmdldDogUFJPTUlTRSwgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgLy8gYFByb21pc2UuYWxsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbGxcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIGBQcm9taXNlLnJhY2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJhY2VcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IFN0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBBcnJheUl0ZXJhdG9yTWV0aG9kcyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvck1ldGhvZHMudmFsdWVzO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUpIHtcbiAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gIT09IEFycmF5VmFsdWVzKSB0cnkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdID0gQXJyYXlWYWx1ZXM7XG4gICAgfVxuICAgIGlmICghQ29sbGVjdGlvblByb3RvdHlwZVtUT19TVFJJTkdfVEFHXSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gICAgfVxuICAgIGlmIChET01JdGVyYWJsZXNbQ09MTEVDVElPTl9OQU1FXSkgZm9yICh2YXIgTUVUSE9EX05BTUUgaW4gQXJyYXlJdGVyYXRvck1ldGhvZHMpIHtcbiAgICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdICE9PSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pIHRyeSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBNRVRIT0RfTkFNRSwgQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdID0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpLmY7XG5cbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMoaXQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XSdcbiAgICA/IGdldFdpbmRvd05hbWVzKGl0KVxuICAgIDogbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoaXQpKTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbmV4cG9ydHMuZiA9IHdlbGxLbm93blN5bWJvbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgdmFyIFN5bWJvbCA9IHBhdGguU3ltYm9sIHx8IChwYXRoLlN5bWJvbCA9IHt9KTtcbiAgaWYgKCFoYXMoU3ltYm9sLCBOQU1FKSkgZGVmaW5lUHJvcGVydHkoU3ltYm9sLCBOQU1FLCB7XG4gICAgdmFsdWU6IHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZihOQU1FKVxuICB9KTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmIChJU19FVkVSWSkgcmV0dXJuIGZhbHNlOyAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHRhcmdldDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gIGZpbHRlcjogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgZmluZDogY3JlYXRlTWV0aG9kKDUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNilcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIG5hdGl2ZU9iamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcblxudmFyIEhJRERFTiA9IHNoYXJlZEtleSgnaGlkZGVuJyk7XG52YXIgU1lNQk9MID0gJ1N5bWJvbCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1lNQk9MKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkc3RyaW5naWZ5ID0gZ2V0QnVpbHRJbignSlNPTicsICdzdHJpbmdpZnknKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0gcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZjtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N0cmluZy10by1zeW1ib2wtcmVnaXN0cnknKTtcbnZhciBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtdG8tc3RyaW5nLXJlZ2lzdHJ5Jyk7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBVU0VfU0VUVEVSID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdENyZWF0ZShuYXRpdmVEZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoTywgUCwgQXR0cmlidXRlcykge1xuICB2YXIgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciA9IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIFApO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcikgZGVsZXRlIE9iamVjdFByb3RvdHlwZVtQXTtcbiAgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yICYmIE8gIT09IE9iamVjdFByb3RvdHlwZSkge1xuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZSwgUCwgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcik7XG4gIH1cbn0gOiBuYXRpdmVEZWZpbmVQcm9wZXJ0eTtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnLCBkZXNjcmlwdGlvbikge1xuICB2YXIgc3ltYm9sID0gQWxsU3ltYm9sc1t0YWddID0gbmF0aXZlT2JqZWN0Q3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHNldEludGVybmFsU3RhdGUoc3ltYm9sLCB7XG4gICAgdHlwZTogU1lNQk9MLFxuICAgIHRhZzogdGFnLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICB9KTtcbiAgaWYgKCFERVNDUklQVE9SUykgc3ltYm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHJldHVybiBzeW1ib2w7XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGl0KSBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBpZiAoTyA9PT0gT2JqZWN0UHJvdG90eXBlKSAkZGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCwgQXR0cmlidXRlcyk7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUF0dHJpYnV0ZXMuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoTywgSElEREVOKSkgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgSElEREVOLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwge30pKTtcbiAgICAgIE9bSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhPLCBISURERU4pICYmIE9bSElEREVOXVtrZXldKSBPW0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgQXR0cmlidXRlcyA9IG5hdGl2ZU9iamVjdENyZWF0ZShBdHRyaWJ1dGVzLCB7IGVudW1lcmFibGU6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzY3JpcHRvcihPLCBrZXksIEF0dHJpYnV0ZXMpO1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBrZXksIEF0dHJpYnV0ZXMpO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIgcHJvcGVydGllcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKHByb3BlcnRpZXMpLmNvbmNhdCgkZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BlcnRpZXMpKTtcbiAgJGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghREVTQ1JJUFRPUlMgfHwgJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocHJvcGVydGllcywga2V5KSkgJGRlZmluZVByb3BlcnR5KE8sIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgfSk7XG4gIHJldHVybiBPO1xufTtcblxudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gbmF0aXZlT2JqZWN0Q3JlYXRlKE8pIDogJGRlZmluZVByb3BlcnRpZXMobmF0aXZlT2JqZWN0Q3JlYXRlKE8pLCBQcm9wZXJ0aWVzKTtcbn07XG5cbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBQID0gdG9QcmltaXRpdmUoViwgdHJ1ZSk7XG4gIHZhciBlbnVtZXJhYmxlID0gbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBQKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywgUCkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZW51bWVyYWJsZSB8fCAhaGFzKHRoaXMsIFApIHx8ICFoYXMoQWxsU3ltYm9scywgUCkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW1BdID8gZW51bWVyYWJsZSA6IHRydWU7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIHZhciBpdCA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIGRlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG4gIGlmIChkZXNjcmlwdG9yICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIHtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9yO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhoaWRkZW5LZXlzLCBrZXkpKSByZXN1bHQucHVzaChrZXkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pIHtcbiAgdmFyIElTX09CSkVDVF9QUk9UT1RZUEUgPSBPID09PSBPYmplY3RQcm90b3R5cGU7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMoSVNfT0JKRUNUX1BST1RPVFlQRSA/IE9iamVjdFByb3RvdHlwZVN5bWJvbHMgOiB0b0luZGV4ZWRPYmplY3QoTykpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gICRmb3JFYWNoKG5hbWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICghSVNfT0JKRUNUX1BST1RPVFlQRSB8fCBoYXMoT2JqZWN0UHJvdG90eXBlLCBrZXkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN5bWJvbC1jb25zdHJ1Y3RvclxuaWYgKCFOQVRJVkVfU1lNQk9MKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICFhcmd1bWVudHMubGVuZ3RoIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHRhZyA9IHVpZChkZXNjcmlwdGlvbik7XG4gICAgdmFyIHNldHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSkgc2V0dGVyLmNhbGwoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjcmlwdG9yKHRoaXMsIHRhZywgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgVVNFX1NFVFRFUikgc2V0U3ltYm9sRGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogc2V0dGVyIH0pO1xuICAgIHJldHVybiB3cmFwKHRhZywgZGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykudGFnO1xuICB9KTtcblxuICByZWRlZmluZSgkU3ltYm9sLCAnd2l0aG91dFNldHRlcicsIGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiB3cmFwKHVpZChkZXNjcmlwdGlvbiksIGRlc2NyaXB0aW9uKTtcbiAgfSk7XG5cbiAgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3ZWxsS25vd25TeW1ib2wobmFtZSksIG5hbWUpO1xuICB9O1xuXG4gIGlmIChERVNDUklQVE9SUykge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLVN5bWJvbC1kZXNjcmlwdGlvblxuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgJ2Rlc2NyaXB0aW9uJywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBkZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFJU19QVVJFKSB7XG4gICAgICByZWRlZmluZShPYmplY3RQcm90b3R5cGUsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgeyB1bnNhZmU6IHRydWUgfSk7XG4gICAgfVxuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgU3ltYm9sOiAkU3ltYm9sXG59KTtcblxuJGZvckVhY2gob2JqZWN0S2V5cyhXZWxsS25vd25TeW1ib2xzU3RvcmUpLCBmdW5jdGlvbiAobmFtZSkge1xuICBkZWZpbmVXZWxsS25vd25TeW1ib2wobmFtZSk7XG59KTtcblxuJCh7IHRhcmdldDogU1lNQk9MLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYFN5bWJvbC5mb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wuZm9yXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhrZXkpO1xuICAgIGlmIChoYXMoU3RyaW5nVG9TeW1ib2xSZWdpc3RyeSwgc3RyaW5nKSkgcmV0dXJuIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnlbc3RyaW5nXTtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbChzdHJpbmcpO1xuICAgIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnlbc3RyaW5nXSA9IHN5bWJvbDtcbiAgICBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5W3N5bWJvbF0gPSBzdHJpbmc7XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfSxcbiAgLy8gYFN5bWJvbC5rZXlGb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wua2V5Zm9yXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sJyk7XG4gICAgaWYgKGhhcyhTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5LCBzeW0pKSByZXR1cm4gU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1dO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gZmFsc2U7IH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yc1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Jcbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eXN5bWJvbHNcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gQ2hyb21lIDM4IGFuZCAzOSBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgZmFpbHMgb24gcHJpbWl0aXZlc1xuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzQ0M1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogZmFpbHMoZnVuY3Rpb24gKCkgeyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZigxKTsgfSkgfSwge1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICAgIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuLy8gYEpTT04uc3RyaW5naWZ5YCBtZXRob2QgYmVoYXZpb3Igd2l0aCBzeW1ib2xzXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1qc29uLnN0cmluZ2lmeVxuaWYgKCRzdHJpbmdpZnkpIHtcbiAgdmFyIEZPUkNFRF9KU09OX1NUUklOR0lGWSA9ICFOQVRJVkVfU1lNQk9MIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbCgpO1xuICAgIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gICAgcmV0dXJuICRzdHJpbmdpZnkoW3N5bWJvbF0pICE9ICdbbnVsbF0nXG4gICAgICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgICAgIHx8ICRzdHJpbmdpZnkoeyBhOiBzeW1ib2wgfSkgIT0gJ3t9J1xuICAgICAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgICAgIHx8ICRzdHJpbmdpZnkoT2JqZWN0KHN5bWJvbCkpICE9ICd7fSc7XG4gIH0pO1xuXG4gICQoeyB0YXJnZXQ6ICdKU09OJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRURfSlNPTl9TVFJJTkdJRlkgfSwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0LCByZXBsYWNlciwgc3BhY2UpIHtcbiAgICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICAgIHZhciBpbmRleCA9IDE7XG4gICAgICB2YXIgJHJlcGxhY2VyO1xuICAgICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpbmRleCkgYXJncy5wdXNoKGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgICAkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgICByZXR1cm4gJHN0cmluZ2lmeS5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9wcmltaXRpdmVcbmlmICghJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0pIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG59XG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZ1xuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgU1lNQk9MKTtcblxuaGlkZGVuS2V5c1tISURERU5dID0gdHJ1ZTtcbiIsIi8vIGBTeW1ib2wucHJvdG90eXBlLmRlc2NyaXB0aW9uYCBnZXR0ZXJcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUuZGVzY3JpcHRpb25cbid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xuXG52YXIgTmF0aXZlU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcblxuaWYgKERFU0NSSVBUT1JTICYmIHR5cGVvZiBOYXRpdmVTeW1ib2wgPT0gJ2Z1bmN0aW9uJyAmJiAoISgnZGVzY3JpcHRpb24nIGluIE5hdGl2ZVN5bWJvbC5wcm90b3R5cGUpIHx8XG4gIC8vIFNhZmFyaSAxMiBidWdcbiAgTmF0aXZlU3ltYm9sKCkuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZFxuKSkge1xuICB2YXIgRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlID0ge307XG4gIC8vIHdyYXAgU3ltYm9sIGNvbnN0cnVjdG9yIGZvciBjb3JyZWN0IHdvcmsgd2l0aCB1bmRlZmluZWQgZGVzY3JpcHRpb25cbiAgdmFyIFN5bWJvbFdyYXBwZXIgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBTdHJpbmcoYXJndW1lbnRzWzBdKTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcyBpbnN0YW5jZW9mIFN5bWJvbFdyYXBwZXJcbiAgICAgID8gbmV3IE5hdGl2ZVN5bWJvbChkZXNjcmlwdGlvbilcbiAgICAgIC8vIGluIEVkZ2UgMTMsIFN0cmluZyhTeW1ib2wodW5kZWZpbmVkKSkgPT09ICdTeW1ib2wodW5kZWZpbmVkKSdcbiAgICAgIDogZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/IE5hdGl2ZVN5bWJvbCgpIDogTmF0aXZlU3ltYm9sKGRlc2NyaXB0aW9uKTtcbiAgICBpZiAoZGVzY3JpcHRpb24gPT09ICcnKSBFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmVbcmVzdWx0XSA9IHRydWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhTeW1ib2xXcmFwcGVyLCBOYXRpdmVTeW1ib2wpO1xuICB2YXIgc3ltYm9sUHJvdG90eXBlID0gU3ltYm9sV3JhcHBlci5wcm90b3R5cGUgPSBOYXRpdmVTeW1ib2wucHJvdG90eXBlO1xuICBzeW1ib2xQcm90b3R5cGUuY29uc3RydWN0b3IgPSBTeW1ib2xXcmFwcGVyO1xuXG4gIHZhciBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIG5hdGl2ZSA9IFN0cmluZyhOYXRpdmVTeW1ib2woJ3Rlc3QnKSkgPT0gJ1N5bWJvbCh0ZXN0KSc7XG4gIHZhciByZWdleHAgPSAvXlN5bWJvbFxcKCguKilcXClbXildKyQvO1xuICBkZWZpbmVQcm9wZXJ0eShzeW1ib2xQcm90b3R5cGUsICdkZXNjcmlwdGlvbicsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBkZXNjcmlwdGlvbigpIHtcbiAgICAgIHZhciBzeW1ib2wgPSBpc09iamVjdCh0aGlzKSA/IHRoaXMudmFsdWVPZigpIDogdGhpcztcbiAgICAgIHZhciBzdHJpbmcgPSBzeW1ib2xUb1N0cmluZy5jYWxsKHN5bWJvbCk7XG4gICAgICBpZiAoaGFzKEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZSwgc3ltYm9sKSkgcmV0dXJuICcnO1xuICAgICAgdmFyIGRlc2MgPSBuYXRpdmUgPyBzdHJpbmcuc2xpY2UoNywgLTEpIDogc3RyaW5nLnJlcGxhY2UocmVnZXhwLCAnJDEnKTtcbiAgICAgIHJldHVybiBkZXNjID09PSAnJyA/IHVuZGVmaW5lZCA6IGRlc2M7XG4gICAgfVxuICB9KTtcblxuICAkKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgIFN5bWJvbDogU3ltYm9sV3JhcHBlclxuICB9KTtcbn1cbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuYXN5bmNJdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN5bWJvbC5hc3luY2l0ZXJhdG9yXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2FzeW5jSXRlcmF0b3InKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaXRlcmF0b3JgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wuaXRlcmF0b3JcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wudG9TdHJpbmdUYWdgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zeW1ib2wudG9zdHJpbmd0YWdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsLG5vLXRocm93LWxpdGVyYWxcbiAgICBtZXRob2QuY2FsbChudWxsLCBhcmd1bWVudCB8fCBmdW5jdGlvbiAoKSB7IHRocm93IDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGNhY2hlID0ge307XG5cbnZhciB0aHJvd2VyID0gZnVuY3Rpb24gKGl0KSB7IHRocm93IGl0OyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgb3B0aW9ucykge1xuICBpZiAoaGFzKGNhY2hlLCBNRVRIT0RfTkFNRSkpIHJldHVybiBjYWNoZVtNRVRIT0RfTkFNRV07XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICB2YXIgQUNDRVNTT1JTID0gaGFzKG9wdGlvbnMsICdBQ0NFU1NPUlMnKSA/IG9wdGlvbnMuQUNDRVNTT1JTIDogZmFsc2U7XG4gIHZhciBhcmd1bWVudDAgPSBoYXMob3B0aW9ucywgMCkgPyBvcHRpb25zWzBdIDogdGhyb3dlcjtcbiAgdmFyIGFyZ3VtZW50MSA9IGhhcyhvcHRpb25zLCAxKSA/IG9wdGlvbnNbMV0gOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIGNhY2hlW01FVEhPRF9OQU1FXSA9ICEhbWV0aG9kICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEFDQ0VTU09SUyAmJiAhREVTQ1JJUFRPUlMpIHJldHVybiB0cnVlO1xuICAgIHZhciBPID0geyBsZW5ndGg6IC0xIH07XG5cbiAgICBpZiAoQUNDRVNTT1JTKSBkZWZpbmVQcm9wZXJ0eShPLCAxLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogdGhyb3dlciB9KTtcbiAgICBlbHNlIE9bMV0gPSAxO1xuXG4gICAgbWV0aG9kLmNhbGwoTywgYXJndW1lbnQwLCBhcmd1bWVudDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdmb3JFYWNoJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnZm9yRWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gKCFTVFJJQ1RfTUVUSE9EIHx8ICFVU0VTX1RPX0xFTkdUSCkgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59IDogW10uZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcblxudmFyIG5hdGl2ZVJldmVyc2UgPSBbXS5yZXZlcnNlO1xudmFyIHRlc3QgPSBbMSwgMl07XG5cbi8vIGBBcnJheS5wcm90b3R5cGUucmV2ZXJzZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmV2ZXJzZVxuLy8gZml4IGZvciBTYWZhcmkgMTIuMCBidWdcbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xODg3OTRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFN0cmluZyh0ZXN0KSA9PT0gU3RyaW5nKHRlc3QucmV2ZXJzZSgpKSB9LCB7XG4gIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtYXNzaWduXG4gICAgaWYgKGlzQXJyYXkodGhpcykpIHRoaXMubGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgcmV0dXJuIG5hdGl2ZVJldmVyc2UuY2FsbCh0aGlzKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnc2xpY2UnLCB7IEFDQ0VTU09SUzogdHJ1ZSwgMDogMCwgMTogMiB9KTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICAgIHZhciBmaW4gPSB0b0Fic29sdXRlSW5kZXgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQsIGxlbmd0aCk7XG4gICAgLy8gaW5saW5lIGBBcnJheVNwZWNpZXNDcmVhdGVgIGZvciB1c2FnZSBuYXRpdmUgYEFycmF5I3NsaWNlYCB3aGVyZSBpdCdzIHBvc3NpYmxlXG4gICAgdmFyIENvbnN0cnVjdG9yLCByZXN1bHQsIG47XG4gICAgaWYgKGlzQXJyYXkoTykpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gTy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgICBpZiAodHlwZW9mIENvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBpc0FycmF5KENvbnN0cnVjdG9yLnByb3RvdHlwZSkpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcltTUEVDSUVTXTtcbiAgICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBudWxsKSBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbChPLCBrLCBmaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBuZXcgKENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQgPyBBcnJheSA6IENvbnN0cnVjdG9yKShtYXgoZmluIC0gaywgMCkpO1xuICAgIGZvciAobiA9IDA7IGsgPCBmaW47IGsrKywgbisrKSBpZiAoayBpbiBPKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICAgIHJlc3VsdC5sZW5ndGggPSBuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nID0gRnVuY3Rpb25Qcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbmFtZVJFID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvO1xudmFyIE5BTUUgPSAnbmFtZSc7XG5cbi8vIEZ1bmN0aW9uIGluc3RhbmNlcyBgLm5hbWVgIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1mdW5jdGlvbi1pbnN0YW5jZXMtbmFtZVxuaWYgKERFU0NSSVBUT1JTICYmICEoTkFNRSBpbiBGdW5jdGlvblByb3RvdHlwZSkpIHtcbiAgZGVmaW5lUHJvcGVydHkoRnVuY3Rpb25Qcm90b3R5cGUsIE5BTUUsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gRnVuY3Rpb25Qcm90b3R5cGVUb1N0cmluZy5jYWxsKHRoaXMpLm1hdGNoKG5hbWVSRSlbMV07XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcblxuLy8gSlNPTltAQHRvU3RyaW5nVGFnXSBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtanNvbi1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbiIsInZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xuXG4vLyBNYXRoW0BAdG9TdHJpbmdUYWddIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1tYXRoLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIG5hdGl2ZUdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgRkFJTFNfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uICgpIHsgbmF0aXZlR2V0UHJvdG90eXBlT2YoMSk7IH0pO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUywgc2hhbTogIUNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiB9LCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbmlmIChOT1RfR0VORVJJQyB8fCBJTkNPUlJFQ1RfTkFNRSkge1xuICByZWRlZmluZShSZWdFeHAucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciBSID0gYW5PYmplY3QodGhpcyk7XG4gICAgdmFyIHAgPSBTdHJpbmcoUi5zb3VyY2UpO1xuICAgIHZhciByZiA9IFIuZmxhZ3M7XG4gICAgdmFyIGYgPSBTdHJpbmcocmYgPT09IHVuZGVmaW5lZCAmJiBSIGluc3RhbmNlb2YgUmVnRXhwICYmICEoJ2ZsYWdzJyBpbiBSZWdFeHBQcm90b3R5cGUpID8gZmxhZ3MuY2FsbChSKSA6IHJmKTtcbiAgICByZXR1cm4gJy8nICsgcCArICcvJyArIGY7XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUgJiYgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoICE9PSBmb3JFYWNoKSB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCAnZm9yRWFjaCcsIGZvckVhY2gpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdpbmRleE9mJywgeyBBQ0NFU1NPUlM6IHRydWUsIDE6IDAgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUpvaW4gPSBbXS5qb2luO1xuXG52YXIgRVMzX1NUUklOR1MgPSBJbmRleGVkT2JqZWN0ICE9IE9iamVjdDtcbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnam9pbicsICcsJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuam9pbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuam9pblxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRVMzX1NUUklOR1MgfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuICAgIHJldHVybiBuYXRpdmVKb2luLmNhbGwodG9JbmRleGVkT2JqZWN0KHRoaXMpLCBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCA/ICcsJyA6IHNlcGFyYXRvcik7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ21hcCcpO1xuLy8gRkY0OS0gaXNzdWVcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdtYXAnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRGF0YVZpZXcgIT09ICd1bmRlZmluZWQnO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBUb0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMDtcbiAgdmFyIG51bWJlciA9IHRvSW50ZWdlcihpdCk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChudW1iZXIpO1xuICBpZiAobnVtYmVyICE9PSBsZW5ndGgpIHRocm93IFJhbmdlRXJyb3IoJ1dyb25nIGxlbmd0aCBvciBpbmRleCcpO1xuICByZXR1cm4gbGVuZ3RoO1xufTtcbiIsIi8vIElFRUU3NTQgY29udmVyc2lvbnMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pZWVlNzU0XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93LXJlc3RyaWN0ZWQtbmFtZXNcbnZhciBJbmZpbml0eSA9IDEgLyAwO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIHBvdyA9IE1hdGgucG93O1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBsb2cgPSBNYXRoLmxvZztcbnZhciBMTjIgPSBNYXRoLkxOMjtcblxudmFyIHBhY2sgPSBmdW5jdGlvbiAobnVtYmVyLCBtYW50aXNzYUxlbmd0aCwgYnl0ZXMpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheShieXRlcyk7XG4gIHZhciBleHBvbmVudExlbmd0aCA9IGJ5dGVzICogOCAtIG1hbnRpc3NhTGVuZ3RoIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBleHBvbmVudExlbmd0aCkgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBydCA9IG1hbnRpc3NhTGVuZ3RoID09PSAyMyA/IHBvdygyLCAtMjQpIC0gcG93KDIsIC03NykgOiAwO1xuICB2YXIgc2lnbiA9IG51bWJlciA8IDAgfHwgbnVtYmVyID09PSAwICYmIDEgLyBudW1iZXIgPCAwID8gMSA6IDA7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBleHBvbmVudCwgbWFudGlzc2EsIGM7XG4gIG51bWJlciA9IGFicyhudW1iZXIpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIGlmIChudW1iZXIgIT0gbnVtYmVyIHx8IG51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgbWFudGlzc2EgPSBudW1iZXIgIT0gbnVtYmVyID8gMSA6IDA7XG4gICAgZXhwb25lbnQgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGV4cG9uZW50ID0gZmxvb3IobG9nKG51bWJlcikgLyBMTjIpO1xuICAgIGlmIChudW1iZXIgKiAoYyA9IHBvdygyLCAtZXhwb25lbnQpKSA8IDEpIHtcbiAgICAgIGV4cG9uZW50LS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChleHBvbmVudCArIGVCaWFzID49IDEpIHtcbiAgICAgIG51bWJlciArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciArPSBydCAqIHBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAobnVtYmVyICogYyA+PSAyKSB7XG4gICAgICBleHBvbmVudCsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cbiAgICBpZiAoZXhwb25lbnQgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtYW50aXNzYSA9IDA7XG4gICAgICBleHBvbmVudCA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChleHBvbmVudCArIGVCaWFzID49IDEpIHtcbiAgICAgIG1hbnRpc3NhID0gKG51bWJlciAqIGMgLSAxKSAqIHBvdygyLCBtYW50aXNzYUxlbmd0aCk7XG4gICAgICBleHBvbmVudCA9IGV4cG9uZW50ICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hbnRpc3NhID0gbnVtYmVyICogcG93KDIsIGVCaWFzIC0gMSkgKiBwb3coMiwgbWFudGlzc2FMZW5ndGgpO1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cbiAgfVxuICBmb3IgKDsgbWFudGlzc2FMZW5ndGggPj0gODsgYnVmZmVyW2luZGV4KytdID0gbWFudGlzc2EgJiAyNTUsIG1hbnRpc3NhIC89IDI1NiwgbWFudGlzc2FMZW5ndGggLT0gOCk7XG4gIGV4cG9uZW50ID0gZXhwb25lbnQgPDwgbWFudGlzc2FMZW5ndGggfCBtYW50aXNzYTtcbiAgZXhwb25lbnRMZW5ndGggKz0gbWFudGlzc2FMZW5ndGg7XG4gIGZvciAoOyBleHBvbmVudExlbmd0aCA+IDA7IGJ1ZmZlcltpbmRleCsrXSA9IGV4cG9uZW50ICYgMjU1LCBleHBvbmVudCAvPSAyNTYsIGV4cG9uZW50TGVuZ3RoIC09IDgpO1xuICBidWZmZXJbLS1pbmRleF0gfD0gc2lnbiAqIDEyODtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn07XG5cbnZhciB1bnBhY2sgPSBmdW5jdGlvbiAoYnVmZmVyLCBtYW50aXNzYUxlbmd0aCkge1xuICB2YXIgYnl0ZXMgPSBidWZmZXIubGVuZ3RoO1xuICB2YXIgZXhwb25lbnRMZW5ndGggPSBieXRlcyAqIDggLSBtYW50aXNzYUxlbmd0aCAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZXhwb25lbnRMZW5ndGgpIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgbkJpdHMgPSBleHBvbmVudExlbmd0aCAtIDc7XG4gIHZhciBpbmRleCA9IGJ5dGVzIC0gMTtcbiAgdmFyIHNpZ24gPSBidWZmZXJbaW5kZXgtLV07XG4gIHZhciBleHBvbmVudCA9IHNpZ24gJiAxMjc7XG4gIHZhciBtYW50aXNzYTtcbiAgc2lnbiA+Pj0gNztcbiAgZm9yICg7IG5CaXRzID4gMDsgZXhwb25lbnQgPSBleHBvbmVudCAqIDI1NiArIGJ1ZmZlcltpbmRleF0sIGluZGV4LS0sIG5CaXRzIC09IDgpO1xuICBtYW50aXNzYSA9IGV4cG9uZW50ICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGV4cG9uZW50ID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1hbnRpc3NhTGVuZ3RoO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtYW50aXNzYSA9IG1hbnRpc3NhICogMjU2ICsgYnVmZmVyW2luZGV4XSwgaW5kZXgtLSwgbkJpdHMgLT0gOCk7XG4gIGlmIChleHBvbmVudCA9PT0gMCkge1xuICAgIGV4cG9uZW50ID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGV4cG9uZW50ID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG1hbnRpc3NhID8gTmFOIDogc2lnbiA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG1hbnRpc3NhID0gbWFudGlzc2EgKyBwb3coMiwgbWFudGlzc2FMZW5ndGgpO1xuICAgIGV4cG9uZW50ID0gZXhwb25lbnQgLSBlQmlhcztcbiAgfSByZXR1cm4gKHNpZ24gPyAtMSA6IDEpICogbWFudGlzc2EgKiBwb3coMiwgZXhwb25lbnQgLSBtYW50aXNzYUxlbmd0aCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFjazogcGFjayxcbiAgdW5wYWNrOiB1bnBhY2tcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmlsbGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsbFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qICwgc3RhcnQgPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKTtcbiAgdmFyIGVuZCA9IGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvQWJzb2x1dGVJbmRleChlbmQsIGxlbmd0aCk7XG4gIHdoaWxlIChlbmRQb3MgPiBpbmRleCkgT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgTkFUSVZFX0FSUkFZX0JVRkZFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItbmF0aXZlJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lLWFsbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleCcpO1xudmFyIElFRUU3NTQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWVlZTc1NCcpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBhcnJheUZpbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZmlsbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBBUlJBWV9CVUZGRVIgPSAnQXJyYXlCdWZmZXInO1xudmFyIERBVEFfVklFVyA9ICdEYXRhVmlldyc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgV1JPTkdfTEVOR1RIID0gJ1dyb25nIGxlbmd0aCc7XG52YXIgV1JPTkdfSU5ERVggPSAnV3JvbmcgaW5kZXgnO1xudmFyIE5hdGl2ZUFycmF5QnVmZmVyID0gZ2xvYmFsW0FSUkFZX0JVRkZFUl07XG52YXIgJEFycmF5QnVmZmVyID0gTmF0aXZlQXJyYXlCdWZmZXI7XG52YXIgJERhdGFWaWV3ID0gZ2xvYmFsW0RBVEFfVklFV107XG52YXIgJERhdGFWaWV3UHJvdG90eXBlID0gJERhdGFWaWV3ICYmICREYXRhVmlld1tQUk9UT1RZUEVdO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG52YXIgUmFuZ2VFcnJvciA9IGdsb2JhbC5SYW5nZUVycm9yO1xuXG52YXIgcGFja0lFRUU3NTQgPSBJRUVFNzU0LnBhY2s7XG52YXIgdW5wYWNrSUVFRTc1NCA9IElFRUU3NTQudW5wYWNrO1xuXG52YXIgcGFja0ludDggPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gIHJldHVybiBbbnVtYmVyICYgMHhGRl07XG59O1xuXG52YXIgcGFja0ludDE2ID0gZnVuY3Rpb24gKG51bWJlcikge1xuICByZXR1cm4gW251bWJlciAmIDB4RkYsIG51bWJlciA+PiA4ICYgMHhGRl07XG59O1xuXG52YXIgcGFja0ludDMyID0gZnVuY3Rpb24gKG51bWJlcikge1xuICByZXR1cm4gW251bWJlciAmIDB4RkYsIG51bWJlciA+PiA4ICYgMHhGRiwgbnVtYmVyID4+IDE2ICYgMHhGRiwgbnVtYmVyID4+IDI0ICYgMHhGRl07XG59O1xuXG52YXIgdW5wYWNrSW50MzIgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gIHJldHVybiBidWZmZXJbM10gPDwgMjQgfCBidWZmZXJbMl0gPDwgMTYgfCBidWZmZXJbMV0gPDwgOCB8IGJ1ZmZlclswXTtcbn07XG5cbnZhciBwYWNrRmxvYXQzMiA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgcmV0dXJuIHBhY2tJRUVFNzU0KG51bWJlciwgMjMsIDQpO1xufTtcblxudmFyIHBhY2tGbG9hdDY0ID0gZnVuY3Rpb24gKG51bWJlcikge1xuICByZXR1cm4gcGFja0lFRUU3NTQobnVtYmVyLCA1MiwgOCk7XG59O1xuXG52YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBrZXkpIHtcbiAgZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3JbUFJPVE9UWVBFXSwga2V5LCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKVtrZXldOyB9IH0pO1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uICh2aWV3LCBjb3VudCwgaW5kZXgsIGlzTGl0dGxlRW5kaWFuKSB7XG4gIHZhciBpbnRJbmRleCA9IHRvSW5kZXgoaW5kZXgpO1xuICB2YXIgc3RvcmUgPSBnZXRJbnRlcm5hbFN0YXRlKHZpZXcpO1xuICBpZiAoaW50SW5kZXggKyBjb3VudCA+IHN0b3JlLmJ5dGVMZW5ndGgpIHRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgYnl0ZXMgPSBnZXRJbnRlcm5hbFN0YXRlKHN0b3JlLmJ1ZmZlcikuYnl0ZXM7XG4gIHZhciBzdGFydCA9IGludEluZGV4ICsgc3RvcmUuYnl0ZU9mZnNldDtcbiAgdmFyIHBhY2sgPSBieXRlcy5zbGljZShzdGFydCwgc3RhcnQgKyBjb3VudCk7XG4gIHJldHVybiBpc0xpdHRsZUVuZGlhbiA/IHBhY2sgOiBwYWNrLnJldmVyc2UoKTtcbn07XG5cbnZhciBzZXQgPSBmdW5jdGlvbiAodmlldywgY291bnQsIGluZGV4LCBjb252ZXJzaW9uLCB2YWx1ZSwgaXNMaXR0bGVFbmRpYW4pIHtcbiAgdmFyIGludEluZGV4ID0gdG9JbmRleChpbmRleCk7XG4gIHZhciBzdG9yZSA9IGdldEludGVybmFsU3RhdGUodmlldyk7XG4gIGlmIChpbnRJbmRleCArIGNvdW50ID4gc3RvcmUuYnl0ZUxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19JTkRFWCk7XG4gIHZhciBieXRlcyA9IGdldEludGVybmFsU3RhdGUoc3RvcmUuYnVmZmVyKS5ieXRlcztcbiAgdmFyIHN0YXJ0ID0gaW50SW5kZXggKyBzdG9yZS5ieXRlT2Zmc2V0O1xuICB2YXIgcGFjayA9IGNvbnZlcnNpb24oK3ZhbHVlKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSBieXRlc1tzdGFydCArIGldID0gcGFja1tpc0xpdHRsZUVuZGlhbiA/IGkgOiBjb3VudCAtIGkgLSAxXTtcbn07XG5cbmlmICghTkFUSVZFX0FSUkFZX0JVRkZFUikge1xuICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRBcnJheUJ1ZmZlciwgQVJSQVlfQlVGRkVSKTtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHRvSW5kZXgobGVuZ3RoKTtcbiAgICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICAgIGJ5dGVzOiBhcnJheUZpbGwuY2FsbChuZXcgQXJyYXkoYnl0ZUxlbmd0aCksIDApLFxuICAgICAgYnl0ZUxlbmd0aDogYnl0ZUxlbmd0aFxuICAgIH0pO1xuICAgIGlmICghREVTQ1JJUFRPUlMpIHRoaXMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGg7XG4gIH07XG5cbiAgJERhdGFWaWV3ID0gZnVuY3Rpb24gRGF0YVZpZXcoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkRGF0YVZpZXcsIERBVEFfVklFVyk7XG4gICAgYW5JbnN0YW5jZShidWZmZXIsICRBcnJheUJ1ZmZlciwgREFUQV9WSUVXKTtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gZ2V0SW50ZXJuYWxTdGF0ZShidWZmZXIpLmJ5dGVMZW5ndGg7XG4gICAgdmFyIG9mZnNldCA9IHRvSW50ZWdlcihieXRlT2Zmc2V0KTtcbiAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgPiBidWZmZXJMZW5ndGgpIHRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG9mZnNldCcpO1xuICAgIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID09PSB1bmRlZmluZWQgPyBidWZmZXJMZW5ndGggLSBvZmZzZXQgOiB0b0xlbmd0aChieXRlTGVuZ3RoKTtcbiAgICBpZiAob2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlckxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgICAgYnVmZmVyOiBidWZmZXIsXG4gICAgICBieXRlTGVuZ3RoOiBieXRlTGVuZ3RoLFxuICAgICAgYnl0ZU9mZnNldDogb2Zmc2V0XG4gICAgfSk7XG4gICAgaWYgKCFERVNDUklQVE9SUykge1xuICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGlzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xuICAgICAgdGhpcy5ieXRlT2Zmc2V0ID0gb2Zmc2V0O1xuICAgIH1cbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICBhZGRHZXR0ZXIoJEFycmF5QnVmZmVyLCAnYnl0ZUxlbmd0aCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsICdidWZmZXInKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCAnYnl0ZUxlbmd0aCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsICdieXRlT2Zmc2V0Jyk7XG4gIH1cblxuICByZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIGdldEludDg6IGZ1bmN0aW9uIGdldEludDgoYnl0ZU9mZnNldCkge1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCAxLCBieXRlT2Zmc2V0KVswXSA8PCAyNCA+PiAyNDtcbiAgICB9LFxuICAgIGdldFVpbnQ4OiBmdW5jdGlvbiBnZXRVaW50OChieXRlT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQpWzBdO1xuICAgIH0sXG4gICAgZ2V0SW50MTY6IGZ1bmN0aW9uIGdldEludDE2KGJ5dGVPZmZzZXQgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHZhciBieXRlcyA9IGdldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm4gKGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXSkgPDwgMTYgPj4gMTY7XG4gICAgfSxcbiAgICBnZXRVaW50MTY6IGZ1bmN0aW9uIGdldFVpbnQxNihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgICAgcmV0dXJuIGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXTtcbiAgICB9LFxuICAgIGdldEludDMyOiBmdW5jdGlvbiBnZXRJbnQzMihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSW50MzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSk7XG4gICAgfSxcbiAgICBnZXRVaW50MzI6IGZ1bmN0aW9uIGdldFVpbnQzMihieXRlT2Zmc2V0IC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICByZXR1cm4gdW5wYWNrSW50MzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSkgPj4+IDA7XG4gICAgfSxcbiAgICBnZXRGbG9hdDMyOiBmdW5jdGlvbiBnZXRGbG9hdDMyKGJ5dGVPZmZzZXQgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHJldHVybiB1bnBhY2tJRUVFNzU0KGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCksIDIzKTtcbiAgICB9LFxuICAgIGdldEZsb2F0NjQ6IGZ1bmN0aW9uIGdldEZsb2F0NjQoYnl0ZU9mZnNldCAvKiAsIGxpdHRsZUVuZGlhbiAqLykge1xuICAgICAgcmV0dXJuIHVucGFja0lFRUU3NTQoZ2V0KHRoaXMsIDgsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSwgNTIpO1xuICAgIH0sXG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgc2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQsIHBhY2tJbnQ4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRVaW50ODogZnVuY3Rpb24gc2V0VWludDgoYnl0ZU9mZnNldCwgdmFsdWUpIHtcbiAgICAgIHNldCh0aGlzLCAxLCBieXRlT2Zmc2V0LCBwYWNrSW50OCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0SW50MTY6IGZ1bmN0aW9uIHNldEludDE2KGJ5dGVPZmZzZXQsIHZhbHVlIC8qICwgbGl0dGxlRW5kaWFuICovKSB7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0ludDE2LCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgc2V0VWludDE2OiBmdW5jdGlvbiBzZXRVaW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBwYWNrSW50MTYsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBzZXRJbnQzMjogZnVuY3Rpb24gc2V0SW50MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSW50MzIsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBzZXRVaW50MzI6IGZ1bmN0aW9uIHNldFVpbnQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiAsIGxpdHRsZUVuZGlhbiAqLykge1xuICAgICAgc2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIHBhY2tJbnQzMiwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHNldEZsb2F0MzI6IGZ1bmN0aW9uIHNldEZsb2F0MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrRmxvYXQzMiwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHNldEZsb2F0NjQ6IGZ1bmN0aW9uIHNldEZsb2F0NjQoYnl0ZU9mZnNldCwgdmFsdWUgLyogLCBsaXR0bGVFbmRpYW4gKi8pIHtcbiAgICAgIHNldCh0aGlzLCA4LCBieXRlT2Zmc2V0LCBwYWNrRmxvYXQ2NCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgaWYgKCFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgTmF0aXZlQXJyYXlCdWZmZXIoMSk7XG4gIH0pIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgbmV3IE5hdGl2ZUFycmF5QnVmZmVyKC0xKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIG5ldyBOYXRpdmVBcnJheUJ1ZmZlcigpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5ldyBOYXRpdmVBcnJheUJ1ZmZlcigxLjUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5ldyBOYXRpdmVBcnJheUJ1ZmZlcihOYU4pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIHJldHVybiBOYXRpdmVBcnJheUJ1ZmZlci5uYW1lICE9IEFSUkFZX0JVRkZFUjtcbiAgfSkpIHtcbiAgICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpIHtcbiAgICAgIGFuSW5zdGFuY2UodGhpcywgJEFycmF5QnVmZmVyKTtcbiAgICAgIHJldHVybiBuZXcgTmF0aXZlQXJyYXlCdWZmZXIodG9JbmRleChsZW5ndGgpKTtcbiAgICB9O1xuICAgIHZhciBBcnJheUJ1ZmZlclByb3RvdHlwZSA9ICRBcnJheUJ1ZmZlcltQUk9UT1RZUEVdID0gTmF0aXZlQXJyYXlCdWZmZXJbUFJPVE9UWVBFXTtcbiAgICBmb3IgKHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVBcnJheUJ1ZmZlciksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajspIHtcbiAgICAgIGlmICghKChrZXkgPSBrZXlzW2orK10pIGluICRBcnJheUJ1ZmZlcikpIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRBcnJheUJ1ZmZlciwga2V5LCBOYXRpdmVBcnJheUJ1ZmZlcltrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQXJyYXlCdWZmZXJQcm90b3R5cGUuY29uc3RydWN0b3IgPSAkQXJyYXlCdWZmZXI7XG4gIH1cblxuICAvLyBXZWJLaXQgYnVnIC0gdGhlIHNhbWUgcGFyZW50IHByb3RvdHlwZSBmb3IgdHlwZWQgYXJyYXlzIGFuZCBkYXRhIHZpZXdcbiAgaWYgKHNldFByb3RvdHlwZU9mICYmIGdldFByb3RvdHlwZU9mKCREYXRhVmlld1Byb3RvdHlwZSkgIT09IE9iamVjdFByb3RvdHlwZSkge1xuICAgIHNldFByb3RvdHlwZU9mKCREYXRhVmlld1Byb3RvdHlwZSwgT2JqZWN0UHJvdG90eXBlKTtcbiAgfVxuXG4gIC8vIGlPUyBTYWZhcmkgNy54IGJ1Z1xuICB2YXIgdGVzdFZpZXcgPSBuZXcgJERhdGFWaWV3KG5ldyAkQXJyYXlCdWZmZXIoMikpO1xuICB2YXIgbmF0aXZlU2V0SW50OCA9ICREYXRhVmlld1Byb3RvdHlwZS5zZXRJbnQ4O1xuICB0ZXN0Vmlldy5zZXRJbnQ4KDAsIDIxNDc0ODM2NDgpO1xuICB0ZXN0Vmlldy5zZXRJbnQ4KDEsIDIxNDc0ODM2NDkpO1xuICBpZiAodGVzdFZpZXcuZ2V0SW50OCgwKSB8fCAhdGVzdFZpZXcuZ2V0SW50OCgxKSkgcmVkZWZpbmVBbGwoJERhdGFWaWV3UHJvdG90eXBlLCB7XG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgbmF0aXZlU2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9LFxuICAgIHNldFVpbnQ4OiBmdW5jdGlvbiBzZXRVaW50OChieXRlT2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgbmF0aXZlU2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuXG5zZXRUb1N0cmluZ1RhZygkQXJyYXlCdWZmZXIsIEFSUkFZX0JVRkZFUik7XG5zZXRUb1N0cmluZ1RhZygkRGF0YVZpZXcsIERBVEFfVklFVyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBBcnJheUJ1ZmZlcjogJEFycmF5QnVmZmVyLFxuICBEYXRhVmlldzogJERhdGFWaWV3XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGFycmF5QnVmZmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlcicpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcblxudmFyIEFSUkFZX0JVRkZFUiA9ICdBcnJheUJ1ZmZlcic7XG52YXIgQXJyYXlCdWZmZXIgPSBhcnJheUJ1ZmZlck1vZHVsZVtBUlJBWV9CVUZGRVJdO1xudmFyIE5hdGl2ZUFycmF5QnVmZmVyID0gZ2xvYmFsW0FSUkFZX0JVRkZFUl07XG5cbi8vIGBBcnJheUJ1ZmZlcmAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5YnVmZmVyLWNvbnN0cnVjdG9yXG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IE5hdGl2ZUFycmF5QnVmZmVyICE9PSBBcnJheUJ1ZmZlciB9LCB7XG4gIEFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlclxufSk7XG5cbnNldFNwZWNpZXMoQVJSQVlfQlVGRkVSKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgQXJyYXlCdWZmZXJNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcblxudmFyIEFycmF5QnVmZmVyID0gQXJyYXlCdWZmZXJNb2R1bGUuQXJyYXlCdWZmZXI7XG52YXIgRGF0YVZpZXcgPSBBcnJheUJ1ZmZlck1vZHVsZS5EYXRhVmlldztcbnZhciBuYXRpdmVBcnJheUJ1ZmZlclNsaWNlID0gQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlO1xuXG52YXIgSU5DT1JSRUNUX1NMSUNFID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIW5ldyBBcnJheUJ1ZmZlcigyKS5zbGljZSgxLCB1bmRlZmluZWQpLmJ5dGVMZW5ndGg7XG59KTtcblxuLy8gYEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheWJ1ZmZlci5wcm90b3R5cGUuc2xpY2VcbiQoeyB0YXJnZXQ6ICdBcnJheUJ1ZmZlcicsIHByb3RvOiB0cnVlLCB1bnNhZmU6IHRydWUsIGZvcmNlZDogSU5DT1JSRUNUX1NMSUNFIH0sIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAobmF0aXZlQXJyYXlCdWZmZXJTbGljZSAhPT0gdW5kZWZpbmVkICYmIGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmF0aXZlQXJyYXlCdWZmZXJTbGljZS5jYWxsKGFuT2JqZWN0KHRoaXMpLCBzdGFydCk7IC8vIEZGIGZpeFxuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYW5PYmplY3QodGhpcykuYnl0ZUxlbmd0aDtcbiAgICB2YXIgZmlyc3QgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IChzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgQXJyYXlCdWZmZXIpKSh0b0xlbmd0aChmaW4gLSBmaXJzdCkpO1xuICAgIHZhciB2aWV3U291cmNlID0gbmV3IERhdGFWaWV3KHRoaXMpO1xuICAgIHZhciB2aWV3VGFyZ2V0ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoZmlyc3QgPCBmaW4pIHtcbiAgICAgIHZpZXdUYXJnZXQuc2V0VWludDgoaW5kZXgrKywgdmlld1NvdXJjZS5nZXRVaW50OChmaXJzdCsrKSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbCcpLmY7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gIU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGQUlMU19PTl9QUklNSVRJVkVTIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lc1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vZmFpbHMnKTtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3IsXG4vLyBzbyB3ZSB1c2UgYW4gaW50ZXJtZWRpYXRlIGZ1bmN0aW9uLlxuZnVuY3Rpb24gUkUocywgZikge1xuICByZXR1cm4gUmVnRXhwKHMsIGYpO1xufVxuXG5leHBvcnRzLlVOU1VQUE9SVEVEX1kgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgnYScsICd5JykgLT4gL2EveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG4gIHZhciByZSA9IFJFKCdhJywgJ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2FiY2QnKSAhPSBudWxsO1xufSk7XG5cbmV4cG9ydHMuQlJPS0VOX0NBUkVUID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03NzM2ODdcbiAgdmFyIHJlID0gUkUoJ15yJywgJ2d5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdzdHInKSAhPSBudWxsO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL3JlZ2V4cC1mbGFncycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xuXG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbi8vIFRoaXMgYWx3YXlzIHJlZmVycyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLCBiZWNhdXNlIHRoZVxuLy8gU3RyaW5nI3JlcGxhY2UgcG9seWZpbGwgdXNlcyAuL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMsXG4vLyB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYmVmb3JlIHBhdGNoaW5nIHRoZSBtZXRob2QuXG52YXIgbmF0aXZlUmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS87XG4gIHZhciByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMS5sYXN0SW5kZXggIT09IDAgfHwgcmUyLmxhc3RJbmRleCAhPT0gMDtcbn0pKCk7XG5cbnZhciBVTlNVUFBPUlRFRF9ZID0gc3RpY2t5SGVscGVycy5VTlNVUFBPUlRFRF9ZIHx8IHN0aWNreUhlbHBlcnMuQlJPS0VOX0NBUkVUO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRCB8fCBVTlNVUFBPUlRFRF9ZO1xuXG5pZiAoUEFUQ0gpIHtcbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cikge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIGxhc3RJbmRleCwgcmVDb3B5LCBtYXRjaCwgaTtcbiAgICB2YXIgc3RpY2t5ID0gVU5TVVBQT1JURURfWSAmJiByZS5zdGlja3k7XG4gICAgdmFyIGZsYWdzID0gcmVnZXhwRmxhZ3MuY2FsbChyZSk7XG4gICAgdmFyIHNvdXJjZSA9IHJlLnNvdXJjZTtcbiAgICB2YXIgY2hhcnNBZGRlZCA9IDA7XG4gICAgdmFyIHN0ckNvcHkgPSBzdHI7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBmbGFncyA9IGZsYWdzLnJlcGxhY2UoJ3knLCAnJyk7XG4gICAgICBpZiAoZmxhZ3MuaW5kZXhPZignZycpID09PSAtMSkge1xuICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICB9XG5cbiAgICAgIHN0ckNvcHkgPSBTdHJpbmcoc3RyKS5zbGljZShyZS5sYXN0SW5kZXgpO1xuICAgICAgLy8gU3VwcG9ydCBhbmNob3JlZCBzdGlja3kgYmVoYXZpb3IuXG4gICAgICBpZiAocmUubGFzdEluZGV4ID4gMCAmJiAoIXJlLm11bHRpbGluZSB8fCByZS5tdWx0aWxpbmUgJiYgc3RyW3JlLmxhc3RJbmRleCAtIDFdICE9PSAnXFxuJykpIHtcbiAgICAgICAgc291cmNlID0gJyg/OiAnICsgc291cmNlICsgJyknO1xuICAgICAgICBzdHJDb3B5ID0gJyAnICsgc3RyQ29weTtcbiAgICAgICAgY2hhcnNBZGRlZCsrO1xuICAgICAgfVxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIHN0ciBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXig/OicgKyBzb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICB9XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuXG4gICAgbWF0Y2ggPSBuYXRpdmVFeGVjLmNhbGwoc3RpY2t5ID8gcmVDb3B5IDogcmUsIHN0ckNvcHkpO1xuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoLmlucHV0ID0gbWF0Y2guaW5wdXQuc2xpY2UoY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoLmluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZS5sYXN0SW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJyB3b3JrIGZvciAvKC4/KT8vXG4gICAgICBuYXRpdmVSZXBsYWNlLmNhbGwobWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaGVkRXhlYztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcblxuJCh7IHRhcmdldDogJ1JlZ0V4cCcsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IC8uLy5leGVjICE9PSBleGVjIH0sIHtcbiAgZXhlYzogZXhlY1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIG1vdmVkIHRvIGVudHJ5IHBvaW50c1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5yZWdleHAuZXhlYycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG4vLyBJRSA8PSAxMSByZXBsYWNlcyAkMCB3aXRoIHRoZSB3aG9sZSBtYXRjaCwgYXMgaWYgaXQgd2FzICQmXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MDI0NjY2L2dldHRpbmctaWUtdG8tcmVwbGFjZS1hLXJlZ2V4LXdpdGgtdGhlLWxpdGVyYWwtc3RyaW5nLTBcbnZhciBSRVBMQUNFX0tFRVBTXyQwID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICdhJy5yZXBsYWNlKC8uLywgJyQwJykgPT09ICckMCc7XG59KSgpO1xuXG52YXIgUkVQTEFDRSA9IHdlbGxLbm93blN5bWJvbCgncmVwbGFjZScpO1xuLy8gU2FmYXJpIDw9IDEzLjAuMyg/KSBzdWJzdGl0dXRlcyBudGggY2FwdHVyZSB3aGVyZSBuPm0gd2l0aCBhbiBlbXB0eSBzdHJpbmdcbnZhciBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA9IChmdW5jdGlvbiAoKSB7XG4gIGlmICgvLi9bUkVQTEFDRV0pIHtcbiAgICByZXR1cm4gLy4vW1JFUExBQ0VdKCdhJywgJyQwJykgPT09ICcnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbi8vIENocm9tZSA1MSBoYXMgYSBidWdneSBcInNwbGl0XCIgaW1wbGVtZW50YXRpb24gd2hlbiBSZWdFeHAjZXhlYyAhPT0gbmF0aXZlRXhlY1xuLy8gV2VleCBKUyBoYXMgZnJvemVuIGJ1aWx0LWluIHByb3RvdHlwZXMsIHNvIHVzZSB0cnkgLyBjYXRjaCB3cmFwcGVyXG52YXIgU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjLCBzaGFtKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIShcbiAgICAgIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTICYmXG4gICAgICBSRVBMQUNFX0tFRVBTXyQwICYmXG4gICAgICAhUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICApKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0sIHtcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDA6IFJFUExBQ0VfS0VFUFNfJDAsXG4gICAgICBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTogUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICB9KTtcbiAgICB2YXIgc3RyaW5nTWV0aG9kID0gbWV0aG9kc1swXTtcbiAgICB2YXIgcmVnZXhNZXRob2QgPSBtZXRob2RzWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJpbmdNZXRob2QpO1xuICAgIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcmVnZXhNZXRob2QuY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG5cbiAgaWYgKHNoYW0pIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShSZWdFeHAucHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xuXG4vLyBgQWR2YW5jZVN0cmluZ0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFkdmFuY2VzdHJpbmdpbmRleFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUywgaW5kZXgsIHVuaWNvZGUpIHtcbiAgcmV0dXJuIGluZGV4ICsgKHVuaWNvZGUgPyBjaGFyQXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cblxuICByZXR1cm4gcmVnZXhwRXhlYy5jYWxsKFIsIFMpO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTID0gL1xcJChbJCYnYF18XFxkXFxkP3w8W14+XSo+KS9nO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEID0gL1xcJChbJCYnYF18XFxkXFxkPykvZztcblxudmFyIG1heWJlVG9TdHJpbmcgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyBpdCA6IFN0cmluZyhpdCk7XG59O1xuXG4vLyBAQHJlcGxhY2UgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24gKFJFUExBQ0UsIG5hdGl2ZVJlcGxhY2UsIG1heWJlQ2FsbE5hdGl2ZSwgcmVhc29uKSB7XG4gIHZhciBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA9IHJlYXNvbi5SRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTtcbiAgdmFyIFJFUExBQ0VfS0VFUFNfJDAgPSByZWFzb24uUkVQTEFDRV9LRUVQU18kMDtcbiAgdmFyIFVOU0FGRV9TVUJTVElUVVRFID0gUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPyAnJCcgOiAnJDAnO1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICAgIHJldHVybiByZXBsYWNlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVwbGFjZXIuY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6IG5hdGl2ZVJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAocmVnZXhwLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKCFSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSAmJiBSRVBMQUNFX0tFRVBTXyQwKSB8fFxuICAgICAgICAodHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVwbGFjZVZhbHVlLmluZGV4T2YoVU5TQUZFX1NVQlNUSVRVVEUpID09PSAtMSlcbiAgICAgICkge1xuICAgICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZVJlcGxhY2UsIHJlZ2V4cCwgdGhpcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG5cbiAgICAgIHZhciBmdW5jdGlvbmFsUmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlVmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSBTdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBtYXgobWluKHRvSW50ZWdlcihyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBjYXB0dXJlcy5wdXNoKG1heWJlVG9TdHJpbmcocmVzdWx0W2pdKSk7XG4gICAgICAgIHZhciBuYW1lZENhcHR1cmVzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgaWYgKGZ1bmN0aW9uYWxSZXBsYWNlKSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VyQXJncyA9IFttYXRjaGVkXS5jb25jYXQoY2FwdHVyZXMsIHBvc2l0aW9uLCBTKTtcbiAgICAgICAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSByZXBsYWNlckFyZ3MucHVzaChuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBTdHJpbmcocmVwbGFjZVZhbHVlLmFwcGx5KHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcblxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRzdWJzdGl0dXRpb25cbiAgZnVuY3Rpb24gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIHN0ciwgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlbWVudCkge1xuICAgIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgICB2YXIgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEO1xuICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICAgIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MUztcbiAgICB9XG4gICAgcmV0dXJuIG5hdGl2ZVJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgICAgdmFyIGNhcHR1cmU7XG4gICAgICBzd2l0Y2ggKGNoLmNoYXJBdCgwKSkge1xuICAgICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgICAgY2FzZSAnJic6IHJldHVybiBtYXRjaGVkO1xuICAgICAgICBjYXNlICdgJzogcmV0dXJuIHN0ci5zbGljZSgwLCBwb3NpdGlvbik7XG4gICAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW2NoLnNsaWNlKDEsIC0xKV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIFxcZFxcZD9cbiAgICAgICAgICB2YXIgbiA9ICtjaDtcbiAgICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIGlmIChuID4gbSkge1xuICAgICAgICAgICAgdmFyIGYgPSBmbG9vcihuIC8gMTApO1xuICAgICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgIGlmIChmIDw9IG0pIHJldHVybiBjYXB0dXJlc1tmIC0gMV0gPT09IHVuZGVmaW5lZCA/IGNoLmNoYXJBdCgxKSA6IGNhcHR1cmVzW2YgLSAxXSArIGNoLmNoYXJBdCgxKTtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FwdHVyZSA9IGNhcHR1cmVzW24gLSAxXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNyZWdleHBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNsYXNzb2YoaXQpID09ICdSZWdFeHAnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjYWxsUmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgYXJyYXlQdXNoID0gW10ucHVzaDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBNQVhfVUlOVDMyID0gMHhGRkZGRkZGRjtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCd4JywgJ3knKSAtPiAveC95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBTVVBQT1JUU19ZID0gIWZhaWxzKGZ1bmN0aW9uICgpIHsgcmV0dXJuICFSZWdFeHAoTUFYX1VJTlQzMiwgJ3knKTsgfSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdzcGxpdCcsIDIsIGZ1bmN0aW9uIChTUExJVCwgbmF0aXZlU3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJy5zcGxpdCgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgICd0ZXN0Jy5zcGxpdCgvKD86KS8sIC0xKS5sZW5ndGggIT0gNCB8fFxuICAgICdhYicuc3BsaXQoLyg/OmFiKSovKS5sZW5ndGggIT0gMiB8fFxuICAgICcuJy5zcGxpdCgvKC4/KSguPykvKS5sZW5ndGggIT0gNCB8fFxuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDEgfHxcbiAgICAnJy5zcGxpdCgvLj8vKS5sZW5ndGhcbiAgKSB7XG4gICAgLy8gYmFzZWQgb24gZXM1LXNoaW0gaW1wbGVtZW50YXRpb24sIG5lZWQgdG8gcmV3b3JrIGl0XG4gICAgaW50ZXJuYWxTcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSB1bmRlZmluZWQpIHJldHVybiBbc3RyaW5nXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZiAoIWlzUmVnRXhwKHNlcGFyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbSk7XG4gICAgICB9XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4cEV4ZWMuY2FsbChzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHkubGFzdEluZGV4O1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkgYXJyYXlQdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHNlcGFyYXRvckNvcHkubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKSBvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltID8gb3V0cHV0LnNsaWNlKDAsIGxpbSkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJy5zcGxpdCh1bmRlZmluZWQsIDApLmxlbmd0aCkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBuYXRpdmVTcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH0gZWxzZSBpbnRlcm5hbFNwbGl0ID0gbmF0aXZlU3BsaXQ7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zcGxpdFxuICAgIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzcGxpdHRlciA9IHNlcGFyYXRvciA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZXBhcmF0b3JbU1BMSVRdO1xuICAgICAgcmV0dXJuIHNwbGl0dGVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBzcGxpdHRlci5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpXG4gICAgICAgIDogaW50ZXJuYWxTcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHNwbGl0XG4gICAgLy9cbiAgICAvLyBOT1RFOiBUaGlzIGNhbm5vdCBiZSBwcm9wZXJseSBwb2x5ZmlsbGVkIGluIGVuZ2luZXMgdGhhdCBkb24ndCBzdXBwb3J0XG4gICAgLy8gdGhlICd5JyBmbGFnLlxuICAgIGZ1bmN0aW9uIChyZWdleHAsIGxpbWl0KSB7XG4gICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKGludGVybmFsU3BsaXQsIHJlZ2V4cCwgdGhpcywgbGltaXQsIGludGVybmFsU3BsaXQgIT09IG5hdGl2ZVNwbGl0KTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IocngsIFJlZ0V4cCk7XG5cbiAgICAgIHZhciB1bmljb2RlTWF0Y2hpbmcgPSByeC51bmljb2RlO1xuICAgICAgdmFyIGZsYWdzID0gKHJ4Lmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4Lm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoU1VQUE9SVFNfWSA/ICd5JyA6ICdnJyk7XG5cbiAgICAgIC8vIF4oPyArIHJ4ICsgKSBpcyBuZWVkZWQsIGluIGNvbWJpbmF0aW9uIHdpdGggc29tZSBTIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgQyhTVVBQT1JUU19ZID8gcnggOiAnXig/OicgKyByeC5zb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKFMubGVuZ3RoID09PSAwKSByZXR1cm4gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFMpID09PSBudWxsID8gW1NdIDogW107XG4gICAgICB2YXIgcCA9IDA7XG4gICAgICB2YXIgcSA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgd2hpbGUgKHEgPCBTLmxlbmd0aCkge1xuICAgICAgICBzcGxpdHRlci5sYXN0SW5kZXggPSBTVVBQT1JUU19ZID8gcSA6IDA7XG4gICAgICAgIHZhciB6ID0gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFNVUFBPUlRTX1kgPyBTIDogUy5zbGljZShxKSk7XG4gICAgICAgIHZhciBlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeiA9PT0gbnVsbCB8fFxuICAgICAgICAgIChlID0gbWluKHRvTGVuZ3RoKHNwbGl0dGVyLmxhc3RJbmRleCArIChTVVBQT1JUU19ZID8gMCA6IHEpKSwgUy5sZW5ndGgpKSA9PT0gcFxuICAgICAgICApIHtcbiAgICAgICAgICBxID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHEsIHVuaWNvZGVNYXRjaGluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQS5wdXNoKFMuc2xpY2UocCwgcSkpO1xuICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB6Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgQS5wdXNoKHpbaV0pO1xuICAgICAgICAgICAgaWYgKEEubGVuZ3RoID09PSBsaW0pIHJldHVybiBBO1xuICAgICAgICAgIH1cbiAgICAgICAgICBxID0gcCA9IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEEucHVzaChTLnNsaWNlKHApKTtcbiAgICAgIHJldHVybiBBO1xuICAgIH1cbiAgXTtcbn0sICFTVVBQT1JUU19ZKTtcbiIsIi8vIGEgc3RyaW5nIG9mIGFsbCB2YWxpZCB1bmljb2RlIHdoaXRlc3BhY2VzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgd2hpdGVzcGFjZSA9ICdbJyArIHdoaXRlc3BhY2VzICsgJ10nO1xudmFyIGx0cmltID0gUmVnRXhwKCdeJyArIHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyonKTtcbnZhciBydHJpbSA9IFJlZ0V4cCh3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW0sIHRyaW1TdGFydCwgdHJpbUVuZCwgdHJpbUxlZnQsIHRyaW1SaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcykge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1MZWZ0LCB0cmltU3RhcnQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbWVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuICB0cmltOiBjcmVhdGVNZXRob2QoMylcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgbm9uID0gJ1xcdTIwMEJcXHUwMDg1XFx1MTgwRSc7XG5cbi8vIGNoZWNrIHRoYXQgYSBtZXRob2Qgd29ya3Mgd2l0aCB0aGUgY29ycmVjdCBsaXN0XG4vLyBvZiB3aGl0ZXNwYWNlcyBhbmQgaGFzIGEgY29ycmVjdCBuYW1lXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICByZXR1cm4gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXdoaXRlc3BhY2VzW01FVEhPRF9OQU1FXSgpIHx8IG5vbltNRVRIT0RfTkFNRV0oKSAhPSBub24gfHwgd2hpdGVzcGFjZXNbTUVUSE9EX05BTUVdLm5hbWUgIT09IE1FVEhPRF9OQU1FO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBmb3JjZWRTdHJpbmdUcmltTWV0aG9kKCd0cmltJykgfSwge1xuICB0cmltOiBmdW5jdGlvbiB0cmltKCkge1xuICAgIHJldHVybiAkdHJpbSh0aGlzKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0FSUkFZX0JVRkZFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItbmF0aXZlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBJbnQ4QXJyYXkgPSBnbG9iYWwuSW50OEFycmF5O1xudmFyIEludDhBcnJheVByb3RvdHlwZSA9IEludDhBcnJheSAmJiBJbnQ4QXJyYXkucHJvdG90eXBlO1xudmFyIFVpbnQ4Q2xhbXBlZEFycmF5ID0gZ2xvYmFsLlVpbnQ4Q2xhbXBlZEFycmF5O1xudmFyIFVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlID0gVWludDhDbGFtcGVkQXJyYXkgJiYgVWludDhDbGFtcGVkQXJyYXkucHJvdG90eXBlO1xudmFyIFR5cGVkQXJyYXkgPSBJbnQ4QXJyYXkgJiYgZ2V0UHJvdG90eXBlT2YoSW50OEFycmF5KTtcbnZhciBUeXBlZEFycmF5UHJvdG90eXBlID0gSW50OEFycmF5UHJvdG90eXBlICYmIGdldFByb3RvdHlwZU9mKEludDhBcnJheVByb3RvdHlwZSk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBpc1Byb3RvdHlwZU9mID0gT2JqZWN0UHJvdG90eXBlLmlzUHJvdG90eXBlT2Y7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIFRZUEVEX0FSUkFZX1RBRyA9IHVpZCgnVFlQRURfQVJSQVlfVEFHJyk7XG4vLyBGaXhpbmcgbmF0aXZlIHR5cGVkIGFycmF5cyBpbiBPcGVyYSBQcmVzdG8gY3Jhc2hlcyB0aGUgYnJvd3Nlciwgc2VlICM1OTVcbnZhciBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTID0gTkFUSVZFX0FSUkFZX0JVRkZFUiAmJiAhIXNldFByb3RvdHlwZU9mICYmIGNsYXNzb2YoZ2xvYmFsLm9wZXJhKSAhPT0gJ09wZXJhJztcbnZhciBUWVBFRF9BUlJBWV9UQUdfUkVRSVJFRCA9IGZhbHNlO1xudmFyIE5BTUU7XG5cbnZhciBUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCA9IHtcbiAgSW50OEFycmF5OiAxLFxuICBVaW50OEFycmF5OiAxLFxuICBVaW50OENsYW1wZWRBcnJheTogMSxcbiAgSW50MTZBcnJheTogMixcbiAgVWludDE2QXJyYXk6IDIsXG4gIEludDMyQXJyYXk6IDQsXG4gIFVpbnQzMkFycmF5OiA0LFxuICBGbG9hdDMyQXJyYXk6IDQsXG4gIEZsb2F0NjRBcnJheTogOFxufTtcblxudmFyIGlzVmlldyA9IGZ1bmN0aW9uIGlzVmlldyhpdCkge1xuICB2YXIga2xhc3MgPSBjbGFzc29mKGl0KTtcbiAgcmV0dXJuIGtsYXNzID09PSAnRGF0YVZpZXcnIHx8IGhhcyhUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCwga2xhc3MpO1xufTtcblxudmFyIGlzVHlwZWRBcnJheSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIGhhcyhUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCwgY2xhc3NvZihpdCkpO1xufTtcblxudmFyIGFUeXBlZEFycmF5ID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc1R5cGVkQXJyYXkoaXQpKSByZXR1cm4gaXQ7XG4gIHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBhIHR5cGVkIGFycmF5Jyk7XG59O1xuXG52YXIgYVR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChDKSB7XG4gIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgIGlmIChpc1Byb3RvdHlwZU9mLmNhbGwoVHlwZWRBcnJheSwgQykpIHJldHVybiBDO1xuICB9IGVsc2UgZm9yICh2YXIgQVJSQVkgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QpIGlmIChoYXMoVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QsIE5BTUUpKSB7XG4gICAgdmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IGdsb2JhbFtBUlJBWV07XG4gICAgaWYgKFR5cGVkQXJyYXlDb25zdHJ1Y3RvciAmJiAoQyA9PT0gVHlwZWRBcnJheUNvbnN0cnVjdG9yIHx8IGlzUHJvdG90eXBlT2YuY2FsbChUeXBlZEFycmF5Q29uc3RydWN0b3IsIEMpKSkge1xuICAgICAgcmV0dXJuIEM7XG4gICAgfVxuICB9IHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBhIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yJyk7XG59O1xuXG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IGZ1bmN0aW9uIChLRVksIHByb3BlcnR5LCBmb3JjZWQpIHtcbiAgaWYgKCFERVNDUklQVE9SUykgcmV0dXJuO1xuICBpZiAoZm9yY2VkKSBmb3IgKHZhciBBUlJBWSBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCkge1xuICAgIHZhciBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQVJSQVldO1xuICAgIGlmIChUeXBlZEFycmF5Q29uc3RydWN0b3IgJiYgaGFzKFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIEtFWSkpIHtcbiAgICAgIGRlbGV0ZSBUeXBlZEFycmF5Q29uc3RydWN0b3IucHJvdG90eXBlW0tFWV07XG4gICAgfVxuICB9XG4gIGlmICghVHlwZWRBcnJheVByb3RvdHlwZVtLRVldIHx8IGZvcmNlZCkge1xuICAgIHJlZGVmaW5lKFR5cGVkQXJyYXlQcm90b3R5cGUsIEtFWSwgZm9yY2VkID8gcHJvcGVydHlcbiAgICAgIDogTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyAmJiBJbnQ4QXJyYXlQcm90b3R5cGVbS0VZXSB8fCBwcm9wZXJ0eSk7XG4gIH1cbn07XG5cbnZhciBleHBvcnRUeXBlZEFycmF5U3RhdGljTWV0aG9kID0gZnVuY3Rpb24gKEtFWSwgcHJvcGVydHksIGZvcmNlZCkge1xuICB2YXIgQVJSQVksIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcjtcbiAgaWYgKCFERVNDUklQVE9SUykgcmV0dXJuO1xuICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICBpZiAoZm9yY2VkKSBmb3IgKEFSUkFZIGluIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnNMaXN0KSB7XG4gICAgICBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQVJSQVldO1xuICAgICAgaWYgKFR5cGVkQXJyYXlDb25zdHJ1Y3RvciAmJiBoYXMoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBLRVkpKSB7XG4gICAgICAgIGRlbGV0ZSBUeXBlZEFycmF5Q29uc3RydWN0b3JbS0VZXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFUeXBlZEFycmF5W0tFWV0gfHwgZm9yY2VkKSB7XG4gICAgICAvLyBWOCB+IENocm9tZSA0OS01MCBgJVR5cGVkQXJyYXklYCBtZXRob2RzIGFyZSBub24td3JpdGFibGUgbm9uLWNvbmZpZ3VyYWJsZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHJlZGVmaW5lKFR5cGVkQXJyYXksIEtFWSwgZm9yY2VkID8gcHJvcGVydHkgOiBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTICYmIEludDhBcnJheVtLRVldIHx8IHByb3BlcnR5KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgICB9IGVsc2UgcmV0dXJuO1xuICB9XG4gIGZvciAoQVJSQVkgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QpIHtcbiAgICBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQVJSQVldO1xuICAgIGlmIChUeXBlZEFycmF5Q29uc3RydWN0b3IgJiYgKCFUeXBlZEFycmF5Q29uc3RydWN0b3JbS0VZXSB8fCBmb3JjZWQpKSB7XG4gICAgICByZWRlZmluZShUeXBlZEFycmF5Q29uc3RydWN0b3IsIEtFWSwgcHJvcGVydHkpO1xuICAgIH1cbiAgfVxufTtcblxuZm9yIChOQU1FIGluIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnNMaXN0KSB7XG4gIGlmICghZ2xvYmFsW05BTUVdKSBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTID0gZmFsc2U7XG59XG5cbi8vIFdlYktpdCBidWcgLSB0eXBlZCBhcnJheXMgY29uc3RydWN0b3JzIHByb3RvdHlwZSBpcyBPYmplY3QucHJvdG90eXBlXG5pZiAoIU5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MgfHwgdHlwZW9mIFR5cGVkQXJyYXkgIT0gJ2Z1bmN0aW9uJyB8fCBUeXBlZEFycmF5ID09PSBGdW5jdGlvbi5wcm90b3R5cGUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICBUeXBlZEFycmF5ID0gZnVuY3Rpb24gVHlwZWRBcnJheSgpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29ycmVjdCBpbnZvY2F0aW9uJyk7XG4gIH07XG4gIGlmIChOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTKSBmb3IgKE5BTUUgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yc0xpc3QpIHtcbiAgICBpZiAoZ2xvYmFsW05BTUVdKSBzZXRQcm90b3R5cGVPZihnbG9iYWxbTkFNRV0sIFR5cGVkQXJyYXkpO1xuICB9XG59XG5cbmlmICghTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyB8fCAhVHlwZWRBcnJheVByb3RvdHlwZSB8fCBUeXBlZEFycmF5UHJvdG90eXBlID09PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXkucHJvdG90eXBlO1xuICBpZiAoTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUykgZm9yIChOQU1FIGluIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnNMaXN0KSB7XG4gICAgaWYgKGdsb2JhbFtOQU1FXSkgc2V0UHJvdG90eXBlT2YoZ2xvYmFsW05BTUVdLnByb3RvdHlwZSwgVHlwZWRBcnJheVByb3RvdHlwZSk7XG4gIH1cbn1cblxuLy8gV2ViS2l0IGJ1ZyAtIG9uZSBtb3JlIG9iamVjdCBpbiBVaW50OENsYW1wZWRBcnJheSBwcm90b3R5cGUgY2hhaW5cbmlmIChOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlKSAhPT0gVHlwZWRBcnJheVByb3RvdHlwZSkge1xuICBzZXRQcm90b3R5cGVPZihVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSwgVHlwZWRBcnJheVByb3RvdHlwZSk7XG59XG5cbmlmIChERVNDUklQVE9SUyAmJiAhaGFzKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gIFRZUEVEX0FSUkFZX1RBR19SRVFJUkVEID0gdHJ1ZTtcbiAgZGVmaW5lUHJvcGVydHkoVHlwZWRBcnJheVByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaXNPYmplY3QodGhpcykgPyB0aGlzW1RZUEVEX0FSUkFZX1RBR10gOiB1bmRlZmluZWQ7XG4gIH0gfSk7XG4gIGZvciAoTkFNRSBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3JzTGlzdCkgaWYgKGdsb2JhbFtOQU1FXSkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWxbTkFNRV0sIFRZUEVEX0FSUkFZX1RBRywgTkFNRSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1M6IE5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MsXG4gIFRZUEVEX0FSUkFZX1RBRzogVFlQRURfQVJSQVlfVEFHX1JFUUlSRUQgJiYgVFlQRURfQVJSQVlfVEFHLFxuICBhVHlwZWRBcnJheTogYVR5cGVkQXJyYXksXG4gIGFUeXBlZEFycmF5Q29uc3RydWN0b3I6IGFUeXBlZEFycmF5Q29uc3RydWN0b3IsXG4gIGV4cG9ydFR5cGVkQXJyYXlNZXRob2Q6IGV4cG9ydFR5cGVkQXJyYXlNZXRob2QsXG4gIGV4cG9ydFR5cGVkQXJyYXlTdGF0aWNNZXRob2Q6IGV4cG9ydFR5cGVkQXJyYXlTdGF0aWNNZXRob2QsXG4gIGlzVmlldzogaXNWaWV3LFxuICBpc1R5cGVkQXJyYXk6IGlzVHlwZWRBcnJheSxcbiAgVHlwZWRBcnJheTogVHlwZWRBcnJheSxcbiAgVHlwZWRBcnJheVByb3RvdHlwZTogVHlwZWRBcnJheVByb3RvdHlwZVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24nKTtcbnZhciBOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKS5OQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTO1xuXG52YXIgQXJyYXlCdWZmZXIgPSBnbG9iYWwuQXJyYXlCdWZmZXI7XG52YXIgSW50OEFycmF5ID0gZ2xvYmFsLkludDhBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSAhTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBJbnQ4QXJyYXkoMSk7XG59KSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBuZXcgSW50OEFycmF5KC0xKTtcbn0pIHx8ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIG5ldyBJbnQ4QXJyYXkoKTtcbiAgbmV3IEludDhBcnJheShudWxsKTtcbiAgbmV3IEludDhBcnJheSgxLjUpO1xuICBuZXcgSW50OEFycmF5KGl0ZXJhYmxlKTtcbn0sIHRydWUpIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gU2FmYXJpICgxMSspIGJ1ZyAtIGEgcmVhc29uIHdoeSBldmVuIFNhZmFyaSAxMyBzaG91bGQgbG9hZCBhIHR5cGVkIGFycmF5IHBvbHlmaWxsXG4gIHJldHVybiBuZXcgSW50OEFycmF5KG5ldyBBcnJheUJ1ZmZlcigyKSwgMSwgdW5kZWZpbmVkKS5sZW5ndGggIT09IDE7XG59KTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gdG9JbnRlZ2VyKGl0KTtcbiAgaWYgKHJlc3VsdCA8IDApIHRocm93IFJhbmdlRXJyb3IoXCJUaGUgYXJndW1lbnQgY2FuJ3QgYmUgbGVzcyB0aGFuIDBcIik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIHRvUG9zaXRpdmVJbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXBvc2l0aXZlLWludGVnZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIEJZVEVTKSB7XG4gIHZhciBvZmZzZXQgPSB0b1Bvc2l0aXZlSW50ZWdlcihpdCk7XG4gIGlmIChvZmZzZXQgJSBCWVRFUykgdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0Jyk7XG4gIHJldHVybiBvZmZzZXQ7XG59O1xuIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpc0FycmF5SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBhVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKS5hVHlwZWRBcnJheUNvbnN0cnVjdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oc291cmNlIC8qICwgbWFwZm4sIHRoaXNBcmcgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChzb3VyY2UpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGksIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvciwgbmV4dDtcbiAgaWYgKGl0ZXJhdG9yTWV0aG9kICE9IHVuZGVmaW5lZCAmJiAhaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJhdG9yTWV0aG9kKSkge1xuICAgIGl0ZXJhdG9yID0gaXRlcmF0b3JNZXRob2QuY2FsbChPKTtcbiAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICBPID0gW107XG4gICAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICAgIE8ucHVzaChzdGVwLnZhbHVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKG1hcHBpbmcgJiYgYXJndW1lbnRzTGVuZ3RoID4gMikge1xuICAgIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgfVxuICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHJlc3VsdCA9IG5ldyAoYVR5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0aGlzKSkobGVuZ3RoKTtcbiAgZm9yIChpID0gMDsgbGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgcmVzdWx0W2ldID0gbWFwcGluZyA/IG1hcGZuKE9baV0sIGkpIDogT1tpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBtYWtlcyBzdWJjbGFzc2luZyB3b3JrIGNvcnJlY3QgZm9yIHdyYXBwZWQgYnVpbHQtaW5zXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkdGhpcywgZHVtbXksIFdyYXBwZXIpIHtcbiAgdmFyIE5ld1RhcmdldCwgTmV3VGFyZ2V0UHJvdG90eXBlO1xuICBpZiAoXG4gICAgLy8gaXQgY2FuIHdvcmsgb25seSB3aXRoIG5hdGl2ZSBgc2V0UHJvdG90eXBlT2ZgXG4gICAgc2V0UHJvdG90eXBlT2YgJiZcbiAgICAvLyB3ZSBoYXZlbid0IGNvbXBsZXRlbHkgY29ycmVjdCBwcmUtRVM2IHdheSBmb3IgZ2V0dGluZyBgbmV3LnRhcmdldGAsIHNvIHVzZSB0aGlzXG4gICAgdHlwZW9mIChOZXdUYXJnZXQgPSBkdW1teS5jb25zdHJ1Y3RvcikgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgVFlQRURfQVJSQVlTX0NPTlNUUlVDVE9SU19SRVFVSVJFU19XUkFQUEVSUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90eXBlZC1hcnJheS1jb25zdHJ1Y3RvcnMtcmVxdWlyZS13cmFwcGVycycpO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIEFycmF5QnVmZmVyTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlcicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleCcpO1xudmFyIHRvT2Zmc2V0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9mZnNldCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpLmY7XG52YXIgdHlwZWRBcnJheUZyb20gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHlwZWQtYXJyYXktZnJvbScpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xudmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBSYW5nZUVycm9yID0gZ2xvYmFsLlJhbmdlRXJyb3I7XG52YXIgQXJyYXlCdWZmZXIgPSBBcnJheUJ1ZmZlck1vZHVsZS5BcnJheUJ1ZmZlcjtcbnZhciBEYXRhVmlldyA9IEFycmF5QnVmZmVyTW9kdWxlLkRhdGFWaWV3O1xudmFyIE5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLk5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1M7XG52YXIgVFlQRURfQVJSQVlfVEFHID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5UWVBFRF9BUlJBWV9UQUc7XG52YXIgVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuVHlwZWRBcnJheTtcbnZhciBUeXBlZEFycmF5UHJvdG90eXBlID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5UeXBlZEFycmF5UHJvdG90eXBlO1xudmFyIGFUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5Q29uc3RydWN0b3I7XG52YXIgaXNUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5pc1R5cGVkQXJyYXk7XG52YXIgQllURVNfUEVSX0VMRU1FTlQgPSAnQllURVNfUEVSX0VMRU1FTlQnO1xudmFyIFdST05HX0xFTkdUSCA9ICdXcm9uZyBsZW5ndGgnO1xuXG52YXIgZnJvbUxpc3QgPSBmdW5jdGlvbiAoQywgbGlzdCkge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBuZXcgKGFUeXBlZEFycmF5Q29uc3RydWN0b3IoQykpKGxlbmd0aCk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgcmVzdWx0W2luZGV4XSA9IGxpc3RbaW5kZXgrK107XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgbmF0aXZlRGVmaW5lUHJvcGVydHkoaXQsIGtleSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKVtrZXldO1xuICB9IH0pO1xufTtcblxudmFyIGlzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGtsYXNzO1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCAoa2xhc3MgPSBjbGFzc29mKGl0KSkgPT0gJ0FycmF5QnVmZmVyJyB8fCBrbGFzcyA9PSAnU2hhcmVkQXJyYXlCdWZmZXInO1xufTtcblxudmFyIGlzVHlwZWRBcnJheUluZGV4ID0gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gIHJldHVybiBpc1R5cGVkQXJyYXkodGFyZ2V0KVxuICAgICYmIHR5cGVvZiBrZXkgIT0gJ3N5bWJvbCdcbiAgICAmJiBrZXkgaW4gdGFyZ2V0XG4gICAgJiYgU3RyaW5nKCtrZXkpID09IFN0cmluZyhrZXkpO1xufTtcblxudmFyIHdyYXBwZWRHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcbiAgcmV0dXJuIGlzVHlwZWRBcnJheUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICA/IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigyLCB0YXJnZXRba2V5XSlcbiAgICA6IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG59O1xuXG52YXIgd3JhcHBlZERlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgaWYgKGlzVHlwZWRBcnJheUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAmJiBpc09iamVjdChkZXNjcmlwdG9yKVxuICAgICYmIGhhcyhkZXNjcmlwdG9yLCAndmFsdWUnKVxuICAgICYmICFoYXMoZGVzY3JpcHRvciwgJ2dldCcpXG4gICAgJiYgIWhhcyhkZXNjcmlwdG9yLCAnc2V0JylcbiAgICAvLyBUT0RPOiBhZGQgdmFsaWRhdGlvbiBkZXNjcmlwdG9yIHcvbyBjYWxsaW5nIGFjY2Vzc29yc1xuICAgICYmICFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZVxuICAgICYmICghaGFzKGRlc2NyaXB0b3IsICd3cml0YWJsZScpIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUpXG4gICAgJiYgKCFoYXMoZGVzY3JpcHRvciwgJ2VudW1lcmFibGUnKSB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUpXG4gICkge1xuICAgIHRhcmdldFtrZXldID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG59O1xuXG5pZiAoREVTQ1JJUFRPUlMpIHtcbiAgaWYgKCFOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTKSB7XG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmYgPSB3cmFwcGVkR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAgIGRlZmluZVByb3BlcnR5TW9kdWxlLmYgPSB3cmFwcGVkRGVmaW5lUHJvcGVydHk7XG4gICAgYWRkR2V0dGVyKFR5cGVkQXJyYXlQcm90b3R5cGUsICdidWZmZXInKTtcbiAgICBhZGRHZXR0ZXIoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2J5dGVPZmZzZXQnKTtcbiAgICBhZGRHZXR0ZXIoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2J5dGVMZW5ndGgnKTtcbiAgICBhZGRHZXR0ZXIoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2xlbmd0aCcpO1xuICB9XG5cbiAgJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9BUlJBWV9CVUZGRVJfVklFV1MgfSwge1xuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogd3JhcHBlZEdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICBkZWZpbmVQcm9wZXJ0eTogd3JhcHBlZERlZmluZVByb3BlcnR5XG4gIH0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRZUEUsIHdyYXBwZXIsIENMQU1QRUQpIHtcbiAgICB2YXIgQllURVMgPSBUWVBFLm1hdGNoKC9cXGQrJC8pWzBdIC8gODtcbiAgICB2YXIgQ09OU1RSVUNUT1JfTkFNRSA9IFRZUEUgKyAoQ0xBTVBFRCA/ICdDbGFtcGVkJyA6ICcnKSArICdBcnJheSc7XG4gICAgdmFyIEdFVFRFUiA9ICdnZXQnICsgVFlQRTtcbiAgICB2YXIgU0VUVEVSID0gJ3NldCcgKyBUWVBFO1xuICAgIHZhciBOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBnbG9iYWxbQ09OU1RSVUNUT1JfTkFNRV07XG4gICAgdmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvcjtcbiAgICB2YXIgVHlwZWRBcnJheUNvbnN0cnVjdG9yUHJvdG90eXBlID0gVHlwZWRBcnJheUNvbnN0cnVjdG9yICYmIFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgdmFyIGV4cG9ydGVkID0ge307XG5cbiAgICB2YXIgZ2V0dGVyID0gZnVuY3Rpb24gKHRoYXQsIGluZGV4KSB7XG4gICAgICB2YXIgZGF0YSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICByZXR1cm4gZGF0YS52aWV3W0dFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEuYnl0ZU9mZnNldCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodGhhdCwgaW5kZXgsIHZhbHVlKSB7XG4gICAgICB2YXIgZGF0YSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICBpZiAoQ0xBTVBFRCkgdmFsdWUgPSAodmFsdWUgPSByb3VuZCh2YWx1ZSkpIDwgMCA/IDAgOiB2YWx1ZSA+IDB4RkYgPyAweEZGIDogdmFsdWUgJiAweEZGO1xuICAgICAgZGF0YS52aWV3W1NFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEuYnl0ZU9mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIH07XG5cbiAgICB2YXIgYWRkRWxlbWVudCA9IGZ1bmN0aW9uICh0aGF0LCBpbmRleCkge1xuICAgICAgbmF0aXZlRGVmaW5lUHJvcGVydHkodGhhdCwgaW5kZXgsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldHRlcih0aGlzLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHNldHRlcih0aGlzLCBpbmRleCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKCFOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTKSB7XG4gICAgICBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBkYXRhLCBvZmZzZXQsICRsZW5ndGgpIHtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGF0LCBUeXBlZEFycmF5Q29uc3RydWN0b3IsIENPTlNUUlVDVE9SX05BTUUpO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgYnl0ZU9mZnNldCA9IDA7XG4gICAgICAgIHZhciBidWZmZXIsIGJ5dGVMZW5ndGgsIGxlbmd0aDtcbiAgICAgICAgaWYgKCFpc09iamVjdChkYXRhKSkge1xuICAgICAgICAgIGxlbmd0aCA9IHRvSW5kZXgoZGF0YSk7XG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGxlbmd0aCAqIEJZVEVTO1xuICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5QnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgYnVmZmVyID0gZGF0YTtcbiAgICAgICAgICBieXRlT2Zmc2V0ID0gdG9PZmZzZXQob2Zmc2V0LCBCWVRFUyk7XG4gICAgICAgICAgdmFyICRsZW4gPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgaWYgKCRsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCRsZW4gJSBCWVRFUykgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9ICRsZW4gLSBieXRlT2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGJ5dGVMZW5ndGggPCAwKSB0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGggPSB0b0xlbmd0aCgkbGVuZ3RoKSAqIEJZVEVTO1xuICAgICAgICAgICAgaWYgKGJ5dGVMZW5ndGggKyBieXRlT2Zmc2V0ID4gJGxlbikgdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZW5ndGggPSBieXRlTGVuZ3RoIC8gQllURVM7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNUeXBlZEFycmF5KGRhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuIGZyb21MaXN0KFR5cGVkQXJyYXlDb25zdHJ1Y3RvciwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVkQXJyYXlGcm9tLmNhbGwoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRJbnRlcm5hbFN0YXRlKHRoYXQsIHtcbiAgICAgICAgICBidWZmZXI6IGJ1ZmZlcixcbiAgICAgICAgICBieXRlT2Zmc2V0OiBieXRlT2Zmc2V0LFxuICAgICAgICAgIGJ5dGVMZW5ndGg6IGJ5dGVMZW5ndGgsXG4gICAgICAgICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgICAgICAgdmlldzogbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICAgICAgfSk7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCkgYWRkRWxlbWVudCh0aGF0LCBpbmRleCsrKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHNldFByb3RvdHlwZU9mKFR5cGVkQXJyYXlDb25zdHJ1Y3RvciwgVHlwZWRBcnJheSk7XG4gICAgICBUeXBlZEFycmF5Q29uc3RydWN0b3JQcm90b3R5cGUgPSBUeXBlZEFycmF5Q29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKFR5cGVkQXJyYXlQcm90b3R5cGUpO1xuICAgIH0gZWxzZSBpZiAoVFlQRURfQVJSQVlTX0NPTlNUUlVDVE9SU19SRVFVSVJFU19XUkFQUEVSUykge1xuICAgICAgVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gd3JhcHBlcihmdW5jdGlvbiAoZHVtbXksIGRhdGEsIHR5cGVkQXJyYXlPZmZzZXQsICRsZW5ndGgpIHtcbiAgICAgICAgYW5JbnN0YW5jZShkdW1teSwgVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICAgICAgcmV0dXJuIGluaGVyaXRJZlJlcXVpcmVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIWlzT2JqZWN0KGRhdGEpKSByZXR1cm4gbmV3IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0b0luZGV4KGRhdGEpKTtcbiAgICAgICAgICBpZiAoaXNBcnJheUJ1ZmZlcihkYXRhKSkgcmV0dXJuICRsZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBuZXcgTmF0aXZlVHlwZWRBcnJheUNvbnN0cnVjdG9yKGRhdGEsIHRvT2Zmc2V0KHR5cGVkQXJyYXlPZmZzZXQsIEJZVEVTKSwgJGxlbmd0aClcbiAgICAgICAgICAgIDogdHlwZWRBcnJheU9mZnNldCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gbmV3IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvcihkYXRhLCB0b09mZnNldCh0eXBlZEFycmF5T2Zmc2V0LCBCWVRFUykpXG4gICAgICAgICAgICAgIDogbmV3IE5hdGl2ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvcihkYXRhKTtcbiAgICAgICAgICBpZiAoaXNUeXBlZEFycmF5KGRhdGEpKSByZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBkYXRhKTtcbiAgICAgICAgICByZXR1cm4gdHlwZWRBcnJheUZyb20uY2FsbChUeXBlZEFycmF5Q29uc3RydWN0b3IsIGRhdGEpO1xuICAgICAgICB9KCksIGR1bW15LCBUeXBlZEFycmF5Q29uc3RydWN0b3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzZXRQcm90b3R5cGVPZikgc2V0UHJvdG90eXBlT2YoVHlwZWRBcnJheUNvbnN0cnVjdG9yLCBUeXBlZEFycmF5KTtcbiAgICAgIGZvckVhY2goZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3IpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghKGtleSBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFR5cGVkQXJyYXlDb25zdHJ1Y3Rvciwga2V5LCBOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3Jba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgVHlwZWRBcnJheUNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IFR5cGVkQXJyYXlDb25zdHJ1Y3RvclByb3RvdHlwZTtcbiAgICB9XG5cbiAgICBpZiAoVHlwZWRBcnJheUNvbnN0cnVjdG9yUHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShUeXBlZEFycmF5Q29uc3RydWN0b3JQcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKFRZUEVEX0FSUkFZX1RBRykge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFR5cGVkQXJyYXlDb25zdHJ1Y3RvclByb3RvdHlwZSwgVFlQRURfQVJSQVlfVEFHLCBDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICB9XG5cbiAgICBleHBvcnRlZFtDT05TVFJVQ1RPUl9OQU1FXSA9IFR5cGVkQXJyYXlDb25zdHJ1Y3RvcjtcblxuICAgICQoe1xuICAgICAgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IFR5cGVkQXJyYXlDb25zdHJ1Y3RvciAhPSBOYXRpdmVUeXBlZEFycmF5Q29uc3RydWN0b3IsIHNoYW06ICFOQVRJVkVfQVJSQVlfQlVGRkVSX1ZJRVdTXG4gICAgfSwgZXhwb3J0ZWQpO1xuXG4gICAgaWYgKCEoQllURVNfUEVSX0VMRU1FTlQgaW4gVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFR5cGVkQXJyYXlDb25zdHJ1Y3RvciwgQllURVNfUEVSX0VMRU1FTlQsIEJZVEVTKTtcbiAgICB9XG5cbiAgICBpZiAoIShCWVRFU19QRVJfRUxFTUVOVCBpbiBUeXBlZEFycmF5Q29uc3RydWN0b3JQcm90b3R5cGUpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoVHlwZWRBcnJheUNvbnN0cnVjdG9yUHJvdG90eXBlLCBCWVRFU19QRVJfRUxFTUVOVCwgQllURVMpO1xuICAgIH1cblxuICAgIHNldFNwZWNpZXMoQ09OU1RSVUNUT1JfTkFNRSk7XG4gIH07XG59IGVsc2UgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCJ2YXIgY3JlYXRlVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3R5cGVkLWFycmF5LWNvbnN0cnVjdG9yJyk7XG5cbi8vIGBVaW50OEFycmF5YCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZWRhcnJheS1vYmplY3RzXG5jcmVhdGVUeXBlZEFycmF5Q29uc3RydWN0b3IoJ1VpbnQ4JywgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbmAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29weXdpdGhpblxubW9kdWxlLmV4cG9ydHMgPSBbXS5jb3B5V2l0aGluIHx8IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0IC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciB0byA9IHRvQWJzb2x1dGVJbmRleCh0YXJnZXQsIGxlbik7XG4gIHZhciBmcm9tID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICB2YXIgZW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBjb3VudCA9IG1pbigoZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW4pKSAtIGZyb20sIGxlbiAtIHRvKTtcbiAgdmFyIGluYyA9IDE7XG4gIGlmIChmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpIHtcbiAgICBpbmMgPSAtMTtcbiAgICBmcm9tICs9IGNvdW50IC0gMTtcbiAgICB0byArPSBjb3VudCAtIDE7XG4gIH1cbiAgd2hpbGUgKGNvdW50LS0gPiAwKSB7XG4gICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgIHRvICs9IGluYztcbiAgICBmcm9tICs9IGluYztcbiAgfSByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGNvcHlXaXRoaW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktY29weS13aXRoaW4nKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5jb3B5V2l0aGluYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuY29weXdpdGhpblxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnY29weVdpdGhpbicsIGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCAvKiAsIGVuZCAqLykge1xuICByZXR1cm4gJGNvcHlXaXRoaW4uY2FsbChhVHlwZWRBcnJheSh0aGlzKSwgdGFyZ2V0LCBzdGFydCwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGV2ZXJ5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmV2ZXJ5O1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuZXZlcnlcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2V2ZXJ5JywgZnVuY3Rpb24gZXZlcnkoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRldmVyeShhVHlwZWRBcnJheSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGZpbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZmlsbCcpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmZpbGxgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5maWxsXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2ZpbGwnLCBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qICwgc3RhcnQsIGVuZCAqLykge1xuICByZXR1cm4gJGZpbGwuYXBwbHkoYVR5cGVkQXJyYXkodGhpcyksIGFyZ3VtZW50cyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkZmlsdGVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbHRlcjtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGFUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5Q29uc3RydWN0b3I7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuZmlsdGVyXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdmaWx0ZXInLCBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgdmFyIGxpc3QgPSAkZmlsdGVyKGFUeXBlZEFycmF5KHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBuZXcgKGFUeXBlZEFycmF5Q29uc3RydWN0b3IoQykpKGxlbmd0aCk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgcmVzdWx0W2luZGV4XSA9IGxpc3RbaW5kZXgrK107XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkZmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maW5kO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5maW5kXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdmaW5kJywgZnVuY3Rpb24gZmluZChwcmVkaWNhdGUgLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZmluZChhVHlwZWRBcnJheSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkZmluZEluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmRJbmRleDtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5maW5kaW5kZXhcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2ZpbmRJbmRleCcsIGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUgLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZmluZEluZGV4KGFUeXBlZEFycmF5KHRoaXMpLCBwcmVkaWNhdGUsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLmZvcmVhY2hcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2ZvckVhY2gnLCBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICRmb3JFYWNoKGFUeXBlZEFycmF5KHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmNsdWRlcztcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLmluY2x1ZGVzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdpbmNsdWRlcycsIGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggKi8pIHtcbiAgcmV0dXJuICRpbmNsdWRlcyhhVHlwZWRBcnJheSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5pbmRleG9mXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdpbmRleE9mJywgZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ICovKSB7XG4gIHJldHVybiAkaW5kZXhPZihhVHlwZWRBcnJheSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIEFycmF5SXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5O1xudmFyIGFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvcnMudmFsdWVzO1xudmFyIGFycmF5S2V5cyA9IEFycmF5SXRlcmF0b3JzLmtleXM7XG52YXIgYXJyYXlFbnRyaWVzID0gQXJyYXlJdGVyYXRvcnMuZW50cmllcztcbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcbnZhciBuYXRpdmVUeXBlZEFycmF5SXRlcmF0b3IgPSBVaW50OEFycmF5ICYmIFVpbnQ4QXJyYXkucHJvdG90eXBlW0lURVJBVE9SXTtcblxudmFyIENPUlJFQ1RfSVRFUl9OQU1FID0gISFuYXRpdmVUeXBlZEFycmF5SXRlcmF0b3JcbiAgJiYgKG5hdGl2ZVR5cGVkQXJyYXlJdGVyYXRvci5uYW1lID09ICd2YWx1ZXMnIHx8IG5hdGl2ZVR5cGVkQXJyYXlJdGVyYXRvci5uYW1lID09IHVuZGVmaW5lZCk7XG5cbnZhciB0eXBlZEFycmF5VmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKCkge1xuICByZXR1cm4gYXJyYXlWYWx1ZXMuY2FsbChhVHlwZWRBcnJheSh0aGlzKSk7XG59O1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuZW50cmllc1xuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnZW50cmllcycsIGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gIHJldHVybiBhcnJheUVudHJpZXMuY2FsbChhVHlwZWRBcnJheSh0aGlzKSk7XG59KTtcbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5rZXlzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdrZXlzJywgZnVuY3Rpb24ga2V5cygpIHtcbiAgcmV0dXJuIGFycmF5S2V5cy5jYWxsKGFUeXBlZEFycmF5KHRoaXMpKTtcbn0pO1xuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUudmFsdWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUudmFsdWVzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCd2YWx1ZXMnLCB0eXBlZEFycmF5VmFsdWVzLCAhQ09SUkVDVF9JVEVSX05BTUUpO1xuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKElURVJBVE9SLCB0eXBlZEFycmF5VmFsdWVzLCAhQ09SUkVDVF9JVEVSX05BTUUpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJGpvaW4gPSBbXS5qb2luO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5qb2luYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuam9pblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdqb2luJywgZnVuY3Rpb24gam9pbihzZXBhcmF0b3IpIHtcbiAgcmV0dXJuICRqb2luLmFwcGx5KGFUeXBlZEFycmF5KHRoaXMpLCBhcmd1bWVudHMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIG5hdGl2ZUxhc3RJbmRleE9mID0gW10ubGFzdEluZGV4T2Y7XG52YXIgTkVHQVRJVkVfWkVSTyA9ICEhbmF0aXZlTGFzdEluZGV4T2YgJiYgMSAvIFsxXS5sYXN0SW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdsYXN0SW5kZXhPZicpO1xuLy8gRm9yIHByZXZlbnRpbmcgcG9zc2libGUgYWxtb3N0IGluZmluaXRlIGxvb3AgaW4gbm9uLXN0YW5kYXJkIGltcGxlbWVudGF0aW9ucywgdGVzdCB0aGUgZm9yd2FyZCB2ZXJzaW9uIG9mIHRoZSBtZXRob2RcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdpbmRleE9mJywgeyBBQ0NFU1NPUlM6IHRydWUsIDE6IDAgfSk7XG52YXIgRk9SQ0VEID0gTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEg7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2ZgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmxhc3RpbmRleG9mXG5tb2R1bGUuZXhwb3J0cyA9IEZPUkNFRCA/IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSBAWyotMV0gKi8pIHtcbiAgLy8gY29udmVydCAtMCB0byArMFxuICBpZiAoTkVHQVRJVkVfWkVSTykgcmV0dXJuIG5hdGl2ZUxhc3RJbmRleE9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMDtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciBpbmRleCA9IGxlbmd0aCAtIDE7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgaW5kZXggPSBtaW4oaW5kZXgsIHRvSW50ZWdlcihhcmd1bWVudHNbMV0pKTtcbiAgaWYgKGluZGV4IDwgMCkgaW5kZXggPSBsZW5ndGggKyBpbmRleDtcbiAgZm9yICg7aW5kZXggPj0gMDsgaW5kZXgtLSkgaWYgKGluZGV4IGluIE8gJiYgT1tpbmRleF0gPT09IHNlYXJjaEVsZW1lbnQpIHJldHVybiBpbmRleCB8fCAwO1xuICByZXR1cm4gLTE7XG59IDogbmF0aXZlTGFzdEluZGV4T2Y7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJGxhc3RJbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWxhc3QtaW5kZXgtb2YnKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5sYXN0SW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLmxhc3RpbmRleG9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ2xhc3RJbmRleE9mJywgZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCAqLykge1xuICByZXR1cm4gJGxhc3RJbmRleE9mLmFwcGx5KGFUeXBlZEFycmF5KHRoaXMpLCBhcmd1bWVudHMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBhVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheUNvbnN0cnVjdG9yO1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLm1hcFxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnbWFwJywgZnVuY3Rpb24gbWFwKG1hcGZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJG1hcChhVHlwZWRBcnJheSh0aGlzKSwgbWFwZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCBmdW5jdGlvbiAoTywgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyAoYVR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzcGVjaWVzQ29uc3RydWN0b3IoTywgTy5jb25zdHJ1Y3RvcikpKShsZW5ndGgpO1xuICB9KTtcbn0pO1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgcmVkdWNlLCByZWR1Y2VSaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX1JJR0hUKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgY2FsbGJhY2tmbiwgYXJndW1lbnRzTGVuZ3RoLCBtZW1vKSB7XG4gICAgYUZ1bmN0aW9uKGNhbGxiYWNrZm4pO1xuICAgIHZhciBPID0gdG9PYmplY3QodGhhdCk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gSVNfUklHSFQgPyBsZW5ndGggLSAxIDogMDtcbiAgICB2YXIgaSA9IElTX1JJR0hUID8gLTEgOiAxO1xuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPCAyKSB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKGluZGV4IGluIHNlbGYpIHtcbiAgICAgICAgbWVtbyA9IHNlbGZbaW5kZXhdO1xuICAgICAgICBpbmRleCArPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGluZGV4ICs9IGk7XG4gICAgICBpZiAoSVNfUklHSFQgPyBpbmRleCA8IDAgOiBsZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoO0lTX1JJR0hUID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKSBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgICAgbWVtbyA9IGNhbGxiYWNrZm4obWVtbywgc2VsZltpbmRleF0sIGluZGV4LCBPKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlXG4gIGxlZnQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlcmlnaHRcbiAgcmlnaHQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkcmVkdWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXJlZHVjZScpLmxlZnQ7XG5cbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUucmVkdWNlXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdyZWR1Y2UnLCBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICByZXR1cm4gJHJlZHVjZShhVHlwZWRBcnJheSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgJHJlZHVjZVJpZ2h0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXJlZHVjZScpLnJpZ2h0O1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLnJlZHVjZVJpY2h0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUucmVkdWNlcmlnaHRcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ3JlZHVjZVJpZ2h0JywgZnVuY3Rpb24gcmVkdWNlUmlnaHQoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICByZXR1cm4gJHJlZHVjZVJpZ2h0KGFUeXBlZEFycmF5KHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUucmV2ZXJzZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLnJldmVyc2VcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ3JldmVyc2UnLCBmdW5jdGlvbiByZXZlcnNlKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBsZW5ndGggPSBhVHlwZWRBcnJheSh0aGF0KS5sZW5ndGg7XG4gIHZhciBtaWRkbGUgPSBmbG9vcihsZW5ndGggLyAyKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHZhbHVlO1xuICB3aGlsZSAoaW5kZXggPCBtaWRkbGUpIHtcbiAgICB2YWx1ZSA9IHRoYXRbaW5kZXhdO1xuICAgIHRoYXRbaW5kZXgrK10gPSB0aGF0Wy0tbGVuZ3RoXTtcbiAgICB0aGF0W2xlbmd0aF0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdGhhdDtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvT2Zmc2V0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9mZnNldCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBhVHlwZWRBcnJheSA9IEFycmF5QnVmZmVyVmlld0NvcmUuYVR5cGVkQXJyYXk7XG52YXIgZXhwb3J0VHlwZWRBcnJheU1ldGhvZCA9IEFycmF5QnVmZmVyVmlld0NvcmUuZXhwb3J0VHlwZWRBcnJheU1ldGhvZDtcblxudmFyIEZPUkNFRCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIG5ldyBJbnQ4QXJyYXkoMSkuc2V0KHt9KTtcbn0pO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5zZXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5zZXRcbmV4cG9ydFR5cGVkQXJyYXlNZXRob2QoJ3NldCcsIGZ1bmN0aW9uIHNldChhcnJheUxpa2UgLyogLCBvZmZzZXQgKi8pIHtcbiAgYVR5cGVkQXJyYXkodGhpcyk7XG4gIHZhciBvZmZzZXQgPSB0b09mZnNldChhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMSk7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgdmFyIHNyYyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gIHZhciBsZW4gPSB0b0xlbmd0aChzcmMubGVuZ3RoKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgaWYgKGxlbiArIG9mZnNldCA+IGxlbmd0aCkgdGhyb3cgUmFuZ2VFcnJvcignV3JvbmcgbGVuZ3RoJyk7XG4gIHdoaWxlIChpbmRleCA8IGxlbikgdGhpc1tvZmZzZXQgKyBpbmRleF0gPSBzcmNbaW5kZXgrK107XG59LCBGT1JDRUQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBhVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheUNvbnN0cnVjdG9yO1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJHNsaWNlID0gW10uc2xpY2U7XG5cbnZhciBGT1JDRUQgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBuZXcgSW50OEFycmF5KDEpLnNsaWNlKCk7XG59KTtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUuc2xpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5zbGljZVxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnc2xpY2UnLCBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gIHZhciBsaXN0ID0gJHNsaWNlLmNhbGwoYVR5cGVkQXJyYXkodGhpcyksIHN0YXJ0LCBlbmQpO1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gbmV3IChhVHlwZWRBcnJheUNvbnN0cnVjdG9yKEMpKShsZW5ndGgpO1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHJlc3VsdFtpbmRleF0gPSBsaXN0W2luZGV4KytdO1xuICByZXR1cm4gcmVzdWx0O1xufSwgRk9SQ0VEKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheUJ1ZmZlclZpZXdDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKTtcbnZhciAkc29tZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5zb21lO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG5cbi8vIGAlVHlwZWRBcnJheSUucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS5zb21lXG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdzb21lJywgZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJHNvbWUoYVR5cGVkQXJyYXkodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEFycmF5QnVmZmVyVmlld0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktYnVmZmVyLXZpZXctY29yZScpO1xuXG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJHNvcnQgPSBbXS5zb3J0O1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5zb3J0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLSV0eXBlZGFycmF5JS5wcm90b3R5cGUuc29ydFxuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgnc29ydCcsIGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKSB7XG4gIHJldHVybiAkc29ydC5jYWxsKGFUeXBlZEFycmF5KHRoaXMpLCBjb21wYXJlZm4pO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcblxudmFyIGFUeXBlZEFycmF5ID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5hVHlwZWRBcnJheTtcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gQXJyYXlCdWZmZXJWaWV3Q29yZS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xuXG4vLyBgJVR5cGVkQXJyYXklLnByb3RvdHlwZS5zdWJhcnJheWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0ldHlwZWRhcnJheSUucHJvdG90eXBlLnN1YmFycmF5XG5leHBvcnRUeXBlZEFycmF5TWV0aG9kKCdzdWJhcnJheScsIGZ1bmN0aW9uIHN1YmFycmF5KGJlZ2luLCBlbmQpIHtcbiAgdmFyIE8gPSBhVHlwZWRBcnJheSh0aGlzKTtcbiAgdmFyIGxlbmd0aCA9IE8ubGVuZ3RoO1xuICB2YXIgYmVnaW5JbmRleCA9IHRvQWJzb2x1dGVJbmRleChiZWdpbiwgbGVuZ3RoKTtcbiAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE8uY29uc3RydWN0b3IpKShcbiAgICBPLmJ1ZmZlcixcbiAgICBPLmJ5dGVPZmZzZXQgKyBiZWdpbkluZGV4ICogTy5CWVRFU19QRVJfRUxFTUVOVCxcbiAgICB0b0xlbmd0aCgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW5ndGgpKSAtIGJlZ2luSW5kZXgpXG4gICk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgQXJyYXlCdWZmZXJWaWV3Q29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1idWZmZXItdmlldy1jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIEludDhBcnJheSA9IGdsb2JhbC5JbnQ4QXJyYXk7XG52YXIgYVR5cGVkQXJyYXkgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmFUeXBlZEFycmF5O1xudmFyIGV4cG9ydFR5cGVkQXJyYXlNZXRob2QgPSBBcnJheUJ1ZmZlclZpZXdDb3JlLmV4cG9ydFR5cGVkQXJyYXlNZXRob2Q7XG52YXIgJHRvTG9jYWxlU3RyaW5nID0gW10udG9Mb2NhbGVTdHJpbmc7XG52YXIgJHNsaWNlID0gW10uc2xpY2U7XG5cbi8vIGlPUyBTYWZhcmkgNi54IGZhaWxzIGhlcmVcbnZhciBUT19MT0NBTEVfU1RSSU5HX0JVRyA9ICEhSW50OEFycmF5ICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgJHRvTG9jYWxlU3RyaW5nLmNhbGwobmV3IEludDhBcnJheSgxKSk7XG59KTtcblxudmFyIEZPUkNFRCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFsxLCAyXS50b0xvY2FsZVN0cmluZygpICE9IG5ldyBJbnQ4QXJyYXkoWzEsIDJdKS50b0xvY2FsZVN0cmluZygpO1xufSkgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgSW50OEFycmF5LnByb3RvdHlwZS50b0xvY2FsZVN0cmluZy5jYWxsKFsxLCAyXSk7XG59KTtcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS50b2xvY2FsZXN0cmluZ1xuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgndG9Mb2NhbGVTdHJpbmcnLCBmdW5jdGlvbiB0b0xvY2FsZVN0cmluZygpIHtcbiAgcmV0dXJuICR0b0xvY2FsZVN0cmluZy5hcHBseShUT19MT0NBTEVfU1RSSU5HX0JVRyA/ICRzbGljZS5jYWxsKGFUeXBlZEFycmF5KHRoaXMpKSA6IGFUeXBlZEFycmF5KHRoaXMpLCBhcmd1bWVudHMpO1xufSwgRk9SQ0VEKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBleHBvcnRUeXBlZEFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWJ1ZmZlci12aWV3LWNvcmUnKS5leHBvcnRUeXBlZEFycmF5TWV0aG9kO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5O1xudmFyIFVpbnQ4QXJyYXlQcm90b3R5cGUgPSBVaW50OEFycmF5ICYmIFVpbnQ4QXJyYXkucHJvdG90eXBlIHx8IHt9O1xudmFyIGFycmF5VG9TdHJpbmcgPSBbXS50b1N0cmluZztcbnZhciBhcnJheUpvaW4gPSBbXS5qb2luO1xuXG5pZiAoZmFpbHMoZnVuY3Rpb24gKCkgeyBhcnJheVRvU3RyaW5nLmNhbGwoe30pOyB9KSkge1xuICBhcnJheVRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRoaXMpO1xuICB9O1xufVxuXG52YXIgSVNfTk9UX0FSUkFZX01FVEhPRCA9IFVpbnQ4QXJyYXlQcm90b3R5cGUudG9TdHJpbmcgIT0gYXJyYXlUb1N0cmluZztcblxuLy8gYCVUeXBlZEFycmF5JS5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXR5cGVkYXJyYXklLnByb3RvdHlwZS50b3N0cmluZ1xuZXhwb3J0VHlwZWRBcnJheU1ldGhvZCgndG9TdHJpbmcnLCBhcnJheVRvU3RyaW5nLCBJU19OT1RfQVJSQVlfTUVUSE9EKTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHVybCA9IG5ldyBVUkwoJ2I/YT0xJmI9MiZjPTMnLCAnaHR0cDovL2EnKTtcbiAgdmFyIHNlYXJjaFBhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXM7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdXJsLnBhdGhuYW1lID0gJ2MlMjBkJztcbiAgc2VhcmNoUGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBzZWFyY2hQYXJhbXNbJ2RlbGV0ZSddKCdiJyk7XG4gICAgcmVzdWx0ICs9IGtleSArIHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIChJU19QVVJFICYmICF1cmwudG9KU09OKVxuICAgIHx8ICFzZWFyY2hQYXJhbXMuc29ydFxuICAgIHx8IHVybC5ocmVmICE9PSAnaHR0cDovL2EvYyUyMGQ/YT0xJmM9MydcbiAgICB8fCBzZWFyY2hQYXJhbXMuZ2V0KCdjJykgIT09ICczJ1xuICAgIHx8IFN0cmluZyhuZXcgVVJMU2VhcmNoUGFyYW1zKCc/YT0xJykpICE9PSAnYT0xJ1xuICAgIHx8ICFzZWFyY2hQYXJhbXNbSVRFUkFUT1JdXG4gICAgLy8gdGhyb3dzIGluIEVkZ2VcbiAgICB8fCBuZXcgVVJMKCdodHRwczovL2FAYicpLnVzZXJuYW1lICE9PSAnYSdcbiAgICB8fCBuZXcgVVJMU2VhcmNoUGFyYW1zKG5ldyBVUkxTZWFyY2hQYXJhbXMoJ2E9YicpKS5nZXQoJ2EnKSAhPT0gJ2InXG4gICAgLy8gbm90IHB1bnljb2RlZCBpbiBFZGdlXG4gICAgfHwgbmV3IFVSTCgnaHR0cDovL9GC0LXRgdGCJykuaG9zdCAhPT0gJ3huLS1lMWF5YmMnXG4gICAgLy8gbm90IGVzY2FwZWQgaW4gQ2hyb21lIDYyLVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly9hI9CxJykuaGFzaCAhPT0gJyMlRDAlQjEnXG4gICAgLy8gZmFpbHMgaW4gQ2hyb21lIDY2LVxuICAgIHx8IHJlc3VsdCAhPT0gJ2ExYzMnXG4gICAgLy8gdGhyb3dzIGluIFNhZmFyaVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly94JywgdW5kZWZpbmVkKS5ob3N0ICE9PSAneCc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG5cbnZhciBuYXRpdmVBc3NpZ24gPSBPYmplY3QuYXNzaWduO1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgbmF0aXZlQXNzaWduKHsgYjogMSB9LCBuYXRpdmVBc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgRU5UUklFUykge1xuICB0cnkge1xuICAgIHJldHVybiBFTlRSSUVTID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvciwgbmV4dCwgdmFsdWU7XG4gIGlmIChtYXBwaW5nKSBtYXBmbiA9IGJpbmQobWFwZm4sIGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAvLyBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBpdGVyYWJsZSBvciBpdCdzIGFuIGFycmF5IHdpdGggdGhlIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2UgYSBzaW1wbGUgY2FzZVxuICBpZiAoaXRlcmF0b3JNZXRob2QgIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcmF0b3JNZXRob2QoaXRlcmF0b3JNZXRob2QpKSkge1xuICAgIGl0ZXJhdG9yID0gaXRlcmF0b3JNZXRob2QuY2FsbChPKTtcbiAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICByZXN1bHQgPSBuZXcgQygpO1xuICAgIGZvciAoOyEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IGNhbGxXaXRoU2FmZUl0ZXJhdGlvbkNsb3NpbmcoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICByZXN1bHQgPSBuZXcgQyhsZW5ndGgpO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICB2YWx1ZSA9IG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF07XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvcHVueWNvZGUuanMvYmxvYi9tYXN0ZXIvcHVueWNvZGUuanNcbnZhciBtYXhJbnQgPSAyMTQ3NDgzNjQ3OyAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG52YXIgYmFzZSA9IDM2O1xudmFyIHRNaW4gPSAxO1xudmFyIHRNYXggPSAyNjtcbnZhciBza2V3ID0gMzg7XG52YXIgZGFtcCA9IDcwMDtcbnZhciBpbml0aWFsQmlhcyA9IDcyO1xudmFyIGluaXRpYWxOID0gMTI4OyAvLyAweDgwXG52YXIgZGVsaW1pdGVyID0gJy0nOyAvLyAnXFx4MkQnXG52YXIgcmVnZXhOb25BU0NJSSA9IC9bXlxcMC1cXHUwMDdFXS87IC8vIG5vbi1BU0NJSSBjaGFyc1xudmFyIHJlZ2V4U2VwYXJhdG9ycyA9IC9bLlxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZzsgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xudmFyIE9WRVJGTE9XX0VSUk9SID0gJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJztcbnZhciBiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcbiAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuICogbWF0Y2hpbmcgVVRGLTE2LlxuICovXG52YXIgdWNzMmRlY29kZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgY291bnRlciA9IDA7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgaWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuICAgICAgLy8gSXQncyBhIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3Rlci5cbiAgICAgIHZhciBleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgICBpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gTG93IHN1cnJvZ2F0ZS5cbiAgICAgICAgb3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0J3MgYW4gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlXG4gICAgICAgIC8vIG5leHQgY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyLlxuICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKi9cbnZhciBkaWdpdFRvQmFzaWMgPSBmdW5jdGlvbiAoZGlnaXQpIHtcbiAgLy8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcbiAgLy8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG4gIHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNik7XG59O1xuXG4vKipcbiAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuICovXG52YXIgYWRhcHQgPSBmdW5jdGlvbiAoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG4gIHZhciBrID0gMDtcbiAgZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcbiAgZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuICBmb3IgKDsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcbiAgICBkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG4gIH1cbiAgcmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG4gKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgIG1heC1zdGF0ZW1lbnRzXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcblxuICAvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBhbiBhcnJheSBvZiBVbmljb2RlIGNvZGUgcG9pbnRzLlxuICBpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG4gIC8vIENhY2hlIHRoZSBsZW5ndGguXG4gIHZhciBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzdGF0ZS5cbiAgdmFyIG4gPSBpbml0aWFsTjtcbiAgdmFyIGRlbHRhID0gMDtcbiAgdmFyIGJpYXMgPSBpbml0aWFsQmlhcztcbiAgdmFyIGksIGN1cnJlbnRWYWx1ZTtcblxuICAvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzLlxuICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICBjdXJyZW50VmFsdWUgPSBpbnB1dFtpXTtcbiAgICBpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuICAgICAgb3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7IC8vIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cbiAgdmFyIGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGg7IC8vIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXG4gIC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIHdpdGggYSBkZWxpbWl0ZXIgdW5sZXNzIGl0J3MgZW1wdHkuXG4gIGlmIChiYXNpY0xlbmd0aCkge1xuICAgIG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG4gIH1cblxuICAvLyBNYWluIGVuY29kaW5nIGxvb3A6XG4gIHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG4gICAgLy8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dCBsYXJnZXIgb25lOlxuICAgIHZhciBtID0gbWF4SW50O1xuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuICAgICAgICBtID0gY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPiwgYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3cuXG4gICAgdmFyIGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcbiAgICBpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuICAgICAgdGhyb3cgUmFuZ2VFcnJvcihPVkVSRkxPV19FUlJPUik7XG4gICAgfVxuXG4gICAgZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcbiAgICBuID0gbTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG4gICAgICAgIHRocm93IFJhbmdlRXJyb3IoT1ZFUkZMT1dfRVJST1IpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG4gICAgICAgIC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxuICAgICAgICB2YXIgcSA9IGRlbHRhO1xuICAgICAgICBmb3IgKHZhciBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcbiAgICAgICAgICB2YXIgdCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG4gICAgICAgICAgaWYgKHEgPCB0KSBicmVhaztcbiAgICAgICAgICB2YXIgcU1pbnVzVCA9IHEgLSB0O1xuICAgICAgICAgIHZhciBiYXNlTWludXNUID0gYmFzZSAtIHQ7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QpKSk7XG4gICAgICAgICAgcSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSkpKTtcbiAgICAgICAgYmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICArK2hhbmRsZWRDUENvdW50O1xuICAgICAgfVxuICAgIH1cblxuICAgICsrZGVsdGE7XG4gICAgKytuO1xuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgZW5jb2RlZCA9IFtdO1xuICB2YXIgbGFiZWxzID0gaW5wdXQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xcdTAwMkUnKS5zcGxpdCgnLicpO1xuICB2YXIgaSwgbGFiZWw7XG4gIGZvciAoaSA9IDA7IGkgPCBsYWJlbHMubGVuZ3RoOyBpKyspIHtcbiAgICBsYWJlbCA9IGxhYmVsc1tpXTtcbiAgICBlbmNvZGVkLnB1c2gocmVnZXhOb25BU0NJSS50ZXN0KGxhYmVsKSA/ICd4bi0tJyArIGVuY29kZShsYWJlbCkgOiBsYWJlbCk7XG4gIH1cbiAgcmV0dXJuIGVuY29kZWQuam9pbignLicpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvck1ldGhvZCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBpdGVyYWJsZScpO1xuICB9IHJldHVybiBhbk9iamVjdChpdGVyYXRvck1ldGhvZC5jYWxsKGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogaW4gY29yZS1qc0A0LCBtb3ZlIC9tb2R1bGVzLyBkZXBlbmRlbmNpZXMgdG8gcHVibGljIGVudHJpZXMgZm9yIGJldHRlciBvcHRpbWl6YXRpb24gYnkgdG9vbHMgbGlrZSBgcHJlc2V0LWVudmBcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgVVNFX05BVElWRV9VUkwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXVybCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBnZXRJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3InKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkZmV0Y2ggPSBnZXRCdWlsdEluKCdmZXRjaCcpO1xudmFyIEhlYWRlcnMgPSBnZXRCdWlsdEluKCdIZWFkZXJzJyk7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVVJMX1NFQVJDSF9QQVJBTVMgPSAnVVJMU2VhcmNoUGFyYW1zJztcbnZhciBVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUiA9IFVSTF9TRUFSQ0hfUEFSQU1TICsgJ0l0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFVSTF9TRUFSQ0hfUEFSQU1TKTtcbnZhciBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUik7XG5cbnZhciBwbHVzID0gL1xcKy9nO1xudmFyIHNlcXVlbmNlcyA9IEFycmF5KDQpO1xuXG52YXIgcGVyY2VudFNlcXVlbmNlID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gIHJldHVybiBzZXF1ZW5jZXNbYnl0ZXMgLSAxXSB8fCAoc2VxdWVuY2VzW2J5dGVzIC0gMV0gPSBSZWdFeHAoJygoPzolW1xcXFxkYS1mXXsyfSl7JyArIGJ5dGVzICsgJ30pJywgJ2dpJykpO1xufTtcblxudmFyIHBlcmNlbnREZWNvZGUgPSBmdW5jdGlvbiAoc2VxdWVuY2UpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHNlcXVlbmNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gc2VxdWVuY2U7XG4gIH1cbn07XG5cbnZhciBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gaXQucmVwbGFjZShwbHVzLCAnICcpO1xuICB2YXIgYnl0ZXMgPSA0O1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB3aGlsZSAoYnl0ZXMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHBlcmNlbnRTZXF1ZW5jZShieXRlcy0tKSwgcGVyY2VudERlY29kZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbnZhciBmaW5kID0gL1shJygpfl18JTIwL2c7XG5cbnZhciByZXBsYWNlID0ge1xuICAnISc6ICclMjEnLFxuICBcIidcIjogJyUyNycsXG4gICcoJzogJyUyOCcsXG4gICcpJzogJyUyOScsXG4gICd+JzogJyU3RScsXG4gICclMjAnOiAnKydcbn07XG5cbnZhciByZXBsYWNlciA9IGZ1bmN0aW9uIChtYXRjaCkge1xuICByZXR1cm4gcmVwbGFjZVttYXRjaF07XG59O1xuXG52YXIgc2VyaWFsaXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaXQpLnJlcGxhY2UoZmluZCwgcmVwbGFjZXIpO1xufTtcblxudmFyIHBhcnNlU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gKHJlc3VsdCwgcXVlcnkpIHtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBxdWVyeS5zcGxpdCgnJicpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGF0dHJpYnV0ZSwgZW50cnk7XG4gICAgd2hpbGUgKGluZGV4IDwgYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaW5kZXgrK107XG4gICAgICBpZiAoYXR0cmlidXRlLmxlbmd0aCkge1xuICAgICAgICBlbnRyeSA9IGF0dHJpYnV0ZS5zcGxpdCgnPScpO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAga2V5OiBkZXNlcmlhbGl6ZShlbnRyeS5zaGlmdCgpKSxcbiAgICAgICAgICB2YWx1ZTogZGVzZXJpYWxpemUoZW50cnkuam9pbignPScpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciB1cGRhdGVTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgdGhpcy5lbnRyaWVzLmxlbmd0aCA9IDA7XG4gIHBhcnNlU2VhcmNoUGFyYW1zKHRoaXMuZW50cmllcywgcXVlcnkpO1xufTtcblxudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gZnVuY3Rpb24gKHBhc3NlZCwgcmVxdWlyZWQpIHtcbiAgaWYgKHBhc3NlZCA8IHJlcXVpcmVkKSB0aHJvdyBUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IgPSBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKGZ1bmN0aW9uIEl0ZXJhdG9yKHBhcmFtcywga2luZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUixcbiAgICBpdGVyYXRvcjogZ2V0SXRlcmF0b3IoZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZShwYXJhbXMpLmVudHJpZXMpLFxuICAgIGtpbmQ6IGtpbmRcbiAgfSk7XG59LCAnSXRlcmF0b3InLCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUodGhpcyk7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIHN0ZXAgPSBzdGF0ZS5pdGVyYXRvci5uZXh0KCk7XG4gIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gIGlmICghc3RlcC5kb25lKSB7XG4gICAgc3RlcC52YWx1ZSA9IGtpbmQgPT09ICdrZXlzJyA/IGVudHJ5LmtleSA6IGtpbmQgPT09ICd2YWx1ZXMnID8gZW50cnkudmFsdWUgOiBbZW50cnkua2V5LCBlbnRyeS52YWx1ZV07XG4gIH0gcmV0dXJuIHN0ZXA7XG59KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtc2AgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLXVybHNlYXJjaHBhcmFtc1xudmFyIFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yID0gZnVuY3Rpb24gVVJMU2VhcmNoUGFyYW1zKC8qIGluaXQgKi8pIHtcbiAgYW5JbnN0YW5jZSh0aGlzLCBVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3RvciwgVVJMX1NFQVJDSF9QQVJBTVMpO1xuICB2YXIgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBlbnRyaWVzID0gW107XG4gIHZhciBpdGVyYXRvck1ldGhvZCwgaXRlcmF0b3IsIG5leHQsIHN0ZXAsIGVudHJ5SXRlcmF0b3IsIGVudHJ5TmV4dCwgZmlyc3QsIHNlY29uZCwga2V5O1xuXG4gIHNldEludGVybmFsU3RhdGUodGhhdCwge1xuICAgIHR5cGU6IFVSTF9TRUFSQ0hfUEFSQU1TLFxuICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgdXBkYXRlVVJMOiBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sXG4gICAgdXBkYXRlU2VhcmNoUGFyYW1zOiB1cGRhdGVTZWFyY2hQYXJhbXNcbiAgfSk7XG5cbiAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChpc09iamVjdChpbml0KSkge1xuICAgICAgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChpbml0KTtcbiAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3JNZXRob2QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKGluaXQpO1xuICAgICAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICAgICAgICBlbnRyeUl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoYW5PYmplY3Qoc3RlcC52YWx1ZSkpO1xuICAgICAgICAgIGVudHJ5TmV4dCA9IGVudHJ5SXRlcmF0b3IubmV4dDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZmlyc3QgPSBlbnRyeU5leHQuY2FsbChlbnRyeUl0ZXJhdG9yKSkuZG9uZSB8fFxuICAgICAgICAgICAgKHNlY29uZCA9IGVudHJ5TmV4dC5jYWxsKGVudHJ5SXRlcmF0b3IpKS5kb25lIHx8XG4gICAgICAgICAgICAhZW50cnlOZXh0LmNhbGwoZW50cnlJdGVyYXRvcikuZG9uZVxuICAgICAgICAgICkgdGhyb3cgVHlwZUVycm9yKCdFeHBlY3RlZCBzZXF1ZW5jZSB3aXRoIGxlbmd0aCAyJyk7XG4gICAgICAgICAgZW50cmllcy5wdXNoKHsga2V5OiBmaXJzdC52YWx1ZSArICcnLCB2YWx1ZTogc2Vjb25kLnZhbHVlICsgJycgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBmb3IgKGtleSBpbiBpbml0KSBpZiAoaGFzT3duKGluaXQsIGtleSkpIGVudHJpZXMucHVzaCh7IGtleToga2V5LCB2YWx1ZTogaW5pdFtrZXldICsgJycgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlU2VhcmNoUGFyYW1zKGVudHJpZXMsIHR5cGVvZiBpbml0ID09PSAnc3RyaW5nJyA/IGluaXQuY2hhckF0KDApID09PSAnPycgPyBpbml0LnNsaWNlKDEpIDogaW5pdCA6IGluaXQgKyAnJyk7XG4gICAgfVxuICB9XG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlID0gVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IucHJvdG90eXBlO1xuXG5yZWRlZmluZUFsbChVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUsIHtcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuYXBwZW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWFwcGVuZFxuICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDIpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgc3RhdGUuZW50cmllcy5wdXNoKHsga2V5OiBuYW1lICsgJycsIHZhbHVlOiB2YWx1ZSArICcnIH0pO1xuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5kZWxldGVgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZGVsZXRlXG4gICdkZWxldGUnOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgdmFyIGVudHJpZXMgPSBzdGF0ZS5lbnRyaWVzO1xuICAgIHZhciBrZXkgPSBuYW1lICsgJyc7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXhdLmtleSA9PT0ga2V5KSBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBlbHNlIGluZGV4Kys7XG4gICAgfVxuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5nZXRgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZ2V0XG4gIGdldDogZnVuY3Rpb24gZ2V0KG5hbWUpIHtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgZW50cmllcyA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcztcbiAgICB2YXIga2V5ID0gbmFtZSArICcnO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICg7IGluZGV4IDwgZW50cmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChlbnRyaWVzW2luZGV4XS5rZXkgPT09IGtleSkgcmV0dXJuIGVudHJpZXNbaW5kZXhdLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZ2V0QWxsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWdldGFsbFxuICBnZXRBbGw6IGZ1bmN0aW9uIGdldEFsbChuYW1lKSB7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFyIGtleSA9IG5hbWUgKyAnJztcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKDsgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXhdLmtleSA9PT0ga2V5KSByZXN1bHQucHVzaChlbnRyaWVzW2luZGV4XS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmhhc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1oYXNcbiAgaGFzOiBmdW5jdGlvbiBoYXMobmFtZSkge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICAgIHZhciBrZXkgPSBuYW1lICsgJyc7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXgrK10ua2V5ID09PSBrZXkpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnNldGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1zZXRcbiAgc2V0OiBmdW5jdGlvbiBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpO1xuICAgIHZhciBlbnRyaWVzID0gc3RhdGUuZW50cmllcztcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICB2YXIga2V5ID0gbmFtZSArICcnO1xuICAgIHZhciB2YWwgPSB2YWx1ZSArICcnO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGVudHJ5O1xuICAgIGZvciAoOyBpbmRleCA8IGVudHJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgICAgaWYgKGVudHJ5LmtleSA9PT0ga2V5KSB7XG4gICAgICAgIGlmIChmb3VuZCkgZW50cmllcy5zcGxpY2UoaW5kZXgtLSwgMSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBlbnRyeS52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSBlbnRyaWVzLnB1c2goeyBrZXk6IGtleSwgdmFsdWU6IHZhbCB9KTtcbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuc29ydGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1zb3J0XG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoKSB7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKTtcbiAgICB2YXIgZW50cmllcyA9IHN0YXRlLmVudHJpZXM7XG4gICAgLy8gQXJyYXkjc29ydCBpcyBub3Qgc3RhYmxlIGluIHNvbWUgZW5naW5lc1xuICAgIHZhciBzbGljZSA9IGVudHJpZXMuc2xpY2UoKTtcbiAgICB2YXIgZW50cnksIGVudHJpZXNJbmRleCwgc2xpY2VJbmRleDtcbiAgICBlbnRyaWVzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChzbGljZUluZGV4ID0gMDsgc2xpY2VJbmRleCA8IHNsaWNlLmxlbmd0aDsgc2xpY2VJbmRleCsrKSB7XG4gICAgICBlbnRyeSA9IHNsaWNlW3NsaWNlSW5kZXhdO1xuICAgICAgZm9yIChlbnRyaWVzSW5kZXggPSAwOyBlbnRyaWVzSW5kZXggPCBzbGljZUluZGV4OyBlbnRyaWVzSW5kZXgrKykge1xuICAgICAgICBpZiAoZW50cmllc1tlbnRyaWVzSW5kZXhdLmtleSA+IGVudHJ5LmtleSkge1xuICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGVudHJpZXNJbmRleCwgMCwgZW50cnkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZW50cmllc0luZGV4ID09PSBzbGljZUluZGV4KSBlbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2sgLyogLCB0aGlzQXJnICovKSB7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMyk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZW50cnk7XG4gICAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIGVudHJ5ID0gZW50cmllc1tpbmRleCsrXTtcbiAgICAgIGJvdW5kRnVuY3Rpb24oZW50cnkudmFsdWUsIGVudHJ5LmtleSwgdGhpcyk7XG4gICAgfVxuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5rZXlzYCBtZXRob2RcbiAga2V5czogZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICdrZXlzJyk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IodGhpcywgJ3ZhbHVlcycpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2RcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICdlbnRyaWVzJyk7XG4gIH1cbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxucmVkZWZpbmUoVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLCBJVEVSQVRPUiwgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLmVudHJpZXMpO1xuXG4vLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHNlYXJjaHBhcmFtcy1zdHJpbmdpZmljYXRpb24tYmVoYXZpb3JcbnJlZGVmaW5lKFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBlbnRyeTtcbiAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXgrK107XG4gICAgcmVzdWx0LnB1c2goc2VyaWFsaXplKGVudHJ5LmtleSkgKyAnPScgKyBzZXJpYWxpemUoZW50cnkudmFsdWUpKTtcbiAgfSByZXR1cm4gcmVzdWx0LmpvaW4oJyYnKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuc2V0VG9TdHJpbmdUYWcoVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IsIFVSTF9TRUFSQ0hfUEFSQU1TKTtcblxuJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiAhVVNFX05BVElWRV9VUkwgfSwge1xuICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yXG59KTtcblxuLy8gV3JhcCBgZmV0Y2hgIGZvciBjb3JyZWN0IHdvcmsgd2l0aCBwb2x5ZmlsbGVkIGBVUkxTZWFyY2hQYXJhbXNgXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc0XG5pZiAoIVVTRV9OQVRJVkVfVVJMICYmIHR5cGVvZiAkZmV0Y2ggPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSGVhZGVycyA9PSAnZnVuY3Rpb24nKSB7XG4gICQoeyBnbG9iYWw6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogdHJ1ZSB9LCB7XG4gICAgZmV0Y2g6IGZ1bmN0aW9uIGZldGNoKGlucHV0IC8qICwgaW5pdCAqLykge1xuICAgICAgdmFyIGFyZ3MgPSBbaW5wdXRdO1xuICAgICAgdmFyIGluaXQsIGJvZHksIGhlYWRlcnM7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaW5pdCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KGluaXQpKSB7XG4gICAgICAgICAgYm9keSA9IGluaXQuYm9keTtcbiAgICAgICAgICBpZiAoY2xhc3NvZihib2R5KSA9PT0gVVJMX1NFQVJDSF9QQVJBTVMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBpbml0LmhlYWRlcnMgPyBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMpIDogbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgICAgIGlmICghaGVhZGVycy5oYXMoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgIGhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXQgPSBjcmVhdGUoaW5pdCwge1xuICAgICAgICAgICAgICBib2R5OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgU3RyaW5nKGJvZHkpKSxcbiAgICAgICAgICAgICAgaGVhZGVyczogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIGhlYWRlcnMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJncy5wdXNoKGluaXQpO1xuICAgICAgfSByZXR1cm4gJGZldGNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yLFxuICBnZXRTdGF0ZTogZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IGluIGNvcmUtanNANCwgbW92ZSAvbW9kdWxlcy8gZGVwZW5kZW5jaWVzIHRvIHB1YmxpYyBlbnRyaWVzIGZvciBiZXR0ZXIgb3B0aW1pemF0aW9uIGJ5IHRvb2xzIGxpa2UgYHByZXNldC1lbnZgXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBVU0VfTkFUSVZFX1VSTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtdXJsJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtYXNzaWduJyk7XG52YXIgYXJyYXlGcm9tID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZyb20nKTtcbnZhciBjb2RlQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNvZGVBdDtcbnZhciB0b0FTQ0lJID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1wdW55Y29kZS10by1hc2NpaScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgVVJMU2VhcmNoUGFyYW1zTW9kdWxlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIudXJsLXNlYXJjaC1wYXJhbXMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBOYXRpdmVVUkwgPSBnbG9iYWwuVVJMO1xudmFyIFVSTFNlYXJjaFBhcmFtcyA9IFVSTFNlYXJjaFBhcmFtc01vZHVsZS5VUkxTZWFyY2hQYXJhbXM7XG52YXIgZ2V0SW50ZXJuYWxTZWFyY2hQYXJhbXNTdGF0ZSA9IFVSTFNlYXJjaFBhcmFtc01vZHVsZS5nZXRTdGF0ZTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxVUkxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKCdVUkwnKTtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgcG93ID0gTWF0aC5wb3c7XG5cbnZhciBJTlZBTElEX0FVVEhPUklUWSA9ICdJbnZhbGlkIGF1dGhvcml0eSc7XG52YXIgSU5WQUxJRF9TQ0hFTUUgPSAnSW52YWxpZCBzY2hlbWUnO1xudmFyIElOVkFMSURfSE9TVCA9ICdJbnZhbGlkIGhvc3QnO1xudmFyIElOVkFMSURfUE9SVCA9ICdJbnZhbGlkIHBvcnQnO1xuXG52YXIgQUxQSEEgPSAvW0EtWmEtel0vO1xudmFyIEFMUEhBTlVNRVJJQyA9IC9bXFxkKy0uQS1aYS16XS87XG52YXIgRElHSVQgPSAvXFxkLztcbnZhciBIRVhfU1RBUlQgPSAvXigweHwwWCkvO1xudmFyIE9DVCA9IC9eWzAtN10rJC87XG52YXIgREVDID0gL15cXGQrJC87XG52YXIgSEVYID0gL15bXFxkQS1GYS1mXSskLztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVCA9IC9bXFx1MDAwMFxcdTAwMDlcXHUwMDBBXFx1MDAwRCAjJS86P0BbXFxcXF1dLztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVF9FWENMVURJTkdfUEVSQ0VOVCA9IC9bXFx1MDAwMFxcdTAwMDlcXHUwMDBBXFx1MDAwRCAjLzo/QFtcXFxcXV0vO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbnZhciBMRUFESU5HX0FORF9UUkFJTElOR19DMF9DT05UUk9MX09SX1NQQUNFID0gL15bXFx1MDAwMC1cXHUwMDFGIF0rfFtcXHUwMDAwLVxcdTAwMUYgXSskL2c7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxudmFyIFRBQl9BTkRfTkVXX0xJTkUgPSAvW1xcdTAwMDlcXHUwMDBBXFx1MDAwRF0vZztcbnZhciBFT0Y7XG5cbnZhciBwYXJzZUhvc3QgPSBmdW5jdGlvbiAodXJsLCBpbnB1dCkge1xuICB2YXIgcmVzdWx0LCBjb2RlUG9pbnRzLCBpbmRleDtcbiAgaWYgKGlucHV0LmNoYXJBdCgwKSA9PSAnWycpIHtcbiAgICBpZiAoaW5wdXQuY2hhckF0KGlucHV0Lmxlbmd0aCAtIDEpICE9ICddJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICByZXN1bHQgPSBwYXJzZUlQdjYoaW5wdXQuc2xpY2UoMSwgLTEpKTtcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICB1cmwuaG9zdCA9IHJlc3VsdDtcbiAgLy8gb3BhcXVlIGhvc3RcbiAgfSBlbHNlIGlmICghaXNTcGVjaWFsKHVybCkpIHtcbiAgICBpZiAoRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVF9FWENMVURJTkdfUEVSQ0VOVC50ZXN0KGlucHV0KSkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICByZXN1bHQgPSAnJztcbiAgICBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKGlucHV0KTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBjb2RlUG9pbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0ICs9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50c1tpbmRleF0sIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgIH1cbiAgICB1cmwuaG9zdCA9IHJlc3VsdDtcbiAgfSBlbHNlIHtcbiAgICBpbnB1dCA9IHRvQVNDSUkoaW5wdXQpO1xuICAgIGlmIChGT1JCSURERU5fSE9TVF9DT0RFX1BPSU5ULnRlc3QoaW5wdXQpKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgIHJlc3VsdCA9IHBhcnNlSVB2NChpbnB1dCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICB1cmwuaG9zdCA9IHJlc3VsdDtcbiAgfVxufTtcblxudmFyIHBhcnNlSVB2NCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgcGFydHMgPSBpbnB1dC5zcGxpdCgnLicpO1xuICB2YXIgcGFydHNMZW5ndGgsIG51bWJlcnMsIGluZGV4LCBwYXJ0LCByYWRpeCwgbnVtYmVyLCBpcHY0O1xuICBpZiAocGFydHMubGVuZ3RoICYmIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdID09ICcnKSB7XG4gICAgcGFydHMucG9wKCk7XG4gIH1cbiAgcGFydHNMZW5ndGggPSBwYXJ0cy5sZW5ndGg7XG4gIGlmIChwYXJ0c0xlbmd0aCA+IDQpIHJldHVybiBpbnB1dDtcbiAgbnVtYmVycyA9IFtdO1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBwYXJ0c0xlbmd0aDsgaW5kZXgrKykge1xuICAgIHBhcnQgPSBwYXJ0c1tpbmRleF07XG4gICAgaWYgKHBhcnQgPT0gJycpIHJldHVybiBpbnB1dDtcbiAgICByYWRpeCA9IDEwO1xuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDEgJiYgcGFydC5jaGFyQXQoMCkgPT0gJzAnKSB7XG4gICAgICByYWRpeCA9IEhFWF9TVEFSVC50ZXN0KHBhcnQpID8gMTYgOiA4O1xuICAgICAgcGFydCA9IHBhcnQuc2xpY2UocmFkaXggPT0gOCA/IDEgOiAyKTtcbiAgICB9XG4gICAgaWYgKHBhcnQgPT09ICcnKSB7XG4gICAgICBudW1iZXIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIShyYWRpeCA9PSAxMCA/IERFQyA6IHJhZGl4ID09IDggPyBPQ1QgOiBIRVgpLnRlc3QocGFydCkpIHJldHVybiBpbnB1dDtcbiAgICAgIG51bWJlciA9IHBhcnNlSW50KHBhcnQsIHJhZGl4KTtcbiAgICB9XG4gICAgbnVtYmVycy5wdXNoKG51bWJlcik7XG4gIH1cbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcGFydHNMZW5ndGg7IGluZGV4KyspIHtcbiAgICBudW1iZXIgPSBudW1iZXJzW2luZGV4XTtcbiAgICBpZiAoaW5kZXggPT0gcGFydHNMZW5ndGggLSAxKSB7XG4gICAgICBpZiAobnVtYmVyID49IHBvdygyNTYsIDUgLSBwYXJ0c0xlbmd0aCkpIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAobnVtYmVyID4gMjU1KSByZXR1cm4gbnVsbDtcbiAgfVxuICBpcHY0ID0gbnVtYmVycy5wb3AoKTtcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbnVtYmVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBpcHY0ICs9IG51bWJlcnNbaW5kZXhdICogcG93KDI1NiwgMyAtIGluZGV4KTtcbiAgfVxuICByZXR1cm4gaXB2NDtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50c1xudmFyIHBhcnNlSVB2NiA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgYWRkcmVzcyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgdmFyIHBpZWNlSW5kZXggPSAwO1xuICB2YXIgY29tcHJlc3MgPSBudWxsO1xuICB2YXIgcG9pbnRlciA9IDA7XG4gIHZhciB2YWx1ZSwgbGVuZ3RoLCBudW1iZXJzU2VlbiwgaXB2NFBpZWNlLCBudW1iZXIsIHN3YXBzLCBzd2FwO1xuXG4gIHZhciBjaGFyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpbnB1dC5jaGFyQXQocG9pbnRlcik7XG4gIH07XG5cbiAgaWYgKGNoYXIoKSA9PSAnOicpIHtcbiAgICBpZiAoaW5wdXQuY2hhckF0KDEpICE9ICc6JykgcmV0dXJuO1xuICAgIHBvaW50ZXIgKz0gMjtcbiAgICBwaWVjZUluZGV4Kys7XG4gICAgY29tcHJlc3MgPSBwaWVjZUluZGV4O1xuICB9XG4gIHdoaWxlIChjaGFyKCkpIHtcbiAgICBpZiAocGllY2VJbmRleCA9PSA4KSByZXR1cm47XG4gICAgaWYgKGNoYXIoKSA9PSAnOicpIHtcbiAgICAgIGlmIChjb21wcmVzcyAhPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgcGllY2VJbmRleCsrO1xuICAgICAgY29tcHJlc3MgPSBwaWVjZUluZGV4O1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhbHVlID0gbGVuZ3RoID0gMDtcbiAgICB3aGlsZSAobGVuZ3RoIDwgNCAmJiBIRVgudGVzdChjaGFyKCkpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlICogMTYgKyBwYXJzZUludChjaGFyKCksIDE2KTtcbiAgICAgIHBvaW50ZXIrKztcbiAgICAgIGxlbmd0aCsrO1xuICAgIH1cbiAgICBpZiAoY2hhcigpID09ICcuJykge1xuICAgICAgaWYgKGxlbmd0aCA9PSAwKSByZXR1cm47XG4gICAgICBwb2ludGVyIC09IGxlbmd0aDtcbiAgICAgIGlmIChwaWVjZUluZGV4ID4gNikgcmV0dXJuO1xuICAgICAgbnVtYmVyc1NlZW4gPSAwO1xuICAgICAgd2hpbGUgKGNoYXIoKSkge1xuICAgICAgICBpcHY0UGllY2UgPSBudWxsO1xuICAgICAgICBpZiAobnVtYmVyc1NlZW4gPiAwKSB7XG4gICAgICAgICAgaWYgKGNoYXIoKSA9PSAnLicgJiYgbnVtYmVyc1NlZW4gPCA0KSBwb2ludGVyKys7XG4gICAgICAgICAgZWxzZSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFESUdJVC50ZXN0KGNoYXIoKSkpIHJldHVybjtcbiAgICAgICAgd2hpbGUgKERJR0lULnRlc3QoY2hhcigpKSkge1xuICAgICAgICAgIG51bWJlciA9IHBhcnNlSW50KGNoYXIoKSwgMTApO1xuICAgICAgICAgIGlmIChpcHY0UGllY2UgPT09IG51bGwpIGlwdjRQaWVjZSA9IG51bWJlcjtcbiAgICAgICAgICBlbHNlIGlmIChpcHY0UGllY2UgPT0gMCkgcmV0dXJuO1xuICAgICAgICAgIGVsc2UgaXB2NFBpZWNlID0gaXB2NFBpZWNlICogMTAgKyBudW1iZXI7XG4gICAgICAgICAgaWYgKGlwdjRQaWVjZSA+IDI1NSkgcmV0dXJuO1xuICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzW3BpZWNlSW5kZXhdID0gYWRkcmVzc1twaWVjZUluZGV4XSAqIDI1NiArIGlwdjRQaWVjZTtcbiAgICAgICAgbnVtYmVyc1NlZW4rKztcbiAgICAgICAgaWYgKG51bWJlcnNTZWVuID09IDIgfHwgbnVtYmVyc1NlZW4gPT0gNCkgcGllY2VJbmRleCsrO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlcnNTZWVuICE9IDQpIHJldHVybjtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoY2hhcigpID09ICc6Jykge1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgaWYgKCFjaGFyKCkpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoYXIoKSkgcmV0dXJuO1xuICAgIGFkZHJlc3NbcGllY2VJbmRleCsrXSA9IHZhbHVlO1xuICB9XG4gIGlmIChjb21wcmVzcyAhPT0gbnVsbCkge1xuICAgIHN3YXBzID0gcGllY2VJbmRleCAtIGNvbXByZXNzO1xuICAgIHBpZWNlSW5kZXggPSA3O1xuICAgIHdoaWxlIChwaWVjZUluZGV4ICE9IDAgJiYgc3dhcHMgPiAwKSB7XG4gICAgICBzd2FwID0gYWRkcmVzc1twaWVjZUluZGV4XTtcbiAgICAgIGFkZHJlc3NbcGllY2VJbmRleC0tXSA9IGFkZHJlc3NbY29tcHJlc3MgKyBzd2FwcyAtIDFdO1xuICAgICAgYWRkcmVzc1tjb21wcmVzcyArIC0tc3dhcHNdID0gc3dhcDtcbiAgICB9XG4gIH0gZWxzZSBpZiAocGllY2VJbmRleCAhPSA4KSByZXR1cm47XG4gIHJldHVybiBhZGRyZXNzO1xufTtcblxudmFyIGZpbmRMb25nZXN0WmVyb1NlcXVlbmNlID0gZnVuY3Rpb24gKGlwdjYpIHtcbiAgdmFyIG1heEluZGV4ID0gbnVsbDtcbiAgdmFyIG1heExlbmd0aCA9IDE7XG4gIHZhciBjdXJyU3RhcnQgPSBudWxsO1xuICB2YXIgY3Vyckxlbmd0aCA9IDA7XG4gIHZhciBpbmRleCA9IDA7XG4gIGZvciAoOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICBpZiAoaXB2NltpbmRleF0gIT09IDApIHtcbiAgICAgIGlmIChjdXJyTGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICAgIG1heEluZGV4ID0gY3VyclN0YXJ0O1xuICAgICAgICBtYXhMZW5ndGggPSBjdXJyTGVuZ3RoO1xuICAgICAgfVxuICAgICAgY3VyclN0YXJ0ID0gbnVsbDtcbiAgICAgIGN1cnJMZW5ndGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VyclN0YXJ0ID09PSBudWxsKSBjdXJyU3RhcnQgPSBpbmRleDtcbiAgICAgICsrY3Vyckxlbmd0aDtcbiAgICB9XG4gIH1cbiAgaWYgKGN1cnJMZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICBtYXhJbmRleCA9IGN1cnJTdGFydDtcbiAgICBtYXhMZW5ndGggPSBjdXJyTGVuZ3RoO1xuICB9XG4gIHJldHVybiBtYXhJbmRleDtcbn07XG5cbnZhciBzZXJpYWxpemVIb3N0ID0gZnVuY3Rpb24gKGhvc3QpIHtcbiAgdmFyIHJlc3VsdCwgaW5kZXgsIGNvbXByZXNzLCBpZ25vcmUwO1xuICAvLyBpcHY0XG4gIGlmICh0eXBlb2YgaG9zdCA9PSAnbnVtYmVyJykge1xuICAgIHJlc3VsdCA9IFtdO1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IDQ7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KGhvc3QgJSAyNTYpO1xuICAgICAgaG9zdCA9IGZsb29yKGhvc3QgLyAyNTYpO1xuICAgIH0gcmV0dXJuIHJlc3VsdC5qb2luKCcuJyk7XG4gIC8vIGlwdjZcbiAgfSBlbHNlIGlmICh0eXBlb2YgaG9zdCA9PSAnb2JqZWN0Jykge1xuICAgIHJlc3VsdCA9ICcnO1xuICAgIGNvbXByZXNzID0gZmluZExvbmdlc3RaZXJvU2VxdWVuY2UoaG9zdCk7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgODsgaW5kZXgrKykge1xuICAgICAgaWYgKGlnbm9yZTAgJiYgaG9zdFtpbmRleF0gPT09IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKGlnbm9yZTApIGlnbm9yZTAgPSBmYWxzZTtcbiAgICAgIGlmIChjb21wcmVzcyA9PT0gaW5kZXgpIHtcbiAgICAgICAgcmVzdWx0ICs9IGluZGV4ID8gJzonIDogJzo6JztcbiAgICAgICAgaWdub3JlMCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gaG9zdFtpbmRleF0udG9TdHJpbmcoMTYpO1xuICAgICAgICBpZiAoaW5kZXggPCA3KSByZXN1bHQgKz0gJzonO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJ1snICsgcmVzdWx0ICsgJ10nO1xuICB9IHJldHVybiBob3N0O1xufTtcblxudmFyIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQgPSB7fTtcbnZhciBmcmFnbWVudFBlcmNlbnRFbmNvZGVTZXQgPSBhc3NpZ24oe30sIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQsIHtcbiAgJyAnOiAxLCAnXCInOiAxLCAnPCc6IDEsICc+JzogMSwgJ2AnOiAxXG59KTtcbnZhciBwYXRoUGVyY2VudEVuY29kZVNldCA9IGFzc2lnbih7fSwgZnJhZ21lbnRQZXJjZW50RW5jb2RlU2V0LCB7XG4gICcjJzogMSwgJz8nOiAxLCAneyc6IDEsICd9JzogMVxufSk7XG52YXIgdXNlcmluZm9QZXJjZW50RW5jb2RlU2V0ID0gYXNzaWduKHt9LCBwYXRoUGVyY2VudEVuY29kZVNldCwge1xuICAnLyc6IDEsICc6JzogMSwgJzsnOiAxLCAnPSc6IDEsICdAJzogMSwgJ1snOiAxLCAnXFxcXCc6IDEsICddJzogMSwgJ14nOiAxLCAnfCc6IDFcbn0pO1xuXG52YXIgcGVyY2VudEVuY29kZSA9IGZ1bmN0aW9uIChjaGFyLCBzZXQpIHtcbiAgdmFyIGNvZGUgPSBjb2RlQXQoY2hhciwgMCk7XG4gIHJldHVybiBjb2RlID4gMHgyMCAmJiBjb2RlIDwgMHg3RiAmJiAhaGFzKHNldCwgY2hhcikgPyBjaGFyIDogZW5jb2RlVVJJQ29tcG9uZW50KGNoYXIpO1xufTtcblxudmFyIHNwZWNpYWxTY2hlbWVzID0ge1xuICBmdHA6IDIxLFxuICBmaWxlOiBudWxsLFxuICBodHRwOiA4MCxcbiAgaHR0cHM6IDQ0MyxcbiAgd3M6IDgwLFxuICB3c3M6IDQ0M1xufTtcblxudmFyIGlzU3BlY2lhbCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgcmV0dXJuIGhhcyhzcGVjaWFsU2NoZW1lcywgdXJsLnNjaGVtZSk7XG59O1xuXG52YXIgaW5jbHVkZXNDcmVkZW50aWFscyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgcmV0dXJuIHVybC51c2VybmFtZSAhPSAnJyB8fCB1cmwucGFzc3dvcmQgIT0gJyc7XG59O1xuXG52YXIgY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0ID0gZnVuY3Rpb24gKHVybCkge1xuICByZXR1cm4gIXVybC5ob3N0IHx8IHVybC5jYW5ub3RCZUFCYXNlVVJMIHx8IHVybC5zY2hlbWUgPT0gJ2ZpbGUnO1xufTtcblxudmFyIGlzV2luZG93c0RyaXZlTGV0dGVyID0gZnVuY3Rpb24gKHN0cmluZywgbm9ybWFsaXplZCkge1xuICB2YXIgc2Vjb25kO1xuICByZXR1cm4gc3RyaW5nLmxlbmd0aCA9PSAyICYmIEFMUEhBLnRlc3Qoc3RyaW5nLmNoYXJBdCgwKSlcbiAgICAmJiAoKHNlY29uZCA9IHN0cmluZy5jaGFyQXQoMSkpID09ICc6JyB8fCAoIW5vcm1hbGl6ZWQgJiYgc2Vjb25kID09ICd8JykpO1xufTtcblxudmFyIHN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciB0aGlyZDtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPiAxICYmIGlzV2luZG93c0RyaXZlTGV0dGVyKHN0cmluZy5zbGljZSgwLCAyKSkgJiYgKFxuICAgIHN0cmluZy5sZW5ndGggPT0gMiB8fFxuICAgICgodGhpcmQgPSBzdHJpbmcuY2hhckF0KDIpKSA9PT0gJy8nIHx8IHRoaXJkID09PSAnXFxcXCcgfHwgdGhpcmQgPT09ICc/JyB8fCB0aGlyZCA9PT0gJyMnKVxuICApO1xufTtcblxudmFyIHNob3J0ZW5VUkxzUGF0aCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgdmFyIHBhdGggPSB1cmwucGF0aDtcbiAgdmFyIHBhdGhTaXplID0gcGF0aC5sZW5ndGg7XG4gIGlmIChwYXRoU2l6ZSAmJiAodXJsLnNjaGVtZSAhPSAnZmlsZScgfHwgcGF0aFNpemUgIT0gMSB8fCAhaXNXaW5kb3dzRHJpdmVMZXR0ZXIocGF0aFswXSwgdHJ1ZSkpKSB7XG4gICAgcGF0aC5wb3AoKTtcbiAgfVxufTtcblxudmFyIGlzU2luZ2xlRG90ID0gZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgcmV0dXJuIHNlZ21lbnQgPT09ICcuJyB8fCBzZWdtZW50LnRvTG93ZXJDYXNlKCkgPT09ICclMmUnO1xufTtcblxudmFyIGlzRG91YmxlRG90ID0gZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgc2VnbWVudCA9IHNlZ21lbnQudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHNlZ21lbnQgPT09ICcuLicgfHwgc2VnbWVudCA9PT0gJyUyZS4nIHx8IHNlZ21lbnQgPT09ICcuJTJlJyB8fCBzZWdtZW50ID09PSAnJTJlJTJlJztcbn07XG5cbi8vIFN0YXRlczpcbnZhciBTQ0hFTUVfU1RBUlQgPSB7fTtcbnZhciBTQ0hFTUUgPSB7fTtcbnZhciBOT19TQ0hFTUUgPSB7fTtcbnZhciBTUEVDSUFMX1JFTEFUSVZFX09SX0FVVEhPUklUWSA9IHt9O1xudmFyIFBBVEhfT1JfQVVUSE9SSVRZID0ge307XG52YXIgUkVMQVRJVkUgPSB7fTtcbnZhciBSRUxBVElWRV9TTEFTSCA9IHt9O1xudmFyIFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVMgPSB7fTtcbnZhciBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUyA9IHt9O1xudmFyIEFVVEhPUklUWSA9IHt9O1xudmFyIEhPU1QgPSB7fTtcbnZhciBIT1NUTkFNRSA9IHt9O1xudmFyIFBPUlQgPSB7fTtcbnZhciBGSUxFID0ge307XG52YXIgRklMRV9TTEFTSCA9IHt9O1xudmFyIEZJTEVfSE9TVCA9IHt9O1xudmFyIFBBVEhfU1RBUlQgPSB7fTtcbnZhciBQQVRIID0ge307XG52YXIgQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSCA9IHt9O1xudmFyIFFVRVJZID0ge307XG52YXIgRlJBR01FTlQgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1zdGF0ZW1lbnRzXG52YXIgcGFyc2VVUkwgPSBmdW5jdGlvbiAodXJsLCBpbnB1dCwgc3RhdGVPdmVycmlkZSwgYmFzZSkge1xuICB2YXIgc3RhdGUgPSBzdGF0ZU92ZXJyaWRlIHx8IFNDSEVNRV9TVEFSVDtcbiAgdmFyIHBvaW50ZXIgPSAwO1xuICB2YXIgYnVmZmVyID0gJyc7XG4gIHZhciBzZWVuQXQgPSBmYWxzZTtcbiAgdmFyIHNlZW5CcmFja2V0ID0gZmFsc2U7XG4gIHZhciBzZWVuUGFzc3dvcmRUb2tlbiA9IGZhbHNlO1xuICB2YXIgY29kZVBvaW50cywgY2hhciwgYnVmZmVyQ29kZVBvaW50cywgZmFpbHVyZTtcblxuICBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICB1cmwuc2NoZW1lID0gJyc7XG4gICAgdXJsLnVzZXJuYW1lID0gJyc7XG4gICAgdXJsLnBhc3N3b3JkID0gJyc7XG4gICAgdXJsLmhvc3QgPSBudWxsO1xuICAgIHVybC5wb3J0ID0gbnVsbDtcbiAgICB1cmwucGF0aCA9IFtdO1xuICAgIHVybC5xdWVyeSA9IG51bGw7XG4gICAgdXJsLmZyYWdtZW50ID0gbnVsbDtcbiAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IGZhbHNlO1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShMRUFESU5HX0FORF9UUkFJTElOR19DMF9DT05UUk9MX09SX1NQQUNFLCAnJyk7XG4gIH1cblxuICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoVEFCX0FORF9ORVdfTElORSwgJycpO1xuXG4gIGNvZGVQb2ludHMgPSBhcnJheUZyb20oaW5wdXQpO1xuXG4gIHdoaWxlIChwb2ludGVyIDw9IGNvZGVQb2ludHMubGVuZ3RoKSB7XG4gICAgY2hhciA9IGNvZGVQb2ludHNbcG9pbnRlcl07XG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBTQ0hFTUVfU1RBUlQ6XG4gICAgICAgIGlmIChjaGFyICYmIEFMUEhBLnRlc3QoY2hhcikpIHtcbiAgICAgICAgICBidWZmZXIgKz0gY2hhci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHN0YXRlID0gU0NIRU1FO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgc3RhdGUgPSBOT19TQ0hFTUU7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gSU5WQUxJRF9TQ0hFTUU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNDSEVNRTpcbiAgICAgICAgaWYgKGNoYXIgJiYgKEFMUEhBTlVNRVJJQy50ZXN0KGNoYXIpIHx8IGNoYXIgPT0gJysnIHx8IGNoYXIgPT0gJy0nIHx8IGNoYXIgPT0gJy4nKSkge1xuICAgICAgICAgIGJ1ZmZlciArPSBjaGFyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnOicpIHtcbiAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiAoXG4gICAgICAgICAgICAoaXNTcGVjaWFsKHVybCkgIT0gaGFzKHNwZWNpYWxTY2hlbWVzLCBidWZmZXIpKSB8fFxuICAgICAgICAgICAgKGJ1ZmZlciA9PSAnZmlsZScgJiYgKGluY2x1ZGVzQ3JlZGVudGlhbHModXJsKSB8fCB1cmwucG9ydCAhPT0gbnVsbCkpIHx8XG4gICAgICAgICAgICAodXJsLnNjaGVtZSA9PSAnZmlsZScgJiYgIXVybC5ob3N0KVxuICAgICAgICAgICkpIHJldHVybjtcbiAgICAgICAgICB1cmwuc2NoZW1lID0gYnVmZmVyO1xuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgICBpZiAoaXNTcGVjaWFsKHVybCkgJiYgc3BlY2lhbFNjaGVtZXNbdXJsLnNjaGVtZV0gPT0gdXJsLnBvcnQpIHVybC5wb3J0ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEZJTEU7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1NwZWNpYWwodXJsKSAmJiBiYXNlICYmIGJhc2Uuc2NoZW1lID09IHVybC5zY2hlbWUpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9SRUxBVElWRV9PUl9BVVRIT1JJVFk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1NwZWNpYWwodXJsKSkge1xuICAgICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9TTEFTSEVTO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29kZVBvaW50c1twb2ludGVyICsgMV0gPT0gJy8nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEhfT1JfQVVUSE9SSVRZO1xuICAgICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IHRydWU7XG4gICAgICAgICAgICB1cmwucGF0aC5wdXNoKCcnKTtcbiAgICAgICAgICAgIHN0YXRlID0gQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICBzdGF0ZSA9IE5PX1NDSEVNRTtcbiAgICAgICAgICBwb2ludGVyID0gMDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTk9fU0NIRU1FOlxuICAgICAgICBpZiAoIWJhc2UgfHwgKGJhc2UuY2Fubm90QmVBQmFzZVVSTCAmJiBjaGFyICE9ICcjJykpIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgaWYgKGJhc2UuY2Fubm90QmVBQmFzZVVSTCAmJiBjaGFyID09ICcjJykge1xuICAgICAgICAgIHVybC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICAgICAgICB1cmwucGF0aCA9IGJhc2UucGF0aC5zbGljZSgpO1xuICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgdXJsLmNhbm5vdEJlQUJhc2VVUkwgPSB0cnVlO1xuICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBiYXNlLnNjaGVtZSA9PSAnZmlsZScgPyBGSUxFIDogUkVMQVRJVkU7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBjYXNlIFNQRUNJQUxfUkVMQVRJVkVfT1JfQVVUSE9SSVRZOlxuICAgICAgICBpZiAoY2hhciA9PSAnLycgJiYgY29kZVBvaW50c1twb2ludGVyICsgMV0gPT0gJy8nKSB7XG4gICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUztcbiAgICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUgPSBSRUxBVElWRTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBQQVRIX09SX0FVVEhPUklUWTpcbiAgICAgICAgaWYgKGNoYXIgPT0gJy8nKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVVRIT1JJVFk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVMQVRJVkU6XG4gICAgICAgIHVybC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICAgICAgaWYgKGNoYXIgPT0gRU9GKSB7XG4gICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09ICcvJyB8fCAoY2hhciA9PSAnXFxcXCcgJiYgaXNTcGVjaWFsKHVybCkpKSB7XG4gICAgICAgICAgc3RhdGUgPSBSRUxBVElWRV9TTEFTSDtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09ICc/Jykge1xuICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICB1cmwucGF0aCA9IGJhc2UucGF0aC5zbGljZSgpO1xuICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnIycpIHtcbiAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgdXJsLnBhdGggPSBiYXNlLnBhdGguc2xpY2UoKTtcbiAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgdXJsLnBhdGgucG9wKCk7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIFJFTEFUSVZFX1NMQVNIOlxuICAgICAgICBpZiAoaXNTcGVjaWFsKHVybCkgJiYgKGNoYXIgPT0gJy8nIHx8IGNoYXIgPT0gJ1xcXFwnKSkge1xuICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnLycpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVM6XG4gICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgIGlmIChjaGFyICE9ICcvJyB8fCBidWZmZXIuY2hhckF0KHBvaW50ZXIgKyAxKSAhPSAnLycpIGNvbnRpbnVlO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTOlxuICAgICAgICBpZiAoY2hhciAhPSAnLycgJiYgY2hhciAhPSAnXFxcXCcpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBBVVRIT1JJVFk6XG4gICAgICAgIGlmIChjaGFyID09ICdAJykge1xuICAgICAgICAgIGlmIChzZWVuQXQpIGJ1ZmZlciA9ICclNDAnICsgYnVmZmVyO1xuICAgICAgICAgIHNlZW5BdCA9IHRydWU7XG4gICAgICAgICAgYnVmZmVyQ29kZVBvaW50cyA9IGFycmF5RnJvbShidWZmZXIpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyQ29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9IGJ1ZmZlckNvZGVQb2ludHNbaV07XG4gICAgICAgICAgICBpZiAoY29kZVBvaW50ID09ICc6JyAmJiAhc2VlblBhc3N3b3JkVG9rZW4pIHtcbiAgICAgICAgICAgICAgc2VlblBhc3N3b3JkVG9rZW4gPSB0cnVlO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlbmNvZGVkQ29kZVBvaW50cyA9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50LCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgICAgaWYgKHNlZW5QYXNzd29yZFRva2VuKSB1cmwucGFzc3dvcmQgKz0gZW5jb2RlZENvZGVQb2ludHM7XG4gICAgICAgICAgICBlbHNlIHVybC51c2VybmFtZSArPSBlbmNvZGVkQ29kZVBvaW50cztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgY2hhciA9PSBFT0YgfHwgY2hhciA9PSAnLycgfHwgY2hhciA9PSAnPycgfHwgY2hhciA9PSAnIycgfHxcbiAgICAgICAgICAoY2hhciA9PSAnXFxcXCcgJiYgaXNTcGVjaWFsKHVybCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChzZWVuQXQgJiYgYnVmZmVyID09ICcnKSByZXR1cm4gSU5WQUxJRF9BVVRIT1JJVFk7XG4gICAgICAgICAgcG9pbnRlciAtPSBhcnJheUZyb20oYnVmZmVyKS5sZW5ndGggKyAxO1xuICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gSE9TVDtcbiAgICAgICAgfSBlbHNlIGJ1ZmZlciArPSBjaGFyO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBIT1NUOlxuICAgICAgY2FzZSBIT1NUTkFNRTpcbiAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgJiYgdXJsLnNjaGVtZSA9PSAnZmlsZScpIHtcbiAgICAgICAgICBzdGF0ZSA9IEZJTEVfSE9TVDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09ICc6JyAmJiAhc2VlbkJyYWNrZXQpIHtcbiAgICAgICAgICBpZiAoYnVmZmVyID09ICcnKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgICAgIGZhaWx1cmUgPSBwYXJzZUhvc3QodXJsLCBidWZmZXIpO1xuICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICBzdGF0ZSA9IFBPUlQ7XG4gICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgPT0gSE9TVE5BTUUpIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBjaGFyID09IEVPRiB8fCBjaGFyID09ICcvJyB8fCBjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJyB8fFxuICAgICAgICAgIChjaGFyID09ICdcXFxcJyAmJiBpc1NwZWNpYWwodXJsKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKGlzU3BlY2lhbCh1cmwpICYmIGJ1ZmZlciA9PSAnJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiBidWZmZXIgPT0gJycgJiYgKGluY2x1ZGVzQ3JlZGVudGlhbHModXJsKSB8fCB1cmwucG9ydCAhPT0gbnVsbCkpIHJldHVybjtcbiAgICAgICAgICBmYWlsdXJlID0gcGFyc2VIb3N0KHVybCwgYnVmZmVyKTtcbiAgICAgICAgICBpZiAoZmFpbHVyZSkgcmV0dXJuIGZhaWx1cmU7XG4gICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNoYXIgPT0gJ1snKSBzZWVuQnJhY2tldCA9IHRydWU7XG4gICAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAnXScpIHNlZW5CcmFja2V0ID0gZmFsc2U7XG4gICAgICAgICAgYnVmZmVyICs9IGNoYXI7XG4gICAgICAgIH0gYnJlYWs7XG5cbiAgICAgIGNhc2UgUE9SVDpcbiAgICAgICAgaWYgKERJR0lULnRlc3QoY2hhcikpIHtcbiAgICAgICAgICBidWZmZXIgKz0gY2hhcjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBjaGFyID09IEVPRiB8fCBjaGFyID09ICcvJyB8fCBjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJyB8fFxuICAgICAgICAgIChjaGFyID09ICdcXFxcJyAmJiBpc1NwZWNpYWwodXJsKSkgfHxcbiAgICAgICAgICBzdGF0ZU92ZXJyaWRlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChidWZmZXIgIT0gJycpIHtcbiAgICAgICAgICAgIHZhciBwb3J0ID0gcGFyc2VJbnQoYnVmZmVyLCAxMCk7XG4gICAgICAgICAgICBpZiAocG9ydCA+IDB4RkZGRikgcmV0dXJuIElOVkFMSURfUE9SVDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gKGlzU3BlY2lhbCh1cmwpICYmIHBvcnQgPT09IHNwZWNpYWxTY2hlbWVzW3VybC5zY2hlbWVdKSA/IG51bGwgOiBwb3J0O1xuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIElOVkFMSURfUE9SVDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRklMRTpcbiAgICAgICAgdXJsLnNjaGVtZSA9ICdmaWxlJztcbiAgICAgICAgaWYgKGNoYXIgPT0gJy8nIHx8IGNoYXIgPT0gJ1xcXFwnKSBzdGF0ZSA9IEZJTEVfU0xBU0g7XG4gICAgICAgIGVsc2UgaWYgKGJhc2UgJiYgYmFzZS5zY2hlbWUgPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgaWYgKGNoYXIgPT0gRU9GKSB7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnPycpIHtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBhdGggPSBiYXNlLnBhdGguc2xpY2UoKTtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYXIgPT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIoY29kZVBvaW50cy5zbGljZShwb2ludGVyKS5qb2luKCcnKSkpIHtcbiAgICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICAgIHVybC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICAgIHNob3J0ZW5VUkxzUGF0aCh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBGSUxFX1NMQVNIOlxuICAgICAgICBpZiAoY2hhciA9PSAnLycgfHwgY2hhciA9PSAnXFxcXCcpIHtcbiAgICAgICAgICBzdGF0ZSA9IEZJTEVfSE9TVDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmFzZSAmJiBiYXNlLnNjaGVtZSA9PSAnZmlsZScgJiYgIXN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIoY29kZVBvaW50cy5zbGljZShwb2ludGVyKS5qb2luKCcnKSkpIHtcbiAgICAgICAgICBpZiAoaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYmFzZS5wYXRoWzBdLCB0cnVlKSkgdXJsLnBhdGgucHVzaChiYXNlLnBhdGhbMF0pO1xuICAgICAgICAgIGVsc2UgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgY2FzZSBGSUxFX0hPU1Q6XG4gICAgICAgIGlmIChjaGFyID09IEVPRiB8fCBjaGFyID09ICcvJyB8fCBjaGFyID09ICdcXFxcJyB8fCBjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJykge1xuICAgICAgICAgIGlmICghc3RhdGVPdmVycmlkZSAmJiBpc1dpbmRvd3NEcml2ZUxldHRlcihidWZmZXIpKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgfSBlbHNlIGlmIChidWZmZXIgPT0gJycpIHtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmYWlsdXJlID0gcGFyc2VIb3N0KHVybCwgYnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICAgIGlmICh1cmwuaG9zdCA9PSAnbG9jYWxob3N0JykgdXJsLmhvc3QgPSAnJztcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSF9TVEFSVDtcbiAgICAgICAgICB9IGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgYnVmZmVyICs9IGNoYXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBBVEhfU1RBUlQ6XG4gICAgICAgIGlmIChpc1NwZWNpYWwodXJsKSkge1xuICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICBpZiAoY2hhciAhPSAnLycgJiYgY2hhciAhPSAnXFxcXCcpIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNoYXIgPT0gJz8nKSB7XG4gICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgfSBlbHNlIGlmICghc3RhdGVPdmVycmlkZSAmJiBjaGFyID09ICcjJykge1xuICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciAhPSBFT0YpIHtcbiAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgaWYgKGNoYXIgIT0gJy8nKSBjb250aW51ZTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBQQVRIOlxuICAgICAgICBpZiAoXG4gICAgICAgICAgY2hhciA9PSBFT0YgfHwgY2hhciA9PSAnLycgfHxcbiAgICAgICAgICAoY2hhciA9PSAnXFxcXCcgJiYgaXNTcGVjaWFsKHVybCkpIHx8XG4gICAgICAgICAgKCFzdGF0ZU92ZXJyaWRlICYmIChjaGFyID09ICc/JyB8fCBjaGFyID09ICcjJykpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChpc0RvdWJsZURvdChidWZmZXIpKSB7XG4gICAgICAgICAgICBzaG9ydGVuVVJMc1BhdGgodXJsKTtcbiAgICAgICAgICAgIGlmIChjaGFyICE9ICcvJyAmJiAhKGNoYXIgPT0gJ1xcXFwnICYmIGlzU3BlY2lhbCh1cmwpKSkge1xuICAgICAgICAgICAgICB1cmwucGF0aC5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGlzU2luZ2xlRG90KGJ1ZmZlcikpIHtcbiAgICAgICAgICAgIGlmIChjaGFyICE9ICcvJyAmJiAhKGNoYXIgPT0gJ1xcXFwnICYmIGlzU3BlY2lhbCh1cmwpKSkge1xuICAgICAgICAgICAgICB1cmwucGF0aC5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT0gJ2ZpbGUnICYmICF1cmwucGF0aC5sZW5ndGggJiYgaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYnVmZmVyKSkge1xuICAgICAgICAgICAgICBpZiAodXJsLmhvc3QpIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jaGFyQXQoMCkgKyAnOic7IC8vIG5vcm1hbGl6ZSB3aW5kb3dzIGRyaXZlIGxldHRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXJsLnBhdGgucHVzaChidWZmZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICBpZiAodXJsLnNjaGVtZSA9PSAnZmlsZScgJiYgKGNoYXIgPT0gRU9GIHx8IGNoYXIgPT0gJz8nIHx8IGNoYXIgPT0gJyMnKSkge1xuICAgICAgICAgICAgd2hpbGUgKHVybC5wYXRoLmxlbmd0aCA+IDEgJiYgdXJsLnBhdGhbMF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgIHVybC5wYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaGFyID09ICc/Jykge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnIycpIHtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyICs9IHBlcmNlbnRFbmNvZGUoY2hhciwgcGF0aFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIENBTk5PVF9CRV9BX0JBU0VfVVJMX1BBVEg6XG4gICAgICAgIGlmIChjaGFyID09ICc/Jykge1xuICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PSAnIycpIHtcbiAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXIgIT0gRU9GKSB7XG4gICAgICAgICAgdXJsLnBhdGhbMF0gKz0gcGVyY2VudEVuY29kZShjaGFyLCBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgfSBicmVhaztcblxuICAgICAgY2FzZSBRVUVSWTpcbiAgICAgICAgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNoYXIgPT0gJyMnKSB7XG4gICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyICE9IEVPRikge1xuICAgICAgICAgIGlmIChjaGFyID09IFwiJ1wiICYmIGlzU3BlY2lhbCh1cmwpKSB1cmwucXVlcnkgKz0gJyUyNyc7XG4gICAgICAgICAgZWxzZSBpZiAoY2hhciA9PSAnIycpIHVybC5xdWVyeSArPSAnJTIzJztcbiAgICAgICAgICBlbHNlIHVybC5xdWVyeSArPSBwZXJjZW50RW5jb2RlKGNoYXIsIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICBjYXNlIEZSQUdNRU5UOlxuICAgICAgICBpZiAoY2hhciAhPSBFT0YpIHVybC5mcmFnbWVudCArPSBwZXJjZW50RW5jb2RlKGNoYXIsIGZyYWdtZW50UGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHBvaW50ZXIrKztcbiAgfVxufTtcblxuLy8gYFVSTGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsLWNsYXNzXG52YXIgVVJMQ29uc3RydWN0b3IgPSBmdW5jdGlvbiBVUkwodXJsIC8qICwgYmFzZSAqLykge1xuICB2YXIgdGhhdCA9IGFuSW5zdGFuY2UodGhpcywgVVJMQ29uc3RydWN0b3IsICdVUkwnKTtcbiAgdmFyIGJhc2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIHVybFN0cmluZyA9IFN0cmluZyh1cmwpO1xuICB2YXIgc3RhdGUgPSBzZXRJbnRlcm5hbFN0YXRlKHRoYXQsIHsgdHlwZTogJ1VSTCcgfSk7XG4gIHZhciBiYXNlU3RhdGUsIGZhaWx1cmU7XG4gIGlmIChiYXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYmFzZSBpbnN0YW5jZW9mIFVSTENvbnN0cnVjdG9yKSBiYXNlU3RhdGUgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKGJhc2UpO1xuICAgIGVsc2Uge1xuICAgICAgZmFpbHVyZSA9IHBhcnNlVVJMKGJhc2VTdGF0ZSA9IHt9LCBTdHJpbmcoYmFzZSkpO1xuICAgICAgaWYgKGZhaWx1cmUpIHRocm93IFR5cGVFcnJvcihmYWlsdXJlKTtcbiAgICB9XG4gIH1cbiAgZmFpbHVyZSA9IHBhcnNlVVJMKHN0YXRlLCB1cmxTdHJpbmcsIG51bGwsIGJhc2VTdGF0ZSk7XG4gIGlmIChmYWlsdXJlKSB0aHJvdyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gIHZhciBzZWFyY2hQYXJhbXMgPSBzdGF0ZS5zZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gIHZhciBzZWFyY2hQYXJhbXNTdGF0ZSA9IGdldEludGVybmFsU2VhcmNoUGFyYW1zU3RhdGUoc2VhcmNoUGFyYW1zKTtcbiAgc2VhcmNoUGFyYW1zU3RhdGUudXBkYXRlU2VhcmNoUGFyYW1zKHN0YXRlLnF1ZXJ5KTtcbiAgc2VhcmNoUGFyYW1zU3RhdGUudXBkYXRlVVJMID0gZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnF1ZXJ5ID0gU3RyaW5nKHNlYXJjaFBhcmFtcykgfHwgbnVsbDtcbiAgfTtcbiAgaWYgKCFERVNDUklQVE9SUykge1xuICAgIHRoYXQuaHJlZiA9IHNlcmlhbGl6ZVVSTC5jYWxsKHRoYXQpO1xuICAgIHRoYXQub3JpZ2luID0gZ2V0T3JpZ2luLmNhbGwodGhhdCk7XG4gICAgdGhhdC5wcm90b2NvbCA9IGdldFByb3RvY29sLmNhbGwodGhhdCk7XG4gICAgdGhhdC51c2VybmFtZSA9IGdldFVzZXJuYW1lLmNhbGwodGhhdCk7XG4gICAgdGhhdC5wYXNzd29yZCA9IGdldFBhc3N3b3JkLmNhbGwodGhhdCk7XG4gICAgdGhhdC5ob3N0ID0gZ2V0SG9zdC5jYWxsKHRoYXQpO1xuICAgIHRoYXQuaG9zdG5hbWUgPSBnZXRIb3N0bmFtZS5jYWxsKHRoYXQpO1xuICAgIHRoYXQucG9ydCA9IGdldFBvcnQuY2FsbCh0aGF0KTtcbiAgICB0aGF0LnBhdGhuYW1lID0gZ2V0UGF0aG5hbWUuY2FsbCh0aGF0KTtcbiAgICB0aGF0LnNlYXJjaCA9IGdldFNlYXJjaC5jYWxsKHRoYXQpO1xuICAgIHRoYXQuc2VhcmNoUGFyYW1zID0gZ2V0U2VhcmNoUGFyYW1zLmNhbGwodGhhdCk7XG4gICAgdGhhdC5oYXNoID0gZ2V0SGFzaC5jYWxsKHRoYXQpO1xuICB9XG59O1xuXG52YXIgVVJMUHJvdG90eXBlID0gVVJMQ29uc3RydWN0b3IucHJvdG90eXBlO1xuXG52YXIgc2VyaWFsaXplVVJMID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgdmFyIHNjaGVtZSA9IHVybC5zY2hlbWU7XG4gIHZhciB1c2VybmFtZSA9IHVybC51c2VybmFtZTtcbiAgdmFyIHBhc3N3b3JkID0gdXJsLnBhc3N3b3JkO1xuICB2YXIgaG9zdCA9IHVybC5ob3N0O1xuICB2YXIgcG9ydCA9IHVybC5wb3J0O1xuICB2YXIgcGF0aCA9IHVybC5wYXRoO1xuICB2YXIgcXVlcnkgPSB1cmwucXVlcnk7XG4gIHZhciBmcmFnbWVudCA9IHVybC5mcmFnbWVudDtcbiAgdmFyIG91dHB1dCA9IHNjaGVtZSArICc6JztcbiAgaWYgKGhvc3QgIT09IG51bGwpIHtcbiAgICBvdXRwdXQgKz0gJy8vJztcbiAgICBpZiAoaW5jbHVkZXNDcmVkZW50aWFscyh1cmwpKSB7XG4gICAgICBvdXRwdXQgKz0gdXNlcm5hbWUgKyAocGFzc3dvcmQgPyAnOicgKyBwYXNzd29yZCA6ICcnKSArICdAJztcbiAgICB9XG4gICAgb3V0cHV0ICs9IHNlcmlhbGl6ZUhvc3QoaG9zdCk7XG4gICAgaWYgKHBvcnQgIT09IG51bGwpIG91dHB1dCArPSAnOicgKyBwb3J0O1xuICB9IGVsc2UgaWYgKHNjaGVtZSA9PSAnZmlsZScpIG91dHB1dCArPSAnLy8nO1xuICBvdXRwdXQgKz0gdXJsLmNhbm5vdEJlQUJhc2VVUkwgPyBwYXRoWzBdIDogcGF0aC5sZW5ndGggPyAnLycgKyBwYXRoLmpvaW4oJy8nKSA6ICcnO1xuICBpZiAocXVlcnkgIT09IG51bGwpIG91dHB1dCArPSAnPycgKyBxdWVyeTtcbiAgaWYgKGZyYWdtZW50ICE9PSBudWxsKSBvdXRwdXQgKz0gJyMnICsgZnJhZ21lbnQ7XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG52YXIgZ2V0T3JpZ2luID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgdmFyIHNjaGVtZSA9IHVybC5zY2hlbWU7XG4gIHZhciBwb3J0ID0gdXJsLnBvcnQ7XG4gIGlmIChzY2hlbWUgPT0gJ2Jsb2InKSB0cnkge1xuICAgIHJldHVybiBuZXcgVVJMKHNjaGVtZS5wYXRoWzBdKS5vcmlnaW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuICBpZiAoc2NoZW1lID09ICdmaWxlJyB8fCAhaXNTcGVjaWFsKHVybCkpIHJldHVybiAnbnVsbCc7XG4gIHJldHVybiBzY2hlbWUgKyAnOi8vJyArIHNlcmlhbGl6ZUhvc3QodXJsLmhvc3QpICsgKHBvcnQgIT09IG51bGwgPyAnOicgKyBwb3J0IDogJycpO1xufTtcblxudmFyIGdldFByb3RvY29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5zY2hlbWUgKyAnOic7XG59O1xuXG52YXIgZ2V0VXNlcm5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnVzZXJuYW1lO1xufTtcblxudmFyIGdldFBhc3N3b3JkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5wYXNzd29yZDtcbn07XG5cbnZhciBnZXRIb3N0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgdmFyIGhvc3QgPSB1cmwuaG9zdDtcbiAgdmFyIHBvcnQgPSB1cmwucG9ydDtcbiAgcmV0dXJuIGhvc3QgPT09IG51bGwgPyAnJ1xuICAgIDogcG9ydCA9PT0gbnVsbCA/IHNlcmlhbGl6ZUhvc3QoaG9zdClcbiAgICA6IHNlcmlhbGl6ZUhvc3QoaG9zdCkgKyAnOicgKyBwb3J0O1xufTtcblxudmFyIGdldEhvc3RuYW1lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaG9zdCA9IGdldEludGVybmFsVVJMU3RhdGUodGhpcykuaG9zdDtcbiAgcmV0dXJuIGhvc3QgPT09IG51bGwgPyAnJyA6IHNlcmlhbGl6ZUhvc3QoaG9zdCk7XG59O1xuXG52YXIgZ2V0UG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBvcnQgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnBvcnQ7XG4gIHJldHVybiBwb3J0ID09PSBudWxsID8gJycgOiBTdHJpbmcocG9ydCk7XG59O1xuXG52YXIgZ2V0UGF0aG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICB2YXIgcGF0aCA9IHVybC5wYXRoO1xuICByZXR1cm4gdXJsLmNhbm5vdEJlQUJhc2VVUkwgPyBwYXRoWzBdIDogcGF0aC5sZW5ndGggPyAnLycgKyBwYXRoLmpvaW4oJy8nKSA6ICcnO1xufTtcblxudmFyIGdldFNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5xdWVyeTtcbiAgcmV0dXJuIHF1ZXJ5ID8gJz8nICsgcXVlcnkgOiAnJztcbn07XG5cbnZhciBnZXRTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnNlYXJjaFBhcmFtcztcbn07XG5cbnZhciBnZXRIYXNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZnJhZ21lbnQgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLmZyYWdtZW50O1xuICByZXR1cm4gZnJhZ21lbnQgPyAnIycgKyBmcmFnbWVudCA6ICcnO1xufTtcblxudmFyIGFjY2Vzc29yRGVzY3JpcHRvciA9IGZ1bmN0aW9uIChnZXR0ZXIsIHNldHRlcikge1xuICByZXR1cm4geyBnZXQ6IGdldHRlciwgc2V0OiBzZXR0ZXIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSB9O1xufTtcblxuaWYgKERFU0NSSVBUT1JTKSB7XG4gIGRlZmluZVByb3BlcnRpZXMoVVJMUHJvdG90eXBlLCB7XG4gICAgLy8gYFVSTC5wcm90b3R5cGUuaHJlZmAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaHJlZlxuICAgIGhyZWY6IGFjY2Vzc29yRGVzY3JpcHRvcihzZXJpYWxpemVVUkwsIGZ1bmN0aW9uIChocmVmKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciB1cmxTdHJpbmcgPSBTdHJpbmcoaHJlZik7XG4gICAgICB2YXIgZmFpbHVyZSA9IHBhcnNlVVJMKHVybCwgdXJsU3RyaW5nKTtcbiAgICAgIGlmIChmYWlsdXJlKSB0aHJvdyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gICAgICBnZXRJbnRlcm5hbFNlYXJjaFBhcmFtc1N0YXRlKHVybC5zZWFyY2hQYXJhbXMpLnVwZGF0ZVNlYXJjaFBhcmFtcyh1cmwucXVlcnkpO1xuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLm9yaWdpbmAgZ2V0dGVyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLW9yaWdpblxuICAgIG9yaWdpbjogYWNjZXNzb3JEZXNjcmlwdG9yKGdldE9yaWdpbiksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUucHJvdG9jb2xgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXByb3RvY29sXG4gICAgcHJvdG9jb2w6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRQcm90b2NvbCwgZnVuY3Rpb24gKHByb3RvY29sKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHBhcnNlVVJMKHVybCwgU3RyaW5nKHByb3RvY29sKSArICc6JywgU0NIRU1FX1NUQVJUKTtcbiAgICB9KSxcbiAgICAvLyBgVVJMLnByb3RvdHlwZS51c2VybmFtZWAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtdXNlcm5hbWVcbiAgICB1c2VybmFtZTogYWNjZXNzb3JEZXNjcmlwdG9yKGdldFVzZXJuYW1lLCBmdW5jdGlvbiAodXNlcm5hbWUpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICAgICAgdmFyIGNvZGVQb2ludHMgPSBhcnJheUZyb20oU3RyaW5nKHVzZXJuYW1lKSk7XG4gICAgICBpZiAoY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KHVybCkpIHJldHVybjtcbiAgICAgIHVybC51c2VybmFtZSA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVybC51c2VybmFtZSArPSBwZXJjZW50RW5jb2RlKGNvZGVQb2ludHNbaV0sIHVzZXJpbmZvUGVyY2VudEVuY29kZVNldCk7XG4gICAgICB9XG4gICAgfSksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUucGFzc3dvcmRgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBhc3N3b3JkXG4gICAgcGFzc3dvcmQ6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRQYXNzd29yZCwgZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKFN0cmluZyhwYXNzd29yZCkpO1xuICAgICAgaWYgKGNhbm5vdEhhdmVVc2VybmFtZVBhc3N3b3JkUG9ydCh1cmwpKSByZXR1cm47XG4gICAgICB1cmwucGFzc3dvcmQgPSAnJztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB1cmwucGFzc3dvcmQgKz0gcGVyY2VudEVuY29kZShjb2RlUG9pbnRzW2ldLCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLmhvc3RgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RcbiAgICBob3N0OiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0SG9zdCwgZnVuY3Rpb24gKGhvc3QpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICAgICAgaWYgKHVybC5jYW5ub3RCZUFCYXNlVVJMKSByZXR1cm47XG4gICAgICBwYXJzZVVSTCh1cmwsIFN0cmluZyhob3N0KSwgSE9TVCk7XG4gICAgfSksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUuaG9zdG5hbWVgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RuYW1lXG4gICAgaG9zdG5hbWU6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRIb3N0bmFtZSwgZnVuY3Rpb24gKGhvc3RuYW1lKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIGlmICh1cmwuY2Fubm90QmVBQmFzZVVSTCkgcmV0dXJuO1xuICAgICAgcGFyc2VVUkwodXJsLCBTdHJpbmcoaG9zdG5hbWUpLCBIT1NUTkFNRSk7XG4gICAgfSksXG4gICAgLy8gYFVSTC5wcm90b3R5cGUucG9ydGAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcG9ydFxuICAgIHBvcnQ6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRQb3J0LCBmdW5jdGlvbiAocG9ydCkge1xuICAgICAgdmFyIHVybCA9IGdldEludGVybmFsVVJMU3RhdGUodGhpcyk7XG4gICAgICBpZiAoY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KHVybCkpIHJldHVybjtcbiAgICAgIHBvcnQgPSBTdHJpbmcocG9ydCk7XG4gICAgICBpZiAocG9ydCA9PSAnJykgdXJsLnBvcnQgPSBudWxsO1xuICAgICAgZWxzZSBwYXJzZVVSTCh1cmwsIHBvcnQsIFBPUlQpO1xuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLnBhdGhuYW1lYCBhY2Nlc3NvcnMgcGFpclxuICAgIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wYXRobmFtZVxuICAgIHBhdGhuYW1lOiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0UGF0aG5hbWUsIGZ1bmN0aW9uIChwYXRobmFtZSkge1xuICAgICAgdmFyIHVybCA9IGdldEludGVybmFsVVJMU3RhdGUodGhpcyk7XG4gICAgICBpZiAodXJsLmNhbm5vdEJlQUJhc2VVUkwpIHJldHVybjtcbiAgICAgIHVybC5wYXRoID0gW107XG4gICAgICBwYXJzZVVSTCh1cmwsIHBhdGhuYW1lICsgJycsIFBBVEhfU1RBUlQpO1xuICAgIH0pLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLnNlYXJjaGAgYWNjZXNzb3JzIHBhaXJcbiAgICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtc2VhcmNoXG4gICAgc2VhcmNoOiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0U2VhcmNoLCBmdW5jdGlvbiAoc2VhcmNoKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKTtcbiAgICAgIHNlYXJjaCA9IFN0cmluZyhzZWFyY2gpO1xuICAgICAgaWYgKHNlYXJjaCA9PSAnJykge1xuICAgICAgICB1cmwucXVlcnkgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCc/JyA9PSBzZWFyY2guY2hhckF0KDApKSBzZWFyY2ggPSBzZWFyY2guc2xpY2UoMSk7XG4gICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICBwYXJzZVVSTCh1cmwsIHNlYXJjaCwgUVVFUlkpO1xuICAgICAgfVxuICAgICAgZ2V0SW50ZXJuYWxTZWFyY2hQYXJhbXNTdGF0ZSh1cmwuc2VhcmNoUGFyYW1zKS51cGRhdGVTZWFyY2hQYXJhbXModXJsLnF1ZXJ5KTtcbiAgICB9KSxcbiAgICAvLyBgVVJMLnByb3RvdHlwZS5zZWFyY2hQYXJhbXNgIGdldHRlclxuICAgIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1zZWFyY2hwYXJhbXNcbiAgICBzZWFyY2hQYXJhbXM6IGFjY2Vzc29yRGVzY3JpcHRvcihnZXRTZWFyY2hQYXJhbXMpLFxuICAgIC8vIGBVUkwucHJvdG90eXBlLmhhc2hgIGFjY2Vzc29ycyBwYWlyXG4gICAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhhc2hcbiAgICBoYXNoOiBhY2Nlc3NvckRlc2NyaXB0b3IoZ2V0SGFzaCwgZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpO1xuICAgICAgaGFzaCA9IFN0cmluZyhoYXNoKTtcbiAgICAgIGlmIChoYXNoID09ICcnKSB7XG4gICAgICAgIHVybC5mcmFnbWVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgnIycgPT0gaGFzaC5jaGFyQXQoMCkpIGhhc2ggPSBoYXNoLnNsaWNlKDEpO1xuICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICBwYXJzZVVSTCh1cmwsIGhhc2gsIEZSQUdNRU5UKTtcbiAgICB9KVxuICB9KTtcbn1cblxuLy8gYFVSTC5wcm90b3R5cGUudG9KU09OYCBtZXRob2Rcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC10b2pzb25cbnJlZGVmaW5lKFVSTFByb3RvdHlwZSwgJ3RvSlNPTicsIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIHNlcmlhbGl6ZVVSTC5jYWxsKHRoaXMpO1xufSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vLyBgVVJMLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI1VSTC1zdHJpbmdpZmljYXRpb24tYmVoYXZpb3JcbnJlZGVmaW5lKFVSTFByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBzZXJpYWxpemVVUkwuY2FsbCh0aGlzKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuaWYgKE5hdGl2ZVVSTCkge1xuICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gTmF0aXZlVVJMLmNyZWF0ZU9iamVjdFVSTDtcbiAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IE5hdGl2ZVVSTC5yZXZva2VPYmplY3RVUkw7XG4gIC8vIGBVUkwuY3JlYXRlT2JqZWN0VVJMYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC9jcmVhdGVPYmplY3RVUkxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGlmIChuYXRpdmVDcmVhdGVPYmplY3RVUkwpIHJlZGVmaW5lKFVSTENvbnN0cnVjdG9yLCAnY3JlYXRlT2JqZWN0VVJMJywgZnVuY3Rpb24gY3JlYXRlT2JqZWN0VVJMKGJsb2IpIHtcbiAgICByZXR1cm4gbmF0aXZlQ3JlYXRlT2JqZWN0VVJMLmFwcGx5KE5hdGl2ZVVSTCwgYXJndW1lbnRzKTtcbiAgfSk7XG4gIC8vIGBVUkwucmV2b2tlT2JqZWN0VVJMYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC9yZXZva2VPYmplY3RVUkxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGlmIChuYXRpdmVSZXZva2VPYmplY3RVUkwpIHJlZGVmaW5lKFVSTENvbnN0cnVjdG9yLCAncmV2b2tlT2JqZWN0VVJMJywgZnVuY3Rpb24gcmV2b2tlT2JqZWN0VVJMKHVybCkge1xuICAgIHJldHVybiBuYXRpdmVSZXZva2VPYmplY3RVUkwuYXBwbHkoTmF0aXZlVVJMLCBhcmd1bWVudHMpO1xuICB9KTtcbn1cblxuc2V0VG9TdHJpbmdUYWcoVVJMQ29uc3RydWN0b3IsICdVUkwnKTtcblxuJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiAhVVNFX05BVElWRV9VUkwsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIFVSTDogVVJMQ29uc3RydWN0b3Jcbn0pO1xuIiwidmFyIGdsb2JhbCA9XG4gICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmKSB8fFxuICAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsKVxuXG52YXIgc3VwcG9ydCA9IHtcbiAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBnbG9iYWwsXG4gIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBnbG9iYWwgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gIGJsb2I6XG4gICAgJ0ZpbGVSZWFkZXInIGluIGdsb2JhbCAmJlxuICAgICdCbG9iJyBpbiBnbG9iYWwgJiZcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIGdsb2JhbCxcbiAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gZ2xvYmFsXG59XG5cbmZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxufVxuXG5pZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgXVxuXG4gIHZhciBpc0FycmF5QnVmZmVyVmlldyA9XG4gICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICB9XG4gIGlmICgvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+IV0vaS50ZXN0KG5hbWUpIHx8IG5hbWUgPT09ICcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICB9XG4gIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbmZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gIHZhciBpdGVyYXRvciA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGl0ZXJhdG9yXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdGhpcy5tYXAgPSB7fVxuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgfSwgdGhpcylcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgfSwgdGhpcylcbiAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgIH0sIHRoaXMpXG4gIH1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV1cbiAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlICsgJywgJyArIHZhbHVlIDogdmFsdWVcbn1cblxuSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpXG4gICAgfVxuICB9XG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgaXRlbXMucHVzaChuYW1lKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKVxuICB9KVxuICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG59XG5cbmlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG59XG5cbmZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gIH1cbiAgYm9keS5ib2R5VXNlZCA9IHRydWVcbn1cblxuZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgIH1cbiAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gIHJldHVybiBwcm9taXNlXG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5mdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gIH1cbiAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICB9IGVsc2Uge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgfVxufVxuXG5mdW5jdGlvbiBCb2R5KCkge1xuICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAvKlxuICAgICAgZmV0Y2gtbW9jayB3cmFwcyB0aGUgUmVzcG9uc2Ugb2JqZWN0IGluIGFuIEVTNiBQcm94eSB0b1xuICAgICAgcHJvdmlkZSB1c2VmdWwgdGVzdCBoYXJuZXNzIGZlYXR1cmVzIHN1Y2ggYXMgZmx1c2guIEhvd2V2ZXIsIG9uXG4gICAgICBFUzUgYnJvd3NlcnMgd2l0aG91dCBmZXRjaCBvciBQcm94eSBzdXBwb3J0IHBvbGx5ZmlsbHMgbXVzdCBiZSB1c2VkO1xuICAgICAgdGhlIHByb3h5LXBvbGx5ZmlsbCBpcyB1bmFibGUgdG8gcHJveHkgYW4gYXR0cmlidXRlIHVubGVzcyBpdCBleGlzdHNcbiAgICAgIG9uIHRoZSBvYmplY3QgYmVmb3JlIHRoZSBQcm94eSBpcyBjcmVhdGVkLiBUaGlzIGNoYW5nZSBlbnN1cmVzXG4gICAgICBSZXNwb25zZS5ib2R5VXNlZCBleGlzdHMgb24gdGhlIGluc3RhbmNlLCB3aGlsZSBtYWludGFpbmluZyB0aGVcbiAgICAgIHNlbWFudGljIG9mIHNldHRpbmcgUmVxdWVzdC5ib2R5VXNlZCBpbiB0aGUgY29uc3RydWN0b3IgYmVmb3JlXG4gICAgICBfaW5pdEJvZHkgaXMgY2FsbGVkLlxuICAgICovXG4gICAgdGhpcy5ib2R5VXNlZCA9IHRoaXMuYm9keVVzZWRcbiAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSlcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdmFyIGlzQ29uc3VtZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAoaXNDb25zdW1lZCkge1xuICAgICAgICAgIHJldHVybiBpc0NvbnN1bWVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5idWZmZXIuc2xpY2UoXG4gICAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlT2Zmc2V0LFxuICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZU9mZnNldCArIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3RlZFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxudmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gIHJldHVybiBtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSA/IHVwY2FzZWQgOiBtZXRob2Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcXVlc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSB0aGUgXCJuZXdcIiBvcGVyYXRvciwgdGhpcyBET00gb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi4nKVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgIH1cbiAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICB0aGlzLnNpZ25hbCA9IGlucHV0LnNpZ25hbFxuICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICB9XG5cbiAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nXG4gIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgfVxuICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gIHRoaXMuc2lnbmFsID0gb3B0aW9ucy5zaWduYWwgfHwgdGhpcy5zaWduYWxcbiAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICB9XG4gIHRoaXMuX2luaXRCb2R5KGJvZHkpXG5cbiAgaWYgKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSB7XG4gICAgaWYgKG9wdGlvbnMuY2FjaGUgPT09ICduby1zdG9yZScgfHwgb3B0aW9ucy5jYWNoZSA9PT0gJ25vLWNhY2hlJykge1xuICAgICAgLy8gU2VhcmNoIGZvciBhICdfJyBwYXJhbWV0ZXIgaW4gdGhlIHF1ZXJ5IHN0cmluZ1xuICAgICAgdmFyIHJlUGFyYW1TZWFyY2ggPSAvKFs/Jl0pXz1bXiZdKi9cbiAgICAgIGlmIChyZVBhcmFtU2VhcmNoLnRlc3QodGhpcy51cmwpKSB7XG4gICAgICAgIC8vIElmIGl0IGFscmVhZHkgZXhpc3RzIHRoZW4gc2V0IHRoZSB2YWx1ZSB3aXRoIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5yZXBsYWNlKHJlUGFyYW1TZWFyY2gsICckMV89JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBhIG5ldyAnXycgcGFyYW1ldGVyIHRvIHRoZSBlbmQgd2l0aCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIHZhciByZVF1ZXJ5U3RyaW5nID0gL1xcPy9cbiAgICAgICAgdGhpcy51cmwgKz0gKHJlUXVlcnlTdHJpbmcudGVzdCh0aGlzLnVybCkgPyAnJicgOiAnPycpICsgJ189JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7Ym9keTogdGhpcy5fYm9keUluaXR9KVxufVxuXG5mdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gIGJvZHlcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KCcmJylcbiAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIGZvcm1cbn1cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgdmFyIHByZVByb2Nlc3NlZEhlYWRlcnMgPSByYXdIZWFkZXJzLnJlcGxhY2UoL1xccj9cXG5bXFx0IF0rL2csICcgJylcbiAgLy8gQXZvaWRpbmcgc3BsaXQgdmlhIHJlZ2V4IHRvIHdvcmsgYXJvdW5kIGEgY29tbW9uIElFMTEgYnVnIHdpdGggdGhlIGNvcmUtanMgMy42LjAgcmVnZXggcG9seWZpbGxcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9pc3N1ZXMvNzQ4XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy83NTFcbiAgcHJlUHJvY2Vzc2VkSGVhZGVyc1xuICAgIC5zcGxpdCgnXFxyJylcbiAgICAubWFwKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgcmV0dXJuIGhlYWRlci5pbmRleE9mKCdcXG4nKSA9PT0gMCA/IGhlYWRlci5zdWJzdHIoMSwgaGVhZGVyLmxlbmd0aCkgOiBoZWFkZXJcbiAgICB9KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICByZXR1cm4gaGVhZGVyc1xufVxuXG5Cb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHVzZSB0aGUgXCJuZXdcIiBvcGVyYXRvciwgdGhpcyBET00gb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi4nKVxuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzXG4gIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnJ1xuICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG59XG5cbkJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cblJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICB1cmw6IHRoaXMudXJsXG4gIH0pXG59XG5cblJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gIHJldHVybiByZXNwb25zZVxufVxuXG52YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG59XG5cbmV4cG9ydCB2YXIgRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvblxudHJ5IHtcbiAgbmV3IERPTUV4Y2VwdGlvbigpXG59IGNhdGNoIChlcnIpIHtcbiAgRE9NRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgbmFtZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSlcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxuICBET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01FeGNlcHRpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICBmdW5jdGlvbiBhYm9ydFhocigpIHtcbiAgICAgIHhoci5hYm9ydCgpXG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICB9XG4gICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhVcmwodXJsKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdXJsID09PSAnJyAmJiBnbG9iYWwubG9jYXRpb24uaHJlZiA/IGdsb2JhbC5sb2NhdGlvbi5ocmVmIDogdXJsXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgZml4VXJsKHJlcXVlc3QudXJsKSwgdHJ1ZSlcblxuICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIpIHtcbiAgICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc3VwcG9ydC5hcnJheUJ1ZmZlciAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKS5pbmRleE9mKCdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbml0ICYmIHR5cGVvZiBpbml0LmhlYWRlcnMgPT09ICdvYmplY3QnICYmICEoaW5pdC5oZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIG5vcm1hbGl6ZVZhbHVlKGluaXQuaGVhZGVyc1tuYW1lXSkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsKSB7XG4gICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gIH0pXG59XG5cbmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxuXG5pZiAoIWdsb2JhbC5mZXRjaCkge1xuICBnbG9iYWwuZmV0Y2ggPSBmZXRjaFxuICBnbG9iYWwuSGVhZGVycyA9IEhlYWRlcnNcbiAgZ2xvYmFsLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIGdsb2JhbC5SZXNwb25zZSA9IFJlc3BvbnNlXG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgUmVtb3RlU3RhdHVzVW5pb24gfSBmcm9tIFwiLi9wcmV2aWV3LXN0YXR1c1wiXG5jb25zdCB0aW1lb3V0U2Vjb25kczogbnVtYmVyID0gNDVcbmNvbnN0IHRpbWVvdXRNaWxsaXNlY29uZHM6IG51bWJlciA9IDEwMDAgKiB0aW1lb3V0U2Vjb25kc1xuXG4vKipcbiAqIEFmdGVyIDQ1IHNlY29uZHMsIGRpc3BsYXkgYSB3YXJuaW5nLCB1bmxlc3MgY2FuY2VsbGVkIGJ5IGNsZWFyaW5nIHRoaXMgdGltZW91dCBvbmNlIHRoZSBVSSBpcyB1cGRhdGVkIGFuZCB0aGUgaWZyYW1lIGlzIGxvYWRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHRpbWVvdXRXYXJuaW5nOiBudW1iZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0dXBkYXRlTG9hZGVyV2FybmluZyhcblx0XHRgUHJldmlldyBpcyB0YWtpbmcgYSB2ZXJ5IGxvbmcgdGltZSB0byBsb2FkIChtb3JlIHRoYW4gJHt0aW1lb3V0U2Vjb25kc30gc2Vjb25kcykuPGJyIC8+VHJ5IHByZXNzaW5nIFwicHJldmlld1wiIGFnYWluIGZyb20gdGhlIFdvcmRQcmVzcyBlZGl0IHNjcmVlbi48YnIgLz5JZiB5b3Ugc2VlIHRoaXMgYWdhaW4sIHlvdXIgcHJldmlldyBidWlsZHMgYXJlIGVpdGhlciBzbG93IG9yIHRoZXJlJ3Mgc29tZXRoaW5nIHdyb25nLmAsXG5cdClcbn0sIHRpbWVvdXRNaWxsaXNlY29uZHMpXG5cbmV4cG9ydCB0eXBlIEN1c3RvbUVycm9yID0ge1xuXHRtZXNzYWdlOiBzdHJpbmdcblx0cmVtb3RlU3RhdHVzPzogUmVtb3RlU3RhdHVzVW5pb25cbn1cblxudHlwZSBTaG93YWJsZUVycm9yID0gQ3VzdG9tRXJyb3IgfCBFcnJvciB8IHN0cmluZ1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKGVycm9yOiBTaG93YWJsZUVycm9yKTogdm9pZCB7XG5cdGlmICh0eXBlb2YgZXJyb3IgPT09IGBzdHJpbmdgKSB7XG5cdFx0ZXJyb3IgPSB7XG5cdFx0XHRtZXNzYWdlOiBlcnJvcixcblx0XHR9XG5cdH1cblxuXHRjb25zdCBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XCJwcmV2aWV3XCIsXG5cdCkgYXMgSFRNTElGcmFtZUVsZW1lbnRcblxuXHRpZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0Y29uc3QgbG9hZGVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGVyXCIpXG5cblx0bG9hZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdGNvbnN0IGVycm9yRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcImVycm9yLW1lc3NhZ2UtZWxlbWVudFwiLFxuXHQpXG5cblx0ZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3IubWVzc2FnZVxuXG5cdGNvbnN0IGNvbnRlbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcIi5jb250ZW50LmVycm9yXCIsXG5cdCkgYXMgSFRNTEVsZW1lbnRcblxuXHRjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcblxuXHRpZiAoIShgcmVtb3RlU3RhdHVzYCBpbiBlcnJvcikpIHtcblx0XHRyZXR1cm5cblx0fVxuXG5cdHN3aXRjaCAoZXJyb3IucmVtb3RlU3RhdHVzKSB7XG5cdFx0Y2FzZSBgTk9fUEFHRV9DUkVBVEVEX0ZPUl9QUkVWSUVXRURfTk9ERWA6XG5cdFx0XHR1cGRhdGVUcm91Ymxlc2hvb3RpbmdNZXNzYWdlKGBcblx0XHRcdEdhdHNieSB3YXNuJ3QgYWJsZSB0byBmaW5kIGEgcGFnZSBmb3IgdGhlIHBvc3QgeW91J3JlIHRyeWluZyB0byBwcmV2aWV3LiBUaGlzIGNhbiBtZWFuIG9uZSBvZiB0aHJlZSB0aGluZ3M6XG5cdFx0XHQ8L3A+XG5cdFx0XHQ8b2w+XG5cdFx0XHRcdCA8bGk+QSBwYWdlIGlzIG5vdCBiZWluZyBidWlsdCBmb3IgdGhlIHBvc3QgYmVpbmcgcHJldmlld2VkLjwvbGk+XG5cdFx0XHRcdCA8bGk+VGhlIGlkIG9mIHRoaXMgcG9zdCBpcyBub3QgYmVpbmcgaW5jbHVkZWQgaW4gdGhlIHBhZ2VDb250ZXh0IG9mIGl0J3MgR2F0c2J5IHBhZ2UuPC9saT5cblx0XHRcdFx0IDxsaT5BbiBlcnJvciB3YXMgdGhyb3duIGluIEdhdHNieSBkdXJpbmcgUHJldmlldyBzb3VyY2luZyAoY2hlY2sgeW91ciBsb2dzKS48L2xpPlxuXHRcdFx0PC9vbD5cblx0XHRcdDxiciAvPiBcblx0XHRcdDxwPlxuXHRcdFx0XHQ8Yj5IaW50OjwvYj4gaWYgeW91IHdhbnQgdG8gYWNjb3VudCBmb3IgYW55IHBvc3NpYmxlIHBvc3QgdHlwZSAoZXZlbiB0aG9zZSB0aGF0IGhhdmVuJ3QgeWV0IGJlZW4gcmVnaXN0ZXJlZCkgeW91IGNhbiB1c2UgdGhlIFdwQ29udGVudE5vZGUgaW50ZXJmYWNlIGFzIGEgZmFsbGJhY2sgdGVtcGxhdGUgaW4gZ2F0c2J5LW5vZGUuanMgd2hlbiB5b3UncmUgY3JlYXRpbmcgcGFnZXMgYW5kIHlvdSdsbCBuZXZlciBzZWUgdGhpcyBtZXNzYWdlIHdoZW4gcmVnaXN0ZXJpbmcgbmV3IHBvc3QgdHlwZXMuXHRcdFx0XG5cdFx0YClcblx0XHRcdGJyZWFrXG5cblx0XHRjYXNlIGBHQVRTQllfUFJFVklFV19QUk9DRVNTX0VSUk9SYDpcblx0XHRcdHVwZGF0ZVRyb3VibGVzaG9vdGluZ01lc3NhZ2UoYFxuXHRcdFx0XHRUaGUgR2F0c2J5IFByZXZpZXcgcHJvY2VzcyBlcnJvcmVkIHdoaWxlIHNvdXJjaW5nIHRoaXMgcHJldmlldy48YnIgLz5QbGVhc2UgY2hlY2sgeW91ciBlcnJvciBsb2dzIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlx0XHRcblx0XHRcdGApXG5cdFx0XHRicmVha1xuXG5cdFx0Y2FzZSBgUkVDRUlWRURfUFJFVklFV19EQVRBX0ZST01fV1JPTkdfVVJMYDpcblx0XHRcdHVwZGF0ZVRyb3VibGVzaG9vdGluZ01lc3NhZ2UoYFxuXHRcdFx0XHRUaGUgR2F0c2J5IGluc3RhbmNlIHRoaXMgV1Agc2l0ZSBpcyBjb25maWd1cmVkIHRvIHNlbmQgUHJldmlld3MgdG8gaXMgY29uZmlndXJlZCB0byByZWNlaXZlIHNvdXJjZSBkYXRhIGZyb20gYSBkaWZmZXJlbnQgV29yZFByZXNzIGluc3RhbmNlLiBQbGVhc2UgY2hlY2sgeW91ciBnYXRzYnktY29uZmlnLmpzIGFuZCBXUEdhdHNieSBzZXR0aW5ncyB0byBlbnN1cmUgdGhlIFdvcmRQcmVzcyBpbnN0YW5jZSBVUkwncyBtYXRjaCB1cC5cdFx0XHRcblx0XHRcdGApXG5cdFx0XHRicmVha1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdGJyZWFrXG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJvdWJsZXNob290aW5nTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcblx0Y29uc3Qgc2hhcmVkTWVzc2FnZSA9IGA8YnIvPjxici8+SWYgeW91J3JlIG5vdCBhIGRldmVsb3BlciwgcGxlYXNlIHNjcmVlbnNob3QgdGhpcyBwYWdlIGFuZCBzZW5kIGl0IHRvIHlvdXIgZGV2ZWxvcGVyLjxiciAvPjxiciAvPjxiPk5vdGU6PC9iPiBPbmNlIHRoaXMgZXJyb3IgaXMgZml4ZWQsIHlvdSdsbCBuZWVkIHRvIHByZXNzIFwicHJldmlld1wiIGFnYWluIHRvIGNsZWFyIG91dCB0aGlzIG1lc3NhZ2UuYFxuXG5cdGNvbnN0IHRyb3VibGVzaG9vdGluZ0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcInRyb3VibGVzaG9vdGluZy1odG1sLWFyZWFcIixcblx0KVxuXG5cdHRyb3VibGVzaG9vdGluZ0VsZW1lbnQuaW5uZXJIVE1MID0gYFxuXHRcdDxwPiR7bWVzc2FnZX0ke3NoYXJlZE1lc3NhZ2V9PC9wPlx0XHRcdFxuXHRgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb2FkZXJXYXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRjb25zdCBwcmV2aWV3V2FybmluZ1AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXZpZXctbG9hZGVyLXdhcm5pbmdcIilcblxuXHRwcmV2aWV3V2FybmluZ1AuaW5uZXJIVE1MID0gYCR7bWVzc2FnZX08YnIgLz48YnIgLz48YnV0dG9uIGlkPVwiY2FuY2VsLWJ1dHRvblwiPkNhbmNlbCBhbmQgVHJvdWJsZXNob290PC9idXR0b24+YFxuXHRwcmV2aWV3V2FybmluZ1Auc3R5bGUuZGlzcGxheSA9IFwiaW5pdGlhbFwiXG5cblx0Y29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtYnV0dG9uXCIpXG5cblx0Y2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0XHRjYW5jZWxQcmV2aWV3TG9hZGVyKClcblx0XHR9XG5cdH0pXG5cblx0Y2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW5jZWxQcmV2aWV3TG9hZGVyKVxufVxuXG5mdW5jdGlvbiBjYW5jZWxQcmV2aWV3TG9hZGVyKCk6IHZvaWQge1xuXHRzaG93RXJyb3IoYFByZXZpZXcgd2FzIGNhbmNlbGxlZC5gKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluY2x1ZGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5jbHVkZXM7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2luZGV4T2YnLCB7IEFDQ0VTU09SUzogdHJ1ZSwgMTogMCB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygnaW5jbHVkZXMnKTtcbiIsImltcG9ydCB7IHRpbWVvdXRXYXJuaW5nIH0gZnJvbSBcIi4vZXJyb3Itd2FybmluZ1wiXG5cbmltcG9ydCB0eXBlIHsgSW5pdGlhbFN0YXRlIH0gZnJvbSBcIi4vc3RhcnQtcHJldmlldy1jbGllbnRcIlxuXG5kZWNsYXJlIHZhciBpbml0aWFsU3RhdGU6IEluaXRpYWxTdGF0ZVxuXG5jb25zdCBwcmV2aWV3U3RhdHVzUXVlcnk6IHN0cmluZyA9IC8qIEdyYXBoUUwgKi8gYFxuXHRxdWVyeSBQUkVWSUVXX1NUQVRVU19RVUVSWSgkcG9zdElkOiBGbG9hdCEpIHtcblx0XHR3cEdhdHNieSB7XG5cdFx0XHRnYXRzYnlQcmV2aWV3U3RhdHVzKG5vZGVJZDogJHBvc3RJZCkge1xuXHRcdFx0XHRwYWdlTm9kZSB7XG5cdFx0XHRcdFx0cGF0aFxuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXR1c1R5cGVcblx0XHRcdFx0cmVtb3RlU3RhdHVzXG5cdFx0XHRcdHN0YXR1c0NvbnRleHRcblx0XHRcdH1cblx0XHR9XG5cdH1cbmBcblxuY29uc3Qgd3BQcmV2aWV3ZWROb2RlU3RhdHVzID0gW1xuXHRgTk9fTk9ERV9GT1VORGAsXG5cdGBQUkVWSUVXX1JFQURZYCxcblx0YFJFTU9URV9OT0RFX05PVF9ZRVRfVVBEQVRFRGAsXG5cdGBOT19QUkVWSUVXX1BBVEhfRk9VTkRgLFxuXHRgUFJFVklFV19QQUdFX1VQREFURURfQlVUX05PVF9ZRVRfREVQTE9ZRURgLFxuXSBhcyBjb25zdFxuXG50eXBlIFdwUHJldmlld2VkTm9kZVN0YXR1c1VuaW9uID0gdHlwZW9mIHdwUHJldmlld2VkTm9kZVN0YXR1c1tudW1iZXJdXG5cbmNvbnN0IHJlbW90ZVN0YXR1c2VzID0gW1xuXHRgTk9fUEFHRV9DUkVBVEVEX0ZPUl9QUkVWSUVXRURfTk9ERWAsXG5cdGBHQVRTQllfUFJFVklFV19QUk9DRVNTX0VSUk9SYCxcblx0YFJFQ0VJVkVEX1BSRVZJRVdfREFUQV9GUk9NX1dST05HX1VSTGAsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCB0eXBlIFJlbW90ZVN0YXR1c1VuaW9uID0gdHlwZW9mIHJlbW90ZVN0YXR1c2VzW251bWJlcl1cblxudHlwZSBQcmV2aWV3U3RhdHVzUmVzcG9uc2VKc29uID0ge1xuXHRkYXRhOiB7XG5cdFx0d3BHYXRzYnk6IHtcblx0XHRcdGdhdHNieVByZXZpZXdTdGF0dXM6IHtcblx0XHRcdFx0cGFnZU5vZGU6IHtcblx0XHRcdFx0XHRwYXRoOiBzdHJpbmdcblx0XHRcdFx0fVxuXHRcdFx0XHRzdGF0dXNUeXBlOiBXcFByZXZpZXdlZE5vZGVTdGF0dXNVbmlvblxuXHRcdFx0XHRyZW1vdGVTdGF0dXM6IFJlbW90ZVN0YXR1c1VuaW9uXG5cdFx0XHRcdHN0YXR1c0NvbnRleHQ6IHN0cmluZ1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHRoZSBwcmV2aWV3IHN0YXR1cyB0aGF0IEdhdHNieSBoYXMgc3RvcmVkIGluIHBvc3QgbWV0YSBmb3JcbiAqIHRoZSBwYXJlbnQgcG9zdCBvZiB0aGlzIHByZXZpZXdcbiAqIFdoZW4gdGhlIHByZXZpZXcgaXMgcmVhZHksIGl0IGNhbGxzIG9uUHJldmlld1JlYWR5VXBkYXRlVUkoKSB3aGljaCB1cGRhdGVzIHRoZSBVSVxuICpcbiAqIElmIGEgc3RhdHVzIGJlc2lkZXMgUFJFVklFV19SRUFEWSBjb21lcyBiYWNrLCB3ZSB3YWl0IGEgYml0IGFuZCB0cnkgYWdhaW5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgcmV0dXJuIGFueXRoaW5nXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFByZXZpZXdTdGF0dXNBbmRVcGRhdGVVSSh7XG5cdHJlZmV0Y2hDb3VudCA9IDAsXG5cdHJlZmV0Y2hEZWxheSA9IDUwMCxcbn0gPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuXHQvLyBBc2sgV1BHcmFwaFFMIGZvciB0aGUgc3RhdHVzIG9mIHRoaXMgcHJldmlld1xuXHQvLyBHYXRzYnkgd2lsbCB1cGRhdGUgdGhpcyB3aGVuIHRoZSBwcmV2aWV3IGlzIHJlYWR5XG5cdGNvbnN0IHJlc3BvbnNlOiBQcmV2aWV3U3RhdHVzUmVzcG9uc2VKc29uID0gYXdhaXQgKFxuXHRcdGF3YWl0IGZldGNoKGAvPyR7aW5pdGlhbFN0YXRlLmdyYXBocWxFbmRwb2ludH1gLCB7XG5cdFx0XHRtZXRob2Q6IFwiUE9TVFwiLFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogcHJldmlld1N0YXR1c1F1ZXJ5LFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRwb3N0SWQ6IGluaXRpYWxTdGF0ZS5wb3N0SWQsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cdFx0XHR9LFxuXHRcdH0pXG5cdCkuanNvbigpXG5cblx0Y29uc3QgeyBzdGF0dXNUeXBlLCByZW1vdGVTdGF0dXMsIHN0YXR1c0NvbnRleHQgfSA9XG5cdFx0cmVzcG9uc2U/LmRhdGE/LndwR2F0c2J5Py5nYXRzYnlQcmV2aWV3U3RhdHVzIHx8IHt9XG5cblx0Y29uc3QgaXNTcGVjaWFsU3RhdHVzOiBib29sZWFuID0gcmVtb3RlU3RhdHVzZXMuaW5jbHVkZXMocmVtb3RlU3RhdHVzKVxuXG5cdGlmIChpc1NwZWNpYWxTdGF0dXMpIHtcblx0XHRjb25zb2xlLmxvZyh7IHJlc3BvbnNlIH0pXG5cdFx0Ly8gd2UgY2xlYXIgdGhpcyB0aW1lb3V0IHdoZW4gdGhlIHByZXZpZXcgaXMgcmVhZHkgc28gdGhhdCB0aGVcblx0XHQvLyBcImxvbmcgcHJldmlldyB0aW1lXCIgd2FybmluZyBkb2Vzbid0IGFwcGVhclxuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0V2FybmluZylcblxuXHRcdHRocm93IHtcblx0XHRcdHJlbW90ZVN0YXR1cyxcblx0XHRcdG1lc3NhZ2U6IGBHYXRzYnkgcmV0dXJuZWQgdW5zdWNjZXNzZnVsIFByZXZpZXcgc3RhdHVzOlxcbiR7cmVtb3RlU3RhdHVzfSR7XG5cdFx0XHRcdHN0YXR1c0NvbnRleHQgPyBgXFxuXFxuV2l0aCBhZGRpdGlvbmFsIGNvbnRleHQ6XFxuJHtzdGF0dXNDb250ZXh0fWAgOiBgYFxuXHRcdFx0fWAsXG5cdFx0fVxuXHR9XG5cblx0aWYgKHN0YXR1c1R5cGUgPT09IGBQUkVWSUVXX1JFQURZYCkge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0V2FybmluZylcblxuXHRcdG9uUHJldmlld1JlYWR5VXBkYXRlVUkocmVzcG9uc2UpXG5cblx0XHQvLyBpZiB0aGUgcHJldmlldyBpcyByZWFkeSB3ZSBkb24ndCBuZWVkIHRvIGNvbnRpbnVlIHNvIHdlIHJldHVybiBoZXJlXG5cdFx0Ly8gdGhpcyBmdW5jdGlvbiBpc24ndCBleHBlY3RlZCB0byByZXR1cm4gYW55dGhpbmdcblx0XHRyZXR1cm5cblx0fVxuXG5cdGNvbnN0IHJlZmV0Y2hEZWxheU1hcCA9IHtcblx0XHQvLyBhZnRlciAzMCByZXRyaWVzIG9mIDUwMG1zLCBzdGFydCBjaGVja2luZyBldmVyeSBzZWNvbmRcblx0XHQzMDogMTAwMCxcblx0XHQvLyBhZnRlciAyMCBtb3JlIHJldHJpZXMgb2YgMSBzZWNvbmQsIHN0YXJ0IGNoZWNraW5nIGV2ZXJ5IDIgc2Vjb25kc1xuXHRcdDUwOiAyMDAwLFxuXHRcdC8vIGFmdGVyIDIwIG1vcmUgcmV0cmllcyBvZiAyIHNlY29uZHMsIHN0YXJ0IGNoZWNraW5nIGV2ZXJ5IDUgc2Vjb25kc1xuXHRcdDcwOiA1MDAwLFxuXHR9XG5cblx0cmVmZXRjaENvdW50Kytcblx0Ly8gb3VyIGRlbGF5IGluY3JlYXNlcyBpZiB3ZSBoYXZlIGEgdmFsdWUgZm9yIHRoZSBjdXJyZW50IHJlZmV0Y2hDb3VudFxuXHRyZWZldGNoRGVsYXkgPSByZWZldGNoRGVsYXlNYXBbcmVmZXRjaENvdW50XSB8fCByZWZldGNoRGVsYXlcblxuXHRhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKHtcblx0XHRcdFx0cHJldmlld1N0YXR1c0NoZWNrOiB7IHJlc3BvbnNlLCByZWZldGNoQ291bnQsIHJlZmV0Y2hEZWxheSB9LFxuXHRcdFx0fSlcblx0XHRcdGNvbnNvbGUubG9nKGBQcmV2aWV3IG5vdCB5ZXQgdXBkYXRlZCwgcmV0cnlpbmcuLi5gKVxuXG5cdFx0XHRyZXNvbHZlKClcblx0XHR9LCByZWZldGNoRGVsYXkpLFxuXHQpXG5cblx0Ly8gd2UgbmVlZCB0byBhd2FpdCB0aGlzIHNvIG91ciB0b3AgbGV2ZWwgc3RhcnQoKSBmbiBjYW4gcHJvcGVybHkgdHJ5L2NhdGNoIGFuZCBkaXNwbGF5IHRoZSBlcnJvciB2aWV3XG5cdGF3YWl0IGZldGNoUHJldmlld1N0YXR1c0FuZFVwZGF0ZVVJKHtcblx0XHRyZWZldGNoQ291bnQsXG5cdFx0cmVmZXRjaERlbGF5LFxuXHR9KVxufVxuXG5mdW5jdGlvbiBvblByZXZpZXdSZWFkeVVwZGF0ZVVJKHJlc3BvbnNlOiBQcmV2aWV3U3RhdHVzUmVzcG9uc2VKc29uKTogdm9pZCB7XG5cdGNvbnN0IHsgZ2F0c2J5UHJldmlld1N0YXR1cyB9ID0gcmVzcG9uc2U/LmRhdGE/LndwR2F0c2J5IHx8IHt9XG5cblx0Y29uc29sZS5sb2coeyBwcmV2aWV3UmVhZHk6IHsgZ2F0c2J5UHJldmlld1N0YXR1cyB9IH0pXG5cblx0aWYgKFxuXHRcdCFnYXRzYnlQcmV2aWV3U3RhdHVzIHx8XG5cdFx0IWdhdHNieVByZXZpZXdTdGF0dXMuc3RhdHVzVHlwZSB8fFxuXHRcdCFnYXRzYnlQcmV2aWV3U3RhdHVzPy5wYWdlTm9kZT8ucGF0aFxuXHQpIHtcblx0XHR0aHJvdyBFcnJvcihgUmVjZWl2ZWQgYW4gaW1wcm9wZXIgcmVzcG9uc2UgZnJvbSB0aGUgUHJldmlldyBzZXJ2ZXIuYClcblx0fVxuXG5cdGNvbnN0IHByZXZpZXdJZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XCJwcmV2aWV3XCIsXG5cdCkgYXMgSFRNTElGcmFtZUVsZW1lbnRcblxuXHQvLyB3aGVuIHRoZSBpZnJhbWUgbG9hZHMgd2Ugd2FudCBvdXIgaWZyYW1lIGxvYWRlZCBldmVudCB0byBmaXJlXG5cdC8vIHNvIHdlIGNhbiByZW1vdmUgdGhlIGxvYWRlclxuXHRwcmV2aWV3SWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG9uSWZyYW1lTG9hZGVkSGlkZUxvYWRlclVJKVxuXG5cdGNvbnNvbGUubG9nKGBMb2FkaW5nIEdhdHNieSBQcmV2aWV3IGluIGFuIGlmcmFtZS4uLmApXG5cdC8vIHBvaW50IHRoZSBpZnJhbWUgYXQgdGhlIGZyb250ZW5kIHByZXZpZXcgdXJsIGZvciB0aGlzIHByZXZpZXdcblx0cHJldmlld0lmcmFtZS5zcmMgPVxuXHRcdGluaXRpYWxTdGF0ZS5wcmV2aWV3RnJvbnRlbmRVcmwgKyBnYXRzYnlQcmV2aWV3U3RhdHVzLnBhZ2VOb2RlLnBhdGhcblxuXHRjb25zdCBldmVudCA9IG5ldyBFdmVudChcIndwLWdhdHNieS1wcmV2aWV3LXJlYWR5XCIpXG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG59XG5cbmZ1bmN0aW9uIG9uSWZyYW1lTG9hZGVkSGlkZUxvYWRlclVJKCk6IHZvaWQge1xuXHRjb25zdCBsb2FkZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkZXJcIilcblx0Y29uc29sZS5sb2coYExvYWRlZCBHYXRzYnkgUHJldmlldyFgKVxuXG5cdGNvbnNvbGUubG9nKGxvYWRlcilcblxuXHQvLyB0aGlzIGRlbGF5IHByZXZlbnRzIGEgZmxhc2ggYmV0d2VlblxuXHQvLyB0aGUgaWZyYW1lIHBhaW50aW5nIGFuZCB0aGUgbG9hZGVyIGRpc3NhcGVhcmluZ1xuXHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHQvLyB0aGVyZSBpcyBhIGZhZGVvdXQgY3NzIGFuaW1hdGlvbiBvbiB0aGlzXG5cdFx0bG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJsb2FkZWRcIilcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0Ly8gd2Ugd2FpdCBhIHNlYyB0byBkaXNwbGF5IG5vbmUgc28gdGhlIGNzcyBhbmltYXRpb24gZmFkZW91dCBjYW4gY29tcGxldGVcblx0XHRcdGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHR9LCAxMDApXG5cdH0sIDUwKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG91YmxlQ2hlY2tJZlByZXZpZXdGcm9udGVuZElzT25saW5lKCkge1xuXHRjb25zdCBmZXRjaFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goaW5pdGlhbFN0YXRlLnByZXZpZXdGcm9udGVuZFVybClcblxuXHRpZiAoZmV0Y2hSZXNwb25zZS5vaykge1xuXHRcdC8vIGlmIHRoZSByZXNwb25zZSBjYW1lIGJhY2sgb2sgYW5kIHdlIGhhdmVuJ3QgYWxyZWFkeSBzdGFydGVkIGxvYWRpbmcgdGhlIFVJXG5cdFx0aWYgKCFpbml0aWFsU3RhdGUucHJldmlld1dlYmhvb2tJc09ubGluZSkge1xuXHRcdFx0Ly8gc3RhcnQgbG9hZGluZyBpdCBiZWNhdXNlIHRoZSBmcm9udGVuZCBhY3R1YWxseSBpcyBvbmxpbmVcblx0XHRcdGF3YWl0IGZldGNoUHJldmlld1N0YXR1c0FuZFVwZGF0ZVVJKClcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gb3RoZXJ3aXNlIHRocm93aW5nIHRoaXMgd2lsbCBkaXNwbGF5IHRoZSBlcnJvciBVSVxuXHRcdHRocm93IEVycm9yKGBUaGUgR2F0c2J5IFByZXZpZXcgaW5zdGFuY2UgY2FuJ3QgYmUgcmVhY2hlZC5gKVxuXHR9XG59XG4iLCJpbXBvcnQgXCJ3aGF0d2ctZmV0Y2hcIlxuXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwiLi9lcnJvci13YXJuaW5nXCJcbmltcG9ydCB7XG5cdGZldGNoUHJldmlld1N0YXR1c0FuZFVwZGF0ZVVJLFxuXHRkb3VibGVDaGVja0lmUHJldmlld0Zyb250ZW5kSXNPbmxpbmUsXG59IGZyb20gXCIuL3ByZXZpZXctc3RhdHVzXCJcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFN0YXRlID0ge1xuXHRwcmV2aWV3V2ViaG9va0lzT25saW5lOiBib29sZWFuXG5cdHByZXZpZXdGcm9udGVuZFVybDogc3RyaW5nXG5cdHBvc3RJZDogbnVtYmVyXG5cdGdyYXBocWxFbmRwb2ludDogc3RyaW5nXG5cdHdlYmhvb2tXYXNDYWxsZWQ6IGJvb2xlYW5cbn1cblxuZGVjbGFyZSB2YXIgaW5pdGlhbFN0YXRlOiBJbml0aWFsU3RhdGVcblxuLyoqXG4gKiBUaGlzIGZpbGUgaXMgcHJpbnRlZCBvdXQgaW4gcHJldmlldy10ZW1wbGF0ZS5waHBcbiAqIGluaXRpYWxTdGF0ZSBnbG9iYWwgY29tZXMgZnJvbSBwcmV2aWV3LXRlbXBsYXRlLnBocCBhYm92ZSB3aGVyZSB0aGlzIGlzIHByaW50ZWQgdG8gdGhlIHBhZ2VcbiAqL1xuc3RhcnQoKS5jYXRjaCgoZSkgPT4ge1xuXHRjb25zb2xlLmVycm9yKGUpXG5cdGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcblx0XHQvLyBkb2N1bWVudCBpcyBhbHJlYWR5IHJlYWR5IHRvIGdvIHNvIHNob3cgdGhlIGVycm9yXG5cdFx0c2hvd0Vycm9yKGUpXG5cdH0gZWxzZSB7XG5cdFx0Ly8gb3RoZXJ3aXNlIHdhaXQgZm9yIGl0IHRvIGxvYWQgYmVmb3JlIHNob3dpbmcgdGhlIGVycm9yXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXHRcdFx0c2hvd0Vycm9yKGUpXG5cdFx0fSlcblx0fVxufSlcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKTogUHJvbWlzZTx2b2lkPiB7XG5cdC8vIGF3YWl0aW5nIHRoZXNlIHRvIG1ha2UgdGhlbSBjYXRjaGVhYmxlXG5cdGF3YWl0IFByb21pc2UuYWxsKFtcblx0XHQvLyBvcHRpbWlzdGljYWxseSB0cnkgdG8gbG9hZCB0aGUgVUlcblx0XHRpbml0aWFsU3RhdGUucHJldmlld1dlYmhvb2tJc09ubGluZSAmJiBmZXRjaFByZXZpZXdTdGF0dXNBbmRVcGRhdGVVSSgpLFxuXHRcdC8vIEFsc28gY2hlY2sgaWYgdGhlIGZyb250ZW5kIGhhcyBiZWVuIG9ubGluZVxuXHRcdC8vIHNpbmNlIHRoZSBsYXN0IGJhY2tlbmQgY2hlY2tcblx0XHRkb3VibGVDaGVja0lmUHJldmlld0Zyb250ZW5kSXNPbmxpbmUoKSxcblx0XSlcbn1cbiJdLCJuYW1lcyI6WyJjbGFzc29mIiwiSW5kZXhlZE9iamVjdCIsImdsb2JhbCIsImRvY3VtZW50IiwiREVTQ1JJUFRPUlMiLCJjcmVhdGVFbGVtZW50IiwiSUU4X0RPTV9ERUZJTkUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsInN0b3JlIiwiTkFUSVZFX1NZTUJPTCIsIlN5bWJvbCIsIlVTRV9TWU1CT0xfQVNfVUlEIiwibWluIiwicmVxdWlyZSQkMCIsImludGVybmFsT2JqZWN0S2V5cyIsImRlZmluZVByb3BlcnRpZXMiLCJjcmVhdGUiLCJXZWFrTWFwIiwiaGFzIiwiTkFUSVZFX1dFQUtfTUFQIiwic2hhcmVkIiwib2JqZWN0SGFzIiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwiaGlkZGVuS2V5cyIsImdldE93blByb3BlcnR5TmFtZXNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0ZvcmNlZCIsIklFX1BST1RPIiwiQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSIiwiZ2V0UHJvdG90eXBlT2YiLCJJdGVyYXRvclByb3RvdHlwZSIsInJldHVyblRoaXMiLCJJdGVyYXRvcnMiLCJJdGVyYXRvcnNDb3JlIiwiQlVHR1lfU0FGQVJJX0lURVJBVE9SUyIsIklURVJBVE9SIiwic2V0UHJvdG90eXBlT2YiLCIkIiwiVE9fU1RSSU5HX1RBRyIsIlRPX1NUUklOR19UQUdfU1VQUE9SVCIsInRvU3RyaW5nIiwiQXJyYXlQcm90b3R5cGUiLCJhRnVuY3Rpb24iLCJiaW5kIiwiU1BFQ0lFUyIsInVzZXJBZ2VudCIsInNldCIsIklTX05PREUiLCJJU19JT1MiLCJyZXF1aXJlJCQxIiwicHJvY2VzcyIsIlByb21pc2UiLCJ0YXNrIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsInNldEludGVybmFsU3RhdGUiLCJOYXRpdmVQcm9taXNlIiwiVHlwZUVycm9yIiwibmV3UHJvbWlzZUNhcGFiaWxpdHkiLCJuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSIsIlY4X1ZFUlNJT04iLCJub3RpZnkiLCJjcmVhdGVNZXRob2QiLCJBcnJheUl0ZXJhdG9yTWV0aG9kcyIsIkRPTUl0ZXJhYmxlcyIsImRlZmluZVByb3BlcnR5Iiwid3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSIsIlBST1RPVFlQRSIsIk9iamVjdFByb3RvdHlwZSIsIm5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIm5hdGl2ZURlZmluZVByb3BlcnR5IiwibmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCIsIm5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlIiwiV2VsbEtub3duU3ltYm9sc1N0b3JlIiwibmF0aXZlT2JqZWN0Q3JlYXRlIiwiJGZvckVhY2giLCJmb3JFYWNoIiwidGVzdCIsIlVTRVNfVE9fTEVOR1RIIiwibWF4IiwibmF0aXZlR2V0UHJvdG90eXBlT2YiLCJmbGFncyIsIkNPTExFQ1RJT05fTkFNRSIsIkNvbGxlY3Rpb24iLCJDb2xsZWN0aW9uUHJvdG90eXBlIiwicnVudGltZSIsImV4cG9ydHMiLCJkZWZpbmUiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJpbm5lckZuIiwib3V0ZXJGbiIsInNlbGYiLCJ0cnlMb2NzTGlzdCIsInByb3RvR2VuZXJhdG9yIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwiZ2VuZXJhdG9yIiwiY29udGV4dCIsIkNvbnRleHQiLCJfaW52b2tlIiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwiZm4iLCJhcmciLCJ0eXBlIiwiY2FsbCIsImVyciIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJtZXRob2QiLCJBc3luY0l0ZXJhdG9yIiwiUHJvbWlzZUltcGwiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwiaGFzT3duIiwiX19hd2FpdCIsInRoZW4iLCJ1bndyYXBwZWQiLCJlcnJvciIsImVucXVldWUiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsInByZXZpb3VzUHJvbWlzZSIsInN0YXRlIiwiRXJyb3IiLCJkb25lUmVzdWx0IiwiZGVsZWdhdGUiLCJkZWxlZ2F0ZVJlc3VsdCIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJDb250aW51ZVNlbnRpbmVsIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJkb25lIiwiaXRlcmF0b3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwibG9jcyIsImVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJ2YWx1ZXMiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXRlcmF0b3JTeW1ib2wiLCJpc05hTiIsImxlbmd0aCIsImkiLCJPcCIsImhhc093blByb3BlcnR5IiwiJFN5bWJvbCIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImdldFByb3RvIiwiTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUiLCJHcCIsImNvbnN0cnVjdG9yIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiZ2VuRnVuIiwiY3RvciIsIm5hbWUiLCJtYXJrIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIml0ZXIiLCJrZXlzIiwib2JqZWN0IiwicmV2ZXJzZSIsInBvcCIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicm9vdEVudHJ5Iiwicm9vdFJlY29yZCIsInJ2YWwiLCJleGNlcHRpb24iLCJoYW5kbGUiLCJsb2MiLCJjYXVnaHQiLCJoYXNDYXRjaCIsImhhc0ZpbmFsbHkiLCJmaW5hbGx5RW50cnkiLCJjb21wbGV0ZSIsImZpbmlzaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJtb2R1bGUiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJhY2NpZGVudGFsU3RyaWN0TW9kZSIsIkZ1bmN0aW9uIiwiU1RSSUNUX01FVEhPRCIsIkhBU19TUEVDSUVTX1NVUFBPUlQiLCJmbG9vciIsIlJhbmdlRXJyb3IiLCJJRUVFNzU0IiwiZ2V0IiwiTkFUSVZFX0FSUkFZX0JVRkZFUiIsIkFSUkFZX0JVRkZFUiIsIkFycmF5QnVmZmVyIiwiYXJyYXlCdWZmZXJNb2R1bGUiLCJOYXRpdmVBcnJheUJ1ZmZlciIsIkFycmF5QnVmZmVyTW9kdWxlIiwiRGF0YVZpZXciLCJGQUlMU19PTl9QUklNSVRJVkVTIiwiVU5TVVBQT1JURURfWSIsInN0aWNreUhlbHBlcnMiLCJleGVjIiwiZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMiLCJyZWdFeHBFeGVjIiwiaXNSZWdFeHAiLCJjYWxsUmVnRXhwRXhlYyIsImZvcmNlZFN0cmluZ1RyaW1NZXRob2QiLCJJbnQ4QXJyYXkiLCJOQU1FIiwiTkFUSVZFX0FSUkFZX0JVRkZFUl9WSUVXUyIsImFUeXBlZEFycmF5Q29uc3RydWN0b3IiLCJBcnJheUJ1ZmZlclZpZXdDb3JlIiwiVFlQRURfQVJSQVlTX0NPTlNUUlVDVE9SU19SRVFVSVJFU19XUkFQUEVSUyIsImNyZWF0ZVR5cGVkQXJyYXlDb25zdHJ1Y3RvciIsImFUeXBlZEFycmF5IiwiZXhwb3J0VHlwZWRBcnJheU1ldGhvZCIsIiRjb3B5V2l0aGluIiwiJGZpbGwiLCIkaW5kZXhPZiIsIlVpbnQ4QXJyYXkiLCJBcnJheUl0ZXJhdG9ycyIsIk5FR0FUSVZFX1pFUk8iLCJGT1JDRUQiLCIkbGFzdEluZGV4T2YiLCIkbWFwIiwiJHNsaWNlIiwiSVNfUFVSRSIsIiRmZXRjaCIsIlVTRV9OQVRJVkVfVVJMIiwiVVJMU2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zTW9kdWxlIiwicG93IiwidG9BU0NJSSIsImFzc2lnbiIsImdsb2JhbFRoaXMiLCJzdXBwb3J0Iiwic2VhcmNoUGFyYW1zIiwiYmxvYiIsIkJsb2IiLCJlIiwiZm9ybURhdGEiLCJhcnJheUJ1ZmZlciIsImlzRGF0YVZpZXciLCJpc1Byb3RvdHlwZU9mIiwidmlld0NsYXNzZXMiLCJpc0FycmF5QnVmZmVyVmlldyIsImlzVmlldyIsImluZGV4T2YiLCJub3JtYWxpemVOYW1lIiwidG9Mb3dlckNhc2UiLCJub3JtYWxpemVWYWx1ZSIsIml0ZXJhdG9yRm9yIiwiaXRlbXMiLCJzaGlmdCIsIkhlYWRlcnMiLCJoZWFkZXJzIiwibWFwIiwiYXBwZW5kIiwiQXJyYXkiLCJpc0FycmF5IiwiaGVhZGVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIm9sZFZhbHVlIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiZW50cmllcyIsImNvbnN1bWVkIiwiYm9keSIsImJvZHlVc2VkIiwiZmlsZVJlYWRlclJlYWR5IiwicmVhZGVyIiwib25sb2FkIiwib25lcnJvciIsInJlYWRCbG9iQXNBcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJwcm9taXNlIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkQmxvYkFzVGV4dCIsInJlYWRBc1RleHQiLCJyZWFkQXJyYXlCdWZmZXJBc1RleHQiLCJidWYiLCJ2aWV3IiwiY2hhcnMiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiYnVmZmVyQ2xvbmUiLCJieXRlTGVuZ3RoIiwiYnVmZmVyIiwiQm9keSIsIl9pbml0Qm9keSIsIl9ib2R5SW5pdCIsIl9ib2R5VGV4dCIsIl9ib2R5QmxvYiIsIkZvcm1EYXRhIiwiX2JvZHlGb3JtRGF0YSIsIl9ib2R5QXJyYXlCdWZmZXIiLCJyZWplY3RlZCIsImlzQ29uc3VtZWQiLCJieXRlT2Zmc2V0IiwidGV4dCIsImRlY29kZSIsImpzb24iLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwibm9ybWFsaXplTWV0aG9kIiwidXBjYXNlZCIsInRvVXBwZXJDYXNlIiwiUmVxdWVzdCIsImlucHV0Iiwib3B0aW9ucyIsInVybCIsImNyZWRlbnRpYWxzIiwibW9kZSIsInNpZ25hbCIsInJlZmVycmVyIiwiY2FjaGUiLCJyZVBhcmFtU2VhcmNoIiwicmVwbGFjZSIsIkRhdGUiLCJnZXRUaW1lIiwiY2xvbmUiLCJmb3JtIiwidHJpbSIsInNwbGl0IiwiYnl0ZXMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYXJzZUhlYWRlcnMiLCJyYXdIZWFkZXJzIiwicHJlUHJvY2Vzc2VkSGVhZGVycyIsInN1YnN0ciIsImxpbmUiLCJwYXJ0cyIsIlJlc3BvbnNlIiwiYm9keUluaXQiLCJzdGF0dXMiLCJvayIsInN0YXR1c1RleHQiLCJyZXNwb25zZSIsInJlZGlyZWN0U3RhdHVzZXMiLCJyZWRpcmVjdCIsImxvY2F0aW9uIiwiRE9NRXhjZXB0aW9uIiwibWVzc2FnZSIsInN0YWNrIiwiZmV0Y2giLCJpbml0IiwiYWJvcnRYaHIiLCJ4aHIiLCJhYm9ydCIsInJlcXVlc3QiLCJhYm9ydGVkIiwiWE1MSHR0cFJlcXVlc3QiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJyZXNwb25zZVVSTCIsInJlc3BvbnNlVGV4dCIsInNldFRpbWVvdXQiLCJvbnRpbWVvdXQiLCJvbmFib3J0Iiwib3BlbiIsImhyZWYiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2VuZCIsInBvbHlmaWxsIiwidGltZW91dFNlY29uZHMiLCJ0aW1lb3V0TWlsbGlzZWNvbmRzIiwidGltZW91dFdhcm5pbmciLCJ1cGRhdGVMb2FkZXJXYXJuaW5nIiwic2hvd0Vycm9yIiwiaWZyYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2FkZXIiLCJlcnJvckVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3RlU3RhdHVzIiwidXBkYXRlVHJvdWJsZXNob290aW5nTWVzc2FnZSIsInRyb3VibGVzaG9vdGluZ0VsZW1lbnQiLCJpbm5lckhUTUwiLCJwcmV2aWV3V2FybmluZ1AiLCJjYW5jZWxCdXR0b24iLCJjYW5jZWxQcmV2aWV3TG9hZGVyIiwiJGluY2x1ZGVzIiwicHJldmlld1N0YXR1c1F1ZXJ5IiwicmVtb3RlU3RhdHVzZXMiLCJmZXRjaFByZXZpZXdTdGF0dXNBbmRVcGRhdGVVSSIsInJlZmV0Y2hDb3VudCIsInJlZmV0Y2hEZWxheSIsImluaXRpYWxTdGF0ZSIsImdyYXBocWxFbmRwb2ludCIsInN0cmluZ2lmeSIsInF1ZXJ5IiwidmFyaWFibGVzIiwicG9zdElkIiwiZGF0YSIsIndwR2F0c2J5IiwiZ2F0c2J5UHJldmlld1N0YXR1cyIsInN0YXR1c1R5cGUiLCJzdGF0dXNDb250ZXh0IiwiaXNTcGVjaWFsU3RhdHVzIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIiwiY2xlYXJUaW1lb3V0Iiwib25QcmV2aWV3UmVhZHlVcGRhdGVVSSIsInJlZmV0Y2hEZWxheU1hcCIsInByZXZpZXdTdGF0dXNDaGVjayIsInByZXZpZXdSZWFkeSIsInBhZ2VOb2RlIiwicGF0aCIsInByZXZpZXdJZnJhbWUiLCJvbklmcmFtZUxvYWRlZEhpZGVMb2FkZXJVSSIsInNyYyIsInByZXZpZXdGcm9udGVuZFVybCIsImV2ZW50IiwiRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZG91YmxlQ2hlY2tJZlByZXZpZXdGcm9udGVuZElzT25saW5lIiwiZmV0Y2hSZXNwb25zZSIsInByZXZpZXdXZWJob29rSXNPbmxpbmUiLCJzdGFydCIsImNhdGNoIiwiYWxsIl0sIm1hcHBpbmdzIjoiOzs7RUFBQSxTQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7RUFDakMsRUFBRSxJQUFJO0VBQ04sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUNwQixHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7RUFDbEIsSUFBSSxPQUFPLElBQUksQ0FBQztFQUNoQixHQUFHO0VBQ0gsQ0FBQzs7RUNORCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO0VBRTNCLGNBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtFQUMvQixFQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEMsQ0FBQzs7RUNERCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0VBR3JCLGlCQUFjLEdBQUcsS0FBSyxDQUFDLFlBQVk7RUFHbkMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FB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SztFQUNMLElBQUksUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLEdBQXVCO0VBQ3hFLE1BQU1BLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztFQUNsRyxLQUFLO0VBQ0wsSUFBSSxTQUFTLEVBQUUsU0FBUyxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUssR0FBdUI7RUFDMUUsTUFBTUEsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0VBQ2xHLEtBQUs7RUFDTCxJQUFJLFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxHQUF1QjtFQUN4RSxNQUFNQSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7RUFDbEcsS0FBSztFQUNMLElBQUksU0FBUyxFQUFFLFNBQVMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLEdBQXVCO0VBQzFFLE1BQU1BLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztFQUNsRyxLQUFLO0VBQ0wsSUFBSSxVQUFVLEVBQUUsU0FBUyxVQUFVLENBQUMsVUFBVSxFQUFFLEtBQUssR0FBdUI7RUFDNUUs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R0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7RUFDekIsVUFBVSxLQUFLLEdBQUcsS0FBSyxDQUFDO0VBQ3hCLFNBQVMsTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7RUFDaEMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDdkMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDdkMsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDakMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztFQUM1QixVQUFVLEtBQUssR0FBRyxRQUFRLENBQUM7RUFDM0IsU0FBUyxNQUFNO0VBQ2YsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDdkMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDL0IsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDdkMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ3pCLFVBQVUsS0FBSyxHQUFHLElBQUksQ0FBQztFQUN2QixVQUFVLFNBQVM7RUFDbkIsU0FBUyxDQUFDLE1BQU07RUFFaEIs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QUFHLENBQUMsUUFBUSxDQUFDO0VBQzlCLEVBQUUsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUM5QixFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7RUFDdEIsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0VBQ3RCLEVBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztFQUN0QixFQUFFLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7RUFDeEIsRUFBRSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzlCLEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztFQUM1QixFQUFFLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtFQUNyQixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUM7RUFDbkIsSUFBSSxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFO0VBQ2xDLE1BQU0sTUFBTSxJQUFJLFFBQVEsSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7RUFDbEUsS0FBSztFQUNMLElBQUksTUFBTSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNsQyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztFQUM1QyxHQUFHLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUM7RUFDOUMsRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNyRixFQUFFLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxN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
