var M = Object.defineProperty;
var B = (e, t, i) => t in e ? M(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var r = (e, t, i) => (B(e, typeof t != "symbol" ? t + "" : t, i), i);
import { fromEvent as D, debounceTime as Q, Observable as $ } from "rxjs";
import A from "gsap";
var p = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function N(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var W = "Expected a function", I = 0 / 0, _ = "[object Symbol]", P = /^\s+|\s+$/g, G = /^[-+]0x[0-9a-f]+$/i, q = /^0b[01]+$/i, H = /^0o[0-7]+$/i, U = parseInt, X = typeof p == "object" && p && p.Object === Object && p, J = typeof self == "object" && self && self.Object === Object && self, K = X || J || Function("return this")(), V = Object.prototype, Y = V.toString, Z = Math.max, ee = Math.min, O = function() {
  return K.Date.now();
};
function te(e, t, i) {
  var c, u, a, s, o, l, d = 0, x = !1, h = !1, y = !0;
  if (typeof e != "function")
    throw new TypeError(W);
  t = L(t) || 0, S(i) && (x = !!i.leading, h = "maxWait" in i, a = h ? Z(L(i.maxWait) || 0, t) : a, y = "trailing" in i ? !!i.trailing : y);
  function g(n) {
    var f = c, b = u;
    return c = u = void 0, d = n, s = e.apply(b, f), s;
  }
  function C(n) {
    return d = n, o = setTimeout(m, t), x ? g(n) : s;
  }
  function E(n) {
    var f = n - l, b = n - d, k = t - f;
    return h ? ee(k, a - b) : k;
  }
  function j(n) {
    var f = n - l, b = n - d;
    return l === void 0 || f >= t || f < 0 || h && b >= a;
  }
  function m() {
    var n = O();
    if (j(n))
      return R(n);
    o = setTimeout(m, E(n));
  }
  function R(n) {
    return o = void 0, y && c ? g(n) : (c = u = void 0, s);
  }
  function F() {
    o !== void 0 && clearTimeout(o), d = 0, c = l = u = o = void 0;
  }
  function w() {
    return o === void 0 ? s : R(O());
  }
  function z() {
    var n = O(), f = j(n);
    if (c = arguments, u = this, l = n, f) {
      if (o === void 0)
        return C(l);
      if (h)
        return o = setTimeout(m, t), g(l);
    }
    return o === void 0 && (o = setTimeout(m, t)), s;
  }
  return z.cancel = F, z.flush = w, z;
}
function S(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function ie(e) {
  return !!e && typeof e == "object";
}
function ne(e) {
  return typeof e == "symbol" || ie(e) && Y.call(e) == _;
}
function L(e) {
  if (typeof e == "number")
    return e;
  if (ne(e))
    return I;
  if (S(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = S(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(P, "");
  var i = q.test(e);
  return i || H.test(e) ? U(e.slice(2), i ? 2 : 8) : G.test(e) ? I : +e;
}
var re = te;
const se = /* @__PURE__ */ N(re), T = class {
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
  constructor(t, i = {}) {
    r(this, "mediaQueryList");
    r(this, "motionResizeObserver");
    r(this, "meta", {});
    r(this, "subscriptions", []);
    r(this, "create");
    r(this, "cleanup");
    /**
     * Runs the cleanup function and resets this Motion instance.
     */
    r(this, "reset", se(
      () => {
        var t;
        (t = this.cleanup) == null || t.call(this), requestAnimationFrame(() => {
          var i;
          this.cleanup = ((i = this.create) == null ? void 0 : i.call(this, this)) ?? void 0;
        });
      },
      T.resetDebounceTime,
      { leading: !0 }
    ));
    /**
     * Runs the cleanup function and makes this instance elegible for garbage collection.
     */
    r(this, "destroy", () => {
      var t, i;
      for ((t = this.cleanup) == null || t.call(this), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0; this.subscriptions.length; )
        (i = this.subscriptions.pop()) == null || i.unsubscribe();
    });
    this.observeMedia(i.watchMedia), this.observeResize(i.shouldResetOnResize), this.create = () => {
      var a, s;
      return [((a = i.enable) == null ? void 0 : a.call(i)) ?? !0, ((s = this.mediaQueryList) == null ? void 0 : s.matches) ?? !0].every(
        Boolean
      ) ? t(this) : void 0;
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
   * myObject.x += Motion.applyDeltaRatio(3)
   */
  static applyDeltaRatio(t) {
    return t * A.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(t) {
    t && (this.mediaQueryList = matchMedia(t), this.subscriptions.push(D(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(t) {
    t && (this.motionResizeObserver = new oe(t), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Q(500)).subscribe(() => this.reset())
    ));
  }
};
let v = T;
r(v, "resetDebounceTime", 100), /** Target framerate */
r(v, "referenceFramerate", 60);
class oe {
  constructor(t) {
    r(this, "axis");
    r(this, "element");
    r(this, "inlineSize");
    r(this, "blockSize");
    r(this, "observable");
    const [i, c] = [t].flat();
    this.element = typeof i == "string" ? document.querySelector(i) : i, this.axis = c, this.observable = new $((u) => {
      const a = new ResizeObserver(
        (s) => this.handleResize(s, u)
      );
      return this.element && a.observe(this.element), () => a.disconnect();
    });
  }
  handleResize(t, i) {
    const c = t.find((d) => d.target === this.element);
    if (!c)
      return;
    const { inlineSize: u, blockSize: a } = c.borderBoxSize[0], s = u !== this.inlineSize, o = a !== this.blockSize, l = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = u, this.blockSize = a, !l) {
      if (this.axis === "horizontal" && s || this.axis === "vertical" && o)
        return i.next();
      !this.axis && (s || o) && i.next();
    }
  }
}
export {
  v as Motion
};
