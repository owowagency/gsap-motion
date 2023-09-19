import type { Observable } from 'rxjs';
import { Motion } from '../motion/motion';
/**
 * @deprecated This class is deprecated in favour of `getPointer`.
 * The Pointer class is a utility for interacting with the mouse/pointer.
 * It extends the Motion class and provides an observable for mouse events.
 *
 * This class is implemented as a singleton, meaning only one instance of it exists.
 * Therefore, it does not need to be instantiated using `new Pointer();`. Instead, use `Pointer.instance`.
 *
 * @example
 * // Create a custom cursor that mirrors the current pointer position.
 * gsap.ticker.add(() => {
 *    gsap.set("#custom-cursor", {
 *      x: Pointer.instance.clientX,
 *      y: Pointer.instance.clientY
 *    })
 * })
 */
export declare class Pointer extends Motion<{
    observable?: Observable<MouseEvent>;
}> {
    private static _instance;
    private constructor();
    /**
     * Returns the singleton instance of the Pointer class.
     * If the instance does not exist, it is created.
     */
    static get instance(): Pointer;
    /** The width of the window's inner viewport */
    viewWidth: number;
    /** The height of the window's inner viewport */
    viewHeight: number;
    /** The pointer's absolute x-coordinate within the viewport */
    clientX: number;
    /** The pointer's absolute y-coordinate within the viewport */
    clientY: number;
    /** The pointer's x-coordinate normalized to a range of 0 to 1 */
    normalX: number;
    /** The pointer's y-coordinate normalized to a range of 0 to 1 */
    normalY: number;
    /**
     * Returns the observable for mouse events.
     */
    get observable(): Observable<MouseEvent> | undefined;
}
