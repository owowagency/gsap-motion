import { noop as Hi, fromEvent as In, debounceTime as Ni, Observable as Wi } from "rxjs";
import Le, { gsap as un } from "gsap";
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
V.inBack = (i, h = Fn) => i * i * ((h + 1) * i - h);
V.outBack = (i, h = Fn) => {
  const p = i / 1 - 1;
  return p * p * ((h + 1) * p + h) + 1;
};
V.inOutBack = (i, h = Fn) => {
  const p = i * 2, M = p - 2, y = h * 1.525;
  return p < 1 ? 0.5 * p * p * ((y + 1) * p - y) : 0.5 * (M * M * ((y + 1) * M + y) + 2);
};
V.inElastic = (i, h = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const M = i / 1 - 1, y = 1 - h, v = y / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * M) * Math.sin((M - v) * (2 * Math.PI) / y));
};
V.outElastic = (i, h = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const p = 1 - h, M = i * 2, y = p / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * M) * Math.sin((M - y) * (2 * Math.PI) / p) + 1;
};
V.inOutElastic = (i, h = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const p = 1 - h, M = i * 2, y = M - 1, v = p / (2 * Math.PI) * Math.asin(1);
  return M < 1 ? -0.5 * (Math.pow(2, 10 * y) * Math.sin((y - v) * (2 * Math.PI) / p)) : Math.pow(2, -10 * y) * Math.sin((y - v) * (2 * Math.PI) / p) * 0.5 + 1;
};
var Xr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qi(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Gi = "Expected a function", wi = 0 / 0, Vi = "[object Symbol]", $i = /^\s+|\s+$/g, Ui = /^[-+]0x[0-9a-f]+$/i, ji = /^0b[01]+$/i, Qi = /^0o[0-7]+$/i, Ki = parseInt, Zi = typeof Xr == "object" && Xr && Xr.Object === Object && Xr, Ji = typeof self == "object" && self && self.Object === Object && self, eo = Zi || Ji || Function("return this")(), to = Object.prototype, ro = to.toString, no = Math.max, io = Math.min, An = function() {
  return eo.Date.now();
};
function oo(i, h, p) {
  var M, y, v, ae, k, N, le = 0, Se = !1, je = !1, Oe = !0;
  if (typeof i != "function")
    throw new TypeError(Gi);
  h = yi(h) || 0, zn(p) && (Se = !!p.leading, je = "maxWait" in p, v = je ? no(yi(p.maxWait) || 0, h) : v, Oe = "trailing" in p ? !!p.trailing : Oe);
  function Qe(X) {
    var Te = M, lt = y;
    return M = y = void 0, le = X, ae = i.apply(lt, Te), ae;
  }
  function Pt(X) {
    return le = X, k = setTimeout(Ot, h), Se ? Qe(X) : ae;
  }
  function et(X) {
    var Te = X - N, lt = X - le, Ft = h - Te;
    return je ? io(Ft, v - lt) : Ft;
  }
  function Re(X) {
    var Te = X - N, lt = X - le;
    return N === void 0 || Te >= h || Te < 0 || je && lt >= v;
  }
  function Ot() {
    var X = An();
    if (Re(X))
      return Ut(X);
    k = setTimeout(Ot, et(X));
  }
  function Ut(X) {
    return k = void 0, Oe && M ? Qe(X) : (M = y = void 0, ae);
  }
  function xt() {
    k !== void 0 && clearTimeout(k), le = 0, M = N = y = k = void 0;
  }
  function ht() {
    return k === void 0 ? ae : Ut(An());
  }
  function x() {
    var X = An(), Te = Re(X);
    if (M = arguments, y = this, N = X, Te) {
      if (k === void 0)
        return Pt(N);
      if (je)
        return k = setTimeout(Ot, h), Qe(N);
    }
    return k === void 0 && (k = setTimeout(Ot, h)), ae;
  }
  return x.cancel = xt, x.flush = ht, x;
}
function zn(i) {
  var h = typeof i;
  return !!i && (h == "object" || h == "function");
}
function so(i) {
  return !!i && typeof i == "object";
}
function ao(i) {
  return typeof i == "symbol" || so(i) && ro.call(i) == Vi;
}
function yi(i) {
  if (typeof i == "number")
    return i;
  if (ao(i))
    return wi;
  if (zn(i)) {
    var h = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = zn(h) ? h + "" : h;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace($i, "");
  var p = ji.test(i);
  return p || Qi.test(i) ? Ki(i.slice(2), p ? 2 : 8) : Ui.test(i) ? wi : +i;
}
var lo = oo;
const co = /* @__PURE__ */ qi(lo);
function lr(i, ...h) {
  return i instanceof Function ? i.call(null, h) : i;
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
  constructor(i, h = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = co(
      () => {
        var p;
        (p = this.cleanup) == null || p.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      xi.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var p, M;
      (p = this.cleanup) == null || p.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const y of Object.keys(this.meta))
        delete this.meta[y];
      for (; this.subscriptions.length; )
        (M = this.subscriptions.pop()) == null || M.unsubscribe();
    }, this.observeMedia(lr(h.watchMedia)), this.observeResize(lr(h.shouldResetOnResize)), this.create = () => {
      var y;
      return this.context = Le.context(Hi), [
        lr(h.enable) ?? !0,
        ((y = this.mediaQueryList) == null ? void 0 : y.matches) ?? !0
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
    return i * Le.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var h;
    const i = (h = this.create) == null ? void 0 : h.call(this, this, this.context);
    i instanceof Promise ? i.then((p) => this.cleanup = p ?? void 0) : this.cleanup = i ?? void 0;
  }
  observeMedia(i) {
    i && (this.mediaQueryList = matchMedia(i), this.subscriptions.push(In(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(i) {
    i && (this.motionResizeObserver = new uo(i), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Ni(100)).subscribe(() => this.reset())
    ));
  }
};
let Br = xi;
Br.resetDebounceTime = 100;
Br.referenceFramerate = 60;
class uo {
  constructor(h) {
    const [p, M] = [h].flat();
    this.element = typeof p == "string" ? document.querySelector(p) : p, this.axis = M, this.observable = new Wi((y) => {
      const v = new ResizeObserver(
        (ae) => this.handleResize(ae, y)
      );
      return this.element && v.observe(this.element), () => v.disconnect();
    });
  }
  handleResize(h, p) {
    const M = h.find((le) => le.target === this.element);
    if (!M)
      return;
    const { inlineSize: y, blockSize: v } = M.borderBoxSize[0], ae = y !== this.inlineSize, k = v !== this.blockSize, N = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = y, this.blockSize = v, !N) {
      if (this.axis === "horizontal" && ae || this.axis === "vertical" && k)
        return p.next();
      !this.axis && (ae || k) && p.next();
    }
  }
}
class Si extends Br {
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
      (h) => {
        h.meta.observable = In(window, "mousemove"), h.subscriptions.push(
          h.meta.observable.subscribe((p) => {
            this.clientX = p.clientX, this.clientY = p.clientY, this.normalX = Le.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Le.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), h.subscriptions.push(
          In(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), h.meta.label = "Pointer";
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
var Ln = { exports: {} };
(function(i, h) {
  (function(p, M) {
    M(h);
  })(Xr, function(p) {
    function M(s, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(s, t.key, t);
      }
    }
    function y(s, e, n) {
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
    var v, ae, k, N, le, Se, je, Oe, Qe, Pt, et, Re, Ot, Ut = function() {
      return v || typeof window < "u" && (v = window.gsap) && v.registerPlugin && v;
    }, xt = 1, ht = [], x = [], X = [], Te = Date.now, lt = function(e, n) {
      return n;
    }, Ft = function() {
      var e = Qe.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, x), r.push.apply(r, X), x = t, X = r, lt = function(c, a) {
        return n[c](a);
      };
    }, St = function(e, n) {
      return ~X.indexOf(e) && X[X.indexOf(e) + 1][n];
    }, Yt = function(e) {
      return !!~Pt.indexOf(e);
    }, Me = function(e, n, t, r, o) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!o
      });
    }, U = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, jt = "scrollLeft", Hr = "scrollTop", fn = function() {
      return et && et.isPressed || x.cache++;
    }, Nr = function(e, n) {
      var t = function r(o) {
        if (o || o === 0) {
          xt && (k.history.scrollRestoration = "manual");
          var c = et && et.isPressed;
          o = r.v = Math.round(o) || (et && et.iOS ? 1 : 0), e(o), r.cacheID = x.cache, c && lt("ss", o);
        } else
          (n || x.cache !== r.cacheID || lt("ref")) && (r.cacheID = x.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Fe = {
      s: jt,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Nr(function(s) {
        return arguments.length ? k.scrollTo(s, pe.sc()) : k.pageXOffset || N[jt] || le[jt] || Se[jt] || 0;
      })
    }, pe = {
      s: Hr,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Fe,
      sc: Nr(function(s) {
        return arguments.length ? k.scrollTo(Fe.sc(), s) : k.pageYOffset || N[Hr] || le[Hr] || Se[Hr] || 0;
      })
    }, Ke = function(e) {
      return v.utils.toArray(e)[0] || (typeof e == "string" && v.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      Yt(e) && (e = N.scrollingElement || le);
      var o = x.indexOf(e), c = r === pe.sc ? 1 : 2;
      !~o && (o = x.push(e) - 1), x[o + c] || e.addEventListener("scroll", fn);
      var a = x[o + c], g = a || (x[o + c] = Nr(St(e, t), !0) || (Yt(e) ? r : Nr(function(C) {
        return arguments.length ? e[t] = C : e[t];
      })));
      return g.target = e, a || (g.smooth = v.getProperty(e, "scrollBehavior") === "smooth"), g;
    }, dn = function(e, n, t) {
      var r = e, o = e, c = Te(), a = c, g = n || 50, C = Math.max(500, g * 3), B = function(b, $) {
        var ne = Te();
        $ || ne - c > g ? (o = r, r = b, a = c, c = ne) : t ? r += b : r = o + (b - o) / (ne - a) * (c - a);
      }, H = function() {
        o = r = t ? 0 : r, a = c = 0;
      }, m = function(b) {
        var $ = a, ne = o, q = Te();
        return (b || b === 0) && b !== r && B(b), c === a || q - a > C ? 0 : (r + (t ? ne : -ne)) / ((t ? q : c) - $) * 1e3;
      };
      return {
        update: B,
        reset: H,
        getVelocity: m
      };
    }, wr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Xn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Bn = function() {
      Qe = v.core.globals().ScrollTrigger, Qe && Qe.core && Ft();
    }, Hn = function(e) {
      return v = e || Ut(), v && typeof document < "u" && document.body && (k = window, N = document, le = N.documentElement, Se = N.body, Pt = [k, N, le, Se], v.utils.clamp, Ot = v.core.context || function() {
      }, Oe = "onpointerenter" in Se ? "pointer" : "mouse", je = ce.isTouch = k.matchMedia && k.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in k || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Re = ce.eventTypes = ("ontouchstart" in le ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in le ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return xt = 0;
      }, 500), Bn(), ae = 1), ae;
    };
    Fe.op = pe, x.cache = 0;
    var ce = function() {
      function s(n) {
        this.init(n);
      }
      var e = s.prototype;
      return e.init = function(t) {
        ae || Hn(v) || console.warn("Please gsap.registerPlugin(Observer)"), Qe || Bn();
        var r = t.tolerance, o = t.dragMinimum, c = t.type, a = t.target, g = t.lineHeight, C = t.debounce, B = t.preventDefault, H = t.onStop, m = t.onStopDelay, f = t.ignore, b = t.wheelSpeed, $ = t.event, ne = t.onDragStart, q = t.onDragEnd, Ze = t.onDrag, te = t.onPress, F = t.onRelease, Ae = t.onRight, ie = t.onLeft, P = t.onUp, Je = t.onDown, mt = t.onChangeX, O = t.onChangeY, Ce = t.onChange, E = t.onToggleX, At = t.onToggleY, Ee = t.onHover, He = t.onHoverEnd, Ne = t.onMove, G = t.ignoreCheck, he = t.isNormalizer, ue = t.onGestureStart, l = t.onGestureEnd, ge = t.onWheel, nr = t.onEnable, Nt = t.onDisable, ft = t.onClick, Wt = t.scrollSpeed, j = t.capture, Ie = t.allowClicks, We = t.lockAxis, Dr = t.onLockAxis;
        this.target = a = Ke(a) || le, this.vars = t, f && (f = v.utils.toArray(f)), r = r || 1e-9, o = o || 0, b = b || 1, Wt = Wt || 1, c = c || "wheel,touch,pointer", C = C !== !1, g || (g = parseFloat(k.getComputedStyle(Se).lineHeight) || 22);
        var it, dt, Y, me, ot, Mt, qe, u = this, It = 0, K = 0, qt = Xt(a, Fe), Gt = Xt(a, pe), _r = qt(), Ge = Gt(), Ar = ~c.indexOf("touch") && !~c.indexOf("pointer") && Re[0] === "pointerdown", Vt = Yt(a), oe = a.ownerDocument || N, st = [0, 0, 0], Ve = [0, 0, 0], Ir = 0, $e = function() {
          return Ir = Te();
        }, kt = function(S, d) {
          return (u.event = S) && f && ~f.indexOf(S.target) || d && Ar && S.pointerType !== "touch" || G && G(S, d);
        }, zr = function() {
          u._vx.reset(), u._vy.reset(), dt.pause(), H && H(u);
        }, $t = function() {
          var S = u.deltaX = Xn(st), d = u.deltaY = Xn(Ve), w = Math.abs(S) >= r, T = Math.abs(d) >= r;
          Ce && (w || T) && Ce(u, S, d, st, Ve), w && (Ae && u.deltaX > 0 && Ae(u), ie && u.deltaX < 0 && ie(u), mt && mt(u), E && u.deltaX < 0 != It < 0 && E(u), It = u.deltaX, st[0] = st[1] = st[2] = 0), T && (Je && u.deltaY > 0 && Je(u), P && u.deltaY < 0 && P(u), O && O(u), At && u.deltaY < 0 != K < 0 && At(u), K = u.deltaY, Ve[0] = Ve[1] = Ve[2] = 0), (me || Y) && (Ne && Ne(u), Y && (Ze(u), Y = !1), me = !1), Mt && !(Mt = !1) && Dr && Dr(u), ot && (ge(u), ot = !1), it = 0;
        }, vr = function(S, d, w) {
          st[w] += S, Ve[w] += d, u._vx.update(S), u._vy.update(d), C ? it || (it = requestAnimationFrame($t)) : $t();
        }, ir = function(S, d) {
          We && !qe && (u.axis = qe = Math.abs(S) > Math.abs(d) ? "x" : "y", Mt = !0), qe !== "y" && (st[2] += S, u._vx.update(S, !0)), qe !== "x" && (Ve[2] += d, u._vy.update(d, !0)), C ? it || (it = requestAnimationFrame($t)) : $t();
        }, or = function(S) {
          if (!kt(S, 1)) {
            S = wr(S, B);
            var d = S.clientX, w = S.clientY, T = d - u.x, D = w - u.y, be = u.isDragging;
            u.x = d, u.y = w, (be || Math.abs(u.startX - d) >= o || Math.abs(u.startY - w) >= o) && (Ze && (Y = !0), be || (u.isDragging = !0), ir(T, D), be || ne && ne(u));
          }
        }, z = u.onPress = function(R) {
          kt(R, 1) || R && R.button || (u.axis = qe = null, dt.pause(), u.isPressed = !0, R = wr(R), It = K = 0, u.startX = u.x = R.clientX, u.startY = u.y = R.clientY, u._vx.reset(), u._vy.reset(), Me(he ? a : oe, Re[1], or, B, !0), u.deltaX = u.deltaY = 0, te && te(u));
        }, zt = u.onRelease = function(R) {
          if (!kt(R, 1)) {
            U(he ? a : oe, Re[1], or, !0);
            var S = !isNaN(u.y - u.startY), d = u.isDragging && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), w = wr(R);
            !d && S && (u._vx.reset(), u._vy.reset(), B && Ie && v.delayedCall(0.08, function() {
              if (Te() - Ir > 300 && !R.defaultPrevented) {
                if (R.target.click)
                  R.target.click();
                else if (oe.createEvent) {
                  var T = oe.createEvent("MouseEvents");
                  T.initMouseEvent("click", !0, !0, k, 1, w.screenX, w.screenY, w.clientX, w.clientY, !1, !1, !1, !1, 0, null), R.target.dispatchEvent(T);
                }
              }
            })), u.isDragging = u.isGesturing = u.isPressed = !1, H && !he && dt.restart(!0), q && d && q(u), F && F(u, d);
          }
        }, bt = function(S) {
          return S.touches && S.touches.length > 1 && (u.isGesturing = !0) && ue(S, u.isDragging);
        }, wt = function() {
          return (u.isGesturing = !1) || l(u);
        }, pt = function(S) {
          if (!kt(S)) {
            var d = qt(), w = Gt();
            vr((d - _r) * Wt, (w - Ge) * Wt, 1), _r = d, Ge = w, H && dt.restart(!0);
          }
        }, yt = function(S) {
          if (!kt(S)) {
            S = wr(S, B), ge && (ot = !0);
            var d = (S.deltaMode === 1 ? g : S.deltaMode === 2 ? k.innerHeight : 1) * b;
            vr(S.deltaX * d, S.deltaY * d, 0), H && !he && dt.restart(!0);
          }
        }, sr = function(S) {
          if (!kt(S)) {
            var d = S.clientX, w = S.clientY, T = d - u.x, D = w - u.y;
            u.x = d, u.y = w, me = !0, (T || D) && ir(T, D);
          }
        }, mr = function(S) {
          u.event = S, Ee(u);
        }, Lt = function(S) {
          u.event = S, He(u);
        }, Lr = function(S) {
          return kt(S) || wr(S, B) && ft(u);
        };
        dt = u._dc = v.delayedCall(m || 0.25, zr).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = qt, u.scrollY = Gt, u.isDragging = u.isGesturing = u.isPressed = !1, Ot(this), u.enable = function(R) {
          return u.isEnabled || (Me(Vt ? oe : a, "scroll", fn), c.indexOf("scroll") >= 0 && Me(Vt ? oe : a, "scroll", pt, B, j), c.indexOf("wheel") >= 0 && Me(a, "wheel", yt, B, j), (c.indexOf("touch") >= 0 && je || c.indexOf("pointer") >= 0) && (Me(a, Re[0], z, B, j), Me(oe, Re[2], zt), Me(oe, Re[3], zt), Ie && Me(a, "click", $e, !1, !0), ft && Me(a, "click", Lr), ue && Me(oe, "gesturestart", bt), l && Me(oe, "gestureend", wt), Ee && Me(a, Oe + "enter", mr), He && Me(a, Oe + "leave", Lt), Ne && Me(a, Oe + "move", sr)), u.isEnabled = !0, R && R.type && z(R), nr && nr(u)), u;
        }, u.disable = function() {
          u.isEnabled && (ht.filter(function(R) {
            return R !== u && Yt(R.target);
          }).length || U(Vt ? oe : a, "scroll", fn), u.isPressed && (u._vx.reset(), u._vy.reset(), U(he ? a : oe, Re[1], or, !0)), U(Vt ? oe : a, "scroll", pt, j), U(a, "wheel", yt, j), U(a, Re[0], z, j), U(oe, Re[2], zt), U(oe, Re[3], zt), U(a, "click", $e, !0), U(a, "click", Lr), U(oe, "gesturestart", bt), U(oe, "gestureend", wt), U(a, Oe + "enter", mr), U(a, Oe + "leave", Lt), U(a, Oe + "move", sr), u.isEnabled = u.isPressed = u.isDragging = !1, Nt && Nt(u));
        }, u.kill = u.revert = function() {
          u.disable();
          var R = ht.indexOf(u);
          R >= 0 && ht.splice(R, 1), et === u && (et = 0);
        }, ht.push(u), he && Yt(a) && (et = u), u.enable($);
      }, y(s, [{
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
      return ht.slice();
    }, ce.getById = function(s) {
      return ht.filter(function(e) {
        return e.vars.id === s;
      })[0];
    }, Ut() && v.registerPlugin(ce);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var _, cr, L, Q, gt, ee, Nn, Wr, qr, ur, Gr, Vr, De, $r, pn, Ye, Wn, qn, fr, Gn, hn, Vn, tt, $n, Un, jn, Bt, gn, _n, vn, Ur = 1, Xe = Date.now, mn = Xe(), ct = 0, yr = 0, ki = function s() {
      return yr && requestAnimationFrame(s);
    }, Qn = function() {
      return $r = 1;
    }, Kn = function() {
      return $r = 0;
    }, Tt = function(e) {
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
      return St(e, "getBoundingClientRect") || (Qt(e) ? function() {
        return ln.width = L.innerWidth, ln.height = L.innerHeight, ln;
      } : function() {
        return Rt(e);
      });
    }, Ci = function(e, n, t) {
      var r = t.d, o = t.d2, c = t.a;
      return (c = St(e, "getBoundingClientRect")) ? function() {
        return c()[r];
      } : function() {
        return (n ? L["inner" + o] : e["client" + o]) || 0;
      };
    }, Ei = function(e, n) {
      return !n || ~X.indexOf(e) ? ei(e) : function() {
        return ln;
      };
    }, Ht = function(e, n) {
      var t = n.s, r = n.d2, o = n.d, c = n.a;
      return Math.max(0, (t = "scroll" + r) && (c = St(e, t)) ? c() - ei(e)()[o] : Qt(e) ? (gt[t] || ee[t]) - (L["inner" + r] || gt["client" + r] || ee["client" + r]) : e[t] - e["offset" + r]);
    }, jr = function(e, n) {
      for (var t = 0; t < fr.length; t += 3)
        (!n || ~n.indexOf(fr[t + 1])) && e(fr[t], fr[t + 1], fr[t + 2]);
    }, _t = function(e) {
      return typeof e == "string";
    }, Be = function(e) {
      return typeof e == "function";
    }, Sr = function(e) {
      return typeof e == "number";
    }, Qr = function(e) {
      return typeof e == "object";
    }, Tr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, bn = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, dr = Math.abs, ti = "left", ri = "top", wn = "right", yn = "bottom", Kt = "width", Zt = "height", Mr = "Right", kr = "Left", Cr = "Top", Er = "Bottom", re = "padding", ut = "margin", pr = "Width", xn = "Height", ke = "px", vt = function(e) {
      return L.getComputedStyle(e);
    }, Pi = function(e) {
      var n = vt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ni = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Rt = function(e, n) {
      var t = n && vt(e)[pn] !== "matrix(1, 0, 0, 1, 0, 0)" && _.to(e, {
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
    }, Oi = function(e) {
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
    }, Kr = function(e, n, t, r) {
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
    }, Zr = function(e, n, t) {
      t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
    }, oi = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, Jr = {
      toggleActions: "play",
      anticipatePin: 0
    }, en = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    }, tn = function(e, n) {
      if (_t(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in en ? en[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, rn = function(e, n, t, r, o, c, a, g) {
      var C = o.startColor, B = o.endColor, H = o.fontSize, m = o.indent, f = o.fontWeight, b = Q.createElement("div"), $ = Qt(t) || St(t, "pinType") === "fixed", ne = e.indexOf("scroller") !== -1, q = $ ? ee : t, Ze = e.indexOf("start") !== -1, te = Ze ? C : B, F = "border-color:" + te + ";font-size:" + H + ";color:" + te + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return F += "position:" + ((ne || g) && $ ? "fixed;" : "absolute;"), (ne || g || !$) && (F += (r === pe ? wn : yn) + ":" + (c + parseFloat(m)) + "px;"), a && (F += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), b._isStart = Ze, b.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), b.style.cssText = F, b.innerText = n || n === 0 ? e + "-" + n : e, q.children[0] ? q.insertBefore(b, q.children[0]) : q.appendChild(b), b._offset = b["offset" + r.op.d2], nn(b, 0, r, Ze), b;
    }, nn = function(e, n, t, r) {
      var o = {
        display: "block"
      }, c = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
      e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + c + pr] = 1, o["border" + a + pr] = 0, o[t.p] = n + "px", _.set(e, o);
    }, A = [], Mn = {}, Pr, si = function() {
      return Xe() - ct > 34 && (Pr || (Pr = requestAnimationFrame(Dt)));
    }, hr = function() {
      (!tt || !tt.isPressed || tt.startX > ee.clientWidth) && (x.cache++, tt ? Pr || (Pr = requestAnimationFrame(Dt)) : Dt(), ct || er("scrollStart"), ct = Xe());
    }, kn = function() {
      jn = L.innerWidth, Un = L.innerHeight;
    }, Or = function() {
      x.cache++, !De && !Vn && !Q.fullscreenElement && !Q.webkitFullscreenElement && (!$n || jn !== L.innerWidth || Math.abs(L.innerHeight - Un) > L.innerHeight * 0.25) && Wr.restart(!0);
    }, Jt = {}, Di = [], ai = function s() {
      return ve(I, "scrollEnd", s) || rr(!0);
    }, er = function(e) {
      return Jt[e] && Jt[e].map(function(n) {
        return n();
      }) || Di;
    }, rt = [], li = function(e) {
      for (var n = 0; n < rt.length; n += 5)
        (!e || rt[n + 4] && rt[n + 4].query === e) && (rt[n].style.cssText = rt[n + 1], rt[n].getBBox && rt[n].setAttribute("transform", rt[n + 2] || ""), rt[n + 3].uncache = 1);
    }, Cn = function(e, n) {
      var t;
      for (Ye = 0; Ye < A.length; Ye++)
        t = A[Ye], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || er("revert");
    }, ci = function(e, n) {
      x.cache++, (n || !nt) && x.forEach(function(t) {
        return Be(t) && t.cacheID++ && (t.rec = 0);
      }), _t(e) && (L.history.scrollRestoration = _n = e);
    }, nt, tr = 0, ui, Ai = function() {
      if (ui !== tr) {
        var e = ui = tr;
        requestAnimationFrame(function() {
          return e === tr && rr(!0);
        });
      }
    }, rr = function(e, n) {
      if (ct && !e) {
        _e(I, "scrollEnd", ai);
        return;
      }
      nt = I.isRefreshing = !0, x.forEach(function(r) {
        return Be(r) && r.cacheID++ && (r.rec = r());
      });
      var t = er("refreshInit");
      Gn && I.sort(), n || Cn(), x.forEach(function(r) {
        Be(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
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
        Be(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), ci(_n, 1), Wr.pause(), tr++, nt = 2, Dt(2), A.forEach(function(r) {
        return Be(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), nt = I.isRefreshing = !1, er("refresh");
    }, En = 0, on = 1, Rr, Dt = function(e) {
      if (!nt || e === 2) {
        I.isUpdating = !0, Rr && Rr.update(0);
        var n = A.length, t = Xe(), r = t - mn >= 50, o = n && A[0].scroll();
        if (on = En > o ? -1 : 1, nt || (En = o), r && (ct && !$r && t - ct > 200 && (ct = 0, er("scrollEnd")), Gr = mn, mn = t), on < 0) {
          for (Ye = n; Ye-- > 0; )
            A[Ye] && A[Ye].update(0, r);
          on = 1;
        } else
          for (Ye = 0; Ye < n; Ye++)
            A[Ye] && A[Ye].update(0, r);
        I.isUpdating = !1;
      }
      Pr = 0;
    }, Pn = [ti, ri, yn, wn, ut + Er, ut + Mr, ut + Cr, ut + kr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], sn = Pn.concat([Kt, Zt, "boxSizing", "max" + pr, "max" + xn, "position", ut, re, re + Cr, re + Mr, re + Er, re + kr]), Ii = function(e, n, t) {
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
        c.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (c.display = "inline-block"), a[yn] = a[wn] = "auto", c.flexBasis = t.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Kt] = Sn(e, Fe) + ke, c[Zt] = Sn(e, pe) + ke, c[re] = a[ut] = a[ri] = a[ti] = "0", gr(r), a[Kt] = a["max" + pr] = t[Kt], a[Zt] = a["max" + xn] = t[Zt], a[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, zi = /([A-Z])/g, gr = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, o, c;
        for ((e.t._gsap || _.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          c = e[r + 1], o = e[r], c ? n[o] = c : n[o] && n.removeProperty(o.replace(zi, "-$1").toLowerCase());
      }
    }, an = function(e) {
      for (var n = sn.length, t = e.style, r = [], o = 0; o < n; o++)
        r.push(sn[o], t[sn[o]]);
      return r.t = e, r;
    }, Li = function(e, n, t) {
      for (var r = [], o = e.length, c = t ? 8 : 0, a; c < o; c += 2)
        a = e[c], r.push(a, a in n ? n[a] : e[c + 1]);
      return r.t = e.t, r;
    }, ln = {
      left: 0,
      top: 0
    }, fi = function(e, n, t, r, o, c, a, g, C, B, H, m, f) {
      Be(e) && (e = e(g)), _t(e) && e.substr(0, 3) === "max" && (e = m + (e.charAt(4) === "=" ? tn("0" + e.substr(3), t) : 0));
      var b = f ? f.time() : 0, $, ne, q;
      if (f && f.seek(0), Sr(e))
        f && (e = _.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, m, e)), a && nn(a, t, r, !0);
      else {
        Be(n) && (n = n(g));
        var Ze = (e || "0").split(" "), te, F, Ae, ie;
        q = Ke(n) || ee, te = Rt(q) || {}, (!te || !te.left && !te.top) && vt(q).display === "none" && (ie = q.style.display, q.style.display = "block", te = Rt(q), ie ? q.style.display = ie : q.style.removeProperty("display")), F = tn(Ze[0], te[r.d]), Ae = tn(Ze[1] || "0", t), e = te[r.p] - C[r.p] - B + F + o - Ae, a && nn(a, Ae, r, t - Ae < 20 || a._isStart && Ae > 20), t -= t - Ae;
      }
      if (c) {
        var P = e + t, Je = c._isStart;
        $ = "scroll" + r.d2, nn(c, P, r, Je && P > 20 || !Je && (H ? Math.max(ee[$], gt[$]) : c.parentNode[$]) <= P + 1), H && (C = Rt(a), H && (c.style[r.op.p] = C[r.op.p] - r.op.m - c._offset + ke));
      }
      return f && q && ($ = Rt(q), f.seek(m), ne = Rt(q), f._caScrollDist = $[r.p] - ne[r.p], e = e / f._caScrollDist * m), f && f.seek(b), f ? e : Math.round(e);
    }, Fi = /(webkit|moz|length|cssText|inset)/i, di = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var o = e.style, c, a;
        if (n === ee) {
          e._stOrig = o.cssText, a = vt(e);
          for (c in a)
            !+c && !Fi.test(c) && a[c] && typeof o[c] == "string" && c !== "0" && (o[c] = a[c]);
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
      var t = Xt(e, n), r = "_scroll" + n.p2, o = function c(a, g, C, B, H) {
        var m = c.tween, f = g.onComplete, b = {};
        C = C || t();
        var $ = pi(t, C, function() {
          m.kill(), c.tween = 0;
        });
        return H = B && H || 0, B = B || a - C, m && m.kill(), g[r] = a, g.modifiers = b, b[r] = function() {
          return $(C + B * m.ratio + H * m.ratio * m.ratio);
        }, g.onUpdate = function() {
          x.cache++, Dt();
        }, g.onComplete = function() {
          c.tween = 0, f && f.call(m);
        }, m = c.tween = _.to(e, g), m;
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
          this.update = this.refresh = this.kill = Tt;
          return;
        }
        t = ni(_t(t) || Sr(t) || t.nodeType ? {
          trigger: t
        } : t, Jr);
        var o = t, c = o.onUpdate, a = o.toggleClass, g = o.id, C = o.onToggle, B = o.onRefresh, H = o.scrub, m = o.trigger, f = o.pin, b = o.pinSpacing, $ = o.invalidateOnRefresh, ne = o.anticipatePin, q = o.onScrubComplete, Ze = o.onSnapComplete, te = o.once, F = o.snap, Ae = o.pinReparent, ie = o.pinSpacer, P = o.containerAnimation, Je = o.fastScrollEnd, mt = o.preventOverlaps, O = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Fe : pe, Ce = !H && H !== 0, E = Ke(t.scroller || L), At = _.core.getCache(E), Ee = Qt(E), He = ("pinType" in t ? t.pinType : St(E, "pinType") || Ee && "fixed") === "fixed", Ne = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = Ce && t.toggleActions.split(" "), he = "markers" in t ? t.markers : Jr.markers, ue = Ee ? 0 : parseFloat(vt(E)["border" + O.p2 + pr]) || 0, l = this, ge = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, nr = Ci(E, Ee, O), Nt = Ei(E, Ee), ft = 0, Wt = 0, j = Xt(E, O), Ie, We, Dr, it, dt, Y, me, ot, Mt, qe, u, It, K, qt, Gt, _r, Ge, Ar, Vt, oe, st, Ve, Ir, $e, kt, zr, $t, vr, ir, or, z, zt, bt, wt, pt, yt, sr, mr, Lt;
        if (gn(l), l._dir = O, ne *= 45, l.scroller = E, l.scroll = P ? P.time.bind(P) : j, it = j(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Rr = l)), At.tweenScroll = At.tweenScroll || {
          top: hi(E, pe),
          left: hi(E, Fe)
        }, l.tweenTo = Ie = At.tweenScroll[O.p], l.scrubDuration = function(d) {
          zt = Sr(d) && d, zt ? z ? z.duration(d) : z = _.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: zt,
            paused: !0,
            onComplete: function() {
              return q && q(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(H), z && z.resetTo && z.resetTo("totalProgress", 0), ir = 0, g || (g = r.vars.id)), A.push(l), F && ((!Qr(F) || F.push) && (F = {
          snapTo: F
        }), "scrollBehavior" in ee.style && _.set(Ee ? [ee, gt] : E, {
          scrollBehavior: "auto"
        }), x.forEach(function(d) {
          return Be(d) && d.target === (Ee ? Q.scrollingElement || gt : E) && (d.smooth = !1);
        }), Dr = Be(F.snapTo) ? F.snapTo : F.snapTo === "labels" ? Oi(r) : F.snapTo === "labelsDirectional" ? Ri(r) : F.directional !== !1 ? function(d, w) {
          return Tn(F.snapTo)(d, Xe() - Wt < 500 ? 0 : w.direction);
        } : _.utils.snap(F.snapTo), bt = F.duration || {
          min: 0.1,
          max: 2
        }, bt = Qr(bt) ? ur(bt.min, bt.max) : ur(bt, bt), wt = _.delayedCall(F.delay || zt / 2 || 0.1, function() {
          var d = j(), w = Xe() - Wt < 500, T = Ie.tween;
          if ((w || Math.abs(l.getVelocity()) < 10) && !T && !$r && ft !== d) {
            var D = (d - Y) / K, be = r && !Ce ? r.totalProgress() : D, W = w ? 0 : (be - or) / (Xe() - Gr) * 1e3 || 0, Z = _.utils.clamp(-D, 1 - D, dr(W / 2) * W / 0.185), Pe = D + (F.inertia === !1 ? 0 : Z), we = ur(0, 1, Dr(Pe, l)), fe = Math.round(Y + we * K), J = F, at = J.onStart, Ue = J.onInterrupt, ye = J.onComplete;
            if (d <= me && d >= Y && fe !== d) {
              if (T && !T._initted && T.data <= dr(fe - d))
                return;
              F.inertia === !1 && (Z = we - D), Ie(fe, {
                duration: bt(dr(Math.max(dr(Pe - be), dr(we - be)) * 0.185 / W / 0.05 || 0)),
                ease: F.ease || "power3",
                data: dr(fe - d),
                onInterrupt: function() {
                  return wt.restart(!0) && Ue && Ue(l);
                },
                onComplete: function() {
                  l.update(), ft = j(), ir = or = r && !Ce ? r.totalProgress() : l.progress, Ze && Ze(l), ye && ye(l);
                }
              }, d, Z * K, fe - d - Z * K), at && at(l, Ie.tween);
            }
          } else
            l.isActive && ft !== d && wt.restart(!0);
        }).pause()), g && (Mn[g] = l), m = l.trigger = Ke(m || f), Lt = m && m._gsap && m._gsap.stRevert, Lt && (Lt = Lt(l)), f = f === !0 ? m : Ke(f), _t(a) && (a = {
          targets: m,
          className: a
        }), f && (b === !1 || b === ut || (b = !b && f.parentNode && f.parentNode.style && vt(f.parentNode).display === "flex" ? !1 : re), l.pin = f, We = _.core.getCache(f), We.spacer ? qt = We.pinState : (ie && (ie = Ke(ie), ie && !ie.nodeType && (ie = ie.current || ie.nativeElement), We.spacerIsNative = !!ie, ie && (We.spacerState = an(ie))), We.spacer = Ge = ie || Q.createElement("div"), Ge.classList.add("pin-spacer"), g && Ge.classList.add("pin-spacer-" + g), We.pinState = qt = an(f)), t.force3D !== !1 && _.set(f, {
          force3D: !0
        }), l.spacer = Ge = We.spacer, vr = vt(f), Ir = vr[b + O.os2], Vt = _.getProperty(f), oe = _.quickSetter(f, O.a, ke), On(f, Ge, vr), _r = an(f)), he) {
          It = Qr(he) ? ni(he, oi) : oi, qe = rn("scroller-start", g, E, O, It, 0), u = rn("scroller-end", g, E, O, It, 0, qe), Ar = qe["offset" + O.op.d2];
          var Lr = Ke(St(E, "content") || E);
          ot = this.markerStart = rn("start", g, Lr, O, It, Ar, 0, P), Mt = this.markerEnd = rn("end", g, Lr, O, It, Ar, 0, P), P && (mr = _.quickSetter([ot, Mt], O.a, ke)), !He && !(X.length && St(E, "fixedMarkers") === !0) && (Pi(Ee ? ee : E), _.set([qe, u], {
            force3D: !0
          }), kt = _.quickSetter(qe, O.a, ke), $t = _.quickSetter(u, O.a, ke));
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
        }, l.revert = function(d, w) {
          if (!w)
            return l.kill(!0);
          var T = d !== !1 || !l.enabled, D = De;
          T !== l.isReverted && (T && (yt = Math.max(j(), l.scroll.rec || 0), pt = l.progress, sr = r && r.progress()), ot && [ot, Mt, qe, u].forEach(function(be) {
            return be.style.display = T ? "none" : "block";
          }), T && (De = l, l.update(T)), f && (!Ae || !l.isActive) && (T ? Ii(f, Ge, qt) : On(f, Ge, vt(f), $e)), T || l.update(T), De = D, l.isReverted = T);
        }, l.refresh = function(d, w) {
          if (!((De || !l.enabled) && !w)) {
            if (f && d && ct) {
              _e(s, "scrollEnd", ai);
              return;
            }
            !nt && ge && ge(l), De = l, Wt = Xe(), Ie.tween && (Ie.tween.kill(), Ie.tween = 0), z && z.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var T = nr(), D = Nt(), be = P ? P.duration() : Ht(E, O), W = K <= 0.01, Z = 0, Pe = 0, we = t.end, fe = t.endTrigger || m, J = t.start || (t.start === 0 || !m ? 0 : f ? "0 0" : "0 100%"), at = l.pinnedContainer = t.pinnedContainer && Ke(t.pinnedContainer), Ue = m && Math.max(0, A.indexOf(l)) || 0, ye = Ue, se, ze, br, ar, de, xe, Ct, Dn, bi, Fr, Et; ye--; )
              xe = A[ye], xe.end || xe.refresh(0, 1) || (De = l), Ct = xe.pin, Ct && (Ct === m || Ct === f || Ct === at) && !xe.isReverted && (Fr || (Fr = []), Fr.unshift(xe), xe.revert(!0, !0)), xe !== A[ye] && (Ue--, ye--);
            for (Be(J) && (J = J(l)), Y = fi(J, m, T, O, j(), ot, qe, l, D, ue, He, be, P) || (f ? -1e-3 : 0), Be(we) && (we = we(l)), _t(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (_t(J) ? J.split(" ")[0] : "") + we : (Z = tn(we.substr(2), T), we = _t(J) ? J : (P ? _.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, Y) : Y) + Z, fe = m)), me = Math.max(Y, fi(we || (fe ? "100% 0" : be), fe, T, O, j() + Z, Mt, u, l, D, ue, He, be, P)) || -1e-3, K = me - Y || (Y -= 0.01) && 1e-3, Z = 0, ye = Ue; ye--; )
              xe = A[ye], Ct = xe.pin, Ct && xe.start - xe._pinPush <= Y && !P && xe.end > 0 && (se = xe.end - xe.start, (Ct === m && xe.start - xe._pinPush < Y || Ct === at) && !Sr(J) && (Z += se * (1 - xe.progress)), Ct === f && (Pe += se));
            if (Y += Z, me += Z, W && (pt = _.utils.clamp(0, 1, _.utils.normalize(Y, me, yt))), l._pinPush = Pe, ot && Z && (se = {}, se[O.a] = "+=" + Z, at && (se[O.p] = "-=" + j()), _.set([ot, Mt], se)), f)
              se = vt(f), ar = O === pe, br = j(), st = parseFloat(Vt(O.a)) + Pe, !be && me > 1 && (Et = (Ee ? Q.scrollingElement || gt : E).style, Et = {
                style: Et,
                value: Et["overflow" + O.a.toUpperCase()]
              }, Et.style["overflow" + O.a.toUpperCase()] = "scroll"), On(f, Ge, se), _r = an(f), ze = Rt(f, !0), Dn = He && Xt(E, ar ? Fe : pe)(), b && ($e = [b + O.os2, K + Pe + ke], $e.t = Ge, ye = b === re ? Sn(f, O) + K + Pe : 0, ye && $e.push(O.d, ye + ke), gr($e), at && A.forEach(function(Yr) {
                Yr.pin === at && Yr.vars.pinSpacing !== !1 && (Yr._subPinOffset = !0);
              }), He && j(yt)), He && (de = {
                top: ze.top + (ar ? br - Y : Dn) + ke,
                left: ze.left + (ar ? Dn : br - Y) + ke,
                boxSizing: "border-box",
                position: "fixed"
              }, de[Kt] = de["max" + pr] = Math.ceil(ze.width) + ke, de[Zt] = de["max" + xn] = Math.ceil(ze.height) + ke, de[ut] = de[ut + Cr] = de[ut + Mr] = de[ut + Er] = de[ut + kr] = "0", de[re] = se[re], de[re + Cr] = se[re + Cr], de[re + Mr] = se[re + Mr], de[re + Er] = se[re + Er], de[re + kr] = se[re + kr], Gt = Li(qt, de, Ae), nt && j(0)), r ? (bi = r._initted, hn(1), r.render(r.duration(), !0, !0), Ve = Vt(O.a) - st + K + Pe, zr = Math.abs(K - Ve) > 1, He && zr && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), hn(0)) : Ve = K, Et && (Et.value ? Et.style["overflow" + O.a.toUpperCase()] = Et.value : Et.style.removeProperty("overflow-" + O.a));
            else if (m && j() && !P)
              for (ze = m.parentNode; ze && ze !== ee; )
                ze._pinOffset && (Y -= ze._pinOffset, me -= ze._pinOffset), ze = ze.parentNode;
            Fr && Fr.forEach(function(Yr) {
              return Yr.revert(!1, !0);
            }), l.start = Y, l.end = me, it = dt = nt ? yt : j(), !P && !nt && (it < yt && j(yt), l.scroll.rec = 0), l.revert(!1, !0), wt && (ft = -1, l.isActive && j(Y + K * pt), wt.restart(!0)), De = 0, r && Ce && (r._initted || sr) && r.progress() !== sr && r.progress(sr, !0).render(r.time(), !0, !0), (W || pt !== l.progress || P) && (r && !Ce && r.totalProgress(P && Y < -1e-3 && !pt ? _.utils.normalize(Y, me, 0) : pt, !0), l.progress = (it - Y) / K === pt ? 0 : pt), f && b && (Ge._pinOffset = Math.round(l.progress * Ve)), z && z.invalidate(), B && !nt && B(l);
          }
        }, l.getVelocity = function() {
          return (j() - dt) / (Xe() - Gr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Tr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? Ce || Tr(r, l.direction < 0, 1) : Tr(r, r.reversed()));
        }, l.labelToScroll = function(d) {
          return r && r.labels && (Y || l.refresh() || Y) + r.labels[d] / r.duration() * K || 0;
        }, l.getTrailing = function(d) {
          var w = A.indexOf(l), T = l.direction > 0 ? A.slice(0, w).reverse() : A.slice(w + 1);
          return (_t(d) ? T.filter(function(D) {
            return D.vars.preventOverlaps === d;
          }) : T).filter(function(D) {
            return l.direction > 0 ? D.end <= Y : D.start >= me;
          });
        }, l.update = function(d, w, T) {
          if (!(P && !T && !d)) {
            var D = nt === !0 ? yt : l.scroll(), be = d ? 0 : (D - Y) / K, W = be < 0 ? 0 : be > 1 ? 1 : be || 0, Z = l.progress, Pe, we, fe, J, at, Ue, ye, se;
            if (w && (dt = it, it = P ? j() : D, F && (or = ir, ir = r && !Ce ? r.totalProgress() : W)), ne && !W && f && !De && !Ur && ct && Y < D + (D - dt) / (Xe() - Gr) * ne && (W = 1e-4), W !== Z && l.enabled) {
              if (Pe = l.isActive = !!W && W < 1, we = !!Z && Z < 1, Ue = Pe !== we, at = Ue || !!W != !!Z, l.direction = W > Z ? 1 : -1, l.progress = W, at && !De && (fe = W && !Z ? 0 : W === 1 ? 1 : Z === 1 ? 2 : 3, Ce && (J = !Ue && G[fe + 1] !== "none" && G[fe + 1] || G[fe], se = r && (J === "complete" || J === "reset" || J in r))), mt && (Ue || se) && (se || H || !r) && (Be(mt) ? mt(l) : l.getTrailing(mt).forEach(function(de) {
                return de.endAnimation();
              })), Ce || (z && !De && !Ur ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", W, r._tTime / r._tDur) : (z.vars.totalProgress = W, z.invalidate().restart())) : r && r.totalProgress(W, !!De)), f) {
                if (d && b && (Ge.style[b + O.os2] = Ir), !He)
                  oe(xr(st + Ve * W));
                else if (at) {
                  if (ye = !d && W > Z && me + 1 > D && D + 1 >= Ht(E, O), Ae)
                    if (!d && (Pe || ye)) {
                      var ze = Rt(f, !0), br = D - Y;
                      di(f, ee, ze.top + (O === pe ? br : 0) + ke, ze.left + (O === pe ? 0 : br) + ke);
                    } else
                      di(f, Ge);
                  gr(Pe || ye ? Gt : _r), zr && W < 1 && Pe || oe(st + (W === 1 && !ye ? Ve : 0));
                }
              }
              F && !Ie.tween && !De && !Ur && wt.restart(!0), a && (Ue || te && W && (W < 1 || !vn)) && qr(a.targets).forEach(function(de) {
                return de.classList[Pe || te ? "add" : "remove"](a.className);
              }), c && !Ce && !d && c(l), at && !De ? (Ce && (se && (J === "complete" ? r.pause().totalProgress(1) : J === "reset" ? r.restart(!0).pause() : J === "restart" ? r.restart(!0) : r[J]()), c && c(l)), (Ue || !vn) && (C && Ue && bn(l, C), Ne[fe] && bn(l, Ne[fe]), te && (W === 1 ? l.kill(!1, 1) : Ne[fe] = 0), Ue || (fe = W === 1 ? 1 : 3, Ne[fe] && bn(l, Ne[fe]))), Je && !Pe && Math.abs(l.getVelocity()) > (Sr(Je) ? Je : 2500) && (Tr(l.callbackAnimation), z ? z.progress(1) : Tr(r, J === "reverse" ? 1 : !W, 1))) : Ce && c && !De && c(l);
            }
            if ($t) {
              var ar = P ? D / P.duration() * (P._caScrollDist || 0) : D;
              kt(ar + (qe._isFlipped ? 1 : 0)), $t(ar);
            }
            mr && mr(-D / P.duration() * (P._caScrollDist || 0));
          }
        }, l.enable = function(d, w) {
          l.enabled || (l.enabled = !0, _e(E, "resize", Or), _e(Ee ? Q : E, "scroll", hr), ge && _e(s, "refreshInit", ge), d !== !1 && (l.progress = pt = 0, it = dt = ft = j()), w !== !1 && l.refresh());
        }, l.getTween = function(d) {
          return d && Ie ? Ie.tween : z;
        }, l.setPositions = function(d, w) {
          f && (st += d - Y, Ve += w - d - K, b === re && l.adjustPinSpacing(w - d - K)), l.start = Y = d, l.end = me = w, K = w - d, l.update();
        }, l.adjustPinSpacing = function(d) {
          if ($e && d) {
            var w = $e.indexOf(O.d) + 1;
            $e[w] = parseFloat($e[w]) + d + ke, $e[1] = parseFloat($e[1]) + d + ke, gr($e);
          }
        }, l.disable = function(d, w) {
          if (l.enabled && (d !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, w || z && z.pause(), yt = 0, We && (We.uncache = 1), ge && ve(s, "refreshInit", ge), wt && (wt.pause(), Ie.tween && Ie.tween.kill() && (Ie.tween = 0)), !Ee)) {
            for (var T = A.length; T--; )
              if (A[T].scroller === E && A[T] !== l)
                return;
            ve(E, "resize", Or), ve(E, "scroll", hr);
          }
        }, l.kill = function(d, w) {
          l.disable(d, w), z && !w && z.kill(), g && delete Mn[g];
          var T = A.indexOf(l);
          T >= 0 && A.splice(T, 1), T === Ye && on > 0 && Ye--, T = 0, A.forEach(function(D) {
            return D.scroller === l.scroller && (T = 1);
          }), T || nt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
            kill: !1
          }), w || r.kill()), ot && [ot, Mt, qe, u].forEach(function(D) {
            return D.parentNode && D.parentNode.removeChild(D);
          }), Rr === l && (Rr = 0), f && (We && (We.uncache = 1), T = 0, A.forEach(function(D) {
            return D.pin === f && T++;
          }), T || (We.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Lt && Lt(l), !r || !r.add || K ? l.refresh() : _.delayedCall(0.01, function() {
          return Y || me || l.refresh();
        }) && (K = 0.01) && (Y = me = 0), f && Ai();
      }, s.register = function(t) {
        return cr || (_ = t || Jn(), Zn() && window.document && s.enable(), cr = yr), cr;
      }, s.defaults = function(t) {
        if (t)
          for (var r in t)
            Jr[r] = t[r];
        return Jr;
      }, s.disable = function(t, r) {
        yr = 0, A.forEach(function(c) {
          return c[r ? "kill" : "disable"](t);
        }), ve(L, "wheel", hr), ve(Q, "scroll", hr), clearInterval(Vr), ve(Q, "touchcancel", Tt), ve(ee, "touchstart", Tt), Kr(ve, Q, "pointerdown,touchstart,mousedown", Qn), Kr(ve, Q, "pointerup,touchend,mouseup", Kn), Wr.kill(), jr(ve);
        for (var o = 0; o < x.length; o += 3)
          Zr(ve, x[o], x[o + 1]), Zr(ve, x[o], x[o + 2]);
      }, s.enable = function() {
        if (L = window, Q = document, gt = Q.documentElement, ee = Q.body, _ && (qr = _.utils.toArray, ur = _.utils.clamp, gn = _.core.context || Tt, hn = _.core.suppressOverwrites || Tt, _n = L.history.scrollRestoration || "auto", En = L.pageYOffset, _.core.globals("ScrollTrigger", s), ee)) {
          yr = 1, ki(), ce.register(_), s.isTouch = ce.isTouch, Bt = ce.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(L, "wheel", hr), Nn = [L, Q, gt, ee], _.matchMedia ? (s.matchMedia = function(g) {
            var C = _.matchMedia(), B;
            for (B in g)
              C.add(B, g[B]);
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
          var t = ee.style, r = t.borderTopStyle, o = _.core.Animation.prototype, c, a;
          for (o.revert || Object.defineProperty(o, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", c = Rt(ee), pe.m = Math.round(c.top + pe.sc()) || 0, Fe.m = Math.round(c.left + Fe.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Vr = setInterval(si, 250), _.delayedCall(0.5, function() {
            return Ur = 0;
          }), _e(Q, "touchcancel", Tt), _e(ee, "touchstart", Tt), Kr(_e, Q, "pointerdown,touchstart,mousedown", Qn), Kr(_e, Q, "pointerup,touchend,mouseup", Kn), pn = _.utils.checkPrefix("transform"), sn.push(pn), cr = Xe(), Wr = _.delayedCall(0.2, rr).pause(), fr = [Q, "visibilitychange", function() {
            var g = L.innerWidth, C = L.innerHeight;
            Q.hidden ? (Wn = g, qn = C) : (Wn !== g || qn !== C) && Or();
          }, Q, "DOMContentLoaded", rr, L, "load", rr, L, "resize", Or], jr(_e), A.forEach(function(g) {
            return g.enable(0, 1);
          }), a = 0; a < x.length; a += 3)
            Zr(ve, x[a], x[a + 1]), Zr(ve, x[a], x[a + 2]);
        }
      }, s.config = function(t) {
        "limitCallbacks" in t && (vn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval(Vr) || (Vr = r) && setInterval(si, r), "ignoreMobileResize" in t && ($n = s.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (jr(ve) || jr(_e, t.autoRefreshEvents || "none"), Vn = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, s.scrollerProxy = function(t, r) {
        var o = Ke(t), c = x.indexOf(o), a = Qt(o);
        ~c && x.splice(c, a ? 6 : 2), r && (a ? X.unshift(L, r, ee, r, gt, r) : X.unshift(o, r));
      }, s.clearMatchMedia = function(t) {
        A.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, s.isInViewport = function(t, r, o) {
        var c = (_t(t) ? Ke(t) : t).getBoundingClientRect(), a = c[o ? Kt : Zt] * r || 0;
        return o ? c.right - a > 0 && c.left + a < L.innerWidth : c.bottom - a > 0 && c.top + a < L.innerHeight;
      }, s.positionInViewport = function(t, r, o) {
        _t(t) && (t = Ke(t));
        var c = t.getBoundingClientRect(), a = c[o ? Kt : Zt], g = r == null ? a / 2 : r in en ? en[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
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
      return s ? qr(s).forEach(function(e) {
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
      return ++x.cache && Dt(s === !0 ? 2 : 0);
    }, I.clearScrollMemory = ci, I.maxScroll = function(s, e) {
      return Ht(s, e ? Fe : pe);
    }, I.getScrollFunc = function(s, e) {
      return Xt(Ke(s), e ? Fe : pe);
    }, I.getById = function(s) {
      return Mn[s];
    }, I.getAll = function() {
      return A.filter(function(s) {
        return s.vars.id !== "ScrollSmoother";
      });
    }, I.isScrolling = function() {
      return !!ct;
    }, I.snapDirectional = Tn, I.addEventListener = function(s, e) {
      var n = Jt[s] || (Jt[s] = []);
      ~n.indexOf(e) || n.push(e);
    }, I.removeEventListener = function(s, e) {
      var n = Jt[s], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, I.batch = function(s, e) {
      var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, c = function(C, B) {
        var H = [], m = [], f = _.delayedCall(r, function() {
          B(H, m), H = [], m = [];
        }).pause();
        return function(b) {
          H.length || f.restart(!0), H.push(b.trigger), m.push(b), o <= H.length && f.progress(1);
        };
      }, a;
      for (a in e)
        t[a] = a.substr(0, 2) === "on" && Be(e[a]) && a !== "onRefreshInit" ? c(a, e[a]) : e[a];
      return Be(o) && (o = o(), _e(I, "refresh", function() {
        return o = e.batchMax();
      })), qr(s).forEach(function(g) {
        var C = {};
        for (a in t)
          C[a] = t[a];
        C.trigger = g, n.push(I.create(C));
      }), n;
    };
    var gi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Rn = function s(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ce.isTouch ? " pinch-zoom" : "") : "none", e === gt && s(ee, n);
    }, cn = {
      auto: 1,
      scroll: 1
    }, Yi = function(e) {
      var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, c = o._gsap || _.core.getCache(o), a = Xe(), g;
      if (!c._isScrollT || a - c._isScrollT > 2e3) {
        for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(cn[(g = vt(o)).overflowY] || cn[g.overflowX])); )
          o = o.parentNode;
        c._isScroll = o && o !== t && !Qt(o) && (cn[(g = vt(o)).overflowY] || cn[g.overflowX]), c._isScrollT = a;
      }
      (c._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, _i = function(e, n, t, r) {
      return ce.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && Yi,
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
    }, Xi = /(input|label|select|textarea)/i, vi, mi = function(e) {
      var n = Xi.test(e.target.tagName);
      (n || vi) && (e._gsapAllow = !0, vi = n);
    }, Bi = function(e) {
      Qr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, c = n.onRelease, a, g, C = Ke(e.target) || gt, B = _.core.globals().ScrollSmoother, H = B && B.get(), m = Bt && (e.content && Ke(e.content) || H && e.content !== !1 && !H.smooth() && H.content()), f = Xt(C, pe), b = Xt(C, Fe), $ = 1, ne = (ce.isTouch && L.visualViewport ? L.visualViewport.scale * L.visualViewport.width : L.outerWidth) / L.innerWidth, q = 0, Ze = Be(r) ? function() {
        return r(a);
      } : function() {
        return r || 2.8;
      }, te, F, Ae = _i(C, e.type, !0, o), ie = function() {
        return F = !1;
      }, P = Tt, Je = Tt, mt = function() {
        g = Ht(C, pe), Je = ur(Bt ? 1 : 0, g), t && (P = ur(0, Ht(C, Fe))), te = tr;
      }, O = function() {
        m._gsap.y = xr(parseFloat(m._gsap.y) + f.offset) + "px", m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(m._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
      }, Ce = function() {
        if (F) {
          requestAnimationFrame(ie);
          var he = xr(a.deltaY / 2), ue = Je(f.v - he);
          if (m && ue !== f.v + f.offset) {
            f.offset = ue - f.v;
            var l = xr((parseFloat(m && m._gsap.y) || 0) - f.offset);
            m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", m._gsap.y = l + "px", f.cacheID = x.cache, Dt();
          }
          return !0;
        }
        f.offset && O(), F = !0;
      }, E, At, Ee, He, Ne = function() {
        mt(), E.isActive() && E.vars.scrollY > g && (f() > g ? E.progress(1) && f(g) : E.resetTo("scrollY", g));
      };
      return m && _.set(m, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Bt && G.type === "touchmove" && Ce() || $ > 1.05 && G.type !== "touchstart" || a.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        F = !1;
        var G = $;
        $ = xr((L.visualViewport && L.visualViewport.scale || 1) / ne), E.pause(), G !== $ && Rn(C, $ > 1.01 ? !0 : t ? !1 : "x"), At = b(), Ee = f(), mt(), te = tr;
      }, e.onRelease = e.onGestureStart = function(G, he) {
        if (f.offset && O(), !he)
          He.restart(!0);
        else {
          x.cache++;
          var ue = Ze(), l, ge;
          t && (l = b(), ge = l + ue * 0.05 * -G.velocityX / 0.227, ue *= gi(b, l, ge, Ht(C, Fe)), E.vars.scrollX = P(ge)), l = f(), ge = l + ue * 0.05 * -G.velocityY / 0.227, ue *= gi(f, l, ge, Ht(C, pe)), E.vars.scrollY = Je(ge), E.invalidate().duration(ue).play(0.01), (Bt && E.vars.scrollY >= g || l >= g - 1) && _.to({}, {
            onUpdate: Ne,
            duration: ue
          });
        }
        c && c(G);
      }, e.onWheel = function() {
        E._ts && E.pause(), Xe() - q > 1e3 && (te = 0, q = Xe());
      }, e.onChange = function(G, he, ue, l, ge) {
        if (tr !== te && mt(), he && t && b(P(l[2] === he ? At + (G.startX - G.x) : b() + he - l[1])), ue) {
          f.offset && O();
          var nr = ge[2] === ue, Nt = nr ? Ee + G.startY - G.y : f() + ue - ge[1], ft = Je(Nt);
          nr && Nt !== ft && (Ee += ft - Nt), f(ft);
        }
        (ue || he) && Dt();
      }, e.onEnable = function() {
        Rn(C, t ? !1 : "x"), I.addEventListener("refresh", Ne), _e(L, "resize", Ne), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = b.smooth = !1), Ae.enable();
      }, e.onDisable = function() {
        Rn(C, !0), ve(L, "resize", Ne), I.removeEventListener("refresh", Ne), Ae.kill();
      }, e.lockAxis = e.lockAxis !== !1, a = new ce(e), a.iOS = Bt, Bt && !f() && f(1), Bt && _.ticker.add(Tt), He = a._dc, E = _.to(a, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: pi(f, f(), function() {
            return E.pause();
          })
        },
        onUpdate: Dt,
        onComplete: He.vars.onComplete
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
      var e = s instanceof ce ? s : Bi(s);
      return tt && tt.target === e.target && tt.kill(), Qt(e.target) && (tt = e), e;
    }, I.core = {
      _getVelocityProp: dn,
      _inputObserver: _i,
      _scrollers: x,
      _proxies: X,
      bridge: {
        ss: function() {
          ct || er("scrollStart"), ct = Xe();
        },
        ref: function() {
          return De;
        }
      }
    }, Jn() && _.registerPlugin(I), p.ScrollTrigger = I, p.default = I, typeof window > "u" || window !== p ? Object.defineProperty(p, "__esModule", { value: !0 }) : delete window.default;
  });
})(Ln, Ln.exports);
var Ti = Ln.exports;
Le.registerPlugin(Ti.ScrollTrigger);
class Mi extends Br {
  static create(h, p = {}, M = {}) {
    return new Mi(h, p, M);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(h) {
    this.meta.speed = h;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(h) {
    this.meta.velocity = h;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(h) {
    this.meta.direction = h;
  }
  constructor(h, p = {}, M = {}) {
    super(
      (y) => {
        var Yt, Me;
        Object.assign(y.meta, {
          speed: p.speed ?? 1,
          velocity: p.velocity ?? 0,
          direction: p.direction || "rtl",
          onCreated: p.onCreated,
          onUpdate: p.onUpdate
        }), y.meta.scrollTrigger = Ti.ScrollTrigger.create(p.scrollTrigger ?? {});
        let v = null;
        typeof h == "string" ? v = document.querySelector(h) : h instanceof HTMLElement && (v = h);
        const ae = p.createDOMContainers != null ? p.createDOMContainers : !0, k = ae ? document.createElement("div") : v == null ? void 0 : v.querySelector(".owow-marquee-outer");
        k == null || k.classList.add("owow-marquee-outer");
        const N = ae ? document.createElement("div") : k == null ? void 0 : k.querySelector(".owow-marquee-inner");
        if (N == null || N.classList.add("owow-marquee-inner"), !v || !k || !N)
          throw console.error({
            targetContainer: v,
            outerContainer: k,
            innerContainer: N
          }), new Error("Invalid marquee DOM structure");
        y.meta.sourceDOM = v.cloneNode(!0), y.meta.target = v, N.append(...v.childNodes), k.append(N), v == null || v.append(k), Le.set(N, { display: "inline-flex" });
        const le = v.getBoundingClientRect(), Se = N.getBoundingClientRect(), je = le.width + Se.width, Oe = document.createDocumentFragment(), Qe = [];
        let Pt = Se.width;
        if (!je || !Pt)
          return;
        for (; Pt <= je; ) {
          const U = N.cloneNode(!0);
          Pt += Se.width, Qe.push(U);
        }
        Oe.append(...Qe), k.append(Oe);
        const et = Le.context(() => {
          Le.set(k, {
            x: 0,
            force3D: !0,
            width: Pt,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Re = Le.utils.pipe(
          (U) => Math.floor(U * 1e3) / 1e3,
          Le.quickSetter(k, "x", "px")
        ), Ot = Le.utils.wrap(0, -Se.width), Ut = Le.utils.normalize(0, -Se.width);
        let xt, ht, x, X, Te, lt, Ft;
        const St = Le.ticker.add(() => {
          var U, jt;
          switch (ht = y.meta.velocity != null ? y.meta.scrollTrigger.getVelocity() ?? 0 : 0, x = ht * y.meta.velocity, y.meta.direction) {
            case "ltr":
              xt = -1, x = -Math.abs(x);
              break;
            case "rtl":
              xt = 1, x = Math.abs(x);
              break;
            case "scroll":
              xt = y.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              xt = -(y.meta.scrollTrigger.direction ?? 1), x = -x;
          }
          X = Le.getProperty(k, "x"), Te = y.meta.speed * -xt, lt = (Te - x) * Le.ticker.deltaRatio(), Ft = Ot(X + lt), Re(Ft), (jt = (U = y.meta).onUpdate) == null || jt.call(U, Ut(Ft));
        });
        return (Me = (Yt = y.meta).onCreated) == null || Me.call(Yt), () => {
          var U;
          for (et.kill(!0), Le.ticker.remove(St), v == null || v.replaceChildren(...y.meta.sourceDOM.childNodes); Qe.length; )
            (U = Qe.pop()) == null || U.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...M
      }
    );
  }
}
class go extends Br {
  constructor(h, p = {}) {
    super(async (M, y) => {
      const v = await fo();
      if (!v)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      un.registerPlugin(v);
      const ae = un.utils.toArray(h);
      for (const je of ae)
        if (!(je instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const k = M.meta.childSplit = new v(h, {
        type: "lines",
        linesClass: "owow-split-child",
        ...lr(p.childSplitVars)
      }), N = M.meta.parentSplit = new v(h, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...lr(p.parentSplitVars)
      }), le = {
        y: (je, Oe) => parseFloat(getComputedStyle(Oe).lineHeight),
        ...lr(p.fromVars)
      }, Se = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...lr(p.toVars)
      };
      return y.add(() => {
        M.meta.setup = un.set(N.lines, { overflow: "hidden" }), M.meta.tween = un.fromTo(k.lines, le, Se);
      }), () => {
        k.revert(), y.kill(!0);
      };
    });
  }
}
async function fo() {
  var p;
  const i = "/node_modules/gsap/SplitText.js", h = /* @__PURE__ */ Object.assign({});
  try {
    const M = await ((p = h[i]) == null ? void 0 : p.call(h)) ?? null;
    return (M == null ? void 0 : M.default) ?? null;
  } catch {
    return null;
  }
}
export {
  V as Ease,
  Mi as Marquee,
  Br as Motion,
  Si as Pointer,
  go as TextClipReveal
};
