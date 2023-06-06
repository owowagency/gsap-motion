import { noop as Bi, fromEvent as An, debounceTime as Hi, Observable as Ni } from "rxjs";
import Ie from "gsap";
var Yr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wi(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var qi = "Expected a function", mi = 0 / 0, Gi = "[object Symbol]", $i = /^\s+|\s+$/g, Ui = /^[-+]0x[0-9a-f]+$/i, Vi = /^0b[01]+$/i, ji = /^0o[0-7]+$/i, Qi = parseInt, Ki = typeof Yr == "object" && Yr && Yr.Object === Object && Yr, Zi = typeof self == "object" && self && self.Object === Object && self, Ji = Ki || Zi || Function("return this")(), eo = Object.prototype, to = eo.toString, ro = Math.max, no = Math.min, Dn = function() {
  return Ji.Date.now();
};
function io(i, g, h) {
  var D, T, b, he, C, W, ge = 0, ze = !1, pt = !1, Ve = !0;
  if (typeof i != "function")
    throw new TypeError(qi);
  g = wi(g) || 0, In(h) && (ze = !!h.leading, pt = "maxWait" in h, b = pt ? ro(wi(h.maxWait) || 0, g) : b, Ve = "trailing" in h ? !!h.trailing : Ve);
  function je(X) {
    var Se = D, at = T;
    return D = T = void 0, ge = X, he = i.apply(at, Se), he;
  }
  function Pt(X) {
    return ge = X, C = setTimeout(Ot, g), ze ? je(X) : he;
  }
  function Je(X) {
    var Se = X - W, at = X - ge, Ft = g - Se;
    return pt ? no(Ft, b - at) : Ft;
  }
  function Pe(X) {
    var Se = X - W, at = X - ge;
    return W === void 0 || Se >= g || Se < 0 || pt && at >= b;
  }
  function Ot() {
    var X = Dn();
    if (Pe(X))
      return Vt(X);
    C = setTimeout(Ot, Je(X));
  }
  function Vt(X) {
    return C = void 0, Ve && D ? je(X) : (D = T = void 0, he);
  }
  function xt() {
    C !== void 0 && clearTimeout(C), ge = 0, D = W = T = C = void 0;
  }
  function ht() {
    return C === void 0 ? he : Vt(Dn());
  }
  function y() {
    var X = Dn(), Se = Pe(X);
    if (D = arguments, T = this, W = X, Se) {
      if (C === void 0)
        return Pt(W);
      if (pt)
        return C = setTimeout(Ot, g), je(W);
    }
    return C === void 0 && (C = setTimeout(Ot, g)), he;
  }
  return y.cancel = xt, y.flush = ht, y;
}
function In(i) {
  var g = typeof i;
  return !!i && (g == "object" || g == "function");
}
function oo(i) {
  return !!i && typeof i == "object";
}
function so(i) {
  return typeof i == "symbol" || oo(i) && to.call(i) == Gi;
}
function wi(i) {
  if (typeof i == "number")
    return i;
  if (so(i))
    return mi;
  if (In(i)) {
    var g = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = In(g) ? g + "" : g;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace($i, "");
  var h = Vi.test(i);
  return h || ji.test(i) ? Qi(i.slice(2), h ? 2 : 8) : Ui.test(i) ? mi : +i;
}
var ao = io;
const lo = /* @__PURE__ */ Wi(ao);
function Rn(i, ...g) {
  return i instanceof Function ? i.call(null, g) : i;
}
const yi = class {
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
  constructor(i, g = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = lo(
      () => {
        var h;
        (h = this.cleanup) == null || h.call(this, this.context), requestAnimationFrame(() => {
          var D;
          this.cleanup = ((D = this.create) == null ? void 0 : D.call(this, this, this.context)) ?? void 0;
        });
      },
      yi.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var h, D;
      (h = this.cleanup) == null || h.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const T of Object.keys(this.meta))
        delete this.meta[T];
      for (; this.subscriptions.length; )
        (D = this.subscriptions.pop()) == null || D.unsubscribe();
    }, this.observeMedia(Rn(g.watchMedia)), this.observeResize(Rn(g.shouldResetOnResize)), this.create = () => {
      var T;
      return this.context = Ie.context(Bi), [
        Rn(g.enable) ?? !0,
        ((T = this.mediaQueryList) == null ? void 0 : T.matches) ?? !0
      ].every(Boolean) ? i(this, this.context) : void 0;
    }, this.cleanup = this.create(this, this.context) ?? void 0;
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
    return i * Ie.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(i) {
    i && (this.mediaQueryList = matchMedia(i), this.subscriptions.push(An(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(i) {
    i && (this.motionResizeObserver = new co(i), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Hi(100)).subscribe(() => this.reset())
    ));
  }
};
let ln = yi;
ln.resetDebounceTime = 100;
ln.referenceFramerate = 60;
class co {
  constructor(g) {
    const [h, D] = [g].flat();
    this.element = typeof h == "string" ? document.querySelector(h) : h, this.axis = D, this.observable = new Ni((T) => {
      const b = new ResizeObserver(
        (he) => this.handleResize(he, T)
      );
      return this.element && b.observe(this.element), () => b.disconnect();
    });
  }
  handleResize(g, h) {
    const D = g.find((ge) => ge.target === this.element);
    if (!D)
      return;
    const { inlineSize: T, blockSize: b } = D.borderBoxSize[0], he = T !== this.inlineSize, C = b !== this.blockSize, W = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = T, this.blockSize = b, !W) {
      if (this.axis === "horizontal" && he || this.axis === "vertical" && C)
        return h.next();
      !this.axis && (he || C) && h.next();
    }
  }
}
class xi extends ln {
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
      (g) => {
        g.meta.observable = An(window, "mousemove"), g.subscriptions.push(
          g.meta.observable.subscribe((h) => {
            this.clientX = h.clientX, this.clientY = h.clientY, this.normalX = Ie.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Ie.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), g.subscriptions.push(
          An(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), g.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new xi());
  }
  get observable() {
    return this.meta.observable;
  }
}
const Ln = 1.70158, Fn = 0.7;
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
$.inBack = (i, g = Ln) => i * i * ((g + 1) * i - g);
$.outBack = (i, g = Ln) => {
  const h = i / 1 - 1;
  return h * h * ((g + 1) * h + g) + 1;
};
$.inOutBack = (i, g = Ln) => {
  const h = i * 2, D = h - 2, T = g * 1.525;
  return h < 1 ? 0.5 * h * h * ((T + 1) * h - T) : 0.5 * (D * D * ((T + 1) * D + T) + 2);
};
$.inElastic = (i, g = Fn) => {
  if (i === 0 || i === 1)
    return i;
  const D = i / 1 - 1, T = 1 - g, b = T / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * D) * Math.sin((D - b) * (2 * Math.PI) / T));
};
$.outElastic = (i, g = Fn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - g, D = i * 2, T = h / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * D) * Math.sin((D - T) * (2 * Math.PI) / h) + 1;
};
$.inOutElastic = (i, g = Fn) => {
  if (i === 0 || i === 1)
    return i;
  const h = 1 - g, D = i * 2, T = D - 1, b = h / (2 * Math.PI) * Math.asin(1);
  return D < 1 ? -0.5 * (Math.pow(2, 10 * T) * Math.sin((T - b) * (2 * Math.PI) / h)) : Math.pow(2, -10 * T) * Math.sin((T - b) * (2 * Math.PI) / h) * 0.5 + 1;
};
var zn = { exports: {} };
(function(i, g) {
  (function(h, D) {
    D(g);
  })(Yr, function(h) {
    function D(s, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(s, t.key, t);
      }
    }
    function T(s, e, n) {
      return e && D(s.prototype, e), n && D(s, n), s;
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
    var b, he, C, W, ge, ze, pt, Ve, je, Pt, Je, Pe, Ot, Vt = function() {
      return b || typeof window < "u" && (b = window.gsap) && b.registerPlugin && b;
    }, xt = 1, ht = [], y = [], X = [], Se = Date.now, at = function(e, n) {
      return n;
    }, Ft = function() {
      var e = je.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, y), r.push.apply(r, X), y = t, X = r, at = function(c, a) {
        return n[c](a);
      };
    }, St = function(e, n) {
      return ~X.indexOf(e) && X[X.indexOf(e) + 1][n];
    }, Yt = function(e) {
      return !!~Pt.indexOf(e);
    }, Te = function(e, n, t, r, o) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!o
      });
    }, V = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, jt = "scrollLeft", Xr = "scrollTop", cn = function() {
      return Je && Je.isPressed || y.cache++;
    }, Br = function(e, n) {
      var t = function r(o) {
        if (o || o === 0) {
          xt && (C.history.scrollRestoration = "manual");
          var c = Je && Je.isPressed;
          o = r.v = Math.round(o) || (Je && Je.iOS ? 1 : 0), e(o), r.cacheID = y.cache, c && at("ss", o);
        } else
          (n || y.cache !== r.cacheID || at("ref")) && (r.cacheID = y.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Le = {
      s: jt,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Br(function(s) {
        return arguments.length ? C.scrollTo(s, fe.sc()) : C.pageXOffset || W[jt] || ge[jt] || ze[jt] || 0;
      })
    }, fe = {
      s: Xr,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Le,
      sc: Br(function(s) {
        return arguments.length ? C.scrollTo(Le.sc(), s) : C.pageYOffset || W[Xr] || ge[Xr] || ze[Xr] || 0;
      })
    }, Qe = function(e) {
      return b.utils.toArray(e)[0] || (typeof e == "string" && b.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      Yt(e) && (e = W.scrollingElement || ge);
      var o = y.indexOf(e), c = r === fe.sc ? 1 : 2;
      !~o && (o = y.push(e) - 1), y[o + c] || e.addEventListener("scroll", cn);
      var a = y[o + c], p = a || (y[o + c] = Br(St(e, t), !0) || (Yt(e) ? r : Br(function(M) {
        return arguments.length ? e[t] = M : e[t];
      })));
      return p.target = e, a || (p.smooth = b.getProperty(e, "scrollBehavior") === "smooth"), p;
    }, un = function(e, n, t) {
      var r = e, o = e, c = Se(), a = c, p = n || 50, M = Math.max(500, p * 3), B = function(m, U) {
        var ne = Se();
        U || ne - c > p ? (o = r, r = m, a = c, c = ne) : t ? r += m : r = o + (m - o) / (ne - a) * (c - a);
      }, H = function() {
        o = r = t ? 0 : r, a = c = 0;
      }, v = function(m) {
        var U = a, ne = o, q = Se();
        return (m || m === 0) && m !== r && B(m), c === a || q - a > M ? 0 : (r + (t ? ne : -ne)) / ((t ? q : c) - U) * 1e3;
      };
      return {
        update: B,
        reset: H,
        getVelocity: v
      };
    }, mr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Yn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Xn = function() {
      je = b.core.globals().ScrollTrigger, je && je.core && Ft();
    }, Bn = function(e) {
      return b = e || Vt(), b && typeof document < "u" && document.body && (C = window, W = document, ge = W.documentElement, ze = W.body, Pt = [C, W, ge, ze], b.utils.clamp, Ot = b.core.context || function() {
      }, Ve = "onpointerenter" in ze ? "pointer" : "mouse", pt = ae.isTouch = C.matchMedia && C.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in C || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Pe = ae.eventTypes = ("ontouchstart" in ge ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ge ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return xt = 0;
      }, 500), Xn(), he = 1), he;
    };
    Le.op = fe, y.cache = 0;
    var ae = function() {
      function s(n) {
        this.init(n);
      }
      var e = s.prototype;
      return e.init = function(t) {
        he || Bn(b) || console.warn("Please gsap.registerPlugin(Observer)"), je || Xn();
        var r = t.tolerance, o = t.dragMinimum, c = t.type, a = t.target, p = t.lineHeight, M = t.debounce, B = t.preventDefault, H = t.onStop, v = t.onStopDelay, f = t.ignore, m = t.wheelSpeed, U = t.event, ne = t.onDragStart, q = t.onDragEnd, Ke = t.onDrag, te = t.onPress, F = t.onRelease, De = t.onRight, ie = t.onLeft, E = t.onUp, Ze = t.onDown, bt = t.onChangeX, P = t.onChangeY, ke = t.onChange, k = t.onToggleX, At = t.onToggleY, Ce = t.onHover, Be = t.onHoverEnd, He = t.onMove, G = t.ignoreCheck, de = t.isNormalizer, le = t.onGestureStart, l = t.onGestureEnd, pe = t.onWheel, nr = t.onEnable, Nt = t.onDisable, ut = t.onClick, Wt = t.scrollSpeed, j = t.capture, Re = t.allowClicks, Ne = t.lockAxis, Dr = t.onLockAxis;
        this.target = a = Qe(a) || ge, this.vars = t, f && (f = b.utils.toArray(f)), r = r || 1e-9, o = o || 0, m = m || 1, Wt = Wt || 1, c = c || "wheel,touch,pointer", M = M !== !1, p || (p = parseFloat(C.getComputedStyle(ze).lineHeight) || 22);
        var nt, ft, Y, be, it, Mt, We, u = this, It = 0, K = 0, qt = Xt(a, Le), Gt = Xt(a, fe), gr = qt(), qe = Gt(), Rr = ~c.indexOf("touch") && !~c.indexOf("pointer") && Pe[0] === "pointerdown", $t = Yt(a), oe = a.ownerDocument || W, ot = [0, 0, 0], Ge = [0, 0, 0], Ar = 0, $e = function() {
          return Ar = Se();
        }, kt = function(x, d) {
          return (u.event = x) && f && ~f.indexOf(x.target) || d && Rr && x.pointerType !== "touch" || G && G(x, d);
        }, Ir = function() {
          u._vx.reset(), u._vy.reset(), ft.pause(), H && H(u);
        }, Ut = function() {
          var x = u.deltaX = Yn(ot), d = u.deltaY = Yn(Ge), w = Math.abs(x) >= r, S = Math.abs(d) >= r;
          ke && (w || S) && ke(u, x, d, ot, Ge), w && (De && u.deltaX > 0 && De(u), ie && u.deltaX < 0 && ie(u), bt && bt(u), k && u.deltaX < 0 != It < 0 && k(u), It = u.deltaX, ot[0] = ot[1] = ot[2] = 0), S && (Ze && u.deltaY > 0 && Ze(u), E && u.deltaY < 0 && E(u), P && P(u), At && u.deltaY < 0 != K < 0 && At(u), K = u.deltaY, Ge[0] = Ge[1] = Ge[2] = 0), (be || Y) && (He && He(u), Y && (Ke(u), Y = !1), be = !1), Mt && !(Mt = !1) && Dr && Dr(u), it && (pe(u), it = !1), nt = 0;
        }, _r = function(x, d, w) {
          ot[w] += x, Ge[w] += d, u._vx.update(x), u._vy.update(d), M ? nt || (nt = requestAnimationFrame(Ut)) : Ut();
        }, ir = function(x, d) {
          Ne && !We && (u.axis = We = Math.abs(x) > Math.abs(d) ? "x" : "y", Mt = !0), We !== "y" && (ot[2] += x, u._vx.update(x, !0)), We !== "x" && (Ge[2] += d, u._vy.update(d, !0)), M ? nt || (nt = requestAnimationFrame(Ut)) : Ut();
        }, or = function(x) {
          if (!kt(x, 1)) {
            x = mr(x, B);
            var d = x.clientX, w = x.clientY, S = d - u.x, R = w - u.y, me = u.isDragging;
            u.x = d, u.y = w, (me || Math.abs(u.startX - d) >= o || Math.abs(u.startY - w) >= o) && (Ke && (Y = !0), me || (u.isDragging = !0), ir(S, R), me || ne && ne(u));
          }
        }, z = u.onPress = function(O) {
          kt(O, 1) || O && O.button || (u.axis = We = null, ft.pause(), u.isPressed = !0, O = mr(O), It = K = 0, u.startX = u.x = O.clientX, u.startY = u.y = O.clientY, u._vx.reset(), u._vy.reset(), Te(de ? a : oe, Pe[1], or, B, !0), u.deltaX = u.deltaY = 0, te && te(u));
        }, zt = u.onRelease = function(O) {
          if (!kt(O, 1)) {
            V(de ? a : oe, Pe[1], or, !0);
            var x = !isNaN(u.y - u.startY), d = u.isDragging && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), w = mr(O);
            !d && x && (u._vx.reset(), u._vy.reset(), B && Re && b.delayedCall(0.08, function() {
              if (Se() - Ar > 300 && !O.defaultPrevented) {
                if (O.target.click)
                  O.target.click();
                else if (oe.createEvent) {
                  var S = oe.createEvent("MouseEvents");
                  S.initMouseEvent("click", !0, !0, C, 1, w.screenX, w.screenY, w.clientX, w.clientY, !1, !1, !1, !1, 0, null), O.target.dispatchEvent(S);
                }
              }
            })), u.isDragging = u.isGesturing = u.isPressed = !1, H && !de && ft.restart(!0), q && d && q(u), F && F(u, d);
          }
        }, mt = function(x) {
          return x.touches && x.touches.length > 1 && (u.isGesturing = !0) && le(x, u.isDragging);
        }, wt = function() {
          return (u.isGesturing = !1) || l(u);
        }, dt = function(x) {
          if (!kt(x)) {
            var d = qt(), w = Gt();
            _r((d - gr) * Wt, (w - qe) * Wt, 1), gr = d, qe = w, H && ft.restart(!0);
          }
        }, yt = function(x) {
          if (!kt(x)) {
            x = mr(x, B), pe && (it = !0);
            var d = (x.deltaMode === 1 ? p : x.deltaMode === 2 ? C.innerHeight : 1) * m;
            _r(x.deltaX * d, x.deltaY * d, 0), H && !de && ft.restart(!0);
          }
        }, sr = function(x) {
          if (!kt(x)) {
            var d = x.clientX, w = x.clientY, S = d - u.x, R = w - u.y;
            u.x = d, u.y = w, be = !0, (S || R) && ir(S, R);
          }
        }, vr = function(x) {
          u.event = x, Ce(u);
        }, Lt = function(x) {
          u.event = x, Be(u);
        }, zr = function(x) {
          return kt(x) || mr(x, B) && ut(u);
        };
        ft = u._dc = b.delayedCall(v || 0.25, Ir).pause(), u.deltaX = u.deltaY = 0, u._vx = un(0, 50, !0), u._vy = un(0, 50, !0), u.scrollX = qt, u.scrollY = Gt, u.isDragging = u.isGesturing = u.isPressed = !1, Ot(this), u.enable = function(O) {
          return u.isEnabled || (Te($t ? oe : a, "scroll", cn), c.indexOf("scroll") >= 0 && Te($t ? oe : a, "scroll", dt, B, j), c.indexOf("wheel") >= 0 && Te(a, "wheel", yt, B, j), (c.indexOf("touch") >= 0 && pt || c.indexOf("pointer") >= 0) && (Te(a, Pe[0], z, B, j), Te(oe, Pe[2], zt), Te(oe, Pe[3], zt), Re && Te(a, "click", $e, !1, !0), ut && Te(a, "click", zr), le && Te(oe, "gesturestart", mt), l && Te(oe, "gestureend", wt), Ce && Te(a, Ve + "enter", vr), Be && Te(a, Ve + "leave", Lt), He && Te(a, Ve + "move", sr)), u.isEnabled = !0, O && O.type && z(O), nr && nr(u)), u;
        }, u.disable = function() {
          u.isEnabled && (ht.filter(function(O) {
            return O !== u && Yt(O.target);
          }).length || V($t ? oe : a, "scroll", cn), u.isPressed && (u._vx.reset(), u._vy.reset(), V(de ? a : oe, Pe[1], or, !0)), V($t ? oe : a, "scroll", dt, j), V(a, "wheel", yt, j), V(a, Pe[0], z, j), V(oe, Pe[2], zt), V(oe, Pe[3], zt), V(a, "click", $e, !0), V(a, "click", zr), V(oe, "gesturestart", mt), V(oe, "gestureend", wt), V(a, Ve + "enter", vr), V(a, Ve + "leave", Lt), V(a, Ve + "move", sr), u.isEnabled = u.isPressed = u.isDragging = !1, Nt && Nt(u));
        }, u.kill = u.revert = function() {
          u.disable();
          var O = ht.indexOf(u);
          O >= 0 && ht.splice(O, 1), Je === u && (Je = 0);
        }, ht.push(u), de && Yt(a) && (Je = u), u.enable(U);
      }, T(s, [{
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
    }, ae.register = Bn, ae.getAll = function() {
      return ht.slice();
    }, ae.getById = function(s) {
      return ht.filter(function(e) {
        return e.vars.id === s;
      })[0];
    }, Vt() && b.registerPlugin(ae);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var _, lr, L, Q, gt, ee, Hn, Hr, Nr, cr, Wr, qr, Oe, Gr, fn, Fe, Nn, Wn, ur, qn, dn, Gn, et, $n, Un, Vn, Bt, pn, hn, gn, $r = 1, Ye = Date.now, _n = Ye(), lt = 0, wr = 0, Mi = function s() {
      return wr && requestAnimationFrame(s);
    }, jn = function() {
      return Gr = 1;
    }, Qn = function() {
      return Gr = 0;
    }, Tt = function(e) {
      return e;
    }, yr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Kn = function() {
      return typeof window < "u";
    }, Zn = function() {
      return _ || Kn() && (_ = window.gsap) && _.registerPlugin && _;
    }, Qt = function(e) {
      return !!~Hn.indexOf(e);
    }, Jn = function(e) {
      return St(e, "getBoundingClientRect") || (Qt(e) ? function() {
        return sn.width = L.innerWidth, sn.height = L.innerHeight, sn;
      } : function() {
        return Dt(e);
      });
    }, ki = function(e, n, t) {
      var r = t.d, o = t.d2, c = t.a;
      return (c = St(e, "getBoundingClientRect")) ? function() {
        return c()[r];
      } : function() {
        return (n ? L["inner" + o] : e["client" + o]) || 0;
      };
    }, Ci = function(e, n) {
      return !n || ~X.indexOf(e) ? Jn(e) : function() {
        return sn;
      };
    }, Ht = function(e, n) {
      var t = n.s, r = n.d2, o = n.d, c = n.a;
      return Math.max(0, (t = "scroll" + r) && (c = St(e, t)) ? c() - Jn(e)()[o] : Qt(e) ? (gt[t] || ee[t]) - (L["inner" + r] || gt["client" + r] || ee["client" + r]) : e[t] - e["offset" + r]);
    }, Ur = function(e, n) {
      for (var t = 0; t < ur.length; t += 3)
        (!n || ~n.indexOf(ur[t + 1])) && e(ur[t], ur[t + 1], ur[t + 2]);
    }, _t = function(e) {
      return typeof e == "string";
    }, Xe = function(e) {
      return typeof e == "function";
    }, xr = function(e) {
      return typeof e == "number";
    }, Vr = function(e) {
      return typeof e == "object";
    }, Sr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, vn = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, fr = Math.abs, ei = "left", ti = "top", bn = "right", mn = "bottom", Kt = "width", Zt = "height", Tr = "Right", Mr = "Left", kr = "Top", Cr = "Bottom", re = "padding", ct = "margin", dr = "Width", wn = "Height", Me = "px", vt = function(e) {
      return L.getComputedStyle(e);
    }, Ei = function(e) {
      var n = vt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ri = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Dt = function(e, n) {
      var t = n && vt(e)[fn] !== "matrix(1, 0, 0, 1, 0, 0)" && _.to(e, {
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
    }, yn = function(e, n) {
      var t = n.d2;
      return e["offset" + t] || e["client" + t] || 0;
    }, ni = function(e) {
      var n = [], t = e.labels, r = e.duration(), o;
      for (o in t)
        n.push(t[o] / r);
      return n;
    }, Pi = function(e) {
      return function(n) {
        return _.utils.snap(ni(e), n);
      };
    }, xn = function(e) {
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
    }, Oi = function(e) {
      return function(n, t) {
        return xn(ni(e))(n, t.direction);
      };
    }, jr = function(e, n, t, r) {
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
    }, Qr = function(e, n, t) {
      t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
    }, ii = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, Kr = {
      toggleActions: "play",
      anticipatePin: 0
    }, Zr = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    }, Jr = function(e, n) {
      if (_t(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in Zr ? Zr[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, en = function(e, n, t, r, o, c, a, p) {
      var M = o.startColor, B = o.endColor, H = o.fontSize, v = o.indent, f = o.fontWeight, m = Q.createElement("div"), U = Qt(t) || St(t, "pinType") === "fixed", ne = e.indexOf("scroller") !== -1, q = U ? ee : t, Ke = e.indexOf("start") !== -1, te = Ke ? M : B, F = "border-color:" + te + ";font-size:" + H + ";color:" + te + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return F += "position:" + ((ne || p) && U ? "fixed;" : "absolute;"), (ne || p || !U) && (F += (r === fe ? bn : mn) + ":" + (c + parseFloat(v)) + "px;"), a && (F += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), m._isStart = Ke, m.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), m.style.cssText = F, m.innerText = n || n === 0 ? e + "-" + n : e, q.children[0] ? q.insertBefore(m, q.children[0]) : q.appendChild(m), m._offset = m["offset" + r.op.d2], tn(m, 0, r, Ke), m;
    }, tn = function(e, n, t, r) {
      var o = {
        display: "block"
      }, c = t[r ? "os2" : "p2"], a = t[r ? "p2" : "os2"];
      e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + c + dr] = 1, o["border" + a + dr] = 0, o[t.p] = n + "px", _.set(e, o);
    }, A = [], Sn = {}, Er, oi = function() {
      return Ye() - lt > 34 && (Er || (Er = requestAnimationFrame(Rt)));
    }, pr = function() {
      (!et || !et.isPressed || et.startX > ee.clientWidth) && (y.cache++, et ? Er || (Er = requestAnimationFrame(Rt)) : Rt(), lt || er("scrollStart"), lt = Ye());
    }, Tn = function() {
      Vn = L.innerWidth, Un = L.innerHeight;
    }, Pr = function() {
      y.cache++, !Oe && !Gn && !Q.fullscreenElement && !Q.webkitFullscreenElement && (!$n || Vn !== L.innerWidth || Math.abs(L.innerHeight - Un) > L.innerHeight * 0.25) && Hr.restart(!0);
    }, Jt = {}, Di = [], si = function s() {
      return ve(I, "scrollEnd", s) || rr(!0);
    }, er = function(e) {
      return Jt[e] && Jt[e].map(function(n) {
        return n();
      }) || Di;
    }, tt = [], ai = function(e) {
      for (var n = 0; n < tt.length; n += 5)
        (!e || tt[n + 4] && tt[n + 4].query === e) && (tt[n].style.cssText = tt[n + 1], tt[n].getBBox && tt[n].setAttribute("transform", tt[n + 2] || ""), tt[n + 3].uncache = 1);
    }, Mn = function(e, n) {
      var t;
      for (Fe = 0; Fe < A.length; Fe++)
        t = A[Fe], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && ai(n), n || er("revert");
    }, li = function(e, n) {
      y.cache++, (n || !rt) && y.forEach(function(t) {
        return Xe(t) && t.cacheID++ && (t.rec = 0);
      }), _t(e) && (L.history.scrollRestoration = hn = e);
    }, rt, tr = 0, ci, Ri = function() {
      if (ci !== tr) {
        var e = ci = tr;
        requestAnimationFrame(function() {
          return e === tr && rr(!0);
        });
      }
    }, rr = function(e, n) {
      if (lt && !e) {
        _e(I, "scrollEnd", si);
        return;
      }
      rt = I.isRefreshing = !0, y.forEach(function(r) {
        return Xe(r) && r.cacheID++ && (r.rec = r());
      });
      var t = er("refreshInit");
      qn && I.sort(), n || Mn(), y.forEach(function(r) {
        Xe(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
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
      }), y.forEach(function(r) {
        Xe(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), li(hn, 1), Hr.pause(), tr++, rt = 2, Rt(2), A.forEach(function(r) {
        return Xe(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), rt = I.isRefreshing = !1, er("refresh");
    }, kn = 0, rn = 1, Or, Rt = function(e) {
      if (!rt || e === 2) {
        I.isUpdating = !0, Or && Or.update(0);
        var n = A.length, t = Ye(), r = t - _n >= 50, o = n && A[0].scroll();
        if (rn = kn > o ? -1 : 1, rt || (kn = o), r && (lt && !Gr && t - lt > 200 && (lt = 0, er("scrollEnd")), Wr = _n, _n = t), rn < 0) {
          for (Fe = n; Fe-- > 0; )
            A[Fe] && A[Fe].update(0, r);
          rn = 1;
        } else
          for (Fe = 0; Fe < n; Fe++)
            A[Fe] && A[Fe].update(0, r);
        I.isUpdating = !1;
      }
      Er = 0;
    }, Cn = [ei, ti, mn, bn, ct + Cr, ct + Tr, ct + kr, ct + Mr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], nn = Cn.concat([Kt, Zt, "boxSizing", "max" + dr, "max" + wn, "position", ct, re, re + kr, re + Tr, re + Cr, re + Mr]), Ai = function(e, n, t) {
      hr(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        hr(r.spacerState);
      else if (e._gsap.swappedIn) {
        var o = n.parentNode;
        o && (o.insertBefore(e, n), o.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, En = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var o = Cn.length, c = n.style, a = e.style, p; o--; )
          p = Cn[o], c[p] = t[p];
        c.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (c.display = "inline-block"), a[mn] = a[bn] = "auto", c.flexBasis = t.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Kt] = yn(e, Le) + Me, c[Zt] = yn(e, fe) + Me, c[re] = a[ct] = a[ti] = a[ei] = "0", hr(r), a[Kt] = a["max" + dr] = t[Kt], a[Zt] = a["max" + wn] = t[Zt], a[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Ii = /([A-Z])/g, hr = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, o, c;
        for ((e.t._gsap || _.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          c = e[r + 1], o = e[r], c ? n[o] = c : n[o] && n.removeProperty(o.replace(Ii, "-$1").toLowerCase());
      }
    }, on = function(e) {
      for (var n = nn.length, t = e.style, r = [], o = 0; o < n; o++)
        r.push(nn[o], t[nn[o]]);
      return r.t = e, r;
    }, zi = function(e, n, t) {
      for (var r = [], o = e.length, c = t ? 8 : 0, a; c < o; c += 2)
        a = e[c], r.push(a, a in n ? n[a] : e[c + 1]);
      return r.t = e.t, r;
    }, sn = {
      left: 0,
      top: 0
    }, ui = function(e, n, t, r, o, c, a, p, M, B, H, v, f) {
      Xe(e) && (e = e(p)), _t(e) && e.substr(0, 3) === "max" && (e = v + (e.charAt(4) === "=" ? Jr("0" + e.substr(3), t) : 0));
      var m = f ? f.time() : 0, U, ne, q;
      if (f && f.seek(0), xr(e))
        f && (e = _.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, v, e)), a && tn(a, t, r, !0);
      else {
        Xe(n) && (n = n(p));
        var Ke = (e || "0").split(" "), te, F, De, ie;
        q = Qe(n) || ee, te = Dt(q) || {}, (!te || !te.left && !te.top) && vt(q).display === "none" && (ie = q.style.display, q.style.display = "block", te = Dt(q), ie ? q.style.display = ie : q.style.removeProperty("display")), F = Jr(Ke[0], te[r.d]), De = Jr(Ke[1] || "0", t), e = te[r.p] - M[r.p] - B + F + o - De, a && tn(a, De, r, t - De < 20 || a._isStart && De > 20), t -= t - De;
      }
      if (c) {
        var E = e + t, Ze = c._isStart;
        U = "scroll" + r.d2, tn(c, E, r, Ze && E > 20 || !Ze && (H ? Math.max(ee[U], gt[U]) : c.parentNode[U]) <= E + 1), H && (M = Dt(a), H && (c.style[r.op.p] = M[r.op.p] - r.op.m - c._offset + Me));
      }
      return f && q && (U = Dt(q), f.seek(v), ne = Dt(q), f._caScrollDist = U[r.p] - ne[r.p], e = e / f._caScrollDist * v), f && f.seek(m), f ? e : Math.round(e);
    }, Li = /(webkit|moz|length|cssText|inset)/i, fi = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var o = e.style, c, a;
        if (n === ee) {
          e._stOrig = o.cssText, a = vt(e);
          for (c in a)
            !+c && !Li.test(c) && a[c] && typeof o[c] == "string" && c !== "0" && (o[c] = a[c]);
          o.top = t, o.left = r;
        } else
          o.cssText = e._stOrig;
        _.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, di = function(e, n, t) {
      var r = n, o = r;
      return function(c) {
        var a = Math.round(e());
        return a !== r && a !== o && Math.abs(a - r) > 3 && Math.abs(a - o) > 3 && (c = a, t && t()), o = r, r = c, c;
      };
    }, pi = function(e, n) {
      var t = Xt(e, n), r = "_scroll" + n.p2, o = function c(a, p, M, B, H) {
        var v = c.tween, f = p.onComplete, m = {};
        M = M || t();
        var U = di(t, M, function() {
          v.kill(), c.tween = 0;
        });
        return H = B && H || 0, B = B || a - M, v && v.kill(), p[r] = a, p.modifiers = m, m[r] = function() {
          return U(M + B * v.ratio + H * v.ratio * v.ratio);
        }, p.onUpdate = function() {
          y.cache++, Rt();
        }, p.onComplete = function() {
          c.tween = 0, f && f.call(v);
        }, v = c.tween = _.to(e, p), v;
      };
      return e[r] = t, t.wheelHandler = function() {
        return o.tween && o.tween.kill() && (o.tween = 0);
      }, _e(e, "wheel", t.wheelHandler), I.isTouch && _e(e, "touchmove", t.wheelHandler), o;
    }, I = function() {
      function s(n, t) {
        lr || s.register(_) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = s.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !wr) {
          this.update = this.refresh = this.kill = Tt;
          return;
        }
        t = ri(_t(t) || xr(t) || t.nodeType ? {
          trigger: t
        } : t, Kr);
        var o = t, c = o.onUpdate, a = o.toggleClass, p = o.id, M = o.onToggle, B = o.onRefresh, H = o.scrub, v = o.trigger, f = o.pin, m = o.pinSpacing, U = o.invalidateOnRefresh, ne = o.anticipatePin, q = o.onScrubComplete, Ke = o.onSnapComplete, te = o.once, F = o.snap, De = o.pinReparent, ie = o.pinSpacer, E = o.containerAnimation, Ze = o.fastScrollEnd, bt = o.preventOverlaps, P = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Le : fe, ke = !H && H !== 0, k = Qe(t.scroller || L), At = _.core.getCache(k), Ce = Qt(k), Be = ("pinType" in t ? t.pinType : St(k, "pinType") || Ce && "fixed") === "fixed", He = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = ke && t.toggleActions.split(" "), de = "markers" in t ? t.markers : Kr.markers, le = Ce ? 0 : parseFloat(vt(k)["border" + P.p2 + dr]) || 0, l = this, pe = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, nr = ki(k, Ce, P), Nt = Ci(k, Ce), ut = 0, Wt = 0, j = Xt(k, P), Re, Ne, Dr, nt, ft, Y, be, it, Mt, We, u, It, K, qt, Gt, gr, qe, Rr, $t, oe, ot, Ge, Ar, $e, kt, Ir, Ut, _r, ir, or, z, zt, mt, wt, dt, yt, sr, vr, Lt;
        if (pn(l), l._dir = P, ne *= 45, l.scroller = k, l.scroll = E ? E.time.bind(E) : j, nt = j(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (qn = 1, t.refreshPriority === -9999 && (Or = l)), At.tweenScroll = At.tweenScroll || {
          top: pi(k, fe),
          left: pi(k, Le)
        }, l.tweenTo = Re = At.tweenScroll[P.p], l.scrubDuration = function(d) {
          zt = xr(d) && d, zt ? z ? z.duration(d) : z = _.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: zt,
            paused: !0,
            onComplete: function() {
              return q && q(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(H), z && z.resetTo && z.resetTo("totalProgress", 0), ir = 0, p || (p = r.vars.id)), A.push(l), F && ((!Vr(F) || F.push) && (F = {
          snapTo: F
        }), "scrollBehavior" in ee.style && _.set(Ce ? [ee, gt] : k, {
          scrollBehavior: "auto"
        }), y.forEach(function(d) {
          return Xe(d) && d.target === (Ce ? Q.scrollingElement || gt : k) && (d.smooth = !1);
        }), Dr = Xe(F.snapTo) ? F.snapTo : F.snapTo === "labels" ? Pi(r) : F.snapTo === "labelsDirectional" ? Oi(r) : F.directional !== !1 ? function(d, w) {
          return xn(F.snapTo)(d, Ye() - Wt < 500 ? 0 : w.direction);
        } : _.utils.snap(F.snapTo), mt = F.duration || {
          min: 0.1,
          max: 2
        }, mt = Vr(mt) ? cr(mt.min, mt.max) : cr(mt, mt), wt = _.delayedCall(F.delay || zt / 2 || 0.1, function() {
          var d = j(), w = Ye() - Wt < 500, S = Re.tween;
          if ((w || Math.abs(l.getVelocity()) < 10) && !S && !Gr && ut !== d) {
            var R = (d - Y) / K, me = r && !ke ? r.totalProgress() : R, N = w ? 0 : (me - or) / (Ye() - Wr) * 1e3 || 0, Z = _.utils.clamp(-R, 1 - R, fr(N / 2) * N / 0.185), Ee = R + (F.inertia === !1 ? 0 : Z), we = cr(0, 1, Dr(Ee, l)), ce = Math.round(Y + we * K), J = F, st = J.onStart, Ue = J.onInterrupt, ye = J.onComplete;
            if (d <= be && d >= Y && ce !== d) {
              if (S && !S._initted && S.data <= fr(ce - d))
                return;
              F.inertia === !1 && (Z = we - R), Re(ce, {
                duration: mt(fr(Math.max(fr(Ee - me), fr(we - me)) * 0.185 / N / 0.05 || 0)),
                ease: F.ease || "power3",
                data: fr(ce - d),
                onInterrupt: function() {
                  return wt.restart(!0) && Ue && Ue(l);
                },
                onComplete: function() {
                  l.update(), ut = j(), ir = or = r && !ke ? r.totalProgress() : l.progress, Ke && Ke(l), ye && ye(l);
                }
              }, d, Z * K, ce - d - Z * K), st && st(l, Re.tween);
            }
          } else
            l.isActive && ut !== d && wt.restart(!0);
        }).pause()), p && (Sn[p] = l), v = l.trigger = Qe(v || f), Lt = v && v._gsap && v._gsap.stRevert, Lt && (Lt = Lt(l)), f = f === !0 ? v : Qe(f), _t(a) && (a = {
          targets: v,
          className: a
        }), f && (m === !1 || m === ct || (m = !m && f.parentNode && f.parentNode.style && vt(f.parentNode).display === "flex" ? !1 : re), l.pin = f, Ne = _.core.getCache(f), Ne.spacer ? qt = Ne.pinState : (ie && (ie = Qe(ie), ie && !ie.nodeType && (ie = ie.current || ie.nativeElement), Ne.spacerIsNative = !!ie, ie && (Ne.spacerState = on(ie))), Ne.spacer = qe = ie || Q.createElement("div"), qe.classList.add("pin-spacer"), p && qe.classList.add("pin-spacer-" + p), Ne.pinState = qt = on(f)), t.force3D !== !1 && _.set(f, {
          force3D: !0
        }), l.spacer = qe = Ne.spacer, _r = vt(f), Ar = _r[m + P.os2], $t = _.getProperty(f), oe = _.quickSetter(f, P.a, Me), En(f, qe, _r), gr = on(f)), de) {
          It = Vr(de) ? ri(de, ii) : ii, We = en("scroller-start", p, k, P, It, 0), u = en("scroller-end", p, k, P, It, 0, We), Rr = We["offset" + P.op.d2];
          var zr = Qe(St(k, "content") || k);
          it = this.markerStart = en("start", p, zr, P, It, Rr, 0, E), Mt = this.markerEnd = en("end", p, zr, P, It, Rr, 0, E), E && (vr = _.quickSetter([it, Mt], P.a, Me)), !Be && !(X.length && St(k, "fixedMarkers") === !0) && (Ei(Ce ? ee : k), _.set([We, u], {
            force3D: !0
          }), kt = _.quickSetter(We, P.a, Me), Ut = _.quickSetter(u, P.a, Me));
        }
        if (E) {
          var O = E.vars.onUpdate, x = E.vars.onUpdateParams;
          E.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), O && O.apply(E, x || []);
          });
        }
        l.previous = function() {
          return A[A.indexOf(l) - 1];
        }, l.next = function() {
          return A[A.indexOf(l) + 1];
        }, l.revert = function(d, w) {
          if (!w)
            return l.kill(!0);
          var S = d !== !1 || !l.enabled, R = Oe;
          S !== l.isReverted && (S && (yt = Math.max(j(), l.scroll.rec || 0), dt = l.progress, sr = r && r.progress()), it && [it, Mt, We, u].forEach(function(me) {
            return me.style.display = S ? "none" : "block";
          }), S && (Oe = l, l.update(S)), f && (!De || !l.isActive) && (S ? Ai(f, qe, qt) : En(f, qe, vt(f), $e)), S || l.update(S), Oe = R, l.isReverted = S);
        }, l.refresh = function(d, w) {
          if (!((Oe || !l.enabled) && !w)) {
            if (f && d && lt) {
              _e(s, "scrollEnd", si);
              return;
            }
            !rt && pe && pe(l), Oe = l, Wt = Ye(), Re.tween && (Re.tween.kill(), Re.tween = 0), z && z.pause(), U && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var S = nr(), R = Nt(), me = E ? E.duration() : Ht(k, P), N = K <= 0.01, Z = 0, Ee = 0, we = t.end, ce = t.endTrigger || v, J = t.start || (t.start === 0 || !v ? 0 : f ? "0 0" : "0 100%"), st = l.pinnedContainer = t.pinnedContainer && Qe(t.pinnedContainer), Ue = v && Math.max(0, A.indexOf(l)) || 0, ye = Ue, se, Ae, br, ar, ue, xe, Ct, On, bi, Lr, Et; ye--; )
              xe = A[ye], xe.end || xe.refresh(0, 1) || (Oe = l), Ct = xe.pin, Ct && (Ct === v || Ct === f || Ct === st) && !xe.isReverted && (Lr || (Lr = []), Lr.unshift(xe), xe.revert(!0, !0)), xe !== A[ye] && (Ue--, ye--);
            for (Xe(J) && (J = J(l)), Y = ui(J, v, S, P, j(), it, We, l, R, le, Be, me, E) || (f ? -1e-3 : 0), Xe(we) && (we = we(l)), _t(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (_t(J) ? J.split(" ")[0] : "") + we : (Z = Jr(we.substr(2), S), we = _t(J) ? J : (E ? _.utils.mapRange(0, E.duration(), E.scrollTrigger.start, E.scrollTrigger.end, Y) : Y) + Z, ce = v)), be = Math.max(Y, ui(we || (ce ? "100% 0" : me), ce, S, P, j() + Z, Mt, u, l, R, le, Be, me, E)) || -1e-3, K = be - Y || (Y -= 0.01) && 1e-3, Z = 0, ye = Ue; ye--; )
              xe = A[ye], Ct = xe.pin, Ct && xe.start - xe._pinPush <= Y && !E && xe.end > 0 && (se = xe.end - xe.start, (Ct === v && xe.start - xe._pinPush < Y || Ct === st) && !xr(J) && (Z += se * (1 - xe.progress)), Ct === f && (Ee += se));
            if (Y += Z, be += Z, N && (dt = _.utils.clamp(0, 1, _.utils.normalize(Y, be, yt))), l._pinPush = Ee, it && Z && (se = {}, se[P.a] = "+=" + Z, st && (se[P.p] = "-=" + j()), _.set([it, Mt], se)), f)
              se = vt(f), ar = P === fe, br = j(), ot = parseFloat($t(P.a)) + Ee, !me && be > 1 && (Et = (Ce ? Q.scrollingElement || gt : k).style, Et = {
                style: Et,
                value: Et["overflow" + P.a.toUpperCase()]
              }, Et.style["overflow" + P.a.toUpperCase()] = "scroll"), En(f, qe, se), gr = on(f), Ae = Dt(f, !0), On = Be && Xt(k, ar ? Le : fe)(), m && ($e = [m + P.os2, K + Ee + Me], $e.t = qe, ye = m === re ? yn(f, P) + K + Ee : 0, ye && $e.push(P.d, ye + Me), hr($e), st && A.forEach(function(Fr) {
                Fr.pin === st && Fr.vars.pinSpacing !== !1 && (Fr._subPinOffset = !0);
              }), Be && j(yt)), Be && (ue = {
                top: Ae.top + (ar ? br - Y : On) + Me,
                left: Ae.left + (ar ? On : br - Y) + Me,
                boxSizing: "border-box",
                position: "fixed"
              }, ue[Kt] = ue["max" + dr] = Math.ceil(Ae.width) + Me, ue[Zt] = ue["max" + wn] = Math.ceil(Ae.height) + Me, ue[ct] = ue[ct + kr] = ue[ct + Tr] = ue[ct + Cr] = ue[ct + Mr] = "0", ue[re] = se[re], ue[re + kr] = se[re + kr], ue[re + Tr] = se[re + Tr], ue[re + Cr] = se[re + Cr], ue[re + Mr] = se[re + Mr], Gt = zi(qt, ue, De), rt && j(0)), r ? (bi = r._initted, dn(1), r.render(r.duration(), !0, !0), Ge = $t(P.a) - ot + K + Ee, Ir = Math.abs(K - Ge) > 1, Be && Ir && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), dn(0)) : Ge = K, Et && (Et.value ? Et.style["overflow" + P.a.toUpperCase()] = Et.value : Et.style.removeProperty("overflow-" + P.a));
            else if (v && j() && !E)
              for (Ae = v.parentNode; Ae && Ae !== ee; )
                Ae._pinOffset && (Y -= Ae._pinOffset, be -= Ae._pinOffset), Ae = Ae.parentNode;
            Lr && Lr.forEach(function(Fr) {
              return Fr.revert(!1, !0);
            }), l.start = Y, l.end = be, nt = ft = rt ? yt : j(), !E && !rt && (nt < yt && j(yt), l.scroll.rec = 0), l.revert(!1, !0), wt && (ut = -1, l.isActive && j(Y + K * dt), wt.restart(!0)), Oe = 0, r && ke && (r._initted || sr) && r.progress() !== sr && r.progress(sr, !0).render(r.time(), !0, !0), (N || dt !== l.progress || E) && (r && !ke && r.totalProgress(E && Y < -1e-3 && !dt ? _.utils.normalize(Y, be, 0) : dt, !0), l.progress = (nt - Y) / K === dt ? 0 : dt), f && m && (qe._pinOffset = Math.round(l.progress * Ge)), z && z.invalidate(), B && !rt && B(l);
          }
        }, l.getVelocity = function() {
          return (j() - ft) / (Ye() - Wr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Sr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? ke || Sr(r, l.direction < 0, 1) : Sr(r, r.reversed()));
        }, l.labelToScroll = function(d) {
          return r && r.labels && (Y || l.refresh() || Y) + r.labels[d] / r.duration() * K || 0;
        }, l.getTrailing = function(d) {
          var w = A.indexOf(l), S = l.direction > 0 ? A.slice(0, w).reverse() : A.slice(w + 1);
          return (_t(d) ? S.filter(function(R) {
            return R.vars.preventOverlaps === d;
          }) : S).filter(function(R) {
            return l.direction > 0 ? R.end <= Y : R.start >= be;
          });
        }, l.update = function(d, w, S) {
          if (!(E && !S && !d)) {
            var R = rt === !0 ? yt : l.scroll(), me = d ? 0 : (R - Y) / K, N = me < 0 ? 0 : me > 1 ? 1 : me || 0, Z = l.progress, Ee, we, ce, J, st, Ue, ye, se;
            if (w && (ft = nt, nt = E ? j() : R, F && (or = ir, ir = r && !ke ? r.totalProgress() : N)), ne && !N && f && !Oe && !$r && lt && Y < R + (R - ft) / (Ye() - Wr) * ne && (N = 1e-4), N !== Z && l.enabled) {
              if (Ee = l.isActive = !!N && N < 1, we = !!Z && Z < 1, Ue = Ee !== we, st = Ue || !!N != !!Z, l.direction = N > Z ? 1 : -1, l.progress = N, st && !Oe && (ce = N && !Z ? 0 : N === 1 ? 1 : Z === 1 ? 2 : 3, ke && (J = !Ue && G[ce + 1] !== "none" && G[ce + 1] || G[ce], se = r && (J === "complete" || J === "reset" || J in r))), bt && (Ue || se) && (se || H || !r) && (Xe(bt) ? bt(l) : l.getTrailing(bt).forEach(function(ue) {
                return ue.endAnimation();
              })), ke || (z && !Oe && !$r ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", N, r._tTime / r._tDur) : (z.vars.totalProgress = N, z.invalidate().restart())) : r && r.totalProgress(N, !!Oe)), f) {
                if (d && m && (qe.style[m + P.os2] = Ar), !Be)
                  oe(yr(ot + Ge * N));
                else if (st) {
                  if (ye = !d && N > Z && be + 1 > R && R + 1 >= Ht(k, P), De)
                    if (!d && (Ee || ye)) {
                      var Ae = Dt(f, !0), br = R - Y;
                      fi(f, ee, Ae.top + (P === fe ? br : 0) + Me, Ae.left + (P === fe ? 0 : br) + Me);
                    } else
                      fi(f, qe);
                  hr(Ee || ye ? Gt : gr), Ir && N < 1 && Ee || oe(ot + (N === 1 && !ye ? Ge : 0));
                }
              }
              F && !Re.tween && !Oe && !$r && wt.restart(!0), a && (Ue || te && N && (N < 1 || !gn)) && Nr(a.targets).forEach(function(ue) {
                return ue.classList[Ee || te ? "add" : "remove"](a.className);
              }), c && !ke && !d && c(l), st && !Oe ? (ke && (se && (J === "complete" ? r.pause().totalProgress(1) : J === "reset" ? r.restart(!0).pause() : J === "restart" ? r.restart(!0) : r[J]()), c && c(l)), (Ue || !gn) && (M && Ue && vn(l, M), He[ce] && vn(l, He[ce]), te && (N === 1 ? l.kill(!1, 1) : He[ce] = 0), Ue || (ce = N === 1 ? 1 : 3, He[ce] && vn(l, He[ce]))), Ze && !Ee && Math.abs(l.getVelocity()) > (xr(Ze) ? Ze : 2500) && (Sr(l.callbackAnimation), z ? z.progress(1) : Sr(r, J === "reverse" ? 1 : !N, 1))) : ke && c && !Oe && c(l);
            }
            if (Ut) {
              var ar = E ? R / E.duration() * (E._caScrollDist || 0) : R;
              kt(ar + (We._isFlipped ? 1 : 0)), Ut(ar);
            }
            vr && vr(-R / E.duration() * (E._caScrollDist || 0));
          }
        }, l.enable = function(d, w) {
          l.enabled || (l.enabled = !0, _e(k, "resize", Pr), _e(Ce ? Q : k, "scroll", pr), pe && _e(s, "refreshInit", pe), d !== !1 && (l.progress = dt = 0, nt = ft = ut = j()), w !== !1 && l.refresh());
        }, l.getTween = function(d) {
          return d && Re ? Re.tween : z;
        }, l.setPositions = function(d, w) {
          f && (ot += d - Y, Ge += w - d - K, m === re && l.adjustPinSpacing(w - d - K)), l.start = Y = d, l.end = be = w, K = w - d, l.update();
        }, l.adjustPinSpacing = function(d) {
          if ($e && d) {
            var w = $e.indexOf(P.d) + 1;
            $e[w] = parseFloat($e[w]) + d + Me, $e[1] = parseFloat($e[1]) + d + Me, hr($e);
          }
        }, l.disable = function(d, w) {
          if (l.enabled && (d !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, w || z && z.pause(), yt = 0, Ne && (Ne.uncache = 1), pe && ve(s, "refreshInit", pe), wt && (wt.pause(), Re.tween && Re.tween.kill() && (Re.tween = 0)), !Ce)) {
            for (var S = A.length; S--; )
              if (A[S].scroller === k && A[S] !== l)
                return;
            ve(k, "resize", Pr), ve(k, "scroll", pr);
          }
        }, l.kill = function(d, w) {
          l.disable(d, w), z && !w && z.kill(), p && delete Sn[p];
          var S = A.indexOf(l);
          S >= 0 && A.splice(S, 1), S === Fe && rn > 0 && Fe--, S = 0, A.forEach(function(R) {
            return R.scroller === l.scroller && (S = 1);
          }), S || rt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
            kill: !1
          }), w || r.kill()), it && [it, Mt, We, u].forEach(function(R) {
            return R.parentNode && R.parentNode.removeChild(R);
          }), Or === l && (Or = 0), f && (Ne && (Ne.uncache = 1), S = 0, A.forEach(function(R) {
            return R.pin === f && S++;
          }), S || (Ne.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Lt && Lt(l), !r || !r.add || K ? l.refresh() : _.delayedCall(0.01, function() {
          return Y || be || l.refresh();
        }) && (K = 0.01) && (Y = be = 0), f && Ri();
      }, s.register = function(t) {
        return lr || (_ = t || Zn(), Kn() && window.document && s.enable(), lr = wr), lr;
      }, s.defaults = function(t) {
        if (t)
          for (var r in t)
            Kr[r] = t[r];
        return Kr;
      }, s.disable = function(t, r) {
        wr = 0, A.forEach(function(c) {
          return c[r ? "kill" : "disable"](t);
        }), ve(L, "wheel", pr), ve(Q, "scroll", pr), clearInterval(qr), ve(Q, "touchcancel", Tt), ve(ee, "touchstart", Tt), jr(ve, Q, "pointerdown,touchstart,mousedown", jn), jr(ve, Q, "pointerup,touchend,mouseup", Qn), Hr.kill(), Ur(ve);
        for (var o = 0; o < y.length; o += 3)
          Qr(ve, y[o], y[o + 1]), Qr(ve, y[o], y[o + 2]);
      }, s.enable = function() {
        if (L = window, Q = document, gt = Q.documentElement, ee = Q.body, _ && (Nr = _.utils.toArray, cr = _.utils.clamp, pn = _.core.context || Tt, dn = _.core.suppressOverwrites || Tt, hn = L.history.scrollRestoration || "auto", kn = L.pageYOffset, _.core.globals("ScrollTrigger", s), ee)) {
          wr = 1, Mi(), ae.register(_), s.isTouch = ae.isTouch, Bt = ae.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(L, "wheel", pr), Hn = [L, Q, gt, ee], _.matchMedia ? (s.matchMedia = function(p) {
            var M = _.matchMedia(), B;
            for (B in p)
              M.add(B, p[B]);
            return M;
          }, _.addEventListener("matchMediaInit", function() {
            return Mn();
          }), _.addEventListener("matchMediaRevert", function() {
            return ai();
          }), _.addEventListener("matchMedia", function() {
            rr(0, 1), er("matchMedia");
          }), _.matchMedia("(orientation: portrait)", function() {
            return Tn(), Tn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), Tn(), _e(Q, "scroll", pr);
          var t = ee.style, r = t.borderTopStyle, o = _.core.Animation.prototype, c, a;
          for (o.revert || Object.defineProperty(o, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", c = Dt(ee), fe.m = Math.round(c.top + fe.sc()) || 0, Le.m = Math.round(c.left + Le.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), qr = setInterval(oi, 250), _.delayedCall(0.5, function() {
            return $r = 0;
          }), _e(Q, "touchcancel", Tt), _e(ee, "touchstart", Tt), jr(_e, Q, "pointerdown,touchstart,mousedown", jn), jr(_e, Q, "pointerup,touchend,mouseup", Qn), fn = _.utils.checkPrefix("transform"), nn.push(fn), lr = Ye(), Hr = _.delayedCall(0.2, rr).pause(), ur = [Q, "visibilitychange", function() {
            var p = L.innerWidth, M = L.innerHeight;
            Q.hidden ? (Nn = p, Wn = M) : (Nn !== p || Wn !== M) && Pr();
          }, Q, "DOMContentLoaded", rr, L, "load", rr, L, "resize", Pr], Ur(_e), A.forEach(function(p) {
            return p.enable(0, 1);
          }), a = 0; a < y.length; a += 3)
            Qr(ve, y[a], y[a + 1]), Qr(ve, y[a], y[a + 2]);
        }
      }, s.config = function(t) {
        "limitCallbacks" in t && (gn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval(qr) || (qr = r) && setInterval(oi, r), "ignoreMobileResize" in t && ($n = s.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Ur(ve) || Ur(_e, t.autoRefreshEvents || "none"), Gn = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, s.scrollerProxy = function(t, r) {
        var o = Qe(t), c = y.indexOf(o), a = Qt(o);
        ~c && y.splice(c, a ? 6 : 2), r && (a ? X.unshift(L, r, ee, r, gt, r) : X.unshift(o, r));
      }, s.clearMatchMedia = function(t) {
        A.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, s.isInViewport = function(t, r, o) {
        var c = (_t(t) ? Qe(t) : t).getBoundingClientRect(), a = c[o ? Kt : Zt] * r || 0;
        return o ? c.right - a > 0 && c.left + a < L.innerWidth : c.bottom - a > 0 && c.top + a < L.innerHeight;
      }, s.positionInViewport = function(t, r, o) {
        _t(t) && (t = Qe(t));
        var c = t.getBoundingClientRect(), a = c[o ? Kt : Zt], p = r == null ? a / 2 : r in Zr ? Zr[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
        return o ? (c.left + p) / L.innerWidth : (c.top + p) / L.innerHeight;
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
      return s ? Nr(s).forEach(function(e) {
        if (e && e.style) {
          var n = tt.indexOf(e);
          n >= 0 && tt.splice(n, 5), tt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), _.core.getCache(e), pn());
        }
      }) : tt;
    }, I.revert = function(s, e) {
      return Mn(!s, e);
    }, I.create = function(s, e) {
      return new I(s, e);
    }, I.refresh = function(s) {
      return s ? Pr() : (lr || I.register()) && rr(!0);
    }, I.update = function(s) {
      return ++y.cache && Rt(s === !0 ? 2 : 0);
    }, I.clearScrollMemory = li, I.maxScroll = function(s, e) {
      return Ht(s, e ? Le : fe);
    }, I.getScrollFunc = function(s, e) {
      return Xt(Qe(s), e ? Le : fe);
    }, I.getById = function(s) {
      return Sn[s];
    }, I.getAll = function() {
      return A.filter(function(s) {
        return s.vars.id !== "ScrollSmoother";
      });
    }, I.isScrolling = function() {
      return !!lt;
    }, I.snapDirectional = xn, I.addEventListener = function(s, e) {
      var n = Jt[s] || (Jt[s] = []);
      ~n.indexOf(e) || n.push(e);
    }, I.removeEventListener = function(s, e) {
      var n = Jt[s], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, I.batch = function(s, e) {
      var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, c = function(M, B) {
        var H = [], v = [], f = _.delayedCall(r, function() {
          B(H, v), H = [], v = [];
        }).pause();
        return function(m) {
          H.length || f.restart(!0), H.push(m.trigger), v.push(m), o <= H.length && f.progress(1);
        };
      }, a;
      for (a in e)
        t[a] = a.substr(0, 2) === "on" && Xe(e[a]) && a !== "onRefreshInit" ? c(a, e[a]) : e[a];
      return Xe(o) && (o = o(), _e(I, "refresh", function() {
        return o = e.batchMax();
      })), Nr(s).forEach(function(p) {
        var M = {};
        for (a in t)
          M[a] = t[a];
        M.trigger = p, n.push(I.create(M));
      }), n;
    };
    var hi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Pn = function s(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ae.isTouch ? " pinch-zoom" : "") : "none", e === gt && s(ee, n);
    }, an = {
      auto: 1,
      scroll: 1
    }, Fi = function(e) {
      var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, c = o._gsap || _.core.getCache(o), a = Ye(), p;
      if (!c._isScrollT || a - c._isScrollT > 2e3) {
        for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(an[(p = vt(o)).overflowY] || an[p.overflowX])); )
          o = o.parentNode;
        c._isScroll = o && o !== t && !Qt(o) && (an[(p = vt(o)).overflowY] || an[p.overflowX]), c._isScrollT = a;
      }
      (c._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, gi = function(e, n, t, r) {
      return ae.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && Fi,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return t && _e(Q, ae.eventTypes[0], vi, !1, !0);
        },
        onDisable: function() {
          return ve(Q, ae.eventTypes[0], vi, !0);
        }
      });
    }, Yi = /(input|label|select|textarea)/i, _i, vi = function(e) {
      var n = Yi.test(e.target.tagName);
      (n || _i) && (e._gsapAllow = !0, _i = n);
    }, Xi = function(e) {
      Vr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, c = n.onRelease, a, p, M = Qe(e.target) || gt, B = _.core.globals().ScrollSmoother, H = B && B.get(), v = Bt && (e.content && Qe(e.content) || H && e.content !== !1 && !H.smooth() && H.content()), f = Xt(M, fe), m = Xt(M, Le), U = 1, ne = (ae.isTouch && L.visualViewport ? L.visualViewport.scale * L.visualViewport.width : L.outerWidth) / L.innerWidth, q = 0, Ke = Xe(r) ? function() {
        return r(a);
      } : function() {
        return r || 2.8;
      }, te, F, De = gi(M, e.type, !0, o), ie = function() {
        return F = !1;
      }, E = Tt, Ze = Tt, bt = function() {
        p = Ht(M, fe), Ze = cr(Bt ? 1 : 0, p), t && (E = cr(0, Ht(M, Le))), te = tr;
      }, P = function() {
        v._gsap.y = yr(parseFloat(v._gsap.y) + f.offset) + "px", v.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(v._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
      }, ke = function() {
        if (F) {
          requestAnimationFrame(ie);
          var de = yr(a.deltaY / 2), le = Ze(f.v - de);
          if (v && le !== f.v + f.offset) {
            f.offset = le - f.v;
            var l = yr((parseFloat(v && v._gsap.y) || 0) - f.offset);
            v.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", v._gsap.y = l + "px", f.cacheID = y.cache, Rt();
          }
          return !0;
        }
        f.offset && P(), F = !0;
      }, k, At, Ce, Be, He = function() {
        bt(), k.isActive() && k.vars.scrollY > p && (f() > p ? k.progress(1) && f(p) : k.resetTo("scrollY", p));
      };
      return v && _.set(v, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Bt && G.type === "touchmove" && ke() || U > 1.05 && G.type !== "touchstart" || a.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        F = !1;
        var G = U;
        U = yr((L.visualViewport && L.visualViewport.scale || 1) / ne), k.pause(), G !== U && Pn(M, U > 1.01 ? !0 : t ? !1 : "x"), At = m(), Ce = f(), bt(), te = tr;
      }, e.onRelease = e.onGestureStart = function(G, de) {
        if (f.offset && P(), !de)
          Be.restart(!0);
        else {
          y.cache++;
          var le = Ke(), l, pe;
          t && (l = m(), pe = l + le * 0.05 * -G.velocityX / 0.227, le *= hi(m, l, pe, Ht(M, Le)), k.vars.scrollX = E(pe)), l = f(), pe = l + le * 0.05 * -G.velocityY / 0.227, le *= hi(f, l, pe, Ht(M, fe)), k.vars.scrollY = Ze(pe), k.invalidate().duration(le).play(0.01), (Bt && k.vars.scrollY >= p || l >= p - 1) && _.to({}, {
            onUpdate: He,
            duration: le
          });
        }
        c && c(G);
      }, e.onWheel = function() {
        k._ts && k.pause(), Ye() - q > 1e3 && (te = 0, q = Ye());
      }, e.onChange = function(G, de, le, l, pe) {
        if (tr !== te && bt(), de && t && m(E(l[2] === de ? At + (G.startX - G.x) : m() + de - l[1])), le) {
          f.offset && P();
          var nr = pe[2] === le, Nt = nr ? Ce + G.startY - G.y : f() + le - pe[1], ut = Ze(Nt);
          nr && Nt !== ut && (Ce += ut - Nt), f(ut);
        }
        (le || de) && Rt();
      }, e.onEnable = function() {
        Pn(M, t ? !1 : "x"), I.addEventListener("refresh", He), _e(L, "resize", He), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = m.smooth = !1), De.enable();
      }, e.onDisable = function() {
        Pn(M, !0), ve(L, "resize", He), I.removeEventListener("refresh", He), De.kill();
      }, e.lockAxis = e.lockAxis !== !1, a = new ae(e), a.iOS = Bt, Bt && !f() && f(1), Bt && _.ticker.add(Tt), Be = a._dc, k = _.to(a, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: di(f, f(), function() {
            return k.pause();
          })
        },
        onUpdate: Rt,
        onComplete: Be.vars.onComplete
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
        return et;
      if (s === !0 && et)
        return et.enable();
      if (s === !1)
        return et && et.kill();
      var e = s instanceof ae ? s : Xi(s);
      return et && et.target === e.target && et.kill(), Qt(e.target) && (et = e), e;
    }, I.core = {
      _getVelocityProp: un,
      _inputObserver: gi,
      _scrollers: y,
      _proxies: X,
      bridge: {
        ss: function() {
          lt || er("scrollStart"), lt = Ye();
        },
        ref: function() {
          return Oe;
        }
      }
    }, Zn() && _.registerPlugin(I), h.ScrollTrigger = I, h.default = I, typeof window > "u" || window !== h ? Object.defineProperty(h, "__esModule", { value: !0 }) : delete window.default;
  });
})(zn, zn.exports);
var Si = zn.exports;
Ie.registerPlugin(Si.ScrollTrigger);
class Ti extends ln {
  static create(g, h = {}, D = {}) {
    return new Ti(g, h, D);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(g) {
    this.meta.speed = g;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(g) {
    this.meta.velocity = g;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(g) {
    this.meta.direction = g;
  }
  constructor(g, h = {}, D = {}) {
    super(
      (T) => {
        var Yt, Te;
        Object.assign(T.meta, {
          speed: h.speed ?? 1,
          velocity: h.velocity ?? 0,
          direction: h.direction || "rtl",
          onCreated: h.onCreated,
          onUpdate: h.onUpdate
        }), T.meta.scrollTrigger = Si.ScrollTrigger.create(h.scrollTrigger ?? {});
        let b = null;
        typeof g == "string" ? b = document.querySelector(g) : g instanceof HTMLElement && (b = g);
        const he = h.createDOMContainers != null ? h.createDOMContainers : !0, C = he ? document.createElement("div") : b == null ? void 0 : b.querySelector(".owow-marquee-outer");
        C == null || C.classList.add("owow-marquee-outer");
        const W = he ? document.createElement("div") : C == null ? void 0 : C.querySelector(".owow-marquee-inner");
        if (W == null || W.classList.add("owow-marquee-inner"), !b || !C || !W)
          throw console.error({
            targetContainer: b,
            outerContainer: C,
            innerContainer: W
          }), new Error("Invalid marquee DOM structure");
        T.meta.sourceDOM = b.cloneNode(!0), T.meta.target = b, W.append(...b.childNodes), C.append(W), b == null || b.append(C), Ie.set(W, { display: "inline-flex" });
        const ge = b.getBoundingClientRect(), ze = W.getBoundingClientRect(), pt = ge.width + ze.width, Ve = document.createDocumentFragment(), je = [];
        let Pt = ze.width;
        if (!pt || !Pt)
          return;
        for (; Pt <= pt; ) {
          const V = W.cloneNode(!0);
          Pt += ze.width, je.push(V);
        }
        Ve.append(...je), C.append(Ve);
        const Je = Ie.context(() => {
          Ie.set(C, {
            x: 0,
            force3D: !0,
            width: Pt,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Pe = Ie.utils.pipe(
          (V) => Math.floor(V * 1e3) / 1e3,
          Ie.quickSetter(C, "x", "px")
        ), Ot = Ie.utils.wrap(0, -ze.width), Vt = Ie.utils.normalize(0, -ze.width);
        let xt, ht, y, X, Se, at, Ft;
        const St = Ie.ticker.add(() => {
          var V, jt;
          switch (ht = T.meta.velocity != null ? T.meta.scrollTrigger.getVelocity() ?? 0 : 0, y = ht * T.meta.velocity, T.meta.direction) {
            case "ltr":
              xt = -1, y = -Math.abs(y);
              break;
            case "rtl":
              xt = 1, y = Math.abs(y);
              break;
            case "scroll":
              xt = T.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              xt = -(T.meta.scrollTrigger.direction ?? 1), y = -y;
          }
          X = Ie.getProperty(C, "x"), Se = T.meta.speed * -xt, at = (Se - y) * Ie.ticker.deltaRatio(), Ft = Ot(X + at), Pe(Ft), (jt = (V = T.meta).onUpdate) == null || jt.call(V, Vt(Ft));
        });
        return (Te = (Yt = T.meta).onCreated) == null || Te.call(Yt), () => {
          var V;
          for (Je.kill(!0), Ie.ticker.remove(St), b == null || b.replaceChildren(...T.meta.sourceDOM.childNodes); je.length; )
            (V = je.pop()) == null || V.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...D
      }
    );
  }
}
export {
  $ as Ease,
  Ti as Marquee,
  ln as Motion,
  xi as Pointer
};
