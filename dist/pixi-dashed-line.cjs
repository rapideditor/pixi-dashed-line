"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
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
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
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
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context2) {
      return addListener(this, event, fn, context2, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context2) {
      return addListener(this, event, fn, context2, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context2, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
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
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context2 && listeners[i].context !== context2) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/earcut/src/earcut.js
var require_earcut = __commonJS({
  "node_modules/earcut/src/earcut.js"(exports, module2) {
    "use strict";
    module2.exports = earcut;
    module2.exports.default = earcut;
    function earcut(data, holeIndices, dim) {
      dim = dim || 2;
      var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, true), triangles = [];
      if (!outerNode || outerNode.next === outerNode.prev)
        return triangles;
      var minX, minY, maxX, maxY, x, y, invSize;
      if (hasHoles)
        outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
      if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];
        for (var i = dim; i < outerLen; i += dim) {
          x = data[i];
          y = data[i + 1];
          if (x < minX)
            minX = x;
          if (y < minY)
            minY = y;
          if (x > maxX)
            maxX = x;
          if (y > maxY)
            maxY = y;
        }
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 32767 / invSize : 0;
      }
      earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
      return triangles;
    }
    function linkedList(data, start, end, dim, clockwise) {
      var i, last;
      if (clockwise === signedArea(data, start, end, dim) > 0) {
        for (i = start; i < end; i += dim)
          last = insertNode(i, data[i], data[i + 1], last);
      } else {
        for (i = end - dim; i >= start; i -= dim)
          last = insertNode(i, data[i], data[i + 1], last);
      }
      if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
      }
      return last;
    }
    function filterPoints(start, end) {
      if (!start)
        return start;
      if (!end)
        end = start;
      var p = start, again;
      do {
        again = false;
        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
          removeNode(p);
          p = end = p.prev;
          if (p === p.next)
            break;
          again = true;
        } else {
          p = p.next;
        }
      } while (again || p !== end);
      return end;
    }
    function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
      if (!ear)
        return;
      if (!pass && invSize)
        indexCurve(ear, minX, minY, invSize);
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
      var a = ear.prev, b = ear, c = ear.next;
      if (area(a, b, c) >= 0)
        return false;
      var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
      var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
      var p = c.next;
      while (p !== a) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
          return false;
        p = p.next;
      }
      return true;
    }
    function isEarHashed(ear, minX, minY, invSize) {
      var a = ear.prev, b = ear, c = ear.next;
      if (area(a, b, c) >= 0)
        return false;
      var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
      var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
      var minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
      var p = ear.prevZ, n = ear.nextZ;
      while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
          return false;
        p = p.prevZ;
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
          return false;
        n = n.nextZ;
      }
      while (p && p.z >= minZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
          return false;
        p = p.prevZ;
      }
      while (n && n.z <= maxZ) {
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
          return false;
        n = n.nextZ;
      }
      return true;
    }
    function cureLocalIntersections(start, triangles, dim) {
      var p = start;
      do {
        var a = p.prev, b = p.next.next;
        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
          triangles.push(a.i / dim | 0);
          triangles.push(p.i / dim | 0);
          triangles.push(b.i / dim | 0);
          removeNode(p);
          removeNode(p.next);
          p = start = b;
        }
        p = p.next;
      } while (p !== start);
      return filterPoints(p);
    }
    function splitEarcut(start, triangles, dim, minX, minY, invSize) {
      var a = start;
      do {
        var b = a.next.next;
        while (b !== a.prev) {
          if (a.i !== b.i && isValidDiagonal(a, b)) {
            var c = splitPolygon(a, b);
            a = filterPoints(a, a.next);
            c = filterPoints(c, c.next);
            earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
            earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
            return;
          }
          b = b.next;
        }
        a = a.next;
      } while (a !== start);
    }
    function eliminateHoles(data, holeIndices, outerNode, dim) {
      var queue = [], i, len, start, end, list;
      for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next)
          list.steiner = true;
        queue.push(getLeftmost(list));
      }
      queue.sort(compareX);
      for (i = 0; i < queue.length; i++) {
        outerNode = eliminateHole(queue[i], outerNode);
      }
      return outerNode;
    }
    function compareX(a, b) {
      return a.x - b.x;
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
      var p = outerNode, hx = hole.x, hy = hole.y, qx = -Infinity, m;
      do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
          var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
          if (x <= hx && x > qx) {
            qx = x;
            m = p.x < p.next.x ? p : p.next;
            if (x === hx)
              return m;
          }
        }
        p = p.next;
      } while (p !== outerNode);
      if (!m)
        return null;
      var stop = m, mx = m.x, my = m.y, tanMin = Infinity, tan2;
      p = m;
      do {
        if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
          tan2 = Math.abs(hy - p.y) / (hx - p.x);
          if (locallyInside(p, hole) && (tan2 < tanMin || tan2 === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
            m = p;
            tanMin = tan2;
          }
        }
        p = p.next;
      } while (p !== stop);
      return m;
    }
    function sectorContainsSector(m, p) {
      return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
    }
    function indexCurve(start, minX, minY, invSize) {
      var p = start;
      do {
        if (p.z === 0)
          p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
      } while (p !== start);
      p.prevZ.nextZ = null;
      p.prevZ = null;
      sortLinked(p);
    }
    function sortLinked(list) {
      var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
      do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;
        while (p) {
          numMerges++;
          q = p;
          pSize = 0;
          for (i = 0; i < inSize; i++) {
            pSize++;
            q = q.nextZ;
            if (!q)
              break;
          }
          qSize = inSize;
          while (pSize > 0 || qSize > 0 && q) {
            if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
              e = p;
              p = p.nextZ;
              pSize--;
            } else {
              e = q;
              q = q.nextZ;
              qSize--;
            }
            if (tail)
              tail.nextZ = e;
            else
              list = e;
            e.prevZ = tail;
            tail = e;
          }
          p = q;
        }
        tail.nextZ = null;
        inSize *= 2;
      } while (numMerges > 1);
      return list;
    }
    function zOrder(x, y, minX, minY, invSize) {
      x = (x - minX) * invSize | 0;
      y = (y - minY) * invSize | 0;
      x = (x | x << 8) & 16711935;
      x = (x | x << 4) & 252645135;
      x = (x | x << 2) & 858993459;
      x = (x | x << 1) & 1431655765;
      y = (y | y << 8) & 16711935;
      y = (y | y << 4) & 252645135;
      y = (y | y << 2) & 858993459;
      y = (y | y << 1) & 1431655765;
      return x | y << 1;
    }
    function getLeftmost(start) {
      var p = start, leftmost = start;
      do {
        if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y)
          leftmost = p;
        p = p.next;
      } while (p !== start);
      return leftmost;
    }
    function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
      return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
    }
    function isValidDiagonal(a, b) {
      return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && (area(a.prev, a, b.prev) || area(a, b.prev, b)) || equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
    }
    function area(p, q, r) {
      return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    }
    function equals(p1, p2) {
      return p1.x === p2.x && p1.y === p2.y;
    }
    function intersects(p1, q1, p2, q2) {
      var o1 = sign2(area(p1, q1, p2));
      var o2 = sign2(area(p1, q1, q2));
      var o3 = sign2(area(p2, q2, p1));
      var o4 = sign2(area(p2, q2, q1));
      if (o1 !== o2 && o3 !== o4)
        return true;
      if (o1 === 0 && onSegment(p1, p2, q1))
        return true;
      if (o2 === 0 && onSegment(p1, q2, q1))
        return true;
      if (o3 === 0 && onSegment(p2, p1, q2))
        return true;
      if (o4 === 0 && onSegment(p2, q1, q2))
        return true;
      return false;
    }
    function onSegment(p, q, r) {
      return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
    }
    function sign2(num) {
      return num > 0 ? 1 : num < 0 ? -1 : 0;
    }
    function intersectsPolygon(a, b) {
      var p = a;
      do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b))
          return true;
        p = p.next;
      } while (p !== a);
      return false;
    }
    function locallyInside(a, b) {
      return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
    }
    function middleInside(a, b) {
      var p = a, inside = false, px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
      do {
        if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x)
          inside = !inside;
        p = p.next;
      } while (p !== a);
      return inside;
    }
    function splitPolygon(a, b) {
      var a2 = new Node(a.i, a.x, a.y), b2 = new Node(b.i, b.x, b.y), an = a.next, bp = b.prev;
      a.next = b;
      b.prev = a;
      a2.next = an;
      an.prev = a2;
      b2.next = a2;
      a2.prev = b2;
      bp.next = b2;
      b2.prev = bp;
      return b2;
    }
    function insertNode(i, x, y, last) {
      var p = new Node(i, x, y);
      if (!last) {
        p.prev = p;
        p.next = p;
      } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
      }
      return p;
    }
    function removeNode(p) {
      p.next.prev = p.prev;
      p.prev.next = p.next;
      if (p.prevZ)
        p.prevZ.nextZ = p.nextZ;
      if (p.nextZ)
        p.nextZ.prevZ = p.prevZ;
    }
    function Node(i, x, y) {
      this.i = i;
      this.x = x;
      this.y = y;
      this.prev = null;
      this.next = null;
      this.z = 0;
      this.prevZ = null;
      this.nextZ = null;
      this.steiner = false;
    }
    earcut.deviation = function(data, holeIndices, dim, triangles) {
      var hasHoles = holeIndices && holeIndices.length;
      var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
      var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
      if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
          var start = holeIndices[i] * dim;
          var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
          polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
      }
      var trianglesArea = 0;
      for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
          (data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1])
        );
      }
      return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
    };
    function signedArea(data, start, end, dim) {
      var sum = 0;
      for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
      }
      return sum;
    }
    earcut.flatten = function(data) {
      var dim = data[0][0].length, result = { vertices: [], holes: [], dimensions: dim }, holeIndex = 0;
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          for (var d = 0; d < dim; d++)
            result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
          holeIndex += data[i - 1].length;
          result.holes.push(holeIndex);
        }
      }
      return result;
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DashLine: () => DashLine
});
module.exports = __toCommonJS(src_exports);

