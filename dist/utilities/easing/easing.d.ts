/**
 * Easing functions.
 */
export declare const Ease: {
    /**
     * Easing function that starts slow, accelerates and then slows down.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inSine: (t: number) => number;
    /**
     * Easing function that starts fast, decelerates and then speeds up.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outSine: (t: number) => number;
    /**
     * Easing function that combines inSine and outSine, creating a slow start and end with a fast middle.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutSine: (t: number) => number;
    /**
     * Easing function that accelerates from zero velocity.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inQuad: (t: number) => number;
    /**
     * Easing function that decelerates to zero velocity.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outQuad: (t: number) => number;
    /**
     * Easing function that combines inQuad and outQuad, creating an acceleration from and deceleration to zero velocity.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutQuad: (t: number) => number;
    /**
     * Easing function that accelerates from zero velocity faster than inQuad.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inCubic: (t: number) => number;
    /**
     * Easing function that decelerates to zero velocity faster than outQuad.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outCubic: (t: number) => number;
    /**
     * Easing function that combines inCubic and outCubic, creating a faster acceleration from and deceleration to zero velocity.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutCubic: (t: number) => number;
    /**
     * Easing function that accelerates from zero velocity even faster than inCubic.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inQuart: (t: number) => number;
    /**
     * Easing function that decelerates to zero velocity even faster than outCubic.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outQuart: (t: number) => number;
    /**
     * Easing function that combines inQuart and outQuart, creating an even faster acceleration from and deceleration to zero velocity.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutQuart: (t: number) => number;
    /**
     * Easing function that accelerates from zero velocity at the fastest rate.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inQuint: (t: number) => number;
    /**
     * Easing function that decelerates to zero velocity at the fastest rate.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outQuint: (t: number) => number;
    /**
     * Easing function that combines inQuint and outQuint, creating the fastest acceleration from and deceleration to zero velocity.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutQuint: (t: number) => number;
    /**
     * Easing function that starts slow, accelerates rapidly and then slows down to a stop.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inExpo: (t: number) => number;
    /**
     * Easing function that starts fast, decelerates rapidly and then speeds up to a stop.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outExpo: (t: number) => number;
    /**
     * Easing function that combines inExpo and outExpo, creating a rapid acceleration and deceleration with a slow start and end.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutExpo: (t: number) => number;
    /**
     * Easing function that starts slow, accelerates and then decelerates to a stop.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inCirc: (t: number) => number;
    /**
     * Easing function that starts fast, decelerates and then accelerates to a stop.
     * @param t - The time parameter, a value between 0 and 1.
     */
    outCirc: (t: number) => number;
    /**
     * Easing function that combines inCirc and outCirc, creating an acceleration and deceleration with a fast start and end.
     * @param t - The time parameter, a value between 0 and 1.
     */
    inOutCirc: (t: number) => number;
    /**
     * Easing function that starts slow, accelerates beyond the destination and then settles back to the destination.
     * @param t - The time parameter, a value between 0 and 1.
     * @param m - The magnitude parameter.
     */
    inBack: (t: number, m?: number) => number;
    /**
     * Easing function that starts fast, decelerates beyond the destination and then settles back to the destination.
     * @param t - The time parameter, a value between 0 and 1.
     * @param m - The magnitude parameter.
     */
    outBack: (t: number, m?: number) => number;
    /**
     * Easing function that combines inBack and outBack, creating a start and end beyond the destination with a fast middle.
     * @param t - The time parameter, a value between 0 and 1.
     * @param m - The magnitude parameter.
     */
    inOutBack: (t: number, m?: number) => number;
    /**
     * Easing function that starts slow, accelerates, overshoots the destination and then oscillates to a stop.
     * @param t - The time parameter, a value between 0 and 1.
     * @param m - The magnitude parameter.
     */
    inElastic: (t: number, m?: number) => number;
    /**
     * Easing function that starts fast, decelerates, overshoots the destination and then oscillates to a stop.
     * @param t - The time parameter, a value between 0 and 1.
     * @param m - The magnitude parameter.
     */
    outElastic: (t: number, m?: number) => number;
    /**
     * Easing function that combines inElastic and outElastic, creating an overshoot at both the start and end with a fast middle.
     * @param t - The time parameter, a value between 0 and 1.
     * @param m - The magnitude parameter.
     */
    inOutElastic: (t: number, m?: number) => number;
};
