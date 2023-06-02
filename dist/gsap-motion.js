import { fromEvent as Dn, debounceTime as Li, Observable as Yi } from "rxjs";
import Ae from "gsap";
var Lr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xi(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var Bi = "Expected a function", _i = 0 / 0, Hi = "[object Symbol]", Ni = /^\s+|\s+$/g, Wi = /^[-+]0x[0-9a-f]+$/i, Gi = /^0b[01]+$/i, $i = /^0o[0-7]+$/i, qi = parseInt, Ui = typeof Lr == "object" && Lr && Lr.Object === Object && Lr, Vi = typeof self == "object" && self && self.Object === Object && self, ji = Ui || Vi || Function("return this")(), Qi = Object.prototype, Ki = Qi.toString, Zi = Math.max, Ji = Math.min, Rn = function() {
  return ji.Date.now();
};
function eo(h, T, S) {
  var G, Y, y, pe, C, N, he = 0, ze = !1, dt = !1, Ue = !0;
  if (typeof h != "function")
    throw new TypeError(Bi);
  T = vi(T) || 0, An(S) && (ze = !!S.leading, dt = "maxWait" in S, y = dt ? Zi(vi(S.maxWait) || 0, T) : y, Ue = "trailing" in S ? !!S.trailing : Ue);
  function Ve(L) {
    var xe = G, st = Y;
    return G = Y = void 0, he = L, pe = h.apply(st, xe), pe;
  }
  function Et(L) {
    return he = L, C = setTimeout(Pt, T), ze ? Ve(L) : pe;
  }
  function Ze(L) {
    var xe = L - N, st = L - he, Ft = T - xe;
    return dt ? Ji(Ft, y - st) : Ft;
  }
  function Ee(L) {
    var xe = L - N, st = L - he;
    return N === void 0 || xe >= T || xe < 0 || dt && st >= y;
  }
  function Pt() {
    var L = Rn();
    if (Ee(L))
      return Ut(L);
    C = setTimeout(Pt, Ze(L));
  }
  function Ut(L) {
    return C = void 0, Ue && G ? Ve(L) : (G = Y = void 0, pe);
  }
  function yt() {
    C !== void 0 && clearTimeout(C), he = 0, G = N = Y = C = void 0;
  }
  function pt() {
    return C === void 0 ? pe : Ut(Rn());
  }
  function b() {
    var L = Rn(), xe = Ee(L);
    if (G = arguments, Y = this, N = L, xe) {
      if (C === void 0)
        return Et(N);
      if (dt)
        return C = setTimeout(Pt, T), Ve(N);
    }
    return C === void 0 && (C = setTimeout(Pt, T)), pe;
  }
  return b.cancel = yt, b.flush = pt, b;
}
function An(h) {
  var T = typeof h;
  return !!h && (T == "object" || T == "function");
}
function to(h) {
  return !!h && typeof h == "object";
}
function ro(h) {
  return typeof h == "symbol" || to(h) && Ki.call(h) == Hi;
}
function vi(h) {
  if (typeof h == "number")
    return h;
  if (ro(h))
    return _i;
  if (An(h)) {
    var T = typeof h.valueOf == "function" ? h.valueOf() : h;
    h = An(T) ? T + "" : T;
  }
  if (typeof h != "string")
    return h === 0 ? h : +h;
  h = h.replace(Ni, "");
  var S = Gi.test(h);
  return S || $i.test(h) ? qi(h.slice(2), S ? 2 : 8) : Wi.test(h) ? _i : +h;
}
var no = eo;
const io = /* @__PURE__ */ Xi(no), bi = class {
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
  constructor(h, T = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = io(
      () => {
        var S;
        (S = this.cleanup) == null || S.call(this, this.context), requestAnimationFrame(() => {
          var G;
          this.cleanup = ((G = this.create) == null ? void 0 : G.call(this, this, this.context)) ?? void 0;
        });
      },
      bi.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var S, G;
      (S = this.cleanup) == null || S.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const Y of Object.keys(this.meta))
        delete this.meta[Y];
      for (; this.subscriptions.length; )
        (G = this.subscriptions.pop()) == null || G.unsubscribe();
    }, this.observeMedia(On(T.watchMedia)), this.observeResize(On(T.shouldResetOnResize)), this.create = () => {
      var Y;
      return this.context = Ae.context(), [
        On(T.enable) ?? !0,
        ((Y = this.mediaQueryList) == null ? void 0 : Y.matches) ?? !0
      ].every(Boolean) ? h(this, this.context) : void 0;
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
  static applyDeltaRatio(h) {
    return h * Ae.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(h) {
    h && (this.mediaQueryList = matchMedia(h), this.subscriptions.push(Dn(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(h) {
    h && (this.motionResizeObserver = new oo(h), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Li(100)).subscribe(() => this.reset())
    ));
  }
};
let ln = bi;
ln.resetDebounceTime = 100;
ln.referenceFramerate = 60;
class oo {
  constructor(T) {
    const [S, G] = [T].flat();
    this.element = typeof S == "string" ? document.querySelector(S) : S, this.axis = G, this.observable = new Yi((Y) => {
      const y = new ResizeObserver(
        (pe) => this.handleResize(pe, Y)
      );
      return this.element && y.observe(this.element), () => y.disconnect();
    });
  }
  handleResize(T, S) {
    const G = T.find((he) => he.target === this.element);
    if (!G)
      return;
    const { inlineSize: Y, blockSize: y } = G.borderBoxSize[0], pe = Y !== this.inlineSize, C = y !== this.blockSize, N = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = Y, this.blockSize = y, !N) {
      if (this.axis === "horizontal" && pe || this.axis === "vertical" && C)
        return S.next();
      !this.axis && (pe || C) && S.next();
    }
  }
}
function On(h) {
  return h instanceof Function ? h() : h;
}
class mi extends ln {
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
      (T) => {
        T.meta.observable = Dn(window, "mousemove"), T.subscriptions.push(
          T.meta.observable.subscribe((S) => {
            this.clientX = S.clientX, this.clientY = S.clientY, this.normalX = Ae.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = Ae.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), T.subscriptions.push(
          Dn(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), T.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new mi());
  }
  get observable() {
    return this.meta.observable;
  }
}
var zn = { exports: {} };
(function(h, T) {
  (function(S, G) {
    G(T);
  })(Lr, function(S) {
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
    var y, pe, C, N, he, ze, dt, Ue, Ve, Et, Ze, Ee, Pt, Ut = function() {
      return y || typeof window < "u" && (y = window.gsap) && y.registerPlugin && y;
    }, yt = 1, pt = [], b = [], L = [], xe = Date.now, st = function(e, n) {
      return n;
    }, Ft = function() {
      var e = Ve.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
      t.push.apply(t, b), r.push.apply(r, L), b = t, L = r, st = function(a, s) {
        return n[a](s);
      };
    }, xt = function(e, n) {
      return ~L.indexOf(e) && L[L.indexOf(e) + 1][n];
    }, Lt = function(e) {
      return !!~Et.indexOf(e);
    }, Te = function(e, n, t, r, i) {
      return e.addEventListener(n, t, {
        passive: !r,
        capture: !!i
      });
    }, U = function(e, n, t, r) {
      return e.removeEventListener(n, t, !!r);
    }, Vt = "scrollLeft", Yr = "scrollTop", an = function() {
      return Ze && Ze.isPressed || b.cache++;
    }, Xr = function(e, n) {
      var t = function r(i) {
        if (i || i === 0) {
          yt && (C.history.scrollRestoration = "manual");
          var a = Ze && Ze.isPressed;
          i = r.v = Math.round(i) || (Ze && Ze.iOS ? 1 : 0), e(i), r.cacheID = b.cache, a && st("ss", i);
        } else
          (n || b.cache !== r.cacheID || st("ref")) && (r.cacheID = b.cache, r.v = e());
        return r.v + r.offset;
      };
      return t.offset = 0, e && t;
    }, Ie = {
      s: Vt,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Xr(function(o) {
        return arguments.length ? C.scrollTo(o, ue.sc()) : C.pageXOffset || N[Vt] || he[Vt] || ze[Vt] || 0;
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
      op: Ie,
      sc: Xr(function(o) {
        return arguments.length ? C.scrollTo(Ie.sc(), o) : C.pageYOffset || N[Yr] || he[Yr] || ze[Yr] || 0;
      })
    }, je = function(e) {
      return y.utils.toArray(e)[0] || (typeof e == "string" && y.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
    }, Yt = function(e, n) {
      var t = n.s, r = n.sc;
      Lt(e) && (e = N.scrollingElement || he);
      var i = b.indexOf(e), a = r === ue.sc ? 1 : 2;
      !~i && (i = b.push(e) - 1), b[i + a] || e.addEventListener("scroll", an);
      var s = b[i + a], d = s || (b[i + a] = Xr(xt(e, t), !0) || (Lt(e) ? r : Xr(function(x) {
        return arguments.length ? e[t] = x : e[t];
      })));
      return d.target = e, s || (d.smooth = y.getProperty(e, "scrollBehavior") === "smooth"), d;
    }, cn = function(e, n, t) {
      var r = e, i = e, a = xe(), s = a, d = n || 50, x = Math.max(500, d * 3), X = function(_, q) {
        var re = xe();
        q || re - a > d ? (i = r, r = _, s = a, a = re) : t ? r += _ : r = i + (_ - i) / (re - s) * (a - s);
      }, B = function() {
        i = r = t ? 0 : r, s = a = 0;
      }, g = function(_) {
        var q = s, re = i, W = xe();
        return (_ || _ === 0) && _ !== r && X(_), a === s || W - s > x ? 0 : (r + (t ? re : -re)) / ((t ? W : a) - q) * 1e3;
      };
      return {
        update: X,
        reset: B,
        getVelocity: g
      };
    }, br = function(e, n) {
      return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, In = function(e) {
      var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
      return Math.abs(n) >= Math.abs(t) ? n : t;
    }, Fn = function() {
      Ve = y.core.globals().ScrollTrigger, Ve && Ve.core && Ft();
    }, Ln = function(e) {
      return y = e || Ut(), y && typeof document < "u" && document.body && (C = window, N = document, he = N.documentElement, ze = N.body, Et = [C, N, he, ze], y.utils.clamp, Pt = y.core.context || function() {
      }, Ue = "onpointerenter" in ze ? "pointer" : "mouse", dt = se.isTouch = C.matchMedia && C.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in C || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ee = se.eventTypes = ("ontouchstart" in he ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in he ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
        return yt = 0;
      }, 500), Fn(), pe = 1), pe;
    };
    Ie.op = ue, b.cache = 0;
    var se = function() {
      function o(n) {
        this.init(n);
      }
      var e = o.prototype;
      return e.init = function(t) {
        pe || Ln(y) || console.warn("Please gsap.registerPlugin(Observer)"), Ve || Fn();
        var r = t.tolerance, i = t.dragMinimum, a = t.type, s = t.target, d = t.lineHeight, x = t.debounce, X = t.preventDefault, B = t.onStop, g = t.onStopDelay, u = t.ignore, _ = t.wheelSpeed, q = t.event, re = t.onDragStart, W = t.onDragEnd, Qe = t.onDrag, ee = t.onPress, I = t.onRelease, Re = t.onRight, ne = t.onLeft, M = t.onUp, Ke = t.onDown, vt = t.onChangeX, E = t.onChangeY, ke = t.onChange, k = t.onToggleX, Dt = t.onToggleY, Ce = t.onHover, Xe = t.onHoverEnd, Be = t.onMove, $ = t.ignoreCheck, fe = t.isNormalizer, le = t.onGestureStart, l = t.onGestureEnd, de = t.onWheel, rr = t.onEnable, Ht = t.onDisable, ct = t.onClick, Nt = t.scrollSpeed, V = t.capture, Oe = t.allowClicks, He = t.lockAxis, Rr = t.onLockAxis;
        this.target = s = je(s) || he, this.vars = t, u && (u = y.utils.toArray(u)), r = r || 1e-9, i = i || 0, _ = _ || 1, Nt = Nt || 1, a = a || "wheel,touch,pointer", x = x !== !1, d || (d = parseFloat(C.getComputedStyle(ze).lineHeight) || 22);
        var rt, ut, F, ve, nt, St, Ne, c = this, At = 0, Q = 0, Wt = Yt(s, Ie), Gt = Yt(s, ue), hr = Wt(), We = Gt(), Or = ~a.indexOf("touch") && !~a.indexOf("pointer") && Ee[0] === "pointerdown", $t = Lt(s), ie = s.ownerDocument || N, it = [0, 0, 0], Ge = [0, 0, 0], Dr = 0, $e = function() {
          return Dr = xe();
        }, kt = function(m, f) {
          return (c.event = m) && u && ~u.indexOf(m.target) || f && Or && m.pointerType !== "touch" || $ && $(m, f);
        }, Ar = function() {
          c._vx.reset(), c._vy.reset(), ut.pause(), B && B(c);
        }, qt = function() {
          var m = c.deltaX = In(it), f = c.deltaY = In(Ge), v = Math.abs(m) >= r, w = Math.abs(f) >= r;
          ke && (v || w) && ke(c, m, f, it, Ge), v && (Re && c.deltaX > 0 && Re(c), ne && c.deltaX < 0 && ne(c), vt && vt(c), k && c.deltaX < 0 != At < 0 && k(c), At = c.deltaX, it[0] = it[1] = it[2] = 0), w && (Ke && c.deltaY > 0 && Ke(c), M && c.deltaY < 0 && M(c), E && E(c), Dt && c.deltaY < 0 != Q < 0 && Dt(c), Q = c.deltaY, Ge[0] = Ge[1] = Ge[2] = 0), (ve || F) && (Be && Be(c), F && (Qe(c), F = !1), ve = !1), St && !(St = !1) && Rr && Rr(c), nt && (de(c), nt = !1), rt = 0;
        }, gr = function(m, f, v) {
          it[v] += m, Ge[v] += f, c._vx.update(m), c._vy.update(f), x ? rt || (rt = requestAnimationFrame(qt)) : qt();
        }, nr = function(m, f) {
          He && !Ne && (c.axis = Ne = Math.abs(m) > Math.abs(f) ? "x" : "y", St = !0), Ne !== "y" && (it[2] += m, c._vx.update(m, !0)), Ne !== "x" && (Ge[2] += f, c._vy.update(f, !0)), x ? rt || (rt = requestAnimationFrame(qt)) : qt();
        }, ir = function(m) {
          if (!kt(m, 1)) {
            m = br(m, X);
            var f = m.clientX, v = m.clientY, w = f - c.x, R = v - c.y, be = c.isDragging;
            c.x = f, c.y = v, (be || Math.abs(c.startX - f) >= i || Math.abs(c.startY - v) >= i) && (Qe && (F = !0), be || (c.isDragging = !0), nr(w, R), be || re && re(c));
          }
        }, A = c.onPress = function(P) {
          kt(P, 1) || P && P.button || (c.axis = Ne = null, ut.pause(), c.isPressed = !0, P = br(P), At = Q = 0, c.startX = c.x = P.clientX, c.startY = c.y = P.clientY, c._vx.reset(), c._vy.reset(), Te(fe ? s : ie, Ee[1], ir, X, !0), c.deltaX = c.deltaY = 0, ee && ee(c));
        }, zt = c.onRelease = function(P) {
          if (!kt(P, 1)) {
            U(fe ? s : ie, Ee[1], ir, !0);
            var m = !isNaN(c.y - c.startY), f = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), v = br(P);
            !f && m && (c._vx.reset(), c._vy.reset(), X && Oe && y.delayedCall(0.08, function() {
              if (xe() - Dr > 300 && !P.defaultPrevented) {
                if (P.target.click)
                  P.target.click();
                else if (ie.createEvent) {
                  var w = ie.createEvent("MouseEvents");
                  w.initMouseEvent("click", !0, !0, C, 1, v.screenX, v.screenY, v.clientX, v.clientY, !1, !1, !1, !1, 0, null), P.target.dispatchEvent(w);
                }
              }
            })), c.isDragging = c.isGesturing = c.isPressed = !1, B && !fe && ut.restart(!0), W && f && W(c), I && I(c, f);
          }
        }, bt = function(m) {
          return m.touches && m.touches.length > 1 && (c.isGesturing = !0) && le(m, c.isDragging);
        }, mt = function() {
          return (c.isGesturing = !1) || l(c);
        }, ft = function(m) {
          if (!kt(m)) {
            var f = Wt(), v = Gt();
            gr((f - hr) * Nt, (v - We) * Nt, 1), hr = f, We = v, B && ut.restart(!0);
          }
        }, wt = function(m) {
          if (!kt(m)) {
            m = br(m, X), de && (nt = !0);
            var f = (m.deltaMode === 1 ? d : m.deltaMode === 2 ? C.innerHeight : 1) * _;
            gr(m.deltaX * f, m.deltaY * f, 0), B && !fe && ut.restart(!0);
          }
        }, or = function(m) {
          if (!kt(m)) {
            var f = m.clientX, v = m.clientY, w = f - c.x, R = v - c.y;
            c.x = f, c.y = v, ve = !0, (w || R) && nr(w, R);
          }
        }, _r = function(m) {
          c.event = m, Ce(c);
        }, It = function(m) {
          c.event = m, Xe(c);
        }, zr = function(m) {
          return kt(m) || br(m, X) && ct(c);
        };
        ut = c._dc = y.delayedCall(g || 0.25, Ar).pause(), c.deltaX = c.deltaY = 0, c._vx = cn(0, 50, !0), c._vy = cn(0, 50, !0), c.scrollX = Wt, c.scrollY = Gt, c.isDragging = c.isGesturing = c.isPressed = !1, Pt(this), c.enable = function(P) {
          return c.isEnabled || (Te($t ? ie : s, "scroll", an), a.indexOf("scroll") >= 0 && Te($t ? ie : s, "scroll", ft, X, V), a.indexOf("wheel") >= 0 && Te(s, "wheel", wt, X, V), (a.indexOf("touch") >= 0 && dt || a.indexOf("pointer") >= 0) && (Te(s, Ee[0], A, X, V), Te(ie, Ee[2], zt), Te(ie, Ee[3], zt), Oe && Te(s, "click", $e, !1, !0), ct && Te(s, "click", zr), le && Te(ie, "gesturestart", bt), l && Te(ie, "gestureend", mt), Ce && Te(s, Ue + "enter", _r), Xe && Te(s, Ue + "leave", It), Be && Te(s, Ue + "move", or)), c.isEnabled = !0, P && P.type && A(P), rr && rr(c)), c;
        }, c.disable = function() {
          c.isEnabled && (pt.filter(function(P) {
            return P !== c && Lt(P.target);
          }).length || U($t ? ie : s, "scroll", an), c.isPressed && (c._vx.reset(), c._vy.reset(), U(fe ? s : ie, Ee[1], ir, !0)), U($t ? ie : s, "scroll", ft, V), U(s, "wheel", wt, V), U(s, Ee[0], A, V), U(ie, Ee[2], zt), U(ie, Ee[3], zt), U(s, "click", $e, !0), U(s, "click", zr), U(ie, "gesturestart", bt), U(ie, "gestureend", mt), U(s, Ue + "enter", _r), U(s, Ue + "leave", It), U(s, Ue + "move", or), c.isEnabled = c.isPressed = c.isDragging = !1, Ht && Ht(c));
        }, c.kill = c.revert = function() {
          c.disable();
          var P = pt.indexOf(c);
          P >= 0 && pt.splice(P, 1), Ze === c && (Ze = 0);
        }, pt.push(c), fe && Lt(s) && (Ze = c), c.enable(q);
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
    }, Ut() && y.registerPlugin(se);
    /*!
     * ScrollTrigger 3.11.5
     * https://greensock.com
     *
     * @license Copyright 2008-2023, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var p, lr, z, j, ht, J, Yn, Br, Hr, ar, Nr, Wr, Pe, Gr, un, Fe, Xn, Bn, cr, Hn, fn, Nn, Je, Wn, Gn, $n, Xt, dn, pn, hn, $r = 1, Le = Date.now, gn = Le(), lt = 0, mr = 0, xi = function o() {
      return mr && requestAnimationFrame(o);
    }, qn = function() {
      return Gr = 1;
    }, Un = function() {
      return Gr = 0;
    }, Tt = function(e) {
      return e;
    }, wr = function(e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    }, Vn = function() {
      return typeof window < "u";
    }, jn = function() {
      return p || Vn() && (p = window.gsap) && p.registerPlugin && p;
    }, jt = function(e) {
      return !!~Yn.indexOf(e);
    }, Qn = function(e) {
      return xt(e, "getBoundingClientRect") || (jt(e) ? function() {
        return on.width = z.innerWidth, on.height = z.innerHeight, on;
      } : function() {
        return Rt(e);
      });
    }, Ti = function(e, n, t) {
      var r = t.d, i = t.d2, a = t.a;
      return (a = xt(e, "getBoundingClientRect")) ? function() {
        return a()[r];
      } : function() {
        return (n ? z["inner" + i] : e["client" + i]) || 0;
      };
    }, Si = function(e, n) {
      return !n || ~L.indexOf(e) ? Qn(e) : function() {
        return on;
      };
    }, Bt = function(e, n) {
      var t = n.s, r = n.d2, i = n.d, a = n.a;
      return Math.max(0, (t = "scroll" + r) && (a = xt(e, t)) ? a() - Qn(e)()[i] : jt(e) ? (ht[t] || J[t]) - (z["inner" + r] || ht["client" + r] || J["client" + r]) : e[t] - e["offset" + r]);
    }, qr = function(e, n) {
      for (var t = 0; t < cr.length; t += 3)
        (!n || ~n.indexOf(cr[t + 1])) && e(cr[t], cr[t + 1], cr[t + 2]);
    }, gt = function(e) {
      return typeof e == "string";
    }, Ye = function(e) {
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
    }, ur = Math.abs, Kn = "left", Zn = "top", vn = "right", bn = "bottom", Qt = "width", Kt = "height", Tr = "Right", Sr = "Left", kr = "Top", Cr = "Bottom", te = "padding", at = "margin", fr = "Width", mn = "Height", Se = "px", _t = function(e) {
      return z.getComputedStyle(e);
    }, ki = function(e) {
      var n = _t(e).position;
      e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
    }, Jn = function(e, n) {
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
    }, ei = function(e) {
      var n = [], t = e.labels, r = e.duration(), i;
      for (i in t)
        n.push(t[i] / r);
      return n;
    }, Ci = function(e) {
      return function(n) {
        return p.utils.snap(ei(e), n);
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
    }, Mi = function(e) {
      return function(n, t) {
        return yn(ei(e))(n, t.direction);
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
    }, ti = {
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
      var x = i.startColor, X = i.endColor, B = i.fontSize, g = i.indent, u = i.fontWeight, _ = j.createElement("div"), q = jt(t) || xt(t, "pinType") === "fixed", re = e.indexOf("scroller") !== -1, W = q ? J : t, Qe = e.indexOf("start") !== -1, ee = Qe ? x : X, I = "border-color:" + ee + ";font-size:" + B + ";color:" + ee + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return I += "position:" + ((re || d) && q ? "fixed;" : "absolute;"), (re || d || !q) && (I += (r === ue ? vn : bn) + ":" + (a + parseFloat(g)) + "px;"), s && (I += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), _._isStart = Qe, _.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), _.style.cssText = I, _.innerText = n || n === 0 ? e + "-" + n : e, W.children[0] ? W.insertBefore(_, W.children[0]) : W.appendChild(_), _._offset = _["offset" + r.op.d2], en(_, 0, r, Qe), _;
    }, en = function(e, n, t, r) {
      var i = {
        display: "block"
      }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
      e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + a + fr] = 1, i["border" + s + fr] = 0, i[t.p] = n + "px", p.set(e, i);
    }, O = [], xn = {}, Mr, ri = function() {
      return Le() - lt > 34 && (Mr || (Mr = requestAnimationFrame(Ot)));
    }, dr = function() {
      (!Je || !Je.isPressed || Je.startX > J.clientWidth) && (b.cache++, Je ? Mr || (Mr = requestAnimationFrame(Ot)) : Ot(), lt || Jt("scrollStart"), lt = Le());
    }, Tn = function() {
      $n = z.innerWidth, Gn = z.innerHeight;
    }, Er = function() {
      b.cache++, !Pe && !Nn && !j.fullscreenElement && !j.webkitFullscreenElement && (!Wn || $n !== z.innerWidth || Math.abs(z.innerHeight - Gn) > z.innerHeight * 0.25) && Br.restart(!0);
    }, Zt = {}, Ei = [], ni = function o() {
      return _e(D, "scrollEnd", o) || tr(!0);
    }, Jt = function(e) {
      return Zt[e] && Zt[e].map(function(n) {
        return n();
      }) || Ei;
    }, et = [], ii = function(e) {
      for (var n = 0; n < et.length; n += 5)
        (!e || et[n + 4] && et[n + 4].query === e) && (et[n].style.cssText = et[n + 1], et[n].getBBox && et[n].setAttribute("transform", et[n + 2] || ""), et[n + 3].uncache = 1);
    }, Sn = function(e, n) {
      var t;
      for (Fe = 0; Fe < O.length; Fe++)
        t = O[Fe], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
      n && ii(n), n || Jt("revert");
    }, oi = function(e, n) {
      b.cache++, (n || !tt) && b.forEach(function(t) {
        return Ye(t) && t.cacheID++ && (t.rec = 0);
      }), gt(e) && (z.history.scrollRestoration = pn = e);
    }, tt, er = 0, si, Pi = function() {
      if (si !== er) {
        var e = si = er;
        requestAnimationFrame(function() {
          return e === er && tr(!0);
        });
      }
    }, tr = function(e, n) {
      if (lt && !e) {
        ge(D, "scrollEnd", ni);
        return;
      }
      tt = D.isRefreshing = !0, b.forEach(function(r) {
        return Ye(r) && r.cacheID++ && (r.rec = r());
      });
      var t = Jt("refreshInit");
      Hn && D.sort(), n || Sn(), b.forEach(function(r) {
        Ye(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
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
      }), b.forEach(function(r) {
        Ye(r) && (r.smooth && requestAnimationFrame(function() {
          return r.target.style.scrollBehavior = "smooth";
        }), r.rec && r(r.rec));
      }), oi(pn, 1), Br.pause(), er++, tt = 2, Ot(2), O.forEach(function(r) {
        return Ye(r.vars.onRefresh) && r.vars.onRefresh(r);
      }), tt = D.isRefreshing = !1, Jt("refresh");
    }, kn = 0, tn = 1, Pr, Ot = function(e) {
      if (!tt || e === 2) {
        D.isUpdating = !0, Pr && Pr.update(0);
        var n = O.length, t = Le(), r = t - gn >= 50, i = n && O[0].scroll();
        if (tn = kn > i ? -1 : 1, tt || (kn = i), r && (lt && !Gr && t - lt > 200 && (lt = 0, Jt("scrollEnd")), Nr = gn, gn = t), tn < 0) {
          for (Fe = n; Fe-- > 0; )
            O[Fe] && O[Fe].update(0, r);
          tn = 1;
        } else
          for (Fe = 0; Fe < n; Fe++)
            O[Fe] && O[Fe].update(0, r);
        D.isUpdating = !1;
      }
      Mr = 0;
    }, Cn = [Kn, Zn, bn, vn, at + Cr, at + Tr, at + kr, at + Sr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], rn = Cn.concat([Qt, Kt, "boxSizing", "max" + fr, "max" + mn, "position", at, te, te + kr, te + Tr, te + Cr, te + Sr]), Ri = function(e, n, t) {
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
        a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[bn] = s[vn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Qt] = wn(e, Ie) + Se, a[Kt] = wn(e, ue) + Se, a[te] = s[at] = s[Zn] = s[Kn] = "0", pr(r), s[Qt] = s["max" + fr] = t[Qt], s[Kt] = s["max" + mn] = t[Kt], s[te] = t[te], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, Oi = /([A-Z])/g, pr = function(e) {
      if (e) {
        var n = e.t.style, t = e.length, r = 0, i, a;
        for ((e.t._gsap || p.core.getCache(e.t)).uncache = 1; r < t; r += 2)
          a = e[r + 1], i = e[r], a ? n[i] = a : n[i] && n.removeProperty(i.replace(Oi, "-$1").toLowerCase());
      }
    }, nn = function(e) {
      for (var n = rn.length, t = e.style, r = [], i = 0; i < n; i++)
        r.push(rn[i], t[rn[i]]);
      return r.t = e, r;
    }, Di = function(e, n, t) {
      for (var r = [], i = e.length, a = t ? 8 : 0, s; a < i; a += 2)
        s = e[a], r.push(s, s in n ? n[s] : e[a + 1]);
      return r.t = e.t, r;
    }, on = {
      left: 0,
      top: 0
    }, li = function(e, n, t, r, i, a, s, d, x, X, B, g, u) {
      Ye(e) && (e = e(d)), gt(e) && e.substr(0, 3) === "max" && (e = g + (e.charAt(4) === "=" ? Zr("0" + e.substr(3), t) : 0));
      var _ = u ? u.time() : 0, q, re, W;
      if (u && u.seek(0), yr(e))
        u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, g, e)), s && en(s, t, r, !0);
      else {
        Ye(n) && (n = n(d));
        var Qe = (e || "0").split(" "), ee, I, Re, ne;
        W = je(n) || J, ee = Rt(W) || {}, (!ee || !ee.left && !ee.top) && _t(W).display === "none" && (ne = W.style.display, W.style.display = "block", ee = Rt(W), ne ? W.style.display = ne : W.style.removeProperty("display")), I = Zr(Qe[0], ee[r.d]), Re = Zr(Qe[1] || "0", t), e = ee[r.p] - x[r.p] - X + I + i - Re, s && en(s, Re, r, t - Re < 20 || s._isStart && Re > 20), t -= t - Re;
      }
      if (a) {
        var M = e + t, Ke = a._isStart;
        q = "scroll" + r.d2, en(a, M, r, Ke && M > 20 || !Ke && (B ? Math.max(J[q], ht[q]) : a.parentNode[q]) <= M + 1), B && (x = Rt(s), B && (a.style[r.op.p] = x[r.op.p] - r.op.m - a._offset + Se));
      }
      return u && W && (q = Rt(W), u.seek(g), re = Rt(W), u._caScrollDist = q[r.p] - re[r.p], e = e / u._caScrollDist * g), u && u.seek(_), u ? e : Math.round(e);
    }, Ai = /(webkit|moz|length|cssText|inset)/i, ai = function(e, n, t, r) {
      if (e.parentNode !== n) {
        var i = e.style, a, s;
        if (n === J) {
          e._stOrig = i.cssText, s = _t(e);
          for (a in s)
            !+a && !Ai.test(a) && s[a] && typeof i[a] == "string" && a !== "0" && (i[a] = s[a]);
          i.top = t, i.left = r;
        } else
          i.cssText = e._stOrig;
        p.core.getCache(e).uncache = 1, n.appendChild(e);
      }
    }, ci = function(e, n, t) {
      var r = n, i = r;
      return function(a) {
        var s = Math.round(e());
        return s !== r && s !== i && Math.abs(s - r) > 3 && Math.abs(s - i) > 3 && (a = s, t && t()), i = r, r = a, a;
      };
    }, ui = function(e, n) {
      var t = Yt(e, n), r = "_scroll" + n.p2, i = function a(s, d, x, X, B) {
        var g = a.tween, u = d.onComplete, _ = {};
        x = x || t();
        var q = ci(t, x, function() {
          g.kill(), a.tween = 0;
        });
        return B = X && B || 0, X = X || s - x, g && g.kill(), d[r] = s, d.modifiers = _, _[r] = function() {
          return q(x + X * g.ratio + B * g.ratio * g.ratio);
        }, d.onUpdate = function() {
          b.cache++, Ot();
        }, d.onComplete = function() {
          a.tween = 0, u && u.call(g);
        }, g = a.tween = p.to(e, d), g;
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
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !mr) {
          this.update = this.refresh = this.kill = Tt;
          return;
        }
        t = Jn(gt(t) || yr(t) || t.nodeType ? {
          trigger: t
        } : t, Qr);
        var i = t, a = i.onUpdate, s = i.toggleClass, d = i.id, x = i.onToggle, X = i.onRefresh, B = i.scrub, g = i.trigger, u = i.pin, _ = i.pinSpacing, q = i.invalidateOnRefresh, re = i.anticipatePin, W = i.onScrubComplete, Qe = i.onSnapComplete, ee = i.once, I = i.snap, Re = i.pinReparent, ne = i.pinSpacer, M = i.containerAnimation, Ke = i.fastScrollEnd, vt = i.preventOverlaps, E = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ie : ue, ke = !B && B !== 0, k = je(t.scroller || z), Dt = p.core.getCache(k), Ce = jt(k), Xe = ("pinType" in t ? t.pinType : xt(k, "pinType") || Ce && "fixed") === "fixed", Be = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], $ = ke && t.toggleActions.split(" "), fe = "markers" in t ? t.markers : Qr.markers, le = Ce ? 0 : parseFloat(_t(k)["border" + E.p2 + fr]) || 0, l = this, de = t.onRefreshInit && function() {
          return t.onRefreshInit(l);
        }, rr = Ti(k, Ce, E), Ht = Si(k, Ce), ct = 0, Nt = 0, V = Yt(k, E), Oe, He, Rr, rt, ut, F, ve, nt, St, Ne, c, At, Q, Wt, Gt, hr, We, Or, $t, ie, it, Ge, Dr, $e, kt, Ar, qt, gr, nr, ir, A, zt, bt, mt, ft, wt, or, _r, It;
        if (dn(l), l._dir = E, re *= 45, l.scroller = k, l.scroll = M ? M.time.bind(M) : V, rt = V(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (Hn = 1, t.refreshPriority === -9999 && (Pr = l)), Dt.tweenScroll = Dt.tweenScroll || {
          top: ui(k, ue),
          left: ui(k, Ie)
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
        }), "scrollBehavior" in J.style && p.set(Ce ? [J, ht] : k, {
          scrollBehavior: "auto"
        }), b.forEach(function(f) {
          return Ye(f) && f.target === (Ce ? j.scrollingElement || ht : k) && (f.smooth = !1);
        }), Rr = Ye(I.snapTo) ? I.snapTo : I.snapTo === "labels" ? Ci(r) : I.snapTo === "labelsDirectional" ? Mi(r) : I.directional !== !1 ? function(f, v) {
          return yn(I.snapTo)(f, Le() - Nt < 500 ? 0 : v.direction);
        } : p.utils.snap(I.snapTo), bt = I.duration || {
          min: 0.1,
          max: 2
        }, bt = Ur(bt) ? ar(bt.min, bt.max) : ar(bt, bt), mt = p.delayedCall(I.delay || zt / 2 || 0.1, function() {
          var f = V(), v = Le() - Nt < 500, w = Oe.tween;
          if ((v || Math.abs(l.getVelocity()) < 10) && !w && !Gr && ct !== f) {
            var R = (f - F) / Q, be = r && !ke ? r.totalProgress() : R, H = v ? 0 : (be - ir) / (Le() - Nr) * 1e3 || 0, K = p.utils.clamp(-R, 1 - R, ur(H / 2) * H / 0.185), Me = R + (I.inertia === !1 ? 0 : K), me = ar(0, 1, Rr(Me, l)), ae = Math.round(F + me * Q), Z = I, ot = Z.onStart, qe = Z.onInterrupt, we = Z.onComplete;
            if (f <= ve && f >= F && ae !== f) {
              if (w && !w._initted && w.data <= ur(ae - f))
                return;
              I.inertia === !1 && (K = me - R), Oe(ae, {
                duration: bt(ur(Math.max(ur(Me - be), ur(me - be)) * 0.185 / H / 0.05 || 0)),
                ease: I.ease || "power3",
                data: ur(ae - f),
                onInterrupt: function() {
                  return mt.restart(!0) && qe && qe(l);
                },
                onComplete: function() {
                  l.update(), ct = V(), nr = ir = r && !ke ? r.totalProgress() : l.progress, Qe && Qe(l), we && we(l);
                }
              }, f, K * Q, ae - f - K * Q), ot && ot(l, Oe.tween);
            }
          } else
            l.isActive && ct !== f && mt.restart(!0);
        }).pause()), d && (xn[d] = l), g = l.trigger = je(g || u), It = g && g._gsap && g._gsap.stRevert, It && (It = It(l)), u = u === !0 ? g : je(u), gt(s) && (s = {
          targets: g,
          className: s
        }), u && (_ === !1 || _ === at || (_ = !_ && u.parentNode && u.parentNode.style && _t(u.parentNode).display === "flex" ? !1 : te), l.pin = u, He = p.core.getCache(u), He.spacer ? Wt = He.pinState : (ne && (ne = je(ne), ne && !ne.nodeType && (ne = ne.current || ne.nativeElement), He.spacerIsNative = !!ne, ne && (He.spacerState = nn(ne))), He.spacer = We = ne || j.createElement("div"), We.classList.add("pin-spacer"), d && We.classList.add("pin-spacer-" + d), He.pinState = Wt = nn(u)), t.force3D !== !1 && p.set(u, {
          force3D: !0
        }), l.spacer = We = He.spacer, gr = _t(u), Dr = gr[_ + E.os2], $t = p.getProperty(u), ie = p.quickSetter(u, E.a, Se), Mn(u, We, gr), hr = nn(u)), fe) {
          At = Ur(fe) ? Jn(fe, ti) : ti, Ne = Jr("scroller-start", d, k, E, At, 0), c = Jr("scroller-end", d, k, E, At, 0, Ne), Or = Ne["offset" + E.op.d2];
          var zr = je(xt(k, "content") || k);
          nt = this.markerStart = Jr("start", d, zr, E, At, Or, 0, M), St = this.markerEnd = Jr("end", d, zr, E, At, Or, 0, M), M && (_r = p.quickSetter([nt, St], E.a, Se)), !Xe && !(L.length && xt(k, "fixedMarkers") === !0) && (ki(Ce ? J : k), p.set([Ne, c], {
            force3D: !0
          }), kt = p.quickSetter(Ne, E.a, Se), qt = p.quickSetter(c, E.a, Se));
        }
        if (M) {
          var P = M.vars.onUpdate, m = M.vars.onUpdateParams;
          M.eventCallback("onUpdate", function() {
            l.update(0, 0, 1), P && P.apply(M, m || []);
          });
        }
        l.previous = function() {
          return O[O.indexOf(l) - 1];
        }, l.next = function() {
          return O[O.indexOf(l) + 1];
        }, l.revert = function(f, v) {
          if (!v)
            return l.kill(!0);
          var w = f !== !1 || !l.enabled, R = Pe;
          w !== l.isReverted && (w && (wt = Math.max(V(), l.scroll.rec || 0), ft = l.progress, or = r && r.progress()), nt && [nt, St, Ne, c].forEach(function(be) {
            return be.style.display = w ? "none" : "block";
          }), w && (Pe = l, l.update(w)), u && (!Re || !l.isActive) && (w ? Ri(u, We, Wt) : Mn(u, We, _t(u), $e)), w || l.update(w), Pe = R, l.isReverted = w);
        }, l.refresh = function(f, v) {
          if (!((Pe || !l.enabled) && !v)) {
            if (u && f && lt) {
              ge(o, "scrollEnd", ni);
              return;
            }
            !tt && de && de(l), Pe = l, Nt = Le(), Oe.tween && (Oe.tween.kill(), Oe.tween = 0), A && A.pause(), q && r && r.revert({
              kill: !1
            }).invalidate(), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
            for (var w = rr(), R = Ht(), be = M ? M.duration() : Bt(k, E), H = Q <= 0.01, K = 0, Me = 0, me = t.end, ae = t.endTrigger || g, Z = t.start || (t.start === 0 || !g ? 0 : u ? "0 0" : "0 100%"), ot = l.pinnedContainer = t.pinnedContainer && je(t.pinnedContainer), qe = g && Math.max(0, O.indexOf(l)) || 0, we = qe, oe, De, vr, sr, ce, ye, Ct, Pn, gi, Ir, Mt; we--; )
              ye = O[we], ye.end || ye.refresh(0, 1) || (Pe = l), Ct = ye.pin, Ct && (Ct === g || Ct === u || Ct === ot) && !ye.isReverted && (Ir || (Ir = []), Ir.unshift(ye), ye.revert(!0, !0)), ye !== O[we] && (qe--, we--);
            for (Ye(Z) && (Z = Z(l)), F = li(Z, g, w, E, V(), nt, Ne, l, R, le, Xe, be, M) || (u ? -1e-3 : 0), Ye(me) && (me = me(l)), gt(me) && !me.indexOf("+=") && (~me.indexOf(" ") ? me = (gt(Z) ? Z.split(" ")[0] : "") + me : (K = Zr(me.substr(2), w), me = gt(Z) ? Z : (M ? p.utils.mapRange(0, M.duration(), M.scrollTrigger.start, M.scrollTrigger.end, F) : F) + K, ae = g)), ve = Math.max(F, li(me || (ae ? "100% 0" : be), ae, w, E, V() + K, St, c, l, R, le, Xe, be, M)) || -1e-3, Q = ve - F || (F -= 0.01) && 1e-3, K = 0, we = qe; we--; )
              ye = O[we], Ct = ye.pin, Ct && ye.start - ye._pinPush <= F && !M && ye.end > 0 && (oe = ye.end - ye.start, (Ct === g && ye.start - ye._pinPush < F || Ct === ot) && !yr(Z) && (K += oe * (1 - ye.progress)), Ct === u && (Me += oe));
            if (F += K, ve += K, H && (ft = p.utils.clamp(0, 1, p.utils.normalize(F, ve, wt))), l._pinPush = Me, nt && K && (oe = {}, oe[E.a] = "+=" + K, ot && (oe[E.p] = "-=" + V()), p.set([nt, St], oe)), u)
              oe = _t(u), sr = E === ue, vr = V(), it = parseFloat($t(E.a)) + Me, !be && ve > 1 && (Mt = (Ce ? j.scrollingElement || ht : k).style, Mt = {
                style: Mt,
                value: Mt["overflow" + E.a.toUpperCase()]
              }, Mt.style["overflow" + E.a.toUpperCase()] = "scroll"), Mn(u, We, oe), hr = nn(u), De = Rt(u, !0), Pn = Xe && Yt(k, sr ? Ie : ue)(), _ && ($e = [_ + E.os2, Q + Me + Se], $e.t = We, we = _ === te ? wn(u, E) + Q + Me : 0, we && $e.push(E.d, we + Se), pr($e), ot && O.forEach(function(Fr) {
                Fr.pin === ot && Fr.vars.pinSpacing !== !1 && (Fr._subPinOffset = !0);
              }), Xe && V(wt)), Xe && (ce = {
                top: De.top + (sr ? vr - F : Pn) + Se,
                left: De.left + (sr ? Pn : vr - F) + Se,
                boxSizing: "border-box",
                position: "fixed"
              }, ce[Qt] = ce["max" + fr] = Math.ceil(De.width) + Se, ce[Kt] = ce["max" + mn] = Math.ceil(De.height) + Se, ce[at] = ce[at + kr] = ce[at + Tr] = ce[at + Cr] = ce[at + Sr] = "0", ce[te] = oe[te], ce[te + kr] = oe[te + kr], ce[te + Tr] = oe[te + Tr], ce[te + Cr] = oe[te + Cr], ce[te + Sr] = oe[te + Sr], Gt = Di(Wt, ce, Re), tt && V(0)), r ? (gi = r._initted, fn(1), r.render(r.duration(), !0, !0), Ge = $t(E.a) - it + Q + Me, Ar = Math.abs(Q - Ge) > 1, Xe && Ar && Gt.splice(Gt.length - 2, 2), r.render(0, !0, !0), gi || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), fn(0)) : Ge = Q, Mt && (Mt.value ? Mt.style["overflow" + E.a.toUpperCase()] = Mt.value : Mt.style.removeProperty("overflow-" + E.a));
            else if (g && V() && !M)
              for (De = g.parentNode; De && De !== J; )
                De._pinOffset && (F -= De._pinOffset, ve -= De._pinOffset), De = De.parentNode;
            Ir && Ir.forEach(function(Fr) {
              return Fr.revert(!1, !0);
            }), l.start = F, l.end = ve, rt = ut = tt ? wt : V(), !M && !tt && (rt < wt && V(wt), l.scroll.rec = 0), l.revert(!1, !0), mt && (ct = -1, l.isActive && V(F + Q * ft), mt.restart(!0)), Pe = 0, r && ke && (r._initted || or) && r.progress() !== or && r.progress(or, !0).render(r.time(), !0, !0), (H || ft !== l.progress || M) && (r && !ke && r.totalProgress(M && F < -1e-3 && !ft ? p.utils.normalize(F, ve, 0) : ft, !0), l.progress = (rt - F) / Q === ft ? 0 : ft), u && _ && (We._pinOffset = Math.round(l.progress * Ge)), A && A.invalidate(), X && !tt && X(l);
          }
        }, l.getVelocity = function() {
          return (V() - ut) / (Le() - Nr) * 1e3 || 0;
        }, l.endAnimation = function() {
          xr(l.callbackAnimation), r && (A ? A.progress(1) : r.paused() ? ke || xr(r, l.direction < 0, 1) : xr(r, r.reversed()));
        }, l.labelToScroll = function(f) {
          return r && r.labels && (F || l.refresh() || F) + r.labels[f] / r.duration() * Q || 0;
        }, l.getTrailing = function(f) {
          var v = O.indexOf(l), w = l.direction > 0 ? O.slice(0, v).reverse() : O.slice(v + 1);
          return (gt(f) ? w.filter(function(R) {
            return R.vars.preventOverlaps === f;
          }) : w).filter(function(R) {
            return l.direction > 0 ? R.end <= F : R.start >= ve;
          });
        }, l.update = function(f, v, w) {
          if (!(M && !w && !f)) {
            var R = tt === !0 ? wt : l.scroll(), be = f ? 0 : (R - F) / Q, H = be < 0 ? 0 : be > 1 ? 1 : be || 0, K = l.progress, Me, me, ae, Z, ot, qe, we, oe;
            if (v && (ut = rt, rt = M ? V() : R, I && (ir = nr, nr = r && !ke ? r.totalProgress() : H)), re && !H && u && !Pe && !$r && lt && F < R + (R - ut) / (Le() - Nr) * re && (H = 1e-4), H !== K && l.enabled) {
              if (Me = l.isActive = !!H && H < 1, me = !!K && K < 1, qe = Me !== me, ot = qe || !!H != !!K, l.direction = H > K ? 1 : -1, l.progress = H, ot && !Pe && (ae = H && !K ? 0 : H === 1 ? 1 : K === 1 ? 2 : 3, ke && (Z = !qe && $[ae + 1] !== "none" && $[ae + 1] || $[ae], oe = r && (Z === "complete" || Z === "reset" || Z in r))), vt && (qe || oe) && (oe || B || !r) && (Ye(vt) ? vt(l) : l.getTrailing(vt).forEach(function(ce) {
                return ce.endAnimation();
              })), ke || (A && !Pe && !$r ? (A._dp._time - A._start !== A._time && A.render(A._dp._time - A._start), A.resetTo ? A.resetTo("totalProgress", H, r._tTime / r._tDur) : (A.vars.totalProgress = H, A.invalidate().restart())) : r && r.totalProgress(H, !!Pe)), u) {
                if (f && _ && (We.style[_ + E.os2] = Dr), !Xe)
                  ie(wr(it + Ge * H));
                else if (ot) {
                  if (we = !f && H > K && ve + 1 > R && R + 1 >= Bt(k, E), Re)
                    if (!f && (Me || we)) {
                      var De = Rt(u, !0), vr = R - F;
                      ai(u, J, De.top + (E === ue ? vr : 0) + Se, De.left + (E === ue ? 0 : vr) + Se);
                    } else
                      ai(u, We);
                  pr(Me || we ? Gt : hr), Ar && H < 1 && Me || ie(it + (H === 1 && !we ? Ge : 0));
                }
              }
              I && !Oe.tween && !Pe && !$r && mt.restart(!0), s && (qe || ee && H && (H < 1 || !hn)) && Hr(s.targets).forEach(function(ce) {
                return ce.classList[Me || ee ? "add" : "remove"](s.className);
              }), a && !ke && !f && a(l), ot && !Pe ? (ke && (oe && (Z === "complete" ? r.pause().totalProgress(1) : Z === "reset" ? r.restart(!0).pause() : Z === "restart" ? r.restart(!0) : r[Z]()), a && a(l)), (qe || !hn) && (x && qe && _n(l, x), Be[ae] && _n(l, Be[ae]), ee && (H === 1 ? l.kill(!1, 1) : Be[ae] = 0), qe || (ae = H === 1 ? 1 : 3, Be[ae] && _n(l, Be[ae]))), Ke && !Me && Math.abs(l.getVelocity()) > (yr(Ke) ? Ke : 2500) && (xr(l.callbackAnimation), A ? A.progress(1) : xr(r, Z === "reverse" ? 1 : !H, 1))) : ke && a && !Pe && a(l);
            }
            if (qt) {
              var sr = M ? R / M.duration() * (M._caScrollDist || 0) : R;
              kt(sr + (Ne._isFlipped ? 1 : 0)), qt(sr);
            }
            _r && _r(-R / M.duration() * (M._caScrollDist || 0));
          }
        }, l.enable = function(f, v) {
          l.enabled || (l.enabled = !0, ge(k, "resize", Er), ge(Ce ? j : k, "scroll", dr), de && ge(o, "refreshInit", de), f !== !1 && (l.progress = ft = 0, rt = ut = ct = V()), v !== !1 && l.refresh());
        }, l.getTween = function(f) {
          return f && Oe ? Oe.tween : A;
        }, l.setPositions = function(f, v) {
          u && (it += f - F, Ge += v - f - Q, _ === te && l.adjustPinSpacing(v - f - Q)), l.start = F = f, l.end = ve = v, Q = v - f, l.update();
        }, l.adjustPinSpacing = function(f) {
          if ($e && f) {
            var v = $e.indexOf(E.d) + 1;
            $e[v] = parseFloat($e[v]) + f + Se, $e[1] = parseFloat($e[1]) + f + Se, pr($e);
          }
        }, l.disable = function(f, v) {
          if (l.enabled && (f !== !1 && l.revert(!0, !0), l.enabled = l.isActive = !1, v || A && A.pause(), wt = 0, He && (He.uncache = 1), de && _e(o, "refreshInit", de), mt && (mt.pause(), Oe.tween && Oe.tween.kill() && (Oe.tween = 0)), !Ce)) {
            for (var w = O.length; w--; )
              if (O[w].scroller === k && O[w] !== l)
                return;
            _e(k, "resize", Er), _e(k, "scroll", dr);
          }
        }, l.kill = function(f, v) {
          l.disable(f, v), A && !v && A.kill(), d && delete xn[d];
          var w = O.indexOf(l);
          w >= 0 && O.splice(w, 1), w === Fe && tn > 0 && Fe--, w = 0, O.forEach(function(R) {
            return R.scroller === l.scroller && (w = 1);
          }), w || tt || (l.scroll.rec = 0), r && (r.scrollTrigger = null, f && r.revert({
            kill: !1
          }), v || r.kill()), nt && [nt, St, Ne, c].forEach(function(R) {
            return R.parentNode && R.parentNode.removeChild(R);
          }), Pr === l && (Pr = 0), u && (He && (He.uncache = 1), w = 0, O.forEach(function(R) {
            return R.pin === u && w++;
          }), w || (He.spacer = 0)), t.onKill && t.onKill(l);
        }, l.enable(!1, !1), It && It(l), !r || !r.add || Q ? l.refresh() : p.delayedCall(0.01, function() {
          return F || ve || l.refresh();
        }) && (Q = 0.01) && (F = ve = 0), u && Pi();
      }, o.register = function(t) {
        return lr || (p = t || jn(), Vn() && window.document && o.enable(), lr = mr), lr;
      }, o.defaults = function(t) {
        if (t)
          for (var r in t)
            Qr[r] = t[r];
        return Qr;
      }, o.disable = function(t, r) {
        mr = 0, O.forEach(function(a) {
          return a[r ? "kill" : "disable"](t);
        }), _e(z, "wheel", dr), _e(j, "scroll", dr), clearInterval(Wr), _e(j, "touchcancel", Tt), _e(J, "touchstart", Tt), Vr(_e, j, "pointerdown,touchstart,mousedown", qn), Vr(_e, j, "pointerup,touchend,mouseup", Un), Br.kill(), qr(_e);
        for (var i = 0; i < b.length; i += 3)
          jr(_e, b[i], b[i + 1]), jr(_e, b[i], b[i + 2]);
      }, o.enable = function() {
        if (z = window, j = document, ht = j.documentElement, J = j.body, p && (Hr = p.utils.toArray, ar = p.utils.clamp, dn = p.core.context || Tt, fn = p.core.suppressOverwrites || Tt, pn = z.history.scrollRestoration || "auto", kn = z.pageYOffset, p.core.globals("ScrollTrigger", o), J)) {
          mr = 1, xi(), se.register(p), o.isTouch = se.isTouch, Xt = se.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), ge(z, "wheel", dr), Yn = [z, j, ht, J], p.matchMedia ? (o.matchMedia = function(d) {
            var x = p.matchMedia(), X;
            for (X in d)
              x.add(X, d[X]);
            return x;
          }, p.addEventListener("matchMediaInit", function() {
            return Sn();
          }), p.addEventListener("matchMediaRevert", function() {
            return ii();
          }), p.addEventListener("matchMedia", function() {
            tr(0, 1), Jt("matchMedia");
          }), p.matchMedia("(orientation: portrait)", function() {
            return Tn(), Tn;
          })) : console.warn("Requires GSAP 3.11.0 or later"), Tn(), ge(j, "scroll", dr);
          var t = J.style, r = t.borderTopStyle, i = p.core.Animation.prototype, a, s;
          for (i.revert || Object.defineProperty(i, "revert", {
            value: function() {
              return this.time(-0.01, !0);
            }
          }), t.borderTopStyle = "solid", a = Rt(J), ue.m = Math.round(a.top + ue.sc()) || 0, Ie.m = Math.round(a.left + Ie.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Wr = setInterval(ri, 250), p.delayedCall(0.5, function() {
            return $r = 0;
          }), ge(j, "touchcancel", Tt), ge(J, "touchstart", Tt), Vr(ge, j, "pointerdown,touchstart,mousedown", qn), Vr(ge, j, "pointerup,touchend,mouseup", Un), un = p.utils.checkPrefix("transform"), rn.push(un), lr = Le(), Br = p.delayedCall(0.2, tr).pause(), cr = [j, "visibilitychange", function() {
            var d = z.innerWidth, x = z.innerHeight;
            j.hidden ? (Xn = d, Bn = x) : (Xn !== d || Bn !== x) && Er();
          }, j, "DOMContentLoaded", tr, z, "load", tr, z, "resize", Er], qr(ge), O.forEach(function(d) {
            return d.enable(0, 1);
          }), s = 0; s < b.length; s += 3)
            jr(_e, b[s], b[s + 1]), jr(_e, b[s], b[s + 2]);
        }
      }, o.config = function(t) {
        "limitCallbacks" in t && (hn = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval(Wr) || (Wr = r) && setInterval(ri, r), "ignoreMobileResize" in t && (Wn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (qr(_e) || qr(ge, t.autoRefreshEvents || "none"), Nn = (t.autoRefreshEvents + "").indexOf("resize") === -1);
      }, o.scrollerProxy = function(t, r) {
        var i = je(t), a = b.indexOf(i), s = jt(i);
        ~a && b.splice(a, s ? 6 : 2), r && (s ? L.unshift(z, r, J, r, ht, r) : L.unshift(i, r));
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
      return Sn(!o, e);
    }, D.create = function(o, e) {
      return new D(o, e);
    }, D.refresh = function(o) {
      return o ? Er() : (lr || D.register()) && tr(!0);
    }, D.update = function(o) {
      return ++b.cache && Ot(o === !0 ? 2 : 0);
    }, D.clearScrollMemory = oi, D.maxScroll = function(o, e) {
      return Bt(o, e ? Ie : ue);
    }, D.getScrollFunc = function(o, e) {
      return Yt(je(o), e ? Ie : ue);
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
        var B = [], g = [], u = p.delayedCall(r, function() {
          X(B, g), B = [], g = [];
        }).pause();
        return function(_) {
          B.length || u.restart(!0), B.push(_.trigger), g.push(_), i <= B.length && u.progress(1);
        };
      }, s;
      for (s in e)
        t[s] = s.substr(0, 2) === "on" && Ye(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
      return Ye(i) && (i = i(), ge(D, "refresh", function() {
        return i = e.batchMax();
      })), Hr(o).forEach(function(d) {
        var x = {};
        for (s in t)
          x[s] = t[s];
        x.trigger = d, n.push(D.create(x));
      }), n;
    };
    var fi = function(e, n, t, r) {
      return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
    }, En = function o(e, n) {
      n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (se.isTouch ? " pinch-zoom" : "") : "none", e === ht && o(J, n);
    }, sn = {
      auto: 1,
      scroll: 1
    }, zi = function(e) {
      var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, a = i._gsap || p.core.getCache(i), s = Le(), d;
      if (!a._isScrollT || s - a._isScrollT > 2e3) {
        for (; i && i !== J && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(sn[(d = _t(i)).overflowY] || sn[d.overflowX])); )
          i = i.parentNode;
        a._isScroll = i && i !== t && !jt(i) && (sn[(d = _t(i)).overflowY] || sn[d.overflowX]), a._isScrollT = s;
      }
      (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
    }, di = function(e, n, t, r) {
      return se.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: n,
        onWheel: r = r && zi,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return t && ge(j, se.eventTypes[0], hi, !1, !0);
        },
        onDisable: function() {
          return _e(j, se.eventTypes[0], hi, !0);
        }
      });
    }, Ii = /(input|label|select|textarea)/i, pi, hi = function(e) {
      var n = Ii.test(e.target.tagName);
      (n || pi) && (e._gsapAllow = !0, pi = n);
    }, Fi = function(e) {
      Ur(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, a = n.onRelease, s, d, x = je(e.target) || ht, X = p.core.globals().ScrollSmoother, B = X && X.get(), g = Xt && (e.content && je(e.content) || B && e.content !== !1 && !B.smooth() && B.content()), u = Yt(x, ue), _ = Yt(x, Ie), q = 1, re = (se.isTouch && z.visualViewport ? z.visualViewport.scale * z.visualViewport.width : z.outerWidth) / z.innerWidth, W = 0, Qe = Ye(r) ? function() {
        return r(s);
      } : function() {
        return r || 2.8;
      }, ee, I, Re = di(x, e.type, !0, i), ne = function() {
        return I = !1;
      }, M = Tt, Ke = Tt, vt = function() {
        d = Bt(x, ue), Ke = ar(Xt ? 1 : 0, d), t && (M = ar(0, Bt(x, Ie))), ee = er;
      }, E = function() {
        g._gsap.y = wr(parseFloat(g._gsap.y) + u.offset) + "px", g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
      }, ke = function() {
        if (I) {
          requestAnimationFrame(ne);
          var fe = wr(s.deltaY / 2), le = Ke(u.v - fe);
          if (g && le !== u.v + u.offset) {
            u.offset = le - u.v;
            var l = wr((parseFloat(g && g._gsap.y) || 0) - u.offset);
            g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", g._gsap.y = l + "px", u.cacheID = b.cache, Ot();
          }
          return !0;
        }
        u.offset && E(), I = !0;
      }, k, Dt, Ce, Xe, Be = function() {
        vt(), k.isActive() && k.vars.scrollY > d && (u() > d ? k.progress(1) && u(d) : k.resetTo("scrollY", d));
      };
      return g && p.set(g, {
        y: "+=0"
      }), e.ignoreCheck = function($) {
        return Xt && $.type === "touchmove" && ke() || q > 1.05 && $.type !== "touchstart" || s.isGesturing || $.touches && $.touches.length > 1;
      }, e.onPress = function() {
        I = !1;
        var $ = q;
        q = wr((z.visualViewport && z.visualViewport.scale || 1) / re), k.pause(), $ !== q && En(x, q > 1.01 ? !0 : t ? !1 : "x"), Dt = _(), Ce = u(), vt(), ee = er;
      }, e.onRelease = e.onGestureStart = function($, fe) {
        if (u.offset && E(), !fe)
          Xe.restart(!0);
        else {
          b.cache++;
          var le = Qe(), l, de;
          t && (l = _(), de = l + le * 0.05 * -$.velocityX / 0.227, le *= fi(_, l, de, Bt(x, Ie)), k.vars.scrollX = M(de)), l = u(), de = l + le * 0.05 * -$.velocityY / 0.227, le *= fi(u, l, de, Bt(x, ue)), k.vars.scrollY = Ke(de), k.invalidate().duration(le).play(0.01), (Xt && k.vars.scrollY >= d || l >= d - 1) && p.to({}, {
            onUpdate: Be,
            duration: le
          });
        }
        a && a($);
      }, e.onWheel = function() {
        k._ts && k.pause(), Le() - W > 1e3 && (ee = 0, W = Le());
      }, e.onChange = function($, fe, le, l, de) {
        if (er !== ee && vt(), fe && t && _(M(l[2] === fe ? Dt + ($.startX - $.x) : _() + fe - l[1])), le) {
          u.offset && E();
          var rr = de[2] === le, Ht = rr ? Ce + $.startY - $.y : u() + le - de[1], ct = Ke(Ht);
          rr && Ht !== ct && (Ce += ct - Ht), u(ct);
        }
        (le || fe) && Ot();
      }, e.onEnable = function() {
        En(x, t ? !1 : "x"), D.addEventListener("refresh", Be), ge(z, "resize", Be), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = _.smooth = !1), Re.enable();
      }, e.onDisable = function() {
        En(x, !0), _e(z, "resize", Be), D.removeEventListener("refresh", Be), Re.kill();
      }, e.lockAxis = e.lockAxis !== !1, s = new se(e), s.iOS = Xt, Xt && !u() && u(1), Xt && p.ticker.add(Tt), Xe = s._dc, k = p.to(s, {
        ease: "power4",
        paused: !0,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: ci(u, u(), function() {
            return k.pause();
          })
        },
        onUpdate: Ot,
        onComplete: Xe.vars.onComplete
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
      var e = o instanceof se ? o : Fi(o);
      return Je && Je.target === e.target && Je.kill(), jt(e.target) && (Je = e), e;
    }, D.core = {
      _getVelocityProp: cn,
      _inputObserver: di,
      _scrollers: b,
      _proxies: L,
      bridge: {
        ss: function() {
          lt || Jt("scrollStart"), lt = Le();
        },
        ref: function() {
          return Pe;
        }
      }
    }, jn() && p.registerPlugin(D), S.ScrollTrigger = D, S.default = D, typeof window > "u" || window !== S ? Object.defineProperty(S, "__esModule", { value: !0 }) : delete window.default;
  });
})(zn, zn.exports);
var wi = zn.exports;
Ae.registerPlugin(wi.ScrollTrigger);
class yi extends ln {
  static create(T, S = {}, G = {}) {
    return new yi(T, S, G);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(T) {
    this.meta.speed = T;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(T) {
    this.meta.velocity = T;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(T) {
    this.meta.direction = T;
  }
  constructor(T, S = {}, G = {}) {
    super(
      (Y) => {
        var Lt, Te;
        Object.assign(Y.meta, {
          speed: S.speed ?? 1,
          velocity: S.velocity ?? 0,
          direction: S.direction || "rtl",
          onCreated: S.onCreated,
          onUpdate: S.onUpdate
        }), Y.meta.scrollTrigger = wi.ScrollTrigger.create(S.scrollTrigger ?? {});
        let y = null;
        typeof T == "string" ? y = document.querySelector(T) : T instanceof HTMLElement && (y = T);
        const pe = S.createDOMContainers != null ? S.createDOMContainers : !0, C = pe ? document.createElement("div") : y == null ? void 0 : y.querySelector(".owow-marquee-outer");
        C == null || C.classList.add("owow-marquee-outer");
        const N = pe ? document.createElement("div") : C == null ? void 0 : C.querySelector(".owow-marquee-inner");
        if (N == null || N.classList.add("owow-marquee-inner"), !y || !C || !N)
          throw console.error({
            targetContainer: y,
            outerContainer: C,
            innerContainer: N
          }), new Error("Invalid marquee DOM structure");
        Y.meta.sourceDOM = y.cloneNode(!0), Y.meta.target = y, N.append(...y.childNodes), C.append(N), y == null || y.append(C), Ae.set(N, { display: "inline-flex" });
        const he = y.getBoundingClientRect(), ze = N.getBoundingClientRect(), dt = he.width + ze.width, Ue = document.createDocumentFragment(), Ve = [];
        let Et = ze.width;
        if (!dt || !Et)
          return;
        for (; Et <= dt; ) {
          const U = N.cloneNode(!0);
          Et += ze.width, Ve.push(U);
        }
        Ue.append(...Ve), C.append(Ue);
        const Ze = Ae.context(() => {
          Ae.set(C, {
            x: 0,
            force3D: !0,
            width: Et,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), Ee = Ae.utils.pipe(
          (U) => Math.floor(U * 1e3) / 1e3,
          Ae.quickSetter(C, "x", "px")
        ), Pt = Ae.utils.wrap(0, -ze.width), Ut = Ae.utils.normalize(0, -ze.width);
        let yt, pt, b, L, xe, st, Ft;
        const xt = Ae.ticker.add(() => {
          var U, Vt;
          switch (pt = Y.meta.velocity != null ? Y.meta.scrollTrigger.getVelocity() ?? 0 : 0, b = pt * Y.meta.velocity, Y.meta.direction) {
            case "ltr":
              yt = -1, b = -Math.abs(b);
              break;
            case "rtl":
              yt = 1, b = Math.abs(b);
              break;
            case "scroll":
              yt = Y.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              yt = -(Y.meta.scrollTrigger.direction ?? 1), b = -b;
          }
          L = Ae.getProperty(C, "x"), xe = Y.meta.speed * -yt, st = (xe - b) * Ae.ticker.deltaRatio(), Ft = Pt(L + st), Ee(Ft), (Vt = (U = Y.meta).onUpdate) == null || Vt.call(U, Ut(Ft));
        });
        return (Te = (Lt = Y.meta).onCreated) == null || Te.call(Lt), () => {
          var U;
          for (Ze.kill(!0), Ae.ticker.remove(xt), y == null || y.replaceChildren(...Y.meta.sourceDOM.childNodes); Ve.length; )
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
  yi as Marquee,
  ln as Motion,
  mi as Pointer
};
