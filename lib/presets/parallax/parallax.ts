import { getValue } from "@/core/common";
import { getMotionTargets } from "@/core/dom";
import { MotionParams, createMotion } from "@/index";
import { A, D, F, O, flow, pipe } from "@mobily/ts-belt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ParallaxParams = {
  scrollTriggerVars?: ValueOrGetter<ScrollTrigger.Vars>;
  speed?: ValueOrGetter<number>;
};

type ParallaxConfig = {
  scrollTriggerVars?: ScrollTrigger.Vars;
  speed?: number;
};

gsap.registerPlugin(ScrollTrigger);

export function createParallax(
  target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>,
  parallaxParams: ValueOrGetter<ParallaxParams> = {},
  motionParams: MotionParams = {}
) {
  const config = pipe(
    parallaxParams,
    getValue,
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
  const getParallaxPosition = (progress: number) => -progress * 100 * (config.speed ?? 1);

  const createPositionUpdater = (scrollTrigger: ScrollTrigger, setter: (n: number) => string) =>
    flow(getScrollTriggerProgress(scrollTrigger), getParallaxPosition, setter, F.ignore);

  const createInstances = flow(
    createScrollTriggers,
    A.map((scrollTrigger) => {
      const quickSetY = F.coerce<(n: number) => string>(
        gsap.quickSetter(scrollTrigger.trigger!, "y", "%")
      );

      const quickSetX = F.coerce<(n: number) => string>(
        gsap.quickSetter(scrollTrigger.trigger!, "x", "%")
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
