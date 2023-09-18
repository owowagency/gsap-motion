export type Vec2 = {
    x: number;
    y: number;
};
export type NormalizedVec2 = {
    x: number;
    y: number;
    nx: number;
    ny: number;
};
export declare function createVec2(x: number, y: number): Vec2;
export declare function createNormalizedVec2(vec2: Vec2, bbox: Vec2): NormalizedVec2;
