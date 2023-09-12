import { A, D, F, O, R, flow, pipe } from "@mobily/ts-belt";
import { MotionParams, MotionTarget, createMotion } from "../../utilities/motion/motion";
import type { SplitText } from "gsap/all";
import gsap from "gsap";
import { getValue } from "@/core/common";
import { printError, tapDebugLog } from "@/core/console";
import { getMotionTargets } from "@/core/dom";
import { ValueOrGetter } from "@/core/valueOrGetterType";

export type TextClipRevealParams = {
  SplitText: typeof SplitText;
  childSplitVars?: ValueOrGetter<SplitText.Vars>;
  parentSplitVars?: ValueOrGetter<SplitText.Vars>;
  fromVars?: ValueOrGetter<gsap.TweenVars>;
  toVars?: ValueOrGetter<gsap.TweenVars>;
};

type TextClipRevealConfig = {
  SplitText?: typeof SplitText;
  childSplitVars?: SplitText.Vars;
  parentSplitVars?: SplitText.Vars;
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
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
export function createTextClipReveal(
  target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>,
  textClipRevealParams: ValueOrGetter<TextClipRevealParams>,
  motionParams: ValueOrGetter<MotionParams> = {}
) {
  const config = pipe(
    textClipRevealParams,
    getValue,
    D.map(flow(O.fromNullable, getValue)),
    F.coerce<TextClipRevealConfig>
  );

  const splitTextPlugin = pipe(
    R.fromNullable(config.SplitText, new Error("Missing `SplitText` GSAP member plugin.")),
    R.tap((p) => gsap.registerPlugin(p))
  );

  const createInstances = flow(
    getMotionTargets,
    tapDebugLog("targets"),
    A.map((element) =>
      pipe(
        splitTextPlugin,
        R.map((SplitText) => ({
          childSplit: new SplitText(element, {
            type: "lines",
            linesClass: "owow-split-child",
            ...config.childSplitVars,
          }),
          parentSplit: new SplitText(element, {
            type: "lines",
            linesClass: "owow-split-parent",
            ...config.parentSplitVars,
          }),
        })),
        R.tapError(printError())
      )
    )
  );

  const fromVars: gsap.TweenVars = {
    y: (_, target) => {
      const num = parseFloat(getComputedStyle(target).lineHeight);
      return (isNaN(num) ? gsap.getProperty(target, "height") : num) as number;
    },
    ...config.fromVars,
  };

  const toVars: gsap.TweenVars = {
    y: 0,
    stagger: { each: 0.05 },
    duration: 0.8,
    ease: "power2.inOut",
    ...config.toVars,
  };

  const motion = createMotion(() => {
    const instances = createInstances(target);

    const context = gsap.context(() => {
      A.tap(
        instances,
        R.tap(({ parentSplit, childSplit }) => {
          gsap.set(parentSplit.lines, { overflow: "hidden" });
          gsap.fromTo(childSplit.lines, fromVars, toVars);
        })
      );
    });

    return () => {
      A.forEach(
        instances,
        R.tap(({ childSplit }) => childSplit.revert())
      );
      context.kill(true);
    };
  }, getValue(motionParams));

  return motion;
}

// export legacy
export { TextClipReveal } from "./textClipReveal.legacy";
