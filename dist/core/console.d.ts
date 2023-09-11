export declare function printError<T>(): (message: T) => void;
export declare function tapDebugLog<T, M>(message: M, ...optionalParams: unknown[]): (value: T) => T;
export declare function debugLog<T>(message: T, ...optionalParams: unknown[]): void;
