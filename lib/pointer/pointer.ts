import gsap from "gsap";
import { fromEvent, Subscription } from "rxjs";
import { Motion } from "../motion/motion";

export class Pointer {
  private static _instance: Pointer;

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
  private constructor() {
    return Pointer.instance;
  }

  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return (this._instance ??= new Pointer());
  }

  private subscriptions: Subscription[] = [];

  /** Window inner width */
  viewWidth = window.innerWidth;
  /** Window inner height */
  viewHeight = window.innerHeight;

  /** Pointer absolute x position */
  clientX = this.viewWidth / 2;
  /** Pointer absolute y position */
  clientY = this.viewHeight / 2;

  /** Pointer normalized x position (0 to 1) */
  normalX = 0.5;
  /** Pointer normalized y position (0 to 1)*/
  normalY = 0.5;

  readonly observable = fromEvent<MouseEvent>(window, "mousemove");

  /**
   * Internal motion instance
   */
  readonly motion = new Motion<{ label: string }>(
    (self) => {
      this.subscriptions.push(
        this.observable.subscribe((event) => {
          this.clientX = event.clientX;
          this.clientY = event.clientY;
          this.normalX = gsap.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX);
          this.normalY = gsap.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
        })
      );

      this.subscriptions.push(
        fromEvent(window, "resize").subscribe(() => {
          this.viewWidth = window.innerWidth;
          this.viewHeight = window.innerHeight;
        })
      );

      self.meta.label = "Pointer";
    },
    { watchMedia: "(pointer: fine)" }
  );

  /**
   * Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
   * Note that referencing `Pointer.instance` will create a new instance.
   */
  destroy = () => {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.motion.destroy();
  };
}
