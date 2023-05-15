import { Observable } from "rxjs";
export type MotionParams = {
    watchMedia?: string;
    shouldResetOnResize?: MotionWatchResizeTarget;
    enable?: () => boolean;
};
export type MotionWatchResizeAxis = "vertical" | "horizontal";
export type MotionWatchResizeTargetWithAxis = [HTMLElement | string, MotionWatchResizeAxis];
export type MotionWatchResizeTarget = HTMLElement | string | MotionWatchResizeTargetWithAxis;
export type MotionCleanup = () => void;
export type MotionImplementation<T extends Record<string, unknown> = Record<string, unknown>> = (self: Motion<T>) => MotionCleanup | void | undefined;
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
    private mediaQueryList?;
    motionResizeObserver?: MotionResizeObserver;
    meta: Meta & Record<string, unknown>;
    private subscriptions;
    private create?;
    private cleanup?;
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
    constructor(create: MotionImplementation<Meta>, params?: MotionParams);
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
    private element;
    private inlineSize?;
    private blockSize?;
    observable: Observable<ResizeObserverEntry[]>;
    constructor(target: MotionWatchResizeTarget);
    private handleResize;
}
export {};
