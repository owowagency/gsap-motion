import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Motion, MotionParams } from "..";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const MARQUEE_DIRECTION = ["ltr", "rtl", "scroll", "scroll-reverse"] as const;

export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];

export interface MarqueeSettings {
  speed?: number;
  velocity?: number | ((velocity: number) => number);
  direction?: MarqueeDirection;
  createDOMContainers?: boolean;
  onUpdate?(progress: number): void;
  onCreated?(): void;
}

export class Marquee implements MarqueeSettings {
  static create(
    target: gsap.DOMTarget | (() => gsap.DOMTarget),
    settings: MarqueeSettings = {},
    motionParams: MotionParams = {}
  ) {
    return new Marquee(target, settings, motionParams);
  }

  target?: gsap.DOMTarget;
  motion: Motion;
  speed: number;
  velocity: number | ((velocity: number) => number);
  direction: MarqueeDirection;
  scrollTrigger = ScrollTrigger.create({});
  onUpdate?(progress: number): void;
  onCreated?(): void;

  constructor(
    target: gsap.DOMTarget | (() => gsap.DOMTarget),
    settings: MarqueeSettings = {},
    motionParams: MotionParams = {}
  ) {
    this.speed = settings.speed ?? 1;
    this.velocity = settings.velocity ?? 0;
    this.direction = settings.direction || "rtl";
    this.onUpdate = settings.onUpdate;
    this.onCreated = settings.onCreated;
    this.target = target instanceof Function ? target() : target;

    const doCreateDOMContainers =
      settings.createDOMContainers != undefined ? settings.createDOMContainers : true;

    this.motion = new Motion(
      () => {
        let targetContainer: HTMLElement | null = null;

        // get the outer container element
        if (typeof target === "string") targetContainer = document.querySelector(target);
        else if (target instanceof HTMLElement) targetContainer = target;

        const outerContainer = doCreateDOMContainers
          ? document.createElement("div")
          : targetContainer?.querySelector<HTMLElement>(".owow-marquee-outer");
        outerContainer?.classList.add("owow-marquee-outer");

        const innerContainer = doCreateDOMContainers
          ? document.createElement("div")
          : outerContainer?.querySelector<HTMLElement>(".owow-marquee-inner");
        innerContainer?.classList.add("owow-marquee-inner");

        if (!targetContainer || !outerContainer || !innerContainer) {
          console.error("Invalid marquee DOM structure", {
            targetContainer,
            outerContainer,
            innerContainer,
          });
          return;
        }

        innerContainer.append(...targetContainer.childNodes);
        outerContainer.append(innerContainer);
        targetContainer?.append(outerContainer);

        gsap.set(innerContainer, { display: "inline-flex" });

        const targetRect = targetContainer.getBoundingClientRect();
        const innerRect = innerContainer.getBoundingClientRect();
        const boundingWidth = targetRect.width + innerRect.width;
        const clones = document.createDocumentFragment();
        const clonesArray: HTMLElement[] = [];
        let contentWidthAcc = innerRect.width;

        if (!boundingWidth || !contentWidthAcc) return;

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

        const update = gsap.ticker.add(() => {
          const velocity = this.velocity != undefined ? this.scrollTrigger.getVelocity() ?? 0 : 0;

          let direction = 1;
          let velocityDelta =
            typeof this.velocity === "number" ? velocity * this.velocity : this.velocity(velocity);

          switch (this.direction) {
            case "ltr":
              direction = -1;
              velocityDelta = -Math.abs(velocityDelta);
              break;
            case "rtl":
              direction = 1;
              velocityDelta = Math.abs(velocityDelta);
              break;
            case "scroll":
              direction = this.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              direction = -(this.scrollTrigger.direction ?? 1);
              velocityDelta = -velocityDelta;
          }

          const xCurrent = gsap.getProperty(outerContainer, "x") as number;
          const xDelta = this.speed * -direction;
          const xIncrement = (xDelta - velocityDelta) * gsap.ticker.deltaRatio();
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
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...motionParams,
      }
    );
  }
}
