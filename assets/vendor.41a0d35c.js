function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        this.on();
        return fn();
      } finally {
        this.off();
      }
    }
  }
  on() {
    if (this.active) {
      effectScopeStack.push(this);
      activeEffectScope = this;
    }
  }
  off() {
    if (this.active) {
      effectScopeStack.pop();
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.effects.forEach((e) => e.stop());
      this.cleanups.forEach((cleanup) => cleanup());
      if (this.scopes) {
        this.scopes.forEach((e) => e.stop(true));
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray$1(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow && !isReadonly(value)) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (target && target["__v_isReadonly"]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref) {
  if (isTracking()) {
    ref = toRaw(ref);
    if (!ref.dep) {
      ref.dep = createDep();
    }
    {
      trackEffects(ref.dep);
    }
  }
}
function triggerRefValue(ref, newVal) {
  ref = toRaw(ref);
  if (ref.dep) {
    {
      triggerEffects(ref.dep);
    }
  }
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2) {
    this._setter = _setter;
    this.dep = void 0;
    this._dirty = true;
    this.__v_isRef = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
  return cRef;
}
Promise.resolve();
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      const child = children[0];
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        hook(el, done);
        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done);
        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } else if (keepComment || child.type !== Comment) {
      ret.push(child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key)) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        effect.allowRecurse = false;
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        effect.allowRecurse = true;
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        effect.allowRecurse = false;
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        effect.allowRecurse = true;
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update = instance.update = effect.run.bind(effect);
    update.id = instance.uid;
    effect.allowRecurse = update.allowRecurse = true;
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isString$1(ref)) {
    const doSet = () => {
      {
        refs[ref] = value;
      }
      if (hasOwn(setupState, ref)) {
        setupState[ref] = value;
      }
    };
    if (value) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isRef(ref)) {
    const doSet = () => {
      ref.value = value;
    };
    if (value) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isFunction$1(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else
    ;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const NULL_DYNAMIC_COMPONENT = Symbol();
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref }) => {
  return ref != null ? isString$1(ref) || isRef(ref) || isFunction$1(ref) ? { i: currentRenderingInstance, r: ref } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray$1(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray$1(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = !!source._shallow;
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction$1(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onInvalidate = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onInvalidate = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onInvalidate
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onInvalidate
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const version = "3.2.23";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const staticTemplateCache = new Map();
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    let template = staticTemplateCache.get(content);
    if (!template) {
      const t = doc.createElement("template");
      t.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      template = t.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      staticTemplateCache.set(content, template);
    }
    parent.insertBefore(template.cloneNode(true), anchor);
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      el[key] = includeBooleanAttr(value);
      return;
    } else if (value == null && type === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type === "number") {
      try {
        el[key] = 0;
      } catch (_a) {
      }
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
/* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const rendererOptions = extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount: mount2 } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount2(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
/*!
 * Glide.js v3.5.2
 * (c) 2013-2021 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
    o2.__proto__ = p3;
    return o2;
  };
  return _setPrototypeOf(o, p2);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
var defaults = {
  type: "slider",
  startAt: 0,
  perView: 1,
  focusAt: 0,
  gap: 10,
  autoplay: false,
  hoverpause: true,
  keyboard: true,
  bound: false,
  swipeThreshold: 80,
  dragThreshold: 120,
  perSwipe: "",
  touchRatio: 0.5,
  touchAngle: 45,
  animationDuration: 400,
  rewind: true,
  rewindDuration: 800,
  animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
  waitForTransition: true,
  throttle: 10,
  direction: "ltr",
  peek: 0,
  cloningRatio: 1,
  breakpoints: {},
  classes: {
    swipeable: "glide--swipeable",
    dragging: "glide--dragging",
    direction: {
      ltr: "glide--ltr",
      rtl: "glide--rtl"
    },
    type: {
      slider: "glide--slider",
      carousel: "glide--carousel"
    },
    slide: {
      clone: "glide__slide--clone",
      active: "glide__slide--active"
    },
    arrow: {
      disabled: "glide__arrow--disabled"
    },
    nav: {
      active: "glide__bullet--active"
    }
  }
};
function warn(msg) {
  console.error("[Glide warn]: ".concat(msg));
}
function toInt(value) {
  return parseInt(value);
}
function toFloat(value) {
  return parseFloat(value);
}
function isString(value) {
  return typeof value === "string";
}
function isObject(value) {
  var type = _typeof(value);
  return type === "function" || type === "object" && !!value;
}
function isFunction(value) {
  return typeof value === "function";
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isArray(value) {
  return value.constructor === Array;
}
function mount(glide, extensions, events) {
  var components = {};
  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn("Extension must be a function");
    }
  }
  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }
  return components;
}
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}
function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function(r, k) {
    r[k] = obj[k];
    return r[k], r;
  }, {});
}
function mergeOptions(defaults2, settings) {
  var options = Object.assign({}, defaults2, settings);
  if (settings.hasOwnProperty("classes")) {
    options.classes = Object.assign({}, defaults2.classes, settings.classes);
    if (settings.classes.hasOwnProperty("direction")) {
      options.classes.direction = Object.assign({}, defaults2.classes.direction, settings.classes.direction);
    }
    if (settings.classes.hasOwnProperty("type")) {
      options.classes.type = Object.assign({}, defaults2.classes.type, settings.classes.type);
    }
    if (settings.classes.hasOwnProperty("slide")) {
      options.classes.slide = Object.assign({}, defaults2.classes.slide, settings.classes.slide);
    }
    if (settings.classes.hasOwnProperty("arrow")) {
      options.classes.arrow = Object.assign({}, defaults2.classes.arrow, settings.classes.arrow);
    }
    if (settings.classes.hasOwnProperty("nav")) {
      options.classes.nav = Object.assign({}, defaults2.classes.nav, settings.classes.nav);
    }
  }
  if (settings.hasOwnProperty("breakpoints")) {
    options.breakpoints = Object.assign({}, defaults2.breakpoints, settings.breakpoints);
  }
  return options;
}
var EventsBus = /* @__PURE__ */ function() {
  function EventsBus2() {
    var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, EventsBus2);
    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  _createClass(EventsBus2, [{
    key: "on",
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }
        return;
      }
      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      }
      var index = this.events[event].push(handler) - 1;
      return {
        remove: function remove2() {
          delete this.events[event][index];
        }
      };
    }
  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }
        return;
      }
      if (!this.hop.call(this.events, event)) {
        return;
      }
      this.events[event].forEach(function(item) {
        item(context || {});
      });
    }
  }]);
  return EventsBus2;
}();
var Glide$1 = /* @__PURE__ */ function() {
  function Glide2(selector) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Glide2);
    this._c = {};
    this._t = [];
    this._e = new EventsBus();
    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }
  _createClass(Glide2, [{
    key: "mount",
    value: function mount$1() {
      var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      this._e.emit("mount.before");
      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn("You need to provide a object on `mount()`");
      }
      this._e.emit("mount.after");
      return this;
    }
  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn("You need to provide a array on `mutate()`");
      }
      return this;
    }
  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);
      if (settings.hasOwnProperty("startAt")) {
        this.index = settings.startAt;
      }
      this._e.emit("update");
      return this;
    }
  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);
      return this;
    }
  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();
      this._c.Move.make(distance);
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit("destroy");
      return this;
    }
  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (interval) {
        this.settings.autoplay = interval;
      }
      this._e.emit("play");
      return this;
    }
  }, {
    key: "pause",
    value: function pause() {
      this._e.emit("pause");
      return this;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;
      return this;
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);
      return this;
    }
  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }
  }, {
    key: "settings",
    get: function get2() {
      return this._o;
    },
    set: function set2(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn("Options must be an `object` instance.");
      }
    }
  }, {
    key: "index",
    get: function get2() {
      return this._i;
    },
    set: function set2(i) {
      this._i = toInt(i);
    }
  }, {
    key: "type",
    get: function get2() {
      return this.settings.type;
    }
  }, {
    key: "disabled",
    get: function get2() {
      return this._d;
    },
    set: function set2(status) {
      this._d = !!status;
    }
  }]);
  return Glide2;
}();
function Run(Glide2, Components, Events) {
  var Run2 = {
    mount: function mount2() {
      this._o = false;
    },
    make: function make(move) {
      var _this = this;
      if (!Glide2.disabled) {
        !Glide2.settings.waitForTransition || Glide2.disable();
        this.move = move;
        Events.emit("run.before", this.move);
        this.calculate();
        Events.emit("run", this.move);
        Components.Transition.after(function() {
          if (_this.isStart()) {
            Events.emit("run.start", _this.move);
          }
          if (_this.isEnd()) {
            Events.emit("run.end", _this.move);
          }
          if (_this.isOffset()) {
            _this._o = false;
            Events.emit("run.offset", _this.move);
          }
          Events.emit("run.after", _this.move);
          Glide2.enable();
        });
      }
    },
    calculate: function calculate() {
      var move = this.move, length = this.length;
      var steps = move.steps, direction = move.direction;
      var viewSize = 1;
      if (direction === "=") {
        if (Glide2.settings.bound && toInt(steps) > length) {
          Glide2.index = length;
          return;
        }
        Glide2.index = steps;
        return;
      }
      if (direction === ">" && steps === ">") {
        Glide2.index = length;
        return;
      }
      if (direction === "<" && steps === "<") {
        Glide2.index = 0;
        return;
      }
      if (direction === "|") {
        viewSize = Glide2.settings.perView || 1;
      }
      if (direction === ">" || direction === "|" && steps === ">") {
        var index = calculateForwardIndex(viewSize);
        if (index > length) {
          this._o = true;
        }
        Glide2.index = normalizeForwardIndex(index, viewSize);
        return;
      }
      if (direction === "<" || direction === "|" && steps === "<") {
        var _index = calculateBackwardIndex(viewSize);
        if (_index < 0) {
          this._o = true;
        }
        Glide2.index = normalizeBackwardIndex(_index, viewSize);
        return;
      }
      warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
    },
    isStart: function isStart() {
      return Glide2.index <= 0;
    },
    isEnd: function isEnd() {
      return Glide2.index >= this.length;
    },
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      if (!direction) {
        return this._o;
      }
      if (!this._o) {
        return false;
      }
      if (direction === "|>") {
        return this.move.direction === "|" && this.move.steps === ">";
      }
      if (direction === "|<") {
        return this.move.direction === "|" && this.move.steps === "<";
      }
      return this.move.direction === direction;
    },
    isBound: function isBound() {
      return Glide2.isType("slider") && Glide2.settings.focusAt !== "center" && Glide2.settings.bound;
    }
  };
  function calculateForwardIndex(viewSize) {
    var index = Glide2.index;
    if (Glide2.isType("carousel")) {
      return index + viewSize;
    }
    return index + (viewSize - index % viewSize);
  }
  function normalizeForwardIndex(index, viewSize) {
    var length = Run2.length;
    if (index <= length) {
      return index;
    }
    if (Glide2.isType("carousel")) {
      return index - (length + 1);
    }
    if (Glide2.settings.rewind) {
      if (Run2.isBound() && !Run2.isEnd()) {
        return length;
      }
      return 0;
    }
    if (Run2.isBound()) {
      return length;
    }
    return Math.floor(length / viewSize) * viewSize;
  }
  function calculateBackwardIndex(viewSize) {
    var index = Glide2.index;
    if (Glide2.isType("carousel")) {
      return index - viewSize;
    }
    var view = Math.ceil(index / viewSize);
    return (view - 1) * viewSize;
  }
  function normalizeBackwardIndex(index, viewSize) {
    var length = Run2.length;
    if (index >= 0) {
      return index;
    }
    if (Glide2.isType("carousel")) {
      return index + (length + 1);
    }
    if (Glide2.settings.rewind) {
      if (Run2.isBound() && Run2.isStart()) {
        return length;
      }
      return Math.floor(length / viewSize) * viewSize;
    }
    return 0;
  }
  define(Run2, "move", {
    get: function get2() {
      return this._m;
    },
    set: function set2(value) {
      var step = value.substr(1);
      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });
  define(Run2, "length", {
    get: function get2() {
      var settings = Glide2.settings;
      var length = Components.Html.slides.length;
      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }
      return length - 1;
    }
  });
  define(Run2, "offset", {
    get: function get2() {
      return this._o;
    }
  });
  return Run2;
}
function now() {
  return new Date().getTime();
}
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options)
    options = {};
  var later = function later2() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout)
      context = args = null;
  };
  var throttled = function throttled2() {
    var at = now();
    if (!previous && options.leading === false)
      previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = at;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}
