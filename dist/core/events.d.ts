export declare function createMemoizedWindowResizeObservable(): () => import("rxjs").Observable<UIEvent>;
export declare function createMemoizedMousemoveObservable(): () => import("rxjs").Observable<MouseEvent>;
export declare function createMemoizedElementsResizeObservable(): (targets: readonly Element[]) => import("rxjs").Observable<unknown>;
export declare function createMediaQueryListObservable(mediaQueryList: MediaQueryList): import("rxjs").Observable<unknown>;
