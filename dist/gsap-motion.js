var Yi = Object.defineProperty;
var Xi = (S, p, m) => p in S ? Yi(S, p, { enumerable: !0, configurable: !0, writable: !0, value: m }) : S[p] = m;
var q = (S, p, m) => (Xi(S, typeof p != "symbol" ? p + "" : p, m), m);
import { fromEvent as zn, debounceTime as Bi, Observable as Hi } from "rxjs";
import Ve from "gsap";
var Xr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wi(S) {
  return S && S.__esModule && Object.prototype.hasOwnProperty.call(S, "default") ? S.default : S;
}
var Ni = "Expected a function", bi = 0 / 0, Gi = "[object Symbol]", $i = /^\s+|\s+$/g, qi = /^[-+]0x[0-9a-f]+$/i, Vi = /^0b[01]+$/i, Ui = /^0o[0-7]+$/i, ji = parseInt, Qi = typeof Xr == "object" && Xr && Xr.Object === Object && Xr, Ki = typeof self == "object" && self && self.Object === Object && self, Zi = Qi || Ki || Function("return this")(), Ji = Object.prototype, eo = Ji.toString, to = Math.max, ro = Math.min, Pn = function() {
  return Zi.Date.now();
};
function no(S, p, m) {
  var K, W, w, re, C, H, ge = 0, Ae = !1, pt = !1, Ue = !0;
  if (typeof S != "function")
    throw new TypeError(Ni);
  p = wi(p) || 0, An(m) && (Ae = !!m.leading, pt = "maxWait" in m, w = pt ? to(wi(m.maxWait) || 0, p) : w, Ue = "trailing" in m ? !!m.trailing : Ue);
  function je(F) {
    var Se = K, lt = W;
    return K = W = void 0, ge = F, re = S.apply(lt, Se), re;
  }
  function Rt(F) {
    return ge = F, C = setTimeout(Ot, p), Ae ? je(F) : re;
  }
  function Je(F) {
    var Se = F - H, lt = F - ge, Ft = p - Se;
    return pt ? ro(Ft, w - lt) : Ft;
  }
  function Re(F) {
    var Se = F - H, lt = F - ge;
    return H === void 0 || Se >= p || Se < 0 || pt && lt >= w;
  }
  function Ot() {
    var F = Pn();
    if (Re(F))
      return Ut(F);
    C = setTimeout(Ot, Je(F));
  }
  function Ut(F) {
    return C = void 0, Ue && K ? je(F) : (K = W = void 0, re);
  }
  function xt() {
    C !== void 0 && clearTimeout(C), ge = 0, K = H = W = C = void 0;
  }
  function ht() {
    return C === void 0 ? re : Ut(Pn());
  }
  function b() {
    var F = Pn(), Se = Re(F);
    if (K = arguments, W = this, H = F, Se) {
      if (C === void 0)
        return Rt(H);
      if (pt)
        return C = setTimeout(Ot, p), je(H);
    }
    return C === void 0 && (C = setTimeout(Ot, p)), re;
  }
  return b.cancel = xt, b.flush = ht, b;
}
function An(S) {
  var p = typeof S;
  return !!S && (p == "object" || p == "function");
}
function io(S) {
  return !!S && typeof S == "object";
}
function oo(S) {
  return typeof S == "symbol" || io(S) && eo.call(S) == Gi;
}
function wi(S) {
  if (typeof S == "number")
    return S;
  if (oo(S))
    return bi;
  if (An(S)) {
    var p = typeof S.valueOf == "function" ? S.valueOf() : S;
    S = An(p) ? p + "" : p;
  }
  if (typeof S != "string")
    return S === 0 ? S : +S;
  S = S.replace($i, "");
  var m = Vi.test(S);
  return m || Ui.test(S) ? ji(S.slice(2), m ? 2 : 8) : qi.test(S) ? bi : +S;
}
var so = no;
const lo = /* @__PURE__ */ Wi(so), Ln = class {
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
  constructor(p, m = {}) {
    q(this, "mediaQueryList");
    q(this, "motionResizeObserver");
    q(this, "meta", {});
    q(this, "subscriptions", []);
    q(this, "create");
    q(this, "cleanup");
    /**
     * Runs the cleanup function and resets this Motion instance.
     */
    q(this, "reset", lo(
      () => {
        var p;
        (p = this.cleanup) == null || p.call(this), requestAnimationFrame(() => {
          var m;
          this.cleanup = ((m = this.create) == null ? void 0 : m.call(this, this)) ?? void 0;
        });
      },
      Ln.resetDebounceTime,
      { leading: !0 }
    ));
    /**
     * Runs the cleanup function and makes this instance elegible for garbage collection.
     */
    q(this, "destroy", () => {
      var p, m;
      (p = this.cleanup) == null || p.call(this), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const K of Object.keys(this.meta))
        delete this.meta[K];
      for (; this.subscriptions.length; )
        (m = this.subscriptions.pop()) == null || m.unsubscribe();
    });
    this.observeMedia(m.watchMedia), this.observeResize(m.shouldResetOnResize), this.create = () => {
      var w, re;
      return [((w = m.enable) == null ? void 0 : w.call(m)) ?? !0, ((re = this.mediaQueryList) == null ? void 0 : re.matches) ?? !0].every(
        Boolean
      ) ? p(this) : void 0;
    }, this.cleanup = this.create(this) ?? void 0;
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
  static applyDeltaRatio(p) {
    return p * Ve.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(p) {
    p && (this.mediaQueryList = matchMedia(p), this.subscriptions.push(zn(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(p) {
    p && (this.motionResizeObserver = new ao(p), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Bi(500)).subscribe(() => this.reset())
    ));
  }
};
let br = Ln;
q(br, "resetDebounceTime", 100), /** Target framerate */
q(br, "referenceFramerate", 60);
class ao {
  constructor(p) {
    q(this, "axis");
    q(this, "element");
    q(this, "inlineSize");
    q(this, "blockSize");
    q(this, "observable");
    const [m, K] = [p].flat();
    this.element = typeof m == "string" ? document.querySelector(m) : m, this.axis = K, this.observable = new Hi((W) => {
      const w = new ResizeObserver(
        (re) => this.handleResize(re, W)
      );
      return this.element && w.observe(this.element), () => w.disconnect();
    });
  }
  handleResize(p, m) {
    const K = p.find((ge) => ge.target === this.element);
    if (!K)
      return;
    const { inlineSize: W, blockSize: w } = K.borderBoxSize[0], re = W !== this.inlineSize, C = w !== this.blockSize, H = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = W, this.blockSize = w, !H) {
      if (this.axis === "horizontal" && re || this.axis === "vertical" && C)
        return m.next();
      !this.axis && (re || C) && m.next();
    }
  }
}
const Fn = class {
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
    /** Window inner width */
    q(this, "viewWidth", window.innerWidth);
    /** Window inner height */
    q(this, "viewHeight", window.innerHeight);
    /** Pointer absolute x position */
    q(this, "clientX", this.viewWidth / 2);
    /** Pointer absolute y position */
    q(this, "clientY", this.viewHeight / 2);
    /** Pointer normalized x position (0 to 1) */
    q(this, "normalX", 0.5);
    /** Pointer normalized y position (0 to 1)*/
    q(this, "normalY", 0.5);
    q(this, "observable", zn(window, "mousemove"));
    /**
     * Internal motion instance
     */
    q(this, "motion", new br(
      (p) => {
        p.subscriptions.push(
          this.observable.subscribe((m) => {
            this.clientX = m.clientX, this.clientY = m.clientY, this.normalX = Ve.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Ve.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), p.subscriptions.push(
          zn(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), p.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ));
    /**
     * Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
     * Note that referencing `Pointer.instance` will create a new instance.
     */
    q(this, "destroy", () => {
      this.motion.destroy();
    });
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new Fn());
  }
};
let Dn = Fn;
q(Dn, "_instance");
var In = { exports: {} };
(function(S, p) {
  (function(m, K) {
    K(p);
  })(Xr, function(m) {
    function K(o, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(o, t.key, t);
      }
    }
    function W(o, e, n) {
      return e && K(o.prototype, e), n && K(o, n), o;
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
    var w, re, C, H, ge, Ae, pt, Ue, je, Rt, Je, Re, Ot, Ut = function() {
      return w || typeof window < "u" && (w = window.gsap) && w.registerPlugin && w;
    }, xt = 1, ht = [], b = [], F = [], Se = Date.now, lt = function(e, n) {
      return n;
    }, Ft = function() {
      var e = je.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, b), r.push.apply(r, F), b = t, F = r, lt = function(a, s) {
        return n[a](s);
      };
    }, St = function(e, n) {
      return ~F.indexOf(e) && F[F.indexOf(e) + 1][n];
    }, Yt = function(e) {
      return !!~Rt.indexOf(e);
    }, Te = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, V = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, jt = "scrollLeft", Br = "scrollTop", cn = function() {
      return Je && Je.isPressed || b.cache++;
    }, Hr = function(e, n) {
      var t = function r(i) {
        if (i || i === 0) {
          xt && (C.history.scrollRestoration = "manual");
          var a = Je && Je.isPressed;
          i = r.v = Math.round(i) || (Je && Je.iOS ? 1 : 0), e(i), r.cacheID = b.cache, a && lt("ss", i);
        } else
          (n || b.cache !== r.cacheID || lt("ref")) && (r.cacheID = b.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Ie = {
      s: jt,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Hr(function(o) {
        return arguments.length ? C.scrollTo(o, de.sc()) : C.pageXOffset || H[jt] || ge[jt] || Ae[jt] || 0;
      })
    }, de = {
      s: Br,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Ie,
      sc: Hr(function(o) {
        return arguments.length ? C.scrollTo(Ie.sc(), o) : C.pageYOffset || H[Br] || ge[Br] || Ae[Br] || 0;
      })
    }, Qe = function(e) {
      return w.utils.toArray(e)[0] || (typeof e == "string" && w.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Xt = function(e, n) {
      var t = n.s, r = n.sc;
      Yt(e) && (e = H.scrollingElement || ge);
      var i = b.indexOf(e), a = r === de.sc ? 1 : 2;
      !~i && (i = b.push(e) - 1), b[i + a] || e.addEventListener("scroll", cn);
      var s = b[i + a], d = s || (b[i + a] = Hr(St(e, t), !0) || (Yt(e) ? r : Hr(function(T) {
        return arguments.length ? e[t] = T : e[t];
      })));
      return d.target = e, s || (d.smooth = w.getProperty(e, "scrollBehavior") === "smooth"), d;
    }, un = function(e, n, t) {
      var r = e, i = e, a = Se(), s = a, d = n || 50, T = Math.max(500, d * 3), Y = function(_, $) {
        var ie = Se();
        $ || ie - a > d ? (i = r, r = _, s = a, a = ie) : t ? r += _ : r = i + (_ - i) / (ie - s) * (a - s);
      }, X = function() {
        i = r = t ? 0 : r, s = a = 0;
      }, g = function(_) {
        var $ = s, ie = i, N = Se();
        return (_ || _ === 0) && _ !== r && Y(_), a === s || N - s > T ? 0 : (r + (t ? ie : -ie)) / ((t ? N : a) - $) * 1e3;
      };
      return {
        update: Y,
        reset: X,
        getVelocity: g
      };
    }, wr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Yn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Xn = function() {
      je = w.core.globals().ScrollTrigger, je && je.core && Ft();
    }, Bn = function(e) {
      return w = e || Ut(), w && typeof document < "u" && document.body && (C = window, H = document, ge = H.documentElement, Ae = H.body, Rt = [C, H, ge, Ae], w.utils.clamp, Ot = w.core.context || function() {
      }, Ue = "onpointerenter" in Ae ? "pointer" : "mouse", pt = ae.isTouch = C.matchMedia && C.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in C || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Re = ae.eventTypes = ("ontouchstart" in ge ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ge ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return xt = 0;
      }, 500), Xn(), re = 1), re;
    };
    Ie.op = de, b.cache = 0;
    var ae = function() {
      function o(n) {
        this.init(n);
      }
      var e = o.prototype;
      return e.init = function(t) {
        re || Bn(w) || console.warn("Please gsap.registerPlugin(Observer)"), je || Xn();
        var r = t.tolerance, i = t.dragMinimum, a = t.type, s = t.target, d = t.lineHeight, T = t.debounce, Y = t.preventDefault, X = t.onStop, g = t.onStopDelay, u = t.ignore, _ = t.wheelSpeed, $ = t.event, ie = t.onDragStart, N = t.onDragEnd, Ke = t.onDrag, te = t.onPress, I = t.onRelease, Pe = t.onRight, oe = t.onLeft, E = t.onUp, Ze = t.onDown, mt = t.onChangeX, M = t.onChangeY, Ce = t.onChange, k = t.onToggleX, zt = t.onToggleY, Ee = t.onHover, Xe = t.onHoverEnd, Be = t.onMove, G = t.ignoreCheck, pe = t.isNormalizer, ce = t.onGestureStart, l = t.onGestureEnd, he = t.onWheel, nr = t.onEnable, Wt = t.onDisable, ut = t.onClick, Nt = t.scrollSpeed, U = t.capture, De = t.allowClicks, He = t.lockAxis, Dr = t.onLockAxis;
        this.target = s = Qe(s) || ge, this.vars = t, u && (u = w.utils.toArray(u)), r = r || 1e-9, i = i || 0, _ = _ || 1, Nt = Nt || 1, a = a || "wheel,touch,pointer", T = T !== !1, d || (d = parseFloat(C.getComputedStyle(Ae).lineHeight) || 22);
        var nt, ft, L, me, it, kt, We, c = this, At = 0, Q = 0, Gt = Xt(s, Ie), $t = Xt(s, de), gr = Gt(), Ne = $t(), zr = ~a.indexOf("touch") && !~a.indexOf("pointer") && Re[0] === "pointerdown", qt = Yt(s), se = s.ownerDocument || H, ot = [0, 0, 0], Ge = [0, 0, 0], Ar = 0, $e = function() {
          return Ar = Se();
        }, Ct = function(y, f) {
          return (c.event = y) && u && ~u.indexOf(y.target) || f && zr && y.pointerType !== "touch" || G && G(y, f);
        }, Ir = function() {
          c._vx.reset(), c._vy.reset(), ft.pause(), X && X(c);
        }, Vt = function() {
          var y = c.deltaX = Yn(ot), f = c.deltaY = Yn(Ge), v = Math.abs(y) >= r, x = Math.abs(f) >= r;
          Ce && (v || x) && Ce(c, y, f, ot, Ge), v && (Pe && c.deltaX > 0 && Pe(c), oe && c.deltaX < 0 && oe(c), mt && mt(c), k && c.deltaX < 0 != At < 0 && k(c), At = c.deltaX, ot[0] = ot[1] = ot[2] = 0), x && (Ze && c.deltaY > 0 && Ze(c), E && c.deltaY < 0 && E(c), M && M(c), zt && c.deltaY < 0 != Q < 0 && zt(c), Q = c.deltaY, Ge[0] = Ge[1] = Ge[2] = 0), (me || L) && (Be && Be(c), L && (Ke(c), L = !1), me = !1), kt && !(kt = !1) && Dr && Dr(c), it && (he(c), it = !1), nt = 0;
        }, _r = function(y, f, v) {
          ot[v] += y, Ge[v] += f, c._vx.update(y), c._vy.update(f), T ? nt || (nt = requestAnimationFrame(Vt)) : Vt();
        }, ir = function(y, f) {
          He && !We && (c.axis = We = Math.abs(y) > Math.abs(f) ? "x" : "y", kt = !0), We !== "y" && (ot[2] += y, c._vx.update(y, !0)), We !== "x" && (Ge[2] += f, c._vy.update(f, !0)), T ? nt || (nt = requestAnimationFrame(Vt)) : Vt();
        }, or = function(y) {
          if (!Ct(y, 1)) {
            y = wr(y, Y);
            var f = y.clientX, v = y.clientY, x = f - c.x, O = v - c.y, be = c.isDragging;
            c.x = f, c.y = v, (be || Math.abs(c.startX - f) >= i || Math.abs(c.startY - v) >= i) && (Ke && (L = !0), be || (c.isDragging = !0), ir(x, O), be || ie && ie(c));
          }
        }, z = c.onPress = function(R) {
          Ct(R, 1) || R && R.button || (c.axis = We = null, ft.pause(), c.isPressed = !0, R = wr(R), At = Q = 0, c.startX = c.x = R.clientX, c.startY = c.y = R.clientY, c._vx.reset(), c._vy.reset(), Te(pe ? s : se, Re[1], or, Y, !0), c.deltaX = c.deltaY = 0, te && te(c));
        }, It = c.onRelease = function(R) {
          if (!Ct(R, 1)) {
            V(pe ? s : se, Re[1], or, !0);
            var y = !isNaN(c.y - c.startY), f = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), v = wr(R);
            !f && y && (c._vx.reset(), c._vy.reset(), Y && De && w.delayedCall(0.08, function() {
              if (Se() - Ar > 300 && !R.defaultPrevented) {
                if (R.target.click)
                  R.target.click();
                else if (se.createEvent) {
                  var x = se.createEvent("MouseEvents");
                  x.initMouseEvent("click", !0, !0, C, 1, v.screenX, v.screenY, v.clientX, v.clientY, !1, !1, !1, !1, 0, null), R.target.dispatchEvent(x);
                }
              }
            })), c.isDragging = c.isGesturing = c.isPressed = !1, X && !pe && ft.restart(!0), N && f && N(c), I && I(c, f);
          }
        }, bt = function(y) {
          return y.touches && y.touches.length > 1 && (c.isGesturing = !0) && ce(y, c.isDragging);
        }, wt = function() {
          return (c.isGesturing = !1) || l(c);
        }, dt = function(y) {
          if (!Ct(y)) {
            var f = Gt(), v = $t();
            _r((f - gr) * Nt, (v - Ne) * Nt, 1), gr = f, Ne = v, X && ft.restart(!0);
          }
        }, yt = function(y) {
          if (!Ct(y)) {
            y = wr(y, Y), he && (it = !0);
            var f = (y.deltaMode === 1 ? d : y.deltaMode === 2 ? C.innerHeight : 1) * _;
            _r(y.deltaX * f, y.deltaY * f, 0), X && !pe && ft.restart(!0);
          }
        }, sr = function(y) {
          if (!Ct(y)) {
            var f = y.clientX, v = y.clientY, x = f - c.x, O = v - c.y;
            c.x = f, c.y = v, me = !0, (x || O) && ir(x, O);
          }
        }, vr = function(y) {
          c.event = y, Ee(c);
        }, Lt = function(y) {
          c.event = y, Xe(c);
        }, Lr = function(y) {
          return Ct(y) || wr(y, Y) && ut(c);
        };
        ft = c._dc = w.delayedCall(g || 0.25, Ir).pause(), c.deltaX = c.deltaY = 0, c._vx = un(0, 50, !0), c._vy = un(0, 50, !0), c.scrollX = Gt, c.scrollY = $t, c.isDragging = c.isGesturing = c.isPressed = !1, Ot(this), c.enable = function(R) {
          return c.isEnabled || (Te(qt ? se : s, "scroll", cn), a.indexOf("scroll") >= 0 && Te(qt ? se : s, "scroll", dt, Y, U), a.indexOf("wheel") >= 0 && Te(s, "wheel", yt, Y, U), (a.indexOf("touch") >= 0 && pt || a.indexOf("pointer") >= 0) && (Te(s, Re[0], z, Y, U), Te(se, Re[2], It), Te(se, Re[3], It), De && Te(s, "click", $e, !1, !0), ut && Te(s, "click", Lr), ce && Te(se, "gesturestart", bt), l && Te(se, "gestureend", wt), Ee && Te(s, Ue + "enter", vr), Xe && Te(s, Ue + "leave", Lt), Be && Te(s, Ue + "move", sr)), c.isEnabled = !0, R && R.type && z(R), nr && nr(c)), c;
        }, c.disable = function() {
          c.isEnabled && (ht.filter(function(R) {
            return R !== c && Yt(R.target);
          }).length || V(qt ? se : s, "scroll", cn), c.isPressed && (c._vx.reset(), c._vy.reset(), V(pe ? s : se, Re[1], or, !0)), V(qt ? se : s, "scroll", dt, U), V(s, "wheel", yt, U), V(s, Re[0], z, U), V(se, Re[2], It), V(se, Re[3], It), V(s, "click", $e, !0), V(s, "click", Lr), V(se, "gesturestart", bt), V(se, "gestureend", wt), V(s, Ue + "enter", vr), V(s, Ue + "leave", Lt), V(s, Ue + "move", sr), c.isEnabled = c.isPressed = c.isDragging = !1, Wt && Wt(c));
        }, c.kill = c.revert = function() {
          c.disable();
          var R = ht.indexOf(c);
          R >= 0 && ht.splice(R, 1), Je === c && (Je = 0);
        }, ht.push(c), pe && Yt(s) && (Je = c), c.enable($);
      }, W(o, [{
        key: "velocityX",
        get: function() {
          return this._vx.getVelocity();
        }
      }, {
        key: "velocityY",
        get: function() {
          return this._vy.getVelocity();
        }
      }]), o;
    }();
    ae.version = "3.11.5", ae.create = function(o) {
      return new ae(o);
    }, ae.register = Bn, ae.getAll = function() {
      return ht.slice();
    }, ae.getById = function(o) {
      return ht.filter(function(e) {
        return e.vars.id === o;
      })[0];
    }, Ut() && w.registerPlugin(ae);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var h, ar, A, j, gt, ee, Hn, Wr, Nr, cr, Gr, $r, Oe, qr, fn, Le, Wn, Nn, ur, Gn, dn, $n, et, qn, Vn, Un, Bt, pn, hn, gn, Vr = 1, Fe = Date.now, _n = Fe(), at = 0, yr = 0, Si = function o() {
      return yr && requestAnimationFrame(o);
    }, jn = function() {
      return qr = 1;
    }, Qn = function() {
      return qr = 0;
    }, Tt = function(e) {
      return e;
    }, xr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Kn = function() {
      return typeof window < "u";
    }, Zn = function() {
      return h || Kn() && (h = window.gsap) && h.registerPlugin && h;
    }, Qt = function(e) {
      return !!~Hn.indexOf(e);
    }, Jn = function(e) {
      return St(e, "getBoundingClientRect") || (Qt(e) ? function() {
        return ln.width = A.innerWidth, ln.height = A.innerHeight, ln;
      } : function() {
        return Pt(e);
      });
    }, Ti = function(e, n, t) {
      var r = t.d, i = t.d2, a = t.a;
      return (a = St(e, "getBoundingClientRect")) ? function() {
        return a()[r];
      } : function() {
        return (n ? A["inner" + i] : e["client" + i]) || 0;
      };
    }, ki = function(e, n) {
      return !n || ~F.indexOf(e) ? Jn(e) : function() {
        return ln;
      };
    }, Ht = function(e, n) {
      var t = n.s, r = n.d2, i = n.d, a = n.a;
      return Math.max(0, (t = "scroll" + r) && (a = St(e, t)) ? a() - Jn(e)()[i] : Qt(e) ? (gt[t] || ee[t]) - (A["inner" + r] || gt["client" + r] || ee["client" + r]) : e[t] - e["offset" + r]);
    }, Ur = function(e, n) {
      for (var t = 0; t < ur.length; t += 3)
        (!n || ~n.indexOf(ur[t + 1])) && e(ur[t], ur[t + 1], ur[t + 2]);
    }, _t = function(e) {
      return typeof e == "string";
    }, Ye = function(e) {
      return typeof e == "function";
    }, Sr = function(e) {
      return typeof e == "number";
    }, jr = function(e) {
      return typeof e == "object";
    }, Tr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, vn = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, fr = Math.abs, ei = "left", ti = "top", mn = "right", bn = "bottom", Kt = "width", Zt = "height", kr = "Right", Cr = "Left", Er = "Top", Mr = "Bottom", ne = "padding", ct = "margin", dr = "Width", wn = "Height", ke = "px", vt = function(e) {
      return A.getComputedStyle(e);
    }, Ci = function(e) {
      var n = vt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ri = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Pt = function(e, n) {
      var t = n && vt(e)[fn] !== "matrix(1, 0, 0, 1, 0, 0)" && h.to(e, {
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
      var n = [], t = e.labels, r = e.duration(), i;
      for (i in t)
        n.push(t[i] / r);
      return n;
    }, Ei = function(e) {
      return function(n) {
        return h.utils.snap(ni(e), n);
      };
    }, xn = function(e) {
      var n = h.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, i) {
        return r - i;
      });
      return t ? function(r, i, a) {
        a === void 0 && (a = 1e-3);
        var s;
        if (!i)
          return n(r);
        if (i > 0) {
          for (r -= a, s = 0; s < t.length; s++)
            if (t[s] >= r)
              return t[s];
          return t[s - 1];
        } else
          for (s = t.length, r += a; s--; )
            if (t[s] <= r)
              return t[s];
        return t[0];
      } : function(r, i, a) {
        a === void 0 && (a = 1e-3);
        var s = n(r);
        return !i || Math.abs(s - r) < a || s - r < 0 == i < 0 ? s : n(i < 0 ? r - e : r + e);
      };
    }, Mi = function(e) {
      return function(n, t) {
        return xn(ni(e))(n, t.direction);
      };
    }, Qr = function(e, n, t, r) {
      return t.split(",").forEach(function(i) {
        return e(n, i, r);
      });
    }, _e = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, ve = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Kr = function(e, n, t) {
      t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
    }, ii = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, Zr = {
      toggleActions: "play",
      anticipatePin: 0
    }, Jr = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    }, en = function(e, n) {
      if (_t(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in Jr ? Jr[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, tn = function(e, n, t, r, i, a, s, d) {
      var T = i.startColor, Y = i.endColor, X = i.fontSize, g = i.indent, u = i.fontWeight, _ = j.createElement("div"), $ = Qt(t) || St(t, "pinType") === "fixed", ie = e.indexOf("scroller") !== -1, N = $ ? ee : t, Ke = e.indexOf("start") !== -1, te = Ke ? T : Y, I = "border-color:" + te + ";font-size:" + X + ";color:" + te + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return I += "position:" + ((ie || d) && $ ? "fixed;" : "absolute;"), (ie || d || !$) && (I += (r === de ? mn : bn) + ":" + (a + parseFloat(g)) + "px;"), s && (I += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), _._isStart = Ke, _.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), _.style.cssText = I, _.innerText = n || n === 0 ? e + "-" + n : e, N.children[0] ? N.insertBefore(_, N.children[0]) : N.appendChild(_), _._offset = _["offset" + r.op.d2], rn(_, 0, r, Ke), _;
    }, rn = function(e, n, t, r) {
      var i = {
        display: "block"
      }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
      e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + a + dr] = 1, i["border" + s + dr] = 0, i[t.p] = n + "px", h.set(e, i);
    }, P = [], Sn = {}, Rr, oi = function() {
      return Fe() - at > 34 && (Rr || (Rr = requestAnimationFrame(Dt)));
    }, pr = function() {
      (!et || !et.isPressed || et.startX > ee.clientWidth) && (b.cache++, et ? Rr || (Rr = requestAnimationFrame(Dt)) : Dt(), at || er("scrollStart"), at = Fe());
    }, Tn = function() {
      Un = A.innerWidth, Vn = A.innerHeight;
    }, Or = function() {
      b.cache++, !Oe && !$n && !j.fullscreenElement && !j.webkitFullscreenElement && (!qn || Un !== A.innerWidth || Math.abs(A.innerHeight - Vn) > A.innerHeight * 0.25) && Wr.restart(!0);
    }, Jt = {}, Ri = [], si = function o() {
      return ve(D, "scrollEnd", o) || rr(!0);
    }, er = function(e) {
      return Jt[e] && Jt[e].map(function(n) {
        return n();
      }) || Ri;
    }, tt = [], li = function(e) {
      for (var n = 0; n < tt.length; n += 5)
        (!e || tt[n + 4] && tt[n + 4].query === e) && (tt[n].style.cssText = tt[n + 1], tt[n].getBBox && tt[n].setAttribute("transform", tt[n + 2] || ""), tt[n + 3].uncache = 1);
    }, kn = function(e, n) {
      var t;
      for (Le = 0; Le < P.length; Le++)
        t = P[Le], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || er("revert");
    }, ai = function(e, n) {
      b.cache++, (n || !rt) && b.forEach(function(t) {
        return Ye(t) && t.cacheID++ && (t.rec = 0);
      }), _t(e) && (A.history.scrollRestoration = hn = e);
    }, rt, tr = 0, ci, Oi = function() {
      if (ci !== tr) {
        var e = ci = tr;
        requestAnimationFrame(function() {
          return e === tr && rr(!0);
        });
      }
    }, rr = function(e, n) {
      if (at && !e) {
        _e(D, "scrollEnd", si);
        return;
      }
      rt = D.isRefreshing = !0, b.forEach(function(r) {
        return Ye(r) && r.cacheID++ && (r.rec = r());
      });
      var t = er("refreshInit");
      Gn && D.sort(), n || kn(), b.forEach(function(r) {
        Ye(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
      }), P.slice(0).forEach(function(r) {
        return r.refresh();
      }), P.forEach(function(r, i) {
        if (r._subPinOffset && r.pin) {
          var a = r.vars.horizontal ? "offsetWidth" : "offsetHeight", s = r.pin[a];
          r.revert(!0, 1), r.adjustPinSpacing(r.pin[a] - s), r.refresh();
        }
      }), P.forEach(function(r) {
        return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, Ht(r.scroller, r._dir)));
      }), t.forEach(function(r) {
        return r && r.render && r.render(-1);
      }), b.forEach(function(r) {
        Ye(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), ai(hn, 1), Wr.pause(), tr++, rt = 2, Dt(2), P.forEach(function(r) {
        return Ye(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), rt = D.isRefreshing = !1, er("refresh");
    }, Cn = 0, nn = 1, Pr, Dt = function(e) {
      if (!rt || e === 2) {
        D.isUpdating = !0, Pr && Pr.update(0);
        var n = P.length, t = Fe(), r = t - _n >= 50, i = n && P[0].scroll();
        if (nn = Cn > i ? -1 : 1, rt || (Cn = i), r && (at && !qr && t - at > 200 && (at = 0, er("scrollEnd")), Gr = _n, _n = t), nn < 0) {
          for (Le = n; Le-- > 0; )
            P[Le] && P[Le].update(0, r);
          nn = 1;
        } else
          for (Le = 0; Le < n; Le++)
            P[Le] && P[Le].update(0, r);
        D.isUpdating = !1;
      }
      Rr = 0;
    }, En = [ei, ti, bn, mn, ct + Mr, ct + kr, ct + Er, ct + Cr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], on = En.concat([Kt, Zt, "boxSizing", "max" + dr, "max" + wn, "position", ct, ne, ne + Er, ne + kr, ne + Mr, ne + Cr]), Pi = function(e, n, t) {
      hr(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        hr(r.spacerState);
      else if (e._gsap.swappedIn) {
        var i = n.parentNode;
        i && (i.insertBefore(e, n), i.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, Mn = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var i = En.length, a = n.style, s = e.style, d; i--; )
          d = En[i], a[d] = t[d];
        a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[bn] = s[mn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Kt] = yn(e, Ie) + ke, a[Zt] = yn(e, de) + ke, a[ne] = s[ct] = s[ti] = s[ei] = "0", hr(r), s[Kt] = s["max" + dr] = t[Kt], s[Zt] = s["max" + wn] = t[Zt], s[ne] = t[ne], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Di = /([A-Z])/g, hr = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, i, a;
        for ((e.t._gsap || h.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          a = e[r + 1], i = e[r], a ? n[i] = a : n[i] && n.removeProperty(i.replace(Di, "-$1").toLowerCase());
      }
    }, sn = function(e) {
      for (var n = on.length, t = e.style, r = [], i = 0; i < n; i++)
        r.push(on[i], t[on[i]]);
      return r.t = e, r;
    }, zi = function(e, n, t) {
      for (var r = [], i = e.length, a = t ? 8 : 0, s; a < i; a += 2)
        s = e[a], r.push(s, s in n ? n[s] : e[a + 1]);
      return r.t = e.t, r;
    }, ln = {
      left: 0,
      top: 0
    }, ui = function(e, n, t, r, i, a, s, d, T, Y, X, g, u) {
      Ye(e) && (e = e(d)), _t(e) && e.substr(0, 3) === "max" && (e = g + (e.charAt(4) === "=" ? en("0" + e.substr(3), t) : 0));
      var _ = u ? u.time() : 0, $, ie, N;
      if (u && u.seek(0), Sr(e))
        u && (e = h.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, g, e)), s && rn(s, t, r, !0);
      else {
        Ye(n) && (n = n(d));
        var Ke = (e || "0").split(" "), te, I, Pe, oe;
        N = Qe(n) || ee, te = Pt(N) || {}, (!te || !te.left && !te.top) && vt(N).display === "none" && (oe = N.style.display, N.style.display = "block", te = Pt(N), oe ? N.style.display = oe : N.style.removeProperty("display")), I = en(Ke[0], te[r.d]), Pe = en(Ke[1] || "0", t), e = te[r.p] - T[r.p] - Y + I + i - Pe, s && rn(s, Pe, r, t - Pe < 20 || s._isStart && Pe > 20), t -= t - Pe;
      }
      if (a) {
        var E = e + t, Ze = a._isStart;
        $ = "scroll" + r.d2, rn(a, E, r, Ze && E > 20 || !Ze && (X ? Math.max(ee[$], gt[$]) : a.parentNode[$]) <= E + 1), X && (T = Pt(s), X && (a.style[r.op.p] = T[r.op.p] - r.op.m - a._offset + ke));
      }
      return u && N && ($ = Pt(N), u.seek(g), ie = Pt(N), u._caScrollDist = $[r.p] - ie[r.p], e = e / u._caScrollDist * g), u && u.seek(_), u ? e : Math.round(e);
    }, Ai = /(webkit|moz|length|cssText|inset)/i, fi = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var i = e.style, a, s;
        if (n === ee) {
          e._stOrig = i.cssText, s = vt(e);
          for (a in s)
            !+a && !Ai.test(a) && s[a] && typeof i[a] == "string" && a !== "0" && (i[a] = s[a]);
          i.top = t, i.left = r;
        } else
          i.cssText = e._stOrig;
        h.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, di = function(e, n, t) {
      var r = n, i = r;
      return function(a) {
        var s = Math.round(e());
        return s !== r && s !== i && Math.abs(s - r) > 3 && Math.abs(s - i) > 3 && (a = s, t && t()), i = r, r = a, a;
      };
    }, pi = function(e, n) {
      var t = Xt(e, n), r = "_scroll" + n.p2, i = function a(s, d, T, Y, X) {
        var g = a.tween, u = d.onComplete, _ = {};
        T = T || t();
        var $ = di(t, T, function() {
          g.kill(), a.tween = 0;
        });
        return X = Y && X || 0, Y = Y || s - T, g && g.kill(), d[r] = s, d.modifiers = _, _[r] = function() {
          return $(T + Y * g.ratio + X * g.ratio * g.ratio);
        }, d.onUpdate = function() {
          b.cache++, Dt();
        }, d.onComplete = function() {
          a.tween = 0, u && u.call(g);
        }, g = a.tween = h.to(e, d), g;
      };
      return e[r] = t, t.wheelHandler = function() {
        return i.tween && i.tween.kill() && (i.tween = 0);
      }, _e(e, "wheel", t.wheelHandler), D.isTouch && _e(e, "touchmove", t.wheelHandler), i;
    }, D = function() {
      function o(n, t) {
        ar || o.register(h) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = o.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !yr) {
          this.update = this.refresh = this.kill = Tt;
          return;
        }
        t = ri(_t(t) || Sr(t) || t.nodeType ? {
          trigger: t
        } : t, Zr);
        var i = t, a = i.onUpdate, s = i.toggleClass, d = i.id, T = i.onToggle, Y = i.onRefresh, X = i.scrub, g = i.trigger, u = i.pin, _ = i.pinSpacing, $ = i.invalidateOnRefresh, ie = i.anticipatePin, N = i.onScrubComplete, Ke = i.onSnapComplete, te = i.once, I = i.snap, Pe = i.pinReparent, oe = i.pinSpacer, E = i.containerAnimation, Ze = i.fastScrollEnd, mt = i.preventOverlaps, M = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ie : de, Ce = !X && X !== 0, k = Qe(t.scroller || A), zt = h.core.getCache(k), Ee = Qt(k), Xe = ("pinType" in t ? t.pinType : St(k, "pinType") || Ee && "fixed") === "fixed", Be = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = Ce && t.toggleActions.split(" "), pe = "markers" in t ? t.markers : Zr.markers, ce = Ee ? 0 : parseFloat(vt(k)["border" + M.p2 + dr]) || 0, l = this, he = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, nr = Ti(k, Ee, M), Wt = ki(k, Ee), ut = 0, Nt = 0, U = Xt(k, M), De, He, Dr, nt, ft, L, me, it, kt, We, c, At, Q, Gt, $t, gr, Ne, zr, qt, se, ot, Ge, Ar, $e, Ct, Ir, Vt, _r, ir, or, z, It, bt, wt, dt, yt, sr, vr, Lt;
        if (pn(l), l._dir = M, ie *= 45, l.scroller = k, l.scroll = E ? E.time.bind(E) : U, nt = U(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Pr = l)), zt.tweenScroll = zt.tweenScroll || {
          top: pi(k, de),
          left: pi(k, Ie)
        }, l.tweenTo = De = zt.tweenScroll[M.p], l.scrubDuration = function(f) {
          It = Sr(f) && f, It ? z ? z.duration(f) : z = h.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: It,
            paused: !0,
            onComplete: function() {
              return N && N(l);
            }
          }) : (z && z.progress(1).kill(), z = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(X), z && z.resetTo && z.resetTo("totalProgress", 0), ir = 0, d || (d = r.vars.id)), P.push(l), I && ((!jr(I) || I.push) && (I = {
          snapTo: I
        }), "scrollBehavior" in ee.style && h.set(Ee ? [ee, gt] : k, {
          scrollBehavior: "auto"
        }), b.forEach(function(f) {
          return Ye(f) && f.target === (Ee ? j.scrollingElement || gt : k) && (f.smooth = !1);
        }), Dr = Ye(I.snapTo) ? I.snapTo : I.snapTo === "labels" ? Ei(r) : I.snapTo === "labelsDirectional" ? Mi(r) : I.directional !== !1 ? function(f, v) {
          return xn(I.snapTo)(f, Fe() - Nt < 500 ? 0 : v.direction);
        } : h.utils.snap(I.snapTo), bt = I.duration || {
          min: 0.1,
          max: 2
        }, bt = jr(bt) ? cr(bt.min, bt.max) : cr(bt, bt), wt = h.delayedCall(I.delay || It / 2 || 0.1, function() {
          var f = U(), v = Fe() - Nt < 500, x = De.tween;
          if ((v || Math.abs(l.getVelocity()) < 10) && !x && !qr && ut !== f) {
            var O = (f - L) / Q, be = r && !Ce ? r.totalProgress() : O, B = v ? 0 : (be - or) / (Fe() - Gr) * 1e3 || 0, Z = h.utils.clamp(-O, 1 - O, fr(B / 2) * B / 0.185), Me = O + (I.inertia === !1 ? 0 : Z), we = cr(0, 1, Dr(Me, l)), ue = Math.round(L + we * Q), J = I, st = J.onStart, qe = J.onInterrupt, ye = J.onComplete;
            if (f <= me && f >= L && ue !== f) {
              if (x && !x._initted && x.data <= fr(ue - f))
                return;
              I.inertia === !1 && (Z = we - O), De(ue, {
                duration: bt(fr(Math.max(fr(Me - be), fr(we - be)) * 0.185 / B / 0.05 || 0)),
                ease: I.ease || "power3",
                data: fr(ue - f),
                onInterrupt: function() {
                  return wt.restart(!0) && qe && qe(l);
                },
                onComplete: function() {
                  l.update(), ut = U(), ir = or = r && !Ce ? r.totalProgress() : l.progress, Ke && Ke(l), ye && ye(l);
                }
              }, f, Z * Q, ue - f - Z * Q), st && st(l, De.tween);
            }
          } else
            l.isActive && ut !== f && wt.restart(!0);
        }).pause()), d && (Sn[d] = l), g = l.trigger = Qe(g || u), Lt = g && g._gsap && g._gsap.stRevert, Lt && (Lt = Lt(l)), u = u === !0 ? g : Qe(u), _t(s) && (s = {
          targets: g,
          className: s
        }), u && (_ === !1 || _ === ct || (_ = !_ && u.parentNode && u.parentNode.style && vt(u.parentNode).display === "flex" ? !1 : ne), l.pin = u, He = h.core.getCache(u), He.spacer ? Gt = He.pinState : (oe && (oe = Qe(oe), oe && !oe.nodeType && (oe = oe.current || oe.nativeElement), He.spacerIsNative = !!oe, oe && (He.spacerState = sn(oe))), He.spacer = Ne = oe || j.createElement("div"), Ne.classList.add("pin-spacer"), d && Ne.classList.add("pin-spacer-" + d), He.pinState = Gt = sn(u)), t.force3D !== !1 && h.set(u, {
          force3D: !0
        }), l.spacer = Ne = He.spacer, _r = vt(u), Ar = _r[_ + M.os2], qt = h.getProperty(u), se = h.quickSetter(u, M.a, ke), Mn(u, Ne, _r), gr = sn(u)), pe) {
          At = jr(pe) ? ri(pe, ii) : ii, We = tn("scroller-start", d, k, M, At, 0), c = tn("scroller-end", d, k, M, At, 0, We), zr = We["offset" + M.op.d2];
          var Lr = Qe(St(k, "content") || k);
          it = this.markerStart = tn("start", d, Lr, M, At, zr, 0, E), kt = this.markerEnd = tn("end", d, Lr, M, At, zr, 0, E), E && (vr = h.quickSetter([it, kt], M.a, ke)), !Xe && !(F.length && St(k, "fixedMarkers") === !0) && (Ci(Ee ? ee : k), h.set([We, c], {
            force3D: !0
          }), Ct = h.quickSetter(We, M.a, ke), Vt = h.quickSetter(c, M.a, ke));
        }
        if (E) {
          var R = E.vars.onUpdate, y = E.vars.onUpdateParams;
          E.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), R && R.apply(E, y || []);
          });
        }
        l.previous = function() {
          return P[P.indexOf(l) - 1];
        }, l.next = function() {
          return P[P.indexOf(l) + 1];
        }, l.revert = function(f, v) {
          if (!v)
            return l.kill(!0);
          var x = f !== !1 || !l.enabled, O = Oe;
          x !== l.isReverted && (x && (yt = Math.max(U(), l.scroll.rec || 0), dt = l.progress, sr = r && r.progress()), it && [it, kt, We, c].forEach(function(be) {
            return be.style.display = x ? "none" : "block";
          }), x && (Oe = l, l.update(x)), u && (!Pe || !l.isActive) && (x ? Pi(u, Ne, Gt) : Mn(u, Ne, vt(u), $e)), x || l.update(x), Oe = O, l.isReverted = x);
        }, l.refresh = function(f, v) {
          if (!((Oe || !l.enabled) && !v)) {
            if (u && f && at) {
              _e(o, "scrollEnd", si);
              return;
            }
            !rt && he && he(l), Oe = l, Nt = Fe(), De.tween && (De.tween.kill(), De.tween = 0), z && z.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var x = nr(), O = Wt(), be = E ? E.duration() : Ht(k, M), B = Q <= 0.01, Z = 0, Me = 0, we = t.end, ue = t.endTrigger || g, J = t.start || (t.start === 0 || !g ? 0 : u ? "0 0" : "0 100%"), st = l.pinnedContainer = t.pinnedContainer && Qe(t.pinnedContainer), qe = g && Math.max(0, P.indexOf(l)) || 0, ye = qe, le, ze, mr, lr, fe, xe, Et, On, mi, Fr, Mt; ye--; )
              xe = P[ye], xe.end || xe.refresh(0, 1) || (Oe = l), Et = xe.pin, Et && (Et === g || Et === u || Et === st) && !xe.isReverted && (Fr || (Fr = []), Fr.unshift(xe), xe.revert(!0, !0)), xe !== P[ye] && (qe--, ye--);
            for (Ye(J) && (J = J(l)), L = ui(J, g, x, M, U(), it, We, l, O, ce, Xe, be, E) || (u ? -1e-3 : 0), Ye(we) && (we = we(l)), _t(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (_t(J) ? J.split(" ")[0] : "") + we : (Z = en(we.substr(2), x), we = _t(J) ? J : (E ? h.utils.mapRange(0, E.duration(), E.scrollTrigger.start, E.scrollTrigger.end, L) : L) + Z, ue = g)), me = Math.max(L, ui(we || (ue ? "100% 0" : be), ue, x, M, U() + Z, kt, c, l, O, ce, Xe, be, E)) || -1e-3, Q = me - L || (L -= 0.01) && 1e-3, Z = 0, ye = qe; ye--; )
              xe = P[ye], Et = xe.pin, Et && xe.start - xe._pinPush <= L && !E && xe.end > 0 && (le = xe.end - xe.start, (Et === g && xe.start - xe._pinPush < L || Et === st) && !Sr(J) && (Z += le * (1 - xe.progress)), Et === u && (Me += le));
            if (L += Z, me += Z, B && (dt = h.utils.clamp(0, 1, h.utils.normalize(L, me, yt))), l._pinPush = Me, it && Z && (le = {}, le[M.a] = "+=" + Z, st && (le[M.p] = "-=" + U()), h.set([it, kt], le)), u)
              le = vt(u), lr = M === de, mr = U(), ot = parseFloat(qt(M.a)) + Me, !be && me > 1 && (Mt = (Ee ? j.scrollingElement || gt : k).style, Mt = {
                style: Mt,
                value: Mt["overflow" + M.a.toUpperCase()]
              }, Mt.style["overflow" + M.a.toUpperCase()] = "scroll"), Mn(u, Ne, le), gr = sn(u), ze = Pt(u, !0), On = Xe && Xt(k, lr ? Ie : de)(), _ && ($e = [_ + M.os2, Q + Me + ke], $e.t = Ne, ye = _ === ne ? yn(u, M) + Q + Me : 0, ye && $e.push(M.d, ye + ke), hr($e), st && P.forEach(function(Yr) {
                Yr.pin === st && Yr.vars.pinSpacing !== !1 && (Yr._subPinOffset = !0);
              }), Xe && U(yt)), Xe && (fe = {
                top: ze.top + (lr ? mr - L : On) + ke,
                left: ze.left + (lr ? On : mr - L) + ke,
                boxSizing: "border-box",
                position: "fixed"
              }, fe[Kt] = fe["max" + dr] = Math.ceil(ze.width) + ke, fe[Zt] = fe["max" + wn] = Math.ceil(ze.height) + ke, fe[ct] = fe[ct + Er] = fe[ct + kr] = fe[ct + Mr] = fe[ct + Cr] = "0", fe[ne] = le[ne], fe[ne + Er] = le[ne + Er], fe[ne + kr] = le[ne + kr], fe[ne + Mr] = le[ne + Mr], fe[ne + Cr] = le[ne + Cr], $t = zi(Gt, fe, Pe), rt && U(0)), r ? (mi = r._initted, dn(1), r.render(r.duration(), !0, !0), Ge = qt(M.a) - ot + Q + Me, Ir = Math.abs(Q - Ge) > 1, Xe && Ir && $t.splice($t.length - 2, 2), r.render(0, !0, !0), mi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), dn(0)) : Ge = Q, Mt && (Mt.value ? Mt.style["overflow" + M.a.toUpperCase()] = Mt.value : Mt.style.removeProperty("overflow-" + M.a));
            else if (g && U() && !E)
              for (ze = g.parentNode; ze && ze !== ee; )
                ze._pinOffset && (L -= ze._pinOffset, me -= ze._pinOffset), ze = ze.parentNode;
            Fr && Fr.forEach(function(Yr) {
              return Yr.revert(!1, !0);
            }), l.start = L, l.end = me, nt = ft = rt ? yt : U(), !E && !rt && (nt < yt && U(yt), l.scroll.rec = 0), l.revert(!1, !0), wt && (ut = -1, l.isActive && U(L + Q * dt), wt.restart(!0)), Oe = 0, r && Ce && (r._initted || sr) && r.progress() !== sr && r.progress(sr, !0).render(r.time(), !0, !0), (B || dt !== l.progress || E) && (r && !Ce && r.totalProgress(E && L < -1e-3 && !dt ? h.utils.normalize(L, me, 0) : dt, !0), l.progress = (nt - L) / Q === dt ? 0 : dt), u && _ && (Ne._pinOffset = Math.round(l.progress * Ge)), z && z.invalidate(), Y && !rt && Y(l);
          }
        }, l.getVelocity = function() {
          return (U() - ft) / (Fe() - Gr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Tr(l.callbackAnimation), r && (z ? z.progress(1) : r.paused() ? Ce || Tr(r, l.direction < 0, 1) : Tr(r, r.reversed()));
        }, l.labelToScroll = function(f) {
          return r && r.labels && (L || l.refresh() || L) + r.labels[f] / r.duration() * Q || 0;
        }, l.getTrailing = function(f) {
          var v = P.indexOf(l), x = l.direction > 0 ? P.slice(0, v).reverse() : P.slice(v + 1);
          return (_t(f) ? x.filter(function(O) {
            return O.vars.preventOverlaps === f;
          }) : x).filter(function(O) {
            return l.direction > 0 ? O.end <= L : O.start >= me;
          });
        }, l.update = function(f, v, x) {
          if (!(E && !x && !f)) {
            var O = rt === !0 ? yt : l.scroll(), be = f ? 0 : (O - L) / Q, B = be < 0 ? 0 : be > 1 ? 1 : be || 0, Z = l.progress, Me, we, ue, J, st, qe, ye, le;
            if (v && (ft = nt, nt = E ? U() : O, I && (or = ir, ir = r && !Ce ? r.totalProgress() : B)), ie && !B && u && !Oe && !Vr && at && L < O + (O - ft) / (Fe() - Gr) * ie && (B = 1e-4), B !== Z && l.enabled) {
              if (Me = l.isActive = !!B && B < 1, we = !!Z && Z < 1, qe = Me !== we, st = qe || !!B != !!Z, l.direction = B > Z ? 1 : -1, l.progress = B, st && !Oe && (ue = B && !Z ? 0 : B === 1 ? 1 : Z === 1 ? 2 : 3, Ce && (J = !qe && G[ue + 1] !== "none" && G[ue + 1] || G[ue], le = r && (J === "complete" || J === "reset" || J in r))), mt && (qe || le) && (le || X || !r) && (Ye(mt) ? mt(l) : l.getTrailing(mt).forEach(function(fe) {
                return fe.endAnimation();
              })), Ce || (z && !Oe && !Vr ? (z._dp._time - z._start !== z._time && z.render(z._dp._time - z._start), z.resetTo ? z.resetTo("totalProgress", B, r._tTime / r._tDur) : (z.vars.totalProgress = B, z.invalidate().restart())) : r && r.totalProgress(B, !!Oe)), u) {
                if (f && _ && (Ne.style[_ + M.os2] = Ar), !Xe)
                  se(xr(ot + Ge * B));
                else if (st) {
                  if (ye = !f && B > Z && me + 1 > O && O + 1 >= Ht(k, M), Pe)
                    if (!f && (Me || ye)) {
                      var ze = Pt(u, !0), mr = O - L;
                      fi(u, ee, ze.top + (M === de ? mr : 0) + ke, ze.left + (M === de ? 0 : mr) + ke);
                    } else
                      fi(u, Ne);
                  hr(Me || ye ? $t : gr), Ir && B < 1 && Me || se(ot + (B === 1 && !ye ? Ge : 0));
                }
              }
              I && !De.tween && !Oe && !Vr && wt.restart(!0), s && (qe || te && B && (B < 1 || !gn)) && Nr(s.targets).forEach(function(fe) {
                return fe.classList[Me || te ? "add" : "remove"](s.className);
              }), a && !Ce && !f && a(l), st && !Oe ? (Ce && (le && (J === "complete" ? r.pause().totalProgress(1) : J === "reset" ? r.restart(!0).pause() : J === "restart" ? r.restart(!0) : r[J]()), a && a(l)), (qe || !gn) && (T && qe && vn(l, T), Be[ue] && vn(l, Be[ue]), te && (B === 1 ? l.kill(!1, 1) : Be[ue] = 0), qe || (ue = B === 1 ? 1 : 3, Be[ue] && vn(l, Be[ue]))), Ze && !Me && Math.abs(l.getVelocity()) > (Sr(Ze) ? Ze : 2500) && (Tr(l.callbackAnimation), z ? z.progress(1) : Tr(r, J === "reverse" ? 1 : !B, 1))) : Ce && a && !Oe && a(l);
            }
            if (Vt) {
              var lr = E ? O / E.duration() * (E._caScrollDist || 0) : O;
              Ct(lr + (We._isFlipped ? 1 : 0)), Vt(lr);
            }
            vr && vr(-O / E.duration() * (E._caScrollDist || 0));
          }
        }, l.enable = function(f, v) {
          l.enabled || (l.enabled = !0, _e(k, "resize", Or), _e(Ee ? j : k, "scroll", pr), he && _e(o, "refreshInit", he), f !== !1 && (l.progress = dt = 0, nt = ft = ut = U()), v !== !1 && l.refresh());
        }, l.getTween = function(f) {
          return f && De ? De.tween : z;
        }, l.setPositions = function(f, v) {
          u && (ot += f - L, Ge += v - f - Q, _ === ne && l.adjustPinSpacing(v - f - Q)), l.start = L = f, l.end = me = v, Q = v - f, l.update();
        }, l.adjustPinSpacing = function(f) {
          if ($e && f) {
            var v = $e.indexOf(M.d) + 1;
            $e[v] = parseFloat($e[v]) + f + ke, $e[1] = parseFloat($e[1]) + f + ke, hr($e);
          }
        }, l.disable = function(f, v) {
          if (l.enabled && (f !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, v || z && z.pause(), yt = 0, He && (He.uncache = 1), he && ve(o, "refreshInit", he), wt && (wt.pause(), De.tween && De.tween.kill() && (De.tween = 0)), !Ee)) {
            for (var x = P.length; x--; )
              if (P[x].scroller === k && P[x] !== l)
                return;
            ve(k, "resize", Or), ve(k, "scroll", pr);
          }
        }, l.kill = function(f, v) {
          l.disable(f, v), z && !v && z.kill(), d && delete Sn[d];
          var x = P.indexOf(l);
          x >= 0 && P.splice(x, 1), x === Le && nn > 0 && Le--, x = 0, P.forEach(function(O) {
            return O.scroller === l.scroller && (x = 1);
          }), x || rt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, f && r.revert({
            kill: !1
          }), v || r.kill()), it && [it, kt, We, c].forEach(function(O) {
            return O.parentNode && O.parentNode.removeChild(O);
          }), Pr === l && (Pr = 0), u && (He && (He.uncache = 1), x = 0, P.forEach(function(O) {
            return O.pin === u && x++;
          }), x || (He.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Lt && Lt(l), !r || !r.add || Q ? l.refresh() : h.delayedCall(0.01, function() {
          return L || me || l.refresh();
        }) && (Q = 0.01) && (L = me = 0), u && Oi();
      }, o.register = function(t) {
        return ar || (h = t || Zn(), Kn() && window.document && o.enable(), ar = yr), ar;
      }, o.defaults = function(t) {
        if (t)
          for (var r in t)
            Zr[r] = t[r];
        return Zr;
      }, o.disable = function(t, r) {
        yr = 0, P.forEach(function(a) {
          return a[r ? "kill" : "disable"](t);
        }), ve(A, "wheel", pr), ve(j, "scroll", pr), clearInterval($r), ve(j, "touchcancel", Tt), ve(ee, "touchstart", Tt), Qr(ve, j, "pointerdown,touchstart,mousedown", jn), Qr(ve, j, "pointerup,touchend,mouseup", Qn), Wr.kill(), Ur(ve);
        for (var i = 0; i < b.length; i += 3)
          Kr(ve, b[i], b[i + 1]), Kr(ve, b[i], b[i + 2]);
      }, o.enable = function() {
        if (A = window, j = document, gt = j.documentElement, ee = j.body, h && (Nr = h.utils.toArray, cr = h.utils.clamp, pn = h.core.context || Tt, dn = h.core.suppressOverwrites || Tt, hn = A.history.scrollRestoration || "auto", Cn = A.pageYOffset, h.core.globals("ScrollTrigger", o), ee)) {
          yr = 1, Si(), ae.register(h), o.isTouch = ae.isTouch, Bt = ae.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(A, "wheel", pr), Hn = [A, j, gt, ee], h.matchMedia ? (o.matchMedia = function(d) {
            var T = h.matchMedia(), Y;
            for (Y in d)
              T.add(Y, d[Y]);
            return T;
          }, h.addEventListener("matchMediaInit", function() {
            return kn();
          }), h.addEventListener("matchMediaRevert", function() {
            return li();
          }), h.addEventListener("matchMedia", function() {
            rr(0, 1), er("matchMedia");
          }), h.matchMedia("(orientation: portrait)", function() {
            return Tn(), Tn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), Tn(), _e(j, "scroll", pr);
          var t = ee.style, r = t.borderTopStyle, i = h.core.Animation.prototype, a, s;
          for (i.revert || Object.defineProperty(i, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", a = Pt(ee), de.m = Math.round(a.top + de.sc()) || 0, Ie.m = Math.round(a.left + Ie.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), $r = setInterval(oi, 250), h.delayedCall(0.5, function() {
            return Vr = 0;
          }), _e(j, "touchcancel", Tt), _e(ee, "touchstart", Tt), Qr(_e, j, "pointerdown,touchstart,mousedown", jn), Qr(_e, j, "pointerup,touchend,mouseup", Qn), fn = h.utils.checkPrefix("transform"), on.push(fn), ar = Fe(), Wr = h.delayedCall(0.2, rr).pause(), ur = [j, "visibilitychange", function() {
            var d = A.innerWidth, T = A.innerHeight;
            j.hidden ? (Wn = d, Nn = T) : (Wn !== d || Nn !== T) && Or();
          }, j, "DOMContentLoaded", rr, A, "load", rr, A, "resize", Or], Ur(_e), P.forEach(function(d) {
            return d.enable(0, 1);
          }), s = 0; s < b.length; s += 3)
            Kr(ve, b[s], b[s + 1]), Kr(ve, b[s], b[s + 2]);
        }
      }, o.config = function(t) {
        "limitCallbacks" in t && (gn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval($r) || ($r = r) && setInterval(oi, r), "ignoreMobileResize" in t && (qn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Ur(ve) || Ur(_e, t.autoRefreshEvents || "none"), $n = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, o.scrollerProxy = function(t, r) {
        var i = Qe(t), a = b.indexOf(i), s = Qt(i);
        ~a && b.splice(a, s ? 6 : 2), r && (s ? F.unshift(A, r, ee, r, gt, r) : F.unshift(i, r));
      }, o.clearMatchMedia = function(t) {
        P.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, o.isInViewport = function(t, r, i) {
        var a = (_t(t) ? Qe(t) : t).getBoundingClientRect(), s = a[i ? Kt : Zt] * r || 0;
        return i ? a.right - s > 0 && a.left + s < A.innerWidth : a.bottom - s > 0 && a.top + s < A.innerHeight;
      }, o.positionInViewport = function(t, r, i) {
        _t(t) && (t = Qe(t));
        var a = t.getBoundingClientRect(), s = a[i ? Kt : Zt], d = r == null ? s / 2 : r in Jr ? Jr[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
        return i ? (a.left + d) / A.innerWidth : (a.top + d) / A.innerHeight;
      }, o.killAll = function(t) {
        if (P.slice(0).forEach(function(i) {
          return i.vars.id !== "ScrollSmoother" && i.kill();
        }), t !== !0) {
          var r = Jt.killAll || [];
          Jt = {}, r.forEach(function(i) {
            return i();
          });
        }
      }, o;
    }();
    D.version = "3.11.5", D.saveStyles = function(o) {
      return o ? Nr(o).forEach(function(e) {
        if (e && e.style) {
          var n = tt.indexOf(e);
          n >= 0 && tt.splice(n, 5), tt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), h.core.getCache(e), pn());
        }
      }) : tt;
    }, D.revert = function(o, e) {
      return kn(!o, e);
    }, D.create = function(o, e) {
      return new D(o, e);
    }, D.refresh = function(o) {
      return o ? Or() : (ar || D.register()) && rr(!0);
    }, D.update = function(o) {
      return ++b.cache && Dt(o === !0 ? 2 : 0);
    }, D.clearScrollMemory = ai, D.maxScroll = function(o, e) {
      return Ht(o, e ? Ie : de);
    }, D.getScrollFunc = function(o, e) {
      return Xt(Qe(o), e ? Ie : de);
    }, D.getById = function(o) {
      return Sn[o];
    }, D.getAll = function() {
      return P.filter(function(o) {
        return o.vars.id !== "ScrollSmoother";
      });
    }, D.isScrolling = function() {
      return !!at;
    }, D.snapDirectional = xn, D.addEventListener = function(o, e) {
      var n = Jt[o] || (Jt[o] = []);
      ~n.indexOf(e) || n.push(e);
    }, D.removeEventListener = function(o, e) {
      var n = Jt[o], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, D.batch = function(o, e) {
      var n = [], t = {}, r = e.interval || 0.016, i = e.batchMax || 1e9, a = function(T, Y) {
        var X = [], g = [], u = h.delayedCall(r, function() {
          Y(X, g), X = [], g = [];
        }).pause();
        return function(_) {
          X.length || u.restart(!0), X.push(_.trigger), g.push(_), i <= X.length && u.progress(1);
        };
      }, s;
      for (s in e)
        t[s] = s.substr(0, 2) === "on" && Ye(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
      return Ye(i) && (i = i(), _e(D, "refresh", function() {
        return i = e.batchMax();
      })), Nr(o).forEach(function(d) {
        var T = {};
        for (s in t)
          T[s] = t[s];
        T.trigger = d, n.push(D.create(T));
      }), n;
    };
    var hi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Rn = function o(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ae.isTouch ? " pinch-zoom" : "") : "none", e === gt && o(ee, n);
    }, an = {
      auto: 1,
      scroll: 1
    }, Ii = function(e) {
      var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, a = i._gsap || h.core.getCache(i), s = Fe(), d;
      if (!a._isScrollT || s - a._isScrollT > 2e3) {
        for (; i && i !== ee && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(an[(d = vt(i)).overflowY] || an[d.overflowX])); )
          i = i.parentNode;
        a._isScroll = i && i !== t && !Qt(i) && (an[(d = vt(i)).overflowY] || an[d.overflowX]), a._isScrollT = s;
      }
      (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, gi = function(e, n, t, r) {
      return ae.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && Ii,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return t && _e(j, ae.eventTypes[0], vi, !1, !0);
        },
        onDisable: function() {
          return ve(j, ae.eventTypes[0], vi, !0);
        }
      });
    }, Li = /(input|label|select|textarea)/i, _i, vi = function(e) {
      var n = Li.test(e.target.tagName);
      (n || _i) && (e._gsapAllow = !0, _i = n);
    }, Fi = function(e) {
      jr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, a = n.onRelease, s, d, T = Qe(e.target) || gt, Y = h.core.globals().ScrollSmoother, X = Y && Y.get(), g = Bt && (e.content && Qe(e.content) || X && e.content !== !1 && !X.smooth() && X.content()), u = Xt(T, de), _ = Xt(T, Ie), $ = 1, ie = (ae.isTouch && A.visualViewport ? A.visualViewport.scale * A.visualViewport.width : A.outerWidth) / A.innerWidth, N = 0, Ke = Ye(r) ? function() {
        return r(s);
      } : function() {
        return r || 2.8;
      }, te, I, Pe = gi(T, e.type, !0, i), oe = function() {
        return I = !1;
      }, E = Tt, Ze = Tt, mt = function() {
        d = Ht(T, de), Ze = cr(Bt ? 1 : 0, d), t && (E = cr(0, Ht(T, Ie))), te = tr;
      }, M = function() {
        g._gsap.y = xr(parseFloat(g._gsap.y) + u.offset) + "px", g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
      }, Ce = function() {
        if (I) {
          requestAnimationFrame(oe);
          var pe = xr(s.deltaY / 2), ce = Ze(u.v - pe);
          if (g && ce !== u.v + u.offset) {
            u.offset = ce - u.v;
            var l = xr((parseFloat(g && g._gsap.y) || 0) - u.offset);
            g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", g._gsap.y = l + "px", u.cacheID = b.cache, Dt();
          }
          return !0;
        }
        u.offset && M(), I = !0;
      }, k, zt, Ee, Xe, Be = function() {
        mt(), k.isActive() && k.vars.scrollY > d && (u() > d ? k.progress(1) && u(d) : k.resetTo("scrollY", d));
      };
      return g && h.set(g, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Bt && G.type === "touchmove" && Ce() || $ > 1.05 && G.type !== "touchstart" || s.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        I = !1;
        var G = $;
        $ = xr((A.visualViewport && A.visualViewport.scale || 1) / ie), k.pause(), G !== $ && Rn(T, $ > 1.01 ? !0 : t ? !1 : "x"), zt = _(), Ee = u(), mt(), te = tr;
      }, e.onRelease = e.onGestureStart = function(G, pe) {
        if (u.offset && M(), !pe)
          Xe.restart(!0);
        else {
          b.cache++;
          var ce = Ke(), l, he;
          t && (l = _(), he = l + ce * 0.05 * -G.velocityX / 0.227, ce *= hi(_, l, he, Ht(T, Ie)), k.vars.scrollX = E(he)), l = u(), he = l + ce * 0.05 * -G.velocityY / 0.227, ce *= hi(u, l, he, Ht(T, de)), k.vars.scrollY = Ze(he), k.invalidate().duration(ce).play(0.01), (Bt && k.vars.scrollY >= d || l >= d - 1) && h.to({}, {
            onUpdate: Be,
            duration: ce
          });
        }
        a && a(G);
      }, e.onWheel = function() {
        k._ts && k.pause(), Fe() - N > 1e3 && (te = 0, N = Fe());
      }, e.onChange = function(G, pe, ce, l, he) {
        if (tr !== te && mt(), pe && t && _(E(l[2] === pe ? zt + (G.startX - G.x) : _() + pe - l[1])), ce) {
          u.offset && M();
          var nr = he[2] === ce, Wt = nr ? Ee + G.startY - G.y : u() + ce - he[1], ut = Ze(Wt);
          nr && Wt !== ut && (Ee += ut - Wt), u(ut);
        }
        (ce || pe) && Dt();
      }, e.onEnable = function() {
        Rn(T, t ? !1 : "x"), D.addEventListener("refresh", Be), _e(A, "resize", Be), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = _.smooth = !1), Pe.enable();
      }, e.onDisable = function() {
        Rn(T, !0), ve(A, "resize", Be), D.removeEventListener("refresh", Be), Pe.kill();
      }, e.lockAxis = e.lockAxis !== !1, s = new ae(e), s.iOS = Bt, Bt && !u() && u(1), Bt && h.ticker.add(Tt), Xe = s._dc, k = h.to(s, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: di(u, u(), function() {
            return k.pause();
          })
        },
        onUpdate: Dt,
        onComplete: Xe.vars.onComplete
      }), s;
    };
    D.sort = function(o) {
      return P.sort(o || function(e, n) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
      });
    }, D.observe = function(o) {
      return new ae(o);
    }, D.normalizeScroll = function(o) {
      if (typeof o > "u")
        return et;
      if (o === !0 && et)
        return et.enable();
      if (o === !1)
        return et && et.kill();
      var e = o instanceof ae ? o : Fi(o);
      return et && et.target === e.target && et.kill(), Qt(e.target) && (et = e), e;
    }, D.core = {
      _getVelocityProp: un,
      _inputObserver: gi,
      _scrollers: b,
      _proxies: F,
      bridge: {
        ss: function() {
          at || er("scrollStart"), at = Fe();
        },
        ref: function() {
          return Oe;
        }
      }
    }, Zn() && h.registerPlugin(D), m.ScrollTrigger = D, m.default = D, typeof window > "u" || window !== m ? Object.defineProperty(m, "__esModule", { value: !0 }) : delete window.default;
  });
})(In, In.exports);
var yi = In.exports;
Ve.registerPlugin(yi.ScrollTrigger);
class xi extends br {
  static create(p, m = {}, K = {}) {
    return new xi(p, m, K);
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
  constructor(p, m = {}, K = {}) {
    super(
      (W) => {
        var Yt, Te;
        Object.assign(W.meta, {
          speed: 1,
          velocity: 0,
          direction: "ltr",
          ...m
        }), W.meta.scrollTrigger = yi.ScrollTrigger.create({});
        let w = null;
        typeof p == "string" ? w = document.querySelector(p) : p instanceof HTMLElement && (w = p);
        const re = m.createDOMContainers != null ? m.createDOMContainers : !0, C = re ? document.createElement("div") : w == null ? void 0 : w.querySelector(".owow-marquee-outer");
        C == null || C.classList.add("owow-marquee-outer");
        const H = re ? document.createElement("div") : C == null ? void 0 : C.querySelector(".owow-marquee-inner");
        if (H == null || H.classList.add("owow-marquee-inner"), !w || !C || !H)
          throw console.error({
            targetContainer: w,
            outerContainer: C,
            innerContainer: H
          }), new Error("Invalid marquee DOM structure");
        W.meta.sourceDOM = w.cloneNode(!0), W.meta.target = w, H.append(...w.childNodes), C.append(H), w == null || w.append(C), Ve.set(H, { display: "inline-flex" });
        const ge = w.getBoundingClientRect(), Ae = H.getBoundingClientRect(), pt = ge.width + Ae.width, Ue = document.createDocumentFragment(), je = [];
        let Rt = Ae.width;
        if (!pt || !Rt)
          return;
        for (; Rt <= pt; ) {
          const V = H.cloneNode(!0);
          Rt += Ae.width, je.push(V);
        }
        Ue.append(...je), C.append(Ue);
        const Je = Ve.context(() => {
          Ve.set(C, {
            x: 0,
            force3D: !0,
            width: Rt,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Re = Ve.utils.pipe(
          (V) => Math.floor(V * 1e3) / 1e3,
          Ve.quickSetter(C, "x", "px")
        ), Ot = Ve.utils.wrap(0, -Ae.width), Ut = Ve.utils.normalize(0, -Ae.width);
        let xt, ht, b, F, Se, lt, Ft;
        const St = Ve.ticker.add(() => {
          var V, jt;
          switch (ht = W.meta.velocity != null ? W.meta.scrollTrigger.getVelocity() ?? 0 : 0, b = ht * W.meta.velocity, W.meta.direction) {
            case "ltr":
              xt = -1, b = -Math.abs(b);
              break;
            case "rtl":
              xt = 1, b = Math.abs(b);
              break;
            case "scroll":
              xt = W.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              xt = -(W.meta.scrollTrigger.direction ?? 1), b = -b;
          }
          F = Ve.getProperty(C, "x"), Se = W.meta.speed * -xt, lt = (Se - b) * Ve.ticker.deltaRatio(), Ft = Ot(F + lt), Re(Ft), (jt = (V = W.meta).onUpdate) == null || jt.call(V, Ut(Ft));
        });
        return (Te = (Yt = W.meta).onCreated) == null || Te.call(Yt), () => {
          var V;
          for (Je.kill(!0), Ve.ticker.remove(St), w == null || w.replaceWith(W.meta.sourceDOM); je.length; )
            (V = je.pop()) == null || V.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...K
      }
    );
  }
}
export {
  xi as Marquee,
  br as Motion,
  Dn as Pointer
};
