declare module "*.css?inline";

type Optional<T> = T | null | undefined;
type OptionalOrVoid<T> = Optional<T> | void;
