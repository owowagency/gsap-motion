var Yi = Object.defineProperty;
var Xi = (y, h, _) => h in y ? Yi(y, h, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : y[h] = _;
var X = (y, h, _) => (Xi(y, typeof h != "symbol" ? h + "" : h, _), _);
import { fromEvent as An, debounceTime as Bi, Observable as Hi } from "rxjs";
import $e from "gsap";
var Yr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wi(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var Ni = "Expected a function", mi = 0 / 0, Gi = "[object Symbol]", $i = /^\s+|\s+$/g, qi = /^[-+]0x[0-9a-f]+$/i, Ui = /^0b[01]+$/i, Vi = /^0o[0-7]+$/i, ji = parseInt, Qi = typeof Yr == "object" && Yr && Yr.Object === Object && Yr, Ki = typeof self == "object" && self && self.Object === Object && self, Zi = Qi || Ki || Function("return this")(), Ji = Object.prototype, eo = Ji.toString, to = Math.max, ro = Math.min, Dn = function() {
  return Zi.Date.now();
};
function no(y, h, _) {
  var G, j, M, se, F, le, de = 0, qe = !1, st = !1, Ze = !0;
  if (typeof y != "function")
    throw new TypeError(Ni);
  h = wi(h) || 0, zn(_) && (qe = !!_.leading, st = "maxWait" in _, M = st ? to(wi(_.maxWait) || 0, h) : M, Ze = "trailing" in _ ? !!_.trailing : Ze);
  function pt(B) {
    var Ee = G, lt = j;
    return G = j = void 0, de = B, se = y.apply(lt, Ee), se;
  }
  function ir(B) {
    return de = B, F = setTimeout(Rt, h), qe ? pt(B) : se;
  }
  function Ue(B) {
    var Ee = B - le, lt = B - de, or = h - Ee;
    return st ? ro(or, M - lt) : or;
  }
  function Z(B) {
    var Ee = B - le, lt = B - de;
    return le === void 0 || Ee >= h || Ee < 0 || st && lt >= M;
  }
  function Rt() {
    var B = Dn();
    if (Z(B))
      return ht(B);
    F = setTimeout(Rt, Ue(B));
  }
  function ht(B) {
    return F = void 0, Ze && G ? pt(B) : (G = j = void 0, se);
  }
  function $t() {
    F !== void 0 && clearTimeout(F), de = 0, G = le = j = F = void 0;
  }
  function St() {
    return F === void 0 ? se : ht(Dn());
  }
  function T() {
    var B = Dn(), Ee = Z(B);
    if (G = arguments, j = this, le = B, Ee) {
      if (F === void 0)
        return ir(le);
      if (st)
        return F = setTimeout(Rt, h), pt(le);
    }
    return F === void 0 && (F = setTimeout(Rt, h)), se;
  }
  return T.cancel = $t, T.flush = St, T;
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
  var _ = Ui.test(y);
  return _ || Vi.test(y) ? ji(y.slice(2), _ ? 2 : 8) : qi.test(y) ? mi : +y;
}
var so = no;
const lo = /* @__PURE__ */ Wi(so), Fn = class {
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
  constructor(h, _ = {}) {
    X(this, "mediaQueryList");
    X(this, "motionResizeObserver");
    X(this, "meta", {});
    X(this, "subscriptions", []);
    X(this, "create");
    X(this, "cleanup");
    /**
     * Runs the cleanup function and resets this Motion instance.
     */
    X(this, "reset", lo(
      () => {
        var h;
        (h = this.cleanup) == null || h.call(this), requestAnimationFrame(() => {
          var _;
          this.cleanup = ((_ = this.create) == null ? void 0 : _.call(this, this)) ?? void 0;
        });
      },
      Fn.resetDebounceTime,
      { leading: !0 }
    ));
    /**
     * Runs the cleanup function and makes this instance elegible for garbage collection.
     */
    X(this, "destroy", () => {
      var h, _;
      for ((h = this.cleanup) == null || h.call(this), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0; this.subscriptions.length; )
        (_ = this.subscriptions.pop()) == null || _.unsubscribe();
    });
    this.observeMedia(_.watchMedia), this.observeResize(_.shouldResetOnResize), this.create = () => {
      var M, se;
      return [((M = _.enable) == null ? void 0 : M.call(_)) ?? !0, ((se = this.mediaQueryList) == null ? void 0 : se.matches) ?? !0].every(
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
    return h * $e.ticker.deltaRatio(this.referenceFramerate);
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
let vr = Fn;
X(vr, "resetDebounceTime", 100), /** Target framerate */
X(vr, "referenceFramerate", 60);
class ao {
  constructor(h) {
    X(this, "axis");
    X(this, "element");
    X(this, "inlineSize");
    X(this, "blockSize");
    X(this, "observable");
    const [_, G] = [h].flat();
    this.element = typeof _ == "string" ? document.querySelector(_) : _, this.axis = G, this.observable = new Hi((j) => {
      const M = new ResizeObserver(
        (se) => this.handleResize(se, j)
      );
      return this.element && M.observe(this.element), () => M.disconnect();
    });
  }
  handleResize(h, _) {
    const G = h.find((de) => de.target === this.element);
    if (!G)
      return;
    const { inlineSize: j, blockSize: M } = G.borderBoxSize[0], se = j !== this.inlineSize, F = M !== this.blockSize, le = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = j, this.blockSize = M, !le) {
      if (this.axis === "horizontal" && se || this.axis === "vertical" && F)
        return _.next();
      !this.axis && (se || F) && _.next();
    }
  }
}
const Ln = class {
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
    X(this, "viewWidth", window.innerWidth);
    /** Window inner height */
    X(this, "viewHeight", window.innerHeight);
    /** Pointer absolute x position */
    X(this, "clientX", this.viewWidth / 2);
    /** Pointer absolute y position */
    X(this, "clientY", this.viewHeight / 2);
    /** Pointer normalized x position (0 to 1) */
    X(this, "normalX", 0.5);
    /** Pointer normalized y position (0 to 1)*/
    X(this, "normalY", 0.5);
    X(this, "observable", An(window, "mousemove"));
    /**
     * Internal motion instance
     */
    X(this, "motion", new vr(
      (h) => {
        h.subscriptions.push(
          this.observable.subscribe((_) => {
            this.clientX = _.clientX, this.clientY = _.clientY, this.normalX = $e.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = $e.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
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
    X(this, "destroy", () => {
      this.motion.destroy();
    });
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new Ln());
  }
};
let On = Ln;
X(On, "_instance");
var In = { exports: {} };
(function(y, h) {
  (function(_, G) {
    G(h);
  })(Yr, function(_) {
    function G(o, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(o, t.key, t);
      }
    }
    function j(o, e, n) {
      return e && G(o.prototype, e), n && G(o, n), o;
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
    var M, se, F, le, de, qe, st, Ze, pt, ir, Ue, Z, Rt, ht = function() {
      return M || typeof window < "u" && (M = window.gsap) && M.registerPlugin && M;
    }, $t = 1, St = [], T = [], B = [], Ee = Date.now, lt = function(e, n) {
      return n;
    }, or = function() {
      var e = pt.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, T), r.push.apply(r, B), T = t, B = r, lt = function(a, s) {
        return n[a](s);
      };
    }, gt = function(e, n) {
      return ~B.indexOf(e) && B[B.indexOf(e) + 1][n];
    }, br = function(e) {
      return !!~ir.indexOf(e);
    }, Ve = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, Oe = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Xr = "scrollLeft", Br = "scrollTop", cn = function() {
      return Ue && Ue.isPressed || T.cache++;
    }, Hr = function(e, n) {
      var t = function r(i) {
        if (i || i === 0) {
          $t && (F.history.scrollRestoration = "manual");
          var a = Ue && Ue.isPressed;
          i = r.v = Math.round(i) || (Ue && Ue.iOS ? 1 : 0), e(i), r.cacheID = T.cache, a && lt("ss", i);
        } else
          (n || T.cache !== r.cacheID || lt("ref")) && (r.cacheID = T.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Ae = {
      s: Xr,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Hr(function(o) {
        return arguments.length ? F.scrollTo(o, pe.sc()) : F.pageXOffset || le[Xr] || de[Xr] || qe[Xr] || 0;
      })
    }, pe = {
      s: Br,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Ae,
      sc: Hr(function(o) {
        return arguments.length ? F.scrollTo(Ae.sc(), o) : F.pageYOffset || le[Br] || de[Br] || qe[Br] || 0;
      })
    }, je = function(e) {
      return M.utils.toArray(e)[0] || (typeof e == "string" && M.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Ft = function(e, n) {
      var t = n.s, r = n.sc;
      br(e) && (e = le.scrollingElement || de);
      var i = T.indexOf(e), a = r === pe.sc ? 1 : 2;
      !~i && (i = T.push(e) - 1), T[i + a] || e.addEventListener("scroll", cn);
      var s = T[i + a], d = s || (T[i + a] = Hr(gt(e, t), !0) || (br(e) ? r : Hr(function(x) {
        return arguments.length ? e[t] = x : e[t];
      })));
      return d.target = e, s || (d.smooth = M.getProperty(e, "scrollBehavior") === "smooth"), d;
    }, un = function(e, n, t) {
      var r = e, i = e, a = Ee(), s = a, d = n || 50, x = Math.max(500, d * 3), L = function(v, $) {
        var re = Ee();
        $ || re - a > d ? (i = r, r = v, s = a, a = re) : t ? r += v : r = i + (v - i) / (re - s) * (a - s);
      }, Y = function() {
        i = r = t ? 0 : r, s = a = 0;
      }, g = function(v) {
        var $ = s, re = i, W = Ee();
        return (v || v === 0) && v !== r && L(v), a === s || W - s > x ? 0 : (r + (t ? re : -re)) / ((t ? W : a) - $) * 1e3;
      };
      return {
        update: L,
        reset: Y,
        getVelocity: g
      };
    }, mr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, Yn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Xn = function() {
      pt = M.core.globals().ScrollTrigger, pt && pt.core && or();
    }, Bn = function(e) {
      return M = e || ht(), M && typeof document < "u" && document.body && (F = window, le = document, de = le.documentElement, qe = le.body, ir = [F, le, de, qe], M.utils.clamp, Rt = M.core.context || function() {
      }, Ze = "onpointerenter" in qe ? "pointer" : "mouse", st = ae.isTouch = F.matchMedia && F.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in F || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Z = ae.eventTypes = ("ontouchstart" in de ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in de ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return $t = 0;
      }, 500), Xn(), se = 1), se;
    };
    Ae.op = pe, T.cache = 0;
    var ae = function() {
      function o(n) {
        this.init(n);
      }
      var e = o.prototype;
      return e.init = function(t) {
        se || Bn(M) || console.warn("Please gsap.registerPlugin(Observer)"), pt || Xn();
        var r = t.tolerance, i = t.dragMinimum, a = t.type, s = t.target, d = t.lineHeight, x = t.debounce, L = t.preventDefault, Y = t.onStop, g = t.onStopDelay, u = t.ignore, v = t.wheelSpeed, $ = t.event, re = t.onDragStart, W = t.onDragEnd, Qe = t.onDrag, ee = t.onPress, z = t.onRelease, Re = t.onRight, ne = t.onLeft, k = t.onUp, Ke = t.onDown, mt = t.onChangeX, C = t.onChangeY, Te = t.onChange, S = t.onToggleX, Ot = t.onToggleY, ke = t.onHover, Le = t.onHoverEnd, Ye = t.onMove, N = t.ignoreCheck, he = t.isNormalizer, ce = t.onGestureStart, l = t.onGestureEnd, ge = t.onWheel, Jt = t.onEnable, Xt = t.onDisable, ut = t.onClick, Bt = t.scrollSpeed, q = t.capture, Me = t.allowClicks, Xe = t.lockAxis, Dr = t.onLockAxis;
        this.target = s = je(s) || de, this.vars = t, u && (u = M.utils.toArray(u)), r = r || 1e-9, i = i || 0, v = v || 1, Bt = Bt || 1, a = a || "wheel,touch,pointer", x = x !== !1, d || (d = parseFloat(F.getComputedStyle(qe).lineHeight) || 22);
        var rt, ft, I, be, nt, kt, Be, c = this, At = 0, V = 0, Ht = Ft(s, Ae), Wt = Ft(s, pe), pr = Ht(), He = Wt(), Or = ~a.indexOf("touch") && !~a.indexOf("pointer") && Z[0] === "pointerdown", Nt = br(s), ie = s.ownerDocument || le, it = [0, 0, 0], We = [0, 0, 0], Ar = 0, Ne = function() {
          return Ar = Ee();
        }, Ct = function(m, f) {
          return (c.event = m) && u && ~u.indexOf(m.target) || f && Or && m.pointerType !== "touch" || N && N(m, f);
        }, zr = function() {
          c._vx.reset(), c._vy.reset(), ft.pause(), Y && Y(c);
        }, Gt = function() {
          var m = c.deltaX = Yn(it), f = c.deltaY = Yn(We), b = Math.abs(m) >= r, w = Math.abs(f) >= r;
          Te && (b || w) && Te(c, m, f, it, We), b && (Re && c.deltaX > 0 && Re(c), ne && c.deltaX < 0 && ne(c), mt && mt(c), S && c.deltaX < 0 != At < 0 && S(c), At = c.deltaX, it[0] = it[1] = it[2] = 0), w && (Ke && c.deltaY > 0 && Ke(c), k && c.deltaY < 0 && k(c), C && C(c), Ot && c.deltaY < 0 != V < 0 && Ot(c), V = c.deltaY, We[0] = We[1] = We[2] = 0), (be || I) && (Ye && Ye(c), I && (Qe(c), I = !1), be = !1), kt && !(kt = !1) && Dr && Dr(c), nt && (ge(c), nt = !1), rt = 0;
        }, hr = function(m, f, b) {
          it[b] += m, We[b] += f, c._vx.update(m), c._vy.update(f), x ? rt || (rt = requestAnimationFrame(Gt)) : Gt();
        }, er = function(m, f) {
          Xe && !Be && (c.axis = Be = Math.abs(m) > Math.abs(f) ? "x" : "y", kt = !0), Be !== "y" && (it[2] += m, c._vx.update(m, !0)), Be !== "x" && (We[2] += f, c._vy.update(f, !0)), x ? rt || (rt = requestAnimationFrame(Gt)) : Gt();
        }, tr = function(m) {
          if (!Ct(m, 1)) {
            m = mr(m, L);
            var f = m.clientX, b = m.clientY, w = f - c.x, P = b - c.y, me = c.isDragging;
            c.x = f, c.y = b, (me || Math.abs(c.startX - f) >= i || Math.abs(c.startY - b) >= i) && (Qe && (I = !0), me || (c.isDragging = !0), er(w, P), me || re && re(c));
          }
        }, O = c.onPress = function(E) {
          Ct(E, 1) || E && E.button || (c.axis = Be = null, ft.pause(), c.isPressed = !0, E = mr(E), At = V = 0, c.startX = c.x = E.clientX, c.startY = c.y = E.clientY, c._vx.reset(), c._vy.reset(), Ve(he ? s : ie, Z[1], tr, L, !0), c.deltaX = c.deltaY = 0, ee && ee(c));
        }, zt = c.onRelease = function(E) {
          if (!Ct(E, 1)) {
            Oe(he ? s : ie, Z[1], tr, !0);
            var m = !isNaN(c.y - c.startY), f = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), b = mr(E);
            !f && m && (c._vx.reset(), c._vy.reset(), L && Me && M.delayedCall(0.08, function() {
              if (Ee() - Ar > 300 && !E.defaultPrevented) {
                if (E.target.click)
                  E.target.click();
                else if (ie.createEvent) {
                  var w = ie.createEvent("MouseEvents");
                  w.initMouseEvent("click", !0, !0, F, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(w);
                }
              }
            })), c.isDragging = c.isGesturing = c.isPressed = !1, Y && !he && ft.restart(!0), W && f && W(c), z && z(c, f);
          }
        }, wt = function(m) {
          return m.touches && m.touches.length > 1 && (c.isGesturing = !0) && ce(m, c.isDragging);
        }, yt = function() {
          return (c.isGesturing = !1) || l(c);
        }, dt = function(m) {
          if (!Ct(m)) {
            var f = Ht(), b = Wt();
            hr((f - pr) * Bt, (b - He) * Bt, 1), pr = f, He = b, Y && ft.restart(!0);
          }
        }, xt = function(m) {
          if (!Ct(m)) {
            m = mr(m, L), ge && (nt = !0);
            var f = (m.deltaMode === 1 ? d : m.deltaMode === 2 ? F.innerHeight : 1) * v;
            hr(m.deltaX * f, m.deltaY * f, 0), Y && !he && ft.restart(!0);
          }
        }, rr = function(m) {
          if (!Ct(m)) {
            var f = m.clientX, b = m.clientY, w = f - c.x, P = b - c.y;
            c.x = f, c.y = b, be = !0, (w || P) && er(w, P);
          }
        }, gr = function(m) {
          c.event = m, ke(c);
        }, It = function(m) {
          c.event = m, Le(c);
        }, Ir = function(m) {
          return Ct(m) || mr(m, L) && ut(c);
        };
        ft = c._dc = M.delayedCall(g || 0.25, zr).pause(), c.deltaX = c.deltaY = 0, c._vx = un(0, 50, !0), c._vy = un(0, 50, !0), c.scrollX = Ht, c.scrollY = Wt, c.isDragging = c.isGesturing = c.isPressed = !1, Rt(this), c.enable = function(E) {
          return c.isEnabled || (Ve(Nt ? ie : s, "scroll", cn), a.indexOf("scroll") >= 0 && Ve(Nt ? ie : s, "scroll", dt, L, q), a.indexOf("wheel") >= 0 && Ve(s, "wheel", xt, L, q), (a.indexOf("touch") >= 0 && st || a.indexOf("pointer") >= 0) && (Ve(s, Z[0], O, L, q), Ve(ie, Z[2], zt), Ve(ie, Z[3], zt), Me && Ve(s, "click", Ne, !1, !0), ut && Ve(s, "click", Ir), ce && Ve(ie, "gesturestart", wt), l && Ve(ie, "gestureend", yt), ke && Ve(s, Ze + "enter", gr), Le && Ve(s, Ze + "leave", It), Ye && Ve(s, Ze + "move", rr)), c.isEnabled = !0, E && E.type && O(E), Jt && Jt(c)), c;
        }, c.disable = function() {
          c.isEnabled && (St.filter(function(E) {
            return E !== c && br(E.target);
          }).length || Oe(Nt ? ie : s, "scroll", cn), c.isPressed && (c._vx.reset(), c._vy.reset(), Oe(he ? s : ie, Z[1], tr, !0)), Oe(Nt ? ie : s, "scroll", dt, q), Oe(s, "wheel", xt, q), Oe(s, Z[0], O, q), Oe(ie, Z[2], zt), Oe(ie, Z[3], zt), Oe(s, "click", Ne, !0), Oe(s, "click", Ir), Oe(ie, "gesturestart", wt), Oe(ie, "gestureend", yt), Oe(s, Ze + "enter", gr), Oe(s, Ze + "leave", It), Oe(s, Ze + "move", rr), c.isEnabled = c.isPressed = c.isDragging = !1, Xt && Xt(c));
        }, c.kill = c.revert = function() {
          c.disable();
          var E = St.indexOf(c);
          E >= 0 && St.splice(E, 1), Ue === c && (Ue = 0);
        }, St.push(c), he && br(s) && (Ue = c), c.enable($);
      }, j(o, [{
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
      return St.slice();
    }, ae.getById = function(o) {
      return St.filter(function(e) {
        return e.vars.id === o;
      })[0];
    }, ht() && M.registerPlugin(ae);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var p, sr, A, U, _t, J, Hn, Wr, Nr, lr, Gr, $r, Pe, qr, fn, ze, Wn, Nn, ar, Gn, dn, $n, Je, qn, Un, Vn, Lt, pn, hn, gn, Ur = 1, Ie = Date.now, _n = Ie(), at = 0, wr = 0, Si = function o() {
      return wr && requestAnimationFrame(o);
    }, jn = function() {
      return qr = 1;
    }, Qn = function() {
      return qr = 0;
    }, Tt = function(e) {
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
      return gt(e, "getBoundingClientRect") || (qt(e) ? function() {
        return ln.width = A.innerWidth, ln.height = A.innerHeight, ln;
      } : function() {
        return Mt(e);
      });
    }, Ti = function(e, n, t) {
      var r = t.d, i = t.d2, a = t.a;
      return (a = gt(e, "getBoundingClientRect")) ? function() {
        return a()[r];
      } : function() {
        return (n ? A["inner" + i] : e["client" + i]) || 0;
      };
    }, ki = function(e, n) {
      return !n || ~B.indexOf(e) ? Jn(e) : function() {
        return ln;
      };
    }, Yt = function(e, n) {
      var t = n.s, r = n.d2, i = n.d, a = n.a;
      return Math.max(0, (t = "scroll" + r) && (a = gt(e, t)) ? a() - Jn(e)()[i] : qt(e) ? (_t[t] || J[t]) - (A["inner" + r] || _t["client" + r] || J["client" + r]) : e[t] - e["offset" + r]);
    }, Vr = function(e, n) {
      for (var t = 0; t < ar.length; t += 3)
        (!n || ~n.indexOf(ar[t + 1])) && e(ar[t], ar[t + 1], ar[t + 2]);
    }, vt = function(e) {
      return typeof e == "string";
    }, Fe = function(e) {
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
    }, cr = Math.abs, ei = "left", ti = "top", bn = "right", mn = "bottom", Ut = "width", Vt = "height", Tr = "Right", kr = "Left", Cr = "Top", Er = "Bottom", te = "padding", ct = "margin", ur = "Width", wn = "Height", Se = "px", bt = function(e) {
      return A.getComputedStyle(e);
    }, Ci = function(e) {
      var n = bt(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, ri = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Mt = function(e, n) {
      var t = n && bt(e)[fn] !== "matrix(1, 0, 0, 1, 0, 0)" && p.to(e, {
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
    }, Pi = function(e) {
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
      if (vt(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in Jr ? Jr[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, tn = function(e, n, t, r, i, a, s, d) {
      var x = i.startColor, L = i.endColor, Y = i.fontSize, g = i.indent, u = i.fontWeight, v = U.createElement("div"), $ = qt(t) || gt(t, "pinType") === "fixed", re = e.indexOf("scroller") !== -1, W = $ ? J : t, Qe = e.indexOf("start") !== -1, ee = Qe ? x : L, z = "border-color:" + ee + ";font-size:" + Y + ";color:" + ee + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return z += "position:" + ((re || d) && $ ? "fixed;" : "absolute;"), (re || d || !$) && (z += (r === pe ? bn : mn) + ":" + (a + parseFloat(g)) + "px;"), s && (z += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), v._isStart = Qe, v.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), v.style.cssText = z, v.innerText = n || n === 0 ? e + "-" + n : e, W.children[0] ? W.insertBefore(v, W.children[0]) : W.appendChild(v), v._offset = v["offset" + r.op.d2], rn(v, 0, r, Qe), v;
    }, rn = function(e, n, t, r) {
      var i = {
        display: "block"
      }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
      e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + a + ur] = 1, i["border" + s + ur] = 0, i[t.p] = n + "px", p.set(e, i);
    }, R = [], Sn = {}, Pr, oi = function() {
      return Ie() - at > 34 && (Pr || (Pr = requestAnimationFrame(Dt)));
    }, fr = function() {
      (!Je || !Je.isPressed || Je.startX > J.clientWidth) && (T.cache++, Je ? Pr || (Pr = requestAnimationFrame(Dt)) : Dt(), at || Qt("scrollStart"), at = Ie());
    }, Tn = function() {
      Vn = A.innerWidth, Un = A.innerHeight;
    }, Rr = function() {
      T.cache++, !Pe && !$n && !U.fullscreenElement && !U.webkitFullscreenElement && (!qn || Vn !== A.innerWidth || Math.abs(A.innerHeight - Un) > A.innerHeight * 0.25) && Wr.restart(!0);
    }, jt = {}, Ri = [], si = function o() {
      return ve(D, "scrollEnd", o) || Zt(!0);
    }, Qt = function(e) {
      return jt[e] && jt[e].map(function(n) {
        return n();
      }) || Ri;
    }, et = [], li = function(e) {
      for (var n = 0; n < et.length; n += 5)
        (!e || et[n + 4] && et[n + 4].query === e) && (et[n].style.cssText = et[n + 1], et[n].getBBox && et[n].setAttribute("transform", et[n + 2] || ""), et[n + 3].uncache = 1);
    }, kn = function(e, n) {
      var t;
      for (ze = 0; ze < R.length; ze++)
        t = R[ze], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && li(n), n || Qt("revert");
    }, ai = function(e, n) {
      T.cache++, (n || !tt) && T.forEach(function(t) {
        return Fe(t) && t.cacheID++ && (t.rec = 0);
      }), vt(e) && (A.history.scrollRestoration = hn = e);
    }, tt, Kt = 0, ci, Mi = function() {
      if (ci !== Kt) {
        var e = ci = Kt;
        requestAnimationFrame(function() {
          return e === Kt && Zt(!0);
        });
      }
    }, Zt = function(e, n) {
      if (at && !e) {
        _e(D, "scrollEnd", si);
        return;
      }
      tt = D.isRefreshing = !0, T.forEach(function(r) {
        return Fe(r) && r.cacheID++ && (r.rec = r());
      });
      var t = Qt("refreshInit");
      Gn && D.sort(), n || kn(), T.forEach(function(r) {
        Fe(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
      }), R.slice(0).forEach(function(r) {
        return r.refresh();
      }), R.forEach(function(r, i) {
        if (r._subPinOffset && r.pin) {
          var a = r.vars.horizontal ? "offsetWidth" : "offsetHeight", s = r.pin[a];
          r.revert(!0, 1), r.adjustPinSpacing(r.pin[a] - s), r.refresh();
        }
      }), R.forEach(function(r) {
        return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, Yt(r.scroller, r._dir)));
      }), t.forEach(function(r) {
        return r && r.render && r.render(-1);
      }), T.forEach(function(r) {
        Fe(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), ai(hn, 1), Wr.pause(), Kt++, tt = 2, Dt(2), R.forEach(function(r) {
        return Fe(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), tt = D.isRefreshing = !1, Qt("refresh");
    }, Cn = 0, nn = 1, Mr, Dt = function(e) {
      if (!tt || e === 2) {
        D.isUpdating = !0, Mr && Mr.update(0);
        var n = R.length, t = Ie(), r = t - _n >= 50, i = n && R[0].scroll();
        if (nn = Cn > i ? -1 : 1, tt || (Cn = i), r && (at && !qr && t - at > 200 && (at = 0, Qt("scrollEnd")), Gr = _n, _n = t), nn < 0) {
          for (ze = n; ze-- > 0; )
            R[ze] && R[ze].update(0, r);
          nn = 1;
        } else
          for (ze = 0; ze < n; ze++)
            R[ze] && R[ze].update(0, r);
        D.isUpdating = !1;
      }
      Pr = 0;
    }, En = [ei, ti, mn, bn, ct + Er, ct + Tr, ct + Cr, ct + kr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], on = En.concat([Ut, Vt, "boxSizing", "max" + ur, "max" + wn, "position", ct, te, te + Cr, te + Tr, te + Er, te + kr]), Di = function(e, n, t) {
      dr(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        dr(r.spacerState);
      else if (e._gsap.swappedIn) {
        var i = n.parentNode;
        i && (i.insertBefore(e, n), i.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, Pn = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var i = En.length, a = n.style, s = e.style, d; i--; )
          d = En[i], a[d] = t[d];
        a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[mn] = s[bn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Ut] = yn(e, Ae) + Se, a[Vt] = yn(e, pe) + Se, a[te] = s[ct] = s[ti] = s[ei] = "0", dr(r), s[Ut] = s["max" + ur] = t[Ut], s[Vt] = s["max" + wn] = t[Vt], s[te] = t[te], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
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
    }, ui = function(e, n, t, r, i, a, s, d, x, L, Y, g, u) {
      Fe(e) && (e = e(d)), vt(e) && e.substr(0, 3) === "max" && (e = g + (e.charAt(4) === "=" ? en("0" + e.substr(3), t) : 0));
      var v = u ? u.time() : 0, $, re, W;
      if (u && u.seek(0), xr(e))
        u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, g, e)), s && rn(s, t, r, !0);
      else {
        Fe(n) && (n = n(d));
        var Qe = (e || "0").split(" "), ee, z, Re, ne;
        W = je(n) || J, ee = Mt(W) || {}, (!ee || !ee.left && !ee.top) && bt(W).display === "none" && (ne = W.style.display, W.style.display = "block", ee = Mt(W), ne ? W.style.display = ne : W.style.removeProperty("display")), z = en(Qe[0], ee[r.d]), Re = en(Qe[1] || "0", t), e = ee[r.p] - x[r.p] - L + z + i - Re, s && rn(s, Re, r, t - Re < 20 || s._isStart && Re > 20), t -= t - Re;
      }
      if (a) {
        var k = e + t, Ke = a._isStart;
        $ = "scroll" + r.d2, rn(a, k, r, Ke && k > 20 || !Ke && (Y ? Math.max(J[$], _t[$]) : a.parentNode[$]) <= k + 1), Y && (x = Mt(s), Y && (a.style[r.op.p] = x[r.op.p] - r.op.m - a._offset + Se));
      }
      return u && W && ($ = Mt(W), u.seek(g), re = Mt(W), u._caScrollDist = $[r.p] - re[r.p], e = e / u._caScrollDist * g), u && u.seek(v), u ? e : Math.round(e);
    }, zi = /(webkit|moz|length|cssText|inset)/i, fi = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var i = e.style, a, s;
        if (n === J) {
          e._stOrig = i.cssText, s = bt(e);
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
      var t = Ft(e, n), r = "_scroll" + n.p2, i = function a(s, d, x, L, Y) {
        var g = a.tween, u = d.onComplete, v = {};
        x = x || t();
        var $ = di(t, x, function() {
          g.kill(), a.tween = 0;
        });
        return Y = L && Y || 0, L = L || s - x, g && g.kill(), d[r] = s, d.modifiers = v, v[r] = function() {
          return $(x + L * g.ratio + Y * g.ratio * g.ratio);
        }, d.onUpdate = function() {
          T.cache++, Dt();
        }, d.onComplete = function() {
          a.tween = 0, u && u.call(g);
        }, g = a.tween = p.to(e, d), g;
      };
      return e[r] = t, t.wheelHandler = function() {
        return i.tween && i.tween.kill() && (i.tween = 0);
      }, _e(e, "wheel", t.wheelHandler), D.isTouch && _e(e, "touchmove", t.wheelHandler), i;
    }, D = function() {
      function o(n, t) {
        sr || o.register(p) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = o.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !wr) {
          this.update = this.refresh = this.kill = Tt;
          return;
        }
        t = ri(vt(t) || xr(t) || t.nodeType ? {
          trigger: t
        } : t, Zr);
        var i = t, a = i.onUpdate, s = i.toggleClass, d = i.id, x = i.onToggle, L = i.onRefresh, Y = i.scrub, g = i.trigger, u = i.pin, v = i.pinSpacing, $ = i.invalidateOnRefresh, re = i.anticipatePin, W = i.onScrubComplete, Qe = i.onSnapComplete, ee = i.once, z = i.snap, Re = i.pinReparent, ne = i.pinSpacer, k = i.containerAnimation, Ke = i.fastScrollEnd, mt = i.preventOverlaps, C = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ae : pe, Te = !Y && Y !== 0, S = je(t.scroller || A), Ot = p.core.getCache(S), ke = qt(S), Le = ("pinType" in t ? t.pinType : gt(S, "pinType") || ke && "fixed") === "fixed", Ye = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], N = Te && t.toggleActions.split(" "), he = "markers" in t ? t.markers : Zr.markers, ce = ke ? 0 : parseFloat(bt(S)["border" + C.p2 + ur]) || 0, l = this, ge = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, Jt = Ti(S, ke, C), Xt = ki(S, ke), ut = 0, Bt = 0, q = Ft(S, C), Me, Xe, Dr, rt, ft, I, be, nt, kt, Be, c, At, V, Ht, Wt, pr, He, Or, Nt, ie, it, We, Ar, Ne, Ct, zr, Gt, hr, er, tr, O, zt, wt, yt, dt, xt, rr, gr, It;
        if (pn(l), l._dir = C, re *= 45, l.scroller = S, l.scroll = k ? k.time.bind(k) : q, rt = q(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Gn = 1, t.refreshPriority === -9999 && (Mr = l)), Ot.tweenScroll = Ot.tweenScroll || {
          top: pi(S, pe),
          left: pi(S, Ae)
        }, l.tweenTo = Me = Ot.tweenScroll[C.p], l.scrubDuration = function(f) {
          zt = xr(f) && f, zt ? O ? O.duration(f) : O = p.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: zt,
            paused: !0,
            onComplete: function() {
              return W && W(l);
            }
          }) : (O && O.progress(1).kill(), O = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(Y), O && O.resetTo && O.resetTo("totalProgress", 0), er = 0, d || (d = r.vars.id)), R.push(l), z && ((!jr(z) || z.push) && (z = {
          snapTo: z
        }), "scrollBehavior" in J.style && p.set(ke ? [J, _t] : S, {
          scrollBehavior: "auto"
        }), T.forEach(function(f) {
          return Fe(f) && f.target === (ke ? U.scrollingElement || _t : S) && (f.smooth = !1);
        }), Dr = Fe(z.snapTo) ? z.snapTo : z.snapTo === "labels" ? Ei(r) : z.snapTo === "labelsDirectional" ? Pi(r) : z.directional !== !1 ? function(f, b) {
          return xn(z.snapTo)(f, Ie() - Bt < 500 ? 0 : b.direction);
        } : p.utils.snap(z.snapTo), wt = z.duration || {
          min: 0.1,
          max: 2
        }, wt = jr(wt) ? lr(wt.min, wt.max) : lr(wt, wt), yt = p.delayedCall(z.delay || zt / 2 || 0.1, function() {
          var f = q(), b = Ie() - Bt < 500, w = Me.tween;
          if ((b || Math.abs(l.getVelocity()) < 10) && !w && !qr && ut !== f) {
            var P = (f - I) / V, me = r && !Te ? r.totalProgress() : P, H = b ? 0 : (me - tr) / (Ie() - Gr) * 1e3 || 0, Q = p.utils.clamp(-P, 1 - P, cr(H / 2) * H / 0.185), Ce = P + (z.inertia === !1 ? 0 : Q), we = lr(0, 1, Dr(Ce, l)), ue = Math.round(I + we * V), K = z, ot = K.onStart, Ge = K.onInterrupt, ye = K.onComplete;
            if (f <= be && f >= I && ue !== f) {
              if (w && !w._initted && w.data <= cr(ue - f))
                return;
              z.inertia === !1 && (Q = we - P), Me(ue, {
                duration: wt(cr(Math.max(cr(Ce - me), cr(we - me)) * 0.185 / H / 0.05 || 0)),
                ease: z.ease || "power3",
                data: cr(ue - f),
                onInterrupt: function() {
                  return yt.restart(!0) && Ge && Ge(l);
                },
                onComplete: function() {
                  l.update(), ut = q(), er = tr = r && !Te ? r.totalProgress() : l.progress, Qe && Qe(l), ye && ye(l);
                }
              }, f, Q * V, ue - f - Q * V), ot && ot(l, Me.tween);
            }
          } else
            l.isActive && ut !== f && yt.restart(!0);
        }).pause()), d && (Sn[d] = l), g = l.trigger = je(g || u), It = g && g._gsap && g._gsap.stRevert, It && (It = It(l)), u = u === !0 ? g : je(u), vt(s) && (s = {
          targets: g,
          className: s
        }), u && (v === !1 || v === ct || (v = !v && u.parentNode && u.parentNode.style && bt(u.parentNode).display === "flex" ? !1 : te), l.pin = u, Xe = p.core.getCache(u), Xe.spacer ? Ht = Xe.pinState : (ne && (ne = je(ne), ne && !ne.nodeType && (ne = ne.current || ne.nativeElement), Xe.spacerIsNative = !!ne, ne && (Xe.spacerState = sn(ne))), Xe.spacer = He = ne || U.createElement("div"), He.classList.add("pin-spacer"), d && He.classList.add("pin-spacer-" + d), Xe.pinState = Ht = sn(u)), t.force3D !== !1 && p.set(u, {
          force3D: !0
        }), l.spacer = He = Xe.spacer, hr = bt(u), Ar = hr[v + C.os2], Nt = p.getProperty(u), ie = p.quickSetter(u, C.a, Se), Pn(u, He, hr), pr = sn(u)), he) {
          At = jr(he) ? ri(he, ii) : ii, Be = tn("scroller-start", d, S, C, At, 0), c = tn("scroller-end", d, S, C, At, 0, Be), Or = Be["offset" + C.op.d2];
          var Ir = je(gt(S, "content") || S);
          nt = this.markerStart = tn("start", d, Ir, C, At, Or, 0, k), kt = this.markerEnd = tn("end", d, Ir, C, At, Or, 0, k), k && (gr = p.quickSetter([nt, kt], C.a, Se)), !Le && !(B.length && gt(S, "fixedMarkers") === !0) && (Ci(ke ? J : S), p.set([Be, c], {
            force3D: !0
          }), Ct = p.quickSetter(Be, C.a, Se), Gt = p.quickSetter(c, C.a, Se));
        }
        if (k) {
          var E = k.vars.onUpdate, m = k.vars.onUpdateParams;
          k.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), E && E.apply(k, m || []);
          });
        }
        l.previous = function() {
          return R[R.indexOf(l) - 1];
        }, l.next = function() {
          return R[R.indexOf(l) + 1];
        }, l.revert = function(f, b) {
          if (!b)
            return l.kill(!0);
          var w = f !== !1 || !l.enabled, P = Pe;
          w !== l.isReverted && (w && (xt = Math.max(q(), l.scroll.rec || 0), dt = l.progress, rr = r && r.progress()), nt && [nt, kt, Be, c].forEach(function(me) {
            return me.style.display = w ? "none" : "block";
          }), w && (Pe = l, l.update(w)), u && (!Re || !l.isActive) && (w ? Di(u, He, Ht) : Pn(u, He, bt(u), Ne)), w || l.update(w), Pe = P, l.isReverted = w);
        }, l.refresh = function(f, b) {
          if (!((Pe || !l.enabled) && !b)) {
            if (u && f && at) {
              _e(o, "scrollEnd", si);
              return;
            }
            !tt && ge && ge(l), Pe = l, Bt = Ie(), Me.tween && (Me.tween.kill(), Me.tween = 0), O && O.pause(), $ && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var w = Jt(), P = Xt(), me = k ? k.duration() : Yt(S, C), H = V <= 0.01, Q = 0, Ce = 0, we = t.end, ue = t.endTrigger || g, K = t.start || (t.start === 0 || !g ? 0 : u ? "0 0" : "0 100%"), ot = l.pinnedContainer = t.pinnedContainer && je(t.pinnedContainer), Ge = g && Math.max(0, R.indexOf(l)) || 0, ye = Ge, oe, De, _r, nr, fe, xe, Et, Mn, bi, Fr, Pt; ye--; )
              xe = R[ye], xe.end || xe.refresh(0, 1) || (Pe = l), Et = xe.pin, Et && (Et === g || Et === u || Et === ot) && !xe.isReverted && (Fr || (Fr = []), Fr.unshift(xe), xe.revert(!0, !0)), xe !== R[ye] && (Ge--, ye--);
            for (Fe(K) && (K = K(l)), I = ui(K, g, w, C, q(), nt, Be, l, P, ce, Le, me, k) || (u ? -1e-3 : 0), Fe(we) && (we = we(l)), vt(we) && !we.indexOf("+=") && (~we.indexOf(" ") ? we = (vt(K) ? K.split(" ")[0] : "") + we : (Q = en(we.substr(2), w), we = vt(K) ? K : (k ? p.utils.mapRange(0, k.duration(), k.scrollTrigger.start, k.scrollTrigger.end, I) : I) + Q, ue = g)), be = Math.max(I, ui(we || (ue ? "100% 0" : me), ue, w, C, q() + Q, kt, c, l, P, ce, Le, me, k)) || -1e-3, V = be - I || (I -= 0.01) && 1e-3, Q = 0, ye = Ge; ye--; )
              xe = R[ye], Et = xe.pin, Et && xe.start - xe._pinPush <= I && !k && xe.end > 0 && (oe = xe.end - xe.start, (Et === g && xe.start - xe._pinPush < I || Et === ot) && !xr(K) && (Q += oe * (1 - xe.progress)), Et === u && (Ce += oe));
            if (I += Q, be += Q, H && (dt = p.utils.clamp(0, 1, p.utils.normalize(I, be, xt))), l._pinPush = Ce, nt && Q && (oe = {}, oe[C.a] = "+=" + Q, ot && (oe[C.p] = "-=" + q()), p.set([nt, kt], oe)), u)
              oe = bt(u), nr = C === pe, _r = q(), it = parseFloat(Nt(C.a)) + Ce, !me && be > 1 && (Pt = (ke ? U.scrollingElement || _t : S).style, Pt = {
                style: Pt,
                value: Pt["overflow" + C.a.toUpperCase()]
              }, Pt.style["overflow" + C.a.toUpperCase()] = "scroll"), Pn(u, He, oe), pr = sn(u), De = Mt(u, !0), Mn = Le && Ft(S, nr ? Ae : pe)(), v && (Ne = [v + C.os2, V + Ce + Se], Ne.t = He, ye = v === te ? yn(u, C) + V + Ce : 0, ye && Ne.push(C.d, ye + Se), dr(Ne), ot && R.forEach(function(Lr) {
                Lr.pin === ot && Lr.vars.pinSpacing !== !1 && (Lr._subPinOffset = !0);
              }), Le && q(xt)), Le && (fe = {
                top: De.top + (nr ? _r - I : Mn) + Se,
                left: De.left + (nr ? Mn : _r - I) + Se,
                boxSizing: "border-box",
                position: "fixed"
              }, fe[Ut] = fe["max" + ur] = Math.ceil(De.width) + Se, fe[Vt] = fe["max" + wn] = Math.ceil(De.height) + Se, fe[ct] = fe[ct + Cr] = fe[ct + Tr] = fe[ct + Er] = fe[ct + kr] = "0", fe[te] = oe[te], fe[te + Cr] = oe[te + Cr], fe[te + Tr] = oe[te + Tr], fe[te + Er] = oe[te + Er], fe[te + kr] = oe[te + kr], Wt = Ai(Ht, fe, Re), tt && q(0)), r ? (bi = r._initted, dn(1), r.render(r.duration(), !0, !0), We = Nt(C.a) - it + V + Ce, zr = Math.abs(V - We) > 1, Le && zr && Wt.splice(Wt.length - 2, 2), r.render(0, !0, !0), bi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), dn(0)) : We = V, Pt && (Pt.value ? Pt.style["overflow" + C.a.toUpperCase()] = Pt.value : Pt.style.removeProperty("overflow-" + C.a));
            else if (g && q() && !k)
              for (De = g.parentNode; De && De !== J; )
                De._pinOffset && (I -= De._pinOffset, be -= De._pinOffset), De = De.parentNode;
            Fr && Fr.forEach(function(Lr) {
              return Lr.revert(!1, !0);
            }), l.start = I, l.end = be, rt = ft = tt ? xt : q(), !k && !tt && (rt < xt && q(xt), l.scroll.rec = 0), l.revert(!1, !0), yt && (ut = -1, l.isActive && q(I + V * dt), yt.restart(!0)), Pe = 0, r && Te && (r._initted || rr) && r.progress() !== rr && r.progress(rr, !0).render(r.time(), !0, !0), (H || dt !== l.progress || k) && (r && !Te && r.totalProgress(k && I < -1e-3 && !dt ? p.utils.normalize(I, be, 0) : dt, !0), l.progress = (rt - I) / V === dt ? 0 : dt), u && v && (He._pinOffset = Math.round(l.progress * We)), O && O.invalidate(), L && !tt && L(l);
          }
        }, l.getVelocity = function() {
          return (q() - ft) / (Ie() - Gr) * 1e3 || 0;
        }, l.endAnimation = function() {
          Sr(l.callbackAnimation), r && (O ? O.progress(1) : r.paused() ? Te || Sr(r, l.direction < 0, 1) : Sr(r, r.reversed()));
        }, l.labelToScroll = function(f) {
          return r && r.labels && (I || l.refresh() || I) + r.labels[f] / r.duration() * V || 0;
        }, l.getTrailing = function(f) {
          var b = R.indexOf(l), w = l.direction > 0 ? R.slice(0, b).reverse() : R.slice(b + 1);
          return (vt(f) ? w.filter(function(P) {
            return P.vars.preventOverlaps === f;
          }) : w).filter(function(P) {
            return l.direction > 0 ? P.end <= I : P.start >= be;
          });
        }, l.update = function(f, b, w) {
          if (!(k && !w && !f)) {
            var P = tt === !0 ? xt : l.scroll(), me = f ? 0 : (P - I) / V, H = me < 0 ? 0 : me > 1 ? 1 : me || 0, Q = l.progress, Ce, we, ue, K, ot, Ge, ye, oe;
            if (b && (ft = rt, rt = k ? q() : P, z && (tr = er, er = r && !Te ? r.totalProgress() : H)), re && !H && u && !Pe && !Ur && at && I < P + (P - ft) / (Ie() - Gr) * re && (H = 1e-4), H !== Q && l.enabled) {
              if (Ce = l.isActive = !!H && H < 1, we = !!Q && Q < 1, Ge = Ce !== we, ot = Ge || !!H != !!Q, l.direction = H > Q ? 1 : -1, l.progress = H, ot && !Pe && (ue = H && !Q ? 0 : H === 1 ? 1 : Q === 1 ? 2 : 3, Te && (K = !Ge && N[ue + 1] !== "none" && N[ue + 1] || N[ue], oe = r && (K === "complete" || K === "reset" || K in r))), mt && (Ge || oe) && (oe || Y || !r) && (Fe(mt) ? mt(l) : l.getTrailing(mt).forEach(function(fe) {
                return fe.endAnimation();
              })), Te || (O && !Pe && !Ur ? (O._dp._time - O._start !== O._time && O.render(O._dp._time - O._start), O.resetTo ? O.resetTo("totalProgress", H, r._tTime / r._tDur) : (O.vars.totalProgress = H, O.invalidate().restart())) : r && r.totalProgress(H, !!Pe)), u) {
                if (f && v && (He.style[v + C.os2] = Ar), !Le)
                  ie(yr(it + We * H));
                else if (ot) {
                  if (ye = !f && H > Q && be + 1 > P && P + 1 >= Yt(S, C), Re)
                    if (!f && (Ce || ye)) {
                      var De = Mt(u, !0), _r = P - I;
                      fi(u, J, De.top + (C === pe ? _r : 0) + Se, De.left + (C === pe ? 0 : _r) + Se);
                    } else
                      fi(u, He);
                  dr(Ce || ye ? Wt : pr), zr && H < 1 && Ce || ie(it + (H === 1 && !ye ? We : 0));
                }
              }
              z && !Me.tween && !Pe && !Ur && yt.restart(!0), s && (Ge || ee && H && (H < 1 || !gn)) && Nr(s.targets).forEach(function(fe) {
                return fe.classList[Ce || ee ? "add" : "remove"](s.className);
              }), a && !Te && !f && a(l), ot && !Pe ? (Te && (oe && (K === "complete" ? r.pause().totalProgress(1) : K === "reset" ? r.restart(!0).pause() : K === "restart" ? r.restart(!0) : r[K]()), a && a(l)), (Ge || !gn) && (x && Ge && vn(l, x), Ye[ue] && vn(l, Ye[ue]), ee && (H === 1 ? l.kill(!1, 1) : Ye[ue] = 0), Ge || (ue = H === 1 ? 1 : 3, Ye[ue] && vn(l, Ye[ue]))), Ke && !Ce && Math.abs(l.getVelocity()) > (xr(Ke) ? Ke : 2500) && (Sr(l.callbackAnimation), O ? O.progress(1) : Sr(r, K === "reverse" ? 1 : !H, 1))) : Te && a && !Pe && a(l);
            }
            if (Gt) {
              var nr = k ? P / k.duration() * (k._caScrollDist || 0) : P;
              Ct(nr + (Be._isFlipped ? 1 : 0)), Gt(nr);
            }
            gr && gr(-P / k.duration() * (k._caScrollDist || 0));
          }
        }, l.enable = function(f, b) {
          l.enabled || (l.enabled = !0, _e(S, "resize", Rr), _e(ke ? U : S, "scroll", fr), ge && _e(o, "refreshInit", ge), f !== !1 && (l.progress = dt = 0, rt = ft = ut = q()), b !== !1 && l.refresh());
        }, l.getTween = function(f) {
          return f && Me ? Me.tween : O;
        }, l.setPositions = function(f, b) {
          u && (it += f - I, We += b - f - V, v === te && l.adjustPinSpacing(b - f - V)), l.start = I = f, l.end = be = b, V = b - f, l.update();
        }, l.adjustPinSpacing = function(f) {
          if (Ne && f) {
            var b = Ne.indexOf(C.d) + 1;
            Ne[b] = parseFloat(Ne[b]) + f + Se, Ne[1] = parseFloat(Ne[1]) + f + Se, dr(Ne);
          }
        }, l.disable = function(f, b) {
          if (l.enabled && (f !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, b || O && O.pause(), xt = 0, Xe && (Xe.uncache = 1), ge && ve(o, "refreshInit", ge), yt && (yt.pause(), Me.tween && Me.tween.kill() && (Me.tween = 0)), !ke)) {
            for (var w = R.length; w--; )
              if (R[w].scroller === S && R[w] !== l)
                return;
            ve(S, "resize", Rr), ve(S, "scroll", fr);
          }
        }, l.kill = function(f, b) {
          l.disable(f, b), O && !b && O.kill(), d && delete Sn[d];
          var w = R.indexOf(l);
          w >= 0 && R.splice(w, 1), w === ze && nn > 0 && ze--, w = 0, R.forEach(function(P) {
            return P.scroller === l.scroller && (w = 1);
          }), w || tt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, f && r.revert({
            kill: !1
          }), b || r.kill()), nt && [nt, kt, Be, c].forEach(function(P) {
            return P.parentNode && P.parentNode.removeChild(P);
          }), Mr === l && (Mr = 0), u && (Xe && (Xe.uncache = 1), w = 0, R.forEach(function(P) {
            return P.pin === u && w++;
          }), w || (Xe.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), It && It(l), !r || !r.add || V ? l.refresh() : p.delayedCall(0.01, function() {
          return I || be || l.refresh();
        }) && (V = 0.01) && (I = be = 0), u && Mi();
      }, o.register = function(t) {
        return sr || (p = t || Zn(), Kn() && window.document && o.enable(), sr = wr), sr;
      }, o.defaults = function(t) {
        if (t)
          for (var r in t)
            Zr[r] = t[r];
        return Zr;
      }, o.disable = function(t, r) {
        wr = 0, R.forEach(function(a) {
          return a[r ? "kill" : "disable"](t);
        }), ve(A, "wheel", fr), ve(U, "scroll", fr), clearInterval($r), ve(U, "touchcancel", Tt), ve(J, "touchstart", Tt), Qr(ve, U, "pointerdown,touchstart,mousedown", jn), Qr(ve, U, "pointerup,touchend,mouseup", Qn), Wr.kill(), Vr(ve);
        for (var i = 0; i < T.length; i += 3)
          Kr(ve, T[i], T[i + 1]), Kr(ve, T[i], T[i + 2]);
      }, o.enable = function() {
        if (A = window, U = document, _t = U.documentElement, J = U.body, p && (Nr = p.utils.toArray, lr = p.utils.clamp, pn = p.core.context || Tt, dn = p.core.suppressOverwrites || Tt, hn = A.history.scrollRestoration || "auto", Cn = A.pageYOffset, p.core.globals("ScrollTrigger", o), J)) {
          wr = 1, Si(), ae.register(p), o.isTouch = ae.isTouch, Lt = ae.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(A, "wheel", fr), Hn = [A, U, _t, J], p.matchMedia ? (o.matchMedia = function(d) {
            var x = p.matchMedia(), L;
            for (L in d)
              x.add(L, d[L]);
            return x;
          }, p.addEventListener("matchMediaInit", function() {
            return kn();
          }), p.addEventListener("matchMediaRevert", function() {
            return li();
          }), p.addEventListener("matchMedia", function() {
            Zt(0, 1), Qt("matchMedia");
          }), p.matchMedia("(orientation: portrait)", function() {
            return Tn(), Tn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), Tn(), _e(U, "scroll", fr);
          var t = J.style, r = t.borderTopStyle, i = p.core.Animation.prototype, a, s;
          for (i.revert || Object.defineProperty(i, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", a = Mt(J), pe.m = Math.round(a.top + pe.sc()) || 0, Ae.m = Math.round(a.left + Ae.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), $r = setInterval(oi, 250), p.delayedCall(0.5, function() {
            return Ur = 0;
          }), _e(U, "touchcancel", Tt), _e(J, "touchstart", Tt), Qr(_e, U, "pointerdown,touchstart,mousedown", jn), Qr(_e, U, "pointerup,touchend,mouseup", Qn), fn = p.utils.checkPrefix("transform"), on.push(fn), sr = Ie(), Wr = p.delayedCall(0.2, Zt).pause(), ar = [U, "visibilitychange", function() {
            var d = A.innerWidth, x = A.innerHeight;
            U.hidden ? (Wn = d, Nn = x) : (Wn !== d || Nn !== x) && Rr();
          }, U, "DOMContentLoaded", Zt, A, "load", Zt, A, "resize", Rr], Vr(_e), R.forEach(function(d) {
            return d.enable(0, 1);
          }), s = 0; s < T.length; s += 3)
            Kr(ve, T[s], T[s + 1]), Kr(ve, T[s], T[s + 2]);
        }
      }, o.config = function(t) {
        "limitCallbacks" in t && (gn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval($r) || ($r = r) && setInterval(oi, r), "ignoreMobileResize" in t && (qn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Vr(ve) || Vr(_e, t.autoRefreshEvents || "none"), $n = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, o.scrollerProxy = function(t, r) {
        var i = je(t), a = T.indexOf(i), s = qt(i);
        ~a && T.splice(a, s ? 6 : 2), r && (s ? B.unshift(A, r, J, r, _t, r) : B.unshift(i, r));
      }, o.clearMatchMedia = function(t) {
        R.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, o.isInViewport = function(t, r, i) {
        var a = (vt(t) ? je(t) : t).getBoundingClientRect(), s = a[i ? Ut : Vt] * r || 0;
        return i ? a.right - s > 0 && a.left + s < A.innerWidth : a.bottom - s > 0 && a.top + s < A.innerHeight;
      }, o.positionInViewport = function(t, r, i) {
        vt(t) && (t = je(t));
        var a = t.getBoundingClientRect(), s = a[i ? Ut : Vt], d = r == null ? s / 2 : r in Jr ? Jr[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
        return i ? (a.left + d) / A.innerWidth : (a.top + d) / A.innerHeight;
      }, o.killAll = function(t) {
        if (R.slice(0).forEach(function(i) {
          return i.vars.id !== "ScrollSmoother" && i.kill();
        }), t !== !0) {
          var r = jt.killAll || [];
          jt = {}, r.forEach(function(i) {
            return i();
          });
        }
      }, o;
    }();
    D.version = "3.11.5", D.saveStyles = function(o) {
      return o ? Nr(o).forEach(function(e) {
        if (e && e.style) {
          var n = et.indexOf(e);
          n >= 0 && et.splice(n, 5), et.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), p.core.getCache(e), pn());
        }
      }) : et;
    }, D.revert = function(o, e) {
      return kn(!o, e);
    }, D.create = function(o, e) {
      return new D(o, e);
    }, D.refresh = function(o) {
      return o ? Rr() : (sr || D.register()) && Zt(!0);
    }, D.update = function(o) {
      return ++T.cache && Dt(o === !0 ? 2 : 0);
    }, D.clearScrollMemory = ai, D.maxScroll = function(o, e) {
      return Yt(o, e ? Ae : pe);
    }, D.getScrollFunc = function(o, e) {
      return Ft(je(o), e ? Ae : pe);
    }, D.getById = function(o) {
      return Sn[o];
    }, D.getAll = function() {
      return R.filter(function(o) {
        return o.vars.id !== "ScrollSmoother";
      });
    }, D.isScrolling = function() {
      return !!at;
    }, D.snapDirectional = xn, D.addEventListener = function(o, e) {
      var n = jt[o] || (jt[o] = []);
      ~n.indexOf(e) || n.push(e);
    }, D.removeEventListener = function(o, e) {
      var n = jt[o], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, D.batch = function(o, e) {
      var n = [], t = {}, r = e.interval || 0.016, i = e.batchMax || 1e9, a = function(x, L) {
        var Y = [], g = [], u = p.delayedCall(r, function() {
          L(Y, g), Y = [], g = [];
        }).pause();
        return function(v) {
          Y.length || u.restart(!0), Y.push(v.trigger), g.push(v), i <= Y.length && u.progress(1);
        };
      }, s;
      for (s in e)
        t[s] = s.substr(0, 2) === "on" && Fe(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
      return Fe(i) && (i = i(), _e(D, "refresh", function() {
        return i = e.batchMax();
      })), Nr(o).forEach(function(d) {
        var x = {};
        for (s in t)
          x[s] = t[s];
        x.trigger = d, n.push(D.create(x));
      }), n;
    };
    var hi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, Rn = function o(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (ae.isTouch ? " pinch-zoom" : "") : "none", e === _t && o(J, n);
    }, an = {
      auto: 1,
      scroll: 1
    }, Ii = function(e) {
      var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, a = i._gsap || p.core.getCache(i), s = Ie(), d;
      if (!a._isScrollT || s - a._isScrollT > 2e3) {
        for (; i && i !== J && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(an[(d = bt(i)).overflowY] || an[d.overflowX])); )
          i = i.parentNode;
        a._isScroll = i && i !== t && !qt(i) && (an[(d = bt(i)).overflowY] || an[d.overflowX]), a._isScrollT = s;
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
          return t && _e(U, ae.eventTypes[0], vi, !1, !0);
        },
        onDisable: function() {
          return ve(U, ae.eventTypes[0], vi, !0);
        }
      });
    }, Fi = /(input|label|select|textarea)/i, _i, vi = function(e) {
      var n = Fi.test(e.target.tagName);
      (n || _i) && (e._gsapAllow = !0, _i = n);
    }, Li = function(e) {
      jr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, a = n.onRelease, s, d, x = je(e.target) || _t, L = p.core.globals().ScrollSmoother, Y = L && L.get(), g = Lt && (e.content && je(e.content) || Y && e.content !== !1 && !Y.smooth() && Y.content()), u = Ft(x, pe), v = Ft(x, Ae), $ = 1, re = (ae.isTouch && A.visualViewport ? A.visualViewport.scale * A.visualViewport.width : A.outerWidth) / A.innerWidth, W = 0, Qe = Fe(r) ? function() {
        return r(s);
      } : function() {
        return r || 2.8;
      }, ee, z, Re = gi(x, e.type, !0, i), ne = function() {
        return z = !1;
      }, k = Tt, Ke = Tt, mt = function() {
        d = Yt(x, pe), Ke = lr(Lt ? 1 : 0, d), t && (k = lr(0, Yt(x, Ae))), ee = Kt;
      }, C = function() {
        g._gsap.y = yr(parseFloat(g._gsap.y) + u.offset) + "px", g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
      }, Te = function() {
        if (z) {
          requestAnimationFrame(ne);
          var he = yr(s.deltaY / 2), ce = Ke(u.v - he);
          if (g && ce !== u.v + u.offset) {
            u.offset = ce - u.v;
            var l = yr((parseFloat(g && g._gsap.y) || 0) - u.offset);
            g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", g._gsap.y = l + "px", u.cacheID = T.cache, Dt();
          }
          return !0;
        }
        u.offset && C(), z = !0;
      }, S, Ot, ke, Le, Ye = function() {
        mt(), S.isActive() && S.vars.scrollY > d && (u() > d ? S.progress(1) && u(d) : S.resetTo("scrollY", d));
      };
      return g && p.set(g, {
        y: "+=0"
      }), e.ignoreCheck = function(N) {
        return Lt && N.type === "touchmove" && Te() || $ > 1.05 && N.type !== "touchstart" || s.isGesturing || N.touches && N.touches.length > 1;
      }, e.onPress = function() {
        z = !1;
        var N = $;
        $ = yr((A.visualViewport && A.visualViewport.scale || 1) / re), S.pause(), N !== $ && Rn(x, $ > 1.01 ? !0 : t ? !1 : "x"), Ot = v(), ke = u(), mt(), ee = Kt;
      }, e.onRelease = e.onGestureStart = function(N, he) {
        if (u.offset && C(), !he)
          Le.restart(!0);
        else {
          T.cache++;
          var ce = Qe(), l, ge;
          t && (l = v(), ge = l + ce * 0.05 * -N.velocityX / 0.227, ce *= hi(v, l, ge, Yt(x, Ae)), S.vars.scrollX = k(ge)), l = u(), ge = l + ce * 0.05 * -N.velocityY / 0.227, ce *= hi(u, l, ge, Yt(x, pe)), S.vars.scrollY = Ke(ge), S.invalidate().duration(ce).play(0.01), (Lt && S.vars.scrollY >= d || l >= d - 1) && p.to({}, {
            onUpdate: Ye,
            duration: ce
          });
        }
        a && a(N);
      }, e.onWheel = function() {
        S._ts && S.pause(), Ie() - W > 1e3 && (ee = 0, W = Ie());
      }, e.onChange = function(N, he, ce, l, ge) {
        if (Kt !== ee && mt(), he && t && v(k(l[2] === he ? Ot + (N.startX - N.x) : v() + he - l[1])), ce) {
          u.offset && C();
          var Jt = ge[2] === ce, Xt = Jt ? ke + N.startY - N.y : u() + ce - ge[1], ut = Ke(Xt);
          Jt && Xt !== ut && (ke += ut - Xt), u(ut);
        }
        (ce || he) && Dt();
      }, e.onEnable = function() {
        Rn(x, t ? !1 : "x"), D.addEventListener("refresh", Ye), _e(A, "resize", Ye), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = v.smooth = !1), Re.enable();
      }, e.onDisable = function() {
        Rn(x, !0), ve(A, "resize", Ye), D.removeEventListener("refresh", Ye), Re.kill();
      }, e.lockAxis = e.lockAxis !== !1, s = new ae(e), s.iOS = Lt, Lt && !u() && u(1), Lt && p.ticker.add(Tt), Le = s._dc, S = p.to(s, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: di(u, u(), function() {
            return S.pause();
          })
        },
        onUpdate: Dt,
        onComplete: Le.vars.onComplete
      }), s;
    };
    D.sort = function(o) {
      return R.sort(o || function(e, n) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
      });
    }, D.observe = function(o) {
      return new ae(o);
    }, D.normalizeScroll = function(o) {
      if (typeof o > "u")
        return Je;
      if (o === !0 && Je)
        return Je.enable();
      if (o === !1)
        return Je && Je.kill();
      var e = o instanceof ae ? o : Li(o);
      return Je && Je.target === e.target && Je.kill(), qt(e.target) && (Je = e), e;
    }, D.core = {
      _getVelocityProp: un,
      _inputObserver: gi,
      _scrollers: T,
      _proxies: B,
      bridge: {
        ss: function() {
          at || Qt("scrollStart"), at = Ie();
        },
        ref: function() {
          return Pe;
        }
      }
    }, Zn() && p.registerPlugin(D), _.ScrollTrigger = D, _.default = D, typeof window > "u" || window !== _ ? Object.defineProperty(_, "__esModule", { value: !0 }) : delete window.default;
  });
})(In, In.exports);
var yi = In.exports;
$e.registerPlugin(yi.ScrollTrigger);
class xi {
  constructor(h, _ = {}) {
    X(this, "target");
    X(this, "motion");
    X(this, "speed");
    X(this, "velocity");
    X(this, "direction");
    X(this, "scrollTrigger", yi.ScrollTrigger.create({}));
    this.speed = _.speed ?? 1, this.velocity = _.velocity ?? 0, this.direction = _.direction || "rtl", this.onUpdate = _.onUpdate, this.onCreated = _.onCreated, this.target = h instanceof Function ? h() : h, this.motion = new vr(() => {
      var Ue;
      let G = null;
      typeof h == "string" ? G = document.querySelector(h) : h instanceof HTMLElement && (G = h);
      const j = G == null ? void 0 : G.querySelector(".owow-marquee-outer"), M = j == null ? void 0 : j.querySelector(".owow-marquee-inner");
      if (!G || !j || !M) {
        console.error("Invalid marquee DOM structure", {
          targetContainer: G,
          outerContainer: j,
          innerContainer: M
        });
        return;
      }
      $e.set(M, { display: "inline-flex" });
      const se = G.getBoundingClientRect(), F = M.getBoundingClientRect(), le = se.width + F.width, de = document.createDocumentFragment(), qe = [];
      let st = F.width;
      for (; st <= le; ) {
        const Z = M.cloneNode(!0);
        st += F.width, qe.push(Z);
      }
      de.append(...qe), j.append(de);
      const Ze = $e.context(() => {
        $e.set(j, {
          x: 0,
          force3D: !0,
          width: st,
          display: "flex",
          flexWrap: "nowrap"
        });
      }), pt = $e.utils.pipe(
        (Z) => Math.floor(Z * 1e3) / 1e3,
        $e.quickSetter(j, "x", "px")
      ), ir = $e.ticker.add((Z, Rt) => {
        var gt;
        let ht = 1;
        switch (this.direction) {
          case "ltr":
            ht = -1;
            break;
          case "rtl":
            ht = 1;
            break;
          case "scroll":
            ht = this.scrollTrigger.direction ?? 1;
            break;
          case "scroll-reverse":
            ht = -this.scrollTrigger.direction;
        }
        const $t = this.scrollTrigger.getVelocity() ?? 0, St = $t * (typeof this.velocity == "number" ? this.velocity : this.velocity($t)) * Rt, T = $e.getProperty(j, "x"), Ee = this.speed * $e.ticker.deltaRatio() * -ht - St, lt = $e.utils.wrap(0, -F.width, T + Ee), or = $e.utils.normalize(0, -F.width, lt);
        pt(lt), (gt = this.onUpdate) == null || gt.call(this, or);
      });
      return (Ue = this.onCreated) == null || Ue.call(this), () => {
        var Z;
        for (Ze.kill(!0), $e.ticker.remove(ir); qe.length; )
          (Z = qe.pop()) == null || Z.remove();
      };
    });
  }
  static create(h, _ = {}) {
    return new xi(h, _);
  }
}
export {
  xi as Marquee,
  vr as Motion,
  On as Pointer
};
