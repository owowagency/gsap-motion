import { D, F, O, flow, pipe } from '@mobily/ts-belt';
import { map } from 'rxjs';
import {
    createMemoizedMousemoveObservable,
    createMemoizedWindowResizeObservable,
} from '@/core/events';
import { getDocumentElement, getGlobalContext, getScreen } from '@/core/common';
import { createCachedMap, readFromMap, writeToMap } from '@/core/data';
import type { NormalizedVec2, Vec2 } from '@/core/vectors';
import { createNormalizedVec2, createVec2 } from '@/core/vectors';

export { Pointer } from './pointer.legacy';

/**
 * Provides a utility for interacting with various types mouse positions; client (window), page and screen.
 * Every type of mouse position also provides a normalized position between 0 and 1.
 */
export const getMousePosition = F.once(() => {
    const readFromMouseCache = pipe(getMouseCache(), readFromMap);
    const writeToMouseCache = pipe(getMouseCache(), writeToMap);
    const readFromDimensionsCache = pipe(getDimensionsCache(), readFromMap);
    const writeToDimensionsCache = pipe(getDimensionsCache(), writeToMap);
    const dimensions$ = getWindowResizeObservable().pipe(map(createDimensions));
    const mouse$ = getMousemoveObservable().pipe(map(createMousePositionsFromEvent));

    mouse$.subscribe(
        flow(
            D.mapWithKey((key, value) =>
                pipe(
                    readFromDimensionsCache(key),
                    O.fromNullable,
                    O.map((dim) => createNormalizedVec2(value, dim)),
                    O.tap((nVec2) => writeToMouseCache(key, nVec2)),
                ),
            ),
        ),
    );

    dimensions$.subscribe(flow(D.mapWithKey(writeToDimensionsCache)));

    return {
        get client() {
            return F.coerce<NormalizedVec2>(readFromMouseCache('client'));
        },
        get page() {
            return F.coerce<NormalizedVec2>(readFromMouseCache('page'));
        },
        get screen() {
            return F.coerce<NormalizedVec2>(readFromMouseCache('screen'));
        },
    };
});

/**
 * @deprecated Deprecated; renamed to `getMousePosition`
 */
export const mousePosition = getMousePosition;

const getWindowResizeObservable = createMemoizedWindowResizeObservable();
const getMousemoveObservable = createMemoizedMousemoveObservable();

const getMouseCache = createCachedMap<string, NormalizedVec2>(
    flow(createDimensions, (dims) => [
        ['client', createNormalizedVec2(createVec2(0, 0), dims.client)],
        ['page', createNormalizedVec2(createVec2(0, 0), dims.page)],
        ['screen', createNormalizedVec2(createVec2(0, 0), dims.screen)],
    ]),
);

const getDimensionsCache = createCachedMap<string, Vec2>(flow(createDimensions, D.toPairs));

function createMousePositionsFromEvent(
    event: MouseEvent,
): Record<'client' | 'page' | 'screen', Vec2> {
    return {
        client: createVec2(event.clientX, event.clientY),
        page: createVec2(event.pageX, event.pageY),
        screen: createVec2(event.screenX, event.screenY),
    };
}

function createDimensions(): Record<'client' | 'page' | 'screen', Vec2> {
    const doc = getDocumentElement();
    const win = getGlobalContext();
    const screen = getScreen();

    return {
        client: createVec2(win().innerWidth, win().innerHeight),
        page: createVec2(doc().scrollWidth, doc().scrollHeight),
        screen: createVec2(screen().width, screen().height),
    };
}
