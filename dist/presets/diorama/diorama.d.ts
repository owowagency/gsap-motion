import { MotionParams, ParallaxParams } from '../../index';
export type DioramaParams = {
    createDOM?: ValueOrGetter<boolean>;
    parallaxParams?: ValueOrGetter<ParallaxParams>;
    size?: ValueOrGetter<number>;
};
/**
 * Creates a diorama animation effect on the target elements. The diorama effect involves moving the inner contents of the target elements with a delayed, parallax movement, giving a sense of depth and motion.
 *
 * This function leverages the `createMotion` and `createParallax` functions to achieve this effect.
 *
 * @param target - The target elements to apply the diorama effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param dioramaParams - Optional parameters for the diorama effect, including whether to create a DOM, parallax parameters, and size.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the diorama effect.
 */
export declare function createDiorama(target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>, dioramaParams?: ValueOrGetter<DioramaParams>, motionParams?: ValueOrGetter<MotionParams>): import('../../index').MotionDestroy;
