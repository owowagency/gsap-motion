const MAGNITUDE_BACK = 1.70158;
const MAGNITUDE_ELASTIC = 0.7;

export class Ease {
  static inSine = (t: number) => -1 * Math.cos(t * (Math.PI / 2)) + 1;
  static outSine = (t: number) => Math.sin(t * (Math.PI / 2));
  static inOutSine = (t: number) => -0.5 * (Math.cos(Math.PI * t) - 1);

  static inQuad = (t: number) => t * t;
  static outQuad = (t: number) => t * (2 - t);
  static inOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  static inCubic = (t: number) => t * t * t;
  static outCubic = (t: number) => --t * t * t + 1;
  static inOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  static inQuart = (t: number) => t * t * t * t;
  static outQuart = (t: number) => 1 - --t * t * t * t;
  static inOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);

  static inQuint = (t: number) => t * t * t * t * t;
  static outQuint = (t: number) => 1 + --t * t * t * t * t;
  static inOutQuint = (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

  static inExpo = (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1)));
  static outExpo = (t: number) => (t === 1 ? 1 : -Math.pow(2, -10 * t) + 1);
  static inOutExpo = (t: number) => {
    if (t === 0 || t === 1) return t;
    if (t * 2 < 1) return 0.5 * Math.pow(2, 10 * (t * 2 - 1));
    return 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2);
  };

  static inCirc = (t: number) => -1 * (Math.sqrt(1 - (t / 1) * t) - 1);
  static outCirc = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2));
  static inOutCirc = (t: number) => {
    if (t * 2 < 1) return -0.5 * (Math.sqrt(1 - Math.pow(t * 2, 2)) - 1);
    return 0.5 * (Math.sqrt(1 - Math.pow(t * 2 - 2, 2)) + 1);
  };

  static inBack = (t: number, m = MAGNITUDE_BACK) => t * t * ((m + 1) * t - m);
  static outBack = (t: number, m = MAGNITUDE_BACK) => {
    const s = t / 1 - 1;
    return s * s * ((m + 1) * s + m) + 1;
  };
  static inOutBack = (t: number, m = MAGNITUDE_BACK) => {
    const s = t * 2;
    const s2 = s - 2;
    const ms = m * 1.525;
    if (s < 1) return 0.5 * s * s * ((ms + 1) * s - ms);
    return 0.5 * (s2 * s2 * ((ms + 1) * s2 + ms) + 2);
  };

  static inElastic = (t: number, m = MAGNITUDE_ELASTIC) => {
    if (t === 0 || t === 1) return t;
    const s = t / 1;
    const s1 = s - 1;
    const p = 1 - m;
    const sp = (p / (2 * Math.PI)) * Math.asin(1);
    return -(Math.pow(2, 10 * s1) * Math.sin(((s1 - sp) * (2 * Math.PI)) / p));
  };
  static outElastic = (t: number, m = MAGNITUDE_ELASTIC) => {
    if (t === 0 || t === 1) return t;
    const p = 1 - m;
    const s = t * 2;
    const sp = (p / (2 * Math.PI)) * Math.asin(1);
    return Math.pow(2, -10 * s) * Math.sin(((s - sp) * (2 * Math.PI)) / p) + 1;
  };
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
