import type { ValueOrGetter } from './valueOrGetterType';
import type { MotionTarget } from '../utilities/motion/motion';
export declare function getElement(queryOrElement?: string | Element | null): Element | undefined;
export declare function getAllElements(query: string): (root?: Document | Element) => Element[];
export declare function queryElement(query: string): (root?: Element | Document) => Element | null;
export declare function queryAllElements(query: string): (root?: Element | Document) => Element[];
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): () => HTMLElementTagNameMap[K];
export declare function appendToElement(element: Element): (...nodes: (string | Node)[]) => Element;
export declare function replaceElement(element: Element): (...nodes: (string | Node)[]) => void;
export declare function createDocumentFragment(): () => DocumentFragment;
export declare function getMotionTargets(target: ValueOrGetter<MotionTarget | ReadonlyArray<MotionTarget>>): readonly Element[];
export declare function getParentElement<E extends Element>(element: E): () => HTMLElement | null;
export declare function getNumberFromAttribute(element: Element, attribute: string): number | undefined;