// node_modules/@pixi/constants/lib/index.mjs
var ENV = /* @__PURE__ */ ((ENV2) => {
  ENV2[ENV2["WEBGL_LEGACY"] = 0] = "WEBGL_LEGACY";
  ENV2[ENV2["WEBGL"] = 1] = "WEBGL";
  ENV2[ENV2["WEBGL2"] = 2] = "WEBGL2";
  return ENV2;
})(ENV || {});
var BUFFER_BITS = /* @__PURE__ */ ((BUFFER_BITS2) => {
  BUFFER_BITS2[BUFFER_BITS2["COLOR"] = 16384] = "COLOR";
  BUFFER_BITS2[BUFFER_BITS2["DEPTH"] = 256] = "DEPTH";
  BUFFER_BITS2[BUFFER_BITS2["STENCIL"] = 1024] = "STENCIL";
  return BUFFER_BITS2;
})(BUFFER_BITS || {});
var BLEND_MODES = /* @__PURE__ */ ((BLEND_MODES2) => {
  BLEND_MODES2[BLEND_MODES2["NORMAL"] = 0] = "NORMAL";
  BLEND_MODES2[BLEND_MODES2["ADD"] = 1] = "ADD";
  BLEND_MODES2[BLEND_MODES2["MULTIPLY"] = 2] = "MULTIPLY";
  BLEND_MODES2[BLEND_MODES2["SCREEN"] = 3] = "SCREEN";
  BLEND_MODES2[BLEND_MODES2["OVERLAY"] = 4] = "OVERLAY";
  BLEND_MODES2[BLEND_MODES2["DARKEN"] = 5] = "DARKEN";
  BLEND_MODES2[BLEND_MODES2["LIGHTEN"] = 6] = "LIGHTEN";
  BLEND_MODES2[BLEND_MODES2["COLOR_DODGE"] = 7] = "COLOR_DODGE";
  BLEND_MODES2[BLEND_MODES2["COLOR_BURN"] = 8] = "COLOR_BURN";
  BLEND_MODES2[BLEND_MODES2["HARD_LIGHT"] = 9] = "HARD_LIGHT";
  BLEND_MODES2[BLEND_MODES2["SOFT_LIGHT"] = 10] = "SOFT_LIGHT";
  BLEND_MODES2[BLEND_MODES2["DIFFERENCE"] = 11] = "DIFFERENCE";
  BLEND_MODES2[BLEND_MODES2["EXCLUSION"] = 12] = "EXCLUSION";
  BLEND_MODES2[BLEND_MODES2["HUE"] = 13] = "HUE";
  BLEND_MODES2[BLEND_MODES2["SATURATION"] = 14] = "SATURATION";
  BLEND_MODES2[BLEND_MODES2["COLOR"] = 15] = "COLOR";
  BLEND_MODES2[BLEND_MODES2["LUMINOSITY"] = 16] = "LUMINOSITY";
  BLEND_MODES2[BLEND_MODES2["NORMAL_NPM"] = 17] = "NORMAL_NPM";
  BLEND_MODES2[BLEND_MODES2["ADD_NPM"] = 18] = "ADD_NPM";
  BLEND_MODES2[BLEND_MODES2["SCREEN_NPM"] = 19] = "SCREEN_NPM";
  BLEND_MODES2[BLEND_MODES2["NONE"] = 20] = "NONE";
  BLEND_MODES2[BLEND_MODES2["SRC_OVER"] = 0] = "SRC_OVER";
  BLEND_MODES2[BLEND_MODES2["SRC_IN"] = 21] = "SRC_IN";
  BLEND_MODES2[BLEND_MODES2["SRC_OUT"] = 22] = "SRC_OUT";
  BLEND_MODES2[BLEND_MODES2["SRC_ATOP"] = 23] = "SRC_ATOP";
  BLEND_MODES2[BLEND_MODES2["DST_OVER"] = 24] = "DST_OVER";
  BLEND_MODES2[BLEND_MODES2["DST_IN"] = 25] = "DST_IN";
  BLEND_MODES2[BLEND_MODES2["DST_OUT"] = 26] = "DST_OUT";
  BLEND_MODES2[BLEND_MODES2["DST_ATOP"] = 27] = "DST_ATOP";
  BLEND_MODES2[BLEND_MODES2["ERASE"] = 26] = "ERASE";
  BLEND_MODES2[BLEND_MODES2["SUBTRACT"] = 28] = "SUBTRACT";
  BLEND_MODES2[BLEND_MODES2["XOR"] = 29] = "XOR";
  return BLEND_MODES2;
})(BLEND_MODES || {});
var DRAW_MODES = /* @__PURE__ */ ((DRAW_MODES2) => {
  DRAW_MODES2[DRAW_MODES2["POINTS"] = 0] = "POINTS";
  DRAW_MODES2[DRAW_MODES2["LINES"] = 1] = "LINES";
  DRAW_MODES2[DRAW_MODES2["LINE_LOOP"] = 2] = "LINE_LOOP";
  DRAW_MODES2[DRAW_MODES2["LINE_STRIP"] = 3] = "LINE_STRIP";
  DRAW_MODES2[DRAW_MODES2["TRIANGLES"] = 4] = "TRIANGLES";
  DRAW_MODES2[DRAW_MODES2["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
  DRAW_MODES2[DRAW_MODES2["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
  return DRAW_MODES2;
})(DRAW_MODES || {});
var FORMATS = /* @__PURE__ */ ((FORMATS2) => {
  FORMATS2[FORMATS2["RGBA"] = 6408] = "RGBA";
  FORMATS2[FORMATS2["RGB"] = 6407] = "RGB";
  FORMATS2[FORMATS2["RG"] = 33319] = "RG";
  FORMATS2[FORMATS2["RED"] = 6403] = "RED";
  FORMATS2[FORMATS2["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
  FORMATS2[FORMATS2["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
  FORMATS2[FORMATS2["RG_INTEGER"] = 33320] = "RG_INTEGER";
  FORMATS2[FORMATS2["RED_INTEGER"] = 36244] = "RED_INTEGER";
  FORMATS2[FORMATS2["ALPHA"] = 6406] = "ALPHA";
  FORMATS2[FORMATS2["LUMINANCE"] = 6409] = "LUMINANCE";
  FORMATS2[FORMATS2["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
  FORMATS2[FORMATS2["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
  FORMATS2[FORMATS2["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
  return FORMATS2;
})(FORMATS || {});
var TARGETS = /* @__PURE__ */ ((TARGETS2) => {
  TARGETS2[TARGETS2["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
  TARGETS2[TARGETS2["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
  return TARGETS2;
})(TARGETS || {});
var TYPES = /* @__PURE__ */ ((TYPES2) => {
  TYPES2[TYPES2["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  TYPES2[TYPES2["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  TYPES2[TYPES2["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
  TYPES2[TYPES2["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
  TYPES2[TYPES2["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
  TYPES2[TYPES2["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
  TYPES2[TYPES2["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
  TYPES2[TYPES2["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
  TYPES2[TYPES2["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
  TYPES2[TYPES2["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
  TYPES2[TYPES2["BYTE"] = 5120] = "BYTE";
  TYPES2[TYPES2["SHORT"] = 5122] = "SHORT";
  TYPES2[TYPES2["INT"] = 5124] = "INT";
  TYPES2[TYPES2["FLOAT"] = 5126] = "FLOAT";
  TYPES2[TYPES2["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
  TYPES2[TYPES2["HALF_FLOAT"] = 36193] = "HALF_FLOAT";
  return TYPES2;
})(TYPES || {});
var SAMPLER_TYPES = /* @__PURE__ */ ((SAMPLER_TYPES2) => {
  SAMPLER_TYPES2[SAMPLER_TYPES2["FLOAT"] = 0] = "FLOAT";
  SAMPLER_TYPES2[SAMPLER_TYPES2["INT"] = 1] = "INT";
  SAMPLER_TYPES2[SAMPLER_TYPES2["UINT"] = 2] = "UINT";
  return SAMPLER_TYPES2;
})(SAMPLER_TYPES || {});
var SCALE_MODES = /* @__PURE__ */ ((SCALE_MODES2) => {
  SCALE_MODES2[SCALE_MODES2["NEAREST"] = 0] = "NEAREST";
  SCALE_MODES2[SCALE_MODES2["LINEAR"] = 1] = "LINEAR";
  return SCALE_MODES2;
})(SCALE_MODES || {});
var WRAP_MODES = /* @__PURE__ */ ((WRAP_MODES2) => {
  WRAP_MODES2[WRAP_MODES2["CLAMP"] = 33071] = "CLAMP";
  WRAP_MODES2[WRAP_MODES2["REPEAT"] = 10497] = "REPEAT";
  WRAP_MODES2[WRAP_MODES2["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
  return WRAP_MODES2;
})(WRAP_MODES || {});
var MIPMAP_MODES = /* @__PURE__ */ ((MIPMAP_MODES2) => {
  MIPMAP_MODES2[MIPMAP_MODES2["OFF"] = 0] = "OFF";
  MIPMAP_MODES2[MIPMAP_MODES2["POW2"] = 1] = "POW2";
  MIPMAP_MODES2[MIPMAP_MODES2["ON"] = 2] = "ON";
  MIPMAP_MODES2[MIPMAP_MODES2["ON_MANUAL"] = 3] = "ON_MANUAL";
  return MIPMAP_MODES2;
})(MIPMAP_MODES || {});
var ALPHA_MODES = /* @__PURE__ */ ((ALPHA_MODES2) => {
  ALPHA_MODES2[ALPHA_MODES2["NPM"] = 0] = "NPM";
  ALPHA_MODES2[ALPHA_MODES2["UNPACK"] = 1] = "UNPACK";
  ALPHA_MODES2[ALPHA_MODES2["PMA"] = 2] = "PMA";
  ALPHA_MODES2[ALPHA_MODES2["NO_PREMULTIPLIED_ALPHA"] = 0] = "NO_PREMULTIPLIED_ALPHA";
  ALPHA_MODES2[ALPHA_MODES2["PREMULTIPLY_ON_UPLOAD"] = 1] = "PREMULTIPLY_ON_UPLOAD";
  ALPHA_MODES2[ALPHA_MODES2["PREMULTIPLIED_ALPHA"] = 2] = "PREMULTIPLIED_ALPHA";
  return ALPHA_MODES2;
})(ALPHA_MODES || {});
var CLEAR_MODES = /* @__PURE__ */ ((CLEAR_MODES2) => {
  CLEAR_MODES2[CLEAR_MODES2["NO"] = 0] = "NO";
  CLEAR_MODES2[CLEAR_MODES2["YES"] = 1] = "YES";
  CLEAR_MODES2[CLEAR_MODES2["AUTO"] = 2] = "AUTO";
  CLEAR_MODES2[CLEAR_MODES2["BLEND"] = 0] = "BLEND";
  CLEAR_MODES2[CLEAR_MODES2["CLEAR"] = 1] = "CLEAR";
  CLEAR_MODES2[CLEAR_MODES2["BLIT"] = 2] = "BLIT";
  return CLEAR_MODES2;
})(CLEAR_MODES || {});
var GC_MODES = /* @__PURE__ */ ((GC_MODES2) => {
  GC_MODES2[GC_MODES2["AUTO"] = 0] = "AUTO";
  GC_MODES2[GC_MODES2["MANUAL"] = 1] = "MANUAL";
  return GC_MODES2;
})(GC_MODES || {});
var PRECISION = /* @__PURE__ */ ((PRECISION2) => {
  PRECISION2["LOW"] = "lowp";
  PRECISION2["MEDIUM"] = "mediump";
  PRECISION2["HIGH"] = "highp";
  return PRECISION2;
})(PRECISION || {});
var MASK_TYPES = /* @__PURE__ */ ((MASK_TYPES2) => {
  MASK_TYPES2[MASK_TYPES2["NONE"] = 0] = "NONE";
  MASK_TYPES2[MASK_TYPES2["SCISSOR"] = 1] = "SCISSOR";
  MASK_TYPES2[MASK_TYPES2["STENCIL"] = 2] = "STENCIL";
  MASK_TYPES2[MASK_TYPES2["SPRITE"] = 3] = "SPRITE";
  MASK_TYPES2[MASK_TYPES2["COLOR"] = 4] = "COLOR";
  return MASK_TYPES2;
})(MASK_TYPES || {});
var MSAA_QUALITY = /* @__PURE__ */ ((MSAA_QUALITY2) => {
  MSAA_QUALITY2[MSAA_QUALITY2["NONE"] = 0] = "NONE";
  MSAA_QUALITY2[MSAA_QUALITY2["LOW"] = 2] = "LOW";
  MSAA_QUALITY2[MSAA_QUALITY2["MEDIUM"] = 4] = "MEDIUM";
  MSAA_QUALITY2[MSAA_QUALITY2["HIGH"] = 8] = "HIGH";
  return MSAA_QUALITY2;
})(MSAA_QUALITY || {});
var BUFFER_TYPE = /* @__PURE__ */ ((BUFFER_TYPE2) => {
  BUFFER_TYPE2[BUFFER_TYPE2["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
  BUFFER_TYPE2[BUFFER_TYPE2["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
  BUFFER_TYPE2[BUFFER_TYPE2["UNIFORM_BUFFER"] = 35345] = "UNIFORM_BUFFER";
  return BUFFER_TYPE2;
})(BUFFER_TYPE || {});

// node_modules/@pixi/settings/lib/adapter.mjs
var BrowserAdapter = {
  createCanvas: (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  },
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (url2, options) => fetch(url2, options)
};

// node_modules/@pixi/settings/lib/node_modules/ismobilejs/esm/isMobile.mjs
var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;
var isAppleTabletOnIos13 = function(navigator2) {
  return typeof navigator2 !== "undefined" && navigator2.platform === "MacIntel" && typeof navigator2.maxTouchPoints === "number" && navigator2.maxTouchPoints > 1 && typeof MSStream === "undefined";
};
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

// node_modules/@pixi/settings/lib/utils/isMobile.mjs
var isMobile2 = isMobile(globalThis.navigator);

// node_modules/@pixi/settings/lib/utils/canUploadSameBuffer.mjs
function canUploadSameBuffer() {
  return !isMobile2.apple.device;
}

// node_modules/@pixi/settings/lib/utils/maxRecommendedTextures.mjs
function maxRecommendedTextures(max) {
  let allowMax = true;
  if (isMobile2.tablet || isMobile2.phone) {
    if (isMobile2.apple.device) {
      const match = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (match) {
        const majorVersion = parseInt(match[1], 10);
        if (majorVersion < 11) {
          allowMax = false;
        }
      }
    }
    if (isMobile2.android.device) {
      const match = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (match) {
        const majorVersion = parseInt(match[1], 10);
        if (majorVersion < 7) {
          allowMax = false;
        }
      }
    }
  }
  return allowMax ? max : 4;
}

// node_modules/@pixi/settings/lib/settings.mjs
var settings = {
  ADAPTER: BrowserAdapter,
  MIPMAP_TEXTURES: MIPMAP_MODES.POW2,
  ANISOTROPIC_LEVEL: 0,
  RESOLUTION: 1,
  FILTER_RESOLUTION: 1,
  FILTER_MULTISAMPLE: MSAA_QUALITY.NONE,
  SPRITE_MAX_TEXTURES: maxRecommendedTextures(32),
  SPRITE_BATCH_SIZE: 4096,
  RENDER_OPTIONS: {
    view: null,
    antialias: false,
    autoDensity: false,
    backgroundColor: 0,
    backgroundAlpha: 1,
    useContextAlpha: true,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    width: 800,
    height: 600,
    legacy: false,
    hello: false
  },
  GC_MODE: GC_MODES.AUTO,
  GC_MAX_IDLE: 60 * 60,
  GC_MAX_CHECK_COUNT: 60 * 10,
  WRAP_MODE: WRAP_MODES.CLAMP,
  SCALE_MODE: SCALE_MODES.LINEAR,
  PRECISION_VERTEX: PRECISION.HIGH,
  PRECISION_FRAGMENT: isMobile2.apple.device ? PRECISION.HIGH : PRECISION.MEDIUM,
  CAN_UPLOAD_SAME_BUFFER: canUploadSameBuffer(),
  CREATE_IMAGE_BITMAP: false,
  ROUND_PIXELS: false
};

// node_modules/@pixi/core/lib/settings.mjs
settings.PREFER_ENV = ENV.WEBGL2;
settings.STRICT_TEXTURE_CACHE = false;

// node_modules/@pixi/extensions/lib/index.mjs
var ExtensionType = /* @__PURE__ */ ((ExtensionType2) => {
  ExtensionType2["Renderer"] = "renderer";
  ExtensionType2["Application"] = "application";
  ExtensionType2["RendererSystem"] = "renderer-webgl-system";
  ExtensionType2["RendererPlugin"] = "renderer-webgl-plugin";
  ExtensionType2["CanvasRendererSystem"] = "renderer-canvas-system";
  ExtensionType2["CanvasRendererPlugin"] = "renderer-canvas-plugin";
  ExtensionType2["Asset"] = "asset";
  ExtensionType2["LoadParser"] = "load-parser";
  ExtensionType2["ResolveParser"] = "resolve-parser";
  ExtensionType2["CacheParser"] = "cache-parser";
  ExtensionType2["DetectionParser"] = "detection-parser";
  return ExtensionType2;
})(ExtensionType || {});
var normalizeExtension = (ext) => {
  if (typeof ext === "function" || typeof ext === "object" && ext.extension) {
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
var extensions = {
  _addHandlers: {},
  _removeHandlers: {},
  _queue: {},
  remove(...extensions2) {
    extensions2.map(normalizeExtension).forEach((ext) => {
      ext.type.forEach((type) => this._removeHandlers[type]?.(ext));
    });
    return this;
  },
  add(...extensions2) {
    extensions2.map(normalizeExtension).forEach((ext) => {
      ext.type.forEach((type) => {
        const handlers = this._addHandlers;
        const queue = this._queue;
        if (!handlers[type]) {
          queue[type] = queue[type] || [];
          queue[type].push(ext);
        } else {
          handlers[type](ext);
        }
      });
    });
    return this;
  },
  handle(type, onAdd, onRemove) {
    const addHandlers = this._addHandlers;
    const removeHandlers = this._removeHandlers;
    addHandlers[type] = onAdd;
    removeHandlers[type] = onRemove;
    const queue = this._queue;
    if (queue[type]) {
      queue[type].forEach((ext) => onAdd(ext));
      delete queue[type];
    }
    return this;
  },
  handleByMap(type, map3) {
    return this.handle(type, (extension) => {
      map3[extension.name] = extension.ref;
    }, (extension) => {
      delete map3[extension.name];
    });
  },
  handleByList(type, list) {
    return this.handle(type, (extension) => {
      list.push(extension.ref);
      list.sort((a, b) => (b.priority ?? -1) - (a.priority ?? -1));
    }, (extension) => {
      const index = list.indexOf(extension.ref);
      if (index !== -1) {
        list.splice(index, 1);
      }
    });
  }
};

// node_modules/@pixi/math/lib/const.mjs
var PI_2 = Math.PI * 2;
var RAD_TO_DEG = 180 / Math.PI;
var DEG_TO_RAD = Math.PI / 180;
var SHAPES = /* @__PURE__ */ ((SHAPES2) => {
  SHAPES2[SHAPES2["POLY"] = 0] = "POLY";
  SHAPES2[SHAPES2["RECT"] = 1] = "RECT";
  SHAPES2[SHAPES2["CIRC"] = 2] = "CIRC";
  SHAPES2[SHAPES2["ELIP"] = 3] = "ELIP";
  SHAPES2[SHAPES2["RREC"] = 4] = "RREC";
  return SHAPES2;
})(SHAPES || {});

// node_modules/@pixi/math/lib/Point.mjs
var Point = class {
  constructor(x = 0, y = 0) {
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  copyFrom(p) {
    this.set(p.x, p.y);
    return this;
  }
  copyTo(p) {
    p.set(this.x, this.y);
    return p;
  }
  equals(p) {
    return p.x === this.x && p.y === this.y;
  }
  set(x = 0, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }
};

// node_modules/@pixi/math/lib/shapes/Rectangle.mjs
var tempPoints = [new Point(), new Point(), new Point(), new Point()];
var Rectangle = class {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = Number(x);
    this.y = Number(y);
    this.width = Number(width);
    this.height = Number(height);
    this.type = SHAPES.RECT;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  static get EMPTY() {
    return new Rectangle(0, 0, 0, 0);
  }
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  copyFrom(rectangle) {
    this.x = rectangle.x;
    this.y = rectangle.y;
    this.width = rectangle.width;
    this.height = rectangle.height;
    return this;
  }
  copyTo(rectangle) {
    rectangle.x = this.x;
    rectangle.y = this.y;
    rectangle.width = this.width;
    rectangle.height = this.height;
    return rectangle;
  }
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true;
      }
    }
    return false;
  }
  intersects(other, transform) {
    if (!transform) {
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
    const s = Math.sign(transform.a * transform.d - transform.b * transform.c);
    if (s === 0) {
      return false;
    }
    transform.apply(lt, lt);
    transform.apply(lb, lb);
    transform.apply(rt, rt);
    transform.apply(rb, rb);
    if (Math.max(lt.x, lb.x, rt.x, rb.x) <= x0 || Math.min(lt.x, lb.x, rt.x, rb.x) >= x1 || Math.max(lt.y, lb.y, rt.y, rb.y) <= y0 || Math.min(lt.y, lb.y, rt.y, rb.y) >= y1) {
      return false;
    }
    const nx = s * (lb.y - lt.y);
    const ny = s * (lt.x - lb.x);
    const n00 = nx * x0 + ny * y0;
    const n10 = nx * x1 + ny * y0;
    const n01 = nx * x0 + ny * y1;
    const n11 = nx * x1 + ny * y1;
    if (Math.max(n00, n10, n01, n11) <= nx * lt.x + ny * lt.y || Math.min(n00, n10, n01, n11) >= nx * rb.x + ny * rb.y) {
      return false;
    }
    const mx = s * (lt.y - rt.y);
    const my = s * (rt.x - lt.x);
    const m00 = mx * x0 + my * y0;
    const m10 = mx * x1 + my * y0;
    const m01 = mx * x0 + my * y1;
    const m11 = mx * x1 + my * y1;
    if (Math.max(m00, m10, m01, m11) <= mx * lt.x + my * lt.y || Math.min(m00, m10, m01, m11) >= mx * rb.x + my * rb.y) {
      return false;
    }
    return true;
  }
  pad(paddingX = 0, paddingY = paddingX) {
    this.x -= paddingX;
    this.y -= paddingY;
    this.width += paddingX * 2;
    this.height += paddingY * 2;
    return this;
  }
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
  ceil(resolution = 1, eps = 1e-3) {
    const x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
    const y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
    this.x = Math.floor((this.x + eps) * resolution) / resolution;
    this.y = Math.floor((this.y + eps) * resolution) / resolution;
    this.width = x2 - this.x;
    this.height = y2 - this.y;
    return this;
  }
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
};

// node_modules/@pixi/math/lib/ObservablePoint.mjs
var ObservablePoint = class {
  constructor(cb, scope, x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this.cb = cb;
    this.scope = scope;
  }
  clone(cb = this.cb, scope = this.scope) {
    return new ObservablePoint(cb, scope, this._x, this._y);
  }
  set(x = 0, y = x) {
    if (this._x !== x || this._y !== y) {
      this._x = x;
      this._y = y;
      this.cb.call(this.scope);
    }
    return this;
  }
  copyFrom(p) {
    if (this._x !== p.x || this._y !== p.y) {
      this._x = p.x;
      this._y = p.y;
      this.cb.call(this.scope);
    }
    return this;
  }
  copyTo(p) {
    p.set(this._x, this._y);
    return p;
  }
  equals(p) {
    return p.x === this._x && p.y === this._y;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    if (this._x !== value) {
      this._x = value;
      this.cb.call(this.scope);
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    if (this._y !== value) {
      this._y = value;
      this.cb.call(this.scope);
    }
  }
};

// node_modules/@pixi/math/lib/Matrix.mjs
var Matrix = class {
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.array = null;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }
  fromArray(array) {
    this.a = array[0];
    this.b = array[1];
    this.c = array[3];
    this.d = array[4];
    this.tx = array[2];
    this.ty = array[5];
  }
  set(a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }
  toArray(transpose, out) {
    if (!this.array) {
      this.array = new Float32Array(9);
    }
    const array = out || this.array;
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
  apply(pos, newPos) {
    newPos = newPos || new Point();
    const x = pos.x;
    const y = pos.y;
    newPos.x = this.a * x + this.c * y + this.tx;
    newPos.y = this.b * x + this.d * y + this.ty;
    return newPos;
  }
  applyInverse(pos, newPos) {
    newPos = newPos || new Point();
    const id = 1 / (this.a * this.d + this.c * -this.b);
    const x = pos.x;
    const y = pos.y;
    newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
    newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;
    return newPos;
  }
  translate(x, y) {
    this.tx += x;
    this.ty += y;
    return this;
  }
  scale(x, y) {
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;
    return this;
  }
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
  setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
    this.a = Math.cos(rotation + skewY) * scaleX;
    this.b = Math.sin(rotation + skewY) * scaleX;
    this.c = -Math.sin(rotation - skewX) * scaleY;
    this.d = Math.cos(rotation - skewX) * scaleY;
    this.tx = x - (pivotX * this.a + pivotY * this.c);
    this.ty = y - (pivotX * this.b + pivotY * this.d);
    return this;
  }
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
  decompose(transform) {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const pivot = transform.pivot;
    const skewX = -Math.atan2(-c, d);
    const skewY = Math.atan2(b, a);
    const delta = Math.abs(skewX + skewY);
    if (delta < 1e-5 || Math.abs(PI_2 - delta) < 1e-5) {
      transform.rotation = skewY;
      transform.skew.x = transform.skew.y = 0;
    } else {
      transform.rotation = 0;
      transform.skew.x = skewX;
      transform.skew.y = skewY;
    }
    transform.scale.x = Math.sqrt(a * a + b * b);
    transform.scale.y = Math.sqrt(c * c + d * d);
    transform.position.x = this.tx + (pivot.x * a + pivot.y * c);
    transform.position.y = this.ty + (pivot.x * b + pivot.y * d);
    return transform;
  }
  invert() {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    const tx1 = this.tx;
    const n = a1 * d1 - b1 * c1;
    this.a = d1 / n;
    this.b = -b1 / n;
    this.c = -c1 / n;
    this.d = a1 / n;
    this.tx = (c1 * this.ty - d1 * tx1) / n;
    this.ty = -(a1 * this.ty - b1 * tx1) / n;
    return this;
  }
  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
    return this;
  }
  clone() {
    const matrix = new Matrix();
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;
    return matrix;
  }
  copyTo(matrix) {
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;
    return matrix;
  }
  copyFrom(matrix) {
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.tx = matrix.tx;
    this.ty = matrix.ty;
    return this;
  }
  static get IDENTITY() {
    return new Matrix();
  }
  static get TEMP_MATRIX() {
    return new Matrix();
  }
};

// node_modules/@pixi/math/lib/groupD8.mjs
var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
var rotationCayley = [];
var rotationMatrices = [];
var signum = Math.sign;
function init() {
  for (let i = 0; i < 16; i++) {
    const row = [];
    rotationCayley.push(row);
    for (let j = 0; j < 16; j++) {
      const _ux = signum(ux[i] * ux[j] + vx[i] * uy[j]);
      const _uy = signum(uy[i] * ux[j] + vy[i] * uy[j]);
      const _vx = signum(ux[i] * vx[j] + vx[i] * vy[j]);
      const _vy = signum(uy[i] * vx[j] + vy[i] * vy[j]);
      for (let k = 0; k < 16; k++) {
        if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
          row.push(k);
          break;
        }
      }
    }
  }
  for (let i = 0; i < 16; i++) {
    const mat = new Matrix();
    mat.set(ux[i], uy[i], vx[i], vy[i], 0, 0);
    rotationMatrices.push(mat);
  }
}
init();
var groupD8 = {
  E: 0,
  SE: 1,
  S: 2,
  SW: 3,
  W: 4,
  NW: 5,
  N: 6,
  NE: 7,
  MIRROR_VERTICAL: 8,
  MAIN_DIAGONAL: 10,
  MIRROR_HORIZONTAL: 12,
  REVERSE_DIAGONAL: 14,
  uX: (ind) => ux[ind],
  uY: (ind) => uy[ind],
  vX: (ind) => vx[ind],
  vY: (ind) => vy[ind],
  inv: (rotation) => {
    if (rotation & 8) {
      return rotation & 15;
    }
    return -rotation & 7;
  },
  add: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][rotationFirst],
  sub: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][groupD8.inv(rotationFirst)],
  rotate180: (rotation) => rotation ^ 4,
  isVertical: (rotation) => (rotation & 3) === 2,
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
  matrixAppendRotationInv: (matrix, rotation, tx = 0, ty = 0) => {
    const mat = rotationMatrices[groupD8.inv(rotation)];
    mat.tx = tx;
    mat.ty = ty;
    matrix.append(mat);
  }
};

// node_modules/@pixi/math/lib/Transform.mjs
var _Transform = class {
  constructor() {
    this.worldTransform = new Matrix();
    this.localTransform = new Matrix();
    this.position = new ObservablePoint(this.onChange, this, 0, 0);
    this.scale = new ObservablePoint(this.onChange, this, 1, 1);
    this.pivot = new ObservablePoint(this.onChange, this, 0, 0);
    this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);
    this._rotation = 0;
    this._cx = 1;
    this._sx = 0;
    this._cy = 0;
    this._sy = 1;
    this._localID = 0;
    this._currentLocalID = 0;
    this._worldID = 0;
    this._parentID = 0;
  }
  onChange() {
    this._localID++;
  }
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y);
    this._sx = Math.sin(this._rotation + this.skew.y);
    this._cy = -Math.sin(this._rotation - this.skew.x);
    this._sy = Math.cos(this._rotation - this.skew.x);
    this._localID++;
  }
  updateLocalTransform() {
    const lt = this.localTransform;
    if (this._localID !== this._currentLocalID) {
      lt.a = this._cx * this.scale.x;
      lt.b = this._sx * this.scale.x;
      lt.c = this._cy * this.scale.y;
      lt.d = this._sy * this.scale.y;
      lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
      lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
      this._currentLocalID = this._localID;
      this._parentID = -1;
    }
  }
  updateTransform(parentTransform) {
    const lt = this.localTransform;
    if (this._localID !== this._currentLocalID) {
      lt.a = this._cx * this.scale.x;
      lt.b = this._sx * this.scale.x;
      lt.c = this._cy * this.scale.y;
      lt.d = this._sy * this.scale.y;
      lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
      lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
      this._currentLocalID = this._localID;
      this._parentID = -1;
    }
    if (this._parentID !== parentTransform._worldID) {
      const pt = parentTransform.worldTransform;
      const wt = this.worldTransform;
      wt.a = lt.a * pt.a + lt.b * pt.c;
      wt.b = lt.a * pt.b + lt.b * pt.d;
      wt.c = lt.c * pt.a + lt.d * pt.c;
      wt.d = lt.c * pt.b + lt.d * pt.d;
      wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
      wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
      this._parentID = parentTransform._worldID;
      this._worldID++;
    }
  }
  setFromMatrix(matrix) {
    matrix.decompose(this);
    this._localID++;
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    if (this._rotation !== value) {
      this._rotation = value;
      this.updateSkew();
    }
  }
};
var Transform = _Transform;
Transform.IDENTITY = new _Transform();

// node_modules/@pixi/runner/lib/Runner.mjs
var Runner = class {
  constructor(name) {
    this.items = [];
    this._name = name;
    this._aliasCount = 0;
  }
  emit(a0, a1, a2, a3, a4, a5, a6, a7) {
    if (arguments.length > 8) {
      throw new Error("max arguments reached");
    }
    const { name, items } = this;
    this._aliasCount++;
    for (let i = 0, len = items.length; i < len; i++) {
      items[i][name](a0, a1, a2, a3, a4, a5, a6, a7);
    }
    if (items === this.items) {
      this._aliasCount--;
    }
    return this;
  }
  ensureNonAliasedItems() {
    if (this._aliasCount > 0 && this.items.length > 1) {
      this._aliasCount = 0;
      this.items = this.items.slice(0);
    }
  }
  add(item) {
    if (item[this._name]) {
      this.ensureNonAliasedItems();
      this.remove(item);
      this.items.push(item);
    }
    return this;
  }
  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.ensureNonAliasedItems();
      this.items.splice(index, 1);
    }
    return this;
  }
  contains(item) {
    return this.items.includes(item);
  }
  removeAll() {
    this.ensureNonAliasedItems();
    this.items.length = 0;
    return this;
  }
  destroy() {
    this.removeAll();
    this.items = null;
    this._name = null;
  }
  get empty() {
    return this.items.length === 0;
  }
  get name() {
    return this._name;
  }
};
Object.defineProperties(Runner.prototype, {
  dispatch: { value: Runner.prototype.emit },
  run: { value: Runner.prototype.emit }
});

// node_modules/@pixi/ticker/lib/settings.mjs
settings.TARGET_FPMS = 0.06;

// node_modules/@pixi/ticker/lib/const.mjs
var UPDATE_PRIORITY = /* @__PURE__ */ ((UPDATE_PRIORITY2) => {
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["HIGH"] = 25] = "HIGH";
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["NORMAL"] = 0] = "NORMAL";
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["LOW"] = -25] = "LOW";
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["UTILITY"] = -50] = "UTILITY";
  return UPDATE_PRIORITY2;
})(UPDATE_PRIORITY || {});

// node_modules/@pixi/ticker/lib/TickerListener.mjs
var TickerListener = class {
  constructor(fn, context2 = null, priority = 0, once = false) {
    this.next = null;
    this.previous = null;
    this._destroyed = false;
    this.fn = fn;
    this.context = context2;
    this.priority = priority;
    this.once = once;
  }
  match(fn, context2 = null) {
    return this.fn === fn && this.context === context2;
  }
  emit(deltaTime) {
    if (this.fn) {
      if (this.context) {
        this.fn.call(this.context, deltaTime);
      } else {
        this.fn(deltaTime);
      }
    }
    const redirect = this.next;
    if (this.once) {
      this.destroy(true);
    }
    if (this._destroyed) {
      this.next = null;
    }
    return redirect;
  }
  connect(previous) {
    this.previous = previous;
    if (previous.next) {
      previous.next.previous = this;
    }
    this.next = previous.next;
    previous.next = this;
  }
  destroy(hard = false) {
    this._destroyed = true;
    this.fn = null;
    this.context = null;
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

// node_modules/@pixi/ticker/lib/Ticker.mjs
var Ticker = class {
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
    this.deltaMS = 1 / settings.TARGET_FPMS;
    this.elapsedMS = 1 / settings.TARGET_FPMS;
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
  _requestIfNeeded() {
    if (this._requestId === null && this._head.next) {
      this.lastTime = performance.now();
      this._lastFrame = this.lastTime;
      this._requestId = requestAnimationFrame(this._tick);
    }
  }
  _cancelIfNeeded() {
    if (this._requestId !== null) {
      cancelAnimationFrame(this._requestId);
      this._requestId = null;
    }
  }
  _startIfPossible() {
    if (this.started) {
      this._requestIfNeeded();
    } else if (this.autoStart) {
      this.start();
    }
  }
  add(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
    return this._addListener(new TickerListener(fn, context2, priority));
  }
  addOnce(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
    return this._addListener(new TickerListener(fn, context2, priority, true));
  }
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
  get count() {
    if (!this._head) {
      return 0;
    }
    let count = 0;
    let current = this._head;
    while (current = current.next) {
      count++;
    }
    return count;
  }
  start() {
    if (!this.started) {
      this.started = true;
      this._requestIfNeeded();
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this._cancelIfNeeded();
    }
  }
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
      this.deltaTime = this.deltaMS * settings.TARGET_FPMS;
      const head = this._head;
      let listener = head.next;
      while (listener) {
        listener = listener.emit(this.deltaTime);
      }
      if (!head.next) {
        this._cancelIfNeeded();
      }
    } else {
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    }
    this.lastTime = currentTime;
  }
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(fps) {
    const minFPS = Math.min(this.maxFPS, fps);
    const minFPMS = Math.min(Math.max(0, minFPS) / 1e3, settings.TARGET_FPMS);
    this._maxElapsedMS = 1 / minFPMS;
  }
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
  static get shared() {
    if (!Ticker._shared) {
      const shared = Ticker._shared = new Ticker();
      shared.autoStart = true;
      shared._protected = true;
    }
    return Ticker._shared;
  }
  static get system() {
    if (!Ticker._system) {
      const system = Ticker._system = new Ticker();
      system.autoStart = true;
      system._protected = true;
    }
    return Ticker._system;
  }
};

// node_modules/@pixi/ticker/lib/TickerPlugin.mjs
var TickerPlugin = class {
  static init(options) {
    options = Object.assign({
      autoStart: true,
      sharedTicker: false
    }, options);
    Object.defineProperty(this, "ticker", {
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
    });
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
  static destroy() {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null;
      oldTicker.destroy();
    }
  }
};
TickerPlugin.extension = ExtensionType.Application;
extensions.add(TickerPlugin);

// node_modules/@pixi/utils/lib/index.mjs
var import_eventemitter3 = __toESM(require_eventemitter3(), 1);
var import_earcut = __toESM(require_earcut(), 1);

// node_modules/@pixi/utils/lib/url.mjs
var import_url = require("url");
var url = {
  parse: import_url.parse,
  format: import_url.format,
  resolve: import_url.resolve
};

// node_modules/@pixi/utils/lib/settings.mjs
settings.RETINA_PREFIX = /@([0-9\.]+)x/;
settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;

// node_modules/@pixi/utils/lib/browser/isWebGLSupported.mjs
var supported;
function isWebGLSupported() {
  if (typeof supported === "undefined") {
    supported = function supported2() {
      const contextOptions = {
        stencil: true,
        failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
      };
      try {
        if (!settings.ADAPTER.getWebGLRenderingContext()) {
          return false;
        }
        const canvas = settings.ADAPTER.createCanvas();
        let gl = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions);
        const success = !!(gl && gl.getContextAttributes().stencil);
        if (gl) {
          const loseContext = gl.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        }
        gl = null;
        return success;
      } catch (e) {
        return false;
      }
    }();
  }
  return supported;
}

// node_modules/@pixi/utils/lib/node_modules/css-color-names/css-color-names.mjs
var aliceblue = "#f0f8ff";
var antiquewhite = "#faebd7";
var aqua = "#00ffff";
var aquamarine = "#7fffd4";
var azure = "#f0ffff";
var beige = "#f5f5dc";
var bisque = "#ffe4c4";
var black = "#000000";
var blanchedalmond = "#ffebcd";
var blue = "#0000ff";
var blueviolet = "#8a2be2";
var brown = "#a52a2a";
var burlywood = "#deb887";
var cadetblue = "#5f9ea0";
var chartreuse = "#7fff00";
var chocolate = "#d2691e";
var coral = "#ff7f50";
var cornflowerblue = "#6495ed";
var cornsilk = "#fff8dc";
var crimson = "#dc143c";
var cyan = "#00ffff";
var darkblue = "#00008b";
var darkcyan = "#008b8b";
var darkgoldenrod = "#b8860b";
var darkgray = "#a9a9a9";
var darkgreen = "#006400";
var darkgrey = "#a9a9a9";
var darkkhaki = "#bdb76b";
var darkmagenta = "#8b008b";
var darkolivegreen = "#556b2f";
var darkorange = "#ff8c00";
var darkorchid = "#9932cc";
var darkred = "#8b0000";
var darksalmon = "#e9967a";
var darkseagreen = "#8fbc8f";
var darkslateblue = "#483d8b";
var darkslategray = "#2f4f4f";
var darkslategrey = "#2f4f4f";
var darkturquoise = "#00ced1";
var darkviolet = "#9400d3";
var deeppink = "#ff1493";
var deepskyblue = "#00bfff";
var dimgray = "#696969";
var dimgrey = "#696969";
var dodgerblue = "#1e90ff";
var firebrick = "#b22222";
var floralwhite = "#fffaf0";
var forestgreen = "#228b22";
var fuchsia = "#ff00ff";
var gainsboro = "#dcdcdc";
var ghostwhite = "#f8f8ff";
var goldenrod = "#daa520";
var gold = "#ffd700";
var gray = "#808080";
var green = "#008000";
var greenyellow = "#adff2f";
var grey = "#808080";
var honeydew = "#f0fff0";
var hotpink = "#ff69b4";
var indianred = "#cd5c5c";
var indigo = "#4b0082";
var ivory = "#fffff0";
var khaki = "#f0e68c";
var lavenderblush = "#fff0f5";
var lavender = "#e6e6fa";
var lawngreen = "#7cfc00";
var lemonchiffon = "#fffacd";
var lightblue = "#add8e6";
var lightcoral = "#f08080";
var lightcyan = "#e0ffff";
var lightgoldenrodyellow = "#fafad2";
var lightgray = "#d3d3d3";
var lightgreen = "#90ee90";
var lightgrey = "#d3d3d3";
var lightpink = "#ffb6c1";
var lightsalmon = "#ffa07a";
var lightseagreen = "#20b2aa";
var lightskyblue = "#87cefa";
var lightslategray = "#778899";
var lightslategrey = "#778899";
var lightsteelblue = "#b0c4de";
var lightyellow = "#ffffe0";
var lime = "#00ff00";
var limegreen = "#32cd32";
var linen = "#faf0e6";
var magenta = "#ff00ff";
var maroon = "#800000";
var mediumaquamarine = "#66cdaa";
var mediumblue = "#0000cd";
var mediumorchid = "#ba55d3";
var mediumpurple = "#9370db";
var mediumseagreen = "#3cb371";
var mediumslateblue = "#7b68ee";
var mediumspringgreen = "#00fa9a";
var mediumturquoise = "#48d1cc";
var mediumvioletred = "#c71585";
var midnightblue = "#191970";
var mintcream = "#f5fffa";
var mistyrose = "#ffe4e1";
var moccasin = "#ffe4b5";
var navajowhite = "#ffdead";
var navy = "#000080";
var oldlace = "#fdf5e6";
var olive = "#808000";
var olivedrab = "#6b8e23";
var orange = "#ffa500";
var orangered = "#ff4500";
var orchid = "#da70d6";
var palegoldenrod = "#eee8aa";
var palegreen = "#98fb98";
var paleturquoise = "#afeeee";
var palevioletred = "#db7093";
var papayawhip = "#ffefd5";
var peachpuff = "#ffdab9";
var peru = "#cd853f";
var pink = "#ffc0cb";
var plum = "#dda0dd";
var powderblue = "#b0e0e6";
var purple = "#800080";
var rebeccapurple = "#663399";
var red = "#ff0000";
var rosybrown = "#bc8f8f";
var royalblue = "#4169e1";
var saddlebrown = "#8b4513";
var salmon = "#fa8072";
var sandybrown = "#f4a460";
var seagreen = "#2e8b57";
var seashell = "#fff5ee";
var sienna = "#a0522d";
var silver = "#c0c0c0";
var skyblue = "#87ceeb";
var slateblue = "#6a5acd";
var slategray = "#708090";
var slategrey = "#708090";
var snow = "#fffafa";
var springgreen = "#00ff7f";
var steelblue = "#4682b4";
var tan = "#d2b48c";
var teal = "#008080";
var thistle = "#d8bfd8";
var tomato = "#ff6347";
var turquoise = "#40e0d0";
var violet = "#ee82ee";
var wheat = "#f5deb3";
var white = "#ffffff";
var whitesmoke = "#f5f5f5";
var yellow = "#ffff00";
var yellowgreen = "#9acd32";
var cssColorNames = {
  aliceblue,
  antiquewhite,
  aqua,
  aquamarine,
  azure,
  beige,
  bisque,
  black,
  blanchedalmond,
  blue,
  blueviolet,
  brown,
  burlywood,
  cadetblue,
  chartreuse,
  chocolate,
  coral,
  cornflowerblue,
  cornsilk,
  crimson,
  cyan,
  darkblue,
  darkcyan,
  darkgoldenrod,
  darkgray,
  darkgreen,
  darkgrey,
  darkkhaki,
  darkmagenta,
  darkolivegreen,
  darkorange,
  darkorchid,
  darkred,
  darksalmon,
  darkseagreen,
  darkslateblue,
  darkslategray,
  darkslategrey,
  darkturquoise,
  darkviolet,
  deeppink,
  deepskyblue,
  dimgray,
  dimgrey,
  dodgerblue,
  firebrick,
  floralwhite,
  forestgreen,
  fuchsia,
  gainsboro,
  ghostwhite,
  goldenrod,
  gold,
  gray,
  green,
  greenyellow,
  grey,
  honeydew,
  hotpink,
  indianred,
  indigo,
  ivory,
  khaki,
  lavenderblush,
  lavender,
  lawngreen,
  lemonchiffon,
  lightblue,
  lightcoral,
  lightcyan,
  lightgoldenrodyellow,
  lightgray,
  lightgreen,
  lightgrey,
  lightpink,
  lightsalmon,
  lightseagreen,
  lightskyblue,
  lightslategray,
  lightslategrey,
  lightsteelblue,
  lightyellow,
  lime,
  limegreen,
  linen,
  magenta,
  maroon,
  mediumaquamarine,
  mediumblue,
  mediumorchid,
  mediumpurple,
  mediumseagreen,
  mediumslateblue,
  mediumspringgreen,
  mediumturquoise,
  mediumvioletred,
  midnightblue,
  mintcream,
  mistyrose,
  moccasin,
  navajowhite,
  navy,
  oldlace,
  olive,
  olivedrab,
  orange,
  orangered,
  orchid,
  palegoldenrod,
  palegreen,
  paleturquoise,
  palevioletred,
  papayawhip,
  peachpuff,
  peru,
  pink,
  plum,
  powderblue,
  purple,
  rebeccapurple,
  red,
  rosybrown,
  royalblue,
  saddlebrown,
  salmon,
  sandybrown,
  seagreen,
  seashell,
  sienna,
  silver,
  skyblue,
  slateblue,
  slategray,
  slategrey,
  snow,
  springgreen,
  steelblue,
  tan,
  teal,
  thistle,
  tomato,
  turquoise,
  violet,
  wheat,
  white,
  whitesmoke,
  yellow,
  yellowgreen
};

// node_modules/@pixi/utils/lib/color/hex.mjs
function hex2rgb(hex, out = []) {
  out[0] = (hex >> 16 & 255) / 255;
  out[1] = (hex >> 8 & 255) / 255;
  out[2] = (hex & 255) / 255;
  return out;
}
function hex2string(hex) {
  let hexString = hex.toString(16);
  hexString = "000000".substring(0, 6 - hexString.length) + hexString;
  return `#${hexString}`;
}
function string2hex(string) {
  if (typeof string === "string") {
    string = cssColorNames[string.toLowerCase()] || string;
    if (string[0] === "#") {
      string = string.slice(1);
    }
    if (string.length === 3) {
      const [r, g, b] = string;
      string = r + r + g + g + b + b;
    }
  }
  return parseInt(string, 16);
}

// node_modules/@pixi/utils/lib/color/premultiply.mjs
function mapPremultipliedBlendModes() {
  const pm = [];
  const npm = [];
  for (let i = 0; i < 32; i++) {
    pm[i] = i;
    npm[i] = i;
  }
  pm[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL;
  pm[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD;
  pm[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN;
  npm[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM;
  npm[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM;
  npm[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
  const array = [];
  array.push(npm);
  array.push(pm);
  return array;
}
var premultiplyBlendMode = mapPremultipliedBlendModes();
function premultiplyTint(tint, alpha) {
  if (alpha === 1) {
    return (alpha * 255 << 24) + tint;
  }
  if (alpha === 0) {
    return 0;
  }
  let R = tint >> 16 & 255;
  let G = tint >> 8 & 255;
  let B = tint & 255;
  R = R * alpha + 0.5 | 0;
  G = G * alpha + 0.5 | 0;
  B = B * alpha + 0.5 | 0;
  return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
}

// node_modules/@pixi/utils/lib/data/getBufferType.mjs
function getBufferType(array) {
  if (array.BYTES_PER_ELEMENT === 4) {
    if (array instanceof Float32Array) {
      return "Float32Array";
    } else if (array instanceof Uint32Array) {
      return "Uint32Array";
    }
    return "Int32Array";
  } else if (array.BYTES_PER_ELEMENT === 2) {
    if (array instanceof Uint16Array) {
      return "Uint16Array";
    }
  } else if (array.BYTES_PER_ELEMENT === 1) {
    if (array instanceof Uint8Array) {
      return "Uint8Array";
    }
  }
  return null;
}

// node_modules/@pixi/utils/lib/data/pow2.mjs
function nextPow2(v) {
  v += v === 0 ? 1 : 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}
function isPow2(v) {
  return !(v & v - 1) && !!v;
}
function log2(v) {
  let r = (v > 65535 ? 1 : 0) << 4;
  v >>>= r;
  let shift = (v > 255 ? 1 : 0) << 3;
  v >>>= shift;
  r |= shift;
  shift = (v > 15 ? 1 : 0) << 2;
  v >>>= shift;
  r |= shift;
  shift = (v > 3 ? 1 : 0) << 1;
  v >>>= shift;
  r |= shift;
  return r | v >> 1;
}

// node_modules/@pixi/utils/lib/data/removeItems.mjs
function removeItems(arr, startIdx, removeCount) {
  const length = arr.length;
  let i;
  if (startIdx >= length || removeCount === 0) {
    return;
  }
  removeCount = startIdx + removeCount > length ? length - startIdx : removeCount;
  const len = length - removeCount;
  for (i = startIdx; i < len; ++i) {
    arr[i] = arr[i + removeCount];
  }
  arr.length = len;
}

// node_modules/@pixi/utils/lib/data/uid.mjs
var nextUid = 0;
function uid() {
  return ++nextUid;
}

// node_modules/@pixi/utils/lib/media/caches.mjs
var ProgramCache = {};
var TextureCache = /* @__PURE__ */ Object.create(null);
var BaseTextureCache = /* @__PURE__ */ Object.create(null);

// node_modules/@pixi/utils/lib/network/determineCrossOrigin.mjs
var tempAnchor;
function determineCrossOrigin(url$1, loc = globalThis.location) {
  if (url$1.startsWith("data:")) {
    return "";
  }
  loc = loc || globalThis.location;
  if (!tempAnchor) {
    tempAnchor = document.createElement("a");
  }
  tempAnchor.href = url$1;
  const parsedUrl = url.parse(tempAnchor.href);
  const samePort = !parsedUrl.port && loc.port === "" || parsedUrl.port === loc.port;
  if (parsedUrl.hostname !== loc.hostname || !samePort || parsedUrl.protocol !== loc.protocol) {
    return "anonymous";
  }
  return "";
}

// node_modules/@pixi/utils/lib/network/getResolutionOfUrl.mjs
function getResolutionOfUrl(url2, defaultValue2 = 1) {
  const resolution = settings.RETINA_PREFIX.exec(url2);
  if (resolution) {
    return parseFloat(resolution[1]);
  }
  return defaultValue2;
}

// node_modules/@pixi/core/lib/textures/resources/autoDetectResource.mjs
var INSTALLED = [];
function autoDetectResource(source, options) {
  if (!source) {
    return null;
  }
  let extension = "";
  if (typeof source === "string") {
    const result = /\.(\w{3,4})(?:$|\?|#)/i.exec(source);
    if (result) {
      extension = result[1].toLowerCase();
    }
  }
  for (let i = INSTALLED.length - 1; i >= 0; --i) {
    const ResourcePlugin = INSTALLED[i];
    if (ResourcePlugin.test && ResourcePlugin.test(source, extension)) {
      return new ResourcePlugin(source, options);
    }
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}

// node_modules/@pixi/core/lib/textures/resources/Resource.mjs
var Resource = class {
  constructor(width = 0, height = 0) {
    this._width = width;
    this._height = height;
    this.destroyed = false;
    this.internal = false;
    this.onResize = new Runner("setRealSize");
    this.onUpdate = new Runner("update");
    this.onError = new Runner("onError");
  }
  bind(baseTexture) {
    this.onResize.add(baseTexture);
    this.onUpdate.add(baseTexture);
    this.onError.add(baseTexture);
    if (this._width || this._height) {
      this.onResize.emit(this._width, this._height);
    }
  }
  unbind(baseTexture) {
    this.onResize.remove(baseTexture);
    this.onUpdate.remove(baseTexture);
    this.onError.remove(baseTexture);
  }
  resize(width, height) {
    if (width !== this._width || height !== this._height) {
      this._width = width;
      this._height = height;
      this.onResize.emit(width, height);
    }
  }
  get valid() {
    return !!this._width && !!this._height;
  }
  update() {
    if (!this.destroyed) {
      this.onUpdate.emit();
    }
  }
  load() {
    return Promise.resolve(this);
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  style(_renderer, _baseTexture, _glTexture) {
    return false;
  }
  dispose() {
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.dispose();
      this.onError.removeAll();
      this.onError = null;
      this.onResize.removeAll();
      this.onResize = null;
      this.onUpdate.removeAll();
      this.onUpdate = null;
    }
  }
  static test(_source, _extension) {
    return false;
  }
};

// node_modules/@pixi/core/lib/textures/resources/BufferResource.mjs
var BufferResource = class extends Resource {
  constructor(source, options) {
    const { width, height } = options || {};
    if (!width || !height) {
      throw new Error("BufferResource width or height invalid");
    }
    super(width, height);
    this.data = source;
  }
  upload(renderer, baseTexture, glTexture) {
    const gl = renderer.gl;
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    if (glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
    }
    return true;
  }
  dispose() {
    this.data = null;
  }
  static test(source) {
    return source instanceof Float32Array || source instanceof Uint8Array || source instanceof Uint32Array;
  }
};

// node_modules/@pixi/core/lib/textures/BaseTexture.mjs
var defaultBufferOptions = {
  scaleMode: SCALE_MODES.NEAREST,
  format: FORMATS.RGBA,
  alphaMode: ALPHA_MODES.NPM
};
var _BaseTexture = class extends import_eventemitter3.default {
  constructor(resource = null, options = null) {
    super();
    options = options || {};
    const {
      alphaMode,
      mipmap,
      anisotropicLevel,
      scaleMode,
      width,
      height,
      wrapMode,
      format: format2,
      type,
      target,
      resolution,
      resourceOptions
    } = options;
    if (resource && !(resource instanceof Resource)) {
      resource = autoDetectResource(resource, resourceOptions);
      resource.internal = true;
    }
    this.resolution = resolution || settings.RESOLUTION;
    this.width = Math.round((width || 0) * this.resolution) / this.resolution;
    this.height = Math.round((height || 0) * this.resolution) / this.resolution;
    this._mipmap = mipmap ?? settings.MIPMAP_TEXTURES;
    this.anisotropicLevel = anisotropicLevel ?? settings.ANISOTROPIC_LEVEL;
    this._wrapMode = wrapMode || settings.WRAP_MODE;
    this._scaleMode = scaleMode ?? settings.SCALE_MODE;
    this.format = format2 || FORMATS.RGBA;
    this.type = type || TYPES.UNSIGNED_BYTE;
    this.target = target || TARGETS.TEXTURE_2D;
    this.alphaMode = alphaMode ?? ALPHA_MODES.UNPACK;
    this.uid = uid();
    this.touched = 0;
    this.isPowerOfTwo = false;
    this._refreshPOT();
    this._glTextures = {};
    this.dirtyId = 0;
    this.dirtyStyleId = 0;
    this.cacheId = null;
    this.valid = width > 0 && height > 0;
    this.textureCacheIds = [];
    this.destroyed = false;
    this.resource = null;
    this._batchEnabled = 0;
    this._batchLocation = 0;
    this.parentTextureArray = null;
    this.setResource(resource);
  }
  get realWidth() {
    return Math.round(this.width * this.resolution);
  }
  get realHeight() {
    return Math.round(this.height * this.resolution);
  }
  get mipmap() {
    return this._mipmap;
  }
  set mipmap(value) {
    if (this._mipmap !== value) {
      this._mipmap = value;
      this.dirtyStyleId++;
    }
  }
  get scaleMode() {
    return this._scaleMode;
  }
  set scaleMode(value) {
    if (this._scaleMode !== value) {
      this._scaleMode = value;
      this.dirtyStyleId++;
    }
  }
  get wrapMode() {
    return this._wrapMode;
  }
  set wrapMode(value) {
    if (this._wrapMode !== value) {
      this._wrapMode = value;
      this.dirtyStyleId++;
    }
  }
  setStyle(scaleMode, mipmap) {
    let dirty;
    if (scaleMode !== void 0 && scaleMode !== this.scaleMode) {
      this.scaleMode = scaleMode;
      dirty = true;
    }
    if (mipmap !== void 0 && mipmap !== this.mipmap) {
      this.mipmap = mipmap;
      dirty = true;
    }
    if (dirty) {
      this.dirtyStyleId++;
    }
    return this;
  }
  setSize(desiredWidth, desiredHeight, resolution) {
    resolution = resolution || this.resolution;
    return this.setRealSize(desiredWidth * resolution, desiredHeight * resolution, resolution);
  }
  setRealSize(realWidth, realHeight, resolution) {
    this.resolution = resolution || this.resolution;
    this.width = Math.round(realWidth) / this.resolution;
    this.height = Math.round(realHeight) / this.resolution;
    this._refreshPOT();
    this.update();
    return this;
  }
  _refreshPOT() {
    this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
  }
  setResolution(resolution) {
    const oldResolution = this.resolution;
    if (oldResolution === resolution) {
      return this;
    }
    this.resolution = resolution;
    if (this.valid) {
      this.width = Math.round(this.width * oldResolution) / resolution;
      this.height = Math.round(this.height * oldResolution) / resolution;
      this.emit("update", this);
    }
    this._refreshPOT();
    return this;
  }
  setResource(resource) {
    if (this.resource === resource) {
      return this;
    }
    if (this.resource) {
      throw new Error("Resource can be set only once");
    }
    resource.bind(this);
    this.resource = resource;
    return this;
  }
  update() {
    if (!this.valid) {
      if (this.width > 0 && this.height > 0) {
        this.valid = true;
        this.emit("loaded", this);
        this.emit("update", this);
      }
    } else {
      this.dirtyId++;
      this.dirtyStyleId++;
      this.emit("update", this);
    }
  }
  onError(event) {
    this.emit("error", this, event);
  }
  destroy() {
    if (this.resource) {
      this.resource.unbind(this);
      if (this.resource.internal) {
        this.resource.destroy();
      }
      this.resource = null;
    }
    if (this.cacheId) {
      delete BaseTextureCache[this.cacheId];
      delete TextureCache[this.cacheId];
      this.cacheId = null;
    }
    this.dispose();
    _BaseTexture.removeFromCache(this);
    this.textureCacheIds = null;
    this.destroyed = true;
  }
  dispose() {
    this.emit("dispose", this);
  }
  castToBaseTexture() {
    return this;
  }
  static from(source, options, strict = settings.STRICT_TEXTURE_CACHE) {
    const isFrame = typeof source === "string";
    let cacheId = null;
    if (isFrame) {
      cacheId = source;
    } else {
      if (!source._pixiId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source._pixiId = `${prefix}_${uid()}`;
      }
      cacheId = source._pixiId;
    }
    let baseTexture = BaseTextureCache[cacheId];
    if (isFrame && strict && !baseTexture) {
      throw new Error(`The cacheId "${cacheId}" does not exist in BaseTextureCache.`);
    }
    if (!baseTexture) {
      baseTexture = new _BaseTexture(source, options);
      baseTexture.cacheId = cacheId;
      _BaseTexture.addToCache(baseTexture, cacheId);
    }
    return baseTexture;
  }
  static fromBuffer(buffer, width, height, options) {
    buffer = buffer || new Float32Array(width * height * 4);
    const resource = new BufferResource(buffer, { width, height });
    const type = buffer instanceof Float32Array ? TYPES.FLOAT : TYPES.UNSIGNED_BYTE;
    return new _BaseTexture(resource, Object.assign({}, defaultBufferOptions, options || { width, height, type }));
  }
  static addToCache(baseTexture, id) {
    if (id) {
      if (!baseTexture.textureCacheIds.includes(id)) {
        baseTexture.textureCacheIds.push(id);
      }
      if (BaseTextureCache[id]) {
        console.warn(`BaseTexture added to the cache with an id [${id}] that already had an entry`);
      }
      BaseTextureCache[id] = baseTexture;
    }
  }
  static removeFromCache(baseTexture) {
    if (typeof baseTexture === "string") {
      const baseTextureFromCache = BaseTextureCache[baseTexture];
      if (baseTextureFromCache) {
        const index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
        if (index > -1) {
          baseTextureFromCache.textureCacheIds.splice(index, 1);
        }
        delete BaseTextureCache[baseTexture];
        return baseTextureFromCache;
      }
    } else if (baseTexture?.textureCacheIds) {
      for (let i = 0; i < baseTexture.textureCacheIds.length; ++i) {
        delete BaseTextureCache[baseTexture.textureCacheIds[i]];
      }
      baseTexture.textureCacheIds.length = 0;
      return baseTexture;
    }
    return null;
  }
};
var BaseTexture = _BaseTexture;
BaseTexture._globalBatch = 0;

// node_modules/@pixi/core/lib/textures/resources/AbstractMultiResource.mjs
var AbstractMultiResource = class extends Resource {
  constructor(length, options) {
    const { width, height } = options || {};
    super(width, height);
    this.items = [];
    this.itemDirtyIds = [];
    for (let i = 0; i < length; i++) {
      const partTexture = new BaseTexture();
      this.items.push(partTexture);
      this.itemDirtyIds.push(-2);
    }
    this.length = length;
    this._load = null;
    this.baseTexture = null;
  }
  initFromArray(resources, options) {
    for (let i = 0; i < this.length; i++) {
      if (!resources[i]) {
        continue;
      }
      if (resources[i].castToBaseTexture) {
        this.addBaseTextureAt(resources[i].castToBaseTexture(), i);
      } else if (resources[i] instanceof Resource) {
        this.addResourceAt(resources[i], i);
      } else {
        this.addResourceAt(autoDetectResource(resources[i], options), i);
      }
    }
  }
  dispose() {
    for (let i = 0, len = this.length; i < len; i++) {
      this.items[i].destroy();
    }
    this.items = null;
    this.itemDirtyIds = null;
    this._load = null;
  }
  addResourceAt(resource, index) {
    if (!this.items[index]) {
      throw new Error(`Index ${index} is out of bounds`);
    }
    if (resource.valid && !this.valid) {
      this.resize(resource.width, resource.height);
    }
    this.items[index].setResource(resource);
    return this;
  }
  bind(baseTexture) {
    if (this.baseTexture !== null) {
      throw new Error("Only one base texture per TextureArray is allowed");
    }
    super.bind(baseTexture);
    for (let i = 0; i < this.length; i++) {
      this.items[i].parentTextureArray = baseTexture;
      this.items[i].on("update", baseTexture.update, baseTexture);
    }
  }
  unbind(baseTexture) {
    super.unbind(baseTexture);
    for (let i = 0; i < this.length; i++) {
      this.items[i].parentTextureArray = null;
      this.items[i].off("update", baseTexture.update, baseTexture);
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    const resources = this.items.map((item) => item.resource).filter((item) => item);
    const promises = resources.map((item) => item.load());
    this._load = Promise.all(promises).then(() => {
      const { realWidth, realHeight } = this.items[0];
      this.resize(realWidth, realHeight);
      return Promise.resolve(this);
    });
    return this._load;
  }
};

// node_modules/@pixi/core/lib/textures/resources/ArrayResource.mjs
var ArrayResource = class extends AbstractMultiResource {
  constructor(source, options) {
    const { width, height } = options || {};
    let urls;
    let length;
    if (Array.isArray(source)) {
      urls = source;
      length = source.length;
    } else {
      length = source;
    }
    super(length, { width, height });
    if (urls) {
      this.initFromArray(urls, options);
    }
  }
  addBaseTextureAt(baseTexture, index) {
    if (baseTexture.resource) {
      this.addResourceAt(baseTexture.resource, index);
    } else {
      throw new Error("ArrayResource does not support RenderTexture");
    }
    return this;
  }
  bind(baseTexture) {
    super.bind(baseTexture);
    baseTexture.target = TARGETS.TEXTURE_2D_ARRAY;
  }
  upload(renderer, texture, glTexture) {
    const { length, itemDirtyIds, items } = this;
    const { gl } = renderer;
    if (glTexture.dirtyId < 0) {
      gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, glTexture.internalFormat, this._width, this._height, length, 0, texture.format, glTexture.type, null);
    }
    for (let i = 0; i < length; i++) {
      const item = items[i];
      if (itemDirtyIds[i] < item.dirtyId) {
        itemDirtyIds[i] = item.dirtyId;
        if (item.valid) {
          gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, item.resource.width, item.resource.height, 1, texture.format, glTexture.type, item.resource.source);
        }
      }
    }
    return true;
  }
};

// node_modules/@pixi/core/lib/textures/resources/BaseImageResource.mjs
var BaseImageResource = class extends Resource {
  constructor(source) {
    const sourceAny = source;
    const width = sourceAny.naturalWidth || sourceAny.videoWidth || sourceAny.width;
    const height = sourceAny.naturalHeight || sourceAny.videoHeight || sourceAny.height;
    super(width, height);
    this.source = source;
    this.noSubImage = false;
  }
  static crossOrigin(element, url2, crossorigin) {
    if (crossorigin === void 0 && !url2.startsWith("data:")) {
      element.crossOrigin = determineCrossOrigin(url2);
    } else if (crossorigin !== false) {
      element.crossOrigin = typeof crossorigin === "string" ? crossorigin : "anonymous";
    }
  }
  upload(renderer, baseTexture, glTexture, source) {
    const gl = renderer.gl;
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    source = source || this.source;
    if (typeof HTMLImageElement !== "undefined" && source instanceof HTMLImageElement) {
      if (!source.complete || source.naturalWidth === 0) {
        return false;
      }
    } else if (typeof HTMLVideoElement !== "undefined" && source instanceof HTMLVideoElement) {
      if (source.readyState <= 1) {
        return false;
      }
    }
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    if (!this.noSubImage && baseTexture.target === gl.TEXTURE_2D && glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, baseTexture.format, glTexture.type, source);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, baseTexture.format, glTexture.type, source);
    }
    return true;
  }
  update() {
    if (this.destroyed) {
      return;
    }
    const source = this.source;
    const width = source.naturalWidth || source.videoWidth || source.width;
    const height = source.naturalHeight || source.videoHeight || source.height;
    this.resize(width, height);
    super.update();
  }
  dispose() {
    this.source = null;
  }
};

// node_modules/@pixi/core/lib/textures/resources/CanvasResource.mjs
var CanvasResource = class extends BaseImageResource {
  constructor(source) {
    super(source);
  }
  static test(source) {
    const { OffscreenCanvas } = globalThis;
    if (OffscreenCanvas && source instanceof OffscreenCanvas) {
      return true;
    }
    return globalThis.HTMLCanvasElement && source instanceof HTMLCanvasElement;
  }
};

// node_modules/@pixi/core/lib/textures/resources/CubeResource.mjs
var _CubeResource = class extends AbstractMultiResource {
  constructor(source, options) {
    const { width, height, autoLoad, linkBaseTexture } = options || {};
    if (source && source.length !== _CubeResource.SIDES) {
      throw new Error(`Invalid length. Got ${source.length}, expected 6`);
    }
    super(6, { width, height });
    for (let i = 0; i < _CubeResource.SIDES; i++) {
      this.items[i].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + i;
    }
    this.linkBaseTexture = linkBaseTexture !== false;
    if (source) {
      this.initFromArray(source, options);
    }
    if (autoLoad !== false) {
      this.load();
    }
  }
  bind(baseTexture) {
    super.bind(baseTexture);
    baseTexture.target = TARGETS.TEXTURE_CUBE_MAP;
  }
  addBaseTextureAt(baseTexture, index, linkBaseTexture) {
    if (linkBaseTexture === void 0) {
      linkBaseTexture = this.linkBaseTexture;
    }
    if (!this.items[index]) {
      throw new Error(`Index ${index} is out of bounds`);
    }
    if (!this.linkBaseTexture || baseTexture.parentTextureArray || Object.keys(baseTexture._glTextures).length > 0) {
      if (baseTexture.resource) {
        this.addResourceAt(baseTexture.resource, index);
      } else {
        throw new Error(`CubeResource does not support copying of renderTexture.`);
      }
    } else {
      baseTexture.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + index;
      baseTexture.parentTextureArray = this.baseTexture;
      this.items[index] = baseTexture;
    }
    if (baseTexture.valid && !this.valid) {
      this.resize(baseTexture.realWidth, baseTexture.realHeight);
    }
    this.items[index] = baseTexture;
    return this;
  }
  upload(renderer, _baseTexture, glTexture) {
    const dirty = this.itemDirtyIds;
    for (let i = 0; i < _CubeResource.SIDES; i++) {
      const side = this.items[i];
      if (dirty[i] < side.dirtyId || glTexture.dirtyId < _baseTexture.dirtyId) {
        if (side.valid && side.resource) {
          side.resource.upload(renderer, side, glTexture);
          dirty[i] = side.dirtyId;
        } else if (dirty[i] < -1) {
          renderer.gl.texImage2D(side.target, 0, glTexture.internalFormat, _baseTexture.realWidth, _baseTexture.realHeight, 0, _baseTexture.format, glTexture.type, null);
          dirty[i] = -1;
        }
      }
    }
    return true;
  }
  static test(source) {
    return Array.isArray(source) && source.length === _CubeResource.SIDES;
  }
};
var CubeResource = _CubeResource;
CubeResource.SIDES = 6;

// node_modules/@pixi/core/lib/textures/resources/ImageResource.mjs
var ImageResource = class extends BaseImageResource {
  constructor(source, options) {
    options = options || {};
    if (typeof source === "string") {
      const imageElement = new Image();
      BaseImageResource.crossOrigin(imageElement, source, options.crossorigin);
      imageElement.src = source;
      source = imageElement;
    }
    super(source);
    if (!source.complete && !!this._width && !!this._height) {
      this._width = 0;
      this._height = 0;
    }
    this.url = source.src;
    this._process = null;
    this.preserveBitmap = false;
    this.createBitmap = (options.createBitmap ?? settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap;
    this.alphaMode = typeof options.alphaMode === "number" ? options.alphaMode : null;
    this.bitmap = null;
    this._load = null;
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  load(createBitmap) {
    if (this._load) {
      return this._load;
    }
    if (createBitmap !== void 0) {
      this.createBitmap = createBitmap;
    }
    this._load = new Promise((resolve2, reject) => {
      const source = this.source;
      this.url = source.src;
      const completed = () => {
        if (this.destroyed) {
          return;
        }
        source.onload = null;
        source.onerror = null;
        this.resize(source.width, source.height);
        this._load = null;
        if (this.createBitmap) {
          resolve2(this.process());
        } else {
          resolve2(this);
        }
      };
      if (source.complete && source.src) {
        completed();
      } else {
        source.onload = completed;
        source.onerror = (event) => {
          reject(event);
          this.onError.emit(event);
        };
      }
    });
    return this._load;
  }
  process() {
    const source = this.source;
    if (this._process !== null) {
      return this._process;
    }
    if (this.bitmap !== null || !globalThis.createImageBitmap) {
      return Promise.resolve(this);
    }
    const createImageBitmap2 = globalThis.createImageBitmap;
    const cors = !source.crossOrigin || source.crossOrigin === "anonymous";
    this._process = fetch(source.src, {
      mode: cors ? "cors" : "no-cors"
    }).then((r) => r.blob()).then((blob) => createImageBitmap2(blob, 0, 0, source.width, source.height, {
      premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
    })).then((bitmap) => {
      if (this.destroyed) {
        return Promise.reject();
      }
      this.bitmap = bitmap;
      this.update();
      this._process = null;
      return Promise.resolve(this);
    });
    return this._process;
  }
  upload(renderer, baseTexture, glTexture) {
    if (typeof this.alphaMode === "number") {
      baseTexture.alphaMode = this.alphaMode;
    }
    if (!this.createBitmap) {
      return super.upload(renderer, baseTexture, glTexture);
    }
    if (!this.bitmap) {
      this.process();
      if (!this.bitmap) {
        return false;
      }
    }
    super.upload(renderer, baseTexture, glTexture, this.bitmap);
    if (!this.preserveBitmap) {
      let flag = true;
      const glTextures = baseTexture._glTextures;
      for (const key in glTextures) {
        const otherTex = glTextures[key];
        if (otherTex !== glTexture && otherTex.dirtyId !== baseTexture.dirtyId) {
          flag = false;
          break;
        }
      }
      if (flag) {
        if (this.bitmap.close) {
          this.bitmap.close();
        }
        this.bitmap = null;
      }
    }
    return true;
  }
  dispose() {
    this.source.onload = null;
    this.source.onerror = null;
    super.dispose();
    if (this.bitmap) {
      this.bitmap.close();
      this.bitmap = null;
    }
    this._process = null;
    this._load = null;
  }
  static test(source) {
    return typeof HTMLImageElement !== "undefined" && (typeof source === "string" || source instanceof HTMLImageElement);
  }
};

// node_modules/@pixi/core/lib/textures/resources/SVGResource.mjs
var _SVGResource = class extends BaseImageResource {
  constructor(sourceBase64, options) {
    options = options || {};
    super(settings.ADAPTER.createCanvas());
    this._width = 0;
    this._height = 0;
    this.svg = sourceBase64;
    this.scale = options.scale || 1;
    this._overrideWidth = options.width;
    this._overrideHeight = options.height;
    this._resolve = null;
    this._crossorigin = options.crossorigin;
    this._load = null;
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    this._load = new Promise((resolve2) => {
      this._resolve = () => {
        this.resize(this.source.width, this.source.height);
        resolve2(this);
      };
      if (_SVGResource.SVG_XML.test(this.svg.trim())) {
        if (!btoa) {
          throw new Error("Your browser doesn't support base64 conversions.");
        }
        this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
      }
      this._loadSvg();
    });
    return this._load;
  }
  _loadSvg() {
    const tempImage = new Image();
    BaseImageResource.crossOrigin(tempImage, this.svg, this._crossorigin);
    tempImage.src = this.svg;
    tempImage.onerror = (event) => {
      if (!this._resolve) {
        return;
      }
      tempImage.onerror = null;
      this.onError.emit(event);
    };
    tempImage.onload = () => {
      if (!this._resolve) {
        return;
      }
      const svgWidth = tempImage.width;
      const svgHeight = tempImage.height;
      if (!svgWidth || !svgHeight) {
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      }
      let width = svgWidth * this.scale;
      let height = svgHeight * this.scale;
      if (this._overrideWidth || this._overrideHeight) {
        width = this._overrideWidth || this._overrideHeight / svgHeight * svgWidth;
        height = this._overrideHeight || this._overrideWidth / svgWidth * svgHeight;
      }
      width = Math.round(width);
      height = Math.round(height);
      const canvas = this.source;
      canvas.width = width;
      canvas.height = height;
      canvas._pixiId = `canvas_${uid()}`;
      canvas.getContext("2d").drawImage(tempImage, 0, 0, svgWidth, svgHeight, 0, 0, width, height);
      this._resolve();
      this._resolve = null;
    };
  }
  static getSize(svgString) {
    const sizeMatch = _SVGResource.SVG_SIZE.exec(svgString);
    const size = {};
    if (sizeMatch) {
      size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3]));
      size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]));
    }
    return size;
  }
  dispose() {
    super.dispose();
    this._resolve = null;
    this._crossorigin = null;
  }
  static test(source, extension) {
    return extension === "svg" || typeof source === "string" && source.startsWith("data:image/svg+xml") || typeof source === "string" && _SVGResource.SVG_XML.test(source);
  }
};
var SVGResource = _SVGResource;
SVGResource.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m;
SVGResource.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;

// node_modules/@pixi/core/lib/textures/resources/VideoResource.mjs
var _VideoResource = class extends BaseImageResource {
  constructor(source, options) {
    options = options || {};
    if (!(source instanceof HTMLVideoElement)) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("preload", "auto");
      videoElement.setAttribute("webkit-playsinline", "");
      videoElement.setAttribute("playsinline", "");
      if (typeof source === "string") {
        source = [source];
      }
      const firstSrc = source[0].src || source[0];
      BaseImageResource.crossOrigin(videoElement, firstSrc, options.crossorigin);
      for (let i = 0; i < source.length; ++i) {
        const sourceElement = document.createElement("source");
        let { src, mime } = source[i];
        src = src || source[i];
        const baseSrc = src.split("?").shift().toLowerCase();
        const ext = baseSrc.slice(baseSrc.lastIndexOf(".") + 1);
        mime = mime || _VideoResource.MIME_TYPES[ext] || `video/${ext}`;
        sourceElement.src = src;
        sourceElement.type = mime;
        videoElement.appendChild(sourceElement);
      }
      source = videoElement;
    }
    super(source);
    this.noSubImage = true;
    this._autoUpdate = true;
    this._isConnectedToTicker = false;
    this._updateFPS = options.updateFPS || 0;
    this._msToNextUpdate = 0;
    this.autoPlay = options.autoPlay !== false;
    this._load = null;
    this._resolve = null;
    this._onCanPlay = this._onCanPlay.bind(this);
    this._onError = this._onError.bind(this);
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  update(_deltaTime = 0) {
    if (!this.destroyed) {
      const elapsedMS = Ticker.shared.elapsedMS * this.source.playbackRate;
      this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
      if (!this._updateFPS || this._msToNextUpdate <= 0) {
        super.update();
        this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0;
      }
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    const source = this.source;
    if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
      source.complete = true;
    }
    source.addEventListener("play", this._onPlayStart.bind(this));
    source.addEventListener("pause", this._onPlayStop.bind(this));
    if (!this._isSourceReady()) {
      source.addEventListener("canplay", this._onCanPlay);
      source.addEventListener("canplaythrough", this._onCanPlay);
      source.addEventListener("error", this._onError, true);
    } else {
      this._onCanPlay();
    }
    this._load = new Promise((resolve2) => {
      if (this.valid) {
        resolve2(this);
      } else {
        this._resolve = resolve2;
        source.load();
      }
    });
    return this._load;
  }
  _onError(event) {
    this.source.removeEventListener("error", this._onError, true);
    this.onError.emit(event);
  }
  _isSourcePlaying() {
    const source = this.source;
    return !source.paused && !source.ended && this._isSourceReady();
  }
  _isSourceReady() {
    const source = this.source;
    return source.readyState > 2;
  }
  _onPlayStart() {
    if (!this.valid) {
      this._onCanPlay();
    }
    if (this.autoUpdate && !this._isConnectedToTicker) {
      Ticker.shared.add(this.update, this);
      this._isConnectedToTicker = true;
    }
  }
  _onPlayStop() {
    if (this._isConnectedToTicker) {
      Ticker.shared.remove(this.update, this);
      this._isConnectedToTicker = false;
    }
  }
  _onCanPlay() {
    const source = this.source;
    source.removeEventListener("canplay", this._onCanPlay);
    source.removeEventListener("canplaythrough", this._onCanPlay);
    const valid = this.valid;
    this.resize(source.videoWidth, source.videoHeight);
    if (!valid && this._resolve) {
      this._resolve(this);
      this._resolve = null;
    }
    if (this._isSourcePlaying()) {
      this._onPlayStart();
    } else if (this.autoPlay) {
      source.play();
    }
  }
  dispose() {
    if (this._isConnectedToTicker) {
      Ticker.shared.remove(this.update, this);
      this._isConnectedToTicker = false;
    }
    const source = this.source;
    if (source) {
      source.removeEventListener("error", this._onError, true);
      source.pause();
      source.src = "";
      source.load();
    }
    super.dispose();
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    if (value !== this._autoUpdate) {
      this._autoUpdate = value;
      if (!this._autoUpdate && this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      } else if (this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying()) {
        Ticker.shared.add(this.update, this);
        this._isConnectedToTicker = true;
      }
    }
  }
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(value) {
    if (value !== this._updateFPS) {
      this._updateFPS = value;
    }
  }
  static test(source, extension) {
    return globalThis.HTMLVideoElement && source instanceof HTMLVideoElement || _VideoResource.TYPES.includes(extension);
  }
};
var VideoResource = _VideoResource;
VideoResource.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"];
VideoResource.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};

// node_modules/@pixi/core/lib/textures/resources/ImageBitmapResource.mjs
var ImageBitmapResource = class extends BaseImageResource {
  constructor(source, options) {
    var __super = (...args) => {
      super(...args);
    };
    options = options || {};
    if (typeof source === "string") {
      __super(ImageBitmapResource.EMPTY);
      this.url = source;
    } else {
      __super(source);
      this.url = null;
    }
    this.crossOrigin = options.crossOrigin ?? true;
    this.alphaMode = typeof options.alphaMode === "number" ? options.alphaMode : null;
    this._load = null;
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    this._load = new Promise(async (resolve2, reject) => {
      if (this.url === null) {
        resolve2(this);
        return;
      }
      try {
        const response = await settings.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const imageBlob = await response.blob();
        if (this.destroyed)
          return;
        const imageBitmap = await createImageBitmap(imageBlob, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed)
          return;
        this.source = imageBitmap;
        this.update();
        resolve2(this);
      } catch (e) {
        if (this.destroyed)
          return;
        reject(e);
        this.onError.emit(e);
      }
    });
    return this._load;
  }
  upload(renderer, baseTexture, glTexture) {
    if (!(this.source instanceof ImageBitmap)) {
      this.load();
      return false;
    }
    if (typeof this.alphaMode === "number") {
      baseTexture.alphaMode = this.alphaMode;
    }
    return super.upload(renderer, baseTexture, glTexture);
  }
  dispose() {
    if (this.source instanceof ImageBitmap) {
      this.source.close();
    }
    super.dispose();
    this._load = null;
  }
  static test(source) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap !== "undefined" && (typeof source === "string" || source instanceof ImageBitmap);
  }
  static get EMPTY() {
    ImageBitmapResource._EMPTY = ImageBitmapResource._EMPTY ?? settings.ADAPTER.createCanvas(0, 0);
    return ImageBitmapResource._EMPTY;
  }
};

// node_modules/@pixi/core/lib/textures/resources/index.mjs
INSTALLED.push(ImageBitmapResource, ImageResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);

// node_modules/@pixi/core/lib/textures/resources/DepthResource.mjs
var DepthResource = class extends BufferResource {
  upload(renderer, baseTexture, glTexture) {
    const gl = renderer.gl;
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    if (glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
    }
    return true;
  }
};

// node_modules/@pixi/core/lib/framebuffer/Framebuffer.mjs
var Framebuffer = class {
  constructor(width, height) {
    this.width = Math.round(width || 100);
    this.height = Math.round(height || 100);
    this.stencil = false;
    this.depth = false;
    this.dirtyId = 0;
    this.dirtyFormat = 0;
    this.dirtySize = 0;
    this.depthTexture = null;
    this.colorTextures = [];
    this.glFramebuffers = {};
    this.disposeRunner = new Runner("disposeFramebuffer");
    this.multisample = MSAA_QUALITY.NONE;
  }
  get colorTexture() {
    return this.colorTextures[0];
  }
  addColorTexture(index = 0, texture) {
    this.colorTextures[index] = texture || new BaseTexture(null, {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      mipmap: MIPMAP_MODES.OFF,
      width: this.width,
      height: this.height
    });
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  addDepthTexture(texture) {
    this.depthTexture = texture || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: MIPMAP_MODES.OFF,
      format: FORMATS.DEPTH_COMPONENT,
      type: TYPES.UNSIGNED_SHORT
    });
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  enableDepth() {
    this.depth = true;
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  enableStencil() {
    this.stencil = true;
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  resize(width, height) {
    width = Math.round(width);
    height = Math.round(height);
    if (width === this.width && height === this.height)
      return;
    this.width = width;
    this.height = height;
    this.dirtyId++;
    this.dirtySize++;
    for (let i = 0; i < this.colorTextures.length; i++) {
      const texture = this.colorTextures[i];
      const resolution = texture.resolution;
      texture.setSize(width / resolution, height / resolution);
    }
    if (this.depthTexture) {
      const resolution = this.depthTexture.resolution;
      this.depthTexture.setSize(width / resolution, height / resolution);
    }
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroyDepthTexture() {
    if (this.depthTexture) {
      this.depthTexture.destroy();
      this.depthTexture = null;
      ++this.dirtyId;
      ++this.dirtyFormat;
    }
  }
};

// node_modules/@pixi/core/lib/renderTexture/BaseRenderTexture.mjs
var BaseRenderTexture = class extends BaseTexture {
  constructor(options = {}) {
    if (typeof options === "number") {
      const width = arguments[0];
      const height = arguments[1];
      const scaleMode = arguments[2];
      const resolution = arguments[3];
      options = { width, height, scaleMode, resolution };
    }
    options.width = options.width || 100;
    options.height = options.height || 100;
    options.multisample ?? (options.multisample = MSAA_QUALITY.NONE);
    super(null, options);
    this.mipmap = MIPMAP_MODES.OFF;
    this.valid = true;
    this.clearColor = [0, 0, 0, 0];
    this.framebuffer = new Framebuffer(this.realWidth, this.realHeight).addColorTexture(0, this);
    this.framebuffer.multisample = options.multisample;
    this.maskStack = [];
    this.filterStack = [{}];
  }
  resize(desiredWidth, desiredHeight) {
    this.framebuffer.resize(desiredWidth * this.resolution, desiredHeight * this.resolution);
    this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }
  dispose() {
    this.framebuffer.dispose();
    super.dispose();
  }
  destroy() {
    super.destroy();
    this.framebuffer.destroyDepthTexture();
    this.framebuffer = null;
  }
};

// node_modules/@pixi/core/lib/textures/TextureUvs.mjs
var TextureUvs = class {
  constructor() {
    this.x0 = 0;
    this.y0 = 0;
    this.x1 = 1;
    this.y1 = 0;
    this.x2 = 1;
    this.y2 = 1;
    this.x3 = 0;
    this.y3 = 1;
    this.uvsFloat32 = new Float32Array(8);
  }
  set(frame, baseFrame, rotate) {
    const tw = baseFrame.width;
    const th = baseFrame.height;
    if (rotate) {
      const w2 = frame.width / 2 / tw;
      const h2 = frame.height / 2 / th;
      const cX = frame.x / tw + w2;
      const cY = frame.y / th + h2;
      rotate = groupD8.add(rotate, groupD8.NW);
      this.x0 = cX + w2 * groupD8.uX(rotate);
      this.y0 = cY + h2 * groupD8.uY(rotate);
      rotate = groupD8.add(rotate, 2);
      this.x1 = cX + w2 * groupD8.uX(rotate);
      this.y1 = cY + h2 * groupD8.uY(rotate);
      rotate = groupD8.add(rotate, 2);
      this.x2 = cX + w2 * groupD8.uX(rotate);
      this.y2 = cY + h2 * groupD8.uY(rotate);
      rotate = groupD8.add(rotate, 2);
      this.x3 = cX + w2 * groupD8.uX(rotate);
      this.y3 = cY + h2 * groupD8.uY(rotate);
    } else {
      this.x0 = frame.x / tw;
      this.y0 = frame.y / th;
      this.x1 = (frame.x + frame.width) / tw;
      this.y1 = frame.y / th;
      this.x2 = (frame.x + frame.width) / tw;
      this.y2 = (frame.y + frame.height) / th;
      this.x3 = frame.x / tw;
      this.y3 = (frame.y + frame.height) / th;
    }
    this.uvsFloat32[0] = this.x0;
    this.uvsFloat32[1] = this.y0;
    this.uvsFloat32[2] = this.x1;
    this.uvsFloat32[3] = this.y1;
    this.uvsFloat32[4] = this.x2;
    this.uvsFloat32[5] = this.y2;
    this.uvsFloat32[6] = this.x3;
    this.uvsFloat32[7] = this.y3;
  }
};

// node_modules/@pixi/core/lib/textures/Texture.mjs
var DEFAULT_UVS = new TextureUvs();
function removeAllHandlers(tex) {
  tex.destroy = function _emptyDestroy() {
  };
  tex.on = function _emptyOn() {
  };
  tex.once = function _emptyOnce() {
  };
  tex.emit = function _emptyEmit() {
  };
}
var Texture = class extends import_eventemitter3.default {
  constructor(baseTexture, frame, orig, trim, rotate, anchor) {
    super();
    this.noFrame = false;
    if (!frame) {
      this.noFrame = true;
      frame = new Rectangle(0, 0, 1, 1);
    }
    if (baseTexture instanceof Texture) {
      baseTexture = baseTexture.baseTexture;
    }
    this.baseTexture = baseTexture;
    this._frame = frame;
    this.trim = trim;
    this.valid = false;
    this._uvs = DEFAULT_UVS;
    this.uvMatrix = null;
    this.orig = orig || frame;
    this._rotate = Number(rotate || 0);
    if (rotate === true) {
      this._rotate = 2;
    } else if (this._rotate % 2 !== 0) {
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    }
    this.defaultAnchor = anchor ? new Point(anchor.x, anchor.y) : new Point(0, 0);
    this._updateID = 0;
    this.textureCacheIds = [];
    if (!baseTexture.valid) {
      baseTexture.once("loaded", this.onBaseTextureUpdated, this);
    } else if (this.noFrame) {
      if (baseTexture.valid) {
        this.onBaseTextureUpdated(baseTexture);
      }
    } else {
      this.frame = frame;
    }
    if (this.noFrame) {
      baseTexture.on("update", this.onBaseTextureUpdated, this);
    }
  }
  update() {
    if (this.baseTexture.resource) {
      this.baseTexture.resource.update();
    }
  }
  onBaseTextureUpdated(baseTexture) {
    if (this.noFrame) {
      if (!this.baseTexture.valid) {
        return;
      }
      this._frame.width = baseTexture.width;
      this._frame.height = baseTexture.height;
      this.valid = true;
      this.updateUvs();
    } else {
      this.frame = this._frame;
    }
    this.emit("update", this);
  }
  destroy(destroyBase) {
    if (this.baseTexture) {
      if (destroyBase) {
        const { resource } = this.baseTexture;
        if (resource?.url && TextureCache[resource.url]) {
          Texture.removeFromCache(resource.url);
        }
        this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this);
      this.baseTexture.off("update", this.onBaseTextureUpdated, this);
      this.baseTexture = null;
    }
    this._frame = null;
    this._uvs = null;
    this.trim = null;
    this.orig = null;
    this.valid = false;
    Texture.removeFromCache(this);
    this.textureCacheIds = null;
  }
  clone() {
    const clonedFrame = this._frame.clone();
    const clonedOrig = this._frame === this.orig ? clonedFrame : this.orig.clone();
    const clonedTexture = new Texture(this.baseTexture, !this.noFrame && clonedFrame, clonedOrig, this.trim?.clone(), this.rotate, this.defaultAnchor);
    if (this.noFrame) {
      clonedTexture._frame = clonedFrame;
    }
    return clonedTexture;
  }
  updateUvs() {
    if (this._uvs === DEFAULT_UVS) {
      this._uvs = new TextureUvs();
    }
    this._uvs.set(this._frame, this.baseTexture, this.rotate);
    this._updateID++;
  }
  static from(source, options = {}, strict = settings.STRICT_TEXTURE_CACHE) {
    const isFrame = typeof source === "string";
    let cacheId = null;
    if (isFrame) {
      cacheId = source;
    } else if (source instanceof BaseTexture) {
      if (!source.cacheId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source.cacheId = `${prefix}-${uid()}`;
        BaseTexture.addToCache(source, source.cacheId);
      }
      cacheId = source.cacheId;
    } else {
      if (!source._pixiId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source._pixiId = `${prefix}_${uid()}`;
      }
      cacheId = source._pixiId;
    }
    let texture = TextureCache[cacheId];
    if (isFrame && strict && !texture) {
      throw new Error(`The cacheId "${cacheId}" does not exist in TextureCache.`);
    }
    if (!texture && !(source instanceof BaseTexture)) {
      if (!options.resolution) {
        options.resolution = getResolutionOfUrl(source);
      }
      texture = new Texture(new BaseTexture(source, options));
      texture.baseTexture.cacheId = cacheId;
      BaseTexture.addToCache(texture.baseTexture, cacheId);
      Texture.addToCache(texture, cacheId);
    } else if (!texture && source instanceof BaseTexture) {
      texture = new Texture(source);
      Texture.addToCache(texture, cacheId);
    }
    return texture;
  }
  static fromURL(url2, options) {
    const resourceOptions = Object.assign({ autoLoad: false }, options?.resourceOptions);
    const texture = Texture.from(url2, Object.assign({ resourceOptions }, options), false);
    const resource = texture.baseTexture.resource;
    if (texture.baseTexture.valid) {
      return Promise.resolve(texture);
    }
    return resource.load().then(() => Promise.resolve(texture));
  }
  static fromBuffer(buffer, width, height, options) {
    return new Texture(BaseTexture.fromBuffer(buffer, width, height, options));
  }
  static fromLoader(source, imageUrl, name, options) {
    const baseTexture = new BaseTexture(source, Object.assign({
      scaleMode: settings.SCALE_MODE,
      resolution: getResolutionOfUrl(imageUrl)
    }, options));
    const { resource } = baseTexture;
    if (resource instanceof ImageResource) {
      resource.url = imageUrl;
    }
    const texture = new Texture(baseTexture);
    if (!name) {
      name = imageUrl;
    }
    BaseTexture.addToCache(texture.baseTexture, name);
    Texture.addToCache(texture, name);
    if (name !== imageUrl) {
      BaseTexture.addToCache(texture.baseTexture, imageUrl);
      Texture.addToCache(texture, imageUrl);
    }
    if (texture.baseTexture.valid) {
      return Promise.resolve(texture);
    }
    return new Promise((resolve2) => {
      texture.baseTexture.once("loaded", () => resolve2(texture));
    });
  }
  static addToCache(texture, id) {
    if (id) {
      if (!texture.textureCacheIds.includes(id)) {
        texture.textureCacheIds.push(id);
      }
      if (TextureCache[id]) {
        console.warn(`Texture added to the cache with an id [${id}] that already had an entry`);
      }
      TextureCache[id] = texture;
    }
  }
  static removeFromCache(texture) {
    if (typeof texture === "string") {
      const textureFromCache = TextureCache[texture];
      if (textureFromCache) {
        const index = textureFromCache.textureCacheIds.indexOf(texture);
        if (index > -1) {
          textureFromCache.textureCacheIds.splice(index, 1);
        }
        delete TextureCache[texture];
        return textureFromCache;
      }
    } else if (texture?.textureCacheIds) {
      for (let i = 0; i < texture.textureCacheIds.length; ++i) {
        if (TextureCache[texture.textureCacheIds[i]] === texture) {
          delete TextureCache[texture.textureCacheIds[i]];
        }
      }
      texture.textureCacheIds.length = 0;
      return texture;
    }
    return null;
  }
  get resolution() {
    return this.baseTexture.resolution;
  }
  get frame() {
    return this._frame;
  }
  set frame(frame) {
    this._frame = frame;
    this.noFrame = false;
    const { x, y, width, height } = frame;
    const xNotFit = x + width > this.baseTexture.width;
    const yNotFit = y + height > this.baseTexture.height;
    if (xNotFit || yNotFit) {
      const relationship = xNotFit && yNotFit ? "and" : "or";
      const errorX = `X: ${x} + ${width} = ${x + width} > ${this.baseTexture.width}`;
      const errorY = `Y: ${y} + ${height} = ${y + height} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${errorX} ${relationship} ${errorY}`);
    }
    this.valid = width && height && this.baseTexture.valid;
    if (!this.trim && !this.rotate) {
      this.orig = frame;
    }
    if (this.valid) {
      this.updateUvs();
    }
  }
  get rotate() {
    return this._rotate;
  }
  set rotate(rotate) {
    this._rotate = rotate;
    if (this.valid) {
      this.updateUvs();
    }
  }
  get width() {
    return this.orig.width;
  }
  get height() {
    return this.orig.height;
  }
  castToBaseTexture() {
    return this.baseTexture;
  }
  static get EMPTY() {
    if (!Texture._EMPTY) {
      Texture._EMPTY = new Texture(new BaseTexture());
      removeAllHandlers(Texture._EMPTY);
      removeAllHandlers(Texture._EMPTY.baseTexture);
    }
    return Texture._EMPTY;
  }
  static get WHITE() {
    if (!Texture._WHITE) {
      const canvas = settings.ADAPTER.createCanvas(16, 16);
      const context2 = canvas.getContext("2d");
      canvas.width = 16;
      canvas.height = 16;
      context2.fillStyle = "white";
      context2.fillRect(0, 0, 16, 16);
      Texture._WHITE = new Texture(BaseTexture.from(canvas));
      removeAllHandlers(Texture._WHITE);
      removeAllHandlers(Texture._WHITE.baseTexture);
    }
    return Texture._WHITE;
  }
};

// node_modules/@pixi/core/lib/renderTexture/RenderTexture.mjs
var RenderTexture = class extends Texture {
  constructor(baseRenderTexture, frame) {
    super(baseRenderTexture, frame);
    this.valid = true;
    this.filterFrame = null;
    this.filterPoolKey = null;
    this.updateUvs();
  }
  get framebuffer() {
    return this.baseTexture.framebuffer;
  }
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(value) {
    this.framebuffer.multisample = value;
  }
  resize(desiredWidth, desiredHeight, resizeBaseTexture = true) {
    const resolution = this.baseTexture.resolution;
    const width = Math.round(desiredWidth * resolution) / resolution;
    const height = Math.round(desiredHeight * resolution) / resolution;
    this.valid = width > 0 && height > 0;
    this._frame.width = this.orig.width = width;
    this._frame.height = this.orig.height = height;
    if (resizeBaseTexture) {
      this.baseTexture.resize(width, height);
    }
    this.updateUvs();
  }
  setResolution(resolution) {
    const { baseTexture } = this;
    if (baseTexture.resolution === resolution) {
      return;
    }
    baseTexture.setResolution(resolution);
    this.resize(baseTexture.width, baseTexture.height, false);
  }
  static create(options) {
    return new RenderTexture(new BaseRenderTexture(options));
  }
};

// node_modules/@pixi/core/lib/renderTexture/RenderTexturePool.mjs
var RenderTexturePool = class {
  constructor(textureOptions) {
    this.texturePool = {};
    this.textureOptions = textureOptions || {};
    this.enableFullScreen = false;
    this._pixelsWidth = 0;
    this._pixelsHeight = 0;
  }
  createTexture(realWidth, realHeight, multisample = MSAA_QUALITY.NONE) {
    const baseRenderTexture = new BaseRenderTexture(Object.assign({
      width: realWidth,
      height: realHeight,
      resolution: 1,
      multisample
    }, this.textureOptions));
    return new RenderTexture(baseRenderTexture);
  }
  getOptimalTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
    let key;
    minWidth = Math.ceil(minWidth * resolution - 1e-6);
    minHeight = Math.ceil(minHeight * resolution - 1e-6);
    if (!this.enableFullScreen || minWidth !== this._pixelsWidth || minHeight !== this._pixelsHeight) {
      minWidth = nextPow2(minWidth);
      minHeight = nextPow2(minHeight);
      key = ((minWidth & 65535) << 16 | minHeight & 65535) >>> 0;
      if (multisample > 1) {
        key += multisample * 4294967296;
      }
    } else {
      key = multisample > 1 ? -multisample : -1;
    }
    if (!this.texturePool[key]) {
      this.texturePool[key] = [];
    }
    let renderTexture = this.texturePool[key].pop();
    if (!renderTexture) {
      renderTexture = this.createTexture(minWidth, minHeight, multisample);
    }
    renderTexture.filterPoolKey = key;
    renderTexture.setResolution(resolution);
    return renderTexture;
  }
  getFilterTexture(input, resolution, multisample) {
    const filterTexture = this.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
    filterTexture.filterFrame = input.filterFrame;
    return filterTexture;
  }
  returnTexture(renderTexture) {
    const key = renderTexture.filterPoolKey;
    renderTexture.filterFrame = null;
    this.texturePool[key].push(renderTexture);
  }
  returnFilterTexture(renderTexture) {
    this.returnTexture(renderTexture);
  }
  clear(destroyTextures) {
    destroyTextures = destroyTextures !== false;
    if (destroyTextures) {
      for (const i in this.texturePool) {
        const textures = this.texturePool[i];
        if (textures) {
          for (let j = 0; j < textures.length; j++) {
            textures[j].destroy(true);
          }
        }
      }
    }
    this.texturePool = {};
  }
  setScreenSize(size) {
    if (size.width === this._pixelsWidth && size.height === this._pixelsHeight) {
      return;
    }
    this.enableFullScreen = size.width > 0 && size.height > 0;
    for (const i in this.texturePool) {
      if (!(Number(i) < 0)) {
        continue;
      }
      const textures = this.texturePool[i];
      if (textures) {
        for (let j = 0; j < textures.length; j++) {
          textures[j].destroy(true);
        }
      }
      this.texturePool[i] = [];
    }
    this._pixelsWidth = size.width;
    this._pixelsHeight = size.height;
  }
};
RenderTexturePool.SCREEN_KEY = -1;

// node_modules/@pixi/core/lib/geometry/Attribute.mjs
var Attribute = class {
  constructor(buffer, size = 0, normalized = false, type = TYPES.FLOAT, stride, start, instance) {
    this.buffer = buffer;
    this.size = size;
    this.normalized = normalized;
    this.type = type;
    this.stride = stride;
    this.start = start;
    this.instance = instance;
  }
  destroy() {
    this.buffer = null;
  }
  static from(buffer, size, normalized, type, stride) {
    return new Attribute(buffer, size, normalized, type, stride);
  }
};

// node_modules/@pixi/core/lib/geometry/Buffer.mjs
var UID = 0;
var Buffer2 = class {
  constructor(data, _static = true, index = false) {
    this.data = data || new Float32Array(1);
    this._glBuffers = {};
    this._updateID = 0;
    this.index = index;
    this.static = _static;
    this.id = UID++;
    this.disposeRunner = new Runner("disposeBuffer");
  }
  update(data) {
    if (data instanceof Array) {
      data = new Float32Array(data);
    }
    this.data = data || this.data;
    this._updateID++;
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroy() {
    this.dispose();
    this.data = null;
  }
  set index(value) {
    this.type = value ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
  }
  get index() {
    return this.type === BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
  }
  static from(data) {
    if (data instanceof Array) {
      data = new Float32Array(data);
    }
    return new Buffer2(data);
  }
};

// node_modules/@pixi/core/lib/geometry/utils/interleaveTypedArrays.mjs
var map = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function interleaveTypedArrays2(arrays, sizes) {
  let outSize = 0;
  let stride = 0;
  const views = {};
  for (let i = 0; i < arrays.length; i++) {
    stride += sizes[i];
    outSize += arrays[i].length;
  }
  const buffer = new ArrayBuffer(outSize * 4);
  let out = null;
  let littleOffset = 0;
  for (let i = 0; i < arrays.length; i++) {
    const size = sizes[i];
    const array = arrays[i];
    const type = getBufferType(array);
    if (!views[type]) {
      views[type] = new map[type](buffer);
    }
    out = views[type];
    for (let j = 0; j < array.length; j++) {
      const indexStart = (j / size | 0) * stride + littleOffset;
      const index = j % size;
      out[indexStart + index] = array[j];
    }
    littleOffset += size;
  }
  return new Float32Array(buffer);
}

// node_modules/@pixi/core/lib/geometry/Geometry.mjs
var byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 };
var UID2 = 0;
var map2 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};
var Geometry = class {
  constructor(buffers = [], attributes = {}) {
    this.buffers = buffers;
    this.indexBuffer = null;
    this.attributes = attributes;
    this.glVertexArrayObjects = {};
    this.id = UID2++;
    this.instanced = false;
    this.instanceCount = 1;
    this.disposeRunner = new Runner("disposeGeometry");
    this.refCount = 0;
  }
  addAttribute(id, buffer, size = 0, normalized = false, type, stride, start, instance = false) {
    if (!buffer) {
      throw new Error("You must pass a buffer when creating an attribute");
    }
    if (!(buffer instanceof Buffer2)) {
      if (buffer instanceof Array) {
        buffer = new Float32Array(buffer);
      }
      buffer = new Buffer2(buffer);
    }
    const ids = id.split("|");
    if (ids.length > 1) {
      for (let i = 0; i < ids.length; i++) {
        this.addAttribute(ids[i], buffer, size, normalized, type);
      }
      return this;
    }
    let bufferIndex = this.buffers.indexOf(buffer);
    if (bufferIndex === -1) {
      this.buffers.push(buffer);
      bufferIndex = this.buffers.length - 1;
    }
    this.attributes[id] = new Attribute(bufferIndex, size, normalized, type, stride, start, instance);
    this.instanced = this.instanced || instance;
    return this;
  }
  getAttribute(id) {
    return this.attributes[id];
  }
  getBuffer(id) {
    return this.buffers[this.getAttribute(id).buffer];
  }
  addIndex(buffer) {
    if (!(buffer instanceof Buffer2)) {
      if (buffer instanceof Array) {
        buffer = new Uint16Array(buffer);
      }
      buffer = new Buffer2(buffer);
    }
    buffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
    this.indexBuffer = buffer;
    if (!this.buffers.includes(buffer)) {
      this.buffers.push(buffer);
    }
    return this;
  }
  getIndex() {
    return this.indexBuffer;
  }
  interleave() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    const arrays = [];
    const sizes = [];
    const interleavedBuffer = new Buffer2();
    let i;
    for (i in this.attributes) {
      const attribute = this.attributes[i];
      const buffer = this.buffers[attribute.buffer];
      arrays.push(buffer.data);
      sizes.push(attribute.size * byteSizeMap[attribute.type] / 4);
      attribute.buffer = 0;
    }
    interleavedBuffer.data = interleaveTypedArrays2(arrays, sizes);
    for (i = 0; i < this.buffers.length; i++) {
      if (this.buffers[i] !== this.indexBuffer) {
        this.buffers[i].destroy();
      }
    }
    this.buffers = [interleavedBuffer];
    if (this.indexBuffer) {
      this.buffers.push(this.indexBuffer);
    }
    return this;
  }
  getSize() {
    for (const i in this.attributes) {
      const attribute = this.attributes[i];
      const buffer = this.buffers[attribute.buffer];
      return buffer.data.length / (attribute.stride / 4 || attribute.size);
    }
    return 0;
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroy() {
    this.dispose();
    this.buffers = null;
    this.indexBuffer = null;
    this.attributes = null;
  }
  clone() {
    const geometry = new Geometry();
    for (let i = 0; i < this.buffers.length; i++) {
      geometry.buffers[i] = new Buffer2(this.buffers[i].data.slice(0));
    }
    for (const i in this.attributes) {
      const attrib = this.attributes[i];
      geometry.attributes[i] = new Attribute(attrib.buffer, attrib.size, attrib.normalized, attrib.type, attrib.stride, attrib.start, attrib.instance);
    }
    if (this.indexBuffer) {
      geometry.indexBuffer = geometry.buffers[this.buffers.indexOf(this.indexBuffer)];
      geometry.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
    }
    return geometry;
  }
  static merge(geometries) {
    const geometryOut = new Geometry();
    const arrays = [];
    const sizes = [];
    const offsets = [];
    let geometry;
    for (let i = 0; i < geometries.length; i++) {
      geometry = geometries[i];
      for (let j = 0; j < geometry.buffers.length; j++) {
        sizes[j] = sizes[j] || 0;
        sizes[j] += geometry.buffers[j].data.length;
        offsets[j] = 0;
      }
    }
    for (let i = 0; i < geometry.buffers.length; i++) {
      arrays[i] = new map2[getBufferType(geometry.buffers[i].data)](sizes[i]);
      geometryOut.buffers[i] = new Buffer2(arrays[i]);
    }
    for (let i = 0; i < geometries.length; i++) {
      geometry = geometries[i];
      for (let j = 0; j < geometry.buffers.length; j++) {
        arrays[j].set(geometry.buffers[j].data, offsets[j]);
        offsets[j] += geometry.buffers[j].data.length;
      }
    }
    geometryOut.attributes = geometry.attributes;
    if (geometry.indexBuffer) {
      geometryOut.indexBuffer = geometryOut.buffers[geometry.buffers.indexOf(geometry.indexBuffer)];
      geometryOut.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
      let offset = 0;
      let stride = 0;
      let offset2 = 0;
      let bufferIndexToCount = 0;
      for (let i = 0; i < geometry.buffers.length; i++) {
        if (geometry.buffers[i] !== geometry.indexBuffer) {
          bufferIndexToCount = i;
          break;
        }
      }
      for (const i in geometry.attributes) {
        const attribute = geometry.attributes[i];
        if ((attribute.buffer | 0) === bufferIndexToCount) {
          stride += attribute.size * byteSizeMap[attribute.type] / 4;
        }
      }
      for (let i = 0; i < geometries.length; i++) {
        const indexBufferData = geometries[i].indexBuffer.data;
        for (let j = 0; j < indexBufferData.length; j++) {
          geometryOut.indexBuffer.data[j + offset2] += offset;
        }
        offset += geometries[i].buffers[bufferIndexToCount].data.length / stride;
        offset2 += indexBufferData.length;
      }
    }
    return geometryOut;
  }
};

// node_modules/@pixi/core/lib/utils/Quad.mjs
var Quad = class extends Geometry {
  constructor() {
    super();
    this.addAttribute("aVertexPosition", new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ])).addIndex([0, 1, 3, 2]);
  }
};

// node_modules/@pixi/core/lib/utils/QuadUv.mjs
var QuadUv = class extends Geometry {
  constructor() {
    super();
    this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]);
    this.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]);
    this.vertexBuffer = new Buffer2(this.vertices);
    this.uvBuffer = new Buffer2(this.uvs);
    this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
  }
  map(targetTextureFrame, destinationFrame) {
    let x = 0;
    let y = 0;
    this.uvs[0] = x;
    this.uvs[1] = y;
    this.uvs[2] = x + destinationFrame.width / targetTextureFrame.width;
    this.uvs[3] = y;
    this.uvs[4] = x + destinationFrame.width / targetTextureFrame.width;
    this.uvs[5] = y + destinationFrame.height / targetTextureFrame.height;
    this.uvs[6] = x;
    this.uvs[7] = y + destinationFrame.height / targetTextureFrame.height;
    x = destinationFrame.x;
    y = destinationFrame.y;
    this.vertices[0] = x;
    this.vertices[1] = y;
    this.vertices[2] = x + destinationFrame.width;
    this.vertices[3] = y;
    this.vertices[4] = x + destinationFrame.width;
    this.vertices[5] = y + destinationFrame.height;
    this.vertices[6] = x;
    this.vertices[7] = y + destinationFrame.height;
    this.invalidate();
    return this;
  }
  invalidate() {
    this.vertexBuffer._updateID++;
    this.uvBuffer._updateID++;
    return this;
  }
};

// node_modules/@pixi/core/lib/shader/UniformGroup.mjs
var UID3 = 0;
var UniformGroup = class {
  constructor(uniforms, isStatic, isUbo) {
    this.group = true;
    this.syncUniforms = {};
    this.dirtyId = 0;
    this.id = UID3++;
    this.static = !!isStatic;
    this.ubo = !!isUbo;
    if (uniforms instanceof Buffer2) {
      this.buffer = uniforms;
      this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER;
      this.autoManage = false;
      this.ubo = true;
    } else {
      this.uniforms = uniforms;
      if (this.ubo) {
        this.buffer = new Buffer2(new Float32Array(1));
        this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER;
        this.autoManage = true;
      }
    }
  }
  update() {
    this.dirtyId++;
    if (!this.autoManage && this.buffer) {
      this.buffer.update();
    }
  }
  add(name, uniforms, _static) {
    if (!this.ubo) {
      this.uniforms[name] = new UniformGroup(uniforms, _static);
    } else {
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
    }
  }
  static from(uniforms, _static, _ubo) {
    return new UniformGroup(uniforms, _static, _ubo);
  }
  static uboFrom(uniforms, _static) {
    return new UniformGroup(uniforms, _static ?? true, true);
  }
};

// node_modules/@pixi/core/lib/filters/FilterState.mjs
var FilterState = class {
  constructor() {
    this.renderTexture = null;
    this.target = null;
    this.legacy = false;
    this.resolution = 1;
    this.multisample = MSAA_QUALITY.NONE;
    this.sourceFrame = new Rectangle();
    this.destinationFrame = new Rectangle();
    this.bindingSourceFrame = new Rectangle();
    this.bindingDestinationFrame = new Rectangle();
    this.filters = [];
    this.transform = null;
  }
  clear() {
    this.target = null;
    this.filters = null;
    this.renderTexture = null;
  }
};

// node_modules/@pixi/core/lib/filters/FilterSystem.mjs
var tempPoints2 = [new Point(), new Point(), new Point(), new Point()];
var tempMatrix = new Matrix();
var FilterSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.defaultFilterStack = [{}];
    this.texturePool = new RenderTexturePool();
    this.statePool = [];
    this.quad = new Quad();
    this.quadUv = new QuadUv();
    this.tempRect = new Rectangle();
    this.activeState = {};
    this.globalUniforms = new UniformGroup({
      outputFrame: new Rectangle(),
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, true);
    this.forceClear = false;
    this.useMaxPadding = false;
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  push(target, filters) {
    const renderer = this.renderer;
    const filterStack = this.defaultFilterStack;
    const state = this.statePool.pop() || new FilterState();
    const renderTextureSystem = this.renderer.renderTexture;
    let resolution = filters[0].resolution;
    let multisample = filters[0].multisample;
    let padding = filters[0].padding;
    let autoFit = filters[0].autoFit;
    let legacy = filters[0].legacy ?? true;
    for (let i = 1; i < filters.length; i++) {
      const filter = filters[i];
      resolution = Math.min(resolution, filter.resolution);
      multisample = Math.min(multisample, filter.multisample);
      padding = this.useMaxPadding ? Math.max(padding, filter.padding) : padding + filter.padding;
      autoFit = autoFit && filter.autoFit;
      legacy = legacy || (filter.legacy ?? true);
    }
    if (filterStack.length === 1) {
      this.defaultFilterStack[0].renderTexture = renderTextureSystem.current;
    }
    filterStack.push(state);
    state.resolution = resolution;
    state.multisample = multisample;
    state.legacy = legacy;
    state.target = target;
    state.sourceFrame.copyFrom(target.filterArea || target.getBounds(true));
    state.sourceFrame.pad(padding);
    const sourceFrameProjected = this.tempRect.copyFrom(renderTextureSystem.sourceFrame);
    if (renderer.projection.transform) {
      this.transformAABB(tempMatrix.copyFrom(renderer.projection.transform).invert(), sourceFrameProjected);
    }
    if (autoFit) {
      state.sourceFrame.fit(sourceFrameProjected);
      if (state.sourceFrame.width <= 0 || state.sourceFrame.height <= 0) {
        state.sourceFrame.width = 0;
        state.sourceFrame.height = 0;
      }
    } else if (!state.sourceFrame.intersects(sourceFrameProjected)) {
      state.sourceFrame.width = 0;
      state.sourceFrame.height = 0;
    }
    this.roundFrame(state.sourceFrame, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
    state.renderTexture = this.getOptimalFilterTexture(state.sourceFrame.width, state.sourceFrame.height, resolution, multisample);
    state.filters = filters;
    state.destinationFrame.width = state.renderTexture.width;
    state.destinationFrame.height = state.renderTexture.height;
    const destinationFrame = this.tempRect;
    destinationFrame.x = 0;
    destinationFrame.y = 0;
    destinationFrame.width = state.sourceFrame.width;
    destinationFrame.height = state.sourceFrame.height;
    state.renderTexture.filterFrame = state.sourceFrame;
    state.bindingSourceFrame.copyFrom(renderTextureSystem.sourceFrame);
    state.bindingDestinationFrame.copyFrom(renderTextureSystem.destinationFrame);
    state.transform = renderer.projection.transform;
    renderer.projection.transform = null;
    renderTextureSystem.bind(state.renderTexture, state.sourceFrame, destinationFrame);
    renderer.framebuffer.clear(0, 0, 0, 0);
  }
  pop() {
    const filterStack = this.defaultFilterStack;
    const state = filterStack.pop();
    const filters = state.filters;
    this.activeState = state;
    const globalUniforms = this.globalUniforms.uniforms;
    globalUniforms.outputFrame = state.sourceFrame;
    globalUniforms.resolution = state.resolution;
    const inputSize = globalUniforms.inputSize;
    const inputPixel = globalUniforms.inputPixel;
    const inputClamp = globalUniforms.inputClamp;
    inputSize[0] = state.destinationFrame.width;
    inputSize[1] = state.destinationFrame.height;
    inputSize[2] = 1 / inputSize[0];
    inputSize[3] = 1 / inputSize[1];
    inputPixel[0] = Math.round(inputSize[0] * state.resolution);
    inputPixel[1] = Math.round(inputSize[1] * state.resolution);
    inputPixel[2] = 1 / inputPixel[0];
    inputPixel[3] = 1 / inputPixel[1];
    inputClamp[0] = 0.5 * inputPixel[2];
    inputClamp[1] = 0.5 * inputPixel[3];
    inputClamp[2] = state.sourceFrame.width * inputSize[2] - 0.5 * inputPixel[2];
    inputClamp[3] = state.sourceFrame.height * inputSize[3] - 0.5 * inputPixel[3];
    if (state.legacy) {
      const filterArea = globalUniforms.filterArea;
      filterArea[0] = state.destinationFrame.width;
      filterArea[1] = state.destinationFrame.height;
      filterArea[2] = state.sourceFrame.x;
      filterArea[3] = state.sourceFrame.y;
      globalUniforms.filterClamp = globalUniforms.inputClamp;
    }
    this.globalUniforms.update();
    const lastState = filterStack[filterStack.length - 1];
    this.renderer.framebuffer.blit();
    if (filters.length === 1) {
      filters[0].apply(this, state.renderTexture, lastState.renderTexture, CLEAR_MODES.BLEND, state);
      this.returnFilterTexture(state.renderTexture);
    } else {
      let flip = state.renderTexture;
      let flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
      flop.filterFrame = flip.filterFrame;
      let i = 0;
      for (i = 0; i < filters.length - 1; ++i) {
        if (i === 1 && state.multisample > 1) {
          flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
          flop.filterFrame = flip.filterFrame;
        }
        filters[i].apply(this, flip, flop, CLEAR_MODES.CLEAR, state);
        const t = flip;
        flip = flop;
        flop = t;
      }
      filters[i].apply(this, flip, lastState.renderTexture, CLEAR_MODES.BLEND, state);
      if (i > 1 && state.multisample > 1) {
        this.returnFilterTexture(state.renderTexture);
      }
      this.returnFilterTexture(flip);
      this.returnFilterTexture(flop);
    }
    state.clear();
    this.statePool.push(state);
  }
  bindAndClear(filterTexture, clearMode = CLEAR_MODES.CLEAR) {
    const {
      renderTexture: renderTextureSystem,
      state: stateSystem
    } = this.renderer;
    if (filterTexture === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
      this.renderer.projection.transform = this.activeState.transform;
    } else {
      this.renderer.projection.transform = null;
    }
    if (filterTexture?.filterFrame) {
      const destinationFrame = this.tempRect;
      destinationFrame.x = 0;
      destinationFrame.y = 0;
      destinationFrame.width = filterTexture.filterFrame.width;
      destinationFrame.height = filterTexture.filterFrame.height;
      renderTextureSystem.bind(filterTexture, filterTexture.filterFrame, destinationFrame);
    } else if (filterTexture !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
      renderTextureSystem.bind(filterTexture);
    } else {
      this.renderer.renderTexture.bind(filterTexture, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
    }
    const autoClear = stateSystem.stateId & 1 || this.forceClear;
    if (clearMode === CLEAR_MODES.CLEAR || clearMode === CLEAR_MODES.BLIT && autoClear) {
      this.renderer.framebuffer.clear(0, 0, 0, 0);
    }
  }
  applyFilter(filter, input, output, clearMode) {
    const renderer = this.renderer;
    renderer.state.set(filter.state);
    this.bindAndClear(output, clearMode);
    filter.uniforms.uSampler = input;
    filter.uniforms.filterGlobals = this.globalUniforms;
    renderer.shader.bind(filter);
    filter.legacy = !!filter.program.attributeData.aTextureCoord;
    if (filter.legacy) {
      this.quadUv.map(input._frame, input.filterFrame);
      renderer.geometry.bind(this.quadUv);
      renderer.geometry.draw(DRAW_MODES.TRIANGLES);
    } else {
      renderer.geometry.bind(this.quad);
      renderer.geometry.draw(DRAW_MODES.TRIANGLE_STRIP);
    }
  }
  calculateSpriteMatrix(outputMatrix, sprite) {
    const { sourceFrame, destinationFrame } = this.activeState;
    const { orig } = sprite._texture;
    const mappedMatrix = outputMatrix.set(destinationFrame.width, 0, 0, destinationFrame.height, sourceFrame.x, sourceFrame.y);
    const worldTransform = sprite.worldTransform.copyTo(Matrix.TEMP_MATRIX);
    worldTransform.invert();
    mappedMatrix.prepend(worldTransform);
    mappedMatrix.scale(1 / orig.width, 1 / orig.height);
    mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
    return mappedMatrix;
  }
  destroy() {
    this.renderer = null;
    this.texturePool.clear(false);
  }
  getOptimalFilterTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
    return this.texturePool.getOptimalTexture(minWidth, minHeight, resolution, multisample);
  }
  getFilterTexture(input, resolution, multisample) {
    if (typeof input === "number") {
      const swap = input;
      input = resolution;
      resolution = swap;
    }
    input = input || this.activeState.renderTexture;
    const filterTexture = this.texturePool.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
    filterTexture.filterFrame = input.filterFrame;
    return filterTexture;
  }
  returnFilterTexture(renderTexture) {
    this.texturePool.returnTexture(renderTexture);
  }
  emptyPool() {
    this.texturePool.clear(true);
  }
  resize() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  transformAABB(matrix, rect) {
    const lt = tempPoints2[0];
    const lb = tempPoints2[1];
    const rt = tempPoints2[2];
    const rb = tempPoints2[3];
    lt.set(rect.left, rect.top);
    lb.set(rect.left, rect.bottom);
    rt.set(rect.right, rect.top);
    rb.set(rect.right, rect.bottom);
    matrix.apply(lt, lt);
    matrix.apply(lb, lb);
    matrix.apply(rt, rt);
    matrix.apply(rb, rb);
    const x0 = Math.min(lt.x, lb.x, rt.x, rb.x);
    const y0 = Math.min(lt.y, lb.y, rt.y, rb.y);
    const x1 = Math.max(lt.x, lb.x, rt.x, rb.x);
    const y1 = Math.max(lt.y, lb.y, rt.y, rb.y);
    rect.x = x0;
    rect.y = y0;
    rect.width = x1 - x0;
    rect.height = y1 - y0;
  }
  roundFrame(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
    if (frame.width <= 0 || frame.height <= 0 || bindingSourceFrame.width <= 0 || bindingSourceFrame.height <= 0) {
      return;
    }
    if (transform) {
      const { a, b, c, d } = transform;
      if ((Math.abs(b) > 1e-4 || Math.abs(c) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(d) > 1e-4)) {
        return;
      }
    }
    transform = transform ? tempMatrix.copyFrom(transform) : tempMatrix.identity();
    transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
    this.transformAABB(transform, frame);
    frame.ceil(resolution);
    this.transformAABB(transform.invert(), frame);
  }
};
FilterSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "filter"
};
extensions.add(FilterSystem);

// node_modules/@pixi/core/lib/batch/ObjectRenderer.mjs
var ObjectRenderer = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  flush() {
  }
  destroy() {
    this.renderer = null;
  }
  start() {
  }
  stop() {
    this.flush();
  }
  render(_object) {
  }
};

// node_modules/@pixi/core/lib/batch/BatchSystem.mjs
var BatchSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.emptyRenderer = new ObjectRenderer(renderer);
    this.currentRenderer = this.emptyRenderer;
  }
  setObjectRenderer(objectRenderer) {
    if (this.currentRenderer === objectRenderer) {
      return;
    }
    this.currentRenderer.stop();
    this.currentRenderer = objectRenderer;
    this.currentRenderer.start();
  }
  flush() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  reset() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  copyBoundTextures(arr, maxTextures) {
    const { boundTextures } = this.renderer.texture;
    for (let i = maxTextures - 1; i >= 0; --i) {
      arr[i] = boundTextures[i] || null;
      if (arr[i]) {
        arr[i]._batchLocation = i;
      }
    }
  }
  boundArray(texArray, boundTextures, batchId, maxTextures) {
    const { elements, ids, count } = texArray;
    let j = 0;
    for (let i = 0; i < count; i++) {
      const tex = elements[i];
      const loc = tex._batchLocation;
      if (loc >= 0 && loc < maxTextures && boundTextures[loc] === tex) {
        ids[i] = loc;
        continue;
      }
      while (j < maxTextures) {
        const bound = boundTextures[j];
        if (bound && bound._batchEnabled === batchId && bound._batchLocation === j) {
          j++;
          continue;
        }
        ids[i] = j;
        tex._batchLocation = j;
        boundTextures[j] = tex;
        break;
      }
    }
  }
  destroy() {
    this.renderer = null;
  }
};
BatchSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "batch"
};
extensions.add(BatchSystem);

// node_modules/@pixi/core/lib/context/ContextSystem.mjs
var CONTEXT_UID_COUNTER = 0;
var ContextSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.webGLVersion = 1;
    this.extensions = {};
    this.supports = {
      uint32Indices: false
    };
    this.handleContextLost = this.handleContextLost.bind(this);
    this.handleContextRestored = this.handleContextRestored.bind(this);
  }
  get isLost() {
    return !this.gl || this.gl.isContextLost();
  }
  contextChange(gl) {
    this.gl = gl;
    this.renderer.gl = gl;
    this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    if (gl.isContextLost() && gl.getExtension("WEBGL_lose_context")) {
      gl.getExtension("WEBGL_lose_context").restoreContext();
    }
  }
  init(options) {
    if (options.context) {
      this.initFromContext(options.context);
    } else {
      const alpha = this.renderer.background.alpha < 1;
      const premultipliedAlpha = options.premultipliedAlpha ?? true;
      this.preserveDrawingBuffer = options.preserveDrawingBuffer;
      this.useContextAlpha = options.useContextAlpha;
      this.powerPreference = options.powerPreference;
      this.initFromOptions({
        alpha,
        premultipliedAlpha,
        antialias: options.antialias,
        stencil: true,
        preserveDrawingBuffer: options.preserveDrawingBuffer,
        powerPreference: options.powerPreference
      });
    }
  }
  initFromContext(gl) {
    this.gl = gl;
    this.validateContext(gl);
    this.renderer.gl = gl;
    this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    this.renderer.runners.contextChange.emit(gl);
    const view = this.renderer.view;
    if (view.addEventListener !== void 0) {
      view.addEventListener("webglcontextlost", this.handleContextLost, false);
      view.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    }
  }
  initFromOptions(options) {
    const gl = this.createContext(this.renderer.view, options);
    this.initFromContext(gl);
  }
  createContext(canvas, options) {
    let gl;
    if (settings.PREFER_ENV >= ENV.WEBGL2) {
      gl = canvas.getContext("webgl2", options);
    }
    if (gl) {
      this.webGLVersion = 2;
    } else {
      this.webGLVersion = 1;
      gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
      if (!gl) {
        throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      }
    }
    this.gl = gl;
    this.getExtensions();
    return this.gl;
  }
  getExtensions() {
    const { gl } = this;
    const common = {
      anisotropicFiltering: gl.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
      s3tc: gl.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      etc: gl.getExtension("WEBGL_compressed_texture_etc"),
      etc1: gl.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: gl.getExtension("WEBGL_compressed_texture_atc"),
      astc: gl.getExtension("WEBGL_compressed_texture_astc")
    };
    if (this.webGLVersion === 1) {
      Object.assign(this.extensions, common, {
        drawBuffers: gl.getExtension("WEBGL_draw_buffers"),
        depthTexture: gl.getExtension("WEBGL_depth_texture"),
        loseContext: gl.getExtension("WEBGL_lose_context"),
        vertexArrayObject: gl.getExtension("OES_vertex_array_object") || gl.getExtension("MOZ_OES_vertex_array_object") || gl.getExtension("WEBKIT_OES_vertex_array_object"),
        uint32ElementIndex: gl.getExtension("OES_element_index_uint"),
        floatTexture: gl.getExtension("OES_texture_float"),
        floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
        textureHalfFloat: gl.getExtension("OES_texture_half_float"),
        textureHalfFloatLinear: gl.getExtension("OES_texture_half_float_linear")
      });
    } else if (this.webGLVersion === 2) {
      Object.assign(this.extensions, common, {
        colorBufferFloat: gl.getExtension("EXT_color_buffer_float")
      });
    }
  }
  handleContextLost(event) {
    event.preventDefault();
  }
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl);
  }
  destroy() {
    const view = this.renderer.view;
    this.renderer = null;
    if (view.removeEventListener !== void 0) {
      view.removeEventListener("webglcontextlost", this.handleContextLost);
      view.removeEventListener("webglcontextrestored", this.handleContextRestored);
    }
    this.gl.useProgram(null);
    if (this.extensions.loseContext) {
      this.extensions.loseContext.loseContext();
    }
  }
  postrender() {
    if (this.renderer.objectRenderer.renderingToScreen) {
      this.gl.flush();
    }
  }
  validateContext(gl) {
    const attributes = gl.getContextAttributes();
    const isWebGl2 = "WebGL2RenderingContext" in globalThis && gl instanceof globalThis.WebGL2RenderingContext;
    if (isWebGl2) {
      this.webGLVersion = 2;
    }
    if (attributes && !attributes.stencil) {
      console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    }
    const hasuint32 = isWebGl2 || !!gl.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = hasuint32;
    if (!hasuint32) {
      console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }
  }
};
ContextSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "context"
};
extensions.add(ContextSystem);

// node_modules/@pixi/core/lib/framebuffer/GLFramebuffer.mjs
var GLFramebuffer = class {
  constructor(framebuffer) {
    this.framebuffer = framebuffer;
    this.stencil = null;
    this.dirtyId = -1;
    this.dirtyFormat = -1;
    this.dirtySize = -1;
    this.multisample = MSAA_QUALITY.NONE;
    this.msaaBuffer = null;
    this.blitFramebuffer = null;
    this.mipLevel = 0;
  }
};

// node_modules/@pixi/core/lib/framebuffer/FramebufferSystem.mjs
var tempRectangle = new Rectangle();
var FramebufferSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.managedFramebuffers = [];
    this.unknownFramebuffer = new Framebuffer(10, 10);
    this.msaaSamples = null;
  }
  contextChange() {
    const gl = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    this.current = this.unknownFramebuffer;
    this.viewport = new Rectangle();
    this.hasMRT = true;
    this.writeDepthTexture = true;
    this.disposeAll(true);
    if (this.renderer.context.webGLVersion === 1) {
      let nativeDrawBuffersExtension = this.renderer.context.extensions.drawBuffers;
      let nativeDepthTextureExtension = this.renderer.context.extensions.depthTexture;
      if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
        nativeDrawBuffersExtension = null;
        nativeDepthTextureExtension = null;
      }
      if (nativeDrawBuffersExtension) {
        gl.drawBuffers = (activeTextures) => nativeDrawBuffersExtension.drawBuffersWEBGL(activeTextures);
      } else {
        this.hasMRT = false;
        gl.drawBuffers = () => {
        };
      }
      if (!nativeDepthTextureExtension) {
        this.writeDepthTexture = false;
      }
    } else {
      this.msaaSamples = gl.getInternalformatParameter(gl.RENDERBUFFER, gl.RGBA8, gl.SAMPLES);
    }
  }
  bind(framebuffer, frame, mipLevel = 0) {
    const { gl } = this;
    if (framebuffer) {
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(framebuffer);
      if (this.current !== framebuffer) {
        this.current = framebuffer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer);
      }
      if (fbo.mipLevel !== mipLevel) {
        framebuffer.dirtyId++;
        framebuffer.dirtyFormat++;
        fbo.mipLevel = mipLevel;
      }
      if (fbo.dirtyId !== framebuffer.dirtyId) {
        fbo.dirtyId = framebuffer.dirtyId;
        if (fbo.dirtyFormat !== framebuffer.dirtyFormat) {
          fbo.dirtyFormat = framebuffer.dirtyFormat;
          fbo.dirtySize = framebuffer.dirtySize;
          this.updateFramebuffer(framebuffer, mipLevel);
        } else if (fbo.dirtySize !== framebuffer.dirtySize) {
          fbo.dirtySize = framebuffer.dirtySize;
          this.resizeFramebuffer(framebuffer);
        }
      }
      for (let i = 0; i < framebuffer.colorTextures.length; i++) {
        const tex = framebuffer.colorTextures[i];
        this.renderer.texture.unbind(tex.parentTextureArray || tex);
      }
      if (framebuffer.depthTexture) {
        this.renderer.texture.unbind(framebuffer.depthTexture);
      }
      if (frame) {
        const mipWidth = frame.width >> mipLevel;
        const mipHeight = frame.height >> mipLevel;
        const scale = mipWidth / frame.width;
        this.setViewport(frame.x * scale, frame.y * scale, mipWidth, mipHeight);
      } else {
        const mipWidth = framebuffer.width >> mipLevel;
        const mipHeight = framebuffer.height >> mipLevel;
        this.setViewport(0, 0, mipWidth, mipHeight);
      }
    } else {
      if (this.current) {
        this.current = null;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      if (frame) {
        this.setViewport(frame.x, frame.y, frame.width, frame.height);
      } else {
        this.setViewport(0, 0, this.renderer.width, this.renderer.height);
      }
    }
  }
  setViewport(x, y, width, height) {
    const v = this.viewport;
    x = Math.round(x);
    y = Math.round(y);
    width = Math.round(width);
    height = Math.round(height);
    if (v.width !== width || v.height !== height || v.x !== x || v.y !== y) {
      v.x = x;
      v.y = y;
      v.width = width;
      v.height = height;
      this.gl.viewport(x, y, width, height);
    }
  }
  get size() {
    if (this.current) {
      return { x: 0, y: 0, width: this.current.width, height: this.current.height };
    }
    return { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
  }
  clear(r, g, b, a, mask = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH) {
    const { gl } = this;
    gl.clearColor(r, g, b, a);
    gl.clear(mask);
  }
  initFramebuffer(framebuffer) {
    const { gl } = this;
    const fbo = new GLFramebuffer(gl.createFramebuffer());
    fbo.multisample = this.detectSamples(framebuffer.multisample);
    framebuffer.glFramebuffers[this.CONTEXT_UID] = fbo;
    this.managedFramebuffers.push(framebuffer);
    framebuffer.disposeRunner.add(this);
    return fbo;
  }
  resizeFramebuffer(framebuffer) {
    const { gl } = this;
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    if (fbo.stencil) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
      if (fbo.msaaBuffer) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, framebuffer.width, framebuffer.height);
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
      }
    }
    const colorTextures = framebuffer.colorTextures;
    let count = colorTextures.length;
    if (!gl.drawBuffers) {
      count = Math.min(count, 1);
    }
    for (let i = 0; i < count; i++) {
      const texture = colorTextures[i];
      const parentTexture = texture.parentTextureArray || texture;
      this.renderer.texture.bind(parentTexture, 0);
      if (i === 0 && fbo.msaaBuffer) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height);
      }
    }
    if (framebuffer.depthTexture && this.writeDepthTexture) {
      this.renderer.texture.bind(framebuffer.depthTexture, 0);
    }
  }
  updateFramebuffer(framebuffer, mipLevel) {
    const { gl } = this;
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    const colorTextures = framebuffer.colorTextures;
    let count = colorTextures.length;
    if (!gl.drawBuffers) {
      count = Math.min(count, 1);
    }
    if (fbo.multisample > 1 && this.canMultisampleFramebuffer(framebuffer)) {
      fbo.msaaBuffer = fbo.msaaBuffer || gl.createRenderbuffer();
    } else if (fbo.msaaBuffer) {
      gl.deleteRenderbuffer(fbo.msaaBuffer);
      fbo.msaaBuffer = null;
      if (fbo.blitFramebuffer) {
        fbo.blitFramebuffer.dispose();
        fbo.blitFramebuffer = null;
      }
    }
    const activeTextures = [];
    for (let i = 0; i < count; i++) {
      const texture = colorTextures[i];
      const parentTexture = texture.parentTextureArray || texture;
      this.renderer.texture.bind(parentTexture, 0);
      if (i === 0 && fbo.msaaBuffer) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, fbo.msaaBuffer);
      } else {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, texture.target, parentTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
        activeTextures.push(gl.COLOR_ATTACHMENT0 + i);
      }
    }
    if (activeTextures.length > 1) {
      gl.drawBuffers(activeTextures);
    }
    if (framebuffer.depthTexture) {
      const writeDepthTexture = this.writeDepthTexture;
      if (writeDepthTexture) {
        const depthTexture = framebuffer.depthTexture;
        this.renderer.texture.bind(depthTexture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
      }
    }
    if ((framebuffer.stencil || framebuffer.depth) && !(framebuffer.depthTexture && this.writeDepthTexture)) {
      fbo.stencil = fbo.stencil || gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
      if (fbo.msaaBuffer) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, framebuffer.width, framebuffer.height);
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
      }
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, fbo.stencil);
    } else if (fbo.stencil) {
      gl.deleteRenderbuffer(fbo.stencil);
      fbo.stencil = null;
    }
  }
  canMultisampleFramebuffer(framebuffer) {
    return this.renderer.context.webGLVersion !== 1 && framebuffer.colorTextures.length <= 1 && !framebuffer.depthTexture;
  }
  detectSamples(samples) {
    const { msaaSamples } = this;
    let res = MSAA_QUALITY.NONE;
    if (samples <= 1 || msaaSamples === null) {
      return res;
    }
    for (let i = 0; i < msaaSamples.length; i++) {
      if (msaaSamples[i] <= samples) {
        res = msaaSamples[i];
        break;
      }
    }
    if (res === 1) {
      res = MSAA_QUALITY.NONE;
    }
    return res;
  }
  blit(framebuffer, sourcePixels, destPixels) {
    const { current, renderer, gl, CONTEXT_UID } = this;
    if (renderer.context.webGLVersion !== 2) {
      return;
    }
    if (!current) {
      return;
    }
    const fbo = current.glFramebuffers[CONTEXT_UID];
    if (!fbo) {
      return;
    }
    if (!framebuffer) {
      if (!fbo.msaaBuffer) {
        return;
      }
      const colorTexture = current.colorTextures[0];
      if (!colorTexture) {
        return;
      }
      if (!fbo.blitFramebuffer) {
        fbo.blitFramebuffer = new Framebuffer(current.width, current.height);
        fbo.blitFramebuffer.addColorTexture(0, colorTexture);
      }
      framebuffer = fbo.blitFramebuffer;
      if (framebuffer.colorTextures[0] !== colorTexture) {
        framebuffer.colorTextures[0] = colorTexture;
        framebuffer.dirtyId++;
        framebuffer.dirtyFormat++;
      }
      if (framebuffer.width !== current.width || framebuffer.height !== current.height) {
        framebuffer.width = current.width;
        framebuffer.height = current.height;
        framebuffer.dirtyId++;
        framebuffer.dirtySize++;
      }
    }
    if (!sourcePixels) {
      sourcePixels = tempRectangle;
      sourcePixels.width = current.width;
      sourcePixels.height = current.height;
    }
    if (!destPixels) {
      destPixels = sourcePixels;
    }
    const sameSize = sourcePixels.width === destPixels.width && sourcePixels.height === destPixels.height;
    this.bind(framebuffer);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo.framebuffer);
    gl.blitFramebuffer(sourcePixels.left, sourcePixels.top, sourcePixels.right, sourcePixels.bottom, destPixels.left, destPixels.top, destPixels.right, destPixels.bottom, gl.COLOR_BUFFER_BIT, sameSize ? gl.NEAREST : gl.LINEAR);
  }
  disposeFramebuffer(framebuffer, contextLost) {
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    const gl = this.gl;
    if (!fbo) {
      return;
    }
    delete framebuffer.glFramebuffers[this.CONTEXT_UID];
    const index = this.managedFramebuffers.indexOf(framebuffer);
    if (index >= 0) {
      this.managedFramebuffers.splice(index, 1);
    }
    framebuffer.disposeRunner.remove(this);
    if (!contextLost) {
      gl.deleteFramebuffer(fbo.framebuffer);
      if (fbo.msaaBuffer) {
        gl.deleteRenderbuffer(fbo.msaaBuffer);
      }
      if (fbo.stencil) {
        gl.deleteRenderbuffer(fbo.stencil);
      }
    }
    if (fbo.blitFramebuffer) {
      fbo.blitFramebuffer.dispose();
    }
  }
  disposeAll(contextLost) {
    const list = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (let i = 0; i < list.length; i++) {
      this.disposeFramebuffer(list[i], contextLost);
    }
  }
  forceStencil() {
    const framebuffer = this.current;
    if (!framebuffer) {
      return;
    }
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    if (!fbo || fbo.stencil) {
      return;
    }
    framebuffer.stencil = true;
    const w = framebuffer.width;
    const h = framebuffer.height;
    const gl = this.gl;
    const stencil = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, stencil);
    if (fbo.msaaBuffer) {
      gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, w, h);
    } else {
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, w, h);
    }
    fbo.stencil = stencil;
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, stencil);
  }
  reset() {
    this.current = this.unknownFramebuffer;
    this.viewport = new Rectangle();
  }
  destroy() {
    this.renderer = null;
  }
};
FramebufferSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "framebuffer"
};
extensions.add(FramebufferSystem);

