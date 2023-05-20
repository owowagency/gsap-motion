import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Motion, MotionParams } from "..";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const MARQUEE_DIRECTION = ["ltr", "rtl", "scroll", "scroll-reverse"] as const;

export type MarqueeDirection = (typeof MARQUEE_DIRECTION)[number];

export interface MarqueeSettings {
  speed?: number;
  velocity?: number;
  direction?: MarqueeDirection;
  createDOMContainers?: boolean;
  onUpdate?(progress: number): void;
  onCreated?(): void;
}

type MarqueeMeta = Required<MarqueeSettings> & { scrollTrigger: ScrollTrigger; sourceDOM: Node };

export class Marquee extends Motion<MarqueeMeta & Record<string, unknown>> {
  static create(
    target: gsap.DOMTarget | (() => gsap.DOMTarget),
    settings: MarqueeSettings = {},
    motionParams: MotionParams = {}
  ) {
    return new Marquee(target, settings, motionParams);
  }

  get target(): HTMLElement {
    return this.meta.target as HTMLElement;
  }

  get speed(): number {
    return this.meta.speed;
  }

  set speed(n: number) {
    this.meta.speed = n;
  }

  get velocity(): number {
    return this.meta.velocity;
  }

  set velocity(n: number) {
    this.meta.velocity = n;
  }

  get direction(): MarqueeDirection {
    return this.meta.direction;
  }

  set direction(d: MarqueeDirection) {
    this.meta.direction = d;
  }

  constructor(
    target: gsap.DOMTarget | (() => gsap.DOMTarget),
    settings: MarqueeSettings = {},
    motionParams: MotionParams = {}
  ) {
    super(
      (motion) => {
        Object.assign(motion.meta, {
          speed: 1,
          velocity: 0,
          direction: "ltr",
          ...settings,
        });

        motion.meta.scrollTrigger = ScrollTrigger.create({});

        let targetContainer: HTMLElement | null = null;

        // get the outer container element
        if (typeof target === "string") targetContainer = document.querySelector(target);
        else if (target instanceof HTMLElement) targetContainer = target;

        const doCreateDOMContainers =
          settings.createDOMContainers != undefined ? settings.createDOMContainers : true;

        const outerContainer = doCreateDOMContainers
          ? document.createElement("div")
          : targetContainer?.querySelector<HTMLElement>(".owow-marquee-outer");
        outerContainer?.classList.add("owow-marquee-outer");

        const innerContainer = doCreateDOMContainers
          ? document.createElement("div")
          : outerContainer?.querySelector<HTMLElement>(".owow-marquee-inner");
        innerContainer?.classList.add("owow-marquee-inner");

        if (!targetContainer || !outerContainer || !innerContainer) {
          console.error({
            targetContainer,
            outerContainer,
            innerContainer,
          });
          throw new Error("Invalid marquee DOM structure");
        }

        motion.meta.sourceDOM = targetContainer.cloneNode(true);
        motion.meta.target = targetContainer;
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

        const wrap = gsap.utils.wrap(0, -innerRect.width);
        const normalize = gsap.utils.normalize(0, -innerRect.width);
        let direction: number,
          velocity: number,
          velocityDelta: number,
          xCurrent: number,
          xDelta: number,
          xIncrement: number,
          xNext: number;

        const update = gsap.ticker.add(() => {
          velocity =
            motion.meta.velocity != undefined ? motion.meta.scrollTrigger.getVelocity() ?? 0 : 0;

          velocityDelta = velocity * motion.meta.velocity;

          switch (motion.meta.direction) {
            case "ltr":
              direction = -1;
              velocityDelta = -Math.abs(velocityDelta);
              break;
            case "rtl":
              direction = 1;
              velocityDelta = Math.abs(velocityDelta);
              break;
            case "scroll":
              direction = motion.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              direction = -(motion.meta.scrollTrigger.direction ?? 1);
              velocityDelta = -velocityDelta;
          }

          xCurrent = gsap.getProperty(outerContainer, "x") as number;
          xDelta = motion.meta.speed * -direction;
          xIncrement = (xDelta - velocityDelta) * gsap.ticker.deltaRatio();
          xNext = wrap(xCurrent + xIncrement);
          setX(xNext);
          motion.meta.onUpdate?.(normalize(xNext));
        });

        motion.meta.onCreated?.();

        return () => {
          context.kill(true);
          gsap.ticker.remove(update);
          targetContainer?.replaceWith(motion.meta.sourceDOM);
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