import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Motion } from "..";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const MARQUEE_DIRECTION = ["ltr", "rtl", "scroll", "scroll-reverse"] as const;

export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];

export interface MarqueeSettings {
  speed?: number;
  velocity?: number;
  direction?: MarqueeDirection;
  onUpdate?(progress: number): void;
  onCreated?(): void;
}

export class Marquee implements MarqueeSettings {
  static create(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings: MarqueeSettings = {}) {
    return new Marquee(target, settings);
  }

  target?: gsap.DOMTarget;
  motion: Motion;
  speed: number;
  velocity: number;
  direction: MarqueeDirection;
  scrollTrigger = ScrollTrigger.create({});
  onUpdate?(progress: number): void;
  onCreated?(): void;

  constructor(target: gsap.DOMTarget | (() => gsap.DOMTarget), settings: MarqueeSettings = {}) {
    this.speed = settings.speed ?? 1;
    this.velocity = settings.velocity ?? 0;
    this.direction = settings.direction || "rtl";
    this.onUpdate = settings.onUpdate;
    this.onCreated = settings.onCreated;
    this.target = target instanceof Function ? target() : target;

    this.motion = new Motion(() => {
      let targetContainer: HTMLElement | null = null;

      // get the outer container element
      if (typeof target === "string") targetContainer = document.querySelector(target);
      else if (target instanceof HTMLElement) targetContainer = target;

      const outerContainer = targetContainer?.querySelector<HTMLElement>(".owow-marquee-outer");
      const innerContainer = outerContainer?.querySelector<HTMLElement>(".owow-marquee-inner");

      if (!targetContainer || !outerContainer || !innerContainer) {
        console.error("Invalid marquee DOM structure", {
          targetContainer,
          outerContainer,
          innerContainer,
        });
        return;
      }

      gsap.set(innerContainer, { display: "inline-flex" });

      const targetRect = targetContainer.getBoundingClientRect();
      const innerRect = innerContainer.getBoundingClientRect();
      const boundingWidth = targetRect.width + innerRect.width;
      const clones = document.createDocumentFragment();
      const clonesArray: HTMLElement[] = [];
      let contentWidthAcc = innerRect.width;

      while (contentWidthAcc <= boundingWidth) {
        const clone = innerContainer.cloneNode(true);
        contentWidthAcc += innerRect.width;
        clonesArray.push(clone as HTMLElement);
      }

      clones.append(...clonesArray);
      outerContainer.append(clones);

      const context = gsap.context(() => {
        gsap.set(outerContainer, {
          x: 0,
          force3D: true,
          width: contentWidthAcc,
          display: "flex",
          flexWrap: "nowrap",
        });
      });

      const setX = gsap.utils.pipe(
        (n: number) => Math.floor(n * 1000) / 1000,
        gsap.quickSetter(outerContainer, "x", "px") as (n: number) => number
      );

      const update = gsap.ticker.add((_, deltaTime) => {
        let direction = 1;

        switch (this.direction) {
          case "ltr":
            direction = -1;
            break;
          case "rtl":
            direction = 1;
            break;
          case "scroll":
            direction = this.scrollTrigger.direction ?? 1;
            break;
          case "scroll-reverse":
            direction = -this.scrollTrigger.direction ?? -1;
        }

        const velocity = this.scrollTrigger.getVelocity() ?? 0;
        const velocityDelta = velocity * this.velocity * deltaTime;
        const xCurrent = gsap.getProperty(outerContainer, "x") as number;
        const xDelta = this.speed * gsap.ticker.deltaRatio() * -direction;
        const xIncrement = xDelta - velocityDelta;
        const xNext = gsap.utils.wrap(0, -innerRect.width, xCurrent + xIncrement);
        const progress = gsap.utils.normalize(0, -innerRect.width, xNext);
        setX(xNext);
        this.onUpdate?.(progress);
      });

      this.onCreated?.();

      return () => {
        context.kill(true);
        gsap.ticker.remove(update);
        while (clonesArray.length) clonesArray.pop()?.remove();
      };
    });
  }
}
