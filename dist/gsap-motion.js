var B = Object.defineProperty;
var Y = (i, e, t) => e in i ? B(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var n = (i, e, t) => (Y(i, typeof e != "symbol" ? e + "" : e, t), t);
import { fromEvent as T, debounceTime as D, Observable as Q } from "rxjs";
import R from "gsap";
var v = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var A = "Expected a function", W = 0 / 0, N = "[object Symbol]", _ = /^\s+|\s+$/g, G = /^[-+]0x[0-9a-f]+$/i, P = /^0b[01]+$/i, q = /^0o[0-7]+$/i, U = parseInt, J = typeof v == "object" && v && v.Object === Object && v, K = typeof self == "object" && self && self.Object === Object && self, V = J || K || Function("return this")(), Z = Object.prototype, ee = Z.toString, ie = Math.max, te = Math.min, O = function() {
  return V.Date.now();
};
function ne(i, e, t) {
  var c, u, a, r, o, l, f = 0, k = !1, d = !1, y = !0;
  if (typeof i != "function")
    throw new TypeError(A);
  e = C(e) || 0, x(t) && (k = !!t.leading, d = "maxWait" in t, a = d ? ie(C(t.maxWait) || 0, e) : a, y = "trailing" in t ? !!t.trailing : y);
  function w(s) {
    var h = c, b = u;
    return c = u = void 0, f = s, r = i.apply(b, h), r;
  }
  function F(s) {
    return f = s, o = setTimeout(p, e), k ? w(s) : r;
  }
  function M(s) {
    var h = s - l, b = s - f, L = e - h;
    return d ? te(L, a - b) : L;
  }
  function I(s) {
    var h = s - l, b = s - f;
    return l === void 0 || h >= e || h < 0 || d && b >= a;
  }
  function p() {
    var s = O();
    if (I(s))
      return E(s);
    o = setTimeout(p, M(s));
  }
  function E(s) {
    return o = void 0, y && c ? w(s) : (c = u = void 0, r);
  }
  function H() {
    o !== void 0 && clearTimeout(o), f = 0, c = l = u = o = void 0;
  }
  function X() {
    return o === void 0 ? r : E(O());
  }
  function z() {
    var s = O(), h = I(s);
    if (c = arguments, u = this, l = s, h) {
      if (o === void 0)
        return F(l);
      if (d)
        return o = setTimeout(p, e), w(l);
    }
    return o === void 0 && (o = setTimeout(p, e)), r;
  }
  return z.cancel = H, z.flush = X, z;
}
function x(i) {
  var e = typeof i;
  return !!i && (e == "object" || e == "function");
}
function se(i) {
  return !!i && typeof i == "object";
}
function re(i) {
  return typeof i == "symbol" || se(i) && ee.call(i) == N;
}
function C(i) {
  if (typeof i == "number")
    return i;
  if (re(i))
    return W;
  if (x(i)) {
    var e = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = x(e) ? e + "" : e;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace(_, "");
  var t = P.test(i);
  return t || q.test(i) ? U(i.slice(2), t ? 2 : 8) : G.test(i) ? W : +i;
}
var oe = ne;
const ae = /* @__PURE__ */ $(oe), j = class {
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
  constructor(e, t = {}) {
    n(this, "mediaQueryList");
    n(this, "motionResizeObserver");
    n(this, "meta", {});
    n(this, "subscriptions", []);
    n(this, "create");
    n(this, "cleanup");
    /**
     * Runs the cleanup function and resets this Motion instance.
     */
    n(this, "reset", ae(
      () => {
        var e;
        (e = this.cleanup) == null || e.call(this), requestAnimationFrame(() => {
          var t;
          this.cleanup = ((t = this.create) == null ? void 0 : t.call(this, this)) ?? void 0;
        });
      },
      j.resetDebounceTime,
      { leading: !0 }
    ));
    /**
     * Runs the cleanup function and makes this instance elegible for garbage collection.
     */
    n(this, "destroy", () => {
      var e, t;
      for ((e = this.cleanup) == null || e.call(this), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0; this.subscriptions.length; )
        (t = this.subscriptions.pop()) == null || t.unsubscribe();
    });
    this.observeMedia(t.watchMedia), this.observeResize(t.shouldResetOnResize), this.create = () => {
      var a, r;
      return [((a = t.enable) == null ? void 0 : a.call(t)) ?? !0, ((r = this.mediaQueryList) == null ? void 0 : r.matches) ?? !0].every(
        Boolean
      ) ? e(this) : void 0;
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
  static applyDeltaRatio(e) {
    return e * R.ticker.deltaRatio(this.referenceFramerate);
  }
  observeMedia(e) {
    e && (this.mediaQueryList = matchMedia(e), this.subscriptions.push(T(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(e) {
    e && (this.motionResizeObserver = new ce(e), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(D(500)).subscribe(() => this.reset())
    ));
  }
};
let m = j;
n(m, "resetDebounceTime", 100), /** Target framerate */
n(m, "referenceFramerate", 60);
class ce {
  constructor(e) {
    n(this, "axis");
    n(this, "element");
    n(this, "inlineSize");
    n(this, "blockSize");
    n(this, "observable");
    const [t, c] = [e].flat();
    this.element = typeof t == "string" ? document.querySelector(t) : t, this.axis = c, this.observable = new Q((u) => {
      const a = new ResizeObserver(
        (r) => this.handleResize(r, u)
      );
      return this.element && a.observe(this.element), () => a.disconnect();
    });
  }
  handleResize(e, t) {
    const c = e.find((f) => f.target === this.element);
    if (!c)
      return;
    const { inlineSize: u, blockSize: a } = c.borderBoxSize[0], r = u !== this.inlineSize, o = a !== this.blockSize, l = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = u, this.blockSize = a, !l) {
      if (this.axis === "horizontal" && r || this.axis === "vertical" && o)
        return t.next();
      !this.axis && (r || o) && t.next();
    }
  }
}
const g = class {
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
    n(this, "subscriptions", []);
    /** Window inner width */
    n(this, "viewWidth", window.innerWidth);
    /** Window inner height */
    n(this, "viewHeight", window.innerHeight);
    /** Pointer absolute x position */
    n(this, "clientX", this.viewWidth / 2);
    /** Pointer absolute y position */
    n(this, "clientY", this.viewHeight / 2);
    /** Pointer normalized x position (0 to 1) */
    n(this, "normalX", 0.5);
    /** Pointer normalized y position (0 to 1)*/
    n(this, "normalY", 0.5);
    n(this, "observable", T(window, "mousemove"));
    /**
     * Internal motion instance
     */
    n(this, "motion", new m(
      (e) => {
        this.subscriptions.push(
          this.observable.subscribe((t) => {
            this.clientX = t.clientX, this.clientY = t.clientY, this.normalX = R.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = R.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), this.subscriptions.push(
          T(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), e.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ));
    /**
     * Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
     * Note that referencing `Pointer.instance` will create a new instance.
     */
    n(this, "destroy", () => {
      this.subscriptions.forEach((e) => e.unsubscribe()), this.motion.destroy();
    });
    return g.instance;
  }
  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return this._instance ?? (this._instance = new g());
  }
};
let S = g;
n(S, "_instance");
export {
  m as Motion,
  S as Pointer
};
