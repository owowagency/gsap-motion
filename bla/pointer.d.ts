import { Motion } from "./motion";
export declare class Pointer {
    private static _instance;
    private constructor();
    /**
     * Utility for doing stuff with the mouse/pointer.
     * Get the current singleton Pointer instance, of which only one can be active at any time.
     * @example
     * // Make a custom cursor that copies the current pointer position
     * gsap.ticker.add(() => {
     *    gsap.set("#custom-cursor", {
     *      x: Pointer.instance.clientX,
     *      y: Pointer.instance.clientY
     *    })
     * })
     */
    static get instance(): Pointer;
    private subscriptions;
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
    readonly observable: import("rxjs").Observable<MouseEvent>;
    /**
     * Internal motion instance
     */
    readonly motion: Motion<{
        label: string;
    }>;
    /**
     * Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
     * Note that referencing `Pointer.instance` will create a new instance.
     */
    destroy: () => void;
}
