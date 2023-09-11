import { MotionParams } from "../../utilities/motion/motion";
declare const MARQUEE_DIRECTION: readonly ["ltr", "rtl", "scroll", "scroll-reverse"];
export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];
export type MarqueeParams = {
    speed?: ValueOrGetter<number>;
    scrollVelocity?: ValueOrGetter<number>;
    direction?: ValueOrGetter<MarqueeDirection>;
    createDOM?: ValueOrGetter<boolean>;
    scrollTriggerVars?: ValueOrGetter<ScrollTrigger.Vars>;
    onUpdate?: (progress: number) => void;
    onCreated?: () => void;
};
/**
 * Creates a marquee animation effect on the target elements. The marquee effect involves moving the content of the target elements horizontally, either to the left or right, in a continuous loop.
 *
 * This function leverages the `createMotion` function to achieve this effect.
 *
 * @param target - The target elements to apply the marquee effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param marqueeParams - Optional parameters for the marquee effect, including speed, scroll velocity, direction, whether to create a DOM, scroll trigger variables, and callbacks for update and creation events.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the marquee effect.
 */
export declare function createMarquee(target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>, marqueeParams?: ValueOrGetter<MarqueeParams>, motionParams?: ValueOrGetter<MotionParams>): import("../../utilities/motion/motion").MotionDestroy;
export { Marquee } from "./marquee.legacy";
