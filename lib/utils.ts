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