// node_modules/@pixi/core/lib/geometry/GeometrySystem.mjs
var byteSizeMap2 = { 5126: 4, 5123: 2, 5121: 1 };
var GeometrySystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this._activeGeometry = null;
    this._activeVao = null;
    this.hasVao = true;
    this.hasInstance = true;
    this.canUseUInt32ElementIndex = false;
    this.managedGeometries = {};
  }
  contextChange() {
    this.disposeAll(true);
    const gl = this.gl = this.renderer.gl;
    const context2 = this.renderer.context;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    if (context2.webGLVersion !== 2) {
      let nativeVaoExtension = this.renderer.context.extensions.vertexArrayObject;
      if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
        nativeVaoExtension = null;
      }
      if (nativeVaoExtension) {
        gl.createVertexArray = () => nativeVaoExtension.createVertexArrayOES();
        gl.bindVertexArray = (vao) => nativeVaoExtension.bindVertexArrayOES(vao);
        gl.deleteVertexArray = (vao) => nativeVaoExtension.deleteVertexArrayOES(vao);
      } else {
        this.hasVao = false;
        gl.createVertexArray = () => null;
        gl.bindVertexArray = () => null;
        gl.deleteVertexArray = () => null;
      }
    }
    if (context2.webGLVersion !== 2) {
      const instanceExt = gl.getExtension("ANGLE_instanced_arrays");
      if (instanceExt) {
        gl.vertexAttribDivisor = (a, b) => instanceExt.vertexAttribDivisorANGLE(a, b);
        gl.drawElementsInstanced = (a, b, c, d, e) => instanceExt.drawElementsInstancedANGLE(a, b, c, d, e);
        gl.drawArraysInstanced = (a, b, c, d) => instanceExt.drawArraysInstancedANGLE(a, b, c, d);
      } else {
        this.hasInstance = false;
      }
    }
    this.canUseUInt32ElementIndex = context2.webGLVersion === 2 || !!context2.extensions.uint32ElementIndex;
  }
  bind(geometry, shader) {
    shader = shader || this.renderer.shader.shader;
    const { gl } = this;
    let vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    let incRefCount = false;
    if (!vaos) {
      this.managedGeometries[geometry.id] = geometry;
      geometry.disposeRunner.add(this);
      geometry.glVertexArrayObjects[this.CONTEXT_UID] = vaos = {};
      incRefCount = true;
    }
    const vao = vaos[shader.program.id] || this.initGeometryVao(geometry, shader, incRefCount);
    this._activeGeometry = geometry;
    if (this._activeVao !== vao) {
      this._activeVao = vao;
      if (this.hasVao) {
        gl.bindVertexArray(vao);
      } else {
        this.activateVao(geometry, shader.program);
      }
    }
    this.updateBuffers();
  }
  reset() {
    this.unbind();
  }
  updateBuffers() {
    const geometry = this._activeGeometry;
    const bufferSystem = this.renderer.buffer;
    for (let i = 0; i < geometry.buffers.length; i++) {
      const buffer = geometry.buffers[i];
      bufferSystem.update(buffer);
    }
  }
  checkCompatibility(geometry, program) {
    const geometryAttributes = geometry.attributes;
    const shaderAttributes = program.attributeData;
    for (const j in shaderAttributes) {
      if (!geometryAttributes[j]) {
        throw new Error(`shader and geometry incompatible, geometry missing the "${j}" attribute`);
      }
    }
  }
  getSignature(geometry, program) {
    const attribs = geometry.attributes;
    const shaderAttributes = program.attributeData;
    const strings = ["g", geometry.id];
    for (const i in attribs) {
      if (shaderAttributes[i]) {
        strings.push(i, shaderAttributes[i].location);
      }
    }
    return strings.join("-");
  }
  initGeometryVao(geometry, shader, incRefCount = true) {
    const gl = this.gl;
    const CONTEXT_UID = this.CONTEXT_UID;
    const bufferSystem = this.renderer.buffer;
    const program = shader.program;
    if (!program.glPrograms[CONTEXT_UID]) {
      this.renderer.shader.generateProgram(shader);
    }
    this.checkCompatibility(geometry, program);
    const signature = this.getSignature(geometry, program);
    const vaoObjectHash = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    let vao = vaoObjectHash[signature];
    if (vao) {
      vaoObjectHash[program.id] = vao;
      return vao;
    }
    const buffers = geometry.buffers;
    const attributes = geometry.attributes;
    const tempStride = {};
    const tempStart = {};
    for (const j in buffers) {
      tempStride[j] = 0;
      tempStart[j] = 0;
    }
    for (const j in attributes) {
      if (!attributes[j].size && program.attributeData[j]) {
        attributes[j].size = program.attributeData[j].size;
      } else if (!attributes[j].size) {
        console.warn(`PIXI Geometry attribute '${j}' size cannot be determined (likely the bound shader does not have the attribute)`);
      }
      tempStride[attributes[j].buffer] += attributes[j].size * byteSizeMap2[attributes[j].type];
    }
    for (const j in attributes) {
      const attribute = attributes[j];
      const attribSize = attribute.size;
      if (attribute.stride === void 0) {
        if (tempStride[attribute.buffer] === attribSize * byteSizeMap2[attribute.type]) {
          attribute.stride = 0;
        } else {
          attribute.stride = tempStride[attribute.buffer];
        }
      }
      if (attribute.start === void 0) {
        attribute.start = tempStart[attribute.buffer];
        tempStart[attribute.buffer] += attribSize * byteSizeMap2[attribute.type];
      }
    }
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    for (let i = 0; i < buffers.length; i++) {
      const buffer = buffers[i];
      bufferSystem.bind(buffer);
      if (incRefCount) {
        buffer._glBuffers[CONTEXT_UID].refCount++;
      }
    }
    this.activateVao(geometry, program);
    vaoObjectHash[program.id] = vao;
    vaoObjectHash[signature] = vao;
    gl.bindVertexArray(null);
    bufferSystem.unbind(BUFFER_TYPE.ARRAY_BUFFER);
    return vao;
  }
  disposeGeometry(geometry, contextLost) {
    if (!this.managedGeometries[geometry.id]) {
      return;
    }
    delete this.managedGeometries[geometry.id];
    const vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    const gl = this.gl;
    const buffers = geometry.buffers;
    const bufferSystem = this.renderer?.buffer;
    geometry.disposeRunner.remove(this);
    if (!vaos) {
      return;
    }
    if (bufferSystem) {
      for (let i = 0; i < buffers.length; i++) {
        const buf = buffers[i]._glBuffers[this.CONTEXT_UID];
        if (buf) {
          buf.refCount--;
          if (buf.refCount === 0 && !contextLost) {
            bufferSystem.dispose(buffers[i], contextLost);
          }
        }
      }
    }
    if (!contextLost) {
      for (const vaoId in vaos) {
        if (vaoId[0] === "g") {
          const vao = vaos[vaoId];
          if (this._activeVao === vao) {
            this.unbind();
          }
          gl.deleteVertexArray(vao);
        }
      }
    }
    delete geometry.glVertexArrayObjects[this.CONTEXT_UID];
  }
  disposeAll(contextLost) {
    const all = Object.keys(this.managedGeometries);
    for (let i = 0; i < all.length; i++) {
      this.disposeGeometry(this.managedGeometries[all[i]], contextLost);
    }
  }
  activateVao(geometry, program) {
    const gl = this.gl;
    const CONTEXT_UID = this.CONTEXT_UID;
    const bufferSystem = this.renderer.buffer;
    const buffers = geometry.buffers;
    const attributes = geometry.attributes;
    if (geometry.indexBuffer) {
      bufferSystem.bind(geometry.indexBuffer);
    }
    let lastBuffer = null;
    for (const j in attributes) {
      const attribute = attributes[j];
      const buffer = buffers[attribute.buffer];
      const glBuffer = buffer._glBuffers[CONTEXT_UID];
      if (program.attributeData[j]) {
        if (lastBuffer !== glBuffer) {
          bufferSystem.bind(buffer);
          lastBuffer = glBuffer;
        }
        const location = program.attributeData[j].location;
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, attribute.size, attribute.type || gl.FLOAT, attribute.normalized, attribute.stride, attribute.start);
        if (attribute.instance) {
          if (this.hasInstance) {
            gl.vertexAttribDivisor(location, 1);
          } else {
            throw new Error("geometry error, GPU Instancing is not supported on this device");
          }
        }
      }
    }
  }
  draw(type, size, start, instanceCount) {
    const { gl } = this;
    const geometry = this._activeGeometry;
    if (geometry.indexBuffer) {
      const byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT;
      const glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
      if (byteSize === 2 || byteSize === 4 && this.canUseUInt32ElementIndex) {
        if (geometry.instanced) {
          gl.drawElementsInstanced(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize, instanceCount || 1);
        } else {
          gl.drawElements(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize);
        }
      } else {
        console.warn("unsupported index buffer type: uint32");
      }
    } else if (geometry.instanced) {
      gl.drawArraysInstanced(type, start, size || geometry.getSize(), instanceCount || 1);
    } else {
      gl.drawArrays(type, start, size || geometry.getSize());
    }
    return this;
  }
  unbind() {
    this.gl.bindVertexArray(null);
    this._activeVao = null;
    this._activeGeometry = null;
  }
  destroy() {
    this.renderer = null;
  }
};
GeometrySystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "geometry"
};
extensions.add(GeometrySystem);

