import { A, B, D, F, G, O, flow, pipe } from "@mobily/ts-belt";
import {
  createMemoizedElementsResizeObservable,
  createMemoizedWindowResizeObservable,
  getElement,
  getUndefined,
  getValue,
  printError,
} from "../../utils";
import { gsap } from "gsap";
import { Observable, debounceTime } from "rxjs";

type Value<T> = T | (() => T);
export type MotionObservableElement = string | Element | null;

export type MotionParams = {
  observeElementResize?: Value<MotionObservableElement | ReadonlyArray<MotionObservableElement>>;
  observeWindowResize?: Value<boolean>;
  matchMedia?: Value<string>;
  enable?: Value<boolean>;
  revertOnDestroy?: Value<boolean>;
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
  (context: gsap.Context): Optional<MotionCleanup> | void;
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
export function createMotion(effect: MotionEffect, params: Value<MotionParams> = {}): () => void {
  let isDestroyed = false;
  let effectCleanupFn: Optional<MotionCleanup>;

  const config = pipe(params, getValue, D.map(flow(O.fromNullable, getValue))) as MotionConfig;
  const getMatchMedia = F.once(() => gsap.matchMedia());
  const getElementResizeObservable = createMemoizedElementsResizeObservable();

  const subscribeWithEffect = <T>(observable: Observable<T>) => {
    return observable.pipe(debounceTime(100)).subscribe(runEffect);
  };

  const runEffectCleanup = () => effectCleanupFn?.(false);

  const runEffect = F.debounce(
    flow(
      runEffectCleanup,
      getMatchMedia,
      createGsapContext(config.matchMedia ?? "all", (context) => {
        const cleanup = effect(context);
        updateEffectCleanupFn(cleanup ?? F.ignore);
        return () => void cleanup?.(isDestroyed);
      }),
      F.ignore
    ),
    0
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
    getElementResizeObservable,
    subscribeWithEffect
  );

  const windowResizeSubscription = pipe(
    O.fromNullable(B.ifElse(!!config.observeWindowResize, getWindowResizeObservable, getUndefined)),
    O.map(subscribeWithEffect),
    O.toUndefined
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
      })
    );
  }

  function destroy() {
    internalCleanup?.(true);
    elementResizeSubscription?.unsubscribe();
    windowResizeSubscription?.unsubscribe();
  }

  function init() {
    F.ifElse(resizeElements, A.isEmpty, runEffect, F.ignore);
  }

  return destroy;
}

function createGsapContext(query: string, fn: gsap.ContextFunc) {
  return F.once((matchMedia: gsap.MatchMedia) => matchMedia.add(query, fn));
}

function observeBodyResizeWarning(message: string) {
  return (element: Element) =>
    B.ifElse(element.tagName === "BODY", printError(`Warning: ${message}`), F.ignore);
}

export { Motion } from "./motion.legacy";
