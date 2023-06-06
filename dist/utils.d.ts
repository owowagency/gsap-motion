export declare function getValue<T>(of: T, ...args: any[]): T extends (...args: any[]) => infer R ? R : T;