// node_modules/@pixi/core/lib/mask/MaskData.mjs
var MaskData = class {
  constructor(maskObject = null) {
    this.type = MASK_TYPES.NONE;
    this.autoDetect = true;
    this.maskObject = maskObject || null;
    this.pooled = false;
    this.isMaskData = true;
    this.resolution = null;
    this.multisample = settings.FILTER_MULTISAMPLE;
    this.enabled = true;
    this.colorMask = 15;
    this._filters = null;
    this._stencilCounter = 0;
    this._scissorCounter = 0;
    this._scissorRect = null;
    this._scissorRectLocal = null;
    this._colorMask = 15;
    this._target = null;
  }
  get filter() {
    return this._filters ? this._filters[0] : null;
  }
  set filter(value) {
    if (value) {
      if (this._filters) {
        this._filters[0] = value;
      } else {
        this._filters = [value];
      }
    } else {
      this._filters = null;
    }
  }
  reset() {
    if (this.pooled) {
      this.maskObject = null;
      this.type = MASK_TYPES.NONE;
      this.autoDetect = true;
    }
    this._target = null;
    this._scissorRectLocal = null;
  }
  copyCountersOrReset(maskAbove) {
    if (maskAbove) {
      this._stencilCounter = maskAbove._stencilCounter;
      this._scissorCounter = maskAbove._scissorCounter;
      this._scissorRect = maskAbove._scissorRect;
    } else {
      this._stencilCounter = 0;
      this._scissorCounter = 0;
      this._scissorRect = null;
    }
  }
};

