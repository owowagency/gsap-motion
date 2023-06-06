import { Observable } from "rxjs";
import { Motion } from "../motion/motion";
export declare class Pointer extends Motion<{
    observable?: Observable<MouseEvent>;
}> {
    private static _instance;
    /**
     * Utility for doing stuff with the mouse/pointer.
     *
     * _This class exposes a static singleton `instance`,
     * and does **not** have to be created using `new Pointer();`_
     *
     * @example
     * // Make a custom cursor that copies the current pointer position.
     * gsap.ticker.add(() => {
     *    gsap.set("#custom-cursor", {
     *      x: Pointer.instance.clientX,
     *      y: Pointer.instance.clientY
     *    })
     * })
     */
    private constructor();
    /**
     * Get the current singleton Pointer instance.
     */
    static get instance(): Pointer;
    /** Window inner width */
    viewWidth: number;
    /** Window inner height */
    viewHeight: number;
    /** Pointer absolute x position */
    clientX: number;
    /** Pointer absolute y position */
    clientY: number;
    /** Pointer normalized x position (0 to 1) */
    normalX: number;
    /** Pointer normalized y position (0 to 1)*/
    normalY: number;
    get observable(): Observable<MouseEvent> | undefined;
}
