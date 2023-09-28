import { A, F, G } from '@mobily/ts-belt';

/**
 * This utility function is used to get the value of a given input.
 * If the input is a function, it calls the function with provided arguments and returns the result.
 * If the input is not a function, it simply returns the input itself.
 *
 * @param {T} of - The input to get the value from.
 * @param {...any[]} args - The arguments to pass to the function, if the input is a function.
 * @returns {T extends (...args: any[]) => infer R ? R : T} - The value of the input or the result of the function call.
 */
export function getValue<T>(
    of: T,
    ...args: unknown[]
): T extends (...args: unknown[]) => infer R ? R : T {
    const isGsapPlugin = A.some(
        ['SplitText', 'InertiaPlugin'],
        (pluginName) => G.isFunction(of) && of.name === pluginName,
    );

    return !isGsapPlugin && G.isFunction(of) ? of.call(null, args) : of;
}

export function coerceFn<T>(value: unknown) {
    return () => F.coerce<T>(value);
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
