import { fromEvent as On, debounceTime as Li, Observable as Fi } from "rxjs";
import qe from "gsap";
var Fr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yi(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var Xi = "Expected a function", gi = 0 / 0, Bi = "[object Symbol]", Hi = /^\s+|\s+$/g, Ni = /^[-+]0x[0-9a-f]+$/i, Wi = /^0b[01]+$/i, Gi = /^0o[0-7]+$/i, $i = parseInt, qi = typeof Fr == "object" && Fr && Fr.Object === Object && Fr, Ui = typeof self == "object" && self && self.Object === Object && self, Vi = qi || Ui || Function("return this")(), ji = Object.prototype, Qi = ji.toString, Ki = Math.max, Zi = Math.min, Rn = function() {
  return Vi.Date.now();
};
function Ji(v, S, k) {
  var G, Y, b, pe, C, N, he = 0, Ae = !1, dt = !1, Ue = !0;
  if (typeof v != "function")
    throw new TypeError(Xi);
  S = _i(S) || 0, Dn(k) && (Ae = !!k.leading, dt = "maxWait" in k, b = dt ? Ki(_i(k.maxWait) || 0, S) : b, Ue = "trailing" in k ? !!k.trailing : Ue);
  function Ve(F) {
    var xe = G, st = Y;
    return G = Y = void 0, he = F, pe = v.apply(st, xe), pe;
  }
  function Et(F) {
    return he = F, C = setTimeout(Pt, S), Ae ? Ve(F) : pe;
  }
  function Ze(F) {
    var xe = F - N, st = F - he, Lt = S - xe;
    return dt ? Zi(Lt, b - st) : Lt;
  }
  function Ee(F) {
    var xe = F - N, st = F - he;
    return N === void 0 || xe >= S || xe < 0 || dt && st >= b;
  }
  function Pt() {
    var F = Rn();
    if (Ee(F))
      return Ut(F);
    C = setTimeout(Pt, Ze(F));
  }
  function Ut(F) {
    return C = void 0, Ue && G ? Ve(F) : (G = Y = void 0, pe);
  }
  function yt() {
    C !== void 0 && clearTimeout(C), he = 0, G = N = Y = C = void 0;
  }
  function pt() {
    return C === void 0 ? pe : Ut(Rn());
  }
  function m() {
    var F = Rn(), xe = Ee(F);
    if (G = arguments, Y = this, N = F, xe) {
      if (C === void 0)
        return Et(N);
      if (dt)
        return C = setTimeout(Pt, S), Ve(N);
    }
    return C === void 0 && (C = setTimeout(Pt, S)), pe;
  }
  return m.cancel = yt, m.flush = pt, m;
}
function Dn(v) {
  var S = typeof v;
  return !!v && (S == "object" || S == "function");
}
function eo(v) {
  return !!v && typeof v == "object";
}
function to(v) {
  return typeof v == "symbol" || eo(v) && Qi.call(v) == Bi;
}
function _i(v) {
  if (typeof v == "number")
    return v;
  if (to(v))
    return gi;
  if (Dn(v)) {
    var S = typeof v.valueOf == "function" ? v.valueOf() : v;
    v = Dn(S) ? S + "" : S;
  }
  if (typeof v != "string")
    return v === 0 ? v : +v;
  v = v.replace(Hi, "");
  var k = Wi.test(v);
  return k || Gi.test(v) ? $i(v.slice(2), k ? 2 : 8) : Ni.test(v) ? gi : +v;
}
var ro = Ji;
const no = /* @__PURE__ */ Yi(ro), vi = class {
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
  constructor(v, S = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = no(
      () => {
        var k;
        (k = this.cleanup) == null || k.call(this), requestAnimationFrame(() => {
          var G;
          this.cleanup = ((G = this.create) == null ? void 0 : G.call(this, this)) ?? void 0;
        });
      },
      vi.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var k, G;
      (k = this.cleanup) == null || k.call(this), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const Y of Object.keys(this.meta))
        delete this.meta[Y];
      for (; this.subscriptions.length; )
        (G = this.subscriptions.pop()) == null || G.unsubscribe();
    }, this.observeMedia(S.watchMedia), this.observeResize(S.shouldResetOnResize), this.create = () => {
      var Y, b;
      return [((Y = S.enable) == null ? void 0 : Y.call(S)) ?? !0, ((b = this.mediaQueryList) == null ? void 0 : b.matches) ?? !0].every(
        Boolean
      ) ? v(this) : void 0;
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
  static applyDeltaRatio(v) {
    return v * qe.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(v) {
    v && (this.mediaQueryList = matchMedia(v), this.subscriptions.push(On(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(v) {
    v && (this.motionResizeObserver = new io(v), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Li(100)).subscribe(() => this.reset())
    ));
  }
};
let ln = vi;
ln.resetDebounceTime = 100;
ln.referenceFramerate = 60;
class io {
  constructor(S) {
    const [k, G] = [S].flat();
    this.element = typeof k == "string" ? document.querySelector(k) : k, this.axis = G, this.observable = new Fi((Y) => {
      const b = new ResizeObserver(
        (pe) => this.handleResize(pe, Y)
      );
      return this.element && b.observe(this.element), () => b.disconnect();
    });
  }
  handleResize(S, k) {
    const G = S.find((he) => he.target === this.element);
    if (!G)
      return;
    const { inlineSize: Y, blockSize: b } = G.borderBoxSize[0], pe = Y !== this.inlineSize, C = b !== this.blockSize, N = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = Y, this.blockSize = b, !N) {
      if (this.axis === "horizontal" && pe || this.axis === "vertical" && C)
        return k.next();
      !this.axis && (pe || C) && k.next();
    }
  }
}
class mi {
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
    this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5, this.observable = On(window, "mousemove"), this.motion = new ln(
      (S) => {
        S.subscriptions.push(
          this.observable.subscribe((k) => {
            this.clientX = k.clientX, this.clientY = k.clientY, this.normalX = qe.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = qe.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), S.subscriptions.push(
          On(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), S.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.destroy = () => {
      this.motion.destroy();
    };
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new mi());
  }
}
var An = { exports: {} };
(function(v, S) {
  (function(k, G) {
    G(S);
  })(Fr, function(k) {
    function G(o, e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(o, t.key, t);
      }
    }
    function Y(o, e, n) {
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
    var b, pe, C, N, he, Ae, dt, Ue, Ve, Et, Ze, Ee, Pt, Ut = function() {
      return b || typeof window < "u" && (b = window.gsap) && b.registerPlugin && b;
    }, yt = 1, pt = [], m = [], F = [], xe = Date.now, st = function(e, n) {
      return n;
    }, Lt = function() {
      var e = Ve.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, m), r.push.apply(r, F), m = t, F = r, st = function(a, s) {
        return n[a](s);
      };
    }, xt = function(e, n) {
      return ~F.indexOf(e) && F[F.indexOf(e) + 1][n];
    }, Ft = function(e) {
      return !!~Et.indexOf(e);
    }, Se = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, U = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Vt = "scrollLeft", Yr = "scrollTop", an = function() {
      return Ze && Ze.isPressed || m.cache++;
    }, Xr = function(e, n) {
      var t = function r(i) {
        if (i || i === 0) {
          yt && (C.history.scrollRestoration = "manual");
          var a = Ze && Ze.isPressed;
          i = r.v = Math.round(i) || (Ze && Ze.iOS ? 1 : 0), e(i), r.cacheID = m.cache, a && st("ss", i);
        } else
          (n || m.cache !== r.cacheID || st("ref")) && (r.cacheID = m.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, ze = {
      s: Vt,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Xr(function(o) {
        return arguments.length ? C.scrollTo(o, ue.sc()) : C.pageXOffset || N[Vt] || he[Vt] || Ae[Vt] || 0;
      })
    }, ue = {
      s: Yr,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: ze,
      sc: Xr(function(o) {
        return arguments.length ? C.scrollTo(ze.sc(), o) : C.pageYOffset || N[Yr] || he[Yr] || Ae[Yr] || 0;
      })
    }, je = function(e) {
      return b.utils.toArray(e)[0] || (typeof e == "string" && b.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Yt = function(e, n) {
      var t = n.s, r = n.sc;
      Ft(e) && (e = N.scrollingElement || he);
      var i = m.indexOf(e), a = r === ue.sc ? 1 : 2;
      !~i && (i = m.push(e) - 1), m[i + a] || e.addEventListener("scroll", an);
      var s = m[i + a], d = s || (m[i + a] = Xr(xt(e, t), !0) || (Ft(e) ? r : Xr(function(x) {
        return arguments.length ? e[t] = x : e[t];
      })));
      return d.target = e, s || (d.smooth = b.getProperty(e, "scrollBehavior") === "smooth"), d;
    }, cn = function(e, n, t) {
      var r = e, i = e, a = xe(), s = a, d = n || 50, x = Math.max(500, d * 3), X = function(g, q) {
        var re = xe();
        q || re - a > d ? (i = r, r = g, s = a, a = re) : t ? r += g : r = i + (g - i) / (re - s) * (a - s);
      }, B = function() {
        i = r = t ? 0 : r, s = a = 0;
      }, h = function(g) {
        var q = s, re = i, W = xe();
        return (g || g === 0) && g !== r && X(g), a === s || W - s > x ? 0 : (r + (t ? re : -re)) / ((t ? W : a) - q) * 1e3;
      };
      return {
        update: X,
        reset: B,
        getVelocity: h
      };
    }, mr = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, zn = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, In = function() {
      Ve = b.core.globals().ScrollTrigger, Ve && Ve.core && Lt();
    }, Ln = function(e) {
      return b = e || Ut(), b && typeof document < "u" && document.body && (C = window, N = document, he = N.documentElement, Ae = N.body, Et = [C, N, he, Ae], b.utils.clamp, Pt = b.core.context || function() {
      }, Ue = "onpointerenter" in Ae ? "pointer" : "mouse", dt = se.isTouch = C.matchMedia && C.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in C || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ee = se.eventTypes = ("ontouchstart" in he ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in he ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return yt = 0;
      }, 500), In(), pe = 1), pe;
    };
    ze.op = ue, m.cache = 0;
    var se = function() {
      function o(n) {
        this.init(n);
      }
      var e = o.prototype;
      return e.init = function(t) {
        pe || Ln(b) || console.warn("Please gsap.registerPlugin(Observer)"), Ve || In();
        var r = t.tolerance, i = t.dragMinimum, a = t.type, s = t.target, d = t.lineHeight, x = t.debounce, X = t.preventDefault, B = t.onStop, h = t.onStopDelay, u = t.ignore, g = t.wheelSpeed, q = t.event, re = t.onDragStart, W = t.onDragEnd, Qe = t.onDrag, ee = t.onPress, I = t.onRelease, Re = t.onRight, ne = t.onLeft, M = t.onUp, Ke = t.onDown, vt = t.onChangeX, E = t.onChangeY, ke = t.onChange, T = t.onToggleX, Dt = t.onToggleY, Ce = t.onHover, Ye = t.onHoverEnd, Xe = t.onMove, $ = t.ignoreCheck, fe = t.isNormalizer, le = t.onGestureStart, l = t.onGestureEnd, de = t.onWheel, rr = t.onEnable, Ht = t.onDisable, ct = t.onClick, Nt = t.scrollSpeed, V = t.capture, Oe = t.allowClicks, Be = t.lockAxis, Rr = t.onLockAxis;
        this.target = s = je(s) || he, this.vars = t, u && (u = b.utils.toArray(u)), r = r || 1e-9, i = i || 0, g = g || 1, Nt = Nt || 1, a = a || "wheel,touch,pointer", x = x !== !1, d || (d = parseFloat(C.getComputedStyle(Ae).lineHeight) || 22);
        var rt, ut, L, ve, nt, Tt, He, c = this, At = 0, Q = 0, Wt = Yt(s, ze), Gt = Yt(s, ue), hr = Wt(), Ne = Gt(), Or = ~a.indexOf("touch") && !~a.indexOf("pointer") && Ee[0] === "pointerdown", $t = Ft(s), ie = s.ownerDocument || N, it = [0, 0, 0], We = [0, 0, 0], Dr = 0, Ge = function() {
          return Dr = xe();
        }, kt = function(w, f) {
          return (c.event = w) && u && ~u.indexOf(w.target) || f && Or && w.pointerType !== "touch" || $ && $(w, f);
        }, Ar = function() {
          c._vx.reset(), c._vy.reset(), ut.pause(), B && B(c);
        }, qt = function() {
          var w = c.deltaX = zn(it), f = c.deltaY = zn(We), _ = Math.abs(w) >= r, y = Math.abs(f) >= r;
          ke && (_ || y) && ke(c, w, f, it, We), _ && (Re && c.deltaX > 0 && Re(c), ne && c.deltaX < 0 && ne(c), vt && vt(c), T && c.deltaX < 0 != At < 0 && T(c), At = c.deltaX, it[0] = it[1] = it[2] = 0), y && (Ke && c.deltaY > 0 && Ke(c), M && c.deltaY < 0 && M(c), E && E(c), Dt && c.deltaY < 0 != Q < 0 && Dt(c), Q = c.deltaY, We[0] = We[1] = We[2] = 0), (ve || L) && (Xe && Xe(c), L && (Qe(c), L = !1), ve = !1), Tt && !(Tt = !1) && Rr && Rr(c), nt && (de(c), nt = !1), rt = 0;
        }, gr = function(w, f, _) {
          it[_] += w, We[_] += f, c._vx.update(w), c._vy.update(f), x ? rt || (rt = requestAnimationFrame(qt)) : qt();
        }, nr = function(w, f) {
          Be && !He && (c.axis = He = Math.abs(w) > Math.abs(f) ? "x" : "y", Tt = !0), He !== "y" && (it[2] += w, c._vx.update(w, !0)), He !== "x" && (We[2] += f, c._vy.update(f, !0)), x ? rt || (rt = requestAnimationFrame(qt)) : qt();
        }, ir = function(w) {
          if (!kt(w, 1)) {
            w = mr(w, X);
            var f = w.clientX, _ = w.clientY, y = f - c.x, R = _ - c.y, me = c.isDragging;
            c.x = f, c.y = _, (me || Math.abs(c.startX - f) >= i || Math.abs(c.startY - _) >= i) && (Qe && (L = !0), me || (c.isDragging = !0), nr(y, R), me || re && re(c));
          }
        }, A = c.onPress = function(P) {
          kt(P, 1) || P && P.button || (c.axis = He = null, ut.pause(), c.isPressed = !0, P = mr(P), At = Q = 0, c.startX = c.x = P.clientX, c.startY = c.y = P.clientY, c._vx.reset(), c._vy.reset(), Se(fe ? s : ie, Ee[1], ir, X, !0), c.deltaX = c.deltaY = 0, ee && ee(c));
        }, zt = c.onRelease = function(P) {
          if (!kt(P, 1)) {
            U(fe ? s : ie, Ee[1], ir, !0);
            var w = !isNaN(c.y - c.startY), f = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), _ = mr(P);
            !f && w && (c._vx.reset(), c._vy.reset(), X && Oe && b.delayedCall(0.08, function() {
              if (xe() - Dr > 300 && !P.defaultPrevented) {
                if (P.target.click)
                  P.target.click();
                else if (ie.createEvent) {
                  var y = ie.createEvent("MouseEvents");
                  y.initMouseEvent("click", !0, !0, C, 1, _.screenX, _.screenY, _.clientX, _.clientY, !1, !1, !1, !1, 0, null), P.target.dispatchEvent(y);
                }
              }
            })), c.isDragging = c.isGesturing = c.isPressed = !1, B && !fe && ut.restart(!0), W && f && W(c), I && I(c, f);
          }
        }, mt = function(w) {
          return w.touches && w.touches.length > 1 && (c.isGesturing = !0) && le(w, c.isDragging);
        }, bt = function() {
          return (c.isGesturing = !1) || l(c);
        }, ft = function(w) {
          if (!kt(w)) {
            var f = Wt(), _ = Gt();
            gr((f - hr) * Nt, (_ - Ne) * Nt, 1), hr = f, Ne = _, B && ut.restart(!0);
          }
        }, wt = function(w) {
          if (!kt(w)) {
            w = mr(w, X), de && (nt = !0);
            var f = (w.deltaMode === 1 ? d : w.deltaMode === 2 ? C.innerHeight : 1) * g;
            gr(w.deltaX * f, w.deltaY * f, 0), B && !fe && ut.restart(!0);
          }
        }, or = function(w) {
          if (!kt(w)) {
            var f = w.clientX, _ = w.clientY, y = f - c.x, R = _ - c.y;
            c.x = f, c.y = _, ve = !0, (y || R) && nr(y, R);
          }
        }, _r = function(w) {
          c.event = w, Ce(c);
        }, It = function(w) {
          c.event = w, Ye(c);
        }, zr = function(w) {
          return kt(w) || mr(w, X) && ct(c);
        };
        ut = c._dc = b.delayedCall(h || 0.25, Ar).pause(), c.deltaX = c.deltaY = 0, c._vx = cn(0, 50, !0), c._vy = cn(0, 50, !0), c.scrollX = Wt, c.scrollY = Gt, c.isDragging = c.isGesturing = c.isPressed = !1, Pt(this), c.enable = function(P) {
          return c.isEnabled || (Se($t ? ie : s, "scroll", an), a.indexOf("scroll") >= 0 && Se($t ? ie : s, "scroll", ft, X, V), a.indexOf("wheel") >= 0 && Se(s, "wheel", wt, X, V), (a.indexOf("touch") >= 0 && dt || a.indexOf("pointer") >= 0) && (Se(s, Ee[0], A, X, V), Se(ie, Ee[2], zt), Se(ie, Ee[3], zt), Oe && Se(s, "click", Ge, !1, !0), ct && Se(s, "click", zr), le && Se(ie, "gesturestart", mt), l && Se(ie, "gestureend", bt), Ce && Se(s, Ue + "enter", _r), Ye && Se(s, Ue + "leave", It), Xe && Se(s, Ue + "move", or)), c.isEnabled = !0, P && P.type && A(P), rr && rr(c)), c;
        }, c.disable = function() {
          c.isEnabled && (pt.filter(function(P) {
            return P !== c && Ft(P.target);
          }).length || U($t ? ie : s, "scroll", an), c.isPressed && (c._vx.reset(), c._vy.reset(), U(fe ? s : ie, Ee[1], ir, !0)), U($t ? ie : s, "scroll", ft, V), U(s, "wheel", wt, V), U(s, Ee[0], A, V), U(ie, Ee[2], zt), U(ie, Ee[3], zt), U(s, "click", Ge, !0), U(s, "click", zr), U(ie, "gesturestart", mt), U(ie, "gestureend", bt), U(s, Ue + "enter", _r), U(s, Ue + "leave", It), U(s, Ue + "move", or), c.isEnabled = c.isPressed = c.isDragging = !1, Ht && Ht(c));
        }, c.kill = c.revert = function() {
          c.disable();
          var P = pt.indexOf(c);
          P >= 0 && pt.splice(P, 1), Ze === c && (Ze = 0);
        }, pt.push(c), fe && Ft(s) && (Ze = c), c.enable(q);
      }, Y(o, [{
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
    se.version = "3.11.5", se.create = function(o) {
      return new se(o);
    }, se.register = Ln, se.getAll = function() {
      return pt.slice();
    }, se.getById = function(o) {
      return pt.filter(function(e) {
        return e.vars.id === o;
      })[0];
    }, Ut() && b.registerPlugin(se);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var p, lr, z, j, ht, J, Fn, Br, Hr, ar, Nr, Wr, Pe, Gr, un, Ie, Yn, Xn, cr, Bn, fn, Hn, Je, Nn, Wn, Gn, Xt, dn, pn, hn, $r = 1, Le = Date.now, gn = Le(), lt = 0, br = 0, yi = function o() {
      return br && requestAnimationFrame(o);
    }, $n = function() {
      return Gr = 1;
    }, qn = function() {
      return Gr = 0;
    }, St = function(e) {
      return e;
    }, wr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Un = function() {
      return typeof window < "u";
    }, Vn = function() {
      return p || Un() && (p = window.gsap) && p.registerPlugin && p;
    }, jt = function(e) {
      return !!~Fn.indexOf(e);
    }, jn = function(e) {
      return xt(e, "getBoundingClientRect") || (jt(e) ? function() {
        return on.width = z.innerWidth, on.height = z.innerHeight, on;
      } : function() {
        return Rt(e);
      });
    }, xi = function(e, n, t) {
      var r = t.d, i = t.d2, a = t.a;
      return (a = xt(e, "getBoundingClientRect")) ? function() {
        return a()[r];
      } : function() {
        return (n ? z["inner" + i] : e["client" + i]) || 0;
      };
    }, Si = function(e, n) {
      return !n || ~F.indexOf(e) ? jn(e) : function() {
        return on;
      };
    }, Bt = function(e, n) {
      var t = n.s, r = n.d2, i = n.d, a = n.a;
      return Math.max(0, (t = "scroll" + r) && (a = xt(e, t)) ? a() - jn(e)()[i] : jt(e) ? (ht[t] || J[t]) - (z["inner" + r] || ht["client" + r] || J["client" + r]) : e[t] - e["offset" + r]);
    }, qr = function(e, n) {
      for (var t = 0; t < cr.length; t += 3)
        (!n || ~n.indexOf(cr[t + 1])) && e(cr[t], cr[t + 1], cr[t + 2]);
    }, gt = function(e) {
      return typeof e == "string";
    }, Fe = function(e) {
      return typeof e == "function";
    }, yr = function(e) {
      return typeof e == "number";
    }, Ur = function(e) {
      return typeof e == "object";
    }, xr = function(e, n, t) {
      return e && e.progress(n ? 0 : 1) && t && e.pause();
    }, _n = function(e, n) {
      if (e.enabled) {
        var t = n(e);
        t && t.totalTime && (e.callbackAnimation = t);
      }
    }, ur = Math.abs, Qn = "left", Kn = "top", vn = "right", mn = "bottom", Qt = "width", Kt = "height", Sr = "Right", Tr = "Left", kr = "Top", Cr = "Bottom", te = "padding", at = "margin", fr = "Width", bn = "Height", Te = "px", _t = function(e) {
      return z.getComputedStyle(e);
    }, Ti = function(e) {
      var n = _t(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, Zn = function(e, n) {
      for (var t in n)
        t in e || (e[t] = n[t]);
      return e;
    }, Rt = function(e, n) {
      var t = n && _t(e)[un] !== "matrix(1, 0, 0, 1, 0, 0)" && p.to(e, {
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
    }, wn = function(e, n) {
      var t = n.d2;
      return e["offset" + t] || e["client" + t] || 0;
    }, Jn = function(e) {
      var n = [], t = e.labels, r = e.duration(), i;
      for (i in t)
        n.push(t[i] / r);
      return n;
    }, ki = function(e) {
      return function(n) {
        return p.utils.snap(Jn(e), n);
      };
    }, yn = function(e) {
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
    }, Ci = function(e) {
      return function(n, t) {
        return yn(Jn(e))(n, t.direction);
      };
    }, Vr = function(e, n, t, r) {
      return t.split(",").forEach(function(i) {
        return e(n, i, r);
      });
    }, ge = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, _e = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, jr = function(e, n, t) {
      t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
    }, ei = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, Qr = {
      toggleActions: "play",
      anticipatePin: 0
    }, Kr = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    }, Zr = function(e, n) {
      if (gt(e)) {
        var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
        ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in Kr ? Kr[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
      }
      return e;
    }, Jr = function(e, n, t, r, i, a, s, d) {
      var x = i.startColor, X = i.endColor, B = i.fontSize, h = i.indent, u = i.fontWeight, g = j.createElement("div"), q = jt(t) || xt(t, "pinType") === "fixed", re = e.indexOf("scroller") !== -1, W = q ? J : t, Qe = e.indexOf("start") !== -1, ee = Qe ? x : X, I = "border-color:" + ee + ";font-size:" + B + ";color:" + ee + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return I += "position:" + ((re || d) && q ? "fixed;" : "absolute;"), (re || d || !q) && (I += (r === ue ? vn : mn) + ":" + (a + parseFloat(h)) + "px;"), s && (I += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), g._isStart = Qe, g.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), g.style.cssText = I, g.innerText = n || n === 0 ? e + "-" + n : e, W.children[0] ? W.insertBefore(g, W.children[0]) : W.appendChild(g), g._offset = g["offset" + r.op.d2], en(g, 0, r, Qe), g;
    }, en = function(e, n, t, r) {
      var i = {
        display: "block"
      }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
      e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + a + fr] = 1, i["border" + s + fr] = 0, i[t.p] = n + "px", p.set(e, i);
    }, O = [], xn = {}, Mr, ti = function() {
      return Le() - lt > 34 && (Mr || (Mr = requestAnimationFrame(Ot)));
    }, dr = function() {
      (!Je || !Je.isPressed || Je.startX > J.clientWidth) && (m.cache++, Je ? Mr || (Mr = requestAnimationFrame(Ot)) : Ot(), lt || Jt("scrollStart"), lt = Le());
    }, Sn = function() {
      Gn = z.innerWidth, Wn = z.innerHeight;
    }, Er = function() {
      m.cache++, !Pe && !Hn && !j.fullscreenElement && !j.webkitFullscreenElement && (!Nn || Gn !== z.innerWidth || Math.abs(z.innerHeight - Wn) > z.innerHeight * 0.25) && Br.restart(!0);
    }, Zt = {}, Mi = [], ri = function o() {
      return _e(D, "scrollEnd", o) || tr(!0);
    }, Jt = function(e) {
      return Zt[e] && Zt[e].map(function(n) {
        return n();
      }) || Mi;
    }, et = [], ni = function(e) {
      for (var n = 0; n < et.length; n += 5)
        (!e || et[n + 4] && et[n + 4].query === e) && (et[n].style.cssText = et[n + 1], et[n].getBBox && et[n].setAttribute("transform", et[n + 2] || ""), et[n + 3].uncache = 1);
    }, Tn = function(e, n) {
      var t;
      for (Ie = 0; Ie < O.length; Ie++)
        t = O[Ie], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && ni(n), n || Jt("revert");
    }, ii = function(e, n) {
      m.cache++, (n || !tt) && m.forEach(function(t) {
        return Fe(t) && t.cacheID++ && (t.rec = 0);
      }), gt(e) && (z.history.scrollRestoration = pn = e);
    }, tt, er = 0, oi, Ei = function() {
      if (oi !== er) {
        var e = oi = er;
        requestAnimationFrame(function() {
          return e === er && tr(!0);
        });
      }
    }, tr = function(e, n) {
      if (lt && !e) {
        ge(D, "scrollEnd", ri);
        return;
      }
      tt = D.isRefreshing = !0, m.forEach(function(r) {
        return Fe(r) && r.cacheID++ && (r.rec = r());
      });
      var t = Jt("refreshInit");
      Bn && D.sort(), n || Tn(), m.forEach(function(r) {
        Fe(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
      }), O.slice(0).forEach(function(r) {
        return r.refresh();
      }), O.forEach(function(r, i) {
        if (r._subPinOffset && r.pin) {
          var a = r.vars.horizontal ? "offsetWidth" : "offsetHeight", s = r.pin[a];
          r.revert(!0, 1), r.adjustPinSpacing(r.pin[a] - s), r.refresh();
        }
      }), O.forEach(function(r) {
        return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, Bt(r.scroller, r._dir)));
      }), t.forEach(function(r) {
        return r && r.render && r.render(-1);
      }), m.forEach(function(r) {
        Fe(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), ii(pn, 1), Br.pause(), er++, tt = 2, Ot(2), O.forEach(function(r) {
        return Fe(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), tt = D.isRefreshing = !1, Jt("refresh");
    }, kn = 0, tn = 1, Pr, Ot = function(e) {
      if (!tt || e === 2) {
        D.isUpdating = !0, Pr && Pr.update(0);
        var n = O.length, t = Le(), r = t - gn >= 50, i = n && O[0].scroll();
        if (tn = kn > i ? -1 : 1, tt || (kn = i), r && (lt && !Gr && t - lt > 200 && (lt = 0, Jt("scrollEnd")), Nr = gn, gn = t), tn < 0) {
          for (Ie = n; Ie-- > 0; )
            O[Ie] && O[Ie].update(0, r);
          tn = 1;
        } else
          for (Ie = 0; Ie < n; Ie++)
            O[Ie] && O[Ie].update(0, r);
        D.isUpdating = !1;
      }
      Mr = 0;
    }, Cn = [Qn, Kn, mn, vn, at + Cr, at + Sr, at + kr, at + Tr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], rn = Cn.concat([Qt, Kt, "boxSizing", "max" + fr, "max" + bn, "position", at, te, te + kr, te + Sr, te + Cr, te + Tr]), Pi = function(e, n, t) {
      pr(t);
      var r = e._gsap;
      if (r.spacerIsNative)
        pr(r.spacerState);
      else if (e._gsap.swappedIn) {
        var i = n.parentNode;
        i && (i.insertBefore(e, n), i.removeChild(n));
      }
      e._gsap.swappedIn = !1;
    }, Mn = function(e, n, t, r) {
      if (!e._gsap.swappedIn) {
        for (var i = Cn.length, a = n.style, s = e.style, d; i--; )
          d = Cn[i], a[d] = t[d];
        a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[mn] = s[vn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Qt] = wn(e, ze) + Te, a[Kt] = wn(e, ue) + Te, a[te] = s[at] = s[Kn] = s[Qn] = "0", pr(r), s[Qt] = s["max" + fr] = t[Qt], s[Kt] = s["max" + bn] = t[Kt], s[te] = t[te], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Ri = /([A-Z])/g, pr = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, i, a;
        for ((e.t._gsap || p.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          a = e[r + 1], i = e[r], a ? n[i] = a : n[i] && n.removeProperty(i.replace(Ri, "-$1").toLowerCase());
      }
    }, nn = function(e) {
      for (var n = rn.length, t = e.style, r = [], i = 0; i < n; i++)
        r.push(rn[i], t[rn[i]]);
      return r.t = e, r;
    }, Oi = function(e, n, t) {
      for (var r = [], i = e.length, a = t ? 8 : 0, s; a < i; a += 2)
        s = e[a], r.push(s, s in n ? n[s] : e[a + 1]);
      return r.t = e.t, r;
    }, on = {
      left: 0,
      top: 0
    }, si = function(e, n, t, r, i, a, s, d, x, X, B, h, u) {
      Fe(e) && (e = e(d)), gt(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Zr("0" + e.substr(3), t) : 0));
      var g = u ? u.time() : 0, q, re, W;
      if (u && u.seek(0), yr(e))
        u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, h, e)), s && en(s, t, r, !0);
      else {
        Fe(n) && (n = n(d));
        var Qe = (e || "0").split(" "), ee, I, Re, ne;
        W = je(n) || J, ee = Rt(W) || {}, (!ee || !ee.left && !ee.top) && _t(W).display === "none" && (ne = W.style.display, W.style.display = "block", ee = Rt(W), ne ? W.style.display = ne : W.style.removeProperty("display")), I = Zr(Qe[0], ee[r.d]), Re = Zr(Qe[1] || "0", t), e = ee[r.p] - x[r.p] - X + I + i - Re, s && en(s, Re, r, t - Re < 20 || s._isStart && Re > 20), t -= t - Re;
      }
      if (a) {
        var M = e + t, Ke = a._isStart;
        q = "scroll" + r.d2, en(a, M, r, Ke && M > 20 || !Ke && (B ? Math.max(J[q], ht[q]) : a.parentNode[q]) <= M + 1), B && (x = Rt(s), B && (a.style[r.op.p] = x[r.op.p] - r.op.m - a._offset + Te));
      }
      return u && W && (q = Rt(W), u.seek(h), re = Rt(W), u._caScrollDist = q[r.p] - re[r.p], e = e / u._caScrollDist * h), u && u.seek(g), u ? e : Math.round(e);
    }, Di = /(webkit|moz|length|cssText|inset)/i, li = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var i = e.style, a, s;
        if (n === J) {
          e._stOrig = i.cssText, s = _t(e);
          for (a in s)
            !+a && !Di.test(a) && s[a] && typeof i[a] == "string" && a !== "0" && (i[a] = s[a]);
          i.top = t, i.left = r;
        } else
          i.cssText = e._stOrig;
        p.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, ai = function(e, n, t) {
      var r = n, i = r;
      return function(a) {
        var s = Math.round(e());
        return s !== r && s !== i && Math.abs(s - r) > 3 && Math.abs(s - i) > 3 && (a = s, t && t()), i = r, r = a, a;
      };
    }, ci = function(e, n) {
      var t = Yt(e, n), r = "_scroll" + n.p2, i = function a(s, d, x, X, B) {
        var h = a.tween, u = d.onComplete, g = {};
        x = x || t();
        var q = ai(t, x, function() {
          h.kill(), a.tween = 0;
        });
        return B = X && B || 0, X = X || s - x, h && h.kill(), d[r] = s, d.modifiers = g, g[r] = function() {
          return q(x + X * h.ratio + B * h.ratio * h.ratio);
        }, d.onUpdate = function() {
          m.cache++, Ot();
        }, d.onComplete = function() {
          a.tween = 0, u && u.call(h);
        }, h = a.tween = p.to(e, d), h;
      };
      return e[r] = t, t.wheelHandler = function() {
        return i.tween && i.tween.kill() && (i.tween = 0);
      }, ge(e, "wheel", t.wheelHandler), D.isTouch && ge(e, "touchmove", t.wheelHandler), i;
    }, D = function() {
      function o(n, t) {
        lr || o.register(p) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(n, t);
      }
      var e = o.prototype;
      return e.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !br) {
          this.update = this.refresh = this.kill = St;
          return;
        }
        t = Zn(gt(t) || yr(t) || t.nodeType ? {
          trigger: t
        } : t, Qr);
        var i = t, a = i.onUpdate, s = i.toggleClass, d = i.id, x = i.onToggle, X = i.onRefresh, B = i.scrub, h = i.trigger, u = i.pin, g = i.pinSpacing, q = i.invalidateOnRefresh, re = i.anticipatePin, W = i.onScrubComplete, Qe = i.onSnapComplete, ee = i.once, I = i.snap, Re = i.pinReparent, ne = i.pinSpacer, M = i.containerAnimation, Ke = i.fastScrollEnd, vt = i.preventOverlaps, E = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? ze : ue, ke = !B && B !== 0, T = je(t.scroller || z), Dt = p.core.getCache(T), Ce = jt(T), Ye = ("pinType" in t ? t.pinType : xt(T, "pinType") || Ce && "fixed") === "fixed", Xe = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], $ = ke && t.toggleActions.split(" "), fe = "markers" in t ? t.markers : Qr.markers, le = Ce ? 0 : parseFloat(_t(T)["border" + E.p2 + fr]) || 0, l = this, de = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, rr = xi(T, Ce, E), Ht = Si(T, Ce), ct = 0, Nt = 0, V = Yt(T, E), Oe, Be, Rr, rt, ut, L, ve, nt, Tt, He, c, At, Q, Wt, Gt, hr, Ne, Or, $t, ie, it, We, Dr, Ge, kt, Ar, qt, gr, nr, ir, A, zt, mt, bt, ft, wt, or, _r, It;
        if (dn(l), l._dir = E, re *= 45, l.scroller = T, l.scroll = M ? M.time.bind(M) : V, rt = V(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Bn = 1, t.refreshPriority === -9999 && (Pr = l)), Dt.tweenScroll = Dt.tweenScroll || {
          top: ci(T, ue),
          left: ci(T, ze)
        }, l.tweenTo = Oe = Dt.tweenScroll[E.p], l.scrubDuration = function(f) {
          zt = yr(f) && f, zt ? A ? A.duration(f) : A = p.to(r, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: zt,
            paused: !0,
            onComplete: function() {
              return W && W(l);
            }
          }) : (A && A.progress(1).kill(), A = 0);
        }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(B), A && A.resetTo && A.resetTo("totalProgress", 0), nr = 0, d || (d = r.vars.id)), O.push(l), I && ((!Ur(I) || I.push) && (I = {
          snapTo: I
        }), "scrollBehavior" in J.style && p.set(Ce ? [J, ht] : T, {
          scrollBehavior: "auto"
        }), m.forEach(function(f) {
          return Fe(f) && f.target === (Ce ? j.scrollingElement || ht : T) && (f.smooth = !1);
        }), Rr = Fe(I.snapTo) ? I.snapTo : I.snapTo === "labels" ? ki(r) : I.snapTo === "labelsDirectional" ? Ci(r) : I.directional !== !1 ? function(f, _) {
          return yn(I.snapTo)(f, Le() - Nt < 500 ? 0 : _.direction);
        } : p.utils.snap(I.snapTo), mt = I.duration || {
          min: 0.1,
          max: 2
        }, mt = Ur(mt) ? ar(mt.min, mt.max) : ar(mt, mt), bt = p.delayedCall(I.delay || zt / 2 || 0.1, function() {
          var f = V(), _ = Le() - Nt < 500, y = Oe.tween;
          if ((_ || Math.abs(l.getVelocity()) < 10) && !y && !Gr && ct !== f) {
            var R = (f - L) / Q, me = r && !ke ? r.totalProgress() : R, H = _ ? 0 : (me - ir) / (Le() - Nr) * 1e3 || 0, K = p.utils.clamp(-R, 1 - R, ur(H / 2) * H / 0.185), Me = R + (I.inertia === !1 ? 0 : K), be = ar(0, 1, Rr(Me, l)), ae = Math.round(L + be * Q), Z = I, ot = Z.onStart, $e = Z.onInterrupt, we = Z.onComplete;
            if (f <= ve && f >= L && ae !== f) {
              if (y && !y._initted && y.data <= ur(ae - f))
                return;
              I.inertia === !1 && (K = be - R), Oe(ae, {
                duration: mt(ur(Math.max(ur(Me - me), ur(be - me)) * 0.185 / H / 0.05 || 0)),
                ease: I.ease || "power3",
                data: ur(ae - f),
                onInterrupt: function() {
                  return bt.restart(!0) && $e && $e(l);
                },
                onComplete: function() {
                  l.update(), ct = V(), nr = ir = r && !ke ? r.totalProgress() : l.progress, Qe && Qe(l), we && we(l);
                }
              }, f, K * Q, ae - f - K * Q), ot && ot(l, Oe.tween);
            }
          } else
            l.isActive && ct !== f && bt.restart(!0);
        }).pause()), d && (xn[d] = l), h = l.trigger = je(h || u), It = h && h._gsap && h._gsap.stRevert, It && (It = It(l)), u = u === !0 ? h : je(u), gt(s) && (s = {
          targets: h,
          className: s
        }), u && (g === !1 || g === at || (g = !g && u.parentNode && u.parentNode.style && _t(u.parentNode).display === "flex" ? !1 : te), l.pin = u, Be = p.core.getCache(u), Be.spacer ? Wt = Be.pinState : (ne && (ne = je(ne), ne && !ne.nodeType && (ne = ne.current || ne.nativeElement), Be.spacerIsNative = !!ne, ne && (Be.spacerState = nn(ne))), Be.spacer = Ne = ne || j.createElement("div"), Ne.classList.add("pin-spacer"), d && Ne.classList.add("pin-spacer-" + d), Be.pinState = Wt = nn(u)), t.force3D !== !1 && p.set(u, {
          force3D: !0
        }), l.spacer = Ne = Be.spacer, gr = _t(u), Dr = gr[g + E.os2], $t = p.getProperty(u), ie = p.quickSetter(u, E.a, Te), Mn(u, Ne, gr), hr = nn(u)), fe) {
          At = Ur(fe) ? Zn(fe, ei) : ei, He = Jr("scroller-start", d, T, E, At, 0), c = Jr("scroller-end", d, T, E, At, 0, He), Or = He["offset" + E.op.d2];
          var zr = je(xt(T, "content") || T);
          nt = this.markerStart = Jr("start", d, zr, E, At, Or, 0, M), Tt = this.markerEnd = Jr("end", d, zr, E, At, Or, 0, M), M && (_r = p.quickSetter([nt, Tt], E.a, Te)), !Ye && !(F.length && xt(T, "fixedMarkers") === !0) && (Ti(Ce ? J : T), p.set([He, c], {
            force3D: !0
          }), kt = p.quickSetter(He, E.a, Te), qt = p.quickSetter(c, E.a, Te));
        }
        if (M) {
          var P = M.vars.onUpdate, w = M.vars.onUpdateParams;
          M.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), P && P.apply(M, w || []);
          });
        }
        l.previous = function() {
          return O[O.indexOf(l) - 1];
        }, l.next = function() {
          return O[O.indexOf(l) + 1];
        }, l.revert = function(f, _) {
          if (!_)
            return l.kill(!0);
          var y = f !== !1 || !l.enabled, R = Pe;
          y !== l.isReverted && (y && (wt = Math.max(V(), l.scroll.rec || 0), ft = l.progress, or = r && r.progress()), nt && [nt, Tt, He, c].forEach(function(me) {
            return me.style.display = y ? "none" : "block";
          }), y && (Pe = l, l.update(y)), u && (!Re || !l.isActive) && (y ? Pi(u, Ne, Wt) : Mn(u, Ne, _t(u), Ge)), y || l.update(y), Pe = R, l.isReverted = y);
        }, l.refresh = function(f, _) {
          if (!((Pe || !l.enabled) && !_)) {
            if (u && f && lt) {
              ge(o, "scrollEnd", ri);
              return;
            }
            !tt && de && de(l), Pe = l, Nt = Le(), Oe.tween && (Oe.tween.kill(), Oe.tween = 0), A && A.pause(), q && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var y = rr(), R = Ht(), me = M ? M.duration() : Bt(T, E), H = Q <= 0.01, K = 0, Me = 0, be = t.end, ae = t.endTrigger || h, Z = t.start || (t.start === 0 || !h ? 0 : u ? "0 0" : "0 100%"), ot = l.pinnedContainer = t.pinnedContainer && je(t.pinnedContainer), $e = h && Math.max(0, O.indexOf(l)) || 0, we = $e, oe, De, vr, sr, ce, ye, Ct, Pn, hi, Ir, Mt; we--; )
              ye = O[we], ye.end || ye.refresh(0, 1) || (Pe = l), Ct = ye.pin, Ct && (Ct === h || Ct === u || Ct === ot) && !ye.isReverted && (Ir || (Ir = []), Ir.unshift(ye), ye.revert(!0, !0)), ye !== O[we] && ($e--, we--);
            for (Fe(Z) && (Z = Z(l)), L = si(Z, h, y, E, V(), nt, He, l, R, le, Ye, me, M) || (u ? -1e-3 : 0), Fe(be) && (be = be(l)), gt(be) && !be.indexOf("+=") && (~be.indexOf(" ") ? be = (gt(Z) ? Z.split(" ")[0] : "") + be : (K = Zr(be.substr(2), y), be = gt(Z) ? Z : (M ? p.utils.mapRange(0, M.duration(), M.scrollTrigger.start, M.scrollTrigger.end, L) : L) + K, ae = h)), ve = Math.max(L, si(be || (ae ? "100% 0" : me), ae, y, E, V() + K, Tt, c, l, R, le, Ye, me, M)) || -1e-3, Q = ve - L || (L -= 0.01) && 1e-3, K = 0, we = $e; we--; )
              ye = O[we], Ct = ye.pin, Ct && ye.start - ye._pinPush <= L && !M && ye.end > 0 && (oe = ye.end - ye.start, (Ct === h && ye.start - ye._pinPush < L || Ct === ot) && !yr(Z) && (K += oe * (1 - ye.progress)), Ct === u && (Me += oe));
            if (L += K, ve += K, H && (ft = p.utils.clamp(0, 1, p.utils.normalize(L, ve, wt))), l._pinPush = Me, nt && K && (oe = {}, oe[E.a] = "+=" + K, ot && (oe[E.p] = "-=" + V()), p.set([nt, Tt], oe)), u)
              oe = _t(u), sr = E === ue, vr = V(), it = parseFloat($t(E.a)) + Me, !me && ve > 1 && (Mt = (Ce ? j.scrollingElement || ht : T).style, Mt = {
                style: Mt,
                value: Mt["overflow" + E.a.toUpperCase()]
              }, Mt.style["overflow" + E.a.toUpperCase()] = "scroll"), Mn(u, Ne, oe), hr = nn(u), De = Rt(u, !0), Pn = Ye && Yt(T, sr ? ze : ue)(), g && (Ge = [g + E.os2, Q + Me + Te], Ge.t = Ne, we = g === te ? wn(u, E) + Q + Me : 0, we && Ge.push(E.d, we + Te), pr(Ge), ot && O.forEach(function(Lr) {
                Lr.pin === ot && Lr.vars.pinSpacing !== !1 && (Lr._subPinOffset = !0);
              }), Ye && V(wt)), Ye && (ce = {
                top: De.top + (sr ? vr - L : Pn) + Te,
                left: De.left + (sr ? Pn : vr - L) + Te,
                boxSizing: "border-box",
                position: "fixed"
              }, ce[Qt] = ce["max" + fr] = Math.ceil(De.width) + Te, ce[Kt] = ce["max" + bn] = Math.ceil(De.height) + Te, ce[at] = ce[at + kr] = ce[at + Sr] = ce[at + Cr] = ce[at + Tr] = "0", ce[te] = oe[te], ce[te + kr] = oe[te + kr], ce[te + Sr] = oe[te + Sr], ce[te + Cr] = oe[te + Cr], ce[te + Tr] = oe[te + Tr], Gt = Oi(Wt, ce, Re), tt && V(0)), r ? (hi = r._initted, fn(1), r.render(r.duration(), !0, !0), We = $t(E.a) - it + Q + Me, Ar = Math.abs(Q - We) > 1, Ye && Ar && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), hi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), fn(0)) : We = Q, Mt && (Mt.value ? Mt.style["overflow" + E.a.toUpperCase()] = Mt.value : Mt.style.removeProperty("overflow-" + E.a));
            else if (h && V() && !M)
              for (De = h.parentNode; De && De !== J; )
                De._pinOffset && (L -= De._pinOffset, ve -= De._pinOffset), De = De.parentNode;
            Ir && Ir.forEach(function(Lr) {
              return Lr.revert(!1, !0);
            }), l.start = L, l.end = ve, rt = ut = tt ? wt : V(), !M && !tt && (rt < wt && V(wt), l.scroll.rec = 0), l.revert(!1, !0), bt && (ct = -1, l.isActive && V(L + Q * ft), bt.restart(!0)), Pe = 0, r && ke && (r._initted || or) && r.progress() !== or && r.progress(or, !0).render(r.time(), !0, !0), (H || ft !== l.progress || M) && (r && !ke && r.totalProgress(M && L < -1e-3 && !ft ? p.utils.normalize(L, ve, 0) : ft, !0), l.progress = (rt - L) / Q === ft ? 0 : ft), u && g && (Ne._pinOffset = Math.round(l.progress * We)), A && A.invalidate(), X && !tt && X(l);
          }
        }, l.getVelocity = function() {
          return (V() - ut) / (Le() - Nr) * 1e3 || 0;
        }, l.endAnimation = function() {
          xr(l.callbackAnimation), r && (A ? A.progress(1) : r.paused() ? ke || xr(r, l.direction < 0, 1) : xr(r, r.reversed()));
        }, l.labelToScroll = function(f) {
          return r && r.labels && (L || l.refresh() || L) + r.labels[f] / r.duration() * Q || 0;
        }, l.getTrailing = function(f) {
          var _ = O.indexOf(l), y = l.direction > 0 ? O.slice(0, _).reverse() : O.slice(_ + 1);
          return (gt(f) ? y.filter(function(R) {
            return R.vars.preventOverlaps === f;
          }) : y).filter(function(R) {
            return l.direction > 0 ? R.end <= L : R.start >= ve;
          });
        }, l.update = function(f, _, y) {
          if (!(M && !y && !f)) {
            var R = tt === !0 ? wt : l.scroll(), me = f ? 0 : (R - L) / Q, H = me < 0 ? 0 : me > 1 ? 1 : me || 0, K = l.progress, Me, be, ae, Z, ot, $e, we, oe;
            if (_ && (ut = rt, rt = M ? V() : R, I && (ir = nr, nr = r && !ke ? r.totalProgress() : H)), re && !H && u && !Pe && !$r && lt && L < R + (R - ut) / (Le() - Nr) * re && (H = 1e-4), H !== K && l.enabled) {
              if (Me = l.isActive = !!H && H < 1, be = !!K && K < 1, $e = Me !== be, ot = $e || !!H != !!K, l.direction = H > K ? 1 : -1, l.progress = H, ot && !Pe && (ae = H && !K ? 0 : H === 1 ? 1 : K === 1 ? 2 : 3, ke && (Z = !$e && $[ae + 1] !== "none" && $[ae + 1] || $[ae], oe = r && (Z === "complete" || Z === "reset" || Z in r))), vt && ($e || oe) && (oe || B || !r) && (Fe(vt) ? vt(l) : l.getTrailing(vt).forEach(function(ce) {
                return ce.endAnimation();
              })), ke || (A && !Pe && !$r ? (A._dp._time - A._start !== A._time && A.render(A._dp._time - A._start), A.resetTo ? A.resetTo("totalProgress", H, r._tTime / r._tDur) : (A.vars.totalProgress = H, A.invalidate().restart())) : r && r.totalProgress(H, !!Pe)), u) {
                if (f && g && (Ne.style[g + E.os2] = Dr), !Ye)
                  ie(wr(it + We * H));
                else if (ot) {
                  if (we = !f && H > K && ve + 1 > R && R + 1 >= Bt(T, E), Re)
                    if (!f && (Me || we)) {
                      var De = Rt(u, !0), vr = R - L;
                      li(u, J, De.top + (E === ue ? vr : 0) + Te, De.left + (E === ue ? 0 : vr) + Te);
                    } else
                      li(u, Ne);
                  pr(Me || we ? Gt : hr), Ar && H < 1 && Me || ie(it + (H === 1 && !we ? We : 0));
                }
              }
              I && !Oe.tween && !Pe && !$r && bt.restart(!0), s && ($e || ee && H && (H < 1 || !hn)) && Hr(s.targets).forEach(function(ce) {
                return ce.classList[Me || ee ? "add" : "remove"](s.className);
              }), a && !ke && !f && a(l), ot && !Pe ? (ke && (oe && (Z === "complete" ? r.pause().totalProgress(1) : Z === "reset" ? r.restart(!0).pause() : Z === "restart" ? r.restart(!0) : r[Z]()), a && a(l)), ($e || !hn) && (x && $e && _n(l, x), Xe[ae] && _n(l, Xe[ae]), ee && (H === 1 ? l.kill(!1, 1) : Xe[ae] = 0), $e || (ae = H === 1 ? 1 : 3, Xe[ae] && _n(l, Xe[ae]))), Ke && !Me && Math.abs(l.getVelocity()) > (yr(Ke) ? Ke : 2500) && (xr(l.callbackAnimation), A ? A.progress(1) : xr(r, Z === "reverse" ? 1 : !H, 1))) : ke && a && !Pe && a(l);
            }
            if (qt) {
              var sr = M ? R / M.duration() * (M._caScrollDist || 0) : R;
              kt(sr + (He._isFlipped ? 1 : 0)), qt(sr);
            }
            _r && _r(-R / M.duration() * (M._caScrollDist || 0));
          }
        }, l.enable = function(f, _) {
          l.enabled || (l.enabled = !0, ge(T, "resize", Er), ge(Ce ? j : T, "scroll", dr), de && ge(o, "refreshInit", de), f !== !1 && (l.progress = ft = 0, rt = ut = ct = V()), _ !== !1 && l.refresh());
        }, l.getTween = function(f) {
          return f && Oe ? Oe.tween : A;
        }, l.setPositions = function(f, _) {
          u && (it += f - L, We += _ - f - Q, g === te && l.adjustPinSpacing(_ - f - Q)), l.start = L = f, l.end = ve = _, Q = _ - f, l.update();
        }, l.adjustPinSpacing = function(f) {
          if (Ge && f) {
            var _ = Ge.indexOf(E.d) + 1;
            Ge[_] = parseFloat(Ge[_]) + f + Te, Ge[1] = parseFloat(Ge[1]) + f + Te, pr(Ge);
          }
        }, l.disable = function(f, _) {
          if (l.enabled && (f !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, _ || A && A.pause(), wt = 0, Be && (Be.uncache = 1), de && _e(o, "refreshInit", de), bt && (bt.pause(), Oe.tween && Oe.tween.kill() && (Oe.tween = 0)), !Ce)) {
            for (var y = O.length; y--; )
              if (O[y].scroller === T && O[y] !== l)
                return;
            _e(T, "resize", Er), _e(T, "scroll", dr);
          }
        }, l.kill = function(f, _) {
          l.disable(f, _), A && !_ && A.kill(), d && delete xn[d];
          var y = O.indexOf(l);
          y >= 0 && O.splice(y, 1), y === Ie && tn > 0 && Ie--, y = 0, O.forEach(function(R) {
            return R.scroller === l.scroller && (y = 1);
          }), y || tt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, f && r.revert({
            kill: !1
          }), _ || r.kill()), nt && [nt, Tt, He, c].forEach(function(R) {
            return R.parentNode && R.parentNode.removeChild(R);
          }), Pr === l && (Pr = 0), u && (Be && (Be.uncache = 1), y = 0, O.forEach(function(R) {
            return R.pin === u && y++;
          }), y || (Be.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), It && It(l), !r || !r.add || Q ? l.refresh() : p.delayedCall(0.01, function() {
          return L || ve || l.refresh();
        }) && (Q = 0.01) && (L = ve = 0), u && Ei();
      }, o.register = function(t) {
        return lr || (p = t || Vn(), Un() && window.document && o.enable(), lr = br), lr;
      }, o.defaults = function(t) {
        if (t)
          for (var r in t)
            Qr[r] = t[r];
        return Qr;
      }, o.disable = function(t, r) {
        br = 0, O.forEach(function(a) {
          return a[r ? "kill" : "disable"](t);
        }), _e(z, "wheel", dr), _e(j, "scroll", dr), clearInterval(Wr), _e(j, "touchcancel", St), _e(J, "touchstart", St), Vr(_e, j, "pointerdown,touchstart,mousedown", $n), Vr(_e, j, "pointerup,touchend,mouseup", qn), Br.kill(), qr(_e);
        for (var i = 0; i < m.length; i += 3)
          jr(_e, m[i], m[i + 1]), jr(_e, m[i], m[i + 2]);
      }, o.enable = function() {
        if (z = window, j = document, ht = j.documentElement, J = j.body, p && (Hr = p.utils.toArray, ar = p.utils.clamp, dn = p.core.context || St, fn = p.core.suppressOverwrites || St, pn = z.history.scrollRestoration || "auto", kn = z.pageYOffset, p.core.globals("ScrollTrigger", o), J)) {
          br = 1, yi(), se.register(p), o.isTouch = se.isTouch, Xt = se.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), ge(z, "wheel", dr), Fn = [z, j, ht, J], p.matchMedia ? (o.matchMedia = function(d) {
            var x = p.matchMedia(), X;
            for (X in d)
              x.add(X, d[X]);
            return x;
          }, p.addEventListener("matchMediaInit", function() {
            return Tn();
          }), p.addEventListener("matchMediaRevert", function() {
            return ni();
          }), p.addEventListener("matchMedia", function() {
            tr(0, 1), Jt("matchMedia");
          }), p.matchMedia("(orientation: portrait)", function() {
            return Sn(), Sn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), Sn(), ge(j, "scroll", dr);
          var t = J.style, r = t.borderTopStyle, i = p.core.Animation.prototype, a, s;
          for (i.revert || Object.defineProperty(i, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", a = Rt(J), ue.m = Math.round(a.top + ue.sc()) || 0, ze.m = Math.round(a.left + ze.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Wr = setInterval(ti, 250), p.delayedCall(0.5, function() {
            return $r = 0;
          }), ge(j, "touchcancel", St), ge(J, "touchstart", St), Vr(ge, j, "pointerdown,touchstart,mousedown", $n), Vr(ge, j, "pointerup,touchend,mouseup", qn), un = p.utils.checkPrefix("transform"), rn.push(un), lr = Le(), Br = p.delayedCall(0.2, tr).pause(), cr = [j, "visibilitychange", function() {
            var d = z.innerWidth, x = z.innerHeight;
            j.hidden ? (Yn = d, Xn = x) : (Yn !== d || Xn !== x) && Er();
          }, j, "DOMContentLoaded", tr, z, "load", tr, z, "resize", Er], qr(ge), O.forEach(function(d) {
            return d.enable(0, 1);
          }), s = 0; s < m.length; s += 3)
            jr(_e, m[s], m[s + 1]), jr(_e, m[s], m[s + 2]);
        }
      }, o.config = function(t) {
        "limitCallbacks" in t && (hn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval(Wr) || (Wr = r) && setInterval(ti, r), "ignoreMobileResize" in t && (Nn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (qr(_e) || qr(ge, t.autoRefreshEvents || "none"), Hn = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, o.scrollerProxy = function(t, r) {
        var i = je(t), a = m.indexOf(i), s = jt(i);
        ~a && m.splice(a, s ? 6 : 2), r && (s ? F.unshift(z, r, J, r, ht, r) : F.unshift(i, r));
      }, o.clearMatchMedia = function(t) {
        O.forEach(function(r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }, o.isInViewport = function(t, r, i) {
        var a = (gt(t) ? je(t) : t).getBoundingClientRect(), s = a[i ? Qt : Kt] * r || 0;
        return i ? a.right - s > 0 && a.left + s < z.innerWidth : a.bottom - s > 0 && a.top + s < z.innerHeight;
      }, o.positionInViewport = function(t, r, i) {
        gt(t) && (t = je(t));
        var a = t.getBoundingClientRect(), s = a[i ? Qt : Kt], d = r == null ? s / 2 : r in Kr ? Kr[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
        return i ? (a.left + d) / z.innerWidth : (a.top + d) / z.innerHeight;
      }, o.killAll = function(t) {
        if (O.slice(0).forEach(function(i) {
          return i.vars.id !== "ScrollSmoother" && i.kill();
        }), t !== !0) {
          var r = Zt.killAll || [];
          Zt = {}, r.forEach(function(i) {
            return i();
          });
        }
      }, o;
    }();
    D.version = "3.11.5", D.saveStyles = function(o) {
      return o ? Hr(o).forEach(function(e) {
        if (e && e.style) {
          var n = et.indexOf(e);
          n >= 0 && et.splice(n, 5), et.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), p.core.getCache(e), dn());
        }
      }) : et;
    }, D.revert = function(o, e) {
      return Tn(!o, e);
    }, D.create = function(o, e) {
      return new D(o, e);
    }, D.refresh = function(o) {
      return o ? Er() : (lr || D.register()) && tr(!0);
    }, D.update = function(o) {
      return ++m.cache && Ot(o === !0 ? 2 : 0);
    }, D.clearScrollMemory = ii, D.maxScroll = function(o, e) {
      return Bt(o, e ? ze : ue);
    }, D.getScrollFunc = function(o, e) {
      return Yt(je(o), e ? ze : ue);
    }, D.getById = function(o) {
      return xn[o];
    }, D.getAll = function() {
      return O.filter(function(o) {
        return o.vars.id !== "ScrollSmoother";
      });
    }, D.isScrolling = function() {
      return !!lt;
    }, D.snapDirectional = yn, D.addEventListener = function(o, e) {
      var n = Zt[o] || (Zt[o] = []);
      ~n.indexOf(e) || n.push(e);
    }, D.removeEventListener = function(o, e) {
      var n = Zt[o], t = n && n.indexOf(e);
      t >= 0 && n.splice(t, 1);
    }, D.batch = function(o, e) {
      var n = [], t = {}, r = e.interval || 0.016, i = e.batchMax || 1e9, a = function(x, X) {
        var B = [], h = [], u = p.delayedCall(r, function() {
          X(B, h), B = [], h = [];
        }).pause();
        return function(g) {
          B.length || u.restart(!0), B.push(g.trigger), h.push(g), i <= B.length && u.progress(1);
        };
      }, s;
      for (s in e)
        t[s] = s.substr(0, 2) === "on" && Fe(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
      return Fe(i) && (i = i(), ge(D, "refresh", function() {
        return i = e.batchMax();
      })), Hr(o).forEach(function(d) {
        var x = {};
        for (s in t)
          x[s] = t[s];
        x.trigger = d, n.push(D.create(x));
      }), n;
    };
    var ui = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, En = function o(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (se.isTouch ? " pinch-zoom" : "") : "none", e === ht && o(J, n);
    }, sn = {
      auto: 1,
      scroll: 1
    }, Ai = function(e) {
      var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, a = i._gsap || p.core.getCache(i), s = Le(), d;
      if (!a._isScrollT || s - a._isScrollT > 2e3) {
        for (; i && i !== J && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(sn[(d = _t(i)).overflowY] || sn[d.overflowX])); )
          i = i.parentNode;
        a._isScroll = i && i !== t && !jt(i) && (sn[(d = _t(i)).overflowY] || sn[d.overflowX]), a._isScrollT = s;
      }
      (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, fi = function(e, n, t, r) {
      return se.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && Ai,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return t && ge(j, se.eventTypes[0], pi, !1, !0);
        },
        onDisable: function() {
          return _e(j, se.eventTypes[0], pi, !0);
        }
      });
    }, zi = /(input|label|select|textarea)/i, di, pi = function(e) {
      var n = zi.test(e.target.tagName);
      (n || di) && (e._gsapAllow = !0, di = n);
    }, Ii = function(e) {
      Ur(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, a = n.onRelease, s, d, x = je(e.target) || ht, X = p.core.globals().ScrollSmoother, B = X && X.get(), h = Xt && (e.content && je(e.content) || B && e.content !== !1 && !B.smooth() && B.content()), u = Yt(x, ue), g = Yt(x, ze), q = 1, re = (se.isTouch && z.visualViewport ? z.visualViewport.scale * z.visualViewport.width : z.outerWidth) / z.innerWidth, W = 0, Qe = Fe(r) ? function() {
        return r(s);
      } : function() {
        return r || 2.8;
      }, ee, I, Re = fi(x, e.type, !0, i), ne = function() {
        return I = !1;
      }, M = St, Ke = St, vt = function() {
        d = Bt(x, ue), Ke = ar(Xt ? 1 : 0, d), t && (M = ar(0, Bt(x, ze))), ee = er;
      }, E = function() {
        h._gsap.y = wr(parseFloat(h._gsap.y) + u.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
      }, ke = function() {
        if (I) {
          requestAnimationFrame(ne);
          var fe = wr(s.deltaY / 2), le = Ke(u.v - fe);
          if (h && le !== u.v + u.offset) {
            u.offset = le - u.v;
            var l = wr((parseFloat(h && h._gsap.y) || 0) - u.offset);
            h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", h._gsap.y = l + "px", u.cacheID = m.cache, Ot();
          }
          return !0;
        }
        u.offset && E(), I = !0;
      }, T, Dt, Ce, Ye, Xe = function() {
        vt(), T.isActive() && T.vars.scrollY > d && (u() > d ? T.progress(1) && u(d) : T.resetTo("scrollY", d));
      };
      return h && p.set(h, {
        y: "+=0"
      }), e.ignoreCheck = function($) {
        return Xt && $.type === "touchmove" && ke() || q > 1.05 && $.type !== "touchstart" || s.isGesturing || $.touches && $.touches.length > 1;
      }, e.onPress = function() {
        I = !1;
        var $ = q;
        q = wr((z.visualViewport && z.visualViewport.scale || 1) / re), T.pause(), $ !== q && En(x, q > 1.01 ? !0 : t ? !1 : "x"), Dt = g(), Ce = u(), vt(), ee = er;
      }, e.onRelease = e.onGestureStart = function($, fe) {
        if (u.offset && E(), !fe)
          Ye.restart(!0);
        else {
          m.cache++;
          var le = Qe(), l, de;
          t && (l = g(), de = l + le * 0.05 * -$.velocityX / 0.227, le *= ui(g, l, de, Bt(x, ze)), T.vars.scrollX = M(de)), l = u(), de = l + le * 0.05 * -$.velocityY / 0.227, le *= ui(u, l, de, Bt(x, ue)), T.vars.scrollY = Ke(de), T.invalidate().duration(le).play(0.01), (Xt && T.vars.scrollY >= d || l >= d - 1) && p.to({}, {
            onUpdate: Xe,
            duration: le
          });
        }
        a && a($);
      }, e.onWheel = function() {
        T._ts && T.pause(), Le() - W > 1e3 && (ee = 0, W = Le());
      }, e.onChange = function($, fe, le, l, de) {
        if (er !== ee && vt(), fe && t && g(M(l[2] === fe ? Dt + ($.startX - $.x) : g() + fe - l[1])), le) {
          u.offset && E();
          var rr = de[2] === le, Ht = rr ? Ce + $.startY - $.y : u() + le - de[1], ct = Ke(Ht);
          rr && Ht !== ct && (Ce += ct - Ht), u(ct);
        }
        (le || fe) && Ot();
      }, e.onEnable = function() {
        En(x, t ? !1 : "x"), D.addEventListener("refresh", Xe), ge(z, "resize", Xe), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = g.smooth = !1), Re.enable();
      }, e.onDisable = function() {
        En(x, !0), _e(z, "resize", Xe), D.removeEventListener("refresh", Xe), Re.kill();
      }, e.lockAxis = e.lockAxis !== !1, s = new se(e), s.iOS = Xt, Xt && !u() && u(1), Xt && p.ticker.add(St), Ye = s._dc, T = p.to(s, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: ai(u, u(), function() {
            return T.pause();
          })
        },
        onUpdate: Ot,
        onComplete: Ye.vars.onComplete
      }), s;
    };
    D.sort = function(o) {
      return O.sort(o || function(e, n) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
      });
    }, D.observe = function(o) {
      return new se(o);
    }, D.normalizeScroll = function(o) {
      if (typeof o > "u")
        return Je;
      if (o === !0 && Je)
        return Je.enable();
      if (o === !1)
        return Je && Je.kill();
      var e = o instanceof se ? o : Ii(o);
      return Je && Je.target === e.target && Je.kill(), jt(e.target) && (Je = e), e;
    }, D.core = {
      _getVelocityProp: cn,
      _inputObserver: fi,
      _scrollers: m,
      _proxies: F,
      bridge: {
        ss: function() {
          lt || Jt("scrollStart"), lt = Le();
        },
        ref: function() {
          return Pe;
        }
      }
    }, Vn() && p.registerPlugin(D), k.ScrollTrigger = D, k.default = D, typeof window > "u" || window !== k ? Object.defineProperty(k, "__esModule", { value: !0 }) : delete window.default;
  });
})(An, An.exports);
var bi = An.exports;
qe.registerPlugin(bi.ScrollTrigger);
class wi extends ln {
  static create(S, k = {}, G = {}) {
    return new wi(S, k, G);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(S) {
    this.meta.speed = S;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(S) {
    this.meta.velocity = S;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(S) {
    this.meta.direction = S;
  }
  constructor(S, k = {}, G = {}) {
    super(
      (Y) => {
        var Ft, Se;
        Object.assign(Y.meta, {
          speed: k.speed ?? 1,
          velocity: k.velocity ?? 0,
          direction: k.direction || "rtl",
          onCreated: k.onCreated,
          onUpdate: k.onUpdate
        }), Y.meta.scrollTrigger = bi.ScrollTrigger.create({});
        let b = null;
        typeof S == "string" ? b = document.querySelector(S) : S instanceof HTMLElement && (b = S);
        const pe = k.createDOMContainers != null ? k.createDOMContainers : !0, C = pe ? document.createElement("div") : b == null ? void 0 : b.querySelector(".owow-marquee-outer");
        C == null || C.classList.add("owow-marquee-outer");
        const N = pe ? document.createElement("div") : C == null ? void 0 : C.querySelector(".owow-marquee-inner");
        if (N == null || N.classList.add("owow-marquee-inner"), !b || !C || !N)
          throw console.error({
            targetContainer: b,
            outerContainer: C,
            innerContainer: N
          }), new Error("Invalid marquee DOM structure");
        Y.meta.sourceDOM = b.cloneNode(!0), Y.meta.target = b, N.append(...b.childNodes), C.append(N), b == null || b.append(C), qe.set(N, { display: "inline-flex" });
        const he = b.getBoundingClientRect(), Ae = N.getBoundingClientRect(), dt = he.width + Ae.width, Ue = document.createDocumentFragment(), Ve = [];
        let Et = Ae.width;
        if (!dt || !Et)
          return;
        for (; Et <= dt; ) {
          const U = N.cloneNode(!0);
          Et += Ae.width, Ve.push(U);
        }
        Ue.append(...Ve), C.append(Ue);
        const Ze = qe.context(() => {
          qe.set(C, {
            x: 0,
            force3D: !0,
            width: Et,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Ee = qe.utils.pipe(
          (U) => Math.floor(U * 1e3) / 1e3,
          qe.quickSetter(C, "x", "px")
        ), Pt = qe.utils.wrap(0, -Ae.width), Ut = qe.utils.normalize(0, -Ae.width);
        let yt, pt, m, F, xe, st, Lt;
        const xt = qe.ticker.add(() => {
          var U, Vt;
          switch (pt = Y.meta.velocity != null ? Y.meta.scrollTrigger.getVelocity() ?? 0 : 0, m = pt * Y.meta.velocity, Y.meta.direction) {
            case "ltr":
              yt = -1, m = -Math.abs(m);
              break;
            case "rtl":
              yt = 1, m = Math.abs(m);
              break;
            case "scroll":
              yt = Y.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              yt = -(Y.meta.scrollTrigger.direction ?? 1), m = -m;
          }
          F = qe.getProperty(C, "x"), xe = Y.meta.speed * -yt, st = (xe - m) * qe.ticker.deltaRatio(), Lt = Pt(F + st), Ee(Lt), (Vt = (U = Y.meta).onUpdate) == null || Vt.call(U, Ut(Lt));
        });
        return (Se = (Ft = Y.meta).onCreated) == null || Se.call(Ft), () => {
          var U;
          for (Ze.kill(!0), qe.ticker.remove(xt), b == null || b.replaceChildren(...Y.meta.sourceDOM.childNodes); Ve.length; )
            (U = Ve.pop()) == null || U.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...G
      }
    );
  }
}
export {
  wi as Marquee,
  ln as Motion,
  mi as Pointer
};
