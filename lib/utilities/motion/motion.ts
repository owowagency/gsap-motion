import { A, B, D, F, G, O, R, flow, pipe } from "@mobily/ts-belt";
import {
  createMemoizedElementsResizeObservable,
  createMemoizedWindowResizeObservable,
  debugLog,
  getElement,
  getUndefined,
  getValue,
  printError,
  tapDebugLog,
} from "../../utils";
import { gsap } from "gsap";
import { Observable, debounceTime, skip } from "rxjs";

export type MotionObservableElement = string | Element | null;

export type MotionParams = {
  observeElementResize?: ValueOrGetter<
    MotionObservableElement | ReadonlyArray<MotionObservableElement>
  >;
  observeWindowResize?: ValueOrGetter<boolean>;
  matchMedia?: ValueOrGetter<string>;
  enable?: ValueOrGetter<boolean>;
  revertOnDestroy?: ValueOrGetter<boolean>;
};

export type MotionConfig = {
  observeElementResize?: MotionObservableElement | ReadonlyArray<MotionObservableElement>;
  observeWindowResize?: boolean;
  matchMedia?: string;
  enable?: boolean;
  revertOnDestroy?: boolean;
};

export interface MotionCleanup {
  (destroyed: boolean): void;
}

export interface MotionEffect {
  (context: gsap.Context): Maybe<MotionCleanup> | void;
}

export interface MotionDestroy {
  (): void;
}

const getWindowResizeObservable = createMemoizedWindowResizeObservable();

/**
 * Creates a motion effect with a managed lifecycle. This function initializes, runs, and cleans up the motion effect based on the provided parameters.
 * It can respond to various triggers such as window resize, element resize, and media query changes.
 *
 * The motion effect can be enabled or disabled, and can be set to revert to its initial state upon destruction.
 *
 * @param effect - The motion effect to be created and managed.
 * @param params - The parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the motion effect.
 */
export function createMotion(
  effect: MotionEffect,
  params: ValueOrGetter<MotionParams> = {}
): MotionDestroy {
  let isDestroyed = false;
  let effectCleanupFn: Maybe<MotionCleanup>;

  const config = pipe(params, getValue, D.map(flow(O.fromNullable, getValue))) as MotionConfig;
  const getMatchMedia = F.once(() => gsap.matchMedia());
  const getElementResizeObservable = createMemoizedElementsResizeObservable();

  const subscribeWithEffect =
    (options?: { skip?: number; debounce?: number }) =>
    <T>(observable: Observable<T>) => {
      return pipe(
        observable
          .pipe(skip(options?.skip ?? 0), debounceTime(options?.debounce ?? 300))
          .subscribe(flow(runEffect, tapDebugLog("run effect from subscription"))),
        tapDebugLog("subscribe with effect")
      );
    };

  const runEffectCleanup = () => effectCleanupFn?.(false);

  const runEffect = pipe(
    flow(
      tapDebugLog("run effect"),
      runEffectCleanup,
      getMatchMedia,
      createGsapContext(config.matchMedia ?? "all", (context) => {
        const cleanup = effect(context);
        updateEffectCleanupFn(cleanup ?? F.ignore);
        return () => void cleanup?.(isDestroyed);
      }),
      F.ignore
    ),
    tapDebugLog("create effect runner"),
    R.fromPredicate(() => config.enable ?? true, "Motion disabled"),
    R.match(F.identity, () => F.ignore),
    F.coerce<() => void>
  );

  const resizeElements = pipe(
    A.make(1, config.observeElementResize),
    A.flat,
    A.map(getElement),
    A.filter(G.isNotNullable),
    A.tap(observeBodyResizeWarning("Observing the <body> for resizes may cause chain reactions."))
  );

  const elementResizeSubscription = pipe(
    resizeElements,
    R.fromPredicate(A.isNotEmpty, "No elements to observe."),
    R.map(getElementResizeObservable),
    R.map(flow(subscribeWithEffect({ skip: 1 }), tapDebugLog("subscribe to element resizes"))),
    R.tapError(debugLog)
  );

  const windowResizeSubscription = pipe(
    config.observeWindowResize,
    R.fromPredicate(Boolean, "Window resize observing disabled."),
    R.map(getWindowResizeObservable),
    R.map(flow(subscribeWithEffect(), tapDebugLog("subscribe to window resize events"))),
    R.tapError(debugLog)
  );

  init();

  function updateEffectCleanupFn(fn?: typeof effectCleanupFn) {
    return (effectCleanupFn = fn);
  }

  function internalCleanup(destroy = false) {
    pipe(
      B.and(destroy, !isDestroyed),
      F.when(F.identity, () => {
        isDestroyed = true;
        getMatchMedia().kill(config.revertOnDestroy);
      }),
      tapDebugLog("internal cleanup")
    );
  }

  function destroy() {
    internalCleanup?.(true);
    R.tap(elementResizeSubscription, (sub) => sub.unsubscribe());
    R.tap(windowResizeSubscription, (sub) => sub.unsubscribe());
  }

  function init() {
    runEffect();
  }

  return destroy;
}

function createGsapContext(query: string, fn: gsap.ContextFunc) {
  return F.once((matchMedia: gsap.MatchMedia) => matchMedia.add(query, fn));
}

function observeBodyResizeWarning(message: string) {
  return (element: Element) =>
    pipe(
      B.ifElse(element.tagName === "BODY", () => `Warning: ${message}`, getUndefined),
      O.fromNullable,
      O.tap(printError())
    );
}

export { Motion } from "./motion.legacy";
