import { getValue } from "@/core/common";
import { printError } from "@/core/console";
import { createElement, getMotionTargets, replaceElement } from "@/core/dom";
import { ValueOrGetter } from "@/core/valueOrGetterType";
import { MotionParams, MotionTarget, ParallaxParams, createMotion, createParallax } from "@/index";
import { D, flow, O, F, pipe, A, R, G } from "@mobily/ts-belt";
import { gsap } from "gsap";

export type DioramaParams = {
  createDOM?: ValueOrGetter<boolean>;
  parallaxParams?: ValueOrGetter<ParallaxParams>;
  size?: ValueOrGetter<number>;
};

type DioramaConfig = {
  createDOM?: boolean;
  parallaxParams?: ParallaxParams;
  size?: number;
};

type DioramaDOM = {
  outer: Element;
  inner: Element;
  original: Element;
};

/**
 * Creates a diorama animation effect on the target elements. The diorama effect involves moving the inner contents of the target elements with a delayed, parallax movement, giving a sense of depth and motion.
 *
 * This function leverages the `createMotion` and `createParallax` functions to achieve this effect.
 *
 * @param target - The target elements to apply the diorama effect to. Can be a single MotionTarget or an array of MotionTargets.
 * @param dioramaParams - Optional parameters for the diorama effect, including whether to create a DOM, parallax parameters, and size.
 * @param motionParams - Optional parameters for the motion effect, including triggers and behavior settings.
 *
 * @returns A `destroy` function to manually stop and clean up the diorama effect.
 */
export function createDiorama(
  target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>,
  dioramaParams: ValueOrGetter<DioramaParams> = {},
  motionParams: ValueOrGetter<MotionParams> = {}
) {
  const config = pipe(
    dioramaParams,
    getValue,
    D.map(flow(O.fromNullable, getValue)),
    F.coerce<DioramaConfig>
  );

  const size = config.size ?? 1.5;

  const createInstances = flow(
    getMotionTargets,
    A.map(getDioramaDOM(config.createDOM ?? true, "owow-diorama-outer", "owow-diorama-inner")),
    A.map(
      R.map((dom) =>
        Object.freeze({
          dom,
          outerRect: dom.outer.getBoundingClientRect(),
          revert: () => {
            dom.outer.replaceWith(dom.original);
          },
        })
      )
    )
  );

  const motion = createMotion(() => {
    const instances = createInstances(target);

    const setup = gsap.context(() => {
      pipe(
        A.map(instances, R.toUndefined),
        A.filter(G.isNotNullable),
        A.forEach(({ dom, outerRect }) => {
          gsap.set(dom.outer, { height: outerRect.height, overflow: "hidden" });
          gsap.set(dom.inner, { height: outerRect.height * size });
        })
      );
    });

    const destroyParallax = pipe(
      A.map(
        instances,
        flow(
          R.map((instance) => {
            const updater = gsap.utils.interpolate(
              -(instance.outerRect.height * size - instance.outerRect.height),
              0
            );

            return createParallax(instance.dom.inner, {
              cssUnit: "px",
              updater,
            });
          }),
          R.toUndefined
        )
      ),
      A.filter(G.isNotNullable)
    );

    return () => {
      setup.kill(true);
      A.forEach(destroyParallax, (destroy) => destroy());
    };
  }, getValue(motionParams));

  return motion;
}

function getDioramaDOM(createDOM: boolean, outerClassName: string, innerClassName: string) {
  const createOuterContainer = flow(
    createElement("div"),
    F.tap((el) => el.classList.add(outerClassName))
  );

  return flow(
    F.ifElse(
      () => createDOM,
      (element: Element): R.Ok<DioramaDOM> => {
        const replace = replaceElement(element);
        const clone = F.coerce<typeof element>(element.cloneNode(true));
        const outerContainer = createOuterContainer();
        clone.classList.add(innerClassName);
        outerContainer.append(clone);
        replace(outerContainer);
        return R.Ok({
          inner: clone,
          outer: outerContainer,
          original: element,
        });
      },
      (element: Element): R.Result<DioramaDOM, Error> =>
        pipe(
          element,
          R.fromPredicate(
            validateDioramaDOMStructure(outerClassName, innerClassName),
            new Error("Invalid DOM structure for diorama")
          ),
          R.tapError(printError()),
          R.map(() => ({
            inner: element.firstElementChild!,
            outer: element,
            original: element,
          }))
        )
    )
  );
}

function validateDioramaDOMStructure(outerClassName: string, innerClassName: string) {
  return (element: Element) =>
    A.all(
      [
        element.children.length === 1,
        element.classList.contains(outerClassName),
        element.firstElementChild?.classList.contains(innerClassName),
      ],
      Boolean
    );
}