var MARGIN_TYPE = {
  ltr: ["marginLeft", "marginRight"],
  rtl: ["marginRight", "marginLeft"]
};
function Gaps(Glide2, Components, Events) {
  var Gaps2 = {
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;
        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][0]] = "";
        }
        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][1]] = "";
        }
      }
    },
    remove: function remove2(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        style.marginLeft = "";
        style.marginRight = "";
      }
    }
  };
  define(Gaps2, "value", {
    get: function get2() {
      return toInt(Glide2.settings.gap);
    }
  });
  define(Gaps2, "grow", {
    get: function get2() {
      return Gaps2.value * Components.Sizes.length;
    }
  });
  define(Gaps2, "reductor", {
    get: function get2() {
      var perView = Glide2.settings.perView;
      return Gaps2.value * (perView - 1) / perView;
    }
  });
  Events.on(["build.after", "update"], throttle(function() {
    Gaps2.apply(Components.Html.wrapper.children);
  }, 30));
  Events.on("destroy", function() {
    Gaps2.remove(Components.Html.wrapper.children);
  });
  return Gaps2;
}
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }
    return matched;
  }
  return [];
}
function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }
  return false;
}
var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html(Glide2, Components, Events) {
  var Html2 = {
    mount: function mount2() {
      this.root = Glide2.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.collectSlides();
    },
    collectSlides: function collectSlides() {
      this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function(slide) {
        return !slide.classList.contains(Glide2.settings.classes.slide.clone);
      });
    }
  };
  define(Html2, "root", {
    get: function get2() {
      return Html2._r;
    },
    set: function set2(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }
      if (exist(r)) {
        Html2._r = r;
      } else {
        warn("Root element must be a existing Html node");
      }
    }
  });
  define(Html2, "track", {
    get: function get2() {
      return Html2._t;
    },
    set: function set2(t) {
      if (exist(t)) {
        Html2._t = t;
      } else {
        warn("Could not find track element. Please use ".concat(TRACK_SELECTOR, " attribute."));
      }
    }
  });
  define(Html2, "wrapper", {
    get: function get2() {
      return Html2.track.children[0];
    }
  });
  Events.on("update", function() {
    Html2.collectSlides();
  });
  return Html2;
}
function Peek(Glide2, Components, Events) {
  var Peek2 = {
    mount: function mount2() {
      this.value = Glide2.settings.peek;
    }
  };
  define(Peek2, "value", {
    get: function get2() {
      return Peek2._v;
    },
    set: function set2(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }
      Peek2._v = value;
    }
  });
  define(Peek2, "reductor", {
    get: function get2() {
      var value = Peek2.value;
      var perView = Glide2.settings.perView;
      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }
      return value * 2 / perView;
    }
  });
  Events.on(["resize", "update"], function() {
    Peek2.mount();
  });
  return Peek2;
}
function Move(Glide2, Components, Events) {
  var Move2 = {
    mount: function mount2() {
      this._o = 0;
    },
    make: function make() {
      var _this = this;
      var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      this.offset = offset;
      Events.emit("move", {
        movement: this.value
      });
      Components.Transition.after(function() {
        Events.emit("move.after", {
          movement: _this.value
        });
      });
    }
  };
  define(Move2, "offset", {
    get: function get2() {
      return Move2._o;
    },
    set: function set2(value) {
      Move2._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });
  define(Move2, "translate", {
    get: function get2() {
      return Components.Sizes.slideWidth * Glide2.index;
    }
  });
  define(Move2, "value", {
    get: function get2() {
      var offset = this.offset;
      var translate = this.translate;
      if (Components.Direction.is("rtl")) {
        return translate + offset;
      }
      return translate - offset;
    }
  });
  Events.on(["build.before", "run"], function() {
    Move2.make();
  });
  return Move2;
}
function Sizes(Glide2, Components, Events) {
  var Sizes2 = {
    setupSlides: function setupSlides() {
      var width = "".concat(this.slideWidth, "px");
      var slides = Components.Html.slides;
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },
    remove: function remove2() {
      var slides = Components.Html.slides;
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = "";
      }
      Components.Html.wrapper.style.width = "";
    }
  };
  define(Sizes2, "length", {
    get: function get2() {
      return Components.Html.slides.length;
    }
  });
  define(Sizes2, "width", {
    get: function get2() {
      return Components.Html.track.offsetWidth;
    }
  });
  define(Sizes2, "wrapperSize", {
    get: function get2() {
      return Sizes2.slideWidth * Sizes2.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });
  define(Sizes2, "slideWidth", {
    get: function get2() {
      return Sizes2.width / Glide2.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });
  Events.on(["build.before", "resize", "update"], function() {
    Sizes2.setupSlides();
    Sizes2.setupWrapper();
  });
  Events.on("destroy", function() {
    Sizes2.remove();
  });
  return Sizes2;
}
function Build(Glide2, Components, Events) {
  var Build2 = {
    mount: function mount2() {
      Events.emit("build.before");
      this.typeClass();
      this.activeClass();
      Events.emit("build.after");
    },
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide2.settings.classes.type[Glide2.settings.type]);
    },
    activeClass: function activeClass() {
      var classes = Glide2.settings.classes;
      var slide = Components.Html.slides[Glide2.index];
      if (slide) {
        slide.classList.add(classes.slide.active);
        siblings(slide).forEach(function(sibling) {
          sibling.classList.remove(classes.slide.active);
        });
      }
    },
    removeClasses: function removeClasses() {
      var _Glide$settings$class = Glide2.settings.classes, type = _Glide$settings$class.type, slide = _Glide$settings$class.slide;
      Components.Html.root.classList.remove(type[Glide2.settings.type]);
      Components.Html.slides.forEach(function(sibling) {
        sibling.classList.remove(slide.active);
      });
    }
  };
  Events.on(["destroy", "update"], function() {
    Build2.removeClasses();
  });
  Events.on(["resize", "update"], function() {
    Build2.mount();
  });
  Events.on("move.after", function() {
    Build2.activeClass();
  });
  return Build2;
}
function Clones(Glide2, Components, Events) {
  var Clones2 = {
    mount: function mount2() {
      this.items = [];
      if (Glide2.isType("carousel")) {
        this.items = this.collect();
      }
    },
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide2.settings, perView = _Glide$settings.perView, classes = _Glide$settings.classes, cloningRatio = _Glide$settings.cloningRatio;
      if (slides.length !== 0) {
        var peekIncrementer = +!!Glide2.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);
        for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);
            clone.classList.add(classes.slide.clone);
            items.push(clone);
          }
          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);
            _clone.classList.add(classes.slide.clone);
            items.unshift(_clone);
          }
        }
      }
      return items;
    },
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html, wrapper = _Components$Html.wrapper, slides = _Components$Html.slides;
      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append2 = items.slice(half * -1).reverse();
      var width = "".concat(Components.Sizes.slideWidth, "px");
      for (var i = 0; i < append2.length; i++) {
        wrapper.appendChild(append2[i]);
      }
      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }
      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },
    remove: function remove2() {
      var items = this.items;
      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };
  define(Clones2, "grow", {
    get: function get2() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones2.items.length;
    }
  });
  Events.on("update", function() {
    Clones2.remove();
    Clones2.mount();
    Clones2.append();
  });
  Events.on("build.before", function() {
    if (Glide2.isType("carousel")) {
      Clones2.append();
    }
  });
  Events.on("destroy", function() {
    Clones2.remove();
  });
  return Clones2;
}
var EventsBinder = /* @__PURE__ */ function() {
  function EventsBinder2() {
    var listeners = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, EventsBinder2);
    this.listeners = listeners;
  }
  _createClass(EventsBinder2, [{
    key: "on",
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (isString(events)) {
        events = [events];
      }
      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (isString(events)) {
        events = [events];
      }
      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);
  return EventsBinder2;
}();
function Resize(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Resize2 = {
    mount: function mount2() {
      this.bind();
    },
    bind: function bind() {
      Binder.on("resize", window, throttle(function() {
        Events.emit("resize");
      }, Glide2.settings.throttle));
    },
    unbind: function unbind() {
      Binder.off("resize", window);
    }
  };
  Events.on("destroy", function() {
    Resize2.unbind();
    Binder.destroy();
  });
  return Resize2;
}
var VALID_DIRECTIONS = ["ltr", "rtl"];
var FLIPED_MOVEMENTS = {
  ">": "<",
  "<": ">",
  "=": "="
};
function Direction(Glide2, Components, Events) {
  var Direction2 = {
    mount: function mount2() {
      this.value = Glide2.settings.direction;
    },
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);
      if (this.is("rtl")) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }
      return pattern;
    },
    is: function is(direction) {
      return this.value === direction;
    },
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide2.settings.classes.direction[this.value]);
    },
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide2.settings.classes.direction[this.value]);
    }
  };
  define(Direction2, "value", {
    get: function get2() {
      return Direction2._v;
    },
    set: function set2(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction2._v = value;
      } else {
        warn("Direction value must be `ltr` or `rtl`");
      }
    }
  });
  Events.on(["destroy", "update"], function() {
    Direction2.removeClass();
  });
  Events.on("update", function() {
    Direction2.mount();
  });
  Events.on(["build.before", "update"], function() {
    Direction2.addClass();
  });
  return Direction2;
}
function Rtl(Glide2, Components) {
  return {
    modify: function modify(translate) {
      if (Components.Direction.is("rtl")) {
        return -translate;
      }
      return translate;
    }
  };
}
function Gap(Glide2, Components) {
  return {
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}
function Grow(Glide2, Components) {
  return {
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}
function Peeking(Glide2, Components) {
  return {
    modify: function modify(translate) {
      if (Glide2.settings.focusAt >= 0) {
        var peek = Components.Peek.value;
        if (isObject(peek)) {
          return translate - peek.before;
        }
        return translate - peek;
      }
      return translate;
    }
  };
}
function Focusing(Glide2, Components) {
  return {
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide2.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;
      if (focusAt === "center") {
        return translate - (width / 2 - slideWidth / 2);
      }
      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}
function mutator(Glide2, Components, Events) {
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide2._t, [Rtl]);
  return {
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];
        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide2, Components, Events).modify(translate);
        } else {
          warn("Transformer should be a function that returns an object with `modify()` method");
        }
      }
      return translate;
    }
  };
}
function Translate(Glide2, Components, Events) {
  var Translate2 = {
    set: function set2(value) {
      var transform = mutator(Glide2, Components).mutate(value);
      var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
      Components.Html.wrapper.style.mozTransform = translate3d;
      Components.Html.wrapper.style.webkitTransform = translate3d;
      Components.Html.wrapper.style.transform = translate3d;
    },
    remove: function remove2() {
      Components.Html.wrapper.style.transform = "";
    },
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide2.index;
      var perView = Glide2.settings.perView;
      if (Components.Run.isOffset(">") || Components.Run.isOffset("|>")) {
        return length + (index - perView);
      }
      return (index + perView) % length;
    },
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide2.settings.perView;
      if (Components.Run.isOffset(">") || Components.Run.isOffset("|>")) {
        return travelDistance * -1;
      }
      return travelDistance;
    }
  };
  Events.on("move", function(context) {
    if (!Glide2.isType("carousel") || !Components.Run.isOffset()) {
      return Translate2.set(context.movement);
    }
    Components.Transition.after(function() {
      Events.emit("translate.jump");
      Translate2.set(Components.Sizes.slideWidth * Glide2.index);
    });
    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate2.set(startWidth - Components.Translate.getTravelDistance());
  });
  Events.on("destroy", function() {
    Translate2.remove();
  });
  return Translate2;
}
function Transition(Glide2, Components, Events) {
  var disabled = false;
  var Transition2 = {
    compose: function compose(property) {
      var settings = Glide2.settings;
      if (!disabled) {
        return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
      }
      return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
    },
    set: function set2() {
      var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      Components.Html.wrapper.style.transition = this.compose(property);
    },
    remove: function remove2() {
      Components.Html.wrapper.style.transition = "";
    },
    after: function after(callback) {
      setTimeout(function() {
        callback();
      }, this.duration);
    },
    enable: function enable() {
      disabled = false;
      this.set();
    },
    disable: function disable() {
      disabled = true;
      this.set();
    }
  };
  define(Transition2, "duration", {
    get: function get2() {
      var settings = Glide2.settings;
      if (Glide2.isType("slider") && Components.Run.offset) {
        return settings.rewindDuration;
      }
      return settings.animationDuration;
    }
  });
  Events.on("move", function() {
    Transition2.set();
  });
  Events.on(["build.before", "resize", "translate.jump"], function() {
    Transition2.disable();
  });
  Events.on("run", function() {
    Transition2.enable();
  });
  Events.on("destroy", function() {
    Transition2.remove();
  });
  return Transition2;
}
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function get2() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {
}
var supportsPassive$1 = supportsPassive;
var START_EVENTS = ["touchstart", "mousedown"];
var MOVE_EVENTS = ["touchmove", "mousemove"];
var END_EVENTS = ["touchend", "touchcancel", "mouseup", "mouseleave"];
var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseup", "mouseleave"];
function Swipe(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Swipe2 = {
    mount: function mount2() {
      this.bindSwipeStart();
    },
    start: function start(event) {
      if (!disabled && !Glide2.disabled) {
        this.disable();
        var swipe = this.touches(event);
        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);
        this.bindSwipeMove();
        this.bindSwipeEnd();
        Events.emit("swipe.start");
      }
    },
    move: function move(event) {
      if (!Glide2.disabled) {
        var _Glide$settings = Glide2.settings, touchAngle = _Glide$settings.touchAngle, touchRatio = _Glide$settings.touchRatio, classes = _Glide$settings.classes;
        var swipe = this.touches(event);
        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);
        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();
          Components.Move.make(subExSx * toFloat(touchRatio));
          Components.Html.root.classList.add(classes.dragging);
          Events.emit("swipe.move");
        } else {
          return false;
        }
      }
    },
    end: function end(event) {
      if (!Glide2.disabled) {
        var _Glide$settings2 = Glide2.settings, perSwipe = _Glide$settings2.perSwipe, touchAngle = _Glide$settings2.touchAngle, classes = _Glide$settings2.classes;
        var swipe = this.touches(event);
        var threshold = this.threshold(event);
        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        this.enable();
        if (swipeDistance > threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
        } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
        } else {
          Components.Move.make();
        }
        Components.Html.root.classList.remove(classes.dragging);
        this.unbindSwipeMove();
        this.unbindSwipeEnd();
        Events.emit("swipe.end");
      }
    },
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;
      var _Glide$settings3 = Glide2.settings, swipeThreshold = _Glide$settings3.swipeThreshold, dragThreshold = _Glide$settings3.dragThreshold;
      if (swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function(event) {
          _this.start(event);
        }, capture);
      }
      if (dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function(event) {
          _this.start(event);
        }, capture);
      }
    },
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;
      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function(event) {
        _this2.move(event);
      }, Glide2.settings.throttle), capture);
    },
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;
      Binder.on(END_EVENTS, Components.Html.wrapper, function(event) {
        _this3.end(event);
      });
    },
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }
      return event.touches[0] || event.changedTouches[0];
    },
    threshold: function threshold(event) {
      var settings = Glide2.settings;
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }
      return settings.swipeThreshold;
    },
    enable: function enable() {
      disabled = false;
      Components.Transition.enable();
      return this;
    },
    disable: function disable() {
      disabled = true;
      Components.Transition.disable();
      return this;
    }
  };
  Events.on("build.after", function() {
    Components.Html.root.classList.add(Glide2.settings.classes.swipeable);
  });
  Events.on("destroy", function() {
    Swipe2.unbindSwipeStart();
    Swipe2.unbindSwipeMove();
    Swipe2.unbindSwipeEnd();
    Binder.destroy();
  });
  return Swipe2;
}
function Images(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Images2 = {
    mount: function mount2() {
      this.bind();
    },
    bind: function bind() {
      Binder.on("dragstart", Components.Html.wrapper, this.dragstart);
    },
    unbind: function unbind() {
      Binder.off("dragstart", Components.Html.wrapper);
    },
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
  Events.on("destroy", function() {
    Images2.unbind();
    Binder.destroy();
  });
  return Images2;
}
function Anchors(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var detached = false;
  var prevented = false;
  var Anchors2 = {
    mount: function mount2() {
      this._a = Components.Html.wrapper.querySelectorAll("a");
      this.bind();
    },
    bind: function bind() {
      Binder.on("click", Components.Html.wrapper, this.click);
    },
    unbind: function unbind() {
      Binder.off("click", Components.Html.wrapper);
    },
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    detach: function detach() {
      prevented = true;
      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;
        }
        detached = true;
      }
      return this;
    },
    attach: function attach() {
      prevented = false;
      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;
        }
        detached = false;
      }
      return this;
    }
  };
  define(Anchors2, "items", {
    get: function get2() {
      return Anchors2._a;
    }
  });
  Events.on("swipe.move", function() {
    Anchors2.detach();
  });
  Events.on("swipe.end", function() {
    Components.Transition.after(function() {
      Anchors2.attach();
    });
  });
  Events.on("destroy", function() {
    Anchors2.attach();
    Anchors2.unbind();
    Binder.destroy();
  });
  return Anchors2;
}
var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*="<"]');
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*=">"]');
function Controls(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Controls2 = {
    mount: function mount2() {
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      };
      this.addBindings();
    },
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },
    addClass: function addClass(controls) {
      var settings = Glide2.settings;
      var item = controls[Glide2.index];
      if (!item) {
        return;
      }
      if (item) {
        item.classList.add(settings.classes.nav.active);
        siblings(item).forEach(function(sibling) {
          sibling.classList.remove(settings.classes.nav.active);
        });
      }
    },
    removeClass: function removeClass(controls) {
      var item = controls[Glide2.index];
      if (item) {
        item.classList.remove(Glide2.settings.classes.nav.active);
      }
    },
    setArrowState: function setArrowState() {
      if (Glide2.settings.rewind) {
        return;
      }
      var next = Controls2._arrowControls.next;
      var previous = Controls2._arrowControls.previous;
      this.resetArrowState(next, previous);
      if (Glide2.index === 0) {
        this.disableArrow(previous);
      }
      if (Glide2.index === Components.Run.length) {
        this.disableArrow(next);
      }
    },
    resetArrowState: function resetArrowState() {
      var settings = Glide2.settings;
      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }
      lists.forEach(function(list) {
        list.forEach(function(element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    },
    disableArrow: function disableArrow() {
      var settings = Glide2.settings;
      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }
      lists.forEach(function(list) {
        list.forEach(function(element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    },
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on("click", elements[i], this.click);
        Binder.on("touchstart", elements[i], this.click, capture);
      }
    },
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(["click", "touchstart"], elements[i]);
      }
    },
    click: function click(event) {
      if (!supportsPassive$1 && event.type === "touchstart") {
        event.preventDefault();
      }
      var direction = event.currentTarget.getAttribute("data-glide-dir");
      Components.Run.make(Components.Direction.resolve(direction));
    }
  };
  define(Controls2, "items", {
    get: function get2() {
      return Controls2._c;
    }
  });
  Events.on(["mount.after", "move.after"], function() {
    Controls2.setActive();
  });
  Events.on(["mount.after", "run"], function() {
    Controls2.setArrowState();
  });
  Events.on("destroy", function() {
    Controls2.removeBindings();
    Controls2.removeActive();
    Binder.destroy();
  });
  return Controls2;
}
function Keyboard(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Keyboard2 = {
    mount: function mount2() {
      if (Glide2.settings.keyboard) {
        this.bind();
      }
    },
    bind: function bind() {
      Binder.on("keyup", document, this.press);
    },
    unbind: function unbind() {
      Binder.off("keyup", document);
    },
    press: function press(event) {
      var perSwipe = Glide2.settings.perSwipe;
      if (event.keyCode === 39) {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
      }
      if (event.keyCode === 37) {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
      }
    }
  };
  Events.on(["destroy", "update"], function() {
    Keyboard2.unbind();
  });
  Events.on("update", function() {
    Keyboard2.mount();
  });
  Events.on("destroy", function() {
    Binder.destroy();
  });
  return Keyboard2;
}
function Autoplay(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Autoplay2 = {
    mount: function mount2() {
      this.enable();
      this.start();
      if (Glide2.settings.hoverpause) {
        this.bind();
      }
    },
    enable: function enable() {
      this._e = true;
    },
    disable: function disable() {
      this._e = false;
    },
    start: function start() {
      var _this = this;
      if (!this._e) {
        return;
      }
      this.enable();
      if (Glide2.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function() {
            _this.stop();
            Components.Run.make(">");
            _this.start();
            Events.emit("autoplay");
          }, this.time);
        }
      }
    },
    stop: function stop() {
      this._i = clearInterval(this._i);
    },
    bind: function bind() {
      var _this2 = this;
      Binder.on("mouseover", Components.Html.root, function() {
        if (_this2._e) {
          _this2.stop();
        }
      });
      Binder.on("mouseout", Components.Html.root, function() {
        if (_this2._e) {
          _this2.start();
        }
      });
    },
    unbind: function unbind() {
      Binder.off(["mouseover", "mouseout"], Components.Html.root);
    }
  };
  define(Autoplay2, "time", {
    get: function get2() {
      var autoplay = Components.Html.slides[Glide2.index].getAttribute("data-glide-autoplay");
      if (autoplay) {
        return toInt(autoplay);
      }
      return toInt(Glide2.settings.autoplay);
    }
  });
  Events.on(["destroy", "update"], function() {
    Autoplay2.unbind();
  });
  Events.on(["run.before", "swipe.start", "update"], function() {
    Autoplay2.stop();
  });
  Events.on(["pause", "destroy"], function() {
    Autoplay2.disable();
    Autoplay2.stop();
  });
  Events.on(["run.after", "swipe.end"], function() {
    Autoplay2.start();
  });
  Events.on(["play"], function() {
    Autoplay2.enable();
    Autoplay2.start();
  });
  Events.on("update", function() {
    Autoplay2.mount();
  });
  Events.on("destroy", function() {
    Binder.destroy();
  });
  return Autoplay2;
}
function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn("Breakpoints option must be an object");
  }
  return {};
}
function Breakpoints(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var settings = Glide2.settings;
  var points = sortBreakpoints(settings.breakpoints);
  var defaults2 = Object.assign({}, settings);
  var Breakpoints2 = {
    match: function match(points2) {
      if (typeof window.matchMedia !== "undefined") {
        for (var point in points2) {
          if (points2.hasOwnProperty(point)) {
            if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
              return points2[point];
            }
          }
        }
      }
      return defaults2;
    }
  };
  Object.assign(settings, Breakpoints2.match(points));
  Binder.on("resize", window, throttle(function() {
    Glide2.settings = mergeOptions(settings, Breakpoints2.match(points));
  }, Glide2.settings.throttle));
  Events.on("update", function() {
    points = sortBreakpoints(points);
    defaults2 = Object.assign({}, settings);
  });
  Events.on("destroy", function() {
    Binder.off("resize", window);
  });
  return Breakpoints2;
}
var COMPONENTS = {
  Html,
  Translate,
  Transition,
  Direction,
  Peek,
  Sizes,
  Gaps,
  Move,
  Clones,
  Resize,
  Build,
  Run,
  Swipe,
  Images,
  Anchors,
  Controls,
  Keyboard,
  Autoplay,
  Breakpoints
};
var Glide = /* @__PURE__ */ function(_Core) {
  _inherits(Glide2, _Core);
  var _super = _createSuper(Glide2);
  function Glide2() {
    _classCallCheck(this, Glide2);
    return _super.apply(this, arguments);
  }
  _createClass(Glide2, [{
    key: "mount",
    value: function mount2() {
      var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _get(_getPrototypeOf(Glide2.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
    }
  }]);
  return Glide2;
}(Glide$1);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var glightbox_min = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    function e(t2) {
      return (e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e2) {
        return typeof e2;
      } : function(e2) {
        return e2 && typeof Symbol == "function" && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
      })(t2);
    }
    function t(e2, t2) {
      if (!(e2 instanceof t2))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(e2, t2) {
      for (var i2 = 0; i2 < t2.length; i2++) {
        var n2 = t2[i2];
        n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
      }
    }
    function n(e2, t2, n2) {
      return t2 && i(e2.prototype, t2), n2 && i(e2, n2), e2;
    }
    var s = Date.now();
    function l() {
      var e2 = {}, t2 = true, i2 = 0, n2 = arguments.length;
      Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (t2 = arguments[0], i2++);
      for (var s2 = function(i3) {
        for (var n3 in i3)
          Object.prototype.hasOwnProperty.call(i3, n3) && (t2 && Object.prototype.toString.call(i3[n3]) === "[object Object]" ? e2[n3] = l(true, e2[n3], i3[n3]) : e2[n3] = i3[n3]);
      }; i2 < n2; i2++) {
        var o2 = arguments[i2];
        s2(o2);
      }
      return e2;
    }
    function o(e2, t2) {
      if ((k(e2) || e2 === window || e2 === document) && (e2 = [e2]), A(e2) || L(e2) || (e2 = [e2]), P(e2) != 0) {
        if (A(e2) && !L(e2))
          for (var i2 = e2.length, n2 = 0; n2 < i2 && t2.call(e2[n2], e2[n2], n2, e2) !== false; n2++)
            ;
        else if (L(e2)) {
          for (var s2 in e2)
            if (O(e2, s2) && t2.call(e2[s2], e2[s2], s2, e2) === false)
              break;
        }
      }
    }
    function r(e2) {
      var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n2 = e2[s] = e2[s] || [], l2 = { all: n2, evt: null, found: null };
      return t2 && i2 && P(n2) > 0 && o(n2, function(e3, n3) {
        if (e3.eventName == t2 && e3.fn.toString() == i2.toString())
          return l2.found = true, l2.evt = n3, false;
      }), l2;
    }
    function a(e2) {
      var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i2 = t2.onElement, n2 = t2.withCallback, s2 = t2.avoidDuplicate, l2 = s2 === void 0 || s2, a2 = t2.once, h2 = a2 !== void 0 && a2, d2 = t2.useCapture, c2 = d2 !== void 0 && d2, u2 = arguments.length > 2 ? arguments[2] : void 0, g2 = i2 || [];
      function v2(e3) {
        T(n2) && n2.call(u2, e3, this), h2 && v2.destroy();
      }
      return C(g2) && (g2 = document.querySelectorAll(g2)), v2.destroy = function() {
        o(g2, function(t3) {
          var i3 = r(t3, e2, v2);
          i3.found && i3.all.splice(i3.evt, 1), t3.removeEventListener && t3.removeEventListener(e2, v2, c2);
        });
      }, o(g2, function(t3) {
        var i3 = r(t3, e2, v2);
        (t3.addEventListener && l2 && !i3.found || !l2) && (t3.addEventListener(e2, v2, c2), i3.all.push({ eventName: e2, fn: v2 }));
      }), v2;
    }
    function h(e2, t2) {
      o(t2.split(" "), function(t3) {
        return e2.classList.add(t3);
      });
    }
    function d(e2, t2) {
      o(t2.split(" "), function(t3) {
        return e2.classList.remove(t3);
      });
    }
    function c(e2, t2) {
      return e2.classList.contains(t2);
    }
    function u(e2, t2) {
      for (; e2 !== document.body; ) {
        if (!(e2 = e2.parentElement))
          return false;
        if (typeof e2.matches == "function" ? e2.matches(t2) : e2.msMatchesSelector(t2))
          return e2;
      }
    }
    function g(e2) {
      var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i2 = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
      if (!e2 || t2 === "")
        return false;
      if (t2 == "none")
        return T(i2) && i2(), false;
      var n2 = x(), s2 = t2.split(" ");
      o(s2, function(t3) {
        h(e2, "g" + t3);
      }), a(n2, { onElement: e2, avoidDuplicate: false, once: true, withCallback: function(e3, t3) {
        o(s2, function(e4) {
          d(t3, "g" + e4);
        }), T(i2) && i2();
      } });
    }
    function v(e2) {
      var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      if (t2 == "")
        return e2.style.webkitTransform = "", e2.style.MozTransform = "", e2.style.msTransform = "", e2.style.OTransform = "", e2.style.transform = "", false;
      e2.style.webkitTransform = t2, e2.style.MozTransform = t2, e2.style.msTransform = t2, e2.style.OTransform = t2, e2.style.transform = t2;
    }
    function f(e2) {
      e2.style.display = "block";
    }
    function p2(e2) {
      e2.style.display = "none";
    }
    function m(e2) {
      var t2 = document.createDocumentFragment(), i2 = document.createElement("div");
      for (i2.innerHTML = e2; i2.firstChild; )
        t2.appendChild(i2.firstChild);
      return t2;
    }
    function y() {
      return { width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight };
    }
    function x() {
      var e2, t2 = document.createElement("fakeelement"), i2 = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
      for (e2 in i2)
        if (t2.style[e2] !== void 0)
          return i2[e2];
    }
    function b(e2, t2, i2, n2) {
      if (e2())
        t2();
      else {
        var s2;
        i2 || (i2 = 100);
        var l2 = setInterval(function() {
          e2() && (clearInterval(l2), s2 && clearTimeout(s2), t2());
        }, i2);
        n2 && (s2 = setTimeout(function() {
          clearInterval(l2);
        }, n2));
      }
    }
    function S(e2, t2, i2) {
      if (I(e2))
        console.error("Inject assets error");
      else if (T(t2) && (i2 = t2, t2 = false), C(t2) && t2 in window)
        T(i2) && i2();
      else {
        var n2;
        if (e2.indexOf(".css") !== -1) {
          if ((n2 = document.querySelectorAll('link[href="' + e2 + '"]')) && n2.length > 0)
            return void (T(i2) && i2());
          var s2 = document.getElementsByTagName("head")[0], l2 = s2.querySelectorAll('link[rel="stylesheet"]'), o2 = document.createElement("link");
          return o2.rel = "stylesheet", o2.type = "text/css", o2.href = e2, o2.media = "all", l2 ? s2.insertBefore(o2, l2[0]) : s2.appendChild(o2), void (T(i2) && i2());
        }
        if ((n2 = document.querySelectorAll('script[src="' + e2 + '"]')) && n2.length > 0) {
          if (T(i2)) {
            if (C(t2))
              return b(function() {
                return window[t2] !== void 0;
              }, function() {
                i2();
              }), false;
            i2();
          }
        } else {
          var r2 = document.createElement("script");
          r2.type = "text/javascript", r2.src = e2, r2.onload = function() {
            if (T(i2)) {
              if (C(t2))
                return b(function() {
                  return window[t2] !== void 0;
                }, function() {
                  i2();
                }), false;
              i2();
            }
          }, document.body.appendChild(r2);
        }
      }
    }
    function w() {
      return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
    }
    function T(e2) {
      return typeof e2 == "function";
    }
    function C(e2) {
      return typeof e2 == "string";
    }
    function k(e2) {
      return !(!e2 || !e2.nodeType || e2.nodeType != 1);
    }
    function E(e2) {
      return Array.isArray(e2);
    }
    function A(e2) {
      return e2 && e2.length && isFinite(e2.length);
    }
    function L(t2) {
      return e(t2) === "object" && t2 != null && !T(t2) && !E(t2);
    }
    function I(e2) {
      return e2 == null;
    }
    function O(e2, t2) {
      return e2 !== null && hasOwnProperty.call(e2, t2);
    }
    function P(e2) {
      if (L(e2)) {
        if (e2.keys)
          return e2.keys().length;
        var t2 = 0;
        for (var i2 in e2)
          O(e2, i2) && t2++;
        return t2;
      }
      return e2.length;
    }
    function z(e2) {
      return !isNaN(parseFloat(e2)) && isFinite(e2);
    }
    function M() {
      var e2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, t2 = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
      if (!t2.length)
        return false;
      if (t2.length == 1)
        return t2[0];
      typeof e2 == "string" && (e2 = parseInt(e2));
      var i2 = e2 < 0 ? 1 : e2 + 1;
      i2 > t2.length && (i2 = "1");
      var n2 = [];
      o(t2, function(e3) {
        n2.push(e3.getAttribute("data-taborder"));
      });
      var s2 = n2.filter(function(e3) {
        return e3 >= parseInt(i2);
      }), l2 = s2.sort()[0];
      return document.querySelector('.gbtn[data-taborder="'.concat(l2, '"]'));
    }
    function X(e2) {
      if (e2.events.hasOwnProperty("keyboard"))
        return false;
      e2.events.keyboard = a("keydown", { onElement: window, withCallback: function(t2, i2) {
        var n2 = (t2 = t2 || window.event).keyCode;
        if (n2 == 9) {
          var s2 = document.querySelector(".gbtn.focused");
          if (!s2) {
            var l2 = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
            if (l2 == "input" || l2 == "textarea" || l2 == "button")
              return;
          }
          t2.preventDefault();
          var o2 = document.querySelectorAll(".gbtn[data-taborder]");
          if (!o2 || o2.length <= 0)
            return;
          if (!s2) {
            var r2 = M();
            return void (r2 && (r2.focus(), h(r2, "focused")));
          }
          var a2 = M(s2.getAttribute("data-taborder"));
          d(s2, "focused"), a2 && (a2.focus(), h(a2, "focused"));
        }
        n2 == 39 && e2.nextSlide(), n2 == 37 && e2.prevSlide(), n2 == 27 && e2.close();
      } });
    }
    function Y(e2) {
      return Math.sqrt(e2.x * e2.x + e2.y * e2.y);
    }
    function q(e2, t2) {
      var i2 = function(e3, t3) {
        var i3 = Y(e3) * Y(t3);
        if (i3 === 0)
          return 0;
        var n2 = function(e4, t4) {
          return e4.x * t4.x + e4.y * t4.y;
        }(e3, t3) / i3;
        return n2 > 1 && (n2 = 1), Math.acos(n2);
      }(e2, t2);
      return function(e3, t3) {
        return e3.x * t3.y - t3.x * e3.y;
      }(e2, t2) > 0 && (i2 *= -1), 180 * i2 / Math.PI;
    }
    var N = function() {
      function e2(i2) {
        t(this, e2), this.handlers = [], this.el = i2;
      }
      return n(e2, [{ key: "add", value: function(e3) {
        this.handlers.push(e3);
      } }, { key: "del", value: function(e3) {
        e3 || (this.handlers = []);
        for (var t2 = this.handlers.length; t2 >= 0; t2--)
          this.handlers[t2] === e3 && this.handlers.splice(t2, 1);
      } }, { key: "dispatch", value: function() {
        for (var e3 = 0, t2 = this.handlers.length; e3 < t2; e3++) {
          var i2 = this.handlers[e3];
          typeof i2 == "function" && i2.apply(this.el, arguments);
        }
      } }]), e2;
    }();
    function D(e2, t2) {
      var i2 = new N(e2);
      return i2.add(t2), i2;
    }
    var _ = function() {
      function e2(i2, n2) {
        t(this, e2), this.element = typeof i2 == "string" ? document.querySelector(i2) : i2, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, false), this.element.addEventListener("touchmove", this.move, false), this.element.addEventListener("touchend", this.end, false), this.element.addEventListener("touchcancel", this.cancel, false), this.preV = { x: null, y: null }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = false;
        var s2 = function() {
        };
        this.rotate = D(this.element, n2.rotate || s2), this.touchStart = D(this.element, n2.touchStart || s2), this.multipointStart = D(this.element, n2.multipointStart || s2), this.multipointEnd = D(this.element, n2.multipointEnd || s2), this.pinch = D(this.element, n2.pinch || s2), this.swipe = D(this.element, n2.swipe || s2), this.tap = D(this.element, n2.tap || s2), this.doubleTap = D(this.element, n2.doubleTap || s2), this.longTap = D(this.element, n2.longTap || s2), this.singleTap = D(this.element, n2.singleTap || s2), this.pressMove = D(this.element, n2.pressMove || s2), this.twoFingerPressMove = D(this.element, n2.twoFingerPressMove || s2), this.touchMove = D(this.element, n2.touchMove || s2), this.touchEnd = D(this.element, n2.touchEnd || s2), this.touchCancel = D(this.element, n2.touchCancel || s2), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = { x: null, y: null };
      }
      return n(e2, [{ key: "start", value: function(e3) {
        if (e3.touches) {
          if (e3.target && e3.target.nodeName && ["a", "button", "input"].indexOf(e3.target.nodeName.toLowerCase()) >= 0)
            console.log("ignore drag for this touched element", e3.target.nodeName.toLowerCase());
          else {
            this.now = Date.now(), this.x1 = e3.touches[0].pageX, this.y1 = e3.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e3, this.element), this.preTapPosition.x !== null && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
            var t2 = this.preV;
            if (e3.touches.length > 1) {
              this._cancelLongTap(), this._cancelSingleTap();
              var i2 = { x: e3.touches[1].pageX - this.x1, y: e3.touches[1].pageY - this.y1 };
              t2.x = i2.x, t2.y = i2.y, this.pinchStartLen = Y(t2), this.multipointStart.dispatch(e3, this.element);
            }
            this._preventTap = false, this.longTapTimeout = setTimeout(function() {
              this.longTap.dispatch(e3, this.element), this._preventTap = true;
            }.bind(this), 750);
          }
        }
      } }, { key: "move", value: function(e3) {
        if (e3.touches) {
          var t2 = this.preV, i2 = e3.touches.length, n2 = e3.touches[0].pageX, s2 = e3.touches[0].pageY;
          if (this.isDoubleTap = false, i2 > 1) {
            var l2 = e3.touches[1].pageX, o2 = e3.touches[1].pageY, r2 = { x: e3.touches[1].pageX - n2, y: e3.touches[1].pageY - s2 };
            t2.x !== null && (this.pinchStartLen > 0 && (e3.zoom = Y(r2) / this.pinchStartLen, this.pinch.dispatch(e3, this.element)), e3.angle = q(r2, t2), this.rotate.dispatch(e3, this.element)), t2.x = r2.x, t2.y = r2.y, this.x2 !== null && this.sx2 !== null ? (e3.deltaX = (n2 - this.x2 + l2 - this.sx2) / 2, e3.deltaY = (s2 - this.y2 + o2 - this.sy2) / 2) : (e3.deltaX = 0, e3.deltaY = 0), this.twoFingerPressMove.dispatch(e3, this.element), this.sx2 = l2, this.sy2 = o2;
          } else {
            if (this.x2 !== null) {
              e3.deltaX = n2 - this.x2, e3.deltaY = s2 - this.y2;
              var a2 = Math.abs(this.x1 - this.x2), h2 = Math.abs(this.y1 - this.y2);
              (a2 > 10 || h2 > 10) && (this._preventTap = true);
            } else
              e3.deltaX = 0, e3.deltaY = 0;
            this.pressMove.dispatch(e3, this.element);
          }
          this.touchMove.dispatch(e3, this.element), this._cancelLongTap(), this.x2 = n2, this.y2 = s2, i2 > 1 && e3.preventDefault();
        }
      } }, { key: "end", value: function(e3) {
        if (e3.changedTouches) {
          this._cancelLongTap();
          var t2 = this;
          e3.touches.length < 2 && (this.multipointEnd.dispatch(e3, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e3.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
            t2.swipe.dispatch(e3, t2.element);
          }, 0)) : (this.tapTimeout = setTimeout(function() {
            t2._preventTap || t2.tap.dispatch(e3, t2.element), t2.isDoubleTap && (t2.doubleTap.dispatch(e3, t2.element), t2.isDoubleTap = false);
          }, 0), t2.isDoubleTap || (t2.singleTapTimeout = setTimeout(function() {
            t2.singleTap.dispatch(e3, t2.element);
          }, 250))), this.touchEnd.dispatch(e3, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
        }
      } }, { key: "cancelAll", value: function() {
        this._preventTap = true, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
      } }, { key: "cancel", value: function(e3) {
        this.cancelAll(), this.touchCancel.dispatch(e3, this.element);
      } }, { key: "_cancelLongTap", value: function() {
        clearTimeout(this.longTapTimeout);
      } }, { key: "_cancelSingleTap", value: function() {
        clearTimeout(this.singleTapTimeout);
      } }, { key: "_swipeDirection", value: function(e3, t2, i2, n2) {
        return Math.abs(e3 - t2) >= Math.abs(i2 - n2) ? e3 - t2 > 0 ? "Left" : "Right" : i2 - n2 > 0 ? "Up" : "Down";
      } }, { key: "on", value: function(e3, t2) {
        this[e3] && this[e3].add(t2);
      } }, { key: "off", value: function(e3, t2) {
        this[e3] && this[e3].del(t2);
      } }, { key: "destroy", value: function() {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      } }]), e2;
    }();
    function W(e2) {
      var t2 = function() {
        var e3, t3 = document.createElement("fakeelement"), i3 = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
        for (e3 in i3)
          if (t3.style[e3] !== void 0)
            return i3[e3];
      }(), i2 = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n2 = c(e2, "gslide-media") ? e2 : e2.querySelector(".gslide-media"), s2 = u(n2, ".ginner-container"), l2 = e2.querySelector(".gslide-description");
      i2 > 769 && (n2 = s2), h(n2, "greset"), v(n2, "translate3d(0, 0, 0)"), a(t2, { onElement: n2, once: true, withCallback: function(e3, t3) {
        d(n2, "greset");
      } }), n2.style.opacity = "", l2 && (l2.style.opacity = "");
    }
    function B(e2) {
      if (e2.events.hasOwnProperty("touch"))
        return false;
      var t2, i2, n2, s2 = y(), l2 = s2.width, o2 = s2.height, r2 = false, a2 = null, g2 = null, f2 = null, p3 = false, m2 = 1, x2 = 1, b2 = false, S2 = false, w2 = null, T2 = null, C2 = null, k2 = null, E2 = 0, A2 = 0, L2 = false, I2 = false, O2 = {}, P2 = {}, z2 = 0, M2 = 0, X2 = document.getElementById("glightbox-slider"), Y2 = document.querySelector(".goverlay"), q2 = new _(X2, { touchStart: function(t3) {
        if (r2 = true, (c(t3.targetTouches[0].target, "ginner-container") || u(t3.targetTouches[0].target, ".gslide-desc") || t3.targetTouches[0].target.nodeName.toLowerCase() == "a") && (r2 = false), u(t3.targetTouches[0].target, ".gslide-inline") && !c(t3.targetTouches[0].target.parentNode, "gslide-inline") && (r2 = false), r2) {
          if (P2 = t3.targetTouches[0], O2.pageX = t3.targetTouches[0].pageX, O2.pageY = t3.targetTouches[0].pageY, z2 = t3.targetTouches[0].clientX, M2 = t3.targetTouches[0].clientY, a2 = e2.activeSlide, g2 = a2.querySelector(".gslide-media"), n2 = a2.querySelector(".gslide-inline"), f2 = null, c(g2, "gslide-image") && (f2 = g2.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (g2 = a2.querySelector(".ginner-container")), d(Y2, "greset"), t3.pageX > 20 && t3.pageX < window.innerWidth - 20)
            return;
          t3.preventDefault();
        }
      }, touchMove: function(s3) {
        if (r2 && (P2 = s3.targetTouches[0], !b2 && !S2)) {
          if (n2 && n2.offsetHeight > o2) {
            var a3 = O2.pageX - P2.pageX;
            if (Math.abs(a3) <= 13)
              return false;
          }
          p3 = true;
          var h2, d2 = s3.targetTouches[0].clientX, c2 = s3.targetTouches[0].clientY, u2 = z2 - d2, m3 = M2 - c2;
          if (Math.abs(u2) > Math.abs(m3) ? (L2 = false, I2 = true) : (I2 = false, L2 = true), t2 = P2.pageX - O2.pageX, E2 = 100 * t2 / l2, i2 = P2.pageY - O2.pageY, A2 = 100 * i2 / o2, L2 && f2 && (h2 = 1 - Math.abs(i2) / o2, Y2.style.opacity = h2, e2.settings.touchFollowAxis && (E2 = 0)), I2 && (h2 = 1 - Math.abs(t2) / l2, g2.style.opacity = h2, e2.settings.touchFollowAxis && (A2 = 0)), !f2)
            return v(g2, "translate3d(".concat(E2, "%, 0, 0)"));
          v(g2, "translate3d(".concat(E2, "%, ").concat(A2, "%, 0)"));
        }
      }, touchEnd: function() {
        if (r2) {
          if (p3 = false, S2 || b2)
            return C2 = w2, void (k2 = T2);
          var t3 = Math.abs(parseInt(A2)), i3 = Math.abs(parseInt(E2));
          if (!(t3 > 29 && f2))
            return t3 < 29 && i3 < 25 ? (h(Y2, "greset"), Y2.style.opacity = 1, W(g2)) : void 0;
          e2.close();
        }
      }, multipointEnd: function() {
        setTimeout(function() {
          b2 = false;
        }, 50);
      }, multipointStart: function() {
        b2 = true, m2 = x2 || 1;
      }, pinch: function(e3) {
        if (!f2 || p3)
          return false;
        b2 = true, f2.scaleX = f2.scaleY = m2 * e3.zoom;
        var t3 = m2 * e3.zoom;
        if (S2 = true, t3 <= 1)
          return S2 = false, t3 = 1, k2 = null, C2 = null, w2 = null, T2 = null, void f2.setAttribute("style", "");
        t3 > 4.5 && (t3 = 4.5), f2.style.transform = "scale3d(".concat(t3, ", ").concat(t3, ", 1)"), x2 = t3;
      }, pressMove: function(e3) {
        if (S2 && !b2) {
          var t3 = P2.pageX - O2.pageX, i3 = P2.pageY - O2.pageY;
          C2 && (t3 += C2), k2 && (i3 += k2), w2 = t3, T2 = i3;
          var n3 = "translate3d(".concat(t3, "px, ").concat(i3, "px, 0)");
          x2 && (n3 += " scale3d(".concat(x2, ", ").concat(x2, ", 1)")), v(f2, n3);
        }
      }, swipe: function(t3) {
        if (!S2)
          if (b2)
            b2 = false;
          else {
            if (t3.direction == "Left") {
              if (e2.index == e2.elements.length - 1)
                return W(g2);
              e2.nextSlide();
            }
            if (t3.direction == "Right") {
              if (e2.index == 0)
                return W(g2);
              e2.prevSlide();
            }
          }
      } });
      e2.events.touch = q2;
    }
    var H = function() {
      function e2(i2, n2) {
        var s2 = this, l2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (t(this, e2), this.img = i2, this.slide = n2, this.onclose = l2, this.img.setZoomEvents)
          return false;
        this.active = false, this.zoomedIn = false, this.dragging = false, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function(e3) {
          return s2.dragStart(e3);
        }, false), this.img.addEventListener("mouseup", function(e3) {
          return s2.dragEnd(e3);
        }, false), this.img.addEventListener("mousemove", function(e3) {
          return s2.drag(e3);
        }, false), this.img.addEventListener("click", function(e3) {
          return s2.slide.classList.contains("dragging-nav") ? (s2.zoomOut(), false) : s2.zoomedIn ? void (s2.zoomedIn && !s2.dragging && s2.zoomOut()) : s2.zoomIn();
        }, false), this.img.setZoomEvents = true;
      }
      return n(e2, [{ key: "zoomIn", value: function() {
        var e3 = this.widowWidth();
        if (!(this.zoomedIn || e3 <= 768)) {
          var t2 = this.img;
          if (t2.setAttribute("data-style", t2.getAttribute("style")), t2.style.maxWidth = t2.naturalWidth + "px", t2.style.maxHeight = t2.naturalHeight + "px", t2.naturalWidth > e3) {
            var i2 = e3 / 2 - t2.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, i2, 0);
          }
          this.slide.classList.add("zoomed"), this.zoomedIn = true;
        }
      } }, { key: "zoomOut", value: function() {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = false, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && typeof this.onclose == "function" && this.onclose();
      } }, { key: "dragStart", value: function(e3) {
        e3.preventDefault(), this.zoomedIn ? (e3.type === "touchstart" ? (this.initialX = e3.touches[0].clientX - this.xOffset, this.initialY = e3.touches[0].clientY - this.yOffset) : (this.initialX = e3.clientX - this.xOffset, this.initialY = e3.clientY - this.yOffset), e3.target === this.img && (this.active = true, this.img.classList.add("dragging"))) : this.active = false;
      } }, { key: "dragEnd", value: function(e3) {
        var t2 = this;
        e3.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = false, setTimeout(function() {
          t2.dragging = false, t2.img.isDragging = false, t2.img.classList.remove("dragging");
        }, 100);
      } }, { key: "drag", value: function(e3) {
        this.active && (e3.preventDefault(), e3.type === "touchmove" ? (this.currentX = e3.touches[0].clientX - this.initialX, this.currentY = e3.touches[0].clientY - this.initialY) : (this.currentX = e3.clientX - this.initialX, this.currentY = e3.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = true, this.dragging = true, this.setTranslate(this.img, this.currentX, this.currentY));
      } }, { key: "onMove", value: function(e3) {
        if (this.zoomedIn) {
          var t2 = e3.clientX - this.img.naturalWidth / 2, i2 = e3.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, t2, i2);
        }
      } }, { key: "setTranslate", value: function(e3, t2, i2) {
        e3.style.transform = "translate3d(" + t2 + "px, " + i2 + "px, 0)";
      } }, { key: "widowWidth", value: function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      } }]), e2;
    }(), V = function() {
      function e2() {
        var i2 = this, n2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        t(this, e2);
        var s2 = n2.dragEl, l2 = n2.toleranceX, o2 = l2 === void 0 ? 40 : l2, r2 = n2.toleranceY, a2 = r2 === void 0 ? 65 : r2, h2 = n2.slide, d2 = h2 === void 0 ? null : h2, c2 = n2.instance, u2 = c2 === void 0 ? null : c2;
        this.el = s2, this.active = false, this.dragging = false, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = o2, this.toleranceY = a2, this.toleranceReached = false, this.dragContainer = this.el, this.slide = d2, this.instance = u2, this.el.addEventListener("mousedown", function(e3) {
          return i2.dragStart(e3);
        }, false), this.el.addEventListener("mouseup", function(e3) {
          return i2.dragEnd(e3);
        }, false), this.el.addEventListener("mousemove", function(e3) {
          return i2.drag(e3);
        }, false);
      }
      return n(e2, [{ key: "dragStart", value: function(e3) {
        if (this.slide.classList.contains("zoomed"))
          this.active = false;
        else {
          e3.type === "touchstart" ? (this.initialX = e3.touches[0].clientX - this.xOffset, this.initialY = e3.touches[0].clientY - this.yOffset) : (this.initialX = e3.clientX - this.xOffset, this.initialY = e3.clientY - this.yOffset);
          var t2 = e3.target.nodeName.toLowerCase();
          e3.target.classList.contains("nodrag") || u(e3.target, ".nodrag") || ["input", "select", "textarea", "button", "a"].indexOf(t2) !== -1 ? this.active = false : (e3.preventDefault(), (e3.target === this.el || t2 !== "img" && u(e3.target, ".gslide-inline")) && (this.active = true, this.el.classList.add("dragging"), this.dragContainer = u(e3.target, ".ginner-container")));
        }
      } }, { key: "dragEnd", value: function(e3) {
        var t2 = this;
        e3 && e3.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = false, this.doSlideChange && (this.instance.preventOutsideClick = true, this.doSlideChange == "right" && this.instance.prevSlide(), this.doSlideChange == "left" && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, true), setTimeout(function() {
          t2.instance.preventOutsideClick = false, t2.toleranceReached = false, t2.lastDirection = null, t2.dragging = false, t2.el.isDragging = false, t2.el.classList.remove("dragging"), t2.slide.classList.remove("dragging-nav"), t2.dragContainer.style.transform = "", t2.dragContainer.style.transition = "";
        }, 100);
      } }, { key: "drag", value: function(e3) {
        if (this.active) {
          e3.preventDefault(), this.slide.classList.add("dragging-nav"), e3.type === "touchmove" ? (this.currentX = e3.touches[0].clientX - this.initialX, this.currentY = e3.touches[0].clientY - this.initialY) : (this.currentX = e3.clientX - this.initialX, this.currentY = e3.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = true, this.dragging = true, this.doSlideChange = false, this.doSlideClose = false;
          var t2 = Math.abs(this.currentX), i2 = Math.abs(this.currentY);
          if (t2 > 0 && t2 >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == "x")) {
            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
            var n2 = this.shouldChange();
            if (!this.instance.settings.dragAutoSnap && n2 && (this.doSlideChange = n2), this.instance.settings.dragAutoSnap && n2)
              return this.instance.preventOutsideClick = true, this.toleranceReached = true, this.active = false, this.instance.preventOutsideClick = true, this.dragEnd(null), n2 == "right" && this.instance.prevSlide(), void (n2 == "left" && this.instance.nextSlide());
          }
          if (this.toleranceY > 0 && i2 > 0 && i2 >= t2 && (!this.lastDirection || this.lastDirection == "y")) {
            this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
            var s2 = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && s2 && (this.doSlideClose = true), void (this.instance.settings.dragAutoSnap && s2 && this.instance.close());
          }
        }
      } }, { key: "shouldChange", value: function() {
        var e3 = false;
        if (Math.abs(this.currentX) >= this.toleranceX) {
          var t2 = this.currentX > 0 ? "right" : "left";
          (t2 == "left" && this.slide !== this.slide.parentNode.lastChild || t2 == "right" && this.slide !== this.slide.parentNode.firstChild) && (e3 = t2);
        }
        return e3;
      } }, { key: "shouldClose", value: function() {
        var e3 = false;
        return Math.abs(this.currentY) >= this.toleranceY && (e3 = true), e3;
      } }, { key: "setTranslate", value: function(e3, t2, i2) {
        var n2 = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
        e3.style.transition = n2 ? "all .2s ease" : "", e3.style.transform = "translate3d(".concat(t2, "px, ").concat(i2, "px, 0)");
      } }]), e2;
    }();
    function j(e2, t2, i2, n2) {
      var s2 = e2.querySelector(".gslide-media"), l2 = new Image(), o2 = "gSlideTitle_" + i2, r2 = "gSlideDesc_" + i2;
      l2.addEventListener("load", function() {
        T(n2) && n2();
      }, false), l2.src = t2.href, t2.sizes != "" && t2.srcset != "" && (l2.sizes = t2.sizes, l2.srcset = t2.srcset), l2.alt = "", I(t2.alt) || t2.alt === "" || (l2.alt = t2.alt), t2.title !== "" && l2.setAttribute("aria-labelledby", o2), t2.description !== "" && l2.setAttribute("aria-describedby", r2), t2.hasOwnProperty("_hasCustomWidth") && t2._hasCustomWidth && (l2.style.width = t2.width), t2.hasOwnProperty("_hasCustomHeight") && t2._hasCustomHeight && (l2.style.height = t2.height), s2.insertBefore(l2, s2.firstChild);
    }
    function F(e2, t2, i2, n2) {
      var s2 = this, l2 = e2.querySelector(".ginner-container"), o2 = "gvideo" + i2, r2 = e2.querySelector(".gslide-media"), a2 = this.getAllPlayers();
      h(l2, "gvideo-container"), r2.insertBefore(m('<div class="gvideo-wrapper"></div>'), r2.firstChild);
      var d2 = e2.querySelector(".gvideo-wrapper");
      S(this.settings.plyr.css, "Plyr");
      var c2 = t2.href;
      location.protocol.replace(":", "");
      var g2 = "", v2 = "", f2 = false;
      r2.style.maxWidth = t2.width, S(this.settings.plyr.js, "Plyr", function() {
        if (c2.match(/vimeo\.com\/([0-9]*)/)) {
          var l3 = /vimeo.*\/(\d+)/i.exec(c2);
          g2 = "vimeo", v2 = l3[1];
        }
        if (c2.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c2.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c2.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
          var r3 = function(e3) {
            var t3 = "";
            t3 = (e3 = e3.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] !== void 0 ? (t3 = e3[2].split(/[^0-9a-z_\-]/i))[0] : e3;
            return t3;
          }(c2);
          g2 = "youtube", v2 = r3;
        }
        if (c2.match(/\.(mp4|ogg|webm|mov)$/) !== null) {
          g2 = "local";
          var u2 = '<video id="' + o2 + '" ';
          u2 += 'style="background:#000; max-width: '.concat(t2.width, ';" '), u2 += 'preload="metadata" ', u2 += 'x-webkit-airplay="allow" ', u2 += "playsinline ", u2 += "controls ", u2 += 'class="gvideo-local">';
          var p3 = c2.toLowerCase().split(".").pop(), y2 = { mp4: "", ogg: "", webm: "" };
          for (var x2 in y2[p3 = p3 == "mov" ? "mp4" : p3] = c2, y2)
            if (y2.hasOwnProperty(x2)) {
              var S2 = y2[x2];
              t2.hasOwnProperty(x2) && (S2 = t2[x2]), S2 !== "" && (u2 += '<source src="'.concat(S2, '" type="video/').concat(x2, '">'));
            }
          f2 = m(u2 += "</video>");
        }
        var w2 = f2 || m('<div id="'.concat(o2, '" data-plyr-provider="').concat(g2, '" data-plyr-embed-id="').concat(v2, '"></div>'));
        h(d2, "".concat(g2, "-video gvideo")), d2.appendChild(w2), d2.setAttribute("data-id", o2), d2.setAttribute("data-index", i2);
        var C2 = O(s2.settings.plyr, "config") ? s2.settings.plyr.config : {}, k2 = new Plyr("#" + o2, C2);
        k2.on("ready", function(e3) {
          var t3 = e3.detail.plyr;
          a2[o2] = t3, T(n2) && n2();
        }), b(function() {
          return e2.querySelector("iframe") && e2.querySelector("iframe").dataset.ready == "true";
        }, function() {
          s2.resize(e2);
        }), k2.on("enterfullscreen", R), k2.on("exitfullscreen", R);
      });
    }
    function R(e2) {
      var t2 = u(e2.target, ".gslide-media");
      e2.type == "enterfullscreen" && h(t2, "fullscreen"), e2.type == "exitfullscreen" && d(t2, "fullscreen");
    }
    function G(e2, t2, i2, n2) {
      var s2, l2 = this, o2 = e2.querySelector(".gslide-media"), r2 = !(!O(t2, "href") || !t2.href) && t2.href.split("#").pop().trim(), d2 = !(!O(t2, "content") || !t2.content) && t2.content;
      if (d2 && (C(d2) && (s2 = m('<div class="ginlined-content">'.concat(d2, "</div>"))), k(d2))) {
        d2.style.display == "none" && (d2.style.display = "block");
        var c2 = document.createElement("div");
        c2.className = "ginlined-content", c2.appendChild(d2), s2 = c2;
      }
      if (r2) {
        var u2 = document.getElementById(r2);
        if (!u2)
          return false;
        var g2 = u2.cloneNode(true);
        g2.style.height = t2.height, g2.style.maxWidth = t2.width, h(g2, "ginlined-content"), s2 = g2;
      }
      if (!s2)
        return console.error("Unable to append inline slide content", t2), false;
      o2.style.height = t2.height, o2.style.width = t2.width, o2.appendChild(s2), this.events["inlineclose" + r2] = a("click", { onElement: o2.querySelectorAll(".gtrigger-close"), withCallback: function(e3) {
        e3.preventDefault(), l2.close();
      } }), T(n2) && n2();
    }
    function Z(e2, t2, i2, n2) {
      var s2 = e2.querySelector(".gslide-media"), l2 = function(e3) {
        var t3 = e3.url, i3 = e3.allow, n3 = e3.callback, s3 = e3.appendTo, l3 = document.createElement("iframe");
        return l3.className = "vimeo-video gvideo", l3.src = t3, l3.style.width = "100%", l3.style.height = "100%", i3 && l3.setAttribute("allow", i3), l3.onload = function() {
          h(l3, "node-ready"), T(n3) && n3();
        }, s3 && s3.appendChild(l3), l3;
      }({ url: t2.href, callback: n2 });
      s2.parentNode.style.maxWidth = t2.width, s2.parentNode.style.height = t2.height, s2.appendChild(l2);
    }
    var $ = function() {
      function e2() {
        var i2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        t(this, e2), this.defaults = { href: "", sizes: "", srcset: "", title: "", type: "", description: "", alt: "", descPosition: "bottom", effect: "", width: "", height: "", content: false, zoomable: true, draggable: true }, L(i2) && (this.defaults = l(this.defaults, i2));
      }
      return n(e2, [{ key: "sourceType", value: function(e3) {
        var t2 = e3;
        if ((e3 = e3.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null)
          return "image";
        if (e3.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e3.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e3.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/))
          return "video";
        if (e3.match(/vimeo\.com\/([0-9]*)/))
          return "video";
        if (e3.match(/\.(mp4|ogg|webm|mov)/) !== null)
          return "video";
        if (e3.match(/\.(mp3|wav|wma|aac|ogg)/) !== null)
          return "audio";
        if (e3.indexOf("#") > -1 && t2.split("#").pop().trim() !== "")
          return "inline";
        return e3.indexOf("goajax=true") > -1 ? "ajax" : "external";
      } }, { key: "parseConfig", value: function(e3, t2) {
        var i2 = this, n2 = l({ descPosition: t2.descPosition }, this.defaults);
        if (L(e3) && !k(e3)) {
          O(e3, "type") || (O(e3, "content") && e3.content ? e3.type = "inline" : O(e3, "href") && (e3.type = this.sourceType(e3.href)));
          var s2 = l(n2, e3);
          return this.setSize(s2, t2), s2;
        }
        var r2 = "", a2 = e3.getAttribute("data-glightbox"), h2 = e3.nodeName.toLowerCase();
        if (h2 === "a" && (r2 = e3.href), h2 === "img" && (r2 = e3.src, n2.alt = e3.alt), n2.href = r2, o(n2, function(s3, l2) {
          O(t2, l2) && l2 !== "width" && (n2[l2] = t2[l2]);
          var o2 = e3.dataset[l2];
          I(o2) || (n2[l2] = i2.sanitizeValue(o2));
        }), n2.content && (n2.type = "inline"), !n2.type && r2 && (n2.type = this.sourceType(r2)), I(a2)) {
          if (!n2.title && h2 == "a") {
            var d2 = e3.title;
            I(d2) || d2 === "" || (n2.title = d2);
          }
          if (!n2.title && h2 == "img") {
            var c2 = e3.alt;
            I(c2) || c2 === "" || (n2.title = c2);
          }
        } else {
          var u2 = [];
          o(n2, function(e4, t3) {
            u2.push(";\\s?" + t3);
          }), u2 = u2.join("\\s?:|"), a2.trim() !== "" && o(n2, function(e4, t3) {
            var s3 = a2, l2 = new RegExp("s?" + t3 + "s?:s?(.*?)(" + u2 + "s?:|$)"), o2 = s3.match(l2);
            if (o2 && o2.length && o2[1]) {
              var r3 = o2[1].trim().replace(/;\s*$/, "");
              n2[t3] = i2.sanitizeValue(r3);
            }
          });
        }
        if (n2.description && n2.description.substring(0, 1) === ".") {
          var g2;
          try {
            g2 = document.querySelector(n2.description).innerHTML;
          } catch (e4) {
            if (!(e4 instanceof DOMException))
              throw e4;
          }
          g2 && (n2.description = g2);
        }
        if (!n2.description) {
          var v2 = e3.querySelector(".glightbox-desc");
          v2 && (n2.description = v2.innerHTML);
        }
        return this.setSize(n2, t2, e3), this.slideConfig = n2, n2;
      } }, { key: "setSize", value: function(e3, t2) {
        var i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n2 = e3.type == "video" ? this.checkSize(t2.videosWidth) : this.checkSize(t2.width), s2 = this.checkSize(t2.height);
        return e3.width = O(e3, "width") && e3.width !== "" ? this.checkSize(e3.width) : n2, e3.height = O(e3, "height") && e3.height !== "" ? this.checkSize(e3.height) : s2, i2 && e3.type == "image" && (e3._hasCustomWidth = !!i2.dataset.width, e3._hasCustomHeight = !!i2.dataset.height), e3;
      } }, { key: "checkSize", value: function(e3) {
        return z(e3) ? "".concat(e3, "px") : e3;
      } }, { key: "sanitizeValue", value: function(e3) {
        return e3 !== "true" && e3 !== "false" ? e3 : e3 === "true";
      } }]), e2;
    }(), U = function() {
      function e2(i2, n2, s2) {
        t(this, e2), this.element = i2, this.instance = n2, this.index = s2;
      }
      return n(e2, [{ key: "setContent", value: function() {
        var e3 = this, t2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, i2 = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (c(t2, "loaded"))
          return false;
        var n2 = this.instance.settings, s2 = this.slideConfig, l2 = w();
        T(n2.beforeSlideLoad) && n2.beforeSlideLoad({ index: this.index, slide: t2, player: false });
        var o2 = s2.type, r2 = s2.descPosition, a2 = t2.querySelector(".gslide-media"), d2 = t2.querySelector(".gslide-title"), u2 = t2.querySelector(".gslide-desc"), g2 = t2.querySelector(".gdesc-inner"), v2 = i2, f2 = "gSlideTitle_" + this.index, p3 = "gSlideDesc_" + this.index;
        if (T(n2.afterSlideLoad) && (v2 = function() {
          T(i2) && i2(), n2.afterSlideLoad({ index: e3.index, slide: t2, player: e3.instance.getSlidePlayerInstance(e3.index) });
        }), s2.title == "" && s2.description == "" ? g2 && g2.parentNode.parentNode.removeChild(g2.parentNode) : (d2 && s2.title !== "" ? (d2.id = f2, d2.innerHTML = s2.title) : d2.parentNode.removeChild(d2), u2 && s2.description !== "" ? (u2.id = p3, l2 && n2.moreLength > 0 ? (s2.smallDescription = this.slideShortDesc(s2.description, n2.moreLength, n2.moreText), u2.innerHTML = s2.smallDescription, this.descriptionEvents(u2, s2)) : u2.innerHTML = s2.description) : u2.parentNode.removeChild(u2), h(a2.parentNode, "desc-".concat(r2)), h(g2.parentNode, "description-".concat(r2))), h(a2, "gslide-".concat(o2)), h(t2, "loaded"), o2 !== "video") {
          if (o2 !== "external")
            return o2 === "inline" ? (G.apply(this.instance, [t2, s2, this.index, v2]), void (s2.draggable && new V({ dragEl: t2.querySelector(".gslide-inline"), toleranceX: n2.dragToleranceX, toleranceY: n2.dragToleranceY, slide: t2, instance: this.instance }))) : void (o2 !== "image" ? T(v2) && v2() : j(t2, s2, this.index, function() {
              var i3 = t2.querySelector("img");
              s2.draggable && new V({ dragEl: i3, toleranceX: n2.dragToleranceX, toleranceY: n2.dragToleranceY, slide: t2, instance: e3.instance }), s2.zoomable && i3.naturalWidth > i3.offsetWidth && (h(i3, "zoomable"), new H(i3, t2, function() {
                e3.instance.resize();
              })), T(v2) && v2();
            }));
          Z.apply(this, [t2, s2, this.index, v2]);
        } else
          F.apply(this.instance, [t2, s2, this.index, v2]);
      } }, { key: "slideShortDesc", value: function(e3) {
        var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, i2 = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], n2 = document.createElement("div");
        n2.innerHTML = e3;
        var s2 = n2.innerText, l2 = i2;
        if ((e3 = s2.trim()).length <= t2)
          return e3;
        var o2 = e3.substr(0, t2 - 1);
        return l2 ? (n2 = null, o2 + '... <a href="#" class="desc-more">' + i2 + "</a>") : o2;
      } }, { key: "descriptionEvents", value: function(e3, t2) {
        var i2 = this, n2 = e3.querySelector(".desc-more");
        if (!n2)
          return false;
        a("click", { onElement: n2, withCallback: function(e4, n3) {
          e4.preventDefault();
          var s2 = document.body, l2 = u(n3, ".gslide-desc");
          if (!l2)
            return false;
          l2.innerHTML = t2.description, h(s2, "gdesc-open");
          var o2 = a("click", { onElement: [s2, u(l2, ".gslide-description")], withCallback: function(e5, n4) {
            e5.target.nodeName.toLowerCase() !== "a" && (d(s2, "gdesc-open"), h(s2, "gdesc-closed"), l2.innerHTML = t2.smallDescription, i2.descriptionEvents(l2, t2), setTimeout(function() {
              d(s2, "gdesc-closed");
            }, 400), o2.destroy());
          } });
        } });
      } }, { key: "create", value: function() {
        return m(this.instance.settings.slideHTML);
      } }, { key: "getConfig", value: function() {
        k(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var e3 = new $(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = e3.parseConfig(this.element, this.instance.settings), this.slideConfig;
      } }]), e2;
    }(), J = w(), K = w() !== null || document.createTouch !== void 0 || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, Q = document.getElementsByTagName("html")[0], ee = { selector: ".glightbox", elements: null, skin: "clean", theme: "clean", closeButton: true, startAt: null, autoplayVideos: true, autofocusVideos: true, descPosition: "bottom", width: "900px", height: "506px", videosWidth: "960px", beforeSlideChange: null, afterSlideChange: null, beforeSlideLoad: null, afterSlideLoad: null, slideInserted: null, slideRemoved: null, slideExtraAttributes: null, onOpen: null, onClose: null, loop: false, zoomable: true, draggable: true, dragAutoSnap: false, dragToleranceX: 40, dragToleranceY: 65, preload: true, oneSlidePerOpen: false, touchNavigation: true, touchFollowAxis: true, keyboardNavigation: true, closeOnOutsideClick: true, plugins: false, plyr: { css: "https://cdn.plyr.io/3.6.8/plyr.css", js: "https://cdn.plyr.io/3.6.8/plyr.js", config: { ratio: "16:9", fullscreen: { enabled: true, iosNative: true }, youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3 }, vimeo: { byline: false, portrait: false, title: false, transparent: false } } }, openEffect: "zoom", closeEffect: "zoom", slideEffect: "slide", moreText: "See more", moreLength: 60, cssEfects: { fade: { in: "fadeIn", out: "fadeOut" }, zoom: { in: "zoomIn", out: "zoomOut" }, slide: { in: "slideInRight", out: "slideOutLeft" }, slideBack: { in: "slideInLeft", out: "slideOutRight" }, none: { in: "none", out: "none" } }, svg: { close: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>', next: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>', prev: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>' }, slideHTML: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>', lightboxHTML: '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>' }, te = function() {
      function e2() {
        var i2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        t(this, e2), this.customOptions = i2, this.settings = l(ee, i2), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = false;
      }
      return n(e2, [{ key: "init", value: function() {
        var e3 = this, t2 = this.getSelector();
        t2 && (this.baseEvents = a("click", { onElement: t2, withCallback: function(t3, i2) {
          t3.preventDefault(), e3.open(i2);
        } })), this.elements = this.getElements();
      } }, { key: "open", value: function() {
        var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (this.elements.length == 0)
          return false;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var i2 = z(t2) ? t2 : this.settings.startAt;
        if (k(e3)) {
          var n2 = e3.getAttribute("data-gallery");
          n2 && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, n2)), I(i2) && (i2 = this.getElementIndex(e3)) < 0 && (i2 = 0);
        }
        z(i2) || (i2 = 0), this.build(), g(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.in);
        var s2 = document.body, l2 = window.innerWidth - document.documentElement.clientWidth;
        if (l2 > 0) {
          var o2 = document.createElement("style");
          o2.type = "text/css", o2.className = "gcss-styles", o2.innerText = ".gscrollbar-fixer {margin-right: ".concat(l2, "px}"), document.head.appendChild(o2), h(s2, "gscrollbar-fixer");
        }
        h(s2, "glightbox-open"), h(Q, "glightbox-open"), J && (h(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i2, true), this.elements.length == 1 ? (h(this.prevButton, "glightbox-button-hidden"), h(this.nextButton, "glightbox-button-hidden")) : (d(this.prevButton, "glightbox-button-hidden"), d(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = true, this.trigger("open"), T(this.settings.onOpen) && this.settings.onOpen(), K && this.settings.touchNavigation && B(this), this.settings.keyboardNavigation && X(this);
      } }, { key: "openAt", value: function() {
        var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.open(null, e3);
      } }, { key: "showSlide", value: function() {
        var e3 = this, t2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, i2 = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        f(this.loader), this.index = parseInt(t2);
        var n2 = this.slidesContainer.querySelector(".current");
        n2 && d(n2, "current"), this.slideAnimateOut();
        var s2 = this.slidesContainer.querySelectorAll(".gslide")[t2];
        if (c(s2, "loaded"))
          this.slideAnimateIn(s2, i2), p2(this.loader);
        else {
          f(this.loader);
          var l2 = this.elements[t2], o2 = { index: this.index, slide: s2, slideNode: s2, slideConfig: l2.slideConfig, slideIndex: this.index, trigger: l2.node, player: null };
          this.trigger("slide_before_load", o2), l2.instance.setContent(s2, function() {
            p2(e3.loader), e3.resize(), e3.slideAnimateIn(s2, i2), e3.trigger("slide_after_load", o2);
          });
        }
        this.slideDescription = s2.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && c(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(t2 + 1), this.preloadSlide(t2 - 1)), this.updateNavigationClasses(), this.activeSlide = s2;
      } }, { key: "preloadSlide", value: function(e3) {
        var t2 = this;
        if (e3 < 0 || e3 > this.elements.length - 1)
          return false;
        if (I(this.elements[e3]))
          return false;
        var i2 = this.slidesContainer.querySelectorAll(".gslide")[e3];
        if (c(i2, "loaded"))
          return false;
        var n2 = this.elements[e3], s2 = n2.type, l2 = { index: e3, slide: i2, slideNode: i2, slideConfig: n2.slideConfig, slideIndex: e3, trigger: n2.node, player: null };
        this.trigger("slide_before_load", l2), s2 == "video" || s2 == "external" ? setTimeout(function() {
          n2.instance.setContent(i2, function() {
            t2.trigger("slide_after_load", l2);
          });
        }, 200) : n2.instance.setContent(i2, function() {
          t2.trigger("slide_after_load", l2);
        });
      } }, { key: "prevSlide", value: function() {
        this.goToSlide(this.index - 1);
      } }, { key: "nextSlide", value: function() {
        this.goToSlide(this.index + 1);
      } }, { key: "goToSlide", value: function() {
        var e3 = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
        if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e3 < 0 || e3 > this.elements.length - 1))
          return false;
        e3 < 0 ? e3 = this.elements.length - 1 : e3 >= this.elements.length && (e3 = 0), this.showSlide(e3);
      } }, { key: "insertSlide", value: function() {
        var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
        t2 < 0 && (t2 = this.elements.length);
        var i2 = new U(e3, this, t2), n2 = i2.getConfig(), s2 = l({}, n2), o2 = i2.create(), r2 = this.elements.length - 1;
        s2.index = t2, s2.node = false, s2.instance = i2, s2.slideConfig = n2, this.elements.splice(t2, 0, s2);
        var a2 = null, h2 = null;
        if (this.slidesContainer) {
          if (t2 > r2)
            this.slidesContainer.appendChild(o2);
          else {
            var d2 = this.slidesContainer.querySelectorAll(".gslide")[t2];
            this.slidesContainer.insertBefore(o2, d2);
          }
          (this.settings.preload && this.index == 0 && t2 == 0 || this.index - 1 == t2 || this.index + 1 == t2) && this.preloadSlide(t2), this.index == 0 && t2 == 0 && (this.index = 1), this.updateNavigationClasses(), a2 = this.slidesContainer.querySelectorAll(".gslide")[t2], h2 = this.getSlidePlayerInstance(t2), s2.slideNode = a2;
        }
        this.trigger("slide_inserted", { index: t2, slide: a2, slideNode: a2, slideConfig: n2, slideIndex: t2, trigger: null, player: h2 }), T(this.settings.slideInserted) && this.settings.slideInserted({ index: t2, slide: a2, player: h2 });
      } }, { key: "removeSlide", value: function() {
        var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
        if (e3 < 0 || e3 > this.elements.length - 1)
          return false;
        var t2 = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e3];
        t2 && (this.getActiveSlideIndex() == e3 && (e3 == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t2.parentNode.removeChild(t2)), this.elements.splice(e3, 1), this.trigger("slide_removed", e3), T(this.settings.slideRemoved) && this.settings.slideRemoved(e3);
      } }, { key: "slideAnimateIn", value: function(e3, t2) {
        var i2 = this, n2 = e3.querySelector(".gslide-media"), s2 = e3.querySelector(".gslide-description"), l2 = { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlide, slideConfig: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, o2 = { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideConfig: this.elements[this.index].slideConfig, slideIndex: this.index, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) };
        if (n2.offsetWidth > 0 && s2 && (p2(s2), s2.style.display = ""), d(e3, this.effectsClasses), t2)
          g(e3, this.settings.cssEfects[this.settings.openEffect].in, function() {
            i2.settings.autoplayVideos && i2.slidePlayerPlay(e3), i2.trigger("slide_changed", { prev: l2, current: o2 }), T(i2.settings.afterSlideChange) && i2.settings.afterSlideChange.apply(i2, [l2, o2]);
          });
        else {
          var r2 = this.settings.slideEffect, a2 = r2 !== "none" ? this.settings.cssEfects[r2].in : r2;
          this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (a2 = this.settings.cssEfects.slideBack.in), g(e3, a2, function() {
            i2.settings.autoplayVideos && i2.slidePlayerPlay(e3), i2.trigger("slide_changed", { prev: l2, current: o2 }), T(i2.settings.afterSlideChange) && i2.settings.afterSlideChange.apply(i2, [l2, o2]);
          });
        }
        setTimeout(function() {
          i2.resize(e3);
        }, 100), h(e3, "current");
      } }, { key: "slideAnimateOut", value: function() {
        if (!this.prevActiveSlide)
          return false;
        var e3 = this.prevActiveSlide;
        d(e3, this.effectsClasses), h(e3, "prev");
        var t2 = this.settings.slideEffect, i2 = t2 !== "none" ? this.settings.cssEfects[t2].out : t2;
        this.slidePlayerPause(e3), this.trigger("slide_before_change", { prev: { index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, slideNode: this.prevActiveSlide, slideIndex: this.prevActiveSlideIndex, slideConfig: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig, trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, current: { index: this.index, slide: this.activeSlide, slideNode: this.activeSlide, slideIndex: this.index, slideConfig: this.elements[this.index].slideConfig, trigger: this.elements[this.index].node, player: this.getSlidePlayerInstance(this.index) } }), T(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{ index: this.prevActiveSlideIndex, slide: this.prevActiveSlide, player: this.getSlidePlayerInstance(this.prevActiveSlideIndex) }, { index: this.index, slide: this.activeSlide, player: this.getSlidePlayerInstance(this.index) }]), this.prevActiveSlideIndex > this.index && this.settings.slideEffect == "slide" && (i2 = this.settings.cssEfects.slideBack.out), g(e3, i2, function() {
          var t3 = e3.querySelector(".ginner-container"), i3 = e3.querySelector(".gslide-media"), n2 = e3.querySelector(".gslide-description");
          t3.style.transform = "", i3.style.transform = "", d(i3, "greset"), i3.style.opacity = "", n2 && (n2.style.opacity = ""), d(e3, "prev");
        });
      } }, { key: "getAllPlayers", value: function() {
        return this.videoPlayers;
      } }, { key: "getSlidePlayerInstance", value: function(e3) {
        var t2 = "gvideo" + e3, i2 = this.getAllPlayers();
        return !(!O(i2, t2) || !i2[t2]) && i2[t2];
      } }, { key: "stopSlideVideo", value: function(e3) {
        if (k(e3)) {
          var t2 = e3.querySelector(".gvideo-wrapper");
          t2 && (e3 = t2.getAttribute("data-index"));
        }
        console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var i2 = this.getSlidePlayerInstance(e3);
        i2 && i2.playing && i2.pause();
      } }, { key: "slidePlayerPause", value: function(e3) {
        if (k(e3)) {
          var t2 = e3.querySelector(".gvideo-wrapper");
          t2 && (e3 = t2.getAttribute("data-index"));
        }
        var i2 = this.getSlidePlayerInstance(e3);
        i2 && i2.playing && i2.pause();
      } }, { key: "playSlideVideo", value: function(e3) {
        if (k(e3)) {
          var t2 = e3.querySelector(".gvideo-wrapper");
          t2 && (e3 = t2.getAttribute("data-index"));
        }
        console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var i2 = this.getSlidePlayerInstance(e3);
        i2 && !i2.playing && i2.play();
      } }, { key: "slidePlayerPlay", value: function(e3) {
        if (k(e3)) {
          var t2 = e3.querySelector(".gvideo-wrapper");
          t2 && (e3 = t2.getAttribute("data-index"));
        }
        var i2 = this.getSlidePlayerInstance(e3);
        i2 && !i2.playing && (i2.play(), this.settings.autofocusVideos && i2.elements.container.focus());
      } }, { key: "setElements", value: function(e3) {
        var t2 = this;
        this.settings.elements = false;
        var i2 = [];
        e3 && e3.length && o(e3, function(e4, n2) {
          var s2 = new U(e4, t2, n2), o2 = s2.getConfig(), r2 = l({}, o2);
          r2.slideConfig = o2, r2.instance = s2, r2.index = n2, i2.push(r2);
        }), this.elements = i2, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (o(this.elements, function() {
          var e4 = m(t2.settings.slideHTML);
          t2.slidesContainer.appendChild(e4);
        }), this.showSlide(0, true)));
      } }, { key: "getElementIndex", value: function(e3) {
        var t2 = false;
        return o(this.elements, function(i2, n2) {
          if (O(i2, "node") && i2.node == e3)
            return t2 = n2, true;
        }), t2;
      } }, { key: "getElements", value: function() {
        var e3 = this, t2 = [];
        this.elements = this.elements ? this.elements : [], !I(this.settings.elements) && E(this.settings.elements) && this.settings.elements.length && o(this.settings.elements, function(i3, n2) {
          var s2 = new U(i3, e3, n2), o2 = s2.getConfig(), r2 = l({}, o2);
          r2.node = false, r2.index = n2, r2.instance = s2, r2.slideConfig = o2, t2.push(r2);
        });
        var i2 = false;
        return this.getSelector() && (i2 = document.querySelectorAll(this.getSelector())), i2 ? (o(i2, function(i3, n2) {
          var s2 = new U(i3, e3, n2), o2 = s2.getConfig(), r2 = l({}, o2);
          r2.node = i3, r2.index = n2, r2.instance = s2, r2.slideConfig = o2, r2.gallery = i3.getAttribute("data-gallery"), t2.push(r2);
        }), t2) : t2;
      } }, { key: "getGalleryElements", value: function(e3, t2) {
        return e3.filter(function(e4) {
          return e4.gallery == t2;
        });
      } }, { key: "getSelector", value: function() {
        return !this.settings.elements && (this.settings.selector && this.settings.selector.substring(0, 5) == "data-" ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
      } }, { key: "getActiveSlide", value: function() {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      } }, { key: "getActiveSlideIndex", value: function() {
        return this.index;
      } }, { key: "getAnimationClasses", value: function() {
        var e3 = [];
        for (var t2 in this.settings.cssEfects)
          if (this.settings.cssEfects.hasOwnProperty(t2)) {
            var i2 = this.settings.cssEfects[t2];
            e3.push("g".concat(i2.in)), e3.push("g".concat(i2.out));
          }
        return e3.join(" ");
      } }, { key: "build", value: function() {
        var e3 = this;
        if (this.built)
          return false;
        var t2 = document.body.childNodes, i2 = [];
        o(t2, function(e4) {
          e4.parentNode == document.body && e4.nodeName.charAt(0) !== "#" && e4.hasAttribute && !e4.hasAttribute("aria-hidden") && (i2.push(e4), e4.setAttribute("aria-hidden", "true"));
        });
        var n2 = O(this.settings.svg, "next") ? this.settings.svg.next : "", s2 = O(this.settings.svg, "prev") ? this.settings.svg.prev : "", l2 = O(this.settings.svg, "close") ? this.settings.svg.close : "", r2 = this.settings.lightboxHTML;
        r2 = m(r2 = (r2 = (r2 = r2.replace(/{nextSVG}/g, n2)).replace(/{prevSVG}/g, s2)).replace(/{closeSVG}/g, l2)), document.body.appendChild(r2);
        var d2 = document.getElementById("glightbox-body");
        this.modal = d2;
        var g2 = d2.querySelector(".gclose");
        this.prevButton = d2.querySelector(".gprev"), this.nextButton = d2.querySelector(".gnext"), this.overlay = d2.querySelector(".goverlay"), this.loader = d2.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = i2, this.events = {}, h(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && g2 && (this.events.close = a("click", { onElement: g2, withCallback: function(t3, i3) {
          t3.preventDefault(), e3.close();
        } })), g2 && !this.settings.closeButton && g2.parentNode.removeChild(g2), this.nextButton && (this.events.next = a("click", { onElement: this.nextButton, withCallback: function(t3, i3) {
          t3.preventDefault(), e3.nextSlide();
        } })), this.prevButton && (this.events.prev = a("click", { onElement: this.prevButton, withCallback: function(t3, i3) {
          t3.preventDefault(), e3.prevSlide();
        } })), this.settings.closeOnOutsideClick && (this.events.outClose = a("click", { onElement: d2, withCallback: function(t3, i3) {
          e3.preventOutsideClick || c(document.body, "glightbox-mobile") || u(t3.target, ".ginner-container") || u(t3.target, ".gbtn") || c(t3.target, "gnext") || c(t3.target, "gprev") || e3.close();
        } })), o(this.elements, function(t3, i3) {
          e3.slidesContainer.appendChild(t3.instance.create()), t3.slideNode = e3.slidesContainer.querySelectorAll(".gslide")[i3];
        }), K && h(document.body, "glightbox-touch"), this.events.resize = a("resize", { onElement: window, withCallback: function() {
          e3.resize();
        } }), this.built = true;
      } }, { key: "resize", value: function() {
        var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if ((e3 = e3 || this.activeSlide) && !c(e3, "zoomed")) {
          var t2 = y(), i2 = e3.querySelector(".gvideo-wrapper"), n2 = e3.querySelector(".gslide-image"), s2 = this.slideDescription, l2 = t2.width, o2 = t2.height;
          if (l2 <= 768 ? h(document.body, "glightbox-mobile") : d(document.body, "glightbox-mobile"), i2 || n2) {
            var r2 = false;
            if (s2 && (c(s2, "description-bottom") || c(s2, "description-top")) && !c(s2, "gabsolute") && (r2 = true), n2) {
              if (l2 <= 768)
                n2.querySelector("img");
              else if (r2) {
                var a2 = s2.offsetHeight, u2 = n2.querySelector("img");
                u2.setAttribute("style", "max-height: calc(100vh - ".concat(a2, "px)")), s2.setAttribute("style", "max-width: ".concat(u2.offsetWidth, "px;"));
              }
            }
            if (i2) {
              var g2 = O(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
              if (!g2) {
                var v2 = i2.clientWidth, f2 = i2.clientHeight, p3 = v2 / f2;
                g2 = "".concat(v2 / p3, ":").concat(f2 / p3);
              }
              var m2 = g2.split(":"), x2 = this.settings.videosWidth, b2 = this.settings.videosWidth, S2 = (b2 = z(x2) || x2.indexOf("px") !== -1 ? parseInt(x2) : x2.indexOf("vw") !== -1 ? l2 * parseInt(x2) / 100 : x2.indexOf("vh") !== -1 ? o2 * parseInt(x2) / 100 : x2.indexOf("%") !== -1 ? l2 * parseInt(x2) / 100 : parseInt(i2.clientWidth)) / (parseInt(m2[0]) / parseInt(m2[1]));
              if (S2 = Math.floor(S2), r2 && (o2 -= s2.offsetHeight), b2 > l2 || S2 > o2 || o2 < S2 && l2 > b2) {
                var w2 = i2.offsetWidth, T2 = i2.offsetHeight, C2 = o2 / T2, k2 = { width: w2 * C2, height: T2 * C2 };
                i2.parentNode.setAttribute("style", "max-width: ".concat(k2.width, "px")), r2 && s2.setAttribute("style", "max-width: ".concat(k2.width, "px;"));
              } else
                i2.parentNode.style.maxWidth = "".concat(x2), r2 && s2.setAttribute("style", "max-width: ".concat(x2, ";"));
            }
          }
        }
      } }, { key: "reload", value: function() {
        this.init();
      } }, { key: "updateNavigationClasses", value: function() {
        var e3 = this.loop();
        d(this.nextButton, "disabled"), d(this.prevButton, "disabled"), this.index == 0 && this.elements.length - 1 == 0 ? (h(this.prevButton, "disabled"), h(this.nextButton, "disabled")) : this.index !== 0 || e3 ? this.index !== this.elements.length - 1 || e3 || h(this.nextButton, "disabled") : h(this.prevButton, "disabled");
      } }, { key: "loop", value: function() {
        var e3 = O(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return e3 = O(this.settings, "loop") ? this.settings.loop : e3, e3;
      } }, { key: "close", value: function() {
        var e3 = this;
        if (!this.lightboxOpen) {
          if (this.events) {
            for (var t2 in this.events)
              this.events.hasOwnProperty(t2) && this.events[t2].destroy();
            this.events = null;
          }
          return false;
        }
        if (this.closing)
          return false;
        this.closing = true, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && o(this.bodyHiddenChildElms, function(e4) {
          e4.removeAttribute("aria-hidden");
        }), h(this.modal, "glightbox-closing"), g(this.overlay, this.settings.openEffect == "none" ? "none" : this.settings.cssEfects.fade.out), g(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function() {
          if (e3.activeSlide = null, e3.prevActiveSlideIndex = null, e3.prevActiveSlide = null, e3.built = false, e3.events) {
            for (var t3 in e3.events)
              e3.events.hasOwnProperty(t3) && e3.events[t3].destroy();
            e3.events = null;
          }
          var i2 = document.body;
          d(Q, "glightbox-open"), d(i2, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), e3.modal.parentNode.removeChild(e3.modal), e3.trigger("close"), T(e3.settings.onClose) && e3.settings.onClose();
          var n2 = document.querySelector(".gcss-styles");
          n2 && n2.parentNode.removeChild(n2), e3.lightboxOpen = false, e3.closing = null;
        });
      } }, { key: "destroy", value: function() {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      } }, { key: "on", value: function(e3, t2) {
        var i2 = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
        if (!e3 || !T(t2))
          throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({ evt: e3, once: i2, callback: t2 });
      } }, { key: "once", value: function(e3, t2) {
        this.on(e3, t2, true);
      } }, { key: "trigger", value: function(e3) {
        var t2 = this, i2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n2 = [];
        o(this.apiEvents, function(t3, s2) {
          var l2 = t3.evt, o2 = t3.once, r2 = t3.callback;
          l2 == e3 && (r2(i2), o2 && n2.push(s2));
        }), n2.length && o(n2, function(e4) {
          return t2.apiEvents.splice(e4, 1);
        });
      } }, { key: "clearAllEvents", value: function() {
        this.apiEvents.splice(0, this.apiEvents.length);
      } }, { key: "version", value: function() {
        return "3.1.1";
      } }]), e2;
    }();
    return function() {
      var e2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t2 = new te(e2);
      return t2.init(), t2;
    };
  });
})(glightbox_min);
var GLightbox = glightbox_min.exports;
export { Fragment as F, Glide as G, createBaseVNode as a, createVNode as b, createElementBlock as c, createStaticVNode as d, createTextVNode as e, popScopeId as f, onMounted as g, GLightbox as h, renderList as i, createCommentVNode as j, createApp as k, normalizeClass as n, openBlock as o, pushScopeId as p, renderSlot as r, toDisplayString as t, withCtx as w };
