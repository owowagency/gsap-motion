import { Motion, MotionParams } from "../../utilities/motion/motion";
import { gsap } from "gsap";
import { getValue } from "../../utils";
import type { SplitText } from "gsap/all";

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
  constructor(
    target: gsap.DOMTarget,
    settings: TextClipRevealSettings = {},
    motionParams: MotionParams = {}
  ) {
    super(async (motion, context) => {
      const SplitText = await importSplitTextPlugin();

      if (!SplitText) {
        console.error("SplitText is a GSAP member plugin. Did you forget to include it?");
        throw new Error("SplitText missing.");
      }

      gsap.registerPlugin(SplitText);

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
    }, motionParams);
  }
}

async function importSplitTextPlugin() {
  const path = "/node_modules/gsap/SplitText.js";
  const modules = import.meta.glob("/node_modules/gsap/SplitText.js");
  try {
    const _module = ((await modules[path]?.()) ?? null) as typeof import("gsap/SplitText");
    return _module?.default ?? null;
  } catch (error) {
    return null;
  }
}
