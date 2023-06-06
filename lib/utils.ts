export function getValue<T>(of: T, ...args: any[]): T extends (...args: any[]) => infer R ? R : T {
  return of instanceof Function ? of.call(null, args) : of;
}
