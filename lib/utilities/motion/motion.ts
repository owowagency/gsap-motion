import { A, B, D, F, G, O, flow, pipe } from "@mobily/ts-belt";
import { getElement, getValue, printError } from "../../utils";
import { gsap } from "gsap";

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
  (): Optional<MotionCleanup> | void;
}

const DEBOUNCE_MS = 100;

export function createMotion(effect: MotionEffect, params: Value<MotionParams> = {}) {
  let isDestroyed = false;
  let effectCleanup: Optional<MotionCleanup>;
  const runEffectCleanup = () => effectCleanup?.(false);
  const config = pipe(params, getValue, D.map(flow(O.fromNullable, getValue))) as MotionConfig;
  const getMatchMedia = F.once(() => gsap.matchMedia());
  const resizeObserver = getResizeObserver();
  const resizeObserverCache = getElementResizeCallbackCache();

  const windowResizeHandler = pipe(
    O.fromNullable(config.observeWindowResize),
    O.map(
      flow(
        B.ifElse(
          () => () => runEffect(),
          () => F.ignore
        )
      )
    ),
    O.map(addWindowResizeHandler(getWindowResizeCallbackCache())),
    O.toUndefined
  );

  const resizeElements = pipe(
    A.make(1, config.observeElementResize),
    A.flat,
    A.filter(G.isNotNullable),
    A.map(getElement),
    A.filter(G.isNotNullable),
    A.tap(observeBodyResizeWarning("Observing the <body> for resizes may cause chain reactions."))
  );

  const runEffect = flow(
    runEffectCleanup,
    getMatchMedia,
    createGsapContext(
      config.matchMedia ?? "all",
      createLifecycle(effect, setEffectCleanup, internalCleanup)
    ),
    F.ignore
  );

  const init = flow(
    () => observeResizeElements(resizeObserver, resizeObserverCache, resizeElements, runEffect),
    F.ifElse(A.isEmpty, runEffect, F.ignore),
    observeWindowResize
  );

  init();

  function setEffectCleanup(fn?: typeof effectCleanup) {
    return (effectCleanup = fn);
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
    unobserveResizeElements(resizeObserver, resizeObserverCache, resizeElements);
    removeWindowResizeHandler(getWindowResizeCallbackCache())(windowResizeHandler);
  }

  return Object.freeze({ destroy });
}

function createLifecycle(
  effect: MotionEffect,
  syncEffectCleanup: (fn?: Optional<MotionCleanup> | void) => Optional<MotionCleanup>,
  cleanup: (destroyed?: boolean) => void
) {
  return () => {
    syncEffectCleanup(effect());
    return () => cleanup();
  };
}

function createGsapContext(query: string, fn: gsap.ContextFunc) {
  return (matchMedia: gsap.MatchMedia) => matchMedia.add(query, fn);
}

function unobserveResizeElements(
  observer: ResizeObserver,
  cache: Map<readonly Element[], () => unknown>,
  elements: readonly Element[]
) {
  cache.delete(elements);
  A.forEach(elements, observer.unobserve.bind(observer));
  return elements;
}

function observeResizeElements(
  observer: ResizeObserver,
  cache: Map<readonly Element[], () => unknown>,
  elements: readonly Element[],
  callback: () => void
) {
  cache.set(elements, callback);
  A.forEach(elements, observer.observe.bind(observer));
  return elements;
}

const getElementResizeCallbackCache = F.once(() => new Map<readonly Element[], () => unknown>());

const getResizeObserver = F.once(() => {
  return new ResizeObserver(
    F.debounce(
      flow(
        getElementResizeCallbackCache,
        (value) => F.coerce<ReadonlyArray<() => void>>([...value.values()]),
        A.tap((value) => value())
      ),
      DEBOUNCE_MS
    )
  );
});

function observeBodyResizeWarning(message: string) {
  return (element: Element) =>
    B.ifElse(element.tagName === "BODY", printError(`Warning: ${message}`), F.ignore);
}

function addWindowResizeHandler(cache: Set<(event: UIEvent) => unknown>) {
  return (callback: (event: UIEvent) => unknown) =>
    pipe(callback, F.debounce(DEBOUNCE_MS), F.tap(cache.add.bind(cache)));
}

function removeWindowResizeHandler(cache: Set<(event: UIEvent) => unknown>) {
  return (callback?: (event: UIEvent) => unknown) =>
    pipe(O.fromNullable(callback), O.tap(cache.delete.bind(cache)));
}

const getWindowResizeCallbackCache = F.once(() => new Set<(event: UIEvent) => unknown>());

const observeWindowResize = F.once(() => {
  globalThis.addEventListener(
    "resize",
    (event: UIEvent) => getWindowResizeCallbackCache().forEach((callback) => callback(event)),
    { passive: true }
  );
});

export { Motion } from "./motion.legacy";
