import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { A, B, D, F, O, R, flow, pipe } from '@mobily/ts-belt';
import type IntertiaPlugin from 'gsap/InertiaPlugin';
import { Draggable } from 'gsap/Draggable';
import type { MotionParams, MotionTarget } from '../../utilities/motion/motion';
import { createMotion } from '../../utilities/motion/motion';
import { getValue } from '@/core/common';
import { debugLog, printError, tapDebugLog } from '@/core/console';
import {
    appendToElement,
    createDocumentFragment,
    createElement,
    getMotionTargets,
    queryElement,
} from '@/core/dom';
import { roundToDecimalPlaces } from '@/core/numbers';
import type { ValueOrGetter } from '@/core/valueOrGetterType';
import { getUndefined } from '@/core/data';

gsap.registerPlugin(ScrollTrigger);
const { wrap, normalize, interpolate } = gsap.utils;

const MARQUEE_DIRECTION = ['ltr', 'rtl', 'scroll', 'scroll-reverse'] as const;
const INNER_CONTAINER_STYLE = { display: 'inline-flex' };

export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];

export type MarqueeParams = {
    IntertiaPlugin?: typeof IntertiaPlugin;
    draggable?: ValueOrGetter<boolean>;
    draggableVars?: ValueOrGetter<Draggable.Vars>;
    stopOnDrag?: ValueOrGetter<boolean>;
    speed?: ValueOrGetter<number>;
    scrollVelocity?: ValueOrGetter<number>;
    direction?: ValueOrGetter<MarqueeDirection>;
    createDOM?: ValueOrGetter<boolean>;
    scrollTriggerVars?: ValueOrGetter<ScrollTrigger.Vars>;
    onUpdate?: (progress: number) => void;
    onCreated?: (api: { draggable?: Draggable }) => void;
    onDestroyed?: () => void;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
};

type MarqueeConfig = {
    IntertiaPlugin?: typeof IntertiaPlugin;
    draggable?: boolean;
    draggableVars?: Draggable.Vars;
    stopOnDrag?: boolean;
    speed?: number;
    scrollVelocity?: number;
    direction?: MarqueeDirection;
    createDOM?: boolean;
    scrollTriggerVars?: ScrollTrigger.Vars;
};

type MarqueeCallbacks = {
    onUpdate?: (progress: number) => void;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
    onCreated?: (api: { draggable?: Draggable }) => void;
    onDestroyed?: () => void;
};

type MarqueeDOM = {
    target: Element;
    innerContainer: Element;
    outerContainer: Element;
    targetClone: Element;
};

type MarqueeDOMRects = {
    targetRect: DOMRect;
    innerRect: DOMRect;
    boundingWidth: number;
};

type MarqueeInstanceData = {
    dom: MarqueeDOM;
    rects: MarqueeDOMRects;
};

const CLASS_NAME_OUTER = 'owow-marquee-outer';
const CLASS_NAME_INNER = 'owow-marquee-inner';

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
export function createMarquee(
    target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>,
    marqueeParams: ValueOrGetter<MarqueeParams> = {},
    motionParams: ValueOrGetter<MotionParams> = {},
) {
    const callbacks: MarqueeCallbacks = pipe(
        marqueeParams,
        getValue,
        D.selectKeys(['onUpdate', 'onCreated', 'onDestroyed', 'beforeCreate', 'beforeDestroy']),
    );

    const config = pipe(
        marqueeParams,
        getValue,
        D.deleteKeys(['onUpdate', 'onCreated', 'beforeCreate']),
        D.map(flow(O.fromNullable, getValue)),
        F.coerce<MarqueeConfig>,
    );

    const getScrollTrigger = F.once(() => ScrollTrigger.create(config.scrollTriggerVars ?? {}));

    const targets = getMotionTargets(target);

    const createInstances = flow(
        A.map(createMarqueeDOM(config.createDOM ?? true)),
        A.map(
            flow(
                R.map(createMarqueeInstanceData),
                R.map(createMarqueeInstance(config, callbacks, getScrollTrigger())),
            ),
        ),
        tapDebugLog('create marquee instances', { config }),
    );

    const motion = createMotion(() => {
        callbacks.beforeCreate?.();

        const instances = createInstances(targets);

        return () => {
            callbacks.beforeDestroy?.();

            pipe(
                instances,
                tapDebugLog('clean up marquee instances'),
                A.forEach(R.tap((i) => i.revert())),
            );

            callbacks.onDestroyed?.();
        };
    }, getValue(motionParams));

    return motion;
}

