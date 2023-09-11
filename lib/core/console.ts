import { F } from "@mobily/ts-belt";

export function printError<T>() {
  return (message: T) => console.error(String(message));
}

export function tapDebugLog<T, M>(message: M, ...optionalParams: unknown[]) {
  return F.tap<T>(
    import.meta.env.DEV
      ? (...values: unknown[]) => console.log(message, ...optionalParams, ...values)
      : F.ignore
  );
}

export function debugLog<T>(message: T, ...optionalParams: unknown[]) {
  import.meta.env.DEV && console.log(message, ...optionalParams);
}
