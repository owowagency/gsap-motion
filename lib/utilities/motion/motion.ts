import { A, B, D, F, G, O, R, flow, pipe } from '@mobily/ts-belt';
import type { Observable } from 'rxjs';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import {
    createMemoizedElementsResizeObservable,
    createMemoizedWindowResizeObservable,
} from '@/core/events';
import { getValue } from '@/core/common';
import { debugLog, printError, tapDebugLog } from '@/core/console';
import { createContainer, getUndefined } from '@/core/data';
import { getElement } from '@/core/dom';
import type { ValueOrGetter } from '@/core/valueOrGetterType';

export type MotionTarget = string | Element | null;

export type MotionParams = {
    observeElementResize?: ValueOrGetter<MotionTarget | readonly MotionTarget[]>;
    observeWindowResize?: ValueOrGetter<boolean>;
    debounceTime?: ValueOrGetter<number>;
    enable?: ValueOrGetter<boolean>;
};

export type MotionConfig = {
    observeElementResize?: MotionTarget | ReadonlyArray<MotionTarget>;
    observeWindowResize?: boolean;
    debounceTime?: number;
    enable?: boolean;
};

export interface MotionCleanup {
    (destroyed: boolean): void;
}

export interface MotionEffect {
    (): Maybe<MotionCleanup> | void;
}

export interface MotionDestroy {
    (): void;
}

/**
 * Creates a motion effect with a managed lifecycle. This function initializes, runs, and cleans up the motion effect based on the provided parameters.
 * It can respond to various triggers such as window resize, element resize, and media query changes.
 *
 * The motion effect can be enabled or disabled, and can be set to revert to its initial state upon destruction.
 *
 * @param effect - The motion effect to be created and managed.
 * @param params - The parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the motion effect.
 */
export function createMotion(
    effect: MotionEffect,
    params: ValueOrGetter<MotionParams> = {},
): MotionDestroy {
    const config = pipe(params, getValue, D.map(flow(O.fromNullable, getValue))) as MotionConfig;
    const getElementResizeObservable = createMemoizedElementsResizeObservable();
    const cleanupFn = createContainer<MotionCleanup>(F.ignore);
    const effectCycle = new BehaviorSubject(effect);

    effectCycle.subscribe(() => {
        cleanupFn.getValue()(false);
        cleanupFn.setValue(effect() ?? F.ignore);
    });

    const subscribeWithEffect =
        (options?: { skip?: number; debounce?: number; name?: string }) =>
        <T>(observable: Observable<T>) => {
            return pipe(
                observable
                    .pipe(skip(options?.skip ?? 0), debounceTime(options?.debounce ?? 300))
                    .subscribe(
                        flow(tapDebugLog(`run effect from subscription: ${options?.name}`), () =>
                            effectCycle.next(effect),
                        ),
                    ),
                tapDebugLog('subscribe with effect'),
            );
        };

    const resizeElements = pipe(
        A.make(1, config.observeElementResize),
        A.flat,
        A.map(getElement),
        A.filter(G.isNotNullable),
        A.tap(
            observeBodyResizeWarning('Observing the <body> for resizes may cause chain reactions.'),
        ),
    );

    const elementResizeSubscription = pipe(
        resizeElements,
        R.fromPredicate(A.isNotEmpty, 'No elements to observe.'),
        R.map(getElementResizeObservable),
        R.map(
            flow(
                subscribeWithEffect({
                    debounce: config.debounceTime,
                    skip: 1,
                    name: 'element resize',
                }),
                tapDebugLog('subscribe to element resizes'),
            ),
        ),
        R.tapError(debugLog),
    );

    const windowResizeSubscription = pipe(
        config.observeWindowResize,
        R.fromPredicate(Boolean, 'Window resize observing disabled.'),
        R.map(getWindowResizeObservable),
        R.map(
            flow(
                subscribeWithEffect({ debounce: config.debounceTime, name: 'window resize' }),
                tapDebugLog('subscribe to window resize events'),
            ),
        ),
        R.tapError(debugLog),
    );

    function destroy() {
        R.tap(elementResizeSubscription, (sub) => sub.unsubscribe());
        R.tap(windowResizeSubscription, (sub) => sub.unsubscribe());
        cleanupFn.getValue()(true);
    }

    return destroy;
}

const getWindowResizeObservable = createMemoizedWindowResizeObservable();

function observeBodyResizeWarning(message: string) {
    return (element: Element) =>
        pipe(
            B.ifElse(element.tagName === 'BODY', () => `Warning: ${message}`, getUndefined),
            O.fromNullable,
            O.tap(printError()),
        );
}

export { Motion } from './motion.legacy';
