[owow-gsap-collection](README.md) / Exports

# owow-gsap-collection

## Table of contents

### Classes

- [Motion](classes/Motion.md)

### Type Aliases

- [MotionCleanup](modules.md#motioncleanup)
- [MotionImplementation](modules.md#motionimplementation)
- [MotionParams](modules.md#motionparams)
- [MotionWatchResizeAxis](modules.md#motionwatchresizeaxis)
- [MotionWatchResizeTarget](modules.md#motionwatchresizetarget)
- [MotionWatchResizeTargetWithAxis](modules.md#motionwatchresizetargetwithaxis)

## Type Aliases

### MotionCleanup

Ƭ **MotionCleanup**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[Motion.ts:21](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L21)

___

### MotionImplementation

Ƭ **MotionImplementation**: (`self`: [`Motion`](classes/Motion.md)) => [`MotionCleanup`](modules.md#motioncleanup) \| `void` \| `undefined`

#### Type declaration

▸ (`self`): [`MotionCleanup`](modules.md#motioncleanup) \| `void` \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Motion`](classes/Motion.md) |

##### Returns

[`MotionCleanup`](modules.md#motioncleanup) \| `void` \| `undefined`

#### Defined in

[Motion.ts:22](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L22)

___

### MotionParams

Ƭ **MotionParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enable?` | () => `boolean` |
| `shouldResetOnResize?` | [`MotionWatchResizeTarget`](modules.md#motionwatchresizetarget) |
| `watchMedia?` | `string` |

#### Defined in

[Motion.ts:6](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L6)

___

### MotionWatchResizeAxis

Ƭ **MotionWatchResizeAxis**: ``"vertical"`` \| ``"horizontal"``

#### Defined in

[Motion.ts:12](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L12)

___

### MotionWatchResizeTarget

Ƭ **MotionWatchResizeTarget**: `HTMLElement` \| `string` \| [`MotionWatchResizeTargetWithAxis`](modules.md#motionwatchresizetargetwithaxis)

#### Defined in

[Motion.ts:17](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L17)

___

### MotionWatchResizeTargetWithAxis

Ƭ **MotionWatchResizeTargetWithAxis**: [`HTMLElement` \| `string`, [`MotionWatchResizeAxis`](modules.md#motionwatchresizeaxis)]

#### Defined in

[Motion.ts:13](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L13)
