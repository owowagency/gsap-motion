import { gsap } from 'gsap';
import type { SplitText } from 'gsap/SplitText';
import type { MotionParams } from '../../utilities/motion/motion';
import { Motion } from '../../utilities/motion/motion';
import { getValue } from '@/core/common';

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
    static SplitText?: typeof SplitText;

    constructor(
        target: gsap.DOMTarget,
        settings: TextClipRevealSettings = {},
        motionParams: MotionParams = {},
    ) {
        super(async (motion, context) => {
            const SplitText = TextClipReveal.SplitText;

            if (!SplitText) {
                console.error('SplitText is a GSAP member plugin. Did you forget to include it?');
                throw new Error('SplitText missing.');
            }

            const targetElements = gsap.utils.toArray(target);

            for (const el of targetElements) {
                if (el instanceof HTMLElement) {
                    continue;
                }
                throw new TypeError('Target should be HTML Element');
            }

            const childSplit = (motion.meta.childSplit = new SplitText(target, {
                type: 'lines',
                linesClass: 'owow-split-child',
                ...getValue(settings.childSplitVars),
            }));

            const parentSplit = (motion.meta.parentSplit = new SplitText(target, {
                type: 'lines',
                linesClass: 'owow-split-parent',
                ...getValue(settings.parentSplitVars),
            }));

            const fromVars: gsap.TweenVars = {
                y: (_, target) => {
                    const num = parseFloat(getComputedStyle(target).lineHeight);

                    return (isNaN(num) ? gsap.getProperty(target, 'height') : num) as number;
                },
                ...getValue(settings.fromVars),
            };

            const toVars: gsap.TweenVars = {
                y: 0,
                stagger: { each: 0.05 },
                duration: 0.8,
                ease: 'power2.inOut',
                ...getValue(settings.toVars),
            };

            context.add(() => {
                motion.meta.setup = gsap.set(parentSplit.lines, { overflow: 'hidden' });
                motion.meta.tween = gsap.fromTo(childSplit.lines, fromVars, toVars);
            });

            return () => {
                childSplit.revert();
                context.kill(true);
            };
        }, motionParams);
    }
}
