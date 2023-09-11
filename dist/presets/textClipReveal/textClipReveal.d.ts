import { MotionParams } from "../../utilities/motion/motion";
import type { SplitText } from "gsap/all";
export type TextClipRevealParams = {
    SplitText: typeof SplitText;
    childSplitVars?: ValueOrGetter<SplitText.Vars>;
    parentSplitVars?: ValueOrGetter<SplitText.Vars>;
    fromVars?: ValueOrGetter<gsap.TweenVars>;
    toVars?: ValueOrGetter<gsap.TweenVars>;
};
/**
 * Creates a text clip reveal animation effect on the target elements. The text clip reveal effect involves splitting the text into lines and revealing them with a sliding animation.
 *
 * This function leverages the `createMotion` function to achieve this effect.
 *
 * @param target - The target elements to apply the text clip reveal effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param textClipRevealParams - Optional parameters for the text clip reveal effect, including the SplitText GSAP plugin, split variables for child and parent elements, and tween variables for the from and to states of the animation.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the text clip reveal effect.
 */
export declare function createTextClipReveal(target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>, textClipRevealParams: ValueOrGetter<TextClipRevealParams>, motionParams?: ValueOrGetter<MotionParams>): import("../../utilities/motion/motion").MotionDestroy;
export { TextClipReveal } from "./textClipReveal.legacy";
