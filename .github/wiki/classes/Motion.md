[owow-gsap-collection](../README.md) / [Exports](../modules.md) / Motion

# Class: Motion<Meta\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Table of contents

### Constructors

- [constructor](Motion.md#constructor)

### Properties

- [cleanup](Motion.md#cleanup)
- [create](Motion.md#create)
- [label](Motion.md#label)
- [mediaQueryList](Motion.md#mediaquerylist)
- [meta](Motion.md#meta)
- [motionResizeObserver](Motion.md#motionresizeobserver)
- [reset](Motion.md#reset)
- [subscriptions](Motion.md#subscriptions)
- [referenceFrameRate](Motion.md#referenceframerate)
- [referenceFrameTime](Motion.md#referenceframetime)
- [resetDebounceTime](Motion.md#resetdebouncetime)

### Methods

- [destroy](Motion.md#destroy)
- [observeMedia](Motion.md#observemedia)
- [observeResize](Motion.md#observeresize)
- [normalizeToDeltaRatio](Motion.md#normalizetodeltaratio)

## Constructors

### constructor

• **new Motion**<`Meta`\>(`create`, `params?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `create` | [`MotionImplementation`](../modules.md#motionimplementation) |
| `params` | [`MotionParams`](../modules.md#motionparams) |

#### Defined in

[Motion.ts:43](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L43)

## Properties

### cleanup

• `Private` `Optional` **cleanup**: [`MotionCleanup`](../modules.md#motioncleanup)

#### Defined in

[Motion.ts:41](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L41)

___

### create

• `Private` `Optional` **create**: [`MotionImplementation`](../modules.md#motionimplementation)

#### Defined in

[Motion.ts:40](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L40)

___

### label

• `Optional` **label**: `string`

#### Defined in

[Motion.ts:34](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L34)

___

### mediaQueryList

• `Optional` **mediaQueryList**: `MediaQueryList`

#### Defined in

[Motion.ts:36](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L36)

___

### meta

• **meta**: `Meta`

#### Defined in

[Motion.ts:38](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L38)

___

### motionResizeObserver

• `Optional` **motionResizeObserver**: `MotionResizeObserver`

#### Defined in

[Motion.ts:37](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L37)

___

### reset

• **reset**: `DebouncedFuncLeading`<() => `void`\>

#### Defined in

[Motion.ts:81](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L81)

___

### subscriptions

• **subscriptions**: `Subscription`[] = `[]`

#### Defined in

[Motion.ts:35](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L35)

___

### referenceFrameRate

▪ `Static` `Readonly` **referenceFrameRate**: ``60``

#### Defined in

[Motion.ts:28](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L28)

___

### referenceFrameTime

▪ `Static` `Readonly` **referenceFrameTime**: `number`

#### Defined in

[Motion.ts:29](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L29)

___

### resetDebounceTime

▪ `Static` `Readonly` **resetDebounceTime**: ``100``

#### Defined in

[Motion.ts:27](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L27)

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[Motion.ts:92](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L92)

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

[Motion.ts:59](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L59)

___

### observeResize

▸ `Private` **observeResize**(`target?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target?` | [`MotionWatchResizeTarget`](../modules.md#motionwatchresizetarget) |

#### Returns

`void`

#### Defined in

[Motion.ts:69](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L69)

___

### normalizeToDeltaRatio

▸ `Static` **normalizeToDeltaRatio**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

[Motion.ts:30](https://github.com/owowagency/gsap-motion/blob/3c825b5/lib/Motion.ts#L30)
