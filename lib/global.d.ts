declare module "*.css?inline";

type ValueOrGetter<T> = T | (() => T);

type Maybe<T> = T | null | undefined;
type MaybeOrVoid<T> = Maybe<T> | void;

type Vec2 = { x: number; y: number };
type NormalizedVec2 = { x: number; y: number; nx: number; ny: number };
