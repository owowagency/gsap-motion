import { F, A, B, flow, pipe } from "@mobily/ts-belt";
import { fromEventPattern, fromEvent } from "rxjs";
import { getGlobalContext } from "./common";
import { createContainer } from "./data";
import { gsap } from "gsap";
import { tapDebugLog } from "./console";

interface UIEventHandler {
  (event: UIEvent): void;
}

export function createMemoizedWindowResizeObservable() {
  const getWindow = getGlobalContext();
  const shouldEmit = createContainer(true);
  const tickDebounce = gsap.ticker.add(() => void shouldEmit.setValue(true));

  const createHandler = F.once((handler: UIEventHandler) => (event: UIEvent) => {
    return pipe(
      shouldEmit.getValue(),
      tapDebugLog,
      F.when(Boolean, () => {
        shouldEmit.setValue(false);
        handler(event);
      })
    );
  });

  return F.once(() =>
    fromEventPattern(
      (handler: UIEventHandler) => {
        getWindow().addEventListener("resize", createHandler(handler), { passive: true });
      },
      (handler: UIEventHandler) => {
        gsap.ticker.remove(tickDebounce);
        getWindow().removeEventListener("resize", createHandler(handler));
      }
    )
  );
}

export function createMemoizedMousemoveObservable() {
  return F.once(() => fromEvent<MouseEvent>(globalThis, "mousemove", { passive: true }));
}

export function createMemoizedElementsResizeObservable() {
  return F.once((targets: readonly Element[]) => {
    const handlers = new Set<() => unknown>();
    const observer = new ResizeObserver(() => handlers.forEach((handler) => handler()));

    const observable$ = fromEventPattern(
      (handler) => {
        A.forEach(targets, observer.observe.bind(observer));
        handlers.add(handler);
        return observer;
      },
      (handler) => {
        A.forEach(targets, observer.unobserve.bind(observer));
        handlers.delete(handler);
      }
    );

    return observable$;
  });
}
