import { B, F, G, O, flow, pipe } from "@mobily/ts-belt";

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

export function printError(message: string) {
  return () => console.error(message);
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
  return () => document.querySelector(query);
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
