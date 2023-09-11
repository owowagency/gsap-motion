import { getValue } from "@/core/common";
import { getMotionTargets } from "@/core/dom";
import { MotionParams, createMotion } from "@/index";
import { A, D, F, O, flow, pipe } from "@mobily/ts-belt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ParallaxParams = {
  scrollTriggerVars?: ValueOrGetter<ScrollTrigger.Vars>;
  speed?: ValueOrGetter<number>;
  cssUnit?: ValueOrGetter<string>;
  updater?: (progress: number, speed: number) => number;
};

type ParallaxConfig = {
  scrollTriggerVars?: ScrollTrigger.Vars;
  speed?: number;
  cssUnit?: string;
};

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a parallax scrolling effect on the target elements. The parallax effect involves moving the background content at a slower rate than the foreground content, creating an illusion of depth.
 *
 * This function leverages the `createMotion` function to achieve this effect.
 *
 * @param target - The target elements to apply the parallax effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param parallaxParams - Optional parameters for the parallax effect, including scroll trigger variables, speed, CSS unit for the parallax movement, and a custom updater function.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the parallax effect.
 */
export function createParallax(
  target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>,
  parallaxParams: ValueOrGetter<ParallaxParams> = {},
  motionParams: MotionParams = {}
) {
  const custom = pipe(parallaxParams, getValue, D.selectKeys(["updater"]));

  const config = pipe(
    parallaxParams,
    getValue,
    D.deleteKeys(["updater"]),
    D.map(flow(O.fromNullable, getValue)),
    F.coerce<ParallaxConfig>
  );

  const createScrollTriggers = flow(
    getMotionTargets,
    A.map((trigger) =>
      ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        ...config.scrollTriggerVars,
      })
    )
  );

  const getScrollTriggerProgress = (scrollTrigger: ScrollTrigger) => () => scrollTrigger.progress;
  const getParallaxPosition =
    (speed = 1) =>
    (progress: number) =>
      custom.updater?.(progress, speed) ?? -progress * 100 * speed;

  const createPositionUpdater = (scrollTrigger: ScrollTrigger, setter: (n: number) => string) =>
    flow(
      getScrollTriggerProgress(scrollTrigger),
      getParallaxPosition(config.speed),
      setter,
      F.ignore
    );

  const createInstances = flow(
    createScrollTriggers,
    A.map((scrollTrigger) => {
      const quickSetY = F.coerce<(n: number) => string>(
        gsap.quickSetter(scrollTrigger.trigger!, "y", config.cssUnit ?? "%")
      );

      const quickSetX = F.coerce<(n: number) => string>(
        gsap.quickSetter(scrollTrigger.trigger!, "x", config.cssUnit ?? "%")
      );

      return {
        scrollTrigger,
        updateY: createPositionUpdater(scrollTrigger, quickSetY),
        updateX: createPositionUpdater(scrollTrigger, quickSetX),
        destroy: () => scrollTrigger.kill(),
      };
    })
  );

  const motion = createMotion(() => {
    const instances = createInstances(target);

    const tickHandler = gsap.ticker.add(() => {
      A.forEach(instances, ({ updateY }) => {
        updateY();
      });
    });

    return () => {
      gsap.ticker.remove(tickHandler);
      A.forEach(instances, (instance) => instance.destroy());
    };
  }, getValue(motionParams));

  return motion;
}
