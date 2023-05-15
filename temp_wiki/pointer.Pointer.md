# Class: Pointer

[pointer](../wiki/pointer).Pointer

## Table of contents

### Constructors

- [constructor](../wiki/pointer.Pointer#constructor)

### Properties

- [clientX](../wiki/pointer.Pointer#clientx)
- [clientY](../wiki/pointer.Pointer#clienty)
- [motion](../wiki/pointer.Pointer#motion)
- [normalX](../wiki/pointer.Pointer#normalx)
- [normalY](../wiki/pointer.Pointer#normaly)
- [observable](../wiki/pointer.Pointer#observable)
- [subscriptions](../wiki/pointer.Pointer#subscriptions)
- [viewHeight](../wiki/pointer.Pointer#viewheight)
- [viewWidth](../wiki/pointer.Pointer#viewwidth)
- [\_instance](../wiki/pointer.Pointer#_instance)

### Accessors

- [instance](../wiki/pointer.Pointer#instance)

### Methods

- [destroy](../wiki/pointer.Pointer#destroy)

## Constructors

### constructor

• `Private` **new Pointer**()

#### Defined in

[pointer.ts:8](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L8)

## Properties

### clientX

• **clientX**: `number`

Pointer absolute x position

#### Defined in

[pointer.ts:34](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L34)

___

### clientY

• **clientY**: `number`

Pointer absolute y position

#### Defined in

[pointer.ts:36](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L36)

___

### motion

• `Readonly` **motion**: [`Motion`](../wiki/motion.Motion)<{ `label`: `string`  }\>

Internal motion instance

#### Defined in

[pointer.ts:48](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L48)

___

### normalX

• **normalX**: `number` = `0.5`

Pointer normalized x position (0 to 1)

#### Defined in

[pointer.ts:39](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L39)

___

### normalY

• **normalY**: `number` = `0.5`

Pointer normalized y position (0 to 1)

#### Defined in

[pointer.ts:41](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L41)

___

### observable

• `Readonly` **observable**: `Observable`<`MouseEvent`\>

#### Defined in

[pointer.ts:43](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L43)

___

### subscriptions

• `Private` **subscriptions**: `Subscription`[] = `[]`

#### Defined in

[pointer.ts:26](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L26)

___

### viewHeight

• **viewHeight**: `number` = `window.innerHeight`

Window inner height

#### Defined in

[pointer.ts:31](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L31)

___

### viewWidth

• **viewWidth**: `number` = `window.innerWidth`

Window inner width

#### Defined in

[pointer.ts:29](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L29)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Pointer`](../wiki/pointer.Pointer)

#### Defined in

[pointer.ts:6](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L6)

## Accessors

### instance

• `Static` `get` **instance**(): [`Pointer`](../wiki/pointer.Pointer)

Utility for doing stuff with the mouse/pointer.
Get the current singleton Pointer instance, of which only one can be active at any time.

**`Example`**

```ts
// Make a custom cursor that copies the current pointer position
gsap.ticker.add(() => {
   gsap.set("#custom-cursor", {
     x: Pointer.instance.clientX,
     y: Pointer.instance.clientY
   })
})
```

#### Returns

[`Pointer`](../wiki/pointer.Pointer)

#### Defined in

[pointer.ts:22](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L22)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
Note that referencing `Pointer.instance` will create a new instance.

#### Returns

`void`

#### Defined in

[pointer.ts:75](https://github.com/owowagency/gsap-motion/blob/ecd2da1/lib/pointer.ts#L75)
