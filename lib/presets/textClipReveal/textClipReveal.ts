import { A, D, F, O, R, flow, pipe } from "@mobily/ts-belt";
import { MotionParams, createMotion } from "../../utilities/motion/motion";
import type { SplitText } from "gsap/all";
import gsap from "gsap";
import { getValue } from "@/core/common";
import { printError } from "@/core/console";
import { getMotionTargets } from "@/core/dom";

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
