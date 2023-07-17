import { noop as Wi, fromEvent as In, debounceTime as qi, Observable as wi } from "rxjs";
import De, { gsap as Br } from "gsap";
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
V.inBack = (i, d = Fn) => i * i * ((d + 1) * i - d);
V.outBack = (i, d = Fn) => {
  const h = i / 1 - 1;
  return h * h * ((d + 1) * h + d) + 1;
};
V.inOutBack = (i, d = Fn) => {
  const h = i * 2, T = h - 2, _ = d * 1.525;
  return h < 1 ? 0.5 * h * h * ((_ + 1) * h - _) : 0.5 * (T * T * ((_ + 1) * T + _) + 2);
};
V.inElastic = (i, d = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const T = i / 1 - 1, _ = 1 - d, m = _ / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * T) * Math.sin((T - m) * (2 * Math.PI) / _));
};
V.outElastic = (i, d = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - d, T = i * 2, _ = h / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * T) * Math.sin((T - _) * (2 * Math.PI) / h) + 1;
};
V.inOutElastic = (i, d = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - d, T = i * 2, _ = T - 1, m = h / (2 * Math.PI) * Math.asin(1);
  return T < 1 ? -0.5 * (Math.pow(2, 10 * _) * Math.sin((_ - m) * (2 * Math.PI) / h)) : Math.pow(2, -10 * _) * Math.sin((_ - m) * (2 * Math.PI) / h) * 0.5 + 1;
};
var Hr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gi(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Vi = "Expected a function", yi = 0 / 0, $i = "[object Symbol]", Ui = /^\s+|\s+$/g, ji = /^[-+]0x[0-9a-f]+$/i, Qi = /^0b[01]+$/i, Ki = /^0o[0-7]+$/i, Zi = parseInt, Ji = typeof Hr == "object" && Hr && Hr.Object === Object && Hr, eo = typeof self == "object" && self && self.Object === Object && self, to = Ji || eo || Function("return this")(), ro = Object.prototype, no = ro.toString, io = Math.max, oo = Math.min, An = function() {
  return to.Date.now();
};
function so(i, d, h) {
  var T, _, m, j, E, N, he = 0, Se = !1, et = !1, Te = !0;
  if (typeof i != "function")
    throw new TypeError(Vi);
  d = xi(d) || 0, zn(h) && (Se = !!h.leading, et = "maxWait" in h, m = et ? io(xi(h.maxWait) || 0, d) : m, Te = "trailing" in h ? !!h.trailing : Te);
  function Me(X) {
    var ke = T, ft = _;
    return T = _ = void 0, he = X, j = i.apply(ft, ke), j;
  }
  function ct(X) {
    return he = X, E = setTimeout(Rt, d), Se ? Me(X) : j;
  }
  function tt(X) {
    var ke = X - N, ft = X - he, Yt = d - ke;
    return et ? oo(Yt, m - ft) : Yt;
  }
  function Ae(X) {
    var ke = X - N, ft = X - he;
    return N === void 0 || ke >= d || ke < 0 || et && ft >= m;
  }
  function Rt() {
    var X = An();
    if (Ae(X))
      return Ut(X);
    E = setTimeout(Rt, tt(X));
  }
  function Ut(X) {
    return E = void 0, Te && T ? Me(X) : (T = _ = void 0, j);
  }
  function Mt() {
    E !== void 0 && clearTimeout(E), he = 0, T = N = _ = E = void 0;
  }
  function ut() {
    return E === void 0 ? j : Ut(An());
  }
  function x() {
    var X = An(), ke = Ae(X);
    if (T = arguments, _ = this, N = X, ke) {
      if (E === void 0)
        return ct(N);
      if (et)
        return E = setTimeout(Rt, d), Me(N);
    }
    return E === void 0 && (E = setTimeout(Rt, d)), j;
  }
  return x.cancel = Mt, x.flush = ut, x;
}
function zn(i) {
  var d = typeof i;
  return !!i && (d == "object" || d == "function");
}
function ao(i) {
  return !!i && typeof i == "object";
}
function lo(i) {
  return typeof i == "symbol" || ao(i) && no.call(i) == $i;
}
function xi(i) {
  if (typeof i == "number")
    return i;
  if (lo(i))
    return yi;
  if (zn(i)) {
    var d = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = zn(d) ? d + "" : d;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace(Ui, "");
  var h = Qi.test(i);
  return h || Ki.test(i) ? Zi(i.slice(2), h ? 2 : 8) : ji.test(i) ? yi : +i;
}
var co = so;
const uo = /* @__PURE__ */ Gi(co);
function cr(i, ...d) {
  return i instanceof Function ? i.call(null, d) : i;
}
const Si = class {
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
  constructor(i, d = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = uo(
      () => {
        var h;
        (h = this.cleanup) == null || h.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      Si.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var h, T;
      (h = this.cleanup) == null || h.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const _ of Object.keys(this.meta))
        delete this.meta[_];
      for (; this.subscriptions.length; )
        (T = this.subscriptions.pop()) == null || T.unsubscribe();
    }, this.observeMedia(cr(d.watchMedia)), this.observeResize(cr(d.shouldResetOnResize)), this.create = () => {
      var _;
      return this.context = De.context(Wi), [
        cr(d.enable) ?? !0,
        ((_ = this.mediaQueryList) == null ? void 0 : _.matches) ?? !0
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
    return i * De.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var d;
    const i = (d = this.create) == null ? void 0 : d.call(this, this, this.context);
    i instanceof Promise ? i.then((h) => this.cleanup = h ?? void 0) : this.cleanup = i ?? void 0;
  }
  observeMedia(i) {
    i && (this.mediaQueryList = matchMedia(i), this.subscriptions.push(In(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(i) {
    i && (this.motionResizeObserver = new fo(i), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(qi(100)).subscribe(() => this.reset())
    ));
  }
};
let Nr = Si;
Nr.resetDebounceTime = 100;
Nr.referenceFramerate = 60;
class fo {
  constructor(d) {
    const [h, T] = [d].flat();
    this.target = typeof h == "string" ? document.querySelector(h) : h, this.axis = T, this.target === window ? this.observable = new wi((_) => {
      const m = () => this.handleWindowResize(_);
      return window.addEventListener("resize", m, { passive: !0 }), () => window.removeEventListener("resize", m);
    }) : this.observable = new wi((_) => {
      const m = new ResizeObserver(
        (j) => this.handleElementResize(j, _)
      );
      return this.target && m.observe(this.target), () => m.disconnect();
    });
  }
  handleWindowResize(d) {
    this.emit(d, window.innerWidth, window.innerHeight);
  }
  handleElementResize(d, h) {
    const T = d.find((j) => j.target === this.target);
    if (!T)
      return;
    const { inlineSize: _, blockSize: m } = T.borderBoxSize[0];
    this.emit(h, _, m);
  }
  emit(d, h, T) {
    const _ = h !== this.inlineSize, m = T !== this.blockSize, j = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = h, this.blockSize = T, !j) {
      if (this.axis === "horizontal" && _ || this.axis === "vertical" && m)
        return d.next();
      !this.axis && (_ || m) && d.next();
    }
  }
}
class Ti extends Nr {
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
      (d) => {
        d.meta.observable = In(window, "mousemove"), d.subscriptions.push(
          d.meta.observable.subscribe((h) => {
            this.clientX = h.clientX, this.clientY = h.clientY, this.normalX = De.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = De.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), d.subscriptions.push(
          In(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), d.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new Ti());
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
  constructor(d = 1, h = 1, T = 0, _) {
    this.k1 = h / (Math.PI * d), this.k2 = 1 / (2 * Math.PI * d * (2 * Math.PI * d)), this.k3 = T * h / (2 * Math.PI * d), this.xp = _, this.y = _, this.yd = 0;
  }
  /**
   * Calculate and apply next position
   * @param step Step to calculate next position. For example; delta time.
   * @param x Next value
   * @param xd Optional velocity
   * @returns
   */
  update(d, h, T) {
    T === void 0 && (T = (h - this.xp) / d, this.xp = h);
    const _ = Math.max(this.k2, d * d / 2 + d * this.k1 / 2, d * this.k1);
    return this.y = this.y + d * this.yd, this.yd = this.yd + d * (h + this.k3 * T - this.y - this.k1 * this.yd) / _, this.y;
  }
}
var Ln = { exports: {} };
(function(i, d) {
  (function(h, T) {
    T(d);
  })(Hr, function(h) {
    function T(s, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(s, t.key, t);
      }
    }
    function _(s, e, n) {
      return e && T(s.prototype, e), n && T(s, n), s;
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
    var m, j, E, N, he, Se, et, Te, Me, ct, tt, Ae, Rt, Ut = function() {
      return m || typeof window < "u" && (m = window.gsap) && m.registerPlugin && m;
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
          Mt && (E.history.scrollRestoration = "manual");
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
        return arguments.length ? E.scrollTo(s, fe.sc()) : E.pageXOffset || N[Qe] || he[Qe] || Se[Qe] || 0;
      })
    }, fe = {
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
        return arguments.length ? E.scrollTo(Ye.sc(), s) : E.pageYOffset || N[Qt] || he[Qt] || Se[Qt] || 0;
      })
    }, Ke = function(e) {
      return m.utils.toArray(e)[0] || (typeof e == "string" && m.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      jt(e) && (e = N.scrollingElement || he);
      var o = x.indexOf(e), c = r === fe.sc ? 1 : 2;
      !~o && (o = x.push(e) - 1), x[o + c] || e.addEventListener("scroll", fn);
      var a = x[o + c], g = a || (x[o + c] = Wr(dt(e, t), !0) || (jt(e) ? r : Wr(function(k) {
        return arguments.length ? e[t] = k : e[t];
      })));
      return g.target = e, a || (g.smooth = m.getProperty(e, "scrollBehavior") === "smooth"), g;
    }, dn = function(e, n, t) {
      var r = e, o = e, c = ke(), a = c, g = n || 50, k = Math.max(500, g * 3), B = function(w, $) {
        var ne = ke();
        $ || ne - c > g ? (o = r, r = w, a = c, c = ne) : t ? r += w : r = o + (w - o) / (ne - a) * (c - a);
      }, H = function() {
        o = r = t ? 0 : r, a = c = 0;
      }, b = function(w) {
        var $ = a, ne = o, q = ke();
        return (w || w === 0) && w !== r && B(w), c === a || q - a > k ? 0 : (r + (t ? ne : -ne)) / ((t ? q : c) - $) * 1e3;
      };
      return {
        update: B,
        reset: H,
        getVelocity: b
      };
    }, yr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Xn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Bn = function() {
      Me = m.core.globals().ScrollTrigger, Me && Me.core && Yt();
    }, Hn = function(e) {
      return m = e || Ut(), m && typeof document < "u" && document.body && (E = window, N = document, he = N.documentElement, Se = N.body, ct = [E, N, he, Se], m.utils.clamp, Rt = m.core.context || function() {
      }, Te = "onpointerenter" in Se ? "pointer" : "mouse", et = ae.isTouch = E.matchMedia && E.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in E || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ae = ae.eventTypes = ("ontouchstart" in he ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in he ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return Mt = 0;
      }, 500), Bn(), j = 1), j;
    };
    Ye.op = fe, x.cache = 0;
    var ae = function() {
      function s(n) {
        this.init(n);
      }
      var e = s.prototype;
      return e.init = function(t) {
        j || Hn(m) || console.warn("Please gsap.registerPlugin(Observer)"), Me || Bn();
        var r = t.tolerance, o = t.dragMinimum, c = t.type, a = t.target, g = t.lineHeight, k = t.debounce, B = t.preventDefault, H = t.onStop, b = t.onStopDelay, f = t.ignore, w = t.wheelSpeed, $ = t.event, ne = t.onDragStart, q = t.onDragEnd, Ze = t.onDrag, te = t.onPress, F = t.onRelease, ze = t.onRight, ie = t.onLeft, P = t.onUp, Je = t.onDown, yt = t.onChangeX, O = t.onChangeY, Pe = t.onChange, C = t.onToggleX, It = t.onToggleY, Oe = t.onHover, Ne = t.onHoverEnd, We = t.onMove, G = t.ignoreCheck, de = t.isNormalizer, le = t.onGestureStart, l = t.onGestureEnd, pe = t.onWheel, ir = t.onEnable, Nt = t.onDisable, gt = t.onClick, Wt = t.scrollSpeed, U = t.capture, Le = t.allowClicks, qe = t.lockAxis, Ar = t.onLockAxis;
        this.target = a = Ke(a) || he, this.vars = t, f && (f = m.utils.toArray(f)), r = r || 1e-9, o = o || 0, w = w || 1, Wt = Wt || 1, c = c || "wheel,touch,pointer", k = k !== !1, g || (g = parseFloat(E.getComputedStyle(Se).lineHeight) || 22);
        var ot, _t, Y, me, st, Ct, Ge, u = this, zt = 0, K = 0, qt = Xt(a, Ye), Gt = Xt(a, fe), vr = qt(), Ve = Gt(), Ir = ~c.indexOf("touch") && !~c.indexOf("pointer") && Ae[0] === "pointerdown", Vt = jt(a), oe = a.ownerDocument || N, at = [0, 0, 0], $e = [0, 0, 0], zr = 0, Ue = function() {
          return zr = ke();
        }, Et = function(S, p) {
          return (u.event = S) && f && ~f.indexOf(S.target) || p && Ir && S.pointerType !== "touch" || G && G(S, p);
        }, Lr = function() {
          u._vx.reset(), u._vy.reset(), _t.pause(), H && H(u);
        }, $t = function() {
          var S = u.deltaX = Xn(at), p = u.deltaY = Xn($e), y = Math.abs(S) >= r, M = Math.abs(p) >= r;
          Pe && (y || M) && Pe(u, S, p, at, $e), y && (ze && u.deltaX > 0 && ze(u), ie && u.deltaX < 0 && ie(u), yt && yt(u), C && u.deltaX < 0 != zt < 0 && C(u), zt = u.deltaX, at[0] = at[1] = at[2] = 0), M && (Je && u.deltaY > 0 && Je(u), P && u.deltaY < 0 && P(u), O && O(u), It && u.deltaY < 0 != K < 0 && It(u), K = u.deltaY, $e[0] = $e[1] = $e[2] = 0), (me || Y) && (We && We(u), Y && (Ze(u), Y = !1), me = !1), Ct && !(Ct = !1) && Ar && Ar(u), st && (pe(u), st = !1), ot = 0;
        }, mr = function(S, p, y) {
          at[y] += S, $e[y] += p, u._vx.update(S), u._vy.update(p), k ? ot || (ot = requestAnimationFrame($t)) : $t();
        }, or = function(S, p) {
          qe && !Ge && (u.axis = Ge = Math.abs(S) > Math.abs(p) ? "x" : "y", Ct = !0), Ge !== "y" && (at[2] += S, u._vx.update(S, !0)), Ge !== "x" && ($e[2] += p, u._vy.update(p, !0)), k ? ot || (ot = requestAnimationFrame($t)) : $t();
        }, sr = function(S) {
          if (!Et(S, 1)) {
            S = yr(S, B);
            var p = S.clientX, y = S.clientY, M = p - u.x, D = y - u.y, be = u.isDragging;
            u.x = p, u.y = y, (be || Math.abs(u.startX - p) >= o || Math.abs(u.startY - y) >= o) && (Ze && (Y = !0), be || (u.isDragging = !0), or(M, D), be || ne && ne(u));
          }
        }, z = u.onPress = function(R) {
          Et(R, 1) || R && R.button || (u.axis = Ge = null, _t.pause(), u.isPressed = !0, R = yr(R), zt = K = 0, u.startX = u.x = R.clientX, u.startY = u.y = R.clientY, u._vx.reset(), u._vy.reset(), Ce(de ? a : oe, Ae[1], sr, B, !0), u.deltaX = u.deltaY = 0, te && te(u));
        }, Lt = u.onRelease = function(R) {
          if (!Et(R, 1)) {
            ge(de ? a : oe, Ae[1], sr, !0);
            var S = !isNaN(u.y - u.startY), p = u.isDragging && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), y = yr(R);
            !p && S && (u._vx.reset(), u._vy.reset(), B && Le && m.delayedCall(0.08, function() {
              if (ke() - zr > 300 && !R.defaultPrevented) {
                if (R.target.click)
                  R.target.click();
                else if (oe.createEvent) {
                  var M = oe.createEvent("MouseEvents");
                  M.initMouseEvent("click", !0, !0, E, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), R.target.dispatchEvent(M);
                }
              }
            })), u.isDragging = u.isGesturing = u.isPressed = !1, H && !de && _t.restart(!0), q && p && q(u), F && F(u, p);
          }
        }, xt = function(S) {
          return S.touches && S.touches.length > 1 && (u.isGesturing = !0) && le(S, u.isDragging);
        }, St = function() {
          return (u.isGesturing = !1) || l(u);
        }, vt = function(S) {
          if (!Et(S)) {
            var p = qt(), y = Gt();
            mr((p - vr) * Wt, (y - Ve) * Wt, 1), vr = p, Ve = y, H && _t.restart(!0);
          }
        }, Tt = function(S) {
          if (!Et(S)) {
            S = yr(S, B), pe && (st = !0);
            var p = (S.deltaMode === 1 ? g : S.deltaMode === 2 ? E.innerHeight : 1) * w;
            mr(S.deltaX * p, S.deltaY * p, 0), H && !de && _t.restart(!0);
          }
        }, ar = function(S) {
          if (!Et(S)) {
            var p = S.clientX, y = S.clientY, M = p - u.x, D = y - u.y;
            u.x = p, u.y = y, me = !0, (M || D) && or(M, D);
          }
        }, br = function(S) {
          u.event = S, Oe(u);
        }, Ft = function(S) {
          u.event = S, Ne(u);
        }, Fr = function(S) {
          return Et(S) || yr(S, B) && gt(u);
        };
        _t = u._dc = m.delayedCall(b || 0.25, Lr).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = qt, u.scrollY = Gt, u.isDragging = u.isGesturing = u.isPressed = !1, Rt(this), u.enable = function(R) {
          return u.isEnabled || (Ce(Vt ? oe : a, "scroll", fn), c.indexOf("scroll") >= 0 && Ce(Vt ? oe : a, "scroll", vt, B, U), c.indexOf("wheel") >= 0 && Ce(a, "wheel", Tt, B, U), (c.indexOf("touch") >= 0 && et || c.indexOf("pointer") >= 0) && (Ce(a, Ae[0], z, B, U), Ce(oe, Ae[2], Lt), Ce(oe, Ae[3], Lt), Le && Ce(a, "click", Ue, !1, !0), gt && Ce(a, "click", Fr), le && Ce(oe, "gesturestart", xt), l && Ce(oe, "gestureend", St), Oe && Ce(a, Te + "enter", br), Ne && Ce(a, Te + "leave", Ft), We && Ce(a, Te + "move", ar)), u.isEnabled = !0, R && R.type && z(R), ir && ir(u)), u;
        }, u.disable = function() {
          u.isEnabled && (ut.filter(function(R) {
            return R !== u && jt(R.target);
          }).length || ge(Vt ? oe : a, "scroll", fn), u.isPressed && (u._vx.reset(), u._vy.reset(), ge(de ? a : oe, Ae[1], sr, !0)), ge(Vt ? oe : a, "scroll", vt, U), ge(a, "wheel", Tt, U), ge(a, Ae[0], z, U), ge(oe, Ae[2], Lt), ge(oe, Ae[3], Lt), ge(a, "click", Ue, !0), ge(a, "click", Fr), ge(oe, "gesturestart", xt), ge(oe, "gestureend", St), ge(a, Te + "enter", br), ge(a, Te + "leave", Ft), ge(a, Te + "move", ar), u.isEnabled = u.isPressed = u.isDragging = !1, Nt && Nt(u));
        }, u.kill = u.revert = function() {
          u.disable();
          var R = ut.indexOf(u);
          R >= 0 && ut.splice(R, 1), tt === u && (tt = 0);
        }, ut.push(u), de && jt(a) && (tt = u), u.enable($);
      }, _(s, [{
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
    ae.version = "3.11.5", ae.create = function(s) {
      return new ae(s);
    }, ae.register = Hn, ae.getAll = function() {
      return ut.slice();
    }, ae.getById = function(s) {
      return ut.filter(function(e) {
        return e.vars.id === s;
      })[0];
    }, Ut() && m.registerPlugin(ae);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var v, ur, L, Q, mt, ee, Nn, qr, Gr, fr, Vr, $r, Ie, Ur, pn, Xe, Wn, qn, dr, Gn, hn, Vn, rt, $n, Un, jn, Bt, gn, _n, vn, jr = 1, Be = Date.now, mn = Be(), pt = 0, xr = 0, Ei = function s() {
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
      return v || Zn() && (v = window.gsap) && v.registerPlugin && v;
    }, Kt = function(e) {
      return !!~Nn.indexOf(e);
    }, ei = function(e) {
      return dt(e, "getBoundingClientRect") || (Kt(e) ? function() {
        return cn.width = L.innerWidth, cn.height = L.innerHeight, cn;
      } : function() {
        return Dt(e);
      });
    }, Pi = function(e, n, t) {
      var r = t.d, o = t.d2, c = t.a;
      return (c = dt(e, "getBoundingClientRect")) ? function() {
        return c()[r];
      } : function() {
        return (n ? L["inner" + o] : e["client" + o]) || 0;
      };
    }, Oi = function(e, n) {
      return !n || ~X.indexOf(e) ? ei(e) : function() {
        return cn;
      };
    }, Ht = function(e, n) {
      var t = n.s, r = n.d2, o = n.d, c = n.a;
      return Math.max(0, (t = "scroll" + r) && (c = dt(e, t)) ? c() - ei(e)()[o] : Kt(e) ? (mt[t] || ee[t]) - (L["inner" + r] || mt["client" + r] || ee["client" + r]) : e[t] - e["offset" + r]);
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
    }, Ri = function(e) {
      var n = wt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ni = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Dt = function(e, n) {
      var t = n && wt(e)[pn] !== "matrix(1, 0, 0, 1, 0, 0)" && v.to(e, {
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
        return v.utils.snap(ii(e), n);
      };
    }, Tn = function(e) {
      var n = v.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, o) {
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
    }, Ai = function(e) {
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
    }, ve = function(e, n, t, r) {
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
      var k = o.startColor, B = o.endColor, H = o.fontSize, b = o.indent, f = o.fontWeight, w = Q.createElement("div"), $ = Kt(t) || dt(t, "pinType") === "fixed", ne = e.indexOf("scroller") !== -1, q = $ ? ee : t, Ze = e.indexOf("start") !== -1, te = Ze ? k : B, F = "border-color:" + te + ";font-size:" + H + ";color:" + te + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return F += "position:" + ((ne || g) && $ ? "fixed;" : "absolute;"), (ne || g || !$) && (F += (r === fe ? wn : yn) + ":" + (c + parseFloat(b)) + "px;"), a && (F += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), w._isStart = Ze, w.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), w.style.cssText = F, w.innerText = n || n === 0 ? e + "-" + n : e, q.children[0] ? q.insertBefore(w, q.children[0]) : q.appendChild(w), w._offset = w["offset" + r.op.d2], on(w, 0, r, Ze), w;
    }, on = function(e, n, t, r) {
      var o = {
        display: "block"
      }, c = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
      e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + c + hr] = 1, o["border" + a + hr] = 0, o[t.p] = n + "px", v.set(e, o);
    }, A = [], Mn = {}, Or, si = function() {
      return Be() - pt > 34 && (Or || (Or = requestAnimationFrame(At)));
    }, gr = function() {
      (!rt || !rt.isPressed || rt.startX > ee.clientWidth) && (x.cache++, rt ? Or || (Or = requestAnimationFrame(At)) : At(), pt || tr("scrollStart"), pt = Be());
    }, kn = function() {
      jn = L.innerWidth, Un = L.innerHeight;
    }, Rr = function() {
      x.cache++, !Ie && !Vn && !Q.fullscreenElement && !Q.webkitFullscreenElement && (!$n || jn !== L.innerWidth || Math.abs(L.innerHeight - Un) > L.innerHeight * 0.25) && qr.restart(!0);
    }, er = {}, Ii = [], ai = function s() {
      return ve(I, "scrollEnd", s) || nr(!0);
    }, tr = function(e) {
      return er[e] && er[e].map(function(n) {
        return n();
      }) || Ii;
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
    }, it, rr = 0, ui, zi = function() {
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
    }, En = 0, sn = 1, Dr, At = function(e) {
      if (!it || e === 2) {
        I.isUpdating = !0, Dr && Dr.update(0);
        var n = A.length, t = Be(), r = t - mn >= 50, o = n && A[0].scroll();
        if (sn = En > o ? -1 : 1, it || (En = o), r && (pt && !Ur && t - pt > 200 && (pt = 0, tr("scrollEnd")), Vr = mn, mn = t), sn < 0) {
          for (Xe = n; Xe-- > 0; )
            A[Xe] && A[Xe].update(0, r);
          sn = 1;
        } else
          for (Xe = 0; Xe < n; Xe++)
            A[Xe] && A[Xe].update(0, r);
        I.isUpdating = !1;
      }
      Or = 0;
    }, Pn = [ti, ri, yn, wn, ht + Pr, ht + kr, ht + Er, ht + Cr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], an = Pn.concat([Zt, Jt, "boxSizing", "max" + hr, "max" + xn, "position", ht, re, re + Er, re + kr, re + Pr, re + Cr]), Li = function(e, n, t) {
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
        c.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (c.display = "inline-block"), a[yn] = a[wn] = "auto", c.flexBasis = t.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Zt] = Sn(e, Ye) + Ee, c[Jt] = Sn(e, fe) + Ee, c[re] = a[ht] = a[ri] = a[ti] = "0", _r(r), a[Zt] = a["max" + hr] = t[Zt], a[Jt] = a["max" + xn] = t[Jt], a[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Fi = /([A-Z])/g, _r = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, o, c;
        for ((e.t._gsap || v.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          c = e[r + 1], o = e[r], c ? n[o] = c : n[o] && n.removeProperty(o.replace(Fi, "-$1").toLowerCase());
      }
    }, ln = function(e) {
      for (var n = an.length, t = e.style, r = [], o = 0; o < n; o++)
        r.push(an[o], t[an[o]]);
      return r.t = e, r;
    }, Yi = function(e, n, t) {
      for (var r = [], o = e.length, c = t ? 8 : 0, a; c < o; c += 2)
        a = e[c], r.push(a, a in n ? n[a] : e[c + 1]);
      return r.t = e.t, r;
    }, cn = {
      left: 0,
      top: 0
    }, fi = function(e, n, t, r, o, c, a, g, k, B, H, b, f) {
      He(e) && (e = e(g)), bt(e) && e.substr(0, 3) === "max" && (e = b + (e.charAt(4) === "=" ? rn("0" + e.substr(3), t) : 0));
      var w = f ? f.time() : 0, $, ne, q;
      if (f && f.seek(0), Tr(e))
        f && (e = v.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, b, e)), a && on(a, t, r, !0);
      else {
        He(n) && (n = n(g));
        var Ze = (e || "0").split(" "), te, F, ze, ie;
        q = Ke(n) || ee, te = Dt(q) || {}, (!te || !te.left && !te.top) && wt(q).display === "none" && (ie = q.style.display, q.style.display = "block", te = Dt(q), ie ? q.style.display = ie : q.style.removeProperty("display")), F = rn(Ze[0], te[r.d]), ze = rn(Ze[1] || "0", t), e = te[r.p] - k[r.p] - B + F + o - ze, a && on(a, ze, r, t - ze < 20 || a._isStart && ze > 20), t -= t - ze;
      }
      if (c) {
        var P = e + t, Je = c._isStart;
        $ = "scroll" + r.d2, on(c, P, r, Je && P > 20 || !Je && (H ? Math.max(ee[$], mt[$]) : c.parentNode[$]) <= P + 1), H && (k = Dt(a), H && (c.style[r.op.p] = k[r.op.p] - r.op.m - c._offset + Ee));
      }
      return f && q && ($ = Dt(q), f.seek(b), ne = Dt(q), f._caScrollDist = $[r.p] - ne[r.p], e = e / f._caScrollDist * b), f && f.seek(w), f ? e : Math.round(e);
    }, Xi = /(webkit|moz|length|cssText|inset)/i, di = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var o = e.style, c, a;
        if (n === ee) {
          e._stOrig = o.cssText, a = wt(e);
          for (c in a)
            !+c && !Xi.test(c) && a[c] && typeof o[c] == "string" && c !== "0" && (o[c] = a[c]);
          o.top = t, o.left = r;
        } else
          o.cssText = e._stOrig;
        v.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, pi = function(e, n, t) {
      var r = n, o = r;
      return function(c) {
        var a = Math.round(e());
        return a !== r && a !== o && Math.abs(a - r) > 3 && Math.abs(a - o) > 3 && (c = a, t && t()), o = r, r = c, c;
      };
    }, hi = function(e, n) {
      var t = Xt(e, n), r = "_scroll" + n.p2, o = function c(a, g, k, B, H) {
        var b = c.tween, f = g.onComplete, w = {};
        k = k || t();
        var $ = pi(t, k, function() {
          b.kill(), c.tween = 0;
        });
        return H = B && H || 0, B = B || a - k, b && b.kill(), g[r] = a, g.modifiers = w, w[r] = function() {
          return $(k + B * b.ratio + H * b.ratio * b.ratio);
        }, g.onUpdate = function() {
          x.cache++, At();
        }, g.onComplete = function() {
          c.tween = 0, f && f.call(b);
        }, b = c.tween = v.to(e, g), b;
      };
      return e[r] = t, t.wheelHandler = function() {
        return o.tween && o.tween.kill() && (o.tween = 0);
      }, _e(e, "wheel", t.wheelHandler), I.isTouch && _e(e, "touchmove", t.wheelHandler), o;
    }, I = function() {
      function s(n, t) {
        ur || s.register(v) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
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
        var o = t, c = o.onUpdate, a = o.toggleClass, g = o.id, k = o.onToggle, B = o.onRefresh, H = o.scrub, b = o.trigger, f = o.pin, w = o.pinSpacing, $ = o.invalidateOnRefresh, ne = o.anticipatePin, q = o.onScrubComplete, Ze = o.onSnapComplete, te = o.once, F = o.snap, ze = o.pinReparent, ie = o.pinSpacer, P = o.containerAnimation, Je = o.fastScrollEnd, yt = o.preventOverlaps, O = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ye : fe, Pe = !H && H !== 0, C = Ke(t.scroller || L), It = v.core.getCache(C), Oe = Kt(C), Ne = ("pinType" in t ? t.pinType : dt(C, "pinType") || Oe && "fixed") === "fixed", We = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = Pe && t.toggleActions.split(" "), de = "markers" in t ? t.markers : en.markers, le = Oe ? 0 : parseFloat(wt(C)["border" + O.p2 + hr]) || 0, l = this, pe = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, ir = Pi(C, Oe, O), Nt = Oi(C, Oe), gt = 0, Wt = 0, U = Xt(C, O), Le, qe, Ar, ot, _t, Y, me, st, Ct, Ge, u, zt, K, qt, Gt, vr, Ve, Ir, Vt, oe, at, $e, zr, Ue, Et, Lr, $t, mr, or, sr, z, Lt, xt, St, vt, Tt, ar, br, Ft;
        if (gn(l), l._dir = O, ne *= 45, l.scroller = C, l.scroll = P ? P.time.bind(P) : U, ot = U(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Dr = l)), It.tweenScroll = It.tweenScroll || {
          top: hi(C, fe),
          left: hi(C, Ye)
        }, l.tweenTo = Le = It.tweenScroll[O.p], l.scrubDuration = function(p) {
          Lt = Tr(p) && p, Lt ? z ? z.duration(p) : z = v.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: Lt,
            paused: !0,
            onComplete: function() {
              return q && q(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(H), z && z.resetTo && z.resetTo("totalProgress", 0), or = 0, g || (g = r.vars.id)), A.push(l), F && ((!Kr(F) || F.push) && (F = {
          snapTo: F
        }), "scrollBehavior" in ee.style && v.set(Oe ? [ee, mt] : C, {
          scrollBehavior: "auto"
        }), x.forEach(function(p) {
          return He(p) && p.target === (Oe ? Q.scrollingElement || mt : C) && (p.smooth = !1);
        }), Ar = He(F.snapTo) ? F.snapTo : F.snapTo === "labels" ? Di(r) : F.snapTo === "labelsDirectional" ? Ai(r) : F.directional !== !1 ? function(p, y) {
          return Tn(F.snapTo)(p, Be() - Wt < 500 ? 0 : y.direction);
        } : v.utils.snap(F.snapTo), xt = F.duration || {
          min: 0.1,
          max: 2
        }, xt = Kr(xt) ? fr(xt.min, xt.max) : fr(xt, xt), St = v.delayedCall(F.delay || Lt / 2 || 0.1, function() {
          var p = U(), y = Be() - Wt < 500, M = Le.tween;
          if ((y || Math.abs(l.getVelocity()) < 10) && !M && !Ur && gt !== p) {
            var D = (p - Y) / K, be = r && !Pe ? r.totalProgress() : D, W = y ? 0 : (be - sr) / (Be() - Vr) * 1e3 || 0, Z = v.utils.clamp(-D, 1 - D, pr(W / 2) * W / 0.185), Re = D + (F.inertia === !1 ? 0 : Z), we = fr(0, 1, Ar(Re, l)), ce = Math.round(Y + we * K), J = F, lt = J.onStart, je = J.onInterrupt, ye = J.onComplete;
            if (p <= me && p >= Y && ce !== p) {
              if (M && !M._initted && M.data <= pr(ce - p))
                return;
              F.inertia === !1 && (Z = we - D), Le(ce, {
                duration: xt(pr(Math.max(pr(Re - be), pr(we - be)) * 0.185 / W / 0.05 || 0)),
                ease: F.ease || "power3",
                data: pr(ce - p),
                onInterrupt: function() {
                  return St.restart(!0) && je && je(l);
                },
                onComplete: function() {
                  l.update(), gt = U(), or = sr = r && !Pe ? r.totalProgress() : l.progress, Ze && Ze(l), ye && ye(l);
                }
              }, p, Z * K, ce - p - Z * K), lt && lt(l, Le.tween);
            }
          } else
            l.isActive && gt !== p && St.restart(!0);
        }).pause()), g && (Mn[g] = l), b = l.trigger = Ke(b || f), Ft = b && b._gsap && b._gsap.stRevert, Ft && (Ft = Ft(l)), f = f === !0 ? b : Ke(f), bt(a) && (a = {
          targets: b,
          className: a
        }), f && (w === !1 || w === ht || (w = !w && f.parentNode && f.parentNode.style && wt(f.parentNode).display === "flex" ? !1 : re), l.pin = f, qe = v.core.getCache(f), qe.spacer ? qt = qe.pinState : (ie && (ie = Ke(ie), ie && !ie.nodeType && (ie = ie.current || ie.nativeElement), qe.spacerIsNative = !!ie, ie && (qe.spacerState = ln(ie))), qe.spacer = Ve = ie || Q.createElement("div"), Ve.classList.add("pin-spacer"), g && Ve.classList.add("pin-spacer-" + g), qe.pinState = qt = ln(f)), t.force3D !== !1 && v.set(f, {
          force3D: !0
        }), l.spacer = Ve = qe.spacer, mr = wt(f), zr = mr[w + O.os2], Vt = v.getProperty(f), oe = v.quickSetter(f, O.a, Ee), On(f, Ve, mr), vr = ln(f)), de) {
          zt = Kr(de) ? ni(de, oi) : oi, Ge = nn("scroller-start", g, C, O, zt, 0), u = nn("scroller-end", g, C, O, zt, 0, Ge), Ir = Ge["offset" + O.op.d2];
          var Fr = Ke(dt(C, "content") || C);
          st = this.markerStart = nn("start", g, Fr, O, zt, Ir, 0, P), Ct = this.markerEnd = nn("end", g, Fr, O, zt, Ir, 0, P), P && (br = v.quickSetter([st, Ct], O.a, Ee)), !Ne && !(X.length && dt(C, "fixedMarkers") === !0) && (Ri(Oe ? ee : C), v.set([Ge, u], {
            force3D: !0
          }), Et = v.quickSetter(Ge, O.a, Ee), $t = v.quickSetter(u, O.a, Ee));
        }
        if (P) {
          var R = P.vars.onUpdate, S = P.vars.onUpdateParams;
          P.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), R && R.apply(P, S || []);
          });
        }
        l.previous = function() {
          return A[A.indexOf(l) - 1];
        }, l.next = function() {
          return A[A.indexOf(l) + 1];
        }, l.revert = function(p, y) {
          if (!y)
            return l.kill(!0);
          var M = p !== !1 || !l.enabled, D = Ie;
          M !== l.isReverted && (M && (Tt = Math.max(U(), l.scroll.rec || 0), vt = l.progress, ar = r && r.progress()), st && [st, Ct, Ge, u].forEach(function(be) {
            return be.style.display = M ? "none" : "block";
          }), M && (Ie = l, l.update(M)), f && (!ze || !l.isActive) && (M ? Li(f, Ve, qt) : On(f, Ve, wt(f), Ue)), M || l.update(M), Ie = D, l.isReverted = M);
        }, l.refresh = function(p, y) {
          if (!((Ie || !l.enabled) && !y)) {
            if (f && p && pt) {
              _e(s, "scrollEnd", ai);
              return;
            }
            !it && pe && pe(l), Ie = l, Wt = Be(), Le.tween && (Le.tween.kill(), Le.tween = 0), z && z.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var M = ir(), D = Nt(), be = P ? P.duration() : Ht(C, O), W = K <= 0.01, Z = 0, Re = 0, we = t.end, ce = t.endTrigger || b, J = t.start || (t.start === 0 || !b ? 0 : f ? "0 0" : "0 100%"), lt = l.pinnedContainer = t.pinnedContainer && Ke(t.pinnedContainer), je = b && Math.max(0, A.indexOf(l)) || 0, ye = je, se, Fe, wr, lr, ue, xe, Pt, Dn, bi, Yr, Ot; ye--; )
              xe = A[ye], xe.end || xe.refresh(0, 1) || (Ie = l), Pt = xe.pin, Pt && (Pt === b || Pt === f || Pt === lt) && !xe.isReverted && (Yr || (Yr = []), Yr.unshift(xe), xe.revert(!0, !0)), xe !== A[ye] && (je--, ye--);
            for (He(J) && (J = J(l)), Y = fi(J, b, M, O, U(), st, Ge, l, D, le, Ne, be, P) || (f ? -1e-3 : 0), He(we) && (we = we(l)), bt(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (bt(J) ? J.split(" ")[0] : "") + we : (Z = rn(we.substr(2), M), we = bt(J) ? J : (P ? v.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, Y) : Y) + Z, ce = b)), me = Math.max(Y, fi(we || (ce ? "100% 0" : be), ce, M, O, U() + Z, Ct, u, l, D, le, Ne, be, P)) || -1e-3, K = me - Y || (Y -= 0.01) && 1e-3, Z = 0, ye = je; ye--; )
              xe = A[ye], Pt = xe.pin, Pt && xe.start - xe._pinPush <= Y && !P && xe.end > 0 && (se = xe.end - xe.start, (Pt === b && xe.start - xe._pinPush < Y || Pt === lt) && !Tr(J) && (Z += se * (1 - xe.progress)), Pt === f && (Re += se));
            if (Y += Z, me += Z, W && (vt = v.utils.clamp(0, 1, v.utils.normalize(Y, me, Tt))), l._pinPush = Re, st && Z && (se = {}, se[O.a] = "+=" + Z, lt && (se[O.p] = "-=" + U()), v.set([st, Ct], se)), f)
              se = wt(f), lr = O === fe, wr = U(), at = parseFloat(Vt(O.a)) + Re, !be && me > 1 && (Ot = (Oe ? Q.scrollingElement || mt : C).style, Ot = {
                style: Ot,
                value: Ot["overflow" + O.a.toUpperCase()]
              }, Ot.style["overflow" + O.a.toUpperCase()] = "scroll"), On(f, Ve, se), vr = ln(f), Fe = Dt(f, !0), Dn = Ne && Xt(C, lr ? Ye : fe)(), w && (Ue = [w + O.os2, K + Re + Ee], Ue.t = Ve, ye = w === re ? Sn(f, O) + K + Re : 0, ye && Ue.push(O.d, ye + Ee), _r(Ue), lt && A.forEach(function(Xr) {
                Xr.pin === lt && Xr.vars.pinSpacing !== !1 && (Xr._subPinOffset = !0);
              }), Ne && U(Tt)), Ne && (ue = {
                top: Fe.top + (lr ? wr - Y : Dn) + Ee,
                left: Fe.left + (lr ? Dn : wr - Y) + Ee,
                boxSizing: "border-box",
                position: "fixed"
              }, ue[Zt] = ue["max" + hr] = Math.ceil(Fe.width) + Ee, ue[Jt] = ue["max" + xn] = Math.ceil(Fe.height) + Ee, ue[ht] = ue[ht + Er] = ue[ht + kr] = ue[ht + Pr] = ue[ht + Cr] = "0", ue[re] = se[re], ue[re + Er] = se[re + Er], ue[re + kr] = se[re + kr], ue[re + Pr] = se[re + Pr], ue[re + Cr] = se[re + Cr], Gt = Yi(qt, ue, ze), it && U(0)), r ? (bi = r._initted, hn(1), r.render(r.duration(), !0, !0), $e = Vt(O.a) - at + K + Re, Lr = Math.abs(K - $e) > 1, Ne && Lr && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), hn(0)) : $e = K, Ot && (Ot.value ? Ot.style["overflow" + O.a.toUpperCase()] = Ot.value : Ot.style.removeProperty("overflow-" + O.a));
            else if (b && U() && !P)
              for (Fe = b.parentNode; Fe && Fe !== ee; )
                Fe._pinOffset && (Y -= Fe._pinOffset, me -= Fe._pinOffset), Fe = Fe.parentNode;
            Yr && Yr.forEach(function(Xr) {
              return Xr.revert(!1, !0);
            }), l.start = Y, l.end = me, ot = _t = it ? Tt : U(), !P && !it && (ot < Tt && U(Tt), l.scroll.rec = 0), l.revert(!1, !0), St && (gt = -1, l.isActive && U(Y + K * vt), St.restart(!0)), Ie = 0, r && Pe && (r._initted || ar) && r.progress() !== ar && r.progress(ar, !0).render(r.time(), !0, !0), (W || vt !== l.progress || P) && (r && !Pe && r.totalProgress(P && Y < -1e-3 && !vt ? v.utils.normalize(Y, me, 0) : vt, !0), l.progress = (ot - Y) / K === vt ? 0 : vt), f && w && (Ve._pinOffset = Math.round(l.progress * $e)), z && z.invalidate(), B && !it && B(l);
          }
        }, l.getVelocity = function() {
          return (U() - _t) / (Be() - Vr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Mr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? Pe || Mr(r, l.direction < 0, 1) : Mr(r, r.reversed()));
        }, l.labelToScroll = function(p) {
          return r && r.labels && (Y || l.refresh() || Y) + r.labels[p] / r.duration() * K || 0;
        }, l.getTrailing = function(p) {
          var y = A.indexOf(l), M = l.direction > 0 ? A.slice(0, y).reverse() : A.slice(y + 1);
          return (bt(p) ? M.filter(function(D) {
            return D.vars.preventOverlaps === p;
          }) : M).filter(function(D) {
            return l.direction > 0 ? D.end <= Y : D.start >= me;
          });
        }, l.update = function(p, y, M) {
          if (!(P && !M && !p)) {
            var D = it === !0 ? Tt : l.scroll(), be = p ? 0 : (D - Y) / K, W = be < 0 ? 0 : be > 1 ? 1 : be || 0, Z = l.progress, Re, we, ce, J, lt, je, ye, se;
            if (y && (_t = ot, ot = P ? U() : D, F && (sr = or, or = r && !Pe ? r.totalProgress() : W)), ne && !W && f && !Ie && !jr && pt && Y < D + (D - _t) / (Be() - Vr) * ne && (W = 1e-4), W !== Z && l.enabled) {
              if (Re = l.isActive = !!W && W < 1, we = !!Z && Z < 1, je = Re !== we, lt = je || !!W != !!Z, l.direction = W > Z ? 1 : -1, l.progress = W, lt && !Ie && (ce = W && !Z ? 0 : W === 1 ? 1 : Z === 1 ? 2 : 3, Pe && (J = !je && G[ce + 1] !== "none" && G[ce + 1] || G[ce], se = r && (J === "complete" || J === "reset" || J in r))), yt && (je || se) && (se || H || !r) && (He(yt) ? yt(l) : l.getTrailing(yt).forEach(function(ue) {
                return ue.endAnimation();
              })), Pe || (z && !Ie && !jr ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", W, r._tTime / r._tDur) : (z.vars.totalProgress = W, z.invalidate().restart())) : r && r.totalProgress(W, !!Ie)), f) {
                if (p && w && (Ve.style[w + O.os2] = zr), !Ne)
                  oe(Sr(at + $e * W));
                else if (lt) {
                  if (ye = !p && W > Z && me + 1 > D && D + 1 >= Ht(C, O), ze)
                    if (!p && (Re || ye)) {
                      var Fe = Dt(f, !0), wr = D - Y;
                      di(f, ee, Fe.top + (O === fe ? wr : 0) + Ee, Fe.left + (O === fe ? 0 : wr) + Ee);
                    } else
                      di(f, Ve);
                  _r(Re || ye ? Gt : vr), Lr && W < 1 && Re || oe(at + (W === 1 && !ye ? $e : 0));
                }
              }
              F && !Le.tween && !Ie && !jr && St.restart(!0), a && (je || te && W && (W < 1 || !vn)) && Gr(a.targets).forEach(function(ue) {
                return ue.classList[Re || te ? "add" : "remove"](a.className);
              }), c && !Pe && !p && c(l), lt && !Ie ? (Pe && (se && (J === "complete" ? r.pause().totalProgress(1) : J === "reset" ? r.restart(!0).pause() : J === "restart" ? r.restart(!0) : r[J]()), c && c(l)), (je || !vn) && (k && je && bn(l, k), We[ce] && bn(l, We[ce]), te && (W === 1 ? l.kill(!1, 1) : We[ce] = 0), je || (ce = W === 1 ? 1 : 3, We[ce] && bn(l, We[ce]))), Je && !Re && Math.abs(l.getVelocity()) > (Tr(Je) ? Je : 2500) && (Mr(l.callbackAnimation), z ? z.progress(1) : Mr(r, J === "reverse" ? 1 : !W, 1))) : Pe && c && !Ie && c(l);
            }
            if ($t) {
              var lr = P ? D / P.duration() * (P._caScrollDist || 0) : D;
              Et(lr + (Ge._isFlipped ? 1 : 0)), $t(lr);
            }
            br && br(-D / P.duration() * (P._caScrollDist || 0));
          }
        }, l.enable = function(p, y) {
          l.enabled || (l.enabled = !0, _e(C, "resize", Rr), _e(Oe ? Q : C, "scroll", gr), pe && _e(s, "refreshInit", pe), p !== !1 && (l.progress = vt = 0, ot = _t = gt = U()), y !== !1 && l.refresh());
        }, l.getTween = function(p) {
          return p && Le ? Le.tween : z;
        }, l.setPositions = function(p, y) {
          f && (at += p - Y, $e += y - p - K, w === re && l.adjustPinSpacing(y - p - K)), l.start = Y = p, l.end = me = y, K = y - p, l.update();
        }, l.adjustPinSpacing = function(p) {
          if (Ue && p) {
            var y = Ue.indexOf(O.d) + 1;
            Ue[y] = parseFloat(Ue[y]) + p + Ee, Ue[1] = parseFloat(Ue[1]) + p + Ee, _r(Ue);
          }
        }, l.disable = function(p, y) {
          if (l.enabled && (p !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, y || z && z.pause(), Tt = 0, qe && (qe.uncache = 1), pe && ve(s, "refreshInit", pe), St && (St.pause(), Le.tween && Le.tween.kill() && (Le.tween = 0)), !Oe)) {
            for (var M = A.length; M--; )
              if (A[M].scroller === C && A[M] !== l)
                return;
            ve(C, "resize", Rr), ve(C, "scroll", gr);
          }
        }, l.kill = function(p, y) {
          l.disable(p, y), z && !y && z.kill(), g && delete Mn[g];
          var M = A.indexOf(l);
          M >= 0 && A.splice(M, 1), M === Xe && sn > 0 && Xe--, M = 0, A.forEach(function(D) {
            return D.scroller === l.scroller && (M = 1);
          }), M || it || (l.scroll.rec = 0), r && (r.scrollTrigger = null, p && r.revert({
            kill: !1
          }), y || r.kill()), st && [st, Ct, Ge, u].forEach(function(D) {
            return D.parentNode && D.parentNode.removeChild(D);
          }), Dr === l && (Dr = 0), f && (qe && (qe.uncache = 1), M = 0, A.forEach(function(D) {
            return D.pin === f && M++;
          }), M || (qe.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Ft && Ft(l), !r || !r.add || K ? l.refresh() : v.delayedCall(0.01, function() {
          return Y || me || l.refresh();
        }) && (K = 0.01) && (Y = me = 0), f && zi();
      }, s.register = function(t) {
        return ur || (v = t || Jn(), Zn() && window.document && s.enable(), ur = xr), ur;
      }, s.defaults = function(t) {
        if (t)
          for (var r in t)
            en[r] = t[r];
        return en;
      }, s.disable = function(t, r) {
        xr = 0, A.forEach(function(c) {
          return c[r ? "kill" : "disable"](t);
        }), ve(L, "wheel", gr), ve(Q, "scroll", gr), clearInterval($r), ve(Q, "touchcancel", kt), ve(ee, "touchstart", kt), Zr(ve, Q, "pointerdown,touchstart,mousedown", Qn), Zr(ve, Q, "pointerup,touchend,mouseup", Kn), qr.kill(), Qr(ve);
        for (var o = 0; o < x.length; o += 3)
          Jr(ve, x[o], x[o + 1]), Jr(ve, x[o], x[o + 2]);
      }, s.enable = function() {
        if (L = window, Q = document, mt = Q.documentElement, ee = Q.body, v && (Gr = v.utils.toArray, fr = v.utils.clamp, gn = v.core.context || kt, hn = v.core.suppressOverwrites || kt, _n = L.history.scrollRestoration || "auto", En = L.pageYOffset, v.core.globals("ScrollTrigger", s), ee)) {
          xr = 1, Ei(), ae.register(v), s.isTouch = ae.isTouch, Bt = ae.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(L, "wheel", gr), Nn = [L, Q, mt, ee], v.matchMedia ? (s.matchMedia = function(g) {
            var k = v.matchMedia(), B;
            for (B in g)
              k.add(B, g[B]);
            return k;
          }, v.addEventListener("matchMediaInit", function() {
            return Cn();
          }), v.addEventListener("matchMediaRevert", function() {
            return li();
          }), v.addEventListener("matchMedia", function() {
            nr(0, 1), tr("matchMedia");
          }), v.matchMedia("(orientation: portrait)", function() {
            return kn(), kn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), kn(), _e(Q, "scroll", gr);
          var t = ee.style, r = t.borderTopStyle, o = v.core.Animation.prototype, c, a;
          for (o.revert || Object.defineProperty(o, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", c = Dt(ee), fe.m = Math.round(c.top + fe.sc()) || 0, Ye.m = Math.round(c.left + Ye.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), $r = setInterval(si, 250), v.delayedCall(0.5, function() {
            return jr = 0;
          }), _e(Q, "touchcancel", kt), _e(ee, "touchstart", kt), Zr(_e, Q, "pointerdown,touchstart,mousedown", Qn), Zr(_e, Q, "pointerup,touchend,mouseup", Kn), pn = v.utils.checkPrefix("transform"), an.push(pn), ur = Be(), qr = v.delayedCall(0.2, nr).pause(), dr = [Q, "visibilitychange", function() {
            var g = L.innerWidth, k = L.innerHeight;
            Q.hidden ? (Wn = g, qn = k) : (Wn !== g || qn !== k) && Rr();
          }, Q, "DOMContentLoaded", nr, L, "load", nr, L, "resize", Rr], Qr(_e), A.forEach(function(g) {
            return g.enable(0, 1);
          }), a = 0; a < x.length; a += 3)
            Jr(ve, x[a], x[a + 1]), Jr(ve, x[a], x[a + 2]);
        }
      }, s.config = function(t) {
        "limitCallbacks" in t && (vn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval($r) || ($r = r) && setInterval(si, r), "ignoreMobileResize" in t && ($n = s.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Qr(ve) || Qr(_e, t.autoRefreshEvents || "none"), Vn = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, s.scrollerProxy = function(t, r) {
        var o = Ke(t), c = x.indexOf(o), a = Kt(o);
        ~c && x.splice(c, a ? 6 : 2), r && (a ? X.unshift(L, r, ee, r, mt, r) : X.unshift(o, r));
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
          n >= 0 && nt.splice(n, 5), nt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), v.core.getCache(e), gn());
        }
      }) : nt;
    }, I.revert = function(s, e) {
      return Cn(!s, e);
    }, I.create = function(s, e) {
      return new I(s, e);
    }, I.refresh = function(s) {
      return s ? Rr() : (ur || I.register()) && nr(!0);
    }, I.update = function(s) {
      return ++x.cache && At(s === !0 ? 2 : 0);
    }, I.clearScrollMemory = ci, I.maxScroll = function(s, e) {
      return Ht(s, e ? Ye : fe);
    }, I.getScrollFunc = function(s, e) {
      return Xt(Ke(s), e ? Ye : fe);
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
      var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, c = function(k, B) {
        var H = [], b = [], f = v.delayedCall(r, function() {
          B(H, b), H = [], b = [];
        }).pause();
        return function(w) {
          H.length || f.restart(!0), H.push(w.trigger), b.push(w), o <= H.length && f.progress(1);
        };
      }, a;
      for (a in e)
        t[a] = a.substr(0, 2) === "on" && He(e[a]) && a !== "onRefreshInit" ? c(a, e[a]) : e[a];
      return He(o) && (o = o(), _e(I, "refresh", function() {
        return o = e.batchMax();
      })), Gr(s).forEach(function(g) {
        var k = {};
        for (a in t)
          k[a] = t[a];
        k.trigger = g, n.push(I.create(k));
      }), n;
    };
    var gi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Rn = function s(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ae.isTouch ? " pinch-zoom" : "") : "none", e === mt && s(ee, n);
    }, un = {
      auto: 1,
      scroll: 1
    }, Bi = function(e) {
      var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, c = o._gsap || v.core.getCache(o), a = Be(), g;
      if (!c._isScrollT || a - c._isScrollT > 2e3) {
        for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(un[(g = wt(o)).overflowY] || un[g.overflowX])); )
          o = o.parentNode;
        c._isScroll = o && o !== t && !Kt(o) && (un[(g = wt(o)).overflowY] || un[g.overflowX]), c._isScrollT = a;
      }
      (c._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, _i = function(e, n, t, r) {
      return ae.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && Bi,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return t && _e(Q, ae.eventTypes[0], mi, !1, !0);
        },
        onDisable: function() {
          return ve(Q, ae.eventTypes[0], mi, !0);
        }
      });
    }, Hi = /(input|label|select|textarea)/i, vi, mi = function(e) {
      var n = Hi.test(e.target.tagName);
      (n || vi) && (e._gsapAllow = !0, vi = n);
    }, Ni = function(e) {
      Kr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, c = n.onRelease, a, g, k = Ke(e.target) || mt, B = v.core.globals().ScrollSmoother, H = B && B.get(), b = Bt && (e.content && Ke(e.content) || H && e.content !== !1 && !H.smooth() && H.content()), f = Xt(k, fe), w = Xt(k, Ye), $ = 1, ne = (ae.isTouch && L.visualViewport ? L.visualViewport.scale * L.visualViewport.width : L.outerWidth) / L.innerWidth, q = 0, Ze = He(r) ? function() {
        return r(a);
      } : function() {
        return r || 2.8;
      }, te, F, ze = _i(k, e.type, !0, o), ie = function() {
        return F = !1;
      }, P = kt, Je = kt, yt = function() {
        g = Ht(k, fe), Je = fr(Bt ? 1 : 0, g), t && (P = fr(0, Ht(k, Ye))), te = rr;
      }, O = function() {
        b._gsap.y = Sr(parseFloat(b._gsap.y) + f.offset) + "px", b.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(b._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
      }, Pe = function() {
        if (F) {
          requestAnimationFrame(ie);
          var de = Sr(a.deltaY / 2), le = Je(f.v - de);
          if (b && le !== f.v + f.offset) {
            f.offset = le - f.v;
            var l = Sr((parseFloat(b && b._gsap.y) || 0) - f.offset);
            b.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", b._gsap.y = l + "px", f.cacheID = x.cache, At();
          }
          return !0;
        }
        f.offset && O(), F = !0;
      }, C, It, Oe, Ne, We = function() {
        yt(), C.isActive() && C.vars.scrollY > g && (f() > g ? C.progress(1) && f(g) : C.resetTo("scrollY", g));
      };
      return b && v.set(b, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Bt && G.type === "touchmove" && Pe() || $ > 1.05 && G.type !== "touchstart" || a.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        F = !1;
        var G = $;
        $ = Sr((L.visualViewport && L.visualViewport.scale || 1) / ne), C.pause(), G !== $ && Rn(k, $ > 1.01 ? !0 : t ? !1 : "x"), It = w(), Oe = f(), yt(), te = rr;
      }, e.onRelease = e.onGestureStart = function(G, de) {
        if (f.offset && O(), !de)
          Ne.restart(!0);
        else {
          x.cache++;
          var le = Ze(), l, pe;
          t && (l = w(), pe = l + le * 0.05 * -G.velocityX / 0.227, le *= gi(w, l, pe, Ht(k, Ye)), C.vars.scrollX = P(pe)), l = f(), pe = l + le * 0.05 * -G.velocityY / 0.227, le *= gi(f, l, pe, Ht(k, fe)), C.vars.scrollY = Je(pe), C.invalidate().duration(le).play(0.01), (Bt && C.vars.scrollY >= g || l >= g - 1) && v.to({}, {
            onUpdate: We,
            duration: le
          });
        }
        c && c(G);
      }, e.onWheel = function() {
        C._ts && C.pause(), Be() - q > 1e3 && (te = 0, q = Be());
      }, e.onChange = function(G, de, le, l, pe) {
        if (rr !== te && yt(), de && t && w(P(l[2] === de ? It + (G.startX - G.x) : w() + de - l[1])), le) {
          f.offset && O();
          var ir = pe[2] === le, Nt = ir ? Oe + G.startY - G.y : f() + le - pe[1], gt = Je(Nt);
          ir && Nt !== gt && (Oe += gt - Nt), f(gt);
        }
        (le || de) && At();
      }, e.onEnable = function() {
        Rn(k, t ? !1 : "x"), I.addEventListener("refresh", We), _e(L, "resize", We), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = w.smooth = !1), ze.enable();
      }, e.onDisable = function() {
        Rn(k, !0), ve(L, "resize", We), I.removeEventListener("refresh", We), ze.kill();
      }, e.lockAxis = e.lockAxis !== !1, a = new ae(e), a.iOS = Bt, Bt && !f() && f(1), Bt && v.ticker.add(kt), Ne = a._dc, C = v.to(a, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: pi(f, f(), function() {
            return C.pause();
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
      return new ae(s);
    }, I.normalizeScroll = function(s) {
      if (typeof s > "u")
        return rt;
      if (s === !0 && rt)
        return rt.enable();
      if (s === !1)
        return rt && rt.kill();
      var e = s instanceof ae ? s : Ni(s);
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
    }, Jn() && v.registerPlugin(I), h.ScrollTrigger = I, h.default = I, typeof window > "u" || window !== h ? Object.defineProperty(h, "__esModule", { value: !0 }) : delete window.default;
  });
})(Ln, Ln.exports);
var Mi = Ln.exports;
De.registerPlugin(Mi.ScrollTrigger);
class ki extends Nr {
  static create(d, h = {}, T = {}) {
    return new ki(d, h, T);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(d) {
    this.meta.speed = d;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(d) {
    this.meta.velocity = d;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(d) {
    this.meta.direction = d;
  }
  constructor(d, h = {}, T = {}) {
    super(
      (_) => {
        var Ce, ge;
        Object.assign(_.meta, {
          speed: h.speed ?? 1,
          velocity: h.velocity ?? 0,
          direction: h.direction || "rtl",
          onCreated: h.onCreated,
          onUpdate: h.onUpdate
        }), _.meta.scrollTrigger = Mi.ScrollTrigger.create(h.scrollTrigger ?? {});
        let m = null;
        typeof d == "string" ? m = document.querySelector(d) : d instanceof HTMLElement && (m = d);
        const j = h.createDOMContainers != null ? h.createDOMContainers : !0, E = j ? document.createElement("div") : m == null ? void 0 : m.querySelector(".owow-marquee-outer");
        E == null || E.classList.add("owow-marquee-outer");
        const N = j ? document.createElement("div") : E == null ? void 0 : E.querySelector(".owow-marquee-inner");
        if (N == null || N.classList.add("owow-marquee-inner"), !m || !E || !N)
          throw console.error({
            targetContainer: m,
            outerContainer: E,
            innerContainer: N
          }), new Error("Invalid marquee DOM structure");
        _.meta.sourceDOM = m.cloneNode(!0), _.meta.target = m, N.append(...m.childNodes), E.append(N), m == null || m.append(E), De.set(N, { display: "inline-flex" });
        const he = m.getBoundingClientRect(), Se = N.getBoundingClientRect(), et = he.width + Se.width, Te = document.createDocumentFragment(), Me = [];
        let ct = Se.width;
        if (!et || !ct)
          return;
        for (; ct <= et; ) {
          const Qe = N.cloneNode(!0);
          ct += Se.width, Me.push(Qe);
        }
        Te.append(...Me), E.append(Te);
        const tt = De.context(() => {
          De.set(E, {
            x: 0,
            force3D: !0,
            width: ct,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Ae = De.utils.pipe(
          (Qe) => Math.floor(Qe * 1e3) / 1e3,
          De.quickSetter(E, "x", "px")
        ), Rt = De.utils.wrap(0, -Se.width), Ut = De.utils.normalize(0, -Se.width);
        let Mt, ut, x, X, ke, ft, Yt, dt;
        const jt = De.ticker.add(() => {
          var Qe, Qt;
          switch (dt = De.ticker.deltaRatio(), ut = De.utils.interpolate(
            ut ?? 0,
            _.meta.scrollTrigger.getVelocity(),
            0.5 * dt
          ), x = ut * _.meta.velocity, _.meta.direction) {
            case "ltr":
              Mt = -1, x = -Math.abs(x);
              break;
            case "rtl":
              Mt = 1, x = Math.abs(x);
              break;
            case "scroll":
              Mt = _.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              Mt = -(_.meta.scrollTrigger.direction ?? 1), x = -x;
          }
          X = De.getProperty(E, "x"), ke = _.meta.speed * -Mt, ft = (ke - x) * dt, Yt = Rt(X + ft), Ae(Yt), (Qt = (Qe = _.meta).onUpdate) == null || Qt.call(Qe, Ut(Yt));
        });
        return (ge = (Ce = _.meta).onCreated) == null || ge.call(Ce), () => {
          var Qe;
          for (tt.kill(!0), De.ticker.remove(jt), m == null || m.replaceChildren(..._.meta.sourceDOM.childNodes); Me.length; )
            (Qe = Me.pop()) == null || Qe.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...T
      }
    );
  }
}
class Ci extends Nr {
  constructor(d, h = {}, T = {}) {
    super(async (_, m) => {
      const j = Ci.SplitText;
      if (!j)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      Br.registerPlugin(j);
      const E = Br.utils.toArray(d);
      for (const Te of E)
        if (!(Te instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const N = _.meta.childSplit = new j(d, {
        type: "lines",
        linesClass: "owow-split-child",
        ...cr(h.childSplitVars)
      }), he = _.meta.parentSplit = new j(d, {
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
      return m.add(() => {
        _.meta.setup = Br.set(he.lines, { overflow: "hidden" }), _.meta.tween = Br.fromTo(N.lines, Se, et);
      }), () => {
        N.revert(), m.kill(!0);
      };
    }, T);
  }
}
export {
  V as Ease,
  ki as Marquee,
  Nr as Motion,
  Ti as Pointer,
  go as SecondOrderDynamics,
  Ci as TextClipReveal
};
