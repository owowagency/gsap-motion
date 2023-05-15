var c = Object.defineProperty;
var w = (e, t, s) => t in e ? c(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var i = (e, t, s) => (w(e, typeof t != "symbol" ? t + "" : t, s), s);
import h from "gsap";
import { fromEvent as r } from "rxjs";
import { Motion as a } from "./motion.js";
const o = class {
  constructor() {
    i(this, "subscriptions", []);
    /** Window inner width */
    i(this, "viewWidth", window.innerWidth);
    /** Window inner height */
    i(this, "viewHeight", window.innerHeight);
    /** Pointer absolute x position */
    i(this, "clientX", this.viewWidth / 2);
    /** Pointer absolute y position */
    i(this, "clientY", this.viewHeight / 2);
    /** Pointer normalized x position (0 to 1) */
    i(this, "normalX", 0.5);
    /** Pointer normalized y position (0 to 1)*/
    i(this, "normalY", 0.5);
    i(this, "observable", r(window, "mousemove"));
    /**
     * Internal motion instance
     */
    i(this, "motion", new a(
      (t) => {
        this.subscriptions.push(
          this.observable.subscribe((s) => {
            this.clientX = s.clientX, this.clientY = s.clientY, this.normalX = h.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = h.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), this.subscriptions.push(
          r(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), t.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ));
    /**
     * Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
     * Note that referencing `Pointer.instance` will create a new instance.
     */
    i(this, "destroy", () => {
      this.subscriptions.forEach((t) => t.unsubscribe()), this.motion.destroy();
    });
  }
  /**
   * Utility for doing stuff with the mouse/pointer.
   * Get the current singleton Pointer instance, of which only one can be active at any time.
   * @example
   * // Make a custom cursor that copies the current pointer position
   * gsap.ticker.add(() => {
   *    gsap.set("#custom-cursor", {
   *      x: Pointer.instance.clientX,
   *      y: Pointer.instance.clientY
   *    })
   * })
   */
  static get instance() {
    return this._instance ?? (this._instance = new o());
  }
};
let n = o;
i(n, "_instance");
export {
  n as Pointer
};
