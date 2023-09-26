import { A, D, F, G, O, R, flow, pipe } from '@mobily/ts-belt';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getValue } from '@/core/common';
import {
    createElement,
    getMotionTargets,
    getNumberFromAttribute,
    replaceElement,
} from '@/core/dom';
import type { ValueOrGetter } from '@/core/valueOrGetterType';
import type { MotionParams, MotionTarget } from '@/index';
import { createMotion } from '@/index';
import { printError } from '@/core/console';

export type ParallaxParams = {
    scrollTriggerVars?: ValueOrGetter<ScrollTrigger.Vars>;
    speed?: ValueOrGetter<number>;
    cssUnit?: ValueOrGetter<string>;
    createDOM?: ValueOrGetter<boolean>;
    updater?: (progress: number, speed: number) => number;
};

type ParallaxConfig = {
    scrollTriggerVars?: ScrollTrigger.Vars;
    speed?: number;
    cssUnit?: string;
    createDOM?: boolean;
};

type ParallaxDOM = {
    outer: Element;
    inner: Element;
    original: Element;
};

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a parallax scrolling effect on the target elements. The parallax effect involves moving the background content at a slower rate than the foreground content, creating an illusion of depth.
 *
 * This function leverages the `createMotion` function to achieve this effect.
 *
 * @param target - The target elements to apply the parallax effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param parallaxParams - Optional parameters for the parallax effect, including scroll trigger variables, speed, CSS unit for the parallax movement, and a custom updater function.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the parallax effect.
 */
export function createParallax(
    target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>,
    parallaxParams: ValueOrGetter<ParallaxParams> = {},
    motionParams: ValueOrGetter<MotionParams> = {},
) {
    const custom = pipe(parallaxParams, getValue, D.selectKeys(['updater']));

    const config = pipe(
        parallaxParams,
        getValue,
        D.deleteKeys(['updater']),
        D.map(flow(O.fromNullable, getValue)),
        F.coerce<ParallaxConfig>,
    );

    const getScrollTriggerProgress = (scrollTrigger: ScrollTrigger) => () => scrollTrigger.progress;

    const getParallaxPosition =
        (speed = 1) =>
        (progress: number) => {
            if (custom.updater) {
                return custom.updater(progress, speed);
            }

            return gsap.utils.interpolate(100 * speed, -100 * speed, progress);
        };

    const createPositionUpdater = (
        scrollTrigger: ScrollTrigger,
        setter: (n: number) => string,
        speed?: number,
    ) =>
        flow(getScrollTriggerProgress(scrollTrigger), getParallaxPosition(speed), setter, F.ignore);

    const createInstances = flow(
        getMotionTargets,
        A.map(
            getParallaxDOM(config.createDOM ?? true, 'owow-parallax-outer', 'owow-parallax-inner'),
        ),
        A.map(
            R.map((dom) => {
                const scrollTrigger = ScrollTrigger.create({
                    trigger: dom.outer,
                    start: 'top bottom',
                    end: 'bottom top',
                    ...config.scrollTriggerVars,
                });

                const quickSetY = F.coerce<(n: number) => string>(
                    gsap.quickSetter(dom.inner, 'y', config.cssUnit ?? '%'),
                );

                const quickSetX = F.coerce<(n: number) => string>(
                    gsap.quickSetter(dom.inner, 'x', config.cssUnit ?? '%'),
                );

                const speed = getNumberFromAttribute(dom.inner, 'data-parallax-speed');

                return Object.freeze({
                    dom,
                    scrollTrigger,
                    updateY: createPositionUpdater(scrollTrigger, quickSetY, speed ?? config.speed),
                    updateX: createPositionUpdater(scrollTrigger, quickSetX, speed ?? config.speed),
                    destroy: () => scrollTrigger.kill(),
                    revert: () => dom.outer.replaceWith(dom.original),
                });
            }),
        ),
        A.map(R.toUndefined),
        A.filter(G.isNotNullable),
    );

    const motion = createMotion(() => {
        const instances = createInstances(target);

        const tickHandler = gsap.ticker.add(() => {
            A.forEach(instances, ({ updateY }) => {
                updateY();
            });
        });

        return () => {
            gsap.ticker.remove(tickHandler);

            A.forEach(instances, (instance) => {
                instance.revert();
                instance.destroy();
            });
        };
    }, getValue(motionParams));

    return motion;
}

function getParallaxDOM(createDOM: boolean, outerClassName: string, innerClassName: string) {
    const createOuterContainer = flow(
        createElement('div'),
        F.tap((el) => el.classList.add(outerClassName)),
    );

    return flow(
        F.ifElse(
            () => createDOM,
            (element: Element): R.Ok<ParallaxDOM> => {
                const replace = replaceElement(element);
                const clone = F.coerce<typeof element>(element.cloneNode(true));
                const outerContainer = createOuterContainer();
                clone.classList.add(innerClassName);
                outerContainer.append(clone);
                replace(outerContainer);

                return R.Ok({
                    inner: clone,
                    outer: outerContainer,
                    original: element,
                });
            },
            (element: Element): R.Result<ParallaxDOM, Error> =>
                pipe(
                    element,
                    R.fromPredicate(
                        validateDioramaDOMStructure(outerClassName, innerClassName),
                        new Error('Invalid DOM structure for parallax'),
                    ),
                    R.tapError(printError()),
                    R.map(() => ({
                        inner: F.coerce<Element>(element.firstElementChild),
                        outer: element,
                        original: element,
                    })),
                ),
        ),
    );
}

function validateDioramaDOMStructure(outerClassName: string, innerClassName: string) {
    return (element: Element) =>
        A.all(
            [
                element.children.length === 1,
                element.classList.contains(outerClassName),
                element.firstElementChild?.classList.contains(innerClassName),
            ],
            Boolean,
        );
}
