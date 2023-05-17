import { debounceTime, fromEvent, Observable } from "rxjs";
import type { Subscriber, Subscription } from "rxjs";
import debounce from "lodash.debounce";
import gsap from "gsap";

export type MotionParams = {
  watchMedia?: string;
  shouldResetOnResize?: MotionWatchResizeTarget;
  enable?: () => boolean;
};

export type MotionWatchResizeAxis = "vertical" | "horizontal";
export type MotionWatchResizeTargetWithAxis = [HTMLElement | string, MotionWatchResizeAxis];
export type MotionWatchResizeTarget = HTMLElement | string | MotionWatchResizeTargetWithAxis;
export type MotionCleanup = () => void;
export type MotionImplementation<T extends Record<string, unknown> = Record<string, unknown>> = (
  self: Motion<T>
) => MotionCleanup | void | undefined;

export class Motion<Meta extends Record<string, unknown> = Record<string, unknown>> {
  static readonly resetDebounceTime = 100;

  /** Target framerate */
  static readonly referenceFramerate = 60;

  /**
   * Time between frames in milliseconds based on `Motion.referenceFrameRate`.
   */
  static get referenceFrameTime() {
    return 1000 / this.referenceFramerate;
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
  static applyDeltaRatio(value: number) {
    return value * gsap.ticker.deltaRatio(this.referenceFramerate);
  }

  private mediaQueryList?: MediaQueryList;
  motionResizeObserver?: MotionResizeObserver;
  meta = {} as Meta & Record<string, unknown>;
  subscriptions: Subscription[] = [];

  private create?: MotionImplementation;
  private cleanup?: MotionCleanup;

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
  constructor(create: MotionImplementation<Meta>, params: MotionParams = {}) {
    this.observeMedia(params.watchMedia);
    this.observeResize(params.shouldResetOnResize);

    this.create = () => {
      const shouldCreate = [params.enable?.() ?? true, this.mediaQueryList?.matches ?? true].every(
        Boolean
      );
      const cleanup = shouldCreate ? create(this) : undefined;
      return cleanup;
    };

    this.cleanup = this.create(this) ?? undefined;
  }

  private observeMedia(queryString?: string) {
    if (!queryString) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.mediaQueryList = matchMedia(queryString);
    this.subscriptions.push(fromEvent(this.mediaQueryList, "change").subscribe(() => this.reset()));
  }

  private observeResize(target?: MotionWatchResizeTarget) {
    if (!target) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.motionResizeObserver = new MotionResizeObserver(target);
    this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(debounceTime(500)).subscribe(() => this.reset())
    );
  }

  /**
   * Runs the cleanup function and resets this Motion instance.
   */
  reset = debounce(
    () => {
      this.cleanup?.();
      requestAnimationFrame(() => {
        this.cleanup = this.create?.(this) ?? undefined;
      });
    },
    Motion.resetDebounceTime,
    { leading: true }
  );

  /**
   * Runs the cleanup function and makes this instance elegible for garbage collection.
   */
  destroy = () => {
    this.cleanup?.();
    this.cleanup = undefined;
    this.create = undefined;
    this.mediaQueryList = undefined;
    this.motionResizeObserver = undefined;
    while (this.subscriptions.length) this.subscriptions.pop()?.unsubscribe();
  };
}

class MotionResizeObserver {
  private axis?: MotionWatchResizeAxis;
  private element: Element | null;
  private inlineSize?: number;
  private blockSize?: number;

  observable: Observable<ResizeObserverEntry[]>;

  constructor(target: MotionWatchResizeTarget) {
    const [element, axis] = [target].flat() as MotionWatchResizeTargetWithAxis;
    this.element = typeof element === "string" ? document.querySelector(element) : element;
    this.axis = axis;

    this.observable = new Observable<ResizeObserverEntry[]>((subscriber) => {
      const resizeObserver = new ResizeObserver((entries) =>
        this.handleResize(entries, subscriber)
      );
      if (this.element) resizeObserver.observe(this.element);
      return () => resizeObserver.disconnect();
    });
  }

  private handleResize(
    entries: ResizeObserverEntry[],
    subscriber: Subscriber<ResizeObserverEntry[]>
  ) {
    const entry = entries.find((e) => e.target === this.element);
    if (!entry) return;
    const { inlineSize, blockSize } = entry.borderBoxSize[0];
    const isInlineChanged = inlineSize !== this.inlineSize;
    const isBlockChanged = blockSize !== this.blockSize;
    const shouldInitialize = this.inlineSize == null || this.blockSize == null;

    // update sizes
    this.inlineSize = inlineSize;
    this.blockSize = blockSize;

    // do not run the subscription first time
    if (shouldInitialize) return;

    // if should only emit horizontal changes and horizontal size did change
    if (this.axis === "horizontal" && isInlineChanged) {
      return subscriber.next();
    }

    // if should only emit vertical changes and vertical size did change
    if (this.axis === "vertical" && isBlockChanged) {
      return subscriber.next();
    }

    // if should emit on any change, and any axes changed
    if (!this.axis && (isInlineChanged || isBlockChanged)) {
      subscriber.next();
    }
  }
}
