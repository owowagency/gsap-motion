import type { ValueOrGetter } from '../../core/valueOrGetterType';
import type { Maybe } from '../../type-utils';
export type MotionTarget = string | Element | null;
export type MotionParams = {
    debounceTime?: ValueOrGetter<number>;
    enable?: ValueOrGetter<boolean>;
    mediaQueryList?: ValueOrGetter<MediaQueryList>;
    observeElementResize?: ValueOrGetter<MotionTarget | readonly MotionTarget[]>;
    observeWindowResize?: ValueOrGetter<boolean>;
};
export type MotionConfig = {
    debounceTime?: number;
    enable?: boolean;
    mediaQueryList?: MediaQueryList;
    observeElementResize?: MotionTarget | ReadonlyArray<MotionTarget>;
    observeWindowResize?: boolean;
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
export declare function createMotion(effect: MotionEffect, params?: ValueOrGetter<MotionParams>): MotionDestroy;
export { Motion } from './motion.legacy';
