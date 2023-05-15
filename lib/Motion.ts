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
export type MotionWatchResizeTargetWithAxis = [
  HTMLElement | string,
  MotionWatchResizeAxis
];
export type MotionWatchResizeTarget =
  | HTMLElement
  | string
  | MotionWatchResizeTargetWithAxis;
export type MotionCleanup = () => any;
export type MotionImplementation = (
  self: Motion
) => MotionCleanup | void | undefined;

export class Motion<Meta extends Record<string, any> = Record<string, any>> {
  static readonly resetDebounceTime = 100;
  static readonly referenceFrameRate = 60;
  static readonly referenceFrameTime = 1000 / this.referenceFrameRate;
  static normalizeToDeltaRatio(value: number) {
    return value * gsap.ticker.deltaRatio(this.referenceFrameRate);
  }

  label?: string;
  subscriptions: Subscription[] = [];
  mediaQueryList?: MediaQueryList;
  motionResizeObserver?: MotionResizeObserver;
  meta = {} as Meta;

  private create?: MotionImplementation;
  private cleanup?: MotionCleanup;

  constructor(create: MotionImplementation, params: MotionParams = {}) {
    this.observeMedia(params.watchMedia);
    this.observeResize(params.shouldResetOnResize);

    this.create = () => {
      const shouldCreate = [
        params.enable?.() ?? true,
        this.mediaQueryList?.matches ?? true,
      ].every(Boolean);
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
    this.subscriptions.push(
      fromEvent(this.mediaQueryList, "change").subscribe(() => this.reset())
    );
  }

  private observeResize(target?: MotionWatchResizeTarget) {
    if (!target) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.motionResizeObserver = new MotionResizeObserver(target);
    this.subscriptions.push(
      this.motionResizeObserver.observable
        .pipe(debounceTime(500))
        .subscribe(() => this.reset())
    );
  }

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
    this.element =
      typeof element === "string" ? document.querySelector(element) : element;
    this.axis = axis;

    this.observable = new Observable<ResizeObserverEntry[]>((subscriber) => {
      const resizeObserver = new ResizeObserver((entries) =>
        this.handleResize(entries, subscriber)
      );
      if (this.element) resizeObserver.observe(this.element!);
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
