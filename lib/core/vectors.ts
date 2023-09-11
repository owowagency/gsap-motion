export function createVec2(x: number, y: number): Vec2 {
  return { x, y };
}

export function createNormalizedVec2(vec2: Vec2, bbox: Vec2): NormalizedVec2 {
  return {
    ...vec2,
    nx: vec2.x / bbox.x,
    ny: vec2.y / bbox.y,
  };
}