// node_modules/@pixi/core/lib/shader/utils/compileShader.mjs
function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

// node_modules/@pixi/core/lib/shader/utils/logProgramError.mjs
function logPrettyShaderError(gl, shader) {
  const shaderSrc = gl.getShaderSource(shader).split("\n").map((line, index) => `${index}: ${line}`);
  const shaderLog = gl.getShaderInfoLog(shader);
  const splitShader = shaderLog.split("\n");
  const dedupe = {};
  const lineNumbers = splitShader.map((line) => parseFloat(line.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((n) => {
    if (n && !dedupe[n]) {
      dedupe[n] = true;
      return true;
    }
    return false;
  });
  const logArgs = [""];
  lineNumbers.forEach((number) => {
    shaderSrc[number - 1] = `%c${shaderSrc[number - 1]}%c`;
    logArgs.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const fragmentSourceToLog = shaderSrc.join("\n");
  logArgs[0] = fragmentSourceToLog;
  console.error(shaderLog);
  console.groupCollapsed("click to view full shader code");
  console.warn(...logArgs);
  console.groupEnd();
}
function logProgramError(gl, program, vertexShader, fragmentShader) {
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      logPrettyShaderError(gl, vertexShader);
    }
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      logPrettyShaderError(gl, fragmentShader);
    }
    console.error("PixiJS Error: Could not initialize shader.");
    if (gl.getProgramInfoLog(program) !== "") {
      console.warn("PixiJS Warning: gl.getProgramInfoLog()", gl.getProgramInfoLog(program));
    }
  }
}

// node_modules/@pixi/core/lib/shader/utils/defaultValue.mjs
function booleanArray(size) {
  const array = new Array(size);
  for (let i = 0; i < array.length; i++) {
    array[i] = false;
  }
  return array;
}
function defaultValue(type, size) {
  switch (type) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * size);
    case "vec3":
      return new Float32Array(3 * size);
    case "vec4":
      return new Float32Array(4 * size);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * size);
    case "ivec3":
      return new Int32Array(3 * size);
    case "ivec4":
      return new Int32Array(4 * size);
    case "uvec2":
      return new Uint32Array(2 * size);
    case "uvec3":
      return new Uint32Array(3 * size);
    case "uvec4":
      return new Uint32Array(4 * size);
    case "bool":
      return false;
    case "bvec2":
      return booleanArray(2 * size);
    case "bvec3":
      return booleanArray(3 * size);
    case "bvec4":
      return booleanArray(4 * size);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
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
    case "mat4":
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

// node_modules/@pixi/core/lib/shader/utils/getTestContext.mjs
var unknownContext = {};
var context = unknownContext;
function getTestContext() {
  if (context === unknownContext || context?.isContextLost()) {
    const canvas = settings.ADAPTER.createCanvas();
    let gl;
    if (settings.PREFER_ENV >= ENV.WEBGL2) {
      gl = canvas.getContext("webgl2", {});
    }
    if (!gl) {
      gl = canvas.getContext("webgl", {}) || canvas.getContext("experimental-webgl", {});
      if (!gl) {
        gl = null;
      } else {
        gl.getExtension("WEBGL_draw_buffers");
      }
    }
    context = gl;
  }
  return context;
}

// node_modules/@pixi/core/lib/shader/utils/getMaxFragmentPrecision.mjs
var maxFragmentPrecision;
function getMaxFragmentPrecision() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = PRECISION.MEDIUM;
    const gl = getTestContext();
    if (gl) {
      if (gl.getShaderPrecisionFormat) {
        const shaderFragment = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        maxFragmentPrecision = shaderFragment.precision ? PRECISION.HIGH : PRECISION.MEDIUM;
      }
    }
  }
  return maxFragmentPrecision;
}

// node_modules/@pixi/core/lib/shader/utils/setPrecision.mjs
function setPrecision(src, requestedPrecision, maxSupportedPrecision) {
  if (src.substring(0, 9) !== "precision") {
    let precision = requestedPrecision;
    if (requestedPrecision === PRECISION.HIGH && maxSupportedPrecision !== PRECISION.HIGH) {
      precision = PRECISION.MEDIUM;
    }
    return `precision ${precision} float;
${src}`;
  } else if (maxSupportedPrecision !== PRECISION.HIGH && src.substring(0, 15) === "precision highp") {
    return src.replace("precision highp", "precision mediump");
  }
  return src;
}

// node_modules/@pixi/core/lib/shader/utils/mapSize.mjs
var GLSL_TO_SIZE = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
function mapSize(type) {
  return GLSL_TO_SIZE[type];
}

// node_modules/@pixi/core/lib/shader/utils/mapType.mjs
var GL_TABLE = null;
var GL_TO_GLSL_TYPES = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function mapType(gl, type) {
  if (!GL_TABLE) {
    const typeNames = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (let i = 0; i < typeNames.length; ++i) {
      const tn = typeNames[i];
      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
    }
  }
  return GL_TABLE[type];
}

// node_modules/@pixi/core/lib/shader/utils/uniformParsers.mjs
var uniformParsers = [
  {
    test: (data) => data.type === "float" && data.size === 1 && !data.isArray,
    code: (name) => `
            if(uv["${name}"] !== ud["${name}"].value)
            {
                ud["${name}"].value = uv["${name}"]
                gl.uniform1f(ud["${name}"].location, uv["${name}"])
            }
            `
  },
  {
    test: (data, uniform) => (data.type === "sampler2D" || data.type === "samplerCube" || data.type === "sampler2DArray") && data.size === 1 && !data.isArray && (uniform == null || uniform.castToBaseTexture !== void 0),
    code: (name) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${name}"], t);

            if(ud["${name}"].value !== t)
            {
                ud["${name}"].value = t;
                gl.uniform1i(ud["${name}"].location, t);
; // eslint-disable-line max-len
            }`
  },
  {
    test: (data, uniform) => data.type === "mat3" && data.size === 1 && !data.isArray && uniform.a !== void 0,
    code: (name) => `
            gl.uniformMatrix3fv(ud["${name}"].location, false, uv["${name}"].toArray(true));
            `,
    codeUbo: (name) => `
                var ${name}_matrix = uv.${name}.toArray(true);

                data[offset] = ${name}_matrix[0];
                data[offset+1] = ${name}_matrix[1];
                data[offset+2] = ${name}_matrix[2];
        
                data[offset + 4] = ${name}_matrix[3];
                data[offset + 5] = ${name}_matrix[4];
                data[offset + 6] = ${name}_matrix[5];
        
                data[offset + 8] = ${name}_matrix[6];
                data[offset + 9] = ${name}_matrix[7];
                data[offset + 10] = ${name}_matrix[8];
            `
  },
  {
    test: (data, uniform) => data.type === "vec2" && data.size === 1 && !data.isArray && uniform.x !== void 0,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${name}"].location, v.x, v.y);
                }`,
    codeUbo: (name) => `
                v = uv.${name};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
  },
  {
    test: (data) => data.type === "vec2" && data.size === 1 && !data.isArray,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${name}"].location, v[0], v[1]);
                }
            `
  },
  {
    test: (data, uniform) => data.type === "vec4" && data.size === 1 && !data.isArray && uniform.width !== void 0,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${name}"].location, v.x, v.y, v.width, v.height)
                }`,
    codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
  },
  {
    test: (data) => data.type === "vec4" && data.size === 1 && !data.isArray,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${name}"].location, v[0], v[1], v[2], v[3])
                }`
  }
];

