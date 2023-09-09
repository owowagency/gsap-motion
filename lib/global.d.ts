declare module "*.css?inline";

type Optional<T> = T | null | undefined;
type OptionalOrVoid<T> = Optional<T> | void;

type Vec2 = { x: number; y: number };
type NormalizedVec2 = { x: number; y: number; nx: number; ny: number };
