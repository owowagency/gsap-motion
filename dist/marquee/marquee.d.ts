import { Motion } from "..";
declare const MARQUEE_DIRECTION: readonly ["ltr", "rtl", "scroll", "scroll-reverse"];
export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];
export interface MarqueeSettings {
    speed?: number;
    velocity?: number;
    direction?: MarqueeDirection;
    onUpdate?(progress: number): void;
    onCreated?(): void;
}
export declare class Marquee implements MarqueeSettings {
    static create(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings?: MarqueeSettings): Marquee;
    target?: gsap.DOMTarget;
    motion: Motion;
    speed: number;
    velocity: number;
    direction: MarqueeDirection;
    scrollTrigger: globalThis.ScrollTrigger;
    onUpdate?(progress: number): void;
    onCreated?(): void;
    constructor(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings?: MarqueeSettings);
}
export {};
