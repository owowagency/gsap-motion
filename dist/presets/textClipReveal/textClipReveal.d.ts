import { Motion, MotionParams } from "../../utilities/motion/motion";
import type { SplitText } from "gsap/all";
export type TextClipRevealSettings = {
    childSplitVars?: SplitText.Vars | (() => SplitText.Vars);
    parentSplitVars?: SplitText.Vars | (() => SplitText.Vars);
    fromVars?: gsap.TweenVars | (() => gsap.TweenVars);
    toVars?: gsap.TweenVars | (() => gsap.TweenVars);
};
export declare class TextClipReveal extends Motion<{
    childSplit?: SplitText;
    parentSplit?: SplitText;
    setup?: gsap.core.Tween;
    tween?: gsap.core.Tween;
}> {
    constructor(target: gsap.DOMTarget, settings?: TextClipRevealSettings, motionParams?: MotionParams);
}
