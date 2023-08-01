/* eslint-disable @typescript-eslint/no-empty-function */
import gsap from "gsap";
import { Observable, fromEvent } from "rxjs";
import { Motion } from "../motion/motion";

export class Pointer extends Motion<{ observable?: Observable<MouseEvent> }> {
  private static _instance: Pointer;

  /**
   * The Pointer class is a utility for interacting with the mouse/pointer.
   * It extends the Motion class and provides an observable for mouse events.
   *
   * This class is implemented as a singleton, meaning only one instance of it exists.
   * Therefore, it does not need to be instantiated using `new Pointer();`. Instead, use `Pointer.instance`.
   *
   * @example
   * // Create a custom cursor that mirrors the current pointer position.
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
        // Create an observable for mousemove events
        motion.meta.observable = fromEvent<MouseEvent>(window, "mousemove");

        // Subscribe to the observable and update the pointer's position and normalized position on each event
        motion.subscriptions.push(
          motion.meta.observable.subscribe((event) => {
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.normalX = gsap.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX);
            this.normalY = gsap.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        );

        // Subscribe to window resize events and update the view dimensions
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
   * Returns the singleton instance of the Pointer class.
   * If the instance does not exist, it is created.
   */
  static get instance() {
    return (this._instance ??= new Pointer());
  }

  /** The width of the window's inner viewport */
  viewWidth = window.innerWidth;
  /** The height of the window's inner viewport */
  viewHeight = window.innerHeight;

  /** The pointer's absolute x-coordinate within the viewport */
  clientX = this.viewWidth / 2;
  /** The pointer's absolute y-coordinate within the viewport */
  clientY = this.viewHeight / 2;

  /** The pointer's x-coordinate normalized to a range of 0 to 1 */
  normalX = 0.5;
  /** The pointer's y-coordinate normalized to a range of 0 to 1 */
  normalY = 0.5;

  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
