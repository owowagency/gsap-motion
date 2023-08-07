import { noop as yi, fromEvent as an, debounceTime as xi, Observable as En } from "rxjs";
import we, { gsap as ur } from "gsap";
const bn = 1.70158, wn = 0.7;
class N {
}
N.inSine = (n) => -1 * Math.cos(n * (Math.PI / 2)) + 1;
N.outSine = (n) => Math.sin(n * (Math.PI / 2));
N.inOutSine = (n) => -0.5 * (Math.cos(Math.PI * n) - 1);
N.inQuad = (n) => n * n;
N.outQuad = (n) => n * (2 - n);
N.inOutQuad = (n) => n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
N.inCubic = (n) => n * n * n;
N.outCubic = (n) => --n * n * n + 1;
N.inOutCubic = (n) => n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
N.inQuart = (n) => n * n * n * n;
N.outQuart = (n) => 1 - --n * n * n * n;
N.inOutQuart = (n) => n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
N.inQuint = (n) => n * n * n * n * n;
N.outQuint = (n) => 1 + --n * n * n * n * n;
N.inOutQuint = (n) => n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
N.inExpo = (n) => n === 0 ? 0 : Math.pow(2, 10 * (n - 1));
N.outExpo = (n) => n === 1 ? 1 : -Math.pow(2, -10 * n) + 1;
N.inOutExpo = (n) => n === 0 || n === 1 ? n : n * 2 < 1 ? 0.5 * Math.pow(2, 10 * (n * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (n * 2 - 1)) + 2);
N.inCirc = (n) => -1 * (Math.sqrt(1 - n / 1 * n) - 1);
N.outCirc = (n) => Math.sqrt(1 - Math.pow(n - 1, 2));
N.inOutCirc = (n) => n * 2 < 1 ? -0.5 * (Math.sqrt(1 - Math.pow(n * 2, 2)) - 1) : 0.5 * (Math.sqrt(1 - Math.pow(n * 2 - 2, 2)) + 1);
N.inBack = (n, e = bn) => n * n * ((e + 1) * n - e);
N.outBack = (n, e = bn) => {
  const i = n / 1 - 1;
  return i * i * ((e + 1) * i + e) + 1;
};
N.inOutBack = (n, e = bn) => {
  const i = n * 2, t = i - 2, r = e * 1.525;
  return i < 1 ? 0.5 * i * i * ((r + 1) * i - r) : 0.5 * (t * t * ((r + 1) * t + r) + 2);
};
N.inElastic = (n, e = wn) => {
  if (n === 0 || n === 1)
    return n;
  const t = n / 1 - 1, r = 1 - e, o = r / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * t) * Math.sin((t - o) * (2 * Math.PI) / r));
};
N.outElastic = (n, e = wn) => {
  if (n === 0 || n === 1)
    return n;
  const i = 1 - e, t = n * 2, r = i / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * t) * Math.sin((t - r) * (2 * Math.PI) / i) + 1;
};
N.inOutElastic = (n, e = wn) => {
  if (n === 0 || n === 1)
    return n;
  const i = 1 - e, t = n * 2, r = t - 1, o = i / (2 * Math.PI) * Math.asin(1);
  return t < 1 ? -0.5 * (Math.pow(2, 10 * r) * Math.sin((r - o) * (2 * Math.PI) / i)) : Math.pow(2, -10 * r) * Math.sin((r - o) * (2 * Math.PI) / i) * 0.5 + 1;
};
var Cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Si(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ti = "Expected a function", Pn = 0 / 0, Mi = "[object Symbol]", ki = /^\s+|\s+$/g, Ci = /^[-+]0x[0-9a-f]+$/i, Ei = /^0b[01]+$/i, Pi = /^0o[0-7]+$/i, Oi = parseInt, Ri = typeof Cr == "object" && Cr && Cr.Object === Object && Cr, Di = typeof self == "object" && self && self.Object === Object && self, Ai = Ri || Di || Function("return this")(), Ii = Object.prototype, zi = Ii.toString, Li = Math.max, Fi = Math.min, Zr = function() {
  return Ai.Date.now();
};
function Yi(n, e, i) {
  var t, r, o, a, s, f, _ = 0, T = !1, M = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(Ti);
  e = On(e) || 0, ln(i) && (T = !!i.leading, M = "maxWait" in i, o = M ? Li(On(i.maxWait) || 0, e) : o, p = "trailing" in i ? !!i.trailing : p);
  function u(S) {
    var v = t, $ = r;
    return t = r = void 0, _ = S, a = n.apply($, v), a;
  }
  function h(S) {
    return _ = S, s = setTimeout(z, e), T ? u(S) : a;
  }
  function L(S) {
    var v = S - f, $ = S - _, ce = e - v;
    return M ? Fi(ce, o - $) : ce;
  }
  function W(S) {
    var v = S - f, $ = S - _;
    return f === void 0 || v >= e || v < 0 || M && $ >= o;
  }
  function z() {
    var S = Zr();
    if (W(S))
      return ie(S);
    s = setTimeout(z, L(S));
  }
  function ie(S) {
    return s = void 0, p && t ? u(S) : (t = r = void 0, a);
  }
  function F() {
    s !== void 0 && clearTimeout(s), _ = 0, t = f = r = s = void 0;
  }
  function k() {
    return s === void 0 ? a : ie(Zr());
  }
  function X() {
    var S = Zr(), v = W(S);
    if (t = arguments, r = this, f = S, v) {
      if (s === void 0)
        return h(f);
      if (M)
        return s = setTimeout(z, e), u(f);
    }
    return s === void 0 && (s = setTimeout(z, e)), a;
  }
  return X.cancel = F, X.flush = k, X;
}
function ln(n) {
  var e = typeof n;
  return !!n && (e == "object" || e == "function");
}
function Xi(n) {
  return !!n && typeof n == "object";
}
function Bi(n) {
  return typeof n == "symbol" || Xi(n) && zi.call(n) == Mi;
}
function On(n) {
  if (typeof n == "number")
    return n;
  if (Bi(n))
    return Pn;
  if (ln(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = ln(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = n.replace(ki, "");
  var i = Ei.test(n);
  return i || Pi.test(n) ? Oi(n.slice(2), i ? 2 : 8) : Ci.test(n) ? Pn : +n;
}
var Hi = Yi;
const Ni = /* @__PURE__ */ Si(Hi);
function Lt(n, ...e) {
  return n instanceof Function ? n.call(null, e) : n;
}
const $n = class {
  /**
   * @example
   * // create a motion controller for a staggered text lines animation
   * const splitTextMotion = new Motion(
   *  () => {
   *    const splitText = new SplitText("my-text", { type: "lines" });
   *    const tween = gsap.fromTo(splitText.lines, { opacity: 0 }, { opacity: 1, stagger: 0.1 });
   *
   *    // return a cleanup function
   *    return () => {
   *      tween.revert().kill();
   *      splitText.revert();
   *    }
   *  },
   *  {
   *    shouldResetOnResize: [document.body, "horizontal"]
   *  }
   * )
   */
  constructor(n, e = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = Ni(
      () => {
        var i;
        (i = this.cleanup) == null || i.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      $n.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var i, t;
      (i = this.cleanup) == null || i.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const r of Object.keys(this.meta))
        delete this.meta[r];
      for (; this.subscriptions.length; )
        (t = this.subscriptions.pop()) == null || t.unsubscribe();
    }, this.observeMedia(Lt(e.watchMedia)), this.observeResize(Lt(e.shouldResetOnResize)), this.create = () => {
      var r;
      return this.context = we.context(yi), [
        Lt(e.enable) ?? !0,
        ((r = this.mediaQueryList) == null ? void 0 : r.matches) ?? !0
      ].every(Boolean) ? n(this, this.context) : void 0;
    }, this.createAndSetCleanup();
  }
  /**
   * Time between frames in milliseconds based on `Motion.referenceFrameRate`.
   */
  static get referenceFrameTime() {
    return 1e3 / this.referenceFramerate;
  }
  /**
   * Multiplies a given `value` by the current gsap ticker's delta ratio,
   * so the rate of change will always be consistent even if the frame rate fluctuates.
   *
   * Implements `gsap.ticker.deltaRatio()`
   *
   * @param value Value to multiply by delta ratio.
   * @example
   * // move `myObject` by 3 points on every tick.
   * myObject.x += Motion.applyDeltaRatio(3);
   */
  static applyDeltaRatio(n) {
    return n * we.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var e;
    const n = (e = this.create) == null ? void 0 : e.call(this, this, this.context);
    n instanceof Promise ? n.then((i) => this.cleanup = i ?? void 0) : this.cleanup = n ?? void 0;
  }
  observeMedia(n) {
    n && (this.mediaQueryList = matchMedia(n), this.subscriptions.push(an(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(n) {
    n && (this.motionResizeObserver = new Wi(n), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(xi(100)).subscribe(() => this.reset())
    ));
  }
};
let kr = $n;
kr.resetDebounceTime = 100;
kr.referenceFramerate = 60;
class Wi {
  constructor(e) {
    const [i, t] = [e].flat();
    this.target = typeof i == "string" ? document.querySelector(i) : i, this.axis = t, this.target === window ? this.observable = new En((r) => {
      const o = () => this.handleWindowResize(r);
      return window.addEventListener("resize", o, { passive: !0 }), () => window.removeEventListener("resize", o);
    }) : this.observable = new En((r) => {
      const o = new ResizeObserver(
        (a) => this.handleElementResize(a, r)
      );
      return this.target && o.observe(this.target), () => o.disconnect();
    });
  }
  handleWindowResize(e) {
    this.emit(e, window.innerWidth, window.innerHeight);
  }
  handleElementResize(e, i) {
    const t = e.find((a) => a.target === this.target);
    if (!t)
      return;
    const { inlineSize: r, blockSize: o } = t.borderBoxSize[0];
    this.emit(i, r, o);
  }
  emit(e, i, t) {
    const r = i !== this.inlineSize, o = t !== this.blockSize, a = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = i, this.blockSize = t, !a) {
      if (this.axis === "horizontal" && r || this.axis === "vertical" && o)
        return e.next();
      !this.axis && (r || o) && e.next();
    }
  }
}
class Un extends kr {
  /**
   * The Pointer class is a utility for interacting with the mouse/pointer.
   * It extends the Motion class and provides an observable for mouse events.
   *
   * This class is implemented as a singleton, meaning only one instance of it exists.
   * Therefore, it does not need to be instantiated using `new Pointer();`. Instead, use `Pointer.instance`.
   *
   * @example
   * // Create a custom cursor that mirrors the current pointer position.
   * gsap.ticker.add(() => {
   *    gsap.set("#custom-cursor", {
   *      x: Pointer.instance.clientX,
   *      y: Pointer.instance.clientY
   *    })
   * })
   */
  constructor() {
    super(
      (e) => {
        e.meta.observable = an(window, "mousemove"), e.subscriptions.push(
          e.meta.observable.subscribe((i) => {
            this.clientX = i.clientX, this.clientY = i.clientY, this.normalX = we.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = we.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), e.subscriptions.push(
          an(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), e.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Returns the singleton instance of the Pointer class.
   * If the instance does not exist, it is created.
   */
  static get instance() {
    return this._instance ?? (this._instance = new Un());
  }
  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
class co {
  // Constant derived from response, damping and speed, used in calculations
  /**
   * Second Order Dynamics are a mathematical model that simulates the behavior of an object by considering forces, acceleration, velocity, and position.
   * It is used to create realistic animations by accurately representing the movement and forces acting on objects.
   * @param speed Defines the shape of the motion
   * @param damping Defines how the motion settles over time
   * @param response Defines the acceleration of the motion
   * @param x0 The initial value or starting point of the motion
   */
  constructor(e = 1, i = 1, t = 0, r = 0) {
    this.k1 = i / (Math.PI * e), this.k2 = 1 / (2 * Math.PI * e * (2 * Math.PI * e)), this.k3 = t * i / (2 * Math.PI * e), this.xp = r, this.y = r, this.yd = 0;
  }
  /**
   * Calculates and applies the next position of the object based on the provided step and value.
   * @param step The step size used to calculate the next position. Typically, this is the delta time.
   * @param x The next value or target of the motion
   * @param xd Optional parameter to provide the velocity
   * @returns The updated position of the object
   */
  update(e, i, t) {
    t === void 0 && (t = (i - this.xp) / e, this.xp = i);
    const r = Math.max(this.k2, e * e / 2 + e * this.k1 / 2, e * this.k1);
    return this.y = this.y + e * this.yd, this.yd = this.yd + e * (i + this.k3 * t - this.y - this.k1 * this.yd) / r, this.y;
  }
}
function Rn(n, e) {
  for (var i = 0; i < e.length; i++) {
    var t = e[i];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(n, t.key, t);
  }
}
function qi(n, e, i) {
  return e && Rn(n.prototype, e), i && Rn(n, i), n;
}
/*!
 * Observer 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var ye, cn, Ve, Mt, kt, er, jn, zt, vr, Qn, _t, rt, Kn, Zn = function() {
  return ye || typeof window < "u" && (ye = window.gsap) && ye.registerPlugin && ye;
}, Jn = 1, Zt = [], R = [], ft = [], mr = Date.now, un = function(e, i) {
  return i;
}, Gi = function() {
  var e = vr.core, i = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, R), r.push.apply(r, ft), R = t, ft = r, un = function(a, s) {
    return i[a](s);
  };
}, Et = function(e, i) {
  return ~ft.indexOf(e) && ft[ft.indexOf(e) + 1][i];
}, br = function(e) {
  return !!~Qn.indexOf(e);
}, Fe = function(e, i, t, r, o) {
  return e.addEventListener(i, t, {
    passive: !r,
    capture: !!o
  });
}, De = function(e, i, t, r) {
  return e.removeEventListener(i, t, !!r);
}, Er = "scrollLeft", Pr = "scrollTop", fn = function() {
  return _t && _t.isPressed || R.cache++;
}, Vr = function(e, i) {
  var t = function r(o) {
    if (o || o === 0) {
      Jn && (Ve.history.scrollRestoration = "manual");
      var a = _t && _t.isPressed;
      o = r.v = Math.round(o) || (_t && _t.iOS ? 1 : 0), e(o), r.cacheID = R.cache, a && un("ss", o);
    } else
      (i || R.cache !== r.cacheID || un("ref")) && (r.cacheID = R.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, ze = {
  s: Er,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Vr(function(n) {
    return arguments.length ? Ve.scrollTo(n, le.sc()) : Ve.pageXOffset || Mt[Er] || kt[Er] || er[Er] || 0;
  })
}, le = {
  s: Pr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ze,
  sc: Vr(function(n) {
    return arguments.length ? Ve.scrollTo(ze.sc(), n) : Ve.pageYOffset || Mt[Pr] || kt[Pr] || er[Pr] || 0;
  })
}, Ye = function(e) {
  return ye.utils.toArray(e)[0] || (typeof e == "string" && ye.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Pt = function(e, i) {
  var t = i.s, r = i.sc;
  br(e) && (e = Mt.scrollingElement || kt);
  var o = R.indexOf(e), a = r === le.sc ? 1 : 2;
  !~o && (o = R.push(e) - 1), R[o + a] || e.addEventListener("scroll", fn);
  var s = R[o + a], f = s || (R[o + a] = Vr(Et(e, t), !0) || (br(e) ? r : Vr(function(_) {
    return arguments.length ? e[t] = _ : e[t];
  })));
  return f.target = e, s || (f.smooth = ye.getProperty(e, "scrollBehavior") === "smooth"), f;
}, dn = function(e, i, t) {
  var r = e, o = e, a = mr(), s = a, f = i || 50, _ = Math.max(500, f * 3), T = function(h, L) {
    var W = mr();
    L || W - a > f ? (o = r, r = h, s = a, a = W) : t ? r += h : r = o + (h - o) / (W - s) * (a - s);
  }, M = function() {
    o = r = t ? 0 : r, s = a = 0;
  }, p = function(h) {
    var L = s, W = o, z = mr();
    return (h || h === 0) && h !== r && T(h), a === s || z - s > _ ? 0 : (r + (t ? W : -W)) / ((t ? z : a) - L) * 1e3;
  };
  return {
    update: T,
    reset: M,
    getVelocity: p
  };
}, fr = function(e, i) {
  return i && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, Dn = function(e) {
  var i = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(i) >= Math.abs(t) ? i : t;
}, ei = function() {
  vr = ye.core.globals().ScrollTrigger, vr && vr.core && Gi();
}, ti = function(e) {
  return ye = e || Zn(), ye && typeof document < "u" && document.body && (Ve = window, Mt = document, kt = Mt.documentElement, er = Mt.body, Qn = [Ve, Mt, kt, er], ye.utils.clamp, Kn = ye.core.context || function() {
  }, zt = "onpointerenter" in er ? "pointer" : "mouse", jn = ne.isTouch = Ve.matchMedia && Ve.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ve || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, rt = ne.eventTypes = ("ontouchstart" in kt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in kt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Jn = 0;
  }, 500), ei(), cn = 1), cn;
};
ze.op = le;
R.cache = 0;
var ne = /* @__PURE__ */ function() {
  function n(i) {
    this.init(i);
  }
  var e = n.prototype;
  return e.init = function(t) {
    cn || ti(ye) || console.warn("Please gsap.registerPlugin(Observer)"), vr || ei();
    var r = t.tolerance, o = t.dragMinimum, a = t.type, s = t.target, f = t.lineHeight, _ = t.debounce, T = t.preventDefault, M = t.onStop, p = t.onStopDelay, u = t.ignore, h = t.wheelSpeed, L = t.event, W = t.onDragStart, z = t.onDragEnd, ie = t.onDrag, F = t.onPress, k = t.onRelease, X = t.onRight, S = t.onLeft, v = t.onUp, $ = t.onDown, ce = t.onChangeX, x = t.onChangeY, oe = t.onChange, y = t.onToggleX, $e = t.onToggleY, B = t.onHover, ue = t.onHoverEnd, Me = t.onMove, H = t.ignoreCheck, se = t.isNormalizer, ee = t.onGestureStart, l = t.onGestureEnd, ae = t.onWheel, Ot = t.onEnable, mt = t.onDisable, Ue = t.onClick, bt = t.scrollSpeed, q = t.capture, xe = t.allowClicks, ke = t.lockAxis, nr = t.onLockAxis;
    this.target = s = Ye(s) || kt, this.vars = t, u && (u = ye.utils.toArray(u)), r = r || 1e-9, o = o || 0, h = h || 1, bt = bt || 1, a = a || "wheel,touch,pointer", _ = _ !== !1, f || (f = parseFloat(Ve.getComputedStyle(er).lineHeight) || 22);
    var Xe, je, A, fe, Be, st, Ce, c = this, dt = 0, G = 0, wt = Pt(s, ze), yt = Pt(s, le), qt = wt(), Ee = yt(), ir = ~a.indexOf("touch") && !~a.indexOf("pointer") && rt[0] === "pointerdown", xt = br(s), K = s.ownerDocument || Mt, He = [0, 0, 0], Pe = [0, 0, 0], or = 0, Oe = function() {
      return or = mr();
    }, at = function(b, d) {
      return (c.event = b) && u && ~u.indexOf(b.target) || d && ir && b.pointerType !== "touch" || H && H(b, d);
    }, sr = function() {
      c._vx.reset(), c._vy.reset(), je.pause(), M && M(c);
    }, St = function() {
      var b = c.deltaX = Dn(He), d = c.deltaY = Dn(Pe), m = Math.abs(b) >= r, w = Math.abs(d) >= r;
      oe && (m || w) && oe(c, b, d, He, Pe), m && (X && c.deltaX > 0 && X(c), S && c.deltaX < 0 && S(c), ce && ce(c), y && c.deltaX < 0 != dt < 0 && y(c), dt = c.deltaX, He[0] = He[1] = He[2] = 0), w && ($ && c.deltaY > 0 && $(c), v && c.deltaY < 0 && v(c), x && x(c), $e && c.deltaY < 0 != G < 0 && $e(c), G = c.deltaY, Pe[0] = Pe[1] = Pe[2] = 0), (fe || A) && (Me && Me(c), A && (ie(c), A = !1), fe = !1), st && !(st = !1) && nr && nr(c), Be && (ae(c), Be = !1), Xe = 0;
    }, Gt = function(b, d, m) {
      He[m] += b, Pe[m] += d, c._vx.update(b), c._vy.update(d), _ ? Xe || (Xe = requestAnimationFrame(St)) : St();
    }, Rt = function(b, d) {
      ke && !Ce && (c.axis = Ce = Math.abs(b) > Math.abs(d) ? "x" : "y", st = !0), Ce !== "y" && (He[2] += b, c._vx.update(b, !0)), Ce !== "x" && (Pe[2] += d, c._vy.update(d, !0)), _ ? Xe || (Xe = requestAnimationFrame(St)) : St();
    }, Dt = function(b) {
      if (!at(b, 1)) {
        b = fr(b, T);
        var d = b.clientX, m = b.clientY, w = d - c.x, E = m - c.y, de = c.isDragging;
        c.x = d, c.y = m, (de || Math.abs(c.startX - d) >= o || Math.abs(c.startY - m) >= o) && (ie && (A = !0), de || (c.isDragging = !0), Rt(w, E), de || W && W(c));
      }
    }, O = c.onPress = function(C) {
      at(C, 1) || C && C.button || (c.axis = Ce = null, je.pause(), c.isPressed = !0, C = fr(C), dt = G = 0, c.startX = c.x = C.clientX, c.startY = c.y = C.clientY, c._vx.reset(), c._vy.reset(), Fe(se ? s : K, rt[1], Dt, T, !0), c.deltaX = c.deltaY = 0, F && F(c));
    }, pt = c.onRelease = function(C) {
      if (!at(C, 1)) {
        De(se ? s : K, rt[1], Dt, !0);
        var b = !isNaN(c.y - c.startY), d = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), m = fr(C);
        !d && b && (c._vx.reset(), c._vy.reset(), T && xe && ye.delayedCall(0.08, function() {
          if (mr() - or > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (K.createEvent) {
              var w = K.createEvent("MouseEvents");
              w.initMouseEvent("click", !0, !0, Ve, 1, m.screenX, m.screenY, m.clientX, m.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(w);
            }
          }
        })), c.isDragging = c.isGesturing = c.isPressed = !1, M && !se && je.restart(!0), z && d && z(c), k && k(c, d);
      }
    }, Je = function(b) {
      return b.touches && b.touches.length > 1 && (c.isGesturing = !0) && ee(b, c.isDragging);
    }, et = function() {
      return (c.isGesturing = !1) || l(c);
    }, Qe = function(b) {
      if (!at(b)) {
        var d = wt(), m = yt();
        Gt((d - qt) * bt, (m - Ee) * bt, 1), qt = d, Ee = m, M && je.restart(!0);
      }
    }, tt = function(b) {
      if (!at(b)) {
        b = fr(b, T), ae && (Be = !0);
        var d = (b.deltaMode === 1 ? f : b.deltaMode === 2 ? Ve.innerHeight : 1) * h;
        Gt(b.deltaX * d, b.deltaY * d, 0), M && !se && je.restart(!0);
      }
    }, At = function(b) {
      if (!at(b)) {
        var d = b.clientX, m = b.clientY, w = d - c.x, E = m - c.y;
        c.x = d, c.y = m, fe = !0, (w || E) && Rt(w, E);
      }
    }, Vt = function(b) {
      c.event = b, B(c);
    }, ht = function(b) {
      c.event = b, ue(c);
    }, ar = function(b) {
      return at(b) || fr(b, T) && Ue(c);
    };
    je = c._dc = ye.delayedCall(p || 0.25, sr).pause(), c.deltaX = c.deltaY = 0, c._vx = dn(0, 50, !0), c._vy = dn(0, 50, !0), c.scrollX = wt, c.scrollY = yt, c.isDragging = c.isGesturing = c.isPressed = !1, Kn(this), c.enable = function(C) {
      return c.isEnabled || (Fe(xt ? K : s, "scroll", fn), a.indexOf("scroll") >= 0 && Fe(xt ? K : s, "scroll", Qe, T, q), a.indexOf("wheel") >= 0 && Fe(s, "wheel", tt, T, q), (a.indexOf("touch") >= 0 && jn || a.indexOf("pointer") >= 0) && (Fe(s, rt[0], O, T, q), Fe(K, rt[2], pt), Fe(K, rt[3], pt), xe && Fe(s, "click", Oe, !1, !0), Ue && Fe(s, "click", ar), ee && Fe(K, "gesturestart", Je), l && Fe(K, "gestureend", et), B && Fe(s, zt + "enter", Vt), ue && Fe(s, zt + "leave", ht), Me && Fe(s, zt + "move", At)), c.isEnabled = !0, C && C.type && O(C), Ot && Ot(c)), c;
    }, c.disable = function() {
      c.isEnabled && (Zt.filter(function(C) {
        return C !== c && br(C.target);
      }).length || De(xt ? K : s, "scroll", fn), c.isPressed && (c._vx.reset(), c._vy.reset(), De(se ? s : K, rt[1], Dt, !0)), De(xt ? K : s, "scroll", Qe, q), De(s, "wheel", tt, q), De(s, rt[0], O, q), De(K, rt[2], pt), De(K, rt[3], pt), De(s, "click", Oe, !0), De(s, "click", ar), De(K, "gesturestart", Je), De(K, "gestureend", et), De(s, zt + "enter", Vt), De(s, zt + "leave", ht), De(s, zt + "move", At), c.isEnabled = c.isPressed = c.isDragging = !1, mt && mt(c));
    }, c.kill = c.revert = function() {
      c.disable();
      var C = Zt.indexOf(c);
      C >= 0 && Zt.splice(C, 1), _t === c && (_t = 0);
    }, Zt.push(c), se && br(s) && (_t = c), c.enable(L);
  }, qi(n, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), n;
}();
ne.version = "3.11.5";
ne.create = function(n) {
  return new ne(n);
};
ne.register = ti;
ne.getAll = function() {
  return Zt.slice();
};
ne.getById = function(n) {
  return Zt.filter(function(e) {
    return e.vars.id === n;
  })[0];
};
Zn() && ye.registerPlugin(ne);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var g, Qt, I, V, it, Q, ri, $r, Ur, Jt, Xr, Or, Te, Qr, pn, Ae, An, In, Kt, ni, Jr, ii, We, oi, si, ai, Tt, hn, yn, en, Rr = 1, Ie = Date.now, tn = Ie(), Ze = 0, pr = 0, Vi = function n() {
  return pr && requestAnimationFrame(n);
}, zn = function() {
  return Qr = 1;
}, Ln = function() {
  return Qr = 0;
}, ut = function(e) {
  return e;
}, hr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, li = function() {
  return typeof window < "u";
}, ci = function() {
  return g || li() && (g = window.gsap) && g.registerPlugin && g;
}, Ht = function(e) {
  return !!~ri.indexOf(e);
}, ui = function(e) {
  return Et(e, "getBoundingClientRect") || (Ht(e) ? function() {
    return Gr.width = I.innerWidth, Gr.height = I.innerHeight, Gr;
  } : function() {
    return gt(e);
  });
}, $i = function(e, i, t) {
  var r = t.d, o = t.d2, a = t.a;
  return (a = Et(e, "getBoundingClientRect")) ? function() {
    return a()[r];
  } : function() {
    return (i ? I["inner" + o] : e["client" + o]) || 0;
  };
}, Ui = function(e, i) {
  return !i || ~ft.indexOf(e) ? ui(e) : function() {
    return Gr;
  };
}, Ct = function(e, i) {
  var t = i.s, r = i.d2, o = i.d, a = i.a;
  return Math.max(0, (t = "scroll" + r) && (a = Et(e, t)) ? a() - ui(e)()[o] : Ht(e) ? (it[t] || Q[t]) - (I["inner" + r] || it["client" + r] || Q["client" + r]) : e[t] - e["offset" + r]);
}, Dr = function(e, i) {
  for (var t = 0; t < Kt.length; t += 3)
    (!i || ~i.indexOf(Kt[t + 1])) && e(Kt[t], Kt[t + 1], Kt[t + 2]);
}, nt = function(e) {
  return typeof e == "string";
}, Le = function(e) {
  return typeof e == "function";
}, gr = function(e) {
  return typeof e == "number";
}, Br = function(e) {
  return typeof e == "object";
}, dr = function(e, i, t) {
  return e && e.progress(i ? 0 : 1) && t && e.pause();
}, rn = function(e, i) {
  if (e.enabled) {
    var t = i(e);
    t && t.totalTime && (e.callbackAnimation = t);
  }
}, Ut = Math.abs, fi = "left", di = "top", xn = "right", Sn = "bottom", Yt = "width", Xt = "height", wr = "Right", yr = "Left", xr = "Top", Sr = "Bottom", J = "padding", Ke = "margin", rr = "Width", Tn = "Height", be = "px", ot = function(e) {
  return I.getComputedStyle(e);
}, ji = function(e) {
  var i = ot(e).position;
  e.style.position = i === "absolute" || i === "fixed" ? i : "relative";
}, Fn = function(e, i) {
  for (var t in i)
    t in e || (e[t] = i[t]);
  return e;
}, gt = function(e, i) {
  var t = i && ot(e)[pn] !== "matrix(1, 0, 0, 1, 0, 0)" && g.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = e.getBoundingClientRect();
  return t && t.progress(0).kill(), r;
}, gn = function(e, i) {
  var t = i.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, pi = function(e) {
  var i = [], t = e.labels, r = e.duration(), o;
  for (o in t)
    i.push(t[o] / r);
  return i;
}, Qi = function(e) {
  return function(i) {
    return g.utils.snap(pi(e), i);
  };
}, Mn = function(e) {
  var i = g.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, o) {
    return r - o;
  });
  return t ? function(r, o, a) {
    a === void 0 && (a = 1e-3);
    var s;
    if (!o)
      return i(r);
    if (o > 0) {
      for (r -= a, s = 0; s < t.length; s++)
        if (t[s] >= r)
          return t[s];
      return t[s - 1];
    } else
      for (s = t.length, r += a; s--; )
        if (t[s] <= r)
          return t[s];
    return t[0];
  } : function(r, o, a) {
    a === void 0 && (a = 1e-3);
    var s = i(r);
    return !o || Math.abs(s - r) < a || s - r < 0 == o < 0 ? s : i(o < 0 ? r - e : r + e);
  };
}, Ki = function(e) {
  return function(i, t) {
    return Mn(pi(e))(i, t.direction);
  };
}, Ar = function(e, i, t, r) {
  return t.split(",").forEach(function(o) {
    return e(i, o, r);
  });
}, ve = function(e, i, t, r, o) {
  return e.addEventListener(i, t, {
    passive: !r,
    capture: !!o
  });
}, _e = function(e, i, t, r) {
  return e.removeEventListener(i, t, !!r);
}, Ir = function(e, i, t) {
  t = t && t.wheelHandler, t && (e(i, "wheel", t), e(i, "touchmove", t));
}, Yn = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, zr = {
  toggleActions: "play",
  anticipatePin: 0
}, jr = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Hr = function(e, i) {
  if (nt(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= i / 100), e = e.substr(0, t - 1)), e = r + (e in jr ? jr[e] * i : ~e.indexOf("%") ? parseFloat(e) * i / 100 : parseFloat(e) || 0);
  }
  return e;
}, Lr = function(e, i, t, r, o, a, s, f) {
  var _ = o.startColor, T = o.endColor, M = o.fontSize, p = o.indent, u = o.fontWeight, h = V.createElement("div"), L = Ht(t) || Et(t, "pinType") === "fixed", W = e.indexOf("scroller") !== -1, z = L ? Q : t, ie = e.indexOf("start") !== -1, F = ie ? _ : T, k = "border-color:" + F + ";font-size:" + M + ";color:" + F + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return k += "position:" + ((W || f) && L ? "fixed;" : "absolute;"), (W || f || !L) && (k += (r === le ? xn : Sn) + ":" + (a + parseFloat(p)) + "px;"), s && (k += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), h._isStart = ie, h.setAttribute("class", "gsap-marker-" + e + (i ? " marker-" + i : "")), h.style.cssText = k, h.innerText = i || i === 0 ? e + "-" + i : e, z.children[0] ? z.insertBefore(h, z.children[0]) : z.appendChild(h), h._offset = h["offset" + r.op.d2], Nr(h, 0, r, ie), h;
}, Nr = function(e, i, t, r) {
  var o = {
    display: "block"
  }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
  e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + a + rr] = 1, o["border" + s + rr] = 0, o[t.p] = i + "px", g.set(e, o);
}, P = [], _n = {}, Mr, Xn = function() {
  return Ie() - Ze > 34 && (Mr || (Mr = requestAnimationFrame(vt)));
}, jt = function() {
  (!We || !We.isPressed || We.startX > Q.clientWidth) && (R.cache++, We ? Mr || (Mr = requestAnimationFrame(vt)) : vt(), Ze || Wt("scrollStart"), Ze = Ie());
}, nn = function() {
  ai = I.innerWidth, si = I.innerHeight;
}, _r = function() {
  R.cache++, !Te && !ii && !V.fullscreenElement && !V.webkitFullscreenElement && (!oi || ai !== I.innerWidth || Math.abs(I.innerHeight - si) > I.innerHeight * 0.25) && $r.restart(!0);
}, Nt = {}, Zi = [], hi = function n() {
  return _e(D, "scrollEnd", n) || Ft(!0);
}, Wt = function(e) {
  return Nt[e] && Nt[e].map(function(i) {
    return i();
  }) || Zi;
}, qe = [], gi = function(e) {
  for (var i = 0; i < qe.length; i += 5)
    (!e || qe[i + 4] && qe[i + 4].query === e) && (qe[i].style.cssText = qe[i + 1], qe[i].getBBox && qe[i].setAttribute("transform", qe[i + 2] || ""), qe[i + 3].uncache = 1);
}, kn = function(e, i) {
  var t;
  for (Ae = 0; Ae < P.length; Ae++)
    t = P[Ae], t && (!i || t._ctx === i) && (e ? t.kill(1) : t.revert(!0, !0));
  i && gi(i), i || Wt("revert");
}, _i = function(e, i) {
  R.cache++, (i || !Ge) && R.forEach(function(t) {
    return Le(t) && t.cacheID++ && (t.rec = 0);
  }), nt(e) && (I.history.scrollRestoration = yn = e);
}, Ge, Bt = 0, Bn, Ji = function() {
  if (Bn !== Bt) {
    var e = Bn = Bt;
    requestAnimationFrame(function() {
      return e === Bt && Ft(!0);
    });
  }
}, Ft = function(e, i) {
  if (Ze && !e) {
    ve(D, "scrollEnd", hi);
    return;
  }
  Ge = D.isRefreshing = !0, R.forEach(function(r) {
    return Le(r) && r.cacheID++ && (r.rec = r());
  });
  var t = Wt("refreshInit");
  ni && D.sort(), i || kn(), R.forEach(function(r) {
    Le(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), P.slice(0).forEach(function(r) {
    return r.refresh();
  }), P.forEach(function(r, o) {
    if (r._subPinOffset && r.pin) {
      var a = r.vars.horizontal ? "offsetWidth" : "offsetHeight", s = r.pin[a];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[a] - s), r.refresh();
    }
  }), P.forEach(function(r) {
    return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, Ct(r.scroller, r._dir)));
  }), t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), R.forEach(function(r) {
    Le(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), _i(yn, 1), $r.pause(), Bt++, Ge = 2, vt(2), P.forEach(function(r) {
    return Le(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Ge = D.isRefreshing = !1, Wt("refresh");
}, vn = 0, Wr = 1, Tr, vt = function(e) {
  if (!Ge || e === 2) {
    D.isUpdating = !0, Tr && Tr.update(0);
    var i = P.length, t = Ie(), r = t - tn >= 50, o = i && P[0].scroll();
    if (Wr = vn > o ? -1 : 1, Ge || (vn = o), r && (Ze && !Qr && t - Ze > 200 && (Ze = 0, Wt("scrollEnd")), Xr = tn, tn = t), Wr < 0) {
      for (Ae = i; Ae-- > 0; )
        P[Ae] && P[Ae].update(0, r);
      Wr = 1;
    } else
      for (Ae = 0; Ae < i; Ae++)
        P[Ae] && P[Ae].update(0, r);
    D.isUpdating = !1;
  }
  Mr = 0;
}, mn = [fi, di, Sn, xn, Ke + Sr, Ke + wr, Ke + xr, Ke + yr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], qr = mn.concat([Yt, Xt, "boxSizing", "max" + rr, "max" + Tn, "position", Ke, J, J + xr, J + wr, J + Sr, J + yr]), eo = function(e, i, t) {
  tr(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    tr(r.spacerState);
  else if (e._gsap.swappedIn) {
    var o = i.parentNode;
    o && (o.insertBefore(e, i), o.removeChild(i));
  }
  e._gsap.swappedIn = !1;
}, on = function(e, i, t, r) {
  if (!e._gsap.swappedIn) {
    for (var o = mn.length, a = i.style, s = e.style, f; o--; )
      f = mn[o], a[f] = t[f];
    a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[Sn] = s[xn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Yt] = gn(e, ze) + be, a[Xt] = gn(e, le) + be, a[J] = s[Ke] = s[di] = s[fi] = "0", tr(r), s[Yt] = s["max" + rr] = t[Yt], s[Xt] = s["max" + Tn] = t[Xt], s[J] = t[J], e.parentNode !== i && (e.parentNode.insertBefore(i, e), i.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, to = /([A-Z])/g, tr = function(e) {
  if (e) {
    var i = e.t.style, t = e.length, r = 0, o, a;
    for ((e.t._gsap || g.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      a = e[r + 1], o = e[r], a ? i[o] = a : i[o] && i.removeProperty(o.replace(to, "-$1").toLowerCase());
  }
}, Fr = function(e) {
  for (var i = qr.length, t = e.style, r = [], o = 0; o < i; o++)
    r.push(qr[o], t[qr[o]]);
  return r.t = e, r;
}, ro = function(e, i, t) {
  for (var r = [], o = e.length, a = t ? 8 : 0, s; a < o; a += 2)
    s = e[a], r.push(s, s in i ? i[s] : e[a + 1]);
  return r.t = e.t, r;
}, Gr = {
  left: 0,
  top: 0
}, Hn = function(e, i, t, r, o, a, s, f, _, T, M, p, u) {
  Le(e) && (e = e(f)), nt(e) && e.substr(0, 3) === "max" && (e = p + (e.charAt(4) === "=" ? Hr("0" + e.substr(3), t) : 0));
  var h = u ? u.time() : 0, L, W, z;
  if (u && u.seek(0), gr(e))
    u && (e = g.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, p, e)), s && Nr(s, t, r, !0);
  else {
    Le(i) && (i = i(f));
    var ie = (e || "0").split(" "), F, k, X, S;
    z = Ye(i) || Q, F = gt(z) || {}, (!F || !F.left && !F.top) && ot(z).display === "none" && (S = z.style.display, z.style.display = "block", F = gt(z), S ? z.style.display = S : z.style.removeProperty("display")), k = Hr(ie[0], F[r.d]), X = Hr(ie[1] || "0", t), e = F[r.p] - _[r.p] - T + k + o - X, s && Nr(s, X, r, t - X < 20 || s._isStart && X > 20), t -= t - X;
  }
  if (a) {
    var v = e + t, $ = a._isStart;
    L = "scroll" + r.d2, Nr(a, v, r, $ && v > 20 || !$ && (M ? Math.max(Q[L], it[L]) : a.parentNode[L]) <= v + 1), M && (_ = gt(s), M && (a.style[r.op.p] = _[r.op.p] - r.op.m - a._offset + be));
  }
  return u && z && (L = gt(z), u.seek(p), W = gt(z), u._caScrollDist = L[r.p] - W[r.p], e = e / u._caScrollDist * p), u && u.seek(h), u ? e : Math.round(e);
}, no = /(webkit|moz|length|cssText|inset)/i, Nn = function(e, i, t, r) {
  if (e.parentNode !== i) {
    var o = e.style, a, s;
    if (i === Q) {
      e._stOrig = o.cssText, s = ot(e);
      for (a in s)
        !+a && !no.test(a) && s[a] && typeof o[a] == "string" && a !== "0" && (o[a] = s[a]);
      o.top = t, o.left = r;
    } else
      o.cssText = e._stOrig;
    g.core.getCache(e).uncache = 1, i.appendChild(e);
  }
}, vi = function(e, i, t) {
  var r = i, o = r;
  return function(a) {
    var s = Math.round(e());
    return s !== r && s !== o && Math.abs(s - r) > 3 && Math.abs(s - o) > 3 && (a = s, t && t()), o = r, r = a, a;
  };
}, Wn = function(e, i) {
  var t = Pt(e, i), r = "_scroll" + i.p2, o = function a(s, f, _, T, M) {
    var p = a.tween, u = f.onComplete, h = {};
    _ = _ || t();
    var L = vi(t, _, function() {
      p.kill(), a.tween = 0;
    });
    return M = T && M || 0, T = T || s - _, p && p.kill(), f[r] = s, f.modifiers = h, h[r] = function() {
      return L(_ + T * p.ratio + M * p.ratio * p.ratio);
    }, f.onUpdate = function() {
      R.cache++, vt();
    }, f.onComplete = function() {
      a.tween = 0, u && u.call(p);
    }, p = a.tween = g.to(e, f), p;
  };
  return e[r] = t, t.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, ve(e, "wheel", t.wheelHandler), D.isTouch && ve(e, "touchmove", t.wheelHandler), o;
}, D = /* @__PURE__ */ function() {
  function n(i, t) {
    Qt || n.register(g) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(i, t);
  }
  var e = n.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !pr) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = Fn(nt(t) || gr(t) || t.nodeType ? {
      trigger: t
    } : t, zr);
    var o = t, a = o.onUpdate, s = o.toggleClass, f = o.id, _ = o.onToggle, T = o.onRefresh, M = o.scrub, p = o.trigger, u = o.pin, h = o.pinSpacing, L = o.invalidateOnRefresh, W = o.anticipatePin, z = o.onScrubComplete, ie = o.onSnapComplete, F = o.once, k = o.snap, X = o.pinReparent, S = o.pinSpacer, v = o.containerAnimation, $ = o.fastScrollEnd, ce = o.preventOverlaps, x = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? ze : le, oe = !M && M !== 0, y = Ye(t.scroller || I), $e = g.core.getCache(y), B = Ht(y), ue = ("pinType" in t ? t.pinType : Et(y, "pinType") || B && "fixed") === "fixed", Me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], H = oe && t.toggleActions.split(" "), se = "markers" in t ? t.markers : zr.markers, ee = B ? 0 : parseFloat(ot(y)["border" + x.p2 + rr]) || 0, l = this, ae = t.onRefreshInit && function() {
      return t.onRefreshInit(l);
    }, Ot = $i(y, B, x), mt = Ui(y, B), Ue = 0, bt = 0, q = Pt(y, x), xe, ke, nr, Xe, je, A, fe, Be, st, Ce, c, dt, G, wt, yt, qt, Ee, ir, xt, K, He, Pe, or, Oe, at, sr, St, Gt, Rt, Dt, O, pt, Je, et, Qe, tt, At, Vt, ht;
    if (hn(l), l._dir = x, W *= 45, l.scroller = y, l.scroll = v ? v.time.bind(v) : q, Xe = q(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (ni = 1, t.refreshPriority === -9999 && (Tr = l)), $e.tweenScroll = $e.tweenScroll || {
      top: Wn(y, le),
      left: Wn(y, ze)
    }, l.tweenTo = xe = $e.tweenScroll[x.p], l.scrubDuration = function(d) {
      pt = gr(d) && d, pt ? O ? O.duration(d) : O = g.to(r, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: pt,
        paused: !0,
        onComplete: function() {
          return z && z(l);
        }
      }) : (O && O.progress(1).kill(), O = 0);
    }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(M), O && O.resetTo && O.resetTo("totalProgress", 0), Rt = 0, f || (f = r.vars.id)), P.push(l), k && ((!Br(k) || k.push) && (k = {
      snapTo: k
    }), "scrollBehavior" in Q.style && g.set(B ? [Q, it] : y, {
      scrollBehavior: "auto"
    }), R.forEach(function(d) {
      return Le(d) && d.target === (B ? V.scrollingElement || it : y) && (d.smooth = !1);
    }), nr = Le(k.snapTo) ? k.snapTo : k.snapTo === "labels" ? Qi(r) : k.snapTo === "labelsDirectional" ? Ki(r) : k.directional !== !1 ? function(d, m) {
      return Mn(k.snapTo)(d, Ie() - bt < 500 ? 0 : m.direction);
    } : g.utils.snap(k.snapTo), Je = k.duration || {
      min: 0.1,
      max: 2
    }, Je = Br(Je) ? Jt(Je.min, Je.max) : Jt(Je, Je), et = g.delayedCall(k.delay || pt / 2 || 0.1, function() {
      var d = q(), m = Ie() - bt < 500, w = xe.tween;
      if ((m || Math.abs(l.getVelocity()) < 10) && !w && !Qr && Ue !== d) {
        var E = (d - A) / G, de = r && !oe ? r.totalProgress() : E, Y = m ? 0 : (de - Dt) / (Ie() - Xr) * 1e3 || 0, U = g.utils.clamp(-E, 1 - E, Ut(Y / 2) * Y / 0.185), me = E + (k.inertia === !1 ? 0 : U), pe = Jt(0, 1, nr(me, l)), te = Math.round(A + pe * G), j = k, Ne = j.onStart, Re = j.onInterrupt, he = j.onComplete;
        if (d <= fe && d >= A && te !== d) {
          if (w && !w._initted && w.data <= Ut(te - d))
            return;
          k.inertia === !1 && (U = pe - E), xe(te, {
            duration: Je(Ut(Math.max(Ut(me - de), Ut(pe - de)) * 0.185 / Y / 0.05 || 0)),
            ease: k.ease || "power3",
            data: Ut(te - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return et.restart(!0) && Re && Re(l);
            },
            onComplete: function() {
              l.update(), Ue = q(), Rt = Dt = r && !oe ? r.totalProgress() : l.progress, ie && ie(l), he && he(l);
            }
          }, d, U * G, te - d - U * G), Ne && Ne(l, xe.tween);
        }
      } else
        l.isActive && Ue !== d && et.restart(!0);
    }).pause()), f && (_n[f] = l), p = l.trigger = Ye(p || u), ht = p && p._gsap && p._gsap.stRevert, ht && (ht = ht(l)), u = u === !0 ? p : Ye(u), nt(s) && (s = {
      targets: p,
      className: s
    }), u && (h === !1 || h === Ke || (h = !h && u.parentNode && u.parentNode.style && ot(u.parentNode).display === "flex" ? !1 : J), l.pin = u, ke = g.core.getCache(u), ke.spacer ? wt = ke.pinState : (S && (S = Ye(S), S && !S.nodeType && (S = S.current || S.nativeElement), ke.spacerIsNative = !!S, S && (ke.spacerState = Fr(S))), ke.spacer = Ee = S || V.createElement("div"), Ee.classList.add("pin-spacer"), f && Ee.classList.add("pin-spacer-" + f), ke.pinState = wt = Fr(u)), t.force3D !== !1 && g.set(u, {
      force3D: !0
    }), l.spacer = Ee = ke.spacer, Gt = ot(u), or = Gt[h + x.os2], xt = g.getProperty(u), K = g.quickSetter(u, x.a, be), on(u, Ee, Gt), qt = Fr(u)), se) {
      dt = Br(se) ? Fn(se, Yn) : Yn, Ce = Lr("scroller-start", f, y, x, dt, 0), c = Lr("scroller-end", f, y, x, dt, 0, Ce), ir = Ce["offset" + x.op.d2];
      var ar = Ye(Et(y, "content") || y);
      Be = this.markerStart = Lr("start", f, ar, x, dt, ir, 0, v), st = this.markerEnd = Lr("end", f, ar, x, dt, ir, 0, v), v && (Vt = g.quickSetter([Be, st], x.a, be)), !ue && !(ft.length && Et(y, "fixedMarkers") === !0) && (ji(B ? Q : y), g.set([Ce, c], {
        force3D: !0
      }), at = g.quickSetter(Ce, x.a, be), St = g.quickSetter(c, x.a, be));
    }
    if (v) {
      var C = v.vars.onUpdate, b = v.vars.onUpdateParams;
      v.eventCallback("onUpdate", function() {
        l.update(0, 0, 1), C && C.apply(v, b || []);
      });
    }
    l.previous = function() {
      return P[P.indexOf(l) - 1];
    }, l.next = function() {
      return P[P.indexOf(l) + 1];
    }, l.revert = function(d, m) {
      if (!m)
        return l.kill(!0);
      var w = d !== !1 || !l.enabled, E = Te;
      w !== l.isReverted && (w && (tt = Math.max(q(), l.scroll.rec || 0), Qe = l.progress, At = r && r.progress()), Be && [Be, st, Ce, c].forEach(function(de) {
        return de.style.display = w ? "none" : "block";
      }), w && (Te = l, l.update(w)), u && (!X || !l.isActive) && (w ? eo(u, Ee, wt) : on(u, Ee, ot(u), Oe)), w || l.update(w), Te = E, l.isReverted = w);
    }, l.refresh = function(d, m) {
      if (!((Te || !l.enabled) && !m)) {
        if (u && d && Ze) {
          ve(n, "scrollEnd", hi);
          return;
        }
        !Ge && ae && ae(l), Te = l, bt = Ie(), xe.tween && (xe.tween.kill(), xe.tween = 0), O && O.pause(), L && r && r.revert({
          kill: !1
        }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
        for (var w = Ot(), E = mt(), de = v ? v.duration() : Ct(y, x), Y = G <= 0.01, U = 0, me = 0, pe = t.end, te = t.endTrigger || p, j = t.start || (t.start === 0 || !p ? 0 : u ? "0 0" : "0 100%"), Ne = l.pinnedContainer = t.pinnedContainer && Ye(t.pinnedContainer), Re = p && Math.max(0, P.indexOf(l)) || 0, he = Re, Z, Se, $t, It, re, ge, lt, Kr, Cn, lr, ct; he--; )
          ge = P[he], ge.end || ge.refresh(0, 1) || (Te = l), lt = ge.pin, lt && (lt === p || lt === u || lt === Ne) && !ge.isReverted && (lr || (lr = []), lr.unshift(ge), ge.revert(!0, !0)), ge !== P[he] && (Re--, he--);
        for (Le(j) && (j = j(l)), A = Hn(j, p, w, x, q(), Be, Ce, l, E, ee, ue, de, v) || (u ? -1e-3 : 0), Le(pe) && (pe = pe(l)), nt(pe) && !pe.indexOf("+=") && (~pe.indexOf(" ") ? pe = (nt(j) ? j.split(" ")[0] : "") + pe : (U = Hr(pe.substr(2), w), pe = nt(j) ? j : (v ? g.utils.mapRange(0, v.duration(), v.scrollTrigger.start, v.scrollTrigger.end, A) : A) + U, te = p)), fe = Math.max(A, Hn(pe || (te ? "100% 0" : de), te, w, x, q() + U, st, c, l, E, ee, ue, de, v)) || -1e-3, G = fe - A || (A -= 0.01) && 1e-3, U = 0, he = Re; he--; )
          ge = P[he], lt = ge.pin, lt && ge.start - ge._pinPush <= A && !v && ge.end > 0 && (Z = ge.end - ge.start, (lt === p && ge.start - ge._pinPush < A || lt === Ne) && !gr(j) && (U += Z * (1 - ge.progress)), lt === u && (me += Z));
        if (A += U, fe += U, Y && (Qe = g.utils.clamp(0, 1, g.utils.normalize(A, fe, tt))), l._pinPush = me, Be && U && (Z = {}, Z[x.a] = "+=" + U, Ne && (Z[x.p] = "-=" + q()), g.set([Be, st], Z)), u)
          Z = ot(u), It = x === le, $t = q(), He = parseFloat(xt(x.a)) + me, !de && fe > 1 && (ct = (B ? V.scrollingElement || it : y).style, ct = {
            style: ct,
            value: ct["overflow" + x.a.toUpperCase()]
          }, ct.style["overflow" + x.a.toUpperCase()] = "scroll"), on(u, Ee, Z), qt = Fr(u), Se = gt(u, !0), Kr = ue && Pt(y, It ? ze : le)(), h && (Oe = [h + x.os2, G + me + be], Oe.t = Ee, he = h === J ? gn(u, x) + G + me : 0, he && Oe.push(x.d, he + be), tr(Oe), Ne && P.forEach(function(cr) {
            cr.pin === Ne && cr.vars.pinSpacing !== !1 && (cr._subPinOffset = !0);
          }), ue && q(tt)), ue && (re = {
            top: Se.top + (It ? $t - A : Kr) + be,
            left: Se.left + (It ? Kr : $t - A) + be,
            boxSizing: "border-box",
            position: "fixed"
          }, re[Yt] = re["max" + rr] = Math.ceil(Se.width) + be, re[Xt] = re["max" + Tn] = Math.ceil(Se.height) + be, re[Ke] = re[Ke + xr] = re[Ke + wr] = re[Ke + Sr] = re[Ke + yr] = "0", re[J] = Z[J], re[J + xr] = Z[J + xr], re[J + wr] = Z[J + wr], re[J + Sr] = Z[J + Sr], re[J + yr] = Z[J + yr], yt = ro(wt, re, X), Ge && q(0)), r ? (Cn = r._initted, Jr(1), r.render(r.duration(), !0, !0), Pe = xt(x.a) - He + G + me, sr = Math.abs(G - Pe) > 1, ue && sr && yt.splice(yt.length - 2, 2), r.render(0, !0, !0), Cn || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), Jr(0)) : Pe = G, ct && (ct.value ? ct.style["overflow" + x.a.toUpperCase()] = ct.value : ct.style.removeProperty("overflow-" + x.a));
        else if (p && q() && !v)
          for (Se = p.parentNode; Se && Se !== Q; )
            Se._pinOffset && (A -= Se._pinOffset, fe -= Se._pinOffset), Se = Se.parentNode;
        lr && lr.forEach(function(cr) {
          return cr.revert(!1, !0);
        }), l.start = A, l.end = fe, Xe = je = Ge ? tt : q(), !v && !Ge && (Xe < tt && q(tt), l.scroll.rec = 0), l.revert(!1, !0), et && (Ue = -1, l.isActive && q(A + G * Qe), et.restart(!0)), Te = 0, r && oe && (r._initted || At) && r.progress() !== At && r.progress(At, !0).render(r.time(), !0, !0), (Y || Qe !== l.progress || v) && (r && !oe && r.totalProgress(v && A < -1e-3 && !Qe ? g.utils.normalize(A, fe, 0) : Qe, !0), l.progress = (Xe - A) / G === Qe ? 0 : Qe), u && h && (Ee._pinOffset = Math.round(l.progress * Pe)), O && O.invalidate(), T && !Ge && T(l);
      }
    }, l.getVelocity = function() {
      return (q() - je) / (Ie() - Xr) * 1e3 || 0;
    }, l.endAnimation = function() {
      dr(l.callbackAnimation), r && (O ? O.progress(1) : r.paused() ? oe || dr(r, l.direction < 0, 1) : dr(r, r.reversed()));
    }, l.labelToScroll = function(d) {
      return r && r.labels && (A || l.refresh() || A) + r.labels[d] / r.duration() * G || 0;
    }, l.getTrailing = function(d) {
      var m = P.indexOf(l), w = l.direction > 0 ? P.slice(0, m).reverse() : P.slice(m + 1);
      return (nt(d) ? w.filter(function(E) {
        return E.vars.preventOverlaps === d;
      }) : w).filter(function(E) {
        return l.direction > 0 ? E.end <= A : E.start >= fe;
      });
    }, l.update = function(d, m, w) {
      if (!(v && !w && !d)) {
        var E = Ge === !0 ? tt : l.scroll(), de = d ? 0 : (E - A) / G, Y = de < 0 ? 0 : de > 1 ? 1 : de || 0, U = l.progress, me, pe, te, j, Ne, Re, he, Z;
        if (m && (je = Xe, Xe = v ? q() : E, k && (Dt = Rt, Rt = r && !oe ? r.totalProgress() : Y)), W && !Y && u && !Te && !Rr && Ze && A < E + (E - je) / (Ie() - Xr) * W && (Y = 1e-4), Y !== U && l.enabled) {
          if (me = l.isActive = !!Y && Y < 1, pe = !!U && U < 1, Re = me !== pe, Ne = Re || !!Y != !!U, l.direction = Y > U ? 1 : -1, l.progress = Y, Ne && !Te && (te = Y && !U ? 0 : Y === 1 ? 1 : U === 1 ? 2 : 3, oe && (j = !Re && H[te + 1] !== "none" && H[te + 1] || H[te], Z = r && (j === "complete" || j === "reset" || j in r))), ce && (Re || Z) && (Z || M || !r) && (Le(ce) ? ce(l) : l.getTrailing(ce).forEach(function(re) {
            return re.endAnimation();
          })), oe || (O && !Te && !Rr ? (O._dp._time - O._start !== O._time && O.render(O._dp._time - O._start), O.resetTo ? O.resetTo("totalProgress", Y, r._tTime / r._tDur) : (O.vars.totalProgress = Y, O.invalidate().restart())) : r && r.totalProgress(Y, !!Te)), u) {
            if (d && h && (Ee.style[h + x.os2] = or), !ue)
              K(hr(He + Pe * Y));
            else if (Ne) {
              if (he = !d && Y > U && fe + 1 > E && E + 1 >= Ct(y, x), X)
                if (!d && (me || he)) {
                  var Se = gt(u, !0), $t = E - A;
                  Nn(u, Q, Se.top + (x === le ? $t : 0) + be, Se.left + (x === le ? 0 : $t) + be);
                } else
                  Nn(u, Ee);
              tr(me || he ? yt : qt), sr && Y < 1 && me || K(He + (Y === 1 && !he ? Pe : 0));
            }
          }
          k && !xe.tween && !Te && !Rr && et.restart(!0), s && (Re || F && Y && (Y < 1 || !en)) && Ur(s.targets).forEach(function(re) {
            return re.classList[me || F ? "add" : "remove"](s.className);
          }), a && !oe && !d && a(l), Ne && !Te ? (oe && (Z && (j === "complete" ? r.pause().totalProgress(1) : j === "reset" ? r.restart(!0).pause() : j === "restart" ? r.restart(!0) : r[j]()), a && a(l)), (Re || !en) && (_ && Re && rn(l, _), Me[te] && rn(l, Me[te]), F && (Y === 1 ? l.kill(!1, 1) : Me[te] = 0), Re || (te = Y === 1 ? 1 : 3, Me[te] && rn(l, Me[te]))), $ && !me && Math.abs(l.getVelocity()) > (gr($) ? $ : 2500) && (dr(l.callbackAnimation), O ? O.progress(1) : dr(r, j === "reverse" ? 1 : !Y, 1))) : oe && a && !Te && a(l);
        }
        if (St) {
          var It = v ? E / v.duration() * (v._caScrollDist || 0) : E;
          at(It + (Ce._isFlipped ? 1 : 0)), St(It);
        }
        Vt && Vt(-E / v.duration() * (v._caScrollDist || 0));
      }
    }, l.enable = function(d, m) {
      l.enabled || (l.enabled = !0, ve(y, "resize", _r), ve(B ? V : y, "scroll", jt), ae && ve(n, "refreshInit", ae), d !== !1 && (l.progress = Qe = 0, Xe = je = Ue = q()), m !== !1 && l.refresh());
    }, l.getTween = function(d) {
      return d && xe ? xe.tween : O;
    }, l.setPositions = function(d, m) {
      u && (He += d - A, Pe += m - d - G, h === J && l.adjustPinSpacing(m - d - G)), l.start = A = d, l.end = fe = m, G = m - d, l.update();
    }, l.adjustPinSpacing = function(d) {
      if (Oe && d) {
        var m = Oe.indexOf(x.d) + 1;
        Oe[m] = parseFloat(Oe[m]) + d + be, Oe[1] = parseFloat(Oe[1]) + d + be, tr(Oe);
      }
    }, l.disable = function(d, m) {
      if (l.enabled && (d !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, m || O && O.pause(), tt = 0, ke && (ke.uncache = 1), ae && _e(n, "refreshInit", ae), et && (et.pause(), xe.tween && xe.tween.kill() && (xe.tween = 0)), !B)) {
        for (var w = P.length; w--; )
          if (P[w].scroller === y && P[w] !== l)
            return;
        _e(y, "resize", _r), _e(y, "scroll", jt);
      }
    }, l.kill = function(d, m) {
      l.disable(d, m), O && !m && O.kill(), f && delete _n[f];
      var w = P.indexOf(l);
      w >= 0 && P.splice(w, 1), w === Ae && Wr > 0 && Ae--, w = 0, P.forEach(function(E) {
        return E.scroller === l.scroller && (w = 1);
      }), w || Ge || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
        kill: !1
      }), m || r.kill()), Be && [Be, st, Ce, c].forEach(function(E) {
        return E.parentNode && E.parentNode.removeChild(E);
      }), Tr === l && (Tr = 0), u && (ke && (ke.uncache = 1), w = 0, P.forEach(function(E) {
        return E.pin === u && w++;
      }), w || (ke.spacer = 0)), t.onKill && t.onKill(l);
    }, l.enable(!1, !1), ht && ht(l), !r || !r.add || G ? l.refresh() : g.delayedCall(0.01, function() {
      return A || fe || l.refresh();
    }) && (G = 0.01) && (A = fe = 0), u && Ji();
  }, n.register = function(t) {
    return Qt || (g = t || ci(), li() && window.document && n.enable(), Qt = pr), Qt;
  }, n.defaults = function(t) {
    if (t)
      for (var r in t)
        zr[r] = t[r];
    return zr;
  }, n.disable = function(t, r) {
    pr = 0, P.forEach(function(a) {
      return a[r ? "kill" : "disable"](t);
    }), _e(I, "wheel", jt), _e(V, "scroll", jt), clearInterval(Or), _e(V, "touchcancel", ut), _e(Q, "touchstart", ut), Ar(_e, V, "pointerdown,touchstart,mousedown", zn), Ar(_e, V, "pointerup,touchend,mouseup", Ln), $r.kill(), Dr(_e);
    for (var o = 0; o < R.length; o += 3)
      Ir(_e, R[o], R[o + 1]), Ir(_e, R[o], R[o + 2]);
  }, n.enable = function() {
    if (I = window, V = document, it = V.documentElement, Q = V.body, g && (Ur = g.utils.toArray, Jt = g.utils.clamp, hn = g.core.context || ut, Jr = g.core.suppressOverwrites || ut, yn = I.history.scrollRestoration || "auto", vn = I.pageYOffset, g.core.globals("ScrollTrigger", n), Q)) {
      pr = 1, Vi(), ne.register(g), n.isTouch = ne.isTouch, Tt = ne.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), ve(I, "wheel", jt), ri = [I, V, it, Q], g.matchMedia ? (n.matchMedia = function(f) {
        var _ = g.matchMedia(), T;
        for (T in f)
          _.add(T, f[T]);
        return _;
      }, g.addEventListener("matchMediaInit", function() {
        return kn();
      }), g.addEventListener("matchMediaRevert", function() {
        return gi();
      }), g.addEventListener("matchMedia", function() {
        Ft(0, 1), Wt("matchMedia");
      }), g.matchMedia("(orientation: portrait)", function() {
        return nn(), nn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), nn(), ve(V, "scroll", jt);
      var t = Q.style, r = t.borderTopStyle, o = g.core.Animation.prototype, a, s;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), t.borderTopStyle = "solid", a = gt(Q), le.m = Math.round(a.top + le.sc()) || 0, ze.m = Math.round(a.left + ze.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Or = setInterval(Xn, 250), g.delayedCall(0.5, function() {
        return Rr = 0;
      }), ve(V, "touchcancel", ut), ve(Q, "touchstart", ut), Ar(ve, V, "pointerdown,touchstart,mousedown", zn), Ar(ve, V, "pointerup,touchend,mouseup", Ln), pn = g.utils.checkPrefix("transform"), qr.push(pn), Qt = Ie(), $r = g.delayedCall(0.2, Ft).pause(), Kt = [V, "visibilitychange", function() {
        var f = I.innerWidth, _ = I.innerHeight;
        V.hidden ? (An = f, In = _) : (An !== f || In !== _) && _r();
      }, V, "DOMContentLoaded", Ft, I, "load", Ft, I, "resize", _r], Dr(ve), P.forEach(function(f) {
        return f.enable(0, 1);
      }), s = 0; s < R.length; s += 3)
        Ir(_e, R[s], R[s + 1]), Ir(_e, R[s], R[s + 2]);
    }
  }, n.config = function(t) {
    "limitCallbacks" in t && (en = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Or) || (Or = r) && setInterval(Xn, r), "ignoreMobileResize" in t && (oi = n.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Dr(_e) || Dr(ve, t.autoRefreshEvents || "none"), ii = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, n.scrollerProxy = function(t, r) {
    var o = Ye(t), a = R.indexOf(o), s = Ht(o);
    ~a && R.splice(a, s ? 6 : 2), r && (s ? ft.unshift(I, r, Q, r, it, r) : ft.unshift(o, r));
  }, n.clearMatchMedia = function(t) {
    P.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, n.isInViewport = function(t, r, o) {
    var a = (nt(t) ? Ye(t) : t).getBoundingClientRect(), s = a[o ? Yt : Xt] * r || 0;
    return o ? a.right - s > 0 && a.left + s < I.innerWidth : a.bottom - s > 0 && a.top + s < I.innerHeight;
  }, n.positionInViewport = function(t, r, o) {
    nt(t) && (t = Ye(t));
    var a = t.getBoundingClientRect(), s = a[o ? Yt : Xt], f = r == null ? s / 2 : r in jr ? jr[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
    return o ? (a.left + f) / I.innerWidth : (a.top + f) / I.innerHeight;
  }, n.killAll = function(t) {
    if (P.slice(0).forEach(function(o) {
      return o.vars.id !== "ScrollSmoother" && o.kill();
    }), t !== !0) {
      var r = Nt.killAll || [];
      Nt = {}, r.forEach(function(o) {
        return o();
      });
    }
  }, n;
}();
D.version = "3.11.5";
D.saveStyles = function(n) {
  return n ? Ur(n).forEach(function(e) {
    if (e && e.style) {
      var i = qe.indexOf(e);
      i >= 0 && qe.splice(i, 5), qe.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), g.core.getCache(e), hn());
    }
  }) : qe;
};
D.revert = function(n, e) {
  return kn(!n, e);
};
D.create = function(n, e) {
  return new D(n, e);
};
D.refresh = function(n) {
  return n ? _r() : (Qt || D.register()) && Ft(!0);
};
D.update = function(n) {
  return ++R.cache && vt(n === !0 ? 2 : 0);
};
D.clearScrollMemory = _i;
D.maxScroll = function(n, e) {
  return Ct(n, e ? ze : le);
};
D.getScrollFunc = function(n, e) {
  return Pt(Ye(n), e ? ze : le);
};
D.getById = function(n) {
  return _n[n];
};
D.getAll = function() {
  return P.filter(function(n) {
    return n.vars.id !== "ScrollSmoother";
  });
};
D.isScrolling = function() {
  return !!Ze;
};
D.snapDirectional = Mn;
D.addEventListener = function(n, e) {
  var i = Nt[n] || (Nt[n] = []);
  ~i.indexOf(e) || i.push(e);
};
D.removeEventListener = function(n, e) {
  var i = Nt[n], t = i && i.indexOf(e);
  t >= 0 && i.splice(t, 1);
};
D.batch = function(n, e) {
  var i = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, a = function(_, T) {
    var M = [], p = [], u = g.delayedCall(r, function() {
      T(M, p), M = [], p = [];
    }).pause();
    return function(h) {
      M.length || u.restart(!0), M.push(h.trigger), p.push(h), o <= M.length && u.progress(1);
    };
  }, s;
  for (s in e)
    t[s] = s.substr(0, 2) === "on" && Le(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
  return Le(o) && (o = o(), ve(D, "refresh", function() {
    return o = e.batchMax();
  })), Ur(n).forEach(function(f) {
    var _ = {};
    for (s in t)
      _[s] = t[s];
    _.trigger = f, i.push(D.create(_));
  }), i;
};
var qn = function(e, i, t, r) {
  return i > r ? e(r) : i < 0 && e(0), t > r ? (r - i) / (t - i) : t < 0 ? i / (i - t) : 1;
}, sn = function n(e, i) {
  i === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = i === !0 ? "auto" : i ? "pan-" + i + (ne.isTouch ? " pinch-zoom" : "") : "none", e === it && n(Q, i);
}, Yr = {
  auto: 1,
  scroll: 1
}, io = function(e) {
  var i = e.event, t = e.target, r = e.axis, o = (i.changedTouches ? i.changedTouches[0] : i).target, a = o._gsap || g.core.getCache(o), s = Ie(), f;
  if (!a._isScrollT || s - a._isScrollT > 2e3) {
    for (; o && o !== Q && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Yr[(f = ot(o)).overflowY] || Yr[f.overflowX])); )
      o = o.parentNode;
    a._isScroll = o && o !== t && !Ht(o) && (Yr[(f = ot(o)).overflowY] || Yr[f.overflowX]), a._isScrollT = s;
  }
  (a._isScroll || r === "x") && (i.stopPropagation(), i._gsapAllow = !0);
}, mi = function(e, i, t, r) {
  return ne.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: i,
    onWheel: r = r && io,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && ve(V, ne.eventTypes[0], Vn, !1, !0);
    },
    onDisable: function() {
      return _e(V, ne.eventTypes[0], Vn, !0);
    }
  });
}, oo = /(input|label|select|textarea)/i, Gn, Vn = function(e) {
  var i = oo.test(e.target.tagName);
  (i || Gn) && (e._gsapAllow = !0, Gn = i);
}, so = function(e) {
  Br(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var i = e, t = i.normalizeScrollX, r = i.momentum, o = i.allowNestedScroll, a = i.onRelease, s, f, _ = Ye(e.target) || it, T = g.core.globals().ScrollSmoother, M = T && T.get(), p = Tt && (e.content && Ye(e.content) || M && e.content !== !1 && !M.smooth() && M.content()), u = Pt(_, le), h = Pt(_, ze), L = 1, W = (ne.isTouch && I.visualViewport ? I.visualViewport.scale * I.visualViewport.width : I.outerWidth) / I.innerWidth, z = 0, ie = Le(r) ? function() {
    return r(s);
  } : function() {
    return r || 2.8;
  }, F, k, X = mi(_, e.type, !0, o), S = function() {
    return k = !1;
  }, v = ut, $ = ut, ce = function() {
    f = Ct(_, le), $ = Jt(Tt ? 1 : 0, f), t && (v = Jt(0, Ct(_, ze))), F = Bt;
  }, x = function() {
    p._gsap.y = hr(parseFloat(p._gsap.y) + u.offset) + "px", p.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(p._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, oe = function() {
    if (k) {
      requestAnimationFrame(S);
      var se = hr(s.deltaY / 2), ee = $(u.v - se);
      if (p && ee !== u.v + u.offset) {
        u.offset = ee - u.v;
        var l = hr((parseFloat(p && p._gsap.y) || 0) - u.offset);
        p.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", p._gsap.y = l + "px", u.cacheID = R.cache, vt();
      }
      return !0;
    }
    u.offset && x(), k = !0;
  }, y, $e, B, ue, Me = function() {
    ce(), y.isActive() && y.vars.scrollY > f && (u() > f ? y.progress(1) && u(f) : y.resetTo("scrollY", f));
  };
  return p && g.set(p, {
    y: "+=0"
  }), e.ignoreCheck = function(H) {
    return Tt && H.type === "touchmove" && oe() || L > 1.05 && H.type !== "touchstart" || s.isGesturing || H.touches && H.touches.length > 1;
  }, e.onPress = function() {
    k = !1;
    var H = L;
    L = hr((I.visualViewport && I.visualViewport.scale || 1) / W), y.pause(), H !== L && sn(_, L > 1.01 ? !0 : t ? !1 : "x"), $e = h(), B = u(), ce(), F = Bt;
  }, e.onRelease = e.onGestureStart = function(H, se) {
    if (u.offset && x(), !se)
      ue.restart(!0);
    else {
      R.cache++;
      var ee = ie(), l, ae;
      t && (l = h(), ae = l + ee * 0.05 * -H.velocityX / 0.227, ee *= qn(h, l, ae, Ct(_, ze)), y.vars.scrollX = v(ae)), l = u(), ae = l + ee * 0.05 * -H.velocityY / 0.227, ee *= qn(u, l, ae, Ct(_, le)), y.vars.scrollY = $(ae), y.invalidate().duration(ee).play(0.01), (Tt && y.vars.scrollY >= f || l >= f - 1) && g.to({}, {
        onUpdate: Me,
        duration: ee
      });
    }
    a && a(H);
  }, e.onWheel = function() {
    y._ts && y.pause(), Ie() - z > 1e3 && (F = 0, z = Ie());
  }, e.onChange = function(H, se, ee, l, ae) {
    if (Bt !== F && ce(), se && t && h(v(l[2] === se ? $e + (H.startX - H.x) : h() + se - l[1])), ee) {
      u.offset && x();
      var Ot = ae[2] === ee, mt = Ot ? B + H.startY - H.y : u() + ee - ae[1], Ue = $(mt);
      Ot && mt !== Ue && (B += Ue - mt), u(Ue);
    }
    (ee || se) && vt();
  }, e.onEnable = function() {
    sn(_, t ? !1 : "x"), D.addEventListener("refresh", Me), ve(I, "resize", Me), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = h.smooth = !1), X.enable();
  }, e.onDisable = function() {
    sn(_, !0), _e(I, "resize", Me), D.removeEventListener("refresh", Me), X.kill();
  }, e.lockAxis = e.lockAxis !== !1, s = new ne(e), s.iOS = Tt, Tt && !u() && u(1), Tt && g.ticker.add(ut), ue = s._dc, y = g.to(s, {
    ease: "power4",
    paused: !0,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: vi(u, u(), function() {
        return y.pause();
      })
    },
    onUpdate: vt,
    onComplete: ue.vars.onComplete
  }), s;
};
D.sort = function(n) {
  return P.sort(n || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + e.start - (i.start + (i.vars.refreshPriority || 0) * -1e6);
  });
};
D.observe = function(n) {
  return new ne(n);
};
D.normalizeScroll = function(n) {
  if (typeof n > "u")
    return We;
  if (n === !0 && We)
    return We.enable();
  if (n === !1)
    return We && We.kill();
  var e = n instanceof ne ? n : so(n);
  return We && We.target === e.target && We.kill(), Ht(e.target) && (We = e), e;
};
D.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: dn,
  _inputObserver: mi,
  _scrollers: R,
  _proxies: ft,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Ze || Wt("scrollStart"), Ze = Ie();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Te;
    }
  }
};
ci() && g.registerPlugin(D);
we.registerPlugin(D);
class bi extends kr {
  static create(e, i = {}, t = {}) {
    return new bi(e, i, t);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(e) {
    this.meta.speed = e;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(e) {
    this.meta.velocity = e;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(e) {
    this.meta.direction = e;
  }
  constructor(e, i = {}, t = {}) {
    super(
      (r) => {
        var y, $e;
        Object.assign(r.meta, {
          speed: i.speed ?? 1,
          velocity: i.velocity ?? 0,
          direction: i.direction || "rtl",
          onCreated: i.onCreated,
          onUpdate: i.onUpdate
        }), r.meta.scrollTrigger = D.create(i.scrollTrigger ?? {});
        let o = null;
        typeof e == "string" ? o = document.querySelector(e) : e instanceof HTMLElement && (o = e);
        const a = i.createDOMContainers != null ? i.createDOMContainers : !0, s = a ? document.createElement("div") : o == null ? void 0 : o.querySelector(".owow-marquee-outer");
        s == null || s.classList.add("owow-marquee-outer");
        const f = a ? document.createElement("div") : s == null ? void 0 : s.querySelector(".owow-marquee-inner");
        if (f == null || f.classList.add("owow-marquee-inner"), !o || !s || !f)
          throw console.error({
            targetContainer: o,
            outerContainer: s,
            innerContainer: f
          }), new Error("Invalid marquee DOM structure");
        r.meta.sourceDOM = o.cloneNode(!0), r.meta.target = o, f.append(...o.childNodes), s.append(f), o == null || o.append(s), we.set(f, { display: "inline-flex" });
        const _ = o.getBoundingClientRect(), T = f.getBoundingClientRect(), M = _.width + T.width, p = document.createDocumentFragment(), u = [];
        let h = T.width;
        if (!M || !h)
          return;
        for (; h <= M; ) {
          const B = f.cloneNode(!0);
          h += T.width, u.push(B);
        }
        p.append(...u), s.append(p);
        const L = we.context(() => {
          we.set(s, {
            x: 0,
            force3D: !0,
            width: h,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), W = we.utils.pipe(
          (B) => Math.floor(B * 1e3) / 1e3,
          we.quickSetter(s, "x", "px")
        ), z = we.utils.wrap(0, -T.width), ie = we.utils.normalize(0, -T.width);
        let F, k, X, S, v, $, ce, x;
        const oe = we.ticker.add(() => {
          var B, ue;
          switch (x = we.ticker.deltaRatio(), k = we.utils.interpolate(
            k ?? 0,
            r.meta.scrollTrigger.getVelocity(),
            0.5 * x
          ), X = k * r.meta.velocity, r.meta.direction) {
            case "ltr":
              F = -1, X = -Math.abs(X);
              break;
            case "rtl":
              F = 1, X = Math.abs(X);
              break;
            case "scroll":
              F = r.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              F = -(r.meta.scrollTrigger.direction ?? 1), X = -X;
          }
          S = we.getProperty(s, "x"), v = r.meta.speed * -F, $ = (v - X) * x, ce = z(S + $), W(ce), (ue = (B = r.meta).onUpdate) == null || ue.call(B, ie(ce));
        });
        return ($e = (y = r.meta).onCreated) == null || $e.call(y), () => {
          var B;
          for (L.kill(!0), we.ticker.remove(oe), o == null || o.replaceChildren(...r.meta.sourceDOM.childNodes); u.length; )
            (B = u.pop()) == null || B.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...t
      }
    );
  }
}
class wi extends kr {
  constructor(e, i = {}, t = {}) {
    super(async (r, o) => {
      const a = wi.SplitText;
      if (!a)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      ur.registerPlugin(a);
      const s = ur.utils.toArray(e);
      for (const p of s)
        if (!(p instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const f = r.meta.childSplit = new a(e, {
        type: "lines",
        linesClass: "owow-split-child",
        ...Lt(i.childSplitVars)
      }), _ = r.meta.parentSplit = new a(e, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...Lt(i.parentSplitVars)
      }), T = {
        y: (p, u) => {
          const h = parseFloat(getComputedStyle(u).lineHeight);
          return isNaN(h) ? ur.getProperty(u, "height") : h;
        },
        ...Lt(i.fromVars)
      }, M = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...Lt(i.toVars)
      };
      return o.add(() => {
        r.meta.setup = ur.set(_.lines, { overflow: "hidden" }), r.meta.tween = ur.fromTo(f.lines, T, M);
      }), () => {
        f.revert(), o.kill(!0);
      };
    }, t);
  }
}
export {
  N as Ease,
  bi as Marquee,
  kr as Motion,
  Un as Pointer,
  co as SecondOrderDynamics,
  wi as TextClipReveal
};
