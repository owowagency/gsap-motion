import type { SplitText } from 'gsap/SplitText';
import type { MotionParams } from '../../utilities/motion/motion';
import { Motion } from '../../utilities/motion/motion';
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
    static SplitText?: typeof SplitText;
    constructor(target: gsap.DOMTarget, settings?: TextClipRevealSettings, motionParams?: MotionParams);
}
