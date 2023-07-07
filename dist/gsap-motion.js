import { noop as Ni, fromEvent as In, debounceTime as Wi, Observable as qi } from "rxjs";
import Re, { gsap as Br } from "gsap";
const Fn = 1.70158, Yn = 0.7;
class V {
}
V.inSine = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1;
V.outSine = (i) => Math.sin(i * (Math.PI / 2));
V.inOutSine = (i) => -0.5 * (Math.cos(Math.PI * i) - 1);
V.inQuad = (i) => i * i;
V.outQuad = (i) => i * (2 - i);
V.inOutQuad = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i;
V.inCubic = (i) => i * i * i;
V.outCubic = (i) => --i * i * i + 1;
V.inOutCubic = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1;
V.inQuart = (i) => i * i * i * i;
V.outQuart = (i) => 1 - --i * i * i * i;
V.inOutQuart = (i) => i < 0.5 ? 8 * i * i * i * i : 1 - 8 * --i * i * i * i;
V.inQuint = (i) => i * i * i * i * i;
V.outQuint = (i) => 1 + --i * i * i * i * i;
V.inOutQuint = (i) => i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * --i * i * i * i * i;
V.inExpo = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1));
V.outExpo = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1;
V.inOutExpo = (i) => i === 0 || i === 1 ? i : i * 2 < 1 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2);
V.inCirc = (i) => -1 * (Math.sqrt(1 - i / 1 * i) - 1);
V.outCirc = (i) => Math.sqrt(1 - Math.pow(i - 1, 2));
V.inOutCirc = (i) => i * 2 < 1 ? -0.5 * (Math.sqrt(1 - Math.pow(i * 2, 2)) - 1) : 0.5 * (Math.sqrt(1 - Math.pow(i * 2 - 2, 2)) + 1);
V.inBack = (i, p = Fn) => i * i * ((p + 1) * i - p);
V.outBack = (i, p = Fn) => {
  const h = i / 1 - 1;
  return h * h * ((p + 1) * h + p) + 1;
};
V.inOutBack = (i, p = Fn) => {
  const h = i * 2, M = h - 2, m = p * 1.525;
  return h < 1 ? 0.5 * h * h * ((m + 1) * h - m) : 0.5 * (M * M * ((m + 1) * M + m) + 2);
};
V.inElastic = (i, p = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const M = i / 1 - 1, m = 1 - p, v = m / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * M) * Math.sin((M - v) * (2 * Math.PI) / m));
};
V.outElastic = (i, p = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - p, M = i * 2, m = h / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * M) * Math.sin((M - m) * (2 * Math.PI) / h) + 1;
};
V.inOutElastic = (i, p = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - p, M = i * 2, m = M - 1, v = h / (2 * Math.PI) * Math.asin(1);
  return M < 1 ? -0.5 * (Math.pow(2, 10 * m) * Math.sin((m - v) * (2 * Math.PI) / h)) : Math.pow(2, -10 * m) * Math.sin((m - v) * (2 * Math.PI) / h) * 0.5 + 1;
};
var Hr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gi(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Vi = "Expected a function", wi = 0 / 0, $i = "[object Symbol]", Ui = /^\s+|\s+$/g, ji = /^[-+]0x[0-9a-f]+$/i, Qi = /^0b[01]+$/i, Ki = /^0o[0-7]+$/i, Zi = parseInt, Ji = typeof Hr == "object" && Hr && Hr.Object === Object && Hr, eo = typeof self == "object" && self && self.Object === Object && self, to = Ji || eo || Function("return this")(), ro = Object.prototype, no = ro.toString, io = Math.max, oo = Math.min, An = function() {
  return to.Date.now();
};
function so(i, p, h) {
  var M, m, v, K, k, B, ae = 0, Se = !1, et = !1, Te = !0;
  if (typeof i != "function")
    throw new TypeError(Vi);
  p = yi(p) || 0, zn(h) && (Se = !!h.leading, et = "maxWait" in h, v = et ? io(yi(h.maxWait) || 0, p) : v, Te = "trailing" in h ? !!h.trailing : Te);
  function Me(X) {
    var ke = M, ft = m;
    return M = m = void 0, ae = X, K = i.apply(ft, ke), K;
  }
  function ct(X) {
    return ae = X, k = setTimeout(Dt, p), Se ? Me(X) : K;
  }
  function tt(X) {
    var ke = X - B, ft = X - ae, Yt = p - ke;
    return et ? oo(Yt, v - ft) : Yt;
  }
  function Ae(X) {
    var ke = X - B, ft = X - ae;
    return B === void 0 || ke >= p || ke < 0 || et && ft >= v;
  }
  function Dt() {
    var X = An();
    if (Ae(X))
      return Ut(X);
    k = setTimeout(Dt, tt(X));
  }
  function Ut(X) {
    return k = void 0, Te && M ? Me(X) : (M = m = void 0, K);
  }
  function Mt() {
    k !== void 0 && clearTimeout(k), ae = 0, M = B = m = k = void 0;
  }
  function ut() {
    return k === void 0 ? K : Ut(An());
  }
  function x() {
    var X = An(), ke = Ae(X);
    if (M = arguments, m = this, B = X, ke) {
      if (k === void 0)
        return ct(B);
      if (et)
        return k = setTimeout(Dt, p), Me(B);
    }
    return k === void 0 && (k = setTimeout(Dt, p)), K;
  }
  return x.cancel = Mt, x.flush = ut, x;
}
function zn(i) {
  var p = typeof i;
  return !!i && (p == "object" || p == "function");
}
function ao(i) {
  return !!i && typeof i == "object";
}
function lo(i) {
  return typeof i == "symbol" || ao(i) && no.call(i) == $i;
}
function yi(i) {
  if (typeof i == "number")
    return i;
  if (lo(i))
    return wi;
  if (zn(i)) {
    var p = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = zn(p) ? p + "" : p;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace(Ui, "");
  var h = Qi.test(i);
  return h || Ki.test(i) ? Zi(i.slice(2), h ? 2 : 8) : ji.test(i) ? wi : +i;
}
var co = so;
const uo = /* @__PURE__ */ Gi(co);
function cr(i, ...p) {
  return i instanceof Function ? i.call(null, p) : i;
}
const xi = class {
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
  constructor(i, p = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = uo(
      () => {
        var h;
        (h = this.cleanup) == null || h.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      xi.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var h, M;
      (h = this.cleanup) == null || h.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const m of Object.keys(this.meta))
        delete this.meta[m];
      for (; this.subscriptions.length; )
        (M = this.subscriptions.pop()) == null || M.unsubscribe();
    }, this.observeMedia(cr(p.watchMedia)), this.observeResize(cr(p.shouldResetOnResize)), this.create = () => {
      var m;
      return this.context = Re.context(Ni), [
        cr(p.enable) ?? !0,
        ((m = this.mediaQueryList) == null ? void 0 : m.matches) ?? !0
      ].every(Boolean) ? i(this, this.context) : void 0;
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
  static applyDeltaRatio(i) {
    return i * Re.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var p;
    const i = (p = this.create) == null ? void 0 : p.call(this, this, this.context);
    i instanceof Promise ? i.then((h) => this.cleanup = h ?? void 0) : this.cleanup = i ?? void 0;
  }
  observeMedia(i) {
    i && (this.mediaQueryList = matchMedia(i), this.subscriptions.push(In(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(i) {
    i && (this.motionResizeObserver = new fo(i), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Wi(100)).subscribe(() => this.reset())
    ));
  }
};
let Nr = xi;
Nr.resetDebounceTime = 100;
Nr.referenceFramerate = 60;
class fo {
  constructor(p) {
    const [h, M] = [p].flat();
    this.element = typeof h == "string" ? document.querySelector(h) : h, this.axis = M, this.observable = new qi((m) => {
      const v = new ResizeObserver(
        (K) => this.handleResize(K, m)
      );
      return this.element && v.observe(this.element), () => v.disconnect();
    });
  }
  handleResize(p, h) {
    const M = p.find((ae) => ae.target === this.element);
    if (!M)
      return;
    const { inlineSize: m, blockSize: v } = M.borderBoxSize[0], K = m !== this.inlineSize, k = v !== this.blockSize, B = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = m, this.blockSize = v, !B) {
      if (this.axis === "horizontal" && K || this.axis === "vertical" && k)
        return h.next();
      !this.axis && (K || k) && h.next();
    }
  }
}
class Si extends Nr {
  /**
   * Utility for doing stuff with the mouse/pointer.
   *
   * _This class exposes a static singleton `instance`,
   * and does **not** have to be created using `new Pointer();`_
   *
   * @example
   * // Make a custom cursor that copies the current pointer position.
   * gsap.ticker.add(() => {
   *    gsap.set("#custom-cursor", {
   *      x: Pointer.instance.clientX,
   *      y: Pointer.instance.clientY
   *    })
   * })
   */
  constructor() {
    super(
      (p) => {
        p.meta.observable = In(window, "mousemove"), p.subscriptions.push(
          p.meta.observable.subscribe((h) => {
            this.clientX = h.clientX, this.clientY = h.clientY, this.normalX = Re.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Re.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), p.subscriptions.push(
          In(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), p.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new Si());
  }
  get observable() {
    return this.meta.observable;
  }
}
class go {
  // dynamics constant
  /**
   * Second Order Dynamics is a mathematical model that simulates object behavior by considering forces, acceleration, velocity, and position. It enables realistic animations by accurately representing movement and forces acting on objects.
   * @param speed Shape of the motion
   * @param damping Shape of settling of motion
   * @param response Acceleration of the motion
   * @param x0 Initial value
   */
  constructor(p = 1, h = 1, M = 0, m) {
    this.k1 = h / (Math.PI * p), this.k2 = 1 / (2 * Math.PI * p * (2 * Math.PI * p)), this.k3 = M * h / (2 * Math.PI * p), this.xp = m, this.y = m, this.yd = 0;
  }
  /**
   * Calculate and apply next position
   * @param step Step to calculate next position. For example; delta time.
   * @param x Next value
   * @param xd Optional velocity
   * @returns
   */
  update(p, h, M) {
    M === void 0 && (M = (h - this.xp) / p, this.xp = h);
    const m = Math.max(this.k2, p * p / 2 + p * this.k1 / 2, p * this.k1);
    return this.y = this.y + p * this.yd, this.yd = this.yd + p * (h + this.k3 * M - this.y - this.k1 * this.yd) / m, this.y;
  }
}
var Ln = { exports: {} };
(function(i, p) {
  (function(h, M) {
    M(p);
  })(Hr, function(h) {
    function M(s, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(s, t.key, t);
      }
    }
    function m(s, e, n) {
      return e && M(s.prototype, e), n && M(s, n), s;
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
    var v, K, k, B, ae, Se, et, Te, Me, ct, tt, Ae, Dt, Ut = function() {
      return v || typeof window < "u" && (v = window.gsap) && v.registerPlugin && v;
    }, Mt = 1, ut = [], x = [], X = [], ke = Date.now, ft = function(e, n) {
      return n;
    }, Yt = function() {
      var e = Me.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, x), r.push.apply(r, X), x = t, X = r, ft = function(c, a) {
        return n[c](a);
      };
    }, dt = function(e, n) {
      return ~X.indexOf(e) && X[X.indexOf(e) + 1][n];
    }, jt = function(e) {
      return !!~ct.indexOf(e);
    }, Ce = function(e, n, t, r, o) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!o
      });
    }, ge = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Qe = "scrollLeft", Qt = "scrollTop", fn = function() {
      return tt && tt.isPressed || x.cache++;
    }, Wr = function(e, n) {
      var t = function r(o) {
        if (o || o === 0) {
          Mt && (k.history.scrollRestoration = "manual");
          var c = tt && tt.isPressed;
          o = r.v = Math.round(o) || (tt && tt.iOS ? 1 : 0), e(o), r.cacheID = x.cache, c && ft("ss", o);
        } else
          (n || x.cache !== r.cacheID || ft("ref")) && (r.cacheID = x.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Ye = {
      s: Qe,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Wr(function(s) {
        return arguments.length ? k.scrollTo(s, de.sc()) : k.pageXOffset || B[Qe] || ae[Qe] || Se[Qe] || 0;
      })
    }, de = {
      s: Qt,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Ye,
      sc: Wr(function(s) {
        return arguments.length ? k.scrollTo(Ye.sc(), s) : k.pageYOffset || B[Qt] || ae[Qt] || Se[Qt] || 0;
      })
    }, Ke = function(e) {
      return v.utils.toArray(e)[0] || (typeof e == "string" && v.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      jt(e) && (e = B.scrollingElement || ae);
      var o = x.indexOf(e), c = r === de.sc ? 1 : 2;
      !~o && (o = x.push(e) - 1), x[o + c] || e.addEventListener("scroll", fn);
      var a = x[o + c], g = a || (x[o + c] = Wr(dt(e, t), !0) || (jt(e) ? r : Wr(function(C) {
        return arguments.length ? e[t] = C : e[t];
      })));
      return g.target = e, a || (g.smooth = v.getProperty(e, "scrollBehavior") === "smooth"), g;
    }, dn = function(e, n, t) {
      var r = e, o = e, c = ke(), a = c, g = n || 50, C = Math.max(500, g * 3), H = function(w, $) {
        var ne = ke();
        $ || ne - c > g ? (o = r, r = w, a = c, c = ne) : t ? r += w : r = o + (w - o) / (ne - a) * (c - a);
      }, N = function() {
        o = r = t ? 0 : r, a = c = 0;
      }, b = function(w) {
        var $ = a, ne = o, q = ke();
        return (w || w === 0) && w !== r && H(w), c === a || q - a > C ? 0 : (r + (t ? ne : -ne)) / ((t ? q : c) - $) * 1e3;
      };
      return {
        update: H,
        reset: N,
        getVelocity: b
      };
    }, yr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Xn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Bn = function() {
      Me = v.core.globals().ScrollTrigger, Me && Me.core && Yt();
    }, Hn = function(e) {
      return v = e || Ut(), v && typeof document < "u" && document.body && (k = window, B = document, ae = B.documentElement, Se = B.body, ct = [k, B, ae, Se], v.utils.clamp, Dt = v.core.context || function() {
      }, Te = "onpointerenter" in Se ? "pointer" : "mouse", et = le.isTouch = k.matchMedia && k.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in k || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ae = le.eventTypes = ("ontouchstart" in ae ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ae ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return Mt = 0;
      }, 500), Bn(), K = 1), K;
    };
    Ye.op = de, x.cache = 0;
    var le = function() {
      function s(n) {
        this.init(n);
      }
      var e = s.prototype;
      return e.init = function(t) {
        K || Hn(v) || console.warn("Please gsap.registerPlugin(Observer)"), Me || Bn();
        var r = t.tolerance, o = t.dragMinimum, c = t.type, a = t.target, g = t.lineHeight, C = t.debounce, H = t.preventDefault, N = t.onStop, b = t.onStopDelay, f = t.ignore, w = t.wheelSpeed, $ = t.event, ne = t.onDragStart, q = t.onDragEnd, Ze = t.onDrag, te = t.onPress, F = t.onRelease, ze = t.onRight, ie = t.onLeft, P = t.onUp, Je = t.onDown, yt = t.onChangeX, O = t.onChangeY, Pe = t.onChange, E = t.onToggleX, It = t.onToggleY, Oe = t.onHover, Ne = t.onHoverEnd, We = t.onMove, G = t.ignoreCheck, pe = t.isNormalizer, ce = t.onGestureStart, l = t.onGestureEnd, he = t.onWheel, ir = t.onEnable, Nt = t.onDisable, gt = t.onClick, Wt = t.scrollSpeed, U = t.capture, Le = t.allowClicks, qe = t.lockAxis, Ar = t.onLockAxis;
        this.target = a = Ke(a) || ae, this.vars = t, f && (f = v.utils.toArray(f)), r = r || 1e-9, o = o || 0, w = w || 1, Wt = Wt || 1, c = c || "wheel,touch,pointer", C = C !== !1, g || (g = parseFloat(k.getComputedStyle(Se).lineHeight) || 22);
        var ot, _t, Y, ve, st, Ct, Ge, u = this, zt = 0, Q = 0, qt = Xt(a, Ye), Gt = Xt(a, de), mr = qt(), Ve = Gt(), Ir = ~c.indexOf("touch") && !~c.indexOf("pointer") && Ae[0] === "pointerdown", Vt = jt(a), oe = a.ownerDocument || B, at = [0, 0, 0], $e = [0, 0, 0], zr = 0, Ue = function() {
          return zr = ke();
        }, Et = function(S, d) {
          return (u.event = S) && f && ~f.indexOf(S.target) || d && Ir && S.pointerType !== "touch" || G && G(S, d);
        }, Lr = function() {
          u._vx.reset(), u._vy.reset(), _t.pause(), N && N(u);
        }, $t = function() {
          var S = u.deltaX = Xn(at), d = u.deltaY = Xn($e), y = Math.abs(S) >= r, T = Math.abs(d) >= r;
          Pe && (y || T) && Pe(u, S, d, at, $e), y && (ze && u.deltaX > 0 && ze(u), ie && u.deltaX < 0 && ie(u), yt && yt(u), E && u.deltaX < 0 != zt < 0 && E(u), zt = u.deltaX, at[0] = at[1] = at[2] = 0), T && (Je && u.deltaY > 0 && Je(u), P && u.deltaY < 0 && P(u), O && O(u), It && u.deltaY < 0 != Q < 0 && It(u), Q = u.deltaY, $e[0] = $e[1] = $e[2] = 0), (ve || Y) && (We && We(u), Y && (Ze(u), Y = !1), ve = !1), Ct && !(Ct = !1) && Ar && Ar(u), st && (he(u), st = !1), ot = 0;
        }, vr = function(S, d, y) {
          at[y] += S, $e[y] += d, u._vx.update(S), u._vy.update(d), C ? ot || (ot = requestAnimationFrame($t)) : $t();
        }, or = function(S, d) {
          qe && !Ge && (u.axis = Ge = Math.abs(S) > Math.abs(d) ? "x" : "y", Ct = !0), Ge !== "y" && (at[2] += S, u._vx.update(S, !0)), Ge !== "x" && ($e[2] += d, u._vy.update(d, !0)), C ? ot || (ot = requestAnimationFrame($t)) : $t();
        }, sr = function(S) {
          if (!Et(S, 1)) {
            S = yr(S, H);
            var d = S.clientX, y = S.clientY, T = d - u.x, R = y - u.y, be = u.isDragging;
            u.x = d, u.y = y, (be || Math.abs(u.startX - d) >= o || Math.abs(u.startY - y) >= o) && (Ze && (Y = !0), be || (u.isDragging = !0), or(T, R), be || ne && ne(u));
          }
        }, z = u.onPress = function(D) {
          Et(D, 1) || D && D.button || (u.axis = Ge = null, _t.pause(), u.isPressed = !0, D = yr(D), zt = Q = 0, u.startX = u.x = D.clientX, u.startY = u.y = D.clientY, u._vx.reset(), u._vy.reset(), Ce(pe ? a : oe, Ae[1], sr, H, !0), u.deltaX = u.deltaY = 0, te && te(u));
        }, Lt = u.onRelease = function(D) {
          if (!Et(D, 1)) {
            ge(pe ? a : oe, Ae[1], sr, !0);
            var S = !isNaN(u.y - u.startY), d = u.isDragging && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), y = yr(D);
            !d && S && (u._vx.reset(), u._vy.reset(), H && Le && v.delayedCall(0.08, function() {
              if (ke() - zr > 300 && !D.defaultPrevented) {
                if (D.target.click)
                  D.target.click();
                else if (oe.createEvent) {
                  var T = oe.createEvent("MouseEvents");
                  T.initMouseEvent("click", !0, !0, k, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), D.target.dispatchEvent(T);
                }
              }
            })), u.isDragging = u.isGesturing = u.isPressed = !1, N && !pe && _t.restart(!0), q && d && q(u), F && F(u, d);
          }
        }, xt = function(S) {
          return S.touches && S.touches.length > 1 && (u.isGesturing = !0) && ce(S, u.isDragging);
        }, St = function() {
          return (u.isGesturing = !1) || l(u);
        }, mt = function(S) {
          if (!Et(S)) {
            var d = qt(), y = Gt();
            vr((d - mr) * Wt, (y - Ve) * Wt, 1), mr = d, Ve = y, N && _t.restart(!0);
          }
        }, Tt = function(S) {
          if (!Et(S)) {
            S = yr(S, H), he && (st = !0);
            var d = (S.deltaMode === 1 ? g : S.deltaMode === 2 ? k.innerHeight : 1) * w;
            vr(S.deltaX * d, S.deltaY * d, 0), N && !pe && _t.restart(!0);
          }
        }, ar = function(S) {
          if (!Et(S)) {
            var d = S.clientX, y = S.clientY, T = d - u.x, R = y - u.y;
            u.x = d, u.y = y, ve = !0, (T || R) && or(T, R);
          }
        }, br = function(S) {
          u.event = S, Oe(u);
        }, Ft = function(S) {
          u.event = S, Ne(u);
        }, Fr = function(S) {
          return Et(S) || yr(S, H) && gt(u);
        };
        _t = u._dc = v.delayedCall(b || 0.25, Lr).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = qt, u.scrollY = Gt, u.isDragging = u.isGesturing = u.isPressed = !1, Dt(this), u.enable = function(D) {
          return u.isEnabled || (Ce(Vt ? oe : a, "scroll", fn), c.indexOf("scroll") >= 0 && Ce(Vt ? oe : a, "scroll", mt, H, U), c.indexOf("wheel") >= 0 && Ce(a, "wheel", Tt, H, U), (c.indexOf("touch") >= 0 && et || c.indexOf("pointer") >= 0) && (Ce(a, Ae[0], z, H, U), Ce(oe, Ae[2], Lt), Ce(oe, Ae[3], Lt), Le && Ce(a, "click", Ue, !1, !0), gt && Ce(a, "click", Fr), ce && Ce(oe, "gesturestart", xt), l && Ce(oe, "gestureend", St), Oe && Ce(a, Te + "enter", br), Ne && Ce(a, Te + "leave", Ft), We && Ce(a, Te + "move", ar)), u.isEnabled = !0, D && D.type && z(D), ir && ir(u)), u;
        }, u.disable = function() {
          u.isEnabled && (ut.filter(function(D) {
            return D !== u && jt(D.target);
          }).length || ge(Vt ? oe : a, "scroll", fn), u.isPressed && (u._vx.reset(), u._vy.reset(), ge(pe ? a : oe, Ae[1], sr, !0)), ge(Vt ? oe : a, "scroll", mt, U), ge(a, "wheel", Tt, U), ge(a, Ae[0], z, U), ge(oe, Ae[2], Lt), ge(oe, Ae[3], Lt), ge(a, "click", Ue, !0), ge(a, "click", Fr), ge(oe, "gesturestart", xt), ge(oe, "gestureend", St), ge(a, Te + "enter", br), ge(a, Te + "leave", Ft), ge(a, Te + "move", ar), u.isEnabled = u.isPressed = u.isDragging = !1, Nt && Nt(u));
        }, u.kill = u.revert = function() {
          u.disable();
          var D = ut.indexOf(u);
          D >= 0 && ut.splice(D, 1), tt === u && (tt = 0);
        }, ut.push(u), pe && jt(a) && (tt = u), u.enable($);
      }, m(s, [{
        key: "velocityX",
        get: function() {
          return this._vx.getVelocity();
        }
      }, {
        key: "velocityY",
        get: function() {
          return this._vy.getVelocity();
        }
      }]), s;
    }();
    le.version = "3.11.5", le.create = function(s) {
      return new le(s);
    }, le.register = Hn, le.getAll = function() {
      return ut.slice();
    }, le.getById = function(s) {
      return ut.filter(function(e) {
        return e.vars.id === s;
      })[0];
    }, Ut() && v.registerPlugin(le);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var _, ur, L, j, vt, ee, Nn, qr, Gr, fr, Vr, $r, Ie, Ur, pn, Xe, Wn, qn, dr, Gn, hn, Vn, rt, $n, Un, jn, Bt, gn, _n, mn, jr = 1, Be = Date.now, vn = Be(), pt = 0, xr = 0, Ci = function s() {
      return xr && requestAnimationFrame(s);
    }, Qn = function() {
      return Ur = 1;
    }, Kn = function() {
      return Ur = 0;
    }, kt = function(e) {
      return e;
    }, Sr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Zn = function() {
      return typeof window < "u";
    }, Jn = function() {
      return _ || Zn() && (_ = window.gsap) && _.registerPlugin && _;
    }, Kt = function(e) {
      return !!~Nn.indexOf(e);
    }, ei = function(e) {
      return dt(e, "getBoundingClientRect") || (Kt(e) ? function() {
        return cn.width = L.innerWidth, cn.height = L.innerHeight, cn;
      } : function() {
        return Rt(e);
      });
    }, Ei = function(e, n, t) {
      var r = t.d, o = t.d2, c = t.a;
      return (c = dt(e, "getBoundingClientRect")) ? function() {
        return c()[r];
      } : function() {
        return (n ? L["inner" + o] : e["client" + o]) || 0;
      };
    }, Pi = function(e, n) {
      return !n || ~X.indexOf(e) ? ei(e) : function() {
        return cn;
      };
    }, Ht = function(e, n) {
      var t = n.s, r = n.d2, o = n.d, c = n.a;
      return Math.max(0, (t = "scroll" + r) && (c = dt(e, t)) ? c() - ei(e)()[o] : Kt(e) ? (vt[t] || ee[t]) - (L["inner" + r] || vt["client" + r] || ee["client" + r]) : e[t] - e["offset" + r]);
    }, Qr = function(e, n) {
      for (var t = 0; t < dr.length; t += 3)
        (!n || ~n.indexOf(dr[t + 1])) && e(dr[t], dr[t + 1], dr[t + 2]);
    }, bt = function(e) {
      return typeof e == "string";
    }, He = function(e) {
      return typeof e == "function";
    }, Tr = function(e) {
      return typeof e == "number";
    }, Kr = function(e) {
      return typeof e == "object";
    }, Mr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, bn = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, pr = Math.abs, ti = "left", ri = "top", wn = "right", yn = "bottom", Zt = "width", Jt = "height", kr = "Right", Cr = "Left", Er = "Top", Pr = "Bottom", re = "padding", ht = "margin", hr = "Width", xn = "Height", Ee = "px", wt = function(e) {
      return L.getComputedStyle(e);
    }, Oi = function(e) {
      var n = wt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ni = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Rt = function(e, n) {
      var t = n && wt(e)[pn] !== "matrix(1, 0, 0, 1, 0, 0)" && _.to(e, {
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
    }, Sn = function(e, n) {
      var t = n.d2;
      return e["offset" + t] || e["client" + t] || 0;
    }, ii = function(e) {
      var n = [], t = e.labels, r = e.duration(), o;
      for (o in t)
        n.push(t[o] / r);
      return n;
    }, Di = function(e) {
      return function(n) {
        return _.utils.snap(ii(e), n);
      };
    }, Tn = function(e) {
      var n = _.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, o) {
        return r - o;
      });
      return t ? function(r, o, c) {
        c === void 0 && (c = 1e-3);
        var a;
        if (!o)
          return n(r);
        if (o > 0) {
          for (r -= c, a = 0; a < t.length; a++)
            if (t[a] >= r)
              return t[a];
          return t[a - 1];
        } else
          for (a = t.length, r += c; a--; )
            if (t[a] <= r)
              return t[a];
        return t[0];
      } : function(r, o, c) {
        c === void 0 && (c = 1e-3);
        var a = n(r);
        return !o || Math.abs(a - r) < c || a - r < 0 == o < 0 ? a : n(o < 0 ? r - e : r + e);
      };
    }, Ri = function(e) {
      return function(n, t) {
        return Tn(ii(e))(n, t.direction);
      };
    }, Zr = function(e, n, t, r) {
      return t.split(",").forEach(function(o) {
        return e(n, o, r);
      });
    }, _e = function(e, n, t, r, o) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!o
      });
    }, me = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Jr = function(e, n, t) {
      t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
    }, oi = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, en = {
      toggleActions: "play",
      anticipatePin: 0
    }, tn = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    }, rn = function(e, n) {
      if (bt(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in tn ? tn[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, nn = function(e, n, t, r, o, c, a, g) {
      var C = o.startColor, H = o.endColor, N = o.fontSize, b = o.indent, f = o.fontWeight, w = j.createElement("div"), $ = Kt(t) || dt(t, "pinType") === "fixed", ne = e.indexOf("scroller") !== -1, q = $ ? ee : t, Ze = e.indexOf("start") !== -1, te = Ze ? C : H, F = "border-color:" + te + ";font-size:" + N + ";color:" + te + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return F += "position:" + ((ne || g) && $ ? "fixed;" : "absolute;"), (ne || g || !$) && (F += (r === de ? wn : yn) + ":" + (c + parseFloat(b)) + "px;"), a && (F += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), w._isStart = Ze, w.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), w.style.cssText = F, w.innerText = n || n === 0 ? e + "-" + n : e, q.children[0] ? q.insertBefore(w, q.children[0]) : q.appendChild(w), w._offset = w["offset" + r.op.d2], on(w, 0, r, Ze), w;
    }, on = function(e, n, t, r) {
      var o = {
        display: "block"
      }, c = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
      e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + c + hr] = 1, o["border" + a + hr] = 0, o[t.p] = n + "px", _.set(e, o);
    }, A = [], Mn = {}, Or, si = function() {
      return Be() - pt > 34 && (Or || (Or = requestAnimationFrame(At)));
    }, gr = function() {
      (!rt || !rt.isPressed || rt.startX > ee.clientWidth) && (x.cache++, rt ? Or || (Or = requestAnimationFrame(At)) : At(), pt || tr("scrollStart"), pt = Be());
    }, kn = function() {
      jn = L.innerWidth, Un = L.innerHeight;
    }, Dr = function() {
      x.cache++, !Ie && !Vn && !j.fullscreenElement && !j.webkitFullscreenElement && (!$n || jn !== L.innerWidth || Math.abs(L.innerHeight - Un) > L.innerHeight * 0.25) && qr.restart(!0);
    }, er = {}, Ai = [], ai = function s() {
      return me(I, "scrollEnd", s) || nr(!0);
    }, tr = function(e) {
      return er[e] && er[e].map(function(n) {
        return n();
      }) || Ai;
    }, nt = [], li = function(e) {
      for (var n = 0; n < nt.length; n += 5)
        (!e || nt[n + 4] && nt[n + 4].query === e) && (nt[n].style.cssText = nt[n + 1], nt[n].getBBox && nt[n].setAttribute("transform", nt[n + 2] || ""), nt[n + 3].uncache = 1);
    }, Cn = function(e, n) {
      var t;
      for (Xe = 0; Xe < A.length; Xe++)
        t = A[Xe], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || tr("revert");
    }, ci = function(e, n) {
      x.cache++, (n || !it) && x.forEach(function(t) {
        return He(t) && t.cacheID++ && (t.rec = 0);
      }), bt(e) && (L.history.scrollRestoration = _n = e);
    }, it, rr = 0, ui, Ii = function() {
      if (ui !== rr) {
        var e = ui = rr;
        requestAnimationFrame(function() {
          return e === rr && nr(!0);
        });
      }
    }, nr = function(e, n) {
      if (pt && !e) {
        _e(I, "scrollEnd", ai);
        return;
      }
      it = I.isRefreshing = !0, x.forEach(function(r) {
        return He(r) && r.cacheID++ && (r.rec = r());
      });
      var t = tr("refreshInit");
      Gn && I.sort(), n || Cn(), x.forEach(function(r) {
        He(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
      }), A.slice(0).forEach(function(r) {
        return r.refresh();
      }), A.forEach(function(r, o) {
        if (r._subPinOffset && r.pin) {
          var c = r.vars.horizontal ? "offsetWidth" : "offsetHeight", a = r.pin[c];
          r.revert(!0, 1), r.adjustPinSpacing(r.pin[c] - a), r.refresh();
        }
      }), A.forEach(function(r) {
        return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, Ht(r.scroller, r._dir)));
      }), t.forEach(function(r) {
        return r && r.render && r.render(-1);
      }), x.forEach(function(r) {
        He(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), ci(_n, 1), qr.pause(), rr++, it = 2, At(2), A.forEach(function(r) {
        return He(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), it = I.isRefreshing = !1, tr("refresh");
    }, En = 0, sn = 1, Rr, At = function(e) {
      if (!it || e === 2) {
        I.isUpdating = !0, Rr && Rr.update(0);
        var n = A.length, t = Be(), r = t - vn >= 50, o = n && A[0].scroll();
        if (sn = En > o ? -1 : 1, it || (En = o), r && (pt && !Ur && t - pt > 200 && (pt = 0, tr("scrollEnd")), Vr = vn, vn = t), sn < 0) {
          for (Xe = n; Xe-- > 0; )
            A[Xe] && A[Xe].update(0, r);
          sn = 1;
        } else
          for (Xe = 0; Xe < n; Xe++)
            A[Xe] && A[Xe].update(0, r);
        I.isUpdating = !1;
      }
      Or = 0;
    }, Pn = [ti, ri, yn, wn, ht + Pr, ht + kr, ht + Er, ht + Cr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], an = Pn.concat([Zt, Jt, "boxSizing", "max" + hr, "max" + xn, "position", ht, re, re + Er, re + kr, re + Pr, re + Cr]), zi = function(e, n, t) {
      _r(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        _r(r.spacerState);
      else if (e._gsap.swappedIn) {
        var o = n.parentNode;
        o && (o.insertBefore(e, n), o.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, On = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var o = Pn.length, c = n.style, a = e.style, g; o--; )
          g = Pn[o], c[g] = t[g];
        c.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (c.display = "inline-block"), a[yn] = a[wn] = "auto", c.flexBasis = t.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Zt] = Sn(e, Ye) + Ee, c[Jt] = Sn(e, de) + Ee, c[re] = a[ht] = a[ri] = a[ti] = "0", _r(r), a[Zt] = a["max" + hr] = t[Zt], a[Jt] = a["max" + xn] = t[Jt], a[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Li = /([A-Z])/g, _r = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, o, c;
        for ((e.t._gsap || _.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          c = e[r + 1], o = e[r], c ? n[o] = c : n[o] && n.removeProperty(o.replace(Li, "-$1").toLowerCase());
      }
    }, ln = function(e) {
      for (var n = an.length, t = e.style, r = [], o = 0; o < n; o++)
        r.push(an[o], t[an[o]]);
      return r.t = e, r;
    }, Fi = function(e, n, t) {
      for (var r = [], o = e.length, c = t ? 8 : 0, a; c < o; c += 2)
        a = e[c], r.push(a, a in n ? n[a] : e[c + 1]);
      return r.t = e.t, r;
    }, cn = {
      left: 0,
      top: 0
    }, fi = function(e, n, t, r, o, c, a, g, C, H, N, b, f) {
      He(e) && (e = e(g)), bt(e) && e.substr(0, 3) === "max" && (e = b + (e.charAt(4) === "=" ? rn("0" + e.substr(3), t) : 0));
      var w = f ? f.time() : 0, $, ne, q;
      if (f && f.seek(0), Tr(e))
        f && (e = _.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, b, e)), a && on(a, t, r, !0);
      else {
        He(n) && (n = n(g));
        var Ze = (e || "0").split(" "), te, F, ze, ie;
        q = Ke(n) || ee, te = Rt(q) || {}, (!te || !te.left && !te.top) && wt(q).display === "none" && (ie = q.style.display, q.style.display = "block", te = Rt(q), ie ? q.style.display = ie : q.style.removeProperty("display")), F = rn(Ze[0], te[r.d]), ze = rn(Ze[1] || "0", t), e = te[r.p] - C[r.p] - H + F + o - ze, a && on(a, ze, r, t - ze < 20 || a._isStart && ze > 20), t -= t - ze;
      }
      if (c) {
        var P = e + t, Je = c._isStart;
        $ = "scroll" + r.d2, on(c, P, r, Je && P > 20 || !Je && (N ? Math.max(ee[$], vt[$]) : c.parentNode[$]) <= P + 1), N && (C = Rt(a), N && (c.style[r.op.p] = C[r.op.p] - r.op.m - c._offset + Ee));
      }
      return f && q && ($ = Rt(q), f.seek(b), ne = Rt(q), f._caScrollDist = $[r.p] - ne[r.p], e = e / f._caScrollDist * b), f && f.seek(w), f ? e : Math.round(e);
    }, Yi = /(webkit|moz|length|cssText|inset)/i, di = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var o = e.style, c, a;
        if (n === ee) {
          e._stOrig = o.cssText, a = wt(e);
          for (c in a)
            !+c && !Yi.test(c) && a[c] && typeof o[c] == "string" && c !== "0" && (o[c] = a[c]);
          o.top = t, o.left = r;
        } else
          o.cssText = e._stOrig;
        _.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, pi = function(e, n, t) {
      var r = n, o = r;
      return function(c) {
        var a = Math.round(e());
        return a !== r && a !== o && Math.abs(a - r) > 3 && Math.abs(a - o) > 3 && (c = a, t && t()), o = r, r = c, c;
      };
    }, hi = function(e, n) {
      var t = Xt(e, n), r = "_scroll" + n.p2, o = function c(a, g, C, H, N) {
        var b = c.tween, f = g.onComplete, w = {};
        C = C || t();
        var $ = pi(t, C, function() {
          b.kill(), c.tween = 0;
        });
        return N = H && N || 0, H = H || a - C, b && b.kill(), g[r] = a, g.modifiers = w, w[r] = function() {
          return $(C + H * b.ratio + N * b.ratio * b.ratio);
        }, g.onUpdate = function() {
          x.cache++, At();
        }, g.onComplete = function() {
          c.tween = 0, f && f.call(b);
        }, b = c.tween = _.to(e, g), b;
      };
      return e[r] = t, t.wheelHandler = function() {
        return o.tween && o.tween.kill() && (o.tween = 0);
      }, _e(e, "wheel", t.wheelHandler), I.isTouch && _e(e, "touchmove", t.wheelHandler), o;
    }, I = function() {
      function s(n, t) {
        ur || s.register(_) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = s.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !xr) {
          this.update = this.refresh = this.kill = kt;
          return;
        }
        t = ni(bt(t) || Tr(t) || t.nodeType ? {
          trigger: t
        } : t, en);
        var o = t, c = o.onUpdate, a = o.toggleClass, g = o.id, C = o.onToggle, H = o.onRefresh, N = o.scrub, b = o.trigger, f = o.pin, w = o.pinSpacing, $ = o.invalidateOnRefresh, ne = o.anticipatePin, q = o.onScrubComplete, Ze = o.onSnapComplete, te = o.once, F = o.snap, ze = o.pinReparent, ie = o.pinSpacer, P = o.containerAnimation, Je = o.fastScrollEnd, yt = o.preventOverlaps, O = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ye : de, Pe = !N && N !== 0, E = Ke(t.scroller || L), It = _.core.getCache(E), Oe = Kt(E), Ne = ("pinType" in t ? t.pinType : dt(E, "pinType") || Oe && "fixed") === "fixed", We = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = Pe && t.toggleActions.split(" "), pe = "markers" in t ? t.markers : en.markers, ce = Oe ? 0 : parseFloat(wt(E)["border" + O.p2 + hr]) || 0, l = this, he = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, ir = Ei(E, Oe, O), Nt = Pi(E, Oe), gt = 0, Wt = 0, U = Xt(E, O), Le, qe, Ar, ot, _t, Y, ve, st, Ct, Ge, u, zt, Q, qt, Gt, mr, Ve, Ir, Vt, oe, at, $e, zr, Ue, Et, Lr, $t, vr, or, sr, z, Lt, xt, St, mt, Tt, ar, br, Ft;
        if (gn(l), l._dir = O, ne *= 45, l.scroller = E, l.scroll = P ? P.time.bind(P) : U, ot = U(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Rr = l)), It.tweenScroll = It.tweenScroll || {
          top: hi(E, de),
          left: hi(E, Ye)
        }, l.tweenTo = Le = It.tweenScroll[O.p], l.scrubDuration = function(d) {
          Lt = Tr(d) && d, Lt ? z ? z.duration(d) : z = _.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: Lt,
            paused: !0,
            onComplete: function() {
              return q && q(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(N), z && z.resetTo && z.resetTo("totalProgress", 0), or = 0, g || (g = r.vars.id)), A.push(l), F && ((!Kr(F) || F.push) && (F = {
          snapTo: F
        }), "scrollBehavior" in ee.style && _.set(Oe ? [ee, vt] : E, {
          scrollBehavior: "auto"
        }), x.forEach(function(d) {
          return He(d) && d.target === (Oe ? j.scrollingElement || vt : E) && (d.smooth = !1);
        }), Ar = He(F.snapTo) ? F.snapTo : F.snapTo === "labels" ? Di(r) : F.snapTo === "labelsDirectional" ? Ri(r) : F.directional !== !1 ? function(d, y) {
          return Tn(F.snapTo)(d, Be() - Wt < 500 ? 0 : y.direction);
        } : _.utils.snap(F.snapTo), xt = F.duration || {
          min: 0.1,
          max: 2
        }, xt = Kr(xt) ? fr(xt.min, xt.max) : fr(xt, xt), St = _.delayedCall(F.delay || Lt / 2 || 0.1, function() {
          var d = U(), y = Be() - Wt < 500, T = Le.tween;
          if ((y || Math.abs(l.getVelocity()) < 10) && !T && !Ur && gt !== d) {
            var R = (d - Y) / Q, be = r && !Pe ? r.totalProgress() : R, W = y ? 0 : (be - sr) / (Be() - Vr) * 1e3 || 0, Z = _.utils.clamp(-R, 1 - R, pr(W / 2) * W / 0.185), De = R + (F.inertia === !1 ? 0 : Z), we = fr(0, 1, Ar(De, l)), ue = Math.round(Y + we * Q), J = F, lt = J.onStart, je = J.onInterrupt, ye = J.onComplete;
            if (d <= ve && d >= Y && ue !== d) {
              if (T && !T._initted && T.data <= pr(ue - d))
                return;
              F.inertia === !1 && (Z = we - R), Le(ue, {
                duration: xt(pr(Math.max(pr(De - be), pr(we - be)) * 0.185 / W / 0.05 || 0)),
                ease: F.ease || "power3",
                data: pr(ue - d),
                onInterrupt: function() {
                  return St.restart(!0) && je && je(l);
                },
                onComplete: function() {
                  l.update(), gt = U(), or = sr = r && !Pe ? r.totalProgress() : l.progress, Ze && Ze(l), ye && ye(l);
                }
              }, d, Z * Q, ue - d - Z * Q), lt && lt(l, Le.tween);
            }
          } else
            l.isActive && gt !== d && St.restart(!0);
        }).pause()), g && (Mn[g] = l), b = l.trigger = Ke(b || f), Ft = b && b._gsap && b._gsap.stRevert, Ft && (Ft = Ft(l)), f = f === !0 ? b : Ke(f), bt(a) && (a = {
          targets: b,
          className: a
        }), f && (w === !1 || w === ht || (w = !w && f.parentNode && f.parentNode.style && wt(f.parentNode).display === "flex" ? !1 : re), l.pin = f, qe = _.core.getCache(f), qe.spacer ? qt = qe.pinState : (ie && (ie = Ke(ie), ie && !ie.nodeType && (ie = ie.current || ie.nativeElement), qe.spacerIsNative = !!ie, ie && (qe.spacerState = ln(ie))), qe.spacer = Ve = ie || j.createElement("div"), Ve.classList.add("pin-spacer"), g && Ve.classList.add("pin-spacer-" + g), qe.pinState = qt = ln(f)), t.force3D !== !1 && _.set(f, {
          force3D: !0
        }), l.spacer = Ve = qe.spacer, vr = wt(f), zr = vr[w + O.os2], Vt = _.getProperty(f), oe = _.quickSetter(f, O.a, Ee), On(f, Ve, vr), mr = ln(f)), pe) {
          zt = Kr(pe) ? ni(pe, oi) : oi, Ge = nn("scroller-start", g, E, O, zt, 0), u = nn("scroller-end", g, E, O, zt, 0, Ge), Ir = Ge["offset" + O.op.d2];
          var Fr = Ke(dt(E, "content") || E);
          st = this.markerStart = nn("start", g, Fr, O, zt, Ir, 0, P), Ct = this.markerEnd = nn("end", g, Fr, O, zt, Ir, 0, P), P && (br = _.quickSetter([st, Ct], O.a, Ee)), !Ne && !(X.length && dt(E, "fixedMarkers") === !0) && (Oi(Oe ? ee : E), _.set([Ge, u], {
            force3D: !0
          }), Et = _.quickSetter(Ge, O.a, Ee), $t = _.quickSetter(u, O.a, Ee));
        }
        if (P) {
          var D = P.vars.onUpdate, S = P.vars.onUpdateParams;
          P.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), D && D.apply(P, S || []);
          });
        }
        l.previous = function() {
          return A[A.indexOf(l) - 1];
        }, l.next = function() {
          return A[A.indexOf(l) + 1];
        }, l.revert = function(d, y) {
          if (!y)
            return l.kill(!0);
          var T = d !== !1 || !l.enabled, R = Ie;
          T !== l.isReverted && (T && (Tt = Math.max(U(), l.scroll.rec || 0), mt = l.progress, ar = r && r.progress()), st && [st, Ct, Ge, u].forEach(function(be) {
            return be.style.display = T ? "none" : "block";
          }), T && (Ie = l, l.update(T)), f && (!ze || !l.isActive) && (T ? zi(f, Ve, qt) : On(f, Ve, wt(f), Ue)), T || l.update(T), Ie = R, l.isReverted = T);
        }, l.refresh = function(d, y) {
          if (!((Ie || !l.enabled) && !y)) {
            if (f && d && pt) {
              _e(s, "scrollEnd", ai);
              return;
            }
            !it && he && he(l), Ie = l, Wt = Be(), Le.tween && (Le.tween.kill(), Le.tween = 0), z && z.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var T = ir(), R = Nt(), be = P ? P.duration() : Ht(E, O), W = Q <= 0.01, Z = 0, De = 0, we = t.end, ue = t.endTrigger || b, J = t.start || (t.start === 0 || !b ? 0 : f ? "0 0" : "0 100%"), lt = l.pinnedContainer = t.pinnedContainer && Ke(t.pinnedContainer), je = b && Math.max(0, A.indexOf(l)) || 0, ye = je, se, Fe, wr, lr, fe, xe, Pt, Rn, bi, Yr, Ot; ye--; )
              xe = A[ye], xe.end || xe.refresh(0, 1) || (Ie = l), Pt = xe.pin, Pt && (Pt === b || Pt === f || Pt === lt) && !xe.isReverted && (Yr || (Yr = []), Yr.unshift(xe), xe.revert(!0, !0)), xe !== A[ye] && (je--, ye--);
            for (He(J) && (J = J(l)), Y = fi(J, b, T, O, U(), st, Ge, l, R, ce, Ne, be, P) || (f ? -1e-3 : 0), He(we) && (we = we(l)), bt(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (bt(J) ? J.split(" ")[0] : "") + we : (Z = rn(we.substr(2), T), we = bt(J) ? J : (P ? _.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, Y) : Y) + Z, ue = b)), ve = Math.max(Y, fi(we || (ue ? "100% 0" : be), ue, T, O, U() + Z, Ct, u, l, R, ce, Ne, be, P)) || -1e-3, Q = ve - Y || (Y -= 0.01) && 1e-3, Z = 0, ye = je; ye--; )
              xe = A[ye], Pt = xe.pin, Pt && xe.start - xe._pinPush <= Y && !P && xe.end > 0 && (se = xe.end - xe.start, (Pt === b && xe.start - xe._pinPush < Y || Pt === lt) && !Tr(J) && (Z += se * (1 - xe.progress)), Pt === f && (De += se));
            if (Y += Z, ve += Z, W && (mt = _.utils.clamp(0, 1, _.utils.normalize(Y, ve, Tt))), l._pinPush = De, st && Z && (se = {}, se[O.a] = "+=" + Z, lt && (se[O.p] = "-=" + U()), _.set([st, Ct], se)), f)
              se = wt(f), lr = O === de, wr = U(), at = parseFloat(Vt(O.a)) + De, !be && ve > 1 && (Ot = (Oe ? j.scrollingElement || vt : E).style, Ot = {
                style: Ot,
                value: Ot["overflow" + O.a.toUpperCase()]
              }, Ot.style["overflow" + O.a.toUpperCase()] = "scroll"), On(f, Ve, se), mr = ln(f), Fe = Rt(f, !0), Rn = Ne && Xt(E, lr ? Ye : de)(), w && (Ue = [w + O.os2, Q + De + Ee], Ue.t = Ve, ye = w === re ? Sn(f, O) + Q + De : 0, ye && Ue.push(O.d, ye + Ee), _r(Ue), lt && A.forEach(function(Xr) {
                Xr.pin === lt && Xr.vars.pinSpacing !== !1 && (Xr._subPinOffset = !0);
              }), Ne && U(Tt)), Ne && (fe = {
                top: Fe.top + (lr ? wr - Y : Rn) + Ee,
                left: Fe.left + (lr ? Rn : wr - Y) + Ee,
                boxSizing: "border-box",
                position: "fixed"
              }, fe[Zt] = fe["max" + hr] = Math.ceil(Fe.width) + Ee, fe[Jt] = fe["max" + xn] = Math.ceil(Fe.height) + Ee, fe[ht] = fe[ht + Er] = fe[ht + kr] = fe[ht + Pr] = fe[ht + Cr] = "0", fe[re] = se[re], fe[re + Er] = se[re + Er], fe[re + kr] = se[re + kr], fe[re + Pr] = se[re + Pr], fe[re + Cr] = se[re + Cr], Gt = Fi(qt, fe, ze), it && U(0)), r ? (bi = r._initted, hn(1), r.render(r.duration(), !0, !0), $e = Vt(O.a) - at + Q + De, Lr = Math.abs(Q - $e) > 1, Ne && Lr && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), hn(0)) : $e = Q, Ot && (Ot.value ? Ot.style["overflow" + O.a.toUpperCase()] = Ot.value : Ot.style.removeProperty("overflow-" + O.a));
            else if (b && U() && !P)
              for (Fe = b.parentNode; Fe && Fe !== ee; )
                Fe._pinOffset && (Y -= Fe._pinOffset, ve -= Fe._pinOffset), Fe = Fe.parentNode;
            Yr && Yr.forEach(function(Xr) {
              return Xr.revert(!1, !0);
            }), l.start = Y, l.end = ve, ot = _t = it ? Tt : U(), !P && !it && (ot < Tt && U(Tt), l.scroll.rec = 0), l.revert(!1, !0), St && (gt = -1, l.isActive && U(Y + Q * mt), St.restart(!0)), Ie = 0, r && Pe && (r._initted || ar) && r.progress() !== ar && r.progress(ar, !0).render(r.time(), !0, !0), (W || mt !== l.progress || P) && (r && !Pe && r.totalProgress(P && Y < -1e-3 && !mt ? _.utils.normalize(Y, ve, 0) : mt, !0), l.progress = (ot - Y) / Q === mt ? 0 : mt), f && w && (Ve._pinOffset = Math.round(l.progress * $e)), z && z.invalidate(), H && !it && H(l);
          }
        }, l.getVelocity = function() {
          return (U() - _t) / (Be() - Vr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Mr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? Pe || Mr(r, l.direction < 0, 1) : Mr(r, r.reversed()));
        }, l.labelToScroll = function(d) {
          return r && r.labels && (Y || l.refresh() || Y) + r.labels[d] / r.duration() * Q || 0;
        }, l.getTrailing = function(d) {
          var y = A.indexOf(l), T = l.direction > 0 ? A.slice(0, y).reverse() : A.slice(y + 1);
          return (bt(d) ? T.filter(function(R) {
            return R.vars.preventOverlaps === d;
          }) : T).filter(function(R) {
            return l.direction > 0 ? R.end <= Y : R.start >= ve;
          });
        }, l.update = function(d, y, T) {
          if (!(P && !T && !d)) {
            var R = it === !0 ? Tt : l.scroll(), be = d ? 0 : (R - Y) / Q, W = be < 0 ? 0 : be > 1 ? 1 : be || 0, Z = l.progress, De, we, ue, J, lt, je, ye, se;
            if (y && (_t = ot, ot = P ? U() : R, F && (sr = or, or = r && !Pe ? r.totalProgress() : W)), ne && !W && f && !Ie && !jr && pt && Y < R + (R - _t) / (Be() - Vr) * ne && (W = 1e-4), W !== Z && l.enabled) {
              if (De = l.isActive = !!W && W < 1, we = !!Z && Z < 1, je = De !== we, lt = je || !!W != !!Z, l.direction = W > Z ? 1 : -1, l.progress = W, lt && !Ie && (ue = W && !Z ? 0 : W === 1 ? 1 : Z === 1 ? 2 : 3, Pe && (J = !je && G[ue + 1] !== "none" && G[ue + 1] || G[ue], se = r && (J === "complete" || J === "reset" || J in r))), yt && (je || se) && (se || N || !r) && (He(yt) ? yt(l) : l.getTrailing(yt).forEach(function(fe) {
                return fe.endAnimation();
              })), Pe || (z && !Ie && !jr ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", W, r._tTime / r._tDur) : (z.vars.totalProgress = W, z.invalidate().restart())) : r && r.totalProgress(W, !!Ie)), f) {
                if (d && w && (Ve.style[w + O.os2] = zr), !Ne)
                  oe(Sr(at + $e * W));
                else if (lt) {
                  if (ye = !d && W > Z && ve + 1 > R && R + 1 >= Ht(E, O), ze)
                    if (!d && (De || ye)) {
                      var Fe = Rt(f, !0), wr = R - Y;
                      di(f, ee, Fe.top + (O === de ? wr : 0) + Ee, Fe.left + (O === de ? 0 : wr) + Ee);
                    } else
                      di(f, Ve);
                  _r(De || ye ? Gt : mr), Lr && W < 1 && De || oe(at + (W === 1 && !ye ? $e : 0));
                }
              }
              F && !Le.tween && !Ie && !jr && St.restart(!0), a && (je || te && W && (W < 1 || !mn)) && Gr(a.targets).forEach(function(fe) {
                return fe.classList[De || te ? "add" : "remove"](a.className);
              }), c && !Pe && !d && c(l), lt && !Ie ? (Pe && (se && (J === "complete" ? r.pause().totalProgress(1) : J === "reset" ? r.restart(!0).pause() : J === "restart" ? r.restart(!0) : r[J]()), c && c(l)), (je || !mn) && (C && je && bn(l, C), We[ue] && bn(l, We[ue]), te && (W === 1 ? l.kill(!1, 1) : We[ue] = 0), je || (ue = W === 1 ? 1 : 3, We[ue] && bn(l, We[ue]))), Je && !De && Math.abs(l.getVelocity()) > (Tr(Je) ? Je : 2500) && (Mr(l.callbackAnimation), z ? z.progress(1) : Mr(r, J === "reverse" ? 1 : !W, 1))) : Pe && c && !Ie && c(l);
            }
            if ($t) {
              var lr = P ? R / P.duration() * (P._caScrollDist || 0) : R;
              Et(lr + (Ge._isFlipped ? 1 : 0)), $t(lr);
            }
            br && br(-R / P.duration() * (P._caScrollDist || 0));
          }
        }, l.enable = function(d, y) {
          l.enabled || (l.enabled = !0, _e(E, "resize", Dr), _e(Oe ? j : E, "scroll", gr), he && _e(s, "refreshInit", he), d !== !1 && (l.progress = mt = 0, ot = _t = gt = U()), y !== !1 && l.refresh());
        }, l.getTween = function(d) {
          return d && Le ? Le.tween : z;
        }, l.setPositions = function(d, y) {
          f && (at += d - Y, $e += y - d - Q, w === re && l.adjustPinSpacing(y - d - Q)), l.start = Y = d, l.end = ve = y, Q = y - d, l.update();
        }, l.adjustPinSpacing = function(d) {
          if (Ue && d) {
            var y = Ue.indexOf(O.d) + 1;
            Ue[y] = parseFloat(Ue[y]) + d + Ee, Ue[1] = parseFloat(Ue[1]) + d + Ee, _r(Ue);
          }
        }, l.disable = function(d, y) {
          if (l.enabled && (d !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, y || z && z.pause(), Tt = 0, qe && (qe.uncache = 1), he && me(s, "refreshInit", he), St && (St.pause(), Le.tween && Le.tween.kill() && (Le.tween = 0)), !Oe)) {
            for (var T = A.length; T--; )
              if (A[T].scroller === E && A[T] !== l)
                return;
            me(E, "resize", Dr), me(E, "scroll", gr);
          }
        }, l.kill = function(d, y) {
          l.disable(d, y), z && !y && z.kill(), g && delete Mn[g];
          var T = A.indexOf(l);
          T >= 0 && A.splice(T, 1), T === Xe && sn > 0 && Xe--, T = 0, A.forEach(function(R) {
            return R.scroller === l.scroller && (T = 1);
          }), T || it || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
            kill: !1
          }), y || r.kill()), st && [st, Ct, Ge, u].forEach(function(R) {
            return R.parentNode && R.parentNode.removeChild(R);
          }), Rr === l && (Rr = 0), f && (qe && (qe.uncache = 1), T = 0, A.forEach(function(R) {
            return R.pin === f && T++;
          }), T || (qe.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Ft && Ft(l), !r || !r.add || Q ? l.refresh() : _.delayedCall(0.01, function() {
          return Y || ve || l.refresh();
        }) && (Q = 0.01) && (Y = ve = 0), f && Ii();
      }, s.register = function(t) {
        return ur || (_ = t || Jn(), Zn() && window.document && s.enable(), ur = xr), ur;
      }, s.defaults = function(t) {
        if (t)
          for (var r in t)
            en[r] = t[r];
        return en;
      }, s.disable = function(t, r) {
        xr = 0, A.forEach(function(c) {
          return c[r ? "kill" : "disable"](t);
        }), me(L, "wheel", gr), me(j, "scroll", gr), clearInterval($r), me(j, "touchcancel", kt), me(ee, "touchstart", kt), Zr(me, j, "pointerdown,touchstart,mousedown", Qn), Zr(me, j, "pointerup,touchend,mouseup", Kn), qr.kill(), Qr(me);
        for (var o = 0; o < x.length; o += 3)
          Jr(me, x[o], x[o + 1]), Jr(me, x[o], x[o + 2]);
      }, s.enable = function() {
        if (L = window, j = document, vt = j.documentElement, ee = j.body, _ && (Gr = _.utils.toArray, fr = _.utils.clamp, gn = _.core.context || kt, hn = _.core.suppressOverwrites || kt, _n = L.history.scrollRestoration || "auto", En = L.pageYOffset, _.core.globals("ScrollTrigger", s), ee)) {
          xr = 1, Ci(), le.register(_), s.isTouch = le.isTouch, Bt = le.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(L, "wheel", gr), Nn = [L, j, vt, ee], _.matchMedia ? (s.matchMedia = function(g) {
            var C = _.matchMedia(), H;
            for (H in g)
              C.add(H, g[H]);
            return C;
          }, _.addEventListener("matchMediaInit", function() {
            return Cn();
          }), _.addEventListener("matchMediaRevert", function() {
            return li();
          }), _.addEventListener("matchMedia", function() {
            nr(0, 1), tr("matchMedia");
          }), _.matchMedia("(orientation: portrait)", function() {
            return kn(), kn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), kn(), _e(j, "scroll", gr);
          var t = ee.style, r = t.borderTopStyle, o = _.core.Animation.prototype, c, a;
          for (o.revert || Object.defineProperty(o, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", c = Rt(ee), de.m = Math.round(c.top + de.sc()) || 0, Ye.m = Math.round(c.left + Ye.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), $r = setInterval(si, 250), _.delayedCall(0.5, function() {
            return jr = 0;
          }), _e(j, "touchcancel", kt), _e(ee, "touchstart", kt), Zr(_e, j, "pointerdown,touchstart,mousedown", Qn), Zr(_e, j, "pointerup,touchend,mouseup", Kn), pn = _.utils.checkPrefix("transform"), an.push(pn), ur = Be(), qr = _.delayedCall(0.2, nr).pause(), dr = [j, "visibilitychange", function() {
            var g = L.innerWidth, C = L.innerHeight;
            j.hidden ? (Wn = g, qn = C) : (Wn !== g || qn !== C) && Dr();
          }, j, "DOMContentLoaded", nr, L, "load", nr, L, "resize", Dr], Qr(_e), A.forEach(function(g) {
            return g.enable(0, 1);
          }), a = 0; a < x.length; a += 3)
            Jr(me, x[a], x[a + 1]), Jr(me, x[a], x[a + 2]);
        }
      }, s.config = function(t) {
        "limitCallbacks" in t && (mn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval($r) || ($r = r) && setInterval(si, r), "ignoreMobileResize" in t && ($n = s.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Qr(me) || Qr(_e, t.autoRefreshEvents || "none"), Vn = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, s.scrollerProxy = function(t, r) {
        var o = Ke(t), c = x.indexOf(o), a = Kt(o);
        ~c && x.splice(c, a ? 6 : 2), r && (a ? X.unshift(L, r, ee, r, vt, r) : X.unshift(o, r));
      }, s.clearMatchMedia = function(t) {
        A.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, s.isInViewport = function(t, r, o) {
        var c = (bt(t) ? Ke(t) : t).getBoundingClientRect(), a = c[o ? Zt : Jt] * r || 0;
        return o ? c.right - a > 0 && c.left + a < L.innerWidth : c.bottom - a > 0 && c.top + a < L.innerHeight;
      }, s.positionInViewport = function(t, r, o) {
        bt(t) && (t = Ke(t));
        var c = t.getBoundingClientRect(), a = c[o ? Zt : Jt], g = r == null ? a / 2 : r in tn ? tn[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
        return o ? (c.left + g) / L.innerWidth : (c.top + g) / L.innerHeight;
      }, s.killAll = function(t) {
        if (A.slice(0).forEach(function(o) {
          return o.vars.id !== "ScrollSmoother" && o.kill();
        }), t !== !0) {
          var r = er.killAll || [];
          er = {}, r.forEach(function(o) {
            return o();
          });
        }
      }, s;
    }();
    I.version = "3.11.5", I.saveStyles = function(s) {
      return s ? Gr(s).forEach(function(e) {
        if (e && e.style) {
          var n = nt.indexOf(e);
          n >= 0 && nt.splice(n, 5), nt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), _.core.getCache(e), gn());
        }
      }) : nt;
    }, I.revert = function(s, e) {
      return Cn(!s, e);
    }, I.create = function(s, e) {
      return new I(s, e);
    }, I.refresh = function(s) {
      return s ? Dr() : (ur || I.register()) && nr(!0);
    }, I.update = function(s) {
      return ++x.cache && At(s === !0 ? 2 : 0);
    }, I.clearScrollMemory = ci, I.maxScroll = function(s, e) {
      return Ht(s, e ? Ye : de);
    }, I.getScrollFunc = function(s, e) {
      return Xt(Ke(s), e ? Ye : de);
    }, I.getById = function(s) {
      return Mn[s];
    }, I.getAll = function() {
      return A.filter(function(s) {
        return s.vars.id !== "ScrollSmoother";
      });
    }, I.isScrolling = function() {
      return !!pt;
    }, I.snapDirectional = Tn, I.addEventListener = function(s, e) {
      var n = er[s] || (er[s] = []);
      ~n.indexOf(e) || n.push(e);
    }, I.removeEventListener = function(s, e) {
      var n = er[s], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, I.batch = function(s, e) {
      var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, c = function(C, H) {
        var N = [], b = [], f = _.delayedCall(r, function() {
          H(N, b), N = [], b = [];
        }).pause();
        return function(w) {
          N.length || f.restart(!0), N.push(w.trigger), b.push(w), o <= N.length && f.progress(1);
        };
      }, a;
      for (a in e)
        t[a] = a.substr(0, 2) === "on" && He(e[a]) && a !== "onRefreshInit" ? c(a, e[a]) : e[a];
      return He(o) && (o = o(), _e(I, "refresh", function() {
        return o = e.batchMax();
      })), Gr(s).forEach(function(g) {
        var C = {};
        for (a in t)
          C[a] = t[a];
        C.trigger = g, n.push(I.create(C));
      }), n;
    };
    var gi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Dn = function s(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (le.isTouch ? " pinch-zoom" : "") : "none", e === vt && s(ee, n);
    }, un = {
      auto: 1,
      scroll: 1
    }, Xi = function(e) {
      var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, c = o._gsap || _.core.getCache(o), a = Be(), g;
      if (!c._isScrollT || a - c._isScrollT > 2e3) {
        for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(un[(g = wt(o)).overflowY] || un[g.overflowX])); )
          o = o.parentNode;
        c._isScroll = o && o !== t && !Kt(o) && (un[(g = wt(o)).overflowY] || un[g.overflowX]), c._isScrollT = a;
      }
      (c._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, _i = function(e, n, t, r) {
      return le.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && Xi,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return t && _e(j, le.eventTypes[0], vi, !1, !0);
        },
        onDisable: function() {
          return me(j, le.eventTypes[0], vi, !0);
        }
      });
    }, Bi = /(input|label|select|textarea)/i, mi, vi = function(e) {
      var n = Bi.test(e.target.tagName);
      (n || mi) && (e._gsapAllow = !0, mi = n);
    }, Hi = function(e) {
      Kr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, c = n.onRelease, a, g, C = Ke(e.target) || vt, H = _.core.globals().ScrollSmoother, N = H && H.get(), b = Bt && (e.content && Ke(e.content) || N && e.content !== !1 && !N.smooth() && N.content()), f = Xt(C, de), w = Xt(C, Ye), $ = 1, ne = (le.isTouch && L.visualViewport ? L.visualViewport.scale * L.visualViewport.width : L.outerWidth) / L.innerWidth, q = 0, Ze = He(r) ? function() {
        return r(a);
      } : function() {
        return r || 2.8;
      }, te, F, ze = _i(C, e.type, !0, o), ie = function() {
        return F = !1;
      }, P = kt, Je = kt, yt = function() {
        g = Ht(C, de), Je = fr(Bt ? 1 : 0, g), t && (P = fr(0, Ht(C, Ye))), te = rr;
      }, O = function() {
        b._gsap.y = Sr(parseFloat(b._gsap.y) + f.offset) + "px", b.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(b._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
      }, Pe = function() {
        if (F) {
          requestAnimationFrame(ie);
          var pe = Sr(a.deltaY / 2), ce = Je(f.v - pe);
          if (b && ce !== f.v + f.offset) {
            f.offset = ce - f.v;
            var l = Sr((parseFloat(b && b._gsap.y) || 0) - f.offset);
            b.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", b._gsap.y = l + "px", f.cacheID = x.cache, At();
          }
          return !0;
        }
        f.offset && O(), F = !0;
      }, E, It, Oe, Ne, We = function() {
        yt(), E.isActive() && E.vars.scrollY > g && (f() > g ? E.progress(1) && f(g) : E.resetTo("scrollY", g));
      };
      return b && _.set(b, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Bt && G.type === "touchmove" && Pe() || $ > 1.05 && G.type !== "touchstart" || a.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        F = !1;
        var G = $;
        $ = Sr((L.visualViewport && L.visualViewport.scale || 1) / ne), E.pause(), G !== $ && Dn(C, $ > 1.01 ? !0 : t ? !1 : "x"), It = w(), Oe = f(), yt(), te = rr;
      }, e.onRelease = e.onGestureStart = function(G, pe) {
        if (f.offset && O(), !pe)
          Ne.restart(!0);
        else {
          x.cache++;
          var ce = Ze(), l, he;
          t && (l = w(), he = l + ce * 0.05 * -G.velocityX / 0.227, ce *= gi(w, l, he, Ht(C, Ye)), E.vars.scrollX = P(he)), l = f(), he = l + ce * 0.05 * -G.velocityY / 0.227, ce *= gi(f, l, he, Ht(C, de)), E.vars.scrollY = Je(he), E.invalidate().duration(ce).play(0.01), (Bt && E.vars.scrollY >= g || l >= g - 1) && _.to({}, {
            onUpdate: We,
            duration: ce
          });
        }
        c && c(G);
      }, e.onWheel = function() {
        E._ts && E.pause(), Be() - q > 1e3 && (te = 0, q = Be());
      }, e.onChange = function(G, pe, ce, l, he) {
        if (rr !== te && yt(), pe && t && w(P(l[2] === pe ? It + (G.startX - G.x) : w() + pe - l[1])), ce) {
          f.offset && O();
          var ir = he[2] === ce, Nt = ir ? Oe + G.startY - G.y : f() + ce - he[1], gt = Je(Nt);
          ir && Nt !== gt && (Oe += gt - Nt), f(gt);
        }
        (ce || pe) && At();
      }, e.onEnable = function() {
        Dn(C, t ? !1 : "x"), I.addEventListener("refresh", We), _e(L, "resize", We), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = w.smooth = !1), ze.enable();
      }, e.onDisable = function() {
        Dn(C, !0), me(L, "resize", We), I.removeEventListener("refresh", We), ze.kill();
      }, e.lockAxis = e.lockAxis !== !1, a = new le(e), a.iOS = Bt, Bt && !f() && f(1), Bt && _.ticker.add(kt), Ne = a._dc, E = _.to(a, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: pi(f, f(), function() {
            return E.pause();
          })
        },
        onUpdate: At,
        onComplete: Ne.vars.onComplete
      }), a;
    };
    I.sort = function(s) {
      return A.sort(s || function(e, n) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
      });
    }, I.observe = function(s) {
      return new le(s);
    }, I.normalizeScroll = function(s) {
      if (typeof s > "u")
        return rt;
      if (s === !0 && rt)
        return rt.enable();
      if (s === !1)
        return rt && rt.kill();
      var e = s instanceof le ? s : Hi(s);
      return rt && rt.target === e.target && rt.kill(), Kt(e.target) && (rt = e), e;
    }, I.core = {
      _getVelocityProp: dn,
      _inputObserver: _i,
      _scrollers: x,
      _proxies: X,
      bridge: {
        ss: function() {
          pt || tr("scrollStart"), pt = Be();
        },
        ref: function() {
          return Ie;
        }
      }
    }, Jn() && _.registerPlugin(I), h.ScrollTrigger = I, h.default = I, typeof window > "u" || window !== h ? Object.defineProperty(h, "__esModule", { value: !0 }) : delete window.default;
  });
})(Ln, Ln.exports);
var Ti = Ln.exports;
Re.registerPlugin(Ti.ScrollTrigger);
class Mi extends Nr {
  static create(p, h = {}, M = {}) {
    return new Mi(p, h, M);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(p) {
    this.meta.speed = p;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(p) {
    this.meta.velocity = p;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(p) {
    this.meta.direction = p;
  }
  constructor(p, h = {}, M = {}) {
    super(
      (m) => {
        var Ce, ge;
        Object.assign(m.meta, {
          speed: h.speed ?? 1,
          velocity: h.velocity ?? 0,
          direction: h.direction || "rtl",
          onCreated: h.onCreated,
          onUpdate: h.onUpdate
        }), m.meta.scrollTrigger = Ti.ScrollTrigger.create(h.scrollTrigger ?? {});
        let v = null;
        typeof p == "string" ? v = document.querySelector(p) : p instanceof HTMLElement && (v = p);
        const K = h.createDOMContainers != null ? h.createDOMContainers : !0, k = K ? document.createElement("div") : v == null ? void 0 : v.querySelector(".owow-marquee-outer");
        k == null || k.classList.add("owow-marquee-outer");
        const B = K ? document.createElement("div") : k == null ? void 0 : k.querySelector(".owow-marquee-inner");
        if (B == null || B.classList.add("owow-marquee-inner"), !v || !k || !B)
          throw console.error({
            targetContainer: v,
            outerContainer: k,
            innerContainer: B
          }), new Error("Invalid marquee DOM structure");
        m.meta.sourceDOM = v.cloneNode(!0), m.meta.target = v, B.append(...v.childNodes), k.append(B), v == null || v.append(k), Re.set(B, { display: "inline-flex" });
        const ae = v.getBoundingClientRect(), Se = B.getBoundingClientRect(), et = ae.width + Se.width, Te = document.createDocumentFragment(), Me = [];
        let ct = Se.width;
        if (!et || !ct)
          return;
        for (; ct <= et; ) {
          const Qe = B.cloneNode(!0);
          ct += Se.width, Me.push(Qe);
        }
        Te.append(...Me), k.append(Te);
        const tt = Re.context(() => {
          Re.set(k, {
            x: 0,
            force3D: !0,
            width: ct,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Ae = Re.utils.pipe(
          (Qe) => Math.floor(Qe * 1e3) / 1e3,
          Re.quickSetter(k, "x", "px")
        ), Dt = Re.utils.wrap(0, -Se.width), Ut = Re.utils.normalize(0, -Se.width);
        let Mt, ut, x, X, ke, ft, Yt, dt;
        const jt = Re.ticker.add(() => {
          var Qe, Qt;
          switch (dt = Re.ticker.deltaRatio(), ut = Re.utils.interpolate(
            ut ?? 0,
            m.meta.scrollTrigger.getVelocity(),
            0.5 * dt
          ), x = ut * m.meta.velocity, m.meta.direction) {
            case "ltr":
              Mt = -1, x = -Math.abs(x);
              break;
            case "rtl":
              Mt = 1, x = Math.abs(x);
              break;
            case "scroll":
              Mt = m.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              Mt = -(m.meta.scrollTrigger.direction ?? 1), x = -x;
          }
          X = Re.getProperty(k, "x"), ke = m.meta.speed * -Mt, ft = (ke - x) * dt, Yt = Dt(X + ft), Ae(Yt), (Qt = (Qe = m.meta).onUpdate) == null || Qt.call(Qe, Ut(Yt));
        });
        return (ge = (Ce = m.meta).onCreated) == null || ge.call(Ce), () => {
          var Qe;
          for (tt.kill(!0), Re.ticker.remove(jt), v == null || v.replaceChildren(...m.meta.sourceDOM.childNodes); Me.length; )
            (Qe = Me.pop()) == null || Qe.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...M
      }
    );
  }
}
class ki extends Nr {
  constructor(p, h = {}, M = {}) {
    super(async (m, v) => {
      const K = ki.SplitText;
      if (!K)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      Br.registerPlugin(K);
      const k = Br.utils.toArray(p);
      for (const Te of k)
        if (!(Te instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const B = m.meta.childSplit = new K(p, {
        type: "lines",
        linesClass: "owow-split-child",
        ...cr(h.childSplitVars)
      }), ae = m.meta.parentSplit = new K(p, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...cr(h.parentSplitVars)
      }), Se = {
        y: (Te, Me) => {
          const ct = parseFloat(getComputedStyle(Me).lineHeight);
          return isNaN(ct) ? Br.getProperty(Me, "height") : ct;
        },
        ...cr(h.fromVars)
      }, et = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...cr(h.toVars)
      };
      return v.add(() => {
        m.meta.setup = Br.set(ae.lines, { overflow: "hidden" }), m.meta.tween = Br.fromTo(B.lines, Se, et);
      }), () => {
        B.revert(), v.kill(!0);
      };
    }, M);
  }
}
export {
  V as Ease,
  Mi as Marquee,
  Nr as Motion,
  Si as Pointer,
  go as SecondOrderDynamics,
  ki as TextClipReveal
};
