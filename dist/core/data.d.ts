export declare function iterableToArray<T>(iterable: Iterable<T>): T[];
export declare function createMap<K, V>(iterable?: Iterable<readonly [K, V]> | null): Map<K, V>;
export declare function createCachedMap<K, V>(getIterable?: () => Iterable<readonly [K, V]> | null): () => Map<K, V>;
export declare function readFromMap<K, V>(map: Map<K, V>): (key: K) => V | undefined;
export declare function writeToMap<K, V>(map: Map<K, V>): (key: K, value: V) => Map<K, V>;
export declare const getUndefined: () => undefined;
export declare function createContainer<T>(initialValue: T): Readonly<{
    getValue: () => T;
    setValue: (newValue: T) => T;
}>;