// node_modules/@pixi/core/lib/shader/utils/generateUniformsSync.mjs
var GLSL_TO_SINGLE_SETTERS_CACHED = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
};
var GLSL_TO_ARRAY_SETTERS = {
  float: `gl.uniform1fv(location, v)`,
  vec2: `gl.uniform2fv(location, v)`,
  vec3: `gl.uniform3fv(location, v)`,
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};
function generateUniformsSync(group, uniformData) {
  const funcFragments = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (const i in group.uniforms) {
    const data = uniformData[i];
    if (!data) {
      if (group.uniforms[i]?.group) {
        if (group.uniforms[i].ubo) {
          funcFragments.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${i}, '${i}');
                    `);
        } else {
          funcFragments.push(`
                        renderer.shader.syncUniformGroup(uv.${i}, syncData);
                    `);
        }
      }
      continue;
    }
    const uniform = group.uniforms[i];
    let parsed = false;
    for (let j = 0; j < uniformParsers.length; j++) {
      if (uniformParsers[j].test(data, uniform)) {
        funcFragments.push(uniformParsers[j].code(i, uniform));
        parsed = true;
        break;
      }
    }
    if (!parsed) {
      const templateType = data.size === 1 && !data.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS;
      const template = templateType[data.type].replace("location", `ud["${i}"].location`);
      funcFragments.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${template};`);
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", funcFragments.join("\n"));
}

// node_modules/@pixi/core/lib/shader/utils/checkMaxIfStatementsInShader.mjs
var fragTemplate = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join("\n");
function generateIfTestSrc(maxIfs) {
  let src = "";
  for (let i = 0; i < maxIfs; ++i) {
    if (i > 0) {
      src += "\nelse ";
    }
    if (i < maxIfs - 1) {
      src += `if(test == ${i}.0){}`;
    }
  }
  return src;
}
function checkMaxIfStatementsInShader(maxIfs, gl) {
  if (maxIfs === 0) {
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  }
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
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
  return maxIfs;
}

// node_modules/@pixi/core/lib/shader/utils/unsafeEvalSupported.mjs
var unsafeEval;
function unsafeEvalSupported() {
  if (typeof unsafeEval === "boolean") {
    return unsafeEval;
  }
  try {
    const func = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
    unsafeEval = func({ a: "b" }, "a", "b") === true;
  } catch (e) {
    unsafeEval = false;
  }
  return unsafeEval;
}

// node_modules/@pixi/core/lib/shader/defaultProgram.mjs
var defaultFragment = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";

// node_modules/@pixi/core/lib/shader/defaultProgram2.mjs
var defaultVertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";

// node_modules/@pixi/core/lib/shader/Program.mjs
var UID4 = 0;
var nameCache = {};
var Program = class {
  constructor(vertexSrc, fragmentSrc, name = "pixi-shader", extra = {}) {
    this.extra = {};
    this.id = UID4++;
    this.vertexSrc = vertexSrc || Program.defaultVertexSrc;
    this.fragmentSrc = fragmentSrc || Program.defaultFragmentSrc;
    this.vertexSrc = this.vertexSrc.trim();
    this.fragmentSrc = this.fragmentSrc.trim();
    this.extra = extra;
    if (this.vertexSrc.substring(0, 8) !== "#version") {
      name = name.replace(/\s+/g, "-");
      if (nameCache[name]) {
        nameCache[name]++;
        name += `-${nameCache[name]}`;
      } else {
        nameCache[name] = 1;
      }
      this.vertexSrc = `#define SHADER_NAME ${name}
${this.vertexSrc}`;
      this.fragmentSrc = `#define SHADER_NAME ${name}
${this.fragmentSrc}`;
      this.vertexSrc = setPrecision(this.vertexSrc, settings.PRECISION_VERTEX, PRECISION.HIGH);
      this.fragmentSrc = setPrecision(this.fragmentSrc, settings.PRECISION_FRAGMENT, getMaxFragmentPrecision());
    }
    this.glPrograms = {};
    this.syncUniforms = null;
  }
  static get defaultVertexSrc() {
    return defaultVertex;
  }
  static get defaultFragmentSrc() {
    return defaultFragment;
  }
  static from(vertexSrc, fragmentSrc, name) {
    const key = vertexSrc + fragmentSrc;
    let program = ProgramCache[key];
    if (!program) {
      ProgramCache[key] = program = new Program(vertexSrc, fragmentSrc, name);
    }
    return program;
  }
};

// node_modules/@pixi/core/lib/shader/Shader.mjs
var Shader = class {
  constructor(program, uniforms) {
    this.uniformBindCount = 0;
    this.program = program;
    if (uniforms) {
      if (uniforms instanceof UniformGroup) {
        this.uniformGroup = uniforms;
      } else {
        this.uniformGroup = new UniformGroup(uniforms);
      }
    } else {
      this.uniformGroup = new UniformGroup({});
    }
    this.disposeRunner = new Runner("disposeShader");
  }
  checkUniformExists(name, group) {
    if (group.uniforms[name]) {
      return true;
    }
    for (const i in group.uniforms) {
      const uniform = group.uniforms[i];
      if (uniform.group) {
        if (this.checkUniformExists(name, uniform)) {
          return true;
        }
      }
    }
    return false;
  }
  destroy() {
    this.uniformGroup = null;
    this.disposeRunner.emit(this);
    this.disposeRunner.destroy();
  }
  get uniforms() {
    return this.uniformGroup.uniforms;
  }
  static from(vertexSrc, fragmentSrc, uniforms) {
    const program = Program.from(vertexSrc, fragmentSrc);
    return new Shader(program, uniforms);
  }
};

// node_modules/@pixi/core/lib/state/State.mjs
var BLEND = 0;
var OFFSET = 1;
var CULLING = 2;
var DEPTH_TEST = 3;
var WINDING = 4;
var DEPTH_MASK = 5;
var State = class {
  constructor() {
    this.data = 0;
    this.blendMode = BLEND_MODES.NORMAL;
    this.polygonOffset = 0;
    this.blend = true;
    this.depthMask = true;
  }
  get blend() {
    return !!(this.data & 1 << BLEND);
  }
  set blend(value) {
    if (!!(this.data & 1 << BLEND) !== value) {
      this.data ^= 1 << BLEND;
    }
  }
  get offsets() {
    return !!(this.data & 1 << OFFSET);
  }
  set offsets(value) {
    if (!!(this.data & 1 << OFFSET) !== value) {
      this.data ^= 1 << OFFSET;
    }
  }
  get culling() {
    return !!(this.data & 1 << CULLING);
  }
  set culling(value) {
    if (!!(this.data & 1 << CULLING) !== value) {
      this.data ^= 1 << CULLING;
    }
  }
  get depthTest() {
    return !!(this.data & 1 << DEPTH_TEST);
  }
  set depthTest(value) {
    if (!!(this.data & 1 << DEPTH_TEST) !== value) {
      this.data ^= 1 << DEPTH_TEST;
    }
  }
  get depthMask() {
    return !!(this.data & 1 << DEPTH_MASK);
  }
  set depthMask(value) {
    if (!!(this.data & 1 << DEPTH_MASK) !== value) {
      this.data ^= 1 << DEPTH_MASK;
    }
  }
  get clockwiseFrontFace() {
    return !!(this.data & 1 << WINDING);
  }
  set clockwiseFrontFace(value) {
    if (!!(this.data & 1 << WINDING) !== value) {
      this.data ^= 1 << WINDING;
    }
  }
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(value) {
    this.blend = value !== BLEND_MODES.NONE;
    this._blendMode = value;
  }
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(value) {
    this.offsets = !!value;
    this._polygonOffset = value;
  }
  static for2d() {
    const state = new State();
    state.depthTest = false;
    state.blend = true;
    return state;
  }
};

// node_modules/@pixi/core/lib/filters/defaultFilter.mjs
var defaultFragment2 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";

// node_modules/@pixi/core/lib/filters/defaultFilter2.mjs
var defaultVertex2 = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

// node_modules/@pixi/core/lib/filters/Filter.mjs
var Filter = class extends Shader {
  constructor(vertexSrc, fragmentSrc, uniforms) {
    const program = Program.from(vertexSrc || Filter.defaultVertexSrc, fragmentSrc || Filter.defaultFragmentSrc);
    super(program, uniforms);
    this.padding = 0;
    this.resolution = settings.FILTER_RESOLUTION;
    this.multisample = settings.FILTER_MULTISAMPLE;
    this.enabled = true;
    this.autoFit = true;
    this.state = new State();
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    filterManager.applyFilter(this, input, output, clearMode);
  }
  get blendMode() {
    return this.state.blendMode;
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._resolution = value;
  }
  static get defaultVertexSrc() {
    return defaultVertex2;
  }
  static get defaultFragmentSrc() {
    return defaultFragment2;
  }
};

// node_modules/@pixi/core/lib/filters/spriteMask/spriteMaskFilter2.mjs
var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n";

// node_modules/@pixi/core/lib/filters/spriteMask/spriteMaskFilter3.mjs
var fragment = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n";

// node_modules/@pixi/core/lib/textures/TextureMatrix.mjs
var tempMat = new Matrix();
var TextureMatrix = class {
  constructor(texture, clampMargin) {
    this._texture = texture;
    this.mapCoord = new Matrix();
    this.uClampFrame = new Float32Array(4);
    this.uClampOffset = new Float32Array(2);
    this._textureID = -1;
    this._updateID = 0;
    this.clampOffset = 0;
    this.clampMargin = typeof clampMargin === "undefined" ? 0.5 : clampMargin;
    this.isSimple = false;
  }
  get texture() {
    return this._texture;
  }
  set texture(value) {
    this._texture = value;
    this._textureID = -1;
  }
  multiplyUvs(uvs, out) {
    if (out === void 0) {
      out = uvs;
    }
    const mat = this.mapCoord;
    for (let i = 0; i < uvs.length; i += 2) {
      const x = uvs[i];
      const y = uvs[i + 1];
      out[i] = x * mat.a + y * mat.c + mat.tx;
      out[i + 1] = x * mat.b + y * mat.d + mat.ty;
    }
    return out;
  }
  update(forceUpdate) {
    const tex = this._texture;
    if (!tex || !tex.valid) {
      return false;
    }
    if (!forceUpdate && this._textureID === tex._updateID) {
      return false;
    }
    this._textureID = tex._updateID;
    this._updateID++;
    const uvs = tex._uvs;
    this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
    const orig = tex.orig;
    const trim = tex.trim;
    if (trim) {
      tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height);
      this.mapCoord.append(tempMat);
    }
    const texBase = tex.baseTexture;
    const frame = this.uClampFrame;
    const margin = this.clampMargin / texBase.resolution;
    const offset = this.clampOffset;
    frame[0] = (tex._frame.x + margin + offset) / texBase.width;
    frame[1] = (tex._frame.y + margin + offset) / texBase.height;
    frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width;
    frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height;
    this.uClampOffset[0] = offset / texBase.realWidth;
    this.uClampOffset[1] = offset / texBase.realHeight;
    this.isSimple = tex._frame.width === texBase.width && tex._frame.height === texBase.height && tex.rotate === 0;
    return true;
  }
};

// node_modules/@pixi/core/lib/filters/spriteMask/SpriteMaskFilter.mjs
var SpriteMaskFilter = class extends Filter {
  constructor(vertexSrc, fragmentSrc, uniforms) {
    let sprite = null;
    if (typeof vertexSrc !== "string" && fragmentSrc === void 0 && uniforms === void 0) {
      sprite = vertexSrc;
      vertexSrc = void 0;
      fragmentSrc = void 0;
      uniforms = void 0;
    }
    super(vertexSrc || vertex, fragmentSrc || fragment, uniforms);
    this.maskSprite = sprite;
    this.maskMatrix = new Matrix();
  }
  get maskSprite() {
    return this._maskSprite;
  }
  set maskSprite(value) {
    this._maskSprite = value;
    if (this._maskSprite) {
      this._maskSprite.renderable = false;
    }
  }
  apply(filterManager, input, output, clearMode) {
    const maskSprite = this._maskSprite;
    const tex = maskSprite._texture;
    if (!tex.valid) {
      return;
    }
    if (!tex.uvMatrix) {
      tex.uvMatrix = new TextureMatrix(tex, 0);
    }
    tex.uvMatrix.update();
    this.uniforms.npmAlpha = tex.baseTexture.alphaMode ? 0 : 1;
    this.uniforms.mask = tex;
    this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite).prepend(tex.uvMatrix.mapCoord);
    this.uniforms.alpha = maskSprite.worldAlpha;
    this.uniforms.maskClamp = tex.uvMatrix.uClampFrame;
    filterManager.applyFilter(this, input, output, clearMode);
  }
};

// node_modules/@pixi/core/lib/mask/MaskSystem.mjs
var MaskSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.enableScissor = true;
    this.alphaMaskPool = [];
    this.maskDataPool = [];
    this.maskStack = [];
    this.alphaMaskIndex = 0;
  }
  setMaskStack(maskStack) {
    this.maskStack = maskStack;
    this.renderer.scissor.setMaskStack(maskStack);
    this.renderer.stencil.setMaskStack(maskStack);
  }
  push(target, maskDataOrTarget) {
    let maskData = maskDataOrTarget;
    if (!maskData.isMaskData) {
      const d = this.maskDataPool.pop() || new MaskData();
      d.pooled = true;
      d.maskObject = maskDataOrTarget;
      maskData = d;
    }
    const maskAbove = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    maskData.copyCountersOrReset(maskAbove);
    maskData._colorMask = maskAbove ? maskAbove._colorMask : 15;
    if (maskData.autoDetect) {
      this.detect(maskData);
    }
    maskData._target = target;
    if (maskData.type !== MASK_TYPES.SPRITE) {
      this.maskStack.push(maskData);
    }
    if (maskData.enabled) {
      switch (maskData.type) {
        case MASK_TYPES.SCISSOR:
          this.renderer.scissor.push(maskData);
          break;
        case MASK_TYPES.STENCIL:
          this.renderer.stencil.push(maskData);
          break;
        case MASK_TYPES.SPRITE:
          maskData.copyCountersOrReset(null);
          this.pushSpriteMask(maskData);
          break;
        case MASK_TYPES.COLOR:
          this.pushColorMask(maskData);
          break;
        default:
          break;
      }
    }
    if (maskData.type === MASK_TYPES.SPRITE) {
      this.maskStack.push(maskData);
    }
  }
  pop(target) {
    const maskData = this.maskStack.pop();
    if (!maskData || maskData._target !== target) {
      return;
    }
    if (maskData.enabled) {
      switch (maskData.type) {
        case MASK_TYPES.SCISSOR:
          this.renderer.scissor.pop(maskData);
          break;
        case MASK_TYPES.STENCIL:
          this.renderer.stencil.pop(maskData.maskObject);
          break;
        case MASK_TYPES.SPRITE:
          this.popSpriteMask(maskData);
          break;
        case MASK_TYPES.COLOR:
          this.popColorMask(maskData);
          break;
        default:
          break;
      }
    }
    maskData.reset();
    if (maskData.pooled) {
      this.maskDataPool.push(maskData);
    }
    if (this.maskStack.length !== 0) {
      const maskCurrent = this.maskStack[this.maskStack.length - 1];
      if (maskCurrent.type === MASK_TYPES.SPRITE && maskCurrent._filters) {
        maskCurrent._filters[0].maskSprite = maskCurrent.maskObject;
      }
    }
  }
  detect(maskData) {
    const maskObject = maskData.maskObject;
    if (!maskObject) {
      maskData.type = MASK_TYPES.COLOR;
    } else if (maskObject.isSprite) {
      maskData.type = MASK_TYPES.SPRITE;
    } else if (this.enableScissor && this.renderer.scissor.testScissor(maskData)) {
      maskData.type = MASK_TYPES.SCISSOR;
    } else {
      maskData.type = MASK_TYPES.STENCIL;
    }
  }
  pushSpriteMask(maskData) {
    const { maskObject } = maskData;
    const target = maskData._target;
    let alphaMaskFilter = maskData._filters;
    if (!alphaMaskFilter) {
      alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
      if (!alphaMaskFilter) {
        alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()];
      }
    }
    const renderer = this.renderer;
    const renderTextureSystem = renderer.renderTexture;
    let resolution;
    let multisample;
    if (renderTextureSystem.current) {
      const renderTexture = renderTextureSystem.current;
      resolution = maskData.resolution || renderTexture.resolution;
      multisample = maskData.multisample ?? renderTexture.multisample;
    } else {
      resolution = maskData.resolution || renderer.resolution;
      multisample = maskData.multisample ?? renderer.multisample;
    }
    alphaMaskFilter[0].resolution = resolution;
    alphaMaskFilter[0].multisample = multisample;
    alphaMaskFilter[0].maskSprite = maskObject;
    const stashFilterArea = target.filterArea;
    target.filterArea = maskObject.getBounds(true);
    renderer.filter.push(target, alphaMaskFilter);
    target.filterArea = stashFilterArea;
    if (!maskData._filters) {
      this.alphaMaskIndex++;
    }
  }
  popSpriteMask(maskData) {
    this.renderer.filter.pop();
    if (maskData._filters) {
      maskData._filters[0].maskSprite = null;
    } else {
      this.alphaMaskIndex--;
      this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null;
    }
  }
  pushColorMask(maskData) {
    const currColorMask = maskData._colorMask;
    const nextColorMask = maskData._colorMask = currColorMask & maskData.colorMask;
    if (nextColorMask !== currColorMask) {
      this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
    }
  }
  popColorMask(maskData) {
    const currColorMask = maskData._colorMask;
    const nextColorMask = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    if (nextColorMask !== currColorMask) {
      this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
    }
  }
  destroy() {
    this.renderer = null;
  }
};
MaskSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "mask"
};
extensions.add(MaskSystem);

// node_modules/@pixi/core/lib/mask/AbstractMaskSystem.mjs
var AbstractMaskSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.maskStack = [];
    this.glConst = 0;
  }
  getStackLength() {
    return this.maskStack.length;
  }
  setMaskStack(maskStack) {
    const { gl } = this.renderer;
    const curStackLen = this.getStackLength();
    this.maskStack = maskStack;
    const newStackLen = this.getStackLength();
    if (newStackLen !== curStackLen) {
      if (newStackLen === 0) {
        gl.disable(this.glConst);
      } else {
        gl.enable(this.glConst);
        this._useCurrent();
      }
    }
  }
  _useCurrent() {
  }
  destroy() {
    this.renderer = null;
    this.maskStack = null;
  }
};

// node_modules/@pixi/core/lib/mask/ScissorSystem.mjs
var tempMatrix2 = new Matrix();
var rectPool = [];
var _ScissorSystem = class extends AbstractMaskSystem {
  constructor(renderer) {
    super(renderer);
    this.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
  }
  getStackLength() {
    const maskData = this.maskStack[this.maskStack.length - 1];
    if (maskData) {
      return maskData._scissorCounter;
    }
    return 0;
  }
  calcScissorRect(maskData) {
    if (maskData._scissorRectLocal) {
      return;
    }
    const prevData = maskData._scissorRect;
    const { maskObject } = maskData;
    const { renderer } = this;
    const renderTextureSystem = renderer.renderTexture;
    const rect = maskObject.getBounds(true, rectPool.pop() ?? new Rectangle());
    this.roundFrameToPixels(rect, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
    if (prevData) {
      rect.fit(prevData);
    }
    maskData._scissorRectLocal = rect;
  }
  static isMatrixRotated(matrix) {
    if (!matrix) {
      return false;
    }
    const { a, b, c, d } = matrix;
    return (Math.abs(b) > 1e-4 || Math.abs(c) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(d) > 1e-4);
  }
  testScissor(maskData) {
    const { maskObject } = maskData;
    if (!maskObject.isFastRect || !maskObject.isFastRect()) {
      return false;
    }
    if (_ScissorSystem.isMatrixRotated(maskObject.worldTransform)) {
      return false;
    }
    if (_ScissorSystem.isMatrixRotated(this.renderer.projection.transform)) {
      return false;
    }
    this.calcScissorRect(maskData);
    const rect = maskData._scissorRectLocal;
    return rect.width > 0 && rect.height > 0;
  }
  roundFrameToPixels(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
    if (_ScissorSystem.isMatrixRotated(transform)) {
      return;
    }
    transform = transform ? tempMatrix2.copyFrom(transform) : tempMatrix2.identity();
    transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
    this.renderer.filter.transformAABB(transform, frame);
    frame.fit(bindingDestinationFrame);
    frame.x = Math.round(frame.x * resolution);
    frame.y = Math.round(frame.y * resolution);
    frame.width = Math.round(frame.width * resolution);
    frame.height = Math.round(frame.height * resolution);
  }
  push(maskData) {
    if (!maskData._scissorRectLocal) {
      this.calcScissorRect(maskData);
    }
    const { gl } = this.renderer;
    if (!maskData._scissorRect) {
      gl.enable(gl.SCISSOR_TEST);
    }
    maskData._scissorCounter++;
    maskData._scissorRect = maskData._scissorRectLocal;
    this._useCurrent();
  }
  pop(maskData) {
    const { gl } = this.renderer;
    if (maskData) {
      rectPool.push(maskData._scissorRectLocal);
    }
    if (this.getStackLength() > 0) {
      this._useCurrent();
    } else {
      gl.disable(gl.SCISSOR_TEST);
    }
  }
  _useCurrent() {
    const rect = this.maskStack[this.maskStack.length - 1]._scissorRect;
    let y;
    if (this.renderer.renderTexture.current) {
      y = rect.y;
    } else {
      y = this.renderer.height - rect.height - rect.y;
    }
    this.renderer.gl.scissor(rect.x, y, rect.width, rect.height);
  }
};
var ScissorSystem = _ScissorSystem;
ScissorSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "scissor"
};
extensions.add(ScissorSystem);

// node_modules/@pixi/core/lib/mask/StencilSystem.mjs
var StencilSystem = class extends AbstractMaskSystem {
  constructor(renderer) {
    super(renderer);
    this.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
  }
  getStackLength() {
    const maskData = this.maskStack[this.maskStack.length - 1];
    if (maskData) {
      return maskData._stencilCounter;
    }
    return 0;
  }
  push(maskData) {
    const maskObject = maskData.maskObject;
    const { gl } = this.renderer;
    const prevMaskCount = maskData._stencilCounter;
    if (prevMaskCount === 0) {
      this.renderer.framebuffer.forceStencil();
      gl.clearStencil(0);
      gl.clear(gl.STENCIL_BUFFER_BIT);
      gl.enable(gl.STENCIL_TEST);
    }
    maskData._stencilCounter++;
    const colorMask = maskData._colorMask;
    if (colorMask !== 0) {
      maskData._colorMask = 0;
      gl.colorMask(false, false, false, false);
    }
    gl.stencilFunc(gl.EQUAL, prevMaskCount, 4294967295);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
    maskObject.renderable = true;
    maskObject.render(this.renderer);
    this.renderer.batch.flush();
    maskObject.renderable = false;
    if (colorMask !== 0) {
      maskData._colorMask = colorMask;
      gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0);
    }
    this._useCurrent();
  }
  pop(maskObject) {
    const gl = this.renderer.gl;
    if (this.getStackLength() === 0) {
      gl.disable(gl.STENCIL_TEST);
    } else {
      const maskData = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
      const colorMask = maskData ? maskData._colorMask : 15;
      if (colorMask !== 0) {
        maskData._colorMask = 0;
        gl.colorMask(false, false, false, false);
      }
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
      maskObject.renderable = true;
      maskObject.render(this.renderer);
      this.renderer.batch.flush();
      maskObject.renderable = false;
      if (colorMask !== 0) {
        maskData._colorMask = colorMask;
        gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0);
      }
      this._useCurrent();
    }
  }
  _useCurrent() {
    const gl = this.renderer.gl;
    gl.stencilFunc(gl.EQUAL, this.getStackLength(), 4294967295);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
  }
};
StencilSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "stencil"
};
extensions.add(StencilSystem);

// node_modules/@pixi/core/lib/projection/ProjectionSystem.mjs
var ProjectionSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.destinationFrame = null;
    this.sourceFrame = null;
    this.defaultFrame = null;
    this.projectionMatrix = new Matrix();
    this.transform = null;
  }
  update(destinationFrame, sourceFrame, resolution, root) {
    this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame;
    this.sourceFrame = sourceFrame || this.sourceFrame || destinationFrame;
    this.calculateProjection(this.destinationFrame, this.sourceFrame, resolution, root);
    if (this.transform) {
      this.projectionMatrix.append(this.transform);
    }
    const renderer = this.renderer;
    renderer.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix;
    renderer.globalUniforms.update();
    if (renderer.shader.shader) {
      renderer.shader.syncUniformGroup(renderer.shader.shader.uniforms.globals);
    }
  }
  calculateProjection(_destinationFrame, sourceFrame, _resolution, root) {
    const pm = this.projectionMatrix;
    const sign2 = !root ? 1 : -1;
    pm.identity();
    pm.a = 1 / sourceFrame.width * 2;
    pm.d = sign2 * (1 / sourceFrame.height * 2);
    pm.tx = -1 - sourceFrame.x * pm.a;
    pm.ty = -sign2 - sourceFrame.y * pm.d;
  }
  setTransform(_matrix) {
  }
  destroy() {
    this.renderer = null;
  }
};
ProjectionSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "projection"
};
extensions.add(ProjectionSystem);

// node_modules/@pixi/core/lib/renderTexture/RenderTextureSystem.mjs
var tempRect = new Rectangle();
var tempRect2 = new Rectangle();
var RenderTextureSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.defaultMaskStack = [];
    this.current = null;
    this.sourceFrame = new Rectangle();
    this.destinationFrame = new Rectangle();
    this.viewportFrame = new Rectangle();
  }
  bind(renderTexture = null, sourceFrame, destinationFrame) {
    const renderer = this.renderer;
    this.current = renderTexture;
    let baseTexture;
    let framebuffer;
    let resolution;
    if (renderTexture) {
      baseTexture = renderTexture.baseTexture;
      resolution = baseTexture.resolution;
      if (!sourceFrame) {
        tempRect.width = renderTexture.frame.width;
        tempRect.height = renderTexture.frame.height;
        sourceFrame = tempRect;
      }
      if (!destinationFrame) {
        tempRect2.x = renderTexture.frame.x;
        tempRect2.y = renderTexture.frame.y;
        tempRect2.width = sourceFrame.width;
        tempRect2.height = sourceFrame.height;
        destinationFrame = tempRect2;
      }
      framebuffer = baseTexture.framebuffer;
    } else {
      resolution = renderer.resolution;
      if (!sourceFrame) {
        tempRect.width = renderer._view.screen.width;
        tempRect.height = renderer._view.screen.height;
        sourceFrame = tempRect;
      }
      if (!destinationFrame) {
        destinationFrame = tempRect;
        destinationFrame.width = sourceFrame.width;
        destinationFrame.height = sourceFrame.height;
      }
    }
    const viewportFrame = this.viewportFrame;
    viewportFrame.x = destinationFrame.x * resolution;
    viewportFrame.y = destinationFrame.y * resolution;
    viewportFrame.width = destinationFrame.width * resolution;
    viewportFrame.height = destinationFrame.height * resolution;
    if (!renderTexture) {
      viewportFrame.y = renderer.view.height - (viewportFrame.y + viewportFrame.height);
    }
    viewportFrame.ceil();
    this.renderer.framebuffer.bind(framebuffer, viewportFrame);
    this.renderer.projection.update(destinationFrame, sourceFrame, resolution, !framebuffer);
    if (renderTexture) {
      this.renderer.mask.setMaskStack(baseTexture.maskStack);
    } else {
      this.renderer.mask.setMaskStack(this.defaultMaskStack);
    }
    this.sourceFrame.copyFrom(sourceFrame);
    this.destinationFrame.copyFrom(destinationFrame);
  }
  clear(clearColor, mask) {
    if (this.current) {
      clearColor = clearColor || this.current.baseTexture.clearColor;
    } else {
      clearColor = clearColor || this.renderer.background.colorRgba;
    }
    const destinationFrame = this.destinationFrame;
    const baseFrame = this.current ? this.current.baseTexture : this.renderer._view.screen;
    const clearMask = destinationFrame.width !== baseFrame.width || destinationFrame.height !== baseFrame.height;
    if (clearMask) {
      let { x, y, width, height } = this.viewportFrame;
      x = Math.round(x);
      y = Math.round(y);
      width = Math.round(width);
      height = Math.round(height);
      this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
      this.renderer.gl.scissor(x, y, width, height);
    }
    this.renderer.framebuffer.clear(clearColor[0], clearColor[1], clearColor[2], clearColor[3], mask);
    if (clearMask) {
      this.renderer.scissor.pop();
    }
  }
  resize() {
    this.bind(null);
  }
  reset() {
    this.bind(null);
  }
  destroy() {
    this.renderer = null;
  }
};
RenderTextureSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "renderTexture"
};
extensions.add(RenderTextureSystem);

// node_modules/@pixi/core/lib/shader/utils/generateUniformBufferSync.mjs
function uboUpdate(_ud, _uv, _renderer, _syncData, buffer) {
  _renderer.buffer.update(buffer);
}
var UBO_TO_SINGLE_SETTERS = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
};
var GLSL_TO_STD40_SIZE = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function createUBOElements(uniformData) {
  const uboElements = uniformData.map((data) => ({
    data,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let size = 0;
  let chunkSize = 0;
  let offset = 0;
  for (let i = 0; i < uboElements.length; i++) {
    const uboElement = uboElements[i];
    size = GLSL_TO_STD40_SIZE[uboElement.data.type];
    if (uboElement.data.size > 1) {
      size = Math.max(size, 16) * uboElement.data.size;
    }
    uboElement.dataLen = size;
    if (chunkSize % size !== 0 && chunkSize < 16) {
      const lineUpValue = chunkSize % size % 16;
      chunkSize += lineUpValue;
      offset += lineUpValue;
    }
    if (chunkSize + size > 16) {
      offset = Math.ceil(offset / 16) * 16;
      uboElement.offset = offset;
      offset += size;
      chunkSize = size;
    } else {
      uboElement.offset = offset;
      chunkSize += size;
      offset += size;
    }
  }
  offset = Math.ceil(offset / 16) * 16;
  return { uboElements, size: offset };
}
function getUBOData(uniforms, uniformData) {
  const usedUniformDatas = [];
  for (const i in uniforms) {
    if (uniformData[i]) {
      usedUniformDatas.push(uniformData[i]);
    }
  }
  usedUniformDatas.sort((a, b) => a.index - b.index);
  return usedUniformDatas;
}
function generateUniformBufferSync(group, uniformData) {
  if (!group.autoManage) {
    return { size: 0, syncFunc: uboUpdate };
  }
  const usedUniformDatas = getUBOData(group.uniforms, uniformData);
  const { uboElements, size } = createUBOElements(usedUniformDatas);
  const funcFragments = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let i = 0; i < uboElements.length; i++) {
    const uboElement = uboElements[i];
    const uniform = group.uniforms[uboElement.data.name];
    const name = uboElement.data.name;
    let parsed = false;
    for (let j = 0; j < uniformParsers.length; j++) {
      const uniformParser = uniformParsers[j];
      if (uniformParser.codeUbo && uniformParser.test(uboElement.data, uniform)) {
        funcFragments.push(`offset = ${uboElement.offset / 4};`, uniformParsers[j].codeUbo(uboElement.data.name, uniform));
        parsed = true;
        break;
      }
    }
    if (!parsed) {
      if (uboElement.data.size > 1) {
        const size2 = mapSize(uboElement.data.type);
        const rowSize = Math.max(GLSL_TO_STD40_SIZE[uboElement.data.type] / 16, 1);
        const elementSize = size2 / rowSize;
        const remainder = (4 - elementSize % 4) % 4;
        funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};

                t = 0;

                for(var i=0; i < ${uboElement.data.size * rowSize}; i++)
                {
                    for(var j = 0; j < ${elementSize}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${remainder};
                }

                `);
      } else {
        const template = UBO_TO_SINGLE_SETTERS[uboElement.data.type];
        funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};
                ${template};
                `);
      }
    }
  }
  funcFragments.push(`
       renderer.buffer.update(buffer);
    `);
  return {
    size,
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", funcFragments.join("\n"))
  };
}

// node_modules/@pixi/core/lib/shader/GLProgram.mjs
var GLProgram = class {
  constructor(program, uniformData) {
    this.program = program;
    this.uniformData = uniformData;
    this.uniformGroups = {};
    this.uniformDirtyGroups = {};
    this.uniformBufferBindings = {};
  }
  destroy() {
    this.uniformData = null;
    this.uniformGroups = null;
    this.uniformDirtyGroups = null;
    this.uniformBufferBindings = null;
    this.program = null;
  }
};

// node_modules/@pixi/core/lib/shader/utils/getAttributeData.mjs
function getAttributeData(program, gl) {
  const attributes = {};
  const totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < totalAttributes; i++) {
    const attribData = gl.getActiveAttrib(program, i);
    if (attribData.name.startsWith("gl_")) {
      continue;
    }
    const type = mapType(gl, attribData.type);
    const data = {
      type,
      name: attribData.name,
      size: mapSize(type),
      location: gl.getAttribLocation(program, attribData.name)
    };
    attributes[attribData.name] = data;
  }
  return attributes;
}