function createMarqueeInstance(
    config: MarqueeConfig,
    callbacks: MarqueeCallbacks,
    scrollTrigger: ScrollTrigger,
) {
    const getFragment = F.once(createDocumentFragment());
    let totalContentWidth = 0;

    return (data: MarqueeInstanceData) => {
        const fillWithClonesUntilBWidth = (
            contentWidth = data.rects.innerRect.width,
            boundingWidth = data.rects.boundingWidth,
        ): R.Result<DocumentFragment, Error> => {
            return pipe(
                contentWidth > 0 && boundingWidth > 0,
                R.fromPredicate(F.identity, new Error('Zero width')),
                R.map(
                    flow(
                        () => contentWidth <= boundingWidth,
                        B.ifElse(() => {
                            const clone = data.dom.innerContainer.cloneNode(true);
                            totalContentWidth = contentWidth + data.rects.innerRect.width;
                            getFragment().append(clone);
                            fillWithClonesUntilBWidth(totalContentWidth, boundingWidth);

                            return getFragment();
                        }, getFragment),
                    ),
                ),
            );
        };

        const draggable = createDraggable(data.dom, config);

        const setContainerX = F.coerce<(n: number) => number>(
            gsap.quickSetter(data.dom.outerContainer, 'x', 'px'),
        );

        const stopOnDrag = config.stopOnDrag ?? true;
        const updateX = flow(roundToDecimalPlaces(1000), setContainerX);
        const wrapX = wrap(0, -data.rects.innerRect.width);
        const normalizeX = normalize(0, -data.rects.innerRect.width);

        let direction: number,
            deltaRatio: number,
            velocityDelta: number,
            scrollVelocity: number,
            xCurrent: number,
            xDelta: number,
            xIncrement: number,
            xNext: number,
            xDragCurrent: number,
            xDragPrev: number,
            isDragging: boolean;

        const animate = F.once(() =>
            gsap.ticker.add(() => {
                xDragCurrent = draggable?.x ?? 0;
                xDragPrev ??= xDragCurrent;
                isDragging = (draggable?.isDragging || draggable?.isPressed) ?? false;
                deltaRatio = gsap.ticker.deltaRatio();

                scrollVelocity = interpolate(
                    scrollVelocity ?? 0,
                    scrollTrigger.getVelocity(),
                    0.5 * deltaRatio,
                );

                velocityDelta = scrollVelocity * (config.scrollVelocity || 0);

                switch (config.direction || 'rtl') {
                    case 'ltr':
                        direction = -1;
                        velocityDelta = -Math.abs(velocityDelta);
                        break;
                    case 'rtl':
                        direction = 1;
                        velocityDelta = Math.abs(velocityDelta);
                        break;
                    case 'scroll':
                        direction = scrollTrigger.direction ?? 1;
                        break;
                    case 'scroll-reverse':
                        direction = -(scrollTrigger.direction ?? 1);
                        velocityDelta = -velocityDelta;
                }

                xCurrent = gsap.getProperty(data.dom.outerContainer, 'x') as number;
                xCurrent -= xDragPrev;
                xDelta = (config.speed ?? 1) * -direction;
                xIncrement = isDragging && stopOnDrag ? 0 : (xDelta - velocityDelta) * deltaRatio;
                xNext = wrapX(xCurrent + xIncrement + xDragCurrent);
                xDragPrev = xDragCurrent;

                updateX(xNext);
                callbacks.onUpdate?.(normalizeX(xNext));
            }),
        );

        const init = flow(
            fillWithClonesUntilBWidth,
            R.map(appendToElement(data.dom.outerContainer)),
            R.tap((outerContainer) =>
                gsap.set(outerContainer, {
                    x: 0,
                    force3D: true,
                    width: totalContentWidth,
                    display: 'flex',
                    flexWrap: 'nowrap',
                }),
            ),
            animate,
            () => callbacks.onCreated?.({ draggable }),
        );

        init();

        function revert() {
            debugLog('revert marquee');
            draggable?.kill();
            gsap.ticker.remove(animate());
            data.dom.target.replaceChildren(...data.dom.targetClone.childNodes);
        }

        return Object.freeze({ revert });
    };
}

