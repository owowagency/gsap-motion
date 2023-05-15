# Class: Motion<Meta\>

[motion](../wiki/motion).Motion

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Table of contents

### Constructors

- [constructor](../wiki/motion.Motion#constructor)

### Properties

- [cleanup](../wiki/motion.Motion#cleanup)
- [create](../wiki/motion.Motion#create)
- [mediaQueryList](../wiki/motion.Motion#mediaquerylist)
- [meta](../wiki/motion.Motion#meta)
- [motionResizeObserver](../wiki/motion.Motion#motionresizeobserver)
- [reset](../wiki/motion.Motion#reset)
- [subscriptions](../wiki/motion.Motion#subscriptions)
- [referenceFramerate](../wiki/motion.Motion#referenceframerate)
- [resetDebounceTime](../wiki/motion.Motion#resetdebouncetime)

### Accessors

- [referenceFrameTime](../wiki/motion.Motion#referenceframetime)

### Methods

- [destroy](../wiki/motion.Motion#destroy)
- [observeMedia](../wiki/motion.Motion#observemedia)
- [observeResize](../wiki/motion.Motion#observeresize)
- [applyDeltaRatio](../wiki/motion.Motion#applydeltaratio)

## Constructors

### constructor

• **new Motion**<`Meta`\>(`create`, `params?`)

**`Example`**

```ts
// create a motion controller for a staggered text lines animation
const splitTextMotion = new Motion(
 () => {
   const splitText = new SplitText("my-text", { type: "lines" });
   const tween = gsap.fromTo(splitText.lines, { opacity: 0 }, { opacity: 1, stagger: 0.1 });

   // return a cleanup function
   return () => {
     tween.revert().kill();
     splitText.revert();
   }
 },
 {
   shouldResetOnResize: [document.body, "horizontal"]
 }
)
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `create` | [`MotionImplementation`](../wiki/motion#motionimplementation)<`Meta`\> |
| `params` | [`MotionParams`](../wiki/motion#motionparams) |

#### Defined in

[motion.ts:75](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L75)

## Properties

### cleanup

• `Private` `Optional` **cleanup**: [`MotionCleanup`](../wiki/motion#motioncleanup)

#### Defined in

[motion.ts:54](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L54)

___

### create

• `Private` `Optional` **create**: [`MotionImplementation`](../wiki/motion#motionimplementation)<`Record`<`string`, `any`\>\>

#### Defined in

[motion.ts:53](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L53)

___

### mediaQueryList

• `Private` `Optional` **mediaQueryList**: `MediaQueryList`

#### Defined in

[motion.ts:48](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L48)

___

### meta

• **meta**: `Meta` & `Record`<`string`, `any`\>

#### Defined in

[motion.ts:50](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L50)

___

### motionResizeObserver

• `Optional` **motionResizeObserver**: `MotionResizeObserver`

#### Defined in

[motion.ts:49](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L49)

___

### reset

• **reset**: `DebouncedFuncLeading`<() => `void`\>

Runs the cleanup function and resets this Motion instance.

#### Defined in

[motion.ts:111](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L111)

___

### subscriptions

• `Private` **subscriptions**: `Subscription`[] = `[]`

#### Defined in

[motion.ts:52](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L52)

___

### referenceFramerate

▪ `Static` `Readonly` **referenceFramerate**: ``60``

Target framerate

#### Defined in

[motion.ts:24](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L24)

___

### resetDebounceTime

▪ `Static` `Readonly` **resetDebounceTime**: ``100``

#### Defined in

[motion.ts:21](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L21)

## Accessors

### referenceFrameTime

• `Static` `get` **referenceFrameTime**(): `number`

Time between frames in milliseconds based on `Motion.referenceFrameRate`.

#### Returns

`number`

#### Defined in

[motion.ts:29](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L29)

## Methods

### destroy

▸ **destroy**(): `void`

Runs the cleanup function and makes this instance elegible for garbage collection.

#### Returns

`void`

#### Defined in

[motion.ts:125](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L125)

___

### observeMedia

▸ `Private` **observeMedia**(`queryString?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryString?` | `string` |

#### Returns

`void`

#### Defined in

[motion.ts:90](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L90)

___

### observeResize

▸ `Private` **observeResize**(`target?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target?` | [`MotionWatchResizeTarget`](../wiki/motion#motionwatchresizetarget) |

#### Returns

`void`

#### Defined in

[motion.ts:98](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L98)

___

### applyDeltaRatio

▸ `Static` **applyDeltaRatio**(`value`): `number`

Multiplies a given `value` by the current gsap ticker's delta ratio,
so the rate of change will always be consistent even if the frame rate fluctuates.

Implements `gsap.ticker.deltaRatio()`

**`Example`**

```ts
// move `myObject` by 3 points on every tick.
myObject.x += Motion.applyDeltaRatio(3)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value to multiply by delta ratio. |

#### Returns

`number`

#### Defined in

[motion.ts:44](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/motion.ts#L44)