// node_modules/@pixi/core/lib/shader/utils/getUniformData.mjs
function getUniformData(program, gl) {
  const uniforms = {};
  const totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < totalUniforms; i++) {
    const uniformData = gl.getActiveUniform(program, i);
    const name = uniformData.name.replace(/\[.*?\]$/, "");
    const isArray = !!uniformData.name.match(/\[.*?\]$/);
    const type = mapType(gl, uniformData.type);
    uniforms[name] = {
      name,
      index: i,
      type,
      size: uniformData.size,
      isArray,
      value: defaultValue(type, uniformData.size)
    };
  }
  return uniforms;
}

// node_modules/@pixi/core/lib/shader/utils/generateProgram.mjs
function generateProgram(gl, program) {
  const glVertShader = compileShader(gl, gl.VERTEX_SHADER, program.vertexSrc);
  const glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, program.fragmentSrc);
  const webGLProgram = gl.createProgram();
  gl.attachShader(webGLProgram, glVertShader);
  gl.attachShader(webGLProgram, glFragShader);
  const transformFeedbackVaryings = program.extra?.transformFeedbackVaryings;
  if (transformFeedbackVaryings) {
    if (typeof gl.transformFeedbackVaryings !== "function") {
    } else {
      gl.transformFeedbackVaryings(webGLProgram, transformFeedbackVaryings.names, transformFeedbackVaryings.bufferMode === "separate" ? gl.SEPARATE_ATTRIBS : gl.INTERLEAVED_ATTRIBS);
    }
  }
  gl.linkProgram(webGLProgram);
  if (!gl.getProgramParameter(webGLProgram, gl.LINK_STATUS)) {
    logProgramError(gl, webGLProgram, glVertShader, glFragShader);
  }
  program.attributeData = getAttributeData(webGLProgram, gl);
  program.uniformData = getUniformData(webGLProgram, gl);
  if (!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(program.vertexSrc)) {
    const keys = Object.keys(program.attributeData);
    keys.sort((a, b) => a > b ? 1 : -1);
    for (let i = 0; i < keys.length; i++) {
      program.attributeData[keys[i]].location = i;
      gl.bindAttribLocation(webGLProgram, i, keys[i]);
    }
    gl.linkProgram(webGLProgram);
  }
  gl.deleteShader(glVertShader);
  gl.deleteShader(glFragShader);
  const uniformData = {};
  for (const i in program.uniformData) {
    const data = program.uniformData[i];
    uniformData[i] = {
      location: gl.getUniformLocation(webGLProgram, i),
      value: defaultValue(data.type, data.size)
    };
  }
  const glProgram = new GLProgram(webGLProgram, uniformData);
  return glProgram;
}

// node_modules/@pixi/core/lib/shader/ShaderSystem.mjs
var UID5 = 0;
var defaultSyncData = { textureCount: 0, uboCount: 0 };
var ShaderSystem = class {
  constructor(renderer) {
    this.destroyed = false;
    this.renderer = renderer;
    this.systemCheck();
    this.gl = null;
    this.shader = null;
    this.program = null;
    this.cache = {};
    this._uboCache = {};
    this.id = UID5++;
  }
  systemCheck() {
    if (!unsafeEvalSupported()) {
      throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }
  }
  contextChange(gl) {
    this.gl = gl;
    this.reset();
  }
  bind(shader, dontSync) {
    shader.disposeRunner.add(this);
    shader.uniforms.globals = this.renderer.globalUniforms;
    const program = shader.program;
    const glProgram = program.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(shader);
    this.shader = shader;
    if (this.program !== program) {
      this.program = program;
      this.gl.useProgram(glProgram.program);
    }
    if (!dontSync) {
      defaultSyncData.textureCount = 0;
      defaultSyncData.uboCount = 0;
      this.syncUniformGroup(shader.uniformGroup, defaultSyncData);
    }
    return glProgram;
  }
  setUniforms(uniforms) {
    const shader = this.shader.program;
    const glProgram = shader.glPrograms[this.renderer.CONTEXT_UID];
    shader.syncUniforms(glProgram.uniformData, uniforms, this.renderer);
  }
  syncUniformGroup(group, syncData) {
    const glProgram = this.getGlProgram();
    if (!group.static || group.dirtyId !== glProgram.uniformDirtyGroups[group.id]) {
      glProgram.uniformDirtyGroups[group.id] = group.dirtyId;
      this.syncUniforms(group, glProgram, syncData);
    }
  }
  syncUniforms(group, glProgram, syncData) {
    const syncFunc = group.syncUniforms[this.shader.program.id] || this.createSyncGroups(group);
    syncFunc(glProgram.uniformData, group.uniforms, this.renderer, syncData);
  }
  createSyncGroups(group) {
    const id = this.getSignature(group, this.shader.program.uniformData, "u");
    if (!this.cache[id]) {
      this.cache[id] = generateUniformsSync(group, this.shader.program.uniformData);
    }
    group.syncUniforms[this.shader.program.id] = this.cache[id];
    return group.syncUniforms[this.shader.program.id];
  }
  syncUniformBufferGroup(group, name) {
    const glProgram = this.getGlProgram();
    if (!group.static || group.dirtyId !== 0 || !glProgram.uniformGroups[group.id]) {
      group.dirtyId = 0;
      const syncFunc = glProgram.uniformGroups[group.id] || this.createSyncBufferGroup(group, glProgram, name);
      group.buffer.update();
      syncFunc(glProgram.uniformData, group.uniforms, this.renderer, defaultSyncData, group.buffer);
    }
    this.renderer.buffer.bindBufferBase(group.buffer, glProgram.uniformBufferBindings[name]);
  }
  createSyncBufferGroup(group, glProgram, name) {
    const { gl } = this.renderer;
    this.renderer.buffer.bind(group.buffer);
    const uniformBlockIndex = this.gl.getUniformBlockIndex(glProgram.program, name);
    glProgram.uniformBufferBindings[name] = this.shader.uniformBindCount;
    gl.uniformBlockBinding(glProgram.program, uniformBlockIndex, this.shader.uniformBindCount);
    this.shader.uniformBindCount++;
    const id = this.getSignature(group, this.shader.program.uniformData, "ubo");
    let uboData = this._uboCache[id];
    if (!uboData) {
      uboData = this._uboCache[id] = generateUniformBufferSync(group, this.shader.program.uniformData);
    }
    if (group.autoManage) {
      const data = new Float32Array(uboData.size / 4);
      group.buffer.update(data);
    }
    glProgram.uniformGroups[group.id] = uboData.syncFunc;
    return glProgram.uniformGroups[group.id];
  }
  getSignature(group, uniformData, preFix) {
    const uniforms = group.uniforms;
    const strings = [`${preFix}-`];
    for (const i in uniforms) {
      strings.push(i);
      if (uniformData[i]) {
        strings.push(uniformData[i].type);
      }
    }
    return strings.join("-");
  }
  getGlProgram() {
    if (this.shader) {
      return this.shader.program.glPrograms[this.renderer.CONTEXT_UID];
    }
    return null;
  }
  generateProgram(shader) {
    const gl = this.gl;
    const program = shader.program;
    const glProgram = generateProgram(gl, program);
    program.glPrograms[this.renderer.CONTEXT_UID] = glProgram;
    return glProgram;
  }
  reset() {
    this.program = null;
    this.shader = null;
  }
  disposeShader(shader) {
    if (this.shader === shader) {
      this.shader = null;
    }
  }
  destroy() {
    this.renderer = null;
    this.destroyed = true;
  }
};
ShaderSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "shader"
};
extensions.add(ShaderSystem);

// node_modules/@pixi/core/lib/state/utils/mapWebGLBlendModesToPixi.mjs
function mapWebGLBlendModesToPixi(gl, array = []) {
  array[BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.ADD] = [gl.ONE, gl.ONE];
  array[BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.NONE] = [0, 0];
  array[BLEND_MODES.NORMAL_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.ADD_NPM] = [gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE];
  array[BLEND_MODES.SCREEN_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SRC_IN] = [gl.DST_ALPHA, gl.ZERO];
  array[BLEND_MODES.SRC_OUT] = [gl.ONE_MINUS_DST_ALPHA, gl.ZERO];
  array[BLEND_MODES.SRC_ATOP] = [gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DST_OVER] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE];
  array[BLEND_MODES.DST_IN] = [gl.ZERO, gl.SRC_ALPHA];
  array[BLEND_MODES.DST_OUT] = [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DST_ATOP] = [gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA];
  array[BLEND_MODES.XOR] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SUBTRACT] = [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD];
  return array;
}

// node_modules/@pixi/core/lib/state/StateSystem.mjs
var BLEND2 = 0;
var OFFSET2 = 1;
var CULLING2 = 2;
var DEPTH_TEST2 = 3;
var WINDING2 = 4;
var DEPTH_MASK2 = 5;
var _StateSystem = class {
  constructor() {
    this.gl = null;
    this.stateId = 0;
    this.polygonOffset = 0;
    this.blendMode = BLEND_MODES.NONE;
    this._blendEq = false;
    this.map = [];
    this.map[BLEND2] = this.setBlend;
    this.map[OFFSET2] = this.setOffset;
    this.map[CULLING2] = this.setCullFace;
    this.map[DEPTH_TEST2] = this.setDepthTest;
    this.map[WINDING2] = this.setFrontFace;
    this.map[DEPTH_MASK2] = this.setDepthMask;
    this.checks = [];
    this.defaultState = new State();
    this.defaultState.blend = true;
  }
  contextChange(gl) {
    this.gl = gl;
    this.blendModes = mapWebGLBlendModesToPixi(gl);
    this.set(this.defaultState);
    this.reset();
  }
  set(state) {
    state = state || this.defaultState;
    if (this.stateId !== state.data) {
      let diff = this.stateId ^ state.data;
      let i = 0;
      while (diff) {
        if (diff & 1) {
          this.map[i].call(this, !!(state.data & 1 << i));
        }
        diff = diff >> 1;
        i++;
      }
      this.stateId = state.data;
    }
    for (let i = 0; i < this.checks.length; i++) {
      this.checks[i](this, state);
    }
  }
  forceState(state) {
    state = state || this.defaultState;
    for (let i = 0; i < this.map.length; i++) {
      this.map[i].call(this, !!(state.data & 1 << i));
    }
    for (let i = 0; i < this.checks.length; i++) {
      this.checks[i](this, state);
    }
    this.stateId = state.data;
  }
  setBlend(value) {
    this.updateCheck(_StateSystem.checkBlendMode, value);
    this.gl[value ? "enable" : "disable"](this.gl.BLEND);
  }
  setOffset(value) {
    this.updateCheck(_StateSystem.checkPolygonOffset, value);
    this.gl[value ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
  }
  setDepthTest(value) {
    this.gl[value ? "enable" : "disable"](this.gl.DEPTH_TEST);
  }
  setDepthMask(value) {
    this.gl.depthMask(value);
  }
  setCullFace(value) {
    this.gl[value ? "enable" : "disable"](this.gl.CULL_FACE);
  }
  setFrontFace(value) {
    this.gl.frontFace(this.gl[value ? "CW" : "CCW"]);
  }
  setBlendMode(value) {
    if (value === this.blendMode) {
      return;
    }
    this.blendMode = value;
    const mode = this.blendModes[value];
    const gl = this.gl;
    if (mode.length === 2) {
      gl.blendFunc(mode[0], mode[1]);
    } else {
      gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
    }
    if (mode.length === 6) {
      this._blendEq = true;
      gl.blendEquationSeparate(mode[4], mode[5]);
    } else if (this._blendEq) {
      this._blendEq = false;
      gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    }
  }
  setPolygonOffset(value, scale) {
    this.gl.polygonOffset(value, scale);
  }
  reset() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
    this.forceState(this.defaultState);
    this._blendEq = true;
    this.blendMode = -1;
    this.setBlendMode(0);
  }
  updateCheck(func, value) {
    const index = this.checks.indexOf(func);
    if (value && index === -1) {
      this.checks.push(func);
    } else if (!value && index !== -1) {
      this.checks.splice(index, 1);
    }
  }
  static checkBlendMode(system, state) {
    system.setBlendMode(state.blendMode);
  }
  static checkPolygonOffset(system, state) {
    system.setPolygonOffset(1, state.polygonOffset);
  }
  destroy() {
    this.gl = null;
  }
};
var StateSystem = _StateSystem;
StateSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "state"
};
extensions.add(StateSystem);

// node_modules/@pixi/core/lib/textures/TextureGCSystem.mjs
var TextureGCSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.count = 0;
    this.checkCount = 0;
    this.maxIdle = settings.GC_MAX_IDLE;
    this.checkCountMax = settings.GC_MAX_CHECK_COUNT;
    this.mode = settings.GC_MODE;
  }
  postrender() {
    if (!this.renderer.objectRenderer.renderingToScreen) {
      return;
    }
    this.count++;
    if (this.mode === GC_MODES.MANUAL) {
      return;
    }
    this.checkCount++;
    if (this.checkCount > this.checkCountMax) {
      this.checkCount = 0;
      this.run();
    }
  }
  run() {
    const tm = this.renderer.texture;
    const managedTextures = tm.managedTextures;
    let wasRemoved = false;
    for (let i = 0; i < managedTextures.length; i++) {
      const texture = managedTextures[i];
      if (!texture.framebuffer && this.count - texture.touched > this.maxIdle) {
        tm.destroyTexture(texture, true);
        managedTextures[i] = null;
        wasRemoved = true;
      }
    }
    if (wasRemoved) {
      let j = 0;
      for (let i = 0; i < managedTextures.length; i++) {
        if (managedTextures[i] !== null) {
          managedTextures[j++] = managedTextures[i];
        }
      }
      managedTextures.length = j;
    }
  }
  unload(displayObject) {
    const tm = this.renderer.texture;
    const texture = displayObject._texture;
    if (texture && !texture.framebuffer) {
      tm.destroyTexture(texture);
    }
    for (let i = displayObject.children.length - 1; i >= 0; i--) {
      this.unload(displayObject.children[i]);
    }
  }
  destroy() {
    this.renderer = null;
  }
};
TextureGCSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "textureGC"
};
extensions.add(TextureGCSystem);

// node_modules/@pixi/core/lib/textures/utils/mapTypeAndFormatToInternalFormat.mjs
function mapTypeAndFormatToInternalFormat(gl) {
  let table;
  if ("WebGL2RenderingContext" in globalThis && gl instanceof globalThis.WebGL2RenderingContext) {
    table = {
      [TYPES.UNSIGNED_BYTE]: {
        [FORMATS.RGBA]: gl.RGBA8,
        [FORMATS.RGB]: gl.RGB8,
        [FORMATS.RG]: gl.RG8,
        [FORMATS.RED]: gl.R8,
        [FORMATS.RGBA_INTEGER]: gl.RGBA8UI,
        [FORMATS.RGB_INTEGER]: gl.RGB8UI,
        [FORMATS.RG_INTEGER]: gl.RG8UI,
        [FORMATS.RED_INTEGER]: gl.R8UI,
        [FORMATS.ALPHA]: gl.ALPHA,
        [FORMATS.LUMINANCE]: gl.LUMINANCE,
        [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
      },
      [TYPES.BYTE]: {
        [FORMATS.RGBA]: gl.RGBA8_SNORM,
        [FORMATS.RGB]: gl.RGB8_SNORM,
        [FORMATS.RG]: gl.RG8_SNORM,
        [FORMATS.RED]: gl.R8_SNORM,
        [FORMATS.RGBA_INTEGER]: gl.RGBA8I,
        [FORMATS.RGB_INTEGER]: gl.RGB8I,
        [FORMATS.RG_INTEGER]: gl.RG8I,
        [FORMATS.RED_INTEGER]: gl.R8I
      },
      [TYPES.UNSIGNED_SHORT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA16UI,
        [FORMATS.RGB_INTEGER]: gl.RGB16UI,
        [FORMATS.RG_INTEGER]: gl.RG16UI,
        [FORMATS.RED_INTEGER]: gl.R16UI,
        [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT16
      },
      [TYPES.SHORT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA16I,
        [FORMATS.RGB_INTEGER]: gl.RGB16I,
        [FORMATS.RG_INTEGER]: gl.RG16I,
        [FORMATS.RED_INTEGER]: gl.R16I
      },
      [TYPES.UNSIGNED_INT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA32UI,
        [FORMATS.RGB_INTEGER]: gl.RGB32UI,
        [FORMATS.RG_INTEGER]: gl.RG32UI,
        [FORMATS.RED_INTEGER]: gl.R32UI,
        [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT24
      },
      [TYPES.INT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA32I,
        [FORMATS.RGB_INTEGER]: gl.RGB32I,
        [FORMATS.RG_INTEGER]: gl.RG32I,
        [FORMATS.RED_INTEGER]: gl.R32I
      },
      [TYPES.FLOAT]: {
        [FORMATS.RGBA]: gl.RGBA32F,
        [FORMATS.RGB]: gl.RGB32F,
        [FORMATS.RG]: gl.RG32F,
        [FORMATS.RED]: gl.R32F,
        [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT32F
      },
      [TYPES.HALF_FLOAT]: {
        [FORMATS.RGBA]: gl.RGBA16F,
        [FORMATS.RGB]: gl.RGB16F,
        [FORMATS.RG]: gl.RG16F,
        [FORMATS.RED]: gl.R16F
      },
      [TYPES.UNSIGNED_SHORT_5_6_5]: {
        [FORMATS.RGB]: gl.RGB565
      },
      [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
        [FORMATS.RGBA]: gl.RGBA4
      },
      [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
        [FORMATS.RGBA]: gl.RGB5_A1
      },
      [TYPES.UNSIGNED_INT_2_10_10_10_REV]: {
        [FORMATS.RGBA]: gl.RGB10_A2,
        [FORMATS.RGBA_INTEGER]: gl.RGB10_A2UI
      },
      [TYPES.UNSIGNED_INT_10F_11F_11F_REV]: {
        [FORMATS.RGB]: gl.R11F_G11F_B10F
      },
      [TYPES.UNSIGNED_INT_5_9_9_9_REV]: {
        [FORMATS.RGB]: gl.RGB9_E5
      },
      [TYPES.UNSIGNED_INT_24_8]: {
        [FORMATS.DEPTH_STENCIL]: gl.DEPTH24_STENCIL8
      },
      [TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
        [FORMATS.DEPTH_STENCIL]: gl.DEPTH32F_STENCIL8
      }
    };
  } else {
    table = {
      [TYPES.UNSIGNED_BYTE]: {
        [FORMATS.RGBA]: gl.RGBA,
        [FORMATS.RGB]: gl.RGB,
        [FORMATS.ALPHA]: gl.ALPHA,
        [FORMATS.LUMINANCE]: gl.LUMINANCE,
        [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
      },
      [TYPES.UNSIGNED_SHORT_5_6_5]: {
        [FORMATS.RGB]: gl.RGB
      },
      [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
        [FORMATS.RGBA]: gl.RGBA
      },
      [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
        [FORMATS.RGBA]: gl.RGBA
      }
    };
  }
  return table;
}

// node_modules/@pixi/core/lib/textures/GLTexture.mjs
var GLTexture = class {
  constructor(texture) {
    this.texture = texture;
    this.width = -1;
    this.height = -1;
    this.dirtyId = -1;
    this.dirtyStyleId = -1;
    this.mipmap = false;
    this.wrapMode = 33071;
    this.type = TYPES.UNSIGNED_BYTE;
    this.internalFormat = FORMATS.RGBA;
    this.samplerType = 0;
  }
};

// node_modules/@pixi/core/lib/textures/TextureSystem.mjs
var TextureSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.boundTextures = [];
    this.currentLocation = -1;
    this.managedTextures = [];
    this._unknownBoundTextures = false;
    this.unknownTexture = new BaseTexture();
    this.hasIntegerTextures = false;
  }
  contextChange() {
    const gl = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    this.webGLVersion = this.renderer.context.webGLVersion;
    this.internalFormats = mapTypeAndFormatToInternalFormat(gl);
    const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = maxTextures;
    for (let i = 0; i < maxTextures; i++) {
      this.boundTextures[i] = null;
    }
    this.emptyTextures = {};
    const emptyTexture2D = new GLTexture(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_2D, emptyTexture2D.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    this.emptyTextures[gl.TEXTURE_2D] = emptyTexture2D;
    this.emptyTextures[gl.TEXTURE_CUBE_MAP] = new GLTexture(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.emptyTextures[gl.TEXTURE_CUBE_MAP].texture);
    for (let i = 0; i < 6; i++) {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    for (let i = 0; i < this.boundTextures.length; i++) {
      this.bind(null, i);
    }
  }
  bind(texture, location = 0) {
    const { gl } = this;
    texture = texture?.castToBaseTexture();
    if (texture?.valid && !texture.parentTextureArray) {
      texture.touched = this.renderer.textureGC.count;
      const glTexture = texture._glTextures[this.CONTEXT_UID] || this.initTexture(texture);
      if (this.boundTextures[location] !== texture) {
        if (this.currentLocation !== location) {
          this.currentLocation = location;
          gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(texture.target, glTexture.texture);
      }
      if (glTexture.dirtyId !== texture.dirtyId) {
        if (this.currentLocation !== location) {
          this.currentLocation = location;
          gl.activeTexture(gl.TEXTURE0 + location);
        }
        this.updateTexture(texture);
      } else if (glTexture.dirtyStyleId !== texture.dirtyStyleId) {
        this.updateTextureStyle(texture);
      }
      this.boundTextures[location] = texture;
    } else {
      if (this.currentLocation !== location) {
        this.currentLocation = location;
        gl.activeTexture(gl.TEXTURE0 + location);
      }
      gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[gl.TEXTURE_2D].texture);
      this.boundTextures[location] = null;
    }
  }
  reset() {
    this._unknownBoundTextures = true;
    this.hasIntegerTextures = false;
    this.currentLocation = -1;
    for (let i = 0; i < this.boundTextures.length; i++) {
      this.boundTextures[i] = this.unknownTexture;
    }
  }
  unbind(texture) {
    const { gl, boundTextures } = this;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = false;
      for (let i = 0; i < boundTextures.length; i++) {
        if (boundTextures[i] === this.unknownTexture) {
          this.bind(null, i);
        }
      }
    }
    for (let i = 0; i < boundTextures.length; i++) {
      if (boundTextures[i] === texture) {
        if (this.currentLocation !== i) {
          gl.activeTexture(gl.TEXTURE0 + i);
          this.currentLocation = i;
        }
        gl.bindTexture(texture.target, this.emptyTextures[texture.target].texture);
        boundTextures[i] = null;
      }
    }
  }
  ensureSamplerType(maxTextures) {
    const { boundTextures, hasIntegerTextures, CONTEXT_UID } = this;
    if (!hasIntegerTextures) {
      return;
    }
    for (let i = maxTextures - 1; i >= 0; --i) {
      const tex = boundTextures[i];
      if (tex) {
        const glTexture = tex._glTextures[CONTEXT_UID];
        if (glTexture.samplerType !== SAMPLER_TYPES.FLOAT) {
          this.renderer.texture.unbind(tex);
        }
      }
    }
  }
  initTexture(texture) {
    const glTexture = new GLTexture(this.gl.createTexture());
    glTexture.dirtyId = -1;
    texture._glTextures[this.CONTEXT_UID] = glTexture;
    this.managedTextures.push(texture);
    texture.on("dispose", this.destroyTexture, this);
    return glTexture;
  }
  initTextureType(texture, glTexture) {
    glTexture.internalFormat = this.internalFormats[texture.type]?.[texture.format] ?? texture.format;
    if (this.webGLVersion === 2 && texture.type === TYPES.HALF_FLOAT) {
      glTexture.type = this.gl.HALF_FLOAT;
    } else {
      glTexture.type = texture.type;
    }
  }
  updateTexture(texture) {
    const glTexture = texture._glTextures[this.CONTEXT_UID];
    if (!glTexture) {
      return;
    }
    const renderer = this.renderer;
    this.initTextureType(texture, glTexture);
    if (texture.resource?.upload(renderer, texture, glTexture)) {
      if (glTexture.samplerType !== SAMPLER_TYPES.FLOAT) {
        this.hasIntegerTextures = true;
      }
    } else {
      const width = texture.realWidth;
      const height = texture.realHeight;
      const gl = renderer.gl;
      if (glTexture.width !== width || glTexture.height !== height || glTexture.dirtyId < 0) {
        glTexture.width = width;
        glTexture.height = height;
        gl.texImage2D(texture.target, 0, glTexture.internalFormat, width, height, 0, texture.format, glTexture.type, null);
      }
    }
    if (texture.dirtyStyleId !== glTexture.dirtyStyleId) {
      this.updateTextureStyle(texture);
    }
    glTexture.dirtyId = texture.dirtyId;
  }
  destroyTexture(texture, skipRemove) {
    const { gl } = this;
    texture = texture.castToBaseTexture();
    if (texture._glTextures[this.CONTEXT_UID]) {
      this.unbind(texture);
      gl.deleteTexture(texture._glTextures[this.CONTEXT_UID].texture);
      texture.off("dispose", this.destroyTexture, this);
      delete texture._glTextures[this.CONTEXT_UID];
      if (!skipRemove) {
        const i = this.managedTextures.indexOf(texture);
        if (i !== -1) {
          removeItems(this.managedTextures, i, 1);
        }
      }
    }
  }
  updateTextureStyle(texture) {
    const glTexture = texture._glTextures[this.CONTEXT_UID];
    if (!glTexture) {
      return;
    }
    if ((texture.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !texture.isPowerOfTwo) {
      glTexture.mipmap = false;
    } else {
      glTexture.mipmap = texture.mipmap >= 1;
    }
    if (this.webGLVersion !== 2 && !texture.isPowerOfTwo) {
      glTexture.wrapMode = WRAP_MODES.CLAMP;
    } else {
      glTexture.wrapMode = texture.wrapMode;
    }
    if (texture.resource?.style(this.renderer, texture, glTexture)) {
    } else {
      this.setStyle(texture, glTexture);
    }
    glTexture.dirtyStyleId = texture.dirtyStyleId;
  }
  setStyle(texture, glTexture) {
    const gl = this.gl;
    if (glTexture.mipmap && texture.mipmap !== MIPMAP_MODES.ON_MANUAL) {
      gl.generateMipmap(texture.target);
    }
    gl.texParameteri(texture.target, gl.TEXTURE_WRAP_S, glTexture.wrapMode);
    gl.texParameteri(texture.target, gl.TEXTURE_WRAP_T, glTexture.wrapMode);
    if (glTexture.mipmap) {
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
      const anisotropicExt = this.renderer.context.extensions.anisotropicFiltering;
      if (anisotropicExt && texture.anisotropicLevel > 0 && texture.scaleMode === SCALE_MODES.LINEAR) {
        const level = Math.min(texture.anisotropicLevel, gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        gl.texParameterf(texture.target, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
      }
    } else {
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
    }
    gl.texParameteri(texture.target, gl.TEXTURE_MAG_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
};
TextureSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "texture"
};
extensions.add(TextureSystem);

// node_modules/@pixi/core/lib/renderTexture/GenerateTextureSystem.mjs
var tempTransform = new Transform();
var GenerateTextureSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this._tempMatrix = new Matrix();
  }
  generateTexture(displayObject, options) {
    const { region: manualRegion, ...textureOptions } = options || {};
    const region = manualRegion || displayObject.getLocalBounds(null, true);
    if (region.width === 0)
      region.width = 1;
    if (region.height === 0)
      region.height = 1;
    const renderTexture = RenderTexture.create({
      width: region.width,
      height: region.height,
      ...textureOptions
    });
    this._tempMatrix.tx = -region.x;
    this._tempMatrix.ty = -region.y;
    const transform = displayObject.transform;
    displayObject.transform = tempTransform;
    this.renderer.render(displayObject, {
      renderTexture,
      transform: this._tempMatrix,
      skipUpdateTransform: !!displayObject.parent,
      blit: true
    });
    displayObject.transform = transform;
    return renderTexture;
  }
  destroy() {
  }
};
GenerateTextureSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
extensions.add(GenerateTextureSystem);

// node_modules/@pixi/core/lib/background/BackgroundSystem.mjs
var BackgroundSystem = class {
  constructor() {
    this.clearBeforeRender = true;
    this._backgroundColor = 0;
    this._backgroundColorRgba = [0, 0, 0, 1];
    this._backgroundColorString = "#000000";
    this.color = this._backgroundColor;
    this.alpha = 1;
  }
  init(options) {
    this.clearBeforeRender = options.clearBeforeRender;
    if (options.color) {
      this.color = typeof options.color === "string" ? string2hex(options.color) : options.color;
    }
    this.alpha = options.alpha;
  }
  get color() {
    return this._backgroundColor;
  }
  set color(value) {
    this._backgroundColor = value;
    this._backgroundColorString = hex2string(value);
    hex2rgb(value, this._backgroundColorRgba);
  }
  get alpha() {
    return this._backgroundColorRgba[3];
  }
  set alpha(value) {
    this._backgroundColorRgba[3] = value;
  }
  get colorRgba() {
    return this._backgroundColorRgba;
  }
  get colorString() {
    return this._backgroundColorString;
  }
  destroy() {
  }
};
BackgroundSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "background"
};
extensions.add(BackgroundSystem);

// node_modules/@pixi/core/lib/view/ViewSystem.mjs
var ViewSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  init(options) {
    this.screen = new Rectangle(0, 0, options.width, options.height);
    this.element = options.view || settings.ADAPTER.createCanvas();
    this.resolution = options.resolution || settings.RESOLUTION;
    this.autoDensity = !!options.autoDensity;
  }
  resizeView(desiredScreenWidth, desiredScreenHeight) {
    this.element.width = Math.round(desiredScreenWidth * this.resolution);
    this.element.height = Math.round(desiredScreenHeight * this.resolution);
    const screenWidth = this.element.width / this.resolution;
    const screenHeight = this.element.height / this.resolution;
    this.screen.width = screenWidth;
    this.screen.height = screenHeight;
    if (this.autoDensity) {
      this.element.style.width = `${screenWidth}px`;
      this.element.style.height = `${screenHeight}px`;
    }
    this.renderer.emit("resize", screenWidth, screenHeight);
    this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
  }
  destroy(removeView) {
    if (removeView) {
      this.element.parentNode?.removeChild(this.element);
    }
    this.renderer = null;
    this.element = null;
    this.screen = null;
  }
};
ViewSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "_view"
};
extensions.add(ViewSystem);

// node_modules/@pixi/core/lib/plugin/PluginSystem.mjs
var PluginSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.plugins = {};
  }
  init(staticMap) {
    for (const o in staticMap) {
      this.plugins[o] = new staticMap[o](this.renderer);
    }
  }
  destroy() {
    for (const o in this.plugins) {
      this.plugins[o].destroy();
      this.plugins[o] = null;
    }
  }
};
PluginSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "_plugin"
};
extensions.add(PluginSystem);

// node_modules/@pixi/core/lib/system/SystemManager.mjs
var SystemManager = class extends import_eventemitter3.default {
  constructor() {
    super(...arguments);
    this.runners = {};
    this._systemsHash = {};
  }
  setup(config) {
    this.addRunners(...config.runners);
    const priority = (config.priority ?? []).filter((key) => config.systems[key]);
    const orderByPriority = [
      ...priority,
      ...Object.keys(config.systems).filter((key) => !priority.includes(key))
    ];
    for (const i of orderByPriority) {
      this.addSystem(config.systems[i], i);
    }
  }
  addRunners(...runnerIds) {
    runnerIds.forEach((runnerId) => {
      this.runners[runnerId] = new Runner(runnerId);
    });
  }
  addSystem(ClassRef, name) {
    const system = new ClassRef(this);
    if (this[name]) {
      throw new Error(`Whoops! The name "${name}" is already in use`);
    }
    this[name] = system;
    this._systemsHash[name] = system;
    for (const i in this.runners) {
      this.runners[i].add(system);
    }
    return this;
  }
  emitWithCustomOptions(runner, options) {
    const systemHashKeys = Object.keys(this._systemsHash);
    runner.items.forEach((system) => {
      const systemName = systemHashKeys.find((systemId) => this._systemsHash[systemId] === system);
      system[runner.name](options[systemName]);
    });
  }
  destroy() {
    Object.values(this.runners).forEach((runner) => {
      runner.destroy();
    });
    this._systemsHash = {};
  }
};

// node_modules/@pixi/core/lib/startup/StartupSystem.mjs
var StartupSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  run(options) {
    const renderer = this.renderer;
    renderer.emitWithCustomOptions(renderer.runners.init, options);
    if (options.hello) {
      console.log(`PixiJS ${"7.0.0"} - ${renderer.rendererLogId} - https://pixijs.com`);
    }
    renderer.resize(this.renderer.screen.width, this.renderer.screen.height);
  }
  destroy() {
  }
};
StartupSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "startup"
};
extensions.add(StartupSystem);

// node_modules/@pixi/core/lib/transformFeedback/TransformFeedbackSystem.mjs
var TransformFeedbackSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  contextChange() {
    this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  bind(transformFeedback) {
    const { gl, CONTEXT_UID } = this;
    const glTransformFeedback = transformFeedback._glTransformFeedbacks[CONTEXT_UID] || this.createGLTransformFeedback(transformFeedback);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
  }
  unbind() {
    const { gl } = this;
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  }
  beginTransformFeedback(drawMode, shader) {
    const { gl, renderer } = this;
    if (shader) {
      renderer.shader.bind(shader);
    }
    gl.beginTransformFeedback(drawMode);
  }
  endTransformFeedback() {
    const { gl } = this;
    gl.endTransformFeedback();
  }
  createGLTransformFeedback(tf) {
    const { gl, renderer, CONTEXT_UID } = this;
    const glTransformFeedback = gl.createTransformFeedback();
    tf._glTransformFeedbacks[CONTEXT_UID] = glTransformFeedback;
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
    for (let i = 0; i < tf.buffers.length; i++) {
      const buffer = tf.buffers[i];
      if (!buffer)
        continue;
      renderer.buffer.update(buffer);
      buffer._glBuffers[CONTEXT_UID].refCount++;
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, i, buffer._glBuffers[CONTEXT_UID].buffer || null);
    }
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    tf.disposeRunner.add(this);
    return glTransformFeedback;
  }
  disposeTransformFeedback(tf, contextLost) {
    const glTF = tf._glTransformFeedbacks[this.CONTEXT_UID];
    const gl = this.gl;
    tf.disposeRunner.remove(this);
    const bufferSystem = this.renderer.buffer;
    if (bufferSystem) {
      for (let i = 0; i < tf.buffers.length; i++) {
        const buffer = tf.buffers[i];
        if (!buffer)
          continue;
        const buf = buffer._glBuffers[this.CONTEXT_UID];
        if (buf) {
          buf.refCount--;
          if (buf.refCount === 0 && !contextLost) {
            bufferSystem.dispose(buffer, contextLost);
          }
        }
      }
    }
    if (!glTF) {
      return;
    }
    if (!contextLost) {
      gl.deleteTransformFeedback(glTF);
    }
    delete tf._glTransformFeedbacks[this.CONTEXT_UID];
  }
  destroy() {
    this.renderer = null;
  }
};
TransformFeedbackSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "transformFeedback"
};
extensions.add(TransformFeedbackSystem);

