var Yi = Object.defineProperty;
var Xi = (y, h, g) => h in y ? Yi(y, h, { enumerable: !0, configurable: !0, writable: !0, value: g }) : y[h] = g;
var B = (y, h, g) => (Xi(y, typeof h != "symbol" ? h + "" : h, g), g);
import { fromEvent as An, debounceTime as Bi, Observable as Hi } from "rxjs";
import Ve from "gsap";
var Yr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wi(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var Ni = "Expected a function", mi = 0 / 0, Gi = "[object Symbol]", $i = /^\s+|\s+$/g, qi = /^[-+]0x[0-9a-f]+$/i, Ui = /^0b[01]+$/i, Vi = /^0o[0-7]+$/i, ji = parseInt, Qi = typeof Yr == "object" && Yr && Yr.Object === Object && Yr, Ki = typeof self == "object" && self && self.Object === Object && self, Zi = Qi || Ki || Function("return this")(), Ji = Object.prototype, eo = Ji.toString, to = Math.max, ro = Math.min, Dn = function() {
  return Zi.Date.now();
};
function no(y, h, g) {
  var ee, ke, S, F, R, se, K = 0, at = !1, gt = !1, Ce = !0;
  if (typeof y != "function")
    throw new TypeError(Ni);
  h = wi(h) || 0, zn(g) && (at = !!g.leading, gt = "maxWait" in g, S = gt ? to(wi(g.maxWait) || 0, h) : S, Ce = "trailing" in g ? !!g.trailing : Ce);
  function je(H) {
    var Re = ee, ct = ke;
    return ee = ke = void 0, K = H, F = y.apply(ct, Re), F;
  }
  function ir(H) {
    return K = H, R = setTimeout(Tt, h), at ? je(H) : F;
  }
  function et(H) {
    var Re = H - se, ct = H - K, or = h - Re;
    return gt ? ro(or, S - ct) : or;
  }
  function Ee(H) {
    var Re = H - se, ct = H - K;
    return se === void 0 || Re >= h || Re < 0 || gt && ct >= S;
  }
  function Tt() {
    var H = Dn();
    if (Ee(H))
      return ze(H);
    R = setTimeout(Tt, et(H));
  }
  function ze(H) {
    return R = void 0, Ce && ee ? je(H) : (ee = ke = void 0, F);
  }
  function kt() {
    R !== void 0 && clearTimeout(R), K = 0, ee = se = ke = R = void 0;
  }
  function Me() {
    return R === void 0 ? F : ze(Dn());
  }
  function k() {
    var H = Dn(), Re = Ee(H);
    if (ee = arguments, ke = this, se = H, Re) {
      if (R === void 0)
        return ir(se);
      if (gt)
        return R = setTimeout(Tt, h), je(se);
    }
    return R === void 0 && (R = setTimeout(Tt, h)), F;
  }
  return k.cancel = kt, k.flush = Me, k;
}
function zn(y) {
  var h = typeof y;
  return !!y && (h == "object" || h == "function");
}
function io(y) {
  return !!y && typeof y == "object";
}
function oo(y) {
  return typeof y == "symbol" || io(y) && eo.call(y) == Gi;
}
function wi(y) {
  if (typeof y == "number")
    return y;
  if (oo(y))
    return mi;
  if (zn(y)) {
    var h = typeof y.valueOf == "function" ? y.valueOf() : y;
    y = zn(h) ? h + "" : h;
  }
  if (typeof y != "string")
    return y === 0 ? y : +y;
  y = y.replace($i, "");
  var g = Ui.test(y);
  return g || Vi.test(y) ? ji(y.slice(2), g ? 2 : 8) : qi.test(y) ? mi : +y;
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
  constructor(h, g = {}) {
    B(this, "mediaQueryList");
    B(this, "motionResizeObserver");
    B(this, "meta", {});
    B(this, "subscriptions", []);
    B(this, "create");
    B(this, "cleanup");
    /**
     * Runs the cleanup function and resets this Motion instance.
     */
    B(this, "reset", lo(
      () => {
        var h;
        (h = this.cleanup) == null || h.call(this), requestAnimationFrame(() => {
          var g;
          this.cleanup = ((g = this.create) == null ? void 0 : g.call(this, this)) ?? void 0;
        });
      },
      Ln.resetDebounceTime,
      { leading: !0 }
    ));
    /**
     * Runs the cleanup function and makes this instance elegible for garbage collection.
     */
    B(this, "destroy", () => {
      var h, g;
      for ((h = this.cleanup) == null || h.call(this), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0; this.subscriptions.length; )
        (g = this.subscriptions.pop()) == null || g.unsubscribe();
    });
    this.observeMedia(g.watchMedia), this.observeResize(g.shouldResetOnResize), this.create = () => {
      var S, F;
      return [((S = g.enable) == null ? void 0 : S.call(g)) ?? !0, ((F = this.mediaQueryList) == null ? void 0 : F.matches) ?? !0].every(
        Boolean
      ) ? h(this) : void 0;
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
  static applyDeltaRatio(h) {
    return h * Ve.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(h) {
    h && (this.mediaQueryList = matchMedia(h), this.subscriptions.push(An(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(h) {
    h && (this.motionResizeObserver = new ao(h), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Bi(500)).subscribe(() => this.reset())
    ));
  }
};
let vr = Ln;
B(vr, "resetDebounceTime", 100), /** Target framerate */
B(vr, "referenceFramerate", 60);
class ao {
  constructor(h) {
    B(this, "axis");
    B(this, "element");
    B(this, "inlineSize");
    B(this, "blockSize");
    B(this, "observable");
    const [g, ee] = [h].flat();
    this.element = typeof g == "string" ? document.querySelector(g) : g, this.axis = ee, this.observable = new Hi((ke) => {
      const S = new ResizeObserver(
        (F) => this.handleResize(F, ke)
      );
      return this.element && S.observe(this.element), () => S.disconnect();
    });
  }
  handleResize(h, g) {
    const ee = h.find((K) => K.target === this.element);
    if (!ee)
      return;
    const { inlineSize: ke, blockSize: S } = ee.borderBoxSize[0], F = ke !== this.inlineSize, R = S !== this.blockSize, se = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = ke, this.blockSize = S, !se) {
      if (this.axis === "horizontal" && F || this.axis === "vertical" && R)
        return g.next();
      !this.axis && (F || R) && g.next();
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
    B(this, "viewWidth", window.innerWidth);
    /** Window inner height */
    B(this, "viewHeight", window.innerHeight);
    /** Pointer absolute x position */
    B(this, "clientX", this.viewWidth / 2);
    /** Pointer absolute y position */
    B(this, "clientY", this.viewHeight / 2);
    /** Pointer normalized x position (0 to 1) */
    B(this, "normalX", 0.5);
    /** Pointer normalized y position (0 to 1)*/
    B(this, "normalY", 0.5);
    B(this, "observable", An(window, "mousemove"));
    /**
     * Internal motion instance
     */
    B(this, "motion", new vr(
      (h) => {
        h.subscriptions.push(
          this.observable.subscribe((g) => {
            this.clientX = g.clientX, this.clientY = g.clientY, this.normalX = Ve.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Ve.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), h.subscriptions.push(
          An(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), h.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ));
    /**
     * Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
     * Note that referencing `Pointer.instance` will create a new instance.
     */
    B(this, "destroy", () => {
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
let On = Fn;
B(On, "_instance");
var In = { exports: {} };
(function(y, h) {
  (function(g, ee) {
    ee(h);
  })(Yr, function(g) {
    function ee(o, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(o, t.key, t);
      }
    }
    function ke(o, e, n) {
      return e && ee(o.prototype, e), n && ee(o, n), o;
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
    var S, F, R, se, K, at, gt, Ce, je, ir, et, Ee, Tt, ze = function() {
      return S || typeof window < "u" && (S = window.gsap) && S.registerPlugin && S;
    }, kt = 1, Me = [], k = [], H = [], Re = Date.now, ct = function(e, n) {
      return n;
    }, or = function() {
      var e = je.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, k), r.push.apply(r, H), k = t, H = r, ct = function(a, s) {
        return n[a](s);
      };
    }, _t = function(e, n) {
      return ~H.indexOf(e) && H[H.indexOf(e) + 1][n];
    }, br = function(e) {
      return !!~ir.indexOf(e);
    }, Qe = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, Ie = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Xr = "scrollLeft", Br = "scrollTop", cn = function() {
      return et && et.isPressed || k.cache++;
    }, Hr = function(e, n) {
      var t = function r(i) {
        if (i || i === 0) {
          kt && (R.history.scrollRestoration = "manual");
          var a = et && et.isPressed;
          i = r.v = Math.round(i) || (et && et.iOS ? 1 : 0), e(i), r.cacheID = k.cache, a && ct("ss", i);
        } else
          (n || k.cache !== r.cacheID || ct("ref")) && (r.cacheID = k.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Le = {
      s: Xr,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Hr(function(o) {
        return arguments.length ? R.scrollTo(o, fe.sc()) : R.pageXOffset || se[Xr] || K[Xr] || at[Xr] || 0;
      })
    }, fe = {
      s: Br,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Le,
      sc: Hr(function(o) {
        return arguments.length ? R.scrollTo(Le.sc(), o) : R.pageYOffset || se[Br] || K[Br] || at[Br] || 0;
      })
    }, Ke = function(e) {
      return S.utils.toArray(e)[0] || (typeof e == "string" && S.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Ft = function(e, n) {
      var t = n.s, r = n.sc;
      br(e) && (e = se.scrollingElement || K);
      var i = k.indexOf(e), a = r === fe.sc ? 1 : 2;
      !~i && (i = k.push(e) - 1), k[i + a] || e.addEventListener("scroll", cn);
      var s = k[i + a], d = s || (k[i + a] = Hr(_t(e, t), !0) || (br(e) ? r : Hr(function(x) {
        return arguments.length ? e[t] = x : e[t];
      })));
      return d.target = e, s || (d.smooth = S.getProperty(e, "scrollBehavior") === "smooth"), d;
    }, un = function(e, n, t) {
      var r = e, i = e, a = Re(), s = a, d = n || 50, x = Math.max(500, d * 3), Y = function(v, $) {
        var re = Re();
        $ || re - a > d ? (i = r, r = v, s = a, a = re) : t ? r += v : r = i + (v - i) / (re - s) * (a - s);
      }, X = function() {
        i = r = t ? 0 : r, s = a = 0;
      }, _ = function(v) {
        var $ = s, re = i, N = Re();
        return (v || v === 0) && v !== r && Y(v), a === s || N - s > x ? 0 : (r + (t ? re : -re)) / ((t ? N : a) - $) * 1e3;
      };
      return {
        update: Y,
        reset: X,
        getVelocity: _
      };
    }, mr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Yn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Xn = function() {
      je = S.core.globals().ScrollTrigger, je && je.core && or();
    }, Bn = function(e) {
      return S = e || ze(), S && typeof document < "u" && document.body && (R = window, se = document, K = se.documentElement, at = se.body, ir = [R, se, K, at], S.utils.clamp, Tt = S.core.context || function() {
      }, Ce = "onpointerenter" in at ? "pointer" : "mouse", gt = le.isTouch = R.matchMedia && R.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in R || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ee = le.eventTypes = ("ontouchstart" in K ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in K ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return kt = 0;
      }, 500), Xn(), F = 1), F;
    };
    Le.op = fe, k.cache = 0;
    var le = function() {
      function o(n) {
        this.init(n);
      }
      var e = o.prototype;
      return e.init = function(t) {
        F || Bn(S) || console.warn("Please gsap.registerPlugin(Observer)"), je || Xn();
        var r = t.tolerance, i = t.dragMinimum, a = t.type, s = t.target, d = t.lineHeight, x = t.debounce, Y = t.preventDefault, X = t.onStop, _ = t.onStopDelay, u = t.ignore, v = t.wheelSpeed, $ = t.event, re = t.onDragStart, N = t.onDragEnd, Ze = t.onDrag, J = t.onPress, I = t.onRelease, De = t.onRight, ne = t.onLeft, C = t.onUp, Je = t.onDown, wt = t.onChangeX, E = t.onChangeY, xe = t.onChange, T = t.onToggleX, At = t.onToggleY, Se = t.onHover, Be = t.onHoverEnd, He = t.onMove, G = t.ignoreCheck, de = t.isNormalizer, ae = t.onGestureStart, l = t.onGestureEnd, pe = t.onWheel, Jt = t.onEnable, Bt = t.onDisable, dt = t.onClick, Ht = t.scrollSpeed, q = t.capture, Oe = t.allowClicks, We = t.lockAxis, Dr = t.onLockAxis;
        this.target = s = Ke(s) || K, this.vars = t, u && (u = S.utils.toArray(u)), r = r || 1e-9, i = i || 0, v = v || 1, Ht = Ht || 1, a = a || "wheel,touch,pointer", x = x !== !1, d || (d = parseFloat(R.getComputedStyle(at).lineHeight) || 22);
        var it, pt, L, _e, ot, Et, Ne, c = this, zt = 0, V = 0, Wt = Ft(s, Le), Nt = Ft(s, fe), pr = Wt(), Ge = Nt(), Or = ~a.indexOf("touch") && !~a.indexOf("pointer") && Ee[0] === "pointerdown", Gt = br(s), ie = s.ownerDocument || se, st = [0, 0, 0], $e = [0, 0, 0], Ar = 0, qe = function() {
          return Ar = Re();
        }, Mt = function(m, f) {
          return (c.event = m) && u && ~u.indexOf(m.target) || f && Or && m.pointerType !== "touch" || G && G(m, f);
        }, zr = function() {
          c._vx.reset(), c._vy.reset(), pt.pause(), X && X(c);
        }, $t = function() {
          var m = c.deltaX = Yn(st), f = c.deltaY = Yn($e), b = Math.abs(m) >= r, w = Math.abs(f) >= r;
          xe && (b || w) && xe(c, m, f, st, $e), b && (De && c.deltaX > 0 && De(c), ne && c.deltaX < 0 && ne(c), wt && wt(c), T && c.deltaX < 0 != zt < 0 && T(c), zt = c.deltaX, st[0] = st[1] = st[2] = 0), w && (Je && c.deltaY > 0 && Je(c), C && c.deltaY < 0 && C(c), E && E(c), At && c.deltaY < 0 != V < 0 && At(c), V = c.deltaY, $e[0] = $e[1] = $e[2] = 0), (_e || L) && (He && He(c), L && (Ze(c), L = !1), _e = !1), Et && !(Et = !1) && Dr && Dr(c), ot && (pe(c), ot = !1), it = 0;
        }, hr = function(m, f, b) {
          st[b] += m, $e[b] += f, c._vx.update(m), c._vy.update(f), x ? it || (it = requestAnimationFrame($t)) : $t();
        }, er = function(m, f) {
          We && !Ne && (c.axis = Ne = Math.abs(m) > Math.abs(f) ? "x" : "y", Et = !0), Ne !== "y" && (st[2] += m, c._vx.update(m, !0)), Ne !== "x" && ($e[2] += f, c._vy.update(f, !0)), x ? it || (it = requestAnimationFrame($t)) : $t();
        }, tr = function(m) {
          if (!Mt(m, 1)) {
            m = mr(m, Y);
            var f = m.clientX, b = m.clientY, w = f - c.x, P = b - c.y, ve = c.isDragging;
            c.x = f, c.y = b, (ve || Math.abs(c.startX - f) >= i || Math.abs(c.startY - b) >= i) && (Ze && (L = !0), ve || (c.isDragging = !0), er(w, P), ve || re && re(c));
          }
        }, A = c.onPress = function(M) {
          Mt(M, 1) || M && M.button || (c.axis = Ne = null, pt.pause(), c.isPressed = !0, M = mr(M), zt = V = 0, c.startX = c.x = M.clientX, c.startY = c.y = M.clientY, c._vx.reset(), c._vy.reset(), Qe(de ? s : ie, Ee[1], tr, Y, !0), c.deltaX = c.deltaY = 0, J && J(c));
        }, It = c.onRelease = function(M) {
          if (!Mt(M, 1)) {
            Ie(de ? s : ie, Ee[1], tr, !0);
            var m = !isNaN(c.y - c.startY), f = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), b = mr(M);
            !f && m && (c._vx.reset(), c._vy.reset(), Y && Oe && S.delayedCall(0.08, function() {
              if (Re() - Ar > 300 && !M.defaultPrevented) {
                if (M.target.click)
                  M.target.click();
                else if (ie.createEvent) {
                  var w = ie.createEvent("MouseEvents");
                  w.initMouseEvent("click", !0, !0, R, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), M.target.dispatchEvent(w);
                }
              }
            })), c.isDragging = c.isGesturing = c.isPressed = !1, X && !de && pt.restart(!0), N && f && N(c), I && I(c, f);
          }
        }, yt = function(m) {
          return m.touches && m.touches.length > 1 && (c.isGesturing = !0) && ae(m, c.isDragging);
        }, xt = function() {
          return (c.isGesturing = !1) || l(c);
        }, ht = function(m) {
          if (!Mt(m)) {
            var f = Wt(), b = Nt();
            hr((f - pr) * Ht, (b - Ge) * Ht, 1), pr = f, Ge = b, X && pt.restart(!0);
          }
        }, St = function(m) {
          if (!Mt(m)) {
            m = mr(m, Y), pe && (ot = !0);
            var f = (m.deltaMode === 1 ? d : m.deltaMode === 2 ? R.innerHeight : 1) * v;
            hr(m.deltaX * f, m.deltaY * f, 0), X && !de && pt.restart(!0);
          }
        }, rr = function(m) {
          if (!Mt(m)) {
            var f = m.clientX, b = m.clientY, w = f - c.x, P = b - c.y;
            c.x = f, c.y = b, _e = !0, (w || P) && er(w, P);
          }
        }, gr = function(m) {
          c.event = m, Se(c);
        }, Lt = function(m) {
          c.event = m, Be(c);
        }, Ir = function(m) {
          return Mt(m) || mr(m, Y) && dt(c);
        };
        pt = c._dc = S.delayedCall(_ || 0.25, zr).pause(), c.deltaX = c.deltaY = 0, c._vx = un(0, 50, !0), c._vy = un(0, 50, !0), c.scrollX = Wt, c.scrollY = Nt, c.isDragging = c.isGesturing = c.isPressed = !1, Tt(this), c.enable = function(M) {
          return c.isEnabled || (Qe(Gt ? ie : s, "scroll", cn), a.indexOf("scroll") >= 0 && Qe(Gt ? ie : s, "scroll", ht, Y, q), a.indexOf("wheel") >= 0 && Qe(s, "wheel", St, Y, q), (a.indexOf("touch") >= 0 && gt || a.indexOf("pointer") >= 0) && (Qe(s, Ee[0], A, Y, q), Qe(ie, Ee[2], It), Qe(ie, Ee[3], It), Oe && Qe(s, "click", qe, !1, !0), dt && Qe(s, "click", Ir), ae && Qe(ie, "gesturestart", yt), l && Qe(ie, "gestureend", xt), Se && Qe(s, Ce + "enter", gr), Be && Qe(s, Ce + "leave", Lt), He && Qe(s, Ce + "move", rr)), c.isEnabled = !0, M && M.type && A(M), Jt && Jt(c)), c;
        }, c.disable = function() {
          c.isEnabled && (Me.filter(function(M) {
            return M !== c && br(M.target);
          }).length || Ie(Gt ? ie : s, "scroll", cn), c.isPressed && (c._vx.reset(), c._vy.reset(), Ie(de ? s : ie, Ee[1], tr, !0)), Ie(Gt ? ie : s, "scroll", ht, q), Ie(s, "wheel", St, q), Ie(s, Ee[0], A, q), Ie(ie, Ee[2], It), Ie(ie, Ee[3], It), Ie(s, "click", qe, !0), Ie(s, "click", Ir), Ie(ie, "gesturestart", yt), Ie(ie, "gestureend", xt), Ie(s, Ce + "enter", gr), Ie(s, Ce + "leave", Lt), Ie(s, Ce + "move", rr), c.isEnabled = c.isPressed = c.isDragging = !1, Bt && Bt(c));
        }, c.kill = c.revert = function() {
          c.disable();
          var M = Me.indexOf(c);
          M >= 0 && Me.splice(M, 1), et === c && (et = 0);
        }, Me.push(c), de && br(s) && (et = c), c.enable($);
      }, ke(o, [{
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
    le.version = "3.11.5", le.create = function(o) {
      return new le(o);
    }, le.register = Bn, le.getAll = function() {
      return Me.slice();
    }, le.getById = function(o) {
      return Me.filter(function(e) {
        return e.vars.id === o;
      })[0];
    }, ze() && S.registerPlugin(le);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var p, sr, z, U, vt, Z, Hn, Wr, Nr, lr, Gr, $r, Pe, qr, fn, Fe, Wn, Nn, ar, Gn, dn, $n, tt, qn, Un, Vn, Yt, pn, hn, gn, Ur = 1, Ye = Date.now, _n = Ye(), ut = 0, wr = 0, Si = function o() {
      return wr && requestAnimationFrame(o);
    }, jn = function() {
      return qr = 1;
    }, Qn = function() {
      return qr = 0;
    }, Ct = function(e) {
      return e;
    }, yr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Kn = function() {
      return typeof window < "u";
    }, Zn = function() {
      return p || Kn() && (p = window.gsap) && p.registerPlugin && p;
    }, qt = function(e) {
      return !!~Hn.indexOf(e);
    }, Jn = function(e) {
      return _t(e, "getBoundingClientRect") || (qt(e) ? function() {
        return ln.width = z.innerWidth, ln.height = z.innerHeight, ln;
      } : function() {
        return Dt(e);
      });
    }, Ti = function(e, n, t) {
      var r = t.d, i = t.d2, a = t.a;
      return (a = _t(e, "getBoundingClientRect")) ? function() {
        return a()[r];
      } : function() {
        return (n ? z["inner" + i] : e["client" + i]) || 0;
      };
    }, ki = function(e, n) {
      return !n || ~H.indexOf(e) ? Jn(e) : function() {
        return ln;
      };
    }, Xt = function(e, n) {
      var t = n.s, r = n.d2, i = n.d, a = n.a;
      return Math.max(0, (t = "scroll" + r) && (a = _t(e, t)) ? a() - Jn(e)()[i] : qt(e) ? (vt[t] || Z[t]) - (z["inner" + r] || vt["client" + r] || Z["client" + r]) : e[t] - e["offset" + r]);
    }, Vr = function(e, n) {
      for (var t = 0; t < ar.length; t += 3)
        (!n || ~n.indexOf(ar[t + 1])) && e(ar[t], ar[t + 1], ar[t + 2]);
    }, bt = function(e) {
      return typeof e == "string";
    }, Xe = function(e) {
      return typeof e == "function";
    }, xr = function(e) {
      return typeof e == "number";
    }, jr = function(e) {
      return typeof e == "object";
    }, Sr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, vn = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, cr = Math.abs, ei = "left", ti = "top", bn = "right", mn = "bottom", Ut = "width", Vt = "height", Tr = "Right", kr = "Left", Cr = "Top", Er = "Bottom", te = "padding", ft = "margin", ur = "Width", wn = "Height", ye = "px", mt = function(e) {
      return z.getComputedStyle(e);
    }, Ci = function(e) {
      var n = mt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ri = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Dt = function(e, n) {
      var t = n && mt(e)[fn] !== "matrix(1, 0, 0, 1, 0, 0)" && p.to(e, {
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
        return p.utils.snap(ni(e), n);
      };
    }, xn = function(e) {
      var n = p.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, i) {
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
    }, he = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, ge = function(e, n, t, r) {
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
      if (bt(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in Jr ? Jr[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, tn = function(e, n, t, r, i, a, s, d) {
      var x = i.startColor, Y = i.endColor, X = i.fontSize, _ = i.indent, u = i.fontWeight, v = U.createElement("div"), $ = qt(t) || _t(t, "pinType") === "fixed", re = e.indexOf("scroller") !== -1, N = $ ? Z : t, Ze = e.indexOf("start") !== -1, J = Ze ? x : Y, I = "border-color:" + J + ";font-size:" + X + ";color:" + J + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return I += "position:" + ((re || d) && $ ? "fixed;" : "absolute;"), (re || d || !$) && (I += (r === fe ? bn : mn) + ":" + (a + parseFloat(_)) + "px;"), s && (I += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), v._isStart = Ze, v.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), v.style.cssText = I, v.innerText = n || n === 0 ? e + "-" + n : e, N.children[0] ? N.insertBefore(v, N.children[0]) : N.appendChild(v), v._offset = v["offset" + r.op.d2], rn(v, 0, r, Ze), v;
    }, rn = function(e, n, t, r) {
      var i = {
        display: "block"
      }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
      e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + a + ur] = 1, i["border" + s + ur] = 0, i[t.p] = n + "px", p.set(e, i);
    }, D = [], Sn = {}, Mr, oi = function() {
      return Ye() - ut > 34 && (Mr || (Mr = requestAnimationFrame(Ot)));
    }, fr = function() {
      (!tt || !tt.isPressed || tt.startX > Z.clientWidth) && (k.cache++, tt ? Mr || (Mr = requestAnimationFrame(Ot)) : Ot(), ut || Qt("scrollStart"), ut = Ye());
    }, Tn = function() {
      Vn = z.innerWidth, Un = z.innerHeight;
    }, Rr = function() {
      k.cache++, !Pe && !$n && !U.fullscreenElement && !U.webkitFullscreenElement && (!qn || Vn !== z.innerWidth || Math.abs(z.innerHeight - Un) > z.innerHeight * 0.25) && Wr.restart(!0);
    }, jt = {}, Ri = [], si = function o() {
      return ge(O, "scrollEnd", o) || Zt(!0);
    }, Qt = function(e) {
      return jt[e] && jt[e].map(function(n) {
        return n();
      }) || Ri;
    }, rt = [], li = function(e) {
      for (var n = 0; n < rt.length; n += 5)
        (!e || rt[n + 4] && rt[n + 4].query === e) && (rt[n].style.cssText = rt[n + 1], rt[n].getBBox && rt[n].setAttribute("transform", rt[n + 2] || ""), rt[n + 3].uncache = 1);
    }, kn = function(e, n) {
      var t;
      for (Fe = 0; Fe < D.length; Fe++)
        t = D[Fe], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || Qt("revert");
    }, ai = function(e, n) {
      k.cache++, (n || !nt) && k.forEach(function(t) {
        return Xe(t) && t.cacheID++ && (t.rec = 0);
      }), bt(e) && (z.history.scrollRestoration = hn = e);
    }, nt, Kt = 0, ci, Pi = function() {
      if (ci !== Kt) {
        var e = ci = Kt;
        requestAnimationFrame(function() {
          return e === Kt && Zt(!0);
        });
      }
    }, Zt = function(e, n) {
      if (ut && !e) {
        he(O, "scrollEnd", si);
        return;
      }
      nt = O.isRefreshing = !0, k.forEach(function(r) {
        return Xe(r) && r.cacheID++ && (r.rec = r());
      });
      var t = Qt("refreshInit");
      Gn && O.sort(), n || kn(), k.forEach(function(r) {
        Xe(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
      }), D.slice(0).forEach(function(r) {
        return r.refresh();
      }), D.forEach(function(r, i) {
        if (r._subPinOffset && r.pin) {
          var a = r.vars.horizontal ? "offsetWidth" : "offsetHeight", s = r.pin[a];
          r.revert(!0, 1), r.adjustPinSpacing(r.pin[a] - s), r.refresh();
        }
      }), D.forEach(function(r) {
        return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, Xt(r.scroller, r._dir)));
      }), t.forEach(function(r) {
        return r && r.render && r.render(-1);
      }), k.forEach(function(r) {
        Xe(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), ai(hn, 1), Wr.pause(), Kt++, nt = 2, Ot(2), D.forEach(function(r) {
        return Xe(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), nt = O.isRefreshing = !1, Qt("refresh");
    }, Cn = 0, nn = 1, Pr, Ot = function(e) {
      if (!nt || e === 2) {
        O.isUpdating = !0, Pr && Pr.update(0);
        var n = D.length, t = Ye(), r = t - _n >= 50, i = n && D[0].scroll();
        if (nn = Cn > i ? -1 : 1, nt || (Cn = i), r && (ut && !qr && t - ut > 200 && (ut = 0, Qt("scrollEnd")), Gr = _n, _n = t), nn < 0) {
          for (Fe = n; Fe-- > 0; )
            D[Fe] && D[Fe].update(0, r);
          nn = 1;
        } else
          for (Fe = 0; Fe < n; Fe++)
            D[Fe] && D[Fe].update(0, r);
        O.isUpdating = !1;
      }
      Mr = 0;
    }, En = [ei, ti, mn, bn, ft + Er, ft + Tr, ft + Cr, ft + kr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], on = En.concat([Ut, Vt, "boxSizing", "max" + ur, "max" + wn, "position", ft, te, te + Cr, te + Tr, te + Er, te + kr]), Di = function(e, n, t) {
      dr(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        dr(r.spacerState);
      else if (e._gsap.swappedIn) {
        var i = n.parentNode;
        i && (i.insertBefore(e, n), i.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, Mn = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var i = En.length, a = n.style, s = e.style, d; i--; )
          d = En[i], a[d] = t[d];
        a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[mn] = s[bn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Ut] = yn(e, Le) + ye, a[Vt] = yn(e, fe) + ye, a[te] = s[ft] = s[ti] = s[ei] = "0", dr(r), s[Ut] = s["max" + ur] = t[Ut], s[Vt] = s["max" + wn] = t[Vt], s[te] = t[te], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Oi = /([A-Z])/g, dr = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, i, a;
        for ((e.t._gsap || p.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          a = e[r + 1], i = e[r], a ? n[i] = a : n[i] && n.removeProperty(i.replace(Oi, "-$1").toLowerCase());
      }
    }, sn = function(e) {
      for (var n = on.length, t = e.style, r = [], i = 0; i < n; i++)
        r.push(on[i], t[on[i]]);
      return r.t = e, r;
    }, Ai = function(e, n, t) {
      for (var r = [], i = e.length, a = t ? 8 : 0, s; a < i; a += 2)
        s = e[a], r.push(s, s in n ? n[s] : e[a + 1]);
      return r.t = e.t, r;
    }, ln = {
      left: 0,
      top: 0
    }, ui = function(e, n, t, r, i, a, s, d, x, Y, X, _, u) {
      Xe(e) && (e = e(d)), bt(e) && e.substr(0, 3) === "max" && (e = _ + (e.charAt(4) === "=" ? en("0" + e.substr(3), t) : 0));
      var v = u ? u.time() : 0, $, re, N;
      if (u && u.seek(0), xr(e))
        u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, _, e)), s && rn(s, t, r, !0);
      else {
        Xe(n) && (n = n(d));
        var Ze = (e || "0").split(" "), J, I, De, ne;
        N = Ke(n) || Z, J = Dt(N) || {}, (!J || !J.left && !J.top) && mt(N).display === "none" && (ne = N.style.display, N.style.display = "block", J = Dt(N), ne ? N.style.display = ne : N.style.removeProperty("display")), I = en(Ze[0], J[r.d]), De = en(Ze[1] || "0", t), e = J[r.p] - x[r.p] - Y + I + i - De, s && rn(s, De, r, t - De < 20 || s._isStart && De > 20), t -= t - De;
      }
      if (a) {
        var C = e + t, Je = a._isStart;
        $ = "scroll" + r.d2, rn(a, C, r, Je && C > 20 || !Je && (X ? Math.max(Z[$], vt[$]) : a.parentNode[$]) <= C + 1), X && (x = Dt(s), X && (a.style[r.op.p] = x[r.op.p] - r.op.m - a._offset + ye));
      }
      return u && N && ($ = Dt(N), u.seek(_), re = Dt(N), u._caScrollDist = $[r.p] - re[r.p], e = e / u._caScrollDist * _), u && u.seek(v), u ? e : Math.round(e);
    }, zi = /(webkit|moz|length|cssText|inset)/i, fi = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var i = e.style, a, s;
        if (n === Z) {
          e._stOrig = i.cssText, s = mt(e);
          for (a in s)
            !+a && !zi.test(a) && s[a] && typeof i[a] == "string" && a !== "0" && (i[a] = s[a]);
          i.top = t, i.left = r;
        } else
          i.cssText = e._stOrig;
        p.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, di = function(e, n, t) {
      var r = n, i = r;
      return function(a) {
        var s = Math.round(e());
        return s !== r && s !== i && Math.abs(s - r) > 3 && Math.abs(s - i) > 3 && (a = s, t && t()), i = r, r = a, a;
      };
    }, pi = function(e, n) {
      var t = Ft(e, n), r = "_scroll" + n.p2, i = function a(s, d, x, Y, X) {
        var _ = a.tween, u = d.onComplete, v = {};
        x = x || t();
        var $ = di(t, x, function() {
          _.kill(), a.tween = 0;
        });
        return X = Y && X || 0, Y = Y || s - x, _ && _.kill(), d[r] = s, d.modifiers = v, v[r] = function() {
          return $(x + Y * _.ratio + X * _.ratio * _.ratio);
        }, d.onUpdate = function() {
          k.cache++, Ot();
        }, d.onComplete = function() {
          a.tween = 0, u && u.call(_);
        }, _ = a.tween = p.to(e, d), _;
      };
      return e[r] = t, t.wheelHandler = function() {
        return i.tween && i.tween.kill() && (i.tween = 0);
      }, he(e, "wheel", t.wheelHandler), O.isTouch && he(e, "touchmove", t.wheelHandler), i;
    }, O = function() {
      function o(n, t) {
        sr || o.register(p) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = o.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !wr) {
          this.update = this.refresh = this.kill = Ct;
          return;
        }
        t = ri(bt(t) || xr(t) || t.nodeType ? {
          trigger: t
        } : t, Zr);
        var i = t, a = i.onUpdate, s = i.toggleClass, d = i.id, x = i.onToggle, Y = i.onRefresh, X = i.scrub, _ = i.trigger, u = i.pin, v = i.pinSpacing, $ = i.invalidateOnRefresh, re = i.anticipatePin, N = i.onScrubComplete, Ze = i.onSnapComplete, J = i.once, I = i.snap, De = i.pinReparent, ne = i.pinSpacer, C = i.containerAnimation, Je = i.fastScrollEnd, wt = i.preventOverlaps, E = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Le : fe, xe = !X && X !== 0, T = Ke(t.scroller || z), At = p.core.getCache(T), Se = qt(T), Be = ("pinType" in t ? t.pinType : _t(T, "pinType") || Se && "fixed") === "fixed", He = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], G = xe && t.toggleActions.split(" "), de = "markers" in t ? t.markers : Zr.markers, ae = Se ? 0 : parseFloat(mt(T)["border" + E.p2 + ur]) || 0, l = this, pe = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, Jt = Ti(T, Se, E), Bt = ki(T, Se), dt = 0, Ht = 0, q = Ft(T, E), Oe, We, Dr, it, pt, L, _e, ot, Et, Ne, c, zt, V, Wt, Nt, pr, Ge, Or, Gt, ie, st, $e, Ar, qe, Mt, zr, $t, hr, er, tr, A, It, yt, xt, ht, St, rr, gr, Lt;
        if (pn(l), l._dir = E, re *= 45, l.scroller = T, l.scroll = C ? C.time.bind(C) : q, it = q(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Pr = l)), At.tweenScroll = At.tweenScroll || {
          top: pi(T, fe),
          left: pi(T, Le)
        }, l.tweenTo = Oe = At.tweenScroll[E.p], l.scrubDuration = function(f) {
          It = xr(f) && f, It ? A ? A.duration(f) : A = p.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: It,
            paused: !0,
            onComplete: function() {
              return N && N(l);
            }
          }) : (A && A.progress(1).kill(), A = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(X), A && A.resetTo && A.resetTo("totalProgress", 0), er = 0, d || (d = r.vars.id)), D.push(l), I && ((!jr(I) || I.push) && (I = {
          snapTo: I
        }), "scrollBehavior" in Z.style && p.set(Se ? [Z, vt] : T, {
          scrollBehavior: "auto"
        }), k.forEach(function(f) {
          return Xe(f) && f.target === (Se ? U.scrollingElement || vt : T) && (f.smooth = !1);
        }), Dr = Xe(I.snapTo) ? I.snapTo : I.snapTo === "labels" ? Ei(r) : I.snapTo === "labelsDirectional" ? Mi(r) : I.directional !== !1 ? function(f, b) {
          return xn(I.snapTo)(f, Ye() - Ht < 500 ? 0 : b.direction);
        } : p.utils.snap(I.snapTo), yt = I.duration || {
          min: 0.1,
          max: 2
        }, yt = jr(yt) ? lr(yt.min, yt.max) : lr(yt, yt), xt = p.delayedCall(I.delay || It / 2 || 0.1, function() {
          var f = q(), b = Ye() - Ht < 500, w = Oe.tween;
          if ((b || Math.abs(l.getVelocity()) < 10) && !w && !qr && dt !== f) {
            var P = (f - L) / V, ve = r && !xe ? r.totalProgress() : P, W = b ? 0 : (ve - tr) / (Ye() - Gr) * 1e3 || 0, j = p.utils.clamp(-P, 1 - P, cr(W / 2) * W / 0.185), Te = P + (I.inertia === !1 ? 0 : j), be = lr(0, 1, Dr(Te, l)), ce = Math.round(L + be * V), Q = I, lt = Q.onStart, Ue = Q.onInterrupt, me = Q.onComplete;
            if (f <= _e && f >= L && ce !== f) {
              if (w && !w._initted && w.data <= cr(ce - f))
                return;
              I.inertia === !1 && (j = be - P), Oe(ce, {
                duration: yt(cr(Math.max(cr(Te - ve), cr(be - ve)) * 0.185 / W / 0.05 || 0)),
                ease: I.ease || "power3",
                data: cr(ce - f),
                onInterrupt: function() {
                  return xt.restart(!0) && Ue && Ue(l);
                },
                onComplete: function() {
                  l.update(), dt = q(), er = tr = r && !xe ? r.totalProgress() : l.progress, Ze && Ze(l), me && me(l);
                }
              }, f, j * V, ce - f - j * V), lt && lt(l, Oe.tween);
            }
          } else
            l.isActive && dt !== f && xt.restart(!0);
        }).pause()), d && (Sn[d] = l), _ = l.trigger = Ke(_ || u), Lt = _ && _._gsap && _._gsap.stRevert, Lt && (Lt = Lt(l)), u = u === !0 ? _ : Ke(u), bt(s) && (s = {
          targets: _,
          className: s
        }), u && (v === !1 || v === ft || (v = !v && u.parentNode && u.parentNode.style && mt(u.parentNode).display === "flex" ? !1 : te), l.pin = u, We = p.core.getCache(u), We.spacer ? Wt = We.pinState : (ne && (ne = Ke(ne), ne && !ne.nodeType && (ne = ne.current || ne.nativeElement), We.spacerIsNative = !!ne, ne && (We.spacerState = sn(ne))), We.spacer = Ge = ne || U.createElement("div"), Ge.classList.add("pin-spacer"), d && Ge.classList.add("pin-spacer-" + d), We.pinState = Wt = sn(u)), t.force3D !== !1 && p.set(u, {
          force3D: !0
        }), l.spacer = Ge = We.spacer, hr = mt(u), Ar = hr[v + E.os2], Gt = p.getProperty(u), ie = p.quickSetter(u, E.a, ye), Mn(u, Ge, hr), pr = sn(u)), de) {
          zt = jr(de) ? ri(de, ii) : ii, Ne = tn("scroller-start", d, T, E, zt, 0), c = tn("scroller-end", d, T, E, zt, 0, Ne), Or = Ne["offset" + E.op.d2];
          var Ir = Ke(_t(T, "content") || T);
          ot = this.markerStart = tn("start", d, Ir, E, zt, Or, 0, C), Et = this.markerEnd = tn("end", d, Ir, E, zt, Or, 0, C), C && (gr = p.quickSetter([ot, Et], E.a, ye)), !Be && !(H.length && _t(T, "fixedMarkers") === !0) && (Ci(Se ? Z : T), p.set([Ne, c], {
            force3D: !0
          }), Mt = p.quickSetter(Ne, E.a, ye), $t = p.quickSetter(c, E.a, ye));
        }
        if (C) {
          var M = C.vars.onUpdate, m = C.vars.onUpdateParams;
          C.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), M && M.apply(C, m || []);
          });
        }
        l.previous = function() {
          return D[D.indexOf(l) - 1];
        }, l.next = function() {
          return D[D.indexOf(l) + 1];
        }, l.revert = function(f, b) {
          if (!b)
            return l.kill(!0);
          var w = f !== !1 || !l.enabled, P = Pe;
          w !== l.isReverted && (w && (St = Math.max(q(), l.scroll.rec || 0), ht = l.progress, rr = r && r.progress()), ot && [ot, Et, Ne, c].forEach(function(ve) {
            return ve.style.display = w ? "none" : "block";
          }), w && (Pe = l, l.update(w)), u && (!De || !l.isActive) && (w ? Di(u, Ge, Wt) : Mn(u, Ge, mt(u), qe)), w || l.update(w), Pe = P, l.isReverted = w);
        }, l.refresh = function(f, b) {
          if (!((Pe || !l.enabled) && !b)) {
            if (u && f && ut) {
              he(o, "scrollEnd", si);
              return;
            }
            !nt && pe && pe(l), Pe = l, Ht = Ye(), Oe.tween && (Oe.tween.kill(), Oe.tween = 0), A && A.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var w = Jt(), P = Bt(), ve = C ? C.duration() : Xt(T, E), W = V <= 0.01, j = 0, Te = 0, be = t.end, ce = t.endTrigger || _, Q = t.start || (t.start === 0 || !_ ? 0 : u ? "0 0" : "0 100%"), lt = l.pinnedContainer = t.pinnedContainer && Ke(t.pinnedContainer), Ue = _ && Math.max(0, D.indexOf(l)) || 0, me = Ue, oe, Ae, _r, nr, ue, we, Rt, Pn, bi, Lr, Pt; me--; )
              we = D[me], we.end || we.refresh(0, 1) || (Pe = l), Rt = we.pin, Rt && (Rt === _ || Rt === u || Rt === lt) && !we.isReverted && (Lr || (Lr = []), Lr.unshift(we), we.revert(!0, !0)), we !== D[me] && (Ue--, me--);
            for (Xe(Q) && (Q = Q(l)), L = ui(Q, _, w, E, q(), ot, Ne, l, P, ae, Be, ve, C) || (u ? -1e-3 : 0), Xe(be) && (be = be(l)), bt(be) && !be.indexOf("+=") && (~be.indexOf(" ") ? be = (bt(Q) ? Q.split(" ")[0] : "") + be : (j = en(be.substr(2), w), be = bt(Q) ? Q : (C ? p.utils.mapRange(0, C.duration(), C.scrollTrigger.start, C.scrollTrigger.end, L) : L) + j, ce = _)), _e = Math.max(L, ui(be || (ce ? "100% 0" : ve), ce, w, E, q() + j, Et, c, l, P, ae, Be, ve, C)) || -1e-3, V = _e - L || (L -= 0.01) && 1e-3, j = 0, me = Ue; me--; )
              we = D[me], Rt = we.pin, Rt && we.start - we._pinPush <= L && !C && we.end > 0 && (oe = we.end - we.start, (Rt === _ && we.start - we._pinPush < L || Rt === lt) && !xr(Q) && (j += oe * (1 - we.progress)), Rt === u && (Te += oe));
            if (L += j, _e += j, W && (ht = p.utils.clamp(0, 1, p.utils.normalize(L, _e, St))), l._pinPush = Te, ot && j && (oe = {}, oe[E.a] = "+=" + j, lt && (oe[E.p] = "-=" + q()), p.set([ot, Et], oe)), u)
              oe = mt(u), nr = E === fe, _r = q(), st = parseFloat(Gt(E.a)) + Te, !ve && _e > 1 && (Pt = (Se ? U.scrollingElement || vt : T).style, Pt = {
                style: Pt,
                value: Pt["overflow" + E.a.toUpperCase()]
              }, Pt.style["overflow" + E.a.toUpperCase()] = "scroll"), Mn(u, Ge, oe), pr = sn(u), Ae = Dt(u, !0), Pn = Be && Ft(T, nr ? Le : fe)(), v && (qe = [v + E.os2, V + Te + ye], qe.t = Ge, me = v === te ? yn(u, E) + V + Te : 0, me && qe.push(E.d, me + ye), dr(qe), lt && D.forEach(function(Fr) {
                Fr.pin === lt && Fr.vars.pinSpacing !== !1 && (Fr._subPinOffset = !0);
              }), Be && q(St)), Be && (ue = {
                top: Ae.top + (nr ? _r - L : Pn) + ye,
                left: Ae.left + (nr ? Pn : _r - L) + ye,
                boxSizing: "border-box",
                position: "fixed"
              }, ue[Ut] = ue["max" + ur] = Math.ceil(Ae.width) + ye, ue[Vt] = ue["max" + wn] = Math.ceil(Ae.height) + ye, ue[ft] = ue[ft + Cr] = ue[ft + Tr] = ue[ft + Er] = ue[ft + kr] = "0", ue[te] = oe[te], ue[te + Cr] = oe[te + Cr], ue[te + Tr] = oe[te + Tr], ue[te + Er] = oe[te + Er], ue[te + kr] = oe[te + kr], Nt = Ai(Wt, ue, De), nt && q(0)), r ? (bi = r._initted, dn(1), r.render(r.duration(), !0, !0), $e = Gt(E.a) - st + V + Te, zr = Math.abs(V - $e) > 1, Be && zr && Nt.splice(Nt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), dn(0)) : $e = V, Pt && (Pt.value ? Pt.style["overflow" + E.a.toUpperCase()] = Pt.value : Pt.style.removeProperty("overflow-" + E.a));
            else if (_ && q() && !C)
              for (Ae = _.parentNode; Ae && Ae !== Z; )
                Ae._pinOffset && (L -= Ae._pinOffset, _e -= Ae._pinOffset), Ae = Ae.parentNode;
            Lr && Lr.forEach(function(Fr) {
              return Fr.revert(!1, !0);
            }), l.start = L, l.end = _e, it = pt = nt ? St : q(), !C && !nt && (it < St && q(St), l.scroll.rec = 0), l.revert(!1, !0), xt && (dt = -1, l.isActive && q(L + V * ht), xt.restart(!0)), Pe = 0, r && xe && (r._initted || rr) && r.progress() !== rr && r.progress(rr, !0).render(r.time(), !0, !0), (W || ht !== l.progress || C) && (r && !xe && r.totalProgress(C && L < -1e-3 && !ht ? p.utils.normalize(L, _e, 0) : ht, !0), l.progress = (it - L) / V === ht ? 0 : ht), u && v && (Ge._pinOffset = Math.round(l.progress * $e)), A && A.invalidate(), Y && !nt && Y(l);
          }
        }, l.getVelocity = function() {
          return (q() - pt) / (Ye() - Gr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Sr(l.callbackAnimation), r && (A ? A.progress(1) : r.paused() ? xe || Sr(r, l.direction < 0, 1) : Sr(r, r.reversed()));
        }, l.labelToScroll = function(f) {
          return r && r.labels && (L || l.refresh() || L) + r.labels[f] / r.duration() * V || 0;
        }, l.getTrailing = function(f) {
          var b = D.indexOf(l), w = l.direction > 0 ? D.slice(0, b).reverse() : D.slice(b + 1);
          return (bt(f) ? w.filter(function(P) {
            return P.vars.preventOverlaps === f;
          }) : w).filter(function(P) {
            return l.direction > 0 ? P.end <= L : P.start >= _e;
          });
        }, l.update = function(f, b, w) {
          if (!(C && !w && !f)) {
            var P = nt === !0 ? St : l.scroll(), ve = f ? 0 : (P - L) / V, W = ve < 0 ? 0 : ve > 1 ? 1 : ve || 0, j = l.progress, Te, be, ce, Q, lt, Ue, me, oe;
            if (b && (pt = it, it = C ? q() : P, I && (tr = er, er = r && !xe ? r.totalProgress() : W)), re && !W && u && !Pe && !Ur && ut && L < P + (P - pt) / (Ye() - Gr) * re && (W = 1e-4), W !== j && l.enabled) {
              if (Te = l.isActive = !!W && W < 1, be = !!j && j < 1, Ue = Te !== be, lt = Ue || !!W != !!j, l.direction = W > j ? 1 : -1, l.progress = W, lt && !Pe && (ce = W && !j ? 0 : W === 1 ? 1 : j === 1 ? 2 : 3, xe && (Q = !Ue && G[ce + 1] !== "none" && G[ce + 1] || G[ce], oe = r && (Q === "complete" || Q === "reset" || Q in r))), wt && (Ue || oe) && (oe || X || !r) && (Xe(wt) ? wt(l) : l.getTrailing(wt).forEach(function(ue) {
                return ue.endAnimation();
              })), xe || (A && !Pe && !Ur ? (A._dp._time - A._start !== A._time && A.render(A._dp._time - A._start), A.resetTo ? A.resetTo("totalProgress", W, r._tTime / r._tDur) : (A.vars.totalProgress = W, A.invalidate().restart())) : r && r.totalProgress(W, !!Pe)), u) {
                if (f && v && (Ge.style[v + E.os2] = Ar), !Be)
                  ie(yr(st + $e * W));
                else if (lt) {
                  if (me = !f && W > j && _e + 1 > P && P + 1 >= Xt(T, E), De)
                    if (!f && (Te || me)) {
                      var Ae = Dt(u, !0), _r = P - L;
                      fi(u, Z, Ae.top + (E === fe ? _r : 0) + ye, Ae.left + (E === fe ? 0 : _r) + ye);
                    } else
                      fi(u, Ge);
                  dr(Te || me ? Nt : pr), zr && W < 1 && Te || ie(st + (W === 1 && !me ? $e : 0));
                }
              }
              I && !Oe.tween && !Pe && !Ur && xt.restart(!0), s && (Ue || J && W && (W < 1 || !gn)) && Nr(s.targets).forEach(function(ue) {
                return ue.classList[Te || J ? "add" : "remove"](s.className);
              }), a && !xe && !f && a(l), lt && !Pe ? (xe && (oe && (Q === "complete" ? r.pause().totalProgress(1) : Q === "reset" ? r.restart(!0).pause() : Q === "restart" ? r.restart(!0) : r[Q]()), a && a(l)), (Ue || !gn) && (x && Ue && vn(l, x), He[ce] && vn(l, He[ce]), J && (W === 1 ? l.kill(!1, 1) : He[ce] = 0), Ue || (ce = W === 1 ? 1 : 3, He[ce] && vn(l, He[ce]))), Je && !Te && Math.abs(l.getVelocity()) > (xr(Je) ? Je : 2500) && (Sr(l.callbackAnimation), A ? A.progress(1) : Sr(r, Q === "reverse" ? 1 : !W, 1))) : xe && a && !Pe && a(l);
            }
            if ($t) {
              var nr = C ? P / C.duration() * (C._caScrollDist || 0) : P;
              Mt(nr + (Ne._isFlipped ? 1 : 0)), $t(nr);
            }
            gr && gr(-P / C.duration() * (C._caScrollDist || 0));
          }
        }, l.enable = function(f, b) {
          l.enabled || (l.enabled = !0, he(T, "resize", Rr), he(Se ? U : T, "scroll", fr), pe && he(o, "refreshInit", pe), f !== !1 && (l.progress = ht = 0, it = pt = dt = q()), b !== !1 && l.refresh());
        }, l.getTween = function(f) {
          return f && Oe ? Oe.tween : A;
        }, l.setPositions = function(f, b) {
          u && (st += f - L, $e += b - f - V, v === te && l.adjustPinSpacing(b - f - V)), l.start = L = f, l.end = _e = b, V = b - f, l.update();
        }, l.adjustPinSpacing = function(f) {
          if (qe && f) {
            var b = qe.indexOf(E.d) + 1;
            qe[b] = parseFloat(qe[b]) + f + ye, qe[1] = parseFloat(qe[1]) + f + ye, dr(qe);
          }
        }, l.disable = function(f, b) {
          if (l.enabled && (f !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, b || A && A.pause(), St = 0, We && (We.uncache = 1), pe && ge(o, "refreshInit", pe), xt && (xt.pause(), Oe.tween && Oe.tween.kill() && (Oe.tween = 0)), !Se)) {
            for (var w = D.length; w--; )
              if (D[w].scroller === T && D[w] !== l)
                return;
            ge(T, "resize", Rr), ge(T, "scroll", fr);
          }
        }, l.kill = function(f, b) {
          l.disable(f, b), A && !b && A.kill(), d && delete Sn[d];
          var w = D.indexOf(l);
          w >= 0 && D.splice(w, 1), w === Fe && nn > 0 && Fe--, w = 0, D.forEach(function(P) {
            return P.scroller === l.scroller && (w = 1);
          }), w || nt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, f && r.revert({
            kill: !1
          }), b || r.kill()), ot && [ot, Et, Ne, c].forEach(function(P) {
            return P.parentNode && P.parentNode.removeChild(P);
          }), Pr === l && (Pr = 0), u && (We && (We.uncache = 1), w = 0, D.forEach(function(P) {
            return P.pin === u && w++;
          }), w || (We.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), Lt && Lt(l), !r || !r.add || V ? l.refresh() : p.delayedCall(0.01, function() {
          return L || _e || l.refresh();
        }) && (V = 0.01) && (L = _e = 0), u && Pi();
      }, o.register = function(t) {
        return sr || (p = t || Zn(), Kn() && window.document && o.enable(), sr = wr), sr;
      }, o.defaults = function(t) {
        if (t)
          for (var r in t)
            Zr[r] = t[r];
        return Zr;
      }, o.disable = function(t, r) {
        wr = 0, D.forEach(function(a) {
          return a[r ? "kill" : "disable"](t);
        }), ge(z, "wheel", fr), ge(U, "scroll", fr), clearInterval($r), ge(U, "touchcancel", Ct), ge(Z, "touchstart", Ct), Qr(ge, U, "pointerdown,touchstart,mousedown", jn), Qr(ge, U, "pointerup,touchend,mouseup", Qn), Wr.kill(), Vr(ge);
        for (var i = 0; i < k.length; i += 3)
          Kr(ge, k[i], k[i + 1]), Kr(ge, k[i], k[i + 2]);
      }, o.enable = function() {
        if (z = window, U = document, vt = U.documentElement, Z = U.body, p && (Nr = p.utils.toArray, lr = p.utils.clamp, pn = p.core.context || Ct, dn = p.core.suppressOverwrites || Ct, hn = z.history.scrollRestoration || "auto", Cn = z.pageYOffset, p.core.globals("ScrollTrigger", o), Z)) {
          wr = 1, Si(), le.register(p), o.isTouch = le.isTouch, Yt = le.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), he(z, "wheel", fr), Hn = [z, U, vt, Z], p.matchMedia ? (o.matchMedia = function(d) {
            var x = p.matchMedia(), Y;
            for (Y in d)
              x.add(Y, d[Y]);
            return x;
          }, p.addEventListener("matchMediaInit", function() {
            return kn();
          }), p.addEventListener("matchMediaRevert", function() {
            return li();
          }), p.addEventListener("matchMedia", function() {
            Zt(0, 1), Qt("matchMedia");
          }), p.matchMedia("(orientation: portrait)", function() {
            return Tn(), Tn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), Tn(), he(U, "scroll", fr);
          var t = Z.style, r = t.borderTopStyle, i = p.core.Animation.prototype, a, s;
          for (i.revert || Object.defineProperty(i, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", a = Dt(Z), fe.m = Math.round(a.top + fe.sc()) || 0, Le.m = Math.round(a.left + Le.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), $r = setInterval(oi, 250), p.delayedCall(0.5, function() {
            return Ur = 0;
          }), he(U, "touchcancel", Ct), he(Z, "touchstart", Ct), Qr(he, U, "pointerdown,touchstart,mousedown", jn), Qr(he, U, "pointerup,touchend,mouseup", Qn), fn = p.utils.checkPrefix("transform"), on.push(fn), sr = Ye(), Wr = p.delayedCall(0.2, Zt).pause(), ar = [U, "visibilitychange", function() {
            var d = z.innerWidth, x = z.innerHeight;
            U.hidden ? (Wn = d, Nn = x) : (Wn !== d || Nn !== x) && Rr();
          }, U, "DOMContentLoaded", Zt, z, "load", Zt, z, "resize", Rr], Vr(he), D.forEach(function(d) {
            return d.enable(0, 1);
          }), s = 0; s < k.length; s += 3)
            Kr(ge, k[s], k[s + 1]), Kr(ge, k[s], k[s + 2]);
        }
      }, o.config = function(t) {
        "limitCallbacks" in t && (gn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval($r) || ($r = r) && setInterval(oi, r), "ignoreMobileResize" in t && (qn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Vr(ge) || Vr(he, t.autoRefreshEvents || "none"), $n = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, o.scrollerProxy = function(t, r) {
        var i = Ke(t), a = k.indexOf(i), s = qt(i);
        ~a && k.splice(a, s ? 6 : 2), r && (s ? H.unshift(z, r, Z, r, vt, r) : H.unshift(i, r));
      }, o.clearMatchMedia = function(t) {
        D.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, o.isInViewport = function(t, r, i) {
        var a = (bt(t) ? Ke(t) : t).getBoundingClientRect(), s = a[i ? Ut : Vt] * r || 0;
        return i ? a.right - s > 0 && a.left + s < z.innerWidth : a.bottom - s > 0 && a.top + s < z.innerHeight;
      }, o.positionInViewport = function(t, r, i) {
        bt(t) && (t = Ke(t));
        var a = t.getBoundingClientRect(), s = a[i ? Ut : Vt], d = r == null ? s / 2 : r in Jr ? Jr[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
        return i ? (a.left + d) / z.innerWidth : (a.top + d) / z.innerHeight;
      }, o.killAll = function(t) {
        if (D.slice(0).forEach(function(i) {
          return i.vars.id !== "ScrollSmoother" && i.kill();
        }), t !== !0) {
          var r = jt.killAll || [];
          jt = {}, r.forEach(function(i) {
            return i();
          });
        }
      }, o;
    }();
    O.version = "3.11.5", O.saveStyles = function(o) {
      return o ? Nr(o).forEach(function(e) {
        if (e && e.style) {
          var n = rt.indexOf(e);
          n >= 0 && rt.splice(n, 5), rt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), p.core.getCache(e), pn());
        }
      }) : rt;
    }, O.revert = function(o, e) {
      return kn(!o, e);
    }, O.create = function(o, e) {
      return new O(o, e);
    }, O.refresh = function(o) {
      return o ? Rr() : (sr || O.register()) && Zt(!0);
    }, O.update = function(o) {
      return ++k.cache && Ot(o === !0 ? 2 : 0);
    }, O.clearScrollMemory = ai, O.maxScroll = function(o, e) {
      return Xt(o, e ? Le : fe);
    }, O.getScrollFunc = function(o, e) {
      return Ft(Ke(o), e ? Le : fe);
    }, O.getById = function(o) {
      return Sn[o];
    }, O.getAll = function() {
      return D.filter(function(o) {
        return o.vars.id !== "ScrollSmoother";
      });
    }, O.isScrolling = function() {
      return !!ut;
    }, O.snapDirectional = xn, O.addEventListener = function(o, e) {
      var n = jt[o] || (jt[o] = []);
      ~n.indexOf(e) || n.push(e);
    }, O.removeEventListener = function(o, e) {
      var n = jt[o], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, O.batch = function(o, e) {
      var n = [], t = {}, r = e.interval || 0.016, i = e.batchMax || 1e9, a = function(x, Y) {
        var X = [], _ = [], u = p.delayedCall(r, function() {
          Y(X, _), X = [], _ = [];
        }).pause();
        return function(v) {
          X.length || u.restart(!0), X.push(v.trigger), _.push(v), i <= X.length && u.progress(1);
        };
      }, s;
      for (s in e)
        t[s] = s.substr(0, 2) === "on" && Xe(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
      return Xe(i) && (i = i(), he(O, "refresh", function() {
        return i = e.batchMax();
      })), Nr(o).forEach(function(d) {
        var x = {};
        for (s in t)
          x[s] = t[s];
        x.trigger = d, n.push(O.create(x));
      }), n;
    };
    var hi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Rn = function o(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (le.isTouch ? " pinch-zoom" : "") : "none", e === vt && o(Z, n);
    }, an = {
      auto: 1,
      scroll: 1
    }, Ii = function(e) {
      var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, a = i._gsap || p.core.getCache(i), s = Ye(), d;
      if (!a._isScrollT || s - a._isScrollT > 2e3) {
        for (; i && i !== Z && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(an[(d = mt(i)).overflowY] || an[d.overflowX])); )
          i = i.parentNode;
        a._isScroll = i && i !== t && !qt(i) && (an[(d = mt(i)).overflowY] || an[d.overflowX]), a._isScrollT = s;
      }
      (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, gi = function(e, n, t, r) {
      return le.create({
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
          return t && he(U, le.eventTypes[0], vi, !1, !0);
        },
        onDisable: function() {
          return ge(U, le.eventTypes[0], vi, !0);
        }
      });
    }, Li = /(input|label|select|textarea)/i, _i, vi = function(e) {
      var n = Li.test(e.target.tagName);
      (n || _i) && (e._gsapAllow = !0, _i = n);
    }, Fi = function(e) {
      jr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, a = n.onRelease, s, d, x = Ke(e.target) || vt, Y = p.core.globals().ScrollSmoother, X = Y && Y.get(), _ = Yt && (e.content && Ke(e.content) || X && e.content !== !1 && !X.smooth() && X.content()), u = Ft(x, fe), v = Ft(x, Le), $ = 1, re = (le.isTouch && z.visualViewport ? z.visualViewport.scale * z.visualViewport.width : z.outerWidth) / z.innerWidth, N = 0, Ze = Xe(r) ? function() {
        return r(s);
      } : function() {
        return r || 2.8;
      }, J, I, De = gi(x, e.type, !0, i), ne = function() {
        return I = !1;
      }, C = Ct, Je = Ct, wt = function() {
        d = Xt(x, fe), Je = lr(Yt ? 1 : 0, d), t && (C = lr(0, Xt(x, Le))), J = Kt;
      }, E = function() {
        _._gsap.y = yr(parseFloat(_._gsap.y) + u.offset) + "px", _.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(_._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
      }, xe = function() {
        if (I) {
          requestAnimationFrame(ne);
          var de = yr(s.deltaY / 2), ae = Je(u.v - de);
          if (_ && ae !== u.v + u.offset) {
            u.offset = ae - u.v;
            var l = yr((parseFloat(_ && _._gsap.y) || 0) - u.offset);
            _.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", _._gsap.y = l + "px", u.cacheID = k.cache, Ot();
          }
          return !0;
        }
        u.offset && E(), I = !0;
      }, T, At, Se, Be, He = function() {
        wt(), T.isActive() && T.vars.scrollY > d && (u() > d ? T.progress(1) && u(d) : T.resetTo("scrollY", d));
      };
      return _ && p.set(_, {
        y: "+=0"
      }), e.ignoreCheck = function(G) {
        return Yt && G.type === "touchmove" && xe() || $ > 1.05 && G.type !== "touchstart" || s.isGesturing || G.touches && G.touches.length > 1;
      }, e.onPress = function() {
        I = !1;
        var G = $;
        $ = yr((z.visualViewport && z.visualViewport.scale || 1) / re), T.pause(), G !== $ && Rn(x, $ > 1.01 ? !0 : t ? !1 : "x"), At = v(), Se = u(), wt(), J = Kt;
      }, e.onRelease = e.onGestureStart = function(G, de) {
        if (u.offset && E(), !de)
          Be.restart(!0);
        else {
          k.cache++;
          var ae = Ze(), l, pe;
          t && (l = v(), pe = l + ae * 0.05 * -G.velocityX / 0.227, ae *= hi(v, l, pe, Xt(x, Le)), T.vars.scrollX = C(pe)), l = u(), pe = l + ae * 0.05 * -G.velocityY / 0.227, ae *= hi(u, l, pe, Xt(x, fe)), T.vars.scrollY = Je(pe), T.invalidate().duration(ae).play(0.01), (Yt && T.vars.scrollY >= d || l >= d - 1) && p.to({}, {
            onUpdate: He,
            duration: ae
          });
        }
        a && a(G);
      }, e.onWheel = function() {
        T._ts && T.pause(), Ye() - N > 1e3 && (J = 0, N = Ye());
      }, e.onChange = function(G, de, ae, l, pe) {
        if (Kt !== J && wt(), de && t && v(C(l[2] === de ? At + (G.startX - G.x) : v() + de - l[1])), ae) {
          u.offset && E();
          var Jt = pe[2] === ae, Bt = Jt ? Se + G.startY - G.y : u() + ae - pe[1], dt = Je(Bt);
          Jt && Bt !== dt && (Se += dt - Bt), u(dt);
        }
        (ae || de) && Ot();
      }, e.onEnable = function() {
        Rn(x, t ? !1 : "x"), O.addEventListener("refresh", He), he(z, "resize", He), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = v.smooth = !1), De.enable();
      }, e.onDisable = function() {
        Rn(x, !0), ge(z, "resize", He), O.removeEventListener("refresh", He), De.kill();
      }, e.lockAxis = e.lockAxis !== !1, s = new le(e), s.iOS = Yt, Yt && !u() && u(1), Yt && p.ticker.add(Ct), Be = s._dc, T = p.to(s, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: di(u, u(), function() {
            return T.pause();
          })
        },
        onUpdate: Ot,
        onComplete: Be.vars.onComplete
      }), s;
    };
    O.sort = function(o) {
      return D.sort(o || function(e, n) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
      });
    }, O.observe = function(o) {
      return new le(o);
    }, O.normalizeScroll = function(o) {
      if (typeof o > "u")
        return tt;
      if (o === !0 && tt)
        return tt.enable();
      if (o === !1)
        return tt && tt.kill();
      var e = o instanceof le ? o : Fi(o);
      return tt && tt.target === e.target && tt.kill(), qt(e.target) && (tt = e), e;
    }, O.core = {
      _getVelocityProp: un,
      _inputObserver: gi,
      _scrollers: k,
      _proxies: H,
      bridge: {
        ss: function() {
          ut || Qt("scrollStart"), ut = Ye();
        },
        ref: function() {
          return Pe;
        }
      }
    }, Zn() && p.registerPlugin(O), g.ScrollTrigger = O, g.default = O, typeof window > "u" || window !== g ? Object.defineProperty(g, "__esModule", { value: !0 }) : delete window.default;
  });
})(In, In.exports);
var yi = In.exports;
Ve.registerPlugin(yi.ScrollTrigger);
class xi {
  constructor(h, g = {}, ee = {}) {
    B(this, "target");
    B(this, "motion");
    B(this, "speed");
    B(this, "velocity");
    B(this, "direction");
    B(this, "scrollTrigger", yi.ScrollTrigger.create({}));
    this.speed = g.speed ?? 1, this.velocity = g.velocity ?? 0, this.direction = g.direction || "rtl", this.onUpdate = g.onUpdate, this.onCreated = g.onCreated, this.target = h instanceof Function ? h() : h;
    const ke = g.createDOMContainers != null ? g.createDOMContainers : !0;
    this.motion = new vr(
      () => {
        var Tt;
        let S = null;
        typeof h == "string" ? S = document.querySelector(h) : h instanceof HTMLElement && (S = h);
        const F = ke ? document.createElement("div") : S == null ? void 0 : S.querySelector(".owow-marquee-outer");
        F == null || F.classList.add("owow-marquee-outer");
        const R = ke ? document.createElement("div") : F == null ? void 0 : F.querySelector(".owow-marquee-inner");
        if (R == null || R.classList.add("owow-marquee-inner"), !S || !F || !R) {
          console.error("Invalid marquee DOM structure", {
            targetContainer: S,
            outerContainer: F,
            innerContainer: R
          });
          return;
        }
        R.append(...S.childNodes), F.append(R), S == null || S.append(F), Ve.set(R, { display: "inline-flex" });
        const se = S.getBoundingClientRect(), K = R.getBoundingClientRect(), at = se.width + K.width, gt = document.createDocumentFragment(), Ce = [];
        let je = K.width;
        if (!at || !je)
          return;
        for (; je <= at; ) {
          const ze = R.cloneNode(!0);
          je += K.width, Ce.push(ze);
        }
        gt.append(...Ce), F.append(gt);
        const ir = Ve.context(() => {
          Ve.set(F, {
            x: 0,
            force3D: !0,
            width: je,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), et = Ve.utils.pipe(
          (ze) => Math.floor(ze * 1e3) / 1e3,
          Ve.quickSetter(F, "x", "px")
        ), Ee = Ve.ticker.add(() => {
          var _t;
          const ze = this.velocity != null ? this.scrollTrigger.getVelocity() ?? 0 : 0;
          let kt = 1, Me = typeof this.velocity == "number" ? ze * this.velocity : this.velocity(ze);
          switch (this.direction) {
            case "ltr":
              kt = -1, Me = -Math.abs(Me);
              break;
            case "rtl":
              kt = 1, Me = Math.abs(Me);
              break;
            case "scroll":
              kt = this.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              kt = -(this.scrollTrigger.direction ?? 1), Me = -Me;
          }
          const k = Ve.getProperty(F, "x"), Re = (this.speed * -kt - Me) * Ve.ticker.deltaRatio(), ct = Ve.utils.wrap(0, -K.width, k + Re), or = Ve.utils.normalize(0, -K.width, ct);
          et(ct), (_t = this.onUpdate) == null || _t.call(this, or);
        });
        return (Tt = this.onCreated) == null || Tt.call(this), () => {
          var ze;
          for (ir.kill(!0), Ve.ticker.remove(Ee); Ce.length; )
            (ze = Ce.pop()) == null || ze.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...ee
      }
    );
  }
  static create(h, g = {}, ee = {}) {
    return new xi(h, g, ee);
  }
}
export {
  xi as Marquee,
  vr as Motion,
  On as Pointer
};
