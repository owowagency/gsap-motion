import { Observable } from 'rxjs';
import type { Subscription } from 'rxjs';
type MotionParams = {
    watchMedia?: string | (() => string);
    shouldResetOnResize?: MotionWatchResizeTarget | (() => MotionWatchResizeTarget);
    enable?: boolean | (() => boolean);
};
type MotionWatchResizeAxis = 'vertical' | 'horizontal';
type MotionWatchResizeTargetWithAxis = [Window | HTMLElement | string, MotionWatchResizeAxis];
type MotionWatchResizeTarget = Window | HTMLElement | string | MotionWatchResizeTargetWithAxis;
type MotionCleanup = (context: gsap.Context) => void;
type MotionImplementation<T extends Record<string, unknown> = Record<string, unknown>> = (self: Motion<T>, context: gsap.Context) => (MotionCleanup | void | undefined) | Promise<MotionCleanup | void | undefined>;
/**
 * @deprecated This class is deprecated in favour of `createMotion`.
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
export declare class Motion<Meta extends Record<string, unknown> = Record<string, unknown>> {
    static readonly resetDebounceTime = 100;
    /** Target framerate */
    static readonly referenceFramerate = 60;
    /**
     * Time between frames in milliseconds based on `Motion.referenceFrameRate`.
     */
    static get referenceFrameTime(): number;
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
    static applyDeltaRatio(value: number): number;
    private context;
    private mediaQueryList?;
    motionResizeObserver?: MotionResizeObserver;
    meta: Meta & Record<string, unknown>;
    subscriptions: Subscription[];
    private create?;
    private cleanup?;
    constructor(create: MotionImplementation<Meta>, params?: MotionParams);
    private createAndSetCleanup;
    private observeMedia;
    private observeResize;
    /**
     * Runs the cleanup function and resets this Motion instance.
     */
    reset: import("lodash").DebouncedFuncLeading<() => void>;
    /**
     * Runs the cleanup function and makes this instance elegible for garbage collection.
     */
    destroy: () => void;
}
declare class MotionResizeObserver {
    private axis?;
    private target;
    private inlineSize?;
    private blockSize?;
    observable: Observable<ResizeObserverEntry[] | UIEvent>;
    constructor(target: MotionWatchResizeTarget);
    private handleWindowResize;
    private handleElementResize;
    private emit;
}
export {};