// node_modules/@pixi/core/lib/autoDetectRenderer.mjs
var renderers = [];
extensions.handleByList(ExtensionType.Renderer, renderers);

// node_modules/@pixi/core/lib/Renderer.mjs
var _Renderer = class extends SystemManager {
  constructor(options) {
    super();
    options = Object.assign({}, settings.RENDER_OPTIONS, options);
    this.gl = null;
    this.CONTEXT_UID = 0;
    this.globalUniforms = new UniformGroup({
      projectionMatrix: new Matrix()
    }, true);
    const systemConfig = {
      runners: ["init", "destroy", "contextChange", "reset", "update", "postrender", "prerender", "resize"],
      systems: _Renderer.__systems,
      priority: [
        "_view",
        "textureGenerator",
        "background",
        "_plugin",
        "startup",
        "context",
        "state",
        "texture",
        "buffer",
        "geometry",
        "framebuffer",
        "transformFeedback",
        "mask",
        "scissor",
        "stencil",
        "projection",
        "textureGC",
        "filter",
        "renderTexture",
        "batch",
        "objectRenderer",
        "_multisample"
      ]
    };
    this.setup(systemConfig);
    const startupOptions = {
      hello: options.hello,
      _plugin: _Renderer.__plugins,
      background: {
        alpha: options.backgroundAlpha,
        color: options.background ?? options.backgroundColor,
        clearBeforeRender: options.clearBeforeRender
      },
      _view: {
        height: options.height,
        width: options.width,
        autoDensity: options.autoDensity,
        resolution: options.resolution,
        view: options.view
      },
      context: {
        antialias: options.antialias,
        context: options.context,
        powerPreference: options.powerPreference,
        premultipliedAlpha: options.premultipliedAlpha ?? (options.useContextAlpha && options.useContextAlpha !== "notMultiplied"),
        preserveDrawingBuffer: options.preserveDrawingBuffer
      }
    };
    this.startup.run(startupOptions);
  }
  static test(options) {
    if (options?.forceCanvas) {
      return false;
    }
    return isWebGLSupported();
  }
  render(displayObject, options) {
    this.objectRenderer.render(displayObject, options);
  }
  resize(desiredScreenWidth, desiredScreenHeight) {
    this._view.resizeView(desiredScreenWidth, desiredScreenHeight);
  }
  reset() {
    this.runners.reset.emit();
    return this;
  }
  clear() {
    this.renderTexture.bind();
    this.renderTexture.clear();
  }
  destroy(removeView = false) {
    this.runners.destroy.items.reverse();
    this.emitWithCustomOptions(this.runners.destroy, {
      _view: removeView
    });
    super.destroy();
  }
  get plugins() {
    return this._plugin.plugins;
  }
  get multisample() {
    return this._multisample.multisample;
  }
  get width() {
    return this._view.element.width;
  }
  get height() {
    return this._view.element.height;
  }
  get resolution() {
    return this._view.resolution;
  }
  get autoDensity() {
    return this._view.autoDensity;
  }
  get view() {
    return this._view.element;
  }
  get screen() {
    return this._view.screen;
  }
  get lastObjectRendered() {
    return this.objectRenderer.lastObjectRendered;
  }
  get renderingToScreen() {
    return this.objectRenderer.renderingToScreen;
  }
  get rendererLogId() {
    return `WebGL ${this.context.webGLVersion}`;
  }
  get clearBeforeRender() {
    return this.background.clearBeforeRender;
  }
  get useContextAlpha() {
    return this.context.useContextAlpha;
  }
  get preserveDrawingBuffer() {
    return this.context.preserveDrawingBuffer;
  }
  get backgroundColor() {
    return this.background.color;
  }
  set backgroundColor(value) {
    this.background.color = value;
  }
  get backgroundAlpha() {
    return this.background.color;
  }
  set backgroundAlpha(value) {
    this.background.alpha = value;
  }
  get powerPreference() {
    return this.context.powerPreference;
  }
  generateTexture(displayObject, options) {
    return this.textureGenerator.generateTexture(displayObject, options);
  }
};
var Renderer = _Renderer;
Renderer.extension = {
  type: ExtensionType.Renderer,
  priority: 1
};
Renderer.__plugins = {};
Renderer.__systems = {};
extensions.handleByMap(ExtensionType.RendererPlugin, Renderer.__plugins);
extensions.handleByMap(ExtensionType.RendererSystem, Renderer.__systems);
extensions.add(Renderer);

// node_modules/@pixi/core/lib/batch/BatchDrawCall.mjs
var BatchDrawCall = class {
  constructor() {
    this.texArray = null;
    this.blend = 0;
    this.type = DRAW_MODES.TRIANGLES;
    this.start = 0;
    this.size = 0;
    this.data = null;
  }
};

// node_modules/@pixi/core/lib/batch/BatchTextureArray.mjs
var BatchTextureArray = class {
  constructor() {
    this.elements = [];
    this.ids = [];
    this.count = 0;
  }
  clear() {
    for (let i = 0; i < this.count; i++) {
      this.elements[i] = null;
    }
    this.count = 0;
  }
};

// node_modules/@pixi/core/lib/geometry/ViewableBuffer.mjs
var ViewableBuffer = class {
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
  }
  get int8View() {
    if (!this._int8View) {
      this._int8View = new Int8Array(this.rawBinaryData);
    }
    return this._int8View;
  }
  get uint8View() {
    if (!this._uint8View) {
      this._uint8View = new Uint8Array(this.rawBinaryData);
    }
    return this._uint8View;
  }
  get int16View() {
    if (!this._int16View) {
      this._int16View = new Int16Array(this.rawBinaryData);
    }
    return this._int16View;
  }
  get uint16View() {
    if (!this._uint16View) {
      this._uint16View = new Uint16Array(this.rawBinaryData);
    }
    return this._uint16View;
  }
  get int32View() {
    if (!this._int32View) {
      this._int32View = new Int32Array(this.rawBinaryData);
    }
    return this._int32View;
  }
  view(type) {
    return this[`${type}View`];
  }
  destroy() {
    this.rawBinaryData = null;
    this._int8View = null;
    this._uint8View = null;
    this._int16View = null;
    this._uint16View = null;
    this._int32View = null;
    this.uint32View = null;
    this.float32View = null;
  }
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

// node_modules/@pixi/core/lib/batch/BatchShaderGenerator.mjs
var BatchShaderGenerator = class {
  constructor(vertexSrc, fragTemplate2) {
    this.vertexSrc = vertexSrc;
    this.fragTemplate = fragTemplate2;
    this.programCache = {};
    this.defaultGroupCache = {};
    if (!fragTemplate2.includes("%count%")) {
      throw new Error('Fragment template must contain "%count%".');
    }
    if (!fragTemplate2.includes("%forloop%")) {
      throw new Error('Fragment template must contain "%forloop%".');
    }
  }
  generateShader(maxTextures) {
    if (!this.programCache[maxTextures]) {
      const sampleValues = new Int32Array(maxTextures);
      for (let i = 0; i < maxTextures; i++) {
        sampleValues[i] = i;
      }
      this.defaultGroupCache[maxTextures] = UniformGroup.from({ uSamplers: sampleValues }, true);
      let fragmentSrc = this.fragTemplate;
      fragmentSrc = fragmentSrc.replace(/%count%/gi, `${maxTextures}`);
      fragmentSrc = fragmentSrc.replace(/%forloop%/gi, this.generateSampleSrc(maxTextures));
      this.programCache[maxTextures] = new Program(this.vertexSrc, fragmentSrc);
    }
    const uniforms = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new Matrix(),
      default: this.defaultGroupCache[maxTextures]
    };
    return new Shader(this.programCache[maxTextures], uniforms);
  }
  generateSampleSrc(maxTextures) {
    let src = "";
    src += "\n";
    src += "\n";
    for (let i = 0; i < maxTextures; i++) {
      if (i > 0) {
        src += "\nelse ";
      }
      if (i < maxTextures - 1) {
        src += `if(vTextureId < ${i}.5)`;
      }
      src += "\n{";
      src += `
	color = texture2D(uSamplers[${i}], vTextureCoord);`;
      src += "\n}";
    }
    src += "\n";
    src += "\n";
    return src;
  }
};

// node_modules/@pixi/core/lib/batch/BatchGeometry.mjs
var BatchGeometry = class extends Geometry {
  constructor(_static = false) {
    super();
    this._buffer = new Buffer2(null, _static, false);
    this._indexBuffer = new Buffer2(null, _static, true);
    this.addAttribute("aVertexPosition", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aColor", this._buffer, 4, true, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, true, TYPES.FLOAT).addIndex(this._indexBuffer);
  }
};

// node_modules/@pixi/core/lib/batch/texture.mjs
var defaultVertex3 = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n";

// node_modules/@pixi/core/lib/batch/texture2.mjs
var defaultFragment3 = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n";

// node_modules/@pixi/core/lib/batch/BatchRenderer.mjs
var _BatchRenderer = class extends ObjectRenderer {
  constructor(renderer) {
    super(renderer);
    this.setShaderGenerator();
    this.geometryClass = BatchGeometry;
    this.vertexSize = 6;
    this.state = State.for2d();
    this.size = settings.SPRITE_BATCH_SIZE * 4;
    this._vertexCount = 0;
    this._indexCount = 0;
    this._bufferedElements = [];
    this._bufferedTextures = [];
    this._bufferSize = 0;
    this._shader = null;
    this._packedGeometries = [];
    this._packedGeometryPoolSize = 2;
    this._flushId = 0;
    this._aBuffers = {};
    this._iBuffers = {};
    this.MAX_TEXTURES = 1;
    this.renderer.on("prerender", this.onPrerender, this);
    renderer.runners.contextChange.add(this);
    this._dcIndex = 0;
    this._aIndex = 0;
    this._iIndex = 0;
    this._attributeBuffer = null;
    this._indexBuffer = null;
    this._tempBoundTextures = [];
  }
  static get defaultVertexSrc() {
    return defaultVertex3;
  }
  static get defaultFragmentTemplate() {
    return defaultFragment3;
  }
  setShaderGenerator({
    vertex: vertex2 = _BatchRenderer.defaultVertexSrc,
    fragment: fragment2 = _BatchRenderer.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new BatchShaderGenerator(vertex2, fragment2);
  }
  contextChange() {
    const gl = this.renderer.gl;
    if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
      this.MAX_TEXTURES = 1;
    } else {
      this.MAX_TEXTURES = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), settings.SPRITE_MAX_TEXTURES);
      this.MAX_TEXTURES = checkMaxIfStatementsInShader(this.MAX_TEXTURES, gl);
    }
    this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
    for (let i = 0; i < this._packedGeometryPoolSize; i++) {
      this._packedGeometries[i] = new this.geometryClass();
    }
    this.initFlushBuffers();
  }
  initFlushBuffers() {
    const {
      _drawCallPool,
      _textureArrayPool
    } = _BatchRenderer;
    const MAX_SPRITES = this.size / 4;
    const MAX_TA = Math.floor(MAX_SPRITES / this.MAX_TEXTURES) + 1;
    while (_drawCallPool.length < MAX_SPRITES) {
      _drawCallPool.push(new BatchDrawCall());
    }
    while (_textureArrayPool.length < MAX_TA) {
      _textureArrayPool.push(new BatchTextureArray());
    }
    for (let i = 0; i < this.MAX_TEXTURES; i++) {
      this._tempBoundTextures[i] = null;
    }
  }
  onPrerender() {
    this._flushId = 0;
  }
  render(element) {
    if (!element._texture.valid) {
      return;
    }
    if (this._vertexCount + element.vertexData.length / 2 > this.size) {
      this.flush();
    }
    this._vertexCount += element.vertexData.length / 2;
    this._indexCount += element.indices.length;
    this._bufferedTextures[this._bufferSize] = element._texture.baseTexture;
    this._bufferedElements[this._bufferSize++] = element;
  }
  buildTexturesAndDrawCalls() {
    const {
      _bufferedTextures: textures,
      MAX_TEXTURES
    } = this;
    const textureArrays = _BatchRenderer._textureArrayPool;
    const batch = this.renderer.batch;
    const boundTextures = this._tempBoundTextures;
    const touch = this.renderer.textureGC.count;
    let TICK = ++BaseTexture._globalBatch;
    let countTexArrays = 0;
    let texArray = textureArrays[0];
    let start = 0;
    batch.copyBoundTextures(boundTextures, MAX_TEXTURES);
    for (let i = 0; i < this._bufferSize; ++i) {
      const tex = textures[i];
      textures[i] = null;
      if (tex._batchEnabled === TICK) {
        continue;
      }
      if (texArray.count >= MAX_TEXTURES) {
        batch.boundArray(texArray, boundTextures, TICK, MAX_TEXTURES);
        this.buildDrawCalls(texArray, start, i);
        start = i;
        texArray = textureArrays[++countTexArrays];
        ++TICK;
      }
      tex._batchEnabled = TICK;
      tex.touched = touch;
      texArray.elements[texArray.count++] = tex;
    }
    if (texArray.count > 0) {
      batch.boundArray(texArray, boundTextures, TICK, MAX_TEXTURES);
      this.buildDrawCalls(texArray, start, this._bufferSize);
      ++countTexArrays;
      ++TICK;
    }
    for (let i = 0; i < boundTextures.length; i++) {
      boundTextures[i] = null;
    }
    BaseTexture._globalBatch = TICK;
  }
  buildDrawCalls(texArray, start, finish) {
    const {
      _bufferedElements: elements,
      _attributeBuffer,
      _indexBuffer,
      vertexSize
    } = this;
    const drawCalls = _BatchRenderer._drawCallPool;
    let dcIndex = this._dcIndex;
    let aIndex = this._aIndex;
    let iIndex = this._iIndex;
    let drawCall = drawCalls[dcIndex];
    drawCall.start = this._iIndex;
    drawCall.texArray = texArray;
    for (let i = start; i < finish; ++i) {
      const sprite = elements[i];
      const tex = sprite._texture.baseTexture;
      const spriteBlendMode = premultiplyBlendMode[tex.alphaMode ? 1 : 0][sprite.blendMode];
      elements[i] = null;
      if (start < i && drawCall.blend !== spriteBlendMode) {
        drawCall.size = iIndex - drawCall.start;
        start = i;
        drawCall = drawCalls[++dcIndex];
        drawCall.texArray = texArray;
        drawCall.start = iIndex;
      }
      this.packInterleavedGeometry(sprite, _attributeBuffer, _indexBuffer, aIndex, iIndex);
      aIndex += sprite.vertexData.length / 2 * vertexSize;
      iIndex += sprite.indices.length;
      drawCall.blend = spriteBlendMode;
    }
    if (start < finish) {
      drawCall.size = iIndex - drawCall.start;
      ++dcIndex;
    }
    this._dcIndex = dcIndex;
    this._aIndex = aIndex;
    this._iIndex = iIndex;
  }
  bindAndClearTexArray(texArray) {
    const textureSystem = this.renderer.texture;
    for (let j = 0; j < texArray.count; j++) {
      textureSystem.bind(texArray.elements[j], texArray.ids[j]);
      texArray.elements[j] = null;
    }
    texArray.count = 0;
  }
  updateGeometry() {
    const {
      _packedGeometries: packedGeometries,
      _attributeBuffer: attributeBuffer,
      _indexBuffer: indexBuffer
    } = this;
    if (!settings.CAN_UPLOAD_SAME_BUFFER) {
      if (this._packedGeometryPoolSize <= this._flushId) {
        this._packedGeometryPoolSize++;
        packedGeometries[this._flushId] = new this.geometryClass();
      }
      packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
      packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
      this.renderer.geometry.bind(packedGeometries[this._flushId]);
      this.renderer.geometry.updateBuffers();
      this._flushId++;
    } else {
      packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
      packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
      this.renderer.geometry.updateBuffers();
    }
  }
  drawBatches() {
    const dcCount = this._dcIndex;
    const { gl, state: stateSystem } = this.renderer;
    const drawCalls = _BatchRenderer._drawCallPool;
    let curTexArray = null;
    for (let i = 0; i < dcCount; i++) {
      const { texArray, type, size, start, blend } = drawCalls[i];
      if (curTexArray !== texArray) {
        curTexArray = texArray;
        this.bindAndClearTexArray(texArray);
      }
      this.state.blendMode = blend;
      stateSystem.set(this.state);
      gl.drawElements(type, size, gl.UNSIGNED_SHORT, start * 2);
    }
  }
  flush() {
    if (this._vertexCount === 0) {
      return;
    }
    this._attributeBuffer = this.getAttributeBuffer(this._vertexCount);
    this._indexBuffer = this.getIndexBuffer(this._indexCount);
    this._aIndex = 0;
    this._iIndex = 0;
    this._dcIndex = 0;
    this.buildTexturesAndDrawCalls();
    this.updateGeometry();
    this.drawBatches();
    this._bufferSize = 0;
    this._vertexCount = 0;
    this._indexCount = 0;
  }
  start() {
    this.renderer.state.set(this.state);
    this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES);
    this.renderer.shader.bind(this._shader);
    if (settings.CAN_UPLOAD_SAME_BUFFER) {
      this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
    }
  }
  stop() {
    this.flush();
  }
  destroy() {
    for (let i = 0; i < this._packedGeometryPoolSize; i++) {
      if (this._packedGeometries[i]) {
        this._packedGeometries[i].destroy();
      }
    }
    this.renderer.off("prerender", this.onPrerender, this);
    this._aBuffers = null;
    this._iBuffers = null;
    this._packedGeometries = null;
    this._attributeBuffer = null;
    this._indexBuffer = null;
    if (this._shader) {
      this._shader.destroy();
      this._shader = null;
    }
    super.destroy();
  }
  getAttributeBuffer(size) {
    const roundedP2 = nextPow2(Math.ceil(size / 8));
    const roundedSizeIndex = log2(roundedP2);
    const roundedSize = roundedP2 * 8;
    if (this._aBuffers.length <= roundedSizeIndex) {
      this._iBuffers.length = roundedSizeIndex + 1;
    }
    let buffer = this._aBuffers[roundedSize];
    if (!buffer) {
      this._aBuffers[roundedSize] = buffer = new ViewableBuffer(roundedSize * this.vertexSize * 4);
    }
    return buffer;
  }
  getIndexBuffer(size) {
    const roundedP2 = nextPow2(Math.ceil(size / 12));
    const roundedSizeIndex = log2(roundedP2);
    const roundedSize = roundedP2 * 12;
    if (this._iBuffers.length <= roundedSizeIndex) {
      this._iBuffers.length = roundedSizeIndex + 1;
    }
    let buffer = this._iBuffers[roundedSizeIndex];
    if (!buffer) {
      this._iBuffers[roundedSizeIndex] = buffer = new Uint16Array(roundedSize);
    }
    return buffer;
  }
  packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
    const {
      uint32View,
      float32View
    } = attributeBuffer;
    const packedVertices = aIndex / this.vertexSize;
    const uvs = element.uvs;
    const indicies = element.indices;
    const vertexData = element.vertexData;
    const textureId = element._texture.baseTexture._batchLocation;
    const alpha = Math.min(element.worldAlpha, 1);
    const argb = alpha < 1 && element._texture.baseTexture.alphaMode ? premultiplyTint(element._tintRGB, alpha) : element._tintRGB + (alpha * 255 << 24);
    for (let i = 0; i < vertexData.length; i += 2) {
      float32View[aIndex++] = vertexData[i];
      float32View[aIndex++] = vertexData[i + 1];
      float32View[aIndex++] = uvs[i];
      float32View[aIndex++] = uvs[i + 1];
      uint32View[aIndex++] = argb;
      float32View[aIndex++] = textureId;
    }
    for (let i = 0; i < indicies.length; i++) {
      indexBuffer[iIndex++] = packedVertices + indicies[i];
    }
  }
};
var BatchRenderer = _BatchRenderer;
BatchRenderer.extension = {
  name: "batch",
  type: ExtensionType.RendererPlugin
};
BatchRenderer._drawCallPool = [];
BatchRenderer._textureArrayPool = [];
extensions.add(BatchRenderer);

// node_modules/@pixi/core/lib/geometry/GLBuffer.mjs
var GLBuffer = class {
  constructor(buffer) {
    this.buffer = buffer || null;
    this.updateID = -1;
    this.byteLength = -1;
    this.refCount = 0;
  }
};

// node_modules/@pixi/core/lib/geometry/BufferSystem.mjs
var BufferSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.managedBuffers = {};
    this.boundBufferBases = {};
  }
  destroy() {
    this.renderer = null;
  }
  contextChange() {
    this.disposeAll(true);
    this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  bind(buffer) {
    const { gl, CONTEXT_UID } = this;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    gl.bindBuffer(buffer.type, glBuffer.buffer);
  }
  unbind(type) {
    const { gl } = this;
    gl.bindBuffer(type, null);
  }
  bindBufferBase(buffer, index) {
    const { gl, CONTEXT_UID } = this;
    if (this.boundBufferBases[index] !== buffer) {
      const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
      this.boundBufferBases[index] = buffer;
      gl.bindBufferBase(gl.UNIFORM_BUFFER, index, glBuffer.buffer);
    }
  }
  bindBufferRange(buffer, index, offset) {
    const { gl, CONTEXT_UID } = this;
    offset = offset || 0;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    gl.bindBufferRange(gl.UNIFORM_BUFFER, index || 0, glBuffer.buffer, offset * 256, 256);
  }
  update(buffer) {
    const { gl, CONTEXT_UID } = this;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    if (buffer._updateID === glBuffer.updateID) {
      return;
    }
    glBuffer.updateID = buffer._updateID;
    gl.bindBuffer(buffer.type, glBuffer.buffer);
    if (glBuffer.byteLength >= buffer.data.byteLength) {
      gl.bufferSubData(buffer.type, 0, buffer.data);
    } else {
      const drawType = buffer.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
      glBuffer.byteLength = buffer.data.byteLength;
      gl.bufferData(buffer.type, buffer.data, drawType);
    }
  }
  dispose(buffer, contextLost) {
    if (!this.managedBuffers[buffer.id]) {
      return;
    }
    delete this.managedBuffers[buffer.id];
    const glBuffer = buffer._glBuffers[this.CONTEXT_UID];
    const gl = this.gl;
    buffer.disposeRunner.remove(this);
    if (!glBuffer) {
      return;
    }
    if (!contextLost) {
      gl.deleteBuffer(glBuffer.buffer);
    }
    delete buffer._glBuffers[this.CONTEXT_UID];
  }
  disposeAll(contextLost) {
    const all = Object.keys(this.managedBuffers);
    for (let i = 0; i < all.length; i++) {
      this.dispose(this.managedBuffers[all[i]], contextLost);
    }
  }
  createGLBuffer(buffer) {
    const { CONTEXT_UID, gl } = this;
    buffer._glBuffers[CONTEXT_UID] = new GLBuffer(gl.createBuffer());
    this.managedBuffers[buffer.id] = buffer;
    buffer.disposeRunner.add(this);
    return buffer._glBuffers[CONTEXT_UID];
  }
};
BufferSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "buffer"
};
extensions.add(BufferSystem);

// node_modules/@pixi/core/lib/framebuffer/MultisampleSystem.mjs
var MultisampleSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  contextChange(gl) {
    let samples;
    if (this.renderer.context.webGLVersion === 1) {
      const framebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      samples = gl.getParameter(gl.SAMPLES);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    } else {
      const framebuffer = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
      samples = gl.getParameter(gl.SAMPLES);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, framebuffer);
    }
    if (samples >= MSAA_QUALITY.HIGH) {
      this.multisample = MSAA_QUALITY.HIGH;
    } else if (samples >= MSAA_QUALITY.MEDIUM) {
      this.multisample = MSAA_QUALITY.MEDIUM;
    } else if (samples >= MSAA_QUALITY.LOW) {
      this.multisample = MSAA_QUALITY.LOW;
    } else {
      this.multisample = MSAA_QUALITY.NONE;
    }
  }
  destroy() {
  }
};
MultisampleSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "_multisample"
};
extensions.add(MultisampleSystem);

// node_modules/@pixi/core/lib/render/ObjectRendererSystem.mjs
var ObjectRendererSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  render(displayObject, options) {
    const renderer = this.renderer;
    let renderTexture;
    let clear;
    let transform;
    let skipUpdateTransform;
    if (options) {
      renderTexture = options.renderTexture;
      clear = options.clear;
      transform = options.transform;
      skipUpdateTransform = options.skipUpdateTransform;
    }
    this.renderingToScreen = !renderTexture;
    renderer.runners.prerender.emit();
    renderer.emit("prerender");
    renderer.projection.transform = transform;
    if (renderer.context.isLost) {
      return;
    }
    if (!renderTexture) {
      this.lastObjectRendered = displayObject;
    }
    if (!skipUpdateTransform) {
      const cacheParent = displayObject.enableTempParent();
      displayObject.updateTransform();
      displayObject.disableTempParent(cacheParent);
    }
    renderer.renderTexture.bind(renderTexture);
    renderer.batch.currentRenderer.start();
    if (clear ?? renderer.background.clearBeforeRender) {
      renderer.renderTexture.clear();
    }
    displayObject.render(renderer);
    renderer.batch.currentRenderer.flush();
    if (renderTexture) {
      if (options.blit) {
        renderer.framebuffer.blit();
      }
      renderTexture.baseTexture.update();
    }
    renderer.runners.postrender.emit();
    renderer.projection.transform = null;
    renderer.emit("postrender");
  }
  destroy() {
    this.renderer = null;
    this.lastObjectRendered = null;
  }
};
ObjectRendererSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "objectRenderer"
};
extensions.add(ObjectRendererSystem);

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
var _DashLine = class {
  constructor(graphics, options = {}) {
    this.cursor = new Point();
    this.scale = 1;
    this.graphics = graphics;
    options = __spreadValues(__spreadValues({}, dashLineOptionsDefault), options);
    this.dash = options.dash;
    this.dashSize = this.dash.reduce((a, b) => a + b);
    this.useTexture = options.useTexture;
    this.options = options;
    this.setLineStyle();
  }
  setLineStyle() {
    const options = this.options;
    if (this.useTexture) {
      const texture = _DashLine.getTexture(options, this.dashSize);
      this.graphics.lineTextureStyle({
        width: options.width * options.scale,
        color: options.color,
        alpha: options.alpha,
        texture,
        alignment: options.alignment
      });
      this.activeTexture = texture;
    } else {
      this.graphics.lineStyle({
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
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  moveTo(x, y) {
    this.lineLength = 0;
    this.cursor.set(x, y);
    this.start = new Point(x, y);
    this.graphics.moveTo(this.cursor.x, this.cursor.y);
    return this;
  }
  lineTo(x, y, closePath) {
    if (typeof this.lineLength === void 0) {
      this.moveTo(0, 0);
    }
    const length = _DashLine.distance(this.cursor.x, this.cursor.y, x, y);
    const angle = Math.atan2(y - this.cursor.y, x - this.cursor.x);
    const closed = closePath && x === this.start.x && y === this.start.y;
    if (this.useTexture) {
      this.graphics.moveTo(this.cursor.x, this.cursor.y);
      this.adjustLineStyle(angle);
      if (closed && this.dash.length % 2 === 0) {
        const gap = Math.min(this.dash[this.dash.length - 1], length);
        this.graphics.lineTo(x - Math.cos(angle) * gap, y - Math.sin(angle) * gap);
        this.graphics.closePath();
      } else {
        this.graphics.lineTo(x, y);
      }
    } else {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      let x0 = this.cursor.x;
      let y0 = this.cursor.y;
      const place = this.lineLength % (this.dashSize * this.scale);
      let dashIndex = 0, dashStart = 0;
      let dashX = 0;
      for (let i = 0; i < this.dash.length; i++) {
        const dashSize = this.dash[i] * this.scale;
        if (place < dashX + dashSize) {
          dashIndex = i;
          dashStart = place - dashX;
          break;
        } else {
          dashX += dashSize;
        }
      }
      let remaining = length;
      while (remaining > 0) {
        const dashSize = this.dash[dashIndex] * this.scale - dashStart;
        let dist = remaining > dashSize ? dashSize : remaining;
        if (closed) {
          const remainingDistance = _DashLine.distance(
            x0 + cos * dist,
            y0 + sin * dist,
            this.start.x,
            this.start.y
          );
          if (remainingDistance <= dist) {
            if (dashIndex % 2 === 0) {
              const lastDash = _DashLine.distance(x0, y0, this.start.x, this.start.y) - this.dash[this.dash.length - 1] * this.scale;
              x0 += cos * lastDash;
              y0 += sin * lastDash;
              this.graphics.lineTo(x0, y0);
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
        remaining -= dist;
        dashIndex++;
        dashIndex = dashIndex === this.dash.length ? 0 : dashIndex;
        dashStart = 0;
      }
    }
    this.lineLength += length;
    this.cursor.set(x, y);
    return this;
  }
  closePath() {
    this.lineTo(this.start.x, this.start.y, true);
  }
  drawCircle(x, y, radius, points = 80, matrix) {
    const interval = Math.PI * 2 / points;
    let angle = 0, first;
    if (matrix) {
      first = new Point(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
      matrix.apply(first, first);
      this.moveTo(first[0], first[1]);
    } else {
      first = new Point(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
      this.moveTo(first.x, first.y);
    }
    angle += interval;
    for (let i = 1; i < points + 1; i++) {
      const next = i === points ? first : [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius];
      this.lineTo(next[0], next[1]);
      angle += interval;
    }
    return this;
  }
  drawEllipse(x, y, radiusX, radiusY, points = 80, matrix) {
    const interval = Math.PI * 2 / points;
    let first;
    const point = new Point();
    let f = 0;
    for (let i = 0; i < Math.PI * 2; i += interval) {
      let x0 = x - radiusX * Math.sin(i);
      let y0 = y - radiusY * Math.cos(i);
      if (matrix) {
        point.set(x0, y0);
        matrix.apply(point, point);
        x0 = point.x;
        y0 = point.y;
      }
      if (i === 0) {
        this.moveTo(x0, y0);
        first = { x: x0, y: y0 };
      } else {
        this.lineTo(x0, y0);
      }
    }
    this.lineTo(first.x, first.y, true);
    return this;
  }
  drawPolygon(points, matrix) {
    const p = new Point();
    if (typeof points[0] === "number") {
      if (matrix) {
        p.set(points[0], points[1]);
        matrix.apply(p, p);
        this.moveTo(p.x, p.y);
        for (let i = 2; i < points.length; i += 2) {
          p.set(points[i], points[i + 1]);
          matrix.apply(p, p);
          this.lineTo(p.x, p.y, i === points.length - 2);
        }
      } else {
        this.moveTo(points[0], points[1]);
        for (let i = 2; i < points.length; i += 2) {
          this.lineTo(points[i], points[i + 1], i === points.length - 2);
        }
      }
    } else {
      if (matrix) {
        const point = points[0];
        p.copyFrom(point);
        matrix.apply(p, p);
        this.moveTo(p.x, p.y);
        for (let i = 1; i < points.length; i++) {
          const point2 = points[i];
          p.copyFrom(point2);
          matrix.apply(p, p);
          this.lineTo(p.x, p.y, i === points.length - 1);
        }
      } else {
        const point = points[0];
        this.moveTo(point.x, point.y);
        for (let i = 1; i < points.length; i++) {
          const point2 = points[i];
          this.lineTo(point2.x, point2.y, i === points.length - 1);
        }
      }
    }
    return this;
  }
  drawRect(x, y, width, height, matrix) {
    if (matrix) {
      const p = new Point();
      p.set(x, y);
      matrix.apply(p, p);
      this.moveTo(p.x, p.y);
      p.set(x + width, y);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y);
      p.set(x + width, y + height);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y);
      p.set(x, y + height);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y);
      p.set(x, y);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y, true);
    } else {
      this.moveTo(x, y).lineTo(x + width, y).lineTo(x + width, y + height).lineTo(x, y + height).lineTo(x, y, true);
    }
    return this;
  }
  adjustLineStyle(angle) {
    const lineStyle = this.graphics.line;
    lineStyle.matrix = new Matrix();
    if (angle) {
      lineStyle.matrix.rotate(angle);
    }
    if (this.scale !== 1)
      lineStyle.matrix.scale(this.scale, this.scale);
    const textureStart = -this.lineLength;
    lineStyle.matrix.translate(
      this.cursor.x + textureStart * Math.cos(angle),
      this.cursor.y + textureStart * Math.sin(angle)
    );
    this.graphics.lineStyle(lineStyle);
  }
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
    let x = 0;
    const y = options.width / 2;
    context2.moveTo(x, y);
    for (let i = 0; i < options.dash.length; i += 2) {
      x += options.dash[i];
      context2.lineTo(x, y);
      if (options.dash.length !== i + 1) {
        x += options.dash[i + 1];
        context2.moveTo(x, y);
      }
    }
    context2.stroke();
    const texture = _DashLine.dashTextureCache[key] = Texture.from(canvas);
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    return texture;
  }
};
var DashLine = _DashLine;
DashLine.dashTextureCache = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DashLine
});
//# sourceMappingURL=pixi-dashed-line.cjs.map
