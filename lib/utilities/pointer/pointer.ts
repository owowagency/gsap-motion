/* eslint-disable @typescript-eslint/no-empty-function */
import gsap from "gsap";
import { Observable, fromEvent } from "rxjs";
import { Motion } from "../motion/motion";

export class Pointer extends Motion<{ observable?: Observable<MouseEvent> }> {
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
    super(
      (motion) => {
        motion.meta.observable = fromEvent<MouseEvent>(window, "mousemove");

        motion.subscriptions.push(
          motion.meta.observable.subscribe((event) => {
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.normalX = gsap.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX);
            this.normalY = gsap.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        );

        motion.subscriptions.push(
          fromEvent(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth;
            this.viewHeight = window.innerHeight;
          })
        );

        motion.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    );
  }

  /**
   * Get the current singleton Pointer instance.
   */
  static get instance() {
    return (this._instance ??= new Pointer());
  }

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

  get observable() {
    return this.meta.observable;
  }
}
