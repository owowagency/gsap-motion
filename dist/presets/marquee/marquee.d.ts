import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Motion, MotionParams } from "../..";
declare const MARQUEE_DIRECTION: readonly ["ltr", "rtl", "scroll", "scroll-reverse"];
export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];
export interface MarqueeSettings {
    speed?: number;
    velocity?: number;
    direction?: MarqueeDirection;
    createDOMContainers?: boolean;
    scrollTrigger?: ScrollTrigger.Vars;
    onUpdate?(progress: number): void;
    onCreated?(): void;
}
type MarqueeMeta = Required<MarqueeSettings> & {
    scrollTrigger: ScrollTrigger;
    sourceDOM: Node;
};
export declare class Marquee extends Motion<MarqueeMeta & Record<string, unknown>> {
    static create(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings?: MarqueeSettings, motionParams?: MotionParams): Marquee;
    get target(): HTMLElement;
    get speed(): number;
    set speed(n: number);
    get velocity(): number;
    set velocity(n: number);
    get direction(): MarqueeDirection;
    set direction(d: MarqueeDirection);
    constructor(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings?: MarqueeSettings, motionParams?: MotionParams);
}
export {};
