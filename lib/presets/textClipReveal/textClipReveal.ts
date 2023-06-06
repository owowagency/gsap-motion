import { SplitText } from "gsap/dist/SplitText";
import { Motion } from "../../utilities/motion/motion";
import { gsap } from "gsap";
import { getValue } from "../../utils";

gsap.registerPlugin(SplitText);

export type TextClipRevealSettings = {
  childSplitVars?: SplitText.Vars | (() => SplitText.Vars);
  parentSplitVars?: SplitText.Vars | (() => SplitText.Vars);
  fromVars?: gsap.TweenVars | (() => gsap.TweenVars);
  toVars?: gsap.TweenVars | (() => gsap.TweenVars);
};

export class TextClipReveal extends Motion<{
  childSplit?: SplitText;
  parentSplit?: SplitText;
  setup?: gsap.core.Tween;
  tween?: gsap.core.Tween;
}> {
  constructor(target: gsap.DOMTarget, settings: TextClipRevealSettings = {}) {
    super(
      (motion, context) => {
        if (!SplitText) throw new Error("SplitText is a premium feature.");

        const targetElements = gsap.utils.toArray(target);

        for (const el of targetElements) {
          if (el instanceof HTMLElement) continue;
          throw new TypeError("Target should be HTML Element");
        }

        const childSplit = (motion.meta.childSplit = new SplitText(target, {
          type: "lines",
          linesClass: "owow-split-child",
          ...getValue(settings.childSplitVars),
        }));

        const parentSplit = (motion.meta.parentSplit = new SplitText(target, {
          type: "lines",
          linesClass: "owow-split-parent",
          ...getValue(settings.parentSplitVars),
        }));

        const fromVars: gsap.TweenVars = {
          y: (_, target) => parseFloat(getComputedStyle(target).lineHeight),
          ...getValue(settings.fromVars),
        };

        const toVars: gsap.TweenVars = {
          y: 0,
          stagger: { each: 0.05 },
          duration: 0.8,
          ease: "power2.inOut",
          ...getValue(settings.toVars),
        };

        context.add(() => {
          motion.meta.setup = gsap.set(parentSplit.lines, { overflow: "hidden" });
          motion.meta.tween = gsap.fromTo(childSplit.lines, fromVars, toVars);
        });

        return () => {
          childSplit.revert();
          context.kill(true);
        };
      },
      { shouldResetOnResize: () => [document.body, "horizontal"] }
    );
  }
}