function createMarqueeInstanceData(dom: MarqueeDOM): MarqueeInstanceData {
    return {
        dom,
        rects: createMarqueeDOMRects(dom),
    };
}

function createDraggable(dom: MarqueeDOM, config: MarqueeConfig): Draggable | undefined {
    const createProxyElement = createElement('div');

    pipe(
        O.fromNullable(config.IntertiaPlugin),
        O.tap((InertiaPlugin) => gsap.registerPlugin(InertiaPlugin)),
    );

    return pipe(
        config.draggable,
        F.ifElse(
            (isDraggable) => isDraggable ?? false,
            () => {
                gsap.registerPlugin(Draggable);
                return Draggable.create(createProxyElement(), {
                    inertia: !!config.IntertiaPlugin,
                    ...config.draggableVars,
                    trigger: dom.outerContainer,
                    type: 'x',
                })[0];
            },
            getUndefined,
        ),
    );
}

function createMarqueeDOMRects({ target, innerContainer }: MarqueeDOM): MarqueeDOMRects {
    const targetRect = target.getBoundingClientRect();
    const innerRect = innerContainer.getBoundingClientRect();

    return {
        targetRect,
        innerRect,
        boundingWidth: targetRect.width + innerRect.width,
    };
}

function createMarqueeDOM(createDOM?: boolean) {
    const handleError = printError<Error>();

    return (target: Element): R.Result<MarqueeDOM, Error> => {
        const outerContainer = pipe(
            target,
            getContainerElement(!!createDOM, CLASS_NAME_OUTER),
            R.tapError(handleError),
        );

        const innerContainer = pipe(
            outerContainer,
            R.flatMap(getContainerElement(!!createDOM, CLASS_NAME_INNER)),
            R.tapError(handleError),
        );

        const result = pipe(
            [outerContainer, innerContainer],
            A.map(R.toOption),
            ([a, b]) => O.zip(a, b),
            O.flatMap(([outerContainer, innerContainer]) => ({
                target,
                outerContainer,
                innerContainer,
                targetClone: F.coerce<typeof target>(target.cloneNode(true)),
            })),
            O.tap(({ target, innerContainer, outerContainer }) => {
                F.when(!!createDOM, Boolean, () => {
                    innerContainer.append(...target.childNodes);
                    outerContainer.append(innerContainer);
                    target.append(outerContainer);
                });

                gsap.set(innerContainer, INNER_CONTAINER_STYLE);
            }),
            R.fromNullable(new Error('Invalid marquee DOM.')),
            R.tapError(handleError),
        );

        return result;
    };
}

function getContainerElement(createDOM: boolean, className: string) {
    return flow(
        F.ifElse(() => createDOM, createElement('div'), queryElement(`.${className}`)),
        R.fromNullable(
            new Error(
                createDOM
                    ? 'Could not create marquee container.'
                    : `Could not find marquee container .${className}`,
            ),
        ),
        R.tap((el) => el.classList.add(className)),
    );
}

// export legacy
export { Marquee } from './marquee.legacy';
