import { A, B, F, G, O, flow, pipe } from "@mobily/ts-belt";
import { fromEvent, fromEventPattern } from "rxjs";

/**
 * This utility function is used to get the value of a given input.
 * If the input is a function, it calls the function with provided arguments and returns the result.
 * If the input is not a function, it simply returns the input itself.
 *
 * @param {T} of - The input to get the value from.
 * @param {...any[]} args - The arguments to pass to the function, if the input is a function.
 * @returns {T extends (...args: any[]) => infer R ? R : T} - The value of the input or the result of the function call.
 */
export function getValue<T>(of: T, ...args: any[]): T extends (...args: any[]) => infer R ? R : T {
  return of instanceof Function ? of.call(null, args) : of;
}

export function printError<T>() {
  return (message: T) => console.error(String(message));
}

export function iterableToArray<T>(iterable: Iterable<T>) {
  return [...iterable];
}

export function coerceFn<T>(value: unknown) {
  return () => F.coerce<T>(value);
}

export function getElement(queryOrElement?: string | Element | null): Element | undefined {
  return pipe(
    O.fromNullable(queryOrElement),
    O.mapNullable(
      flow(
        G.isString,
        B.ifElse(queryElement(F.coerce<string>(queryOrElement)), coerceFn<Element>(queryOrElement))
      )
    ),
    O.toUndefined
  );
}

export function queryElement(query: string) {
  return (root: Maybe<Element | Document> = document) => root?.querySelector(query);
}

export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  options?: ElementCreationOptions
) {
  return () => document.createElement(tagName, options);
}

export function appendToElement(element: Element) {
  return (...nodes: (string | Node)[]) => {
    element.append(...nodes);
    return element;
  };
}

export function createDocumentFragment() {
  return () => document.createDocumentFragment();
}

export function getGlobalContext() {
  return F.once(() => globalThis);
}

export function getDocumentElement() {
  const globalContext = getGlobalContext();
  return F.once(() => globalContext().document.documentElement);
}

export function getScreen() {
  const globalContext = getGlobalContext();
  return F.once(() => globalContext().screen);
}

export function createMap<K, V>(iterable?: Iterable<readonly [K, V]> | null) {
  return new Map(iterable);
}

export function createCachedMap<K, V>(getIterable?: () => Iterable<readonly [K, V]> | null) {
  return F.once(() => createMap<K, V>(getIterable?.()));
}

export function readFromMap<K, V>(map: Map<K, V>) {
  return (key: K) => map.get(key);
}

export function writeToMap<K, V>(map: Map<K, V>) {
  return (key: K, value: V) => map.set(key, value);
}

export function createVec2(x: number, y: number): Vec2 {
  return { x, y };
}

export function createNormalizedVec2(vec2: Vec2, bbox: Vec2): NormalizedVec2 {
  return {
    ...vec2,
    nx: vec2.x / bbox.x,
    ny: vec2.y / bbox.y,
  };
}

export function createMemoizedWindowResizeObservable() {
  return F.once(() => fromEvent<UIEvent>(globalThis, "resize", { passive: true }));
}

export function createMemoizedMousemoveObservable() {
  return F.once(() => fromEvent<MouseEvent>(globalThis, "mousemove", { passive: true }));
}

export function createMemoizedElementsResizeObservable() {
  return F.once((targets: readonly Element[]) => {
    const handlers = new Set<() => unknown>();
    const observer = new ResizeObserver(() => handlers.forEach((handler) => handler()));

    const observable$ = fromEventPattern(
      (handler) => {
        A.forEach(targets, observer.observe.bind(observer));
        handlers.add(handler);
        return observer;
      },
      (handler) => {
        A.forEach(targets, observer.unobserve.bind(observer));
        handlers.delete(handler);
      }
    );

    return observable$;
  });
}

export const getUndefined = () => undefined;

export function createContainer<T>(initialValue: T) {
  let value = initialValue;

  return Object.freeze({
    getValue: () => value,
    setValue: (newValue: T) => (value = newValue),
  });
}

export function roundToDecimalPlaces(decimalPlaceFactor: number = 100) {
  return (n: number) => Math.floor(n * decimalPlaceFactor) / decimalPlaceFactor;
}

export function tapDebugLog<T, M>(message: M, ...optionalParams: any[]) {
  return F.tap<T>(import.meta.env.DEV ? () => console.log(message, ...optionalParams) : F.ignore);
}

export function debugLog<T>(message: T, ...optionalParams: unknown[]) {
  import.meta.env.DEV && console.log(message, ...optionalParams);
}
