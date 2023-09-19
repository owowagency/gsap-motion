import { F } from '@mobily/ts-belt';

export function iterableToArray<T>(iterable: Iterable<T>) {
    return [...iterable];
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

export const getUndefined = () => undefined;

export function createContainer<T>(initialValue: T) {
    let value = initialValue;

    return Object.freeze({
        getValue: () => value,
        setValue: (newValue: T) => (value = newValue),
    });
}
