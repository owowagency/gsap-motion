/**
 * This utility function is used to get the value of a given input.
 * If the input is a function, it calls the function with provided arguments and returns the result.
 * If the input is not a function, it simply returns the input itself.
 *
 * @param {T} of - The input to get the value from.
 * @param {...any[]} args - The arguments to pass to the function, if the input is a function.
 * @returns {T extends (...args: any[]) => infer R ? R : T} - The value of the input or the result of the function call.
 */
export declare function getValue<T>(of: T, ...args: any[]): T extends (...args: any[]) => infer R ? R : T;
