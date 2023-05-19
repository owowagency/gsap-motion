import { Motion, MotionParams } from "..";
declare const MARQUEE_DIRECTION: readonly ["ltr", "rtl", "scroll", "scroll-reverse"];
export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];
export interface MarqueeSettings {
    speed?: number;
    velocity?: number | ((velocity: number) => number);
    direction?: MarqueeDirection;
    createDOMContainers?: boolean;
    onUpdate?(progress: number): void;
    onCreated?(): void;
}
export declare class Marquee implements MarqueeSettings {
    static create(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings?: MarqueeSettings, motionParams?: MotionParams): Marquee;
    target?: gsap.DOMTarget;
    motion: Motion;
    speed: number;
    velocity: number | ((velocity: number) => number);
    direction: MarqueeDirection;
    scrollTrigger: globalThis.ScrollTrigger;
    onUpdate?(progress: number): void;
    onCreated?(): void;
    constructor(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings?: MarqueeSettings, motionParams?: MotionParams);
}
export {};
