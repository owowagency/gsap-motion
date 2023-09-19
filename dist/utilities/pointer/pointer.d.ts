import type { NormalizedVec2 } from '../../core/vectors';
export { Pointer } from './pointer.legacy';
/**
 * Provides a utility for interacting with various types mouse positions; client (window), page and screen.
 * Every type of mouse position also provides a normalized position between 0 and 1.
 */
export declare const mousePosition: () => {
    readonly client: NormalizedVec2;
    readonly page: NormalizedVec2;
    readonly screen: NormalizedVec2;
};
