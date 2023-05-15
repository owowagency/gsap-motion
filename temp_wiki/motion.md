# Module: motion

## Table of contents

### Classes

- [Motion](../wiki/motion.Motion)

### Type Aliases

- [MotionCleanup](../wiki/motion#motioncleanup)
- [MotionImplementation](../wiki/motion#motionimplementation)
- [MotionParams](../wiki/motion#motionparams)
- [MotionWatchResizeAxis](../wiki/motion#motionwatchresizeaxis)
- [MotionWatchResizeTarget](../wiki/motion#motionwatchresizetarget)
- [MotionWatchResizeTargetWithAxis](../wiki/motion#motionwatchresizetargetwithaxis)

## Type Aliases

### MotionCleanup

Ƭ **MotionCleanup**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[motion.ts:15](https://github.com/owowagency/gsap-motion/blob/b906818/lib/motion.ts#L15)

___

### MotionImplementation

Ƭ **MotionImplementation**<`T`\>: (`self`: [`Motion`](../wiki/motion.Motion)<`T`\>) => [`MotionCleanup`](../wiki/motion#motioncleanup) \| `void` \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Type declaration

▸ (`self`): [`MotionCleanup`](../wiki/motion#motioncleanup) \| `void` \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Motion`](../wiki/motion.Motion)<`T`\> |

##### Returns

[`MotionCleanup`](../wiki/motion#motioncleanup) \| `void` \| `undefined`

#### Defined in

[motion.ts:16](https://github.com/owowagency/gsap-motion/blob/b906818/lib/motion.ts#L16)

___

### MotionParams

Ƭ **MotionParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enable?` | () => `boolean` |
| `shouldResetOnResize?` | [`MotionWatchResizeTarget`](../wiki/motion#motionwatchresizetarget) |
| `watchMedia?` | `string` |

#### Defined in

[motion.ts:6](https://github.com/owowagency/gsap-motion/blob/b906818/lib/motion.ts#L6)

___

### MotionWatchResizeAxis

Ƭ **MotionWatchResizeAxis**: ``"vertical"`` \| ``"horizontal"``

#### Defined in

[motion.ts:12](https://github.com/owowagency/gsap-motion/blob/b906818/lib/motion.ts#L12)

___

### MotionWatchResizeTarget

Ƭ **MotionWatchResizeTarget**: `HTMLElement` \| `string` \| [`MotionWatchResizeTargetWithAxis`](../wiki/motion#motionwatchresizetargetwithaxis)

#### Defined in

[motion.ts:14](https://github.com/owowagency/gsap-motion/blob/b906818/lib/motion.ts#L14)

___

### MotionWatchResizeTargetWithAxis

Ƭ **MotionWatchResizeTargetWithAxis**: [`HTMLElement` \| `string`, [`MotionWatchResizeAxis`](../wiki/motion#motionwatchresizeaxis)]

#### Defined in

[motion.ts:13](https://github.com/owowagency/gsap-motion/blob/b906818/lib/motion.ts#L13)
