import { O, flow, G, B, F, pipe, A } from "@mobily/ts-belt";
import { coerceFn, getValue } from "./common";

export function getElement(queryOrElement?: string | Element | null): Element | undefined {
  return pipe(
    O.fromNullable(queryOrElement),
    O.mapNullable(
      flow(
        G.isString,
        B.ifElse(queryElement(F.coerce<string>(queryOrElement)), coerceFn<Element>(queryOrElement))
      )
    ),
    O.toUndefined
  );
}

export function queryElement(query: string) {
  return (root: Maybe<Element | Document> = document) => {
    console.log({ root });
    return root?.querySelector(query);
  };
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
) {
  return (): HTMLElementTagNameMap[K] => document.createElement(tagName, options);
}

export function appendToElement(element: Element) {
  return (...nodes: (string | Node)[]) => {
    element.append(...nodes);
    return element;
  };
}

export function replaceElement(element: Element) {
  return (...nodes: (string | Node)[]) => {
    element.replaceWith(...nodes);
  };
}

export function createDocumentFragment() {
  return () => document.createDocumentFragment();
}

export function getMotionTargets(
  target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>
) {
  return pipe(A.make(1, getValue(target)), A.flat, A.map(getElement), A.filter(G.isNotNullable));
}

export function getParentElement<E extends Element>(element: E) {
  return () => element.parentElement;
}