import { noop as Hi, fromEvent as In, debounceTime as Ni, Observable as Wi } from "rxjs";
import Fe, { gsap as un } from "gsap";
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
  const p = i * 2, C = p - 2, b = h * 1.525;
  return p < 1 ? 0.5 * p * p * ((b + 1) * p - b) : 0.5 * (C * C * ((b + 1) * C + b) + 2);
};
V.inElastic = (i, h = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const C = i / 1 - 1, b = 1 - h, v = b / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * C) * Math.sin((C - v) * (2 * Math.PI) / b));
};
V.outElastic = (i, h = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const p = 1 - h, C = i * 2, b = p / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * C) * Math.sin((C - b) * (2 * Math.PI) / p) + 1;
};
V.inOutElastic = (i, h = Yn) => {
  if (i === 0 || i === 1)
    return i;
  const p = 1 - h, C = i * 2, b = C - 1, v = p / (2 * Math.PI) * Math.asin(1);
  return C < 1 ? -0.5 * (Math.pow(2, 10 * b) * Math.sin((b - v) * (2 * Math.PI) / p)) : Math.pow(2, -10 * b) * Math.sin((b - v) * (2 * Math.PI) / p) * 0.5 + 1;
};
var Xr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qi(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Gi = "Expected a function", wi = 0 / 0, Vi = "[object Symbol]", $i = /^\s+|\s+$/g, Ui = /^[-+]0x[0-9a-f]+$/i, ji = /^0b[01]+$/i, Qi = /^0o[0-7]+$/i, Ki = parseInt, Zi = typeof Xr == "object" && Xr && Xr.Object === Object && Xr, Ji = typeof self == "object" && self && self.Object === Object && self, eo = Zi || Ji || Function("return this")(), to = Object.prototype, ro = to.toString, no = Math.max, io = Math.min, An = function() {
  return eo.Date.now();
};
function oo(i, h, p) {
  var C, b, v, Z, M, B, le = 0, Se = !1, Je = !1, Te = !0;
  if (typeof i != "function")
    throw new TypeError(Gi);
  h = yi(h) || 0, zn(p) && (Se = !!p.leading, Je = "maxWait" in p, v = Je ? no(yi(p.maxWait) || 0, h) : v, Te = "trailing" in p ? !!p.trailing : Te);
  function Re(X) {
    var Me = C, lt = b;
    return C = b = void 0, le = X, Z = i.apply(lt, Me), Z;
  }
  function Pt(X) {
    return le = X, M = setTimeout(Ot, h), Se ? Re(X) : Z;
  }
  function et(X) {
    var Me = X - B, lt = X - le, Ft = h - Me;
    return Je ? io(Ft, v - lt) : Ft;
  }
  function De(X) {
    var Me = X - B, lt = X - le;
    return B === void 0 || Me >= h || Me < 0 || Je && lt >= v;
  }
  function Ot() {
    var X = An();
    if (De(X))
      return Ut(X);
    M = setTimeout(Ot, et(X));
  }
  function Ut(X) {
    return M = void 0, Te && C ? Re(X) : (C = b = void 0, Z);
  }
  function xt() {
    M !== void 0 && clearTimeout(M), le = 0, C = B = b = M = void 0;
  }
  function ht() {
    return M === void 0 ? Z : Ut(An());
  }
  function x() {
    var X = An(), Me = De(X);
    if (C = arguments, b = this, B = X, Me) {
      if (M === void 0)
        return Pt(B);
      if (Je)
        return M = setTimeout(Ot, h), Re(B);
    }
    return M === void 0 && (M = setTimeout(Ot, h)), Z;
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
      var p, C;
      (p = this.cleanup) == null || p.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const b of Object.keys(this.meta))
        delete this.meta[b];
      for (; this.subscriptions.length; )
        (C = this.subscriptions.pop()) == null || C.unsubscribe();
    }, this.observeMedia(lr(h.watchMedia)), this.observeResize(lr(h.shouldResetOnResize)), this.create = () => {
      var b;
      return this.context = Fe.context(Hi), [
        lr(h.enable) ?? !0,
        ((b = this.mediaQueryList) == null ? void 0 : b.matches) ?? !0
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
    const [p, C] = [h].flat();
    this.element = typeof p == "string" ? document.querySelector(p) : p, this.axis = C, this.observable = new Wi((b) => {
      const v = new ResizeObserver(
        (Z) => this.handleResize(Z, b)
      );
      return this.element && v.observe(this.element), () => v.disconnect();
    });
  }
  handleResize(h, p) {
    const C = h.find((le) => le.target === this.element);
    if (!C)
      return;
    const { inlineSize: b, blockSize: v } = C.borderBoxSize[0], Z = b !== this.inlineSize, M = v !== this.blockSize, B = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = b, this.blockSize = v, !B) {
      if (this.axis === "horizontal" && Z || this.axis === "vertical" && M)
        return p.next();
      !this.axis && (Z || M) && p.next();
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
            this.clientX = p.clientX, this.clientY = p.clientY, this.normalX = Fe.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Fe.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
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
  (function(p, C) {
    C(h);
  })(Xr, function(p) {
    function C(s, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(s, t.key, t);
      }
    }
    function b(s, e, n) {
      return e && C(s.prototype, e), n && C(s, n), s;
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
    var v, Z, M, B, le, Se, Je, Te, Re, Pt, et, De, Ot, Ut = function() {
      return v || typeof window < "u" && (v = window.gsap) && v.registerPlugin && v;
    }, xt = 1, ht = [], x = [], X = [], Me = Date.now, lt = function(e, n) {
      return n;
    }, Ft = function() {
      var e = Re.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, x), r.push.apply(r, X), x = t, X = r, lt = function(c, a) {
        return n[c](a);
      };
    }, St = function(e, n) {
      return ~X.indexOf(e) && X[X.indexOf(e) + 1][n];
    }, Yt = function(e) {
      return !!~Pt.indexOf(e);
    }, ke = function(e, n, t, r, o) {
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
          xt && (M.history.scrollRestoration = "manual");
          var c = et && et.isPressed;
          o = r.v = Math.round(o) || (et && et.iOS ? 1 : 0), e(o), r.cacheID = x.cache, c && lt("ss", o);
        } else
          (n || x.cache !== r.cacheID || lt("ref")) && (r.cacheID = x.cache, r.v = e());
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
      sc: Nr(function(s) {
        return arguments.length ? M.scrollTo(s, pe.sc()) : M.pageXOffset || B[jt] || le[jt] || Se[jt] || 0;
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
      op: Ye,
      sc: Nr(function(s) {
        return arguments.length ? M.scrollTo(Ye.sc(), s) : M.pageYOffset || B[Hr] || le[Hr] || Se[Hr] || 0;
      })
    }, Qe = function(e) {
      return v.utils.toArray(e)[0] || (typeof e == "string" && v.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      Yt(e) && (e = B.scrollingElement || le);
      var o = x.indexOf(e), c = r === pe.sc ? 1 : 2;
      !~o && (o = x.push(e) - 1), x[o + c] || e.addEventListener("scroll", fn);
      var a = x[o + c], g = a || (x[o + c] = Nr(St(e, t), !0) || (Yt(e) ? r : Nr(function(k) {
        return arguments.length ? e[t] = k : e[t];
      })));
      return g.target = e, a || (g.smooth = v.getProperty(e, "scrollBehavior") === "smooth"), g;
    }, dn = function(e, n, t) {
      var r = e, o = e, c = Me(), a = c, g = n || 50, k = Math.max(500, g * 3), H = function(w, $) {
        var ie = Me();
        $ || ie - c > g ? (o = r, r = w, a = c, c = ie) : t ? r += w : r = o + (w - o) / (ie - a) * (c - a);
      }, N = function() {
        o = r = t ? 0 : r, a = c = 0;
      }, m = function(w) {
        var $ = a, ie = o, q = Me();
        return (w || w === 0) && w !== r && H(w), c === a || q - a > k ? 0 : (r + (t ? ie : -ie)) / ((t ? q : c) - $) * 1e3;
      };
      return {
        update: H,
        reset: N,
        getVelocity: m
      };
    }, wr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Xn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Bn = function() {
      Re = v.core.globals().ScrollTrigger, Re && Re.core && Ft();
    }, Hn = function(e) {
      return v = e || Ut(), v && typeof document < "u" && document.body && (M = window, B = document, le = B.documentElement, Se = B.body, Pt = [M, B, le, Se], v.utils.clamp, Ot = v.core.context || function() {
      }, Te = "onpointerenter" in Se ? "pointer" : "mouse", Je = ce.isTouch = M.matchMedia && M.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in M || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, De = ce.eventTypes = ("ontouchstart" in le ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in le ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return xt = 0;
      }, 500), Bn(), Z = 1), Z;
    };
    Ye.op = pe, x.cache = 0;
    var ce = function() {
      function s(n) {
        this.init(n);
      }
      var e = s.prototype;
      return e.init = function(t) {
        Z || Hn(v) || console.warn("Please gsap.registerPlugin(Observer)"), Re || Bn();
        var r = t.tolerance, o = t.dragMinimum, c = t.type, a = t.target, g = t.lineHeight, k = t.debounce, H = t.preventDefault, N = t.onStop, m = t.onStopDelay, f = t.ignore, w = t.wheelSpeed, $ = t.event, ie = t.onDragStart, q = t.onDragEnd, Ke = t.onDrag, re = t.onPress, F = t.onRelease, Ie = t.onRight, oe = t.onLeft, P = t.onUp, Ze = t.onDown, mt = t.onChangeX, O = t.onChangeY, Ee = t.onChange, E = t.onToggleX, At = t.onToggleY, Pe = t.onHover, Ne = t.onHoverEnd, We = t.onMove, G = t.ignoreCheck, he = t.isNormalizer, ue = t.onGestureStart, l = t.onGestureEnd, ge = t.onWheel, nr = t.onEnable, Nt = t.onDisable, ft = t.onClick, Wt = t.scrollSpeed, j = t.capture, ze = t.allowClicks, qe = t.lockAxis, Dr = t.onLockAxis;
        this.target = a = Qe(a) || le, this.vars = t, f && (f = v.utils.toArray(f)), r = r || 1e-9, o = o || 0, w = w || 1, Wt = Wt || 1, c = c || "wheel,touch,pointer", k = k !== !1, g || (g = parseFloat(M.getComputedStyle(Se).lineHeight) || 22);
        var it, dt, Y, me, ot, Mt, Ge, u = this, It = 0, K = 0, qt = Xt(a, Ye), Gt = Xt(a, pe), _r = qt(), Ve = Gt(), Ar = ~c.indexOf("touch") && !~c.indexOf("pointer") && De[0] === "pointerdown", Vt = Yt(a), se = a.ownerDocument || B, st = [0, 0, 0], $e = [0, 0, 0], Ir = 0, Ue = function() {
          return Ir = Me();
        }, kt = function(S, d) {
          return (u.event = S) && f && ~f.indexOf(S.target) || d && Ar && S.pointerType !== "touch" || G && G(S, d);
        }, zr = function() {
          u._vx.reset(), u._vy.reset(), dt.pause(), N && N(u);
        }, $t = function() {
          var S = u.deltaX = Xn(st), d = u.deltaY = Xn($e), y = Math.abs(S) >= r, T = Math.abs(d) >= r;
          Ee && (y || T) && Ee(u, S, d, st, $e), y && (Ie && u.deltaX > 0 && Ie(u), oe && u.deltaX < 0 && oe(u), mt && mt(u), E && u.deltaX < 0 != It < 0 && E(u), It = u.deltaX, st[0] = st[1] = st[2] = 0), T && (Ze && u.deltaY > 0 && Ze(u), P && u.deltaY < 0 && P(u), O && O(u), At && u.deltaY < 0 != K < 0 && At(u), K = u.deltaY, $e[0] = $e[1] = $e[2] = 0), (me || Y) && (We && We(u), Y && (Ke(u), Y = !1), me = !1), Mt && !(Mt = !1) && Dr && Dr(u), ot && (ge(u), ot = !1), it = 0;
        }, vr = function(S, d, y) {
          st[y] += S, $e[y] += d, u._vx.update(S), u._vy.update(d), k ? it || (it = requestAnimationFrame($t)) : $t();
        }, ir = function(S, d) {
          qe && !Ge && (u.axis = Ge = Math.abs(S) > Math.abs(d) ? "x" : "y", Mt = !0), Ge !== "y" && (st[2] += S, u._vx.update(S, !0)), Ge !== "x" && ($e[2] += d, u._vy.update(d, !0)), k ? it || (it = requestAnimationFrame($t)) : $t();
        }, or = function(S) {
          if (!kt(S, 1)) {
            S = wr(S, H);
            var d = S.clientX, y = S.clientY, T = d - u.x, D = y - u.y, be = u.isDragging;
            u.x = d, u.y = y, (be || Math.abs(u.startX - d) >= o || Math.abs(u.startY - y) >= o) && (Ke && (Y = !0), be || (u.isDragging = !0), ir(T, D), be || ie && ie(u));
          }
        }, z = u.onPress = function(R) {
          kt(R, 1) || R && R.button || (u.axis = Ge = null, dt.pause(), u.isPressed = !0, R = wr(R), It = K = 0, u.startX = u.x = R.clientX, u.startY = u.y = R.clientY, u._vx.reset(), u._vy.reset(), ke(he ? a : se, De[1], or, H, !0), u.deltaX = u.deltaY = 0, re && re(u));
        }, zt = u.onRelease = function(R) {
          if (!kt(R, 1)) {
            U(he ? a : se, De[1], or, !0);
            var S = !isNaN(u.y - u.startY), d = u.isDragging && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), y = wr(R);
            !d && S && (u._vx.reset(), u._vy.reset(), H && ze && v.delayedCall(0.08, function() {
              if (Me() - Ir > 300 && !R.defaultPrevented) {
                if (R.target.click)
                  R.target.click();
                else if (se.createEvent) {
                  var T = se.createEvent("MouseEvents");
                  T.initMouseEvent("click", !0, !0, M, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), R.target.dispatchEvent(T);
                }
              }
            })), u.isDragging = u.isGesturing = u.isPressed = !1, N && !he && dt.restart(!0), q && d && q(u), F && F(u, d);
          }
        }, bt = function(S) {
          return S.touches && S.touches.length > 1 && (u.isGesturing = !0) && ue(S, u.isDragging);
        }, wt = function() {
          return (u.isGesturing = !1) || l(u);
        }, pt = function(S) {
          if (!kt(S)) {
            var d = qt(), y = Gt();
            vr((d - _r) * Wt, (y - Ve) * Wt, 1), _r = d, Ve = y, N && dt.restart(!0);
          }
        }, yt = function(S) {
          if (!kt(S)) {
            S = wr(S, H), ge && (ot = !0);
            var d = (S.deltaMode === 1 ? g : S.deltaMode === 2 ? M.innerHeight : 1) * w;
            vr(S.deltaX * d, S.deltaY * d, 0), N && !he && dt.restart(!0);
          }
        }, sr = function(S) {
          if (!kt(S)) {
            var d = S.clientX, y = S.clientY, T = d - u.x, D = y - u.y;
            u.x = d, u.y = y, me = !0, (T || D) && ir(T, D);
          }
        }, mr = function(S) {
          u.event = S, Pe(u);
        }, Lt = function(S) {
          u.event = S, Ne(u);
        }, Lr = function(S) {
          return kt(S) || wr(S, H) && ft(u);
        };
        dt = u._dc = v.delayedCall(m || 0.25, zr).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = qt, u.scrollY = Gt, u.isDragging = u.isGesturing = u.isPressed = !1, Ot(this), u.enable = function(R) {
          return u.isEnabled || (ke(Vt ? se : a, "scroll", fn), c.indexOf("scroll") >= 0 && ke(Vt ? se : a, "scroll", pt, H, j), c.indexOf("wheel") >= 0 && ke(a, "wheel", yt, H, j), (c.indexOf("touch") >= 0 && Je || c.indexOf("pointer") >= 0) && (ke(a, De[0], z, H, j), ke(se, De[2], zt), ke(se, De[3], zt), ze && ke(a, "click", Ue, !1, !0), ft && ke(a, "click", Lr), ue && ke(se, "gesturestart", bt), l && ke(se, "gestureend", wt), Pe && ke(a, Te + "enter", mr), Ne && ke(a, Te + "leave", Lt), We && ke(a, Te + "move", sr)), u.isEnabled = !0, R && R.type && z(R), nr && nr(u)), u;
        }, u.disable = function() {
          u.isEnabled && (ht.filter(function(R) {
            return R !== u && Yt(R.target);
          }).length || U(Vt ? se : a, "scroll", fn), u.isPressed && (u._vx.reset(), u._vy.reset(), U(he ? a : se, De[1], or, !0)), U(Vt ? se : a, "scroll", pt, j), U(a, "wheel", yt, j), U(a, De[0], z, j), U(se, De[2], zt), U(se, De[3], zt), U(a, "click", Ue, !0), U(a, "click", Lr), U(se, "gesturestart", bt), U(se, "gestureend", wt), U(a, Te + "enter", mr), U(a, Te + "leave", Lt), U(a, Te + "move", sr), u.isEnabled = u.isPressed = u.isDragging = !1, Nt && Nt(u));
        }, u.kill = u.revert = function() {
          u.disable();
          var R = ht.indexOf(u);
          R >= 0 && ht.splice(R, 1), et === u && (et = 0);
        }, ht.push(u), he && Yt(a) && (et = u), u.enable($);
      }, b(s, [{
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
    var _, cr, L, Q, gt, te, Nn, Wr, qr, ur, Gr, Vr, Ae, $r, pn, Xe, Wn, qn, fr, Gn, hn, Vn, tt, $n, Un, jn, Bt, gn, _n, vn, Ur = 1, Be = Date.now, mn = Be(), ct = 0, yr = 0, ki = function s() {
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
      return Math.max(0, (t = "scroll" + r) && (c = St(e, t)) ? c() - ei(e)()[o] : Qt(e) ? (gt[t] || te[t]) - (L["inner" + r] || gt["client" + r] || te["client" + r]) : e[t] - e["offset" + r]);
    }, jr = function(e, n) {
      for (var t = 0; t < fr.length; t += 3)
        (!n || ~n.indexOf(fr[t + 1])) && e(fr[t], fr[t + 1], fr[t + 2]);
    }, _t = function(e) {
      return typeof e == "string";
    }, He = function(e) {
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
    }, dr = Math.abs, ti = "left", ri = "top", wn = "right", yn = "bottom", Kt = "width", Zt = "height", Mr = "Right", kr = "Left", Cr = "Top", Er = "Bottom", ne = "padding", ut = "margin", pr = "Width", xn = "Height", Ce = "px", vt = function(e) {
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
      var k = o.startColor, H = o.endColor, N = o.fontSize, m = o.indent, f = o.fontWeight, w = Q.createElement("div"), $ = Qt(t) || St(t, "pinType") === "fixed", ie = e.indexOf("scroller") !== -1, q = $ ? te : t, Ke = e.indexOf("start") !== -1, re = Ke ? k : H, F = "border-color:" + re + ";font-size:" + N + ";color:" + re + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return F += "position:" + ((ie || g) && $ ? "fixed;" : "absolute;"), (ie || g || !$) && (F += (r === pe ? wn : yn) + ":" + (c + parseFloat(m)) + "px;"), a && (F += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), w._isStart = Ke, w.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), w.style.cssText = F, w.innerText = n || n === 0 ? e + "-" + n : e, q.children[0] ? q.insertBefore(w, q.children[0]) : q.appendChild(w), w._offset = w["offset" + r.op.d2], nn(w, 0, r, Ke), w;
    }, nn = function(e, n, t, r) {
      var o = {
        display: "block"
      }, c = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
      e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + c + pr] = 1, o["border" + a + pr] = 0, o[t.p] = n + "px", _.set(e, o);
    }, A = [], Mn = {}, Pr, si = function() {
      return Be() - ct > 34 && (Pr || (Pr = requestAnimationFrame(Dt)));
    }, hr = function() {
      (!tt || !tt.isPressed || tt.startX > te.clientWidth) && (x.cache++, tt ? Pr || (Pr = requestAnimationFrame(Dt)) : Dt(), ct || er("scrollStart"), ct = Be());
    }, kn = function() {
      jn = L.innerWidth, Un = L.innerHeight;
    }, Or = function() {
      x.cache++, !Ae && !Vn && !Q.fullscreenElement && !Q.webkitFullscreenElement && (!$n || jn !== L.innerWidth || Math.abs(L.innerHeight - Un) > L.innerHeight * 0.25) && Wr.restart(!0);
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
      for (Xe = 0; Xe < A.length; Xe++)
        t = A[Xe], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || er("revert");
    }, ci = function(e, n) {
      x.cache++, (n || !nt) && x.forEach(function(t) {
        return He(t) && t.cacheID++ && (t.rec = 0);
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
        return He(r) && r.cacheID++ && (r.rec = r());
      });
      var t = er("refreshInit");
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
      }), ci(_n, 1), Wr.pause(), tr++, nt = 2, Dt(2), A.forEach(function(r) {
        return He(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), nt = I.isRefreshing = !1, er("refresh");
    }, En = 0, on = 1, Rr, Dt = function(e) {
      if (!nt || e === 2) {
        I.isUpdating = !0, Rr && Rr.update(0);
        var n = A.length, t = Be(), r = t - mn >= 50, o = n && A[0].scroll();
        if (on = En > o ? -1 : 1, nt || (En = o), r && (ct && !$r && t - ct > 200 && (ct = 0, er("scrollEnd")), Gr = mn, mn = t), on < 0) {
          for (Xe = n; Xe-- > 0; )
            A[Xe] && A[Xe].update(0, r);
          on = 1;
        } else
          for (Xe = 0; Xe < n; Xe++)
            A[Xe] && A[Xe].update(0, r);
        I.isUpdating = !1;
      }
      Pr = 0;
    }, Pn = [ti, ri, yn, wn, ut + Er, ut + Mr, ut + Cr, ut + kr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], sn = Pn.concat([Kt, Zt, "boxSizing", "max" + pr, "max" + xn, "position", ut, ne, ne + Cr, ne + Mr, ne + Er, ne + kr]), Ii = function(e, n, t) {
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
        c.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (c.display = "inline-block"), a[yn] = a[wn] = "auto", c.flexBasis = t.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Kt] = Sn(e, Ye) + Ce, c[Zt] = Sn(e, pe) + Ce, c[ne] = a[ut] = a[ri] = a[ti] = "0", gr(r), a[Kt] = a["max" + pr] = t[Kt], a[Zt] = a["max" + xn] = t[Zt], a[ne] = t[ne], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
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
    }, fi = function(e, n, t, r, o, c, a, g, k, H, N, m, f) {
      He(e) && (e = e(g)), _t(e) && e.substr(0, 3) === "max" && (e = m + (e.charAt(4) === "=" ? tn("0" + e.substr(3), t) : 0));
      var w = f ? f.time() : 0, $, ie, q;
      if (f && f.seek(0), Sr(e))
        f && (e = _.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, m, e)), a && nn(a, t, r, !0);
      else {
        He(n) && (n = n(g));
        var Ke = (e || "0").split(" "), re, F, Ie, oe;
        q = Qe(n) || te, re = Rt(q) || {}, (!re || !re.left && !re.top) && vt(q).display === "none" && (oe = q.style.display, q.style.display = "block", re = Rt(q), oe ? q.style.display = oe : q.style.removeProperty("display")), F = tn(Ke[0], re[r.d]), Ie = tn(Ke[1] || "0", t), e = re[r.p] - k[r.p] - H + F + o - Ie, a && nn(a, Ie, r, t - Ie < 20 || a._isStart && Ie > 20), t -= t - Ie;
      }
      if (c) {
        var P = e + t, Ze = c._isStart;
        $ = "scroll" + r.d2, nn(c, P, r, Ze && P > 20 || !Ze && (N ? Math.max(te[$], gt[$]) : c.parentNode[$]) <= P + 1), N && (k = Rt(a), N && (c.style[r.op.p] = k[r.op.p] - r.op.m - c._offset + Ce));
      }
      return f && q && ($ = Rt(q), f.seek(m), ie = Rt(q), f._caScrollDist = $[r.p] - ie[r.p], e = e / f._caScrollDist * m), f && f.seek(w), f ? e : Math.round(e);
    }, Fi = /(webkit|moz|length|cssText|inset)/i, di = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var o = e.style, c, a;
        if (n === te) {
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
      var t = Xt(e, n), r = "_scroll" + n.p2, o = function c(a, g, k, H, N) {
        var m = c.tween, f = g.onComplete, w = {};
        k = k || t();
        var $ = pi(t, k, function() {
          m.kill(), c.tween = 0;
        });
        return N = H && N || 0, H = H || a - k, m && m.kill(), g[r] = a, g.modifiers = w, w[r] = function() {
          return $(k + H * m.ratio + N * m.ratio * m.ratio);
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
        var o = t, c = o.onUpdate, a = o.toggleClass, g = o.id, k = o.onToggle, H = o.onRefresh, N = o.scrub, m = o.trigger, f = o.pin, w = o.pinSpacing, $ = o.invalidateOnRefresh, ie = o.anticipatePin, q = o.onScrubComplete, Ke = o.onSnapComplete, re = o.once, F = o.snap, Ie = o.pinReparent, oe = o.pinSpacer, P = o.containerAnimation, Ze = o.fastScrollEnd, mt = o.preventOverlaps, O = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ye : pe, Ee = !N && N !== 0, E = Qe(t.scroller || L), At = _.core.getCache(E), Pe = Qt(E), Ne = ("pinType" in t ? t.pinType : St(E, "pinType") || Pe && "fixed") === "fixed", We = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = Ee && t.toggleActions.split(" "), he = "markers" in t ? t.markers : Jr.markers, ue = Pe ? 0 : parseFloat(vt(E)["border" + O.p2 + pr]) || 0, l = this, ge = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, nr = Ci(E, Pe, O), Nt = Ei(E, Pe), ft = 0, Wt = 0, j = Xt(E, O), ze, qe, Dr, it, dt, Y, me, ot, Mt, Ge, u, It, K, qt, Gt, _r, Ve, Ar, Vt, se, st, $e, Ir, Ue, kt, zr, $t, vr, ir, or, z, zt, bt, wt, pt, yt, sr, mr, Lt;
        if (gn(l), l._dir = O, ie *= 45, l.scroller = E, l.scroll = P ? P.time.bind(P) : j, it = j(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Rr = l)), At.tweenScroll = At.tweenScroll || {
          top: hi(E, pe),
          left: hi(E, Ye)
        }, l.tweenTo = ze = At.tweenScroll[O.p], l.scrubDuration = function(d) {
          zt = Sr(d) && d, zt ? z ? z.duration(d) : z = _.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: zt,
            paused: !0,
            onComplete: function() {
              return q && q(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(N), z && z.resetTo && z.resetTo("totalProgress", 0), ir = 0, g || (g = r.vars.id)), A.push(l), F && ((!Qr(F) || F.push) && (F = {
          snapTo: F
        }), "scrollBehavior" in te.style && _.set(Pe ? [te, gt] : E, {
          scrollBehavior: "auto"
        }), x.forEach(function(d) {
          return He(d) && d.target === (Pe ? Q.scrollingElement || gt : E) && (d.smooth = !1);
        }), Dr = He(F.snapTo) ? F.snapTo : F.snapTo === "labels" ? Oi(r) : F.snapTo === "labelsDirectional" ? Ri(r) : F.directional !== !1 ? function(d, y) {
          return Tn(F.snapTo)(d, Be() - Wt < 500 ? 0 : y.direction);
        } : _.utils.snap(F.snapTo), bt = F.duration || {
          min: 0.1,
          max: 2
        }, bt = Qr(bt) ? ur(bt.min, bt.max) : ur(bt, bt), wt = _.delayedCall(F.delay || zt / 2 || 0.1, function() {
          var d = j(), y = Be() - Wt < 500, T = ze.tween;
          if ((y || Math.abs(l.getVelocity()) < 10) && !T && !$r && ft !== d) {
            var D = (d - Y) / K, be = r && !Ee ? r.totalProgress() : D, W = y ? 0 : (be - or) / (Be() - Gr) * 1e3 || 0, J = _.utils.clamp(-D, 1 - D, dr(W / 2) * W / 0.185), Oe = D + (F.inertia === !1 ? 0 : J), we = ur(0, 1, Dr(Oe, l)), fe = Math.round(Y + we * K), ee = F, at = ee.onStart, je = ee.onInterrupt, ye = ee.onComplete;
            if (d <= me && d >= Y && fe !== d) {
              if (T && !T._initted && T.data <= dr(fe - d))
                return;
              F.inertia === !1 && (J = we - D), ze(fe, {
                duration: bt(dr(Math.max(dr(Oe - be), dr(we - be)) * 0.185 / W / 0.05 || 0)),
                ease: F.ease || "power3",
                data: dr(fe - d),
                onInterrupt: function() {
                  return wt.restart(!0) && je && je(l);
                },
                onComplete: function() {
                  l.update(), ft = j(), ir = or = r && !Ee ? r.totalProgress() : l.progress, Ke && Ke(l), ye && ye(l);
                }
              }, d, J * K, fe - d - J * K), at && at(l, ze.tween);
            }
          } else
            l.isActive && ft !== d && wt.restart(!0);
        }).pause()), g && (Mn[g] = l), m = l.trigger = Qe(m || f), Lt = m && m._gsap && m._gsap.stRevert, Lt && (Lt = Lt(l)), f = f === !0 ? m : Qe(f), _t(a) && (a = {
          targets: m,
          className: a
        }), f && (w === !1 || w === ut || (w = !w && f.parentNode && f.parentNode.style && vt(f.parentNode).display === "flex" ? !1 : ne), l.pin = f, qe = _.core.getCache(f), qe.spacer ? qt = qe.pinState : (oe && (oe = Qe(oe), oe && !oe.nodeType && (oe = oe.current || oe.nativeElement), qe.spacerIsNative = !!oe, oe && (qe.spacerState = an(oe))), qe.spacer = Ve = oe || Q.createElement("div"), Ve.classList.add("pin-spacer"), g && Ve.classList.add("pin-spacer-" + g), qe.pinState = qt = an(f)), t.force3D !== !1 && _.set(f, {
          force3D: !0
        }), l.spacer = Ve = qe.spacer, vr = vt(f), Ir = vr[w + O.os2], Vt = _.getProperty(f), se = _.quickSetter(f, O.a, Ce), On(f, Ve, vr), _r = an(f)), he) {
          It = Qr(he) ? ni(he, oi) : oi, Ge = rn("scroller-start", g, E, O, It, 0), u = rn("scroller-end", g, E, O, It, 0, Ge), Ar = Ge["offset" + O.op.d2];
          var Lr = Qe(St(E, "content") || E);
          ot = this.markerStart = rn("start", g, Lr, O, It, Ar, 0, P), Mt = this.markerEnd = rn("end", g, Lr, O, It, Ar, 0, P), P && (mr = _.quickSetter([ot, Mt], O.a, Ce)), !Ne && !(X.length && St(E, "fixedMarkers") === !0) && (Pi(Pe ? te : E), _.set([Ge, u], {
            force3D: !0
          }), kt = _.quickSetter(Ge, O.a, Ce), $t = _.quickSetter(u, O.a, Ce));
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
        }, l.revert = function(d, y) {
          if (!y)
            return l.kill(!0);
          var T = d !== !1 || !l.enabled, D = Ae;
          T !== l.isReverted && (T && (yt = Math.max(j(), l.scroll.rec || 0), pt = l.progress, sr = r && r.progress()), ot && [ot, Mt, Ge, u].forEach(function(be) {
            return be.style.display = T ? "none" : "block";
          }), T && (Ae = l, l.update(T)), f && (!Ie || !l.isActive) && (T ? Ii(f, Ve, qt) : On(f, Ve, vt(f), Ue)), T || l.update(T), Ae = D, l.isReverted = T);
        }, l.refresh = function(d, y) {
          if (!((Ae || !l.enabled) && !y)) {
            if (f && d && ct) {
              _e(s, "scrollEnd", ai);
              return;
            }
            !nt && ge && ge(l), Ae = l, Wt = Be(), ze.tween && (ze.tween.kill(), ze.tween = 0), z && z.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var T = nr(), D = Nt(), be = P ? P.duration() : Ht(E, O), W = K <= 0.01, J = 0, Oe = 0, we = t.end, fe = t.endTrigger || m, ee = t.start || (t.start === 0 || !m ? 0 : f ? "0 0" : "0 100%"), at = l.pinnedContainer = t.pinnedContainer && Qe(t.pinnedContainer), je = m && Math.max(0, A.indexOf(l)) || 0, ye = je, ae, Le, br, ar, de, xe, Ct, Dn, bi, Fr, Et; ye--; )
              xe = A[ye], xe.end || xe.refresh(0, 1) || (Ae = l), Ct = xe.pin, Ct && (Ct === m || Ct === f || Ct === at) && !xe.isReverted && (Fr || (Fr = []), Fr.unshift(xe), xe.revert(!0, !0)), xe !== A[ye] && (je--, ye--);
            for (He(ee) && (ee = ee(l)), Y = fi(ee, m, T, O, j(), ot, Ge, l, D, ue, Ne, be, P) || (f ? -1e-3 : 0), He(we) && (we = we(l)), _t(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (_t(ee) ? ee.split(" ")[0] : "") + we : (J = tn(we.substr(2), T), we = _t(ee) ? ee : (P ? _.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, Y) : Y) + J, fe = m)), me = Math.max(Y, fi(we || (fe ? "100% 0" : be), fe, T, O, j() + J, Mt, u, l, D, ue, Ne, be, P)) || -1e-3, K = me - Y || (Y -= 0.01) && 1e-3, J = 0, ye = je; ye--; )
              xe = A[ye], Ct = xe.pin, Ct && xe.start - xe._pinPush <= Y && !P && xe.end > 0 && (ae = xe.end - xe.start, (Ct === m && xe.start - xe._pinPush < Y || Ct === at) && !Sr(ee) && (J += ae * (1 - xe.progress)), Ct === f && (Oe += ae));
            if (Y += J, me += J, W && (pt = _.utils.clamp(0, 1, _.utils.normalize(Y, me, yt))), l._pinPush = Oe, ot && J && (ae = {}, ae[O.a] = "+=" + J, at && (ae[O.p] = "-=" + j()), _.set([ot, Mt], ae)), f)
              ae = vt(f), ar = O === pe, br = j(), st = parseFloat(Vt(O.a)) + Oe, !be && me > 1 && (Et = (Pe ? Q.scrollingElement || gt : E).style, Et = {
                style: Et,
                value: Et["overflow" + O.a.toUpperCase()]
              }, Et.style["overflow" + O.a.toUpperCase()] = "scroll"), On(f, Ve, ae), _r = an(f), Le = Rt(f, !0), Dn = Ne && Xt(E, ar ? Ye : pe)(), w && (Ue = [w + O.os2, K + Oe + Ce], Ue.t = Ve, ye = w === ne ? Sn(f, O) + K + Oe : 0, ye && Ue.push(O.d, ye + Ce), gr(Ue), at && A.forEach(function(Yr) {
                Yr.pin === at && Yr.vars.pinSpacing !== !1 && (Yr._subPinOffset = !0);
              }), Ne && j(yt)), Ne && (de = {
                top: Le.top + (ar ? br - Y : Dn) + Ce,
                left: Le.left + (ar ? Dn : br - Y) + Ce,
                boxSizing: "border-box",
                position: "fixed"
              }, de[Kt] = de["max" + pr] = Math.ceil(Le.width) + Ce, de[Zt] = de["max" + xn] = Math.ceil(Le.height) + Ce, de[ut] = de[ut + Cr] = de[ut + Mr] = de[ut + Er] = de[ut + kr] = "0", de[ne] = ae[ne], de[ne + Cr] = ae[ne + Cr], de[ne + Mr] = ae[ne + Mr], de[ne + Er] = ae[ne + Er], de[ne + kr] = ae[ne + kr], Gt = Li(qt, de, Ie), nt && j(0)), r ? (bi = r._initted, hn(1), r.render(r.duration(), !0, !0), $e = Vt(O.a) - st + K + Oe, zr = Math.abs(K - $e) > 1, Ne && zr && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), hn(0)) : $e = K, Et && (Et.value ? Et.style["overflow" + O.a.toUpperCase()] = Et.value : Et.style.removeProperty("overflow-" + O.a));
            else if (m && j() && !P)
              for (Le = m.parentNode; Le && Le !== te; )
                Le._pinOffset && (Y -= Le._pinOffset, me -= Le._pinOffset), Le = Le.parentNode;
            Fr && Fr.forEach(function(Yr) {
              return Yr.revert(!1, !0);
            }), l.start = Y, l.end = me, it = dt = nt ? yt : j(), !P && !nt && (it < yt && j(yt), l.scroll.rec = 0), l.revert(!1, !0), wt && (ft = -1, l.isActive && j(Y + K * pt), wt.restart(!0)), Ae = 0, r && Ee && (r._initted || sr) && r.progress() !== sr && r.progress(sr, !0).render(r.time(), !0, !0), (W || pt !== l.progress || P) && (r && !Ee && r.totalProgress(P && Y < -1e-3 && !pt ? _.utils.normalize(Y, me, 0) : pt, !0), l.progress = (it - Y) / K === pt ? 0 : pt), f && w && (Ve._pinOffset = Math.round(l.progress * $e)), z && z.invalidate(), H && !nt && H(l);
          }
        }, l.getVelocity = function() {
          return (j() - dt) / (Be() - Gr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Tr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? Ee || Tr(r, l.direction < 0, 1) : Tr(r, r.reversed()));
        }, l.labelToScroll = function(d) {
          return r && r.labels && (Y || l.refresh() || Y) + r.labels[d] / r.duration() * K || 0;
        }, l.getTrailing = function(d) {
          var y = A.indexOf(l), T = l.direction > 0 ? A.slice(0, y).reverse() : A.slice(y + 1);
          return (_t(d) ? T.filter(function(D) {
            return D.vars.preventOverlaps === d;
          }) : T).filter(function(D) {
            return l.direction > 0 ? D.end <= Y : D.start >= me;
          });
        }, l.update = function(d, y, T) {
          if (!(P && !T && !d)) {
            var D = nt === !0 ? yt : l.scroll(), be = d ? 0 : (D - Y) / K, W = be < 0 ? 0 : be > 1 ? 1 : be || 0, J = l.progress, Oe, we, fe, ee, at, je, ye, ae;
            if (y && (dt = it, it = P ? j() : D, F && (or = ir, ir = r && !Ee ? r.totalProgress() : W)), ie && !W && f && !Ae && !Ur && ct && Y < D + (D - dt) / (Be() - Gr) * ie && (W = 1e-4), W !== J && l.enabled) {
              if (Oe = l.isActive = !!W && W < 1, we = !!J && J < 1, je = Oe !== we, at = je || !!W != !!J, l.direction = W > J ? 1 : -1, l.progress = W, at && !Ae && (fe = W && !J ? 0 : W === 1 ? 1 : J === 1 ? 2 : 3, Ee && (ee = !je && G[fe + 1] !== "none" && G[fe + 1] || G[fe], ae = r && (ee === "complete" || ee === "reset" || ee in r))), mt && (je || ae) && (ae || N || !r) && (He(mt) ? mt(l) : l.getTrailing(mt).forEach(function(de) {
                return de.endAnimation();
              })), Ee || (z && !Ae && !Ur ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", W, r._tTime / r._tDur) : (z.vars.totalProgress = W, z.invalidate().restart())) : r && r.totalProgress(W, !!Ae)), f) {
                if (d && w && (Ve.style[w + O.os2] = Ir), !Ne)
                  se(xr(st + $e * W));
                else if (at) {
                  if (ye = !d && W > J && me + 1 > D && D + 1 >= Ht(E, O), Ie)
                    if (!d && (Oe || ye)) {
                      var Le = Rt(f, !0), br = D - Y;
                      di(f, te, Le.top + (O === pe ? br : 0) + Ce, Le.left + (O === pe ? 0 : br) + Ce);
                    } else
                      di(f, Ve);
                  gr(Oe || ye ? Gt : _r), zr && W < 1 && Oe || se(st + (W === 1 && !ye ? $e : 0));
                }
              }
              F && !ze.tween && !Ae && !Ur && wt.restart(!0), a && (je || re && W && (W < 1 || !vn)) && qr(a.targets).forEach(function(de) {
                return de.classList[Oe || re ? "add" : "remove"](a.className);
              }), c && !Ee && !d && c(l), at && !Ae ? (Ee && (ae && (ee === "complete" ? r.pause().totalProgress(1) : ee === "reset" ? r.restart(!0).pause() : ee === "restart" ? r.restart(!0) : r[ee]()), c && c(l)), (je || !vn) && (k && je && bn(l, k), We[fe] && bn(l, We[fe]), re && (W === 1 ? l.kill(!1, 1) : We[fe] = 0), je || (fe = W === 1 ? 1 : 3, We[fe] && bn(l, We[fe]))), Ze && !Oe && Math.abs(l.getVelocity()) > (Sr(Ze) ? Ze : 2500) && (Tr(l.callbackAnimation), z ? z.progress(1) : Tr(r, ee === "reverse" ? 1 : !W, 1))) : Ee && c && !Ae && c(l);
            }
            if ($t) {
              var ar = P ? D / P.duration() * (P._caScrollDist || 0) : D;
              kt(ar + (Ge._isFlipped ? 1 : 0)), $t(ar);
            }
            mr && mr(-D / P.duration() * (P._caScrollDist || 0));
          }
        }, l.enable = function(d, y) {
          l.enabled || (l.enabled = !0, _e(E, "resize", Or), _e(Pe ? Q : E, "scroll", hr), ge && _e(s, "refreshInit", ge), d !== !1 && (l.progress = pt = 0, it = dt = ft = j()), y !== !1 && l.refresh());
        }, l.getTween = function(d) {
          return d && ze ? ze.tween : z;
        }, l.setPositions = function(d, y) {
          f && (st += d - Y, $e += y - d - K, w === ne && l.adjustPinSpacing(y - d - K)), l.start = Y = d, l.end = me = y, K = y - d, l.update();
        }, l.adjustPinSpacing = function(d) {
          if (Ue && d) {
            var y = Ue.indexOf(O.d) + 1;
            Ue[y] = parseFloat(Ue[y]) + d + Ce, Ue[1] = parseFloat(Ue[1]) + d + Ce, gr(Ue);
          }
        }, l.disable = function(d, y) {
          if (l.enabled && (d !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, y || z && z.pause(), yt = 0, qe && (qe.uncache = 1), ge && ve(s, "refreshInit", ge), wt && (wt.pause(), ze.tween && ze.tween.kill() && (ze.tween = 0)), !Pe)) {
            for (var T = A.length; T--; )
              if (A[T].scroller === E && A[T] !== l)
                return;
            ve(E, "resize", Or), ve(E, "scroll", hr);
          }
        }, l.kill = function(d, y) {
          l.disable(d, y), z && !y && z.kill(), g && delete Mn[g];
          var T = A.indexOf(l);
          T >= 0 && A.splice(T, 1), T === Xe && on > 0 && Xe--, T = 0, A.forEach(function(D) {
            return D.scroller === l.scroller && (T = 1);
          }), T || nt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
            kill: !1
          }), y || r.kill()), ot && [ot, Mt, Ge, u].forEach(function(D) {
            return D.parentNode && D.parentNode.removeChild(D);
          }), Rr === l && (Rr = 0), f && (qe && (qe.uncache = 1), T = 0, A.forEach(function(D) {
            return D.pin === f && T++;
          }), T || (qe.spacer = 0)), t.onKill && t.onKill(l);
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
        }), ve(L, "wheel", hr), ve(Q, "scroll", hr), clearInterval(Vr), ve(Q, "touchcancel", Tt), ve(te, "touchstart", Tt), Kr(ve, Q, "pointerdown,touchstart,mousedown", Qn), Kr(ve, Q, "pointerup,touchend,mouseup", Kn), Wr.kill(), jr(ve);
        for (var o = 0; o < x.length; o += 3)
          Zr(ve, x[o], x[o + 1]), Zr(ve, x[o], x[o + 2]);
      }, s.enable = function() {
        if (L = window, Q = document, gt = Q.documentElement, te = Q.body, _ && (qr = _.utils.toArray, ur = _.utils.clamp, gn = _.core.context || Tt, hn = _.core.suppressOverwrites || Tt, _n = L.history.scrollRestoration || "auto", En = L.pageYOffset, _.core.globals("ScrollTrigger", s), te)) {
          yr = 1, ki(), ce.register(_), s.isTouch = ce.isTouch, Bt = ce.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(L, "wheel", hr), Nn = [L, Q, gt, te], _.matchMedia ? (s.matchMedia = function(g) {
            var k = _.matchMedia(), H;
            for (H in g)
              k.add(H, g[H]);
            return k;
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
          }), t.borderTopStyle = "solid", c = Rt(te), pe.m = Math.round(c.top + pe.sc()) || 0, Ye.m = Math.round(c.left + Ye.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Vr = setInterval(si, 250), _.delayedCall(0.5, function() {
            return Ur = 0;
          }), _e(Q, "touchcancel", Tt), _e(te, "touchstart", Tt), Kr(_e, Q, "pointerdown,touchstart,mousedown", Qn), Kr(_e, Q, "pointerup,touchend,mouseup", Kn), pn = _.utils.checkPrefix("transform"), sn.push(pn), cr = Be(), Wr = _.delayedCall(0.2, rr).pause(), fr = [Q, "visibilitychange", function() {
            var g = L.innerWidth, k = L.innerHeight;
            Q.hidden ? (Wn = g, qn = k) : (Wn !== g || qn !== k) && Or();
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
        var o = Qe(t), c = x.indexOf(o), a = Qt(o);
        ~c && x.splice(c, a ? 6 : 2), r && (a ? X.unshift(L, r, te, r, gt, r) : X.unshift(o, r));
      }, s.clearMatchMedia = function(t) {
        A.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, s.isInViewport = function(t, r, o) {
        var c = (_t(t) ? Qe(t) : t).getBoundingClientRect(), a = c[o ? Kt : Zt] * r || 0;
        return o ? c.right - a > 0 && c.left + a < L.innerWidth : c.bottom - a > 0 && c.top + a < L.innerHeight;
      }, s.positionInViewport = function(t, r, o) {
        _t(t) && (t = Qe(t));
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
      return !!ct;
    }, I.snapDirectional = Tn, I.addEventListener = function(s, e) {
      var n = Jt[s] || (Jt[s] = []);
      ~n.indexOf(e) || n.push(e);
    }, I.removeEventListener = function(s, e) {
      var n = Jt[s], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, I.batch = function(s, e) {
      var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, c = function(k, H) {
        var N = [], m = [], f = _.delayedCall(r, function() {
          H(N, m), N = [], m = [];
        }).pause();
        return function(w) {
          N.length || f.restart(!0), N.push(w.trigger), m.push(w), o <= N.length && f.progress(1);
        };
      }, a;
      for (a in e)
        t[a] = a.substr(0, 2) === "on" && He(e[a]) && a !== "onRefreshInit" ? c(a, e[a]) : e[a];
      return He(o) && (o = o(), _e(I, "refresh", function() {
        return o = e.batchMax();
      })), qr(s).forEach(function(g) {
        var k = {};
        for (a in t)
          k[a] = t[a];
        k.trigger = g, n.push(I.create(k));
      }), n;
    };
    var gi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Rn = function s(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ce.isTouch ? " pinch-zoom" : "") : "none", e === gt && s(te, n);
    }, cn = {
      auto: 1,
      scroll: 1
    }, Yi = function(e) {
      var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, c = o._gsap || _.core.getCache(o), a = Be(), g;
      if (!c._isScrollT || a - c._isScrollT > 2e3) {
        for (; o && o !== te && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(cn[(g = vt(o)).overflowY] || cn[g.overflowX])); )
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
      var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, c = n.onRelease, a, g, k = Qe(e.target) || gt, H = _.core.globals().ScrollSmoother, N = H && H.get(), m = Bt && (e.content && Qe(e.content) || N && e.content !== !1 && !N.smooth() && N.content()), f = Xt(k, pe), w = Xt(k, Ye), $ = 1, ie = (ce.isTouch && L.visualViewport ? L.visualViewport.scale * L.visualViewport.width : L.outerWidth) / L.innerWidth, q = 0, Ke = He(r) ? function() {
        return r(a);
      } : function() {
        return r || 2.8;
      }, re, F, Ie = _i(k, e.type, !0, o), oe = function() {
        return F = !1;
      }, P = Tt, Ze = Tt, mt = function() {
        g = Ht(k, pe), Ze = ur(Bt ? 1 : 0, g), t && (P = ur(0, Ht(k, Ye))), re = tr;
      }, O = function() {
        m._gsap.y = xr(parseFloat(m._gsap.y) + f.offset) + "px", m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(m._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
      }, Ee = function() {
        if (F) {
          requestAnimationFrame(oe);
          var he = xr(a.deltaY / 2), ue = Ze(f.v - he);
          if (m && ue !== f.v + f.offset) {
            f.offset = ue - f.v;
            var l = xr((parseFloat(m && m._gsap.y) || 0) - f.offset);
            m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", m._gsap.y = l + "px", f.cacheID = x.cache, Dt();
          }
          return !0;
        }
        f.offset && O(), F = !0;
      }, E, At, Pe, Ne, We = function() {
        mt(), E.isActive() && E.vars.scrollY > g && (f() > g ? E.progress(1) && f(g) : E.resetTo("scrollY", g));
      };
      return m && _.set(m, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Bt && G.type === "touchmove" && Ee() || $ > 1.05 && G.type !== "touchstart" || a.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        F = !1;
        var G = $;
        $ = xr((L.visualViewport && L.visualViewport.scale || 1) / ie), E.pause(), G !== $ && Rn(k, $ > 1.01 ? !0 : t ? !1 : "x"), At = w(), Pe = f(), mt(), re = tr;
      }, e.onRelease = e.onGestureStart = function(G, he) {
        if (f.offset && O(), !he)
          Ne.restart(!0);
        else {
          x.cache++;
          var ue = Ke(), l, ge;
          t && (l = w(), ge = l + ue * 0.05 * -G.velocityX / 0.227, ue *= gi(w, l, ge, Ht(k, Ye)), E.vars.scrollX = P(ge)), l = f(), ge = l + ue * 0.05 * -G.velocityY / 0.227, ue *= gi(f, l, ge, Ht(k, pe)), E.vars.scrollY = Ze(ge), E.invalidate().duration(ue).play(0.01), (Bt && E.vars.scrollY >= g || l >= g - 1) && _.to({}, {
            onUpdate: We,
            duration: ue
          });
        }
        c && c(G);
      }, e.onWheel = function() {
        E._ts && E.pause(), Be() - q > 1e3 && (re = 0, q = Be());
      }, e.onChange = function(G, he, ue, l, ge) {
        if (tr !== re && mt(), he && t && w(P(l[2] === he ? At + (G.startX - G.x) : w() + he - l[1])), ue) {
          f.offset && O();
          var nr = ge[2] === ue, Nt = nr ? Pe + G.startY - G.y : f() + ue - ge[1], ft = Ze(Nt);
          nr && Nt !== ft && (Pe += ft - Nt), f(ft);
        }
        (ue || he) && Dt();
      }, e.onEnable = function() {
        Rn(k, t ? !1 : "x"), I.addEventListener("refresh", We), _e(L, "resize", We), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = w.smooth = !1), Ie.enable();
      }, e.onDisable = function() {
        Rn(k, !0), ve(L, "resize", We), I.removeEventListener("refresh", We), Ie.kill();
      }, e.lockAxis = e.lockAxis !== !1, a = new ce(e), a.iOS = Bt, Bt && !f() && f(1), Bt && _.ticker.add(Tt), Ne = a._dc, E = _.to(a, {
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
      var e = s instanceof ce ? s : Bi(s);
      return tt && tt.target === e.target && tt.kill(), Qt(e.target) && (tt = e), e;
    }, I.core = {
      _getVelocityProp: dn,
      _inputObserver: _i,
      _scrollers: x,
      _proxies: X,
      bridge: {
        ss: function() {
          ct || er("scrollStart"), ct = Be();
        },
        ref: function() {
          return Ae;
        }
      }
    }, Jn() && _.registerPlugin(I), p.ScrollTrigger = I, p.default = I, typeof window > "u" || window !== p ? Object.defineProperty(p, "__esModule", { value: !0 }) : delete window.default;
  });
})(Ln, Ln.exports);
var Ti = Ln.exports;
Fe.registerPlugin(Ti.ScrollTrigger);
class Mi extends Br {
  static create(h, p = {}, C = {}) {
    return new Mi(h, p, C);
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
  constructor(h, p = {}, C = {}) {
    super(
      (b) => {
        var Yt, ke;
        Object.assign(b.meta, {
          speed: p.speed ?? 1,
          velocity: p.velocity ?? 0,
          direction: p.direction || "rtl",
          onCreated: p.onCreated,
          onUpdate: p.onUpdate
        }), b.meta.scrollTrigger = Ti.ScrollTrigger.create(p.scrollTrigger ?? {});
        let v = null;
        typeof h == "string" ? v = document.querySelector(h) : h instanceof HTMLElement && (v = h);
        const Z = p.createDOMContainers != null ? p.createDOMContainers : !0, M = Z ? document.createElement("div") : v == null ? void 0 : v.querySelector(".owow-marquee-outer");
        M == null || M.classList.add("owow-marquee-outer");
        const B = Z ? document.createElement("div") : M == null ? void 0 : M.querySelector(".owow-marquee-inner");
        if (B == null || B.classList.add("owow-marquee-inner"), !v || !M || !B)
          throw console.error({
            targetContainer: v,
            outerContainer: M,
            innerContainer: B
          }), new Error("Invalid marquee DOM structure");
        b.meta.sourceDOM = v.cloneNode(!0), b.meta.target = v, B.append(...v.childNodes), M.append(B), v == null || v.append(M), Fe.set(B, { display: "inline-flex" });
        const le = v.getBoundingClientRect(), Se = B.getBoundingClientRect(), Je = le.width + Se.width, Te = document.createDocumentFragment(), Re = [];
        let Pt = Se.width;
        if (!Je || !Pt)
          return;
        for (; Pt <= Je; ) {
          const U = B.cloneNode(!0);
          Pt += Se.width, Re.push(U);
        }
        Te.append(...Re), M.append(Te);
        const et = Fe.context(() => {
          Fe.set(M, {
            x: 0,
            force3D: !0,
            width: Pt,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), De = Fe.utils.pipe(
          (U) => Math.floor(U * 1e3) / 1e3,
          Fe.quickSetter(M, "x", "px")
        ), Ot = Fe.utils.wrap(0, -Se.width), Ut = Fe.utils.normalize(0, -Se.width);
        let xt, ht, x, X, Me, lt, Ft;
        const St = Fe.ticker.add(() => {
          var U, jt;
          switch (ht = b.meta.velocity != null ? b.meta.scrollTrigger.getVelocity() ?? 0 : 0, x = ht * b.meta.velocity, b.meta.direction) {
            case "ltr":
              xt = -1, x = -Math.abs(x);
              break;
            case "rtl":
              xt = 1, x = Math.abs(x);
              break;
            case "scroll":
              xt = b.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              xt = -(b.meta.scrollTrigger.direction ?? 1), x = -x;
          }
          X = Fe.getProperty(M, "x"), Me = b.meta.speed * -xt, lt = (Me - x) * Fe.ticker.deltaRatio(), Ft = Ot(X + lt), De(Ft), (jt = (U = b.meta).onUpdate) == null || jt.call(U, Ut(Ft));
        });
        return (ke = (Yt = b.meta).onCreated) == null || ke.call(Yt), () => {
          var U;
          for (et.kill(!0), Fe.ticker.remove(St), v == null || v.replaceChildren(...b.meta.sourceDOM.childNodes); Re.length; )
            (U = Re.pop()) == null || U.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...C
      }
    );
  }
}
class go extends Br {
  constructor(h, p = {}, C = {}) {
    super(async (b, v) => {
      const Z = await fo();
      if (!Z)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      un.registerPlugin(Z);
      const M = un.utils.toArray(h);
      for (const Te of M)
        if (!(Te instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const B = b.meta.childSplit = new Z(h, {
        type: "lines",
        linesClass: "owow-split-child",
        ...lr(p.childSplitVars)
      }), le = b.meta.parentSplit = new Z(h, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...lr(p.parentSplitVars)
      }), Se = {
        y: (Te, Re) => parseFloat(getComputedStyle(Re).lineHeight),
        ...lr(p.fromVars)
      }, Je = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...lr(p.toVars)
      };
      return v.add(() => {
        b.meta.setup = un.set(le.lines, { overflow: "hidden" }), b.meta.tween = un.fromTo(B.lines, Se, Je);
      }), () => {
        B.revert(), v.kill(!0);
      };
    }, C);
  }
}
async function fo() {
  var p;
  const i = "/node_modules/gsap/SplitText.js", h = /* @__PURE__ */ Object.assign({});
  try {
    const C = await ((p = h[i]) == null ? void 0 : p.call(h)) ?? null;
    return (C == null ? void 0 : C.default) ?? null;
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
