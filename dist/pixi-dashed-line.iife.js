"use strict";
var PixiDashLine = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/pixi.js/lib/extensions/Extensions.mjs
  var ExtensionType, normalizeExtension, normalizeExtensionPriority, extensions;
  var init_Extensions = __esm({
    "node_modules/pixi.js/lib/extensions/Extensions.mjs"() {
      "use strict";
      ExtensionType = /* @__PURE__ */ ((ExtensionType2) => {
        ExtensionType2["Application"] = "application";
        ExtensionType2["WebGLPipes"] = "webgl-pipes";
        ExtensionType2["WebGLPipesAdaptor"] = "webgl-pipes-adaptor";
        ExtensionType2["WebGLSystem"] = "webgl-system";
        ExtensionType2["WebGPUPipes"] = "webgpu-pipes";
        ExtensionType2["WebGPUPipesAdaptor"] = "webgpu-pipes-adaptor";
        ExtensionType2["WebGPUSystem"] = "webgpu-system";
        ExtensionType2["CanvasSystem"] = "canvas-system";
        ExtensionType2["CanvasPipesAdaptor"] = "canvas-pipes-adaptor";
        ExtensionType2["CanvasPipes"] = "canvas-pipes";
        ExtensionType2["Asset"] = "asset";
        ExtensionType2["LoadParser"] = "load-parser";
        ExtensionType2["ResolveParser"] = "resolve-parser";
        ExtensionType2["CacheParser"] = "cache-parser";
        ExtensionType2["DetectionParser"] = "detection-parser";
        ExtensionType2["MaskEffect"] = "mask-effect";
        ExtensionType2["BlendMode"] = "blend-mode";
        ExtensionType2["TextureSource"] = "texture-source";
        ExtensionType2["Environment"] = "environment";
        ExtensionType2["ShapeBuilder"] = "shape-builder";
        ExtensionType2["Batcher"] = "batcher";
        return ExtensionType2;
      })(ExtensionType || {});
      normalizeExtension = (ext) => {
        if (typeof ext === "function" || typeof ext === "object" && ext.extension) {
          if (!ext.extension) {
            throw new Error("Extension class must have an extension object");
          }
          const metadata = typeof ext.extension !== "object" ? { type: ext.extension } : ext.extension;
          ext = { ...metadata, ref: ext };
        }
        if (typeof ext === "object") {
          ext = { ...ext };
        } else {
          throw new Error("Invalid extension type");
        }
        if (typeof ext.type === "string") {
          ext.type = [ext.type];
        }
        return ext;
      };
      normalizeExtensionPriority = (ext, defaultPriority) => normalizeExtension(ext).priority ?? defaultPriority;
      extensions = {
        /** @ignore */
        _addHandlers: {},
        /** @ignore */
        _removeHandlers: {},
        /** @ignore */
        _queue: {},
        /**
         * Remove extensions from PixiJS.
         * @param extensions - Extensions to be removed.
         * @returns {extensions} For chaining.
         */
        remove(...extensions2) {
          extensions2.map(normalizeExtension).forEach((ext) => {
            ext.type.forEach((type) => this._removeHandlers[type]?.(ext));
          });
          return this;
        },
        /**
         * Register new extensions with PixiJS.
         * @param extensions - The spread of extensions to add to PixiJS.
         * @returns {extensions} For chaining.
         */
        add(...extensions2) {
          extensions2.map(normalizeExtension).forEach((ext) => {
            ext.type.forEach((type) => {
              const handlers = this._addHandlers;
              const queue = this._queue;
              if (!handlers[type]) {
                queue[type] = queue[type] || [];
                queue[type]?.push(ext);
              } else {
                handlers[type]?.(ext);
              }
            });
          });
          return this;
        },
        /**
         * Internal method to handle extensions by name.
         * @param type - The extension type.
         * @param onAdd  - Function handler when extensions are added/registered {@link StrictExtensionFormat}.
         * @param onRemove  - Function handler when extensions are removed/unregistered {@link StrictExtensionFormat}.
         * @returns {extensions} For chaining.
         */
        handle(type, onAdd, onRemove) {
          const addHandlers = this._addHandlers;
          const removeHandlers = this._removeHandlers;
          if (addHandlers[type] || removeHandlers[type]) {
            throw new Error(`Extension type ${type} already has a handler`);
          }
          addHandlers[type] = onAdd;
          removeHandlers[type] = onRemove;
          const queue = this._queue;
          if (queue[type]) {
            queue[type]?.forEach((ext) => onAdd(ext));
            delete queue[type];
          }
          return this;
        },
        /**
         * Handle a type, but using a map by `name` property.
         * @param type - Type of extension to handle.
         * @param map - The object map of named extensions.
         * @returns {extensions} For chaining.
         */
        handleByMap(type, map) {
          return this.handle(
            type,
            (extension) => {
              if (extension.name) {
                map[extension.name] = extension.ref;
              }
            },
            (extension) => {
              if (extension.name) {
                delete map[extension.name];
              }
            }
          );
        },
        /**
         * Handle a type, but using a list of extensions with a `name` property.
         * @param type - Type of extension to handle.
         * @param map - The array of named extensions.
         * @param defaultPriority - Fallback priority if none is defined.
         * @returns {extensions} For chaining.
         */
        handleByNamedList(type, map, defaultPriority = -1) {
          return this.handle(
            type,
            (extension) => {
              const index = map.findIndex((item) => item.name === extension.name);
              if (index >= 0)
                return;
              map.push({ name: extension.name, value: extension.ref });
              map.sort((a2, b2) => normalizeExtensionPriority(b2.value, defaultPriority) - normalizeExtensionPriority(a2.value, defaultPriority));
            },
            (extension) => {
              const index = map.findIndex((item) => item.name === extension.name);
              if (index !== -1) {
                map.splice(index, 1);
              }
            }
          );
        },
        /**
         * Handle a type, but using a list of extensions.
         * @param type - Type of extension to handle.
         * @param list - The list of extensions.
         * @param defaultPriority - The default priority to use if none is specified.
         * @returns {extensions} For chaining.
         */
        handleByList(type, list, defaultPriority = -1) {
          return this.handle(
            type,
            (extension) => {
              if (list.includes(extension.ref)) {
                return;
              }
              list.push(extension.ref);
              list.sort((a2, b2) => normalizeExtensionPriority(b2, defaultPriority) - normalizeExtensionPriority(a2, defaultPriority));
            },
            (extension) => {
              const index = list.indexOf(extension.ref);
              if (index !== -1) {
                list.splice(index, 1);
              }
            }
          );
        }
      };
    }
  });

  // node_modules/pixi.js/node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/pixi.js/node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context2, once) {
        this.fn = fn;
        this.context = context2;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context2, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context2 || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i2 = 0, l2 = handlers.length, ee = new Array(l2); i2 < l2; i2++) {
          ee[i2] = handlers[i2].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i2;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i2 = 1, args = new Array(len - 1); i2 < len; i2++) {
            args[i2 - 1] = arguments[i2];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j2;
          for (i2 = 0; i2 < length; i2++) {
            if (listeners[i2].once) this.removeListener(event, listeners[i2].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i2].fn.call(listeners[i2].context);
                break;
              case 2:
                listeners[i2].fn.call(listeners[i2].context, a1);
                break;
              case 3:
                listeners[i2].fn.call(listeners[i2].context, a1, a2);
                break;
              case 4:
                listeners[i2].fn.call(listeners[i2].context, a1, a2, a3);
                break;
              default:
                if (!args) for (j2 = 1, args = new Array(len - 1); j2 < len; j2++) {
                  args[j2 - 1] = arguments[j2];
                }
                listeners[i2].fn.apply(listeners[i2].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context2) {
        return addListener(this, event, fn, context2, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context2) {
        return addListener(this, event, fn, context2, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context2, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context2 || listeners.context === context2)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i2 = 0, events = [], length = listeners.length; i2 < length; i2++) {
            if (listeners[i2].fn !== fn || once && !listeners[i2].once || context2 && listeners[i2].context !== context2) {
              events.push(listeners[i2]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // node_modules/pixi.js/node_modules/eventemitter3/index.mjs
  var import_index, eventemitter3_default;
  var init_eventemitter3 = __esm({
    "node_modules/pixi.js/node_modules/eventemitter3/index.mjs"() {
      import_index = __toESM(require_eventemitter3(), 1);
      eventemitter3_default = import_index.default;
    }
  });

  // node_modules/@pixi/colord/index.mjs
  var r, t, n, e, u, a, o, i, s, h, b, g, d, f, c, l, p, v, m, y, N, x, M, H, $, j, w, S, k;
  var init_colord = __esm({
    "node_modules/@pixi/colord/index.mjs"() {
      r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
      t = function(r2) {
        return "string" == typeof r2 ? r2.length > 0 : "number" == typeof r2;
      };
      n = function(r2, t2, n2) {
        return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
      };
      e = function(r2, t2, n2) {
        return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
      };
      u = function(r2) {
        return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
      };
      a = function(r2) {
        return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
      };
      o = function(r2) {
        return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
      };
      i = /^#([0-9a-f]{3,8})$/i;
      s = function(r2) {
        var t2 = r2.toString(16);
        return t2.length < 2 ? "0" + t2 : t2;
      };
      h = function(r2) {
        var t2 = r2.r, n2 = r2.g, e2 = r2.b, u2 = r2.a, a2 = Math.max(t2, n2, e2), o2 = a2 - Math.min(t2, n2, e2), i2 = o2 ? a2 === t2 ? (n2 - e2) / o2 : a2 === n2 ? 2 + (e2 - t2) / o2 : 4 + (t2 - n2) / o2 : 0;
        return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o2 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
      };
      b = function(r2) {
        var t2 = r2.h, n2 = r2.s, e2 = r2.v, u2 = r2.a;
        t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
        var a2 = Math.floor(t2), o2 = e2 * (1 - n2), i2 = e2 * (1 - (t2 - a2) * n2), s2 = e2 * (1 - (1 - t2 + a2) * n2), h2 = a2 % 6;
        return { r: 255 * [e2, i2, o2, o2, s2, e2][h2], g: 255 * [s2, e2, e2, i2, o2, o2][h2], b: 255 * [o2, o2, s2, e2, e2, i2][h2], a: u2 };
      };
      g = function(r2) {
        return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
      };
      d = function(r2) {
        return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
      };
      f = function(r2) {
        return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
        var t2, n2, e2;
      };
      c = function(r2) {
        return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
        var t2, n2, e2, u2;
      };
      l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
      p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
      v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
      m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
      y = { string: [[function(r2) {
        var t2 = i.exec(r2);
        return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: 4 === r2.length ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : 6 === r2.length || 8 === r2.length ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: 8 === r2.length ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
      }, "hex"], [function(r2) {
        var t2 = v.exec(r2) || m.exec(r2);
        return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : a({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: void 0 === t2[7] ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
      }, "rgb"], [function(t2) {
        var n2 = l.exec(t2) || p.exec(t2);
        if (!n2) return null;
        var e2, u2, a2 = g({ h: (e2 = n2[1], u2 = n2[2], void 0 === u2 && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: void 0 === n2[5] ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
        return f(a2);
      }, "hsl"]], object: [[function(r2) {
        var n2 = r2.r, e2 = r2.g, u2 = r2.b, o2 = r2.a, i2 = void 0 === o2 ? 1 : o2;
        return t(n2) && t(e2) && t(u2) ? a({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(i2) }) : null;
      }, "rgb"], [function(r2) {
        var n2 = r2.h, e2 = r2.s, u2 = r2.l, a2 = r2.a, o2 = void 0 === a2 ? 1 : a2;
        if (!t(n2) || !t(e2) || !t(u2)) return null;
        var i2 = g({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(o2) });
        return f(i2);
      }, "hsl"], [function(r2) {
        var n2 = r2.h, a2 = r2.s, o2 = r2.v, i2 = r2.a, s2 = void 0 === i2 ? 1 : i2;
        if (!t(n2) || !t(a2) || !t(o2)) return null;
        var h2 = function(r3) {
          return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
        }({ h: Number(n2), s: Number(a2), v: Number(o2), a: Number(s2) });
        return b(h2);
      }, "hsv"]] };
      N = function(r2, t2) {
        for (var n2 = 0; n2 < t2.length; n2++) {
          var e2 = t2[n2][0](r2);
          if (e2) return [e2, t2[n2][1]];
        }
        return [null, void 0];
      };
      x = function(r2) {
        return "string" == typeof r2 ? N(r2.trim(), y.string) : "object" == typeof r2 && null !== r2 ? N(r2, y.object) : [null, void 0];
      };
      M = function(r2, t2) {
        var n2 = c(r2);
        return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
      };
      H = function(r2) {
        return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1e3 / 255;
      };
      $ = function(r2, t2) {
        var n2 = c(r2);
        return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
      };
      j = function() {
        function r2(r3) {
          this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
        }
        return r2.prototype.isValid = function() {
          return null !== this.parsed;
        }, r2.prototype.brightness = function() {
          return n(H(this.rgba), 2);
        }, r2.prototype.isDark = function() {
          return H(this.rgba) < 0.5;
        }, r2.prototype.isLight = function() {
          return H(this.rgba) >= 0.5;
        }, r2.prototype.toHex = function() {
          return r3 = o(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s(n(255 * a2)) : "", "#" + s(t2) + s(e2) + s(u2) + i2;
          var r3, t2, e2, u2, a2, i2;
        }, r2.prototype.toRgb = function() {
          return o(this.rgba);
        }, r2.prototype.toRgbString = function() {
          return r3 = o(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
          var r3, t2, n2, e2, u2;
        }, r2.prototype.toHsl = function() {
          return d(c(this.rgba));
        }, r2.prototype.toHslString = function() {
          return r3 = d(c(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
          var r3, t2, n2, e2, u2;
        }, r2.prototype.toHsv = function() {
          return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
          var r3;
        }, r2.prototype.invert = function() {
          return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
          var r3;
        }, r2.prototype.saturate = function(r3) {
          return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, r3));
        }, r2.prototype.desaturate = function(r3) {
          return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, -r3));
        }, r2.prototype.grayscale = function() {
          return w(M(this.rgba, -1));
        }, r2.prototype.lighten = function(r3) {
          return void 0 === r3 && (r3 = 0.1), w($(this.rgba, r3));
        }, r2.prototype.darken = function(r3) {
          return void 0 === r3 && (r3 = 0.1), w($(this.rgba, -r3));
        }, r2.prototype.rotate = function(r3) {
          return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
        }, r2.prototype.alpha = function(r3) {
          return "number" == typeof r3 ? w({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
          var t2;
        }, r2.prototype.hue = function(r3) {
          var t2 = c(this.rgba);
          return "number" == typeof r3 ? w({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
        }, r2.prototype.isEqual = function(r3) {
          return this.toHex() === w(r3).toHex();
        }, r2;
      }();
      w = function(r2) {
        return r2 instanceof j ? r2 : new j(r2);
      };
      S = [];
      k = function(r2) {
        r2.forEach(function(r3) {
          S.indexOf(r3) < 0 && (r3(j, y), S.push(r3));
        });
      };
    }
  });

  // node_modules/@pixi/colord/plugins/names.mjs
  function names_default(e2, f2) {
    var a2 = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, r2 = {};
    for (var d2 in a2) r2[a2[d2]] = d2;
    var l2 = {};
    e2.prototype.toName = function(f3) {
      if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
      var d3, i2, n2 = r2[this.toHex()];
      if (n2) return n2;
      if (null == f3 ? void 0 : f3.closest) {
        var o2 = this.toRgb(), t2 = 1 / 0, b2 = "black";
        if (!l2.length) for (var c2 in a2) l2[c2] = new e2(a2[c2]).toRgb();
        for (var g2 in a2) {
          var u2 = (d3 = o2, i2 = l2[g2], Math.pow(d3.r - i2.r, 2) + Math.pow(d3.g - i2.g, 2) + Math.pow(d3.b - i2.b, 2));
          u2 < t2 && (t2 = u2, b2 = g2);
        }
        return b2;
      }
    };
    f2.string.push([function(f3) {
      var r3 = f3.toLowerCase(), d3 = "transparent" === r3 ? "#0000" : a2[r3];
      return d3 ? new e2(d3).toRgb() : null;
    }, "name"]);
  }
  var init_names = __esm({
    "node_modules/@pixi/colord/plugins/names.mjs"() {
    }
  });

  // node_modules/pixi.js/lib/color/Color.mjs
  var _Color, Color;
  var init_Color = __esm({
    "node_modules/pixi.js/lib/color/Color.mjs"() {
      init_colord();
      init_names();
      k([names_default]);
      _Color = class _Color2 {
        /**
         * @param {ColorSource} value - Optional value to use, if not provided, white is used.
         */
        constructor(value = 16777215) {
          this._value = null;
          this._components = new Float32Array(4);
          this._components.fill(1);
          this._int = 16777215;
          this.value = value;
        }
        /** Get red component (0 - 1) */
        get red() {
          return this._components[0];
        }
        /** Get green component (0 - 1) */
        get green() {
          return this._components[1];
        }
        /** Get blue component (0 - 1) */
        get blue() {
          return this._components[2];
        }
        /** Get alpha component (0 - 1) */
        get alpha() {
          return this._components[3];
        }
        /**
         * Set the value, suitable for chaining
         * @param value
         * @see Color.value
         */
        setValue(value) {
          this.value = value;
          return this;
        }
        /**
         * The current color source.
         *
         * When setting:
         * - Setting to an instance of `Color` will copy its color source and components.
         * - Otherwise, `Color` will try to normalize the color source and set the components.
         *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
         *
         * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
         * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
         *
         * When getting:
         * - A return value of `null` means the previous value was overridden (e.g., {@link Color.multiply multiply},
         *   {@link Color.premultiply premultiply} or {@link Color.round round}).
         * - Otherwise, the color source used when setting is returned.
         */
        set value(value) {
          if (value instanceof _Color2) {
            this._value = this._cloneSource(value._value);
            this._int = value._int;
            this._components.set(value._components);
          } else if (value === null) {
            throw new Error("Cannot set Color#value to null");
          } else if (this._value === null || !this._isSourceEqual(this._value, value)) {
            this._value = this._cloneSource(value);
            this._normalize(this._value);
          }
        }
        get value() {
          return this._value;
        }
        /**
         * Copy a color source internally.
         * @param value - Color source
         */
        _cloneSource(value) {
          if (typeof value === "string" || typeof value === "number" || value instanceof Number || value === null) {
            return value;
          } else if (Array.isArray(value) || ArrayBuffer.isView(value)) {
            return value.slice(0);
          } else if (typeof value === "object" && value !== null) {
            return { ...value };
          }
          return value;
        }
        /**
         * Equality check for color sources.
         * @param value1 - First color source
         * @param value2 - Second color source
         * @returns `true` if the color sources are equal, `false` otherwise.
         */
        _isSourceEqual(value1, value2) {
          const type1 = typeof value1;
          const type2 = typeof value2;
          if (type1 !== type2) {
            return false;
          } else if (type1 === "number" || type1 === "string" || value1 instanceof Number) {
            return value1 === value2;
          } else if (Array.isArray(value1) && Array.isArray(value2) || ArrayBuffer.isView(value1) && ArrayBuffer.isView(value2)) {
            if (value1.length !== value2.length) {
              return false;
            }
            return value1.every((v2, i2) => v2 === value2[i2]);
          } else if (value1 !== null && value2 !== null) {
            const keys1 = Object.keys(value1);
            const keys2 = Object.keys(value2);
            if (keys1.length !== keys2.length) {
              return false;
            }
            return keys1.every((key) => value1[key] === value2[key]);
          }
          return value1 === value2;
        }
        /**
         * Convert to a RGBA color object.
         * @example
         * import { Color } from 'pixi.js';
         * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
         */
        toRgba() {
          const [r2, g2, b2, a2] = this._components;
          return { r: r2, g: g2, b: b2, a: a2 };
        }
        /**
         * Convert to a RGB color object.
         * @example
         * import { Color } from 'pixi.js';
         * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
         */
        toRgb() {
          const [r2, g2, b2] = this._components;
          return { r: r2, g: g2, b: b2 };
        }
        /** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */
        toRgbaString() {
          const [r2, g2, b2] = this.toUint8RgbArray();
          return `rgba(${r2},${g2},${b2},${this.alpha})`;
        }
        toUint8RgbArray(out2) {
          const [r2, g2, b2] = this._components;
          if (!this._arrayRgb) {
            this._arrayRgb = [];
          }
          out2 = out2 || this._arrayRgb;
          out2[0] = Math.round(r2 * 255);
          out2[1] = Math.round(g2 * 255);
          out2[2] = Math.round(b2 * 255);
          return out2;
        }
        toArray(out2) {
          if (!this._arrayRgba) {
            this._arrayRgba = [];
          }
          out2 = out2 || this._arrayRgba;
          const [r2, g2, b2, a2] = this._components;
          out2[0] = r2;
          out2[1] = g2;
          out2[2] = b2;
          out2[3] = a2;
          return out2;
        }
        toRgbArray(out2) {
          if (!this._arrayRgb) {
            this._arrayRgb = [];
          }
          out2 = out2 || this._arrayRgb;
          const [r2, g2, b2] = this._components;
          out2[0] = r2;
          out2[1] = g2;
          out2[2] = b2;
          return out2;
        }
        /**
         * Convert to a hexadecimal number.
         * @example
         * import { Color } from 'pixi.js';
         * new Color('white').toNumber(); // returns 16777215
         */
        toNumber() {
          return this._int;
        }
        /**
         * Convert to a BGR number
         * @example
         * import { Color } from 'pixi.js';
         * new Color(0xffcc99).toBgrNumber(); // returns 0x99ccff
         */
        toBgrNumber() {
          const [r2, g2, b2] = this.toUint8RgbArray();
          return (b2 << 16) + (g2 << 8) + r2;
        }
        /**
         * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
         * @example
         * import { Color } from 'pixi.js';
         * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
         * @returns {number} - The color as a number in little endian format.
         */
        toLittleEndianNumber() {
          const value = this._int;
          return (value >> 16) + (value & 65280) + ((value & 255) << 16);
        }
        /**
         * Multiply with another color. This action is destructive, and will
         * override the previous `value` property to be `null`.
         * @param {ColorSource} value - The color to multiply by.
         */
        multiply(value) {
          const [r2, g2, b2, a2] = _Color2._temp.setValue(value)._components;
          this._components[0] *= r2;
          this._components[1] *= g2;
          this._components[2] *= b2;
          this._components[3] *= a2;
          this._refreshInt();
          this._value = null;
          return this;
        }
        /**
         * Converts color to a premultiplied alpha format. This action is destructive, and will
         * override the previous `value` property to be `null`.
         * @param alpha - The alpha to multiply by.
         * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
         * @returns {Color} - Itself.
         */
        premultiply(alpha, applyToRGB = true) {
          if (applyToRGB) {
            this._components[0] *= alpha;
            this._components[1] *= alpha;
            this._components[2] *= alpha;
          }
          this._components[3] = alpha;
          this._refreshInt();
          this._value = null;
          return this;
        }
        /**
         * Premultiplies alpha with current color.
         * @param {number} alpha - The alpha to multiply by.
         * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
         * @returns {number} tint multiplied by alpha
         */
        toPremultiplied(alpha, applyToRGB = true) {
          if (alpha === 1) {
            return (255 << 24) + this._int;
          }
          if (alpha === 0) {
            return applyToRGB ? 0 : this._int;
          }
          let r2 = this._int >> 16 & 255;
          let g2 = this._int >> 8 & 255;
          let b2 = this._int & 255;
          if (applyToRGB) {
            r2 = r2 * alpha + 0.5 | 0;
            g2 = g2 * alpha + 0.5 | 0;
            b2 = b2 * alpha + 0.5 | 0;
          }
          return (alpha * 255 << 24) + (r2 << 16) + (g2 << 8) + b2;
        }
        /**
         * Convert to a hexadecimal string.
         * @example
         * import { Color } from 'pixi.js';
         * new Color('white').toHex(); // returns "#ffffff"
         */
        toHex() {
          const hexString = this._int.toString(16);
          return `#${"000000".substring(0, 6 - hexString.length) + hexString}`;
        }
        /**
         * Convert to a hexadecimal string with alpha.
         * @example
         * import { Color } from 'pixi.js';
         * new Color('white').toHexa(); // returns "#ffffffff"
         */
        toHexa() {
          const alphaValue = Math.round(this._components[3] * 255);
          const alphaString = alphaValue.toString(16);
          return this.toHex() + "00".substring(0, 2 - alphaString.length) + alphaString;
        }
        /**
         * Set alpha, suitable for chaining.
         * @param alpha
         */
        setAlpha(alpha) {
          this._components[3] = this._clamp(alpha);
          return this;
        }
        /**
         * Normalize the input value into rgba
         * @param value - Input value
         */
        _normalize(value) {
          let r2;
          let g2;
          let b2;
          let a2;
          if ((typeof value === "number" || value instanceof Number) && value >= 0 && value <= 16777215) {
            const int = value;
            r2 = (int >> 16 & 255) / 255;
            g2 = (int >> 8 & 255) / 255;
            b2 = (int & 255) / 255;
            a2 = 1;
          } else if ((Array.isArray(value) || value instanceof Float32Array) && value.length >= 3 && value.length <= 4) {
            value = this._clamp(value);
            [r2, g2, b2, a2 = 1] = value;
          } else if ((value instanceof Uint8Array || value instanceof Uint8ClampedArray) && value.length >= 3 && value.length <= 4) {
            value = this._clamp(value, 0, 255);
            [r2, g2, b2, a2 = 255] = value;
            r2 /= 255;
            g2 /= 255;
            b2 /= 255;
            a2 /= 255;
          } else if (typeof value === "string" || typeof value === "object") {
            if (typeof value === "string") {
              const match = _Color2.HEX_PATTERN.exec(value);
              if (match) {
                value = `#${match[2]}`;
              }
            }
            const color = w(value);
            if (color.isValid()) {
              ({ r: r2, g: g2, b: b2, a: a2 } = color.rgba);
              r2 /= 255;
              g2 /= 255;
              b2 /= 255;
            }
          }
          if (r2 !== void 0) {
            this._components[0] = r2;
            this._components[1] = g2;
            this._components[2] = b2;
            this._components[3] = a2;
            this._refreshInt();
          } else {
            throw new Error(`Unable to convert color ${value}`);
          }
        }
        /** Refresh the internal color rgb number */
        _refreshInt() {
          this._clamp(this._components);
          const [r2, g2, b2] = this._components;
          this._int = (r2 * 255 << 16) + (g2 * 255 << 8) + (b2 * 255 | 0);
        }
        /**
         * Clamps values to a range. Will override original values
         * @param value - Value(s) to clamp
         * @param min - Minimum value
         * @param max - Maximum value
         */
        _clamp(value, min = 0, max = 1) {
          if (typeof value === "number") {
            return Math.min(Math.max(value, min), max);
          }
          value.forEach((v2, i2) => {
            value[i2] = Math.min(Math.max(v2, min), max);
          });
          return value;
        }
        /**
         * Check if the value is a color-like object
         * @param value - Value to check
         * @returns True if the value is a color-like object
         * @static
         * @example
         * import { Color } from 'pixi.js';
         * Color.isColorLike('white'); // returns true
         * Color.isColorLike(0xffffff); // returns true
         * Color.isColorLike([1, 1, 1]); // returns true
         */
        static isColorLike(value) {
          return typeof value === "number" || typeof value === "string" || value instanceof Number || value instanceof _Color2 || Array.isArray(value) || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Float32Array || value.r !== void 0 && value.g !== void 0 && value.b !== void 0 || value.r !== void 0 && value.g !== void 0 && value.b !== void 0 && value.a !== void 0 || value.h !== void 0 && value.s !== void 0 && value.l !== void 0 || value.h !== void 0 && value.s !== void 0 && value.l !== void 0 && value.a !== void 0 || value.h !== void 0 && value.s !== void 0 && value.v !== void 0 || value.h !== void 0 && value.s !== void 0 && value.v !== void 0 && value.a !== void 0;
        }
      };
      _Color.shared = new _Color();
      _Color._temp = new _Color();
      _Color.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
      Color = _Color;
    }
  });

  // node_modules/pixi.js/lib/culling/cullingMixin.mjs
  var cullingMixin;
  var init_cullingMixin = __esm({
    "node_modules/pixi.js/lib/culling/cullingMixin.mjs"() {
      "use strict";
      cullingMixin = {
        cullArea: null,
        cullable: false,
        cullableChildren: true
      };
    }
  });

  // node_modules/pixi.js/lib/maths/misc/const.mjs
  var PI_2, RAD_TO_DEG, DEG_TO_RAD;
  var init_const = __esm({
    "node_modules/pixi.js/lib/maths/misc/const.mjs"() {
      "use strict";
      PI_2 = Math.PI * 2;
      RAD_TO_DEG = 180 / Math.PI;
      DEG_TO_RAD = Math.PI / 180;
    }
  });

  // node_modules/pixi.js/lib/maths/point/Point.mjs
  var Point, tempPoint;
  var init_Point = __esm({
    "node_modules/pixi.js/lib/maths/point/Point.mjs"() {
      "use strict";
      Point = class _Point {
        /**
         * Creates a new `Point`
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=0] - position of the point on the y axis
         */
        constructor(x2 = 0, y2 = 0) {
          this.x = 0;
          this.y = 0;
          this.x = x2;
          this.y = y2;
        }
        /**
         * Creates a clone of this point
         * @returns A clone of this point
         */
        clone() {
          return new _Point(this.x, this.y);
        }
        /**
         * Copies `x` and `y` from the given point into this point
         * @param p - The point to copy from
         * @returns The point instance itself
         */
        copyFrom(p2) {
          this.set(p2.x, p2.y);
          return this;
        }
        /**
         * Copies this point's x and y into the given point (`p`).
         * @param p - The point to copy to. Can be any of type that is or extends `PointData`
         * @returns The point (`p`) with values updated
         */
        copyTo(p2) {
          p2.set(this.x, this.y);
          return p2;
        }
        /**
         * Accepts another point (`p`) and returns `true` if the given point is equal to this point
         * @param p - The point to check
         * @returns Returns `true` if both `x` and `y` are equal
         */
        equals(p2) {
          return p2.x === this.x && p2.y === this.y;
        }
        /**
         * Sets the point to a new `x` and `y` position.
         * If `y` is omitted, both `x` and `y` will be set to `x`.
         * @param {number} [x=0] - position of the point on the `x` axis
         * @param {number} [y=x] - position of the point on the `y` axis
         * @returns The point instance itself
         */
        set(x2 = 0, y2 = x2) {
          this.x = x2;
          this.y = y2;
          return this;
        }
        toString() {
          return `[pixi.js/math:Point x=${this.x} y=${this.y}]`;
        }
        /**
         * A static Point object with `x` and `y` values of `0`. Can be used to avoid creating new objects multiple times.
         * @readonly
         */
        static get shared() {
          tempPoint.x = 0;
          tempPoint.y = 0;
          return tempPoint;
        }
      };
      tempPoint = new Point();
    }
  });

  // node_modules/pixi.js/lib/maths/matrix/Matrix.mjs
  var Matrix, tempMatrix, identityMatrix;
  var init_Matrix = __esm({
    "node_modules/pixi.js/lib/maths/matrix/Matrix.mjs"() {
      init_const();
      init_Point();
      Matrix = class _Matrix {
        /**
         * @param a - x scale
         * @param b - y skew
         * @param c - x skew
         * @param d - y scale
         * @param tx - x translation
         * @param ty - y translation
         */
        constructor(a2 = 1, b2 = 0, c2 = 0, d2 = 1, tx = 0, ty = 0) {
          this.array = null;
          this.a = a2;
          this.b = b2;
          this.c = c2;
          this.d = d2;
          this.tx = tx;
          this.ty = ty;
        }
        /**
         * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
         *
         * a = array[0]
         * b = array[1]
         * c = array[3]
         * d = array[4]
         * tx = array[2]
         * ty = array[5]
         * @param array - The array that the matrix will be populated from.
         */
        fromArray(array) {
          this.a = array[0];
          this.b = array[1];
          this.c = array[3];
          this.d = array[4];
          this.tx = array[2];
          this.ty = array[5];
        }
        /**
         * Sets the matrix properties.
         * @param a - Matrix component
         * @param b - Matrix component
         * @param c - Matrix component
         * @param d - Matrix component
         * @param tx - Matrix component
         * @param ty - Matrix component
         * @returns This matrix. Good for chaining method calls.
         */
        set(a2, b2, c2, d2, tx, ty) {
          this.a = a2;
          this.b = b2;
          this.c = c2;
          this.d = d2;
          this.tx = tx;
          this.ty = ty;
          return this;
        }
        /**
         * Creates an array from the current Matrix object.
         * @param transpose - Whether we need to transpose the matrix or not
         * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
         * @returns The newly created array which contains the matrix
         */
        toArray(transpose, out2) {
          if (!this.array) {
            this.array = new Float32Array(9);
          }
          const array = out2 || this.array;
          if (transpose) {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
          } else {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
          }
          return array;
        }
        /**
         * Get a new position with the current transformation applied.
         * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
         * @param pos - The origin
         * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
         * @returns {Point} The new point, transformed through this matrix
         */
        apply(pos, newPos) {
          newPos = newPos || new Point();
          const x2 = pos.x;
          const y2 = pos.y;
          newPos.x = this.a * x2 + this.c * y2 + this.tx;
          newPos.y = this.b * x2 + this.d * y2 + this.ty;
          return newPos;
        }
        /**
         * Get a new position with the inverse of the current transformation applied.
         * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
         * @param pos - The origin
         * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
         * @returns {Point} The new point, inverse-transformed through this matrix
         */
        applyInverse(pos, newPos) {
          newPos = newPos || new Point();
          const a2 = this.a;
          const b2 = this.b;
          const c2 = this.c;
          const d2 = this.d;
          const tx = this.tx;
          const ty = this.ty;
          const id = 1 / (a2 * d2 + c2 * -b2);
          const x2 = pos.x;
          const y2 = pos.y;
          newPos.x = d2 * id * x2 + -c2 * id * y2 + (ty * c2 - tx * d2) * id;
          newPos.y = a2 * id * y2 + -b2 * id * x2 + (-ty * a2 + tx * b2) * id;
          return newPos;
        }
        /**
         * Translates the matrix on the x and y.
         * @param x - How much to translate x by
         * @param y - How much to translate y by
         * @returns This matrix. Good for chaining method calls.
         */
        translate(x2, y2) {
          this.tx += x2;
          this.ty += y2;
          return this;
        }
        /**
         * Applies a scale transformation to the matrix.
         * @param x - The amount to scale horizontally
         * @param y - The amount to scale vertically
         * @returns This matrix. Good for chaining method calls.
         */
        scale(x2, y2) {
          this.a *= x2;
          this.d *= y2;
          this.c *= x2;
          this.b *= y2;
          this.tx *= x2;
          this.ty *= y2;
          return this;
        }
        /**
         * Applies a rotation transformation to the matrix.
         * @param angle - The angle in radians.
         * @returns This matrix. Good for chaining method calls.
         */
        rotate(angle) {
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const a1 = this.a;
          const c1 = this.c;
          const tx1 = this.tx;
          this.a = a1 * cos - this.b * sin;
          this.b = a1 * sin + this.b * cos;
          this.c = c1 * cos - this.d * sin;
          this.d = c1 * sin + this.d * cos;
          this.tx = tx1 * cos - this.ty * sin;
          this.ty = tx1 * sin + this.ty * cos;
          return this;
        }
        /**
         * Appends the given Matrix to this Matrix.
         * @param matrix - The matrix to append.
         * @returns This matrix. Good for chaining method calls.
         */
        append(matrix) {
          const a1 = this.a;
          const b1 = this.b;
          const c1 = this.c;
          const d1 = this.d;
          this.a = matrix.a * a1 + matrix.b * c1;
          this.b = matrix.a * b1 + matrix.b * d1;
          this.c = matrix.c * a1 + matrix.d * c1;
          this.d = matrix.c * b1 + matrix.d * d1;
          this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
          this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
          return this;
        }
        /**
         * Appends two matrix's and sets the result to this matrix. AB = A * B
         * @param a - The matrix to append.
         * @param b - The matrix to append.
         * @returns This matrix. Good for chaining method calls.
         */
        appendFrom(a2, b2) {
          const a1 = a2.a;
          const b1 = a2.b;
          const c1 = a2.c;
          const d1 = a2.d;
          const tx = a2.tx;
          const ty = a2.ty;
          const a22 = b2.a;
          const b22 = b2.b;
          const c2 = b2.c;
          const d2 = b2.d;
          this.a = a1 * a22 + b1 * c2;
          this.b = a1 * b22 + b1 * d2;
          this.c = c1 * a22 + d1 * c2;
          this.d = c1 * b22 + d1 * d2;
          this.tx = tx * a22 + ty * c2 + b2.tx;
          this.ty = tx * b22 + ty * d2 + b2.ty;
          return this;
        }
        /**
         * Sets the matrix based on all the available properties
         * @param x - Position on the x axis
         * @param y - Position on the y axis
         * @param pivotX - Pivot on the x axis
         * @param pivotY - Pivot on the y axis
         * @param scaleX - Scale on the x axis
         * @param scaleY - Scale on the y axis
         * @param rotation - Rotation in radians
         * @param skewX - Skew on the x axis
         * @param skewY - Skew on the y axis
         * @returns This matrix. Good for chaining method calls.
         */
        setTransform(x2, y2, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
          this.a = Math.cos(rotation + skewY) * scaleX;
          this.b = Math.sin(rotation + skewY) * scaleX;
          this.c = -Math.sin(rotation - skewX) * scaleY;
          this.d = Math.cos(rotation - skewX) * scaleY;
          this.tx = x2 - (pivotX * this.a + pivotY * this.c);
          this.ty = y2 - (pivotX * this.b + pivotY * this.d);
          return this;
        }
        /**
         * Prepends the given Matrix to this Matrix.
         * @param matrix - The matrix to prepend
         * @returns This matrix. Good for chaining method calls.
         */
        prepend(matrix) {
          const tx1 = this.tx;
          if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
            const a1 = this.a;
            const c1 = this.c;
            this.a = a1 * matrix.a + this.b * matrix.c;
            this.b = a1 * matrix.b + this.b * matrix.d;
            this.c = c1 * matrix.a + this.d * matrix.c;
            this.d = c1 * matrix.b + this.d * matrix.d;
          }
          this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
          this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;
          return this;
        }
        /**
         * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
         * @param transform - The transform to apply the properties to.
         * @returns The transform with the newly applied properties
         */
        decompose(transform2) {
          const a2 = this.a;
          const b2 = this.b;
          const c2 = this.c;
          const d2 = this.d;
          const pivot = transform2.pivot;
          const skewX = -Math.atan2(-c2, d2);
          const skewY = Math.atan2(b2, a2);
          const delta = Math.abs(skewX + skewY);
          if (delta < 1e-5 || Math.abs(PI_2 - delta) < 1e-5) {
            transform2.rotation = skewY;
            transform2.skew.x = transform2.skew.y = 0;
          } else {
            transform2.rotation = 0;
            transform2.skew.x = skewX;
            transform2.skew.y = skewY;
          }
          transform2.scale.x = Math.sqrt(a2 * a2 + b2 * b2);
          transform2.scale.y = Math.sqrt(c2 * c2 + d2 * d2);
          transform2.position.x = this.tx + (pivot.x * a2 + pivot.y * c2);
          transform2.position.y = this.ty + (pivot.x * b2 + pivot.y * d2);
          return transform2;
        }
        /**
         * Inverts this matrix
         * @returns This matrix. Good for chaining method calls.
         */
        invert() {
          const a1 = this.a;
          const b1 = this.b;
          const c1 = this.c;
          const d1 = this.d;
          const tx1 = this.tx;
          const n2 = a1 * d1 - b1 * c1;
          this.a = d1 / n2;
          this.b = -b1 / n2;
          this.c = -c1 / n2;
          this.d = a1 / n2;
          this.tx = (c1 * this.ty - d1 * tx1) / n2;
          this.ty = -(a1 * this.ty - b1 * tx1) / n2;
          return this;
        }
        /** Checks if this matrix is an identity matrix */
        isIdentity() {
          return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
        }
        /**
         * Resets this Matrix to an identity (default) matrix.
         * @returns This matrix. Good for chaining method calls.
         */
        identity() {
          this.a = 1;
          this.b = 0;
          this.c = 0;
          this.d = 1;
          this.tx = 0;
          this.ty = 0;
          return this;
        }
        /**
         * Creates a new Matrix object with the same values as this one.
         * @returns A copy of this matrix. Good for chaining method calls.
         */
        clone() {
          const matrix = new _Matrix();
          matrix.a = this.a;
          matrix.b = this.b;
          matrix.c = this.c;
          matrix.d = this.d;
          matrix.tx = this.tx;
          matrix.ty = this.ty;
          return matrix;
        }
        /**
         * Changes the values of the given matrix to be the same as the ones in this matrix
         * @param matrix - The matrix to copy to.
         * @returns The matrix given in parameter with its values updated.
         */
        copyTo(matrix) {
          matrix.a = this.a;
          matrix.b = this.b;
          matrix.c = this.c;
          matrix.d = this.d;
          matrix.tx = this.tx;
          matrix.ty = this.ty;
          return matrix;
        }
        /**
         * Changes the values of the matrix to be the same as the ones in given matrix
         * @param matrix - The matrix to copy from.
         * @returns this
         */
        copyFrom(matrix) {
          this.a = matrix.a;
          this.b = matrix.b;
          this.c = matrix.c;
          this.d = matrix.d;
          this.tx = matrix.tx;
          this.ty = matrix.ty;
          return this;
        }
        /**
         * check to see if two matrices are the same
         * @param matrix - The matrix to compare to.
         */
        equals(matrix) {
          return matrix.a === this.a && matrix.b === this.b && matrix.c === this.c && matrix.d === this.d && matrix.tx === this.tx && matrix.ty === this.ty;
        }
        toString() {
          return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
        }
        /**
         * A default (identity) matrix.
         *
         * This is a shared object, if you want to modify it consider creating a new `Matrix`
         * @readonly
         */
        static get IDENTITY() {
          return identityMatrix.identity();
        }
        /**
         * A static Matrix that can be used to avoid creating new objects.
         * Will always ensure the matrix is reset to identity when requested.
         * Use this object for fast but temporary calculations, as it may be mutated later on.
         * This is a different object to the `IDENTITY` object and so can be modified without changing `IDENTITY`.
         * @readonly
         */
        static get shared() {
          return tempMatrix.identity();
        }
      };
      tempMatrix = new Matrix();
      identityMatrix = new Matrix();
    }
  });

  // node_modules/pixi.js/lib/maths/point/ObservablePoint.mjs
  var ObservablePoint;
  var init_ObservablePoint = __esm({
    "node_modules/pixi.js/lib/maths/point/ObservablePoint.mjs"() {
      "use strict";
      ObservablePoint = class _ObservablePoint {
        /**
         * Creates a new `ObservablePoint`
         * @param observer - Observer to pass to listen for change events.
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=0] - position of the point on the y axis
         */
        constructor(observer, x2, y2) {
          this._x = x2 || 0;
          this._y = y2 || 0;
          this._observer = observer;
        }
        /**
         * Creates a clone of this point.
         * @param observer - Optional observer to pass to the new observable point.
         * @returns a copy of this observable point
         */
        clone(observer) {
          return new _ObservablePoint(observer ?? this._observer, this._x, this._y);
        }
        /**
         * Sets the point to a new `x` and `y` position.
         * If `y` is omitted, both `x` and `y` will be set to `x`.
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=x] - position of the point on the y axis
         * @returns The observable point instance itself
         */
        set(x2 = 0, y2 = x2) {
          if (this._x !== x2 || this._y !== y2) {
            this._x = x2;
            this._y = y2;
            this._observer._onUpdate(this);
          }
          return this;
        }
        /**
         * Copies x and y from the given point (`p`)
         * @param p - The point to copy from. Can be any of type that is or extends `PointData`
         * @returns The observable point instance itself
         */
        copyFrom(p2) {
          if (this._x !== p2.x || this._y !== p2.y) {
            this._x = p2.x;
            this._y = p2.y;
            this._observer._onUpdate(this);
          }
          return this;
        }
        /**
         * Copies this point's x and y into that of the given point (`p`)
         * @param p - The point to copy to. Can be any of type that is or extends `PointData`
         * @returns The point (`p`) with values updated
         */
        copyTo(p2) {
          p2.set(this._x, this._y);
          return p2;
        }
        /**
         * Accepts another point (`p`) and returns `true` if the given point is equal to this point
         * @param p - The point to check
         * @returns Returns `true` if both `x` and `y` are equal
         */
        equals(p2) {
          return p2.x === this._x && p2.y === this._y;
        }
        toString() {
          return `[pixi.js/math:ObservablePoint x=${0} y=${0} scope=${this._observer}]`;
        }
        /** Position of the observable point on the x axis. */
        get x() {
          return this._x;
        }
        set x(value) {
          if (this._x !== value) {
            this._x = value;
            this._observer._onUpdate(this);
          }
        }
        /** Position of the observable point on the y axis. */
        get y() {
          return this._y;
        }
        set y(value) {
          if (this._y !== value) {
            this._y = value;
            this._observer._onUpdate(this);
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/utils/data/uid.mjs
  function uid(name = "default") {
    if (uidCache[name] === void 0) {
      uidCache[name] = -1;
    }
    return ++uidCache[name];
  }
  var uidCache;
  var init_uid = __esm({
    "node_modules/pixi.js/lib/utils/data/uid.mjs"() {
      "use strict";
      uidCache = {
        default: -1
      };
    }
  });

  // node_modules/pixi.js/lib/utils/logging/deprecation.mjs
  function deprecation(version, message, ignoreDepth = 3) {
    if (warnings[message]) {
      return;
    }
    let stack = new Error().stack;
    if (typeof stack === "undefined") {
      console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`);
    } else {
      stack = stack.split("\n").splice(ignoreDepth).join("\n");
      if (console.groupCollapsed) {
        console.groupCollapsed(
          "%cPixiJS Deprecation Warning: %c%s",
          "color:#614108;background:#fffbe6",
          "font-weight:normal;color:#614108;background:#fffbe6",
          `${message}
Deprecated since v${version}`
        );
        console.warn(stack);
        console.groupEnd();
      } else {
        console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`);
        console.warn(stack);
      }
    }
    warnings[message] = true;
  }
  var warnings, v8_0_0, v8_3_4;
  var init_deprecation = __esm({
    "node_modules/pixi.js/lib/utils/logging/deprecation.mjs"() {
      "use strict";
      warnings = {};
      v8_0_0 = "8.0.0";
      v8_3_4 = "8.3.4";
    }
  });

  // node_modules/pixi.js/lib/utils/pool/Pool.mjs
  var Pool;
  var init_Pool = __esm({
    "node_modules/pixi.js/lib/utils/pool/Pool.mjs"() {
      "use strict";
      Pool = class {
        /**
         * Constructs a new Pool.
         * @param ClassType - The constructor of the items in the pool.
         * @param {number} [initialSize] - The initial size of the pool.
         */
        constructor(ClassType, initialSize) {
          this._pool = [];
          this._count = 0;
          this._index = 0;
          this._classType = ClassType;
          if (initialSize) {
            this.prepopulate(initialSize);
          }
        }
        /**
         * Prepopulates the pool with a given number of items.
         * @param total - The number of items to add to the pool.
         */
        prepopulate(total) {
          for (let i2 = 0; i2 < total; i2++) {
            this._pool[this._index++] = new this._classType();
          }
          this._count += total;
        }
        /**
         * Gets an item from the pool. Calls the item's `init` method if it exists.
         * If there are no items left in the pool, a new one will be created.
         * @param {unknown} [data] - Optional data to pass to the item's constructor.
         * @returns {T} The item from the pool.
         */
        get(data) {
          let item;
          if (this._index > 0) {
            item = this._pool[--this._index];
          } else {
            item = new this._classType();
          }
          item.init?.(data);
          return item;
        }
        /**
         * Returns an item to the pool. Calls the item's `reset` method if it exists.
         * @param {T} item - The item to return to the pool.
         */
        return(item) {
          item.reset?.();
          this._pool[this._index++] = item;
        }
        /**
         * Gets the number of items in the pool.
         * @readonly
         * @member {number}
         */
        get totalSize() {
          return this._count;
        }
        /**
         * Gets the number of items in the pool that are free to use without needing to create more.
         * @readonly
         * @member {number}
         */
        get totalFree() {
          return this._index;
        }
        /**
         * Gets the number of items in the pool that are currently in use.
         * @readonly
         * @member {number}
         */
        get totalUsed() {
          return this._count - this._index;
        }
        /** clears the pool - mainly used for debugging! */
        clear() {
          this._pool.length = 0;
          this._index = 0;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs
  var PoolGroupClass, BigPool;
  var init_PoolGroup = __esm({
    "node_modules/pixi.js/lib/utils/pool/PoolGroup.mjs"() {
      init_Pool();
      PoolGroupClass = class {
        constructor() {
          this._poolsByClass = /* @__PURE__ */ new Map();
        }
        /**
         * Prepopulates a specific pool with a given number of items.
         * @template T The type of items in the pool. Must extend PoolItem.
         * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
         * @param {number} total - The number of items to add to the pool.
         */
        prepopulate(Class, total) {
          const classPool = this.getPool(Class);
          classPool.prepopulate(total);
        }
        /**
         * Gets an item from a specific pool.
         * @template T The type of items in the pool. Must extend PoolItem.
         * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
         * @param {unknown} [data] - Optional data to pass to the item's constructor.
         * @returns {T} The item from the pool.
         */
        get(Class, data) {
          const pool = this.getPool(Class);
          return pool.get(data);
        }
        /**
         * Returns an item to its respective pool.
         * @param {PoolItem} item - The item to return to the pool.
         */
        return(item) {
          const pool = this.getPool(item.constructor);
          pool.return(item);
        }
        /**
         * Gets a specific pool based on the class type.
         * @template T The type of items in the pool. Must extend PoolItem.
         * @param {PoolItemConstructor<T>} ClassType - The constructor of the items in the pool.
         * @returns {Pool<T>} The pool of the given class type.
         */
        getPool(ClassType) {
          if (!this._poolsByClass.has(ClassType)) {
            this._poolsByClass.set(ClassType, new Pool(ClassType));
          }
          return this._poolsByClass.get(ClassType);
        }
        /** gets the usage stats of each pool in the system */
        stats() {
          const stats = {};
          this._poolsByClass.forEach((pool) => {
            const name = stats[pool._classType.name] ? pool._classType.name + pool._classType.ID : pool._classType.name;
            stats[name] = {
              free: pool.totalFree,
              used: pool.totalUsed,
              size: pool.totalSize
            };
          });
          return stats;
        }
      };
      BigPool = new PoolGroupClass();
    }
  });

  // node_modules/pixi.js/lib/utils/data/removeItems.mjs
  function removeItems(arr, startIdx, removeCount) {
    const length = arr.length;
    let i2;
    if (startIdx >= length || removeCount === 0) {
      return;
    }
    removeCount = startIdx + removeCount > length ? length - startIdx : removeCount;
    const len = length - removeCount;
    for (i2 = startIdx; i2 < len; ++i2) {
      arr[i2] = arr[i2 + removeCount];
    }
    arr.length = len;
  }
  var init_removeItems = __esm({
    "node_modules/pixi.js/lib/utils/data/removeItems.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.mjs
  var childrenHelperMixin;
  var init_childrenHelperMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.mjs"() {
      init_removeItems();
      init_deprecation();
      childrenHelperMixin = {
        allowChildren: true,
        /**
         * Removes all children from this container that are within the begin and end indexes.
         * @param beginIndex - The beginning position.
         * @param endIndex - The ending position. Default value is size of the container.
         * @returns - List of removed children
         * @memberof scene.Container#
         */
        removeChildren(beginIndex = 0, endIndex) {
          const end = endIndex ?? this.children.length;
          const range = end - beginIndex;
          const removed = [];
          if (range > 0 && range <= end) {
            for (let i2 = end - 1; i2 >= beginIndex; i2--) {
              const child = this.children[i2];
              if (!child)
                continue;
              removed.push(child);
              child.parent = null;
            }
            removeItems(this.children, beginIndex, end);
            const renderGroup = this.renderGroup || this.parentRenderGroup;
            if (renderGroup) {
              renderGroup.removeChildren(removed);
            }
            for (let i2 = 0; i2 < removed.length; ++i2) {
              this.emit("childRemoved", removed[i2], this, i2);
              removed[i2].emit("removed", this);
            }
            return removed;
          } else if (range === 0 && this.children.length === 0) {
            return removed;
          }
          throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
        },
        /**
         * Removes a child from the specified index position.
         * @param index - The index to get the child from
         * @returns The child that was removed.
         * @memberof scene.Container#
         */
        removeChildAt(index) {
          const child = this.getChildAt(index);
          return this.removeChild(child);
        },
        /**
         * Returns the child at the specified index
         * @param index - The index to get the child at
         * @returns - The child at the given index, if any.
         * @memberof scene.Container#
         */
        getChildAt(index) {
          if (index < 0 || index >= this.children.length) {
            throw new Error(`getChildAt: Index (${index}) does not exist.`);
          }
          return this.children[index];
        },
        /**
         * Changes the position of an existing child in the container container
         * @param child - The child Container instance for which you want to change the index number
         * @param index - The resulting index number for the child container
         * @memberof scene.Container#
         */
        setChildIndex(child, index) {
          if (index < 0 || index >= this.children.length) {
            throw new Error(`The index ${index} supplied is out of bounds ${this.children.length}`);
          }
          this.getChildIndex(child);
          this.addChildAt(child, index);
        },
        /**
         * Returns the index position of a child Container instance
         * @param child - The Container instance to identify
         * @returns - The index position of the child container to identify
         * @memberof scene.Container#
         */
        getChildIndex(child) {
          const index = this.children.indexOf(child);
          if (index === -1) {
            throw new Error("The supplied Container must be a child of the caller");
          }
          return index;
        },
        /**
         * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
         * If the child is already in this container, it will be moved to the specified index.
         * @param {Container} child - The child to add.
         * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
         * @returns {Container} The child that was added.
         * @memberof scene.Container#
         */
        addChildAt(child, index) {
          if (!this.allowChildren) {
            deprecation(v8_0_0, "addChildAt: Only Containers will be allowed to add children in v8.0.0");
          }
          const { children } = this;
          if (index < 0 || index > children.length) {
            throw new Error(`${child}addChildAt: The index ${index} supplied is out of bounds ${children.length}`);
          }
          if (child.parent) {
            const currentIndex = child.parent.children.indexOf(child);
            if (child.parent === this && currentIndex === index) {
              return child;
            }
            if (currentIndex !== -1) {
              child.parent.children.splice(currentIndex, 1);
            }
          }
          if (index === children.length) {
            children.push(child);
          } else {
            children.splice(index, 0, child);
          }
          child.parent = this;
          child.didChange = true;
          child.didViewUpdate = false;
          child._updateFlags = 15;
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (renderGroup) {
            renderGroup.addChild(child);
          }
          if (this.sortableChildren)
            this.sortDirty = true;
          this.emit("childAdded", child, this, index);
          child.emit("added", this);
          return child;
        },
        /**
         * Swaps the position of 2 Containers within this container.
         * @param child - First container to swap
         * @param child2 - Second container to swap
         */
        swapChildren(child, child2) {
          if (child === child2) {
            return;
          }
          const index1 = this.getChildIndex(child);
          const index2 = this.getChildIndex(child2);
          this.children[index1] = child2;
          this.children[index2] = child;
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (renderGroup) {
            renderGroup.structureDidChange = true;
          }
          this._didContainerChangeTick++;
        },
        /**
         * Remove the Container from its parent Container. If the Container has no parent, do nothing.
         * @memberof scene.Container#
         */
        removeFromParent() {
          this.parent?.removeChild(this);
        },
        /**
         * Reparent the child to this container, keeping the same worldTransform.
         * @param child - The child to reparent
         * @returns The first child that was reparented.
         * @memberof scene.Container#
         */
        reparentChild(...child) {
          if (child.length === 1) {
            return this.reparentChildAt(child[0], this.children.length);
          }
          child.forEach((c2) => this.reparentChildAt(c2, this.children.length));
          return child[0];
        },
        /**
         * Reparent the child to this container at the specified index, keeping the same worldTransform.
         * @param child - The child to reparent
         * @param index - The index to reparent the child to
         * @memberof scene.Container#
         */
        reparentChildAt(child, index) {
          if (child.parent === this) {
            this.setChildIndex(child, index);
            return child;
          }
          const childMat = child.worldTransform.clone();
          child.removeFromParent();
          this.addChildAt(child, index);
          const newMatrix = this.worldTransform.clone();
          newMatrix.invert();
          childMat.prepend(newMatrix);
          child.setFromMatrix(childMat);
          return child;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/filters/FilterEffect.mjs
  var FilterEffect;
  var init_FilterEffect = __esm({
    "node_modules/pixi.js/lib/filters/FilterEffect.mjs"() {
      "use strict";
      FilterEffect = class {
        constructor() {
          this.pipe = "filter";
          this.priority = 1;
        }
        destroy() {
          for (let i2 = 0; i2 < this.filters.length; i2++) {
            this.filters[i2].destroy();
          }
          this.filters = null;
          this.filterArea = null;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/mask/MaskEffectManager.mjs
  var MaskEffectManagerClass, MaskEffectManager;
  var init_MaskEffectManager = __esm({
    "node_modules/pixi.js/lib/rendering/mask/MaskEffectManager.mjs"() {
      init_Extensions();
      init_PoolGroup();
      MaskEffectManagerClass = class {
        constructor() {
          this._effectClasses = [];
          this._tests = [];
          this._initialized = false;
        }
        init() {
          if (this._initialized)
            return;
          this._initialized = true;
          this._effectClasses.forEach((test) => {
            this.add({
              test: test.test,
              maskClass: test
            });
          });
        }
        add(test) {
          this._tests.push(test);
        }
        getMaskEffect(item) {
          if (!this._initialized)
            this.init();
          for (let i2 = 0; i2 < this._tests.length; i2++) {
            const test = this._tests[i2];
            if (test.test(item)) {
              return BigPool.get(test.maskClass, item);
            }
          }
          return item;
        }
        returnMaskEffect(effect) {
          BigPool.return(effect);
        }
      };
      MaskEffectManager = new MaskEffectManagerClass();
      extensions.handleByList(ExtensionType.MaskEffect, MaskEffectManager._effectClasses);
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.mjs
  var effectsMixin;
  var init_effectsMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.mjs"() {
      init_FilterEffect();
      init_MaskEffectManager();
      effectsMixin = {
        _maskEffect: null,
        _filterEffect: null,
        /**
         * @todo Needs docs.
         * @memberof scene.Container#
         * @type {Array<Effect>}
         */
        effects: [],
        /**
         * @todo Needs docs.
         * @param effect - The effect to add.
         * @memberof scene.Container#
         * @ignore
         */
        addEffect(effect) {
          const index = this.effects.indexOf(effect);
          if (index !== -1)
            return;
          this.effects.push(effect);
          this.effects.sort((a2, b2) => a2.priority - b2.priority);
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (renderGroup) {
            renderGroup.structureDidChange = true;
          }
          this._updateIsSimple();
        },
        /**
         * @todo Needs docs.
         * @param effect - The effect to remove.
         * @memberof scene.Container#
         * @ignore
         */
        removeEffect(effect) {
          const index = this.effects.indexOf(effect);
          if (index === -1)
            return;
          this.effects.splice(index, 1);
          if (this.parentRenderGroup) {
            this.parentRenderGroup.structureDidChange = true;
          }
          this._updateIsSimple();
        },
        set mask(value) {
          const effect = this._maskEffect;
          if (effect?.mask === value)
            return;
          if (effect) {
            this.removeEffect(effect);
            MaskEffectManager.returnMaskEffect(effect);
            this._maskEffect = null;
          }
          if (value === null || value === void 0)
            return;
          this._maskEffect = MaskEffectManager.getMaskEffect(value);
          this.addEffect(this._maskEffect);
        },
        /**
         * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
         * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
         * {@link Graphics} or a {@link Sprite} object. This allows for much faster masking in canvas as it
         * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
         * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
         * To remove a mask, set this property to `null`.
         *
         * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
         * @example
         * import { Graphics, Sprite } from 'pixi.js';
         *
         * const graphics = new Graphics();
         * graphics.beginFill(0xFF3300);
         * graphics.drawRect(50, 250, 100, 100);
         * graphics.endFill();
         *
         * const sprite = new Sprite(texture);
         * sprite.mask = graphics;
         * @memberof scene.Container#
         */
        get mask() {
          return this._maskEffect?.mask;
        },
        set filters(value) {
          if (!Array.isArray(value) && value)
            value = [value];
          const effect = this._filterEffect || (this._filterEffect = new FilterEffect());
          value = value;
          const hasFilters = value?.length > 0;
          const hadFilters = effect.filters?.length > 0;
          const didChange = hasFilters !== hadFilters;
          value = Array.isArray(value) ? value.slice(0) : value;
          effect.filters = Object.freeze(value);
          if (didChange) {
            if (hasFilters) {
              this.addEffect(effect);
            } else {
              this.removeEffect(effect);
              effect.filters = value ?? null;
            }
          }
        },
        /**
         * Sets the filters for the displayObject.
         * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
         * To remove filters simply set this property to `'null'`.
         * @memberof scene.Container#
         */
        get filters() {
          return this._filterEffect?.filters;
        },
        set filterArea(value) {
          this._filterEffect || (this._filterEffect = new FilterEffect());
          this._filterEffect.filterArea = value;
        },
        /**
         * The area the filter is applied to. This is used as more of an optimization
         * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle.
         *
         * Also works as an interaction mask.
         * @memberof scene.Container#
         */
        get filterArea() {
          return this._filterEffect?.filterArea;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/findMixin.mjs
  var findMixin;
  var init_findMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/findMixin.mjs"() {
      init_deprecation();
      findMixin = {
        /**
         * The instance label of the object.
         * @memberof scene.Container#
         * @member {string} label
         */
        label: null,
        /**
         * The instance name of the object.
         * @deprecated since 8.0.0
         * @see scene.Container#label
         * @member {string} name
         * @memberof scene.Container#
         */
        get name() {
          deprecation(v8_0_0, "Container.name property has been removed, use Container.label instead");
          return this.label;
        },
        set name(value) {
          deprecation(v8_0_0, "Container.name property has been removed, use Container.label instead");
          this.label = value;
        },
        /**
         * @method getChildByName
         * @deprecated since 8.0.0
         * @param {string} name - Instance name.
         * @param {boolean}[deep=false] - Whether to search recursively
         * @returns {Container} The child with the specified name.
         * @see scene.Container#getChildByLabel
         * @memberof scene.Container#
         */
        getChildByName(name, deep = false) {
          return this.getChildByLabel(name, deep);
        },
        /**
         * Returns the first child in the container with the specified label.
         *
         * Recursive searches are done in a pre-order traversal.
         * @memberof scene.Container#
         * @param {string|RegExp} label - Instance label.
         * @param {boolean}[deep=false] - Whether to search recursively
         * @returns {Container} The child with the specified label.
         */
        getChildByLabel(label, deep = false) {
          const children = this.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            const child = children[i2];
            if (child.label === label || label instanceof RegExp && label.test(child.label))
              return child;
          }
          if (deep) {
            for (let i2 = 0; i2 < children.length; i2++) {
              const child = children[i2];
              const found = child.getChildByLabel(label, true);
              if (found) {
                return found;
              }
            }
          }
          return null;
        },
        /**
         * Returns all children in the container with the specified label.
         * @memberof scene.Container#
         * @param {string|RegExp} label - Instance label.
         * @param {boolean}[deep=false] - Whether to search recursively
         * @param {Container[]} [out=[]] - The array to store matching children in.
         * @returns {Container[]} An array of children with the specified label.
         */
        getChildrenByLabel(label, deep = false, out2 = []) {
          const children = this.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            const child = children[i2];
            if (child.label === label || label instanceof RegExp && label.test(child.label)) {
              out2.push(child);
            }
          }
          if (deep) {
            for (let i2 = 0; i2 < children.length; i2++) {
              children[i2].getChildrenByLabel(label, true, out2);
            }
          }
          return out2;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/maths/shapes/Rectangle.mjs
  var tempPoints, Rectangle;
  var init_Rectangle = __esm({
    "node_modules/pixi.js/lib/maths/shapes/Rectangle.mjs"() {
      init_Point();
      tempPoints = [new Point(), new Point(), new Point(), new Point()];
      Rectangle = class _Rectangle {
        /**
         * @param x - The X coordinate of the upper-left corner of the rectangle
         * @param y - The Y coordinate of the upper-left corner of the rectangle
         * @param width - The overall width of the rectangle
         * @param height - The overall height of the rectangle
         */
        constructor(x2 = 0, y2 = 0, width = 0, height = 0) {
          this.type = "rectangle";
          this.x = Number(x2);
          this.y = Number(y2);
          this.width = Number(width);
          this.height = Number(height);
        }
        /** Returns the left edge of the rectangle. */
        get left() {
          return this.x;
        }
        /** Returns the right edge of the rectangle. */
        get right() {
          return this.x + this.width;
        }
        /** Returns the top edge of the rectangle. */
        get top() {
          return this.y;
        }
        /** Returns the bottom edge of the rectangle. */
        get bottom() {
          return this.y + this.height;
        }
        /** Determines whether the Rectangle is empty. */
        isEmpty() {
          return this.left === this.right || this.top === this.bottom;
        }
        /** A constant empty rectangle. This is a new object every time the property is accessed */
        static get EMPTY() {
          return new _Rectangle(0, 0, 0, 0);
        }
        /**
         * Creates a clone of this Rectangle
         * @returns a copy of the rectangle
         */
        clone() {
          return new _Rectangle(this.x, this.y, this.width, this.height);
        }
        /**
         * Converts a Bounds object to a Rectangle object.
         * @param bounds - The bounds to copy and convert to a rectangle.
         * @returns Returns itself.
         */
        copyFromBounds(bounds) {
          this.x = bounds.minX;
          this.y = bounds.minY;
          this.width = bounds.maxX - bounds.minX;
          this.height = bounds.maxY - bounds.minY;
          return this;
        }
        /**
         * Copies another rectangle to this one.
         * @param rectangle - The rectangle to copy from.
         * @returns Returns itself.
         */
        copyFrom(rectangle) {
          this.x = rectangle.x;
          this.y = rectangle.y;
          this.width = rectangle.width;
          this.height = rectangle.height;
          return this;
        }
        /**
         * Copies this rectangle to another one.
         * @param rectangle - The rectangle to copy to.
         * @returns Returns given parameter.
         */
        copyTo(rectangle) {
          rectangle.copyFrom(this);
          return rectangle;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this Rectangle
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @returns Whether the x/y coordinates are within this Rectangle
         */
        contains(x2, y2) {
          if (this.width <= 0 || this.height <= 0) {
            return false;
          }
          if (x2 >= this.x && x2 < this.x + this.width) {
            if (y2 >= this.y && y2 < this.y + this.height) {
              return true;
            }
          }
          return false;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @param strokeWidth - The width of the line to check
         * @returns Whether the x/y coordinates are within this rectangle
         */
        strokeContains(x2, y2, strokeWidth) {
          const { width, height } = this;
          if (width <= 0 || height <= 0)
            return false;
          const _x = this.x;
          const _y = this.y;
          const outerLeft = _x - strokeWidth / 2;
          const outerRight = _x + width + strokeWidth / 2;
          const outerTop = _y - strokeWidth / 2;
          const outerBottom = _y + height + strokeWidth / 2;
          const innerLeft = _x + strokeWidth / 2;
          const innerRight = _x + width - strokeWidth / 2;
          const innerTop = _y + strokeWidth / 2;
          const innerBottom = _y + height - strokeWidth / 2;
          return x2 >= outerLeft && x2 <= outerRight && y2 >= outerTop && y2 <= outerBottom && !(x2 > innerLeft && x2 < innerRight && y2 > innerTop && y2 < innerBottom);
        }
        /**
         * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
         * Returns true only if the area of the intersection is >0, this means that Rectangles
         * sharing a side are not overlapping. Another side effect is that an arealess rectangle
         * (width or height equal to zero) can't intersect any other rectangle.
         * @param {Rectangle} other - The Rectangle to intersect with `this`.
         * @param {Matrix} transform - The transformation matrix of `other`.
         * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
         */
        intersects(other, transform2) {
          if (!transform2) {
            const x02 = this.x < other.x ? other.x : this.x;
            const x12 = this.right > other.right ? other.right : this.right;
            if (x12 <= x02) {
              return false;
            }
            const y02 = this.y < other.y ? other.y : this.y;
            const y12 = this.bottom > other.bottom ? other.bottom : this.bottom;
            return y12 > y02;
          }
          const x0 = this.left;
          const x1 = this.right;
          const y0 = this.top;
          const y1 = this.bottom;
          if (x1 <= x0 || y1 <= y0) {
            return false;
          }
          const lt = tempPoints[0].set(other.left, other.top);
          const lb = tempPoints[1].set(other.left, other.bottom);
          const rt = tempPoints[2].set(other.right, other.top);
          const rb = tempPoints[3].set(other.right, other.bottom);
          if (rt.x <= lt.x || lb.y <= lt.y) {
            return false;
          }
          const s2 = Math.sign(transform2.a * transform2.d - transform2.b * transform2.c);
          if (s2 === 0) {
            return false;
          }
          transform2.apply(lt, lt);
          transform2.apply(lb, lb);
          transform2.apply(rt, rt);
          transform2.apply(rb, rb);
          if (Math.max(lt.x, lb.x, rt.x, rb.x) <= x0 || Math.min(lt.x, lb.x, rt.x, rb.x) >= x1 || Math.max(lt.y, lb.y, rt.y, rb.y) <= y0 || Math.min(lt.y, lb.y, rt.y, rb.y) >= y1) {
            return false;
          }
          const nx = s2 * (lb.y - lt.y);
          const ny = s2 * (lt.x - lb.x);
          const n00 = nx * x0 + ny * y0;
          const n10 = nx * x1 + ny * y0;
          const n01 = nx * x0 + ny * y1;
          const n11 = nx * x1 + ny * y1;
          if (Math.max(n00, n10, n01, n11) <= nx * lt.x + ny * lt.y || Math.min(n00, n10, n01, n11) >= nx * rb.x + ny * rb.y) {
            return false;
          }
          const mx = s2 * (lt.y - rt.y);
          const my = s2 * (rt.x - lt.x);
          const m00 = mx * x0 + my * y0;
          const m10 = mx * x1 + my * y0;
          const m01 = mx * x0 + my * y1;
          const m11 = mx * x1 + my * y1;
          if (Math.max(m00, m10, m01, m11) <= mx * lt.x + my * lt.y || Math.min(m00, m10, m01, m11) >= mx * rb.x + my * rb.y) {
            return false;
          }
          return true;
        }
        /**
         * Pads the rectangle making it grow in all directions.
         * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
         * @param paddingX - The horizontal padding amount.
         * @param paddingY - The vertical padding amount.
         * @returns Returns itself.
         */
        pad(paddingX = 0, paddingY = paddingX) {
          this.x -= paddingX;
          this.y -= paddingY;
          this.width += paddingX * 2;
          this.height += paddingY * 2;
          return this;
        }
        /**
         * Fits this rectangle around the passed one.
         * @param rectangle - The rectangle to fit.
         * @returns Returns itself.
         */
        fit(rectangle) {
          const x1 = Math.max(this.x, rectangle.x);
          const x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
          const y1 = Math.max(this.y, rectangle.y);
          const y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
          this.x = x1;
          this.width = Math.max(x2 - x1, 0);
          this.y = y1;
          this.height = Math.max(y2 - y1, 0);
          return this;
        }
        /**
         * Enlarges rectangle that way its corners lie on grid
         * @param resolution - resolution
         * @param eps - precision
         * @returns Returns itself.
         */
        ceil(resolution = 1, eps = 1e-3) {
          const x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
          const y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
          this.x = Math.floor((this.x + eps) * resolution) / resolution;
          this.y = Math.floor((this.y + eps) * resolution) / resolution;
          this.width = x2 - this.x;
          this.height = y2 - this.y;
          return this;
        }
        /**
         * Enlarges this rectangle to include the passed rectangle.
         * @param rectangle - The rectangle to include.
         * @returns Returns itself.
         */
        enlarge(rectangle) {
          const x1 = Math.min(this.x, rectangle.x);
          const x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
          const y1 = Math.min(this.y, rectangle.y);
          const y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
          this.x = x1;
          this.width = x2 - x1;
          this.y = y1;
          this.height = y2 - y1;
          return this;
        }
        /**
         * Returns the framing rectangle of the rectangle as a Rectangle object
         * @param out - optional rectangle to store the result
         * @returns The framing rectangle
         */
        getBounds(out2) {
          out2 = out2 || new _Rectangle();
          out2.copyFrom(this);
          return out2;
        }
        toString() {
          return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/bounds/Bounds.mjs
  var defaultMatrix, Bounds;
  var init_Bounds = __esm({
    "node_modules/pixi.js/lib/scene/container/bounds/Bounds.mjs"() {
      init_Matrix();
      init_Rectangle();
      defaultMatrix = new Matrix();
      Bounds = class _Bounds {
        constructor(minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity) {
          this.minX = Infinity;
          this.minY = Infinity;
          this.maxX = -Infinity;
          this.maxY = -Infinity;
          this.matrix = defaultMatrix;
          this.minX = minX;
          this.minY = minY;
          this.maxX = maxX;
          this.maxY = maxY;
        }
        /**
         * Checks if bounds are empty.
         * @returns - True if empty.
         */
        isEmpty() {
          return this.minX > this.maxX || this.minY > this.maxY;
        }
        /** The bounding rectangle of the bounds. */
        get rectangle() {
          if (!this._rectangle) {
            this._rectangle = new Rectangle();
          }
          const rectangle = this._rectangle;
          if (this.minX > this.maxX || this.minY > this.maxY) {
            rectangle.x = 0;
            rectangle.y = 0;
            rectangle.width = 0;
            rectangle.height = 0;
          } else {
            rectangle.copyFromBounds(this);
          }
          return rectangle;
        }
        /** Clears the bounds and resets. */
        clear() {
          this.minX = Infinity;
          this.minY = Infinity;
          this.maxX = -Infinity;
          this.maxY = -Infinity;
          this.matrix = defaultMatrix;
          return this;
        }
        /**
         * Sets the bounds.
         * @param x0 - left X of frame
         * @param y0 - top Y of frame
         * @param x1 - right X of frame
         * @param y1 - bottom Y of frame
         */
        set(x0, y0, x1, y1) {
          this.minX = x0;
          this.minY = y0;
          this.maxX = x1;
          this.maxY = y1;
        }
        /**
         * Adds sprite frame
         * @param x0 - left X of frame
         * @param y0 - top Y of frame
         * @param x1 - right X of frame
         * @param y1 - bottom Y of frame
         * @param matrix
         */
        addFrame(x0, y0, x1, y1, matrix) {
          matrix || (matrix = this.matrix);
          const a2 = matrix.a;
          const b2 = matrix.b;
          const c2 = matrix.c;
          const d2 = matrix.d;
          const tx = matrix.tx;
          const ty = matrix.ty;
          let minX = this.minX;
          let minY = this.minY;
          let maxX = this.maxX;
          let maxY = this.maxY;
          let x2 = a2 * x0 + c2 * y0 + tx;
          let y2 = b2 * x0 + d2 * y0 + ty;
          if (x2 < minX)
            minX = x2;
          if (y2 < minY)
            minY = y2;
          if (x2 > maxX)
            maxX = x2;
          if (y2 > maxY)
            maxY = y2;
          x2 = a2 * x1 + c2 * y0 + tx;
          y2 = b2 * x1 + d2 * y0 + ty;
          if (x2 < minX)
            minX = x2;
          if (y2 < minY)
            minY = y2;
          if (x2 > maxX)
            maxX = x2;
          if (y2 > maxY)
            maxY = y2;
          x2 = a2 * x0 + c2 * y1 + tx;
          y2 = b2 * x0 + d2 * y1 + ty;
          if (x2 < minX)
            minX = x2;
          if (y2 < minY)
            minY = y2;
          if (x2 > maxX)
            maxX = x2;
          if (y2 > maxY)
            maxY = y2;
          x2 = a2 * x1 + c2 * y1 + tx;
          y2 = b2 * x1 + d2 * y1 + ty;
          if (x2 < minX)
            minX = x2;
          if (y2 < minY)
            minY = y2;
          if (x2 > maxX)
            maxX = x2;
          if (y2 > maxY)
            maxY = y2;
          this.minX = minX;
          this.minY = minY;
          this.maxX = maxX;
          this.maxY = maxY;
        }
        /**
         * Adds a rectangle to the bounds.
         * @param rect - The rectangle to be added.
         * @param matrix - The matrix to apply to the bounds.
         */
        addRect(rect, matrix) {
          this.addFrame(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height, matrix);
        }
        /**
         * Adds other {@link Bounds}.
         * @param bounds - The Bounds to be added
         * @param matrix
         */
        addBounds(bounds, matrix) {
          this.addFrame(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY, matrix);
        }
        /**
         * Adds other Bounds, masked with Bounds.
         * @param mask - The Bounds to be added.
         */
        addBoundsMask(mask) {
          this.minX = this.minX > mask.minX ? this.minX : mask.minX;
          this.minY = this.minY > mask.minY ? this.minY : mask.minY;
          this.maxX = this.maxX < mask.maxX ? this.maxX : mask.maxX;
          this.maxY = this.maxY < mask.maxY ? this.maxY : mask.maxY;
        }
        /**
         * Adds other Bounds, multiplied with matrix.
         * @param matrix - The matrix to apply to the bounds.
         */
        applyMatrix(matrix) {
          const minX = this.minX;
          const minY = this.minY;
          const maxX = this.maxX;
          const maxY = this.maxY;
          const { a: a2, b: b2, c: c2, d: d2, tx, ty } = matrix;
          let x2 = a2 * minX + c2 * minY + tx;
          let y2 = b2 * minX + d2 * minY + ty;
          this.minX = x2;
          this.minY = y2;
          this.maxX = x2;
          this.maxY = y2;
          x2 = a2 * maxX + c2 * minY + tx;
          y2 = b2 * maxX + d2 * minY + ty;
          this.minX = x2 < this.minX ? x2 : this.minX;
          this.minY = y2 < this.minY ? y2 : this.minY;
          this.maxX = x2 > this.maxX ? x2 : this.maxX;
          this.maxY = y2 > this.maxY ? y2 : this.maxY;
          x2 = a2 * minX + c2 * maxY + tx;
          y2 = b2 * minX + d2 * maxY + ty;
          this.minX = x2 < this.minX ? x2 : this.minX;
          this.minY = y2 < this.minY ? y2 : this.minY;
          this.maxX = x2 > this.maxX ? x2 : this.maxX;
          this.maxY = y2 > this.maxY ? y2 : this.maxY;
          x2 = a2 * maxX + c2 * maxY + tx;
          y2 = b2 * maxX + d2 * maxY + ty;
          this.minX = x2 < this.minX ? x2 : this.minX;
          this.minY = y2 < this.minY ? y2 : this.minY;
          this.maxX = x2 > this.maxX ? x2 : this.maxX;
          this.maxY = y2 > this.maxY ? y2 : this.maxY;
        }
        /**
         * Resizes the bounds object to include the given rectangle.
         * @param rect - The rectangle to be included.
         */
        fit(rect) {
          if (this.minX < rect.left)
            this.minX = rect.left;
          if (this.maxX > rect.right)
            this.maxX = rect.right;
          if (this.minY < rect.top)
            this.minY = rect.top;
          if (this.maxY > rect.bottom)
            this.maxY = rect.bottom;
          return this;
        }
        /**
         * Resizes the bounds object to include the given bounds.
         * @param left - The left value of the bounds.
         * @param right - The right value of the bounds.
         * @param top - The top value of the bounds.
         * @param bottom - The bottom value of the bounds.
         */
        fitBounds(left, right, top, bottom) {
          if (this.minX < left)
            this.minX = left;
          if (this.maxX > right)
            this.maxX = right;
          if (this.minY < top)
            this.minY = top;
          if (this.maxY > bottom)
            this.maxY = bottom;
          return this;
        }
        /**
         * Pads bounds object, making it grow in all directions.
         * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
         * @param paddingX - The horizontal padding amount.
         * @param paddingY - The vertical padding amount.
         */
        pad(paddingX, paddingY = paddingX) {
          this.minX -= paddingX;
          this.maxX += paddingX;
          this.minY -= paddingY;
          this.maxY += paddingY;
          return this;
        }
        /** Ceils the bounds. */
        ceil() {
          this.minX = Math.floor(this.minX);
          this.minY = Math.floor(this.minY);
          this.maxX = Math.ceil(this.maxX);
          this.maxY = Math.ceil(this.maxY);
          return this;
        }
        /** Clones the bounds. */
        clone() {
          return new _Bounds(this.minX, this.minY, this.maxX, this.maxY);
        }
        /**
         * Scales the bounds by the given values
         * @param x - The X value to scale by.
         * @param y - The Y value to scale by.
         */
        scale(x2, y2 = x2) {
          this.minX *= x2;
          this.minY *= y2;
          this.maxX *= x2;
          this.maxY *= y2;
          return this;
        }
        /** the x value of the bounds. */
        get x() {
          return this.minX;
        }
        set x(value) {
          const width = this.maxX - this.minX;
          this.minX = value;
          this.maxX = value + width;
        }
        /** the y value of the bounds. */
        get y() {
          return this.minY;
        }
        set y(value) {
          const height = this.maxY - this.minY;
          this.minY = value;
          this.maxY = value + height;
        }
        /** the width value of the bounds. */
        get width() {
          return this.maxX - this.minX;
        }
        set width(value) {
          this.maxX = this.minX + value;
        }
        /** the height value of the bounds. */
        get height() {
          return this.maxY - this.minY;
        }
        set height(value) {
          this.maxY = this.minY + value;
        }
        /** the left value of the bounds. */
        get left() {
          return this.minX;
        }
        /** the right value of the bounds. */
        get right() {
          return this.maxX;
        }
        /** the top value of the bounds. */
        get top() {
          return this.minY;
        }
        /** the bottom value of the bounds. */
        get bottom() {
          return this.maxY;
        }
        /** Is the bounds positive. */
        get isPositive() {
          return this.maxX - this.minX > 0 && this.maxY - this.minY > 0;
        }
        get isValid() {
          return this.minX + this.minY !== Infinity;
        }
        /**
         * Adds screen vertices from array
         * @param vertexData - calculated vertices
         * @param beginOffset - begin offset
         * @param endOffset - end offset, excluded
         * @param matrix
         */
        addVertexData(vertexData, beginOffset, endOffset, matrix) {
          let minX = this.minX;
          let minY = this.minY;
          let maxX = this.maxX;
          let maxY = this.maxY;
          matrix || (matrix = this.matrix);
          const a2 = matrix.a;
          const b2 = matrix.b;
          const c2 = matrix.c;
          const d2 = matrix.d;
          const tx = matrix.tx;
          const ty = matrix.ty;
          for (let i2 = beginOffset; i2 < endOffset; i2 += 2) {
            const localX = vertexData[i2];
            const localY = vertexData[i2 + 1];
            const x2 = a2 * localX + c2 * localY + tx;
            const y2 = b2 * localX + d2 * localY + ty;
            minX = x2 < minX ? x2 : minX;
            minY = y2 < minY ? y2 : minY;
            maxX = x2 > maxX ? x2 : maxX;
            maxY = y2 > maxY ? y2 : maxY;
          }
          this.minX = minX;
          this.minY = minY;
          this.maxX = maxX;
          this.maxY = maxY;
        }
        /**
         * Checks if the point is contained within the bounds.
         * @param x - x coordinate
         * @param y - y coordinate
         */
        containsPoint(x2, y2) {
          if (this.minX <= x2 && this.minY <= y2 && this.maxX >= x2 && this.maxY >= y2) {
            return true;
          }
          return false;
        }
        toString() {
          return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/bounds/utils/matrixAndBoundsPool.mjs
  var matrixPool, boundsPool;
  var init_matrixAndBoundsPool = __esm({
    "node_modules/pixi.js/lib/scene/container/bounds/utils/matrixAndBoundsPool.mjs"() {
      init_Matrix();
      init_Pool();
      init_Bounds();
      matrixPool = new Pool(Matrix);
      boundsPool = new Pool(Bounds);
    }
  });

  // node_modules/pixi.js/lib/scene/container/bounds/getGlobalBounds.mjs
  function getGlobalBounds(target, skipUpdateTransform, bounds) {
    bounds.clear();
    let parentTransform;
    let pooledMatrix;
    if (target.parent) {
      if (!skipUpdateTransform) {
        pooledMatrix = matrixPool.get().identity();
        parentTransform = updateTransformBackwards(target, pooledMatrix);
      } else {
        parentTransform = target.parent.worldTransform;
      }
    } else {
      parentTransform = Matrix.IDENTITY;
    }
    _getGlobalBounds(target, bounds, parentTransform, skipUpdateTransform);
    if (pooledMatrix) {
      matrixPool.return(pooledMatrix);
    }
    if (!bounds.isValid) {
      bounds.set(0, 0, 0, 0);
    }
    return bounds;
  }
  function _getGlobalBounds(target, bounds, parentTransform, skipUpdateTransform) {
    if (!target.visible || !target.measurable)
      return;
    let worldTransform;
    if (!skipUpdateTransform) {
      target.updateLocalTransform();
      worldTransform = matrixPool.get();
      worldTransform.appendFrom(target.localTransform, parentTransform);
    } else {
      worldTransform = target.worldTransform;
    }
    const parentBounds = bounds;
    const preserveBounds = !!target.effects.length;
    if (preserveBounds) {
      bounds = boundsPool.get().clear();
    }
    if (target.boundsArea) {
      bounds.addRect(target.boundsArea, worldTransform);
    } else {
      if (target.addBounds) {
        bounds.matrix = worldTransform;
        target.addBounds(bounds);
      }
      for (let i2 = 0; i2 < target.children.length; i2++) {
        _getGlobalBounds(target.children[i2], bounds, worldTransform, skipUpdateTransform);
      }
    }
    if (preserveBounds) {
      for (let i2 = 0; i2 < target.effects.length; i2++) {
        target.effects[i2].addBounds?.(bounds);
      }
      parentBounds.addBounds(bounds, Matrix.IDENTITY);
      boundsPool.return(bounds);
    }
    if (!skipUpdateTransform) {
      matrixPool.return(worldTransform);
    }
  }
  function updateTransformBackwards(target, parentTransform) {
    const parent = target.parent;
    if (parent) {
      updateTransformBackwards(parent, parentTransform);
      parent.updateLocalTransform();
      parentTransform.append(parent.localTransform);
    }
    return parentTransform;
  }
  var init_getGlobalBounds = __esm({
    "node_modules/pixi.js/lib/scene/container/bounds/getGlobalBounds.mjs"() {
      init_Matrix();
      init_matrixAndBoundsPool();
    }
  });

  // node_modules/pixi.js/lib/utils/logging/warn.mjs
  function warn(...args) {
    if (warnCount === maxWarnings)
      return;
    warnCount++;
    if (warnCount === maxWarnings) {
      console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.");
    } else {
      console.warn("PixiJS Warning: ", ...args);
    }
  }
  var warnCount, maxWarnings;
  var init_warn = __esm({
    "node_modules/pixi.js/lib/utils/logging/warn.mjs"() {
      "use strict";
      warnCount = 0;
      maxWarnings = 500;
    }
  });

  // node_modules/pixi.js/lib/scene/container/bounds/getLocalBounds.mjs
  function getLocalBounds(target, bounds, relativeMatrix) {
    bounds.clear();
    relativeMatrix || (relativeMatrix = Matrix.IDENTITY);
    _getLocalBounds(target, bounds, relativeMatrix, target, true);
    if (!bounds.isValid) {
      bounds.set(0, 0, 0, 0);
    }
    return bounds;
  }
  function _getLocalBounds(target, bounds, parentTransform, rootContainer, isRoot) {
    let relativeTransform;
    if (!isRoot) {
      if (!target.visible || !target.measurable)
        return;
      target.updateLocalTransform();
      const localTransform = target.localTransform;
      relativeTransform = matrixPool.get();
      relativeTransform.appendFrom(localTransform, parentTransform);
    } else {
      relativeTransform = matrixPool.get();
      relativeTransform = parentTransform.copyTo(relativeTransform);
    }
    const parentBounds = bounds;
    const preserveBounds = !!target.effects.length;
    if (preserveBounds) {
      bounds = boundsPool.get().clear();
    }
    if (target.boundsArea) {
      bounds.addRect(target.boundsArea, relativeTransform);
    } else {
      if (target.renderPipeId) {
        bounds.matrix = relativeTransform;
        target.addBounds(bounds);
      }
      const children = target.children;
      for (let i2 = 0; i2 < children.length; i2++) {
        _getLocalBounds(children[i2], bounds, relativeTransform, rootContainer, false);
      }
    }
    if (preserveBounds) {
      for (let i2 = 0; i2 < target.effects.length; i2++) {
        target.effects[i2].addLocalBounds?.(bounds, rootContainer);
      }
      parentBounds.addBounds(bounds, Matrix.IDENTITY);
      boundsPool.return(bounds);
    }
    matrixPool.return(relativeTransform);
  }
  var init_getLocalBounds = __esm({
    "node_modules/pixi.js/lib/scene/container/bounds/getLocalBounds.mjs"() {
      init_Matrix();
      init_matrixAndBoundsPool();
    }
  });

  // node_modules/pixi.js/lib/scene/container/utils/checkChildrenDidChange.mjs
  function checkChildrenDidChange(container, previousData) {
    const children = container.children;
    for (let i2 = 0; i2 < children.length; i2++) {
      const child = children[i2];
      const uid2 = child.uid;
      const didChange = (child._didViewChangeTick & 65535) << 16 | child._didContainerChangeTick & 65535;
      const index = previousData.index;
      if (previousData.data[index] !== uid2 || previousData.data[index + 1] !== didChange) {
        previousData.data[previousData.index] = uid2;
        previousData.data[previousData.index + 1] = didChange;
        previousData.didChange = true;
      }
      previousData.index = index + 2;
      if (child.children.length) {
        checkChildrenDidChange(child, previousData);
      }
    }
    return previousData.didChange;
  }
  var init_checkChildrenDidChange = __esm({
    "node_modules/pixi.js/lib/scene/container/utils/checkChildrenDidChange.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.mjs
  var tempMatrix2, measureMixin;
  var init_measureMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.mjs"() {
      init_Matrix();
      init_Bounds();
      init_getGlobalBounds();
      init_getLocalBounds();
      init_checkChildrenDidChange();
      tempMatrix2 = new Matrix();
      measureMixin = {
        _localBoundsCacheId: -1,
        _localBoundsCacheData: null,
        _setWidth(value, localWidth) {
          const sign = Math.sign(this.scale.x) || 1;
          if (localWidth !== 0) {
            this.scale.x = value / localWidth * sign;
          } else {
            this.scale.x = sign;
          }
        },
        _setHeight(value, localHeight) {
          const sign = Math.sign(this.scale.y) || 1;
          if (localHeight !== 0) {
            this.scale.y = value / localHeight * sign;
          } else {
            this.scale.y = sign;
          }
        },
        /**
         * Retrieves the local bounds of the container as a Bounds object.
         * @returns - The bounding area.
         * @memberof scene.Container#
         */
        getLocalBounds() {
          if (!this._localBoundsCacheData) {
            this._localBoundsCacheData = {
              data: [],
              index: 1,
              didChange: false,
              localBounds: new Bounds()
            };
          }
          const localBoundsCacheData = this._localBoundsCacheData;
          localBoundsCacheData.index = 1;
          localBoundsCacheData.didChange = false;
          if (localBoundsCacheData.data[0] !== this._didViewChangeTick) {
            localBoundsCacheData.didChange = true;
            localBoundsCacheData.data[0] = this._didViewChangeTick;
          }
          checkChildrenDidChange(this, localBoundsCacheData);
          if (localBoundsCacheData.didChange) {
            getLocalBounds(this, localBoundsCacheData.localBounds, tempMatrix2);
          }
          return localBoundsCacheData.localBounds;
        },
        /**
         * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link Rectangle}.
         * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
         *  being updated. This means the calculation returned MAY be out of date BUT will give you a
         *  nice performance boost.
         * @param bounds - Optional bounds to store the result of the bounds calculation.
         * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
         * @memberof scene.Container#
         */
        getBounds(skipUpdate, bounds) {
          return getGlobalBounds(this, skipUpdate, bounds || new Bounds());
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.mjs
  var onRenderMixin;
  var init_onRenderMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.mjs"() {
      "use strict";
      onRenderMixin = {
        _onRender: null,
        set onRender(func) {
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (!func) {
            if (this._onRender) {
              renderGroup?.removeOnRender(this);
            }
            this._onRender = null;
            return;
          }
          if (!this._onRender) {
            renderGroup?.addOnRender(this);
          }
          this._onRender = func;
        },
        /**
         * This callback is used when the container is rendered. This is where you should add your custom
         * logic that is needed to be run every frame.
         *
         * In v7 many users used `updateTransform` for this, however the way v8 renders objects is different
         * and "updateTransform" is no longer called every frame
         * @example
         * const container = new Container();
         * container.onRender = () => {
         *    container.rotation += 0.01;
         * };
         * @memberof scene.Container#
         */
        get onRender() {
          return this._onRender;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.mjs
  function sortChildren(a2, b2) {
    return a2._zIndex - b2._zIndex;
  }
  var sortMixin;
  var init_sortMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.mjs"() {
      "use strict";
      sortMixin = {
        _zIndex: 0,
        /**
         * Should children be sorted by zIndex at the next render call.
         *
         * Will get automatically set to true if a new child is added, or if a child's zIndex changes.
         * @type {boolean}
         * @memberof scene.Container#
         */
        sortDirty: false,
        /**
         * If set to true, the container will sort its children by `zIndex` value
         * when the next render is called, or manually if `sortChildren()` is called.
         *
         * This actually changes the order of elements in the array, so should be treated
         * as a basic solution that is not performant compared to other solutions,
         * such as {@link https://github.com/pixijs/layers PixiJS Layers}
         *
         * Also be aware of that this may not work nicely with the `addChildAt()` function,
         * as the `zIndex` sorting may cause the child to automatically sorted to another position.
         * @type {boolean}
         * @memberof scene.Container#
         */
        sortableChildren: false,
        /**
         * The zIndex of the container.
         *
         * Setting this value, will automatically set the parent to be sortable. Children will be automatically
         * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
         * and thus rendered on top of other display objects within the same container.
         * @see scene.Container#sortableChildren
         * @memberof scene.Container#
         */
        get zIndex() {
          return this._zIndex;
        },
        set zIndex(value) {
          if (this._zIndex === value)
            return;
          this._zIndex = value;
          this.depthOfChildModified();
        },
        depthOfChildModified() {
          if (this.parent) {
            this.parent.sortableChildren = true;
            this.parent.sortDirty = true;
          }
          if (this.parentRenderGroup) {
            this.parentRenderGroup.structureDidChange = true;
          }
        },
        /**
         * Sorts children by zIndex.
         * @memberof scene.Container#
         */
        sortChildren() {
          if (!this.sortDirty)
            return;
          this.sortDirty = false;
          this.children.sort(sortChildren);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.mjs
  var toLocalGlobalMixin;
  var init_toLocalGlobalMixin = __esm({
    "node_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.mjs"() {
      init_Matrix();
      init_Point();
      init_getGlobalBounds();
      toLocalGlobalMixin = {
        /**
         * Returns the global position of the container.
         * @param point - The optional point to write the global value to.
         * @param skipUpdate - Should we skip the update transform.
         * @returns - The updated point.
         * @memberof scene.Container#
         */
        getGlobalPosition(point = new Point(), skipUpdate = false) {
          if (this.parent) {
            this.parent.toGlobal(this._position, point, skipUpdate);
          } else {
            point.x = this._position.x;
            point.y = this._position.y;
          }
          return point;
        },
        /**
         * Calculates the global position of the container.
         * @param position - The world origin to calculate from.
         * @param point - A Point object in which to store the value, optional
         *  (otherwise will create a new Point).
         * @param skipUpdate - Should we skip the update transform.
         * @returns - A point object representing the position of this object.
         * @memberof scene.Container#
         */
        toGlobal(position, point, skipUpdate = false) {
          if (!skipUpdate) {
            this.updateLocalTransform();
            const globalMatrix = updateTransformBackwards(this, new Matrix());
            globalMatrix.append(this.localTransform);
            return globalMatrix.apply(position, point);
          }
          return this.worldTransform.apply(position, point);
        },
        /**
         * Calculates the local position of the container relative to another point.
         * @param position - The world origin to calculate from.
         * @param from - The Container to calculate the global position from.
         * @param point - A Point object in which to store the value, optional
         *  (otherwise will create a new Point).
         * @param skipUpdate - Should we skip the update transform
         * @returns - A point object representing the position of this object
         * @memberof scene.Container#
         */
        toLocal(position, from, point, skipUpdate) {
          if (from) {
            position = from.toGlobal(position, point, skipUpdate);
          }
          if (!skipUpdate) {
            this.updateLocalTransform();
            const globalMatrix = updateTransformBackwards(this, new Matrix());
            globalMatrix.append(this.localTransform);
            return globalMatrix.applyInverse(position, point);
          }
          return this.worldTransform.applyInverse(position, point);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/instructions/InstructionSet.mjs
  var _tick, InstructionSet;
  var init_InstructionSet = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/instructions/InstructionSet.mjs"() {
      init_uid();
      _tick = 0;
      InstructionSet = class {
        constructor() {
          this.uid = uid("instructionSet");
          this.instructions = [];
          this.instructionSize = 0;
          this.renderables = [];
          this.tick = 0;
        }
        /** reset the instruction set so it can be reused set size back to 0 */
        reset() {
          this.instructionSize = 0;
          this.tick = _tick++;
        }
        /**
         * Add an instruction to the set
         * @param instruction - add an instruction to the set
         */
        add(instruction) {
          this.instructions[this.instructionSize++] = instruction;
        }
        /**
         * Log the instructions to the console (for debugging)
         * @internal
         * @ignore
         */
        log() {
          this.instructions.length = this.instructionSize;
          console.table(this.instructions, ["type", "action"]);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/RenderGroup.mjs
  var RenderGroup;
  var init_RenderGroup = __esm({
    "node_modules/pixi.js/lib/scene/container/RenderGroup.mjs"() {
      init_Matrix();
      init_InstructionSet();
      RenderGroup = class {
        constructor() {
          this.renderPipeId = "renderGroup";
          this.root = null;
          this.canBundle = false;
          this.renderGroupParent = null;
          this.renderGroupChildren = [];
          this.worldTransform = new Matrix();
          this.worldColorAlpha = 4294967295;
          this.worldColor = 16777215;
          this.worldAlpha = 1;
          this.childrenToUpdate = /* @__PURE__ */ Object.create(null);
          this.updateTick = 0;
          this.childrenRenderablesToUpdate = { list: [], index: 0 };
          this.structureDidChange = true;
          this.instructionSet = new InstructionSet();
          this._onRenderContainers = [];
        }
        init(root) {
          this.root = root;
          if (root._onRender)
            this.addOnRender(root);
          root.didChange = true;
          const children = root.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            this.addChild(children[i2]);
          }
        }
        reset() {
          this.renderGroupChildren.length = 0;
          for (const i2 in this.childrenToUpdate) {
            const childrenAtDepth = this.childrenToUpdate[i2];
            childrenAtDepth.list.fill(null);
            childrenAtDepth.index = 0;
          }
          this.childrenRenderablesToUpdate.index = 0;
          this.childrenRenderablesToUpdate.list.fill(null);
          this.root = null;
          this.updateTick = 0;
          this.structureDidChange = true;
          this._onRenderContainers.length = 0;
          this.renderGroupParent = null;
        }
        get localTransform() {
          return this.root.localTransform;
        }
        addRenderGroupChild(renderGroupChild) {
          if (renderGroupChild.renderGroupParent) {
            renderGroupChild.renderGroupParent._removeRenderGroupChild(renderGroupChild);
          }
          renderGroupChild.renderGroupParent = this;
          this.renderGroupChildren.push(renderGroupChild);
        }
        _removeRenderGroupChild(renderGroupChild) {
          const index = this.renderGroupChildren.indexOf(renderGroupChild);
          if (index > -1) {
            this.renderGroupChildren.splice(index, 1);
          }
          renderGroupChild.renderGroupParent = null;
        }
        addChild(child) {
          this.structureDidChange = true;
          child.parentRenderGroup = this;
          child.updateTick = -1;
          if (child.parent === this.root) {
            child.relativeRenderGroupDepth = 1;
          } else {
            child.relativeRenderGroupDepth = child.parent.relativeRenderGroupDepth + 1;
          }
          child.didChange = true;
          this.onChildUpdate(child);
          if (child.renderGroup) {
            this.addRenderGroupChild(child.renderGroup);
            return;
          }
          if (child._onRender)
            this.addOnRender(child);
          const children = child.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            this.addChild(children[i2]);
          }
        }
        removeChild(child) {
          this.structureDidChange = true;
          if (child._onRender) {
            if (!child.renderGroup) {
              this.removeOnRender(child);
            }
          }
          child.parentRenderGroup = null;
          if (child.renderGroup) {
            this._removeRenderGroupChild(child.renderGroup);
            return;
          }
          const children = child.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            this.removeChild(children[i2]);
          }
        }
        removeChildren(children) {
          for (let i2 = 0; i2 < children.length; i2++) {
            this.removeChild(children[i2]);
          }
        }
        onChildUpdate(child) {
          let childrenToUpdate = this.childrenToUpdate[child.relativeRenderGroupDepth];
          if (!childrenToUpdate) {
            childrenToUpdate = this.childrenToUpdate[child.relativeRenderGroupDepth] = {
              index: 0,
              list: []
            };
          }
          childrenToUpdate.list[childrenToUpdate.index++] = child;
        }
        // SHOULD THIS BE HERE?
        updateRenderable(container) {
          if (container.globalDisplayStatus < 7)
            return;
          container.didViewUpdate = false;
          this.instructionSet.renderPipes[container.renderPipeId].updateRenderable(container);
        }
        onChildViewUpdate(child) {
          this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = child;
        }
        get isRenderable() {
          return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
        }
        /**
         * adding a container to the onRender list will make sure the user function
         * passed in to the user defined 'onRender` callBack
         * @param container - the container to add to the onRender list
         */
        addOnRender(container) {
          this._onRenderContainers.push(container);
        }
        removeOnRender(container) {
          this._onRenderContainers.splice(this._onRenderContainers.indexOf(container), 1);
        }
        runOnRender() {
          for (let i2 = 0; i2 < this._onRenderContainers.length; i2++) {
            this._onRenderContainers[i2]._onRender();
          }
        }
        destroy() {
          this.renderGroupParent = null;
          this.root = null;
          this.childrenRenderablesToUpdate = null;
          this.childrenToUpdate = null;
          this.renderGroupChildren = null;
          this._onRenderContainers = null;
          this.instructionSet = null;
        }
        getChildren(out2 = []) {
          const children = this.root.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            this._getChildren(children[i2], out2);
          }
          return out2;
        }
        _getChildren(container, out2 = []) {
          out2.push(container);
          if (container.renderGroup)
            return out2;
          const children = container.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            this._getChildren(children[i2], out2);
          }
          return out2;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/utils/assignWithIgnore.mjs
  function assignWithIgnore(target, options, ignore = {}) {
    for (const key in options) {
      if (!ignore[key] && options[key] !== void 0) {
        target[key] = options[key];
      }
    }
  }
  var init_assignWithIgnore = __esm({
    "node_modules/pixi.js/lib/scene/container/utils/assignWithIgnore.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/container/Container.mjs
  var defaultSkew, defaultPivot, defaultScale, UPDATE_COLOR, UPDATE_BLEND, UPDATE_VISIBLE, Container;
  var init_Container = __esm({
    "node_modules/pixi.js/lib/scene/container/Container.mjs"() {
      init_eventemitter3();
      init_Color();
      init_cullingMixin();
      init_Matrix();
      init_const();
      init_ObservablePoint();
      init_uid();
      init_deprecation();
      init_PoolGroup();
      init_childrenHelperMixin();
      init_effectsMixin();
      init_findMixin();
      init_measureMixin();
      init_onRenderMixin();
      init_sortMixin();
      init_toLocalGlobalMixin();
      init_RenderGroup();
      init_assignWithIgnore();
      defaultSkew = new ObservablePoint(null);
      defaultPivot = new ObservablePoint(null);
      defaultScale = new ObservablePoint(null, 1, 1);
      UPDATE_COLOR = 1;
      UPDATE_BLEND = 2;
      UPDATE_VISIBLE = 4;
      Container = class _Container extends eventemitter3_default {
        constructor(options = {}) {
          super();
          this.uid = uid("renderable");
          this._updateFlags = 15;
          this.renderGroup = null;
          this.parentRenderGroup = null;
          this.parentRenderGroupIndex = 0;
          this.didChange = false;
          this.didViewUpdate = false;
          this.relativeRenderGroupDepth = 0;
          this.children = [];
          this.parent = null;
          this.includeInBuild = true;
          this.measurable = true;
          this.isSimple = true;
          this.updateTick = -1;
          this.localTransform = new Matrix();
          this.relativeGroupTransform = new Matrix();
          this.groupTransform = this.relativeGroupTransform;
          this.destroyed = false;
          this._position = new ObservablePoint(this, 0, 0);
          this._scale = defaultScale;
          this._pivot = defaultPivot;
          this._skew = defaultSkew;
          this._cx = 1;
          this._sx = 0;
          this._cy = 0;
          this._sy = 1;
          this._rotation = 0;
          this.localColor = 16777215;
          this.localAlpha = 1;
          this.groupAlpha = 1;
          this.groupColor = 16777215;
          this.groupColorAlpha = 4294967295;
          this.localBlendMode = "inherit";
          this.groupBlendMode = "normal";
          this.localDisplayStatus = 7;
          this.globalDisplayStatus = 7;
          this._didContainerChangeTick = 0;
          this._didViewChangeTick = 0;
          this._didLocalTransformChangeId = -1;
          this.effects = [];
          assignWithIgnore(this, options, {
            children: true,
            parent: true,
            effects: true
          });
          options.children?.forEach((child) => this.addChild(child));
          options.parent?.addChild(this);
        }
        /**
         * Mixes all enumerable properties and methods from a source object to Container.
         * @param source - The source of properties and methods to mix in.
         */
        static mixin(source) {
          Object.defineProperties(_Container.prototype, Object.getOwnPropertyDescriptors(source));
        }
        /**
         * We now use the _didContainerChangeTick and _didViewChangeTick to track changes
         * @deprecated since 8.2.6
         * @ignore
         */
        set _didChangeId(value) {
          this._didViewChangeTick = value >> 12 & 4095;
          this._didContainerChangeTick = value & 4095;
        }
        get _didChangeId() {
          return this._didContainerChangeTick & 4095 | (this._didViewChangeTick & 4095) << 12;
        }
        /**
         * Adds one or more children to the container.
         *
         * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
         * @param {...Container} children - The Container(s) to add to the container
         * @returns {Container} - The first child that was added.
         */
        addChild(...children) {
          if (!this.allowChildren) {
            deprecation(v8_0_0, "addChild: Only Containers will be allowed to add children in v8.0.0");
          }
          if (children.length > 1) {
            for (let i2 = 0; i2 < children.length; i2++) {
              this.addChild(children[i2]);
            }
            return children[0];
          }
          const child = children[0];
          if (child.parent === this) {
            this.children.splice(this.children.indexOf(child), 1);
            this.children.push(child);
            if (this.parentRenderGroup) {
              this.parentRenderGroup.structureDidChange = true;
            }
            return child;
          }
          if (child.parent) {
            child.parent.removeChild(child);
          }
          this.children.push(child);
          if (this.sortableChildren)
            this.sortDirty = true;
          child.parent = this;
          child.didChange = true;
          child.didViewUpdate = false;
          child._updateFlags = 15;
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (renderGroup) {
            renderGroup.addChild(child);
          }
          this.emit("childAdded", child, this, this.children.length - 1);
          child.emit("added", this);
          this._didViewChangeTick++;
          if (child._zIndex !== 0) {
            child.depthOfChildModified();
          }
          return child;
        }
        /**
         * Removes one or more children from the container.
         * @param {...Container} children - The Container(s) to remove
         * @returns {Container} The first child that was removed.
         */
        removeChild(...children) {
          if (children.length > 1) {
            for (let i2 = 0; i2 < children.length; i2++) {
              this.removeChild(children[i2]);
            }
            return children[0];
          }
          const child = children[0];
          const index = this.children.indexOf(child);
          if (index > -1) {
            this._didViewChangeTick++;
            this.children.splice(index, 1);
            if (this.renderGroup) {
              this.renderGroup.removeChild(child);
            } else if (this.parentRenderGroup) {
              this.parentRenderGroup.removeChild(child);
            }
            child.parent = null;
            this.emit("childRemoved", child, this, index);
            child.emit("removed", this);
          }
          return child;
        }
        /** @ignore */
        _onUpdate(point) {
          if (point) {
            if (point === this._skew) {
              this._updateSkew();
            }
          }
          this._didContainerChangeTick++;
          if (this.didChange)
            return;
          this.didChange = true;
          if (this.parentRenderGroup) {
            this.parentRenderGroup.onChildUpdate(this);
          }
        }
        set isRenderGroup(value) {
          if (!!this.renderGroup === value)
            return;
          if (value) {
            this.enableRenderGroup();
          } else {
            this.disableRenderGroup();
          }
        }
        /**
         * Returns true if this container is a render group.
         * This means that it will be rendered as a separate pass, with its own set of instructions
         */
        get isRenderGroup() {
          return !!this.renderGroup;
        }
        /**
         * Calling this enables a render group for this container.
         * This means it will be rendered as a separate set of instructions.
         * The transform of the container will also be handled on the GPU rather than the CPU.
         */
        enableRenderGroup() {
          if (this.renderGroup)
            return;
          const parentRenderGroup = this.parentRenderGroup;
          parentRenderGroup?.removeChild(this);
          this.renderGroup = BigPool.get(RenderGroup, this);
          this.groupTransform = Matrix.IDENTITY;
          parentRenderGroup?.addChild(this);
          this._updateIsSimple();
        }
        /** This will disable the render group for this container. */
        disableRenderGroup() {
          if (!this.renderGroup)
            return;
          const parentRenderGroup = this.parentRenderGroup;
          parentRenderGroup?.removeChild(this);
          BigPool.return(this.renderGroup);
          this.renderGroup = null;
          this.groupTransform = this.relativeGroupTransform;
          parentRenderGroup?.addChild(this);
          this._updateIsSimple();
        }
        /** @ignore */
        _updateIsSimple() {
          this.isSimple = !this.renderGroup && this.effects.length === 0;
        }
        /**
         * Current transform of the object based on world (parent) factors.
         * @readonly
         */
        get worldTransform() {
          this._worldTransform || (this._worldTransform = new Matrix());
          if (this.renderGroup) {
            this._worldTransform.copyFrom(this.renderGroup.worldTransform);
          } else if (this.parentRenderGroup) {
            this._worldTransform.appendFrom(this.relativeGroupTransform, this.parentRenderGroup.worldTransform);
          }
          return this._worldTransform;
        }
        // / ////// transform related stuff
        /**
         * The position of the container on the x axis relative to the local coordinates of the parent.
         * An alias to position.x
         */
        get x() {
          return this._position.x;
        }
        set x(value) {
          this._position.x = value;
        }
        /**
         * The position of the container on the y axis relative to the local coordinates of the parent.
         * An alias to position.y
         */
        get y() {
          return this._position.y;
        }
        set y(value) {
          this._position.y = value;
        }
        /**
         * The coordinate of the object relative to the local coordinates of the parent.
         * @since 4.0.0
         */
        get position() {
          return this._position;
        }
        set position(value) {
          this._position.copyFrom(value);
        }
        /**
         * The rotation of the object in radians.
         * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
         */
        get rotation() {
          return this._rotation;
        }
        set rotation(value) {
          if (this._rotation !== value) {
            this._rotation = value;
            this._onUpdate(this._skew);
          }
        }
        /**
         * The angle of the object in degrees.
         * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
         */
        get angle() {
          return this.rotation * RAD_TO_DEG;
        }
        set angle(value) {
          this.rotation = value * DEG_TO_RAD;
        }
        /**
         * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
         * is the projection of `pivot` in the parent's local space.
         *
         * By default, the pivot is the origin (0, 0).
         * @since 4.0.0
         */
        get pivot() {
          if (this._pivot === defaultPivot) {
            this._pivot = new ObservablePoint(this, 0, 0);
          }
          return this._pivot;
        }
        set pivot(value) {
          if (this._pivot === defaultPivot) {
            this._pivot = new ObservablePoint(this, 0, 0);
          }
          typeof value === "number" ? this._pivot.set(value) : this._pivot.copyFrom(value);
        }
        /**
         * The skew factor for the object in radians.
         * @since 4.0.0
         */
        get skew() {
          if (this._skew === defaultSkew) {
            this._skew = new ObservablePoint(this, 0, 0);
          }
          return this._skew;
        }
        set skew(value) {
          if (this._skew === defaultSkew) {
            this._skew = new ObservablePoint(this, 0, 0);
          }
          this._skew.copyFrom(value);
        }
        /**
         * The scale factors of this object along the local coordinate axes.
         *
         * The default scale is (1, 1).
         * @since 4.0.0
         */
        get scale() {
          if (this._scale === defaultScale) {
            this._scale = new ObservablePoint(this, 1, 1);
          }
          return this._scale;
        }
        set scale(value) {
          if (this._scale === defaultScale) {
            this._scale = new ObservablePoint(this, 0, 0);
          }
          typeof value === "number" ? this._scale.set(value) : this._scale.copyFrom(value);
        }
        /**
         * The width of the Container, setting this will actually modify the scale to achieve the value set.
         * @memberof scene.Container#
         */
        get width() {
          return Math.abs(this.scale.x * this.getLocalBounds().width);
        }
        set width(value) {
          const localWidth = this.getLocalBounds().width;
          this._setWidth(value, localWidth);
        }
        /**
         * The height of the Container, setting this will actually modify the scale to achieve the value set.
         * @memberof scene.Container#
         */
        get height() {
          return Math.abs(this.scale.y * this.getLocalBounds().height);
        }
        set height(value) {
          const localHeight = this.getLocalBounds().height;
          this._setHeight(value, localHeight);
        }
        /**
         * Retrieves the size of the container as a [Size]{@link Size} object.
         * This is faster than get the width and height separately.
         * @param out - Optional object to store the size in.
         * @returns - The size of the container.
         * @memberof scene.Container#
         */
        getSize(out2) {
          if (!out2) {
            out2 = {};
          }
          const bounds = this.getLocalBounds();
          out2.width = Math.abs(this.scale.x * bounds.width);
          out2.height = Math.abs(this.scale.y * bounds.height);
          return out2;
        }
        /**
         * Sets the size of the container to the specified width and height.
         * This is faster than setting the width and height separately.
         * @param value - This can be either a number or a [Size]{@link Size} object.
         * @param height - The height to set. Defaults to the value of `width` if not provided.
         * @memberof scene.Container#
         */
        setSize(value, height) {
          const size = this.getLocalBounds();
          if (typeof value === "object") {
            height = value.height ?? value.width;
            value = value.width;
          } else {
            height ?? (height = value);
          }
          value !== void 0 && this._setWidth(value, size.width);
          height !== void 0 && this._setHeight(height, size.height);
        }
        /** Called when the skew or the rotation changes. */
        _updateSkew() {
          const rotation = this._rotation;
          const skew = this._skew;
          this._cx = Math.cos(rotation + skew._y);
          this._sx = Math.sin(rotation + skew._y);
          this._cy = -Math.sin(rotation - skew._x);
          this._sy = Math.cos(rotation - skew._x);
        }
        /**
         * Updates the transform properties of the container (accepts partial values).
         * @param {object} opts - The options for updating the transform.
         * @param {number} opts.x - The x position of the container.
         * @param {number} opts.y - The y position of the container.
         * @param {number} opts.scaleX - The scale factor on the x-axis.
         * @param {number} opts.scaleY - The scale factor on the y-axis.
         * @param {number} opts.rotation - The rotation of the container, in radians.
         * @param {number} opts.skewX - The skew factor on the x-axis.
         * @param {number} opts.skewY - The skew factor on the y-axis.
         * @param {number} opts.pivotX - The x coordinate of the pivot point.
         * @param {number} opts.pivotY - The y coordinate of the pivot point.
         */
        updateTransform(opts) {
          this.position.set(
            typeof opts.x === "number" ? opts.x : this.position.x,
            typeof opts.y === "number" ? opts.y : this.position.y
          );
          this.scale.set(
            typeof opts.scaleX === "number" ? opts.scaleX || 1 : this.scale.x,
            typeof opts.scaleY === "number" ? opts.scaleY || 1 : this.scale.y
          );
          this.rotation = typeof opts.rotation === "number" ? opts.rotation : this.rotation;
          this.skew.set(
            typeof opts.skewX === "number" ? opts.skewX : this.skew.x,
            typeof opts.skewY === "number" ? opts.skewY : this.skew.y
          );
          this.pivot.set(
            typeof opts.pivotX === "number" ? opts.pivotX : this.pivot.x,
            typeof opts.pivotY === "number" ? opts.pivotY : this.pivot.y
          );
          return this;
        }
        /**
         * Updates the local transform using the given matrix.
         * @param matrix - The matrix to use for updating the transform.
         */
        setFromMatrix(matrix) {
          matrix.decompose(this);
        }
        /** Updates the local transform. */
        updateLocalTransform() {
          const localTransformChangeId = this._didContainerChangeTick;
          if (this._didLocalTransformChangeId === localTransformChangeId)
            return;
          this._didLocalTransformChangeId = localTransformChangeId;
          const lt = this.localTransform;
          const scale = this._scale;
          const pivot = this._pivot;
          const position = this._position;
          const sx = scale._x;
          const sy = scale._y;
          const px = pivot._x;
          const py = pivot._y;
          lt.a = this._cx * sx;
          lt.b = this._sx * sx;
          lt.c = this._cy * sy;
          lt.d = this._sy * sy;
          lt.tx = position._x - (px * lt.a + py * lt.c);
          lt.ty = position._y - (px * lt.b + py * lt.d);
        }
        // / ///// color related stuff
        set alpha(value) {
          if (value === this.localAlpha)
            return;
          this.localAlpha = value;
          this._updateFlags |= UPDATE_COLOR;
          this._onUpdate();
        }
        /** The opacity of the object. */
        get alpha() {
          return this.localAlpha;
        }
        set tint(value) {
          const tempColor = Color.shared.setValue(value ?? 16777215);
          const bgr = tempColor.toBgrNumber();
          if (bgr === this.localColor)
            return;
          this.localColor = bgr;
          this._updateFlags |= UPDATE_COLOR;
          this._onUpdate();
        }
        /**
         * The tint applied to the sprite. This is a hex value.
         *
         * A value of 0xFFFFFF will remove any tint effect.
         * @default 0xFFFFFF
         */
        get tint() {
          const bgr = this.localColor;
          return ((bgr & 255) << 16) + (bgr & 65280) + (bgr >> 16 & 255);
        }
        // / //////////////// blend related stuff
        set blendMode(value) {
          if (this.localBlendMode === value)
            return;
          if (this.parentRenderGroup) {
            this.parentRenderGroup.structureDidChange = true;
          }
          this._updateFlags |= UPDATE_BLEND;
          this.localBlendMode = value;
          this._onUpdate();
        }
        /**
         * The blend mode to be applied to the sprite. Apply a value of `'normal'` to reset the blend mode.
         * @default 'normal'
         */
        get blendMode() {
          return this.localBlendMode;
        }
        // / ///////// VISIBILITY / RENDERABLE /////////////////
        /** The visibility of the object. If false the object will not be drawn, and the transform will not be updated. */
        get visible() {
          return !!(this.localDisplayStatus & 2);
        }
        set visible(value) {
          const valueNumber = value ? 2 : 0;
          if ((this.localDisplayStatus & 2) === valueNumber)
            return;
          if (this.parentRenderGroup) {
            this.parentRenderGroup.structureDidChange = true;
          }
          this._updateFlags |= UPDATE_VISIBLE;
          this.localDisplayStatus ^= 2;
          this._onUpdate();
        }
        /** @ignore */
        get culled() {
          return !(this.localDisplayStatus & 4);
        }
        /** @ignore */
        set culled(value) {
          const valueNumber = value ? 0 : 4;
          if ((this.localDisplayStatus & 4) === valueNumber)
            return;
          if (this.parentRenderGroup) {
            this.parentRenderGroup.structureDidChange = true;
          }
          this._updateFlags |= UPDATE_VISIBLE;
          this.localDisplayStatus ^= 4;
          this._onUpdate();
        }
        /** Can this object be rendered, if false the object will not be drawn but the transform will still be updated. */
        get renderable() {
          return !!(this.localDisplayStatus & 1);
        }
        set renderable(value) {
          const valueNumber = value ? 1 : 0;
          if ((this.localDisplayStatus & 1) === valueNumber)
            return;
          this._updateFlags |= UPDATE_VISIBLE;
          this.localDisplayStatus ^= 1;
          if (this.parentRenderGroup) {
            this.parentRenderGroup.structureDidChange = true;
          }
          this._onUpdate();
        }
        /** Whether or not the object should be rendered. */
        get isRenderable() {
          return this.localDisplayStatus === 7 && this.groupAlpha > 0;
        }
        /**
         * Removes all internal references and listeners as well as removes children from the display list.
         * Do not use a Container after calling `destroy`.
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
         *  method called as well. 'options' will be passed on to those calls.
         * @param {boolean} [options.texture=false] - Only used for children with textures e.g. Sprites. If options.children
         * is set to true it should destroy the texture of the child sprite
         * @param {boolean} [options.textureSource=false] - Only used for children with textures e.g. Sprites.
         * If options.children is set to true it should destroy the texture source of the child sprite
         * @param {boolean} [options.context=false] - Only used for children with graphicsContexts e.g. Graphics.
         * If options.children is set to true it should destroy the context of the child graphics
         */
        destroy(options = false) {
          if (this.destroyed)
            return;
          this.destroyed = true;
          const oldChildren = this.removeChildren(0, this.children.length);
          this.removeFromParent();
          this.parent = null;
          this._maskEffect = null;
          this._filterEffect = null;
          this.effects = null;
          this._position = null;
          this._scale = null;
          this._pivot = null;
          this._skew = null;
          this.emit("destroyed", this);
          this.removeAllListeners();
          const destroyChildren = typeof options === "boolean" ? options : options?.children;
          if (destroyChildren) {
            for (let i2 = 0; i2 < oldChildren.length; ++i2) {
              oldChildren[i2].destroy(options);
            }
          }
          this.renderGroup?.destroy();
          this.renderGroup = null;
        }
      };
      Container.mixin(childrenHelperMixin);
      Container.mixin(toLocalGlobalMixin);
      Container.mixin(onRenderMixin);
      Container.mixin(measureMixin);
      Container.mixin(effectsMixin);
      Container.mixin(findMixin);
      Container.mixin(sortMixin);
      Container.mixin(cullingMixin);
    }
  });

  // node_modules/pixi.js/lib/events/FederatedEvent.mjs
  var FederatedEvent;
  var init_FederatedEvent = __esm({
    "node_modules/pixi.js/lib/events/FederatedEvent.mjs"() {
      init_Point();
      FederatedEvent = class _FederatedEvent {
        /**
         * @param manager - The event boundary which manages this event. Propagation can only occur
         *  within the boundary's jurisdiction.
         */
        constructor(manager) {
          this.bubbles = true;
          this.cancelBubble = true;
          this.cancelable = false;
          this.composed = false;
          this.defaultPrevented = false;
          this.eventPhase = _FederatedEvent.prototype.NONE;
          this.propagationStopped = false;
          this.propagationImmediatelyStopped = false;
          this.layer = new Point();
          this.page = new Point();
          this.NONE = 0;
          this.CAPTURING_PHASE = 1;
          this.AT_TARGET = 2;
          this.BUBBLING_PHASE = 3;
          this.manager = manager;
        }
        /** @readonly */
        get layerX() {
          return this.layer.x;
        }
        /** @readonly */
        get layerY() {
          return this.layer.y;
        }
        /** @readonly */
        get pageX() {
          return this.page.x;
        }
        /** @readonly */
        get pageY() {
          return this.page.y;
        }
        /**
         * Fallback for the deprecated @code{InteractionEvent.data}.
         * @deprecated since 7.0.0
         */
        get data() {
          return this;
        }
        /** The propagation path for this event. Alias for {@link EventBoundary.propagationPath}. */
        composedPath() {
          if (this.manager && (!this.path || this.path[this.path.length - 1] !== this.target)) {
            this.path = this.target ? this.manager.propagationPath(this.target) : [];
          }
          return this.path;
        }
        /**
         * Unimplemented method included for implementing the DOM interface {@code Event}. It will throw an {@code Error}.
         * @deprecated
         * @param _type
         * @param _bubbles
         * @param _cancelable
         */
        initEvent(_type, _bubbles, _cancelable) {
          throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
        }
        /**
         * Unimplemented method included for implementing the DOM interface {@code UIEvent}. It will throw an {@code Error}.
         * @deprecated
         * @param _typeArg
         * @param _bubblesArg
         * @param _cancelableArg
         * @param _viewArg
         * @param _detailArg
         */
        initUIEvent(_typeArg, _bubblesArg, _cancelableArg, _viewArg, _detailArg) {
          throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
        }
        /** Prevent default behavior of PixiJS and the user agent. */
        preventDefault() {
          if (this.nativeEvent instanceof Event && this.nativeEvent.cancelable) {
            this.nativeEvent.preventDefault();
          }
          this.defaultPrevented = true;
        }
        /**
         * Stop this event from propagating to any addition listeners, including on the
         * {@link FederatedEventTarget.currentTarget currentTarget} and also the following
         * event targets on the propagation path.
         */
        stopImmediatePropagation() {
          this.propagationImmediatelyStopped = true;
        }
        /**
         * Stop this event from propagating to the next {@link FederatedEventTarget}. The rest of the listeners
         * on the {@link FederatedEventTarget.currentTarget currentTarget} will still be notified.
         */
        stopPropagation() {
          this.propagationStopped = true;
        }
      };
    }
  });

  // node_modules/ismobilejs/esm/isMobile.js
  function createMatch(userAgent) {
    return function(regex) {
      return regex.test(userAgent);
    };
  }
  function isMobile(param) {
    var nav = {
      userAgent: "",
      platform: "",
      maxTouchPoints: 0
    };
    if (!param && typeof navigator !== "undefined") {
      nav = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints || 0
      };
    } else if (typeof param === "string") {
      nav.userAgent = param;
    } else if (param && param.userAgent) {
      nav = {
        userAgent: param.userAgent,
        platform: param.platform,
        maxTouchPoints: param.maxTouchPoints || 0
      };
    }
    var userAgent = nav.userAgent;
    var tmp = userAgent.split("[FBAN");
    if (typeof tmp[1] !== "undefined") {
      userAgent = tmp[0];
    }
    tmp = userAgent.split("Twitter");
    if (typeof tmp[1] !== "undefined") {
      userAgent = tmp[0];
    }
    var match = createMatch(userAgent);
    var result = {
      apple: {
        phone: match(appleIphone) && !match(windowsPhone),
        ipod: match(appleIpod),
        tablet: !match(appleIphone) && (match(appleTablet) || isAppleTabletOnIos13(nav)) && !match(windowsPhone),
        universal: match(appleUniversal),
        device: (match(appleIphone) || match(appleIpod) || match(appleTablet) || match(appleUniversal) || isAppleTabletOnIos13(nav)) && !match(windowsPhone)
      },
      amazon: {
        phone: match(amazonPhone),
        tablet: !match(amazonPhone) && match(amazonTablet),
        device: match(amazonPhone) || match(amazonTablet)
      },
      android: {
        phone: !match(windowsPhone) && match(amazonPhone) || !match(windowsPhone) && match(androidPhone),
        tablet: !match(windowsPhone) && !match(amazonPhone) && !match(androidPhone) && (match(amazonTablet) || match(androidTablet)),
        device: !match(windowsPhone) && (match(amazonPhone) || match(amazonTablet) || match(androidPhone) || match(androidTablet)) || match(/\bokhttp\b/i)
      },
      windows: {
        phone: match(windowsPhone),
        tablet: match(windowsTablet),
        device: match(windowsPhone) || match(windowsTablet)
      },
      other: {
        blackberry: match(otherBlackBerry),
        blackberry10: match(otherBlackBerry10),
        opera: match(otherOpera),
        firefox: match(otherFirefox),
        chrome: match(otherChrome),
        device: match(otherBlackBerry) || match(otherBlackBerry10) || match(otherOpera) || match(otherFirefox) || match(otherChrome)
      },
      any: false,
      phone: false,
      tablet: false
    };
    result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
    result.phone = result.apple.phone || result.android.phone || result.windows.phone;
    result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
    return result;
  }
  var appleIphone, appleIpod, appleTablet, appleUniversal, androidPhone, androidTablet, amazonPhone, amazonTablet, windowsPhone, windowsTablet, otherBlackBerry, otherBlackBerry10, otherOpera, otherChrome, otherFirefox, isAppleTabletOnIos13;
  var init_isMobile = __esm({
    "node_modules/ismobilejs/esm/isMobile.js"() {
      appleIphone = /iPhone/i;
      appleIpod = /iPod/i;
      appleTablet = /iPad/i;
      appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
      androidPhone = /\bAndroid(?:.+)Mobile\b/i;
      androidTablet = /Android/i;
      amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
      amazonTablet = /Silk/i;
      windowsPhone = /Windows Phone/i;
      windowsTablet = /\bWindows(?:.+)ARM\b/i;
      otherBlackBerry = /BlackBerry/i;
      otherBlackBerry10 = /BB10/i;
      otherOpera = /Opera Mini/i;
      otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
      otherFirefox = /Mobile(?:.+)Firefox\b/i;
      isAppleTabletOnIos13 = function(navigator2) {
        return typeof navigator2 !== "undefined" && navigator2.platform === "MacIntel" && typeof navigator2.maxTouchPoints === "number" && navigator2.maxTouchPoints > 1 && typeof MSStream === "undefined";
      };
    }
  });

  // node_modules/ismobilejs/esm/index.js
  var init_esm = __esm({
    "node_modules/ismobilejs/esm/index.js"() {
      init_isMobile();
      init_isMobile();
    }
  });

  // node_modules/pixi.js/lib/utils/browser/isMobile.mjs
  var isMobileCall, isMobile2;
  var init_isMobile2 = __esm({
    "node_modules/pixi.js/lib/utils/browser/isMobile.mjs"() {
      init_esm();
      isMobileCall = isMobile.default ?? isMobile;
      isMobile2 = isMobileCall(globalThis.navigator);
    }
  });

  // node_modules/pixi.js/lib/accessibility/AccessibilitySystem.mjs
  var KEY_CODE_TAB, DIV_TOUCH_SIZE, DIV_TOUCH_POS_X, DIV_TOUCH_POS_Y, DIV_TOUCH_ZINDEX, DIV_HOOK_SIZE, DIV_HOOK_POS_X, DIV_HOOK_POS_Y, DIV_HOOK_ZINDEX, AccessibilitySystem;
  var init_AccessibilitySystem = __esm({
    "node_modules/pixi.js/lib/accessibility/AccessibilitySystem.mjs"() {
      init_FederatedEvent();
      init_Extensions();
      init_isMobile2();
      init_removeItems();
      KEY_CODE_TAB = 9;
      DIV_TOUCH_SIZE = 100;
      DIV_TOUCH_POS_X = 0;
      DIV_TOUCH_POS_Y = 0;
      DIV_TOUCH_ZINDEX = 2;
      DIV_HOOK_SIZE = 1;
      DIV_HOOK_POS_X = -1e3;
      DIV_HOOK_POS_Y = -1e3;
      DIV_HOOK_ZINDEX = 2;
      AccessibilitySystem = class {
        // 2fps
        // eslint-disable-next-line jsdoc/require-param
        /**
         * @param {WebGLRenderer|WebGPURenderer} renderer - A reference to the current renderer
         */
        constructor(renderer, _mobileInfo = isMobile2) {
          this._mobileInfo = _mobileInfo;
          this.debug = false;
          this._isActive = false;
          this._isMobileAccessibility = false;
          this._pool = [];
          this._renderId = 0;
          this._children = [];
          this._androidUpdateCount = 0;
          this._androidUpdateFrequency = 500;
          this._hookDiv = null;
          if (_mobileInfo.tablet || _mobileInfo.phone) {
            this._createTouchHook();
          }
          const div = document.createElement("div");
          div.style.width = `${DIV_TOUCH_SIZE}px`;
          div.style.height = `${DIV_TOUCH_SIZE}px`;
          div.style.position = "absolute";
          div.style.top = `${DIV_TOUCH_POS_X}px`;
          div.style.left = `${DIV_TOUCH_POS_Y}px`;
          div.style.zIndex = DIV_TOUCH_ZINDEX.toString();
          this._div = div;
          this._renderer = renderer;
          this._onKeyDown = this._onKeyDown.bind(this);
          this._onMouseMove = this._onMouseMove.bind(this);
          globalThis.addEventListener("keydown", this._onKeyDown, false);
        }
        /**
         * Value of `true` if accessibility is currently active and accessibility layers are showing.
         * @member {boolean}
         * @readonly
         */
        get isActive() {
          return this._isActive;
        }
        /**
         * Value of `true` if accessibility is enabled for touch devices.
         * @member {boolean}
         * @readonly
         */
        get isMobileAccessibility() {
          return this._isMobileAccessibility;
        }
        get hookDiv() {
          return this._hookDiv;
        }
        /**
         * Creates the touch hooks.
         * @private
         */
        _createTouchHook() {
          const hookDiv = document.createElement("button");
          hookDiv.style.width = `${DIV_HOOK_SIZE}px`;
          hookDiv.style.height = `${DIV_HOOK_SIZE}px`;
          hookDiv.style.position = "absolute";
          hookDiv.style.top = `${DIV_HOOK_POS_X}px`;
          hookDiv.style.left = `${DIV_HOOK_POS_Y}px`;
          hookDiv.style.zIndex = DIV_HOOK_ZINDEX.toString();
          hookDiv.style.backgroundColor = "#FF0000";
          hookDiv.title = "select to enable accessibility for this content";
          hookDiv.addEventListener("focus", () => {
            this._isMobileAccessibility = true;
            this._activate();
            this._destroyTouchHook();
          });
          document.body.appendChild(hookDiv);
          this._hookDiv = hookDiv;
        }
        /**
         * Destroys the touch hooks.
         * @private
         */
        _destroyTouchHook() {
          if (!this._hookDiv) {
            return;
          }
          document.body.removeChild(this._hookDiv);
          this._hookDiv = null;
        }
        /**
         * Activating will cause the Accessibility layer to be shown.
         * This is called when a user presses the tab key.
         * @private
         */
        _activate() {
          if (this._isActive) {
            return;
          }
          this._isActive = true;
          globalThis.document.addEventListener("mousemove", this._onMouseMove, true);
          globalThis.removeEventListener("keydown", this._onKeyDown, false);
          this._renderer.runners.postrender.add(this);
          this._renderer.view.canvas.parentNode?.appendChild(this._div);
        }
        /**
         * Deactivating will cause the Accessibility layer to be hidden.
         * This is called when a user moves the mouse.
         * @private
         */
        _deactivate() {
          if (!this._isActive || this._isMobileAccessibility) {
            return;
          }
          this._isActive = false;
          globalThis.document.removeEventListener("mousemove", this._onMouseMove, true);
          globalThis.addEventListener("keydown", this._onKeyDown, false);
          this._renderer.runners.postrender.remove(this);
          this._div.parentNode?.removeChild(this._div);
        }
        /**
         * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
         * @private
         * @param {Container} container - The Container to check.
         */
        _updateAccessibleObjects(container) {
          if (!container.visible || !container.accessibleChildren) {
            return;
          }
          if (container.accessible && container.isInteractive()) {
            if (!container._accessibleActive) {
              this._addChild(container);
            }
            container._renderId = this._renderId;
          }
          const children = container.children;
          if (children) {
            for (let i2 = 0; i2 < children.length; i2++) {
              this._updateAccessibleObjects(children[i2]);
            }
          }
        }
        /**
         * Runner init called, view is available at this point.
         * @ignore
         */
        init(options) {
          this.debug = options?.debug ?? this.debug;
          this._renderer.runners.postrender.remove(this);
        }
        /**
         * Runner postrender was called, ensure that all divs are mapped correctly to their Containers.
         * Only fires while active.
         * @ignore
         */
        postrender() {
          const now = performance.now();
          if (this._mobileInfo.android.device && now < this._androidUpdateCount) {
            return;
          }
          this._androidUpdateCount = now + this._androidUpdateFrequency;
          if (!this._renderer.renderingToScreen || !this._renderer.view.canvas) {
            return;
          }
          if (this._renderer.lastObjectRendered) {
            this._updateAccessibleObjects(this._renderer.lastObjectRendered);
          }
          const { x: x2, y: y2, width, height } = this._renderer.view.canvas.getBoundingClientRect();
          const { width: viewWidth, height: viewHeight, resolution } = this._renderer;
          const sx = width / viewWidth * resolution;
          const sy = height / viewHeight * resolution;
          let div = this._div;
          div.style.left = `${x2}px`;
          div.style.top = `${y2}px`;
          div.style.width = `${viewWidth}px`;
          div.style.height = `${viewHeight}px`;
          for (let i2 = 0; i2 < this._children.length; i2++) {
            const child = this._children[i2];
            if (child._renderId !== this._renderId) {
              child._accessibleActive = false;
              removeItems(this._children, i2, 1);
              this._div.removeChild(child._accessibleDiv);
              this._pool.push(child._accessibleDiv);
              child._accessibleDiv = null;
              i2--;
            } else {
              div = child._accessibleDiv;
              let hitArea = child.hitArea;
              const wt = child.worldTransform;
              if (child.hitArea) {
                div.style.left = `${(wt.tx + hitArea.x * wt.a) * sx}px`;
                div.style.top = `${(wt.ty + hitArea.y * wt.d) * sy}px`;
                div.style.width = `${hitArea.width * wt.a * sx}px`;
                div.style.height = `${hitArea.height * wt.d * sy}px`;
              } else {
                hitArea = child.getBounds().rectangle;
                this._capHitArea(hitArea);
                div.style.left = `${hitArea.x * sx}px`;
                div.style.top = `${hitArea.y * sy}px`;
                div.style.width = `${hitArea.width * sx}px`;
                div.style.height = `${hitArea.height * sy}px`;
                if (div.title !== child.accessibleTitle && child.accessibleTitle !== null) {
                  div.title = child.accessibleTitle || "";
                }
                if (div.getAttribute("aria-label") !== child.accessibleHint && child.accessibleHint !== null) {
                  div.setAttribute("aria-label", child.accessibleHint || "");
                }
              }
              if (child.accessibleTitle !== div.title || child.tabIndex !== div.tabIndex) {
                div.title = child.accessibleTitle || "";
                div.tabIndex = child.tabIndex;
                if (this.debug) {
                  this._updateDebugHTML(div);
                }
              }
            }
          }
          this._renderId++;
        }
        /**
         * private function that will visually add the information to the
         * accessibility div
         * @param {HTMLElement} div -
         */
        _updateDebugHTML(div) {
          div.innerHTML = `type: ${div.type}</br> title : ${div.title}</br> tabIndex: ${div.tabIndex}`;
        }
        /**
         * Adjust the hit area based on the bounds of a display object
         * @param {Rectangle} hitArea - Bounds of the child
         */
        _capHitArea(hitArea) {
          if (hitArea.x < 0) {
            hitArea.width += hitArea.x;
            hitArea.x = 0;
          }
          if (hitArea.y < 0) {
            hitArea.height += hitArea.y;
            hitArea.y = 0;
          }
          const { width: viewWidth, height: viewHeight } = this._renderer;
          if (hitArea.x + hitArea.width > viewWidth) {
            hitArea.width = viewWidth - hitArea.x;
          }
          if (hitArea.y + hitArea.height > viewHeight) {
            hitArea.height = viewHeight - hitArea.y;
          }
        }
        /**
         * Adds a Container to the accessibility manager
         * @private
         * @param {Container} container - The child to make accessible.
         */
        _addChild(container) {
          let div = this._pool.pop();
          if (!div) {
            div = document.createElement("button");
            div.style.width = `${DIV_TOUCH_SIZE}px`;
            div.style.height = `${DIV_TOUCH_SIZE}px`;
            div.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent";
            div.style.position = "absolute";
            div.style.zIndex = DIV_TOUCH_ZINDEX.toString();
            div.style.borderStyle = "none";
            if (navigator.userAgent.toLowerCase().includes("chrome")) {
              div.setAttribute("aria-live", "off");
            } else {
              div.setAttribute("aria-live", "polite");
            }
            if (navigator.userAgent.match(/rv:.*Gecko\//)) {
              div.setAttribute("aria-relevant", "additions");
            } else {
              div.setAttribute("aria-relevant", "text");
            }
            div.addEventListener("click", this._onClick.bind(this));
            div.addEventListener("focus", this._onFocus.bind(this));
            div.addEventListener("focusout", this._onFocusOut.bind(this));
          }
          div.style.pointerEvents = container.accessiblePointerEvents;
          div.type = container.accessibleType;
          if (container.accessibleTitle && container.accessibleTitle !== null) {
            div.title = container.accessibleTitle;
          } else if (!container.accessibleHint || container.accessibleHint === null) {
            div.title = `container ${container.tabIndex}`;
          }
          if (container.accessibleHint && container.accessibleHint !== null) {
            div.setAttribute("aria-label", container.accessibleHint);
          }
          if (this.debug) {
            this._updateDebugHTML(div);
          }
          container._accessibleActive = true;
          container._accessibleDiv = div;
          div.container = container;
          this._children.push(container);
          this._div.appendChild(container._accessibleDiv);
          container._accessibleDiv.tabIndex = container.tabIndex;
        }
        /**
         * Dispatch events with the EventSystem.
         * @param e
         * @param type
         * @private
         */
        _dispatchEvent(e2, type) {
          const { container: target } = e2.target;
          const boundary = this._renderer.events.rootBoundary;
          const event = Object.assign(new FederatedEvent(boundary), { target });
          boundary.rootTarget = this._renderer.lastObjectRendered;
          type.forEach((type2) => boundary.dispatchEvent(event, type2));
        }
        /**
         * Maps the div button press to pixi's EventSystem (click)
         * @private
         * @param {MouseEvent} e - The click event.
         */
        _onClick(e2) {
          this._dispatchEvent(e2, ["click", "pointertap", "tap"]);
        }
        /**
         * Maps the div focus events to pixi's EventSystem (mouseover)
         * @private
         * @param {FocusEvent} e - The focus event.
         */
        _onFocus(e2) {
          if (!e2.target.getAttribute("aria-live")) {
            e2.target.setAttribute("aria-live", "assertive");
          }
          this._dispatchEvent(e2, ["mouseover"]);
        }
        /**
         * Maps the div focus events to pixi's EventSystem (mouseout)
         * @private
         * @param {FocusEvent} e - The focusout event.
         */
        _onFocusOut(e2) {
          if (!e2.target.getAttribute("aria-live")) {
            e2.target.setAttribute("aria-live", "polite");
          }
          this._dispatchEvent(e2, ["mouseout"]);
        }
        /**
         * Is called when a key is pressed
         * @private
         * @param {KeyboardEvent} e - The keydown event.
         */
        _onKeyDown(e2) {
          if (e2.keyCode !== KEY_CODE_TAB) {
            return;
          }
          this._activate();
        }
        /**
         * Is called when the mouse moves across the renderer element
         * @private
         * @param {MouseEvent} e - The mouse event.
         */
        _onMouseMove(e2) {
          if (e2.movementX === 0 && e2.movementY === 0) {
            return;
          }
          this._deactivate();
        }
        /** Destroys the accessibility manager */
        destroy() {
          this._destroyTouchHook();
          this._div = null;
          globalThis.document.removeEventListener("mousemove", this._onMouseMove, true);
          globalThis.removeEventListener("keydown", this._onKeyDown);
          this._pool = null;
          this._children = null;
          this._renderer = null;
        }
      };
      AccessibilitySystem.extension = {
        type: [
          ExtensionType.WebGLSystem,
          ExtensionType.WebGPUSystem
        ],
        name: "accessibility"
      };
    }
  });

  // node_modules/pixi.js/lib/accessibility/accessibilityTarget.mjs
  var accessibilityTarget;
  var init_accessibilityTarget = __esm({
    "node_modules/pixi.js/lib/accessibility/accessibilityTarget.mjs"() {
      "use strict";
      accessibilityTarget = {
        /**
         * Flag for if the object is accessible. If true AccessibilityManager will overlay a
         * shadow div with attributes set
         * @member {boolean}
         * @memberof scene.Container#
         */
        accessible: false,
        /**
         * Sets the title attribute of the shadow div
         * If accessibleTitle AND accessibleHint has not been this will default to 'container [tabIndex]'
         * @member {string}
         * @memberof scene.Container#
         */
        accessibleTitle: null,
        /**
         * Sets the aria-label attribute of the shadow div
         * @member {string}
         * @memberof scene.Container#
         */
        accessibleHint: null,
        /**
         * @member {number}
         * @memberof scene.Container#
         * @todo Needs docs.
         */
        tabIndex: 0,
        /**
         * @member {boolean}
         * @memberof scene.Container#
         * @private
         */
        _accessibleActive: false,
        /**
         * @memberof scene.Container#
         * @private
         */
        _accessibleDiv: null,
        /**
         * Specify the type of div the accessible layer is. Screen readers treat the element differently
         * depending on this type. Defaults to button.
         * @member {string}
         * @memberof scene.Container#
         * @default 'button'
         */
        accessibleType: "button",
        /**
         * Specify the pointer-events the accessible div will use
         * Defaults to auto.
         * @type {PointerEvents}
         * @memberof scene.Container#
         * @default 'auto'
         */
        accessiblePointerEvents: "auto",
        /**
         * Setting to false will prevent any children inside this container to
         * be accessible. Defaults to true.
         * @member {boolean}
         * @memberof scene.Container#
         * @default true
         */
        accessibleChildren: true,
        /**
         * @member {number}
         * @memberof scene.Container#
         * @private
         */
        _renderId: -1
      };
    }
  });

  // node_modules/pixi.js/lib/accessibility/init.mjs
  var init_init = __esm({
    "node_modules/pixi.js/lib/accessibility/init.mjs"() {
      init_Extensions();
      init_Container();
      init_AccessibilitySystem();
      init_accessibilityTarget();
      extensions.add(AccessibilitySystem);
      Container.mixin(accessibilityTarget);
    }
  });

  // node_modules/pixi.js/lib/app/ResizePlugin.mjs
  var ResizePlugin;
  var init_ResizePlugin = __esm({
    "node_modules/pixi.js/lib/app/ResizePlugin.mjs"() {
      init_Extensions();
      ResizePlugin = class {
        /**
         * Initialize the plugin with scope of application instance
         * @static
         * @private
         * @param {object} [options] - See application options
         */
        static init(options) {
          Object.defineProperty(
            this,
            "resizeTo",
            /**
             * The HTML element or window to automatically resize the
             * renderer's view element to match width and height.
             * @member {Window|HTMLElement}
             * @name resizeTo
             * @memberof app.Application#
             */
            {
              set(dom) {
                globalThis.removeEventListener("resize", this.queueResize);
                this._resizeTo = dom;
                if (dom) {
                  globalThis.addEventListener("resize", this.queueResize);
                  this.resize();
                }
              },
              get() {
                return this._resizeTo;
              }
            }
          );
          this.queueResize = () => {
            if (!this._resizeTo) {
              return;
            }
            this._cancelResize();
            this._resizeId = requestAnimationFrame(() => this.resize());
          };
          this._cancelResize = () => {
            if (this._resizeId) {
              cancelAnimationFrame(this._resizeId);
              this._resizeId = null;
            }
          };
          this.resize = () => {
            if (!this._resizeTo) {
              return;
            }
            this._cancelResize();
            let width;
            let height;
            if (this._resizeTo === globalThis.window) {
              width = globalThis.innerWidth;
              height = globalThis.innerHeight;
            } else {
              const { clientWidth, clientHeight } = this._resizeTo;
              width = clientWidth;
              height = clientHeight;
            }
            this.renderer.resize(width, height);
            this.render();
          };
          this._resizeId = null;
          this._resizeTo = null;
          this.resizeTo = options.resizeTo || null;
        }
        /**
         * Clean up the ticker, scoped to application
         * @static
         * @private
         */
        static destroy() {
          globalThis.removeEventListener("resize", this.queueResize);
          this._cancelResize();
          this._cancelResize = null;
          this.queueResize = null;
          this.resizeTo = null;
          this.resize = null;
        }
      };
      ResizePlugin.extension = ExtensionType.Application;
    }
  });

  // node_modules/pixi.js/lib/ticker/const.mjs
  var UPDATE_PRIORITY;
  var init_const2 = __esm({
    "node_modules/pixi.js/lib/ticker/const.mjs"() {
      "use strict";
      UPDATE_PRIORITY = /* @__PURE__ */ ((UPDATE_PRIORITY2) => {
        UPDATE_PRIORITY2[UPDATE_PRIORITY2["INTERACTION"] = 50] = "INTERACTION";
        UPDATE_PRIORITY2[UPDATE_PRIORITY2["HIGH"] = 25] = "HIGH";
        UPDATE_PRIORITY2[UPDATE_PRIORITY2["NORMAL"] = 0] = "NORMAL";
        UPDATE_PRIORITY2[UPDATE_PRIORITY2["LOW"] = -25] = "LOW";
        UPDATE_PRIORITY2[UPDATE_PRIORITY2["UTILITY"] = -50] = "UTILITY";
        return UPDATE_PRIORITY2;
      })(UPDATE_PRIORITY || {});
    }
  });

  // node_modules/pixi.js/lib/ticker/TickerListener.mjs
  var TickerListener;
  var init_TickerListener = __esm({
    "node_modules/pixi.js/lib/ticker/TickerListener.mjs"() {
      "use strict";
      TickerListener = class {
        /**
         * Constructor
         * @private
         * @param fn - The listener function to be added for one update
         * @param context - The listener context
         * @param priority - The priority for emitting
         * @param once - If the handler should fire once
         */
        constructor(fn, context2 = null, priority = 0, once = false) {
          this.next = null;
          this.previous = null;
          this._destroyed = false;
          this._fn = fn;
          this._context = context2;
          this.priority = priority;
          this._once = once;
        }
        /**
         * Simple compare function to figure out if a function and context match.
         * @param fn - The listener function to be added for one update
         * @param context - The listener context
         * @returns `true` if the listener match the arguments
         */
        match(fn, context2 = null) {
          return this._fn === fn && this._context === context2;
        }
        /**
         * Emit by calling the current function.
         * @param ticker - The ticker emitting.
         * @returns Next ticker
         */
        emit(ticker) {
          if (this._fn) {
            if (this._context) {
              this._fn.call(this._context, ticker);
            } else {
              this._fn(ticker);
            }
          }
          const redirect = this.next;
          if (this._once) {
            this.destroy(true);
          }
          if (this._destroyed) {
            this.next = null;
          }
          return redirect;
        }
        /**
         * Connect to the list.
         * @param previous - Input node, previous listener
         */
        connect(previous) {
          this.previous = previous;
          if (previous.next) {
            previous.next.previous = this;
          }
          this.next = previous.next;
          previous.next = this;
        }
        /**
         * Destroy and don't use after this.
         * @param hard - `true` to remove the `next` reference, this
         *        is considered a hard destroy. Soft destroy maintains the next reference.
         * @returns The listener to redirect while emitting or removing.
         */
        destroy(hard = false) {
          this._destroyed = true;
          this._fn = null;
          this._context = null;
          if (this.previous) {
            this.previous.next = this.next;
          }
          if (this.next) {
            this.next.previous = this.previous;
          }
          const redirect = this.next;
          this.next = hard ? null : redirect;
          this.previous = null;
          return redirect;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/ticker/Ticker.mjs
  var _Ticker, Ticker;
  var init_Ticker = __esm({
    "node_modules/pixi.js/lib/ticker/Ticker.mjs"() {
      init_const2();
      init_TickerListener();
      _Ticker = class _Ticker2 {
        constructor() {
          this.autoStart = false;
          this.deltaTime = 1;
          this.lastTime = -1;
          this.speed = 1;
          this.started = false;
          this._requestId = null;
          this._maxElapsedMS = 100;
          this._minElapsedMS = 0;
          this._protected = false;
          this._lastFrame = -1;
          this._head = new TickerListener(null, null, Infinity);
          this.deltaMS = 1 / _Ticker2.targetFPMS;
          this.elapsedMS = 1 / _Ticker2.targetFPMS;
          this._tick = (time) => {
            this._requestId = null;
            if (this.started) {
              this.update(time);
              if (this.started && this._requestId === null && this._head.next) {
                this._requestId = requestAnimationFrame(this._tick);
              }
            }
          };
        }
        /**
         * Conditionally requests a new animation frame.
         * If a frame has not already been requested, and if the internal
         * emitter has listeners, a new frame is requested.
         * @private
         */
        _requestIfNeeded() {
          if (this._requestId === null && this._head.next) {
            this.lastTime = performance.now();
            this._lastFrame = this.lastTime;
            this._requestId = requestAnimationFrame(this._tick);
          }
        }
        /**
         * Conditionally cancels a pending animation frame.
         * @private
         */
        _cancelIfNeeded() {
          if (this._requestId !== null) {
            cancelAnimationFrame(this._requestId);
            this._requestId = null;
          }
        }
        /**
         * Conditionally requests a new animation frame.
         * If the ticker has been started it checks if a frame has not already
         * been requested, and if the internal emitter has listeners. If these
         * conditions are met, a new frame is requested. If the ticker has not
         * been started, but autoStart is `true`, then the ticker starts now,
         * and continues with the previous conditions to request a new frame.
         * @private
         */
        _startIfPossible() {
          if (this.started) {
            this._requestIfNeeded();
          } else if (this.autoStart) {
            this.start();
          }
        }
        /**
         * Register a handler for tick events. Calls continuously unless
         * it is removed or the ticker is stopped.
         * @param fn - The listener function to be added for updates
         * @param context - The listener context
         * @param {number} [priority=UPDATE_PRIORITY.NORMAL] - The priority for emitting
         * @returns This instance of a ticker
         */
        add(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
          return this._addListener(new TickerListener(fn, context2, priority));
        }
        /**
         * Add a handler for the tick event which is only execute once.
         * @param fn - The listener function to be added for one update
         * @param context - The listener context
         * @param {number} [priority=UPDATE_PRIORITY.NORMAL] - The priority for emitting
         * @returns This instance of a ticker
         */
        addOnce(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
          return this._addListener(new TickerListener(fn, context2, priority, true));
        }
        /**
         * Internally adds the event handler so that it can be sorted by priority.
         * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
         * before the rendering.
         * @private
         * @param listener - Current listener being added.
         * @returns This instance of a ticker
         */
        _addListener(listener) {
          let current = this._head.next;
          let previous = this._head;
          if (!current) {
            listener.connect(previous);
          } else {
            while (current) {
              if (listener.priority > current.priority) {
                listener.connect(previous);
                break;
              }
              previous = current;
              current = current.next;
            }
            if (!listener.previous) {
              listener.connect(previous);
            }
          }
          this._startIfPossible();
          return this;
        }
        /**
         * Removes any handlers matching the function and context parameters.
         * If no handlers are left after removing, then it cancels the animation frame.
         * @param fn - The listener function to be removed
         * @param context - The listener context to be removed
         * @returns This instance of a ticker
         */
        remove(fn, context2) {
          let listener = this._head.next;
          while (listener) {
            if (listener.match(fn, context2)) {
              listener = listener.destroy();
            } else {
              listener = listener.next;
            }
          }
          if (!this._head.next) {
            this._cancelIfNeeded();
          }
          return this;
        }
        /**
         * The number of listeners on this ticker, calculated by walking through linked list
         * @readonly
         * @member {number}
         */
        get count() {
          if (!this._head) {
            return 0;
          }
          let count2 = 0;
          let current = this._head;
          while (current = current.next) {
            count2++;
          }
          return count2;
        }
        /** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */
        start() {
          if (!this.started) {
            this.started = true;
            this._requestIfNeeded();
          }
        }
        /** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */
        stop() {
          if (this.started) {
            this.started = false;
            this._cancelIfNeeded();
          }
        }
        /** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */
        destroy() {
          if (!this._protected) {
            this.stop();
            let listener = this._head.next;
            while (listener) {
              listener = listener.destroy(true);
            }
            this._head.destroy();
            this._head = null;
          }
        }
        /**
         * Triggers an update. An update entails setting the
         * current {@link ticker.Ticker#elapsedMS|elapsedMS},
         * the current {@link ticker.Ticker#deltaTime|deltaTime},
         * invoking all listeners with current deltaTime,
         * and then finally setting {@link ticker.Ticker#lastTime|lastTime}
         * with the value of currentTime that was provided.
         * This method will be called automatically by animation
         * frame callbacks if the ticker instance has been started
         * and listeners are added.
         * @param {number} [currentTime=performance.now()] - the current time of execution
         */
        update(currentTime = performance.now()) {
          let elapsedMS;
          if (currentTime > this.lastTime) {
            elapsedMS = this.elapsedMS = currentTime - this.lastTime;
            if (elapsedMS > this._maxElapsedMS) {
              elapsedMS = this._maxElapsedMS;
            }
            elapsedMS *= this.speed;
            if (this._minElapsedMS) {
              const delta = currentTime - this._lastFrame | 0;
              if (delta < this._minElapsedMS) {
                return;
              }
              this._lastFrame = currentTime - delta % this._minElapsedMS;
            }
            this.deltaMS = elapsedMS;
            this.deltaTime = this.deltaMS * _Ticker2.targetFPMS;
            const head = this._head;
            let listener = head.next;
            while (listener) {
              listener = listener.emit(this);
            }
            if (!head.next) {
              this._cancelIfNeeded();
            }
          } else {
            this.deltaTime = this.deltaMS = this.elapsedMS = 0;
          }
          this.lastTime = currentTime;
        }
        /**
         * The frames per second at which this ticker is running.
         * The default is approximately 60 in most modern browsers.
         * **Note:** This does not factor in the value of
         * {@link ticker.Ticker#speed|speed}, which is specific
         * to scaling {@link ticker.Ticker#deltaTime|deltaTime}.
         * @member {number}
         * @readonly
         */
        get FPS() {
          return 1e3 / this.elapsedMS;
        }
        /**
         * Manages the maximum amount of milliseconds allowed to
         * elapse between invoking {@link ticker.Ticker#update|update}.
         * This value is used to cap {@link ticker.Ticker#deltaTime|deltaTime},
         * but does not effect the measured value of {@link ticker.Ticker#FPS|FPS}.
         * When setting this property it is clamped to a value between
         * `0` and `Ticker.targetFPMS * 1000`.
         * @member {number}
         * @default 10
         */
        get minFPS() {
          return 1e3 / this._maxElapsedMS;
        }
        set minFPS(fps) {
          const minFPS = Math.min(this.maxFPS, fps);
          const minFPMS = Math.min(Math.max(0, minFPS) / 1e3, _Ticker2.targetFPMS);
          this._maxElapsedMS = 1 / minFPMS;
        }
        /**
         * Manages the minimum amount of milliseconds required to
         * elapse between invoking {@link ticker.Ticker#update|update}.
         * This will effect the measured value of {@link ticker.Ticker#FPS|FPS}.
         * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
         * Otherwise it will be at least `minFPS`
         * @member {number}
         * @default 0
         */
        get maxFPS() {
          if (this._minElapsedMS) {
            return Math.round(1e3 / this._minElapsedMS);
          }
          return 0;
        }
        set maxFPS(fps) {
          if (fps === 0) {
            this._minElapsedMS = 0;
          } else {
            const maxFPS = Math.max(this.minFPS, fps);
            this._minElapsedMS = 1 / (maxFPS / 1e3);
          }
        }
        /**
         * The shared ticker instance used by {@link AnimatedSprite} and by
         * {@link VideoResource} to update animation frames / video textures.
         *
         * It may also be used by {@link Application} if created with the `sharedTicker` option property set to true.
         *
         * The property {@link ticker.Ticker#autoStart|autoStart} is set to `true` for this instance.
         * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
         * @example
         * import { Ticker } from 'pixi.js';
         *
         * const ticker = Ticker.shared;
         * // Set this to prevent starting this ticker when listeners are added.
         * // By default this is true only for the Ticker.shared instance.
         * ticker.autoStart = false;
         *
         * // FYI, call this to ensure the ticker is stopped. It should be stopped
         * // if you have not attempted to render anything yet.
         * ticker.stop();
         *
         * // Call this when you are ready for a running shared ticker.
         * ticker.start();
         * @example
         * import { autoDetectRenderer, Container } from 'pixi.js';
         *
         * // You may use the shared ticker to render...
         * const renderer = autoDetectRenderer();
         * const stage = new Container();
         * document.body.appendChild(renderer.view);
         * ticker.add((time) => renderer.render(stage));
         *
         * // Or you can just update it manually.
         * ticker.autoStart = false;
         * ticker.stop();
         * const animate = (time) => {
         *     ticker.update(time);
         *     renderer.render(stage);
         *     requestAnimationFrame(animate);
         * };
         * animate(performance.now());
         * @member {ticker.Ticker}
         * @readonly
         * @static
         */
        static get shared() {
          if (!_Ticker2._shared) {
            const shared = _Ticker2._shared = new _Ticker2();
            shared.autoStart = true;
            shared._protected = true;
          }
          return _Ticker2._shared;
        }
        /**
         * The system ticker instance used by {@link BasePrepare} for core timing
         * functionality that shouldn't usually need to be paused, unlike the `shared`
         * ticker which drives visual animations and rendering which may want to be paused.
         *
         * The property {@link ticker.Ticker#autoStart|autoStart} is set to `true` for this instance.
         * @member {ticker.Ticker}
         * @readonly
         * @static
         */
        static get system() {
          if (!_Ticker2._system) {
            const system = _Ticker2._system = new _Ticker2();
            system.autoStart = true;
            system._protected = true;
          }
          return _Ticker2._system;
        }
      };
      _Ticker.targetFPMS = 0.06;
      Ticker = _Ticker;
    }
  });

  // node_modules/pixi.js/lib/app/TickerPlugin.mjs
  var TickerPlugin;
  var init_TickerPlugin = __esm({
    "node_modules/pixi.js/lib/app/TickerPlugin.mjs"() {
      init_Extensions();
      init_const2();
      init_Ticker();
      TickerPlugin = class {
        /**
         * Initialize the plugin with scope of application instance
         * @static
         * @private
         * @param {object} [options] - See application options
         */
        static init(options) {
          options = Object.assign({
            autoStart: true,
            sharedTicker: false
          }, options);
          Object.defineProperty(
            this,
            "ticker",
            {
              set(ticker) {
                if (this._ticker) {
                  this._ticker.remove(this.render, this);
                }
                this._ticker = ticker;
                if (ticker) {
                  ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
                }
              },
              get() {
                return this._ticker;
              }
            }
          );
          this.stop = () => {
            this._ticker.stop();
          };
          this.start = () => {
            this._ticker.start();
          };
          this._ticker = null;
          this.ticker = options.sharedTicker ? Ticker.shared : new Ticker();
          if (options.autoStart) {
            this.start();
          }
        }
        /**
         * Clean up the ticker, scoped to application.
         * @static
         * @private
         */
        static destroy() {
          if (this._ticker) {
            const oldTicker = this._ticker;
            this.ticker = null;
            oldTicker.destroy();
          }
        }
      };
      TickerPlugin.extension = ExtensionType.Application;
    }
  });

  // node_modules/pixi.js/lib/app/init.mjs
  var init_init2 = __esm({
    "node_modules/pixi.js/lib/app/init.mjs"() {
      init_Extensions();
      init_ResizePlugin();
      init_TickerPlugin();
      extensions.add(ResizePlugin);
      extensions.add(TickerPlugin);
    }
  });

  // node_modules/pixi.js/lib/events/EventTicker.mjs
  var EventsTickerClass, EventsTicker;
  var init_EventTicker = __esm({
    "node_modules/pixi.js/lib/events/EventTicker.mjs"() {
      init_const2();
      init_Ticker();
      EventsTickerClass = class {
        constructor() {
          this.interactionFrequency = 10;
          this._deltaTime = 0;
          this._didMove = false;
          this._tickerAdded = false;
          this._pauseUpdate = true;
        }
        /**
         * Initializes the event ticker.
         * @param events - The event system.
         */
        init(events) {
          this.removeTickerListener();
          this.events = events;
          this.interactionFrequency = 10;
          this._deltaTime = 0;
          this._didMove = false;
          this._tickerAdded = false;
          this._pauseUpdate = true;
        }
        /** Whether to pause the update checks or not. */
        get pauseUpdate() {
          return this._pauseUpdate;
        }
        set pauseUpdate(paused) {
          this._pauseUpdate = paused;
        }
        /** Adds the ticker listener. */
        addTickerListener() {
          if (this._tickerAdded || !this.domElement) {
            return;
          }
          Ticker.system.add(this._tickerUpdate, this, UPDATE_PRIORITY.INTERACTION);
          this._tickerAdded = true;
        }
        /** Removes the ticker listener. */
        removeTickerListener() {
          if (!this._tickerAdded) {
            return;
          }
          Ticker.system.remove(this._tickerUpdate, this);
          this._tickerAdded = false;
        }
        /** Sets flag to not fire extra events when the user has already moved there mouse */
        pointerMoved() {
          this._didMove = true;
        }
        /** Updates the state of interactive objects. */
        _update() {
          if (!this.domElement || this._pauseUpdate) {
            return;
          }
          if (this._didMove) {
            this._didMove = false;
            return;
          }
          const rootPointerEvent = this.events["_rootPointerEvent"];
          if (this.events.supportsTouchEvents && rootPointerEvent.pointerType === "touch") {
            return;
          }
          globalThis.document.dispatchEvent(new PointerEvent("pointermove", {
            clientX: rootPointerEvent.clientX,
            clientY: rootPointerEvent.clientY,
            pointerType: rootPointerEvent.pointerType,
            pointerId: rootPointerEvent.pointerId
          }));
        }
        /**
         * Updates the state of interactive objects if at least {@link interactionFrequency}
         * milliseconds have passed since the last invocation.
         *
         * Invoked by a throttled ticker update from {@link Ticker.system}.
         * @param ticker - The throttled ticker.
         */
        _tickerUpdate(ticker) {
          this._deltaTime += ticker.deltaTime;
          if (this._deltaTime < this.interactionFrequency) {
            return;
          }
          this._deltaTime = 0;
          this._update();
        }
      };
      EventsTicker = new EventsTickerClass();
    }
  });

  // node_modules/pixi.js/lib/events/FederatedMouseEvent.mjs
  var FederatedMouseEvent;
  var init_FederatedMouseEvent = __esm({
    "node_modules/pixi.js/lib/events/FederatedMouseEvent.mjs"() {
      init_Point();
      init_FederatedEvent();
      FederatedMouseEvent = class extends FederatedEvent {
        constructor() {
          super(...arguments);
          this.client = new Point();
          this.movement = new Point();
          this.offset = new Point();
          this.global = new Point();
          this.screen = new Point();
        }
        /** @readonly */
        get clientX() {
          return this.client.x;
        }
        /** @readonly */
        get clientY() {
          return this.client.y;
        }
        /**
         * Alias for {@link FederatedMouseEvent.clientX this.clientX}.
         * @readonly
         */
        get x() {
          return this.clientX;
        }
        /**
         * Alias for {@link FederatedMouseEvent.clientY this.clientY}.
         * @readonly
         */
        get y() {
          return this.clientY;
        }
        /** @readonly */
        get movementX() {
          return this.movement.x;
        }
        /** @readonly */
        get movementY() {
          return this.movement.y;
        }
        /** @readonly */
        get offsetX() {
          return this.offset.x;
        }
        /** @readonly */
        get offsetY() {
          return this.offset.y;
        }
        /** @readonly */
        get globalX() {
          return this.global.x;
        }
        /** @readonly */
        get globalY() {
          return this.global.y;
        }
        /**
         * The pointer coordinates in the renderer's screen. Alias for {@code screen.x}.
         * @readonly
         */
        get screenX() {
          return this.screen.x;
        }
        /**
         * The pointer coordinates in the renderer's screen. Alias for {@code screen.y}.
         * @readonly
         */
        get screenY() {
          return this.screen.y;
        }
        /**
         * This will return the local coordinates of the specified container for this InteractionData
         * @param {Container} container - The Container that you would like the local
         *  coords off
         * @param {PointData} point - A Point object in which to store the value, optional (otherwise
         *  will create a new point)
         * @param {PointData} globalPos - A Point object containing your custom global coords, optional
         *  (otherwise will use the current global coords)
         * @returns - A point containing the coordinates of the InteractionData position relative
         *  to the Container
         */
        getLocalPosition(container, point, globalPos) {
          return container.worldTransform.applyInverse(globalPos || this.global, point);
        }
        /**
         * Whether the modifier key was pressed when this event natively occurred.
         * @param key - The modifier key.
         */
        getModifierState(key) {
          return "getModifierState" in this.nativeEvent && this.nativeEvent.getModifierState(key);
        }
        /**
         * Not supported.
         * @param _typeArg
         * @param _canBubbleArg
         * @param _cancelableArg
         * @param _viewArg
         * @param _detailArg
         * @param _screenXArg
         * @param _screenYArg
         * @param _clientXArg
         * @param _clientYArg
         * @param _ctrlKeyArg
         * @param _altKeyArg
         * @param _shiftKeyArg
         * @param _metaKeyArg
         * @param _buttonArg
         * @param _relatedTargetArg
         * @deprecated since 7.0.0
         */
        // eslint-disable-next-line max-params
        initMouseEvent(_typeArg, _canBubbleArg, _cancelableArg, _viewArg, _detailArg, _screenXArg, _screenYArg, _clientXArg, _clientYArg, _ctrlKeyArg, _altKeyArg, _shiftKeyArg, _metaKeyArg, _buttonArg, _relatedTargetArg) {
          throw new Error("Method not implemented.");
        }
      };
    }
  });

  // node_modules/pixi.js/lib/events/FederatedPointerEvent.mjs
  var FederatedPointerEvent;
  var init_FederatedPointerEvent = __esm({
    "node_modules/pixi.js/lib/events/FederatedPointerEvent.mjs"() {
      init_FederatedMouseEvent();
      FederatedPointerEvent = class extends FederatedMouseEvent {
        constructor() {
          super(...arguments);
          this.width = 0;
          this.height = 0;
          this.isPrimary = false;
        }
        // Only included for completeness for now
        getCoalescedEvents() {
          if (this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove") {
            return [this];
          }
          return [];
        }
        // Only included for completeness for now
        getPredictedEvents() {
          throw new Error("getPredictedEvents is not supported!");
        }
      };
    }
  });

  // node_modules/pixi.js/lib/events/FederatedWheelEvent.mjs
  var FederatedWheelEvent;
  var init_FederatedWheelEvent = __esm({
    "node_modules/pixi.js/lib/events/FederatedWheelEvent.mjs"() {
      init_FederatedMouseEvent();
      FederatedWheelEvent = class extends FederatedMouseEvent {
        constructor() {
          super(...arguments);
          this.DOM_DELTA_PIXEL = 0;
          this.DOM_DELTA_LINE = 1;
          this.DOM_DELTA_PAGE = 2;
        }
      };
      FederatedWheelEvent.DOM_DELTA_PIXEL = 0;
      FederatedWheelEvent.DOM_DELTA_LINE = 1;
      FederatedWheelEvent.DOM_DELTA_PAGE = 2;
    }
  });

  // node_modules/pixi.js/lib/events/EventBoundary.mjs
  var PROPAGATION_LIMIT, tempHitLocation, tempLocalMapping, EventBoundary;
  var init_EventBoundary = __esm({
    "node_modules/pixi.js/lib/events/EventBoundary.mjs"() {
      init_eventemitter3();
      init_Point();
      init_warn();
      init_EventTicker();
      init_FederatedMouseEvent();
      init_FederatedPointerEvent();
      init_FederatedWheelEvent();
      PROPAGATION_LIMIT = 2048;
      tempHitLocation = new Point();
      tempLocalMapping = new Point();
      EventBoundary = class {
        /**
         * @param rootTarget - The holder of the event boundary.
         */
        constructor(rootTarget) {
          this.dispatch = new eventemitter3_default();
          this.moveOnAll = false;
          this.enableGlobalMoveEvents = true;
          this.mappingState = {
            trackingData: {}
          };
          this.eventPool = /* @__PURE__ */ new Map();
          this._allInteractiveElements = [];
          this._hitElements = [];
          this._isPointerMoveEvent = false;
          this.rootTarget = rootTarget;
          this.hitPruneFn = this.hitPruneFn.bind(this);
          this.hitTestFn = this.hitTestFn.bind(this);
          this.mapPointerDown = this.mapPointerDown.bind(this);
          this.mapPointerMove = this.mapPointerMove.bind(this);
          this.mapPointerOut = this.mapPointerOut.bind(this);
          this.mapPointerOver = this.mapPointerOver.bind(this);
          this.mapPointerUp = this.mapPointerUp.bind(this);
          this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this);
          this.mapWheel = this.mapWheel.bind(this);
          this.mappingTable = {};
          this.addEventMapping("pointerdown", this.mapPointerDown);
          this.addEventMapping("pointermove", this.mapPointerMove);
          this.addEventMapping("pointerout", this.mapPointerOut);
          this.addEventMapping("pointerleave", this.mapPointerOut);
          this.addEventMapping("pointerover", this.mapPointerOver);
          this.addEventMapping("pointerup", this.mapPointerUp);
          this.addEventMapping("pointerupoutside", this.mapPointerUpOutside);
          this.addEventMapping("wheel", this.mapWheel);
        }
        /**
         * Adds an event mapping for the event `type` handled by `fn`.
         *
         * Event mappings can be used to implement additional or custom events. They take an event
         * coming from the upstream scene (or directly from the {@link EventSystem}) and dispatch new downstream events
         * generally trickling down and bubbling up to {@link EventBoundary.rootTarget this.rootTarget}.
         *
         * To modify the semantics of existing events, the built-in mapping methods of EventBoundary should be overridden
         * instead.
         * @param type - The type of upstream event to map.
         * @param fn - The mapping method. The context of this function must be bound manually, if desired.
         */
        addEventMapping(type, fn) {
          if (!this.mappingTable[type]) {
            this.mappingTable[type] = [];
          }
          this.mappingTable[type].push({
            fn,
            priority: 0
          });
          this.mappingTable[type].sort((a2, b2) => a2.priority - b2.priority);
        }
        /**
         * Dispatches the given event
         * @param e - The event to dispatch.
         * @param type - The type of event to dispatch. Defaults to `e.type`.
         */
        dispatchEvent(e2, type) {
          e2.propagationStopped = false;
          e2.propagationImmediatelyStopped = false;
          this.propagate(e2, type);
          this.dispatch.emit(type || e2.type, e2);
        }
        /**
         * Maps the given upstream event through the event boundary and propagates it downstream.
         * @param e - The event to map.
         */
        mapEvent(e2) {
          if (!this.rootTarget) {
            return;
          }
          const mappers = this.mappingTable[e2.type];
          if (mappers) {
            for (let i2 = 0, j2 = mappers.length; i2 < j2; i2++) {
              mappers[i2].fn(e2);
            }
          } else {
            warn(`[EventBoundary]: Event mapping not defined for ${e2.type}`);
          }
        }
        /**
         * Finds the Container that is the target of a event at the given coordinates.
         *
         * The passed (x,y) coordinates are in the world space above this event boundary.
         * @param x - The x coordinate of the event.
         * @param y - The y coordinate of the event.
         */
        hitTest(x2, y2) {
          EventsTicker.pauseUpdate = true;
          const useMove = this._isPointerMoveEvent && this.enableGlobalMoveEvents;
          const fn = useMove ? "hitTestMoveRecursive" : "hitTestRecursive";
          const invertedPath = this[fn](
            this.rootTarget,
            this.rootTarget.eventMode,
            tempHitLocation.set(x2, y2),
            this.hitTestFn,
            this.hitPruneFn
          );
          return invertedPath && invertedPath[0];
        }
        /**
         * Propagate the passed event from from {@link EventBoundary.rootTarget this.rootTarget} to its
         * target {@code e.target}.
         * @param e - The event to propagate.
         * @param type - The type of event to propagate. Defaults to `e.type`.
         */
        propagate(e2, type) {
          if (!e2.target) {
            return;
          }
          const composedPath = e2.composedPath();
          e2.eventPhase = e2.CAPTURING_PHASE;
          for (let i2 = 0, j2 = composedPath.length - 1; i2 < j2; i2++) {
            e2.currentTarget = composedPath[i2];
            this.notifyTarget(e2, type);
            if (e2.propagationStopped || e2.propagationImmediatelyStopped)
              return;
          }
          e2.eventPhase = e2.AT_TARGET;
          e2.currentTarget = e2.target;
          this.notifyTarget(e2, type);
          if (e2.propagationStopped || e2.propagationImmediatelyStopped)
            return;
          e2.eventPhase = e2.BUBBLING_PHASE;
          for (let i2 = composedPath.length - 2; i2 >= 0; i2--) {
            e2.currentTarget = composedPath[i2];
            this.notifyTarget(e2, type);
            if (e2.propagationStopped || e2.propagationImmediatelyStopped)
              return;
          }
        }
        /**
         * Emits the event {@code e} to all interactive containers. The event is propagated in the bubbling phase always.
         *
         * This is used in the `globalpointermove` event.
         * @param e - The emitted event.
         * @param type - The listeners to notify.
         * @param targets - The targets to notify.
         */
        all(e2, type, targets = this._allInteractiveElements) {
          if (targets.length === 0)
            return;
          e2.eventPhase = e2.BUBBLING_PHASE;
          const events = Array.isArray(type) ? type : [type];
          for (let i2 = targets.length - 1; i2 >= 0; i2--) {
            events.forEach((event) => {
              e2.currentTarget = targets[i2];
              this.notifyTarget(e2, event);
            });
          }
        }
        /**
         * Finds the propagation path from {@link EventBoundary.rootTarget rootTarget} to the passed
         * {@code target}. The last element in the path is {@code target}.
         * @param target - The target to find the propagation path to.
         */
        propagationPath(target) {
          const propagationPath = [target];
          for (let i2 = 0; i2 < PROPAGATION_LIMIT && (target !== this.rootTarget && target.parent); i2++) {
            if (!target.parent) {
              throw new Error("Cannot find propagation path to disconnected target");
            }
            propagationPath.push(target.parent);
            target = target.parent;
          }
          propagationPath.reverse();
          return propagationPath;
        }
        hitTestMoveRecursive(currentTarget, eventMode, location, testFn, pruneFn, ignore = false) {
          let shouldReturn = false;
          if (this._interactivePrune(currentTarget))
            return null;
          if (currentTarget.eventMode === "dynamic" || eventMode === "dynamic") {
            EventsTicker.pauseUpdate = false;
          }
          if (currentTarget.interactiveChildren && currentTarget.children) {
            const children = currentTarget.children;
            for (let i2 = children.length - 1; i2 >= 0; i2--) {
              const child = children[i2];
              const nestedHit = this.hitTestMoveRecursive(
                child,
                this._isInteractive(eventMode) ? eventMode : child.eventMode,
                location,
                testFn,
                pruneFn,
                ignore || pruneFn(currentTarget, location)
              );
              if (nestedHit) {
                if (nestedHit.length > 0 && !nestedHit[nestedHit.length - 1].parent) {
                  continue;
                }
                const isInteractive = currentTarget.isInteractive();
                if (nestedHit.length > 0 || isInteractive) {
                  if (isInteractive)
                    this._allInteractiveElements.push(currentTarget);
                  nestedHit.push(currentTarget);
                }
                if (this._hitElements.length === 0)
                  this._hitElements = nestedHit;
                shouldReturn = true;
              }
            }
          }
          const isInteractiveMode = this._isInteractive(eventMode);
          const isInteractiveTarget = currentTarget.isInteractive();
          if (isInteractiveTarget && isInteractiveTarget)
            this._allInteractiveElements.push(currentTarget);
          if (ignore || this._hitElements.length > 0)
            return null;
          if (shouldReturn)
            return this._hitElements;
          if (isInteractiveMode && (!pruneFn(currentTarget, location) && testFn(currentTarget, location))) {
            return isInteractiveTarget ? [currentTarget] : [];
          }
          return null;
        }
        /**
         * Recursive implementation for {@link EventBoundary.hitTest hitTest}.
         * @param currentTarget - The Container that is to be hit tested.
         * @param eventMode - The event mode for the `currentTarget` or one of its parents.
         * @param location - The location that is being tested for overlap.
         * @param testFn - Callback that determines whether the target passes hit testing. This callback
         *  can assume that `pruneFn` failed to prune the container.
         * @param pruneFn - Callback that determiness whether the target and all of its children
         *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
         *  of the scene graph.
         * @returns An array holding the hit testing target and all its ancestors in order. The first element
         *  is the target itself and the last is {@link EventBoundary.rootTarget rootTarget}. This is the opposite
         *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
         */
        hitTestRecursive(currentTarget, eventMode, location, testFn, pruneFn) {
          if (this._interactivePrune(currentTarget) || pruneFn(currentTarget, location)) {
            return null;
          }
          if (currentTarget.eventMode === "dynamic" || eventMode === "dynamic") {
            EventsTicker.pauseUpdate = false;
          }
          if (currentTarget.interactiveChildren && currentTarget.children) {
            const children = currentTarget.children;
            const relativeLocation = location;
            for (let i2 = children.length - 1; i2 >= 0; i2--) {
              const child = children[i2];
              const nestedHit = this.hitTestRecursive(
                child,
                this._isInteractive(eventMode) ? eventMode : child.eventMode,
                relativeLocation,
                testFn,
                pruneFn
              );
              if (nestedHit) {
                if (nestedHit.length > 0 && !nestedHit[nestedHit.length - 1].parent) {
                  continue;
                }
                const isInteractive = currentTarget.isInteractive();
                if (nestedHit.length > 0 || isInteractive)
                  nestedHit.push(currentTarget);
                return nestedHit;
              }
            }
          }
          const isInteractiveMode = this._isInteractive(eventMode);
          const isInteractiveTarget = currentTarget.isInteractive();
          if (isInteractiveMode && testFn(currentTarget, location)) {
            return isInteractiveTarget ? [currentTarget] : [];
          }
          return null;
        }
        _isInteractive(int) {
          return int === "static" || int === "dynamic";
        }
        _interactivePrune(container) {
          if (!container || !container.visible || !container.renderable || !container.includeInBuild || !container.measurable) {
            return true;
          }
          if (container.eventMode === "none") {
            return true;
          }
          if (container.eventMode === "passive" && !container.interactiveChildren) {
            return true;
          }
          return false;
        }
        /**
         * Checks whether the container or any of its children cannot pass the hit test at all.
         *
         * {@link EventBoundary}'s implementation uses the {@link Container.hitArea hitArea}
         * and {@link Container._maskEffect} for pruning.
         * @param container - The container to prune.
         * @param location - The location to test for overlap.
         */
        hitPruneFn(container, location) {
          if (container.hitArea) {
            container.worldTransform.applyInverse(location, tempLocalMapping);
            if (!container.hitArea.contains(tempLocalMapping.x, tempLocalMapping.y)) {
              return true;
            }
          }
          if (container.effects && container.effects.length) {
            for (let i2 = 0; i2 < container.effects.length; i2++) {
              const effect = container.effects[i2];
              if (effect.containsPoint) {
                const effectContainsPoint = effect.containsPoint(location, this.hitTestFn);
                if (!effectContainsPoint) {
                  return true;
                }
              }
            }
          }
          return false;
        }
        /**
         * Checks whether the container passes hit testing for the given location.
         * @param container - The container to test.
         * @param location - The location to test for overlap.
         * @returns - Whether `container` passes hit testing for `location`.
         */
        hitTestFn(container, location) {
          if (container.hitArea) {
            return true;
          }
          if (container?.containsPoint) {
            container.worldTransform.applyInverse(location, tempLocalMapping);
            return container.containsPoint(tempLocalMapping);
          }
          return false;
        }
        /**
         * Notify all the listeners to the event's `currentTarget`.
         *
         * If the `currentTarget` contains the property `on<type>`, then it is called here,
         * simulating the behavior from version 6.x and prior.
         * @param e - The event passed to the target.
         * @param type - The type of event to notify. Defaults to `e.type`.
         */
        notifyTarget(e2, type) {
          if (!e2.currentTarget.isInteractive()) {
            return;
          }
          type = type ?? e2.type;
          const handlerKey = `on${type}`;
          e2.currentTarget[handlerKey]?.(e2);
          const key = e2.eventPhase === e2.CAPTURING_PHASE || e2.eventPhase === e2.AT_TARGET ? `${type}capture` : type;
          this._notifyListeners(e2, key);
          if (e2.eventPhase === e2.AT_TARGET) {
            this._notifyListeners(e2, type);
          }
        }
        /**
         * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
         *
         * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
         * @param from - The upstream `pointerdown` event.
         */
        mapPointerDown(from) {
          if (!(from instanceof FederatedPointerEvent)) {
            warn("EventBoundary cannot map a non-pointer event as a pointer event");
            return;
          }
          const e2 = this.createPointerEvent(from);
          this.dispatchEvent(e2, "pointerdown");
          if (e2.pointerType === "touch") {
            this.dispatchEvent(e2, "touchstart");
          } else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
            const isRightButton = e2.button === 2;
            this.dispatchEvent(e2, isRightButton ? "rightdown" : "mousedown");
          }
          const trackingData = this.trackingData(from.pointerId);
          trackingData.pressTargetsByButton[from.button] = e2.composedPath();
          this.freeEvent(e2);
        }
        /**
         * Maps the upstream `pointermove` to downstream `pointerout`, `pointerover`, and `pointermove` events, in that order.
         *
         * The tracking data for the specific pointer has an updated `overTarget`. `mouseout`, `mouseover`,
         * `mousemove`, and `touchmove` events are fired as well for specific pointer types.
         * @param from - The upstream `pointermove` event.
         */
        mapPointerMove(from) {
          if (!(from instanceof FederatedPointerEvent)) {
            warn("EventBoundary cannot map a non-pointer event as a pointer event");
            return;
          }
          this._allInteractiveElements.length = 0;
          this._hitElements.length = 0;
          this._isPointerMoveEvent = true;
          const e2 = this.createPointerEvent(from);
          this._isPointerMoveEvent = false;
          const isMouse = e2.pointerType === "mouse" || e2.pointerType === "pen";
          const trackingData = this.trackingData(from.pointerId);
          const outTarget = this.findMountedTarget(trackingData.overTargets);
          if (trackingData.overTargets?.length > 0 && outTarget !== e2.target) {
            const outType = from.type === "mousemove" ? "mouseout" : "pointerout";
            const outEvent = this.createPointerEvent(from, outType, outTarget);
            this.dispatchEvent(outEvent, "pointerout");
            if (isMouse)
              this.dispatchEvent(outEvent, "mouseout");
            if (!e2.composedPath().includes(outTarget)) {
              const leaveEvent = this.createPointerEvent(from, "pointerleave", outTarget);
              leaveEvent.eventPhase = leaveEvent.AT_TARGET;
              while (leaveEvent.target && !e2.composedPath().includes(leaveEvent.target)) {
                leaveEvent.currentTarget = leaveEvent.target;
                this.notifyTarget(leaveEvent);
                if (isMouse)
                  this.notifyTarget(leaveEvent, "mouseleave");
                leaveEvent.target = leaveEvent.target.parent;
              }
              this.freeEvent(leaveEvent);
            }
            this.freeEvent(outEvent);
          }
          if (outTarget !== e2.target) {
            const overType = from.type === "mousemove" ? "mouseover" : "pointerover";
            const overEvent = this.clonePointerEvent(e2, overType);
            this.dispatchEvent(overEvent, "pointerover");
            if (isMouse)
              this.dispatchEvent(overEvent, "mouseover");
            let overTargetAncestor = outTarget?.parent;
            while (overTargetAncestor && overTargetAncestor !== this.rootTarget.parent) {
              if (overTargetAncestor === e2.target)
                break;
              overTargetAncestor = overTargetAncestor.parent;
            }
            const didPointerEnter = !overTargetAncestor || overTargetAncestor === this.rootTarget.parent;
            if (didPointerEnter) {
              const enterEvent = this.clonePointerEvent(e2, "pointerenter");
              enterEvent.eventPhase = enterEvent.AT_TARGET;
              while (enterEvent.target && enterEvent.target !== outTarget && enterEvent.target !== this.rootTarget.parent) {
                enterEvent.currentTarget = enterEvent.target;
                this.notifyTarget(enterEvent);
                if (isMouse)
                  this.notifyTarget(enterEvent, "mouseenter");
                enterEvent.target = enterEvent.target.parent;
              }
              this.freeEvent(enterEvent);
            }
            this.freeEvent(overEvent);
          }
          const allMethods = [];
          const allowGlobalPointerEvents = this.enableGlobalMoveEvents ?? true;
          this.moveOnAll ? allMethods.push("pointermove") : this.dispatchEvent(e2, "pointermove");
          allowGlobalPointerEvents && allMethods.push("globalpointermove");
          if (e2.pointerType === "touch") {
            this.moveOnAll ? allMethods.splice(1, 0, "touchmove") : this.dispatchEvent(e2, "touchmove");
            allowGlobalPointerEvents && allMethods.push("globaltouchmove");
          }
          if (isMouse) {
            this.moveOnAll ? allMethods.splice(1, 0, "mousemove") : this.dispatchEvent(e2, "mousemove");
            allowGlobalPointerEvents && allMethods.push("globalmousemove");
            this.cursor = e2.target?.cursor;
          }
          if (allMethods.length > 0) {
            this.all(e2, allMethods);
          }
          this._allInteractiveElements.length = 0;
          this._hitElements.length = 0;
          trackingData.overTargets = e2.composedPath();
          this.freeEvent(e2);
        }
        /**
         * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
         *
         * The tracking data for the specific pointer gets a new `overTarget`.
         * @param from - The upstream `pointerover` event.
         */
        mapPointerOver(from) {
          if (!(from instanceof FederatedPointerEvent)) {
            warn("EventBoundary cannot map a non-pointer event as a pointer event");
            return;
          }
          const trackingData = this.trackingData(from.pointerId);
          const e2 = this.createPointerEvent(from);
          const isMouse = e2.pointerType === "mouse" || e2.pointerType === "pen";
          this.dispatchEvent(e2, "pointerover");
          if (isMouse)
            this.dispatchEvent(e2, "mouseover");
          if (e2.pointerType === "mouse")
            this.cursor = e2.target?.cursor;
          const enterEvent = this.clonePointerEvent(e2, "pointerenter");
          enterEvent.eventPhase = enterEvent.AT_TARGET;
          while (enterEvent.target && enterEvent.target !== this.rootTarget.parent) {
            enterEvent.currentTarget = enterEvent.target;
            this.notifyTarget(enterEvent);
            if (isMouse)
              this.notifyTarget(enterEvent, "mouseenter");
            enterEvent.target = enterEvent.target.parent;
          }
          trackingData.overTargets = e2.composedPath();
          this.freeEvent(e2);
          this.freeEvent(enterEvent);
        }
        /**
         * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
         *
         * The tracking data for the specific pointer is cleared of a `overTarget`.
         * @param from - The upstream `pointerout` event.
         */
        mapPointerOut(from) {
          if (!(from instanceof FederatedPointerEvent)) {
            warn("EventBoundary cannot map a non-pointer event as a pointer event");
            return;
          }
          const trackingData = this.trackingData(from.pointerId);
          if (trackingData.overTargets) {
            const isMouse = from.pointerType === "mouse" || from.pointerType === "pen";
            const outTarget = this.findMountedTarget(trackingData.overTargets);
            const outEvent = this.createPointerEvent(from, "pointerout", outTarget);
            this.dispatchEvent(outEvent);
            if (isMouse)
              this.dispatchEvent(outEvent, "mouseout");
            const leaveEvent = this.createPointerEvent(from, "pointerleave", outTarget);
            leaveEvent.eventPhase = leaveEvent.AT_TARGET;
            while (leaveEvent.target && leaveEvent.target !== this.rootTarget.parent) {
              leaveEvent.currentTarget = leaveEvent.target;
              this.notifyTarget(leaveEvent);
              if (isMouse)
                this.notifyTarget(leaveEvent, "mouseleave");
              leaveEvent.target = leaveEvent.target.parent;
            }
            trackingData.overTargets = null;
            this.freeEvent(outEvent);
            this.freeEvent(leaveEvent);
          }
          this.cursor = null;
        }
        /**
         * Maps the upstream `pointerup` event to downstream `pointerup`, `pointerupoutside`,
         * and `click`/`rightclick`/`pointertap` events, in that order.
         *
         * The `pointerupoutside` event bubbles from the original `pointerdown` target to the most specific
         * ancestor of the `pointerdown` and `pointerup` targets, which is also the `click` event's target. `touchend`,
         * `rightup`, `mouseup`, `touchendoutside`, `rightupoutside`, `mouseupoutside`, and `tap` are fired as well for
         * specific pointer types.
         * @param from - The upstream `pointerup` event.
         */
        mapPointerUp(from) {
          if (!(from instanceof FederatedPointerEvent)) {
            warn("EventBoundary cannot map a non-pointer event as a pointer event");
            return;
          }
          const now = performance.now();
          const e2 = this.createPointerEvent(from);
          this.dispatchEvent(e2, "pointerup");
          if (e2.pointerType === "touch") {
            this.dispatchEvent(e2, "touchend");
          } else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
            const isRightButton = e2.button === 2;
            this.dispatchEvent(e2, isRightButton ? "rightup" : "mouseup");
          }
          const trackingData = this.trackingData(from.pointerId);
          const pressTarget = this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
          let clickTarget = pressTarget;
          if (pressTarget && !e2.composedPath().includes(pressTarget)) {
            let currentTarget = pressTarget;
            while (currentTarget && !e2.composedPath().includes(currentTarget)) {
              e2.currentTarget = currentTarget;
              this.notifyTarget(e2, "pointerupoutside");
              if (e2.pointerType === "touch") {
                this.notifyTarget(e2, "touchendoutside");
              } else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
                const isRightButton = e2.button === 2;
                this.notifyTarget(e2, isRightButton ? "rightupoutside" : "mouseupoutside");
              }
              currentTarget = currentTarget.parent;
            }
            delete trackingData.pressTargetsByButton[from.button];
            clickTarget = currentTarget;
          }
          if (clickTarget) {
            const clickEvent = this.clonePointerEvent(e2, "click");
            clickEvent.target = clickTarget;
            clickEvent.path = null;
            if (!trackingData.clicksByButton[from.button]) {
              trackingData.clicksByButton[from.button] = {
                clickCount: 0,
                target: clickEvent.target,
                timeStamp: now
              };
            }
            const clickHistory = trackingData.clicksByButton[from.button];
            if (clickHistory.target === clickEvent.target && now - clickHistory.timeStamp < 200) {
              ++clickHistory.clickCount;
            } else {
              clickHistory.clickCount = 1;
            }
            clickHistory.target = clickEvent.target;
            clickHistory.timeStamp = now;
            clickEvent.detail = clickHistory.clickCount;
            if (clickEvent.pointerType === "mouse") {
              const isRightButton = clickEvent.button === 2;
              this.dispatchEvent(clickEvent, isRightButton ? "rightclick" : "click");
            } else if (clickEvent.pointerType === "touch") {
              this.dispatchEvent(clickEvent, "tap");
            }
            this.dispatchEvent(clickEvent, "pointertap");
            this.freeEvent(clickEvent);
          }
          this.freeEvent(e2);
        }
        /**
         * Maps the upstream `pointerupoutside` event to a downstream `pointerupoutside` event, bubbling from the original
         * `pointerdown` target to `rootTarget`.
         *
         * (The most specific ancestor of the `pointerdown` event and the `pointerup` event must the
         * `{@link EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
         *
         * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
         * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
         * @param from - The upstream `pointerupoutside` event.
         */
        mapPointerUpOutside(from) {
          if (!(from instanceof FederatedPointerEvent)) {
            warn("EventBoundary cannot map a non-pointer event as a pointer event");
            return;
          }
          const trackingData = this.trackingData(from.pointerId);
          const pressTarget = this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
          const e2 = this.createPointerEvent(from);
          if (pressTarget) {
            let currentTarget = pressTarget;
            while (currentTarget) {
              e2.currentTarget = currentTarget;
              this.notifyTarget(e2, "pointerupoutside");
              if (e2.pointerType === "touch") {
                this.notifyTarget(e2, "touchendoutside");
              } else if (e2.pointerType === "mouse" || e2.pointerType === "pen") {
                this.notifyTarget(e2, e2.button === 2 ? "rightupoutside" : "mouseupoutside");
              }
              currentTarget = currentTarget.parent;
            }
            delete trackingData.pressTargetsByButton[from.button];
          }
          this.freeEvent(e2);
        }
        /**
         * Maps the upstream `wheel` event to a downstream `wheel` event.
         * @param from - The upstream `wheel` event.
         */
        mapWheel(from) {
          if (!(from instanceof FederatedWheelEvent)) {
            warn("EventBoundary cannot map a non-wheel event as a wheel event");
            return;
          }
          const wheelEvent = this.createWheelEvent(from);
          this.dispatchEvent(wheelEvent);
          this.freeEvent(wheelEvent);
        }
        /**
         * Finds the most specific event-target in the given propagation path that is still mounted in the scene graph.
         *
         * This is used to find the correct `pointerup` and `pointerout` target in the case that the original `pointerdown`
         * or `pointerover` target was unmounted from the scene graph.
         * @param propagationPath - The propagation path was valid in the past.
         * @returns - The most specific event-target still mounted at the same location in the scene graph.
         */
        findMountedTarget(propagationPath) {
          if (!propagationPath) {
            return null;
          }
          let currentTarget = propagationPath[0];
          for (let i2 = 1; i2 < propagationPath.length; i2++) {
            if (propagationPath[i2].parent === currentTarget) {
              currentTarget = propagationPath[i2];
            } else {
              break;
            }
          }
          return currentTarget;
        }
        /**
         * Creates an event whose {@code originalEvent} is {@code from}, with an optional `type` and `target` override.
         *
         * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
         * @param from - The {@code originalEvent} for the returned event.
         * @param [type=from.type] - The type of the returned event.
         * @param target - The target of the returned event.
         */
        createPointerEvent(from, type, target) {
          const event = this.allocateEvent(FederatedPointerEvent);
          this.copyPointerData(from, event);
          this.copyMouseData(from, event);
          this.copyData(from, event);
          event.nativeEvent = from.nativeEvent;
          event.originalEvent = from;
          event.target = target ?? this.hitTest(event.global.x, event.global.y) ?? this._hitElements[0];
          if (typeof type === "string") {
            event.type = type;
          }
          return event;
        }
        /**
         * Creates a wheel event whose {@code originalEvent} is {@code from}.
         *
         * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
         * @param from - The upstream wheel event.
         */
        createWheelEvent(from) {
          const event = this.allocateEvent(FederatedWheelEvent);
          this.copyWheelData(from, event);
          this.copyMouseData(from, event);
          this.copyData(from, event);
          event.nativeEvent = from.nativeEvent;
          event.originalEvent = from;
          event.target = this.hitTest(event.global.x, event.global.y);
          return event;
        }
        /**
         * Clones the event {@code from}, with an optional {@code type} override.
         *
         * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
         * @param from - The event to clone.
         * @param [type=from.type] - The type of the returned event.
         */
        clonePointerEvent(from, type) {
          const event = this.allocateEvent(FederatedPointerEvent);
          event.nativeEvent = from.nativeEvent;
          event.originalEvent = from.originalEvent;
          this.copyPointerData(from, event);
          this.copyMouseData(from, event);
          this.copyData(from, event);
          event.target = from.target;
          event.path = from.composedPath().slice();
          event.type = type ?? event.type;
          return event;
        }
        /**
         * Copies wheel {@link FederatedWheelEvent} data from {@code from} into {@code to}.
         *
         * The following properties are copied:
         * + deltaMode
         * + deltaX
         * + deltaY
         * + deltaZ
         * @param from - The event to copy data from.
         * @param to - The event to copy data into.
         */
        copyWheelData(from, to) {
          to.deltaMode = from.deltaMode;
          to.deltaX = from.deltaX;
          to.deltaY = from.deltaY;
          to.deltaZ = from.deltaZ;
        }
        /**
         * Copies pointer {@link FederatedPointerEvent} data from {@code from} into {@code to}.
         *
         * The following properties are copied:
         * + pointerId
         * + width
         * + height
         * + isPrimary
         * + pointerType
         * + pressure
         * + tangentialPressure
         * + tiltX
         * + tiltY
         * @param from - The event to copy data from.
         * @param to - The event to copy data into.
         */
        copyPointerData(from, to) {
          if (!(from instanceof FederatedPointerEvent && to instanceof FederatedPointerEvent))
            return;
          to.pointerId = from.pointerId;
          to.width = from.width;
          to.height = from.height;
          to.isPrimary = from.isPrimary;
          to.pointerType = from.pointerType;
          to.pressure = from.pressure;
          to.tangentialPressure = from.tangentialPressure;
          to.tiltX = from.tiltX;
          to.tiltY = from.tiltY;
          to.twist = from.twist;
        }
        /**
         * Copies mouse {@link FederatedMouseEvent} data from {@code from} to {@code to}.
         *
         * The following properties are copied:
         * + altKey
         * + button
         * + buttons
         * + clientX
         * + clientY
         * + metaKey
         * + movementX
         * + movementY
         * + pageX
         * + pageY
         * + x
         * + y
         * + screen
         * + shiftKey
         * + global
         * @param from - The event to copy data from.
         * @param to - The event to copy data into.
         */
        copyMouseData(from, to) {
          if (!(from instanceof FederatedMouseEvent && to instanceof FederatedMouseEvent))
            return;
          to.altKey = from.altKey;
          to.button = from.button;
          to.buttons = from.buttons;
          to.client.copyFrom(from.client);
          to.ctrlKey = from.ctrlKey;
          to.metaKey = from.metaKey;
          to.movement.copyFrom(from.movement);
          to.screen.copyFrom(from.screen);
          to.shiftKey = from.shiftKey;
          to.global.copyFrom(from.global);
        }
        /**
         * Copies base {@link FederatedEvent} data from {@code from} into {@code to}.
         *
         * The following properties are copied:
         * + isTrusted
         * + srcElement
         * + timeStamp
         * + type
         * @param from - The event to copy data from.
         * @param to - The event to copy data into.
         */
        copyData(from, to) {
          to.isTrusted = from.isTrusted;
          to.srcElement = from.srcElement;
          to.timeStamp = performance.now();
          to.type = from.type;
          to.detail = from.detail;
          to.view = from.view;
          to.which = from.which;
          to.layer.copyFrom(from.layer);
          to.page.copyFrom(from.page);
        }
        /**
         * @param id - The pointer ID.
         * @returns The tracking data stored for the given pointer. If no data exists, a blank
         *  state will be created.
         */
        trackingData(id) {
          if (!this.mappingState.trackingData[id]) {
            this.mappingState.trackingData[id] = {
              pressTargetsByButton: {},
              clicksByButton: {},
              overTarget: null
            };
          }
          return this.mappingState.trackingData[id];
        }
        /**
         * Allocate a specific type of event from {@link EventBoundary#eventPool this.eventPool}.
         *
         * This allocation is constructor-agnostic, as long as it only takes one argument - this event
         * boundary.
         * @param constructor - The event's constructor.
         */
        allocateEvent(constructor) {
          if (!this.eventPool.has(constructor)) {
            this.eventPool.set(constructor, []);
          }
          const event = this.eventPool.get(constructor).pop() || new constructor(this);
          event.eventPhase = event.NONE;
          event.currentTarget = null;
          event.path = null;
          event.target = null;
          return event;
        }
        /**
         * Frees the event and puts it back into the event pool.
         *
         * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
         *
         * It is also advised that events not allocated from {@link EventBoundary#allocateEvent this.allocateEvent}
         * not be freed. This is because of the possibility that the same event is freed twice, which can cause
         * it to be allocated twice & result in overwriting.
         * @param event - The event to be freed.
         * @throws Error if the event is managed by another event boundary.
         */
        freeEvent(event) {
          if (event.manager !== this)
            throw new Error("It is illegal to free an event not managed by this EventBoundary!");
          const constructor = event.constructor;
          if (!this.eventPool.has(constructor)) {
            this.eventPool.set(constructor, []);
          }
          this.eventPool.get(constructor).push(event);
        }
        /**
         * Similar to {@link EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
         * is set on the event.
         * @param e - The event to call each listener with.
         * @param type - The event key.
         */
        _notifyListeners(e2, type) {
          const listeners = e2.currentTarget._events[type];
          if (!listeners)
            return;
          if ("fn" in listeners) {
            if (listeners.once)
              e2.currentTarget.removeListener(type, listeners.fn, void 0, true);
            listeners.fn.call(listeners.context, e2);
          } else {
            for (let i2 = 0, j2 = listeners.length; i2 < j2 && !e2.propagationImmediatelyStopped; i2++) {
              if (listeners[i2].once)
                e2.currentTarget.removeListener(type, listeners[i2].fn, void 0, true);
              listeners[i2].fn.call(listeners[i2].context, e2);
            }
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/events/EventSystem.mjs
  var MOUSE_POINTER_ID, TOUCH_TO_POINTER, _EventSystem, EventSystem;
  var init_EventSystem = __esm({
    "node_modules/pixi.js/lib/events/EventSystem.mjs"() {
      init_Extensions();
      init_EventBoundary();
      init_EventTicker();
      init_FederatedPointerEvent();
      init_FederatedWheelEvent();
      MOUSE_POINTER_ID = 1;
      TOUCH_TO_POINTER = {
        touchstart: "pointerdown",
        touchend: "pointerup",
        touchendoutside: "pointerupoutside",
        touchmove: "pointermove",
        touchcancel: "pointercancel"
      };
      _EventSystem = class _EventSystem2 {
        /**
         * @param {Renderer} renderer
         */
        constructor(renderer) {
          this.supportsTouchEvents = "ontouchstart" in globalThis;
          this.supportsPointerEvents = !!globalThis.PointerEvent;
          this.domElement = null;
          this.resolution = 1;
          this.renderer = renderer;
          this.rootBoundary = new EventBoundary(null);
          EventsTicker.init(this);
          this.autoPreventDefault = true;
          this._eventsAdded = false;
          this._rootPointerEvent = new FederatedPointerEvent(null);
          this._rootWheelEvent = new FederatedWheelEvent(null);
          this.cursorStyles = {
            default: "inherit",
            pointer: "pointer"
          };
          this.features = new Proxy({ ..._EventSystem2.defaultEventFeatures }, {
            set: (target, key, value) => {
              if (key === "globalMove") {
                this.rootBoundary.enableGlobalMoveEvents = value;
              }
              target[key] = value;
              return true;
            }
          });
          this._onPointerDown = this._onPointerDown.bind(this);
          this._onPointerMove = this._onPointerMove.bind(this);
          this._onPointerUp = this._onPointerUp.bind(this);
          this._onPointerOverOut = this._onPointerOverOut.bind(this);
          this.onWheel = this.onWheel.bind(this);
        }
        /**
         * The default interaction mode for all display objects.
         * @see Container.eventMode
         * @type {EventMode}
         * @readonly
         * @since 7.2.0
         */
        static get defaultEventMode() {
          return this._defaultEventMode;
        }
        /**
         * Runner init called, view is available at this point.
         * @ignore
         */
        init(options) {
          const { canvas, resolution } = this.renderer;
          this.setTargetElement(canvas);
          this.resolution = resolution;
          _EventSystem2._defaultEventMode = options.eventMode ?? "passive";
          Object.assign(this.features, options.eventFeatures ?? {});
          this.rootBoundary.enableGlobalMoveEvents = this.features.globalMove;
        }
        /**
         * Handle changing resolution.
         * @ignore
         */
        resolutionChange(resolution) {
          this.resolution = resolution;
        }
        /** Destroys all event listeners and detaches the renderer. */
        destroy() {
          this.setTargetElement(null);
          this.renderer = null;
          this._currentCursor = null;
        }
        /**
         * Sets the current cursor mode, handling any callbacks or CSS style changes.
         * @param mode - cursor mode, a key from the cursorStyles dictionary
         */
        setCursor(mode) {
          mode = mode || "default";
          let applyStyles = true;
          if (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas) {
            applyStyles = false;
          }
          if (this._currentCursor === mode) {
            return;
          }
          this._currentCursor = mode;
          const style = this.cursorStyles[mode];
          if (style) {
            switch (typeof style) {
              case "string":
                if (applyStyles) {
                  this.domElement.style.cursor = style;
                }
                break;
              case "function":
                style(mode);
                break;
              case "object":
                if (applyStyles) {
                  Object.assign(this.domElement.style, style);
                }
                break;
            }
          } else if (applyStyles && typeof mode === "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, mode)) {
            this.domElement.style.cursor = mode;
          }
        }
        /**
         * The global pointer event.
         * Useful for getting the pointer position without listening to events.
         * @since 7.2.0
         */
        get pointer() {
          return this._rootPointerEvent;
        }
        /**
         * Event handler for pointer down events on {@link EventSystem#domElement this.domElement}.
         * @param nativeEvent - The native mouse/pointer/touch event.
         */
        _onPointerDown(nativeEvent) {
          if (!this.features.click)
            return;
          this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
          const events = this._normalizeToPointerData(nativeEvent);
          if (this.autoPreventDefault && events[0].isNormalized) {
            const cancelable = nativeEvent.cancelable || !("cancelable" in nativeEvent);
            if (cancelable) {
              nativeEvent.preventDefault();
            }
          }
          for (let i2 = 0, j2 = events.length; i2 < j2; i2++) {
            const nativeEvent2 = events[i2];
            const federatedEvent = this._bootstrapEvent(this._rootPointerEvent, nativeEvent2);
            this.rootBoundary.mapEvent(federatedEvent);
          }
          this.setCursor(this.rootBoundary.cursor);
        }
        /**
         * Event handler for pointer move events on on {@link EventSystem#domElement this.domElement}.
         * @param nativeEvent - The native mouse/pointer/touch events.
         */
        _onPointerMove(nativeEvent) {
          if (!this.features.move)
            return;
          this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
          EventsTicker.pointerMoved();
          const normalizedEvents = this._normalizeToPointerData(nativeEvent);
          for (let i2 = 0, j2 = normalizedEvents.length; i2 < j2; i2++) {
            const event = this._bootstrapEvent(this._rootPointerEvent, normalizedEvents[i2]);
            this.rootBoundary.mapEvent(event);
          }
          this.setCursor(this.rootBoundary.cursor);
        }
        /**
         * Event handler for pointer up events on {@link EventSystem#domElement this.domElement}.
         * @param nativeEvent - The native mouse/pointer/touch event.
         */
        _onPointerUp(nativeEvent) {
          if (!this.features.click)
            return;
          this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
          let target = nativeEvent.target;
          if (nativeEvent.composedPath && nativeEvent.composedPath().length > 0) {
            target = nativeEvent.composedPath()[0];
          }
          const outside = target !== this.domElement ? "outside" : "";
          const normalizedEvents = this._normalizeToPointerData(nativeEvent);
          for (let i2 = 0, j2 = normalizedEvents.length; i2 < j2; i2++) {
            const event = this._bootstrapEvent(this._rootPointerEvent, normalizedEvents[i2]);
            event.type += outside;
            this.rootBoundary.mapEvent(event);
          }
          this.setCursor(this.rootBoundary.cursor);
        }
        /**
         * Event handler for pointer over & out events on {@link EventSystem#domElement this.domElement}.
         * @param nativeEvent - The native mouse/pointer/touch event.
         */
        _onPointerOverOut(nativeEvent) {
          if (!this.features.click)
            return;
          this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
          const normalizedEvents = this._normalizeToPointerData(nativeEvent);
          for (let i2 = 0, j2 = normalizedEvents.length; i2 < j2; i2++) {
            const event = this._bootstrapEvent(this._rootPointerEvent, normalizedEvents[i2]);
            this.rootBoundary.mapEvent(event);
          }
          this.setCursor(this.rootBoundary.cursor);
        }
        /**
         * Passive handler for `wheel` events on {@link EventSystem.domElement this.domElement}.
         * @param nativeEvent - The native wheel event.
         */
        onWheel(nativeEvent) {
          if (!this.features.wheel)
            return;
          const wheelEvent = this.normalizeWheelEvent(nativeEvent);
          this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
          this.rootBoundary.mapEvent(wheelEvent);
        }
        /**
         * Sets the {@link EventSystem#domElement domElement} and binds event listeners.
         *
         * To deregister the current DOM element without setting a new one, pass {@code null}.
         * @param element - The new DOM element.
         */
        setTargetElement(element) {
          this._removeEvents();
          this.domElement = element;
          EventsTicker.domElement = element;
          this._addEvents();
        }
        /** Register event listeners on {@link Renderer#domElement this.domElement}. */
        _addEvents() {
          if (this._eventsAdded || !this.domElement) {
            return;
          }
          EventsTicker.addTickerListener();
          const style = this.domElement.style;
          if (style) {
            if (globalThis.navigator.msPointerEnabled) {
              style.msContentZooming = "none";
              style.msTouchAction = "none";
            } else if (this.supportsPointerEvents) {
              style.touchAction = "none";
            }
          }
          if (this.supportsPointerEvents) {
            globalThis.document.addEventListener("pointermove", this._onPointerMove, true);
            this.domElement.addEventListener("pointerdown", this._onPointerDown, true);
            this.domElement.addEventListener("pointerleave", this._onPointerOverOut, true);
            this.domElement.addEventListener("pointerover", this._onPointerOverOut, true);
            globalThis.addEventListener("pointerup", this._onPointerUp, true);
          } else {
            globalThis.document.addEventListener("mousemove", this._onPointerMove, true);
            this.domElement.addEventListener("mousedown", this._onPointerDown, true);
            this.domElement.addEventListener("mouseout", this._onPointerOverOut, true);
            this.domElement.addEventListener("mouseover", this._onPointerOverOut, true);
            globalThis.addEventListener("mouseup", this._onPointerUp, true);
            if (this.supportsTouchEvents) {
              this.domElement.addEventListener("touchstart", this._onPointerDown, true);
              this.domElement.addEventListener("touchend", this._onPointerUp, true);
              this.domElement.addEventListener("touchmove", this._onPointerMove, true);
            }
          }
          this.domElement.addEventListener("wheel", this.onWheel, {
            passive: true,
            capture: true
          });
          this._eventsAdded = true;
        }
        /** Unregister event listeners on {@link EventSystem#domElement this.domElement}. */
        _removeEvents() {
          if (!this._eventsAdded || !this.domElement) {
            return;
          }
          EventsTicker.removeTickerListener();
          const style = this.domElement.style;
          if (style) {
            if (globalThis.navigator.msPointerEnabled) {
              style.msContentZooming = "";
              style.msTouchAction = "";
            } else if (this.supportsPointerEvents) {
              style.touchAction = "";
            }
          }
          if (this.supportsPointerEvents) {
            globalThis.document.removeEventListener("pointermove", this._onPointerMove, true);
            this.domElement.removeEventListener("pointerdown", this._onPointerDown, true);
            this.domElement.removeEventListener("pointerleave", this._onPointerOverOut, true);
            this.domElement.removeEventListener("pointerover", this._onPointerOverOut, true);
            globalThis.removeEventListener("pointerup", this._onPointerUp, true);
          } else {
            globalThis.document.removeEventListener("mousemove", this._onPointerMove, true);
            this.domElement.removeEventListener("mousedown", this._onPointerDown, true);
            this.domElement.removeEventListener("mouseout", this._onPointerOverOut, true);
            this.domElement.removeEventListener("mouseover", this._onPointerOverOut, true);
            globalThis.removeEventListener("mouseup", this._onPointerUp, true);
            if (this.supportsTouchEvents) {
              this.domElement.removeEventListener("touchstart", this._onPointerDown, true);
              this.domElement.removeEventListener("touchend", this._onPointerUp, true);
              this.domElement.removeEventListener("touchmove", this._onPointerMove, true);
            }
          }
          this.domElement.removeEventListener("wheel", this.onWheel, true);
          this.domElement = null;
          this._eventsAdded = false;
        }
        /**
         * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
         * resulting value is stored in the point. This takes into account the fact that the DOM
         * element could be scaled and positioned anywhere on the screen.
         * @param  {PointData} point - the point that the result will be stored in
         * @param  {number} x - the x coord of the position to map
         * @param  {number} y - the y coord of the position to map
         */
        mapPositionToPoint(point, x2, y2) {
          const rect = this.domElement.isConnected ? this.domElement.getBoundingClientRect() : {
            x: 0,
            y: 0,
            width: this.domElement.width,
            height: this.domElement.height,
            left: 0,
            top: 0
          };
          const resolutionMultiplier = 1 / this.resolution;
          point.x = (x2 - rect.left) * (this.domElement.width / rect.width) * resolutionMultiplier;
          point.y = (y2 - rect.top) * (this.domElement.height / rect.height) * resolutionMultiplier;
        }
        /**
         * Ensures that the original event object contains all data that a regular pointer event would have
         * @param event - The original event data from a touch or mouse event
         * @returns An array containing a single normalized pointer event, in the case of a pointer
         *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
         */
        _normalizeToPointerData(event) {
          const normalizedEvents = [];
          if (this.supportsTouchEvents && event instanceof TouchEvent) {
            for (let i2 = 0, li = event.changedTouches.length; i2 < li; i2++) {
              const touch = event.changedTouches[i2];
              if (typeof touch.button === "undefined")
                touch.button = 0;
              if (typeof touch.buttons === "undefined")
                touch.buttons = 1;
              if (typeof touch.isPrimary === "undefined") {
                touch.isPrimary = event.touches.length === 1 && event.type === "touchstart";
              }
              if (typeof touch.width === "undefined")
                touch.width = touch.radiusX || 1;
              if (typeof touch.height === "undefined")
                touch.height = touch.radiusY || 1;
              if (typeof touch.tiltX === "undefined")
                touch.tiltX = 0;
              if (typeof touch.tiltY === "undefined")
                touch.tiltY = 0;
              if (typeof touch.pointerType === "undefined")
                touch.pointerType = "touch";
              if (typeof touch.pointerId === "undefined")
                touch.pointerId = touch.identifier || 0;
              if (typeof touch.pressure === "undefined")
                touch.pressure = touch.force || 0.5;
              if (typeof touch.twist === "undefined")
                touch.twist = 0;
              if (typeof touch.tangentialPressure === "undefined")
                touch.tangentialPressure = 0;
              if (typeof touch.layerX === "undefined")
                touch.layerX = touch.offsetX = touch.clientX;
              if (typeof touch.layerY === "undefined")
                touch.layerY = touch.offsetY = touch.clientY;
              touch.isNormalized = true;
              touch.type = event.type;
              normalizedEvents.push(touch);
            }
          } else if (!globalThis.MouseEvent || event instanceof MouseEvent && (!this.supportsPointerEvents || !(event instanceof globalThis.PointerEvent))) {
            const tempEvent = event;
            if (typeof tempEvent.isPrimary === "undefined")
              tempEvent.isPrimary = true;
            if (typeof tempEvent.width === "undefined")
              tempEvent.width = 1;
            if (typeof tempEvent.height === "undefined")
              tempEvent.height = 1;
            if (typeof tempEvent.tiltX === "undefined")
              tempEvent.tiltX = 0;
            if (typeof tempEvent.tiltY === "undefined")
              tempEvent.tiltY = 0;
            if (typeof tempEvent.pointerType === "undefined")
              tempEvent.pointerType = "mouse";
            if (typeof tempEvent.pointerId === "undefined")
              tempEvent.pointerId = MOUSE_POINTER_ID;
            if (typeof tempEvent.pressure === "undefined")
              tempEvent.pressure = 0.5;
            if (typeof tempEvent.twist === "undefined")
              tempEvent.twist = 0;
            if (typeof tempEvent.tangentialPressure === "undefined")
              tempEvent.tangentialPressure = 0;
            tempEvent.isNormalized = true;
            normalizedEvents.push(tempEvent);
          } else {
            normalizedEvents.push(event);
          }
          return normalizedEvents;
        }
        /**
         * Normalizes the native {@link https://w3c.github.io/uievents/#interface-wheelevent WheelEvent}.
         *
         * The returned {@link FederatedWheelEvent} is a shared instance. It will not persist across
         * multiple native wheel events.
         * @param nativeEvent - The native wheel event that occurred on the canvas.
         * @returns A federated wheel event.
         */
        normalizeWheelEvent(nativeEvent) {
          const event = this._rootWheelEvent;
          this._transferMouseData(event, nativeEvent);
          event.deltaX = nativeEvent.deltaX;
          event.deltaY = nativeEvent.deltaY;
          event.deltaZ = nativeEvent.deltaZ;
          event.deltaMode = nativeEvent.deltaMode;
          this.mapPositionToPoint(event.screen, nativeEvent.clientX, nativeEvent.clientY);
          event.global.copyFrom(event.screen);
          event.offset.copyFrom(event.screen);
          event.nativeEvent = nativeEvent;
          event.type = nativeEvent.type;
          return event;
        }
        /**
         * Normalizes the `nativeEvent` into a federateed {@link FederatedPointerEvent}.
         * @param event
         * @param nativeEvent
         */
        _bootstrapEvent(event, nativeEvent) {
          event.originalEvent = null;
          event.nativeEvent = nativeEvent;
          event.pointerId = nativeEvent.pointerId;
          event.width = nativeEvent.width;
          event.height = nativeEvent.height;
          event.isPrimary = nativeEvent.isPrimary;
          event.pointerType = nativeEvent.pointerType;
          event.pressure = nativeEvent.pressure;
          event.tangentialPressure = nativeEvent.tangentialPressure;
          event.tiltX = nativeEvent.tiltX;
          event.tiltY = nativeEvent.tiltY;
          event.twist = nativeEvent.twist;
          this._transferMouseData(event, nativeEvent);
          this.mapPositionToPoint(event.screen, nativeEvent.clientX, nativeEvent.clientY);
          event.global.copyFrom(event.screen);
          event.offset.copyFrom(event.screen);
          event.isTrusted = nativeEvent.isTrusted;
          if (event.type === "pointerleave") {
            event.type = "pointerout";
          }
          if (event.type.startsWith("mouse")) {
            event.type = event.type.replace("mouse", "pointer");
          }
          if (event.type.startsWith("touch")) {
            event.type = TOUCH_TO_POINTER[event.type] || event.type;
          }
          return event;
        }
        /**
         * Transfers base & mouse event data from the {@code nativeEvent} to the federated event.
         * @param event
         * @param nativeEvent
         */
        _transferMouseData(event, nativeEvent) {
          event.isTrusted = nativeEvent.isTrusted;
          event.srcElement = nativeEvent.srcElement;
          event.timeStamp = performance.now();
          event.type = nativeEvent.type;
          event.altKey = nativeEvent.altKey;
          event.button = nativeEvent.button;
          event.buttons = nativeEvent.buttons;
          event.client.x = nativeEvent.clientX;
          event.client.y = nativeEvent.clientY;
          event.ctrlKey = nativeEvent.ctrlKey;
          event.metaKey = nativeEvent.metaKey;
          event.movement.x = nativeEvent.movementX;
          event.movement.y = nativeEvent.movementY;
          event.page.x = nativeEvent.pageX;
          event.page.y = nativeEvent.pageY;
          event.relatedTarget = null;
          event.shiftKey = nativeEvent.shiftKey;
        }
      };
      _EventSystem.extension = {
        name: "events",
        type: [
          ExtensionType.WebGLSystem,
          ExtensionType.CanvasSystem,
          ExtensionType.WebGPUSystem
        ],
        priority: -1
      };
      _EventSystem.defaultEventFeatures = {
        /** Enables pointer events associated with pointer movement. */
        move: true,
        /** Enables global pointer move events. */
        globalMove: true,
        /** Enables pointer events associated with clicking. */
        click: true,
        /** Enables wheel events. */
        wheel: true
      };
      EventSystem = _EventSystem;
    }
  });

  // node_modules/pixi.js/lib/events/FederatedEventTarget.mjs
  var FederatedContainer;
  var init_FederatedEventTarget = __esm({
    "node_modules/pixi.js/lib/events/FederatedEventTarget.mjs"() {
      init_EventSystem();
      init_FederatedEvent();
      FederatedContainer = {
        /**
         * Property-based event handler for the `click` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onclick = (event) => {
         *  //some function here that happens on click
         * }
         */
        onclick: null,
        /**
         * Property-based event handler for the `mousedown` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmousedown = (event) => {
         *  //some function here that happens on mousedown
         * }
         */
        onmousedown: null,
        /**
         * Property-based event handler for the `mouseenter` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmouseenter = (event) => {
         *  //some function here that happens on mouseenter
         * }
         */
        onmouseenter: null,
        /**
         * Property-based event handler for the `mouseleave` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmouseleave = (event) => {
         *  //some function here that happens on mouseleave
         * }
         */
        onmouseleave: null,
        /**
         * Property-based event handler for the `mousemove` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmousemove = (event) => {
         *  //some function here that happens on mousemove
         * }
         */
        onmousemove: null,
        /**
         * Property-based event handler for the `globalmousemove` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onglobalmousemove = (event) => {
         *  //some function here that happens on globalmousemove
         * }
         */
        onglobalmousemove: null,
        /**
         * Property-based event handler for the `mouseout` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmouseout = (event) => {
         *  //some function here that happens on mouseout
         * }
         */
        onmouseout: null,
        /**
         * Property-based event handler for the `mouseover` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmouseover = (event) => {
         *  //some function here that happens on mouseover
         * }
         */
        onmouseover: null,
        /**
         * Property-based event handler for the `mouseup` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmouseup = (event) => {
         *  //some function here that happens on mouseup
         * }
         */
        onmouseup: null,
        /**
         * Property-based event handler for the `mouseupoutside` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onmouseupoutside = (event) => {
         *  //some function here that happens on mouseupoutside
         * }
         */
        onmouseupoutside: null,
        /**
         * Property-based event handler for the `pointercancel` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointercancel = (event) => {
         *  //some function here that happens on pointercancel
         * }
         */
        onpointercancel: null,
        /**
         * Property-based event handler for the `pointerdown` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerdown = (event) => {
         *  //some function here that happens on pointerdown
         * }
         */
        onpointerdown: null,
        /**
         * Property-based event handler for the `pointerenter` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerenter = (event) => {
         *  //some function here that happens on pointerenter
         * }
         */
        onpointerenter: null,
        /**
         * Property-based event handler for the `pointerleave` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerleave = (event) => {
         *  //some function here that happens on pointerleave
         * }
         */
        onpointerleave: null,
        /**
         * Property-based event handler for the `pointermove` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointermove = (event) => {
         *  //some function here that happens on pointermove
         * }
         */
        onpointermove: null,
        /**
         * Property-based event handler for the `globalpointermove` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onglobalpointermove = (event) => {
         *  //some function here that happens on globalpointermove
         * }
         */
        onglobalpointermove: null,
        /**
         * Property-based event handler for the `pointerout` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerout = (event) => {
         *  //some function here that happens on pointerout
         * }
         */
        onpointerout: null,
        /**
         * Property-based event handler for the `pointerover` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerover = (event) => {
         *  //some function here that happens on pointerover
         * }
         */
        onpointerover: null,
        /**
         * Property-based event handler for the `pointertap` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointertap = (event) => {
         *  //some function here that happens on pointertap
         * }
         */
        onpointertap: null,
        /**
         * Property-based event handler for the `pointerup` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerup = (event) => {
         *  //some function here that happens on pointerup
         * }
         */
        onpointerup: null,
        /**
         * Property-based event handler for the `pointerupoutside` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onpointerupoutside = (event) => {
         *  //some function here that happens on pointerupoutside
         * }
         */
        onpointerupoutside: null,
        /**
         * Property-based event handler for the `rightclick` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onrightclick = (event) => {
         *  //some function here that happens on rightclick
         * }
         */
        onrightclick: null,
        /**
         * Property-based event handler for the `rightdown` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onrightdown = (event) => {
         *  //some function here that happens on rightdown
         * }
         */
        onrightdown: null,
        /**
         * Property-based event handler for the `rightup` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onrightup = (event) => {
         *  //some function here that happens on rightup
         * }
         */
        onrightup: null,
        /**
         * Property-based event handler for the `rightupoutside` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onrightupoutside = (event) => {
         *  //some function here that happens on rightupoutside
         * }
         */
        onrightupoutside: null,
        /**
         * Property-based event handler for the `tap` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.ontap = (event) => {
         *  //some function here that happens on tap
         * }
         */
        ontap: null,
        /**
         * Property-based event handler for the `touchcancel` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.ontouchcancel = (event) => {
         *  //some function here that happens on touchcancel
         * }
         */
        ontouchcancel: null,
        /**
         * Property-based event handler for the `touchend` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.ontouchend = (event) => {
         *  //some function here that happens on touchend
         * }
         */
        ontouchend: null,
        /**
         * Property-based event handler for the `touchendoutside` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.ontouchendoutside = (event) => {
         *  //some function here that happens on touchendoutside
         * }
         */
        ontouchendoutside: null,
        /**
         * Property-based event handler for the `touchmove` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.ontouchmove = (event) => {
         *  //some function here that happens on touchmove
         * }
         */
        ontouchmove: null,
        /**
         * Property-based event handler for the `globaltouchmove` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onglobaltouchmove = (event) => {
         *  //some function here that happens on globaltouchmove
         * }
         */
        onglobaltouchmove: null,
        /**
         * Property-based event handler for the `touchstart` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.ontouchstart = (event) => {
         *  //some function here that happens on touchstart
         * }
         */
        ontouchstart: null,
        /**
         * Property-based event handler for the `wheel` event.
         * @memberof scene.Container#
         * @default null
         * @example
         * this.onwheel = (event) => {
         *  //some function here that happens on wheel
         * }
         */
        onwheel: null,
        /**
         * Enable interaction events for the Container. Touch, pointer and mouse
         * @memberof scene.Container#
         */
        get interactive() {
          return this.eventMode === "dynamic" || this.eventMode === "static";
        },
        set interactive(value) {
          this.eventMode = value ? "static" : "passive";
        },
        /**
         * @ignore
         */
        _internalEventMode: void 0,
        /**
         * Enable interaction events for the Container. Touch, pointer and mouse.
         * There are 5 types of interaction settings:
         * - `'none'`: Ignores all interaction events, even on its children.
         * - `'passive'`: **(default)** Does not emit events and ignores all hit testing on itself and non-interactive children.
         * Interactive children will still emit events.
         * - `'auto'`: Does not emit events but is hit tested if parent is interactive. Same as `interactive = false` in v7
         * - `'static'`: Emit events and is hit tested. Same as `interaction = true` in v7
         * - `'dynamic'`: Emits events and is hit tested but will also receive mock interaction events fired from a ticker to
         * allow for interaction when the mouse isn't moving
         * @example
         * import { Sprite } from 'pixi.js';
         *
         * const sprite = new Sprite(texture);
         * sprite.eventMode = 'static';
         * sprite.on('tap', (event) => {
         *     // Handle event
         * });
         * @memberof scene.Container#
         * @since 7.2.0
         */
        get eventMode() {
          return this._internalEventMode ?? EventSystem.defaultEventMode;
        },
        set eventMode(value) {
          this._internalEventMode = value;
        },
        /**
         * Determines if the container is interactive or not
         * @returns {boolean} Whether the container is interactive or not
         * @memberof scene.Container#
         * @since 7.2.0
         * @example
         * import { Sprite } from 'pixi.js';
         *
         * const sprite = new Sprite(texture);
         * sprite.eventMode = 'static';
         * sprite.isInteractive(); // true
         *
         * sprite.eventMode = 'dynamic';
         * sprite.isInteractive(); // true
         *
         * sprite.eventMode = 'none';
         * sprite.isInteractive(); // false
         *
         * sprite.eventMode = 'passive';
         * sprite.isInteractive(); // false
         *
         * sprite.eventMode = 'auto';
         * sprite.isInteractive(); // false
         */
        isInteractive() {
          return this.eventMode === "static" || this.eventMode === "dynamic";
        },
        /**
         * Determines if the children to the container can be clicked/touched
         * Setting this to false allows PixiJS to bypass a recursive `hitTest` function
         * @memberof scene.Container#
         */
        interactiveChildren: true,
        /**
         * Interaction shape. Children will be hit first, then this shape will be checked.
         * Setting this will cause this shape to be checked in hit tests rather than the container's bounds.
         * @example
         * import { Rectangle, Sprite } from 'pixi.js';
         *
         * const sprite = new Sprite(texture);
         * sprite.interactive = true;
         * sprite.hitArea = new Rectangle(0, 0, 100, 100);
         * @member {IHitArea}
         * @memberof scene.Container#
         */
        hitArea: null,
        /**
         * Unlike `on` or `addListener` which are methods from EventEmitter, `addEventListener`
         * seeks to be compatible with the DOM's `addEventListener` with support for options.
         * @memberof scene.Container
         * @param type - The type of event to listen to.
         * @param listener - The listener callback or object.
         * @param options - Listener options, used for capture phase.
         * @example
         * // Tell the user whether they did a single, double, triple, or nth click.
         * button.addEventListener('click', {
         *     handleEvent(e): {
         *         let prefix;
         *
         *         switch (e.detail) {
         *             case 1: prefix = 'single'; break;
         *             case 2: prefix = 'double'; break;
         *             case 3: prefix = 'triple'; break;
         *             default: prefix = e.detail + 'th'; break;
         *         }
         *
         *         console.log('That was a ' + prefix + 'click');
         *     }
         * });
         *
         * // But skip the first click!
         * button.parent.addEventListener('click', function blockClickOnce(e) {
         *     e.stopImmediatePropagation();
         *     button.parent.removeEventListener('click', blockClickOnce, true);
         * }, {
         *     capture: true,
         * });
         */
        addEventListener(type, listener, options) {
          const capture = typeof options === "boolean" && options || typeof options === "object" && options.capture;
          const signal = typeof options === "object" ? options.signal : void 0;
          const once = typeof options === "object" ? options.once === true : false;
          const context2 = typeof listener === "function" ? void 0 : listener;
          type = capture ? `${type}capture` : type;
          const listenerFn = typeof listener === "function" ? listener : listener.handleEvent;
          const emitter = this;
          if (signal) {
            signal.addEventListener("abort", () => {
              emitter.off(type, listenerFn, context2);
            });
          }
          if (once) {
            emitter.once(type, listenerFn, context2);
          } else {
            emitter.on(type, listenerFn, context2);
          }
        },
        /**
         * Unlike `off` or `removeListener` which are methods from EventEmitter, `removeEventListener`
         * seeks to be compatible with the DOM's `removeEventListener` with support for options.
         * @memberof scene.Container
         * @param type - The type of event the listener is bound to.
         * @param listener - The listener callback or object.
         * @param options - The original listener options. This is required to deregister a capture phase listener.
         */
        removeEventListener(type, listener, options) {
          const capture = typeof options === "boolean" && options || typeof options === "object" && options.capture;
          const context2 = typeof listener === "function" ? void 0 : listener;
          type = capture ? `${type}capture` : type;
          listener = typeof listener === "function" ? listener : listener.handleEvent;
          this.off(type, listener, context2);
        },
        /**
         * Dispatch the event on this {@link Container} using the event's {@link EventBoundary}.
         *
         * The target of the event is set to `this` and the `defaultPrevented` flag is cleared before dispatch.
         * @memberof scene.Container
         * @param e - The event to dispatch.
         * @returns Whether the {@link FederatedEvent.preventDefault preventDefault}() method was not invoked.
         * @example
         * // Reuse a click event!
         * button.dispatchEvent(clickEvent);
         */
        dispatchEvent(e2) {
          if (!(e2 instanceof FederatedEvent)) {
            throw new Error("Container cannot propagate events outside of the Federated Events API");
          }
          e2.defaultPrevented = false;
          e2.path = null;
          e2.target = this;
          e2.manager.dispatchEvent(e2);
          return !e2.defaultPrevented;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/events/init.mjs
  var init_init3 = __esm({
    "node_modules/pixi.js/lib/events/init.mjs"() {
      init_Extensions();
      init_Container();
      init_EventSystem();
      init_FederatedEventTarget();
      extensions.add(EventSystem);
      Container.mixin(FederatedContainer);
    }
  });

  // node_modules/pixi.js/lib/assets/loader/parsers/LoaderParser.mjs
  var LoaderParserPriority;
  var init_LoaderParser = __esm({
    "node_modules/pixi.js/lib/assets/loader/parsers/LoaderParser.mjs"() {
      "use strict";
      LoaderParserPriority = /* @__PURE__ */ ((LoaderParserPriority2) => {
        LoaderParserPriority2[LoaderParserPriority2["Low"] = 0] = "Low";
        LoaderParserPriority2[LoaderParserPriority2["Normal"] = 1] = "Normal";
        LoaderParserPriority2[LoaderParserPriority2["High"] = 2] = "High";
        return LoaderParserPriority2;
      })(LoaderParserPriority || {});
    }
  });

  // node_modules/pixi.js/lib/environment-browser/BrowserAdapter.mjs
  var BrowserAdapter;
  var init_BrowserAdapter = __esm({
    "node_modules/pixi.js/lib/environment-browser/BrowserAdapter.mjs"() {
      "use strict";
      BrowserAdapter = {
        createCanvas: (width, height) => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          return canvas;
        },
        getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
        getWebGLRenderingContext: () => WebGLRenderingContext,
        getNavigator: () => navigator,
        getBaseUrl: () => document.baseURI ?? window.location.href,
        getFontFaceSet: () => document.fonts,
        fetch: (url, options) => fetch(url, options),
        parseXML: (xml) => {
          const parser = new DOMParser();
          return parser.parseFromString(xml, "text/xml");
        }
      };
    }
  });

  // node_modules/pixi.js/lib/environment/adapter.mjs
  var currentAdapter, DOMAdapter;
  var init_adapter = __esm({
    "node_modules/pixi.js/lib/environment/adapter.mjs"() {
      init_BrowserAdapter();
      currentAdapter = BrowserAdapter;
      DOMAdapter = {
        /**
         * Returns the current adapter.
         * @returns {environment.Adapter} The current adapter.
         */
        get() {
          return currentAdapter;
        },
        /**
         * Sets the current adapter.
         * @param adapter - The new adapter.
         */
        set(adapter) {
          currentAdapter = adapter;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/utils/path.mjs
  function assertPath(path2) {
    if (typeof path2 !== "string") {
      throw new TypeError(`Path must be a string. Received ${JSON.stringify(path2)}`);
    }
  }
  function removeUrlParams(url) {
    const re = url.split("?")[0];
    return re.split("#")[0];
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
  }
  function normalizeStringPosix(path2, allowAboveRoot) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = -1;
    for (let i2 = 0; i2 <= path2.length; ++i2) {
      if (i2 < path2.length) {
        code = path2.charCodeAt(i2);
      } else if (code === 47) {
        break;
      } else {
        code = 47;
      }
      if (code === 47) {
        if (lastSlash === i2 - 1 || dots === 1) {
        } else if (lastSlash !== i2 - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i2;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i2;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0) {
              res += "/..";
            } else {
              res = "..";
            }
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) {
            res += `/${path2.slice(lastSlash + 1, i2)}`;
          } else {
            res = path2.slice(lastSlash + 1, i2);
          }
          lastSegmentLength = i2 - lastSlash - 1;
        }
        lastSlash = i2;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  var path;
  var init_path = __esm({
    "node_modules/pixi.js/lib/utils/path.mjs"() {
      init_adapter();
      path = {
        /**
         * Converts a path to posix format.
         * @param path - The path to convert to posix
         */
        toPosix(path2) {
          return replaceAll(path2, "\\", "/");
        },
        /**
         * Checks if the path is a URL e.g. http://, https://
         * @param path - The path to check
         */
        isUrl(path2) {
          return /^https?:/.test(this.toPosix(path2));
        },
        /**
         * Checks if the path is a data URL
         * @param path - The path to check
         */
        isDataUrl(path2) {
          return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(path2);
        },
        /**
         * Checks if the path is a blob URL
         * @param path - The path to check
         */
        isBlobUrl(path2) {
          return path2.startsWith("blob:");
        },
        /**
         * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
         * This will return true for windows file paths
         * @param path - The path to check
         */
        hasProtocol(path2) {
          return /^[^/:]+:/.test(this.toPosix(path2));
        },
        /**
         * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
         * @param path - The path to get the protocol from
         */
        getProtocol(path2) {
          assertPath(path2);
          path2 = this.toPosix(path2);
          const matchFile = /^file:\/\/\//.exec(path2);
          if (matchFile) {
            return matchFile[0];
          }
          const matchProtocol = /^[^/:]+:\/{0,2}/.exec(path2);
          if (matchProtocol) {
            return matchProtocol[0];
          }
          return "";
        },
        /**
         * Converts URL to an absolute path.
         * When loading from a Web Worker, we must use absolute paths.
         * If the URL is already absolute we return it as is
         * If it's not, we convert it
         * @param url - The URL to test
         * @param customBaseUrl - The base URL to use
         * @param customRootUrl - The root URL to use
         */
        toAbsolute(url, customBaseUrl, customRootUrl) {
          assertPath(url);
          if (this.isDataUrl(url) || this.isBlobUrl(url))
            return url;
          const baseUrl = removeUrlParams(this.toPosix(customBaseUrl ?? DOMAdapter.get().getBaseUrl()));
          const rootUrl = removeUrlParams(this.toPosix(customRootUrl ?? this.rootname(baseUrl)));
          url = this.toPosix(url);
          if (url.startsWith("/")) {
            return path.join(rootUrl, url.slice(1));
          }
          const absolutePath = this.isAbsolute(url) ? url : this.join(baseUrl, url);
          return absolutePath;
        },
        /**
         * Normalizes the given path, resolving '..' and '.' segments
         * @param path - The path to normalize
         */
        normalize(path2) {
          assertPath(path2);
          if (path2.length === 0)
            return ".";
          if (this.isDataUrl(path2) || this.isBlobUrl(path2))
            return path2;
          path2 = this.toPosix(path2);
          let protocol = "";
          const isAbsolute = path2.startsWith("/");
          if (this.hasProtocol(path2)) {
            protocol = this.rootname(path2);
            path2 = path2.slice(protocol.length);
          }
          const trailingSeparator = path2.endsWith("/");
          path2 = normalizeStringPosix(path2, false);
          if (path2.length > 0 && trailingSeparator)
            path2 += "/";
          if (isAbsolute)
            return `/${path2}`;
          return protocol + path2;
        },
        /**
         * Determines if path is an absolute path.
         * Absolute paths can be urls, data urls, or paths on disk
         * @param path - The path to test
         */
        isAbsolute(path2) {
          assertPath(path2);
          path2 = this.toPosix(path2);
          if (this.hasProtocol(path2))
            return true;
          return path2.startsWith("/");
        },
        /**
         * Joins all given path segments together using the platform-specific separator as a delimiter,
         * then normalizes the resulting path
         * @param segments - The segments of the path to join
         */
        join(...segments) {
          if (segments.length === 0) {
            return ".";
          }
          let joined;
          for (let i2 = 0; i2 < segments.length; ++i2) {
            const arg = segments[i2];
            assertPath(arg);
            if (arg.length > 0) {
              if (joined === void 0)
                joined = arg;
              else {
                const prevArg = segments[i2 - 1] ?? "";
                if (this.joinExtensions.includes(this.extname(prevArg).toLowerCase())) {
                  joined += `/../${arg}`;
                } else {
                  joined += `/${arg}`;
                }
              }
            }
          }
          if (joined === void 0) {
            return ".";
          }
          return this.normalize(joined);
        },
        /**
         * Returns the directory name of a path
         * @param path - The path to parse
         */
        dirname(path2) {
          assertPath(path2);
          if (path2.length === 0)
            return ".";
          path2 = this.toPosix(path2);
          let code = path2.charCodeAt(0);
          const hasRoot = code === 47;
          let end = -1;
          let matchedSlash = true;
          const proto = this.getProtocol(path2);
          const origpath = path2;
          path2 = path2.slice(proto.length);
          for (let i2 = path2.length - 1; i2 >= 1; --i2) {
            code = path2.charCodeAt(i2);
            if (code === 47) {
              if (!matchedSlash) {
                end = i2;
                break;
              }
            } else {
              matchedSlash = false;
            }
          }
          if (end === -1)
            return hasRoot ? "/" : this.isUrl(origpath) ? proto + path2 : proto;
          if (hasRoot && end === 1)
            return "//";
          return proto + path2.slice(0, end);
        },
        /**
         * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
         * @param path - The path to parse
         */
        rootname(path2) {
          assertPath(path2);
          path2 = this.toPosix(path2);
          let root = "";
          if (path2.startsWith("/"))
            root = "/";
          else {
            root = this.getProtocol(path2);
          }
          if (this.isUrl(path2)) {
            const index = path2.indexOf("/", root.length);
            if (index !== -1) {
              root = path2.slice(0, index);
            } else
              root = path2;
            if (!root.endsWith("/"))
              root += "/";
          }
          return root;
        },
        /**
         * Returns the last portion of a path
         * @param path - The path to test
         * @param ext - Optional extension to remove
         */
        basename(path2, ext) {
          assertPath(path2);
          if (ext)
            assertPath(ext);
          path2 = removeUrlParams(this.toPosix(path2));
          let start = 0;
          let end = -1;
          let matchedSlash = true;
          let i2;
          if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
            if (ext.length === path2.length && ext === path2)
              return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i2 = path2.length - 1; i2 >= 0; --i2) {
              const code = path2.charCodeAt(i2);
              if (code === 47) {
                if (!matchedSlash) {
                  start = i2 + 1;
                  break;
                }
              } else {
                if (firstNonSlashEnd === -1) {
                  matchedSlash = false;
                  firstNonSlashEnd = i2 + 1;
                }
                if (extIdx >= 0) {
                  if (code === ext.charCodeAt(extIdx)) {
                    if (--extIdx === -1) {
                      end = i2;
                    }
                  } else {
                    extIdx = -1;
                    end = firstNonSlashEnd;
                  }
                }
              }
            }
            if (start === end)
              end = firstNonSlashEnd;
            else if (end === -1)
              end = path2.length;
            return path2.slice(start, end);
          }
          for (i2 = path2.length - 1; i2 >= 0; --i2) {
            if (path2.charCodeAt(i2) === 47) {
              if (!matchedSlash) {
                start = i2 + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i2 + 1;
            }
          }
          if (end === -1)
            return "";
          return path2.slice(start, end);
        },
        /**
         * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
         * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
         * the first character of the basename of path, an empty string is returned.
         * @param path - The path to parse
         */
        extname(path2) {
          assertPath(path2);
          path2 = removeUrlParams(this.toPosix(path2));
          let startDot = -1;
          let startPart = 0;
          let end = -1;
          let matchedSlash = true;
          let preDotState = 0;
          for (let i2 = path2.length - 1; i2 >= 0; --i2) {
            const code = path2.charCodeAt(i2);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i2 + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i2 + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i2;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return "";
          }
          return path2.slice(startDot, end);
        },
        /**
         * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
         * @param path - The path to parse
         */
        parse(path2) {
          assertPath(path2);
          const ret = { root: "", dir: "", base: "", ext: "", name: "" };
          if (path2.length === 0)
            return ret;
          path2 = removeUrlParams(this.toPosix(path2));
          let code = path2.charCodeAt(0);
          const isAbsolute = this.isAbsolute(path2);
          let start;
          const protocol = "";
          ret.root = this.rootname(path2);
          if (isAbsolute || this.hasProtocol(path2)) {
            start = 1;
          } else {
            start = 0;
          }
          let startDot = -1;
          let startPart = 0;
          let end = -1;
          let matchedSlash = true;
          let i2 = path2.length - 1;
          let preDotState = 0;
          for (; i2 >= start; --i2) {
            code = path2.charCodeAt(i2);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i2 + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i2 + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i2;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
              if (startPart === 0 && isAbsolute)
                ret.base = ret.name = path2.slice(1, end);
              else
                ret.base = ret.name = path2.slice(startPart, end);
            }
          } else {
            if (startPart === 0 && isAbsolute) {
              ret.name = path2.slice(1, startDot);
              ret.base = path2.slice(1, end);
            } else {
              ret.name = path2.slice(startPart, startDot);
              ret.base = path2.slice(startPart, end);
            }
            ret.ext = path2.slice(startDot, end);
          }
          ret.dir = this.dirname(path2);
          if (protocol)
            ret.dir = protocol + ret.dir;
          return ret;
        },
        sep: "/",
        delimiter: ":",
        joinExtensions: [".html"]
      };
    }
  });

  // node_modules/pixi.js/lib/assets/utils/convertToList.mjs
  var convertToList;
  var init_convertToList = __esm({
    "node_modules/pixi.js/lib/assets/utils/convertToList.mjs"() {
      "use strict";
      convertToList = (input, transform2, forceTransform = false) => {
        if (!Array.isArray(input)) {
          input = [input];
        }
        if (!transform2) {
          return input;
        }
        return input.map((item) => {
          if (typeof item === "string" || forceTransform) {
            return transform2(item);
          }
          return item;
        });
      };
    }
  });

  // node_modules/pixi.js/lib/assets/utils/createStringVariations.mjs
  function processX(base, ids, depth, result, tags) {
    const id = ids[depth];
    for (let i2 = 0; i2 < id.length; i2++) {
      const value = id[i2];
      if (depth < ids.length - 1) {
        processX(base.replace(result[depth], value), ids, depth + 1, result, tags);
      } else {
        tags.push(base.replace(result[depth], value));
      }
    }
  }
  function createStringVariations(string) {
    const regex = /\{(.*?)\}/g;
    const result = string.match(regex);
    const tags = [];
    if (result) {
      const ids = [];
      result.forEach((vars) => {
        const split = vars.substring(1, vars.length - 1).split(",");
        ids.push(split);
      });
      processX(string, ids, 0, result, tags);
    } else {
      tags.push(string);
    }
    return tags;
  }
  var init_createStringVariations = __esm({
    "node_modules/pixi.js/lib/assets/utils/createStringVariations.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/assets/utils/isSingleItem.mjs
  var isSingleItem;
  var init_isSingleItem = __esm({
    "node_modules/pixi.js/lib/assets/utils/isSingleItem.mjs"() {
      "use strict";
      isSingleItem = (item) => !Array.isArray(item);
    }
  });

  // node_modules/pixi.js/lib/assets/resolver/Resolver.mjs
  function getUrlExtension(url) {
    return url.split(".").pop().split("?").shift().split("#").shift();
  }
  var Resolver;
  var init_Resolver = __esm({
    "node_modules/pixi.js/lib/assets/resolver/Resolver.mjs"() {
      init_warn();
      init_path();
      init_convertToList();
      init_createStringVariations();
      init_isSingleItem();
      Resolver = class {
        constructor() {
          this._defaultBundleIdentifierOptions = {
            connector: "-",
            createBundleAssetId: (bundleId, assetId) => `${bundleId}${this._bundleIdConnector}${assetId}`,
            extractAssetIdFromBundle: (bundleId, assetBundleId) => assetBundleId.replace(`${bundleId}${this._bundleIdConnector}`, "")
          };
          this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector;
          this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId;
          this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle;
          this._assetMap = {};
          this._preferredOrder = [];
          this._parsers = [];
          this._resolverHash = {};
          this._bundles = {};
        }
        /**
         * Override how the resolver deals with generating bundle ids.
         * must be called before any bundles are added
         * @param bundleIdentifier - the bundle identifier options
         */
        setBundleIdentifier(bundleIdentifier) {
          this._bundleIdConnector = bundleIdentifier.connector ?? this._bundleIdConnector;
          this._createBundleAssetId = bundleIdentifier.createBundleAssetId ?? this._createBundleAssetId;
          this._extractAssetIdFromBundle = bundleIdentifier.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle;
          if (this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar") {
            throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
          }
        }
        /**
         * Let the resolver know which assets you prefer to use when resolving assets.
         * Multiple prefer user defined rules can be added.
         * @example
         * resolver.prefer({
         *     // first look for something with the correct format, and then then correct resolution
         *     priority: ['format', 'resolution'],
         *     params:{
         *         format:'webp', // prefer webp images
         *         resolution: 2, // prefer a resolution of 2
         *     }
         * })
         * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
         * resolver.resolveUrl('foo') // => 'bar@2x.webp'
         * @param preferOrders - the prefer options
         */
        prefer(...preferOrders) {
          preferOrders.forEach((prefer) => {
            this._preferredOrder.push(prefer);
            if (!prefer.priority) {
              prefer.priority = Object.keys(prefer.params);
            }
          });
          this._resolverHash = {};
        }
        /**
         * Set the base path to prepend to all urls when resolving
         * @example
         * resolver.basePath = 'https://home.com/';
         * resolver.add('foo', 'bar.ong');
         * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
         * @param basePath - the base path to use
         */
        set basePath(basePath) {
          this._basePath = basePath;
        }
        get basePath() {
          return this._basePath;
        }
        /**
         * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
         * default value for browsers is `window.location.origin`
         * @example
         * // Application hosted on https://home.com/some-path/index.html
         * resolver.basePath = 'https://home.com/some-path/';
         * resolver.rootPath = 'https://home.com/';
         * resolver.add('foo', '/bar.png');
         * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
         * @param rootPath - the root path to use
         */
        set rootPath(rootPath) {
          this._rootPath = rootPath;
        }
        get rootPath() {
          return this._rootPath;
        }
        /**
         * All the active URL parsers that help the parser to extract information and create
         * an asset object-based on parsing the URL itself.
         *
         * Can be added using the extensions API
         * @example
         * resolver.add('foo', [
         *     {
         *         resolution: 2,
         *         format: 'png',
         *         src: 'image@2x.png',
         *     },
         *     {
         *         resolution:1,
         *         format:'png',
         *         src: 'image.png',
         *     },
         * ]);
         *
         * // With a url parser the information such as resolution and file format could extracted from the url itself:
         * extensions.add({
         *     extension: ExtensionType.ResolveParser,
         *     test: loadTextures.test, // test if url ends in an image
         *     parse: (value: string) =>
         *     ({
         *         resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
         *         format: value.split('.').pop(),
         *         src: value,
         *     }),
         * });
         *
         * // Now resolution and format can be extracted from the url
         * resolver.add('foo', [
         *     'image@2x.png',
         *     'image.png',
         * ]);
         */
        get parsers() {
          return this._parsers;
        }
        /** Used for testing, this resets the resolver to its initial state */
        reset() {
          this.setBundleIdentifier(this._defaultBundleIdentifierOptions);
          this._assetMap = {};
          this._preferredOrder = [];
          this._resolverHash = {};
          this._rootPath = null;
          this._basePath = null;
          this._manifest = null;
          this._bundles = {};
          this._defaultSearchParams = null;
        }
        /**
         * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
         * @param searchParams - the default url parameters to append when resolving urls
         */
        setDefaultSearchParams(searchParams) {
          if (typeof searchParams === "string") {
            this._defaultSearchParams = searchParams;
          } else {
            const queryValues = searchParams;
            this._defaultSearchParams = Object.keys(queryValues).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryValues[key])}`).join("&");
          }
        }
        /**
         * Returns the aliases for a given asset
         * @param asset - the asset to get the aliases for
         */
        getAlias(asset) {
          const { alias, src } = asset;
          const aliasesToUse = convertToList(
            alias || src,
            (value) => {
              if (typeof value === "string")
                return value;
              if (Array.isArray(value))
                return value.map((v2) => v2?.src ?? v2);
              if (value?.src)
                return value.src;
              return value;
            },
            true
          );
          return aliasesToUse;
        }
        /**
         * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
         * generally a manifest would be built using a tool.
         * @param manifest - the manifest to add to the resolver
         */
        addManifest(manifest) {
          if (this._manifest) {
            warn("[Resolver] Manifest already exists, this will be overwritten");
          }
          this._manifest = manifest;
          manifest.bundles.forEach((bundle) => {
            this.addBundle(bundle.name, bundle.assets);
          });
        }
        /**
         * This adds a bundle of assets in one go so that you can resolve them as a group.
         * For example you could add a bundle for each screen in you pixi app
         * @example
         * resolver.addBundle('animals', [
         *  { alias: 'bunny', src: 'bunny.png' },
         *  { alias: 'chicken', src: 'chicken.png' },
         *  { alias: 'thumper', src: 'thumper.png' },
         * ]);
         * // or
         * resolver.addBundle('animals', {
         *     bunny: 'bunny.png',
         *     chicken: 'chicken.png',
         *     thumper: 'thumper.png',
         * });
         *
         * const resolvedAssets = await resolver.resolveBundle('animals');
         * @param bundleId - The id of the bundle to add
         * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
         */
        addBundle(bundleId, assets) {
          const assetNames = [];
          let convertedAssets = assets;
          if (!Array.isArray(assets)) {
            convertedAssets = Object.entries(assets).map(([alias, src]) => {
              if (typeof src === "string" || Array.isArray(src)) {
                return { alias, src };
              }
              return { alias, ...src };
            });
          }
          convertedAssets.forEach((asset) => {
            const srcs = asset.src;
            const aliases = asset.alias;
            let ids;
            if (typeof aliases === "string") {
              const bundleAssetId = this._createBundleAssetId(bundleId, aliases);
              assetNames.push(bundleAssetId);
              ids = [aliases, bundleAssetId];
            } else {
              const bundleIds = aliases.map((name) => this._createBundleAssetId(bundleId, name));
              assetNames.push(...bundleIds);
              ids = [...aliases, ...bundleIds];
            }
            this.add({
              ...asset,
              ...{
                alias: ids,
                src: srcs
              }
            });
          });
          this._bundles[bundleId] = assetNames;
        }
        /**
         * Tells the resolver what keys are associated with witch asset.
         * The most important thing the resolver does
         * @example
         * // Single key, single asset:
         * resolver.add({alias: 'foo', src: 'bar.png');
         * resolver.resolveUrl('foo') // => 'bar.png'
         *
         * // Multiple keys, single asset:
         * resolver.add({alias: ['foo', 'boo'], src: 'bar.png'});
         * resolver.resolveUrl('foo') // => 'bar.png'
         * resolver.resolveUrl('boo') // => 'bar.png'
         *
         * // Multiple keys, multiple assets:
         * resolver.add({alias: ['foo', 'boo'], src: ['bar.png', 'bar.webp']});
         * resolver.resolveUrl('foo') // => 'bar.png'
         *
         * // Add custom data attached to the resolver
         * Resolver.add({
         *     alias: 'bunnyBooBooSmooth',
         *     src: 'bunny{png,webp}',
         *     data: { scaleMode:SCALE_MODES.NEAREST }, // Base texture options
         * });
         *
         * resolver.resolve('bunnyBooBooSmooth') // => { src: 'bunny.png', data: { scaleMode: SCALE_MODES.NEAREST } }
         * @param aliases - the UnresolvedAsset or array of UnresolvedAssets to add to the resolver
         */
        add(aliases) {
          const assets = [];
          if (Array.isArray(aliases)) {
            assets.push(...aliases);
          } else {
            assets.push(aliases);
          }
          let keyCheck;
          keyCheck = (key) => {
            if (this.hasKey(key)) {
              warn(`[Resolver] already has key: ${key} overwriting`);
            }
          };
          const assetArray = convertToList(assets);
          assetArray.forEach((asset) => {
            const { src } = asset;
            let { data, format, loadParser } = asset;
            const srcsToUse = convertToList(src).map((src2) => {
              if (typeof src2 === "string") {
                return createStringVariations(src2);
              }
              return Array.isArray(src2) ? src2 : [src2];
            });
            const aliasesToUse = this.getAlias(asset);
            Array.isArray(aliasesToUse) ? aliasesToUse.forEach(keyCheck) : keyCheck(aliasesToUse);
            const resolvedAssets = [];
            srcsToUse.forEach((srcs) => {
              srcs.forEach((src2) => {
                let formattedAsset = {};
                if (typeof src2 !== "object") {
                  formattedAsset.src = src2;
                  for (let i2 = 0; i2 < this._parsers.length; i2++) {
                    const parser = this._parsers[i2];
                    if (parser.test(src2)) {
                      formattedAsset = parser.parse(src2);
                      break;
                    }
                  }
                } else {
                  data = src2.data ?? data;
                  format = src2.format ?? format;
                  loadParser = src2.loadParser ?? loadParser;
                  formattedAsset = {
                    ...formattedAsset,
                    ...src2
                  };
                }
                if (!aliasesToUse) {
                  throw new Error(`[Resolver] alias is undefined for this asset: ${formattedAsset.src}`);
                }
                formattedAsset = this._buildResolvedAsset(formattedAsset, {
                  aliases: aliasesToUse,
                  data,
                  format,
                  loadParser
                });
                resolvedAssets.push(formattedAsset);
              });
            });
            aliasesToUse.forEach((alias) => {
              this._assetMap[alias] = resolvedAssets;
            });
          });
        }
        // TODO: this needs an overload like load did in Assets
        /**
         * If the resolver has had a manifest set via setManifest, this will return the assets urls for
         * a given bundleId or bundleIds.
         * @example
         * // Manifest Example
         * const manifest = {
         *     bundles: [
         *         {
         *             name: 'load-screen',
         *             assets: [
         *                 {
         *                     alias: 'background',
         *                     src: 'sunset.png',
         *                 },
         *                 {
         *                     alias: 'bar',
         *                     src: 'load-bar.{png,webp}',
         *                 },
         *             ],
         *         },
         *         {
         *             name: 'game-screen',
         *             assets: [
         *                 {
         *                     alias: 'character',
         *                     src: 'robot.png',
         *                 },
         *                 {
         *                     alias: 'enemy',
         *                     src: 'bad-guy.png',
         *                 },
         *             ],
         *         },
         *     ]
         * };
         *
         * resolver.setManifest(manifest);
         * const resolved = resolver.resolveBundle('load-screen');
         * @param bundleIds - The bundle ids to resolve
         * @returns All the bundles assets or a hash of assets for each bundle specified
         */
        resolveBundle(bundleIds) {
          const singleAsset = isSingleItem(bundleIds);
          bundleIds = convertToList(bundleIds);
          const out2 = {};
          bundleIds.forEach((bundleId) => {
            const assetNames = this._bundles[bundleId];
            if (assetNames) {
              const results = this.resolve(assetNames);
              const assets = {};
              for (const key in results) {
                const asset = results[key];
                assets[this._extractAssetIdFromBundle(bundleId, key)] = asset;
              }
              out2[bundleId] = assets;
            }
          });
          return singleAsset ? out2[bundleIds[0]] : out2;
        }
        /**
         * Does exactly what resolve does, but returns just the URL rather than the whole asset object
         * @param key - The key or keys to resolve
         * @returns - The URLs associated with the key(s)
         */
        resolveUrl(key) {
          const result = this.resolve(key);
          if (typeof key !== "string") {
            const out2 = {};
            for (const i2 in result) {
              out2[i2] = result[i2].src;
            }
            return out2;
          }
          return result.src;
        }
        resolve(keys) {
          const singleAsset = isSingleItem(keys);
          keys = convertToList(keys);
          const result = {};
          keys.forEach((key) => {
            if (!this._resolverHash[key]) {
              if (this._assetMap[key]) {
                let assets = this._assetMap[key];
                const preferredOrder = this._getPreferredOrder(assets);
                preferredOrder?.priority.forEach((priorityKey) => {
                  preferredOrder.params[priorityKey].forEach((value) => {
                    const filteredAssets = assets.filter((asset) => {
                      if (asset[priorityKey]) {
                        return asset[priorityKey] === value;
                      }
                      return false;
                    });
                    if (filteredAssets.length) {
                      assets = filteredAssets;
                    }
                  });
                });
                this._resolverHash[key] = assets[0];
              } else {
                this._resolverHash[key] = this._buildResolvedAsset({
                  alias: [key],
                  src: key
                }, {});
              }
            }
            result[key] = this._resolverHash[key];
          });
          return singleAsset ? result[keys[0]] : result;
        }
        /**
         * Checks if an asset with a given key exists in the resolver
         * @param key - The key of the asset
         */
        hasKey(key) {
          return !!this._assetMap[key];
        }
        /**
         * Checks if a bundle with the given key exists in the resolver
         * @param key - The key of the bundle
         */
        hasBundle(key) {
          return !!this._bundles[key];
        }
        /**
         * Internal function for figuring out what prefer criteria an asset should use.
         * @param assets
         */
        _getPreferredOrder(assets) {
          for (let i2 = 0; i2 < assets.length; i2++) {
            const asset = assets[0];
            const preferred = this._preferredOrder.find((preference) => preference.params.format.includes(asset.format));
            if (preferred) {
              return preferred;
            }
          }
          return this._preferredOrder[0];
        }
        /**
         * Appends the default url parameters to the url
         * @param url - The url to append the default parameters to
         * @returns - The url with the default parameters appended
         */
        _appendDefaultSearchParams(url) {
          if (!this._defaultSearchParams)
            return url;
          const paramConnector = /\?/.test(url) ? "&" : "?";
          return `${url}${paramConnector}${this._defaultSearchParams}`;
        }
        _buildResolvedAsset(formattedAsset, data) {
          const { aliases, data: assetData, loadParser, format } = data;
          if (this._basePath || this._rootPath) {
            formattedAsset.src = path.toAbsolute(formattedAsset.src, this._basePath, this._rootPath);
          }
          formattedAsset.alias = aliases ?? formattedAsset.alias ?? [formattedAsset.src];
          formattedAsset.src = this._appendDefaultSearchParams(formattedAsset.src);
          formattedAsset.data = { ...assetData || {}, ...formattedAsset.data };
          formattedAsset.loadParser = loadParser ?? formattedAsset.loadParser;
          formattedAsset.format = format ?? formattedAsset.format ?? getUrlExtension(formattedAsset.src);
          return formattedAsset;
        }
      };
      Resolver.RETINA_PREFIX = /@([0-9\.]+)x/;
    }
  });

  // node_modules/pixi.js/lib/assets/utils/copySearchParams.mjs
  var copySearchParams;
  var init_copySearchParams = __esm({
    "node_modules/pixi.js/lib/assets/utils/copySearchParams.mjs"() {
      "use strict";
      copySearchParams = (targetUrl, sourceUrl) => {
        const searchParams = sourceUrl.split("?")[1];
        if (searchParams) {
          targetUrl += `?${searchParams}`;
        }
        return targetUrl;
      };
    }
  });

  // node_modules/pixi.js/lib/maths/matrix/groupD8.mjs
  function init() {
    for (let i2 = 0; i2 < 16; i2++) {
      const row = [];
      rotationCayley.push(row);
      for (let j2 = 0; j2 < 16; j2++) {
        const _ux = signum(ux[i2] * ux[j2] + vx[i2] * uy[j2]);
        const _uy = signum(uy[i2] * ux[j2] + vy[i2] * uy[j2]);
        const _vx = signum(ux[i2] * vx[j2] + vx[i2] * vy[j2]);
        const _vy = signum(uy[i2] * vx[j2] + vy[i2] * vy[j2]);
        for (let k2 = 0; k2 < 16; k2++) {
          if (ux[k2] === _ux && uy[k2] === _uy && vx[k2] === _vx && vy[k2] === _vy) {
            row.push(k2);
            break;
          }
        }
      }
    }
    for (let i2 = 0; i2 < 16; i2++) {
      const mat = new Matrix();
      mat.set(ux[i2], uy[i2], vx[i2], vy[i2], 0, 0);
      rotationMatrices.push(mat);
    }
  }
  var ux, uy, vx, vy, rotationCayley, rotationMatrices, signum, groupD8;
  var init_groupD8 = __esm({
    "node_modules/pixi.js/lib/maths/matrix/groupD8.mjs"() {
      init_Matrix();
      ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
      uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
      vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
      vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
      rotationCayley = [];
      rotationMatrices = [];
      signum = Math.sign;
      init();
      groupD8 = {
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 0°       | East      |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        E: 0,
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 45°↻     | Southeast |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        SE: 1,
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 90°↻     | South     |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        S: 2,
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 135°↻    | Southwest |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        SW: 3,
        /**
         * | Rotation | Direction |
         * |----------|-----------|
         * | 180°     | West      |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        W: 4,
        /**
         * | Rotation    | Direction    |
         * |-------------|--------------|
         * | -135°/225°↻ | Northwest    |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        NW: 5,
        /**
         * | Rotation    | Direction    |
         * |-------------|--------------|
         * | -90°/270°↻  | North        |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        N: 6,
        /**
         * | Rotation    | Direction    |
         * |-------------|--------------|
         * | -45°/315°↻  | Northeast    |
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        NE: 7,
        /**
         * Reflection about Y-axis.
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        MIRROR_VERTICAL: 8,
        /**
         * Reflection about the main diagonal.
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        MAIN_DIAGONAL: 10,
        /**
         * Reflection about X-axis.
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        MIRROR_HORIZONTAL: 12,
        /**
         * Reflection about reverse diagonal.
         * @memberof maths.groupD8
         * @constant {GD8Symmetry}
         */
        REVERSE_DIAGONAL: 14,
        /**
         * @memberof maths.groupD8
         * @param {GD8Symmetry} ind - sprite rotation angle.
         * @returns {GD8Symmetry} The X-component of the U-axis
         *    after rotating the axes.
         */
        uX: (ind) => ux[ind],
        /**
         * @memberof maths.groupD8
         * @param {GD8Symmetry} ind - sprite rotation angle.
         * @returns {GD8Symmetry} The Y-component of the U-axis
         *    after rotating the axes.
         */
        uY: (ind) => uy[ind],
        /**
         * @memberof maths.groupD8
         * @param {GD8Symmetry} ind - sprite rotation angle.
         * @returns {GD8Symmetry} The X-component of the V-axis
         *    after rotating the axes.
         */
        vX: (ind) => vx[ind],
        /**
         * @memberof maths.groupD8
         * @param {GD8Symmetry} ind - sprite rotation angle.
         * @returns {GD8Symmetry} The Y-component of the V-axis
         *    after rotating the axes.
         */
        vY: (ind) => vy[ind],
        /**
         * @memberof maths.groupD8
         * @param {GD8Symmetry} rotation - symmetry whose opposite
         *   is needed. Only rotations have opposite symmetries while
         *   reflections don't.
         * @returns {GD8Symmetry} The opposite symmetry of `rotation`
         */
        inv: (rotation) => {
          if (rotation & 8) {
            return rotation & 15;
          }
          return -rotation & 7;
        },
        /**
         * Composes the two D8 operations.
         *
         * Taking `^` as reflection:
         *
         * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
         * |-------|-----|-----|-----|-----|------|-------|-------|-------|
         * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
         * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
         * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
         * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
         * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
         * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
         * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
         * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
         *
         * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
         * @memberof maths.groupD8
         * @param {GD8Symmetry} rotationSecond - Second operation, which
         *   is the row in the above cayley table.
         * @param {GD8Symmetry} rotationFirst - First operation, which
         *   is the column in the above cayley table.
         * @returns {GD8Symmetry} Composed operation
         */
        add: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][rotationFirst],
        /**
         * Reverse of `add`.
         * @memberof maths.groupD8
         * @param {GD8Symmetry} rotationSecond - Second operation
         * @param {GD8Symmetry} rotationFirst - First operation
         * @returns {GD8Symmetry} Result
         */
        sub: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][groupD8.inv(rotationFirst)],
        /**
         * Adds 180 degrees to rotation, which is a commutative
         * operation.
         * @memberof maths.groupD8
         * @param {number} rotation - The number to rotate.
         * @returns {number} Rotated number
         */
        rotate180: (rotation) => rotation ^ 4,
        /**
         * Checks if the rotation angle is vertical, i.e. south
         * or north. It doesn't work for reflections.
         * @memberof maths.groupD8
         * @param {GD8Symmetry} rotation - The number to check.
         * @returns {boolean} Whether or not the direction is vertical
         */
        isVertical: (rotation) => (rotation & 3) === 2,
        // rotation % 4 === 2
        /**
         * Approximates the vector `V(dx,dy)` into one of the
         * eight directions provided by `groupD8`.
         * @memberof maths.groupD8
         * @param {number} dx - X-component of the vector
         * @param {number} dy - Y-component of the vector
         * @returns {GD8Symmetry} Approximation of the vector into
         *  one of the eight symmetries.
         */
        byDirection: (dx, dy) => {
          if (Math.abs(dx) * 2 <= Math.abs(dy)) {
            if (dy >= 0) {
              return groupD8.S;
            }
            return groupD8.N;
          } else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
            if (dx > 0) {
              return groupD8.E;
            }
            return groupD8.W;
          } else if (dy > 0) {
            if (dx > 0) {
              return groupD8.SE;
            }
            return groupD8.SW;
          } else if (dx > 0) {
            return groupD8.NE;
          }
          return groupD8.NW;
        },
        /**
         * Helps sprite to compensate texture packer rotation.
         * @memberof maths.groupD8
         * @param {Matrix} matrix - sprite world matrix
         * @param {GD8Symmetry} rotation - The rotation factor to use.
         * @param {number} tx - sprite anchoring
         * @param {number} ty - sprite anchoring
         */
        matrixAppendRotationInv: (matrix, rotation, tx = 0, ty = 0) => {
          const mat = rotationMatrices[groupD8.inv(rotation)];
          mat.tx = tx;
          mat.ty = ty;
          matrix.append(mat);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/utils/misc/NOOP.mjs
  var NOOP;
  var init_NOOP = __esm({
    "node_modules/pixi.js/lib/utils/misc/NOOP.mjs"() {
      "use strict";
      NOOP = () => {
      };
    }
  });

  // node_modules/pixi.js/lib/maths/misc/pow2.mjs
  function nextPow2(v2) {
    v2 += v2 === 0 ? 1 : 0;
    --v2;
    v2 |= v2 >>> 1;
    v2 |= v2 >>> 2;
    v2 |= v2 >>> 4;
    v2 |= v2 >>> 8;
    v2 |= v2 >>> 16;
    return v2 + 1;
  }
  function isPow2(v2) {
    return !(v2 & v2 - 1) && !!v2;
  }
  var init_pow2 = __esm({
    "node_modules/pixi.js/lib/maths/misc/pow2.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/container/utils/definedProps.mjs
  function definedProps(obj) {
    const result = {};
    for (const key in obj) {
      if (obj[key] !== void 0) {
        result[key] = obj[key];
      }
    }
    return result;
  }
  var init_definedProps = __esm({
    "node_modules/pixi.js/lib/scene/container/utils/definedProps.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureStyle.mjs
  function createResourceIdFromString(value) {
    const id = idHash[value];
    if (id === void 0) {
      idHash[value] = uid("resource");
    }
    return id;
  }
  var idHash, _TextureStyle, TextureStyle;
  var init_TextureStyle = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureStyle.mjs"() {
      init_eventemitter3();
      init_uid();
      init_deprecation();
      idHash = /* @__PURE__ */ Object.create(null);
      _TextureStyle = class _TextureStyle2 extends eventemitter3_default {
        /**
         * @param options - options for the style
         */
        constructor(options = {}) {
          super();
          this._resourceType = "textureSampler";
          this._touched = 0;
          this._maxAnisotropy = 1;
          this.destroyed = false;
          options = { ..._TextureStyle2.defaultOptions, ...options };
          this.addressMode = options.addressMode;
          this.addressModeU = options.addressModeU ?? this.addressModeU;
          this.addressModeV = options.addressModeV ?? this.addressModeV;
          this.addressModeW = options.addressModeW ?? this.addressModeW;
          this.scaleMode = options.scaleMode;
          this.magFilter = options.magFilter ?? this.magFilter;
          this.minFilter = options.minFilter ?? this.minFilter;
          this.mipmapFilter = options.mipmapFilter ?? this.mipmapFilter;
          this.lodMinClamp = options.lodMinClamp;
          this.lodMaxClamp = options.lodMaxClamp;
          this.compare = options.compare;
          this.maxAnisotropy = options.maxAnisotropy ?? 1;
        }
        set addressMode(value) {
          this.addressModeU = value;
          this.addressModeV = value;
          this.addressModeW = value;
        }
        /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
        get addressMode() {
          return this.addressModeU;
        }
        set wrapMode(value) {
          deprecation(v8_0_0, "TextureStyle.wrapMode is now TextureStyle.addressMode");
          this.addressMode = value;
        }
        get wrapMode() {
          return this.addressMode;
        }
        set scaleMode(value) {
          this.magFilter = value;
          this.minFilter = value;
          this.mipmapFilter = value;
        }
        /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
        get scaleMode() {
          return this.magFilter;
        }
        /** Specifies the maximum anisotropy value clamp used by the sampler. */
        set maxAnisotropy(value) {
          this._maxAnisotropy = Math.min(value, 16);
          if (this._maxAnisotropy > 1) {
            this.scaleMode = "linear";
          }
        }
        get maxAnisotropy() {
          return this._maxAnisotropy;
        }
        // TODO - move this to WebGL?
        get _resourceId() {
          return this._sharedResourceId || this._generateResourceId();
        }
        update() {
          this.emit("change", this);
          this._sharedResourceId = null;
        }
        _generateResourceId() {
          const bigKey = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
          this._sharedResourceId = createResourceIdFromString(bigKey);
          return this._resourceId;
        }
        /** Destroys the style */
        destroy() {
          this.destroyed = true;
          this.emit("destroy", this);
          this.emit("change", this);
          this.removeAllListeners();
        }
      };
      _TextureStyle.defaultOptions = {
        addressMode: "clamp-to-edge",
        scaleMode: "linear"
      };
      TextureStyle = _TextureStyle;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/TextureSource.mjs
  var _TextureSource, TextureSource;
  var init_TextureSource = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/TextureSource.mjs"() {
      init_eventemitter3();
      init_pow2();
      init_definedProps();
      init_uid();
      init_TextureStyle();
      _TextureSource = class _TextureSource2 extends eventemitter3_default {
        /**
         * @param options - options for creating a new TextureSource
         */
        constructor(options = {}) {
          super();
          this.options = options;
          this.uid = uid("textureSource");
          this._resourceType = "textureSource";
          this._resourceId = uid("resource");
          this.uploadMethodId = "unknown";
          this._resolution = 1;
          this.pixelWidth = 1;
          this.pixelHeight = 1;
          this.width = 1;
          this.height = 1;
          this.sampleCount = 1;
          this.mipLevelCount = 1;
          this.autoGenerateMipmaps = false;
          this.format = "rgba8unorm";
          this.dimension = "2d";
          this.antialias = false;
          this._touched = 0;
          this._batchTick = -1;
          this._textureBindLocation = -1;
          options = { ..._TextureSource2.defaultOptions, ...options };
          this.label = options.label ?? "";
          this.resource = options.resource;
          this.autoGarbageCollect = options.autoGarbageCollect;
          this._resolution = options.resolution;
          if (options.width) {
            this.pixelWidth = options.width * this._resolution;
          } else {
            this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1;
          }
          if (options.height) {
            this.pixelHeight = options.height * this._resolution;
          } else {
            this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1;
          }
          this.width = this.pixelWidth / this._resolution;
          this.height = this.pixelHeight / this._resolution;
          this.format = options.format;
          this.dimension = options.dimensions;
          this.mipLevelCount = options.mipLevelCount;
          this.autoGenerateMipmaps = options.autoGenerateMipmaps;
          this.sampleCount = options.sampleCount;
          this.antialias = options.antialias;
          this.alphaMode = options.alphaMode;
          this.style = new TextureStyle(definedProps(options));
          this.destroyed = false;
          this._refreshPOT();
        }
        /** returns itself */
        get source() {
          return this;
        }
        /** the style of the texture */
        get style() {
          return this._style;
        }
        set style(value) {
          if (this.style === value)
            return;
          this._style?.off("change", this._onStyleChange, this);
          this._style = value;
          this._style?.on("change", this._onStyleChange, this);
          this._onStyleChange();
        }
        /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
        get addressMode() {
          return this._style.addressMode;
        }
        set addressMode(value) {
          this._style.addressMode = value;
        }
        /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
        get repeatMode() {
          return this._style.addressMode;
        }
        set repeatMode(value) {
          this._style.addressMode = value;
        }
        /** Specifies the sampling behavior when the sample footprint is smaller than or equal to one texel. */
        get magFilter() {
          return this._style.magFilter;
        }
        set magFilter(value) {
          this._style.magFilter = value;
        }
        /** Specifies the sampling behavior when the sample footprint is larger than one texel. */
        get minFilter() {
          return this._style.minFilter;
        }
        set minFilter(value) {
          this._style.minFilter = value;
        }
        /** Specifies behavior for sampling between mipmap levels. */
        get mipmapFilter() {
          return this._style.mipmapFilter;
        }
        set mipmapFilter(value) {
          this._style.mipmapFilter = value;
        }
        /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
        get lodMinClamp() {
          return this._style.lodMinClamp;
        }
        set lodMinClamp(value) {
          this._style.lodMinClamp = value;
        }
        /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
        get lodMaxClamp() {
          return this._style.lodMaxClamp;
        }
        set lodMaxClamp(value) {
          this._style.lodMaxClamp = value;
        }
        _onStyleChange() {
          this.emit("styleChange", this);
        }
        /** call this if you have modified the texture outside of the constructor */
        update() {
          if (this.resource) {
            const resolution = this._resolution;
            const didResize = this.resize(this.resourceWidth / resolution, this.resourceHeight / resolution);
            if (didResize)
              return;
          }
          this.emit("update", this);
        }
        /** Destroys this texture source */
        destroy() {
          this.destroyed = true;
          this.emit("destroy", this);
          this.emit("change", this);
          if (this._style) {
            this._style.destroy();
            this._style = null;
          }
          this.uploadMethodId = null;
          this.resource = null;
          this.removeAllListeners();
        }
        /**
         * This will unload the Texture source from the GPU. This will free up the GPU memory
         * As soon as it is required fore rendering, it will be re-uploaded.
         */
        unload() {
          this._resourceId = uid("resource");
          this.emit("change", this);
          this.emit("unload", this);
        }
        /** the width of the resource. This is the REAL pure number, not accounting resolution   */
        get resourceWidth() {
          const { resource } = this;
          return resource.naturalWidth || resource.videoWidth || resource.displayWidth || resource.width;
        }
        /** the height of the resource. This is the REAL pure number, not accounting resolution */
        get resourceHeight() {
          const { resource } = this;
          return resource.naturalHeight || resource.videoHeight || resource.displayHeight || resource.height;
        }
        /**
         * the resolution of the texture. Changing this number, will not change the number of pixels in the actual texture
         * but will the size of the texture when rendered.
         *
         * changing the resolution of this texture to 2 for example will make it appear twice as small when rendered (as pixel
         * density will have increased)
         */
        get resolution() {
          return this._resolution;
        }
        set resolution(resolution) {
          if (this._resolution === resolution)
            return;
          this._resolution = resolution;
          this.width = this.pixelWidth / resolution;
          this.height = this.pixelHeight / resolution;
        }
        /**
         * Resize the texture, this is handy if you want to use the texture as a render texture
         * @param width - the new width of the texture
         * @param height - the new height of the texture
         * @param resolution - the new resolution of the texture
         * @returns - if the texture was resized
         */
        resize(width, height, resolution) {
          resolution = resolution || this._resolution;
          width = width || this.width;
          height = height || this.height;
          const newPixelWidth = Math.round(width * resolution);
          const newPixelHeight = Math.round(height * resolution);
          this.width = newPixelWidth / resolution;
          this.height = newPixelHeight / resolution;
          this._resolution = resolution;
          if (this.pixelWidth === newPixelWidth && this.pixelHeight === newPixelHeight) {
            return false;
          }
          this._refreshPOT();
          this.pixelWidth = newPixelWidth;
          this.pixelHeight = newPixelHeight;
          this.emit("resize", this);
          this._resourceId = uid("resource");
          this.emit("change", this);
          return true;
        }
        /**
         * Lets the renderer know that this texture has been updated and its mipmaps should be re-generated.
         * This is only important for RenderTexture instances, as standard Texture instances will have their
         * mipmaps generated on upload. You should call this method after you make any change to the texture
         *
         * The reason for this is is can be quite expensive to update mipmaps for a texture. So by default,
         * We want you, the developer to specify when this action should happen.
         *
         * Generally you don't want to have mipmaps generated on Render targets that are changed every frame,
         */
        updateMipmaps() {
          if (this.autoGenerateMipmaps && this.mipLevelCount > 1) {
            this.emit("updateMipmaps", this);
          }
        }
        set wrapMode(value) {
          this._style.wrapMode = value;
        }
        get wrapMode() {
          return this._style.wrapMode;
        }
        set scaleMode(value) {
          this._style.scaleMode = value;
        }
        /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
        get scaleMode() {
          return this._style.scaleMode;
        }
        /**
         * Refresh check for isPowerOfTwo texture based on size
         * @private
         */
        _refreshPOT() {
          this.isPowerOfTwo = isPow2(this.pixelWidth) && isPow2(this.pixelHeight);
        }
        static test(_resource) {
          throw new Error("Unimplemented");
        }
      };
      _TextureSource.defaultOptions = {
        resolution: 1,
        format: "bgra8unorm",
        alphaMode: "premultiply-alpha-on-upload",
        dimensions: "2d",
        mipLevelCount: 1,
        autoGenerateMipmaps: false,
        sampleCount: 1,
        antialias: false,
        autoGarbageCollect: false
      };
      TextureSource = _TextureSource;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/BufferImageSource.mjs
  var BufferImageSource;
  var init_BufferImageSource = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/BufferImageSource.mjs"() {
      init_Extensions();
      init_TextureSource();
      BufferImageSource = class extends TextureSource {
        constructor(options) {
          const buffer = options.resource || new Float32Array(options.width * options.height * 4);
          let format = options.format;
          if (!format) {
            if (buffer instanceof Float32Array) {
              format = "rgba32float";
            } else if (buffer instanceof Int32Array) {
              format = "rgba32uint";
            } else if (buffer instanceof Uint32Array) {
              format = "rgba32uint";
            } else if (buffer instanceof Int16Array) {
              format = "rgba16uint";
            } else if (buffer instanceof Uint16Array) {
              format = "rgba16uint";
            } else if (buffer instanceof Int8Array) {
              format = "bgra8unorm";
            } else {
              format = "bgra8unorm";
            }
          }
          super({
            ...options,
            resource: buffer,
            format
          });
          this.uploadMethodId = "buffer";
        }
        static test(resource) {
          return resource instanceof Int8Array || resource instanceof Uint8Array || resource instanceof Uint8ClampedArray || resource instanceof Int16Array || resource instanceof Uint16Array || resource instanceof Int32Array || resource instanceof Uint32Array || resource instanceof Float32Array;
        }
      };
      BufferImageSource.extension = ExtensionType.TextureSource;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureMatrix.mjs
  var tempMat, TextureMatrix;
  var init_TextureMatrix = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/TextureMatrix.mjs"() {
      init_Matrix();
      tempMat = new Matrix();
      TextureMatrix = class {
        /**
         * @param texture - observed texture
         * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
         */
        constructor(texture, clampMargin) {
          this.mapCoord = new Matrix();
          this.uClampFrame = new Float32Array(4);
          this.uClampOffset = new Float32Array(2);
          this._textureID = -1;
          this._updateID = 0;
          this.clampOffset = 0;
          if (typeof clampMargin === "undefined") {
            this.clampMargin = texture.width < 10 ? 0 : 0.5;
          } else {
            this.clampMargin = clampMargin;
          }
          this.isSimple = false;
          this.texture = texture;
        }
        /** Texture property. */
        get texture() {
          return this._texture;
        }
        set texture(value) {
          if (this.texture === value)
            return;
          this._texture?.removeListener("update", this.update, this);
          this._texture = value;
          this._texture.addListener("update", this.update, this);
          this.update();
        }
        /**
         * Multiplies uvs array to transform
         * @param uvs - mesh uvs
         * @param [out=uvs] - output
         * @returns - output
         */
        multiplyUvs(uvs, out2) {
          if (out2 === void 0) {
            out2 = uvs;
          }
          const mat = this.mapCoord;
          for (let i2 = 0; i2 < uvs.length; i2 += 2) {
            const x2 = uvs[i2];
            const y2 = uvs[i2 + 1];
            out2[i2] = x2 * mat.a + y2 * mat.c + mat.tx;
            out2[i2 + 1] = x2 * mat.b + y2 * mat.d + mat.ty;
          }
          return out2;
        }
        /**
         * Updates matrices if texture was changed
         * @returns - whether or not it was updated
         */
        update() {
          const tex = this._texture;
          this._updateID++;
          const uvs = tex.uvs;
          this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
          const orig = tex.orig;
          const trim = tex.trim;
          if (trim) {
            tempMat.set(
              orig.width / trim.width,
              0,
              0,
              orig.height / trim.height,
              -trim.x / trim.width,
              -trim.y / trim.height
            );
            this.mapCoord.append(tempMat);
          }
          const texBase = tex.source;
          const frame = this.uClampFrame;
          const margin = this.clampMargin / texBase._resolution;
          const offset = this.clampOffset / texBase._resolution;
          frame[0] = (tex.frame.x + margin + offset) / texBase.width;
          frame[1] = (tex.frame.y + margin + offset) / texBase.height;
          frame[2] = (tex.frame.x + tex.frame.width - margin + offset) / texBase.width;
          frame[3] = (tex.frame.y + tex.frame.height - margin + offset) / texBase.height;
          this.uClampOffset[0] = this.clampOffset / texBase.pixelWidth;
          this.uClampOffset[1] = this.clampOffset / texBase.pixelHeight;
          this.isSimple = tex.frame.width === texBase.width && tex.frame.height === texBase.height && tex.rotate === 0;
          return true;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs
  var Texture;
  var init_Texture = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs"() {
      init_eventemitter3();
      init_groupD8();
      init_Rectangle();
      init_uid();
      init_deprecation();
      init_NOOP();
      init_BufferImageSource();
      init_TextureSource();
      init_TextureMatrix();
      Texture = class extends eventemitter3_default {
        /**
         * @param {rendering.TextureOptions} options - Options for the texture
         */
        constructor({
          source,
          label,
          frame,
          orig,
          trim,
          defaultAnchor,
          defaultBorders,
          rotate,
          dynamic
        } = {}) {
          super();
          this.uid = uid("texture");
          this.uvs = { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 };
          this.frame = new Rectangle();
          this.noFrame = false;
          this.dynamic = false;
          this.isTexture = true;
          this.label = label;
          this.source = source?.source ?? new TextureSource();
          this.noFrame = !frame;
          if (frame) {
            this.frame.copyFrom(frame);
          } else {
            const { width, height } = this._source;
            this.frame.width = width;
            this.frame.height = height;
          }
          this.orig = orig || this.frame;
          this.trim = trim;
          this.rotate = rotate ?? 0;
          this.defaultAnchor = defaultAnchor;
          this.defaultBorders = defaultBorders;
          this.destroyed = false;
          this.dynamic = dynamic || false;
          this.updateUvs();
        }
        set source(value) {
          if (this._source) {
            this._source.off("resize", this.update, this);
          }
          this._source = value;
          value.on("resize", this.update, this);
          this.emit("update", this);
        }
        /** the underlying source of the texture (equivalent of baseTexture in v7) */
        get source() {
          return this._source;
        }
        /** returns a TextureMatrix instance for this texture. By default, that object is not created because its heavy. */
        get textureMatrix() {
          if (!this._textureMatrix) {
            this._textureMatrix = new TextureMatrix(this);
          }
          return this._textureMatrix;
        }
        /** The width of the Texture in pixels. */
        get width() {
          return this.orig.width;
        }
        /** The height of the Texture in pixels. */
        get height() {
          return this.orig.height;
        }
        /** Call this function when you have modified the frame of this texture. */
        updateUvs() {
          const { uvs, frame } = this;
          const { width, height } = this._source;
          const nX = frame.x / width;
          const nY = frame.y / height;
          const nW = frame.width / width;
          const nH = frame.height / height;
          let rotate = this.rotate;
          if (rotate) {
            const w2 = nW / 2;
            const h2 = nH / 2;
            const cX = nX + w2;
            const cY = nY + h2;
            rotate = groupD8.add(rotate, groupD8.NW);
            uvs.x0 = cX + w2 * groupD8.uX(rotate);
            uvs.y0 = cY + h2 * groupD8.uY(rotate);
            rotate = groupD8.add(rotate, 2);
            uvs.x1 = cX + w2 * groupD8.uX(rotate);
            uvs.y1 = cY + h2 * groupD8.uY(rotate);
            rotate = groupD8.add(rotate, 2);
            uvs.x2 = cX + w2 * groupD8.uX(rotate);
            uvs.y2 = cY + h2 * groupD8.uY(rotate);
            rotate = groupD8.add(rotate, 2);
            uvs.x3 = cX + w2 * groupD8.uX(rotate);
            uvs.y3 = cY + h2 * groupD8.uY(rotate);
          } else {
            uvs.x0 = nX;
            uvs.y0 = nY;
            uvs.x1 = nX + nW;
            uvs.y1 = nY;
            uvs.x2 = nX + nW;
            uvs.y2 = nY + nH;
            uvs.x3 = nX;
            uvs.y3 = nY + nH;
          }
        }
        /**
         * Destroys this texture
         * @param destroySource - Destroy the source when the texture is destroyed.
         */
        destroy(destroySource = false) {
          if (this._source) {
            if (destroySource) {
              this._source.destroy();
              this._source = null;
            }
          }
          this._textureMatrix = null;
          this.destroyed = true;
          this.emit("destroy", this);
          this.removeAllListeners();
        }
        /** call this if you have modified the `texture outside` of the constructor */
        update() {
          if (this.noFrame) {
            this.frame.width = this._source.width;
            this.frame.height = this._source.height;
          }
          this.updateUvs();
          this.emit("update", this);
        }
        /** @deprecated since 8.0.0 */
        get baseTexture() {
          deprecation(v8_0_0, "Texture.baseTexture is now Texture.source");
          return this._source;
        }
      };
      Texture.EMPTY = new Texture({
        label: "EMPTY",
        source: new TextureSource({
          label: "EMPTY"
        })
      });
      Texture.EMPTY.destroy = NOOP;
      Texture.WHITE = new Texture({
        source: new BufferImageSource({
          resource: new Uint8Array([255, 255, 255, 255]),
          width: 1,
          height: 1,
          alphaMode: "premultiply-alpha-on-upload",
          label: "WHITE"
        }),
        label: "WHITE"
      });
      Texture.WHITE.destroy = NOOP;
    }
  });

  // node_modules/pixi.js/lib/spritesheet/Spritesheet.mjs
  var _Spritesheet, Spritesheet;
  var init_Spritesheet = __esm({
    "node_modules/pixi.js/lib/spritesheet/Spritesheet.mjs"() {
      init_Rectangle();
      init_Texture();
      _Spritesheet = class _Spritesheet2 {
        /**
         * @param texture - Reference to the source BaseTexture object.
         * @param {object} data - Spritesheet image data.
         */
        constructor(texture, data) {
          this.linkedSheets = [];
          this._texture = texture instanceof Texture ? texture : null;
          this.textureSource = texture.source;
          this.textures = {};
          this.animations = {};
          this.data = data;
          const metaResolution = parseFloat(data.meta.scale);
          if (metaResolution) {
            this.resolution = metaResolution;
            texture.source.resolution = this.resolution;
          } else {
            this.resolution = texture.source._resolution;
          }
          this._frames = this.data.frames;
          this._frameKeys = Object.keys(this._frames);
          this._batchIndex = 0;
          this._callback = null;
        }
        /**
         * Parser spritesheet from loaded data. This is done asynchronously
         * to prevent creating too many Texture within a single process.
         */
        parse() {
          return new Promise((resolve) => {
            this._callback = resolve;
            this._batchIndex = 0;
            if (this._frameKeys.length <= _Spritesheet2.BATCH_SIZE) {
              this._processFrames(0);
              this._processAnimations();
              this._parseComplete();
            } else {
              this._nextBatch();
            }
          });
        }
        /**
         * Process a batch of frames
         * @param initialFrameIndex - The index of frame to start.
         */
        _processFrames(initialFrameIndex) {
          let frameIndex = initialFrameIndex;
          const maxFrames = _Spritesheet2.BATCH_SIZE;
          while (frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length) {
            const i2 = this._frameKeys[frameIndex];
            const data = this._frames[i2];
            const rect = data.frame;
            if (rect) {
              let frame = null;
              let trim = null;
              const sourceSize = data.trimmed !== false && data.sourceSize ? data.sourceSize : data.frame;
              const orig = new Rectangle(
                0,
                0,
                Math.floor(sourceSize.w) / this.resolution,
                Math.floor(sourceSize.h) / this.resolution
              );
              if (data.rotated) {
                frame = new Rectangle(
                  Math.floor(rect.x) / this.resolution,
                  Math.floor(rect.y) / this.resolution,
                  Math.floor(rect.h) / this.resolution,
                  Math.floor(rect.w) / this.resolution
                );
              } else {
                frame = new Rectangle(
                  Math.floor(rect.x) / this.resolution,
                  Math.floor(rect.y) / this.resolution,
                  Math.floor(rect.w) / this.resolution,
                  Math.floor(rect.h) / this.resolution
                );
              }
              if (data.trimmed !== false && data.spriteSourceSize) {
                trim = new Rectangle(
                  Math.floor(data.spriteSourceSize.x) / this.resolution,
                  Math.floor(data.spriteSourceSize.y) / this.resolution,
                  Math.floor(rect.w) / this.resolution,
                  Math.floor(rect.h) / this.resolution
                );
              }
              this.textures[i2] = new Texture({
                source: this.textureSource,
                frame,
                orig,
                trim,
                rotate: data.rotated ? 2 : 0,
                defaultAnchor: data.anchor,
                defaultBorders: data.borders,
                label: i2.toString()
              });
            }
            frameIndex++;
          }
        }
        /** Parse animations config. */
        _processAnimations() {
          const animations = this.data.animations || {};
          for (const animName in animations) {
            this.animations[animName] = [];
            for (let i2 = 0; i2 < animations[animName].length; i2++) {
              const frameName = animations[animName][i2];
              this.animations[animName].push(this.textures[frameName]);
            }
          }
        }
        /** The parse has completed. */
        _parseComplete() {
          const callback = this._callback;
          this._callback = null;
          this._batchIndex = 0;
          callback.call(this, this.textures);
        }
        /** Begin the next batch of textures. */
        _nextBatch() {
          this._processFrames(this._batchIndex * _Spritesheet2.BATCH_SIZE);
          this._batchIndex++;
          setTimeout(() => {
            if (this._batchIndex * _Spritesheet2.BATCH_SIZE < this._frameKeys.length) {
              this._nextBatch();
            } else {
              this._processAnimations();
              this._parseComplete();
            }
          }, 0);
        }
        /**
         * Destroy Spritesheet and don't use after this.
         * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
         */
        destroy(destroyBase = false) {
          for (const i2 in this.textures) {
            this.textures[i2].destroy();
          }
          this._frames = null;
          this._frameKeys = null;
          this.data = null;
          this.textures = null;
          if (destroyBase) {
            this._texture?.destroy();
            this.textureSource.destroy();
          }
          this._texture = null;
          this.textureSource = null;
          this.linkedSheets = [];
        }
      };
      _Spritesheet.BATCH_SIZE = 1e3;
      Spritesheet = _Spritesheet;
    }
  });

  // node_modules/pixi.js/lib/spritesheet/spritesheetAsset.mjs
  function getCacheableAssets(keys, asset, ignoreMultiPack) {
    const out2 = {};
    keys.forEach((key) => {
      out2[key] = asset;
    });
    Object.keys(asset.textures).forEach((key) => {
      out2[key] = asset.textures[key];
    });
    if (!ignoreMultiPack) {
      const basePath = path.dirname(keys[0]);
      asset.linkedSheets.forEach((item, i2) => {
        const out22 = getCacheableAssets([`${basePath}/${asset.data.meta.related_multi_packs[i2]}`], item, true);
        Object.assign(out2, out22);
      });
    }
    return out2;
  }
  var validImages, spritesheetAsset;
  var init_spritesheetAsset = __esm({
    "node_modules/pixi.js/lib/spritesheet/spritesheetAsset.mjs"() {
      init_LoaderParser();
      init_Resolver();
      init_copySearchParams();
      init_Extensions();
      init_Texture();
      init_path();
      init_Spritesheet();
      validImages = [
        "jpg",
        "png",
        "jpeg",
        "avif",
        "webp",
        "basis",
        "etc2",
        "bc7",
        "bc6h",
        "bc5",
        "bc4",
        "bc3",
        "bc2",
        "bc1",
        "eac",
        "astc"
      ];
      spritesheetAsset = {
        extension: ExtensionType.Asset,
        /** Handle the caching of the related Spritesheet Textures */
        cache: {
          test: (asset) => asset instanceof Spritesheet,
          getCacheableAssets: (keys, asset) => getCacheableAssets(keys, asset, false)
        },
        /** Resolve the resolution of the asset. */
        resolver: {
          extension: {
            type: ExtensionType.ResolveParser,
            name: "resolveSpritesheet"
          },
          test: (value) => {
            const tempURL = value.split("?")[0];
            const split = tempURL.split(".");
            const extension = split.pop();
            const format = split.pop();
            return extension === "json" && validImages.includes(format);
          },
          parse: (value) => {
            const split = value.split(".");
            return {
              resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
              format: split[split.length - 2],
              src: value
            };
          }
        },
        /**
         * Loader plugin that parses sprite sheets!
         * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
         * If it is, we load the spritesheets image and parse the data into Spritesheet
         * All textures in the sprite sheet are then added to the cache
         */
        loader: {
          name: "spritesheetLoader",
          extension: {
            type: ExtensionType.LoadParser,
            priority: LoaderParserPriority.Normal,
            name: "spritesheetLoader"
          },
          async testParse(asset, options) {
            return path.extname(options.src).toLowerCase() === ".json" && !!asset.frames;
          },
          async parse(asset, options, loader) {
            const {
              texture: imageTexture,
              // if user need to use preloaded texture
              imageFilename
              // if user need to use custom filename (not from jsonFile.meta.image)
            } = options?.data ?? {};
            let basePath = path.dirname(options.src);
            if (basePath && basePath.lastIndexOf("/") !== basePath.length - 1) {
              basePath += "/";
            }
            let texture;
            if (imageTexture instanceof Texture) {
              texture = imageTexture;
            } else {
              const imagePath = copySearchParams(basePath + (imageFilename ?? asset.meta.image), options.src);
              const assets = await loader.load([imagePath]);
              texture = assets[imagePath];
            }
            const spritesheet = new Spritesheet(
              texture.source,
              asset
            );
            await spritesheet.parse();
            const multiPacks = asset?.meta?.related_multi_packs;
            if (Array.isArray(multiPacks)) {
              const promises = [];
              for (const item of multiPacks) {
                if (typeof item !== "string") {
                  continue;
                }
                let itemUrl = basePath + item;
                if (options.data?.ignoreMultiPack) {
                  continue;
                }
                itemUrl = copySearchParams(itemUrl, options.src);
                promises.push(loader.load({
                  src: itemUrl,
                  data: {
                    ignoreMultiPack: true
                  }
                }));
              }
              const res = await Promise.all(promises);
              spritesheet.linkedSheets = res;
              res.forEach((item) => {
                item.linkedSheets = [spritesheet].concat(spritesheet.linkedSheets.filter((sp) => sp !== item));
              });
            }
            return spritesheet;
          },
          async unload(spritesheet, _resolvedAsset, loader) {
            await loader.unload(spritesheet.textureSource._sourceOrigin);
            spritesheet.destroy(false);
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/spritesheet/init.mjs
  var init_init4 = __esm({
    "node_modules/pixi.js/lib/spritesheet/init.mjs"() {
      init_Extensions();
      init_spritesheetAsset();
      extensions.add(spritesheetAsset);
    }
  });

  // node_modules/pixi.js/lib/utils/data/updateQuadBounds.mjs
  function updateQuadBounds(bounds, anchor, texture, padding) {
    const { width, height } = texture.orig;
    const trim = texture.trim;
    if (trim) {
      const sourceWidth = trim.width;
      const sourceHeight = trim.height;
      bounds.minX = trim.x - anchor._x * width - padding;
      bounds.maxX = bounds.minX + sourceWidth;
      bounds.minY = trim.y - anchor._y * height - padding;
      bounds.maxY = bounds.minY + sourceHeight;
    } else {
      bounds.minX = -anchor._x * width - padding;
      bounds.maxX = bounds.minX + width;
      bounds.minY = -anchor._y * height - padding;
      bounds.maxY = bounds.minY + height;
    }
    return;
  }
  var init_updateQuadBounds = __esm({
    "node_modules/pixi.js/lib/utils/data/updateQuadBounds.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/view/View.mjs
  var ViewContainer;
  var init_View = __esm({
    "node_modules/pixi.js/lib/scene/view/View.mjs"() {
      init_Bounds();
      init_Container();
      ViewContainer = class extends Container {
        constructor() {
          super(...arguments);
          this.canBundle = true;
          this.allowChildren = false;
          this._roundPixels = 0;
          this._lastUsed = 0;
          this._lastInstructionTick = -1;
          this._bounds = new Bounds(0, 1, 0, 0);
          this._boundsDirty = true;
        }
        /** @private */
        _updateBounds() {
        }
        /**
         * Whether or not to round the x/y position of the sprite.
         * @type {boolean}
         */
        get roundPixels() {
          return !!this._roundPixels;
        }
        set roundPixels(value) {
          this._roundPixels = value ? 1 : 0;
        }
        /**
         * Checks if the object contains the given point.
         * @param point - The point to check
         */
        containsPoint(point) {
          const bounds = this.bounds;
          const { x: x2, y: y2 } = point;
          return x2 >= bounds.minX && x2 <= bounds.maxX && y2 >= bounds.minY && y2 <= bounds.maxY;
        }
        destroy(options) {
          super.destroy(options);
          this._bounds = null;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite/Sprite.mjs
  var Sprite;
  var init_Sprite = __esm({
    "node_modules/pixi.js/lib/scene/sprite/Sprite.mjs"() {
      init_ObservablePoint();
      init_Texture();
      init_updateQuadBounds();
      init_View();
      Sprite = class _Sprite extends ViewContainer {
        /**
         * @param options - The options for creating the sprite.
         */
        constructor(options = Texture.EMPTY) {
          if (options instanceof Texture) {
            options = { texture: options };
          }
          const { texture = Texture.EMPTY, anchor, roundPixels, width, height, ...rest } = options;
          super({
            label: "Sprite",
            ...rest
          });
          this.renderPipeId = "sprite";
          this.batched = true;
          this._didSpriteUpdate = false;
          this._sourceBounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
          this._sourceBoundsDirty = true;
          this._anchor = new ObservablePoint(
            {
              _onUpdate: () => {
                this.onViewUpdate();
              }
            }
          );
          if (anchor) {
            this.anchor = anchor;
          } else if (texture.defaultAnchor) {
            this.anchor = texture.defaultAnchor;
          }
          this.texture = texture;
          this.allowChildren = false;
          this.roundPixels = roundPixels ?? false;
          if (width !== void 0)
            this.width = width;
          if (height !== void 0)
            this.height = height;
        }
        /**
         * Helper function that creates a new sprite based on the source you provide.
         * The source can be - frame id, image, video, canvas element, video element, texture
         * @param source - Source to create texture from
         * @param [skipCache] - Whether to skip the cache or not
         * @returns The newly created sprite
         */
        static from(source, skipCache = false) {
          if (source instanceof Texture) {
            return new _Sprite(source);
          }
          return new _Sprite(Texture.from(source, skipCache));
        }
        set texture(value) {
          value || (value = Texture.EMPTY);
          const currentTexture = this._texture;
          if (currentTexture === value)
            return;
          if (currentTexture && currentTexture.dynamic)
            currentTexture.off("update", this.onViewUpdate, this);
          if (value.dynamic)
            value.on("update", this.onViewUpdate, this);
          this._texture = value;
          if (this._width) {
            this._setWidth(this._width, this._texture.orig.width);
          }
          if (this._height) {
            this._setHeight(this._height, this._texture.orig.height);
          }
          this.onViewUpdate();
        }
        /** The texture that the sprite is using. */
        get texture() {
          return this._texture;
        }
        /**
         * The local bounds of the sprite.
         * @type {rendering.Bounds}
         */
        get bounds() {
          if (this._boundsDirty) {
            this._updateBounds();
            this._boundsDirty = false;
          }
          return this._bounds;
        }
        /**
         * The bounds of the sprite, taking the texture's trim into account.
         * @type {rendering.Bounds}
         */
        get sourceBounds() {
          if (this._sourceBoundsDirty) {
            this._updateSourceBounds();
            this._sourceBoundsDirty = false;
          }
          return this._sourceBounds;
        }
        /**
         * Checks if the object contains the given point.
         * @param point - The point to check
         */
        containsPoint(point) {
          const bounds = this.sourceBounds;
          if (point.x >= bounds.maxX && point.x <= bounds.minX) {
            if (point.y >= bounds.maxY && point.y <= bounds.minY) {
              return true;
            }
          }
          return false;
        }
        /**
         * Adds the bounds of this object to the bounds object.
         * @param bounds - The output bounds object.
         */
        addBounds(bounds) {
          const _bounds = this._texture.trim ? this.sourceBounds : this.bounds;
          bounds.addFrame(_bounds.minX, _bounds.minY, _bounds.maxX, _bounds.maxY);
        }
        onViewUpdate() {
          this._didViewChangeTick++;
          this._didSpriteUpdate = true;
          this._sourceBoundsDirty = this._boundsDirty = true;
          if (this.didViewUpdate)
            return;
          this.didViewUpdate = true;
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (renderGroup) {
            renderGroup.onChildViewUpdate(this);
          }
        }
        _updateBounds() {
          updateQuadBounds(this._bounds, this._anchor, this._texture, 0);
        }
        _updateSourceBounds() {
          const anchor = this._anchor;
          const texture = this._texture;
          const sourceBounds = this._sourceBounds;
          const { width, height } = texture.orig;
          sourceBounds.maxX = -anchor._x * width;
          sourceBounds.minX = sourceBounds.maxX + width;
          sourceBounds.maxY = -anchor._y * height;
          sourceBounds.minY = sourceBounds.maxY + height;
        }
        /**
         * Destroys this sprite renderable and optionally its texture.
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
         * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
         */
        destroy(options = false) {
          super.destroy(options);
          const destroyTexture = typeof options === "boolean" ? options : options?.texture;
          if (destroyTexture) {
            const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
            this._texture.destroy(destroyTextureSource);
          }
          this._texture = null;
          this._bounds = null;
          this._sourceBounds = null;
          this._anchor = null;
        }
        /**
         * The anchor sets the origin point of the sprite. The default value is taken from the {@link Texture}
         * and passed to the constructor.
         *
         * The default is `(0,0)`, this means the sprite's origin is the top left.
         *
         * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
         *
         * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
         *
         * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
         * @example
         * import { Sprite } from 'pixi.js';
         *
         * const sprite = new Sprite({texture: Texture.WHITE});
         * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
         */
        get anchor() {
          return this._anchor;
        }
        set anchor(value) {
          typeof value === "number" ? this._anchor.set(value) : this._anchor.copyFrom(value);
        }
        /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
        get width() {
          return Math.abs(this.scale.x) * this._texture.orig.width;
        }
        set width(value) {
          this._setWidth(value, this._texture.orig.width);
          this._width = value;
        }
        /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
        get height() {
          return Math.abs(this.scale.y) * this._texture.orig.height;
        }
        set height(value) {
          this._setHeight(value, this._texture.orig.height);
          this._height = value;
        }
        /**
         * Retrieves the size of the Sprite as a [Size]{@link Size} object.
         * This is faster than get the width and height separately.
         * @param out - Optional object to store the size in.
         * @returns - The size of the Sprite.
         */
        getSize(out2) {
          out2 || (out2 = {});
          out2.width = Math.abs(this.scale.x) * this._texture.orig.width;
          out2.height = Math.abs(this.scale.y) * this._texture.orig.height;
          return out2;
        }
        /**
         * Sets the size of the Sprite to the specified width and height.
         * This is faster than setting the width and height separately.
         * @param value - This can be either a number or a [Size]{@link Size} object.
         * @param height - The height to set. Defaults to the value of `width` if not provided.
         */
        setSize(value, height) {
          if (typeof value === "object") {
            height = value.height ?? value.width;
            value = value.width;
          } else {
            height ?? (height = value);
          }
          value !== void 0 && this._setWidth(value, this._texture.orig.width);
          height !== void 0 && this._setHeight(height, this._texture.orig.height);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/mask/utils/addMaskBounds.mjs
  function addMaskBounds(mask, bounds, skipUpdateTransform) {
    const boundsToMask = tempBounds;
    mask.measurable = true;
    getGlobalBounds(mask, skipUpdateTransform, boundsToMask);
    bounds.addBoundsMask(boundsToMask);
    mask.measurable = false;
  }
  var tempBounds;
  var init_addMaskBounds = __esm({
    "node_modules/pixi.js/lib/rendering/mask/utils/addMaskBounds.mjs"() {
      init_Bounds();
      init_getGlobalBounds();
      tempBounds = new Bounds();
    }
  });

  // node_modules/pixi.js/lib/rendering/mask/utils/addMaskLocalBounds.mjs
  function addMaskLocalBounds(mask, bounds, localRoot) {
    const boundsToMask = boundsPool.get();
    mask.measurable = true;
    const tempMatrix5 = matrixPool.get().identity();
    const relativeMask = getMatrixRelativeToParent(mask, localRoot, tempMatrix5);
    getLocalBounds(mask, boundsToMask, relativeMask);
    mask.measurable = false;
    bounds.addBoundsMask(boundsToMask);
    matrixPool.return(tempMatrix5);
    boundsPool.return(boundsToMask);
  }
  function getMatrixRelativeToParent(target, root, matrix) {
    if (!target) {
      warn("Mask bounds, renderable is not inside the root container");
      return matrix;
    }
    if (target !== root) {
      getMatrixRelativeToParent(target.parent, root, matrix);
      target.updateLocalTransform();
      matrix.append(target.localTransform);
    }
    return matrix;
  }
  var init_addMaskLocalBounds = __esm({
    "node_modules/pixi.js/lib/rendering/mask/utils/addMaskLocalBounds.mjs"() {
      init_getLocalBounds();
      init_matrixAndBoundsPool();
      init_warn();
    }
  });

  // node_modules/pixi.js/lib/rendering/mask/alpha/AlphaMask.mjs
  var AlphaMask;
  var init_AlphaMask = __esm({
    "node_modules/pixi.js/lib/rendering/mask/alpha/AlphaMask.mjs"() {
      init_Extensions();
      init_Sprite();
      init_addMaskBounds();
      init_addMaskLocalBounds();
      AlphaMask = class {
        constructor(options) {
          this.priority = 0;
          this.pipe = "alphaMask";
          if (options?.mask) {
            this.init(options.mask);
          }
        }
        init(mask) {
          this.mask = mask;
          this.renderMaskToTexture = !(mask instanceof Sprite);
          this.mask.renderable = this.renderMaskToTexture;
          this.mask.includeInBuild = !this.renderMaskToTexture;
          this.mask.measurable = false;
        }
        reset() {
          this.mask.measurable = true;
          this.mask = null;
        }
        addBounds(bounds, skipUpdateTransform) {
          addMaskBounds(this.mask, bounds, skipUpdateTransform);
        }
        addLocalBounds(bounds, localRoot) {
          addMaskLocalBounds(this.mask, bounds, localRoot);
        }
        containsPoint(point, hitTestFn) {
          const mask = this.mask;
          return hitTestFn(mask, point);
        }
        destroy() {
          this.reset();
        }
        static test(mask) {
          return mask instanceof Sprite;
        }
      };
      AlphaMask.extension = ExtensionType.MaskEffect;
    }
  });

  // node_modules/pixi.js/lib/rendering/mask/color/ColorMask.mjs
  var ColorMask;
  var init_ColorMask = __esm({
    "node_modules/pixi.js/lib/rendering/mask/color/ColorMask.mjs"() {
      init_Extensions();
      ColorMask = class {
        constructor(options) {
          this.priority = 0;
          this.pipe = "colorMask";
          if (options?.mask) {
            this.init(options.mask);
          }
        }
        init(mask) {
          this.mask = mask;
        }
        destroy() {
        }
        static test(mask) {
          return typeof mask === "number";
        }
      };
      ColorMask.extension = ExtensionType.MaskEffect;
    }
  });

  // node_modules/pixi.js/lib/rendering/mask/stencil/StencilMask.mjs
  var StencilMask;
  var init_StencilMask = __esm({
    "node_modules/pixi.js/lib/rendering/mask/stencil/StencilMask.mjs"() {
      init_Extensions();
      init_Container();
      init_addMaskBounds();
      init_addMaskLocalBounds();
      StencilMask = class {
        constructor(options) {
          this.priority = 0;
          this.pipe = "stencilMask";
          if (options?.mask) {
            this.init(options.mask);
          }
        }
        init(mask) {
          this.mask = mask;
          this.mask.includeInBuild = false;
          this.mask.measurable = false;
        }
        reset() {
          this.mask.measurable = true;
          this.mask.includeInBuild = true;
          this.mask = null;
        }
        addBounds(bounds, skipUpdateTransform) {
          addMaskBounds(this.mask, bounds, skipUpdateTransform);
        }
        addLocalBounds(bounds, localRoot) {
          addMaskLocalBounds(this.mask, bounds, localRoot);
        }
        containsPoint(point, hitTestFn) {
          const mask = this.mask;
          return hitTestFn(mask, point);
        }
        destroy() {
          this.reset();
        }
        static test(mask) {
          return mask instanceof Container;
        }
      };
      StencilMask.extension = ExtensionType.MaskEffect;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/CanvasSource.mjs
  var CanvasSource;
  var init_CanvasSource = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/CanvasSource.mjs"() {
      init_adapter();
      init_Extensions();
      init_TextureSource();
      CanvasSource = class extends TextureSource {
        constructor(options) {
          if (!options.resource) {
            options.resource = DOMAdapter.get().createCanvas();
          }
          if (!options.width) {
            options.width = options.resource.width;
            if (!options.autoDensity) {
              options.width /= options.resolution;
            }
          }
          if (!options.height) {
            options.height = options.resource.height;
            if (!options.autoDensity) {
              options.height /= options.resolution;
            }
          }
          super(options);
          this.uploadMethodId = "image";
          this.autoDensity = options.autoDensity;
          const canvas = options.resource;
          if (this.pixelWidth !== canvas.width || this.pixelWidth !== canvas.height) {
            this.resizeCanvas();
          }
          this.transparent = !!options.transparent;
        }
        resizeCanvas() {
          if (this.autoDensity) {
            this.resource.style.width = `${this.width}px`;
            this.resource.style.height = `${this.height}px`;
          }
          if (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) {
            this.resource.width = this.pixelWidth;
            this.resource.height = this.pixelHeight;
          }
        }
        resize(width = this.width, height = this.height, resolution = this._resolution) {
          const didResize = super.resize(width, height, resolution);
          if (didResize) {
            this.resizeCanvas();
          }
          return didResize;
        }
        static test(resource) {
          return globalThis.HTMLCanvasElement && resource instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && resource instanceof OffscreenCanvas;
        }
        /**
         * Returns the 2D rendering context for the canvas.
         * Caches the context after creating it.
         * @returns The 2D rendering context of the canvas.
         */
        get context2D() {
          return this._context2D || (this._context2D = this.resource.getContext("2d"));
        }
      };
      CanvasSource.extension = ExtensionType.TextureSource;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/ImageSource.mjs
  var ImageSource;
  var init_ImageSource = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/ImageSource.mjs"() {
      init_adapter();
      init_Extensions();
      init_warn();
      init_TextureSource();
      ImageSource = class extends TextureSource {
        constructor(options) {
          if (options.resource && (globalThis.HTMLImageElement && options.resource instanceof HTMLImageElement)) {
            const canvas = DOMAdapter.get().createCanvas(options.resource.width, options.resource.height);
            const context2 = canvas.getContext("2d");
            context2.drawImage(options.resource, 0, 0, options.resource.width, options.resource.height);
            options.resource = canvas;
            warn("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.");
          }
          super(options);
          this.uploadMethodId = "image";
          this.autoGarbageCollect = true;
        }
        static test(resource) {
          return globalThis.HTMLImageElement && resource instanceof HTMLImageElement || typeof ImageBitmap !== "undefined" && resource instanceof ImageBitmap || globalThis.VideoFrame && resource instanceof VideoFrame;
        }
      };
      ImageSource.extension = ExtensionType.TextureSource;
    }
  });

  // node_modules/pixi.js/lib/utils/browser/detectVideoAlphaMode.mjs
  async function detectVideoAlphaMode() {
    promise ?? (promise = (async () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      if (!gl) {
        return "premultiply-alpha-on-upload";
      }
      const video = await new Promise((resolve) => {
        const video2 = document.createElement("video");
        video2.onloadeddata = () => resolve(video2);
        video2.onerror = () => resolve(null);
        video2.autoplay = false;
        video2.crossOrigin = "anonymous";
        video2.preload = "auto";
        video2.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=";
        video2.load();
      });
      if (!video) {
        return "premultiply-alpha-on-upload";
      }
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      const pixel = new Uint8Array(4);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return pixel[0] <= pixel[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload";
    })());
    return promise;
  }
  var promise;
  var init_detectVideoAlphaMode = __esm({
    "node_modules/pixi.js/lib/utils/browser/detectVideoAlphaMode.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/VideoSource.mjs
  var _VideoSource, VideoSource;
  var init_VideoSource = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/VideoSource.mjs"() {
      init_Extensions();
      init_Ticker();
      init_detectVideoAlphaMode();
      init_TextureSource();
      _VideoSource = class _VideoSource2 extends TextureSource {
        constructor(options) {
          super(options);
          this.isReady = false;
          this.uploadMethodId = "video";
          options = {
            ..._VideoSource2.defaultOptions,
            ...options
          };
          this._autoUpdate = true;
          this._isConnectedToTicker = false;
          this._updateFPS = options.updateFPS || 0;
          this._msToNextUpdate = 0;
          this.autoPlay = options.autoPlay !== false;
          this.alphaMode = options.alphaMode ?? "premultiply-alpha-on-upload";
          this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this);
          this._videoFrameRequestCallbackHandle = null;
          this._load = null;
          this._resolve = null;
          this._reject = null;
          this._onCanPlay = this._onCanPlay.bind(this);
          this._onCanPlayThrough = this._onCanPlayThrough.bind(this);
          this._onError = this._onError.bind(this);
          this._onPlayStart = this._onPlayStart.bind(this);
          this._onPlayStop = this._onPlayStop.bind(this);
          this._onSeeked = this._onSeeked.bind(this);
          if (options.autoLoad !== false) {
            void this.load();
          }
        }
        /** Update the video frame if the source is not destroyed and meets certain conditions. */
        updateFrame() {
          if (this.destroyed) {
            return;
          }
          if (this._updateFPS) {
            const elapsedMS = Ticker.shared.elapsedMS * this.resource.playbackRate;
            this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
          }
          if (!this._updateFPS || this._msToNextUpdate <= 0) {
            this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0;
          }
          if (this.isValid) {
            this.update();
          }
        }
        /** Callback to update the video frame and potentially request the next frame update. */
        _videoFrameRequestCallback() {
          this.updateFrame();
          if (this.destroyed) {
            this._videoFrameRequestCallbackHandle = null;
          } else {
            this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(
              this._videoFrameRequestCallback
            );
          }
        }
        /**
         * Checks if the resource has valid dimensions.
         * @returns {boolean} True if width and height are set, otherwise false.
         */
        get isValid() {
          return !!this.resource.videoWidth && !!this.resource.videoHeight;
        }
        /**
         * Start preloading the video resource.
         * @returns {Promise<this>} Handle the validate event
         */
        async load() {
          if (this._load) {
            return this._load;
          }
          const source = this.resource;
          const options = this.options;
          if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
            source.complete = true;
          }
          source.addEventListener("play", this._onPlayStart);
          source.addEventListener("pause", this._onPlayStop);
          source.addEventListener("seeked", this._onSeeked);
          if (!this._isSourceReady()) {
            if (!options.preload) {
              source.addEventListener("canplay", this._onCanPlay);
            }
            source.addEventListener("canplaythrough", this._onCanPlayThrough);
            source.addEventListener("error", this._onError, true);
          } else {
            this._mediaReady();
          }
          this.alphaMode = await detectVideoAlphaMode();
          this._load = new Promise((resolve, reject) => {
            if (this.isValid) {
              resolve(this);
            } else {
              this._resolve = resolve;
              this._reject = reject;
              if (options.preloadTimeoutMs !== void 0) {
                this._preloadTimeout = setTimeout(() => {
                  this._onError(new ErrorEvent(`Preload exceeded timeout of ${options.preloadTimeoutMs}ms`));
                });
              }
              source.load();
            }
          });
          return this._load;
        }
        /**
         * Handle video error events.
         * @param event - The error event
         */
        _onError(event) {
          this.resource.removeEventListener("error", this._onError, true);
          this.emit("error", event);
          if (this._reject) {
            this._reject(event);
            this._reject = null;
            this._resolve = null;
          }
        }
        /**
         * Checks if the underlying source is playing.
         * @returns True if playing.
         */
        _isSourcePlaying() {
          const source = this.resource;
          return !source.paused && !source.ended;
        }
        /**
         * Checks if the underlying source is ready for playing.
         * @returns True if ready.
         */
        _isSourceReady() {
          const source = this.resource;
          return source.readyState > 2;
        }
        /** Runs the update loop when the video is ready to play. */
        _onPlayStart() {
          if (!this.isValid) {
            this._mediaReady();
          }
          this._configureAutoUpdate();
        }
        /** Stops the update loop when a pause event is triggered. */
        _onPlayStop() {
          this._configureAutoUpdate();
        }
        /** Handles behavior when the video completes seeking to the current playback position. */
        _onSeeked() {
          if (this._autoUpdate && !this._isSourcePlaying()) {
            this._msToNextUpdate = 0;
            this.updateFrame();
            this._msToNextUpdate = 0;
          }
        }
        _onCanPlay() {
          const source = this.resource;
          source.removeEventListener("canplay", this._onCanPlay);
          this._mediaReady();
        }
        _onCanPlayThrough() {
          const source = this.resource;
          source.removeEventListener("canplaythrough", this._onCanPlay);
          if (this._preloadTimeout) {
            clearTimeout(this._preloadTimeout);
            this._preloadTimeout = void 0;
          }
          this._mediaReady();
        }
        /** Fired when the video is loaded and ready to play. */
        _mediaReady() {
          const source = this.resource;
          if (this.isValid) {
            this.isReady = true;
            this.resize(source.videoWidth, source.videoHeight);
          }
          this._msToNextUpdate = 0;
          this.updateFrame();
          this._msToNextUpdate = 0;
          if (this._resolve) {
            this._resolve(this);
            this._resolve = null;
            this._reject = null;
          }
          if (this._isSourcePlaying()) {
            this._onPlayStart();
          } else if (this.autoPlay) {
            void this.resource.play();
          }
        }
        /** Cleans up resources and event listeners associated with this texture. */
        destroy() {
          this._configureAutoUpdate();
          const source = this.resource;
          if (source) {
            source.removeEventListener("play", this._onPlayStart);
            source.removeEventListener("pause", this._onPlayStop);
            source.removeEventListener("seeked", this._onSeeked);
            source.removeEventListener("canplay", this._onCanPlay);
            source.removeEventListener("canplaythrough", this._onCanPlayThrough);
            source.removeEventListener("error", this._onError, true);
            source.pause();
            source.src = "";
            source.load();
          }
          super.destroy();
        }
        /** Should the base texture automatically update itself, set to true by default. */
        get autoUpdate() {
          return this._autoUpdate;
        }
        set autoUpdate(value) {
          if (value !== this._autoUpdate) {
            this._autoUpdate = value;
            this._configureAutoUpdate();
          }
        }
        /**
         * How many times a second to update the texture from the video.
         * Leave at 0 to update at every render.
         * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
         */
        get updateFPS() {
          return this._updateFPS;
        }
        set updateFPS(value) {
          if (value !== this._updateFPS) {
            this._updateFPS = value;
            this._configureAutoUpdate();
          }
        }
        /**
         * Configures the updating mechanism based on the current state and settings.
         *
         * This method decides between using the browser's native video frame callback or a custom ticker
         * for updating the video frame. It ensures optimal performance and responsiveness
         * based on the video's state, playback status, and the desired frames-per-second setting.
         *
         * - If `_autoUpdate` is enabled and the video source is playing:
         *   - It will prefer the native video frame callback if available and no specific FPS is set.
         *   - Otherwise, it will use a custom ticker for manual updates.
         * - If `_autoUpdate` is disabled or the video isn't playing, any active update mechanisms are halted.
         */
        _configureAutoUpdate() {
          if (this._autoUpdate && this._isSourcePlaying()) {
            if (!this._updateFPS && this.resource.requestVideoFrameCallback) {
              if (this._isConnectedToTicker) {
                Ticker.shared.remove(this.updateFrame, this);
                this._isConnectedToTicker = false;
                this._msToNextUpdate = 0;
              }
              if (this._videoFrameRequestCallbackHandle === null) {
                this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(
                  this._videoFrameRequestCallback
                );
              }
            } else {
              if (this._videoFrameRequestCallbackHandle !== null) {
                this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle);
                this._videoFrameRequestCallbackHandle = null;
              }
              if (!this._isConnectedToTicker) {
                Ticker.shared.add(this.updateFrame, this);
                this._isConnectedToTicker = true;
                this._msToNextUpdate = 0;
              }
            }
          } else {
            if (this._videoFrameRequestCallbackHandle !== null) {
              this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle);
              this._videoFrameRequestCallbackHandle = null;
            }
            if (this._isConnectedToTicker) {
              Ticker.shared.remove(this.updateFrame, this);
              this._isConnectedToTicker = false;
              this._msToNextUpdate = 0;
            }
          }
        }
        static test(resource) {
          return globalThis.HTMLVideoElement && resource instanceof HTMLVideoElement;
        }
      };
      _VideoSource.extension = ExtensionType.TextureSource;
      _VideoSource.defaultOptions = {
        ...TextureSource.defaultOptions,
        /** If true, the video will start loading immediately. */
        autoLoad: true,
        /** If true, the video will start playing as soon as it is loaded. */
        autoPlay: true,
        /** The number of times a second to update the texture from the video. Leave at 0 to update at every render. */
        updateFPS: 0,
        /** If true, the video will be loaded with the `crossorigin` attribute. */
        crossorigin: true,
        /** If true, the video will loop when it ends. */
        loop: false,
        /** If true, the video will be muted. */
        muted: true,
        /** If true, the video will play inline. */
        playsinline: true,
        /** If true, the video will be preloaded. */
        preload: false
      };
      _VideoSource.MIME_TYPES = {
        ogv: "video/ogg",
        mov: "video/quicktime",
        m4v: "video/mp4"
      };
      VideoSource = _VideoSource;
    }
  });

  // node_modules/pixi.js/lib/assets/cache/Cache.mjs
  var CacheClass, Cache;
  var init_Cache = __esm({
    "node_modules/pixi.js/lib/assets/cache/Cache.mjs"() {
      init_warn();
      init_convertToList();
      CacheClass = class {
        constructor() {
          this._parsers = [];
          this._cache = /* @__PURE__ */ new Map();
          this._cacheMap = /* @__PURE__ */ new Map();
        }
        /** Clear all entries. */
        reset() {
          this._cacheMap.clear();
          this._cache.clear();
        }
        /**
         * Check if the key exists
         * @param key - The key to check
         */
        has(key) {
          return this._cache.has(key);
        }
        /**
         * Fetch entry by key
         * @param key - The key of the entry to get
         */
        get(key) {
          const result = this._cache.get(key);
          if (!result) {
            warn(`[Assets] Asset id ${key} was not found in the Cache`);
          }
          return result;
        }
        /**
         * Set a value by key or keys name
         * @param key - The key or keys to set
         * @param value - The value to store in the cache or from which cacheable assets will be derived.
         */
        set(key, value) {
          const keys = convertToList(key);
          let cacheableAssets;
          for (let i2 = 0; i2 < this.parsers.length; i2++) {
            const parser = this.parsers[i2];
            if (parser.test(value)) {
              cacheableAssets = parser.getCacheableAssets(keys, value);
              break;
            }
          }
          const cacheableMap = new Map(Object.entries(cacheableAssets || {}));
          if (!cacheableAssets) {
            keys.forEach((key2) => {
              cacheableMap.set(key2, value);
            });
          }
          const cacheKeys = [...cacheableMap.keys()];
          const cachedAssets = {
            cacheKeys,
            keys
          };
          keys.forEach((key2) => {
            this._cacheMap.set(key2, cachedAssets);
          });
          cacheKeys.forEach((key2) => {
            const val = cacheableAssets ? cacheableAssets[key2] : value;
            if (this._cache.has(key2) && this._cache.get(key2) !== val) {
              warn("[Cache] already has key:", key2);
            }
            this._cache.set(key2, cacheableMap.get(key2));
          });
        }
        /**
         * Remove entry by key
         *
         * This function will also remove any associated alias from the cache also.
         * @param key - The key of the entry to remove
         */
        remove(key) {
          if (!this._cacheMap.has(key)) {
            warn(`[Assets] Asset id ${key} was not found in the Cache`);
            return;
          }
          const cacheMap2 = this._cacheMap.get(key);
          const cacheKeys = cacheMap2.cacheKeys;
          cacheKeys.forEach((key2) => {
            this._cache.delete(key2);
          });
          cacheMap2.keys.forEach((key2) => {
            this._cacheMap.delete(key2);
          });
        }
        /** All loader parsers registered */
        get parsers() {
          return this._parsers;
        }
      };
      Cache = new CacheClass();
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/textureFrom.mjs
  function textureSourceFrom(options = {}) {
    const hasResource = options && options.resource;
    const res = hasResource ? options.resource : options;
    const opts = hasResource ? options : { resource: options };
    for (let i2 = 0; i2 < sources.length; i2++) {
      const Source = sources[i2];
      if (Source.test(res)) {
        return new Source(opts);
      }
    }
    throw new Error(`Could not find a source type for resource: ${opts.resource}`);
  }
  function resourceToTexture(options = {}, skipCache = false) {
    const hasResource = options && options.resource;
    const resource = hasResource ? options.resource : options;
    const opts = hasResource ? options : { resource: options };
    if (!skipCache && Cache.has(resource)) {
      return Cache.get(resource);
    }
    const texture = new Texture({ source: textureSourceFrom(opts) });
    texture.on("destroy", () => {
      if (Cache.has(resource)) {
        Cache.remove(resource);
      }
    });
    if (!skipCache) {
      Cache.set(resource, texture);
    }
    return texture;
  }
  function textureFrom(id, skipCache = false) {
    if (typeof id === "string") {
      return Cache.get(id);
    } else if (id instanceof TextureSource) {
      return new Texture({ source: id });
    }
    return resourceToTexture(id, skipCache);
  }
  var sources;
  var init_textureFrom = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/textureFrom.mjs"() {
      init_Cache();
      init_Extensions();
      init_TextureSource();
      init_Texture();
      sources = [];
      extensions.handleByList(ExtensionType.TextureSource, sources);
      Texture.from = textureFrom;
      TextureSource.from = textureSourceFrom;
    }
  });

  // node_modules/pixi.js/lib/rendering/init.mjs
  var init_init5 = __esm({
    "node_modules/pixi.js/lib/rendering/init.mjs"() {
      init_Extensions();
      init_AlphaMask();
      init_ColorMask();
      init_StencilMask();
      init_BufferImageSource();
      init_CanvasSource();
      init_ImageSource();
      init_VideoSource();
      init_textureFrom();
      extensions.add(AlphaMask, ColorMask, StencilMask, VideoSource, ImageSource, CanvasSource, BufferImageSource);
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/BindGroup.mjs
  var BindGroup;
  var init_BindGroup = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/BindGroup.mjs"() {
      "use strict";
      BindGroup = class {
        /**
         * Create a new instance eof the Bind Group.
         * @param resources - The resources that are bound together for use by a shader.
         */
        constructor(resources) {
          this.resources = /* @__PURE__ */ Object.create(null);
          this._dirty = true;
          let index = 0;
          for (const i2 in resources) {
            const resource = resources[i2];
            this.setResource(resource, index++);
          }
          this._updateKey();
        }
        /**
         * Updates the key if its flagged as dirty. This is used internally to
         * match this bind group to a WebGPU BindGroup.
         * @internal
         * @ignore
         */
        _updateKey() {
          if (!this._dirty)
            return;
          this._dirty = false;
          const keyParts = [];
          let index = 0;
          for (const i2 in this.resources) {
            keyParts[index++] = this.resources[i2]._resourceId;
          }
          this._key = keyParts.join("|");
        }
        /**
         * Set a resource at a given index. this function will
         * ensure that listeners will be removed from the current resource
         * and added to the new resource.
         * @param resource - The resource to set.
         * @param index - The index to set the resource at.
         */
        setResource(resource, index) {
          const currentResource = this.resources[index];
          if (resource === currentResource)
            return;
          if (currentResource) {
            resource.off?.("change", this.onResourceChange, this);
          }
          resource.on?.("change", this.onResourceChange, this);
          this.resources[index] = resource;
          this._dirty = true;
        }
        /**
         * Returns the resource at the current specified index.
         * @param index - The index of the resource to get.
         * @returns - The resource at the specified index.
         */
        getResource(index) {
          return this.resources[index];
        }
        /**
         * Used internally to 'touch' each resource, to ensure that the GC
         * knows that all resources in this bind group are still being used.
         * @param tick - The current tick.
         * @internal
         * @ignore
         */
        _touch(tick) {
          const resources = this.resources;
          for (const i2 in resources) {
            resources[i2]._touched = tick;
          }
        }
        /** Destroys this bind group and removes all listeners. */
        destroy() {
          const resources = this.resources;
          for (const i2 in resources) {
            const resource = resources[i2];
            resource.off?.("change", this.onResourceChange, this);
          }
          this.resources = null;
        }
        onResourceChange(resource) {
          this._dirty = true;
          if (resource.destroyed) {
            const resources = this.resources;
            for (const i2 in resources) {
              if (resources[i2] === resource) {
                resources[i2] = null;
              }
            }
          } else {
            this._updateKey();
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/getTestContext.mjs
  function getTestContext() {
    if (!context || context?.isContextLost()) {
      const canvas = DOMAdapter.get().createCanvas();
      context = canvas.getContext("webgl", {});
    }
    return context;
  }
  var context;
  var init_getTestContext = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/getTestContext.mjs"() {
      init_adapter();
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/gl/utils/checkMaxIfStatementsInShader.mjs
  function generateIfTestSrc(maxIfs) {
    let src = "";
    for (let i2 = 0; i2 < maxIfs; ++i2) {
      if (i2 > 0) {
        src += "\nelse ";
      }
      if (i2 < maxIfs - 1) {
        src += `if(test == ${i2}.0){}`;
      }
    }
    return src;
  }
  function checkMaxIfStatementsInShader(maxIfs, gl) {
    if (maxIfs === 0) {
      throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
    }
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    try {
      while (true) {
        const fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
        gl.shaderSource(shader, fragmentSrc);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          maxIfs = maxIfs / 2 | 0;
        } else {
          break;
        }
      }
    } finally {
      gl.deleteShader(shader);
    }
    return maxIfs;
  }
  var fragTemplate;
  var init_checkMaxIfStatementsInShader = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/gl/utils/checkMaxIfStatementsInShader.mjs"() {
      "use strict";
      fragTemplate = [
        "precision mediump float;",
        "void main(void){",
        "float test = 0.1;",
        "%forloop%",
        "gl_FragColor = vec4(0.0);",
        "}"
      ].join("\n");
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/gl/utils/maxRecommendedTextures.mjs
  function getMaxTexturesPerBatch() {
    if (maxTexturesPerBatchCache)
      return maxTexturesPerBatchCache;
    const gl = getTestContext();
    maxTexturesPerBatchCache = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    maxTexturesPerBatchCache = checkMaxIfStatementsInShader(
      maxTexturesPerBatchCache,
      gl
    );
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return maxTexturesPerBatchCache;
  }
  var maxTexturesPerBatchCache;
  var init_maxRecommendedTextures = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/gl/utils/maxRecommendedTextures.mjs"() {
      init_getTestContext();
      init_checkMaxIfStatementsInShader();
      maxTexturesPerBatchCache = null;
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/gpu/getTextureBatchBindGroup.mjs
  function getTextureBatchBindGroup(textures, size) {
    let uid2 = 2166136261;
    for (let i2 = 0; i2 < size; i2++) {
      uid2 ^= textures[i2].uid;
      uid2 = Math.imul(uid2, 16777619);
      uid2 >>>= 0;
    }
    return cachedGroups[uid2] || generateTextureBatchBindGroup(textures, size, uid2);
  }
  function generateTextureBatchBindGroup(textures, size, key) {
    const bindGroupResources = {};
    let bindIndex = 0;
    if (!maxTextures)
      maxTextures = getMaxTexturesPerBatch();
    for (let i2 = 0; i2 < maxTextures; i2++) {
      const texture = i2 < size ? textures[i2] : Texture.EMPTY.source;
      bindGroupResources[bindIndex++] = texture.source;
      bindGroupResources[bindIndex++] = texture.style;
    }
    const bindGroup = new BindGroup(bindGroupResources);
    cachedGroups[key] = bindGroup;
    return bindGroup;
  }
  var cachedGroups, maxTextures;
  var init_getTextureBatchBindGroup = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/gpu/getTextureBatchBindGroup.mjs"() {
      init_BindGroup();
      init_Texture();
      init_maxRecommendedTextures();
      cachedGroups = {};
      maxTextures = 0;
    }
  });

  // node_modules/pixi.js/lib/utils/data/ViewableBuffer.mjs
  var ViewableBuffer;
  var init_ViewableBuffer = __esm({
    "node_modules/pixi.js/lib/utils/data/ViewableBuffer.mjs"() {
      "use strict";
      ViewableBuffer = class {
        constructor(sizeOrBuffer) {
          if (typeof sizeOrBuffer === "number") {
            this.rawBinaryData = new ArrayBuffer(sizeOrBuffer);
          } else if (sizeOrBuffer instanceof Uint8Array) {
            this.rawBinaryData = sizeOrBuffer.buffer;
          } else {
            this.rawBinaryData = sizeOrBuffer;
          }
          this.uint32View = new Uint32Array(this.rawBinaryData);
          this.float32View = new Float32Array(this.rawBinaryData);
          this.size = this.rawBinaryData.byteLength;
        }
        /** View on the raw binary data as a `Int8Array`. */
        get int8View() {
          if (!this._int8View) {
            this._int8View = new Int8Array(this.rawBinaryData);
          }
          return this._int8View;
        }
        /** View on the raw binary data as a `Uint8Array`. */
        get uint8View() {
          if (!this._uint8View) {
            this._uint8View = new Uint8Array(this.rawBinaryData);
          }
          return this._uint8View;
        }
        /**  View on the raw binary data as a `Int16Array`. */
        get int16View() {
          if (!this._int16View) {
            this._int16View = new Int16Array(this.rawBinaryData);
          }
          return this._int16View;
        }
        /** View on the raw binary data as a `Int32Array`. */
        get int32View() {
          if (!this._int32View) {
            this._int32View = new Int32Array(this.rawBinaryData);
          }
          return this._int32View;
        }
        /** View on the raw binary data as a `Float64Array`. */
        get float64View() {
          if (!this._float64Array) {
            this._float64Array = new Float64Array(this.rawBinaryData);
          }
          return this._float64Array;
        }
        /** View on the raw binary data as a `BigUint64Array`. */
        get bigUint64View() {
          if (!this._bigUint64Array) {
            this._bigUint64Array = new BigUint64Array(this.rawBinaryData);
          }
          return this._bigUint64Array;
        }
        /**
         * Returns the view of the given type.
         * @param type - One of `int8`, `uint8`, `int16`,
         *    `uint16`, `int32`, `uint32`, and `float32`.
         * @returns - typed array of given type
         */
        view(type) {
          return this[`${type}View`];
        }
        /** Destroys all buffer references. Do not use after calling this. */
        destroy() {
          this.rawBinaryData = null;
          this._int8View = null;
          this._uint8View = null;
          this._int16View = null;
          this.uint16View = null;
          this._int32View = null;
          this.uint32View = null;
          this.float32View = null;
        }
        /**
         * Returns the size of the given type in bytes.
         * @param type - One of `int8`, `uint8`, `int16`,
         *   `uint16`, `int32`, `uint32`, and `float32`.
         * @returns - size of the type in bytes
         */
        static sizeOf(type) {
          switch (type) {
            case "int8":
            case "uint8":
              return 1;
            case "int16":
            case "uint16":
              return 2;
            case "int32":
            case "uint32":
            case "float32":
              return 4;
            default:
              throw new Error(`${type} isn't a valid view type`);
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/buffer/utils/fastCopy.mjs
  function fastCopy(sourceBuffer, destinationBuffer) {
    const lengthDouble = sourceBuffer.byteLength / 8 | 0;
    const sourceFloat64View = new Float64Array(sourceBuffer, 0, lengthDouble);
    const destinationFloat64View = new Float64Array(destinationBuffer, 0, lengthDouble);
    destinationFloat64View.set(sourceFloat64View);
    const remainingBytes = sourceBuffer.byteLength - lengthDouble * 8;
    if (remainingBytes > 0) {
      const sourceUint8View = new Uint8Array(sourceBuffer, lengthDouble * 8, remainingBytes);
      const destinationUint8View = new Uint8Array(destinationBuffer, lengthDouble * 8, remainingBytes);
      destinationUint8View.set(sourceUint8View);
    }
  }
  var init_fastCopy = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/buffer/utils/fastCopy.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/state/const.mjs
  var BLEND_TO_NPM;
  var init_const3 = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/state/const.mjs"() {
      "use strict";
      BLEND_TO_NPM = {
        normal: "normal-npm",
        add: "add-npm",
        screen: "screen-npm"
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/state/getAdjustedBlendModeBlend.mjs
  function getAdjustedBlendModeBlend(blendMode, textureSource) {
    if (textureSource.alphaMode === "no-premultiply-alpha") {
      return BLEND_TO_NPM[blendMode] || blendMode;
    }
    return blendMode;
  }
  var init_getAdjustedBlendModeBlend = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/state/getAdjustedBlendModeBlend.mjs"() {
      init_const3();
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/shared/BatchTextureArray.mjs
  var BatchTextureArray;
  var init_BatchTextureArray = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/shared/BatchTextureArray.mjs"() {
      "use strict";
      BatchTextureArray = class {
        constructor() {
          this.ids = /* @__PURE__ */ Object.create(null);
          this.textures = [];
          this.count = 0;
        }
        /** Clear the textures and their locations. */
        clear() {
          for (let i2 = 0; i2 < this.count; i2++) {
            const t2 = this.textures[i2];
            this.textures[i2] = null;
            this.ids[t2.uid] = null;
          }
          this.count = 0;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/shared/Batcher.mjs
  function getBatchFromPool() {
    return batchPoolIndex > 0 ? batchPool[--batchPoolIndex] : new Batch();
  }
  function returnBatchToPool(batch) {
    batchPool[batchPoolIndex++] = batch;
  }
  var Batch, batchPool, batchPoolIndex, BATCH_TICK, _Batcher, Batcher;
  var init_Batcher = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/shared/Batcher.mjs"() {
      init_uid();
      init_ViewableBuffer();
      init_fastCopy();
      init_getAdjustedBlendModeBlend();
      init_maxRecommendedTextures();
      init_BatchTextureArray();
      Batch = class {
        constructor() {
          this.renderPipeId = "batch";
          this.action = "startBatch";
          this.start = 0;
          this.size = 0;
          this.textures = new BatchTextureArray();
          this.blendMode = "normal";
          this.canBundle = true;
        }
        destroy() {
          this.textures = null;
          this.gpuBindGroup = null;
          this.bindGroup = null;
          this.batcher = null;
        }
      };
      batchPool = [];
      batchPoolIndex = 0;
      BATCH_TICK = 0;
      _Batcher = class _Batcher2 {
        constructor(options = {}) {
          this.uid = uid("batcher");
          this.dirty = true;
          this.batchIndex = 0;
          this.batches = [];
          this._elements = [];
          _Batcher2.defaultOptions.maxTextures = _Batcher2.defaultOptions.maxTextures ?? getMaxTexturesPerBatch();
          options = { ..._Batcher2.defaultOptions, ...options };
          const { maxTextures: maxTextures2, attributesInitialSize, indicesInitialSize } = options;
          this.attributeBuffer = new ViewableBuffer(attributesInitialSize * 4);
          this.indexBuffer = new Uint16Array(indicesInitialSize);
          this.maxTextures = maxTextures2;
        }
        begin() {
          this.elementSize = 0;
          this.elementStart = 0;
          this.indexSize = 0;
          this.attributeSize = 0;
          for (let i2 = 0; i2 < this.batchIndex; i2++) {
            returnBatchToPool(this.batches[i2]);
          }
          this.batchIndex = 0;
          this._batchIndexStart = 0;
          this._batchIndexSize = 0;
          this.dirty = true;
        }
        add(batchableObject) {
          this._elements[this.elementSize++] = batchableObject;
          batchableObject._indexStart = this.indexSize;
          batchableObject._attributeStart = this.attributeSize;
          batchableObject._batcher = this;
          this.indexSize += batchableObject.indexSize;
          this.attributeSize += batchableObject.attributeSize * this.vertexSize;
        }
        checkAndUpdateTexture(batchableObject, texture) {
          const textureId = batchableObject._batch.textures.ids[texture._source.uid];
          if (!textureId && textureId !== 0)
            return false;
          batchableObject._textureId = textureId;
          batchableObject.texture = texture;
          return true;
        }
        updateElement(batchableObject) {
          this.dirty = true;
          const attributeBuffer = this.attributeBuffer;
          if (batchableObject.packAsQuad) {
            this.packQuadAttributes(
              batchableObject,
              attributeBuffer.float32View,
              attributeBuffer.uint32View,
              batchableObject._attributeStart,
              batchableObject._textureId
            );
          } else {
            this.packAttributes(
              batchableObject,
              attributeBuffer.float32View,
              attributeBuffer.uint32View,
              batchableObject._attributeStart,
              batchableObject._textureId
            );
          }
        }
        /**
         * breaks the batcher. This happens when a batch gets too big,
         * or we need to switch to a different type of rendering (a filter for example)
         * @param instructionSet
         */
        break(instructionSet) {
          const elements = this._elements;
          if (!elements[this.elementStart])
            return;
          let batch = getBatchFromPool();
          let textureBatch = batch.textures;
          textureBatch.clear();
          const firstElement = elements[this.elementStart];
          let blendMode = getAdjustedBlendModeBlend(firstElement.blendMode, firstElement.texture._source);
          if (this.attributeSize * 4 > this.attributeBuffer.size) {
            this._resizeAttributeBuffer(this.attributeSize * 4);
          }
          if (this.indexSize > this.indexBuffer.length) {
            this._resizeIndexBuffer(this.indexSize);
          }
          const f32 = this.attributeBuffer.float32View;
          const u32 = this.attributeBuffer.uint32View;
          const indexBuffer = this.indexBuffer;
          let size = this._batchIndexSize;
          let start = this._batchIndexStart;
          let action = "startBatch";
          const maxTextures2 = this.maxTextures;
          for (let i2 = this.elementStart; i2 < this.elementSize; ++i2) {
            const element = elements[i2];
            elements[i2] = null;
            const texture = element.texture;
            const source = texture._source;
            const adjustedBlendMode = getAdjustedBlendModeBlend(element.blendMode, source);
            const breakRequired = blendMode !== adjustedBlendMode;
            if (source._batchTick === BATCH_TICK && !breakRequired) {
              element._textureId = source._textureBindLocation;
              size += element.indexSize;
              if (element.packAsQuad) {
                this.packQuadAttributes(
                  element,
                  f32,
                  u32,
                  element._attributeStart,
                  element._textureId
                );
                this.packQuadIndex(
                  indexBuffer,
                  element._indexStart,
                  element._attributeStart / this.vertexSize
                );
              } else {
                this.packAttributes(
                  element,
                  f32,
                  u32,
                  element._attributeStart,
                  element._textureId
                );
                this.packIndex(
                  element,
                  indexBuffer,
                  element._indexStart,
                  element._attributeStart / this.vertexSize
                );
              }
              element._batch = batch;
              continue;
            }
            source._batchTick = BATCH_TICK;
            if (textureBatch.count >= maxTextures2 || breakRequired) {
              this._finishBatch(
                batch,
                start,
                size - start,
                textureBatch,
                blendMode,
                instructionSet,
                action
              );
              action = "renderBatch";
              start = size;
              blendMode = adjustedBlendMode;
              batch = getBatchFromPool();
              textureBatch = batch.textures;
              textureBatch.clear();
              ++BATCH_TICK;
            }
            element._textureId = source._textureBindLocation = textureBatch.count;
            textureBatch.ids[source.uid] = textureBatch.count;
            textureBatch.textures[textureBatch.count++] = source;
            element._batch = batch;
            size += element.indexSize;
            if (element.packAsQuad) {
              this.packQuadAttributes(
                element,
                f32,
                u32,
                element._attributeStart,
                element._textureId
              );
              this.packQuadIndex(
                indexBuffer,
                element._indexStart,
                element._attributeStart / this.vertexSize
              );
            } else {
              this.packAttributes(
                element,
                f32,
                u32,
                element._attributeStart,
                element._textureId
              );
              this.packIndex(
                element,
                indexBuffer,
                element._indexStart,
                element._attributeStart / this.vertexSize
              );
            }
          }
          if (textureBatch.count > 0) {
            this._finishBatch(
              batch,
              start,
              size - start,
              textureBatch,
              blendMode,
              instructionSet,
              action
            );
            start = size;
            ++BATCH_TICK;
          }
          this.elementStart = this.elementSize;
          this._batchIndexStart = start;
          this._batchIndexSize = size;
        }
        _finishBatch(batch, indexStart, indexSize, textureBatch, blendMode, instructionSet, action) {
          batch.gpuBindGroup = null;
          batch.bindGroup = null;
          batch.action = action;
          batch.batcher = this;
          batch.textures = textureBatch;
          batch.blendMode = blendMode;
          batch.start = indexStart;
          batch.size = indexSize;
          ++BATCH_TICK;
          this.batches[this.batchIndex++] = batch;
          instructionSet.add(batch);
        }
        finish(instructionSet) {
          this.break(instructionSet);
        }
        /**
         * Resizes the attribute buffer to the given size (1 = 1 float32)
         * @param size - the size in vertices to ensure (not bytes!)
         */
        ensureAttributeBuffer(size) {
          if (size * 4 <= this.attributeBuffer.size)
            return;
          this._resizeAttributeBuffer(size * 4);
        }
        /**
         * Resizes the index buffer to the given size (1 = 1 float32)
         * @param size - the size in vertices to ensure (not bytes!)
         */
        ensureIndexBuffer(size) {
          if (size <= this.indexBuffer.length)
            return;
          this._resizeIndexBuffer(size);
        }
        _resizeAttributeBuffer(size) {
          const newSize = Math.max(size, this.attributeBuffer.size * 2);
          const newArrayBuffer = new ViewableBuffer(newSize);
          fastCopy(this.attributeBuffer.rawBinaryData, newArrayBuffer.rawBinaryData);
          this.attributeBuffer = newArrayBuffer;
        }
        _resizeIndexBuffer(size) {
          const indexBuffer = this.indexBuffer;
          let newSize = Math.max(size, indexBuffer.length * 1.5);
          newSize += newSize % 2;
          const newIndexBuffer = newSize > 65535 ? new Uint32Array(newSize) : new Uint16Array(newSize);
          if (newIndexBuffer.BYTES_PER_ELEMENT !== indexBuffer.BYTES_PER_ELEMENT) {
            for (let i2 = 0; i2 < indexBuffer.length; i2++) {
              newIndexBuffer[i2] = indexBuffer[i2];
            }
          } else {
            fastCopy(indexBuffer.buffer, newIndexBuffer.buffer);
          }
          this.indexBuffer = newIndexBuffer;
        }
        packQuadIndex(indexBuffer, index, indicesOffset) {
          indexBuffer[index] = indicesOffset + 0;
          indexBuffer[index + 1] = indicesOffset + 1;
          indexBuffer[index + 2] = indicesOffset + 2;
          indexBuffer[index + 3] = indicesOffset + 0;
          indexBuffer[index + 4] = indicesOffset + 2;
          indexBuffer[index + 5] = indicesOffset + 3;
        }
        packIndex(element, indexBuffer, index, indicesOffset) {
          const indices = element.indices;
          const size = element.indexSize;
          const indexOffset = element.indexOffset;
          const attributeOffset = element.attributeOffset;
          for (let i2 = 0; i2 < size; i2++) {
            indexBuffer[index++] = indicesOffset + indices[i2 + indexOffset] - attributeOffset;
          }
        }
        destroy() {
          for (let i2 = 0; i2 < this.batches.length; i2++) {
            returnBatchToPool(this.batches[i2]);
          }
          this.batches = null;
          for (let i2 = 0; i2 < this._elements.length; i2++) {
            this._elements[i2]._batch = null;
          }
          this._elements = null;
          this.indexBuffer = null;
          this.attributeBuffer.destroy();
          this.attributeBuffer = null;
        }
      };
      _Batcher.defaultOptions = {
        maxTextures: null,
        attributesInitialSize: 4,
        indicesInitialSize: 6
      };
      Batcher = _Batcher;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/buffer/const.mjs
  var BufferUsage;
  var init_const4 = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/buffer/const.mjs"() {
      "use strict";
      BufferUsage = /* @__PURE__ */ ((BufferUsage2) => {
        BufferUsage2[BufferUsage2["MAP_READ"] = 1] = "MAP_READ";
        BufferUsage2[BufferUsage2["MAP_WRITE"] = 2] = "MAP_WRITE";
        BufferUsage2[BufferUsage2["COPY_SRC"] = 4] = "COPY_SRC";
        BufferUsage2[BufferUsage2["COPY_DST"] = 8] = "COPY_DST";
        BufferUsage2[BufferUsage2["INDEX"] = 16] = "INDEX";
        BufferUsage2[BufferUsage2["VERTEX"] = 32] = "VERTEX";
        BufferUsage2[BufferUsage2["UNIFORM"] = 64] = "UNIFORM";
        BufferUsage2[BufferUsage2["STORAGE"] = 128] = "STORAGE";
        BufferUsage2[BufferUsage2["INDIRECT"] = 256] = "INDIRECT";
        BufferUsage2[BufferUsage2["QUERY_RESOLVE"] = 512] = "QUERY_RESOLVE";
        BufferUsage2[BufferUsage2["STATIC"] = 1024] = "STATIC";
        return BufferUsage2;
      })(BufferUsage || {});
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/buffer/Buffer.mjs
  var Buffer2;
  var init_Buffer = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/buffer/Buffer.mjs"() {
      init_eventemitter3();
      init_uid();
      init_const4();
      Buffer2 = class extends eventemitter3_default {
        /**
         * Creates a new Buffer with the given options
         * @param options - the options for the buffer
         */
        constructor(options) {
          let { data, size } = options;
          const { usage, label, shrinkToFit } = options;
          super();
          this.uid = uid("buffer");
          this._resourceType = "buffer";
          this._resourceId = uid("resource");
          this._touched = 0;
          this._updateID = 1;
          this.shrinkToFit = true;
          this.destroyed = false;
          if (data instanceof Array) {
            data = new Float32Array(data);
          }
          this._data = data;
          size = size ?? data?.byteLength;
          const mappedAtCreation = !!data;
          this.descriptor = {
            size,
            usage,
            mappedAtCreation,
            label
          };
          this.shrinkToFit = shrinkToFit ?? true;
        }
        /** the data in the buffer */
        get data() {
          return this._data;
        }
        set data(value) {
          this.setDataWithSize(value, value.length, true);
        }
        /** whether the buffer is static or not */
        get static() {
          return !!(this.descriptor.usage & BufferUsage.STATIC);
        }
        set static(value) {
          if (value) {
            this.descriptor.usage |= BufferUsage.STATIC;
          } else {
            this.descriptor.usage &= ~BufferUsage.STATIC;
          }
        }
        /**
         * Sets the data in the buffer to the given value. This will immediately update the buffer on the GPU.
         * If you only want to update a subset of the buffer, you can pass in the size of the data.
         * @param value - the data to set
         * @param size - the size of the data in bytes
         * @param syncGPU - should the buffer be updated on the GPU immediately?
         */
        setDataWithSize(value, size, syncGPU) {
          this._updateID++;
          this._updateSize = size * value.BYTES_PER_ELEMENT;
          if (this._data === value) {
            if (syncGPU)
              this.emit("update", this);
            return;
          }
          const oldData = this._data;
          this._data = value;
          if (oldData.length !== value.length) {
            if (!this.shrinkToFit && value.byteLength < oldData.byteLength) {
              if (syncGPU)
                this.emit("update", this);
            } else {
              this.descriptor.size = value.byteLength;
              this._resourceId = uid("resource");
              this.emit("change", this);
            }
            return;
          }
          if (syncGPU)
            this.emit("update", this);
        }
        /**
         * updates the buffer on the GPU to reflect the data in the buffer.
         * By default it will update the entire buffer. If you only want to update a subset of the buffer,
         * you can pass in the size of the buffer to update.
         * @param sizeInBytes - the new size of the buffer in bytes
         */
        update(sizeInBytes) {
          this._updateSize = sizeInBytes ?? this._updateSize;
          this._updateID++;
          this.emit("update", this);
        }
        /** Destroys the buffer */
        destroy() {
          this.destroyed = true;
          this.emit("destroy", this);
          this.emit("change", this);
          this._data = null;
          this.descriptor = null;
          this.removeAllListeners();
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/ensureIsBuffer.mjs
  function ensureIsBuffer(buffer, index) {
    if (!(buffer instanceof Buffer2)) {
      let usage = index ? BufferUsage.INDEX : BufferUsage.VERTEX;
      if (buffer instanceof Array) {
        if (index) {
          buffer = new Uint32Array(buffer);
          usage = BufferUsage.INDEX | BufferUsage.COPY_DST;
        } else {
          buffer = new Float32Array(buffer);
          usage = BufferUsage.VERTEX | BufferUsage.COPY_DST;
        }
      }
      buffer = new Buffer2({
        data: buffer,
        label: index ? "index-mesh-buffer" : "vertex-mesh-buffer",
        usage
      });
    }
    return buffer;
  }
  var init_ensureIsBuffer = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/ensureIsBuffer.mjs"() {
      init_Buffer();
      init_const4();
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/getGeometryBounds.mjs
  function getGeometryBounds(geometry, attributeId, bounds) {
    const attribute = geometry.getAttribute(attributeId);
    if (!attribute) {
      bounds.minX = 0;
      bounds.minY = 0;
      bounds.maxX = 0;
      bounds.maxY = 0;
      return bounds;
    }
    const data = attribute.buffer.data;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const byteSize = data.BYTES_PER_ELEMENT;
    const offset = (attribute.offset || 0) / byteSize;
    const stride = (attribute.stride || 2 * 4) / byteSize;
    for (let i2 = offset; i2 < data.length; i2 += stride) {
      const x2 = data[i2];
      const y2 = data[i2 + 1];
      if (x2 > maxX)
        maxX = x2;
      if (y2 > maxY)
        maxY = y2;
      if (x2 < minX)
        minX = x2;
      if (y2 < minY)
        minY = y2;
    }
    bounds.minX = minX;
    bounds.minY = minY;
    bounds.maxX = maxX;
    bounds.maxY = maxY;
    return bounds;
  }
  var init_getGeometryBounds = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/getGeometryBounds.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/geometry/Geometry.mjs
  function ensureIsAttribute(attribute) {
    if (attribute instanceof Buffer2 || Array.isArray(attribute) || attribute.BYTES_PER_ELEMENT) {
      attribute = {
        buffer: attribute
      };
    }
    attribute.buffer = ensureIsBuffer(attribute.buffer, false);
    return attribute;
  }
  var Geometry;
  var init_Geometry = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/geometry/Geometry.mjs"() {
      init_eventemitter3();
      init_Bounds();
      init_uid();
      init_Buffer();
      init_ensureIsBuffer();
      init_getGeometryBounds();
      Geometry = class extends eventemitter3_default {
        /**
         * Create a new instance of a geometry
         * @param options - The options for the geometry.
         */
        constructor(options) {
          const { attributes, indexBuffer, topology } = options;
          super();
          this.uid = uid("geometry");
          this._layoutKey = 0;
          this.instanceCount = 1;
          this._bounds = new Bounds();
          this._boundsDirty = true;
          this.attributes = attributes;
          this.buffers = [];
          this.instanceCount = options.instanceCount || 1;
          for (const i2 in attributes) {
            const attribute = attributes[i2] = ensureIsAttribute(attributes[i2]);
            const bufferIndex = this.buffers.indexOf(attribute.buffer);
            if (bufferIndex === -1) {
              this.buffers.push(attribute.buffer);
              attribute.buffer.on("update", this.onBufferUpdate, this);
              attribute.buffer.on("change", this.onBufferUpdate, this);
            }
          }
          if (indexBuffer) {
            this.indexBuffer = ensureIsBuffer(indexBuffer, true);
            this.buffers.push(this.indexBuffer);
          }
          this.topology = topology || "triangle-list";
        }
        onBufferUpdate() {
          this._boundsDirty = true;
          this.emit("update", this);
        }
        /**
         * Returns the requested attribute.
         * @param id - The name of the attribute required
         * @returns - The attribute requested.
         */
        getAttribute(id) {
          return this.attributes[id];
        }
        /**
         * Returns the index buffer
         * @returns - The index buffer.
         */
        getIndex() {
          return this.indexBuffer;
        }
        /**
         * Returns the requested buffer.
         * @param id - The name of the buffer required.
         * @returns - The buffer requested.
         */
        getBuffer(id) {
          return this.getAttribute(id).buffer;
        }
        /**
         * Used to figure out how many vertices there are in this geometry
         * @returns the number of vertices in the geometry
         */
        getSize() {
          for (const i2 in this.attributes) {
            const attribute = this.attributes[i2];
            const buffer = attribute.buffer;
            return buffer.data.length / (attribute.stride / 4 || attribute.size);
          }
          return 0;
        }
        /** Returns the bounds of the geometry. */
        get bounds() {
          if (!this._boundsDirty)
            return this._bounds;
          this._boundsDirty = false;
          return getGeometryBounds(this, "aPosition", this._bounds);
        }
        /**
         * destroys the geometry.
         * @param destroyBuffers - destroy the buffers associated with this geometry
         */
        destroy(destroyBuffers = false) {
          this.emit("destroy", this);
          this.removeAllListeners();
          if (destroyBuffers) {
            this.buffers.forEach((buffer) => buffer.destroy());
          }
          this.attributes = null;
          this.buffers = null;
          this.indexBuffer = null;
          this._bounds = null;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/shared/BatchGeometry.mjs
  var placeHolderBufferData, placeHolderIndexData, BatchGeometry;
  var init_BatchGeometry = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/shared/BatchGeometry.mjs"() {
      init_Buffer();
      init_const4();
      init_Geometry();
      placeHolderBufferData = new Float32Array(1);
      placeHolderIndexData = new Uint32Array(1);
      BatchGeometry = class extends Geometry {
        constructor() {
          const vertexSize = 6;
          const attributeBuffer = new Buffer2({
            data: placeHolderBufferData,
            label: "attribute-batch-buffer",
            usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
            shrinkToFit: false
          });
          const indexBuffer = new Buffer2({
            data: placeHolderIndexData,
            label: "index-batch-buffer",
            usage: BufferUsage.INDEX | BufferUsage.COPY_DST,
            // | BufferUsage.STATIC,
            shrinkToFit: false
          });
          const stride = vertexSize * 4;
          super({
            attributes: {
              aPosition: {
                buffer: attributeBuffer,
                format: "float32x2",
                stride,
                offset: 0
              },
              aUV: {
                buffer: attributeBuffer,
                format: "float32x2",
                stride,
                offset: 2 * 4
              },
              aColor: {
                buffer: attributeBuffer,
                format: "unorm8x4",
                stride,
                offset: 4 * 4
              },
              aTextureIdAndRound: {
                buffer: attributeBuffer,
                format: "uint16x2",
                stride,
                offset: 5 * 4
              }
            },
            indexBuffer
          });
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/utils/createIdFromString.mjs
  function createIdFromString(value, groupId) {
    let id = idHash2[value];
    if (id === void 0) {
      if (idCounts[groupId] === void 0) {
        idCounts[groupId] = 1;
      }
      idHash2[value] = id = idCounts[groupId]++;
    }
    return id;
  }
  var idCounts, idHash2;
  var init_createIdFromString = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/utils/createIdFromString.mjs"() {
      "use strict";
      idCounts = /* @__PURE__ */ Object.create(null);
      idHash2 = /* @__PURE__ */ Object.create(null);
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/getMaxFragmentPrecision.mjs
  function getMaxFragmentPrecision() {
    if (!maxFragmentPrecision) {
      maxFragmentPrecision = "mediump";
      const gl = getTestContext();
      if (gl) {
        if (gl.getShaderPrecisionFormat) {
          const shaderFragment = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
          maxFragmentPrecision = shaderFragment.precision ? "highp" : "mediump";
        }
      }
    }
    return maxFragmentPrecision;
  }
  var maxFragmentPrecision;
  var init_getMaxFragmentPrecision = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/getMaxFragmentPrecision.mjs"() {
      init_getTestContext();
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/addProgramDefines.mjs
  function addProgramDefines(src, isES300, isFragment) {
    if (isES300)
      return src;
    if (isFragment) {
      src = src.replace("out vec4 finalColor;", "");
      return `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${src}
        `;
    }
    return `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${src}
        `;
  }
  var init_addProgramDefines = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/addProgramDefines.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/ensurePrecision.mjs
  function ensurePrecision(src, options, isFragment) {
    const maxSupportedPrecision = isFragment ? options.maxSupportedFragmentPrecision : options.maxSupportedVertexPrecision;
    if (src.substring(0, 9) !== "precision") {
      let precision = isFragment ? options.requestedFragmentPrecision : options.requestedVertexPrecision;
      if (precision === "highp" && maxSupportedPrecision !== "highp") {
        precision = "mediump";
      }
      return `precision ${precision} float;
${src}`;
    } else if (maxSupportedPrecision !== "highp" && src.substring(0, 15) === "precision highp") {
      return src.replace("precision highp", "precision mediump");
    }
    return src;
  }
  var init_ensurePrecision = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/ensurePrecision.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/insertVersion.mjs
  function insertVersion(src, isES300) {
    if (!isES300)
      return src;
    return `#version 300 es
${src}`;
  }
  var init_insertVersion = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/insertVersion.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/setProgramName.mjs
  function setProgramName(src, { name = `pixi-program` }, isFragment = true) {
    name = name.replace(/\s+/g, "-");
    name += isFragment ? "-fragment" : "-vertex";
    const nameCache = isFragment ? fragmentNameCache : VertexNameCache;
    if (nameCache[name]) {
      nameCache[name]++;
      name += `-${nameCache[name]}`;
    } else {
      nameCache[name] = 1;
    }
    if (src.indexOf("#define SHADER_NAME") !== -1)
      return src;
    const shaderName = `#define SHADER_NAME ${name}`;
    return `${shaderName}
${src}`;
  }
  var fragmentNameCache, VertexNameCache;
  var init_setProgramName = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/setProgramName.mjs"() {
      "use strict";
      fragmentNameCache = {};
      VertexNameCache = {};
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/stripVersion.mjs
  function stripVersion(src, isES300) {
    if (!isES300)
      return src;
    return src.replace("#version 300 es", "");
  }
  var init_stripVersion = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/preprocessors/stripVersion.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/GlProgram.mjs
  var processes, programCache, _GlProgram, GlProgram;
  var init_GlProgram = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/GlProgram.mjs"() {
      init_createIdFromString();
      init_getMaxFragmentPrecision();
      init_addProgramDefines();
      init_ensurePrecision();
      init_insertVersion();
      init_setProgramName();
      init_stripVersion();
      processes = {
        // strips any version headers..
        stripVersion,
        // adds precision string if not already present
        ensurePrecision,
        // add some defines if WebGL1 to make it more compatible with WebGL2 shaders
        addProgramDefines,
        // add the program name to the shader
        setProgramName,
        // add the version string to the shader header
        insertVersion
      };
      programCache = /* @__PURE__ */ Object.create(null);
      _GlProgram = class _GlProgram2 {
        /**
         * Creates a shiny new GlProgram. Used by WebGL renderer.
         * @param options - The options for the program.
         */
        constructor(options) {
          options = { ..._GlProgram2.defaultOptions, ...options };
          const isES300 = options.fragment.indexOf("#version 300 es") !== -1;
          const preprocessorOptions = {
            stripVersion: isES300,
            ensurePrecision: {
              requestedFragmentPrecision: options.preferredFragmentPrecision,
              requestedVertexPrecision: options.preferredVertexPrecision,
              maxSupportedVertexPrecision: "highp",
              maxSupportedFragmentPrecision: getMaxFragmentPrecision()
            },
            setProgramName: {
              name: options.name
            },
            addProgramDefines: isES300,
            insertVersion: isES300
          };
          let fragment = options.fragment;
          let vertex = options.vertex;
          Object.keys(processes).forEach((processKey) => {
            const processOptions = preprocessorOptions[processKey];
            fragment = processes[processKey](fragment, processOptions, true);
            vertex = processes[processKey](vertex, processOptions, false);
          });
          this.fragment = fragment;
          this.vertex = vertex;
          this._key = createIdFromString(`${this.vertex}:${this.fragment}`, "gl-program");
        }
        /** destroys the program */
        destroy() {
          this.fragment = null;
          this.vertex = null;
          this._attributeData = null;
          this._uniformData = null;
          this._uniformBlockData = null;
          this.transformFeedbackVaryings = null;
        }
        /**
         * Helper function that creates a program for a given source.
         * It will check the program cache if the program has already been created.
         * If it has that one will be returned, if not a new one will be created and cached.
         * @param options - The options for the program.
         * @returns A program using the same source
         */
        static from(options) {
          const key = `${options.vertex}:${options.fragment}`;
          if (!programCache[key]) {
            programCache[key] = new _GlProgram2(options);
          }
          return programCache[key];
        }
      };
      _GlProgram.defaultOptions = {
        preferredVertexPrecision: "highp",
        preferredFragmentPrecision: "mediump"
      };
      GlProgram = _GlProgram;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/getAttributeInfoFromFormat.mjs
  function getAttributeInfoFromFormat(format) {
    return attributeFormatData[format] ?? attributeFormatData.float32;
  }
  var attributeFormatData;
  var init_getAttributeInfoFromFormat = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/getAttributeInfoFromFormat.mjs"() {
      "use strict";
      attributeFormatData = {
        uint8x2: { size: 2, stride: 2, normalised: false },
        uint8x4: { size: 4, stride: 4, normalised: false },
        sint8x2: { size: 2, stride: 2, normalised: false },
        sint8x4: { size: 4, stride: 4, normalised: false },
        unorm8x2: { size: 2, stride: 2, normalised: true },
        unorm8x4: { size: 4, stride: 4, normalised: true },
        snorm8x2: { size: 2, stride: 2, normalised: true },
        snorm8x4: { size: 4, stride: 4, normalised: true },
        uint16x2: { size: 2, stride: 4, normalised: false },
        uint16x4: { size: 4, stride: 8, normalised: false },
        sint16x2: { size: 2, stride: 4, normalised: false },
        sint16x4: { size: 4, stride: 8, normalised: false },
        unorm16x2: { size: 2, stride: 4, normalised: true },
        unorm16x4: { size: 4, stride: 8, normalised: true },
        snorm16x2: { size: 2, stride: 4, normalised: true },
        snorm16x4: { size: 4, stride: 8, normalised: true },
        float16x2: { size: 2, stride: 4, normalised: false },
        float16x4: { size: 4, stride: 8, normalised: false },
        float32: { size: 1, stride: 4, normalised: false },
        float32x2: { size: 2, stride: 8, normalised: false },
        float32x3: { size: 3, stride: 12, normalised: false },
        float32x4: { size: 4, stride: 16, normalised: false },
        uint32: { size: 1, stride: 4, normalised: false },
        uint32x2: { size: 2, stride: 8, normalised: false },
        uint32x3: { size: 3, stride: 12, normalised: false },
        uint32x4: { size: 4, stride: 16, normalised: false },
        sint32: { size: 1, stride: 4, normalised: false },
        sint32x2: { size: 2, stride: 8, normalised: false },
        sint32x3: { size: 3, stride: 12, normalised: false },
        sint32x4: { size: 4, stride: 16, normalised: false }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/extractAttributesFromGpuProgram.mjs
  function extractAttributesFromGpuProgram({ source, entryPoint }) {
    const results = {};
    const mainVertStart = source.indexOf(`fn ${entryPoint}`);
    if (mainVertStart !== -1) {
      const arrowFunctionStart = source.indexOf("->", mainVertStart);
      if (arrowFunctionStart !== -1) {
        const functionArgsSubstring = source.substring(mainVertStart, arrowFunctionStart);
        const inputsRegex = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
        let match;
        while ((match = inputsRegex.exec(functionArgsSubstring)) !== null) {
          const format = WGSL_TO_VERTEX_TYPES[match[3]] ?? "float32";
          results[match[2]] = {
            location: parseInt(match[1], 10),
            format,
            stride: getAttributeInfoFromFormat(format).stride,
            offset: 0,
            instance: false,
            start: 0
          };
        }
      }
    }
    return results;
  }
  var WGSL_TO_VERTEX_TYPES;
  var init_extractAttributesFromGpuProgram = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/extractAttributesFromGpuProgram.mjs"() {
      init_getAttributeInfoFromFormat();
      WGSL_TO_VERTEX_TYPES = {
        f32: "float32",
        "vec2<f32>": "float32x2",
        "vec3<f32>": "float32x3",
        "vec4<f32>": "float32x4",
        vec2f: "float32x2",
        vec3f: "float32x3",
        vec4f: "float32x4",
        i32: "sint32",
        "vec2<i32>": "sint32x2",
        "vec3<i32>": "sint32x3",
        "vec4<i32>": "sint32x4",
        u32: "uint32",
        "vec2<u32>": "uint32x2",
        "vec3<u32>": "uint32x3",
        "vec4<u32>": "uint32x4",
        bool: "uint32",
        "vec2<bool>": "uint32x2",
        "vec3<bool>": "uint32x3",
        "vec4<bool>": "uint32x4"
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/extractStructAndGroups.mjs
  function extractStructAndGroups(wgsl) {
    const linePattern = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g;
    const groupPattern = /@group\((\d+)\)/;
    const bindingPattern = /@binding\((\d+)\)/;
    const namePattern = /var(<[^>]+>)? (\w+)/;
    const typePattern = /:\s*(\w+)/;
    const structPattern = /struct\s+(\w+)\s*{([^}]+)}/g;
    const structMemberPattern = /(\w+)\s*:\s*([\w\<\>]+)/g;
    const structName = /struct\s+(\w+)/;
    const groups = wgsl.match(linePattern)?.map((item) => ({
      group: parseInt(item.match(groupPattern)[1], 10),
      binding: parseInt(item.match(bindingPattern)[1], 10),
      name: item.match(namePattern)[2],
      isUniform: item.match(namePattern)[1] === "<uniform>",
      type: item.match(typePattern)[1]
    }));
    if (!groups) {
      return {
        groups: [],
        structs: []
      };
    }
    const structs = wgsl.match(structPattern)?.map((struct) => {
      const name = struct.match(structName)[1];
      const members = struct.match(structMemberPattern).reduce((acc, member) => {
        const [name2, type] = member.split(":");
        acc[name2.trim()] = type.trim();
        return acc;
      }, {});
      if (!members) {
        return null;
      }
      return { name, members };
    }).filter(({ name }) => groups.some((group) => group.type === name)) ?? [];
    return {
      groups,
      structs
    };
  }
  var init_extractStructAndGroups = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/extractStructAndGroups.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/shader/const.mjs
  var ShaderStage;
  var init_const5 = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/shader/const.mjs"() {
      "use strict";
      ShaderStage = /* @__PURE__ */ ((ShaderStage2) => {
        ShaderStage2[ShaderStage2["VERTEX"] = 1] = "VERTEX";
        ShaderStage2[ShaderStage2["FRAGMENT"] = 2] = "FRAGMENT";
        ShaderStage2[ShaderStage2["COMPUTE"] = 4] = "COMPUTE";
        return ShaderStage2;
      })(ShaderStage || {});
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/generateGpuLayoutGroups.mjs
  function generateGpuLayoutGroups({ groups }) {
    const layout = [];
    for (let i2 = 0; i2 < groups.length; i2++) {
      const group = groups[i2];
      if (!layout[group.group]) {
        layout[group.group] = [];
      }
      if (group.isUniform) {
        layout[group.group].push({
          binding: group.binding,
          visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
          buffer: {
            type: "uniform"
          }
        });
      } else if (group.type === "sampler") {
        layout[group.group].push({
          binding: group.binding,
          visibility: ShaderStage.FRAGMENT,
          sampler: {
            type: "filtering"
          }
        });
      } else if (group.type === "texture_2d") {
        layout[group.group].push({
          binding: group.binding,
          visibility: ShaderStage.FRAGMENT,
          texture: {
            sampleType: "float",
            viewDimension: "2d",
            multisampled: false
          }
        });
      }
    }
    return layout;
  }
  var init_generateGpuLayoutGroups = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/generateGpuLayoutGroups.mjs"() {
      init_const5();
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/generateLayoutHash.mjs
  function generateLayoutHash({ groups }) {
    const layout = [];
    for (let i2 = 0; i2 < groups.length; i2++) {
      const group = groups[i2];
      if (!layout[group.group]) {
        layout[group.group] = {};
      }
      layout[group.group][group.name] = group.binding;
    }
    return layout;
  }
  var init_generateLayoutHash = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/generateLayoutHash.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/removeStructAndGroupDuplicates.mjs
  function removeStructAndGroupDuplicates(vertexStructsAndGroups, fragmentStructsAndGroups) {
    const structNameSet = /* @__PURE__ */ new Set();
    const dupeGroupKeySet = /* @__PURE__ */ new Set();
    const structs = [...vertexStructsAndGroups.structs, ...fragmentStructsAndGroups.structs].filter((struct) => {
      if (structNameSet.has(struct.name)) {
        return false;
      }
      structNameSet.add(struct.name);
      return true;
    });
    const groups = [...vertexStructsAndGroups.groups, ...fragmentStructsAndGroups.groups].filter((group) => {
      const key = `${group.name}-${group.binding}`;
      if (dupeGroupKeySet.has(key)) {
        return false;
      }
      dupeGroupKeySet.add(key);
      return true;
    });
    return { structs, groups };
  }
  var init_removeStructAndGroupDuplicates = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/utils/removeStructAndGroupDuplicates.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gpu/shader/GpuProgram.mjs
  var programCache2, GpuProgram;
  var init_GpuProgram = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gpu/shader/GpuProgram.mjs"() {
      init_createIdFromString();
      init_extractAttributesFromGpuProgram();
      init_extractStructAndGroups();
      init_generateGpuLayoutGroups();
      init_generateLayoutHash();
      init_removeStructAndGroupDuplicates();
      programCache2 = /* @__PURE__ */ Object.create(null);
      GpuProgram = class _GpuProgram {
        /**
         * Create a new GpuProgram
         * @param options - The options for the gpu program
         */
        constructor(options) {
          this._layoutKey = 0;
          this._attributeLocationsKey = 0;
          const { fragment, vertex, layout, gpuLayout, name } = options;
          this.name = name;
          this.fragment = fragment;
          this.vertex = vertex;
          if (fragment.source === vertex.source) {
            const structsAndGroups = extractStructAndGroups(fragment.source);
            this.structsAndGroups = structsAndGroups;
          } else {
            const vertexStructsAndGroups = extractStructAndGroups(vertex.source);
            const fragmentStructsAndGroups = extractStructAndGroups(fragment.source);
            this.structsAndGroups = removeStructAndGroupDuplicates(vertexStructsAndGroups, fragmentStructsAndGroups);
          }
          this.layout = layout ?? generateLayoutHash(this.structsAndGroups);
          this.gpuLayout = gpuLayout ?? generateGpuLayoutGroups(this.structsAndGroups);
          this.autoAssignGlobalUniforms = !!(this.layout[0]?.globalUniforms !== void 0);
          this.autoAssignLocalUniforms = !!(this.layout[1]?.localUniforms !== void 0);
          this._generateProgramKey();
        }
        // TODO maker this pure
        _generateProgramKey() {
          const { vertex, fragment } = this;
          const bigKey = vertex.source + fragment.source + vertex.entryPoint + fragment.entryPoint;
          this._layoutKey = createIdFromString(bigKey, "program");
        }
        get attributeData() {
          this._attributeData ?? (this._attributeData = extractAttributesFromGpuProgram(this.vertex));
          return this._attributeData;
        }
        /** destroys the program */
        destroy() {
          this.gpuLayout = null;
          this.layout = null;
          this.structsAndGroups = null;
          this.fragment = null;
          this.vertex = null;
        }
        /**
         * Helper function that creates a program for a given source.
         * It will check the program cache if the program has already been created.
         * If it has that one will be returned, if not a new one will be created and cached.
         * @param options - The options for the program.
         * @returns A program using the same source
         */
        static from(options) {
          const key = `${options.vertex.source}:${options.fragment.source}:${options.fragment.entryPoint}:${options.vertex.entryPoint}`;
          if (!programCache2[key]) {
            programCache2[key] = new _GpuProgram(options);
          }
          return programCache2[key];
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/addBits.mjs
  function addBits(srcParts, parts, name) {
    if (srcParts) {
      for (const i2 in srcParts) {
        const id = i2.toLocaleLowerCase();
        const part = parts[id];
        if (part) {
          let sanitisedPart = srcParts[i2];
          if (i2 === "header") {
            sanitisedPart = sanitisedPart.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "");
          }
          if (name) {
            part.push(`//----${name}----//`);
          }
          part.push(sanitisedPart);
        } else {
          warn(`${i2} placement hook does not exist in shader`);
        }
      }
    }
  }
  var init_addBits = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/addBits.mjs"() {
      init_warn();
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/compileHooks.mjs
  function compileHooks(programSrc) {
    const parts = {};
    const partMatches = programSrc.match(findHooksRx)?.map((hook) => hook.replace(/[{()}]/g, "")) ?? [];
    partMatches.forEach((hook) => {
      parts[hook] = [];
    });
    return parts;
  }
  var findHooksRx;
  var init_compileHooks = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/compileHooks.mjs"() {
      "use strict";
      findHooksRx = /\{\{(.*?)\}\}/g;
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/compileInputs.mjs
  function extractInputs(fragmentSource, out2) {
    let match;
    const regex = /@in\s+([^;]+);/g;
    while ((match = regex.exec(fragmentSource)) !== null) {
      out2.push(match[1]);
    }
  }
  function compileInputs(fragments, template, sort = false) {
    const results = [];
    extractInputs(template, results);
    fragments.forEach((fragment) => {
      if (fragment.header) {
        extractInputs(fragment.header, results);
      }
    });
    const mainInput = results;
    if (sort) {
      mainInput.sort();
    }
    const finalString = mainInput.map((inValue, i2) => `       @location(${i2}) ${inValue},`).join("\n");
    let cleanedString = template.replace(/@in\s+[^;]+;\s*/g, "");
    cleanedString = cleanedString.replace("{{in}}", `
${finalString}
`);
    return cleanedString;
  }
  var init_compileInputs = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/compileInputs.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/compileOutputs.mjs
  function extractOutputs(fragmentSource, out2) {
    let match;
    const regex = /@out\s+([^;]+);/g;
    while ((match = regex.exec(fragmentSource)) !== null) {
      out2.push(match[1]);
    }
  }
  function extractVariableName(value) {
    const regex = /\b(\w+)\s*:/g;
    const match = regex.exec(value);
    return match ? match[1] : "";
  }
  function stripVariable(value) {
    const regex = /@.*?\s+/g;
    return value.replace(regex, "");
  }
  function compileOutputs(fragments, template) {
    const results = [];
    extractOutputs(template, results);
    fragments.forEach((fragment) => {
      if (fragment.header) {
        extractOutputs(fragment.header, results);
      }
    });
    let index = 0;
    const mainStruct = results.sort().map((inValue) => {
      if (inValue.indexOf("builtin") > -1) {
        return inValue;
      }
      return `@location(${index++}) ${inValue}`;
    }).join(",\n");
    const mainStart = results.sort().map((inValue) => `       var ${stripVariable(inValue)};`).join("\n");
    const mainEnd = `return VSOutput(
                ${results.sort().map((inValue) => ` ${extractVariableName(inValue)}`).join(",\n")});`;
    let compiledCode = template.replace(/@out\s+[^;]+;\s*/g, "");
    compiledCode = compiledCode.replace("{{struct}}", `
${mainStruct}
`);
    compiledCode = compiledCode.replace("{{start}}", `
${mainStart}
`);
    compiledCode = compiledCode.replace("{{return}}", `
${mainEnd}
`);
    return compiledCode;
  }
  var init_compileOutputs = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/compileOutputs.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/injectBits.mjs
  function injectBits(templateSrc, fragmentParts) {
    let out2 = templateSrc;
    for (const i2 in fragmentParts) {
      const parts = fragmentParts[i2];
      const toInject = parts.join("\n");
      if (toInject.length) {
        out2 = out2.replace(`{{${i2}}}`, `//-----${i2} START-----//
${parts.join("\n")}
//----${i2} FINISH----//`);
      } else {
        out2 = out2.replace(`{{${i2}}}`, "");
      }
    }
    return out2;
  }
  var init_injectBits = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compiler/utils/injectBits.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compiler/compileHighShader.mjs
  function compileHighShader({
    template,
    bits
  }) {
    const cacheId = generateCacheId(template, bits);
    if (cacheMap[cacheId])
      return cacheMap[cacheId];
    const { vertex, fragment } = compileInputsAndOutputs(template, bits);
    cacheMap[cacheId] = compileBits(vertex, fragment, bits);
    return cacheMap[cacheId];
  }
  function compileHighShaderGl({
    template,
    bits
  }) {
    const cacheId = generateCacheId(template, bits);
    if (cacheMap[cacheId])
      return cacheMap[cacheId];
    cacheMap[cacheId] = compileBits(template.vertex, template.fragment, bits);
    return cacheMap[cacheId];
  }
  function compileInputsAndOutputs(template, bits) {
    const vertexFragments = bits.map((shaderBit) => shaderBit.vertex).filter((v2) => !!v2);
    const fragmentFragments = bits.map((shaderBit) => shaderBit.fragment).filter((v2) => !!v2);
    let compiledVertex = compileInputs(vertexFragments, template.vertex, true);
    compiledVertex = compileOutputs(vertexFragments, compiledVertex);
    const compiledFragment = compileInputs(fragmentFragments, template.fragment, true);
    return {
      vertex: compiledVertex,
      fragment: compiledFragment
    };
  }
  function generateCacheId(template, bits) {
    return bits.map((highFragment) => {
      if (!bitCacheMap.has(highFragment)) {
        bitCacheMap.set(highFragment, CACHE_UID++);
      }
      return bitCacheMap.get(highFragment);
    }).sort((a2, b2) => a2 - b2).join("-") + template.vertex + template.fragment;
  }
  function compileBits(vertex, fragment, bits) {
    const vertexParts = compileHooks(vertex);
    const fragmentParts = compileHooks(fragment);
    bits.forEach((shaderBit) => {
      addBits(shaderBit.vertex, vertexParts, shaderBit.name);
      addBits(shaderBit.fragment, fragmentParts, shaderBit.name);
    });
    return {
      vertex: injectBits(vertex, vertexParts),
      fragment: injectBits(fragment, fragmentParts)
    };
  }
  var cacheMap, bitCacheMap, CACHE_UID;
  var init_compileHighShader = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compiler/compileHighShader.mjs"() {
      init_addBits();
      init_compileHooks();
      init_compileInputs();
      init_compileOutputs();
      init_injectBits();
      cacheMap = /* @__PURE__ */ Object.create(null);
      bitCacheMap = /* @__PURE__ */ new Map();
      CACHE_UID = 0;
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/defaultProgramTemplate.mjs
  var vertexGPUTemplate, fragmentGPUTemplate, vertexGlTemplate, fragmentGlTemplate;
  var init_defaultProgramTemplate = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/defaultProgramTemplate.mjs"() {
      "use strict";
      vertexGPUTemplate = /* wgsl */
      `
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`;
      fragmentGPUTemplate = /* wgsl */
      `
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`;
      vertexGlTemplate = /* glsl */
      `
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`;
      fragmentGlTemplate = /* glsl */
      `
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
        
        {{end}}
    }
`;
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/shader-bits/globalUniformsBit.mjs
  var globalUniformsBit, globalUniformsBitGl;
  var init_globalUniformsBit = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/shader-bits/globalUniformsBit.mjs"() {
      "use strict";
      globalUniformsBit = {
        name: "global-uniforms-bit",
        vertex: {
          header: (
            /* wgsl */
            `
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `
          )
        }
      };
      globalUniformsBitGl = {
        name: "global-uniforms-bit",
        vertex: {
          header: (
            /* glsl */
            `
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/compileHighShaderToProgram.mjs
  function compileHighShaderGpuProgram({ bits, name }) {
    const source = compileHighShader({
      template: {
        fragment: fragmentGPUTemplate,
        vertex: vertexGPUTemplate
      },
      bits: [
        globalUniformsBit,
        ...bits
      ]
    });
    return GpuProgram.from({
      name,
      vertex: {
        source: source.vertex,
        entryPoint: "main"
      },
      fragment: {
        source: source.fragment,
        entryPoint: "main"
      }
    });
  }
  function compileHighShaderGlProgram({ bits, name }) {
    return new GlProgram({
      name,
      ...compileHighShaderGl({
        template: {
          vertex: vertexGlTemplate,
          fragment: fragmentGlTemplate
        },
        bits: [
          globalUniformsBitGl,
          ...bits
        ]
      })
    });
  }
  var init_compileHighShaderToProgram = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/compileHighShaderToProgram.mjs"() {
      init_GlProgram();
      init_GpuProgram();
      init_compileHighShader();
      init_defaultProgramTemplate();
      init_globalUniformsBit();
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/shader-bits/colorBit.mjs
  var colorBit, colorBitGl;
  var init_colorBit = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/shader-bits/colorBit.mjs"() {
      "use strict";
      colorBit = {
        name: "color-bit",
        vertex: {
          header: (
            /* wgsl */
            `
            @in aColor: vec4<f32>;
        `
          ),
          main: (
            /* wgsl */
            `
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `
          )
        }
      };
      colorBitGl = {
        name: "color-bit",
        vertex: {
          header: (
            /* glsl */
            `
            in vec4 aColor;
        `
          ),
          main: (
            /* glsl */
            `
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/shader-bits/generateTextureBatchBit.mjs
  function generateBindingSrc(maxTextures2) {
    const src = [];
    if (maxTextures2 === 1) {
      src.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;");
      src.push("@group(1) @binding(1) var textureSampler1: sampler;");
    } else {
      let bindingIndex = 0;
      for (let i2 = 0; i2 < maxTextures2; i2++) {
        src.push(`@group(1) @binding(${bindingIndex++}) var textureSource${i2 + 1}: texture_2d<f32>;`);
        src.push(`@group(1) @binding(${bindingIndex++}) var textureSampler${i2 + 1}: sampler;`);
      }
    }
    return src.join("\n");
  }
  function generateSampleSrc(maxTextures2) {
    const src = [];
    if (maxTextures2 === 1) {
      src.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");
    } else {
      src.push("switch vTextureId {");
      for (let i2 = 0; i2 < maxTextures2; i2++) {
        if (i2 === maxTextures2 - 1) {
          src.push(`  default:{`);
        } else {
          src.push(`  case ${i2}:{`);
        }
        src.push(`      outColor = textureSampleGrad(textureSource${i2 + 1}, textureSampler${i2 + 1}, vUV, uvDx, uvDy);`);
        src.push(`      break;}`);
      }
      src.push(`}`);
    }
    return src.join("\n");
  }
  function generateTextureBatchBit(maxTextures2) {
    if (!textureBatchBitGpuCache[maxTextures2]) {
      textureBatchBitGpuCache[maxTextures2] = {
        name: "texture-batch-bit",
        vertex: {
          header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
          main: `
                vTextureId = aTextureIdAndRound.y;
            `,
          end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `
        },
        fragment: {
          header: `
                @in @interpolate(flat) vTextureId: u32;

                ${generateBindingSrc(maxTextures2)}
            `,
          main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${generateSampleSrc(maxTextures2)}
            `
        }
      };
    }
    return textureBatchBitGpuCache[maxTextures2];
  }
  function generateSampleGlSrc(maxTextures2) {
    const src = [];
    for (let i2 = 0; i2 < maxTextures2; i2++) {
      if (i2 > 0) {
        src.push("else");
      }
      if (i2 < maxTextures2 - 1) {
        src.push(`if(vTextureId < ${i2}.5)`);
      }
      src.push("{");
      src.push(`	outColor = texture(uTextures[${i2}], vUV);`);
      src.push("}");
    }
    return src.join("\n");
  }
  function generateTextureBatchBitGl(maxTextures2) {
    if (!textureBatchBitGlCache[maxTextures2]) {
      textureBatchBitGlCache[maxTextures2] = {
        name: "texture-batch-bit",
        vertex: {
          header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,
          main: `
                vTextureId = aTextureIdAndRound.y;
            `,
          end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `
        },
        fragment: {
          header: `
                in float vTextureId;

                uniform sampler2D uTextures[${maxTextures2}];

            `,
          main: `

                ${generateSampleGlSrc(maxTextures2)}
            `
        }
      };
    }
    return textureBatchBitGlCache[maxTextures2];
  }
  var textureBatchBitGpuCache, textureBatchBitGlCache;
  var init_generateTextureBatchBit = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/shader-bits/generateTextureBatchBit.mjs"() {
      "use strict";
      textureBatchBitGpuCache = {};
      textureBatchBitGlCache = {};
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/shader-bits/roundPixelsBit.mjs
  var roundPixelsBit, roundPixelsBitGl;
  var init_roundPixelsBit = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/shader-bits/roundPixelsBit.mjs"() {
      "use strict";
      roundPixelsBit = {
        name: "round-pixels-bit",
        vertex: {
          header: (
            /* wgsl */
            `
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
          )
        }
      };
      roundPixelsBitGl = {
        name: "round-pixels-bit",
        vertex: {
          header: (
            /* glsl */
            `   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/shader/types.mjs
  var UNIFORM_TYPES_VALUES, UNIFORM_TYPES_MAP;
  var init_types = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/shader/types.mjs"() {
      "use strict";
      UNIFORM_TYPES_VALUES = [
        "f32",
        "i32",
        "vec2<f32>",
        "vec3<f32>",
        "vec4<f32>",
        "mat2x2<f32>",
        "mat3x3<f32>",
        "mat4x4<f32>",
        "mat3x2<f32>",
        "mat4x2<f32>",
        "mat2x3<f32>",
        "mat4x3<f32>",
        "mat2x4<f32>",
        "mat3x4<f32>"
      ];
      UNIFORM_TYPES_MAP = UNIFORM_TYPES_VALUES.reduce((acc, type) => {
        acc[type] = true;
        return acc;
      }, {});
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/shader/utils/getDefaultUniformValue.mjs
  function getDefaultUniformValue(type, size) {
    switch (type) {
      case "f32":
        return 0;
      case "vec2<f32>":
        return new Float32Array(2 * size);
      case "vec3<f32>":
        return new Float32Array(3 * size);
      case "vec4<f32>":
        return new Float32Array(4 * size);
      case "mat2x2<f32>":
        return new Float32Array([
          1,
          0,
          0,
          1
        ]);
      case "mat3x3<f32>":
        return new Float32Array([
          1,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1
        ]);
      case "mat4x4<f32>":
        return new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1
        ]);
    }
    return null;
  }
  var init_getDefaultUniformValue = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/shader/utils/getDefaultUniformValue.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs
  var _UniformGroup, UniformGroup;
  var init_UniformGroup = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/shader/UniformGroup.mjs"() {
      init_uid();
      init_createIdFromString();
      init_types();
      init_getDefaultUniformValue();
      _UniformGroup = class _UniformGroup2 {
        /**
         * Create a new Uniform group
         * @param uniformStructures - The structures of the uniform group
         * @param options - The optional parameters of this uniform group
         */
        constructor(uniformStructures, options) {
          this._touched = 0;
          this.uid = uid("uniform");
          this._resourceType = "uniformGroup";
          this._resourceId = uid("resource");
          this.isUniformGroup = true;
          this._dirtyId = 0;
          this.destroyed = false;
          options = { ..._UniformGroup2.defaultOptions, ...options };
          this.uniformStructures = uniformStructures;
          const uniforms = {};
          for (const i2 in uniformStructures) {
            const uniformData = uniformStructures[i2];
            uniformData.name = i2;
            uniformData.size = uniformData.size ?? 1;
            if (!UNIFORM_TYPES_MAP[uniformData.type]) {
              throw new Error(`Uniform type ${uniformData.type} is not supported. Supported uniform types are: ${UNIFORM_TYPES_VALUES.join(", ")}`);
            }
            uniformData.value ?? (uniformData.value = getDefaultUniformValue(uniformData.type, uniformData.size));
            uniforms[i2] = uniformData.value;
          }
          this.uniforms = uniforms;
          this._dirtyId = 1;
          this.ubo = options.ubo;
          this.isStatic = options.isStatic;
          this._signature = createIdFromString(Object.keys(uniforms).map(
            (i2) => `${i2}-${uniformStructures[i2].type}`
          ).join("-"), "uniform-group");
        }
        /** Call this if you want the uniform groups data to be uploaded to the GPU only useful if `isStatic` is true. */
        update() {
          this._dirtyId++;
        }
      };
      _UniformGroup.defaultOptions = {
        /** if true the UniformGroup is handled as an Uniform buffer object. */
        ubo: false,
        /** if true, then you are responsible for when the data is uploaded to the GPU by calling `update()` */
        isStatic: false
      };
      UniformGroup = _UniformGroup;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/gl/shader/getBatchSamplersUniformGroup.mjs
  function getBatchSamplersUniformGroup(maxTextures2) {
    let batchSamplersUniformGroup = batchSamplersUniformGroupHash[maxTextures2];
    if (batchSamplersUniformGroup)
      return batchSamplersUniformGroup;
    const sampleValues = new Int32Array(maxTextures2);
    for (let i2 = 0; i2 < maxTextures2; i2++) {
      sampleValues[i2] = i2;
    }
    batchSamplersUniformGroup = batchSamplersUniformGroupHash[maxTextures2] = new UniformGroup({
      uTextures: { value: sampleValues, type: `i32`, size: maxTextures2 }
    }, { isStatic: true });
    return batchSamplersUniformGroup;
  }
  var batchSamplersUniformGroupHash;
  var init_getBatchSamplersUniformGroup = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/gl/shader/getBatchSamplersUniformGroup.mjs"() {
      init_UniformGroup();
      batchSamplersUniformGroupHash = {};
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/types.mjs
  var RendererType;
  var init_types2 = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/types.mjs"() {
      "use strict";
      RendererType = /* @__PURE__ */ ((RendererType2) => {
        RendererType2[RendererType2["WEBGL"] = 1] = "WEBGL";
        RendererType2[RendererType2["WEBGPU"] = 2] = "WEBGPU";
        RendererType2[RendererType2["BOTH"] = 3] = "BOTH";
        return RendererType2;
      })(RendererType || {});
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/shader/Shader.mjs
  var Shader;
  var init_Shader = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/shader/Shader.mjs"() {
      init_eventemitter3();
      init_GlProgram();
      init_BindGroup();
      init_GpuProgram();
      init_types2();
      init_UniformGroup();
      Shader = class _Shader extends eventemitter3_default {
        constructor(options) {
          super();
          this._uniformBindMap = /* @__PURE__ */ Object.create(null);
          this._ownedBindGroups = [];
          let {
            gpuProgram: gpuProgram3,
            glProgram: glProgram3,
            groups,
            resources,
            compatibleRenderers,
            groupMap
          } = options;
          this.gpuProgram = gpuProgram3;
          this.glProgram = glProgram3;
          if (compatibleRenderers === void 0) {
            compatibleRenderers = 0;
            if (gpuProgram3)
              compatibleRenderers |= RendererType.WEBGPU;
            if (glProgram3)
              compatibleRenderers |= RendererType.WEBGL;
          }
          this.compatibleRenderers = compatibleRenderers;
          const nameHash = {};
          if (!resources && !groups) {
            resources = {};
          }
          if (resources && groups) {
            throw new Error("[Shader] Cannot have both resources and groups");
          } else if (!gpuProgram3 && groups && !groupMap) {
            throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");
          } else if (!gpuProgram3 && groups && groupMap) {
            for (const i2 in groupMap) {
              for (const j2 in groupMap[i2]) {
                const uniformName = groupMap[i2][j2];
                nameHash[uniformName] = {
                  group: i2,
                  binding: j2,
                  name: uniformName
                };
              }
            }
          } else if (gpuProgram3 && groups && !groupMap) {
            const groupData = gpuProgram3.structsAndGroups.groups;
            groupMap = {};
            groupData.forEach((data) => {
              groupMap[data.group] = groupMap[data.group] || {};
              groupMap[data.group][data.binding] = data.name;
              nameHash[data.name] = data;
            });
          } else if (resources) {
            groups = {};
            groupMap = {};
            if (gpuProgram3) {
              const groupData = gpuProgram3.structsAndGroups.groups;
              groupData.forEach((data) => {
                groupMap[data.group] = groupMap[data.group] || {};
                groupMap[data.group][data.binding] = data.name;
                nameHash[data.name] = data;
              });
            }
            let bindTick = 0;
            for (const i2 in resources) {
              if (nameHash[i2])
                continue;
              if (!groups[99]) {
                groups[99] = new BindGroup();
                this._ownedBindGroups.push(groups[99]);
              }
              nameHash[i2] = { group: 99, binding: bindTick, name: i2 };
              groupMap[99] = groupMap[99] || {};
              groupMap[99][bindTick] = i2;
              bindTick++;
            }
            for (const i2 in resources) {
              const name = i2;
              let value = resources[i2];
              if (!value.source && !value._resourceType) {
                value = new UniformGroup(value);
              }
              const data = nameHash[name];
              if (data) {
                if (!groups[data.group]) {
                  groups[data.group] = new BindGroup();
                  this._ownedBindGroups.push(groups[data.group]);
                }
                groups[data.group].setResource(value, data.binding);
              }
            }
          }
          this.groups = groups;
          this._uniformBindMap = groupMap;
          this.resources = this._buildResourceAccessor(groups, nameHash);
        }
        /**
         * Sometimes a resource group will be provided later (for example global uniforms)
         * In such cases, this method can be used to let the shader know about the group.
         * @param name - the name of the resource group
         * @param groupIndex - the index of the group (should match the webGPU shader group location)
         * @param bindIndex - the index of the bind point (should match the webGPU shader bind point)
         */
        addResource(name, groupIndex, bindIndex) {
          var _a, _b;
          (_a = this._uniformBindMap)[groupIndex] || (_a[groupIndex] = {});
          (_b = this._uniformBindMap[groupIndex])[bindIndex] || (_b[bindIndex] = name);
          if (!this.groups[groupIndex]) {
            this.groups[groupIndex] = new BindGroup();
            this._ownedBindGroups.push(this.groups[groupIndex]);
          }
        }
        _buildResourceAccessor(groups, nameHash) {
          const uniformsOut = {};
          for (const i2 in nameHash) {
            const data = nameHash[i2];
            Object.defineProperty(uniformsOut, data.name, {
              get() {
                return groups[data.group].getResource(data.binding);
              },
              set(value) {
                groups[data.group].setResource(value, data.binding);
              }
            });
          }
          return uniformsOut;
        }
        /**
         * Use to destroy the shader when its not longer needed.
         * It will destroy the resources and remove listeners.
         * @param destroyPrograms - if the programs should be destroyed as well.
         * Make sure its not being used by other shaders!
         */
        destroy(destroyPrograms = false) {
          this.emit("destroy", this);
          if (destroyPrograms) {
            this.gpuProgram?.destroy();
            this.glProgram?.destroy();
          }
          this.gpuProgram = null;
          this.glProgram = null;
          this.removeAllListeners();
          this._uniformBindMap = null;
          this._ownedBindGroups.forEach((bindGroup) => {
            bindGroup.destroy();
          });
          this._ownedBindGroups = null;
          this.resources = null;
          this.groups = null;
        }
        static from(options) {
          const { gpu, gl, ...rest } = options;
          let gpuProgram3;
          let glProgram3;
          if (gpu) {
            gpuProgram3 = GpuProgram.from(gpu);
          }
          if (gl) {
            glProgram3 = GlProgram.from(gl);
          }
          return new _Shader({
            gpuProgram: gpuProgram3,
            glProgram: glProgram3,
            ...rest
          });
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/shared/DefaultShader.mjs
  var DefaultShader;
  var init_DefaultShader = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/shared/DefaultShader.mjs"() {
      init_compileHighShaderToProgram();
      init_colorBit();
      init_generateTextureBatchBit();
      init_roundPixelsBit();
      init_getBatchSamplersUniformGroup();
      init_Shader();
      DefaultShader = class extends Shader {
        constructor(maxTextures2) {
          const glProgram3 = compileHighShaderGlProgram({
            name: "batch",
            bits: [
              colorBitGl,
              generateTextureBatchBitGl(maxTextures2),
              roundPixelsBitGl
            ]
          });
          const gpuProgram3 = compileHighShaderGpuProgram({
            name: "batch",
            bits: [
              colorBit,
              generateTextureBatchBit(maxTextures2),
              roundPixelsBit
            ]
          });
          super({
            glProgram: glProgram3,
            gpuProgram: gpuProgram3,
            resources: {
              batchSamplers: getBatchSamplersUniformGroup(maxTextures2)
            }
          });
        }
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/batcher/shared/DefaultBatcher.mjs
  var defaultShader, _DefaultBatcher, DefaultBatcher;
  var init_DefaultBatcher = __esm({
    "node_modules/pixi.js/lib/rendering/batcher/shared/DefaultBatcher.mjs"() {
      init_Extensions();
      init_Batcher();
      init_BatchGeometry();
      init_DefaultShader();
      defaultShader = null;
      _DefaultBatcher = class _DefaultBatcher2 extends Batcher {
        constructor() {
          super(...arguments);
          this.geometry = new BatchGeometry();
          this.shader = defaultShader || (defaultShader = new DefaultShader(this.maxTextures));
          this.name = _DefaultBatcher2.extension.name;
          this.vertexSize = 6;
        }
        /**
         * Packs the attributes of a DefaultBatchableMeshElement into the provided views.
         * @param element - The DefaultBatchableMeshElement to pack.
         * @param float32View - The Float32Array view to pack into.
         * @param uint32View - The Uint32Array view to pack into.
         * @param index - The starting index in the views.
         * @param textureId - The texture ID to use.
         */
        packAttributes(element, float32View, uint32View, index, textureId) {
          const textureIdAndRound = textureId << 16 | element.roundPixels & 65535;
          const wt = element.transform;
          const a2 = wt.a;
          const b2 = wt.b;
          const c2 = wt.c;
          const d2 = wt.d;
          const tx = wt.tx;
          const ty = wt.ty;
          const { positions, uvs } = element;
          const argb = element.color;
          const offset = element.attributeOffset;
          const end = offset + element.attributeSize;
          for (let i2 = offset; i2 < end; i2++) {
            const i22 = i2 * 2;
            const x2 = positions[i22];
            const y2 = positions[i22 + 1];
            float32View[index++] = a2 * x2 + c2 * y2 + tx;
            float32View[index++] = d2 * y2 + b2 * x2 + ty;
            float32View[index++] = uvs[i22];
            float32View[index++] = uvs[i22 + 1];
            uint32View[index++] = argb;
            uint32View[index++] = textureIdAndRound;
          }
        }
        /**
         * Packs the attributes of a DefaultBatchableQuadElement into the provided views.
         * @param element - The DefaultBatchableQuadElement to pack.
         * @param float32View - The Float32Array view to pack into.
         * @param uint32View - The Uint32Array view to pack into.
         * @param index - The starting index in the views.
         * @param textureId - The texture ID to use.
         */
        packQuadAttributes(element, float32View, uint32View, index, textureId) {
          const texture = element.texture;
          const wt = element.transform;
          const a2 = wt.a;
          const b2 = wt.b;
          const c2 = wt.c;
          const d2 = wt.d;
          const tx = wt.tx;
          const ty = wt.ty;
          const bounds = element.bounds;
          const w0 = bounds.maxX;
          const w1 = bounds.minX;
          const h0 = bounds.maxY;
          const h1 = bounds.minY;
          const uvs = texture.uvs;
          const argb = element.color;
          const textureIdAndRound = textureId << 16 | element.roundPixels & 65535;
          float32View[index + 0] = a2 * w1 + c2 * h1 + tx;
          float32View[index + 1] = d2 * h1 + b2 * w1 + ty;
          float32View[index + 2] = uvs.x0;
          float32View[index + 3] = uvs.y0;
          uint32View[index + 4] = argb;
          uint32View[index + 5] = textureIdAndRound;
          float32View[index + 6] = a2 * w0 + c2 * h1 + tx;
          float32View[index + 7] = d2 * h1 + b2 * w0 + ty;
          float32View[index + 8] = uvs.x1;
          float32View[index + 9] = uvs.y1;
          uint32View[index + 10] = argb;
          uint32View[index + 11] = textureIdAndRound;
          float32View[index + 12] = a2 * w0 + c2 * h0 + tx;
          float32View[index + 13] = d2 * h0 + b2 * w0 + ty;
          float32View[index + 14] = uvs.x2;
          float32View[index + 15] = uvs.y2;
          uint32View[index + 16] = argb;
          uint32View[index + 17] = textureIdAndRound;
          float32View[index + 18] = a2 * w1 + c2 * h0 + tx;
          float32View[index + 19] = d2 * h0 + b2 * w1 + ty;
          float32View[index + 20] = uvs.x3;
          float32View[index + 21] = uvs.y3;
          uint32View[index + 22] = argb;
          uint32View[index + 23] = textureIdAndRound;
        }
      };
      _DefaultBatcher.extension = {
        type: [
          ExtensionType.Batcher
        ],
        name: "default"
      };
      DefaultBatcher = _DefaultBatcher;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/buildUvs.mjs
  function buildUvs(vertices, verticesStride, verticesOffset, uvs, uvsOffset, uvsStride, size, matrix = null) {
    let index = 0;
    verticesOffset *= verticesStride;
    uvsOffset *= uvsStride;
    const a2 = matrix.a;
    const b2 = matrix.b;
    const c2 = matrix.c;
    const d2 = matrix.d;
    const tx = matrix.tx;
    const ty = matrix.ty;
    while (index < size) {
      const x2 = vertices[verticesOffset];
      const y2 = vertices[verticesOffset + 1];
      uvs[uvsOffset] = a2 * x2 + c2 * y2 + tx;
      uvs[uvsOffset + 1] = b2 * x2 + d2 * y2 + ty;
      uvsOffset += uvsStride;
      verticesOffset += verticesStride;
      index++;
    }
  }
  function buildSimpleUvs(uvs, uvsOffset, uvsStride, size) {
    let index = 0;
    uvsOffset *= uvsStride;
    while (index < size) {
      uvs[uvsOffset] = 0;
      uvs[uvsOffset + 1] = 0;
      uvsOffset += uvsStride;
      index++;
    }
  }
  var init_buildUvs = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/buildUvs.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/transformVertices.mjs
  function transformVertices(vertices, m2, offset, stride, size) {
    const a2 = m2.a;
    const b2 = m2.b;
    const c2 = m2.c;
    const d2 = m2.d;
    const tx = m2.tx;
    const ty = m2.ty;
    offset = offset || 0;
    stride = stride || 2;
    size = size || vertices.length / stride - offset;
    let index = offset * stride;
    for (let i2 = 0; i2 < size; i2++) {
      const x2 = vertices[index];
      const y2 = vertices[index + 1];
      vertices[index] = a2 * x2 + c2 * y2 + tx;
      vertices[index + 1] = b2 * x2 + d2 * y2 + ty;
      index += stride;
    }
  }
  var init_transformVertices = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/transformVertices.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/container/utils/multiplyHexColors.mjs
  function multiplyHexColors(color1, color2) {
    if (color1 === 16777215 || !color2)
      return color2;
    if (color2 === 16777215 || !color1)
      return color1;
    const r1 = color1 >> 16 & 255;
    const g1 = color1 >> 8 & 255;
    const b1 = color1 & 255;
    const r2 = color2 >> 16 & 255;
    const g2 = color2 >> 8 & 255;
    const b2 = color2 & 255;
    const r3 = r1 * r2 / 255;
    const g3 = g1 * g2 / 255;
    const b3 = b1 * b2 / 255;
    return (r3 << 16) + (g3 << 8) + b3;
  }
  var init_multiplyHexColors = __esm({
    "node_modules/pixi.js/lib/scene/container/utils/multiplyHexColors.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/BatchableGraphics.mjs
  var identityMatrix2, BatchableGraphics;
  var init_BatchableGraphics = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/BatchableGraphics.mjs"() {
      init_Matrix();
      init_multiplyHexColors();
      identityMatrix2 = new Matrix();
      BatchableGraphics = class {
        constructor() {
          this.packAsQuad = false;
          this.batcherName = "default";
          this.applyTransform = true;
          this.roundPixels = 0;
          this._batcher = null;
          this._batch = null;
        }
        get uvs() {
          return this.geometryData.uvs;
        }
        get positions() {
          return this.geometryData.vertices;
        }
        get indices() {
          return this.geometryData.indices;
        }
        get blendMode() {
          if (this.applyTransform) {
            return this.renderable.groupBlendMode;
          }
          return "normal";
        }
        get color() {
          const rgb = this.baseColor;
          const bgr = rgb >> 16 | rgb & 65280 | (rgb & 255) << 16;
          const renderable = this.renderable;
          if (renderable) {
            return multiplyHexColors(bgr, renderable.groupColor) + (this.alpha * renderable.groupAlpha * 255 << 24);
          }
          return bgr + (this.alpha * 255 << 24);
        }
        get transform() {
          return this.renderable?.groupTransform || identityMatrix2;
        }
        copyTo(gpuBuffer) {
          gpuBuffer.indexOffset = this.indexOffset;
          gpuBuffer.indexSize = this.indexSize;
          gpuBuffer.attributeOffset = this.attributeOffset;
          gpuBuffer.attributeSize = this.attributeSize;
          gpuBuffer.baseColor = this.baseColor;
          gpuBuffer.alpha = this.alpha;
          gpuBuffer.texture = this.texture;
          gpuBuffer.geometryData = this.geometryData;
        }
        reset() {
          this.applyTransform = true;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildCircle.mjs
  var buildCircle, buildEllipse, buildRoundedRectangle;
  var init_buildCircle = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildCircle.mjs"() {
      init_Extensions();
      buildCircle = {
        extension: {
          type: ExtensionType.ShapeBuilder,
          name: "circle"
        },
        build(shape, points) {
          let x2;
          let y2;
          let dx;
          let dy;
          let rx;
          let ry;
          if (shape.type === "circle") {
            const circle = shape;
            x2 = circle.x;
            y2 = circle.y;
            rx = ry = circle.radius;
            dx = dy = 0;
          } else if (shape.type === "ellipse") {
            const ellipse = shape;
            x2 = ellipse.x;
            y2 = ellipse.y;
            rx = ellipse.halfWidth;
            ry = ellipse.halfHeight;
            dx = dy = 0;
          } else {
            const roundedRect = shape;
            const halfWidth = roundedRect.width / 2;
            const halfHeight = roundedRect.height / 2;
            x2 = roundedRect.x + halfWidth;
            y2 = roundedRect.y + halfHeight;
            rx = ry = Math.max(0, Math.min(roundedRect.radius, Math.min(halfWidth, halfHeight)));
            dx = halfWidth - rx;
            dy = halfHeight - ry;
          }
          if (!(rx >= 0 && ry >= 0 && dx >= 0 && dy >= 0)) {
            return points;
          }
          const n2 = Math.ceil(2.3 * Math.sqrt(rx + ry));
          const m2 = n2 * 8 + (dx ? 4 : 0) + (dy ? 4 : 0);
          if (m2 === 0) {
            return points;
          }
          if (n2 === 0) {
            points[0] = points[6] = x2 + dx;
            points[1] = points[3] = y2 + dy;
            points[2] = points[4] = x2 - dx;
            points[5] = points[7] = y2 - dy;
            return points;
          }
          let j1 = 0;
          let j2 = n2 * 4 + (dx ? 2 : 0) + 2;
          let j3 = j2;
          let j4 = m2;
          let x0 = dx + rx;
          let y0 = dy;
          let x1 = x2 + x0;
          let x22 = x2 - x0;
          let y1 = y2 + y0;
          points[j1++] = x1;
          points[j1++] = y1;
          points[--j2] = y1;
          points[--j2] = x22;
          if (dy) {
            const y222 = y2 - y0;
            points[j3++] = x22;
            points[j3++] = y222;
            points[--j4] = y222;
            points[--j4] = x1;
          }
          for (let i2 = 1; i2 < n2; i2++) {
            const a2 = Math.PI / 2 * (i2 / n2);
            const x02 = dx + Math.cos(a2) * rx;
            const y02 = dy + Math.sin(a2) * ry;
            const x12 = x2 + x02;
            const x222 = x2 - x02;
            const y12 = y2 + y02;
            const y222 = y2 - y02;
            points[j1++] = x12;
            points[j1++] = y12;
            points[--j2] = y12;
            points[--j2] = x222;
            points[j3++] = x222;
            points[j3++] = y222;
            points[--j4] = y222;
            points[--j4] = x12;
          }
          x0 = dx;
          y0 = dy + ry;
          x1 = x2 + x0;
          x22 = x2 - x0;
          y1 = y2 + y0;
          const y22 = y2 - y0;
          points[j1++] = x1;
          points[j1++] = y1;
          points[--j4] = y22;
          points[--j4] = x1;
          if (dx) {
            points[j1++] = x22;
            points[j1++] = y1;
            points[--j4] = y22;
            points[--j4] = x22;
          }
          return points;
        },
        triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
          if (points.length === 0) {
            return;
          }
          let centerX = 0;
          let centerY = 0;
          for (let i2 = 0; i2 < points.length; i2 += 2) {
            centerX += points[i2];
            centerY += points[i2 + 1];
          }
          centerX /= points.length / 2;
          centerY /= points.length / 2;
          let count2 = verticesOffset;
          vertices[count2 * verticesStride] = centerX;
          vertices[count2 * verticesStride + 1] = centerY;
          const centerIndex = count2++;
          for (let i2 = 0; i2 < points.length; i2 += 2) {
            vertices[count2 * verticesStride] = points[i2];
            vertices[count2 * verticesStride + 1] = points[i2 + 1];
            if (i2 > 0) {
              indices[indicesOffset++] = count2;
              indices[indicesOffset++] = centerIndex;
              indices[indicesOffset++] = count2 - 1;
            }
            count2++;
          }
          indices[indicesOffset++] = centerIndex + 1;
          indices[indicesOffset++] = centerIndex;
          indices[indicesOffset++] = count2 - 1;
        }
      };
      buildEllipse = { ...buildCircle, extension: { ...buildCircle.extension, name: "ellipse" } };
      buildRoundedRectangle = { ...buildCircle, extension: { ...buildCircle.extension, name: "roundedRectangle" } };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/const.mjs
  var closePointEps, curveEps;
  var init_const6 = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/const.mjs"() {
      "use strict";
      closePointEps = 1e-4;
      curveEps = 1e-4;
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/utils/getOrientationOfPoints.mjs
  function getOrientationOfPoints(points) {
    const m2 = points.length;
    if (m2 < 6) {
      return 1;
    }
    let area = 0;
    for (let i2 = 0, x1 = points[m2 - 2], y1 = points[m2 - 1]; i2 < m2; i2 += 2) {
      const x2 = points[i2];
      const y2 = points[i2 + 1];
      area += (x2 - x1) * (y2 + y1);
      x1 = x2;
      y1 = y2;
    }
    if (area < 0) {
      return -1;
    }
    return 1;
  }
  var init_getOrientationOfPoints = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/utils/getOrientationOfPoints.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildLine.mjs
  function square(x2, y2, nx, ny, innerWeight, outerWeight, clockwise, verts) {
    const ix = x2 - nx * innerWeight;
    const iy = y2 - ny * innerWeight;
    const ox = x2 + nx * outerWeight;
    const oy = y2 + ny * outerWeight;
    let exx;
    let eyy;
    if (clockwise) {
      exx = ny;
      eyy = -nx;
    } else {
      exx = -ny;
      eyy = nx;
    }
    const eix = ix + exx;
    const eiy = iy + eyy;
    const eox = ox + exx;
    const eoy = oy + eyy;
    verts.push(eix, eiy);
    verts.push(eox, eoy);
    return 2;
  }
  function round(cx, cy, sx, sy, ex, ey, verts, clockwise) {
    const cx2p0x = sx - cx;
    const cy2p0y = sy - cy;
    let angle0 = Math.atan2(cx2p0x, cy2p0y);
    let angle1 = Math.atan2(ex - cx, ey - cy);
    if (clockwise && angle0 < angle1) {
      angle0 += Math.PI * 2;
    } else if (!clockwise && angle0 > angle1) {
      angle1 += Math.PI * 2;
    }
    let startAngle = angle0;
    const angleDiff = angle1 - angle0;
    const absAngleDiff = Math.abs(angleDiff);
    const radius = Math.sqrt(cx2p0x * cx2p0x + cy2p0y * cy2p0y);
    const segCount = (15 * absAngleDiff * Math.sqrt(radius) / Math.PI >> 0) + 1;
    const angleInc = angleDiff / segCount;
    startAngle += angleInc;
    if (clockwise) {
      verts.push(cx, cy);
      verts.push(sx, sy);
      for (let i2 = 1, angle = startAngle; i2 < segCount; i2++, angle += angleInc) {
        verts.push(cx, cy);
        verts.push(
          cx + Math.sin(angle) * radius,
          cy + Math.cos(angle) * radius
        );
      }
      verts.push(cx, cy);
      verts.push(ex, ey);
    } else {
      verts.push(sx, sy);
      verts.push(cx, cy);
      for (let i2 = 1, angle = startAngle; i2 < segCount; i2++, angle += angleInc) {
        verts.push(
          cx + Math.sin(angle) * radius,
          cy + Math.cos(angle) * radius
        );
        verts.push(cx, cy);
      }
      verts.push(ex, ey);
      verts.push(cx, cy);
    }
    return segCount * 2;
  }
  function buildLine(points, lineStyle, flipAlignment, closed, vertices, _verticesStride, _verticesOffset, indices, _indicesOffset) {
    const eps = closePointEps;
    if (points.length === 0) {
      return;
    }
    const style = lineStyle;
    let alignment = style.alignment;
    if (lineStyle.alignment !== 0.5) {
      let orientation = getOrientationOfPoints(points);
      if (flipAlignment)
        orientation *= -1;
      alignment = (alignment - 0.5) * orientation + 0.5;
    }
    const firstPoint = new Point(points[0], points[1]);
    const lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
    const closedShape = closed;
    const closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps && Math.abs(firstPoint.y - lastPoint.y) < eps;
    if (closedShape) {
      points = points.slice();
      if (closedPath) {
        points.pop();
        points.pop();
        lastPoint.set(points[points.length - 2], points[points.length - 1]);
      }
      const midPointX = (firstPoint.x + lastPoint.x) * 0.5;
      const midPointY = (lastPoint.y + firstPoint.y) * 0.5;
      points.unshift(midPointX, midPointY);
      points.push(midPointX, midPointY);
    }
    const verts = vertices;
    const length = points.length / 2;
    let indexCount = points.length;
    const indexStart = verts.length / 2;
    const width = style.width / 2;
    const widthSquared = width * width;
    const miterLimitSquared = style.miterLimit * style.miterLimit;
    let x0 = points[0];
    let y0 = points[1];
    let x1 = points[2];
    let y1 = points[3];
    let x2 = 0;
    let y2 = 0;
    let perpX = -(y0 - y1);
    let perpY = x0 - x1;
    let perp1x = 0;
    let perp1y = 0;
    let dist = Math.sqrt(perpX * perpX + perpY * perpY);
    perpX /= dist;
    perpY /= dist;
    perpX *= width;
    perpY *= width;
    const ratio = alignment;
    const innerWeight = (1 - ratio) * 2;
    const outerWeight = ratio * 2;
    if (!closedShape) {
      if (style.cap === "round") {
        indexCount += round(
          x0 - perpX * (innerWeight - outerWeight) * 0.5,
          y0 - perpY * (innerWeight - outerWeight) * 0.5,
          x0 - perpX * innerWeight,
          y0 - perpY * innerWeight,
          x0 + perpX * outerWeight,
          y0 + perpY * outerWeight,
          verts,
          true
        ) + 2;
      } else if (style.cap === "square") {
        indexCount += square(x0, y0, perpX, perpY, innerWeight, outerWeight, true, verts);
      }
    }
    verts.push(
      x0 - perpX * innerWeight,
      y0 - perpY * innerWeight
    );
    verts.push(
      x0 + perpX * outerWeight,
      y0 + perpY * outerWeight
    );
    for (let i2 = 1; i2 < length - 1; ++i2) {
      x0 = points[(i2 - 1) * 2];
      y0 = points[(i2 - 1) * 2 + 1];
      x1 = points[i2 * 2];
      y1 = points[i2 * 2 + 1];
      x2 = points[(i2 + 1) * 2];
      y2 = points[(i2 + 1) * 2 + 1];
      perpX = -(y0 - y1);
      perpY = x0 - x1;
      dist = Math.sqrt(perpX * perpX + perpY * perpY);
      perpX /= dist;
      perpY /= dist;
      perpX *= width;
      perpY *= width;
      perp1x = -(y1 - y2);
      perp1y = x1 - x2;
      dist = Math.sqrt(perp1x * perp1x + perp1y * perp1y);
      perp1x /= dist;
      perp1y /= dist;
      perp1x *= width;
      perp1y *= width;
      const dx0 = x1 - x0;
      const dy0 = y0 - y1;
      const dx1 = x1 - x2;
      const dy1 = y2 - y1;
      const dot = dx0 * dx1 + dy0 * dy1;
      const cross = dy0 * dx1 - dy1 * dx0;
      const clockwise = cross < 0;
      if (Math.abs(cross) < 1e-3 * Math.abs(dot)) {
        verts.push(
          x1 - perpX * innerWeight,
          y1 - perpY * innerWeight
        );
        verts.push(
          x1 + perpX * outerWeight,
          y1 + perpY * outerWeight
        );
        if (dot >= 0) {
          if (style.join === "round") {
            indexCount += round(
              x1,
              y1,
              x1 - perpX * innerWeight,
              y1 - perpY * innerWeight,
              x1 - perp1x * innerWeight,
              y1 - perp1y * innerWeight,
              verts,
              false
            ) + 4;
          } else {
            indexCount += 2;
          }
          verts.push(
            x1 - perp1x * outerWeight,
            y1 - perp1y * outerWeight
          );
          verts.push(
            x1 + perp1x * innerWeight,
            y1 + perp1y * innerWeight
          );
        }
        continue;
      }
      const c1 = (-perpX + x0) * (-perpY + y1) - (-perpX + x1) * (-perpY + y0);
      const c2 = (-perp1x + x2) * (-perp1y + y1) - (-perp1x + x1) * (-perp1y + y2);
      const px = (dx0 * c2 - dx1 * c1) / cross;
      const py = (dy1 * c1 - dy0 * c2) / cross;
      const pDist = (px - x1) * (px - x1) + (py - y1) * (py - y1);
      const imx = x1 + (px - x1) * innerWeight;
      const imy = y1 + (py - y1) * innerWeight;
      const omx = x1 - (px - x1) * outerWeight;
      const omy = y1 - (py - y1) * outerWeight;
      const smallerInsideSegmentSq = Math.min(dx0 * dx0 + dy0 * dy0, dx1 * dx1 + dy1 * dy1);
      const insideWeight = clockwise ? innerWeight : outerWeight;
      const smallerInsideDiagonalSq = smallerInsideSegmentSq + insideWeight * insideWeight * widthSquared;
      const insideMiterOk = pDist <= smallerInsideDiagonalSq;
      if (insideMiterOk) {
        if (style.join === "bevel" || pDist / widthSquared > miterLimitSquared) {
          if (clockwise) {
            verts.push(imx, imy);
            verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
            verts.push(imx, imy);
            verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
          } else {
            verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
            verts.push(omx, omy);
            verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
            verts.push(omx, omy);
          }
          indexCount += 2;
        } else if (style.join === "round") {
          if (clockwise) {
            verts.push(imx, imy);
            verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
            indexCount += round(
              x1,
              y1,
              x1 + perpX * outerWeight,
              y1 + perpY * outerWeight,
              x1 + perp1x * outerWeight,
              y1 + perp1y * outerWeight,
              verts,
              true
            ) + 4;
            verts.push(imx, imy);
            verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
          } else {
            verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
            verts.push(omx, omy);
            indexCount += round(
              x1,
              y1,
              x1 - perpX * innerWeight,
              y1 - perpY * innerWeight,
              x1 - perp1x * innerWeight,
              y1 - perp1y * innerWeight,
              verts,
              false
            ) + 4;
            verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
            verts.push(omx, omy);
          }
        } else {
          verts.push(imx, imy);
          verts.push(omx, omy);
        }
      } else {
        verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
        verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
        if (style.join === "round") {
          if (clockwise) {
            indexCount += round(
              x1,
              y1,
              x1 + perpX * outerWeight,
              y1 + perpY * outerWeight,
              x1 + perp1x * outerWeight,
              y1 + perp1y * outerWeight,
              verts,
              true
            ) + 2;
          } else {
            indexCount += round(
              x1,
              y1,
              x1 - perpX * innerWeight,
              y1 - perpY * innerWeight,
              x1 - perp1x * innerWeight,
              y1 - perp1y * innerWeight,
              verts,
              false
            ) + 2;
          }
        } else if (style.join === "miter" && pDist / widthSquared <= miterLimitSquared) {
          if (clockwise) {
            verts.push(omx, omy);
            verts.push(omx, omy);
          } else {
            verts.push(imx, imy);
            verts.push(imx, imy);
          }
          indexCount += 2;
        }
        verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
        verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        indexCount += 2;
      }
    }
    x0 = points[(length - 2) * 2];
    y0 = points[(length - 2) * 2 + 1];
    x1 = points[(length - 1) * 2];
    y1 = points[(length - 1) * 2 + 1];
    perpX = -(y0 - y1);
    perpY = x0 - x1;
    dist = Math.sqrt(perpX * perpX + perpY * perpY);
    perpX /= dist;
    perpY /= dist;
    perpX *= width;
    perpY *= width;
    verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
    verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
    if (!closedShape) {
      if (style.cap === "round") {
        indexCount += round(
          x1 - perpX * (innerWeight - outerWeight) * 0.5,
          y1 - perpY * (innerWeight - outerWeight) * 0.5,
          x1 - perpX * innerWeight,
          y1 - perpY * innerWeight,
          x1 + perpX * outerWeight,
          y1 + perpY * outerWeight,
          verts,
          false
        ) + 2;
      } else if (style.cap === "square") {
        indexCount += square(x1, y1, perpX, perpY, innerWeight, outerWeight, false, verts);
      }
    }
    const eps2 = curveEps * curveEps;
    for (let i2 = indexStart; i2 < indexCount + indexStart - 2; ++i2) {
      x0 = verts[i2 * 2];
      y0 = verts[i2 * 2 + 1];
      x1 = verts[(i2 + 1) * 2];
      y1 = verts[(i2 + 1) * 2 + 1];
      x2 = verts[(i2 + 2) * 2];
      y2 = verts[(i2 + 2) * 2 + 1];
      if (Math.abs(x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) < eps2) {
        continue;
      }
      indices.push(i2, i2 + 1, i2 + 2);
    }
  }
  var init_buildLine = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildLine.mjs"() {
      init_Point();
      init_const6();
      init_getOrientationOfPoints();
    }
  });

  // node_modules/earcut/src/earcut.js
  var require_earcut = __commonJS({
    "node_modules/earcut/src/earcut.js"(exports, module) {
      "use strict";
      module.exports = earcut2;
      module.exports.default = earcut2;
      function earcut2(data, holeIndices, dim) {
        dim = dim || 2;
        var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, true), triangles = [];
        if (!outerNode || outerNode.next === outerNode.prev) return triangles;
        var minX, minY, maxX, maxY, x2, y2, invSize;
        if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
        if (data.length > 80 * dim) {
          minX = maxX = data[0];
          minY = maxY = data[1];
          for (var i2 = dim; i2 < outerLen; i2 += dim) {
            x2 = data[i2];
            y2 = data[i2 + 1];
            if (x2 < minX) minX = x2;
            if (y2 < minY) minY = y2;
            if (x2 > maxX) maxX = x2;
            if (y2 > maxY) maxY = y2;
          }
          invSize = Math.max(maxX - minX, maxY - minY);
          invSize = invSize !== 0 ? 32767 / invSize : 0;
        }
        earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
        return triangles;
      }
      function linkedList(data, start, end, dim, clockwise) {
        var i2, last;
        if (clockwise === signedArea(data, start, end, dim) > 0) {
          for (i2 = start; i2 < end; i2 += dim) last = insertNode(i2, data[i2], data[i2 + 1], last);
        } else {
          for (i2 = end - dim; i2 >= start; i2 -= dim) last = insertNode(i2, data[i2], data[i2 + 1], last);
        }
        if (last && equals(last, last.next)) {
          removeNode(last);
          last = last.next;
        }
        return last;
      }
      function filterPoints(start, end) {
        if (!start) return start;
        if (!end) end = start;
        var p2 = start, again;
        do {
          again = false;
          if (!p2.steiner && (equals(p2, p2.next) || area(p2.prev, p2, p2.next) === 0)) {
            removeNode(p2);
            p2 = end = p2.prev;
            if (p2 === p2.next) break;
            again = true;
          } else {
            p2 = p2.next;
          }
        } while (again || p2 !== end);
        return end;
      }
      function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
        if (!ear) return;
        if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
        var stop = ear, prev, next;
        while (ear.prev !== ear.next) {
          prev = ear.prev;
          next = ear.next;
          if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            triangles.push(prev.i / dim | 0);
            triangles.push(ear.i / dim | 0);
            triangles.push(next.i / dim | 0);
            removeNode(ear);
            ear = next.next;
            stop = next.next;
            continue;
          }
          ear = next;
          if (ear === stop) {
            if (!pass) {
              earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
            } else if (pass === 1) {
              ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
              earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
            } else if (pass === 2) {
              splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }
            break;
          }
        }
      }
      function isEar(ear) {
        var a2 = ear.prev, b2 = ear, c2 = ear.next;
        if (area(a2, b2, c2) >= 0) return false;
        var ax = a2.x, bx = b2.x, cx = c2.x, ay = a2.y, by = b2.y, cy = c2.y;
        var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
        var p2 = c2.next;
        while (p2 !== a2) {
          if (p2.x >= x0 && p2.x <= x1 && p2.y >= y0 && p2.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p2.x, p2.y) && area(p2.prev, p2, p2.next) >= 0) return false;
          p2 = p2.next;
        }
        return true;
      }
      function isEarHashed(ear, minX, minY, invSize) {
        var a2 = ear.prev, b2 = ear, c2 = ear.next;
        if (area(a2, b2, c2) >= 0) return false;
        var ax = a2.x, bx = b2.x, cx = c2.x, ay = a2.y, by = b2.y, cy = c2.y;
        var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
        var minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
        var p2 = ear.prevZ, n2 = ear.nextZ;
        while (p2 && p2.z >= minZ && n2 && n2.z <= maxZ) {
          if (p2.x >= x0 && p2.x <= x1 && p2.y >= y0 && p2.y <= y1 && p2 !== a2 && p2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, p2.x, p2.y) && area(p2.prev, p2, p2.next) >= 0) return false;
          p2 = p2.prevZ;
          if (n2.x >= x0 && n2.x <= x1 && n2.y >= y0 && n2.y <= y1 && n2 !== a2 && n2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, n2.x, n2.y) && area(n2.prev, n2, n2.next) >= 0) return false;
          n2 = n2.nextZ;
        }
        while (p2 && p2.z >= minZ) {
          if (p2.x >= x0 && p2.x <= x1 && p2.y >= y0 && p2.y <= y1 && p2 !== a2 && p2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, p2.x, p2.y) && area(p2.prev, p2, p2.next) >= 0) return false;
          p2 = p2.prevZ;
        }
        while (n2 && n2.z <= maxZ) {
          if (n2.x >= x0 && n2.x <= x1 && n2.y >= y0 && n2.y <= y1 && n2 !== a2 && n2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, n2.x, n2.y) && area(n2.prev, n2, n2.next) >= 0) return false;
          n2 = n2.nextZ;
        }
        return true;
      }
      function cureLocalIntersections(start, triangles, dim) {
        var p2 = start;
        do {
          var a2 = p2.prev, b2 = p2.next.next;
          if (!equals(a2, b2) && intersects(a2, p2, p2.next, b2) && locallyInside(a2, b2) && locallyInside(b2, a2)) {
            triangles.push(a2.i / dim | 0);
            triangles.push(p2.i / dim | 0);
            triangles.push(b2.i / dim | 0);
            removeNode(p2);
            removeNode(p2.next);
            p2 = start = b2;
          }
          p2 = p2.next;
        } while (p2 !== start);
        return filterPoints(p2);
      }
      function splitEarcut(start, triangles, dim, minX, minY, invSize) {
        var a2 = start;
        do {
          var b2 = a2.next.next;
          while (b2 !== a2.prev) {
            if (a2.i !== b2.i && isValidDiagonal(a2, b2)) {
              var c2 = splitPolygon(a2, b2);
              a2 = filterPoints(a2, a2.next);
              c2 = filterPoints(c2, c2.next);
              earcutLinked(a2, triangles, dim, minX, minY, invSize, 0);
              earcutLinked(c2, triangles, dim, minX, minY, invSize, 0);
              return;
            }
            b2 = b2.next;
          }
          a2 = a2.next;
        } while (a2 !== start);
      }
      function eliminateHoles(data, holeIndices, outerNode, dim) {
        var queue = [], i2, len, start, end, list;
        for (i2 = 0, len = holeIndices.length; i2 < len; i2++) {
          start = holeIndices[i2] * dim;
          end = i2 < len - 1 ? holeIndices[i2 + 1] * dim : data.length;
          list = linkedList(data, start, end, dim, false);
          if (list === list.next) list.steiner = true;
          queue.push(getLeftmost(list));
        }
        queue.sort(compareX);
        for (i2 = 0; i2 < queue.length; i2++) {
          outerNode = eliminateHole(queue[i2], outerNode);
        }
        return outerNode;
      }
      function compareX(a2, b2) {
        return a2.x - b2.x;
      }
      function eliminateHole(hole, outerNode) {
        var bridge = findHoleBridge(hole, outerNode);
        if (!bridge) {
          return outerNode;
        }
        var bridgeReverse = splitPolygon(bridge, hole);
        filterPoints(bridgeReverse, bridgeReverse.next);
        return filterPoints(bridge, bridge.next);
      }
      function findHoleBridge(hole, outerNode) {
        var p2 = outerNode, hx = hole.x, hy = hole.y, qx = -Infinity, m2;
        do {
          if (hy <= p2.y && hy >= p2.next.y && p2.next.y !== p2.y) {
            var x2 = p2.x + (hy - p2.y) * (p2.next.x - p2.x) / (p2.next.y - p2.y);
            if (x2 <= hx && x2 > qx) {
              qx = x2;
              m2 = p2.x < p2.next.x ? p2 : p2.next;
              if (x2 === hx) return m2;
            }
          }
          p2 = p2.next;
        } while (p2 !== outerNode);
        if (!m2) return null;
        var stop = m2, mx = m2.x, my = m2.y, tanMin = Infinity, tan;
        p2 = m2;
        do {
          if (hx >= p2.x && p2.x >= mx && hx !== p2.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p2.x, p2.y)) {
            tan = Math.abs(hy - p2.y) / (hx - p2.x);
            if (locallyInside(p2, hole) && (tan < tanMin || tan === tanMin && (p2.x > m2.x || p2.x === m2.x && sectorContainsSector(m2, p2)))) {
              m2 = p2;
              tanMin = tan;
            }
          }
          p2 = p2.next;
        } while (p2 !== stop);
        return m2;
      }
      function sectorContainsSector(m2, p2) {
        return area(m2.prev, m2, p2.prev) < 0 && area(p2.next, m2, m2.next) < 0;
      }
      function indexCurve(start, minX, minY, invSize) {
        var p2 = start;
        do {
          if (p2.z === 0) p2.z = zOrder(p2.x, p2.y, minX, minY, invSize);
          p2.prevZ = p2.prev;
          p2.nextZ = p2.next;
          p2 = p2.next;
        } while (p2 !== start);
        p2.prevZ.nextZ = null;
        p2.prevZ = null;
        sortLinked(p2);
      }
      function sortLinked(list) {
        var i2, p2, q, e2, tail, numMerges, pSize, qSize, inSize = 1;
        do {
          p2 = list;
          list = null;
          tail = null;
          numMerges = 0;
          while (p2) {
            numMerges++;
            q = p2;
            pSize = 0;
            for (i2 = 0; i2 < inSize; i2++) {
              pSize++;
              q = q.nextZ;
              if (!q) break;
            }
            qSize = inSize;
            while (pSize > 0 || qSize > 0 && q) {
              if (pSize !== 0 && (qSize === 0 || !q || p2.z <= q.z)) {
                e2 = p2;
                p2 = p2.nextZ;
                pSize--;
              } else {
                e2 = q;
                q = q.nextZ;
                qSize--;
              }
              if (tail) tail.nextZ = e2;
              else list = e2;
              e2.prevZ = tail;
              tail = e2;
            }
            p2 = q;
          }
          tail.nextZ = null;
          inSize *= 2;
        } while (numMerges > 1);
        return list;
      }
      function zOrder(x2, y2, minX, minY, invSize) {
        x2 = (x2 - minX) * invSize | 0;
        y2 = (y2 - minY) * invSize | 0;
        x2 = (x2 | x2 << 8) & 16711935;
        x2 = (x2 | x2 << 4) & 252645135;
        x2 = (x2 | x2 << 2) & 858993459;
        x2 = (x2 | x2 << 1) & 1431655765;
        y2 = (y2 | y2 << 8) & 16711935;
        y2 = (y2 | y2 << 4) & 252645135;
        y2 = (y2 | y2 << 2) & 858993459;
        y2 = (y2 | y2 << 1) & 1431655765;
        return x2 | y2 << 1;
      }
      function getLeftmost(start) {
        var p2 = start, leftmost = start;
        do {
          if (p2.x < leftmost.x || p2.x === leftmost.x && p2.y < leftmost.y) leftmost = p2;
          p2 = p2.next;
        } while (p2 !== start);
        return leftmost;
      }
      function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
        return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
      }
      function isValidDiagonal(a2, b2) {
        return a2.next.i !== b2.i && a2.prev.i !== b2.i && !intersectsPolygon(a2, b2) && // dones't intersect other edges
        (locallyInside(a2, b2) && locallyInside(b2, a2) && middleInside(a2, b2) && // locally visible
        (area(a2.prev, a2, b2.prev) || area(a2, b2.prev, b2)) || // does not create opposite-facing sectors
        equals(a2, b2) && area(a2.prev, a2, a2.next) > 0 && area(b2.prev, b2, b2.next) > 0);
      }
      function area(p2, q, r2) {
        return (q.y - p2.y) * (r2.x - q.x) - (q.x - p2.x) * (r2.y - q.y);
      }
      function equals(p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
      }
      function intersects(p1, q1, p2, q2) {
        var o1 = sign(area(p1, q1, p2));
        var o2 = sign(area(p1, q1, q2));
        var o3 = sign(area(p2, q2, p1));
        var o4 = sign(area(p2, q2, q1));
        if (o1 !== o2 && o3 !== o4) return true;
        if (o1 === 0 && onSegment(p1, p2, q1)) return true;
        if (o2 === 0 && onSegment(p1, q2, q1)) return true;
        if (o3 === 0 && onSegment(p2, p1, q2)) return true;
        if (o4 === 0 && onSegment(p2, q1, q2)) return true;
        return false;
      }
      function onSegment(p2, q, r2) {
        return q.x <= Math.max(p2.x, r2.x) && q.x >= Math.min(p2.x, r2.x) && q.y <= Math.max(p2.y, r2.y) && q.y >= Math.min(p2.y, r2.y);
      }
      function sign(num) {
        return num > 0 ? 1 : num < 0 ? -1 : 0;
      }
      function intersectsPolygon(a2, b2) {
        var p2 = a2;
        do {
          if (p2.i !== a2.i && p2.next.i !== a2.i && p2.i !== b2.i && p2.next.i !== b2.i && intersects(p2, p2.next, a2, b2)) return true;
          p2 = p2.next;
        } while (p2 !== a2);
        return false;
      }
      function locallyInside(a2, b2) {
        return area(a2.prev, a2, a2.next) < 0 ? area(a2, b2, a2.next) >= 0 && area(a2, a2.prev, b2) >= 0 : area(a2, b2, a2.prev) < 0 || area(a2, a2.next, b2) < 0;
      }
      function middleInside(a2, b2) {
        var p2 = a2, inside = false, px = (a2.x + b2.x) / 2, py = (a2.y + b2.y) / 2;
        do {
          if (p2.y > py !== p2.next.y > py && p2.next.y !== p2.y && px < (p2.next.x - p2.x) * (py - p2.y) / (p2.next.y - p2.y) + p2.x)
            inside = !inside;
          p2 = p2.next;
        } while (p2 !== a2);
        return inside;
      }
      function splitPolygon(a2, b2) {
        var a22 = new Node(a2.i, a2.x, a2.y), b22 = new Node(b2.i, b2.x, b2.y), an = a2.next, bp = b2.prev;
        a2.next = b2;
        b2.prev = a2;
        a22.next = an;
        an.prev = a22;
        b22.next = a22;
        a22.prev = b22;
        bp.next = b22;
        b22.prev = bp;
        return b22;
      }
      function insertNode(i2, x2, y2, last) {
        var p2 = new Node(i2, x2, y2);
        if (!last) {
          p2.prev = p2;
          p2.next = p2;
        } else {
          p2.next = last.next;
          p2.prev = last;
          last.next.prev = p2;
          last.next = p2;
        }
        return p2;
      }
      function removeNode(p2) {
        p2.next.prev = p2.prev;
        p2.prev.next = p2.next;
        if (p2.prevZ) p2.prevZ.nextZ = p2.nextZ;
        if (p2.nextZ) p2.nextZ.prevZ = p2.prevZ;
      }
      function Node(i2, x2, y2) {
        this.i = i2;
        this.x = x2;
        this.y = y2;
        this.prev = null;
        this.next = null;
        this.z = 0;
        this.prevZ = null;
        this.nextZ = null;
        this.steiner = false;
      }
      earcut2.deviation = function(data, holeIndices, dim, triangles) {
        var hasHoles = holeIndices && holeIndices.length;
        var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
        var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
        if (hasHoles) {
          for (var i2 = 0, len = holeIndices.length; i2 < len; i2++) {
            var start = holeIndices[i2] * dim;
            var end = i2 < len - 1 ? holeIndices[i2 + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
          }
        }
        var trianglesArea = 0;
        for (i2 = 0; i2 < triangles.length; i2 += 3) {
          var a2 = triangles[i2] * dim;
          var b2 = triangles[i2 + 1] * dim;
          var c2 = triangles[i2 + 2] * dim;
          trianglesArea += Math.abs(
            (data[a2] - data[c2]) * (data[b2 + 1] - data[a2 + 1]) - (data[a2] - data[b2]) * (data[c2 + 1] - data[a2 + 1])
          );
        }
        return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
      };
      function signedArea(data, start, end, dim) {
        var sum = 0;
        for (var i2 = start, j2 = end - dim; i2 < end; i2 += dim) {
          sum += (data[j2] - data[i2]) * (data[i2 + 1] + data[j2 + 1]);
          j2 = i2;
        }
        return sum;
      }
      earcut2.flatten = function(data) {
        var dim = data[0][0].length, result = { vertices: [], holes: [], dimensions: dim }, holeIndex = 0;
        for (var i2 = 0; i2 < data.length; i2++) {
          for (var j2 = 0; j2 < data[i2].length; j2++) {
            for (var d2 = 0; d2 < dim; d2++) result.vertices.push(data[i2][j2][d2]);
          }
          if (i2 > 0) {
            holeIndex += data[i2 - 1].length;
            result.holes.push(holeIndex);
          }
        }
        return result;
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/utils/triangulateWithHoles.mjs
  function triangulateWithHoles(points, holes, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    const triangles = (0, import_earcut.default)(points, holes, 2);
    if (!triangles) {
      return;
    }
    for (let i2 = 0; i2 < triangles.length; i2 += 3) {
      indices[indicesOffset++] = triangles[i2] + verticesOffset;
      indices[indicesOffset++] = triangles[i2 + 1] + verticesOffset;
      indices[indicesOffset++] = triangles[i2 + 2] + verticesOffset;
    }
    let index = verticesOffset * verticesStride;
    for (let i2 = 0; i2 < points.length; i2 += 2) {
      vertices[index] = points[i2];
      vertices[index + 1] = points[i2 + 1];
      index += verticesStride;
    }
  }
  var import_earcut;
  var init_triangulateWithHoles = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/utils/triangulateWithHoles.mjs"() {
      import_earcut = __toESM(require_earcut(), 1);
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildPolygon.mjs
  var emptyArray, buildPolygon;
  var init_buildPolygon = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildPolygon.mjs"() {
      init_Extensions();
      init_triangulateWithHoles();
      emptyArray = [];
      buildPolygon = {
        extension: {
          type: ExtensionType.ShapeBuilder,
          name: "polygon"
        },
        build(shape, points) {
          for (let i2 = 0; i2 < shape.points.length; i2++) {
            points[i2] = shape.points[i2];
          }
          return points;
        },
        triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
          triangulateWithHoles(points, emptyArray, vertices, verticesStride, verticesOffset, indices, indicesOffset);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildRectangle.mjs
  var buildRectangle;
  var init_buildRectangle = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildRectangle.mjs"() {
      init_Extensions();
      buildRectangle = {
        extension: {
          type: ExtensionType.ShapeBuilder,
          name: "rectangle"
        },
        build(shape, points) {
          const rectData = shape;
          const x2 = rectData.x;
          const y2 = rectData.y;
          const width = rectData.width;
          const height = rectData.height;
          if (!(width >= 0 && height >= 0)) {
            return points;
          }
          points[0] = x2;
          points[1] = y2;
          points[2] = x2 + width;
          points[3] = y2;
          points[4] = x2 + width;
          points[5] = y2 + height;
          points[6] = x2;
          points[7] = y2 + height;
          return points;
        },
        triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
          let count2 = 0;
          verticesOffset *= verticesStride;
          vertices[verticesOffset + count2] = points[0];
          vertices[verticesOffset + count2 + 1] = points[1];
          count2 += verticesStride;
          vertices[verticesOffset + count2] = points[2];
          vertices[verticesOffset + count2 + 1] = points[3];
          count2 += verticesStride;
          vertices[verticesOffset + count2] = points[6];
          vertices[verticesOffset + count2 + 1] = points[7];
          count2 += verticesStride;
          vertices[verticesOffset + count2] = points[4];
          vertices[verticesOffset + count2 + 1] = points[5];
          count2 += verticesStride;
          const verticesIndex = verticesOffset / verticesStride;
          indices[indicesOffset++] = verticesIndex;
          indices[indicesOffset++] = verticesIndex + 1;
          indices[indicesOffset++] = verticesIndex + 2;
          indices[indicesOffset++] = verticesIndex + 1;
          indices[indicesOffset++] = verticesIndex + 3;
          indices[indicesOffset++] = verticesIndex + 2;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildTriangle.mjs
  var buildTriangle;
  var init_buildTriangle = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildTriangle.mjs"() {
      init_Extensions();
      buildTriangle = {
        extension: {
          type: ExtensionType.ShapeBuilder,
          name: "triangle"
        },
        build(shape, points) {
          points[0] = shape.x;
          points[1] = shape.y;
          points[2] = shape.x2;
          points[3] = shape.y2;
          points[4] = shape.x3;
          points[5] = shape.y3;
          return points;
        },
        triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
          let count2 = 0;
          verticesOffset *= verticesStride;
          vertices[verticesOffset + count2] = points[0];
          vertices[verticesOffset + count2 + 1] = points[1];
          count2 += verticesStride;
          vertices[verticesOffset + count2] = points[2];
          vertices[verticesOffset + count2 + 1] = points[3];
          count2 += verticesStride;
          vertices[verticesOffset + count2] = points[4];
          vertices[verticesOffset + count2 + 1] = points[5];
          const verticesIndex = verticesOffset / verticesStride;
          indices[indicesOffset++] = verticesIndex;
          indices[indicesOffset++] = verticesIndex + 1;
          indices[indicesOffset++] = verticesIndex + 2;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/utils/buildContextBatches.mjs
  function buildContextBatches(context2, gpuContext) {
    const { geometryData, batches } = gpuContext;
    batches.length = 0;
    geometryData.indices.length = 0;
    geometryData.vertices.length = 0;
    geometryData.uvs.length = 0;
    for (let i2 = 0; i2 < context2.instructions.length; i2++) {
      const instruction = context2.instructions[i2];
      if (instruction.action === "texture") {
        addTextureToGeometryData(instruction.data, batches, geometryData);
      } else if (instruction.action === "fill" || instruction.action === "stroke") {
        const isStroke = instruction.action === "stroke";
        const shapePath = instruction.data.path.shapePath;
        const style = instruction.data.style;
        const hole = instruction.data.hole;
        if (isStroke && hole) {
          addShapePathToGeometryData(hole.shapePath, style, null, true, batches, geometryData);
        }
        addShapePathToGeometryData(shapePath, style, hole, isStroke, batches, geometryData);
      }
    }
  }
  function addTextureToGeometryData(data, batches, geometryData) {
    const { vertices, uvs, indices } = geometryData;
    const indexOffset = indices.length;
    const vertOffset = vertices.length / 2;
    const points = [];
    const build = shapeBuilders.rectangle;
    const rect = tempRect;
    const texture = data.image;
    rect.x = data.dx;
    rect.y = data.dy;
    rect.width = data.dw;
    rect.height = data.dh;
    const matrix = data.transform;
    build.build(rect, points);
    if (matrix) {
      transformVertices(points, matrix);
    }
    build.triangulate(points, vertices, 2, vertOffset, indices, indexOffset);
    const textureUvs = texture.uvs;
    uvs.push(
      textureUvs.x0,
      textureUvs.y0,
      textureUvs.x1,
      textureUvs.y1,
      textureUvs.x3,
      textureUvs.y3,
      textureUvs.x2,
      textureUvs.y2
    );
    const graphicsBatch = BigPool.get(BatchableGraphics);
    graphicsBatch.indexOffset = indexOffset;
    graphicsBatch.indexSize = indices.length - indexOffset;
    graphicsBatch.attributeOffset = vertOffset;
    graphicsBatch.attributeSize = vertices.length / 2 - vertOffset;
    graphicsBatch.baseColor = data.style;
    graphicsBatch.alpha = data.alpha;
    graphicsBatch.texture = texture;
    graphicsBatch.geometryData = geometryData;
    batches.push(graphicsBatch);
  }
  function addShapePathToGeometryData(shapePath, style, hole, isStroke, batches, geometryData) {
    const { vertices, uvs, indices } = geometryData;
    const lastIndex = shapePath.shapePrimitives.length - 1;
    shapePath.shapePrimitives.forEach(({ shape, transform: matrix }, i2) => {
      const indexOffset = indices.length;
      const vertOffset = vertices.length / 2;
      const points = [];
      const build = shapeBuilders[shape.type];
      build.build(shape, points);
      if (matrix) {
        transformVertices(points, matrix);
      }
      if (!isStroke) {
        if (hole && lastIndex === i2) {
          if (lastIndex !== 0) {
            console.warn("[Pixi Graphics] only the last shape have be cut out");
          }
          const holeIndices = [];
          const otherPoints = points.slice();
          const holeArrays = getHoleArrays(hole.shapePath);
          holeArrays.forEach((holePoints) => {
            holeIndices.push(otherPoints.length / 2);
            otherPoints.push(...holePoints);
          });
          triangulateWithHoles(otherPoints, holeIndices, vertices, 2, vertOffset, indices, indexOffset);
        } else {
          build.triangulate(points, vertices, 2, vertOffset, indices, indexOffset);
        }
      } else {
        const close = shape.closePath ?? true;
        const lineStyle = style;
        buildLine(points, lineStyle, false, close, vertices, 2, vertOffset, indices, indexOffset);
      }
      const uvsOffset = uvs.length / 2;
      const texture = style.texture;
      if (texture !== Texture.WHITE) {
        const textureMatrix = style.matrix;
        if (textureMatrix) {
          if (matrix) {
            textureMatrix.append(matrix.clone().invert());
          }
          buildUvs(vertices, 2, vertOffset, uvs, uvsOffset, 2, vertices.length / 2 - vertOffset, textureMatrix);
        }
      } else {
        buildSimpleUvs(uvs, uvsOffset, 2, vertices.length / 2 - vertOffset);
      }
      const graphicsBatch = BigPool.get(BatchableGraphics);
      graphicsBatch.indexOffset = indexOffset;
      graphicsBatch.indexSize = indices.length - indexOffset;
      graphicsBatch.attributeOffset = vertOffset;
      graphicsBatch.attributeSize = vertices.length / 2 - vertOffset;
      graphicsBatch.baseColor = style.color;
      graphicsBatch.alpha = style.alpha;
      graphicsBatch.texture = texture;
      graphicsBatch.geometryData = geometryData;
      batches.push(graphicsBatch);
    });
  }
  function getHoleArrays(shape) {
    if (!shape)
      return [];
    const holePrimitives = shape.shapePrimitives;
    const holeArrays = [];
    for (let k2 = 0; k2 < holePrimitives.length; k2++) {
      const holePrimitive = holePrimitives[k2].shape;
      const holePoints = [];
      const holeBuilder = shapeBuilders[holePrimitive.type];
      holeBuilder.build(holePrimitive, holePoints);
      holeArrays.push(holePoints);
    }
    return holeArrays;
  }
  var shapeBuilders, tempRect;
  var init_buildContextBatches = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/utils/buildContextBatches.mjs"() {
      init_Extensions();
      init_Rectangle();
      init_buildUvs();
      init_transformVertices();
      init_Texture();
      init_PoolGroup();
      init_BatchableGraphics();
      init_buildCircle();
      init_buildLine();
      init_buildPolygon();
      init_buildRectangle();
      init_buildTriangle();
      init_triangulateWithHoles();
      shapeBuilders = {};
      extensions.handleByMap(ExtensionType.ShapeBuilder, shapeBuilders);
      extensions.add(buildRectangle, buildPolygon, buildTriangle, buildCircle, buildEllipse, buildRoundedRectangle);
      tempRect = new Rectangle();
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContextSystem.mjs
  var GpuGraphicsContext, GraphicsContextRenderData, _GraphicsContextSystem, GraphicsContextSystem;
  var init_GraphicsContextSystem = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContextSystem.mjs"() {
      init_Extensions();
      init_getTextureBatchBindGroup();
      init_DefaultBatcher();
      init_InstructionSet();
      init_deprecation();
      init_PoolGroup();
      init_buildContextBatches();
      GpuGraphicsContext = class {
        constructor() {
          this.batches = [];
          this.geometryData = {
            vertices: [],
            uvs: [],
            indices: []
          };
        }
      };
      GraphicsContextRenderData = class {
        constructor() {
          this.batcher = new DefaultBatcher();
          this.instructions = new InstructionSet();
        }
        init() {
          this.instructions.reset();
        }
        /**
         * @deprecated since version 8.0.0
         * Use `batcher.geometry` instead.
         * @see {Batcher#geometry}
         */
        get geometry() {
          deprecation(v8_3_4, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead.");
          return this.batcher.geometry;
        }
      };
      _GraphicsContextSystem = class _GraphicsContextSystem2 {
        constructor() {
          this._gpuContextHash = {};
          this._graphicsDataContextHash = /* @__PURE__ */ Object.create(null);
        }
        /**
         * Runner init called, update the default options
         * @ignore
         */
        init(options) {
          _GraphicsContextSystem2.defaultOptions.bezierSmoothness = options?.bezierSmoothness ?? _GraphicsContextSystem2.defaultOptions.bezierSmoothness;
        }
        getContextRenderData(context2) {
          return this._graphicsDataContextHash[context2.uid] || this._initContextRenderData(context2);
        }
        // Context management functions
        updateGpuContext(context2) {
          let gpuContext = this._gpuContextHash[context2.uid] || this._initContext(context2);
          if (context2.dirty) {
            if (gpuContext) {
              this._cleanGraphicsContextData(context2);
            } else {
              gpuContext = this._initContext(context2);
            }
            buildContextBatches(context2, gpuContext);
            const batchMode = context2.batchMode;
            if (context2.customShader || batchMode === "no-batch") {
              gpuContext.isBatchable = false;
            } else if (batchMode === "auto") {
              gpuContext.isBatchable = gpuContext.geometryData.vertices.length < 400;
            }
            context2.dirty = false;
          }
          return gpuContext;
        }
        getGpuContext(context2) {
          return this._gpuContextHash[context2.uid] || this._initContext(context2);
        }
        _initContextRenderData(context2) {
          const graphicsData = BigPool.get(GraphicsContextRenderData);
          const { batches, geometryData } = this._gpuContextHash[context2.uid];
          const vertexSize = geometryData.vertices.length;
          const indexSize = geometryData.indices.length;
          for (let i2 = 0; i2 < batches.length; i2++) {
            batches[i2].applyTransform = false;
          }
          const batcher = graphicsData.batcher;
          batcher.ensureAttributeBuffer(vertexSize);
          batcher.ensureIndexBuffer(indexSize);
          batcher.begin();
          for (let i2 = 0; i2 < batches.length; i2++) {
            const batch = batches[i2];
            batcher.add(batch);
          }
          batcher.finish(graphicsData.instructions);
          const geometry = batcher.geometry;
          geometry.indexBuffer.setDataWithSize(batcher.indexBuffer, batcher.indexSize, true);
          geometry.buffers[0].setDataWithSize(batcher.attributeBuffer.float32View, batcher.attributeSize, true);
          const drawBatches = batcher.batches;
          for (let i2 = 0; i2 < drawBatches.length; i2++) {
            const batch = drawBatches[i2];
            batch.bindGroup = getTextureBatchBindGroup(batch.textures.textures, batch.textures.count);
          }
          this._graphicsDataContextHash[context2.uid] = graphicsData;
          return graphicsData;
        }
        _initContext(context2) {
          const gpuContext = new GpuGraphicsContext();
          gpuContext.context = context2;
          this._gpuContextHash[context2.uid] = gpuContext;
          context2.on("destroy", this.onGraphicsContextDestroy, this);
          return this._gpuContextHash[context2.uid];
        }
        onGraphicsContextDestroy(context2) {
          this._cleanGraphicsContextData(context2);
          context2.off("destroy", this.onGraphicsContextDestroy, this);
          this._gpuContextHash[context2.uid] = null;
        }
        _cleanGraphicsContextData(context2) {
          const gpuContext = this._gpuContextHash[context2.uid];
          if (!gpuContext.isBatchable) {
            if (this._graphicsDataContextHash[context2.uid]) {
              BigPool.return(this.getContextRenderData(context2));
              this._graphicsDataContextHash[context2.uid] = null;
            }
          }
          if (gpuContext.batches) {
            gpuContext.batches.forEach((batch) => {
              BigPool.return(batch);
            });
          }
        }
        destroy() {
          for (const i2 in this._gpuContextHash) {
            if (this._gpuContextHash[i2]) {
              this.onGraphicsContextDestroy(this._gpuContextHash[i2].context);
            }
          }
        }
      };
      _GraphicsContextSystem.extension = {
        type: [
          ExtensionType.WebGLSystem,
          ExtensionType.WebGPUSystem,
          ExtensionType.CanvasSystem
        ],
        name: "graphicsContext"
      };
      _GraphicsContextSystem.defaultOptions = {
        /**
         * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
         * @default 0.5
         */
        bezierSmoothness: 0.5
      };
      GraphicsContextSystem = _GraphicsContextSystem;
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/state/State.mjs
  var blendModeIds, BLEND, OFFSET, CULLING, DEPTH_TEST, WINDING, DEPTH_MASK, _State, State;
  var init_State = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/state/State.mjs"() {
      "use strict";
      blendModeIds = {
        normal: 0,
        add: 1,
        multiply: 2,
        screen: 3,
        overlay: 4,
        erase: 5,
        "normal-npm": 6,
        "add-npm": 7,
        "screen-npm": 8,
        min: 9,
        max: 10
      };
      BLEND = 0;
      OFFSET = 1;
      CULLING = 2;
      DEPTH_TEST = 3;
      WINDING = 4;
      DEPTH_MASK = 5;
      _State = class _State2 {
        constructor() {
          this.data = 0;
          this.blendMode = "normal";
          this.polygonOffset = 0;
          this.blend = true;
          this.depthMask = true;
        }
        /**
         * Activates blending of the computed fragment color values.
         * @default true
         */
        get blend() {
          return !!(this.data & 1 << BLEND);
        }
        set blend(value) {
          if (!!(this.data & 1 << BLEND) !== value) {
            this.data ^= 1 << BLEND;
          }
        }
        /**
         * Activates adding an offset to depth values of polygon's fragments
         * @default false
         */
        get offsets() {
          return !!(this.data & 1 << OFFSET);
        }
        set offsets(value) {
          if (!!(this.data & 1 << OFFSET) !== value) {
            this.data ^= 1 << OFFSET;
          }
        }
        /** The culling settings for this state none - No culling back - Back face culling front - Front face culling */
        set cullMode(value) {
          if (value === "none") {
            this.culling = false;
            return;
          }
          this.culling = true;
          this.clockwiseFrontFace = value === "front";
        }
        get cullMode() {
          if (!this.culling) {
            return "none";
          }
          return this.clockwiseFrontFace ? "front" : "back";
        }
        /**
         * Activates culling of polygons.
         * @default false
         */
        get culling() {
          return !!(this.data & 1 << CULLING);
        }
        set culling(value) {
          if (!!(this.data & 1 << CULLING) !== value) {
            this.data ^= 1 << CULLING;
          }
        }
        /**
         * Activates depth comparisons and updates to the depth buffer.
         * @default false
         */
        get depthTest() {
          return !!(this.data & 1 << DEPTH_TEST);
        }
        set depthTest(value) {
          if (!!(this.data & 1 << DEPTH_TEST) !== value) {
            this.data ^= 1 << DEPTH_TEST;
          }
        }
        /**
         * Enables or disables writing to the depth buffer.
         * @default true
         */
        get depthMask() {
          return !!(this.data & 1 << DEPTH_MASK);
        }
        set depthMask(value) {
          if (!!(this.data & 1 << DEPTH_MASK) !== value) {
            this.data ^= 1 << DEPTH_MASK;
          }
        }
        /**
         * Specifies whether or not front or back-facing polygons can be culled.
         * @default false
         */
        get clockwiseFrontFace() {
          return !!(this.data & 1 << WINDING);
        }
        set clockwiseFrontFace(value) {
          if (!!(this.data & 1 << WINDING) !== value) {
            this.data ^= 1 << WINDING;
          }
        }
        /**
         * The blend mode to be applied when this state is set. Apply a value of `normal` to reset the blend mode.
         * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
         * @default 'normal'
         */
        get blendMode() {
          return this._blendMode;
        }
        set blendMode(value) {
          this.blend = value !== "none";
          this._blendMode = value;
          this._blendModeId = blendModeIds[value] || 0;
        }
        /**
         * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
         * @default 0
         */
        get polygonOffset() {
          return this._polygonOffset;
        }
        set polygonOffset(value) {
          this.offsets = !!value;
          this._polygonOffset = value;
        }
        toString() {
          return `[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
        }
        /**
         * A quickly getting an instance of a State that is configured for 2d rendering.
         * @returns a new State with values set for 2d rendering
         */
        static for2d() {
          const state = new _State2();
          state.depthTest = false;
          state.blend = true;
          return state;
        }
      };
      _State.default2d = _State.for2d();
      State = _State;
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs
  function color32BitToUniform(abgr, out2, offset) {
    const alpha = (abgr >> 24 & 255) / 255;
    out2[offset++] = (abgr & 255) / 255 * alpha;
    out2[offset++] = (abgr >> 8 & 255) / 255 * alpha;
    out2[offset++] = (abgr >> 16 & 255) / 255 * alpha;
    out2[offset++] = alpha;
  }
  var init_colorToUniform = __esm({
    "node_modules/pixi.js/lib/scene/graphics/gpu/colorToUniform.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/GraphicsPipe.mjs
  var GraphicsPipe;
  var init_GraphicsPipe = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/GraphicsPipe.mjs"() {
      init_Extensions();
      init_State();
      init_PoolGroup();
      init_colorToUniform();
      init_BatchableGraphics();
      GraphicsPipe = class {
        constructor(renderer, adaptor) {
          this.state = State.for2d();
          this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null);
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this.renderer = renderer;
          this._adaptor = adaptor;
          this._adaptor.init();
        }
        validateRenderable(graphics) {
          const context2 = graphics.context;
          const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
          const gpuContext = this.renderer.graphicsContext.updateGpuContext(context2);
          if (gpuContext.isBatchable || wasBatched !== gpuContext.isBatchable) {
            return true;
          }
          return false;
        }
        addRenderable(graphics, instructionSet) {
          const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
          if (graphics._didGraphicsUpdate) {
            graphics._didGraphicsUpdate = false;
            this._rebuild(graphics);
          }
          if (gpuContext.isBatchable) {
            this._addToBatcher(graphics, instructionSet);
          } else {
            this.renderer.renderPipes.batch.break(instructionSet);
            instructionSet.add(graphics);
          }
        }
        updateRenderable(graphics) {
          const batches = this._graphicsBatchesHash[graphics.uid];
          if (batches) {
            for (let i2 = 0; i2 < batches.length; i2++) {
              const batch = batches[i2];
              batch._batcher.updateElement(batch);
            }
          }
        }
        destroyRenderable(graphics) {
          if (this._graphicsBatchesHash[graphics.uid]) {
            this._removeBatchForRenderable(graphics.uid);
          }
          graphics.off("destroyed", this._destroyRenderableBound);
        }
        execute(graphics) {
          if (!graphics.isRenderable)
            return;
          const renderer = this.renderer;
          const context2 = graphics.context;
          const contextSystem = renderer.graphicsContext;
          if (!contextSystem.getGpuContext(context2).batches.length) {
            return;
          }
          const shader = context2.customShader || this._adaptor.shader;
          this.state.blendMode = graphics.groupBlendMode;
          const localUniforms = shader.resources.localUniforms.uniforms;
          localUniforms.uTransformMatrix = graphics.groupTransform;
          localUniforms.uRound = renderer._roundPixels | graphics._roundPixels;
          color32BitToUniform(
            graphics.groupColorAlpha,
            localUniforms.uColor,
            0
          );
          this._adaptor.execute(this, graphics);
        }
        _rebuild(graphics) {
          const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
          const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
          if (wasBatched) {
            this._removeBatchForRenderable(graphics.uid);
          }
          if (gpuContext.isBatchable) {
            this._initBatchesForRenderable(graphics);
          }
          graphics.batched = gpuContext.isBatchable;
        }
        _addToBatcher(graphics, instructionSet) {
          const batchPipe = this.renderer.renderPipes.batch;
          const batches = this._getBatchesForRenderable(graphics);
          for (let i2 = 0; i2 < batches.length; i2++) {
            const batch = batches[i2];
            batchPipe.addToBatch(batch, instructionSet);
          }
        }
        _getBatchesForRenderable(graphics) {
          return this._graphicsBatchesHash[graphics.uid] || this._initBatchesForRenderable(graphics);
        }
        _initBatchesForRenderable(graphics) {
          const context2 = graphics.context;
          const gpuContext = this.renderer.graphicsContext.getGpuContext(context2);
          const roundPixels = this.renderer._roundPixels | graphics._roundPixels;
          const batches = gpuContext.batches.map((batch) => {
            const batchClone = BigPool.get(BatchableGraphics);
            batch.copyTo(batchClone);
            batchClone.renderable = graphics;
            batchClone.roundPixels = roundPixels;
            return batchClone;
          });
          if (this._graphicsBatchesHash[graphics.uid] === void 0) {
            graphics.on("destroyed", this._destroyRenderableBound);
          }
          this._graphicsBatchesHash[graphics.uid] = batches;
          return batches;
        }
        _removeBatchForRenderable(graphicsUid) {
          this._graphicsBatchesHash[graphicsUid].forEach((batch) => {
            BigPool.return(batch);
          });
          this._graphicsBatchesHash[graphicsUid] = null;
        }
        destroy() {
          this.renderer = null;
          this._adaptor.destroy();
          this._adaptor = null;
          this.state = null;
          for (const i2 in this._graphicsBatchesHash) {
            this._removeBatchForRenderable(i2);
          }
          this._graphicsBatchesHash = null;
        }
      };
      GraphicsPipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "graphics"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/init.mjs
  var init_init6 = __esm({
    "node_modules/pixi.js/lib/scene/graphics/init.mjs"() {
      init_Extensions();
      init_GraphicsContextSystem();
      init_GraphicsPipe();
      extensions.add(GraphicsPipe);
      extensions.add(GraphicsContextSystem);
    }
  });

  // node_modules/pixi.js/lib/scene/mesh/shared/BatchableMesh.mjs
  var BatchableMesh;
  var init_BatchableMesh = __esm({
    "node_modules/pixi.js/lib/scene/mesh/shared/BatchableMesh.mjs"() {
      "use strict";
      BatchableMesh = class {
        constructor() {
          this.batcherName = "default";
          this.packAsQuad = false;
          this.indexOffset = 0;
          this.attributeOffset = 0;
          this.roundPixels = 0;
          this._batcher = null;
          this._batch = null;
          this._uvUpdateId = -1;
          this._textureMatrixUpdateId = -1;
        }
        get blendMode() {
          return this.renderable.groupBlendMode;
        }
        reset() {
          this.renderable = null;
          this.texture = null;
          this._batcher = null;
          this._batch = null;
          this.geometry = null;
          this._uvUpdateId = -1;
          this._textureMatrixUpdateId = -1;
        }
        get uvs() {
          const geometry = this.geometry;
          const uvBuffer = geometry.getBuffer("aUV");
          const uvs = uvBuffer.data;
          let transformedUvs = uvs;
          const textureMatrix = this.texture.textureMatrix;
          if (!textureMatrix.isSimple) {
            transformedUvs = this._transformedUvs;
            if (this._textureMatrixUpdateId !== textureMatrix._updateID || this._uvUpdateId !== uvBuffer._updateID) {
              if (!transformedUvs || transformedUvs.length < uvs.length) {
                transformedUvs = this._transformedUvs = new Float32Array(uvs.length);
              }
              this._textureMatrixUpdateId = textureMatrix._updateID;
              this._uvUpdateId = uvBuffer._updateID;
              textureMatrix.multiplyUvs(uvs, transformedUvs);
            }
          }
          return transformedUvs;
        }
        get positions() {
          return this.geometry.positions;
        }
        get indices() {
          return this.geometry.indices;
        }
        get color() {
          return this.renderable.groupColorAlpha;
        }
        get groupTransform() {
          return this.renderable.groupTransform;
        }
        get attributeSize() {
          return this.geometry.positions.length / 2;
        }
        get indexSize() {
          return this.geometry.indices.length;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/mesh/shared/MeshPipe.mjs
  var MeshPipe;
  var init_MeshPipe = __esm({
    "node_modules/pixi.js/lib/scene/mesh/shared/MeshPipe.mjs"() {
      init_Extensions();
      init_Matrix();
      init_BindGroup();
      init_UniformGroup();
      init_getAdjustedBlendModeBlend();
      init_PoolGroup();
      init_colorToUniform();
      init_BatchableMesh();
      MeshPipe = class {
        constructor(renderer, adaptor) {
          this.localUniforms = new UniformGroup({
            uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
            uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
            uRound: { value: 0, type: "f32" }
          });
          this.localUniformsBindGroup = new BindGroup({
            0: this.localUniforms
          });
          this._meshDataHash = /* @__PURE__ */ Object.create(null);
          this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null);
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this.renderer = renderer;
          this._adaptor = adaptor;
          this._adaptor.init();
        }
        validateRenderable(mesh) {
          const meshData = this._getMeshData(mesh);
          const wasBatched = meshData.batched;
          const isBatched = mesh.batched;
          meshData.batched = isBatched;
          if (wasBatched !== isBatched) {
            return true;
          } else if (isBatched) {
            const geometry = mesh._geometry;
            if (geometry.indices.length !== meshData.indexSize || geometry.positions.length !== meshData.vertexSize) {
              meshData.indexSize = geometry.indices.length;
              meshData.vertexSize = geometry.positions.length;
              return true;
            }
            const batchableMesh = this._getBatchableMesh(mesh);
            const texture = mesh.texture;
            if (batchableMesh.texture._source !== texture._source) {
              if (batchableMesh.texture._source !== texture._source) {
                return !batchableMesh._batcher.checkAndUpdateTexture(batchableMesh, texture);
              }
            }
          }
          return false;
        }
        addRenderable(mesh, instructionSet) {
          const batcher = this.renderer.renderPipes.batch;
          const { batched } = this._getMeshData(mesh);
          if (batched) {
            const gpuBatchableMesh = this._getBatchableMesh(mesh);
            gpuBatchableMesh.texture = mesh._texture;
            gpuBatchableMesh.geometry = mesh._geometry;
            batcher.addToBatch(gpuBatchableMesh, instructionSet);
          } else {
            batcher.break(instructionSet);
            instructionSet.add(mesh);
          }
        }
        updateRenderable(mesh) {
          if (mesh.batched) {
            const gpuBatchableMesh = this._gpuBatchableMeshHash[mesh.uid];
            gpuBatchableMesh.texture = mesh._texture;
            gpuBatchableMesh.geometry = mesh._geometry;
            gpuBatchableMesh._batcher.updateElement(gpuBatchableMesh);
          }
        }
        destroyRenderable(mesh) {
          this._meshDataHash[mesh.uid] = null;
          const gpuMesh = this._gpuBatchableMeshHash[mesh.uid];
          if (gpuMesh) {
            BigPool.return(gpuMesh);
            this._gpuBatchableMeshHash[mesh.uid] = null;
          }
          mesh.off("destroyed", this._destroyRenderableBound);
        }
        execute(mesh) {
          if (!mesh.isRenderable)
            return;
          mesh.state.blendMode = getAdjustedBlendModeBlend(mesh.groupBlendMode, mesh.texture._source);
          const localUniforms = this.localUniforms;
          localUniforms.uniforms.uTransformMatrix = mesh.groupTransform;
          localUniforms.uniforms.uRound = this.renderer._roundPixels | mesh._roundPixels;
          localUniforms.update();
          color32BitToUniform(
            mesh.groupColorAlpha,
            localUniforms.uniforms.uColor,
            0
          );
          this._adaptor.execute(this, mesh);
        }
        _getMeshData(mesh) {
          return this._meshDataHash[mesh.uid] || this._initMeshData(mesh);
        }
        _initMeshData(mesh) {
          this._meshDataHash[mesh.uid] = {
            batched: mesh.batched,
            indexSize: mesh._geometry.indices?.length,
            vertexSize: mesh._geometry.positions?.length
          };
          mesh.on("destroyed", this._destroyRenderableBound);
          return this._meshDataHash[mesh.uid];
        }
        _getBatchableMesh(mesh) {
          return this._gpuBatchableMeshHash[mesh.uid] || this._initBatchableMesh(mesh);
        }
        _initBatchableMesh(mesh) {
          const gpuMesh = BigPool.get(BatchableMesh);
          gpuMesh.renderable = mesh;
          gpuMesh.texture = mesh._texture;
          gpuMesh.transform = mesh.groupTransform;
          gpuMesh.roundPixels = this.renderer._roundPixels | mesh._roundPixels;
          this._gpuBatchableMeshHash[mesh.uid] = gpuMesh;
          return gpuMesh;
        }
        destroy() {
          for (const i2 in this._gpuBatchableMeshHash) {
            if (this._gpuBatchableMeshHash[i2]) {
              BigPool.return(this._gpuBatchableMeshHash[i2]);
            }
          }
          this._gpuBatchableMeshHash = null;
          this._meshDataHash = null;
          this.localUniforms = null;
          this.localUniformsBindGroup = null;
          this._adaptor.destroy();
          this._adaptor = null;
          this.renderer = null;
        }
      };
      MeshPipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "mesh"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/mesh/init.mjs
  var init_init7 = __esm({
    "node_modules/pixi.js/lib/scene/mesh/init.mjs"() {
      init_Extensions();
      init_MeshPipe();
      extensions.add(MeshPipe);
    }
  });

  // node_modules/pixi.js/lib/scene/sprite/BatchableSprite.mjs
  var BatchableSprite;
  var init_BatchableSprite = __esm({
    "node_modules/pixi.js/lib/scene/sprite/BatchableSprite.mjs"() {
      "use strict";
      BatchableSprite = class {
        constructor() {
          this.batcherName = "default";
          this.attributeSize = 4;
          this.indexSize = 6;
          this.packAsQuad = true;
          this.roundPixels = 0;
          this._attributeStart = 0;
          this._batcher = null;
          this._batch = null;
        }
        get blendMode() {
          return this.renderable.groupBlendMode;
        }
        get color() {
          return this.renderable.groupColorAlpha;
        }
        reset() {
          this.renderable = null;
          this.texture = null;
          this._batcher = null;
          this._batch = null;
          this.bounds = null;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text/canvas/CanvasTextPipe.mjs
  var CanvasTextPipe;
  var init_CanvasTextPipe = __esm({
    "node_modules/pixi.js/lib/scene/text/canvas/CanvasTextPipe.mjs"() {
      init_Extensions();
      init_updateQuadBounds();
      init_PoolGroup();
      init_BatchableSprite();
      CanvasTextPipe = class {
        constructor(renderer) {
          this._gpuText = /* @__PURE__ */ Object.create(null);
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this._renderer = renderer;
          this._renderer.runners.resolutionChange.add(this);
        }
        resolutionChange() {
          for (const i2 in this._gpuText) {
            const gpuText = this._gpuText[i2];
            if (!gpuText)
              continue;
            const text = gpuText.batchableSprite.renderable;
            if (text._autoResolution) {
              text._resolution = this._renderer.resolution;
              text.onViewUpdate();
            }
          }
        }
        validateRenderable(text) {
          const gpuText = this._getGpuText(text);
          const newKey = text._getKey();
          if (gpuText.currentKey !== newKey) {
            const { width, height } = this._renderer.canvasText.getTextureSize(
              text.text,
              text.resolution,
              text._style
            );
            if (
              // is only being used by this text:
              this._renderer.canvasText.getReferenceCount(gpuText.currentKey) === 1 && width === gpuText.texture._source.width && height === gpuText.texture._source.height
            ) {
              return false;
            }
            return true;
          }
          return false;
        }
        addRenderable(text, instructionSet) {
          const gpuText = this._getGpuText(text);
          const batchableSprite = gpuText.batchableSprite;
          if (text._didTextUpdate) {
            this._updateText(text);
          }
          this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
        }
        updateRenderable(text) {
          const gpuText = this._getGpuText(text);
          const batchableSprite = gpuText.batchableSprite;
          if (text._didTextUpdate) {
            this._updateText(text);
          }
          batchableSprite._batcher.updateElement(batchableSprite);
        }
        destroyRenderable(text) {
          text.off("destroyed", this._destroyRenderableBound);
          this._destroyRenderableById(text.uid);
        }
        _destroyRenderableById(textUid) {
          const gpuText = this._gpuText[textUid];
          this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
          BigPool.return(gpuText.batchableSprite);
          this._gpuText[textUid] = null;
        }
        _updateText(text) {
          const newKey = text._getKey();
          const gpuText = this._getGpuText(text);
          const batchableSprite = gpuText.batchableSprite;
          if (gpuText.currentKey !== newKey) {
            this._updateGpuText(text);
          }
          text._didTextUpdate = false;
          const padding = text._style.padding;
          updateQuadBounds(batchableSprite.bounds, text._anchor, batchableSprite.texture, padding);
        }
        _updateGpuText(text) {
          const gpuText = this._getGpuText(text);
          const batchableSprite = gpuText.batchableSprite;
          if (gpuText.texture) {
            this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
          }
          gpuText.texture = batchableSprite.texture = this._renderer.canvasText.getManagedTexture(text);
          gpuText.currentKey = text._getKey();
          batchableSprite.texture = gpuText.texture;
        }
        _getGpuText(text) {
          return this._gpuText[text.uid] || this.initGpuText(text);
        }
        initGpuText(text) {
          const gpuTextData = {
            texture: null,
            currentKey: "--",
            batchableSprite: BigPool.get(BatchableSprite)
          };
          gpuTextData.batchableSprite.renderable = text;
          gpuTextData.batchableSprite.transform = text.groupTransform;
          gpuTextData.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
          gpuTextData.batchableSprite.roundPixels = this._renderer._roundPixels | text._roundPixels;
          this._gpuText[text.uid] = gpuTextData;
          text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
          this._updateText(text);
          text.on("destroyed", this._destroyRenderableBound);
          return gpuTextData;
        }
        destroy() {
          for (const i2 in this._gpuText) {
            this._destroyRenderableById(i2);
          }
          this._gpuText = null;
          this._renderer = null;
        }
      };
      CanvasTextPipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "text"
      };
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/CanvasPool.mjs
  var CanvasPoolClass, CanvasPool;
  var init_CanvasPool = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/CanvasPool.mjs"() {
      init_adapter();
      init_pow2();
      CanvasPoolClass = class {
        constructor(canvasOptions) {
          this._canvasPool = /* @__PURE__ */ Object.create(null);
          this.canvasOptions = canvasOptions || {};
          this.enableFullScreen = false;
        }
        /**
         * Creates texture with params that were specified in pool constructor.
         * @param pixelWidth - Width of texture in pixels.
         * @param pixelHeight - Height of texture in pixels.
         */
        _createCanvasAndContext(pixelWidth, pixelHeight) {
          const canvas = DOMAdapter.get().createCanvas();
          canvas.width = pixelWidth;
          canvas.height = pixelHeight;
          const context2 = canvas.getContext("2d");
          return { canvas, context: context2 };
        }
        /**
         * Gets a Power-of-Two render texture or fullScreen texture
         * @param minWidth - The minimum width of the render texture.
         * @param minHeight - The minimum height of the render texture.
         * @param resolution - The resolution of the render texture.
         * @returns The new render texture.
         */
        getOptimalCanvasAndContext(minWidth, minHeight, resolution = 1) {
          minWidth = Math.ceil(minWidth * resolution - 1e-6);
          minHeight = Math.ceil(minHeight * resolution - 1e-6);
          minWidth = nextPow2(minWidth);
          minHeight = nextPow2(minHeight);
          const key = (minWidth << 17) + (minHeight << 1);
          if (!this._canvasPool[key]) {
            this._canvasPool[key] = [];
          }
          let canvasAndContext = this._canvasPool[key].pop();
          if (!canvasAndContext) {
            canvasAndContext = this._createCanvasAndContext(minWidth, minHeight);
          }
          return canvasAndContext;
        }
        /**
         * Place a render texture back into the pool.
         * @param canvasAndContext
         */
        returnCanvasAndContext(canvasAndContext) {
          const canvas = canvasAndContext.canvas;
          const { width, height } = canvas;
          const key = (width << 17) + (height << 1);
          this._canvasPool[key].push(canvasAndContext);
        }
        clear() {
          this._canvasPool = {};
        }
      };
      CanvasPool = new CanvasPoolClass();
    }
  });

  // node_modules/pixi.js/lib/rendering/renderers/shared/texture/TexturePool.mjs
  var count, TexturePoolClass, TexturePool;
  var init_TexturePool = __esm({
    "node_modules/pixi.js/lib/rendering/renderers/shared/texture/TexturePool.mjs"() {
      init_pow2();
      init_TextureSource();
      init_Texture();
      count = 0;
      TexturePoolClass = class {
        /**
         * @param textureOptions - options that will be passed to BaseRenderTexture constructor
         * @param {SCALE_MODE} [textureOptions.scaleMode] - See {@link SCALE_MODE} for possible values.
         */
        constructor(textureOptions) {
          this._poolKeyHash = /* @__PURE__ */ Object.create(null);
          this._texturePool = {};
          this.textureOptions = textureOptions || {};
          this.enableFullScreen = false;
        }
        /**
         * Creates texture with params that were specified in pool constructor.
         * @param pixelWidth - Width of texture in pixels.
         * @param pixelHeight - Height of texture in pixels.
         * @param antialias
         */
        createTexture(pixelWidth, pixelHeight, antialias) {
          const textureSource = new TextureSource({
            ...this.textureOptions,
            width: pixelWidth,
            height: pixelHeight,
            resolution: 1,
            antialias,
            autoGarbageCollect: true
          });
          return new Texture({
            source: textureSource,
            label: `texturePool_${count++}`
          });
        }
        /**
         * Gets a Power-of-Two render texture or fullScreen texture
         * @param frameWidth - The minimum width of the render texture.
         * @param frameHeight - The minimum height of the render texture.
         * @param resolution - The resolution of the render texture.
         * @param antialias
         * @returns The new render texture.
         */
        getOptimalTexture(frameWidth, frameHeight, resolution = 1, antialias) {
          let po2Width = Math.ceil(frameWidth * resolution - 1e-6);
          let po2Height = Math.ceil(frameHeight * resolution - 1e-6);
          po2Width = nextPow2(po2Width);
          po2Height = nextPow2(po2Height);
          const key = (po2Width << 17) + (po2Height << 1) + (antialias ? 1 : 0);
          if (!this._texturePool[key]) {
            this._texturePool[key] = [];
          }
          let texture = this._texturePool[key].pop();
          if (!texture) {
            texture = this.createTexture(po2Width, po2Height, antialias);
          }
          texture.source._resolution = resolution;
          texture.source.width = po2Width / resolution;
          texture.source.height = po2Height / resolution;
          texture.source.pixelWidth = po2Width;
          texture.source.pixelHeight = po2Height;
          texture.frame.x = 0;
          texture.frame.y = 0;
          texture.frame.width = frameWidth;
          texture.frame.height = frameHeight;
          texture.updateUvs();
          this._poolKeyHash[texture.uid] = key;
          return texture;
        }
        /**
         * Gets extra texture of the same size as input renderTexture
         * @param texture - The texture to check what size it is.
         * @param antialias - Whether to use antialias.
         * @returns A texture that is a power of two
         */
        getSameSizeTexture(texture, antialias = false) {
          const source = texture.source;
          return this.getOptimalTexture(texture.width, texture.height, source._resolution, antialias);
        }
        /**
         * Place a render texture back into the pool.
         * @param renderTexture - The renderTexture to free
         */
        returnTexture(renderTexture) {
          const key = this._poolKeyHash[renderTexture.uid];
          this._texturePool[key].push(renderTexture);
        }
        /**
         * Clears the pool.
         * @param destroyTextures - Destroy all stored textures.
         */
        clear(destroyTextures) {
          destroyTextures = destroyTextures !== false;
          if (destroyTextures) {
            for (const i2 in this._texturePool) {
              const textures = this._texturePool[i2];
              if (textures) {
                for (let j2 = 0; j2 < textures.length; j2++) {
                  textures[j2].destroy(true);
                }
              }
            }
          }
          this._texturePool = {};
        }
      };
      TexturePool = new TexturePoolClass();
    }
  });

  // node_modules/pixi.js/lib/utils/canvas/getCanvasBoundingBox.mjs
  function checkRow(data, width, y2) {
    for (let x2 = 0, index = 4 * y2 * width; x2 < width; ++x2, index += 4) {
      if (data[index + 3] !== 0)
        return false;
    }
    return true;
  }
  function checkColumn(data, width, x2, top, bottom) {
    const stride = 4 * width;
    for (let y2 = top, index = top * stride + 4 * x2; y2 <= bottom; ++y2, index += stride) {
      if (data[index + 3] !== 0)
        return false;
    }
    return true;
  }
  function getCanvasBoundingBox(canvas, resolution = 1) {
    const { width, height } = canvas;
    const context2 = canvas.getContext("2d", {
      willReadFrequently: true
    });
    if (context2 === null) {
      throw new TypeError("Failed to get canvas 2D context");
    }
    const imageData = context2.getImageData(0, 0, width, height);
    const data = imageData.data;
    let left = 0;
    let top = 0;
    let right = width - 1;
    let bottom = height - 1;
    while (top < height && checkRow(data, width, top))
      ++top;
    if (top === height)
      return Rectangle.EMPTY;
    while (checkRow(data, width, bottom))
      --bottom;
    while (checkColumn(data, width, left, top, bottom))
      ++left;
    while (checkColumn(data, width, right, top, bottom))
      --right;
    ++right;
    ++bottom;
    return new Rectangle(left / resolution, top / resolution, (right - left) / resolution, (bottom - top) / resolution);
  }
  var init_getCanvasBoundingBox = __esm({
    "node_modules/pixi.js/lib/utils/canvas/getCanvasBoundingBox.mjs"() {
      init_Rectangle();
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/fill/FillGradient.mjs
  var _FillGradient, FillGradient;
  var init_FillGradient = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/fill/FillGradient.mjs"() {
      init_Color();
      init_adapter();
      init_Matrix();
      init_ImageSource();
      init_Texture();
      init_uid();
      _FillGradient = class _FillGradient2 {
        constructor(x0, y0, x1, y1) {
          this.uid = uid("fillGradient");
          this.type = "linear";
          this.gradientStops = [];
          this._styleKey = null;
          this.x0 = x0;
          this.y0 = y0;
          this.x1 = x1;
          this.y1 = y1;
        }
        addColorStop(offset, color) {
          this.gradientStops.push({ offset, color: Color.shared.setValue(color).toHexa() });
          this._styleKey = null;
          return this;
        }
        // TODO move to the system!
        buildLinearGradient() {
          const defaultSize = _FillGradient2.defaultTextureSize;
          const { gradientStops } = this;
          const canvas = DOMAdapter.get().createCanvas();
          canvas.width = defaultSize;
          canvas.height = defaultSize;
          const ctx = canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, _FillGradient2.defaultTextureSize, 1);
          for (let i2 = 0; i2 < gradientStops.length; i2++) {
            const stop = gradientStops[i2];
            gradient.addColorStop(stop.offset, stop.color);
          }
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, defaultSize, defaultSize);
          this.texture = new Texture({
            source: new ImageSource({
              resource: canvas,
              addressModeU: "clamp-to-edge",
              addressModeV: "repeat"
            })
          });
          const { x0, y0, x1, y1 } = this;
          const m2 = new Matrix();
          const dx = x1 - x0;
          const dy = y1 - y0;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          m2.translate(-x0, -y0);
          m2.scale(1 / defaultSize, 1 / defaultSize);
          m2.rotate(-angle);
          m2.scale(256 / dist, 1);
          this.transform = m2;
          this._styleKey = null;
        }
        get styleKey() {
          if (this._styleKey) {
            return this._styleKey;
          }
          const stops = this.gradientStops.map((stop) => `${stop.offset}-${stop.color}`).join("-");
          const texture = this.texture.uid;
          const transform2 = this.transform.toArray().join("-");
          return `fill-gradient-${this.uid}-${stops}-${texture}-${transform2}-${this.x0}-${this.y0}-${this.x1}-${this.y1}`;
        }
      };
      _FillGradient.defaultTextureSize = 256;
      FillGradient = _FillGradient;
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/fill/FillPattern.mjs
  var repetitionMap, FillPattern;
  var init_FillPattern = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/fill/FillPattern.mjs"() {
      init_Matrix();
      init_uid();
      repetitionMap = {
        repeat: {
          addressModeU: "repeat",
          addressModeV: "repeat"
        },
        "repeat-x": {
          addressModeU: "repeat",
          addressModeV: "clamp-to-edge"
        },
        "repeat-y": {
          addressModeU: "clamp-to-edge",
          addressModeV: "repeat"
        },
        "no-repeat": {
          addressModeU: "clamp-to-edge",
          addressModeV: "clamp-to-edge"
        }
      };
      FillPattern = class {
        constructor(texture, repetition) {
          this.uid = uid("fillPattern");
          this.transform = new Matrix();
          this._styleKey = null;
          this.texture = texture;
          this.transform.scale(
            1 / texture.frame.width,
            1 / texture.frame.height
          );
          if (repetition) {
            texture.source.style.addressModeU = repetitionMap[repetition].addressModeU;
            texture.source.style.addressModeV = repetitionMap[repetition].addressModeV;
          }
        }
        setTransform(transform2) {
          const texture = this.texture;
          this.transform.copyFrom(transform2);
          this.transform.invert();
          this.transform.scale(
            1 / texture.frame.width,
            1 / texture.frame.height
          );
          this._styleKey = null;
        }
        get styleKey() {
          if (this._styleKey)
            return this._styleKey;
          this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`;
          return this._styleKey;
        }
      };
    }
  });

  // node_modules/parse-svg-path/index.js
  var require_parse_svg_path = __commonJS({
    "node_modules/parse-svg-path/index.js"(exports, module) {
      module.exports = parse2;
      var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };
      var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
      function parse2(path2) {
        var data = [];
        path2.replace(segment, function(_, command, args) {
          var type = command.toLowerCase();
          args = parseValues(args);
          if (type == "m" && args.length > 2) {
            data.push([command].concat(args.splice(0, 2)));
            type = "l";
            command = command == "m" ? "l" : "L";
          }
          while (true) {
            if (args.length == length[type]) {
              args.unshift(command);
              return data.push(args);
            }
            if (args.length < length[type]) throw new Error("malformed path data");
            data.push([command].concat(args.splice(0, length[type])));
          }
        });
        return data;
      }
      var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
      function parseValues(args) {
        var numbers = args.match(number);
        return numbers ? numbers.map(Number) : [];
      }
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/svg/SVGToGraphicsPath.mjs
  function SVGToGraphicsPath(svgPath, path2) {
    const commands = (0, import_parse_svg_path.default)(svgPath);
    const subpaths = [];
    let currentSubPath = null;
    let lastX = 0;
    let lastY = 0;
    for (let i2 = 0; i2 < commands.length; i2++) {
      const command = commands[i2];
      const type = command[0];
      const data = command;
      switch (type) {
        case "M":
          lastX = data[1];
          lastY = data[2];
          path2.moveTo(lastX, lastY);
          break;
        case "m":
          lastX += data[1];
          lastY += data[2];
          path2.moveTo(lastX, lastY);
          break;
        case "H":
          lastX = data[1];
          path2.lineTo(lastX, lastY);
          break;
        case "h":
          lastX += data[1];
          path2.lineTo(lastX, lastY);
          break;
        case "V":
          lastY = data[1];
          path2.lineTo(lastX, lastY);
          break;
        case "v":
          lastY += data[1];
          path2.lineTo(lastX, lastY);
          break;
        case "L":
          lastX = data[1];
          lastY = data[2];
          path2.lineTo(lastX, lastY);
          break;
        case "l":
          lastX += data[1];
          lastY += data[2];
          path2.lineTo(lastX, lastY);
          break;
        case "C":
          lastX = data[5];
          lastY = data[6];
          path2.bezierCurveTo(
            data[1],
            data[2],
            data[3],
            data[4],
            lastX,
            lastY
          );
          break;
        case "c":
          path2.bezierCurveTo(
            lastX + data[1],
            lastY + data[2],
            lastX + data[3],
            lastY + data[4],
            lastX + data[5],
            lastY + data[6]
          );
          lastX += data[5];
          lastY += data[6];
          break;
        case "S":
          lastX = data[3];
          lastY = data[4];
          path2.bezierCurveToShort(
            data[1],
            data[2],
            lastX,
            lastY
          );
          break;
        case "s":
          path2.bezierCurveToShort(
            lastX + data[1],
            lastY + data[2],
            lastX + data[3],
            lastY + data[4]
          );
          lastX += data[3];
          lastY += data[4];
          break;
        case "Q":
          lastX = data[3];
          lastY = data[4];
          path2.quadraticCurveTo(
            data[1],
            data[2],
            lastX,
            lastY
          );
          break;
        case "q":
          path2.quadraticCurveTo(
            lastX + data[1],
            lastY + data[2],
            lastX + data[3],
            lastY + data[4]
          );
          lastX += data[3];
          lastY += data[4];
          break;
        case "T":
          lastX = data[1];
          lastY = data[2];
          path2.quadraticCurveToShort(
            lastX,
            lastY
          );
          break;
        case "t":
          lastX += data[1];
          lastY += data[2];
          path2.quadraticCurveToShort(
            lastX,
            lastY
          );
          break;
        case "A":
          lastX = data[6];
          lastY = data[7];
          path2.arcToSvg(
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            lastX,
            lastY
          );
          break;
        case "a":
          lastX += data[6];
          lastY += data[7];
          path2.arcToSvg(
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            lastX,
            lastY
          );
          break;
        case "Z":
        case "z":
          path2.closePath();
          if (subpaths.length > 0) {
            currentSubPath = subpaths.pop();
            if (currentSubPath) {
              lastX = currentSubPath.startX;
              lastY = currentSubPath.startY;
            } else {
              lastX = 0;
              lastY = 0;
            }
          }
          currentSubPath = null;
          break;
        default:
          warn(`Unknown SVG path command: ${type}`);
      }
      if (type !== "Z" && type !== "z") {
        if (currentSubPath === null) {
          currentSubPath = { startX: lastX, startY: lastY };
          subpaths.push(currentSubPath);
        }
      }
    }
    return path2;
  }
  var import_parse_svg_path;
  var init_SVGToGraphicsPath = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/svg/SVGToGraphicsPath.mjs"() {
      import_parse_svg_path = __toESM(require_parse_svg_path(), 1);
      init_warn();
    }
  });

  // node_modules/pixi.js/lib/maths/shapes/Circle.mjs
  var Circle;
  var init_Circle = __esm({
    "node_modules/pixi.js/lib/maths/shapes/Circle.mjs"() {
      init_Rectangle();
      Circle = class _Circle {
        /**
         * @param x - The X coordinate of the center of this circle
         * @param y - The Y coordinate of the center of this circle
         * @param radius - The radius of the circle
         */
        constructor(x2 = 0, y2 = 0, radius = 0) {
          this.type = "circle";
          this.x = x2;
          this.y = y2;
          this.radius = radius;
        }
        /**
         * Creates a clone of this Circle instance
         * @returns A copy of the Circle
         */
        clone() {
          return new _Circle(this.x, this.y, this.radius);
        }
        /**
         * Checks whether the x and y coordinates given are contained within this circle
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @returns Whether the x/y coordinates are within this Circle
         */
        contains(x2, y2) {
          if (this.radius <= 0)
            return false;
          const r2 = this.radius * this.radius;
          let dx = this.x - x2;
          let dy = this.y - y2;
          dx *= dx;
          dy *= dy;
          return dx + dy <= r2;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this circle including the stroke.
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @param width - The width of the line to check
         * @returns Whether the x/y coordinates are within this Circle
         */
        strokeContains(x2, y2, width) {
          if (this.radius === 0)
            return false;
          const dx = this.x - x2;
          const dy = this.y - y2;
          const r2 = this.radius;
          const w2 = width / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < r2 + w2 && distance > r2 - w2;
        }
        /**
         * Returns the framing rectangle of the circle as a Rectangle object
         * @param out
         * @returns The framing rectangle
         */
        getBounds(out2) {
          out2 = out2 || new Rectangle();
          out2.x = this.x - this.radius;
          out2.y = this.y - this.radius;
          out2.width = this.radius * 2;
          out2.height = this.radius * 2;
          return out2;
        }
        /**
         * Copies another circle to this one.
         * @param circle - The circle to copy from.
         * @returns Returns itself.
         */
        copyFrom(circle) {
          this.x = circle.x;
          this.y = circle.y;
          this.radius = circle.radius;
          return this;
        }
        /**
         * Copies this circle to another one.
         * @param circle - The circle to copy to.
         * @returns Returns given parameter.
         */
        copyTo(circle) {
          circle.copyFrom(this);
          return circle;
        }
        toString() {
          return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/maths/shapes/Ellipse.mjs
  var Ellipse;
  var init_Ellipse = __esm({
    "node_modules/pixi.js/lib/maths/shapes/Ellipse.mjs"() {
      init_Rectangle();
      Ellipse = class _Ellipse {
        /**
         * @param x - The X coordinate of the center of this ellipse
         * @param y - The Y coordinate of the center of this ellipse
         * @param halfWidth - The half width of this ellipse
         * @param halfHeight - The half height of this ellipse
         */
        constructor(x2 = 0, y2 = 0, halfWidth = 0, halfHeight = 0) {
          this.type = "ellipse";
          this.x = x2;
          this.y = y2;
          this.halfWidth = halfWidth;
          this.halfHeight = halfHeight;
        }
        /**
         * Creates a clone of this Ellipse instance
         * @returns {Ellipse} A copy of the ellipse
         */
        clone() {
          return new _Ellipse(this.x, this.y, this.halfWidth, this.halfHeight);
        }
        /**
         * Checks whether the x and y coordinates given are contained within this ellipse
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @returns Whether the x/y coords are within this ellipse
         */
        contains(x2, y2) {
          if (this.halfWidth <= 0 || this.halfHeight <= 0) {
            return false;
          }
          let normx = (x2 - this.x) / this.halfWidth;
          let normy = (y2 - this.y) / this.halfHeight;
          normx *= normx;
          normy *= normy;
          return normx + normy <= 1;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this ellipse including stroke
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @param width
         * @returns Whether the x/y coords are within this ellipse
         */
        strokeContains(x2, y2, width) {
          const { halfWidth, halfHeight } = this;
          if (halfWidth <= 0 || halfHeight <= 0) {
            return false;
          }
          const halfStrokeWidth = width / 2;
          const innerA = halfWidth - halfStrokeWidth;
          const innerB = halfHeight - halfStrokeWidth;
          const outerA = halfWidth + halfStrokeWidth;
          const outerB = halfHeight + halfStrokeWidth;
          const normalizedX = x2 - this.x;
          const normalizedY = y2 - this.y;
          const innerEllipse = normalizedX * normalizedX / (innerA * innerA) + normalizedY * normalizedY / (innerB * innerB);
          const outerEllipse = normalizedX * normalizedX / (outerA * outerA) + normalizedY * normalizedY / (outerB * outerB);
          return innerEllipse > 1 && outerEllipse <= 1;
        }
        /**
         * Returns the framing rectangle of the ellipse as a Rectangle object
         * @param out
         * @returns The framing rectangle
         */
        getBounds(out2) {
          out2 = out2 || new Rectangle();
          out2.x = this.x - this.halfWidth;
          out2.y = this.y - this.halfHeight;
          out2.width = this.halfWidth * 2;
          out2.height = this.halfHeight * 2;
          return out2;
        }
        /**
         * Copies another ellipse to this one.
         * @param ellipse - The ellipse to copy from.
         * @returns Returns itself.
         */
        copyFrom(ellipse) {
          this.x = ellipse.x;
          this.y = ellipse.y;
          this.halfWidth = ellipse.halfWidth;
          this.halfHeight = ellipse.halfHeight;
          return this;
        }
        /**
         * Copies this ellipse to another one.
         * @param ellipse - The ellipse to copy to.
         * @returns Returns given parameter.
         */
        copyTo(ellipse) {
          ellipse.copyFrom(this);
          return ellipse;
        }
        toString() {
          return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/maths/misc/squaredDistanceToLineSegment.mjs
  function squaredDistanceToLineSegment(x2, y2, x1, y1, x22, y22) {
    const a2 = x2 - x1;
    const b2 = y2 - y1;
    const c2 = x22 - x1;
    const d2 = y22 - y1;
    const dot = a2 * c2 + b2 * d2;
    const lenSq = c2 * c2 + d2 * d2;
    let param = -1;
    if (lenSq !== 0) {
      param = dot / lenSq;
    }
    let xx;
    let yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x22;
      yy = y22;
    } else {
      xx = x1 + param * c2;
      yy = y1 + param * d2;
    }
    const dx = x2 - xx;
    const dy = y2 - yy;
    return dx * dx + dy * dy;
  }
  var init_squaredDistanceToLineSegment = __esm({
    "node_modules/pixi.js/lib/maths/misc/squaredDistanceToLineSegment.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/maths/shapes/Polygon.mjs
  var Polygon;
  var init_Polygon = __esm({
    "node_modules/pixi.js/lib/maths/shapes/Polygon.mjs"() {
      init_squaredDistanceToLineSegment();
      init_Rectangle();
      Polygon = class _Polygon {
        /**
         * @param points - This can be an array of Points
         *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
         *  the arguments passed can be all the points of the polygon e.g.
         *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
         *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
         */
        constructor(...points) {
          this.type = "polygon";
          let flat = Array.isArray(points[0]) ? points[0] : points;
          if (typeof flat[0] !== "number") {
            const p2 = [];
            for (let i2 = 0, il = flat.length; i2 < il; i2++) {
              p2.push(flat[i2].x, flat[i2].y);
            }
            flat = p2;
          }
          this.points = flat;
          this.closePath = true;
        }
        /**
         * Creates a clone of this polygon.
         * @returns - A copy of the polygon.
         */
        clone() {
          const points = this.points.slice();
          const polygon = new _Polygon(points);
          polygon.closePath = this.closePath;
          return polygon;
        }
        /**
         * Checks whether the x and y coordinates passed to this function are contained within this polygon.
         * @param x - The X coordinate of the point to test.
         * @param y - The Y coordinate of the point to test.
         * @returns - Whether the x/y coordinates are within this polygon.
         */
        contains(x2, y2) {
          let inside = false;
          const length = this.points.length / 2;
          for (let i2 = 0, j2 = length - 1; i2 < length; j2 = i2++) {
            const xi = this.points[i2 * 2];
            const yi = this.points[i2 * 2 + 1];
            const xj = this.points[j2 * 2];
            const yj = this.points[j2 * 2 + 1];
            const intersect = yi > y2 !== yj > y2 && x2 < (xj - xi) * ((y2 - yi) / (yj - yi)) + xi;
            if (intersect) {
              inside = !inside;
            }
          }
          return inside;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this polygon including the stroke.
         * @param x - The X coordinate of the point to test
         * @param y - The Y coordinate of the point to test
         * @param strokeWidth - The width of the line to check
         * @returns Whether the x/y coordinates are within this polygon
         */
        strokeContains(x2, y2, strokeWidth) {
          const halfStrokeWidth = strokeWidth / 2;
          const halfStrokeWidthSqrd = halfStrokeWidth * halfStrokeWidth;
          const { points } = this;
          const iterationLength = points.length - (this.closePath ? 0 : 2);
          for (let i2 = 0; i2 < iterationLength; i2 += 2) {
            const x1 = points[i2];
            const y1 = points[i2 + 1];
            const x22 = points[(i2 + 2) % points.length];
            const y22 = points[(i2 + 3) % points.length];
            const distanceSqrd = squaredDistanceToLineSegment(x2, y2, x1, y1, x22, y22);
            if (distanceSqrd <= halfStrokeWidthSqrd) {
              return true;
            }
          }
          return false;
        }
        /**
         * Returns the framing rectangle of the polygon as a Rectangle object
         * @param out - optional rectangle to store the result
         * @returns The framing rectangle
         */
        getBounds(out2) {
          out2 = out2 || new Rectangle();
          const points = this.points;
          let minX = Infinity;
          let maxX = -Infinity;
          let minY = Infinity;
          let maxY = -Infinity;
          for (let i2 = 0, n2 = points.length; i2 < n2; i2 += 2) {
            const x2 = points[i2];
            const y2 = points[i2 + 1];
            minX = x2 < minX ? x2 : minX;
            maxX = x2 > maxX ? x2 : maxX;
            minY = y2 < minY ? y2 : minY;
            maxY = y2 > maxY ? y2 : maxY;
          }
          out2.x = minX;
          out2.width = maxX - minX;
          out2.y = minY;
          out2.height = maxY - minY;
          return out2;
        }
        /**
         * Copies another polygon to this one.
         * @param polygon - The polygon to copy from.
         * @returns Returns itself.
         */
        copyFrom(polygon) {
          this.points = polygon.points.slice();
          this.closePath = polygon.closePath;
          return this;
        }
        /**
         * Copies this polygon to another one.
         * @param polygon - The polygon to copy to.
         * @returns Returns given parameter.
         */
        copyTo(polygon) {
          polygon.copyFrom(this);
          return polygon;
        }
        toString() {
          return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((pointsDesc, currentPoint) => `${pointsDesc}, ${currentPoint}`, "")}]`;
        }
        /**
         * Get the last X coordinate of the polygon
         * @readonly
         */
        get lastX() {
          return this.points[this.points.length - 2];
        }
        /**
         * Get the last Y coordinate of the polygon
         * @readonly
         */
        get lastY() {
          return this.points[this.points.length - 1];
        }
        /**
         * Get the first X coordinate of the polygon
         * @readonly
         */
        get x() {
          return this.points[this.points.length - 2];
        }
        /**
         * Get the first Y coordinate of the polygon
         * @readonly
         */
        get y() {
          return this.points[this.points.length - 1];
        }
      };
    }
  });

  // node_modules/pixi.js/lib/maths/shapes/RoundedRectangle.mjs
  var isCornerWithinStroke, RoundedRectangle;
  var init_RoundedRectangle = __esm({
    "node_modules/pixi.js/lib/maths/shapes/RoundedRectangle.mjs"() {
      init_Rectangle();
      isCornerWithinStroke = (pX, pY, cornerX, cornerY, radius, halfStrokeWidth) => {
        const dx = pX - cornerX;
        const dy = pY - cornerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance >= radius - halfStrokeWidth && distance <= radius + halfStrokeWidth;
      };
      RoundedRectangle = class _RoundedRectangle {
        /**
         * @param x - The X coordinate of the upper-left corner of the rounded rectangle
         * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
         * @param width - The overall width of this rounded rectangle
         * @param height - The overall height of this rounded rectangle
         * @param radius - Controls the radius of the rounded corners
         */
        constructor(x2 = 0, y2 = 0, width = 0, height = 0, radius = 20) {
          this.type = "roundedRectangle";
          this.x = x2;
          this.y = y2;
          this.width = width;
          this.height = height;
          this.radius = radius;
        }
        /**
         * Returns the framing rectangle of the rounded rectangle as a Rectangle object
         * @param out - optional rectangle to store the result
         * @returns The framing rectangle
         */
        getBounds(out2) {
          out2 = out2 || new Rectangle();
          out2.x = this.x;
          out2.y = this.y;
          out2.width = this.width;
          out2.height = this.height;
          return out2;
        }
        /**
         * Creates a clone of this Rounded Rectangle.
         * @returns - A copy of the rounded rectangle.
         */
        clone() {
          return new _RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
        }
        /**
         * Copies another rectangle to this one.
         * @param rectangle - The rectangle to copy from.
         * @returns Returns itself.
         */
        copyFrom(rectangle) {
          this.x = rectangle.x;
          this.y = rectangle.y;
          this.width = rectangle.width;
          this.height = rectangle.height;
          return this;
        }
        /**
         * Copies this rectangle to another one.
         * @param rectangle - The rectangle to copy to.
         * @returns Returns given parameter.
         */
        copyTo(rectangle) {
          rectangle.copyFrom(this);
          return rectangle;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
         * @param x - The X coordinate of the point to test.
         * @param y - The Y coordinate of the point to test.
         * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
         */
        contains(x2, y2) {
          if (this.width <= 0 || this.height <= 0) {
            return false;
          }
          if (x2 >= this.x && x2 <= this.x + this.width) {
            if (y2 >= this.y && y2 <= this.y + this.height) {
              const radius = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
              if (y2 >= this.y + radius && y2 <= this.y + this.height - radius || x2 >= this.x + radius && x2 <= this.x + this.width - radius) {
                return true;
              }
              let dx = x2 - (this.x + radius);
              let dy = y2 - (this.y + radius);
              const radius2 = radius * radius;
              if (dx * dx + dy * dy <= radius2) {
                return true;
              }
              dx = x2 - (this.x + this.width - radius);
              if (dx * dx + dy * dy <= radius2) {
                return true;
              }
              dy = y2 - (this.y + this.height - radius);
              if (dx * dx + dy * dy <= radius2) {
                return true;
              }
              dx = x2 - (this.x + radius);
              if (dx * dx + dy * dy <= radius2) {
                return true;
              }
            }
          }
          return false;
        }
        /**
         * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
         * @param pX - The X coordinate of the point to test
         * @param pY - The Y coordinate of the point to test
         * @param strokeWidth - The width of the line to check
         * @returns Whether the x/y coordinates are within this rectangle
         */
        strokeContains(pX, pY, strokeWidth) {
          const { x: x2, y: y2, width, height, radius } = this;
          const halfStrokeWidth = strokeWidth / 2;
          const innerX = x2 + radius;
          const innerY = y2 + radius;
          const innerWidth = width - radius * 2;
          const innerHeight = height - radius * 2;
          const rightBound = x2 + width;
          const bottomBound = y2 + height;
          if ((pX >= x2 - halfStrokeWidth && pX <= x2 + halfStrokeWidth || pX >= rightBound - halfStrokeWidth && pX <= rightBound + halfStrokeWidth) && pY >= innerY && pY <= innerY + innerHeight) {
            return true;
          }
          if ((pY >= y2 - halfStrokeWidth && pY <= y2 + halfStrokeWidth || pY >= bottomBound - halfStrokeWidth && pY <= bottomBound + halfStrokeWidth) && pX >= innerX && pX <= innerX + innerWidth) {
            return true;
          }
          return (
            // Top-left
            pX < innerX && pY < innerY && isCornerWithinStroke(pX, pY, innerX, innerY, radius, halfStrokeWidth) || pX > rightBound - radius && pY < innerY && isCornerWithinStroke(pX, pY, rightBound - radius, innerY, radius, halfStrokeWidth) || pX > rightBound - radius && pY > bottomBound - radius && isCornerWithinStroke(pX, pY, rightBound - radius, bottomBound - radius, radius, halfStrokeWidth) || pX < innerX && pY > bottomBound - radius && isCornerWithinStroke(pX, pY, innerX, bottomBound - radius, radius, halfStrokeWidth)
          );
        }
        toString() {
          return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildAdaptiveBezier.mjs
  function buildAdaptiveBezier(points, sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, smoothness) {
    const scale = 1;
    const smoothing = Math.min(
      0.99,
      // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
      Math.max(0, smoothness ?? GraphicsContextSystem.defaultOptions.bezierSmoothness)
    );
    let distanceTolerance = (PATH_DISTANCE_EPSILON - smoothing) / scale;
    distanceTolerance *= distanceTolerance;
    begin(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance);
    return points;
  }
  function begin(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance) {
    recursive(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance, 0);
    points.push(eX, eY);
  }
  function recursive(x1, y1, x2, y2, x3, y3, x4, y4, points, distanceTolerance, level) {
    if (level > RECURSION_LIMIT) {
      return;
    }
    const pi = Math.PI;
    const x12 = (x1 + x2) / 2;
    const y12 = (y1 + y2) / 2;
    const x23 = (x2 + x3) / 2;
    const y23 = (y2 + y3) / 2;
    const x34 = (x3 + x4) / 2;
    const y34 = (y3 + y4) / 2;
    const x123 = (x12 + x23) / 2;
    const y123 = (y12 + y23) / 2;
    const x234 = (x23 + x34) / 2;
    const y234 = (y23 + y34) / 2;
    const x1234 = (x123 + x234) / 2;
    const y1234 = (y123 + y234) / 2;
    if (level > 0) {
      let dx = x4 - x1;
      let dy = y4 - y1;
      const d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx);
      const d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx);
      let da1;
      let da2;
      if (d2 > FLT_EPSILON && d3 > FLT_EPSILON) {
        if ((d2 + d3) * (d2 + d3) <= distanceTolerance * (dx * dx + dy * dy)) {
          if (mAngleTolerance < curveAngleToleranceEpsilon) {
            points.push(x1234, y1234);
            return;
          }
          const a23 = Math.atan2(y3 - y2, x3 - x2);
          da1 = Math.abs(a23 - Math.atan2(y2 - y1, x2 - x1));
          da2 = Math.abs(Math.atan2(y4 - y3, x4 - x3) - a23);
          if (da1 >= pi)
            da1 = 2 * pi - da1;
          if (da2 >= pi)
            da2 = 2 * pi - da2;
          if (da1 + da2 < mAngleTolerance) {
            points.push(x1234, y1234);
            return;
          }
          if (mCuspLimit !== 0) {
            if (da1 > mCuspLimit) {
              points.push(x2, y2);
              return;
            }
            if (da2 > mCuspLimit) {
              points.push(x3, y3);
              return;
            }
          }
        }
      } else if (d2 > FLT_EPSILON) {
        if (d2 * d2 <= distanceTolerance * (dx * dx + dy * dy)) {
          if (mAngleTolerance < curveAngleToleranceEpsilon) {
            points.push(x1234, y1234);
            return;
          }
          da1 = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1));
          if (da1 >= pi)
            da1 = 2 * pi - da1;
          if (da1 < mAngleTolerance) {
            points.push(x2, y2);
            points.push(x3, y3);
            return;
          }
          if (mCuspLimit !== 0) {
            if (da1 > mCuspLimit) {
              points.push(x2, y2);
              return;
            }
          }
        }
      } else if (d3 > FLT_EPSILON) {
        if (d3 * d3 <= distanceTolerance * (dx * dx + dy * dy)) {
          if (mAngleTolerance < curveAngleToleranceEpsilon) {
            points.push(x1234, y1234);
            return;
          }
          da1 = Math.abs(Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y3 - y2, x3 - x2));
          if (da1 >= pi)
            da1 = 2 * pi - da1;
          if (da1 < mAngleTolerance) {
            points.push(x2, y2);
            points.push(x3, y3);
            return;
          }
          if (mCuspLimit !== 0) {
            if (da1 > mCuspLimit) {
              points.push(x3, y3);
              return;
            }
          }
        }
      } else {
        dx = x1234 - (x1 + x4) / 2;
        dy = y1234 - (y1 + y4) / 2;
        if (dx * dx + dy * dy <= distanceTolerance) {
          points.push(x1234, y1234);
          return;
        }
      }
    }
    recursive(x1, y1, x12, y12, x123, y123, x1234, y1234, points, distanceTolerance, level + 1);
    recursive(x1234, y1234, x234, y234, x34, y34, x4, y4, points, distanceTolerance, level + 1);
  }
  var RECURSION_LIMIT, FLT_EPSILON, PATH_DISTANCE_EPSILON, curveAngleToleranceEpsilon, mAngleTolerance, mCuspLimit;
  var init_buildAdaptiveBezier = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildAdaptiveBezier.mjs"() {
      init_GraphicsContextSystem();
      RECURSION_LIMIT = 8;
      FLT_EPSILON = 11920929e-14;
      PATH_DISTANCE_EPSILON = 1;
      curveAngleToleranceEpsilon = 0.01;
      mAngleTolerance = 0;
      mCuspLimit = 0;
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildAdaptiveQuadratic.mjs
  function buildAdaptiveQuadratic(points, sX, sY, cp1x, cp1y, eX, eY, smoothness) {
    const scale = 1;
    const smoothing = Math.min(
      0.99,
      // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
      Math.max(0, smoothness ?? GraphicsContextSystem.defaultOptions.bezierSmoothness)
    );
    let distanceTolerance = (PATH_DISTANCE_EPSILON2 - smoothing) / scale;
    distanceTolerance *= distanceTolerance;
    begin2(sX, sY, cp1x, cp1y, eX, eY, points, distanceTolerance);
    return points;
  }
  function begin2(sX, sY, cp1x, cp1y, eX, eY, points, distanceTolerance) {
    recursive2(points, sX, sY, cp1x, cp1y, eX, eY, distanceTolerance, 0);
    points.push(eX, eY);
  }
  function recursive2(points, x1, y1, x2, y2, x3, y3, distanceTolerance, level) {
    if (level > RECURSION_LIMIT2) {
      return;
    }
    const pi = Math.PI;
    const x12 = (x1 + x2) / 2;
    const y12 = (y1 + y2) / 2;
    const x23 = (x2 + x3) / 2;
    const y23 = (y2 + y3) / 2;
    const x123 = (x12 + x23) / 2;
    const y123 = (y12 + y23) / 2;
    let dx = x3 - x1;
    let dy = y3 - y1;
    const d2 = Math.abs((x2 - x3) * dy - (y2 - y3) * dx);
    if (d2 > FLT_EPSILON2) {
      if (d2 * d2 <= distanceTolerance * (dx * dx + dy * dy)) {
        if (mAngleTolerance2 < curveAngleToleranceEpsilon2) {
          points.push(x123, y123);
          return;
        }
        let da = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1));
        if (da >= pi)
          da = 2 * pi - da;
        if (da < mAngleTolerance2) {
          points.push(x123, y123);
          return;
        }
      }
    } else {
      dx = x123 - (x1 + x3) / 2;
      dy = y123 - (y1 + y3) / 2;
      if (dx * dx + dy * dy <= distanceTolerance) {
        points.push(x123, y123);
        return;
      }
    }
    recursive2(points, x1, y1, x12, y12, x123, y123, distanceTolerance, level + 1);
    recursive2(points, x123, y123, x23, y23, x3, y3, distanceTolerance, level + 1);
  }
  var RECURSION_LIMIT2, FLT_EPSILON2, PATH_DISTANCE_EPSILON2, curveAngleToleranceEpsilon2, mAngleTolerance2;
  var init_buildAdaptiveQuadratic = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildAdaptiveQuadratic.mjs"() {
      init_GraphicsContextSystem();
      RECURSION_LIMIT2 = 8;
      FLT_EPSILON2 = 11920929e-14;
      PATH_DISTANCE_EPSILON2 = 1;
      curveAngleToleranceEpsilon2 = 0.01;
      mAngleTolerance2 = 0;
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArc.mjs
  function buildArc(points, x2, y2, radius, start, end, clockwise, steps) {
    let dist = Math.abs(start - end);
    if (!clockwise && start > end) {
      dist = 2 * Math.PI - dist;
    } else if (clockwise && end > start) {
      dist = 2 * Math.PI - dist;
    }
    steps = steps || Math.max(6, Math.floor(6 * Math.pow(radius, 1 / 3) * (dist / Math.PI)));
    steps = Math.max(steps, 3);
    let f2 = dist / steps;
    let t2 = start;
    f2 *= clockwise ? -1 : 1;
    for (let i2 = 0; i2 < steps + 1; i2++) {
      const cs = Math.cos(t2);
      const sn = Math.sin(t2);
      const nx = x2 + cs * radius;
      const ny = y2 + sn * radius;
      points.push(nx, ny);
      t2 += f2;
    }
  }
  var init_buildArc = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArc.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArcTo.mjs
  function buildArcTo(points, x1, y1, x2, y2, radius) {
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    const a1 = fromY - y1;
    const b1 = fromX - x1;
    const a2 = y2 - y1;
    const b2 = x2 - x1;
    const mm = Math.abs(a1 * b2 - b1 * a2);
    if (mm < 1e-8 || radius === 0) {
      if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
        points.push(x1, y1);
      }
      return;
    }
    const dd = a1 * a1 + b1 * b1;
    const cc = a2 * a2 + b2 * b2;
    const tt = a1 * a2 + b1 * b2;
    const k1 = radius * Math.sqrt(dd) / mm;
    const k2 = radius * Math.sqrt(cc) / mm;
    const j1 = k1 * tt / dd;
    const j2 = k2 * tt / cc;
    const cx = k1 * b2 + k2 * b1;
    const cy = k1 * a2 + k2 * a1;
    const px = b1 * (k2 + j1);
    const py = a1 * (k2 + j1);
    const qx = b2 * (k1 + j2);
    const qy = a2 * (k1 + j2);
    const startAngle = Math.atan2(py - cy, px - cx);
    const endAngle = Math.atan2(qy - cy, qx - cx);
    buildArc(
      points,
      cx + x1,
      cy + y1,
      radius,
      startAngle,
      endAngle,
      b1 * a2 > b2 * a1
    );
  }
  var init_buildArcTo = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArcTo.mjs"() {
      init_buildArc();
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArcToSvg.mjs
  function approxUnitArc(ang1, ang2) {
    const a1 = ang2 === -1.5707963267948966 ? -0.551915024494 : 4 / 3 * Math.tan(ang2 / 4);
    const a2 = ang2 === 1.5707963267948966 ? 0.551915024494 : a1;
    const x1 = Math.cos(ang1);
    const y1 = Math.sin(ang1);
    const x2 = Math.cos(ang1 + ang2);
    const y2 = Math.sin(ang1 + ang2);
    return [
      {
        x: x1 - y1 * a2,
        y: y1 + x1 * a2
      },
      {
        x: x2 + y2 * a2,
        y: y2 - x2 * a2
      },
      {
        x: x2,
        y: y2
      }
    ];
  }
  function buildArcToSvg(points, px, py, cx, cy, rx, ry, xAxisRotation = 0, largeArcFlag = 0, sweepFlag = 0) {
    if (rx === 0 || ry === 0) {
      return;
    }
    const sinPhi = Math.sin(xAxisRotation * TAU / 360);
    const cosPhi = Math.cos(xAxisRotation * TAU / 360);
    const pxp = cosPhi * (px - cx) / 2 + sinPhi * (py - cy) / 2;
    const pyp = -sinPhi * (px - cx) / 2 + cosPhi * (py - cy) / 2;
    if (pxp === 0 && pyp === 0) {
      return;
    }
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);
    if (lambda > 1) {
      rx *= Math.sqrt(lambda);
      ry *= Math.sqrt(lambda);
    }
    getArcCenter(
      px,
      py,
      cx,
      cy,
      rx,
      ry,
      largeArcFlag,
      sweepFlag,
      sinPhi,
      cosPhi,
      pxp,
      pyp,
      out
    );
    let { ang1, ang2 } = out;
    const { centerX, centerY } = out;
    let ratio = Math.abs(ang2) / (TAU / 4);
    if (Math.abs(1 - ratio) < 1e-7) {
      ratio = 1;
    }
    const segments = Math.max(Math.ceil(ratio), 1);
    ang2 /= segments;
    let lastX = points[points.length - 2];
    let lastY = points[points.length - 1];
    const outCurvePoint = { x: 0, y: 0 };
    for (let i2 = 0; i2 < segments; i2++) {
      const curve = approxUnitArc(ang1, ang2);
      const { x: x1, y: y1 } = mapToEllipse(curve[0], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
      const { x: x2, y: y2 } = mapToEllipse(curve[1], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
      const { x: x3, y: y3 } = mapToEllipse(curve[2], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
      buildAdaptiveBezier(
        points,
        lastX,
        lastY,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3
      );
      lastX = x3;
      lastY = y3;
      ang1 += ang2;
    }
  }
  var TAU, out, mapToEllipse, vectorAngle, getArcCenter;
  var init_buildArcToSvg = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArcToSvg.mjs"() {
      init_buildAdaptiveBezier();
      TAU = Math.PI * 2;
      out = {
        centerX: 0,
        centerY: 0,
        ang1: 0,
        ang2: 0
      };
      mapToEllipse = ({ x: x2, y: y2 }, rx, ry, cosPhi, sinPhi, centerX, centerY, out2) => {
        x2 *= rx;
        y2 *= ry;
        const xp = cosPhi * x2 - sinPhi * y2;
        const yp = sinPhi * x2 + cosPhi * y2;
        out2.x = xp + centerX;
        out2.y = yp + centerY;
        return out2;
      };
      vectorAngle = (ux2, uy2, vx2, vy2) => {
        const sign = ux2 * vy2 - uy2 * vx2 < 0 ? -1 : 1;
        let dot = ux2 * vx2 + uy2 * vy2;
        if (dot > 1) {
          dot = 1;
        }
        if (dot < -1) {
          dot = -1;
        }
        return sign * Math.acos(dot);
      };
      getArcCenter = (px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinPhi, cosPhi, pxp, pyp, out2) => {
        const rxSq = Math.pow(rx, 2);
        const rySq = Math.pow(ry, 2);
        const pxpSq = Math.pow(pxp, 2);
        const pypSq = Math.pow(pyp, 2);
        let radicant = rxSq * rySq - rxSq * pypSq - rySq * pxpSq;
        if (radicant < 0) {
          radicant = 0;
        }
        radicant /= rxSq * pypSq + rySq * pxpSq;
        radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);
        const centerXp = radicant * rx / ry * pyp;
        const centerYp = radicant * -ry / rx * pxp;
        const centerX = cosPhi * centerXp - sinPhi * centerYp + (px + cx) / 2;
        const centerY = sinPhi * centerXp + cosPhi * centerYp + (py + cy) / 2;
        const vx1 = (pxp - centerXp) / rx;
        const vy1 = (pyp - centerYp) / ry;
        const vx2 = (-pxp - centerXp) / rx;
        const vy2 = (-pyp - centerYp) / ry;
        const ang1 = vectorAngle(1, 0, vx1, vy1);
        let ang2 = vectorAngle(vx1, vy1, vx2, vy2);
        if (sweepFlag === 0 && ang2 > 0) {
          ang2 -= TAU;
        }
        if (sweepFlag === 1 && ang2 < 0) {
          ang2 += TAU;
        }
        out2.centerX = centerX;
        out2.centerY = centerY;
        out2.ang1 = ang1;
        out2.ang2 = ang2;
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/path/roundShape.mjs
  function roundedShapeArc(g2, points, radius) {
    const vecFrom = (p2, pp) => {
      const x2 = pp.x - p2.x;
      const y2 = pp.y - p2.y;
      const len = Math.sqrt(x2 * x2 + y2 * y2);
      const nx = x2 / len;
      const ny = y2 / len;
      return { len, nx, ny };
    };
    const sharpCorner = (i2, p2) => {
      if (i2 === 0) {
        g2.moveTo(p2.x, p2.y);
      } else {
        g2.lineTo(p2.x, p2.y);
      }
    };
    let p1 = points[points.length - 1];
    for (let i2 = 0; i2 < points.length; i2++) {
      const p2 = points[i2 % points.length];
      const pRadius = p2.radius ?? radius;
      if (pRadius <= 0) {
        sharpCorner(i2, p2);
        p1 = p2;
        continue;
      }
      const p3 = points[(i2 + 1) % points.length];
      const v1 = vecFrom(p2, p1);
      const v2 = vecFrom(p2, p3);
      if (v1.len < 1e-4 || v2.len < 1e-4) {
        sharpCorner(i2, p2);
        p1 = p2;
        continue;
      }
      let angle = Math.asin(v1.nx * v2.ny - v1.ny * v2.nx);
      let radDirection = 1;
      let drawDirection = false;
      if (v1.nx * v2.nx - v1.ny * -v2.ny < 0) {
        if (angle < 0) {
          angle = Math.PI + angle;
        } else {
          angle = Math.PI - angle;
          radDirection = -1;
          drawDirection = true;
        }
      } else if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
      const halfAngle = angle / 2;
      let cRadius;
      let lenOut = Math.abs(
        Math.cos(halfAngle) * pRadius / Math.sin(halfAngle)
      );
      if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
        lenOut = Math.min(v1.len / 2, v2.len / 2);
        cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
      } else {
        cRadius = pRadius;
      }
      const cX = p2.x + v2.nx * lenOut + -v2.ny * cRadius * radDirection;
      const cY = p2.y + v2.ny * lenOut + v2.nx * cRadius * radDirection;
      const startAngle = Math.atan2(v1.ny, v1.nx) + Math.PI / 2 * radDirection;
      const endAngle = Math.atan2(v2.ny, v2.nx) - Math.PI / 2 * radDirection;
      if (i2 === 0) {
        g2.moveTo(
          cX + Math.cos(startAngle) * cRadius,
          cY + Math.sin(startAngle) * cRadius
        );
      }
      g2.arc(cX, cY, cRadius, startAngle, endAngle, drawDirection);
      p1 = p2;
    }
  }
  function roundedShapeQuadraticCurve(g2, points, radius, smoothness) {
    const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    const pointLerp = (p1, p2, t2) => ({
      x: p1.x + (p2.x - p1.x) * t2,
      y: p1.y + (p2.y - p1.y) * t2
    });
    const numPoints = points.length;
    for (let i2 = 0; i2 < numPoints; i2++) {
      const thisPoint = points[(i2 + 1) % numPoints];
      const pRadius = thisPoint.radius ?? radius;
      if (pRadius <= 0) {
        if (i2 === 0) {
          g2.moveTo(thisPoint.x, thisPoint.y);
        } else {
          g2.lineTo(thisPoint.x, thisPoint.y);
        }
        continue;
      }
      const lastPoint = points[i2];
      const nextPoint = points[(i2 + 2) % numPoints];
      const lastEdgeLength = distance(lastPoint, thisPoint);
      let start;
      if (lastEdgeLength < 1e-4) {
        start = thisPoint;
      } else {
        const lastOffsetDistance = Math.min(lastEdgeLength / 2, pRadius);
        start = pointLerp(
          thisPoint,
          lastPoint,
          lastOffsetDistance / lastEdgeLength
        );
      }
      const nextEdgeLength = distance(nextPoint, thisPoint);
      let end;
      if (nextEdgeLength < 1e-4) {
        end = thisPoint;
      } else {
        const nextOffsetDistance = Math.min(nextEdgeLength / 2, pRadius);
        end = pointLerp(
          thisPoint,
          nextPoint,
          nextOffsetDistance / nextEdgeLength
        );
      }
      if (i2 === 0) {
        g2.moveTo(start.x, start.y);
      } else {
        g2.lineTo(start.x, start.y);
      }
      g2.quadraticCurveTo(thisPoint.x, thisPoint.y, end.x, end.y, smoothness);
    }
  }
  var init_roundShape = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/path/roundShape.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/path/ShapePath.mjs
  var tempRectangle, ShapePath;
  var init_ShapePath = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/path/ShapePath.mjs"() {
      init_Circle();
      init_Ellipse();
      init_Polygon();
      init_Rectangle();
      init_RoundedRectangle();
      init_Bounds();
      init_buildAdaptiveBezier();
      init_buildAdaptiveQuadratic();
      init_buildArc();
      init_buildArcTo();
      init_buildArcToSvg();
      init_roundShape();
      tempRectangle = new Rectangle();
      ShapePath = class {
        constructor(graphicsPath2D) {
          this.shapePrimitives = [];
          this._currentPoly = null;
          this._bounds = new Bounds();
          this._graphicsPath2D = graphicsPath2D;
        }
        /**
         * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
         * @param x - The x-coordinate for the starting point.
         * @param y - The y-coordinate for the starting point.
         * @returns The instance of the current object for chaining.
         */
        moveTo(x2, y2) {
          this.startPoly(x2, y2);
          return this;
        }
        /**
         * Connects the current point to a new point with a straight line. This method updates the current path.
         * @param x - The x-coordinate of the new point to connect to.
         * @param y - The y-coordinate of the new point to connect to.
         * @returns The instance of the current object for chaining.
         */
        lineTo(x2, y2) {
          this._ensurePoly();
          const points = this._currentPoly.points;
          const fromX = points[points.length - 2];
          const fromY = points[points.length - 1];
          if (fromX !== x2 || fromY !== y2) {
            points.push(x2, y2);
          }
          return this;
        }
        /**
         * Adds an arc to the path. The arc is centered at (x, y)
         *  position with radius `radius` starting at `startAngle` and ending at `endAngle`.
         * @param x - The x-coordinate of the arc's center.
         * @param y - The y-coordinate of the arc's center.
         * @param radius - The radius of the arc.
         * @param startAngle - The starting angle of the arc, in radians.
         * @param endAngle - The ending angle of the arc, in radians.
         * @param counterclockwise - Specifies whether the arc should be drawn in the anticlockwise direction. False by default.
         * @returns The instance of the current object for chaining.
         */
        arc(x2, y2, radius, startAngle, endAngle, counterclockwise) {
          this._ensurePoly(false);
          const points = this._currentPoly.points;
          buildArc(points, x2, y2, radius, startAngle, endAngle, counterclockwise);
          return this;
        }
        /**
         * Adds an arc to the path with the arc tangent to the line joining two specified points.
         * The arc radius is specified by `radius`.
         * @param x1 - The x-coordinate of the first point.
         * @param y1 - The y-coordinate of the first point.
         * @param x2 - The x-coordinate of the second point.
         * @param y2 - The y-coordinate of the second point.
         * @param radius - The radius of the arc.
         * @returns The instance of the current object for chaining.
         */
        arcTo(x1, y1, x2, y2, radius) {
          this._ensurePoly();
          const points = this._currentPoly.points;
          buildArcTo(points, x1, y1, x2, y2, radius);
          return this;
        }
        /**
         * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
         * @param rx - The x-radius of the ellipse.
         * @param ry - The y-radius of the ellipse.
         * @param xAxisRotation - The rotation of the ellipse's x-axis relative
         * to the x-axis of the coordinate system, in degrees.
         * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
         * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
         * @param x - The x-coordinate of the arc's end point.
         * @param y - The y-coordinate of the arc's end point.
         * @returns The instance of the current object for chaining.
         */
        arcToSvg(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x2, y2) {
          const points = this._currentPoly.points;
          buildArcToSvg(
            points,
            this._currentPoly.lastX,
            this._currentPoly.lastY,
            x2,
            y2,
            rx,
            ry,
            xAxisRotation,
            largeArcFlag,
            sweepFlag
          );
          return this;
        }
        /**
         * Adds a cubic Bezier curve to the path.
         * It requires three points: the first two are control points and the third one is the end point.
         * The starting point is the last point in the current path.
         * @param cp1x - The x-coordinate of the first control point.
         * @param cp1y - The y-coordinate of the first control point.
         * @param cp2x - The x-coordinate of the second control point.
         * @param cp2y - The y-coordinate of the second control point.
         * @param x - The x-coordinate of the end point.
         * @param y - The y-coordinate of the end point.
         * @param smoothness - Optional parameter to adjust the smoothness of the curve.
         * @returns The instance of the current object for chaining.
         */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2, smoothness) {
          this._ensurePoly();
          const currentPoly = this._currentPoly;
          buildAdaptiveBezier(
            this._currentPoly.points,
            currentPoly.lastX,
            currentPoly.lastY,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            x2,
            y2,
            smoothness
          );
          return this;
        }
        /**
         * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
         * The starting point is the last point in the current path.
         * @param cp1x - The x-coordinate of the control point.
         * @param cp1y - The y-coordinate of the control point.
         * @param x - The x-coordinate of the end point.
         * @param y - The y-coordinate of the end point.
         * @param smoothing - Optional parameter to adjust the smoothness of the curve.
         * @returns The instance of the current object for chaining.
         */
        quadraticCurveTo(cp1x, cp1y, x2, y2, smoothing) {
          this._ensurePoly();
          const currentPoly = this._currentPoly;
          buildAdaptiveQuadratic(
            this._currentPoly.points,
            currentPoly.lastX,
            currentPoly.lastY,
            cp1x,
            cp1y,
            x2,
            y2,
            smoothing
          );
          return this;
        }
        /**
         * Closes the current path by drawing a straight line back to the start.
         * If the shape is already closed or there are no points in the path, this method does nothing.
         * @returns The instance of the current object for chaining.
         */
        closePath() {
          this.endPoly(true);
          return this;
        }
        /**
         * Adds another path to the current path. This method allows for the combination of multiple paths into one.
         * @param path - The `GraphicsPath` object representing the path to add.
         * @param transform - An optional `Matrix` object to apply a transformation to the path before adding it.
         * @returns The instance of the current object for chaining.
         */
        addPath(path2, transform2) {
          this.endPoly();
          if (transform2 && !transform2.isIdentity()) {
            path2 = path2.clone(true);
            path2.transform(transform2);
          }
          for (let i2 = 0; i2 < path2.instructions.length; i2++) {
            const instruction = path2.instructions[i2];
            this[instruction.action](...instruction.data);
          }
          return this;
        }
        /**
         * Finalizes the drawing of the current path. Optionally, it can close the path.
         * @param closePath - A boolean indicating whether to close the path after finishing. False by default.
         */
        finish(closePath = false) {
          this.endPoly(closePath);
        }
        /**
         * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
         * @param x - The x-coordinate of the top-left corner of the rectangle.
         * @param y - The y-coordinate of the top-left corner of the rectangle.
         * @param w - The width of the rectangle.
         * @param h - The height of the rectangle.
         * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
         * @returns The instance of the current object for chaining.
         */
        rect(x2, y2, w2, h2, transform2) {
          this.drawShape(new Rectangle(x2, y2, w2, h2), transform2);
          return this;
        }
        /**
         * Draws a circle shape. This method adds a new circle path to the current drawing.
         * @param x - The x-coordinate of the center of the circle.
         * @param y - The y-coordinate of the center of the circle.
         * @param radius - The radius of the circle.
         * @param transform - An optional `Matrix` object to apply a transformation to the circle.
         * @returns The instance of the current object for chaining.
         */
        circle(x2, y2, radius, transform2) {
          this.drawShape(new Circle(x2, y2, radius), transform2);
          return this;
        }
        /**
         * Draws a polygon shape. This method allows for the creation of complex polygons by specifying a sequence of points.
         * @param points - An array of numbers, or or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
         * representing the x and y coordinates of the polygon's vertices, in sequence.
         * @param close - A boolean indicating whether to close the polygon path. True by default.
         * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
         * @returns The instance of the current object for chaining.
         */
        poly(points, close, transform2) {
          const polygon = new Polygon(points);
          polygon.closePath = close;
          this.drawShape(polygon, transform2);
          return this;
        }
        /**
         * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
         * @param x - The x-coordinate of the center of the polygon.
         * @param y - The y-coordinate of the center of the polygon.
         * @param radius - The radius of the circumscribed circle of the polygon.
         * @param sides - The number of sides of the polygon. Must be 3 or more.
         * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
         * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
         * @returns The instance of the current object for chaining.
         */
        regularPoly(x2, y2, radius, sides, rotation = 0, transform2) {
          sides = Math.max(sides | 0, 3);
          const startAngle = -1 * Math.PI / 2 + rotation;
          const delta = Math.PI * 2 / sides;
          const polygon = [];
          for (let i2 = 0; i2 < sides; i2++) {
            const angle = i2 * delta + startAngle;
            polygon.push(
              x2 + radius * Math.cos(angle),
              y2 + radius * Math.sin(angle)
            );
          }
          this.poly(polygon, true, transform2);
          return this;
        }
        /**
         * Draws a polygon with rounded corners.
         * Similar to `regularPoly` but with the ability to round the corners of the polygon.
         * @param x - The x-coordinate of the center of the polygon.
         * @param y - The y-coordinate of the center of the polygon.
         * @param radius - The radius of the circumscribed circle of the polygon.
         * @param sides - The number of sides of the polygon. Must be 3 or more.
         * @param corner - The radius of the rounding of the corners.
         * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
         * @param smoothness - Optional parameter to adjust the smoothness of the rounding.
         * @returns The instance of the current object for chaining.
         */
        roundPoly(x2, y2, radius, sides, corner, rotation = 0, smoothness) {
          sides = Math.max(sides | 0, 3);
          if (corner <= 0) {
            return this.regularPoly(x2, y2, radius, sides, rotation);
          }
          const sideLength = radius * Math.sin(Math.PI / sides) - 1e-3;
          corner = Math.min(corner, sideLength);
          const startAngle = -1 * Math.PI / 2 + rotation;
          const delta = Math.PI * 2 / sides;
          const internalAngle = (sides - 2) * Math.PI / sides / 2;
          for (let i2 = 0; i2 < sides; i2++) {
            const angle = i2 * delta + startAngle;
            const x0 = x2 + radius * Math.cos(angle);
            const y0 = y2 + radius * Math.sin(angle);
            const a1 = angle + Math.PI + internalAngle;
            const a2 = angle - Math.PI - internalAngle;
            const x1 = x0 + corner * Math.cos(a1);
            const y1 = y0 + corner * Math.sin(a1);
            const x3 = x0 + corner * Math.cos(a2);
            const y3 = y0 + corner * Math.sin(a2);
            if (i2 === 0) {
              this.moveTo(x1, y1);
            } else {
              this.lineTo(x1, y1);
            }
            this.quadraticCurveTo(x0, y0, x3, y3, smoothness);
          }
          return this.closePath();
        }
        /**
         * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
         * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
         * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
         * A minimum of 3 points is required.
         * @param radius - The default radius for the corners.
         * This radius is applied to all corners unless overridden in `points`.
         * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
         *  method instead of an arc method. Defaults to false.
         * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
         * Higher values make the curve smoother.
         * @returns The instance of the current object for chaining.
         */
        roundShape(points, radius, useQuadratic = false, smoothness) {
          if (points.length < 3) {
            return this;
          }
          if (useQuadratic) {
            roundedShapeQuadraticCurve(this, points, radius, smoothness);
          } else {
            roundedShapeArc(this, points, radius);
          }
          return this.closePath();
        }
        /**
         * Draw Rectangle with fillet corners. This is much like rounded rectangle
         * however it support negative numbers as well for the corner radius.
         * @param x - Upper left corner of rect
         * @param y - Upper right corner of rect
         * @param width - Width of rect
         * @param height - Height of rect
         * @param fillet - accept negative or positive values
         */
        filletRect(x2, y2, width, height, fillet) {
          if (fillet === 0) {
            return this.rect(x2, y2, width, height);
          }
          const maxFillet = Math.min(width, height) / 2;
          const inset = Math.min(maxFillet, Math.max(-maxFillet, fillet));
          const right = x2 + width;
          const bottom = y2 + height;
          const dir = inset < 0 ? -inset : 0;
          const size = Math.abs(inset);
          return this.moveTo(x2, y2 + size).arcTo(x2 + dir, y2 + dir, x2 + size, y2, size).lineTo(right - size, y2).arcTo(right - dir, y2 + dir, right, y2 + size, size).lineTo(right, bottom - size).arcTo(right - dir, bottom - dir, x2 + width - size, bottom, size).lineTo(x2 + size, bottom).arcTo(x2 + dir, bottom - dir, x2, bottom - size, size).closePath();
        }
        /**
         * Draw Rectangle with chamfer corners. These are angled corners.
         * @param x - Upper left corner of rect
         * @param y - Upper right corner of rect
         * @param width - Width of rect
         * @param height - Height of rect
         * @param chamfer - non-zero real number, size of corner cutout
         * @param transform
         */
        chamferRect(x2, y2, width, height, chamfer, transform2) {
          if (chamfer <= 0) {
            return this.rect(x2, y2, width, height);
          }
          const inset = Math.min(chamfer, Math.min(width, height) / 2);
          const right = x2 + width;
          const bottom = y2 + height;
          const points = [
            x2 + inset,
            y2,
            right - inset,
            y2,
            right,
            y2 + inset,
            right,
            bottom - inset,
            right - inset,
            bottom,
            x2 + inset,
            bottom,
            x2,
            bottom - inset,
            x2,
            y2 + inset
          ];
          for (let i2 = points.length - 1; i2 >= 2; i2 -= 2) {
            if (points[i2] === points[i2 - 2] && points[i2 - 1] === points[i2 - 3]) {
              points.splice(i2 - 1, 2);
            }
          }
          return this.poly(points, true, transform2);
        }
        /**
         * Draws an ellipse at the specified location and with the given x and y radii.
         * An optional transformation can be applied, allowing for rotation, scaling, and translation.
         * @param x - The x-coordinate of the center of the ellipse.
         * @param y - The y-coordinate of the center of the ellipse.
         * @param radiusX - The horizontal radius of the ellipse.
         * @param radiusY - The vertical radius of the ellipse.
         * @param transform - An optional `Matrix` object to apply a transformation to the ellipse. This can include rotations.
         * @returns The instance of the current object for chaining.
         */
        ellipse(x2, y2, radiusX, radiusY, transform2) {
          this.drawShape(new Ellipse(x2, y2, radiusX, radiusY), transform2);
          return this;
        }
        /**
         * Draws a rectangle with rounded corners.
         * The corner radius can be specified to determine how rounded the corners should be.
         * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
         * @param x - The x-coordinate of the top-left corner of the rectangle.
         * @param y - The y-coordinate of the top-left corner of the rectangle.
         * @param w - The width of the rectangle.
         * @param h - The height of the rectangle.
         * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
         * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
         * @returns The instance of the current object for chaining.
         */
        roundRect(x2, y2, w2, h2, radius, transform2) {
          this.drawShape(new RoundedRectangle(x2, y2, w2, h2, radius), transform2);
          return this;
        }
        /**
         * Draws a given shape on the canvas.
         * This is a generic method that can draw any type of shape specified by the `ShapePrimitive` parameter.
         * An optional transformation matrix can be applied to the shape, allowing for complex transformations.
         * @param shape - The shape to draw, defined as a `ShapePrimitive` object.
         * @param matrix - An optional `Matrix` for transforming the shape. This can include rotations,
         * scaling, and translations.
         * @returns The instance of the current object for chaining.
         */
        drawShape(shape, matrix) {
          this.endPoly();
          this.shapePrimitives.push({ shape, transform: matrix });
          return this;
        }
        /**
         * Starts a new polygon path from the specified starting point.
         * This method initializes a new polygon or ends the current one if it exists.
         * @param x - The x-coordinate of the starting point of the new polygon.
         * @param y - The y-coordinate of the starting point of the new polygon.
         * @returns The instance of the current object for chaining.
         */
        startPoly(x2, y2) {
          let currentPoly = this._currentPoly;
          if (currentPoly) {
            this.endPoly();
          }
          currentPoly = new Polygon();
          currentPoly.points.push(x2, y2);
          this._currentPoly = currentPoly;
          return this;
        }
        /**
         * Ends the current polygon path. If `closePath` is set to true,
         * the path is closed by connecting the last point to the first one.
         * This method finalizes the current polygon and prepares it for drawing or adding to the shape primitives.
         * @param closePath - A boolean indicating whether to close the polygon by connecting the last point
         *  back to the starting point. False by default.
         * @returns The instance of the current object for chaining.
         */
        endPoly(closePath = false) {
          const shape = this._currentPoly;
          if (shape && shape.points.length > 2) {
            shape.closePath = closePath;
            this.shapePrimitives.push({ shape });
          }
          this._currentPoly = null;
          return this;
        }
        _ensurePoly(start = true) {
          if (this._currentPoly)
            return;
          this._currentPoly = new Polygon();
          if (start) {
            const lastShape = this.shapePrimitives[this.shapePrimitives.length - 1];
            if (lastShape) {
              let lx = lastShape.shape.x;
              let ly = lastShape.shape.y;
              if (lastShape.transform && !lastShape.transform.isIdentity()) {
                const t2 = lastShape.transform;
                const tempX = lx;
                lx = t2.a * lx + t2.c * ly + t2.tx;
                ly = t2.b * tempX + t2.d * ly + t2.ty;
              }
              this._currentPoly.points.push(lx, ly);
            } else {
              this._currentPoly.points.push(0, 0);
            }
          }
        }
        /** Builds the path. */
        buildPath() {
          const path2 = this._graphicsPath2D;
          this.shapePrimitives.length = 0;
          this._currentPoly = null;
          for (let i2 = 0; i2 < path2.instructions.length; i2++) {
            const instruction = path2.instructions[i2];
            this[instruction.action](...instruction.data);
          }
          this.finish();
        }
        /** Gets the bounds of the path. */
        get bounds() {
          const bounds = this._bounds;
          bounds.clear();
          const shapePrimitives = this.shapePrimitives;
          for (let i2 = 0; i2 < shapePrimitives.length; i2++) {
            const shapePrimitive = shapePrimitives[i2];
            const boundsRect = shapePrimitive.shape.getBounds(tempRectangle);
            if (shapePrimitive.transform) {
              bounds.addRect(boundsRect, shapePrimitive.transform);
            } else {
              bounds.addRect(boundsRect);
            }
          }
          return bounds;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/path/GraphicsPath.mjs
  function adjustTransform(currentMatrix, transform2) {
    if (currentMatrix) {
      return currentMatrix.prepend(transform2);
    }
    return transform2.clone();
  }
  var GraphicsPath;
  var init_GraphicsPath = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/path/GraphicsPath.mjs"() {
      init_Point();
      init_uid();
      init_warn();
      init_SVGToGraphicsPath();
      init_ShapePath();
      GraphicsPath = class _GraphicsPath {
        /**
         * Creates a `GraphicsPath` instance optionally from an SVG path string or an array of `PathInstruction`.
         * @param instructions - An SVG path string or an array of `PathInstruction` objects.
         */
        constructor(instructions) {
          this.instructions = [];
          this.uid = uid("graphicsPath");
          this._dirty = true;
          if (typeof instructions === "string") {
            SVGToGraphicsPath(instructions, this);
          } else {
            this.instructions = instructions?.slice() ?? [];
          }
        }
        /**
         * Provides access to the internal shape path, ensuring it is up-to-date with the current instructions.
         * @returns The `ShapePath` instance associated with this `GraphicsPath`.
         */
        get shapePath() {
          if (!this._shapePath) {
            this._shapePath = new ShapePath(this);
          }
          if (this._dirty) {
            this._dirty = false;
            this._shapePath.buildPath();
          }
          return this._shapePath;
        }
        /**
         * Adds another `GraphicsPath` to this path, optionally applying a transformation.
         * @param path - The `GraphicsPath` to add.
         * @param transform - An optional transformation to apply to the added path.
         * @returns The instance of the current object for chaining.
         */
        addPath(path2, transform2) {
          path2 = path2.clone();
          this.instructions.push({ action: "addPath", data: [path2, transform2] });
          this._dirty = true;
          return this;
        }
        arc(...args) {
          this.instructions.push({ action: "arc", data: args });
          this._dirty = true;
          return this;
        }
        arcTo(...args) {
          this.instructions.push({ action: "arcTo", data: args });
          this._dirty = true;
          return this;
        }
        arcToSvg(...args) {
          this.instructions.push({ action: "arcToSvg", data: args });
          this._dirty = true;
          return this;
        }
        bezierCurveTo(...args) {
          this.instructions.push({ action: "bezierCurveTo", data: args });
          this._dirty = true;
          return this;
        }
        /**
         * Adds a cubic Bezier curve to the path.
         * It requires two points: the second control point and the end point. The first control point is assumed to be
         * The starting point is the last point in the current path.
         * @param cp2x - The x-coordinate of the second control point.
         * @param cp2y - The y-coordinate of the second control point.
         * @param x - The x-coordinate of the end point.
         * @param y - The y-coordinate of the end point.
         * @param smoothness - Optional parameter to adjust the smoothness of the curve.
         * @returns The instance of the current object for chaining.
         */
        bezierCurveToShort(cp2x, cp2y, x2, y2, smoothness) {
          const last = this.instructions[this.instructions.length - 1];
          const lastPoint = this.getLastPoint(Point.shared);
          let cp1x = 0;
          let cp1y = 0;
          if (!last || last.action !== "bezierCurveTo") {
            cp1x = lastPoint.x;
            cp1y = lastPoint.y;
          } else {
            cp1x = last.data[2];
            cp1y = last.data[3];
            const currentX = lastPoint.x;
            const currentY = lastPoint.y;
            cp1x = currentX + (currentX - cp1x);
            cp1y = currentY + (currentY - cp1y);
          }
          this.instructions.push({ action: "bezierCurveTo", data: [cp1x, cp1y, cp2x, cp2y, x2, y2, smoothness] });
          this._dirty = true;
          return this;
        }
        /**
         * Closes the current path by drawing a straight line back to the start.
         * If the shape is already closed or there are no points in the path, this method does nothing.
         * @returns The instance of the current object for chaining.
         */
        closePath() {
          this.instructions.push({ action: "closePath", data: [] });
          this._dirty = true;
          return this;
        }
        ellipse(...args) {
          this.instructions.push({ action: "ellipse", data: args });
          this._dirty = true;
          return this;
        }
        lineTo(...args) {
          this.instructions.push({ action: "lineTo", data: args });
          this._dirty = true;
          return this;
        }
        moveTo(...args) {
          this.instructions.push({ action: "moveTo", data: args });
          return this;
        }
        quadraticCurveTo(...args) {
          this.instructions.push({ action: "quadraticCurveTo", data: args });
          this._dirty = true;
          return this;
        }
        /**
         * Adds a quadratic curve to the path. It uses the previous point as the control point.
         * @param x - The x-coordinate of the end point.
         * @param y - The y-coordinate of the end point.
         * @param smoothness - Optional parameter to adjust the smoothness of the curve.
         * @returns The instance of the current object for chaining.
         */
        quadraticCurveToShort(x2, y2, smoothness) {
          const last = this.instructions[this.instructions.length - 1];
          const lastPoint = this.getLastPoint(Point.shared);
          let cpx1 = 0;
          let cpy1 = 0;
          if (!last || last.action !== "quadraticCurveTo") {
            cpx1 = lastPoint.x;
            cpy1 = lastPoint.y;
          } else {
            cpx1 = last.data[0];
            cpy1 = last.data[1];
            const currentX = lastPoint.x;
            const currentY = lastPoint.y;
            cpx1 = currentX + (currentX - cpx1);
            cpy1 = currentY + (currentY - cpy1);
          }
          this.instructions.push({ action: "quadraticCurveTo", data: [cpx1, cpy1, x2, y2, smoothness] });
          this._dirty = true;
          return this;
        }
        /**
         * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
         * @param x - The x-coordinate of the top-left corner of the rectangle.
         * @param y - The y-coordinate of the top-left corner of the rectangle.
         * @param w - The width of the rectangle.
         * @param h - The height of the rectangle.
         * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
         * @returns The instance of the current object for chaining.
         */
        rect(x2, y2, w2, h2, transform2) {
          this.instructions.push({ action: "rect", data: [x2, y2, w2, h2, transform2] });
          this._dirty = true;
          return this;
        }
        /**
         * Draws a circle shape. This method adds a new circle path to the current drawing.
         * @param x - The x-coordinate of the center of the circle.
         * @param y - The y-coordinate of the center of the circle.
         * @param radius - The radius of the circle.
         * @param transform - An optional `Matrix` object to apply a transformation to the circle.
         * @returns The instance of the current object for chaining.
         */
        circle(x2, y2, radius, transform2) {
          this.instructions.push({ action: "circle", data: [x2, y2, radius, transform2] });
          this._dirty = true;
          return this;
        }
        roundRect(...args) {
          this.instructions.push({ action: "roundRect", data: args });
          this._dirty = true;
          return this;
        }
        poly(...args) {
          this.instructions.push({ action: "poly", data: args });
          this._dirty = true;
          return this;
        }
        regularPoly(...args) {
          this.instructions.push({ action: "regularPoly", data: args });
          this._dirty = true;
          return this;
        }
        roundPoly(...args) {
          this.instructions.push({ action: "roundPoly", data: args });
          this._dirty = true;
          return this;
        }
        roundShape(...args) {
          this.instructions.push({ action: "roundShape", data: args });
          this._dirty = true;
          return this;
        }
        filletRect(...args) {
          this.instructions.push({ action: "filletRect", data: args });
          this._dirty = true;
          return this;
        }
        chamferRect(...args) {
          this.instructions.push({ action: "chamferRect", data: args });
          this._dirty = true;
          return this;
        }
        /**
         * Draws a star shape centered at a specified location. This method allows for the creation
         *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
         * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
         * An optional transformation can be applied to scale, rotate, or translate the star as needed.
         * @param x - The x-coordinate of the center of the star.
         * @param y - The y-coordinate of the center of the star.
         * @param points - The number of points of the star.
         * @param radius - The outer radius of the star (distance from the center to the outer points).
         * @param innerRadius - Optional. The inner radius of the star
         * (distance from the center to the inner points between the outer points).
         * If not provided, defaults to half of the `radius`.
         * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
         * Defaults to 0, meaning one point is directly upward.
         * @param transform - An optional `Matrix` object to apply a transformation to the star.
         * This can include rotations, scaling, and translations.
         * @returns The instance of the current object for chaining further drawing commands.
         */
        // eslint-disable-next-line max-len
        star(x2, y2, points, radius, innerRadius, rotation, transform2) {
          innerRadius = innerRadius || radius / 2;
          const startAngle = -1 * Math.PI / 2 + rotation;
          const len = points * 2;
          const delta = Math.PI * 2 / len;
          const polygon = [];
          for (let i2 = 0; i2 < len; i2++) {
            const r2 = i2 % 2 ? innerRadius : radius;
            const angle = i2 * delta + startAngle;
            polygon.push(
              x2 + r2 * Math.cos(angle),
              y2 + r2 * Math.sin(angle)
            );
          }
          this.poly(polygon, true, transform2);
          return this;
        }
        /**
         * Creates a copy of the current `GraphicsPath` instance. This method supports both shallow and deep cloning.
         * A shallow clone copies the reference of the instructions array, while a deep clone creates a new array and
         * copies each instruction individually, ensuring that modifications to the instructions of the cloned `GraphicsPath`
         * do not affect the original `GraphicsPath` and vice versa.
         * @param deep - A boolean flag indicating whether the clone should be deep.
         * @returns A new `GraphicsPath` instance that is a clone of the current instance.
         */
        clone(deep = false) {
          const newGraphicsPath2D = new _GraphicsPath();
          if (!deep) {
            newGraphicsPath2D.instructions = this.instructions.slice();
          } else {
            for (let i2 = 0; i2 < this.instructions.length; i2++) {
              const instruction = this.instructions[i2];
              newGraphicsPath2D.instructions.push({ action: instruction.action, data: instruction.data.slice() });
            }
          }
          return newGraphicsPath2D;
        }
        clear() {
          this.instructions.length = 0;
          this._dirty = true;
          return this;
        }
        /**
         * Applies a transformation matrix to all drawing instructions within the `GraphicsPath`.
         * This method enables the modification of the path's geometry according to the provided
         * transformation matrix, which can include translations, rotations, scaling, and skewing.
         *
         * Each drawing instruction in the path is updated to reflect the transformation,
         * ensuring the visual representation of the path is consistent with the applied matrix.
         *
         * Note: The transformation is applied directly to the coordinates and control points of the drawing instructions,
         * not to the path as a whole. This means the transformation's effects are baked into the individual instructions,
         * allowing for fine-grained control over the path's appearance.
         * @param matrix - A `Matrix` object representing the transformation to apply.
         * @returns The instance of the current object for chaining further operations.
         */
        transform(matrix) {
          if (matrix.isIdentity())
            return this;
          const a2 = matrix.a;
          const b2 = matrix.b;
          const c2 = matrix.c;
          const d2 = matrix.d;
          const tx = matrix.tx;
          const ty = matrix.ty;
          let x2 = 0;
          let y2 = 0;
          let cpx1 = 0;
          let cpy1 = 0;
          let cpx2 = 0;
          let cpy2 = 0;
          let rx = 0;
          let ry = 0;
          for (let i2 = 0; i2 < this.instructions.length; i2++) {
            const instruction = this.instructions[i2];
            const data = instruction.data;
            switch (instruction.action) {
              case "moveTo":
              case "lineTo":
                x2 = data[0];
                y2 = data[1];
                data[0] = a2 * x2 + c2 * y2 + tx;
                data[1] = b2 * x2 + d2 * y2 + ty;
                break;
              case "bezierCurveTo":
                cpx1 = data[0];
                cpy1 = data[1];
                cpx2 = data[2];
                cpy2 = data[3];
                x2 = data[4];
                y2 = data[5];
                data[0] = a2 * cpx1 + c2 * cpy1 + tx;
                data[1] = b2 * cpx1 + d2 * cpy1 + ty;
                data[2] = a2 * cpx2 + c2 * cpy2 + tx;
                data[3] = b2 * cpx2 + d2 * cpy2 + ty;
                data[4] = a2 * x2 + c2 * y2 + tx;
                data[5] = b2 * x2 + d2 * y2 + ty;
                break;
              case "quadraticCurveTo":
                cpx1 = data[0];
                cpy1 = data[1];
                x2 = data[2];
                y2 = data[3];
                data[0] = a2 * cpx1 + c2 * cpy1 + tx;
                data[1] = b2 * cpx1 + d2 * cpy1 + ty;
                data[2] = a2 * x2 + c2 * y2 + tx;
                data[3] = b2 * x2 + d2 * y2 + ty;
                break;
              case "arcToSvg":
                x2 = data[5];
                y2 = data[6];
                rx = data[0];
                ry = data[1];
                data[0] = a2 * rx + c2 * ry;
                data[1] = b2 * rx + d2 * ry;
                data[5] = a2 * x2 + c2 * y2 + tx;
                data[6] = b2 * x2 + d2 * y2 + ty;
                break;
              case "circle":
                data[4] = adjustTransform(data[3], matrix);
                break;
              case "rect":
                data[4] = adjustTransform(data[4], matrix);
                break;
              case "ellipse":
                data[8] = adjustTransform(data[8], matrix);
                break;
              case "roundRect":
                data[5] = adjustTransform(data[5], matrix);
                break;
              case "addPath":
                data[0].transform(matrix);
                break;
              case "poly":
                data[2] = adjustTransform(data[2], matrix);
                break;
              default:
                warn("unknown transform action", instruction.action);
                break;
            }
          }
          this._dirty = true;
          return this;
        }
        get bounds() {
          return this.shapePath.bounds;
        }
        /**
         * Retrieves the last point from the current drawing instructions in the `GraphicsPath`.
         * This method is useful for operations that depend on the path's current endpoint,
         * such as connecting subsequent shapes or paths. It supports various drawing instructions,
         * ensuring the last point's position is accurately determined regardless of the path's complexity.
         *
         * If the last instruction is a `closePath`, the method iterates backward through the instructions
         *  until it finds an actionable instruction that defines a point (e.g., `moveTo`, `lineTo`,
         * `quadraticCurveTo`, etc.). For compound paths added via `addPath`, it recursively retrieves
         * the last point from the nested path.
         * @param out - A `Point` object where the last point's coordinates will be stored.
         * This object is modified directly to contain the result.
         * @returns The `Point` object containing the last point's coordinates.
         */
        getLastPoint(out2) {
          let index = this.instructions.length - 1;
          let lastInstruction = this.instructions[index];
          if (!lastInstruction) {
            out2.x = 0;
            out2.y = 0;
            return out2;
          }
          while (lastInstruction.action === "closePath") {
            index--;
            if (index < 0) {
              out2.x = 0;
              out2.y = 0;
              return out2;
            }
            lastInstruction = this.instructions[index];
          }
          switch (lastInstruction.action) {
            case "moveTo":
            case "lineTo":
              out2.x = lastInstruction.data[0];
              out2.y = lastInstruction.data[1];
              break;
            case "quadraticCurveTo":
              out2.x = lastInstruction.data[2];
              out2.y = lastInstruction.data[3];
              break;
            case "bezierCurveTo":
              out2.x = lastInstruction.data[4];
              out2.y = lastInstruction.data[5];
              break;
            case "arc":
            case "arcToSvg":
              out2.x = lastInstruction.data[5];
              out2.y = lastInstruction.data[6];
              break;
            case "addPath":
              lastInstruction.data[0].getLastPoint(out2);
              break;
          }
          return out2;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/svg/SVGParser.mjs
  function SVGParser(svg, graphicsContext) {
    if (typeof svg === "string") {
      const div = document.createElement("div");
      div.innerHTML = svg.trim();
      svg = div.querySelector("svg");
    }
    const session = {
      context: graphicsContext,
      path: new GraphicsPath()
    };
    renderChildren(svg, session, null, null);
    return graphicsContext;
  }
  function renderChildren(svg, session, fillStyle, strokeStyle) {
    const children = svg.children;
    const { fillStyle: f1, strokeStyle: s1 } = parseStyle(svg);
    if (f1 && fillStyle) {
      fillStyle = { ...fillStyle, ...f1 };
    } else if (f1) {
      fillStyle = f1;
    }
    if (s1 && strokeStyle) {
      strokeStyle = { ...strokeStyle, ...s1 };
    } else if (s1) {
      strokeStyle = s1;
    }
    session.context.fillStyle = fillStyle;
    session.context.strokeStyle = strokeStyle;
    let x2;
    let y2;
    let x1;
    let y1;
    let x22;
    let y22;
    let cx;
    let cy;
    let r2;
    let rx;
    let ry;
    let points;
    let pointsString;
    let d2;
    let graphicsPath;
    let width;
    let height;
    switch (svg.nodeName.toLowerCase()) {
      case "path":
        d2 = svg.getAttribute("d");
        graphicsPath = new GraphicsPath(d2);
        session.context.path(graphicsPath);
        if (fillStyle)
          session.context.fill();
        if (strokeStyle)
          session.context.stroke();
        break;
      case "circle":
        cx = parseFloatAttribute(svg, "cx", 0);
        cy = parseFloatAttribute(svg, "cy", 0);
        r2 = parseFloatAttribute(svg, "r", 0);
        session.context.ellipse(cx, cy, r2, r2);
        if (fillStyle)
          session.context.fill();
        if (strokeStyle)
          session.context.stroke();
        break;
      case "rect":
        x2 = parseFloatAttribute(svg, "x", 0);
        y2 = parseFloatAttribute(svg, "y", 0);
        width = parseFloatAttribute(svg, "width", 0);
        height = parseFloatAttribute(svg, "height", 0);
        rx = parseFloatAttribute(svg, "rx", 0);
        ry = parseFloatAttribute(svg, "ry", 0);
        if (rx || ry) {
          session.context.roundRect(x2, y2, width, height, rx || ry);
        } else {
          session.context.rect(x2, y2, width, height);
        }
        if (fillStyle)
          session.context.fill();
        if (strokeStyle)
          session.context.stroke();
        break;
      case "ellipse":
        cx = parseFloatAttribute(svg, "cx", 0);
        cy = parseFloatAttribute(svg, "cy", 0);
        rx = parseFloatAttribute(svg, "rx", 0);
        ry = parseFloatAttribute(svg, "ry", 0);
        session.context.beginPath();
        session.context.ellipse(cx, cy, rx, ry);
        if (fillStyle)
          session.context.fill();
        if (strokeStyle)
          session.context.stroke();
        break;
      case "line":
        x1 = parseFloatAttribute(svg, "x1", 0);
        y1 = parseFloatAttribute(svg, "y1", 0);
        x22 = parseFloatAttribute(svg, "x2", 0);
        y22 = parseFloatAttribute(svg, "y2", 0);
        session.context.beginPath();
        session.context.moveTo(x1, y1);
        session.context.lineTo(x22, y22);
        if (strokeStyle)
          session.context.stroke();
        break;
      case "polygon":
        pointsString = svg.getAttribute("points");
        points = pointsString.match(/\d+/g).map((n2) => parseInt(n2, 10));
        session.context.poly(points, true);
        if (fillStyle)
          session.context.fill();
        if (strokeStyle)
          session.context.stroke();
        break;
      case "polyline":
        pointsString = svg.getAttribute("points");
        points = pointsString.match(/\d+/g).map((n2) => parseInt(n2, 10));
        session.context.poly(points, false);
        if (strokeStyle)
          session.context.stroke();
        break;
      case "g":
      case "svg":
        break;
      default: {
        console.info(`[SVG parser] <${svg.nodeName}> elements unsupported`);
        break;
      }
    }
    for (let i2 = 0; i2 < children.length; i2++) {
      renderChildren(children[i2], session, fillStyle, strokeStyle);
    }
  }
  function parseFloatAttribute(svg, id, defaultValue) {
    const value = svg.getAttribute(id);
    return value ? Number(value) : defaultValue;
  }
  function parseStyle(svg) {
    const style = svg.getAttribute("style");
    const strokeStyle = {};
    const fillStyle = {};
    let useFill = false;
    let useStroke = false;
    if (style) {
      const styleParts = style.split(";");
      for (let i2 = 0; i2 < styleParts.length; i2++) {
        const stylePart = styleParts[i2];
        const [key, value] = stylePart.split(":");
        switch (key) {
          case "stroke":
            if (value !== "none") {
              strokeStyle.color = Color.shared.setValue(value).toNumber();
              useStroke = true;
            }
            break;
          case "stroke-width":
            strokeStyle.width = Number(value);
            break;
          case "fill":
            if (value !== "none") {
              useFill = true;
              fillStyle.color = Color.shared.setValue(value).toNumber();
            }
            break;
          case "fill-opacity":
            fillStyle.alpha = Number(value);
            break;
          case "stroke-opacity":
            strokeStyle.alpha = Number(value);
            break;
          case "opacity":
            fillStyle.alpha = Number(value);
            strokeStyle.alpha = Number(value);
            break;
        }
      }
    } else {
      const stroke = svg.getAttribute("stroke");
      if (stroke && stroke !== "none") {
        useStroke = true;
        strokeStyle.color = Color.shared.setValue(stroke).toNumber();
        strokeStyle.width = parseFloatAttribute(svg, "stroke-width", 1);
      }
      const fill = svg.getAttribute("fill");
      if (fill && fill !== "none") {
        useFill = true;
        fillStyle.color = Color.shared.setValue(fill).toNumber();
      }
    }
    return {
      strokeStyle: useStroke ? strokeStyle : null,
      fillStyle: useFill ? fillStyle : null
    };
  }
  var init_SVGParser = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/svg/SVGParser.mjs"() {
      init_Color();
      init_GraphicsPath();
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/utils/convertFillInputToFillStyle.mjs
  function isColorLike(value) {
    return Color.isColorLike(value);
  }
  function isFillPattern(value) {
    return value instanceof FillPattern;
  }
  function isFillGradient(value) {
    return value instanceof FillGradient;
  }
  function handleColorLike(fill, value, defaultStyle) {
    const temp = Color.shared.setValue(value ?? 0);
    fill.color = temp.toNumber();
    fill.alpha = temp.alpha === 1 ? defaultStyle.alpha : temp.alpha;
    fill.texture = Texture.WHITE;
    return { ...defaultStyle, ...fill };
  }
  function handleFillPattern(fill, value, defaultStyle) {
    fill.fill = value;
    fill.color = 16777215;
    fill.texture = value.texture;
    fill.matrix = value.transform;
    return { ...defaultStyle, ...fill };
  }
  function handleFillGradient(fill, value, defaultStyle) {
    value.buildLinearGradient();
    fill.fill = value;
    fill.color = 16777215;
    fill.texture = value.texture;
    fill.matrix = value.transform;
    return { ...defaultStyle, ...fill };
  }
  function handleFillObject(value, defaultStyle) {
    const style = { ...defaultStyle, ...value };
    if (style.texture) {
      if (style.texture !== Texture.WHITE) {
        const m2 = style.matrix?.invert() || new Matrix();
        m2.translate(style.texture.frame.x, style.texture.frame.y);
        m2.scale(1 / style.texture.source.width, 1 / style.texture.source.height);
        style.matrix = m2;
      }
      const sourceStyle = style.texture.source.style;
      if (sourceStyle.addressMode === "clamp-to-edge") {
        sourceStyle.addressMode = "repeat";
        sourceStyle.update();
      }
    }
    const color = Color.shared.setValue(style.color);
    style.alpha *= color.alpha;
    style.color = color.toNumber();
    style.matrix = style.matrix ? style.matrix.clone() : null;
    return style;
  }
  function toFillStyle(value, defaultStyle) {
    if (value === void 0 || value === null) {
      return null;
    }
    const fill = {};
    const objectStyle = value;
    if (isColorLike(value)) {
      return handleColorLike(fill, value, defaultStyle);
    } else if (isFillPattern(value)) {
      return handleFillPattern(fill, value, defaultStyle);
    } else if (isFillGradient(value)) {
      return handleFillGradient(fill, value, defaultStyle);
    } else if (objectStyle.fill && isFillPattern(objectStyle.fill)) {
      return handleFillPattern(objectStyle, objectStyle.fill, defaultStyle);
    } else if (objectStyle.fill && isFillGradient(objectStyle.fill)) {
      return handleFillGradient(objectStyle, objectStyle.fill, defaultStyle);
    }
    return handleFillObject(objectStyle, defaultStyle);
  }
  function toStrokeStyle(value, defaultStyle) {
    const { width, alignment, miterLimit, cap, join, ...rest } = defaultStyle;
    const fill = toFillStyle(value, rest);
    if (!fill) {
      return null;
    }
    return {
      width,
      alignment,
      miterLimit,
      cap,
      join,
      ...fill
    };
  }
  var init_convertFillInputToFillStyle = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/utils/convertFillInputToFillStyle.mjs"() {
      init_Color();
      init_Matrix();
      init_Texture();
      init_FillGradient();
      init_FillPattern();
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContext.mjs
  var tmpPoint, tempMatrix3, _GraphicsContext, GraphicsContext;
  var init_GraphicsContext = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContext.mjs"() {
      init_eventemitter3();
      init_Color();
      init_Matrix();
      init_Point();
      init_Texture();
      init_uid();
      init_deprecation();
      init_Bounds();
      init_GraphicsPath();
      init_SVGParser();
      init_convertFillInputToFillStyle();
      tmpPoint = new Point();
      tempMatrix3 = new Matrix();
      _GraphicsContext = class _GraphicsContext2 extends eventemitter3_default {
        constructor() {
          super(...arguments);
          this.uid = uid("graphicsContext");
          this.dirty = true;
          this.batchMode = "auto";
          this.instructions = [];
          this._activePath = new GraphicsPath();
          this._transform = new Matrix();
          this._fillStyle = { ..._GraphicsContext2.defaultFillStyle };
          this._strokeStyle = { ..._GraphicsContext2.defaultStrokeStyle };
          this._stateStack = [];
          this._tick = 0;
          this._bounds = new Bounds();
          this._boundsDirty = true;
        }
        /**
         * Creates a new GraphicsContext object that is a clone of this instance, copying all properties,
         * including the current drawing state, transformations, styles, and instructions.
         * @returns A new GraphicsContext instance with the same properties and state as this one.
         */
        clone() {
          const clone = new _GraphicsContext2();
          clone.batchMode = this.batchMode;
          clone.instructions = this.instructions.slice();
          clone._activePath = this._activePath.clone();
          clone._transform = this._transform.clone();
          clone._fillStyle = { ...this._fillStyle };
          clone._strokeStyle = { ...this._strokeStyle };
          clone._stateStack = this._stateStack.slice();
          clone._bounds = this._bounds.clone();
          clone._boundsDirty = true;
          return clone;
        }
        /**
         * The current fill style of the graphics context. This can be a color, gradient, pattern, or a more complex style defined by a FillStyle object.
         */
        get fillStyle() {
          return this._fillStyle;
        }
        set fillStyle(value) {
          this._fillStyle = toFillStyle(value, _GraphicsContext2.defaultFillStyle);
        }
        /**
         * The current stroke style of the graphics context. Similar to fill styles, stroke styles can encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
         */
        get strokeStyle() {
          return this._strokeStyle;
        }
        set strokeStyle(value) {
          this._strokeStyle = toStrokeStyle(value, _GraphicsContext2.defaultStrokeStyle);
        }
        /**
         * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
         * pattern, or a more complex style defined by a FillStyle object.
         * @param style - The fill style to apply. This can be a simple color, a gradient or pattern object,
         *                or a FillStyle or ConvertedFillStyle object.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        setFillStyle(style) {
          this._fillStyle = toFillStyle(style, _GraphicsContext2.defaultFillStyle);
          return this;
        }
        /**
         * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
         * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
         * @param style - The stroke style to apply. Can be defined as a color, a gradient or pattern,
         *                or a StrokeStyle or ConvertedStrokeStyle object.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        setStrokeStyle(style) {
          this._strokeStyle = toFillStyle(style, _GraphicsContext2.defaultStrokeStyle);
          return this;
        }
        texture(texture, tint, dx, dy, dw, dh) {
          this.instructions.push({
            action: "texture",
            data: {
              image: texture,
              dx: dx || 0,
              dy: dy || 0,
              dw: dw || texture.frame.width,
              dh: dh || texture.frame.height,
              transform: this._transform.clone(),
              alpha: this._fillStyle.alpha,
              style: tint ? Color.shared.setValue(tint).toNumber() : 16777215
            }
          });
          this.onUpdate();
          return this;
        }
        /**
         * Resets the current path. Any previous path and its commands are discarded and a new path is
         * started. This is typically called before beginning a new shape or series of drawing commands.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        beginPath() {
          this._activePath = new GraphicsPath();
          return this;
        }
        fill(style, alpha) {
          let path2;
          const lastInstruction = this.instructions[this.instructions.length - 1];
          if (this._tick === 0 && lastInstruction && lastInstruction.action === "stroke") {
            path2 = lastInstruction.data.path;
          } else {
            path2 = this._activePath.clone();
          }
          if (!path2)
            return this;
          if (style != null) {
            if (alpha !== void 0 && typeof style === "number") {
              deprecation(v8_0_0, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead");
              style = { color: style, alpha };
            }
            this._fillStyle = toFillStyle(style, _GraphicsContext2.defaultFillStyle);
          }
          this.instructions.push({
            action: "fill",
            // TODO copy fill style!
            data: { style: this.fillStyle, path: path2 }
          });
          this.onUpdate();
          this._initNextPathLocation();
          this._tick = 0;
          return this;
        }
        _initNextPathLocation() {
          const { x: x2, y: y2 } = this._activePath.getLastPoint(Point.shared);
          this._activePath.clear();
          this._activePath.moveTo(x2, y2);
        }
        /**
         * Strokes the current path with the current stroke style. This method can take an optional
         * FillInput parameter to define the stroke's appearance, including its color, width, and other properties.
         * @param style - (Optional) The stroke style to apply. Can be defined as a simple color or a more complex style object. If omitted, uses the current stroke style.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        stroke(style) {
          let path2;
          const lastInstruction = this.instructions[this.instructions.length - 1];
          if (this._tick === 0 && lastInstruction && lastInstruction.action === "fill") {
            path2 = lastInstruction.data.path;
          } else {
            path2 = this._activePath.clone();
          }
          if (!path2)
            return this;
          if (style != null) {
            this._strokeStyle = toStrokeStyle(style, _GraphicsContext2.defaultStrokeStyle);
          }
          this.instructions.push({
            action: "stroke",
            // TODO copy fill style!
            data: { style: this.strokeStyle, path: path2 }
          });
          this.onUpdate();
          this._initNextPathLocation();
          this._tick = 0;
          return this;
        }
        /**
         * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
         * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
         * fail to cut correctly!
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        cut() {
          for (let i2 = 0; i2 < 2; i2++) {
            const lastInstruction = this.instructions[this.instructions.length - 1 - i2];
            const holePath = this._activePath.clone();
            if (lastInstruction) {
              if (lastInstruction.action === "stroke" || lastInstruction.action === "fill") {
                if (lastInstruction.data.hole) {
                  lastInstruction.data.hole.addPath(holePath);
                } else {
                  lastInstruction.data.hole = holePath;
                  break;
                }
              }
            }
          }
          this._initNextPathLocation();
          return this;
        }
        /**
         * Adds an arc to the current path, which is centered at (x, y) with the specified radius,
         * starting and ending angles, and direction.
         * @param x - The x-coordinate of the arc's center.
         * @param y - The y-coordinate of the arc's center.
         * @param radius - The arc's radius.
         * @param startAngle - The starting angle, in radians.
         * @param endAngle - The ending angle, in radians.
         * @param counterclockwise - (Optional) Specifies whether the arc is drawn counterclockwise (true) or clockwise (false). Defaults to false.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        arc(x2, y2, radius, startAngle, endAngle, counterclockwise) {
          this._tick++;
          const t2 = this._transform;
          this._activePath.arc(
            t2.a * x2 + t2.c * y2 + t2.tx,
            t2.b * x2 + t2.d * y2 + t2.ty,
            radius,
            startAngle,
            endAngle,
            counterclockwise
          );
          return this;
        }
        /**
         * Adds an arc to the current path with the given control points and radius, connected to the previous point
         * by a straight line if necessary.
         * @param x1 - The x-coordinate of the first control point.
         * @param y1 - The y-coordinate of the first control point.
         * @param x2 - The x-coordinate of the second control point.
         * @param y2 - The y-coordinate of the second control point.
         * @param radius - The arc's radius.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        arcTo(x1, y1, x2, y2, radius) {
          this._tick++;
          const t2 = this._transform;
          this._activePath.arcTo(
            t2.a * x1 + t2.c * y1 + t2.tx,
            t2.b * x1 + t2.d * y1 + t2.ty,
            t2.a * x2 + t2.c * y2 + t2.tx,
            t2.b * x2 + t2.d * y2 + t2.ty,
            radius
          );
          return this;
        }
        /**
         * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
         * @param rx - The x-radius of the ellipse.
         * @param ry - The y-radius of the ellipse.
         * @param xAxisRotation - The rotation of the ellipse's x-axis relative
         * to the x-axis of the coordinate system, in degrees.
         * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
         * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
         * @param x - The x-coordinate of the arc's end point.
         * @param y - The y-coordinate of the arc's end point.
         * @returns The instance of the current object for chaining.
         */
        arcToSvg(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x2, y2) {
          this._tick++;
          const t2 = this._transform;
          this._activePath.arcToSvg(
            rx,
            ry,
            xAxisRotation,
            // should we rotate this with transform??
            largeArcFlag,
            sweepFlag,
            t2.a * x2 + t2.c * y2 + t2.tx,
            t2.b * x2 + t2.d * y2 + t2.ty
          );
          return this;
        }
        /**
         * Adds a cubic Bezier curve to the path.
         * It requires three points: the first two are control points and the third one is the end point.
         * The starting point is the last point in the current path.
         * @param cp1x - The x-coordinate of the first control point.
         * @param cp1y - The y-coordinate of the first control point.
         * @param cp2x - The x-coordinate of the second control point.
         * @param cp2y - The y-coordinate of the second control point.
         * @param x - The x-coordinate of the end point.
         * @param y - The y-coordinate of the end point.
         * @param smoothness - Optional parameter to adjust the smoothness of the curve.
         * @returns The instance of the current object for chaining.
         */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2, smoothness) {
          this._tick++;
          const t2 = this._transform;
          this._activePath.bezierCurveTo(
            t2.a * cp1x + t2.c * cp1y + t2.tx,
            t2.b * cp1x + t2.d * cp1y + t2.ty,
            t2.a * cp2x + t2.c * cp2y + t2.tx,
            t2.b * cp2x + t2.d * cp2y + t2.ty,
            t2.a * x2 + t2.c * y2 + t2.tx,
            t2.b * x2 + t2.d * y2 + t2.ty,
            smoothness
          );
          return this;
        }
        /**
         * Closes the current path by drawing a straight line back to the start.
         * If the shape is already closed or there are no points in the path, this method does nothing.
         * @returns The instance of the current object for chaining.
         */
        closePath() {
          this._tick++;
          this._activePath?.closePath();
          return this;
        }
        /**
         * Draws an ellipse at the specified location and with the given x and y radii.
         * An optional transformation can be applied, allowing for rotation, scaling, and translation.
         * @param x - The x-coordinate of the center of the ellipse.
         * @param y - The y-coordinate of the center of the ellipse.
         * @param radiusX - The horizontal radius of the ellipse.
         * @param radiusY - The vertical radius of the ellipse.
         * @returns The instance of the current object for chaining.
         */
        ellipse(x2, y2, radiusX, radiusY) {
          this._tick++;
          this._activePath.ellipse(x2, y2, radiusX, radiusY, this._transform.clone());
          return this;
        }
        /**
         * Draws a circle shape. This method adds a new circle path to the current drawing.
         * @param x - The x-coordinate of the center of the circle.
         * @param y - The y-coordinate of the center of the circle.
         * @param radius - The radius of the circle.
         * @returns The instance of the current object for chaining.
         */
        circle(x2, y2, radius) {
          this._tick++;
          this._activePath.circle(x2, y2, radius, this._transform.clone());
          return this;
        }
        /**
         * Adds another `GraphicsPath` to this path, optionally applying a transformation.
         * @param path - The `GraphicsPath` to add.
         * @returns The instance of the current object for chaining.
         */
        path(path2) {
          this._tick++;
          this._activePath.addPath(path2, this._transform.clone());
          return this;
        }
        /**
         * Connects the current point to a new point with a straight line. This method updates the current path.
         * @param x - The x-coordinate of the new point to connect to.
         * @param y - The y-coordinate of the new point to connect to.
         * @returns The instance of the current object for chaining.
         */
        lineTo(x2, y2) {
          this._tick++;
          const t2 = this._transform;
          this._activePath.lineTo(
            t2.a * x2 + t2.c * y2 + t2.tx,
            t2.b * x2 + t2.d * y2 + t2.ty
          );
          return this;
        }
        /**
         * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
         * @param x - The x-coordinate for the starting point.
         * @param y - The y-coordinate for the starting point.
         * @returns The instance of the current object for chaining.
         */
        moveTo(x2, y2) {
          this._tick++;
          const t2 = this._transform;
          const instructions = this._activePath.instructions;
          const transformedX = t2.a * x2 + t2.c * y2 + t2.tx;
          const transformedY = t2.b * x2 + t2.d * y2 + t2.ty;
          if (instructions.length === 1 && instructions[0].action === "moveTo") {
            instructions[0].data[0] = transformedX;
            instructions[0].data[1] = transformedY;
            return this;
          }
          this._activePath.moveTo(
            transformedX,
            transformedY
          );
          return this;
        }
        /**
         * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
         * The starting point is the last point in the current path.
         * @param cpx - The x-coordinate of the control point.
         * @param cpy - The y-coordinate of the control point.
         * @param x - The x-coordinate of the end point.
         * @param y - The y-coordinate of the end point.
         * @param smoothness - Optional parameter to adjust the smoothness of the curve.
         * @returns The instance of the current object for chaining.
         */
        quadraticCurveTo(cpx, cpy, x2, y2, smoothness) {
          this._tick++;
          const t2 = this._transform;
          this._activePath.quadraticCurveTo(
            t2.a * cpx + t2.c * cpy + t2.tx,
            t2.b * cpx + t2.d * cpy + t2.ty,
            t2.a * x2 + t2.c * y2 + t2.tx,
            t2.b * x2 + t2.d * y2 + t2.ty,
            smoothness
          );
          return this;
        }
        /**
         * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
         * @param x - The x-coordinate of the top-left corner of the rectangle.
         * @param y - The y-coordinate of the top-left corner of the rectangle.
         * @param w - The width of the rectangle.
         * @param h - The height of the rectangle.
         * @returns The instance of the current object for chaining.
         */
        rect(x2, y2, w2, h2) {
          this._tick++;
          this._activePath.rect(x2, y2, w2, h2, this._transform.clone());
          return this;
        }
        /**
         * Draws a rectangle with rounded corners.
         * The corner radius can be specified to determine how rounded the corners should be.
         * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
         * @param x - The x-coordinate of the top-left corner of the rectangle.
         * @param y - The y-coordinate of the top-left corner of the rectangle.
         * @param w - The width of the rectangle.
         * @param h - The height of the rectangle.
         * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
         * @returns The instance of the current object for chaining.
         */
        roundRect(x2, y2, w2, h2, radius) {
          this._tick++;
          this._activePath.roundRect(x2, y2, w2, h2, radius, this._transform.clone());
          return this;
        }
        /**
         * Draws a polygon shape by specifying a sequence of points. This method allows for the creation of complex polygons,
         * which can be both open and closed. An optional transformation can be applied, enabling the polygon to be scaled,
         * rotated, or translated as needed.
         * @param points - An array of numbers, or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
         * representing the x and y coordinates, of the polygon's vertices, in sequence.
         * @param close - A boolean indicating whether to close the polygon path. True by default.
         */
        poly(points, close) {
          this._tick++;
          this._activePath.poly(points, close, this._transform.clone());
          return this;
        }
        /**
         * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
         * @param x - The x-coordinate of the center of the polygon.
         * @param y - The y-coordinate of the center of the polygon.
         * @param radius - The radius of the circumscribed circle of the polygon.
         * @param sides - The number of sides of the polygon. Must be 3 or more.
         * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
         * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
         * @returns The instance of the current object for chaining.
         */
        regularPoly(x2, y2, radius, sides, rotation = 0, transform2) {
          this._tick++;
          this._activePath.regularPoly(x2, y2, radius, sides, rotation, transform2);
          return this;
        }
        /**
         * Draws a polygon with rounded corners.
         * Similar to `regularPoly` but with the ability to round the corners of the polygon.
         * @param x - The x-coordinate of the center of the polygon.
         * @param y - The y-coordinate of the center of the polygon.
         * @param radius - The radius of the circumscribed circle of the polygon.
         * @param sides - The number of sides of the polygon. Must be 3 or more.
         * @param corner - The radius of the rounding of the corners.
         * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
         * @returns The instance of the current object for chaining.
         */
        roundPoly(x2, y2, radius, sides, corner, rotation) {
          this._tick++;
          this._activePath.roundPoly(x2, y2, radius, sides, corner, rotation);
          return this;
        }
        /**
         * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
         * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
         * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
         * A minimum of 3 points is required.
         * @param radius - The default radius for the corners.
         * This radius is applied to all corners unless overridden in `points`.
         * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
         *  method instead of an arc method. Defaults to false.
         * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
         * Higher values make the curve smoother.
         * @returns The instance of the current object for chaining.
         */
        roundShape(points, radius, useQuadratic, smoothness) {
          this._tick++;
          this._activePath.roundShape(points, radius, useQuadratic, smoothness);
          return this;
        }
        /**
         * Draw Rectangle with fillet corners. This is much like rounded rectangle
         * however it support negative numbers as well for the corner radius.
         * @param x - Upper left corner of rect
         * @param y - Upper right corner of rect
         * @param width - Width of rect
         * @param height - Height of rect
         * @param fillet - accept negative or positive values
         */
        filletRect(x2, y2, width, height, fillet) {
          this._tick++;
          this._activePath.filletRect(x2, y2, width, height, fillet);
          return this;
        }
        /**
         * Draw Rectangle with chamfer corners. These are angled corners.
         * @param x - Upper left corner of rect
         * @param y - Upper right corner of rect
         * @param width - Width of rect
         * @param height - Height of rect
         * @param chamfer - non-zero real number, size of corner cutout
         * @param transform
         */
        chamferRect(x2, y2, width, height, chamfer, transform2) {
          this._tick++;
          this._activePath.chamferRect(x2, y2, width, height, chamfer, transform2);
          return this;
        }
        /**
         * Draws a star shape centered at a specified location. This method allows for the creation
         *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
         * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
         * An optional transformation can be applied to scale, rotate, or translate the star as needed.
         * @param x - The x-coordinate of the center of the star.
         * @param y - The y-coordinate of the center of the star.
         * @param points - The number of points of the star.
         * @param radius - The outer radius of the star (distance from the center to the outer points).
         * @param innerRadius - Optional. The inner radius of the star
         * (distance from the center to the inner points between the outer points).
         * If not provided, defaults to half of the `radius`.
         * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
         * Defaults to 0, meaning one point is directly upward.
         * @returns The instance of the current object for chaining further drawing commands.
         */
        star(x2, y2, points, radius, innerRadius = 0, rotation = 0) {
          this._tick++;
          this._activePath.star(x2, y2, points, radius, innerRadius, rotation, this._transform.clone());
          return this;
        }
        /**
         * Parses and renders an SVG string into the graphics context. This allows for complex shapes and paths
         * defined in SVG format to be drawn within the graphics context.
         * @param svg - The SVG string to be parsed and rendered.
         */
        svg(svg) {
          this._tick++;
          SVGParser(svg, this);
          return this;
        }
        /**
         * Restores the most recently saved graphics state by popping the top of the graphics state stack.
         * This includes transformations, fill styles, and stroke styles.
         */
        restore() {
          const state = this._stateStack.pop();
          if (state) {
            this._transform = state.transform;
            this._fillStyle = state.fillStyle;
            this._strokeStyle = state.strokeStyle;
          }
          return this;
        }
        /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
        save() {
          this._stateStack.push({
            transform: this._transform.clone(),
            fillStyle: { ...this._fillStyle },
            strokeStyle: { ...this._strokeStyle }
          });
          return this;
        }
        /**
         * Returns the current transformation matrix of the graphics context.
         * @returns The current transformation matrix.
         */
        getTransform() {
          return this._transform;
        }
        /**
         * Resets the current transformation matrix to the identity matrix, effectively removing any transformations (rotation, scaling, translation) previously applied.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        resetTransform() {
          this._transform.identity();
          return this;
        }
        /**
         * Applies a rotation transformation to the graphics context around the current origin.
         * @param angle - The angle of rotation in radians.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        rotate(angle) {
          this._transform.rotate(angle);
          return this;
        }
        /**
         * Applies a scaling transformation to the graphics context, scaling drawings by x horizontally and by y vertically.
         * @param x - The scale factor in the horizontal direction.
         * @param y - (Optional) The scale factor in the vertical direction. If not specified, the x value is used for both directions.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        scale(x2, y2 = x2) {
          this._transform.scale(x2, y2);
          return this;
        }
        setTransform(a2, b2, c2, d2, dx, dy) {
          if (a2 instanceof Matrix) {
            this._transform.set(a2.a, a2.b, a2.c, a2.d, a2.tx, a2.ty);
            return this;
          }
          this._transform.set(a2, b2, c2, d2, dx, dy);
          return this;
        }
        transform(a2, b2, c2, d2, dx, dy) {
          if (a2 instanceof Matrix) {
            this._transform.append(a2);
            return this;
          }
          tempMatrix3.set(a2, b2, c2, d2, dx, dy);
          this._transform.append(tempMatrix3);
          return this;
        }
        /**
         * Applies a translation transformation to the graphics context, moving the origin by the specified amounts.
         * @param x - The amount to translate in the horizontal direction.
         * @param y - (Optional) The amount to translate in the vertical direction. If not specified, the x value is used for both directions.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        translate(x2, y2 = x2) {
          this._transform.translate(x2, y2);
          return this;
        }
        /**
         * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
         * and optionally resetting transformations to the identity matrix.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        clear() {
          this._activePath.clear();
          this.instructions.length = 0;
          this.resetTransform();
          this.onUpdate();
          return this;
        }
        onUpdate() {
          if (this.dirty)
            return;
          this.emit("update", this, 16);
          this.dirty = true;
          this._boundsDirty = true;
        }
        /** The bounds of the graphic shape. */
        get bounds() {
          if (!this._boundsDirty)
            return this._bounds;
          const bounds = this._bounds;
          bounds.clear();
          for (let i2 = 0; i2 < this.instructions.length; i2++) {
            const instruction = this.instructions[i2];
            const action = instruction.action;
            if (action === "fill") {
              const data = instruction.data;
              bounds.addBounds(data.path.bounds);
            } else if (action === "texture") {
              const data = instruction.data;
              bounds.addFrame(data.dx, data.dy, data.dx + data.dw, data.dy + data.dh, data.transform);
            }
            if (action === "stroke") {
              const data = instruction.data;
              const padding = data.style.width / 2;
              const _bounds = data.path.bounds;
              bounds.addFrame(
                _bounds.minX - padding,
                _bounds.minY - padding,
                _bounds.maxX + padding,
                _bounds.maxY + padding
              );
            }
          }
          return bounds;
        }
        /**
         * Check to see if a point is contained within this geometry.
         * @param point - Point to check if it's contained.
         * @returns {boolean} `true` if the point is contained within geometry.
         */
        containsPoint(point) {
          if (!this.bounds.containsPoint(point.x, point.y))
            return false;
          const instructions = this.instructions;
          let hasHit = false;
          for (let k2 = 0; k2 < instructions.length; k2++) {
            const instruction = instructions[k2];
            const data = instruction.data;
            const path2 = data.path;
            if (!instruction.action || !path2)
              continue;
            const style = data.style;
            const shapes = path2.shapePath.shapePrimitives;
            for (let i2 = 0; i2 < shapes.length; i2++) {
              const shape = shapes[i2].shape;
              if (!style || !shape)
                continue;
              const transform2 = shapes[i2].transform;
              const transformedPoint = transform2 ? transform2.applyInverse(point, tmpPoint) : point;
              if (instruction.action === "fill") {
                hasHit = shape.contains(transformedPoint.x, transformedPoint.y);
              } else {
                hasHit = shape.strokeContains(transformedPoint.x, transformedPoint.y, style.width);
              }
              const holes = data.hole;
              if (holes) {
                const holeShapes = holes.shapePath?.shapePrimitives;
                if (holeShapes) {
                  for (let j2 = 0; j2 < holeShapes.length; j2++) {
                    if (holeShapes[j2].shape.contains(transformedPoint.x, transformedPoint.y)) {
                      hasHit = false;
                    }
                  }
                }
              }
              if (hasHit) {
                return true;
              }
            }
          }
          return hasHit;
        }
        /**
         * Destroys the GraphicsData object.
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.texture=false] - Should it destroy the current texture of the fill/stroke style?
         * @param {boolean} [options.textureSource=false] - Should it destroy the texture source of the fill/stroke style?
         */
        destroy(options = false) {
          this._stateStack.length = 0;
          this._transform = null;
          this.emit("destroy", this);
          this.removeAllListeners();
          const destroyTexture = typeof options === "boolean" ? options : options?.texture;
          if (destroyTexture) {
            const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
            if (this._fillStyle.texture) {
              this._fillStyle.texture.destroy(destroyTextureSource);
            }
            if (this._strokeStyle.texture) {
              this._strokeStyle.texture.destroy(destroyTextureSource);
            }
          }
          this._fillStyle = null;
          this._strokeStyle = null;
          this.instructions = null;
          this._activePath = null;
          this._bounds = null;
          this._stateStack = null;
          this.customShader = null;
          this._transform = null;
        }
      };
      _GraphicsContext.defaultFillStyle = {
        /** The color to use for the fill. */
        color: 16777215,
        /** The alpha value to use for the fill. */
        alpha: 1,
        /** The texture to use for the fill. */
        texture: Texture.WHITE,
        /** The matrix to apply. */
        matrix: null,
        /** The fill pattern to use. */
        fill: null
      };
      _GraphicsContext.defaultStrokeStyle = {
        /** The width of the stroke. */
        width: 1,
        /** The color to use for the stroke. */
        color: 16777215,
        /** The alpha value to use for the stroke. */
        alpha: 1,
        /** The alignment of the stroke. */
        alignment: 0.5,
        /** The miter limit to use. */
        miterLimit: 10,
        /** The line cap style to use. */
        cap: "butt",
        /** The line join style to use. */
        join: "miter",
        /** The texture to use for the fill. */
        texture: Texture.WHITE,
        /** The matrix to apply. */
        matrix: null,
        /** The fill pattern to use. */
        fill: null
      };
      GraphicsContext = _GraphicsContext;
    }
  });

  // node_modules/pixi.js/lib/scene/text/utils/generateTextStyleKey.mjs
  function generateTextStyleKey(style) {
    const key = [];
    let index = 0;
    for (let i2 = 0; i2 < valuesToIterateForKeys.length; i2++) {
      const prop = `_${valuesToIterateForKeys[i2]}`;
      key[index++] = style[prop];
    }
    index = addFillStyleKey(style._fill, key, index);
    index = addStokeStyleKey(style._stroke, key, index);
    index = addDropShadowKey(style.dropShadow, key, index);
    return key.join("-");
  }
  function addFillStyleKey(fillStyle, key, index) {
    if (!fillStyle)
      return index;
    key[index++] = fillStyle.color;
    key[index++] = fillStyle.alpha;
    key[index++] = fillStyle.fill?.styleKey;
    return index;
  }
  function addStokeStyleKey(strokeStyle, key, index) {
    if (!strokeStyle)
      return index;
    index = addFillStyleKey(strokeStyle, key, index);
    key[index++] = strokeStyle.width;
    key[index++] = strokeStyle.alignment;
    key[index++] = strokeStyle.cap;
    key[index++] = strokeStyle.join;
    key[index++] = strokeStyle.miterLimit;
    return index;
  }
  function addDropShadowKey(dropShadow, key, index) {
    if (!dropShadow)
      return index;
    key[index++] = dropShadow.alpha;
    key[index++] = dropShadow.angle;
    key[index++] = dropShadow.blur;
    key[index++] = dropShadow.distance;
    key[index++] = Color.shared.setValue(dropShadow.color).toNumber();
    return index;
  }
  var valuesToIterateForKeys;
  var init_generateTextStyleKey = __esm({
    "node_modules/pixi.js/lib/scene/text/utils/generateTextStyleKey.mjs"() {
      init_Color();
      valuesToIterateForKeys = [
        "align",
        "breakWords",
        "cssOverrides",
        "fontVariant",
        "fontWeight",
        "leading",
        "letterSpacing",
        "lineHeight",
        "padding",
        "textBaseline",
        "trim",
        "whiteSpace",
        "wordWrap",
        "wordWrapWidth",
        "fontFamily",
        "fontStyle",
        "fontSize"
      ];
    }
  });

  // node_modules/pixi.js/lib/scene/text/TextStyle.mjs
  function convertV7Tov8Style(style) {
    const oldStyle = style;
    if (typeof oldStyle.dropShadow === "boolean" && oldStyle.dropShadow) {
      const defaults = TextStyle.defaultDropShadow;
      style.dropShadow = {
        alpha: oldStyle.dropShadowAlpha ?? defaults.alpha,
        angle: oldStyle.dropShadowAngle ?? defaults.angle,
        blur: oldStyle.dropShadowBlur ?? defaults.blur,
        color: oldStyle.dropShadowColor ?? defaults.color,
        distance: oldStyle.dropShadowDistance ?? defaults.distance
      };
    }
    if (oldStyle.strokeThickness !== void 0) {
      deprecation(v8_0_0, "strokeThickness is now a part of stroke");
      const color = oldStyle.stroke;
      let obj = {};
      if (Color.isColorLike(color)) {
        obj.color = color;
      } else if (color instanceof FillGradient || color instanceof FillPattern) {
        obj.fill = color;
      } else if (Object.hasOwnProperty.call(color, "color") || Object.hasOwnProperty.call(color, "fill")) {
        obj = color;
      } else {
        throw new Error("Invalid stroke value.");
      }
      style.stroke = {
        ...obj,
        width: oldStyle.strokeThickness
      };
    }
    if (Array.isArray(oldStyle.fillGradientStops)) {
      deprecation(v8_0_0, "gradient fill is now a fill pattern: `new FillGradient(...)`");
      let fontSize;
      if (style.fontSize == null) {
        style.fontSize = TextStyle.defaultTextStyle.fontSize;
      } else if (typeof style.fontSize === "string") {
        fontSize = parseInt(style.fontSize, 10);
      } else {
        fontSize = style.fontSize;
      }
      const gradientFill = new FillGradient(0, 0, 0, fontSize * 1.7);
      const fills = oldStyle.fillGradientStops.map((color) => Color.shared.setValue(color).toNumber());
      fills.forEach((number, index) => {
        const ratio = index / (fills.length - 1);
        gradientFill.addColorStop(ratio, number);
      });
      style.fill = {
        fill: gradientFill
      };
    }
  }
  var _TextStyle, TextStyle;
  var init_TextStyle = __esm({
    "node_modules/pixi.js/lib/scene/text/TextStyle.mjs"() {
      init_eventemitter3();
      init_Color();
      init_deprecation();
      init_FillGradient();
      init_FillPattern();
      init_GraphicsContext();
      init_convertFillInputToFillStyle();
      init_generateTextStyleKey();
      _TextStyle = class _TextStyle2 extends eventemitter3_default {
        constructor(style = {}) {
          super();
          convertV7Tov8Style(style);
          const fullStyle = { ..._TextStyle2.defaultTextStyle, ...style };
          for (const key in fullStyle) {
            const thisKey = key;
            this[thisKey] = fullStyle[key];
          }
          this.update();
        }
        /**
         * Alignment for multiline text, does not affect single line text.
         * @member {'left'|'center'|'right'|'justify'}
         */
        get align() {
          return this._align;
        }
        set align(value) {
          this._align = value;
          this.update();
        }
        /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
        get breakWords() {
          return this._breakWords;
        }
        set breakWords(value) {
          this._breakWords = value;
          this.update();
        }
        /** Set a drop shadow for the text. */
        get dropShadow() {
          return this._dropShadow;
        }
        set dropShadow(value) {
          if (value !== null && typeof value === "object") {
            this._dropShadow = this._createProxy({ ..._TextStyle2.defaultDropShadow, ...value });
          } else {
            this._dropShadow = value ? this._createProxy({ ..._TextStyle2.defaultDropShadow }) : null;
          }
          this.update();
        }
        /** The font family, can be a single font name, or a list of names where the first is the preferred font. */
        get fontFamily() {
          return this._fontFamily;
        }
        set fontFamily(value) {
          this._fontFamily = value;
          this.update();
        }
        /** The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em') */
        get fontSize() {
          return this._fontSize;
        }
        set fontSize(value) {
          if (typeof value === "string") {
            this._fontSize = parseInt(value, 10);
          } else {
            this._fontSize = value;
          }
          this.update();
        }
        /**
         * The font style.
         * @member {'normal'|'italic'|'oblique'}
         */
        get fontStyle() {
          return this._fontStyle;
        }
        set fontStyle(value) {
          this._fontStyle = value;
          this.update();
        }
        /**
         * The font variant.
         * @member {'normal'|'small-caps'}
         */
        get fontVariant() {
          return this._fontVariant;
        }
        set fontVariant(value) {
          this._fontVariant = value;
          this.update();
        }
        /**
         * The font weight.
         * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
         */
        get fontWeight() {
          return this._fontWeight;
        }
        set fontWeight(value) {
          this._fontWeight = value;
          this.update();
        }
        /** The space between lines. */
        get leading() {
          return this._leading;
        }
        set leading(value) {
          this._leading = value;
          this.update();
        }
        /** The amount of spacing between letters, default is 0. */
        get letterSpacing() {
          return this._letterSpacing;
        }
        set letterSpacing(value) {
          this._letterSpacing = value;
          this.update();
        }
        /** The line height, a number that represents the vertical space that a letter uses. */
        get lineHeight() {
          return this._lineHeight;
        }
        set lineHeight(value) {
          this._lineHeight = value;
          this.update();
        }
        /**
         * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
         * by adding padding to all sides of the text.
         */
        get padding() {
          return this._padding;
        }
        set padding(value) {
          this._padding = value;
          this.update();
        }
        /** Trim transparent borders. This is an expensive operation so only use this if you have to! */
        get trim() {
          return this._trim;
        }
        set trim(value) {
          this._trim = value;
          this.update();
        }
        /**
         * The baseline of the text that is rendered.
         * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
         */
        get textBaseline() {
          return this._textBaseline;
        }
        set textBaseline(value) {
          this._textBaseline = value;
          this.update();
        }
        /**
         * How newlines and spaces should be handled.
         * Default is 'pre' (preserve, preserve).
         *
         *  value       | New lines     |   Spaces
         *  ---         | ---           |   ---
         * 'normal'     | Collapse      |   Collapse
         * 'pre'        | Preserve      |   Preserve
         * 'pre-line'   | Preserve      |   Collapse
         * @member {'normal'|'pre'|'pre-line'}
         */
        get whiteSpace() {
          return this._whiteSpace;
        }
        set whiteSpace(value) {
          this._whiteSpace = value;
          this.update();
        }
        /** Indicates if word wrap should be used. */
        get wordWrap() {
          return this._wordWrap;
        }
        set wordWrap(value) {
          this._wordWrap = value;
          this.update();
        }
        /** The width at which text will wrap, it needs wordWrap to be set to true. */
        get wordWrapWidth() {
          return this._wordWrapWidth;
        }
        set wordWrapWidth(value) {
          this._wordWrapWidth = value;
          this.update();
        }
        /** A fillstyle that will be used on the text e.g., 'red', '#00FF00'. */
        get fill() {
          return this._originalFill;
        }
        set fill(value) {
          if (value === this._originalFill)
            return;
          this._originalFill = value;
          if (this._isFillStyle(value)) {
            this._originalFill = this._createProxy({ ...GraphicsContext.defaultFillStyle, ...value }, () => {
              this._fill = toFillStyle(
                { ...this._originalFill },
                GraphicsContext.defaultFillStyle
              );
            });
          }
          this._fill = toFillStyle(
            value === 0 ? "black" : value,
            GraphicsContext.defaultFillStyle
          );
          this.update();
        }
        /** A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'. */
        get stroke() {
          return this._originalStroke;
        }
        set stroke(value) {
          if (value === this._originalStroke)
            return;
          this._originalStroke = value;
          if (this._isFillStyle(value)) {
            this._originalStroke = this._createProxy({ ...GraphicsContext.defaultStrokeStyle, ...value }, () => {
              this._stroke = toStrokeStyle(
                { ...this._originalStroke },
                GraphicsContext.defaultStrokeStyle
              );
            });
          }
          this._stroke = toStrokeStyle(value, GraphicsContext.defaultStrokeStyle);
          this.update();
        }
        _generateKey() {
          this._styleKey = generateTextStyleKey(this);
          return this._styleKey;
        }
        update() {
          this._styleKey = null;
          this.emit("update", this);
        }
        /** Resets all properties to the default values */
        reset() {
          const defaultStyle = _TextStyle2.defaultTextStyle;
          for (const key in defaultStyle) {
            this[key] = defaultStyle[key];
          }
        }
        get styleKey() {
          return this._styleKey || this._generateKey();
        }
        /**
         * Creates a new TextStyle object with the same values as this one.
         * @returns New cloned TextStyle object
         */
        clone() {
          return new _TextStyle2({
            align: this.align,
            breakWords: this.breakWords,
            dropShadow: this._dropShadow ? { ...this._dropShadow } : null,
            fill: this._fill,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            fontVariant: this.fontVariant,
            fontWeight: this.fontWeight,
            leading: this.leading,
            letterSpacing: this.letterSpacing,
            lineHeight: this.lineHeight,
            padding: this.padding,
            stroke: this._stroke,
            textBaseline: this.textBaseline,
            whiteSpace: this.whiteSpace,
            wordWrap: this.wordWrap,
            wordWrapWidth: this.wordWrapWidth
          });
        }
        /**
         * Destroys this text style.
         * @param options - Options parameter. A boolean will act as if all options
         *  have been set to that value
         * @param {boolean} [options.texture=false] - Should it destroy the texture of the this style
         * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the this style
         */
        destroy(options = false) {
          this.removeAllListeners();
          const destroyTexture = typeof options === "boolean" ? options : options?.texture;
          if (destroyTexture) {
            const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
            if (this._fill?.texture) {
              this._fill.texture.destroy(destroyTextureSource);
            }
            if (this._originalFill?.texture) {
              this._originalFill.texture.destroy(destroyTextureSource);
            }
            if (this._stroke?.texture) {
              this._stroke.texture.destroy(destroyTextureSource);
            }
            if (this._originalStroke?.texture) {
              this._originalStroke.texture.destroy(destroyTextureSource);
            }
          }
          this._fill = null;
          this._stroke = null;
          this.dropShadow = null;
          this._originalStroke = null;
          this._originalFill = null;
        }
        _createProxy(value, cb) {
          return new Proxy(value, {
            set: (target, property, newValue) => {
              target[property] = newValue;
              cb?.(property, newValue);
              this.update();
              return true;
            }
          });
        }
        _isFillStyle(value) {
          return (value ?? null) !== null && !(Color.isColorLike(value) || value instanceof FillGradient || value instanceof FillPattern);
        }
      };
      _TextStyle.defaultDropShadow = {
        /** Set alpha for the drop shadow */
        alpha: 1,
        /** Set a angle of the drop shadow */
        angle: Math.PI / 6,
        /** Set a shadow blur radius */
        blur: 0,
        /** A fill style to be used on the  e.g., 'red', '#00FF00' */
        color: "black",
        /** Set a distance of the drop shadow */
        distance: 5
      };
      _TextStyle.defaultTextStyle = {
        /**
         * See {@link TextStyle.align}
         * @type {'left'|'center'|'right'|'justify'}
         */
        align: "left",
        /** See {@link TextStyle.breakWords} */
        breakWords: false,
        /** See {@link TextStyle.dropShadow} */
        dropShadow: null,
        /**
         * See {@link TextStyle.fill}
         * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
         */
        fill: "black",
        /**
         * See {@link TextStyle.fontFamily}
         * @type {string|string[]}
         */
        fontFamily: "Arial",
        /**
         * See {@link TextStyle.fontSize}
         * @type {number|string}
         */
        fontSize: 26,
        /**
         * See {@link TextStyle.fontStyle}
         * @type {'normal'|'italic'|'oblique'}
         */
        fontStyle: "normal",
        /**
         * See {@link TextStyle.fontVariant}
         * @type {'normal'|'small-caps'}
         */
        fontVariant: "normal",
        /**
         * See {@link TextStyle.fontWeight}
         * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
         */
        fontWeight: "normal",
        /** See {@link TextStyle.leading} */
        leading: 0,
        /** See {@link TextStyle.letterSpacing} */
        letterSpacing: 0,
        /** See {@link TextStyle.lineHeight} */
        lineHeight: 0,
        /** See {@link TextStyle.padding} */
        padding: 0,
        /**
         * See {@link TextStyle.stroke}
         * @type {string|number}
         */
        stroke: null,
        /**
         * See {@link TextStyle.textBaseline}
         * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
         */
        textBaseline: "alphabetic",
        /** See {@link TextStyle.trim} */
        trim: false,
        /**
         * See {@link TextStyle.whiteSpace}
         * @type {'normal'|'pre'|'pre-line'}
         */
        whiteSpace: "pre",
        /** See {@link TextStyle.wordWrap} */
        wordWrap: false,
        /** See {@link TextStyle.wordWrapWidth} */
        wordWrapWidth: 100
      };
      TextStyle = _TextStyle;
    }
  });

  // node_modules/pixi.js/lib/scene/text/utils/getPo2TextureFromSource.mjs
  function getPo2TextureFromSource(image, width, height, resolution) {
    const bounds = tempBounds2;
    bounds.minX = 0;
    bounds.minY = 0;
    bounds.maxX = image.width / resolution | 0;
    bounds.maxY = image.height / resolution | 0;
    const texture = TexturePool.getOptimalTexture(
      bounds.width,
      bounds.height,
      resolution,
      false
    );
    texture.source.uploadMethodId = "image";
    texture.source.resource = image;
    texture.source.alphaMode = "premultiply-alpha-on-upload";
    texture.frame.width = width / resolution;
    texture.frame.height = height / resolution;
    texture.source.emit("update", texture.source);
    texture.updateUvs();
    return texture;
  }
  var tempBounds2;
  var init_getPo2TextureFromSource = __esm({
    "node_modules/pixi.js/lib/scene/text/utils/getPo2TextureFromSource.mjs"() {
      init_TexturePool();
      init_Bounds();
      tempBounds2 = new Bounds();
    }
  });

  // node_modules/pixi.js/lib/scene/text/canvas/utils/fontStringFromTextStyle.mjs
  function fontStringFromTextStyle(style) {
    const fontSizeString = typeof style.fontSize === "number" ? `${style.fontSize}px` : style.fontSize;
    let fontFamilies = style.fontFamily;
    if (!Array.isArray(style.fontFamily)) {
      fontFamilies = style.fontFamily.split(",");
    }
    for (let i2 = fontFamilies.length - 1; i2 >= 0; i2--) {
      let fontFamily = fontFamilies[i2].trim();
      if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && !genericFontFamilies.includes(fontFamily)) {
        fontFamily = `"${fontFamily}"`;
      }
      fontFamilies[i2] = fontFamily;
    }
    return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${fontSizeString} ${fontFamilies.join(",")}`;
  }
  var genericFontFamilies;
  var init_fontStringFromTextStyle = __esm({
    "node_modules/pixi.js/lib/scene/text/canvas/utils/fontStringFromTextStyle.mjs"() {
      "use strict";
      genericFontFamilies = [
        "serif",
        "sans-serif",
        "monospace",
        "cursive",
        "fantasy",
        "system-ui"
      ];
    }
  });

  // node_modules/pixi.js/lib/scene/text/canvas/CanvasTextMetrics.mjs
  var contextSettings, _CanvasTextMetrics, CanvasTextMetrics;
  var init_CanvasTextMetrics = __esm({
    "node_modules/pixi.js/lib/scene/text/canvas/CanvasTextMetrics.mjs"() {
      init_adapter();
      init_fontStringFromTextStyle();
      contextSettings = {
        // TextMetrics requires getImageData readback for measuring fonts.
        willReadFrequently: true
      };
      _CanvasTextMetrics = class _CanvasTextMetrics2 {
        /**
         * Checking that we can use modern canvas 2D API.
         *
         * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
         * @see TextMetrics.experimentalLetterSpacing
         * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
         * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
         */
        static get experimentalLetterSpacingSupported() {
          let result = _CanvasTextMetrics2._experimentalLetterSpacingSupported;
          if (result !== void 0) {
            const proto = DOMAdapter.get().getCanvasRenderingContext2D().prototype;
            result = _CanvasTextMetrics2._experimentalLetterSpacingSupported = "letterSpacing" in proto || "textLetterSpacing" in proto;
          }
          return result;
        }
        /**
         * @param text - the text that was measured
         * @param style - the style that was measured
         * @param width - the measured width of the text
         * @param height - the measured height of the text
         * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
         * @param lineWidths - an array of the line widths for each line matched to `lines`
         * @param lineHeight - the measured line height for this style
         * @param maxLineWidth - the maximum line width for all measured lines
         * @param {FontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
         */
        constructor(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
          this.text = text;
          this.style = style;
          this.width = width;
          this.height = height;
          this.lines = lines;
          this.lineWidths = lineWidths;
          this.lineHeight = lineHeight;
          this.maxLineWidth = maxLineWidth;
          this.fontProperties = fontProperties;
        }
        /**
         * Measures the supplied string of text and returns a Rectangle.
         * @param text - The text to measure.
         * @param style - The text style to use for measuring
         * @param canvas - optional specification of the canvas to use for measuring.
         * @param wordWrap
         * @returns Measured width and height of the text.
         */
        static measureText(text = " ", style, canvas = _CanvasTextMetrics2._canvas, wordWrap = style.wordWrap) {
          const textKey = `${text}:${style.styleKey}`;
          if (_CanvasTextMetrics2._measurementCache[textKey])
            return _CanvasTextMetrics2._measurementCache[textKey];
          const font = fontStringFromTextStyle(style);
          const fontProperties = _CanvasTextMetrics2.measureFont(font);
          if (fontProperties.fontSize === 0) {
            fontProperties.fontSize = style.fontSize;
            fontProperties.ascent = style.fontSize;
          }
          const context2 = _CanvasTextMetrics2.__context;
          context2.font = font;
          const outputText = wordWrap ? _CanvasTextMetrics2._wordWrap(text, style, canvas) : text;
          const lines = outputText.split(/(?:\r\n|\r|\n)/);
          const lineWidths = new Array(lines.length);
          let maxLineWidth = 0;
          for (let i2 = 0; i2 < lines.length; i2++) {
            const lineWidth = _CanvasTextMetrics2._measureText(lines[i2], style.letterSpacing, context2);
            lineWidths[i2] = lineWidth;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
          }
          const strokeWidth = style._stroke?.width || 0;
          let width = maxLineWidth + strokeWidth;
          if (style.dropShadow) {
            width += style.dropShadow.distance;
          }
          const lineHeight = style.lineHeight || fontProperties.fontSize;
          let height = Math.max(lineHeight, fontProperties.fontSize + strokeWidth) + (lines.length - 1) * (lineHeight + style.leading);
          if (style.dropShadow) {
            height += style.dropShadow.distance;
          }
          const measurements = new _CanvasTextMetrics2(
            text,
            style,
            width,
            height,
            lines,
            lineWidths,
            lineHeight + style.leading,
            maxLineWidth,
            fontProperties
          );
          return measurements;
        }
        static _measureText(text, letterSpacing, context2) {
          let useExperimentalLetterSpacing = false;
          if (_CanvasTextMetrics2.experimentalLetterSpacingSupported) {
            if (_CanvasTextMetrics2.experimentalLetterSpacing) {
              context2.letterSpacing = `${letterSpacing}px`;
              context2.textLetterSpacing = `${letterSpacing}px`;
              useExperimentalLetterSpacing = true;
            } else {
              context2.letterSpacing = "0px";
              context2.textLetterSpacing = "0px";
            }
          }
          let width = context2.measureText(text).width;
          if (width > 0) {
            if (useExperimentalLetterSpacing) {
              width -= letterSpacing;
            } else {
              width += (_CanvasTextMetrics2.graphemeSegmenter(text).length - 1) * letterSpacing;
            }
          }
          return width;
        }
        /**
         * Applies newlines to a string to have it optimally fit into the horizontal
         * bounds set by the Text object's wordWrapWidth property.
         * @param text - String to apply word wrapping to
         * @param style - the style to use when wrapping
         * @param canvas - optional specification of the canvas to use for measuring.
         * @returns New string with new lines applied where required
         */
        static _wordWrap(text, style, canvas = _CanvasTextMetrics2._canvas) {
          const context2 = canvas.getContext("2d", contextSettings);
          let width = 0;
          let line = "";
          let lines = "";
          const cache = /* @__PURE__ */ Object.create(null);
          const { letterSpacing, whiteSpace } = style;
          const collapseSpaces = _CanvasTextMetrics2._collapseSpaces(whiteSpace);
          const collapseNewlines = _CanvasTextMetrics2._collapseNewlines(whiteSpace);
          let canPrependSpaces = !collapseSpaces;
          const wordWrapWidth = style.wordWrapWidth + letterSpacing;
          const tokens = _CanvasTextMetrics2._tokenize(text);
          for (let i2 = 0; i2 < tokens.length; i2++) {
            let token = tokens[i2];
            if (_CanvasTextMetrics2._isNewline(token)) {
              if (!collapseNewlines) {
                lines += _CanvasTextMetrics2._addLine(line);
                canPrependSpaces = !collapseSpaces;
                line = "";
                width = 0;
                continue;
              }
              token = " ";
            }
            if (collapseSpaces) {
              const currIsBreakingSpace = _CanvasTextMetrics2.isBreakingSpace(token);
              const lastIsBreakingSpace = _CanvasTextMetrics2.isBreakingSpace(line[line.length - 1]);
              if (currIsBreakingSpace && lastIsBreakingSpace) {
                continue;
              }
            }
            const tokenWidth = _CanvasTextMetrics2._getFromCache(token, letterSpacing, cache, context2);
            if (tokenWidth > wordWrapWidth) {
              if (line !== "") {
                lines += _CanvasTextMetrics2._addLine(line);
                line = "";
                width = 0;
              }
              if (_CanvasTextMetrics2.canBreakWords(token, style.breakWords)) {
                const characters = _CanvasTextMetrics2.wordWrapSplit(token);
                for (let j2 = 0; j2 < characters.length; j2++) {
                  let char = characters[j2];
                  let lastChar = char;
                  let k2 = 1;
                  while (characters[j2 + k2]) {
                    const nextChar = characters[j2 + k2];
                    if (!_CanvasTextMetrics2.canBreakChars(lastChar, nextChar, token, j2, style.breakWords)) {
                      char += nextChar;
                    } else {
                      break;
                    }
                    lastChar = nextChar;
                    k2++;
                  }
                  j2 += k2 - 1;
                  const characterWidth = _CanvasTextMetrics2._getFromCache(char, letterSpacing, cache, context2);
                  if (characterWidth + width > wordWrapWidth) {
                    lines += _CanvasTextMetrics2._addLine(line);
                    canPrependSpaces = false;
                    line = "";
                    width = 0;
                  }
                  line += char;
                  width += characterWidth;
                }
              } else {
                if (line.length > 0) {
                  lines += _CanvasTextMetrics2._addLine(line);
                  line = "";
                  width = 0;
                }
                const isLastToken = i2 === tokens.length - 1;
                lines += _CanvasTextMetrics2._addLine(token, !isLastToken);
                canPrependSpaces = false;
                line = "";
                width = 0;
              }
            } else {
              if (tokenWidth + width > wordWrapWidth) {
                canPrependSpaces = false;
                lines += _CanvasTextMetrics2._addLine(line);
                line = "";
                width = 0;
              }
              if (line.length > 0 || !_CanvasTextMetrics2.isBreakingSpace(token) || canPrependSpaces) {
                line += token;
                width += tokenWidth;
              }
            }
          }
          lines += _CanvasTextMetrics2._addLine(line, false);
          return lines;
        }
        /**
         * Convenience function for logging each line added during the wordWrap method.
         * @param line    - The line of text to add
         * @param newLine - Add new line character to end
         * @returns A formatted line
         */
        static _addLine(line, newLine = true) {
          line = _CanvasTextMetrics2._trimRight(line);
          line = newLine ? `${line}
` : line;
          return line;
        }
        /**
         * Gets & sets the widths of calculated characters in a cache object
         * @param key            - The key
         * @param letterSpacing  - The letter spacing
         * @param cache          - The cache
         * @param context        - The canvas context
         * @returns The from cache.
         */
        static _getFromCache(key, letterSpacing, cache, context2) {
          let width = cache[key];
          if (typeof width !== "number") {
            width = _CanvasTextMetrics2._measureText(key, letterSpacing, context2) + letterSpacing;
            cache[key] = width;
          }
          return width;
        }
        /**
         * Determines whether we should collapse breaking spaces.
         * @param whiteSpace - The TextStyle property whiteSpace
         * @returns Should collapse
         */
        static _collapseSpaces(whiteSpace) {
          return whiteSpace === "normal" || whiteSpace === "pre-line";
        }
        /**
         * Determines whether we should collapse newLine chars.
         * @param whiteSpace - The white space
         * @returns should collapse
         */
        static _collapseNewlines(whiteSpace) {
          return whiteSpace === "normal";
        }
        /**
         * Trims breaking whitespaces from string.
         * @param text - The text
         * @returns Trimmed string
         */
        static _trimRight(text) {
          if (typeof text !== "string") {
            return "";
          }
          for (let i2 = text.length - 1; i2 >= 0; i2--) {
            const char = text[i2];
            if (!_CanvasTextMetrics2.isBreakingSpace(char)) {
              break;
            }
            text = text.slice(0, -1);
          }
          return text;
        }
        /**
         * Determines if char is a newline.
         * @param char - The character
         * @returns True if newline, False otherwise.
         */
        static _isNewline(char) {
          if (typeof char !== "string") {
            return false;
          }
          return _CanvasTextMetrics2._newlines.includes(char.charCodeAt(0));
        }
        /**
         * Determines if char is a breaking whitespace.
         *
         * It allows one to determine whether char should be a breaking whitespace
         * For example certain characters in CJK langs or numbers.
         * It must return a boolean.
         * @param char - The character
         * @param [_nextChar] - The next character
         * @returns True if whitespace, False otherwise.
         */
        static isBreakingSpace(char, _nextChar) {
          if (typeof char !== "string") {
            return false;
          }
          return _CanvasTextMetrics2._breakingSpaces.includes(char.charCodeAt(0));
        }
        /**
         * Splits a string into words, breaking-spaces and newLine characters
         * @param text - The text
         * @returns A tokenized array
         */
        static _tokenize(text) {
          const tokens = [];
          let token = "";
          if (typeof text !== "string") {
            return tokens;
          }
          for (let i2 = 0; i2 < text.length; i2++) {
            const char = text[i2];
            const nextChar = text[i2 + 1];
            if (_CanvasTextMetrics2.isBreakingSpace(char, nextChar) || _CanvasTextMetrics2._isNewline(char)) {
              if (token !== "") {
                tokens.push(token);
                token = "";
              }
              tokens.push(char);
              continue;
            }
            token += char;
          }
          if (token !== "") {
            tokens.push(token);
          }
          return tokens;
        }
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It allows one to customise which words should break
         * Examples are if the token is CJK or numbers.
         * It must return a boolean.
         * @param _token - The token
         * @param breakWords - The style attr break words
         * @returns Whether to break word or not
         */
        static canBreakWords(_token, breakWords) {
          return breakWords;
        }
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It allows one to determine whether a pair of characters
         * should be broken by newlines
         * For example certain characters in CJK langs or numbers.
         * It must return a boolean.
         * @param _char - The character
         * @param _nextChar - The next character
         * @param _token - The token/word the characters are from
         * @param _index - The index in the token of the char
         * @param _breakWords - The style attr break words
         * @returns whether to break word or not
         */
        static canBreakChars(_char, _nextChar, _token, _index, _breakWords) {
          return true;
        }
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It is called when a token (usually a word) has to be split into separate pieces
         * in order to determine the point to break a word.
         * It must return an array of characters.
         * @param token - The token to split
         * @returns The characters of the token
         * @see CanvasTextMetrics.graphemeSegmenter
         */
        static wordWrapSplit(token) {
          return _CanvasTextMetrics2.graphemeSegmenter(token);
        }
        /**
         * Calculates the ascent, descent and fontSize of a given font-style
         * @param font - String representing the style of the font
         * @returns Font properties object
         */
        static measureFont(font) {
          if (_CanvasTextMetrics2._fonts[font]) {
            return _CanvasTextMetrics2._fonts[font];
          }
          const context2 = _CanvasTextMetrics2._context;
          context2.font = font;
          const metrics = context2.measureText(_CanvasTextMetrics2.METRICS_STRING + _CanvasTextMetrics2.BASELINE_SYMBOL);
          const properties = {
            ascent: metrics.actualBoundingBoxAscent,
            descent: metrics.actualBoundingBoxDescent,
            fontSize: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
          };
          _CanvasTextMetrics2._fonts[font] = properties;
          return properties;
        }
        /**
         * Clear font metrics in metrics cache.
         * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
         */
        static clearMetrics(font = "") {
          if (font) {
            delete _CanvasTextMetrics2._fonts[font];
          } else {
            _CanvasTextMetrics2._fonts = {};
          }
        }
        /**
         * Cached canvas element for measuring text
         * TODO: this should be private, but isn't because of backward compat, will fix later.
         * @ignore
         */
        static get _canvas() {
          if (!_CanvasTextMetrics2.__canvas) {
            let canvas;
            try {
              const c2 = new OffscreenCanvas(0, 0);
              const context2 = c2.getContext("2d", contextSettings);
              if (context2?.measureText) {
                _CanvasTextMetrics2.__canvas = c2;
                return c2;
              }
              canvas = DOMAdapter.get().createCanvas();
            } catch (ex) {
              canvas = DOMAdapter.get().createCanvas();
            }
            canvas.width = canvas.height = 10;
            _CanvasTextMetrics2.__canvas = canvas;
          }
          return _CanvasTextMetrics2.__canvas;
        }
        /**
         * TODO: this should be private, but isn't because of backward compat, will fix later.
         * @ignore
         */
        static get _context() {
          if (!_CanvasTextMetrics2.__context) {
            _CanvasTextMetrics2.__context = _CanvasTextMetrics2._canvas.getContext("2d", contextSettings);
          }
          return _CanvasTextMetrics2.__context;
        }
      };
      _CanvasTextMetrics.METRICS_STRING = "|\xC9q\xC5";
      _CanvasTextMetrics.BASELINE_SYMBOL = "M";
      _CanvasTextMetrics.BASELINE_MULTIPLIER = 1.4;
      _CanvasTextMetrics.HEIGHT_MULTIPLIER = 2;
      _CanvasTextMetrics.graphemeSegmenter = (() => {
        if (typeof Intl?.Segmenter === "function") {
          const segmenter = new Intl.Segmenter();
          return (s2) => [...segmenter.segment(s2)].map((x2) => x2.segment);
        }
        return (s2) => [...s2];
      })();
      _CanvasTextMetrics.experimentalLetterSpacing = false;
      _CanvasTextMetrics._fonts = {};
      _CanvasTextMetrics._newlines = [
        10,
        // line feed
        13
        // carriage return
      ];
      _CanvasTextMetrics._breakingSpaces = [
        9,
        // character tabulation
        32,
        // space
        8192,
        // en quad
        8193,
        // em quad
        8194,
        // en space
        8195,
        // em space
        8196,
        // three-per-em space
        8197,
        // four-per-em space
        8198,
        // six-per-em space
        8200,
        // punctuation space
        8201,
        // thin space
        8202,
        // hair space
        8287,
        // medium mathematical space
        12288
        // ideographic space
      ];
      _CanvasTextMetrics._measurementCache = {};
      CanvasTextMetrics = _CanvasTextMetrics;
    }
  });

  // node_modules/pixi.js/lib/scene/text/canvas/utils/getCanvasFillStyle.mjs
  function getCanvasFillStyle(fillStyle, context2) {
    if (fillStyle.texture === Texture.WHITE && !fillStyle.fill) {
      return Color.shared.setValue(fillStyle.color).setAlpha(fillStyle.alpha ?? 1).toHexa();
    } else if (!fillStyle.fill) {
      const pattern = context2.createPattern(fillStyle.texture.source.resource, "repeat");
      const tempMatrix5 = fillStyle.matrix.copyTo(Matrix.shared);
      tempMatrix5.scale(fillStyle.texture.frame.width, fillStyle.texture.frame.height);
      pattern.setTransform(tempMatrix5);
      return pattern;
    } else if (fillStyle.fill instanceof FillPattern) {
      const fillPattern = fillStyle.fill;
      const pattern = context2.createPattern(fillPattern.texture.source.resource, "repeat");
      const tempMatrix5 = fillPattern.transform.copyTo(Matrix.shared);
      tempMatrix5.scale(
        fillPattern.texture.frame.width,
        fillPattern.texture.frame.height
      );
      pattern.setTransform(tempMatrix5);
      return pattern;
    } else if (fillStyle.fill instanceof FillGradient) {
      const fillGradient = fillStyle.fill;
      if (fillGradient.type === "linear") {
        const gradient = context2.createLinearGradient(
          fillGradient.x0,
          fillGradient.y0,
          fillGradient.x1,
          fillGradient.y1
        );
        fillGradient.gradientStops.forEach((stop) => {
          gradient.addColorStop(stop.offset, Color.shared.setValue(stop.color).toHex());
        });
        return gradient;
      }
    }
    warn("FillStyle not recognised", fillStyle);
    return "red";
  }
  var init_getCanvasFillStyle = __esm({
    "node_modules/pixi.js/lib/scene/text/canvas/utils/getCanvasFillStyle.mjs"() {
      init_Color();
      init_Matrix();
      init_Texture();
      init_warn();
      init_FillGradient();
      init_FillPattern();
    }
  });

  // node_modules/pixi.js/lib/scene/text/canvas/CanvasTextSystem.mjs
  var CanvasTextSystem;
  var init_CanvasTextSystem = __esm({
    "node_modules/pixi.js/lib/scene/text/canvas/CanvasTextSystem.mjs"() {
      init_Color();
      init_Extensions();
      init_pow2();
      init_CanvasPool();
      init_TexturePool();
      init_getCanvasBoundingBox();
      init_deprecation();
      init_TextStyle();
      init_getPo2TextureFromSource();
      init_CanvasTextMetrics();
      init_fontStringFromTextStyle();
      init_getCanvasFillStyle();
      CanvasTextSystem = class {
        constructor(_renderer) {
          this._activeTextures = {};
          this._renderer = _renderer;
        }
        getTextureSize(text, resolution, style) {
          const measured = CanvasTextMetrics.measureText(text || " ", style);
          let width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
          let height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
          width = Math.ceil(width - 1e-6);
          height = Math.ceil(height - 1e-6);
          width = nextPow2(width);
          height = nextPow2(height);
          return { width, height };
        }
        getTexture(options, resolution, style, _textKey) {
          if (typeof options === "string") {
            deprecation("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments");
            options = {
              text: options,
              style,
              resolution
            };
          }
          if (!(options.style instanceof TextStyle)) {
            options.style = new TextStyle(options.style);
          }
          const { texture, canvasAndContext } = this.createTextureAndCanvas(
            options
          );
          this._renderer.texture.initSource(texture._source);
          CanvasPool.returnCanvasAndContext(canvasAndContext);
          return texture;
        }
        createTextureAndCanvas(options) {
          const { text, style } = options;
          const resolution = options.resolution ?? this._renderer.resolution;
          const measured = CanvasTextMetrics.measureText(text || " ", style);
          const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
          const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
          const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(width, height);
          const { canvas } = canvasAndContext;
          this.renderTextToCanvas(text, style, resolution, canvasAndContext);
          const texture = getPo2TextureFromSource(canvas, width, height, resolution);
          if (style.trim) {
            const trimmed = getCanvasBoundingBox(canvas, resolution);
            texture.frame.copyFrom(trimmed);
            texture.updateUvs();
          }
          return { texture, canvasAndContext };
        }
        getManagedTexture(text) {
          text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
          const textKey = text._getKey();
          if (this._activeTextures[textKey]) {
            this._increaseReferenceCount(textKey);
            return this._activeTextures[textKey].texture;
          }
          const { texture, canvasAndContext } = this.createTextureAndCanvas(text);
          this._activeTextures[textKey] = {
            canvasAndContext,
            texture,
            usageCount: 1
          };
          return texture;
        }
        _increaseReferenceCount(textKey) {
          this._activeTextures[textKey].usageCount++;
        }
        decreaseReferenceCount(textKey) {
          const activeTexture = this._activeTextures[textKey];
          activeTexture.usageCount--;
          if (activeTexture.usageCount === 0) {
            CanvasPool.returnCanvasAndContext(activeTexture.canvasAndContext);
            TexturePool.returnTexture(activeTexture.texture);
            const source = activeTexture.texture.source;
            source.resource = null;
            source.uploadMethodId = "unknown";
            source.alphaMode = "no-premultiply-alpha";
            this._activeTextures[textKey] = null;
          }
        }
        getReferenceCount(textKey) {
          return this._activeTextures[textKey].usageCount;
        }
        /**
         * Renders text to its canvas, and updates its texture.
         *
         * By default this is used internally to ensure the texture is correct before rendering,
         * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
         * and then shared across multiple Sprites.
         * @param text
         * @param style
         * @param resolution
         * @param canvasAndContext
         */
        renderTextToCanvas(text, style, resolution, canvasAndContext) {
          const { canvas, context: context2 } = canvasAndContext;
          const font = fontStringFromTextStyle(style);
          const measured = CanvasTextMetrics.measureText(text || " ", style);
          const lines = measured.lines;
          const lineHeight = measured.lineHeight;
          const lineWidths = measured.lineWidths;
          const maxLineWidth = measured.maxLineWidth;
          const fontProperties = measured.fontProperties;
          const height = canvas.height;
          context2.resetTransform();
          context2.scale(resolution, resolution);
          const padding = style.padding * 2;
          context2.clearRect(0, 0, measured.width + 4 + padding, measured.height + 4 + padding);
          if (style._stroke?.width) {
            const strokeStyle = style._stroke;
            context2.lineWidth = strokeStyle.width;
            context2.miterLimit = strokeStyle.miterLimit;
            context2.lineJoin = strokeStyle.join;
            context2.lineCap = strokeStyle.cap;
          }
          context2.font = font;
          let linePositionX;
          let linePositionY;
          const passesCount = style.dropShadow ? 2 : 1;
          for (let i2 = 0; i2 < passesCount; ++i2) {
            const isShadowPass = style.dropShadow && i2 === 0;
            const dsOffsetText = isShadowPass ? Math.ceil(Math.max(1, height) + style.padding * 2) : 0;
            const dsOffsetShadow = dsOffsetText * resolution;
            if (isShadowPass) {
              context2.fillStyle = "black";
              context2.strokeStyle = "black";
              const shadowOptions = style.dropShadow;
              const dropShadowColor = shadowOptions.color;
              const dropShadowAlpha = shadowOptions.alpha;
              context2.shadowColor = Color.shared.setValue(dropShadowColor).setAlpha(dropShadowAlpha).toRgbaString();
              const dropShadowBlur = shadowOptions.blur * resolution;
              const dropShadowDistance = shadowOptions.distance * resolution;
              context2.shadowBlur = dropShadowBlur;
              context2.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
              context2.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance + dsOffsetShadow;
            } else {
              context2.globalAlpha = style._fill?.alpha ?? 1;
              context2.fillStyle = style._fill ? getCanvasFillStyle(style._fill, context2) : null;
              if (style._stroke?.width) {
                context2.strokeStyle = getCanvasFillStyle(style._stroke, context2);
              }
              context2.shadowColor = "black";
            }
            let linePositionYShift = (lineHeight - fontProperties.fontSize) / 2;
            if (lineHeight - fontProperties.fontSize < 0) {
              linePositionYShift = 0;
            }
            const strokeWidth = style._stroke?.width ?? 0;
            for (let i22 = 0; i22 < lines.length; i22++) {
              linePositionX = strokeWidth / 2;
              linePositionY = strokeWidth / 2 + i22 * lineHeight + fontProperties.ascent + linePositionYShift;
              if (style.align === "right") {
                linePositionX += maxLineWidth - lineWidths[i22];
              } else if (style.align === "center") {
                linePositionX += (maxLineWidth - lineWidths[i22]) / 2;
              }
              if (style._stroke?.width) {
                this._drawLetterSpacing(
                  lines[i22],
                  style,
                  canvasAndContext,
                  linePositionX + style.padding,
                  linePositionY + style.padding - dsOffsetText,
                  true
                );
              }
              if (style._fill !== void 0) {
                this._drawLetterSpacing(
                  lines[i22],
                  style,
                  canvasAndContext,
                  linePositionX + style.padding,
                  linePositionY + style.padding - dsOffsetText
                );
              }
            }
          }
        }
        /**
         * Render the text with letter-spacing.
         * @param text - The text to draw
         * @param style
         * @param canvasAndContext
         * @param x - Horizontal position to draw the text
         * @param y - Vertical position to draw the text
         * @param isStroke - Is this drawing for the outside stroke of the
         *  text? If not, it's for the inside fill
         */
        _drawLetterSpacing(text, style, canvasAndContext, x2, y2, isStroke = false) {
          const { context: context2 } = canvasAndContext;
          const letterSpacing = style.letterSpacing;
          let useExperimentalLetterSpacing = false;
          if (CanvasTextMetrics.experimentalLetterSpacingSupported) {
            if (CanvasTextMetrics.experimentalLetterSpacing) {
              context2.letterSpacing = `${letterSpacing}px`;
              context2.textLetterSpacing = `${letterSpacing}px`;
              useExperimentalLetterSpacing = true;
            } else {
              context2.letterSpacing = "0px";
              context2.textLetterSpacing = "0px";
            }
          }
          if (letterSpacing === 0 || useExperimentalLetterSpacing) {
            if (isStroke) {
              context2.strokeText(text, x2, y2);
            } else {
              context2.fillText(text, x2, y2);
            }
            return;
          }
          let currentPosition = x2;
          const stringArray = CanvasTextMetrics.graphemeSegmenter(text);
          let previousWidth = context2.measureText(text).width;
          let currentWidth = 0;
          for (let i2 = 0; i2 < stringArray.length; ++i2) {
            const currentChar = stringArray[i2];
            if (isStroke) {
              context2.strokeText(currentChar, currentPosition, y2);
            } else {
              context2.fillText(currentChar, currentPosition, y2);
            }
            let textStr = "";
            for (let j2 = i2 + 1; j2 < stringArray.length; ++j2) {
              textStr += stringArray[j2];
            }
            currentWidth = context2.measureText(textStr).width;
            currentPosition += previousWidth - currentWidth + letterSpacing;
            previousWidth = currentWidth;
          }
        }
        destroy() {
          this._activeTextures = null;
        }
      };
      CanvasTextSystem.extension = {
        type: [
          ExtensionType.WebGLSystem,
          ExtensionType.WebGPUSystem,
          ExtensionType.CanvasSystem
        ],
        name: "canvasText"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text/init.mjs
  var init_init8 = __esm({
    "node_modules/pixi.js/lib/scene/text/init.mjs"() {
      init_Extensions();
      init_CanvasTextPipe();
      init_CanvasTextSystem();
      extensions.add(CanvasTextSystem);
      extensions.add(CanvasTextPipe);
    }
  });

  // node_modules/pixi.js/lib/scene/graphics/shared/Graphics.mjs
  var Graphics;
  var init_Graphics = __esm({
    "node_modules/pixi.js/lib/scene/graphics/shared/Graphics.mjs"() {
      init_deprecation();
      init_View();
      init_GraphicsContext();
      Graphics = class _Graphics extends ViewContainer {
        /**
         * @param options - Options for the Graphics.
         */
        constructor(options) {
          if (options instanceof GraphicsContext) {
            options = { context: options };
          }
          const { context: context2, roundPixels, ...rest } = options || {};
          super({
            label: "Graphics",
            ...rest
          });
          this.renderPipeId = "graphics";
          if (!context2) {
            this._context = this._ownedContext = new GraphicsContext();
          } else {
            this._context = context2;
          }
          this._context.on("update", this.onViewUpdate, this);
          this.allowChildren = false;
          this.roundPixels = roundPixels ?? false;
        }
        set context(context2) {
          if (context2 === this._context)
            return;
          this._context.off("update", this.onViewUpdate, this);
          this._context = context2;
          this._context.on("update", this.onViewUpdate, this);
          this.onViewUpdate();
        }
        get context() {
          return this._context;
        }
        /**
         * The local bounds of the graphic.
         * @type {rendering.Bounds}
         */
        get bounds() {
          return this._context.bounds;
        }
        /**
         * Adds the bounds of this object to the bounds object.
         * @param bounds - The output bounds object.
         */
        addBounds(bounds) {
          bounds.addBounds(this._context.bounds);
        }
        /**
         * Checks if the object contains the given point.
         * @param point - The point to check
         */
        containsPoint(point) {
          return this._context.containsPoint(point);
        }
        onViewUpdate() {
          this._didViewChangeTick++;
          this._didGraphicsUpdate = true;
          if (this.didViewUpdate)
            return;
          this.didViewUpdate = true;
          const renderGroup = this.renderGroup || this.parentRenderGroup;
          if (renderGroup) {
            renderGroup.onChildViewUpdate(this);
          }
        }
        /**
         * Destroys this graphics renderable and optionally its context.
         * @param options - Options parameter. A boolean will act as if all options
         *
         * If the context was created by this graphics and `destroy(false)` or `destroy()` is called
         * then the context will still be destroyed.
         *
         * If you want to explicitly not destroy this context that this graphics created,
         * then you should pass destroy({ context: false })
         *
         * If the context was passed in as an argument to the constructor then it will not be destroyed
         * @param {boolean} [options.texture=false] - Should destroy the texture of the graphics context
         * @param {boolean} [options.textureSource=false] - Should destroy the texture source of the graphics context
         * @param {boolean} [options.context=false] - Should destroy the context
         */
        destroy(options) {
          if (this._ownedContext && !options) {
            this._ownedContext.destroy(options);
          } else if (options === true || options?.context === true) {
            this._context.destroy(options);
          }
          this._ownedContext = null;
          this._context = null;
          super.destroy(options);
        }
        _callContextMethod(method, args) {
          this.context[method](...args);
          return this;
        }
        // --------------------------------------- GraphicsContext methods ---------------------------------------
        /**
         * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
         * pattern, or a more complex style defined by a FillStyle object.
         * @param {FillInput} args - The fill style to apply. This can be a simple color, a gradient or
         * pattern object, or a FillStyle or ConvertedFillStyle object.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        setFillStyle(...args) {
          return this._callContextMethod("setFillStyle", args);
        }
        /**
         * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
         * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
         * @param {StrokeInput} args - The stroke style to apply. Can be defined as a color, a gradient or pattern,
         * or a StrokeStyle or ConvertedStrokeStyle object.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        setStrokeStyle(...args) {
          return this._callContextMethod("setStrokeStyle", args);
        }
        fill(...args) {
          return this._callContextMethod("fill", args);
        }
        /**
         * Strokes the current path with the current stroke style. This method can take an optional
         * FillStyle parameter to define the stroke's appearance, including its color, width, and other properties.
         * @param {FillStyle} args - (Optional) The stroke style to apply. Can be defined as a simple color or a more
         * complex style object. If omitted, uses the current stroke style.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        stroke(...args) {
          return this._callContextMethod("stroke", args);
        }
        texture(...args) {
          return this._callContextMethod("texture", args);
        }
        /**
         * Resets the current path. Any previous path and its commands are discarded and a new path is
         * started. This is typically called before beginning a new shape or series of drawing commands.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        beginPath() {
          return this._callContextMethod("beginPath", []);
        }
        /**
         * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
         * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
         * fail to cut correctly!
         */
        cut() {
          return this._callContextMethod("cut", []);
        }
        arc(...args) {
          return this._callContextMethod("arc", args);
        }
        arcTo(...args) {
          return this._callContextMethod("arcTo", args);
        }
        arcToSvg(...args) {
          return this._callContextMethod("arcToSvg", args);
        }
        bezierCurveTo(...args) {
          return this._callContextMethod("bezierCurveTo", args);
        }
        /**
         * Closes the current path by drawing a straight line back to the start.
         * If the shape is already closed or there are no points in the path, this method does nothing.
         * @returns The instance of the current object for chaining.
         */
        closePath() {
          return this._callContextMethod("closePath", []);
        }
        ellipse(...args) {
          return this._callContextMethod("ellipse", args);
        }
        circle(...args) {
          return this._callContextMethod("circle", args);
        }
        path(...args) {
          return this._callContextMethod("path", args);
        }
        lineTo(...args) {
          return this._callContextMethod("lineTo", args);
        }
        moveTo(...args) {
          return this._callContextMethod("moveTo", args);
        }
        quadraticCurveTo(...args) {
          return this._callContextMethod("quadraticCurveTo", args);
        }
        rect(...args) {
          return this._callContextMethod("rect", args);
        }
        roundRect(...args) {
          return this._callContextMethod("roundRect", args);
        }
        poly(...args) {
          return this._callContextMethod("poly", args);
        }
        regularPoly(...args) {
          return this._callContextMethod("regularPoly", args);
        }
        roundPoly(...args) {
          return this._callContextMethod("roundPoly", args);
        }
        roundShape(...args) {
          return this._callContextMethod("roundShape", args);
        }
        filletRect(...args) {
          return this._callContextMethod("filletRect", args);
        }
        chamferRect(...args) {
          return this._callContextMethod("chamferRect", args);
        }
        star(...args) {
          return this._callContextMethod("star", args);
        }
        svg(...args) {
          return this._callContextMethod("svg", args);
        }
        restore(...args) {
          return this._callContextMethod("restore", args);
        }
        /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
        save() {
          return this._callContextMethod("save", []);
        }
        /**
         * Returns the current transformation matrix of the graphics context.
         * @returns The current transformation matrix.
         */
        getTransform() {
          return this.context.getTransform();
        }
        /**
         * Resets the current transformation matrix to the identity matrix, effectively removing
         * any transformations (rotation, scaling, translation) previously applied.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        resetTransform() {
          return this._callContextMethod("resetTransform", []);
        }
        rotateTransform(...args) {
          return this._callContextMethod("rotate", args);
        }
        scaleTransform(...args) {
          return this._callContextMethod("scale", args);
        }
        setTransform(...args) {
          return this._callContextMethod("setTransform", args);
        }
        transform(...args) {
          return this._callContextMethod("transform", args);
        }
        translateTransform(...args) {
          return this._callContextMethod("translate", args);
        }
        /**
         * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
         * and optionally resetting transformations to the identity matrix.
         * @returns The instance of the current GraphicsContext for method chaining.
         */
        clear() {
          return this._callContextMethod("clear", []);
        }
        /**
         * The fill style to use.
         * @type {ConvertedFillStyle}
         */
        get fillStyle() {
          return this._context.fillStyle;
        }
        set fillStyle(value) {
          this._context.fillStyle = value;
        }
        /**
         * The stroke style to use.
         * @type {ConvertedStrokeStyle}
         */
        get strokeStyle() {
          return this._context.strokeStyle;
        }
        set strokeStyle(value) {
          this._context.strokeStyle = value;
        }
        /**
         * Creates a new Graphics object.
         * Note that only the context of the object is cloned, not its transform (position,scale,etc)
         * @param deep - Whether to create a deep clone of the graphics object. If false, the context
         * will be shared between the two objects (default false). If true, the context will be
         * cloned (recommended if you need to modify the context in any way).
         * @returns - A clone of the graphics object
         */
        clone(deep = false) {
          if (deep) {
            return new _Graphics(this._context.clone());
          }
          this._ownedContext = null;
          const clone = new _Graphics(this._context);
          return clone;
        }
        // -------- v7 deprecations ---------
        /**
         * @param width
         * @param color
         * @param alpha
         * @deprecated since 8.0.0 Use {@link Graphics#setStrokeStyle} instead
         */
        lineStyle(width, color, alpha) {
          deprecation(v8_0_0, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
          const strokeStyle = {};
          width && (strokeStyle.width = width);
          color && (strokeStyle.color = color);
          alpha && (strokeStyle.alpha = alpha);
          this.context.strokeStyle = strokeStyle;
          return this;
        }
        /**
         * @param color
         * @param alpha
         * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
         */
        beginFill(color, alpha) {
          deprecation(v8_0_0, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
          const fillStyle = {};
          color && (fillStyle.color = color);
          alpha && (fillStyle.alpha = alpha);
          this.context.fillStyle = fillStyle;
          return this;
        }
        /**
         * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
         */
        endFill() {
          deprecation(v8_0_0, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
          this.context.fill();
          const strokeStyle = this.context.strokeStyle;
          if (strokeStyle.width !== GraphicsContext.defaultStrokeStyle.width || strokeStyle.color !== GraphicsContext.defaultStrokeStyle.color || strokeStyle.alpha !== GraphicsContext.defaultStrokeStyle.alpha) {
            this.context.stroke();
          }
          return this;
        }
        /**
         * @param {...any} args
         * @deprecated since 8.0.0 Use {@link Graphics#circle} instead
         */
        drawCircle(...args) {
          deprecation(v8_0_0, "Graphics#drawCircle has been renamed to Graphics#circle");
          return this._callContextMethod("circle", args);
        }
        /**
         * @param {...any} args
         * @deprecated since 8.0.0 Use {@link Graphics#ellipse} instead
         */
        drawEllipse(...args) {
          deprecation(v8_0_0, "Graphics#drawEllipse has been renamed to Graphics#ellipse");
          return this._callContextMethod("ellipse", args);
        }
        /**
         * @param {...any} args
         * @deprecated since 8.0.0 Use {@link Graphics#poly} instead
         */
        drawPolygon(...args) {
          deprecation(v8_0_0, "Graphics#drawPolygon has been renamed to Graphics#poly");
          return this._callContextMethod("poly", args);
        }
        /**
         * @param {...any} args
         * @deprecated since 8.0.0 Use {@link Graphics#rect} instead
         */
        drawRect(...args) {
          deprecation(v8_0_0, "Graphics#drawRect has been renamed to Graphics#rect");
          return this._callContextMethod("rect", args);
        }
        /**
         * @param {...any} args
         * @deprecated since 8.0.0 Use {@link Graphics#roundRect} instead
         */
        drawRoundedRect(...args) {
          deprecation(v8_0_0, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect");
          return this._callContextMethod("roundRect", args);
        }
        /**
         * @param {...any} args
         * @deprecated since 8.0.0 Use {@link Graphics#star} instead
         */
        drawStar(...args) {
          deprecation(v8_0_0, "Graphics#drawStar has been renamed to Graphics#star");
          return this._callContextMethod("star", args);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/localUniformMSDFBit.mjs
  var localUniformMSDFBit, localUniformMSDFBitGl;
  var init_localUniformMSDFBit = __esm({
    "node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/localUniformMSDFBit.mjs"() {
      "use strict";
      localUniformMSDFBit = {
        name: "local-uniform-msdf-bit",
        vertex: {
          header: (
            /* wgsl */
            `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
          ),
          main: (
            /* wgsl */
            `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
          ),
          end: (
            /* wgsl */
            `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
          )
        },
        fragment: {
          header: (
            /* wgsl */
            `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
          ),
          main: (
            /* wgsl */
            ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
          )
        }
      };
      localUniformMSDFBitGl = {
        name: "local-uniform-msdf-bit",
        vertex: {
          header: (
            /* glsl */
            `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
          ),
          main: (
            /* glsl */
            `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
          ),
          end: (
            /* glsl */
            `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
          )
        },
        fragment: {
          header: (
            /* glsl */
            `
            uniform float uDistance;
         `
          ),
          main: (
            /* glsl */
            ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/mSDFBit.mjs
  var mSDFBit, mSDFBitGl;
  var init_mSDFBit = __esm({
    "node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/mSDFBit.mjs"() {
      "use strict";
      mSDFBit = {
        name: "msdf-bit",
        fragment: {
          header: (
            /* wgsl */
            `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `
          )
        }
      };
      mSDFBitGl = {
        name: "msdf-bit",
        fragment: {
          header: (
            /* glsl */
            `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text/sdfShader/SdfShader.mjs
  var gpuProgram, glProgram, SdfShader;
  var init_SdfShader = __esm({
    "node_modules/pixi.js/lib/scene/text/sdfShader/SdfShader.mjs"() {
      init_Matrix();
      init_maxRecommendedTextures();
      init_compileHighShaderToProgram();
      init_colorBit();
      init_generateTextureBatchBit();
      init_roundPixelsBit();
      init_getBatchSamplersUniformGroup();
      init_Shader();
      init_UniformGroup();
      init_localUniformMSDFBit();
      init_mSDFBit();
      SdfShader = class extends Shader {
        constructor() {
          const uniforms = new UniformGroup({
            uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
            uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
            uDistance: { value: 4, type: "f32" },
            uRound: { value: 0, type: "f32" }
          });
          const maxTextures2 = getMaxTexturesPerBatch();
          gpuProgram ?? (gpuProgram = compileHighShaderGpuProgram({
            name: "sdf-shader",
            bits: [
              colorBit,
              generateTextureBatchBit(maxTextures2),
              localUniformMSDFBit,
              mSDFBit,
              roundPixelsBit
            ]
          }));
          glProgram ?? (glProgram = compileHighShaderGlProgram({
            name: "sdf-shader",
            bits: [
              colorBitGl,
              generateTextureBatchBitGl(maxTextures2),
              localUniformMSDFBitGl,
              mSDFBitGl,
              roundPixelsBitGl
            ]
          }));
          super({
            glProgram,
            gpuProgram,
            resources: {
              localUniforms: uniforms,
              batchSamplers: getBatchSamplersUniformGroup(maxTextures2)
            }
          });
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/AbstractBitmapFont.mjs
  var AbstractBitmapFont;
  var init_AbstractBitmapFont = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/AbstractBitmapFont.mjs"() {
      init_eventemitter3();
      init_deprecation();
      AbstractBitmapFont = class extends eventemitter3_default {
        constructor() {
          super(...arguments);
          this.chars = /* @__PURE__ */ Object.create(null);
          this.lineHeight = 0;
          this.fontFamily = "";
          this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 };
          this.baseLineOffset = 0;
          this.distanceField = { type: "none", range: 0 };
          this.pages = [];
          this.applyFillAsTint = true;
          this.baseMeasurementFontSize = 100;
          this.baseRenderedFontSize = 100;
        }
        /**
         * The name of the font face.
         * @deprecated since 8.0.0 Use `fontFamily` instead.
         */
        get font() {
          deprecation(v8_0_0, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead.");
          return this.fontFamily;
        }
        /**
         * The map of base page textures (i.e., sheets of glyphs).
         * @deprecated since 8.0.0 Use `pages` instead.
         */
        get pageTextures() {
          deprecation(v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.");
          return this.pages;
        }
        /**
         * The size of the font face in pixels.
         * @deprecated since 8.0.0 Use `fontMetrics.fontSize` instead.
         */
        get size() {
          deprecation(v8_0_0, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead.");
          return this.fontMetrics.fontSize;
        }
        /**
         * The kind of distance field for this font or "none".
         * @deprecated since 8.0.0 Use `distanceField.type` instead.
         */
        get distanceFieldRange() {
          deprecation(v8_0_0, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead.");
          return this.distanceField.range;
        }
        /**
         * The range of the distance field in pixels.
         * @deprecated since 8.0.0 Use `distanceField.range` instead.
         */
        get distanceFieldType() {
          deprecation(v8_0_0, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead.");
          return this.distanceField.type;
        }
        destroy(destroyTextures = false) {
          this.emit("destroy", this);
          this.removeAllListeners();
          for (const i2 in this.chars) {
            this.chars[i2].texture?.destroy();
          }
          this.chars = null;
          if (destroyTextures) {
            this.pages.forEach((page) => page.texture.destroy(true));
            this.pages = null;
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/utils/resolveCharacters.mjs
  function resolveCharacters(chars) {
    if (chars === "") {
      return [];
    }
    if (typeof chars === "string") {
      chars = [chars];
    }
    const result = [];
    for (let i2 = 0, j2 = chars.length; i2 < j2; i2++) {
      const item = chars[i2];
      if (Array.isArray(item)) {
        if (item.length !== 2) {
          throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${item.length}.`);
        }
        if (item[0].length === 0 || item[1].length === 0) {
          throw new Error("[BitmapFont]: Invalid character delimiter.");
        }
        const startCode = item[0].charCodeAt(0);
        const endCode = item[1].charCodeAt(0);
        if (endCode < startCode) {
          throw new Error("[BitmapFont]: Invalid character range.");
        }
        for (let i22 = startCode, j22 = endCode; i22 <= j22; i22++) {
          result.push(String.fromCharCode(i22));
        }
      } else {
        result.push(...Array.from(item));
      }
    }
    if (result.length === 0) {
      throw new Error("[BitmapFont]: Empty set when resolving characters.");
    }
    return result;
  }
  var init_resolveCharacters = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/utils/resolveCharacters.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/DynamicBitmapFont.mjs
  var _DynamicBitmapFont, DynamicBitmapFont;
  var init_DynamicBitmapFont = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/DynamicBitmapFont.mjs"() {
      init_Color();
      init_Rectangle();
      init_CanvasPool();
      init_ImageSource();
      init_Texture();
      init_deprecation();
      init_CanvasTextMetrics();
      init_fontStringFromTextStyle();
      init_getCanvasFillStyle();
      init_TextStyle();
      init_AbstractBitmapFont();
      init_resolveCharacters();
      _DynamicBitmapFont = class _DynamicBitmapFont2 extends AbstractBitmapFont {
        /**
         * @param options - The options for the dynamic bitmap font.
         */
        constructor(options) {
          super();
          this.resolution = 1;
          this.pages = [];
          this._padding = 0;
          this._measureCache = /* @__PURE__ */ Object.create(null);
          this._currentChars = [];
          this._currentX = 0;
          this._currentY = 0;
          this._currentPageIndex = -1;
          this._skipKerning = false;
          const dynamicOptions = { ..._DynamicBitmapFont2.defaultOptions, ...options };
          this._textureSize = dynamicOptions.textureSize;
          this._mipmap = dynamicOptions.mipmap;
          const style = dynamicOptions.style.clone();
          if (dynamicOptions.overrideFill) {
            style._fill.color = 16777215;
            style._fill.alpha = 1;
            style._fill.texture = Texture.WHITE;
            style._fill.fill = null;
          }
          this.applyFillAsTint = dynamicOptions.overrideFill;
          const requestedFontSize = style.fontSize;
          style.fontSize = this.baseMeasurementFontSize;
          const font = fontStringFromTextStyle(style);
          if (dynamicOptions.overrideSize) {
            if (style._stroke) {
              style._stroke.width *= this.baseRenderedFontSize / requestedFontSize;
            }
          } else {
            style.fontSize = this.baseRenderedFontSize = requestedFontSize;
          }
          this._style = style;
          this._skipKerning = dynamicOptions.skipKerning ?? false;
          this.resolution = dynamicOptions.resolution ?? 1;
          this._padding = dynamicOptions.padding ?? 4;
          this.fontMetrics = CanvasTextMetrics.measureFont(font);
          this.lineHeight = style.lineHeight || this.fontMetrics.fontSize || style.fontSize;
        }
        ensureCharacters(chars) {
          const charList = resolveCharacters(chars).filter((char) => !this._currentChars.includes(char)).filter((char, index, self2) => self2.indexOf(char) === index);
          if (!charList.length)
            return;
          this._currentChars = [...this._currentChars, ...charList];
          let pageData;
          if (this._currentPageIndex === -1) {
            pageData = this._nextPage();
          } else {
            pageData = this.pages[this._currentPageIndex];
          }
          let { canvas, context: context2 } = pageData.canvasAndContext;
          let textureSource = pageData.texture.source;
          const style = this._style;
          let currentX = this._currentX;
          let currentY = this._currentY;
          const fontScale = this.baseRenderedFontSize / this.baseMeasurementFontSize;
          const padding = this._padding * fontScale;
          const widthScale = style.fontStyle === "italic" ? 2 : 1;
          let maxCharHeight = 0;
          let skipTexture = false;
          for (let i2 = 0; i2 < charList.length; i2++) {
            const char = charList[i2];
            const metrics = CanvasTextMetrics.measureText(char, style, canvas, false);
            metrics.lineHeight = metrics.height;
            const width = widthScale * metrics.width * fontScale;
            const height = metrics.height * fontScale;
            const paddedWidth = width + padding * 2;
            const paddedHeight = height + padding * 2;
            skipTexture = false;
            if (char !== "\n" && char !== "\r" && char !== "	" && char !== " ") {
              skipTexture = true;
              maxCharHeight = Math.ceil(Math.max(paddedHeight, maxCharHeight));
            }
            if (currentX + paddedWidth > this._textureSize) {
              currentY += maxCharHeight;
              maxCharHeight = paddedHeight;
              currentX = 0;
              if (currentY + maxCharHeight > this._textureSize) {
                textureSource.update();
                const pageData2 = this._nextPage();
                canvas = pageData2.canvasAndContext.canvas;
                context2 = pageData2.canvasAndContext.context;
                textureSource = pageData2.texture.source;
                currentY = 0;
              }
            }
            const xAdvance = width / fontScale - (style.dropShadow?.distance ?? 0) - (style._stroke?.width ?? 0);
            this.chars[char] = {
              id: char.codePointAt(0),
              xOffset: -this._padding,
              yOffset: -this._padding,
              xAdvance,
              kerning: {}
            };
            if (skipTexture) {
              this._drawGlyph(
                context2,
                metrics,
                currentX + padding,
                currentY + padding,
                fontScale,
                style
              );
              const px = textureSource.width * fontScale;
              const py = textureSource.height * fontScale;
              const frame = new Rectangle(
                currentX / px * textureSource.width,
                currentY / py * textureSource.height,
                paddedWidth / px * textureSource.width,
                paddedHeight / py * textureSource.height
              );
              this.chars[char].texture = new Texture({
                source: textureSource,
                frame
              });
              currentX += Math.ceil(paddedWidth);
            }
          }
          textureSource.update();
          this._currentX = currentX;
          this._currentY = currentY;
          this._skipKerning && this._applyKerning(charList, context2);
        }
        /**
         * @deprecated since 8.0.0
         * The map of base page textures (i.e., sheets of glyphs).
         */
        get pageTextures() {
          deprecation(v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.");
          return this.pages;
        }
        _applyKerning(newChars, context2) {
          const measureCache = this._measureCache;
          for (let i2 = 0; i2 < newChars.length; i2++) {
            const first = newChars[i2];
            for (let j2 = 0; j2 < this._currentChars.length; j2++) {
              const second = this._currentChars[j2];
              let c1 = measureCache[first];
              if (!c1)
                c1 = measureCache[first] = context2.measureText(first).width;
              let c2 = measureCache[second];
              if (!c2)
                c2 = measureCache[second] = context2.measureText(second).width;
              let total = context2.measureText(first + second).width;
              let amount = total - (c1 + c2);
              if (amount) {
                this.chars[first].kerning[second] = amount;
              }
              total = context2.measureText(first + second).width;
              amount = total - (c1 + c2);
              if (amount) {
                this.chars[second].kerning[first] = amount;
              }
            }
          }
        }
        _nextPage() {
          this._currentPageIndex++;
          const textureResolution = this.resolution;
          const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(
            this._textureSize,
            this._textureSize,
            textureResolution
          );
          this._setupContext(canvasAndContext.context, this._style, textureResolution);
          const resolution = textureResolution * (this.baseRenderedFontSize / this.baseMeasurementFontSize);
          const texture = new Texture({
            source: new ImageSource({
              resource: canvasAndContext.canvas,
              resolution,
              alphaMode: "premultiply-alpha-on-upload",
              autoGenerateMipmaps: this._mipmap
            })
          });
          const pageData = {
            canvasAndContext,
            texture
          };
          this.pages[this._currentPageIndex] = pageData;
          return pageData;
        }
        // canvas style!
        _setupContext(context2, style, resolution) {
          style.fontSize = this.baseRenderedFontSize;
          context2.scale(resolution, resolution);
          context2.font = fontStringFromTextStyle(style);
          style.fontSize = this.baseMeasurementFontSize;
          context2.textBaseline = style.textBaseline;
          const stroke = style._stroke;
          const strokeThickness = stroke?.width ?? 0;
          if (stroke) {
            context2.lineWidth = strokeThickness;
            context2.lineJoin = stroke.join;
            context2.miterLimit = stroke.miterLimit;
            context2.strokeStyle = getCanvasFillStyle(stroke, context2);
          }
          if (style._fill) {
            context2.fillStyle = getCanvasFillStyle(style._fill, context2);
          }
          if (style.dropShadow) {
            const shadowOptions = style.dropShadow;
            const rgb = Color.shared.setValue(shadowOptions.color).toArray();
            const dropShadowBlur = shadowOptions.blur * resolution;
            const dropShadowDistance = shadowOptions.distance * resolution;
            context2.shadowColor = `rgba(${rgb[0] * 255},${rgb[1] * 255},${rgb[2] * 255},${shadowOptions.alpha})`;
            context2.shadowBlur = dropShadowBlur;
            context2.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
            context2.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance;
          } else {
            context2.shadowColor = "black";
            context2.shadowBlur = 0;
            context2.shadowOffsetX = 0;
            context2.shadowOffsetY = 0;
          }
        }
        _drawGlyph(context2, metrics, x2, y2, fontScale, style) {
          const char = metrics.text;
          const fontProperties = metrics.fontProperties;
          const stroke = style._stroke;
          const strokeThickness = (stroke?.width ?? 0) * fontScale;
          const tx = x2 + strokeThickness / 2;
          const ty = y2 - strokeThickness / 2;
          const descent = fontProperties.descent * fontScale;
          const lineHeight = metrics.lineHeight * fontScale;
          if (style.stroke && strokeThickness) {
            context2.strokeText(char, tx, ty + lineHeight - descent);
          }
          if (style._fill) {
            context2.fillText(char, tx, ty + lineHeight - descent);
          }
        }
        destroy() {
          super.destroy();
          for (let i2 = 0; i2 < this.pages.length; i2++) {
            const { canvasAndContext, texture } = this.pages[i2];
            canvasAndContext.canvas.width = canvasAndContext.canvas.width;
            CanvasPool.returnCanvasAndContext(canvasAndContext);
            texture.destroy(true);
          }
          this.pages = null;
        }
      };
      _DynamicBitmapFont.defaultOptions = {
        textureSize: 512,
        style: new TextStyle(),
        mipmap: true
      };
      DynamicBitmapFont = _DynamicBitmapFont;
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/utils/getBitmapTextLayout.mjs
  function getBitmapTextLayout(chars, style, font, trimEnd) {
    const layoutData = {
      width: 0,
      height: 0,
      offsetY: 0,
      scale: style.fontSize / font.baseMeasurementFontSize,
      lines: [{
        width: 0,
        charPositions: [],
        spaceWidth: 0,
        spacesIndex: [],
        chars: []
      }]
    };
    layoutData.offsetY = font.baseLineOffset;
    let currentLine = layoutData.lines[0];
    let previousChar = null;
    let firstWord = true;
    const currentWord = {
      spaceWord: false,
      width: 0,
      start: 0,
      index: 0,
      // use index to not modify the array as we use it a lot!
      positions: [],
      chars: []
    };
    const nextWord = (word) => {
      const start = currentLine.width;
      for (let j2 = 0; j2 < currentWord.index; j2++) {
        const position = word.positions[j2];
        currentLine.chars.push(word.chars[j2]);
        currentLine.charPositions.push(position + start);
      }
      currentLine.width += word.width;
      firstWord = false;
      currentWord.width = 0;
      currentWord.index = 0;
      currentWord.chars.length = 0;
    };
    const nextLine = () => {
      let index = currentLine.chars.length - 1;
      if (trimEnd) {
        let lastChar = currentLine.chars[index];
        while (lastChar === " ") {
          currentLine.width -= font.chars[lastChar].xAdvance;
          lastChar = currentLine.chars[--index];
        }
      }
      layoutData.width = Math.max(layoutData.width, currentLine.width);
      currentLine = {
        width: 0,
        charPositions: [],
        chars: [],
        spaceWidth: 0,
        spacesIndex: []
      };
      firstWord = true;
      layoutData.lines.push(currentLine);
      layoutData.height += font.lineHeight;
    };
    const scale = font.baseMeasurementFontSize / style.fontSize;
    const adjustedLetterSpacing = style.letterSpacing * scale;
    const adjustedWordWrapWidth = style.wordWrapWidth * scale;
    for (let i2 = 0; i2 < chars.length + 1; i2++) {
      let char;
      const isEnd = i2 === chars.length;
      if (!isEnd) {
        char = chars[i2];
      }
      const charData = font.chars[char] || font.chars[" "];
      const isSpace = /(?:\s)/.test(char);
      const isWordBreak = isSpace || char === "\r" || char === "\n" || isEnd;
      if (isWordBreak) {
        const addWordToNextLine = !firstWord && style.wordWrap && currentLine.width + currentWord.width - adjustedLetterSpacing > adjustedWordWrapWidth;
        if (addWordToNextLine) {
          nextLine();
          nextWord(currentWord);
          if (!isEnd) {
            currentLine.charPositions.push(0);
          }
        } else {
          currentWord.start = currentLine.width;
          nextWord(currentWord);
          if (!isEnd) {
            currentLine.charPositions.push(0);
          }
        }
        if (char === "\r" || char === "\n") {
          if (currentLine.width !== 0) {
            nextLine();
          }
        } else if (!isEnd) {
          const spaceWidth = charData.xAdvance + (charData.kerning[previousChar] || 0) + adjustedLetterSpacing;
          currentLine.width += spaceWidth;
          currentLine.spaceWidth = spaceWidth;
          currentLine.spacesIndex.push(currentLine.charPositions.length);
          currentLine.chars.push(char);
        }
      } else {
        const kerning = charData.kerning[previousChar] || 0;
        const nextCharWidth = charData.xAdvance + kerning + adjustedLetterSpacing;
        currentWord.positions[currentWord.index++] = currentWord.width + kerning;
        currentWord.chars.push(char);
        currentWord.width += nextCharWidth;
      }
      previousChar = char;
    }
    nextLine();
    if (style.align === "center") {
      alignCenter(layoutData);
    } else if (style.align === "right") {
      alignRight(layoutData);
    } else if (style.align === "justify") {
      alignJustify(layoutData);
    }
    return layoutData;
  }
  function alignCenter(measurementData) {
    for (let i2 = 0; i2 < measurementData.lines.length; i2++) {
      const line = measurementData.lines[i2];
      const offset = measurementData.width / 2 - line.width / 2;
      for (let j2 = 0; j2 < line.charPositions.length; j2++) {
        line.charPositions[j2] += offset;
      }
    }
  }
  function alignRight(measurementData) {
    for (let i2 = 0; i2 < measurementData.lines.length; i2++) {
      const line = measurementData.lines[i2];
      const offset = measurementData.width - line.width;
      for (let j2 = 0; j2 < line.charPositions.length; j2++) {
        line.charPositions[j2] += offset;
      }
    }
  }
  function alignJustify(measurementData) {
    const width = measurementData.width;
    for (let i2 = 0; i2 < measurementData.lines.length; i2++) {
      const line = measurementData.lines[i2];
      let indy = 0;
      let spaceIndex = line.spacesIndex[indy++];
      let offset = 0;
      const totalSpaces = line.spacesIndex.length;
      const newSpaceWidth = (width - line.width) / totalSpaces;
      const spaceWidth = newSpaceWidth;
      for (let j2 = 0; j2 < line.charPositions.length; j2++) {
        if (j2 === spaceIndex) {
          spaceIndex = line.spacesIndex[indy++];
          offset += spaceWidth;
        }
        line.charPositions[j2] += offset;
      }
    }
  }
  var init_getBitmapTextLayout = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/utils/getBitmapTextLayout.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/BitmapFontManager.mjs
  var fontCount, BitmapFontManagerClass, BitmapFontManager;
  var init_BitmapFontManager = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/BitmapFontManager.mjs"() {
      init_Cache();
      init_deprecation();
      init_warn();
      init_TextStyle();
      init_DynamicBitmapFont();
      init_getBitmapTextLayout();
      init_resolveCharacters();
      fontCount = 0;
      BitmapFontManagerClass = class {
        constructor() {
          this.ALPHA = [["a", "z"], ["A", "Z"], " "];
          this.NUMERIC = [["0", "9"]];
          this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "];
          this.ASCII = [[" ", "~"]];
          this.defaultOptions = {
            chars: this.ALPHANUMERIC,
            resolution: 1,
            padding: 4,
            skipKerning: false
          };
        }
        /**
         * Get a font for the specified text and style.
         * @param text - The text to get the font for
         * @param style - The style to use
         */
        getFont(text, style) {
          let fontFamilyKey = `${style.fontFamily}-bitmap`;
          let overrideFill = true;
          if (style._fill.fill && !style._stroke) {
            fontFamilyKey += style._fill.fill.styleKey;
            overrideFill = false;
          } else if (style._stroke || style.dropShadow) {
            let key = style.styleKey;
            key = key.substring(0, key.lastIndexOf("-"));
            fontFamilyKey = `${key}-bitmap`;
            overrideFill = false;
          }
          if (!Cache.has(fontFamilyKey)) {
            const fnt = new DynamicBitmapFont({
              style,
              overrideFill,
              overrideSize: true,
              ...this.defaultOptions
            });
            fontCount++;
            if (fontCount > 50) {
              warn("BitmapText", `You have dynamically created ${fontCount} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``);
            }
            fnt.once("destroy", () => {
              fontCount--;
              Cache.remove(fontFamilyKey);
            });
            Cache.set(
              fontFamilyKey,
              fnt
            );
          }
          const dynamicFont = Cache.get(fontFamilyKey);
          dynamicFont.ensureCharacters?.(text);
          return dynamicFont;
        }
        /**
         * Get the layout of a text for the specified style.
         * @param text - The text to get the layout for
         * @param style - The style to use
         * @param trimEnd - Whether to ignore whitespaces at the end of each line
         */
        getLayout(text, style, trimEnd = true) {
          const bitmapFont = this.getFont(text, style);
          return getBitmapTextLayout([...text], style, bitmapFont, trimEnd);
        }
        /**
         * Measure the text using the specified style.
         * @param text - The text to measure
         * @param style - The style to use
         * @param trimEnd - Whether to ignore whitespaces at the end of each line
         */
        measureText(text, style, trimEnd = true) {
          return this.getLayout(text, style, trimEnd);
        }
        // eslint-disable-next-line max-len
        install(...args) {
          let options = args[0];
          if (typeof options === "string") {
            options = {
              name: options,
              style: args[1],
              chars: args[2]?.chars,
              resolution: args[2]?.resolution,
              padding: args[2]?.padding,
              skipKerning: args[2]?.skipKerning
            };
            deprecation(v8_0_0, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})");
          }
          const name = options?.name;
          if (!name) {
            throw new Error("[BitmapFontManager] Property `name` is required.");
          }
          options = { ...this.defaultOptions, ...options };
          const textStyle = options.style;
          const style = textStyle instanceof TextStyle ? textStyle : new TextStyle(textStyle);
          const overrideFill = style._fill.fill !== null && style._fill.fill !== void 0;
          const font = new DynamicBitmapFont({
            style,
            overrideFill,
            skipKerning: options.skipKerning,
            padding: options.padding,
            resolution: options.resolution,
            overrideSize: false
          });
          const flatChars = resolveCharacters(options.chars);
          font.ensureCharacters(flatChars.join(""));
          Cache.set(`${name}-bitmap`, font);
          font.once("destroy", () => Cache.remove(`${name}-bitmap`));
          return font;
        }
        /**
         * Uninstalls a bitmap font from the cache.
         * @param {string} name - The name of the bitmap font to uninstall.
         */
        uninstall(name) {
          const cacheKey = `${name}-bitmap`;
          const font = Cache.get(cacheKey);
          if (font) {
            Cache.remove(cacheKey);
            font.destroy();
          }
        }
      };
      BitmapFontManager = new BitmapFontManagerClass();
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/BitmapTextPipe.mjs
  function syncWithProxy(container, proxy) {
    proxy.groupTransform = container.groupTransform;
    proxy.groupColorAlpha = container.groupColorAlpha;
    proxy.groupColor = container.groupColor;
    proxy.groupBlendMode = container.groupBlendMode;
    proxy.globalDisplayStatus = container.globalDisplayStatus;
    proxy.groupTransform = container.groupTransform;
    proxy.localDisplayStatus = container.localDisplayStatus;
    proxy.groupAlpha = container.groupAlpha;
    proxy._roundPixels = container._roundPixels;
  }
  var BitmapTextPipe;
  var init_BitmapTextPipe = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/BitmapTextPipe.mjs"() {
      init_Cache();
      init_Extensions();
      init_PoolGroup();
      init_Graphics();
      init_SdfShader();
      init_BitmapFontManager();
      init_getBitmapTextLayout();
      BitmapTextPipe = class {
        constructor(renderer) {
          this._gpuBitmapText = {};
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this._renderer = renderer;
        }
        validateRenderable(bitmapText) {
          const graphicsRenderable = this._getGpuBitmapText(bitmapText);
          if (bitmapText._didTextUpdate) {
            bitmapText._didTextUpdate = false;
            this._updateContext(bitmapText, graphicsRenderable);
          }
          return this._renderer.renderPipes.graphics.validateRenderable(graphicsRenderable);
        }
        addRenderable(bitmapText, instructionSet) {
          const graphicsRenderable = this._getGpuBitmapText(bitmapText);
          syncWithProxy(bitmapText, graphicsRenderable);
          if (bitmapText._didTextUpdate) {
            bitmapText._didTextUpdate = false;
            this._updateContext(bitmapText, graphicsRenderable);
          }
          this._renderer.renderPipes.graphics.addRenderable(graphicsRenderable, instructionSet);
          if (graphicsRenderable.context.customShader) {
            this._updateDistanceField(bitmapText);
          }
        }
        destroyRenderable(bitmapText) {
          bitmapText.off("destroyed", this._destroyRenderableBound);
          this._destroyRenderableByUid(bitmapText.uid);
        }
        _destroyRenderableByUid(renderableUid) {
          const context2 = this._gpuBitmapText[renderableUid].context;
          if (context2.customShader) {
            BigPool.return(context2.customShader);
            context2.customShader = null;
          }
          BigPool.return(this._gpuBitmapText[renderableUid]);
          this._gpuBitmapText[renderableUid] = null;
        }
        updateRenderable(bitmapText) {
          const graphicsRenderable = this._getGpuBitmapText(bitmapText);
          syncWithProxy(bitmapText, graphicsRenderable);
          this._renderer.renderPipes.graphics.updateRenderable(graphicsRenderable);
          if (graphicsRenderable.context.customShader) {
            this._updateDistanceField(bitmapText);
          }
        }
        _updateContext(bitmapText, proxyGraphics) {
          const { context: context2 } = proxyGraphics;
          const bitmapFont = BitmapFontManager.getFont(bitmapText.text, bitmapText._style);
          context2.clear();
          if (bitmapFont.distanceField.type !== "none") {
            if (!context2.customShader) {
              context2.customShader = BigPool.get(SdfShader);
            }
          }
          const chars = Array.from(bitmapText.text);
          const style = bitmapText._style;
          let currentY = bitmapFont.baseLineOffset;
          const bitmapTextLayout = getBitmapTextLayout(chars, style, bitmapFont, true);
          let index = 0;
          const padding = style.padding;
          const scale = bitmapTextLayout.scale;
          let tx = bitmapTextLayout.width;
          let ty = bitmapTextLayout.height + bitmapTextLayout.offsetY;
          if (style._stroke) {
            tx += style._stroke.width / scale;
            ty += style._stroke.width / scale;
          }
          context2.translate(-bitmapText._anchor._x * tx - padding, -bitmapText._anchor._y * ty - padding).scale(scale, scale);
          const tint = bitmapFont.applyFillAsTint ? style._fill.color : 16777215;
          for (let i2 = 0; i2 < bitmapTextLayout.lines.length; i2++) {
            const line = bitmapTextLayout.lines[i2];
            for (let j2 = 0; j2 < line.charPositions.length; j2++) {
              const char = chars[index++];
              const charData = bitmapFont.chars[char];
              if (charData?.texture) {
                context2.texture(
                  charData.texture,
                  tint ? tint : "black",
                  Math.round(line.charPositions[j2] + charData.xOffset),
                  Math.round(currentY + charData.yOffset)
                );
              }
            }
            currentY += bitmapFont.lineHeight;
          }
        }
        _getGpuBitmapText(bitmapText) {
          return this._gpuBitmapText[bitmapText.uid] || this.initGpuText(bitmapText);
        }
        initGpuText(bitmapText) {
          const proxyRenderable = BigPool.get(Graphics);
          this._gpuBitmapText[bitmapText.uid] = proxyRenderable;
          this._updateContext(bitmapText, proxyRenderable);
          bitmapText.on("destroyed", this._destroyRenderableBound);
          return this._gpuBitmapText[bitmapText.uid];
        }
        _updateDistanceField(bitmapText) {
          const context2 = this._getGpuBitmapText(bitmapText).context;
          const fontFamily = bitmapText._style.fontFamily;
          const dynamicFont = Cache.get(`${fontFamily}-bitmap`);
          const { a: a2, b: b2, c: c2, d: d2 } = bitmapText.groupTransform;
          const dx = Math.sqrt(a2 * a2 + b2 * b2);
          const dy = Math.sqrt(c2 * c2 + d2 * d2);
          const worldScale = (Math.abs(dx) + Math.abs(dy)) / 2;
          const fontScale = dynamicFont.baseRenderedFontSize / bitmapText._style.fontSize;
          const distance = worldScale * dynamicFont.distanceField.range * (1 / fontScale);
          context2.customShader.resources.localUniforms.uniforms.uDistance = distance;
        }
        destroy() {
          for (const uid2 in this._gpuBitmapText) {
            this._destroyRenderableByUid(uid2);
          }
          this._gpuBitmapText = null;
          this._renderer = null;
        }
      };
      BitmapTextPipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "bitmapText"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-bitmap/init.mjs
  var init_init9 = __esm({
    "node_modules/pixi.js/lib/scene/text-bitmap/init.mjs"() {
      init_Extensions();
      init_BitmapTextPipe();
      extensions.add(BitmapTextPipe);
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/HTMLTextPipe.mjs
  var HTMLTextPipe;
  var init_HTMLTextPipe = __esm({
    "node_modules/pixi.js/lib/scene/text-html/HTMLTextPipe.mjs"() {
      init_Extensions();
      init_Texture();
      init_updateQuadBounds();
      init_PoolGroup();
      init_BatchableSprite();
      HTMLTextPipe = class {
        constructor(renderer) {
          this._gpuText = /* @__PURE__ */ Object.create(null);
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this._renderer = renderer;
          this._renderer.runners.resolutionChange.add(this);
        }
        resolutionChange() {
          for (const i2 in this._gpuText) {
            const gpuText = this._gpuText[i2];
            if (!gpuText)
              continue;
            const text = gpuText.batchableSprite.renderable;
            if (text._autoResolution) {
              text._resolution = this._renderer.resolution;
              text.onViewUpdate();
            }
          }
        }
        validateRenderable(htmlText) {
          const gpuText = this._getGpuText(htmlText);
          const newKey = htmlText._getKey();
          if (gpuText.textureNeedsUploading) {
            gpuText.textureNeedsUploading = false;
            return true;
          }
          if (gpuText.currentKey !== newKey) {
            return true;
          }
          return false;
        }
        addRenderable(htmlText, instructionSet) {
          const gpuText = this._getGpuText(htmlText);
          const batchableSprite = gpuText.batchableSprite;
          if (htmlText._didTextUpdate) {
            this._updateText(htmlText);
          }
          this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
        }
        updateRenderable(htmlText) {
          const gpuText = this._getGpuText(htmlText);
          const batchableSprite = gpuText.batchableSprite;
          if (htmlText._didTextUpdate) {
            this._updateText(htmlText);
          }
          batchableSprite._batcher.updateElement(batchableSprite);
        }
        destroyRenderable(htmlText) {
          htmlText.off("destroyed", this._destroyRenderableBound);
          this._destroyRenderableById(htmlText.uid);
        }
        _destroyRenderableById(htmlTextUid) {
          const gpuText = this._gpuText[htmlTextUid];
          this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
          BigPool.return(gpuText.batchableSprite);
          this._gpuText[htmlTextUid] = null;
        }
        _updateText(htmlText) {
          const newKey = htmlText._getKey();
          const gpuText = this._getGpuText(htmlText);
          const batchableSprite = gpuText.batchableSprite;
          if (gpuText.currentKey !== newKey) {
            this._updateGpuText(htmlText).catch((e2) => {
              console.error(e2);
            });
          }
          htmlText._didTextUpdate = false;
          const padding = htmlText._style.padding;
          updateQuadBounds(batchableSprite.bounds, htmlText._anchor, batchableSprite.texture, padding);
        }
        async _updateGpuText(htmlText) {
          htmlText._didTextUpdate = false;
          const gpuText = this._getGpuText(htmlText);
          if (gpuText.generatingTexture)
            return;
          const newKey = htmlText._getKey();
          this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
          gpuText.generatingTexture = true;
          gpuText.currentKey = newKey;
          const resolution = htmlText.resolution ?? this._renderer.resolution;
          const texture = await this._renderer.htmlText.getManagedTexture(
            htmlText.text,
            resolution,
            htmlText._style,
            htmlText._getKey()
          );
          const batchableSprite = gpuText.batchableSprite;
          batchableSprite.texture = gpuText.texture = texture;
          gpuText.generatingTexture = false;
          gpuText.textureNeedsUploading = true;
          htmlText.onViewUpdate();
          const padding = htmlText._style.padding;
          updateQuadBounds(batchableSprite.bounds, htmlText._anchor, batchableSprite.texture, padding);
        }
        _getGpuText(htmlText) {
          return this._gpuText[htmlText.uid] || this.initGpuText(htmlText);
        }
        initGpuText(htmlText) {
          const gpuTextData = {
            texture: Texture.EMPTY,
            currentKey: "--",
            batchableSprite: BigPool.get(BatchableSprite),
            textureNeedsUploading: false,
            generatingTexture: false
          };
          const batchableSprite = gpuTextData.batchableSprite;
          batchableSprite.renderable = htmlText;
          batchableSprite.transform = htmlText.groupTransform;
          batchableSprite.texture = Texture.EMPTY;
          batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
          batchableSprite.roundPixels = this._renderer._roundPixels | htmlText._roundPixels;
          htmlText._resolution = htmlText._autoResolution ? this._renderer.resolution : htmlText.resolution;
          this._gpuText[htmlText.uid] = gpuTextData;
          htmlText.on("destroyed", this._destroyRenderableBound);
          return gpuTextData;
        }
        destroy() {
          for (const i2 in this._gpuText) {
            this._destroyRenderableById(i2);
          }
          this._gpuText = null;
          this._renderer = null;
        }
      };
      HTMLTextPipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "htmlText"
      };
    }
  });

  // node_modules/pixi.js/lib/utils/browser/isSafari.mjs
  function isSafari() {
    const { userAgent } = DOMAdapter.get().getNavigator();
    return /^((?!chrome|android).)*safari/i.test(userAgent);
  }
  var init_isSafari = __esm({
    "node_modules/pixi.js/lib/utils/browser/isSafari.mjs"() {
      init_adapter();
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/HTMLTextRenderData.mjs
  var nssvg, nsxhtml, HTMLTextRenderData;
  var init_HTMLTextRenderData = __esm({
    "node_modules/pixi.js/lib/scene/text-html/HTMLTextRenderData.mjs"() {
      "use strict";
      nssvg = "http://www.w3.org/2000/svg";
      nsxhtml = "http://www.w3.org/1999/xhtml";
      HTMLTextRenderData = class {
        constructor() {
          this.svgRoot = document.createElementNS(nssvg, "svg");
          this.foreignObject = document.createElementNS(nssvg, "foreignObject");
          this.domElement = document.createElementNS(nsxhtml, "div");
          this.styleElement = document.createElementNS(nsxhtml, "style");
          this.image = new Image();
          const { foreignObject, svgRoot, styleElement, domElement } = this;
          foreignObject.setAttribute("width", "10000");
          foreignObject.setAttribute("height", "10000");
          foreignObject.style.overflow = "hidden";
          svgRoot.appendChild(foreignObject);
          foreignObject.appendChild(styleElement);
          foreignObject.appendChild(domElement);
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/textStyleToCSS.mjs
  function textStyleToCSS(style) {
    const stroke = style._stroke;
    const fill = style._fill;
    const cssStyleString = [
      `color: ${Color.shared.setValue(fill.color).toHex()}`,
      `font-size: ${style.fontSize}px`,
      `font-family: ${style.fontFamily}`,
      `font-weight: ${style.fontWeight}`,
      `font-style: ${style.fontStyle}`,
      `font-variant: ${style.fontVariant}`,
      `letter-spacing: ${style.letterSpacing}px`,
      `text-align: ${style.align}`,
      `padding: ${style.padding}px`,
      `white-space: ${style.whiteSpace === "pre" && style.wordWrap ? "pre-wrap" : style.whiteSpace}`,
      ...style.lineHeight ? [`line-height: ${style.lineHeight}px`] : [],
      ...style.wordWrap ? [
        `word-wrap: ${style.breakWords ? "break-all" : "break-word"}`,
        `max-width: ${style.wordWrapWidth}px`
      ] : [],
      ...stroke ? [strokeToCSS(stroke)] : [],
      ...style.dropShadow ? [dropShadowToCSS(style.dropShadow)] : [],
      ...style.cssOverrides
    ].join(";");
    const cssStyles = [`div { ${cssStyleString} }`];
    tagStyleToCSS(style.tagStyles, cssStyles);
    return cssStyles.join(" ");
  }
  function dropShadowToCSS(dropShadowStyle) {
    const color = Color.shared.setValue(dropShadowStyle.color).setAlpha(dropShadowStyle.alpha).toHexa();
    const x2 = Math.round(Math.cos(dropShadowStyle.angle) * dropShadowStyle.distance);
    const y2 = Math.round(Math.sin(dropShadowStyle.angle) * dropShadowStyle.distance);
    const position = `${x2}px ${y2}px`;
    if (dropShadowStyle.blur > 0) {
      return `text-shadow: ${position} ${dropShadowStyle.blur}px ${color}`;
    }
    return `text-shadow: ${position} ${color}`;
  }
  function strokeToCSS(stroke) {
    return [
      `-webkit-text-stroke-width: ${stroke.width}px`,
      `-webkit-text-stroke-color: ${Color.shared.setValue(stroke.color).toHex()}`,
      `text-stroke-width: ${stroke.width}px`,
      `text-stroke-color: ${Color.shared.setValue(stroke.color).toHex()}`,
      "paint-order: stroke"
    ].join(";");
  }
  function tagStyleToCSS(tagStyles, out2) {
    for (const i2 in tagStyles) {
      const tagStyle = tagStyles[i2];
      const cssTagStyle = [];
      for (const j2 in tagStyle) {
        if (transform[j2]) {
          cssTagStyle.push(transform[j2](tagStyle[j2]));
        } else if (templates[j2]) {
          cssTagStyle.push(templates[j2].replace("{{VALUE}}", tagStyle[j2]));
        }
      }
      out2.push(`${i2} { ${cssTagStyle.join(";")} }`);
    }
  }
  var templates, transform;
  var init_textStyleToCSS = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/textStyleToCSS.mjs"() {
      init_Color();
      templates = {
        fontSize: `font-size: {{VALUE}}px`,
        fontFamily: `font-family: {{VALUE}}`,
        fontWeight: `font-weight: {{VALUE}}`,
        fontStyle: `font-style: {{VALUE}}`,
        fontVariant: `font-variant: {{VALUE}}`,
        letterSpacing: `letter-spacing: {{VALUE}}px`,
        align: `text-align: {{VALUE}}`,
        padding: `padding: {{VALUE}}px`,
        whiteSpace: `white-space: {{VALUE}}`,
        lineHeight: `line-height: {{VALUE}}px`,
        wordWrapWidth: `max-width: {{VALUE}}px`
      };
      transform = {
        fill: (value) => `color: ${Color.shared.setValue(value).toHex()}`,
        breakWords: (value) => `word-wrap: ${value ? "break-all" : "break-word"}`,
        stroke: strokeToCSS,
        dropShadow: dropShadowToCSS
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/HtmlTextStyle.mjs
  var HTMLTextStyle;
  var init_HtmlTextStyle = __esm({
    "node_modules/pixi.js/lib/scene/text-html/HtmlTextStyle.mjs"() {
      init_warn();
      init_TextStyle();
      init_generateTextStyleKey();
      init_textStyleToCSS();
      HTMLTextStyle = class _HTMLTextStyle extends TextStyle {
        constructor(options = {}) {
          super(options);
          this._cssOverrides = [];
          this.cssOverrides ?? (this.cssOverrides = options.cssOverrides);
          this.tagStyles = options.tagStyles ?? {};
        }
        /** List of style overrides that will be applied to the HTML text. */
        set cssOverrides(value) {
          this._cssOverrides = value instanceof Array ? value : [value];
          this.update();
        }
        get cssOverrides() {
          return this._cssOverrides;
        }
        _generateKey() {
          this._styleKey = generateTextStyleKey(this) + this._cssOverrides.join("-");
          return this._styleKey;
        }
        update() {
          this._cssStyle = null;
          super.update();
        }
        /**
         * Creates a new HTMLTextStyle object with the same values as this one.
         * @returns New cloned HTMLTextStyle object
         */
        clone() {
          return new _HTMLTextStyle({
            align: this.align,
            breakWords: this.breakWords,
            dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
            fill: this._fill,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            fontVariant: this.fontVariant,
            fontWeight: this.fontWeight,
            letterSpacing: this.letterSpacing,
            lineHeight: this.lineHeight,
            padding: this.padding,
            stroke: this._stroke,
            whiteSpace: this.whiteSpace,
            wordWrap: this.wordWrap,
            wordWrapWidth: this.wordWrapWidth,
            cssOverrides: this.cssOverrides
          });
        }
        get cssStyle() {
          if (!this._cssStyle) {
            this._cssStyle = textStyleToCSS(this);
          }
          return this._cssStyle;
        }
        /**
         * Add a style override, this can be any CSS property
         * it will override any built-in style. This is the
         * property and the value as a string (e.g., `color: red`).
         * This will override any other internal style.
         * @param {string} value - CSS style(s) to add.
         * @example
         * style.addOverride('background-color: red');
         */
        addOverride(...value) {
          const toAdd = value.filter((v2) => !this.cssOverrides.includes(v2));
          if (toAdd.length > 0) {
            this.cssOverrides.push(...toAdd);
            this.update();
          }
        }
        /**
         * Remove any overrides that match the value.
         * @param {string} value - CSS style to remove.
         * @example
         * style.removeOverride('background-color: red');
         */
        removeOverride(...value) {
          const toRemove = value.filter((v2) => this.cssOverrides.includes(v2));
          if (toRemove.length > 0) {
            this.cssOverrides = this.cssOverrides.filter((v2) => !toRemove.includes(v2));
            this.update();
          }
        }
        set fill(value) {
          if (typeof value !== "string" && typeof value !== "number") {
            warn("[HTMLTextStyle] only color fill is not supported by HTMLText");
          }
          super.fill = value;
        }
        set stroke(value) {
          if (value && typeof value !== "string" && typeof value !== "number") {
            warn("[HTMLTextStyle] only color stroke is not supported by HTMLText");
          }
          super.stroke = value;
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/extractFontFamilies.mjs
  function extractFontFamilies(text, style) {
    const fontFamily = style.fontFamily;
    const fontFamilies = [];
    const dedupe = {};
    const regex = /font-family:([^;"\s]+)/g;
    const matches = text.match(regex);
    function addFontFamily(fontFamily2) {
      if (!dedupe[fontFamily2]) {
        fontFamilies.push(fontFamily2);
        dedupe[fontFamily2] = true;
      }
    }
    if (Array.isArray(fontFamily)) {
      for (let i2 = 0; i2 < fontFamily.length; i2++) {
        addFontFamily(fontFamily[i2]);
      }
    } else {
      addFontFamily(fontFamily);
    }
    if (matches) {
      matches.forEach((match) => {
        const fontFamily2 = match.split(":")[1].trim();
        addFontFamily(fontFamily2);
      });
    }
    for (const i2 in style.tagStyles) {
      const fontFamily2 = style.tagStyles[i2].fontFamily;
      addFontFamily(fontFamily2);
    }
    return fontFamilies;
  }
  var init_extractFontFamilies = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/extractFontFamilies.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/loadFontAsBase64.mjs
  async function loadFontAsBase64(url) {
    const response = await DOMAdapter.get().fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    const dataSrc = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return dataSrc;
  }
  var init_loadFontAsBase64 = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/loadFontAsBase64.mjs"() {
      init_adapter();
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/loadFontCSS.mjs
  async function loadFontCSS(style, url) {
    const dataSrc = await loadFontAsBase64(url);
    return `@font-face {
        font-family: "${style.fontFamily}";
        src: url('${dataSrc}');
        font-weight: ${style.fontWeight};
        font-style: ${style.fontStyle};
    }`;
  }
  var init_loadFontCSS = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/loadFontCSS.mjs"() {
      init_loadFontAsBase64();
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/getFontCss.mjs
  async function getFontCss(fontFamilies, style, defaultOptions) {
    const fontPromises = fontFamilies.filter((fontFamily) => Cache.has(`${fontFamily}-and-url`)).map((fontFamily, i2) => {
      if (!FontStylePromiseCache.has(fontFamily)) {
        const { url } = Cache.get(`${fontFamily}-and-url`);
        if (i2 === 0) {
          FontStylePromiseCache.set(fontFamily, loadFontCSS({
            fontWeight: style.fontWeight,
            fontStyle: style.fontStyle,
            fontFamily
          }, url));
        } else {
          FontStylePromiseCache.set(fontFamily, loadFontCSS({
            fontWeight: defaultOptions.fontWeight,
            fontStyle: defaultOptions.fontStyle,
            fontFamily
          }, url));
        }
      }
      return FontStylePromiseCache.get(fontFamily);
    });
    return (await Promise.all(fontPromises)).join("\n");
  }
  var FontStylePromiseCache;
  var init_getFontCss = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/getFontCss.mjs"() {
      init_Cache();
      init_loadFontCSS();
      FontStylePromiseCache = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/getSVGUrl.mjs
  function getSVGUrl(text, style, resolution, fontCSS, htmlTextData) {
    const { domElement, styleElement, svgRoot } = htmlTextData;
    domElement.innerHTML = `<style>${style.cssStyle}</style><div style='padding:0;'>${text}</div>`;
    domElement.setAttribute("style", `transform: scale(${resolution});transform-origin: top left; display: inline-block`);
    styleElement.textContent = fontCSS;
    const { width, height } = htmlTextData.image;
    svgRoot.setAttribute("width", width.toString());
    svgRoot.setAttribute("height", height.toString());
    return new XMLSerializer().serializeToString(svgRoot);
  }
  var init_getSVGUrl = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/getSVGUrl.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/getTemporaryCanvasFromImage.mjs
  function getTemporaryCanvasFromImage(image, resolution) {
    const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(
      image.width,
      image.height,
      resolution
    );
    const { context: context2 } = canvasAndContext;
    context2.clearRect(0, 0, image.width, image.height);
    context2.drawImage(image, 0, 0);
    CanvasPool.returnCanvasAndContext(canvasAndContext);
    return canvasAndContext.canvas;
  }
  var init_getTemporaryCanvasFromImage = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/getTemporaryCanvasFromImage.mjs"() {
      init_CanvasPool();
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/loadSVGImage.mjs
  function loadSVGImage(image, url, delay) {
    return new Promise(async (resolve) => {
      if (delay) {
        await new Promise((resolve2) => setTimeout(resolve2, 100));
      }
      image.onload = () => {
        resolve();
      };
      image.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(url)}`;
      image.crossOrigin = "anonymous";
    });
  }
  var init_loadSVGImage = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/loadSVGImage.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/utils/measureHtmlText.mjs
  function measureHtmlText(text, style, fontStyleCSS, htmlTextRenderData) {
    htmlTextRenderData = htmlTextRenderData || tempHTMLTextRenderData || (tempHTMLTextRenderData = new HTMLTextRenderData());
    const { domElement, styleElement, svgRoot } = htmlTextRenderData;
    domElement.innerHTML = `<style>${style.cssStyle};</style><div style='padding:0'>${text}</div>`;
    domElement.setAttribute("style", "transform-origin: top left; display: inline-block");
    if (fontStyleCSS) {
      styleElement.textContent = fontStyleCSS;
    }
    document.body.appendChild(svgRoot);
    const contentBounds = domElement.getBoundingClientRect();
    svgRoot.remove();
    const descenderPadding = CanvasTextMetrics.measureFont(style.fontStyle).descent;
    const doublePadding = style.padding * 2;
    return {
      width: contentBounds.width - doublePadding,
      height: contentBounds.height + descenderPadding - doublePadding
    };
  }
  var tempHTMLTextRenderData;
  var init_measureHtmlText = __esm({
    "node_modules/pixi.js/lib/scene/text-html/utils/measureHtmlText.mjs"() {
      init_CanvasTextMetrics();
      init_HTMLTextRenderData();
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/HTMLTextSystem.mjs
  var HTMLTextSystem;
  var init_HTMLTextSystem = __esm({
    "node_modules/pixi.js/lib/scene/text-html/HTMLTextSystem.mjs"() {
      init_Extensions();
      init_TexturePool();
      init_types2();
      init_isSafari();
      init_warn();
      init_PoolGroup();
      init_getPo2TextureFromSource();
      init_HTMLTextRenderData();
      init_HtmlTextStyle();
      init_extractFontFamilies();
      init_getFontCss();
      init_getSVGUrl();
      init_getTemporaryCanvasFromImage();
      init_loadSVGImage();
      init_measureHtmlText();
      HTMLTextSystem = class {
        constructor(renderer) {
          this._activeTextures = {};
          this._renderer = renderer;
          this._createCanvas = renderer.type === RendererType.WEBGPU;
        }
        getTexture(options) {
          return this._buildTexturePromise(
            options.text,
            options.resolution,
            options.style
          );
        }
        getManagedTexture(text, resolution, style, textKey) {
          if (this._activeTextures[textKey]) {
            this._increaseReferenceCount(textKey);
            return this._activeTextures[textKey].promise;
          }
          const promise2 = this._buildTexturePromise(text, resolution, style).then((texture) => {
            this._activeTextures[textKey].texture = texture;
            return texture;
          });
          this._activeTextures[textKey] = {
            texture: null,
            promise: promise2,
            usageCount: 1
          };
          return promise2;
        }
        async _buildTexturePromise(text, resolution, style) {
          const htmlTextData = BigPool.get(HTMLTextRenderData);
          const fontFamilies = extractFontFamilies(text, style);
          const fontCSS = await getFontCss(
            fontFamilies,
            style,
            HTMLTextStyle.defaultTextStyle
          );
          const measured = measureHtmlText(text, style, fontCSS, htmlTextData);
          const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
          const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
          const image = htmlTextData.image;
          const uvSafeOffset = 2;
          image.width = (width | 0) + uvSafeOffset;
          image.height = (height | 0) + uvSafeOffset;
          const svgURL = getSVGUrl(text, style, resolution, fontCSS, htmlTextData);
          await loadSVGImage(image, svgURL, isSafari() && fontFamilies.length > 0);
          let resource = image;
          if (this._createCanvas) {
            resource = getTemporaryCanvasFromImage(image, resolution);
          }
          const texture = getPo2TextureFromSource(
            resource,
            image.width - uvSafeOffset,
            image.height - uvSafeOffset,
            resolution
          );
          if (this._createCanvas) {
            this._renderer.texture.initSource(texture.source);
          }
          BigPool.return(htmlTextData);
          return texture;
        }
        _increaseReferenceCount(textKey) {
          this._activeTextures[textKey].usageCount++;
        }
        decreaseReferenceCount(textKey) {
          const activeTexture = this._activeTextures[textKey];
          if (!activeTexture)
            return;
          activeTexture.usageCount--;
          if (activeTexture.usageCount === 0) {
            if (activeTexture.texture) {
              this._cleanUp(activeTexture);
            } else {
              activeTexture.promise.then((texture) => {
                activeTexture.texture = texture;
                this._cleanUp(activeTexture);
              }).catch(() => {
                warn("HTMLTextSystem: Failed to clean texture");
              });
            }
            this._activeTextures[textKey] = null;
          }
        }
        _cleanUp(activeTexture) {
          TexturePool.returnTexture(activeTexture.texture);
          activeTexture.texture.source.resource = null;
          activeTexture.texture.source.uploadMethodId = "unknown";
        }
        getReferenceCount(textKey) {
          return this._activeTextures[textKey].usageCount;
        }
        destroy() {
          this._activeTextures = null;
        }
      };
      HTMLTextSystem.extension = {
        type: [
          ExtensionType.WebGLSystem,
          ExtensionType.WebGPUSystem,
          ExtensionType.CanvasSystem
        ],
        name: "htmlText"
      };
      HTMLTextSystem.defaultFontOptions = {
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "normal"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/text-html/init.mjs
  var init_init10 = __esm({
    "node_modules/pixi.js/lib/scene/text-html/init.mjs"() {
      init_Extensions();
      init_HTMLTextPipe();
      init_HTMLTextSystem();
      extensions.add(HTMLTextSystem);
      extensions.add(HTMLTextPipe);
    }
  });

  // node_modules/pixi.js/lib/scene/mesh/shared/MeshGeometry.mjs
  var _MeshGeometry, MeshGeometry;
  var init_MeshGeometry = __esm({
    "node_modules/pixi.js/lib/scene/mesh/shared/MeshGeometry.mjs"() {
      init_Buffer();
      init_const4();
      init_Geometry();
      init_deprecation();
      _MeshGeometry = class _MeshGeometry2 extends Geometry {
        constructor(...args) {
          let options = args[0] ?? {};
          if (options instanceof Float32Array) {
            deprecation(v8_0_0, "use new MeshGeometry({ positions, uvs, indices }) instead");
            options = {
              positions: options,
              uvs: args[1],
              indices: args[2]
            };
          }
          options = { ..._MeshGeometry2.defaultOptions, ...options };
          const positions = options.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
          const uvs = options.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
          const indices = options.indices || new Uint32Array([0, 1, 2, 0, 2, 3]);
          const shrinkToFit = options.shrinkBuffersToFit;
          const positionBuffer = new Buffer2({
            data: positions,
            label: "attribute-mesh-positions",
            shrinkToFit,
            usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
          });
          const uvBuffer = new Buffer2({
            data: uvs,
            label: "attribute-mesh-uvs",
            shrinkToFit,
            usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
          });
          const indexBuffer = new Buffer2({
            data: indices,
            label: "index-mesh-buffer",
            shrinkToFit,
            usage: BufferUsage.INDEX | BufferUsage.COPY_DST
          });
          super({
            attributes: {
              aPosition: {
                buffer: positionBuffer,
                format: "float32x2",
                stride: 2 * 4,
                offset: 0
              },
              aUV: {
                buffer: uvBuffer,
                format: "float32x2",
                stride: 2 * 4,
                offset: 0
              }
            },
            indexBuffer,
            topology: options.topology
          });
          this.batchMode = "auto";
        }
        /** The positions of the mesh. */
        get positions() {
          return this.attributes.aPosition.buffer.data;
        }
        set positions(value) {
          this.attributes.aPosition.buffer.data = value;
        }
        /** The UVs of the mesh. */
        get uvs() {
          return this.attributes.aUV.buffer.data;
        }
        set uvs(value) {
          this.attributes.aUV.buffer.data = value;
        }
        /** The indices of the mesh. */
        get indices() {
          return this.indexBuffer.data;
        }
        set indices(value) {
          this.indexBuffer.data = value;
        }
      };
      _MeshGeometry.defaultOptions = {
        topology: "triangle-list",
        shrinkBuffersToFit: false
      };
      MeshGeometry = _MeshGeometry;
    }
  });

  // node_modules/pixi.js/lib/rendering/high-shader/shader-bits/localUniformBit.mjs
  var localUniformBit, localUniformBitGroup2, localUniformBitGl;
  var init_localUniformBit = __esm({
    "node_modules/pixi.js/lib/rendering/high-shader/shader-bits/localUniformBit.mjs"() {
      "use strict";
      localUniformBit = {
        name: "local-uniform-bit",
        vertex: {
          header: (
            /* wgsl */
            `

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
          ),
          main: (
            /* wgsl */
            `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
          ),
          end: (
            /* wgsl */
            `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
          )
        }
      };
      localUniformBitGroup2 = {
        ...localUniformBit,
        vertex: {
          ...localUniformBit.vertex,
          // replace the group!
          header: localUniformBit.vertex.header.replace("group(1)", "group(2)")
        }
      };
      localUniformBitGl = {
        name: "local-uniform-bit",
        vertex: {
          header: (
            /* glsl */
            `

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
          ),
          main: (
            /* glsl */
            `
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `
          ),
          end: (
            /* glsl */
            `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/shader/tilingBit.mjs
  var tilingBit, tilingBitGl;
  var init_tilingBit = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/shader/tilingBit.mjs"() {
      "use strict";
      tilingBit = {
        name: "tiling-bit",
        vertex: {
          header: (
            /* wgsl */
            `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
          ),
          main: (
            /* wgsl */
            `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
          )
        },
        fragment: {
          header: (
            /* wgsl */
            `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
          ),
          main: (
            /* wgsl */
            `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
          )
        }
      };
      tilingBitGl = {
        name: "tiling-bit",
        vertex: {
          header: (
            /* glsl */
            `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
          ),
          main: (
            /* glsl */
            `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
          )
        },
        fragment: {
          header: (
            /* glsl */
            `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
          ),
          main: (
            /* glsl */
            `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
          )
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/shader/TilingSpriteShader.mjs
  var gpuProgram2, glProgram2, TilingSpriteShader;
  var init_TilingSpriteShader = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/shader/TilingSpriteShader.mjs"() {
      init_Matrix();
      init_compileHighShaderToProgram();
      init_localUniformBit();
      init_roundPixelsBit();
      init_Shader();
      init_UniformGroup();
      init_Texture();
      init_tilingBit();
      TilingSpriteShader = class extends Shader {
        constructor() {
          gpuProgram2 ?? (gpuProgram2 = compileHighShaderGpuProgram({
            name: "tiling-sprite-shader",
            bits: [
              localUniformBit,
              tilingBit,
              roundPixelsBit
            ]
          }));
          glProgram2 ?? (glProgram2 = compileHighShaderGlProgram({
            name: "tiling-sprite-shader",
            bits: [
              localUniformBitGl,
              tilingBitGl,
              roundPixelsBitGl
            ]
          }));
          const tilingUniforms = new UniformGroup({
            uMapCoord: { value: new Matrix(), type: "mat3x3<f32>" },
            uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
            uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
            uTextureTransform: { value: new Matrix(), type: "mat3x3<f32>" },
            uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
          });
          super({
            glProgram: glProgram2,
            gpuProgram: gpuProgram2,
            resources: {
              localUniforms: new UniformGroup({
                uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
                uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
                uRound: { value: 0, type: "f32" }
              }),
              tilingUniforms,
              uTexture: Texture.EMPTY.source,
              uSampler: Texture.EMPTY.source.style
            }
          });
        }
        updateUniforms(width, height, matrix, anchorX, anchorY, texture) {
          const tilingUniforms = this.resources.tilingUniforms;
          const textureWidth = texture.width;
          const textureHeight = texture.height;
          const textureMatrix = texture.textureMatrix;
          const uTextureTransform = tilingUniforms.uniforms.uTextureTransform;
          uTextureTransform.set(
            matrix.a * textureWidth / width,
            matrix.b * textureWidth / height,
            matrix.c * textureHeight / width,
            matrix.d * textureHeight / height,
            matrix.tx / width,
            matrix.ty / height
          );
          uTextureTransform.invert();
          tilingUniforms.uniforms.uMapCoord = textureMatrix.mapCoord;
          tilingUniforms.uniforms.uClampFrame = textureMatrix.uClampFrame;
          tilingUniforms.uniforms.uClampOffset = textureMatrix.uClampOffset;
          tilingUniforms.uniforms.uTextureTransform = uTextureTransform;
          tilingUniforms.uniforms.uSizeAnchor[0] = width;
          tilingUniforms.uniforms.uSizeAnchor[1] = height;
          tilingUniforms.uniforms.uSizeAnchor[2] = anchorX;
          tilingUniforms.uniforms.uSizeAnchor[3] = anchorY;
          if (texture) {
            this.resources.uTexture = texture.source;
            this.resources.uSampler = texture.source.style;
          }
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/utils/QuadGeometry.mjs
  var QuadGeometry;
  var init_QuadGeometry = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/utils/QuadGeometry.mjs"() {
      init_MeshGeometry();
      QuadGeometry = class extends MeshGeometry {
        constructor() {
          super({
            positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            indices: new Uint32Array([0, 1, 2, 0, 2, 3])
          });
        }
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/utils/setPositions.mjs
  function setPositions(tilingSprite, positions) {
    const anchorX = tilingSprite.anchor.x;
    const anchorY = tilingSprite.anchor.y;
    positions[0] = -anchorX * tilingSprite.width;
    positions[1] = -anchorY * tilingSprite.height;
    positions[2] = (1 - anchorX) * tilingSprite.width;
    positions[3] = -anchorY * tilingSprite.height;
    positions[4] = (1 - anchorX) * tilingSprite.width;
    positions[5] = (1 - anchorY) * tilingSprite.height;
    positions[6] = -anchorX * tilingSprite.width;
    positions[7] = (1 - anchorY) * tilingSprite.height;
  }
  var init_setPositions = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/utils/setPositions.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/utils/applyMatrix.mjs
  function applyMatrix(array, stride, offset, matrix) {
    let index = 0;
    const size = array.length / (stride || 2);
    const a2 = matrix.a;
    const b2 = matrix.b;
    const c2 = matrix.c;
    const d2 = matrix.d;
    const tx = matrix.tx;
    const ty = matrix.ty;
    offset *= stride;
    while (index < size) {
      const x2 = array[offset];
      const y2 = array[offset + 1];
      array[offset] = a2 * x2 + c2 * y2 + tx;
      array[offset + 1] = b2 * x2 + d2 * y2 + ty;
      offset += stride;
      index++;
    }
  }
  var init_applyMatrix = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/utils/applyMatrix.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/utils/setUvs.mjs
  function setUvs(tilingSprite, uvs) {
    const texture = tilingSprite.texture;
    const width = texture.frame.width;
    const height = texture.frame.height;
    let anchorX = 0;
    let anchorY = 0;
    if (tilingSprite._applyAnchorToTexture) {
      anchorX = tilingSprite.anchor.x;
      anchorY = tilingSprite.anchor.y;
    }
    uvs[0] = uvs[6] = -anchorX;
    uvs[2] = uvs[4] = 1 - anchorX;
    uvs[1] = uvs[3] = -anchorY;
    uvs[5] = uvs[7] = 1 - anchorY;
    const textureMatrix = Matrix.shared;
    textureMatrix.copyFrom(tilingSprite._tileTransform.matrix);
    textureMatrix.tx /= tilingSprite.width;
    textureMatrix.ty /= tilingSprite.height;
    textureMatrix.invert();
    textureMatrix.scale(tilingSprite.width / width, tilingSprite.height / height);
    applyMatrix(uvs, 2, 0, textureMatrix);
  }
  var init_setUvs = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/utils/setUvs.mjs"() {
      init_Matrix();
      init_applyMatrix();
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/TilingSpritePipe.mjs
  var sharedQuad, TilingSpritePipe;
  var init_TilingSpritePipe = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/TilingSpritePipe.mjs"() {
      init_Extensions();
      init_getAdjustedBlendModeBlend();
      init_State();
      init_types2();
      init_colorToUniform();
      init_BatchableMesh();
      init_MeshGeometry();
      init_TilingSpriteShader();
      init_QuadGeometry();
      init_setPositions();
      init_setUvs();
      sharedQuad = new QuadGeometry();
      TilingSpritePipe = class {
        constructor(renderer) {
          this._state = State.default2d;
          this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null);
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this._renderer = renderer;
        }
        validateRenderable(renderable) {
          const tilingSpriteData = this._getTilingSpriteData(renderable);
          const couldBatch = tilingSpriteData.canBatch;
          this._updateCanBatch(renderable);
          const canBatch = tilingSpriteData.canBatch;
          if (canBatch && canBatch === couldBatch) {
            const { batchableMesh } = tilingSpriteData;
            if (batchableMesh && batchableMesh.texture._source !== renderable.texture._source) {
              return !batchableMesh._batcher.checkAndUpdateTexture(batchableMesh, renderable.texture);
            }
          }
          return couldBatch !== canBatch;
        }
        addRenderable(tilingSprite, instructionSet) {
          const batcher = this._renderer.renderPipes.batch;
          this._updateCanBatch(tilingSprite);
          const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
          const { geometry, canBatch } = tilingSpriteData;
          if (canBatch) {
            tilingSpriteData.batchableMesh || (tilingSpriteData.batchableMesh = new BatchableMesh());
            const batchableMesh = tilingSpriteData.batchableMesh;
            if (tilingSprite._didTilingSpriteUpdate) {
              tilingSprite._didTilingSpriteUpdate = false;
              this._updateBatchableMesh(tilingSprite);
              batchableMesh.geometry = geometry;
              batchableMesh.renderable = tilingSprite;
              batchableMesh.transform = tilingSprite.groupTransform;
              batchableMesh.texture = tilingSprite._texture;
            }
            batchableMesh.roundPixels = this._renderer._roundPixels | tilingSprite._roundPixels;
            batcher.addToBatch(batchableMesh, instructionSet);
          } else {
            batcher.break(instructionSet);
            tilingSpriteData.shader || (tilingSpriteData.shader = new TilingSpriteShader());
            this.updateRenderable(tilingSprite);
            instructionSet.add(tilingSprite);
          }
        }
        execute(tilingSprite) {
          const { shader } = this._tilingSpriteDataHash[tilingSprite.uid];
          shader.groups[0] = this._renderer.globalUniforms.bindGroup;
          const localUniforms = shader.resources.localUniforms.uniforms;
          localUniforms.uTransformMatrix = tilingSprite.groupTransform;
          localUniforms.uRound = this._renderer._roundPixels | tilingSprite._roundPixels;
          color32BitToUniform(
            tilingSprite.groupColorAlpha,
            localUniforms.uColor,
            0
          );
          this._state.blendMode = getAdjustedBlendModeBlend(tilingSprite.groupBlendMode, tilingSprite.texture._source);
          this._renderer.encoder.draw({
            geometry: sharedQuad,
            shader,
            state: this._state
          });
        }
        updateRenderable(tilingSprite) {
          const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
          const { canBatch } = tilingSpriteData;
          if (canBatch) {
            const { batchableMesh } = tilingSpriteData;
            if (tilingSprite._didTilingSpriteUpdate)
              this._updateBatchableMesh(tilingSprite);
            batchableMesh._batcher.updateElement(batchableMesh);
          } else if (tilingSprite._didTilingSpriteUpdate) {
            const { shader } = tilingSpriteData;
            shader.updateUniforms(
              tilingSprite.width,
              tilingSprite.height,
              tilingSprite._tileTransform.matrix,
              tilingSprite.anchor.x,
              tilingSprite.anchor.y,
              tilingSprite.texture
            );
          }
          tilingSprite._didTilingSpriteUpdate = false;
        }
        destroyRenderable(tilingSprite) {
          const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
          tilingSpriteData.batchableMesh = null;
          tilingSpriteData.shader?.destroy();
          this._tilingSpriteDataHash[tilingSprite.uid] = null;
          tilingSprite.off("destroyed", this._destroyRenderableBound);
        }
        _getTilingSpriteData(renderable) {
          return this._tilingSpriteDataHash[renderable.uid] || this._initTilingSpriteData(renderable);
        }
        _initTilingSpriteData(tilingSprite) {
          const geometry = new MeshGeometry({
            indices: sharedQuad.indices,
            positions: sharedQuad.positions.slice(),
            uvs: sharedQuad.uvs.slice()
          });
          this._tilingSpriteDataHash[tilingSprite.uid] = {
            canBatch: true,
            renderable: tilingSprite,
            geometry
          };
          tilingSprite.on("destroyed", this._destroyRenderableBound);
          return this._tilingSpriteDataHash[tilingSprite.uid];
        }
        _updateBatchableMesh(tilingSprite) {
          const renderableData = this._getTilingSpriteData(tilingSprite);
          const { geometry } = renderableData;
          const style = tilingSprite.texture.source.style;
          if (style.addressMode !== "repeat") {
            style.addressMode = "repeat";
            style.update();
          }
          setUvs(tilingSprite, geometry.uvs);
          setPositions(tilingSprite, geometry.positions);
        }
        destroy() {
          for (const i2 in this._tilingSpriteDataHash) {
            this.destroyRenderable(this._tilingSpriteDataHash[i2].renderable);
          }
          this._tilingSpriteDataHash = null;
          this._renderer = null;
        }
        _updateCanBatch(tilingSprite) {
          const renderableData = this._getTilingSpriteData(tilingSprite);
          const texture = tilingSprite.texture;
          let _nonPowOf2wrapping = true;
          if (this._renderer.type === RendererType.WEBGL) {
            _nonPowOf2wrapping = this._renderer.context.supports.nonPowOf2wrapping;
          }
          renderableData.canBatch = texture.textureMatrix.isSimple && (_nonPowOf2wrapping || texture.source.isPowerOfTwo);
          return renderableData.canBatch;
        }
      };
      TilingSpritePipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "tilingSprite"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-tiling/init.mjs
  var init_init11 = __esm({
    "node_modules/pixi.js/lib/scene/sprite-tiling/init.mjs"() {
      init_Extensions();
      init_TilingSpritePipe();
      extensions.add(TilingSpritePipe);
    }
  });

  // node_modules/pixi.js/lib/scene/mesh-plane/PlaneGeometry.mjs
  var _PlaneGeometry, PlaneGeometry;
  var init_PlaneGeometry = __esm({
    "node_modules/pixi.js/lib/scene/mesh-plane/PlaneGeometry.mjs"() {
      init_deprecation();
      init_MeshGeometry();
      _PlaneGeometry = class _PlaneGeometry2 extends MeshGeometry {
        constructor(...args) {
          super({});
          let options = args[0] ?? {};
          if (typeof options === "number") {
            deprecation(v8_0_0, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead");
            options = {
              width: options,
              height: args[1],
              verticesX: args[2],
              verticesY: args[3]
            };
          }
          this.build(options);
        }
        /**
         * Refreshes plane coordinates
         * @param options - Options to be applied to plane geometry
         */
        build(options) {
          options = { ..._PlaneGeometry2.defaultOptions, ...options };
          this.verticesX = this.verticesX ?? options.verticesX;
          this.verticesY = this.verticesY ?? options.verticesY;
          this.width = this.width ?? options.width;
          this.height = this.height ?? options.height;
          const total = this.verticesX * this.verticesY;
          const verts = [];
          const uvs = [];
          const indices = [];
          const verticesX = this.verticesX - 1;
          const verticesY = this.verticesY - 1;
          const sizeX = this.width / verticesX;
          const sizeY = this.height / verticesY;
          for (let i2 = 0; i2 < total; i2++) {
            const x2 = i2 % this.verticesX;
            const y2 = i2 / this.verticesX | 0;
            verts.push(x2 * sizeX, y2 * sizeY);
            uvs.push(x2 / verticesX, y2 / verticesY);
          }
          const totalSub = verticesX * verticesY;
          for (let i2 = 0; i2 < totalSub; i2++) {
            const xpos = i2 % verticesX;
            const ypos = i2 / verticesX | 0;
            const value = ypos * this.verticesX + xpos;
            const value2 = ypos * this.verticesX + xpos + 1;
            const value3 = (ypos + 1) * this.verticesX + xpos;
            const value4 = (ypos + 1) * this.verticesX + xpos + 1;
            indices.push(
              value,
              value2,
              value3,
              value2,
              value4,
              value3
            );
          }
          this.buffers[0].data = new Float32Array(verts);
          this.buffers[1].data = new Float32Array(uvs);
          this.indexBuffer.data = new Uint32Array(indices);
          this.buffers[0].update();
          this.buffers[1].update();
          this.indexBuffer.update();
        }
      };
      _PlaneGeometry.defaultOptions = {
        width: 100,
        height: 100,
        verticesX: 10,
        verticesY: 10
      };
      PlaneGeometry = _PlaneGeometry;
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceGeometry.mjs
  var _NineSliceGeometry, NineSliceGeometry;
  var init_NineSliceGeometry = __esm({
    "node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceGeometry.mjs"() {
      init_PlaneGeometry();
      _NineSliceGeometry = class _NineSliceGeometry2 extends PlaneGeometry {
        constructor(options = {}) {
          options = { ..._NineSliceGeometry2.defaultOptions, ...options };
          super({
            width: options.width,
            height: options.height,
            verticesX: 4,
            verticesY: 4
          });
          this.update(options);
        }
        /**
         * Updates the NineSliceGeometry with the options.
         * @param options - The options of the NineSliceGeometry.
         */
        update(options) {
          this.width = options.width ?? this.width;
          this.height = options.height ?? this.height;
          this._originalWidth = options.originalWidth ?? this._originalWidth;
          this._originalHeight = options.originalHeight ?? this._originalHeight;
          this._leftWidth = options.leftWidth ?? this._leftWidth;
          this._rightWidth = options.rightWidth ?? this._rightWidth;
          this._topHeight = options.topHeight ?? this._topHeight;
          this._bottomHeight = options.bottomHeight ?? this._bottomHeight;
          this.updateUvs();
          this.updatePositions();
        }
        /** Updates the positions of the vertices. */
        updatePositions() {
          const positions = this.positions;
          const w2 = this._leftWidth + this._rightWidth;
          const scaleW = this.width > w2 ? 1 : this.width / w2;
          const h2 = this._topHeight + this._bottomHeight;
          const scaleH = this.height > h2 ? 1 : this.height / h2;
          const scale = Math.min(scaleW, scaleH);
          positions[9] = positions[11] = positions[13] = positions[15] = this._topHeight * scale;
          positions[17] = positions[19] = positions[21] = positions[23] = this.height - this._bottomHeight * scale;
          positions[25] = positions[27] = positions[29] = positions[31] = this.height;
          positions[2] = positions[10] = positions[18] = positions[26] = this._leftWidth * scale;
          positions[4] = positions[12] = positions[20] = positions[28] = this.width - this._rightWidth * scale;
          positions[6] = positions[14] = positions[22] = positions[30] = this.width;
          this.getBuffer("aPosition").update();
        }
        /** Updates the UVs of the vertices. */
        updateUvs() {
          const uvs = this.uvs;
          uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
          uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
          uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
          uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
          const _uvw = 1 / this._originalWidth;
          const _uvh = 1 / this._originalHeight;
          uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
          uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
          uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
          uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
          this.getBuffer("aUV").update();
        }
      };
      _NineSliceGeometry.defaultOptions = {
        /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
        width: 100,
        /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
        height: 100,
        /** The width of the left column. */
        leftWidth: 10,
        /** The height of the top row. */
        topHeight: 10,
        /** The width of the right column. */
        rightWidth: 10,
        /** The height of the bottom row. */
        bottomHeight: 10,
        /** The original width of the texture */
        originalWidth: 100,
        /** The original height of the texture */
        originalHeight: 100
      };
      NineSliceGeometry = _NineSliceGeometry;
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceSpritePipe.mjs
  var NineSliceSpritePipe;
  var init_NineSliceSpritePipe = __esm({
    "node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceSpritePipe.mjs"() {
      init_Extensions();
      init_PoolGroup();
      init_BatchableMesh();
      init_NineSliceGeometry();
      NineSliceSpritePipe = class {
        constructor(renderer) {
          this._gpuSpriteHash = /* @__PURE__ */ Object.create(null);
          this._destroyRenderableBound = this.destroyRenderable.bind(this);
          this._renderer = renderer;
        }
        addRenderable(sprite, instructionSet) {
          const gpuSprite = this._getGpuSprite(sprite);
          if (sprite._didSpriteUpdate)
            this._updateBatchableSprite(sprite, gpuSprite);
          this._renderer.renderPipes.batch.addToBatch(gpuSprite, instructionSet);
        }
        updateRenderable(sprite) {
          const gpuSprite = this._gpuSpriteHash[sprite.uid];
          if (sprite._didSpriteUpdate)
            this._updateBatchableSprite(sprite, gpuSprite);
          gpuSprite._batcher.updateElement(gpuSprite);
        }
        validateRenderable(sprite) {
          const texture = sprite._texture;
          const gpuSprite = this._getGpuSprite(sprite);
          if (gpuSprite.texture._source !== texture._source) {
            return !gpuSprite._batcher.checkAndUpdateTexture(gpuSprite, texture);
          }
          return false;
        }
        destroyRenderable(sprite) {
          const batchableMesh = this._gpuSpriteHash[sprite.uid];
          BigPool.return(batchableMesh.geometry);
          BigPool.return(batchableMesh);
          this._gpuSpriteHash[sprite.uid] = null;
          sprite.off("destroyed", this._destroyRenderableBound);
        }
        _updateBatchableSprite(sprite, batchableSprite) {
          sprite._didSpriteUpdate = false;
          batchableSprite.geometry.update(sprite);
          batchableSprite.texture = sprite._texture;
        }
        _getGpuSprite(sprite) {
          return this._gpuSpriteHash[sprite.uid] || this._initGPUSprite(sprite);
        }
        _initGPUSprite(sprite) {
          const batchableMesh = BigPool.get(BatchableMesh);
          batchableMesh.geometry = BigPool.get(NineSliceGeometry);
          batchableMesh.renderable = sprite;
          batchableMesh.transform = sprite.groupTransform;
          batchableMesh.texture = sprite._texture;
          batchableMesh.roundPixels = this._renderer._roundPixels | sprite._roundPixels;
          sprite._didSpriteUpdate = true;
          this._gpuSpriteHash[sprite.uid] = batchableMesh;
          sprite.on("destroyed", this._destroyRenderableBound);
          return batchableMesh;
        }
        destroy() {
          for (const i2 in this._gpuSpriteHash) {
            const batchableMesh = this._gpuSpriteHash[i2];
            batchableMesh.geometry.destroy();
          }
          this._gpuSpriteHash = null;
          this._renderer = null;
        }
      };
      NineSliceSpritePipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "nineSliceSprite"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/sprite-nine-slice/init.mjs
  var init_init12 = __esm({
    "node_modules/pixi.js/lib/scene/sprite-nine-slice/init.mjs"() {
      init_Extensions();
      init_NineSliceSpritePipe();
      extensions.add(NineSliceSpritePipe);
    }
  });

  // node_modules/pixi.js/lib/filters/FilterPipe.mjs
  var FilterPipe;
  var init_FilterPipe = __esm({
    "node_modules/pixi.js/lib/filters/FilterPipe.mjs"() {
      init_Extensions();
      FilterPipe = class {
        constructor(renderer) {
          this._renderer = renderer;
        }
        push(filterEffect, container, instructionSet) {
          const renderPipes = this._renderer.renderPipes;
          renderPipes.batch.break(instructionSet);
          instructionSet.add({
            renderPipeId: "filter",
            canBundle: false,
            action: "pushFilter",
            container,
            filterEffect
          });
        }
        pop(_filterEffect, _container, instructionSet) {
          this._renderer.renderPipes.batch.break(instructionSet);
          instructionSet.add({
            renderPipeId: "filter",
            action: "popFilter",
            canBundle: false
          });
        }
        execute(instruction) {
          if (instruction.action === "pushFilter") {
            this._renderer.filter.push(instruction);
          } else if (instruction.action === "popFilter") {
            this._renderer.filter.pop();
          }
        }
        destroy() {
          this._renderer = null;
        }
      };
      FilterPipe.extension = {
        type: [
          ExtensionType.WebGLPipes,
          ExtensionType.WebGPUPipes,
          ExtensionType.CanvasPipes
        ],
        name: "filter"
      };
    }
  });

  // node_modules/pixi.js/lib/scene/container/bounds/getFastGlobalBounds.mjs
  function getFastGlobalBounds(target, bounds) {
    bounds.clear();
    _getGlobalBoundsRecursive(target, bounds);
    if (!bounds.isValid) {
      bounds.set(0, 0, 0, 0);
    }
    if (!target.renderGroup) {
      bounds.applyMatrix(target.parentRenderGroup.worldTransform);
    } else {
      bounds.applyMatrix(target.renderGroup.localTransform);
    }
    return bounds;
  }
  function _getGlobalBoundsRecursive(target, bounds) {
    if (target.localDisplayStatus !== 7 || !target.measurable) {
      return;
    }
    const manageEffects = !!target.effects.length;
    let localBounds = bounds;
    if (target.renderGroup || manageEffects) {
      localBounds = boundsPool.get().clear();
    }
    if (target.boundsArea) {
      bounds.addRect(target.boundsArea, target.worldTransform);
    } else {
      if (target.renderPipeId) {
        const viewBounds = target.bounds;
        localBounds.addFrame(
          viewBounds.minX,
          viewBounds.minY,
          viewBounds.maxX,
          viewBounds.maxY,
          target.groupTransform
        );
      }
      const children = target.children;
      for (let i2 = 0; i2 < children.length; i2++) {
        _getGlobalBoundsRecursive(children[i2], localBounds);
      }
    }
    if (manageEffects) {
      let advanced = false;
      for (let i2 = 0; i2 < target.effects.length; i2++) {
        if (target.effects[i2].addBounds) {
          if (!advanced) {
            advanced = true;
            localBounds.applyMatrix(target.parentRenderGroup.worldTransform);
          }
          target.effects[i2].addBounds(localBounds, true);
        }
      }
      if (advanced) {
        localBounds.applyMatrix(target.parentRenderGroup.worldTransform.copyTo(tempMatrix4).invert());
        bounds.addBounds(localBounds, target.relativeGroupTransform);
      }
      bounds.addBounds(localBounds);
      boundsPool.return(localBounds);
    } else if (target.renderGroup) {
      bounds.addBounds(localBounds, target.relativeGroupTransform);
      boundsPool.return(localBounds);
    }
  }
  var tempMatrix4;
  var init_getFastGlobalBounds = __esm({
    "node_modules/pixi.js/lib/scene/container/bounds/getFastGlobalBounds.mjs"() {
      init_Matrix();
      init_matrixAndBoundsPool();
      tempMatrix4 = new Matrix();
    }
  });

  // node_modules/pixi.js/lib/scene/container/bounds/getRenderableBounds.mjs
  function getGlobalRenderableBounds(renderables, bounds) {
    bounds.clear();
    const tempMatrix5 = bounds.matrix;
    for (let i2 = 0; i2 < renderables.length; i2++) {
      const renderable = renderables[i2];
      if (renderable.globalDisplayStatus < 7) {
        continue;
      }
      bounds.matrix = renderable.worldTransform;
      renderable.addBounds(bounds);
    }
    bounds.matrix = tempMatrix5;
    return bounds;
  }
  var init_getRenderableBounds = __esm({
    "node_modules/pixi.js/lib/scene/container/bounds/getRenderableBounds.mjs"() {
      "use strict";
    }
  });

  // node_modules/pixi.js/lib/filters/FilterSystem.mjs
  var quadGeometry, FilterSystem;
  var init_FilterSystem = __esm({
    "node_modules/pixi.js/lib/filters/FilterSystem.mjs"() {
      init_Extensions();
      init_Matrix();
      init_Point();
      init_BindGroup();
      init_Geometry();
      init_UniformGroup();
      init_Texture();
      init_TexturePool();
      init_types2();
      init_Bounds();
      init_getFastGlobalBounds();
      init_getRenderableBounds();
      init_warn();
      quadGeometry = new Geometry({
        attributes: {
          aPosition: {
            buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            format: "float32x2",
            stride: 2 * 4,
            offset: 0
          }
        },
        indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
      });
      FilterSystem = class {
        constructor(renderer) {
          this._filterStackIndex = 0;
          this._filterStack = [];
          this._filterGlobalUniforms = new UniformGroup({
            uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
            uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
            uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
            uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
            uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
            uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
          });
          this._globalFilterBindGroup = new BindGroup({});
          this.renderer = renderer;
        }
        /**
         * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
         * @readonly
         */
        get activeBackTexture() {
          return this._activeFilterData?.backTexture;
        }
        push(instruction) {
          const renderer = this.renderer;
          const filters = instruction.filterEffect.filters;
          if (!this._filterStack[this._filterStackIndex]) {
            this._filterStack[this._filterStackIndex] = this._getFilterData();
          }
          const filterData = this._filterStack[this._filterStackIndex];
          this._filterStackIndex++;
          if (filters.length === 0) {
            filterData.skip = true;
            return;
          }
          const bounds = filterData.bounds;
          if (instruction.renderables) {
            getGlobalRenderableBounds(instruction.renderables, bounds);
          } else if (instruction.filterEffect.filterArea) {
            bounds.clear();
            bounds.addRect(instruction.filterEffect.filterArea);
            bounds.applyMatrix(instruction.container.worldTransform);
          } else {
            getFastGlobalBounds(instruction.container, bounds);
          }
          const colorTextureSource = renderer.renderTarget.renderTarget.colorTexture.source;
          let resolution = Infinity;
          let padding = 0;
          let antialias = true;
          let blendRequired = false;
          let enabled = false;
          for (let i2 = 0; i2 < filters.length; i2++) {
            const filter = filters[i2];
            resolution = Math.min(resolution, filter.resolution === "inherit" ? colorTextureSource._resolution : filter.resolution);
            padding += filter.padding;
            if (filter.antialias === "off") {
              antialias = false;
            } else if (filter.antialias === "inherit") {
              antialias && (antialias = colorTextureSource.antialias);
            }
            const isCompatible = !!(filter.compatibleRenderers & renderer.type);
            if (!isCompatible) {
              enabled = false;
              break;
            }
            if (filter.blendRequired && !(renderer.backBuffer?.useBackBuffer ?? true)) {
              warn("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options.");
              enabled = false;
              break;
            }
            enabled = filter.enabled || enabled;
            blendRequired = blendRequired || filter.blendRequired;
          }
          if (!enabled) {
            filterData.skip = true;
            return;
          }
          const viewPort = renderer.renderTarget.rootViewPort;
          bounds.scale(resolution).fitBounds(0, viewPort.width, 0, viewPort.height).ceil().scale(1 / resolution).pad(padding | 0);
          if (!bounds.isPositive) {
            filterData.skip = true;
            return;
          }
          filterData.skip = false;
          filterData.bounds = bounds;
          filterData.blendRequired = blendRequired;
          filterData.container = instruction.container;
          filterData.filterEffect = instruction.filterEffect;
          filterData.previousRenderSurface = renderer.renderTarget.renderSurface;
          filterData.inputTexture = TexturePool.getOptimalTexture(
            bounds.width,
            bounds.height,
            resolution,
            antialias
          );
          renderer.renderTarget.bind(filterData.inputTexture, true);
          renderer.globalUniforms.push({
            offset: bounds
          });
        }
        pop() {
          const renderer = this.renderer;
          this._filterStackIndex--;
          const filterData = this._filterStack[this._filterStackIndex];
          if (filterData.skip) {
            return;
          }
          this._activeFilterData = filterData;
          const inputTexture = filterData.inputTexture;
          const bounds = filterData.bounds;
          let backTexture = Texture.EMPTY;
          renderer.renderTarget.finishRenderPass();
          if (filterData.blendRequired) {
            const previousBounds = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null;
            const renderTarget = renderer.renderTarget.getRenderTarget(filterData.previousRenderSurface);
            backTexture = this.getBackTexture(renderTarget, bounds, previousBounds);
          }
          filterData.backTexture = backTexture;
          const filters = filterData.filterEffect.filters;
          this._globalFilterBindGroup.setResource(inputTexture.source.style, 2);
          this._globalFilterBindGroup.setResource(backTexture.source, 3);
          renderer.globalUniforms.pop();
          if (filters.length === 1) {
            filters[0].apply(this, inputTexture, filterData.previousRenderSurface, false);
            TexturePool.returnTexture(inputTexture);
          } else {
            let flip = filterData.inputTexture;
            let flop = TexturePool.getOptimalTexture(
              bounds.width,
              bounds.height,
              flip.source._resolution,
              false
            );
            let i2 = 0;
            for (i2 = 0; i2 < filters.length - 1; ++i2) {
              const filter = filters[i2];
              filter.apply(this, flip, flop, true);
              const t2 = flip;
              flip = flop;
              flop = t2;
            }
            filters[i2].apply(this, flip, filterData.previousRenderSurface, false);
            TexturePool.returnTexture(flip);
            TexturePool.returnTexture(flop);
          }
          if (filterData.blendRequired) {
            TexturePool.returnTexture(backTexture);
          }
        }
        getBackTexture(lastRenderSurface, bounds, previousBounds) {
          const backgroundResolution = lastRenderSurface.colorTexture.source._resolution;
          const backTexture = TexturePool.getOptimalTexture(
            bounds.width,
            bounds.height,
            backgroundResolution,
            false
          );
          let x2 = bounds.minX;
          let y2 = bounds.minY;
          if (previousBounds) {
            x2 -= previousBounds.minX;
            y2 -= previousBounds.minY;
          }
          x2 = Math.floor(x2 * backgroundResolution);
          y2 = Math.floor(y2 * backgroundResolution);
          const width = Math.ceil(bounds.width * backgroundResolution);
          const height = Math.ceil(bounds.height * backgroundResolution);
          this.renderer.renderTarget.copyToTexture(
            lastRenderSurface,
            backTexture,
            { x: x2, y: y2 },
            { width, height },
            { x: 0, y: 0 }
          );
          return backTexture;
        }
        applyFilter(filter, input, output, clear) {
          const renderer = this.renderer;
          const filterData = this._filterStack[this._filterStackIndex];
          const bounds = filterData.bounds;
          const offset = Point.shared;
          const previousRenderSurface = filterData.previousRenderSurface;
          const isFinalTarget = previousRenderSurface === output;
          let resolution = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;
          let currentIndex = this._filterStackIndex - 1;
          while (currentIndex > 0 && this._filterStack[currentIndex].skip) {
            --currentIndex;
          }
          if (currentIndex > 0) {
            resolution = this._filterStack[currentIndex].inputTexture.source._resolution;
          }
          const filterUniforms = this._filterGlobalUniforms;
          const uniforms = filterUniforms.uniforms;
          const outputFrame = uniforms.uOutputFrame;
          const inputSize = uniforms.uInputSize;
          const inputPixel = uniforms.uInputPixel;
          const inputClamp = uniforms.uInputClamp;
          const globalFrame = uniforms.uGlobalFrame;
          const outputTexture = uniforms.uOutputTexture;
          if (isFinalTarget) {
            let lastIndex = this._filterStackIndex;
            while (lastIndex > 0) {
              lastIndex--;
              const filterData2 = this._filterStack[this._filterStackIndex - 1];
              if (!filterData2.skip) {
                offset.x = filterData2.bounds.minX;
                offset.y = filterData2.bounds.minY;
                break;
              }
            }
            outputFrame[0] = bounds.minX - offset.x;
            outputFrame[1] = bounds.minY - offset.y;
          } else {
            outputFrame[0] = 0;
            outputFrame[1] = 0;
          }
          outputFrame[2] = input.frame.width;
          outputFrame[3] = input.frame.height;
          inputSize[0] = input.source.width;
          inputSize[1] = input.source.height;
          inputSize[2] = 1 / inputSize[0];
          inputSize[3] = 1 / inputSize[1];
          inputPixel[0] = input.source.pixelWidth;
          inputPixel[1] = input.source.pixelHeight;
          inputPixel[2] = 1 / inputPixel[0];
          inputPixel[3] = 1 / inputPixel[1];
          inputClamp[0] = 0.5 * inputPixel[2];
          inputClamp[1] = 0.5 * inputPixel[3];
          inputClamp[2] = input.frame.width * inputSize[2] - 0.5 * inputPixel[2];
          inputClamp[3] = input.frame.height * inputSize[3] - 0.5 * inputPixel[3];
          const rootTexture = this.renderer.renderTarget.rootRenderTarget.colorTexture;
          globalFrame[0] = offset.x * resolution;
          globalFrame[1] = offset.y * resolution;
          globalFrame[2] = rootTexture.source.width * resolution;
          globalFrame[3] = rootTexture.source.height * resolution;
          const renderTarget = this.renderer.renderTarget.getRenderTarget(output);
          renderer.renderTarget.bind(output, !!clear);
          if (output instanceof Texture) {
            outputTexture[0] = output.frame.width;
            outputTexture[1] = output.frame.height;
          } else {
            outputTexture[0] = renderTarget.width;
            outputTexture[1] = renderTarget.height;
          }
          outputTexture[2] = renderTarget.isRoot ? -1 : 1;
          filterUniforms.update();
          if (renderer.renderPipes.uniformBatch) {
            const batchUniforms = renderer.renderPipes.uniformBatch.getUboResource(filterUniforms);
            this._globalFilterBindGroup.setResource(batchUniforms, 0);
          } else {
            this._globalFilterBindGroup.setResource(filterUniforms, 0);
          }
          this._globalFilterBindGroup.setResource(input.source, 1);
          this._globalFilterBindGroup.setResource(input.source.style, 2);
          filter.groups[0] = this._globalFilterBindGroup;
          renderer.encoder.draw({
            geometry: quadGeometry,
            shader: filter,
            state: filter._state,
            topology: "triangle-list"
          });
          if (renderer.type === RendererType.WEBGL) {
            renderer.renderTarget.finishRenderPass();
          }
        }
        _getFilterData() {
          return {
            skip: false,
            inputTexture: null,
            bounds: new Bounds(),
            container: null,
            filterEffect: null,
            blendRequired: false,
            previousRenderSurface: null
          };
        }
        /**
         * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
         *
         * Use `outputMatrix * vTextureCoord` in the shader.
         * @param outputMatrix - The matrix to output to.
         * @param {Sprite} sprite - The sprite to map to.
         * @returns The mapped matrix.
         */
        calculateSpriteMatrix(outputMatrix, sprite) {
          const data = this._activeFilterData;
          const mappedMatrix = outputMatrix.set(
            data.inputTexture._source.width,
            0,
            0,
            data.inputTexture._source.height,
            data.bounds.minX,
            data.bounds.minY
          );
          const worldTransform = sprite.worldTransform.copyTo(Matrix.shared);
          worldTransform.invert();
          mappedMatrix.prepend(worldTransform);
          mappedMatrix.scale(
            1 / sprite.texture.frame.width,
            1 / sprite.texture.frame.height
          );
          mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
          return mappedMatrix;
        }
      };
      FilterSystem.extension = {
        type: [
          ExtensionType.WebGLSystem,
          ExtensionType.WebGPUSystem
        ],
        name: "filter"
      };
    }
  });

  // node_modules/pixi.js/lib/filters/init.mjs
  var init_init13 = __esm({
    "node_modules/pixi.js/lib/filters/init.mjs"() {
      init_Extensions();
      init_FilterPipe();
      init_FilterSystem();
      extensions.add(FilterSystem);
      extensions.add(FilterPipe);
    }
  });

  // node_modules/pixi.js/lib/environment-browser/browserAll.mjs
  var browserAll_exports = {};
  var init_browserAll = __esm({
    "node_modules/pixi.js/lib/environment-browser/browserAll.mjs"() {
      init_init();
      init_init2();
      init_init3();
      init_init4();
      init_init5();
      init_init6();
      init_init7();
      init_init8();
      init_init9();
      init_init10();
      init_init11();
      init_init12();
      init_init13();
    }
  });

  // node_modules/pixi.js/lib/environment-webworker/webworkerAll.mjs
  var webworkerAll_exports = {};
  var init_webworkerAll = __esm({
    "node_modules/pixi.js/lib/environment-webworker/webworkerAll.mjs"() {
      init_init2();
      init_init4();
      init_init5();
      init_init6();
      init_init7();
      init_init8();
      init_init9();
      init_init10();
      init_init11();
      init_init12();
      init_init13();
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    DashLine: () => DashLine
  });

  // node_modules/pixi.js/lib/environment-browser/browserExt.mjs
  init_Extensions();
  var browserExt = {
    extension: {
      type: ExtensionType.Environment,
      name: "browser",
      priority: -1
    },
    test: () => true,
    load: async () => {
      await Promise.resolve().then(() => (init_browserAll(), browserAll_exports));
    }
  };

  // node_modules/pixi.js/lib/environment-webworker/webworkerExt.mjs
  init_Extensions();
  var webworkerExt = {
    extension: {
      type: ExtensionType.Environment,
      name: "webworker",
      priority: 0
    },
    test: () => typeof self !== "undefined" && self.WorkerGlobalScope !== void 0,
    load: async () => {
      await Promise.resolve().then(() => (init_webworkerAll(), webworkerAll_exports));
    }
  };

  // node_modules/pixi.js/lib/index.mjs
  init_Extensions();
  init_init5();
  init_init4();
  init_Matrix();
  init_Point();
  init_Texture();
  init_textureFrom();
  init_eventemitter3();
  var import_earcut2 = __toESM(require_earcut(), 1);
  extensions.add(browserExt, webworkerExt);

  // src/index.ts
  var dashLineOptionsDefault = {
    dash: [10, 5],
    width: 1,
    color: 16777215,
    alpha: 1,
    scale: 1,
    useTexture: false,
    alignment: 0.5
  };
  var _DashLine = class _DashLine {
    /**
     * Create a DashLine
     * @param graphics
     * @param [options]
     * @param [options.useTexture=false] - use the texture based render (useful for very large or very small dashed lines)
     * @param [options.dash=[10,5] - an array holding the dash and gap (eg, [10, 5, 20, 5, ...])
     * @param [options.width=1] - width of the dashed line
     * @param [options.alpha=1] - alpha of the dashed line
     * @param [options.color=0xffffff] - color of the dashed line
     * @param [options.cap] - add a LINE_CAP style to dashed lines (only works for useTexture: false)
     * @param [options.join] - add a LINE_JOIN style to the dashed lines (only works for useTexture: false)
     * @param [options.alignment] - The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner)
     */
    constructor(graphics, options = {}) {
      /** cursor location */
      this.cursor = new Point();
      /** desired scale of line */
      this.scale = 1;
      this.graphics = graphics;
      options = { ...dashLineOptionsDefault, ...options };
      this.dash = options.dash;
      this.dashSize = this.dash.reduce((a2, b2) => a2 + b2);
      this.useTexture = options.useTexture;
      this.options = options;
      this.setStrokeStyle();
    }
    stroke() {
      this.graphics.stroke();
    }
    beginPath() {
      this.graphics.beginPath();
    }
    /** resets line style to enable dashed line (useful if lineStyle was changed on graphics element) */
    setStrokeStyle() {
      const options = this.options;
      if (this.useTexture) {
        const texture = _DashLine.getTexture(options, this.dashSize);
        this.graphics.stroke({
          width: options.width * options.scale,
          color: options.color,
          alpha: options.alpha,
          texture,
          alignment: options.alignment
        });
        this.activeTexture = texture;
      } else {
        this.graphics.stroke({
          width: options.width * options.scale,
          color: options.color,
          alpha: options.alpha,
          cap: options.cap,
          join: options.join,
          alignment: options.alignment
        });
      }
      this.scale = options.scale;
    }
    static distance(x0, y0, x1, y1) {
      return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    }
    moveTo(x2, y2) {
      this.lineLength = 0;
      this.cursor.set(x2, y2);
      this.start = new Point(x2, y2);
      this.graphics.moveTo(this.cursor.x, this.cursor.y);
      return this;
    }
    lineTo(x2, y2, closePath) {
      if (typeof this.lineLength === void 0) {
        this.moveTo(0, 0);
      }
      let [x0, y0] = [this.cursor.x, this.cursor.y];
      const length = _DashLine.distance(x0, y0, x2, y2);
      if (length < 1) return this;
      const angle = Math.atan2(y2 - y0, x2 - x0);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const closed = closePath && x2 === this.start.x && y2 === this.start.y;
      if (this.useTexture) {
        this.graphics.moveTo(x0, y0);
        this.adjustLineStyle(angle);
        if (closed && this.dash.length % 2 === 0) {
          const gap = Math.min(this.dash[this.dash.length - 1], length);
          this.graphics.lineTo(x2 - cos * gap, y2 - sin * gap);
          this.graphics.closePath();
        } else {
          this.graphics.lineTo(x2, y2);
        }
      } else {
        const origin = this.lineLength % (this.dashSize * this.scale);
        let dashIndex = 0;
        let dashStart = 0;
        let dashX = 0;
        for (let i2 = 0; i2 < this.dash.length; i2++) {
          const dashSize = this.dash[i2] * this.scale;
          if (origin < dashX + dashSize) {
            dashIndex = i2;
            dashStart = origin - dashX;
            break;
          } else {
            dashX += dashSize;
          }
        }
        let remaining = length;
        while (remaining > 1) {
          const dashSize = this.dash[dashIndex] * this.scale - dashStart;
          let dist = remaining > dashSize ? dashSize : remaining;
          if (closed) {
            const remainingDistance = _DashLine.distance(x0 + cos * dist, y0 + sin * dist, this.start.x, this.start.y);
            if (remainingDistance <= dist) {
              if (dashIndex % 2 === 0) {
                const lastDash = _DashLine.distance(x0, y0, this.start.x, this.start.y) - this.dash[this.dash.length - 1] * this.scale;
                x0 += cos * lastDash;
                y0 += sin * lastDash;
                this.graphics.lineTo(x0, y0);
                this.lineLength += lastDash;
                this.cursor.set(x0, y0);
              }
              break;
            }
          }
          x0 += cos * dist;
          y0 += sin * dist;
          if (dashIndex % 2) {
            this.graphics.moveTo(x0, y0);
          } else {
            this.graphics.lineTo(x0, y0);
          }
          this.lineLength += dist;
          this.cursor.set(x0, y0);
          remaining -= dist;
          dashIndex++;
          dashIndex = dashIndex === this.dash.length ? 0 : dashIndex;
          dashStart = 0;
        }
        this.setStrokeStyle();
      }
      return this;
    }
    closePath() {
      this.lineTo(this.start.x, this.start.y, true);
    }
    circle(x2, y2, radius, points = 80, matrix) {
      const interval = Math.PI * 2 / points;
      let angle = 0;
      let first = new Point(x2 + Math.cos(angle) * radius, y2 + Math.sin(angle) * radius);
      if (matrix) {
        matrix.apply(first, first);
        this.moveTo(first[0], first[1]);
      } else {
        this.moveTo(first.x, first.y);
      }
      angle += interval;
      for (let i2 = 1; i2 < points + 1; i2++) {
        const next = i2 === points ? [first.x, first.y] : [x2 + Math.cos(angle) * radius, y2 + Math.sin(angle) * radius];
        this.lineTo(next[0], next[1]);
        angle += interval;
      }
      return this;
    }
    ellipse(x2, y2, radiusX, radiusY, points = 80, matrix) {
      const interval = Math.PI * 2 / points;
      let first;
      const point = new Point();
      let f2 = 0;
      for (let i2 = 0; i2 < Math.PI * 2; i2 += interval) {
        let x0 = x2 - radiusX * Math.sin(i2);
        let y0 = y2 - radiusY * Math.cos(i2);
        if (matrix) {
          point.set(x0, y0);
          matrix.apply(point, point);
          x0 = point.x;
          y0 = point.y;
        }
        if (i2 === 0) {
          this.moveTo(x0, y0);
          first = { x: x0, y: y0 };
        } else {
          this.lineTo(x0, y0);
        }
      }
      this.lineTo(first.x, first.y, true);
      return this;
    }
    polygon(points, matrix) {
      const p2 = new Point();
      if (typeof points[0] === "number") {
        if (matrix) {
          p2.set(points[0], points[1]);
          matrix.apply(p2, p2);
          this.moveTo(p2.x, p2.y);
          for (let i2 = 2; i2 < points.length; i2 += 2) {
            p2.set(points[i2], points[i2 + 1]);
            matrix.apply(p2, p2);
            this.lineTo(p2.x, p2.y, i2 === points.length - 2);
          }
        } else {
          this.moveTo(points[0], points[1]);
          for (let i2 = 2; i2 < points.length; i2 += 2) {
            this.lineTo(points[i2], points[i2 + 1], i2 === points.length - 2);
          }
        }
      } else {
        if (matrix) {
          const point = points[0];
          p2.copyFrom(point);
          matrix.apply(p2, p2);
          this.moveTo(p2.x, p2.y);
          for (let i2 = 1; i2 < points.length; i2++) {
            const point2 = points[i2];
            p2.copyFrom(point2);
            matrix.apply(p2, p2);
            this.lineTo(p2.x, p2.y, i2 === points.length - 1);
          }
        } else {
          const point = points[0];
          this.moveTo(point.x, point.y);
          for (let i2 = 1; i2 < points.length; i2++) {
            const point2 = points[i2];
            this.lineTo(point2.x, point2.y, i2 === points.length - 1);
          }
        }
      }
      return this;
    }
    rect(x2, y2, width, height, matrix) {
      if (matrix) {
        const p2 = new Point();
        p2.set(x2, y2);
        matrix.apply(p2, p2);
        this.moveTo(p2.x, p2.y);
        p2.set(x2 + width, y2);
        matrix.apply(p2, p2);
        this.lineTo(p2.x, p2.y);
        p2.set(x2 + width, y2 + height);
        matrix.apply(p2, p2);
        this.lineTo(p2.x, p2.y);
        p2.set(x2, y2 + height);
        matrix.apply(p2, p2);
        this.lineTo(p2.x, p2.y);
        p2.set(x2, y2);
        matrix.apply(p2, p2);
        this.lineTo(p2.x, p2.y, true);
      } else {
        this.moveTo(x2, y2).lineTo(x2 + width, y2).lineTo(x2 + width, y2 + height).lineTo(x2, y2 + height).lineTo(x2, y2, true);
      }
      return this;
    }
    // adjust the matrix for the dashed texture
    adjustLineStyle(angle) {
      const lineStyle = this.graphics.strokeStyle;
      lineStyle.matrix = new Matrix();
      if (angle) {
        lineStyle.matrix.rotate(angle);
      }
      if (this.scale !== 1) lineStyle.matrix.scale(this.scale, this.scale);
      const textureStart = -this.lineLength;
      lineStyle.matrix.translate(
        this.cursor.x + textureStart * Math.cos(angle),
        this.cursor.y + textureStart * Math.sin(angle)
      );
      this.graphics.stroke(lineStyle);
    }
    // creates or uses cached texture
    static getTexture(options, dashSize) {
      const key = options.dash.toString();
      if (_DashLine.dashTextureCache[key]) {
        return _DashLine.dashTextureCache[key];
      }
      const canvas = document.createElement("canvas");
      canvas.width = dashSize;
      canvas.height = Math.ceil(options.width);
      const context2 = canvas.getContext("2d");
      if (!context2) {
        console.warn("Did not get context from canvas");
        return null;
      }
      context2.strokeStyle = "white";
      context2.globalAlpha = options.alpha;
      context2.lineWidth = options.width;
      let x2 = 0;
      const y2 = options.width / 2;
      context2.moveTo(x2, y2);
      for (let i2 = 0; i2 < options.dash.length; i2 += 2) {
        x2 += options.dash[i2];
        context2.lineTo(x2, y2);
        if (options.dash.length !== i2 + 1) {
          x2 += options.dash[i2 + 1];
          context2.moveTo(x2, y2);
        }
      }
      context2.stroke();
      const texture = _DashLine.dashTextureCache[key] = Texture.from(canvas);
      texture.source.scaleMode = "nearest";
      return texture;
    }
  };
  // cache of Textures for dashed lines
  _DashLine.dashTextureCache = {};
  var DashLine = _DashLine;
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=pixi-dashed-line.iife.js.map
