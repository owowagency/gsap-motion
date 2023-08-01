const MAGNITUDE_BACK = 1.70158;
const MAGNITUDE_ELASTIC = 0.7;

/**
 * Class representing easing functions.
 */
export class Ease {
  /**
   * Easing function that starts slow, accelerates and then slows down.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inSine = (t: number) => -1 * Math.cos(t * (Math.PI / 2)) + 1;

  /**
   * Easing function that starts fast, decelerates and then speeds up.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outSine = (t: number) => Math.sin(t * (Math.PI / 2));

  /**
   * Easing function that combines inSine and outSine, creating a slow start and end with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutSine = (t: number) => -0.5 * (Math.cos(Math.PI * t) - 1);

  /**
   * Easing function that accelerates from zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inQuad = (t: number) => t * t;

  /**
   * Easing function that decelerates to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outQuad = (t: number) => t * (2 - t);

  /**
   * Easing function that combines inQuad and outQuad, creating an acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  /**
   * Easing function that accelerates from zero velocity faster than inQuad.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inCubic = (t: number) => t * t * t;

  /**
   * Easing function that decelerates to zero velocity faster than outQuad.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outCubic = (t: number) => --t * t * t + 1;

  /**
   * Easing function that combines inCubic and outCubic, creating a faster acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  /**
   * Easing function that accelerates from zero velocity even faster than inCubic.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inQuart = (t: number) => t * t * t * t;

  /**
   * Easing function that decelerates to zero velocity even faster than outCubic.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outQuart = (t: number) => 1 - --t * t * t * t;

  /**
   * Easing function that combines inQuart and outQuart, creating an even faster acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);

  /**
   * Easing function that accelerates from zero velocity at the fastest rate.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inQuint = (t: number) => t * t * t * t * t;

  /**
   * Easing function that decelerates to zero velocity at the fastest rate.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outQuint = (t: number) => 1 + --t * t * t * t * t;

  /**
   * Easing function that combines inQuint and outQuint, creating the fastest acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutQuint = (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

  /**
   * Easing function that starts slow, accelerates rapidly and then slows down to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inExpo = (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1)));

  /**
   * Easing function that starts fast, decelerates rapidly and then speeds up to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outExpo = (t: number) => (t === 1 ? 1 : -Math.pow(2, -10 * t) + 1);

  /**
   * Easing function that combines inExpo and outExpo, creating a rapid acceleration and deceleration with a slow start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutExpo = (t: number) => {
    if (t === 0 || t === 1) return t;
    if (t * 2 < 1) return 0.5 * Math.pow(2, 10 * (t * 2 - 1));
    return 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2);
  };

  /**
   * Easing function that starts slow, accelerates and then decelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inCirc = (t: number) => -1 * (Math.sqrt(1 - (t / 1) * t) - 1);

  /**
   * Easing function that starts fast, decelerates and then accelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static outCirc = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2));

  /**
   * Easing function that combines inCirc and outCirc, creating an acceleration and deceleration with a fast start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  static inOutCirc = (t: number) => {
    if (t * 2 < 1) return -0.5 * (Math.sqrt(1 - Math.pow(t * 2, 2)) - 1);
    return 0.5 * (Math.sqrt(1 - Math.pow(t * 2 - 2, 2)) + 1);
  };

  /**
   * Easing function that starts slow, accelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  static inBack = (t: number, m = MAGNITUDE_BACK) => t * t * ((m + 1) * t - m);

  /**
   * Easing function that starts fast, decelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  static outBack = (t: number, m = MAGNITUDE_BACK) => {
    const s = t / 1 - 1;
    return s * s * ((m + 1) * s + m) + 1;
  };

  /**
   * Easing function that combines inBack and outBack, creating a start and end beyond the destination with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  static inOutBack = (t: number, m = MAGNITUDE_BACK) => {
    const s = t * 2;
    const s2 = s - 2;
    const ms = m * 1.525;
    if (s < 1) return 0.5 * s * s * ((ms + 1) * s - ms);
    return 0.5 * (s2 * s2 * ((ms + 1) * s2 + ms) + 2);
  };

  /**
   * Easing function that starts slow, accelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  static inElastic = (t: number, m = MAGNITUDE_ELASTIC) => {
    if (t === 0 || t === 1) return t;
    const s = t / 1;
    const s1 = s - 1;
    const p = 1 - m;
    const sp = (p / (2 * Math.PI)) * Math.asin(1);
    return -(Math.pow(2, 10 * s1) * Math.sin(((s1 - sp) * (2 * Math.PI)) / p));
  };

  /**
   * Easing function that starts fast, decelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  static outElastic = (t: number, m = MAGNITUDE_ELASTIC) => {
    if (t === 0 || t === 1) return t;
    const p = 1 - m;
    const s = t * 2;
    const sp = (p / (2 * Math.PI)) * Math.asin(1);
    return Math.pow(2, -10 * s) * Math.sin(((s - sp) * (2 * Math.PI)) / p) + 1;
  };

  /**
   * Easing function that combines inElastic and outElastic, creating an overshoot at both the start and end with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  static inOutElastic = (t: number, m = MAGNITUDE_ELASTIC) => {
    if (t === 0 || t === 1) return t;
    const p = 1 - m;
    const s = t * 2;
    const s1 = s - 1;
    const sp = (p / (2 * Math.PI)) * Math.asin(1);
    if (s < 1) return -0.5 * (Math.pow(2, 10 * s1) * Math.sin(((s1 - sp) * (2 * Math.PI)) / p));
    return Math.pow(2, -10 * s1) * Math.sin(((s1 - sp) * (2 * Math.PI)) / p) * 0.5 + 1;
  };
}
