import { noop as Ni, fromEvent as In, debounceTime as Wi, Observable as Gi } from "rxjs";
import Fe, { gsap as Xr } from "gsap";
const Fn = 1.70158, Yn = 0.7;
class $ {
}
$.inSine = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1;
$.outSine = (i) => Math.sin(i * (Math.PI / 2));
$.inOutSine = (i) => -0.5 * (Math.cos(Math.PI * i) - 1);
$.inQuad = (i) => i * i;
$.outQuad = (i) => i * (2 - i);
$.inOutQuad = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i;
$.inCubic = (i) => i * i * i;
$.outCubic = (i) => --i * i * i + 1;
$.inOutCubic = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1;
$.inQuart = (i) => i * i * i * i;
$.outQuart = (i) => 1 - --i * i * i * i;
$.inOutQuart = (i) => i < 0.5 ? 8 * i * i * i * i : 1 - 8 * --i * i * i * i;
$.inQuint = (i) => i * i * i * i * i;
$.outQuint = (i) => 1 + --i * i * i * i * i;
$.inOutQuint = (i) => i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * --i * i * i * i * i;
$.inExpo = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1));
$.outExpo = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1;
$.inOutExpo = (i) => i === 0 || i === 1 ? i : i * 2 < 1 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2);
$.inCirc = (i) => -1 * (Math.sqrt(1 - i / 1 * i) - 1);
$.outCirc = (i) => Math.sqrt(1 - Math.pow(i - 1, 2));
$.inOutCirc = (i) => i * 2 < 1 ? -0.5 * (Math.sqrt(1 - Math.pow(i * 2, 2)) - 1) : 0.5 * (Math.sqrt(1 - Math.pow(i * 2 - 2, 2)) + 1);
$.inBack = (i, p = Fn) => i * i * ((p + 1) * i - p);
$.outBack = (i, p = Fn) => {
  const h = i / 1 - 1;
  return h * h * ((p + 1) * h + p) + 1;
};
$.inOutBack = (i, p = Fn) => {
  const h = i * 2, M = h - 2, v = p * 1.525;
  return h < 1 ? 0.5 * h * h * ((v + 1) * h - v) : 0.5 * (M * M * ((v + 1) * M + v) + 2);
};
$.inElastic = (i, p = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const M = i / 1 - 1, v = 1 - p, m = v / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * M) * Math.sin((M - m) * (2 * Math.PI) / v));
};
$.outElastic = (i, p = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - p, M = i * 2, v = h / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * M) * Math.sin((M - v) * (2 * Math.PI) / h) + 1;
};
$.inOutElastic = (i, p = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - p, M = i * 2, v = M - 1, m = h / (2 * Math.PI) * Math.asin(1);
  return M < 1 ? -0.5 * (Math.pow(2, 10 * v) * Math.sin((v - m) * (2 * Math.PI) / h)) : Math.pow(2, -10 * v) * Math.sin((v - m) * (2 * Math.PI) / h) * 0.5 + 1;
};
var Br = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vi(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var $i = "Expected a function", wi = 0 / 0, qi = "[object Symbol]", Ui = /^\s+|\s+$/g, ji = /^[-+]0x[0-9a-f]+$/i, Qi = /^0b[01]+$/i, Ki = /^0o[0-7]+$/i, Zi = parseInt, Ji = typeof Br == "object" && Br && Br.Object === Object && Br, eo = typeof self == "object" && self && self.Object === Object && self, to = Ji || eo || Function("return this")(), ro = Object.prototype, no = ro.toString, io = Math.max, oo = Math.min, An = function() {
  return to.Date.now();
};
function so(i, p, h) {
  var M, v, m, Z, k, B, le = 0, Se = !1, Je = !1, Te = !0;
  if (typeof i != "function")
    throw new TypeError($i);
  p = yi(p) || 0, zn(h) && (Se = !!h.leading, Je = "maxWait" in h, m = Je ? io(yi(h.maxWait) || 0, p) : m, Te = "trailing" in h ? !!h.trailing : Te);
  function Me(X) {
    var ke = M, ct = v;
    return M = v = void 0, le = X, Z = i.apply(ct, ke), Z;
  }
  function lt(X) {
    return le = X, k = setTimeout(Ot, p), Se ? Me(X) : Z;
  }
  function et(X) {
    var ke = X - B, ct = X - le, Ft = p - ke;
    return Je ? oo(Ft, m - ct) : Ft;
  }
  function Re(X) {
    var ke = X - B, ct = X - le;
    return B === void 0 || ke >= p || ke < 0 || Je && ct >= m;
  }
  function Ot() {
    var X = An();
    if (Re(X))
      return Ut(X);
    k = setTimeout(Ot, et(X));
  }
  function Ut(X) {
    return k = void 0, Te && M ? Me(X) : (M = v = void 0, Z);
  }
  function St() {
    k !== void 0 && clearTimeout(k), le = 0, M = B = v = k = void 0;
  }
  function gt() {
    return k === void 0 ? Z : Ut(An());
  }
  function x() {
    var X = An(), ke = Re(X);
    if (M = arguments, v = this, B = X, ke) {
      if (k === void 0)
        return lt(B);
      if (Je)
        return k = setTimeout(Ot, p), Me(B);
    }
    return k === void 0 && (k = setTimeout(Ot, p)), Z;
  }
  return x.cancel = St, x.flush = gt, x;
}
function zn(i) {
  var p = typeof i;
  return !!i && (p == "object" || p == "function");
}
function ao(i) {
  return !!i && typeof i == "object";
}
function lo(i) {
  return typeof i == "symbol" || ao(i) && no.call(i) == qi;
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
const uo = /* @__PURE__ */ Vi(co);
function lr(i, ...p) {
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
      for (const v of Object.keys(this.meta))
        delete this.meta[v];
      for (; this.subscriptions.length; )
        (M = this.subscriptions.pop()) == null || M.unsubscribe();
    }, this.observeMedia(lr(p.watchMedia)), this.observeResize(lr(p.shouldResetOnResize)), this.create = () => {
      var v;
      return this.context = Fe.context(Ni), [
        lr(p.enable) ?? !0,
        ((v = this.mediaQueryList) == null ? void 0 : v.matches) ?? !0
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
    return i * Fe.ticker.deltaRatio(this.referenceFramerate);
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
let Hr = xi;
Hr.resetDebounceTime = 100;
Hr.referenceFramerate = 60;
class fo {
  constructor(p) {
    const [h, M] = [p].flat();
    this.element = typeof h == "string" ? document.querySelector(h) : h, this.axis = M, this.observable = new Gi((v) => {
      const m = new ResizeObserver(
        (Z) => this.handleResize(Z, v)
      );
      return this.element && m.observe(this.element), () => m.disconnect();
    });
  }
  handleResize(p, h) {
    const M = p.find((le) => le.target === this.element);
    if (!M)
      return;
    const { inlineSize: v, blockSize: m } = M.borderBoxSize[0], Z = v !== this.inlineSize, k = m !== this.blockSize, B = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = v, this.blockSize = m, !B) {
      if (this.axis === "horizontal" && Z || this.axis === "vertical" && k)
        return h.next();
      !this.axis && (Z || k) && h.next();
    }
  }
}
class Si extends Hr {
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
            this.clientX = h.clientX, this.clientY = h.clientY, this.normalX = Fe.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Fe.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
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
   * @param frequency Shape of the resulting motion
   * @param damping Shape of settling of motion
   * @param response Acceleration of the motion
   * @param x0 Initial value
   */
  constructor(p = 1, h = 1, M = 0, v) {
    this.k1 = h / (Math.PI * p), this.k2 = 1 / (2 * Math.PI * p * (2 * Math.PI * p)), this.k3 = M * h / (2 * Math.PI * p), this.xp = v, this.y = v, this.yd = 0;
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
    const v = Math.max(this.k2, p * p / 2 + p * this.k1 / 2, p * this.k1);
    return this.y = this.y + p * this.yd, this.yd = this.yd + p * (h + this.k3 * M - this.y - this.k1 * this.yd) / v, this.y;
  }
}
var Ln = { exports: {} };
(function(i, p) {
  (function(h, M) {
    M(p);
  })(Br, function(h) {
    function M(s, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(s, t.key, t);
      }
    }
    function v(s, e, n) {
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
    var m, Z, k, B, le, Se, Je, Te, Me, lt, et, Re, Ot, Ut = function() {
      return m || typeof window < "u" && (m = window.gsap) && m.registerPlugin && m;
    }, St = 1, gt = [], x = [], X = [], ke = Date.now, ct = function(e, n) {
      return n;
    }, Ft = function() {
      var e = Me.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, x), r.push.apply(r, X), x = t, X = r, ct = function(c, a) {
        return n[c](a);
      };
    }, Tt = function(e, n) {
      return ~X.indexOf(e) && X[X.indexOf(e) + 1][n];
    }, Yt = function(e) {
      return !!~lt.indexOf(e);
    }, Ce = function(e, n, t, r, o) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!o
      });
    }, U = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, jt = "scrollLeft", Nr = "scrollTop", fn = function() {
      return et && et.isPressed || x.cache++;
    }, Wr = function(e, n) {
      var t = function r(o) {
        if (o || o === 0) {
          St && (k.history.scrollRestoration = "manual");
          var c = et && et.isPressed;
          o = r.v = Math.round(o) || (et && et.iOS ? 1 : 0), e(o), r.cacheID = x.cache, c && ct("ss", o);
        } else
          (n || x.cache !== r.cacheID || ct("ref")) && (r.cacheID = x.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Ye = {
      s: jt,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Wr(function(s) {
        return arguments.length ? k.scrollTo(s, pe.sc()) : k.pageXOffset || B[jt] || le[jt] || Se[jt] || 0;
      })
    }, pe = {
      s: Nr,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Ye,
      sc: Wr(function(s) {
        return arguments.length ? k.scrollTo(Ye.sc(), s) : k.pageYOffset || B[Nr] || le[Nr] || Se[Nr] || 0;
      })
    }, Qe = function(e) {
      return m.utils.toArray(e)[0] || (typeof e == "string" && m.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      Yt(e) && (e = B.scrollingElement || le);
      var o = x.indexOf(e), c = r === pe.sc ? 1 : 2;
      !~o && (o = x.push(e) - 1), x[o + c] || e.addEventListener("scroll", fn);
      var a = x[o + c], g = a || (x[o + c] = Wr(Tt(e, t), !0) || (Yt(e) ? r : Wr(function(C) {
        return arguments.length ? e[t] = C : e[t];
      })));
      return g.target = e, a || (g.smooth = m.getProperty(e, "scrollBehavior") === "smooth"), g;
    }, dn = function(e, n, t) {
      var r = e, o = e, c = ke(), a = c, g = n || 50, C = Math.max(500, g * 3), H = function(w, q) {
        var ie = ke();
        q || ie - c > g ? (o = r, r = w, a = c, c = ie) : t ? r += w : r = o + (w - o) / (ie - a) * (c - a);
      }, N = function() {
        o = r = t ? 0 : r, a = c = 0;
      }, b = function(w) {
        var q = a, ie = o, G = ke();
        return (w || w === 0) && w !== r && H(w), c === a || G - a > C ? 0 : (r + (t ? ie : -ie)) / ((t ? G : c) - q) * 1e3;
      };
      return {
        update: H,
        reset: N,
        getVelocity: b
      };
    }, wr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Xn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Bn = function() {
      Me = m.core.globals().ScrollTrigger, Me && Me.core && Ft();
    }, Hn = function(e) {
      return m = e || Ut(), m && typeof document < "u" && document.body && (k = window, B = document, le = B.documentElement, Se = B.body, lt = [k, B, le, Se], m.utils.clamp, Ot = m.core.context || function() {
      }, Te = "onpointerenter" in Se ? "pointer" : "mouse", Je = ce.isTouch = k.matchMedia && k.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in k || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Re = ce.eventTypes = ("ontouchstart" in le ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in le ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return St = 0;
      }, 500), Bn(), Z = 1), Z;
    };
    Ye.op = pe, x.cache = 0;
    var ce = function() {
      function s(n) {
        this.init(n);
      }
      var e = s.prototype;
      return e.init = function(t) {
        Z || Hn(m) || console.warn("Please gsap.registerPlugin(Observer)"), Me || Bn();
        var r = t.tolerance, o = t.dragMinimum, c = t.type, a = t.target, g = t.lineHeight, C = t.debounce, H = t.preventDefault, N = t.onStop, b = t.onStopDelay, f = t.ignore, w = t.wheelSpeed, q = t.event, ie = t.onDragStart, G = t.onDragEnd, Ke = t.onDrag, re = t.onPress, F = t.onRelease, Ie = t.onRight, oe = t.onLeft, P = t.onUp, Ze = t.onDown, bt = t.onChangeX, O = t.onChangeY, Pe = t.onChange, E = t.onToggleX, At = t.onToggleY, Oe = t.onHover, Ne = t.onHoverEnd, We = t.onMove, V = t.ignoreCheck, he = t.isNormalizer, ue = t.onGestureStart, l = t.onGestureEnd, ge = t.onWheel, nr = t.onEnable, Nt = t.onDisable, dt = t.onClick, Wt = t.scrollSpeed, j = t.capture, ze = t.allowClicks, Ge = t.lockAxis, Rr = t.onLockAxis;
        this.target = a = Qe(a) || le, this.vars = t, f && (f = m.utils.toArray(f)), r = r || 1e-9, o = o || 0, w = w || 1, Wt = Wt || 1, c = c || "wheel,touch,pointer", C = C !== !1, g || (g = parseFloat(k.getComputedStyle(Se).lineHeight) || 22);
        var it, pt, Y, me, ot, kt, Ve, u = this, It = 0, K = 0, Gt = Xt(a, Ye), Vt = Xt(a, pe), _r = Gt(), $e = Vt(), Ar = ~c.indexOf("touch") && !~c.indexOf("pointer") && Re[0] === "pointerdown", $t = Yt(a), se = a.ownerDocument || B, st = [0, 0, 0], qe = [0, 0, 0], Ir = 0, Ue = function() {
          return Ir = ke();
        }, Ct = function(S, d) {
          return (u.event = S) && f && ~f.indexOf(S.target) || d && Ar && S.pointerType !== "touch" || V && V(S, d);
        }, zr = function() {
          u._vx.reset(), u._vy.reset(), pt.pause(), N && N(u);
        }, qt = function() {
          var S = u.deltaX = Xn(st), d = u.deltaY = Xn(qe), y = Math.abs(S) >= r, T = Math.abs(d) >= r;
          Pe && (y || T) && Pe(u, S, d, st, qe), y && (Ie && u.deltaX > 0 && Ie(u), oe && u.deltaX < 0 && oe(u), bt && bt(u), E && u.deltaX < 0 != It < 0 && E(u), It = u.deltaX, st[0] = st[1] = st[2] = 0), T && (Ze && u.deltaY > 0 && Ze(u), P && u.deltaY < 0 && P(u), O && O(u), At && u.deltaY < 0 != K < 0 && At(u), K = u.deltaY, qe[0] = qe[1] = qe[2] = 0), (me || Y) && (We && We(u), Y && (Ke(u), Y = !1), me = !1), kt && !(kt = !1) && Rr && Rr(u), ot && (ge(u), ot = !1), it = 0;
        }, vr = function(S, d, y) {
          st[y] += S, qe[y] += d, u._vx.update(S), u._vy.update(d), C ? it || (it = requestAnimationFrame(qt)) : qt();
        }, ir = function(S, d) {
          Ge && !Ve && (u.axis = Ve = Math.abs(S) > Math.abs(d) ? "x" : "y", kt = !0), Ve !== "y" && (st[2] += S, u._vx.update(S, !0)), Ve !== "x" && (qe[2] += d, u._vy.update(d, !0)), C ? it || (it = requestAnimationFrame(qt)) : qt();
        }, or = function(S) {
          if (!Ct(S, 1)) {
            S = wr(S, H);
            var d = S.clientX, y = S.clientY, T = d - u.x, R = y - u.y, be = u.isDragging;
            u.x = d, u.y = y, (be || Math.abs(u.startX - d) >= o || Math.abs(u.startY - y) >= o) && (Ke && (Y = !0), be || (u.isDragging = !0), ir(T, R), be || ie && ie(u));
          }
        }, z = u.onPress = function(D) {
          Ct(D, 1) || D && D.button || (u.axis = Ve = null, pt.pause(), u.isPressed = !0, D = wr(D), It = K = 0, u.startX = u.x = D.clientX, u.startY = u.y = D.clientY, u._vx.reset(), u._vy.reset(), Ce(he ? a : se, Re[1], or, H, !0), u.deltaX = u.deltaY = 0, re && re(u));
        }, zt = u.onRelease = function(D) {
          if (!Ct(D, 1)) {
            U(he ? a : se, Re[1], or, !0);
            var S = !isNaN(u.y - u.startY), d = u.isDragging && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), y = wr(D);
            !d && S && (u._vx.reset(), u._vy.reset(), H && ze && m.delayedCall(0.08, function() {
              if (ke() - Ir > 300 && !D.defaultPrevented) {
                if (D.target.click)
                  D.target.click();
                else if (se.createEvent) {
                  var T = se.createEvent("MouseEvents");
                  T.initMouseEvent("click", !0, !0, k, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), D.target.dispatchEvent(T);
                }
              }
            })), u.isDragging = u.isGesturing = u.isPressed = !1, N && !he && pt.restart(!0), G && d && G(u), F && F(u, d);
          }
        }, wt = function(S) {
          return S.touches && S.touches.length > 1 && (u.isGesturing = !0) && ue(S, u.isDragging);
        }, yt = function() {
          return (u.isGesturing = !1) || l(u);
        }, ht = function(S) {
          if (!Ct(S)) {
            var d = Gt(), y = Vt();
            vr((d - _r) * Wt, (y - $e) * Wt, 1), _r = d, $e = y, N && pt.restart(!0);
          }
        }, xt = function(S) {
          if (!Ct(S)) {
            S = wr(S, H), ge && (ot = !0);
            var d = (S.deltaMode === 1 ? g : S.deltaMode === 2 ? k.innerHeight : 1) * w;
            vr(S.deltaX * d, S.deltaY * d, 0), N && !he && pt.restart(!0);
          }
        }, sr = function(S) {
          if (!Ct(S)) {
            var d = S.clientX, y = S.clientY, T = d - u.x, R = y - u.y;
            u.x = d, u.y = y, me = !0, (T || R) && ir(T, R);
          }
        }, mr = function(S) {
          u.event = S, Oe(u);
        }, Lt = function(S) {
          u.event = S, Ne(u);
        }, Lr = function(S) {
          return Ct(S) || wr(S, H) && dt(u);
        };
        pt = u._dc = m.delayedCall(b || 0.25, zr).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = Gt, u.scrollY = Vt, u.isDragging = u.isGesturing = u.isPressed = !1, Ot(this), u.enable = function(D) {
          return u.isEnabled || (Ce($t ? se : a, "scroll", fn), c.indexOf("scroll") >= 0 && Ce($t ? se : a, "scroll", ht, H, j), c.indexOf("wheel") >= 0 && Ce(a, "wheel", xt, H, j), (c.indexOf("touch") >= 0 && Je || c.indexOf("pointer") >= 0) && (Ce(a, Re[0], z, H, j), Ce(se, Re[2], zt), Ce(se, Re[3], zt), ze && Ce(a, "click", Ue, !1, !0), dt && Ce(a, "click", Lr), ue && Ce(se, "gesturestart", wt), l && Ce(se, "gestureend", yt), Oe && Ce(a, Te + "enter", mr), Ne && Ce(a, Te + "leave", Lt), We && Ce(a, Te + "move", sr)), u.isEnabled = !0, D && D.type && z(D), nr && nr(u)), u;
        }, u.disable = function() {
          u.isEnabled && (gt.filter(function(D) {
            return D !== u && Yt(D.target);
          }).length || U($t ? se : a, "scroll", fn), u.isPressed && (u._vx.reset(), u._vy.reset(), U(he ? a : se, Re[1], or, !0)), U($t ? se : a, "scroll", ht, j), U(a, "wheel", xt, j), U(a, Re[0], z, j), U(se, Re[2], zt), U(se, Re[3], zt), U(a, "click", Ue, !0), U(a, "click", Lr), U(se, "gesturestart", wt), U(se, "gestureend", yt), U(a, Te + "enter", mr), U(a, Te + "leave", Lt), U(a, Te + "move", sr), u.isEnabled = u.isPressed = u.isDragging = !1, Nt && Nt(u));
        }, u.kill = u.revert = function() {
          u.disable();
          var D = gt.indexOf(u);
          D >= 0 && gt.splice(D, 1), et === u && (et = 0);
        }, gt.push(u), he && Yt(a) && (et = u), u.enable(q);
      }, v(s, [{
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
    ce.version = "3.11.5", ce.create = function(s) {
      return new ce(s);
    }, ce.register = Hn, ce.getAll = function() {
      return gt.slice();
    }, ce.getById = function(s) {
      return gt.filter(function(e) {
        return e.vars.id === s;
      })[0];
    }, Ut() && m.registerPlugin(ce);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var _, cr, L, Q, _t, te, Nn, Gr, Vr, ur, $r, qr, Ae, Ur, pn, Xe, Wn, Gn, fr, Vn, hn, $n, tt, qn, Un, jn, Bt, gn, _n, vn, jr = 1, Be = Date.now, mn = Be(), ut = 0, yr = 0, Ci = function s() {
      return yr && requestAnimationFrame(s);
    }, Qn = function() {
      return Ur = 1;
    }, Kn = function() {
      return Ur = 0;
    }, Mt = function(e) {
      return e;
    }, xr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Zn = function() {
      return typeof window < "u";
    }, Jn = function() {
      return _ || Zn() && (_ = window.gsap) && _.registerPlugin && _;
    }, Qt = function(e) {
      return !!~Nn.indexOf(e);
    }, ei = function(e) {
      return Tt(e, "getBoundingClientRect") || (Qt(e) ? function() {
        return cn.width = L.innerWidth, cn.height = L.innerHeight, cn;
      } : function() {
        return Dt(e);
      });
    }, Ei = function(e, n, t) {
      var r = t.d, o = t.d2, c = t.a;
      return (c = Tt(e, "getBoundingClientRect")) ? function() {
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
      return Math.max(0, (t = "scroll" + r) && (c = Tt(e, t)) ? c() - ei(e)()[o] : Qt(e) ? (_t[t] || te[t]) - (L["inner" + r] || _t["client" + r] || te["client" + r]) : e[t] - e["offset" + r]);
    }, Qr = function(e, n) {
      for (var t = 0; t < fr.length; t += 3)
        (!n || ~n.indexOf(fr[t + 1])) && e(fr[t], fr[t + 1], fr[t + 2]);
    }, vt = function(e) {
      return typeof e == "string";
    }, He = function(e) {
      return typeof e == "function";
    }, Sr = function(e) {
      return typeof e == "number";
    }, Kr = function(e) {
      return typeof e == "object";
    }, Tr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, bn = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, dr = Math.abs, ti = "left", ri = "top", wn = "right", yn = "bottom", Kt = "width", Zt = "height", Mr = "Right", kr = "Left", Cr = "Top", Er = "Bottom", ne = "padding", ft = "margin", pr = "Width", xn = "Height", Ee = "px", mt = function(e) {
      return L.getComputedStyle(e);
    }, Oi = function(e) {
      var n = mt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ni = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Dt = function(e, n) {
      var t = n && mt(e)[pn] !== "matrix(1, 0, 0, 1, 0, 0)" && _.to(e, {
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
      if (vt(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in tn ? tn[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, nn = function(e, n, t, r, o, c, a, g) {
      var C = o.startColor, H = o.endColor, N = o.fontSize, b = o.indent, f = o.fontWeight, w = Q.createElement("div"), q = Qt(t) || Tt(t, "pinType") === "fixed", ie = e.indexOf("scroller") !== -1, G = q ? te : t, Ke = e.indexOf("start") !== -1, re = Ke ? C : H, F = "border-color:" + re + ";font-size:" + N + ";color:" + re + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return F += "position:" + ((ie || g) && q ? "fixed;" : "absolute;"), (ie || g || !q) && (F += (r === pe ? wn : yn) + ":" + (c + parseFloat(b)) + "px;"), a && (F += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), w._isStart = Ke, w.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), w.style.cssText = F, w.innerText = n || n === 0 ? e + "-" + n : e, G.children[0] ? G.insertBefore(w, G.children[0]) : G.appendChild(w), w._offset = w["offset" + r.op.d2], on(w, 0, r, Ke), w;
    }, on = function(e, n, t, r) {
      var o = {
        display: "block"
      }, c = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
      e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + c + pr] = 1, o["border" + a + pr] = 0, o[t.p] = n + "px", _.set(e, o);
    }, A = [], Mn = {}, Pr, si = function() {
      return Be() - ut > 34 && (Pr || (Pr = requestAnimationFrame(Rt)));
    }, hr = function() {
      (!tt || !tt.isPressed || tt.startX > te.clientWidth) && (x.cache++, tt ? Pr || (Pr = requestAnimationFrame(Rt)) : Rt(), ut || er("scrollStart"), ut = Be());
    }, kn = function() {
      jn = L.innerWidth, Un = L.innerHeight;
    }, Or = function() {
      x.cache++, !Ae && !$n && !Q.fullscreenElement && !Q.webkitFullscreenElement && (!qn || jn !== L.innerWidth || Math.abs(L.innerHeight - Un) > L.innerHeight * 0.25) && Gr.restart(!0);
    }, Jt = {}, Ai = [], ai = function s() {
      return ve(I, "scrollEnd", s) || rr(!0);
    }, er = function(e) {
      return Jt[e] && Jt[e].map(function(n) {
        return n();
      }) || Ai;
    }, rt = [], li = function(e) {
      for (var n = 0; n < rt.length; n += 5)
        (!e || rt[n + 4] && rt[n + 4].query === e) && (rt[n].style.cssText = rt[n + 1], rt[n].getBBox && rt[n].setAttribute("transform", rt[n + 2] || ""), rt[n + 3].uncache = 1);
    }, Cn = function(e, n) {
      var t;
      for (Xe = 0; Xe < A.length; Xe++)
        t = A[Xe], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || er("revert");
    }, ci = function(e, n) {
      x.cache++, (n || !nt) && x.forEach(function(t) {
        return He(t) && t.cacheID++ && (t.rec = 0);
      }), vt(e) && (L.history.scrollRestoration = _n = e);
    }, nt, tr = 0, ui, Ii = function() {
      if (ui !== tr) {
        var e = ui = tr;
        requestAnimationFrame(function() {
          return e === tr && rr(!0);
        });
      }
    }, rr = function(e, n) {
      if (ut && !e) {
        _e(I, "scrollEnd", ai);
        return;
      }
      nt = I.isRefreshing = !0, x.forEach(function(r) {
        return He(r) && r.cacheID++ && (r.rec = r());
      });
      var t = er("refreshInit");
      Vn && I.sort(), n || Cn(), x.forEach(function(r) {
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
      }), ci(_n, 1), Gr.pause(), tr++, nt = 2, Rt(2), A.forEach(function(r) {
        return He(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), nt = I.isRefreshing = !1, er("refresh");
    }, En = 0, sn = 1, Dr, Rt = function(e) {
      if (!nt || e === 2) {
        I.isUpdating = !0, Dr && Dr.update(0);
        var n = A.length, t = Be(), r = t - mn >= 50, o = n && A[0].scroll();
        if (sn = En > o ? -1 : 1, nt || (En = o), r && (ut && !Ur && t - ut > 200 && (ut = 0, er("scrollEnd")), $r = mn, mn = t), sn < 0) {
          for (Xe = n; Xe-- > 0; )
            A[Xe] && A[Xe].update(0, r);
          sn = 1;
        } else
          for (Xe = 0; Xe < n; Xe++)
            A[Xe] && A[Xe].update(0, r);
        I.isUpdating = !1;
      }
      Pr = 0;
    }, Pn = [ti, ri, yn, wn, ft + Er, ft + Mr, ft + Cr, ft + kr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], an = Pn.concat([Kt, Zt, "boxSizing", "max" + pr, "max" + xn, "position", ft, ne, ne + Cr, ne + Mr, ne + Er, ne + kr]), zi = function(e, n, t) {
      gr(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        gr(r.spacerState);
      else if (e._gsap.swappedIn) {
        var o = n.parentNode;
        o && (o.insertBefore(e, n), o.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, On = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var o = Pn.length, c = n.style, a = e.style, g; o--; )
          g = Pn[o], c[g] = t[g];
        c.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (c.display = "inline-block"), a[yn] = a[wn] = "auto", c.flexBasis = t.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Kt] = Sn(e, Ye) + Ee, c[Zt] = Sn(e, pe) + Ee, c[ne] = a[ft] = a[ri] = a[ti] = "0", gr(r), a[Kt] = a["max" + pr] = t[Kt], a[Zt] = a["max" + xn] = t[Zt], a[ne] = t[ne], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Li = /([A-Z])/g, gr = function(e) {
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
      He(e) && (e = e(g)), vt(e) && e.substr(0, 3) === "max" && (e = b + (e.charAt(4) === "=" ? rn("0" + e.substr(3), t) : 0));
      var w = f ? f.time() : 0, q, ie, G;
      if (f && f.seek(0), Sr(e))
        f && (e = _.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, b, e)), a && on(a, t, r, !0);
      else {
        He(n) && (n = n(g));
        var Ke = (e || "0").split(" "), re, F, Ie, oe;
        G = Qe(n) || te, re = Dt(G) || {}, (!re || !re.left && !re.top) && mt(G).display === "none" && (oe = G.style.display, G.style.display = "block", re = Dt(G), oe ? G.style.display = oe : G.style.removeProperty("display")), F = rn(Ke[0], re[r.d]), Ie = rn(Ke[1] || "0", t), e = re[r.p] - C[r.p] - H + F + o - Ie, a && on(a, Ie, r, t - Ie < 20 || a._isStart && Ie > 20), t -= t - Ie;
      }
      if (c) {
        var P = e + t, Ze = c._isStart;
        q = "scroll" + r.d2, on(c, P, r, Ze && P > 20 || !Ze && (N ? Math.max(te[q], _t[q]) : c.parentNode[q]) <= P + 1), N && (C = Dt(a), N && (c.style[r.op.p] = C[r.op.p] - r.op.m - c._offset + Ee));
      }
      return f && G && (q = Dt(G), f.seek(b), ie = Dt(G), f._caScrollDist = q[r.p] - ie[r.p], e = e / f._caScrollDist * b), f && f.seek(w), f ? e : Math.round(e);
    }, Yi = /(webkit|moz|length|cssText|inset)/i, di = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var o = e.style, c, a;
        if (n === te) {
          e._stOrig = o.cssText, a = mt(e);
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
        var q = pi(t, C, function() {
          b.kill(), c.tween = 0;
        });
        return N = H && N || 0, H = H || a - C, b && b.kill(), g[r] = a, g.modifiers = w, w[r] = function() {
          return q(C + H * b.ratio + N * b.ratio * b.ratio);
        }, g.onUpdate = function() {
          x.cache++, Rt();
        }, g.onComplete = function() {
          c.tween = 0, f && f.call(b);
        }, b = c.tween = _.to(e, g), b;
      };
      return e[r] = t, t.wheelHandler = function() {
        return o.tween && o.tween.kill() && (o.tween = 0);
      }, _e(e, "wheel", t.wheelHandler), I.isTouch && _e(e, "touchmove", t.wheelHandler), o;
    }, I = function() {
      function s(n, t) {
        cr || s.register(_) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = s.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !yr) {
          this.update = this.refresh = this.kill = Mt;
          return;
        }
        t = ni(vt(t) || Sr(t) || t.nodeType ? {
          trigger: t
        } : t, en);
        var o = t, c = o.onUpdate, a = o.toggleClass, g = o.id, C = o.onToggle, H = o.onRefresh, N = o.scrub, b = o.trigger, f = o.pin, w = o.pinSpacing, q = o.invalidateOnRefresh, ie = o.anticipatePin, G = o.onScrubComplete, Ke = o.onSnapComplete, re = o.once, F = o.snap, Ie = o.pinReparent, oe = o.pinSpacer, P = o.containerAnimation, Ze = o.fastScrollEnd, bt = o.preventOverlaps, O = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ye : pe, Pe = !N && N !== 0, E = Qe(t.scroller || L), At = _.core.getCache(E), Oe = Qt(E), Ne = ("pinType" in t ? t.pinType : Tt(E, "pinType") || Oe && "fixed") === "fixed", We = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], V = Pe && t.toggleActions.split(" "), he = "markers" in t ? t.markers : en.markers, ue = Oe ? 0 : parseFloat(mt(E)["border" + O.p2 + pr]) || 0, l = this, ge = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, nr = Ei(E, Oe, O), Nt = Pi(E, Oe), dt = 0, Wt = 0, j = Xt(E, O), ze, Ge, Rr, it, pt, Y, me, ot, kt, Ve, u, It, K, Gt, Vt, _r, $e, Ar, $t, se, st, qe, Ir, Ue, Ct, zr, qt, vr, ir, or, z, zt, wt, yt, ht, xt, sr, mr, Lt;
        if (gn(l), l._dir = O, ie *= 45, l.scroller = E, l.scroll = P ? P.time.bind(P) : j, it = j(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Vn = 1, t.refreshPriority === -9999 && (Dr = l)), At.tweenScroll = At.tweenScroll || {
          top: hi(E, pe),
          left: hi(E, Ye)
        }, l.tweenTo = ze = At.tweenScroll[O.p], l.scrubDuration = function(d) {
          zt = Sr(d) && d, zt ? z ? z.duration(d) : z = _.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: zt,
            paused: !0,
            onComplete: function() {
              return G && G(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(N), z && z.resetTo && z.resetTo("totalProgress", 0), ir = 0, g || (g = r.vars.id)), A.push(l), F && ((!Kr(F) || F.push) && (F = {
          snapTo: F
        }), "scrollBehavior" in te.style && _.set(Oe ? [te, _t] : E, {
          scrollBehavior: "auto"
        }), x.forEach(function(d) {
          return He(d) && d.target === (Oe ? Q.scrollingElement || _t : E) && (d.smooth = !1);
        }), Rr = He(F.snapTo) ? F.snapTo : F.snapTo === "labels" ? Di(r) : F.snapTo === "labelsDirectional" ? Ri(r) : F.directional !== !1 ? function(d, y) {
          return Tn(F.snapTo)(d, Be() - Wt < 500 ? 0 : y.direction);
        } : _.utils.snap(F.snapTo), wt = F.duration || {
          min: 0.1,
          max: 2
        }, wt = Kr(wt) ? ur(wt.min, wt.max) : ur(wt, wt), yt = _.delayedCall(F.delay || zt / 2 || 0.1, function() {
          var d = j(), y = Be() - Wt < 500, T = ze.tween;
          if ((y || Math.abs(l.getVelocity()) < 10) && !T && !Ur && dt !== d) {
            var R = (d - Y) / K, be = r && !Pe ? r.totalProgress() : R, W = y ? 0 : (be - or) / (Be() - $r) * 1e3 || 0, J = _.utils.clamp(-R, 1 - R, dr(W / 2) * W / 0.185), De = R + (F.inertia === !1 ? 0 : J), we = ur(0, 1, Rr(De, l)), fe = Math.round(Y + we * K), ee = F, at = ee.onStart, je = ee.onInterrupt, ye = ee.onComplete;
            if (d <= me && d >= Y && fe !== d) {
              if (T && !T._initted && T.data <= dr(fe - d))
                return;
              F.inertia === !1 && (J = we - R), ze(fe, {
                duration: wt(dr(Math.max(dr(De - be), dr(we - be)) * 0.185 / W / 0.05 || 0)),
                ease: F.ease || "power3",
                data: dr(fe - d),
                onInterrupt: function() {
                  return yt.restart(!0) && je && je(l);
                },
                onComplete: function() {
                  l.update(), dt = j(), ir = or = r && !Pe ? r.totalProgress() : l.progress, Ke && Ke(l), ye && ye(l);
                }
              }, d, J * K, fe - d - J * K), at && at(l, ze.tween);
            }
          } else
            l.isActive && dt !== d && yt.restart(!0);
        }).pause()), g && (Mn[g] = l), b = l.trigger = Qe(b || f), Lt = b && b._gsap && b._gsap.stRevert, Lt && (Lt = Lt(l)), f = f === !0 ? b : Qe(f), vt(a) && (a = {
          targets: b,
          className: a
        }), f && (w === !1 || w === ft || (w = !w && f.parentNode && f.parentNode.style && mt(f.parentNode).display === "flex" ? !1 : ne), l.pin = f, Ge = _.core.getCache(f), Ge.spacer ? Gt = Ge.pinState : (oe && (oe = Qe(oe), oe && !oe.nodeType && (oe = oe.current || oe.nativeElement), Ge.spacerIsNative = !!oe, oe && (Ge.spacerState = ln(oe))), Ge.spacer = $e = oe || Q.createElement("div"), $e.classList.add("pin-spacer"), g && $e.classList.add("pin-spacer-" + g), Ge.pinState = Gt = ln(f)), t.force3D !== !1 && _.set(f, {
          force3D: !0
        }), l.spacer = $e = Ge.spacer, vr = mt(f), Ir = vr[w + O.os2], $t = _.getProperty(f), se = _.quickSetter(f, O.a, Ee), On(f, $e, vr), _r = ln(f)), he) {
          It = Kr(he) ? ni(he, oi) : oi, Ve = nn("scroller-start", g, E, O, It, 0), u = nn("scroller-end", g, E, O, It, 0, Ve), Ar = Ve["offset" + O.op.d2];
          var Lr = Qe(Tt(E, "content") || E);
          ot = this.markerStart = nn("start", g, Lr, O, It, Ar, 0, P), kt = this.markerEnd = nn("end", g, Lr, O, It, Ar, 0, P), P && (mr = _.quickSetter([ot, kt], O.a, Ee)), !Ne && !(X.length && Tt(E, "fixedMarkers") === !0) && (Oi(Oe ? te : E), _.set([Ve, u], {
            force3D: !0
          }), Ct = _.quickSetter(Ve, O.a, Ee), qt = _.quickSetter(u, O.a, Ee));
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
          var T = d !== !1 || !l.enabled, R = Ae;
          T !== l.isReverted && (T && (xt = Math.max(j(), l.scroll.rec || 0), ht = l.progress, sr = r && r.progress()), ot && [ot, kt, Ve, u].forEach(function(be) {
            return be.style.display = T ? "none" : "block";
          }), T && (Ae = l, l.update(T)), f && (!Ie || !l.isActive) && (T ? zi(f, $e, Gt) : On(f, $e, mt(f), Ue)), T || l.update(T), Ae = R, l.isReverted = T);
        }, l.refresh = function(d, y) {
          if (!((Ae || !l.enabled) && !y)) {
            if (f && d && ut) {
              _e(s, "scrollEnd", ai);
              return;
            }
            !nt && ge && ge(l), Ae = l, Wt = Be(), ze.tween && (ze.tween.kill(), ze.tween = 0), z && z.pause(), q && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var T = nr(), R = Nt(), be = P ? P.duration() : Ht(E, O), W = K <= 0.01, J = 0, De = 0, we = t.end, fe = t.endTrigger || b, ee = t.start || (t.start === 0 || !b ? 0 : f ? "0 0" : "0 100%"), at = l.pinnedContainer = t.pinnedContainer && Qe(t.pinnedContainer), je = b && Math.max(0, A.indexOf(l)) || 0, ye = je, ae, Le, br, ar, de, xe, Et, Rn, bi, Fr, Pt; ye--; )
              xe = A[ye], xe.end || xe.refresh(0, 1) || (Ae = l), Et = xe.pin, Et && (Et === b || Et === f || Et === at) && !xe.isReverted && (Fr || (Fr = []), Fr.unshift(xe), xe.revert(!0, !0)), xe !== A[ye] && (je--, ye--);
            for (He(ee) && (ee = ee(l)), Y = fi(ee, b, T, O, j(), ot, Ve, l, R, ue, Ne, be, P) || (f ? -1e-3 : 0), He(we) && (we = we(l)), vt(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (vt(ee) ? ee.split(" ")[0] : "") + we : (J = rn(we.substr(2), T), we = vt(ee) ? ee : (P ? _.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, Y) : Y) + J, fe = b)), me = Math.max(Y, fi(we || (fe ? "100% 0" : be), fe, T, O, j() + J, kt, u, l, R, ue, Ne, be, P)) || -1e-3, K = me - Y || (Y -= 0.01) && 1e-3, J = 0, ye = je; ye--; )
              xe = A[ye], Et = xe.pin, Et && xe.start - xe._pinPush <= Y && !P && xe.end > 0 && (ae = xe.end - xe.start, (Et === b && xe.start - xe._pinPush < Y || Et === at) && !Sr(ee) && (J += ae * (1 - xe.progress)), Et === f && (De += ae));
            if (Y += J, me += J, W && (ht = _.utils.clamp(0, 1, _.utils.normalize(Y, me, xt))), l._pinPush = De, ot && J && (ae = {}, ae[O.a] = "+=" + J, at && (ae[O.p] = "-=" + j()), _.set([ot, kt], ae)), f)
              ae = mt(f), ar = O === pe, br = j(), st = parseFloat($t(O.a)) + De, !be && me > 1 && (Pt = (Oe ? Q.scrollingElement || _t : E).style, Pt = {
                style: Pt,
                value: Pt["overflow" + O.a.toUpperCase()]
              }, Pt.style["overflow" + O.a.toUpperCase()] = "scroll"), On(f, $e, ae), _r = ln(f), Le = Dt(f, !0), Rn = Ne && Xt(E, ar ? Ye : pe)(), w && (Ue = [w + O.os2, K + De + Ee], Ue.t = $e, ye = w === ne ? Sn(f, O) + K + De : 0, ye && Ue.push(O.d, ye + Ee), gr(Ue), at && A.forEach(function(Yr) {
                Yr.pin === at && Yr.vars.pinSpacing !== !1 && (Yr._subPinOffset = !0);
              }), Ne && j(xt)), Ne && (de = {
                top: Le.top + (ar ? br - Y : Rn) + Ee,
                left: Le.left + (ar ? Rn : br - Y) + Ee,
                boxSizing: "border-box",
                position: "fixed"
              }, de[Kt] = de["max" + pr] = Math.ceil(Le.width) + Ee, de[Zt] = de["max" + xn] = Math.ceil(Le.height) + Ee, de[ft] = de[ft + Cr] = de[ft + Mr] = de[ft + Er] = de[ft + kr] = "0", de[ne] = ae[ne], de[ne + Cr] = ae[ne + Cr], de[ne + Mr] = ae[ne + Mr], de[ne + Er] = ae[ne + Er], de[ne + kr] = ae[ne + kr], Vt = Fi(Gt, de, Ie), nt && j(0)), r ? (bi = r._initted, hn(1), r.render(r.duration(), !0, !0), qe = $t(O.a) - st + K + De, zr = Math.abs(K - qe) > 1, Ne && zr && Vt.splice(Vt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), hn(0)) : qe = K, Pt && (Pt.value ? Pt.style["overflow" + O.a.toUpperCase()] = Pt.value : Pt.style.removeProperty("overflow-" + O.a));
            else if (b && j() && !P)
              for (Le = b.parentNode; Le && Le !== te; )
                Le._pinOffset && (Y -= Le._pinOffset, me -= Le._pinOffset), Le = Le.parentNode;
            Fr && Fr.forEach(function(Yr) {
              return Yr.revert(!1, !0);
            }), l.start = Y, l.end = me, it = pt = nt ? xt : j(), !P && !nt && (it < xt && j(xt), l.scroll.rec = 0), l.revert(!1, !0), yt && (dt = -1, l.isActive && j(Y + K * ht), yt.restart(!0)), Ae = 0, r && Pe && (r._initted || sr) && r.progress() !== sr && r.progress(sr, !0).render(r.time(), !0, !0), (W || ht !== l.progress || P) && (r && !Pe && r.totalProgress(P && Y < -1e-3 && !ht ? _.utils.normalize(Y, me, 0) : ht, !0), l.progress = (it - Y) / K === ht ? 0 : ht), f && w && ($e._pinOffset = Math.round(l.progress * qe)), z && z.invalidate(), H && !nt && H(l);
          }
        }, l.getVelocity = function() {
          return (j() - pt) / (Be() - $r) * 1e3 || 0;
        }, l.endAnimation = function() {
          Tr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? Pe || Tr(r, l.direction < 0, 1) : Tr(r, r.reversed()));
        }, l.labelToScroll = function(d) {
          return r && r.labels && (Y || l.refresh() || Y) + r.labels[d] / r.duration() * K || 0;
        }, l.getTrailing = function(d) {
          var y = A.indexOf(l), T = l.direction > 0 ? A.slice(0, y).reverse() : A.slice(y + 1);
          return (vt(d) ? T.filter(function(R) {
            return R.vars.preventOverlaps === d;
          }) : T).filter(function(R) {
            return l.direction > 0 ? R.end <= Y : R.start >= me;
          });
        }, l.update = function(d, y, T) {
          if (!(P && !T && !d)) {
            var R = nt === !0 ? xt : l.scroll(), be = d ? 0 : (R - Y) / K, W = be < 0 ? 0 : be > 1 ? 1 : be || 0, J = l.progress, De, we, fe, ee, at, je, ye, ae;
            if (y && (pt = it, it = P ? j() : R, F && (or = ir, ir = r && !Pe ? r.totalProgress() : W)), ie && !W && f && !Ae && !jr && ut && Y < R + (R - pt) / (Be() - $r) * ie && (W = 1e-4), W !== J && l.enabled) {
              if (De = l.isActive = !!W && W < 1, we = !!J && J < 1, je = De !== we, at = je || !!W != !!J, l.direction = W > J ? 1 : -1, l.progress = W, at && !Ae && (fe = W && !J ? 0 : W === 1 ? 1 : J === 1 ? 2 : 3, Pe && (ee = !je && V[fe + 1] !== "none" && V[fe + 1] || V[fe], ae = r && (ee === "complete" || ee === "reset" || ee in r))), bt && (je || ae) && (ae || N || !r) && (He(bt) ? bt(l) : l.getTrailing(bt).forEach(function(de) {
                return de.endAnimation();
              })), Pe || (z && !Ae && !jr ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", W, r._tTime / r._tDur) : (z.vars.totalProgress = W, z.invalidate().restart())) : r && r.totalProgress(W, !!Ae)), f) {
                if (d && w && ($e.style[w + O.os2] = Ir), !Ne)
                  se(xr(st + qe * W));
                else if (at) {
                  if (ye = !d && W > J && me + 1 > R && R + 1 >= Ht(E, O), Ie)
                    if (!d && (De || ye)) {
                      var Le = Dt(f, !0), br = R - Y;
                      di(f, te, Le.top + (O === pe ? br : 0) + Ee, Le.left + (O === pe ? 0 : br) + Ee);
                    } else
                      di(f, $e);
                  gr(De || ye ? Vt : _r), zr && W < 1 && De || se(st + (W === 1 && !ye ? qe : 0));
                }
              }
              F && !ze.tween && !Ae && !jr && yt.restart(!0), a && (je || re && W && (W < 1 || !vn)) && Vr(a.targets).forEach(function(de) {
                return de.classList[De || re ? "add" : "remove"](a.className);
              }), c && !Pe && !d && c(l), at && !Ae ? (Pe && (ae && (ee === "complete" ? r.pause().totalProgress(1) : ee === "reset" ? r.restart(!0).pause() : ee === "restart" ? r.restart(!0) : r[ee]()), c && c(l)), (je || !vn) && (C && je && bn(l, C), We[fe] && bn(l, We[fe]), re && (W === 1 ? l.kill(!1, 1) : We[fe] = 0), je || (fe = W === 1 ? 1 : 3, We[fe] && bn(l, We[fe]))), Ze && !De && Math.abs(l.getVelocity()) > (Sr(Ze) ? Ze : 2500) && (Tr(l.callbackAnimation), z ? z.progress(1) : Tr(r, ee === "reverse" ? 1 : !W, 1))) : Pe && c && !Ae && c(l);
            }
            if (qt) {
              var ar = P ? R / P.duration() * (P._caScrollDist || 0) : R;
              Ct(ar + (Ve._isFlipped ? 1 : 0)), qt(ar);
            }
            mr && mr(-R / P.duration() * (P._caScrollDist || 0));
          }
        }, l.enable = function(d, y) {
          l.enabled || (l.enabled = !0, _e(E, "resize", Or), _e(Oe ? Q : E, "scroll", hr), ge && _e(s, "refreshInit", ge), d !== !1 && (l.progress = ht = 0, it = pt = dt = j()), y !== !1 && l.refresh());
        }, l.getTween = function(d) {
          return d && ze ? ze.tween : z;
        }, l.setPositions = function(d, y) {
          f && (st += d - Y, qe += y - d - K, w === ne && l.adjustPinSpacing(y - d - K)), l.start = Y = d, l.end = me = y, K = y - d, l.update();
        }, l.adjustPinSpacing = function(d) {
          if (Ue && d) {
            var y = Ue.indexOf(O.d) + 1;
            Ue[y] = parseFloat(Ue[y]) + d + Ee, Ue[1] = parseFloat(Ue[1]) + d + Ee, gr(Ue);
          }
        }, l.disable = function(d, y) {
          if (l.enabled && (d !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, y || z && z.pause(), xt = 0, Ge && (Ge.uncache = 1), ge && ve(s, "refreshInit", ge), yt && (yt.pause(), ze.tween && ze.tween.kill() && (ze.tween = 0)), !Oe)) {
            for (var T = A.length; T--; )
              if (A[T].scroller === E && A[T] !== l)
                return;
            ve(E, "resize", Or), ve(E, "scroll", hr);
          }
        }, l.kill = function(d, y) {
          l.disable(d, y), z && !y && z.kill(), g && delete Mn[g];
          var T = A.indexOf(l);
          T >= 0 && A.splice(T, 1), T === Xe && sn > 0 && Xe--, T = 0, A.forEach(function(R) {
            return R.scroller === l.scroller && (T = 1);
          }), T || nt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
            kill: !1
          }), y || r.kill()), ot && [ot, kt, Ve, u].forEach(function(R) {
            return R.parentNode && R.parentNode.removeChild(R);
          }), Dr === l && (Dr = 0), f && (Ge && (Ge.uncache = 1), T = 0, A.forEach(function(R) {
            return R.pin === f && T++;
          }), T || (Ge.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Lt && Lt(l), !r || !r.add || K ? l.refresh() : _.delayedCall(0.01, function() {
          return Y || me || l.refresh();
        }) && (K = 0.01) && (Y = me = 0), f && Ii();
      }, s.register = function(t) {
        return cr || (_ = t || Jn(), Zn() && window.document && s.enable(), cr = yr), cr;
      }, s.defaults = function(t) {
        if (t)
          for (var r in t)
            en[r] = t[r];
        return en;
      }, s.disable = function(t, r) {
        yr = 0, A.forEach(function(c) {
          return c[r ? "kill" : "disable"](t);
        }), ve(L, "wheel", hr), ve(Q, "scroll", hr), clearInterval(qr), ve(Q, "touchcancel", Mt), ve(te, "touchstart", Mt), Zr(ve, Q, "pointerdown,touchstart,mousedown", Qn), Zr(ve, Q, "pointerup,touchend,mouseup", Kn), Gr.kill(), Qr(ve);
        for (var o = 0; o < x.length; o += 3)
          Jr(ve, x[o], x[o + 1]), Jr(ve, x[o], x[o + 2]);
      }, s.enable = function() {
        if (L = window, Q = document, _t = Q.documentElement, te = Q.body, _ && (Vr = _.utils.toArray, ur = _.utils.clamp, gn = _.core.context || Mt, hn = _.core.suppressOverwrites || Mt, _n = L.history.scrollRestoration || "auto", En = L.pageYOffset, _.core.globals("ScrollTrigger", s), te)) {
          yr = 1, Ci(), ce.register(_), s.isTouch = ce.isTouch, Bt = ce.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(L, "wheel", hr), Nn = [L, Q, _t, te], _.matchMedia ? (s.matchMedia = function(g) {
            var C = _.matchMedia(), H;
            for (H in g)
              C.add(H, g[H]);
            return C;
          }, _.addEventListener("matchMediaInit", function() {
            return Cn();
          }), _.addEventListener("matchMediaRevert", function() {
            return li();
          }), _.addEventListener("matchMedia", function() {
            rr(0, 1), er("matchMedia");
          }), _.matchMedia("(orientation: portrait)", function() {
            return kn(), kn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), kn(), _e(Q, "scroll", hr);
          var t = te.style, r = t.borderTopStyle, o = _.core.Animation.prototype, c, a;
          for (o.revert || Object.defineProperty(o, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", c = Dt(te), pe.m = Math.round(c.top + pe.sc()) || 0, Ye.m = Math.round(c.left + Ye.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), qr = setInterval(si, 250), _.delayedCall(0.5, function() {
            return jr = 0;
          }), _e(Q, "touchcancel", Mt), _e(te, "touchstart", Mt), Zr(_e, Q, "pointerdown,touchstart,mousedown", Qn), Zr(_e, Q, "pointerup,touchend,mouseup", Kn), pn = _.utils.checkPrefix("transform"), an.push(pn), cr = Be(), Gr = _.delayedCall(0.2, rr).pause(), fr = [Q, "visibilitychange", function() {
            var g = L.innerWidth, C = L.innerHeight;
            Q.hidden ? (Wn = g, Gn = C) : (Wn !== g || Gn !== C) && Or();
          }, Q, "DOMContentLoaded", rr, L, "load", rr, L, "resize", Or], Qr(_e), A.forEach(function(g) {
            return g.enable(0, 1);
          }), a = 0; a < x.length; a += 3)
            Jr(ve, x[a], x[a + 1]), Jr(ve, x[a], x[a + 2]);
        }
      }, s.config = function(t) {
        "limitCallbacks" in t && (vn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval(qr) || (qr = r) && setInterval(si, r), "ignoreMobileResize" in t && (qn = s.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Qr(ve) || Qr(_e, t.autoRefreshEvents || "none"), $n = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, s.scrollerProxy = function(t, r) {
        var o = Qe(t), c = x.indexOf(o), a = Qt(o);
        ~c && x.splice(c, a ? 6 : 2), r && (a ? X.unshift(L, r, te, r, _t, r) : X.unshift(o, r));
      }, s.clearMatchMedia = function(t) {
        A.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, s.isInViewport = function(t, r, o) {
        var c = (vt(t) ? Qe(t) : t).getBoundingClientRect(), a = c[o ? Kt : Zt] * r || 0;
        return o ? c.right - a > 0 && c.left + a < L.innerWidth : c.bottom - a > 0 && c.top + a < L.innerHeight;
      }, s.positionInViewport = function(t, r, o) {
        vt(t) && (t = Qe(t));
        var c = t.getBoundingClientRect(), a = c[o ? Kt : Zt], g = r == null ? a / 2 : r in tn ? tn[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
        return o ? (c.left + g) / L.innerWidth : (c.top + g) / L.innerHeight;
      }, s.killAll = function(t) {
        if (A.slice(0).forEach(function(o) {
          return o.vars.id !== "ScrollSmoother" && o.kill();
        }), t !== !0) {
          var r = Jt.killAll || [];
          Jt = {}, r.forEach(function(o) {
            return o();
          });
        }
      }, s;
    }();
    I.version = "3.11.5", I.saveStyles = function(s) {
      return s ? Vr(s).forEach(function(e) {
        if (e && e.style) {
          var n = rt.indexOf(e);
          n >= 0 && rt.splice(n, 5), rt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), _.core.getCache(e), gn());
        }
      }) : rt;
    }, I.revert = function(s, e) {
      return Cn(!s, e);
    }, I.create = function(s, e) {
      return new I(s, e);
    }, I.refresh = function(s) {
      return s ? Or() : (cr || I.register()) && rr(!0);
    }, I.update = function(s) {
      return ++x.cache && Rt(s === !0 ? 2 : 0);
    }, I.clearScrollMemory = ci, I.maxScroll = function(s, e) {
      return Ht(s, e ? Ye : pe);
    }, I.getScrollFunc = function(s, e) {
      return Xt(Qe(s), e ? Ye : pe);
    }, I.getById = function(s) {
      return Mn[s];
    }, I.getAll = function() {
      return A.filter(function(s) {
        return s.vars.id !== "ScrollSmoother";
      });
    }, I.isScrolling = function() {
      return !!ut;
    }, I.snapDirectional = Tn, I.addEventListener = function(s, e) {
      var n = Jt[s] || (Jt[s] = []);
      ~n.indexOf(e) || n.push(e);
    }, I.removeEventListener = function(s, e) {
      var n = Jt[s], t = n && n.indexOf(e);
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
      })), Vr(s).forEach(function(g) {
        var C = {};
        for (a in t)
          C[a] = t[a];
        C.trigger = g, n.push(I.create(C));
      }), n;
    };
    var gi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Dn = function s(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ce.isTouch ? " pinch-zoom" : "") : "none", e === _t && s(te, n);
    }, un = {
      auto: 1,
      scroll: 1
    }, Xi = function(e) {
      var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, c = o._gsap || _.core.getCache(o), a = Be(), g;
      if (!c._isScrollT || a - c._isScrollT > 2e3) {
        for (; o && o !== te && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(un[(g = mt(o)).overflowY] || un[g.overflowX])); )
          o = o.parentNode;
        c._isScroll = o && o !== t && !Qt(o) && (un[(g = mt(o)).overflowY] || un[g.overflowX]), c._isScrollT = a;
      }
      (c._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, _i = function(e, n, t, r) {
      return ce.create({
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
          return t && _e(Q, ce.eventTypes[0], mi, !1, !0);
        },
        onDisable: function() {
          return ve(Q, ce.eventTypes[0], mi, !0);
        }
      });
    }, Bi = /(input|label|select|textarea)/i, vi, mi = function(e) {
      var n = Bi.test(e.target.tagName);
      (n || vi) && (e._gsapAllow = !0, vi = n);
    }, Hi = function(e) {
      Kr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, c = n.onRelease, a, g, C = Qe(e.target) || _t, H = _.core.globals().ScrollSmoother, N = H && H.get(), b = Bt && (e.content && Qe(e.content) || N && e.content !== !1 && !N.smooth() && N.content()), f = Xt(C, pe), w = Xt(C, Ye), q = 1, ie = (ce.isTouch && L.visualViewport ? L.visualViewport.scale * L.visualViewport.width : L.outerWidth) / L.innerWidth, G = 0, Ke = He(r) ? function() {
        return r(a);
      } : function() {
        return r || 2.8;
      }, re, F, Ie = _i(C, e.type, !0, o), oe = function() {
        return F = !1;
      }, P = Mt, Ze = Mt, bt = function() {
        g = Ht(C, pe), Ze = ur(Bt ? 1 : 0, g), t && (P = ur(0, Ht(C, Ye))), re = tr;
      }, O = function() {
        b._gsap.y = xr(parseFloat(b._gsap.y) + f.offset) + "px", b.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(b._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
      }, Pe = function() {
        if (F) {
          requestAnimationFrame(oe);
          var he = xr(a.deltaY / 2), ue = Ze(f.v - he);
          if (b && ue !== f.v + f.offset) {
            f.offset = ue - f.v;
            var l = xr((parseFloat(b && b._gsap.y) || 0) - f.offset);
            b.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", b._gsap.y = l + "px", f.cacheID = x.cache, Rt();
          }
          return !0;
        }
        f.offset && O(), F = !0;
      }, E, At, Oe, Ne, We = function() {
        bt(), E.isActive() && E.vars.scrollY > g && (f() > g ? E.progress(1) && f(g) : E.resetTo("scrollY", g));
      };
      return b && _.set(b, {
        y: "+=0"
      }), e.ignoreCheck = function(V) {
        return Bt && V.type === "touchmove" && Pe() || q > 1.05 && V.type !== "touchstart" || a.isGesturing || V.touches && V.touches.length > 1;
      }, e.onPress = function() {
        F = !1;
        var V = q;
        q = xr((L.visualViewport && L.visualViewport.scale || 1) / ie), E.pause(), V !== q && Dn(C, q > 1.01 ? !0 : t ? !1 : "x"), At = w(), Oe = f(), bt(), re = tr;
      }, e.onRelease = e.onGestureStart = function(V, he) {
        if (f.offset && O(), !he)
          Ne.restart(!0);
        else {
          x.cache++;
          var ue = Ke(), l, ge;
          t && (l = w(), ge = l + ue * 0.05 * -V.velocityX / 0.227, ue *= gi(w, l, ge, Ht(C, Ye)), E.vars.scrollX = P(ge)), l = f(), ge = l + ue * 0.05 * -V.velocityY / 0.227, ue *= gi(f, l, ge, Ht(C, pe)), E.vars.scrollY = Ze(ge), E.invalidate().duration(ue).play(0.01), (Bt && E.vars.scrollY >= g || l >= g - 1) && _.to({}, {
            onUpdate: We,
            duration: ue
          });
        }
        c && c(V);
      }, e.onWheel = function() {
        E._ts && E.pause(), Be() - G > 1e3 && (re = 0, G = Be());
      }, e.onChange = function(V, he, ue, l, ge) {
        if (tr !== re && bt(), he && t && w(P(l[2] === he ? At + (V.startX - V.x) : w() + he - l[1])), ue) {
          f.offset && O();
          var nr = ge[2] === ue, Nt = nr ? Oe + V.startY - V.y : f() + ue - ge[1], dt = Ze(Nt);
          nr && Nt !== dt && (Oe += dt - Nt), f(dt);
        }
        (ue || he) && Rt();
      }, e.onEnable = function() {
        Dn(C, t ? !1 : "x"), I.addEventListener("refresh", We), _e(L, "resize", We), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = w.smooth = !1), Ie.enable();
      }, e.onDisable = function() {
        Dn(C, !0), ve(L, "resize", We), I.removeEventListener("refresh", We), Ie.kill();
      }, e.lockAxis = e.lockAxis !== !1, a = new ce(e), a.iOS = Bt, Bt && !f() && f(1), Bt && _.ticker.add(Mt), Ne = a._dc, E = _.to(a, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: pi(f, f(), function() {
            return E.pause();
          })
        },
        onUpdate: Rt,
        onComplete: Ne.vars.onComplete
      }), a;
    };
    I.sort = function(s) {
      return A.sort(s || function(e, n) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
      });
    }, I.observe = function(s) {
      return new ce(s);
    }, I.normalizeScroll = function(s) {
      if (typeof s > "u")
        return tt;
      if (s === !0 && tt)
        return tt.enable();
      if (s === !1)
        return tt && tt.kill();
      var e = s instanceof ce ? s : Hi(s);
      return tt && tt.target === e.target && tt.kill(), Qt(e.target) && (tt = e), e;
    }, I.core = {
      _getVelocityProp: dn,
      _inputObserver: _i,
      _scrollers: x,
      _proxies: X,
      bridge: {
        ss: function() {
          ut || er("scrollStart"), ut = Be();
        },
        ref: function() {
          return Ae;
        }
      }
    }, Jn() && _.registerPlugin(I), h.ScrollTrigger = I, h.default = I, typeof window > "u" || window !== h ? Object.defineProperty(h, "__esModule", { value: !0 }) : delete window.default;
  });
})(Ln, Ln.exports);
var Ti = Ln.exports;
Fe.registerPlugin(Ti.ScrollTrigger);
class Mi extends Hr {
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
      (v) => {
        var Yt, Ce;
        Object.assign(v.meta, {
          speed: h.speed ?? 1,
          velocity: h.velocity ?? 0,
          direction: h.direction || "rtl",
          onCreated: h.onCreated,
          onUpdate: h.onUpdate
        }), v.meta.scrollTrigger = Ti.ScrollTrigger.create(h.scrollTrigger ?? {});
        let m = null;
        typeof p == "string" ? m = document.querySelector(p) : p instanceof HTMLElement && (m = p);
        const Z = h.createDOMContainers != null ? h.createDOMContainers : !0, k = Z ? document.createElement("div") : m == null ? void 0 : m.querySelector(".owow-marquee-outer");
        k == null || k.classList.add("owow-marquee-outer");
        const B = Z ? document.createElement("div") : k == null ? void 0 : k.querySelector(".owow-marquee-inner");
        if (B == null || B.classList.add("owow-marquee-inner"), !m || !k || !B)
          throw console.error({
            targetContainer: m,
            outerContainer: k,
            innerContainer: B
          }), new Error("Invalid marquee DOM structure");
        v.meta.sourceDOM = m.cloneNode(!0), v.meta.target = m, B.append(...m.childNodes), k.append(B), m == null || m.append(k), Fe.set(B, { display: "inline-flex" });
        const le = m.getBoundingClientRect(), Se = B.getBoundingClientRect(), Je = le.width + Se.width, Te = document.createDocumentFragment(), Me = [];
        let lt = Se.width;
        if (!Je || !lt)
          return;
        for (; lt <= Je; ) {
          const U = B.cloneNode(!0);
          lt += Se.width, Me.push(U);
        }
        Te.append(...Me), k.append(Te);
        const et = Fe.context(() => {
          Fe.set(k, {
            x: 0,
            force3D: !0,
            width: lt,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Re = Fe.utils.pipe(
          (U) => Math.floor(U * 1e3) / 1e3,
          Fe.quickSetter(k, "x", "px")
        ), Ot = Fe.utils.wrap(0, -Se.width), Ut = Fe.utils.normalize(0, -Se.width);
        let St, gt, x, X, ke, ct, Ft;
        const Tt = Fe.ticker.add(() => {
          var U, jt;
          switch (gt = v.meta.velocity != null ? v.meta.scrollTrigger.getVelocity() ?? 0 : 0, x = gt * v.meta.velocity, v.meta.direction) {
            case "ltr":
              St = -1, x = -Math.abs(x);
              break;
            case "rtl":
              St = 1, x = Math.abs(x);
              break;
            case "scroll":
              St = v.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              St = -(v.meta.scrollTrigger.direction ?? 1), x = -x;
          }
          X = Fe.getProperty(k, "x"), ke = v.meta.speed * -St, ct = (ke - x) * Fe.ticker.deltaRatio(), Ft = Ot(X + ct), Re(Ft), (jt = (U = v.meta).onUpdate) == null || jt.call(U, Ut(Ft));
        });
        return (Ce = (Yt = v.meta).onCreated) == null || Ce.call(Yt), () => {
          var U;
          for (et.kill(!0), Fe.ticker.remove(Tt), m == null || m.replaceChildren(...v.meta.sourceDOM.childNodes); Me.length; )
            (U = Me.pop()) == null || U.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...M
      }
    );
  }
}
class ki extends Hr {
  constructor(p, h = {}, M = {}) {
    super(async (v, m) => {
      const Z = ki.SplitText;
      if (!Z)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      Xr.registerPlugin(Z);
      const k = Xr.utils.toArray(p);
      for (const Te of k)
        if (!(Te instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const B = v.meta.childSplit = new Z(p, {
        type: "lines",
        linesClass: "owow-split-child",
        ...lr(h.childSplitVars)
      }), le = v.meta.parentSplit = new Z(p, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...lr(h.parentSplitVars)
      }), Se = {
        y: (Te, Me) => {
          const lt = parseFloat(getComputedStyle(Me).lineHeight);
          return isNaN(lt) ? Xr.getProperty(Me, "height") : lt;
        },
        ...lr(h.fromVars)
      }, Je = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...lr(h.toVars)
      };
      return m.add(() => {
        v.meta.setup = Xr.set(le.lines, { overflow: "hidden" }), v.meta.tween = Xr.fromTo(B.lines, Se, Je);
      }), () => {
        B.revert(), m.kill(!0);
      };
    }, M);
  }
}
export {
  $ as Ease,
  Mi as Marquee,
  Hr as Motion,
  Si as Pointer,
  go as SecondOrderDynamics,
  ki as TextClipReveal
};
