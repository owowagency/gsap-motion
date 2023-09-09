import { debounceTime, fromEvent, noop, Observable } from "rxjs";
import type { Subscriber, Subscription } from "rxjs";
import debounce from "lodash.debounce";
import gsap from "gsap";
import { getValue } from "../../utils";

type MotionParams = {
  watchMedia?: string | (() => string);
  shouldResetOnResize?: MotionWatchResizeTarget | (() => MotionWatchResizeTarget);
  enable?: boolean | (() => boolean);
};

type MotionWatchResizeAxis = "vertical" | "horizontal";
type MotionWatchResizeTargetWithAxis = [Window | HTMLElement | string, MotionWatchResizeAxis];
type MotionWatchResizeTarget = Window | HTMLElement | string | MotionWatchResizeTargetWithAxis;
type MotionCleanup = (context: gsap.Context) => void;
type MotionImplementation<T extends Record<string, unknown> = Record<string, unknown>> = (
  self: Motion<T>,
  context: gsap.Context
) => (MotionCleanup | void | undefined) | Promise<MotionCleanup | void | undefined>;

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

  private context!: gsap.Context;
  private mediaQueryList?: MediaQueryList;
  motionResizeObserver?: MotionResizeObserver;
  meta = {} as Meta & Record<string, unknown>;
  subscriptions: Subscription[] = [];

  private create?: MotionImplementation;
  private cleanup?: MotionCleanup;

  constructor(create: MotionImplementation<Meta>, params: MotionParams = {}) {
    this.observeMedia(getValue(params.watchMedia));
    this.observeResize(getValue(params.shouldResetOnResize));

    this.create = () => {
      this.context = gsap.context(noop);

      const shouldCreate = [
        getValue(params.enable) ?? true,
        this.mediaQueryList?.matches ?? true,
      ].every(Boolean);

      const cleanup = shouldCreate ? create(this, this.context) : undefined;

      return cleanup;
    };

    this.createAndSetCleanup();
  }

  private createAndSetCleanup() {
    const creationResult = this.create?.(this, this.context);

    if (creationResult instanceof Promise) {
      creationResult.then((result) => (this.cleanup = result ?? undefined));
    } else {
      this.cleanup = creationResult ?? undefined;
    }
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
      this.motionResizeObserver.observable.pipe(debounceTime(100)).subscribe(() => this.reset())
    );
  }

  /**
   * Runs the cleanup function and resets this Motion instance.
   */
  reset = debounce(
    () => {
      this.cleanup?.(this.context);
      requestAnimationFrame(() => this.createAndSetCleanup());
    },
    Motion.resetDebounceTime,
    { leading: true }
  );

  /**
   * Runs the cleanup function and makes this instance elegible for garbage collection.
   */
  destroy = () => {
    this.cleanup?.(this.context);
    this.cleanup = undefined;
    this.create = undefined;
    this.mediaQueryList = undefined;
    this.motionResizeObserver = undefined;
    for (const key of Object.keys(this.meta)) delete this.meta[key];
    while (this.subscriptions.length) this.subscriptions.pop()?.unsubscribe();
  };
}

class MotionResizeObserver {
  private axis?: MotionWatchResizeAxis;
  private target: Window | Element | null;
  private inlineSize?: number;
  private blockSize?: number;

  observable: Observable<ResizeObserverEntry[] | UIEvent>;

  constructor(target: MotionWatchResizeTarget) {
    const [element, axis] = [target].flat() as MotionWatchResizeTargetWithAxis;
    this.target = typeof element === "string" ? document.querySelector(element) : element;
    this.axis = axis;

    if (this.target === window) {
      this.observable = new Observable<UIEvent>((subscriber) => {
        const handleResize = () => this.handleWindowResize(subscriber);
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
      });
    } else {
      this.observable = new Observable<ResizeObserverEntry[]>((subscriber) => {
        const resizeObserver = new ResizeObserver((entries) =>
          this.handleElementResize(entries, subscriber)
        );
        if (this.target) resizeObserver.observe(this.target as Element);
        return () => resizeObserver.disconnect();
      });
    }
  }

  private handleWindowResize(subscriber: Subscriber<UIEvent>) {
    this.emit(subscriber, window.innerWidth, window.innerHeight);
  }

  private handleElementResize(
    entries: ResizeObserverEntry[],
    subscriber: Subscriber<ResizeObserverEntry[]>
  ) {
    const entry = entries.find((e) => e.target === this.target);
    if (!entry) return;
    const { inlineSize, blockSize } = entry.borderBoxSize[0]!;
    this.emit(subscriber, inlineSize, blockSize);
  }

  private emit<T>(subscriber: Subscriber<T>, inlineSize: number, blockSize: number) {
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
