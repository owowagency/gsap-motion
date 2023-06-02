export class Ease {
  /** accelerating from zero velocity */
  static inQuad = (t: number) => t * t;

  /** decelerating to zero velocity */
  static outQuad = (t: number) => t * (2 - t);

  /** acceleration until halfway, then deceleration */
  static inOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  /** accelerating from zero velocity */
  static inCubic = (t: number) => t * t * t;

  /** decelerating to zero velocity */
  static outCubic = (t: number) => --t * t * t + 1;

  /** acceleration until halfway, then deceleration */
  static inOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  /** accelerating from zero velocity */
  static inQuart = (t: number) => t * t * t * t;

  /** decelerating to zero velocity */
  static outQuart = (t: number) => 1 - --t * t * t * t;

  /** acceleration until halfway, then deceleration */
  static inOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);

  /** accelerating from zero velocity */
  static inQuint = (t: number) => t * t * t * t * t;

  /** decelerating to zero velocity */
  static outQuint = (t: number) => 1 + --t * t * t * t * t;

  /** acceleration until halfway, then deceleration */
  static inOutQuint = (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}
