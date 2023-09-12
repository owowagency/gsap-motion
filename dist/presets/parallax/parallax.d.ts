import { MotionParams, MotionTarget } from '../../index';
export type ParallaxParams = {
    scrollTriggerVars?: ValueOrGetter<ScrollTrigger.Vars>;
    speed?: ValueOrGetter<number>;
    cssUnit?: ValueOrGetter<string>;
    updater?: (progress: number, speed: number) => number;
};
/**
 * Creates a parallax scrolling effect on the target elements. The parallax effect involves moving the background content at a slower rate than the foreground content, creating an illusion of depth.
 *
 * This function leverages the `createMotion` function to achieve this effect.
 *
 * @param target - The target elements to apply the parallax effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param parallaxParams - Optional parameters for the parallax effect, including scroll trigger variables, speed, CSS unit for the parallax movement, and a custom updater function.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the parallax effect.
 */
export declare function createParallax(target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>, parallaxParams?: ValueOrGetter<ParallaxParams>, motionParams?: MotionParams): import('../../index').MotionDestroy;
